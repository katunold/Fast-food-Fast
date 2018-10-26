"use strict";
function logout() {
    let token = localStorage.getItem("accessToken");
    document.getElementById("loader-body").style.display = "block";
    fetch("https://fast-food-andela-way.herokuapp.com/api/v1/auth/logout/", {
        method: "POST",
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
                alert(response_object.message);
                window.location = "../../index.html";
            }else {
                document.getElementById("loader-body").style.display = "none";
                alert(response_object.message);
                window.location = "../../index.html";
            }
        })
}