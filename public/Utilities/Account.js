/**
 * Created by Alex on 2014-06-11.
 */
function Account()
{
    this.username = null;
    this.password = null;
    this.firstName = null;
    this.lastName = null;
    this.birthDate = null;
    this.email = null;
    this.phoneNumber = null;
    this.address = null;

    /* This function sets the username.*/
    this.setUsername = function(username)
    {
        this.username = username;
    }
    /* This function returns the username.*/
    this.getUsername = function()
    {
        return this.username;
    }

    /* This function sets the password.*/
    this.setPassword = function(password)
    {
        this.password = password;
    }
    /* This function returns the password.*/
    this.getPassword = function()
    {
        return this.password;
    }

    /* This function sets the firstName.*/
    this.setFirstName = function(firstName)
    {
        this.firstName = firstName;
    }
    /* This function returns the firstName.*/
    this.getFirstName = function()
    {
        return this.firstName;
    }

    /* This function sets the lastName.*/
    this.setLastName = function(lastName)
    {
        this.lastName = lastName;
    }
    /* This function returns the lastName.*/
    this.getLastName = function()
    {
        return this.lastName;
    }


    /* This function sets the birthDate.*/
    this.setBirthDate = function(birthDate)
    {
        this.birthDate = birthDate;
    }
    /* This function returns the birthDate.*/
    this.getBirthDate = function()
    {
        return this.birthDate;
    }

    /* This function sets the email.*/
    this.setEmail = function(email)
    {
        this.email = email;
    }
    /* This function returns the email.*/
    this.getEmail = function()
    {
        return this.email;
    }

    /* This function sets the phoneNumber.*/
    this.setPhoneNumber = function(phoneNumber)
    {
        this.phoneNumber = phoneNumber;
    }
    /* This function returns the phoneNumber.*/
    this.getPhoneNumber = function()
    {
        return this.phoneNumber;
    }

    /* This function sets the address.*/
    this.setAddress = function(address)
    {
        this.address = address;
    }
    /* This function returns the address.*/
    this.getAddress = function()
    {
        return this.address;
    }

    /* This function sets the address.*/
    this.setCategory = function(category)
    {
        this.category = category;
    }
    /* This function returns the address.*/
    this.getCategory = function()
    {
        return this.category;
    }
}

module.exports.Account = Account;