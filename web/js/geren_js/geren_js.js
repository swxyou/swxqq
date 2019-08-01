$(document).ready(function () {
    selectSession();
    setTimeout('init()', 200);
})

function init() {
    if (usesName != "") {
        $.getJSON("Servlet", {"opr": "QueryUsers", "user_id": usesName}, function (data) {
            $(data).each(function (i) {
                $('#user-name a').html(data[i].user_id);
                f(data[i].user_id);
            })
        });

        function f(_u) {
            $.getJSON("Servlet", {"opr": "QueryOrder", "userId": _u}, function (data) {
                var _str = "";
                $(data).each(function (i) {
                        _str += "<li>" +
                            "<div class=\"item-desc\">" +
                            "<img src=\"images/geren_img/dingdan/shu.png\" alt=\"\">" +
                            "<div>" +
                            "<a href=\"\" target=\"_blank\">" +
                            "<p class=\"main-title\"" +
                            "title=\"<英比德法瑞意16日游>自营 全含，铁力士，水晶博物馆，欧洲之星 金色山口，比斯特购物村，新天鹅堡，双宫双游船 2顿特色餐\">" + data[i].b_title +
                            "</a>" +
                            "<p c lass=\"sub-title\">" +
                            data[i].star_time + " 1人" +
                            "</p>" +
                            "</div>" +
                            "</div>" +
                            "<div class=\"item-price\">" +
                            "￥" + data[i].money +
                            "</div>" +
                            "<div class=\"item-statue\">"
                        if (data[i].pay == 0) {
                            _str += "<p>待签约付款</p>"
                        } else if (data[i].pay == 1) {
                            _str += "<p>已签约付款</p>"
                        }
                        _str +=
                            "<!-- <p>\n" +
                            "<img src=\"//m.tuniucdn.com/fb2/t1/G2/M00/B6/C4/Cii-TFkdVVaIR_ZzAAADvx9MYK8AAJ44gP__CkAAAPX089.png\" alt=\"\">\n" +
                            "<span class=\"time\">09:48</span>\n" +
                            "</p> -->" +
                            "<p>" +
                            "<a target=\"_blank\" class=\"statue-link\"" +
                            "href=\"dingdan_xiangxi.html\">订单详情</a>" +
                            "</p>" +
                            "</div>" +
                            "<div class=\"item-operate\">"
                        if (data[i].pay == 0) {
                            _str += "<a href=\"\"class=\"btn \">去付款</a>"
                        } else if (data[i].pay == 1) {
                            _str += "<a href=\"\"class=\"btn \">查看</a>"
                        }
                        _str += "</div>" +
                            "</li>";
                })
                $('#order-all div[class=order-list] ul').html(_str);
            })
        }
    }
}