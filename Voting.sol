// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./Election.sol";
import "./UserRegistration.sol";

abstract contract Voting is Election, UserRegistration {
    mapping(uint => mapping(address => bool)) private hasVoted;

    event VoteCast(uint indexed electionId, address indexed voter, address candidate);

    modifier onlyVerified() {
        require(isUserVerified(msg.sender), "User is not verified.");
        _;
    }

    function vote(uint _electionId, address _candidate) public onlyVerified electionExists(_electionId) {
        require(block.timestamp >= Election[_electionId].startTime, "Election has not started yet.");
        require(block.timestamp <= Election[_electionId].endTime, "Election has ended.");
        require(!hasVoted[_electionId][msg.sender], "You have already voted.");
        
        Election[_electionId].votes[_candidate]++;
        hasVoted[_electionId][msg.sender] = true;
        emit VoteCast(_electionId, msg.sender, _candidate);
    }

    function getVoteCount(uint _electionId, address _candidate) public view electionExists(_electionId) returns (uint) {
        return Election[_electionId].votes[_candidate];
    }

    function hasUserVoted(uint _electionId, address _voter) public view returns (bool) {
        return hasVoted[_electionId][_voter];
    }
}