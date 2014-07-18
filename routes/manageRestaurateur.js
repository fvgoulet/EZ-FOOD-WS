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
    console.log("logged admin :");
    console.log(logged_account);

    var temp_account = new account.Account();
    temp_account.getAccountsByEntrepreneurId(logged_account._id , function(err, found_accounts)
    {
        var accounts = ["None"];
        if ( err ) return console.error( err );
        if(null != found_accounts)
        {
            console.log('Found account : ');
            console.log(found_accounts);
            found_accounts.forEach(function(account_found) {
                console.log(account_found);
                accounts.push(account_found.username);
            });
            /*actual_account.setAccount(found_account);
             req.session.account = JSON.stringify(actual_account);*/
        }
        console.log(accounts);
        res.render('manageRestaurateur', {accounts: accounts});

    });

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
    var logged_account;

    if((req.session.account)){
        logged_account = JSON.parse(req.session.account).account;
    }

    console.log('Add user to DB');
    // Differents categories
    // admin - 0
    // entrepreneur -1
    // restaurateur -2
    // client - 3
    // livreur - 4

    console.log(req.body.restaurant);


    var new_account = new account.Account();

    new_account.setUsername(req.body.username);
    new_account.setPassword(req.body.userPassword);
    new_account.setFirstName(req.body.userFirstName);
    new_account.setLastName(req.body.userSecondName);
    new_account.setBirthDate(req.body.userBirthDate);
    new_account.setEmail(req.body.userEmail);
    new_account.setPhoneNumber(req.body.userPhoneNumber);
    new_account.setCategory(2);
    new_account.setCivicNo(req.body.userCivicNumber);
    new_account.setApartment(req.body.userAppNumber);
    new_account.setStreet(req.body.userStreet);
    new_account.setCity(req.body.userCity);
    new_account.setProvince(req.body.userProvince);
    new_account.setZipCode(req.body.userZipCode);
    new_account.setEntrepreneurId(logged_account._id);

    if("None" != req.body.restaurant) {
        var associated_restaurant = new restaurant.Restaurant();
        associated_restaurant.getRestaurantByName(req.body.restaurant, function (err, restaurant_found) {
            if (err) return console.error(err);
            if (null != restaurant_found) {
                associated_restaurant.setRestaurant(restaurant_found);
            }
            associated_restaurant.setRestaurateurId(new_account.getId());

            associated_restaurant.save();
        });
    }
    if(new_account.save())
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
router.post('/deleteUser', function(req, res) {
    var logged_account;

    if((req.session.account)){
        logged_account = JSON.parse(req.session.account).account;
    }

    var virtual_account = new account.Account();

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

            virtual_account.getAccountFromUsername(json_data.username,function(err, found_account)
            {
                found_account.remove();

                virtual_account.getAccountsByEntrepreneurId(logged_account._id , function(err, found_accounts)
                {
                    var accounts = ["None"];
                    if ( err ) return console.error( err );
                    if(null != found_accounts)
                    {
                        console.log('Found account : ');
                        console.log(found_accounts);
                        found_accounts.forEach(function(account_found) {
                            console.log(account_found);
                            accounts.push(account_found.username);
                        });

                    }
                    console.log(accounts);
                    res.render('manageRestaurateur', {accounts: accounts});

                });
            });
        });
    }
});

/*
 * POST .
 */
router.post('/modifyUser', function(req, res) {
    var admin_account;

    if((req.session.account)){
        admin_account = JSON.parse(req.session.account).account;
    }

    var virtual_account = new account.Account();

    if (req.method == 'POST') {
        var post_data = '';
        req.on('data', function (data) {
            post_data += data;
        });

        req.on('end', function () {

            var json_data = JSON.parse(post_data);

            virtual_account.getAccountFromUsername(json_data.username, function (err, found_account) {
                //////////////////////////////////////////////////////
                var available_restaurants = new restaurant.Restaurant();
                available_restaurants.getRestaurantsByEntrepreneurId(admin_account._id, function (err, found_restaurants) {

                    var restaurants = [];
                    if (err) return console.error(err);
                    if (null != found_restaurants) {
                        found_restaurants.forEach(function (restaurant) {
                            console.log(restaurant);
                            restaurants.push(restaurant.name);
                        });

                    }

                    available_restaurants.getRestaurantsByRestaurateurId(found_account._id, function (err, found_restaurants) {

                        var selected_restaurants = [];
                        if (err) return console.error(err);
                        if (null != found_restaurants) {
                            found_restaurants.forEach(function (restaurant) {
                                console.log(restaurant);
                                selected_restaurants.push(restaurant.name);
                            });

                        }
                        restaurants[0] = selected_restaurants[0];
                        res.render('modifyRestaurateurAccount', {account: found_account, restaurants: restaurants});

                    });
                });
////////////////////////////////////////////////
                /*var available_restaurants = new restaurant.Restaurant();
                 available_restaurants.getRestaurantsByEntrepreneurId(admin_account._id , function(err, found_restaurants)
                 {

                 // TODO : Put the restaurant of this user.

                 var restaurants = ["None"];
                 if ( err ) return console.error( err );
                 if(null != found_restaurants)
                 {
                 found_restaurants.forEach(function(restaurant) {
                 console.log(restaurant);
                 restaurants.push(restaurant.name);
                 });

                 }
                 console.log(restaurants);
                 res.render('modifyRestaurateurAccount', {account: found_account, restaurants: restaurants});

                 });
                 });

                 });*/


            });
        });
    }
});


router.post('/confirmedModifications', function(req, res) {



    var restaurateur_account = new account.Account();
    restaurateur_account.getAccountFromUsername(req.body.username, function(err, found_account)
    {
        if ( err ) return console.error( err );
        if(null != found_account)
        {

            restaurateur_account.setAccount(found_account);
        }

        restaurateur_account.setPassword(req.body.userPassword);
        restaurateur_account.setFirstName(req.body.userFirstName);
        restaurateur_account.setLastName(req.body.userSecondName);
        restaurateur_account.setBirthDate(req.body.userBirthDate);
        restaurateur_account.setEmail(req.body.userEmail);
        restaurateur_account.setPhoneNumber(req.body.userPhoneNumber);

        restaurateur_account.setCivicNo(req.body.userCivicNumber);
        restaurateur_account.setApartment(req.body.userAppNumber);
        restaurateur_account.setStreet(req.body.userStreet);
        restaurateur_account.setCity(req.body.userCity);
        restaurateur_account.setProvince(req.body.userProvince);
        restaurateur_account.setZipCode(req.body.userZipCode);

        if("None" != req.body.restaurant) {
            var associated_restaurant = new restaurant.Restaurant();
            associated_restaurant.getRestaurantByName(req.body.restaurant, function (err, restaurant_found) {
                if (err) return console.error(err);
                if (null != restaurant_found) {
                    associated_restaurant.setRestaurant(restaurant_found);
                }
                associated_restaurant.setRestaurateurId(restaurateur_account.getId());

                associated_restaurant.save();
            });
        }
        if(restaurateur_account.save())
        {
            // Show a confirmation of the creation.
            res.redirect('/');
        }
    });



});
module.exports = router;
