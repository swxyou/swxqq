var locationchange = {
    checkip: function () {
        var citycode = locationchange.getCookie('tuniuuser_ip_citycode');
        var citycodeTuniu = locationchange.getCookie('tuniuuser_citycode');
        setlocationcookie(citycodeTuniu);
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
if (document.all) {
    window.attachEvent('onload', docheck);
} else {
    window.addEventListener('load', docheck, false);
}

function docheck() {
    var startCity = document.getElementById('startCity');
    var citycodeTuniu = locationchange.getCookie('tuniuuser_citycode');
    if (startCity && citycodeTuniu) {
        locationchange.checkip();
    }
}

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
};var cookieName = {};
var _isGuest;
var _nickname;
var isGuest;
var tuniuLevel;
var tuniuVip;
var tuniuImg;
cookieName.refreshCookie = getCookieForLogin;

function getLoginInfo() {
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
        ;tuniuImg = cookieName['tuniuuser_image'];
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
        ;
        if (tuniuVip == 1) {
            login = login + '<li><span>您好，</span></li>' + compLoginInnerInfor(_nickname, imgInfo, -1)
        } else {
            login = login + '<li><span>您好，</span></li>' + compLoginInnerInfor(_nickname, imgInfo, tuniuLevel)
        }
        ;login = login + '<input type="hidden" value="' + imgInfo + '" id="user_top_img"><input type="hidden" value="' + tuniuVip + '" id="is_user_vip">'
    } else {
        login = login + '<li><a onclick="tuniuRecorder.push(\'1_1_1_1_0_1\');" rel="nofollow" href="http://www.tuniu.com/u/login" target="_blank">登录</a>|</li><li><a onclick="tuniuRecorder.push(\'1_1_1_1_0_2\');" rel="nofollow" href="http://www.tuniu.com/u/register" target="_blank">注册</a></li>'
    }
    ;
    return login
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
        uri.file = uri.path.replace(/^.*[\/\\]/g, '')
    }
    return uri
}

function convertPicSize(field, size, height) {
    var img_url = '';
    var reg = new RegExp("^(.*)(_w\d{2,3}_h\d{2,3}_c1_t0)?\.(jpg|png|jpeg|gif|bmp|gif|psd|pcx|ai|svg|tga|raw|tiff)$", 'i');
    if (height > 10) {
        if (field.indexOf('/default') != -1) {
            img_url = field.replace(reg, "$1_w" + size + " _h" + height + "_c1_t0.$3")
        } else {
            img_url = field.replace(reg, "$1_w" + size + "_h" + height + "_c1_t0.$3")
        }
    } else if (size == 1) {
        img_url = field.replace(reg, "$1_w600_h160_c1_t0.$3")
    } else if (size == 2) {
        img_url = field.replace(reg, "$1_w320_h180_c1_t0.$3")
    } else if (size == 99) {
        img_url = field.replace(reg, "$1_w214_h160_c1_t0.$3")
    } else {
        img_url = field.replace(reg, "$1_w180_h180_c1_t0.$3")
    }
    return img_url
}

function compLoginInnerInfor(nick_name, img_info, user_level) {
    var top_user_level = "";
    var bot_user_level = "";
    if (user_level < 0) {
        top_user_level = 'vip vip_word';
        bot_user_level = 'vip_lel vip_lel_word'
    } else {
        top_user_level = 'vip vip' + user_level;
        bot_user_level = 'vip_lel vip_lel' + user_level
    }
    ;var comp_str = '<li id="vipnameBox" class="vipname_box"><a onclick="tuniuRecorder.push(\'1_1_1_1_1_1\');" href="http://www.tuniu.com/u" id="vipname" class="vipname" rel="nofollow"><span class="fl" style="float:left;">' + nick_name + '</span><span class="' + top_user_level + '"></span> <span class="poparrow"></span></a><div class="colle_box"><div class="colle_top clearfix"><div class="right"><a href="http://www.tuniu.com/u">账户管理</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.tuniu.com/u/logout">退出</a></div></div><div class="colle_bottom"><div class="touxiang"><a href="https://i.tuniu.com/"><img src="' + img_info + '"></a></div><div class="fl"><div class="vip_stage mt_10"><a style="color:#f60; font-weight:bold; font-size:16px;" class="' + bot_user_level + '" href="http://www.tuniu.com/u/club"></a></div><div><a style="color:#404040; font-weight:bold; font-size:14px;" href="http://www.tuniu.com/u/club">查看我的会员特权</a></div></div></div></div></li>';
    return comp_str
};

