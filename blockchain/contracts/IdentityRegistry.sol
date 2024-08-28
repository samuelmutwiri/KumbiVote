pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract IdentityRegistry is Ownable {
    using ECDSA for bytes32;

    struct Identity {
        bytes32 identityHash;
        bool isVerified;
    }

    mapping(address => Identity) private identities;

    event IdentityRegistered(address indexed user, bytes32 identityHash);
    event IdentityVerified(address indexed user);

    function registerIdentity(bytes32 _identityHash) external {
        require(identities[msg.sender].identityHash == bytes32(0), "Identity already registered");
        identities[msg.sender] = Identity(_identityHash, false);
        emit IdentityRegistered(msg.sender, _identityHash);
    }

    function verifyIdentity(address _user, bytes32 _messageHash, bytes memory _signature) external onlyOwner {
        require(identities[_user].identityHash != bytes32(0), "Identity not registered");
        require(!identities[_user].isVerified, "Identity already verified");

        bytes32 ethSignedMessageHash = _messageHash.toEthSignedMessageHash();
        address signer = ethSignedMessageHash.recover(_signature);

        require(signer == _user, "Invalid signature");

        identities[_user].isVerified = true;
        emit IdentityVerified(_user);
    }

    function isVerified(address _user) external view returns (bool) {
        return identities[_user].isVerified;
    }
}
