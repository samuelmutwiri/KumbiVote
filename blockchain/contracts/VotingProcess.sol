pragma solidity ^0.8.0;

import "./VoterRegistry.sol";
import "./ElectionScheduler.sol";

contract VotingProcess {
    VoterRegistry public voterRegistry;
    ElectionScheduler public electionScheduler;

    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(uint256 => mapping(uint256 => uint256)) public votes; // electionId => candidateId => voteCount

    event VoteCast(uint256 indexed electionId, address indexed voter, uint256 candidateId);

    constructor(address _voterRegistry, address _electionScheduler) {
        voterRegistry = VoterRegistry(_voterRegistry);
        electionScheduler = ElectionScheduler(_electionScheduler);
    }

    function castVote(uint256 _electionId, uint256 _candidateId) external {
        require(electionScheduler.isVotingOpen(_electionId), "Voting is not open");
        require(voterRegistry.isVoterValid(msg.sender), "Voter is not valid");
        require(!hasVoted[_electionId][msg.sender], "Voter has already voted in this election");

        hasVoted[_electionId][msg.sender] = true;
        votes[_electionId][_candidateId]++;

        emit VoteCast(_electionId, msg.sender, _candidateId);
    }

    function getVoteCount(uint256 _electionId, uint256 _candidateId) external view returns (uint256) {
        return votes[_electionId][_candidateId];
    }
}
