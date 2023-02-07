const express   = require('express');
const uniCtrl   = require('./ctrl');

const router    = express.Router();

router.get('/all', uniCtrl.getAllDetails);

module.exports = router;