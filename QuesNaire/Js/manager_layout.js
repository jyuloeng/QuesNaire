
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


//删除函数
function del(id) {
    var index = $('#table_naire_new').bootstrapTable('getData').length;
    $('#table_naire_new').bootstrapTable('remove', {
        field: "id",
        values: [parseInt(id)]
    });
    

}

//编辑删除部分
//最新列表中操作栏的设置 删除 编辑按钮
function operateFormatter(value, row, index) {
    return [
        '<button class="btn btn-default" id="look" >查看</button>',
        '<button id="change" class="btn btn-default" data-toggle="modal" data-target="#change" >编辑</button >',
        '<button class="btn btn-default" id="delate" >删除</button>',
       
    ].join('');

}

var index;
var index_DFB;
var index_YFB;
var index_QBB;
var index_YHG;
var recycle_time;
//获取当前列（最新表）
$('#table_naire_new').on("click-row.bs.table", function (e, row, $element) {
    index = $element.data('index');
});
//获取当前列（待发布）
$('#table_naire_unpublish').on("click-row.bs.table", function (e, row, $element) {
    index_DFB = $element.data('index');
});
//获取当前列（以发布）
$('#table_naire_published').on("click-row.bs.table", function (e, row, $element) {
    index_YFB = $element.data('index');
});
//获取当前列（全部表）
$('#table_naire_all').on("click-row.bs.table", function (e, row, $element) {
    index_QBB = $element.data('index');
});
//获取当前列（用户表）
$('#table_user_info').on("click-row.bs.table", function (e, row, $element) {
    index_YHG = $element.data('index');
});

//编辑保存按钮的设置 最新表
$("#change_save").click(function () {
    var id = document.getElementById("id_c").value;
    var title = document.getElementById("titile_c").value
    var state = document.getElementById("state_c").value
    var start_time = document.getElementById("start_time_c").value
    var update_time = document.getElementById("update_time_c").value
    var recycle = document.getElementById("recycle_c").value
    var recycle_time = recycle_time;
    var data = document.getElementById("data_c").value

    var naire_info = {
        id:id,
        title: title,
        state: state,
        start_time: start_time,
        update_time: update_time,
        data: data,
        recycle: recycle,
        recycle_time: recycle_time
    }

    $('#table_naire_new').bootstrapTable('updateRow', {
        replace: true,
        index: index,
        row: naire_info
    });

    //ajax异步提交
    $.ajax({
        url: '../Manager/editNaireInfo',
        data: JSON.stringify(naire_info),
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: true,
        success: function (data) {
            
            alert("修改成功");
        }
    });
})




//添加部分
//提交添加按钮事件设置
$("#tijiao").click(function () {
    formatter: addRow();
    //ajax异步提交
   

    
})

//添加函数最新表
function addRow() {
    var name = document.getElementById("name_add").value;
    var password = document.getElementById("password_add").value;
    var avatar = document.getElementById("avatar_add").value;
    var data_instert = {
        name: name,
        password: password,
        avatar: avatar
        
    };
    $('#table_user_info').bootstrapTable('append', data_instert);

    $.ajax({
        url: '../Manager/instertNaireInfo',
        data: JSON.stringify(data_instert),
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: true,
        success: function (data) {

            alert("添加成功");
        }
    });
}

//  初始化全部表格


