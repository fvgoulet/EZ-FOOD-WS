/**
 * Created by mn             yyyyy on 2014-06-12.
 */
/**
 * Created by Alex on 2014-06-11.
 */
function DBHandler() {

    this.Construct = function(DB)
    {
        this.db = DB;
    }

    //Save an account to the DB
    this.saveAccount = function(account)
    {
        db["Accounts"].update(account.getJSONDefinition())
    }

    /* This function returns the Id.*/
    this.getId = function () {
        return this.Id;
    }

    /* This function returns the Name.*/
    this.getName = function () {
        return this.Name;
    }

    /* This function returns the username.*/
    this.getDescription = function () {
        return this.Description;
    }

    /* This function sets the username.*/
    this.setId = function (Id) {
        this.Id = Id;
    }

    /* This function sets the username.*/
    this.setName = function (Name) {
        this.Name = Name;
    }

    /* This function sets the username.*/
    this.setDescription = function (Description) {
        this.Description = Description;
    }
}

module.exports.DBHandler = DBHandler;