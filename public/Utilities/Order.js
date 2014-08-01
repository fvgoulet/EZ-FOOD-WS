/**
 * Created by Gabriel on 2014-06-20.
 */
var mongoose = require( 'mongoose' );

schema = mongoose.Schema({
    client_id : String,
    restaurant_id : String,
    delivery_address_name : String,
    order_timestamp : { type : Date, default: Date.now },
    delivery_time: { type : Date, default: Date.now },
    items : [{item_id:String, quantity:Number}],
    status : Number
});
var order_model = mongoose.model( 'Orders', schema);

/*
 Status:
 1- Submitted by client
 2- Getting ready
 3- Ready
 4- Delivered
*/

function Order()
{

    //Constructor

    this.order = new order_model();

    this.save = function(callback)
    {
        this.order.save(callback);

    };

    /* This function sets the name.*/
    this.setClientId = function(id)
    {
        this.order.client_id = id;
    };
    this.setDeliveryAddressName = function(name)
    {
        this.order.delivery_address_name = name;
    };
    this.setRestaurantId = function(id)
    {
        this.order.restaurant_id = id;
    };
    this.setDeliveryTime = function(time)
    {
        this.order.delivery_time = time;
    };
    this.addItem = function(item_id, item_quantity)
    {
        this.order.items.push({item_id:item_id, quantity:item_quantity});
    };

    this.setStatus = function(Number)
    {
        this.order.status = Number;
    };

    this.getRelatedOrdersByRestaurant = function(restaurateurId, callback)
    {
        order_model.find({restaurant_id : restaurateurId}, callback)
    };

    this.getOrdersByStatus = function(status, callback) //where callback = function ( err, found_account )
    {
        order_model.find( { status : status }, callback);
    };
    this.getOrdersByLocation = function(address, callback) //where callback = function ( err, found_account )
    {
        order_model.find( { address : address }, callback);
    };

    this.getId = function()
    {
        return this.order._id;
    }

}

module.exports.Order = Order;