/**
 * Created by Alex on 2014-06-11.
 */

function Account(JSONaccount, mongoose)
{
    this.schema = mongoose.Schema({
        username : String,
        password: String,
        categoryId: String,
        firstName: String,
        lastName: String,
        birthDate: String,
        email: String,
        phoneNumber: String,
        address: String
    });


    this.model = mongoose.model("Account",this.schema);

    //Constructor
    this.account = new this.model(JSONaccount);
    this.mongoose = mongoose;

    this.accountExist = function(user)
    {
        return this.account.find({username : user }, function(err,returnValue)
        {
            if(err)
            {
                console.log(err);
                return null;
            }
            return returnValue;
        });
    };

    this.insertToDB = function()
    {
        if(!this.accountExist(this.account.username))
        {
            this.account.save(function(err)
            {
               if(err)
               {
                   console.log(err);
                   return false;
               }
            });
            return true;
        }
        return false;
    };

    this.updateInDB = function()
    {
        if(this.accountExist(this.account.username))
        {
            this.account.save(function(err)
            {
                if(err)
                {
                    console.log(err);
                    return false;
                }
            });
            return true;
        }
        return false;
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
    this.setCategoryId = function(categoryId)
    {
        this.account.categoryId = categoryId;
    };
    /* This function returns the categoryId.*/
    this.getCategoryId = function()
    {
        return this.account.categoryId;
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
    this.setAddress = function(address)
    {
        this.account.address = address;
    };
    /* This function returns the address.*/
    this.getAddress = function()
    {
        return this.account.address;
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
}

module.exports.Account = Account;