define('index_amd/data', ['jquery'], function ($) {
    var exports = {};
    exports.promises = {
        footprint: $.Deferred(),
        interest_dest: $.Deferred(),
        latest_comments: $.Deferred(),
        tourism_scroll: $.Deferred(),
        toLoadGuessyoulike: $.Deferred()
    };
    return exports;
});
;define('common_amd/groupTimer_index', ['jquery'], function ($) {
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    $.fn.groupTimer = function (ServerTime) {
        return this.each(function () {
            var _self = $(this);
            var startTime = solveIeBug(_self.attr("start-data"));
            var endDataTime = _self.attr("end-data").length ? solveIeBug(_self.attr("end-data")) : '2020-12-31';
            var tnIndexDay = _self.find(".tnIndexDay")[0];
            var tnIndexH = _self.find(".tnIndexH")[0];
            var tnIndexM = _self.find(".tnIndexM")[0];
            var tnIndexS = _self.find(".tnIndexS")[0];
            var isStart = false;
            var isEnd = false;
            var clearInt = "";
            var clearTm = "";
            var EndTimeMsg;
            var EndTime = new Date(startTime);
            var endBTime = new Date(endDataTime);
            if (ServerTime) {
                var currentDate = ServerTime;
                var days = EndTime - currentDate;
                var day2 = endBTime - currentDate;
                if (day2 < 0) {
                    isStart = false;
                    isEnd = false;
                } else if (days < 0 && day2 > 0) {
                    isEnd = true;
                    isStart = false;
                    EndTimeMsg = parseInt(day2 / 1000);
                    countTime();
                    clearInt = setInterval(countTime, 1000);
                } else {
                    isStart = true;
                    isEnd = true;
                    EndTimeMsg = parseInt(days / 1000);
                    countTime();
                    clearInt = setInterval(countTime, 1000);
                }
                if (_self.hasClass("hidden")) {
                    _self.removeClass("hidden");
                }
            }

            function solveIeBug(s_time) {
                var bTime = s_time;
                if (bTime == '') {
                    return;
                } else {
                    var timePar = bTime.split(' ');
                    var timeDate = timePar[0].split('-');
                    bTime = timeDate[1] + '/' + timeDate[2] + '/' + timeDate[0];
                    var later = new Date(bTime);
                    var timeHour = timePar[1].split(':');
                    later.setHours(timeHour[0], timeHour[1]);
                    later.setDate(later.getDate());
                    return later;
                }
            }

            function countTime() {
                var h = Math.floor(EndTimeMsg / 60 / 60);
                var m = Math.floor((EndTimeMsg - h * 60 * 60) / 60);
                var s = Math.floor((EndTimeMsg - h * 60 * 60 - m * 60));
                var d = parseInt(h / 24);
                tnIndexDay.innerHTML = d;
                tnIndexH.innerHTML = h - d * 24;
                tnIndexM.innerHTML = m;
                tnIndexS.innerHTML = s;
                EndTimeMsg--;
                if (EndTimeMsg < 0) {
                    var nowDate = new Date();
                    if (isEnd) {
                        if ((endBTime - nowDate) < 0) {
                            isEnd = false;
                            clearTimeout(clearTm);
                            return false;
                        }
                        day2 = endBTime - EndTime;
                        EndTimeMsg = parseInt(day2 / 1000);
                        clearTm = setTimeout("class='list_stl'()", 1000);
                    } else {
                        clearInterval(clearInt);
                    }
                    tnIndexDay.innerHTML = "00";
                    tnIndexH.innerHTML = "00";
                    tnIndexM.innerHTML = "00";
                    tnIndexS.innerHTML = "00";
                    ;
                }
            }
        });
    }
});
;define('common_amd/jquery.datalazyload', ['jquery', 'common_amd/tool'], function ($, tool) {
    var check_list = [];
    window.check_list = check_list;
    var checkall_enabled = false;
    var each = tool.each;
    var every = tool.every;
    var debounce = tool.event.debounce;
    var optional_callback = function (o) {
        var $el = o.$el;
        var el = o.el;
        each(o.callbacks, function (param) {
            var callback = param.callback;
            var filter = param.filter || function () {
                return true;
            };
            filter.call(el, $el, el) && callback && callback.call(el, $el, el);
        });
    };
    var succeed_callback = function (o) {
        var $el = o.$el;
        var type = $el.data('lazyload-type');
        var from = $el.data('lazyload-from');
        var src = $el.data('lazyload-src');
        if (type === 'data') {
            if (from === 'textarea') {
                var $textarea = $el.find('textarea[data-lazyload-textarea]');
                if ($textarea.length > 0) {
                    $el.html($textarea.text());
                }
            } else if (from === 'ajax') {
            }
        } else if (type === 'img' && src && src !== $el.attr('src')) {
            $el.attr('src', src);
        }
        $el.removeClass('loading');
        optional_callback(o);
    };
    var check_single = function (o) {
        var $el = o.$el;
        var el = o.el;
        var threshold = o.threshold;
        var rect = el.getBoundingClientRect();
        var win_height = $(window).height();
        if ($el.is(':visible') && (rect.top - threshold <= win_height) && (rect.bottom + threshold >= 0)) {
            succeed_callback(o);
            return true;
        }
    };
    var checkall = debounce(function () {
        var i = 0, o;
        if (check_list.length === 0) {
            disable_checkall();
            return;
        }
        while (o = check_list[i]) {
            if (check_single(o)) {
                check_list.splice(i, 1);
                i = 0;
            } else {
                i += 1;
            }
        }
    });
    var check = function (callback, filter) {
        var threshold = $(this).data('lazyload-threshold') || 0;
        var param = {callback: callback, filter: filter};
        var el = this;
        var o = check_list.find(function (o) {
            return el === o.el;
        });
        if (o) {
            o.callbacks.push(param);
        } else {
            o = {$el: $(this), el: this, callbacks: [param], threshold: threshold};
            if (!check_single(o)) {
                check_list.push(o);
                enable_checkall();
            }
        }
    };
    var enable_checkall = function () {
        if (!checkall_enabled) {
            checkall_enabled = true;
            $(window).on('resize', checkall);
            $(window).on('scroll', checkall);
        }
    };
    var disable_checkall = function () {
        if (checkall_enabled) {
            checkall_enabled = false;
            $(window).off('resize', checkall);
            $(window).off('scroll', checkall);
        }
    };
    check_list.find = function (compare) {
        var ret = null;
        every(check_list, function (o) {
            if (compare(o)) {
                ret = o;
                return false;
            }
            return true;
        });
        return ret;
    };
    $.fn.datalazyload = function () {
        var args = arguments;
        return $(this).each(function () {
            check.apply(this, args);
        });
    };
});
;define('common_amd/login', ['common_amd/tool'], function (tool) {
    var base64 = tool.base64, base64decode = base64.decode, utf8to16 = base64.utf8to16;
    var cookieName = {};
    var _isGuest;
    var _nickname;
    var isGuest;
    var tuniuLevel;
    var tuniuVip;
    var tuniuImg;
    var init;
    var exports = {};

    function getLoginInfo(options) {
        var member_club = options && options.member_club;
        var imgInfo;
        var login;
        getCookieForLogin();
        getLoginState();
        login = getMobileInfo();
        if (_isGuest) {
            if (cookieName['tuniuuser_level'] == "" || cookieName['tuniuuser_level'] == null) {
                tuniuLevel = 0;
                tuniuVip = 0
            } else {
                tuniuLevel = base64decode(unescape(cookieName['tuniuuser_level']));
                tuniuVip = base64decode(unescape(cookieName['tuniuuser_vip']))
            }
            tuniuImg = cookieName['tuniuuser_image'];
            if (tuniuImg == "" || tuniuImg == null) {
                imgInfo = "http://img3.tuniucdn.com/img/2014040901/user_center/g_touxiang.png"
            } else {
                var time = new Date().toLocaleTimeString();
                tuniuImg = unescape(base64decode(unescape(cookieName['tuniuuser_image'])));
                var myUrl = parse_url(tuniuImg);
                if (myUrl.protocol == "") {
                    imgInfo = "http://images.tuniucdn.com/head" + tuniuImg + "?v=" + time
                } else {
                    imgInfo = convertPicSize(tuniuImg, 90, 90)
                }
            }
            if (tuniuVip == 1) {
                login += '<li><span>您好，</span></li>';
                login += compLoginInnerInfor(_nickname, imgInfo, -1);
            } else {
                login += '<li><span>您好，</span></li>';
                login += compLoginInnerInfor(_nickname, imgInfo, tuniuLevel)
            }
            if (member_club) login += '<li><a href="http://www.tuniu.com/u/club" target="_blank" onclick="tuniuRecorder.push(\'1_1_1_1_1_2\');">会员俱乐部</a></li>';
            login += '<input type="hidden" value="' + imgInfo + '" id="user_top_img">';
            login += '<input type="hidden" value="' + tuniuVip + '" id="is_user_vip">'
        } else {
            login += '<li><a onclick="tuniuRecorder.push(\'1_1_1_1_0_1\');" rel="nofollow" href="http://www.tuniu.com/u/login" target="_blank">登录</a>|</li>';
            login += '<li><a onclick="tuniuRecorder.push(\'1_1_1_1_0_2\');" rel="nofollow" href="http://www.tuniu.com/u/register" target="_blank">注册</a></li>';
            login += '<li><a onclick="tuniuRecorder.push(\'1_1_1_1_1_3\');" rel="nofollow" href="http://www.tuniu.com/szt/newmembergift/?recId=1&q=a5" target="_blank"><img src="http://img4.tuniucdn.com/img/2017020818/common/registgift.gif" alt="会员注册有礼" style="height: 22px;line-height: 22px; vertical-align: middle;" /></a></li>';
        }
        return login;
    }

    function parse_url(str) {
        var o = {
            strictMode: false,
            key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
            q: {name: "queryKey", parser: /(?:^|&)([^&=]*)=?([^&]*)/g},
            parser: {
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
            }
        };
        var m = o.parser[o.strictMode ? "strict" : "loose"].exec(str), uri = {}, i = 14;
        while (i--) {
            uri[o.key[i]] = m[i] || ""
        }
        if (uri.path != '') {
            uri.file = uri.path.replace(/^.*[\/\\]/g, '');
        }
        return uri;
    }

    function convertPicSize(field, size, height) {
        var img_url = '';
        var reg = new RegExp("^(.*)(_w\d{2,3}_h\d{2,3}_c1_t0)?\.(jpg|png|jpeg|gif|bmp|gif|psd|pcx|ai|svg|tga|raw|tiff)$", 'i');
        if (height > 10) {
            if (field.indexOf('/default') != -1) {
                img_url = field.replace(reg, "$1_w" + size + " _h" + height + "_c1_t0.$3");
            } else {
                img_url = field.replace(reg, "$1_w" + size + "_h" + height + "_c1_t0.$3");
            }
        } else if (size == 1) {
            img_url = field.replace(reg, "$1_w600_h160_c1_t0.$3");
        } else if (size == 2) {
            img_url = field.replace(reg, "$1_w320_h180_c1_t0.$3");
        } else if (size == 99) {
            img_url = field.replace(reg, "$1_w214_h160_c1_t0.$3");
        } else {
            img_url = field.replace(reg, "$1_w180_h180_c1_t0.$3");
        }
        return img_url;
    }

    function compLoginInnerInfor(nick_name, img_info, user_level) {
        var top_user_level = "";
        var bot_user_level = "";
        if (user_level < 0) {
            top_user_level = 'vip vip_word';
            bot_user_level = 'vip_lel vip_lel_word'
        } else {
            top_user_level = 'vip vip' + user_level;
            bot_user_level = 'vip_lel vip_lel' + user_level;
        }
        var comp_str = '<li id="vipnameBox" class="vipname_box"><a onclick="tuniuRecorder.push(\'1_1_1_1_1_1\');" href="http://www.tuniu.com/u" id="vipname" class="vipname" rel="nofollow"><span class="fl" style="float:left;">' + nick_name + '</span><span class="' + top_user_level + '"></span> <span class="poparrow"></span></a><div class="colle_box"><div class="colle_top clearfix"><div class="right"><a href="http://www.tuniu.com/u">账户管理</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.tuniu.com/u/logout">退出</a></div></div><div class="colle_bottom"><div class="touxiang"><a href="https://i.tuniu.com/"><img id= "user_head" src="' + img_info + '" width="75px" height="75px"></a></div><div class="fl"><div class="vip_stage mt_10"><a style="color:#f60; font-weight:bold; font-size:16px;" class="' + bot_user_level + '" href="http://www.tuniu.com/u/club"></a></div><div><a style="color:#404040; font-weight:bold; font-size:14px;" href="http://www.tuniu.com/u/club">查看我的会员特权</a></div></div></div></div></li><li><a rel="nofollow" href="https://i.tuniu.com/u/inviteCode" target="_blank"><img src="http://img4.tuniucdn.com/img/2017020818/common/oldtonew_v2.gif" alt="老带新" style="height: 22px;line-height: 22px; vertical-align: middle;"></a></li>';
        return comp_str
    }

    function getMobileInfo() {
        var mobile_flag = false;
        var m_url = "http://m.tuniu.com";
        try {
            var agent = navigator.userAgent.toLowerCase();
        } catch (e) {
            var agent = navigatorAlias.userAgent.toLowerCase();
        }
        if (agent.match('/(blackberry|configuration\/cldc|hp |hp-|htc |htc_|htc-|iemobile|kindle|midp|mmp|motorola|mobile|nokia|opera mini|opera |Googlebot-Mobile|YahooSeeker\/M1A1-R2D2|android|iphone|ipod|mobi|palm|palmos|pocket|portalmmm|ppc;|smartphone|sonyericsson|sqh|spv|symbian|treo|up.browser|up.link|vodafone|windows ce|xda |xda_)/i')) {
            mobile_flag = true;
            if (agent.match('/iPad/i')) {
                mobile_flag = false;
            }
            var url = Window.location.href;
            if (url.match('/tours/i')) {
                var url_temp = url.spli('//');
                var route_attr = url_temp[1];
                var route_temp = route_attr.split('/');
                var route_id = route_temp[2];
                var route_type = getRouteTypeByID(route_id);
                if (route_type == 1) {
                    m_url = m_url + '/tours/' + route_id;
                }
            }
        }
        isPcOrMobile(mobile_flag);
        login = '<div class="login_menu clearfix">';
        return login
    }

    function isPcOrMobile(m_flag, m_url) {
        var isPcOrMobile = document.getElementById("isPcOrMobile");
        if (m_flag) {
            isPcOrMobile.innerHTML = '<a onclick="tuniuRecorder.push(\'1_1_1_2_1_3\');" class="sitenav_mobile" href="' + m_url + '" target="_blank" rel="nofollow"></a>'
        } else {
            isPcOrMobile.innerHTML = '<a onclick="tuniuRecorder.push(\'1_1_1_2_1_3\');" class="sitenav_mobile" href="http://www.tuniu.com/static/mobile/" target="_blank" rel="nofollow"></a>'
        }
    }

    function getCookieForLogin() {
        var aCookie = document.cookie.split("; ");
        if (aCookie.length) {
            for (var i = 0; i < aCookie.length; i++) {
                var aCrumb = aCookie[i].split("=");
                if (aCrumb.length) {
                    var cookieValue = aCrumb[1];
                    if (cookieValue) {
                        cookieName[aCrumb[0]] = cookieValue.replace(/<\/?[^>]*>/g, '');
                    } else {
                        cookieName[aCrumb[0]] = "";
                    }
                }
            }
        }
    }

    function getLoginState() {
        var userInfo = cookieName['tuniuuser'];
        _nickname = cookieName['tuniuuser_name'];
        if (_nickname) {
            _isGuest = true;
            _nickname = unescape(cookieName['tuniuuser_name']);
            _nickname = utf8to16(base64decode(_nickname)).replace(/<\/?[^>]*>/g, '');
        } else {
            _isGuest = false
        }
        if (!userInfo) {
            var _vLoginUrl = document.createElement('A');
            _vLoginUrl.innerHTML = '非会员查单';
            _vLoginUrl.setAttribute('href', '//passport.tuniu.com/login/pcVLogin');
            _vLoginUrl.setAttribute('target', '_blank');
            _vLoginUrl.setAttribute('rel', 'nofollow');
            document.getElementsByClassName('is_order')[0].childNodes[3].appendChild(_vLoginUrl);
        }
    }

    function getRouteTypeByID(route_id) {
        if ((routeId > 0 && routeId < 80000) || (routeId > 200000 && routeId < 1000000) || (routeId >= 2000000 && routeId < 5000000) || (routeId > 20000000 && routeId < 40000000)) {
            return 1;
        } else if ((routeId > 80000 && routeId < 200000) || (routeId > 40000000 && routeId < 50000000)) {
            return 2;
        } else if ((routeId > 1000000 && routeId < 2000000) || (routeId >= 5000000 && routeId < 8000000)) {
            return 3;
        } else if (routeId > 8000000 && routeId < 9000000) {
            return 4;
        }
    }

    // init = function (config) {
    //     var user_login_info = document.getElementById("user_login_info");
    //     if (user_login_info) {
    //         user_login_info.innerHTML = getLoginInfo(config);
    //     }
    // };
    // exports.cookieName = cookieName;
    // exports.getLoginInfo = getLoginInfo;
    // exports.init = init;
    // return exports;
});
;
define('index_amd/inline_v2', ['jquery', 'common_amd/login'], function ($, login) {
    (function () {
        // var user_login_info = document.getElementById("user_login_info");
        // if (user_login_info) {
        //     user_login_info.innerHTML = login.getLoginInfo();
        // }
        // var addonload = function (callback) {
        //     if (/loaded|complete/.test(document.readyState)) {
        //         callback();
        //     } else {
        //         if (window.addEventListener) {
        //             window.addEventListener('load', callback);
        //         } else {
        //             window.attachEvent('onload', callback);
        //         }
        //     }
        // };
        addonload(function () {
            showColleBox();
        });

        function myAddPanel(title, url, desc) {
            if (document.all) {
                if (navigator.appName == "Microsoft Internet Explorer") {
                    try {
                        window.external.addFavorite(url, title);
                    } catch (e1) {
                        try {
                            window.external.addToFavoritesBar(url, title);
                        } catch (e2) {
                            alert('加入收藏失败，请您手工加入。');
                        }
                    }
                }
            } else if (window.external) {
                try {
                    window.sidebar.addPanel(title, url, desc);
                } catch (e3) {
                    alert("此浏览器不支持这项功能，请按Ctrl+D直接收藏我们！");
                }
            } else {
                alert('加入收藏失败，请您手工加入。')
            }
        }

        window.myAddPanel = myAddPanel;

        function weixinShow_top() {
            var weixinbox = document.getElementById("topWeiXin");
            var wxImg = document.getElementById("wxImg").getAttribute("data-src");
            if (weixinbox) {
                weixinbox.onmouseover = function () {
                    weixinbox.className = "topWeiXin on";
                    document.getElementById("wxImg").src = wxImg;
                }, weixinbox.onmouseout = function () {
                    weixinbox.className = "topWeiXin";
                }
            }
            ;
        }

        function showColleBox() {
            var collebox = document.getElementById("vipnameBox");
            var vipname = document.getElementById("vipname");
            if (collebox) {
                collebox.onmouseover = function () {
                    collebox.className = "vipname_box on";
                    vipname.className = "vipname float_tt";
                }, collebox.onmouseout = function () {
                    collebox.className = "vipname_box";
                    vipname.className = "vipname float_tt";
                    vipname.className = "vipname";
                }
            }
            ;
        }
    }());
    (function () {
        $(window).bind("scroll", function () {
            $("#TN-faq").addClass("tn_faq");
            $("#brand-block").addClass("right_col_brand");
            $("#leftScroll").addClass("left_scroll");
        });
        $("#buy-quan").addClass("buyquan");
        if ($("#credit-one").length > 0) $("#credit-one").addClass("credit");
        if ($("#credit-two").length > 0) $("#credit-two").addClass("credit2");
        if ($("#credit-down").length > 0) $("#credit-down").addClass("creditdown");
    }());
    (function redEnvelopHover() {
        var redEnvelop = document.getElementById("redEnvelop");
        if (redEnvelop) {
            redEnvelop.onmouseover = function () {
                redEnvelop.className = "RE_mouse_over red_envelop fl";
            }
            redEnvelop.onmouseout = function () {
                redEnvelop.className = "red_envelop fl";
            }
        }
    })();
    (function () {
        function getPhoneCookie(objName) {
            var arrStr = document.cookie.split("; ");
            for (var i = 0; i < arrStr.length; i++) {
                var temp = arrStr[i].split("=");
                if (temp[0] == objName) return unescape(temp[1]);
            }
            return false;
        }

        window.getPhoneCookie = getPhoneCookie;
        var tuniuHeaderPhoneText = document.getElementById("service_phone_head_text");
        var tuniuHeaderPhoneTel = document.getElementById("service_phone_head_tel");
        var tuniuFootPhoneText = document.getElementById("service_phone_foot_text");
        var tuniuFootPhoneTel = document.getElementById("service_phone_foot_tel");
        var tuniuPPhoneNumber = getPhoneCookie("p_phone_400") || '4007-999-999';
        var tuniuPPhoneText = getPhoneCookie("p_phone_level") || '0';
        var tuniuGlobalPhone = getPhoneCookie("p_global_phone") || '+0086-25-8685-9999';
        var hkPhone = tuniuPPhoneNumber.substr(0, 1);
        if (hkPhone == "+") {
            tuniuFootPhoneTel.className += " hk-tel";
            tuniuHeaderPhoneTel.parentNode.className += " hk-tel";
        }
        var isTuniuVip = false;
        if (tuniuPPhoneText == 1) {
            isTuniuVip = true;
        }
        else {
            isTuniuVip = false;
        }
        var tuniuPPhoneHeadText = isTuniuVip ? "24h途致贵宾专线" : "24h客户服务电话";
        var tuniuPPhoneFootText = isTuniuVip ? "途致贵宾专线（免长途费）" : "客户服务电话（免长途费）";
        if (tuniuHeaderPhoneTel) {
            var siteContact = $(".site_contact");
            siteContact.append("<div class='service_phone_box'><span id='service_phone_box_tel'></span><div class='arrow'></div></div>");
            var servicePhoneBox = $(".site_contact .service_phone_box");
            if (tuniuPPhoneNumber) {
                tuniuHeaderPhoneText.innerHTML = tuniuPPhoneHeadText;
                tuniuHeaderPhoneTel.innerHTML = tuniuPPhoneNumber;
                $("#service_phone_head_text").append("<em></em>");
                $("#service_phone_box_tel").html("国内：<i>" + tuniuPPhoneNumber + "</i><br>国际：<i>" + tuniuGlobalPhone + "</i>");
                siteContact.bind('mouseenter', function () {
                    servicePhoneBox.show();
                    siteContact.find("em").addClass("down");
                }).bind('mouseleave', function () {
                    servicePhoneBox.hide();
                    siteContact.find("em").removeClass("down");
                });
            }
        }
        if (tuniuFootPhoneTel) {
            if (tuniuPPhoneNumber) {
                tuniuFootPhoneText.innerHTML = tuniuPPhoneFootText;
                tuniuFootPhoneTel.innerHTML = tuniuPPhoneNumber;
            }
        }
    }());

    function selectTag(showContent, selfObj) {
        var tag = document.getElementById("tags").getElementsByTagName("li");
        var taglength = tag.length;
        var i, j;
        for (i = 0; i < taglength; i++) {
            tag[i].className = "";
        }
        selfObj.parentNode.className = "selectTag";
        for (i = 1; j = document.getElementById("tagContent" + i); i++) {
            j.style.display = "none";
        }
        document.getElementById(showContent).style.display = "block";
    }

    window.selectTag = selectTag;
});
;define('common_amd/jquery.easing.1.3', ['jquery'], function (jQuery) {
    jQuery.easing['jswing'] = jQuery.easing['swing'];
    jQuery.extend(jQuery.easing, {
        def: 'easeOutQuad', swing: function (x, t, b, c, d) {
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        }, easeInQuad: function (x, t, b, c, d) {
            return c * (t /= d) * t + b;
        }, easeOutQuad: function (x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        }, easeInOutQuad: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }, easeInCubic: function (x, t, b, c, d) {
            return c * (t /= d) * t * t + b;
        }, easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }, easeInOutCubic: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }, easeInQuart: function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        }, easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        }, easeInOutQuart: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }, easeInQuint: function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        }, easeOutQuint: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        }, easeInOutQuint: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }, easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        }, easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        }, easeInOutSine: function (x, t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }, easeInExpo: function (x, t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        }, easeOutExpo: function (x, t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        }, easeInOutExpo: function (x, t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }, easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        }, easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        }, easeInOutCirc: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }, easeInElastic: function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }, easeOutElastic: function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        }, easeInOutElastic: function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }, easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        }, easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        }, easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }, easeInBounce: function (x, t, b, c, d) {
            return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
        }, easeOutBounce: function (x, t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        }, easeInOutBounce: function (x, t, b, c, d) {
            if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
            return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    });
});
;define('common_amd/jquery.menu-aim', ['jquery'], function ($) {
    $.fn.menuAim = function (opts) {
        this.each(function () {
            init.call(this, opts);
        });
        return this;
    };

    function init(opts) {
        var $menu = $(this), activeRow = null, mouseLocs = [], lastDelayLoc = null, timeoutId = null,
            options = $.extend({
                rowSelector: "> div",
                submenuSelector: "*",
                submenuDirection: "right",
                tolerance: 75,
                enter: $.noop,
                exit: $.noop,
                activate: $.noop,
                deactivate: $.noop,
                exitMenu: $.noop
            }, opts);
        var MOUSE_LOCS_TRACKED = 3, DELAY = 300;
        var mousemoveDocument = function (e) {
            mouseLocs.push({x: e.pageX, y: e.pageY});
            if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
                mouseLocs.shift();
            }
        };
        var mouseleaveMenu = function () {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (options.exitMenu(this)) {
                if (activeRow) {
                    options.deactivate(activeRow);
                }
                activeRow = null;
            }
        };
        var mouseenterRow = function () {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            options.enter(this);
            possiblyActivate(this);
        }, mouseleaveRow = function () {
            options.exit(this);
        };
        var clickRow = function () {
            activate(this);
        };
        var activate = function (row) {
            if (row == activeRow) {
                options.activate(row);
                activeRow = row;
                return;
            }
            asyMenuImg(row);
            if (activeRow) {
                options.deactivate(activeRow);
            }
            options.activate(row);
            activeRow = row;
        };
        var asyMenuImg = function (r) {
            var cover_img = $(r).find(".cover-img img");
            var cover_img_data_src = cover_img.attr("data-src");
            var cover_img_src = cover_img.attr("src");
            if (cover_img_data_src && cover_img_data_src.length > 0) {
                if (cover_img_data_src == cover_img_src) {
                    return;
                } else {
                    cover_img.attr("src", cover_img_data_src)
                }
            }
        }
        var possiblyActivate = function (row) {
            var delay = activationDelay();
            if (delay) {
                timeoutId = setTimeout(function () {
                    possiblyActivate(row);
                }, delay);
            } else {
                activate(row);
            }
        };
        var activationDelay = function () {
            if (!activeRow || !$(activeRow).is(options.submenuSelector)) {
                return 0;
            }
            var offset = $menu.offset(), upperLeft = {x: offset.left, y: offset.top - options.tolerance},
                upperRight = {x: offset.left + $menu.outerWidth(), y: upperLeft.y},
                lowerLeft = {x: offset.left, y: offset.top + $menu.outerHeight() + options.tolerance},
                lowerRight = {x: offset.left + $menu.outerWidth(), y: lowerLeft.y},
                loc = mouseLocs[mouseLocs.length - 1], prevLoc = mouseLocs[0];
            if (!loc) {
                return 0;
            }
            if (!prevLoc) {
                prevLoc = loc;
            }
            if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x || prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
                return 0;
            }
            if (lastDelayLoc && loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
                return 0;
            }

            function slope(a, b) {
                return (b.y - a.y) / (b.x - a.x);
            };var decreasingCorner = upperRight, increasingCorner = lowerRight;
            if (options.submenuDirection == "left") {
                decreasingCorner = lowerLeft;
                increasingCorner = upperLeft;
            } else if (options.submenuDirection == "below") {
                decreasingCorner = lowerRight;
                increasingCorner = lowerLeft;
            } else if (options.submenuDirection == "above") {
                decreasingCorner = upperLeft;
                increasingCorner = upperRight;
            }
            var decreasingSlope = slope(loc, decreasingCorner), increasingSlope = slope(loc, increasingCorner),
                prevDecreasingSlope = slope(prevLoc, decreasingCorner),
                prevIncreasingSlope = slope(prevLoc, increasingCorner);
            if (decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope) {
                lastDelayLoc = loc;
                return DELAY;
            }
            lastDelayLoc = null;
            return 0;
        };
        $menu.mouseleave(mouseleaveMenu).find(options.rowSelector).mouseenter(mouseenterRow).mouseleave(mouseleaveRow).click(clickRow);
        $(document).mousemove(mousemoveDocument);
    };
});
;define('index_amd/left_menu', ['jquery', 'common_amd/jquery.easing.1.3', 'common_amd/jquery.menu-aim'], function ($) {
    var mouseAsync_loaded = false;
    $(document).on('mousemove', mouseIndexAsync_v2);
    $(window).on('scroll', mouseIndexAsync_v2);

    function mouseIndexAsync_v2() {
        if (!mouseAsync_loaded) {
            mouseAsync_loaded = true;
            $(document).off('mousemove', mouseIndexAsync_v2);
            $(window).off('scroll', mouseIndexAsync_v2);
            leftCatv2();
            slideMenu();
            showThemeMenu.init();
        }
    }

    var showThemeMenu = showThemeMenu || {};
    showThemeMenu = {
        init: function () {
            showThemeMenu.menuLenHover();
        }, menuLenHover: function () {
            var alreadOut;
            var $theme = $("#item-theme");
            var $themeLen = $theme.find(".left_title");
            var $themeBg = $theme.find("#item-theme_bg");
            var changeBg = "";
            var addHovered = setTimeout(function () {
                var $content_wrap = $theme.find('.i-mc');
                var $textarea = $content_wrap.find('textarea.storedata');
                if ($textarea[0]) {
                    $content_wrap.html($textarea.text());
                }
                var width = $content_wrap.width();
                $content_wrap.css('width', 0).animate({width: width}, 600, 'easeInOutQuint');
            }, 3600);
            alreadOut = setTimeout(function () {
                $theme.removeClass("hovered");
            }, 8600);

            function hideItemTheme() {
                $theme.removeClass("hovered");
            }

            $("#_JD_ALLSORT div.item").bind("mouseenter", function () {
                if ($(this).attr('id') == "item-theme") {
                    $theme.addClass("hovered");
                } else {
                    clearTimeout(alreadOut);
                    hideItemTheme();
                }
                clearTimeout(changeBg);
                clearTimeout(addHovered);
            })
            $("#_JD_ALLSORT div.item").bind("mouseleave", function () {
                if ($(this).attr('id') == "item-theme") {
                    clearTimeout(alreadOut);
                    alreadOut = setTimeout(function () {
                        $theme.removeClass("hovered");
                    }, 0);
                } else {
                    clearTimeout(alreadOut);
                    hideItemTheme();
                }
            })
        }
    }

    function leftCatv2() {
        var x = $("#_JD_SORTLIST").remove().html();
        $("#_JD_ALLSORT").html(x).attr("load", "1");
    }

    function slideMenu() {
        var $menu = $("#_JD_ALLSORT");
        var isMenuActivated = false, showSubmenuHandler = null;
        $menu.menuAim({activate: activateSubmenu, deactivate: deactivateSubmenu, exitMenu: exitMenu});

        function showSubmenu(row) {
            var $row = $(row), submenuId = $row.data("submenuId"), $submenu = $("#" + submenuId),
                height = $menu.outerHeight(), width = $menu.outerWidth();
            $submenu.css({left: width - 2});
            $menu.find(">div").removeClass("hover");
            $row.addClass("hover");
            var $subpanel = $row.find('.i-mc');
            var $textarea = $subpanel.find('textarea.storedata');
            if ($textarea[0]) {
                $subpanel.html($textarea.text());
            }
        }

        function hideSubmenu(row) {
            var $row = $(row), submenuId = $row.data("submenuId"), $submenu = $("#" + submenuId);
            $row.find(">div").removeClass("hover");
        }

        function activateSubmenu(row) {
            if (showSubmenuHandler) {
                clearTimeout(showSubmenuHandler);
                showSubmenuHandler = null;
            }
            var delay = 0;
            if (isMenuActivated) {
                delay = 0;
            } else {
                delay = 100
            }
            showSubmenuHandler = setTimeout(function () {
                showSubmenu(row);
                showSubmenuHandler = null;
                isMenuActivated = true;
            }, delay);
        }

        function deactivateSubmenu(row) {
            var $row = $(row), submenuId = $row.data("submenuId"), $submenu = $("#" + submenuId);
            $row.removeClass("hover");
        }

        function exitMenu(row) {
            if (showSubmenuHandler) {
                clearTimeout(showSubmenuHandler);
                showSubmenuHandler = null;
            } else {
                hideSubmenu(row);
            }
            isMenuActivated = false;
        }
    }
});
;
/*! crx.js 20150930 | canvas绘制圆弧 | jiangdongzhe@tuniu.com */
define('index_amd/crx', ['jquery'], function ($) {
    "use strict";
    var PI = Math.PI, d2r = function (a) {
        return PI / 180 * a;
    }, r2d = function (a) {
        return a * 180 / PI;
    }, sin = function (a) {
        return Math.sin(a);
    }, cos = function (a) {
        return Math.cos(a);
    };
    var defop = {
        lineWidth: 0,
        radius: 0,
        fill: {color: null, Gradient: null},
        lineFill: {color: null, Gradient: null},
        val: 100,
        startVal: 0,
        offset: [0, 0]
    }
    var fillFactory = function (ctx, fill) {
        if (fill.color) {
            return fill.color;
        } else if (!fill.Gradient) {
            return null;
        }
        var g = ctx.createLinearGradient.apply(ctx, fill.Gradient.slice(0, 4));
        g.addColorStop(0, fill.Gradient[4]);
        g.addColorStop(1, fill.Gradient[5]);
        return g;
    }
    var crx = function (op) {
        if (!op.paper.tagName && op.paper.tagName !== 'CANVAS') {
            throw'canvas error';
        }
        var paper = op.paper, ctx = paper.getContext('2d'), sradius = op.radius - .5 * op.lineWidth,
            fill = fillFactory(ctx, op.fill), lineFill = fillFactory(ctx, op.lineFill);
        var ox = op.offset[0] + op.radius + op.lineWidth, oy = op.offset[1] + op.radius + op.lineWidth;
        var startRad = 2 * PI * op.startVal / 100, endRad = 2 * PI * (op.val + op.startVal) / 100;
        var sox = cos(endRad) * op.radius + ox, soy = sin(endRad) * op.radius + oy;
        ctx.clearRect(0, 0, op.radius * 2 + op.lineWidth + 4, op.radius * 2 + op.lineWidth + 4);
        ctx.save();
        ctx.beginPath();
        ctx.arc(ox, oy, sradius + 1, 0, 2 * PI);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.restore();
        ctx.beginPath();
        ctx.arc(ox, oy, op.radius, startRad, endRad);
        ctx.strokeStyle = lineFill;
        ctx.lineWidth = op.lineWidth;
        ctx.stroke();
        ctx.restore();
        ctx.beginPath();
        ctx.arc(sox, soy, op.lineWidth / 2 + 1, 0, 2 * PI);
        ctx.fillStyle = lineFill;
        ctx.fill();
        ctx.restore();
    }
    $.fn.crx = function (userop) {
        var op = $.extend({}, defop, userop);
        op.paper = this.get(0);
        crx(op);
        return this;
    }
    $.fn.selfanimate = function (name, options) {
        var val = this.data(name), _s = this;
        _s.stop(true, false);
        _s.trigger('circle-animation-start');
        _s.css({animationProgress: 0}).animate({animationProgress: val}, options).promise().always(function () {
            _s.trigger('circle-animation-end');
        });
    }
});
;define("index_amd/index", ["jquery", "underscore"], function ($, _) {
    var latest_order = "";
    var latest_comment = "";
    var latest_youji = "";
    var switch_tab = "";
    var isIE = (function () {
        var isIE = false;
        try {
            document.createElement("canvas").getContext("2d");
        } catch (e) {
            isIE = true;
        }
        return isIE;
    })();

    function Base64() {
        _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        this.encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        }
        this.decode = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        }
        _utf8_encode = function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        }
        _utf8_decode = function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    }

    var activity_slide = function () {
        var root = $(".activity_slide"), root_banner = $('.tn_bc_center')
        images = $(root).find(".activity_images"), titles = $(root_banner).find(".activity_titles");
        var btnPrev = $(root_banner).find(".icon_prev"), btnNext = $(root_banner).find(".icon_next");
        var total = $(images).find("li").length, isSliding = false, slideHandler = null;
        var timer;
        linkSlide();

        function linkSlide() {
            var link, linkDom, clickEvent, promote, promoteDom;
            $(images).find("li").each(function () {
                if ($(this).hasClass('current')) {
                    link = $(this).find('a').attr('data-link');
                    clickEvent = $(this).find('a').attr('onCLick');
                    promote = $(this).find('a').attr('data-promote');
                    if (promote == "1") {
                        promoteDom = '<span class="promote"></span>';
                    }
                    else {
                        promoteDom = "";
                    }
                    linkDom = '<a href="' + link + '" target="_blank" onClick="' + clickEvent + '" id="activityLink" class="activity_link">' + promoteDom + '</a>'
                }
            })
            if ($('#activityLink').length) {
                $('#activityLink').attr({'href': link, 'onClick': clickEvent});
                $('#activityLink').empty().prepend(promoteDom);
            } else {
                $(root_banner).append(linkDom);
            }
        }

        function slideTo(ordinal) {
            if (isSliding) return;
            var currentOrdinal = getCurrentOrdinal(), current = $(images).find("li").eq(currentOrdinal - 1);
            nextOrdinal = ordinal, next = $(images).find("li").eq(nextOrdinal - 1);
            isSliding = true;
            var $nextimg = $(next).find('a'), real_src;
            if (real_src = $nextimg.attr('data-src')) {
                real_src = 'background:url(' + real_src + ') center top no-repeat';
                $nextimg.attr('style', real_src);
            }
            $.when($(current).fadeOut(500), $(next).fadeIn(500)).done(function () {
                $(images).find("li").removeClass("current");
                $(titles).find("li").removeClass("current");
                isSliding = false;
                $(next).addClass("current");
                $(titles).find("li").eq(nextOrdinal - 1).addClass("current");
                linkSlide();
            });
        }

        function getCurrentOrdinal() {
            var current = $(images).find(".current"), currentOrdinal = $(current).prevAll().length + 1;
            return currentOrdinal;
        }

        function slidePrev() {
            var currentOrdinal = getCurrentOrdinal();
            var prevOrdinal = 1;
            if (currentOrdinal == 1) {
                prevOrdinal = total;
            } else {
                prevOrdinal = currentOrdinal - 1;
            }
            slideTo(prevOrdinal);
        }

        function slideNext() {
            var currentOrdinal = getCurrentOrdinal();
            var nextOrdinal = (currentOrdinal + 1) % total;
            slideTo(nextOrdinal);
        }

        $(root_banner).unbind('hover').hover(function () {
            $(btnPrev).fadeIn();
            $(btnNext).fadeIn();
            clearInterval(slideHandler);
            slideHandler = null;
        }, function () {
            $(btnPrev).fadeOut();
            $(btnNext).fadeOut();
            slideHandler = setInterval(function () {
                slideNext();
            }, 4000);
        });
        $(btnPrev).unbind('click').on("click", function () {
            slidePrev();
        }).hover(function (e) {
            clearInterval(slideHandler);
            slideHandler = null;
        }, function (e) {
        });
        $(btnNext).unbind('click').on("click", function () {
            slideNext();
        }).hover(function (e) {
            clearInterval(slideHandler);
            slideHandler = null;
        }, function (e) {
        });
        $(titles).unbind('mouseenter').on("mouseenter", "li", function () {
            var isCurrent = $(this).hasClass("current");
            if (isCurrent) return;
            var nextOrdinal = $(this).prevAll().length + 1;
            clearTimeout(timer);
            timer = setTimeout(function () {
                slideTo(nextOrdinal);
            }, 50);
            clearInterval(slideHandler);
            slideHandler = null;
        });
        $(titles).unbind('mouseleave').on('mouseleave', function () {
        });
        slideHandler = setInterval(function () {
            slideNext();
        }, 5000);
    }
    var subject_slide = function () {
        var root = $(".subject_slide"), images = $(root).find(".subject_images"), isSliding = false;
        images.on("mouseenter", "li", function () {
            var self = this;
            var isCurrent = $(this).hasClass("current");
            if (isCurrent) return;
            var current = $(images).find("li.current");
            if (isSliding) return;
            isSliding = true;
            $.when($(current).animate({width: "97px"}, 200), $(current).find("img").animate({left: "0"}, 200), $(self).animate({width: "122px"}, 200), $(this).find("img").animate({left: "-100px"}, 200)).done(function () {
                $(current).removeClass("current");
                $(self).addClass("current");
                isSliding = false;
            });
        });
    }
    var aside_tab = function () {
        var root = $(".aside_tab"), tabs = $(root).find(".tabs"), tabContents = $(root).find(".tab_contents");

        function switchTabTo(tab, ordinal) {
            $(tab).find(".tabs li").not(".separator").removeClass("current");
            $(tab).find(".tab_contents>li").removeClass("current");
            $(tab).find(".tabs li.separator").show();
            var currentTab = $(tab).find(".tabs li").not(".separator").eq(ordinal).addClass("current");
            if (currentTab.prev().hasClass("separator")) {
                currentTab.prev().hide();
            }
            if (currentTab.next().hasClass("separator")) {
                currentTab.next().hide();
            }
            $(tab).find(".tab_contents>li").eq(ordinal).addClass("current").find('.seller_item img').each(function () {
                var real_src = $(this).attr('data-src');
                if (real_src) {
                    $(this).removeAttr('data-src');
                    $(this).attr('src', real_src);
                }
            });
        }

        function switchOrderTabTo(tab, ordinal) {
            $(tab).find(".tabs li").not(".separator").removeClass("current");
            $(tab).find(".tab_contents>li").removeClass("current");
            $(tab).find(".tabs li.separator").show();
            var currentTab = $(tab).find(".tabs li").not(".separator").eq(ordinal).addClass("current");
            $(tab).find(".tab_contents>li").eq(ordinal).addClass("current").find('.seller_item img').each(function () {
                var real_src = $(this).attr('data-src');
                if (real_src) {
                    $(this).removeAttr('data-src');
                    $(this).attr('src', real_src);
                }
            });
        }

        $(tabs).on("click", "li", function () {
            if ($(this).hasClass("separator"))
                return;
            var tab = $(this).parents(".aside_tab"), ordinal = $(this).prevAll().not(".separator").length;
            if (tab.hasClass('order_tab')) {
                switchOrderTabTo(tab, ordinal);
            } else {
                switchTabTo(tab, ordinal);
            }
        });

        function trainForm() {
            var btn = $("#train_form .switch_btn"), input = $("#train_form input");
            btn.on("click", function () {
                var value = $(input).eq(0).val(), code = $(input).eq(0).attr("code");
                var value1 = $(input).eq(1).val(), code1 = $(input).eq(1).attr("code");
                $(input).eq(1).val(value).attr("code", code);
                $(input).eq(0).val(value1).attr("code", code1);
            });
        }

        function getCurrentOrdinal(tab) {
            return $(tab).find(".tabs li.current").prevAll().not(".separator").length;
        }

        function sale_tab() {
            var root = $(".sale_tab"), tabContents = $(root).find(".tab_contents"), switchHandler = null;
            var total = $(root).find(".tabs li").not(".separator").length;
            switchHandler = setInterval(function () {
                var nextOrdinal = (getCurrentOrdinal(root) + 1) % total;
                switchTabTo(root, nextOrdinal)
            }, 4000);
            $(root).hover(function () {
                clearInterval(switchHandler);
                switchHandler = null;
            }, function () {
                switchHandler = setInterval(function () {
                    var nextOrdinal = (getCurrentOrdinal(root) + 1) % total;
                    switchTabTo(root, nextOrdinal)
                }, 4000);
            });
        }

        trainForm();
    }
    var latest_order = function () {
        var root = $(".aside_summary .latest_order"), orderList = $(root).find(".order_list"), timerOrder;

        function slide() {
            timerOrder = setInterval(getLatestOrder, 3000);
            $(orderList).on({
                'mouseenter': function () {
                    clearInterval(timerOrder);
                }, 'mouseleave': function () {
                    timerOrder = setInterval(getLatestOrder, 3000);
                }
            })
        }

        function getLatestOrder() {
            var first = $(orderList).find("li").eq(0).remove();
            $(orderList).append(first);
            $(orderList).find("li").css("top", 0);
            $(orderList).find("li").animate({top: "-=63"}, "normal", "linear", function () {
            });
        }

        slide();
    }
    var layer = function () {
        var roots = $(".layer_box"), layerHeaders = $(roots).find(".layer_header"),
            layerBodyList = $(roots).find(".layer_body_list");
        var tabChangeHandler = null;
        layerHeaders.on("mouseover", ".tabs li", function (e) {
            if ($(this).hasClass("current")) {
                return;
            }
            var self = this;
            tabChangeHandler = setTimeout(function () {
                var root = $(self).parents(".layer_box"), tabs = $(root).find(".tabs"),
                    prevOrdinal = $(tabs).find(".current").index(), nextOrdinal = $(self).index(),
                    prevBody = $(root).find(".layer_body_list .layer_body").eq(prevOrdinal),
                    nextBody = $(root).find(".layer_body_list .layer_body").eq(nextOrdinal);
                $(tabs).find("li").removeClass("current");
                $(self).addClass("current");
                $(nextBody).find('.tab_list .pro_pic img').each(function () {
                    var real_src = $(this).attr('data-src');
                    if (real_src) {
                        $(this).attr('src', real_src).removeAttr('data-src');
                    }
                });
                $.when($(prevBody).fadeOut(), $(nextBody).fadeIn()).done(function () {
                    $(root).find(".layer_body_list .layer_body").removeClass("current_body");
                    $(nextBody).addClass("current_body");
                });
                tabChangeHandler = null;
            }, 100);
        });
        layerHeaders.on("mouseout", ".tabs li", function (e) {
            if (tabChangeHandler) {
                clearTimeout(tabChangeHandler);
                tabChangeHandler = null;
            }
        });
        layerHeaders.on("click", ".more a", function (e) {
            var root = $(this).parents(".layer_box");
            var url = $(root).find(".tabs .current").attr("data-more");
            $(this).attr("target", "_blank");
            $(this).attr("href", url);
            return true;
        });
        var youjiCoverHandler = null;
        layerBodyList.on("mouseenter", ".youji_img", function () {
            var productCover = $(this).find(".product_cover"), self = this;
            clearTimeout(this.youjiCoverHandler);
            self.youjiCoverHandler = setTimeout(function () {
                $(productCover).animate({bottom: "0"}, "fast");
                self.youjiCoverHandler = null;
            }, 50);
        });
        layerBodyList.on("mouseleave", ".youji_img", function () {
            var productCover = $(this).find(".product_cover");
            if (this.youjiCoverHandler) {
                clearTimeout(this.youjiCoverHandler);
                this.youjiCoverHandler = null;
            }
            $(productCover).animate({bottom: -50}, "fast");
        });
    }
    var CountDown = function (time, updateHandler) {
        var time = time, updateHandler = updateHandler;
        var obj = {
            handler: null, start: function () {
                obj.handler = setInterval(function () {
                    var elapsedTime = time.getTime() - Date.now();
                    updateHandler(obj.formatTime(elapsedTime));
                }, 1000);
            }, stop: function () {
                if (obj.handler) {
                    clearInterval(obj.handler);
                    obj.handler = null;
                }
            }, formatTime: function (time) {
                var second = 1000, minute = 60 * second, hour = 60 * minute, day = 24 * hour;
                return {
                    days: Math.floor(time / day),
                    hours: Math.floor((time % day) / hour),
                    minutes: Math.floor((time % day % hour) / minute),
                    seconds: Math.floor((time % day % hour % minute) / second)
                };
            }
        }
        return obj;
    }
    var sunshinePromise = function () {
        var root = $(".promise");
        root.on("mouseover", "li", function () {
            $(this).find("i").hide();
            var img = $(this).find("img"), src = $(img).attr("data-src");
            $(img).attr("src", src).show();
        });
        root.on("mouseout", "li", function () {
            $(this).find("i").show();
            var img = $(this).find("img");
            $(img).hide().attr("src", "");
        });
    }
    var page = function () {
        if ($(window).width() >= 1240) {
            $("body").addClass("index1200").removeClass('index1000');
        } else {
            $("body").removeClass("index1200").addClass('index1000');
        }
        var resizeHandler = null;
        $(window).resize(function (e) {
            if (resizeHandler) {
                clearTimeout(resizeHandler);
            }
            resizeHandler = setTimeout(function () {
                var width = $(window).width();
                if (width >= 1240) {
                    $("body").addClass("index1200").removeClass('index1000');
                } else {
                    $("body").removeClass("index1200").addClass('index1000');
                }
                resizeHandler = null;
            }, 20);
        });
        var bro = $.browser;
        if (bro.msie && bro.version == "9.0") {
            $("body").addClass("ie9");
        }
    };
    var clearTime3 = "";
    var clearTime4 = "";
    var mod_activity = function () {
        var root = $(".activity_con"), comments = $(root).find("ul");
        var li_heig = 0;

        function scroll() {
            li_heig = parseInt(comments.find("li").eq(0).height()) + 3;
            comments.find("li").animate({top: "-=" + li_heig}, "normal", "linear", function () {
            });
            clearTime3 = setTimeout(function () {
                var comment = comments.find("li").eq(0).remove();
                $(comments).append(comment);
                $(comments).find("li").css("top", 0);
                scroll();
            }, 8000);
        }

        if (comments.height() > root.height()) {
            comments.hover(function () {
                clearTimeout(clearTime3);
                clearTimeout(clearTime4);
            }, function () {
                clearTime4 = setTimeout(function () {
                    scroll();
                }, 1500);
            });
            scroll();
        }
    };
    var submenuinit = function () {
        $('.menu_panel .inner').one('mouseenter', function () {
            var $submenu = $('.subMenu_panel');
            var $textarea = $submenu.find('textarea.storedata');
            if ($textarea.length) {
                $submenu.html($textarea.text());
            }
        });
    };
    var hotPoint = function () {
        var hotBox = $('.hot-point');
        hotBox.selfanimate('hot', {
            duration: 700, easing: 'linear', step: function (animationProgress) {
                var _s = $(this), val = parseInt(animationProgress);
                _s.css({backgroundPosition: '1px ' + '-' + (parseInt(val * 70) - 70) + 'px'});
                if (val == 100) {
                    _s.find('.hot-num').attr('style', 'font-size:20px;right:24px;top:10px');
                } else {
                    _s.find('.hot-num').attr('style', 'font-size:24px;right:24px;');
                }
                _s.find('.hot-num').text(val);
            }
        });
    }
    window.CountDown = CountDown;
    return {
        init: function () {
            activity_slide();
            subject_slide();
            aside_tab();
            latest_order();
            layer();
            page();
            mod_activity();
            sunshinePromise();
            submenuinit();
            hotPoint();
        }
    };
});
;define('index_amd/jquery.pkgautocomplete', ['jquery'], function ($) {
    var utils = (function () {
        return {
            escapeRegExChars: function (value) {
                return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            }, createNode: function (containerClass) {
                var div = document.createElement('div');
                div.className = containerClass;
                div.style.position = 'absolute';
                div.style.display = 'none';
                return div;
            }
        };
    }()), keys = {ESC: 27, TAB: 9, RETURN: 13, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40};

    function Autocomplete(el, options) {
        var noop = function () {
        }, that = this, defaults = {
            ajaxSettings: {},
            autoSelectFirst: false,
            appendTo: document.body,
            serviceUrl: null,
            lookup: null,
            onSelect: null,
            width: 'auto',
            minChars: 1,
            maxHeight: 300,
            deferRequestBy: 0,
            params: {},
            formatResult: Autocomplete.formatResult,
            delimiter: null,
            zIndex: 9999,
            type: 'GET',
            noCache: false,
            onSearchStart: noop,
            onSearchComplete: noop,
            onSearchError: noop,
            containerClass: 'autocomplete-suggestions',
            tabDisabled: false,
            dataType: 'text',
            currentRequest: null,
            triggerSelectOnValidInput: true,
            preventBadQueries: true,
            lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
                return suggestion.value.toLowerCase().indexOf(queryLowerCase) !== -1;
            },
            paramName: 'query',
            transformResult: function (response) {
                return typeof response === 'string' ? $.parseJSON(response) : response;
            },
            showNoSuggestionNotice: false,
            noSuggestionNotice: 'No results',
            orientation: 'bottom',
            forceFixPosition: false
        };
        that.element = el;
        that.el = $(el);
        that.suggestions = [];
        that.badQueries = [];
        that.selectedIndex = -1;
        that.currentValue = that.element.value;
        that.intervalId = 0;
        that.cachedResponse = {};
        that.onChangeInterval = null;
        that.onChange = null;
        that.isLocal = false;
        that.suggestionsContainer = null;
        that.noSuggestionsContainer = null;
        that.options = $.extend({}, defaults, options);
        that.classes = {selected: 'autocomplete-selected', suggestion: 'autocomplete-suggestion'};
        that.hint = null;
        that.hintValue = '';
        that.selection = null;
        that.initialize();
        that.setOptions(options);
    }

    Autocomplete.utils = utils;
    $.PkgAutocomplete = Autocomplete;
    Autocomplete.formatResult = function (suggestion, currentValue) {
        var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';
        return suggestion.value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
    };
    Autocomplete.prototype = {
        killerFn: null, initialize: function () {
            var that = this, suggestionSelector = '.' + that.classes.suggestion, selected = that.classes.selected,
                options = that.options, container;
            that.element.setAttribute('autocomplete', 'off');
            that.killerFn = function (e) {
                if ($(e.target).closest('.' + that.options.containerClass).length === 0) {
                    that.killSuggestions();
                    that.disableKillerFn();
                }
            };
            that.noSuggestionsContainer = $('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0);
            that.suggestionsContainer = Autocomplete.utils.createNode(options.containerClass);
            container = $(that.suggestionsContainer);
            container.appendTo(options.appendTo);
            if (options.width !== 'auto') {
                container.width(options.width);
            }
            container.on('mouseover.autocomplete', suggestionSelector, function () {
                that.activate($(this).data('index'));
            });
            container.on('mouseout.autocomplete', function () {
                that.selectedIndex = -1;
                container.children('.' + selected).removeClass(selected);
            });
            container.on('click.autocomplete', suggestionSelector, function () {
                that.select($(this).data('index'));
            });
            that.fixPositionCapture = function () {
                if (that.visible) {
                    that.fixPosition();
                }
            };
            $(window).on('resize.autocomplete', that.fixPositionCapture);
            that.el.on('keydown.autocomplete', function (e) {
                that.onKeyPress(e);
            });
            that.el.on('keyup.autocomplete', function (e) {
                that.onKeyUp(e);
            });
            that.el.on('blur.autocomplete', function () {
                that.onBlur();
            });
            that.el.on('focus.autocomplete', function () {
                that.onFocus();
            });
            that.el.on('change.autocomplete', function (e) {
                that.onKeyUp(e);
            });
        }, onFocus: function () {
            var that = this;
            that.fixPosition();
            if (that.options.minChars <= that.el.val().length) {
                that.onValueChange();
            }
        }, onBlur: function () {
            this.enableKillerFn();
        }, setOptions: function (suppliedOptions) {
            var that = this, options = that.options;
            $.extend(options, suppliedOptions);
            that.isLocal = $.isArray(options.lookup);
            if (that.isLocal) {
                options.lookup = that.verifySuggestionsFormat(options.lookup);
            }
            options.orientation = that.validateOrientation(options.orientation, 'bottom');
            $(that.suggestionsContainer).css({
                'max-height': options.maxHeight + 'px',
                'width': options.width + 'px',
                'z-index': options.zIndex
            });
        }, clearCache: function () {
            this.cachedResponse = {};
            this.badQueries = [];
        }, clear: function () {
            this.clearCache();
            this.currentValue = '';
            this.suggestions = [];
        }, disable: function () {
            var that = this;
            that.disabled = true;
            clearInterval(that.onChangeInterval);
            if (that.currentRequest) {
                that.currentRequest.abort();
            }
        }, enable: function () {
            this.disabled = false;
        }, fixPosition: function () {
            var that = this, $container = $(that.suggestionsContainer), containerParent = $container.parent().get(0);
            if (containerParent !== document.body && !that.options.forceFixPosition)
                return;
            var orientation = that.options.orientation, containerHeight = $container.outerHeight(),
                height = that.el.outerHeight(), offset = that.el.offset(),
                styles = {'top': offset.top, 'left': offset.left};
            if (orientation == 'auto') {
                var viewPortHeight = $(window).height(), scrollTop = $(window).scrollTop(),
                    topOverflow = -scrollTop + offset.top - containerHeight,
                    bottomOverflow = scrollTop + viewPortHeight - (offset.top + height + containerHeight);
                orientation = (Math.max(topOverflow, bottomOverflow) === topOverflow) ? 'top' : 'bottom';
            }
            if (orientation === 'top') {
                styles.top += -containerHeight;
            } else {
                styles.top += height;
            }
            if (containerParent !== document.body) {
                var opacity = $container.css('opacity'), parentOffsetDiff;
                if (!that.visible) {
                    $container.css('opacity', 0).show();
                }
                parentOffsetDiff = $container.offsetParent().offset();
                styles.top -= parentOffsetDiff.top;
                styles.left -= parentOffsetDiff.left;
                if (!that.visible) {
                    $container.css('opacity', opacity).hide();
                }
            }
            if (that.options.width === 'auto') {
                styles.width = (that.el.outerWidth() - 2) + 'px';
            }
            $container.css(styles);
        }, enableKillerFn: function () {
            var that = this;
            $(document).on('click.autocomplete', that.killerFn);
        }, disableKillerFn: function () {
            var that = this;
            $(document).off('click.autocomplete', that.killerFn);
        }, killSuggestions: function () {
            var that = this;
            that.stopKillSuggestions();
            that.intervalId = window.setInterval(function () {
                that.hide();
                that.stopKillSuggestions();
            }, 50);
        }, stopKillSuggestions: function () {
            window.clearInterval(this.intervalId);
        }, isCursorAtEnd: function () {
            var that = this, valLength = that.el.val().length, selectionStart = that.element.selectionStart, range;
            if (typeof selectionStart === 'number') {
                return selectionStart === valLength;
            }
            if (document.selection) {
                range = document.selection.createRange();
                range.moveStart('character', -valLength);
                return valLength === range.text.length;
            }
            return true;
        }, onKeyPress: function (e) {
            var that = this;
            if (!that.disabled && !that.visible && e.which === keys.DOWN && that.currentValue) {
                that.suggest();
                return;
            }
            if (that.disabled || !that.visible) {
                return;
            }
            switch (e.which) {
                case keys.ESC:
                    that.el.val(that.currentValue);
                    that.hide();
                    break;
                case keys.RIGHT:
                    if (that.hint && that.options.onHint && that.isCursorAtEnd()) {
                        that.selectHint();
                        break;
                    }
                    return;
                case keys.TAB:
                    if (that.hint && that.options.onHint) {
                        that.selectHint();
                        return;
                    }
                case keys.RETURN:
                    if (that.selectedIndex === -1) {
                        that.hide();
                        return;
                    }
                    that.select(that.selectedIndex);
                    if (e.which === keys.TAB && that.options.tabDisabled === false) {
                        return;
                    }
                    break;
                case keys.UP:
                    that.moveUp();
                    break;
                case keys.DOWN:
                    that.moveDown();
                    break;
                default:
                    return;
            }
            e.stopImmediatePropagation();
            e.preventDefault();
        }, onKeyUp: function (e) {
            var that = this;
            if (that.disabled) {
                return;
            }
            switch (e.which) {
                case keys.UP:
                case keys.DOWN:
                    return;
            }
            clearInterval(that.onChangeInterval);
            if (that.currentValue !== that.el.val()) {
                that.findBestHint();
                if (that.options.deferRequestBy > 0) {
                    that.onChangeInterval = setInterval(function () {
                        that.onValueChange();
                    }, that.options.deferRequestBy);
                } else {
                    that.onValueChange();
                }
            }
        }, onValueChange: function () {
            var that = this, options = that.options, value = that.el.val(), query = that.getQuery(value), index;
            if (that.selection && that.currentValue !== query) {
                that.selection = null;
                (options.onInvalidateSelection || $.noop).call(that.element);
            }
            clearInterval(that.onChangeInterval);
            that.currentValue = value;
            that.selectedIndex = -1;
            if (options.triggerSelectOnValidInput) {
                index = that.findSuggestionIndex(query);
                if (index !== -1) {
                    that.select(index);
                    return;
                }
            }
            if (query.length < options.minChars) {
                that.hide();
            } else {
                that.getSuggestions(query);
            }
        }, findSuggestionIndex: function (query) {
            var that = this, index = -1, queryLowerCase = query.toLowerCase();
            $.each(that.suggestions, function (i, suggestion) {
                if (suggestion.value.toLowerCase() === queryLowerCase) {
                    index = i;
                    return false;
                }
            });
            return index;
        }, getQuery: function (value) {
            var delimiter = this.options.delimiter, parts;
            if (!delimiter) {
                return value;
            }
            parts = value.split(delimiter);
            return $.trim(parts[parts.length - 1]);
        }, getSuggestionsLocal: function (query) {
            var that = this, options = that.options, queryLowerCase = query.toLowerCase(),
                filter = options.lookupFilter, limit = parseInt(options.lookupLimit, 10), data;
            data = {
                suggestions: $.grep(options.lookup, function (suggestion) {
                    return filter(suggestion, query, queryLowerCase);
                })
            };
            if (limit && data.suggestions.length > limit) {
                data.suggestions = data.suggestions.slice(0, limit);
            }
            return data;
        }, getSuggestions: function (q) {
            var response, that = this, options = that.options, serviceUrl = options.serviceUrl, params, cacheKey,
                ajaxSettings;
            options.params[options.paramName] = q;
            params = options.ignoreParams ? null : options.params;
            if (options.onSearchStart.call(that.element, options.params) === false) {
                return;
            }
            if (that.isLocal) {
                response = that.getSuggestionsLocal(q);
            } else {
                if ($.isFunction(serviceUrl)) {
                    serviceUrl = serviceUrl.call(that.element, q);
                }
                cacheKey = serviceUrl + '?' + $.param(params || {});
                response = that.cachedResponse[cacheKey];
            }
            if (response && $.isArray(response.suggestions)) {
                that.suggestions = response.suggestions;
                that.suggest();
                options.onSearchComplete.call(that.element, q, response.suggestions);
            } else if (!that.isBadQuery(q)) {
                if (that.currentRequest) {
                    that.currentRequest.abort();
                }
                ajaxSettings = {url: serviceUrl, data: params, type: options.type, dataType: options.dataType};
                $.extend(ajaxSettings, options.ajaxSettings);
                that.currentRequest = $.ajax(ajaxSettings).done(function (data) {
                    var result;
                    that.currentRequest = null;
                    result = options.transformResult(data);
                    that.processResponse(result, q, cacheKey);
                    options.onSearchComplete.call(that.element, q, result.suggestions);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    options.onSearchError.call(that.element, q, jqXHR, textStatus, errorThrown);
                });
            } else {
                options.onSearchComplete.call(that.element, q, []);
            }
        }, isBadQuery: function (q) {
            if (!this.options.preventBadQueries) {
                return false;
            }
            var badQueries = this.badQueries, i = badQueries.length;
            while (i--) {
                if (q.indexOf(badQueries[i]) === 0) {
                    return true;
                }
            }
            return false;
        }, hide: function () {
            var that = this;
            that.visible = false;
            that.selectedIndex = -1;
            clearInterval(that.onChangeInterval);
            $(that.suggestionsContainer).hide();
            that.signalHint(null);
        }, suggest: function () {
            if (this.suggestions.length === 0) {
                this.options.showNoSuggestionNotice ? this.noSuggestions() : this.hide();
                return;
            }
            var that = this, options = that.options, groupBy = options.groupBy, formatResult = options.formatResult,
                value = that.getQuery(that.currentValue), className = that.classes.suggestion,
                classSelected = that.classes.selected, container = $(that.suggestionsContainer),
                noSuggestionsContainer = $(that.noSuggestionsContainer), beforeRender = options.beforeRender, html = '',
                category, formatGroup = function (suggestion, index) {
                    var currentCategory = suggestion.data[groupBy];
                    if (category === currentCategory) {
                        return '';
                    }
                    category = currentCategory;
                    return '<div class="autocomplete-group"><strong>' + category + '</strong></div>';
                }, index;
            if (options.triggerSelectOnValidInput) {
                index = that.findSuggestionIndex(value);
                if (index !== -1) {
                    that.select(index);
                    return;
                }
            }
            $.each(that.suggestions, function (i, suggestion) {
                if (groupBy) {
                    html += formatGroup(suggestion, value, i);
                }
                html += '<div class="' + className + '" data-index="' + i + '">' + formatResult(suggestion, value) + '</div>';
            });
            this.adjustContainerWidth();
            noSuggestionsContainer.detach();
            container.html(html);
            if (options.autoSelectFirst) {
                that.selectedIndex = 0;
                container.children().first().addClass(classSelected);
            }
            if ($.isFunction(beforeRender)) {
                beforeRender.call(that.element, container);
            }
            that.fixPosition();
            container.show();
            that.visible = true;
            that.findBestHint();
        }, noSuggestions: function () {
            var that = this, container = $(that.suggestionsContainer),
                noSuggestionsContainer = $(that.noSuggestionsContainer);
            this.adjustContainerWidth();
            noSuggestionsContainer.detach();
            container.empty();
            container.append(noSuggestionsContainer);
            that.fixPosition();
            container.show();
            that.visible = true;
        }, adjustContainerWidth: function () {
            var that = this, options = that.options, width, container = $(that.suggestionsContainer);
            if (options.width === 'auto') {
                width = that.el.outerWidth() - 2;
                container.width(width > 0 ? width : 300);
            }
        }, findBestHint: function () {
            var that = this, value = that.el.val().toLowerCase(), bestMatch = null;
            if (!value) {
                return;
            }
            $.each(that.suggestions, function (i, suggestion) {
                var foundMatch = suggestion.value.toLowerCase().indexOf(value) === 0;
                if (foundMatch) {
                    bestMatch = suggestion;
                }
                return !foundMatch;
            });
            that.signalHint(bestMatch);
        }, signalHint: function (suggestion) {
            var hintValue = '', that = this;
            if (suggestion) {
                hintValue = that.currentValue + suggestion.value.substr(that.currentValue.length);
            }
            if (that.hintValue !== hintValue) {
                that.hintValue = hintValue;
                that.hint = suggestion;
                (this.options.onHint || $.noop)(hintValue);
            }
        }, verifySuggestionsFormat: function (suggestions) {
            if (suggestions.length && typeof suggestions[0] === 'string') {
                return $.map(suggestions, function (value) {
                    return {value: value, data: null};
                });
            }
            return suggestions;
        }, validateOrientation: function (orientation, fallback) {
            orientation = $.trim(orientation || '').toLowerCase();
            if ($.inArray(orientation, ['auto', 'bottom', 'top']) === -1) {
                orientation = fallback;
            }
            return orientation;
        }, processResponse: function (result, originalQuery, cacheKey) {
            var that = this, options = that.options;
            result.suggestions = that.verifySuggestionsFormat(result.suggestions);
            if (!options.noCache) {
                that.cachedResponse[cacheKey] = result;
                if (options.preventBadQueries && result.suggestions.length === 0) {
                    that.badQueries.push(originalQuery);
                }
            }
            if (originalQuery !== that.getQuery(that.currentValue)) {
                return;
            }
            that.suggestions = result.suggestions;
            that.suggest();
        }, activate: function (index) {
            var that = this, activeItem, selected = that.classes.selected, container = $(that.suggestionsContainer),
                children = container.find('.' + that.classes.suggestion);
            container.find('.' + selected).removeClass(selected);
            that.selectedIndex = index;
            if (that.selectedIndex !== -1 && children.length > that.selectedIndex) {
                activeItem = children.get(that.selectedIndex);
                $(activeItem).addClass(selected);
                return activeItem;
            }
            return null;
        }, selectHint: function () {
            var that = this, i = $.inArray(that.hint, that.suggestions);
            that.select(i);
        }, select: function (i) {
            var that = this;
            that.hide();
            that.onSelect(i);
        }, moveUp: function () {
            var that = this;
            if (that.selectedIndex === -1) {
                return;
            }
            if (that.selectedIndex === 0) {
                $(that.suggestionsContainer).children().first().removeClass(that.classes.selected);
                that.selectedIndex = -1;
                that.el.val(that.currentValue);
                that.findBestHint();
                return;
            }
            that.adjustScroll(that.selectedIndex - 1);
        }, moveDown: function () {
            var that = this;
            if (that.selectedIndex === (that.suggestions.length - 1)) {
                return;
            }
            that.adjustScroll(that.selectedIndex + 1);
        }, adjustScroll: function (index) {
            var that = this, activeItem = that.activate(index), offsetTop, upperBound, lowerBound, heightDelta = 25;
            if (!activeItem) {
                return;
            }
            offsetTop = activeItem.offsetTop;
            upperBound = $(that.suggestionsContainer).scrollTop();
            lowerBound = upperBound + that.options.maxHeight - heightDelta;
            if (offsetTop < upperBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop);
            } else if (offsetTop > lowerBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop - that.options.maxHeight + heightDelta);
            }
            that.el.val(that.getValue(that.suggestions[index].value));
            that.signalHint(null);
        }, onSelect: function (index) {
            var that = this, onSelectCallback = that.options.onSelect, suggestion = that.suggestions[index];
            that.currentValue = that.getValue(suggestion.value);
            if (that.currentValue !== that.el.val()) {
                that.el.val(that.currentValue);
            }
            that.signalHint(null);
            that.suggestions = [];
            that.selection = suggestion;
            if ($.isFunction(onSelectCallback)) {
                onSelectCallback.call(that.element, suggestion);
            }
        }, getValue: function (value) {
            var that = this, delimiter = that.options.delimiter, currentValue, parts;
            if (!delimiter) {
                return value;
            }
            currentValue = that.currentValue;
            parts = currentValue.split(delimiter);
            if (parts.length === 1) {
                return value;
            }
            return currentValue.substr(0, currentValue.length - parts[parts.length - 1].length) + value;
        }, dispose: function () {
            var that = this;
            that.el.off('.autocomplete').removeData('autocomplete');
            that.disableKillerFn();
            $(window).off('resize.autocomplete', that.fixPositionCapture);
            $(that.suggestionsContainer).remove();
        }
    };
    $.fn.pkgautocomplete = $.fn.pkgdevbridgeAutocomplete = function (options, args) {
        var dataKey = 'autocomplete';
        if (arguments.length === 0) {
            return this.first().data(dataKey);
        }
        return this.each(function () {
            var inputElement = $(this), instance = inputElement.data(dataKey);
            if (typeof options === 'string') {
                if (instance && typeof instance[options] === 'function') {
                    instance[options](args);
                }
            } else {
                if (instance && instance.dispose) {
                    instance.dispose();
                }
                instance = new Autocomplete(this, options);
                inputElement.data(dataKey, instance);
            }
        });
    };
});
;
;(function (factory) {
    if (define) {
        define('filter-iframe', ['jquery'], function ($) {
            factory($);
        });
    } else if (window.jQuery) {
        factory(window.jQuery);
    }
})(function ($) {
    var whiteList = ['tuniu.com', 'weibo.com'];

    function match(url) {
        for (var i = whiteList.length - 1; i >= 0; i--) {
            if (new RegExp('^(http[s]?\\://)?[^\/]*' + whiteList[i]).test(url)) {
                return true;
            }
        }
        ;
        return false;
    }

    $('iframe').each(function () {
        if (!match(this.src)) {
            this.parentNode.removeChild(this);
        }
    });
});
;define('config/Base', [], function () {
    return {
        page: {
            diy: '//super.tuniu.com/pkg/',
            flight: '//www.tuniu.com/flight/',
            flightForeign: '//www.tuniu.com/flight/',
            trainDomestic: '//huoche.tuniu.com/',
            hotelDomestic: '//hotel.tuniu.com/',
            ticket: '//s.tuniu.com/',
            cruise: '//youlun.tuniu.com/',
            visa: '//www.tuniu.com/visa/',
            local: '//s.tuniu.com/',
            globalHotel: '//globalhotel.tuniu.com/',
            wifi: '//www.tuniu.com/tucom/'
        },
        CityUrl: {
            package: {
                departHot: '/tn?r=PoiAjax/SuperCitiesDepart&jsoncallback=?',
                departFuzzy: '/tn?r=supdiy/trainAjax/FuzzySearchCity&searchType=1',
                destHot: '/tn?r=PoiAjax/SuperCitiesDest&jsoncallback=?',
                destFuzzy: '/tn?r=supdiy/trainAjax/FuzzySearchCity&searchType=2'
            },
            flight: {
                departHot: '/tn?r=PoiAjax/FlightDomesticCities&jsoncallback=?',
                departFuzzy: '/tn?r=PoiAjax/GetCityLike&flag=flightDomestic',
                destHot: '/tn?r=PoiAjax/FlightDomesticCities&jsoncallback=?',
                destFuzzy: '/tn?r=PoiAjax/GetCityLike&flag=flightDomesticDest'
            },
            flightForeign: {
                departHot: '/tn?r=PoiAjax/FlightInternationalCities&jsoncallback=?',
                departFuzzy: '/tn?r=PoiAjax/GetCityLike&flag=flightInternation',
                destHot: '/tn?r=PoiAjax/FlightInternationalCities&jsoncallback=?',
                destFuzzy: '/tn?r=PoiAjax/GetCityLike&flag=flightInternationDest'
            },
            train: {
                departHot: '/tn?r=PoiAjax/TrainCities&jsoncallback=?',
                departFuzzy: '/tn?r=train/trainTicket/getStation',
                destHot: '/tn?r=PoiAjax/TrainCities&jsoncallback=?',
                destFuzzy: '/tn?r=train/trainTicket/getStation'
            },
            bus: {
                departHot: '/tn?r=coach/coachTicket/getHotDptCityForIndex&jsoncallback=?',
                departFuzzy: '/tn?r=coach/coachTicket/fruzzQueryDptForIndex',
                destHot: '/tn?r=coach/coachTicket/getHotDstCityForIndex&jsoncallback=?',
                destFuzzy: '/tn?r=coach/coachTicket/fruzzQueryDstForIndex',
                getPreSellDayByCity: '/tn?r=coach/coachTicket/GetPreSellDayByCity'
            },
            hotel: {
                destHot: '/tn?r=PoiAjax/HotelDomesticCities&jsoncallback=?',
                destFuzzy: '/tn?r=PoiAjax/GetCityLike&flag=hotelDomestic',
                keyWords: '/tn?r=PoiAjax/HotelCityPoi&jsoncallback=?',
                glabalHotel: '/tn?r=PoiAjax/HotelInternationalCities&jsoncallback=?',
                glabalFuzzy: '/tn?r=PoiAjax/GetCityLike&flag=hotelInternational'
            },
            hotelScenery: {
                sceneryHotel: '/tn?r=PoiAjax/HotelScenic&jsoncallback=?',
                sceneryFuzzy: '/tn?r=PoiAjax/HotelScenicLike'
            },
            ticket: {destHot: '/tn?r=PoiAjax/TicketHots&jsoncallback=?', destFuzzy: '/tn?r=dynamic/ajaxGetCity'},
            local: {destHot: '/tn?r=PoiAjax/LocalHots&jsoncallback=?', destFuzzy: '/tn?r=dynamic/ajaxGetCity'},
            visa: {
                visaCountry: '/tn?r=PoiAjax/Countries&jsoncallback=?',
                visaCountryFuzzy: '/tn?r=PoiAjax/GetCityLike&flag=visa'
            },
            wifi: {wifiCountry: '/tn?r=poiAjax/WifiDestCity&jsoncallback=?', visaCountryFuzzy: ''}
        }
    }
});
;define('component/adult-child', ['underscore', 'backbone', 'jquery', 'component/component', 'unit/drop-select'], function (_, Backbone, $, ComponentFactory, DropSelect) {
    var DefaultConfig = {defaults: {adult: 1, child: 0}};

    function buildOptionsData(range) {
        var options = [];
        for (var i = range.min; i <= range.max; i++) {
            options.push({value: i, name: i});
        }
        return options;
    }

    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var self = this;
                config = this.config = _.extend({}, DefaultConfig, config);
                this.data.adult = config.defaults.adult;
                this.data.child = config.defaults.child;
                this.element = element;
                this.$('.J_SearchAdult').dropSelect({
                    defaultOption: this.data.adult,
                    options: buildOptionsData({min: 1, max: 9}),
                    className: {
                        options: 'search_ctrl_select_options',
                        option: 'search_ctrl_select_option',
                        optionSelected: 'search_ctrl_select_option_selected',
                        expand: 'search_ctrl_select_expanded'
                    },
                    onChange: function (data) {
                        self._set('adult', data.value);
                    }
                });
                this.$('.J_SearchChild').dropSelect({
                    defaultOption: this.data.child,
                    options: buildOptionsData({min: 0, max: 6}),
                    className: {
                        options: 'search_ctrl_select_options',
                        option: 'search_ctrl_select_option',
                        optionSelected: 'search_ctrl_select_option_selected',
                        expand: 'search_ctrl_select_expanded'
                    },
                    onChange: function (data) {
                        self._set('child', data.value);
                    }
                });
            }, check: function () {
                return !!this.get('adult');
            }, set: function (date) {
                this.__super.set.call(this, 'number', date);
                this.$('.search_number_input').val(date);
            }
        });
    }
});
;define('component/brand-type', ['underscore', 'backbone', 'jquery', 'component/component', 'unit/drop-select'], function (_, Backbone, $, ComponentFactory, DropSelect) {
    var DefaultConfig = {defaultType: 1, selector: '.J_SearchType', options: []};
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var self = this;
                config = this.config = _.extend({}, DefaultConfig, config);
                this.element = element;
                this.$(config.selector).dropSelect({
                    defaultOption: config.defaultType,
                    options: config.options,
                    className: {
                        options: 'search_ctrl_select_options',
                        option: 'search_ctrl_select_option',
                        optionSelected: 'search_ctrl_select_option_selected',
                        expand: 'search_ctrl_select_expanded'
                    },
                    onChange: function (data) {
                        self._set('type', data.value);
                    }
                });
            }, check: function () {
                return !!((this.get('type') == undefined || this.get('type') == null) ? false : true);
            }, set: function (date) {
                this.__super.set.call(this, 'number', date);
                this.$('.search_number_input').val(date);
            }
        });
    }
});
;define('component/button', ['underscore', 'backbone', 'jquery', 'component/component'], function (_, Backbone, $, ComponentFactory) {
    var ViewHTML = '<div class="search_row">' + '<div class="search_ctrl search_ctrl_add">' + '<a href="javascript:;" class="search_ctrl_add_btn"><i class="search_ctrl_add_icon">+</i>增加目的地</a>' + '</div>' + '</div>'
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                if (element) {
                    this.element = element;
                } else {
                    blankView = true;
                    element = this.element = this.buildView();
                }
                element.click(_.bind(function () {
                    this.trigger('click');
                }, this));
            }, show: function () {
                this.element.show();
            }, hide: function () {
                this.element.hide();
            }, buildView: function () {
                return $(ViewHTML);
            }
        });
    }
});
;define('component/checkbox', ['underscore', 'backbone', 'jquery', 'component/component'], function (_, Backbone, $, ComponentFactory) {
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var self = this;
                this.element = element;
                this.$('.J_SearchRail').click(function () {
                    if (!$(this).hasClass('high_selected')) {
                        $(this).addClass('high_selected');
                        $(this).data('value', 'high');
                        self.trigger('changed', $(this).data('value'));
                    } else {
                        $(this).removeClass('high_selected');
                        $(this).data('value', 'regular');
                        self.trigger('changed', $(this).data('value'));
                    }
                })
            }
        });
    }
});
;define('component/city', ['underscore', 'backbone', 'jquery', 'component/component', 'unit/city-picker', 'unit/placeholder'], function (_, Backbone, $, ComponentFactory) {
    var DefaultConfig = {
        placeholderEnable: true,
        placeholder: '目的地',
        labelEnable: false,
        acEnabled: true,
        acError: false,
        label: '出发城市',
        dropUrl: '',
        autoCompleteUrl: '',
        defaults: {},
        propertyConfig: {pj: {optional: true}, url: {optional: true}},
        beforeRenderDrop: '',
        noSuggestionNotice: '暂不支持该目的地',
        init: ''
    };
    var ViewHTML = '<div class="search_ctrl search_ctrl_inp search_ctrl_city">' + '<input class="search_ctrl_inp_input" name="" type="text"/>' + '</div>';
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var self = this, selectedData;
                config = this.config = $.extend(true, {}, DefaultConfig, config);
                selectedData = config.defaults;
                if (element && element.length) {
                    this.element = element;
                } else {
                    element = this.element = this.buildView();
                }
                this.data.code = selectedData.code;
                this.data.name = selectedData.name;
                this.$('.search_ctrl_inp_input').cityPicker({
                    selected: selectedData,
                    dropUrl: config.dropUrl,
                    acEnabled: config.acEnabled,
                    acError: config.acError,
                    isTrain: config.isTrain,
                    catFlag: config.catFlag || '',
                    autoCompleteKey: config.autoCompleteKey,
                    autoComplete: {serviceUrl: config.autoCompleteUrl, noSuggestionNotice: config.noSuggestionNotice},
                    beforeRenderDrop: config.beforeRenderDrop,
                    onChange: function (data) {
                        if ($('.J_SBkeyWords').length) {
                            $('.J_SBkeyWords').remove();
                        }
                        $('.J_InternalHotel .J_SearchKeyWord').find('input').val('');
                        self._set({
                            code: data.code,
                            name: data.name,
                            days: data.travelDay,
                            pj: (data.pj === undefined ? 1 : data.pj),
                            url: data.url || ''
                        });
                        if (typeof config.onChange === "function") {
                            config.onChange(data, self.getElement());
                        }
                    },
                    setScene: function (data, type) {
                        if (type == 'domestic') {
                            self.trigger("domesticChanged", data);
                        } else if (type == 'foreign') {
                            self.trigger("foreignChanged", data);
                        }
                    }
                }).val(this.data.name || '');
                if (config.placeholderEnable) {
                    this.element.placeholder({placeholderSelector: '.search_ctrl_inp_placeholder', hideOnFocus: true});
                }
                if (typeof config.init === "function") {
                    config.init.call(self);
                }
            }, buildView: function () {
                var element = $(ViewHTML.replace(/\{label\}/g, this.config.label));
                if (this.config.placeholderEnable) {
                    element.append('<div class="search_ctrl_inp_placeholder">' + this.config.placeholder + '</div>');
                }
                if (this.config.labelEnable) {
                    element.append('<div class="search_ctrl_inp_label">' + this.config.label + '</div>');
                }
                return element;
            }, getElement: function () {
                return this.$('.search_ctrl_inp_input');
            }, set: function (cityCode, cityName) {
                this.__super.set.call(this, {code: cityCode, name: cityName});
                this.$('.search_ctrl_inp_input').val(cityName).trigger('blur');
            }
        });
    }
});
;define('component/city-city', ['underscore', 'backbone', 'jquery', 'unit/tool', 'component/component', 'component/city'], function (_, Backbone, $, Tool, ComponentFactory, CityFactory) {
    var DefaultConfig = {depart: {}, dest: {}, defaults: {depart: {}, dest: {}}, onSwapCities: ''};
    var ViewHTML = '<div class="search_city_group">' + '<div class="J_SearchDepart search_ctrl search_ctrl_inp search_ctrl_city search_flight_single_depart">' + '<div class="search_ctrl_inp_placeholder">出发地</div>' + '<input class="search_ctrl_inp_input" name="" type="text"/>' + '</div>' + '<div class="J_SearchChange search_ctrl search_flight_single_change">' + '<i class="icon_search_change"></i>' + '</div>' + '<div class="J_SearchDest search_ctrl search_ctrl_inp search_ctrl_city search_flight_single_dest">' + '<div class="search_ctrl_inp_placeholder">目的地</div>' + '<input class="search_ctrl_inp_input" name="" type="text"/>' + '</div>' + '</div>';
    return function (element, config) {
        return ComponentFactory({
            defaults: function () {
                return {departCode: 0, departName: ''}
            }, init: function () {
                var departCity, destCity;
                config = this.config = $.extend(true, {}, DefaultConfig, config);
                if (element && element.length) {
                    this.element = element;
                } else {
                    element = this.element = this.buildView();
                }
                departCity = this.departCity = CityFactory(this.$('.J_SearchDepart'), $.extend(true, {}, config.depart, config.defaults.depart, config.isTrain));
                destCity = this.destCity = CityFactory(this.$('.J_SearchDest'), $.extend(true, {}, config.dest, config.defaults.dest, config.isTrain));
                this.$('.J_SearchChange').click(_.bind(function (index, element) {
                    this.swapCities();
                }, this));
                departCity.on('changed', _.bind(function () {
                    this._set({departCode: departCity.get('code'), departName: departCity.get('name')})
                }, this));
                destCity.on('changed', _.bind(function () {
                    this._set({destCode: destCity.get('code'), destName: destCity.get('name')})
                }, this));
                this.set({
                    departCode: departCity.get('code'),
                    departName: departCity.get('name'),
                    destCode: destCity.get('code'),
                    destName: destCity.get('name')
                })
            }, buildView: function () {
                return $(ViewHTML);
            }, swapCities: function () {
                var departCode = this.get('departCode'), departName = this.get('departName');
                if (departCode != this.get('destCode')) {
                    this._set({
                        departCode: this.get('destCode'),
                        departName: this.get('destName'),
                        destCode: departCode,
                        destName: departName
                    });
                    this.departCity.set(this.get('departCode'), this.get('departName'));
                    this.destCity.set(this.get('destCode'), this.get('destName'));
                    if (typeof config.onSwapCities === "function") {
                        config.onSwapCities.call(this);
                    }
                }
            }, set: function (property, value) {
                this.__super.set.call(this, property, value);
                this.departCity.set(this.get('departCode'), this.get('departName'));
                this.destCity.set(this.get('destCode'), this.get('destName'));
            }, getData: function () {
                var depart = this.departCity.getData(), dest = this.destCity.getData();
                if (depart && dest) {
                    return {departCode: depart.code, departName: depart.name, destCode: dest.code, destName: dest.name}
                }
                return false;
            }
        });
    }
});
;define('component/city-city-date', ['underscore', 'backbone', 'jquery', 'unit/tool', 'component/component', 'component/city-city', 'component/date'], function (_, Backbone, $, Tool, ComponentFactory, CitiesFactory, DateFactory) {
    var DefaultConfig = {cityGroup: {depart: {}, dest: {}}, date: {}, defaults: {}};
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var cities, date, blankView = false;
                config = this.config = $.extend(true, {}, DefaultConfig, config);
                if (element && element.length) {
                    this.element = element;
                } else {
                    element = this.element = this.buildView();
                    blankView = true;
                }
                cities = this.cities = CitiesFactory(this.$('.J_SearchCities'), $.extend(true, {}, config.cityGroup, {
                    defaults: {
                        depart: {
                            name: config.defaults.departName,
                            code: config.defaults.departCode
                        }, dest: {name: config.defaults.destName, code: config.defaults.destCode}
                    }
                }));
                date = this.date = DateFactory(this.$('.J_SearchDate'), $.extend(true, {}, config.date, {defaults: {date: config.defaults.date}}));
                this._set(date.get(), true);
                this._set(cities.get(), true);
                if (blankView) {
                    this.element.append(cities.getDOM(), date.getDOM(), this.buildDelete());
                }
                this.$('.search_dest_delete').click(_.bind(function () {
                    if (this.removeable) {
                        this.destroy();
                    }
                }, this));
                date.on('changed', _.bind(function () {
                    this._set('date', date.get('date'));
                }, this));
                cities.on('changed', _.bind(function () {
                    this._set(cities.get());
                }, this));
            }, set: function (property, value) {
                this.__super.set.call(this, property, value);
                this.cities.set(property, value);
                this.date.set(this.get('date'));
            }, setDateMin: function (date) {
                this.date.changeMin(date);
            }, buildView: function () {
                return $('<div />').addClass('search_row');
            }, buildDelete: function () {
                return $('<div class="search_dest_delete search_row_delete"><i class="search_icon icon_search_delete"></i></div>')
            }, disableRemove: function () {
                this.removeable = false;
                this.updateRemoveStatus();
            }, enableRemove: function () {
                this.removeable = true;
                this.updateRemoveStatus();
            }, updateRemoveStatus: function () {
                if (this.removeable) {
                    this.element.addClass('search_row_removable');
                } else {
                    this.element.removeClass('search_row_removable');
                }
            }, destroy: function () {
                this.element.remove();
                this.trigger('destroy', this);
                this.stopListening();
            }, getData: function () {
                var cities = this.cities.getData(), date = this.date.getData();
                if (cities && date) {
                    return $.extend({}, cities, date);
                }
                return false;
            }
        });
    }
});
;
/*! Component-双城市+单日期模块*/
define('component/city-city-date-group', ['underscore', 'backbone', 'jquery', 'unit/tool', 'component/component', 'component/city-city-date'], function (_, Backbone, $, Tool, ComponentFactory, RowFactory) {
    var Today = Tool.date2Str(new Date),
        DefaultConfig = {cityDate: {}, departDate: Tool.date2Str(new Date), max: 4, defaults: []};
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var selectedData, rowNumber, rowElements;
                this.element = element;
                this.rowList = [];
                config = this.config = $.extend(true, {}, DefaultConfig, config);
                selectedData = config.defaults;
                rowElements = this.$('.search_row');
                rowNumber = Math.max(1, selectedData.length, rowElements.length);
                _.times(rowNumber, _.bind(function (index) {
                    var element = rowElements.get(index) ? $(rowElements.get(index)) : null,
                        rowData = selectedData[index] || {};
                    this.add(element, rowData);
                }, this));
            }, changeDepartDate: function (date) {
                this.config.departDate = date;
                this.updateDateRange();
            }, add: function (element, defaultData) {
                var row;
                if (this.rowList.length >= this.config.max) {
                    return;
                }
                row = RowFactory(element, $.extend({}, this.config.cityDate, {defaults: defaultData || {}}));
                row.on('destroy', _.bind(function (row) {
                    this.remove(row);
                }, this));
                row.on('changed', _.bind(function (changedData) {
                    if ('date' in changedData) {
                        this.updateDateRange();
                    }
                }, this));
                this.element.append(row.getDOM());
                this.rowList.push(row);
                this.updateDateRange();
                this.updateRemoveStatus();
                if (this.rowList.length >= this.config.max) {
                    this.trigger('filled');
                }
            }, remove: function (row) {
                var index = _.indexOf(this.rowList, row);
                if (~index) {
                    this.rowList.splice(index, 1);
                    this.updateDateRange();
                    this.updateRemoveStatus();
                    if (this.rowList.length < this.config.max) {
                        this.trigger('unfilled');
                    }
                }
            }, updateRemoveStatus: function () {
                var removable = this.rowList.length > 1;
                _.each(this.rowList, function (row) {
                    if (removable) {
                        row.enableRemove();
                    } else {
                        row.disableRemove();
                    }
                });
            }, updateDateRange: function () {
                var firstRow = _.first(this.rowList), departDate = firstRow.get('date'), prevDate = Today;
                _.each(this.rowList, function (row) {
                    var date = row.get('date');
                    if (date < prevDate) {
                        row.set('date', prevDate);
                    }
                    row.setDateMin(prevDate);
                    prevDate = Tool.getDeltaDateStr(row.get('date'), 3);
                });
            }, setFirstDest: function (property, value) {
                var firstRow = _.first(this.rowList);
                if (firstRow) {
                    firstRow.set(property, value);
                }
            }, getData: function () {
                var error = false, data = _.map(this.rowList, function (row) {
                    var rowData = row.getData();
                    if (!rowData) {
                        error = true;
                    }
                    return rowData;
                });
                return error ? false : data;
            }
        });
    }
});
;define('component/city-number', ['underscore', 'backbone', 'jquery', 'unit/tool', 'component/component', 'component/city', 'component/number'], function (_, Backbone, $, Tool, ComponentFactory, CityFactory, NumberFactory) {
    var dateReg = /(\d{4})\-(\d{2})\-(\d{2})/;

    function getMDStr(dateStr) {
        var matchRes = dateReg.exec(dateStr);
        return matchRes ? matchRes[1] + '-' + matchRes[2] + '-' + matchRes[3] : dateStr;
    }

    var DefaultConfig = {
        city: {labelEnable: true, label: '目的地', placeholderEnable: false},
        number: {},
        defaults: {code: 0, name: '', number: 3}
    };
    return function (element, config) {
        return ComponentFactory({
            defaults: function () {
                return {code: 0, name: '', number: 0}
            }, init: function () {
                var departCity, departDate, blankView = false;
                if (element) {
                    this.element = element;
                } else {
                    blankView = true;
                    element = this.element = this.buildView();
                }
                config = this.config = $.extend(true, {}, DefaultConfig, config);
                this.data.number = config.defaults.number;
                this.data.code = config.defaults.code;
                this.data.name = config.defaults.name;
                departCity = this.departCity = CityFactory(element.find('.J_SearchCity'), $.extend({}, config.city, {
                    defaults: {
                        code: config.defaults.code,
                        name: config.defaults.name
                    }, autoCompleteKey: config.autoCompleteKey
                }));
                departDate = this.departDate = NumberFactory(element.find('.J_SearchNumber'), {defaults: {number: config.defaults.number}});
                if (blankView) {
                    this.element.append(departCity.getDOM(), this.buildDateRange(), departDate.getDOM(), this.buildDelete());
                }
                this.$('.search_dest_delete').click(_.bind(function () {
                    if (this.removeable) {
                        this.destroy();
                    }
                }, this));
                departDate.on('changed', _.bind(function () {
                    this._set('number', departDate.get('number'));
                }, this));
                departCity.on('changed', _.bind(function () {
                    var days;
                    this._set({code: departCity.get('code'), name: departCity.get('name')});
                    if (days = departCity.get('days')) {
                        departDate.set(days);
                        this._set('number', departDate.get('number'));
                    }
                }, this));
            }, buildView: function () {
                return $('<div class="J_SearchDestRow search_pkg_dest"></div>');
            }, buildDateRange: function () {
                return $('<div class="search_pkg_dest_date"></div>');
            }, buildDelete: function () {
                return $('<div class="search_dest_delete search_row_delete"><i class="search_icon icon_search_delete"></i></div>')
            }, disableRemove: function () {
                this.removeable = false;
                this.updateRemoveStatus();
            }, enableRemove: function () {
                this.removeable = true;
                this.updateRemoveStatus();
            }, updateRemoveStatus: function () {
                if (this.removeable) {
                    this.element.addClass('search_pkg_dest_removable');
                } else {
                    this.element.removeClass('search_pkg_dest_removable');
                }
            }, setDateRange: function (start, end) {
                this.$('.search_pkg_dest_date').html(getMDStr(start) + '<span>至</span>' + getMDStr(end))
            }, destroy: function () {
                this.element.remove();
                this.trigger('destroy', this);
                this.stopListening();
            }
        });
    }
});
;define('component/city-number-group', ['underscore', 'backbone', 'jquery', 'unit/tool', 'component/component', 'component/city-number'], function (_, Backbone, $, Tool, ComponentFactory, CityNumberFactory) {
    var DefaultConfig = {
        departDate: Tool.getDeltaDateStr(new Date, 3),
        max: 20,
        cityNumber: {city: {}, number: {}},
        defaults: []
    };
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var selectedData, rowNumber, rowElements;
                this.element = element;
                this.rowList = [];
                config = this.config = $.extend(true, {}, DefaultConfig, config);
                selectedData = config.defaults;
                rowElements = this.$('.J_SearchDestRow');
                rowNumber = Math.max(1, selectedData.length, rowElements.length);
                _.times(rowNumber, _.bind(function (index) {
                    var element = rowElements.get(index) ? $(rowElements.get(index)) : null,
                        rowData = selectedData[index] || {};
                    this.add(element, rowData);
                }, this));
            }, changeDepartDate: function (date) {
                this.config.departDate = date;
                this.updateDateRange();
            }, add: function (element, defaultData) {
                var row;
                if (this.rowList.length >= this.config.max) {
                    return;
                }
                row = CityNumberFactory(element, $.extend({}, this.config.cityNumber, {defaults: defaultData}, {autoCompleteKey: config.autoCompleteKey}));
                row.on('destroy', _.bind(function (row) {
                    this.remove(row);
                }, this));
                row.on('changed', _.bind(function (changedData) {
                    if ('number' in changedData) {
                        this.updateDateRange();
                    }
                }, this));
                this.element.append(row.getDOM());
                this.rowList.push(row);
                this.updateDateRange();
                this.updateRemoveStatus();
                if (this.rowList.length >= this.config.max) {
                    this.trigger('filled');
                }
            }, remove: function (row) {
                var index = _.indexOf(this.rowList, row);
                if (~index) {
                    this.rowList.splice(index, 1);
                    this.updateDateRange();
                    this.updateRemoveStatus();
                    if (this.rowList.length < this.config.max) {
                        this.trigger('unfilled');
                    }
                }
            }, updateRemoveStatus: function () {
                var removable = this.rowList.length > 1;
                _.each(this.rowList, function (row) {
                    if (removable) {
                        row.enableRemove();
                    } else {
                        row.disableRemove();
                    }
                });
            }, updateDateRange: function () {
                var departDate = this.config.departDate, prevDate = departDate;
                _.each(this.rowList, function (row) {
                    var number = row.get('number'), start = prevDate, end = Tool.getDeltaDateStr(start, number - 1);
                    row.setDateRange(start, end);
                    prevDate = Tool.getDeltaDateStr(end, 1);
                });
            }, getData: function () {
                var error = false, data = _.map(this.rowList, function (row) {
                    var rowData = row.getData();
                    if (!rowData) {
                        error = true;
                    }
                    return rowData;
                });
                return error ? false : data;
            }
        });
    }
});
;
;(function (factory) {
    if (window.define && window.define.amd) {
        define('component/component', ['underscore', 'jquery'], function (_, $) {
            return factory(_, $);
        });
    } else {
        window.createComponent = factory(window._, window.jQuery);
    }
})(function (_, $) {
    return function (prototype) {
        var arr = [], slice = arr.slice;
        var Events = {
            on: function (name, callback, context) {
                if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
                this._events || (this._events = {});
                var events = this._events[name] || (this._events[name] = []);
                events.push({callback: callback, context: context, ctx: context || this});
                return this;
            }, once: function (name, callback, context) {
                if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
                var self = this;
                var once = _.once(function () {
                    self.off(name, once);
                    callback.apply(this, arguments);
                });
                once._callback = callback;
                return this.on(name, once, context);
            }, off: function (name, callback, context) {
                var retain, ev, events, names, i, l, j, k;
                if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
                if (!name && !callback && !context) {
                    this._events = void 0;
                    return this;
                }
                names = name ? [name] : _.keys(this._events);
                for (i = 0, l = names.length; i < l; i++) {
                    name = names[i];
                    if (events = this._events[name]) {
                        this._events[name] = retain = [];
                        if (callback || context) {
                            for (j = 0, k = events.length; j < k; j++) {
                                ev = events[j];
                                if ((callback && callback !== ev.callback && callback !== ev.callback._callback) || (context && context !== ev.context)) {
                                    retain.push(ev);
                                }
                            }
                        }
                        if (!retain.length) delete this._events[name];
                    }
                }
                return this;
            }, trigger: function (name) {
                if (!this._events) return this;
                var args = slice.call(arguments, 1);
                if (!eventsApi(this, 'trigger', name, args)) return this;
                var events = this._events[name];
                var allEvents = this._events.all;
                if (events) triggerEvents(events, args);
                if (allEvents) triggerEvents(allEvents, arguments);
                return this;
            }, stopListening: function (obj, name, callback) {
                var listeningTo = this._listeningTo;
                if (!listeningTo) return this;
                var remove = !name && !callback;
                if (!callback && typeof name === 'object') callback = this;
                if (obj) (listeningTo = {})[obj._listenId] = obj;
                for (var id in listeningTo) {
                    obj = listeningTo[id];
                    obj.off(name, callback, this);
                    if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
                }
                return this;
            }
        };
        var eventSplitter = /\s+/;
        var eventsApi = function (obj, action, name, rest) {
            if (!name) return true;
            if (typeof name === 'object') {
                for (var key in name) {
                    obj[action].apply(obj, [key, name[key]].concat(rest));
                }
                return false;
            }
            if (eventSplitter.test(name)) {
                var names = name.split(eventSplitter);
                for (var i = 0, l = names.length; i < l; i++) {
                    obj[action].apply(obj, [names[i]].concat(rest));
                }
                return false;
            }
            return true;
        };
        var triggerEvents = function (events, args) {
            var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
            switch (args.length) {
                case 0:
                    while (++i < l) (ev = events[i]).callback.call(ev.ctx);
                    return;
                case 1:
                    while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1);
                    return;
                case 2:
                    while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2);
                    return;
                case 3:
                    while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
                    return;
                default:
                    while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
                    return;
            }
        };
        var listenMethods = {listenTo: 'on', listenToOnce: 'once'};
        _.each(listenMethods, function (implementation, method) {
            Events[method] = function (obj, name, callback) {
                var listeningTo = this._listeningTo || (this._listeningTo = {});
                var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
                listeningTo[id] = obj;
                if (!callback && typeof name === 'object') callback = this;
                obj[implementation](name, callback, this);
                return this;
            };
        });
        Events.bind = Events.on;
        Events.unbind = Events.off;

        function Super() {
        };_.extend(Super.prototype, Events, {
            defaults: function () {
                return {}
            }, init: function () {
            }, $: function (selector) {
                return this.element.find(selector);
            }, buildView: function () {
                return $('<div />');
            }, getDOM: function () {
                return this.element;
            }, get: function (properties) {
                var originData = this.data, resData = {};
                if (!properties) {
                    return _.clone(originData);
                } else if (typeof properties == 'string') {
                    return originData[properties];
                } else if (_.isArray(properties)) {
                    _.each(properties, function (property) {
                        resData[property] = originData[property];
                    });
                    return resData;
                }
                return null;
            }, set: function (property, value) {
                this._set(property, value, true);
            }, _set: function (property, value, silent) {
                var properties, changed = false, changedData = {}, originData = this.data;
                if (typeof property == 'string') {
                    properties = {};
                    properties[property] = value;
                } else if (_.isObject(property)) {
                    properties = property;
                    silent = value;
                }
                if (properties) {
                    _.each(properties, function (value, property) {
                        if (originData[property] !== value) {
                            changed = true;
                            changedData[property] = originData[property];
                            originData[property] = value;
                        }
                    });
                    if (changed && !silent) {
                        this.trigger('changed', changedData);
                    }
                }
                if (this.error) {
                    this.hideError();
                }
            }, show: function () {
                this.element.show();
            }, hide: function () {
                this.element.hide();
            }, showError: function () {
                if (!this.error) {
                    this.error = true;
                    this.element.addClass('search_ctrl_error');
                }
            }, hideError: function () {
                if (this.error) {
                    this.error = false;
                    this.element.removeClass('search_ctrl_error');
                }
            }, check: function () {
                var error, config = this.config, propertyConfig = config.propertyConfig || {}, data = this.get(),
                    count = 0;
                error = _.every(data, function (value, property) {
                    count++;
                    if (propertyConfig[property] && propertyConfig[property]['optional']) {
                        return true;
                    } else {
                        return !!value;
                    }
                });
                return count ? error : false;
            }, getData: function (silent) {
                var data = this.get(), error = !this.check();
                if (!silent && error) {
                    this.showError();
                }
                return error ? false : data;
            }
        });

        function Component() {
            this.data = this.defaults();
            this.config = {};
            this.init();
        }

        Component.prototype = new Super;
        _.extend(Component.prototype, {__super: Super.prototype}, prototype);
        return new Component;
    }
});
;define('component/cruise', ['indexCatalogData', 'underscore', 'backbone', 'jquery', 'config/Base', 'unit/tool', 'component/component', 'component/city', 'component/brand-type', 'component/switch', 'component/submit'], function (indexCatalogData, _, Backbone, $, BaseConfig, Tool, ComponentFactory, CityFactory, BrandFactory, SwitchFactory, SubmitFactory) {
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var cruiseSubmit, visaSubmit, switchBtn, cruiseEle, visaEle, self = this;
                this.element = element;
                cruiseEle = element.find('.J_Cruise');
                visaEle = element.find('.J_Visa');
                this.cruiseEle = cruiseEle;
                this.visaEle = visaEle;
                this.tabType = 1;
                switchBtn = SwitchFactory(this.$('.J_SearchSwitch'));
                this.initForm();
                switchBtn.on('changed', _.bind(this.changeTab, this));
                cruiseSubmit = this.cruiseSubmit = SubmitFactory(this.cruiseEle.find('.J_SearchSubmit'));
                visaSubmit = this.visaSubmit = SubmitFactory(this.visaEle.find('.J_SearchSubmit'));
                cruiseSubmit.on('submit', function () {
                    var departData = self.cruiseCity.getData('true'), routeData = self.cruiseRoute.getData('true'),
                        brandData = self.cruiseBrand.getData('true'), query;
                    if (departData && routeData && brandData) {
                        self.searchResource(query = self.transfer(departData, routeData, brandData), self.cruiseSubmit)
                        self.trigger('submit', query)
                    }
                });
                visaSubmit.on('submit', function () {
                    var departData = self.visaDest.getData(), query;
                    if (departData) {
                        self.searchResource(query = self.transferVisa(departData), self.visaSubmit)
                        self.trigger('submit', query)
                    }
                });
            }, initForm: function () {
                if (this.tabType == 1) {
                    this.showForm('cruise');
                } else {
                    this.showForm('visa');
                }
            }, changeTab: function (tabType) {
                if (tabType == 'cruise') {
                    this.tabType = 1;
                    this.showForm('cruise');
                } else if (tabType == 'visa') {
                    this.tabType = 2;
                    this.showForm('visa');
                }
            }, showForm: function (type) {
                if (type == 'cruise') {
                    this.cruiseEle.show();
                    this.visaEle.hide();
                    if (!this.cruiseCity) {
                        this.cruiseCity = BrandFactory(this.cruiseEle.find('.J_SearchCitiesRow'), {
                            defaultType: indexCatalogData.cruise.depart.defaultType,
                            selector: '.J_SearchType',
                            options: indexCatalogData.cruise.depart.options || []
                        });
                    }
                    if (!this.cruiseRoute) {
                        this.cruiseRoute = BrandFactory(this.cruiseEle.find('.J_SearchCitiesRow'), {
                            defaultType: indexCatalogData.cruise.path.defaultType,
                            selector: '.J_SearchRoute',
                            options: indexCatalogData.cruise.path.options || []
                        });
                    }
                    if (!this.cruiseBrand) {
                        this.cruiseBrand = BrandFactory(this.cruiseEle.find('.J_SearchCruiseRow'), {
                            defaultType: indexCatalogData.cruise.brand.defaultType,
                            selector: '.J_SearchBrand',
                            options: indexCatalogData.cruise.brand.options || []
                        });
                    }
                } else if (type == 'visa') {
                    this.cruiseEle.hide();
                    this.visaEle.show();
                    if (!this.visaDest) {
                        this.visaDest = CityFactory(this.visaEle.find('.J_SearchDepart'), {
                            dropUrl: BaseConfig.CityUrl.visa.visaCountry,
                            autoCompleteUrl: BaseConfig.CityUrl.visa.visaCountryFuzzy,
                            defaults: {code: '', name: ''}
                        });
                    }
                }
            }, transfer: function (departData, routeData, brandData) {
                var query = {};
                query.departCity = departData.type;
                query.routeType = routeData.type;
                query.brandType = brandData.type;
                query.tabType = 'cruise';
                return query;
            }, transferVisa: function (destData) {
                var query = {};
                query.destCountry = destData.code;
                query.departCity = indexCatalogData.defaultCity.cityCode;
                query.tabType = 'visa';
                return query;
            }, searchResource: function (query, submitBtn) {
                submitBtn.changeLink(this.buildSearchPageUrl(query), true);
                setTimeout(_.bind(function () {
                    submitBtn.restoreLink();
                }, this), 0);
            }, buildSearchPageUrl: function (query) {
                var url;
                if (this.tabType == 1) {
                    url = BaseConfig.page.cruise + query.routeType + '-' + query.brandType + '-' + query.departCity;
                } else if (this.tabType == 2) {
                    url = BaseConfig.page.visa + 'country_' + query.departCity + '_' + query.destCountry;
                }
                return url;
            }
        });
    }
});
;define('component/date', ['underscore', 'backbone', 'jquery', 'component/component', 'unit/tool', 'unit/date-picker', 'unit/placeholder'], function (_, Backbone, $, ComponentFactory, Tool) {
    var Today = Tool.date2Str(new Date), DefaultCurrent = Tool.getDeltaDateStr(Today, 1), DefaultConfig = {
            max: Tool.getDeltaDateStr(Today, 365),
            min: Today,
            type: 2,
            placeholder: false,
            defaults: {date: Tool.getDeltaDateStr(Today, 3)}
        },
        ViewHTML = '<div class="search_ctrl search_ctrl_inp search_ctrl_city search_flight_single_start">' + '<div class="search_ctrl_inp_label">出发时间:</div>' + '<div class="search_ctrl_inp_placeholder"></div>' + '<input class="search_ctrl_inp_input" name="" type="text" value="" />' + '</div>';
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var self = this;
                config = this.config = $.extend(true, {}, DefaultConfig, config);
                this.data.date = config.current || config.defaults.date || DefaultCurrent || Today;
                if (element && element.length) {
                    this.element = element;
                } else {
                    element = this.element = this.buildView();
                }
                this.$('.search_ctrl_inp_input').datePicker({
                    type: config.type,
                    current: this.data.date,
                    max: config.max,
                    min: config.min,
                    dateList: config.dateList,
                    onChange: function (date) {
                        self._set('date', date);
                        self.changeWeek();
                    },
                    onClose: config.onClose
                }).val(this.data.date);
                this.changeWeek(this.data.date);
                if (config.placeholder) {
                    this.element.placeholder({placeholderSelector: '.search_ctrl_inp_placeholder', hideOnFocus: true});
                }
            }, buildView: function () {
                return $(ViewHTML);
            }, changeWeek: function (date) {
                date = date || this.get('date');
                this.$('.search_ctrl_inp_placeholder').text(Tool.getWeekDay(date))
            }, changeMax: function (max) {
                this.$('.search_ctrl_inp_input').datePicker('set', 'max', max);
            }, changeMin: function (min) {
                this.$('.search_ctrl_inp_input').datePicker('set', 'min', min);
                if (this.get('date') < min) {
                    this._set('date', min);
                    this.$('.search_ctrl_inp_input').val(this.get('date'))
                }
            }, set: function (date) {
                this.__super.set.call(this, 'date', date);
                this.$('.search_ctrl_inp_input').val(date);
                this.changeWeek();
            }, show: function () {
                this.$('.search_ctrl_inp_input').datePicker('focus');
            }
        });
    }
});
;define('component/date-date', ['underscore', 'backbone', 'jquery', 'unit/tool', 'component/component', 'component/date'], function (_, Backbone, $, Tool, ComponentFactory, DateFactory) {
    var DefaultConfig = {delta: 3, start: {}, max: 365, maxEnd: '', end: {}, defaults: {}};
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var startDate, endDate, startDateStr, endDateStr, maxDateStr, maxEndDateStr, minEndDateStr,
                    maxDateStrFlow, minEndDate, self = this;
                config = this.config = _.extend({}, DefaultConfig, config);
                this.element = element;
                maxDateStr = Tool.getDeltaDateStr(new Date, config.max);
                if (config.maxEnd) {
                    maxDateStrFlow = Tool.getDeltaDateStr(new Date, config.max - 1);
                } else {
                    maxDateStrFlow = maxDateStr;
                }
                startDate = this.startDate = DateFactory(this.$('.J_SearchStart'), $.extend({}, config.start, {
                    defaults: {date: config.defaults.start},
                    max: maxDateStrFlow,
                    onClose: function () {
                        endDate.show();
                    }
                }));
                startDateStr = startDate.get('date');
                endDateStr = Tool.getDeltaDateStr(startDateStr, config.delta);
                maxEndDateStr = Tool.getDeltaDateStr(endDateStr, config.max + config.delta) || Tool.getDeltaDateStr(new Date, 365);
                endDateStr = config.defaults.end || endDateStr;
                minEndDate = Tool.getDeltaDateStr(startDateStr, 1);
                if (config.maxEnd) {
                    maxEndDateStr = Tool.getDeltaDateStr(startDateStr, config.maxEnd);
                } else {
                    maxEndDateStr = maxDateStr;
                }
                endDate = this.endDate = DateFactory(this.$('.J_SearchEnd'), $.extend({}, config.end, {
                    current: endDateStr,
                    defaults: {date: endDateStr},
                    max: maxEndDateStr,
                    min: endDateStr
                }));
                endDate.changeMin(minEndDate);
                this.data.start = startDate.get('date');
                this.data.end = endDate.get('date');
                startDate.on('changed', _.bind(function () {
                    var start;
                    this._set({start: startDate.get('date')});
                    start = Tool.getDeltaDateStr(this.get('start'), config.delta);
                    if ((new Date(startDate.get('date')) < new Date(self.endDate.get('date'))) && config.maxEnd) {
                        endDateStr = self.endDate.get('date') || endDate.get('date');
                        maxEndDateStr = Tool.getDeltaDateStr(startDate.get('date'), config.maxEnd);
                        if ((new Date(self.endDate.get('date'))).getTime() - (new Date(startDate.get('date'))).getTime() >= (config.maxEnd * 24 * 3600000)) {
                            endDateStr = maxEndDateStr
                        }
                        self.endDate = DateFactory(self.$('.J_SearchEnd'), $.extend({}, config.end, {
                            current: endDateStr,
                            defaults: {date: endDateStr},
                            max: maxEndDateStr,
                            min: Tool.getDeltaDateStr(startDate.get('date'), 1)
                        }));
                        return;
                    }
                    if (this.get('end') < start) {
                        this._set('end', start);
                        endDate.set(start);
                    }
                    if (config.maxEnd) {
                        maxEndDateStr = new Date(Tool.getDeltaDateStr(start, (config.maxEnd - 1))) - new Date(maxDateStr) >= 0 ? maxDateStr : Tool.getDeltaDateStr(start, (config.maxEnd - 1));
                        minEndDateStr = Tool.getDeltaDateStr(start, 0);
                        self.endDate = DateFactory(self.$('.J_SearchEnd'), $.extend({}, config.end, {
                            current: start,
                            defaults: {date: start},
                            max: maxEndDateStr,
                            min: minEndDateStr
                        }));
                    }
                    minEndDate = Tool.getDeltaDateStr(this.get('start'), 1);
                    endDate.changeMin(minEndDate);
                }, this));
                endDate.on('changed', _.bind(function () {
                    this._set({end: endDate.get('date')})
                }, this));
            }, getData: function () {
                var start = this.startDate.getData(), end = this.endDate.getData();
                if (start && end) {
                    return {start: start.date, end: end.date}
                }
                return false;
            }
        });
    }
});
;define('component/flight', ['underscore', 'backbone', 'jquery', 'config/Base', 'unit/tool', 'unit/cookie', 'component/component', 'component/switch', 'component/switch-radio', 'component/city-city', 'component/date-date', 'component/city-city-date-group', 'component/button', 'component/adult-child', 'component/submit'], function (_, Backbone, $, BaseConfig, Tool, Cookie, ComponentFactory, SwitchFactory, SwitchRadioFactory, CityCityFactory, DateDateFactory, RowListFactory, ButtonFactory, AdultChildFactory, SubmitFactory) {
    var DEFAULT_DATE = Tool.getDeltaDateStr(new Date, 1);
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var switchDomestic, switchForeign, switchButton, stuffDomestic, stuffForeign, submitDomestic,
                    submitForeign, domesticEle, foreignEle, self = this;
                this.element = element;
                this.countryType = 1;
                this.journeyType = 1;
                this.foreignType = 1;
                domesticEle = element.find('.J_InternalFlight');
                foreignEle = element.find('.J_InternationalFlight');
                this.domesticEle = domesticEle;
                this.foreignEle = foreignEle;
                switchButton = SwitchFactory(this.$('.J_SearchSwitch'));
                switchDomestic = SwitchRadioFactory(domesticEle.find('.J_SearchSwitchRadio'));
                switchForeign = SwitchRadioFactory(foreignEle.find('.J_SearchSwitchRadio'));
                stuffDomestic = AdultChildFactory(domesticEle.find('.J_SearchStuffRow'));
                stuffForeign = AdultChildFactory(foreignEle.find('.J_SearchStuffRow'));
                submitDomestic = this.submitDomestic = SubmitFactory(domesticEle.find('.J_SearchSubmit'));
                submitForeign = this.submitForeign = SubmitFactory(foreignEle.find('.J_SearchSubmit'));
                this.initForm();
                switchButton.on('changed', _.bind(this.changeCountry, this));
                switchDomestic.on('changed', _.bind(this.changeForm, this));
                switchForeign.on('changed', _.bind(this.changeForeignForm, this));
                submitDomestic.on('submit', function () {
                    var journeyType = self.journeyType, stuffData = stuffDomestic.getData(), roundCityData,
                        roundDateData, destListData, query;
                    if (journeyType === 2) {
                        roundCityData = self.roundCities.getData();
                        roundDateData = self.roundDate.getData();
                        if (stuffData && roundCityData && roundDateData) {
                            self.searchResource(query = self.transferRound(roundCityData, roundDateData, stuffData));
                            self.trigger('submit', query);
                        }
                    } else if (journeyType == 1) {
                        destListData = self.journeyList.getData();
                        if (stuffData && destListData) {
                            self.searchResource(query = self.transferSingle(destListData, stuffData));
                            self.trigger('submit', query);
                        }
                    }
                });
                submitForeign.on('submit', function () {
                    var foreignType = self.foreignType, stuffData = stuffForeign.getData(), roundCityData,
                        roundDateData, destListData, query;
                    if (foreignType === 2) {
                        roundCityData = self.roundForeignCities.getData();
                        roundDateData = self.roundForeignDate.getData();
                        if (stuffData && roundCityData && roundDateData) {
                            self.searchResource(query = self.transferRound(roundCityData, roundDateData, stuffData));
                            self.trigger('submit', query);
                        }
                    } else if (foreignType == 1) {
                        destListData = self.foreignList.getData();
                        if (stuffData && destListData) {
                            self.searchResource(query = self.transferSingle(destListData, stuffData));
                            self.trigger('submit', query);
                        }
                    }
                });
            }, transferRound: function (roundCityData, roundDateData, stuffData) {
                var query = {}, cityUrl, cityDepart, cityDest;
                if (this.countryType == 1) {
                    query.start = roundDateData.start;
                    query.back = roundDateData.end;
                    query.adult = stuffData.adult;
                    query.child = stuffData.child;
                    query.type = this.journeyType;
                    cityDepart = roundCityData.departCode;
                    cityDest = roundCityData.destCode;
                    query.countryType = this.countryType;
                    query.flag = '1';
                    cityUrl = 'city_' + cityDepart + '_' + cityDest;
                    query.cityUrl = cityUrl;
                } else if (this.countryType == 2) {
                    query.departDate = roundDateData.start;
                    query.destDate = roundDateData.end;
                    query.adult = stuffData.adult;
                    query.child = stuffData.child;
                    query.typeSelect = this.foreignType;
                    query.departCityCode = roundCityData.departCode;
                    query.departName = roundCityData.departName;
                    query.destCityCode = roundCityData.destCode;
                    query.destName = roundCityData.destName;
                    query.countryType = this.countryType;
                    cityUrl = 'international_' + query.departCityCode + '_' + query.destCityCode;
                    query.cityUrl = cityUrl;
                }
                return query;
            }, transferSingle: function (destListData, stuffData) {
                var query = {}, firstDest = _.first(destListData), cityUrl, cityDepart, cityDest;
                if (this.countryType == 1) {
                    query.start = firstDest.date;
                    query.adult = stuffData.adult;
                    query.child = stuffData.child;
                    query.type = this.journeyType;
                    cityDepart = firstDest.departCode;
                    cityDest = firstDest.destCode;
                    query.countryType = this.countryType;
                    cityUrl = 'city_' + cityDepart + '_' + cityDest;
                    query.cityUrl = cityUrl;
                } else if (this.countryType == 2) {
                    query.departDate = firstDest.date;
                    query.destDate = firstDest.end;
                    query.adult = stuffData.adult;
                    query.child = stuffData.child;
                    query.typeSelect = this.foreignType;
                    query.departCityCode = firstDest.departCode;
                    query.departName = firstDest.departName;
                    query.destCityCode = firstDest.destCode;
                    query.destName = firstDest.destName;
                    query.countryType = this.countryType;
                    cityUrl = 'international_' + query.departCityCode + '_' + query.destCityCode;
                    query.cityUrl = cityUrl;
                }
                return query;
            }, searchResource: function (query) {
                var form = $('<form />'), formData = [], self = this;
                if (this.countryType == 1) {
                    formData.type = query.type;
                    formData.start = query.start;
                    formData.child = query.child;
                    formData.adult = query.adult;
                    if (this.journeyType == 2) {
                        formData.back = query.back;
                    }
                    for (var key in formData) {
                        form.append(this.buildHiddenInput(key, formData[key]));
                    }
                } else if (this.countryType == 2) {
                    Cookie.set('itnal_adult', query.adult, {expires: 7, domain: '.tuniu.com'});
                    Cookie.set('itnal_child', query.child, {expires: 7, domain: '.tuniu.com'});
                    Cookie.set('itnal_departCode', query.departCityCode, {expires: 7, domain: '.tuniu.com'});
                    Cookie.set('itnal_departName', query.departName, {expires: 7, domain: '.tuniu.com'});
                    Cookie.set('itnal_departDate', query.departDate, {expires: 7, domain: '.tuniu.com'});
                    Cookie.set('itnal_destCode', query.destCityCode, {expires: 7, domain: '.tuniu.com'});
                    Cookie.set('itnal_destName', query.destName, {expires: 7, domain: '.tuniu.com'});
                    if (this.foreignType == 2) {
                        Cookie.set('itnal_destDate', query.destDate, {expires: 7, domain: '.tuniu.com'});
                    } else if (this.foreignType == 1) {
                        Cookie.set('itnal_destDate', '', {expires: 7, domain: '.tuniu.com'});
                    }
                    Cookie.set('itnal_type', query.typeSelect, {expires: 7, domain: '.tuniu.com'});
                }
                form.attr({method: 'POST', action: this.buildSearchPageUrl(query), target: '_blank'});
                form.appendTo('body').submit();
                setTimeout(function () {
                    form.remove();
                }, 0)
            }, buildHiddenInput: function (property, value) {
                return $('<input />').attr({name: property, value: value, type: 'hidden'});
            }, buildSearchPageUrl: function (query) {
                var queryParam;
                if (this.countryType == 1) {
                    queryParam = BaseConfig.page.flight + query.cityUrl + (this.journeyType == 1 ? '/single' : '');
                } else if (this.countryType == 2) {
                    queryParam = BaseConfig.page.flightForeign + query.cityUrl;
                }
                return queryParam;
            }, initForm: function () {
                if (this.countryType == 1) {
                    this.showInternalForm();
                } else {
                    this.showInternationalForm();
                }
            }, changeCountry: function (countryType) {
                if (countryType == 'internal') {
                    this.countryType = 1;
                    this.showInternalForm();
                } else if (countryType == 'international') {
                    this.countryType = 2;
                    this.showInternationalForm();
                }
            }, changeForm: function (journeyType) {
                if (journeyType == 'single') {
                    this.journeyType = 1;
                    this.showSingleForm('domestic');
                } else if (journeyType == 'round') {
                    this.journeyType = 2;
                    this.showRoundForm('domestic');
                }
            }, changeForeignForm: function (foreignType) {
                if (foreignType == 'single') {
                    this.foreignType = 1;
                    this.showSingleForm('foreign');
                } else if (foreignType == 'round') {
                    this.foreignType = 2;
                    this.showRoundForm('foreign');
                }
            }, showRoundForm: function (type) {
                var destListData, firstDestData, firstDestCode, firstDestName, journeyList, journeyEle, roundCities,
                    roundDate, flightUrl;
                if (type == 'domestic') {
                    journeyList = this.journeyList;
                    journeyEle = this.domesticEle;
                    roundCities = this.roundCities;
                    roundDate = this.roundDate;
                    flightUrl = BaseConfig.CityUrl.flight
                } else if (type == 'foreign') {
                    journeyList = this.foreignList;
                    journeyEle = this.foreignEle;
                    roundCities = this.roundForeignCities;
                    roundDate = this.roundForeignDate;
                    flightUrl = BaseConfig.CityUrl.flightForeign;
                }
                if (journeyList) {
                    destListData = journeyList.getData();
                    firstDestData = _.first(destListData);
                    if (firstDestData) {
                        firstDestCode = firstDestData.destCode;
                        firstDestName = firstDestData.destName;
                    }
                }
                journeyEle.show();
                journeyEle.find('.J_SearchCitiesRow, .J_SearchDateRow').show();
                journeyEle.find('.J_SearchSingle, .J_SearchAddRow').hide();
                if (!roundCities) {
                    roundCities = CityCityFactory(journeyEle.find('.J_SearchCitiesRow'), {
                        depart: {
                            dropUrl: flightUrl.departHot,
                            autoCompleteUrl: flightUrl.departFuzzy,
                            defaults: {code: config.cityCode, name: config.cityName}
                        },
                        dest: {
                            dropUrl: flightUrl.destHot,
                            autoCompleteUrl: flightUrl.destFuzzy,
                            defaults: {code: firstDestCode, name: firstDestName}
                        }
                    });
                    roundDate = DateDateFactory(journeyEle.find('.J_SearchDateRow'), {
                        delta: 2,
                        current: DEFAULT_DATE,
                        defaults: {start: DEFAULT_DATE}
                    });
                } else {
                    roundCities.set({destCode: firstDestCode, destName: firstDestName});
                }
                if (type == 'domestic') {
                    this.journeyList = journeyList;
                    this.roundCities = roundCities;
                    this.roundDate = roundDate;
                } else if (type == 'foreign') {
                    this.foreignList = journeyList;
                    this.roundForeignCities = roundCities;
                    this.roundForeignDate = roundDate;
                }
            }, showSingleForm: function (type) {
                var firstDestCode, firstDestName, journeyList, journeyEle, roundCities, flightUrl;
                if (type == 'domestic') {
                    journeyList = this.journeyList;
                    journeyEle = this.domesticEle;
                    roundCities = this.roundCities;
                    flightUrl = BaseConfig.CityUrl.flight;
                } else if (type == 'foreign') {
                    journeyList = this.foreignList;
                    journeyEle = this.foreignEle;
                    roundCities = this.roundForeignCities;
                    flightUrl = BaseConfig.CityUrl.flightForeign;
                }
                if (roundCities) {
                    roundCitiesData = roundCities.getData();
                    if (roundCitiesData) {
                        firstDestCode = roundCitiesData.destCode;
                        firstDestName = roundCitiesData.destName;
                    }
                }
                journeyEle.show();
                journeyEle.find('.J_SearchCitiesRow, .J_SearchDateRow').hide();
                journeyEle.find('.J_SearchSingle, .J_SearchAddRow').show();
                if (!journeyList) {
                    journeyList = RowListFactory(journeyEle.find('.J_SearchSingle'), {
                        cityDate: {
                            cityGroup: {
                                depart: {
                                    dropUrl: flightUrl.departHot,
                                    autoCompleteUrl: flightUrl.departFuzzy,
                                    defaults: {code: config.cityCode, name: config.cityName}
                                },
                                dest: {
                                    dropUrl: flightUrl.destHot,
                                    autoCompleteUrl: flightUrl.destFuzzy,
                                    defaults: {code: firstDestCode, name: firstDestName}
                                }
                            }, date: {}
                        }, defaults: [{departCode: config.cityCode, departName: config.cityName, date: DEFAULT_DATE}]
                    });
                    if (journeyEle.find('.J_SearchAdd').length > 0) {
                        this.addButton = ButtonFactory(journeyEle.find('.J_SearchAdd'));
                        this.addButton.on('click', _.bind(function () {
                            journeyList.add();
                        }, this));
                        journeyList.on('filled', _.bind(function () {
                            this.addButton.hide();
                        }, this));
                        journeyList.on('unfilled', _.bind(function () {
                            this.addButton.show();
                        }, this));
                    }
                } else {
                    journeyList.setFirstDest({destCode: firstDestCode, destName: firstDestName});
                }
                if (type == 'domestic') {
                    this.journeyList = journeyList;
                    this.roundCities = roundCities;
                } else if (type == 'foreign') {
                    this.foreignList = journeyList;
                    this.roundForeignCities = roundCities;
                }
            }, showInternalForm: function () {
                this.domesticEle.show();
                this.foreignEle.hide();
                if (this.journeyType == 1) {
                    this.showSingleForm('domestic');
                } else {
                    this.showRoundForm('domestic');
                }
            }, showInternationalForm: function () {
                this.domesticEle.hide();
                this.foreignEle.show();
                if (this.foreignType == 1) {
                    this.showSingleForm('foreign');
                } else {
                    this.showRoundForm('foreign');
                }
            }
        });
    }
});
;define('component/hotel', ['indexCatalogData', 'underscore', 'backbone', 'jquery', 'config/Base', 'unit/tool', 'component/component', 'component/switch', 'component/city', 'component/date', 'component/keywords', 'component/date-date', 'component/brand-type', 'component/submit', 'component/hotel-city', 'component/hotel-keyword',], function (indexCatalogData, _, Backbone, $, BaseConfig, Tool, ComponentFactory, SwitchFactory, CityFactory, DateFactory, KeywordsFactory, DateDateFactory, BrandFactory, SubmitFactory, HotelCityFactory, HotelKeywordFactory) {
    var DefaultForeign = Tool.getDeltaDateStr(new Date(), 2);
    var DefaultDomestic = Tool.getDeltaDateStr(new Date(), 1);
    var defaultDate = Tool.getDeltaDateStr(new Date, 7);
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var domesticEle, foreignEle, sceneryEle, switchBtn, submitDomestic, submitForeign, submitScenery,
                    self = this;
                this.element = element;
                this.countryType = 1;
                domesticEle = element.find('.J_InternalHotel');
                foreignEle = element.find('.J_InternationalHotel');
                sceneryEle = element.find('.J_sceneryHotel');
                this.domesticEle = domesticEle;
                this.foreignEle = foreignEle;
                this.sceneryEle = sceneryEle;
                switchBtn = SwitchFactory(this.$('.J_SearchSwitch'));
                this.initForm();
                switchBtn.on('changed', _.bind(this.changeCountry, this));
                submitDomestic = this.submitDomestic = SubmitFactory(this.domesticEle.find('.J_SearchSubmit'));
                submitForeign = this.submitForeign = SubmitFactory(this.foreignEle.find('.J_SearchSubmit'));
                submitScenery = this.submitScenery = SubmitFactory(this.sceneryEle.find('.J_SearchSubmit'));
                submitDomestic.on('submit', function () {
                    var departData = self.domesticCity.getData(), dateGroupData = self.domesticDate.getData(),
                        keyData = self.domesticKeyWord.getData(true), query;
                    if (departData && dateGroupData) {
                        self.searchResource(query = self.transfer(departData, dateGroupData, '', keyData), self.submitDomestic);
                        self.trigger('submit', query)
                    }
                });
                submitForeign.on('submit', function () {
                    var departData = self.foreignCity.getData(), dateGroupData = self.foreignDate.getData(),
                        keyData = self.foreignKeyWord.getData(true), query;
                    if (departData && dateGroupData) {
                        self.searchResource(query = self.transfer(departData, dateGroupData, '', keyData), self.submitForeign);
                        self.trigger('submit', query)
                    }
                });
                submitScenery.on('submit', function () {
                    var departData = self.sceneryCity.getData(), dateGroupData = self.departDate.getData(),
                        keyData = window.hotelKeyScenery ? window.hotelKeyScenery : {}, query;
                    if (departData && dateGroupData) {
                        self.searchResource(query = self.transfer(departData, dateGroupData, '', keyData), self.submitScenery);
                        self.trigger('submit', query)
                    }
                });
            }, initForm: function () {
                if (this.countryType == 1) {
                    this.showForm('domestic');
                } else if (this.countryType == 2) {
                    this.showForm('foreign');
                }
                else {
                    this.showForm('hotel-scenery');
                }
            }, changeCountry: function (countryType) {
                if (countryType == 'internal') {
                    this.countryType = 1;
                    this.showForm('domestic');
                } else if (countryType == 'international') {
                    this.countryType = 2;
                    this.showForm('foreign');
                }
                else if (countryType == "hotel-scenery") {
                    this.countryType = 3;
                    this.showForm('scenery');
                }
            }, showForm: function (type) {
                var self = this;
                $('.autocomplete').hide();
                if (type == 'domestic') {
                    this.domesticEle.show();
                    this.foreignEle.hide();
                    this.sceneryEle.hide();
                    if (!this.domesticCity) {
                        this.domesticCity = HotelCityFactory(this.domesticEle.find('.J_SearchDepart'), {
                            dropUrl: BaseConfig.CityUrl.hotel.destHot,
                            autoCompleteUrl: '/tn?r=PoiAjax/GetCityLike&flag=hotelDomestic',
                            defaults: {cityCode: '', cityName: ''},
                            directOpenBaseUrl: location.protocol + '//hotel.tuniu.com/detail/',
                            wrapper: self.domesticEle,
                            onChange: function (data) {
                                if (!data.cityCode) {
                                    if (domesticKeywordEl.__picker && domesticKeywordEl.__picker.keywordAutoObj) {
                                        domesticKeywordEl.length && domesticKeywordEl.val('');
                                        domesticKeywordEl.__picker.keywordAutoObj.clearCache();
                                        domesticKeywordEl.__picker.keywordAutoObj.options.params = {};
                                    }
                                    self.domesticKeyWord.set({'code': "", 'name': "", 'id': ""});
                                }
                            }
                        });
                    }
                    if (!this.domesticDate) {
                        this.domesticDate = DateDateFactory(this.domesticEle.find('.J_SearchDateRow'), {
                            delta: 1,
                            max: 90,
                            maxEnd: 28,
                            current: DefaultDomestic,
                            defaults: {start: DefaultDomestic}
                        });
                    }
                    if (!this.domesticKeyWord) {
                        var departData = self.domesticCity.getData(true);
                        var cityName = departData.departName;
                        this.domesticKeyWord = HotelKeywordFactory(this.domesticEle.find('.J_SearchKeyWord'), {
                            dropUrl: BaseConfig.CityUrl.hotel.keyWords,
                            autoCompleteUrl: '/tn?r=PoiAjax/GetCityLike&flag=hotelKeyLikeDomestic',
                            dropEnabled: true,
                            postData: {cityName: cityName},
                            defaults: {name: '', code: ''},
                            directOpenBaseUrl: location.protocol + '//hotel.tuniu.com/detail/',
                            wrapper: self.domesticEle
                        });
                    }
                    var domesticKeywordEl = $(self.domesticKeyWord.element).find(".search_ctrl_inp_input").get(0);
                    this.domesticCity.on("cityChanged", function (data) {
                        if (data.catalog == 2 && data.name) {
                            self.domesticKeyWord.set({'code': data.code, 'name': data.name, 'id': data.id});
                        } else {
                            self.domesticKeyWord.set({'code': "", 'name': "", 'id': ""});
                        }
                        if (domesticKeywordEl.__picker && domesticKeywordEl.__picker.keywordAutoObj) {
                            domesticKeywordEl.__picker.keywordAutoObj.clearCache();
                            domesticKeywordEl.__picker.keywordAutoObj.options.params = {cityCode: data.cityCode};
                        }
                    });
                    this.domesticKeyWord.on("belongCityChanged", function (data) {
                        self.domesticCity.set({'cityCode': data.cityCode, 'cityName': data.cityName});
                        self.domesticEle.find('.J_SearchDepart input').val(data.cityName).get(0).focus();
                        self.domesticEle.find('.J_SearchDepart input').get(0).blur();
                        self.domesticCity.trigger("cityChanged", data);
                    });
                } else if (type == 'foreign') {
                    this.domesticEle.hide();
                    this.foreignEle.show();
                    this.sceneryEle.hide();
                    if (!this.foreignCity) {
                        this.foreignCity = HotelCityFactory(this.foreignEle.find('.J_SearchDepart'), {
                            dropUrl: BaseConfig.CityUrl.hotel.glabalHotel,
                            autoCompleteUrl: '/tn?r=PoiAjax/GetCityLike&flag=hotelInternational',
                            defaults: {cityCode: '', cityName: '', cityType: ''},
                            directOpenBaseUrl: location.protocol + '//hotel.tuniu.com/detail/',
                            wrapper: self.foreignEle,
                            onChange: function (data) {
                                if (!data.cityCode) {
                                    if (foreignKeywordEl._picker && foreignKeywordEl.__picker.keywordAutoObj) {
                                        foreignKeywordEl.length && foreignKeywordEl.val('');
                                        foreignKeywordEl.__picker.keywordAutoObj.clearCache();
                                        foreignKeywordEl.__picker.keywordAutoObj.options.params = {};
                                    }
                                    self.foreignKeyWord.set({
                                        cityName: "",
                                        code: "",
                                        poiType: "",
                                        name: "",
                                        latitude: "",
                                        longitude: ""
                                    });
                                }
                            }
                        });
                    }
                    if (!this.foreignDate) {
                        this.foreignDate = DateDateFactory(this.foreignEle.find('.J_SearchDateRow'), {
                            delta: 4,
                            max: 300,
                            current: DefaultForeign,
                            defaults: {start: DefaultForeign},
                            maxEnd: 30
                        });
                    }
                    if (!this.foreignKeyWord) {
                        var foreignDepartData = self.foreignCity.getData(true);
                        var foreignCityName = foreignDepartData.cityName;
                        var foreignCityCode = foreignDepartData.cityCode;
                        var foreignCityType = foreignDepartData.cityType;
                        this.foreignKeyWord = HotelKeywordFactory(this.foreignEle.find('.J_SearchKeyWord'), {
                            dropUrl: BaseConfig.CityUrl.hotel.keyWords,
                            autoCompleteUrl: '/tn?r=PoiAjax/GetCityLike&flag=hotelKeyLikeInternational',
                            dropEnabled: false,
                            postData: {cityName: foreignCityName, cityCode: foreignCityCode, cityType: foreignCityType},
                            defaults: {name: '', code: ''},
                            directOpenBaseUrl: location.protocol + '//globalhotel.tuniu.com/gdetail/',
                            wrapper: self.foreignEle
                        });
                    }
                    var foreignKeywordEl = $(self.foreignKeyWord.element).find(".search_ctrl_inp_input").get(0);
                    this.foreignCity.on("cityChanged", function (data) {
                        if (data.poiType > 1 && data.cityName) {
                            self.foreignKeyWord.set({
                                cityName: data.cityName,
                                code: data.code,
                                poiType: data.poiType,
                                name: data.name,
                                latitude: data.latitude,
                                longitude: data.longitude
                            });
                        } else {
                            self.foreignKeyWord.set({
                                cityName: "",
                                code: "",
                                poiType: "",
                                name: "",
                                latitude: "",
                                longitude: ""
                            });
                        }
                        if (foreignKeywordEl.__picker && foreignKeywordEl.__picker.keywordAutoObj) {
                            foreignKeywordEl.__picker.keywordAutoObj.clearCache();
                            foreignKeywordEl.__picker.keywordAutoObj.options.params = {
                                cityCode: data.cityCode,
                                cityType: data.cityType
                            };
                        }
                    });
                    this.foreignKeyWord.on("belongCityChanged", function (data) {
                        self.foreignCity.set({
                            'cityCode': data.cityCode,
                            'cityName': data.cityName,
                            'cityType': data.cityType
                        });
                        self.foreignEle.find('.J_SearchDepart input').val(data.cityName).get(0).focus();
                        self.foreignEle.find('.J_SearchDepart input').get(0).blur();
                        self.foreignCity.trigger("cityChanged", data);
                    });
                }
                else if (type == 'scenery') {
                    this.domesticEle.hide();
                    this.foreignEle.hide();
                    this.sceneryEle.show();
                    if (!this.sceneryCity) {
                        this.sceneryCity = CityFactory(this.sceneryEle.find('.J_SearchDepart'), {
                            dropUrl: BaseConfig.CityUrl.hotelScenery.sceneryHotel,
                            autoCompleteUrl: BaseConfig.CityUrl.hotelScenery.sceneryFuzzy,
                            defaults: {code: '', name: ''}
                        });
                    }
                    if (!this.departDate) {
                        this.departDate = DateFactory(this.sceneryEle.find('.J_DepartDate'), {
                            current: defaultDate,
                            defaults: {date: defaultDate}
                        });
                    }
                    this.sceneryCity.on('sceneryChanged', function (data) {
                        window.hotelKeyScenery = data;
                    })
                }
            }, transfer: function (departData, dateGroupData, stuffData, keyData) {
                var query = {};
                if (departData && departData.pj == 0 && departData.url) {
                    return departData.url;
                }
                if (this.countryType == 1) {
                    query.departName = departData.cityName;
                    query.checkindate = dateGroupData.start;
                    query.checkoutdate = dateGroupData.end;
                    query.poiId = keyData.code;
                    query.suggestId = keyData.id;
                } else if (this.countryType == 2) {
                    var dateStart = [], dateEnd = [];
                    query.cityName = departData.cityName;
                    query.cityCode = departData.cityCode;
                    query.cityType = departData.cityType;
                    query.checkInDate = dateGroupData.start;
                    query.checkOutDate = dateGroupData.end;
                    query.numberOfRooms = 1;
                    query.numberOfAdults = 2;
                    if (keyData.poiType > 1) {
                        query.code = keyData.code;
                        query.poiType = keyData.poiType;
                        query.name = keyData.name;
                        query.latitude = keyData.latitude;
                        query.longitude = keyData.longitude;
                    }
                } else if (this.countryType == 3) {
                    query.departName = departData.name;
                    query.checkdate = dateGroupData.date;
                    query.poi = '';
                }
                return query;
            }, searchResource: function (query, submitBtn) {
                submitBtn.changeLink(typeof query == 'string' ? query : this.buildSearchPageUrl(query), true);
                setTimeout(_.bind(function () {
                    submitBtn.restoreLink();
                }, this), 0)
            }, dateUglify: function (dt) {
                var dt = dt.replace(/-/g, '');
                return dt;
            }, buildSearchPageUrl: function (query) {
                var queryParam;
                var self = this;
                var cityCode = $("#nav_city_letter").val();
                if (this.countryType == 1) {
                    var keywordVal = $(self.domesticKeyWord.element).find(".search_ctrl_inp_input").val();
                    queryParam = BaseConfig.page.hotelDomestic + 'list/' + query.departName + 'p0s0b0/?checkindate=' + query.checkindate + '&checkoutdate=' + query.checkoutdate;
                    if (query.suggestId && query.suggestId !== query.poiId) {
                        queryParam += ('&suggest=' + query.suggestId);
                    } else if (query.poiId) {
                        queryParam += ('&poi=' + query.poiId);
                    } else if (keywordVal) {
                        queryParam += ('&keyword=' + keywordVal);
                    }
                } else if (this.countryType == 2) {
                    var foreignKeywordVal = $(self.foreignKeyWord.element).find(".search_ctrl_inp_input").val();
                    queryParam = BaseConfig.page.globalHotel + 'glist/' + query.cityCode + '_' + (query.cityType || 0) + '/?&checkInDate=' + query.checkInDate + '&checkOutDate=' + query.checkOutDate + '&numberOfRooms=' + query.numberOfRooms + '&numberOfAdults=' + query.numberOfAdults + '&cityNameinSearch=' + query.cityName;
                    if (query.code) {
                        queryParam += ('&code=' + query.code + '&type=' + query.poiType + (query.name ? ('&hSuggestName=' + query.name) : '') + (query.latitude ? ('&lat=' + query.latitude) : '') + (query.longitude ? ('&lng=' + query.longitude) : ''));
                    } else if (foreignKeywordVal) {
                        queryParam += ('&hSuggestKeyword=' + foreignKeywordVal);
                    }
                } else if (this.countryType == 3) {
                    queryParam = BaseConfig.page.local + 'search_complex/drive-' + cityCode + '-0-' + query.departName + '/list-a' + this.dateUglify(query.checkdate) + '_' + this.dateUglify(query.checkdate) + '-m0-j0_0/';
                }
                return queryParam;
            }
        });
    }
});
;define('component/local', ['indexCatalogData', 'underscore', 'backbone', 'jquery', 'config/Base', 'unit/tool', 'component/component', 'component/switch', 'component/switch-radio', 'component/city', 'component/date-date', 'component/brand-type', 'component/submit'], function (indexCatalogData, _, Backbone, $, BaseConfig, Tool, ComponentFactory, SwitchFactory, SwitchRadioFactory, CityFactory, DateDateFactory, BrandFactory, SubmitFactory) {
    DEFAULT_DATE = Tool.getDeltaDateStr(new Date, 1)
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var entranceEle, disportEle, wifiEle, switchBtn, entranceSubmit, switchLocal, switchAround, localSubmit,
                    groupSubmit, wifiSubmit, self = this;
                this.element = element;
                entranceEle = element.find('.J_Entrance');
                disportEle = element.find('.J_Disport');
                wifiEle = element.find('.J_Wifi');
                this.entranceEle = entranceEle;
                this.disportEle = disportEle;
                this.wifiEle = wifiEle;
                this.tabType = 1;
                this.localType = 1;
                this.wifiType = 1;
                switchBtn = SwitchFactory(this.$('.J_SearchSwitch'));
                this.initForm();
                switchBtn.on('changed', _.bind(this.changeTab, this));
                switchLocal = SwitchRadioFactory(disportEle.find('.J_SearchSwitchRadio'));
                switchLocal.on('changed', _.bind(this.changeForm, this));
                switchWifi = SwitchRadioFactory(wifiEle.find('.J_SearchSwitchRadio'));
                switchWifi.on('changed', _.bind(this.changeWifiStyle, this));
                entranceSubmit = this.entranceSubmit = SubmitFactory(this.entranceEle.find('.J_SearchSubmit'));
                localSubmit = this.localSubmit = SubmitFactory(this.disportEle.find('.J_SearchTicketRow .J_SearchSubmit'));
                groupSubmit = this.groupSubmit = SubmitFactory(this.disportEle.find('.J_SearchSingle .J_SearchSubmit'));
                wifiSubmit = this.wifiSubmit = SubmitFactory(this.wifiEle.find('.J_SearchWifiRow .J_SearchSubmit'));
                entranceSubmit.on('submit', function () {
                    var query, departData = {}, cityName = self.entranceEle.find('.J_SearchDepart input').val();
                    if (!cityName) {
                        self.entranceCity.getData();
                        return;
                    }
                    departData.name = cityName;
                    if (departData) {
                        self.searchResource(query = self.transfer(departData), self.entranceSubmit);
                        self.trigger('submit', query);
                    }
                });
                localSubmit.on('submit', function () {
                    var query, departData = {}, cityDom = self.disportEle.find('.J_SearchCitiesRow'),
                        cityName = cityDom.find('input').val();
                    if (!cityName) {
                        self.disportCity.getData();
                        return;
                    }
                    departData.name = cityName;
                    if (departData) {
                        self.searchResource(query = self.transfer(departData), self.localSubmit);
                        self.trigger('submit', query);
                    }
                });
                groupSubmit.on('submit', function () {
                    var query, departData = {}, cityDom = self.disportEle.find('.J_SearchSingle'),
                        cityName = cityDom.find('input').val();
                    if (!cityName) {
                        self.groupCity.getData();
                        return;
                    }
                    departData.name = cityName;
                    if (departData) {
                        self.searchResource(query = self.transfer(departData), self.groupSubmit);
                        self.trigger('submit', query);
                    }
                });
                wifiSubmit.on('submit', function () {
                    var query, departData = {}, accessMethodStyle, proStyleCode,
                        cityDom = self.wifiEle.find('.J_SearchSingle'),
                        cityName = cityDom.find('.J_SearchDepart input').val(),
                        cityCode = cityDom.find('.J_SearchDepart input').attr("data-code"),
                        accessMethod = self.wifiEle.find(".J_SearchSwitchRadio .tn_label"),
                        proStyle = self.wifiEle.find('.J_SearchRoute input').val();
                    if (!cityName) {
                        self.wifiCity.getData();
                        return;
                    }
                    if (proStyle == '不限') {
                        proStyleCode = 0;
                    }
                    else if (proStyle == 'WiFi') {
                        proStyleCode = 63;
                    }
                    else if (proStyle == '上网卡') {
                        proStyleCode = 64;
                    }
                    $(accessMethod).each(function (i, n) {
                        if ($(accessMethod).eq(0).find('label').hasClass('tn_switch')) {
                            accessMethodStyle = 0;
                        }
                        else {
                            accessMethodStyle = 1;
                        }
                    })
                    departData.name = cityName;
                    departData.code = cityCode;
                    departData.proCode = proStyleCode;
                    departData.style = accessMethodStyle;
                    if (departData) {
                        self.searchResource(query = self.transferWifi(departData), self.wifiSubmit);
                        self.trigger('submit', query);
                    }
                });
            }, initForm: function () {
                if (this.tabType == 1) {
                    this.showForm('entrance');
                } else if (this.tabType == 2) {
                    this.showForm('disport');
                }
            }, changeTab: function (tabType) {
                var _this = this;
                if (tabType == 'entrance') {
                    this.tabType = 1;
                    this.showForm('entrance');
                } else if (tabType == 'disport') {
                    this.tabType = 2;
                    if (this.localType == 1) {
                        this.disportEle.find('.J_SearchCitiesRow,.J_SearchTicketRow').show();
                        this.disportEle.find('.J_SearchSingle').hide();
                        this.showForm('disport');
                    } else if (this.localType == 2) {
                        this.disportEle.find('.J_SearchCitiesRow,.J_SearchTicketRow').hide();
                        this.disportEle.find('.J_SearchSingle').show();
                        this.showForm('disport');
                    }
                } else if (tabType == 'wifi') {
                    _this.tabType = 3;
                    _this.showForm('wifi');
                }
            }, showForm: function (type) {
                var self = this;
                if (type == 'entrance') {
                    self.entranceEle.show();
                    self.disportEle.hide();
                    self.wifiEle.hide();
                    self.disportEle.find('.J_SearchSwitchRadio').hide();
                    if (!self.entranceCity) {
                        self.entranceCity = CityFactory(self.entranceEle.find('.J_SearchDepart'), {
                            dropUrl: BaseConfig.CityUrl.ticket.destHot,
                            acEnabled: false,
                            acError: true,
                            autoCompleteUrl: '',
                            defaults: {code: config.cityCode, name: config.cityName}
                        });
                    }
                }
                else if (type == 'disport') {
                    self.entranceEle.hide();
                    self.disportEle.show();
                    self.wifiEle.hide();
                    self.disportEle.find('.J_SearchSwitchRadio').show();
                    if (self.localType == 1) {
                        if (!self.disportCity) {
                            self.disportCity = CityFactory(self.disportEle.find('.J_SearchCitiesRow .J_SearchDepart'), {
                                dropUrl: BaseConfig.CityUrl.local.destHot,
                                acEnabled: false,
                                acError: true,
                                autoCompleteUrl: BaseConfig.CityUrl.local.destFuzzy,
                                defaults: {code: config.cityCode, name: config.cityName}
                            });
                        }
                    } else if (self.localType == 2) {
                        if (!self.groupCity) {
                            self.groupCity = CityFactory(self.disportEle.find('.J_SearchSingle .J_SearchDepart'), {
                                dropUrl: BaseConfig.CityUrl.local.destHot,
                                acEnabled: false,
                                acError: true,
                                autoCompleteUrl: BaseConfig.CityUrl.local.destFuzzy,
                                defaults: {code: config.cityCode, name: config.cityName}
                            });
                        }
                    }
                }
                else if (type == 'wifi') {
                    self.entranceEle.hide();
                    self.disportEle.hide();
                    self.wifiEle.show();
                    if (!self.wifiCity) {
                        self.wifiCity = CityFactory(self.wifiEle.find('.J_SearchDepart'), {
                            dropUrl: BaseConfig.CityUrl.wifi.wifiCountry,
                            autoCompleteUrl: '',
                            defaults: {code: '', name: ''}
                        });
                    }
                    if (!this.wifiStyle) {
                        this.wifiStyle = BrandFactory(this.wifiEle.find('.J_SearchCitiesRow'), {
                            defaultType: indexCatalogData.wifi.genre.defaultType,
                            selector: '.J_SearchRoute',
                            options: indexCatalogData.wifi.genre.options || []
                        });
                    }
                }
            }, changeForm: function (localType) {
                if (localType == 'local') {
                    this.localType = 1;
                    this.disportEle.find('.J_SearchCitiesRow,.J_SearchTicketRow').show();
                    this.disportEle.find('.J_SearchSingle').hide();
                    this.showForm('disport');
                } else if (localType == 'around') {
                    this.localType = 2;
                    this.disportEle.find('.J_SearchCitiesRow,.J_SearchTicketRow').hide();
                    this.disportEle.find('.J_SearchSingle').show();
                    this.showForm('disport');
                }
            }, changeWifiStyle: function (wifiType) {
                if (wifiType == 'invite') {
                    this.wifiType = 0;
                } else if (wifiType == 'express') {
                    this.wifiType = 1;
                }
            }, transfer: function (departData) {
                var self = this, query = {};
                if (self.tabType == 1) {
                    query.departCode = departData.code;
                    query.departName = departData.name;
                } else if (self.tabType == 2) {
                    if (self.localType == 1) {
                        query.type = 'local';
                        query.departName = departData.name;
                    } else if (self.localType == 2) {
                        query.type = 'around';
                        query.departName = departData.name;
                    }
                }
                return query;
            }, transferWifi: function (departData) {
                var query = {};
                query.departCode = departData.code;
                query.departName = departData.name;
                query.proCode = departData.proCode;
                query.departStyle = departData.style;
                query.tabType = 'Wifi';
                return query;
            }, searchResource: function (query, submitBtn) {
                submitBtn.changeLink(this.buildSearchPageUrl(query), true);
                setTimeout(_.bind(function () {
                    submitBtn.restoreLink();
                }, this), 0);
            }, buildSearchPageUrl: function (query) {
                var self = this, enParam, url;
                if (self.tabType == 1) {
                    enParam = $('#cityLetter').val() || 'bj';
                    url = BaseConfig.page.ticket + 'search_complex/ticket-' + enParam + '-0-' + query.departName;
                } else if (self.tabType == 2) {
                    if (self.localType == 1) {
                        enParam = $('#cityLetter').val() || 'bj';
                        url = BaseConfig.page.local + 'search_complex/' + query.type + '-' + enParam + '-0-' + query.departName;
                    } else if (self.localType == 2) {
                        enParam = $('#cityLetter').val() || 'bj';
                        url = BaseConfig.page.local + 'search_complex/' + query.type + '-' + enParam + '-0-' + query.departName;
                    }
                }
                else if (self.tabType == 3) {
                    enParam = $('#cityLetter').val() || 'bj';
                    url = BaseConfig.page.wifi + 'area' + query.departCode + '-0-' + query.proCode + '-' + query.departStyle + '-0-1-0-0-0-1' + '.html';
                }
                return url;
            }
        });
    }
});
;define('component/number', ['underscore', 'backbone', 'jquery', 'component/component'], function (_, Backbone, $, ComponentFactory) {
    var DefaultConfig = {min: 1, max: 20, defaults: {number: 3}};
    var ViewHTML = '<div class="search_ctrl search_number">' + '<a href="javascript:;" class="search_number_btn search_number_minus">' + '<i class="search_number_btn_icon">-</i>' + '</a>' + '<a href="javascript:;" class="search_number_btn search_number_plus">' + '<i class="search_number_btn_icon">+</i>' + '</a>' + '<input class="search_number_input" type="text" value="" />' + '</div>';
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var self = this;
                if (element && element.length) {
                    this.element = element;
                } else {
                    element = this.element = this.buildView();
                }
                config = this.config = $.extend(true, {}, DefaultConfig, config);
                this.data.number = config.defaults.number;
                this.$('.search_number_input').focus(function () {
                    this.value = self.get('number');
                    this.select();
                }).mouseup(function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                }).blur(function () {
                    self._set(this.value);
                    this.value = self.get('number') + '天'
                }).val(this.get('number') + '天');
                this.$('.search_number_minus').click(function () {
                    self._set(self.get('number') - 1);
                    self.$('.search_number_input').val(self.get('number') + '天');
                });
                this.$('.search_number_plus').click(function () {
                    self._set(parseInt(self.get('number'), 10) + 1);
                    self.$('.search_number_input').val(self.get('number') + '天');
                });
            }, buildView: function () {
                return $(ViewHTML);
            }, set: function (date) {
                this.__super.set.call(this, 'number', date);
                this.$('.search_number_input').val(date + '天');
            }, _set: function (property, number) {
                if (number === undefined) {
                    number = property;
                }
                number = parseInt(number, 10);
                if (isNaN(number) || number < this.config.min || number > this.config.max) {
                    return;
                }
                this.__super._set.call(this, 'number', number);
            }
        });
    }
});
;
/*! Component-首页-套餐查询模块 */
define('component/package', ['underscore', 'backbone', 'jquery', 'unit/tool', 'config/Base', 'component/component', 'component/city', 'component/date', 'component/city-number-group', 'component/adult-child', 'component/button', 'component/submit'], function (_, Backbone, $, Tool, BaseConfig, ComponentFactory, CityFactory, DateFactory, CityNumberGroupFactory, AdultChildFactory, ButtonFactory, SubmitFactory) {
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var departCity, departDate, destGroup, addButton, stuff, submitButton,
                    defaultDate = Tool.getDeltaDateStr(new Date, 7), self = this;
                this.element = element;
                departCity = CityFactory(element.find('.J_DepartCity'), {
                    dropUrl: BaseConfig.CityUrl.package.departHot,
                    autoCompleteUrl: BaseConfig.CityUrl.package.departFuzzy,
                    defaults: {code: config.cityCode, name: config.cityName},
                    autoCompleteKey: 'keyword'
                });
                departDate = DateFactory(element.find('.J_DepartDate'), {
                    current: defaultDate,
                    defaults: {date: defaultDate}
                });
                destGroup = CityNumberGroupFactory(element.find('.J_SearchDestGroup'), {
                    max: 4,
                    cityNumber: {
                        city: {
                            dropUrl: BaseConfig.CityUrl.package.destHot,
                            autoCompleteUrl: BaseConfig.CityUrl.package.destFuzzy
                        }
                    },
                    departDate: defaultDate,
                    autoCompleteKey: 'keyword'
                });
                addButton = ButtonFactory(element.find('.J_SearchAdd'));
                submitButton = this.submitButton = SubmitFactory(element.find('.J_SearchSubmit'));
                stuff = AdultChildFactory(element.find('.J_SearchStuffRow'), {defaults: {adult: 2, child: 0}});
                addButton.on('click', function () {
                    destGroup.add();
                });
                destGroup.on('filled', function () {
                    addButton.hide();
                });
                destGroup.on('unfilled', function () {
                    addButton.show();
                });
                departDate.on('changed', function () {
                    destGroup.changeDepartDate(departDate.get('date'));
                });
                submitButton.on('submit', function () {
                    var departCityData = departCity.getData(), departDateData = departDate.getData(),
                        destListData = destGroup.getData(), stuffData = stuff.getData(), query;
                    if (departCityData && departDateData && destListData && stuffData) {
                        self.searchResource(query = self.transfer(departCityData, departDateData, destListData, stuffData))
                        self.trigger('submit', query);
                    }
                });
            }, transfer: function (departCityData, departDateData, destListData, stuffData) {
                var query = {}, destinations = [];
                query.departDate = departDateData.date;
                query.adultCount = stuffData.adult;
                query.childCount = stuffData.child;
                destinations.push(departCityData);
                _.each(destListData, function (dest) {
                    destinations.push({code: dest.code, name: dest.name, duration: dest.number});
                });
                destinations.push(departCityData);
                query.destination = destinations;
                return query;
            }, show: function () {
                this.element.show();
            }, hide: function () {
                this.element.hide();
            }, searchResource: function (query) {
                this.submitButton.changeLink(this.buildSearchPageUrl(query), true)
                setTimeout(_.bind(function () {
                    this.submitButton.restoreLink();
                }, this), 0)
            }, buildSearchPageUrl: function (query) {
                var destinations = query.destination, departCityData = _.first(destinations), queryParam = [],
                    destinationParamList = [];
                queryParam.push(departCityData.code);
                _.each(destinations, function (destination, index) {
                    if (index && index !== destinations.length - 1) {
                        destinationParamList.push(destination.code + '-' + destination.duration);
                    }
                });
                queryParam.push(destinationParamList.join(','));
                queryParam.push(query.departDate);
                queryParam.push(query.adultCount + '-' + query.childCount);
                return BaseConfig.page.diy + queryParam.join('/') + '/' + (query.round ? '?back=1' : '');
            }
        });
    }
});
;define('component/sections', ['underscore', 'backbone', 'jquery', 'component/component'], function (_, Backbone, $, ComponentFactory) {
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var self = this, catalogThird = $('.J_CatalogThird'), timerEnter, timerLeave2, eleTimer;
                this.element = element;
                self.monitor();
                this.$('.J_CatalogSecond').each(function () {
                    var $$this = $(this);
                    $$this.mouseenter(function () {
                        var dataRel, _this = $(this);
                        dataRel = _this.data('rel');
                        clearTimeout(timerEnter);
                        clearTimeout(timerLeave2);
                        timerEnter = setTimeout(function () {
                            self.$('.c_s_hover').removeClass('c_s_hover');
                            _this.addClass('c_s_hover');
                            self.getIndex(_this);
                            self.$('.J_CatalogSecond').find('.section_arrow').addClass('tn_none');
                            catalogThird.find('.J_CatalogSection').each(function () {
                                var $this = $(this), val = $this.data('value');
                                if (val == dataRel) {
                                    catalogThird.removeClass('tn_none');
                                    $this.removeClass('tn_none');
                                    _this.find('.section_arrow').removeClass('tn_none');
                                } else {
                                    $this.addClass('tn_none');
                                }
                            })
                        }, 300)
                    });
                    $$this.mouseleave(function () {
                        var _this = $(this);
                        var dataRel;
                        dataRel = _this.data('rel');
                        catalogThird.find('.J_CatalogSection').each(function () {
                            var val = $(this).data('value');
                            if (val == dataRel) {
                                $(this).mouseenter(function () {
                                    clearTimeout(timerEnter);
                                    clearTimeout(timerLeave2);
                                    clearTimeout(eleTimer);
                                    catalogThird.removeClass('tn_none');
                                    $(this).removeClass('tn_none');
                                    _this.find('.section_arrow').removeClass('tn_none');
                                });
                                $(this).mouseleave(function () {
                                    var $this = $(this);
                                    clearTimeout(timerEnter);
                                    clearTimeout(timerLeave2);
                                    timerLeave2 = setTimeout(function () {
                                        catalogThird.addClass('tn_none');
                                        $this.addClass('tn_none');
                                        self.$('.c_s_hover').removeClass('c_s_hover');
                                        _this.find('.section_arrow').addClass('tn_none');
                                    }, 400);
                                });
                            }
                            else {
                            }
                            clearTimeout(timerEnter);
                        });
                    });
                });
                $(this.element).mouseleave(function () {
                    clearTimeout(eleTimer);
                    eleTimer = setTimeout(function () {
                        self.$('.c_s_hover').removeClass('c_s_hover');
                        self.$('.c_prev').removeClass('c_prev');
                        catalogThird.addClass('tn_none');
                        self.$('.J_CatalogSecond').find('.section_arrow').addClass('tn_none');
                    }, 400)
                })
            }, getIndex: function (ele) {
                var self = this, index = ele.index(), elements = self.element.selector;
                ele.siblings().removeClass('c_prev');
                $(elements).removeClass('c_s_bg');
                if (index != 0) {
                    ele.prev().addClass('c_prev');
                    if (ele.hasClass('s_last')) {
                        $(elements).addClass('c_s_bg');
                    }
                }
            }, monitor: function () {
                this.$('.J_CatalogSecond').each(function () {
                    var _this = $(this), cityId = $('#letter').val() || sh;
                    if (_this.find('.c_s_nom').length) {
                        _this.find('.c_s_nom a').each(function () {
                            var $this = $(this), _html = $this.html();
                            if (_html) {
                                $this.attr('onclick', "_gaq.push(['_trackEvent', '首页_" + cityId + "','点击','分类目录-旅游度假-二级分类目录-" + _html + "'])");
                            }
                        });
                    }
                    if (_this.find('.c_s_title').length) {
                        _this.find('.c_s_title a').each(function () {
                            var $this = $(this), _html = $this.html();
                            if (_html) {
                                $this.attr('onclick', "_gaq.push(['_trackEvent', '首页_" + cityId + "','点击','分类目录-旅游度假-二级分类目录-" + _html + "'])");
                            }
                        });
                    }
                    if (_this.find('.c_s_single').length) {
                        _this.find('.c_s_single a').each(function () {
                            var $this = $(this), _html = $this.html();
                            if (_html) {
                                $this.attr('onclick', "_gaq.push(['_trackEvent', '首页_" + cityId + "','点击','分类目录-旅游度假-二级分类目录-" + _html + "'])");
                            }
                        });
                    }
                })
            }
        });
    }
});
;define('component/submit', ['underscore', 'backbone', 'jquery', 'component/component'], function (_, Backbone, $, ComponentFactory) {
    var ViewHTML = '<div class="search_ctrl search_submit search_pkg_submit">' + '<a href="javascript:;" class="search_submit_btn">开始查找</a>' + '</div>';
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                if (element) {
                    this.element = element;
                } else {
                    blankView = true;
                    element = this.element = this.buildView();
                }
                element.click(_.bind(function () {
                    this.trigger('submit');
                }, this));
            }, show: function () {
                this.element.show();
            }, hide: function () {
                this.element.hide();
            }, changeLink: function (link, isBlank) {
                this.$('a').attr({'target': isBlank ? '_blank' : '', 'href': link});
            }, restoreLink: function () {
                this.$('a').removeAttr('target').attr('href', 'javascript:;');
            }
        });
    }
});
;define('component/switch', ['underscore', 'backbone', 'jquery', 'component/component'], function (_, Backbone, $, ComponentFactory) {
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var self = this;
                this.element = element;
                this.element.show();
                this.$('.switch_btn').click(function () {
                    if (!$(this).hasClass('switch_selected')) {
                        self.clear();
                        $(this).addClass('switch_selected');
                        self.trigger('changed', $(this).data('value'));
                        if ($.browser.msie && parseInt($.browser.version) == 7) {
                            if (self.element.parent('div').hasClass('repairIE7')) {
                                self.element.parent('div').removeClass('repairIE7');
                            } else {
                                self.element.parent('div').addClass('repairIE7');
                            }
                        }
                    }
                });
            }, clear: function () {
                this.$('.switch_selected').removeClass('switch_selected');
            }
        });
    }
});
;define('component/switch-radio', ['underscore', 'backbone', 'jquery', 'component/component'], function (_, Backbone, $, ComponentFactory) {
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var self = this;
                this.element = element;
                this.$('label').click(function () {
                    if (!$(this).hasClass('tn_switch')) {
                        self.clear('tn_switch');
                        $(this).addClass('tn_switch');
                        self.trigger('changed', $(this).data('value'));
                        if ($.browser.msie && parseInt($.browser.version) == 7) {
                            setTimeout(function () {
                                if (self.element.parents('.search_group').hasClass('repairIE7')) {
                                    self.element.parents('.search_group').removeClass('repairIE7');
                                } else {
                                    self.element.parents('.search_group').addClass('repairIE7');
                                }
                            }, 0)
                        }
                    }
                });
            }, clear: function (className) {
                this.$('.' + className).removeClass(className);
            }
        });
    }
});
;define('component/tabs', ['underscore', 'backbone', 'jquery', 'component/component'], function (_, Backbone, $, ComponentFactory) {
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var self = this;
                this.element = element;
                this.selectedTab = 'tour';
                this.$('.c_f_selected').removeClass('c_f_selected');
                this.$('.J_SearchTab').eq(0).addClass('c_f_selected');
                this.$('.J_SearchTab').click(function () {
                    self.$('.c_f_selected').removeClass('c_f_selected');
                    $(this).addClass('c_f_selected');
                    self.selectedTab = $(this).data('rel');
                    self.trigger('changed', $(this).data('rel'));
                    if ($.browser.msie && $.browser.version <= 8) {
                        $('.cp_drop').hide();
                    }
                });
                this.$('.J_SearchTab').mouseenter(function () {
                    if (!$(this).hasClass('c_f_selected')) {
                        $(this).addClass('c_f_selected');
                    }
                });
                this.$('.J_SearchTab').mouseleave(function () {
                    var tab = $(this).data('rel');
                    if ($(this).hasClass('c_f_selected') && tab != self.selectedTab) {
                        $(this).removeClass('c_f_selected');
                    }
                });
            }
        });
    }
});
;define('component/ticket', ['underscore', 'backbone', 'jquery', 'config/Base', 'unit/tool', 'component/component', 'component/switch', 'component/switch-radio', 'component/checkbox', 'component/city-city', 'component/date', 'component/button', 'component/submit'], function (_, Backbone, $, BaseConfig, Tool, ComponentFactory, SwitchFactory, SwitchRadioFactory, CheckboxFactory, CityCityFactory, DateFactory, ButtonFactory, SubmitFactory) {
    var DEFAULT_DATE = Tool.getDeltaDateStr(new Date, 0);
    var DEFAULT_BUS_DATE = Tool.getDeltaDateStr(new Date, 1);
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var switchButtonRaido, switchButton, trainSubmit, busSubmit, trainEuroSubmit, checkHighRail, trainEle,
                    busEle, self = this;
                this.element = element;
                this.ticketType = 1;
                this.railType = 1;
                this.highRail = false;
                trainEle = element.find('.J_Train');
                busEle = element.find('.J_Bus');
                this.trainEle = trainEle;
                this.busEle = busEle;
                switchButton = SwitchFactory(this.$('.J_SearchSwitch'));
                switchButtonRaido = SwitchRadioFactory(trainEle.find('.J_SearchSwitchRadio'));
                this.switchButtonRaido = switchButtonRaido;
                checkHighRail = CheckboxFactory(trainEle.find('.J_SearchSwitchRadio'));
                this.initForm();
                trainSubmit = this.trainSubmit = SubmitFactory(trainEle.find('.J_SearchSubmit'));
                busSubmit = this.busSubmit = SubmitFactory(busEle.find('.J_SearchSubmit'));
                trainEuroSubmit = SubmitFactory(trainEle.find('.J_SearchSingle .J_SearchSubmit'));
                this.initForm();
                switchButton.on('changed', _.bind(this.changeTicket, this));
                switchButtonRaido.on('changed', _.bind(this.changeForm, this));
                checkHighRail.on('changed', _.bind(this.changeHighRail, this));
                trainSubmit.on('submit', function () {
                    var departData = self.trainCities.getData(), dateData = self.TrainDates.getData(),
                        railData = self.highRail, query;
                    if (departData && dateData) {
                        self.searchResource(query = self.transfer(departData, dateData, railData), self.trainSubmit, "1");
                        self.trigger('submit', query)
                    }
                });
                trainEuroSubmit.on('submit', function () {
                    var departData = self.trainEuroCities.getData(), dateData = self.TrainEuroDates.getData(),
                        railData = self.highRail;
                    if (departData && dateData) {
                        self.trigger('submit', self.transfer(departData, dateData, railData))
                    }
                });
                busSubmit.on('submit', function () {
                    var departData = self.busCities.getData(), dateData = self.busDates.getData();
                    if (departData && dateData) {
                        departData = $.extend({}, departData, self.getBusPresellDay());
                        self.searchResource(query = self.busTransfer(departData, dateData), self.busSubmit, "2");
                        self.trigger('submit', query)
                    }
                });
            }, transfer: function (CityData, DateData, railData) {
                var query = {};
                query.date = DateData.date;
                query.fromName = CityData.departName;
                query.from = CityData.departCode;
                query.to = CityData.destCode;
                query.toName = CityData.destName;
                query.railType = this.railType;
                query.onlyGD = railData ? 1 : '';
                return query;
            }, getBusPresellDay: function () {
                var city_City = this.busCities;
                var departCity = city_City.departCity;
                var destCity = city_City.destCity;
                var dptElem = departCity.getElement();
                var dstElem = destCity.getElement();
                var dptPresellDay = departCity.getElement().attr("presellDay") || '60';
                var dstPresellDay = destCity.getElement().attr("presellDay") || '60';
                return {dptPreSellDay: dptPresellDay, dstPreSellDay: dstPresellDay};
            }, busTransfer: function (CityData, DateData) {
                return {
                    dptStation: CityData.departName,
                    dptPreSellDay: CityData.dptPreSellDay,
                    dstStation: CityData.destName,
                    dstPreSellDay: '',
                    dptTime: DateData.date,
                    pageSrc: '1'
                };
            }, searchResource: function (query, submitObj, type) {
                var form = $('<form />');
                for (var key in query) {
                    form.append(this.buildHiddenInput(key, query[key]));
                }
                form.attr({method: 'POST', action: this.buildSearchPageUrl(query, type), target: '_blank'});
                form.appendTo('body').submit();
                setTimeout(function () {
                    form.remove();
                }, 0);
            }, buildHiddenInput: function (property, value) {
                return $('<input />').attr({name: property, value: value, type: 'hidden'});
            }, buildSearchPageUrl: function (query, type) {
                var queryParam, url;
                if (type && type === "2") {
                    url = "http://bus.tuniu.com/station";
                } else {
                    if (query.railType == 1) {
                        queryParam = 'station_' + query.from + '_' + query.to + '?p=1';
                        url = BaseConfig.page.trainDomestic + queryParam;
                    } else if (query.railType == 2) {
                    }
                }
                return url;
            }, initForm: function () {
                if (this.ticketType == 1) {
                    this.showTicket('train');
                } else {
                    this.showTicket('bus');
                }
            }, changeForm: function (railType) {
                if (railType == 'domestic') {
                    this.railType = 1;
                    this.showRail(railType);
                } else if (railType == 'european') {
                    this.railType = 2;
                    this.showRail(railType);
                }
            }, changeHighRail: function (high) {
                if (high == 'high') {
                    this.highRail = true;
                } else {
                    this.highRail = false;
                }
            }, changeTicket: function (ticketType) {
                if (ticketType == 'train') {
                    this.ticketType = 1;
                    this.showTicket('train');
                } else if (ticketType == 'bus') {
                    this.ticketType = 2;
                    this.showTicket('bus');
                }
            }, beforeRenderDrop: function (resp) {
                var arr = [];
                var data = resp.data || [];
                for (var i = 0; i < data.length; i++) {
                    var obj = {};
                    obj.name = data[i].cityName;
                    obj.code = data[i].cityName;
                    obj.presellDay = data[i].presellDay;
                    arr.push(obj);
                }
                resp.data = arr;
                return resp;
            }, reloadDate: function (presellDay) {
                if (this.busDates) {
                    this.busDates.changeMax(Tool.getDeltaDateStr(new Date, presellDay - 1));
                }
            }, onChangeBus: function (selectedData, target, type) {
                var presellDay = 60;
                if (selectedData && selectedData.presellDay && selectedData.presellDay != 0) {
                    presellDay = selectedData.presellDay;
                }
                target.attr("presellDay", presellDay);
                if (type == "1") {
                    this.reloadDate(parseInt(presellDay));
                }
            }, showTicket: function (type) {
                var _self = this;
                if (type == 'train') {
                    this.trainEle.show();
                    this.busEle.hide();
                    this.switchButtonRaido.show();
                    if (this.railType == 1) {
                        if (!this.trainCities) {
                            this.trainCities = CityCityFactory(this.trainEle.find('.J_SearchCitiesRow'), {
                                depart: {
                                    dropUrl: BaseConfig.CityUrl.train.departHot,
                                    autoCompleteUrl: BaseConfig.CityUrl.train.departFuzzy,
                                    isTrain: true,
                                    defaults: {code: config.cityCode, name: config.cityName}
                                },
                                dest: {
                                    dropUrl: BaseConfig.CityUrl.train.destHot,
                                    autoCompleteUrl: BaseConfig.CityUrl.train.destFuzzy,
                                    isTrain: true,
                                    defaults: {code: '', name: ''}
                                }
                            });
                        }
                        if (!this.TrainDates) {
                            this.TrainDates = DateFactory(this.trainEle.find('.J_DepartDate'), {
                                current: DEFAULT_DATE,
                                max: Tool.getDeltaDateStr(new Date, 59),
                                defaults: {date: DEFAULT_DATE}
                            });
                        }
                    } else if (this.railType == 2) {
                        if (!this.trainEuroCities) {
                            this.trainEuroCities = CityCityFactory(this.trainEle.find('.J_SearchCities'), {
                                depart: {
                                    dropUrl: BaseConfig.CityUrl.train.departHot,
                                    autoCompleteUrl: BaseConfig.CityUrl.train.departFuzzy,
                                    defaults: {code: config.cityCode, name: config.cityName}
                                },
                                dest: {
                                    dropUrl: BaseConfig.CityUrl.train.destHot,
                                    autoCompleteUrl: BaseConfig.CityUrl.train.destFuzzy,
                                    defaults: {code: '', name: ''}
                                }
                            });
                        }
                        if (!this.TrainEuroDates) {
                            this.TrainEuroDates = DateFactory(this.trainEle.find('.J_SearchDate'), {
                                current: DEFAULT_DATE,
                                max: Tool.getDeltaDateStr(new Date, 60),
                                defaults: {date: DEFAULT_DATE}
                            });
                        }
                    }
                } else if (type == 'bus') {
                    this.trainEle.hide();
                    this.busEle.show();
                    var defaultPreSellDay = 60;
                    var defaultDptPreSellDay = defaultPreSellDay;
                    if (config.cityCode) {
                        defaultDptPreSellDay = 15;
                    }
                    if (!this.busCities) {
                        this.busCities = CityCityFactory(this.busEle.find('.J_SearchCitiesRow'), {
                            depart: {
                                dropUrl: BaseConfig.CityUrl.bus.departHot,
                                autoCompleteUrl: BaseConfig.CityUrl.bus.departFuzzy,
                                noSuggestionNotice: '暂不支持该出发地',
                                catFlag: 'bus',
                                defaults: {
                                    code: config.cityCode,
                                    name: config.cityName,
                                    presellDay: defaultDptPreSellDay
                                },
                                beforeRenderDrop: this.beforeRenderDrop,
                                onChange: function (selectedData, target) {
                                    _self.onChangeBus.call(_self, selectedData, target, "1");
                                },
                                init: function () {
                                    var cityObj = this;
                                    cityObj.getElement().attr("presellDay", defaultDptPreSellDay);
                                    var initName = config.cityName;
                                    if (initName) {
                                        $.ajax({
                                            url: BaseConfig.CityUrl.bus.getPreSellDayByCity,
                                            type: 'GET',
                                            cache: false,
                                            dataType: 'json',
                                            data: {keyword: config.cityName},
                                            success: function (resp) {
                                                var selectedData = cityObj.data || {};
                                                if (resp && !isNaN(resp) && resp != 0 && initName == selectedData.name) {
                                                    cityObj.config.onChange($.extend({}, selectedData, {presellDay: resp}), cityObj.getElement());
                                                }
                                            },
                                            error: function () {
                                            }
                                        });
                                    }
                                }
                            },
                            dest: {
                                dropUrl: BaseConfig.CityUrl.bus.destHot,
                                autoCompleteUrl: BaseConfig.CityUrl.bus.destFuzzy,
                                noSuggestionNotice: '暂不支持该目的地',
                                catFlag: 'bus',
                                defaults: {code: '', name: '', presellDay: defaultPreSellDay},
                                beforeRenderDrop: this.beforeRenderDrop,
                                onChange: function (selectedData, target) {
                                    _self.onChangeBus.call(_self, selectedData, target, "2");
                                }
                            },
                            onSwapCities: function () {
                                var city_City = this;
                                var departCity = city_City.departCity;
                                var destCity = city_City.destCity;
                                var dptElem = departCity.getElement();
                                var dstElem = destCity.getElement();
                                var dptPresellDay = departCity.getElement().attr("presellDay") || defaultPreSellDay;
                                var dstPresellDay = destCity.getElement().attr("presellDay") || defaultPreSellDay;
                                dptElem.attr("presellDay", dstPresellDay);
                                dstElem.attr("presellDay", dptPresellDay);
                                _self.reloadDate(dstPresellDay);
                            }
                        });
                    }
                    if (!this.busDates) {
                        this.busDates = DateFactory(this.busEle.find('.J_DepartDate'), {
                            current: DEFAULT_BUS_DATE,
                            defaults: {date: DEFAULT_BUS_DATE},
                            max: Tool.getDeltaDateStr(new Date, defaultDptPreSellDay - 1)
                        });
                    }
                }
            }, showRail: function (type) {
                if (type == 'domestic') {
                    this.trainEle.find('.J_SearchCitiesRow,.J_SearchDateRow').show()
                    this.trainEle.find('.J_SearchSingle').hide();
                    this.showTicket('train');
                } else if (type == 'european') {
                    this.trainEle.find('.J_SearchCitiesRow,.J_SearchDateRow').hide()
                    this.trainEle.find('.J_SearchSingle').show();
                    this.showTicket('train');
                }
            }
        });
    }
});
;define('component/tour', ['underscore', 'backbone', 'jquery', 'component/component'], function (_, Backbone, $, ComponentFactory) {
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                this.element = element;
            }
        })
    }
});
;
;define('unit/city-picker', ['jquery', 'unit/jquery.autocomplete'], function ($, ac) {
    var defaultOption = {
        dropEnabled: true,
        dropAlign: 'left',
        acEnabled: true,
        acError: false,
        isTrain: false,
        catFlag: '',
        autoComplete: {},
        autoCompleteKey: 'query',
        beforeRenderDrop: ''
    };
    var pickers = [];
    var lowBrowser = $.browser.msie && $.browser.version <= '8.0';
    $(window).resize(function () {
        $.each(pickers, function () {
            this.updateDrop();
        });
    });
    $(document).click(function () {
        CityPicker.hideAllDrop();
    });
    $('.tn_catalog').click(function () {
        CityPicker.hideAllDrop();
    });

    function CityPicker(ele, option) {
        this.target = $(ele);
        this.option = $.extend({}, defaultOption, option);
        this.autoCompleteOption = $.extend({}, this.option.autoComplete);
        if (option.selected) {
            this.selected = $.extend({}, option.selected);
        }
        this.init();
    }

    CityPicker.hideAllDrop = function () {
        $.each(pickers, function () {
            this.hideDrop();
            if (this.option.acEnabled) {
                this.hideAc();
            }
        });
    }
    $.extend(CityPicker.prototype, {
        buildDrop: function (data) {
            var self = this;
            switch (self.catalogFlag) {
                case'ticket':
                case'local':
                    var listHtml = '<div class="cp_boxes"><ul class="cp_box clearfix">';
                    $.each(data, function (index, cat) {
                        listHtml += '<li title="' + cat.keyword + '">';
                        listHtml += '<a class="cp_city" href="javascript:;" data-code="' + cat.changeValue + '">' + cat.keyword + '</a>';
                        listHtml += '</li>';
                    });
                    listHtml += '</ul></div>';
                    this.dropWrap.html('<div class="cp_tit">支持中文/拼音输入</div>' + listHtml);
                    break;
                case'visa':
                    var tabHtml = '<ul class="cp_tabs clearfix">', listHtml = '<div class="cp_boxes">';
                    $.each(data, function (index, cat) {
                        tabHtml += '<li class="cp_tab';
                        listHtml += '<ul class="cp_box clearfix"';
                        if (index === 0) {
                            tabHtml += ' cp_tab_current';
                        } else {
                            listHtml += ' style="display: none"';
                        }
                        tabHtml += '">' + cat.name + '</li>';
                        listHtml += '>';
                        $.each(cat.countryList, function (index, item) {
                            listHtml += '<li title="' + item.name + '">';
                            listHtml += '<a class="cp_city" href="javascript:;" data-code="' + item.countryCode + '">' + item.name + '</a>';
                            listHtml += '</li>';
                        });
                        listHtml += '</ul>';
                    });
                    tabHtml += '</ul>';
                    listHtml += '</div>';
                    this.dropWrap.html('<div class="cp_tit">支持中文/拼音输入</div>' + tabHtml + listHtml);
                    break;
                case'wifi':
                    var tabHtml = '<ul class="cp_tabs clearfix">', listHtml = '<div class="cp_boxes">';
                    $.each(data, function (index, cat) {
                        tabHtml += '<li class="cp_tab';
                        listHtml += '<ul class="cp_box clearfix"';
                        if (index === 0) {
                            tabHtml += ' cp_tab_current';
                        } else {
                            listHtml += ' style="display: none"';
                        }
                        tabHtml += '">' + cat.name + '</li>';
                        listHtml += '>';
                        $.each(cat.countryList, function (index, item) {
                            listHtml += '<li title="' + item.name + '">';
                            listHtml += '<a class="cp_city" href="javascript:;" data-code="' + item.id + '">' + item.name + '</a>';
                            listHtml += '</li>';
                        });
                        listHtml += '</ul>';
                    });
                    tabHtml += '</ul>';
                    listHtml += '</div>';
                    this.dropWrap.html(tabHtml + listHtml);
                    break;
                case'hotelScenicHot':
                    if (!data) {
                        this.dropWrap.html('<div class="cp-noHotCity">还没有热门目的地哦，欢迎输入感兴趣的目的地</div>');
                    }
                    else {
                        var listHot = "", listJing = "";
                        var tabHtml = '<ul class="cp_tabs clearfix">', listHtml = '<div class="cp_boxes scenery-box">';
                        if (data.hotDestList) {
                            var listHot = '<p class="hot_address"><i></i>热门目的地</p>';
                            listHot += '<ul class="cp_box clearfix">';
                            $.each(data.hotDestList, function (index, item) {
                                listHot += '<li title="' + item.poiName + '">';
                                listHot += '<a class="cp_city" href="javascript:;" data-code="' + item.poiId + '">' + item.poiName + '</a>';
                                listHot += '</li>';
                            });
                            listHot += '</ul>';
                        }
                        if (data.hotPoiList) {
                            var listJing = '<p class="hot_scenery"><i></i>热门景点</p>';
                            listJing += '<ul class="cp_box cp_jingdian clearfix">';
                            $.each(data.hotPoiList, function (index, item) {
                                listJing += '<li title="' + item.poiName + '">';
                                listJing += '<a class="cp_city" href="javascript:;" data-code="' + item.poiId + '">' + item.poiName + '</a>';
                                listJing += '</li>';
                            });
                            listJing += '</ul>';
                        }
                        this.dropWrap.html('<div class="cp_tit">支持中文/拼音输入</div>' + listHtml + listHot + listJing + '</div>');
                    }
                    break;
                case'flightDomestic':
                    var tabHtml = '<ul class="cp_tabs clearfix">', listHtml = '<div class="cp_boxes">';
                    data.sort(function (a, b) {
                        var title1 = a.title, title2 = b.title;
                        if (title1.charCodeAt(0) > title2.charCodeAt(0)) {
                            return 1;
                        } else {
                            return -1;
                        }
                        return 0;
                    });
                    data.unshift(data.pop());
                    $.each(data, function (index, cat) {
                        tabHtml += '<li class="cp_tab';
                        listHtml += '<ul class="cp_box clearfix"';
                        if (cat.isHot === 1) {
                            tabHtml += ' cp_tab_current';
                        } else {
                            listHtml += ' style="display: none"';
                        }
                        tabHtml += '">' + cat.title + '</li>';
                        listHtml += '>';
                        $.each(cat.data, function (index, item) {
                            listHtml += '<li title="' + item.name + '">';
                            listHtml += '<a class="cp_city" href="javascript:;" data-code="' + item.code + '">' + item.name + '</a>';
                            listHtml += '</li>';
                        });
                        listHtml += '</ul>';
                    });
                    tabHtml += '</ul>';
                    listHtml += '</div>';
                    this.dropWrap.html('<div class="cp_tit">支持中文/拼音输入</div>' + tabHtml + listHtml);
                    break;
                case'bus':
                    var listHtml = '<div class="cp_boxes bus_cp_boxes"><ul class="cp_box clearfix">';
                    $.each(data, function (index, cat) {
                        listHtml += '<li title="' + cat.name + '">';
                        listHtml += '<a class="cp_city" href="javascript:;" data-code="' + cat.code + '" data-presellDay="' + cat.presellDay + '">' + cat.name + '</a>';
                        listHtml += '</li>';
                    });
                    listHtml += '</ul></div>';
                    this.dropWrap.html('<div class="cp_tit">支持中文/拼音输入</div>' + listHtml);
                    break;
                default:
                    var tabHtml = '<ul class="cp_tabs clearfix">', listHtml = '<div class="cp_boxes">';
                    $.each(data, function (index, cat) {
                        tabHtml += '<li class="cp_tab';
                        listHtml += '<ul class="cp_box clearfix"';
                        if (index === 0) {
                            tabHtml += ' cp_tab_current';
                        } else {
                            listHtml += ' style="display: none"';
                        }
                        tabHtml += '">' + cat.title + '</li>';
                        listHtml += '>';
                        $.each(cat.data, function (index, item) {
                            listHtml += '<li title="' + item.name + '">';
                            listHtml += '<a class="cp_city" href="javascript:;" data-code="' + item.code + '">' + item.name + '</a>';
                            listHtml += '</li>';
                        });
                        listHtml += '</ul>';
                    });
                    tabHtml += '</ul>';
                    listHtml += '</div>';
                    this.dropWrap.html('<div class="cp_tit">支持中文/拼音输入</div>' + tabHtml + listHtml);
                    break;
            }
            this.dropLoaded = true;
        }, init: function () {
            if (this.option.dropEnabled) {
                this.initDrop();
            }
            if (this.option.acEnabled) {
                this.initAC();
            }
        }, initDrop: function () {
            var self = this, target = self.target, isOnDrop = false, dropWrap = $('<div />').addClass('cp_drop');
            dropWrap.on('click', function (e) {
                e.stopPropagation();
            }).on('click', '.cp_city', function () {
                if (self.catalogFlag == 'local' || self.catalogFlag == 'ticket' || self.catalogFlag == 'hotelScenicHot') {
                    self.select($(this).html());
                    self.hideDrop();
                }
                else if (self.catalogFlag == 'wifi') {
                    self.select($(this).html(), $(this).data('code'));
                    self.hideDrop();
                } else {
                    self.select($(this).data('code'));
                    self.hideDrop();
                }
            }).on('click', '.cp_tab', function () {
                var index = $(this).index();
                dropWrap.find('.cp_tab').removeClass('cp_tab_current').eq(index).addClass('cp_tab_current');
                dropWrap.find('.cp_box').hide().eq(index).show();
            });
            dropWrap.on('mouseenter', function () {
                isOnDrop = true;
                self.option.onMouseEnter && self.option.onMouseEnter();
            }).on('mouseleave', function () {
                isOnDrop = false;
                self.option.onMouseLeave && self.option.onMouseLeave();
            });
            target.focus(function () {
                $('.cp_drop').hide();
                self.showDrop();
            }).blur(function (e) {
                if (!isOnDrop) {
                    self.hideDrop();
                }
            });
            target.bind('change input propertychange', function (e) {
                if (e.type !== 'change' && e.type !== 'input' && !(e.type === 'propertychange' && e.originalEvent.propertyName === 'value')) {
                    return true;
                }
                if (target.val() === '') {
                    self.showDrop();
                } else {
                    self.hideDrop();
                }
            }).on('keydown', function (e) {
                if (e.keyCode != 9 && e.keyCode != 13) {
                    self.unselect();
                }
                if (self.option.acError && $(this).parents('div.J_SearchDepart').hasClass('search_ctrl_error')) {
                    $(this).parents('div.J_SearchDepart').removeClass('search_ctrl_error');
                }
            }).click(function (e) {
                e.stopPropagation();
            });
            dropWrap.appendTo('body');
            this.dropWrap = dropWrap;
        }, loadDrop: function () {
            var self = this;
            if (this.loadingDrop) {
                return;
            }
            if (this.option.dropData) {
                this.buildDrop(this.option.dropData);
            } else {
                this.loadingDrop = true;
                $.ajax({
                    url: this.option.dropUrl, dataType: 'jsonp', callback: 'jsoncallback', success: function (res) {
                        var data;
                        self.loadingDrop = false;
                        if (typeof self.option.beforeRenderDrop === "function") {
                            res = self.option.beforeRenderDrop(res) || res;
                        }
                        if (res && res.success) {
                            data = res.data;
                            self.catalogFlag = res.flag;
                            self.buildDrop(data);
                            self.option.dropData = data;
                        }
                    }, error: function () {
                        self.loadingDrop = false;
                    }
                });
            }
        }, getDataFromDrop: function (id) {
            var self = this, exist = false, data;
            switch (self.catalogFlag) {
                case'visa':
                    $.each(this.option.dropData, function (index, cat) {
                        $.each(cat.countryList, function (index, item) {
                            if (item.countryCode == id) {
                                data = item;
                                data.code = item.countryCode;
                                data.name = item.name;
                                exist = true;
                                return false;
                            }
                        });
                        if (exist) {
                            return false;
                        }
                    });
                    break;
                case'wifi':
                    $.each(this.option.dropData, function (index, cat) {
                        $.each(cat.countryList, function (index, item) {
                            if (item.name == id) {
                                data = item;
                                data.code = item.id;
                                data.name = item.name;
                                exist = true;
                                return false;
                            }
                        });
                        if (exist) {
                            return false;
                        }
                    });
                    break;
                case'local':
                case'ticket':
                    $.each(this.option.dropData, function (index, cat) {
                        if (cat.keyword == id) {
                            data = cat;
                            data.code = cat.changeValue;
                            data.name = cat.keyword;
                            exist = true;
                            return false;
                        }
                        if (exist) {
                            return false;
                        }
                    });
                    break;
                case"bus":
                    $.each(this.option.dropData, function (index, cat) {
                        if (cat.code == id) {
                            data = cat;
                            exist = true;
                            return false;
                        }
                        if (exist) {
                            return false;
                        }
                    });
                    break;
                case"hotelScenicHot":
                    $.each(this.option.dropData, function (index, list) {
                        $.each(list, function (item, cat) {
                            if (cat.poiName == id) {
                                data = cat;
                                data.code = cat.poiId;
                                data.name = cat.poiName;
                                exist = true;
                                return false;
                            }
                            if (exist) {
                                return false;
                            }
                        });
                    });
                    break;
                default:
                    $.each(this.option.dropData, function (index, cat) {
                        $.each(cat.data, function (index, item) {
                            if (item.code == id) {
                                data = item;
                                exist = true;
                                return false;
                            }
                        });
                        if (exist) {
                            return false;
                        }
                    });
            }
            return data ? $.extend({}, data) : false;
        }, select: function (data, silent) {
            var selectedData = data, prevSelected = [];
            switch (this.catalogFlag) {
                case'visa':
                    if (this.selected && this.selected.code) {
                        this.selected.countryCode = this.selected.code;
                        this.selected.keyword = this.selected.changeValue;
                        prevSelected.code = this.selected.countryCode;
                        prevSelected.name = this.selected.name;
                    }
                    break;
                case'wifi':
                    prevSelected.code = this.selected.id;
                    prevSelected.name = this.selected.name;
                    break;
                case'hotelScenicHot':
                    if (this.selected && this.selected.code) {
                        prevSelected.code = this.selected.poiId;
                        prevSelected.name = this.selected.poiName;
                    }
                    break;
                case'local':
                case'ticket':
                    if (this.selected && this.selected.code) {
                        this.selected.changeValue = this.selected.code;
                        this.selected.keyword = this.selected.changeValue;
                        prevSelected.code = this.selected.changeValue;
                        prevSelected.name = this.selected.keyword;
                    }
                    break;
                default:
                    prevSelected = this.selected;
            }
            if (typeof data !== 'object') {
                selectedData = this.getDataFromDrop(data);
            }
            if (!prevSelected || prevSelected && prevSelected.code !== selectedData.code) {
                this.selected = selectedData;
                this.target.val(selectedData.name).trigger('change');
                !silent && this.option.onChange && this.option.onChange(selectedData);
            }
            this.target.trigger('blur');
            if (this.catalogFlag == 'hotelDomestic') {
                if (selectedData.type === 2 || selectedData.subType === 47) {
                    !silent && this.option.setScene && this.option.setScene(selectedData, 'domestic');
                }
                else {
                    !silent && this.option.setScene && this.option.setScene({id: '', keyword: ''}, 'domestic');
                }
                var _val = selectedData.name;
                if ($('.J_SBkeyWords').length) {
                    $('.J_SBkeyWords').val(_val)
                } else {
                    $('<input type="hidden" class="J_SBkeyWords" value="' + _val + '">').appendTo('body');
                }
            }
            if (this.catalogFlag == 'hotelInternational') {
                !silent && this.option.setScene && this.option.setScene(selectedData, 'foreign');
            }
            if (this.catalogFlag == 'wifi') {
                this.target.attr('data-code', selectedData.code);
            }
        }, unselect: function (silent) {
            if (this.selected) {
                this.selected = null;
                !silent && this.option.onChange && this.option.onChange({});
            }
        }, clear: function () {
            this.unselect(true);
        }, showDrop: function (force) {
            var target, offset, alignType = this.option.dropAlign, dropWrap = this.dropWrap;
            if (this.dropVisible && !force) {
                return;
            }
            if (!this.dropLoaded) {
                this.loadDrop();
            }
            CityPicker.hideAllDrop();
            target = this.target;
            offset = target.offset();
            offset.height = target.outerHeight();
            if (offset) {
                if (alignType == 'right') {
                    this.dropWrap.css({
                        "left": offset.left - (dropWrap.outerWidth() - target.outerWidth()),
                        "top": offset.top + offset.height
                    })
                } else {
                    dropWrap.css({"left": offset.left, "top": offset.top + offset.height});
                }
                dropWrap.show();
                this.dropVisible = true;
            }
            dropWrap = null;
        }, hideDrop: function () {
            this.dropWrap.hide();
            this.dropVisible = false;
        }, hideAc: function () {
            var value = this.target.val();
            var pkgInstance = this.pkgInstance;
            if (value && pkgInstance) {
                if (pkgInstance.suggestions.length && pkgInstance.options.autoSelectFirst && pkgInstance.selectedIndex != -1) {
                    pkgInstance.select(pkgInstance.selectedIndex);
                }
                if (pkgInstance.noSuggestionsFlag || pkgInstance.suggestions.length && pkgInstance.selectedIndex == -1) {
                    this.target.val('').trigger('blur');
                    pkgInstance.currentValue = '';
                }
            }
        }, updateDrop: function () {
            if (this.dropVisible) {
                this.showDrop(true);
            }
        }, initAC: function () {
            var self = this, target = this.target, dataType = 'json', jsonType = '', defaultConfig;
            if (self.catalogFlag && self.catalogFlag == 'hotelDomestic') {
                dataType = 'jsonp';
                jsonType = 'jsoncallback';
            }
            defaultConfig = {
                dataType: dataType,
                paramName: self.option.autoCompleteKey,
                ajaxSettings: {callback: jsonType},
                autoSelectFirst: true,
                showNoSuggestionNotice: true,
                noSuggestionNotice: '暂不支持该目的地',
                width: 'auto',
                transformResult: function (res, originalQuery) {
                    if (self.catalogFlag && self.catalogFlag == 'hotelDomestic') {
                        if (res && res.data) {
                            return {
                                suggestions: $.map(res.data.suggestions, function (suggestion) {
                                    return $.extend({value: suggestion.name}, suggestion);
                                })
                            }
                        } else {
                            return {suggestions: []}
                        }
                    } else if (self.catalogFlag && self.catalogFlag == 'hotelScenicHot') {
                        if (res && res.data) {
                            return {
                                suggestions: $.map(res.data.suggestions, function (suggestion) {
                                    return $.extend({
                                        value: suggestion.cityName,
                                        code: suggestion.cityCode,
                                        name: suggestion.cityName
                                    }, suggestion);
                                })
                            }
                        } else {
                            return {suggestions: []}
                        }
                    } else if (self.option.catFlag == 'bus') {
                        if (res && res.data) {
                            return {
                                suggestions: $.map(res.data.suggestions, function (suggestion) {
                                    return $.extend({
                                        value: suggestion.hanzi,
                                        code: suggestion.hanzi,
                                        name: suggestion.hanzi,
                                        presellDay: suggestion.presellDay
                                    }, suggestion);
                                })
                            }
                        } else {
                            return {suggestions: []}
                        }
                    } else if (self.option.isTrain) {
                        if (res && res.data) {
                            return {
                                suggestions: $.map(res.data.suggestions, function (suggestion) {
                                    return $.extend({value: suggestion.name}, suggestion, {code: suggestion.cityCode});
                                })
                            }
                        }
                    } else if (self.option.autoCompleteKey == 'keyword') {
                        if (res && res.data && $.isArray(res.data)) {
                            return {
                                suggestions: $.map(res.data, function (data) {
                                    return $.extend({value: data.name}, data);
                                })
                            }
                        } else {
                            return {suggestions: []}
                        }
                    } else {
                        if (res && res.data) {
                            return {
                                suggestions: $.map(res.data.suggestions, function (suggestion) {
                                    return $.extend({value: suggestion.name}, suggestion);
                                })
                            }
                        } else {
                            return {suggestions: []}
                        }
                    }
                },
                formatResult: function (suggestion) {
                    return suggestion.value + '';
                },
                onSearchStart: function () {
                    if (self.selected) {
                        return false;
                    } else {
                        self.hideDrop();
                    }
                },
                beforeRender: function () {
                    self.hideDrop();
                },
                onSelect: function (suggestion) {
                    self.select($.extend({code: suggestion.code, title: suggestion.name}, suggestion));
                }
            }
            var pkgauto = this.target.pkgautocomplete($.extend({}, defaultConfig, self.autoCompleteOption));
            this.pkgInstance = pkgauto.data('autocomplete');
        }
    });

    function createPicker(ele, option) {
        var picker = new CityPicker(ele, option);
        pickers.push(picker);
        return picker;
    }

    $.fn.cityPicker = function (option) {
        var arg = Array.prototype.slice.apply(arguments);
        return this.each(function () {
            var picker = this.__picker;
            if (typeof option === 'string') {
                if (picker && $.isFunction(picker[option])) {
                    picker[option].apply(picker, arg.slice(1));
                }
            } else {
                if (!picker) {
                    this.__picker = createPicker($(this), option);
                    ;
                }
            }
        });
    };
    return createPicker;
});
;define('unit/date-picker', ['jquery', 'underscore'], function ($, _) {
    function str2Date(str) {
        if (typeof str === 'string') {
            return new Date(str.replace(/\-/g, '/'));
        } else {
            return str;
        }
    }

    function justifyNum(num, digit) {
        digit = digit || 2;
        num = parseInt(num) + '';
        while (num.length < digit) {
            num = '0' + num;
        }
        return num;
    }

    function date2Str(date) {
        return date.getFullYear() + '-' +
            justifyNum(date.getMonth() + 1) + '-' +
            justifyNum(date.getDate());
    }

    function getDeltaDays(start, end) {
        if (typeof start === 'string') {
            start = str2Date(start);
        }
        if (typeof end === 'string') {
            end = str2Date(end);
        }
        return Math.floor((end - start) / 86400000);
    }

    function getCaleFirst(year, month) {
        var date = new Date(year, month, 1);
        var day = date.getDay();
        if (day !== 0) {
            date.setDate(1 - day);
        } else {
            date.setDate(-6);
        }
        return date2Str(date);
    }

    function getCaleLast(year, month, first) {
        var date = new Date(year, month + 1, 0);
        var day = date.getDay();
        if (day !== 6) {
            date.setDate(date.getDate() + 6 - day);
        }
        if (getDeltaDays(first, date) < 41) {
            date.setDate(date.getDate() + 7);
        }
        return date2Str(date);
    }

    function getMonthFirst(year, month) {
        var date = new Date(year, month, 1);
        return date2Str(date);
    }

    function getMonthLast(year, month) {
        var date = new Date(year, month + 1, 0);
        return date2Str(date);
    }

    var PanelTemplate = '<div class="dp_panel">' + '<div class="dp_btns">' + '<div class="dp_btn dp_prev">&lt;</div>' + '<div class="dp_btn dp_next">&gt;</div>' + '</div>' + '<div class="dp_wrap">' + '</div>' + '</div>';
    var PanelBoxTemplate = '<div class="dp_box">' + '<div class="dp_month">{month}</div>' + '<div class="dp_days">' + '<div class="dp_week">' + '<table>' + '<tr><th class="dp_weekend">日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th class="dp_weekend">六</th></tr>' + '</table>' + '</div>' + '<div class="dp_cale">{cale}</div>' + '</div>' + '</div>';
    var DefaultConfig = {type: 1, year: 2015, month: 6};

    function DatePanel() {
        this.init();
    }

    DatePanel.prototype = {
        init: function () {
            var self = this;
            var wrap = $(PanelTemplate);
            this.hovered = false;
            this.prevBtn = wrap.find('.dp_prev');
            this.nextBtn = wrap.find('.dp_next');
            this.monthTit = wrap.find('.dp_month');
            this.caleWrap = wrap.find('.dp_wrap');
            this.wrap = wrap;
            this.config = {type: 1, year: 2015, month: 6};
            wrap.on('click', '.dp_date', function (e) {
                var onClose = self.get('onClose');
                self.select($(e.currentTarget).data('date'));
                self.hovered = false;
                self.wrap.hide();
                if (onClose) {
                    onClose();
                }
            });
            wrap.on('mousedown', function (e) {
                e.stopPropagation();
                e.preventDefault();
            }).hover(function () {
                self.hovered = true;
            }, function () {
                self.hovered = false;
            });
            this.nextBtn.click(function () {
                self.nextMonth();
            });
            this.prevBtn.click(function () {
                self.prevMonth();
            });
            wrap.appendTo('body');
        }, open: function (config, offset) {
            this.set(config);
            this.render();
            this.show(offset);
        }, show: function (offset) {
            this.wrap.css({left: offset.left, top: offset.top}).show();
        }, close: function () {
            if (!this.hovered) {
                this.wrap.hide();
            }
        }, select: function (date) {
            var dateObj, selectMonth, month, onChange;
            dateObj = str2Date(date);
            selectMonth = dateObj.getMonth();
            month = this.get('month');
            onChange = this.get('onChange');
            this.set('current', date);
            if (onChange && _.isFunction(onChange)) {
                onChange(date);
            }
            if (selectMonth < month || selectMonth > month + this.get('type') - 1) {
                this.goMonth(dateObj.getFullYear(), dateObj.getMonth());
            } else {
                this.updateView();
            }
        }, goMonth: function (year, month) {
            this.set('year', year);
            this.set('month', month);
            this.render();
        }, prevMonth: function () {
            var date = new Date(this.get('year'), this.get('month') - this.get('type'), 1);
            this.goMonth(date.getFullYear(), date.getMonth());
        }, nextMonth: function () {
            var date = new Date(this.get('year'), this.get('month') + this.get('type'), 1);
            this.goMonth(date.getFullYear(), date.getMonth());
        }, set: function (property, value) {
            if (typeof property === 'string' && value !== undefined) {
                this.config[property] = value;
            } else {
                this.config = $.extend({}, DefaultConfig, property);
            }
        }, get: function (property) {
            return this.config[property];
        }, render: function () {
            switch (this.get('type')) {
                case 1:
                    this.renderSingleBox();
                    break;
                default:
                    this.renderMultiBox();
                    break;
            }
        }, getMonthTit: function (year, month) {
            return (year || this.get('year')) + '年' + ((month === undefined ? this.get('month') : month) + 1) + '月';
        }, renderSingleBox: function () {
            var year = this.get('year'), month = this.get('month'), min = getCaleFirst(year, month),
                max = getCaleLast(year, month, min), viewHtml = this.buildSingleView(min, max);
            this.caleWrap.removeClass('dp_multi').html(viewHtml);
        }, buildSingleView: function (min, max) {
            var anchor = str2Date(min), anchorStr = min, minDate = this.get('min'), maxDate = this.get('max'),
                current = this.get('current'), dateList = this.get('dateList'), isRange = dateList ? false : true,
                viewHtml = [], index = 1, boxHtml = PanelBoxTemplate;
            viewHtml.push('<table><tr>');
            while (anchorStr <= max) {
                viewHtml.push('<td class="');
                if (anchorStr === current) {
                    viewHtml.push(' dp_selected');
                }
                viewHtml.push('">');
                if (isRange) {
                    if (anchorStr < minDate || (max && anchorStr > max) || (maxDate && anchorStr > maxDate)) {
                        viewHtml.push('<span class="dp_date_disabled">' + anchor.getDate() + '</span>');
                    } else {
                        viewHtml.push('<a class="dp_date" data-date="' + anchorStr + '" href="javascript:;">' + anchor.getDate() + '</a>');
                    }
                } else {
                    if (anchorStr < minDate || (max && anchorStr > max) || (maxDate && anchorStr > maxDate) || !dateList[anchorStr]) {
                        viewHtml.push('<span class="dp_date_disabled">' + anchor.getDate() + '</span>');
                    } else {
                        viewHtml.push('<a class="dp_date" data-date="' + anchorStr + '" href="javascript:;">' + anchor.getDate() + '</a>');
                    }
                }
                viewHtml.push('</td>');
                anchor.setDate(anchor.getDate() + 1);
                anchorStr = date2Str(anchor);
                if (index % 7 === 0) {
                    viewHtml.push('</tr><tr>');
                }
                index++;
            }
            viewHtml.push('<tr><table>');
            return boxHtml.replace(/\{month\}/, this.getMonthTit()).replace(/\{cale\}/, viewHtml.join(''));
        }, renderMultiBox: function () {
            var amount = this.get('type');
            this.caleWrap.empty();
            for (var i = 0; i < amount; i++) {
                this.caleWrap.append(this.buildMultiSingleView(this.get('year'), this.get('month') + i));
            }
            this.caleWrap.addClass('dp_multi').children().first().addClass('dp_box_l').end().last().addClass('dp_box_r');
        }, buildMultiSingleView: function (year, month) {
            var min = getCaleFirst(year, month), max = getCaleLast(year, month, min),
                firstDate = getMonthFirst(year, month), lastDate = getMonthLast(year, month),
                currentViewFirstDate = str2Date(firstDate), currentViewYear = currentViewFirstDate.getFullYear(),
                currentViewMonth = currentViewFirstDate.getMonth(), current = this.get('current'),
                minDate = this.get('min'), maxDate = this.get('max'), dateList = this.get('dateList'),
                anchor = str2Date(min), anchorStr = min, viewHtml = [], index = 1, boxHtml = PanelBoxTemplate;
            viewHtml.push('<table><tr>');
            while (anchorStr <= max) {
                viewHtml.push('<td');
                if (anchorStr === current) {
                    viewHtml.push(' class="dp_selected"');
                }
                viewHtml.push('>');
                if (anchorStr >= firstDate && anchorStr <= lastDate) {
                    if (anchorStr < minDate || (max && anchorStr > max) || (maxDate && anchorStr > maxDate) || (dateList && !dateList[anchorStr])) {
                        viewHtml.push('<span class="dp_date_disabled">' + anchor.getDate() + '</span>');
                    } else {
                        viewHtml.push('<a class="dp_date" data-date="' + anchorStr + '" href="javascript:;">' + anchor.getDate() + '</a>');
                    }
                } else {
                    viewHtml.push('<span class="dp_date_disabled"></span>');
                }
                viewHtml.push('</td>');
                anchor.setDate(anchor.getDate() + 1);
                anchorStr = date2Str(anchor);
                if (index % 7 === 0) {
                    viewHtml.push('</tr><tr>');
                }
                index++;
            }
            viewHtml.push('</tr></table>');
            return boxHtml.replace(/\{month\}/, this.getMonthTit(currentViewYear, currentViewMonth)).replace(/\{cale\}/, viewHtml.join(''));
        }, updateView: function () {
            this.caleWrap.find('.dp_selected').removeClass('dp_selected').end().find('[data-date=' + this.get('current') + ']').parent().addClass('dp_selected');
        }
    };
    var PickerDefaultConfig = {type: 2};

    function DatePicker(target, config) {
        var now = str2Date(config.current || new Date()), dateList;
        this.config = {};
        this.set($.extend({}, PickerDefaultConfig, config));
        this.__fullDate = date2Str(now);
        this.__year = now.getFullYear();
        this.__month = now.getMonth();
        this.__date = now.getDate();
        if (config.dateList && $.isArray(config.dateList)) {
            dateList = {};
            $.each(config.dateList, function (index, dateItem) {
                dateList[dateItem] = true;
            });
            this.__dateList = dateList;
        }
        this.set('min', config.min || date2Str(new Date()));
        this.set('max', config.max);
        this.__panel = panelFactory();
        this.__target = $(target);
        this.init();
    }

    DatePicker.prototype = {
        init: function () {
            var self = this;
            this.__target.on('focus', function () {
                self.open();
            }).on('blur', function () {
                self.close();
            }).on('change', function () {
                self.__fullDate = this.value;
            }).prop({readonly: true});
        }, focus: function () {
            this.__target.trigger('focus');
        }, open: function () {
            var self = this;
            var offset = this.__target.offset(), onChange = this.get('onChange') || function () {
            }, min = this.get('min'), max = this.get('max');
            offset.top = offset.top + this.__target.outerHeight();
            this.getSelected();
            this.__panel.open({
                type: this.config.type,
                year: this.__year,
                month: this.__month,
                current: this.__fullDate,
                dateList: this.__dateList,
                min: $.isFunction(min) ? min() : min,
                max: $.isFunction(max) ? max() : max,
                onChange: function (date) {
                    self.select(date);
                },
                onClose: this.get('onClose')
            }, offset);
        }, close: function () {
            this.__panel.close();
        }, getSelected: function () {
            var dateStr = this.__target.val() || this.__fullDate, date = str2Date(dateStr);
            this.__fullDate = dateStr;
            this.__year = date.getFullYear();
            this.__month = date.getMonth();
            this.__date = date.getDate();
        }, select: function (dateStr) {
            var date = str2Date(dateStr), onChange = this.get('onChange') || function () {
            };
            if (date !== this.__fullDate) {
                this.__fullDate = dateStr;
                this.__year = date.getFullYear();
                this.__month = date.getMonth();
                this.__date = date.getDate();
                this.__target.val(dateStr).trigger('change');
                onChange(dateStr);
            }
            this.__target.blur();
            this.close();
        }, set: function (property, value) {
            if (typeof property === 'string') {
                if (value) {
                    this.config[property] = value;
                }
            } else {
                this.config = $.extend({}, PickerDefaultConfig, property);
            }
        }, get: function (property) {
            return this.config[property];
        }
    };
    var panelFactory = _.once(function () {
        return new DatePanel;
    });

    function createDatePicker(target, config) {
        return new DatePicker(target, config || {});
    }

    $.fn.datePicker = function () {
        var args = arguments;
        return this.each(function () {
            var picker, config = args[0];
            if (typeof config === 'string') {
                picker = $(this).data('datePicker');
                if (picker && $.isFunction(picker[config])) {
                    picker[config].apply(picker, Array.prototype.slice.call(args, 1));
                }
            } else {
                $(this).data('datePicker', createDatePicker($(this), config));
            }
        });
    };
    return createDatePicker;
});
;define('unit/drop-select', ['jquery'], function ($) {
    var instances = [];
    var defaults = {
        firstOption: false,
        defaultOption: 1,
        dropAlign: 'left',
        className: {
            options: 'diy_journey_options',
            option: 'diy_journey_option',
            optionSelected: 'diy_journey_option_selected',
            expand: 'diy_journey_options_expand'
        }
    };

    function Select(config) {
        this.set(config);
        this.wrap = $(this.get('wrap'));
        this.selected = null;
        this.init();
    }

    Select.hideAll = function () {
        $.each(instances, function (index, select) {
            select.hide();
        });
    };
    $.extend(Select.prototype, {
        init: function () {
            var self = this, wrap = self.wrap, dropWrap, inpEle, options, firstOption,
                className = this.get('className');
            if ((firstOption = this.get('firstOption')) && (options = this.get('options'))) {
                this.set('options', [firstOption].concat(options));
            }
            inpEle = wrap.find('input');
            inpEle.prop({readonly: true}).on('click focus', function (e) {
                self.show();
                e.stopPropagation();
            });
            dropWrap = $('<div />').addClass(className.options);
            dropWrap.on('click', function (e) {
                e.stopPropagation();
            }).on('click', '.' + className.option, function () {
                self.select($(this).data('value'));
                self.hide();
            });
            self.dropWrap = dropWrap;
            dropWrap.hide().appendTo('body');
            this.load();
        }, load: function (options) {
            if (options) {
                if (this.get('firstOption')) {
                    options = [this.get('firstOption')].concat(options);
                }
                this.set('options', options);
            }
            this.buildView();
            this.select(this.getDefault());
        }, getDefault: function () {
            var defaultOption = this.get('defaultOption'), selected;
            if (defaultOption !== undefined) {
                $.each(this.get('options'), function (index, option) {
                    if (option.value == defaultOption) {
                        selected = option;
                        return false;
                    }
                });
            }
            return selected && selected.value;
        }, buildView: function () {
            var viewHtml = '', className = this.get('className');
            $.each(this.get('options'), function (index, option) {
                viewHtml += '<a class="' + className.option + '" data-value="' +
                    option.value + '" href="javascript:;">' +
                    option.name + '</a>';
            });
            this.dropWrap.html(viewHtml);
        }, updateView: function () {
            var selected = this.selected, className = this.get('className');
            this.dropWrap.find('.' + className.option).removeClass(className.optionSelected);
            if (selected) {
                this.dropWrap.filter('[data-value=' + selected.value + ']').addClass(className.optionSelected);
            }
        }, select: function (id, silent) {
            var selected = this.selected, onChange;
            if (selected && selected.value == id) {
                return;
            }
            selected = null;
            $.each(this.get('options'), function (index, option) {
                if (option.value == id) {
                    selected = option;
                    return false;
                }
            });
            if (selected) {
                this.selected = selected;
                this.wrap.find('input').val(selected.name);
                !silent && (onChange = this.get('onChange')) && onChange($.extend({}, selected));
            }
            this.hide();
        }, set: function (property, value) {
            if (typeof property === 'string' && value) {
                this.config[property] = value;
            } else {
                this.config = $.extend({}, defaults, property);
            }
        }, get: function (property) {
            return this.config[property];
        }, show: function () {
            var target, width, offset, self = this, alignType = self.get('dropAlign'), dropWrap = this.dropWrap;
            if (this.dropVisible) {
                return;
            }
            Select.hideAll();
            target = $(self.wrap);
            offset = target.offset();
            width = target.width();
            offset.height = target.outerHeight();
            if (offset) {
                if (alignType == 'right') {
                    self.dropWrap.css({
                        "left": offset.left - (dropWrap.outerWidth() - target.outerWidth()),
                        "top": offset.top + offset.height,
                        'width': width
                    })
                } else {
                    dropWrap.css({"left": offset.left, "top": offset.top + offset.height, 'width': width});
                }
                dropWrap.show();
                self.dropVisible = true;
            }
            dropWrap = null;
            self.wrap.addClass(this.get('className')['expand']);
        }, hide: function () {
            this.dropWrap.hide();
            this.dropVisible = false;
            this.wrap.removeClass(this.get('className')['expand']);
        }, setDate: function (date) {
            this.select(date, true);
        }
    });

    function createSelect(config) {
        var select = new Select(config);
        instances.push(select);
        return select;
    }

    $.fn.dropSelect = function (config) {
        var arg = Array.prototype.slice.apply(arguments);
        return this.each(function () {
            var drop = this.__drop;
            if (typeof config === 'string') {
                if (drop && $.isFunction(drop[config])) {
                    drop[config].apply(drop, arg.slice(1));
                }
            } else {
                if (!drop) {
                    this.__drop = createSelect($.extend({wrap: $(this)}, config));
                }
            }
        });
    };
    $('.tn_catalog,.J_Wifi .J_SearchDepart input').on('click', function () {
        Select.hideAll();
    });
    return createSelect;
});
;define('unit/placeholder', ['jquery'], function ($) {
    var DefaultOption = {placeholderSelector: '.form_placeholder', inputSelector: 'input', hideOnFocus: false};

    function Placeholder(target, option) {
        var options = $.extend({}, DefaultOption, option), ctrlEle = $(target),
            inputEle = ctrlEle.find(options.inputSelector), placeholderEle = ctrlEle.find(options.placeholderSelector);
        this.options = options;
        this.ctrlEle = ctrlEle;
        this.inputEle = inputEle;
        this.placeholderEle = placeholderEle;
        this.init();
    }

    $.extend(Placeholder.prototype, {
        init: function () {
            var self = this, options = this.options, placeholderEle = this.placeholderEle, inputEle = this.inputEle;
            if (options.hideOnFocus) {
                inputEle.on('focus', function () {
                    placeholderEle.hide();
                });
                inputEle.on('blur', $.proxy(self.checkState, self));
            }
            inputEle.on('change input', $.proxy(self.checkState, self)).on('propertychange', function (e) {
                if (e.originalEvent.propertyName === 'value') {
                    self.checkState();
                }
            });
            this.checkState();
        }, checkState: function () {
            if (this.inputEle.val()) {
                this.placeholderEle.hide();
            } else {
                this.placeholderEle.show();
            }
        }, update: function () {
            this.checkState();
        }, destroy: function () {
            this.options = null;
            this.ctrlEle = null;
            this.inputEle = null;
            this.placeholderEle = null;
        }
    });
    $.fn.placeholder = function (option) {
        var arg = Array.prototype.slice.apply(arguments);
        return this.each(function () {
            var pluginObj = this.__placeholder;
            if (typeof option === 'string') {
                if (pluginObj && $.isFunction(pluginObj[option])) {
                    pluginObj[option].apply(pluginObj, arg.slice(1));
                }
            } else {
                if (!pluginObj) {
                    this.__placeholder = new Placeholder(this, option);
                }
            }
        });
    }
});
;define('unit/tool', [], function () {
    function str2Date(str) {
        if (str) {
            switch (typeof str) {
                case'string':
                    return new Date(str.replace(/\-/g, '/'));
                case'number':
                    return new Date(str);
                case'object':
                    return str;
            }
        }
    }

    function justifyNum(num, digit) {
        digit = digit || 2;
        num = parseInt(num) + '';
        while (num.length < digit) {
            num = '0' + num;
        }
        return num;
    }

    function date2Str(date) {
        return date.getFullYear() + '-' +
            justifyNum(date.getMonth() + 1) + '-' +
            justifyNum(date.getDate());
    }

    function getDeltaDate(date, delta) {
        delta = (delta === void(0) ? 1 : delta);
        if (delta === 0) {
            return str2Date(date);
        }
        date = str2Date(date);
        date.setDate(date.getDate() + delta);
        return date;
    }

    function getDeltaDateStr(date, delta) {
        return date2Str(getDeltaDate(date, delta))
    }

    function getDeltaMonth(date, delta) {
        delta = (delta === void(0) ? 1 : delta);
        if (delta === 0) {
            return str2Date(date);
        }
        date = str2Date(date);
        date.setMonth(date.getMonth() + delta);
        return date;
    }

    function getDeltaMonthStr(date, delta) {
        return date2Str(getDeltaMonth(date, delta))
    }

    function getMDDateStr(date) {
        date = (typeof date === 'string' ? str2Date(date) : date);
        return date ? justifyNum(date.getMonth() + 1) + '-' +
            justifyNum(date.getDate()) : undefined;
    }

    function getWeekDay(date, prefix) {
        var weeks = ['日', '一', '二', '三', '四', '五', '六'];
        prefix = prefix || '周';
        if (typeof date === 'string') {
            date = str2Date(date);
        }
        return prefix + weeks[date.getDay()];
    }

    function getDeltaDays(start, end) {
        if (typeof start === 'string') {
            start = str2Date(start);
        }
        if (typeof end === 'string') {
            end = str2Date(end);
        }
        return Math.floor((end - start) / 86400000);
    }

    function compareTime(start, end) {
        var timeReg = /^\s*(\d+)\s*:\s*(\d+)\s*$/, startMatch = timeReg.exec(start), endMatch = timeReg.exec(end);
        if (startMatch && endMatch) {
            return +startMatch[2] + startMatch[1] * 60 - (+endMatch[2] + endMatch[1] * 60);
        }
        return NaN;
    }

    return {
        str2Date: str2Date,
        justifyNum: justifyNum,
        date2Str: date2Str,
        getDeltaDate: getDeltaDate,
        getDeltaDateStr: getDeltaDateStr,
        getMDDateStr: getMDDateStr,
        getWeekDay: getWeekDay,
        getDeltaDays: getDeltaDays,
        getDeltaMonth: getDeltaMonth,
        getDeltaMonthStr: getDeltaMonthStr,
        compareTime: compareTime,
        getZhNumber: function (number) {
            var numberMap = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'], digitMap = ['', '十', '百', '千', '万'],
                numArr, res, i, l, num;
            numArr = String(parseInt(number) || 1).split('').reverse();
            res = '';
            for (i = 0, l = numArr.length; i < l; i++) {
                num = numArr[i];
                if (i === 0) {
                    res = numberMap[num] + res;
                } else if (i === 1) {
                    res = (num == 1 ? '' : numberMap[num]) + digitMap[i] + res;
                } else {
                    res = numberMap[num] + digitMap[i] + res;
                }
            }
            return res;
        }
    };
});
;define('unit/validator', [], function () {
    return {
        checkFlightName: function (str) {
            var nameReg1 = /(^[\u4E00-\u9FA5]+$|^[a-zA-Z\/]+$)/;
            var nameReg2 = /(^[\u4E00-\u9FA5]+$|^[A-Za-z]+\/[A-Za-z]+$)/;
            if (!str) {
                return 2;
            }
            str += '';
            str = str.replace(/(^\s*)/g, "");
            if (str == '') {
                return 2;
            } else if (!nameReg1.test(str)) {
                return 3;
            } else if (!nameReg2.test(str)) {
                return 4;
            } else {
                return 1;
            }
        }, checkFlightNameXC: function (str) {
            if (!str) {
                return 2;
            }
            str = String(str);
            str = str.replace(/(^\s*)/g, "");
            if (str == '') {
                return 2;
            } else {
                var expresssion = /(^[\u4e00-\u9fa5]+\/[\u4e00-\u9fa5]+$|^[a-zA-Z]+\/[a-zA-Z]+)/g;
                if (expression.test(str)) {
                    return 1;
                } else {
                    return 5;
                }
            }
        }, checkName: function (name) {
            if (!name) {
                return 2;
            }
            name += '';
            name = name.replace(/(^\s*)/g, "");
            if (name == '') {
                return 2;
            } else {
                return 1;
            }
        }, checkNameForTicket2: function (name) {
            name = name.replace(/(^\s*)/g, "");
            if (name == '') {
                return 2;
            } else if (/(\u5148\u751f)|(\u5c0f\u59d0)|(\u5973\u58eb)|(\u8001\u5e08)/.test(name)) {
                return 3;
            } else {
                var expression = new RegExp("^[\u4E00-\u9FA5]+$");
                if (expression.test(name)) {
                    return 1;
                } else {
                    return 4;
                }
            }
        }, checkMobile: function (tel) {
            if (tel == '') {
                return 2;
            } else if (new RegExp("^((13[0-9])|(15[0-35-9])|(18[0-9])|145|147|170|177)[0-9]{8,8}$").test(tel) == false) {
                return 3;
            } else {
                return 1;
            }
        }, checkPhone: function (area_code, phone) {
            if (area_code && phone) {
                var reg1 = /^\d{3,4}$/;
                var reg2 = /^\d{7,8}$/;
                var err1 = reg1.test(area_code);
                var err2 = reg2.test(phone);
                if (err1 && err2) {
                    return 1;
                } else if (!err1 && err2) {
                    return 31;
                } else if (err1 && !err2) {
                    return 32;
                } else {
                    return 3;
                }
            } else {
                if (!area_code && phone) {
                    return 21;
                }
                if (area_code && !phone) {
                    return 22;
                }
                return 2;
            }
        }, checkAreaCode: function (area_code) {
            if (area_code != '') {
                var reg1 = /^\d{3,4}$/;
                if (reg1.test(area_code)) {
                    return 1;
                } else {
                    return 3;
                }
            }
            return 2;
        }, checkTelPhone: function (phone) {
            if (phone) {
                var reg2 = /^\d{7,8}$/;
                if (reg2.test(phone)) {
                    return 1;
                } else {
                    return 3;
                }
            }
            return 2;
        }, checkEmail: function (email) {
            if (email) {
                var patrn = /(?=^.{5,255}$)(^([\w\!\#\$\%\&\'\*\+\-\.\/\?\^\_\`\{\|\}\~]+)@([a-zA-Z0-9\-]+\.)+([a-zA-Z0-9\-]+)$)/;
                if (patrn.test(email)) {
                    return 1;
                } else {
                    return 3;
                }
            } else {
                return 2
            }
        }, checkPostcode: function (postcode) {
            var expression = new RegExp("^[0-9]{6}$");
            if (postcode == '') {
                return 2;
            } else {
                if (expression.test(postcode)) {
                    return 1;
                } else {
                    return 3;
                }
            }
        }, checkHKMacao: function (id) {
            var pat;
            if (!id) {
                return 2;
            }
            pat = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
            if (pat.test(id)) {
                return 1;
            } else {
                return 3;
            }
        }, checkTW: function (id) {
            var pat1 = /^[a-zA-Z0-9]{8}$/;
            var pat2 = /^[a-zA-Z0-9]{10}$/;
            if (!id) {
                return 2;
            }
            if (pat1.test(id) || pat2.test(id)) {
                return 1;
            } else {
                return 3;
            }
        }, checkPassport: function (id) {
            var pat1, pat2;
            if (!id) {
                return 2;
            }
            pat1 = /^[a-zA-Z]{5,17}$/;
            pat2 = /^[a-zA-Z0-9]{5,17}$/;
            if (pat1.test(id) || pat2.test(id)) {
                return 1;
            } else {
                return 3;
            }
        }, strlen: function (str) {
            var len = 0;
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 255 || str.charCodeAt(i) < 0) {
                    len += 2;
                } else {
                    len++;
                }
            }
            return len;
        }, checkIdCard: function (idcard) {
            var Y, JYM, JYM_X, ereg, Errors, area, S, M, M_X, idcard_array;
            if (idcard === '') {
                return 2;
            }
            Errors = [1, 3, 3, 3, 3];
            area = {
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙古",
                21: "辽宁",
                22: "吉林",
                23: "黑龙江",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "新疆",
                71: "台湾",
                81: "香港",
                82: "澳门",
                91: "国外"
            }
            idcard_array = idcard.split("");
            if (area[parseInt(idcard.substr(0, 2))] == null) {
                return Errors[4];
            }
            switch (idcard.length) {
                case 15:
                    if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 400 == 0)) {
                        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
                    } else {
                        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
                    }
                    if (ereg.test(idcard)) {
                        return 15;
                    }
                    else {
                        return Errors[2];
                    }
                    break;
                case 18:
                    if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
                    } else {
                        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
                    }
                    if (ereg.test(idcard)) {
                        S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                            + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                            + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                            + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                            + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                            + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                            + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                            + parseInt(idcard_array[7])
                            + parseInt(idcard_array[8]) * 6
                            + parseInt(idcard_array[9]) * 3;
                        Y = S % 11;
                        M = "F";
                        JYM = "10x98765432";
                        JYM_X = "10X98765432";
                        M = JYM.substr(Y, 1);
                        M_X = JYM_X.substr(Y, 1);
                        if (M == idcard_array[17] || M_X == idcard_array[17]) {
                            return 1;
                        }
                        else {
                            return Errors[3];
                        }
                    }
                    else {
                        return Errors[2];
                    }
                    break;
                default:
                    return Errors[1];
                    break;
            }
        }, checkHuiXiangID: function (id) {
            var pat = /^[mMhH]\d{10}$/;
            if (id) {
                if (pat.test(id)) {
                    return 1;
                } else {
                    return 3;
                }
            } else {
                return 2
            }
        }, checkHuKouID: function (id) {
            var pat = /^[a-zA-Z0-9]{2,21}$/;
            if (id) {
                if (pat.test(id)) {
                    return 1;
                } else {
                    return 3;
                }
            } else {
                return 2
            }
        }, checkChuShengID: function (id) {
            var pat = /^\d{8}$/;
            if (id) {
                if (pat.test(id)) {
                    return 1;
                } else {
                    return 3;
                }
            } else {
                return 2
            }
        }, checkJunGuanID: function (id) {
            var pat = /^[a-zA-Z0-9]{2,21}$/;
            if (id) {
                if (pat.test(id)) {
                    return 1;
                } else {
                    return 3;
                }
            } else {
                return 2
            }
        }
    }
});
;(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define('unit/jquery.autocomplete', ['jquery'], factory);
    } else if (typeof exports === 'object' && typeof require === 'function') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function ($) {
    'use strict';
    var
        utils = (function () {
            return {
                escapeRegExChars: function (value) {
                    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                }, createNode: function (containerClass) {
                    var div = document.createElement('div');
                    div.className = containerClass;
                    div.style.position = 'absolute';
                    div.style.display = 'none';
                    return div;
                }
            };
        }()), keys = {ESC: 27, TAB: 9, RETURN: 13, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40};

    function Autocomplete(el, options) {
        var noop = function () {
        }, that = this, defaults = {
            ajaxSettings: {},
            autoSelectFirst: false,
            appendTo: document.body,
            serviceUrl: null,
            lookup: null,
            onSelect: null,
            width: 'auto',
            minChars: 1,
            maxHeight: 300,
            deferRequestBy: 0,
            params: {},
            formatResult: Autocomplete.formatResult,
            delimiter: null,
            zIndex: 9999,
            type: 'GET',
            noCache: false,
            onSearchStart: noop,
            onSearchComplete: noop,
            onSearchError: noop,
            containerClass: 'autocomplete-suggestions',
            tabDisabled: false,
            dataType: 'text',
            currentRequest: null,
            triggerSelectOnValidInput: true,
            preventBadQueries: true,
            lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
                return suggestion.value.toLowerCase().indexOf(queryLowerCase) !== -1;
            },
            paramName: 'query',
            transformResult: function (response) {
                return typeof response === 'string' ? $.parseJSON(response) : response;
            },
            showNoSuggestionNotice: false,
            noSuggestionNotice: 'No results',
            orientation: 'bottom',
            forceFixPosition: false
        };
        that.element = el;
        that.el = $(el);
        that.suggestions = [];
        that.badQueries = [];
        that.selectedIndex = -1;
        that.currentValue = that.element.value;
        that.intervalId = 0;
        that.cachedResponse = {};
        that.onChangeInterval = null;
        that.onChange = null;
        that.isLocal = false;
        that.suggestionsContainer = null;
        that.noSuggestionsContainer = null;
        that.options = $.extend({}, defaults, options);
        that.classes = {selected: 'autocomplete-selected', suggestion: 'autocomplete-suggestion'};
        that.hint = null;
        that.hintValue = '';
        that.selection = null;
        that.initialize();
        that.setOptions(options);
    }

    Autocomplete.utils = utils;
    $.PkgAutocomplete = Autocomplete;
    Autocomplete.formatResult = function (suggestion, currentValue) {
        var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';
        return suggestion.value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
    };
    Autocomplete.prototype = {
        killerFn: null, initialize: function () {
            var that = this, suggestionSelector = '.' + that.classes.suggestion, selected = that.classes.selected,
                options = that.options, container;
            that.element.setAttribute('autocomplete', 'off');
            that.killerFn = function (e) {
                if ($(e.target).closest('.' + that.options.containerClass).length === 0) {
                    that.killSuggestions();
                    that.disableKillerFn();
                }
            };
            that.noSuggestionsContainer = $('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0);
            that.suggestionsContainer = Autocomplete.utils.createNode(options.containerClass);
            container = $(that.suggestionsContainer);
            container.appendTo(options.appendTo);
            if (options.width !== 'auto') {
                container.width(options.width);
            }
            container.on('mouseover.autocomplete', suggestionSelector, function () {
                that.activate($(this).data('index'));
            });
            container.on('mouseout.autocomplete', function () {
                that.selectedIndex = -1;
                container.children('.' + selected).removeClass(selected);
            });
            container.on('click.autocomplete', suggestionSelector, function () {
                that.select($(this).data('index'));
            });
            that.fixPositionCapture = function () {
                if (that.visible) {
                    that.fixPosition();
                }
            };
            $(window).on('resize.autocomplete', that.fixPositionCapture);
            that.el.on('keydown.autocomplete', function (e) {
                that.onKeyPress(e);
            });
            that.el.on('keyup.autocomplete', function (e) {
                that.onKeyUp(e);
            });
            that.el.on('blur.autocomplete', function () {
                that.onBlur();
            });
            that.el.on('focus.autocomplete', function () {
                that.onFocus();
            });
            that.el.on('change.autocomplete', function (e) {
                that.onKeyUp(e);
            });
        }, onFocus: function () {
            var that = this;
            that.fixPosition();
            if (that.options.minChars <= that.el.val().length) {
                that.onValueChange();
            }
        }, onBlur: function () {
            this.enableKillerFn();
        }, setOptions: function (suppliedOptions) {
            var that = this, options = that.options;
            $.extend(options, suppliedOptions);
            that.isLocal = $.isArray(options.lookup);
            if (that.isLocal) {
                options.lookup = that.verifySuggestionsFormat(options.lookup);
            }
            options.orientation = that.validateOrientation(options.orientation, 'bottom');
            $(that.suggestionsContainer).css({
                'max-height': options.maxHeight + 'px',
                'width': options.width + 'px',
                'z-index': options.zIndex
            });
        }, clearCache: function () {
            this.cachedResponse = {};
            this.badQueries = [];
        }, clear: function () {
            this.clearCache();
            this.currentValue = '';
            this.suggestions = [];
        }, disable: function () {
            var that = this;
            that.disabled = true;
            clearInterval(that.onChangeInterval);
            if (that.currentRequest) {
                that.currentRequest.abort();
            }
        }, enable: function () {
            this.disabled = false;
        }, fixPosition: function () {
            var that = this, $container = $(that.suggestionsContainer), containerParent = $container.parent().get(0);
            if (containerParent !== document.body && !that.options.forceFixPosition)
                return;
            var orientation = that.options.orientation, containerHeight = $container.outerHeight(),
                height = that.el.outerHeight(), offset = that.el.offset(),
                styles = {'top': offset.top, 'left': offset.left};
            if (orientation == 'auto') {
                var viewPortHeight = $(window).height(), scrollTop = $(window).scrollTop(),
                    topOverflow = -scrollTop + offset.top - containerHeight,
                    bottomOverflow = scrollTop + viewPortHeight - (offset.top + height + containerHeight);
                orientation = (Math.max(topOverflow, bottomOverflow) === topOverflow) ? 'top' : 'bottom';
            }
            if (orientation === 'top') {
                styles.top += -containerHeight;
            } else {
                styles.top += height;
            }
            if (containerParent !== document.body) {
                var opacity = $container.css('opacity'), parentOffsetDiff;
                if (!that.visible) {
                    $container.css('opacity', 0).show();
                }
                parentOffsetDiff = $container.offsetParent().offset();
                styles.top -= parentOffsetDiff.top;
                styles.left -= parentOffsetDiff.left;
                if (!that.visible) {
                    $container.css('opacity', opacity).hide();
                }
            }
            if (that.options.width === 'auto') {
                styles.width = (that.el.outerWidth() - 2) + 'px';
            }
            $container.css(styles);
        }, enableKillerFn: function () {
            var that = this;
            $(document).on('click.autocomplete', that.killerFn);
        }, disableKillerFn: function () {
            var that = this;
            $(document).off('click.autocomplete', that.killerFn);
        }, killSuggestions: function () {
            var that = this;
            that.stopKillSuggestions();
            that.intervalId = window.setInterval(function () {
                that.hide();
                that.stopKillSuggestions();
            }, 50);
        }, stopKillSuggestions: function () {
            window.clearInterval(this.intervalId);
        }, isCursorAtEnd: function () {
            var that = this, valLength = that.el.val().length, selectionStart = that.element.selectionStart, range;
            if (typeof selectionStart === 'number') {
                return selectionStart === valLength;
            }
            if (document.selection) {
                range = document.selection.createRange();
                range.moveStart('character', -valLength);
                return valLength === range.text.length;
            }
            return true;
        }, onKeyPress: function (e) {
            var that = this;
            if (!that.disabled && !that.visible && e.which === keys.DOWN && that.currentValue) {
                that.suggest();
                return;
            }
            if (that.disabled || !$(that).is(':visible')) {
                return;
            }
            switch (e.which) {
                case keys.ESC:
                    that.el.val(that.currentValue);
                    that.hide();
                    break;
                case keys.RIGHT:
                    if (that.hint && that.options.onHint && that.isCursorAtEnd()) {
                        that.selectHint();
                        break;
                    }
                    return;
                case keys.TAB:
                    if (that.hint && that.options.onHint) {
                        that.selectHint();
                        return;
                    }
                case keys.RETURN:
                    if (that.selectedIndex === -1) {
                        that.hide();
                        return;
                    }
                    that.select(that.selectedIndex);
                    if (e.which === keys.TAB && that.options.tabDisabled === false) {
                        return;
                    }
                    break;
                case keys.UP:
                    that.moveUp();
                    break;
                case keys.DOWN:
                    that.moveDown();
                    break;
                default:
                    return;
            }
            e.stopImmediatePropagation();
            e.preventDefault();
        }, onKeyUp: function (e) {
            var that = this;
            if (that.disabled) {
                return;
            }
            switch (e.which) {
                case keys.UP:
                case keys.DOWN:
                    return;
            }
            clearInterval(that.onChangeInterval);
            if (that.currentValue !== that.el.val()) {
                that.findBestHint();
                if (that.options.deferRequestBy > 0) {
                    that.onChangeInterval = setInterval(function () {
                        that.onValueChange();
                    }, that.options.deferRequestBy);
                } else {
                    that.onValueChange();
                }
            }
        }, onValueChange: function () {
            var that = this, options = that.options, value = $.trim(that.el.val()),
                query = $.trim(that.getQuery(value)), index;
            if (that.selection && that.currentValue !== query) {
                that.selection = null;
                (options.onInvalidateSelection || $.noop).call(that.element);
            }
            clearInterval(that.onChangeInterval);
            that.currentValue = value;
            that.selectedIndex = -1;
            if (options.triggerSelectOnValidInput) {
                index = that.findSuggestionIndex(query);
                if (index !== -1) {
                    that.select(index);
                    return;
                }
            }
            if (query.length < options.minChars) {
                that.hide();
            } else {
                that.getSuggestions(query);
            }
        }, findSuggestionIndex: function (query) {
            var that = this, index = -1, queryLowerCase = query.toLowerCase();
            $.each(that.suggestions, function (i, suggestion) {
                if (suggestion.value.toLowerCase() === queryLowerCase) {
                    index = i;
                    return false;
                }
            });
            return index;
        }, getQuery: function (value) {
            var delimiter = this.options.delimiter, parts;
            if (!delimiter) {
                return value;
            }
            parts = value.split(delimiter);
            return $.trim(parts[parts.length - 1]);
        }, getSuggestionsLocal: function (query) {
            var that = this, options = that.options, queryLowerCase = query.toLowerCase(),
                filter = options.lookupFilter, limit = parseInt(options.lookupLimit, 10), data;
            data = {
                suggestions: $.grep(options.lookup, function (suggestion) {
                    return filter(suggestion, query, queryLowerCase);
                })
            };
            if (limit && data.suggestions.length > limit) {
                data.suggestions = data.suggestions.slice(0, limit);
            }
            return data;
        }, getSuggestions: function (q) {
            var response, that = this, options = that.options, serviceUrl = options.serviceUrl, params, cacheKey,
                ajaxSettings;
            options.params[options.paramName] = q;
            params = options.ignoreParams ? null : options.params;
            if (options.onSearchStart.call(that.element, options.params) === false) {
                return;
            }
            if (that.isLocal) {
                response = that.getSuggestionsLocal(q);
            } else {
                if ($.isFunction(serviceUrl)) {
                    serviceUrl = serviceUrl.call(that.element, q);
                }
                cacheKey = serviceUrl + '?' + $.param(params || {});
                response = that.cachedResponse[cacheKey];
            }
            if (response && $.isArray(response.suggestions)) {
                that.suggestions = response.suggestions;
                that.suggest();
                options.onSearchComplete.call(that.element, q, response.suggestions);
            } else if (!that.isBadQuery(q)) {
                if (that.currentRequest) {
                    that.currentRequest.abort();
                }
                ajaxSettings = {url: serviceUrl, data: params, type: options.type, dataType: options.dataType};
                $.extend(ajaxSettings, options.ajaxSettings);
                that.currentRequest = $.ajax(ajaxSettings).done(function (data) {
                    var result;
                    that.currentRequest = null;
                    result = options.transformResult(data);
                    that.processResponse(result, q, cacheKey);
                    options.onSearchComplete.call(that.element, q, result.suggestions);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    options.onSearchError.call(that.element, q, jqXHR, textStatus, errorThrown);
                });
            } else {
                options.onSearchComplete.call(that.element, q, []);
            }
        }, isBadQuery: function (q) {
            if (!this.options.preventBadQueries) {
                return false;
            }
            var badQueries = this.badQueries, i = badQueries.length;
            while (i--) {
                if (q.indexOf(badQueries[i]) === 0) {
                    return true;
                }
            }
            return false;
        }, hide: function () {
            var that = this;
            var onSelectCallback = this.options.onSelect;
            if (this.currentValue && this.noSuggestionsFlag || this.currentValue && this.suggestions.length && this.selectedIndex == -1) {
                this.el.val('');
                this.currentValue = '';
            }
            that.visible = false;
            that.selectedIndex = -1;
            this.noSuggestionsFlag = false;
            clearInterval(that.onChangeInterval);
            $(that.suggestionsContainer).hide();
            that.signalHint(null);
        }, suggest: function () {
            this.noSuggestionsFlag = false;
            if (this.suggestions.length === 0) {
                this.options.showNoSuggestionNotice ? this.noSuggestions() : this.hide();
                this.noSuggestionsFlag = true;
                return;
            }
            var that = this, options = that.options, groupBy = options.groupBy, formatResult = options.formatResult,
                value = that.getQuery(that.currentValue), className = that.classes.suggestion,
                classSelected = that.classes.selected, container = $(that.suggestionsContainer),
                noSuggestionsContainer = $(that.noSuggestionsContainer), beforeRender = options.beforeRender, html = '',
                category, formatGroup = function (suggestion, index) {
                    var currentCategory = suggestion.data[groupBy];
                    if (category === currentCategory) {
                        return '';
                    }
                    category = currentCategory;
                    return '<div class="autocomplete-group"><strong>' + category + '</strong></div>';
                }, index;
            if (options.triggerSelectOnValidInput) {
                index = that.findSuggestionIndex(value);
                if (index !== -1) {
                    that.select(index);
                    return;
                }
            }
            $.each(that.suggestions, function (i, suggestion) {
                if (groupBy) {
                    html += formatGroup(suggestion, value, i);
                }
                html += '<div class="' + className + '" data-index="' + i + '">' + formatResult(suggestion, value) + '</div>';
            });
            this.adjustContainerWidth();
            noSuggestionsContainer.detach();
            container.html(html);
            if (options.autoSelectFirst) {
                that.selectedIndex = 0;
                container.children().first().addClass(classSelected);
            }
            if ($.isFunction(beforeRender)) {
                beforeRender.call(that.element, container);
            }
            that.fixPosition();
            container.show();
            that.visible = true;
            that.findBestHint();
        }, noSuggestions: function () {
            var that = this, container = $(that.suggestionsContainer),
                noSuggestionsContainer = $(that.noSuggestionsContainer);
            this.adjustContainerWidth();
            noSuggestionsContainer.detach();
            container.empty();
            container.append(noSuggestionsContainer);
            that.fixPosition();
            container.show();
            that.visible = true;
        }, adjustContainerWidth: function () {
            var that = this, options = that.options, width, container = $(that.suggestionsContainer);
            if (options.width === 'auto') {
                width = that.el.outerWidth() - 2;
                container.width(width > 0 ? width : 300);
            }
        }, findBestHint: function () {
            var that = this, value = that.el.val().toLowerCase(), bestMatch = null;
            if (!value) {
                return;
            }
            $.each(that.suggestions, function (i, suggestion) {
                var foundMatch = suggestion.value.toLowerCase().indexOf(value) === 0;
                if (foundMatch) {
                    bestMatch = suggestion;
                }
                return !foundMatch;
            });
            that.signalHint(bestMatch);
        }, signalHint: function (suggestion) {
            var hintValue = '', that = this;
            if (suggestion) {
                hintValue = that.currentValue + suggestion.value.substr(that.currentValue.length);
            }
            if (that.hintValue !== hintValue) {
                that.hintValue = hintValue;
                that.hint = suggestion;
                (this.options.onHint || $.noop)(hintValue);
            }
        }, verifySuggestionsFormat: function (suggestions) {
            if (suggestions.length && typeof suggestions[0] === 'string') {
                return $.map(suggestions, function (value) {
                    return {value: value, data: null};
                });
            }
            return suggestions;
        }, validateOrientation: function (orientation, fallback) {
            orientation = $.trim(orientation || '').toLowerCase();
            if ($.inArray(orientation, ['auto', 'bottom', 'top']) === -1) {
                orientation = fallback;
            }
            return orientation;
        }, processResponse: function (result, originalQuery, cacheKey) {
            var that = this, options = that.options;
            result.suggestions = that.verifySuggestionsFormat(result.suggestions);
            if (!options.noCache) {
                that.cachedResponse[cacheKey] = result;
                if (options.preventBadQueries && result.suggestions.length === 0) {
                    that.badQueries.push(originalQuery);
                }
            }
            if (originalQuery !== that.getQuery(that.currentValue)) {
                return;
            }
            that.suggestions = result.suggestions;
            that.suggest();
        }, activate: function (index) {
            var that = this, activeItem, selected = that.classes.selected, container = $(that.suggestionsContainer),
                children = container.find('.' + that.classes.suggestion);
            container.find('.' + selected).removeClass(selected);
            that.selectedIndex = index;
            if (that.selectedIndex !== -1 && children.length > that.selectedIndex) {
                activeItem = children.get(that.selectedIndex);
                $(activeItem).addClass(selected);
                return activeItem;
            }
            return null;
        }, selectHint: function () {
            var that = this, i = $.inArray(that.hint, that.suggestions);
            that.select(i);
        }, select: function (i) {
            var that = this;
            that.hide();
            that.onSelect(i);
        }, moveUp: function () {
            var that = this;
            if (that.selectedIndex === -1) {
                return;
            }
            if (that.selectedIndex === 0) {
                $(that.suggestionsContainer).children().first().removeClass(that.classes.selected);
                that.selectedIndex = -1;
                that.el.val(that.currentValue);
                that.findBestHint();
                return;
            }
            that.adjustScroll(that.selectedIndex - 1);
        }, moveDown: function () {
            var that = this;
            if (that.selectedIndex === (that.suggestions.length - 1)) {
                return;
            }
            that.adjustScroll(that.selectedIndex + 1);
        }, adjustScroll: function (index) {
            var that = this, activeItem = that.activate(index), offsetTop, upperBound, lowerBound, heightDelta = 25;
            if (!activeItem) {
                return;
            }
            offsetTop = activeItem.offsetTop;
            upperBound = $(that.suggestionsContainer).scrollTop();
            lowerBound = upperBound + that.options.maxHeight - heightDelta;
            if (offsetTop < upperBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop);
            } else if (offsetTop > lowerBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop - that.options.maxHeight + heightDelta);
            }
            that.el.val(that.getValue(that.suggestions[index].value));
            that.signalHint(null);
        }, onSelect: function (index) {
            var that = this, onSelectCallback = that.options.onSelect, suggestion = that.suggestions[index];
            that.currentValue = that.getValue(suggestion.value);
            if (that.currentValue !== that.el.val()) {
                that.el.val(that.currentValue);
            }
            that.signalHint(null);
            that.suggestions = [];
            that.selection = suggestion;
            if ($.isFunction(onSelectCallback)) {
                onSelectCallback.call(that.element, suggestion);
            }
        }, getValue: function (value) {
            var that = this, delimiter = that.options.delimiter, currentValue, parts;
            if (!delimiter) {
                return value;
            }
            currentValue = that.currentValue;
            parts = currentValue.split(delimiter);
            if (parts.length === 1) {
                return value;
            }
            return currentValue.substr(0, currentValue.length - parts[parts.length - 1].length) + value;
        }, dispose: function () {
            var that = this;
            that.el.off('.autocomplete').removeData('autocomplete');
            that.disableKillerFn();
            $(window).off('resize.autocomplete', that.fixPositionCapture);
            $(that.suggestionsContainer).remove();
        }
    };
    $.fn.pkgautocomplete = $.fn.pkgdevbridgeAutocomplete = function (options, args) {
        var dataKey = 'autocomplete';
        if (arguments.length === 0) {
            return this.first().data(dataKey);
        }
        return this.each(function () {
            var inputElement = $(this), instance = inputElement.data(dataKey);
            if (typeof options === 'string') {
                if (instance && typeof instance[options] === 'function') {
                    instance[options](args);
                }
            } else {
                if (instance && instance.dispose) {
                    instance.dispose();
                }
                instance = new Autocomplete(this, options);
                inputElement.data(dataKey, instance);
            }
        });
    };
}));
;define('component/keywords', ['underscore', 'backbone', 'jquery', 'component/component', 'unit/hotel-keywords', 'unit/placeholder'], function (_, Backbone, $, ComponentFactory) {
    var DefaultConfig = {
        placeholderEnable: true,
        placeholder: '目的地',
        labelEnable: false,
        label: '出发城市',
        dropUrl: '',
        postData: '',
        autoCompleteUrl: '',
        defaults: {}
    };
    var ViewHTML = '<div class="search_ctrl search_ctrl_inp search_ctrl_city">' + '<input class="search_ctrl_inp_input" name="" type="text"/>' + '</div>';
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var self = this, selectedData;
                config = this.config = $.extend(true, {}, DefaultConfig, config);
                selectedData = config.defaults;
                if (element && element.length) {
                    this.element = element;
                } else {
                    element = this.element = this.buildView();
                }
                this.data.code = selectedData.code;
                this.data.name = selectedData.name;
                this.$('.search_ctrl_inp_input').hotelPicker({
                    selected: selectedData,
                    dropUrl: config.dropUrl,
                    postData: config.postData,
                    acEnabled: false,
                    onChange: function (data) {
                        self._set({code: data.id, name: data.name, days: data.travelDay});
                    }
                }).val(this.data.name || '');
                if (config.placeholderEnable) {
                    this.element.placeholder({placeholderSelector: '.search_ctrl_inp_placeholder', hideOnFocus: true});
                }
            }, buildView: function () {
                var element = $(ViewHTML.replace(/\{label\}/g, this.config.label));
                if (this.config.placeholderEnable) {
                    element.append('<div class="search_ctrl_inp_placeholder">' + this.config.placeholder + '</div>');
                }
                if (this.config.labelEnable) {
                    element.append('<div class="search_ctrl_inp_label">' + this.config.label + '</div>');
                }
                return element;
            }, set: function (cityCode, cityName) {
                this.__super.set.call(this, {code: cityCode, name: cityName});
                this.$('.search_ctrl_inp_input').val(cityName).trigger('blur');
            }
        });
    }
});
;
;define('unit/hotel-keywords', ['jquery', 'unit/jquery.autocomplete'], function ($, ac) {
    var DataEmpty = false;
    var defaultOption = {dropEnabled: true, dropAlign: 'left', acEnabled: true, postData: '', autoComplete: {}};
    var pickers = [];
    var lowBrowser = $.browser.msie && $.browser.version <= '8.0';
    $(window).resize(function () {
        $.each(pickers, function () {
            this.updateDrop();
        });
    });
    $(document).click(function () {
        HotelPicker.hideAllDrop();
    });
    $('.tn_catalog').click(function () {
        HotelPicker.hideAllDrop();
    });

    function HotelPicker(ele, option) {
        this.target = $(ele);
        this.option = $.extend({}, defaultOption, option);
        this.autoCompleteOption = $.extend({}, this.option.autoComplete);
        if (option.selected) {
            this.selected = $.extend({}, option.selected);
        }
        if (option.postData) {
            this.postData = $.extend({}, option.postData);
        }
        this.init();
    }

    HotelPicker.hideAllDrop = function () {
        $.each(pickers, function () {
            this.hideDrop();
        });
    }
    $.extend(HotelPicker.prototype, {
        init: function () {
            if (this.option.dropEnabled) {
                this.initDrop();
            }
            if (this.option.acEnabled) {
                this.initAC();
            }
        }, initDrop: function () {
            var self = this, target = self.target, isOnDrop = false, dropWrap = $('<div />').addClass('cp_drop');
            dropWrap.on('click', function (e) {
                e.stopPropagation();
            }).on('click', '.cp_city', function () {
                self.select($(this).data('code'));
                self.hideDrop();
            }).on('click', '.cp_tab', function () {
                var index = $(this).index();
                dropWrap.find('.cp_tab').removeClass('cp_tab_current').eq(index).addClass('cp_tab_current');
                dropWrap.find('.cp_box').hide().eq(index).show();
            });
            dropWrap.on('mouseenter', function () {
                isOnDrop = true;
                self.option.onMouseEnter && self.option.onMouseEnter();
            }).on('mouseleave', function () {
                isOnDrop = false;
                self.option.onMouseLeave && self.option.onMouseLeave();
            });
            target.focus(function () {
                $('.cp_drop').hide();
                self.showDrop();
            }).blur(function (e) {
                if (!isOnDrop) {
                    self.hideDrop();
                }
            });
            target.bind('change input propertychange', function (e) {
                if (e.type !== 'change' && e.type !== 'input' && !(e.type === 'propertychange' && e.originalEvent.propertyName === 'value')) {
                    return true;
                }
                if (target.val() === '') {
                    self.showDrop();
                } else {
                    self.hideDrop();
                }
            }).on('keydown', function (e) {
                if (e.keyCode != 9 && e.keyCode != 13) {
                    self.unselect();
                }
            }).click(function (e) {
                e.stopPropagation();
            });
            dropWrap.appendTo('body');
            this.dropWrap = dropWrap;
        }, buildDrop: function (data) {
            var tabHtml = '<ul class="cp_tabs clearfix">', listHtml = '<div class="cp_boxes">', title, self = this;
            data = data.data;
            $.each(data, function (index, cat) {
                tabHtml += '<li class="cp_tab';
                listHtml += '<ul class="cp_box cp_auto clearfix"';
                if (index === 'district') {
                    tabHtml += ' cp_tab_current';
                } else {
                    listHtml += ' style="display: none"';
                }
                switch (index) {
                    case'district':
                        title = '行政区';
                        break;
                    case'commercialDistrict':
                        title = '商圈';
                        break;
                    case'spot':
                        title = '景点';
                        break;
                    case'station':
                        title = '交通枢纽';
                        break;
                }
                tabHtml += '">' + title + '</li>';
                listHtml += '>';
                $.each(cat, function (index, item) {
                    listHtml += '<li title="' + item.name + '">';
                    listHtml += '<a class="cp_city" href="javascript:;" data-code="' + item.id + '">' + item.name + '</a>';
                    listHtml += '</li>';
                });
                listHtml += '</ul>';
            });
            tabHtml += '</ul>';
            listHtml += '</div>';
            $.each(data, function (index, cat) {
                if (cat) {
                    DataEmpty = true;
                    return;
                }
            });
            if (!DataEmpty) {
                listHtml = '<div class="cp_box_none">暂无相关数据！</div>';
                self.dropWrap.mouseleave(function () {
                    self.dropWrap.fadeOut('500');
                });
            } else {
                self.dropWrap.off('mouseleave');
            }
            DataEmpty = false;
            this.dropWrap.html(tabHtml + listHtml);
            this.dropLoaded = false;
        }, loadDrop: function () {
            var self = this, cityData;
            this.postFlag = false;
            if (this.loadingDrop) {
                return;
            }
            if ($('.J_SBkeyWords').length) {
                cityData = {cityName: $('.J_SBkeyWords').val(), limit: 20}
                if (cityData && cityData.cityName !== '') {
                    if (this.option.postData.cityName !== cityData.cityName) {
                        this.postFlag = true;
                        this.option.postData = $.extend({}, this.option.postData, cityData);
                    }
                }
            }
            if (!cityData || cityData.cityName == '') {
                return;
            }
            if (this.option.dropData && !this.postFlag) {
                this.postFlag = false;
                this.buildDrop(this.option.dropData);
            } else {
                this.loadingDrop = true;
                $.ajax({
                    url: this.option.dropUrl,
                    type: 'get',
                    data: this.option.postData,
                    dataType: 'json',
                    success: function (res) {
                        self.loadingDrop = false;
                        if (res) {
                            self.buildDrop(res);
                            self.option.dropData = res;
                        }
                    },
                    error: function () {
                        self.loadingDrop = false;
                    }
                });
            }
        }, getDataFromDrop: function (id) {
            var exist = false, data;
            if (id > 0 && this.option && this.option.dropData && this.option.dropData.data) {
                $.each(this.option.dropData.data, function (index, cat) {
                    $.each(cat, function (index, item) {
                        if (item.id == id) {
                            data = item;
                            exist = true;
                            return false;
                        }
                    });
                    if (exist) {
                        return false;
                    }
                });
            }
            return data ? $.extend({}, data) : false;
        }, getDataFromDropByName: function (name) {
            var exist = false, data;
            if (name && this.option && this.option.dropData && this.option.dropData.data) {
                $.each(this.option.dropData.data, function (index, cat) {
                    $.each(cat, function (index, item) {
                        if (item.name == name) {
                            data = item;
                            exist = true;
                            return false;
                        }
                    });
                    if (exist) {
                        return false;
                    }
                });
            }
            return data ? $.extend({}, data) : false;
        }, getDataFromDropById: function (id, city, code) {
            var exist = false, self = this;
            if (self.cityOri != code) {
                self.cityOri = code;
                var cityData = {cityName: city || '', limit: 20};
                this.option.postData = $.extend({}, this.option.postData, cityData);
                $.ajax({
                    url: this.option.dropUrl,
                    type: 'get',
                    data: this.option.postData,
                    dataType: 'json',
                    success: function (res) {
                        if (res) {
                            self.option.dropData = res;
                            self.getDataFromDropById(id, city, code);
                        }
                    },
                    error: function () {
                    }
                });
            } else {
                if (id && this.option && this.option.dropData && this.option.dropData.data) {
                    $.each(this.option.dropData.data, function (index, cat) {
                        $.each(cat, function (index, item) {
                            if (item.id == id) {
                                exist = true;
                                $(self.target).trigger('finish', item);
                                return false;
                            }
                        });
                        if (exist) {
                            return false;
                        }
                    });
                }
            }
        }, change: function () {
        }, select: function (data, silent) {
            var selectedData = data, prevSelected = this.selected;
            if (typeof data !== 'object') {
                selectedData = this.getDataFromDrop(data);
            }
            if (!prevSelected || prevSelected && prevSelected.id !== selectedData.id) {
                this.selected = selectedData;
                this.target.val(selectedData.name).trigger('change');
                !silent && this.option.onChange && this.option.onChange(selectedData);
            }
            this.target.trigger('blur');
        }, unselect: function (silent) {
            if (this.selected) {
                this.selected = null;
                !silent && this.option.onChange && this.option.onChange({});
            }
        }, clear: function () {
            this.unselect(true);
        }, showDrop: function (force) {
            var target, offset, alignType = this.option.dropAlign, dropWrap = this.dropWrap;
            if (this.dropVisible && !force) {
                return;
            }
            if (!this.dropLoaded) {
                this.loadDrop();
            }
            HotelPicker.hideAllDrop();
            target = this.target;
            offset = target.offset();
            offset.height = target.outerHeight();
            if (offset && $('.J_SBkeyWords').length) {
                if (alignType == 'right') {
                    this.dropWrap.css({
                        "left": offset.left - (dropWrap.outerWidth() - target.outerWidth()),
                        "top": offset.top + offset.height
                    })
                } else {
                    dropWrap.css({"left": offset.left, "top": offset.top + offset.height});
                }
                dropWrap.show();
                this.dropVisible = true;
            }
            dropWrap = null;
        }, hideDrop: function () {
            this.dropWrap.hide();
            this.dropVisible = false;
        }, updateDrop: function () {
            if (this.dropVisible) {
                this.showDrop(true);
            }
        }, initAC: function () {
            var self = this, target = this.target, defaultConfig = {
                dataType: 'json',
                paramName: 'keyword',
                autoSelectFirst: true,
                showNoSuggestionNotice: true,
                noSuggestionNotice: '暂不支持该目的地',
                width: target.outerWidth() || 'auto',
                transformResult: function (res, originalQuery) {
                    if (res && res.success && res.data) {
                        return {
                            suggestions: $.map(res.data, function (suggestion) {
                                return $.extend({value: suggestion.name}, suggestion);
                            })
                        }
                    } else {
                        return {suggestions: []}
                    }
                },
                formatResult: function (suggestion) {
                    return suggestion.value + '';
                },
                onSearchStart: function () {
                    if (self.selected) {
                        return false;
                    } else {
                        self.hideDrop();
                    }
                },
                beforeRender: function () {
                    self.hideDrop();
                },
                onSelect: function (suggestion) {
                    self.select($.extend({code: suggestion.id, title: suggestion.name}, suggestion));
                }
            };
            this.target.pkgautocomplete($.extend({}, defaultConfig, self.autoCompleteOption));
        }
    });

    function createPicker(ele, option) {
        var picker = new HotelPicker(ele, option);
        pickers.push(picker);
        return picker;
    }

    $.fn.hotelPicker = function (option) {
        var arg = Array.prototype.slice.apply(arguments);
        return this.each(function () {
            var picker = this.__picker;
            if (typeof option === 'string') {
                if (picker && $.isFunction(picker[option])) {
                    picker[option].apply(picker, arg.slice(1));
                }
            } else {
                if (!picker) {
                    this.__picker = createPicker($(this), option);
                    ;
                }
            }
        });
    };
    return createPicker;
});
;
/*!
 * JavaScript Cookie v2.0.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define('unit/cookie', [], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        var _OldCookies = window.Cookies;
        var api = window.Cookies = factory(window.jQuery);
        api.noConflict = function () {
            window.Cookies = _OldCookies;
            return api;
        };
    }
}(function () {
    function extend() {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[i];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init(converter) {
        function api(key, value, attributes) {
            var result;
            if (arguments.length > 1) {
                attributes = extend({path: '/'}, api.defaults, attributes);
                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }
                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {
                }
                value = encodeURIComponent(String(value));
                value = value.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);
                return (document.cookie = [key, '=', value, attributes.expires && '; expires=' + attributes.expires.toUTCString(), attributes.path && '; path=' + attributes.path, attributes.domain && '; domain=' + attributes.domain, attributes.secure ? '; secure' : ''].join(''));
            }
            if (!key) {
                result = {};
            }
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;
            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var name = parts[0].replace(rdecode, decodeURIComponent);
                var cookie = parts.slice(1).join('=');
                if (cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }
                try {
                    cookie = converter && converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);
                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {
                        }
                    }
                    if (key === name) {
                        result = cookie;
                        break;
                    }
                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) {
                }
            }
            return result;
        }

        api.get = api.set = api;
        api.getJSON = function () {
            return api.apply({json: true}, [].slice.call(arguments));
        };
        api.defaults = {};
        api.remove = function (key, attributes) {
            api(key, '', extend(attributes, {expires: -1}));
        };
        api.withConverter = init;
        return api;
    }

    return init();
}));
;define('component/hotel-city', ['underscore', 'jquery', 'component/component', 'unit/hotel-city-picker', 'unit/placeholder'], function (_, $, ComponentFactory, HotelCityPicker) {
    var DefaultConfig = {
        placeholderEnable: true,
        placeholder: '目的地',
        labelEnable: false,
        acEnabled: true,
        acError: false,
        label: '出发城市',
        dropUrl: '',
        autoCompleteUrl: '',
        defaults: {},
        propertyConfig: {cityCode: {optional: true}, cityType: {optional: true},},
        beforeRenderDrop: '',
        noSuggestionNotice: '暂不支持该目的地',
        init: ''
    };
    var ViewHTML = '<div class="search_ctrl search_ctrl_inp search_ctrl_city">' + '<input class="search_ctrl_inp_input" name="" type="text"/>' + '</div>';
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var self = this, selectedData;
                config = this.config = $.extend(true, {}, DefaultConfig, config);
                selectedData = config.defaults;
                if (element && element.length) {
                    this.element = element;
                } else {
                    element = this.element = this.buildView();
                }
                $.extend(this.data, {cityCode: selectedData.cityCode, cityName: selectedData.cityName,});
                if (typeof selectedData.cityType !== "undefined") {
                    $.extend(this.data, {cityType: selectedData.cityType,});
                }
                this.$('.search_ctrl_inp_input').hotelCityPicker({
                    selected: selectedData,
                    dropUrl: config.dropUrl,
                    acEnabled: config.acEnabled,
                    acError: config.acError,
                    catFlag: config.catFlag,
                    autoCompleteKey: config.autoCompleteKey,
                    autoComplete: {serviceUrl: config.autoCompleteUrl, noSuggestionNotice: config.noSuggestionNotice},
                    beforeRenderDrop: config.beforeRenderDrop,
                    directOpenBaseUrl: config.directOpenBaseUrl,
                    wrapper: config.wrapper,
                    onChange: function (data) {
                        if ($('.J_SBkeyWords').length) {
                            $('.J_SBkeyWords').remove();
                        }
                        config.wrapper.find('.J_SearchKeyWord').find('input').val('');
                        self._set({cityCode: data.cityCode, cityName: data.cityName,});
                        if (typeof data.cityType !== "undefined") {
                            self._set({cityType: data.cityType,});
                        }
                        if (typeof config.onChange === "function") {
                            config.onChange(data, self.getElement());
                        }
                    },
                    setScene: function (data, type) {
                        self.trigger("cityChanged", data);
                    }
                }).val(this.data.cityName || '');
                if (config.placeholderEnable) {
                    this.element.placeholder({placeholderSelector: '.search_ctrl_inp_placeholder', hideOnFocus: true});
                }
                if (typeof config.init === "function") {
                    config.init.call(self);
                }
            }, buildView: function () {
                var element = $(ViewHTML.replace(/\{label\}/g, this.config.label));
                if (this.config.placeholderEnable) {
                    element.append('<div class="search_ctrl_inp_placeholder">' + this.config.placeholder + '</div>');
                }
                if (this.config.labelEnable) {
                    element.append('<div class="search_ctrl_inp_label">' + this.config.label + '</div>');
                }
                return element;
            }, getElement: function () {
                return this.$('.search_ctrl_inp_input');
            }, set: function (data) {
                this.__super.set.call(this, data);
                this.$('.search_ctrl_inp_input').val(data.cityName).trigger('blur');
            }
        });
    }
});
;
;define('unit/hotel-city-picker', ['jquery', 'unit/jquery.autocomplete_hotel'], function ($, ac) {
    function cleanParams(s) {
        return s.replace("'", "").replace('"', '').replace("<", "").replace(">", "").replace("/", "").replace(";", "").replace("@", "").replace("%", "").replace("*", "").replace("&", "");
    }

    function cleanCityName(c) {
        var pattern = new RegExp("^[\u4E00-\u9FA5]+$");
        var cs = c.split('');
        var rt = [];
        for (var i in cs) {
            if (pattern.test(cs[i])) {
                rt.push(cs[i]);
            }
        }
        return rt.join('');
    }

    function stopPropagation(e) {
        e = e || window.event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }

    function GetDateStr(pdate) {
        var dd = pdate;
        var y = dd.getYear();
        y = y % 100;
        y = ((y < 50) ? (2000 + y) : (1900 + y));
        var m = dd.getMonth() + 1;
        var d = dd.getDate();
        return y + "-" + m + "-" + d;
    }

    var defaultOption = {
        dropEnabled: true,
        dropAlign: 'left',
        acEnabled: true,
        acError: false,
        isTrain: false,
        catFlag: '',
        autoComplete: {},
        autoCompleteKey: 'query',
        beforeRenderDrop: ''
    };
    var pickers = [];
    var lowBrowser = $.browser.msie && $.browser.version <= '8.0';
    $(window).resize(function () {
        $.each(pickers, function () {
            this.updateDrop();
        });
    });
    $(document).click(function () {
        HotelCityPicker.hideAllDropAndAC();
    });
    $('.tn_catalog').click(function () {
        HotelCityPicker.hideAllDropAndAC();
    });

    function HotelCityPicker(ele, option) {
        this.target = $(ele);
        this.option = $.extend({}, defaultOption, option);
        this.autoCompleteOption = $.extend({}, this.option.autoComplete);
        if (option.selected) {
            this.selected = $.extend({}, option.selected);
        }
        this.init();
    }

    HotelCityPicker.hideAllDropAndAC = function () {
        $.each(pickers, function () {
            this.hideDrop();
            this.hideAC();
        });
    }
    $.extend(HotelCityPicker.prototype, {
        buildDrop: function (data) {
            var self = this;
            var tabHtml = '<ul class="cp_tabs clearfix">', listHtml = '<div class="cp_boxes">';
            $.each(data, function (index, cat) {
                tabHtml += '<li class="cp_tab';
                listHtml += '<ul class="cp_box clearfix"';
                if (index === 0) {
                    tabHtml += ' cp_tab_current';
                } else {
                    listHtml += ' style="display: none"';
                }
                tabHtml += '">' + cat.title + '</li>';
                listHtml += '>';
                $.each(cat.data, function (index, item) {
                    listHtml += '<li title="' + item.name + '">';
                    listHtml += '<a class="cp_city" href="javascript:;" data-code="' + item.code + '">' + item.name + '</a>';
                    listHtml += '</li>';
                });
                listHtml += '</ul>';
            });
            tabHtml += '</ul>';
            listHtml += '</div>';
            this.dropWrap.html('<div class="cp_tit">支持中文/拼音输入</div>' + tabHtml + listHtml);
            this.dropLoaded = true;
        }, init: function () {
            if (this.option.dropEnabled) {
                this.initDrop();
            }
            if (this.option.acEnabled) {
                this.initAC();
            }
        }, initDrop: function () {
            var self = this, target = self.target, isOnDrop = false, dropWrap = $('<div />').addClass('cp_drop');
            dropWrap.on('click', function (e) {
                e.stopPropagation();
            }).on('click', '.cp_city', function () {
                self.select($(this).data('code'));
                self.hideDrop();
            }).on('click', '.cp_tab', function () {
                var index = $(this).index();
                dropWrap.find('.cp_tab').removeClass('cp_tab_current').eq(index).addClass('cp_tab_current');
                dropWrap.find('.cp_box').hide().eq(index).show();
            });
            dropWrap.on('mouseenter', function () {
                isOnDrop = true;
                self.option.onMouseEnter && self.option.onMouseEnter();
            }).on('mouseleave', function () {
                isOnDrop = false;
                self.option.onMouseLeave && self.option.onMouseLeave();
            });
            target.focus(function () {
                if (!target.val().length) {
                    $('.cp_drop').hide();
                    self.showDrop();
                }
            }).blur(function (e) {
                if (!isOnDrop) {
                    self.hideDrop();
                }
            });
            target.bind('change input propertychange', function (e) {
                if (e.type !== 'change' && e.type !== 'input' && !(e.type === 'propertychange' && e.originalEvent.propertyName === 'value')) {
                    return true;
                }
                if (target.val() === '') {
                    self.showDrop();
                } else {
                    self.hideDrop();
                }
            }).on('keydown', function (e) {
                if (e.keyCode != 9 && e.keyCode != 13) {
                    self.unselect();
                }
                if (self.option.acError && $(this).parents('div.J_SearchDepart').hasClass('search_ctrl_error')) {
                    $(this).parents('div.J_SearchDepart').removeClass('search_ctrl_error');
                }
            }).click(function (e) {
                e.stopPropagation();
            });
            dropWrap.appendTo('body');
            this.dropWrap = dropWrap;
        }, loadDrop: function () {
            var self = this;
            if (this.loadingDrop) {
                return;
            }
            if (this.option.dropData) {
                this.buildDrop(this.option.dropData);
            } else {
                this.loadingDrop = true;
                $.ajax({
                    url: this.option.dropUrl, dataType: 'jsonp', callback: 'jsoncallback', success: function (res) {
                        var data;
                        self.loadingDrop = false;
                        if (typeof self.option.beforeRenderDrop === "function") {
                            res = self.option.beforeRenderDrop(res) || res;
                        }
                        if (res && res.success) {
                            data = res.data;
                            self.catalogFlag = res.flag;
                            self.buildDrop(data);
                            self.option.dropData = data;
                        }
                    }, error: function () {
                        self.loadingDrop = false;
                    }
                });
            }
        }, getDataFromDrop: function (id) {
            var self = this, exist = false, data;
            $.each(this.option.dropData, function (index, cat) {
                $.each(cat.data, function (index, item) {
                    if (item.code == id) {
                        data = {cityName: item.name, cityCode: item.code};
                        if (typeof item.cityType !== "undefined") {
                            data.cityType = item.cityType;
                        }
                        exist = true;
                        return false;
                    }
                });
                if (exist) {
                    return false;
                }
            });
            return data ? $.extend({}, data) : false;
        }, select: function (data, silent) {
            var selectedData = data, prevSelected = [];
            prevSelected = this.selected;
            if (typeof data !== 'object') {
                selectedData = this.getDataFromDrop(data);
            }
            if (!prevSelected || prevSelected && prevSelected.cityCode !== selectedData.cityCode) {
                this.selected = selectedData;
                this.target.val(selectedData.cityName).trigger('change');
                !silent && this.option.onChange && this.option.onChange(selectedData);
            }
            this.target.trigger('blur');
            this.option.setScene && this.option.setScene(selectedData, 'domestic');
            var _val = selectedData.cityName;
            if ($('.J_SBkeyWords').length) {
                $('.J_SBkeyWords').val(_val);
            } else {
                $('<input type="hidden" class="J_SBkeyWords" value="' + _val + '">').appendTo('body');
            }
        }, unselect: function (silent) {
            if (this.selected) {
                this.selected = null;
                !silent && this.option.onChange && this.option.onChange({});
            }
        }, clear: function () {
            this.unselect(true);
        }, showDrop: function (force) {
            var target, offset, alignType = this.option.dropAlign, dropWrap = this.dropWrap;
            if (this.dropVisible && !force) {
                return;
            }
            if (!this.dropLoaded) {
                this.loadDrop();
            }
            HotelCityPicker.hideAllDropAndAC();
            target = this.target;
            offset = target.offset();
            offset.height = target.outerHeight();
            if (offset) {
                if (alignType == 'right') {
                    this.dropWrap.css({
                        "left": offset.left - (dropWrap.outerWidth() - target.outerWidth()),
                        "top": offset.top + offset.height
                    })
                } else {
                    dropWrap.css({"left": offset.left, "top": offset.top + offset.height});
                }
                dropWrap.show();
                this.dropVisible = true;
            }
            dropWrap = null;
        }, hideDrop: function () {
            this.dropWrap.hide();
            this.dropVisible = false;
        }, updateDrop: function () {
            if (this.dropVisible) {
                this.showDrop(true);
            }
        }, initAC: function () {
            var self = this;
            self.wrapper = self.option.wrapper;
            self.beginDate = self.wrapper.find('.J_SearchStart input');
            self.endDate = self.wrapper.find('.J_SearchEnd input');
            self.keywordInput = self.wrapper.find('.J_SearchKeyWord input');
            var autocomplete_options = {
                channel: 'hotelSuggest', serviceUrl: self.autoCompleteOption.serviceUrl, onSelect: function (s) {
                    self.target.val(s.cityName).removeClass('search_ctrl_error');
                    self.select(s);
                    self.keywordInput.val('').addClass('search_ctrl_error');
                    var date1 = self.beginDate.val();
                    var date2 = self.endDate.val();
                    if (s.catalog == 3 || s.poiType == 7) {
                        var _url = self.option.directOpenBaseUrl + s.code;
                        if (date1 && date2) {
                            _url += '?checkindate=' + date1 + '&checkoutdate=' + date2;
                        }
                        window.open(encodeURI(_url));
                        self.target.val("").removeClass('search_ctrl_error');
                        return;
                    } else if ((s.catalog && s.catalog != 1) || (s.poiType && s.poiType > 1)) {
                        self.keywordInput.val(s.name).removeClass('search_ctrl_error');
                    }
                }, selectFirst: true, isOuter: true, onePageNum: 12, maxHeight: 500
            };
            self.autoObj = self.target.autocompleteHotel($.extend({}, autocomplete_options, self.autoCompleteOption));
            self.target.keydown(function () {
                self.hideDrop();
            });
            self.autoObj.container.on('click', function (e) {
                stopPropagation(e);
            });
        }, hideAC: function () {
            if (this.target.val().length && this.autoObj.selectedIndex === 0) {
                if (this.autoObj.currentsuggestions && this.autoObj.currentsuggestions[0] && this.autoObj.currentsuggestions[0].catalog == 3) {
                    this.autoObj.selectedIndex = -1;
                }
                this.autoObj.hide();
            }
        }
    });

    function createPicker(ele, option) {
        var picker = new HotelCityPicker(ele, option);
        pickers.push(picker);
        return picker;
    }

    $.fn.hotelCityPicker = function (option) {
        var arg = Array.prototype.slice.apply(arguments);
        return this.each(function () {
            var picker = this.__picker;
            if (typeof option === 'string') {
                if (picker && $.isFunction(picker[option])) {
                    picker[option].apply(picker, arg.slice(1));
                }
            } else {
                if (!picker) {
                    this.__picker = createPicker($(this), option);
                    ;
                }
            }
        });
    };
    return createPicker;
});
;define('component/hotel-keyword', ['underscore', 'backbone', 'jquery', 'component/component', 'unit/hotel-keyword-picker', 'unit/placeholder'], function (_, Backbone, $, ComponentFactory) {
    var DefaultConfig = {
        placeholderEnable: true,
        placeholder: '目的地',
        labelEnable: false,
        label: '出发城市',
        dropUrl: '',
        postData: '',
        autoCompleteUrl: '',
        defaults: {},
        propertyConfig: {
            code: {optional: true},
            id: {optional: true},
            cityName: {optional: true},
            cityCode: {optional: true},
            cityType: {optional: true},
            name: {optional: true},
            poiType: {optional: true},
            latitude: {optional: true},
            longitude: {optional: true}
        }
    };
    var ViewHTML = '<div class="search_ctrl search_ctrl_inp search_ctrl_city">' + '<input class="search_ctrl_inp_input" name="" type="text"/>' + '</div>';
    return function (element, config) {
        return ComponentFactory({
            init: function () {
                var self = this, selectedData;
                config = this.config = $.extend(true, {}, DefaultConfig, config);
                selectedData = config.defaults;
                if (element && element.length) {
                    this.element = element;
                } else {
                    element = this.element = this.buildView();
                }
                if (typeof selectedData.cityType !== "undefined") {
                    $.extend(this.data, {
                        cityName: data.cityName,
                        code: data.code,
                        poiType: data.poiType,
                        name: data.name,
                        latitude: data.latitude,
                        longitude: data.longitude
                    });
                } else {
                    $.extend(this.data, {code: selectedData.code, name: selectedData.name, id: selectedData.id});
                }
                this.$('.search_ctrl_inp_input').hotelKeywordPicker({
                    selected: selectedData,
                    dropUrl: config.dropUrl,
                    postData: config.postData,
                    dropEnabled: config.dropEnabled,
                    acEnabled: true,
                    autoCompleteKey: config.autoCompleteKey,
                    autoComplete: {serviceUrl: config.autoCompleteUrl, noSuggestionNotice: config.noSuggestionNotice},
                    directOpenBaseUrl: config.directOpenBaseUrl,
                    wrapper: config.wrapper,
                    onChange: function (data) {
                        if (typeof data.cityType !== "undefined") {
                            self._set({
                                cityName: data.cityName,
                                code: data.code,
                                poiType: data.poiType,
                                name: data.name,
                                latitude: data.latitude,
                                longitude: data.longitude
                            });
                        } else {
                            self._set({code: data.code, name: data.name, id: data.id});
                        }
                    },
                    resetCity: function (data, type) {
                        self.trigger("belongCityChanged", data);
                    }
                }).val(this.data.name || '');
                if (config.placeholderEnable) {
                    this.element.placeholder({placeholderSelector: '.search_ctrl_inp_placeholder', hideOnFocus: true});
                }
            }, buildView: function () {
                var element = $(ViewHTML.replace(/\{label\}/g, this.config.label));
                if (this.config.placeholderEnable) {
                    element.append('<div class="search_ctrl_inp_placeholder">' + this.config.placeholder + '</div>');
                }
                if (this.config.labelEnable) {
                    element.append('<div class="search_ctrl_inp_label">' + this.config.label + '</div>');
                }
                return element;
            }, set: function (data) {
                this.__super.set.call(this, data);
                this.$('.search_ctrl_inp_input').val(data.name).trigger('blur');
            }
        });
    }
});
;
;define('unit/hotel-keyword-picker', ['jquery', 'unit/jquery.autocomplete_hotel'], function ($, ac) {
    function stopPropagation(e) {
        e = e || window.event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }

    var DataEmpty = false;
    var defaultOption = {dropEnabled: true, dropAlign: 'left', acEnabled: true, postData: '', autoComplete: {}};
    var pickers = [];
    var lowBrowser = $.browser.msie && $.browser.version <= '8.0';
    $(window).resize(function () {
        $.each(pickers, function () {
            this.updateDrop();
        });
    });
    $(document).click(function () {
        HotelKeywordPicker.hideAllDrop();
    });
    $('.tn_catalog').click(function () {
        HotelKeywordPicker.hideAllDrop();
    });
    $('.J_SearchDepart input').focus(function () {
        HotelKeywordPicker.hideAllDrop();
    });

    function HotelKeywordPicker(ele, option) {
        this.target = $(ele);
        this.option = $.extend({}, defaultOption, option);
        this.autoCompleteOption = $.extend({}, this.option.autoComplete);
        if (option.selected) {
            this.selected = $.extend({}, option.selected);
        }
        if (option.postData) {
            this.postData = $.extend({}, option.postData);
        }
        this.init();
    }

    HotelKeywordPicker.hideAllDrop = function () {
        $.each(pickers, function () {
            this.hideDrop();
        });
    }
    $.extend(HotelKeywordPicker.prototype, {
        init: function () {
            if (this.option.dropEnabled) {
                this.initDrop();
            }
            if (this.option.acEnabled) {
                this.initAC();
            }
        }, initDrop: function () {
            var self = this, target = self.target, isOnDrop = false, dropWrap = $('<div />').addClass('cp_drop');
            dropWrap.on('click', function (e) {
                e.stopPropagation();
            }).on('click', '.cp_city', function () {
                self.select($(this).data('code'));
                self.hideDrop();
            }).on('click', '.cp_tab', function () {
                var index = $(this).index();
                dropWrap.find('.cp_tab').removeClass('cp_tab_current').eq(index).addClass('cp_tab_current');
                dropWrap.find('.cp_box').hide().eq(index).show();
            });
            dropWrap.on('mouseenter', function () {
                isOnDrop = true;
                self.option.onMouseEnter && self.option.onMouseEnter();
            }).on('mouseleave', function () {
                isOnDrop = false;
                self.option.onMouseLeave && self.option.onMouseLeave();
            });
            target.focus(function () {
                $('.cp_drop').hide();
                self.showDrop();
            }).blur(function (e) {
                if (!isOnDrop) {
                    self.hideDrop();
                }
            });
            target.bind('change input propertychange', function (e) {
                if (e.type !== 'change' && e.type !== 'input' && !(e.type === 'propertychange' && e.originalEvent.propertyName === 'value')) {
                    return true;
                }
                if (target.val() === '') {
                    self.showDrop();
                } else {
                    self.hideDrop();
                }
            }).on('keydown', function (e) {
                if (e.keyCode != 9 && e.keyCode != 13) {
                    self.unselect();
                }
            }).click(function (e) {
                e.stopPropagation();
            });
            dropWrap.appendTo('body');
            this.dropWrap = dropWrap;
        }, buildDrop: function (data) {
            var tabHtml = '<ul class="cp_tabs clearfix">', listHtml = '<div class="cp_boxes">', title, self = this;
            data = data.data;
            $.each(data, function (index, cat) {
                tabHtml += '<li class="cp_tab';
                listHtml += '<ul class="cp_box cp_auto clearfix"';
                if (index === 'district') {
                    tabHtml += ' cp_tab_current';
                } else {
                    listHtml += ' style="display: none"';
                }
                switch (index) {
                    case'district':
                        title = '行政区';
                        break;
                    case'commercialDistrict':
                        title = '商圈';
                        break;
                    case'spot':
                        title = '景点';
                        break;
                    case'station':
                        title = '交通枢纽';
                        break;
                }
                tabHtml += '">' + title + '</li>';
                listHtml += '>';
                $.each(cat, function (index, item) {
                    listHtml += '<li title="' + item.name + '">';
                    listHtml += '<a class="cp_city" href="javascript:;" data-code="' + item.id + '">' + item.name + '</a>';
                    listHtml += '</li>';
                });
                listHtml += '</ul>';
            });
            tabHtml += '</ul>';
            listHtml += '</div>';
            $.each(data, function (index, cat) {
                if (cat) {
                    DataEmpty = true;
                    return;
                }
            });
            if (!DataEmpty) {
                listHtml = '<div class="cp_box_none">暂无相关数据！</div>';
                self.dropWrap.mouseleave(function () {
                    self.dropWrap.fadeOut('500');
                });
            } else {
                self.dropWrap.off('mouseleave');
            }
            DataEmpty = false;
            this.dropWrap.html(tabHtml + listHtml);
            this.dropLoaded = false;
        }, loadDrop: function () {
            var self = this, cityData;
            this.postFlag = false;
            if (this.loadingDrop) {
                return;
            }
            if ($('.J_SBkeyWords').length) {
                cityData = {cityName: $('.J_SBkeyWords').val()};
                if (cityData && cityData.cityName !== '') {
                    if (this.option.postData.cityName !== cityData.cityName) {
                        this.postFlag = true;
                        this.option.postData = $.extend({}, this.option.postData, cityData);
                    }
                }
            }
            if (!cityData || cityData.cityName == '') {
                return;
            }
            if (this.option.dropData && !this.postFlag) {
                this.postFlag = false;
                this.buildDrop(this.option.dropData);
            } else {
                this.loadingDrop = true;
                $.ajax({
                    url: this.option.dropUrl,
                    type: 'get',
                    data: this.option.postData,
                    dataType: 'json',
                    success: function (res) {
                        self.loadingDrop = false;
                        if (res) {
                            self.buildDrop(res);
                            self.option.dropData = res;
                        }
                    },
                    error: function () {
                        self.loadingDrop = false;
                    }
                });
            }
        }, getDataFromDrop: function (id) {
            var exist = false, data;
            if (id > 0 && this.option && this.option.dropData && this.option.dropData.data) {
                $.each(this.option.dropData.data, function (index, cat) {
                    $.each(cat, function (index, item) {
                        if (item.id == id) {
                            data = item;
                            data.code = id;
                            exist = true;
                            return false;
                        }
                    });
                    if (exist) {
                        return false;
                    }
                });
            }
            return data ? $.extend({}, data) : false;
        }, getDataFromDropByName: function (name) {
            var exist = false, data;
            if (name && this.option && this.option.dropData && this.option.dropData.data) {
                $.each(this.option.dropData.data, function (index, cat) {
                    $.each(cat, function (index, item) {
                        if (item.name == name) {
                            data = item;
                            exist = true;
                            return false;
                        }
                    });
                    if (exist) {
                        return false;
                    }
                });
            }
            return data ? $.extend({}, data) : false;
        }, getDataFromDropById: function (id, city, code) {
            var exist = false, self = this;
            if (self.cityOri != code) {
                self.cityOri = code;
                var cityData = {cityName: city || ''};
                this.option.postData = $.extend({}, this.option.postData, cityData);
                $.ajax({
                    url: this.option.dropUrl,
                    type: 'get',
                    data: this.option.postData,
                    dataType: 'json',
                    success: function (res) {
                        if (res) {
                            self.option.dropData = res;
                            self.getDataFromDropByName(id, city, code);
                        }
                    },
                    error: function () {
                    }
                });
            } else {
                if (id && this.option && this.option.dropData && this.option.dropData.data) {
                    $.each(this.option.dropData.data, function (index, cat) {
                        $.each(cat, function (index, item) {
                            if (item.id == id) {
                                exist = true;
                                $(self.target).trigger('finish', item);
                                return false;
                            }
                        });
                        if (exist) {
                            return false;
                        }
                    });
                }
            }
        }, change: function () {
        }, select: function (data, silent) {
            var selectedData = data, prevSelected = this.selected;
            if (typeof data !== 'object') {
                selectedData = this.getDataFromDrop(data);
            }
            if (!prevSelected || prevSelected && (prevSelected.id !== selectedData.id || prevSelected.code !== selectedData.code)) {
                this.selected = selectedData;
                this.target.val(selectedData.name).trigger('change');
                !silent && this.option.onChange && this.option.onChange(selectedData);
            }
            this.target.trigger('blur');
        }, unselect: function (silent) {
            if (this.selected) {
                this.selected = null;
                !silent && this.option.onChange && this.option.onChange({});
            }
        }, clear: function () {
            this.unselect(true);
        }, showDrop: function (force) {
            var target, offset, alignType = this.option.dropAlign, dropWrap = this.dropWrap;
            if (this.dropVisible && !force) {
                return;
            }
            if (!this.dropLoaded) {
                this.loadDrop();
            }
            HotelKeywordPicker.hideAllDrop();
            target = this.target;
            offset = target.offset();
            offset.height = target.outerHeight();
            if (offset && $('.J_SBkeyWords').length) {
                if (alignType == 'right') {
                    this.dropWrap.css({
                        "left": offset.left - (dropWrap.outerWidth() - target.outerWidth()),
                        "top": offset.top + offset.height
                    })
                } else {
                    dropWrap.css({"left": offset.left, "top": offset.top + offset.height});
                }
                dropWrap.show();
                this.dropVisible = true;
            }
            dropWrap = null;
        }, hideDrop: function () {
            this.dropWrap && this.dropWrap.hide();
            this.dropVisible = false;
        }, updateDrop: function () {
            if (this.dropVisible) {
                this.showDrop(true);
            }
        }, initAC: function () {
            var self = this;
            self.wrapper = self.option.wrapper;
            self.cityInput = self.wrapper.find('.J_SearchDepart input');
            self.beginDate = self.wrapper.find('.J_SearchStart input');
            self.endDate = self.wrapper.find('.J_SearchEnd input');
            self.keywordInput = self.wrapper.find('.J_SearchKeyWord input');
            var autocomplete_options = {
                channel: 'hotelSuggest',
                serviceUrl: self.autoCompleteOption.serviceUrl,
                offsets: {x: 0, y: 0},
                onSelect: function (s, d) {
                    var cityCode = s.cityCode;
                    var cityName = s.cityName;
                    var cityType = typeof s.cityType !== "undefined" ? s.cityType : "";
                    if ((s.catalog && s.catalog == 2 && (s.cityName && s.cityName !== self.cityInput.val())) || (s.poiType && s.poiType > 1 && (s.cityName && s.cityName !== self.cityInput.val()))) {
                        self.option.resetCity && self.option.resetCity({
                            cityName: cityName,
                            cityCode: cityCode,
                            cityType: cityType
                        });
                    }
                    self.select(s);
                    var date1 = self.beginDate.val();
                    var date2 = self.endDate.val();
                    if (s.catalog == 3 || s.poiType == 7) {
                        var _url = self.option.directOpenBaseUrl + s.code;
                        if (date1 && date2) {
                            _url += '?checkindate=' + date1 + '&checkoutdate=' + date2;
                        }
                        window.open(encodeURI(_url));
                        return;
                    } else {
                        self.keywordInput.val(s.name).removeClass('search_ctrl_error');
                    }
                },
                params: self.postData,
                isOuter: true,
                maxHeight: 630
            };
            self.keywordAutoObj = self.keywordInput.autocompleteHotel(autocomplete_options);
            self.keywordInput.keydown(function () {
                self.hideDrop();
            });
            self.keywordAutoObj.container.on('click', function (e) {
                stopPropagation(e);
            });
            self.target.blur(function () {
                setTimeout(function () {
                    self.keywordAutoObj.container.hide();
                }, 100);
            });
        }
    });

    function createPicker(ele, option) {
        var picker = new HotelKeywordPicker(ele, option);
        pickers.push(picker);
        return picker;
    }

    $.fn.hotelKeywordPicker = function (option) {
        var arg = Array.prototype.slice.apply(arguments);
        return this.each(function () {
            var picker = this.__picker;
            if (typeof option === 'string') {
                if (picker && $.isFunction(picker[option])) {
                    picker[option].apply(picker, arg.slice(1));
                }
            } else {
                if (!picker) {
                    this.__picker = createPicker($(this), option);
                    ;
                }
            }
        });
    };
    return createPicker;
});
;define('unit/jquery.autocomplete_hotel', ['jquery', 'tn_catalog/lib/template-native'], function ($, TemplateNative) {
    var reEscape = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g');
    var paginationTemplate = '<div class="hotel-pagination clearfix" style="text-align:center; padding: 6px;" ><div class="page-jump"><%var min = current - 2;%><%var max = current + 2;%><%var cursor = 2%><%if(current > 1) {%><span class="prev"><i class="icon icon-left"></i></span><%}%><%if(total > 1) {%><span class="page-num<%if(1===current){%> current<%}%>">1</span><%if(min > 2) {%><span class="horizontal-ellipsis">...</span><%cursor = min;%><%}%><%for(;cursor <= current && cursor < total;cursor++) {%><span class="page-num<%if(cursor===current){%> current<%}%>"><%=cursor%></span><%}%><%for(;cursor <= max && cursor < total;cursor++) {%><span class="page-num"><%=cursor%></span><%}%><%if(cursor < total) {%><span class="horizontal-ellipsis">...</span><%}%><span class="page-num<%if(cursor===current){%> current<%}%>"><%=total%></span><%if(current < total) {%><span class="next"><i class="icon icon-right"></i></span><%}%><%}%></div>';

    function fnFormatResult(value, data, currentValue) {
        var pattern = '(' + currentValue.replace(reEscape, '\\$1') + ')';
        return value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
    }

    function Autocomplete(el, options) {
        this.el = $(el);
        this.el.attr('autocomplete', 'off');
        this.suggestions = [];
        this.currentsuggestions = [];
        this.data = [];
        this.badQueries = [];
        this.selectedIndex = -1;
        this.currentValue = this.el.val();
        this.selectedValue = null;
        this.intervalId = 0;
        this.cachedResponse = [];
        this.onChangeInterval = null;
        this.ignoreValueChange = false;
        this.serviceUrl = options.serviceUrl;
        this.isOuter = options.isOuter;
        this.isLocal = false;
        this.current = 1;
        this.options = {
            autoSubmit: false,
            minChars: 1,
            maxHeight: 300,
            deferRequestBy: 50,
            width: 0,
            highlight: true,
            params: {},
            fnFormatResult: fnFormatResult,
            delimiter: null,
            channel: '',
            zIndex: 9999,
            offsets: {x: 0, y: 0}
        };
        this.initialize();
        this.setOptions(options);
    }

    $.fn.autocompleteHotel = function (options) {
        return new Autocomplete(this.get(0) || $('<input />'), options);
    };
    Autocomplete.prototype = {
        killerFn: null, initialize: function () {
            var me, uid, autocompleteElId;
            me = this;
            uid = Math.floor(Math.random() * 0x100000).toString(16);
            autocompleteElId = 'Autocomplete_' + uid;
            this.killerFn = function (e) {
                if ($(e.target).parents('.autocomplete').size() === 0 && $(e.target).parents('.page-jump').size() === 0) {
                    me.killSuggestions();
                    me.disableKillerFn();
                }
            };
            if (!this.options.width) {
                this.options.width = this.el.width();
            }
            this.mainContainerId = 'AutocompleteContainter_' + uid;
            $('<div id="' + this.mainContainerId + '" style="position:absolute;z-index:9999;"><div class="autocomplete-w1"><div class="autocomplete" id="' + autocompleteElId + '" style="display:none; width:310px;"></div></div></div>').appendTo('body');
            this.container = $('#' + autocompleteElId);
            this.fixPosition();
            if (window.opera) {
                this.el.keypress(function (e) {
                    me.onKeyPress(e);
                });
            } else {
                this.el.keydown(function (e) {
                    me.onKeyPress(e);
                });
            }
            this.el.keyup(function (e) {
                me.onKeyUp(e);
            });
            this.el.blur(function () {
                me.enableKillerFn();
            });
            this.el.focus(function () {
                me.fixPosition();
            });
            this.pageClick();
        }, setOptions: function (options) {
            var o = this.options;
            $.extend(o, options);
            if (o.lookup) {
                this.isLocal = true;
                if ($.isArray(o.lookup)) {
                    o.lookup = {suggestions: o.lookup, data: []};
                }
            }
            if (this.options.selectFirst) {
                this.selectedIndex = 0
            }
            ;$('#' + this.mainContainerId).css({zIndex: o.zIndex});
            this.container.css({maxHeight: o.maxHeight + 'px', width: o.width});
        }, clearCache: function () {
            this.cachedResponse = [];
            this.badQueries = [];
        }, disable: function () {
            this.disabled = true;
        }, enable: function () {
            this.disabled = false;
        }, fixPosition: function () {
            var offset = this.el.offset();
            $('#' + this.mainContainerId).css({
                top: (offset.top + this.el.innerHeight()) + 'px',
                left: (offset.left + this.options.offsets.x) + 'px'
            });
        }, enableKillerFn: function () {
            var me = this;
            $(document).bind('click', me.killerFn);
        }, disableKillerFn: function () {
            var me = this;
            $(document).unbind('click', me.killerFn);
        }, killSuggestions: function () {
            var me = this;
            this.stopKillSuggestions();
            this.intervalId = window.setInterval(function () {
                me.hide();
                me.stopKillSuggestions();
            }, 300);
        }, stopKillSuggestions: function () {
            window.clearInterval(this.intervalId);
        }, onKeyPress: function (e) {
            if (this.disabled || !this.enabled) {
                return;
            }
            switch (e.keyCode) {
                case 27:
                    this.writeValue(this.currentValue);
                    this.hide();
                    break;
                case 9:
                case 13:
                    if (this.selectedIndex === -1) {
                        this.hide();
                        return;
                    }
                    this.select(this.selectedIndex);
                    if (e.keyCode === 9) {
                        return;
                    }
                    break;
                case 38:
                    this.moveUp();
                    break;
                case 40:
                    this.moveDown();
                    break;
                default:
                    return;
            }
            e.stopImmediatePropagation();
            e.preventDefault();
        }, onKeyUp: function (e) {
            if (this.disabled) {
                return;
            }
            switch (e.keyCode) {
                case 38:
                case 40:
                    return;
            }
            clearInterval(this.onChangeInterval);
            if (this.currentValue !== this.el.val()) {
                if (this.options.deferRequestBy > 0) {
                    var me = this;
                    this.onChangeInterval = setInterval(function () {
                        me.onValueChange();
                    }, this.options.deferRequestBy);
                } else {
                    this.onValueChange();
                }
            }
        }, onValueChange: function () {
            clearInterval(this.onChangeInterval);
            this.clearSelectedValue();
            this.current = 1;
            this.currentValue = this.el.val();
            var q = this.getQuery(this.currentValue);
            this.selectedIndex = -1;
            if (this.ignoreValueChange) {
                this.ignoreValueChange = false;
                return;
            }
            if (q === '' || q.length < this.options.minChars) {
                this.hide();
            } else {
                this.getSuggestions(q);
            }
        }, getQuery: function (val) {
            var d, arr;
            d = this.options.delimiter;
            val = val.replace(/\+/g, " ");
            if (!d) {
                return $.trim(val);
            }
            arr = val.split(d);
            return $.trim(arr[arr.length - 1]);
        }, getSuggestionsLocal: function (q) {
            var ret, arr, len, val, i;
            arr = this.options.lookup;
            len = arr.suggestions.length;
            ret = {suggestions: [], data: []};
            q = q.toLowerCase();
            for (i = 0; i < len; i++) {
                val = arr.suggestions[i];
                if (val.toLowerCase().indexOf(q) === 0) {
                    ret.suggestions.push(val);
                    ret.data.push(arr.data[i]);
                }
            }
            return ret;
        }, getSuggestions: function (q) {
            var cr, me;
            cr = this.isLocal ? this.getSuggestionsLocal(q) : this.cachedResponse[q];
            if (cr && $.isArray(cr.suggestions)) {
                this.suggestions = cr.suggestions;
                this.data = cr.data;
                this.suggest();
            } else {
                me = this;
                me.options.params.query = q;
                if (this.isOuter) {
                    var url = this.serviceUrl + '&';
                    if (url.indexOf('hotelKeyLikeInternational') != -1 && !me.options.params.cityCode) {
                        return;
                    }
                    $.each(me.options.params, function (key, value) {
                        url += key + "=" + value + "&";
                    });
                    url = encodeURI(url);
                    if (me['ajaxObj_' + this.mainContainerId]) {
                        me['ajaxObj_' + this.mainContainerId].abort();
                    }
                    me['ajaxObj_' + this.mainContainerId] = $.ajax({
                        url: url,
                        dataType: 'json',
                        success: function (json) {
                            me.processResponse(json);
                        }
                    });
                }
            }
        }, isBadQuery: function (q) {
            var i = this.badQueries.length;
            while (i--) {
                if (q.indexOf(this.badQueries[i]) === 0) {
                    return true;
                }
            }
            return false;
        }, hide: function () {
            this.enabled = false;
            if (this.options.selectFirst && this.selectedIndex != -1 && !this.selectedValue) {
                this.select(this.selectedIndex);
            }
            this.selectedIndex = -1;
            this.container.hide();
        }, suggestFormat: function () {
            var listData = {};
            if (this.options.onePageNum) {
                var current = this.current = this.current ? this.current : 1;
                var start = (current - 1) * this.options.onePageNum;
                var end = start + this.options.onePageNum;
                var arr = $.grep(this.suggestions, function (n, i) {
                    return i >= start && i < end;
                });
                listData.current = this.current;
                listData.suggestions = arr;
                listData.total = Math.ceil(this.suggestions.length / this.options.onePageNum);
            } else {
                listData.current = 1;
                listData.suggestions = this.suggestions;
            }
            this.data = listData;
            this.currentsuggestions = listData.suggestions;
        }, suggest: function () {
            if (this.suggestions.length === 0 && this.options.channel !== 'hotel') {
                div = $('<div class="J_hotel-autocomplete-err" style="width:400px; background: #ffebea;color: #fb3b39; padding: 10px;font-size: 14px;">很抱歉，暂无结果</div>');
                this.selectedIndex = -1;
                this.container.empty().append(div).show();
                return;
            }
            this.suggestFormat();
            var me, len, div, f, v, i, s, mOver, mClick;
            me = this;
            len = this.data.suggestions.length;
            f = this.options.fnFormatResult;
            v = this.getQuery(this.currentValue);
            var k = '', $suggestBox;
            mOver = function (xi) {
                return function () {
                    me.activate(xi);
                };
            };
            mClick = function (xi) {
                return function () {
                    me.select(xi);
                };
            };
            if (this.options.selectFirst) {
                this.selectedIndex = 0;
            } else {
                this.selectedIndex = -1;
            }
            ;this.container.hide().empty();
            for (i = 0; i < len; i++) {
                s = this.data.suggestions[i];
                if (this.options.channel === 'hotel') {
                    div = $((me.selectedIndex === i ? '<div class="selected row"' : '<div class="row"') + ' title=""><div class="clearfix" style="padding:0;">' + '<span>' + ((s.type === 2 || s.subType === 47) ? (s.keyword + '(' + s.cityName + ')') : s.keyword) + '</span></div></div>');
                    if (i == 0) {
                        div.find('span').css({'background': '#63ca33', 'color': '#fff'});
                    }
                }
                else if (this.options.channel === 'hotelSuggest') {
                    var html = '';
                    if (s.poiType != k) {
                        k = s.poiType;
                        $suggestBox = $('<div class="suggest-box clearfix" style="font-size: 14px; border-bottom: 1px solid #ddd;">' + '<div class="suggest-type" style="float: left;color: #ccc;width: 60px;padding: 3px 0 3px 8px;">' + '<span>' + s.poiTypeName + '</span>' + '</div><div class="suggest-content" style="float: left;width: 330px;color: #666;border-left: 1px solid #ddd;" m="点击_suggest_' + s.poiTypeName + '">' + '</div></div>');
                        this.container.append($suggestBox);
                    }
                    div = $((me.selectedIndex === i ? '<div class="selected row clearfix" ' : '<div class="row clearfix"') + 'style="padding: 5px 10px;cursor: pointer;" ><span style="float: left; width: 80%; text-align: left; overflow: hidden; white-space: nowrap;text-overflow: ellipsis;">' + s.displayName + '</span>' + (s.hotelCount > 0 ? '<span style="float: right; width: 20%; text-align: right;" >' + s.hotelCount + ' 家</span>' : '') + '</span>');
                    $('em', div).css({'color': '#22c233'});
                    if (div.hasClass('selected')) {
                        div.css({'background': '#f6f6f6', 'color': '#333'});
                    }
                    $('.suggest-content', $suggestBox).append(div);
                }
                else {
                    div = $((me.selectedIndex === i ? '<div class="selected row"' : '<div class="row"') + ' title="' + s + '">' + f(s, this.data[i], v) + '</div>');
                }
                if (me.options.channel === 'hotelSuggest') {
                    div.mouseover(function () {
                        $(this).css({'background': '#f6f6f6', 'color': '#333'});
                    });
                    div.mouseout(function () {
                        if (!$(this).hasClass('selected')) {
                            $(this).css({'background': '#ffffff', 'color': '#666'});
                        }
                    });
                    div.click(mClick(i));
                } else {
                    div.mouseover(mOver(i));
                    div.mouseover(function () {
                        $(this).find('span').css({'background': '#63ca33', 'color': '#fff'});
                    });
                    div.mouseout(function () {
                        $(this).find('span').css({'background': '#fff', 'color': '#404040'});
                    });
                    div.click(mClick(i));
                    this.container.append(div);
                }
            }
            if (!len) {
                div = $('<div>暂不支持该目的地</div>');
                div.css({'background': '#ffebea', 'color': '#fb3b39'});
                this.container.append(div);
            } else {
                if (this.options.onePageNum && this.data.total > 1) {
                    var template = TemplateNative.compile(paginationTemplate);
                    this.container.append($(template(this.data)));
                }
            }
            if (this.options.channel === 'hotel') {
                this.container.css({'width': '190px'});
                this.container.find('span').css({
                    'width': '190px',
                    'float': 'left',
                    'text-align': 'left',
                    'overflow': 'hidden'
                });
                $('#city_hotresults').hide();
            }
            if (this.options.channel === 'hotelSuggest') {
                this.container.css({
                    'width': '400px',
                    'height': 'auto',
                    'background': '#ffffff',
                    'border': '1px solid #dddddd',
                    'box-shadow': '0 0 3px #dddddd',
                    'display': 'block',
                    'font-family': 'microsoft yahei'
                });
                $('#city_hotresults').hide();
            }
            this.enabled = true;
            this.container.show();
        }, processResponse: function (json) {
            if (json && json.data) {
                response = json.data;
                if (!this.options.noCache) {
                    this.cachedResponse[response.query] = response;
                    if (response.suggestions.length === 0) {
                        this.badQueries.push(response.query);
                    }
                }
                if (response.query === this.getQuery(this.currentValue)) {
                    this.suggestions = response.suggestions;
                    this.data = response.data;
                    this.suggest();
                }
            }
        }, activate: function (index) {
            var divs, activeItem;
            if (this.options.channel === 'hotelSuggest') {
                divs = $('.suggest-content .row', this.container);
            } else {
                divs = this.container.children();
            }
            this.selectedIndex = index;
            if (this.selectedIndex !== -1 && divs.length > this.selectedIndex) {
                activeItem = divs.get(this.selectedIndex);
            }
            return activeItem;
        }, deactivate: function (div, index) {
            div.className = '';
            if (this.selectedIndex === index) {
                this.selectedIndex = -1;
            }
        }, select: function (i) {
            var selectedValue, f;
            selectedValue = this.currentsuggestions[i];
            if (selectedValue) {
                this.writeValue(selectedValue);
                this.setSelectedValue(selectedValue);
                if (this.options.autoSubmit) {
                    f = this.el.parents('form');
                    if (f.length > 0) {
                        f.get(0).submit();
                    }
                }
                this.hide();
                this.onSelect(i);
            }
        }, clearSelectedValue: function () {
            this.selectedValue = null;
        }, setSelectedValue: function (selectedValue) {
            this.selectedValue = selectedValue;
        }, getSelectedValue: function () {
            return this.selectedValue;
        }, writeValue: function (selectedValue) {
            if (this.options.channel === 'hotel') {
                if (selectedValue.type === 2 || selectedValue.subType === 47) {
                    this.el.val(selectedValue.cityName);
                    $('#keyWord').attr('data-id', selectedValue.id);
                    $('#keyWord').val(selectedValue.keyword);
                }
                else {
                    this.el.val(selectedValue.keyword);
                    $('#keyWord').val('酒店名/位置/品牌');
                }
                if (selectedValue.keyword == '金门县') {
                    this.el.val(selectedValue.keyword);
                    $('#keyWord').val('酒店名/位置/品牌');
                }
            }
            else if (this.options.channel === 'hotelSuggest') {
            }
            else {
                this.el.val(selectedValue);
            }
        }, moveUp: function () {
            if (this.selectedIndex === -1) {
                return;
            }
            if (this.selectedIndex === 0) {
                this.container.children().get(0).className = '';
                if (this.options.selectFirst) {
                    this.selectedIndex = 0;
                } else {
                    this.selectedIndex = -1;
                }
                ;this.writeValue(this.currentValue);
                return;
            }
            this.adjustScroll(this.selectedIndex - 1);
        }, moveDown: function () {
            if (this.options.onePageNum && this.selectedIndex === (this.options.onePageNum - 1)) {
                return;
            }
            if (this.selectedIndex === (this.currentsuggestions.length - 1)) {
                return;
            }
            this.adjustScroll(this.selectedIndex + 1);
        }, adjustScroll: function (i) {
            var activeItem, offsetTop, upperBound, lowerBound;
            activeItem = this.activate(i);
            if (this.options.channel === 'hotelSuggest') {
                this.container.find('.suggest-content .row.selected').removeClass('selected');
                $(activeItem).addClass('selected');
                return;
            }
            offsetTop = activeItem.offsetTop;
            upperBound = this.container.scrollTop();
            lowerBound = upperBound + this.options.maxHeight - 25;
            if (offsetTop < upperBound) {
                this.container.scrollTop(offsetTop);
            } else if (offsetTop > lowerBound) {
                this.container.scrollTop(offsetTop - this.options.maxHeight + 25);
            }
            this.writeValue(this.currentsuggestions[i]);
        }, onSelect: function (i) {
            var me, fn, s, d;
            me = this;
            fn = me.options.onSelect;
            s = me.currentsuggestions[i];
            d = me.data[i];
            me.writeValue(s);
            if (this.options.channel === 'hotel') {
                s = (s.type === 2 || s.subType === 47) ? s.cityName : s.keyword;
            }
            if (this.options.channel === 'hotelSuggest') {
                var collectData = {
                    'message': {
                        'event': me.el.hasClass('input_keyWord') ? 'keyword_suggest_click' : 'dest_suggest_click',
                        'info': [me.currentValue, s.id, s.name, s.cityName, s.cityCode]
                    }
                };
            }
            if ($.isFunction(fn)) {
                fn(s, d, me.el);
            }
        }, getValue: function (value) {
            var del, currVal, arr, me;
            me = this;
            del = me.options.delimiter;
            if (!del) {
                return value;
            }
            currVal = me.currentValue;
            arr = currVal.split(del);
            if (arr.length === 1) {
                return value;
            }
            return currVal.substr(0, currVal.length - arr[arr.length - 1].length) + value;
        }, pageClick: function () {
            var self = this;
            this.container.on('click', '.prev', function (e) {
                self.current = self.current - 1;
                self.suggest();
            });
            this.container.on('click', '.next', function (e) {
                self.current = self.current + 1;
                self.suggest();
            });
            this.container.on('click', '.page-num', function (e) {
                self.current = parseInt($(e.currentTarget).text(), 10);
                self.suggest();
            });
        }
    };
});
;define('index_amd/fs', ['jquery', 'index_amd/data'], function ($, DATA) {
    var exports = {};
    exports.init = function () {
        require(['common_amd/tool', 'common_amd/jquery.datalazyload'], function (tool) {
            $('.datalazyload').datalazyload();
            $('.your_footprint .widget_content').datalazyload(DATA.promises.footprint.resolve);
            $('.interest_dest .widget_content').datalazyload(DATA.promises.interest_dest.resolve);
            $('.latest_comments .widget_content').datalazyload(DATA.promises.latest_comments.resolve);
            $('#tourismLists').datalazyload(DATA.promises.tourism_scroll.resolve);
            var utility = {
                isIELte: function (version) {
                    if (!$.browser.msie) {
                        return false;
                    }
                    return parseInt($.browser.version) <= version;
                }
            };
            var indexTopNav = {
                init: function () {
                    $(".index_top_nav .item_siteMap").hover(this.onSiteMapHover)
                    $(".index_top_nav .has_dropdown").hover(this.onNavItemHoverIn, this.onNavItemHOverOut);
                    $(".index_top_nav .item_weixin, .index_top_nav .item_weibo").hover(function () {
                        $(this).find(".header_icon").toggleClass("hover");
                    });
                    $(".index_top_nav .item_qrCode").hover(function () {
                        $(this).find(".header_icon").toggleClass("active");
                    });
                }, onSiteMapHover: function (e) {
                    var offsetLeft = $(this).offset().left - $(".header_top .header_inner").offset().left + 1;
                    $(this).find(".siteMap_panel").css("left", 0 - offsetLeft + "px");
                }, onNavItemHoverIn: function (e) {
                    $(this).addClass("item_hover");
                    if (utility.isIELte(8)) {
                        $(this).find(".icon_arrow").addClass("icon_arrow_rotate");
                    }
                }, onNavItemHOverOut: function (e) {
                    $(this).removeClass("item_hover");
                    if (utility.isIELte(8)) {
                        $(this).find(".icon_arrow").removeClass("icon_arrow_rotate");
                    }
                }
            };
            indexTopNav.init();
            var searchBox = {
                init: function () {
                    $("#keyword-input").focus(this.onInputFocus);
                    $("#keyword-input").blur(this.onInputBlur);
                }, onInputFocus: function () {
                    $(this).parents(".tn_search_box").find(".search_hot").hide();
                }, onInputBlur: function () {
                    if ($(this).val() == "") {
                        $(this).parents(".tn_search_box").find(".search_hot").show();
                    }
                }
            };
            searchBox.init();
            var indexNavMenu = function () {
                function showSubNav(item) {
                    if (!$(item).hasClass("hasSubNav")) {
                        return;
                    }
                    $(item).addClass('cui_nav_o');
                    var ThisL = $(item).offset().left, ThisW = $(item).width(), thisW = ThisW / 2,
                        winW = $('body').width(), menuW = $('ul.menu_list').width(),
                        menuL = $('ul.menu_list').offset().left, liLeft = ThisL - menuL,
                        subNavW = $(item).find('.top_sub_nav').width(), subNavWban = subNavW / 2,
                        navL = liLeft - subNavWban + thisW;
                    $("#subnav_wrap_bg").show();
                    $(item).find('.top_subnav_wrap').css({'width': menuW, 'left': 0});
                    if (navL < 0) {
                        navL = 0;
                        $(item).find('.top_sub_nav').css('left', 0);
                    }
                    else {
                        if (navL + subNavW > menuW) {
                            $(item).find('.top_sub_nav').css('right', 0);
                        }
                        else {
                            $(item).find('.top_sub_nav').css('left', navL);
                        }
                    }
                    $(item).find('.icon_arrowUp').css('left', liLeft + thisW - 5);
                }

                function closeSubNav(item) {
                    if (!$(item).hasClass("hasSubNav")) {
                        return;
                    }
                    $("#subnav_wrap_bg").hide();
                    $(item).removeClass('cui_nav_o');
                    $(item).find('.top_sub_nav')[0].style.left = null;
                    $(item).find('.top_sub_nav')[0].style.right = null;
                }

                $(".index_nav_menu .menu_list>li").hover(function () {
                    var self = this;
                    var closeTimer = $(this).data("closeTimer");
                    if (closeTimer) {
                        clearTimeout(closeTimer);
                        $(this).data("closeTimer", null);
                    }
                    var showTimer = $(this).data("showTimer");
                    showTimer = setTimeout(function () {
                        showSubNav($(self));
                        $(self).data("showTimer", null);
                    }, 150);
                    $(this).data("showTimer", showTimer);
                }, function () {
                    var self = this;
                    var showTimer = $(this).data("showTimer");
                    if (showTimer) {
                        clearTimeout(showTimer);
                        $(this).data("showTimer", null);
                    }
                    var closeTimer = $(this).data("closeTimer");
                    closeTimer = setTimeout(function () {
                        closeSubNav($(self));
                        $(self).data("closeTimer", null);
                    }, 150);
                    $(this).data("closeTimer", closeTimer);
                });
            }
            indexNavMenu();
            var topIndex = function () {
                var topIndex = $("#topIndex");
                var TopIndexHeight = 60;
                var showTopIndex = function () {
                    topIndex.animate({height: TopIndexHeight}, 600, "swing", function () {
                        topIndex.trigger("adLoaded");
                    });
                }
                var hideTopIndex = function () {
                    topIndex.slideUp(function () {
                        topIndex.trigger("adClosed");
                    });
                }
                var getBgColor = function (bgsrc) {
                    return getQueryStringByName(bgsrc, "bgcolor");
                }
                var getQueryStringByName = function (url, name) {
                    var reg = new RegExp("[\?\&]" + name + "=([^\&]+)");
                    var result = url.match(reg)
                    if (result && result.length) return result[1];
                    return "#fff";
                }
                if (topIndex.length > 0) {
                    topIndex.on("click", ".top_index_close", hideTopIndex);
                    var topIndexAd = topIndex.find(".top_index_ad"), bgsrc = $(topIndexAd).attr("data-bgsrc");
                    var img = new Image();
                    img.onload = function () {
                        var bgImage = "url(" + bgsrc + ")", bgColor = getBgColor(bgsrc);
                        topIndexAd.css({"background-image": bgImage, "background-color": bgColor});
                        showTopIndex();
                    }
                    img.src = bgsrc;
                }
            }
            topIndex();
        });
        require(['index_amd/inline_v2']);
        require(['index_amd/left_menu']);
        require(["index_amd/index", "index_amd/crx"], function (index) {
            index.init();
        });
        require(['filter-iframe']);
        require(["monitor"]);
        if (window.PERFORMANCE && window.d) {
            window.PERFORMANCE.r = new Date().getTime() - window.d.getTime();
        }
    };
    return exports;
});