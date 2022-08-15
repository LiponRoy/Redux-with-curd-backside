const express = require('express');
const router = express.Router();
const { getData, createData } = require('../controller/phoneControler');

router.get('/', getData);
router.post('/create', createData);

module.exports = router;
