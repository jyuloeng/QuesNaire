﻿//  填空实体类
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
            }
        }
    }())

    //  把这个东西转json就能得到问卷
    var naire = new Naire(title, hint, questions_list);
    console.log(JSON.stringify(naire));
}