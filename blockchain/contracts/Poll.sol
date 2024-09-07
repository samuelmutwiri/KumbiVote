// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./BaseContract.sol";

abstract contract Poll is BaseContract {
    struct Poll {
        uint256 electionId;
        uint256 positionId;
        uint256 startTime;
        uint256 endTime;
        mapping(address => bool) candidates;
        mapping(address => bytes32) votes;
        mapping(address => bool) hasVoted;
        bool exists;
    }

    mapping(uint256 => Poll) public polls;
    uint256 public pollCount;

    event PollCreated(uint256 indexed pollId, uint256 positionId, uint256 startTime, uint256 endTime);

    function createPoll(uint256 _positionId, uint256 _startTime, uint256 _endTime) external onlyRole(ELECTION_OFFICIAL_ROLE) {
        require(_startTime > block.timestamp, "Start time must be in the future");
        require(_endTime > _startTime, "End time must be after start time");

        pollCount++;
        Poll storage newPoll = polls[pollCount];
        newPoll.electionId = _electionId;
        newPoll.positionId = _positionId;
        newPoll.startTime = _startTime;
        newPoll.endTime = _endTime;
        newPoll.exists = true;

        emit PollCreated(pollCount, _positionId, _startTime, _endTime);
    }

    function tallyResult(){
    }


}
