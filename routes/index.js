const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Weather API is running.');
});

module.exports = router;
