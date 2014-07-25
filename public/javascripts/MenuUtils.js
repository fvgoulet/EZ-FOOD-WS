/*
 *   This is the menu section
 */

function setConfirmationDeleteModal(menuID){
    document.getElementById('menuToDelete').value = menuID;
    confirmationDeleteMenuModal();
}

function confirmationDeleteMenuModal(){
    var modal = document.getElementById('deletMenuModal');
    modalVisbility(modal);
}

/*
 *   This is the menu section
 */

function validateMenu(){
    var regexTextOnly = /^[a-zA-Z]+$/;
    var menuName = document.getElementById("menuName").value;

    var errorMessage = '';

    if(menuName != ''){
        if(!regexTextOnly.test(menuName)){
            errorMessage+='<li>The menu name must be alphabetic character only(a-z,A-Z).</li>';
        }
    }
    else{
        errorMessage+='<li>The name of an menu is mandatory.</li>';
    }

    if(errorMessage != ''){
        document.getElementById('errorSelect').innerHTML = '<br/>Check the following: <br/> <ul>'+errorMessage;+'</ul>';
        errorModal();
    }
    else{
        confirmationMenuModal();
    }
}

function submitMenu() {
    selectAll(document.getElementById('itemSelectMultiple'),true);
    confirmationMenuModal();
    document.menu.submit();
}

function confirmationMenuModal(){
    var modal = document.getElementById('confirmationMenuModal');
    modalVisbility(modal);
}

/*
 *   This is the menu item section
 */

function addMenuItems(){
    alert('testing123');
}

function validateMenuItem(){
    var regexTextOnly = /^[a-zA-Z]+$/;
    var regexPrice = /^(\d{1,3})?(,?\d{3})*(\.\d{2})?$/;

    var itemName = document.getElementById("itemName").value;
    var itemDescription = document.getElementById("itemDescription").value;
    var itemPrice= document.getElementById("itemPrice").value;

    var errorMessage = '';


    if(itemName != ''){
        if(!regexTextOnly.test(itemName)){
            errorMessage+='<li>The item name must be alphabetic character only(a-z,A-Z).</li>';
        }
    }
    else{
        errorMessage+='<li>The name of an item is mandatory.</li>';
    }
    if(itemPrice != ''){
        if(!regexPrice.test(itemPrice)){
            errorMessage+='<li>Respect the format ###,###,###.## for item price.</li>';
        }
    }
    else{
        errorMessage+='<li>The price of an item is mandatory.</li>';
    }

    if(errorMessage != ''){
        document.getElementById('errorSelect').innerHTML = '<br/>Check the following: <br/> <ul>'+errorMessage;+'</ul>';
        errorModal();
    }
    else{
        confirmationItemModal();
    }
}

function confirmationItemModal(){
    var modal = document.getElementById('confirmationItemModal');
    modalVisbility(modal);
}

function errorModal(){
    var modal = document.getElementById('errorModal');
    modalVisbility(modal);
}

function noDescriptionModal(){
    var modal = document.getElementById('noDescriptionModal');
    modalVisbility(modal);
}

function modalVisbility(modal){
    modal.style.visibility = (modal.style.visibility == "visible")?"hidden":"visible";
}

function addMenuItem(){
    var itemName = document.getElementById("itemName").value;
    var itemDescription = document.getElementById("itemDescription").value;
    var itemPrice= document.getElementById("itemPrice").value;
    var newItemOption = '';
    var optionsItem = document.getElementById("itemSelectMultiple");
    var newItemOptionId = optionsItem.length+1;
    var noDescriptionFlag = false;

    if(itemDescription == ''){
        newItemOption = '<option name="'+itemName+'" data-tempId="'+newItemOptionId+'" data-itemName="'+itemName+'" data-itemDescription="'+itemDescription+'" data-itemPrice="'+itemPrice+'">'+itemName+'|'+itemPrice+'|</option>';
        noDescriptionFlag = true;
    }
    /*
    else if(itemDescription.length > 25) {
        var substringDescription = itemDescription.substring(0, 25) + "...";
        newItemOption = '<option name="'+itemName+'" data-tempId="'+newItemOptionId+'" data-itemName="'+itemName+'" data-itemDescription="'+itemDescription+'" data-itemPrice="'+itemPrice+'">'+itemName+' | '+itemPrice+' | '+substringDescription+'</option>';
    }
    */
    else{
        newItemOption = '<option name="'+itemName+'" data-tempId="'+newItemOptionId+'" data-itemName="'+itemName+'" data-itemDescription="'+itemDescription+'" data-itemPrice="'+itemPrice+'">'+itemName+'|'+itemPrice+'|'+itemDescription+'</option>';
    }

    if(optionsItem.length > 0){
        var optionsToPrint = '';
        for(var i=0;i<optionsItem.length; i++){
            optionsToPrint += '<option name="'+optionsItem[i].getAttribute("data-itemName")+'" data-tempId="'+optionsItem[i].getAttribute("data-tempId")+'" data-itemName="'+optionsItem[i].getAttribute("data-itemName")+'" data-itemDescription="'+optionsItem[i].getAttribute("data-itemDescription")+'" data-itemPrice="'+optionsItem[i].getAttribute("data-itemPrice")+'">'+optionsItem[i].text+'</option>'

        }
        optionsToPrint += newItemOption;

        document.getElementById('itemSelectMultiple').innerHTML = optionsToPrint;
    }
    else{
        document.getElementById('itemSelectMultiple').innerHTML = newItemOption;
    }

    resetMenuItem();

    confirmationItemModal();

    if(noDescriptionFlag){
        noDescriptionModal();
    }
}

function removeModal(){
    var optionsItem = document.getElementById("itemSelectMultiple");
    if(optionsItem.selectedIndex > -1){
        var modal = document.getElementById('removeModal');
        modalVisbility(modal);
    }
}

function removeMenuItem(){
    var optionsItem = document.getElementById("itemSelectMultiple");

    optionsItem.remove(optionsItem.selectedIndex);

    if(optionsItem.length > 0){
        var optionsToPrint = '';
        for(var i=0;i<optionsItem.length; i++){
            optionsToPrint += '<option name="'+optionsItem[i].name+'" data-tempId="'+(i+1)+'" data-itemName="'+optionsItem[i].getAttribute("data-itemName")+'" data-itemDescription="'+optionsItem[i].getAttribute("data-itemDescription")+'" data-itemPrice="'+optionsItem[i].getAttribute("data-itemPrice")+'">'+optionsItem[i].text+'</option>'

        }

        document.getElementById('itemSelectMultiple').innerHTML = optionsToPrint;
    }
    else{
        document.getElementById('itemSelectMultiple').innerHTML = '';
    }

    var modal = document.getElementById('removeModal');
    modalVisbility(modal);
}

function resetMenuItem(){
    document.getElementById("itemName").value = '';
    document.getElementById("itemDescription").value = '';
    document.getElementById("itemPrice").value = '';
}