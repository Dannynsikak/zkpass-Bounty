// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.20;

import "forge-std/Test.sol"; // Use Foundry for testing
import "../src/HealthCare.sol";
import "../src/GetSecret.sol";

contract GetSecretTest is Test {
    Healthcare private healthcare;
    GetSecret private getSecret;

    function setUp() public {
        // Deploy Healthcare contract
        healthcare = new Healthcare(address(this));

        // Deploy GetSecret contract with Healthcare as proxy
        getSecret = new GetSecret(address(healthcare));
    }

    function testProofWithWrongRecipient() public {
        Proof memory _proof = Proof(
            bytes32("b16f527b8891454abe684c6a5f06dfb2"),
            bytes32("c7eab8b7d7e44b05b41b613fe548edf5"),
            0xa3a5c8c3dd7dfe4abc91433fb9ad3de08344578713070983c905123b7ea91dda,
            0xEcd12972e428a8256c9805b708e007882568D7DE, // slightly modified
            0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6,
            0xb1C4C1E1Cdd5Cf69E27A3A08C8f51145c2E12C6a,
            hex"8e789c4c4805d256ec9d332e734888d83dee9126030bd00a52a0d3342c3cc40613f88f8d3145360e5464b908fd82e94814a2f0549a459ac26489e76e1a89bd261b",
            hex"5e47b2237c7208317f36a10039a37f637f33564138458770f87cd1880a45a2580052763accdd97f33a090523fd9220ed31f6ebabbfd51b263635e16fb0a0399a1b"
        );
        
        // Expect revert due to mismatch in recipient
        vm.expectRevert("Unauthorized access!");
        getSecret.getRecord(_proof);
    }

    function testGetSecret() public {
        // Only the owner can retrieve the secret
        string memory secret = healthcare.getSecret();
        assertEq(secret, "bad Secret");
    }
}
