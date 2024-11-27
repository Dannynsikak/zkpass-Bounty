// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.20;

import { Proof } from "./Proof.sol";

contract ProofVerifier {
   address public defaultAllocator;

    constructor(address _defaultAllocator) {
        defaultAllocator = _defaultAllocator;
    }


    function verify(Proof memory _proof) public view returns (bool) {
        bool allocatorSignatureValid = verifyAllocatorSignature(_proof.taskId, _proof.schemaId, _proof.validator, _proof.allocatorSignature);
        bool validatorSignatureValid = verifyValidatorSignature(
            _proof.taskId,
            _proof.schemaId,
            _proof.uHash,
            _proof.recipient,
            _proof.publicFieldsHash,
            _proof.validator,
            _proof.validatorSignature
        );
    
        if (!allocatorSignatureValid) {
        revert("Allocator signature verification failed");
        }

        if (!validatorSignatureValid) {
        revert("Validator signature verification failed");
        }

        return allocatorSignatureValid && validatorSignatureValid;
    }

    function verifyAllocatorSignature(
        bytes32 _taskId,
        bytes32 _schemaId,
        address _validator,
        bytes memory _allocatorSignature
    ) public view returns (bool) {
        bytes32 hashed = keccak256(abi.encode(_taskId, _schemaId, _validator));
        address allocator = recoverSigner(prefixed(hashed), _allocatorSignature);
        return (allocator == defaultAllocator);
    }

    function verifyValidatorSignature(
        bytes32 _taskId,
        bytes32 _schemaId,
        bytes32 _uHash,
        address _recipient,
        bytes32 _publicFieldsHash,
        address _validator,
        bytes memory _validatorSignature
    ) public pure returns (bool) {
        bytes32 hashed = keccak256(abi.encode(_taskId, _schemaId, _uHash, _publicFieldsHash, _recipient));
        address validator = recoverSigner(prefixed(hashed), _validatorSignature);
        return (validator == _validator);
    }

    function prefixed(bytes32 hash) private pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }

    function recoverSigner(bytes32 _hash, bytes memory _signature) private pure returns (address signer) {
        require(_signature.length == 65, "Invalid signature length");

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            r := mload(add(_signature, 0x20))  // r is the first 32 bytes of the signature
            s := mload(add(_signature, 0x40))  // s is the second 32 bytes of the signature
            v := byte(0, mload(add(_signature, 0x60)))  // v is the 65th byte
        }

        // Ensure the signature is valid based on the 'v' and 's' values
        if (uint256(s) > 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0) {
            revert("SignatureValidator#recoverSigner: invalid signature 's' value");
        }

        if (v != 27 && v != 28) {
            revert("SignatureValidator#recoverSigner: invalid signature 'v' value");
        }

        // Use ecrecover to extract the signer's address from the signature
        signer = ecrecover(_hash, v, r, s);

        // Ensure that the signer is not the zero address
        require(signer != address(0), "SignatureValidator#recoverSigner: INVALID_SIGNER");
        
        return signer;
    }
}
