/**
 * Created by Félix on 2014-06-25.
 */
var express = require('express');
var router = express.Router();
var account = require('../public/Utilities/Account');
/*
 * GET .
 */
router.get('/', function(req, res) {
    res.render('accountManagement', { title: 'Account Management' });
});

function accountManagement()
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

    xmlhttp.open("GET","/accountManagement",true);
    xmlhttp.send();
}

function initAccountManagement()
{
    // Populate the user table on initial page load
    populateTable();

    $('#userList').on('click','button.refreshUserList',populateTable());

    // Modify user button click
    $('#userList').find('table tbody').on('click', 'td a.linkmodifyuser', selectUser);

    // Delete User link click
    $('#userList').find('table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
};

// Fill table with data
function populateTable()
{

    // Empty content string
    var tableContent = '';

    var account = new Account();
    account.getAllAccounts(function(err, accounts)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            // For each account in our database, add a table row and cells to the content string
            accounts.forEach(function (item) {
                tableContent += '<tr>';
                tableContent += '<td>' + item.username + '</td>';
                tableContent += '<td>' + item.password + '</td>';
                tableContent += '<td>' + item.category + '</td>';
                tableContent += '<td>' + item.firstName + '</td>';
                tableContent += '<td>' + item.lastName + '</td>';
                tableContent += '<td>' + item.birthDate + '</td>';
                tableContent += '<td>' + item.email + '</td>';
                tableContent += '<td>' + item.phoneNumber + '</td>';
                tableContent += '<td>' + item.civicNo + '</td>';
                tableContent += '<td>' + item.appartment + '</td>';
                tableContent += '<td>' + item.street + '</td>';
                tableContent += '<td>' + item.city + '</td>';
                tableContent += '<td>' + item.province + '</td>';
                tableContent += '<td>' + item.zipCode + '</td>';
                tableContent += '<td><a href="#" class="linkmodifyuser" rel="' + item._id + '">modify</a></td>';
                tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + item._id + '">delete</a></td>';
                tableContent += '</tr>';
            });
            // Inject the whole content string into our existing HTML table
            $('#userList').find('table tbody').html(tableContent);
        }
    });
}

// Delete User
function deleteUser(event)
{
    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true)
    {
        var accountManager = new account.Account();
        accountManager.deleteAccount($(this).attr('rel'), function(err)
        {
            if(err) { console.log(err); }
            accountManager.closeConnection();
            populateTable();
        });
    }
}

function selectUser(event) {
    event.preventDefault();
}

function applyModificationToUser(event)
{
    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to modify this user?');

    // Check and make sure the user confirmed
    if (confirmation === true)
    {
    }
}

module.exports = router;