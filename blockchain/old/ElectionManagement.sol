// SPDX-License-Identifier: UNLICENCED
pragma solidity ^0.8.0;

import "./IdentityRegistry.sol";
import "./VoterRegistry.sol";
import "./Candidate.sol";
import "./Poll.sol";
import "./Voting.sol";
import "./ElectoralZoneManagement.sol";

contract ElectionManagementSystem is Ownable {
    IdentityRegistry public identityRegistry;
    VoterRegistry public voterRegistry;
    Candidate public candidate;
    Poll public poll;
    Voting public voting;
    ElectoralZoneManagement public zoneManagement;

    constructor() {
        identityRegistry = new IdentityRegistry();
        voterRegistry = new VoterRegistry(address(identityRegistry));
        candidate = new Candidate(address(VoterRegistry));
        poll = new Poll();
        voting = new Voting(address(voterRegistry), address(poll));
        zoneManagement = new ElectoralZoneManagement();
    }

    function transferOwnership(address newOwner) public override onlyOwner {
        super.transferOwnership(newOwner);
        identityRegistry.transferOwnership(newOwner);
        voterRegistry.transferOwnership(newOwner);
        candidate.transferOwnership(newOwner);
        poll.transferOwnership(newOwner);
        zoneManagement.transferOwnership(newOwner);
    }

}
