/**
 * Created by Gabriel on 2014-07-22.
 */

var express = require('express');
var router = express.Router();
var restaurant = require('../public/Utilities/Restaurant');
var account = require('../public/Utilities/Account');
var menu = require('../public/Utilities/Menu');

//var menuItem = require('../public/Utilities/MenuItem');


router.post('/', function(req, res)
{
    if((req.session.account)) {
        var accountFromID = new account.Account().getAccountFromId(JSON.parse(req.session.account).account._id, function (err, accountFound) {
            if (err) return console.error(err);
            if (accountFound != null) {
                var tempAccount = new account.Account()
                tempAccount.setAccount(accountFound);
                if(tempAccount.account.category == 0 || tempAccount.account.category == 1 || tempAccount.account.category == 2)
                {
                    var post_data = '';
                    req.on('data', function (data) {
                        post_data += data;
                    });

                    req.on('end', function () {
                        var json_data = JSON.parse(post_data);
                        var restaurantFromId = new restaurant.Restaurant();
                        restaurantFromId.getRestaurantById(json_data.restaurantID, function(err, foundRestaurant){
                            if (err) return console.error(err);
                            if(foundRestaurant != null){
                                var tempRestaurant = new restaurant.Restaurant();
                                tempRestaurant.setRestaurant(foundRestaurant);

                                var MenuFromRestaurantID = new menu.Menu();
                                MenuFromRestaurantID.getMenuByRestaurantId(tempRestaurant.restaurant._id, function(err, foundMenus){
                                    if (err) return console.error(err);
                                    var menus = null;
                                    if(foundMenus != null){
                                        foundMenus.forEach(function(menu) {
                                            menus.push(menu);
                                        });
                                    }
                                    res.render('manageMenu', {menus: menus});
                                });
                            }
                            else{
                                res.redirect('/');
                            }
                        });
                    });

                }
                else{
                    res.redirect('/index/disconnect')
                }
            }

        });
    }
    else{
        res.redirect('/index/disconnect');
    }
});

/*

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

*/

module.exports = router;