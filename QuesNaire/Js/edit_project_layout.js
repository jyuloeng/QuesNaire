

//题目总数
var question_num = 0;

//单选题目数量
var single_num = 0;
//多选题目数量
var multiple_select_num = 0;
//填空题目数量
var blank_select_num = 0;
//多项填空题目数量
var multiple_blank_select_num = 0;
//姓名题目数量
var name_select_num = 0;
//手机题目数量
var mobile_select_num = 0;
//邮箱题目数量
var email_select_num = 0;
//性别题目数量
var sex_select_num = 0;
//生日题目数量
var date_select_num = 0;
//时间题目数量
var time_select_num = 0;
//年龄题目数量
var age_select_num = 0;
//学历题目数量
var education_select_num = 0;
//专业题目数量
var major_select_num = 0;
//职业题目数量
var occupation_select_num = 0;

//问题显示框
var question_Box = document.getElementById("question_box");

//单选题目
var single_select = document.getElementsByClassName("single_select");
//多选题目
var multiple_select = document.getElementsByClassName("multiple_select");
//填空题目
var blank_select = document.getElementsByClassName("blank_select");
//多项填空题目
var multiple_blank_select = document.getElementsByClassName("multiple_blank_select");
//姓名题目
var name_select = document.getElementsByClassName("name_select");
//手机题目
var mobile_select = document.getElementsByClassName("mobile_select");
//邮箱题目
var email_select = document.getElementsByClassName("email_select");
//性别题目
var sex_select = document.getElementsByClassName("sex_select");
//生日题目
var date_select = document.getElementsByClassName("date_select");
//时间题目
var time_select = document.getElementsByClassName("time_select");
//年龄题目
var age_select = document.getElementsByClassName("age_select");
//学历题目
var education_select = document.getElementsByClassName("education_select");
//专业题目
var major_select = document.getElementsByClassName("major_select");
//职业题目
var occupation_select = document.getElementsByClassName("occupation_select");



//删除按钮
var delete_select = document.getElementById("delete_select");



//选择题目
function Select_question(obj) {
    var id_name;
    var question;
    var Item_num;
    switch (obj.id) {
        case "single_selection":
            question = single_select[0];
            id_name = "single_select_";
            question_num++;
            single_num++;
            Item_num = single_num;
            break;
        case "multiple_selection":
            question = multiple_select[0];
            id_name = "multiple_select_";
            question_num++;
            multiple_select_num++;
            Item_num = multiple_select_num;

            break;
        case "blank":
            question = blank_select[0];
            id_name = "blank_select_";
            blank_select_num++;
            question_num++;
            Item_num = blank_select_num;

            break;
        case "multiple_blank":
            question = multiple_blank_select[0];
            id_name = "multiple_blank_select_";
            multiple_blank_select_num++;
            question_num++;
            Item_num = multiple_blank_select_num;

            break;
        case "name":
            question = name_select[0];
            id_name = "name_select_";
            name_select_num++;
            question_num++;
            Item_num = name_select_num;

            break;
        case "mobile":
            question = mobile_select[0];
            id_name = "mobile_select_";
            mobile_select_num++;
            question_num++;
            Item_num = mobile_select_num;
            break;
        case "email":
            question = email_select[0];
            id_name = "email_select_";
            email_select_num++;
            question_num++;
            Item_num = email_select_num;

            break;
        case "sex":
            question = sex_select[0];
            id_name = "sex_select_";
            sex_select_num++;
            question_num++;
            Item_num = sex_select_num;
            break;
        case "date":
            question = date_select[0];
            id_name = "date_select_";
            date_select_num++;
            question_num++;
            Item_num = date_select_num;

            break;
        case "time":
            question = time_select[0];
            id_name = "time_select_";
            time_select_num++;
            question_num++;
            Item_num = time_select_num;

            break;
        case "age":
            question = age_select[0];
            id_name = "age_select_";
            age_select_num++;
            question_num++;
            Item_num = age_select_num;

            break;
        case "education":
            question = education_select[0];
            id_name = "education_select_";
            education_select_num++;
            question_num++;
            Item_num = education_select_num;

            break;
        case "major":
            question = major_select[0];
            id_name = "major_select_";
            major_select_num++;
            question_num++;
            Item_num = major_select_num;

            break;
        case "occupation":
            question = occupation_select[0];
            id_name = "occupation_select_";
            occupation_select_num++;
            question_num++;
            Item_num = occupation_select_num;
            break;


    }

    question.style.display = "block";
    var question_order = question.getElementsByClassName("question_order")[0];
    question_order.innerHTML = question_num;
    
    question.setAttribute("order_index", question_num);
    var clonedDiv = question.cloneNode(true);
    question.style.display = "none";

    clonedDiv.setAttribute("id", id_name + Item_num);
    question_Box.appendChild(clonedDiv);
}


