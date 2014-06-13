/**
 * Created by Felix on 2014-06-12.
 */

var accountClass = require("./Account");
var categoryClass = require("./Category")
var mongo = require('mongoskin');

function DBHandler()
{

    this.Construct = function()
    {
        this.db = mongo.db("mongodb://localhost:27017/EZ-Food", {native_parser:true});
    };

    this.selectAccount = function(username)
    {
        var jsonUsername = {"username": username};
        var account = new accountClass.Account();
        account.Construct(db.get("Accounts").find(jsonUsername))
        return account;
    };

    this.selectAllAccount = function()
    {
        var accounts = account.Construct(db.get("Accounts").find());
        var list = [];
        forEach(acc in accounts)
        {
            var temp = new accountClass.Account();
            temp.Construct(acc);
            list.push(temp);
        }
        return list;
    };

    // Insert a new account, true if added, false if username already exists
    this.insertAccount = function(account)
    {
        if(!this.accountExist(account))
        {
            this.db.collection("Accounts").insert(account.getJSONDefinition());
            return true;
        }
        else
        {
            return false;
        }

    };

    //Find if the account exists
    this.accountExist = function(account)
    {
        console.log(this.db.collection("Accounts").find(account.getJSONUsername()));
        return this.db.collection("Accounts").find(account.getJSONUsername()) != {};
    };

    //Save an account to the DB
    this.updateAccount = function(account)
    {
        if(this.accountExist(account))
        {
            this.db.collection("Accounts").update(account.getJSONUsername(),account.getJSONDefinition());
            return true;
        }
        else
        {
            return false;
        }
    };

    //return an instance of Category
    this.getCategory = function(categoryId)
    {
        var jsonCategoryId = {"categoryId": categoryId};
        var category = new categoryClass.Category();
        return category.Construct(db.collection("Categories").find(jsonCategoryId))
    };
}

module.exports.DBHandler = DBHandler;