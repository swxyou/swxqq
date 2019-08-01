$(function () {
    var checkDelay, oldValue;
    //填写默认的用户名
    var cookieArr = document.cookie.split(";");
    var defaultUsername = "";
    var oldUsername = "";
    var oldEmail = "";
    var checkTimeout;

    var errType = $("[name='errorType']").val();
    var errorMsg = $("[name='errorMsg']").val();
    var identifyFlag = false,
        usernameFlag = false,
        emailFlag = false,
        identifyCodeFlag = false;
    var findKind = 'tel'; // 'tel' 电话验证, 'email' 邮箱验证
    for (var i = 0; i < cookieArr.length; i++) {
        if (cookieArr[i].match("login_user_name")) {
            defaultUsername = cookieArr[i].split("=")[1];
        }
    }

    // 国际区号 下拉框
    function getCountryCode() {
        $.get('/ajax/countryCode', function (data) {
            $('.zones_tabcont').html(data);
            $(".li_cont").click(function () {
                $('.J_zoneHid').val($(this).attr('data-zone'));
                checkTel();
            });
        });
    }

    var zone = new window.zonesGroup();
    zone.init({
        'input_zone': $('.J_zoneHid'),
        'div_zoneVal': $('.J_zoneVal'),
        'div_zones': $('.J_Zones'),
        'ul_title': $('.J_zonesTitle'),
        'div_tabcont': $('.J_zonesTabcont')
    });


    function showDialog(msg) {
        $.layer({
            title: 0,
            closeBtn: 0,
            time: 3,
            shadeClose: true,
            dialog: {
                type: 1,
                msg: msg
            },
            offset: ['90px', '']
        });
    }

    //检查手机号是否注册
    function checkTel() {
        // var telValue = $("#username").val();
        // var intlCode = $('.J_zoneHid').val();
        // console.log(intlCode);
        // if ((intlCode == '0086' && new RegExp(/^1\d{10}$/).test(telValue))
        //     || (intlCode != '0086' && new RegExp("^[0-9]{5,11}$").test(telValue))) {
        //     var url = "/register/isPhoneAvailable";
        //     $("#tel-tip").show().html("检查中...");
        //     $("#tel-tip").addClass("err");
        //     $.ajax({
        //         url: url,
        //         data: {
        //             intlCode: intlCode,
        //             tel: telValue
        //         },
        //         type: 'post',
        //         success: function (json) {
        //             try {
        //                 var json = eval("(" + json + ")");
        //             } catch (e) {
        //                 $("#tel-tip").html("检测失败。");
        //                 $("#tel-tip").addClass("err");
        //             }
        //             if (json.errno == "-20") {
        //                 $("#tel-tip").addClass("err");
        //                 $("#tel-tip").show().html("服务器遛弯鸟，请稍后再试");
        //                 usernameFlag = false;
        //             } else if (!json.success) {
        //                 $("#tel-tip").removeClass("err");
        //                 $("#tel-tip").hide().html("");
        //                 usernameFlag = true;
        //             } else {
        //                 $("#tel-tip").addClass("err");
        //                 $("#tel-tip").show().html("该用户未注册，不能找回密码。您可以<a class='green' href='/register/phone'>立即注册</a>");
        //                 usernameFlag = false;
        //             }
        //         }
        //     });
        // } else if (telValue) {
            // usernameFlag = false;
            // $("#tel-tip").addClass("err");
            // $("#tel-tip").show().html("手机号不正确，请输入正确手机号码");
        // } else {
        //     usernameFlag = false;
            // $("#tel-tip").removeClass("err");
            // $("#tel-tip").hide().html("");
        // }
    }


    // 手机/邮箱 radio 点击事件
    $("[name=findkind]").change(function () {
        if ($(this).val() == 'telFind') {
            $('.li_zones').show();
            $('.li_username').show();
            $('.li_telyzm').show();
            $('.li_email').hide();
            $('#info_submit').val('下一步');
            findKind = 'tel';
        } else {
            $('.li_zones').hide();
            $('.li_username').hide();
            $('.li_telyzm').hide();
            $('.li_email').show();
            $('#info_submit').val('发送验证邮箱');
            findKind = 'email';
        }
    });

    var identifyCodeFlag, codeFlag, oldValue = [], changeCode = false;
    $(".get-code").bind("click", sendCode);

    if (defaultUsername) {
        $("[name='username']").val(decodeURIComponent(defaultUsername)).trigger("input");
    }

    $(".input-list input:text").on("keyup", function (e, blur) {
        var value = this.value;
        // 手机号码验证
        if (this.name == 'username' && identifyCodeFlag) {
            // oldUsername = value;
            // var self = this;
            // if (checkTimeout) {
            // 	clearTimeout(checkTimeout);
            // }
            // checkTimeout = setTimeout(function(){
            // 	checkTel();
            // }, 300);
            if (changeCode) {
                $('#identify').val('');
                $("#identify_img").attr('src', '');
                $("#identify_img").attr('src', "//passport.tuniu.com/ajax/captcha/v/" + (new Date().getTime() + Math.random()));
                changeCode = !changeCode;
            }
        } else if (this.name == 'email') {
            oldEmail = value;
            var self = this;
            if (checkTimeout) {
                clearTimeout(checkTimeout);
            }
            checkTimeout = setTimeout(function () {
                if (value && new RegExp(/(?=^.{5,255}$)(^([\w\!\#\$\%\&\'\*\+\-\.\/\?\^\_\`\{\|\}\~]+)@([a-zA-Z0-9\-]+\.)+([a-zA-Z0-9\-]+)$)/).test(value)) {
                    usernameFlag = false;
                    var url = "/register/isEmailAvailable";
                    $("#email-tip").addClass("err");
                    $("#email-tip").show().html("检查中...");
                    $.ajax({
                        url: url,
                        data: {
                            email: value
                        },
                        type: 'post',
                        success: function (json) {
                            try {
                                var json = eval("(" + json + ")");
                            } catch (e) {
                                $("#email-tip").addClass("err");
                                $("#email-tip").show().html("检查失败。");
                            }
                            if (json.errno == "-20") {
                                $("#email-tip").addClass("err");
                                $("#email-tip").show().html("服务器遛弯鸟，请稍后再试");
                                usernameFlag = false;
                            } else if (!json.success) {
                                $("#email-tip").removeClass("err");
                                $("#email-tip").hide().html("");
                                usernameFlag = true;
                                emailFlag = true;
                            } else {
                                $("#email-tip").addClass("err");
                                $("#email-tip").show().html("该用户未注册，不能找回密码。您可以<a class='green' href='/register/phone'>立即注册</a>");
                                usernameFlag = false;
                            }
                        }
                    });
                } else {
                    emailFlag = false;
                    $("#email-tip").addClass("err");
                    $("#email-tip").show().html("邮箱不正确，请输入正确邮件");
                }
            }, 300);
        }
        // 验证码
        if (this.name == "identify") {
            if (blur != 'blur' && oldValue['identify'] && oldValue['identify'] == value) {
                return;
            }
            identifyCodeFlag = false;
            oldValue["identify"] = value;
            if (!value || value.length < 4 || new RegExp("^([0-9a-zA-Z])+$").test(value) == false) {
                $("#codeTip1").addClass("err");
                $("#code_err").show().html("请输入正确的验证码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                return false;
            } else if (!identifyCodeFlag && value.length == 4) {
                $.ajax({
                    url: "/ajax/checkCaptcha?identify_code=" + value,
                    type: "GET",
                    success: function (json) {
                        try {
                            var json = eval("(" + json + ")");
                        } catch (e) {
                            $("#codeTip1").addClass("err");
                            $("#code_err").show().html("请输入正确的验证码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                        }
                        if (!json.success) {
                            identifyCodeFlag = false;
                            //$(ele).focus();
                            $("#codeTip1").addClass("err");
                            $("#code_err").show().html("请输入正确的验证码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                        } else {
                            $("#codeTip1").removeClass("err");
                            $("#code_err").hide().html("");
                            identifyCodeFlag = true;
                            changeCode = true;
                            checkTel();
                        }
                    }
                });
            }
            // 手机验证码
        } else if (this.id == "code") {
            if (blur != 'blur' && oldValue['code'] && oldValue['code'] == value) {
                return;
            }
            codeFlag = false;
            oldValue['code'] = value
            if (!value || value.length < 6 || new RegExp("^([0-9])+$").test(value) == false) {
                $("#codeTip").addClass("err").show();
                $("#codeTip span").html("请输入正确的动态密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                codeFlag = false;
            } else if (value.length == 6) {
                $("#codeTip").removeClass("err").hide();
                $("#codeTip span").html("");
                codeFlag = true;
            }
        }
    });

    //手机发送动态码
    function sendCode() {
        // 暂时关闭发送动态密码前的验证码校验
        if (identifyCodeFlag) {
            $(".get-code,.send-code-again").attr("disabled", true);
            $(".get-code,.send-code-again").unbind("click");
            var postData = {
                intlCode: $('.J_zoneHid').val(),
                tel: $("[name='username']").val(),
                identify_code: $("[name='identify']").val(),
                is_login: 1
            }
            if (window.location.href.match("bind/weixin")) {
                postData.is_login = 0;
            }
            $.post('/ajax/sendMobileCode', postData, function (json) {
                try {
                    var json = eval("(" + json + ")");
                } catch (e) {
                    showDialog('动态口令发送失败，请稍候重试。');
                    return;
                }
                if (json.success) {
                    showDialog("动态口令已发送，15分钟内有效！");
                    $(".get-code,.send-code-again").hide();
                    intervalTime(60);
                } else {
                    $(".get-code,.send-code-again").removeAttr("disabled");
                    $(".get-code,.send-code-again").bind("click", sendCode);
                    switch (json.errno) {
                        case -1:
                            showDialog("手机号未注册");
                            return;
                            break;
                        case -2:
                            $("[name='identify']").focus();
                            $("#captcha").show();
                            showDialog("请输入正确的验证码");
                            document.getElementById("identify_img").src = "";
                            document.getElementById("identify_img").src = "/ajax/captcha/v/" + (new Date().getTime() + Math.random());
                            return;
                            break;
                        case -3:
                            showDialog("动态口令发送失败，请稍候重试。");
                            return;
                            break;
                        default:
                            showDialog(json.errmsg);
                            return;
                            break;
                    }
                }
            });
        } else {
            $("#identify").trigger("input");
        }
    }

    //end

    function intervalTime(num) {
        var num = parseInt(num);
        var i = 0;
        $(".send-code").css("display", "inline-block");
        $(".send-code span").text(num);
        var inter = setInterval(function () {
            if (i < num) {
                i++;
                $('.send-code span').text(num - i);
            } else {
                clearInterval(inter);
                $(".send-code-again").css("display", "inline-block").bind("click", sendCode).removeAttr("disabled");
                $(".send-code").hide();
                $(".send-code span").text(0);
            }
        }, 1000);
    }

    $("#info_submit").on("click", function () {
        switch (findKind) {
            case 'tel':
                if (identifyCodeFlag && codeFlag && usernameFlag) {
                    $.ajax({
                        type: "POST",
                        data: {
                            intlCode: $('.J_zoneHid').val(),
                            tel: $("[name='username']").val(),
                            identifyCode: $("[name='identify']").val(),
                            verifyCode: $("#code").val()
                        },
                        url: "/forget/verTel",
                        success: function (json) {
                            try {
                                var json = eval("(" + json + ")");
                            } catch (e) {
                                showDialog('请检查填写的信息');
                            }
                            if (!json.success) {
                                document.getElementById("identify_img").src = "";
                                document.getElementById("identify_img").src = "/ajax/captcha/v/" + (new Date().getTime() + Math.random());
                                $("[name='identify']").val("");
                                $("#code").val("");
                                showDialog(json.errmsg);
                            } else {
                                window.location.href = "/forget/pSetPassword";
                            }
                        }
                    });
                } else {
                    $(".input-list input:text").each(function (i, item) {
                        $(item).trigger("input");
                    });
                }
                break;
            case 'email':
                if (identifyCodeFlag && emailFlag) {
                    var postData = {
                        'email': $("[name='email']").val(),
                        'identifyCode': $("[name='identify']").val(),
                        'pc': 1
                    };
                    $.ajax({
                        url: '/forget/sendEmail',
                        data: postData,
                        type: "POST",
                        async: false,
                        success: function (json) {
                            try {
                                var json = eval("(" + json + ")");
                            } catch (e) {
                                showDialog("邮件发送失败，请稍候重试。", 2);
                                return;
                            }
                            if (json.success) {
                                showDialog("邮件已发送，请登录邮箱验证");
                                setTimeout(function () {
                                    window.location.href = "/forget/getByEmailSend";
                                }, 2000);
                            } else {
                                showDialog(json.errmsg);
                            }
                        }
                    });
                } else {
                    $(".input-list input:text").each(function (i, item) {
                        $(item).trigger("input");
                    });
                }
                break;
            default:
                break;
        }
    });
    getCountryCode();
    checkTel();
});