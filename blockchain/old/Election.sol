// SPDX-License-Identifier: UNLICENCED
pragma solidity ^0.8.17;

contract Election {
    // Struct to hold election data
    struct ElectionData {
        string name;          // Name of the election
        uint startTime;       // Start time of the election (timestamp)
        uint endTime;         // End time of the election (timestamp)
        address[] candidates; // List of candidates in the election
        bool exists;          // Flag to check if the election exists
        mapping(address => uint) votes; // Mapping to store votes for each candidate
    }

    // Mapping to store all elections by their ID
    mapping(uint => ElectionData) private elections;
    uint public electionCount; // Counter to keep track of the number of elections

    // Events to notify when an election is created or a candidate is added
    event ElectionCreated(uint indexed electionId, string name, uint startTime, uint endTime);
    event CandidateAdded(uint indexed electionId, address candidate);

    // Modifier to check if an election exists before performing certain actions
    modifier electionExists(uint _electionId) {
        require(elections[_electionId].exists, "Election does not exist.");
        _;
    }

    // Function to create a new election
    function createElection(
        string memory _name,
        uint _startTime,
        uint _endTime,
        address[] memory _candidates
    ) public {
        require(_startTime < _endTime, "Start time must be before end time.");

        // Initialize a new ElectionData struct in storage
        ElectionData storage newElection = elections[electionCount];
        newElection.name = _name;
        newElection.startTime = _startTime;
        newElection.endTime = _endTime;
        newElection.candidates = _candidates;
        newElection.exists = true;

        // Emit an event that an election has been created
        emit ElectionCreated(electionCount, _name, _startTime, _endTime);

        // Increment the election count
        electionCount++;
    }

    // Function to add a candidate to an existing election
    function addCandidate(uint _electionId, address _candidate) public electionExists(_electionId) {
        // Add the candidate to the candidates array for the specified election
        elections[_electionId].candidates.push(_candidate);

        // Emit an event that a candidate has been added
        emit CandidateAdded(_electionId, _candidate);
    }

    // Function to get the details of an election
    function getElectionDetails(uint _electionId)
        public
        view
        electionExists(_electionId)
        returns (string memory, uint, uint, address[] memory)
    {
        // Retrieve the election data from storage
        ElectionData storage election = elections[_electionId];

        // Return the election details
        return (election.name, election.startTime, election.endTime, election.candidates);
    }
}
