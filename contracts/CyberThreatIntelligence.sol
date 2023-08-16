// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract CyberThreatIntelligence {
    enum IOType {IP, DOMAIN, URL, FILEHASH}
    
    struct QualityParameters {
        uint extensiveness;
        uint falsePositives;
        uint verifiability;
        uint intelligence;
        uint interoperability;
        uint syntacticAccuracy;
        uint originality;
        uint timeliness;
        uint impact;
        uint standardisation;
    }
    
    struct IOC {
        address submitter;
        IOType iocType;
        string iocData;
        bool validated;
    }
    
    struct Validator {
        address validatorAddress;
        uint reputation;
    }

    IOC[] public iocs;
    Validator[] public validators;

    mapping(uint => QualityParameters[]) public iocValidations;
    mapping(uint => bool) public iocConsensusStatus;
    mapping(address => uint) public validatorReputation;

    address public owner = msg.sender;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyValidator() {
        require(validatorReputation[msg.sender] > 0, "Only a validator can perform this action");
        _;
    }

    function submitIOC(IOType _iocType, string memory _iocData) public {
        iocs.push(IOC({
            submitter: msg.sender,
            iocType: _iocType,
            iocData: _iocData,
            validated: false
        }));
    }

    function addValidator(address _validator) public onlyOwner {
        validators.push(Validator({
            validatorAddress: _validator,
            reputation: 100
        }));
        validatorReputation[_validator] = 100;
    }

    function validateIOC(uint _iocIndex, QualityParameters memory _quality) public onlyValidator {
        require(_iocIndex < iocs.length, "Invalid IOC index");
        iocValidations[_iocIndex].push(_quality);
    }

    function calculateConsensus(uint _iocIndex) public onlyOwner {
        require(_iocIndex < iocs.length, "Invalid IOC index");
        
        QualityParameters[] memory validations = iocValidations[_iocIndex];
        uint numValidators = validations.length;
        require(numValidators > 0, "No validations for this IOC");
        
        // Step 1: Calculate the mean rating for each parameter
        QualityParameters memory meanQuality;
        for (uint i = 0; i < numValidators; i++) {
            meanQuality.extensiveness += validations[i].extensiveness;
            meanQuality.falsePositives += validations[i].falsePositives;
            meanQuality.verifiability += validations[i].verifiability;
            meanQuality.intelligence += validations[i].intelligence;
            meanQuality.interoperability += validations[i].interoperability;
            meanQuality.syntacticAccuracy += validations[i].syntacticAccuracy;
            meanQuality.originality += validations[i].originality;
            meanQuality.timeliness += validations[i].timeliness;
            meanQuality.impact += validations[i].impact;
            meanQuality.standardisation += validations[i].standardisation;
        }
        
        meanQuality.extensiveness /= numValidators;
        meanQuality.falsePositives /= numValidators;
        meanQuality.verifiability /= numValidators;
        meanQuality.intelligence /= numValidators;
        meanQuality.interoperability /= numValidators;
        meanQuality.syntacticAccuracy /= numValidators;
        meanQuality.originality /= numValidators;
        meanQuality.timeliness /= numValidators;
        meanQuality.impact /= numValidators;
        meanQuality.standardisation /= numValidators;
        
        // Step 2: Calculate the deviation of each validator's rating from the mean
        uint[] memory deviations = new uint[](numValidators);
        for (uint i = 0; i < numValidators; i++) {
            deviations[i] = calculateDeviation(validations[i], meanQuality);
        }
        
        // Step 3: Update the validators' reputation scores based on these deviations
        for (uint i = 0; i < numValidators; i++) {
            updateValidatorReputation(validators[i].validatorAddress, deviations[i]);
        }

        // Step 4: Final voting procedure among validators to finalize the status of each IOC
        // For example: If the mean extensiveness score is above a certain threshold, we'll mark this IoC as validated. 
        if (meanQuality.extensiveness > 50) {
            iocs[_iocIndex].validated = true;
            iocConsensusStatus[_iocIndex] = true;
        }
    }
    
    function calculateDeviation(QualityParameters memory quality, QualityParameters memory meanQuality) private pure returns (uint) {
    uint deviation = 
        abs(int(quality.extensiveness) - int(meanQuality.extensiveness)) +
        abs(int(quality.falsePositives) - int(meanQuality.falsePositives)) +
        abs(int(quality.verifiability) - int(meanQuality.verifiability)) +
        abs(int(quality.intelligence) - int(meanQuality.intelligence)) +
        abs(int(quality.interoperability) - int(meanQuality.interoperability)) +
        abs(int(quality.syntacticAccuracy) - int(meanQuality.syntacticAccuracy)) +
        abs(int(quality.originality) - int(meanQuality.originality)) +
        abs(int(quality.timeliness) - int(meanQuality.timeliness)) +
        abs(int(quality.impact) - int(meanQuality.impact)) +
        abs(int(quality.standardisation) - int(meanQuality.standardisation));
        
    return deviation;
}
    
    function updateValidatorReputation(address validator, uint deviation) private {
        // A simple reputation update mechanism: if deviation is small, increase reputation, otherwise decrease it.
        if (deviation < 10) {
            if (validatorReputation[validator] < 100) {
                validatorReputation[validator]++;
            }
        } else {
            if (validatorReputation[validator] > 0) {
                validatorReputation[validator]--;
            }
        }
    }
    
    function abs(int x) private pure returns (uint) {
    if (x < 0) {
        return uint(-x);
    }
    return uint(x);
}
}
