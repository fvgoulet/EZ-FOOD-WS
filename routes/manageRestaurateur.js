var express = require('express');
var router = express.Router();
var account = require('../public/Utilities/Account');
/*
 * GET .
 */
router.get('/', function(req, res) {
    res.render('manageRestaurateur');
});

/*
 * GET .
 */
router.get('/addNewRestaurateur', function(req, res) {
    res.render('addNewRestaurateur');
});


module.exports = router;
