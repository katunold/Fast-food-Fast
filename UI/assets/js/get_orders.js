"use strict";
let token = localStorage.getItem("accessToken");
fetch("https://fast-food-andela-way.herokuapp.com/api/v1/orders", {
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
            let arrHead = ["Order ID", "Order", "Client Name", "Client Contact", "Order status"]; // SIMPLY ADD OR REMOVE VALUES IN THE ARRAY FOR TABLE HEADERS.

            // CREATE A TABLE STRUCTURE BY ADDING A FEW HEADERS

            let new_table = document.createElement("table");
            new_table.setAttribute("class", "main-tables");
            new_table.setAttribute("id", "current_orders");
            let index = 0;
            let tr = new_table.insertRow(index);

            for (let h = 0; h < arrHead.length; h++) {
                let th = document.createElement("th");
                th.innerHTML = arrHead[h];
                tr.appendChild(th);
            }


            let div = document.getElementById("item-available");
            div.appendChild(new_table);

            console.log(response_object);

            // Add data in the table

            let table = document.getElementById("current_orders");
            console.log(response_object.data.length);
            index++;
            let data_index = 0;
            let available_options = ["new", "processing", "cancelled", "completed"];
            for (index; index <= response_object.data.length; index++) {
                let field = response_object.data[data_index];
                data_index++;
                console.log(index);
                console.log(field["order_id"], field["order_item"], field["client"], field["client_contact"]);
                let tr = table.insertRow(index);
                tr.setAttribute("id", field["order_id"]);
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");
                let td5 = document.createElement("td");
                td1 = tr.insertCell(0);
                td2 = tr.insertCell(1);
                td3 = tr.insertCell(2);
                td4 = tr.insertCell(3);
                td5 = tr.insertCell(4);

                td1.innerHTML = field["order_id"];
                td2.innerHTML = field["order_item"];
                td3.innerHTML = field["client"];
                td4.innerHTML = field["client_contact"];
                let select = document.createElement("select");
                select.setAttribute("name", "order_status");
                select.setAttribute("id", "order_status");
                select.setAttribute("onchange", "updateStatus(this)");
                let options_index = 0;
                let default_option = document.createElement("option");
                default_option.setAttribute("value", field["order_status"]);
                default_option.innerHTML = field["order_status"];
                select.appendChild(default_option);
                for (options_index; options_index<available_options.length;options_index++) {
                    let option = available_options[options_index];
                    let capitalize_option = option[0].toUpperCase() + option.slice(1);
                    if (capitalize_option !== default_option.value) {
                        let an_option = document.createElement("option");
                        an_option.setAttribute("value", capitalize_option);
                        an_option.innerHTML = capitalize_option;
                        select.appendChild(an_option);
                    }
                }
                td5.appendChild(select);
            }

        }else {
            console.log(response_object);
            alert("Data was not fetched");
        }
    });

function updateStatus(status_data) {
    let new_status = status_data.value;
    let order_id = status_data.parentNode.parentNode.attributes.id.nodeValue;

    fetch("https://fast-food-andela-way.herokuapp.com/api/v1/orders/"+order_id, {
        method: "PUT",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'bearer ' + token
        },
        body: JSON.stringify({
            order_status: new_status
        })
    })
        .then((response) => response.json())
        .then((response_object) => {
            if (response_object.status === "success") {
                alert(response_object.message);
            }else {
                if (response_object.message === "Token blacklisted. Please log in again."
                    || response_object.message === "Signature expired. Please log in again."
                    || response_object.message === "Invalid token. Please log in again.") {
                    alert(response_object.message);
                    window.location = window.location = "../../index.html";
                }
                else {
                    alert(response_object.message);
                    window.location = "orders.html";
                }
            }
        })

}