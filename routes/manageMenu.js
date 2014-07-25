/**
 * Created by Gabriel on 2014-07-22.
 */

var express = require('express');
var router = express.Router();
var restaurant = require('../public/Utilities/Restaurant');
var account = require('../public/Utilities/Account');
var menu = require('../public/Utilities/Menu');
var menuItem = require('../public/Utilities/MenuItem');

//var menuItem = require('../public/Utilities/MenuItem');


router.post('/', function(req, res)
{
    if((req.session.account)) {
        var schemaAccount = new account.Account().getAccountFromId(JSON.parse(req.session.account).account._id, function (err, accountFound) {
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
                        var schemaRestaurant = new restaurant.Restaurant();
                        schemaRestaurant.getRestaurantById(json_data.restaurantId, function(err, foundRestaurant){
                            if (err) return console.error(err);
                            if(foundRestaurant != null){


                                var schemaMenu = new menu.Menu();
                                schemaMenu.getMenuByRestaurantId(foundRestaurant._id, function(err, foundMenus){
                                    if (err) return console.error(err);
                                    var menus = [];
                                    console.log(foundMenus);
                                    if(foundMenus != null && foundMenus != []){
                                        foundMenus.forEach(function(menu) {
                                            menus.push(menu);
                                        });
                                    }
                                    console.log(menus);
                                    res.render('manageMenu', {menus: menus, restaurant: foundRestaurant});
                                });
                            }
                        });
                    });

                }
            }

        });
    }
});

router.post('/createMenu', function(req, res)
{
    if (req.method == 'POST'){
        var post_data = '';
        req.on('data', function (data) {
            post_data += data;
        });

        req.on('end', function (){
            var json_data = JSON.parse(post_data);

            var schemaRestaurant = new restaurant.Restaurant();
            schemaRestaurant.getRestaurantById(json_data.restaurantId,function(err, foundRestaurant)
            {
                if ( err ) return console.error( err );
                if(null != foundRestaurant)
                {
                    res.render('createMenu', {restaurant: foundRestaurant});
                }
                else
                {
                    res.redirect('/');
                }
            });
        });
    }
});

router.post('/confirmedMenuCreation', function(req, res)
{
    var schemaMenu = new menu.Menu();
    schemaMenu.setName(req.body.menuName);
    schemaMenu.setDescription(req.body.menuDescription);
    schemaMenu.setRestaurantID(req.body.restaurantId)


    schemaMenu.save(function(err){
        if ( err ) return console.error( err );
        schemaMenu.getMenuByName(req.body.menuName, function(err, foundMenu){
            if ( err ) return console.error( err );
            var menuId = foundMenu._id;
            var menuItems = req.body.itemSelectMultiple;
            var schemaMenuItem = new menuItem.MenuItem();

            menuItems.forEach(function(item){
                var splitItem = item.split('|');
                var newMenuItem = new menuItem.MenuItem();
                newMenuItem.setName(splitItem[0]);
                newMenuItem.setDescription(splitItem[1]);
                newMenuItem.setPrice(splitItem[2]);
                newMenuItem.setMenuId(menuId);

                newMenuItem.save();

            });

        });
        res.redirect('/');
    });

});

router.post('/deleteMenu',function(req, res){
    if (req.method == 'POST'){
        var post_data = '';
        req.on('data', function (data) {
            post_data += data;
        });

        req.on('end', function (){
            var json_data = JSON.parse(post_data);

            var schemaMenuItem = new menuItem.MenuItem();
            schemaMenuItem.getMenuItemByMenuId(json_data.menuId, function(err, menuItems){
                if ( err ) return console.error( err );
                menuItems.forEach(function(item){
                    item.remove();
                });
            });

            var schemaMenu = new menu.Menu();
            schemaMenu.getMenuById(json_data.menuId, function(err, menuFound){
                if ( err ) return console.error( err );
                menuFound.remove();
            });


            res.redirect('/');
        });
    }
});


module.exports = router;