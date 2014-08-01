/**
 * Created by Gabriel on 2014-07-25.
 */
var express = require('express');
var router = express.Router();
var account = require('../public/Utilities/Account');
var order = require('../public/Utilities/Order');
var restaurant = require('../public/Utilities/Restaurant');

/*
 * GET .
 */
router.get('/', function(req, res) {
    var schemaOrder = new order.Order();
    schemaOrder.getOrdersByStatus(3,function(err, foundOrders){
        var schemaRestaurant = new restaurant.Restaurant();
        var restaurantsID = [];
        foundOrders.forEach(function(Order){
            if(restaurantsID.indexOf(Order.restaurant_id)==-1){

                restaurantsID.push(Order.restaurant_id);
            }
        });

        var listRestaurant = [];
        restaurantsID.forEach(function(id){
            schemaRestaurant.getRestaurantById(id, function(err, foundRestaurant){
                if ( err ) return console.error( err );

                listRestaurant.push(foundRestaurant);

            });
        });
    });


    //schemaRestaurant.getRestaurantById(foundOrders.order.restaurant_id, function(err, foundRestaurant){

    //});



    /*
    console.log("1");
    var temp_order = new order.Order();
    temp_order.getOrdersByStatus(1 , function(err, found_orders)
    {
        console.log("2");
        var orders = ["None"];
        if ( err ) return console.error( err );
        if(null != found_orders)
        {
            console.log("3");
            var temp_res = new restaurant.Restaurant();
            found_orders.forEach(function(order_found) {
                temp_res.getRestaurantById(order_found.restaurant_id,function(err, found_restaurant){
                    orders.push(found_restaurant);
                });
            });
        }
        res.render('demandeLivraison', {orders: orders});

    });
    */

});

module.exports = router;