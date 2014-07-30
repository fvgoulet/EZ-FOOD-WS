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
    //console.log("logged admin :");
    //console.log(logged_account);

    var temp_restaurant = new restaurant.Restaurant();
    temp_restaurant.getRestaurantsByEntrepreneurId(logged_account._id , function(err, found_restaurants)
    {
        var restaurants = ["None"];
        if ( err ) return console.error( err );
        if(null != found_restaurants)
        {
            console.log('Found account : ');
            console.log(found_restaurants);
            found_restaurants.forEach(function(restaurant_found) {
                console.log(restaurant_found);
                restaurants.push(restaurant_found.name);
            });
        }
        console.log(restaurants);
        res.render('listRestaurant', {restaurants: restaurants});

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

    console.log('Add restaurant to DB');

    //console.log(req.body.restaurant);


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
        // Show a confirmation of the creation.
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

            console.log('RECEIVED THIS DATA:\n' + post_data);
            var json_data = JSON.parse(post_data);
            console.log(json_data);
            console.log(json_data.username);

            virtual_restaurant.getRestaurantByName(json_data.restaurant,function(err, found_restaurant)
            {
                found_restaurant.remove();

                virtual_restaurant.getRestaurantsByEntrepreneurId(logged_account._id , function(err, found_restaurant)
                {
                    var restaurant = ["None"];
                    if ( err ) return console.error( err );
                    if(null != found_restaurant)
                    {
                        console.log('Found restaurant : ');
                        console.log(found_restaurant);
                        found_restaurant.forEach(function(restaurant_found) {
                            console.log(restaurant_found);
                            restaurant.push(restaurant_found.name);
                        });

                    }
                    console.log(restaurant);
                    res.render('listRestaurant', {restaurants: restaurant});

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
            tempRes.getRestaurantByName(json_data.restaurant, function(err, foundRestaurant){
                res.render('modifyRestaurant', {restaurant: foundRestaurant });
            });
        });
    };


});

router.post('/confirmedModifications', function(req, res) {


    var restaurant_account = new restaurant.Restaurant();
    restaurant_account.getRestaurantByName(req.body.name, function (err, found_restaurant) {
        if (err) return console.error(err);
        console.log(found_restaurant.city);
        if (null != found_restaurant) {

            restaurant_account.setRestaurant(found_restaurant);
            restaurant_account.setName(req.body.name);
            restaurant_account.setPhoneNumber(req.body.phoneNumber);

            restaurant_account.setCivicNo(req.body.civicNumber);
            restaurant_account.setStreet(req.body.street);
            restaurant_account.setCity(req.body.city);
            console.log(req.body.city);
            console.log(restaurant_account.city);
            restaurant_account.setProvince(req.body.province);
            restaurant_account.setZipCode(req.body.zipCode);

            restaurant_account.save(function(err){
                res.redirect('/');
            });
        };



    });
});

module.exports = router;
