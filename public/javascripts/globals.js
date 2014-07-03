// DOM Ready =============================================================
$(document).ready(function() {


    // Submit account button click
    $('#btnSubmitAccount').on('click', validateAccountFields);

    $('#btnSubmitModifications').on('click', validateAccountFields);




});


// Functions =============================================================

// validateAccountFields
function validateAccountFields(event) {
    event.preventDefault();
    // Set the max length of each fields.
    var MAX_FIELD_LENGTH = 30;

    // Set the min length of the username.
    var MIN_USERNAME_LENGTH = 4;

    // Set the regex for the format validation.
    var regexTextOnly = /[a-zA-Z]/;
    var regexEmail =/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    var regexPhoneNumber =/[1-9]\d{2}-\d{3}-\d{4}/;
    var regexStartWithNumber =/\d\w*/;
    var regexDate = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;

    // Check if all fields are filled.
    var emptyErrorCount = 0;
    var lengthErrorCount = 0;
    $('#createAccountFields input').each(function(index, val) {
        if($(this).val() === '') {
            emptyErrorCount++;
        }

        if(MAX_FIELD_LENGTH < $(this).val().length) {
            lengthErrorCount++;
        }
    });
    // Show an error if a field is not filled.
    if(0 != emptyErrorCount)
    {
        alert('Please fill all the fields.');
    }
    else if(0 != lengthErrorCount)
    {
        alert('One of your field is longer than ' + MAX_FIELD_LENGTH.toString() + '.');
    }
    else
    {
        var username = document.getElementsByName('username')[0].value ;
        //var password = document.getElementsByName('userPassword')[0].value ;
        var firstName = document.getElementsByName('userFirstName')[0].value ;
        var secondName = document.getElementsByName('userSecondName')[0].value ;
        var birthDate = document.getElementsByName('userBirthDate')[0].value ;
        var email = document.getElementsByName('userEmail')[0].value ;
        var phoneNumber = document.getElementsByName('userPhoneNumber')[0].value ;
        var civicNumber = document.getElementsByName('userCivicNumber')[0].value ;
        //var appartment = document.getElementsByName('userAppNumber')[0].value ;
        //var street = document.getElementsByName('userStreet')[0].value ;
        //var city = document.getElementsByName('userCity')[0].value ;
        //var province = document.getElementsByName('userProvince')[0].value ;
        //var zipCode = document.getElementsByName('userZipCode')[0].value ;



        // Check if the format of all fields are okay.
        if(MIN_USERNAME_LENGTH > username.toString().length)
        {
            alert('The Username must be longer than ' + (MIN_USERNAME_LENGTH - 1).toString() + '.');
        }
        else if(false == regexTextOnly.test(firstName))
        {
            alert('The first name should contain only letters.');
        }
        else if(false == regexTextOnly.test(secondName))
        {
            alert('The second name should contain only letters.');
        }
        else if(false == regexEmail.test(email))
        {
            alert('The email need to be valid.');
        }
        else if(false == regexPhoneNumber.test(phoneNumber))
        {
            alert('The phone number need to be on format : XXX-XXX-XXXX');
        }
        else if(false == regexStartWithNumber.test(civicNumber))
        {
            alert('The civic number should start with a number.');
        }
        else if(false == regexDate.test(birthDate))
        {
            alert('The birth date need to be on format : YYYY-MM-DD .');
        }
        else
        {
            // Everything is okay, go to the confirmation page.
            document.account.submit();
        }

    }
}

function checkAccountExist()
{
    var username = document.getElementsByName('username')[0].value ;

    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    // Callback on response.e
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            if("true" == xmlhttp.responseText)
            {
                // TODO : Add simili pop-up.
                document.getElementsByName("username")[0].setAttribute("style","background:red");
                document.getElementsByName("submit_button")[0].disabled = true;
            }
            else
            {
                // TODO : Remove simili pop-up.
                document.getElementsByName("username")[0].setAttribute("style","background:white");
                document.getElementsByName("submit_button")[0].disabled = false;
            }

        }
    };
    xmlhttp.open("POST","/createAccount/isAccountExist",true);
    xmlhttp.send("username=" + username);
}

function manageRestaurateur()
{
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    // Callback on response.e
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.getElementById("content").innerHTML = xmlhttp.responseText;

        }
    };

    xmlhttp.open("GET","/manageRestaurateur",true);
    xmlhttp.send();
}

function showAddNewRestaurateur()
{
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    // Callback on response.e
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.getElementById("content").innerHTML = xmlhttp.responseText;

        }
    }

    xmlhttp.open("GET","/manageRestaurateur/addNewRestaurateur",true);
    xmlhttp.send();
}