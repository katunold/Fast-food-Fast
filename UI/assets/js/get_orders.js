"use strict";
let token = localStorage.getItem("accessToken");
document.getElementById("loader-body").style.display = "block";
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
                //tr.setAttribute("onclick", "detailedOrder(this)");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");
                let td5 = document.createElement("td");
                td1 = tr.insertCell(0);
                td1.setAttribute("onclick", "detailedOrder(this)");
                td2 = tr.insertCell(1);
                td2.setAttribute("onclick", "detailedOrder(this)");
                td3 = tr.insertCell(2);
                td3.setAttribute("onclick", "detailedOrder(this)");
                td4 = tr.insertCell(3);
                td4.setAttribute("onclick", "detailedOrder(this)");
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
                window.location = "orders.html";
            }
        }
    });

function updateStatus(status_data) {
    let new_status = status_data.value;
    let order_id = status_data.parentNode.parentNode.attributes.id.nodeValue;
    document.getElementById("loader-body").style.display = "block";

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
                document.getElementById("loader-body").style.display = "none";
                alert(response_object.message);
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
                    window.location = "orders.html";
                }
            }
        })

}

function detailedOrder(order) {
    document.getElementById("loader-body").style.display = "block";
    let modal = document.getElementById('myModal');
    let detailed_order = order.parentNode.id;
    fetch("https://fast-food-andela-way.herokuapp.com/api/v1/orders/"+detailed_order, {
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
                console.log(response_object);
                let order_data = response_object.data;
                document.getElementById("client_name").innerHTML = order_data.client;
                document.getElementById("client_id_data").innerHTML = order_data.user_id;
                document.getElementById("client_name_data").innerHTML = order_data.client;
                document.getElementById("email_data").innerHTML = order_data.client_email;
                document.getElementById("contact_data").innerHTML = order_data.client_contact;
                document.getElementById("order_id_data").innerHTML = order_data.order_id;
                document.getElementById("order_item_data").innerHTML = order_data.order_item;
                document.getElementById("order_notes_data").innerHTML = order_data.special_notes;
                document.getElementById("unit_price_data").innerHTML = order_data.order_cost;
                document.getElementById("order_status_data").innerHTML = order_data.order_status;
                document.getElementById("account_data").innerHTML = order_data.order_date;
                document.getElementById("loader-body").style.display = "none";
                modal.style.display = "block";
                // When the user clicks on <span> (x), close the modal
                let span = document.getElementById("close");
                span.onclick = function() {
                    modal.style.display = "none";
                };

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                };
            }else {
               alert("Error occurred");
               document.getElementById("loader-body").style.display = "none";
            }
        });
}