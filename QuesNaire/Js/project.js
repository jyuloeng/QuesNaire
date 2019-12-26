//  填空实体类
class Input {
    constructor(title, flag) {
        this.title = title;
        this.flag = flag;
    }
}

//  单选实体类
class Radio {
    constructor(title, flag, items) {
        this.title = title;
        this.flag = flag;
        this.items = items;
    }
}

//  多选实体类
class CheckBox {
    constructor(title, flag, items) {
        this.title = title;
        this.flag = flag;
        this.items = items;
    }
}

//  填空结果实体类
class InputResult {
    constructor(id, items) {
        this.id = id;
        this.items = items;
    }
}

//  多填空结果实体类
class MultipleResult {
    constructor(id, items) {
        this.id = id;
        this.items = items;
    }
}

//  单选结果实体类
class RadioReuslt {
    constructor(id, items) {
        this.id = id;
        this.items = items;
    }
}

//  多选结果实体类
class CheckBoxResult {
    constructor(id, items) {
        this.id = id;
        this.items = items;
    }
}


var naire = JSON.parse(document.getElementById('naire_json').value);

var naire_title = document.getElementById('naire_title');
var naire_hint = document.getElementById('naire_hint');

var div_naire = document.getElementById('question_box');

naire_title.innerText = naire.title;
naire_hint.innerText = naire.hint;

var naire_list = naire.list;
//  自执行函数生成表单
(function () {
    for (var i = 0; i < naire_list.length; i++) {

        switch (naire_list[i].flag) {
            case 1:
                var naire_item = document.createElement('div');
                naire_item.setAttribute('data-question-id', naire_list[i].id);
                naire_item.setAttribute('data-type', 'input');
                naire_item.setAttribute('data-item', 'question');
                naire_item.classList.add('naire_item');

                var naire_item_title = document.createElement('div');
                naire_item_title.classList.add('naire_item_title');
                naire_item_title.innerText = i + 1 + "." + naire_list[i].title;

                var naire_must = document.createElement('span');
                naire_must.classList.add('naire_must');
                naire_must.innerText = "*";

                naire_item_title.appendChild(naire_must);

                naire_item.appendChild(naire_item_title);

                var input_item = document.createElement('input');
                input_item.setAttribute('type', 'text');
                input_item.setAttribute('data-question-item', 'input');
                input_item.classList.add('input_item');
                

                var naire_item_input = document.createElement('div');
                naire_item_input.classList.add('naire_item_input');

                naire_item_input.appendChild(input_item);

                naire_item.appendChild(naire_item_input);

                div_naire.appendChild(naire_item);
                //console.log('tiankong');
                break;
            case 2:
                var naire_item = document.createElement('div');
                naire_item.setAttribute('data-question-id', naire_list[i].id);
                naire_item.setAttribute('data-type', 'radio');
                naire_item.setAttribute('data-item', 'question');
                naire_item.classList.add('naire_item');

                var naire_item_title = document.createElement('div');
                naire_item_title.classList.add('naire_item_title');
                naire_item_title.innerText = i + 1 + "." + naire_list[i].title+" (单选题)";

                var naire_must = document.createElement('span');
                naire_must.classList.add('naire_must');
                naire_must.innerText = "*";

                naire_item_title.appendChild(naire_must);

                naire_item.appendChild(naire_item_title);

                var naire_item_items = document.createElement('div');
                naire_item_items.classList.add('naire_item_items');

                (function () {
                    for (var item = 0; item < naire_list[i].list.length; item++) {

                        var input_item = document.createElement('input');
                        input_item.setAttribute('type', 'radio');
                        input_item.setAttribute('name', naire_list[i].title);
                        input_item.setAttribute('data-question-item', 'radio');
                        input_item.setAttribute('value', naire_list[i].list[item]);

                        var radio_value = document.createElement('span');
                        radio_value.classList.add('item_value');
                        radio_value.innerText = naire_list[i].list[item];

                        var radio_item = document.createElement('div');
                        radio_item.classList.add('radio_item');
                        radio_item.appendChild(input_item);
                        radio_item.appendChild(radio_value);

                        naire_item_items.appendChild(radio_item);

                        naire_item.appendChild(naire_item_items);
                    }
                }());

                div_naire.appendChild(naire_item);
                //console.log('danxuan');
                break;
            case 3:
                var naire_item = document.createElement('div');
                naire_item.setAttribute('data-question-id', naire_list[i].id);
                naire_item.setAttribute('data-type', 'checkbox');
                naire_item.setAttribute('data-item', 'question');
                naire_item.classList.add('naire_item');

                var naire_item_title = document.createElement('div');
                naire_item_title.classList.add('naire_item_title');
                naire_item_title.innerText = i + 1 + "." + naire_list[i].title + " (多选题)";

                var naire_must = document.createElement('span');
                naire_must.classList.add('naire_must');
                naire_must.innerText = "*";

                naire_item_title.appendChild(naire_must);

                naire_item.appendChild(naire_item_title);

                var naire_item_items = document.createElement('div');
                naire_item_items.classList.add('naire_item_items');

                (function () {
                    for (var item = 0; item < naire_list[i].list.length; item++) {

                        var input_item = document.createElement('input');
                        input_item.setAttribute('type', 'checkbox');
                        input_item.setAttribute('name', naire_list[i].title);
                        input_item.setAttribute('data-question-item', 'checkbox');
                        input_item.setAttribute('value', naire_list[i].list[item]);

                        var checkbox_value = document.createElement('span');
                        checkbox_value.classList.add('item_value');
                        checkbox_value.innerText = naire_list[i].list[item];

                        var checkbox_item = document.createElement('div');
                        checkbox_item.classList.add('checkbox_item');
                        checkbox_item.appendChild(input_item);
                        checkbox_item.appendChild(checkbox_value);

                        naire_item_items.appendChild(checkbox_item);

                        naire_item.appendChild(naire_item_items);
                    }
                }());

                div_naire.appendChild(naire_item);
                //console.log('duoxuan');
                break;
            case 4:
                var naire_item = document.createElement('div');
                naire_item.setAttribute('data-question-id', naire_list[i].id);
                naire_item.setAttribute('data-type', 'multiple');
                naire_item.setAttribute('data-item', 'question');
                naire_item.classList.add('naire_item');

                (function () {
                    for (var title = 0; title < naire_list[i].list.length; title++) {
                        var naire_item_title = document.createElement('div');
                        naire_item_title.classList.add('naire_item_title');
                        naire_item_title.innerText = i + 1 + "." + naire_list[i].list[title];

                        var naire_must = document.createElement('span');
                        naire_must.classList.add('naire_must');
                        naire_must.innerText = "*";

                        naire_item_title.appendChild(naire_must);

                        var input_item = document.createElement('input');
                        input_item.setAttribute('type', 'text');
                        input_item.setAttribute('data-question-item', 'multiple');
                        input_item.classList.add('input_item');

                        var naire_item_input = document.createElement('div');
                        naire_item_input.classList.add('naire_item_input');
                        naire_item_input.classList.add('naire_item_inputs');

                        naire_item_input.appendChild(input_item);

                        naire_item.appendChild(naire_item_title);
                        naire_item.appendChild(naire_item_input);
                    }
                }());

                div_naire.appendChild(naire_item);
                break;
        }
    }
}());

