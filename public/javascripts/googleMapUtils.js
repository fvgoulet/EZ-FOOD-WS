/**
 * Created by Gabriel on 2014-07-31.
 */

var map;
var direction;
var panel;
var geocoder;
var browserSupportFlag =  new Boolean();
var montrealLocation = new google.maps.LatLng(45.5601451, -73.7120832);
var deliveryManLocation;
var clientLocation;
var restaurantLocation;
var directionsService;

function initializeGoogleMap() {
    geocoder = new google.maps.Geocoder();
    directionsService = new google.maps.DirectionsService();
    var mapOptions = {
        center: montrealLocation,
        zoom: 8
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    direction = new google.maps.DirectionsRenderer({
        map: map,
        panel: panel
    });

    geolocateDeliveryMan();
}

function calculateDelivery(deliveryNumber){
    geolocateDeliveryMan(drawDirection(deliveryNumber));
}

function geolocateDeliveryMan(callback){
    if(navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function(position) {
            deliveryManLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            map.setCenter(deliveryManLocation);

            if(callback){
                callback();
            }
            else{
                map.setZoom(12);
            }
        }, function() {
            handleNoGeolocation(browserSupportFlag);
        });
    }
    else {
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }
}

function drawDirection(deliveryNumber){
    clientLocation = document.getElementById(deliveryNumber).getAttribute('data-clientAddress');
    restaurantLocation = document.getElementById(deliveryNumber).getAttribute('data-restaurantAddress');
    var orderId = document.getElementById(deliveryNumber).getAttribute('data-orderId');
    document.getElementById('orderId').value = orderId;
    document.getElementById('acceptSubmit').disabled = false;
    var request ={
        origin : deliveryManLocation,
        destination: clientLocation,
        waypoints:[{location:restaurantLocation, stopover:true}],
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    }
    directionsService.route(request, function(result, status){
       if(status == google.maps.DirectionsStatus.OK){
            direction.setDirections(result);
       }
       else{
           handleNoGeolocation(status);
       }
    });
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
        alert("Geolocation service failed.");
    } else {
        alert("Your browser doesn't support geolocation.");
    }
    map.setCenter(montrealLocation);
}