/**
 * Created by Gabriel on 2014-07-25.
 */
var express = require('express');
var router = express.Router();
var account = require('../public/Utilities/Account');
var order = require('../public/Utilities/Order');
var restaurant = require('../public/Utilities/Restaurant');

router.get('/', function(req, res) {
    var waitingForDelivery = 3;
    var schemaOrder = new order.Order();
    schemaOrder.getOrdersByStatus(waitingForDelivery,function(err, foundOrders){
        if ( err ) return console.error(err);
        var schemaRestaurant = new restaurant.Restaurant();
        var restaurantsID = [];
        var clientsID = [];
        foundOrders.forEach(function(Order){
            if(restaurantsID.indexOf(Order.restaurant_id)==-1){
                restaurantsID.push(Order.restaurant_id);
            }
            if(clientsID.indexOf(Order.client_id)==-1){
                clientsID.push(Order.client_id);
            }
        });
        schemaRestaurant.getRestaurantsByIds(restaurantsID, function(err, foundRestaurants){
            if ( err ) return console.error(err);
            var schemaAccount = new account.Account();
            schemaAccount.getAccountsByIds(clientsID, function(err, foundAccounts){
                if ( err ) return console.error(err);
                res.render('demandeLivraison', {orders: foundOrders, restaurants: foundRestaurants, accounts: foundAccounts});
            });
        });
    });


});



router.post('/acceptDelivery', function(req, res) {

    if (req.method == 'POST'){
        var post_data = '';
        req.on('data', function (data) {
            post_data += data;
        });
        var actual_account;
        if((req.session.account)){
            actual_account = JSON.parse(req.session.account).account;
        }

        req.on('end', function (){
            var json_data = JSON.parse(post_data);
            var schemaOrder = new order.Order();
            schemaOrder.getOrderById(json_data.orderId, function(err, foundOrder){
                if (err) return console.error(err);
                if(foundOrder.status == 3){
                    var tempOrder = new order.Order();
                    tempOrder.setOrder(foundOrder);
                    tempOrder.setStatus(4);
                    tempOrder.setdeliveryManId(actual_account._id);
                    tempOrder.setdeliveryAcceptationTime(Date.now());
                    tempOrder.save();
                    res.send('This order was added to your delivery. Congrats!');
                }
                else{
                    res.send('Oups! Somebody already took that order while you were looking at it.');
                }
            });
        });
    }
});

router.get('/orderBook', function(req, res) {
    var actual_account;
    if((req.session.account)){
        actual_account = JSON.parse(req.session.account).account;
        var schemaOrder = new order.Order();
        schemaOrder.getOrdersByLivreurId(actual_account._id, function(err, foundOrders){
            if (err) return console.error(err);
            var schemaRestaurant = new restaurant.Restaurant();
            var restaurantsID = [];
            foundOrders.forEach(function(Order){
                if(restaurantsID.indexOf(Order.restaurant_id)==-1){
                    restaurantsID.push(Order.restaurant_id);
                }
            });
            schemaRestaurant.getRestaurantsByIds(restaurantsID, function(err, foundRestaurants){
                if ( err ) return console.error(err);
                res.render('orderBook', {orders: foundOrders, account: actual_account, restaurants: foundRestaurants});
            });
        });
    }
});

module.exports = router;