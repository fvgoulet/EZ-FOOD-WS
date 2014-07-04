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
    zipCode: String
});
restaurant_model = mongoose.model( 'restaurants', schema );

function Restaurant()
{

    //Constructor

    this.restaurant = new restaurant_model();

    this.openConnection = function()
    {
        mongoose.connect( 'mongodb://localhost/EZ-Food' );
    }

    this.save = function()
    {
        this.openConnection();
        console.log('Save Restaurant.');
        console.log(this.restaurant);
        this.restaurant.save(function(err)
        {
            console.log('Restaurant saved.');
            if(err)
            {
                console.log(err);
            }
            mongoose.connection.close()
        });
        return true;

    };

    this.setRestaurant = function(restaurant)
    {
        this.restaurant = restaurant;
    }
    this.closeConnection = function()
    {
        mongoose.connection.close();
    }

    /* This function sets the name.*/
    this.setName = function(name)
    {
        this.restaurant.name = name;
    };
    /* This function returns the username.*/
    this.getName = function()
    {
        return this.restaurant.name;
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