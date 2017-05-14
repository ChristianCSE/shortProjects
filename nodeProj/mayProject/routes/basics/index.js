'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h1> hello </h1>')
});

router.get('/testing', (req, res)=>{
  res.send('<h1> hello testing</h1>')
});

module.exports = router;