//增加選項
function Add_Item(obj) {

    //當前問題DIV
    var question_div = document.getElementById(obj.parentNode.parentNode.parentNode.parentNode.id);
    //選項UL
    var ul = question_div.getElementsByTagName("ul");
    //var questionType = obj.parentNode.parentNode.parentNode.parentNode.getAttribute("data-type");

    var question_id = obj.parentNode.parentNode.parentNode.parentNode.getAttribute("id");

    var type = String(question_id).split("_");
    var questionType = type[0] + "_" + type[1];


    if (questionType == "multiple_blank") {
        //選項數量
        var Item_count = ul[0].childElementCount / 2;
        var copy_li_1 = ul[0].children[0].cloneNode(true);
        var div = copy_li_1.getElementsByTagName("div");
        var count = Item_count + 1;
        div[0].innerHTML = '填空' + count;

        var copy_li_2 = ul[0].children[1].cloneNode(true);

        ul[0].appendChild(copy_li_1);
        ul[0].appendChild(copy_li_2);
    }
    else {
        //選項數量
        var Item_count = ul[0].childElementCount;
        //複製選項
        var copy_li = ul[0].children[Item_count - 1].cloneNode(true);

        var div = copy_li.getElementsByTagName("div");
        var count = Item_count + 1;
        if (questionType == "education_select" || questionType == "occupation_select") {
            div[0].innerHTML = "其他";
        }
        else {
            div[0].innerHTML = '选项' + count;
        }
        

        ul[0].appendChild(copy_li);
    }


    
}

//刪除最後一個選項
function Delect_Item(obj) {

    //當前問題DIV
    var question_div = document.getElementById(obj.parentNode.parentNode.parentNode.parentNode.id);

    var question_id = obj.parentNode.parentNode.parentNode.parentNode.getAttribute("id");

    var type = String(question_id).split("_");
    var questionType = type[0] + "_" + type[1];

    //var questionType = obj.parentNode.parentNode.parentNode.parentNode.getAttribute("data-type");

    //获取问题ul
    var ul = question_div.getElementsByTagName("ul");

    if (questionType == "multiple_blank") {
        //選項數量
        var Item_count = ul[0].childElementCount;
        //保证有一个选项
        if (Item_count / 2 > 1) {
            ul[0].removeChild(ul[0].children[Item_count - 1]);
            ul[0].removeChild(ul[0].children[Item_count - 2]);

        }

    }
    else {
        //選項UL

        //選項數量
        var Item_count = ul[0].childElementCount;
        
        if (Item_count > 1) {
            ul[0].removeChild(ul[0].lastElementChild);
        }
    }


    
}

//刪除當前問題
function Delete_select(obj) {
    var index = 0;
    //當前問我問題DIV的id
    var question_id = obj.parentNode.parentNode.id;

    var question_div = document.getElementById(question_id);

    //当前是第几个问题
    index = question_div.getAttribute("order_index");
    //修改题目删除后的序号
    var n = Number(15) + Number(index);
    for (var i = n; i <= question_Box.children.length; i++) {
        var child_div = question_Box.children[i - 1];

        //修改自定义标签
        var order_index = child_div.getAttribute("order_index");
        order_index--;
        child_div.setAttribute("order_index", order_index);


        var question_order = child_div.getElementsByClassName("question_order")[0];
        question_order.innerHTML = order_index;

    }

    //var questionType = question_div.getAttribute("questionType");

    var question_id = obj.parentNode.parentNode.parentNode.parentNode.getAttribute("id");

    var type = String(question_id).split("_");
    var questionType = type[0] + "_" + type[1];

    //删除各种题目数量
    switch (questionType) {
        case "single_select":
            single_num--;
            break;
        case "multiple_select":
            multiple_select_num--;
            break;
        case "blank_select":
            blank_select_num--;
            break;
        case "multiple_blank":
            multiple_blank_select_num--;
            break;
        case "name_select":
            name_select_num--;
            break;
        case "mobile_select":
            mobile_select_num--;
            break;
        case "email_select":
            email_select_num--;
            break;
        case "sex_select":
            sex_select_num--;
            break;
        case "date_select":
            date_select_num--;
            break;
        case "time_select":
            time_select_num--;
            break;
        case "age_select":
            age_select_num--;
            break;
        case "ducation_select":
            education_select_num--;
            break;
        case "major_select":
            major_select_num--;
            break;
        case "occupation_select":
            occupation_select_num--;
            break;
    }


    question_num--;
    question_Box.removeChild(question_div);
}


