const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/user');

router.post('/reg', registerUser);
router.post('/login', loginUser);

module.exports = router;
