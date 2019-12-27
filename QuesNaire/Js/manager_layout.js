
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

//btn_admin_info_change.addEventListener('click', adminInfoEdit, false);


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

function ClearError() {
    var error_message = document.getElementById("error_message");
    error_message.innerText = "";
    error_message.style.display = "none";
}

//管理员登录
function Manage_Login() {
    var account;
    var password;
    var error_message = document.getElementById("error_message");
    account = document.getElementById("reg_input_account").value;
    password = document.getElementById("reg_input_password").value;
    if (account == "" || password == "") {
        return;
    }   
    axios.post('../Manager/Manage_Login_Info', {
        account: account,
        password: password,
    })
        .then(function (response) {
            console.log(response.data);
            var id = response.data
            if (id != 0) {
                window.location.href = "../Manager/Index?id=" + id;
            }
            else
            {
                error_message.innerText = "账号或密码错误！"
                error_message.style.display = "block";
                return;
            }

        })
        .catch(function (error) {
            console.log(error);
        });
}

//设置/修改cookies
function setCookie(name, value, day) {
    if (day !== 0) {     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
         var expires = day * 24 * 60 * 60 * 1000;
        var date = new Date(+new Date() + expires);
        ocument.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
    }
    else
    {
         document.cookie = name + "=" + escape(value);
    }
}

//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

//删除cookies
function deleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

InitManageInfo();
//初始化管理员信息
function InitManageInfo() {
    var admin_name = document.getElementById("admin_name");
    var admin_info_item = document.getElementsByClassName("admin_info_item");

    var name = getCookie("manage_name");
    var account = getCookie("manage_account");
    

    admin_name.innerText = name;

    admin_info_item[0].children[1].innerText = account;
    admin_info_item[1].children[1].innerText = name;
    admin_info_item[2].children[1].innerText = "*******";

}

//显示密码
function ShowPassword(obj) {
    var admin_info_item = document.getElementsByClassName("admin_info_item");
    var span_pas = admin_info_item[2].children[1];

    var password = getCookie("manage_password");

    if (span_pas.innerText == "*******") {
        span_pas.innerText = password;
        obj.innerText = "隐藏密码";
    }
    else
    {
        span_pas.innerText = "*******"
        obj.innerText = "显示密码";
    }
}


//改变管理员信息框显示
function Show_AdminInfo_Change(obj) {
    var item_wrap_edit = document.getElementById("item_wrap_edit");
    var item_wrap_normal = document.getElementById("item_wrap_normal");
    var text = obj.innerText;

    if (text == "修改")
    {
        item_wrap_normal.classList.add('admin_info_hidden');
        item_wrap_edit.classList.remove('admin_info_hidden');
        obj.innerText = "取消修改";
    }
    if (text == "取消修改") {
        item_wrap_edit.classList.add('admin_info_hidden');
        item_wrap_normal.classList.remove('admin_info_hidden');
        obj.innerText = "修改";
    }
}
//退出登录
function Return_Admin_Login() {

    window.location.href=("ManagerLogin");
    deleteCookie("manage_password");
    deleteCookie("manage_name");
    deleteCookie("manage_account");
}
var input_name = document.getElementById("input_name");
var input_password = document.getElementById("input_password");


input_name.addEventListener('focus', ClearMessage, false);
input_password.addEventListener('focus', ClearMessage, false);

//点击输入框删除提示
function ClearMessage() {
    error_message.innerText = "";
    error_message.style.display = "none";
}

//完成修改
var btn_finish_edit = document.getElementById("btn_finish_edit");
btn_finish_edit.addEventListener('click', ChangeAdminInfo, false);

//修改管理员密码
function ChangeAdminInfo() {

    var account = getCookie("manage_account");
    var name = input_name.value;
    var password = input_password.value;

    if (name == "" && password == "") {
        error_message.innerText = "请输入信息完成修改！"; 
        error_message.style.display = "block";
        return;
    }

    //用户名和修改前重复
    if (name == getCookie("manage_name")) {
        error_message.innerText = "输入的用户名和修改前一致！";
        error_message.style.display = "block";
        return;
    }
    //密码和修改前重复
    if (password == getCookie("manage_password")) {
        error_message.innerText = "输入的密码和修改前一致！";
        error_message.style.display = "block";
        return;
    }

    //只修改用户名
    if (name != "" && password == "") {
        password = getCookie("manage_password");
    }
    //只修改密码
    if (name == "" && password != "") {
        name = getCookie("manage_name");
    }
    

    axios.post('../Manager/Change_Admin_Info', {
        account: account,
        name: name,
        password: password,
    })
        .then(function (response) {
            console.log(response.data);
            var index = response.data
            if (index == 1)
            {
                setCookie("manage_password", password, 0);
                setCookie("manage_name", name, 0);
                name = "";
                password = "";
                //初始化管理员信息
                InitManageInfo();
                alert("修改信息成功，返回登录界面！");
                window.location.href = "ManagerLogin";
               
            }

        })
        .catch(function (error) {
            console.log(error);
        });
}