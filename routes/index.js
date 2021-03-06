var express = require('express');
var router = express.Router();
var restaurant = require('../public/Utilities/Restaurant');
var menu = require('../public/Utilities/Menu');
var menu_item = require('../public/Utilities/MenuItem');
var order = require('../public/Utilities/Order');
var mail_sender = require('../public/Utilities/MailSender');
var fs = require('fs');
var account = require('../public/Utilities/Account');

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

    var cart = [];

    if(req.session.cart)
    {
        cart = req.session.cart;
    }
    if( cart.length == 0) {
        req.session.actual_restaurant_id = null;
    }
    //////////////////
    if(account) {
        if (1 == account.category)
        {
            virtual_restaurant.getRestaurantsByEntrepreneurId(account._id, function (err, found_restaurants)
            {
                res.render('index', {account: account, restaurants: found_restaurants, fs_module:fs});
            });
        }
        else if (2 == account.category)
        {
            virtual_restaurant.getRestaurantsByRestaurateurId(account._id, function (err, found_restaurant)
            {
                var found_restaurants = [];
                found_restaurants.push(found_restaurant);
                res.render('index', {account: account, restaurants: found_restaurants, fs_module:fs});
            });
        }
        else
        {
            virtual_restaurant.getAllRestaurants(function (err, found_restaurants)
            {
                res.render('index', {account: account, restaurants: found_restaurants, cart: cart, fs_module:fs});
            });
        }
    }
    else
    {
        virtual_restaurant.getAllRestaurants(function (err, found_restaurants)
        {
            res.render('index', {account: account, restaurants: found_restaurants, fs_module:fs});
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

            var selected_address = json_data["selected_address"];

            new_order.setClientId(logged_account._id);
            if("user_defined" == json_data["delivery_type"])
            {
                new_order.setDeliveryTime(json_data["delivery_date_time"]);
            }
            json_data["cart_items"].forEach(function(cart_item)
            {
                new_order.addItem(cart_item["item_id"], cart_item["item_quantity"]);
            });
            new_order.setDeliveryAddressName(selected_address);
            new_order.setStatus(1);
            new_order.setRestaurantId(req.session.actual_restaurant_id);

            new_order.save(function(err)
            {
                if ( err ) return console.error( err );
                req.session.cart = [];
                res.send(new_order.getId());

                var account_schema = new account.Account();
                account_schema.getAccountFromId(logged_account._id, function(err, account)
                {
                    if(err)
                        return console.error("Couldn't find account with ID: " + logged_account._id, err);

                    var current_address;
                    var delivery_address;
                    account.deliveryAddresses.forEach(function(address)
                    {
                        if(address.name === new_order.getAddress())
                        {
                            current_address = address;
                        }
                    });

                    if(current_address)
                    {
                        delivery_address = current_address.civicNo + ", " + current_address.apartment + ", " + current_address.street + ", " + current_address.city + ", " + current_address.province + ", " + current_address.zipCode;
                    }
                    else
                    {
                        delivery_address = account.civicNo + ", " + account.apartment + ", " + account.street + ", " + account.city + ", " + account.province + ", " + account.zipCode;
                    }

                    var mailSender = new mail_sender.MailSender();
                    var client_name = logged_account.firstName + " " + logged_account.lastName;
                    var client_email = logged_account.email;
                    var subject = "EZ-Food : Your order has been passed !";
                    var content = "Hi " + client_name + ",\nYour order as been passed, here is your confirmation number : " + new_order.getId() + "\n";
                    content = content + "Address to deliver to:    " + delivery_address + "\n \n";
                    content = content + "Time order taken:         " + new_order.getOrderTime()  + "\n";
                    content = content + "Desired delivery time:    " + new_order.getDeliveryTime() + "\n \n";
                    content = content + "Here is your order : \n";
                    content = content + "Item Name     Quantity     Unit Price \n \n";
                    var total_price = 0;
                    json_data["cart_items"].forEach(function(cart_item)
                    {
                        content = content + cart_item["item_name"] + "    "+ cart_item["item_quantity"] + "    "+ cart_item["item_price"] + "$\n";
                        total_price = total_price + (parseInt(cart_item["item_quantity"]) * parseFloat(cart_item["item_price"]).toFixed(2));
                    });
                    content = content + "\nThat make a total of : " + parseFloat(total_price).toFixed(2) + "$.\n";
                    mailSender.sendMail(client_name, client_email, subject, content);
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

            var virtual_menu_item = new menu_item.MenuItem();
            virtual_menu_item.getMenuItemById(json_data["item_id"], function (err, found_menu_item)
            {
                var cart = json_data["cart_items"];

                var item_is_in_cart = false;
                for(var x = 0; x < cart.length; x++)
                {
                    if(found_menu_item.name == cart[x].item_name)
                    {
                        item_is_in_cart = true;
                        cart[x].item_quantity = (parseInt(cart[x].item_quantity) + 1).toString();
                    }
                }
                if(item_is_in_cart == false)
                {
                    cart.push({item_name:found_menu_item.name, item_price:found_menu_item.price, item_id:found_menu_item._id, item_quantity:"1"});
                }


                req.session.cart = cart;
                res.render('Cart', {account: logged_account, cart: cart});
            });

        });
    }
});

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
            req.session.cart = cart;
            if( cart.length == 0)
            {
                req.session.actual_restaurant_id = null;
                res.send('cart_empty');
            }
            else
            {
                res.render('Cart', {account: logged_account, cart: cart});
            }



        });
    }
});

router.post('/addNewAddress', function(req, res)
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

            var actual_account = new account.Account();
            actual_account.getAccount(logged_account.username, logged_account.password, function(err, found_account)
            {
                if ( err ) return console.error( err );
                if(null != found_account)
                {
                    console.log('Found account : ');
                    console.log(found_account);
                    actual_account.setAccount(found_account);
                }

                actual_account.addDeliveryAddress(json_data['address_name'], json_data['address_civicNumber'],
                    json_data['address_appNumber'], json_data['address_street'],
                    json_data['address_city'],json_data['address_province'],json_data['address_zipCode']);



                if(actual_account.save())
                {
                    req.session.account = JSON.stringify(actual_account);

                    res.render('Cart', {account: found_account, cart: req.session.cart});
                }
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

            if((req.session.actual_restaurant_id == null)||(json_data["restaurant_id"] == req.session.actual_restaurant_id)) {
                req.session.actual_restaurant_id = json_data["restaurant_id"];
                var virtual_menu = new menu.Menu();
                virtual_menu.getMenuByRestaurantId(json_data["restaurant_id"], function (err, found_menus) {
                    res.render('showMenus', {account: logged_account, menus: found_menus});
                });
            }
        });
    }
});


router.post('/showMenuItems', function(req, res)
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

                var virtual_menu_item = new menu_item.MenuItem();
                virtual_menu_item.getMenuItemByMenuId(json_data["menu_id"], function (err, found_menu_items)
                {

                    res.render('showMenuItems', {account: logged_account, menu_items: found_menu_items});
                });


        });
    }
});
module.exports = router;
