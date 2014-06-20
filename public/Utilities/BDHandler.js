/**
 * Created by Felix on 2014-06-12.
 */

var accountClass = require("./Account");
var categoryClass = require("./Category");
var mongoose = require( 'mongoose' );

var account_schema = new mongoose.Schema(
{
    username: String
    ,password: String
    ,categoryId: String
    ,firstName: String
    ,lastName: String
    ,birthDate: String
    ,email: String
    ,phoneNumber: String
    ,address: String

});

function DBHandler()
{

    this.accounts = null;

    this.Construct = function()
    {

        mongoose.connect( 'mongodb://localhost/EZ-Food' );


        this.accounts = mongoose.model( 'Accounts', account_schema );

        //this.new_account = null;
    };

    this.selectAccount = function(username)
    {
        var jsonUsername = {"username": username};
        console.log(jsonUsername);
        this.accounts.find(jsonUsername,  function(err, result)
        {

            if (err) return console.error(err);
            console.log("Sign in :");
            console.log(result);

        });
       /* var jsonUsername = {"username": username};

        var account = new accountClass.Account();



        this.db.collection('Accounts').findOne(jsonUsername, function (err, result) {
                if (err) throw err;
        });
;
        console.log(test);
        account.Construct(read);

        return account;*/
    };

    this.selectAllAccount = function()
    {
        /*var accounts = db.collection("Accounts").find();
        var list = [];
        forEach(acc in accounts)
        {
            var temp = new accountClass.Account();
            temp.Construct(acc);
            list.push(temp);
        }
        return list;*/
    };

    // Insert a new account, true if added, false if username already exists
    this.insertAccount = function(account)
    {
        console.log(this.accounts);
        this.new_account = new this.accounts(account);
        console.log(account.getJSONUsername());
        this.accounts.find(account.getJSONUsername(),  function(err, result)
        {
            if (err) return console.error(err);
            console.log(result);
            if (result)
            {
                console.log("Create new account");
                console.log(this.new_account);
                this.new_account.save(function (err, new_account)
                {
                    if (err) return console.error(err);
                    console.log("Created new account");
                });
            }
            else
            {
                console.log("else");
            }

        });


    };

    //Find if the account exists


    //Save an account to the DB
    this.updateAccount = function(account)
    {
       /* if(this.accountExist(account))
        {
            this.db.collection("Accounts").update(account.getJSONUsername(),account.getJSONDefinition());
            return true;
        }
        else
        {
            return false;
        }*/
    };

    //return an instance of Category
    this.getCategory = function(categoryId)
    {
        /*var jsonCategoryId = {"categoryId": categoryId};
        var category = new categoryClass.Category();
        return category.Construct(db.collection("Categories").find(jsonCategoryId))*/
    };
}

module.exports.DBHandler = DBHandler;