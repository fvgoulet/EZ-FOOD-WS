/**
 * Created by Gabriel on 2014-07-22.
 */

var mongoose = require( 'mongoose' );
schema = mongoose.Schema({
    name : String,
    description: String,
    restaurantId: String
});

var menuModel = mongoose.model( 'Menu', schema , 'Menu');

function Menu()
{

    this.menu = new menuModel();

    this.save = function(callback)
    {
        this.menu.save(callback);

    };

    this.deleteMenu = function(id, callback)
    {
        this.menu.remove({_id: id}, callback);
    };

    this.getMenuByName = function(name , callback)
    {
        menuModel.findOne( { name: name }, callback);
    };

    this.getMenuById = function(id , callback)
    {
        menuModel.findOne( { _id: id }, callback);
    };

    this.getMenuByRestaurantId = function(restaurantId , callback)
    {
        menuModel.find( { restaurantId: restaurantId }, callback);
    };


    this.setMenu = function(menu)
    {
        this.menu = menu;
    }

    this.setName = function(name)
    {
        this.menu.name = name;
    };

    this.getName = function()
    {
        return this.menu.name;
    };

    this.setDescription = function(description)
    {
        this.menu.description = description;
    };

    this.getDescription = function()
    {
        return this.menu.description;
    };

    this.getId = function()
    {
        return this.menu._id;
    };

    this.setRestaurantID = function(restaurantId)
    {
        this.menu.restaurantId = restaurantId;
    };

    this.getRestaurantId = function()
    {
        return this.menu.restaurantId;
    };


    this.getJSON = function()
    {
        return JSON.stringify(this.menu).menu;
    };
}

module.exports.Menu = Menu;

