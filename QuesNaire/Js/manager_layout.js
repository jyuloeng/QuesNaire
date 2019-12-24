
//  左侧导航栏相关
var nav_item = document.getElementsByClassName("nav_item");
var layout_item = document.getElementsByClassName("layout_item");

for (var i = 0; i < nav_item.length; i++) {

    (function (i) {
        nav_item[i].addEventListener("click", function () {
            changeLayout(i);
            nav_item[i].classList.add("nav_item_active");
        }, false);
    }(i));
}

function changeLayout(i) {
    for (var j = 0; j < layout_item.length; j++) {
        nav_item[j].classList.remove("nav_item_active");
        layout_item[j].classList.remove("layout_item_active");
    }
    layout_item[i].classList.add("layout_item_active");
}

///  个人信息管理相关
var btn_admin_info_change = document.getElementById('btn_admin_info_change');
var btn_finish_edit = document.getElementById('btn_finish_edit');

var item_wrap_edit = document.getElementById('item_wrap_edit');
var item_wrap_normal = document.getElementById('item_wrap_normal');

var isEditting = false;

btn_admin_info_change.addEventListener('click', adminInfoEdit, false);


//  修改管理员个人信息
function adminInfoEdit() {
     //  正在修改
    isEditting = !isEditting;
    
    item_wrap_edit.classList.remove("admin_info_hidden");
    item_wrap_normal.classList.add("admin_info_hidden");

    if (isEditting) {
        //  为修改按钮移除监听事件
        btn_admin_info_change.removeEventListener('click', adminInfoEdit, false);
    }

    btn_finish_edit.addEventListener('click', finishEdit, false);
}

//  提交修改管理员个人信息
function finishEdit() {
    isEditting = !isEditting;

    item_wrap_edit.classList.add("admin_info_hidden");
    item_wrap_normal.classList.remove("admin_info_hidden");

    if (!isEditting) {
        btn_admin_info_change.addEventListener('click', adminInfoEdit, false);
    }

    btn_finish_edit.removeEventListener('click', finishEdit, false);
}

//  初始化全部表格

//  初始化 最新问卷表格
function InitNaireNew() {
    //  先销毁表格
    $('#table_naire_new').bootstrapTable("destroy");
    //  加载表格
    $('#table_naire_new').bootstrapTable({
        url: '../Manager/getNewNaireJson',        // 表格数据来源
        pagination: true,   //  分页
        search: true,       //  搜索
        sorting: true,       //  排序
        method: 'post',
        pageSize: 20,
        columns: [{
            field: 'id',
            title: '问卷 ID'
        }, {
            field: 'title',
            title: '问卷标题'
        }, {
            field: 'state',
            title: '收集状态'
        }, {
            field: 'start_time',
            title: '开始时间'
        }, {
            field: 'update_time',
            title: '最后更新'
        }, {
            field: 'data',
            title: '收到数据'
        }]
    });
}

//  初始化 待发布问卷表格
function InitNaireUnPublish() {
    //  先销毁表格
    $('#table_naire_unpublish').bootstrapTable("destroy");
    //  加载表格
    $('#table_naire_unpublish').bootstrapTable({
        url: '../Manager/getUnPublishNaireJson',        // 表格数据来源
        pagination: true,   //  分页
        search: true,       //  搜索
        sorting: true,       //  排序
        method: 'post',
        pageSize: 20,
        columns: [{
            field: 'id',
            title: '问卷 ID'
        }, {
            field: 'title',
            title: '问卷标题'
        }, {
            field: 'state',
            title: '收集状态'
        }, {
            field: 'start_time',
            title: '开始时间'
        }, {
            field: 'update_time',
            title: '最后更新'
        }, {
            field: 'data',
            title: '收到数据'
        }]
    });
}

//  初始化 已发布问卷表格
function InitNairePublished() {
    //  先销毁表格
    $('#table_naire_published').bootstrapTable("destroy");
    //  加载表格
    $('#table_naire_published').bootstrapTable({
        url: '../Manager/getPublishedNaireJson',        // 表格数据来源
        pagination: true,   //  分页
        search: true,       //  搜索
        sorting: true,       //  排序
        method: 'post',
        pageSize: 20,
        columns: [{
            field: 'id',
            title: '问卷 ID'
        }, {
            field: 'title',
            title: '问卷标题'
        }, {
            field: 'state',
            title: '收集状态'
        }, {
            field: 'start_time',
            title: '开始时间'
        }, {
            field: 'update_time',
            title: '最后更新'
        }, {
            field: 'data',
            title: '收到数据'
        }]
    });
}

//  初始化 全部问卷表格
function InitNaireAll() {
    //  先销毁表格
    $('#table_naire_all').bootstrapTable("destroy");
    //  加载表格
    $('#table_naire_all').bootstrapTable({
        url: '../Manager/getAllNaireJson',        // 表格数据来源
        pagination: true,   //  分页
        search: true,       //  搜索
        sorting: true,       //  排序
        method: 'post',
        pageSize: 20,
        columns: [{
            field: 'id',
            title: '问卷 ID'
        }, {
            field: 'title',
            title: '问卷标题'
        }, {
            field: 'state',
            title: '收集状态'
        }, {
            field: 'start_time',
            title: '开始时间'
        }, {
            field: 'update_time',
            title: '最后更新'
        }, {
            field: 'data',
            title: '收到数据'
        }]
    });
}

//  初始化 全部用户信息表格
function InitUserInfo() {
    //  先销毁表格
    $('#table_user_info').bootstrapTable("destroy");
    //  加载表格
    $('#table_user_info').bootstrapTable({
        url: '../Manager/getAllUserJson',        // 表格数据来源
        pagination: true,   //  分页
        search: true,       //  搜索
        sorting: true,       //  排序
        method: 'post',
        pageSize: 20,
        columns: [{
            field: 'id',
            title: '用户 ID'
        }, {
            field: 'name',
            title: '用户昵称'
        }, {
            field: 'password',
            title: '用户密码'
        }, {
            field: 'avatar',
            title: '用户头像地址'
        }]
    });
}

InitNaireNew();
InitNaireUnPublish();
InitNairePublished();
InitNaireAll();
InitUserInfo();