const express = require('express');
const router = express.Router();
const { getAllUser, getSingleUser, registerUser, loginUser, deleteUser, logoutUser } = require('../controller/user');
const { jwtAuth } = require('../JwtAll/jwtAuth');

router.get('/all', getAllUser);
router.get('/single/:id', getSingleUser);
router.post('/reg', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.delete('/remove/:id', jwtAuth, deleteUser);

module.exports = router;
