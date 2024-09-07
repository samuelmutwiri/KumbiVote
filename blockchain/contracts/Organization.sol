// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Organization is Ownable {
    enum OrganizationType {
        NationState,
        Cooperative,
        ListedCompany,
        PrivateCompany,
        SelfHelpGroup,
        CBO,
        SACCO,
        Society
    }

    struct Organization {
        uint256 id;
        address _organizationAddress;
        string name;
        OrganizationType public orgType;
        string details;
    }

    struct OrgUnit {
        uint256 id;
        string name;
        uint256 parentId;
        uint256 orgId;
        uint256[] childrenIds;
        bool isActive;
    }

    struct Management {
        uint256 id;
        string name;
        uint256 orgId;
        uint256 branchId;
        uint256 quorum;
        uint256 termLength;
        uint256 OrgUnitId;
        uint256[] officialIds;
        string epoch;
        bool isActive;
    }

    struct Roles {
        uint256 id;
        string name;
        bool isActive;
    }

    struct Official {
        uint256 memberId;
        string name;
        uint256 roleId;
        uint256 termStart;
        uint256 termEnd;
        bool isActive;
    }

    struct Member {
        uint256 voterId;
        string name;
        uint256 orgId;
        uint256 branchId;
        uint256 joinDate;
        bool isValid;
        bool isVerified;
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
