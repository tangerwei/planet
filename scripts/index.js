
var index = {
    clear: function () {
        $("div.body>.container").show();
        this.initchart("chart1","迎上指标完成进度");
        this.initchart("chart2","厅直整体指标完成进度");
        this.initchart("chart3","盟市考核排名");
        this.initTable();
    },
    init: function () {
        this.clear();
        //init planet state
        var mychart = echarts.init(document.getElementById("chart1"));
        $("#chart1").data("table", mychart);
        var mychart2 = echarts.init(document.getElementById("chart2"));
        $("#chart2").data("table", mychart2);
        var mychart3 = echarts.init(document.getElementById("chart3"));
        $("#chart3").data("table", mychart3);
        //init
        this.loadchart();
    },
    initchart: function (id, title) {
        $("." + id).empty();
        var chart = '<div class="title">' + title + '</div>\
        <div id="'+ id + '" class="chart">\
        </div>';
        document.getElementsByClassName(id)[0].innerHTML = chart;
    },
    initTable: function () {
        $(".chart4").empty();
        var chart4 = '<div class="title">优秀人员名单</div>\
        <div id="chart4" class="chart">\
            <table id="chart4table">\
                <thead>\
                    <tr>\
                        <th>序号</th>\
                        <th>姓名</th>\
                        <th>连续优秀</th>\
                    </tr>\
                </thead>\
                <tbody>\
                </tbody>\
            </table>\
        </div>';
        document.getElementsByClassName("chart4")[0].innerHTML = chart4;
    },
    loadchart: function () {
        var self = this;
        //load chart 1
        var chart1_url = Config.index.chart1;
        var chart1_param = {};
        $.get(chart1_url, chart1_param, function (data) {
            self.loadpiechart("chart1", data, {
                color: ["#00C89D", "#FF5A5D", "#F1BE00"],
                title: {
                    text: '迎上整体指标完成情况分析'
                },
                legend: {
                    data: ['已完成', '未完成', '未开始']
                }
            })
        }, "json");
        //load chart 2
        var chart2_url = Config.index.chart2;
        var chart2_param = {};
        $.get(chart2_url, chart2_param, function (data) {
            var _data = [{
                name: "已完成",
                value: data.completedCount
            }, {
                name: "未完成",
                value: data.nocompleteCount
            }, {
                name: "未开始",
                value: data.nobeginCount
            }];
            self.loadpiechart("chart2", _data, {
                color: ["#00C89D", "#FF5A5D", "#F1BE00"],
                title: {
                    text: '厅直整体指标完成进度'
                },
                legend: {
                    data: ['已完成', '未完成', '未开始']
                }
            })
        }, "json");
        //load chart 3
        var chart3_url = Config.index.chart3;
        var chart3_param = {};
        $.get(chart3_url, chart3_param, function (data) {
            var _data = [];
            if (data.length > 0) {
                data.map(function (v) {
                    _data.push({
                        name: v.ST_DEPT_NAME,
                        value: v.tscore
                    })
                });
            }
            self.loadbarchart("chart3", _data);
        }, "json");

        //load table
        var chart3_url = Config.index.chart4;
        var chart3_param = {};
        $.get(chart3_url, chart3_param, function (data) {
            self.loadTable(data);
        }, "json");
    },
    loadpiechart: function (id, data, poptions) {
        // formatter data
        var _data = data.map(function (v) {
            var s = v;
            s.label = {
                normal: {
                    show: false,
                    position: "inside"
                }
            }
            return s
        })
        //default options
        var option = {
            title: {
                x: 'center',
                textStyle: {
                    color: "#41B8F4",
                    fontWeight: 'bold',
                    fontSize: 16
                },
                top: 40
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                x: "center",
                textStyle: {
                    color: "#fff"
                },
                bottom: 0
            },
            series: [
                {
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: _data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        for (key in poptions) {
            if (typeof poptions[key] == "string") {
                option[key] = poptions[key];
            } else if (typeof poptions[key].length == "number") {
                option[key] = poptions[key];
            } else {
                var item = poptions[key];
                for (v in item) {
                    if (typeof item[v] == "string" || typeof item[v].length == "number") {
                        option[key][v] = item[v];
                    } else {
                        console.error("poptions is in error construct");
                        console.error(poptions);
                        return;
                    }
                }
            }
        }
        $("#" + id).data("table").setOption(option);
    },
    loadbarchart: function (id, data, poptions) {
        var _data = data.sort(function (x, y) {
            if (x.value < y.value) {
                return -1;
            } else if (x.value > y.value) {
                return 1;
            } else {
                return 0;
            }
        });
        var d = _data.length > 3 ? 3 : _data.length;
        for (var i = 0; i < d; i++) {
            _data[_data.length - (i + 1)].itemStyle = {
                normal: {
                    color: "#00C89D"
                }
            }
        }
        var _textdata = _data.map(function (v) {
            return v.name
        });
        var option = {
            // title: {
            //     text: '盟市考核排名',
            //     x: 'left',
            //     textStyle: {
            //         color: "#41B8F4",
            //         fontWeight: 'bold',
            //         fontSize: 16
            //     },
            //     top: 25
            // },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['2011年']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                splitLine: { show: false },
                axisLabel: { textStyle: { color: "#41B8F4" } }
            },
            yAxis: {
                type: 'category',
                data: _textdata,
                axisLabel: { textStyle: { color: "#41B8F4" } }
            },
            series: [
                {
                    type: 'bar',
                    data: _data
                }
            ]
        };
        $("#" + id).data("table").setOption(option);
    },
    loadTable: function (data) {
        var self = this;
        var tbody = "";
        if (data.length > 0) {
            data.map(function (v, index) {
                tbody += "<tr>"
                tbody += "<td>" + (index + 1) + "</td>";
                tbody += "<td>" + v.name + "</td>";
                if (v.continutimes > 0) {
                    tbody += "<td>" + self.getWinType(v.continutimes) + "</td>";
                } else {
                    tbody += "<td></td>";
                }
                tbody += "</tr>"
            });
        }
        document.getElementById("chart4table").getElementsByTagName("tbody")[0].innerHTML = tbody;
    },
    getWinType: function (num) {
        switch (num) {
            case 1:
                return "<img src='./images/win.png' />";
            case 2:
                return "<img src='./images/win2.png' />";
            case 3:
                return "<img src='./images/win3.png' />";
            default:
                return ""
        }
    }
}