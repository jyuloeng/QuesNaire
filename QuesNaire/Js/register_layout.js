//$(document).ready(function () {
//    let tab_phone = $("tab_phone");
//    let tab_email = $("tab_email");

//    let line_blue = $()

//    tab_phone.bind("click", function () {

//    })
//});


var tab_phone = document.getElementById("tab_phone");
var tab_email = document.getElementById("tab_email");

var form_phone = document.getElementById("form_phone");
var form_email = document.getElementById("form_email");

var line_blue = document.querySelector(".line_blue");

var checkbox = document.querySelector(".checkbox i");
var isCheck = false;

function useEmail() {
    tab_phone.classList.remove("active");
    tab_email.classList.add("active");

    form_email.classList.remove("form_hidden");
    form_phone.classList.add("form_hidden");

    line_blue.style.transform = "translateX(180px)";

}

function usePhone() {
    tab_email.classList.remove("active");
    tab_phone.classList.add("active");

    form_phone.classList.remove("form_hidden");
    form_email.classList.add("form_hidden");

    line_blue.style.transform = "translateX(0px)";
}

tab_email.addEventListener("click", useEmail, false);
tab_phone.addEventListener("click", usePhone, false);

checkbox.addEventListener("click", function () {
    if (!isCheck) {
        checkbox.style.background = "url('../Images/check.png') no-repeat center"
    } else {
        checkbox.style.background = "url('../Images/checkbox1.png') no-repeat center"
    }
    isCheck = !isCheck;
}, false);