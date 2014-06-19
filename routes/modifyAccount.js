var express = require('express');
var router = express.Router();

var account = require('../public/Utilities/Account');
/*
 * GET .
 */
router.get('/', function(req, res) {
    var actual_account;

    if((req.session.account)){
        actual_account = JSON.parse(req.session.account).account;
    }
    console.log("Modify account :");
    console.log(actual_account);
    /*var bd = new bd_handler.DBHandler();
    bd.Construct();
    bd.selectAccount(account);*/
    res.render('modifyAccount', {account: actual_account });
});


/*
 * POST to confirmAccount.
 */
router.post('/confirmAccount', function(req, res) {
    var actual_account;

    if((req.session.account)){
        actual_account = JSON.parse(req.session.account).account;
    }
    console.log(req.body.username);
    var user = {
        'username' : actual_account.username ,
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

    res.render('confirmAccountModifications', user );

});

/*
 * POST to .
 */
router.post('/confirmed', function(req, res) {
    //var db = req.db;
    console.log('Add user to DB');


    var old_account;

    if((req.session.account)){
        old_account = JSON.parse(req.session.account).account;
    }

    var actual_account = new account.Account();
    actual_account.getAccount(old_account.username, old_account.password, function(err, found_account)
    {
        if ( err ) return console.error( err );
        if(null != found_account)
        {
            console.log('Found account : ');
            console.log(found_account);
            actual_account.setAccount(found_account);
        }
        actual_account.closeConnection();

        actual_account.setPassword(req.body.userPassword);
        actual_account.setFirstName(req.body.userFirstName);
        actual_account.setLastName(req.body.userSecondName);
        actual_account.setBirthDate(req.body.userBirthDate);
        actual_account.setEmail(req.body.userEmail);
        actual_account.setPhoneNumber(req.body.userPhoneNumber);

        if("" != req.body.userAppNumber)
        {
            actual_account.setAddress(req.body.userCivicNumber + ' ' + req.body.userStreet + ', App. ' + req.body.userAppNumber +
                ', ' + req.body.userCity + ', ' +  req.body.userProvince + ', ' + req.body.userZipCode);
        }
        else {
            actual_account.setAddress(req.body.userCivicNumber + ' ' + req.body.userStreet +
                ', ' + req.body.userCity + ', ' + req.body.userProvince + ', ' + req.body.userZipCode);
        }
        if(actual_account.save())
        {
            req.session.account = JSON.stringify(actual_account);
            req.session.username = actual_account.getUsername();
            req.session.password = actual_account.getPassword();
            // Show a confirmation of the creation.
            res.redirect('/');
        }


    });

});

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
