const LaundererDetector = artifacts.require("LaundererDetector");

module.exports = function (deployer) {
  deployer.deploy(LaundererDetector);
};