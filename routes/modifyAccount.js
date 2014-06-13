var express = require('express');
var router = express.Router();
var bd_handler = require('../public/Utilities/BDHandler');
//var account = require('../public/Utilities/Account');
/*
 * GET .
 */
router.get('/', function(req, res) {
    var account;

    if((req.session.account)){
        account = JSON.parse(req.session.account);
    }

    /*var bd = new bd_handler.DBHandler();
    bd.Construct();
    bd.selectAccount(account);*/
    res.render('modifyAccount', {account: account });
});


/*
 * POST to confirmAccount.
 */
router.post('/confirmAccount', function(req, res) {
    //var db = req.db;
    console.log(req.body.username);
    var newUser = {
        'username' : req.body.username ,
        'userPassword': req.body.userPassword,
        'userFirstName': req.body.userFirstName,
        'userSecondName': req.body.userSecondName,
        'userBirthDate': req.body.userBirthDate,
        'userPhoneNumber': req.body.userPhoneNumber,
        'userCivicNumber': req.body.userCivicNumber,
        'userAppNumber': req.body.userAppNumber,
        'userStreet': req.body.userStreet,
        'userCity': req.body.userCity,
        'userProvince': req.body.userProvince,
        'userZipCode': req.body.userZipCode,
        'userEmail':req.body.userEmail
    }

    res.render('confirmAccount', newUser );

});

/*
 * POST to .
 */
/*router.post('/confirmed', function(req, res) {
    //var db = req.db;
    console.log('Add user to DB');

    var new_account = new account.Account();

    new_account.setUsername(req.body.username);
    new_account.setPassword(req.body.userPassword);
    new_account.setFirstName(req.body.userFirstName);
    new_account.setLastName(req.body.userSecondName);
    new_account.setBirthDate(req.body.userBirthDate);
    new_account.setEmail(req.body.userEmail);
    new_account.setPhoneNumber(req.body.userPhoneNumber);
    if("" != req.body.userAppNumber)
    {
        new_account.setAddress(req.body.userCivicNumber + ' ' + req.body.userStreet + ', App. ' + req.body.userAppNumber +
            ', ' + req.body.userCity + ', ' +  req.body.userProvince + ', ' + req.body.userZipCode);
    }
    else
    {
        new_account.setAddress(req.body.userCivicNumber + ' ' + req.body.userStreet +
            ', ' + req.body.userCity + ', ' +  req.body.userProvince + ', ' + req.body.userZipCode);
    }


    console.log(new_account);

    req.session.username = new_account.getUsername();
    req.session.password = new_account.getPassword();
    // Show a confirmation of the creation.
    res.redirect('/');
    //res.render('confirmAccount', newUser );

});*/

/*
 * POST to /.
 */
router.post('/', function(req, res) {



    var newUser = {
        'username' : req.body.username ,
        'userPassword': req.body.userPassword,
        'userFirstName': req.body.userFirstName,
        'userSecondName': req.body.userSecondName,
        'userBirthDate': req.body.userBirthDate,
        'userPhoneNumber': req.body.userPhoneNumber,
        'userCivicNumber': req.body.userCivicNumber,
        'userAppNumber': req.body.userAppNumber,
        'userStreet': req.body.userStreet,
        'userCity': req.body.userCity,
        'userProvince': req.body.userProvince,
        'userZipCode': req.body.userZipCode,
        'userEmail':req.body.userEmail
    }

    res.render('modifyAccount', newUser );

});

module.exports = router;
