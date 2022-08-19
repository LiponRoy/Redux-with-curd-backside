const express = require('express');
const router = express.Router();
const { getAllUser, registerUser, loginUser, getMe } = require('../controller/user');
const { protect } = require('../middleware/authMiddleware');

router.post('/reg', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/all', getAllUser);

module.exports = router;
