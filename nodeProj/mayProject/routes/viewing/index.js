'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h1> hello viewers </h1>');
});

router.get('/testing', (req, res)=>{
  res.send('<h1> hello testing viewers </h1>');
});

module.exports = router;
/*

when you use require('./viewing') you're using
a SINGLETON PATTERN (restricting the number of 
instantiations to a class of one)

 */