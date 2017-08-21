var Config = {
    init:function(){
        var Host = window.location.protocol + "//" + window.location.host;
        var Host_Path = Host;
        if(window.location.pathname == "/"){
            Host_Path = Host_Path + "/index.html"
        }else{
            Host_Path = Host_Path + window.location.pathname;
        }
        //index http config
        var index = {
            chart1: Host + "/data1.json",
            chart2: Host + "/data1.json",
            chart3: Host + "/data2.json",
            chart4: Host + "/data3.json"
        }
        this.host = Host;
        this.Host_Path = Host_Path;
        this.index = index;
        //tingzhi http config
        var tingzhi = {
            chart2:Host + "/data4.json",
            chart3:Host + "/data5.json",
            chart4:Host + "/data4.json",
            //table url
            table:"sddddd"
        }
        this.tingzhi = tingzhi;
        //init table page url
        this.Host_Table_Path = Host_Path.replace("index.html","table.html");
    }
}