//  odd 同步标题
var header_title = document.getElementsByClassName('header_edit_title');
var naire_title = document.getElementById('input_title');

naire_title.addEventListener('mouseout', function (e) {
    titleChange(e);
}, false);

function titleChange(e) {
    header_title[0].innerText = e.srcElement.innerText;
}

//原本内容
var Text;

//问卷标题恢复默认值
function RecoverDefault(obj) {

    if (obj.id == "input_hint") {
        var div = document.getElementById(obj.id);
        div.style.backgroundColor = "#fff";
    }
    if (obj.id == "input_title") {
        var div = document.getElementById(obj.id);
        div.parentNode.style.backgroundColor = "#fff";
    }
    var div = document.getElementById(obj.id);
    var text = div.innerText;

    if (text == "" || text == null) {

        if (obj.id == "input_hint") {

            div.innerHTML = Text;
            
        }
        if (obj.id == "input_title") {
            div.parentNode.innerHTML = Text;
        }
    }
}



//改变标题编辑时背景颜色
function ChangeBackground(obj) {

    if (obj.id == "input_hint") {
        var div = document.getElementById(obj.id);
        div.style.backgroundColor = "rgb(244,244,244)";
        Text = div.innerText;
    }
    if (obj.id == "input_title") {
        var div = document.getElementById(obj.id);
        div.parentNode.style.backgroundColor = "rgb(244,244,244)";
        Text = div.parentNode.innerText;
    }
    var title = obj.getAttribute("data-item-title");
    if (title == "title") {
        obj.style.backgroundColor = "rgb(244,244,244)";
        Text = obj.innerText;
    }
    var item = obj.getAttribute("data-question-item");
    if (item == "Radio" || item == "Checkbox" || item == "Multiple" || item == "Radio") {
        if (item == "Multiple") {
            obj.style.backgroundColor = "rgb(244,244,244)";
        }
        else {
            obj.parentNode.style.backgroundColor = "rgb(244,244,244)";
        }
        Text = obj.innerText;
    }
}
//判断问题不存在空值
function JudgeNull(obj) {

    var title = obj.getAttribute("data-item-title");
    if (title == "title") {
        obj.style.backgroundColor = "#fff";
        if (obj.innerText == "" || obj.innerText == null) {
            obj.innerHTML = Text;
        }
    }
    var item = obj.getAttribute("data-question-item");
    if (item == "Radio" || item == "Checkbox" || item == "Multiple" || item =="Radio") {
        if (item == "Multiple") {
            obj.style.backgroundColor = "#fff";
        } else {
            obj.parentNode.style.backgroundColor = "#fff";
        }
        if (obj.innerText == "" || obj.innerText == null) {
            obj.innerHTML = Text;
        }
    }

}

//删除cookies
function deleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//获取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}


//初始化用户信息
function InitUserInfo() {
    var user_name = document.getElementById("user_name");
    user_name.innerText = getCookie("user_name");
    var avatar=getCookie("user_avatar");
    var user_avatar = document.getElementById("user_avatar");
    
    if (avatar == "") {
        return;
    }
    else
    {
        user_avatar.src = avatar;
    }
}
InitUserInfo();

//退出登录
var exit = document.getElementById("exit");
//返回登录
var back= document.getElementById("back");
exit.addEventListener('click', ExitLogin, false);
back.addEventListener('click', BackProject, false);




//退出登录转到登录界面
function ExitLogin() {
    deleteCookie("user_name");
    deleteCookie("user_account");
    deleteCookie("user_password");
    deleteCookie("user_id");
    window.location.href = "../Login/Index";
}

//返回项目列表面
function BackProject() {
    window.location.href = "../ProjectList/Index?id=" + getCookie("user_id");
}