var express = require('express');
var router = express.Router();
var account = require('../public/Utilities/Account');
var order = require('../public/Utilities/Order');
var restaurant = require('../public/Utilities/Restaurant');

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
            schemaRestaurant.getRestaurantsByRestaurateurId( actual_account._id, function(err, restaurant)
            {
                if(err) {
                    console.error("Error in Orders getRestaurantsByRestaurateurId: ", err);
                    return console.error("Error in orderManagement/ordersLists: Error searching for restaurant from restaurateur._id = " + actual_account._id, err);
                }

                var schemaOrder = new order.Order();
                schemaOrder.getRelatedOrdersByRestaurant(restaurant._id, function(err, orders)
                {
                    if(err){
                        console.error("Error in Orders getRelatedOrdersByRestaurant: ", err);
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
                    console.log(orders);

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
        else
        {
            res.redirect('index', req);
        }
    }
});

router.put('/updateOrder/:order_id', function(req, res)
{

});

/*
router.delete('/deleteOrder/:id', function(req, res)
{
    var schemaOrder = new order.Order();
    schemaOrder.removeById({"_id" : req.params.id}, function(err)
    {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});
*/

module.exports = router;