//判断是否全部填写了
function JudgeNull() {
    var radio_index = 0;
    var radio_num = 0;
    var checkbox_index = 0;

    //没有填的题目数量
    var Null_num = 0;
    var naire_item = document.getElementsByClassName("naire_item");


    for (var i = 0; i < naire_item.length; i++) {
        var data_type = naire_item[i].getAttribute("data-type");

        //判断单选
        if (data_type == "radio") {
           
            radio_num = naire_item[i].lastElementChild.children.length;

            for (var j = 0; j < naire_item[i].lastElementChild.children.length; j++) {
                var check = naire_item[i].lastElementChild.children[j].getElementsByTagName("input");
                if (check[0].checked == false) {
                    radio_index++;

                }
                if (radio_num == radio_index) {
                    Null_num++;
                    check[0].parentNode.parentNode.parentNode.classList.add("IsNull");
                }
                else {
                    check[0].parentNode.parentNode.parentNode.classList.remove("IsNull");
                }
                
            }
            radio_index = 0;

        }
        //判断多选
        if (data_type == "checkbox") {
            for (var j = 0; j < naire_item[i].lastElementChild.children.length; j++) {
                var check = naire_item[i].lastElementChild.children[j].getElementsByTagName("input");
                var item_num = naire_item[i].lastElementChild.children.length;
                if (check[0].checked == false) {
                    checkbox_index++;
                }
                if (checkbox_index == item_num) {
                    Null_num++;
                    check[0].parentNode.parentNode.parentNode.classList.add("IsNull");

                }
                else {
                    check[0].parentNode.parentNode.parentNode.classList.remove("IsNull");
                }
            }
        }
        //单项填空
        if (data_type == "input") {
            var input = naire_item[i].lastElementChild.getElementsByTagName("input");
            if (input[0].value == "") {
                Null_num++;
                input[0].classList.add("IsNull");
            }
            else {
                input[0].classList.remove("IsNull");
            }
            
        }
        //多项填空
        if (data_type == "multiple") {
            var multiple_input = naire_item[i].getElementsByClassName("naire_item_inputs");
            for (var j = 0; j < multiple_input.length; j++) {
                var input = multiple_input[j].getElementsByTagName("input");
                if (input[0].value == "") {
                    input[0].classList.add("IsNull");
                    Null_num++;
                }
                else {
                    input[0].classList.remove("IsNull");
                }
                
            }
        }
    }
    return Null_num;
}

