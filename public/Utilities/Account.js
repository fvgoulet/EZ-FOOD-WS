/**
 * Created by Alex on 2014-06-11.
 */
var mongoose = require( 'mongoose' );
schema = mongoose.Schema({
    username : String,
    password: String,
    category: Number,
    firstName: String,
    lastName: String,
    birthDate: String,
    email: String,
    phoneNumber: String,
    civicNo: String,
    appartment: String,
    street: String,
    city: String,
    province: String,
    zipCode: String
});
var account_model = mongoose.model( 'accounts', schema );

function Account()
{

    this.account = new account_model();

    this.save = function()
    {
        console.log('Save Account.');
        console.log(this.account);
        this.account.save(function(err)
        {
            console.log('Account saved.');
            if(err)
            {
                console.log(err);
            }
            mongoose.connection.close()
        });
        return true;
    };

    this.getAccount = function(username, password, callback) {
        account_model.findOne({ username: username, password: password}, callback);
    };

    this.getAccountFromId = function(id,callback)
    {
        account_model.findOne( { _id: id }, callback);

    };

    this.getAccountFromUsername = function(username,callback)
    {
        account_model.findOne( { username: username }, callback);
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

    /* This function sets the username.*/
    this.setUsername = function(username)
    {
        this.account.username = username;
    };
    /* This function returns the username.*/
    this.getUsername = function()
    {
        return this.account.username;
    };

    /* This function sets the password.*/
    this.setPassword = function(password)
    {
        this.account.password = password;
    };
    /* This function returns the password.*/
    this.getPassword = function()
    {
        return this.account.password;
    };

    /* This function sets the categoryId.*/
    this.setCategory = function(categoryId)
    {
        this.account.category = categoryId;
    };
    /* This function returns the categoryId.*/
    this.getCategoryId = function()
    {
        return this.account.category;
    };

    /* This function sets the firstName.*/
    this.setFirstName = function(firstName)
    {
        this.account.firstName = firstName;
    };
    /* This function returns the firstName.*/
    this.getFirstName = function()
    {
        return this.account.firstName;
    };

    /* This function sets the lastName.*/
    this.setLastName = function(lastName)
    {
        this.account.lastName = lastName;
    };
    /* This function returns the lastName.*/
    this.getLastName = function()
    {
        return this.account.lastName;
    };


    /* This function sets the birthDate.*/
    this.setBirthDate = function(birthDate)
    {
        this.account.birthDate = birthDate;
    };
    /* This function returns the birthDate.*/
    this.getBirthDate = function()
    {
        return this.account.birthDate;
    };

    /* This function sets the email.*/
    this.setEmail = function(email)
    {
        this.account.email = email;
    };
    /* This function returns the email.*/
    this.getEmail = function()
    {
        return this.account.email;
    };

    /* This function sets the phoneNumber.*/
    this.setPhoneNumber = function(phoneNumber)
    {
        this.account.phoneNumber = phoneNumber;
    };
    /* This function returns the phoneNumber.*/
    this.getPhoneNumber = function()
    {
        return this.account.phoneNumber;
    };

    /* This function sets the address.*/
    this.setCategory = function(category)
    {
        this.account.category = category;
    };
    /* This function returns the address.*/
    this.getCategory = function()
    {
        return this.account.category;
    };


    this.getJSON = function()
    {
        return JSON.stringify(this.account).account;
    };


    /* This function sets the address.*/
    this.setCivicNo = function(civic_no)
    {
        this.account.civicNo = civic_no;
    };
    /* This function returns the address.*/
    this.getCivicNo = function()
    {
        return this.account.civicNo;
    };

    /* This function sets the address.*/
    this.setAppartment = function(appartment)
    {
        this.account.appartment = appartment;
    };
    /* This function returns the address.*/
    this.getAppartment = function()
    {
        return this.account.appartment;
    };


    /* This function sets the address.*/
    this.setStreet = function(street)
    {
        this.account.street = street;
    };
    /* This function returns the address.*/
    this.getStreet = function()
    {
        return this.account.street;
    };

    /* This function sets the address.*/
    this.setCity = function(city)
    {
        this.account.city = city;
    };
    /* This function returns the address.*/
    this.getCity = function()
    {
        return this.account.city;
    };



    /* This function sets the address.*/
    this.setProvince = function(province)
    {
        this.account.province = province;
    };
    /* This function returns the address.*/
    this.getProvince = function()
    {
        return this.account.province;
    };


    /* This function sets the address.*/
    this.setZipCode = function(zip_code)
    {
        this.account.zipCode = zip_code;
    };
    /* This function returns the address.*/
    this.getZipCode = function()
    {
        return this.account.zipCode;
    };
}

module.exports.Account = Account;