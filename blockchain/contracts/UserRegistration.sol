// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

abstract contract UserRegistration is Ownable {
    constructor(address initialOwner) {
        transferOwnership(initialOwner);}

        struct User {
        bool isRegistered;
        bool isVerified;
        string userDataHash;
    }

    mapping(address => User) public users;
    address[] public registeredUsers;

    event UserRegistered(address indexed user, string userDataHash);
    event UserVerified(address indexed user);

    modifier onlyRegistered() {
        require(users[msg.sender].isRegistered, "User is not registered.");
        _;
    }

    function registerUser(string memory _userDataHash) public {
        require(!users[msg.sender].isRegistered, "User is already registered.");
        users[msg.sender] = User(true, false, _userDataHash);
        registeredUsers.push(msg.sender);
        emit UserRegistered(msg.sender, _userDataHash);
    }

    function verifyUser(address _userAddress) public onlyOwner {
        require(users[_userAddress].isRegistered, "User not registered.");
        require(!users[_userAddress].isVerified, "User already verified.");
        users[_userAddress].isVerified = true;
        emit UserVerified(_userAddress);
    }

    function isUserVerified(address _userAddress) public view returns (bool) {
        return users[_userAddress].isVerified;
    }

    function getRegisteredUsers() public view returns (address[] memory) {
        return registeredUsers;
    }
}
