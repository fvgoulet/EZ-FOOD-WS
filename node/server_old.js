
var http = require( 'http' );
var port = process.env.port || 1337;

var mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/ezfood_db' );

var query_string = require( 'querystring' );

var COMPANY_NAME = 'EZ-Food'; // This 'constant' represents the text of the header on each page. 

var Account_schema = new mongoose.Schema( 
{
    user_name: String
    , first_name: String
    , second_name: String
    , birth_date: String
    , address: String
    , phone_number: String
    , password: String
    , email: String
    , account_category: Number
});

http.

http.createServer( function ( request, response ) {
    // url_path represents the url's path.
    var url = request.url;
    var web_page = '';
    var posted_data = '';

    var Account = mongoose.model('accounts', Account_schema);

    //////////////////////// TESTS SECTION ///////////////////////////////
    // This section will be to remove before the first iteration, use to perform test on posted data.
    request.on( 'data', function ( data ) {
        posted_data += data;
    });
    ///////////////////// END OF TESTS SECTION ////////////////////////////

    // If it's the default page(no url arguments).
    if ( '/' == url ) {
        web_page = getHomePage(); // Get the home page.
        
        request.on( 'end',function () {
            if ( posted_data != '' ) {
                console.log(posted_data);
                var parsed_data = query_string.parse( posted_data );

                console.log( 'Posted date : ' + parsed_data );
                // This will retrieve the user in the db.

                Account.findOne({ user_name: parsed_data.user_name, password: parsed_data.password }, function (err, found_account)
                {
                    if ( err ) return console.error( err );
                    console.log( found_account );
                    if(null != found_account)
                    {                        
                        web_page = getLoggedPage(parsed_data.user_name);
                        writeResponse(response,web_page);
                    }
                });
            }
            else
            {
                writeResponse(response,web_page);
            }
        });

    }
    else if ( '/sign_in' == url ) {
        request.on( 'end', function ()
        {
            if ( posted_data != '' )
            {

                var parsed_data = query_string.parse( posted_data );

                console.log( 'Posted date : ' + parsed_data );

                Account.findOne({ user_name: query_string.parse(posted_data).user_name }, function (err, found_accounts)
                {
                    if ( err ) return console.error( err );
                    if(null == found_accounts)
                    {

                        console.log( found_accounts );
                
                        // This create a new user in the db.
                        var new_account = new Account(
                        {
                            user_name: parsed_data.user_name
                            , first_name: parsed_data.first_name
                            , second_name: parsed_data.second_name
                            , birth_date: parsed_data.birth_date
                            , address: parsed_data.address
                            , phone_number: parsed_data.phone_number
                            , password: parsed_data.password
                            , email: parsed_data.email
                        });

                        new_account.save( function ( err, new_account ) 
                        {
                            if ( err ) return console.error( err );
                            console.dir( new_account );
                        });
                    }
                    else
                    {
                        console.log('The account already exists.');
                    }

                });
            }
        });

        web_page = getSignInPage(); // Get the Sign in page.
        writeResponse(response, web_page);
    }

    else if ( '/create_account' == url ) {

        web_page = getCreateAccountPage(false); // Get the Create Account page.
        writeResponse(response ,web_page);
    }
    else if ( '/manage_account' == url ) {
        request.on( 'end',function () {
            if ( posted_data != '' ) {
                console.log(posted_data);
                var parsed_data = query_string.parse( posted_data );

                console.log( 'Posted date : ' + parsed_data );
                // This will retrieve the user in the db.

                account.findOne( { user_name: parsed_data.user_name }, function ( err, found_account ) 
                {
                    if ( err ) return console.error( err );
                    console.log( found_account );
                    if(null != found_account)
                    {                        
                        web_page = getManageAccountPage(found_account); // Get the Create Account page.
                        writeResponse(response, web_page);
                    };
                });
            }
        });  
    }
    else if ( '/manage_account/validation' == url ) {
        request.on( 'end',function () {
            if ( posted_data != '' ) {
                console.log(posted_data);
                var parsed_data = query_string.parse( posted_data );
                web_page = getEditAccountConfirmation(parsed_data); // Get the Create Account page.
                writeResponse(response, web_page);
            };
        });
 
    }
    else if ( '/create_account/validation' == url ) {
        request.on( 'end',function () {
            if ( posted_data != '' ) {
                console.log(posted_data);
                var parsed_data = query_string.parse( posted_data );
                web_page = getCreateAccountConfirmation(parsed_data); // Get the Create Account page.
                writeResponse(response, web_page);
            };
        });
 
    }
    else if ( '/manage_account/validation/confirmed' == url ) {
        request.on( 'end', function ()
        {
            if ( posted_data != '' )
            {

                var parsed_data = query_string.parse( posted_data );

                console.log( 'Posted data : ' + parsed_data );

                account.findOne( { user_name: parsed_data.user_name }, function ( err, found_accounts ) 
                {
                    if ( err ) return console.error( err );
                    if(null != found_accounts)
                    {

                        console.log( found_accounts );
                
                        // This create a new user in the db.
                        found_accounts.first_name = parsed_data.first_name;
                        found_accounts.second_name = parsed_data.second_name;
                        found_accounts.birth_date = parsed_data.birth_date;
                        found_accounts.address = parsed_data.address;
                        found_accounts.phone_number = parsed_data.phone_number;
                        found_accounts.password = parsed_data.password;
                        found_accounts.email = parsed_data.email;

                        found_accounts.save( function ( err, new_account ) 
                        {
                            if ( err ) return console.error( err );
                            console.log('account modified');
                            console.dir( new_account );
                        });
                    }


                });
            };
        });

        web_page = getSignInPage(); // Get the Sign in page.
        writeResponse(response, web_page);
    }
    else {
        web_page = 'NOT IMPLEMENTED , url : ' + url;
        writeResponse(response, web_page);
    };

}).listen( port );


