const express = require('express');
const router = express.Router();

router.post('/submit', async (req, res) => {
    const { address, iocType, iocData } = req.body;
    
    // IOC submission logic here
    
    res.send({ success: true, message: 'IOC submitted successfully.' });
});

router.get('/', async (req, res) => {
    //  Logic to fetch and list IOCs here
    
    res.send({ success: true, iocs: [] });
});

module.exports = router;