// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IdentityRegistry.sol"

contract VoterRegister is IdentityRegistry {
    struct Voter {
        uint256 id;
        uint256 createdAt;
        bool isValid;
    }

    mapping(address => Voter) public voters;
    mapping(uint256 => uint256) public voterCountByZone;

    event VoterRegistered(address indexed voter, uint256 electoralZone);
    event VoterRemoved(address indexed voter);
    event VoterZoneUpdated(address indexed voter, uint256 newZone);

    function registerVoter(address _voter, uint256 _zone) external onlyOwner {
        require(!voters[_voter].isRegistered, "Voter already registered");
        voters[_voter] = Voter(true, true, _zone);
        voterCountByZone[_zone]++;
        emit VoterRegistered(_voter, _zone);
    }

    function removeVoter(address _voter) external onlyOwner {
        require(voters[_voter].isRegistered, "Voter not registered");
        uint256 zone = voters[_voter].electoralZone;
        voters[_voter].isValid = false;
        voterCountByZone[zone]--;
        emit VoterRemoved(_voter);
    }

    function updateVoterZone(address _voter, uint256 _newZone) external onlyOwner {
        require(voters[_voter].isRegistered, "Voter not registered");
        uint256 oldZone = voters[_voter].electoralZone;
        voters[_voter].electoralZone = _newZone;
        voterCountByZone[oldZone]--;
        voterCountByZone[_newZone]++;
        emit VoterZoneUpdated(_voter, _newZone);
    }

    function isValidVoter(address _voter) public view returns (bool) {
        return voters[_voter].isRegistered && voters[_voter].isValid;
    }
}
