"use strict";
let token = localStorage.getItem("accessToken");
document.getElementById("loader-body").style.display = "block";
fetch("https://fast-food-andela-way.herokuapp.com/api/v1/users/orders", {
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
            let arrHead = ["Order ID","Item", "Price", "Date", "Status"]; // SIMPLY ADD OR REMOVE VALUES IN THE ARRAY FOR TABLE HEADERS.

            // CREATE A TABLE STRUCTURE BY ADDING A FEW HEADERS

            let new_table = document.createElement("table");
            new_table.setAttribute("class", "main-tables");
            new_table.setAttribute("id", "order_history");
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

            let table = document.getElementById("order_history");
            console.log(response_object.data.length);
            index++;
            let data_index = 0;
            for (index; index <= response_object.data.length; index++) {
                let field = response_object.data[data_index];
                data_index++;
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
                td3.innerHTML = field["order_cost"];
                td4.innerHTML = field["order_date"];
                td5.innerHTML = field["order_status"];
            }
            let profile_data = response_object.data[0];
            document.getElementById("profile_name").value = profile_data["client"];
            document.getElementById("profile_email").value = profile_data["client_email"];
            document.getElementById("profile_contact").value = profile_data["client_contact"];
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