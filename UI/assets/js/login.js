"use strict";
window.onload = function () {
    document.getElementById("login_form").addEventListener("submit", login);
};

function login(e) {
    e.preventDefault();
    let user_name = document.login_form.username.value;
    let password = document.login_form.password.value;

    fetch("https://fast-food-andela-way.herokuapp.com/api/v1/auth/login/", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*'

        },
        body: JSON.stringify({
            user_name: user_name,
            password: password
        })
    })
        .then(res => res.json())
        .then(data => {
            let token = data.auth_token;
            let message = data.message;
            let account = data.logged_in_as;
            if (account === "admin") {
                localStorage.setItem("accessToken", token);
                localStorage.setItem("user_type", account);
                window.location = "UI/admin/orders.html";

            }
            else if (account === "client") {
                localStorage.setItem("accessToken", token);
                localStorage.setItem("user_type", account);
                window.location = "UI/client/make_orders.html";
            }
            else {
                console.log(data);
                alert(message);
            }
        });
}