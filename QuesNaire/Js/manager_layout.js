
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

//管理员登录
function Manage_Login() {
    var account;
    var password;
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
            if (id != "0") {
                window.location.href = "../Manager/Index";
            }

        })
        .catch(function (error) {
            console.log(error);
        });
}