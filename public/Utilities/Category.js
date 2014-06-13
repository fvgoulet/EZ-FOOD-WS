/**
 * Created by Alex on 2014-06-11.
 */
function Category() {
    this.Id = null;
    this.Name = null;
    this.Description = null;

    this.Construct = function(JSONDefinition)
    {
        this.Id = JSONDefinition.Id;
        this.Name = JSONDefinition.Name;
        this.Description = JSONDefinition.Description;
    };

    this.getJSONId = function()
    {
        return {Id: this.Id};
    };

    //return the object as JSON representation
    this.getJSONDefinition = function ()
    {
        return this.toJSON();
        /*return {Id: this.Id,
                Name: this.Name,
                Description: this.Description };*/
    };

    /* This function returns the Id.*/
    this.getId = function ()
    {
        return this.Id;
    };

    /* This function returns the Name.*/
    this.getName = function ()
    {
        return this.Name;
    };

    /* This function returns the username.*/
    this.getDescription = function ()
    {
        return this.Description;
    };

    /* This function sets the username.*/
    this.setId = function (Id)
    {
        this.Id = Id;
    };

    /* This function sets the username.*/
    this.setName = function (Name)
    {
        this.Name = Name;
    };

    /* This function sets the username.*/
    this.setDescription = function (Description)
    {
        this.Description = Description;
    };
}

module.exports.Category = Category;