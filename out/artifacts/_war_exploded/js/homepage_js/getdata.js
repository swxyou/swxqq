define('rightcommon_amd/getdata', ['jquery', 'underscore', 'rightcommon_amd/main_prd', 'common_amd/tat'], function ($, _, main_prd, tat) {
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