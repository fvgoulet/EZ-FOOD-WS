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

    var user = {
        'username' : req.body.username ,
        'password': req.body.userPassword
    };


    var actual_account = new account.Account();
    actual_account.getAccount(user.username, user.password, function(err, found_account)
    {
        if ( err ) return console.error( err );
        if(null != found_account)
        {
            console.log('Found account : ');
            console.log(found_account);
            actual_account.setAccount(found_account);
            req.session.account = JSON.stringify(actual_account);
        }

        res.redirect('/');

    });

});

module.exports = router;
