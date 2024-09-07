pragma solidity ^0.8.0;

import "./VoterRegistry.sol";
import "./Poll.sol";
import "./Candidate.sol";

contract Voting {
    VoterRegistry public voterRegistry;
    Poll public poll;
    Candidate public candidate;

    struct PollResult {
        uint256 totalVotes;
        mapping(uint256 => uint256) votesByZone;
        mapping(uint256 => uint256) votesByCandidate;
        bool resultsPublished;
    }

    mapping(uint256 => PollResult) public pollResults;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event VoteCast(uint256 indexed pollId, address indexed voter);
    event ResultsPublished(uint256 indexed pollId);
    event IncidentReported(uint256 indexed pollId, string description);

    constructor(address _voterRegistry, address _poll, address _candidate) {
        voterRegistry = VoterRegistry(_voterRegistry);
        poll = Poll(_poll);
        candidate = Candidate(_candidate);
    }

    function castVote(uint256 _pollId, uint256 _candidateId) external {
        require(poll.isVotingOpen(_pollId), "Voting is not open");
        require(voterRegistry.isValidVoter(msg.sender), "Not a valid voter");
        require(!hasVoted[_pollId][msg.sender], "Already voted in this election");
        require(!candidate.candidates(_candidateId).isDisqualified, "Candidate is disqualified");

        hasVoted[_pollId][msg.sender] = true;
        electionResults[_pollId].votesByCandidate[_candidateId]++;

        uint256 voterZone = voterRegistry.identityRegistry().getVoterZone(msg.sender);
        electionResults[_pollId].votesByZone[voterZone]++;
        electionResults[_pollId].totalVotes++;

        emit VoteCast(_pollId, msg.sender);
    }

    function publishResults(uint256 _pollId) external {
        require(msg.sender == voterRegistry.owner(), "Only voter registry owner can publish results");
        require(!poll.isVotingOpen(_pollId), "Voting is still open");
        require(!electionResults[_pollId].resultsPublished, "Results already published");

        electionResults[_pollId].resultsPublished = true;
        emit ResultsPublished(_pollId);
    }

    function getElectionStatistics(uint256 _pollId) external view returns (uint256 totalVotes, uint256 candidateCount) {
        require(electionResults[_pollId].resultsPublished, "Results not published yet");
        return (electionResults[_pollId].totalVotes, candidate.candidateCount());
    }

    function getCandidateVotes(uint256 _pollId, uint256 _candidateId) external view returns (uint256) {
        require(electionResults[_pollId].resultsPublished, "Results not published yet");
        return electionResults[_pollId].votesByCandidate[_candidateId];
    }

    function getVotesByZone(uint256 _pollId, uint256 _zone) external view returns (uint256) {
        require(electionResults[_pollId].resultsPublished, "Results not published yet");
        return electionResults[_pollId].votesByZone[_zone];
    }

    function reportIncident(uint256 _pollId, string memory _description) external {
        emit IncidentReported(_pollId, _description);
    }
}
