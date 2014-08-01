/**
 * Created by Gabriel on 2014-07-31.
 */

function modalVisbility(modal){
    modal.style.visibility = (modal.style.visibility == "visible")?"hidden":"visible";
}

function deliveryModal(){
    var modal = document.getElementById('confirmationDeliveryModal');
    modalVisbility(modal);
}

function responseModal(){
    var modal = document.getElementById('responseModal');
    modalVisbility(modal);
}
