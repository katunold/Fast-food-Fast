
function validate() {
    var user_type = document.getElementById("user_type");
    if ( user_type.value === "admin") {
        alert("Welcome! You Have Successfully logged-in as admin");
        window.location = 'UI/admin/orders.html';
        return false
    }else {
        alert("Welcome! You Have Successfully logged-in as Normal user");
        window.location = 'UI/client/make_orders.html';
        return false
    }
}