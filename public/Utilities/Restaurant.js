/**
 * Created by Gabriel on 2014-06-20.
 */
var mongoose = require( 'mongoose' );
schema = mongoose.Schema({
    name : String,
    phoneNumber: String,
    civicNo: String,
    street: String,
    city: String,
    province: String,
    zipCode: String,
    entrepreneur_id: String,
    restaurateur_id: String
});
var restaurant_model = mongoose.model( 'restaurants', schema );

function Restaurant()
{

    //Constructor

    this.restaurant = new restaurant_model();

    this.save = function(callback)
    {
        this.restaurant.save(callback);

    };

    this.getRestaurantById = function(id, callback)
    {
        restaurant_model.findOne( { _id: id}, callback);
    }

    this.getRestaurantByName = function(name , callback) //where callback = function ( err, found_account )
    {
        restaurant_model.findOne( { name: name }, callback);
    };
    this.getRestaurantsByEntrepreneurId = function(entrepreneur_id , callback)
    {
        restaurant_model.find( { entrepreneur_id: entrepreneur_id }, callback);
    };
    this.getRestaurantsByRestaurateurId = function(restaurateur_id , callback)
    {
        restaurant_model.find( { restaurateur_id: restaurateur_id }, callback);
    };
    this.getAllRestaurants = function(callback) 
    {
        restaurant_model.find( {}, callback);
    };
    this.setRestaurant = function(restaurant)
    {
        this.restaurant = restaurant;
    }

    /* This function sets the name.*/
    this.setName = function(name)
    {
        this.restaurant.name = name;
    };
    /* This function returns the name.*/
    this.getName = function()
    {
        return this.restaurant.name;
    };
    this.getId = function()
    {
        return this.restaurant._id;
    };
    /* This function sets the name.*/
    this.setEntrepreneurId = function(entrepreneur_id)
    {
        this.restaurant.entrepreneur_id = entrepreneur_id;
    };
    /* This function returns the name.*/
    this.getEntrepreneurId = function()
    {
        return this.restaurant.entrepreneur_id;
    };

    /* This function sets the name.*/
    this.setRestaurateurId = function(restaurateur_id)
    {
        this.restaurant.restaurateur_id = restaurateur_id;
    };
    /* This function returns the name.*/
    this.getRestaurateurId = function()
    {
        return this.restaurant.restaurateur_id;
    };

    /* This function sets the phoneNumber.*/
    this.setPhoneNumber = function(phoneNumber)
    {
        this.restaurant.phoneNumber = phoneNumber;
    };
    /* This function returns the phoneNumber.*/
    this.getPhoneNumber = function()
    {
        return this.restaurant.phoneNumber;
    };

    this.getJSON = function()
    {
        return JSON.stringify(this.restaurant).restaurant;
    };

    /* This function sets the address.*/
    this.setCivicNo = function(civic_no)
    {
        this.restaurant.civicNo = civic_no;
    };
    /* This function returns the address.*/
    this.getCivicNo = function()
    {
        return this.restaurant.civicNo;
    };

    /* This function sets the address.*/
    this.setStreet = function(street)
    {
        this.restaurant.street = street;
    };
    /* This function returns the address.*/
    this.getStreet = function()
    {
        return this.restaurant.street;
    };

    /* This function sets the address.*/
    this.setCity = function(city)
    {
        this.restaurant.city = city;
    };
    /* This function returns the address.*/
    this.getCity = function()
    {
        return this.restaurant.city;
    };

    /* This function sets the address.*/
    this.setProvince = function(province)
    {
        this.restaurant.province = province;
    };
    /* This function returns the address.*/
    this.getProvince = function()
    {
        return this.restaurant.province;
    };

    /* This function sets the address.*/
    this.setZipCode = function(zip_code)
    {
        this.restaurant.zipCode = zip_code;
    };
    /* This function returns the address.*/
    this.getZipCode = function()
    {
        return this.restaurant.zipCode;
    };
    this.getAddress = function()
    {
        var compAdd = this.restaurant.civicNo + " " + this.restaurant.street + ", "+ this.restaurant.city + ", " + this.restaurant.province + ", " + this.restaurant.zipCode;
        return compAdd;
    }
}

module.exports.Restaurant = Restaurant;