let eye = document.querySelector(".eye")
let inputPass = document.querySelector(".pass")

eye.addEventListener("click", function() {
    if(inputPass.type === "password") {
        inputPass.type = "text"
        eye.src = "photo_2025-02-22_11-31-36.jpg";
    }
    else{
        inputPass.type = "password";
        eye.src = "photo_2025-02-21_17-23-45.jpg";
    }
});

let info = {}
let emailInput = document.querySelector("#email")
let passInput = document.querySelector(".pass")

emailInput.addEventListener("input", function() {
    info.email = this.value
});

passInput.addEventListener("input", function(){
    info.pass = this.value
});


const emailLog = document.querySelector("#email")
const passLog = document.querySelector(".pass")
const button = document.querySelector(".back-info")

button.addEventListener("click", function(){
    console.log(emailLog.value)
    console.log(passLog.value)
});