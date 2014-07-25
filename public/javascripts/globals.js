// DOM Ready =============================================================
$(document).ready(function() {


    // Submit account button click
    //$('#btnSubmitAccount').on('click', validateAccountFields);

    //$('#btnSubmitModifications').on('click', validateAccountFields);




});


// Functions =============================================================




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

function listRestaurant()
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

    xmlhttp.open("GET","/listRestaurant",true);
    xmlhttp.send();
}

function modifyRestaurant()
{
    var e = document.getElementById("avalaibleRestaurant");
    var strRes = e.options[e.selectedIndex].text;
    if("None" != strRes) {

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        // Callback on response.e
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("content").innerHTML = xmlhttp.responseText;
            }
        };

        xmlhttp.open("POST", "/listRestaurant/modifyRestaurant", true);
        xmlhttp.send('{"restaurant":"' + strRes + '"}');
    }
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


function deleteRestaurant() {
    var e = document.getElementById("avalaibleRestaurant");
    var strRes = e.options[e.selectedIndex].text;
    if("None" != strRes) {
        // Pop up a confirmation dialog
        var confirmation = confirm('Are you sure you want to delete the restaurant ' + strRes + '?');

        // Check and make sure the user confirmed
        if (confirmation === true) {
            var xmlhttp;
            if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }
            else {// code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            // Callback on response.e
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    document.getElementById("content").innerHTML = xmlhttp.responseText;
                }
            };

            xmlhttp.open("POST", "/listRestaurant/deleteRestaurant", true);
            xmlhttp.send('{"restaurant":"' + strRes + '"}');
        }
    }
}
// Delete User
function deleteUser()
{
    var e = document.getElementById("avalaibleRestaurateur");
    var strUser = e.options[e.selectedIndex].text;
    if("None" != strUser) {
        // Pop up a confirmation dialog
        var confirmation = confirm('Are you sure you want to delete the user ' + strUser + '?');

        // Check and make sure the user confirmed
        if (confirmation === true) {
            var xmlhttp;
            if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }
            else {// code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            // Callback on response.e
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                    document.getElementById("content").innerHTML = xmlhttp.responseText;
                }
            };

            xmlhttp.open("POST", "/manageRestaurateur/deleteUser", true);
            xmlhttp.send('{"username":"' + strUser + '"}');
        }
    }
}

// Delete User
function modifyUser()
{
    var e = document.getElementById("avalaibleRestaurateur");
    var strUser = e.options[e.selectedIndex].text;
    if("None" != strUser)
    {

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        // Callback on response.e
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                document.getElementById("content").innerHTML = xmlhttp.responseText;
            }
        };

        xmlhttp.open("POST", "/manageRestaurateur/modifyUser", true);
        xmlhttp.send('{"username":"' + strUser + '"}');

    }
}

// Delete User
function modifyAccount()
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

    xmlhttp.open("GET","/modifyAccount",true);
    xmlhttp.send();
}

// Delete User
function addRestaurant()
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

    xmlhttp.open("GET","/addRestaurant",true);
    xmlhttp.send();
}

function signIn()
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

    xmlhttp.open("GET","/signIn",true);
    xmlhttp.send();
}

function createAccount()
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

    xmlhttp.open("GET","/createAccount",true);
    xmlhttp.send();
}

function addToSelectedRestaurants()
{
    var available_restaurants = document.getElementById("available_restaurants");
    var selected_restaurants = document.getElementById("selected_restaurants");
    var new_option = document.createElement("option");

    new_option.text = available_restaurants.options[available_restaurants.selectedIndex].text;
    selected_restaurants.add(new_option);

    available_restaurants.remove(available_restaurants.selectedIndex);

}

function deleteFromSelectedRestaurants()
{
    var available_restaurants = document.getElementById("available_restaurants");
    var selected_restaurants = document.getElementById("selected_restaurants");
    var new_option = document.createElement("option");

    new_option.text = selected_restaurants.options[selected_restaurants.selectedIndex].text;
    available_restaurants.add(new_option);

    selected_restaurants.remove(selected_restaurants.selectedIndex);

}

function selectAll(selectBox,selectAll) {
    // have we been passed an ID
    if (typeof selectBox == "string") {
        selectBox = document.getElementById(selectBox);
    }
    // is the select box a multiple select box?
    if (selectBox.type == "select-multiple") {
        for (var i = 0; i < selectBox.options.length; i++) {
            selectBox.options[i].selected = selectAll;
        }
    }
}

function manageMenu(restaurantId){

    if(restaurantId != "")
    {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        // Callback on response.e
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                document.getElementById("content").innerHTML = xmlhttp.responseText;
            }
        };

        xmlhttp.open("POST", "/manageMenu", true);
        xmlhttp.send('{"restaurantId":"' + restaurantId + '"}');
    }
}

function createMenu(restaurantId){

    if(restaurantId != "")
    {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        // Callback on response.e
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                document.getElementById("content").innerHTML = xmlhttp.responseText;
            }
        };

        xmlhttp.open("POST", "/manageMenu/createMenu", true);
        xmlhttp.send('{"restaurantId":"' + restaurantId + '"}');
    }
}

function deleteMenu(){
    var menuID = document.getElementById('menuToDelete').value;
    if(menuID != "")
    {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        // Callback on response.e
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                document.getElementById("content").innerHTML = xmlhttp.responseText;
            }
        };

        xmlhttp.open("POST", "/manageMenu/deleteMenu", true);
        xmlhttp.send('{"menuId":"' + menuID + '"}');
    }
}