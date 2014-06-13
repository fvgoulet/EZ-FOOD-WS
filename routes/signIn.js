var express = require('express');
var router = express.Router();
var account = require('../public/Utilities/Account');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('signIn');
});

/*
 * POST to validate.
 */
router.post('/validate', function(req, res) {
    /*
    var user = {
        'username' : req.body.username ,
        'userPassword': req.body.userPassword,
    }*/
    var account;
    var username = req.body.username;
    //var db = new DBHandler.DBHandler();
    //db.Construct();
    //console.log(username);
    //console.log(JSON.stringify(db.selectAccount(username)));
    //var account = db.selectAccount(username);
    if(account != null){
        req.session.account = JSON.stringify(account);
    }

    res.redirect('/');
});

module.exports = router;
