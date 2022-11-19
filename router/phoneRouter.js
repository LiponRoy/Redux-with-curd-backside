const express = require('express');
const router = express.Router();
const { createPhonebook, getAllPhonebook, getPhonebook, updatePhonebook, deletePhonebook } = require('../controller/phoneControler');
const { jwtAuth } = require('../JwtAll/jwtAuth');

router.post('/create', createPhonebook);
router.get('/', getAllPhonebook);
router.get('/phonebook/:id', getPhonebook);
router.put('/update/:id', updatePhonebook);
router.delete('/delete/:id', deletePhonebook);

module.exports = router;
