var express = require('express');
var router = express.Router();
var restaurant = require('../public/Utilities/Restaurant');
var menu = require('../public/Utilities/Menu');
var menu_item = require('../public/Utilities/MenuItem');
var order = require('../public/Utilities/Order');
<<<<<<< Updated upstream
=======
var mail_sender = require('../public/Utilities/MailSender');
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
            if("user_defined" == json_data["delivery_type"])
            {
                new_order.setDeliveryTime(json_data["delivery_date_time"]);
            }
>>>>>>> Stashed changes
            json_data["cart_items"].forEach(function(cart_item)
            {
                new_order.addItem(cart_item["item_id"], cart_item["item_quantity"]);
            });


<<<<<<< Updated upstream
            new_order.save(function(err)
            {
                if ( err ) return console.error( err );
                var virtual_restaurant = new restaurant.Restaurant();
                virtual_restaurant.getAllRestaurants(function (err, found_restaurants)
                {
                    var cart = [];
                    res.render('index', {account: logged_account, restaurants: found_restaurants, cart: cart});
                });
=======

            new_order.save(function(err)
            {
                if ( err ) return console.error( err );

                res.send(new_order.getId());

                mail_sender = new mail_sender.MailSender();
                var client_name = logged_account.firstName + " " + logged_account.lastName;
                var client_email = logged_account.email;
                var subject = "EZ-Food : Your order has been passed !";
                var content = "Hi " + client_name + ",\n your order as been passed, here is your confirmation number : " + new_order.getId() + "\n";
                content = content + "Here is your order : \n"
                content = content + "Item Name     Quantity     Unit Price \n \n"
                var total_price = 0;
                json_data["cart_items"].forEach(function(cart_item)
                {
                    content = content + cart_item["item_name"] + "    "+ cart_item["item_quantity"] + "    "+ cart_item["item_price"] + "$\n";
                    total_price = total_price + (parseInt(cart_item["item_quantity"]) * parseInt(cart_item["item_price"]));
                });
                content = content + "\nThat make a total of : " + total_price + "$.\n"
                mail_sender.sendMail(client_name, client_email, subject, content);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            console.log(json_data["item_id"]);
=======

>>>>>>> Stashed changes

            var virtual_menu_item = new menu_item.MenuItem();
            virtual_menu_item.getMenuItemById(json_data["item_id"], function (err, found_menu_item)
            {
<<<<<<< Updated upstream
                console.log(found_menu_item);
                console.log("iciiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
                console.log(json_data["cart_items"]);
=======

>>>>>>> Stashed changes
                var cart = json_data["cart_items"];


                cart.push({item_name:found_menu_item.name, item_price:found_menu_item.price, item_id:found_menu_item._id, item_quantity:"1"});


                res.render('Cart', {account: logged_account, cart: cart});
            });

        });
    }
});
<<<<<<< Updated upstream

=======
router.post('/updateCart', function(req, res)
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

            var cart = json_data["cart_items"];
            res.render('Cart', {account: logged_account, cart: cart});
        });
    }
});
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            console.log(json_data["restaurant_id"]);
=======

>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
=======

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            console.log(json_data["menu_id"]);
=======

>>>>>>> Stashed changes

            var virtual_menu_item = new menu_item.MenuItem();
            virtual_menu_item.getMenuItemByMenuId(json_data["menu_id"], function (err, found_menu_items)
            {
<<<<<<< Updated upstream
                console.log(found_menu_items);
=======

>>>>>>> Stashed changes
                res.render('showMenuItems', {account: logged_account, menu_items: found_menu_items});
            });
        });
    }
});
module.exports = router;
