const express = require('express');
const router = express.Router();
const { getData } = require('../controller/userControler');

router.get('/', getData);

module.exports = router;
