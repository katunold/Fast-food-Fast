"use strict";
let token = localStorage.getItem("accessToken");
document.getElementById("loader-body").style.display = "block";
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
            // ARRAY FOR HEADER.
            let arrHead = ['Food Item', 'Unit Price', 'Status', 'Delete item']; // SIMPLY ADD OR REMOVE VALUES IN THE ARRAY FOR TABLE HEADERS.

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
            let item_index = 0;
            for (index; index <= response_object.data.length; index++) {
                let field = response_object.data[item_index];
                item_index++;
                let tr = table.insertRow(index);
                tr.setAttribute("id", field["item_id"]);
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");
                td1 = tr.insertCell(0);
                td2 = tr.insertCell(1);
                td3 = tr.insertCell(2);
                td4 = tr.insertCell(3);

                td1.innerHTML = field["item_name"];
                td2.innerHTML = field["price"];
                td3.innerHTML = field["item_status"];

                let button = document.createElement("input");
                button.setAttribute("type", "button");
                button.setAttribute("value", "Delete");
                button.setAttribute("onclick", "dips(this)");
                td4.appendChild(button);
                document.getElementById("loader-body").style.display = "none";
            }

        }else {
            if (response_object.message === "Token blacklisted. Please log in again."
                || response_object.message === "Signature expired. Please log in again."
                || response_object.message === "Invalid token. Please log in again.") {
                document.getElementById("loader-body").style.display = "none";
                alert(response_object.message);
                window.location = window.location = "../../index.html";
            }
            else {
                alert(response_object.message);
            }
        }
    });

function dips(item) {
    console.log(item.parentNode.parentNode.attributes.id.nodeValue);
    let item_id = item.parentNode.parentNode.attributes.id.nodeValue;
    let del_item = item.parentNode.parentNode.firstChild.innerHTML;
    document.getElementById("loader-body").style.display = "none";
    fetch("https://fast-food-andela-way.herokuapp.com/api/v1/menu/"+item_id, {
        method: "DELETE",
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
                document.getElementById("loader-body").style.display = "none";
                alert(del_item +" deleted");
                window.location = "items.html"
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