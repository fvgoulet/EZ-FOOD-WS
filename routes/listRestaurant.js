var express = require('express');
var router = express.Router();
var account = require('../public/Utilities/Account');
var restaurant = require('../public/Utilities/Restaurant');
/*
 * GET .
 */
router.get('/', function(req, res) {
    var logged_account;

    if((req.session.account)){
        logged_account = JSON.parse(req.session.account).account;
    }


    var temp_restaurant = new restaurant.Restaurant();
    temp_restaurant.getRestaurantsByEntrepreneurId(logged_account._id , function(err, found_restaurants)
    {
        if ( err ) return console.error( err );
        res.render('listRestaurant', {restaurants: found_restaurants});

    });

});


/*
 * POST .
 */
router.post('/addRestaurant/addRestaurant', function(req, res) {
    var logged_account;

    if((req.session.account)){
        logged_account = JSON.parse(req.session.account).account;
    }

    var new_restaurant = new restaurant.Restaurant();
    new_restaurant.setUsername(req.body.username);
    new_restaurant.setPhoneNumber(req.body.userPhoneNumber);
    new_restaurant.setCivicNo(req.body.userCivicNumber);
    new_restaurant.setStreet(req.body.userStreet);
    new_restaurant.setCity(req.body.userCity);
    new_restaurant.setProvince(req.body.userProvince);
    new_restaurant.setZipCode(req.body.userZipCode);
    new_restaurant.setEntrepreneurId(logged_account._id);

    if(new_restaurant.save())
    {
        res.redirect('/');
    }
    else
    {
        res.redirect('/');
    }
});

/*
 * POST .
 */
router.post('/deleteRestaurant', function(req, res) {
    var logged_account;

    if((req.session.account)){
        logged_account = JSON.parse(req.session.account).account;
    }

    var virtual_restaurant = new restaurant.Restaurant();

    if (req.method == 'POST') {
        var post_data = '';
        req.on('data', function (data) {
            post_data += data;
        });

        req.on('end', function () {


            var json_data = JSON.parse(post_data);
            console.log(json_data);
            virtual_restaurant.getRestaurantById(json_data.restaurantId,function(err, found_restaurant)
            {
                found_restaurant.remove();

                virtual_restaurant.getRestaurantsByEntrepreneurId(logged_account._id , function(err, restaurantEntrepreneur)
                {
                    if ( err ) return console.error( err );
                    res.render('listRestaurant', {restaurants: restaurantEntrepreneur});
                });
            });
        });
    };
});

router.post('/modifyRestaurant', function(req, res) {
    var admin_account;

    if((req.session.account)){
        admin_account = JSON.parse(req.session.account).account;
    }

    if (req.method == 'POST') {
        var post_data = '';
        req.on('data', function (data) {
            post_data += data;
        });

        req.on('end', function () {

            var json_data = JSON.parse(post_data);
            var tempRes = new restaurant.Restaurant();
            tempRes.getRestaurantById(json_data.restaurantId, function(err, foundRestaurant){
                var temp_account = new account.Account();
                temp_account.getAccountsByEntrepreneurId(admin_account._id , function(err, found_accounts)
                {
                    if ( err ) return console.error( err );
                    res.render('modifyRestaurant', {restaurant: foundRestaurant, restaurateurs: found_accounts});
                });

            });
        });
    };


});

router.post('/confirmedModifications', function(req, res) {


    var restaurant_account = new restaurant.Restaurant();
    restaurant_account.getRestaurantByName(req.body.name, function (err, found_restaurant) {
        if (err) return console.error(err);

        if (null != found_restaurant) {

            restaurant_account.setRestaurant(found_restaurant);
            restaurant_account.setName(req.body.name);
            restaurant_account.setPhoneNumber(req.body.phoneNumber);

            restaurant_account.setCivicNo(req.body.civicNumber);
            restaurant_account.setStreet(req.body.street);
            restaurant_account.setCity(req.body.city);

            restaurant_account.setProvince(req.body.province);
            restaurant_account.setZipCode(req.body.zipCode);
            restaurant_account.setRestaurateurId(req.body.selectRestaurateurs);

            restaurant_account.save(function(err){
                res.redirect('/');
            });
        };



    });
});

module.exports = router;
