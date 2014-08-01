/**
 * Created by Alex on 2014-06-11.
 */


// Differents categories
// admin - 0
// entrepreneur -1
// restaurateur -2
// client - 3
// livreur - 4
var mongoose = require( 'mongoose' );
general_schema = mongoose.Schema({
    username : String,
    password: String,
    deliveryAddresses : [mongoose.Schema.Types.Mixed],
    category: Number,
    firstName: String,
    lastName: String,
    birthDate: String,
    email: String,
    phoneNumber: String,
    civicNo: String,
    apartment: String,
    street: String,
    city: String,
    province: String,
    zipCode: String
});

restaurateur_schema = mongoose.Schema({
    username : String,
    password: String,
    deliveryAddresses : [mongoose.Schema.Types.Mixed],
    category: Number,
    firstName: String,
    lastName: String,
    birthDate: String,
    email: String,
    phoneNumber: String,
    civicNo: String,
    apartment: String,
    street: String,
    city: String,
    province: String,
    zipCode: String,
    entrepreneur_id : String
});

var account_model = mongoose.model( 'accounts', general_schema , 'accounts');

function Account()
{
    this.account = new account_model();


    this.addDeliveryAddress = function(name, civicNo, apartment, street, city, province, zipCode)
    {
        var address = this.getAddressByName(name);
        if(null == address)
        {
            address = {};
            address['name'] = name;
            address['civicNo'] = civicNo;
            address['apartment'] = apartment;
            address['street'] = street;
            address['city'] = city;
            address['province'] = province;
            address['zipCode'] = zipCode;

            this.account.deliveryAddresses.push(address);
        }
    };

    this.save = function()
    {
        this.account.save(function(err)
        {
           if(err)
           {
               console.log(err);
           }
        });
        return true;
    };

    this.getAddressByName = function(name)
    {
        for(var x=0; x < this.account.deliveryAddresses.length; x++)
        {
            if (this.account.deliveryAddresses[x].name == name)
            {
                return this.account.deliveryAddresses[x];
            }
        }
        return null;
    };

    this.getAccount = function(username, password, callback)//function ( err, found_account )
    {
        account_model.findOne( { username: username , password: password}, callback);
    };

    this.getAccountFromId = function(id,callback)
    {
        account_model.findOne( { _id: id }, callback);

    };

    this.getAccountFromUsername = function(username,callback)
    {
        account_model.findOne( { username: username }, callback);
    };


    this.getAccountsByEntrepreneurId = function(entrepreneur_id, callback) //where callback = function ( err, found_account )
    {
        account_model.find( { entrepreneur_id: entrepreneur_id }, callback);
    };


    this.setAccount = function(account)
    {
        this.account = account;
    };

    this.deleteAccount = function(id, callback)
    {
        account_model.remove("ObjectId("+ id + ")", callback);
    };

    this.getAllAccounts = function(callback)
    {
        account_model.find().exec(callback);
    };

    this.setUsername = function(username)
    {
        this.account.username = username;
    };

    this.getUsername = function()
    {
        return this.account.username;
    };

    this.setPassword = function(password)
    {
        this.account.password = password;
    };

    this.getPassword = function()
    {
        return this.account.password;
    };

    this.setCategory = function(categoryId)
    {
        this.account.category = categoryId;
    };

    this.getCategoryId = function()
    {
        return this.account.category;
    };

    this.setFirstName = function(firstName)
    {
        this.account.firstName = firstName;
    };

    this.getFirstName = function()
    {
        return this.account.firstName;
    };

    this.setLastName = function(lastName)
    {
        this.account.lastName = lastName;
    };

    this.getLastName = function()
    {
        return this.account.lastName;
    };

    this.setBirthDate = function(birthDate)
    {
        this.account.birthDate = birthDate;
    };

    this.getBirthDate = function()
    {
        return this.account.birthDate;
    };

    this.setEmail = function(email)
    {
        this.account.email = email;
    };

    this.getEmail = function()
    {
        return this.account.email;
    };

    this.setPhoneNumber = function(phoneNumber)
    {
        this.account.phoneNumber = phoneNumber;
    };

    this.getPhoneNumber = function()
    {
        return this.account.phoneNumber;
    };

    this.setCategory = function(category)
    {
        this.account.category = category;
    };

    this.getCategory = function()
    {
        return this.account.category;
    };

    this.getJSON = function()
    {
        return JSON.stringify(this.account).account;
    };

    this.setCivicNo = function(civic_no)
    {
        this.account.civicNo = civic_no;
    };

    this.getCivicNo = function()
    {
        return this.account.civicNo;
    };

    this.setApartment = function(apartment)
    {
        this.account.apartment = apartment;
    };
    
    this.getApartment = function()
    {
        return this.account.apartment;
    };

    this.setStreet = function(street)
    {
        this.account.street = street;
    };

    this.getStreet = function()
    {
        return this.account.street;
    };

    this.setCity = function(city)
    {
        this.account.city = city;
    };

    this.getCity = function()
    {
        return this.account.city;
    };

    this.setProvince = function(province)
    {
        this.account.province = province;
    };

    this.getProvince = function()
    {
        return this.account.province;
    };

    this.setZipCode = function(zip_code)
    {
        this.account.zipCode = zip_code;
    };

    this.getZipCode = function()
    {
        return this.account.zipCode;
    };

    this.setEntrepreneurId = function(entrepreneur_id)
    {

        var new_account_model = mongoose.model( 'reastaurateurs', restaurateur_schema , 'accounts');

        this.account = new new_account_model(this.account );
        this.account.entrepreneur_id = entrepreneur_id;

    };
   
    this.getEntrepreneurId = function()
    {
        return this.account.entrepreneur_id;
    };

    this.getId = function()
    {
        return this.account._id;
    };
    this.getAddress = function()
    {
        var compiledAddress = this.account.civicNo + " " + this.account.street + "#" + this.account.apartment + ", " + this.account.city + ", " + this.account.province + ", " + this.account.zipCode;
        return compiledAddress;
    }
}

module.exports.Account = Account;