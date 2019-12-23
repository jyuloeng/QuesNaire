var btn_state = document.getElementById('btn_state');
var state_icon = document.getElementById('state_icon');
var state_title = document.getElementById('state_title');
var state_bg = document.getElementById('state_bg');

var isPublished = false;

btn_state.addEventListener('click', publishProject, false);

function publishProject() {
    isPublished = !isPublished;

    if (isPublished == true) {
        state_icon.classList.add("glyphicon-pause");
        state_icon.classList.remove("glyphicon-play");

        state_bg.style.backgroundColor = "#ffbe3a";

        state_title.innerText = "暂停发布";
    } else {
        state_icon.classList.remove("glyphicon-pause");
        state_icon.classList.add("glyphicon-play");

        state_bg.style.backgroundColor = "#2672ff";

        state_title.innerText = "开始发布";
    }
}