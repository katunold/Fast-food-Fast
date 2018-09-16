var accountName = "admin";
var accountPassword = "admin";


function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if ( username === accountName && password === accountPassword) {
        alert("Welcome! You Have Successfully logged-in as admin");
        window.location = 'UI/admin/orders.html';
        return false
    }else {
        alert("Welcome! You Have Successfully logged-in as Normal user");
        window.location = 'UI/client/make_orders.html';
        return false
    }
}