var btn_state = document.getElementById('btn_state');
var state_icon = document.getElementById('state_icon');
var state_title = document.getElementById('state_title');
var state_bg = document.getElementById('state_bg');

var isPublished;
var state;

var naire_json = document.getElementById('naire_json').value;
var naire = JSON.parse(naire_json);

var naire_title = document.getElementById('header_edit_title');
var naire_link = document.getElementById('share_link');

naire_title.innerText = naire[0].title;
naire_link.innerText = "http://localhost:61507/Project/Index?naire_id=" + naire[0].id;

if (naire[0].state == "未发布") {
    isPublished = false;
    state = "0";
} else {
    isPublished = true;
    state = "1";
}

changeState();

btn_state.addEventListener('click', publishProject, false);

function publishProject() {

    var naire_state = {
        id: naire[0].id,
        state: state
    }

    $.ajax({
        url: '../PublishProject/changeState',
        data: JSON.stringify(naire_state),
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        success: function (data) {

            console.log(data);
            isPublished = !isPublished;
            changeState();

        }
    });
}

function changeState() {
    if (isPublished == true) {
        state_icon.classList.add("glyphicon-pause");
        state_icon.classList.remove("glyphicon-play");

        state_bg.style.backgroundColor = "#ffbe3a";

        state_title.innerText = "暂停发布";
        state = "1";
    } else {
        state_icon.classList.remove("glyphicon-pause");
        state_icon.classList.add("glyphicon-play");

        state_bg.style.backgroundColor = "#2672ff";

        state_title.innerText = "开始发布";
        state = "0";
    }
}

