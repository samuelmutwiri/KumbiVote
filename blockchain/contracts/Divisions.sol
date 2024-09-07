// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Division is Organization {
    enum DivisionType {
        Governance,
        Administrative,
        Geographical,
        Hybrid,
        Oversight
    }

    struct Division{
        uint256 id;
        uint256 orgId;
        uint256 parentId;
        string name;
        DivisionType public divisionType;
        string details;
        bool isActive;
    }

    struct Management {
        uint256 id;
        string name;
        uint256 orgId;
        uint256 branchId;
        uint256 parentId;
        uint256 quorum;
        uint256 termLength;
        string epoch;
        bool isActive;
    }

    struct Seat {
        uint256 id;
        string name;
        uint256 administrationId;
        bool isActive;
    }

    struct Official {
        uint256 memberId;
        string name;
        uint256 seatId;
        uint256 termStart;
        uint256 termEnd;
        bool isActive;
    }

    mapping(uint256 => Branch) public branches;
    mapping(uint256 => Seat public seats;
    uint256 public branchCount;
    uint256 public seatCount;

    event BranchCreated(uint256 indexed branchId, string name, uint256 parentBranchId);
    event SeatCreated(uint256 indexed seatId, string name, uint256 branchId, uint256 termLength);

    constructor(string memory _name, string memory _organizationType) {
        name = _name;
        organizationType = _organizationType;
    }

    function createBranch(string memory _name, uint256 _parentBranchId) external onlyOwner {
        require(_parentBranchId == 0 || branches[_parentBranchId].exists, "Parent branch does not exist");
        branchCount++;
        branches[branchCount] = Branch(_name, _parentBranchId, true);
        emit BranchCreated(branchCount, _name, _parentBranchId);
    }

    function createSeat(string memory _name, uint256 _branchId, uint256 _termLength) external onlyOwner {
        require(branches[_branchId].exists, "Branch does not exist");
        seatCount++;
        seats[seatCount] = Seat(_name, _branchId, _termLength, true);
        emit SeatCreated(seatCount, _name, _branchId, _termLength);
    }
}
