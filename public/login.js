"use strict";
document.querySelector("body").onload = main;

function main () {
    document.getElementById("login_form").onsubmit = (event) => {
        event.preventDefault();

        processForm(event);

        return false;
    };
}

function processForm (event) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const data = {username, password};
    fetch("http://40.77.29.228/login", {
        method: "post",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    }).then( res => {
        return res.json();
    }).then( data => {
        console.log(data);
    }).catch( err => {
        console.log(err);
    });
}