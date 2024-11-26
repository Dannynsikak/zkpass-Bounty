// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.20;

import {Proof} from "./Proof.sol";
import {ProofVerifier} from "./ProofVerifier.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct Attestation {
    bytes32 uid;
    bytes32 schema;
    bytes32 uHash;
    address recipient;
    bytes32 publicFieldsHash;
}

contract SampleAttestation is ProofVerifier, Ownable {
    mapping(bytes32 => Attestation) private attestations;
    mapping(address => bytes32) private attestedAddresses;

    string private secret = "bad Secret";  // Default secret value

    // Pass msg.sender to the Ownable constructor
    constructor() Ownable(msg.sender) ProofVerifier() {}

    // Function to set a new secret (only accessible by the owner)
    function setSecret(string memory _newSecret) public onlyOwner {
        secret = _newSecret;
    }

    function attest(bytes memory _proofAsBytes) public returns (string memory) {
        Proof memory _proof = abi.decode(_proofAsBytes, (Proof));
        require(verify(_proof), "verify proof fail");

        Attestation memory attestation = Attestation({
            uid: 0,
            schema: _proof.schemaId,
            uHash: _proof.uHash,
            recipient: _proof.recipient,
            publicFieldsHash: _proof.publicFieldsHash
        });

        bytes32 uid;
        uint32 bump = 0;
        while (true) {
            uid = getUID(attestation, bump);
            if (attestations[uid].uid == 0) {
                break;
            }

            unchecked {
                ++bump;
            }
        }

        attestation.uid = uid;

        attestations[uid] = attestation;
        attestedAddresses[_proof.recipient] = uid;
        return secret;  // Return the dynamic secret
    }

    function getAttestationFromAddress(address _recipient) public view returns (Attestation memory) {
        return attestations[attestedAddresses[_recipient]];
    }

    function getAttestation(bytes32 uid) public view returns (Attestation memory) {
        return attestations[uid];
    }

    function getUID(Attestation memory attestation, uint32 bump) private pure returns (bytes32) {
        return keccak256(
            abi.encodePacked(
                attestation.schema, attestation.uHash, attestation.recipient, attestation.publicFieldsHash, bump
            )
        );
    }
}
