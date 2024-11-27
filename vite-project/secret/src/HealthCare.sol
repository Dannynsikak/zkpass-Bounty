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
    address[] private attestedAddressesList; // New array to track attested addresses


    string private secret = "bad Secret"; // Default secret value

    event RecordStored(address indexed user, string encryptedData, string secret);
    event RecordUpdated(address indexed user, string newEncryptedData);
    event RecordDeleted(address indexed user);
    event SecretUpdated(string newSecret);

    constructor(address initialOwner) Ownable(initialOwner) ProofVerifier(initialOwner) {}

    // View secret (Owner only)
    function getSecret() public view onlyOwner returns (string memory) {
        return secret;
    }

    // Update the secret value (Owner only)
    function updateSecret(string memory newSecret) public onlyOwner {
        secret = newSecret;
        emit SecretUpdated(newSecret);
    }

   
    // Store user record after proof verification
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
        if (attestedAddresses[_proof.recipient] == bytes32(0)) {
            // Only add to list if this address is not already attested
            attestedAddressesList.push(_proof.recipient);
        }
        attestedAddresses[_proof.recipient] = uid;

        records[msg.sender] = encryptedData;

        emit RecordStored(msg.sender, encryptedData, secret);
    }


    // Update an existing user record
    function updateRecord(string memory newEncryptedData) public {
        require(bytes(records[msg.sender]).length > 0, "No record found to update");
        records[msg.sender] = newEncryptedData;

        emit RecordUpdated(msg.sender, newEncryptedData);
    }

    // Delete a user's record
    function deleteRecord() public {
        require(bytes(records[msg.sender]).length > 0, "No record found to delete");
        delete records[msg.sender];

        emit RecordDeleted(msg.sender);
    }

    // Check if an address has an attestation
    function isAddressAttested(address _recipient) public view returns (bool) {
        return attestedAddresses[_recipient] != bytes32(0);
    }

    // Retrieve an attestation by recipient address
    function getAttestationFromAddress(address _recipient) public view returns (Attestation memory) {
        return attestations[attestedAddresses[_recipient]];
    }

    // Retrieve an attestation by UID
    function getAttestation(bytes32 uid) public view returns (Attestation memory) {
        return attestations[uid];
    }

    // Retrieve all attestations (Owner only)
    function getAllAttestations() public view onlyOwner returns (Attestation[] memory) {
        uint256 count = attestedAddressesList.length; // Use the new array for length
        Attestation[] memory allAttestations = new Attestation[](count);
        
        for (uint256 i = 0; i < count; i++) {
            address recipient = attestedAddressesList[i];
            bytes32 uid = attestedAddresses[recipient];
            allAttestations[i] = attestations[uid];
        }
        return allAttestations;
    }

    // Retrieve a user record
    function getRecord(address user) public view returns (string memory) {
        return records[user];
    }

    // Generate unique UID for an attestation
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
