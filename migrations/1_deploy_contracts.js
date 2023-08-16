const CyberThreatIntelligence = artifacts.require("CyberThreatIntelligence");

module.exports = function (deployer) {
  console.log("Testing Deployment")
  deployer.deploy(CyberThreatIntelligence);
};
