var express = require('express');
var router = express.Router();
var restaurant = require('../public/Utilities/Restaurant');

/* GET home page. */
router.get('/', function(req, res) {
    var account;

    if((req.session.account))
    {
        account = JSON.parse(req.session.account).account;
    }
    var virtual_restaurant = new restaurant.Restaurant();
    // Differents categories
    // admin - 0
    // entrepreneur -1
    // restaurateur -2
    // client - 3
    // livreur - 4

    if(account) {
        if (1 == account.category)
        {
            virtual_restaurant.getRestaurantsByEntrepreneurId(account._id, function (err, found_restaurants)
            {
                res.render('index', {account: account, restaurants: found_restaurants});
            });
        }
        else if (2 == account.category)
        {
            virtual_restaurant.getRestaurantsByRestaurateurId(account._id, function (err, found_restaurants)
            {
                res.render('index', {account: account, restaurants: found_restaurants});
            });
        }
        else
        {
            virtual_restaurant.getAllRestaurants(function (err, found_restaurants)
            {
                res.render('index', {account: account, restaurants: found_restaurants});
            });
        }
    }
    else
    {
        virtual_restaurant.getAllRestaurants(function (err, found_restaurants)
        {
            res.render('index', {account: account, restaurants: found_restaurants});
        });
    }
});

/* GET home page. */
router.get('/disconnect', function(req, res) {
    req.session.destroy();
    res.redirect('/' );
});

module.exports = router;
