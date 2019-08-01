var phone;//手机号
var yzm;//验证码
var xym;//动态校验码
var pwd;//密码
var pwd_tid;//确认密码
var truexym;
var _i = 60;
$(document).ready(function () {
    $('#dtmbutten').click(function () {
        var intervalid;
        // $('#dtmbutten').hide();
        // $('#reclicl').show();
        intervalid = setInterval("fun()", 1000);
        if ($('#tel').val() != "") {
            $("#code").removeAttr("disabled");
            $("#tel-tip .input-tip-inner span").addClass('reg_mes mes_phone').html("");
            $("#tel-tip").removeClass("err");
            $.post('Servlet', {"opr": "dxObtain", "phone": phone}, function (data) {
                truexym = data;
            })
        } else {
            $("#tel-tip .input-tip-inner span").removeClass('reg_mes mes_phone').html("请输入正确的手机号");
            $("#tel-tip").addClass("err");
        }
    })

    function fun() {
        if (_i == 0) {
            $('#reclicl').hide();
            $('#refa').show();
            clearInterval(intervalid);
        }
        document.getElementById("time_").innerHTML = i + "后重新发送";
        _i--;
    }

    $("#info_submit").click(function () {
        if ($('#travel-info').is(':checked')) {
            $("#travel-info-tip").removeClass("err");
            $("#travel-info-tip span").html("");
            stepNext(1)
        } else {
            $("#travel-info-tip span").html("请同意并勾选用户协议");
            $("#travel-info-tip").addClass("err");
        }
    })

    //注册第二部的提交按钮
    $("#input_do_check_password").bind("click", function () {
        $.post("Servlet", {"opr": "register", "phone": phone, "pwd": pwd}, function (data) {
            if (data == 0) {
                layerMsg("注册失败，请检查您的信息填写是否正确。", 2);
            } else {
                layerMsg('恭喜成功注册，请至会员中心查看新会员专享出游大礼包。');
                stepNext(2);
            }
        })
    });
    //输入框绑定文本改变事件开始
    $('#tel').on("keyup", keyups);
    $('#identify').on("keyup", keyups);
    $('#code').on("keyup", keyups);
    $('#password').on("keyup", keyups);
    $('#passwordagain').on("keyup", keyups);
    //输入框绑定文本改变事件结束


})

function keyups() {
    phone = $('#tel').val();
    yzm = $('#identify').val();
    xym = $('#code').val();
    pwd = $('#password').val();
    pwd_tid = $('#passwordagain').val();
    //手机号验证开始
    if (phone != "" && new RegExp(/^1\d{10}$/).test(phone) == false) {
        $("#tel-tip .input-tip-inner span").removeClass('reg_mes mes_phone').html("请输入正确的手机号");
        $("#tel-tip").addClass("err");
    } else {
        $.post("Servlet", {"opr": "phoneOnly", "phone": phone}, function (data) {
            if (data == 0) {
                var msg = '<span>恭喜您，该手机可以注册。</span>';
                $("#tel-tip .input-tip-inner").html(msg);
                $("#tel-tip").addClass("err");
            } else {
                msg = $('<p>该手机号已存在,您可以</p><ul> <li>▪ 用此号码<a href="Login.html" style="color:#f9651a;">直接登录</a></li> <li>▪ 如忘记密码可用手机号<a href="PasswordReset.html" style="color:#f9651a;" onclick="document.cookie=\'login_user_name=' + phone + '\';" >找回密码</a></li> </ul>');
                $(".backForm", msg).click(function () {
                    var form = $('<form action="/register/PhoneBack" method="POST"></form>').appendTo('body');
                    $("<input type='hidden'>").attr("name", 'tel').attr("value", $("#tel").val()).appendTo(form);
                    $("<input type='hidden'>").attr("name", 'hid_invite_code').attr("value", $("#hid_invite_code").val()).appendTo(form);
                    $("<input type='hidden'>").attr("name", 'referer').attr("value", $("#referer").val()).appendTo(form);
                    form.submit();
                });
                $("#tel-tip .input-tip-inner").html(msg);
                $("#tel-tip").removeClass("err");
            }
        })

    }
    //手机号验证结束

    //验证码验证开始
    if (yzm != "" && (yzm.length < 4 || new RegExp("^([0-9a-zA-Z])+$").test(yzm) == false)) {
        $("#codeTip1").addClass("err");
        $("#code_err").show().html("请输入正确的验证码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
    } else {
        $("#codeTip1").removeClass("err");
        $("#code_err").hide().html("");
    }
    //验证码验证结束

    //校验码验证开始
    if (!xym == "" && (xym.length < 6 || new RegExp("^([0-9])+$").test(xym) == false || xym != truexym)) {
        $("#codeTip").addClass("err").show();
        $("#codeTip span").html("请输入正确的校验码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
    } else if (xym.length == 6) {
        $("#codeTip").removeClass("err").hide();
        $("#codeTip span").html("");
    }
    //校验码验证结束
    if (phone != "" && yzm != "" && xym != "") {
        if (xym != truexym) {
            $("#codeTip").addClass("err").show();
            $("#codeTip span").html("请输入正确的校验码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
            $("#info_submit").attr("disabled", "disabled").addClass("login_btn_gray");
        } else {
            $("#codeTip").removeClass("err").hide();
            $("#codeTip span").html("");
            $("#info_submit").removeAttr("disabled").removeClass("login_btn_gray");
        }
    } else {
        $("#info_submit").attr("disabled", "disabled").addClass("login_btn_gray");
    }
    //密码确认开始
    if (pwd != "" && pwd.length < 6) {
        $('#password-state').hide();
        $("#password-tip").addClass("err").show();
        $("#password-tip span").html("请输入正确的密码（密码长度最少6位以上）");
    } else {
        $("#password-tip").removeClass("err").hide();
        $("#password-tip span").html("");
    }
    if (pwd_tid != "" && pwd_tid.length < 6) {
        $("#passwordagain-tip").addClass("err").show();
        $("#passwordagain-tip span").html("请输入正确的密码（密码长度最少6位以上）");
    } else if (pwd_tid != pwd) {
        $("#passwordagain-tip").addClass("err").show();
        $("#passwordagain-tip span").html("两次输入的密码不一致");
    } else {
        $("#passwordagain-tip").removeClass("err").hide();
        $("#passwordagain-tip span").html("");
        $("#input_do_check_password").removeAttr("disabled").removeClass("login_btn_gray");
    }
    //密码确认结束
}

// 可能是翻页
function stepNext(i) {
    $(".main_item:eq(" + i + ")").css({
        "visibility": "visible"
    });
    $("#click_num").val(i);
    $("#mainPart").animate({
        left: -i * $("#user-reg").width() + "px"
    }, 500, "swing", function () {
        $(".main_item:eq(0)").css("visibility", "hidden");
    });
    $("#input_do_check_password").attr("disabled", "disabled").addClass("login_btn_gray");
}

//翻页跳转
function layerMsg(msg, type) {
    $.layer({
        title: 0,
        closeBtn: 0,
        time: 3,
        shadeClose: true,
        dialog: {
            type: type || 1,
            msg: "&nbsp;&nbsp;&nbsp;&nbsp;" + msg
        },
        offset: ['90px', '']
    });
}