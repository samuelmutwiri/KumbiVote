// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistration {
    
    // Admin address
    address public admin;

    // User structure storing minimal data
    struct User {
        bool isRegistered;  // Registration status
    }
    
    // Mapping from user address to user details
    mapping(address => User) private users;
    
    // Events for logging important actions
    event UserRegistered(address indexed userAddress);
    event UserUnregistered(address indexed userAddress);

    // Modifier to restrict functions to only the admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Not an admin");
        _;
    }

    // Constructor to initialize the admin of the contract
    constructor() {
        admin = msg.sender;
    }

    // Function to register a user
    function registerUser() public {
        require(!users[msg.sender].isRegistered, "User already registered");

        users[msg.sender] = User({
            isRegistered: true
        });

        emit UserRegistered(msg.sender);
    }

    // Function for users to unregister themselves, removing their registration data from the contract
    ///function unregister() public {
        //require(users[msg.sender].isRegistered, "User not registered");

        //delete users[msg.sender];

        //emit UserUnregistered(msg.sender);

    // Function to check if a user is registered
    function isUserRegistered(address _userAddress) public view returns (bool) {
        return users[_userAddress].isRegistered;
    }
}