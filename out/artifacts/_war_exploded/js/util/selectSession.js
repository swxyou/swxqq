var usesName = '';

function selectSession() {
    $.get("Servlet", {"opr": "selectSession"}, function (data) {
        usesName = data;
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
            "<a href=\"https://i.tuniu.com/\">" +
            "<img id=\"user_head\" src=\"images/homepage_image/nav/g_touxiang.png\" width=\"75px\" height=\"75px\">" +
            "</a>" +
            "</div>" +
            "<div class=\"fl\">" +
            "<div class=\"vip_stage mt_10\">" +
            "<a style=\"color:#f60; font-weight:bold; font-size:16px;\" class=\"vip_lel vip_lel0\" href=\"http://www.tuniu.com/u/club\"></a>" +
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
        return usesName;
    })
}

