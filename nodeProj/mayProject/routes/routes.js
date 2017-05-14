const express = require('express');
const router = express.Router();

router.use('/', require('./basics'));
router.use('/viewing', require('./viewing'));

module.exports = router; 