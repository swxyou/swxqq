/*!
 * jquery-powerFloat.js
 * jQuery 万能浮动层插件
 * http://www.zhangxinxu.com/wordpress/?p=1328
 * © by zhangxinxu  
 * 2010-12-06 v1.0.0 插件编写，初步调试
 * 2010-12-30 v1.0.1 限定尖角字符字体，避免受浏览器自定义字体干扰
 * 2011-01-03 v1.1.0 修复连续获得焦点显示后又隐藏的bug
       修复图片加载正则判断不准确的问题
 * 2011-02-15 v1.1.1 关于居中对齐位置判断的特殊处理
 * 2011-04-15 v1.2.0 修复浮动层含有过高select框在IE下点击会隐藏浮动层的问题，同时优化事件绑定   
 * 2011-09-13 v1.3.0  修复两个菜单hover时间间隔过短隐藏回调不执行的问题
 * 2012-01-13 v1.4.0 去除ajax加载的存储
                     修复之前按照ajax地址后缀判断是否图片的问题
      修复一些脚本运行出错
      修复hover延时显示时，元素没有显示但鼠标移出依然触发隐藏回调的问题
 * 2012-02-27 v1.5.0 为无id容器创建id逻辑使用错误的问题
       修复无事件浮动出现时同页面点击空白区域浮动层不隐藏的问题
      修复点击与hover并存时特定时候o.trigger报为null错误的问题
 * 2012-03-29 v1.5.1 修复连续hover时候后面一个不触发显示的问题
 * 2012-05-02 v1.5.2 点击事件 浮动框再次点击隐藏的问题修复
 * 2012-11-02 v1.6.0 兼容jQuery 1.8.2
 */