//删除函数（最新表）
function del(id) {
    var index = $('#table_naire_unpublish').bootstrapTable('getData').length;
    $('#table_naire_new').bootstrapTable('remove', {
        field: "id",
        values: [parseInt(id)]
    });
}
//最新列表中的编辑按钮与删除按钮事件设置
window.operateEvents = {
    "click #delate": function (e, value, row, index) {
        del(row.id);

        $.ajax({
            url: '../Manager/DelateNaireInfo',
            data: { naire_id: row.id },
            type: 'POST',
            async: true,
            success: function (data) {

                alert("删除成功");
            }
        });

    },
    "click #change": function (e, value, row, index) {
        $("#id_c").attr("value", row.id);
        $("#titile_c").attr("value", row.title);
        $("#state_c").attr("value", row.state);
        $("#start_time_c").attr("value", row.start_time);
        $("#update_time_c").attr("value", row.update_time);
        $("#data_c").attr("value", row.data);
        $("#recycle_c").attr("value", row.recycle);
        $("#recycle_time_c").attr("value", row.recycle_time);
        index = index;
        recycle_time = row.recycle_time;
    },
    "click #look": function (e, value, row, index) {
        alert("最新表的查看");
    }
};
//待发布表格列中按钮（删除，编辑）
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
        }, {
            field: 'recycle',
            title: '回收状态'
        },
        {
            field: 'recycle_time',
            title: '回收时间'
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            events: "operateEvents",
            formatter: operateFormatter
        }]
    });
}

function operateFormatter_DFB(value, row, index) {
    return [
        '<button class="btn btn-default" id="look_DFB" >查看</button>',
        '<button id="change_DFB" class="btn btn-default" data-toggle="modal" data-target="#change_DFB" >编辑</button >',
        '<button class="btn btn-default" id="delate_DFB" >删除</button>',
       
    ].join('');

}
//删除函数（待发布表）
function del_DFB(id) {
    var index = $('#table_naire_unpublish').bootstrapTable('getData').length;
    $('#table_naire_unpublish').bootstrapTable('remove', {
        field: "id",
        values: [parseInt(id)]
    });
}
//待发布表（编辑，删除）的事件
//编辑保存按钮的设置 最新表
$("#change_save_DFB").click(function () {
    var id = document.getElementById("id_d").value;
    var title = document.getElementById("titile_d").value
    var state = document.getElementById("state_d").value
    var start_time = document.getElementById("start_time_d").value
    var update_time = document.getElementById("update_time_d").value
    var recycle = document.getElementById("recycle_d").value
    var recycle_time = recycle_time;
    var data = document.getElementById("data_d").value

    var naire_info = {
        id: id,
        title: title,
        state: state,
        start_time: start_time,
        update_time: update_time,
        data: data,
        recycle: recycle,
        recycle_time: recycle_time
    }

    $('#table_naire_unpublish').bootstrapTable('updateRow', {
        replace: true,
        index: index_DFB,
        row: naire_info
    });

    //ajax异步提交
    $.ajax({
        url: '../Manager/editNaireInfo',
        data: JSON.stringify(naire_info),
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: true,
        success: function (data) {

            alert("修改成功");
        }
    });
})

window.operateEvents_DFB = {
    "click #delate_DFB": function (e, value, row, index) {
        del_DFB(row.id)
        //alert("删除成功")
        $.ajax({
            url: '../Manager/DelateNaireInfo',
            data: { naire_id: row.id },
            type: 'POST',
            async: true,
            success: function (data) {

                alert("删除成功");
            }
        });
    },
    "click #change_DFB": function (e, value, row, index) {
        $("#id_d").attr("value", row.id);
        $("#titile_d").attr("value", row.title);
        $("#state_d").attr("value", row.state);
        $("#start_time_d").attr("value", row.start_time);
        $("#update_time_d").attr("value", row.update_time);
        $("#data_d").attr("value", row.data);
        $("#recycle_d").attr("value", row.recycle);
        $("#recycle_time_d").attr("value", row.recycle_time);
        index = index;
    },
     "click #look_DFB": function (e, value, row, index) {
         alert("待发布表页的查看");
    }
};
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
            }, {
                field: 'recycle',
                title: '回收状态'
            },
            {
                field: 'recycle_time',
                title: '回收时间'
            }, {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: "operateEvents_DFB",
                formatter: operateFormatter_DFB
            }]
    });
}


