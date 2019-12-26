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
var recycle_data = document.querySelector('.recycle_data');
console.log(naire);

(function () {
    for (var i = 0; i < naire.length; i++) {

        if (naire[i].recycle == 0) {
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
        } else if (naire[i].recycle == 1) {
            //  渲染进回收站
            //var input = document.createElement('input');
            //input.setAttribute('data-naire-id', naire[i].id);
            //input.setAttribute('type', 'checkbox');
            //input.classList.add('checkbox');
            //input.style.margin = "0 auto";

            //var td_input = document.createElement('td');
            //td_input.classList.add('checkbox_wrap')
            //td_input.appendChild(input);

            //var td_naire_title = document.createElement('td');
            //td_naire_title.classList.add('table_recycle_td_title');
            //td_naire_title.innerText = naire[i].title;

            var tr = document.createElement('tr');
            tr.innerHTML = '<td class="checkbox_wrap">'
                + '  <input data-naire-id="' + naire[i].id + '" class="checkbox" type = "checkbox" style = "margin: 0 auto;" > </td >'
                + '  <td class="table_recycle_td_title">' + naire[i].title + '</td>'
                + '  <td>' + naire[i].data + '</td>'
                + '  <td>' + naire[i].start_time + '</td>'
                + '  <td>' + naire[i].recycle_time + '</td>';

            recycle_data.appendChild(tr);
        }
    }
}());

//  回收站相关
var btn_recycle = document.getElementById('btn_recycle');
var btn_recylce_close = document.querySelector('.recylce_close');

var recycle_dialog = document.getElementById('recycle_dialog');
var recycle_bg = recycle_dialog.querySelector('.recycle_bg');

btn_recylce_close.addEventListener('click', closeRecycleDialog, false);
btn_recycle.addEventListener('click', openRecycleDialog, false);
recycle_bg.addEventListener('click', closeRecycleDialog, false);

function openRecycleDialog() {
    recycle_dialog.classList.remove('hidden');
}

function closeRecycleDialog() {
    recycle_dialog.classList.add('hidden');
}

//  回收站选择相关
var btn_select_all = recycle_dialog.querySelector('.checkbox');
var all_checkbox = recycle_dialog.querySelectorAll('.checkbox');
btn_select_all.addEventListener('click',selectAll, false);
var isSelectAll = false;

function selectAll() {

    if (isSelectAll == false) {
        for (let i = 1; i < all_checkbox.length; i++) {
            all_checkbox[i].checked = true;
        }
    } else {
        for (let i = 1; i < all_checkbox.length; i++) {
            all_checkbox[i].checked = false;
        }
    }

    isSelectAll = !isSelectAll;
}

//  回收站恢复、删除相关
var btn_restore = recycle_dialog.querySelector('.btn_restore');
var btn_delete = recycle_dialog.querySelector('.btn_delete');

var recycle_naire_id_list = new Array();

btn_restore.addEventListener('click', restoreNaire, false);
btn_delete.addEventListener('click', deleteNaire, false);

function restoreNaire() {
    getSelectedNaire();

    $.ajax({
        url: '../ProjectList/restoreNaire',
        data: { "naireIds": recycle_naire_id_list },
        type: 'POST',
        async: true,
        cache: false,
        traditional: true,
        success: function (data) {
            window.alert("恢复成功！");
            window.location.reload();
        }
    });
}

function deleteNaire() {
    getSelectedNaire();

    $.ajax({
        url: '../ProjectList/deleteNaire',
        data: { "naireIds": recycle_naire_id_list },
        type: 'POST',
        async: true,
        cache: false,
        traditional: true,
        success: function (data) {
            window.alert("删除成功！");
            window.location.reload();
        }
    });
}

//  获得被选中的问卷的id
function getSelectedNaire() {
    for (let i = 1; i < all_checkbox.length; i++) {
        if (all_checkbox[i].checked == true) {
            var naire_id = all_checkbox[i].getAttribute('data-naire-id');
            recycle_naire_id_list.push(naire_id);
        }
    }
    
}

//  传进回收站
function toRecycleBin(i,id) {
    $.ajax({
        url: '../ProjectList/naireToRecycleBin',
        data: { "naire_id": id },
        type: 'POST',
        async: true,
        cache: false,
        traditional: true,
        success: function (data) {
            window.alert("该问卷已进入回收站！");
            //  在项目页隐藏
            card_lis[i].classList.add('hidden');
            table_tabs[i - 1].classList.add('hidden');
            //  在回收站显示
            let index;
            for (let j = 0; j < naire.length; j++) {
                if (id == naire[j].id) {
                    index = j;
                }
            }

            var tr = document.createElement('tr');
            tr.innerHTML = '<td class="checkbox_wrap">'
                + '  <input data-naire-id="' + naire[index].id + '" class="checkbox" type = "checkbox" style = "margin: 0 auto;" > </td >'
                + '  <td class="table_recycle_td_title">' + naire[index].title + '</td>'
                + '  <td>' + naire[index].data + '</td>'
                + '  <td>' + naire[index].start_time + '</td>'
                + '  <td>' + new Date().toLocaleDateString() + '</td>';

            recycle_data.appendChild(tr);

            all_checkbox = recycle_dialog.querySelectorAll('.checkbox');
        }
    });
}

//  回收操作相关
var card_lis = document.querySelectorAll('.card_li');
for (let i = 1; i < card_lis.length; i++) {
    let recycle_bar = card_lis[i].lastElementChild.lastElementChild;
    let recycle_id = card_lis[i].getAttribute('data-naire-id');

    recycle_bar.addEventListener('click', function () {
        toRecycleBin(i,recycle_id);
    }, false);
}

var table_tabs = document.querySelectorAll('.table_tab');
for (let i = 0; i < table_tabs.length; i++) {
    let recycle_bar = table_tabs[i].lastElementChild.lastElementChild;
    let recycle_id = table_tabs[i].getAttribute('data-naire-id');

    recycle_bar.addEventListener('click', function () {
        toRecycleBin(i+1,recycle_id);
    }, false);
}
