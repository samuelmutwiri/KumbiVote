const IdentityRegistry = artifacts.require("IdentityRegistry");
const truffleAssert = require('truffle-assertions');

contract("IdentityRegistry", accounts => {
  let identityRegistry;
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];

  beforeEach(async () => {
    identityRegistry = await IdentityRegistry.new({ from: owner });
  });

  describe("registerIdentity", () => {
    it("should allow a user to register their identity", async () => {
      const identityHash = web3.utils.sha3("user1Identity");

      const tx = await identityRegistry.registerIdentity(identityHash, { from: user1 });

      truffleAssert.eventEmitted(tx, 'IdentityRegistered', (ev) => {
        return ev.user === user1 && ev.identityHash === identityHash;
      });
    });

    it("should not allow a user to register twice", async () => {
      const identityHash = web3.utils.sha3("user1Identity");

      await identityRegistry.registerIdentity(identityHash, { from: user1 });

      await truffleAssert.reverts(
        identityRegistry.registerIdentity(identityHash, { from: user1 }),
        "Identity already registered"
      );
    });
  });

  describe("verifyIdentity", () => {
    it("should allow the owner to verify a user's identity", async () => {
      const identityHash = web3.utils.sha3("user1Identity");
      await identityRegistry.registerIdentity(identityHash, { from: user1 });

      const message = web3.utils.soliditySha3("Verify my identity");
      const signature = await web3.eth.sign(message, user1);

      const tx = await identityRegistry.verifyIdentity(user1, message, signature, { from: owner });

      truffleAssert.eventEmitted(tx, 'IdentityVerified', (ev) => {
        return ev.user === user1;
      });
    });

    it("should not allow non-owners to verify identities", async () => {
      const identityHash = web3.utils.sha3("user1Identity");
      await identityRegistry.registerIdentity(identityHash, { from: user1 });

      const message = web3.utils.soliditySha3("Verify my identity");
      const signature = await web3.eth.sign(message, user1);

      await truffleAssert.reverts(
        identityRegistry.verifyIdentity(user1, message, signature, { from: user2 }),
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("isVerified", () => {
    it("should return true for verified users", async () => {
      const identityHash = web3.utils.sha3("user1Identity");
      await identityRegistry.registerIdentity(identityHash, { from: user1 });

      const message = web3.utils.soliditySha3("Verify my identity");
      const signature = await web3.eth.sign(message, user1);

      await identityRegistry.verifyIdentity(user1, message, signature, { from: owner });

      const isVerified = await identityRegistry.isVerified(user1);
      assert.isTrue(isVerified, "User should be verified");
    });

    it("should return false for unverified users", async () => {
      const identityHash = web3.utils.sha3("user2Identity");
      await identityRegistry.registerIdentity(identityHash, { from: user2 });

      const isVerified = await identityRegistry.isVerified(user2);
      assert.isFalse(isVerified, "User should not be verified");
    });
  });
});
