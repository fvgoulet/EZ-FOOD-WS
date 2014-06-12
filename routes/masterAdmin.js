var express = require('express');
var router = express.Router();

/*
 * GET .
 */
router.get('/', function(req, res) {
    var db = req.db;
    res.render('createAccount', { title: 'EZ-Food' });
});


/*
 * POST to confirmAccount.
 */
router.post('/confirmAccount', function(req, res) {
    var db = req.db;
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
router.post('/confirmed', function(req, res) {
    var db = req.db;
    console.log('Add user to DB');
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

    // Show a confirmation of the creation.
    res.redirect('/');
    //res.render('confirmAccount', newUser );

});

/*
 * POST to /.
 */
router.post('/', function(req, res) {
    var db = req.db;
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

    res.render('createAccount', newUser );

});

module.exports = router;
