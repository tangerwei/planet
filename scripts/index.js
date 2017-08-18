$(function () {
    var index = window.index;
    index.init();
});

var index = {
    init: function () {
        //init planet state
        $(".planet").click(function () {
            $(this).toggleClass("focus");
        });
        var mychart = echarts.init(document.getElementById("chart1"));
        $("#chart1").data("table", mychart);
        var mychart2 = echarts.init(document.getElementById("chart2"));
        $("#chart2").data("table", mychart2);
        var mychart3 = echarts.init(document.getElementById("chart3"));
        $("#chart3").data("table", mychart3);
        //init
        this.loadchart();
    },
    loadchart: function () {
        var self = this;
        //load chart 1
        var chart1_url = "./data1.json";
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
        var chart2_url = "./data1.json";
        var chart2_param = {};
        $.get(chart2_url, chart1_param, function (data) {
            self.loadpiechart("chart2", data, {
                color: ["#00C89D", "#FF5A5D", "#F1BE00"],
                title: {
                    text: '厅直整体指标完成进度'
                },
                legend: {
                    data: ['已完成', '未完成', '未开始']
                }
            })
        }, "json");
        //load chart 2
        var chart3_url = "./data2.json";
        var chart3_param = {};
        $.get(chart3_url, chart3_param, function (data) {
            self.loadbarchart("chart3", data);
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
            title: {
                text: '盟市考核排名',
                x: 'center',
                textStyle: {
                    color: "#41B8F4",
                    fontWeight: 'bold',
                    fontSize: 16
                },
                top: 25
            },
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
    }
}