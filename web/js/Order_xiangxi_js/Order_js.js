$(document).ready(function () {
    selectSession();
    setTimeout('Order_init()', 200);
})

function Order_init() {
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
                    _str += "<div class=\"order-item\">\n" +
                        "                    <div class=\"item-header\">\n" +
                        "                        <span class=\"item-time\">下单时间：2018-11-16 15:51:33</span>\n" +
                        "                        <span class=\"order-id\">订单号：" + data[i].oId + "</s    pan>\n" +
                        "                    </div>\n" +
                        "                    <div class=\"item-detail\" style=\"border:none;\">\n" +
                        "                        <div class=\"item-desc\">\n" +
                        "<img class=\"item-icon\" src=\"https://m.tuniucdn.com/fb2/t1/G1/M00/CC/7E/Cii-U1jltxuIM8EYAAAJI0AcjEEAAJWvAP_9r8AAAlB553.png\" alt=\"\">\n" +
                        "                            <p title=\"\">\n" +
                        "\n" +
                        "                                <a href=\"http://www.tuniu.com/tour/210135324\" target=\"_blank\">\n" +
                        "\n" +
                        "                                    <span>" + data[i].b_title + "</span>\n" +
                        "\n" +
                        "                                </a>\n" +
                        "\n" +
                        "\n" +
                        "                            </p>\n" +
                        "                        </div>\n" +
                        "                        <div class=\"item-kind\">旅游</div>\n" +
                        "                        <div class=\"item-mount\">1人</div>\n" +
                        "                        <div class=\"item-time\">\n" +
                        "                            <p>" + data[i].star_time + "</p>\n" +
                        "\n" +
                        "                        </div>\n" +
                        "                        <div class=\"item-price\">\n" +
                        "\n" +
                        "                            ￥" + data[i].money + "\n" +
                        "\n" +
                        "                        </div>\n" +
                        "                        <div class=\"item-statue\">\n"
                    if (data[i].pay == 0) {
                        _str += "<p>待签约付款</p>"
                    } else if (data[i].pay == 1) {
                        _str += "<p>已签约付款</p>"
                    }
                    _str += "                            <p>\n" +
                        "                                <img src=\"//m.tuniucdn.com/fb2/t1/G2/M00/B6/C4/Cii-TFkdVVaIR_ZzAAADvx9MYK8AAJ44gP__CkAAAPX089.png\" alt=\"\">\n" +
                        "                                <span>06:41</span>\n" +
                        "                            </p>\n" +
                        "\n" +
                        "\n" +
                        "                            <p>\n" +
                        "                                <a target=\"_blank\" href=\"http://www.tuniu.com/tn?r=user/user/neworderdetail&amp;id=1077999029\">订单详情</a>\n" +
                        "                            </p>\n" +
                        "\n" +
                        "\n" +
                        "                        </div>\n" +
                        "                        <div class=\"item-operate\">\n"
                    if (data[i].pay == 0) {
                        _str += "<a href=\"#\"class=\"btn \" onclick='gopay(" + data[i].oId + "," + data[i].money + ")'>去付款</a>"
                    } else if (data[i].pay == 1) {
                        _str += "<a href=\"\"class=\"btn \">查看</a>"
                    }
                    _str += "                        </div>\n" +
                        "                    </div>\n" +
                        "                </div>";
                })
                $('#order-item-list').html(_str);
            })
        }
    }
}

//根据id查询商品信息
function QueryBuysOne(bid, type) {
    $.getJSON("Servlet", {"opr": "Querybuys", "bId": bid}, function (datas) {
        return datas.bTitile;
    })
}

function gopay(oid, money) {
    window.location.href = "pay/alipay.trade.page.pay.jsp?oid=" + oid + "&money=" + money;
}