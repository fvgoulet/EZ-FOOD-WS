var express = require('express');
var router = express.Router();
var account = require('../public/Utilities/Account');
var restaurant = require('../public/Utilities/Restaurant');
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

    var account;

    if((req.session.account)){
        account = JSON.parse(req.session.account).account;
    }

    var available_restaurants = new restaurant.Restaurant();
    available_restaurants.getRestaurantsByEntrepreneurId(account._id , function(err, found_restaurants)
    {
        var restaurants = ["None"];
        if ( err ) return console.error( err );
        if(null != found_restaurants)
        {
            console.log('Found restaurants : ');
            console.log(found_restaurants);
            found_restaurants.forEach(function(restaurant) {
                console.log(restaurant);
                restaurants.push(restaurant.name);
            });
            /*actual_account.setAccount(found_account);
            req.session.account = JSON.stringify(actual_account);*/
        }
        console.log(restaurants);
        res.render('addNewRestaurateur', {restaurants: restaurants});

    });

});

/*
 * POST .
 */
router.post('/addNewRestaurateur/addUser', function(req, res) {
    res.render('addNewRestaurateur');
});

module.exports = router;
