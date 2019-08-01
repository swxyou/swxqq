$(document).ready(function () {
    init();
    initBanner();
    init_shoip();
})

function init() {
    $.get("Servlet", {"opr": "selectSession"}, function (data) {
        var vip = "<li><span>您好，</span></li>" +
            "<li id=\"vipnameBox\" class=\"vipname_box\">" +
            "<a href=\"Mylvtu.html\" id=\"vipname\" class=\"vipname\" rel=\"nofollow\">" +
            "<span id='unames' onmouseenter='mouseen()' class=\"fl\" style=\"float:left;\">" + data + "</span>" +
            "<span class=\"vip vip0\"></span> <span class=\"poparrow\"></span>" +
            "</a>" +
            "<div class=\"colle_box\">" +
            "<div class=\"colle_top clearfix\">" +
            "<div class=\"right\">" +
            "<a href=\"Mylvtu.html\">账户管理</a>&nbsp;&nbsp;|&nbsp;&nbsp;" +
            "<a href=\"\">退出</a>" +
            "</div>" +
            "</div>" +
            "<div class=\"colle_bottom\">" +
            "<div class=\"touxiang\">" +
            "<a href=\"Mylvtu.html/\">" +
            "<img id=\"user_head\" src=\"images/homepage_image/nav/g_touxiang.png\" width=\"75px\" height=\"75px\">" +
            "</a>" +
            "</div>" +
            "<div class=\"fl\">" +
            "<div class=\"vip_stage mt_10\">" +
            "<a style=\"color:#f60; font-weight:bold; font-size:16px;\" class=\"vip_lel vip_lel0\" href=\"Mylvtu.html\"></a>" +
            "</div>" +
            "<div>" +
            "<a style=\"color:#404040; font-weight:bold; font-size:14px;\" href=\"http://www.tuniu.com/u/club\">查看我的会员特权</a>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</li>";
        +"<li><a rel=\"nofollow\" href=\"https://i.tuniu.com/u/inviteCode\" target=\"_blank\"><img src=\"http://img4.tuniucdn.com/img/2017020818/common/oldtonew_v2.gif\" alt=\"老带新\" style=\"height: 22px;line-height: 22px; vertical-align: middle;\"></a></li>"
        var notvip = " <li><a rel=\"nofollow\" href=\"Login.html\" target=\"_blank\">登录</a></li>\n" +
            "                    <li><a rel=\"nofollow\" href=\"register.html\" target=\"_blank\">注册</a></li>\n" +
            "                    <li><a onclick=\"tuniuRecorder.push('1_1_1_1_1_3');\" rel=\"nofollow\"\n" +
            "                           href=\"http://www.tuniu.com/szt/newmembergift/?recId=1&amp;q=a5\" target=\"_blank\"><img\n" +
            "                            src=\"images/homepage_image/registgift.gif\" alt=\"会员注册有礼\"\n" +
            "                            style=\"height: 22px;line-height: 22px; vertical-align: middle;\"></a></li>";
        if (data != "" && data != null && data != "null") {
            $('#user_login_infos div').html(vip)
        } else {
            $('#user_login_infos div').html(notvip)
        }
    })
}

function mouseen() {
}

function initBanner() {
    $.getJSON("controller/QueryBanner.do", {}, function (data) {
        var str = "";
        $(data).each(function (i) {
            str += "<li class=\"current\" style=\"display: block;\">" +
                "<a href='" + data[i].i_href +
                "' data-link=\"" + data[i].i_href +
                "\" rel=\"nofollow\" " +
                "style=\"background:url(" + data[i].iImage + ") center top no-repeat\"" +
                "data-promote=\"1\"></a>" +
                "</li>"
        })
        $('.activity_images').append(str)
    })
}

function init_shoip() {
    $.getJSON("controller/QueryB.do", {}, function (data) {
        var _str = "";
        $(data).each(function (i) {
            _str+="<li class=\"pro_item\">\n" +
            " <div class=\"pro_pic\">\n" +
            "     <!-- WEBS-6935 首页楼层 -->\n" +
            "     <!--产品星级-->\n" +
            "     <div class=\"product-star\" style=\"width: 56px;\">\n" +
            "         <span class=\"lev-star\" style=\"width: 48px;\"></span>\n" +
            "     </div>\n" +
            "     <!--end产品星级-->\n" +
            "     <!--标签开始-->\n" +
            "     <div class=\"flag_icon\">\n" +
            "         <i class=\"flag_niuzhuan\"></i>\n" +
            "     </div>\n" +
            "     <!--标签结束-->\n" +
            "     <a rel=\"nofollow\" href=\"tour.html?id="+data[i].bId+"\" target=\"_blank\"\n" +
            "        onclick=\"_gaq.push(['_trackEvent','首页_bj','点击','楼层1-当季热玩_产品区块_1-出境短线_1-图片-<日本大阪-京都-奈良-东京-富士山-镰仓机票+地接8晚9日半自助游>途牛自营/环球经典，20人纯玩团，东阪各1天自由，1晚露天温泉1晚京都，新干线，含Wifi_']);\">\n" +
            "<img src=\"" + data[i].b_Banimg + "\">\n" +
            "</a>\n" +
            "<!--图片内内容-->\n" +
            "<div class=\"pro_mess_bg\"></div>\n" +
            "<div class=\"pro_mess\">\n" +
            "<a rel=\"nofollow\" href=\"tour.html?id=2\"\n" +
            "target=\"_blank\"\n" +
            "onclick=\"_gaq.push(['_trackEvent','首页_bj','点击','楼层1-当季热玩_产品区块_1-出境短线_1-文字链-<span><日本大阪-京都-奈良-东京-富士山-镰仓机票+地接8晚9日半自助游></span>途牛自营/环球经典，20人纯玩团，东阪各1天自由，1晚露天温泉1晚京都，新干线，含Wifi_']);\">\n" +
            "<span>" + data[i].bTitile + "</span>" +
            "</a>\n" +
            "</div>\n" +
            " </div>\n" +
            " <!--楼层产品信息开始-->\n" +
            "<a href=\"http://www.tuniu.com/tour/210646222\" target=\"_blank\">\n" +
            "<div class=\"pro_infor clearfix\">\n" +
            "<span class=\"price\"><em>" + data[i].bPrice + "</em><i>起</i></span>\n" +
            "<span class=\"satisfaction\">满意度 99%</span>\n" +
            "</div>\n" +
            "</a>\n" +
            "<!--楼层产品信息结束-->" +
            "</li>";
        })
        $('#djrw').html(_str);
    })
}