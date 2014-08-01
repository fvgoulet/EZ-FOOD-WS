
function showOrderManagement()
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

    xmlhttp.open("GET","/ordersManagement",true);
    xmlhttp.send();
}

function changeOrderStatus(id, status)
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

    xmlhttp.open("POST","/ordersManagement/updateOrderStatus",true);
    xmlhttp.send('{"order_id":"' + id + '"}, {"order_status":"' + status + '"}');

    // Callback on response.e
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.getElementById("content").innerHTML = xmlhttp.responseText;
        }
    };
}