function writeResponse(response, web_page)
{

    // Writes the beginning of the page.
    response.writeHead( 200, { 'Content-Type': 'text/html' });

    // Writes the content of the page. 
    response.write( web_page );

    // Writes the end of the page.
    response.end();
};
    // This function returns the home page.
function getHomePage() {
    var web_page = '<a href="/sign_in">Sign in</a> <br>' +
        '<a href="/create_account">Create Account</a> ';

    web_page = getHeaderOfPage() + web_page + getEndOfPage();

    return web_page;
};

function getLoggedPage(username) {
    var web_page = '<p>You are logged as : ' + username + '</p><br>' +
        '<form method="post" action="/manage_account">' +
        '<input type="hidden" name="user_name" value="' + username + '">' +
        '<input type="submit" value="Manage Account">' +
        '</form>';

    web_page = getHeaderOfPage() + web_page + getEndOfPage();

    return web_page;
};

function getSignInPage() {
    var web_page = '<form method="post" action="/">' +
        '<p>User name : <input type="text" name="user_name"></p>' +
        '<p>Password : <input type="password" name="password"></p>' +
        '<input type="submit" value="Sign In">' +
        '</form>';

    web_page = getHeaderOfPage() + web_page + getEndOfPage();

    return web_page;
};

function getCreateAccountPage(is_user_already_exist) {
    console.log('Does the user already exists ? : ' + is_user_already_exist);

    var web_page = '<form method="post" action="/create_account/validation">' +
        '<script>' +
        '$(function() {' +
        '$( "#datepicker" ).datepicker();' +
        '});' +
        '</script>' +
        '<p>User name : <input type="text" name="user_name"></p>' +
        '<p>Password : <input type="password" name="password"></p>' +
        '<p>First name : <input type="text" name="first_name"></p>' +
        '<p>Second name : <input type="text" name="second_name"></p>' +
        '<p>Birth date : <input type="text" name="birth_date"></p>' +
        '<p>Address : <input type="text" name="address" id="datepicker"></p>' +
        '<p>Phone number : <input type="text" name="phone_number"></p>' +
        '<p>Email : <input type="text" name="email"></p>' +
        '<input type="submit" value="Create">' +
        '</form>';

    if(true == is_user_already_exist)
    {
        web_page = '<h2 style="background-color:red;">Error : The username already exist.</h2>' + web_page;
    };

    web_page = getHeaderOfPage() + web_page + getEndOfPage();

    return web_page;
};

