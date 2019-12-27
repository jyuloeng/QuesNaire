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
                + '<span class="naire_item_title">' + questions[i].title + '</span>'
                //<!--问卷类型-->
                + '<div class="naire_chart_type">'
                + '<div class="btn-group">'
                + '<button type="button" class="btn btn-default dropdown-toggle"'
                + 'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                + '图表类型 <span class="caret"></span>'
                + '</button>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#">饼图</a></li>'
                + '<li><a href="#">圆环图</a></li>'
                + '</ul>'
                + '</div>'

                + '<div class="btn-group" style="margin-left: 4px;">'
                + '<button type="button" class="btn btn-default dropdown-toggle"'
                + 'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                + '显示设置 <span class="caret"></span>'
                + '</button>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#">隐藏图表</a></li>'
                + '<li><a href="#">隐藏数据</a></li>'
                + '</ul>'
                + '</div>'
                + '</div>'

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
                            data: [10, 20, 30, 40, 50, 60, 70],
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

            var table_data = [{
                options: "选项1",
                replys: "0"
            }, {
                options: "选项2",
                replys: "10"
            }, {
                options: "选项3",
                replys: "32"
            }, {
                options: "选项4",
                replys: "11"
            }, {
                options: "选项5",
                replys: "50"
            },];

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
                + '<span class="naire_item_title">' + questions[i].title + '</span>'
                //<!--问卷类型-->
                + '<div class="naire_chart_type">'
                + '<div class="btn-group" style="margin-left: 4px;">'
                + '<button type="button" class="btn btn-default dropdown-toggle"'
                + 'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                + '显示设置 <span class="caret"></span>'
                + '</button>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#">隐藏图表</a></li>'
                + '</ul>'
                + '</div>'
                + '</div>'

                + '<div class="clearfix"></div>'

                + '</div >'
                +   '<div class="naire_data">'
                + '<table id="question_table_' + i + '" class="table table-hover table-borderless"></table>'
                + '</div>';

            naire_body.appendChild(naire_item);

            var table_data = [{
                options: "选项1",
                replys: "0"
            }, {
                options: "选项2",
                replys: "10"
            }, {
                options: "选项3",
                replys: "32"
            }, {
                options: "选项4",
                replys: "11"
            }, {
                options: "选项5",
                replys: "50"
            },];

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
        case 4:
            naire_item.innerHTML = '<div class="naire_title_wrap">'
                //< !--问卷标题-->
                + '<span class="naire_item_title">' + questions[i].title + '</span>'
                //<!--问卷类型-->
                + '<div class="naire_chart_type">'
                + '<div class="btn-group" style="margin-left: 4px;">'
                + '<button type="button" class="btn btn-default dropdown-toggle"'
                + 'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                + '显示设置 <span class="caret"></span>'
                + '</button>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#">隐藏图表</a></li>'
                + '</ul>'
                + '</div>'
                + '</div>'

                + '<div class="clearfix"></div>'

                + '</div >'
                + '<div class="naire_data">'
                + '<table id="question_table_' + i + '" class="table table-hover table-borderless"></table>'
                + '</div>';

            naire_body.appendChild(naire_item);

            var table_data = [{
                options: "选项1",
                replys: "0"
            }, {
                options: "选项2",
                replys: "10"
            }, {
                options: "选项3",
                replys: "32"
            }, {
                options: "选项4",
                replys: "11"
            }, {
                options: "选项5",
                replys: "50"
            },];

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
    }

}
