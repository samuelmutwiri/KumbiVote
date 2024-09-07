pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ElectoralZoneManager is Ownable {
    struct ElectoralZone {
        uint256 id;
        string name;
        bool isGeographical;
        string description;
    }

    mapping(uint256 => ElectoralZone) public zones;
    uint256 public zoneCount;

    event ZoneCreated(uint256 indexed id, string name, bool isGeographical);
    event ZoneUpdated(uint256 indexed id, string name, bool isGeographical, string description);

    function createZone(string memory _name, bool _isGeographical, string memory _description) external onlyOwner {
        zoneCount++;
        zones[zoneCount] = ElectoralZone(zoneCount, _name, _isGeographical, _description);
        emit ZoneCreated(zoneCount, _name, _isGeographical);
    }

    function updateZone(uint256 _id, string memory _name, bool _isGeographical, string memory _description) external onlyOwner {
        require(zones[_id].id != 0, "Zone does not exist");
        zones[_id].name = _name;
        zones[_id].isGeographical = _isGeographical;
        zones[_id].description = _description;
        emit ZoneUpdated(_id, _name, _isGeographical, _description);
    }

    function getZone(uint256 _id) public view returns (ElectoralZone memory) {
        require(zones[_id].id != 0, "Zone does not exist");
        return zones[_id];
    }
}
