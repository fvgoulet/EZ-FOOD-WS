var express = require('express');
var router = express.Router();
var bd_handler = require('../public/Utilities/BDHandler');
/* GET home page. */
router.get('/', function(req, res) {
    res.render('signIn');
});

/*
 * POST to validate.
 */
router.post('/validate', function(req, res) {

    var user = {
        'username' : req.body.username ,
        'userPassword': req.body.userPassword
    }
    var bd = new bd_handler.DBHandler();
    bd.Construct();
    bd.selectAccount(user.username);

    res.redirect('/' );
});

module.exports = router;
