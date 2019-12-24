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


var tab_card_view = document.getElementById("tab_card_view");
var tab_list_view = document.getElementById("tab_list_view");

var card_wrap = document.getElementById("card_wrap");
var list_wrap = document.getElementById("list_wrap");

tab_card_view.addEventListener("click", toCardView, false);
tab_list_view.addEventListener("click", toListView, false);

function toCardView() {
    tab_card_view.classList.add("nav_tab_active");
    tab_list_view.classList.remove("nav_tab_active");

    card_wrap.classList.remove("project_list_hidden");
    list_wrap.classList.add("project_list_hidden");
}

function toListView() {
    tab_list_view.classList.add("nav_tab_active");
    tab_card_view.classList.remove("nav_tab_active");

    list_wrap.classList.remove("project_list_hidden");
    card_wrap.classList.add("project_list_hidden");
}

//  初始化页面数据

class Naire {
    constructor(id, title, state, start_time, edit_time, data) {
        this.id = id;
        this.title = title;
        this.state = state;
        this.start_time = start_time;
        this.edit_time = edit_time;
        this.data = data;
    }
}

var btn_create_project = document.getElementById('btn_create_project');
btn_create_project.addEventListener('click', createProject, false);

function createProject() {
    //ajax异步提交表单
    //$.ajax({
    //    url: '../ProjectList/getUserNaire',
    //    data: {},
    //    type: 'POST',
    //    async: true,
    //    success: function (data) {
    //        console.log(data);
    //    }
    //});
}

var naire_json = document.getElementById('naire_json').value;
var naire = JSON.parse(naire_json);

var card_ul_list = document.getElementById('card_ul_list');
var list_table_list = document.getElementById('list_table_list');
console.log(naire);

(function () {
    for (var i = 0; i < naire.length; i++) {

        var card_li = document.createElement('li');
        card_li.classList.add('card_li');
        card_li.setAttribute('data-naire-id', naire[i].id);

        card_li.innerHTML = '<div class="project_title"><div class="list_title_wrap" >'
            + '     <span class="list_title">' + naire[i].title + '</span>'
            + '     <span class="list_title_icon">问卷</span> </div >';

        if (naire[i].state == "未发布") {
            card_li.innerHTML += '<div class="project_state state_unpublished">' + naire[i].state + '</div></div >';
        } else {
            card_li.innerHTML += '<div class="project_state state_published">' + naire[i].state + '</div></div >';
        }
        
        card_li.innerHTML += ' <div class="project_details"><span class="total_collection">' + naire[i].data + '份数据</span>'
            + '<span class="edit_time">' + naire[i].update_time + '</span ></div>'
            + '<div class="operate_bar"><div class="operate_type"><i class="glyphicon glyphicon-pencil"></i>'
            + '<span>编辑</span></div><div class="operate_type">'
            + '<i class="glyphicon glyphicon-send" ></i >'
            + '<span> 发布</span ></div > '
            + '<div class="operate_type"><i class="glyphicon glyphicon-stats"></i>'
            + '<span> 数据</span ></div > '
            + '<div class="operate_type"><i class="glyphicon glyphicon-trash"></i><span>回收</span></div></div>';

        card_ul_list.appendChild(card_li);

        var table_tab = document.createElement('tr');
        table_tab.classList.add('table_tab');
        table_tab.setAttribute('data-naire-id', naire[i].id);

        table_tab.innerHTML = '<td class="table_list_title">' + naire[i].title + '</td>';

        if (naire[i].state == "未发布") {
            table_tab.innerHTML += '<td class="table_list_state state_unpublished" > ' + naire[i].state + '</td >';
        } else {
            table_tab.innerHTML += '<td class="table_list_state state_published" > ' + naire[i].state + '</td >';
        }
        table_tab.innerHTML += '<td class="table_list_collection">' + naire[i].data + '</td>'
            + '<td class="table_list_create_time">' + naire[i].start_time + '</td>'
            + '<td class="table_list_edit_time">' + naire[i].update_time + '</td>'
            + '<td class="table_list_operate"><div class="operate_type">编辑</div>'
            + '<div class="operate_type">发布</div><div class="operate_type">数据</div>'
            + '<div class="operate_type"><i class="glyphicon glyphicon-trash"></i></div></td>';

        list_table_list.appendChild(table_tab);
    }
}());
