// Functions =============================================================
function PasswordValidation(event){
    var userPassword = document.getElementById('userPassword').value ;
    var confirmation = document.getElementById('confirmPassword').value ;

    if(confirmation != ''){
        if(userPassword == confirmation){
            $('#userPassword').css("backgroundColor", "green");
            $('#confirmPassword').css("backgroundColor", "green");
            $('#btnSubmitAccount').prop('disabled', false);
        }
        else{
            $('#userPassword').css("backgroundColor", "red");
            $('#confirmPassword').css("backgroundColor", "red");
            $('#btnSubmitAccount').prop('disabled', true);
        }
    }
    else{
        $('#userPassword').css("backgroundColor", "white");
        $('#confirmPassword').css("backgroundColor", "white");
        $('#btnSubmitAccount').prop('disabled', true);
    }


}

// validateAccountFields
function validateAccountFields(event) {
    //event.preventDefault();

    var regexTextOnly = /[a-zA-Z]/;
    var regexEmail =/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    var regexPhoneNumber =/[1-9]\d{2}-\d{3}-\d{4}/;
    var regexStartWithNumber =/\d\w*/;
    var regexDate = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
    var MIN_USERNAME_LENGTH = 4;
    var username = document.getElementById('username').value ;
    var firstName = document.getElementById('userFirstName').value ;
    var secondName = document.getElementById('userSecondName').value ;
    var birthDate = document.getElementById('userBirthDate').value ;
    var email = document.getElementById('userEmail').value ;
    var phoneNumber = document.getElementById('userPhoneNumber').value ;
    var civicNumber = document.getElementById('userCivicNumber').value ;
    var errorMessage = '';

    // Check if the format of all fields are okay.
    if(MIN_USERNAME_LENGTH > username.toString().length)
    {
        errorMessage += '<li>The Username must be longer than ' + (MIN_USERNAME_LENGTH - 1).toString() + '.</li>';
    }
    if(false == regexTextOnly.test(firstName))
    {
        errorMessage += '<li>The first name should contain only letters.</li>';
    }
    if(false == regexTextOnly.test(secondName))
    {
        errorMessage += '<li>The second name should contain only letters.</li>';
    }
    if(false == regexEmail.test(email))
    {
        errorMessage += '<li>The email need to be valid.</li>';
    }
    if(false == regexPhoneNumber.test(phoneNumber))
    {

    }
    if(false == regexStartWithNumber.test(civicNumber))
    {
        errorMessage += '<li>The civic number should start with a number.</li>';
    }
    if(false == regexDate.test(birthDate))
    {
        errorMessage += '<li>The birth date need to be on format : YYYY-MM-DD </li>';
    }

    if(errorMessage != ''){
        document.getElementById('error').innerHTML = '<br/>Check the following: <br/> <ul>'+errorMessage;+'</ul>';
    }
    else
    {
        //document.account.submit();
    }
}

function checkAccountExist()
{
    var username = document.getElementById('username').value ;

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
            if(username != '') {
                if ("true" == xmlhttp.responseText) {
                    // TODO : Add simili pop-up.
                    document.getElementById('username').setAttribute("style", "background:red");
                    $('#btnSubmitAccount').prop('disabled', true);
                }
                else {
                    // TODO : Remove simili pop-up.
                    document.getElementById('username').setAttribute("style", "background:green");
                    $('#btnSubmitAccount').prop('disabled', false);
                }
            }
            else{
                document.getElementById('username').setAttribute("style", "background:white");
                $('#btnSubmitAccount').prop('disabled', true);
            }

        }
    };
    xmlhttp.open("POST","/createAccount/isAccountExist",true);
    xmlhttp.send('{"username":"' + username + '"}');
}

function showAccountConfirmation()
{
    var username = document.getElementById('username');
    if(null != username)
    {
        username = username.value;
    }

    var password = document.getElementById('userPassword').value ;
    var firstName = document.getElementById('userFirstName').value ;
    var secondName = document.getElementById('userSecondName').value ;
    var birthDate = document.getElementById('userBirthDate').value ;
    var email = document.getElementById('userEmail').value ;
    var phoneNumber = document.getElementById('userPhoneNumber').value ;
    var civicNumber = document.getElementById('userCivicNumber').value ;
    var appNumber = document.getElementById('userAppNumber').value ;
    var street = document.getElementById('userStreet').value ;
    var city = document.getElementById('userCity').value ;
    var province = document.getElementById('userProvince').value ;
    var zipCode = document.getElementById('userZipCode').value ;

    var informations_div = document.getElementById('accountInformations');
    informations_div.innerHTML = "";

    if(null != username) {
        var info_paragraph = document.createElement('p');
        info_paragraph.innerHTML = "Username : " + username;
        informations_div.appendChild(info_paragraph);
    }

    info_paragraph = document.createElement('p');
    info_paragraph.innerHTML = "Password : " + password;
    informations_div.appendChild(info_paragraph);



    info_paragraph = document.createElement('p');
    info_paragraph.innerHTML = "First Name : " + firstName;
    informations_div.appendChild(info_paragraph);

    info_paragraph = document.createElement('p');
    info_paragraph.innerHTML = "Last Name : " + secondName;
    informations_div.appendChild(info_paragraph);

    info_paragraph = document.createElement('p');
    info_paragraph.innerHTML = "Birth Date : " + birthDate;
    informations_div.appendChild(info_paragraph);

    info_paragraph = document.createElement('p');
    info_paragraph.innerHTML = "E-mail : " + email;
    informations_div.appendChild(info_paragraph);

    info_paragraph = document.createElement('p');
    info_paragraph.innerHTML = "Phone Number : " + phoneNumber;
    informations_div.appendChild(info_paragraph);

    info_paragraph = document.createElement('p');
    info_paragraph.innerHTML = "Civic Number : " + civicNumber;
    informations_div.appendChild(info_paragraph);

    info_paragraph = document.createElement('p');
    info_paragraph.innerHTML = "App. No. : " + appNumber;
    informations_div.appendChild(info_paragraph);

    info_paragraph = document.createElement('p');
    info_paragraph.innerHTML = "Street : " + street;
    informations_div.appendChild(info_paragraph);

    info_paragraph = document.createElement('p');
    info_paragraph.innerHTML = "City : " + city;
    informations_div.appendChild(info_paragraph);

    info_paragraph = document.createElement('p');
    info_paragraph.innerHTML = "Province : " + province;
    informations_div.appendChild(info_paragraph);

    info_paragraph = document.createElement('p');
    info_paragraph.innerHTML = "ZIP Code : " + zipCode;
    informations_div.appendChild(info_paragraph);

    var modal = document.getElementById('confirmationCreateAccountModal');
    modalVisbility(modal);
}

function modalVisbility(modal){
    modal.style.visibility = (modal.style.visibility == "visible")?"hidden":"visible";
}