(function (window, $) {
    var cookieArr = document.cookie.split(";");
    var defaultUsername = "";
    var tmplogin = false;
    for (var i = 0; i < cookieArr.length; i++) {
        if (cookieArr[i].match("login_user_name")) {
            defaultUsername = cookieArr[i].split("=")[1];
        } else if (cookieArr[i].match("tuniu_login_type")) {
            tmplogin = true
        }
    }
    if (defaultUsername) {
        $("[name='username']").val(decodeURIComponent(defaultUsername));
    }
    var normalForm = $("#login-tab-content0"), telForm = $("#login-tab-content1"), cardForm = $("#loginMemship"),
        normalContent = $("#login-content"), cardContent = $("#login-card-wrap"), identify_codeFlag = false,
        loginType = document.getElementById("errLoginType").value,
        loginMsg = document.getElementById("errLoginMsg").value;
    var accoutBox = $('#account-login');
    var qrBox = $('#qr-login');
    $('#login-tab li').on('click', function () {
        var id = $(this).attr('id');
        var siblings = $(this).siblings('li');
        if (id === 'login-tab-user') {
            if (accoutBox.is(':visible')) {
                return;
            }
            $(this).addClass('cur');
            siblings.removeClass('cur');
            accoutBox.show();
            qrBox.hide();
        } else {
            if (qrBox.is(':visible')) {
                return;
            }
            $(this).addClass('cur');
            siblings.removeClass('cur');
            accoutBox.hide();
            $('.qr-img').attr('src', '/ajax/qrcode?v=' + Date.parse(new Date()));
            $("#login_error3").html('').hide();
            qrBox.show();
            setTimeout(function () {
                re_btn_on();
            }, 60000);
        }
    });
    setInterval(function () {
        if (qrBox.is(":visible")) {
            $.get('/ajax/qrcodeLogin', function (json) {
                try {
                    var json = eval("(" + json + ")");
                } catch (e) {
                    return;
                }
                if (json.success) {
                    window.location.href = '/login';
                } else {
                    if (json.errno == -4) {
                        $("#login_error3").html(json.errmsg).show();
                        // setTimeout(function () {
                        //     $("#login_error3").html('').hide();
                        // }, 5000)
                    }
                }
            });
        }
    }, 1500);

    function re_btn_on() {
        $('.re_btn').removeClass('hidden');
        $('.qr-img').addClass('qr-opcity');
    }

    function re_btn_off() {
        $('.re_btn').addClass('hidden');
        $('.qr-img').removeClass('qr-opcity');
    }

    $('.re_btn').on('click', function () {
        $('.qr-img').attr('src', '/ajax/qrcode?v=' + Date.parse(new Date()));
        re_btn_off();
        setTimeout(function () {
            re_btn_on();
        }, 60000);
    })
    $('#goDynamic').on('click', function () {
        identify_codeFlag = false;
        $(".login_error").html('').hide();
        $('#normal_tel').val("");
        $('#pwd').val("");
        telForm.show();
        defaultFocus(telForm);
        change_identify_code();
        normalForm.hide();
        needCaptcha(document.getElementById("telNum"));
    });
    $('#goAccount').on('click', function () {
        identify_codeFlag = false;
        $('#telNum').val("");
        $(".login_error").html('').hide();
        normalForm.show();
        change_identify_code();
        defaultFocus(normalForm);
        telForm.hide();
    });
    $(".partner-card").on("click", function () {
        $(".login_error").html('').hide();
        normalContent.hide();
        cardContent.show();
        change_identify_code();
        defaultFocus(cardContent);
        identify_codeFlag = false;
    });
    $("#cardToAccont").on("click", function () {
        cardContent.hide();
        normalContent.show();
        change_identify_code();
        defaultFocus(normalContent);
        identify_codeFlag = false;
    });
    $("#normal_tel").on("keyup", function () {
        if (this.value == '13951638125' || this.value == '13062527078' || this.value == '17721561027') {
            change_identify_code_test();
        }
    });

    function change_identify_code_test() {
        $(".loadingImg").css("display", "");
        $('.identify_img').hide().attr('src', '/ajax/captcha/v/' + (new Date().getTime() + Math.random()) + '?test=1');
    }

    var tab1 = new window.zonesGroup();
    tab1.init({
        'input_zone': $('.J_zoneHid'),
        'div_zoneVal': $('.J_zoneVal'),
        'div_zones': $('.J_Zones'),
        'ul_title': $('.J_zonesTitle'),
        'div_tabcont': $('.J_zonesTabcont'),
        'limit_size': 8
    });
    var tab2 = new window.zonesGroup();
    tab2.init({
        'input_zone': $('.J_zoneHid_2'),
        'div_zoneVal': $('.J_zoneVal_2'),
        'div_zones': $('.J_Zones_2'),
        'ul_title': $('.J_zonesTitle_2'),
        'div_tabcont': $('.J_zonesTabcont_2'),
        'limit_size': 8
    });
    var flag = false;
    var _type = $('#nor_login_type').val().substr(0, 1);
    $('a.aChangeBorder').on('click', function () {
        flag = !flag;
        if (flag) {
            $(this).text('普通登录');
            $(this).siblings().attr('placeholder', "手机号码");
            $(this).siblings().attr('maxlength', "11");
            $('#nor_login_type').val(_type + '-I');
            $('.J_input_left').show();
            $('.J_input_right').addClass('input_div_right');
        } else {
            $(this).text('国际手机登录');
            $(this).siblings().attr('placeholder', "手机号/会员名/昵称/邮箱");
            $(this).siblings().attr('maxlength', "");
            $('#nor_login_type').val(_type = '-N');
            $('.J_input_left').hide();
            $('.J_input_right').removeClass('input_div_right');
        }
    })
    if (loginType && loginMsg) {
        switch (loginType) {
            case"P-N":
            case"F-N":
                $(".login_error", normalForm).text(loginMsg).show();
                break;
            case"P-I":
            case"F-I":
                $('a.aChangeBorder').trigger("click");
                $(".login_error", normalForm).text(loginMsg).show();
                break;
            case"P-M":
            case"F-M":
                $("#goDynamic").trigger("click");
                $(".login_error", telForm).text(loginMsg).show();
                break;
            case"P-C":
                $(".partner-card").trigger("click");
                $(".login_error", cardForm).text(loginMsg).show();
                break;
            default:
                break;
        }
    }
    if (tmplogin) {
        $("#goDynamic").trigger("click");
    }
    var originalValue = '';
    $("form input").focus(function () {
        $(this).parents('tr').addClass('hover').removeClass("err");
    }).blur(function () {
        $(this).parents('tr').removeClass('hover');
    }).on('input', function () {
        if (this.value == originalValue) {
            return;
        }
        originalValue = this.value;
        checkData(this);
        if (this.id == "telNum" && this.value) {
            needCaptcha(this);
        }
    });
    // $("[name='submit_login']").on("click", function () {
    //     var form = $(this).parents("form");
    //     var flag = checkData($("input", form), 'noNull');
    //     if (flag && !$("[name='identify_code']", form).is(":visible") || identify_codeFlag) {
    //         if (!(form.find('[name=login_type]').val() == 'P-M' || form.find('[name=login_type]').val() == 'F-M')) {
    //             _password = form.find('[name=password]');
    //             _password.val(hex_md5(_password.val()));
    //         }
    //         form[0].submit();
    //     }
    // });

    function needCaptcha(ele) {
        var flag = checkData(ele);
        intlCode = $(ele).parents('.login-table').find('.J_zoneHid').val();
        if ((intlCode == '0086' && new RegExp("^((166|199|13[0-9])|(15[0-9])|(18[0-9])|14[0-9]|17[0-9])[0-9]{8,8}$").test(ele.value)) || (intlCode != '0086' && new RegExp("^[0-9]{5,11}$").test(ele.value))) {
            $.get("/ajax/isCaptchaRequired?tel=" + (intlCode + ele.value), function (json) {
                try {
                    var json = eval("(" + json + ")");
                } catch (e) {
                    $('.login_error', $(element).parents('table')).text("验证码错误").show();
                }
                if (json.success) {
                    change_identify_code();
                    $("#line_9").show();
                } else {
                    $("#line_9").hide();
                }
            });
        }
    }

    function checkData(ele, noNull) {
        var text = "";
        var returnflag = true;
        $(".login_error").html('').hide();
        if (!ele.length) {
            $(ele).parents('tr').removeClass("err");
            text = errorText(ele, noNull);
            if (text) {
                $('.login_error', $(ele).parents('table')).text(text).show();
                $(ele).parents("tr").addClass("err");
                return false;
            }
        } else {
            $(ele).parents('table').find("tr.err").removeClass("err");
            $.each(ele, function (i, item) {
                text = errorText(item, noNull);
                if (text) {
                    $(item).trigger("focus");
                    $(item).parents("tr").addClass("err");
                    $('.login_error', $(item).parents('table')).text(text).show();
                    returnflag = false;
                    return false;
                }
            });
        }
        return returnflag;
    }

    function errorText(element, noNull) {
        if (!element.value && !noNull) {
            return '';
        }
        if ((noNull === 'noNull' && !element.value) || element.value.length > 32) {
            switch (element.name) {
                case"username":
                    return "请输入正确的" + element.placeholder;
                    break;
                case"password":
                    if ($(element).hasClass('tel')) {
                        return "请输入正确的动态密码";
                    } else {
                        return "请输入正确的密码";
                    }
                    break;
                case"identify_code":
                    if (!element.value && $(element).is(":visible")) {
                        return "请输入正确的验证码";
                    }
                    break;
                default:
                    return "";
                    break;
            }
        } else if (element.id == "telNum") {
            intlCode = $(element).parents('.login-table').find('.J_zoneHid').val();
            if (intlCode == '0086') {
                if (new RegExp("^((166|199|13[0-9])|(15[0-9])|(18[0-9])|14[0-9]|17[0-9])[0-9]{8,8}$").test(element.value) == false) {
                    return '请输入正确的手机号码';
                }
            } else {
                if (new RegExp("^[0-9]{5,11}$").test(element.value) == false) {
                    return '请输入正确的手机号码';
                }
            }
        } else if (element.name == "identify_code" && $(element).is(":visible")) {
            if (!/^([a-zA-Z0-9])*$/.test(element.value) || element.value.length != 4) {
                return "请输入正确的验证码";
            } else {
                var tmpUrl = "/ajax/checkCaptcha?identify_code=" + element.value + "&t=" + (new Date().getTime() + Math.random());
                $.get(tmpUrl, function (json) {
                    try {
                        var json = eval("(" + json + ")");
                    } catch (e) {
                        $('.login_error', $(element).parents('table')).text("验证码错误").show();
                    }
                    if (!json.success) {
                        identify_codeFlag = false;
                        $(element).focus();
                        $(element).parents("tr").addClass("err");
                        $('.login_error', $(element).parents('table')).text("验证码错误，请重新输入").show();
                        if (json.errno == -2) {
                            change_identify_code();
                        }
                    } else {
                        identify_codeFlag = true;
                    }
                });
            }
        } else if (element.name == "password") {
        } else {
            return "";
        }
        return "";
    }

    function defaultFocus(ele) {
        var username = $("[name='username']", ele);
        var password = $("[name='password']", ele);
        var identify_code = $("[name='identify_code']", ele);
        if (username.val() == '') {
            username.focus();
        } else if (password.val() == '') {
            password.focus();
        } else {
            identify_code.focus();
        }
    }

    setTimeout(function () {
        defaultFocus(normalForm);
    }, 200);
    $(".identify_img").on("click", change_identify_code);
    $(".identify_img").on("load", function () {
        $(".loadingImg").hide();
        $(this).show();
    });
    $(".get-code").bind("click", sendCode);

    function sendCode() {
        var telFormDiv = $(this).parents('form');
        var flag = checkData($("[name='username'],[name='identify_code']", telFormDiv), "noNull");
        if (flag) {
            $(".get-code,.send-code-again").attr("disabled", true);
            $(".get-code,.send-code-again").unbind("click");
            var postData = {
                intlCode: $("#intlCode").val(),
                tel: $("[name='username']", telFormDiv).val(),
                identify_code: $("[name='identify_code']", telFormDiv).val(),
                is_login: 1
            }
            $.post('/ajax/sendMobileCode', postData, function (json) {
                try {
                    var json = eval("(" + json + ")");
                } catch (e) {
                    $(".login_error", telForm).text('动态口令发送失败，请稍候重试。').show();
                    return;
                }
                if (json.success) {
                    $.layer({
                        title: 0,
                        closeBtn: 0,
                        time: 3,
                        shadeClose: true,
                        dialog: {type: 1, msg: "&nbsp;&nbsp;&nbsp;&nbsp;动态口令已发送，15分钟内有效！"},
                        offset: ['90px', '']
                    });
                    $(".get-code,.send-code-again").hide();
                    intervalTime(60);
                } else {
                    $(".get-code,.send-code-again").removeAttr("disabled");
                    $(".get-code,.send-code-again").bind("click", sendCode);
                    switch (json.errno) {
                        case 0:
                            $.layer({
                                title: 0,
                                closeBtn: 0,
                                time: 3,
                                shadeClose: true,
                                dialog: {type: 1, msg: "&nbsp;&nbsp;&nbsp;&nbsp;动态口令已发送，15分钟内有效！"},
                                offset: ['90px', '']
                            });
                            break;
                        case-1:
                            $("[name='username']", telFormDiv).focus();
                            $("[name='username']", telFormDiv).parents("tr").addClass("err");
                            $(".login_error", telForm).text('请输入正确的手机号码').show();
                            return;
                            break;
                        case-2:
                            $("[name='identify_code']", telFormDiv).focus();
                            $("[name='identify_code']", telFormDiv).parents("tr").addClass("err");
                            $(".login_error", telForm).text('请输入正确的验证码').show();
                            $("#line_9").show();
                            change_identify_code();
                            return;
                            break;
                        case-3:
                            $(".login_error", telForm).text('动态口令发送失败，请稍候重试。').show();
                            return;
                            break;
                        default:
                            $("[name='username']", telFormDiv).focus();
                            $("[name='username']", telFormDiv).parents("tr").addClass("err");
                            $(".login_error", telForm).text(json.errmsg).show();
                            return;
                            break;
                    }
                }
            });
        }
    }

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
                $(".send-code-again").css("display", "inline-block").bind("click", sendCode);
                $(".send-code").hide();
                $(".send-code span").text(0);
            }
        }, 1000);
    }

    function resizeScreen() {
        var index1200 = $("#index1200");
        if (!isBigThan1280()) {
            index1200.removeClass("index1200").addClass("index1000");
        } else {
            index1200.removeClass("index1000").addClass("index1200");
        }
        $(window).resize(function () {
            if (!isBigThan1280()) {
                if (!index1200.hasClass("index1000")) {
                    index1200.removeClass("index1200").addClass("index1000");
                }
            } else {
                if (!index1200.hasClass("index1200")) {
                    index1200.removeClass("index1000").addClass("index1200");
                }
            }
        });
    }

    function isIE6() {
        if ($.browser.msie && $.browser.version == 6) {
            return true;
        } else {
            return false;
        }
    }

    function isBigThan1280() {
        var w_wd = $(window).width();
        if (w_wd >= 1280) {
            return true;
        } else {
            return false;
        }
    }

    function change_identify_code() {
        $(".loadingImg").css("display", "");
        $('.identify_img').hide().attr('src', '/ajax/captcha/v/' + (new Date().getTime() + Math.random()));
    }

    changeCodeTimeout = setTimeout(function () {
        change_identify_code();
    }, 300);
    resizeScreen();
    $(".d_helpclose").on("click", function () {
        $(this).parent().parent().hide();
    });
    $(".abtn_helpiknow").on("click", function () {
        $(this).parent().parent().hide();
    });
    $("#J-card-help").on("click", function () {
        $(".df_hezuokahelp_bg").fadeIn();
    });

    function getCountryCode() {
        $.get('/ajax/countryCode', function (data) {
            $('.zones_tabcont').html(data);
            $(".li_cont").click(function () {
                $(this).parents('.login-table').find('.J_zoneHid').val($(this).attr('data-zone'));
                checkData($(this).parents('.login-table').find('[name=username]'));
                if (telForm.is(':visible')) {
                    needCaptcha(document.getElementById("telNum"));
                }
            });
        });
    }

    getCountryCode();
    $(".app-btn").on('click', function () {
        $('.app-mask').removeClass('hidden')
        $('.app-bgm').removeClass('hidden')
    })
    $(".app-close").on('click', function () {
        $('.app-mask').addClass('hidden')
        $('.app-bgm').addClass('hidden')
    })
})(window, jQuery, undefined);