"use strict";
window.onload = function () {
    document.getElementById("register_form").addEventListener("submit", register);
};

// Register new account

function register(e) {

    e.preventDefault();
    let user_name = document.register_form.reg_username.value;
    let email = document.register_form.email.value;
    let contact = document.register_form.contact.value;
    let password = document.register_form.pass.value;
    let account_type = document.register_form.account_type.value;

    fetch("https://fast-food-andela-way.herokuapp.com/api/v1/auth/signup", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*'

        },
        body: JSON.stringify({
            user_name: user_name,
            email: email,
            contact: contact,
            password: password,
            user_type: account_type
        }),

    })
        .then((response) => response.json())
        .then((response_object) => {
            if (response_object.status === "success") {
                // Get the modal
                let modal = document.getElementById('myModal');
                document.getElementById("name_data").innerHTML += response_object.data.user_name;
                document.getElementById("email_data").innerHTML += response_object.data.email;
                document.getElementById("contact_data").innerHTML += response_object.data.contact;
                document.getElementById("account_data").innerHTML += response_object.data.user_type;
                modal.style.display = "block";
                console.log(response_object);

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target === modal) {
                        modal.style.display = "none";
                        window.location = "index.html";
                    }
                };


                // alert(response_object.message)

            }else {
                console.log(response_object);
                let message = response_object.error_message;
                alert(message);
            }

        });
}

function submit() {
    /*Put all the data posting code here*/
    console.log("reseting form");
    document.getElementById("login_form").reset();
}
