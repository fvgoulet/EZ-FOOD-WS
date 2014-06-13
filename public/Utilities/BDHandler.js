/**
 * Created by mn             yyyyy on 2014-06-12.
 */
/**
 * Created by Alex on 2014-06-11.
 */
var acc = require("Account")

function DBHandler()
{

    this.Construct = function(db)
    {
        this.db = db;
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
            db["Accounts"].update(account.getJSONUsername(),account.getJSONDefinition());
            return true;
        }
        else
        {
            return false;
        }
    }

    this.
}

module.exports.DBHandler = DBHandler;