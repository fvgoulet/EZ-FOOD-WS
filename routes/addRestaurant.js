var express = require('express');
var fs = require('fs');
var router = express.Router();
var Restaurant = require('../public/Utilities/Restaurant');
var mkdirp = require("mkdirp");
var getDirName = require("path").dirname;

/*
 * GET .
 */
router.get('/', function(req, res) {
    var account;

    if((req.session.account)){
        account = JSON.parse(req.session.account).account;
    }

    res.render('addRestaurant', {account: account });
});


/*
 * POST to confirmRestaurant.
 */
router.post('/confirmRestaurant', function(req, res) {
    /*fs.readFile(req.files.displayImage.path, function (err, data) {
        // ...
        var newPath = __dirname + "/../public/RestaurantsRessources/restaurant.jpg";
        console.log(newPath);
        fs.writeFile(newPath, data, function (err) {

        });
    });*/

    var newRestaurant = {
        'name' : req.body.name ,
        'phoneNumber': req.body.phoneNumber,
        'civicNumber': req.body.civicNumber,
        'street': req.body.street,
        'city': req.body.city,
        'province': req.body.province,
        'zipCode': req.body.zipCode
    };

    res.render('confirmRestaurant', newRestaurant );
});

/*
 * POST to .
 */
router.post('/confirmed', function(req, res) {
    var account;

    if((req.session.account)){
        account = JSON.parse(req.session.account).account;
    }

    var new_Restaurant = new Restaurant.Restaurant();

    new_Restaurant.setName(req.body.name);
    new_Restaurant.setEntrepreneurId(account._id);
    new_Restaurant.setPhoneNumber(req.body.phoneNumber);
    new_Restaurant.setCivicNo(req.body.civicNumber);
    new_Restaurant.setStreet(req.body.street);
    new_Restaurant.setCity(req.body.city);
    new_Restaurant.setProvince(req.body.province);
    new_Restaurant.setZipCode(req.body.zipCode);

    new_Restaurant.save(function(err)
    {

        new_Restaurant.getRestaurantByName(new_Restaurant.getName(), function(err, found_restaurant)
        {
            new_Restaurant.setRestaurant(found_restaurant);
            if(req.files.displayImage) {
                fs.readFile(req.files.displayImage.path, function (err, data) {

                    var newPath = "./public/RestaurantsRessources/" + new_Restaurant.getId() + "/restaurant.jpg";//new_Restaurant.getId()
                    mkdirp(getDirName(newPath));
                    console.log(newPath);
                    fs.writeFile(newPath, data, function (err) {
                        console.log("erreur:");
                        console.log(err);

                    });
                });
            }
            res.redirect('/');
        });

    });


});

/*
 * POST to /.
 */
router.post('/', function(req, res) {
    var newRestaurant = {
        'name' : req.body.name ,
        'phoneNumber': req.body.phoneNumber,
        'civicNumber': req.body.civicNumber,
        'street': req.body.street,
        'city': req.body.city,
        'province': req.body.province,
        'zipCode': req.body.zipCode
    };

    res.render('addRestaurant', newRestaurant );

});

module.exports = router;