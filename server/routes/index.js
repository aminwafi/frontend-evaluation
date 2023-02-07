var express = require('express');
var router = express.Router();

router.use('/uni', require('./uni'));

module.exports = router;
