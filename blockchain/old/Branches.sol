// SPDX-License-Identifier: UNLICENCED
pragma solidity ^0.8.0;

contract Level {
    struct Level {
        string name;
        string org;
        uint256 priority;
        bool isActive;
    }

    Level[] public levels;

    function registerLevel(string memory name) public {
        levels.push(Level(name, false));
    }
}

