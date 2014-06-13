/**
 * Created by Felix on 2014-06-12.
 */

var acc = require("Account");
var mongo = require('mongoskin');

function DBHandler()
{

    this.Construct = function()
    {
        this.db = mongo.db("mongodb://localhost:27017/EZ-Food", {native_parser:true});
    }

    this.selectAccount = function(username)
    {
        var jsonUsername = {username: username};
        var account = new acc.Account();
        return account.Construct(db.get("Accounts").find(jsonUsername))
    }

    // Insert a new account, true if added, false if username already exists
    this.insertAccount = function(account)
    {
        if(!this.accountExist(account))
        {
            db.get("Accounts").insert(account.getJSONDefinition());
            return true;
        }
        else
        {
            return false;
        }

    }

    //Find if the account exists
    this.accountExist = function(account)
    {
        if(db.get("Accounts").find(account.getJSONUsername()) != {})
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    //Save an account to the DB
    this.updateAccount = function(account)
    {
        if(this.accountExist(account))
        {
            db.get("Accounts").update(account.getJSONUsername(),account.getJSONDefinition());
            return true;
        }
        else
        {
            return false;
        }
    }
}

module.exports.DBHandler = DBHandler;