(function ($) {
    $.fn.powerFloat = function (options) {
        return $(this).each(function () {
            var s = $.extend({}, defaults, options || {});
            var init = function (pms, trigger) {
                if (o.target && o.target.css("display") !== "none") {
                    o.targetHide();
                }
                o.s = pms;
                o.trigger = trigger;
            }, hoverTimer;
            switch (s.eventType) {
                case"hover": {
                    $(this).hover(function () {
                        if (o.timerHold) {
                            o.flagDisplay = true;
                        }
                        var numShowDelay = parseInt(s.showDelay, 10);
                        init(s, $(this));
                        if (numShowDelay) {
                            if (hoverTimer) {
                                clearTimeout(hoverTimer);
                            }
                            hoverTimer = setTimeout(function () {
                                o.targetGet.call(o);
                            }, numShowDelay);
                        } else {
                            o.targetGet();
                        }
                    }, function () {
                        if (hoverTimer) {
                            clearTimeout(hoverTimer);
                        }
                        if (o.timerHold) {
                            clearTimeout(o.timerHold);
                        }
                        o.flagDisplay = false;
                        o.targetHold();
                    });
                    if (s.hoverFollow) {
                        $(this).mousemove(function (e) {
                            o.cacheData.left = e.pageX;
                            o.cacheData.top = e.pageY;
                            o.targetGet.call(o);
                            return false;
                        });
                    }
                    break;
                }
                case"click": {
                    $(this).click(function (e) {
                        if (o.display && o.trigger && e.target === o.trigger.get(0)) {
                            o.flagDisplay = false;
                            o.displayDetect();
                        } else {
                            init(s, $(this));
                            o.targetGet();
                            if (!$(document).data("mouseupBind")) {
                                $(document).bind("mouseup", function (e) {
                                    var flag = false;
                                    if (o.trigger && o.target) {
                                        var idTarget = o.target.attr("id");
                                        if (!idTarget) {
                                            idTarget = "R_" + Math.random();
                                            o.target.attr("id", idTarget);
                                        }
                                        $(e.target).parents().each(function () {
                                            if ($(this).attr("id") === idTarget) {
                                                flag = true;
                                            }
                                        });
                                        if (s.eventType === "click" && o.display && e.target != o.trigger.get(0) && !flag) {
                                            o.flagDisplay = false;
                                            o.displayDetect();
                                        }
                                    }
                                    return false;
                                }).data("mouseupBind", true);
                            }
                        }
                    });
                    break;
                }
                case"focus": {
                    $(this).focus(function () {
                        var self = $(this);
                        setTimeout(function () {
                            init(s, self);
                            o.targetGet();
                        }, 200);
                    }).blur(function () {
                        o.flagDisplay = false;
                        setTimeout(function () {
                            o.displayDetect();
                        }, 190);
                    });
                    break;
                }
                default: {
                    init(s, $(this));
                    o.targetGet();
                    $(document).unbind("mouseup").data("mouseupBind", false);
                }
            }
        });
    };
    var o = {
        targetGet: function () {
            if (!this.trigger) {
                return this;
            }
            var attr = this.trigger.attr(this.s.targetAttr), target = this.s.target;
            switch (this.s.targetMode) {
                case"common": {
                    if (target) {
                        var type = typeof(target);
                        if (type === "object") {
                            if (target.size()) {
                                o.target = target.eq(0);
                            }
                        } else if (type === "string") {
                            if ($(target).size()) {
                                o.target = $(target).eq(0);
                            }
                        }
                    } else {
                        if (attr && $("#" + attr).size()) {
                            o.target = $("#" + attr);
                        }
                    }
                    if (o.target) {
                        o.targetShow();
                    } else {
                        return this;
                    }
                    break;
                }
                case"ajax": {
                    var url = target || attr;
                    this.targetProtect = false;
                    if (!url) {
                        return;
                    }
                    if (!o.cacheData[url]) {
                        o.loading();
                    }
                    var tempImage = new Image();
                    tempImage.onload = function () {
                        var w = tempImage.width, h = tempImage.height;
                        var winw = $(window).width(), winh = $(window).height();
                        var imgScale = w / h, winScale = winw / winh;
                        if (imgScale > winScale) {
                            if (w > winw / 2) {
                                w = winw / 2;
                                h = w / imgScale;
                            }
                        } else {
                            if (h > winh / 2) {
                                h = winh / 2;
                                w = h * imgScale;
                            }
                        }
                        var imgHtml = '<img class="float_ajax_image" src="' + url + '" width="' + w + '" height = "' + h + '" />';
                        o.cacheData[url] = true;
                        o.target = $(imgHtml);
                        o.targetShow();
                    };
                    tempImage.onerror = function () {
                        if (/(\.jpg|\.png|\.gif|\.bmp|\.jpeg)$/i.test(url)) {
                            o.target = $('<div class="float_ajax_error">图片加载失败。</div>');
                            o.targetShow();
                        } else {
                            $.ajax({
                                url: url, success: function (data) {
                                    if (typeof(data) === "string") {
                                        o.cacheData[url] = true;
                                        o.target = $('<div class="float_ajax_data">' + data + '</div>');
                                        o.targetShow();
                                    }
                                }, error: function () {
                                    o.target = $('<div class="float_ajax_error">数据没有加载成功。</div>');
                                    o.targetShow();
                                }
                            });
                        }
                    };
                    tempImage.src = url;
                    break;
                }
                case"list": {
                    var targetHtml = '<ul class="float_list_ul">', arrLength;
                    if ($.isArray(target) && (arrLength = target.length)) {
                        $.each(target, function (i, obj) {
                            var list = "", strClass = "", text, href;
                            if (i === 0) {
                                strClass = ' class="float_list_li_first"';
                            }
                            if (i === arrLength - 1) {
                                strClass = ' class="float_list_li_last"';
                            }
                            if (typeof(obj) === "object" && (text = obj.text.toString())) {
                                if (href = (obj.href || "javascript:")) {
                                    list = '<a href="' + href + '" class="float_list_a">' + text + '</a>';
                                } else {
                                    list = text;
                                }
                            } else if (typeof(obj) === "string" && obj) {
                                list = obj;
                            }
                            if (list) {
                                targetHtml += '<li' + strClass + '>' + list + '</li>';
                            }
                        });
                    } else {
                        targetHtml += '<li class="float_list_null">列表无数据。</li>';
                    }
                    targetHtml += '</ul>';
                    o.target = $(targetHtml);
                    this.targetProtect = false;
                    o.targetShow();
                    break;
                }
                case"remind": {
                    var strRemind = target || attr;
                    this.targetProtect = false;
                    if (typeof(strRemind) === "string") {
                        o.target = $('<span>' + strRemind + '</span>');
                        o.targetShow();
                    }
                    break;
                }
                default: {
                    var objOther = target || attr, type = typeof(objOther);
                    if (objOther) {
                        if (type === "string") {
                            if (/^.[^:#\[\.,]*$/.test(objOther)) {
                                if ($(objOther).size()) {
                                    o.target = $(objOther).eq(0);
                                    this.targetProtect = true;
                                } else if ($("#" + objOther).size()) {
                                    o.target = $("#" + objOther).eq(0);
                                    this.targetProtect = true;
                                } else {
                                    o.target = $('<div>' + objOther + '</div>');
                                    this.targetProtect = false;
                                }
                            } else {
                                o.target = $('<div>' + objOther + '</div>');
                                this.targetProtect = false;
                            }
                            o.targetShow();
                        } else if (type === "object") {
                            if (!$.isArray(objOther) && objOther.size()) {
                                o.target = objOther.eq(0);
                                this.targetProtect = true;
                                o.targetShow();
                            }
                        }
                    }
                }
            }
            return this;
        }, container: function () {
            var cont = this.s.container, mode = this.s.targetMode || "mode";
            if (mode === "ajax" || mode === "remind") {
                this.s.sharpAngle = true;
            } else {
                this.s.sharpAngle = false;
            }
            if (this.s.reverseSharp) {
                this.s.sharpAngle = !this.s.sharpAngle;
            }
            if (mode !== "common") {
                if (cont === null) {
                    cont = "plugin";
                }
                if (cont === "plugin") {
                    if (!$("#floatBox_" + mode).size()) {
                        $('<div id="floatBox_' + mode + '" class="float_' + mode + '_box"></div>').appendTo($("body")).hide();
                    }
                    cont = $("#floatBox_" + mode);
                }
                if (cont && typeof(cont) !== "string" && cont.size()) {
                    if (this.targetProtect) {
                        o.target.show().css("position", "static");
                    }
                    o.target = cont.empty().append(o.target);
                }
            }
            return this;
        }, setWidth: function () {
            var w = this.s.width;
            if (w === "auto") {
                if (this.target.get(0).style.width) {
                    this.target.css("width", "auto");
                }
            } else if (w === "inherit") {
                this.target.width(this.trigger.width());
            } else {
                this.target.css("width", w);
            }
            return this;
        }, position: function () {
            if (!this.trigger || !this.target) {
                return this;
            }
            var pos, tri_h = 0, tri_w = 0, cor_w = 0, cor_h = 0, tri_l, tri_t, tar_l, tar_t, cor_l, cor_t,
                tar_h = this.target.data("height"), tar_w = this.target.data("width"), st = $(window).scrollTop(),
                off_x = parseInt(this.s.offsets.x, 10) || 0, off_y = parseInt(this.s.offsets.y, 10) || 0,
                mousePos = this.cacheData;
            if (!tar_h) {
                tar_h = this.target.outerHeight();
                if (this.s.hoverFollow) {
                    this.target.data("height", tar_h);
                }
            }
            if (!tar_w) {
                tar_w = this.target.outerWidth();
                if (this.s.hoverFollow) {
                    this.target.data("width", tar_w);
                }
            }
            pos = this.trigger.offset();
            tri_h = this.trigger.outerHeight();
            tri_w = this.trigger.outerWidth();
            tri_l = pos.left;
            tri_t = pos.top;
            var funMouseL = function () {
                if (tri_l < 0) {
                    tri_l = 0;
                } else if (tri_l + tri_h > $(window).width()) {
                    tri_l = $(window).width() - tri_w;
                }
            }, funMouseT = function () {
                if (tri_t < 0) {
                    tri_t = 0;
                } else if (tri_t + tri_h > $(document).height()) {
                    tri_t = $(document).height() - tri_h;
                }
            };
            if (this.s.hoverFollow && mousePos.left && mousePos.top) {
                if (this.s.hoverFollow === "x") {
                    tri_l = mousePos.left
                    funMouseL();
                } else if (this.s.hoverFollow === "y") {
                    tri_t = mousePos.top;
                    funMouseT();
                } else {
                    tri_l = mousePos.left;
                    tri_t = mousePos.top;
                    funMouseL();
                    funMouseT();
                }
            }
            var arrLegalPos = ["4-1", "1-4", "5-7", "2-3", "2-1", "6-8", "3-4", "4-3", "8-6", "1-2", "7-5", "3-2"],
                align = this.s.position, alignMatch = false, strDirect;
            $.each(arrLegalPos, function (i, n) {
                if (n === align) {
                    alignMatch = true;
                    return;
                }
            });
            if (!alignMatch) {
                align = "4-1";
            }
            var funDirect = function (a) {
                var dir = "bottom";
                switch (a) {
                    case"1-4":
                    case"5-7":
                    case"2-3": {
                        dir = "top";
                        break;
                    }
                    case"2-1":
                    case"6-8":
                    case"3-4": {
                        dir = "right";
                        break;
                    }
                    case"1-2":
                    case"8-6":
                    case"4-3": {
                        dir = "left";
                        break;
                    }
                    case"4-1":
                    case"7-5":
                    case"3-2": {
                        dir = "bottom";
                        break;
                    }
                }
                return dir;
            };
            var funCenterJudge = function (a) {
                if (a === "5-7" || a === "6-8" || a === "8-6" || a === "7-5") {
                    return true;
                }
                return false;
            };
            var funJudge = function (dir) {
                var totalHeight = 0, totalWidth = 0, flagCorner = (o.s.sharpAngle && o.corner) ? true : false;
                if (dir === "right") {
                    totalWidth = tri_l + tri_w + tar_w + off_x;
                    if (flagCorner) {
                        totalWidth += o.corner.width();
                    }
                    if (totalWidth > $(window).width()) {
                        return false;
                    }
                } else if (dir === "bottom") {
                    totalHeight = tri_t + tri_h + tar_h + off_y;
                    if (flagCorner) {
                        totalHeight += o.corner.height();
                    }
                    if (totalHeight > st + $(window).height()) {
                        return false;
                    }
                } else if (dir === "top") {
                    totalHeight = tar_h + off_y;
                    if (flagCorner) {
                        totalHeight += o.corner.height();
                    }
                    if (totalHeight > tri_t - st) {
                        return false;
                    }
                } else if (dir === "left") {
                    totalWidth = tar_w + off_x;
                    if (flagCorner) {
                        totalWidth += o.corner.width();
                    }
                    if (totalWidth > tri_l) {
                        return false;
                    }
                }
                return true;
            };
            strDirect = funDirect(align);
            if (this.s.sharpAngle) {
                this.createSharp(strDirect);
            }
            if (this.s.edgeAdjust) {
                if (funJudge(strDirect)) {
                    (function () {
                        if (funCenterJudge(align)) {
                            return;
                        }
                        var obj = {
                            top: {right: "2-3", left: "1-4"},
                            right: {top: "2-1", bottom: "3-4"},
                            bottom: {right: "3-2", left: "4-1"},
                            left: {top: "1-2", bottom: "4-3"}
                        };
                        var o = obj[strDirect], name;
                        if (o) {
                            for (name in o) {
                                if (!funJudge(name)) {
                                    align = o[name];
                                }
                            }
                        }
                    })();
                } else {
                    (function () {
                        if (funCenterJudge(align)) {
                            var center = {"5-7": "7-5", "7-5": "5-7", "6-8": "8-6", "8-6": "6-8"};
                            align = center[align];
                        } else {
                            var obj = {
                                top: {left: "3-2", right: "4-1"},
                                right: {bottom: "1-2", top: "4-3"},
                                bottom: {left: "2-3", right: "1-4"},
                                left: {bottom: "2-1", top: "3-4"}
                            };
                            var o = obj[strDirect], arr = [];
                            for (name in o) {
                                arr.push(name);
                            }
                            if (funJudge(arr[0]) || !funJudge(arr[1])) {
                                align = o[arr[0]];
                            } else {
                                align = o[arr[1]];
                            }
                        }
                    })();
                }
            }
            var strNewDirect = funDirect(align), strFirst = align.split("-")[0];
            if (this.s.sharpAngle) {
                this.createSharp(strNewDirect);
                cor_w = this.corner.width(), cor_h = this.corner.height();
            }
            if (this.s.hoverFollow) {
                if (this.s.hoverFollow === "x") {
                    tar_l = tri_l + off_x;
                    if (strFirst === "1" || strFirst === "8" || strFirst === "4") {
                        tar_l = tri_l - (tar_w - tri_w) / 2 + off_x;
                    } else {
                        tar_l = tri_l - (tar_w - tri_w) + off_x;
                    }
                    if (strFirst === "1" || strFirst === "5" || strFirst === "2") {
                        tar_t = tri_t - off_y - tar_h - cor_h;
                        cor_t = tri_t - cor_h - off_y - 1;
                    } else {
                        tar_t = tri_t + tri_h + off_y + cor_h;
                        cor_t = tri_t + tri_h + off_y + 1;
                    }
                    cor_l = pos.left - (cor_w - tri_w) / 2;
                } else if (this.s.hoverFollow === "y") {
                    if (strFirst === "1" || strFirst === "5" || strFirst === "2") {
                        tar_t = tri_t - (tar_h - tri_h) / 2 + off_y;
                    } else {
                        tar_t = tri_t - (tar_h - tri_h) + off_y;
                    }
                    if (strFirst === "1" || strFirst === "8" || strFirst === "4") {
                        tar_l = tri_l - tar_w - off_x - cor_w;
                        cor_l = tri_l - cor_w - off_x - 1;
                    } else {
                        tar_l = tri_l + tri_w - off_x + cor_w;
                        cor_l = tri_l + tri_w + off_x + 1;
                    }
                    cor_t = pos.top - (cor_h - tri_h) / 2;
                } else {
                    tar_l = tri_l + off_x;
                    tar_t = tri_t + off_y;
                }
            } else {
                switch (strNewDirect) {
                    case"top": {
                        tar_t = tri_t - off_y - tar_h - cor_h;
                        if (strFirst == "1") {
                            tar_l = tri_l - off_x;
                        } else if (strFirst === "5") {
                            tar_l = tri_l - (tar_w - tri_w) / 2 - off_x;
                        } else {
                            tar_l = tri_l - (tar_w - tri_w) - off_x;
                        }
                        cor_t = tri_t - cor_h - off_y - 1;
                        cor_l = tri_l - (cor_w - tri_w) / 2;
                        break;
                    }
                    case"right": {
                        tar_l = tri_l + tri_w + off_x + cor_w;
                        if (strFirst == "2") {
                            tar_t = tri_t + off_y;
                        } else if (strFirst === "6") {
                            tar_t = tri_t - (tar_h - tri_h) / 2 + off_y;
                        } else {
                            tar_t = tri_t - (tar_h - tri_h) + off_y;
                        }
                        cor_l = tri_l + tri_w + off_x + 1;
                        cor_t = tri_t - (cor_h - tri_h) / 2;
                        break;
                    }
                    case"bottom": {
                        tar_t = tri_t + tri_h + off_y + cor_h;
                        if (strFirst == "4") {
                            tar_l = tri_l + off_x;
                        } else if (strFirst === "7") {
                            tar_l = tri_l - (tar_w - tri_w) / 2 + off_x;
                        } else {
                            tar_l = tri_l - (tar_w - tri_w) + off_x;
                        }
                        cor_t = tri_t + tri_h + off_y + 1;
                        cor_l = tri_l - (cor_w - tri_w) / 2;
                        break;
                    }
                    case"left": {
                        tar_l = tri_l - tar_w - off_x - cor_w;
                        if (strFirst == "2") {
                            tar_t = tri_t - off_y;
                        } else if (strFirst === "6") {
                            tar_t = tri_t - (tar_w - tri_w) / 2 - off_y;
                        } else {
                            tar_t = tri_t - (tar_h - tri_h) - off_y;
                        }
                        cor_l = tar_l + cor_w;
                        cor_t = tri_t - (tar_w - cor_w) / 2;
                        break;
                    }
                }
            }
            if (cor_h && cor_w && this.corner) {
                this.corner.css({left: cor_l, top: cor_t, zIndex: this.s.zIndex + 1});
            }
            this.target.css({position: "absolute", left: tar_l, top: tar_t, zIndex: this.s.zIndex});
            return this;
        }, createSharp: function (dir) {
            var bgColor, bdColor, color1 = "", color2 = "";
            var objReverse = {left: "right", right: "left", bottom: "top", top: "bottom"},
                dirReverse = objReverse[dir] || "top";
            if (this.target) {
                bgColor = this.target.css("background-color");
                if (parseInt(this.target.css("border-" + dirReverse + "-width")) > 0) {
                    bdColor = this.target.css("border-" + dirReverse + "-color");
                }
                if (bdColor && bdColor !== "transparent") {
                    color1 = 'style="color:' + bdColor + ';"';
                } else {
                    color1 = 'style="display:none;"';
                }
                if (bgColor && bgColor !== "transparent") {
                    color2 = 'style="color:' + bgColor + ';"';
                } else {
                    color2 = 'style="display:none;"';
                }
            }
            var html = '<div id="floatCorner_' + dir + '" class="float_corner float_corner_' + dir + '">' + '<span class="corner corner_1" ' + color1 + '>◆</span>' + '<span class="corner corner_2" ' + color2 + '>◆</span>' + '</div>';
            if (!$("#floatCorner_" + dir).size()) {
                $("body").append($(html));
            }
            this.corner = $("#floatCorner_" + dir);
            return this;
        }, targetHold: function () {
            if (this.s.hoverHold) {
                var delay = parseInt(this.s.hideDelay, 10) || 200;
                if (this.target) {
                    this.target.hover(function () {
                        o.flagDisplay = true;
                    }, function () {
                        if (o.timerHold) {
                            clearTimeout(o.timerHold);
                        }
                        o.flagDisplay = false;
                        o.targetHold();
                    });
                }
                o.timerHold = setTimeout(function () {
                    o.displayDetect.call(o);
                }, delay);
            } else {
                this.displayDetect();
            }
            return this;
        }, loading: function () {
            this.target = $('<div class="float_loading"></div>');
            this.targetShow();
            this.target.removeData("width").removeData("height");
            return this;
        }, displayDetect: function () {
            if (!this.flagDisplay && this.display) {
                this.targetHide();
                this.timerHold = null;
            }
            return this;
        }, targetShow: function () {
            o.cornerClear();
            this.display = true;
            this.container().setWidth().position();
            this.target.show();
            if ($.isFunction(this.s.showCall)) {
                this.s.showCall.call(this.trigger, this.target);
            }
            return this;
        }, targetHide: function () {
            this.display = false;
            this.targetClear();
            this.cornerClear();
            if ($.isFunction(this.s.hideCall)) {
                this.s.hideCall.call(this.trigger);
            }
            this.target = null;
            this.trigger = null;
            this.s = {};
            this.targetProtect = false;
            return this;
        }, targetClear: function () {
            if (this.target) {
                if (this.target.data("width")) {
                    this.target.removeData("width").removeData("height");
                }
                if (this.targetProtect) {
                    this.target.children().hide().appendTo($("body"));
                }
                this.target.unbind().hide();
            }
        }, cornerClear: function () {
            if (this.corner) {
                this.corner.remove();
            }
        }, target: null, trigger: null, s: {}, cacheData: {}, targetProtect: false
    };
    $.powerFloat = {};
    $.powerFloat.hide = function () {
        o.targetHide();
    };
    var defaults = {
        width: "auto",
        offsets: {x: 0, y: 0},
        zIndex: 999,
        eventType: "hover",
        showDelay: 0,
        hideDelay: 0,
        hoverHold: true,
        hoverFollow: false,
        targetMode: "common",
        target: null,
        targetAttr: "rel",
        container: null,
        reverseSharp: false,
        position: "4-1",
        edgeAdjust: true,
        showCall: $.noop,
        hideCall: $.noop
    };
})(jQuery);
;(function (a) {
    a.fn.lazyload = function (b) {
        var c = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            mulevent: "scroll click",
            effect: "show",
            container: window,
            skip_invisible: true
        };
        if (b) {
            if (null !== b.failurelimit) {
                b.failure_limit = b.failurelimit;
                delete b.failurelimit
            }
            a.extend(c, b)
        }
        var d = this;
        var mslater = "";
        if (0 == c.event.indexOf("scroll")) {
            a(c.container).bind(c.mulevent, function (g) {
                var e = 0;
                if (mslater) {
                    clearTimeout(mslater);
                }
                mslater = setTimeout(function () {
                    d.each(function () {
                        if (c.skip_invisible && !a(this).is(":visible")) {
                            return
                        }
                        if (a.abovethetop(this, c) || a.leftofbegin(this, c)) {
                        } else {
                            if (!a.belowthefold(this, c) && !a.rightoffold(this, c)) {
                                a(this).trigger("appear")
                            } else {
                                //if (++e > c.failure_limit) {
                                //return false
                                //}
                            }
                        }
                    });
                    var f = a.grep(d, function (h) {
                        return !h.loaded
                    });
                    d = a(f)
                }, 150)


            })
        }


        this.each(function () {
            var e = this;
            e.loaded = false;
            a(e).one("appear", function () {
                if (!this.loaded) {
                    a("<img />").bind("load", function () {
                        a(e).hide().attr("src", a(e).attr("data-src"))[c.effect](c.effectspeed);
                        e.loaded = true
                    }).attr("src", a(e).attr("data-src"))
                }
            });
            if (0 != c.event.indexOf("scroll")) {
                a(e).bind(c.event, function (f) {
                    if (!e.loaded) {
                        a(e).trigger("appear")
                    }
                })
            }
        });
        a(c.container).trigger(c.event);
        return this
    };
    a.belowthefold = function (c, d) {
        if (d.container === undefined || d.container === window) {
            var b = a(window).height() + a(window).scrollTop()
        } else {
            var b = a(d.container).offset().top + a(d.container).height()
        }
        return b <= a(c).offset().top - d.threshold
    };
    a.rightoffold = function (c, d) {
        if (d.container === undefined || d.container === window) {
            var b = a(window).width() + a(window).scrollLeft()
        } else {
            var b = a(d.container).offset().left + a(d.container).width()
        }
        return b <= a(c).offset().left - d.threshold
    };
    a.abovethetop = function (c, d) {
        if (d.container === undefined || d.container === window) {
            var b = a(window).scrollTop()
        } else {
            var b = a(d.container).offset().top
        }
        return b >= a(c).offset().top + d.threshold + a(c).height()
    };
    a.leftofbegin = function (c, d) {
        if (d.container === undefined || d.container === window) {
            var b = a(window).scrollLeft()
        } else {
            var b = a(d.container).offset().left
        }
        return b >= a(c).offset().left + d.threshold + a(c).width()
    };
    a.extend(a.expr[":"], {
        "below-the-fold": function (b) {
            return a.belowthefold(b, {threshold: 0, container: window})
        }, "above-the-fold": function (b) {
            return !a.belowthefold(b, {threshold: 0, container: window})
        }, "right-of-fold": function (b) {
            return a.rightoffold(b, {threshold: 0, container: window})
        }, "left-of-fold": function (b) {
            return !a.rightoffold(b, {threshold: 0, container: window})
        }
    })
})(jQuery);