//  提交按钮的相关操作
var btn_submit = document.getElementById('btn_submit');
btn_submit.addEventListener('click', submit, false);

function submit() {

    //存在没有填写的题目
    if (JudgeNull() > 0) {
        var isNull = document.getElementsByClassName("IsNull");
        var type = isNull[0].getAttribute("data-type")
        if (type == "radio") {
            isNull[0].lastElementChild.children[0].children[0].focus();
        }
        if (type == "checkbox") {
            isNull[0].lastElementChild.children[0].children[0].focus();
        }
        isNull[0].focus();
        return;
    }

    var naire_questions = document.querySelectorAll('div[data-item="question"]');
    var naire_questions_list = new Array();

    (function () {
        for (var i = 0; i < naire_questions.length; i++) {
            var type = naire_questions[i].getAttribute('data-type');
            switch (type) {
                case "input":
                    var question_id = naire_questions[i].getAttribute('data-question-id');
                    var input = naire_questions[i].querySelector('input[class="input_item"]').value;

                    var result = new InputResult(question_id, input);
                    naire_questions_list.push(result);
                    break;
                case "radio":
                    var question_id = naire_questions[i].getAttribute('data-question-id');
                    var choice;

                    var items = naire_questions[i].querySelector('div[class="naire_item_items"]');
                    var radios = items.querySelectorAll('input[data-question-item="radio"]');
                    for (var j = 0; j < radios.length; j++) {
                        if (radios[j].checked) {
                            choice = radios[j].value;
                            break;
                        }
                    }

                    var result = new RadioReuslt(question_id, choice);
                    naire_questions_list.push(result);
                    break;
                case "checkbox":
                    var question_id = naire_questions[i].getAttribute('data-question-id');
                    var choices = new Array();

                    var items = naire_questions[i].querySelector('div[class="naire_item_items"]');
                    var checkboxes = items.querySelectorAll('input[data-question-item="checkbox"]');
                    for (var j = 0; j < checkboxes.length; j++) {
                        if (checkboxes[j].checked) {
                            choices.push(checkboxes[j].value);
                        }
                    }

                    var result = new CheckBoxResult(question_id, choices);
                    naire_questions_list.push(result);
                    break;
                case "multiple":
                    var question_id = naire_questions[i].getAttribute('data-question-id');

                    var inputs = new Array();
                    var items = naire_questions[i].querySelectorAll('input[data-question-item="multiple"]');
                    for (var j = 0; j < items.length; j++) {
                        inputs.push(items[j].value);
                    }

                    var result = new MultipleResult(question_id, inputs);
                    naire_questions_list.push(result);
                    break;
            }
        }
    }());

    //	只需要把这个naire_questions_list东西
    //  转json即可得到这份问卷数据
    var naire_post_json = {
        list: naire_questions_list
    }
    console.log(JSON.stringify(naire_post_json));

    //ajax异步提交表单
    $.ajax({
        url: '../Project/getQuestionData',
        data: JSON.stringify(naire_post_json),
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: true,
        cache: false,
        success: function (data) {
            //  弹窗提示
            window.alert("提交成功！谢谢您的回答！");
            //  将按钮设为不可用
            btn_submit.classList.add('disable');
        }
    });
}

//  如果是预览状态，移除点击事件
var isPreview = document.getElementById('isPreview');
if (isPreview.value == "1") {
    btn_submit.removeEventListener('click', submit, false);
    var preview_wrap = document.querySelector('.preview_wrap');
    preview_wrap.classList.remove('hidden');
}