define('rightcommon_amd/main_prd', ['jquery', 'underscore'], function ($, _) {
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