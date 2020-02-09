const Casino = artifacts.require("Casino");
module.exports = function(_deployer) {
  _deployer.deploy(Casino);
};
