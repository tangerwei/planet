var table = {
    init: function () {
        var self = this;
        var deptId = this.getDeptId(this.getQuery("index"));
        var tableurl = this.getUrl(this.getQuery("page"));
        //init table
        var params = {
            deptId: deptId,
            year: (new Date()).getFullYear()
        }
        $.get(tableurl, params, function (data) {
            self.loadData(data);
        })
    },
    loadData: function (data) {
        
    },
    back: function () {
        window.history.back();
    },
    getQuery: function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    getUrl: function (page) {
        return Config[page].table;
    },
    getDeptId: function (index) {
        var data = JSON.parse(localStorage.$_$tabledata);
        return data[index]
    }
}
$(function () {
    Config.init();
    table.init();
});