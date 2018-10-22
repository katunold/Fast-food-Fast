"use strict";
document.getElementById("items_form").addEventListener("submit",addItem);

// adding new menu item
function addItem(e) {

    e.preventDefault();
    let item_name = document.items_form.item_name.value;
    let item_price = document.items_form.item_price.value;
    let token = localStorage.getItem("accessToken");
    document.getElementById("loader-body").style.display = "block";
    fetch("https://fast-food-andela-way.herokuapp.com/api/v1/menu/", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'bearer ' + token
        },
        body: JSON.stringify({
            food_item: item_name,
            price: item_price
        })
    })
        .then((response) => response.json())
        .then((response_object) => {
            if (response_object.status === "success") {
                // Get the modal
                let modal = document.getElementById('myModal');
                document.getElementById("item_name_data").innerHTML += response_object.data.item_name;
                document.getElementById("item_price_data").innerHTML += response_object.data.price;
                document.getElementById("Item_status_data").innerHTML += response_object.data.item_status;
                document.getElementById("loader-body").style.display = "none";
                modal.style.display = "block";
                // When the user clicks anywhere outside of the modal, close it

                // When the user clicks on <span> (x), close the modal
                let span = document.getElementById("close");
                span.onclick = function() {
                    modal.style.display = "none";
                    window.location = "index.html";
                };

                window.onclick = function(event) {
                    if (event.target === modal) {
                        modal.style.display = "none";
                        window.location = "items.html"
                    }
                };
            }else {
                if (response_object.message === "Token blacklisted. Please log in again."
                    || response_object.message === "Signature expired. Please log in again."
                    || response_object.message === "Invalid token. Please log in again.") {
                    document.getElementById("loader-body").style.display = "none";
                    alert(response_object.message);
                    window.location = window.location = "../../index.html";
                }
                else {
                    document.getElementById("loader-body").style.display = "none";
                    alert(response_object.message);
                }
            }
        });
}
