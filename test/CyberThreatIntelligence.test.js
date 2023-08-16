const CyberThreatIntelligence = artifacts.require('CyberThreatIntelligence');

contract('CyberThreatIntelligence', (accounts) => {
    let contractInstance;
    const owner = accounts[0];
    const user = accounts[1];
    const validator1 = accounts[2];
    const validator2 = accounts[3];
    
    before(async () => {
        contractInstance = await CyberThreatIntelligence.new();
    });

    // Test 1: should allow a user to submit and search an IOC
    it('should allow a user to submit and search an IOC', async () => {
        await contractInstance.submitIOC(0, '192.168.1.1', { from: user });
        const ioc = await contractInstance.iocs(0);
        assert.equal(ioc.submitter, user, 'The submitter of the IOC is incorrect');
        assert.equal(ioc.iocType.toNumber(), 0, 'The type of the IOC is incorrect');
        assert.equal(ioc.iocData, '192.168.1.1', 'The data of the IOC is incorrect');
    });

    // Test 2: should allow a validator to validate an IoC with quality parameters
    it('should allow a validator to validate an IoC with quality parameters', async () => {
        await contractInstance.addValidator(validator1, { from: owner });
        await contractInstance.validateIOC(0, {
            extensiveness: 80,
            falsePositives: 5,
            verifiability: 70,
            intelligence: 90,
            interoperability: 85,
            syntacticAccuracy: 88,
            originality: 92,
            timeliness: 78,
            impact: 80,
            standardisation: 76
        }, { from: validator1 });

        const validation = (await contractInstance.iocValidations(0))[0];
        
        assert.equal(validation.extensiveness.toNumber(), 80, 'The extensiveness is incorrect');
        assert.equal(validation.falsePositives.toNumber(), 5, 'The falsePositives is incorrect');
        assert.equal(validation.verifiability.toNumber(), 70, 'The verifiability is incorrect');
        assert.equal(validation.intelligence.toNumber(), 90, 'The intelligence is incorrect');
        assert.equal(validation.interoperability.toNumber(), 85, 'The interoperability is incorrect');
        assert.equal(validation.syntacticAccuracy.toNumber(), 88, 'The syntacticAccuracy is incorrect');
        assert.equal(validation.originality.toNumber(), 92, 'The originality is incorrect');
        assert.equal(validation.timeliness.toNumber(), 78, 'The timeliness is incorrect');
        assert.equal(validation.impact.toNumber(), 80, 'The impact is incorrect');
        assert.equal(validation.standardisation.toNumber(), 76, 'The standardisation is incorrect');
    });

    // Test 3: should select a validator based on reputation score
    it('should select a validator based on reputation score', async () => {
        await contractInstance.addValidator(validator2, { from: owner });
        const validator1ReputationBefore = (await contractInstance.validatorReputation(validator1)).toNumber();
        const validator2ReputationBefore = (await contractInstance.validatorReputation(validator2)).toNumber();
        assert(validator1ReputationBefore > validator2ReputationBefore, 'Validator1 should have higher reputation');
    });

    // Test 4: should finalize the consensus using Proof of Quality mechanism
    it('should finalize the consensus using Proof of Quality mechanism', async () => {
        await contractInstance.calculateConsensus(0, { from: owner });
        const iocConsensusStatus = await contractInstance.iocConsensusStatus(0);
        assert.equal(iocConsensusStatus, true, 'The consensus status of the IOC should be true');
    });
});