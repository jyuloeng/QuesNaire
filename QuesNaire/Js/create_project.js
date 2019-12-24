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

//  多填实体类
class Multiple {
    constructor(title, flag, items) {
        this.title = title;
        this.flag = flag;
        this.items = items;
    }
}

//  问卷实体类
class Naire {
    constructor(title, hint, list) {
        this.title = title;
        this.hint = hint;
        this.list = list;
    }
}

var btn_submit = document.getElementById('btn_submit');

btn_submit.addEventListener('click', projectSubmit, false);

function projectSubmit() {
    var title = document.getElementById('input_title').innerText;
    var hint = document.getElementById('input_hint').innerText;

    var questions = document.querySelectorAll('div[data-item="question"]');
    var questions_list = new Array();

    (function () {
        for (var i = 14; i < questions.length; i++) {
            var type = questions[i].getAttribute('data-type');
            switch (type) {
                case "Input":
                    var title = questions[i].querySelector('div[data-item-title="title"]').innerText;

                    var input = new Input(title, 1);
                    questions_list.push(input);
                    break;
                case "Radio":
                    var title = questions[i].querySelector('div[data-item-title="title"]').innerText;
                    var item_list = new Array();

                    var items = questions[i].querySelectorAll('div[data-question-item="Radio"]');
                    for (var j = 0; j < items.length; j++) {
                        item_list.push(items[j].innerText);
                    }
                    var radio = new Radio(title, 2, item_list);
                    questions_list.push(radio);
                    break;
                case "Checkbox":
                    var title = questions[i].querySelector('div[data-item-title="title"]').innerText;
                    var item_list = new Array();

                    var items = questions[i].querySelectorAll('div[data-question-item="Checkbox"]');
                    for (var j = 0; j < items.length; j++) {
                        item_list.push(items[j].innerText);
                    }
                    var checkbox = new CheckBox(title, 3, item_list);
                    questions_list.push(checkbox);
                    break;
                case "Multiple":
                    var title = questions[i].querySelector('div[data-item-title="title"]').innerText;
                    var item_titles_list = new Array();

                    var item_titles = questions[i].querySelectorAll('div[data-question-item="Multiple"]');
                    for (var j = 0; j < item_titles.length; j++) {
                        item_titles_list.push(item_titles[j].innerText);
                    }

                    var multiple = new Multiple(title, 4, item_titles_list);
                    questions_list.push(multiple);
                    break;
            }
        }
    }())

    //  把这个东西转json就能得到问卷
    var naire = new Naire(title, hint, questions_list);
    console.log(JSON.stringify(naire));

      //ajax异步提交表单
    $.ajax({
        url: '../EditProject/getNaireJson',
        data: JSON.stringify(naire),
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: true,
        success: function (data) {
            //  成功则重定向去发布项目页
            window.location.href = "../PublishProject/Index?naire_id=" + data;
        }
    });
}