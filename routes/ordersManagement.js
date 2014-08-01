var express = require('express');
var router = express.Router();
var account = require('../public/Utilities/Account');
var order = require('../public/Utilities/Order');
var restaurant = require('../public/Utilities/Restaurant');
var mail_sender = require('../public/Utilities/MailSender');

router.get('/', function(req, res)
{
    var actual_account;
    var pendingOrders = [];
    var inPreparationOrders = [];
    var readyOrders = [];
    var deliveredOrders = [];
    if(req.session.account)
    {
        actual_account = JSON.parse(req.session.account).account;

        if(actual_account.category === 2)
        {
            var schemaRestaurant = new restaurant.Restaurant();
            schemaRestaurant.getRestaurantByRestaurateurId(actual_account._id, function(err, restaurant)
            {
                if(err) {

                    return console.error("Error in orderManagement/ordersLists: Error searching for restaurant from restaurateur._id = " + actual_account._id, err);
                }

                var schemaOrder = new order.Order();

                schemaOrder.getRelatedOrdersByRestaurant(restaurant._id, function(err, orders)
                {


                    if(err){

                        return console.error("Error in orderManagement/ordersLists: Error searching for orders from restaurant._id = " + restaurant._id, err);
                    }

                    orders.forEach(function(order)
                    {
                        switch(order.status)
                        {
                            case(1):
                            {
                                pendingOrders.push(order);
                                break;
                            }
                            case(2):
                            {
                                inPreparationOrders.push(order);
                                break;
                            }
                            case(3):
                            {
                                readyOrders.push(order);
                                break;
                            }
                            case(4):
                            {
                                deliveredOrders.push(order);
                                break;
                            }
                        }
                    });


                    res.render('ordersManagement',
                        {
                            account: actual_account,
                            pendingOrders: pendingOrders,
                            inPreparationOrders: inPreparationOrders,
                            readyOrders: readyOrders,
                            deliveredOrders: deliveredOrders
                        });
                });
            });
        }
    }
});


router.post('/updateOrderStatus', function(req, res)
{
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

            var actual_account;
            var pendingOrders = [];
            var inPreparationOrders = [];
            var readyOrders = [];
            var deliveredOrders = [];
            if(req.session.account)
            {
                actual_account = JSON.parse(req.session.account).account;

                if(actual_account.category === 2)
                {
                    var schemaRestaurant = new restaurant.Restaurant();
                    schemaRestaurant.getRestaurantByRestaurateurId(actual_account._id, function(err, restaurant)
                    {
                        if(err) {

                            return console.error("Error in orderManagement/ordersLists: Error searching for restaurant from restaurateur._id = " + actual_account._id, err);
                        }

                        var schemaOrder = new order.Order();

                        schemaOrder.getOrderById(json_data["order_id"], function(err, order)
                            {
                                order.status = json_data["order_status"];

                                order.save(function()
                                {
                                    var order_status_texts = ["", "Pending","In Preparation","Ready","Delivered"];
                                    /*
                                     Status:
                                     1- Submitted by client
                                     2- Getting ready
                                     3- Ready
                                     4- Delivered
                                     */
                                    if(order.status > 1)
                                    {
                                        var client_account = new account.Account();
                                        client_account.getAccountFromId(order.client_id, function(err, account)
                                            {
                                                var mailSender = new mail_sender.MailSender();
                                                var client_name = account.firstName + " " + account.lastName;
                                                var client_email = account.email;
                                                var subject = "EZ-Food : Your order has been updated !";
                                                var content = "Hi " + client_name + ",\n your order as been updated.\n";
                                                content = content + "The status is now :" + order_status_texts[order.status] +" \n"

                                                mailSender.sendMail(client_name, client_email, subject, content);
                                            }
                                        );
                                    }

                                    schemaOrder.getRelatedOrdersByRestaurant(restaurant._id, function(err, orders)
                                    {


                                        if(err){

                                            return console.error("Error in orderManagement/ordersLists: Error searching for orders from restaurant._id = " + restaurant._id, err);
                                        }

                                        orders.forEach(function(order)
                                        {
                                            switch(order.status)
                                            {
                                                case(1):
                                                {
                                                    pendingOrders.push(order);
                                                    break;
                                                }
                                                case(2):
                                                {
                                                    inPreparationOrders.push(order);
                                                    break;
                                                }
                                                case(3):
                                                {
                                                    readyOrders.push(order);
                                                    break;
                                                }
                                                case(4):
                                                {
                                                    deliveredOrders.push(order);
                                                    break;
                                                }
                                            }
                                        });


                                        res.render('ordersManagement',
                                            {
                                                account: actual_account,
                                                pendingOrders: pendingOrders,
                                                inPreparationOrders: inPreparationOrders,
                                                readyOrders: readyOrders,
                                                deliveredOrders: deliveredOrders
                                            });
                                    });
                                });
                            }
                        );
                    });
                }
            }
        });
    }
});




module.exports = router;