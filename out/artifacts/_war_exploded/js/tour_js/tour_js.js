var id = 0;
var uname;
$(document).ready(function () {
    uname = selectSession();

    setTimeout("Intercept()", 1000);

    $('#buy').click(function () {
        if (uname == "") {
            alert("请先登录!")
            window.location.href = "Login.html";
        } else {
            buy();
        }
    })
})

function init() {
    if (id != 0) {
        var buysImage = {
            "bId": id
        }
        // 获取图片
        $.getJSON("controller/QueryImage.do", buysImage, function (data) {
            $(data).each(function (i) {
                $('.gallery-display-box li:eq(' + i + ') img').attr("src", data[i].bImg)
                $('.gallery-nav-list li:eq(' + i + ') img').attr("src", data[i].b_smallimg)
            })
        })

        var buys = {
            "bId": id
        }
        // 获取字段
        $.getJSON("controller/QueryList.do", buys, function (data) {
            $('.resource-title strong').html(data[0].bTitile);
            $('.price-number').html(data[0].bPrice);
            $('.detail-feature-photo-item-inner img').attr("src", data[0].b_bgimg)
        })
    }
}

function Intercept() {
    var url = location.search;
    var Request = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1)　//去掉?号
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    id = Request["id"];
    uname = $('#unames').html();
    init();
}

function buy() {
    var money = $(".price-number").html();
    var title = $('h1[class=resource-title] strong').html();
    var city = $('div[class=resource-city-more-selected]').html();
    var ceshi = $('input[name="number-select"]')
    var Adultnum = ceshi[0].value;
    var Childnum = ceshi[1].value;
    var startime = $('.resource-date-selected').text();

    // var startime = encodeURI($('.resource-date-selected').text());

    window.location.href = "Settlement.html?id=" + id + "&uname=" + uname + "&Adultnum=" + Adultnum + "&Childnum=" + Childnum + "&city=" + city + "&startime=" + startime
    //+"&money="+money+"&title="+title+"&city="+city+"&Adultnum="+Adultnum+"&Childnum="+Childnum;
}