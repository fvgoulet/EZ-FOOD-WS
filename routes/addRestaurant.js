var express = require('express');
var router = express.Router();
var Restaurant = require('../public/Utilities/Restaurant');
/*
 * GET .
 */
router.get('/', function(req, res) {
    res.render('addRestaurant', { title: 'EZ-Food' });
});


/*
 * POST to confirmRestaurant.
 */
router.post('/confirmRestaurant', function(req, res) {
    //var db = req.db;
    var newRestaurant = {
        'name' : req.body.name ,
        'phoneNumber': req.body.phoneNumber,
        'civicNumber': req.body.civicNumber,
        'street': req.body.street,
        'city': req.body.city,
        'province': req.body.province,
        'zipCode': req.body.zipCode
    }

    res.render('confirmRestaurant', newRestaurant );

});

/*
 * POST to .
 */
router.post('/confirmed', function(req, res) {

    var new_Restaurant = new Restaurant.Restaurant();

    new_Restaurant.setName(req.body.username);
    new_Restaurant.setPhoneNumber(req.body.phoneNumber);
    new_Restaurant.setCivicNo(req.body.civicNumber);
    new_Restaurant.setStreet(req.body.street);
    new_Restaurant.setCity(req.body.city);
    new_Restaurant.setProvince(req.body.province);
    new_Restaurant.setZipCode(req.body.zipCode);

    if(new_Restaurant.save())
    {
        req.session.new_Restaurant = JSON.stringify(new_Restaurant);
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



    var newRestaurant = {
        'name' : req.body.name ,
        'phoneNumber': req.body.phoneNumber,
        'civicNumber': req.body.civicNumber,
        'street': req.body.street,
        'city': req.body.city,
        'province': req.body.province,
        'zipCode': req.body.zipCode
    }

    res.render('addRestaurant', newRestaurant );

});

module.exports = router;