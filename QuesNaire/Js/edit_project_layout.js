

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

////单选
//function SingleSelect_question() {
//    question_num++;
//    single_num++;
//    single_select[0].style.display = "block";
//    var question_order = single_select[0].getElementsByClassName("question_order")[0];
//    question_order.innerHTML = question_num;
//    var clonedDiv = single_select[0].cloneNode(true);
//    single_select[0].style.display = "none";

//    clonedDiv.setAttribute("id", "single_select_" + single_num);
//    question_Box.appendChild(clonedDiv);
//}
////多选
//function Multiple_select_question() {
//    question_num++;
//    multiple_select_num++;
//    multiple_select[0].style.display = "block";
//    var question_order = multiple_select[0].getElementsByClassName("question_order")[0];
//    question_order.innerHTML = question_num;
//    var clonedDiv = multiple_select[0].cloneNode(true);
//    multiple_select[0].style.display = "none";
//    clonedDiv.setAttribute("id", "multiple_select_" + multiple_select_num);

//    question_Box.appendChild(clonedDiv);
//}
////填空
//function Blank_question() {
//    question_num++;
//    blank_select_num++;
//    blank_select[0].style.display = "block";

//    var question_order = blank_select[0].getElementsByClassName("question_order")[0];
//    question_order.innerHTML = question_num;
//    var clonedDiv = blank_select[0].cloneNode(true);
//    blank_select[0].style.display = "none";
//    clonedDiv.setAttribute("id", "multiple_select_" + blank_select_num);

//    question_Box.appendChild(clonedDiv);

//}

//增加選項
function Add_Item(obj) {

    //當前問題DIV
    var question_div = document.getElementById(obj.parentNode.parentNode.parentNode.parentNode.id);
    //選項UL
    var ul = question_div.getElementsByTagName("ul");
    var questionType = obj.parentNode.parentNode.parentNode.parentNode.getAttribute("questionType");

    if (questionType == "duotiankong") {
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
        if (questionType == "education" || questionType == "occupation") {
            div[0].innerHTML = "其他";
        }
        else {
            div[0].innerHTML = '选项' + count;
        }
        

        ul[0].appendChild(copy_li);
    }


    
}

//刪除最後一個選項
function Delect_Itrm(obj) {

    //當前問題DIV
    var question_div = document.getElementById(obj.parentNode.parentNode.parentNode.parentNode.id);
    //選項UL
    var ul = question_div.getElementsByTagName("ul");

    //選項數量
    var Item_count = ul[0].childElementCount;
    //保证有一个选项
    if (Item_count > 1) {
        ul[0].removeChild(ul[0].lastElementChild);
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

    var questionType = question_div.getAttribute("questionType");

    //删除题目数量
    switch (questionType) {
        case "danxuan":
            single_num--;
            break;
        case "duoxuan":
            multiple_select_num--;
            break;
        case "tiankong":
            blank_select_num--;
            break;
        case "duotiankong":
            multiple_blank_select_num--;
            break;
        case "name":
            name_select_num--;
            break;
        case "mobile":
            mobile_select_num--;
            break;
        case "email":
            email_select_num--;
            break;
        case "sex":
            sex_select_num--;
            break;
        case "date":
            date_select_num--;
            break;
        case "time":
            time_select_num--;
            break;
        case "age":
            age_select_num--;
            break;
        case "ducation":
            education_select_num--;
            break;
        case "major":
            major_select_num--;
            break;
        case "occupation":
            occupation_select_num--;
            break;
    }


    question_num--;
    question_Box.removeChild(question_div);
}
//function createNaire() {
//    var danxuan = document.createElement('div');
//    danxuan.setAttribute('id', 'single_select');
//    danxuan.setAttribute('class', 'question_item');
//    danxuan.setAttribute('data-questionType', 'danxuan');
//    danxuan.setAttribute('data-item', 'question');

//    var float_div = document.createElement('div');
//    float_div.setAttribute('class', 'float_div');

//        var required = document.createElement('div');
//        var Delete = document.createElement('div');
//        required.setAttribute('id', 'required_select');
//        Delete.setAttribute('id', 'delete_select');

//    float_div.appendChild(required);
//    float_div.appendChild(Delete);

//    var question_content_wrap = document.createElement('div');
//    question_content_wrap.setAttribute('class', 'question_content_wrap');
//    var question_content = document.createElement('div');
//    question_content.setAttribute('class', 'question_content');


//    var question_title_wrap = document.createElement('div');
//    question_title_wrap.setAttribute('class', 'question_title_wrap');

//    var question_order = document.createElement('div');
//    question_order.setAttribute('class', 'question_order');


//    //问题序号
//    var content_editable = document.createElement('div');
//    content_editable.setAttribute('class', 'content_editable');

//    //问题标题
//    var question_title = document.createElement('div');
//    question_title.setAttribute('class', 'question_title');
//    question_title.setAttribute('contenteditable', 'true');
//    question_title.setAttribute('data-item-title', 'title');
//    question_title.innerText = "请选择一个选项";

//    question_title_wrap.appendChild(content_editable);
//    question_title_wrap.appendChild(question_title);


//    var question_option_list = document.createElement('div');
//    question_option_list.setAttribute('class', 'question_option_list');

//    //ul样式
//    var quesrion_option_ul = document.createElement('ul');
//    quesrion_option_ul.setAttribute('class', 'quesrion_option_ul');

//    var li = document.createElement('li');
//    li.setAttribute('class', 'option_item');
//    var img = document.createElement('img');
//    img.src = "~/Images/single_seletion.png";
//    var div = document.createElement('div');
//    div.innerText = "选项1";
//    li.appendChild(img);
//    li.appendChild(div);

//    quesrion_option_ul.appendChild(li);
//    quesrion_option_ul.appendChild(li);


//    var question_opeion_operate = document.createElement('div');
//    question_opeion_operate.setAttribute('class', 'question_opeion_operate');

//    //增加选项框
//    var operate_add = document.createElement('div');
//    operate_add.setAttribute('class', 'operate_add');
//    var add_i = document.createElement('i');
//    add_i.setAttribute('class', 'add_icon');
//    operate_add.appendChild(add_i);
//    operate_add.innerText = "添加单个选项";

//    //删除选项框
//    var operate_delete = document.createElement('div');
//    operate_delete.setAttribute('class', 'operate_add');
//    var delete_i = document.createElement('i');
//    delete_i.setAttribute('class', 'delete_icon');
//    operate_delete.appendChild(delete_i);
//    operate_delete.innerText = "删除最后选项";

//    question_opeion_operate.appendChild(operate_add);
//    question_opeion_operate.appendChild(operate_delete);


//    question_content.appendChild(question_title_wrap);
//    question_content.appendChild(question_option_list);
//    question_content.appendChild(question_opeion_operate);

//    question_content_wrap.appendChild(question_content);


//    danxuan.appendChild(float_div);
//    danxuan.appendChild(question_content_wrap);

//    question_list.push(danxuan);

//};