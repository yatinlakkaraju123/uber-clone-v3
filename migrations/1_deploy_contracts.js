const Contacts = artifacts.require("carpool.sol");

module.exports = function(deployer) {
  deployer.deploy(Contacts);
};