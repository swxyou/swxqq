var findKind = 'tel'; // 'tel' 电话验证, 'email' 邮箱验证
var phone;
var yzm;
var xym;
var pwd;
var pwd_tid;
var jymtrue;
var pwdflag = false;
var pwd_tidFlag = false;
$(document).ready(function () {
    init();//调用初始化函数

    //下一步按钮单击事件
    $('#info_submit').click(function () {
        var pwd = $('#pwd').val();
        var pwd_tid = $('#pwd_tid').val();
        if (pwd == "" && pwd_tid == "") {
            $('ul[class="input-list"] li').hide(3)
            $('ul[class="input-list"] li[class=hidexs]').show(3)
            $('#info_submit').attr("disabled", "disabled");
        } else {
            $.post("Servlet", {"opr": "updatePwd", "phone": phone, "pwd": pwd}, function (data) {
                if (data == 0) {
                    alert("修改密码失败！")
                } else {
                    layerMsg("修改密码成功!")
                    setTimeout(function () {//两秒后跳转
                        window.location.href = "Index.html"
                    }, 2000);
                }
            })
        }
    })

    $("#yzmbutten").click(function () {
        if (phone != "" && phone != null) {
            $.post("Servlet", {"opr": "dxObtain", "phone": phone}, function (data) {
                jymtrue = data;
            })
        } else {
            $("#tel-tip").addClass("err");
            $("#tel-tip").show().html("手机号不能为空");
        }
    })
})

//初始化函数
function init() {
    $('#info_submit').attr("disabled", "disabled");
    $('#username').on("keyup", keyups);
    $('#identify').on("keyup", keyups);
    $('#code').on("keyup", keyups);
    $('#pwd').val("")
    $('#pwd_tid').val("");
    $('#username').val("");
    $('#identify').val("");
    $('#code').val("");
    $("#pwd").on("keyup", keyups);
    $('#pwd_tid').on("keyup", keyups);
}

//初始化文本框状态开始
var phoneflag = false;
var yzmflag = false;
var xymflag = false;
//初始化文本框状态结束

//文本框值改变事件
function keyups() {
    phone = $('#username').val();
    yzm = $('#identify').val();
    xym = $('#code').val();
    pwd = $('#pwd').val();
    pwd_tid = $('#pwd_tid').val();

    //验证手机号开始
    if (phone != "") {
        if (phone.length == 11) {
            //Ajax判断手机号是否存在，若存在，提示可以重置。
            $.post("Servlet", {"opr": "phoneOnly", "phone": phone}, function (data) {
                if (data == 0) {
                    $("#tel-tip").addClass("err");
                    $("#tel-tip").show().html("该用户未注册，不能找回密码。您可以<a class='green' href='/register/phone'>立即注册</a>");
                    $('#yzmbutten').attr("disabled", "disabled");
                    phoneflag = false;
                } else {
                    $("#tel-tip").removeClass("err");
                    $("#tel-tip").show().html("此用户已注册，可找回密码");
                    $('#yzmbutten').removeAttr("disabled");
                    phoneflag = true;
                }
            })
        } else {
            $("#tel-tip").addClass("err");
            $("#tel-tip").show().html("手机号不正确，请输入正确手机号码");
            phoneflag = false;
        }
    }
    //验证手机号结束

    //验证验证码开始
    if (yzm != "") {
        if (yzm.length < 4 || new RegExp("^([0-9a-zA-Z])+$").test(yzm) == false) {
            $("#codeTip1").addClass("err");
            $("#code_err").show().html("请输入正确的验证码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
            yzmflag = false;
        } else {
            $("#codeTip1").removeClass("err");
            $("#code_err").hide().html("");
            yzmflag = true;
        }
    }
    //验证验证码结束

    //验证校验码开始
    if (xym != "") {
        if (xym.length < 6 || new RegExp("^([0-9])+$").test(xym) == false) {
            if (xym == jymtrue) {
                xymflag = true;
            } else {
                $("#codeTip").addClass("err").show();
                $("#codeTip span").html("请输入正确的动态密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                xymflag = false;
            }
        } else {
            $("#codeTip").removeClass("err").hide();
            $("#codeTip span").html("");
            xymflag = true;
        }
    } else {

    }
    //验证校验码结束

    //验证下一步开始
    if (phoneflag && yzmflag && xymflag) {
        $('#info_submit').removeAttr("disabled");
    } else {
        $('#info_submit').attr("disabled", "disabled");
    }
    //验证下一步结束

    //验证密码和确认密码开始
    if (pwd != "" && pwd.length < 6) {
        $(".hidexs span[id=pwds]").addClass("err").show();
        $(".hidexs span[id=pwds]").html("请输入正确的密码（密码长度最少6位以上）");
        pwdflag = false;
    } else {
        // $.post("Servlet", {"opr": "login", "name": phone, "pwd": pwd}, function (data) {
        //     if (data == 0) {
        //         $(".hidexs span[id=pwds]").addClass("err").show();
        //         $(".hidexs span[id=pwds]").html("原密码输入不正确!");
        //         pwdflag = false;
        //     } else {
        $(".hidexs span[id=pwds]").removeClass("err").hide();
        $(".hidexs span[id=pwds]").html("");
        pwdflag = true;
        //     }
        // })
    }
    if (pwd_tid != "") {
        if (pwd_tid.length < 6) {
            $(".hidexs span[id=pwd_tids]").addClass("err").show();
            $(".hidexs span[id=pwd_tids]").html("请输入正确的密码（密码长度最少6位以上）");
            pwd_tidFlag = false;
        } else if (pwd_tid != "" && pwd_tid != pwd) {
            $(".hidexs span[id=pwd_tids]").addClass("err").show();
            $(".hidexs span[id=pwd_tids]").html("两次输入的密码不一致");
            pwd_tidFlag = false;
        } else {
            $(".hidexs span[id=pwd_tids]").removeClass("err").hide();
            $(".hidexs span[id=pwd_tids]").html("");
            $(".hidexs span[id=pwd_tids]").removeAttr("disabled").removeClass("login_btn_gray");
            pwd_tidFlag = true;
        }
    } else {
        pwd_tidFlag = false;
    }
    //验证密码和确认密码结束
    if (pwd != "" && pwd_tid != "") {
        if (pwdflag && pwd_tidFlag) {
            $('#info_submit'), removeattr("disabled");
        } else {
            $('#info_submit').attr("disabled", "disabled");
        }
    }
}//翻页跳转
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