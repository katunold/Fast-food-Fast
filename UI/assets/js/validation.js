"use strict";

// Registration validations

function validateUsername() {
    let username = document.getElementById("reg-username").value;
    let exp = /^[A-Za-z\s]{4,12}/;
    if (exp.test(username)) {
        document.getElementById("email").disabled = false;
        document.getElementById("miss_name").style.display = "none";
    }else {
        document.getElementById("email").disabled = true;
        document.getElementById("miss_name").style.display = "block";
    }
}

function offName() {
    document.getElementById("miss_name").style.display = "none";
}

function validateEmail() {
    let email = document.getElementById("email").value;
    let exp = /^\w+([\-.]?\w+)*@\w+([\-.]?\w+)*(\.\w{2,3})+$/;
    if (exp.test(email)) {
        document.getElementById("contact").disabled = false;
        document.getElementById("miss_email").style.display = "none";
    }else {
        document.getElementById("contact").disabled = true;
        document.getElementById("miss_email").style.display = "block";
    }
}

function offEmail() {
    document.getElementById("miss_email").style.display = "none";
}

function validateContact() {
    let contact = document.getElementById("contact").value;
    let exp = /\d{10,13}/;
    if (exp.test(contact)) {
        document.getElementById("pass").disabled = false;
        document.getElementById("miss_contact").style.display = "none";
    }else {
        document.getElementById("pass").disabled = true;
        document.getElementById("miss_contact").style.display = "block";
    }
}

function offContact() {
    document.getElementById("miss_contact").style.display = "none";
}

function validatePassword() {
    let password = document.getElementById("pass").value;
    let exp = /^[\S\s]{6,15}$/;
    if (exp.test(password)) {
        document.getElementById("pass_rpt").disabled = false;
        document.getElementById("miss_pass").style.display = "none";
    }else {
        document.getElementById("pass_rpt").disabled = true;
        document.getElementById("miss_pass").style.display = "block";
    }
}

function offPassword() {
    document.getElementById("miss_pass").style.display = "none";
}

function verifyPassword() {
    let password = document.getElementById("pass").value;
    let password_rpt = document.getElementById("pass_rpt").value;
    if (password === password_rpt) {
        document.getElementById("register_btn").disabled = false;
        document.getElementById("miss_pass_rpt").style.display = "none";
    }else {
        document.getElementById("register_btn").disabled = true;
        document.getElementById("miss_pass_rpt").style.display = "block";
    }
}

function offVerifyPass() {
    document.getElementById("miss_pass_rpt").style.display = "none";
}

