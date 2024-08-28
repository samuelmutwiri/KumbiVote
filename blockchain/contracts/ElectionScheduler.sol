pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ElectionScheduler is Ownable {
    struct Election {
        uint256 id;
        string name;
        uint256 date;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
    }

    mapping(uint256 => Election) public elections;
    uint256 public electionCount;

    event ElectionScheduled(uint256 indexed id, string name, uint256 date);
    event ElectionCancelled(uint256 indexed id);

    function scheduleElection(string memory _name, uint256 _date) external onlyOwner {
        require(_date > block.timestamp, "Election date must be in the future");
        electionCount++;
        elections[electionCount] = Election(
            electionCount,
            _name,
            _date,
            _date + 6 hours, // 6 AM
            _date + 18 hours, // 6 PM
            true
        );
        emit ElectionScheduled(electionCount, _name, _date);
    }

    function cancelElection(uint256 _id) external onlyOwner {
        require(elections[_id].isActive, "Election not active");
        elections[_id].isActive = false;
        emit ElectionCancelled(_id);
    }

    function isVotingOpen(uint256 _id) public view returns (bool) {
        Election memory election = elections[_id];
        return (
            election.isActive &&
            block.timestamp >= election.startTime &&
            block.timestamp <= election.endTime
        );
    }
}
