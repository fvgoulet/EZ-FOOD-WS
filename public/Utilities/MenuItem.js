/**
 * Created by Gabriel on 2014-07-22.
 */

var mongoose = require( 'mongoose' );
MenuItem = mongoose.Schema({
    name : String,
    description: String,
    price: String,
    menuId: String
});

var menuItemModel = mongoose.model( 'MenuItem', MenuItem , 'MenuItem');

function MenuItem()
{
    this.menuItem = new menuItemModel();

    this.save = function(callback)
    {
        this.menuItem.save(callback);

    };

    this.getMenuItemByName = function(name , callback)
    {
        menuItemModel.findOne( { name: name }, callback);
    };

    this.getMenuItemByMenuId = function(menuId , callback)
    {
        menuItemModel.find( { menuId: menuId }, callback);
    };

    this.setMenuItem = function(menuItem)
    {
        this.menuItem = menuItem;
    };

    this.setName = function(name)
    {
        this.menuItem.name = name;
    };

    this.getName = function()
    {
        return this.menuItem.name;
    };

    this.getId = function()
    {
        return this.menuItem._id;
    };

    this.setMenuId = function(menuId)
    {
        this.menuItem.menuId = menuId;
    };

    this.getMenuId = function()
    {
        return this.menuItem.menuId;
    };


    this.getJSON = function()
    {
        return JSON.stringify(this.item).item;
    };
}

module.exports.MenuItem = MenuItem;
