"use strict";
document.getElementById("post_order").addEventListener("submit", makeOrder);
document.getElementById("loader-body").style.display = "block";
let token = localStorage.getItem("accessToken");
fetch("https://fast-food-andela-way.herokuapp.com/api/v1/menu/", {
    method: "GET",
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'bearer ' + token
    }
})
    .then((response) => response.json())
    .then((response_object) => {
        if (response_object.status === "success") {
            // Dynamic select
            let select = document.createElement("select");
            select.setAttribute("id", "my_order");
            select.setAttribute("name", "my_order");
            let options_index = 0;
            let default_option = document.createElement("option");
            default_option.setAttribute("value", "Select order items");
            default_option.innerHTML = "Select order items";
            select.appendChild(default_option);
            for (options_index; options_index<response_object.data.length;options_index++) {
                let field = response_object.data[options_index];
                let an_option = document.createElement("option");
                an_option.setAttribute("value", field["item_name"]);
                an_option.innerHTML = field["item_name"];
                select.appendChild(an_option);
            }

            let div1 = document.getElementById("select-item");
            div1.appendChild(select);

            // ARRAY FOR HEADER.
            let arrHead = ['Food Item', 'Price', 'Status']; // SIMPLY ADD OR REMOVE VALUES IN THE ARRAY FOR TABLE HEADERS.

            // CREATE A TABLE STRUCTURE BY ADDING A FEW HEADERS

            let new_table = document.createElement("table");
            new_table.setAttribute("id", "menu_items");
            new_table.setAttribute("class", "main-tables");
            let index = 0;
            let tr = new_table.insertRow(index);

            for (let h = 0; h < arrHead.length; h++) {
                let th = document.createElement("th");
                th.innerHTML = arrHead[h];
                tr.appendChild(th);
            }


            let div = document.getElementById("item-available");
            div.appendChild(new_table);

            // Add data in the table

            let table = document.getElementById("menu_items");

            index++;
            let index_option = 0;
            for (index; index <= response_object.data.length; index++) {
                let field = response_object.data[index_option];
                index_option++;
                console.log(field);
                let tr = table.insertRow(index);
                tr.setAttribute("id", field["item_id"]);
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                td1 = tr.insertCell(0);
                td2 = tr.insertCell(1);
                td3 = tr.insertCell(2);

                td1.innerHTML = field["item_name"];
                td2.innerHTML = field["price"];
                td3.innerHTML = field["item_status"];

            }
            document.getElementById("loader-body").style.display = "none";

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

function makeOrder(e) {
    e.preventDefault();
    let order = document.getElementById("my_order").value;
    let order_notes = document.getElementById("order-message").value;
    document.getElementById("loader-body").style.display = "block";
    console.log(order_notes);
    fetch("https://fast-food-andela-way.herokuapp.com/api/v1/orders", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'bearer ' + token
        },
        body: JSON.stringify({
            order_item: order,
            special_notes: order_notes
        })
    })
        .then((response) => response.json())
        .then((response_object) => {
            if (response_object.status === "success") {
                document.getElementById("loader-body").style.display = "none";
                alert("Your order has been posted");
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
