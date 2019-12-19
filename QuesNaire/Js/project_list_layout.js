var line_blue = document.querySelector(".line_blue");

var nav_project = document.getElementById("nav_project");
var nav_info = document.getElementById("nav_info");

nav_project.addEventListener("click", toProject, false);
nav_info.addEventListener("click", toInfo, false);

function toProject() {
    line_blue.style.transform = "translateX(0px)";

    nav_project.classList.add("active");
    nav_info.classList.remove("active");
}

function toInfo() {
    line_blue.style.transform = "translateX(80px)";

    nav_project.classList.remove("active");
    nav_info.classList.add("active");
}