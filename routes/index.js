var express = require('express');
var router = express.Router();
var restaurant = require('../public/Utilities/Restaurant');
var menu = require('../public/Utilities/Menu');
var menu_item = require('../public/Utilities/MenuItem');
var order = require('../public/Utilities/Order');

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

    ///////////////////////////////////////////

    var item_1 = {item_name:"poutine", item_price:"1.23", item_id:"0123", item_quantity:"0"};
    var item_2 = {item_name:"poutine2", item_price:"1.23", item_id:"0123", item_quantity:"0"};
    var item_3 = {item_name:"poutine3", item_price:"1.23", item_id:"0123", item_quantity:"0"};
    var item_4 = {item_name:"poutine4", item_price:"1.23", item_id:"0123", item_quantity:"0"};
    var cart = [];
    //////////////////
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
                res.render('index', {account: account, restaurants: found_restaurants, cart: cart});
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


router.post('/checkout', function(req, res)
{
    var logged_account;

    if ((req.session.account))
    {
        logged_account = JSON.parse(req.session.account).account;
    }

    if (req.method == 'POST') {
        var post_data = '';
        req.on('data', function (data)
        {
            post_data += data;
        });
        req.on('end', function ()
        {
            var json_data = JSON.parse(post_data);

            var new_order = new order.Order();

            new_order.setClientId(logged_account._id);
            json_data["cart_items"].forEach(function(cart_item)
            {
                new_order.addItem(cart_item["item_id"], cart_item["item_quantity"]);
            });
            new_order.setStatus(1);
            //new_order.setRestaurantId()
            console.log(json_data["cart_items"]);
            console.log(json_data["cart_items"][0]);
            console.log(json_data["cart_items"][1]);

            new_order.save(function(err)
            {
                if ( err ) return console.error( err );
                var virtual_restaurant = new restaurant.Restaurant();
                virtual_restaurant.getAllRestaurants(function (err, found_restaurants)
                {
                    var cart = [];
                    res.render('index', {account: logged_account, restaurants: found_restaurants, cart: cart});
                });
            });

        });
    }
});

router.post('/addItemToCart', function(req, res)
{
    var logged_account;

    if ((req.session.account))
    {
        logged_account = JSON.parse(req.session.account).account;
    }

    if (req.method == 'POST') {
        var post_data = '';
        req.on('data', function (data)
        {
            post_data += data;
        });
        req.on('end', function ()
        {
            var json_data = JSON.parse(post_data);
            console.log(json_data["item_id"]);

            var virtual_menu_item = new menu_item.MenuItem();
            virtual_menu_item.getMenuItemById(json_data["item_id"], function (err, found_menu_item)
            {
                console.log(found_menu_item);
                console.log("iciiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
                console.log(json_data["cart_items"]);
                var cart = json_data["cart_items"];


                cart.push({item_name:found_menu_item.name, item_price:found_menu_item.price, item_id:found_menu_item._id, item_quantity:"1"});


                res.render('Cart', {account: logged_account, cart: cart});
            });

        });
    }
});

router.post('/showMenus', function(req, res)
{

    var logged_account;

    if ((req.session.account))
    {
        logged_account = JSON.parse(req.session.account).account;
    }

    if (req.method == 'POST') {
        var post_data = '';
        req.on('data', function (data)
        {
            post_data += data;
        });
        req.on('end', function ()
        {
            var json_data = JSON.parse(post_data);
            console.log(json_data["restaurant_id"]);

            var virtual_menu = new menu.Menu();
            virtual_menu.getMenuByRestaurantId(json_data["restaurant_id"], function (err, found_menus)
            {
                res.render('showMenus', {account: logged_account, menus: found_menus});
            });
        });
    }
});


router.post('/showMenuItems', function(req, res)
{
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
    var logged_account;

    if ((req.session.account))
    {
        logged_account = JSON.parse(req.session.account).account;
    }

    if (req.method == 'POST') {
        var post_data = '';
        req.on('data', function (data)
        {
            post_data += data;
        });
        req.on('end', function ()
        {
            var json_data = JSON.parse(post_data);
            console.log(json_data["menu_id"]);

            var virtual_menu_item = new menu_item.MenuItem();
            virtual_menu_item.getMenuItemByMenuId(json_data["menu_id"], function (err, found_menu_items)
            {
                console.log(found_menu_items);
                res.render('showMenuItems', {account: logged_account, menu_items: found_menu_items});
            });
        });
    }
});
module.exports = router;
