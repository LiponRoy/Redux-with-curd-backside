const express = require('express');
const router = express.Router();
const { getData, createData, updateData, deleteData } = require('../controller/phoneControler');

router.get('/', getData);
router.post('/create', createData);
router.put('/update/:id', updateData);
router.delete('/delete/:id', deleteData);

module.exports = router;
