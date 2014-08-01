var express = require('express');
var router = express.Router();
var account = require('../public/Utilities/Account');
var restaurant = require('../public/Utilities/Restaurant');
/*
 * GET .
 */
router.get('/', function(req, res)
{
    var logged_account;

    if((req.session.account))
    {
        logged_account = JSON.parse(req.session.account).account;
    }

    var temp_account = new account.Account();
    temp_account.getAccountsByEntrepreneurId(logged_account._id , function(err, found_accounts)
    {
        var accounts = ["None"];
        if ( err ) return console.error( err );
        if(null != found_accounts)
        {
            found_accounts.forEach(function(account_found)
            {
                accounts.push(account_found.username);
            });
        }
        res.render('manageRestaurateur', {accounts: accounts});
    });
});

/*
 * GET .
 */
router.get('/addNewRestaurateur', function(req, res)
{

    var account;

    if((req.session.account))
    {
        account = JSON.parse(req.session.account).account;
    }

    var available_restaurants = new restaurant.Restaurant();
    available_restaurants.getRestaurantsByEntrepreneurId(account._id , function(err, found_restaurants)
    {
        var restaurants = [];
        if ( err ) return console.error( err );
        if(null != found_restaurants)
        {
            found_restaurants.forEach(function(restaurant)
            {
                restaurants.push(restaurant.name);
            });
        }
        res.render('addNewRestaurateur', {available_restaurants: restaurants});
    });
});
/*
 * POST .
 */
router.post('/addNewRestaurateur/addUser', function(req, res)
{

    var logged_account;

    if((req.session.account))
    {
        logged_account = JSON.parse(req.session.account).account;
    }
    // Differents categories
    // admin - 0
    // entrepreneur -1
    // restaurateur -2
    // client - 3
    // livreur - 4

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

    if([] != req.body.selected_restaurants)
    {

        var array_selected_restaurants = [];

        if( typeof req.body.selected_restaurants == 'string' )
        {
            array_selected_restaurants.push(req.body.selected_restaurants);
        }
        else if(undefined != req.body.selected_restaurants)
        {
            array_selected_restaurants = req.body.selected_restaurants;
        }

        var associated_restaurant = new restaurant.Restaurant();
        var array_selected_restaurants = [];

        if( typeof req.body.selected_restaurants == 'string' )
        {
            array_selected_restaurants.push(req.body.selected_restaurants);
        }
        else if(undefined != req.body.selected_restaurants)
        {
            array_selected_restaurants = req.body.selected_restaurants;
        }
        array_selected_restaurants.forEach(function(entry)
        {
            associated_restaurant.getRestaurantByName(entry, function (err, restaurant_found)
            {
                if (err) return console.error(err);
                if (null != restaurant_found)
                {
                    associated_restaurant.setRestaurant(restaurant_found);
                }
                associated_restaurant.setRestaurateurId(new_account.getId());

                associated_restaurant.save();
            });
        });
    }
    if(new_account.save())
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
router.post('/deleteUser', function(req, res)
{
    var logged_account;

    if((req.session.account))
    {
        logged_account = JSON.parse(req.session.account).account;
    }

    var virtual_account = new account.Account();

    if (req.method == 'POST')
    {
        var post_data = '';
        req.on('data', function (data)
        {
            post_data += data;
        });
        req.on('end', function ()
        {
            var json_data = JSON.parse(post_data);

            virtual_account.getAccountFromUsername(json_data.username,function(err, found_account)
            {
                found_account.remove();

                virtual_account.getAccountsByEntrepreneurId(logged_account._id , function(err, found_accounts)
                {
                    var accounts = ["None"];
                    if ( err ) return console.error( err );
                    if(null != found_accounts)
                    {
                        found_accounts.forEach(function(account_found)
                        {
                            accounts.push(account_found.username);
                        });
                    }
                    res.render('manageRestaurateur', {accounts: accounts});
                });
            });
        });
    }
});

/*
 * POST .
 */
router.post('/modifyUser', function(req, res)
{
    var admin_account;

    if((req.session.account))
    {
        admin_account = JSON.parse(req.session.account).account;
    }

    var virtual_account = new account.Account();

    if (req.method == 'POST') {
        var post_data = '';
        req.on('data', function (data)
        {
            post_data += data;
        });

        req.on('end', function ()
        {

            var json_data = JSON.parse(post_data);

            virtual_account.getAccountFromUsername(json_data.username,function(err, found_account)
            {

                var available_restaurants = new restaurant.Restaurant();
                available_restaurants.getRestaurantsByEntrepreneurId(admin_account._id , function(err, found_restaurants)
                {

                    var restaurants = [];
                    if ( err ) return console.error( err );
                    if(null != found_restaurants)
                    {
                        found_restaurants.forEach(function(restaurant)
                        {
                            restaurants.push(restaurant.name);
                        });

                    }



                    available_restaurants.getRestaurantsByRestaurateurId(found_account._id , function(err, found_restaurants)
                    {

                        var selected_restaurants = [];
                        if (err) return console.error(err);
                        if (null != found_restaurants)
                        {
                            found_restaurants.forEach(function (restaurant)
                            {
                                selected_restaurants.push(restaurant.name);
                            });

                        }

                        restaurants = restaurants.filter(function(used_restaurant) {
                            return selected_restaurants.indexOf(used_restaurant) === -1;
                        });

                        res.render('modifyRestaurateurAccount', {account: found_account, available_restaurants: restaurants, selected_restaurants: selected_restaurants});

                    });


                });
            });

        });
    }
});


router.post('/confirmedModifications', function(req, res)
{
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

        deleteAssociationWithRestaurateurId(restaurateur_account.getId());

        var array_selected_restaurants = [];

        if( typeof req.body.selected_restaurants == 'string' )
        {
            array_selected_restaurants.push(req.body.selected_restaurants);
        }
        else if(undefined != req.body.selected_restaurants)
        {
            array_selected_restaurants = req.body.selected_restaurants;
        }

        if([] != req.body.selected_restaurants)
        {
            var associated_restaurant = new restaurant.Restaurant();

            array_selected_restaurants.forEach(function(entry)
            {
                associated_restaurant.getRestaurantByName(entry, function (err, restaurant_found)
                {
                    if (err) return console.error(err);
                    if (null != restaurant_found)
                    {
                        associated_restaurant.setRestaurant(restaurant_found);
                    }
                    associated_restaurant.setRestaurateurId(restaurateur_account.getId());

                    associated_restaurant.save(function(err)
                    {

                        if (err) return console.error(err);
                    });
                });
            });
        }

        if(restaurateur_account.save())
        {
            // Show a confirmation of the creation.
            res.redirect('/');
        }
    });


    deleteAssociationWithRestaurateurId = function(restaurateur_id)
    {
        var associated_restaurants = new restaurant.Restaurant();
        associated_restaurants.getRestaurantsByRestaurateurId(restaurateur_id , function(err, found_restaurants)
        {
            found_restaurants.forEach(function (restaurant)
            {

                restaurant.restaurateur_id = null;

                restaurant.save();
            });


        });
    };
});
module.exports = router;
