define('common_amd/location', [], function () {
    var exports = {};
    var locationchange = {
        checkip: function () {
            var citycode = locationchange.getCookie('tuniuuser_ip_citycode');
            var citycodeTuniu = locationchange.getCookie('tuniuuser_citycode');
            if (citycode) {
                return false;
            } else {
                var remind_url = '/ajax/locationchange/';
                var xmlHttp = null;
                if (window.ActiveXObjext) {
                    xmlHttp = new ActiveXObject("Microsoft,XMLHTTP");
                } else if (window.XMLHttpRequest) {
                    xmlHttp = new XMLHttpRequest();
                } else {
                    return false;
                }
                if (xmlHttp != null) {
                    xmlHttp.onreadystatechange = function () {
                        if (xmlHttp.readyState == 4) {
                            if (xmlHttp.status == 504) {
                                xmlHttp.abort();
                            } else if (xmlHttp.status == 200) {
                                var dataObj = eval('(' + xmlHttp.responseText + ')');
                                if (dataObj.code == 1) {
                                    var html = dataObj.result;
                                    var showcity = document.getElementById('startCity').parentNode;
                                    showcity.insertAdjacentHTML('afterbegin', html);
                                    setlocationcookie(dataObj.baseCode);
                                    var t = setTimeout("closelocationchange()", 60000);
                                }
                            }
                        }
                    }
                    xmlHttp.open("GET", remind_url, true);
                    xmlHttp.timeout = 1000;
                    xmlHttp.send(null);
                }
                return false;
            }
        }, getCookie: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]); else
                return null;
        }
    };

    function changelocationbyip(code, href) {
        var Days = 7;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = 'tuniuuser_citycode' + "=" + code + ";expires=" + exp.toGMTString() + ";path=/;domain=.tuniu.com";
        window.location.href = href;
        return false;
    }

    function closelocationchange() {
        var cityBtn = document.getElementById('cityBtn-hover');
        if (cityBtn) {
            cityBtn.style.display = 'none';
        }
        return false;
    }

    function setlocationcookie(code) {
        var expip = new Date();
        expip.setTime(expip.getTime() + 1 * 24 * 60 * 60 * 1000);
        document.cookie = 'tuniuuser_ip_citycode' + "=" + code + ";expires=" + expip.toGMTString() + ";path=/;domain=.tuniu.com";
        return false;
    }

    var init = function () {
        var startCity = document.getElementById('startCity');
        var citycodeTuniu = locationchange.getCookie('tuniuuser_citycode');
        if (startCity && citycodeTuniu) {
            locationchange.checkip();
        }
    };
    window.changelocationbyip = changelocationbyip;
    window.closelocationchange = closelocationchange;
    exports.init = init;
    return exports;
});
;define('common_amd/mobile_app', ['jquery', 'common_amd/tool'], function ($, tool) {
    var loadCss = tool.loadcss;
    var Cookie = {
        get: function (key) {
            var ret, m;
            try {
                if (key) {
                    if ((m = String(document.cookie).match(new RegExp('(?:^| )' + key + '(?:(?:=([^;]*))|;|$)')))) {
                        ret = m[1] ? decodeURIComponent(m[1]) : '';
                    }
                }
            } catch (e) {
                ret = null;
            }
            return ret;
        }, set: function (key, value, maxAge, path, domain, secure) {
            var cookie = key + "=" + encodeURIComponent(value);
            if (maxAge) {
                cookie += "; max-age=" + maxAge;
            }
            if (path) {
                cookie += "; path=" + path;
            }
            if (domain) {
                cookie += "; domain=" + domain;
            }
            if (secure) {
                cookie += "; secure=" + secure;
            }
            document.cookie = cookie;
        }
    };
    var MobileApp = function () {
        this.init();
        this.bindEvents();
    }
    MobileApp.prototype = {
        init: function () {
            this.querySetting();
            loadCss(window.location.protocol + '//img3.tuniucdn.com/s/2016112419/ad_mask/mask.css');
        }, bindEvents: function () {
            $(window).on("afterMobileappdataload", $.proxy(this.onAppDataLoad, this));
            $(window).on("resize", $.proxy(this.checkResize, this));
        }, querySetting: function () {
            $.ajax({
                url: "/tn?r=api/actapi/activity",
                type: "GET",
                dataType: "json",
                data: {system: "WEB", pageType: "homepage"},
                success: function (ret) {
                    if (ret && ret.success) {
                        var tgInfo = ret.data.GTInfo;
                        for (var i = 0, len = tgInfo.length; i < len; i++) {
                            if (tgInfo[i].activity_style == 8 || tgInfo[i].activity_style == 15 || tgInfo[i].activity_style == 17) {
                                var is_open_phone_valid = (tgInfo[i].is_open_phone_valid != 0 && !!tgInfo[i].submit_button_url) ? 1 : 0;
                                $(window).trigger("mobileappdataload", tgInfo[i]);
                                $(window).trigger("afterMobileappdataload", {tg: tgInfo[i], type: is_open_phone_valid});
                                break;
                            }
                        }
                    }
                }
            });
        }, onAppDataLoad: function (e, data) {
            var newOpen = data.tg.activity_frequence, newClose = data.tg.activity_closelimit;
            var oldOpen = Cookie.get("MOBILE_APP_SETTING_OPEN-" + data.tg.activity_id),
                oldState = Cookie.get("MOBILE_APP_SETTING_STATE-" + data.tg.activity_id) || "OPEN",
                oldReceived = Cookie.get("MOBILE_APP_SETTING_RECEIVED-" + data.tg.activity_id);
            var open, state;
            if (data.tg.activity_style == 15 && oldReceived) {
                state = 'CLOSE';
            } else {
                if (newOpen == 0) {
                    Cookie.set("MOBILE_APP_SETTING_OPEN-" + data.tg.activity_id, newOpen, 0, "/", ".tuniu.com");
                    state = "OPEN";
                } else {
                    if (oldOpen) {
                        state = oldState;
                    } else {
                        Cookie.set("MOBILE_APP_SETTING_OPEN-" + data.tg.activity_id, newOpen, newOpen * 24 * 3600, "/", ".tuniu.com");
                        state = "OPEN";
                    }
                }
            }
            var self = this;
            if ((newClose != -1) && (oldState == "OPEN")) {
                this.closeTimer = setTimeout(function () {
                    self.close();
                }, newClose * 1000);
            }
            this.build(data, state);
            this.openElt && this.openElt.data('open-config-data', data);
        }, existsEventTrack: function (mess) {
            if (window.eventTrack) {
                eventTrack.push({text: mess, x: 0, y: 0});
            }
        }, build: function (data, state) {
            if (data.tg.activity_style == 8 || data.tg.activity_style == 17) {
                if (data.tg.activity_style == 17 && !Cookie.get("tuniuuser_name")) {
                    this.existsEventTrack("出现_千元拉新礼包底通_自动弹出");
                    this.openElt = $(MobileApp.OpenHtml1).appendTo(document.body);
                    this.openElt.find(".box-background").css("background-color", "#" + data.tg.color_unlogin);
                    this.openElt.find(".background-img img").attr("src", data.tg.bkg_unlogin.bkg_url_unlogin);
                    this.openElt.find(".background-img a").attr("href", data.tg.bkg_unlogin.bkg_linkurl);
                    this.openElt.find(".btn-close img").attr("src", data.tg.button_close_unlogin.img_url);
                    this.openElt.find(".btn-download a").each(function (index, item) {
                        $(this).attr("href", data.tg.button_other[index].btn_url);
                        $(this).find("img").attr("src", data.tg.button_other[index].url);
                    });
                    this.closeElt = $(MobileApp.CloseHtml).appendTo(document.body);
                    this.closeElt.find(".background-img img").attr("src", data.tg.button_download_unlogin[3].url);
                }
                else {
                    this.openElt = $(data.type == 1 ? MobileApp.OpenHtml1 : MobileApp.OpenHtml2).appendTo(document.body);
                    this.openElt.find(".box-background").css("background-color", "#" + data.tg.color);
                    this.openElt.find(".background-img img").attr("src", data.tg.bkg.bkg_url);
                    this.openElt.find(".background-img a").attr("href", data.tg.bkg.bkg_linkurl);
                    this.openElt.find(".btn-close img").attr("src", data.tg.button_close.img_url);
                    this.openElt.find(".btn-download a").each(function (index, item) {
                        $(this).attr("href", data.tg.button_other[index].btn_url);
                        $(this).find("img").attr("src", data.tg.button_other[index].url);
                    });
                    this.closeElt = $(MobileApp.CloseHtml).appendTo(document.body);
                    this.closeElt.find(".background-img img").attr("src", data.tg.button_other[3].url);
                    this.existsEventTrack("出现_非活动底通_自动弹出");
                }
                if (state == "OPEN") {
                    this.openElt.css("left", "0");
                    this.openElt.show();
                    this.closeElt.css("left", "-100%");
                } else {
                    var left = this.checkScreen();
                    this.openElt.css("left", "-100%");
                    this.openElt.hide();
                    this.closeElt.css("left", left);
                }
                this.openElt.find(".btn-close").on("click", $.proxy(this.close, this));
                this.closeElt.on("click", $.proxy(this.open, this));
                this.openElt.find(".inputIphone").on("focus", $.proxy(this.inputIphoneFocus, this));
                this.openElt.find(".inputIphone").on("blur", $.proxy(this.inputIphoneBlur, this));
                this.openElt.find(".phone_code").on("focus", $.proxy(this.phoneCodeFocus, this));
                this.openElt.find(".phone_code").on("blur", $.proxy(this.phoneCodeBlur, this));
                this.openElt.find(".J_sendCode").on("click", $.proxy(this.sendCode, this));
                if (data.tg.activity_style == 8) {
                    this.openElt.find(".get-packet").on("click", $.proxy(this.packetFromConfig, this));
                } else {
                    this.openElt.find(".get-packet").on("click", $.proxy(this.packetNewMember, this));
                }
            } else if (data.tg.activity_style == 15) {
                this.openElt = $(MobileApp.MakeOpenHtml(data)).appendTo(document.body);
                this.openElt.find(".btn-close, .m-app-bg").on("click", $.proxy(this.close, this));
                this.openElt.find(".get-packet").on("click", $.proxy(this.packetFromConfig, this));
                this.openElt.find(".inputIphone").on("focus", $.proxy(this.inputIphone, this));
                this.openElt.find("#inputIphone").on("focus", function () {
                    $('#inputIphone').val('');
                    $('#inputIphone').css('color', '#333');
                });
                this.openElt.toggle(state == "OPEN");
            }
        }, open: function () {
            var self = this, data = self.openElt ? self.openElt.data('open-config-data') : {},
                id = data.tg && data.tg.activity_id;
            if (id > 0) {
                if (data.tg.activity_style == 8 || data.tg.activity_style == 17) {
                    self.closeElt.animate({left: "-100%"}, "normal", "swing", function () {
                        self.openElt.show();
                        self.openElt.animate({left: "0"}, "normal", "swing", function () {
                            Cookie.set("MOBILE_APP_SETTING_STATE-" + id, "OPEN", 365 * 24 * 3600, "/", ".tuniu.com");
                        })
                        if (data.tg.activity_style == 17) {
                            if (!Cookie.get("tuniuuser_name")) {
                                self.existsEventTrack("点击_千元拉新礼包底通_收缩按钮");
                            }
                            else {
                                self.existsEventTrack("点击_非活动底通_收缩按钮");
                            }
                        }
                    });
                } else if (data.tg.activity_style == 15) {
                    Cookie.set("MOBILE_APP_SETTING_STATE-" + id, "OPEN", 365 * 24 * 3600, "/", ".tuniu.com");
                    self.openElt.show();
                }
            }
        }, close: function () {
            var self = this, data = self.openElt ? self.openElt.data('open-config-data') : {},
                id = data.tg && data.tg.activity_id, left;
            if (id > 0) {
                if (data.tg.activity_style == 8 || data.tg.activity_style == 17) {
                    left = self.checkScreen();
                    self.openElt.animate({left: "-100%"}, "normal", "swing", function () {
                        self.closeElt.animate({left: left}, "normal", "swing", function () {
                            id && Cookie.set("MOBILE_APP_SETTING_STATE-" + id, "CLOSE", 365 * 24 * 3600, "/", ".tuniu.com");
                            if (self.closeTimer) {
                                clearTimeout(self.closeTimer);
                            }
                            self.openElt.hide();
                        })
                    });
                    if (data.tg.activity_style == 17) {
                        if (!Cookie.get("tuniuuser_name")) {
                            self.existsEventTrack("点击_千元拉新礼包底通_关闭按钮");
                        } else {
                            self.existsEventTrack("点击_非活动底通_关闭按钮");
                        }
                    }
                } else if (data.tg.activity_style == 15) {
                    id && Cookie.set("MOBILE_APP_SETTING_STATE-" + id, "CLOSE", 365 * 24 * 3600, "/", ".tuniu.com");
                    if (self.closeTimer) {
                        clearTimeout(self.closeTimer);
                    }
                    self.openElt.hide();
                }
            }
        }, inputIphone: function () {
            var $noticeMess = this.openElt.find('.noice-mess');
            $noticeMess.html(' ');
        }, inputIphoneFocus: function () {
            var $noticeMess = this.openElt.find('.noice-mess');
            var $btn = this.openElt.find(".get-packet");
            var $stateBtn = this.openElt.find(".get-state");
            $noticeMess.html(' ');
            if ($.trim(this.openElt.find(".inputIphone").val()) == "输入您的手机号码") {
                this.openElt.find(".inputIphone").val("");
                this.openElt.find(".inputIphone").addClass("on");
            }
            if ($stateBtn.css("display") == 'block') {
                $btn.show();
                $stateBtn.hide().html('领取中<span class="bounce1"></span><span class="bounce2"></span><span class="bounce3"></span>');
            }
        }, inputIphoneBlur: function () {
            var $noticeMess = this.openElt.find('.noice-mess');
            $noticeMess.html(' ');
            if ($.trim(this.openElt.find(".inputIphone").val()) == "") {
                this.openElt.find(".inputIphone").val("输入您的手机号码");
                this.openElt.find(".inputIphone").removeClass("on");
            }
        }, phoneCodeFocus: function () {
            var $noticeMess = this.openElt.find('.noice-mess');
            $noticeMess.html(' ');
            if ($.trim(this.openElt.find(".phone_code").val()) == "6位验证码") {
                this.openElt.find(".phone_code").val("");
                this.openElt.find(".phone_code").addClass("on");
            }
        }, phoneCodeBlur: function () {
            var $noticeMess = this.openElt.find('.noice-mess');
            $noticeMess.html(' ');
            if ($.trim(this.openElt.find(".phone_code").val()) == "") {
                this.openElt.find(".phone_code").val("6位验证码");
                this.openElt.find(".phone_code").removeClass("on");
            }
        }, sendCode: function () {
            var self = this;
            var $noticeMess = self.openElt.find('.noice-mess');
            var inputIphone = $.trim(self.openElt.find(".inputIphone").val());
            var $btn = self.openElt.find(".get-packet");
            var $stateBtn = self.openElt.find(".get-state");
            var url = location.protocol + "//m.tuniu.com/event/NewMemberCoupon/SendTelCodeAjax";
            if (inputIphone == "" || inputIphone == "输入您的手机号码") {
                $noticeMess.html('<i class="error"></i>请输入手机号码！');
                return;
            }
            else if (!(/^1\d{10}$/g.test(inputIphone))) {
                $noticeMess.html('<i class="error"></i>请输入正确的手机号码！');
                return;
            }
            else {
                $.ajax({
                    url: url,
                    dataType: "jsonp",
                    type: "get",
                    data: {'tel': inputIphone, "isJsonp": 1},
                    success: function (data) {
                        if (data.errorCode == '710000') {
                            $noticeMess.html('<i></i>验证码发送成功！');
                            sendTimes();
                        } else if (data.errorCode == '710007') {
                            $noticeMess.html('<i class="error"></i>号码好像不对哦~重输一下吧');
                        } else if (data.errorCode == '710023') {
                            $noticeMess.html('<i class="error"></i>您今天只能获取5次验证码哦');
                        } else if (data.errorCode == '710024') {
                            $noticeMess.html('<i class="error"></i>发送失败，请稍后再试~');
                        } else {
                            $noticeMess.html('发送失败，请稍后再试~');
                        }
                    },
                    error: function () {
                        $noticeMess.html('发送失败，请稍后再试~');
                    }
                })
            }

            function sendTimes() {
                var times = 60;
                var obj = $("#J_sendCode");
                var timeObj = $(".timeout")
                isinerval = setInterval(function () {
                    if (times < 1) {
                        times = 60;
                        timeObj.hide();
                        obj.show();
                        clearInterval(isinerval);
                        return;
                    }
                    timeObj.html("" + times + "s后重新获取").show();
                    obj.hide();
                    times--;
                }, 1000);
            }
        }, getP: function () {
            var paramArr = window.location.hash.slice(1).split("&").concat(window.location.search.slice(1).split("&"));
            var hashObj = {};
            for (var i = 0; i < paramArr.length; i++) {
                var keyValue = paramArr[i].split("=");
                hashObj[keyValue[0]] = keyValue[1];
            }
            if (hashObj.p) {
                return hashObj.p;
            }
            if (!Cookie.get("tuniu_partner")) {
                return "";
            }
            return tool.base64.decode(unescape(Cookie.get("tuniu_partner"))).split(",")[0] || 0;
        }, errorCode: {
            getCommonError: function (errorCode, msg) {
                var result;
                switch (+errorCode) {
                    case 710000:
                        result = {success: true, key: 'SUCCESS', text: '<i></i>成功！请在会员中心"优惠券"中查看！'};
                        break;
                    case 710001:
                        result = {key: 'INPUT_ERROR', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                    case 710002:
                        result = {key: 'UNLOGIN', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                    case 710003:
                        result = {key: 'EXPIRED', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                    case 710004:
                        result = {key: 'MAX', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                    case 710005:
                        result = {key: 'INFO_ERROR', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                    case 710006:
                        result = {key: 'INFO_ERROR', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                    case 710007:
                        result = {key: 'TEL_INVALID', text: '<i class="error"></i>对不起，您填写的手机号码不正确！'};
                        break;
                    case 710008:
                        result = {success: true, key: 'PRIZE_MAX', text: '<i></i>已领取！请在会员中心"优惠券"中查看！'};
                        break;
                    case 710009:
                        result = {key: 'SERVER_ERROR', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                    case 710010:
                        result = {key: 'CUSTOM_ERROR', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                    case 710011:
                        result = {key: 'PREPARE', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                    case 710099:
                        result = {key: 'SERVER_ERROR', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                    default:
                        result = {key: 'UNKNOWN', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                }
                return result;
            }, getVoiceError: function (errorCode, msg) {
                var result;
                switch (+errorCode) {
                    case 710000:
                        result = {success: true, key: 'SUCCESS', text: '<i></i>成功！请在会员中心"优惠券"中查看！'};
                        break;
                    case 710001:
                        result = {key: 'INPUT_ERROR', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                    case 710002:
                        result = {key: 'TEL_INVALID', text: '<i class="error"></i>对不起，请登录后再领取！'};
                        break;
                    case 710003:
                        result = {key: 'PREPARE', text: '<i class="error"></i>活动已结束！'};
                        break;
                    case 710004:
                        result = {key: 'EXPIRED', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                    case 710005:
                        result = {success: false, key: 'CHARGING', text: '<i class="error"></i>验证码校验失败！'};
                        break;
                    case 710007:
                        result = {key: 'INPUT_ERROR', text: '<i class="error"></i>请填写正确的手机号码！'};
                        break;
                    case 710008:
                        result = {success: false, key: 'PRIZE_MAX', text: '<i class="error"></i>不能重复领取哦！'};
                        break;
                    case 710009:
                        result = {key: 'ACTIVITY_MAX', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                    case 710010:
                        result = {key: 'SERVER_ERROR', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                    case 710011:
                        result = {key: 'PRIZE_OVER', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                    case 710014:
                        result = {key: 'PRIZE_OVER', text: '<i class="error"></i>活动已结束！'};
                        break;
                    case 710098:
                        result = {key: 'CUSTOM_ERROR', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                    default:
                        result = {key: 'UNKNOWN', text: '<i class="error"></i>小牛在玩命处理中，请稍后重试！'};
                        break;
                }
                return result;
            }, check: function (url, errorCode, msg) {
                var result = {key: 'UNKNOWN', text: '小牛在玩命处理中，请稍后重试！'};
                if (/http(s)?:\/\/m\.tuniu\.com/.test(url)) {
                    result = this.getVoiceError(errorCode, msg) || result;
                } else {
                    result = this.getCommonError(errorCode, msg) || result;
                }
                return result;
            }
        }, packetNewMember: function () {
            var self = this;
            var configData = self.openElt.data('open-config-data');
            var $noticeMess = self.openElt.find('.noice-mess');
            var inputIphone = $.trim(self.openElt.find(".inputIphone").val());
            var checkCode = $.trim(self.openElt.find(".phone_code").val()) || '';
            var actityUrl = configData.tg.submit_button_url_unlogin;
            var httpUrl = location.protocol + '//m.tuniu.com/event/NewMemberCoupon/CheckTelAjax';
            var $btn = self.openElt.find(".get-packet");
            var $sendCodeDiv = self.openElt.find(".J_sendCodeBox");
            var $phoneDiv = self.openElt.find(".inputIphone");
            var tacaName = Cookie.get("_taca");
            if (self.lock) {
                return false;
            }
            if (inputIphone == "" || inputIphone == "输入您的手机号码") {
                $noticeMess.html('<i class="error"></i>请输入手机号码！');
                return;
            } else if (!(/^1\d{10}$/g.test(inputIphone))) {
                $noticeMess.html('<i class="error"></i>请输入正确的手机号码！');
                return;
            } else {
                if ($sendCodeDiv.hasClass("hide-box")) {
                    $.ajax({
                        url: httpUrl,
                        dataType: "jsonp",
                        type: "get",
                        data: {
                            'frms_finger': tacaName,
                            'frms_login_source': "pc",
                            'frms_phone_no': inputIphone,
                            'p': self.getP(),
                            "isJsonp": "1"
                        },
                        beforeSend: function () {
                            self.lock = true;
                        },
                        success: function (data) {
                            self.lock = false;
                            checkDataMess(data);
                        },
                        error: function () {
                            $noticeMess.html('小牛在玩命处理中，请稍后重试！');
                        }
                    });
                } else {
                    $.ajax({
                        url: httpUrl,
                        dataType: "jsonp",
                        type: "get",
                        data: {
                            'frms_finger': tacaName,
                            'frms_login_source': "pc",
                            'frms_phone_no': inputIphone,
                            'p': self.getP(),
                            'code': checkCode,
                            "isJsonp": "1"
                        },
                        beforeSend: function () {
                            self.lock = true;
                        },
                        success: function (data) {
                            self.lock = false;
                            checkDataMess(data);
                        },
                        error: function () {
                            $noticeMess.html('小牛在玩命处理中，请稍后重试！');
                        }
                    });
                }

                function checkDataMess(data) {
                    if (data.success && data.errorCode == '710000') {
                        var tel = data.data.encrypTel;
                        $noticeMess.html('<i></i>成功！');
                        window.location.href = actityUrl + '&encrypTel=' + tel;
                    } else {
                        if (data.errorCode == '710007') {
                            $noticeMess.html('<i class="error"></i>号码好像不对哦~重输一下吧');
                        } else if (data.errorCode == '710021') {
                            $noticeMess.html('<i class="error"></i>手机号码异常，请输入验证码~');
                            $sendCodeDiv.removeClass("hide-box");
                            $phoneDiv.removeClass("mt20");
                        } else if (data.errorCode == '710008') {
                            window.location.href = actityUrl + '&encrypTel=' + tel;
                        } else if (data.errorCode == '710025') {
                            $noticeMess.html('<i class="error"></i>号码好像不对哦~重输一下吧');
                        } else if (data.errorCode == '710022') {
                            $noticeMess.html('<i class="error"></i>验证码错误');
                        } else {
                            $noticeMess.html('号码好像不对哦~重输一下吧');
                        }
                    }
                }
            }
        }, packetFromCode: function () {
            var self = this;
            var configData = self.openElt.data('open-config-data');
            var $noticeMess = self.openElt.find('.noice-mess');
            var inputIphone = $.trim(self.openElt.find(".inputIphone").val());
            var checkCode = $.trim(self.openElt.find(".phone_code").val());
            var httpUrl = location.protocol + configData.tg.submit_button_url;
            var $btn = self.openElt.find(".get-packet");
            var $stateBtn = self.openElt.find(".get-state");
            if (self.lock) {
                return false;
            }
            if (inputIphone == "" || inputIphone == "输入您的手机号码") {
                $noticeMess.html('<i class="error"></i>请输入手机号码！');
                return;
            }
            if (checkCode == "" || checkCode == "6位验证码") {
                $noticeMess.html('<i class="error"></i>请输入验证码！');
                return;
            }
            $.ajax({
                url: httpUrl,
                dataType: "jsonp",
                type: "get",
                data: {
                    'tel': inputIphone,
                    'p': self.getP(),
                    'mark': "tenYearEvent",
                    'checkCode': checkCode,
                    "isJsonp": "1"
                },
                beforeSend: function () {
                    self.lock = true;
                    $btn.hide();
                    $stateBtn.show();
                },
                success: function (data) {
                    self.lock = false;
                    $btn.show();
                    $stateBtn.hide();
                    var errorInfo = self.errorCode.check(httpUrl, data.errorCode, data.msg);
                    if (errorInfo.success) {
                        Cookie.set("MOBILE_APP_SETTING_RECEIVED-" + configData.tg.activity_id, 1, 10 * 24 * 3600, "/", ".tuniu.com");
                    }
                    $noticeMess.html(errorInfo.text);
                    if (data.errorCode == '710000') {
                        $btn.hide();
                        $stateBtn.show().html("领取成功");
                    }
                    if (data.errorCode == '710008') {
                        $btn.hide();
                        $stateBtn.show().html("您已经领取过了");
                    }
                },
                error: function () {
                    self.lock = false;
                    $noticeMess.html('小牛在玩命处理中，请稍后重试！');
                }
            });
        }, packetFromConfig: function () {
            var self = this;
            var configData = self.openElt.data('open-config-data');
            var $noticeMess = self.openElt.find('.noice-mess');
            var inputIphone = $.trim(self.openElt.find(".inputIphone").val());
            var httpUrl = location.protocol + configData.tg.submit_button_url;
            $.ajax({
                url: httpUrl,
                dataType: "jsonp",
                type: "get",
                data: {'tel': inputIphone, 'p': self.getP(), "isJsonp": "1"},
                success: function (data) {
                    var errorInfo = self.errorCode.check(httpUrl, data.errorCode, data.msg);
                    if (errorInfo.success) {
                        Cookie.set("MOBILE_APP_SETTING_RECEIVED-" + configData.tg.activity_id, 1, 10 * 24 * 3600, "/", ".tuniu.com");
                    }
                    $noticeMess.html(errorInfo.text);
                },
                error: function () {
                    $noticeMess.html('小牛在玩命处理中，请稍后重试！');
                }
            });
        }, packetForSummer: function () {
            var $noticeMess = self.openElt.find('.noice-mess');
            var self = this;
            var inputIphone = $.trim(self.openElt.find(".inputIphone").val());
            var httpUrl = location.protocol + "//tv.tuniu.com/event/gift/getPrizeAjax";
            $.ajax({
                url: httpUrl,
                dataType: "jsonp",
                type: "get",
                data: {'tel': inputIphone, 'p': self.getP(), 'mark': "2016heatHurried", "isJsonp": "1"},
                success: function (data) {
                    if (data.success) {
                        if (data.errorCode == '710000') {
                            $noticeMess.html('<i></i>成功！请在会员中心"优惠券"中查看！');
                        }
                        else {
                            $noticeMess.html('小牛在玩命处理中，请稍后重试！');
                        }
                    }
                    else {
                        if (data.errorCode == '710008') {
                            $noticeMess.html('<i></i>已领取！请在会员中心"优惠券"中查看！');
                        }
                        else if (data.errorCode == '710002') {
                            $noticeMess.html('对不起，您填写的手机号码不正确！');
                        }
                        else if (data.errorCode == '710005') {
                            $noticeMess.html('<i></i>您已领取，请稍后查看！');
                        }
                        else {
                            $noticeMess.html('小牛在玩命处理中，请稍后重试！');
                        }
                    }
                },
                error: function () {
                    $noticeMess.html('小牛在玩命处理中，请稍后重试！');
                }
            });
        }, packet: function () {
            var $noticeMess = this.openElt.find('.noice-mess');
            var self = this;
            var inputIphone = $.trim(this.openElt.find(".inputIphone").val());
            var httpUrl = location.protocol + "//dynamic.m.tuniu.com/event/lottery/opeLottery/keyLotteryAjax";
            $.ajax({
                url: httpUrl,
                dataType: "jsonp",
                type: "get",
                data: {
                    'tel': inputIphone,
                    'actId': 492,
                    'mark': "wudi",
                    'itemId': 16700,
                    'sysType': 2,
                    'type': 1,
                    "isJsonp": "1"
                },
                success: function (data) {
                    if (data.success) {
                        if (data.errorCode == '710000') {
                            $noticeMess.html('<i></i>成功！请在会员中心"优惠券"中查看！');
                        } else {
                            $noticeMess.html('小牛在玩命处理中，请稍后重试！');
                        }
                    } else {
                        if (data.errorCode == '710008') {
                            $noticeMess.html('<i></i>已领取！请在会员中心"优惠券"中查看！');
                        } else {
                            $noticeMess.html('小牛在玩命处理中，请稍后重试！');
                        }
                    }
                },
                error: function () {
                    $noticeMess.html('小牛在玩命处理中，请稍后重试！');
                }
            });
        }, checkResize: function () {
            var self = this, data = self.openElt ? self.openElt.data('open-config-data') : {},
                id = data.tg && data.tg.activity_id, open, state;
            state = Cookie.get("MOBILE_APP_SETTING_STATE-" + id) || 'OPEN';
            if (id > 0) {
                if (data.tg.activity_style == 8) {
                    if (state == "OPEN") {
                        self.openElt.css("left", "0");
                        self.closeElt && self.closeElt.css("left", "-100%");
                    } else if (state == "CLOSE") {
                        var left = self.checkScreen();
                        self.openElt.css("left", "-100%");
                        self.closeElt && self.closeElt.css("left", left);
                    }
                } else if (data.tg.activity_style == 15) {
                    var top = ($(window).height() - 450) / 2;
                    top = top > 0 ? top : 0;
                    var left = ($(window).width() - 400) / 2;
                    left = left > 0 ? left : 0;
                    if (state == "OPEN") {
                        self.openElt.find('.m-app-container').css({top: top, left: left})
                        self.openElt.show();
                    } else if (state == "CLOSE") {
                        self.openElt.hide();
                    }
                }
            }
        }, checkScreen: function () {
            var winWith = $(window).width(), min = 1410, left = 0;
            if (winWith < min) {
                left = -50;
            }
            return left;
        }
    }
    MobileApp.OpenHtml1 = ['<div class="m-app-open">', '<div class="box-background">', '</div>', '<div class="box-inner">', '   <div id="box-extra" class="box-extra">', '       <input class="inputIphone mt20" type="text" value="输入您的手机号码" />', ' <div class="J_sendCodeBox hide-box clearfix"><input type="text" value="6位验证码" class="phone_code" />', '<a id="J_sendCode" class="send_code J_sendCode" href="javascript:void(0)">获取验证码</a><span class="timeout"></span>', '</div>', '       <div class="get-packet" m="点击_千元拉新礼包底通_立即免费领取">立即免费领取</div>', '       <div class="get-state load6">领取中<span class="bounce1"></span><span class="bounce2"></span><span class="bounce3"></span></div>', '       <p class="noice-mess"></p>', '   </div>', '   <div class="background-img">', '       <a target="_blank" href=""></a>', '       <img src="" alt="">', '   </div>', '   <div class="btn-download">', '       <a href="" target="_blank">', '           <img src="" alt="">', '       </a>', '       <a href="" target="_blank">', '           <img src="" alt="">', '       </a>', '       <a href="" target="_blank">', '           <img src="" alt="">', '       </a>', '   </div>', '   <div class="btn-close">', '       <img src="" alt="">', '   </div>', '</div>', '</div>'].join("\n");
    MobileApp.OpenHtml2 = ['<div class="m-app-open">', '<div class="box-background">', '</div>', '<div class="box-inner">', '   <div class="background-img">', '       <a target="_blank" href=""></a>', '       <img src="" alt="">', '   </div>', '   <div class="btn-download">', '       <a href="" target="_blank">', '           <img src="" alt="">', '       </a>', '       <a href="" target="_blank">', '           <img src="" alt="">', '       </a>', '       <a href="" target="_blank">', '           <img src="" alt="">', '       </a>', '   </div>', '   <div class="btn-close">', '       <img src="" alt="">', '   </div>', '</div>', '</div>'].join("\n");
    MobileApp.CloseHtml = ['<div class="m-app-close">', '   <div class="background-img">', '       <img src="" alt="">', '   </div>', '</div>'].join("\n");
    MobileApp.MakeOpenHtml = function (data) {
        var top = ($(window).height() - 450) / 2;
        top = top > 0 ? top : 0;
        var left = ($(window).width() - 400) / 2;
        left = left > 0 ? left : 0;
        var html = ['<div class="m-app-box">', '   <div class="m-app-bg" style="background:#' + data.tg.color + ';">', '   </div>', '   <div class="m-app-container" style="background-image:url(' + data.tg.button_other[1].url + ');top:' + top + 'px;left:' + left + 'px;">', '       <div class="m-app-input"><input type="text" id="inputIphone" class="inputIphone" value="输入手机号领取优惠券" /></div>', '       <div class="noice-mess" style="color:' + data.tg.button_other[3].url + '"></div>', '       <div class="get-packet-box">', '          <a class="get-packet" style="background-image:url(' + data.tg.button_other[0].url + ')"></a>', '       </div>', '       <img class="btn-close" src="' + data.tg.button_other[2].url + '" alt="关闭" />', '   </div>', '</div>'],
            result = html.join('\n');
        return result;
    };
    tool.event.observe(document, 'mousemove', function () {
        tool.event.unobserve(document, 'mousemove', arguments.callee);
        if (window.XMLHttpRequest) {
            (new MobileApp());
        }
    });
});
;define("common_amd/joinus", [], function () {
    var exports = {};
    var greeting = "\n           8MM                        MMI\n" + "          =MMM#                      MMMM`\n" + "          #MMMM8``;=+O8E###+II;:~.` #MMMM+\n" + "          MMMMMMMMMMMMMMMMM#=iiiiiiii+OEMM\n" + " +MMM#EO+8MMMMMMMMMMMMMMMMMM=iiiiiiiii===+I;I=iii=`\n" + ";MMMMMMMMMMMMMMMMMMMMMMMMMMM=iiiiiiiiiiiiiiiiiiiiii\n" + " i#MMMMMMMMMMMMMMMMMMMMMMMMM=iiiiiiiiiiiiiiiiiiiiI`\n" + "      `~MMMMMMMOiioMMMMMMMM8=iii=:~:Iiiiiiii`\n" + "       iMMMMM+  .== =MMMMMM=iii`~i=   Iiiiii:\n" + "       MMMMMM  .MMMM MMMMM+=ii;;MMMM   iiiiii\n" + "      =MMMMMMI  ;oo.:MMMMo=iiii IOo~  ;iiiiii~\n" + "      MMMMMMMMMi;;=#MMM#i=iiiiii;~..;iiiiiiii=\n" + "     ;MMMMMMMMMMMMMMMEiII=====iiiiiiiiiiiiiiii`\n" + "     #MMMMMMEo=;~.````````````````.~:;I=iiiiiiI\n" + "    ~MMMoI.```````................```````~;=iii\n" + "    ##:````..............................````;i;\n" + "   .i``.....................................```=\n" + "   ``..........................................`.\n" + "   ..........```...................```...........\n" + "  `.........`Io~``````.......``````.=o`..........\n" + "   ..........`IO#8+I:.```````.~;iO#Ei~`.........`\n" + "   `..........```.;io8EEEEEEE8O+I~````..........\n" + "    `............`````````````````.............\n" + "      `.....................................`\n" + "         ``..............................`\n" + "              ```.................````\n\n" + "嘿嘿，加入我们吧~ http://tuniu.zhiye.com/";
    exports.init = function () {
        window.console && window.console.log(greeting)
    };
    return exports
});
;define('rightcommon_amd/main_prd', ['jquery', 'underscore'], function ($, _) {
    var getLoginInfor = {
        init: function () {
        },
        cookieName: "",
        _isGuest: "",
        _nickName: "",
        tuniuImg: "",
        tuniuVip: "",
        tuniuLevel: "",
        parter: "",
        base64decode: function (str) {
            var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
            var c1, c2, c3, c4;
            var i, len, out;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                do {
                    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c1 == -1);
                if (c1 == -1)
                    break;
                do {
                    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c2 == -1);
                if (c2 == -1)
                    break;
                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61)
                        return out;
                    c3 = base64DecodeChars[c3];
                } while (i < len && c3 == -1);
                if (c3 == -1)
                    break;
                out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61)
                        return out;
                    c4 = base64DecodeChars[c4];
                } while (i < len && c4 == -1);
                if (c4 == -1)
                    break;
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            return out;
        },
        utf8to16: function (str) {
            var out, i, len, c;
            var char2, char3;
            out = "";
            len = str.length;
            i = 0;
            while (i < len) {
                c = str.charCodeAt(i++);
                switch (c >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        out += str.charAt(i - 1);
                        break;
                    case 12:
                    case 13:
                        char2 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                        break;
                    case 14:
                        char2 = str.charCodeAt(i++);
                        char3 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                        break;
                }
            }
            return out;
        },
        getCookieForLogin: function () {
            var aCookie = document.cookie.split("; ");
            var _cookieName = [];
            if (aCookie.length) {
                for (var i = 0; i < aCookie.length; i++) {
                    var aCrumb = aCookie[i].split("=");
                    if (aCrumb.length) {
                        var cookieValue = aCrumb[1];
                        if (cookieValue) {
                            _cookieName[aCrumb[0]] = cookieValue.replace(/<\/?[^>]*>/g, '');
                        } else {
                            _cookieName[aCrumb[0]] = "";
                        }
                    }
                }
            }
            return _cookieName;
        },
        getLoginState: function () {
            this.cookieName = this.getCookieForLogin();
            var userInfo = this.cookieName['tuniuuser'];
            this._nickname = this.cookieName['tuniuuser_name'];
            this.parter = this.cookieName['p_phone_400'];
            if (this._nickname) {
                this._isGuest = true;
                this._nickname = unescape(this.cookieName['tuniuuser_name']);
                this._nickname = this.utf8to16(this.base64decode(this._nickname)).replace(/<\/?[^>]*>/g, '');
            } else {
                this._isGuest = false;
            }
        }
    };

    function getUnderscoreCompiledTemplate(tmpl, data) {
        if ($.isFunction(tmpl)) {
            tmpl = tmpl(data);
        }
        return tmpl || '';
    }

    var rightCommon = rightCommon || [];
    var rightCommonUl = "";
    var rightCommonrcTop = "";
    var rightCommonrcMid = "";
    var rightCommonrcBtm = "";
    var rightCommonrcLastBtm = "";
    var rihtCommonPhone = "";
    var data = {};
    var currentPageData;
    var KEFU_TEMPLATE_ID = 10001;
    rightCommon = {
        init: function (data, isPreventToolBar) {
            currentPageData = data || {};
            if (isPreventToolBar) {
                this.getKefu();
                return;
            }
            this.initToolBar();
            var topImfor = this.getAdImg() + this.getApp();
            var midImfor = this.getMyTuniu() + this.getCollect() + this.myScore() + this.getOrder() + this.myArch() + this.getListInfor();
            var str = window.location.host;
            var domain = str.split(".")[0];
            var iframeSrc = 'https://passport.tuniu.com/login/iframe?origin=' + encodeURIComponent('http://www.tuniu.com/ssoConnect/Iframe?reload=' + domain);
            var passport = "<div class='nologin_passport rc_common_box nologin' style='width:378px;padding:0px; border:none; outline:none;'>"
                + "<iframe src='" + iframeSrc + "'  width='100%' height='352px' frameborder='0'>"
                + "</iframe>"
                + "</div>"
            $('body').delegate('#rightCommon .mytuniuArea', 'hover', function (event) {
                var $dom = $(this);
                if ($dom.find('.nologin_passport').length > 0 || $dom.find('.nologin').length < 1) return;
                if (event.type == 'mouseover' || event.type == 'mouseenter') {
                    $dom.find('.rc_common_box').remove();
                    $dom.find('.rc_box').append(passport);
                } else {
                }
            });
            $('body').delegate('.hoverClick', 'click', function (event) {
                var $dom = $(this);
                if ($dom.find('.nologin_passport').length > 0 || $dom.find('.nologin').length < 1) return;
                $dom.find('.rc_common_box').remove();
                $dom.find('.rc_click_event.rc_box').append(passport);
            });
            var phoneKefu = this.getKefu() + this.getPhone();
            var otherInfor = this.myCompare();
            var btnImfor = this.getQA() + this.addAdvise() + this.backToTop();
            rightCommonrcTop.innerHTML = topImfor;
            rightCommonrcMid.innerHTML = midImfor;
            rihtCommonPhone.innerHTML = phoneKefu;
            rightCommonrcBtm.innerHTML = btnImfor;
            rightCommonrcLastBtm.innerHTML = otherInfor;
        }, initToolBar: function () {
            var trnode = document.getElementById("rightCommon");
            if (trnode) {
                trnode.parentNode.removeChild(trnode);
            }
            var toolBar = "<ul id='rightCommonUl' class='hide'>" + "<li id=''><ul id='rcTop'></ul></li>" + "<li ><ul id='rcMid'></ul></li>" + "<li><ul id='rc_phone'></ul></li>" + "<li style='position:absolute;top:540px;' id='RCU_doArea'><ul id='rcLastBtm'></ul></li>" + "<li style='position:absolute;bottom:20px;'><ul id='rcBtm'></ul></li>" + "</ul>";
            var toolBarBox = document.createElement("div");
            toolBarBox.className = "right_common";
            toolBarBox.id = "rightCommon";
            toolBarBox.innerHTML = toolBar;
            if (!document.getElementById("rightCommonCss")) {
                var toolBarCss = document.createElement("link");
                toolBarCss.href = "//ssl1.tuniucdn.com/s/2016091222/rightcommon/right_common.css";
                toolBarCss.type = "text/css";
                toolBarCss.rel = "stylesheet";
                toolBarCss.id = "rightCommonCss";
                document.getElementsByTagName("head")[0].appendChild(toolBarCss);
            }
            document.getElementsByTagName("body")[0].appendChild(toolBarBox);
            rightCommonUl = document.getElementById("rightCommonUl");
            rightCommonrcTop = document.getElementById("rcTop");
            rihtCommonPhone = document.getElementById("rc_phone");
            rightCommonrcMid = document.getElementById("rcMid");
            rightCommonrcBtm = document.getElementById("rcBtm");
            rightCommonrcLastBtm = document.getElementById("rcLastBtm");
        }, noProduct: function () {
            var pageType = document.getElementById("page_type") && document.getElementById("page_type").value;
            if (pageType == 250000 || pageType == 10000 || pageType == 230000 || pageType == 70000 || pageType == 40000 || pageType == 210002 || pageType == 130000 || pageType == 1860) {
                return 1;
            } else {
                return 0;
            }
        }, noKefuPage: function () {
            var pageType = document.getElementById("page_type") && document.getElementById("page_type").value;
            if (pageType == 250000 || pageType == 210002 || pageType == 130000) {
                return 1;
            } else {
                return 0;
            }
        }, getCookie: function (name) {
            var arr = document.cookie.split('; '), i = 0, len = arr.length;
            for (; i < len; i++) {
                var arr2 = arr[i].split('=');
                if (arr2[0] == name) {
                    return decodeURIComponent(arr2[1]);
                }
            }
            return '';
        }, getAdImg: function () {
            var data = ret.data;
            if (data.adArea) {
                var adImg = "<% if(data.adArea){ %><li class='' style='height:148px;cursor:pointer;'>" + "<% if(data.adArea.adUrl_small){ %><div class='rc_index'>" + "<a href='<%=data.adArea.adUrl %>' target='_blank'>" + "<img src='<%=data.adArea.adUrl_small %>' alt='' />" + "</a>" + "</div>" + "<div class='rc_box nopad'>" + "<span class='rc_arrow'>" + "<i class='triangle_border'>" + "<em></em>" + "</i>" + "</span>" + "<div class='rc_content'>" + "<a href='<%=data.adArea.adUrl %>' target='_blank'>" + "<img src='<%=data.adArea.adUrl_big %>' alt='' />" + "</a>" + "</div>" + "</div><%}%>" + "</li><%}%>";
                var listImg = _.template(adImg, {data: data});
                return getUnderscoreCompiledTemplate(listImg, {data: data});
            } else {
                return "";
            }
        }, getApp: function () {
            var data = ret.data;
            if (this.noProduct()) {
                var app = "<% if(data.appArea){ %><li style='height:42px;margin-top:20px;'>" + "<% if(data.appArea.appImgUrl){ %><div class='rc_index' style='cursor:pointer;'>" + "<p class='rc_app_box'>" + "<span class='rc_icon rc_app'></span>" + "</p>" + "</div>" + "<div class='rc_box rc_app_b nopad'>" + "<span class='rc_arrow'>" + "<i class='triangle_border'>" + "<em></em>" + "</i>" + "</span>" + "<div class='rc_content'>";
                if (data.appArea.appUrl) {
                    app += "<a href='<%=data.appArea.appUrl %>' target='_blank'>" + "<img src='<%=data.appArea.appImgUrl %>' alt='' />" + "</a>"
                } else {
                    app += "<img src='<%=data.appArea.appImgUrl %>' alt='' />";
                }
                app += "</div>" + "</div><%}%>" + "</li><%}%>";
                var listApp = _.template(app, {data: data});
                return getUnderscoreCompiledTemplate(listApp, {data: data});
            } else {
                return "";
            }
        }, reNoLogin: function () {
            var data = ret.data;
            var str = window.location.host;
            var domain = str.split(".")[0];
            var iframeSrc = 'https://passport.tuniu.com/login/iframe?origin=' + encodeURIComponent('http://www.tuniu.com/ssoConnect/Iframe?reload=' + domain);
            var reNLogin2 = "<% if(data.islogin != 1) {%><div class='rc_common_box nologin' style='width:378px;padding:0px; border:none; outline:none;'>"
                + "<iframe src='" + iframeSrc + "'  width='100%' height='352px' frameborder='0'>"
                + "</iframe>"
                + "</div><% } %>"
            var reNLogin = "<% if(data.islogin != 1) {%><div class='rc_common_box nologin'>" + "<div style='background-color:#fff;opacity:0.5;filter:alpha(opacity=50);width:236px;height:372px;position: absolute;top: 0;left: 0;display:none;' class='rcLoadingImg'></div>" + "<img src='http://img3.tuniucdn.com/img/20140922/common/loading-72x72.gif' class='rcLoadingImg' style='position:absolute;top:150px;left:82px;display:none;'>" + "<p class='show_error' id=''></p>" + "<dl class='rc_double_col rc_w_s clearfix'>" + "<dt>账号：</dt>" + "<dd></dd>" + "</dl>" + "<p class='account hide' class='subCookieName'>" + "<input type='text' class='rc_common_input' />" + "<span class='lenovo'>" + "<span class='nickName'></span><br>来自.tuniu.com的密码" + "</span>" + "</p>" + "<p><input type='text'tabindex=1 class='rc_common_input rcUserName' /></p>" + "<dl class='rc_double_col rc_w_s clearfix'>" + "<dt>密码：</dt>" + "<dd><a href='http://www.tuniu.com/u/get_password' target='_blank' class='rc_g_color'>找回密码</a></dd>" + "</dl>" + "<p><input type='password' tabindex=2 class='rc_common_input rcPassWord' /></p>" + "<dl class='rc_double_col rc_w_s clearfix'>" + "<dt>验证码：</dt>" + "<dd></dd>" + "</dl>" + "<dl class='rc_double_col clearfix'>" + "<dt><input type='text' tabindex=3 class='rc_common_input rc_small rcVerCode' /></dt>" + "<dd class='rc_pad_top'>" + "<img height='24' width='80' class='identify_img' alt='如验证码无法辨别，点击即可刷新。' align='absmiddle' onclick='' onload='' style='display: inline;' src=''>" + "<img src='http://img4.tuniucdn.com/img/20140911/rightcommon/refresh.jpg' alt='' class='change_img' align='absmiddle' height='24' width='24' style='display: inline;' />" + "</dd>" + "</dl>" + "<input class='rc_ableBtn' value='登录' type='button' / >" + "<dl class='rc_double_col rc_reg clearfix'>" + "<dt>首次登录，请先<a href='http://www.tuniu.com/u/register' target='_blank' class='rc_g_color'> 注册</a></dt>" + "<dd>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其他<a href='http://www.tuniu.com/u/login' target='_blank' class='rc_g_color'> 登录>></a></dd>" + "</dl>" + "</div><% } %>"
            var listNoLogin = _.template(reNLogin, {data: data});
            return getUnderscoreCompiledTemplate(listNoLogin, {data: data});
        }, getPreL: function () {
            var data = ret.data;
            var preL = "<li><a href='http://www.tuniu.com/u/club' target='_blank'><span class='right_icons tequan <%=name.userPrivilege_1 %>'></span></a></li>";
            var preLTmp = "<%_.each(data.myTuniu.userPrivilege,function(name){%>" + preL + "<% }) %>";
            return preLTmp;
        }, getMyTuniu: function () {
            var data = ret.data;
            var myTuniu = "<li class='mytuniuArea' style='padding:10px 0;cursorpointer;'>" + "<div class='rc_index'>" + "<p class=''>" + "<% if(data.islogin == 0){ %><a href='https://i.tuniu.com/' target='_blank'><span class='rc_icon rc_tuniu'></span></a><%}%>" + "<% if(data.islogin == 1){ if(data.myTuniu.userHeadImgUrl){%><a href='https://i.tuniu.com/' target='_blank'><img src='<%=data.myTuniu.userHeadImgUrl %>' style='width:32px;height:32px;margin:4px;background:none;border-radius:50%;' /></a><%}}%>" + "<% if(data.islogin == 1){ if(!data.myTuniu.userHeadImgUrl){%><a href='https://i.tuniu.com/' target='_blank'><img src='http://img3.tuniucdn.com/img/2014040901/user_center/g_touxiang.png' style='width:32px;height:32px;margin:4px;background:none;border-radius:50%;' /></a><%}}%>" + "</p>" + "</div>" + "<div class='rc_box nopad'>" + "<span class='rc_arrow'><i class='triangle_border'><em></em></i></span>"
                + "<% if(data.islogin == 1){ %><div class='rc_common_box'>" + "<div class='clearfix'>" + "<div class='rc_left'>" + "<div class='rc_user_img'>" + "<a href='https://i.tuniu.com/' target='_blank'>" + "<%if(data.myTuniu.userHeadImgUrl){ %><img src='<%=data.myTuniu.userHeadImgUrl %>' /></a><% } %>" + "<%if(!data.myTuniu.userHeadImgUrl){ %><img src='http://img3.tuniucdn.com/img/2014040901/user_center/g_touxiang.png' /></a><% } %>" + "</div> " + "</div>" + "<div class='rc_right'>" + "<p class='rc_user_wel'>欢迎您！</p>" + "<p class='rc_user_name'><a href='http://www.tuniu.com/u' target='_blank'><%=data.myTuniu.userName %></a></p>" + "</div>" + "</div>"
                + "<div class='rc_user_info'>" + "<dl class='rc_double_col clearfix'>" + "<dt>会员等级：<span style='display:none;' class='right_icons level level<%=data.myTuniu.userLevel %>'></span></dt>" + "<dd><a href='http://www.tuniu.com/u/club' target='_blank'>"
                + "<% if(data.myTuniu.userLevel == 0){%>普通会员<% }%><% if(data.myTuniu.userLevel == 1){%>一星会员<% }%><% if(data.myTuniu.userLevel == 2){%>二星会员<% }%><% if(data.myTuniu.userLevel == 3){%>三星会员<% }%><% if(data.myTuniu.userLevel == 4){%>四星会员<% }%><% if(data.myTuniu.userLevel == 5){%>五星会员<% }%><% if(data.myTuniu.userLevel == 6){%>白金会员<% }%><% if(data.myTuniu.userLevel == 7){%>钻石会员<% }%></a></dd>" + "</dl>" + "<dl style='display:none;' class='rc_double_col clearfix'>" + "<dt>会员特权：</dt>" + "<dd>"
                + "<div id='share_item_0' class='share_item'>" + "<div class='share_btn right_icons share_btn_prev'><</div>" + "<div class='share_btn right_icons share_btn_next'>></div>" + "<div class='share_scroll'>" + "<ul class='share_item_ul clearfix'>"
                + "<% if(data.myTuniu.tequan1){ %><li><a href='http://www.tuniu.com/u/club' target='_blank'><span class='right_icons tequan tequan1'></span></a></li><%}%>" + "<% if(data.myTuniu.tequan2){ %><li><a href='http://www.tuniu.com/u/club' target='_blank'><span class='right_icons tequan tequan2'></span></a></li><%}%>" + "<% if(data.myTuniu.tequan3){ %><li><a href='http://www.tuniu.com/u/club' target='_blank'><span class='right_icons tequan tequan3'></span></a></li><%}%>" + "<% if(data.myTuniu.tequan4){ %><li><a href='http://www.tuniu.com/u/club' target='_blank'><span class='right_icons tequan tequan4'></span></a></li><%}%>" + "<% if(data.myTuniu.tequan5){ %><li><a href='http://www.tuniu.com/u/club' target='_blank'><span class='right_icons tequan tequan5'></span></a></li><%}%>" + "<% if(data.myTuniu.tequan6){ %><li><a href='http://www.tuniu.com/u/club' target='_blank'><span class='right_icons tequan tequan6'></span></a></li><%}%>" + "<% if(data.myTuniu.tequan7){ %><li><a href='http://www.tuniu.com/u/club' target='_blank'><span class='right_icons tequan tequan7'></span></a></li><%}%>" + "<% if(data.myTuniu.tequan8){ %><li><a href='http://www.tuniu.com/u/club' target='_blank'><span class='right_icons tequan tequan8'></span></a></li><%}%>"
                + "</ul>" + "</div>" + "</div>"
                + "</dd>" + "</dl>"
                + "</div>" + "</div><% } %>"
                + this.reNoLogin()
                + "</div>"
                + "</li>";
            var listMyTuniu = _.template(myTuniu, {data: data});
            return getUnderscoreCompiledTemplate(listMyTuniu, {data: data});
        }, getLineList: function (t) {
            var data = ret.data;
            var lineList = "<li>" + "<dl class='rc_double_col rc_collect_li clearfix'>" + "<dt>" + "<a href='<%=name.prdUrl %>' target='_blank'>" + "<img src='<%=name.prdImg %>' alt='' />" + "</a>" + "</dt>" + "<dd>" + "<a href='<%=name.prdUrl %>' target='_blank'>" + " <%=name.prdName %>" + " </a>" + "<span class='rc_y_color'>&yen; <%=name.prdPrice %> 起</span>" + "</dd>" + "</dl>" + "</li>";
            if (t == 1) {
                var lineTmp = "<%_.each(data.myCollect.prd,function(name){%>" + lineList + "<% }) %>";
            } else {
                var lineTmp = "<%_.each(data.myCollect.prd,function(name){%>" + lineList + "<% }) %>";
            }
            return lineTmp;
        }, getCollect: function () {
            var data = ret.data;
            if (this.noProduct()) {
                var noline = this.getLineList(1) ? this.getLineList(1) : this.getLineList(0);
                var myCollect = "<li class='hoverClick'>"
                    + "<div class='rc_index'>" + "<p class='rc_topBot_b'>" + "<span class='rc_icon rc_collect'></span>" + "</p>" + "</div>"
                    + "<div class='rc_box nopad nobord rc_hover_event'>" + "<div class='rc_content'>" + "<p class='rc_des'>我的关注</p>" + "</div>" + "</div>" + "<div class='rc_box rc_click_event nopad'>" + "<span class='rc_arrow'><i class='triangle_border'><em></em></i></span>" + "<% if(data.islogin == 1){ %><div class='rc_common_box'>" + "<dl class='rc_double_col rc_mycol clearfix'>" + "<dt><div class='rc_btn_bord'>我的关注</div></dt>" + "<dd><a href='http://www.tuniu.com/u/collect_list' class='rc_g_color' target='_blank'>更多关注 &gt;</a></dd>" + "</dl>"
                    + "<% if(!data.myCollect.prd[0].prdUrl){ %><p class='rc_nocollect right_icons'>" + "<span>暂无关注哦～</span><br />喜欢就点右侧工具栏的<br />按钮进行关注吧～" + "</p><%}%>"
                    + "<% if(data.myCollect.prd[0].prdUrl){ %><ul class='rc_collect_box'>" + noline + "</ul><% } %>"
                    + "</div><% } %>"
                    + this.reNoLogin()
                    + "</div>"
                    + " </li>";
                return getUnderscoreCompiledTemplate(_.template(myCollect, {data: data}), {data: data});
            } else {
                return "";
            }
        }, getScoreList: function () {
            var data = ret.data;
            var scoreList = "<div class='right_tagContent' id='rtagContent0'>" + "<div class='pic'><a href='<%=name.url %>' target='_blank'><img src='<%=name.img_url %>' /></a></div>" + "<div class='name'><a href='<%=name.url %>' target='_blank'><%=name.name %></a></div>" + "<div class='price clearfix'>" + "<% if(name.prdPrice){ %><span>&yen;<em><%=name.prdPrice %></em>起</span><%}%><% if(name.prdSheng){ %><span class='right_icons icon'><%=name.prdSheng %></span><%}%>" + "</div>" + "</div>";
            return "<%_.each(data.myScore.ads,function(name){%>" + scoreList + "<% }) %>";
        }, myScore: function () {
            var data = ret.data;
            if (this.noProduct()) {
                var myScoreList = "<li class='hoverClick' style='display:none;'>"
                    + "<div class='rc_index'>" + "<p class='rc_topBot_b'><span class='rc_icon rc_jifen'></span></p>" + "</div>" + "<div class='rc_box nopad nobord rc_hover_event'>" + "<div class='rc_content'><p class='rc_des'>我的积分</p></div>" + " </div>" + "<div class='rc_box rc_click_event nopad'>" + "<span class='rc_arrow'><i class='triangle_border'><em></em></i></span>"
                    + "<% if(data.islogin == 1){ %><div class='rc_common_box'>"
                    + "<p class='rc_check_info'>可用积分：<span class='rc_y_color'><%=data.myScore.leftScore %></span> &nbsp;&nbsp;&nbsp;&nbsp;即将过期：<span class='rc_y_color'><%=data.myScore.expiredPoint %></span></p>" + "<dl class='rc_double_col rc_mycol clearfix'>" + "<dt><div class='rc_btn_bord'>积分享优惠</div></dt>" + "<dd>" + "<a href='http://www.tuniu.com/u/club' class='rc_g_color' target='_blank'>会员俱乐部 &gt;</a>" + "</dd>" + "</dl>" + "<% if(data.myScore.ads[0].url){ %><div class='rc_jifen_box'>"
                    + "<div id='right_con'>" + "<div id='right_tagContent'>"
                    + this.getScoreList() + "</div>"
                    + "</div>"
                    + "</div><%}%>" + "</div><%}%>"
                    + this.reNoLogin()
                    + "</div>"
                    + "</li>";
                return getUnderscoreCompiledTemplate(_.template(myScoreList, {data: data}), {data: data});
            } else {
                return "";
            }
        }, myOrderList: function () {
            var data = ret.data;
            var order_list = "<%_.each(data.myOrder.list,function(name){ %><li>" + "<dl class='rc_double_col rc_route_w clearfix'>" + " <dt><a href='<%=name.product_url %>' target='_blank'><%=name.route_name%></a><span class='rc_y_color'><%=name.group_cost %>起</span></dt>" + "<dd>" + "<a class='<% if(name.url){ %>rc_g_color<%}%>' <% if(name.url){ %> href='<%=name.url%>' <%}%><% if(!name.url){ %>href='javascript:void(0)' <%}%> ><%=name.pay_status_name %></a>"
                + "</dd>" + "</dl>" + "</li><%})%>";
            return order_list;
        }, getOrder: function () {
            var data = ret.data;
            if (this.noProduct()) {
                return '<li>' + '<div class="rc_index">' + '<p class="rc_topBot_b">' + '<a href="http://www.tuniu.com/u/order" target="_blank">' + '<span class="rc_icon rc_order"></span>' + '</a>' + '</p>' + '</div>' + '<div class="rc_box nopad nobord rc_hover_event">' + '<div class="rc_content">' + '<p class="rc_des">' + '<a href="http://www.tuniu.com/u/order" target="_blank" style="display:block;width:60px;height:41px;color:#f80;">我的订单</a>' + '</p>' + '</div>' + '</div>' + '</li>';
            } else {
                return "";
            }
        }, myListInfor: function () {
            var data = ret.data;
            var listNum = "<%if(data.islogin == 1 && data.myMessage.sum>0){ _.each(data.myMessage.prd,function(name){ %><li>" + "<% if(data.islogin == 1 && data.myMessage.sum>0){ %><dl class='rc_double_col rc_route_w clearfix'>" + "<dt><a href='<%=name.orderUrl %>' target='_blank'><%=name.orderName %></a></dt>" + "<dd>" + "<span class='rc_red_tips'><%=name.unreadMsgCount %>条</span>" + "</dd>" + "</dl><%}%>" + "</li><%})} else {%>暂无新消息<%}%>";
            return listNum;
        }, myMsgTemplate: function () {
            return listNum = "<%_.each(myMessage.prd,function(name){ %><li>" + "<dl class='rc_double_col rc_route_w clearfix'>" + "<dt><a href='<%=name.orderUrl %>' target='_blank'><%=name.orderName %></a></dt>" + "<dd>" + "<span class='rc_red_tips'><%=name.unreadMsgCount %>条</span>" + "</dd>" + "</dl>" + "</li><%})%>";
        }, getListInfor: function () {
            var data = ret.data;
            var numOfList = "<li class='hoverClick'>" + "<% if(data.islogin == 1 && data.myMessage.sum>0){ %><span class='rc_kefutip_num' id='J_RightCommonMsgNum'><%= data.myMessage.sum %></span><%}%>" + "<div class='rc_index'>" + "<p class='rc_topBot_b'><span class='rc_icon rc_kefutips'></span></p></div>" + "<div class='rc_box nopad nobord rc_hover_event'>" + "<div class='rc_content'>" + "<p class='rc_des'>消息提醒</p>" + "</div>" + "</div>" + "<div class='rc_box rc_click_event nopad'>" + "<span class='rc_arrow'>" + "<i class='triangle_border'>" + "<em></em></i></span>" + "<% if(data.islogin == 1){ %><div class='rc_common_box'>" + "<dl class='rc_double_col rc_mycol clearfix'>" + "<dt><div class='rc_btn_bord'>我的消息提醒</div></dt>" + "<dd></dd></dl>" + "<div class='rc_order_box'>" + "<ul class='rc_order_lists' id='J_RightCommonMsgList'>" + this.myListInfor() + "</ul>" + "</div></div></div></li><%}%>" + "<% if(data.islogin != 1){ %>" + this.reNoLogin() + "<%}%>";
            return getUnderscoreCompiledTemplate(_.template(numOfList, {data: data}), {data: data});
        }, getQA: function () {
            var url = 'http://www.sojump.com/jq/7884840.aspx', name = '问卷调查';
            var now = new Date().getTime(), expiredTime = new Date(1468771200000);
            if (now < expiredTime) {
                url = 'http://form.mikecrm.com/ikswqT';
            }
            var myQA = "<li class=''>"
                + "<div class='rc_index'>" + "<p class='rc_topBot_b'>" + "<a href='" + url + "' target='_blank'><span class='rc_icon rc_qa'></span></a>" + "</p>" + "</div>" + "<div class='rc_box nopad nobord rc_hover_event'>" + "<div class='rc_content'>" + " <p class='rc_des'><a href='" + url + "' target='_blank' style='display:block;width:60px;height:41px;color:#f80;'>" + name + "</a></p>" + "</div>" + "</div>"
                + "</li>";
            return myQA;
        }, getCompList: function () {
            var data = ret.data;
            var compList = "<li>" + "<dl class='rc_double_col rc_compare_li clearfix'>" + "<dt><a href='' target='_blank'></a></dt>" + "<dd ><a href='' class='rc_y_color'>×</a></dd>" + "</dl>" + "</li> ";
            var compLineTmp = "<%_.each(data.myGift.gifts,function(name){%>" + compList + "<% }) %>";
            return compLineTmp;
        }, myCompare: function () {
            var data = ret.data;
            if (!this.noProduct()) {
                var myCompList = "<li class='hoverClick' style='cursor:pointer;' id='compareBox'>"
                    + "<div class='rc_index'>" + "<p class='rc_topBot_b'>" + "<span class='rc_icon rc_compare' id='addToCompareList'></span>" + "</p>" + "</div>" + "<div class='rc_box nopad nobord rc_hover_event'>" + "<div class='rc_content'>" + "<p class='rc_des'>我的对比</p>" + "</div>" + "</div>" + "<div class='rc_box rc_click_event nopad'>" + "<span class='rc_arrow'><i class='triangle_border'><em></em></i></span>" + "<div class='rc_common_box'>" + "<dl class='rc_double_col rc_mycol clearfix'>" + "<dt><div class='rc_btn_bord'>对比</div></dt>" + "<dd><a href='javascript:void(0)' class='rc_g_color' id='clearComPareList'>清空</a></dd>" + "</dl>"
                    + "<img src='http://img4.tuniucdn.com/img/20140914/rightcommon/no_complist.gif' alt='' id='comPareImg' />"
                    + "<ul class='rc_compare_box' id='comPareList'>"
                    + "</ul>" + "</div> " + "</div>"
                    + "</li>";
                return myCompList;
            } else {
                return "";
            }
        }, getArchList: function () {
            var data = ret.data;
            var archList = "<li>" + "<dl class='rc_double_col rc_collect_li clearfix'>" + "<dt>" + "<% if(name.giftUrl){ %><a href='<%=name.giftUrl %>' target='_blank'>" + "<img src='<%=name.giftImg %>' alt='' />" + "</a><%}%>" + "</dt>" + "<dd>" + "<a href='<%=name.giftUrl %>' target='_blank'>" + " <%=name.giftName %>" + " </a>"
                + "</dd>" + "</dl>" + "</li>";
            var archLineTmp = "<%_.each(data.myGift.gifts,function(name){%>" + archList + "<% }) %>";
            return archLineTmp;
        }, myArch: function () {
            var data = ret.data;
            if (this.noProduct()) {
                var myArchList = "<li class='hoverClick'>"
                    + "<div class='rc_index'>" + "<p class='rc_topBot_b'><span class='rc_icon rc_quan'></span></p>" + "</div>" + "<div class='rc_box nopad nobord rc_hover_event'>" + "<div class='rc_content'><p class='rc_des'>我的礼券</p></div>" + "</div>" + "<div class='rc_box rc_click_event nopad'>" + "<span class='rc_arrow'><i class='triangle_border'><em></em></i></span>" + "<%if(data.islogin == 1) {%><div class='rc_common_box'>"
                    + "<dl class='rc_double_col rc_mycol clearfix'>" + "<dt><div class='rc_btn_bord'>礼券信息</div></dt>" + "<dd><a href='http://www.tuniu.com/u' class='rc_g_color' target='_blank'>更多礼券 &gt;</a></dd>" + "</dl>"
                    + "<ul class='clearfix rc_two_col'>" + "<li>旅游券：<span class='rc_y_color'>&yen;<%=data.myGift.lvyouquan%></span></li>" + "<li>抵用券：<span class='rc_y_color'>&yen;<%=data.myGift.diyongquan%></span></li>" + "<li>现金账户：<span class='rc_y_color'>&yen;<%=data.myGift.cash%></span></li><li><a href='https://jr.tuniu.com/exweb/charge/' target='_blank' style='padding: 3px 15px; background: #f80; color: white;'>去充值</a></li>" + "</ul>"
                    + "</div><%}%>"
                    + this.reNoLogin()
                    + "</div>"
                    + "</li>";
                return getUnderscoreCompiledTemplate(_.template(myArchList, {data: data}), {data: data});
            } else {
                return "";
            }
        }, getParter: function () {
            var c_name = "tuniu_partner";
            return this.getCookieByName(c_name);
        }, getCookieByName: function (c_name) {
            if (document.cookie.length > 0) {
                var c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    var c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) {
                        c_end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return "";
        }, getTelNum: function () {
            var c_name = 'p_phone_400';
            return this.getCookieByName(c_name) || '4007-999-999';
        }, getPhone: function () {
            var page_type = document.getElementById("page_type").value;
            if (!this.noProduct()) {
                var tuniuNum = $(".tuniu_400_num").html();
                var isShowPhone = $("#phow_show");
                var isShowPhoneVal = isShowPhone.val();
                if (page_type > 5000000 && page_type < 8000000) {
                    isShowPhoneVal = 1;
                }
                if (isShowPhoneVal == 1) {
                    if (!tuniuNum) {
                        tuniuNum = this.getTelNum();
                    }
                    var phone = "<li class='hoverClick' style='cursor:pointer;'>"
                        + "<div class='rc_index'>" + "<p class='rc_topBot_b'>" + "<span class='rc_icon rc_phone'></span>" + "</p>" + "</div>" + "<div class='rc_box nopad nobord rc_hover_event'>" + "<div class='rc_content'>" + "<p class='rc_des'>电话预订</p>" + "</div>" + "</div>" + "<div class='rc_box rc_click_event pd_5'>" + "<span class='rc_arrow'><i class='triangle_border'><em></em></i></span>" + "<div class=''>" + "<img src='http://img4.tuniucdn.com/img/20140809/rightcommon/24hours.jpg' alt='' />" + "<p class='rc_order_phone'>" + tuniuNum + "</p>" + "</div>" + "</div>"
                        + "</li>"
                    return phone;
                } else {
                    return "";
                }
            } else {
                return "";
            }
        }, getKefu: function () {
            var data = ret.data;
            var self = this;
            var kefu = '';
            var is_kefu = document.getElementById("kefu_show");
            var listNoLogin = '<p class="rc_des">在线客服</p>';
            var localTime = new Date().getHours().toLocaleString();
            var numTime = parseInt(localTime, 10);
            var kefuType = 'live800';
            if ((numTime >= 8 && numTime < 23)) {
                if (!this.noKefuPage()) {
                    kefu = "<li class='' id='onlineKefu' onclick=\"_gaq.push(['_trackEvent','在线客服按钮_1','','']);\">"
                        + "<div class='rc_index' style='cursor:pointer;'>"
                        + "<p class='rc_topBot_b' style='border-bottom:none;'>"
                        + "<a href='javascript:void(0)' id='" + kefuType + "'><span class='rc_icon rc_online'></span></a>"
                        + "</p>"
                        + "</div>" + "<div class='rc_box nopad nobord rc_hover_event'>"
                        + "<div class='rc_content'>" + listNoLogin
                        + "</div>" + "</div>"
                        + "</li>";
                } else {
                    kefu = "";
                }
            } else {
                kefu = "";
            }
            if (!is_kefu) {
                kefu = "";
            }
            if (window.TNCHAT_isShowChatEntry) {
                window.TNCHAT_isShowChatEntry({
                    entryTemplateId: KEFU_TEMPLATE_ID,
                    productId: currentPageData.productId,
                    productType: currentPageData.productType,
                    userId: self.getCookie('tuniuuser_id') || -1,
                    ct: 100
                }, function (res) {
                    if (!res.status) return;
                    if ($.isFunction(currentPageData.success)) {
                        try {
                            currentPageData.success({url: decodeURIComponent(res.url)});
                            $(".site_contact").css({
                                "background-image": "url(//ssl1.tuniucdn.com/img/2016090720/header/site_contact_bg.png)",
                                "background-position": "left bottom"
                            });
                        } catch (err) {
                        }
                    }
                    $(document).off('click.loginPassport', '.headTuniuKefu, .online_btn').on('click.loginPassport', '.headTuniuKefu, .online_btn', function (e) {
                        $('#onlineKefu').trigger('click.openKefuWindow');
                    }).off('click.closeLoginPassport').on('click.closeLoginPassport', function (e) {
                        if (!$(e.target).hasClass('online_btn') && $(e.target).parents('.online_btn').length < 1 && !$(e.target).hasClass('u_order_tip') && $(e.target).parents('.u_order_tip').length < 1) {
                            $('.order_now .rc_box').remove();
                            $('.u_order_tip .rc_box').remove();
                        }
                    });
                    kefuType = 'tuniuKefu';
                    if ($('#onlineKefu').length > 0) {
                        $('#onlineKefu #live800').attr('id', kefuType);
                    } else {
                        var kefu = "<li class='' id='onlineKefu' onclick=\"_gaq.push(['_trackEvent','在线客服按钮_1','','']);\">"
                            + "<div class='rc_index' style='cursor:pointer;'>"
                            + "<p class='rc_topBot_b' style='border-bottom:none;'>"
                            + "<a href='javascript:void(0)' id='" + kefuType + "'><span class='rc_icon rc_online'></span></a>"
                            + "</p>"
                            + "</div>" + "<div class='rc_box nopad nobord rc_hover_event'>"
                            + "</div>" + "</li>";
                        $('#rc_phone').append(kefu);
                    }
                    $(document).on('click.openKefuWindow', '#onlineKefu', function (e) {
                        window.open(decodeURIComponent(res.url));
                    })
                })
            }
            return kefu;
        }, getSaoma: function () {
            var data = ret.data;
            if (data.myCode) {
                var Saoma = "<%if(data.myCode){%><li class='hoverClick'>"
                    + "<div class='rc_index'>" + "<p class='rc_topBot_b'>" + "<span class='rc_icon rc_scan'></span>" + "</p>" + "</div>" + "<div class='rc_box nopad nobord rc_hover_event'>" + "<div class='rc_content'>" + "<p class='rc_des'>扫码预订</p>" + "</div>" + "</div>" + "<div class='rc_box rc_click_event pd_5'>" + "<span class='rc_arrow'><i class='triangle_border'><em></em></i></span>" + "<div class=''>" + "<img src='<%=data.myCode.erweima %>' />" + "<p class='rc_scan_des'>信扫码预订<br>点评多返5元</p>" + "</div>" + "</div>"
                    + "</li><%}%>";
                return getUnderscoreCompiledTemplate(_.template(Saoma, {data: data}), {data: data});
            } else {
                return "";
            }
        }, addToCollect: function () {
            var page_type = document.getElementById("page_type").value;
            if (page_type == 92000) return "";
            if (page_type == 32000) return "";
            if (!this.noProduct()) {
                var addToCollectList = "<li class='' id='doAddToCollect'>"
                    + "<div class='rc_index'>" + "<p class='rc_topBot_b'>" + "<span class='rc_icon rc_addCollect'></span>" + "</p>" + "</div>" + "<div class='rc_box nopad nobord rc_hover_event'>" + "<div class='rc_content'>" + "<p class='rc_des'>加入关注</p>" + "</div>" + "</div>"
                    + "</li>";
                return addToCollectList;
            } else {
                return "";
            }
        }, addAdvise: function () {
            var data = ret.data;
            if (data.myAdvise) {
                var myAdvise = "<li class=''>"
                    + "<div class='rc_index'>" + "<p class='rc_topBot_b'>" + "<a href='http://www.tuniu.com/corp/advise.shtml' target='_blank'><span class='rc_icon rc_advise'></span></a>" + "</p>" + "</div>" + "<div class='rc_box nopad nobord rc_hover_event'>" + "<div class='rc_content'>" + " <p class='rc_des'><a href='http://www.tuniu.com/corp/advise.shtml' target='_blank' style='display:block;width:60px;height:41px;color:#f80;'>意见建议</a></p>" + "</div>" + "</div>"
                    + "</li>";
                return myAdvise;
            } else {
                return "";
            }
        }, backToTop: function () {
            var backTop = "<li class='rcBackToTopSty' id='rcBackToTop'>"
                + "<div class='rc_index'>" + "<p class='rc_topBot_b'>" + "<span class='rc_icon rc_backtotop' id=''></span>" + "</p>" + "</div>" + "<div class='rc_box nopad nobord rc_hover_event'>" + "<div class='rc_content'>" + "<p class='rc_des'>返回顶部</p>" + "</div>" + "</div>"
                + "</li>";
            return backTop;
        }
    }
    var ret = {getLoginInfor: getLoginInfor, rightCommon: rightCommon, data: data};
    return ret;
});
;define('rightcommon_amd/getdata', ['jquery', 'underscore', 'rightcommon_amd/main_prd', 'common_amd/tat'], function ($, _, main_prd, tat) {
    var checkIsLogin = checkIsLogin || [];
    var compName = window.compName || [];
    var clearTim = clearTim || "";
    var _protocol = window.location.protocol;
    var checkLogin = {
        init: function () {
            this.submitInfor();
        }, rcUserName: "", rcPassWord: "", rcVerCode: "", reTemp: 1, doAddToCollect: function () {
            $(document).ready(function () {
                var url = window.DEBUG ? (_protocol + "//www.tuniu.org/yii.php?r=api/attention/getSingleAttentionInfo") : (_protocol + "//www.tuniu.com/yii.php?r=api/attention/getSingleAttentionInfo");
                var days = $('#journeyDays').val();
                days = days == null ? 0 : days;
                $.ajax({
                    url: url,
                    dataType: "jsonp",
                    jsonp: "callFuc",
                    data: {routeId: $("#route_id_tmp").val(), days: days},
                    success: function (data) {
                        $("#focus_num").text(data + PageData.focusNum);
                    }
                });
                var url2 = window.DEBUG ? (_protocol + "//www.tuniu.org/yii.php?r=api/attention/isAttention") : (_protocol + "//www.tuniu.com/yii.php?r=api/attention/isAttention");
                $.ajax({
                    url: url2,
                    dataType: "jsonp",
                    jsonp: "callFuc",
                    data: {routeId: $("#route_id_tmp").val()},
                    success: function (data) {
                        $("#favorite_id_rc").removeClass("bg_focus_normal bg_focus_click");
                        switch (data) {
                            case 1:
                                $("#favorite_id_rc").addClass("bg_focus_normal");
                                $("#favorite_id_rc").text("关注");
                                break;
                            case 2:
                                $("#favorite_id_rc").addClass("bg_focus_click");
                                $("#favorite_id_rc").text("已关注");
                                break;
                            case 4:
                                $("#favorite_id_rc").addClass("bg_focus_normal");
                                $("#favorite_id_rc").text("关注");
                                break;
                        }
                    }
                });
            });
            $(window).on("bg_focus_clicked bg_box_foucs_clicked", function (e) {
                var target = $("#focus_num");
                var offset = $(target).offset();
                var oneElt = $("<div></div>").addClass("plus_one").css({
                    top: offset.top - $(window).scrollTop(),
                    left: offset.left + (($(target).width() - 24) / 2)
                });
                $(document.body).append(oneElt);
                $(oneElt).animate({top: "-=30"}).fadeOut(function () {
                    $(oneElt).remove();
                });
            });
            $("#favorite_id_rc").mouseenter(function () {
                var isNormal = $(this).hasClass("bg_focus_normal");
                if (isNormal) {
                    $(this).removeClass("bg_focus_normal");
                    $(this).addClass("bg_focus_hover");
                }
            }).mouseleave(function () {
                var isHover = $(this).hasClass("bg_focus_hover");
                if (isHover) {
                    $(this).removeClass("bg_focus_hover");
                    $(this).addClass("bg_focus_normal");
                }
            });
            var __this = this;
            var doAddToCollect = $("#favorite_id_rc");
            doAddToCollect.click(function () {
                window._gaq = window._gaq || [];
                window._gaq.push(['_trackEvent', '[产品页]', '[浮动层点击]', '[加入收藏]']);
                var addbtn = $("#favorite_id_rc");
                __this.clickAddScroll();
            });
        }, clickAddScroll: function () {
            var __this = this;
            var routeId = $("#route_id_tmp").val(), days = $('#journeyDays').val();
            if ($("#favorite_id_rc").hasClass("bg_focus_click")) {
                $('#delete_collcet_id').show();
                $('#collcet_id').hide();
                return;
            }
            var url = window.DEBUG ? (_protocol + "//www.tuniu.org/yii.php?r=api/attention/attention") : (_protocol + "//www.tuniu.com/yii.php?r=api/attention/attention");
            $.ajax({
                url: url,
                dataType: "jsonp",
                jsonp: "callFuc",
                data: {routeId: routeId, days: days},
                success: function (data) {
                    switch (data) {
                        case 1:
                            __this.disClick();
                            $('#collcet_id').show();
                            $('#delete_collcet_id').hide();
                            break;
                        case 2:
                            break;
                        case 3:
                            alert('添加关注失败!');
                            break;
                        case 4:
                            $('#login_id').show();
                            break;
                    }
                }
            });
        }, disClick: function () {
            var addBtn = $("#favorite_id_rc");
            $(addBtn).trigger("bg_focus_clicked");
            $(addBtn).removeClass("bg_focus_hover");
            $(addBtn).addClass("bg_focus_click");
            $(addBtn).text("已关注");
            var value = parseInt($("#focus_num").text());
            $("#focus_num").text(value + 1);
        }, addToDoCom: function () {
            var __this = this;
            $("#addToComp").mouseenter(function () {
                var isNormal = $(this).hasClass("bg_compare_normal");
                if (isNormal) {
                    $(this).removeClass("bg_compare_normal");
                    $(this).addClass("bg_compare_hover");
                }
            }).mouseleave(function () {
                var isHover = $(this).hasClass("bg_compare_hover");
                if (isHover) {
                    $(this).removeClass("bg_compare_hover");
                    $(this).addClass("bg_compare_normal");
                }
            });
            $("#addToComp").click(function () {
                __this.addToCompareList();
            });
        }, showCompareList: function () {
            var __this = this;
            var routeIds = this.getCookie("_compare");
            if (routeIds != '') {
                __this.get_compare_info(routeIds);
            }
        }, showCompareBox: function () {
            var rightCommon = $("#rightCommon");
            var __w_width = $(window).width();
            if (__w_width <= 1280) {
                rightCommon.addClass("mouse_over");
            }
            var compareBox = $("#compareBox");
            var __this_rc_box = compareBox.find(".rc_click_event");
            var __this_rc_arrow = compareBox.find(".rc_arrow");
            var __this_scroll_top = parseInt($(window).scrollTop());
            if (__this_rc_box.length) {
                var __window_height = parseInt($(window).height());
                var __this_off_top = parseInt(compareBox.offset().top) - __this_scroll_top;
                var __this_rc_box_top = parseInt(__this_rc_box.height());
                if ((__this_off_top + __this_rc_box_top) > __window_height) {
                    var __off_top = __this_off_top + __this_rc_box_top - __window_height;
                    __this_rc_box.css("top", -__off_top);
                    __this_rc_arrow.css("top", 20 + __off_top);
                } else {
                    __this_rc_box.css("top", 0);
                    __this_rc_arrow.css("top", 20);
                }
            }
            compareBox.addClass("rc_click");
        }, addToCompareList: function () {
            var __this = this;
            var routeIds = this.getCookie("_compare");
            if (routeIds != '') {
                routeIds = routeIds + ',';
            }
            var routeId = $('#route_id_tmp').val();
            if (routeIds.indexOf(routeId) == -1) {
                routeIds += routeId + ',';
            } else {
                __this.showCompareBox();
                __this.showCompareTips("此商品已在对比栏中，不需要重复添加哦。");
                return false;
            }
            var comma_count = (routeIds.split(',')).length - 1;
            if (comma_count > 3) {
                __this.showCompareBox();
                __this.showCompareTips("最多只可以对比三条线路");
                return false;
            }
            routeIds = routeIds.substr(0, routeIds.length - 1);
            document.cookie = "_compare =" + routeIds + ";path=/;domain=.tuniu.com";
            this.get_compare_info(routeIds);
            __this.showCompareBox();
        }, showCompareTips: function (t) {
            var compareContTips = $("#compareContTips");
            compareContTips.html(t);
        }, get_compare_info: function (routeIds) {
            var comPareImg = document.getElementById("comPareImg");
            var __this = this;
            if (routeIds == '') {
                if (comPareImg) comPareImg.style.display = "none";
                return false;
            }
            var comPareList = document.getElementById("comPareList");
            var base_url = _protocol + "//www.tuniu.com";
            var url = base_url + '/yii.php?r=toursAjax/getInfo/routeIds/' + routeIds + '&jsoncallback=?';
            $.getJSON(url, function (r) {
                compName = r;
                var compModuel = [{"id": "", "showName": ""}]
                window.compName = compName = $.extend(true, [], compModuel, compName);
                var compList = "<li>" + "<dl class='rc_double_col rc_compare_li clearfix'>" + "<dt><a href='http://www.tuniu.com/tours/<%=name.id%>' target='_blank'><%=name.showName%></a></dt>" + "<dd ><a href='javascript:void(0)' class='rc_y_color clearThisItem' data='<%=name.id%>' >×</a></dd>" + "</dl>" + "</li> ";
                var compLineTmp = "<%_.each(compName,function(name){%>" + compList + "<% }) %>";
                var compLineBtn = "<li><p style='color:#ff0000;font-size:16px;' id='compareContTips'></p><input class='rc_ableBtn' id='gotoContrast' value='马上对比' type='button' style='margin-top:15px;' / ></li>"
                if (comPareImg) comPareImg.style.display = "none";
                var compALsit = _.template(compLineTmp, compName);
                compALsit += compLineBtn;
                if (comPareList) comPareList.innerHTML = compALsit;
                checkLogin.delOneItem();
                checkLogin.delAllCompareL();
                checkLogin.gotocontrast();
                var gotoContrast = document.getElementById('gotoContrast');
                if (compName.length > 1 && gotoContrast) {
                    gotoContrast.className = 'rc_ableBtn';
                } else if (gotoContrast) {
                    gotoContrast.className = 'rc_ableBtn disable';
                }
            });
        }, getCookie: function (c_name) {
            if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) {
                        c_end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return "";
        }, delCookie: function (name) {
            var date = new Date();
            date.setTime(date.getTime() - 10000);
            document.cookie = name + "=a; expires=" + date.toGMTString() + ";path=/;domain=.tuniu.com";
        }, delAllCompareL: function () {
            var __this = this;
            var clearComPareList = $("#clearComPareList");
            var comPareList = $("#comPareList");
            var goToContrast = $("#gotoContrast");
            clearComPareList.click(function () {
                comPareList.find("li").not(goToContrast).remove();
                goToContrast.addClass("disable");
                __this.delCookie("_compare");
                __this.get_compare_info("");
            });
        }, delOneItem: function () {
            var __this = this;
            var goToContrast = $("#gotoContrast");
            var comPareList_li = $("#comPareList").find("li").not(goToContrast);
            var routeIds_cookie_tem = this.getCookie("_compare");
            if (routeIds_cookie_tem != '') {
                routeIds_cookie_tem = routeIds_cookie_tem + ',';
            }
            comPareList_li.each(function (i, n) {
                $(n).find(".clearThisItem").click(function () {
                    $(n).remove();
                    var _this_data = $(this).attr("data");
                    if (typeof(_this_data) != 'undefined') {
                        if (routeIds_cookie_tem.indexOf(_this_data) != -1) {
                            routeIds_cookie_tem = routeIds_cookie_tem.replace(_this_data + ',', '')
                        }
                    }
                    routeIds_cookie_tem = routeIds_cookie_tem.substr(0, routeIds_cookie_tem.length - 1)
                    document.cookie = "_compare =" + routeIds_cookie_tem + ";path=/;domain=.tuniu.com";
                    __this.get_compare_info(routeIds_cookie_tem);
                });
            })
        }, gotocontrast: function () {
            var __this = this;
            var routeIds = __this.getCookie("_compare");
            var gotoContrast = $("#gotoContrast");
            gotoContrast.click(function () {
                if (!$(this).hasClass("disable")) {
                    window.open('http://www.tuniu.com/routecompare/' + routeIds);
                }
            });
        }, getUserInfo: function (t) {
            if (!t.length) return false;
            this.rcUserName = t.find(".rcUserName").val().replace(/^\s+|\s+$/g, "");
            this.rcPassWord = t.find(".rcPassWord").val().replace(/^\s+|\s+$/g, "");
            this.rcVerCode = t.find(".rcVerCode").val().replace(/^\s+|\s+$/g, "");
        }, showErrormsg: function (t, m) {
            t.find(".show_error").html(m);
        }, checkUserName: function (t) {
            this.getUserInfo(t);
            if (this.rcUserName != "") {
                this.showErrormsg(t, "");
                this.reTemp = 1;
                return true;
            } else {
                this.showErrormsg(t, "请填写用户名");
                this.reTemp = 0;
                return false;
            }
        }, checkPasswWord: function (t) {
            this.getUserInfo(t);
            if (this.rcPassWord != "") {
                this.showErrormsg(t, "");
                this.reTemp = 1;
                return true;
            } else {
                this.showErrormsg(t, "请填写密码");
                this.reTemp = 0;
            }
        }, checkVerCode: function (t) {
            this.getUserInfo(t);
            var _this = this;
            if (this.rcVerCode == "") {
                this.reTemp = 0;
                return false;
            }
            var url = "/main.php?do=user_reg_check_name&num=100&identify=" + this.rcVerCode + "&flag=identify2&cache=" + Math.random();
            $.get(url, function (data_2) {
                if (data_2 == 2) {
                    _this.showErrormsg(t, '验证码填写有误');
                    return false;
                }
                _this.showErrormsg(t, '');
                _this.reTemp = 1;
                return true;
            });
        }, submitInfor: function () {
            __this = this;
            var rightCommonUl = $("#rightCommonUl").find("ul li");
            rightCommonUl.each(function (i, n) {
                var _this = $(n);
                _this.find(".rcUserName").blur(function () {
                    __this.checkUserName(_this);
                });
                _this.find(".rcPassWord").blur(function () {
                    __this.checkPasswWord(_this);
                });
                _this.find(".rc_ableBtn").click(function () {
                    _this.find(".rc_ableBtn").attr("disabled", "disabled");
                    if (__this.reTemp) {
                        __this.checkUserName(_this);
                    }
                    if (__this.reTemp) {
                        __this.checkPasswWord(_this);
                    }
                    if (!__this.reTemp) return false;
                    var url = '/main.php?do=user_reg_check_name&cache=' + Math.random();
                    __this.getUserInfo(_this);
                    var p = {
                        'username': __this.rcUserName,
                        'password': __this.rcPassWord,
                        'identify': __this.rcVerCode,
                        'needReturn': 1
                    }
                    _this.find(".rcLoadingImg").show();
                    var url = '/main.php?do=order_login_ajax&flag=login&t=' + Math.random();
                    $.post(url, p, function (json) {
                        if (!json.success) {
                            _this.find(".rcLoadingImg").hide();
                            var errorMsg = '您输入的账号或密码或验证码不正确';
                            if (undefined != json.msg) {
                                errorMsg = json.msg;
                            }
                            __this.showErrormsg(_this, errorMsg);
                            _this.find(".rc_ableBtn").removeAttr("disabled");
                            getData.changeVcode();
                            return false;
                        } else {
                            __this.showErrormsg(_this, '');
                            getData.init();
                        }
                    }, 'json');
                });
            });
        }, hasLogined: function () {
            rightCommon.init();
        }
    };
    var data;
    var getLoginInfor = main_prd.getLoginInfor;
    var rightCommon = main_prd.rightCommon;
    var loopDuration = 60000;
    var currentPageData;

    function cjCallback(result) {
        var save_data = result;
        var default_data = {
            "islogin": "",
            "adArea": {"adUrl": "", "adUrl_small": "", "adUrl_big": ""},
            "myTuniu": {
                "userHeadImgUrl": "",
                "userName": "",
                "userLevel": "",
                "userPrivilege": [{"userPrivilege_1": ""}]
            },
            "myCollect": {"prd": [{"prdUrl": "", "prdImg": "", "prdName": "", "prdPrice": ""}]},
            "myScore": {
                "ads": [{
                    "prdUrl": "",
                    "prdImg": "",
                    "prdName": "",
                    "prdPrice": "",
                    "prdSheng": "",
                    "begin_date": "",
                    "due_date": "",
                    "module_id": ""
                }], "expiredPoint": "", "leftScore": ""
            },
            "myOrder": {
                "need_pay": "",
                "need_comment": "",
                "list": [{
                    "prdUrl": "",
                    "prdImg": "",
                    "prdName": "",
                    "prdPrice": "",
                    "prd_sta": "",
                    "preAdImg": "",
                    "prdAdUrl": "",
                    "url": "",
                    "pay_status_name": ""
                }],
                "count": ""
            },
            "myGift": {
                "lvyouquan": "",
                "diyongquan": "",
                "cash": "",
                "gifts": [{"giftUrl": "", "giftImg": "", "giftName": "", "giftPrice": ""}]
            },
            "myPhone": {"phone": "4007-999-999"},
            "myCode": {"erweima": "img/rc_code.jpg"},
            "myAdvise": {"isShow": 1},
            "appArea": {"appImgUrl": "http://img3.tuniucdn.com/img/20140623/index_v2/index_app.png",},
            "myMessage": {"sum": "", "prd": [{"orderUrl": "", "orderName": "", "unreadMsgCount": ""}]}
        }
        data = main_prd.data = $.extend(true, {}, default_data, save_data);
        rightCommon.init(currentPageData);
        checkLogin.init();
        checkLogin.showCompareList();
        checkLogin.addToDoCom();
        if ($("#favorite_id_rc").length > 0) {
            checkLogin.doAddToCollect();
        }
        getLoginInfor.init();
        getData.getNameFormCookie(data.islogin);
        getData.addLive800();
        getData.backToTop();
        getData.selectTag();
        getData.createVCode();
        getData.compHeig();
        getData.smallWindow();
        getData.bindEvent();
        getData.leftRightSlide();
        if (save_data && save_data.islogin == 1) {
            getData.getMsg();
        }
    }

    window.cjCallback = cjCallback;
    var getData = getData || [];
    getData = {
        init: function () {
            this.getAllData();
            this.compHeig();
        }, getAllData: function () {
            if (!$("#page_type").val()) {
                rightCommon.init(currentPageData, true);
                return;
            }
            var url = _protocol + '//www.tuniu.com/api/sidebar/tools/' + $("#page_type").val() + "&js_callback=cjCallback";
            $.ajax({url: url, type: "get", async: true, dataType: "jsonp", jsonp: "js_callback"})
        }, getMsg: function () {
            getData.msgNumEle = $('#J_RightCommonMsgNum');
            getData.msgListEle = $('#J_RightCommonMsgList');
            setTimeout(function () {
                getData.getMsgData();
            }, loopDuration);
        }, getMsgData: function () {
            $.get(_protocol + '//www.tuniu.com/u/msg/unread/', {}, function (data) {
                var listHtml;
                if (data && data.sum) {
                    listHtml = _.template(rightCommon.myMsgTemplate(), {myMessage: data});
                    getData.msgListEle.html(listHtml);
                    getData.msgNumEle.text(data.sum).show();
                } else {
                    getData.msgListEle.html('暂无新消息');
                    getData.msgNumEle.hide().text(0);
                }
                setTimeout(function () {
                    getData.getMsgData();
                }, loopDuration);
            }, 'jsonp');
        }, bindEvent: function () {
            $("#rightCommonUl ul li").hover(function () {
                var __this_rc_box = $(this).find(".rc_click_event");
                var __this_rc_arrow = $(this).find(".rc_arrow");
                var __this_scroll_top = parseInt($(window).scrollTop());
                if (__this_rc_box.length) {
                    var __window_height = parseInt($(window).height());
                    var __this_off_top = parseInt($(this).offset().top) - __this_scroll_top;
                    var __this_rc_box_top = parseInt(__this_rc_box.height());
                    if ((__this_off_top + __this_rc_box_top) > __window_height) {
                        var __off_top = __this_off_top + __this_rc_box_top - __window_height;
                        __this_rc_box.css("top", -__off_top);
                        __this_rc_arrow.css("top", 20 + __off_top);
                    } else {
                        __this_rc_box.css("top", 0);
                        __this_rc_arrow.css("top", 20);
                    }
                }
                if ($(this).hasClass("hoverClick")) {
                    $(this).addClass("rc_mouseover");
                } else {
                    $(this).addClass("rc_hover");
                }
            }, function () {
                $(this).removeClass("rc_hover");
                $(this).removeClass("rc_mouseover");
                $(this).removeClass("rc_click");
            });
            $("#rightCommonUl ul li").click(function () {
                var __this_rc_box = $(this).find(".rc_click_event");
                var __this_rc_arrow = $(this).find(".rc_arrow");
                var __this_scroll_top = parseInt($(window).scrollTop());
                if (__this_rc_box.length) {
                    var __window_height = parseInt($(window).height());
                    var __this_off_top = parseInt($(this).offset().top) - __this_scroll_top;
                    var __this_rc_box_top = parseInt(__this_rc_box.height());
                    if ((__this_off_top + __this_rc_box_top) > __window_height) {
                        var __off_top = __this_off_top + __this_rc_box_top - __window_height;
                        __this_rc_box.css("top", -__off_top);
                        __this_rc_arrow.css("top", 20 + __off_top);
                    } else {
                        __this_rc_box.css("top", 0);
                        __this_rc_arrow.css("top", 20);
                    }
                }
                $(this).removeClass("rc_mouseover");
                $(this).addClass("rc_click");
            });
        }, compHeig: function () {
            var w_gh = $(window).height();
            var rightCommon_2 = $("#rightCommon");
            if (!rightCommon_2) return false;
            var lessThanHide = $("#lessThanHide");
            var RCU_doArea = $("#RCU_doArea");
            if (!rightCommon.noProduct()) {
                lessThanHide.hide();
                RCU_doArea.css({"top": 450});
            }
            rightCommon_2.css("height", w_gh);
        }, selectTag: function () {
            var right_tagContent = $("#right_tagContent");
            if (!right_tagContent.length) return false;
            var rt_length = right_tagContent.find(".right_tagContent").length;
            var s_tag = "<ul id='right_tags'><li class='selectTag'><a  href='javascript:void(0)'></a> </li>";
            if (rt_length > 1) {
                right_tagContent.find(".right_tagContent").eq(0).addClass("selectTag");
                for (var i = 1; i < rt_length; i++) {
                    s_tag += "<li class=''><a  href='javascript:void(0)'></a> </li>";
                }
            }
            s_tag += "</ul>";
            right_tagContent.after(s_tag);
            $("#right_tags").find("li").each(function (i, n) {
                $(n).click(function () {
                    $(n).siblings().removeClass("selectTag").end().addClass("selectTag");
                    right_tagContent.find(".right_tagContent").removeClass("selectTag").eq(i).addClass("selectTag");
                });
            });
        }, createVCode: function () {
            var rightCommonUl = $("#rightCommonUl").find("li");
            var rd = Math.random();
            rightCommonUl.each(function (i, n) {
                $(n).find('.identify_img').attr('src', '/identify.php?flag=100&cache=' + rd);
                $(n).find(".change_img").click(function () {
                    var rd_2 = Math.random();
                    $(n).find('.identify_img').attr('src', '/identify.php?flag=100&cache=' + rd_2);
                });
            })
        }, changeVcode: function () {
            var rightCommonUl = $("#rightCommonUl").find("li");
            var rd = Math.random();
            rightCommonUl.each(function (i, n) {
                $(n).find('.identify_img').attr('src', '/identify.php?flag=100&cache=' + rd);
            })
        }, addLive800: function () {
            var live800 = $("#live800");
            if (live800.length < 1) return;
            var onlineKefu = $("#onlineKefu");
            if (!live800) return "";
            var groupid = $("#kefu_show").attr("groupid");
        }, htmlspecialchars: function (str) {
            str = str.replace('&', '&amp;');
            str = str.replace('<', '&lt;');
            str = str.replace('>', '&gt;');
            str = str.replace('"', '&quot;');
            str = str.replace(' ', '&nbsp;');
            return str;
        }, Live800: function (groupid, iWidth, iHeight) {
            var live800 = $("#live800");
            if (live800.length < 1) return;
            if (!document.getElementById('live800').value) {
                var tuniuTrakerNew = tat.getTracker();
                tuniuTrakerNew.setPageName("客服在线帮助页面");
                tuniuTrakerNew.trackEvent('live800');
                tuniuTrakerNew = null;
            }
            var enterurl = encodeURIComponent(this.htmlspecialchars(window.location.href));
            var pagetitle = encodeURIComponent(this.htmlspecialchars(window.document.title));
            var url = _protocol + '//chat16.live800.com/live800/chatClient/chatbox.jsp?companyID=319154&jid=3047301407&skillId=' + groupid + '&enterurl=' + enterurl + '&pagetitle=' + pagetitle;
            var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
            var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
            var openwindow = window.open(url, 'new', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=yes,location=no,status=no');
            var timer = setInterval(function () {
                if (openwindow.closed) {
                    document.getElementById('live800').value = 0;
                    document.getElementById('live800').href = "javascript:Live800(" + groupid + "," + iWidth + "," + iHeight + ");";
                    clearInterval(timer);
                } else {
                    document.getElementById('live800').value = 1;
                    document.getElementById('live800').href = "javascript:void(0);";
                }
            }, 100);
        }, backToTop: function () {
            $("#rcBackToTop").click(function () {
                $("body,html").animate({"scrollTop": 0});
            });
        }, getNameFormCookie: function (login_status) {
            var __this = this;
            var rightCommonUl = $("#rightCommonUl").find("ul li");
            rightCommonUl.each(function (i, n) {
                $(n).find(".rc_common_input").click(function () {
                    var cookieName = unescape(checkLogin.getCookie("tuniuuser_name"));
                    cookieName = __this.utf8to16(__this.base64decode(cookieName)).replace(/<\/?[^>]*>/g, '');
                    var subCookieName = $(n).find(".subCookieName");
                    if (login_status == 0 && cookieName) {
                        subCookieName.removeClass("hide");
                        subCookieName.find(".nickName").html(cookieName);
                    }
                });
                ;
            });
        }, utf8to16: function (str) {
            var out, i, len, c;
            var char2, char3;
            out = "";
            len = str.length;
            i = 0;
            while (i < len) {
                c = str.charCodeAt(i++);
                switch (c >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        out += str.charAt(i - 1);
                        break;
                    case 12:
                    case 13:
                        char2 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                        break;
                    case 14:
                        char2 = str.charCodeAt(i++);
                        char3 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                        break
                }
            }
            return out
        }, base64decode: function (str) {
            var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
            var c1, c2, c3, c4;
            var i, len, out;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                do {
                    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
                } while (i < len && c1 == -1);
                if (c1 == -1)
                    break;
                do {
                    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
                } while (i < len && c2 == -1);
                if (c2 == -1)
                    break;
                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61)
                        return out;
                    c3 = base64DecodeChars[c3]
                } while (i < len && c3 == -1);
                if (c3 == -1)
                    break;
                out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61)
                        return out;
                    c4 = base64DecodeChars[c4]
                } while (i < len && c4 == -1);
                if (c4 == -1)
                    break;
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
            }
            return out
        }, smallWindow: function () {
            var __this = this;
            var rightCommon = $("#rightCommon");
            if (!rightCommon) return false;
            var __w_width = $(window).width();
            if (__w_width <= 1280) {
                __this.autoSlideHide(rightCommon);
            } else {
                clearTimeout(clearTim);
                rightCommon.removeClass("lessThan1024");
            }
            var clearTimeoutHand = "";
            rightCommon.hover(function () {
                clearTimeout(clearTim);
                if (rightCommon.hasClass("lessThan1024")) {
                    rightCommon.addClass("mouse_over");
                }
            }, function () {
                __this.autoSlideHide(rightCommon);
            });
        }, autoSlideHide: function (t) {
            var __w_width = $(window).width();
            clearTimeout(clearTim);
            clearTim = setTimeout(function () {
                if (__w_width <= 1280) {
                    t.animate({"right": -50}, function () {
                        t.addClass("lessThan1024");
                        if (t.hasClass("mouse_over")) {
                            t.removeClass("mouse_over");
                        }
                        t.animate({"right": 0}, 500);
                    });
                }
            }, 1000)
        }, leftRightSlide: function () {
            var share_item_0 = $("#share_item_0");
            var share_item_prev = share_item_0.find(".share_btn_prev");
            var share_item_next = share_item_0.find(".share_btn_next");
            var share_item_list = share_item_0.find(".share_item_ul li");
            var share_scroll = share_item_0.find(".share_item_ul");
            var share_temp = 0;
            var share_item_length = share_item_list.length;
            share_item_prev.css({"background-color": "#f0f0f0"});
            if (share_item_length < 3) {
                share_item_next.css({"background-color": "#f0f0f0"});
            }
            share_item_prev.click(function () {
                if (share_temp > 0) {
                    share_temp--;
                    share_item_next.css({"background-color": "transparent", "color": "#2e9900"});
                    if (share_temp == 0) {
                        share_item_prev.css({"background-color": "#f0f0f0", "color": "#ccc"});
                    } else {
                        share_item_prev.css({"background-color": "transparent", "color": "#2e9900"});
                    }
                    share_scroll.animate({"left": -share_temp * 36});
                }
            });
            share_item_next.click(function () {
                if (share_item_length > 3 && share_temp < (share_item_length - 3)) {
                    share_temp++;
                    share_item_prev.css({"background-color": "transparent", "color": "#2e9900"});
                    if (share_temp == share_item_length - 3) {
                        share_item_next.css({"background-color": "#f0f0f0", "color": "#ccc"});
                    } else {
                        share_item_next.css({"background-color": "transparent", "color": "#2e9900"});
                    }
                    share_scroll.animate({"left": -share_temp * 36});
                }
            });
        }, onlineKefu: function () {
            var onlineKefu = $("#onlineKefu");
            if (onlineKefu) {
                onlineKefu.addClass("rc_hover");
                setTimeout(function () {
                    onlineKefu.removeClass("rc_hover");
                }, 5000);
            }
        }
    };
    return {
        init: function (data) {
            currentPageData = data;
            getData.init();
            $(window).resize(function () {
                getData.compHeig();
                getData.smallWindow();
            });
        }
    }
});
;define('common_amd/jingzan', ['exports'], function (exports) {
    exports.init = function () {
        var c = {query: [], args: window.__zp_tag_params || {}};
        c.query.push(["_setAccount", "352"]);
        (window.__zpSMConfig = window.__zpSMConfig || []).push(c);
        var zp = document.createElement("script");
        zp.type = "text/javascript";
        zp.async = true;
        zp.src = ("https:" == document.location.protocol ? "https:" : "http:") + "//cdn.zampda.net/s.js";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(zp, s);
    };
});
;define('index_amd/mods2', [], function () {
    var exports = {};
    exports.init = function () {
        require(['common_amd/location'], function (mod) {
            mod.init();
        });
        require(['common_amd/mobile_app']);
        require(['common_amd/joinus'], function (mod) {
            mod.init();
        });
        require(['common_amd/jingzan'], function (mod) {
            mod.init();
        });
        (new Image).src = 'http://www.tuniu.com/stat.gif';
    };
    return exports;
});
;define("common_amd/autoSlide_amd", function () {
    $.fn.autoSlide = function (options) {
        var ths_ul = $(this).find("ul");
        var ths_li = ths_ul.find("li");
        var s_temp = 0;
        var s_l = ths_li.length;
        var op = {time: 4000};
        op = $.extend({}, op, options);

        function countWid() {
            var item = 0;
            ths_li.each(function (i, n) {
                item += parseInt($(n).width());
            });
            ths_ul.css({"width": item * 2});
            ths_li.clone().appendTo(ths_ul);
        }

        countWid();

        function autoslide() {
            var this_arg = arguments;
            var self = this;
            var s_left = parseInt(ths_ul.css("left"));
            if (s_temp < (s_l + 1)) {
                ths_ul.animate({"left": (s_left - parseInt(ths_li.eq(s_temp).width()))}, 1000, function () {
                    if (s_temp == s_l) {
                        s_temp = 0;
                        ths_ul.css({"left": 0});
                    }
                });
                s_temp++;
            }
            ;setTimeout(function () {
                this_arg.callee(self);
            }, op.time);
        }

        setTimeout(function () {
            autoslide();
        }, op.time);
    }
});