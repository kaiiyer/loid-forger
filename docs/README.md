# loid-forger
Decentralized and Rewarding Cyber Threat Intelligence Sharing App


Loid Forger Intel is a DApp which uses proof of quality protocol for cyber threat intelligence sharing and validation.

Login to App using your crypto wallet which would be used for rewards

App Roles:

        Submitter
        Submitter can submit IOC with the POC(Proof of Concept)

        Validator
        Validator will evaluate the IOC and assign a score. If the mean score given to IOC by all validators in the pool is greater than acceptable quality score then IOC will be written to block else discarded.

        Consumer
        Consumer can search can search for IOCs using the search panel. IOC(IP/Domain/Hash) would have the following info:
            First seen date
            Score
            Tags


Smart Contract functionality:
 1. Allow users to submit an IOC

```    
    struct IOC {
        address submitter;
        IOType iocType;
        string iocData;
        bool validated;
        QualityParameters quality;
    }
```

 2. Select a pool of validators 

The selection of the validators is performed by the validator selection mechanism (VSM)
The initial validator is selected by Identity-based Selection based on their identity and proven trustworthiness outside the blockchain network. For instance, they might be well-known and respected organizations or individuals.

 3. Allow a validator to validate an IoC with quality parameters using proof of quality mechanism

The quality parameters are as follows:

Extensiveness: Evaluates how many optional parameters are flled in

False positives: Determines how often feeds are invalidated

Verifability: Expresses is a feed is linked with primary sources of information

Intelligence: Indicates how much added value a feed ofers in the information by linking it to other objects

Interoperability: Measures if a CTI feed follows a specifc data format to provide the data

Syntactic accuracy: Determines how compliant a feed is to the standard which is followed

Originality Evaluates: How unique the entries of each feed are

Timeliness Analyses: How soon a CTI feed is releasing information in comparison of the initial date of the malicious activity

Impact Measures: Consequences to an organisation if the information from a feed is applied

Standardisation Measures: How much of free text is used in the feed’s objects


 4: Calculate consensus for measuring validator performance


 - After validators submit their ratings, calculate the mean rating for each parameter.
 - Calculate the deviation of each validator's rating from the mean.
 - Use these deviations to update the validators' reputation scores.
 - Use a voting procedure among validators to finalize the status of each IOC.

If IOC is satisfying the quality then write to block and would be uploaded to the chain.

Once IOC is on-chain, any user could search the IOC and gather the intel information like when was it uploaded, what is it flagged for and consume this information for their security operations.

The number of qualified IOCs will be used to provide rewards to the submitter. Also the validator gets rewarded.
The consumer would pay a subscription fee to use this service which is distributed between the submitter and validator.

