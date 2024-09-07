// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./BaseContract.sol";
import "./Organization.sol";
import "./VoterRegistry.sol";

contract Election is BaseContract {
    Organization public organization;
    VoterRegistration public voterRegistration;

    enum ElectionStatus { Scheduled, Ongoing, Completed, Cancelled }

    struct Poll {
        uint256 positionId;
        uint256 startTime;
        uint256 endTime;
        mapping(address => bool) candidates;
        mapping(address => uint256) votes;
        bool exists;
    }

    struct Campaign {
        address candidate;
        address chiefAgent;
        mapping(address => bool) committeeMembers;
        mapping(address => bool) agents;
        bool exists;
    }

    struct ElectionCommitteeMember {
        address member;
        bool exists;
    }

    uint256 public electionId;
    ElectionStatus public status;
    uint256 public electionStartTime;
    uint256 public electionEndTime;
    mapping(uint256 => Poll) public polls;
    uint256 public pollCount;
    mapping(address => Campaign) public campaigns;
    mapping(uint256 => ElectionCommitteeMember) public electionCommittee;
    uint256 public electionCommitteeCount;

    event ElectionScheduled(uint256 indexed electionId, uint256 startTime, uint256 endTime);
    event PollCreated(uint256 indexed pollId, uint256 positionId, uint256 startTime, uint256 endTime);
    event CandidateRegistered(uint256 indexed pollId, address indexed candidate);
    event CampaignCreated(address indexed candidate, address indexed chiefAgent);
    event VoteCast(uint256 indexed pollId, address indexed voter);
    event ElectionCommitteeMemberAdded(address indexed member);

    constructor(address _organizationAddress, address _voterRegistrationAddress) {
        organization = Organization(_organizationAddress);
        voterRegistration = VoterRegistration(_voterRegistrationAddress);
    }

    function scheduleElection(uint256 _startTime, uint256 _endTime) external onlyOwner {
        require(_startTime > block.timestamp, "Start time must be in the future");
        require(_endTime > _startTime, "End time must be after start time");
        require(status == ElectionStatus.Completed || status == ElectionStatus.Cancelled || electionId == 0, "Previous election not completed");

        electionId++;
        status = ElectionStatus.Scheduled;
        electionStartTime = _startTime;
        electionEndTime = _endTime;

        emit ElectionScheduled(electionId, _startTime, _endTime);
    }

    function createPoll(uint256 _positionId, uint256 _startTime, uint256 _endTime) external onlyOwner {
        require(status == ElectionStatus.Scheduled, "Election not scheduled");
        require(_startTime >= electionStartTime && _endTime <= electionEndTime, "Poll times must be within election period");
        require(organization.positions(_positionId).exists, "Position does not exist");

        pollCount++;
        Poll storage newPoll = polls[pollCount];
        newPoll.positionId = _positionId;
        newPoll.startTime = _startTime;
        newPoll.endTime = _endTime;
        newPoll.exists = true;

        emit PollCreated(pollCount, _positionId, _startTime, _endTime);
    }

    function registerCandidate(uint256 _pollId, address _candidateAddress) external onlyOwner {
        require(status == ElectionStatus.Scheduled, "Election not in scheduling phase");
        require(polls[_pollId].exists, "Poll does not exist");
        require(voterRegistration.isRegisteredVoter(_candidateAddress), "Candidate must be a registered voter");
        require(!polls[_pollId].candidates[_candidateAddress], "Candidate already registered for this poll");

        polls[_pollId].candidates[_candidateAddress] = true;
        emit CandidateRegistered(_pollId, _candidateAddress);
    }

    function createCampaign(address _candidateAddress, address _chiefAgentAddress) external onlyOwner {
        require(status == ElectionStatus.Scheduled, "Election not in scheduling phase");
        require(voterRegistration.isRegisteredVoter(_candidateAddress), "Candidate must be a registered voter");
        require(voterRegistration.isRegisteredVoter(_chiefAgentAddress), "Chief agent must be a registered voter");
        require(!campaigns[_candidateAddress].exists, "Campaign already exists for this candidate");

        Campaign storage newCampaign = campaigns[_candidateAddress];
        newCampaign.candidate = _candidateAddress;
        newCampaign.chiefAgent = _chiefAgentAddress;
        newCampaign.exists = true;

        emit CampaignCreated(_candidateAddress, _chiefAgentAddress);
    }

    function addCampaignCommitteeMember(address _candidateAddress, address _memberAddress) external {
        require(campaigns[_candidateAddress].exists, "Campaign does not exist");
        require(msg.sender == campaigns[_candidateAddress].chiefAgent, "Only chief agent can add committee members");
        require(voterRegistration.isRegisteredVoter(_memberAddress), "Committee member must be a registered voter");

        campaigns[_candidateAddress].committeeMembers[_memberAddress] = true;
    }

    function addCampaignAgent(address _candidateAddress, address _agentAddress) external {
        require(campaigns[_candidateAddress].exists, "Campaign does not exist");
        require(msg.sender == campaigns[_candidateAddress].chiefAgent, "Only chief agent can add agents");
        require(voterRegistration.isRegisteredVoter(_agentAddress), "Agent must be a registered voter");

        campaigns[_candidateAddress].agents[_agentAddress] = true;
    }

    function addElectionCommitteeMember(address _memberAddress) external onlyOwner {
        require(voterRegistration.isRegisteredVoter(_memberAddress), "Committee member must be a registered voter");
        require(!electionCommittee[electionCommitteeCount].exists, "Member already exists");

        electionCommitteeCount++;
        electionCommittee[electionCommitteeCount] = ElectionCommitteeMember(_memberAddress, true);

        emit ElectionCommitteeMemberAdded(_memberAddress);
    }

    function startElection() external onlyOwner {
        require(status == ElectionStatus.Scheduled, "Election not scheduled");
        require(block.timestamp >= electionStartTime, "Election start time not reached");

        status = ElectionStatus.Ongoing;
    }

    function castVote(uint256 _pollId, address _candidateAddress) external {
        require(status == ElectionStatus.Ongoing, "Election is not ongoing");
        require(polls[_pollId].exists, "Poll does not exist");
        require(block.timestamp >= polls[_pollId].startTime && block.timestamp <= polls[_pollId].endTime, "Poll is not open for voting");
        require(voterRegistration.isRegisteredVoter(msg.sender), "Voter is not registered");
        require(polls[_pollId].candidates[_candidateAddress], "Invalid candidate");
        require(polls[_pollId].votes[msg.sender] == 0, "Voter has already cast a vote in this poll");

        polls[_pollId].votes[_candidateAddress]++;
        polls[_pollId].votes[msg.sender] = 1; // Mark that this voter has voted

        emit VoteCast(_pollId, msg.sender);
    }

    function endElection() external onlyOwner {
        require(status == ElectionStatus.Ongoing, "Election is not ongoing");
        require(block.timestamp > electionEndTime, "Election end time not reached");

        status = ElectionStatus.Completed;
    }

    function getPollResults(uint256 _pollId, address _candidateAddress) external view returns (uint256) {
        require(status == ElectionStatus.Completed, "Election not completed");
        require(polls[_pollId].exists, "Poll does not exist");
        return polls[_pollId].votes[_candidateAddress];
    }
}
