# loid-forger
Cyber Threat Intelligence Sharing



Idea:

DApp which uses proof of quality for cyber threat intelligence sharing and validation.


The contract have following functions:
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

Originality Evaluates: how unique the entries of each feed are

Timeliness Analyses: how soon a CTI feed is releasing information in comparison of the initial date of the malicious activity

Impact Measures: the consequences to an organisation if the information from a feed is applied

Standardisation Measures how much of free text is used in the feed’s objects


 4: Calculate consensus for measuring validator performance


 - After validators submit their ratings, calculate the mean rating for each parameter.
 - Calculate the deviation of each validator's rating from the mean.
 - Use these deviations to update the validators' reputation scores.
 - Use a voting procedure among validators to finalize the status of each IOC.

If IOC is satisfying the quality then write to block.


Inspired by the amazing research paper by Dimitrios Chatziamanetoglou and Konstantinos Rantos: [Blockchain-Based Cyber Threat Intelligence Sharing Using
Proof-of-Quality Consensus](https://downloads.hindawi.com/journals/scn/2023/3303122.pdf)
