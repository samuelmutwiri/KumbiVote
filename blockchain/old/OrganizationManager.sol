// SPDX-License-Identifier: UNLICENCED
pragma solidity ^0.8.17;

contract OrganizationManager {
    struct Organization {
        uint256 id;
        string name;
        address admin;
        uint256[] branchIds;
        uint256[] electionIds;
        uint256 voterRegistry;
    }

    mapping(uint256 => Organization) public organizations;
    uint256 public organizationCount;

}
