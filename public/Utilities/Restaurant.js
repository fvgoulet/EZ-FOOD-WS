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
    entrepreneur_id: String
});
var restaurant_model = mongoose.model( 'restaurants', schema );

function Restaurant()
{

    //Constructor

    this.restaurant = new restaurant_model();

    this.save = function()
    {
        this.restaurant.save(function(err)
        {
            console.log('Restaurant saved.');
            if(err)
            {
                console.log(err);
            }
        });
        return true;

    };

    this.getRestaurantsByEntrepreneurId = function(entrepreneur_id , callback) //where callback = function ( err, found_account )
    {
        restaurant_model.find( { entrepreneur_id: entrepreneur_id }, callback);
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
}

module.exports.Restaurant = Restaurant;