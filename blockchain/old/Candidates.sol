// SPDX-License-Identifier: UNLICENCED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./VoterRegistry.sol";
import "./Position.sol"
import "./Poll.sol"

contract Candidate is Ownable {
    VoterRegistry public voterRegistry;

    struct Candidate {
        address candidateAddress;
        uint256 pollId;
        string name;
        bool isVetted;
        bool isDisqualified;
        uint256 fundingCap;
        uint256 totalFunds;
    }

    struct CampaignTeamMember {
        address memberAddress;
        string role;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(uint256 => CampaignTeamMember[]) public campaignTeams;
    mapping(uint256 => mapping(address => uint256)) public fundingSources;

    uint256 public candidateCount;
    uint256 public campaignWindowEnd;

    event CandidateRegistered(uint256 indexed candidateId, address candidateAddress);
    event CandidateVetted(uint256 indexed candidateId);
    event CandidateDisqualified(uint256 indexed candidateId, string reason);
    event FundsReceived(uint256 indexed candidateId, address source, uint256 amount);
    event MalpracticeReported(uint256 indexed candidateId, string description);

    constructor(address _identityRegistry) {
        identityRegistry = IdentityRegistry(_identityRegistry);
    }

    function registerCandidate(address _candidateAddress, string memory _name) external onlyOwner {
        require(identityRegistry.isVerified(_candidateAddress), "Candidate must be a verified voter");
        candidateCount++;
        candidates[candidateCount] = Candidate(_candidateAddress, _name, false, false, 0, 0);
        emit CandidateRegistered(candidateCount, _candidateAddress);
    }

    function vetCandidate(uint256 _candidateId) external onlyOwner {
        require(candidates[_candidateId].candidateAddress != address(0), "Candidate does not exist");
        candidates[_candidateId].isVetted = true;
        emit CandidateVetted(_candidateId);
    }

    function addCampaignTeamMember(uint256 _candidateId, address _memberAddress, string memory _role) external onlyOwner {
        require(identityRegistry.isVerified(_memberAddress), "Team member must be a verified voter");
        campaignTeams[_candidateId].push(CampaignTeamMember(_memberAddress, _role));
    }

    function setFundingCap(uint256 _candidateId, uint256 _cap) external onlyOwner {
        candidates[_candidateId].fundingCap = _cap;
    }

    function receiveFunds(uint256 _candidateId) external payable {
        require(block.timestamp < campaignWindowEnd, "Campaign window is closed");
        require(candidates[_candidateId].totalFunds + msg.value <= candidates[_candidateId].fundingCap, "Funding cap exceeded");
        candidates[_candidateId].totalFunds += msg.value;
        fundingSources[_candidateId][msg.sender] += msg.value;
        emit FundsReceived(_candidateId, msg.sender, msg.value);
    }

    function reportMalpractice(uint256 _candidateId, string memory _description) external {
        emit MalpracticeReported(_candidateId, _description);
    }

    function disqualifyCandidate(uint256 _candidateId, string memory _reason) external onlyOwner {
        candidates[_candidateId].isDisqualified = true;
        emit CandidateDisqualified(_candidateId, _reason);
    }

    function setCampaignWindowEnd(uint256 _timestamp) external onlyOwner {
        campaignWindowEnd = _timestamp;
    }
}