//已发布
//  初始化 已发布问卷表格
//
function del_YFB(id) {
    var index = $('#table_naire_published').bootstrapTable('getData').length;
    $('#table_naire_published').bootstrapTable('remove', {
        field: "id",
        values: [parseInt(id)]
    });
}
function operateFormatter_YFB(value, row, index) {
    return [
        '<button class="btn btn-default" id="look_YFB" >查看</button>',
        '<button id="change_YFB" class="btn btn-default_YFB" data-toggle="modal" data-target="#change_YFB" >编辑</button >',
        '<button class="btn btn-default" id="delate_YFB" >删除</button>',
       
    ].join('');

}
window.operateEvents_YFB = {
    "click #delate_YFB": function (e, value, row, index) {
        del_YFB(row.id)
        //alert("删除成功")

        $.ajax({
            url: '../Manager/DelateNaireInfo',
            data: { naire_id: row.id },
            type: 'POST',
            async: true,
            success: function (data) {

                alert("删除成功");
            }
        });
    },
    "click #change_YFB": function (e, value, row, index) {
        $("#id_y").attr("value", row.id);
        $("#titile_y").attr("value", row.title);
        $("#state_y").attr("value", row.state);
        $("#start_time_y").attr("value", row.start_time);
        $("#update_time_y").attr("value", row.update_time);
        $("#data_y").attr("value", row.data);
        $("#recycle_y").attr("value", row.recycle);
        $("#recycle_time_y").attr("value", row.recycle_time);
        index = index;
    },
    "click #look_YFB": function (e, value, row, index) {
        alert("已发布表查看");
    }
};
$("#change_save_YFB").click(function () {
    var id = document.getElementById("id_y").value;
    var title = document.getElementById("titile_y").value
    var state = document.getElementById("state_y").value
    var start_time = document.getElementById("start_time_y").value
    var update_time = document.getElementById("update_time_y").value
    var recycle = document.getElementById("recycle_y").value
    var recycle_time = recycle_time;
    var data = document.getElementById("data_y").value

    var naire_info = {
        id: id,
        title: title,
        state: state,
        start_time: start_time,
        update_time: update_time,
        data: data,
        recycle: recycle,
        recycle_time: recycle_time
    }

    $('#table_naire_published').bootstrapTable('updateRow', {
        replace: true,
        index: index_YFB,
        row: naire_info
    });

    //ajax异步提交
    $.ajax({
        url: '../Manager/editNaireInfo',
        data: JSON.stringify(naire_info),
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: true,
        success: function (data) {

            alert("修改成功");
        }
    });
})
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
            }, {
                field: 'recycle',
                title: '回收状态'
            },
            {
                field: 'recycle_time',
                title: '回收时间'
            }, {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: "operateEvents_YFB",
                formatter: operateFormatter_YFB
            }]
    });
}

//全部表
function del_QBB(id) {
    var index = $('#table_naire_all').bootstrapTable('getData').length;
    $('#table_naire_all').bootstrapTable('remove', {
        field: "id",
        values: [parseInt(id)]
    });
}
function operateFormatter_QBB(value, row, index) {
    return [
        '<button class="btn btn-default" id="look_QBB" >查看</button>',
        '<button id="change_QBB" class="btn btn-default" data-toggle="modal" data-target="#change_QBB" >编辑</button >',
        '<button class="btn btn-default" id="delate_QBB" >删除</button>',
       
    ].join('');

}
window.operateEvents_QBB = {
    "click #delate_QBB": function (e, value, row, index) {
        del_QBB(row.id)
        //alert("删除成功")
        $.ajax({
            url: '../Manager/DelateNaireInfo',
            data: { naire_id: row.id },
            type: 'POST',
            async: true,
            success: function (data) {

                alert("删除成功");
            }
        });
    },
    "click #change_QBB": function (e, value, row, index) {
        $("#id_q").attr("value", row.id);
        $("#titile_q").attr("value", row.title);
        $("#state_q").attr("value", row.state);
        $("#start_time_q").attr("value", row.start_time);
        $("#update_time_q").attr("value", row.update_time);
        $("#data_q").attr("value", row.data);
        $("#recycle_q").attr("value", row.recycle);
        $("#recycle_time_q").attr("value", row.recycle_time);
        index = index;
    },
    "click #look_QBB": function (e, value, row, index) {
        alert("全部表的信息查看");
    }
};

