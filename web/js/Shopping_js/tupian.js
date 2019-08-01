$(document).ready(function () {
    selectSession();
    $.getJSON("Servlet", {"opr": "init","bh_type":1}, function (data) {
        $(data).each(function (i) {
            $('#rslides li:eq('+i+') a').css('background-image', "url("+data[i].bh_img+")");
        })
    });
    $.getJSON("Servlet",{"opr":"init","bh_type":2},function (data) {
        $(data).each(function (i) {
            $(".hot-recommend img:eq("+i+")").attr("src",data[i].bh_img);
        })
    })
    $.getJSON("Servlet",{"opr":"init","bh_type":3},function (data) {
        $(data).each(function (i) {
            $(".pic-ctn img:eq("+i+")").attr("src",data[i].bh_img);
        })
    })

    $.getJSON("Servlet",{"opr":"init","bh_type":4},function (data) {
        $(data).each(function (i) {
            $(".category-floor-pic img:eq("+i+")").attr("src",data[i].bh_img);
        })
    })
})