function getMobileInfo() {
    var mobile_flag = false;
    var m_url = "http://m.tuniu.com";
    try {
        var agent = navigator.userAgent.toLowerCase()
    } catch (e) {
        var agent = navigatorAlias.userAgent.toLowerCase()
    }
    ;
    if (agent.match('/(blackberry|configuration\/cldc|hp |hp-|htc |htc_|htc-|iemobile|kindle|midp|mmp|motorola|mobile|nokia|opera mini|opera |Googlebot-Mobile|YahooSeeker\/M1A1-R2D2|android|iphone|ipod|mobi|palm|palmos|pocket|portalmmm|ppc;|smartphone|sonyericsson|sqh|spv|symbian|treo|up.browser|up.link|vodafone|windows ce|xda |xda_)/i')) {
        mobile_flag = true;
        if (agent.match('/iPad/i')) {
            mobile_flag = false
        }
        ;var url = Window.location.href;
        if (url.match('/tours/i')) {
            var url_temp = url.spli('//');
            var route_attr = url_temp[1];
            var route_temp = route_attr.split('/');
            var route_id = route_temp[2];
            var route_type = getRouteTypeByID(route_id);
            if (route_type == 1) {
                m_url = m_url + '/tours/' + route_id
            }
        }
    }
    ;isPcOrMobile(mobile_flag);
    var login_1 = '<div class="login_menu clearfix">';
    return login_1;
};

function isPcOrMobile(m_flag, m_url) {
    var isPcOrMobile = document.getElementById("isPcOrMobile");
    if (m_flag) {
        isPcOrMobile.innerHTML = '<a onclick="tuniuRecorder.push(\'1_1_1_2_1_3\');" class="sitenav_mobile" href="' + m_url + '" target="_blank" rel="nofollow"></a>'
    } else {
        isPcOrMobile.innerHTML = '<a onclick="tuniuRecorder.push(\'1_1_1_2_1_3\');" class="sitenav_mobile" href="http://www.tuniu.com/static/mobile/" target="_blank" rel="nofollow"></a>'
    }
};

function getCookieForLogin() {
    var aCookie = document.cookie.split("; ");
    for (var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split("=");
        if (aCrumb[1]) {
            cookieName[aCrumb[0]] = aCrumb[1].replace(/<\/?[^>]*>/g, '');
        }
    }
};

function getLoginState() {
    var userInfo = cookieName['tuniuuser'];
    var islogin = cookieName['isLogined'];
    _nickname = cookieName['tuniuuser_name'];
    if (_nickname) {
        _isGuest = true;
        _nickname = unescape(cookieName['tuniuuser_name']);
        _nickname = utf8to16(base64decode(_nickname)).replace(/<\/?[^>]*>/g, '')
    } else if (islogin) {
        window.location = "http://www.tuniu.com/u/login";
    } else {
        _isGuest = false
    }
};

function utf8to16(str) {
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
    ;
    return out
};

function base64decode(str) {
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
    ;
    return out
};

function getRouteTypeByID(route_id) {
    if ((routeId > 0 && routeId < 80000) || (routeId > 200000 && routeId < 1000000) || (routeId >= 2000000 && routeId < 5000000) || (routeId > 20000000 && routeId < 40000000)) {
        return 1
    } else if ((routeId > 80000 && routeId < 200000) || (routeId > 40000000 && routeId < 50000000)) {
        return 2
    } else if ((routeId > 1000000 && routeId < 2000000) || (routeId >= 5000000 && routeId < 8000000)) {
        return 3
    } else if (routeId > 8000000 && routeId < 9000000) {
        return 4
    }
};var user_login_info = document.getElementById("user_login_info");
if (user_login_info) {
    user_login_info.innerHTML = getLoginInfo()
}