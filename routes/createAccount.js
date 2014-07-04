var express = require('express');
var router = express.Router();
var account = require('../public/Utilities/Account');
/*
 * GET .
 */
router.get('/', function(req, res) {
    res.render('createAccount', { title: 'EZ-Food' });
});

/*
 * GET .
 */
router.post('/isAccountExist', function(req, res) {
    console.log("is account exist");
    if (req.method == 'POST') {
        var post_data = '';
        req.on('data', function (data) {
            post_data += data;
        });

        req.on('end', function () {


            console.log('RECEIVED THIS DATA:\n' + post_data);
            var json_data = JSON.parse(post_data);
            console.log(json_data);
            console.log(json_data.username);

            var virtual_account = new account.Account();
            virtual_account.getAccountFromUsername(json_data.username,function(err, found_account)
            {
                if ( err ) return console.error( err );
                console.log('Found account : ');
                console.log(found_account);
                if(null != found_account)
                {

                    res.send(true);
                }
                else
                {
                    res.send(false);
                }
            });


        });
    }

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
    };

    res.render('confirmAccount', newUser );

});

/*
 * POST to .
 */
router.post('/confirmed', function(req, res) {
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
    new_account.setCategory(3);
    new_account.setCivicNo(req.body.userCivicNumber);
    console.log("Appartement : ");
    console.log(req.body.userAppNumber);
    new_account.setAppartment(req.body.userAppNumber);
    console.log(new_account.getAppartment());
    new_account.setStreet(req.body.userStreet);
    new_account.setCity(req.body.userCity);
    new_account.setProvince(req.body.userProvince);
    new_account.setZipCode(req.body.userZipCode);

    if(new_account.save())
    {
        req.session.account = JSON.stringify(new_account);
        // Show a confirmation of the creation.
        res.redirect('/');
    }
        else
    {
        res.redirect('/');
    }

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
    };

    res.render('createAccount', newUser );

});

module.exports = router;
