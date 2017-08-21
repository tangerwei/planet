var tingzhi = {
    init: function () {
        this.clear();
        var mychart = echarts.init(document.getElementById("chart1"));
        $("#chart1").data("table", mychart);
        var mychart2 = echarts.init(document.getElementById("chart2"));
        $("#chart2").data("table", mychart2);
        var mychart3 = echarts.init(document.getElementById("chart3"));
        $("#chart3").data("table", mychart3);
        var mychart4 = echarts.init(document.getElementById("chart4"));
        $("#chart4").data("table", mychart4);
        //init
        this.loadchart();
    },
    loadchart: function () {
        var self = this;
        //load chart 1
        var chart1_url = Config.index.chart2;
        var chart1_param = {};
        $.get(chart1_url, chart1_param, function (data) {
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
            self.loadpiechart("chart1", _data, {
                color: ["#00C89D", "#FF5A5D", "#F1BE00"],
                title: {
                    text: '整体指标完成进度'
                },
                legend: {
                    data: ['已完成', '未完成', '未开始']
                }
            })
        }, "json");
        //load chart2
        var chart2_url = Config.tingzhi.chart2;
        var chart2_param = {};
        $.get(chart2_url, chart2_param, function (data) {
            self.loadchart2(data);
        });
        //load chart3
        var chart3_url = Config.tingzhi.chart3;
        var chart3_param = {};
        $.get(chart3_url, chart3_param, function (data) {
            self.loadchart3(data);
            //update localdata
            var localdata = JSON.stringify(data);
            localStorage.$_$tabledata = localdata;
            //bind click event
            $("#chart3").data("table").on("click", function (params) {
                window.location.href = Config.Host_Table_Path + "?index=" + params.dataIndex + "&page=tingzhi";
            })
        });
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
    loadchart2: function (data) {
        var labelcollections = data.map(function (v) {
            return v.name
        });
        var valuecollections = data.map(function (v) {
            return v.value
        });
        var end = 100;
        //computed end
        if (valuecollections.length > 5) {
            end = (Math.floor(5 / valuecollections.length * 100) + 1);
        }
        var option = {
            title: {
                text: "考核得分情况分析",
                x: 'center',
                textStyle: {
                    color: "#41B8F4",
                    fontWeight: 'bold',
                    fontSize: 16
                },
                top: 40
            },
            barWidth: 40,
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            dataZoom: [
                {
                    type: "slider",
                    start: 1,
                    end: end,
                    filterMode: "empty",
                    showDetail: false,
                    zoomLock: true,
                    height: 10,
                    bottom: 30,
                    backgroundColor: "rgba(85, 103, 126, 0.5)",
                    fillerColor: "rgb(85,103,126)"
                }
            ],
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: labelcollections,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: { textStyle: { color: "#41B8F4" } }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: { show: false },
                    axisLabel: { textStyle: { color: "#41B8F4" } }
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: valuecollections
                }
            ]
        };
        $("#chart2").data("table").setOption(option);
    },
    loadchart3: function (data) {
        var label = data.map(function (v) {
            return v.name;
        });
        var part_1 = data.map(function (v) {
            return v.value1;
        })
        var part_2 = data.map(function (v) {
            return v.value2;
        })
        var end = 100;
        //computed end
        if (part_2.length > 5) {
            end = Math.floor(5 / part_2.length * 100);
        }
        var option = {
            color: ["rgb(57,171,232)", "rgb(0,200,157)"],
            title: {
                text: "各部门执行情况分析",
                x: 'center',
                textStyle: {
                    color: "#41B8F4",
                    fontWeight: 'bold',
                    fontSize: 16
                },
                top: 40
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['承担指标量', '已完成指标量'],
                orient: 'horizontal',
                x: "center",
                textStyle: {
                    color: "#fff"
                },
                bottom: 10
            },
            dataZoom: [
                {
                    type: "slider",
                    start: 1,
                    end: end,
                    filterMode: "empty",
                    showDetail: false,
                    zoomLock: true,
                    height: 10,
                    bottom: 55,
                    backgroundColor: "rgba(85, 103, 126, 0.5)",
                    fillerColor: "rgb(85,103,126)"
                }
            ],
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: label,
                    axisLabel: { textStyle: { color: "#41B8F4" } }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: { show: false },
                    axisLabel: { textStyle: { color: "#41B8F4" } }
                }
            ],
            series: [
                {
                    name: '承担指标量',
                    type: 'bar',
                    data: part_1,
                },
                {
                    name: '已完成指标量',
                    type: 'bar',
                    data: part_2,
                }
            ]
        };
        $("#chart3").data("table").setOption(option);
    },
    clear: function () {
        this.initchart("chart1", "整体指标完成进度");
        this.initchart("chart2", "考核得分情况");
        this.initchart("chart3", "各部门执行情况");
        this.initchart("chart4", "指标完成趋势分析");
    },
    initchart: function (id, title) {
        $("." + id).empty();
        var chart = '<div class="title">' + title + '</div>\
        <div id="'+ id + '" class="chart">\
        </div>';
        document.getElementsByClassName(id)[0].innerHTML = chart;
    },
}