var statistic_json = document.getElementById('statistic_json').value;
var statistic = JSON.parse(statistic_json);
var questions = statistic.questions;

var naire_body = document.querySelector('.naire_body');

for (let i = 0; i < questions.length; i++) {
    var naire_item = document.createElement('div');
    naire_item.classList.add('naire_item');

    switch (questions[i].flag) {
        case 2:
        case 3:
            naire_item.innerHTML = '<div class="naire_title_wrap">'
                //< !--问卷标题-->
                + '<span class="naire_item_title">' + (i + 1) + '.' + questions[i].title + '</span>'
                + '<div class="clearfix"></div>'
                + '</div >'
                + '<div class="naire_chart">'
                + '<canvas id="question_chart_' + i + '" width="450" height="350"></canvas>'
                + '</div>'
                + '<div class="naire_data">'
                + '<table id="question_table_' + i + '" class="table table-hover table-borderless"></table>'
                + '</div>';

            naire_body.appendChild(naire_item);
            var ctx = document.getElementById('question_chart_' + i + '').getContext('2d');
            var chart = new Chart(ctx,
                {
                    type: 'doughnut',
                    maintainAspectRatio: false,
                    responsive: false,
                    data: {
                        labels: questions[i].options,
                        datasets: [{
                            data: questions[i].replys,
                            backgroundColor: ['#ff5722', '#ff9800', '#ffc107', '#ffeb3b',
                                '#4caf50', '#00bcd4', '#03a9f4', '#2196f3', '#3f51b5', '#673ab7',
                                '#9c27b0']
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: questions[i].title,
                            fontSize: 18
                        }
                    }
                });
            var table_data = new Array();
            for (let k = 0; k < questions[i].options.length; k++) {
                table_data.push({
                    options: questions[i].options[k],
                    replys: questions[i].replys[k]
                })
            }

            //  先销毁表格
            $('#question_table_' + i + '').bootstrapTable("destroy");
            //  加载表格
            $('#question_table_' + i + '').bootstrapTable({
                data: table_data,        // 表格数据来源
                columns: [{
                    field: 'options',
                    title: '选项',
                    class: 'table_cols_width'
                }, {
                    field: 'replys',
                    title: '回复情况',
                    class: 'table_cols_width'
                }]
            });
            break;
        case 1:
            naire_item.innerHTML = '<div class="naire_title_wrap">'
                //< !--问卷标题-->
                + '<span class="naire_item_title">' + (i + 1) + '.' + questions[i].title + '</span>'
                + '<div class="clearfix"></div>'
                + '</div >'

                +   '<div class="naire_data">'
                + '<table id="question_table_' + i + '" class="table table-hover table-borderless"></table>'
                + '</div>';

            naire_body.appendChild(naire_item);

            var table_data = new Array();
            for (let k = 0; k < questions[i].replys.length; k++) {
                table_data.push({
                    replys: questions[i].replys[k]
                })
            }

            //  先销毁表格
            $('#question_table_' + i + '').bootstrapTable("destroy");
            //  加载表格
            $('#question_table_' + i + '').bootstrapTable({
                data: table_data,        // 表格数据来源
                columns: [ {
                    field: 'replys',
                    title: '回复情况',
                    class: 'table_cols_width'
                }]
            });
            break;
        case 4:
            function createTable() {
                var table_html = "";
                for (let option = 0; option < questions[i].options.length; option++) {
                    table_html += ('<table id="question_table_m_' + option + '" class="table table-hover table-borderless"></table>');
                }
                return table_html;
            }

            naire_item.innerHTML = '<div class="naire_title_wrap">'
                //< !--问卷标题-->
                + '<span class="naire_item_title">' + (i + 1) + '.此题为多项填空题，具体题目请看表格标题</span>'
                + '<div class="clearfix"></div>'
                + '</div >'

                + '<div class="naire_data">'

                + createTable();

                + '</div>';

            naire_body.appendChild(naire_item);

           

            for (let option = 0; option < questions[i].options.length; option++) {

                let table_data = new Array();

                //  多项填空有BUG 待修复
                for (let reply = 0; reply < questions[i].replys.length; reply++) {
                    let str = questions[i].replys[reply].substr(0, questions[i].replys[reply].length - 1);
                    str = str.substr(1, questions[i].replys[reply].length - 1);

                    let array = str.split(',');

                    for (let o = 0; o < questions[i].options.length; o++) {
                        for (let a = 0; a < array.length; a++) {
                            table_data.push({
                                replys: array[a]
                            })
                        }
                    }
                }

                //  先销毁表格
                $('#question_table_m_' + option + '').bootstrapTable("destroy");
                //  加载表格
                $('#question_table_m_' + option + '').bootstrapTable({
                    data: table_data,        // 表格数据来源
                    columns: [ {
                        field: 'replys',
                        title: questions[i].options[option]+' 回复情况',
                        class: 'table_cols_width'
                    }]
                });
            }
            break;
    }

}

var edit_check = document.querySelector('.edit_check');
var naireId = document.getElementById('naire_id').value;
edit_check.addEventListener('click', toPreview, false);

function toPreview() {
    window.location.href = "../Project/Index?naire_id=" + naireId + "&isPreview=1";
}


//删除cookies
function deleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

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
    var user_avatar = document.getElementById("user_avatar");
    user_avatar.src = getCookie("user_avatar");
}
InitUserInfo();

//退出登录
var exit = document.getElementById("exit");
var back = document.getElementById("back");
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


