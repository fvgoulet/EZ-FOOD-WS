/**
 * Created by Gabriel on 2014-06-20.
 */
var mongoose = require( 'mongoose' );
schema = mongoose.Schema({
    client_id : String,
    restaurant_id : String,
    order_timestamp : { type : Date, default: Date.now },
    delivery_schedule : { type : Date, default: Date.now },
    items : [{item_id:String, quantity:Number}]
});
var order_model = mongoose.model( 'Orders', schema );


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

    this.setRestaurantId = function(id)
    {
        this.order.restaurant_id = id;
    };

    this.addItem = function(item_id, item_quantity)
    {
        this.order.items.push({item_id:item_id, quantity:item_quantity});
    };

}

module.exports.Order = Order;