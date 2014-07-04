// File dedicated to accountManagement page actions handling

$(document).ready(function()
{
    // Populate the user table on initial page load
    populateTable();

    $('#userList').find('table tbody').on('click','button.refreshUserList',populateTable());

    // Modify user button click
    $('#userList').find('table tbody').on('click', 'td a.linkmodifyuser', selectUser);

    // Delete User link click
    $('#userList').find('table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
});

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

// Fill table with data
function populateTable()
{
    $.ajax(
    {
        type: 'POST',
        url: '/accountManagement/getAccounts',
        dataType: 'json',
        success: function (accounts)
        {

            // For each account in our database, add a table row and cells to the content string

            $('#userList').find('table tbody').html('');

            $.each(accounts, function (i, item) {
                $('#userList').find('table tbody').append(
                        '<tr>'
                        + '<td>' + item.username + '</td>'
                        + '<td>' + item.password + '</td>'
                        + '<td>' + item.category + '</td>'
                        + '<td>' + item.firstName + '</td>'
                        + '<td>' + item.lastName + '</td>'
                        + '<td>' + item.birthDate + '</td>'
                        + '<td>' + item.email + '</td>'
                        + '<td>' + item.phoneNumber + '</td>'
                        + '<td>' + item.civicNo + '</td>'
                        + '<td>' + item.appartment + '</td>'
                        + '<td>' + item.street + '</td>'
                        + '<td>' + item.city + '</td>'
                        + '<td>' + item.province + '</td>'
                        + '<td>' + item.zipCode + '</td>'
                        + '<td><a href="#" class="linkmodifyuser" rel="' + item._id + '">modify</a></td>'
                        + '<td><a href="#" class="linkdeleteuser" rel="' + item._id + '">delete</a></td>'
                        + '</tr>');
            });
        }
    });
}