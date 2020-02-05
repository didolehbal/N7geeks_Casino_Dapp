const Lottery = artifacts.require("Lottery");
module.exports = function(_deployer) {
  _deployer.deploy(Lottery);
};
