$(function () {
    //init Config
    Config.init();
    //init base on location
    $Map.reload();
    $(window).on("popstate",function(event){
        $Map.reload(event.originalEvent.state);
    });
    // index.init();
    $(".planet").click(function () {
        if ($(this).hasClass("focus")) {
            return;
        } else {
            $(".planet.focus").removeClass("focus");
            $(this).addClass("focus");
        }
        var t = $(this).attr("data-target");
        switch (t) {
            case "index":
                $Map.load(window.index, "index");
                break;
            case "mengshi":
                // $Map.load(window.index);
                break;
            case "tingzhi":
                $Map.load(window.tingzhi, "tingzhi");
                break;
            case "jixiao":
                // $Map.load(window.index);
                break;
            case "yinshang":
                // $Map.load(window.index);
                break;
            default:
                break;
        }
    });
});
var $Map = {
    currentJS: {
        init: function () {
            //for replace
        }
    },
    load: function (t, path, title) {
        this.currentJS = t;
        this.init();
        //add window history
        var state = path;
        window.history.pushState(state, title, Config.Host_Path + "?page=" + path);
    },
    go:function(t, path, title){
        this.currentJS = t;
        this.init();
        //add window history
        var state = path;
        window.history.replaceState(state, title, Config.Host_Path + "?page=" + path);
    },
    init: function () {
        this.currentJS.init();
    },
    reload: function (path) {
        var params = window.location.search.replace("?","").split("&");
        var pages="";
        for(var i=0;i<params.length;i++){
            if(params[i].split("=")[0]=="page"){
                pages = params[i].split("=")[1]
            }
        }
        var location = path ? path : pages;
        $(".planet.focus").removeClass("focus");
        switch (location) {
            case "mengshi":
                // this.load(window.index);
                $("#mercury").addClass("focus");
                break;
            case "tingzhi":
                $("#venus").addClass("focus");
                this.go(window.tingzhi,"tingzhi");
                break;
            case "jixiao":
                // this.load(window.index);
                $("#earth").addClass("focus");
                break;
            case "yinshang":
                // this.load(window.index);
                $("#jupiter").addClass("focus");
                break;
            default:
                $("#sun").addClass("focus");
                this.go(window.index, "index");
                break;
        }
    }
};