pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract VoterRegistry is Ownable {
    struct Voter {
        bool isRegistered;
        bool isValid;
        uint256 electoralZoneId;
    }

    mapping(address => Voter) public voters;
    address[] public voterList;

    event VoterRegistered(address indexed voter, uint256 electoralZoneId);
    event VoterRemoved(address indexed voter);
    event VoterValidityChanged(address indexed voter, bool isValid);

    function registerVoter(address _voter, uint256 _electoralZoneId) external onlyOwner {
        require(!voters[_voter].isRegistered, "Voter already registered");
        voters[_voter] = Voter(true, true, _electoralZoneId);
        voterList.push(_voter);
        emit VoterRegistered(_voter, _electoralZoneId);
    }

    function removeVoter(address _voter) external onlyOwner {
        require(voters[_voter].isRegistered, "Voter not registered");
        voters[_voter].isRegistered = false;
        voters[_voter].isValid = false;
        emit VoterRemoved(_voter);
    }

    function setVoterValidity(address _voter, bool _isValid) external onlyOwner {
        require(voters[_voter].isRegistered, "Voter not registered");
        voters[_voter].isValid = _isValid;
        emit VoterValidityChanged(_voter, _isValid);
    }

    function isVoterValid(address _voter) external view returns (bool) {
        return voters[_voter].isRegistered && voters[_voter].isValid;
    }

    function getVoterCount() external view returns (uint256) {
        return voterList.length;
    }
}
