pragma solidity ^0.8.0;

import "./VotingProcess.sol";
import "./VoterRegistry.sol";

contract ElectionStatistics {
    VotingProcess public votingProcess;
    VoterRegistry public voterRegistry;

    constructor(address _votingProcess, address _voterRegistry) {
        votingProcess = VotingProcess(_votingProcess);
        voterRegistry = VoterRegistry(_voterRegistry);
    }

    function getVoterTurnout(uint256 _electionId, uint256 _zoneId) public view returns (uint256 turnout, uint256 totalVoters) {
        uint256 voterCount = voterRegistry.getVoterCount();
        uint256 votedCount = 0;

        for (uint256 i = 0; i < voterCount; i++) {
            address voter = voterRegistry.voterList(i);
            if (voterRegistry.voters(voter).electoralZoneId == _zoneId) {
                totalVoters++;
                if (votingProcess.hasVoted(_electionId, _zoneId, voter)) {
                    votedCount++;
                }
            }
        }

        turnout = (votedCount * 100) / totalVoters;
    }

    function getCandidateVoteShare(uint256 _electionId, uint256 _zoneId, uint256 _candidateId) public view returns (uint256 voteShare, uint256 totalVotes) {
        uint256 candidateVotes = votingProcess.getVoteCount(_electionId, _zoneId, _candidateId);
        uint256 voterCount = voterRegistry.getVoterCount();

        for (uint256 i = 0; i < voterCount; i++) {
            address voter = voterRegistry.voterList(i);
            if (voterRegistry.voters(voter).electoralZoneId == _zoneId && votingProcess.hasVoted(_electionId, _zoneId, voter)) {
                totalVotes++;
            }
        }

        voteShare = (candidateVotes * 100) / totalVotes;
    }
}
