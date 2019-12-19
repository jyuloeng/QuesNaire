var line_blue = document.querySelector(".line_blue");

var nav_project = document.getElementById("nav_project");
var nav_info = document.getElementById("nav_info");

var section_project = document.getElementById("section_project");
var section_info = document.getElementById("section_info");

nav_project.addEventListener("click", toProject, false);
nav_info.addEventListener("click", toInfo, false);

function toProject() {
    line_blue.style.transform = "translateX(0px)";

    nav_project.classList.add("active");
    nav_info.classList.remove("active");

    section_info.classList.add("hidden");
    section_project.classList.remove("hidden");
}

function toInfo() {
    line_blue.style.transform = "translateX(80px)";

    nav_project.classList.remove("active");
    nav_info.classList.add("active");

    section_project.classList.add("hidden");
    section_info.classList.remove("hidden");
}

var base_info_change = document.getElementById("base_info_change");
var item_wrap_normal = document.getElementById("item_wrap_normal");
var item_wrap_edit = document.getElementById("item_wrap_edit");
var btn_change_info = document.getElementById("btn_change_info");
var isEditting = false;

base_info_change.addEventListener("click", editInfo, false);

//  修改帐户信息
function editInfo() {
    //  正在修改
    isEditting = !isEditting;

    item_wrap_normal.classList.add("base_info_hidden");
    item_wrap_edit.classList.remove("base_info_hidden");
    
    //  为修改按钮移除监听事件
    if (isEditting) {
        base_info_change.removeEventListener("click", editInfo, false);
    }

    btn_change_info.addEventListener("click", sumbitEdit, false);
}

//  提交修改
function sumbitEdit() {
    isEditting = !isEditting;

    item_wrap_edit.classList.add("base_info_hidden");
    item_wrap_normal.classList.remove("base_info_hidden");

    //  为修改按钮添加监听事件
    if (!isEditting) {
        base_info_change.addEventListener("click", editInfo, false);
    }

    //  获得input的值进行验证（待做）

    //  移除监听事件
    btn_change_info.removeEventListener("click", sumbitEdit, false);
}