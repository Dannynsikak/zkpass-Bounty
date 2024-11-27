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

contract Healthcare is ProofVerifier, Ownable {
    mapping(bytes32 => Attestation) private attestations;
    mapping(address => bytes32) private attestedAddresses;
    mapping(address => string) private records;

    string private secret = "bad Secret"; // Default secret value

    event RecordStored(address indexed user, string encryptedData, string secret);
    event SecretUpdated(string newSecret);

    constructor(address initialOwner) Ownable(initialOwner) ProofVerifier(initialOwner) {}

    function getSecret() public view onlyOwner returns (string memory) {
        return secret;
    }

    function storeRecord(bytes memory _proofAsBytes, string memory encryptedData) public {
        Proof memory _proof = abi.decode(_proofAsBytes, (Proof));
        require(verify(_proof), "Proof verification failed");

        Attestation memory attestation = Attestation({
            uid: 0,
            schema: _proof.schemaId,
            uHash: _proof.uHash,
            recipient: _proof.recipient,
            publicFieldsHash: _proof.publicFieldsHash
        });

        bytes32 uid = generateUniqueUID(attestation);
        attestation.uid = uid;

        attestations[uid] = attestation;
        attestedAddresses[_proof.recipient] = uid;

        records[msg.sender] = encryptedData;

        emit RecordStored(msg.sender, encryptedData, secret);
    }

    function getAttestationFromAddress(address _recipient) public view returns (Attestation memory) {
        return attestations[attestedAddresses[_recipient]];
    }

    function getAttestation(bytes32 uid) public view returns (Attestation memory) {
        return attestations[uid];
    }

    function getRecord(address user) public view returns (string memory) {
        return records[user];
    }

    function generateUniqueUID(Attestation memory attestation) private returns (bytes32) {
        bytes32 uid;
        uint32 bump = 0;
        while (true) {
            uid = keccak256(
                abi.encodePacked(
                    attestation.schema,
                    attestation.uHash,
                    attestation.recipient,
                    attestation.publicFieldsHash,
                    bump
                )
            );
            if (attestations[uid].uid == 0) {
                break;
            }
            unchecked {
                ++bump;
            }
        }
        return uid;
    }
}