function getManageAccountPage(actual_loaded_account) {
    var web_page = '<h3>Manage your account :</h3>' +
    '<form method="post" action="/manage_account/validation">' +
    '<input type="hidden" name="user_name" value="'+ actual_loaded_account.user_name + '">' +
        '<p>Password : <input type="password" name="password" value="'+ actual_loaded_account.password + '"></p>' +
        '<p>First name : <input type="text" name="first_name" value="'+ actual_loaded_account.first_name + '"></p>' +
        '<p>Second name : <input type="text" name="second_name" value="'+ actual_loaded_account.second_name + '"></p>' +
        '<p>Birth date : <input type="text" name="birth_date" value="'+ actual_loaded_account.birth_date + '"></p>' +
        '<p>Address : <input type="text" name="address" value="'+ actual_loaded_account.address + '"></p>' +
        '<p>Phone number : <input type="text" name="phone_number" value="'+ actual_loaded_account.phone_number + '"></p>' +
        '<p>Email : <input type="text" name="email" value="'+ actual_loaded_account.email + '"></p>' +
        '<input type="submit" value="Submit">' +
        '</form>';

    web_page = getHeaderOfPage() + web_page + getEndOfPage();

    return web_page;
};

function getEditAccountConfirmation(actual_loaded_account) {

    var web_page = '<h3>Confirm your modifications :</h3>' +
    
        '<p>Password : '+ actual_loaded_account.password + '</p>' +
        '<p>First name : '+ actual_loaded_account.first_name + '</p>' +
        '<p>Second name : '+ actual_loaded_account.second_name + '</p>' +
        '<p>Birth date : '+ actual_loaded_account.birth_date + '</p>' +
        '<p>Address : '+ actual_loaded_account.address + '</p>' +
        '<p>Phone number : '+ actual_loaded_account.phone_number + '</p>' +
        '<p>Email : '+ actual_loaded_account.email + '</p>' +

        '<form method="post" action="/manage_account/validation/confirmed">' +
        '<input type="hidden" name="user_name" value="'+ actual_loaded_account.user_name + '">' +
        '<input type="hidden" name="password" value="'+ actual_loaded_account.password + '">' +
        '<input type="hidden" name="first_name" value="'+ actual_loaded_account.first_name + '">' +
        '<input type="hidden" name="second_name" value="'+ actual_loaded_account.second_name + '">' +
        ' <input type="hidden" name="birth_date" value="'+ actual_loaded_account.birth_date + '">' +
        '<input type="hidden" name="address" value="'+ actual_loaded_account.address + '">' +
        '<input type="hidden" name="phone_number" value="'+ actual_loaded_account.phone_number + '">' +
        '<input type="hidden" name="email" value="'+ actual_loaded_account.email + '">' +
        '<input type="submit" value="Submit">' +
        '</form>';

    web_page = getHeaderOfPage() + web_page + getEndOfPage();

    return web_page;
};

function getCreateAccountConfirmation(actual_loaded_account) {

    var web_page = '<h3>Confirm your informations :</h3>' +
        '<p>Username : '+ actual_loaded_account.user_name + '</p>' +
        '<p>Password : '+ actual_loaded_account.password + '</p>' +
        '<p>First name : '+ actual_loaded_account.first_name + '</p>' +
        '<p>Second name : '+ actual_loaded_account.second_name + '</p>' +
        '<p>Birth date : '+ actual_loaded_account.birth_date + '</p>' +
        '<p>Address : '+ actual_loaded_account.address + '</p>' +
        '<p>Phone number : '+ actual_loaded_account.phone_number + '</p>' +
        '<p>Email : '+ actual_loaded_account.email + '</p>' +

        '<form method="post" action="/sign_in">' +
        '<input type="hidden" name="user_name" value="'+ actual_loaded_account.user_name + '">' +
        '<input type="hidden" name="password" value="'+ actual_loaded_account.password + '">' +
        '<input type="hidden" name="first_name" value="'+ actual_loaded_account.first_name + '">' +
        '<input type="hidden" name="second_name" value="'+ actual_loaded_account.second_name + '">' +
        ' <input type="hidden" name="birth_date" value="'+ actual_loaded_account.birth_date + '">' +
        '<input type="hidden" name="address" value="'+ actual_loaded_account.address + '">' +
        '<input type="hidden" name="phone_number" value="'+ actual_loaded_account.phone_number + '">' +
        '<input type="hidden" name="email" value="'+ actual_loaded_account.email + '">' +
        '<input type="submit" value="Submit">' +
        '</form>';

    web_page = getHeaderOfPage() + web_page + getEndOfPage();

    return web_page;
};

// This function returns the header of an Html file.
function getHeaderOfPage() {
    var web_page = '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '<title>' + COMPANY_NAME + '</title>' +
        '</head>' +
        '<body>';

    return web_page;
};

// This function returns the end of an Html file.
function getEndOfPage() {
    var web_page = '</body>' +
        '</html>';

    return web_page;
};