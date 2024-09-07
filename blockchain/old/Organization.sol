// SPDX-License-Identifier: UNLICENCED
pragma solidity ^0.8.0;

contract Organization {
    struct Organization {
        string name;
        string category;
        uint256 ;
        bool sActive;
    }

    Level[] public levels;

    function registerLevel(string memory name) public {
        levels.push(Level(name, false));
    }
}
