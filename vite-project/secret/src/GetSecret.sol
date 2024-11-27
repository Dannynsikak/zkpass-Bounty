// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.20;

import {Proof} from "./Proof.sol";

contract GetSecret {
    mapping(address => string) public patientRecords; // To store encrypted records
    address public proxy;

    event RecordAssigned(address indexed recipient, string encryptedRecord);
    event RecordFetched(address indexed recipient, string encryptedRecord);

    constructor(address _proxy) {
        proxy = _proxy;
    }

    // Function to assign a record to the sender (with proof verification)
    function assignRecord(Proof calldata _proof, string memory encryptedData) public {
        // Verify sender matches the intended recipient
        require(msg.sender == _proof.recipient, "Sender does not match recipient!");

        // Call the proxy contract for proof verification
        (bool success, ) = proxy.call(
            abi.encodeWithSignature("attest(bytes)", abi.encode(_proof))
        );
        require(success, "Proof verification failed!");

        // Assign the encrypted data to the sender's record
        patientRecords[msg.sender] = encryptedData;

        // Emit an event to log the action
        emit RecordAssigned(msg.sender, encryptedData);
    }

    // Function to get a record after proof verification
    function getRecord(Proof calldata _proof) public returns (string memory) {
        // Only the recipient can access the record
        require(msg.sender == _proof.recipient, "Unauthorized access!");

        // Call the proxy contract to verify the proof
        (bool success, ) = proxy.call(
            abi.encodeWithSignature("verify(bytes)", abi.encode(_proof))
        );
        require(success, "Invalid proof!");

        // Return the encrypted record
        return patientRecords[msg.sender];
    }
}