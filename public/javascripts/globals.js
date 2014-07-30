// DOM Ready =============================================================
$(document).ready(function()
{
    // Submit account button click
    //$('#btnSubmitAccount').on('click', validateAccountFields);

    //$('#btnSubmitModifications').on('click', validateAccountFields);
});


// Functions =============================================================
function toggleDeleveryTimePickerVisibility(){
    var modal = document.getElementById('delevery_time_picker');
    modalVisbility(modal);
}

function closeConfirmation(){
    var modal = document.getElementById('orderConfirmedModal');
    modalVisbility(modal);
}

function confirmationCommandModal(){
    var node_list = document.getElementsByName("cart_item");

    if(node_list.length > 0) {
        var modal = document.getElementById('confirmationCommandModal');
        modalVisbility(modal);
    }
    else{
        alert("Your cart is empty !!!");
    }
}

function modalVisbility(modal){
    modal.style.visibility = (modal.style.visibility == "visible")?"hidden":"visible";
}

function checkout()
{
    var node_list = document.getElementsByName("cart_item");

    var item_array = [];
    for (var i = 0; i < node_list.length; i++) {
        var item = {};
        item["item_id"] = node_list[i].getAttribute("item_id");
        item["item_quantity"] = node_list[i].getAttribute("item_quantity");
        item["item_name"] = node_list[i].getAttribute("item_name");
        item["item_price"] = node_list[i].getAttribute("item_price");

        item_array.push(item);
    }

    if(item_array.length > 0) {


        var delivery_time_radio_button = document.getElementsByName("delivery_time");

        var delivery_type = "unknown";

        for (var i = 0; i < delivery_time_radio_button.length; i++) {
            if (delivery_time_radio_button[i].checked) {
                delivery_type = delivery_time_radio_button[i].value;
            }
        }


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
                var response = xmlhttp.responseText;
                document.getElementById("confirmationNumber").innerHTML = response;
                var modal = document.getElementById('orderConfirmedModal');
                modalVisbility(modal);
            }
        };

        xmlhttp.open("POST", "/checkout", true);
        var query = {};
        query["cart_items"] = item_array;
        if ("user_defined" == delivery_type) {
            query["delivery_type"] = "user_defined";
            query["delivery_date_time"] = document.getElementsByName("date_time_picker")[0].value;
        }
        else {
            query["delivery_type"] = "ASAP";
        }

        xmlhttp.send(JSON.stringify(query));
    }
    else
    {
        alert("Your cart is empty !!");
    }

}

function addItemToCart(item_id)
{
    var node_list = document.getElementsByName("cart_item");

    var i;

    var item_array = [];
    for (i = 0; i < node_list.length; i++)
    {
        var item = {};
        item["item_id"] = node_list[i].getAttribute("item_id");
        item["item_quantity"] = node_list[i].getAttribute("item_quantity");
        item["item_name"] = node_list[i].getAttribute("item_name");
        item["item_price"] = node_list[i].getAttribute("item_price");

        item_array.push(item);
    }


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
            document.getElementById("cart").innerHTML = xmlhttp.responseText;
        }
    };

    xmlhttp.open("POST", "/addItemToCart", true);
    var query = {};
    query["item_id"] = item_id;
    query["cart_items"] = item_array;

    xmlhttp.send(JSON.stringify(query));

}

function deleteItem(item_id)
{
    var node_list = document.getElementsByName("cart_item");
    var i;
    var item_array = [];
    for (i = 0; i < node_list.length; i++)
    {
        var item = {};
        if(item_id != node_list[i].getAttribute("item_id"))
        {
            item["item_id"] = node_list[i].getAttribute("item_id");
            item["item_quantity"] = node_list[i].getAttribute("item_quantity");
            item["item_name"] = node_list[i].getAttribute("item_name");
            item["item_price"] = node_list[i].getAttribute("item_price");

            item_array.push(item);
        }
    }

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
            document.getElementById("cart").innerHTML = xmlhttp.responseText;
        }
    };

    xmlhttp.open("POST", "/updateCart", true);
    var query = {};
    query["cart_items"] = item_array;
    xmlhttp.send(JSON.stringify(query));
}

function updateQuantity(item_id, quantity)
{
    var node_list = document.getElementsByName("cart_item");
    var i;
    var item_array = [];
    for (i = 0; i < node_list.length; i++)
    {
        var item = {};

        item["item_id"] = node_list[i].getAttribute("item_id");
        item["item_name"] = node_list[i].getAttribute("item_name");
        item["item_price"] = node_list[i].getAttribute("item_price");

        if(item_id == item["item_id"])
        {
            item["item_quantity"] = quantity
        }
        else
        {
            item["item_quantity"] = node_list[i].getAttribute("item_quantity");
        }

        item_array.push(item);

    }

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
            document.getElementById("cart").innerHTML = xmlhttp.responseText;
        }
    };

    xmlhttp.open("POST", "/updateCart", true);
    var query = {};
    query["cart_items"] = item_array;
    xmlhttp.send(JSON.stringify(query));
}

function toggleVisibilityCartContent()
{
    if(true == $("#cart_items").is(":visible") )
    {
        hideCartContent();
    }
    else
    {
        showCartContent();
    }
}
function showCartContent()
{
    $("#cart_items").show(1000);
}

function hideCartContent()
{
    $("#cart_items").hide(1000);
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

function demandeLivraison()
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

    xmlhttp.open("GET","/demandeLivraison",true);
    xmlhttp.send();
}

function showMenus(restaurant_id)
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
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("content").innerHTML = xmlhttp.responseText;
        }
    };

    xmlhttp.open("POST", "/showMenus", true);
    xmlhttp.send('{"restaurant_id":"' + restaurant_id + '"}');

}

function showMenuItems(menu_id)
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
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("content").innerHTML = xmlhttp.responseText;
        }
    };

    xmlhttp.open("POST", "/showMenuItems", true);
    xmlhttp.send('{"menu_id":"' + menu_id + '"}');

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

function addToSelectedRestaurants(){
    var available_restaurants = document.getElementById("available_restaurants");
    var selected_restaurants = document.getElementById("selected_restaurants");
    var new_option = document.createElement("option");

    new_option.text = available_restaurants.options[available_restaurants.selectedIndex].text;
    selected_restaurants.add(new_option);

    available_restaurants.remove(available_restaurants.selectedIndex);

}

function deleteFromSelectedRestaurants(){
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