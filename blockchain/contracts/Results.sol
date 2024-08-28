pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./VotingProcess.sol";

contract ResultsAnnouncement is Ownable {
    VotingProcess public votingProcess;

    struct Result {
        uint256 electionId;
        uint256 winningCandidateId;
        uint256 totalVotes;
        bool isAnnounced;
    }

    mapping(uint256 => Result) public results;

    event ResultAnnounced(uint256 indexed electionId, uint256 winningCandidateId, uint256 totalVotes);

    constructor(address _votingProcess) {
        votingProcess = VotingProcess(_votingProcess);
    }

    function announceResult(uint256 _electionId, uint256 _candidateCount) external onlyOwner {
        require(!results[_electionId].isAnnounced, "Result already announced");

        uint256 winningCandidateId;
        uint256 winningVoteCount;
        uint256 totalVotes;

        for (uint256 i = 1; i <= _candidateCount; i++) {
            uint256 candidateVotes = votingProcess.getVoteCount(_electionId, i);
            if (candidateVotes > winningVoteCount) {
                winningCandidateId = i;
                winningVoteCount = candidateVotes;
            }
            totalVotes += candidateVotes;
        }

        results[_electionId] = Result(_electionId, winningCandidateId, totalVotes, true);
        emit ResultAnnounced(_electionId, winningCandidateId, totalVotes);
    }

    function getResult(uint256 _electionId) external view returns (uint256, uint256) {
        require(results[_electionId].isAnnounced, "Result not announced yet");
        return (results[_electionId].winningCandidateId, results[_electionId].totalVotes);
    }
}