$("#change_save_QBB").click(function () {
    var id = document.getElementById("id_q").value;
    var title = document.getElementById("titile_q").value
    var state = document.getElementById("state_q").value
    var start_time = document.getElementById("start_time_q").value
    var update_time = document.getElementById("update_time_q").value
    var recycle = document.getElementById("recycle_q").value
    var recycle_time = recycle_time;
    var data = document.getElementById("data_q").value

    var naire_info = {
        id: id,
        title: title,
        state: state,
        start_time: start_time,
        update_time: update_time,
        data: data,
        recycle: recycle,
        recycle_time: recycle_time
    }

    $('#table_naire_all').bootstrapTable('updateRow', {
        replace: true,
        index: index_QBB,
        row: naire_info
    });

    //ajax异步提交
    $.ajax({
        url: '../Manager/editNaireInfo',
        data: JSON.stringify(naire_info),
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: true,
        success: function (data) {

            alert("修改成功");
        }
    });
    alert("修改成功");
})
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
        toolbar: '#toolbar',
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
            }, {
                field: 'recycle',
                title: '回收状态'
            },
            {
                field: 'recycle_time',
                title: '回收时间'
            },{
                field: 'operate',
                title: '操作',
                align: 'center',
                events: "operateEvents_QBB",
                formatter: operateFormatter_QBB
            }]
    });
}
//全部表
$("#change_save_YHG").click(function () {
    var name = document.getElementById("name").value
    var password = document.getElementById("password").value
    var avatar = document.getElementById("avatar").value
    var id = document.getElementById("id").value
    var naire_info = {
        name: name,
        password: password,
        avatar: avatar,
        id:id
    }

    $('#table_user_info').bootstrapTable('updateRow', {
        replace: true,
        index: index_YHG,
        row: naire_info
    });

    //ajax异步提交
    $.ajax({
        url: '../Manager/editNaireInfo_user',
        data: JSON.stringify(naire_info),
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: true,
        success: function (data) {

            alert("修改成功");
        }
    });
})
function del_YHG(id) {
    var index = $('#table_user_info').bootstrapTable('getData').length;
    $('#table_user_info').bootstrapTable('remove', {
        field: "id",
        values: [parseInt(id)]
    });
}
function operateFormatter_YHG(value, row, index) {
    return [
         '<button class="btn btn-default" id="look_YHG" >查看</button>',
        '<button id="change_YHG" class="btn btn-default" data-toggle="modal" data-target="#change_YHG" >编辑</button >',
        '<button class="btn btn-default" id="delate_YHG" >删除</button>',
      
    ].join('');

}
window.operateEvents_YHG = {
    "click #delate_YHG": function (e, value, row, index) {
        del_YHG(row.id)
        //alert("删除成功")

        $.ajax({
            url: '../Manager/DelateNaireInfo_User',
            data: { naire_id_user: row.id },
            type: 'POST',
            async: true,
            success: function (data) {

                alert("删除成功");
            }
        });
    },
    "click #change_YHG": function (e, value, row, index) {
        $("#name").attr("value", row.name);
        $("#password").attr("value", row.password);
        $("#adatar").attr("value", row.adatar);
        $("#id").attr("value", row.id);
        index = index;
    },
    "click #look_YHG": function (e, value, row, index) {
        alert("用户页查看");
    }
};
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
        toolbar:"#toolbar",
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
            }, {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: "operateEvents_YHG",
                formatter: operateFormatter_YHG
            }]
    });
}

InitNaireNew();
InitNaireUnPublish();
InitNairePublished();
InitNaireAll();
InitUserInfo();

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
                window.location.href = "../Manager/Index?id=" + id;
            }

        })
        .catch(function (error) {
            console.log(error);
        });
}