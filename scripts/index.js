$(function () {
    $(".planet").click(function () {
        $(this).toggleClass("focus");
    });
    init();
    //
    var data = [{
        value: 335,
        name: "已完成"
    }, {
        value: 310,
        name: "未完成"
    }, {
        value: 243,
        name: "未开始"
    }]
    loadchart1(data);

    //loadchart3
    
    loadchart3(data3);
});
function init() {
    var mychart = echarts.init(document.getElementById("chart1"));
    $("#chart1").data("table", mychart)
}
//table 1
function loadchart1(array) {
    var _data = array.map(function (v) {
        var s = v;
        s.label = {
            normal: {
                show: false,
                position: "inside"
            }
        }
        return s
    })
    var option = {
        color: ["#00C89D", "#FF5A5D", "#F1BE00"],
        title: {
            text: '迎上整体指标完成情况分析',
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
            data: ['已完成', '未完成', '未开始'],
            textStyle: {
                color: "#fff"
            },
            bottom: 0
        },
        series: [
            {
                name: '访问来源',
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
    $("#chart1").data("table").setOption(option);
}


function loadchart3(array) {
    var _data = array.sort(function (x, y) {
        if (x < y) {
            return -1;
        } else if (x > y) {
            return 1;
        } else {
            return 0;
        }
    });
    var d = _data.length > 3 ? 3 : _data.length;
    for (var i = 0; i < d; i++) {
        _data[i].itemStyle = {
            normal: {
                color: "#00C89D"
            }
        }
    }
    var option = {
        title: {
            text: '世界人口总量',
            subtext: '数据来自网络'
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
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category'
        },
        series: [
            {
                name: '2011年',
                type: 'bar',
                data: _data
            }
        ]
    };
}