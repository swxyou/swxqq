!function (e) {
    var t = {};

    function n(i) {
        if (t[i]) return t[i].exports;
        var a = t[i] = {i: i, l: !1, exports: {}};
        return e[i].call(a.exports, a, a.exports, n), a.l = !0, a.exports
    }

    n.m = e, n.c = t, n.d = function (e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {configurable: !1, enumerable: !0, get: i})
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e['default']
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 29)
}([function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }, a = !1, o = {}, r = {}, s = !1, l = function () {
        return o
    }, c = {
        getState: function (e) {
            return e ? o[e] : o
        }, subscribe: function (e, t) {
            if (t && !t.startsWith("change:") && (t = "change:" + t), "function" != typeof e) throw new Error("Expected listener to be a function.");
            r[t = t || "all"] = r[t] || [], ~r[t].indexOf(e) || r[t].push(e)
        }, unsubscribe: function (e, t) {
            var n;
            if ("function" != typeof e) throw new Error("Expected listener to be a function.");
            r[t = t || "all"] && (n = r[t].indexOf(e)) && r[t].splice(n, 1)
        }, dispatch: function (e) {
            var t, n;
            if (void 0 === e.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
            if (s) throw new Error("Reducers may not dispatch actions.");
            try {
                s = !0, t = l(o, e)
            } finally {
                s = !1
            }
            if (t && t !== o) {
                var i = !1, a = {};
                if (n = o, o = t, Object.keys(o).forEach(function (e) {
                    if (n[e] !== o[e]) {
                        var t = r["change:" + e];
                        a[e] = o[e], i = i || !0, t && t.forEach(function (e) {
                            e()
                        })
                    }
                }), i) {
                    var c = r.all;
                    c && c.forEach(function (t) {
                        t({type: e.type, data: a})
                    })
                }
            }
            return e
        }, addRedecuer: function (e) {
            switch (void 0 === e ? "undefined" : i(e)) {
                case"function":
                    l = e;
                    break;
                case"object":
                    l = d(e);
                    break;
                default:
                    throw new Error("Expected reducer to be a function.")
            }
        }
    };

    function d(e) {
        for (var t = Object.keys(e), n = {}, i = 0; i < t.length; i++) {
            var a = t[i];
            "function" == typeof e[a] && (n[a] = e[a])
        }
        var o = Object.keys(n);
        return function () {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], i = !1, a = Object.assign({}, e), r = 0; r < o.length; r++) {
                var s = o[r], l = n[s], c = e[s], d = l(c, t);
                a[s] = d, i = i || d !== c
            }
            return i ? a : e
        }
    }

    t.createStore = function (e, t) {
        return a || (a = !0, c.addRedecuer(e)), t && (o = Object.assign({}, t)), c
    }, t.getStore = function () {
        if (a) return c;
        throw new Error("store hasn't been created!")
    }, t.combineReducer = d
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.layer = void 0;
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    n(40);
    var a, o, r = {
        getPath: function () {
            var e = document.scripts, t = e[e.length - 1], n = t.src;
            if (!t.getAttribute("merge")) return n.substring(0, n.lastIndexOf("/") + 1)
        }(),
        enter: function (e) {
            13 === e.keyCode && e.preventDefault()
        },
        config: {},
        end: {},
        btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
        type: ["dialog", "page", "iframe", "loading", "tips"]
    }, s = {
        v: "2.4",
        ie6: !!window.ActiveXObject && !window.XMLHttpRequest,
        index: 0,
        path: r.getPath,
        config: function (e, t) {
            var n = 0;
            return e = e || {}, s.cache = r.config = a.extend(r.config, e), s.path = r.config.path || s.path, "string" == typeof e.extend && (e.extend = [e.extend]), s.use("skin/layer.css", e.extend && e.extend.length > 0 ? function i() {
                var a = e.extend;
                s.use(a[a[n] ? n : n - 1], n < a.length ? (++n, i) : t)
            }() : t), this
        },
        use: function (e, t, n) {
            var i = a("head")[0], o = (e = e.replace(/\s/g, ""), /\.css$/.test(e)),
                r = document.createElement(o ? "link" : "script"), l = "layui_layer_" + e.replace(/\.|\//g, "");
            if (s.path) return o && (r.rel = "stylesheet"), r[o ? "href" : "src"] = /^http:\/\//.test(e) ? e : s.path + e, r.id = l, a("#" + l)[0] || i.appendChild(r), function e() {
                (o ? 1989 === parseInt(a("#" + l).css("width")) : s[n || l]) ? function () {
                    t && t();
                    try {
                        o || i.removeChild(r)
                    } catch (e) {
                    }
                }() : setTimeout(e, 100)
            }(), this
        },
        ready: function (e, t) {
            var n = "function" == typeof e;
            return n && (t = e), s.config(a.extend(r.config, n ? {} : {path: e}), t), this
        },
        alert: function (e, t, n) {
            var i = "function" == typeof t;
            return i && (n = t), s.open(a.extend({content: e, yes: n}, i ? {} : t))
        },
        confirm: function (e, t, n, i) {
            var o = "function" == typeof t;
            return o && (i = n, n = t), s.open(a.extend({content: e, btn: r.btn, yes: n, btn2: i}, o ? {} : t))
        },
        msg: function (e, t, n) {
            var i = "function" == typeof t, o = r.config.skin, l = (o ? o + " " + o + "-msg" : "") || "layui-layer-msg",
                d = c.anim.length - 1;
            return i && (n = t), s.open(a.extend({
                content: e,
                time: 3e3,
                shade: !1,
                skin: l,
                title: !1,
                closeBtn: !1,
                btn: !1,
                end: n
            }, i && !r.config.skin ? {
                skin: l + " layui-layer-hui",
                shift: d
            } : ((-1 === (t = t || {}).icon || void 0 === t.icon && !r.config.skin) && (t.skin = l + " " + (t.skin || "layui-layer-hui")), t)))
        },
        load: function (e, t) {
            return s.open(a.extend({type: 3, icon: e || 0, shade: .01}, t))
        },
        tips: function (e, t, n) {
            return s.open(a.extend({
                type: 4,
                content: [e, t],
                closeBtn: !1,
                time: 3e3,
                shade: !1,
                fix: !1,
                maxWidth: 210
            }, n))
        }
    }, l = function (e) {
        this.index = ++s.index, this.config = a.extend({}, this.config, r.config, e), this.creat()
    };
    l.pt = l.prototype;
    var c = ["layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close"];
    c.anim = ["layer-anim", "layer-anim-01", "layer-anim-02", "layer-anim-03", "layer-anim-04", "layer-anim-05", "layer-anim-06"], l.pt.config = {
        type: 0,
        shade: .3,
        fix: !0,
        move: c[1],
        title: "&#x4FE1;&#x606F;",
        offset: "auto",
        area: "auto",
        closeBtn: 1,
        time: 0,
        zIndex: 19891014,
        maxWidth: 360,
        shift: 0,
        icon: -1,
        scrollbar: !0,
        tips: 2
    }, l.pt.vessel = function (e, t) {
        var n = this.index, a = this.config, o = a.zIndex + n, s = "object" === i(a.title),
            l = a.maxmin && (1 === a.type || 2 === a.type),
            d = a.title ? '<div class="layui-layer-title" style="' + (s ? a.title[1] : "") + '">' + (s ? a.title[0] : a.title) + "</div>" : "";
        return a.zIndex = o, t([a.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + n + '" times="' + n + '" style="z-index:' + (o - 1) + "; background-color:" + (a.shade[1] || "#000") + "; opacity:" + (a.shade[0] || a.shade) + "; filter:alpha(opacity=" + (100 * a.shade[0] || 100 * a.shade) + ');"></div>' : "", '<div class="' + c[0] + " layui-layer-" + r.type[a.type] + (0 != a.type && 2 != a.type || a.shade ? "" : " layui-layer-border") + " " + (a.skin || "") + '" id="' + c[0] + n + '" type="' + r.type[a.type] + '" times="' + n + '" showtime="' + a.time + '" conType="' + (e ? "object" : "string") + '" style="z-index: ' + o + "; width:" + a.area[0] + ";height:" + a.area[1] + (a.fix ? "" : ";position:absolute;") + '">' + (e && 2 != a.type ? "" : d) + '<div id="' + (a.id || "") + '" class="layui-layer-content' + (0 == a.type && -1 !== a.icon ? " layui-layer-padding" : "") + (3 == a.type ? " layui-layer-loading" + a.icon : "") + '">' + (0 == a.type && -1 !== a.icon ? '<i class="layui-layer-ico layui-layer-ico' + a.icon + '"></i>' : "") + (2 == a.type || 4 == a.type || 1 == a.type && e ? "" : a.content || "") + '</div><span class="layui-layer-setwin">' + function () {
            var e = l ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
            return a.closeBtn && (e += '<a class="layui-layer-ico ' + c[7] + " " + c[7] + (a.title ? a.closeBtn : 4 == a.type ? "1" : "2") + '" href="javascript:;"></a>'), e
        }() + "</span>" + (a.btn ? function () {
            var e = "";
            "string" == typeof a.btn && (a.btn = [a.btn]);
            for (var t = 0, n = a.btn.length; t < n; t++) e += '<a class="' + c[6] + t + '">' + a.btn[t] + "</a>";
            return '<div class="' + c[6] + '">' + e + "</div>"
        }() : "") + "</div>"], d), this
    }, l.pt.creat = function () {
        var e = this, t = e.config, n = e.index, l = "object" === (void 0 === (d = t.content) ? "undefined" : i(d));
        if (!a("#" + t.id)[0]) {
            switch ("string" == typeof t.area && (t.area = "auto" === t.area ? ["", ""] : [t.area, ""]), t.type) {
                case 0:
                    t.btn = "btn" in t ? t.btn : r.btn[0], s.closeAll("dialog");
                    break;
                case 2:
                    var d = t.content = l ? t.content : [t.content || "http://layer.layui.com", "auto"];
                    t.content = '<iframe scrolling="' + (t.content[1] || "auto") + '" allowtransparency="true" id="' + c[4] + n + '" name="' + c[4] + n + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + t.content[0] + '"></iframe>';
                    break;
                case 3:
                    t.title = !1, t.closeBtn = !1, -1 === t.icon && t.icon, s.closeAll("loading");
                    break;
                case 4:
                    l || (t.content = [t.content, "body"]), t.follow = t.content[1], t.content = a("<div />").append(t.content[0], '<i class="layui-layer-TipsG"></i>')[0], t.title = !1, t.tips = "object" === i(t.tips) ? t.tips : [t.tips, !0], t.tipsMore || s.closeAll("tips")
            }
            e.vessel(l, function (i, o) {
                a("body").append(i[0]), l ? 2 == t.type || 4 == t.type ? function () {
                    var e = a(i[1]);
                    e.find(".layui-layer-content").append(t.content), a("body").append(e)
                }() : d.parents("." + c[0])[0] || (d.show().addClass("layui-layer-wrap").wrap(i[1]), a("#" + c[0] + n).find("." + c[5]).before(o)) : a("body").append(i[1]), e.layero = a("#" + c[0] + n), t.scrollbar || c.html.css("overflow", "hidden").attr("layer-full", n)
            }).auto(n), 2 == t.type && s.ie6 && e.layero.find("iframe").attr("src", d[0]), a(document).off("keydown", r.enter).on("keydown", r.enter), e.layero.on("keydown", function (e) {
                a(document).off("keydown", r.enter)
            }), 4 == t.type ? e.tips() : e.offset(), t.fix && o.on("resize", function () {
                e.offset(), (/^\d+%$/.test(t.area[0]) || /^\d+%$/.test(t.area[1])) && e.auto(n), 4 == t.type && e.tips()
            }), t.time <= 0 || setTimeout(function () {
                s.close(e.index)
            }, t.time), e.move().callback(), c.anim[t.shift] && e.layero.addClass(c.anim[t.shift])
        }
    }, l.pt.auto = function (e) {
        var t = this.config, n = a("#" + c[0] + e);
        "" === t.area[0] && t.maxWidth > 0 && (/MSIE 7/.test(navigator.userAgent) && t.btn && n.width(n.innerWidth()), n.outerWidth() > t.maxWidth && n.width(t.maxWidth));
        var i = [n.innerWidth(), n.innerHeight()], r = n.find(c[1]).outerHeight() || 0,
            s = n.find("." + c[6]).outerHeight() || 0;

        function l(e) {
            (e = n.find(e)).height(i[1] - r - s - 2 * (0 | parseFloat(e.css("padding"))))
        }

        switch (t.type) {
            case 2:
                l("iframe");
                break;
            default:
                "" === t.area[1] ? t.fix && i[1] >= o.height() && (i[1] = o.height(), l("." + c[5])) : l("." + c[5])
        }
        return this
    }, l.pt.offset = function () {
        var e = this.config, t = this.layero, n = [t.outerWidth(), t.outerHeight()], a = "object" === i(e.offset);
        this.offsetTop = (o.height() - n[1]) / 2, this.offsetLeft = (o.width() - n[0]) / 2, a ? (this.offsetTop = e.offset[0], this.offsetLeft = e.offset[1] || this.offsetLeft) : "auto" !== e.offset && (this.offsetTop = e.offset, "rb" === e.offset && (this.offsetTop = o.height() - n[1], this.offsetLeft = o.width() - n[0])), e.fix || (this.offsetTop = /%$/.test(this.offsetTop) ? o.height() * parseFloat(this.offsetTop) / 100 : parseFloat(this.offsetTop), this.offsetLeft = /%$/.test(this.offsetLeft) ? o.width() * parseFloat(this.offsetLeft) / 100 : parseFloat(this.offsetLeft), this.offsetTop += o.scrollTop(), this.offsetLeft += o.scrollLeft()), t.css({
            top: this.offsetTop,
            left: this.offsetLeft
        })
    }, l.pt.tips = function () {
        var e = this.config, t = this.layero, n = [t.outerWidth(), t.outerHeight()], i = a(e.follow);
        i[0] || (i = a("body"));
        var r = {width: i.outerWidth(), height: i.outerHeight(), top: i.offset().top, left: i.offset().left},
            s = t.find(".layui-layer-TipsG"), l = e.tips[0];
        e.tips[1] || s.remove();
        var d = e.tipsOffset, u = e.arrowOffset || [0, 0], f = 10, p = 10;
        d && ("number" == typeof d ? f = d : d && d.length && (f = void 0 === d[0] ? f : d[0], p = void 0 === d[1] ? p : d[1])), r.autoLeft = function () {
            !0 !== e.disableAutoLeft && r.left + n[0] - o.width() > 0 ? (r.tipLeft = r.left + r.width - n[0], s.css({
                right: 12,
                left: "auto"
            })) : r.tipLeft = r.left + p
        }, r.where = [function () {
            r.autoLeft(), r.tipTop = r.top - n[1] - f, s.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", e.tips[1])
        }, function () {
            r.tipLeft = r.left + r.width + p, r.tipTop = r.top, s.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", e.tips[1])
        }, function () {
            r.autoLeft(), r.tipTop = r.top + r.height + f, s.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css({
                "border-right-color": e.tips[1],
                left: r.left + r.width / 2 - r.tipLeft + u[0]
            })
        }, function () {
            r.tipLeft = r.left - n[0] - p, r.tipTop = r.top, s.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", e.tips[1])
        }], r.where[l - 1](), t.find("." + c[5]).css({
            "background-color": e.tips[1],
            "padding-right": e.closeBtn ? "30px" : ""
        }), t.css({left: r.tipLeft - (e.fix ? o.scrollLeft() : 0), top: r.tipTop - (e.fix ? o.scrollTop() : 0)})
    }, l.pt.move = function () {
        var e = this.config, t = {
            setY: 0, moveLayer: function () {
                var e = t.layero, n = parseInt(e.css("margin-left")), i = parseInt(t.move.css("left"));
                0 === n || (i -= n), "fixed" !== e.css("position") && (i -= e.parent().offset().left, t.setY = 0), e.css({
                    left: i,
                    top: parseInt(t.move.css("top")) - t.setY
                })
            }
        }, n = this.layero.find(e.move);
        return e.move && n.attr("move", "ok"), n.css({cursor: e.move ? "move" : "auto"}), a(e.move).on("mousedown", function (n) {
            if (n.preventDefault(), "ok" === a(this).attr("move")) {
                t.ismove = !0, t.layero = a(this).parents("." + c[0]);
                var i = t.layero.offset().left, r = t.layero.offset().top, s = t.layero.outerWidth() - 6,
                    l = t.layero.outerHeight() - 6;
                a("#layui-layer-moves")[0] || a("body").append('<div id="layui-layer-moves" class="layui-layer-moves" style="left:' + i + "px; top:" + r + "px; width:" + s + "px; height:" + l + 'px; z-index:2147483584"></div>'), t.move = a("#layui-layer-moves"), e.moveType && t.move.css({visibility: "hidden"}), t.moveX = n.pageX - t.move.position().left, t.moveY = n.pageY - t.move.position().top, "fixed" !== t.layero.css("position") || (t.setY = o.scrollTop())
            }
        }), a(document).mousemove(function (n) {
            if (t.ismove) {
                var i = n.pageX - t.moveX, a = n.pageY - t.moveY;
                if (n.preventDefault(), !e.moveOut) {
                    t.setY = o.scrollTop();
                    var r = o.width() - t.move.outerWidth(), s = t.setY;
                    i < 0 && (i = 0), i > r && (i = r), a < s && (a = s), a > o.height() - t.move.outerHeight() + t.setY && (a = o.height() - t.move.outerHeight() + t.setY)
                }
                t.move.css({left: i, top: a}), e.moveType && t.moveLayer(), i = a = r = s = null
            }
        }).mouseup(function () {
            try {
                t.ismove && (t.moveLayer(), t.move.remove(), e.moveEnd && e.moveEnd()), t.ismove = !1
            } catch (e) {
                t.ismove = !1
            }
        }), this
    }, l.pt.callback = function () {
        var e = this, t = e.layero, n = e.config;
        e.openLayer(), n.success && (2 == n.type ? t.find("iframe").on("load", function () {
            n.success(t, e.index)
        }) : n.success(t, e.index)), s.ie6 && e.IE6(t), t.find("." + c[6]).children("a").on("click", function () {
            var i = a(this).index();
            0 === i ? n.yes ? n.yes(e.index, t) : n.btn1 ? n.btn1(e.index, t) : s.close(e.index) : !1 === (n["btn" + (i + 1)] && n["btn" + (i + 1)](e.index, t)) || s.close(e.index)
        }), t.find("." + c[7]).on("click", function () {
            !1 === (n.cancel && n.cancel(e.index, t)) || s.close(e.index)
        }), n.shadeClose && a("#layui-layer-shade" + e.index).on("click", function () {
            s.close(e.index)
        }), t.find(".layui-layer-min").on("click", function () {
            !1 === (n.min && n.min(t)) || s.min(e.index, n)
        }), t.find(".layui-layer-max").on("click", function () {
            a(this).hasClass("layui-layer-maxmin") ? (s.restore(e.index), n.restore && n.restore(t)) : (s.full(e.index, n), setTimeout(function () {
                n.full && n.full(t)
            }, 100))
        }), n.end && (r.end[e.index] = n.end)
    }, r.reselect = function () {
        a.each(a("select"), function (e, t) {
            var n = a(this);
            n.parents("." + c[0])[0] || 1 == n.attr("layer") && a("." + c[0]).length < 1 && n.removeAttr("layer").show(), n = null
        })
    }, l.pt.IE6 = function (e) {
        var t = this, n = e.offset().top;

        function i() {
            e.css({top: n + (t.config.fix ? o.scrollTop() : 0)})
        }

        i(), o.scroll(i), a("select").each(function (e, t) {
            var n = a(this);
            n.parents("." + c[0])[0] || "none" === n.css("display") || n.attr({layer: "1"}).hide(), n = null
        })
    }, l.pt.openLayer = function () {
        s.zIndex = this.config.zIndex, s.setTop = function (e) {
            return s.zIndex = parseInt(e[0].style.zIndex), e.on("mousedown", function () {
                s.zIndex++, e.css("z-index", s.zIndex + 1)
            }), s.zIndex
        }
    }, r.record = function (e) {
        var t = [e.width(), e.height(), e.position().top, e.position().left + parseFloat(e.css("margin-left"))];
        e.find(".layui-layer-max").addClass("layui-layer-maxmin"), e.attr({area: t})
    }, r.rescollbar = function (e) {
        c.html.attr("layer-full") == e && (c.html[0].style.removeProperty ? c.html[0].style.removeProperty("overflow") : c.html[0].style.removeAttribute("overflow"), c.html.removeAttr("layer-full"))
    }, window.layer = s, s.getChildFrame = function (e, t) {
        return t = t || a("." + c[4]).attr("times"), a("#" + c[0] + t).find("iframe").contents().find(e)
    }, s.getFrameIndex = function (e) {
        return a("#" + e).parents("." + c[4]).attr("times")
    }, s.iframeAuto = function (e) {
        if (e) {
            var t = s.getChildFrame("html", e).outerHeight(), n = a("#" + c[0] + e),
                i = n.find(c[1]).outerHeight() || 0, o = n.find("." + c[6]).outerHeight() || 0;
            n.css({height: t + i + o}), n.find("iframe").css({height: t})
        }
    }, s.iframeSrc = function (e, t) {
        a("#" + c[0] + e).find("iframe").attr("src", t)
    }, s.style = function (e, t) {
        var n = a("#" + c[0] + e), i = n.attr("type"), o = n.find(c[1]).outerHeight() || 0,
            s = n.find("." + c[6]).outerHeight() || 0;
        i !== r.type[1] && i !== r.type[2] || (n.css(t), i === r.type[2] && n.find("iframe").css({height: parseFloat(t.height) - o - s}))
    }, s.min = function (e, t) {
        var n = a("#" + c[0] + e), i = n.find(c[1]).outerHeight() || 0;
        r.record(n), s.style(e, {
            width: 180,
            height: i,
            overflow: "hidden"
        }), n.find(".layui-layer-min").hide(), "page" === n.attr("type") && n.find(c[4]).hide(), r.rescollbar(e)
    }, s.restore = function (e) {
        var t = a("#" + c[0] + e), n = t.attr("area").split(",");
        t.attr("type");
        s.style(e, {
            width: parseFloat(n[0]),
            height: parseFloat(n[1]),
            top: parseFloat(n[2]),
            left: parseFloat(n[3]),
            overflow: "visible"
        }), t.find(".layui-layer-max").removeClass("layui-layer-maxmin"), t.find(".layui-layer-min").show(), "page" === t.attr("type") && t.find(c[4]).show(), r.rescollbar(e)
    }, s.full = function (e) {
        var t, n = a("#" + c[0] + e);
        r.record(n), c.html.attr("layer-full") || c.html.css("overflow", "hidden").attr("layer-full", e), clearTimeout(t), t = setTimeout(function () {
            var t = "fixed" === n.css("position");
            s.style(e, {
                top: t ? 0 : o.scrollTop(),
                left: t ? 0 : o.scrollLeft(),
                width: o.width(),
                height: o.height()
            }), n.find(".layui-layer-min").hide()
        }, 100)
    }, s.title = function (e, t) {
        a("#" + c[0] + (t || s.index)).find(c[1]).html(e)
    }, s.close = function (e) {
        var t = a("#" + c[0] + e), n = t.attr("type");
        if (t[0]) {
            if (n === r.type[1] && "object" === t.attr("conType")) {
                t.children(":not(." + c[5] + ")").remove();
                for (var i = 0; i < 2; i++) t.find(".layui-layer-wrap").unwrap().hide()
            } else {
                if (n === r.type[2]) try {
                    var o = a("#" + c[4] + e)[0];
                    o.contentWindow.document.write(""), o.contentWindow.close(), t.find("." + c[5])[0].removeChild(o)
                } catch (e) {
                }
                t[0].innerHTML = "", t.remove()
            }
            a("#layui-layer-moves, #layui-layer-shade" + e).remove(), s.ie6 && r.reselect(), r.rescollbar(e), a(document).off("keydown", r.enter), "function" == typeof r.end[e] && r.end[e](), delete r.end[e]
        }
    }, s.closeAll = function (e) {
        a.each(a("." + c[0]), function () {
            var t = a(this), n = e ? t.attr("type") === e : 1;
            n && s.close(t.attr("times")), n = null
        })
    };
    var d = s.cache || {}, u = function (e) {
        return d.skin ? " " + d.skin + " " + d.skin + "-" + e : ""
    };
    s.prompt = function (e, t) {
        "function" == typeof(e = e || {}) && (t = e);
        var n,
            i = 2 == e.formType ? '<textarea class="layui-layer-input">' + (e.value || "") + "</textarea>" : '<input type="' + (1 == e.formType ? "password" : "text") + '" class="layui-layer-input" value="' + (e.value || "") + '">';
        return s.open(a.extend({
            btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
            content: i,
            skin: "layui-layer-prompt" + u("prompt"),
            success: function (e) {
                (n = e.find(".layui-layer-input")).focus()
            },
            yes: function (i) {
                var a = n.val();
                "" === a ? n.focus() : a.length > (e.maxlength || 500) ? s.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (e.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", n, {tips: 1}) : t && t(a, i, n)
            }
        }, e))
    }, s.tab = function (e) {
        var t = (e = e || {}).tab || {};
        return s.open(a.extend({
            type: 1, skin: "layui-layer-tab" + u("tab"), title: function () {
                var e = t.length, n = 1, i = "";
                if (e > 0) for (i = '<span class="layui-layer-tabnow">' + t[0].title + "</span>"; n < e; n++) i += "<span>" + t[n].title + "</span>";
                return i
            }(), content: '<ul class="layui-layer-tabmain">' + function () {
                var e = t.length, n = 1, i = "";
                if (e > 0) for (i = '<li class="layui-layer-tabli xubox_tab_layer">' + (t[0].content || "no content") + "</li>"; n < e; n++) i += '<li class="layui-layer-tabli">' + (t[n].content || "no  content") + "</li>";
                return i
            }() + "</ul>", success: function (t) {
                var n = t.find(".layui-layer-title").children(), i = t.find(".layui-layer-tabmain").children();
                n.on("mousedown", function (t) {
                    t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
                    var n = a(this), o = n.index();
                    n.addClass("layui-layer-tabnow").siblings().removeClass("layui-layer-tabnow"), i.eq(o).show().siblings().hide(), "function" == typeof e.change && e.change(o)
                })
            }
        }, e))
    }, s.photos = function (e, t, n) {
        var i = {};
        if ((e = e || {}).photos) {
            var o = e.photos.constructor === Object, r = o ? e.photos : {}, l = r.data || [], c = r.start || 0;
            if (i.imgIndex = 1 + (0 | c), e.img = e.img || "img", o) {
                if (0 === l.length) return s.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")
            } else {
                var d = a(e.photos), f = function () {
                    l = [], d.find(e.img).each(function (e) {
                        var t = a(this);
                        t.attr("layer-index", e), l.push({
                            alt: t.attr("alt"),
                            pid: t.attr("layer-pid"),
                            src: t.attr("layer-src") || t.attr("src"),
                            thumb: t.attr("src")
                        })
                    })
                };
                if (f(), 0 === l.length) return;
                if (t || d.on("click", e.img, function () {
                    var t = a(this).attr("layer-index");
                    s.photos(a.extend(e, {photos: {start: t, data: l, tab: e.tab}, full: e.full}), !0), f()
                }), !t) return
            }
            i.imgprev = function (e) {
                i.imgIndex--, i.imgIndex < 1 && (i.imgIndex = l.length), i.tabimg(e)
            }, i.imgnext = function (e, t) {
                i.imgIndex++, i.imgIndex > l.length && (i.imgIndex = 1, t) || i.tabimg(e)
            }, i.keyup = function (e) {
                if (!i.end) {
                    var t = e.keyCode;
                    e.preventDefault(), 37 === t ? i.imgprev(!0) : 39 === t ? i.imgnext(!0) : 27 === t && s.close(i.index)
                }
            }, i.tabimg = function (t) {
                l.length <= 1 || (r.start = i.imgIndex - 1, s.close(i.index), s.photos(e, !0, t))
            }, i.event = function () {
                i.bigimg.hover(function () {
                    i.imgsee.show()
                }, function () {
                    i.imgsee.hide()
                }), i.bigimg.find(".layui-layer-imgprev").on("click", function (e) {
                    e.preventDefault(), i.imgprev()
                }), i.bigimg.find(".layui-layer-imgnext").on("click", function (e) {
                    e.preventDefault(), i.imgnext()
                }), a(document).on("keyup", i.keyup)
            }, i.loadi = s.load(1, {shade: !("shade" in e) && .9, scrollbar: !1}), function (e, t, n) {
                var i = new Image;
                if (i.src = e, i.complete) return t(i);
                i.onload = function () {
                    i.onload = null, t(i)
                }, i.onerror = function (e) {
                    i.onerror = null, n(e)
                }
            }(l[c].src, function (t) {
                s.close(i.loadi), i.index = s.open(a.extend({
                    type: 1,
                    area: function () {
                        var n = [t.width, t.height], i = [a(window).width() - 50, a(window).height() - 50];
                        return !e.full && n[0] > i[0] && (n[0] = i[0], n[1] = n[0] * t.height / t.width), [n[0] + "px", n[1] + "px"]
                    }(),
                    title: !1,
                    shade: .9,
                    shadeClose: !0,
                    closeBtn: !1,
                    move: ".layui-layer-phimg img",
                    moveType: 1,
                    scrollbar: !1,
                    moveOut: !0,
                    shift: 5 * Math.random() | 0,
                    skin: "layui-layer-photos" + u("photos"),
                    content: '<div class="layui-layer-phimg"><img src="' + l[c].src + '" alt="' + (l[c].alt || "") + '" layer-pid="' + l[c].pid + '"><div class="layui-layer-imgsee">' + (l.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : "") + '<div class="layui-layer-imgbar" style="display:' + (n ? "block" : "") + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (l[c].alt || "") + "</a><em>" + i.imgIndex + "/" + l.length + "</em></span></div></div></div>",
                    success: function (t, n) {
                        i.bigimg = t.find(".layui-layer-phimg"), i.imgsee = t.find(".layui-layer-imguide,.layui-layer-imgbar"), i.event(t), e.tab && e.tab(l[c], t)
                    },
                    end: function () {
                        i.end = !0, a(document).off("keyup", i.keyup)
                    }
                }, e))
            }, function () {
                s.close(i.loadi), s.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
                    time: 3e4,
                    btn: ["&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;"],
                    yes: function () {
                        l.length > 1 && i.imgnext(!0, !0)
                    }
                })
            })
        }
    }, r.run = function () {
        a = jQuery, o = a(window), c.html = a("html"), s.open = function (e) {
            return new l(e).index
        }
    }, r.run(), t.layer = s
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };

    /*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
    function a(e) {
        return e.replace(_, "").replace(x, ",").replace(j, "").replace(w, "").replace(D, "").split(k)
    }

    function o(e) {
        return "'" + e.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
    }

    function r(e, t) {
        function n(e) {
            return f += e.split(/\n/).length - 1, d && (e = e.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), e && (e = g[1] + o(e) + g[2] + "\n"), e
        }

        function i(e) {
            var n = f;
            if (c ? e = c(e, t) : r && (e = e.replace(/\n/g, function () {
                return "$line=" + ++f + ";"
            })), 0 === e.indexOf("=")) {
                var i = u && !/^=[=#]/.test(e);
                if (e = e.replace(/^=[=#]?|[\s;]*$/g, ""), i) {
                    var o = e.replace(/\s*\([^\)]+\)/, "");
                    v[o] || /^(include|print)$/.test(o) || (e = "$escape(" + e + ")")
                } else e = "$string(" + e + ")";
                e = g[1] + e + g[2]
            }
            return r && (e = "$line=" + n + ";" + e), b(a(e), function (e) {
                var t;
                e && !p[e] && (t = "print" === e ? _ : "include" === e ? x : v[e] ? "$utils." + e : m[e] ? "$helpers." + e : "$data." + e, j += e + "=" + t + ",", p[e] = !0)
            }), e + "\n"
        }

        var r = t.debug, s = t.openTag, l = t.closeTag, c = t.parser, d = t.compress, u = t.escape, f = 1,
            p = {$data: 1, $filename: 1, $utils: 1, $helpers: 1, $out: 1, $line: 1}, h = "".trim,
            g = h ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
            y = h ? "$out+=text;return $out;" : "$out.push(text);",
            _ = "function(){var text=''.concat.apply('',arguments);" + y + "}",
            x = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + y + "}",
            j = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (r ? "$line=0," : ""), w = g[0],
            D = "return new String(" + g[3] + ");";
        b(e.split(s), function (e) {
            var t = (e = e.split(l))[0], a = e[1];
            1 === e.length ? w += n(t) : (w += i(t), a && (w += n(a)))
        });
        var k = j + w + D;
        r && (k = "try{" + k + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + o(e) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
            var C = new Function("$data", "$filename", k);
            return C.prototype = v, C
        } catch (e) {
            throw e.temp = "function anonymous($data,$filename) {" + k + "}", e
        }
    }

    var s = function (e, t) {
        return "string" == typeof t ? y(t, {filename: e}) : d(e, t)
    };
    s.version = "3.0.0", s.config = function (e, t) {
        l[e] = t
    };
    var l = s.defaults = {openTag: "<%", closeTag: "%>", escape: !0, cache: !0, compress: !1, parser: null},
        c = s.cache = {};
    s.render = function (e, t) {
        return y(e, t)
    };
    var d = s.renderFile = function (e, t) {
        var n = s.get(e) || g({filename: e, name: "Render Error", message: "Template not found"});
        return t ? n(t) : n
    };
    s.get = function (e) {
        var t;
        if (c[e]) t = c[e]; else if ("object" == ("undefined" == typeof document ? "undefined" : i(document))) {
            var n = document.getElementById(e);
            if (n) {
                var a = (n.value || n.innerHTML).replace(/^\s*|\s*$/g, "");
                t = y(a, {filename: e})
            }
        }
        return t
    };
    var u = function e(t, n) {
        return "string" != typeof t && ("number" === (n = void 0 === t ? "undefined" : i(t)) ? t += "" : t = "function" === n ? e(t.call(t)) : ""), t
    }, f = {"<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "&": "&#38;"}, p = function (e) {
        return f[e]
    }, h = Array.isArray || function (e) {
        return "[object Array]" === {}.toString.call(e)
    }, v = s.utils = {
        $helpers: {}, $include: d, $string: u, $escape: function (e) {
            return u(e).replace(/&(?![\w#]+;)|[<>"']/g, p)
        }, $each: function (e, t) {
            var n, i;
            if (h(e)) for (n = 0, i = e.length; i > n; n++) t.call(e, e[n], n, e); else for (n in e) t.call(e, e[n], n)
        }
    };
    s.helper = function (e, t) {
        m[e] = t
    };
    var m = s.helpers = v.$helpers;
    s.onerror = function (e) {
        var t = "Template Error\n\n";
        for (var n in e) t += "<" + n + ">\n" + e[n] + "\n\n";
        "object" == ("undefined" == typeof console ? "undefined" : i(console)) && console.error(t)
    };
    var g = function (e) {
            return s.onerror(e), function () {
                return "{Template Error}"
            }
        }, y = s.compile = function (e, t) {
            function n(n) {
                try {
                    return new o(n, a) + ""
                } catch (i) {
                    return t.debug ? g(i)() : (t.debug = !0, y(e, t)(n))
                }
            }

            for (var i in t = t || {}, l) void 0 === t[i] && (t[i] = l[i]);
            var a = t.filename;
            try {
                var o = r(e, t)
            } catch (e) {
                return e.filename = a || "anonymous", e.name = "Syntax Error", g(e)
            }
            return n.prototype = o.prototype, n.toString = function () {
                return o.toString()
            }, a && t.cache && (c[a] = n), n
        }, b = v.$each,
        _ = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
        x = /[^\w$]+/g,
        j = new RegExp(["\\b" + "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined".replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
        w = /^\d[^,]*|,\d[^,]*/g, D = /^,+|,+$/g, k = /^$|,+/, C = s;
    t.template = C
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = 150, a = $(window), o = !0, r = void 0, s = [], l = void 0, c = void 0;

    function d(e, t) {
        s.push({target: e, callback: t}), o && (o = !1, a.on("resize", f).on("resize scroll", h), f(), h())
    }

    function u(e) {
        var t = -1;
        s.some(function (n, i) {
            if (n.target === e) return t = i, !0
        }), -1 !== t && s.splice(t, 1), 0 === s.length && (o = !0, a.off("resize", f).off("resize scroll", h))
    }

    function f() {
        clearTimeout(l), l = setTimeout(p, i)
    }

    function p() {
        r = a.height(), s.forEach(function (e) {
            e.visible = e.target.is(":visible"), e.offset = e.target.offset(), e.width = e.target.width(), e.height = e.target.height()
        })
    }

    function h() {
        clearTimeout(c), c = setTimeout(v, i)
    }

    function v() {
        var e = a.scrollTop(), t = !1;
        s.filter(function (n) {
            return !!(n.visible && n.offset && n.offset.top < r + e && n.offset.top + n.height > e) && (t = !0, !0)
        }).forEach(function (e) {
            e.callback && e.callback()
        }), t && a.trigger("resize")
    }

    t.bind = d, t.unbind = u, t.on = d, t.off = u
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.LOAD_CALENDAR = "LOAD_CALENDAR", t.LOAD_ORIGIN_CALENDAR = "LOAD_ORIGIN_CALENDAR", t.LOAD_CALENDAR_ROOM_BUDGET = "LOAD_CALENDAR_ROOM_BUDGET", t.CHANGE_DEPART_DATE = "CHANGE_DEPART_DATE", t.CHANGE_DEPART_CITY = "CHANGE_DEPART_CITY", t.CHANGE_BACK_CITY = "CHANGE_BACK_CITY", t.CHANGE_ADULT = "CHANGE_ADULT", t.CHANGE_CHILD = "CHANGE_CHILD", t.CHANGE_FREE_CHILD = "CHANGE_FREE_CHILD", t.CHANGE_DEPART_DATE_TARGET = "CHANGE_DEPART_DATE_TARGET", t.CHANGE_PRODUCT_STATUS = "CHANGE_PRODUCT_STATUS", t.CHANGE_JOURNEY_DAY = "CHANGE_JOURNEY_DAY"
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = "refresh=1", a = window.siteHost || "http://www.tuniu.com";

    function o(e) {
        return function () {
            var e = location.href, t = /\brefresh\b/.test(e);
            return !t && window.pageData && (t = !!window.pageData.refresh), t
        }() && (e += -1 === e.indexOf("?") ? "?" : "&", e += i), app_url(e)
    }

    function r(e, t) {
        var n = Object.keys(t).filter(function (e) {
            return t[e]
        }).map(function (e) {
            return e + "=" + t[e]
        }).join("&");
        return n && (e += (-1 === e.indexOf("?") ? "?" : "&") + n), e
    }

    t['default'] = {
        host: a, url: {
            submit: function (e) {
                return o("/book/" + e.productId + "/step1")
            }, calendar: function () {
                return o("api/group/calendar")
            }, getJourneyById: function () {
                return o("api/group/journey")
            }, visa: function (e) {
                return o(r("api/group/visa", {
                    productId: e.productId,
                    bookCode: e.bookCityCode,
                    departCode: e.departCityCode
                }))
            }, upgrade: function (e) {
                return o(r("api/group/upgrade", {
                    productId: e.productId,
                    bookCode: e.bookCityCode,
                    departCode: e.departCityCode
                }))
            }, visaSend: function () {
                return o("api/group/send-visa")
            }, visaPrint: function (e) {
                var t = Object.keys(e).map(function (t) {
                    var n = e[t];
                    return !!n && (Array.isArray(n) ? t + "=" + n.map(function (e) {
                        return e.id + ":" + e.name
                    }).join(",") : t + "=" + n)
                }).filter(function (e) {
                    return e
                }).join("&");
                return a + "/tn?r=visa/VisaDetail/ShowEmailTemplate&" + t
            }, couponReceive: function (e) {
                return o(r("api/group/receive-coupon", {couponId: e.couponId}))
            }, recommend: function () {
                return o("api/selfTour/recommend")
            }, guide: function (e) {
                return o(r("api/group/guide", {productId: e.productId}))
            }, retail: function (e) {
                return o(r("api/group/retail", {bookCode: e.bookCode}))
            }, login: function () {
                return "http://www.tuniu.com/u/login"
            }, cities: function () {
                o("api/tour/cities")
            }, loginDialog: function () {
                var e = location.host.split(".")[0];
                return "https://passport.tuniu.com/login/iframe?origin=" + encodeURIComponent("http://www.tuniu.com/ssoConnect/Iframe?reload=detail&domain=" + e)
            }, ask: function (e) {
                return o(r("api/group/ask", {productId: e.productId}))
            }, checkName: function (e) {
                return o(r("api/group/checkName", {identify: e.identify}))
            }, addAsk: function () {
                return o("api/group/addAsk")
            }, qa: function () {
                return o("api/group/qa")
            }, related: function () {
                return o("api/group/recommend")
            }, checkFavoriteState: function () {
                return o("api/tour/check-favorite-state")
            }, addFavorite: function () {
                return o("api/tour/add-favorite")
            }, removeFavorite: function () {
                return o("api/tour/remove-favorite")
            }, supplier: function () {
                return o("api/group/supplier")
            }, aggregation: function () {
                return o("api/group/aggregation")
            }, page: function (e) {
                var t = ["/tour", e.productId, e.bookCity, e.departCity, e.backCity].join("/");
                return e.userTel && (t += "?user_tel=" + e.userTel), o(t)
            }, trace: function () {
                return "/xapi/track"
            }
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.record = function (e, t) {
        return
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }();
    var a = [], o = $("body"), r = $(window), s = function () {
        function e(t, n) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), t = $(t), this.disabled = !1, this.options = Object.assign({selectFirst: !0, ctx: o}, n);
            var i = this.options.ctx;
            this.$element = t, this.tabs = t.find("[data-rel]").toArray().map(function (e) {
                return {$tab: e = $(e), $target: i.find(e.data("rel"))}
            }).filter(function (e) {
                return e.$target.length
            }), this.options.selectFirst && this.active(this.tabs[0]), this.bind()
        }

        return i(e, [{
            key: "bind", value: function () {
                var e = this;
                this.tabs.forEach(function (t) {
                    t.$tab.click(function () {
                        t.active || this.active(t)
                    }.bind(e))
                })
            }
        }, {
            key: "active", value: function (e) {
                e && (this.tabs.forEach(function (t) {
                    e === t ? (t.$tab.addClass("active"), t.$target.addClass("active"), t.active = !0) : (t.$tab.removeClass("active"), t.$target.removeClass("active"), t.active = !1)
                }), $.isFunction(this.options.onactive) && this.options.onactive(e), r.trigger("resize"))
            }
        }]), e
    }();
    t.createTaber = function (e, t) {
        var n = new s(e, t);
        return a.push(n), n
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.LOAD_COMMENT = "LOAD_COMMENT", t.CHANGE_COMMENT_FILTER = "CHANGE_COMMENT_FILTER", t.CHANG_DETAIL_JOURNEY = "CHANG_DETAIL_JOURNEY"
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.createTip = t.Tip = void 0;
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }(), a = n(1);
    var o = function () {
        function e(t, n) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this._id = (new Date).getTime() + "" + Math.random(), this.$target = t, this.options = Object.assign({
                delay: 100,
                type: "hover"
            }, n), this.dialogOptions = Object.assign({
                type: 4,
                tips: 3,
                shift: 0,
                shade: !1,
                fix: !1,
                closeBtn: !1,
                skin: "layui-layer-rim",
                area: ["300px", "auto"],
                tipsOffset: [10, -27]
            }, this.options.dialog), this.dialogOptions.content = [this.getContent(), this.$target], this.options.delay && this.options.hoverIncludeTip && (this.dialogOptions.success = function (e) {
                var t = this;
                e.hover(function () {
                    clearTimeout(t.timer)
                }, this.close.bind(this))
            }.bind(this)), "click" === this.options.type && (this.dialogOptions.success = function (e) {
                e.click(function (e) {
                    e.stopPropagation()
                })
            }), this.dialog = null, this.timer = null, this.visible = !1, this.bind()
        }

        return i(e, [{
            key: "bind", value: function () {
                switch (this.options.type) {
                    case"click":
                        this.$target.click(this.toggle.bind(this)).click(function (e) {
                            $(document).trigger("customclick", this._id), e.stopPropagation()
                        }.bind(this)), $(document).click(this.close.bind(this)).on("customclick", function (e, t) {
                            t !== this._id && this.close()
                        }.bind(this));
                        break;
                    case"hover":
                    default:
                        this.$target.hover(this.open.bind(this), this.close.bind(this))
                }
            }
        }, {
            key: "getContent", value: function () {
                return "function" == typeof this.options.content ? this.options.content() : this.options.content
            }
        }, {
            key: "toggle", value: function () {
                this.visible ? this.close() : this.open()
            }
        }, {
            key: "open", value: function () {
                var e = this;
                $.isFunction(this.options.width) && (this.dialogOptions.area[0] = this.options.width() + "px"), this.options.delay && "click" !== this.options.type ? (clearTimeout(this.timer), this.timer = setTimeout(function () {
                    e.visible || (e.dialog = a.layer.open(e.dialogOptions), e.visible = !0)
                }, this.options.delay)) : (this.dialog = a.layer.open(this.dialogOptions), this.$target.addClass("expand"), this.visible = !0)
            }
        }, {
            key: "close", value: function () {
                var e = this;
                this.options.delay && this.options.hoverIncludeTip ? (clearTimeout(this.timer), this.timer = setTimeout(function () {
                    a.layer.close(e.dialog), e.visible = !1
                }, this.options.delay)) : (a.layer.close(this.dialog), this.$target.removeClass("expand"), clearTimeout(this.timer), this.visible = !1)
            }
        }]), e
    }();
    t['default'] = o, t.Tip = o, t.createTip = function () {
    }
}, function (e, t, n) {
    "use strict";
    /**
     * @file Embedded JavaScript templating engine.
     * @author Matthew Eernisse <mde@fleegix.org>
     * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
     * @project EJS
     * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
     */Object.defineProperty(t, "__esModule", {value: !0}), t.VERSION = t.__express = t.escapeXML = t.clearCache = t.renderFile = t.render = t.compile = t.resolveInclude = t.localsName = t.cache = void 0;
    var i = o(n(61)), a = o(n(63));

    function o(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }

    var r = {}, s = !1, l = o(n(64)).version, c = "%", d = "locals",
        u = ["cache", "filename", "delimiter", "scope", "context", "debug", "compileDebug", "client", "_with", "root", "rmWhitespace", "strict", "localsName"],
        f = /;\s*$/, p = /^\uFEFF/, h = t.cache = a.cache, v = t.localsName = d,
        m = t.resolveInclude = function (e, t, n) {
            var a = i.dirname, o = i.extname, r = (0, i.resolve)(n ? t : a(t), e);
            return o(e) || (r += ".ejs"), r
        };

    function g(e, t) {
        var n;
        if ("/" == e.charAt(0)) n = m(e.replace(/^\/*/, ""), t.root || "/", !0); else {
            if (!t.filename) throw new Error("`include` use relative path requires the 'filename' option.");
            n = m(e, t.filename)
        }
        return n
    }

    function y(e, t) {
        var n, i = e.filename, a = arguments.length > 1;
        if (e.cache) {
            if (!i) throw new Error("cache option requires a filename");
            if (n = h.get(i)) return n;
            a || (t = r.readFileSync(i).toString().replace(p, ""))
        } else if (!a) {
            if (!i) throw new Error("Internal EJS error: no file name or template provided");
            t = r.readFileSync(i).toString().replace(p, "")
        }
        return n = x(t, e), e.cache && h.set(i, n), n
    }

    function b(e, t, n, i) {
        var a = t.split("\n"), o = Math.max(i - 3, 0), r = Math.min(a.length, i + 3),
            s = a.slice(o, r).map(function (e, t) {
                var n = t + o + 1;
                return (n == i ? " >> " : "    ") + n + "| " + e
            }).join("\n");
        throw e.path = n, e.message = (n || "ejs") + ":" + i + "\n" + s + "\n\n" + e.message, e
    }

    function _(e, t) {
        u.forEach(function (n) {
            void 0 !== e[n] && (t[n] = e[n])
        })
    }

    var x = t.compile = function (e, t) {
        return t && t.scope && (s || (console.warn("`scope` option is deprecated and will be removed in EJS 3"), s = !0), t.context || (t.context = t.scope), delete t.scope), new w(e, t).compile()
    }, j = (t.render = function (e, t, n) {
        var i = t || {}, a = n || {};
        return 2 == arguments.length && _(i, a), y(a, e)(i)
    }, t.renderFile = function () {
        var e, t = Array.prototype.slice.call(arguments), n = t.shift(), i = t.pop(), o = t.shift() || {},
            r = t.pop() || {};
        r = a.shallowCopy({}, r), 3 == arguments.length && (o.settings && o.settings["view options"] ? _(o.settings["view options"], r) : _(o, r)), r.filename = n;
        try {
            e = y(r)(o)
        } catch (e) {
            return i(e)
        }
        return i(null, e)
    });
    t.clearCache = function () {
        h.reset()
    };

    function w(e, t) {
        t = t || {};
        var n = {};
        this.templateText = e, this.mode = null, this.truncate = !1, this.currentLine = 1, this.source = "", this.dependencies = [], n.client = t.client || !0, n.escapeFunction = t.escape || a.escapeXML, n.compileDebug = !1 !== t.compileDebug, n.debug = !!t.debug, n.filename = t.filename, n.delimiter = t.delimiter || c, n.strict = t.strict || !1, n.context = t.context, n.cache = t.cache || !1, n.rmWhitespace = t.rmWhitespace, n.root = t.root, n.localsName = t.localsName || v || d, n.strict ? n._with = !1 : n._with = void 0 === t._with || t._with, this.opts = n, this.regex = this.createRegex()
    }

    w.modes = {
        EVAL: "eval",
        ESCAPED: "escaped",
        RAW: "raw",
        COMMENT: "comment",
        LITERAL: "literal"
    }, w.prototype = {
        createRegex: function () {
            var e = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)", t = a.escapeRegExpChars(this.opts.delimiter);
            return e = e.replace(/%/g, t), new RegExp(e)
        }, compile: function () {
            var e, t, n = this.opts, i = "", o = "", r = n.escapeFunction;
            this.source || (this.generateSource(), i += "  var __output = [], __append = __output.push.bind(__output);\n", !1 !== n._with && (i += "  with (" + n.localsName + " || {}) {\n", o += "  }\n"), o += '  return __output.join("");\n', this.source = i + this.source + o), e = n.compileDebug ? "var __line = 1\n  , __lines = " + JSON.stringify(this.templateText) + "\n  , __filename = " + (n.filename ? JSON.stringify(n.filename) : "undefined") + ";\ntry {\n" + this.source + "} catch (e) {\n  rethrow(e, __lines, __filename, __line);\n}\n" : this.source, n.debug && console.log(e), n.client && (e = "escape = escape || " + r.toString() + ";\n" + e, n.compileDebug && (e = "rethrow = rethrow || " + b.toString() + ";\n" + e)), n.strict && (e = '"use strict";\n' + e);
            try {
                t = new Function(n.localsName + ", escape, include, rethrow", e)
            } catch (e) {
                throw e instanceof SyntaxError && (n.filename && (e.message += " in " + n.filename), e.message += " while compiling ejs"), e
            }
            if (n.client) return t.dependencies = this.dependencies, function () {
                return t.apply(n.context, Array.from(arguments))
            };
            var s = function (e) {
                return t.apply(n.context, [e || {}, r, function (t, i) {
                    var o = a.shallowCopy({}, e);
                    return i && (o = a.shallowCopy(o, i)), function (e, t) {
                        var n = a.shallowCopy({}, t);
                        return n.filename = g(e, n), y(n)
                    }(t, n)(o)
                }, b])
            };
            return s.dependencies = this.dependencies, s
        }, generateSource: function () {
            this.opts.rmWhitespace && (this.templateText = this.templateText.replace(/\r/g, "").replace(/^\s+|\s+$/gm, "")), this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");
            var e = this, t = this.parseTemplateText(), n = this.opts.delimiter;
            t && t.length && t.forEach(function (i, o) {
                var s, l, c, d, u, f;
                if (0 === i.indexOf("<" + n) && 0 !== i.indexOf("<" + n + n) && (l = t[o + 2]) != n + ">" && l != "-" + n + ">" && l != "_" + n + ">") throw new Error('Could not find matching close tag for "' + i + '".');
                if ((c = i.match(/^\s*include\s+(\S+)/)) && (s = t[o - 1]) && (s == "<" + n || s == "<" + n + "-" || s == "<" + n + "_")) return d = a.shallowCopy({}, e.opts), u = function (e, t) {
                    var n, i, o = a.shallowCopy({}, t);
                    n = g(e, o), i = r.readFileSync(n).toString().replace(p, ""), o.filename = n;
                    var s = new w(i, o);
                    return s.generateSource(), {source: s.source, filename: n, template: i}
                }(c[1], d), f = e.opts.compileDebug ? "    ; (function(){\n      var __line = 1\n      , __lines = " + JSON.stringify(u.template) + "\n      , __filename = " + JSON.stringify(u.filename) + ";\n      try {\n" + u.source + "      } catch (e) {\n        rethrow(e, __lines, __filename, __line);\n      }\n    ; }).call(this)\n" : "    ; (function(){\n" + u.source + "    ; }).call(this)\n", e.source += f, void e.dependencies.push(m(c[1], d.filename));
                e.scanLine(i)
            })
        }, parseTemplateText: function () {
            for (var e, t = this.templateText, n = this.regex, i = n.exec(t), a = []; i;) 0 !== (e = i.index) && (a.push(t.substring(0, e)), t = t.slice(e)), a.push(i[0]), t = t.slice(i[0].length), i = n.exec(t);
            return t && a.push(t), a
        }, scanLine: function (e) {
            var t, n = this, i = this.opts.delimiter;

            function a() {
                n.truncate ? (e = e.replace(/^(?:\r\n|\r|\n)/, ""), n.truncate = !1) : n.opts.rmWhitespace && (e = e.replace(/^\n/, "")), e && (e = (e = (e = (e = e.replace(/\\/g, "\\\\")).replace(/\n/g, "\\n")).replace(/\r/g, "\\r")).replace(/"/g, '\\"'), n.source += '    ; __append("' + e + '")\n')
            }

            switch (t = e.split("\n").length - 1, e) {
                case"<" + i:
                case"<" + i + "_":
                    this.mode = w.modes.EVAL;
                    break;
                case"<" + i + "=":
                    this.mode = w.modes.ESCAPED;
                    break;
                case"<" + i + "-":
                    this.mode = w.modes.RAW;
                    break;
                case"<" + i + "#":
                    this.mode = w.modes.COMMENT;
                    break;
                case"<" + i + i:
                    this.mode = w.modes.LITERAL, this.source += '    ; __append("' + e.replace("<" + i + i, "<" + i) + '")\n';
                    break;
                case i + i + ">":
                    this.mode = w.modes.LITERAL, this.source += '    ; __append("' + e.replace(i + i + ">", i + ">") + '")\n';
                    break;
                case i + ">":
                case"-" + i + ">":
                case"_" + i + ">":
                    this.mode == w.modes.LITERAL && a(), this.mode = null, this.truncate = 0 === e.indexOf("-") || 0 === e.indexOf("_");
                    break;
                default:
                    if (this.mode) {
                        switch (this.mode) {
                            case w.modes.EVAL:
                            case w.modes.ESCAPED:
                            case w.modes.RAW:
                                e.lastIndexOf("//") > e.lastIndexOf("\n") && (e += "\n")
                        }
                        switch (this.mode) {
                            case w.modes.EVAL:
                                this.source += "    ; " + e + "\n";
                                break;
                            case w.modes.ESCAPED:
                                this.source += "    ; __append(escape(" + e.replace(f, "").trim() + "))\n";
                                break;
                            case w.modes.RAW:
                                this.source += "    ; __append(" + e.replace(f, "").trim() + ")\n";
                                break;
                            case w.modes.COMMENT:
                                break;
                            case w.modes.LITERAL:
                                a()
                        }
                    } else a()
            }
            n.opts.compileDebug && t && (this.currentLine += t, this.source += "    ; __line = " + this.currentLine + "\n")
        }
    };
    t.escapeXML = a.escapeXML, t.__express = j, t.VERSION = l
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }();
    self;
    var a = $(window), o = $("body"), r = [];

    function s(e) {
        var t = e.offset() || {left: 0, top: 0}, n = e.width() || 0, i = e.height() || 0;
        return {left: t.left, right: t.left + n, top: t.top, bottom: t.top + i, width: n, height: i}
    }

    var l = function () {
        function e(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), t = $(t), this.fixed = !1, this.inited = !1, this.disabled = !1, this.range = null, this.$element = t, this.$target = t.children(":first-child"), this.originPosition = this._getOriginRectInfo(), this.originStyle = {
                position: this.$target.css("position"),
                left: this.$target.css("left"),
                top: this.$target.css("top")
            }, this.rangeRef = Object.assign({
                left: t,
                right: t,
                top: t,
                bottom: t
            }, n.range), this.ctx = n.ctx || o, this.offset = n.offset || {}, this.rangeOffset = n.rangeOffset || {}, void 0 === this.offset.left && (this.offset.left = this.originPosition.left - s(this.rangeRef.left).left), this.offset = Object.assign({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, this.offset), this.rangeOffset = Object.assign({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, this.rangeOffset), t.is(":visible") && this.position()
        }

        return i(e, [{
            key: "_getOriginRectInfo", value: function () {
                var e = this.$element.offset() || {left: 0, top: 0}, t = this.$target.width() || 0,
                    n = this.$target.height() || 0;
                return {left: e.left, right: e.left + t, top: e.top, bottom: e.top + n, width: t, height: n}
            }
        }, {
            key: "_updateOriginPosition", value: function () {
                this.originPosition = this._getOriginRectInfo()
            }
        }, {
            key: "_updateRange", value: function () {
                var e = this, t = {};
                return ["left", "right", "top", "bottom"].forEach(function (n) {
                    t[n] = s(e.rangeRef[n])[n] + e.rangeOffset[n]
                }), this.range = t, t
            }
        }, {
            key: "_update", value: function () {
                this._updateOriginPosition(), this._updateRange(), this.inited = !0
            }
        }, {
            key: "update", value: function () {
                this.disabled || (this._update(), this.position())
            }
        }, {
            key: "position", value: function (e, t) {
                !1 === this.inited && this._update(), e = void 0 === e ? a.scrollTop() : e, t = void 0 === t ? a.scrollLeft() : t;
                var n = this.originPosition, i = this.range, o = this.offset.top;
                (e += o) > i.top && e <= i.bottom ? this.$target.css({
                    position: "fixed",
                    left: i.left + this.offset.left - t,
                    top: Math.min(o, i.bottom - (e - o + n.height))
                }).addClass("fixed") : this.fixed || (this.fixed = !1, this.$target.css(this.originStyle).removeClass("fixed"))
            }
        }, {
            key: "disable", value: function () {
                this.disabled = !0
            }
        }, {
            key: "enable", value: function () {
                this.disabled = !1
            }
        }]), e
    }();
    var c = void 0;

    function d() {
        r.forEach(function (e) {
            e.update()
        })
    }

    var u = void 0;

    function f() {
        var e = a.scrollTop(), t = a.scrollLeft();
        r.forEach(function (n) {
            n.position(e, t)
        })
    }

    a.on("resize", function (e, t) {
        "FIXER" !== t && (clearTimeout(c), c = setTimeout(d, 150))
    }).on("scroll", function (e, t) {
        "FIXER" !== t && (clearTimeout(u), u = setTimeout(f, 10))
    }), t.createFixer = function (e, t) {
        var n = new l(e, t);
        return r.push(n), n
    }, t.updateFixer = function (e) {
        e && e instanceof l ? e.update() : r.forEach(function (e) {
            e.update()
        })
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }();
    var a = $(window), o = $("body"), r = [], s = function () {
        function e(t, n) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), t = $(t), this.inited = !1, this.disabled = !1, this.visible = !1, this.options = Object.assign({
                offset: 0,
                ctx: o,
                attr: "data-rel",
                firstDefault: !0
            }, n), this.firstDefault = this.options.firstDefault, this.$element = t;
            var i = this.options.ctx, a = this.options.attr;
            this.tabs = t.find("[" + a + "]").toArray().map(function (e) {
                return {$tab: e = $(e), $target: i.find(e.attr(a)), offset: {left: 0, top: 0, width: 0, height: 0}}
            }).filter(function (e) {
                if (e.$target.length) return !0;
                e.$tab.remove()
            }), this.update(), this.bind()
        }

        return i(e, [{
            key: "bind", value: function () {
                var e = this.options.offset;
                this.tabs.forEach(function (t) {
                    t.$tab.click(function () {
                        t.active || a.scrollTop(t.offset.top - e)
                    })
                })
            }
        }, {
            key: "isAvailable", value: function () {
                return !this.disabled && this.visible
            }
        }, {
            key: "_updateVisibility", value: function () {
                this.visible = this.$element.is(":visible")
            }
        }, {
            key: "_updateTabs", value: function () {
                this.isAvailable() && (this.tabs = this.tabs.filter(function (e) {
                    return !(!e.$target || !e.$target[0].parentNode) || (e.$tab.remove(), !1)
                }))
            }
        }, {
            key: "_update", value: function () {
                this.isAvailable() && (this.tabs.forEach(function (e) {
                    Object.assign(e.offset, e.$target.offset()), e.offset.width = e.$target.outerWidth(), e.offset.height = e.$target.outerHeight(), e.offset.right = e.offset.left + e.offset.width, e.offset.bottom = e.offset.top + e.offset.height
                }), this.tabs.sort(function (e, t) {
                    return e.offset.top - t.offset.top
                }), this.inited = !0)
            }
        }, {
            key: "_position", value: function (e) {
                var t = this;
                if (this.isAvailable()) {
                    var n = this.options.offset;
                    e = void 0 === e ? a.scrollTop() : e, !0 !== this.tabs.reduce(function (i, a) {
                        return !0 === i || (i = i || a.offset.top, a.$target && a.$target.is(":hidden") ? i : e + n > i && e + n <= a.offset.bottom ? (t.active(a), !0) : a.offset.bottom)
                    }, 0) && (this.firstDefault ? this.active(this.tabs[0]) : this.deactive())
                }
            }
        }, {
            key: "update", value: function () {
                this._updateVisibility(), this._updateTabs(), this._update(), this._position()
            }
        }, {
            key: "position", value: function (e) {
                !1 === this.inited && (this._updateVisibility(), this._updateTabs(), this._update()), this._position(e)
            }
        }, {
            key: "active", value: function (e) {
                e && this.tabs.forEach(function (t) {
                    e === t ? (t.$tab.addClass("active"), t.active = !0) : (t.$tab.removeClass("active"), t.active = !1)
                })
            }
        }, {
            key: "deactive", value: function () {
                this.tabs.forEach(function (e) {
                    e.$tab.removeClass("active"), e.active = !1
                })
            }
        }, {
            key: "disable", value: function () {
                this.disabled = !0
            }
        }, {
            key: "enable", value: function () {
                this.disabled = !1
            }
        }]), e
    }();
    a.on("resize", function () {
        r.forEach(function (e) {
            e.update()
        })
    }).on("scroll resize", function () {
        var e = a.scrollTop();
        r.forEach(function (t) {
            t.position(e)
        })
    }), t.createScrollTaber = function (e, t) {
        var n = new s(e, t);
        return r.push(n), n
    }, t.updateScrollTaber = function (e) {
        instance && instance instanceof Fixer ? instance.update() : r.forEach(function (e) {
            e.update()
        })
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.fetchRetail = t.fetchUpgrade = t.fetchGuide = t.fetchVisa = void 0;
    var i = n(0), a = function (e) {
        return e && e.__esModule ? e : {default: e}
    }(n(5));
    var o = {
        guideData: null, guideLoaded: !1, fetch: function (e, t) {
            var n = this;
            n.guideData ? e(n.guideData) : n.guideLoaded ? t && t() : $.ajax({
                dataType: "json",
                url: a['default'].url.guide({productId: (0, i.getStore)().getState("productId")}),
                beforeSend: function () {
                },
                complete: function () {
                    n.guideLoaded = !0
                },
                success: function (i) {
                    i && i.success ? (e(i.data), n.guideData = i.data) : t && t()
                }
            })
        }
    }, r = {
        visaData: null, visaLoaded: !1, fetch: function (e, t) {
            var n = this;
            if (n.visaData) e(n.visaData); else if (n.visaLoaded) t && t(); else {
                var o = (0, i.getStore)();
                $.ajax({
                    dataType: "json",
                    url: a['default'].url.visa({
                        productId: o.getState("productId"),
                        bookCityCode: o.getState("bookCityCode") || void 0,
                        departCityCode: o.getState("departCityCode") || void 0
                    })
                }).done(function (i) {
                    i && i.success && i.data ? (e(i.data), n.visaData = i.data) : t && t()
                }).fail(function () {
                    t && t()
                }).always(function () {
                    n.visaLoaded = !0
                })
            }
        }
    }, s = {
        upgradeData: null, upgradeLoaded: !1, fetch: function (e, t) {
            var n = this;
            if (n.upgradeData) e(n.upgradeData); else if (n.upgradeLoaded) t && t(); else {
                var o = (0, i.getStore)();
                $.ajax({
                    dataType: "json",
                    url: a['default'].url.upgrade({
                        productId: o.getState("productId"),
                        bookCityCode: o.getState("bookCityCode") || void 0,
                        departCityCode: o.getState("departCityCode") || void 0
                    })
                }).done(function (i) {
                    i && i.success && i.data ? (e(i.data), n.upgradeData = i.data) : t && t()
                }).fail(function () {
                    t && t()
                }).always(function () {
                    n.upgradeLoaded = !0
                })
            }
        }
    }, l = {
        retailData: {}, bookCityCode: 0, setBookCode: function (e) {
            this.bookCityCode = e
        }, fetch: function (e, t) {
            var n = this;
            n.retailData[n.bookCityCode] ? e(n.retailData[n.bookCityCode]) : $.ajax({
                dataType: "json",
                url: a['default'].url.retail({bookCode: n.bookCityCode}),
                success: function (i) {
                    i && i.success && i.data ? (e(i.data), n.retailData[n.bookCityCode] = i.data) : t && t()
                },
                error: function (e, n) {
                    t && t()
                }
            })
        }
    };
    t.fetchVisa = r, t.fetchGuide = o, t.fetchUpgrade = s, t.fetchRetail = l
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.LOAD_SUPPLIER = "LOAD_SUPPLIER", t.LOAD_BRAND_INFO = "LOAD_BRAND_INFO"
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.CHANGE_LOGIN_STATUS = "CHANGE_LOGIN_STATUS"
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.Gallery = void 0;
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }(), a = function (e) {
        return e && e.__esModule ? e : {default: e}
    }(n(41));

    function o(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    var r = 1, s = [], l = {
        showNav: !0,
        direction: r,
        navDirection: r,
        thumbWidth: 108,
        thumbHeight: 50,
        galleryWidth: 500,
        galleryHeight: 282,
        navOffset: 4,
        navAmountInView: 4,
        navMinLimit: 1,
        selectors: {},
        classNames: {}
    }, c = {
        displayBox: ".gallery-display-box",
        photoItem: ".gallery-photo",
        videoCover: ".gallery-video-cover",
        videoButton: ".gallery-video-button",
        navContainer: ".gallery-nav",
        navPrev: ".gallery-prev",
        navNext: ".gallery-next",
        navMask: ".gallery-mask",
        navList: ".gallery-nav-list"
    }, d = {photoActive: "gallery-photo-active"};
    var u = function () {
        function e(t) {
            var n = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.option = Object.assign({}, l, i), this.container = $(t), this.selectors = {}, this.classNames = {}, 0 !== this.container.length && (Object.keys(c).forEach(function (e) {
                n.selectors[e] = n.option.selectors[e] || c[e]
            }), Object.keys(d).forEach(function (e) {
                n.classNames[e] = n.option.classNames[e] || d[e]
            }), this.option.pictures ? this.pictures = this.option.pictures.slice() : this.pictures = this.collectPictures(), this.length = this.pictures.length, this.length <= 1 || (this.containerWidth = this.option.galleryWidth, this.containerHeight = this.option.galleryHeight, this.currentIndex = 0, this.nextIndex = 0, this.timer = null, this.navVisible = !1, this.navChanging = !1, this.displayChanging = !1, this.changing = !1, this.hovering = !1, this.videoPlaying = !1, this.option.direction == r ? (this.positionProperty = "left", this.displayChangeStep = this.option.galleryWidth) : (this.positionProperty = "top", this.displayChangeStep = this.option.galleryHeight), this.option.navDirection == r ? (this.navPositionProperty = "left", this.thumbChangeStep = this.option.thumbWidth) : (this.navPositionProperty = "top", this.thumbChangeStep = this.option.thumbHeight), this.initialize(), this.initializeDisplay(), this.length > this.option.navMinLimit && this.option.showNav && this.initializeNav(), this.option.autoChange && this.startAutoChange(), function (e) {
                s.push(e)
            }(this)))
        }

        return i(e, [{
            key: "initialize", value: function () {
                var e = this;
                this.container.hover(function () {
                    e.hovering = !0, e.stopAutoChange()
                }, function () {
                    e.hovering = !1, e.startAutoChange()
                })
            }
        }, {
            key: "collectPictures", value: function () {
                return this.container.find(this.selectors.photoItem).map(function () {
                    var e = $(this);
                    return {
                        picture: e.data("src"),
                        thumb: e.data("thumb"),
                        type: e.data("type"),
                        video: e.data("video"),
                        loaded: !1,
                        element: e
                    }
                }).toArray()
            }
        }, {
            key: "getPicture", value: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                return this.pictures[e]
            }
        }, {
            key: "getNextIndex", value: function () {
                return (this.currentIndex + 1) % this.length
            }
        }, {
            key: "getPrevIndex", value: function () {
                return (this.length + this.currentIndex - 1) % this.length
            }
        }, {
            key: "startAutoChange", value: function () {
                this.stopAutoChange(), this.autoChange()
            }
        }, {
            key: "stopAutoChange", value: function () {
                clearTimeout(this.timer)
            }
        }, {
            key: "autoChange", value: function () {
                var e = this;
                this.videoPlaying || (this.timer = setTimeout(function () {
                    e.change(e.getNextIndex())
                }, 5e3))
            }
        }, {
            key: "change", value: function (e, t) {
                this.changing || e == this.currentIndex || (t || (t = e < this.currentIndex ? -1 : 1), this.nextIndex = e, this.changing = !0, this.videoPlaying = !1, this.changeDisplay(t), this.option.showNav && this.changeNav(), this.currentIndex = this.nextIndex)
            }
        }, {
            key: "endChange", value: function () {
                this.displayChanging || this.navChanging || (this.changing = !1, this.hovering || this.startAutoChange())
            }
        }, {
            key: "initializeNav", value: function () {
                var e, t, n = this, i = this;
                this.container.find(this.selectors.navContainer).length && (e = this.container.find(this.selectors.navList), t = e.children(), this.option.navDirection == r ? e.width(this.length * this.option.thumbWidth) : e.height(this.length * this.option.thumbHeight), this.pictures.forEach(function (e, i) {
                    t.eq(i).click(function () {
                        this.change(i)
                    }.bind(n))
                }), this.container.find(this.selectors.navPrev).click(function () {
                    i.change(i.getPrevIndex(), -1)
                }), this.container.find(this.selectors.navNext).click(function () {
                    i.change(i.getNextIndex(), 1)
                }))
            }
        }, {
            key: "changeNav", value: function () {
                var e, t, n = this, i = this.container.find(this.selectors.navList),
                    a = this.container.find(this.selectors.navMask);
                e = Math.max(0, this.nextIndex - this.option.navAmountInView + 1) * this.thumbChangeStep, t = this.thumbChangeStep * this.nextIndex - e, n.navChanging = !0, a.animate(o({}, this.navPositionProperty, t + this.option.navOffset), 700), i.animate(o({}, this.navPositionProperty, -e), 700, function () {
                    n.navChanging = !1, n.endChange()
                })
            }
        }, {
            key: "initializeDisplay", value: function () {
                var e = this, t = this, n = this.currentIndex, i = this.containerWidth;
                this.container.find(this.selectors.photoItem).each(function (e) {
                    $(this).css(t.positionProperty, n == e ? 0 : -i)
                }), this.pictures.forEach(function (t) {
                    switch (t.type) {
                        case"video":
                            e.initializeVideo(t)
                    }
                })
            }
        }, {
            key: "createVideo", value: function (e, t, n) {
                return $("<iframe />").attr({frameborder: 0, scrolling: "no", width: t, height: n, src: e})
            }
        }, {
            key: "initializeVideo", value: function (e) {
                var t = {f: e.video, c: 0, b: 1, p: 1, i: e.picture, e: 0, loaded: "ckLoadedHandler"},
                    n = this.option.galleryWidth, i = this.option.galleryHeight, o = [e.video], r = this,
                    s = e.element.find(this.selectors.videoCover), l = e.element.find(this.selectors.videoButton),
                    c = $("<div />").width(n).height(i);
                c.hide().appendTo(e.element), e.videoContainer = c, e.videoCover = s, window.playerstop = function () {
                    r.resetVideo(e)
                }, l.click(function () {
                    e.videoObject || (a['default'].embed(cdnConfig.url + "/site/static/js/plugins/ckplayer/6.8/ckplayer.swf", c[0], "J_Player", n, i, !1, t, o), e.videoObject = a['default'].getObjectById("J_Player")), s.hide(), c.show(), $.isPlainObject(e.videoObject) && e.videoObject.videoPlay(), r.videoPlaying = !0, r.stopAutoChange()
                })
            }
        }, {
            key: "resetVideo", value: function (e) {
                e.videoCover.show(), e.videoContainer.hide(), $.isPlainObject(e.videoObject) ? (e.videoObject.videoPause(), e.videoObject.videoSeek(0)) : e.videoObject = null
            }
        }, {
            key: "changeDisplay", value: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, t = this,
                    n = this.positionProperty, i = this.getPicture(this.currentIndex),
                    a = this.getPicture(this.nextIndex);
                this.displayChanging = !0, a.element.css(n, e * this.containerWidth), "video" === i.type && this.resetVideo(i), i.element.addClass(this.classNames.photoActive), a.element.addClass(this.classNames.photoActive), this.container.find(this.selectors.displayBox).stop(!0, !0).animate(o({}, n, -this.containerWidth * e), 700, function () {
                    $(this).css(n, 0), a.element.css(n, 0), i.element.css(n, -t.containerWidth).removeClass(t.classNames.photoActive), t.displayChanging = !1, t.endChange()
                })
            }
        }, {
            key: "destroy", value: function () {
                !function (e) {
                    var t = s.indexOf(e);
                    ~t && s.splice(t, 1)
                }(this)
            }
        }]), e
    }();
    u.create = function () {
        return new (Function.prototype.bind.apply(u.apply, [null].concat(Array.prototype.slice.call(arguments))))
    }, t.Gallery = u
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.isNeedReception = t.isNiuZhuan = t.getProductStockType = t.checkEmail = t.getDeltaDate = t.getNextDate = t.formateDate = t.getWeek = t.getNowDate = t.getYMDDate = t.getYMDate = t.justifyNumber = t.justifyDate = t.str2Date = void 0;
    var i = n(0), a = "-", o = ["日", "一", "二", "三", "四", "五", "六"];

    function r(e) {
        return String(e).replace(/\-/g, "/")
    }

    function s(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
        e = String(e);
        for (var n = Math.max(t - e.length, 0); n > 0; n--) e = "0" + e;
        return e
    }

    function l(e) {
        return [e.getFullYear(), s(e.getMonth() + 1), s(e.getDate())].join(a)
    }

    function c(e) {
        return "string" == typeof e ? new Date(r(e)) : e
    }

    var d = [{unit: 1e3, property: "millsecond"}, {unit: 60, property: "second"}, {
        unit: 60,
        property: "minute"
    }, {unit: 24, property: "hour"}, {unit: 1, property: "day"}];

    function u() {
        return {1: "A", 2: "D"}[(0, i.getStore)().getState("adType")]
    }

    function f() {
        return 2 === (0, i.getStore)().getState("brandId")
    }

    t.str2Date = c, t.justifyDate = r, t.justifyNumber = s, t.getYMDate = function (e) {
        return "string" == typeof e && (e = new Date(r(e))), [e.getFullYear(), s(e.getMonth() + 1)].join(a)
    }, t.getYMDDate = l, t.getNowDate = function () {
        return l(new Date)
    }, t.getWeek = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "周";
        return "string" == typeof e && (e = new Date(r(e))), t + o[e.getDay()]
    }, t.formateDate = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "YYYY-MM-DD";
        return "string" == typeof e && (e = new Date(r(e))), t.replace(/YYYY/g, e.getFullYear()).replace(/MM/g, s(e.getMonth() + 1)).replace(/DD/g, s(e.getDate()))
    }, t.getNextDate = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        return "string" == typeof e && (e = new Date(r(e))), e.setDate(e.getDate() + t - 1), l(e)
    }, t.getDeltaDate = function (e, t) {
        var n = {};
        return e = c(e), t = c(t), d.reduce(function (e, t) {
            return n[t.property] = e % t.unit, parseInt(e / t.unit, 10)
        }, e - t || 0), n
    }, t.checkEmail = function (e) {
        return /(?=^.{5,255}$)(^([\w\!\#\$\%\&\'\*\+\-\.\/\?\^\_\`\{\|\}\~]+)@([a-zA-Z0-9\-]+\.)+([a-zA-Z0-9\-]+)$)/.test(String(e))
    }, t.getProductStockType = u, t.isNiuZhuan = f, t.isNeedReception = function () {
        return "D" === u() || "A" === u() && f()
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.getProductStockType = a, t.isNiuZhuan = o, t.isNeedReception = function () {
        return "D" === a() || "A" === a() && o()
    };
    var i = n(0);
    !function (e) {
        e && e.__esModule
    }(n(5));

    function a() {
        return {1: "A", 2: "D"}[(0, i.getStore)().getState("adType")]
    }

    function o() {
        return 2 === (0, i.getStore)().getState("brandId")
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.loginP = t.isLoginP = void 0;
    var i = n(1), a = "detailLoginCallback";

    function o() {
        return new Promise(function (e, t) {
            var n = i.layer.open({
                type: 2, title: !1, content: [function () {
                    var e = location.host.split(".")[0];
                    return "https://passport.tuniu.com/login/iframe?origin=" + encodeURIComponent("http://www.tuniu.com/ssoConnect/Iframe?reload=detail&domain=" + e)
                }(), "no"], area: ["375px", "350px"], btn: !1, close: function () {
                    t()
                }
            });
            window[a] = function () {
                window[a] = null, e(), i.layer.close(n)
            }
        })
    }

    function r() {
        return s()['catch'](function () {
            return o()
        })
    }

    function s() {
        return new Promise(function (e, t) {
            $.ajax({
                url: app_url("api/tour/user"), success: function (n) {
                    n && n.success && n.data && n.data.login ? e() : t()
                }, error: function () {
                    t()
                }
            })
        })
    }

    t['default'] = r, t.isLoginP = s, t.loginP = r
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.add = function (e, t) {
        (function (e) {
            if (e) return -1 !== r.indexOf(e);
            return !1
        })(e) && (t = Object.assign({}, t), "LOAD_ORIGIN_CALENDAR" === e && (t = function (e) {
            var t = Object.assign({}, e.originCalendar), n = t.calendars;
            Array.isArray(n) && (t.calendars = n.map(function (e) {
                var t = Object.assign({}, e);
                return delete t.promotions, t
            }));
            return {originCalendar: t}
        }(t)), o.push({action: e, data: t, time: Date.now()}))
    }, t.send = function () {
        var e = (0, a.getStore)();
        if (!e) return;
        $.ajax({
            url: i['default'].url.trace(),
            type: "post",
            data: {
                type: "tour",
                productId: e.getState("productId"),
                productType: e.getState("productType"),
                actions: JSON.stringify(o)
            },
            success: function () {
                o.length = 0
            }
        })
    };
    var i = function (e) {
        return e && e.__esModule ? e : {default: e}
    }(n(5)), a = n(0);
    var o = [],
        r = ["INITIALIZED", "LOAD_ORIGIN_CALENDAR", "CHANGE_DEPART_DATE", "CHANGE_DEPART_CITY", "CHANGE_BACK_CITY", "CHANGE_ADULT", "CHANGE_CHILD", "CHANGE_FREE_CHILD", "CHANGE_PRODUCT_STATUS", "CHANGE_LOGIN_STATUS", "CHANG_DETAIL_JOURNEY", "LOAD_SUPPLIER"]
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.journey4Module = void 0;
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, a = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }

            return function (t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(), o = v(n(10)), r = n(1), s = n(16), l = v(n(3)), c = n(11), d = n(7), u = n(12), f = n(22), p = n(72),
        h = n(74);

    function v(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }

    var m = $(window), g = ($(document), []), y = !1,
        b = o.compile(h.spotDetailTemplate, {client: !0, compileDebug: !1});

    function _(e, t) {
        return y ? e && e[0] ? new f.Map(e[0]) : void 0 : (g.push({
            $element: e,
            callback: t
        }), y || (window.initializeMapModule = function () {
            if (y = !0, window.initializeMapModule = null, g.length) for (; g.length;) {
                var e = g.pop();
                e.callback(_(e.$element))
            }
            if (g.length) for (; g.length;) {
                var t = g.pop();
                t.callback(_(t.$element))
            }
        }, $('<script src="http://maps.google.cn/maps/api/js?sensor=false&callback=initializeMapModule" defer sync><\/script>').appendTo("head")), null)
    }

    var x = function () {
        function e(t, n, a) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.valid = !(!n || "object" !== (void 0 === n ? "undefined" : i(n))), this.$element = t, this.data = n || {}, this.options = Object.assign({tabHeight: 0}, a), this.isResourceType = 2 == this.data.scheduleType, this.currentDayId = null, this.inited = !1, this.resList = null, this.navFixer = null
        }

        return a(e, [{
            key: "init", value: function () {
                if (this.valid) {
                    this.inited = !0, this.resList = (this.data.detail || []).reduce(function (e, t) {
                        return e[t.cid] = t, (t.data || []).forEach(function (t) {
                            e[t.cid] = t, (t.data || []).forEach(function (t) {
                                e[t.cid] = t
                            })
                        }), e
                    }, {}), this.smallMapData = function (e) {
                        var t = [];
                        return 1 == e.scheduleType && (e.detail || []).reduce(function (e, t) {
                            var n = (t.data || []).reduce(function (e, t) {
                                return 1 == t.moduleTypeValue && (t.data || []).reduce(function (e, t) {
                                    return t.latitude && t.longitude && e.push(t), e
                                }, e), e
                            }, []);
                            return e.push({day: t.day, cid: t.cid, list: n}), e
                        }, t), t.filter(function (e) {
                            return e.list.length
                        })
                    }(this.data);
                    var e = this.$element.find(".J_JourneyNav"), t = this.$element.find(".J_DetailJourney");
                    (0, u.createScrollTaber)(e, Object.assign({
                        ctx: this.$element,
                        offset: this.options.tabHeight
                    }, this.options.scrollTaber));
                    if (!this.isResourceType) (0, u.createScrollTaber)(e, {
                        ctx: this.$element,
                        offset: this.options.tabHeight,
                        attr: "data-sub-rel"
                    });
                    if (this.navFixer = (0, c.createFixer)(e, Object.assign({
                        range: {
                            top: t,
                            bottom: t,
                            left: this.$element,
                            right: this.$element
                        }, offset: {top: this.options.tabHeight + 32}, ctx: this.$element
                    }, this.options.fixer)), !this.isResourceType) {
                        var n = this.$element.find(".J_Journey4RouteTab");
                        n.length && (0, d.createTaber)(n, {ctx: this.$element});
                        var i = this.$element.find(".J_DetailRouteBrief"), a = i.find(".J_DetailRouteBriefBox"),
                            o = i.find(".J_DetailRouteBriefInner"), r = a.height(), s = o.height();
                        this.initDownToolbar(), r < s && i.addClass("fold"), r > s && a.height(s), this.briefMinHeight = r, this.briefMaxHeight = s, this.$brief = i, this.$briefBox = a, this.$briefInner = o, this.smallMapData && this.smallMapData.length && (this.$mapDay = this.$element.find(".J_DetailJourneyMapDay"), this.$mapSmall = this.$element.find(".J_DetailJourneyMapSmall"), this.$mapSmall.length && this.setSmallMap(_(this.$mapSmall, this.setSmallMap.bind(this))))
                    }
                    this.$element.find("img").each(function () {
                        var e = $(this), t = e.data("src");
                        t && l.on(e, function () {
                            var n = new Image;
                            n.onload = function () {
                                e.prop("src", t).parent().addClass("loaded"), l.off(e), m.trigger("resize")
                            }, n.onerror = function () {
                                e.parent().addClass("loaded"), l.off(e), m.trigger("resize")
                            }, n.src = t, e.src = t
                        })
                    }), this.bind()
                }
            }
        }, {
            key: "bind", value: function () {
                var e = this;
                this.$element.on("click", ".J_ViewMap", function () {
                }).on("click", ".J_ViewDetail", function (t) {
                    var n = $(t.currentTarget).data("id");
                    if (n) {
                        var i = e.getResDataByCid(n);
                        i && e.openDetailDialog(i)
                    }
                }).on("click", ".J_DetailRouteBriefMore", function () {
                    e.$briefBox.height(e.briefMaxHeight), e.$brief.addClass("expand"), m.trigger("resize")
                }).on("click", ".J_DetailRouteBriefLess", function () {
                    e.$briefBox.height(e.briefMinHeight), e.$brief.removeClass("expand"), m.trigger("resize")
                }).on("click", ".J_DetailJourneyMapPrev", function () {
                    e.prevMapDay()
                }).on("click", ".J_DetailJourneyMapNext", function () {
                    e.nextMapDay()
                }).on("click", ".J_DetailJourneyMapView", function () {
                    y && (0, p.openBigMap)(e.data, e.resList, e.currentDayId)
                })
            }
        }, {
            key: "initDownToolbar", value: function () {
                var e = void 0, t = this.$element.find(".J_DetailRouteBrief"),
                    n = this.$element.find(".J_SideDownload, .J_SidePrint");

                function i() {
                    var e = t.offset();
                    e && e.top < m.scrollTop() ? n.show() : n.hide()
                }

                n.hide(), m.on("scroll", function () {
                    clearTimeout(e), e = setTimeout(i, 10)
                })
            }
        }, {
            key: "setSmallMap", value: function (e) {
                e && (this.$mapSmall.removeClass("loading"), this.map = e, this.loadMap())
            }
        }, {
            key: "loadMap", value: function (e) {
                if (e = e || this.getCurrentDay()) {
                    var t = this.getDayResForMap(e);
                    this.currentDayId = e.cid, this.map.load(t), this.updateMapTab(e)
                }
            }
        }, {
            key: "getResDataByCid", value: function (e) {
                var t = null;
                return this.resList && (t = this.resList[e] || null), t
            }
        }, {
            key: "getDayResForMap", value: function (e) {
                return e && e.list ? e.list.map(function (e) {
                    return {moduleType: "spot", title: e.title, latitude: e.latitude, longitude: e.longitude}
                }) : []
            }
        }, {
            key: "getCurrentDay", value: function (e) {
                return (e = e || this.currentDayId) ? this.smallMapData.filter(function (t) {
                    return t.cid == e
                })[0] : this.smallMapData[0]
            }
        }, {
            key: "getCurrentDayIndex", value: function () {
                var e = this, t = 0;
                return this.currentDayId && this.smallMapData.some(function (n, i) {
                    if (n.cid === e.currentDayId) return t = i, !0
                }), t
            }
        }, {
            key: "getDayDataByIndex", value: function (e) {
                return this.smallMapData[e || 0]
            }
        }, {
            key: "updateMapTab", value: function (e) {
                e = e || this.getCurrentDay(), this.$mapDay.text("第" + e.day + "天")
            }
        }, {
            key: "prevMapDay", value: function () {
                var e = this.getCurrentDayIndex();
                if (!(e <= 0)) {
                    var t = this.getDayDataByIndex(e - 1);
                    t && this.loadMap(t)
                }
            }
        }, {
            key: "nextMapDay", value: function () {
                var e = this.getCurrentDayIndex();
                if (!(e >= this.smallMapData.length - 1)) {
                    var t = this.getDayDataByIndex(e + 1);
                    t && this.loadMap(t)
                }
            }
        }, {
            key: "enable", value: function () {
                this.inited ? this.isResourceType || this.map || this.setSmallMap(_(this.$mapSmall, this.setSmallMap.bind(this))) : this.init(), this.navFixer && this.navFixer.update(), this.navFixer && this.navFixer.enable()
            }
        }, {
            key: "disable", value: function () {
                this.isResourceType || this.map || function (e) {
                    for (var t = g.length - 1; t >= 0; t--) g[t] && g[t].$element === e && g.splice(t, 1)
                }(this.$mapSmall), this.navFixer && this.navFixer.disable()
            }
        }, {
            key: "openDetailDialog", value: function (e) {
                var t = r.layer.open({
                    title: !1,
                    type: 1,
                    content: b({data: e}),
                    closeBtn: !1,
                    btns: 0,
                    btn: !1,
                    area: ["830px", "440px"],
                    success: function (e) {
                        setTimeout(function () {
                            new s.Gallery(e.find(".J_DialogGallery"), {autoChange: !0})
                        }, 1), e.find(".J_DialogClose").click(function () {
                            r.layer.close(t)
                        })
                    }
                })
            }
        }]), e
    }(), j = {
        init: function (e, t, n) {
            return new x(e, t, n)
        }
    };
    t.journey4Module = j
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.Map = void 0;
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }(), a = n(71);
    var o = function () {
        function e(t, n) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.element = t, this.map = null, this.visible = !1, this.activedMarker = null, this.markers = [], this.option = n || {}
        }

        return i(e, [{
            key: "createMap", value: function () {
                return new google.maps.Map(this.element, {
                    zoom: 1,
                    maxZoom: 16,
                    minZoom: 1,
                    mapTypeControl: !1,
                    streetViewControl: !1,
                    scaleControl: !0
                })
            }
        }, {
            key: "getMap", value: function () {
                return this.map || (this.map = this.createMap()), this.map
            }
        }, {
            key: "getBound", value: function () {
                var e = this.resList, t = 0, n = 90, i = -180, a = 180;
                if (e && e) return e.forEach(function (e) {
                    t = Math.max(e.latitude, t), n = Math.min(e.latitude, n), a = Math.min(e.longitude, a), i = Math.max(e.longitude, i)
                }), new google.maps.LatLngBounds(new google.maps.LatLng(n, a), new google.maps.LatLng(t, i))
            }
        }, {
            key: "resize", value: function () {
                var e = this.getBound();
                google.maps.event.trigger(this.map, "resize"), this.map.setCenter(e.getCenter()), this.map.fitBounds(e)
            }
        }, {
            key: "renderMarker", value: function (e) {
                var t = (0, a.createMarker)({
                    serial: 1,
                    type: e.moduleType,
                    name: e.title,
                    latitude: e.latitude,
                    longitude: e.longitude
                });
                return t.id = e.id, t.setMap(this.map), this.markers.push(t), t
            }
        }, {
            key: "bindMarkerEvent", value: function (e, t) {
                var n = this;
                e.addListener("click", function () {
                    n.activateMarker(e), n.option && n.option.onMarkerActive && n.option.onMarkerActive(t)
                }), e.addListener("mouseenter", function () {
                    this.hightlight(), this.moveToTop()
                }), e.addListener("mouseleave", function () {
                    this.removeHightlight(), this.restoreZIndex()
                })
            }
        }, {
            key: "clearAllMarker", value: function () {
                for (var e = this.markers; e.length;) e.pop().setMap(null)
            }
        }, {
            key: "activateMarker", value: function (e) {
                this.activedMarker && (this.activedMarker.deactivate(), this.activedMarker = null), e && (this.activedMarker = e, e.activate())
            }
        }, {
            key: "activateMarkerById", value: function (e) {
                var t = this.getMarkerById(e);
                t && this.activateMarker(t)
            }
        }, {
            key: "getMarkerById", value: function (e) {
                return this.markers.filter(function (t) {
                    return t.id == e
                })[0]
            }
        }, {
            key: "render", value: function () {
                var e = this, t = this.resList;
                this.activeSpot;
                t && t && (this.getMap(), this.clearAllMarker(), this.map.fitBounds(this.getBound()), t.forEach(function (t, n) {
                    e.bindMarkerEvent(e.renderMarker(Object.assign({}, t, {serial: n + 1})), t)
                }))
            }
        }, {
            key: "load", value: function (e) {
                this.resList = e, this.render()
            }
        }]), e
    }();
    t.Map = o
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.featureModule = void 0;
    var i = function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }(n(3));
    var a = $(window), o = void 0, r = void 0, s = {
        init: function (e) {
            o = e, r = $(".J_DetailFeature").filter('[data-id="' + o.journeyId + '"]'), this.bind()
        }, bind: function () {
            r.find("img").each(function () {
                var e = $(this), t = e.data("src");
                i.on(e, function () {
                    var n = new Image;
                    n.onload = function () {
                        e.prop("src", t).parent().addClass("loaded"), i.off(e), a.trigger("resize")
                    }, n.src = t, n.onerror = function () {
                        e.parent().addClass("loaded"), i.off(e), a.trigger("resize")
                    }
                })
            }), r.find(".J_DetailFeatureDeadline").each(function () {
                var e = $(this), t = e.parent(), n = t.find(".detail-feature-deadline"),
                    i = t.find(".detail-feature-deadline-arrow");
                e.click(function (a) {
                    if (a.stopPropagation(), t.hasClass("expand")) t.removeClass("expand"); else {
                        var o = e.position() || {left: 0, top: 0};
                        n.css({top: o.top + t.height() + 7}), i.css({left: o.left + e.width() / 2}), t.addClass("expand")
                    }
                }), n.click(function (e) {
                    e.stopPropagation()
                }), $(document).click(function () {
                    t.removeClass("expand")
                })
            })
        }
    };
    t.featureModule = s
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }(), a = n(0), o = n(2), r = n(1), s = n(82), l = n(84), c = n(85), d = function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }(n(3)), u = n(13), f = n(6);
    $(window);
    var p = void 0, h = void 0, v = void 0, m = void 0;

    function g(e) {
        if (window.cityList) return y(), void("function" == typeof e && e());
        $.ajax({
            url: p.citiesUrl(), data: {}, success: function (t) {
                y(), t && t.success && (window.cityList = t.data), "function" == typeof e && e()
            }
        })
    }

    function y() {
        var e = $(".retail-box");
        e.length && e.removeClass("loading")
    }

    function b(e) {
        return o.template.compile(l.detailRetailTemplate)({data: e})
    }

    function _() {
        var e = void 0;
        e = r.layer.open({
            type: 1,
            title: !1,
            closeBtn: !1,
            content: b(v),
            area: ["700px", "540px"],
            btn: !1,
            success: function (t) {
                s.retailCityModule.init({bookCityCode: m}), t.on("click", ".retail-box-close", function () {
                    r.layer.close(e)
                }).on("click", ".retail-location-label", function () {
                    $(this).parent().toggleClass("expand")
                }).on("click", ".retail-city-drop-city-name", function (e) {
                    var n = $(this);
                    x(m = n.data("code"), function () {
                        t.find(".retail-box").parent().html(b(v)), s.retailCityModule.init({bookCityCode: m})
                    }), (0, f.record)("点击_详情区_预订须知_签约门市_切换城市", e)
                })
            }
        })
    }

    function x(e, t) {
        !function () {
            var e = $(".retail-box");
            e.length && e.addClass("loading")
        }(), u.fetchRetail.setBookCode(e), u.fetchRetail.fetch(function (e) {
            v = e, g(t)
        }, function () {
            v = [], g(t)
        })
    }

    var j = function () {
        function e(t) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), p = t, h = (0, a.getStore)(), m = h.getState("bookCityCode"), this.$container = $(".J_DetailPolicy").filter('[data-id="' + p.journeyId + '"]'), this.$retailName = this.$container.find(".J_retailName")
        }

        return i(e, [{
            key: "bind", value: function () {
                this.$container.find("[data-role=fold-box]").each(function () {
                    (0, c.createAutoFold)($(this))
                }), this.$container.parent().on("click", ".J_retailView", function () {
                    v ? _() : x(m, _)
                }), d.on(this.$retailName, this._initRetail.bind(this))
            }
        }, {
            key: "_initRetail", value: function () {
                var e = this;
                d.off(e.$retailName), u.fetchRetail.setBookCode(m), u.fetchRetail.fetch(function (t) {
                    e.$retailName.find("a").find("span").text(t[0] && t[0].name).end().show()
                })
            }
        }]), e
    }();
    t['default'] = j
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }(), a = n(0), o = n(2), r = n(1), s = n(7), l = n(17), c = n(91), d = n(92), u = n(13), f = function (e) {
        return e && e.__esModule ? e : {default: e}
    }(n(5));
    var p = 1, h = $(window), v = void 0, m = void 0, g = void 0, y = void 0,
        b = o.template.compile(d.detailVisaDialogTemplate), _ = window.openImageViewer || function () {
        };

    function x(e, t) {
        v = r.layer.open({
            type: 1,
            title: !1,
            closeBtn: !1,
            content: b({dialogType: t}),
            area: ["700px", "auto"],
            btn: !1,
            success: e
        })
    }

    function j() {
        r.layer.close(v)
    }

    function w(e) {
        k(e, "send")
    }

    function D(e) {
        k(e, "print")
    }

    function k(e, t) {
        var n = e.find(".J_VisaPersonType"), i = e.find(".J_VisaEmail"), a = e.find(".J_DialogError"), o = !1;

        function s(e) {
            a.css("visibility", "visible").find("strong").text(e.join("；"))
        }

        function l() {
            a.css("visibility", "hidden").find("strong").text("")
        }

        function c() {
            return {
                groupCode: n.filter(".active").toArray().map(function (e) {
                    return {id: $(e).data("id"), name: $(e).data("name")}
                }), email: i.val(), productId: m.getState("productId"), productName: y, resId: g
            }
        }

        function d() {
            if (o) {
                var e = C(c(), t);
                !0 === e ? l() : s(e)
            }
        }

        n.click(function () {
            var e = $(this);
            e.hasClass("active") ? e.removeClass("active") : e.addClass("active"), d()
        }), i.on("change", d), e.on("click", ".J_VisaCancel, .J_VisaClose", j).on("click", ".J_VisaSend", function () {
            var e = c(), n = C(e, t);
            "send" === t ? (o = !0, $(this).attr({href: "javascript:;"}).removeAttr("target"), !0 === n ? function (e) {
                $.ajax({
                    url: f['default'].url.visaSend(),
                    dataType: "json",
                    data: {d: JSON.stringify(e)},
                    type: "post",
                    success: function (e) {
                        e.success ? function () {
                            var e = r.layer.open({
                                type: 1,
                                title: !1,
                                time: 3e3,
                                content: '<div class="dialog-success"><div class="dialog-close"></div><i class="icon"></i>材料已经发送至您的邮箱，请注意查收。</div>',
                                area: ["400px", "auto"],
                                btn: !1,
                                closeBtn: !1,
                                success: function (t) {
                                    t.on("click", ".dialog-close", function () {
                                        r.layer.close(e)
                                    })
                                },
                                end: j
                            })
                        }() : I(e && e.message)
                    },
                    error: function () {
                        I()
                    }
                })
            }(e) : s(n)) : !0 === n ? (l(), $(this).attr({
                href: f['default'].url.visaPrint(e),
                target: "_blank"
            })) : s(n)
        })
    }

    function C(e, t) {
        var n = [];
        return e.groupCode && 0 != e.groupCode.length || n.push("请选择您的身份类型"), "send" === t && (e.email ? !1 === (0, l.checkEmail)(e.email) && n.push("请输入正确的邮箱") : n.push("请输入您常用的邮箱")), 0 === n.length || n
    }

    function I(e) {
        var t = r.layer.open({
            type: 1,
            title: !1,
            content: '<div class="dialog-error"><div class="dialog-close"></div><i class="icon"></i>' + (e || "材料发送失败，请稍后重试。") + "</div>",
            area: ["400px", "auto"],
            btn: !1,
            closeBtn: !1,
            success: function (e) {
                e.on("click", ".dialog-close", function () {
                    r.layer.close(t)
                })
            }
        })
    }

    var T = function () {
        function e(t) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.status = p, this.visaData = null, this.$el = t.$el, m = (0, a.getStore)()
        }

        return i(e, [{
            key: "load", value: function (e) {
                this.visaData = e, this.status = 4
            }
        }, {
            key: "render", value: function () {
                var e = o.template.compile(c.detailVisaTemplate), t = this.$el.data("id"), n = [],
                    i = this.visaData.filter(function (e) {
                        return (e.visaResIdAndJourneyId || []).filter(function (e) {
                            return e.journeyId == t && (!~n.indexOf(e.resId) && n.push(e.resId), !0)
                        }).length
                    });
                i = i.filter(function (e) {
                    return e.visaInfo && ~n.indexOf(e.visaInfo.id)
                }), this.$el.append(e({
                    data: i,
                    journeyId: t
                })).removeClass("section-loading"), this.status = 5, this.initRetail(), this.bind()
            }
        }, {
            key: "initRetail", value: function () {
                var e = $(".J_retailName");
                u.fetchRetail.setBookCode(m.getState("bookCityCode")), u.fetchRetail.fetch(function (t) {
                    e.find(".J_retailTxt").text(t[0] && t[0].name).end().show()
                })
            }
        }, {
            key: "bind", value: function () {
                this.$el.find(".J_DetailVisaBlock").each(function () {
                    var e = $(this);
                    e.find(".J_VisaTab").each(function () {
                        (0, s.createTaber)($(this), {ctx: e})
                    }).end().find(".J_DetailVisaDeadline").each(function () {
                        var e = $(this), t = e.parent(), n = t.find(".detail-visa-deadline");
                        e.click(function (e) {
                            e.stopPropagation(), t.hasClass("expand") ? t.removeClass("expand") : t.addClass("expand")
                        }), n.click(function (e) {
                            e.stopPropagation()
                        }), $(document).click(function () {
                            t.removeClass("expand")
                        })
                    }).end().find(".J_DetailVisaSend").click(function () {
                        g = $(this).data("id"), y = $(this).data("name"), x(w, "send")
                    }).end().find(".J_DetailVisaPrint").click(function () {
                        g = $(this).data("id"), y = $(this).data("name"), x(D, "print")
                    })
                }), this.$el.find(".detail-visa-material-attachment").each(function () {
                    var e = $(this).find("a"), t = [], n = [];
                    e && e.each(function () {
                        var e = $(this).html(), i = function () {
                            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toLowerCase().split("."),
                                t = e[e.length - 1];
                            return ["png", "jpg", "jpeg", "gif", "bmp"].indexOf(t) > -1
                        }(e), a = function () {
                            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toLowerCase().split("."),
                                t = e[e.length - 1];
                            return ["pdf"].indexOf(t) > -1
                        }(e);
                        i ? (t.push($(this)), n.push({
                            src: this.href,
                            name: ""
                        }), $(this).removeAttr("href")) : a && this.setAttribute("target", "_blank"), t.forEach(function (e, t) {
                            $(e).click(function () {
                                _(n, {index: t})
                            })
                        })
                    })
                })
            }
        }, {
            key: "remove", value: function () {
                this.$el.remove(), h.trigger("resize")
            }
        }, {
            key: "isLoaded", value: function () {
                return this.status >= 4
            }
        }, {
            key: "isRendered", value: function () {
                return this.status >= 5
            }
        }]), e
    }();
    t['default'] = T
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }(), a = n(2), o = n(9), r = n(27), s = n(93);
    var l = 1, c = a.template.compile(s.detailGuideTemplate), d = $(window), u = function () {
        function e(t) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.status = l, this.allGuideData = null, this.$el = t.$el
        }

        return i(e, [{
            key: "load", value: function (e) {
                this.allGuideData = e, this.status = 4
            }
        }, {
            key: "getGuideData", value: function (e) {
                return (this.allGuideData.journeyGuides || []).filter(function (t) {
                    return t && t.journeyId == e && t.tourGuides && t.tourGuides.length
                })[0]
            }
        }, {
            key: "render", value: function () {
                var e = this.$el.data("id"), t = this.getGuideData(e);
                t ? (this.$el.append(c({
                    data: t,
                    tip: this.allGuideData.tips,
                    guideEntranceUrl: this.allGuideData.guideEntranceUrl || ""
                })).removeClass("section-loading").addClass("loaded-guide"), this.bind()) : this.remove(), d.trigger("resize")
            }
        }, {
            key: "bind", value: function () {
                (0, r.createGallery)(this.$el.find(".J_GuideGallery")), this.$el.find(".J_guideTip").each(function () {
                    var e, t = $(this);
                    (e = t[0]) && (e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth) && new o.Tip(t, {
                        content: t.siblings(".J_guideTipContent").html(),
                        dialog: {tipsOffset: [10, -30], area: ["280px", "auto"]}
                    })
                })
            }
        }, {
            key: "remove", value: function () {
                this.$el.remove(), d.trigger("resize")
            }
        }, {
            key: "isLoaded", value: function () {
                return this.status >= 4
            }
        }, {
            key: "isRendered", value: function () {
                return this.status >= 5
            }
        }]), e
    }();
    t['default'] = u
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }();
    var a = [], o = $(window);

    function r(e) {
        for (var t in e = Object.assign({}, e)) e.hasOwnProperty(t) && (e[t] = -e[t]);
        return e
    }

    var s = function () {
        function e(t, n) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.options = Object.assign({direction: "h"}, n), this.children = null, this.size = null, this.prevDisabled = !0, this.nextDisabled = !0, this.position = {
                left: 0,
                top: 0
            }, this.$container = t, this.$list = null, this.$prev = null, this.$next = null, this.init(), this.bind()
        }

        return i(e, [{
            key: "init", value: function () {
                this.options.direction;
                this.$list = this.$container.find("[data-role=list]"), this.$prev = this.$container.find("[data-role=prev]"), this.$next = this.$container.find("[data-role=next]"), this.children = function (e, t) {
                    return e.find("[data-role=item]").toArray().map(function (e) {
                        return {$element: e = $(e)}
                    })
                }(this.$list), this.updateSize(), this.updateState(), this.updateView()
            }
        }, {
            key: "update", value: function () {
                this.updateSize(), this.move(0)
            }
        }, {
            key: "updateSize", value: function () {
                var e = "h" === this.options.direction ? "width" : "height";
                !function (e) {
                    e.forEach(function (e) {
                        e.width = e.$element.outerWidth(!0), e.height = e.$element.outerHeight(!0)
                    })
                }(this.children), this.size = {
                    width: this.$container.width(),
                    height: this.$container.height()
                }, this.$list[e](this.children.reduce(function (t, n) {
                    return n[e] + t
                }, 0)), this.listSize = {
                    width: this.$list.width(),
                    height: this.$list.height()
                }, this.listSize[e] <= this.size[e] ? (this.$prev.hide(), this.$next.hide()) : (this.$prev.show(), this.$next.show())
            }
        }, {
            key: "updatePosition", value: function (e) {
                var t = this.options.direction, n = "h" === t ? "left" : "top", i = "h" === t ? "width" : "height",
                    a = 0, o = this.position[n];
                e > 0 && (o += this.size[i]), this.children.some(function (t, n) {
                    var i = a + t.width;
                    return 1 === e && o >= a && o < i ? (a = i, !0) : -1 === e && o > a && o <= i || (a = i, !1)
                }), e > 0 && (a -= this.size[i]), this.listSize[i] - a < this.size[i] && (a = this.listSize[i] - this.size[i]);
                var r = {};
                r[n] = a, this.position = Object.assign({left: 0, top: 0}, r)
            }
        }, {
            key: "updateState", value: function () {
                var e = this.options.direction, t = "h" === e ? "left" : "top", n = "h" === e ? "width" : "height",
                    i = this.position, a = this.size, o = this.listSize;
                i[t] <= 0 ? this.prevDisabled = !0 : this.prevDisabled = !1, i[t] + a[n] >= o[n] ? this.nextDisabled = !0 : this.nextDisabled = !1
            }
        }, {
            key: "updateView", value: function () {
                this.prevDisabled ? this.$prev.addClass("disabled") : this.$prev.removeClass("disabled"), this.nextDisabled ? this.$next.addClass("disabled") : this.$next.removeClass("disabled")
            }
        }, {
            key: "bind", value: function () {
                var e = this;
                this.$prev.click(function () {
                    e.prevDisabled || e.move(-1)
                }), this.$next.click(function () {
                    e.nextDisabled || e.move(1)
                })
            }
        }, {
            key: "move", value: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                0 === e ? this.$list.css(r(this.position)) : (this.updatePosition(e), this.updateState(), this.updateView(), this.$list.stop(!0, !0).animate(r(this.position), 700))
            }
        }]), e
    }();
    o.on("resize", function () {
        a.forEach(function (e) {
            return e.update()
        })
    }), t.createGallery = function (e, t) {
        var n = new s(e, t);
        return a.push(n), n
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }(), a = n(2), o = n(9), r = n(94);
    !function (e) {
        e && e.__esModule
    }(n(5));
    var s = 2, l = $(window), c = function () {
        function e(t) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.data = null, this.currentData = null, this.$el = t.$el, this.status = s
        }

        return i(e, [{
            key: "load", value: function (e) {
                this.data = e, this.status = 5
            }
        }, {
            key: "render", value: function (e) {
                if (!(this.status < 5)) {
                    var t = a.template.compile(r.detailUpgradeTemplate);
                    this.currentData = this.data[Number(e)] || null, this.currentData && this.$el ? (this.$el.append(t({
                        data: this.currentData,
                        journeyId: this.journeyId
                    })).removeClass("section-loading"), this.bind(), l.trigger("resize")) : this.remove(), this.status = 6
                }
            }
        }, {
            key: "remove", value: function () {
                this.$el.remove(), l.trigger("resize")
            }
        }, {
            key: "bind", value: function () {
                this.$el.find(".J_UpgradeItem").each(function () {
                    var e = $(this), t = e.parent(), n = e.siblings(".J_UpgradeDetail");
                    n.length && (n.remove().show(), new o.Tip(e, {
                        type: "click",
                        content: $("<div />").append(n[0]).html(),
                        dialog: {tipsOffset: [0, -20]},
                        width: function () {
                            return t.outerWidth()
                        }
                    }))
                })
            }
        }, {
            key: "isLoaded", value: function () {
                return this.status >= 5
            }
        }, {
            key: "isRendered", value: function () {
                return this.status >= 6
            }
        }]), e
    }();
    t['default'] = c
}, function (e, t, n) {
    "use strict";
    var i = n(0), a = n(30);
    n(36);
    var o = function (e) {
        return e && e.__esModule ? e : {default: e}
    }(n(38)), r = n(68), s = n(20);
    var l = window.pageData, c = (0, i.createStore)(a.reducers, {
        status: l.status,
        adType: l.adType,
        startDate: l.startDate,
        isLogin: l.isLogin,
        productId: l.productId,
        brandId: l.brandId,
        productType: l.productType,
        classBrandId: l.classBrandId,
        destGroupId: l.destGroupId,
        destGroupName: l.destGroupName,
        proMode: l.proMode,
        tagType: l.tagType,
        bookCityCode: l.bookCityCode,
        departCityCode: l.departCityCode,
        backCityCode: l.backCityCode,
        teamCityName: l.teamCityName,
        isSupportMultipleJourney: l.isSupportMultipleJourney,
        multiJourneyBaseInfos: l.multiJourneyBaseInfos,
        journeyId: l.journeyId,
        defaultJourneyId: l.defaultJourneyId,
        defaultJourneyType: l.defaultJourneyType,
        defaultJourneyDetail: l.defaultJourneyDetail,
        operateFlag: l.operateFlag,
        calendar: null,
        departDate: "",
        retailCity: l.signInfo && l.signInfo.company,
        adult: 2,
        child: 0,
        freeChild: 0,
        departCity: {code: l.departCityCode, name: l.departCityName},
        backCity: {code: l.backCityCode, name: l.backCityName},
        hotDepartCities: l.recommendCityList,
        allDepartCities: l.departCityList,
        allBackCities: l.backCityObj,
        allBookCities: l.bookCityObj,
        connection: l.connection,
        includeCombinedPrice: l.includeCombinedPrice,
        connectionDesc: l.connectionDesc,
        connectionIntroduction: l.connectionIntroduction,
        connectionNotice: l.connectionNotice,
        poiId: l.poiId,
        destination: l.destination
    });
    (0, s.add)("INITIALIZED", c.getState()), c.subscribe(function (e) {
        (0, s.add)(e.type, e.data)
    }), o['default'].init(), r.detailModule.init()
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.reducers = void 0;
    var i = n(0), a = n(31), o = l(n(32)), r = n(33), s = l(n(34));

    function l(e) {
        return e && e.__esModule ? e : {default: e}
    }

    t.reducers = (0, i.combineReducer)(Object.assign({}, a.commonReducers, o['default'], r.detailReducers, s['default']))
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.commonReducers = void 0;
    var i = function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }(n(15));
    t.commonReducers = {
        isLogin: function (e, t) {
            return t.type === i.CHANGE_LOGIN_STATUS ? t.data : e
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }(n(4));
    t['default'] = {
        calendar: function (e, t) {
            return t.type === i.LOAD_CALENDAR ? t.data : e
        }, originCalendar: function (e, t) {
            return t.type === i.LOAD_ORIGIN_CALENDAR ? t.data : e
        }, roomBudget: function (e, t) {
            return t.type === i.LOAD_CALENDAR_ROOM_BUDGET ? t.data : e
        }, departDate: function (e, t) {
            return t.type === i.CHANGE_DEPART_DATE ? t.data : e
        }, departCity: function (e, t) {
            return t.type === i.CHANGE_DEPART_CITY && t.data && t.data.code && t.data.code !== e.code ? t.data : e
        }, backCity: function (e, t) {
            return t.type === i.CHANGE_BACK_CITY && t.data && t.data.code ? t.data : e
        }, adult: function (e, t) {
            return t.type === i.CHANGE_ADULT ? t.data : e
        }, child: function (e, t) {
            return t.type === i.CHANGE_CHILD ? t.data : e
        }, freeChild: function (e, t) {
            return t.type === i.CHANGE_FREE_CHILD ? t.data : e
        }, departDateTarget: function (e, t) {
            return t.type === i.CHANGE_DEPART_DATE_TARGET ? t.data : e
        }, duration: function (e, t) {
            return t.type === i.CHANGE_JOURNEY_DAY ? t.data : e
        }, status: function (e, t) {
            return t.type === i.CHANGE_PRODUCT_STATUS && e != t.data ? t.data : e
        }, currentJourney: function (e, t) {
            return t.type === i.CHANG_DETAIL_JOURNEY ? t.data : e
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.detailReducers = void 0;
    var i = function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }(n(8));
    t.detailReducers = {
        currentJourney: function (e, t) {
            return t.type === i.CHANG_DETAIL_JOURNEY ? t.data : e
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = n(35);
    t['default'] = {
        supplier: function (e, t) {
            return t.type === i.actions.LOAD_SUPPLIER ? t.data : e
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.actions = void 0;
    var i = s(n(15)), a = s(n(14)), o = s(n(4)), r = s(n(8));

    function s(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }

    t.actions = Object.assign({}, i, o, r, a)
}, function (e, t, n) {
    "use strict";
    n(37)
}, function (e, t) {
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), n(39);
    var i = n(0), a = n(1), o = n(16), r = n(9), s = b(n(5)), l = y(n(4)), c = y(n(42)), d = b(n(43)), u = b(n(47)),
        f = b(n(52)), p = b(n(55)), h = b(n(60)), v = b(n(66)), m = b(n(67)), g = n(20);

    function y(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }

    function b(e) {
        return e && e.__esModule ? e : {default: e}
    }

    var _ = void 0, x = [], j = $(window), w = $(document), D = void 0, k = void 0, C = void 0, I = !1, T = void 0,
        S = void 0, M = 13, O = 700, E = .5, A = .9, P = .5;

    function J() {
        var e, t = 0, n = void 0, i = void 0, a = void 0, o = void 0, r = void 0, s = void 0, l = void 0, c = void 0,
            u = void 0, p = void 0, h = void 0, v = void 0, m = void 0;
        I || (e = x.shift()) && e.offset && ((n = function (e) {
            return $("<div />").append(e.html).addClass("calendar-mask").css(e.offset).css({
                "-webkit-transform": "scale(" + A + ")",
                transform: "scale(" + A + ")"
            })
        }(e)).appendTo("body"), i = n.width(), a = n.height(), T = S.offset(), o = e.offset.left, r = e.offset.top, c = T.left + 70 + i, u = T.top + 12 - a * E / 2, s = (o + c) / 2, l = Math.min(r, u) - 100, p = o - 2 * s + c, h = 2 * (s - o), v = r - 2 * l + u, m = 2 * (l - r), I = !0, d['default'].disable(), function e() {
            var s = function (e) {
                var t = Math.min(e / O, 1), n = p * Math.pow(t, 2) + h * t + o, i = v * Math.pow(t, 2) + m * t + r;
                return 1 !== t && {left: n, top: i}
            }(t), l = Math.max(A - t / O, P);
            s ? (n.css(s).width(i * l).height(a * l).children().css({
                "-webkit-transform": "scale(" + l + ")",
                transform: "scale(" + l + ")"
            }), t += M, setTimeout(e, M)) : (n.remove(), d['default'].enable(), f['default'].flash(), f['default'].update(), I = !1, x.length && J())
        }())
    }

    function N() {
        var e = function () {
            var e = k.offset();
            if (!e) return !1;
            var t = k.height(), n = j.scrollTop(), i = j.height();
            return Object.assign({}, e, {inView: e.top >= n && e.top + t <= n + i})
        }();
        e && (e.inView || j.scrollTop(e.top - 50), f['default'].flash())
    }

    t['default'] = {
        init: function () {
            var e = (_ = (0, i.getStore)()).getState("status");
            D = $("#J_Calendar"), k = $("#J_ResourceDate"), S = k, C = $("#J_Form"), 2 != e && (this.initCalendar(), this.initCity(), this.initDate(), this.initTourist(), this.initInstallmentTip(), this.initPriceTip(), v['default'].init({couponReceiveUrl: s['default'].url.couponReceive}), 1 == _.getState("productType") && h['default'].init(_.getState("startDate"))), this.initGallery(), this.initStarTip(), this.initPromotionTip(), this.initJourney(), this.initRecommend(), this.initFeature(), this.initQr(), this.initFavorite(), this.initService(), this.bind();
            var t = {};
            2 != e && 1 == _.getState("productType") && (t.supplier = 1, t.productId = _.getState("productId"), t.destGroupId = _.getState("destGroupId"), t.destGroupName = _.getState("destGroupName")), c.fetch(s['default'].url.aggregation, t)
        }, bind: function () {
            var e = this;
            _.subscribe(function () {
                if ("calendar" === _.getState("departDateTarget")) {
                    var e = _.getState("departDate"), t = D.find('[data-date="' + e + '"]');
                    x.push({date: e, offset: t.offset(), html: t.clone()}), J()
                }
            }, "change:departDate"), _.subscribe(function () {
                var e = _.getState("calendar"), t = _.getState("allDepartCities");
                e && e.length || _.dispatch({type: l.CHANGE_PRODUCT_STATUS, data: t && t.length > 1 ? 3 : 2})
            }, "change:calendar"), _.subscribe(function () {
                e.update()
            }, "change:status"), //$(".J_Submit").click(function () {
                //return e.submit() }),
                $(".J_SubmitDetail").click(function () {
                    return e.submit(!0)
                })
        }, submit: function (e) {
            if (0 != _.getState("status")) return !1;
            if (!_.getState("departDate")) return e ? (N(), f['default'].showDatePicker(), w.trigger("customclick", "date")) : function (e, t) {
                var n = a.layer.open({
                    type: 1,
                    title: !1,
                    content: '<div class="dialog-error"><div class="dialog-close"></div><i class="icon"></i>' + e + "</div>",
                    area: ["400px", "auto"],
                    btn: !1,
                    closeBtn: !1,
                    success: function (e) {
                        e.on("click", ".dialog-close", function () {
                            a.layer.close(n)
                        })
                    },
                    end: function () {
                        t && t()
                    }
                })
            }("请选择日期", N), !1;
            var t = {begin_date: "departDate", user_num: "adult", child_count: "child"};

            function n(e, t) {
                C.find("[name=" + e + "]").val(t)
            }

            for (var i in t) n(i, _.getState(t[i]));
            return 2 == _.getState("proMode") && (n("normalChildCount", _.getState("child")), n("freeChildCount", _.getState("freeChild"))), C.find("[name=from_url]").val(location.href), C.attr("action", s['default'].url.submit({productId: _.getState("productId")})), (0, g.send)(), C.submit(), !0
        },
        // update: function () {
        //     var e = _.getState("status"), t = $("#J_ResourcePrice");
        //     3 == e ? (t.html('\n <div class="resource-section-item resource-price-item resource-price-saleout">\n                    <div class="resource-price-empty"><strong>当前出发城市暂时无法销售~</strong></div>\n                    <div class="resource-price-other">看看其他出发城市吧</div>\n                </div>\n            '), $(".J_Submit").addClass("disabled"), $("#J_basisInstallment").remove()) : 2 == e && (t.html('\n                <div class="resource-section-item resource-price-item resource-price-saleout">\n                    <div class="resource-price-empty"><strong>当前线路暂时无法销售~</strong></div>\n                    <div class="resource-price-other">可以看看其他相似线路</div>\n                </div>\n            '), $(".J_Submit").addClass("disabled"), $("#J_basisInstallment").remove())
        // },
        initGallery: function () {
            new o.Gallery("#J_Gallery", {autoChange: !0})
        }, initCalendar: function () {
            d['default'].init({calendarUrl: s['default'].url.calendar})
        }, initCity: function () {
            u['default'].init({pageUrl: s['default'].url.page})
        }, initDate: function () {
            f['default'].init()
        }, initTourist: function () {
            p['default'].init()
        }, initPriceTip: function () {
            var e = $("#J_ResourcePriceTip"), t = $("#" + e.data("for")), n = $("#J_ResourcePromotionPriceTip"),
                i = $("#" + n.data("for"));
            new r.Tip(e, {
                content: $("<div />").append(t.removeClass("tip-content")).html(),
                dialog: {tipsOffset: [10, -27]}
            }), new r.Tip(n, {
                content: $("<div />").append(i.removeClass("tip-content")).html(),
                dialog: {area: ["380px", "auto"], tipsOffset: [10, -27]}
            })
        }, initInstallmentTip: function () {
            new r.Tip($("#J_basisInstallmentMore"), {
                content: $("#T_basisInstallmentTip").html(),
                dialog: {tipsOffset: [10, -2]}
            })
        }, initPromotionTip: function () {
            new r.Tip($("#J_basisPromotionMore"), {
                type: "click",
                content: $("#T_basisPromotionTip").html(),
                dialog: {area: ["290px", "auto"], tipsOffset: [0, -20]}
            })
        }, initRecommend: function () {
            var e = $("#J_ResourceRecommend"), t = e.find(".resource-section-content"),
                n = e.find(".resource-recommend-content-outer"), i = e.find(".resource-recommend-content-inner"),
                a = e.find(".resource-recommend-expand"), o = i.height();
            n.height() < o && (e.addClass("fixed").height(72), n.height(72).css("max-height", "none"), a.show(), t.hover(function () {
                n.height(o), e.addClass("expanded"), !0
            }, function () {
                n.height(72), e.removeClass("expanded"), !1
            }))
        }, initJourney: function () {
            var e = $("#J_ResourceJourney"), t = e.find(".resource-section-content"),
                n = e.find(".resource-section-content-inner"), i = n.children().toArray(), a = t.height();
            if (a < n.height()) {
                n.clone().append('<a href="javascript:;" class="resource-journey-less">收起</a>').addClass("more").appendTo(t), n.addClass("less"), n.append('<a href="javascript:;" class="resource-journey-more" mm="点击_头部区_基本信息__行程概要_展开行程概要">...详细</a>');
                do {
                    $(i.pop()).remove()
                } while (a < n.height());
                e.on("click", ".resource-journey-less", function () {
                    e.removeClass("expand")
                }).on("click", ".resource-journey-more", function () {
                    e.addClass("expand")
                })
            }
        }, initFeature: function () {
            var e = $("#J_basisFeature"), t = e.find(".J_basisFeatureInner"), n = e.find(".J_basisFeatureList"),
                i = t.height(), a = n.height(), o = !1;
            i < a && $("<div />").addClass("resource-feature-more").html("更多<i></i>").click(function () {
                o ? (t.height(i), $(this).html("更多<i></i>").removeClass("expand"), o = !1) : (t.height(a), $(this).html("收起<i></i>").addClass("expand"), o = !0)
            }).appendTo(t), t.find(".J_basisFeatureItem").each(function () {
                var e = $(this);
                new r.Tip(e, {type: "click", content: e.find("script").html(), dialog: {tipsOffset: [10, -27]}})
            })
        }, initQr: function () {
            $(".J_QR").hover(function () {
                $(this).addClass("expand")
            }, function () {
                $(this).removeClass("expand")
            })
        }, initFavorite: function () {
            m['default'].init({
                checkFavoriteStateUrl: s['default'].url.checkFavoriteState,
                addFavoriteUrl: s['default'].url.addFavorite,
                removeFavoriteUrl: s['default'].url.removeFavorite
            })
        }, initService: function () {
            function e(e) {
                e && e.url && ($(".J_Service").attr({
                    href: e.url,
                    target: "_blank"
                }).show(), window.showHeadTuniuChat ? window.showHeadTuniuChat(e) : window.showHeadTuniuChat = e)
            }

            window.getKefuData ? window.getKefuData(e) : (window.sidebarCallbacks = window.sidebarCallbacks || [], window.sidebarCallbacks.push(e))
        }, initStarTip: function () {
            new r.Tip($("#J_basisStar"), {
                content: $("#T_basisStarTip").html(),
                dialog: {area: ["400px", "auto"], tipsOffset: [10, -27]}
            })
        }
    }
}, function (e, t) {
}, function (e, t) {
}, function (module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: !0});
    var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };

    function ckcpt() {
        return ""
    }

    function ckstyle() {
        return {
            cpath: "",
            language: "",
            flashvars: "",
            setup: "1,1,1,1,1,2,0,1,2,0,0,1,200,0,2,1,0,1,1,1,1,10,3,0,1,2,3000,0,0,0,0,1,1,1,1,1,1,250,0,90,0,0,0",
            pm_bg: "0x000000,100,230,180",
            mylogo: "logo.swf",
            pm_mylogo: "1,1,-100,-55",
            logo: "cklogo.png",
            pm_logo: "2,0,-100,20",
            control_rel: "related.swf,ckplayer/related.xml,0",
            control_pv: "Preview.swf,105,2000",
            pm_repc: "",
            pm_spac: "|",
            pm_fpac: "file->f",
            pm_advtime: "2,0,-110,10,0,300,0",
            pm_advstatus: "1,2,2,-200,-40",
            pm_advjp: "1,1,2,2,-100,-40",
            pm_padvc: "2,0,-13,-13",
            pm_advms: "2,2,-46,-67",
            pm_zip: "1,1,-20,-8,1,0,0",
            pm_advmarquee: "1,2,50,-70,50,20,0,0x000000,50,0,20,1,30,2000",
            pm_glowfilter: "1,0x01485d, 100, 6, 3, 10, 1, 0, 0",
            advmarquee: escape('{a href="http://www.ckplayer.com"}{font color="#FFFFFF" size="12" face="Microsoft YaHei"}这里可以放文字广告，播放器默认使用这里设置的广告内容，如果不想在这里使用可以清空这里的内容，如果想在页面中实时定义滚动文字广告内容，可以清空这里的内容，然后在页面中设置广告函数。{/font}{/a}'),
            mainfuntion: "",
            flashplayer: "",
            calljs: "ckplayer_status,ckadjump,playerstop,ckmarqueeadv",
            myweb: escape(""),
            cpt_lights: "1",
            cpt_share: "ckplayer/share.xml",
            cpt_list: ckcpt()
        }
    }

    var CKobject = {
        _K_: function (e) {
            return "string" == typeof e ? document.getElementById(e) : e
        },
        _T_: !1,
        _M_: !1,
        _G_: !1,
        _Y_: !1,
        _I_: null,
        _J_: 0,
        _O_: {},
        uaMatch: function (e, t, n, i, a, o, r, s, l) {
            var c = t.exec(e);
            return null != c ? {b: "IE", v: c[2] || "0"} : null != (c = n.exec(e)) ? {
                b: c[1] || "",
                v: c[2] || "0"
            } : null != (c = i.exec(e)) ? {b: c[1] || "", v: c[2] || "0"} : null != (c = a.exec(e)) ? {
                b: c[1] || "",
                v: c[2] || "0"
            } : null != (c = o.exec(e)) ? {b: c[2] || "", v: c[1] || "0"} : null != (c = r.exec(e)) ? {
                b: c[1] || "",
                v: c[2] || "0"
            } : null != (c = s.exec(e)) ? {b: c[1] || "", v: c[2] || "0"} : null != (c = l.exec(e)) ? {
                b: c[1] || "",
                v: c[2] || "0"
            } : {b: "unknown", v: "0"}
        },
        browser: function () {
            var e = navigator.userAgent.toLowerCase(),
                t = this.uaMatch(e, /(msie\s|trident.*rv:)([\w.]+)/, /(firefox)\/([\w.]+)/, /(opera).+version\/([\w.]+)/, /(chrome)\/([\w.]+)/, /version\/([\w.]+).*(safari)/, /(safari)\/([\w.]+)/, /(mozilla)\/([\w.]+)/, /(mobile)\/([\w.]+)/);
            if (t.b) var n = t.b, i = t.v;
            return {B: n, V: i}
        },
        Platform: function () {
            var e = "", t = navigator.userAgent, n = (navigator.appVersion, {
                iPhone: t.indexOf("iPhone") > -1 || t.indexOf("Mac") > -1,
                iPad: t.indexOf("iPad") > -1,
                ios: !!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: t.indexOf("Android") > -1 || t.indexOf("Linux") > -1,
                webKit: t.indexOf("AppleWebKit") > -1,
                trident: t.indexOf("Trident") > -1,
                gecko: t.indexOf("Gecko") > -1 && -1 == t.indexOf("KHTML"),
                presto: t.indexOf("Presto") > -1,
                mobile: !!t.match(/AppleWebKit.*Mobile.*/) || !!t.match(/AppleWebKit/),
                webApp: -1 == t.indexOf("Safari")
            });
            for (var i in n) if (n[i]) {
                e = i;
                break
            }
            return e
        },
        isHTML5: function () {
            return !!document.createElement("video").canPlayType
        },
        getType: function () {
            return this._T_
        },
        getVideo: function () {
            var e = "", t = this._E_.v;
            if (t && t.length > 1) for (var n = 0; n < t.length; n++) {
                var i = t[n].split("->");
                i.length >= 1 && "" != i[0] && (e += '<source src="' + i[0] + '"'), i.length >= 2 && "" != i[1] && (e += ' type="' + i[1] + '"'), e += ">"
            }
            return e
        },
        getVars: function (e) {
            var t = this._A_;
            return void 0 === t ? null : e in t ? t[e] : null
        },
        getParams: function () {
            var e = "";
            return this._A_ && (1 == parseInt(this.getVars("p")) && (e += ' autoplay="autoplay"'), 1 == parseInt(this.getVars("e")) && (e += ' loop="loop"'), 2 == parseInt(this.getVars("p")) && (e += ' preload="metadata"'), this.getVars("i") && (e += ' poster="' + this.getVars("i") + '"')), e
        },
        getpath: function (e) {
            var t = e.substr(0, 1);
            if ("CDEFGHIJKLMNOPQRSTUVWXYZcdefghijklmnopqrstuvwxyz".indexOf(t) > -1 && (e.substr(0, 4) == t + "://" || e.substr(0, 4) == t + ":\\")) return e;
            var n = unescape(window.location.href).replace("file:///", ""), i = parseInt(document.location.port),
                a = document.location.protocol + "//" + document.location.hostname, o = "", r = "", s = "", l = 0;
            (f = unescape(e).split("//")).length > 0 && (o = f[0] + "//");
            var c = "http|https|ftp|rtsp|mms|ftp|rtmp|file".split("|");
            80 != i && i && (a += ":" + i);
            for (var d = 0; d < c.length; d++) if (c[d] + "://" == o) {
                l = 1;
                break
            }
            if (0 == l) if ("/" == e.substr(0, 1)) s = a + e; else {
                r = n.substring(0, n.lastIndexOf("/") + 1).replace("\\", "/");
                var u = (a = (t = e.replace("../", "./")).split("./")).length, f = t.replace("./", ""),
                    p = r.split("/"), h = p.length - u;
                for (d = 0; d < h; d++) s += p[d] + "/";
                s += f
            } else s = e;
            return s
        },
        getXhr: function () {
            var e;
            try {
                e = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (t) {
                try {
                    e = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (t) {
                    e = !1
                }
            }
            return e || "undefined" == typeof XMLHttpRequest || (e = new XMLHttpRequest), e
        },
        getX: function getX() {
            var f = "ckstyle()";
            this.getVars("x") && 1 != parseInt(this.getVars("c")) && (f = this.getVars("x") + "()");
            try {
                "object" == _typeof(eval(f)) && (this._X_ = eval(f))
            } catch (e) {
                try {
                    "object" == _typeof(eval(ckstyle)) && (this._X_ = ckstyle())
                } catch (e) {
                    this._X_ = ckstyle()
                }
            }
        },
        getSn: function (e, t) {
            return t >= 0 ? this._X_[e].split(",")[t] : this._X_[e]
        },
        getUrl: function (e, t) {
            var n = this, i = ["get", "utf-8"];
            if (e && 2 == e.length) {
                var a = e[0], o = e[1].split("/");
                o.length >= 2 && (i[0] = o[1]), o.length >= 3 && (i[1] = o[2]), this.ajax(i[0], i[1], a, function (e) {
                    if (e && "error" != e) {
                        var i = "", a = e;
                        if (e.indexOf("}") > -1) {
                            for (var o = e.split("}"), r = 0; r < o.length - 1; r++) {
                                i += o[r] + "}";
                                var s = o[r].replace("{", "").split("->");
                                2 == s.length && (n._A_[s[0]] = s[1])
                            }
                            a = o[o.length - 1]
                        }
                        n._E_.v = a.split(","), t ? n.showHtml5() : (n.changeParams(i), n.newAdr())
                    }
                })
            }
        },
        getflashvars: function (e) {
            var t = "", n = 0;
            if (e) for (var i in e) n > 0 && (t += "&"), "f" == i && e[i] && !this.getSn("pm_repc", -1) && (e[i] = this.getpath(e[i]), e[i].indexOf("&") > -1 && (e[i] = encodeURIComponent(e[i]))), "y" == i && e[i] && (e[i] = this.getpath(e[i])), t += i + "=" + e[i], n++;
            return t
        },
        getparam: function (e) {
            var t = "", n = "",
                i = {allowScriptAccess: "always", allowFullScreen: !0, quality: "high", bgcolor: "#000"};
            if (e) for (var a in e) i[a] = e[a];
            for (var o in i) t += o + '="' + i[o] + '" ', n += '<param name="' + o + '" value="' + i[o] + '" />';
            return {w: t = t.replace("movie=", "src="), v: n}
        },
        getObjectById: function (e) {
            var t = this;
            if (t._T_) return t._V_ = t._K_(e), t;
            var n = null, i = t._K_(e);
            if (i && "OBJECT" == i.nodeName) if (void 0 !== i.SetVariable) n = i; else {
                var a = i.getElementsByTagName("embed")[0];
                a && (n = a)
            }
            return n
        },
        ajax: function (e, t, n, i) {
            var a = this.getXhr(), o = [], r = "";
            "get" == e ? (r = n.indexOf("?") > -1 ? n + "&t=" + (new Date).getTime() : n + "?t=" + (new Date).getTime(), a.open("get", r)) : (n = (o = n.split("?"))[0], r = o[1], a.open("post", n, !0)), a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a.setRequestHeader("charset", t), "post" == e ? a.send(r) : a.send(null), a.onreadystatechange = function () {
                if (4 == a.readyState) {
                    var e = a.responseText;
                    i("" != e ? e : null)
                }
            }
        },
        addListener: function addListener(e, f) {
            var o = this._V_;
            switch (e) {
                case"time":
                    e = "timeupdate", this.AT = f, f = this.addListenerTime;
                    break;
                case"totaltime":
                    return void(this.ATAll = f)
            }
            if ("string" == typeof f && (f = eval(f)), o.addEventListener) try {
                o.addEventListener(e, f, !1)
            } catch (e) {
                this.getNot()
            } else if (o.attachEvent) try {
                o.attachEvent("on" + e, f)
            } catch (e) {
                this.getNot()
            } else o["on" + e] = f
        },
        removeListener: function removeListener(e, f) {
            var o = this._V_;
            switch (e) {
                case"time":
                    e = "timeupdate", this.AT = null;
                    break;
                case"totaltime":
                    return void(this.ATAll = null)
            }
            if ("string" == typeof f && (f = eval(f)), o.removeEventListener) try {
                o.removeEventListener(e, f, !1)
            } catch (e) {
                this.getNot()
            } else if (o.detachEvent) try {
                o.detachEvent("on" + e, f)
            } catch (e) {
                this.getNot()
            } else o["on" + e] = null
        },
        Flash: function () {
            var e = !1, t = 0;
            if (document.all || this.browser().B.toLowerCase().indexOf("ie") > -1) try {
                var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                e = !0;
                var i = n.GetVariable("$version");
                t = parseInt(i.split(" ")[1].split(",")[0])
            } catch (e) {
            } else if (navigator.plugins && navigator.plugins.length > 0 && (n = navigator.plugins["Shockwave Flash"])) {
                e = !0;
                for (var a = n.description.split(" "), o = 0; o < a.length; ++o) isNaN(parseInt(a[o])) || (t = parseInt(a[o]))
            }
            return {f: e, v: t}
        },
        embed: function (e, t, n, i, a, o, r, s, l, c) {
            var d = ["all"];
            o ? this.isHTML5() ? this.embedHTML5(t, n, i, a, s, r, d, c) : this.embedSWF(e, t, n, i, a, r, l) : this.Flash().f && parseInt(this.Flash().v) > 10 ? this.embedSWF(e, t, n, i, a, r, l) : this.isHTML5() ? this.embedHTML5(t, n, i, a, s, r, d, c) : this.embedSWF(e, t, n, i, a, r, l)
        },
        embedSWF: function (e, t, n, i, a, o, r) {
            n || (n = "ckplayer_a1"), r || (r = {
                bgcolor: "#FFF",
                allowFullScreen: !0,
                allowScriptAccess: "always",
                wmode: "transparent"
            }), this._A_ = o, this.getX();
            var s = "undefined", l = !1, c = document, u = "http://www.macromedia.com/go/getflashplayer",
                f = '<a href="' + u + '" target="_blank">请点击此处下载安装最新的flash插件</a>',
                p = {w: "您的网页不符合w3c标准，无法显示播放器", f: "您没有安装flash插件，无法播放视频，" + f, v: "您的flash插件版本过低，无法播放视频，" + f},
                h = _typeof(c.getElementById) != s && _typeof(c.getElementsByTagName) != s && _typeof(c.createElement) != s,
                v = 'id="' + n + '" name="' + n + '" ', m = "", g = "";
            r.movie = e, r.flashvars = this.getflashvars(o), -1 == i && (d = !0, this._K_(t).style.width = "100%", i = "100%"), m += '<object pluginspage="http://www.macromedia.com/go/getflashplayer" ', m += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ', m += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=11,3,0,0" ', m += 'width="' + i + '" ', m += 'height="' + a + '" ', m += v, m += 'align="middle">', m += this.getparam(r).v, m += "<embed ", m += this.getparam(r).w, m += ' width="' + i + '" height="' + a + '" name="' + n + '" id="' + n + '" align="middle" ' + v, m += 'type="application/x-shockwave-flash" pluginspage="' + u + '" />', m += "</object>", h ? this.Flash().f ? this.Flash().v < 11 ? (g = p.v, l = !0) : (g = m, this._T_ = !1) : (g = p.f, l = !0) : (g = p.w, l = !0), g && (this._K_(t).innerHTML = g), l && (this._K_(t).style.color = "#0066cc", this._K_(t).style.lineHeight = this._K_(t).style.height, this._K_(t).style.textAlign = "center")
        },
        embedHTML5: function (e, t, n, i, a, o, r, s) {
            this._E_ = {c: e, p: t, w: n, h: i, v: a, s: r, j: !(void 0 != s && !s)}, this._A_ = o, this.getX();
            var l = this.browser().B, c = this.browser().V, d = l + c, u = l + c.split(".")[0], f = "", p = !1,
                h = this.Flash().f, v = !1;
            r || (r = ["iPad", "iPhone", "ios"]);
            for (var m = 0; m < r.length; m++) {
                if ("all" == (f = r[m]).toLowerCase()) {
                    p = !0;
                    break
                }
                if ("all+false" == f.toLowerCase() && !h) {
                    p = !0;
                    break
                }
                if (f.indexOf("+") > -1 ? (f = f.split("+")[0], v = !0) : v = !1, this.Platform() == f || d == f || u == f || l == f) {
                    if (!v) {
                        p = !0;
                        break
                    }
                    if (!h) {
                        p = !0;
                        break
                    }
                }
            }
            if (p) {
                if (a) {
                    var g = a[0].split("->");
                    if (g && 2 == g.length && g[1].indexOf("ajax") > -1) return void this.getUrl(g, !0)
                }
                this.showHtml5()
            }
        },
        status: function status() {
            this._H_ = parseInt(this.getSn("setup", 20));
            var f = "ckplayer_status";
            "" != this.getSn("calljs", 0) && (f = this.getSn("calljs", 0));
            try {
                if ("function" == typeof eval(f)) return this._L_ = eval(f), this._M_ = !0, !0
            } catch (e) {
                try {
                    if ("function" == typeof eval(ckplayer_status)) return this._L_ = ckplayer_status, this._M_ = !0, !0
                } catch (e) {
                    return !1
                }
            }
            return !1
        },
        showHtml5: function showHtml5() {
            var C = this, p = C._E_.p, a = C._E_.v, c = C._E_.c, j = "", b = !1, s = this._E_.v, w = C._E_.w,
                h = C._E_.h, d = !1, r = "";
            1 == s.length && (r = ' src="' + s[0].split("->")[0] + '"'), -1 == w && (d = !0, C._K_(c).style.width = "100%", w = "100%"), w.toString().indexOf("%") > -1 && (w = "100%"), h.toString().indexOf("%") > -1 && (h = "100%"), C._E_.j && (j = ' controls="controls"');
            var v = "<video" + j + r + ' id="' + p + '" width="' + w + '" height="' + h + '"' + C.getParams() + " webkit-playsinline>" + C.getVideo() + "</video>";
            if (C._K_(c).innerHTML = v, C._K_(c).style.backgroundColor = "#000", C._V_ = C._K_(p), d || (C._K_(c).style.width = C._E_.w.toString().indexOf("%") > -1 ? C._K_(c).offsetWidth * parseInt(C._E_.w) * .01 + "px" : C._V_.width + "px", C._K_(c).style.height = C._E_.h.toString().indexOf("%") > -1 ? C._K_(c).offsetHeight * parseInt(C._E_.h) * .01 + "px" : C._V_.height + "px"), C._P_ = !1, C._T_ = !0, "" != C.getVars("loaded")) {
                var f = C.getVars("loaded") + "()";
                try {
                    "function" == typeof eval(f) && eval(f)
                } catch (e) {
                    try {
                        "function" == typeof eval(loadedHandler) && loadedHandler()
                    } catch (e) {
                    }
                }
            }
            C.status(), C.addListener("play", C.playHandler), C.addListener("pause", C.playHandler), C.addListener("error", C.errorHandler), C.addListener("emptied", C.errorHandler), C.addListener("loadedmetadata", C.loadedMetadataHandler), C.addListener("ended", C.endedHandler), C.addListener("volumechange", C.volumeChangeHandler), ("" != C.getVars("m") && null != C.getVars("m") || parseInt(C.getSn("setup", 0)) > 0) && (C._K_(c).style.cursor = "pointer"), ("" != C.getVars("m") && null != C.getVars("m") || 1 == parseInt(C.getSn("setup", 1))) && C.addListener("click", C.html5Click)
        },
        addListenerTime: function () {
            var e = CKobject;
            e.AT && e.AT(e._V_.currentTime)
        },
        videoPlay: function () {
            this._T_ && this._V_.play()
        },
        videoPause: function () {
            this._T_ && this._V_.pause()
        },
        playOrPause: function () {
            this._T_ && (this._V_.paused ? this._V_.play() : this._V_.pause())
        },
        fastNext: function () {
            this._T_ && (this._V_.currentTime = this._V_.currentTime + 10)
        },
        fastBack: function () {
            this._T_ && (this._V_.currentTime = this._V_.currentTime - 10)
        },
        changeVolume: function (e) {
            e < 0 || e > 100 || this._T_ && (this._V_.volume = .01 * e)
        },
        videoSeek: function (e) {
            this._T_ && (this._V_.currentTime = e)
        },
        newAddress: function (e) {
            var t = [];
            if (e && (t = this.isHtml5New(e)) && this._T_) {
                this.changeParams(e);
                var n = t[0].split("->");
                if (n && 2 == n.length && n[1].indexOf("ajax") > -1) return void this.getUrl(n, !1);
                this._E_.v = t, this.newAdr()
            }
        },
        quitFullScreen: function () {
            document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen()
        },
        changeStatus: function (e) {
            this._H_ = e
        },
        newAdr: function () {
            var e = this._E_.v;
            this._V_.pause(), 1 == e.length ? this._V_.src = e[0].split("->")[0] : this._V_.innerHTML = this.getVideo(), this._V_.load()
        },
        isHtml5New: function (e) {
            if (-1 == e.indexOf("html5")) return !1;
            for (var t = e.replace(/{/g, "").split("}"), n = "", i = 0; i < t.length; i++) if (t[i].indexOf("html5") > -1) {
                n = t[i].replace("html5->", "").split(",");
                break
            }
            return n
        },
        changeParams: function (e) {
            if (e) for (var t = e.replace(/{/g, "").split("}"), n = 0; n < t.length; n++) {
                var i = t[n].split("->");
                if (2 == i.length) switch (i[0]) {
                    case"p":
                        1 == parseInt(i[1]) ? this._V_.autoplay = !0 : 2 == parseInt(i[1]) ? this._V_.preload = "metadata" : (this._V_.autoplay = !1, null != this._I_ && (clearInterval(this._I_), this._I_ = null));
                        break;
                    case"e":
                        1 == parseInt(i[1]) ? this._V_.loop = !0 : this._V_.loop = !1;
                        break;
                    case"i":
                        this._V_.poster = i[1]
                }
            }
        },
        frontAdPause: function (e) {
            this.getNot()
        },
        frontAdUnload: function () {
            this.getNot()
        },
        changeFace: function (e) {
            this.getNot()
        },
        plugin: function (e, t, n, i, a, o, r) {
            this.getNot()
        },
        videoClear: function () {
            this.getNot()
        },
        videoBrightness: function (e) {
            this.getNot()
        },
        videoContrast: function (e) {
            this.getNot()
        },
        videoSaturation: function (e) {
            this.getNot()
        },
        videoSetHue: function (e) {
            this.getNot()
        },
        videoWAndH: function (e, t) {
            this.getNot()
        },
        videoWHXY: function (e, t, n, i) {
            this.getNot()
        },
        changeFlashvars: function (e) {
            this.getNot()
        },
        changeMyObject: function (e, t) {
            this.getNot()
        },
        getMyObject: function (e, t) {
            this.getNot()
        },
        changeeFace: function () {
            this.getNot()
        },
        changeStyle: function (e, t) {
            this.getNot()
        },
        promptLoad: function () {
            this.getNot()
        },
        promptUnload: function () {
            this.getNot()
        },
        marqueeLoad: function (e, t) {
            this.getNot()
        },
        marqueeClose: function (e) {
            this.getNot()
        },
        videoError: function (e) {
            this.getNot()
        },
        formatUrl: function (e) {
            this.getNot()
        },
        sendJS: function (e) {
            this.getNot()
        },
        plugAttribute: function (e) {
            this.getNot()
        },
        errorTextShow: function (e) {
            this.getNot()
        },
        openUrl: function (e) {
            window.open(e)
        },
        jsonParse: function (e) {
            this.getNot()
        },
        promptShow: function (e, t, n) {
            this.getNot()
        },
        screenShot: function (e, t, n, i, a) {
            this.getNot()
        },
        fullScreen: function () {
            this.getNot()
        },
        allowFull: function () {
            this.getNot()
        },
        loadButton: function () {
            this.getNot()
        },
        getFile: function () {
            this.getNot()
        },
        textBoxShow: function () {
            this.getNot()
        },
        loadElement: function () {
            this.getNot()
        },
        textBoxClose: function () {
            this.getNot()
        },
        textBoxTween: function () {
            this.getNot()
        },
        getNot: function () {
            return "The ckplayer's API for HTML5 does not exist"
        },
        volumeChangeHandler: function () {
            var e = CKobject;
            e._V_.muted ? (e.returnStatus("volumechange:0", 1), e._O_.volume = 0, e._O_.mute = !0) : (e._O_.mute = !1, e._O_.volume = 100 * e._V_.volume, e.returnStatus("volumechange:" + 100 * e._V_.volume, 1))
        },
        endedHandler: function endedHandler() {
            var C = CKobject, e = parseInt(C.getVars("e"));
            if (C.returnStatus("ended", 1), C._I_ && (clearInterval(C._I_), C._I_ = null), 0 == e || 4 == e || 6 == e) {
                6 == e && this.quitFullScreen();
                var f = "playerstop()";
                "" != C.getSn("calljs", 2) && (f = C.getSn("calljs", 2) + "()");
                try {
                    if ("function" == typeof eval(f)) return void eval(f)
                } catch (e) {
                    try {
                        if ("function" == typeof eval(playerstop)) return void playerstop()
                    } catch (e) {
                        return
                    }
                }
            }
        },
        loadedMetadataHandler: function () {
            var e = CKobject;
            e.returnStatus("loadedmetadata", 1), e._O_.totalTime = e._V_.duration, e._O_.width = e._V_.width, e._O_.height = e._V_.height, e._O_.awidth = e._V_.videoWidth, e._O_.aheight = e._V_.videoHeight, e._V_.defaultMuted ? (e.returnStatus("volumechange:0", 1), e._O_.mute = !0, e._O_.volume = 0) : (e._O_.mute = !1, e._O_.volume = 100 * e._V_.volume, e.returnStatus("volumechange:" + 100 * e._V_.volume, 1)), 1 == parseInt(e.getVars("p")) && e.playHandler(), e.ATAll && e.ATAll(e._V_.duration)
        },
        errorHandler: function () {
            CKobject.returnStatus("error", 1)
        },
        playHandler: function () {
            var e = CKobject;
            if (e._V_.paused) e.returnStatus("pause", 1), e.addO("play", !1), null != e._I_ && (clearInterval(e._I_), e._I_ = null); else {
                if (e.returnStatus("play", 1), e.addO("play", !0), e._P_ || (e.returnStatus("play", 1), e._P_ = !0), e._I_ = setInterval(e.playTime, parseInt(e.getSn("setup", 37))), !e._G_) for (var t in e._G_ = !0, e._A_) if ("g" == t && e._A_[t]) {
                    var n = parseInt(e._A_[t]);
                    e.videoSeek(n)
                }
                if (!e._Y_) for (var t in e._Y_ = !0, e._A_) if ("j" == t && e._A_[t]) {
                    var i = parseInt(e._A_[t]);
                    e._J_ = i > 0 ? i : parseInt(e._O_.totalTime) + i
                }
            }
        },
        html5Click: function () {
            var e = CKobject;
            "" != e.getVars("m") && null != e.getVars("m") && window.open(e.getVars("m"))
        },
        returnStatus: function (e, t) {
            var n = e;
            3 == this._H_ && (n = this._E_.p + "->" + n), this._M_ && t <= this._H_ && this._L_(n)
        },
        addO: function (e, t) {
            this._O_[e] = t
        },
        getStatus: function () {
            return this._O_
        },
        playTime: function () {
            var e = CKobject, t = e._V_.currentTime;
            e._O_.time = t, e._J_ > 0 && t > e._J_ && (e._J_ = 0, e.videoSeek(e._O_.totaltime)), e.returnStatus("time:" + t, 1)
        }
    };
    exports['default'] = CKobject
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.fetch = function (e, t) {
        $.ajax({
            url: e(), data: t, success: function (e) {
                e && e.success && e.data && e.data.supplier && (0, i.getStore)().dispatch({
                    type: a.LOAD_SUPPLIER,
                    data: function (e) {
                        var t = e.displayDestGroupName || "该类";
                        return e.rows.map(function (e) {
                            var n = (e.satisfactionInfo || [])[0];
                            return n ? (e.statis = Math.round(100 * (n.satisfactionNum || 0)), e.deltaSign = 0 == n.satisfactionDifference ? 0 : n.satisfactionDifference / Math.abs(n.satisfactionDifference), e.delta = Math.round(Math.abs(1e3 * n.satisfactionDifference) || 0) / 10, e.adType = n.adType, e.displayDestGroupName = t) : (e.statis = 0, e.displayDestGroupName = t), e
                        })
                    }(e.data.supplier)
                })
            }
        })
    };
    var i = n(0), a = function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }(n(14))
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = n(0), a = n(2), o = n(1), r = function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }(n(4)), s = u(n(44)), l = u(n(45)), c = u(n(46)), d = n(6);

    function u(e) {
        return e && e.__esModule ? e : {default: e}
    }

    var f = "-", p = 42, h = J(new Date), v = 4, m = a.template.compile(c['default']), g = void 0,
        y = /^(\d{4})\-(\d{2})$/, b = /^(\d{4})\-(\d{2})\-(\d{2})$/, _ = void 0, x = void 0, j = void 0, w = void 0,
        D = void 0, k = void 0, C = void 0, I = [], T = void 0, S = void 0, M = void 0, O = !1;

    function E(e) {
        return y.lastIndex = 0, y.exec(String(e))
    }

    function A(e) {
        return String(e).replace(/\-/g, "/")
    }

    function P(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
        e = String(e);
        for (var n = Math.max(t - e.length, 0); n > 0; n--) e = "0" + e;
        return e
    }

    function J(e) {
        return [e.getFullYear(), P(e.getMonth() + 1), P(e.getDate())].join(f)
    }

    function N(e) {
        return "string" == typeof e && (e = new Date(A(e))), [e.getFullYear(), P(e.getMonth() + 1)].join(f)
    }

    function L() {
        var e = {}, t = [], n = A(D + "-01"), i = new Date(n), a = new Date(n), o = void 0, r = void 0;
        for (i.setDate(i.getDate() - i.getDay()), (a = new Date(i.getTime())).setDate(a.getDate() + p - 1), e.start = J(i), e.end = J(a), o = new Date(A(e.start)); o <= a;) r = J(o), t.push({
            fullDate: r,
            year: o.getFullYear(),
            month: o.getMonth(),
            date: o.getDate(),
            isInCurrentMonth: ~r.indexOf(D)
        }), o.setDate(o.getDate() + 1);
        return e.all = t, e
    }

    function R(e, t) {
        var n = E(e), i = E(t), a = n[1], o = n[2];
        return 12 * (a - i[1]) + (o - i[2])
    }

    function F(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, n = new Date(A(e + "-01"));
        return n.setMonth(n.getMonth() + t), N(n)
    }

    function H(e) {
        var t = R(e, j), n = Math.floor(t / v), i = new Date(A(j + "-01"));
        return i.setMonth(i.getMonth() + n * v), N(i)
    }

    function V(e) {
        return !!(E(e) && e >= k && e <= C) && (D = e, !0)
    }

    function B(e) {
        return e && e.forEach(function (e) {
            if (e) {
                var t = function (e) {
                    return (I || []).filter(function (t) {
                        var n = t.planDate;
                        return !Array.isArray(n) || !n.length || n.some(function (t) {
                            return e === t
                        })
                    })
                }(e.departDate), n = e.strategyIndex, i = (e.strategyDtos || [])[n] || {};
                e.isPromotion = t.some(function (e) {
                    return 14 === e.type
                }), e.promotionPrice = i.coupon, e.promotions = t
            }
        }), e
    }

    t['default'] = {
        init: function (e) {
            var t = this;
            g = e, T = $("#J_Calendar"), (_ = (0, i.getStore)()).subscribe(function () {
                t.load()
            }, "change:calendar"), _.subscribe(function () {
                (function () {
                    var e = _.getState("departDate"), t = L();
                    return e <= t.end && e >= t.start
                })() || (D = N(new Date(A(_.getState("departDate")))), w = H(D)), t.render()
            }, "change:departDate"), j = N(new Date), this.fetch()
        }, bind: function () {
            var e = this;
            T.on("click", ".calendar-date-enabled", function (t) {
                e.changeDepart($(this).data("date")), (0, d.record)("点击_头部区_价格日历_团期日历_选择团期", t)
            }).on("mouseenter", ".calendar-date-enabled", function () {
                var t = $(this), n = t.data("date");
                clearTimeout(M), M = setTimeout(function () {
                    e.showDateDetail(n, t)
                }, 200)
            }).on("mouseleave", ".calendar-date-enabled", function () {
                clearTimeout(M), e.hideDateDetail($(this).data("date"))
            }).on("click", ".calendar-month", function (t) {
                e.changeMonth($(this).data("month")), (0, d.record)("点击_头部区_价格日历_团期月份_切换月份", t)
            }).on("click", ".calendar-prev", function () {
                e.goNextMonth(-1)
            }).on("click", ".calendar-next", function () {
                e.goNextMonth()
            }), R(C, k) <= 3 ? T.find(".calendar-prev, .calendar-next").remove() : T.find(".calendar-prev, .calendar-next").show()
        }, fetch: function (e) {
            var t, n = {
                productId: _.getState("productId"),
                bookCityCode: _.getState("bookCityCode") || void 0,
                departCityCode: _.getState("departCityCode") || void 0,
                backCityCode: _.getState("backCityCode") || void 0
            };
            e = e || 0, t = g.calendarUrl(), $.ajax({dataType: "json", url: t, data: n}).done(function (e) {
                var t = {};
                e && e.success && e.data && (t = e.data), I = t.promotions || [], _.dispatch({
                    type: r.LOAD_CALENDAR_ROOM_BUDGET,
                    data: t.roomAddBudget || {}
                }), _.dispatch({type: r.LOAD_ORIGIN_CALENDAR, data: t}), _.dispatch({
                    type: r.LOAD_CALENDAR,
                    data: B(t.calendars) || []
                })
            }).fail(function () {
                e <= 5 ? this.fetch(e + 1) : _.dispatch({type: r.LOAD_CALENDAR, data: []})
            }.bind(this))
        }, load: function () {
            window.PERFORMANCE && window.d && (window.PERFORMANCE.r = (new Date).getTime() - window.d.getTime()), D = function () {
                var e = _.getState("calendar");
                if (e && e.length) return N(e[0].departDate)
            }() || j, w = H(D), x = function () {
                var e = _.getState("calendar");
                return x = {}, e && e.forEach(function (e) {
                    var t = N(e.departDate);
                    e.isRealTimePrice ? x[t] || (x[t] = 1 / 0) : x[t] = Math.min(e.startPrice, x[t] || 1 / 0)
                }), x
            }(), k = function () {
                var e = _.getState("calendar")[0];
                return e ? N(e.departDate) : null
            }() || j, C = function () {
                var e = _.getState("calendar"), t = e[e.length - 1];
                return t ? N(t.departDate) : F(k, 3)
            }() || j, w = w < k ? k : w, T.removeClass("loading"), this.bind(), this.render(), T.removeClass("loading").find(".calendar-loading-mask").remove()
        }, changeMonth: function (e) {
            V(e) && this.render()
        }, goNextMonth: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            V(F(D, e)) && (this.changeMonthGroup(e), this.render())
        }, changeMonthGroup: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, t = R(D, w), n = void 0;
            t < 4 && t >= 0 || ((n = function (e) {
                var t = new Date(A(w + "-01"));
                return t.setMonth(t.getMonth() + e), N(t)
            }(e)) < k && (n = k), n > C && (n = C), w = n)
        }, changeDepart: function (e) {
            !O && function (e) {
                return b.lastIndex = 0, b.exec(String(e))
            }(e) && function (e) {
                return _.getState("calendar").some(function (t) {
                    return t.departDate === e
                })
            }(e) && (_.dispatch({
                type: r.CHANGE_DEPART_DATE_TARGET,
                data: "calendar"
            }), _.dispatch({type: r.CHANGE_DEPART_DATE, data: e}))
        }, render: function () {
            this.renderMonth(), this.renderDate()
        }, renderMonth: function () {
            D <= k ? T.find(".calendar-prev").addClass("calendar-prev-disabled") : T.find(".calendar-prev").removeClass("calendar-prev-disabled"), D >= C ? T.find(".calendar-next").addClass("calendar-next-disabled") : T.find(".calendar-next").removeClass("calendar-next-disabled"), T.find(".calendar-months").html(a.template.compile(s['default'])({
                list: function () {
                    var e, t, n = [], i = new Date(A(w + "-01"));
                    for (t = 0; t < v; t++) (e = N(i)) >= k && e <= C && n.push({
                        month: e,
                        price: x[e]
                    }), i.setMonth(i.getMonth() + 1);
                    return n
                }(), current: D, nonEmptyMonth: x, infinity: 1 / 0
            }))
        }, renderDate: function () {
            var e = function () {
                var e = L(), t = {};
                return _.getState("calendar").filter(function (t) {
                    return t.departDate >= e.start && t.departDate <= e.end
                }).forEach(function (e) {
                    t[e.departDate] = e
                }), {all: e.all, date: t}
            }();
            e.current = _.getState("departDate"), e.today = h, T.find(".calendar-dates").html(a.template.compile(l['default'])(e))
        }, hideDateDetail: function () {
            o.layer.close(S)
        }, showDateDetail: function (e, t) {
            var n = function (e) {
                var t = _.getState("calendar"), n = null;
                return t && t.length && t.some(function (t) {
                    if (t.departDate === e) return n = t, !0
                }), n
            }(e);
            if (n) {
                if (n.roomBudget = _.getState("roomBudget")[e], _.getState("isSupportMultipleJourney")) _.getState("multiJourneyBaseInfos").forEach(function (e) {
                    e.resId === n.resId && (n.multiJourneyBaseInfo = e.journeyName + "-" + e.journeyAbstractDesc)
                });
                this.openDateDetail(n, t)
            }
        }, openDateDetail: function (e, t) {
            S = o.layer.open({
                type: 4,
                skin: "layui-layer-rim",
                area: ["auto", "auto"],
                content: [m(Object.assign({}, e)), t],
                tips: 3,
                shade: !1,
                fix: !1,
                closeBtn: !1,
                tipsOffset: [-1, -1]
            })
        }, disable: function () {
            O = !0
        }, enable: function () {
            O = !1
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t['default'] = '\n<ul>\n    <% for (var i = 0; i < list.length; i++) { %>\n        <% var item = list[i] %>\n        <li data-month="<%= item.month %>"\n            class="calendar-month\n            <% if (item.month === current) { %>calendar-month-active<% } %>\n            <% if (!item.price) { %>calendar-month-empty<% } %>">\n            <div class="calendar-month-date"><%= item.month.replace(\'-\', \'年\') + \'月\' %></div>\n            <% if (item.price) { %>\n                <% if (item.price < infinity) { %>\n                    <div class="calendar-month-price">&yen;<%= item.price %>起</div>\n                <% } else { %>\n                    <div class="calendar-month-price">实时计价</div>\n                <% } %>\n            <% } else { %>\n                <div class="calendar-month-none-price">无团期</div>\n            <% } %>\n        </li>\n    <% } %>\n</ul>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t['default'] = "\n    <ul>\n        <% var weeks = ['sun', 'mon', 'tue', 'mon', 'thu', 'fri', 'sat']; %>\n        <% for(var i = 0; i < all.length; i++) { %>\n            <%\n                var currentDateObj = all[i];\n                var currentDate = currentDateObj.fullDate;\n                var dateObj = date[currentDate];\n            %>\n            <li data-date=\"<%= currentDate %>\"\n                class=\"calendar-date\n                    calendar-date-<%= weeks[i % 7] %>\n                    <%= (dateObj && currentDateObj.isInCurrentMonth) ? 'calendar-date-enabled' : ''%>\n                    <%= (currentDate === current && currentDateObj.isInCurrentMonth) ? 'calendar-date-active' : ''%>\n                    <%= currentDateObj.isInCurrentMonth ? '' : 'calendar-date-other'%>\">\n                <span class=\"calendar-date-number\">\n                    <%\n                    if (currentDate == today) {\n                        %>今天<%\n                    } else if (currentDate == backDate) {\n                        %>归来<%\n                    } else { %>\n                        <%= currentDateObj.date %>\n                    <% } %>\n                </span>\n                <% if (currentDateObj.isInCurrentMonth) { %>\n                    <div class=\"calendar-date-tag\">\n                        <% if (dateObj && dateObj.isPromotion) { %>\n                            <span class=\"calendar-date-tag-item calendar-date-tag-promotion\"></span>\n                        <% } %>\n                        <% if (dateObj && dateObj.setGroupFlag && dateObj.setGroupFlag === 1) { %>\n                            <span class=\"calendar-date-tag-item calendar-date-tag-tie\"></span>\n                        <% } %>\n                    </div>\n                    <div class=\"calendar-date-group\">\n                        <% if(dateObj && dateObj.setGroupFlag === 2 && dateObj.flightTicketType == 1) {%>\n                            已成团\n                        <% } %>\n                    </div>\n\n                    <div class=\"calendar-date-content\">\n                        <% if (dateObj) { %>\n                            <div class=\"calendar-date-rest\">\n                                <% if(dateObj.setGroupFlag === 2 && dateObj.flightTicketType != 1) {%>\n                                    已成团\n                                <% } %>\n                                <% if (dateObj.flightTicketType == 2) { %>\n                                    <% if (dateObj.isRealTimePrice != 1) { %>\n                                        实时\n                                    <% } else { %>\n                                        &nbsp;\n                                    <% } %>\n                                <% } else if (dateObj.stockInfo && dateObj.stockInfo.stockNum > 0) { %>\n                                    <% if(dateObj.flightTicketType == 1) { %>\n                                        位置有\n                                    <% } else if (dateObj.stockInfo.stockNum <= 9) { %>\n                                        余<%= dateObj.stockInfo.stockNum %>\n                                    <% } else { %>\n                                        充足\n                                    <% } %>\n                                <% } else { %>\n                                    &nbsp;\n                                <% } %>\n                            </div>\n                            <% if (dateObj.isRealTimePrice == 1) { %>\n                                <div class=\"calendar-date-price\">实时计价</div>\n                            <% } else {%>\n                                <div class=\"calendar-date-price\">&yen;<%= dateObj.startPrice %>起</div>\n                            <% } %>\n                        <% } %>\n                    </div>\n                <% } %>\n            </li>\n        <% } %>\n\n    </ul>\n"
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t['default'] = '\n<div class="calendar-detail">\n    <div class="calendar-detail-price">\n        <% if (isRealTimePrice) { %>\n            实时计价\n        <% } else { %>\n            <% if (tuniuPrice) { %>\n                <span>成人价：<strong>&yen;<%= tuniuPrice %></strong></span>\n            <% } %>\n\n            <% if(excludeChildFlag) { %>\n                <span>不支持儿童预订</span>\n            <% } else if(tuniuChildPrice) { %>\n                <span>儿童价：<strong>&yen;<%= tuniuChildPrice %></strong></span>\n            <% } %>\n\n            <% if (roomBudget) { %>\n                <span>单房差：<strong>&yen;<%= roomBudget %></strong></span>\n            <% } %>\n        <% } %>\n        <% if (multiJourneyBaseInfo) { %>\n            <div>适用行程：<strong><%= multiJourneyBaseInfo %></strong></div>\n        <% }  %>\n    </div>\n\n    <% if (isRealTimePrice != 1 && startPrice != tuniuPrice) { %>\n        <div class="calendar-detail-favor">\n            <%\n                var maxCoupon = strategyDtos && strategyDtos.length && strategyDtos[0].coupon || 0;\n                var cutPrice = tuniuPrice - startPrice - maxCoupon;\n            %>\n            *最低优惠价 <strong>&yen;<%= startPrice %></strong> = 途牛成人价 &yen;<%= tuniuPrice %>\n            <% if(cutPrice) {%>\n                - 最大优惠金额 &yen;<%= cutPrice %>\n            <%}%>\n            <%if(maxCoupon) {%>\n                - *抵用券 &yen;<%= maxCoupon%>\n            <%}%>\n        </div>\n    <% } %>\n\n    <% if (isRealTimePrice != 1 && flightTicketType == 2) { %>\n        <div class="calendar-detail-real">\n            本起价对应的机票为实时机票，预订过程中可能会发生价格或位置的变更，请以占位价格为准。\n        </div>\n    <% } %>\n\n    <% if (isRealTimePrice == 1) { %>\n        <div class="calendar-detail-real">\n            当前团期为实时计价团期，预订过程中会根据您所选择的出游项目和优惠活动实时计算价格。\n        </div>\n    <% } %>\n\n    <% if (promotions && promotions.length) { %>\n        <div class="calendar-detail-activity">\n            <div class="calendar-detail-activity-title">团期可选优惠活动：</div>\n            <div class="calendar-detail-activity-list">\n                <% for (var i = 0; i < promotions.length; i++) { %>\n                    <div class="calendar-detail-activity-item"><span><%= promotions[i].name %></span></div>\n                <% } %>\n            </div>\n        </div>\n    <% } %>\n    <% if (deadLineTime) { %>\n        <div class="calendar-detail-deadline">\n            本团期报名截止时间：<%= deadLineTime %>前\n        </div>\n    <% } %>\n    <% if (setGroupFlag) { %>\n        <div class="calendar-detail-tip">\n        <%= setGroupFlag === 1 ? \'*本团期铁定成团，不发团有赔偿\' : setGroupFlag === 2 ? isGroupTips : \'\'%>\n        </div>\n    <% } %>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }(), a = n(0), o = n(2), r = n(9), s = function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }(n(4)), l = p(n(48)), c = p(n(49)), d = p(n(50)), u = p(n(51)), f = n(6);

    function p(e) {
        return e && e.__esModule ? e : {default: e}
    }

    var h = ["ABCDEFG", "HIJKL", "MNOPQRST", "UVWXYZ"], v = o.template.compile(l['default']),
        m = o.template.compile(c['default']), g = o.template.compile(d['default']),
        y = o.template.compile(u['default']), b = void 0, _ = void 0;

    function x() {
        var e = b.getState("departCity") || {};
        return (b.getState("allBackCities") || {})[e.code] || []
    }

    function j() {
        var e = $("#J_Form [name=tel_reg]");
        window.location = _.pageUrl({
            productId: b.getState("productId"),
            bookCity: function () {
                var e = b.getState("departCity").code;
                return (b.getState("allBookCities") || {})[e] || e || 0
            }(),
            departCity: b.getState("departCity").code,
            backCity: b.getState("backCity").code,
            userTel: e.length && e.val() || ""
        })
    }

    function w(e, t) {
        var n = !1;
        return e && t && t.pinyin && (n = ~e.indexOf(t.pinyin.slice(0, 1).toUpperCase())), !!n
    }

    t['default'] = {
        init: function (e) {
            var t, n = $("#J_ResourceDepartCity"), i = $("#J_ResourceBackCity"), o = $("#J_ResourceBackCityRow"),
                l = $("#J_ResourceCombine"), c = ($("#J_ResourceTeamCity"), void 0), d = void 0;
            _ = e, b = (0, a.getStore)(), n.length && (c = C(n, {
                selected: b.getState("departCity"), data: function () {
                    return b.getState("allDepartCities")
                }, hotData: function () {
                    return b.getState("hotDepartCities")
                }, onchange: function (e) {
                    b.dispatch({type: s.CHANGE_DEPART_CITY, data: e}), (0, f.record)("点击_头部区_人数/日期/城市区_出发城市_切换出发城市")
                }
            })), i.length && (d = C(i, {
                type: "back", noTab: !0, selected: b.getState("backCity"), data: function () {
                    return x()
                }, onchange: function (e) {
                    b.dispatch({type: s.CHANGE_BACK_CITY, data: e}), (0, f.record)("点击_头部区_人数/日期/城市区_出发城市_切换归来城市")
                }
            })), t = b.getState("connection"), (3 == b.getState("includeCombinedPrice") || t && 1 == t.isSupportConnection) && new r.Tip(l, {
                type: "click",
                content: function () {
                    var e = void 0, n = void 0;
                    return 3 == b.getState("includeCombinedPrice") ? (e = {
                        connectionDesc: b.getState("connectionDesc"),
                        connectionIntroduction: b.getState("connectionIntroduction"),
                        connectionNotice: b.getState("connectionNotice")
                    }, n = y) : t.isFreeCombined ? (e = {
                        connectionDesc: t.connectDesc,
                        connectionIntroduction: t.connectIntroduction,
                        connectionNotice: t.connectNotice
                    }, n = y) : (e = {connection: t}, n = g), n(e)
                },
                dialog: {area: ["500px", "auto"], tipsOffset: [10, -265], arrowOffset: [-75, 0], disableAutoLeft: !0}
            }), b.subscribe(function () {
                var e = x();
                c && c.set(b.getState("departCity")), i.length && e && e.length && (1 === e.length ? (b.dispatch({
                    type: s.CHANGE_BACK_CITY,
                    data: e[0]
                }), o.hide()) : (d.updateTotal(e.length), d.reload(), o.show()))
            }, "change:departCity"), b.subscribe(function () {
                j()
            }, "change:backCity");
            var u = x();
            i.length && u && u.length > 1 && (d.updateTotal(u.length), d.reload(), b.getState("backCity") && d.set(b.getState("backCity")), o.show())
        }
    };
    var D = function () {
        function e(t, n) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.options = n || {}, this.$container = $(t), this.$drop = this.$container.find(".resource-city-drop"), this.$selected = this.$container.find(".resource-city-more-selected"), this.$dropTab = this.$drop.find(".resource-city-drop-head"), this.$dropList = this.$drop.find(".resource-city-drop-list"), this.dropInited = !1, this.currentTab = this.getDefaultTab(), this.value = n.selected ? Object.assign({}, n.selected) : null, !0 === this.options.noTab && this.$dropTab.remove(), this.bind()
        }

        return i(e, [{
            key: "bind", value: function () {
                var e = this, t = $(document);
                t.click(function () {
                    e.hideDrop()
                }).on("customclick", function (t, n) {
                    "city" !== n && e.hideDrop()
                }), this.$container.on("click", function (e) {
                    t.trigger("customclick", "city"), e.stopPropagation()
                }).hover(function () {
                }, function () {
                }).on("click", ".resource-city-more-label", function () {
                    e.toggleDrop()
                }).on("click", ".resource-city-drop-tab-item", function () {
                    e.changeTab($(this).data("tab"))
                }).on("click", ".resource-city-drop-city-item", function () {
                    e.change($(this).data("code")), e.hideDrop()
                })
            }
        }, {
            key: "set", value: function (e) {
                e && e.code && e.name && (this.value = Object.assign({}, e), this.update())
            }
        }, {
            key: "reload", value: function () {
                this.value = null, this.currentTab = this.getDefaultTab(), this.update(), this.render()
            }
        }, {
            key: "getCityList", value: function () {
                return this.options.data && this.options.data() || []
            }
        }, {
            key: "getHotList", value: function () {
                return this.options.hotData && this.options.hotData() || []
            }
        }, {
            key: "getCityName", value: function () {
                return this.value ? this.value.name : "请选择"
            }
        }, {
            key: "getCurrentGroupData", value: function () {
                var e = this;
                return !0 === this.options.noTab ? this.getCityList() : "hot" === this.currentTab ? this.getHotList() : this.getCityList().filter(function (t) {
                    return w(e.currentTab, t)
                }).sort(function (e, t) {
                    return e.pinyin > t.pinyin ? 1 : -1
                })
            }
        }, {
            key: "render", value: function () {
                !0 !== this.options.noTab && this.renderTab(), this.renderCity()
            }
        }, {
            key: "getAllTabs", value: function () {
                var e = {}, t = this.getCityList(), n = this.getHotList();
                t && t.forEach(function (t) {
                    h.some(function (n) {
                        if (w(n, t)) return e[n] = (e[n] || 0) + 1, !0
                    })
                });
                var i = h.filter(function (t) {
                    return e[t]
                });
                return n && n.length && (i = ["hot"].concat(i)), i
            }
        }, {
            key: "getDefaultTab", value: function () {
                return this.getAllTabs()[0]
            }
        }, {
            key: "renderTab", value: function () {
                var e = this.getAllTabs();
                this.$dropTab.html(v({list: e, current: this.currentTab || e[0]}))
            }
        }, {
            key: "renderCity", value: function () {
                this.$dropList.html(m({list: this.getCurrentGroupData(), current: this.value || {code: -1}}))
            }
        }, {
            key: "changeTab", value: function (e) {
                this.currentTab = e, this.render()
            }
        }, {
            key: "change", value: function (e) {
                this.options && this.options.onchange && this.options.onchange(function (e, t) {
                    var n = void 0;
                    return t && (n = (n = t.filter(function (t) {
                        return t.code == e
                    }).map(function (e) {
                        return Object.assign({}, e)
                    }))[0]), n || null
                }(e, this.getCityList()))
            }
        }, {
            key: "update", value: function () {
                this.$selected.html(this.getCityName())
            }
        }, {
            key: "updateTotal", value: function (e) {
                this.$container.find(".resource-city-more-total").text(e)
            }
        }, {
            key: "toggleDrop", value: function () {
                this.$container.hasClass("expand") ? this.hideDrop() : this.showDrop()
            }
        }, {
            key: "showDrop", value: function () {
                k.forEach(function (e) {
                    return e.hideDrop()
                }), this.render(), this.dropInited = !0, this.$container.addClass("expand")
            }
        }, {
            key: "hideDrop", value: function () {
                this.$container.removeClass("expand")
            }
        }]), e
    }(), k = [];

    function C(e, t) {
        var n = new D(e, t);
        return k.push(n), n
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t['default'] = "\n<ul class=\"resource-city-drop-tab\">\n    <% for (var i = 0; i < list.length; i++) { %>\n        <li class=\"resource-city-drop-tab-item <%= current == list[i] ? 'active' : ''%>\" data-tab=\"<%= list[i] %>\"><%= list[i] == 'hot' ? '推荐城市' : list[i] %></li>\n    <% } %>\n</ul>\n"
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t['default'] = '\n<ul class="resource-city-drop-city-city">\n<% for (var i = 0; i < list.length; i++) {%>\n    <% var item = list[i]%>\n    <li class="resource-city-drop-city-item <%= current.code == item.code ? \'selected\' : \'\'%>" data-code="<%= item.code %>">\n        <div class="resource-city-drop-city-name"><%= item.name %></div>\n        <div class="resource-city-drop-city-price"><strong>&yen;<%= item.price %></strong>起</div>\n    </li>\n<%}%>\n</ul>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t['default'] = '\n<div class="resource-combine-detail">\n    <% if (connection.connectDesc) { %>\n        <div class="resource-combine-detail-head"><%= connection.connectDesc %>：</div>\n    <% } %>\n    <div class="resource-combine-detail-body">\n        <dl class="resource-combine-detail-cities">\n            <% var areaList = connection.connectCityList || [] %>\n            <% for (var areaIndex = 0, areaLength = areaList.length; areaIndex < areaLength; areaIndex++) { %>\n                <% var areaData = areaList[areaIndex] %>\n                <% if (areaData && areaData.cityList && areaData.cityList.length) { %>\n                    <dt><%= areaData.areaName %>：</dt>\n                    <dd>\n                        <% for (var cityIndex = 0; cityIndex < areaData.cityList.length; cityIndex++) { %>\n                            <span><%= areaData.cityList[cityIndex] %></span>\n                        <% } %>\n                    </dd>\n                <% } %>\n            <% } %>\n        </dl>\n        <% if (connection.connectIntroduction) { %>\n            <div class="resouce-combine-detail-tip">\n                <%= connection.connectIntroduction %>。\n            </div>\n        <% } %>\n        <% if (connection.connectTips) { %>\n            <div class="resouce-combine-detail-tip">\n                * <%= connection.connectTips %>。\n            </div>\n        <% } %>\n    </div>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t['default'] = '\n<div class="resource-combine-detail">\n    <% if (connectionDesc) { %>\n        <div class="resource-combine-detail-head"><%= connectionDesc %>：</div>\n    <% } %>\n    <div class="resource-combine-detail-body">\n        <% if (connectionIntroduction) { %>\n            <div class="resource-combine-detail-title">什么是联运交通？</div>\n            <div class="resource-combine-detail-desc"><%= connectionIntroduction %></div>\n        <% } %>\n        <% if (connectionNotice) { %>\n            <div class="resource-combine-detail-title">预订须知</div>\n            <div class="resource-combine-detail-desc"><%=# connectionNotice.replace(/\\n/g, \'<br />\') %></div>\n        <% } %>\n    </div>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = n(0), a = (n(2), c(n(4))), o = c(n(8)), r = c(n(17)), s = n(53), l = n(6);

    function c(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }

    var d = r.getYMDDate(new Date), u = 4, f = 200, p = void 0, h = !1, v = void 0, m = $(window), g = void 0,
        y = void 0, b = void 0, _ = void 0;

    function x(e) {
        return (p.getState("multiJourneyBaseInfos") || []).filter(function (t) {
            return t.resId === e
        })[0]
    }

    t['default'] = {
        init: function () {
            var e = this;
            p = (0, i.getStore)(), y = $("#J_ResourceDate"), g = $("#J_ResourceApplication"), b = y.find(".resource-date-selected"), _ = (0, s.createDatePanel)(), p.subscribe(function () {
                e.bind(), e.update()
            }, "change:calendar")
        }, bind: function () {
            var e = $(document), t = this;
            e.click(function () {
                t.hideDatePicker()
            }).on("customclick", function (e, n) {
                "date" !== n && t.hideDatePicker()
            }), y.click(function (n) {
                t.toggleDatePicker(), e.trigger("customclick", "date"), n.stopPropagation()
            }), g.find("[data-role=button]").click(function () {
                if (v) {
                    p.dispatch({type: o.CHANG_DETAIL_JOURNEY, data: v.journeyId});
                    var e = $("#J_DetailMultiRoute").offset();
                    e && m.scrollTop(e.top)
                }
            })
        }, change: function (e) {
            p.dispatch({type: a.CHANGE_DEPART_DATE_TARGET, data: "date"}), p.dispatch({
                type: a.CHANGE_DEPART_DATE,
                data: e
            }), this.update(), (0, l.record)("点击_头部区_人数/日期/城市区_出游日期_选择出游日期")
        }, update: function () {
            var e = function (e) {
                var t = p.getState("calendar"), n = null;
                return t && t.length && t.some(function (t) {
                    if (t.departDate === e) return n = t, !0
                }), n
            }(p.getState("departDate"));
            if (e) {
                var t = e.resId, n = e.departDate, i = r.getNextDate(n, function (e) {
                    var t = x(e);
                    return t ? t.dayDuration : 1
                }(t));
                b.html([r.formateDate(n, "MM/DD"), " ", r.getWeek(n), "出发", " -- ", r.formateDate(i, "MM/DD"), " ", r.getWeek(i), "返回"].join("")), p.getState("isSupportMultipleJourney") && ((v = x(t)) ? g.show().find("[data-role=label]").text(v.journeyName + " - " + v.journeyAbstractDesc) : g.hide().find("[data-role=label]").text(""))
            }
        }, toggleDatePicker: function () {
            h ? this.hideDatePicker() : this.showDatePicker()
        }, showDatePicker: function () {
            var e = this, t = p.getState("departDate") || (p.getState("calendar")[0] || {}).departDate || d,
                n = new Date(r.justifyDate(t));
            _.open({
                type: 2,
                year: n.getFullYear(),
                month: n.getMonth(),
                current: p.getState("departDate"),
                dateList: function () {
                    var e = {};
                    return p.getState("calendar").forEach(function (t) {
                        e[t.departDate] = !0
                    }), e
                }(),
                min: r.getNowDate(),
                onChange: function (t) {
                    e.change(t)
                }
            }, function () {
                var e = y.offset(), t = (y.width(), m.width());
                return e.top += y.height() + 10, e.arrowLeft = 28, e.left + 650 > t && (e.arrowLeft = e.arrowLeft + e.left + 650 - t, e.left = e.left - (e.left + 650 - t)), e
            }()), h = !0
        }, hideDatePicker: function () {
            _.close(), h = !1
        }, flash: function () {
            var e = 1;

            function t() {
                e % 2 ? y.addClass("flashed") : y.removeClass("flashed"), (e % 2 != 0 || e < u) && (e++, setTimeout(t, f))
            }

            t()
        }
    }
}, function (e, t, n) {
    "use strict";

    function i(e) {
        return "string" == typeof e ? new Date(e.replace(/\-/g, "/")) : e
    }

    function a(e, t) {
        for (t = t || 2, e = parseInt(e) + ""; e.length < t;) e = "0" + e;
        return e
    }

    function o(e) {
        return e.getFullYear() + "-" + a(e.getMonth() + 1) + "-" + a(e.getDate())
    }

    function r(e, t) {
        var n = new Date(e, t, 1), i = n.getDay();
        return 0 !== i ? n.setDate(1 - i) : n.setDate(-6), o(n)
    }

    function s(e, t, n) {
        var a = new Date(e, t + 1, 0), r = a.getDay();
        return 6 !== r && a.setDate(a.getDate() + 6 - r), function (e, t) {
            return "string" == typeof e && (e = i(e)), "string" == typeof t && (t = i(t)), Math.floor((t - e) / 864e5)
        }(n, a) < 41 && a.setDate(a.getDate() + 7), o(a)
    }

    function l() {
        return o(new Date)
    }

    Object.defineProperty(t, "__esModule", {value: !0}), t.createDatePanel = t.createDatePicker = void 0, n(54);
    var c = '<div class="dp-box"><div class="dp-month">{month}</div><div class="dp-days"><div class="dp-weeks"><div class="dp-week dp-weekend">日</div><div class="dp-week">一</div><div class="dp-week">二</div><div class="dp-week">三</div><div class="dp-week">四</div><div class="dp-week">五</div><div class="dp-week dp-weekend">六</div></div><div class="dp-cale">{cale}</div></div></div>',
        d = {type: 1, year: 2015, month: 6};

    function u() {
        this.init()
    }

    u.prototype = {
        init: function () {
            var e = this,
                t = $('<div class="dp-panel"><span class="dp-arrow"><i></i></span><div class="dp-btns"><div class="dp-btn dp-prev">&lt;</div><div class="dp-btn dp-next">&gt;</div></div><div class="dp-wrap"></div></div>');
            this.hovered = !1, this.prevBtn = t.find(".dp-prev"), this.nextBtn = t.find(".dp-next"), this.monthTit = t.find(".dp-month"), this.caleWrap = t.find(".dp-wrap"), this.wrap = t, this.config = {
                type: 1,
                year: 2015,
                month: 6
            }, t.on("click", ".dp-date-item", function (t) {
                e.select($(t.currentTarget).data("date")), e.hovered = !1, e.wrap.hide()
            }), t.on("mousedown", function (e) {
                e.stopPropagation(), e.preventDefault()
            }).hover(function () {
                e.hovered = !0
            }, function () {
                e.hovered = !1
            }), this.nextBtn.click(function () {
                e.nextMonth()
            }), this.prevBtn.click(function () {
                e.prevMonth()
            }), t.appendTo("body")
        }, open: function (e, t) {
            this.set(e), this.render(), this.show(t)
        }, show: function (e) {
            var t = 0;
            this.wrap.css({
                left: e.left,
                top: e.top
            }).show(), this.wrap.find(".dp-arrow").css({left: e.arrowLeft}), this.caleWrap.find(".dp-box").each(function (e) {
                t += $(this).width()
            }), this.caleWrap.width(t)
        }, position: function (e) {
            e && this.wrap.css({left: e.left, top: e.top})
        }, close: function () {
            this.hovered || this.wrap.hide()
        }, select: function (e) {
            var t, n, a, o;
            n = (t = i(e)).getMonth(), a = this.get("month"), o = this.get("onChange"), this.set("current", e), o && function (e) {
                return "function" == typeof e
            }(o) && o(e), n < a || n > a + this.get("type") - 1 ? this.goMonth(t.getFullYear(), t.getMonth()) : this.updateView()
        }, goMonth: function (e, t) {
            this.set("year", e), this.set("month", t), this.render()
        }, prevMonth: function () {
            var e = new Date(this.get("year"), this.get("month") - this.get("type"), 1);
            this.goMonth(e.getFullYear(), e.getMonth())
        }, nextMonth: function () {
            var e = new Date(this.get("year"), this.get("month") + this.get("type"), 1);
            this.goMonth(e.getFullYear(), e.getMonth())
        }, set: function (e, t) {
            "string" == typeof e && void 0 !== t ? this.config[e] = t : this.config = $.extend({}, d, e)
        }, get: function (e) {
            return this.config[e]
        }, render: function () {
            switch (this.get("type")) {
                case 1:
                    this.renderSingleBox();
                    break;
                default:
                    this.renderMultiBox()
            }
        }, getMonthTit: function (e, t) {
            return (e || this.get("year")) + "年" + ((void 0 === t ? this.get("month") : t) + 1) + "月"
        }, renderSingleBox: function () {
            var e = this.get("year"), t = this.get("month"), n = r(e, t), i = s(e, t, n),
                a = this.buildSingleView(n, i);
            this.caleWrap.removeClass("dp-multi").html(a)
        }, buildSingleView: function (e, t) {
            var n = i(e), a = l(), r = e, s = this.get("min"), d = this.get("max"), u = this.get("current"),
                f = this.get("dateList"), p = [], h = c;
            for (p.push('<div class="dp-dates">'); r <= t;) p.push('<div class="dp-date '), r === a && p.push(" dp-now"), r === u && p.push(" dp-selected"), p.push('">'), r < s || t && r > t || d && r > d || f && !f[r] ? p.push('<span class="dp-date-disabled"><i>' + (r == a ? "今天" : n.getDate()) + "</i></span>") : p.push('<a class="dp-date-item" data-date="' + r + '" href="javascript:;"><i>' + (r == a ? "今天" : n.getDate()) + "</i></a>"), p.push("</div>"), n.setDate(n.getDate() + 1), r = o(n), 0;
            return p.push("</div>"), h.replace(/\{month\}/, this.getMonthTit()).replace(/\{cale\}/, p.join(""))
        }, renderMultiBox: function () {
            var e = this.get("type");
            this.caleWrap.empty();
            for (var t = 0; t < e; t++) this.caleWrap.append(this.buildMultiSingleView(this.get("year"), this.get("month") + t));
            this.caleWrap.addClass("dp-multi").children().first().addClass("dp-box-l").end().last().addClass("dp-box-r")
        }, buildMultiSingleView: function (e, t) {
            var n, a, d = r(e, t), u = s(e, t, d), f = function (e, t) {
                    return o(new Date(e, t, 1))
                }(e, t), p = function (e, t) {
                    return o(new Date(e, t + 1, 0))
                }(e, t), h = i(f), v = h.getFullYear(), m = h.getMonth(), g = this.get("current"), y = this.get("min"),
                b = this.get("max"), _ = this.get("dateList"), x = i(d), j = l(), w = d, D = [], k = c;
            for (D.push('<div class="dp-dates">'); w <= u;) n = w < y || u && w > u || b && w > b || _ && !_[w], a = w >= f && w <= p, D.push('<div class="dp-date'), w === j && D.push(" dp-now"), w === g && w >= f && w <= p && D.push(" dp-selected"), n ? D.push(" dp-disabled") : D.push(" dp-enabled"), a || D.push(" dp-other"), D.push('">'), a ? n ? D.push('<span class="dp-date-disabled"><i>' + (w == j ? "今天" : x.getDate()) + "</i></span>") : D.push('<a class="dp-date-item" data-date="' + w + '" href="javascript:;"><i>' + (w == j ? "今天" : x.getDate()) + "</i></a>") : D.push('<span class="dp-date-disabled"></span>'), D.push("</div>"), x.setDate(x.getDate() + 1), w = o(x), 0;
            return D.push("</div>"), k.replace(/\{month\}/, this.getMonthTit(v, m)).replace(/\{cale\}/, D.join(""))
        }, updateView: function () {
            this.caleWrap.find(".dp-selected").removeClass("dp-selected").end().find("[data-date=" + this.get("current") + "]").parent().addClass("dp-selected")
        }
    };
    var f = {type: 2};

    function p(e, t) {
        var n, a = i(t.current || new Date);
        this.config = {}, this.set($.extend({}, f, t)), this.__fullDate = o(a), this.__year = a.getFullYear(), this.__month = a.getMonth(), this.__date = a.getDate(), t.dateList && $.isArray(t.dateList) && (n = {}, $.each(t.dateList, function (e, t) {
            n[t] = !0
        }), this.__dateList = n), this.set("min", t.min || o(new Date)), this.set("max", t.max), this.__panel = h(), this.__target = $(e), this.init()
    }

    p.prototype = {
        init: function () {
            var e = this;
            this.__target.on("focus", function () {
                e.open()
            }).on("blur", function () {
                e.close()
            }).on("change", function () {
                e.__fullDate = this.value
            }).prop({readonly: !0})
        }, open: function () {
            var e = this, t = this.__target.offset(), n = (this.get("onChange"), this.get("min")), i = this.get("max");
            t.top = t.top + this.__target.outerHeight(), this.getSelected(), this.__panel.open({
                type: this.config.type,
                year: this.__year,
                month: this.__month,
                current: this.__fullDate,
                dateList: this.__dateList,
                min: $.isFunction(n) ? n() : n,
                max: $.isFunction(i) ? i() : i,
                onChange: function (t) {
                    e.select(t)
                }
            }, t)
        }, close: function () {
            this.__panel.close()
        }, getSelected: function () {
            var e = this.__target.val() || this.__fullDate, t = i(e);
            this.__fullDate = e, this.__year = t.getFullYear(), this.__month = t.getMonth(), this.__date = t.getDate()
        }, select: function (e) {
            var t = i(e), n = this.get("onChange") || function () {
            };
            t !== this.__fullDate && (this.__fullDate = e, this.__year = t.getFullYear(), this.__month = t.getMonth(), this.__date = t.getDate(), this.__target.val(e).trigger("change"), n(e)), this.__target.blur(), this.close()
        }, set: function (e, t) {
            "string" == typeof e ? t && (this.config[e] = t) : this.config = $.extend({}, f, e)
        }, get: function (e) {
            return this.config[e]
        }
    };
    var h = function (e) {
        var t, n = !1;
        return function () {
            return n ? t : (n = !0, t = e.apply(this, arguments), e = null, t)
        }
    }(function () {
        return new u
    });

    function v(e, t) {
        return new p(e, t || {})
    }

    $.fn.datePicker = function () {
        var e = arguments;
        return this.each(function () {
            var t, n = e[0];
            "string" == typeof n ? (t = $(this).data("datePicker")) && $.isFunction(t[n]) && t[n].apply(t, Array.prototype.slice.call(e, 1)) : $(this).data("datePicker", v($(this), n))
        })
    }, t.createDatePicker = v, t.createDatePanel = h
}, function (e, t) {
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = n(0), a = n(2), o = n(1), r = function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }(n(4)), s = n(56), l = n(6), c = f(n(57)), d = f(n(58)), u = f(n(59));

    function f(e) {
        return e && e.__esModule ? e : {default: e}
    }

    var p = void 0, h = void 0, v = void 0, m = void 0, g = void 0, y = void 0, b = a.template.compile(c['default']),
        _ = a.template.compile(d['default']), x = a.template.compile(u['default']);

    function j(e) {
        return $(b(e)).appendTo(h.find(".resource-section-content"))
    }

    function w() {
        var e = p.getState("departDate");
        return p.getState("calendar").filter(function (t) {
            return t.departDate === e
        })[0]
    }

    function D(e) {
        var t = p.getState("adult"), n = p.getState("child"), i = 0;
        switch (e) {
            case"adult":
                i = I() ? t + n > 1 ? 0 : t : 1;
                break;
            case"child":
                i = I() ? t + n > 1 ? 0 : n : 0;
                break;
            case"freeChild":
                i = 0
        }
        return i
    }

    function k(e) {
        var t = 0;
        switch (e) {
            case"adult":
                t = 99;
                break;
            case"child":
                t = C() ? 4 * p.getState("adult") : 20;
                break;
            case"freeChild":
                t = C() ? 1 * p.getState("adult") : 0
        }
        return t
    }

    function C() {
        return 2 == p.getState("proMode")
    }

    function I() {
        return 11 == p.getState("tagType")
    }

    t['default'] = {
        init: function () {
            p = (0, i.getStore)(), h = $("#J_ResourceTourist"), v = $("#J_ResourceCustom"), p.subscribe(function () {
                this.initSelect()
            }.bind(this), "change:calendar"), p.subscribe(function () {
                this.initSelect()
            }.bind(this), "change:departDate"), p.subscribe(function () {
                m && m.set(p.getState("adult")), this.toggleCustom(), this.updateRelation()
            }.bind(this), "change:adult"), p.subscribe(function () {
                g && g.set(p.getState("child")), this.updateRelation()
            }.bind(this), "change:child"), p.subscribe(function () {
                y && y.set(p.getState("freeChild")), this.updateRelation()
            }.bind(this), "change:freeChild"), p.getState("calendar") && this.initSelect()
        }, initSelect: function () {
            this.initAdult(), this.initChild(), this.initFreeChild()
        }, initAdult: function () {
            m && m.remove(), h.find(".resource-tourist-adult").remove();
            var e = w(), t = j({type: "adult", price: e && e.tuniuPrice, isReal: e && e.isRealTimePrice});
            m = (0, s.createNumberSelect)(t.find(".number-select"), {
                min: D("adult"),
                max: k("adult"),
                autoSet: !1,
                defaultValue: p.getState("adult"),
                onchange: this.changeAdult.bind(this)
            })
        }, initChild: function () {
            g && g.remove(), h.find(".resource-tourist-child").remove();
            var e = w(), t = void 0;
            if (e && e.excludeChildFlag ? (t = $(_()).appendTo(h.find(".resource-section-content")), g = null) : (t = j({
                type: "child",
                price: e && e.tuniuChildPrice,
                isTrain: C(),
                isReal: e && e.isRealTimePrice,
                childTip: function () {
                    var e = p.getState("originCalendar");
                    return e ? e.childPriceTip : ""
                }()
            }), g = (0, s.createNumberSelect)(t.find(".number-select"), {
                min: D("child"),
                max: k("child"),
                autoSet: !1,
                defaultValue: p.getState("child"),
                onchange: this.changeChild.bind(this)
            })), t) {
                var n = t.find(".J_ResourceChildTip"), i = void 0;
                n.hover(function () {
                    i = o.layer.open({
                        type: 4,
                        skin: "layui-layer-rim",
                        area: ["200px", "auto"],
                        content: [x({content: n.data("tip")}), n],
                        tips: 3,
                        shade: !1,
                        fix: !1,
                        closeBtn: !1,
                        tipsOffset: [10, -27]
                    })
                }, function () {
                    o.layer.close(i)
                })
            }
        }, initFreeChild: function () {
            if (y && y.remove(), h.find(".resource-tourist-freechild").remove(), C()) {
                w();
                var e = j({type: "freeChild", price: 0});
                if (y = (0, s.createNumberSelect)(e.find(".number-select"), {
                    min: D("freeChild"),
                    max: k("freeChild"),
                    autoSet: !1,
                    defaultValue: p.getState("freeChild"),
                    onchange: this.changeFreeChild.bind(this)
                }), e) {
                    var t = e.find(".J_ResourceFreeChildTip"), n = void 0;
                    t.hover(function () {
                        n = o.layer.open({
                            type: 4,
                            skin: "layui-layer-rim",
                            area: ["200px", "auto"],
                            content: [x({content: t.data("tip")}), t],
                            tips: 3,
                            shade: !1,
                            fix: !1,
                            closeBtn: !1,
                            tipsOffset: [10, -27]
                        })
                    }, function () {
                        o.layer.close(n)
                    })
                }
            }
        }, changeAdult: function (e) {
            p.dispatch({type: r.CHANGE_ADULT, data: e}), (0, l.record)("点击_头部区_人数/日期/城市区_出游人数_选择成人数")
        }, changeChild: function (e) {
            p.dispatch({type: r.CHANGE_CHILD, data: e}), (0, l.record)("点击_头部区_人数/日期/城市区_出游人数_选择儿童数")
        }, changeFreeChild: function (e) {
            p.dispatch({type: r.CHANGE_FREE_CHILD, data: e}), (0, l.record)("点击_头部区_人数/日期/城市区_出游人数_选择免票儿童数")
        }, updateRelation: function () {
            I() && (m && m.config({min: D("adult")}), g && g.config({min: D("child")})), C() && (g && g.config({max: k("child")}), y && y.config({max: k("freeChild")}))
        }, toggleCustom: function () {
            p.getState("adult") >= 10 ? this.showCustom() : this.hideCustom()
        }, showCustom: function () {
            v.show()
        }, hideCustom: function () {
            v.hide()
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }();
    var a = {
        min: -1 / 0,
        max: 1 / 0,
        minus: !0,
        plus: !0,
        defaultValue: 1,
        autoSet: !0,
        selectors: {minus: ".number-select-minus", plus: ".number-select-plus"},
        drop: {enable: !1}
    }, o = [];
    var r = function () {
        function e(t, n) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.$container = $(t), this.options = Object.assign({}, a, n), this.value = this.options.defaultValue, this.minusDisabled = !1, this.plusDisabled = !1, this.disabled = !1, this.init(), this.bind(), this.update(), this.updateView()
        }

        return i(e, [{
            key: "init", value: function () {
                this.initDrop()
            }
        }, {
            key: "initDrop", value: function () {
                this.isDropEnabled() && this.$container.append('<div class="number-select-drop"></div>')
            }
        }, {
            key: "isDropEnabled", value: function () {
                return !0 === (this.options.drop || {}).enable
            }
        }, {
            key: "showDrop", value: function () {
                var e = this.$container.find(".number-select-drop");
                e.show(), e.scrollTop(0);
                var t = e.find(".active").position();
                t && e.scrollTop(t.top)
            }
        }, {
            key: "hideDrop", value: function () {
                this.$container.find(".number-select-drop").hide()
            }
        }, {
            key: "bind", value: function () {
                var e = this;
                this.$container.on("click", this.options.selectors.minus, this.minus.bind(this)).on("click", this.options.selectors.plus, this.plus.bind(this)).on("change", "input", function (e) {
                    this.change(e.target.value)
                }.bind(this)), this.isDropEnabled() && ($(document).click(function () {
                    e.hideDrop()
                }), this.$container.on("focus", "input", function () {
                    e.disabled || function (e) {
                        o.forEach(function (t) {
                            t === e ? t.showDrop() : t.hideDrop()
                        })
                    }(e)
                }).on("click", "input", function (e) {
                    e.stopPropagation()
                }), this.$container.on("click", ".number-select-drop-item", function (t) {
                    t.stopPropagation(), e.change(parseInt($(this).data("value"))), e.hideDrop()
                }))
            }
        }, {
            key: "set", value: function (e) {
                this.value = e, this.update(), this.updateView()
            }
        }, {
            key: "excuteCallback", value: function (e) {
                try {
                    this.options.onchange && this.options.onchange(e)
                } catch (e) {
                }
            }
        }, {
            key: "changeNumber", value: function (e) {
                this.excuteCallback(e), this.options.autoSet && this.set(e)
            }
        }, {
            key: "config", value: function (e, t) {
                var n = {};
                t ? n[e] = t : n = e, this.options = Object.assign({}, this.options, n), this.update(), this.updateView()
            }
        }, {
            key: "plus", value: function () {
                this.disabled || this.plusDisabled || this.changeNumber(this.value + 1)
            }
        }, {
            key: "minus", value: function () {
                this.disabled || this.minusDisabled || this.changeNumber(this.value - 1)
            }
        }, {
            key: "change", value: function (e) {
                this.disabled || (e = parseInt(e, 10), !isNaN(e) && e !== this.value && e >= this.options.min && e <= this.options.max ? this.changeNumber(e) : this.updateView())
            }
        }, {
            key: "update", value: function () {
                var e = !1;
                this.minusDisabled = this.value <= this.options.min, this.plusDisabled = this.value >= this.options.max, this.value < this.options.min && (this.value = this.options.min, e = !0), this.value > this.options.max && (this.value = this.options.max, e = !0), e && this.excuteCallback(this.value)
            }
        }, {
            key: "updateView", value: function () {
                var e = this.disabled, t = e || this.minusDisabled, n = e || this.plusDisabled;
                this.buildDrop(), this.$container.find(this.options.selectors.minus)[t ? "addClass" : "removeClass"]("disabled").end().find(this.options.selectors.plus)[n ? "addClass" : "removeClass"]("disabled").end().find("input").prop("disabled", !!e).val(this.value)
            }
        }, {
            key: "buildDrop", value: function () {
                if (this.isDropEnabled()) {
                    var e = this.options.max, t = this.value, n = void 0, i = [];
                    for (n = this.options.min; n <= e; n++) i.push('<div class="number-select-drop-item', t == n ? " active" : "", '" data-value="', n, '">', n, "</div>");
                    this.$container.find(".number-select-drop").html(i.join(""))
                }
            }
        }, {
            key: "remove", value: function () {
                this.$container && (this.$container.remove(), this.$container = null), this.options = null
            }
        }, {
            key: "disable", value: function () {
                this.disabled = !0, this.updateView()
            }
        }, {
            key: "enable", value: function () {
                this.disabled = !1, this.updateView()
            }
        }]), e
    }();
    t.NumberSelect = r, t.createNumberSelect = function (e, t) {
        var n = new r(e, t);
        return o.push(n), n
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t['default'] = '\n<div class="resource-tourist-item resource-tourist-<%= type.toLowerCase() %>">\n    <div class="number-select">\n        <div class="number-select-button number-select-minus">\n            <i class="number-select-button-line-horizital"></i>\n        </div>\n        <div class="number-select-button number-select-plus">\n            <i class="number-select-button-line-vertical"></i>\n            <i class="number-select-button-line-horizital"></i>\n        </div>\n        <div class="number-select-input">\n            <input type="text" name="number-select" value="<%= number %>">\n        </div>\n    </div>\n    <% if (type === \'adult\') { %>\n        <div class="resource-tourist-price">\n            <% if (isReal) { %><span><strong>实时计价</strong></span>/<% } else if (price) { %><span>&yen;<strong><%= price %></strong></span>/<% } %>成人\n        </div>\n    <% } %>\n\n    <% if (type === \'child\') { %>\n        <div class="resource-tourist-price">\n            <% if (isReal) { %><span><strong>实时计价</strong></span>/<% } else if (price) { %><span>&yen;<strong><%= price %></strong></span>/<% } %>\n            <% if (isTrain) { %>\n                儿童 <i class="J_ResourceChildTip" data-tip="身高标准1.2-1.5米，含儿童价火车票，含当地旅游车位费和导游服务费，不占床，不含住宿费和门票；身高标准0.8-1.19米，免火车票，含当地旅游车位费和导游服务费，不占床，不含住宿费和门票。">儿童标准</i>\n            <% } else { %>\n                儿童 <i class="J_ResourceChildTip" data-tip="<%=# childTip %>">儿童标准</i>\n            <% } %>\n        </div>\n    <% } %>\n\n    <% if (type === \'freeChild\') { %>\n        <div class="resource-tourist-price">\n            免票儿童<i class="J_ResourceFreeChildTip" data-tip="身高标准1.2-1.5米，含儿童价火车票，含当地旅游车位费和导游服务费，不占床，不含住宿费和门票；身高标准0.8-1.19米，免火车票，含当地旅游车位费和导游服务费，不占床，不含住宿费和门票。">（1.2米以下免车票）</i>\n        </div>\n    <% } %>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t['default'] = '\n<div class="resource-tourist-item resource-tourist-child">\n    <div class="resource-tourist-price">\n        <i class="J_ResourceChildTip" data-tip="儿童标准：身高0.8~1.2米（含），不占床，只包含座位费，其余产生费用自理。">此团期不支持儿童出游</i>\n    </div>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t['default'] = '\n<div class="resource-tourist-child-tip">\n    <%=# content %>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = n(0), a = s(n(10)), o = s(n(18)), r = n(65);

    function s(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }

    var l = void 0, c = $("#J_ResourceSupplier"), d = $("#J_ResourceSupplierContent"), u = $("#J_ResourceReception"),
        f = $("#J_ResourceReceptionContent"), p = $(window),
        h = a.compile(r.supplierTemplate, {client: !0, compileDebug: !1});

    function v(e) {
        var t = function (e) {
            var t = l.getState("supplier"), n = void 0, i = e || l.getState("departDate");
            return n = (t || []).filter(function (e) {
                return ~(e.departureDates || []).indexOf(i)
            })[0], 1 == l.getState("isSupportMultipleJourney") || n || (n = (t || [])[0]), n && n.aggregationCompanyName || (n = null), n
        }(e);
        if (t) {
            var n = "";
            t.aggregationAgencyId && (-1 === [2, 8999999].indexOf(+t.aggregationAgencyId) && 1 === t.isEstablishFlagshipStore ? n = window.location.protocol + "//www.tuniu.com/vendor/" + t.aggregationAgencyId : 2 == +t.aggregationAgencyId && (n = window.location.protocol + "//www.tuniu.com/niuren/"));
            var i = h(Object.assign({destName: l.getState("destGroupName"), agencyUrl: n}, t));
            d.html(i), c.show(), o.isNeedReception() && t.groundOperatorsName && (f.html("接待服务由<strong>" + (t.groundOperatorsName || "") + "</strong>提供"), u.show())
        } else c.hide(), u.hide();
        p.trigger("resize")
    }

    t['default'] = {
        init: function (e) {
            (l = (0, i.getStore)()).subscribe(function () {
                v(e)
            }, "change:supplier"), 1 == l.getState("isSupportMultipleJourney") && l.subscribe(v, "change:departDate")
        }
    }
}, function (e, t, n) {
    "use strict";
    var i = n(62);

    function a(e, t) {
        for (var n = 0, i = e.length - 1; i >= 0; i--) {
            var a = e[i];
            "." === a ? e.splice(i, 1) : ".." === a ? (e.splice(i, 1), n++) : n && (e.splice(i, 1), n--)
        }
        if (t) for (; n--; n) e.unshift("..");
        return e
    }

    var o = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, r = function (e) {
        return o.exec(e).slice(1)
    };

    function s(e, t) {
        if (e.filter) return e.filter(t);
        for (var n = [], i = 0; i < e.length; i++) t(e[i], i, e) && n.push(e[i]);
        return n
    }

    t.resolve = function () {
        for (var e = "", t = !1, n = arguments.length - 1; n >= -1 && !t; n--) {
            var o = n >= 0 ? arguments[n] : i.process.cwd();
            if ("string" != typeof o) throw new TypeError("Arguments to path.resolve must be strings");
            o && (e = o + "/" + e, t = "/" === o.charAt(0))
        }
        return e = a(s(e.split("/"), function (e) {
            return !!e
        }), !t).join("/"), (t ? "/" : "") + e || "."
    }, t.normalize = function (e) {
        var n = t.isAbsolute(e), i = "/" === l(e, -1);
        return (e = a(s(e.split("/"), function (e) {
            return !!e
        }), !n).join("/")) || n || (e = "."), e && i && (e += "/"), (n ? "/" : "") + e
    }, t.isAbsolute = function (e) {
        return "/" === e.charAt(0)
    }, t.join = function () {
        var e = Array.prototype.slice.call(arguments, 0);
        return t.normalize(s(e, function (e, t) {
            if ("string" != typeof e) throw new TypeError("Arguments to path.join must be strings");
            return e
        }).join("/"))
    }, t.relative = function (e, n) {
        function i(e) {
            for (var t = 0; t < e.length && "" === e[t]; t++) ;
            for (var n = e.length - 1; n >= 0 && "" === e[n]; n--) ;
            return t > n ? [] : e.slice(t, n - t + 1)
        }

        e = t.resolve(e).substr(1), n = t.resolve(n).substr(1);
        for (var a = i(e.split("/")), o = i(n.split("/")), r = Math.min(a.length, o.length), s = r, l = 0; l < r; l++) if (a[l] !== o[l]) {
            s = l;
            break
        }
        var c = [];
        for (l = s; l < a.length; l++) c.push("..");
        return (c = c.concat(o.slice(s))).join("/")
    }, t.sep = "/", t.delimiter = ":", t.dirname = function (e) {
        var t = r(e), n = t[0], i = t[1];
        return n || i ? (i && (i = i.substr(0, i.length - 1)), n + i) : "."
    }, t.basename = function (e, t) {
        var n = r(e)[2];
        return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)), n
    }, t.extname = function (e) {
        return r(e)[3]
    };
    var l = "b" === "ab".substr(-1) ? function (e, t, n) {
        return e.substr(t, n)
    } : function (e, t, n) {
        return t < 0 && (t = e.length + t), e.substr(t, n)
    }
}, function (e, t, n) {
    "use strict";
    var i = e.exports = {}, a = [], o = !1;

    function r() {
        if (!o) {
            var e;
            o = !0;
            for (var t = a.length; t;) {
                e = a, a = [];
                for (var n = -1; ++n < t;) e[n]();
                t = a.length
            }
            o = !1
        }
    }

    function s() {
    }

    i.nextTick = function (e) {
        a.push(e), o || setTimeout(r, 0)
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = s, i.addListener = s, i.once = s, i.off = s, i.removeListener = s, i.removeAllListeners = s, i.emit = s, i.binding = function (e) {
        throw new Error("process.binding is not supported")
    }, i.cwd = function () {
        return "/"
    }, i.chdir = function (e) {
        throw new Error("process.chdir is not supported")
    }, i.umask = function () {
        return 0
    }
}, function (e, t, n) {
    "use strict";
    var i = /[|\\{}()[\]^$+*?.]/g;
    t.escapeRegExpChars = function (e) {
        return e ? String(e).replace(i, "\\$&") : ""
    };
    t.escapeXML = new Function("markup", "\n    return markup == undefined\n    ? ''\n    : String(markup).replace(_MATCH_HTML, encode_char);\n"), t.escapeXML.toString = function () {
        return Function.prototype.toString.call(this) + ';\nvar _ENCODE_HTML_RULES = {\n      "&": "&amp;"\n    , "<": "&lt;"\n    , ">": "&gt;"\n    , \'"\': "&#34;"\n    , "\'": "&#39;"\n    }\n  , _MATCH_HTML = /[&<>\'"]/g;\nfunction encode_char(c) {\n  return _ENCODE_HTML_RULES[c] || c;\n};\n'
    }, t.shallowCopy = function (e, t) {
        for (var n in t = t || {}) e[n] = t[n];
        return e
    }, t.cache = {
        _data: {}, set: function (e, t) {
            this._data[e] = t
        }, get: function (e) {
            return this._data[e]
        }, reset: function () {
            this._data = {}
        }
    }
}, function (e, t, n) {
    "use strict";
    e.exports = {
        name: "ejs",
        description: "Embedded JavaScript templates",
        keywords: ["template", "engine", "ejs"],
        version: "2.5.2",
        author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
        contributors: ["Timothy Gu <timothygu99@gmail.com> (https://timothygu.github.io)"],
        license: "Apache-2.0",
        main: "./lib/ejs.js",
        repository: {type: "git", url: "git://github.com/mde/ejs.git"},
        bugs: "https://github.com/mde/ejs/issues",
        homepage: "https://github.com/mde/ejs",
        dependencies: {},
        devDependencies: {
            browserify: "^13.0.1",
            eslint: "^3.0.0",
            istanbul: "~0.4.3",
            jake: "^8.0.0",
            jsdoc: "^3.4.0",
            "lru-cache": "^4.0.1",
            mocha: "^3.0.2",
            rimraf: "^2.2.8",
            "uglify-js": "^2.6.2"
        },
        engines: {node: ">=0.10.0"},
        scripts: {
            test: "mocha",
            coverage: "istanbul cover node_modules/mocha/bin/_mocha",
            doc: "rimraf out && jsdoc -c jsdoc.json lib/* docs/jsdoc/*",
            devdoc: "rimraf out && jsdoc -p -c jsdoc.json lib/* docs/jsdoc/*"
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.supplierTemplate = '\n<div class="resource-supplier-content">\n    <a class="resource-supplier-name"<% if (agencyUrl) { %> href="<%= agencyUrl %>" target="_blank"<% } %>>\n        <strong><%= aggregationCompanyName %></strong>\n    </a>\n    <% if(statis != 0){ %>\n    <a class="resource-supplier-statis"<% if (agencyUrl) { %> href="<%= agencyUrl %>" target="_blank"<% } %>>\n        该品牌在<%= displayDestGroupName %>目的地满意度 <strong><%= statis %>%</strong>\n        <% if (delta != 0) { %>\n            <i>⎜</i>\n            <%= deltaSign > 0 ? \'高\' : (deltaSign < 0 ? \'低\' : \'等\') %>于<%= displayDestGroupName %>平均满意度 <span><%= delta %>%</span>\n        <% } %>\n    </a>\n    <% } %>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = n(0), a = n(1), o = function (e) {
        return e && e.__esModule ? e : {default: e}
    }(n(19));
    $(window);
    var r = void 0, s = void 0, l = void 0, c = void 0, d = void 0;

    function u(e) {
        s = a.layer.open({
            type: 1,
            title: !1,
            closeBtn: !1,
            content: $("#T_couponsDetail").html(),
            area: ["960px", "auto"],
            btn: !1,
            success: function (t) {
                p(t, e)
            }
        })
    }

    function f() {
        $(document).off("click", h), l = null, c = null, d = null, a.layer.close(s)
    }

    function p(e, t) {
        c = (l = e).find(".J_couponMore"), d = l.find(".J_couponDetail"), l.on("click", ".J_couponClose", f), l.find(".J_couponItem").each(function (e) {
            var t = $(this), n = t.data("id");
            t.find(".coupon-more"), t.on("click", ".J_couponButton", function () {
                v(n)
            })
        }), d.click(function (e) {
            e.stopPropagation()
        }), c.click(function (e) {
            var t = $(this).data("id"), n = d.filter("[data-id=" + t + "]");
            n.is(":visible") ? ($(this).removeClass("expand"), n.hide()) : (c.removeClass("expand"), $(this).addClass("expand"), d.hide(), n.show()), e.stopPropagation()
        }), $(document).on("click", h), t && v(t)
    }

    function h() {
        c && c.removeClass("expand"), d && d.hide()
    }

    function v(e) {
        (0, o['default'])().then(function () {
            !function (e) {
                $.ajax({
                    url: r.couponReceiveUrl({couponId: e}), dataType: "json", success: function (e) {
                        e && e.success ? function (e) {
                            m('<div class="dialog-success"><div class="dialog-close"></div><i class="icon"></i>' + (e || "优惠券发放并绑定成功") + "</div>")
                        }() : g(e && e.message)
                    }, error: function (e) {
                        g(e && e.message)
                    }
                })
            }(e)
        })['catch'](function (e) {
        })
    }

    function m(e) {
        var t = a.layer.open({
            type: 1,
            title: !1,
            time: 1500,
            content: e,
            area: ["400px", "auto"],
            btn: !1,
            closeBtn: !1,
            success: function (e) {
                e.on("click", ".dialog-close", function () {
                    a.layer.close(t)
                })
            }
        })
    }

    function g(e) {
        m('<div class="dialog-error"><div class="dialog-close"></div><i class="icon"></i>' + (e || "优惠券领取失败，请稍后重试。") + "</div>")
    }

    t['default'] = {
        init: function (e) {
            r = e, (0, i.getStore)(), $(".J_DetailCouponItem").click(function () {
                u()
            })
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = n(0), a = n(1), o = function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }(n(19));
    var r = void 0, s = ($(window), void 0), l = void 0, c = !1;

    function d(e) {
        $.ajax({
            url: e.url,
            data: {
                productId: s.getState("productId"),
                productType: s.getState("productType"),
                bookCityCode: s.getState("bookCityCode")
            },
            success: e.success,
            error: e.error
        })
    }

    function u() {
        c = !0, l.addClass("active").find(".J_FavoriteLabel").text("已收藏")
    }

    function f() {
        c = !1, l.removeClass("active").find(".J_FavoriteLabel").text("收藏")
    }

    function p(e) {
        var t = a.layer.open({
            type: 1,
            title: !1,
            time: void 0 === e.time ? 1500 : e.time,
            content: '<div class="dialog-' + (e.type || "success") + '"><div class="dialog-close"></div><i class="icon"></i>' + e.msg + "</div>",
            area: ["400px", "auto"],
            btn: !1,
            closeBtn: !1,
            success: function (e) {
                e.on("click", ".dialog-close", function () {
                    a.layer.close(t)
                })
            }
        })
    }

    function h() {
        l.click(function () {
            o.loginP().then(function () {
                d(c ? {
                    url: r.removeFavoriteUrl(), success: function (e) {
                        e && e.data && e.data.isSuccess ? (f(), p({msg: "删除收藏成功"})) : p({
                            type: "error",
                            msg: "删除收藏失败，请重试"
                        })
                    }, error: function () {
                        p({type: "error", msg: "删除收藏失败，请重试"})
                    }
                } : {
                    url: r.addFavoriteUrl(), success: function (e) {
                        e && e.data && e.data.isSuccess ? (u(), p({msg: "添加收藏成功"})) : p({
                            type: "error",
                            msg: "添加收藏失败，请重试"
                        })
                    }, error: function () {
                        p({type: "error", msg: "添加收藏失败，请重试"})
                    }
                })
            })['catch'](function (e) {
            })
        });
        var e = $(".weixin_dialog");
        $(".resource-button-weixin").click(function (t) {
            t.stopPropagation(), e.toggleClass("active")
        }), e.on("click", function (e) {
            e.stopPropagation()
        }), $(document).click(function () {
            e.removeClass("active")
        })
    }

    t['default'] = {
        init: function (e) {
            r = e, s = (0, i.getStore)(), l = $(".J_Favorite"), o.isLoginP().then(function () {
                d({
                    url: r.checkFavoriteStateUrl(), success: function (e) {
                        e && e.data && e.data.isCollected ? u() : f()
                    }, error: function () {
                        f()
                    }
                })
            })['catch'](function () {
            }), h()
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.detailModule = void 0, n(69);
    var i = n(0), a = n(11), o = n(12), r = b(n(3)), s = (b(n(14)), b(n(18))), l = n(70), c = n(23), d = y(n(24)),
        u = n(95), f = n(98), p = y(n(5)), h = n(13), v = y(n(25)), m = y(n(26)), g = y(n(28));

    function y(e) {
        return e && e.__esModule ? e : {default: e}
    }

    function b(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }

    $(window);
    var _ = {
        init: function () {
            var e = $("#J_DetailTab"), t = e.height();
            (0, a.createFixer)(e, {range: {bottom: $("#J_Detail")}}), (0, o.createScrollTaber)(e, {offset: t}), this.initFavor(), this.initRoute(), 0 == (0, i.getStore)().getState("isSupportMultipleJourney") && (this.initVisa(), this.initGuide(), this.initUpgrade(), c.featureModule.init({journeyId: (0, i.getStore)().getState("defaultJourneyId")}), new d['default']({journeyId: (0, i.getStore)().getState("defaultJourneyId")}).bind());
            var n = window.commentModule;
            n && n.init({
                el: "#J_Comment",
                productId: (0, i.getStore)().getState("productId"),
                tab: {product: !1}
            }), u.advisoryModule.init(), f.relativeModule.init({
                relatedUrl: p['default'].url.related,
                mainHost: p['default'].host
            })
        }, initFavor: function () {
            $(".J_DetailFavorItem").each(function () {
                var e = $(this);
                e.on("click", ".detail-favor-more", function () {
                    e.addClass("expand")
                }).on("click", ".detail-favor-less", function () {
                    e.removeClass("expand")
                })
            })
        }, initRoute: function () {
            l.routeModule.init({
                isNeedReception: s.isNeedReception,
                getJourneyUrl: p['default'].url.getJourneyById,
                guideUrl: p['default'].url.guide,
                visaUrl: p['default'].url.visa
            })
        }, initUpgrade: function () {
            var e = $(".J_DetailUpgrade");
            r.on(e, function () {
                r.off(e);
                var t = new g['default']({$el: e});
                h.fetchUpgrade.fetch(function (e) {
                    t.load(e), t.render((0, i.getStore)().getState("defaultJourneyId"))
                }, function () {
                    t.remove()
                })
            })
        }, initVisa: function () {
            var e = $(".J_DetailVisa");
            r.on(e, function () {
                r.off(e);
                var t = new v['default']({$el: e});
                h.fetchVisa.fetch(function (e) {
                    t.load(e), t.render()
                }, function () {
                    t.remove()
                })
            })
        }, initGuide: function () {
            var e = $(".J_Guide");
            r.on(e, function () {
                r.off(e);
                var t = new m['default']({$el: e});
                h.fetchGuide.fetch(function (e) {
                    t.load(e), t.render()
                }, function () {
                    t.remove()
                })
            })
        }
    };
    t.detailModule = _
}, function (e, t) {
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.routeModule = void 0;
    var i = n(0), a = (d(n(8)), d(n(3))), o = n(11), r = n(7), s = n(12), l = n(21), c = n(75);

    function d(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }

    var u = $(window), f = $(document), p = void 0, h = void 0, v = void 0, m = void 0, g = void 0, y = void 0,
        b = void 0, _ = !1, x = !1, j = [], w = void 0;

    function D() {
        x = !1, g.removeClass("expand")
    }

    function k() {
        x ? D() : (x = !0, g.addClass("expand"))
    }

    function C(e) {
        return w[e]
    }

    function I() {
        if (!h.isNeedReception()) {
            var e = p.getState("supplier");
            $(".J_DetailSupplier:not(.loaded-supplier)").each(function () {
                var t = $(this), n = t.data("id");
                if (n) {
                    var i = (e || []).filter(function (e) {
                        return e.resId == n
                    })[0];
                    if (i) {
                        var a = "<strong>" + i.aggregationCompanyName + "</strong>";
                        0 != i.statis && (a += "（该品牌在" + i.displayDestGroupName + "目的地满意度<strong>" + i.statis + "%</strong>", 0 != i.delta && (a += "，", a += i.deltaSign > 0 ? "高" : i.deltaSign < 0 ? "低" : "等", a += "于" + i.displayDestGroupName + "平均满意度 <span>" + i.delta + "%</span>"), a += "）"), t.find(".J_DetailSupplierContent").html(a), t.show()
                    }
                }
                t.addClass("loaded-supplier")
            })
        }
    }

    function T() {
        if (h.isNeedReception()) {
            var e = p.getState("supplier");
            $(".J_DetailReception:not(.loaded-reception)").each(function () {
                var t = $(this), n = t.data("id");
                if (n) {
                    var i = (e || []).filter(function (e) {
                        return e.resId == n
                    })[0];
                    if (i && i.groundOperatorsName) {
                        var a = "接待服务由 <strong>" + (i.groundOperatorsName || "") + "</strong> 提供";
                        t.find(".J_DetailReceptionContent").html(a), t.show()
                    }
                }
                t.addClass("loaded-reception")
            })
        }
    }

    var S = {
        init: function (e) {
            h = e, p = (0, i.getStore)(), v = $("#J_MultiJourneyTab"), m = v.find(".journey-tab-list"), $("#J_DetailMultiRoute"), g = $("#J_MultiJourneyNav"), y = g.find("[data-rel]"), $("#J_MultiJourneySelect"), v.height(), m.height(), b = $("#J_DetailTab").height(), (w = {})[p.getState("defaultJourneyId")] = {journeyFourDetail: p.getState("defaultJourneyDetail")}, function () {
                f.click(D), g.click(function (e) {
                    e.stopPropagation()
                }).on("click", ".journey-nav-select", k).on("click", ".journey-nav-item", D);
                var e = v.find(".journey-tab-item");
                e.length > 7 && (e.filter(":gt(5)").addClass("more"), v.addClass("more").on("click", ".J_JourneyTabMore", function () {
                    _ ? (v.removeClass("expand"), _ = !1) : (v.addClass("expand"), _ = !0), u.trigger("resize")
                }))
            }(), p.getState("isSupportMultipleJourney") ? this.initMulti() : this.initSingle()
        }, initSingle: function () {
            var e = $(".J_DetailRoute"), t = C(e.data("id"));
            if (3 == p.getState("defaultJourneyType")) l.journey4Module.init(e, t && t.journeyFourDetail, {tabHeight: b}).init(); else {
                var n = $(".J_DetailRoute"), i = $(".J_DetailJourney"), c = n.find(".J_JourneyNav"),
                    d = n.find(".J_JourneyTab");
                (0, s.createScrollTaber)(c, {offset: b}), (0, r.createTaber)(d), (0, o.createFixer)(c, {
                    range: {
                        top: i,
                        bottom: i,
                        left: n,
                        right: n
                    }, offset: {top: b + 10}, ctx: n
                });
                !function (e) {
                    e.find(".item-label-fixed").each(function () {
                        var e = $(this), t = e.find(".item-label-inner"), n = e.height(), i = t.height();
                        n < i && (t.height(n), e.addClass("fold"), e.on("click", ".item-label-more", function () {
                            e.addClass("expand"), t.height(i), u.trigger("resize")
                        }).on("click", ".item-label-less", function () {
                            e.removeClass("expand"), t.height(n), u.trigger("resize")
                        }))
                    }), u.trigger("resize")
                }($("#J_Detail")), function (e) {
                    var t = e.find(".J_Journey3RouteTab");
                    (0, r.createTaber)(t, {ctx: e})
                }(n), function (e) {
                    e.find("img").each(function () {
                        var e = $(this), t = e.data("src");
                        a.on(e, function () {
                            var n = new Image;
                            n.onload = function () {
                                e.prop("src", t).parent().addClass("loaded"), a.off(e), u.trigger("resize")
                            }, n.onerror = function () {
                                e.parent().addClass("loaded"), a.off(e), u.trigger("resize")
                            }, n.src = t, e.src = t
                        })
                    })
                }(n)
            }
        }, initMulti: function () {
            m.find("[data-rel]").toArray().forEach(function (e, t) {
                var n = (e = $(e)).data("id"), i = C(n);
                t > 0 && (i = null);
                var a = new c.Journey(Object.assign({}, h, {journeyId: n, data: i}));
                j.push(a);
                var o = function () {
                    $(this);
                    a.activate(), j.forEach(function (e) {
                        e.isRendered() && e.journeyId != n && e.hide()
                    }), u.trigger("resize")
                };
                e.click(o), y.filter('[data-rel="' + e.data("rel") + '"]').click(function () {
                    u.scrollTop($(".J_multiContainer").offset().top - b + 5), o.call(this)
                }), a.isLoaded() && a.bind(0 == t)
            }), p.subscribe(function () {
                var e = p.getState("currentJourney");
                j.forEach(function (t) {
                    t.journeyId == e ? t.activate() : t.isRendered() && t.hide()
                })
            }, "change:currentJourney"), p.getState("supplier") ? (I(), T()) : p.subscribe(function () {
                I(), T(), u.trigger("resize")
            }, "change:supplier")
        }
    };
    t.routeModule = S
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }();
    t.createMarker = function (e) {
        return new (function () {
            if (l) return l;
            return l = function (e) {
                function t(e) {
                    !function (e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var n = function (e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                    return n.data = e, n.active = !!e.active, e.active = !1, n.element = null, n.typeClassName = "jmap-spot-" + e.type, n.hightlightClassName = "jmap-spot-" + e.type + "-hightlight", n.activeClassName = "jmap-spot-" + n.data.type + "-active", n
                }

                return function (e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, google.maps.OverlayView), i(t, [{
                    key: "onAdd", value: function () {
                        var e = this,
                            t = '<div class="jmap-spot ' + this.typeClassName + '"><div class="jmap-win-box"><i class="jmap-win-arrow"></i><div class="jmap-win-content">' + this.data.name + '</div></div><div class="jmap-marker"></div></div>',
                            n = this.getPanes(), i = $(t), a = i.clone().css({opacity: 0, filter: "alpha(opacity=0)"});
                        this.element = i, this.mask = a, a.find(".jmap-win-box, .jmap-marker").on("click", function () {
                            google.maps.event.trigger(e, "click")
                        }).on("mouseenter", function () {
                            google.maps.event.trigger(e, "mouseenter")
                        }).on("mouseleave", function () {
                            google.maps.event.trigger(e, "mouseleave")
                        }), this.active && this.activateBySelf(), n.markerLayer.appendChild(i[0]), n.floatPane.appendChild(a[0])
                    }
                }, {
                    key: "draw", value: function () {
                        this.setPosition(this.data[r], this.data[s])
                    }
                }, {
                    key: "onRemove", value: function () {
                        this.element.remove(), this.mask.remove(), this.element = null, this.mask = null
                    }
                }, {
                    key: "setZIndex", value: function (e) {
                        this.element && (e = e || 1, this.element.css("z-index", e), this.mask.css("z-index", e))
                    }
                }, {
                    key: "moveToTop", value: function () {
                        this.setZIndex(999)
                    }
                }, {
                    key: "restoreZIndex", value: function () {
                        this.setZIndex(1)
                    }
                }, {
                    key: "setPosition", value: function (e, t) {
                        if (this.element) {
                            var n = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(e, t)),
                                i = {top: n.y - o - 28 + "px", left: n.x - this.element.width() / 2 + a / 2 - 1 + "px"};
                            this.element.css(i), this.mask.css(i)
                        }
                    }
                }, {
                    key: "activate", value: function () {
                        this.active = !0, this.element && this.element.addClass(this.activeClassName), this.moveToTop()
                    }
                }, {
                    key: "activateBySelf", value: function () {
                        this.activate(), $(window).trigger("mapMarkerActivated", this.data)
                    }
                }, {
                    key: "deactivate", value: function () {
                        this.active = !1, this.element && this.element.removeClass(this.activeClassName), this.restoreZIndex()
                    }
                }, {
                    key: "deactivateBySelf", value: function () {
                        this.deactivate(), $(window).trigger("mapMarkerDeactivated", this.data)
                    }
                }, {
                    key: "hightlight", value: function () {
                        this.element && this.element.addClass(this.hightlightClassName)
                    }
                }, {
                    key: "removeHightlight", value: function () {
                        this.element && this.element.removeClass(this.hightlightClassName)
                    }
                }]), t
            }()
        }())(e)
    };
    var a = 43, o = 43, r = "latitude", s = "longitude", l = void 0
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.openBigMap = function (e, t, n) {
        l = e.detail, t, c = n, d = a.layer.open({
            type: 1,
            title: !1,
            closeBtn: !1,
            content: s({data: l, scheduleType: e.scheduleType}),
            area: ["1000px", "600px"],
            btn: !1,
            success: f
        })
    };
    var i = n(22), a = n(1), o = function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }(n(10)), r = n(73);
    var s = o.compile(r.mapDialogTemplate, {client: !0, compileDebug: !1}), l = void 0, c = void 0, d = void 0,
        u = void 0;

    function f(e) {
        var t = new i.Map(e.find(".J_MapDetail")[0], {
            onMarkerActive: function (e) {
                e && e.cid && e.dayId && n(e.dayId, e.cid)
            }
        });

        function n(e, n) {
            if (e) {
                var i = function (e) {
                    var t;
                    return l.some(function (n) {
                        if (n.cid == e || n.data && n.data.some(function (t) {
                            return t.cid == e
                        })) return t = n, !0
                    }), t
                }(e);
                if (i) {
                    var a = function (e) {
                        return e ? (e.data || []).reduce(function (t, n) {
                            return (n.data || []).forEach(function (n) {
                                n.latitude && n.longitude && t.push({
                                    moduleType: "spot",
                                    cid: n.cid,
                                    id: n.cid,
                                    dayId: e.cid,
                                    title: n.title,
                                    latitude: n.latitude,
                                    longitude: n.longitude
                                })
                            }), t
                        }, []) : []
                    }(i);
                    if (a.length) return t.load(a), n || (n = a[0].cid), o(e, n), void t.activateMarkerById(n)
                }
                o(e, n)
            }
        }

        function o(e, t) {
            u.find(".map-nav-active").removeClass("map-nav-active").end().find(".map-nav-sub").hide();
            var n = u.find(".map-main-item[data-nav-id=" + e + "]").addClass("map-nav-active").siblings(".map-nav-sub").show();
            n.find(".map-sub-item").removeClass("map-nav-active").filter("[data-sub-id=" + t + "]").addClass("map-nav-active"), n.end().closest(".map-nav-sub").show()
        }

        u = e.find(".J_MapDetailJourney"), e.on("click", ".map-nav-item", function () {
            n($(this).data("nav-id"))
        }).on("click", ".map-sub-item", function () {
            n($(this).data("nav-id"), $(this).data("sub-id"))
        }).on("click", ".J_MapDetailClose", function () {
            a.layer.close(d)
        }), c && (u.find(".map-sub-item[data-nav-id=" + c + "]").length || (c = null)), n(c || u.find(".map-sub-item").data("nav-id"))
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.mapDialogTemplate = '\n<div class="map-detail">\n    <div class="J_MapDetailClose map-detail-close"></div>\n    <div class="J_MapDetail map-detail-map"></div>\n    <div class="map-detail-journey">\n    <div class="J_MapDetailJourney map-nav">\n      <ul class="map-nav-main">\n        <% if (scheduleType == 1) { %>\n          <% for (var journeyIndex = 0, list; journeyIndex < data.length; journeyIndex++) { %>\n            <% if (data[journeyIndex] && (list = data[journeyIndex][\'data\']) && list.length) { %>\n                <% for (var isBlank = true, moduleIndex = 0; moduleIndex < list.length; moduleIndex++) {\n                    var moduleData = list[moduleIndex];\n                    if (moduleData.data && moduleData.data.length) {\n                        isBlank = !moduleData.data.filter(function(resData) {\n                            return resData && resData.latitude && resData.longitude\n                        }).length;\n                        if (!isBlank) {\n                            break;\n                        }\n                    }\n                } %>\n                <% if (!isBlank) { %>\n                    <li>\n                        <div class="map-nav-item map-main-item" data-nav-id="<%= data[journeyIndex][\'cid\'] %>">\n                          <div class="map-nav-label" title="第<%= data[journeyIndex][\'day\'] %>天">第<%= data[journeyIndex][\'day\'] %>天</div>\n                          <i class="map-nav-icon-serial"><span>D<%= data[journeyIndex][\'day\'] %></span></i>\n                        </div>\n                        <ul class="map-nav-sub">\n                          <% var itemIndex = 1;%>\n                          <% for (var moduleIndex = 0; moduleIndex < list.length; moduleIndex++) { %>\n                              <% var moduleData = list[moduleIndex] %>\n                              <% if (moduleData) { %>\n                                  <% if (moduleData.data && moduleData.data.length) { %>\n                                      <% for(var resIndex = 0; resIndex <  moduleData.data.length; resIndex++) { %>\n                                          <% var resData = moduleData.data[resIndex] %>\n                                          <% if (resData && resData.latitude && resData.longitude) { %>\n                                              <li>\n                                                <div class="map-nav-item map-sub-item" data-nav-id="<%= data[journeyIndex][\'cid\'] %>" data-sub-id="<%= resData[\'cid\'] %>">\n                                                  <div class="map-nav-label" title="<%= resData[\'title\'] %>"><%= resData[\'title\'] %></div>\n                                                  <i class="map-nav-icon-serial"><span><%= itemIndex++ %></span></i>\n                                                </div>\n                                              </li>\n                                          <% } %>\n                                      <% } %>\n                                  <% } %>\n                              <% } %>\n                          <% } %>\n                        </ul>\n                    </li>\n                <% } %>\n            <% } %>\n          <% } %>\n        <% } %>\n      </ul>\n    </div>\n    </div>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.spotDetailTemplate = '\n<div class="detail-dialog">\n    \x3c!-- dialog head S --\x3e\n    <div class="detail-dialog-head">\n        <div class="detail-dialog-title"><%= data.title %></div>\n        <div class="J_DialogClose detail-dialog-close"></div>\n    </div>\n    \x3c!-- dialog head E --\x3e\n    <div class="detail-dialog-body">\n        <div class="detail-dialog-gallery">\n            <% if (data.picture && data.picture.length) { %>\n                <div class="J_DialogGallery gallery">\n                    <div class="gallery-display">\n                        <ul class="gallery-display-box">\n                            <% if (data.picture && data.picture.length) { %>\n                                <% for(var i = 0, len = data.picture.length, item; i < data.picture.length && (item = data.picture[i]); i++) { %>\n                                <li class="gallery-photo<% if (i === 0) { %> gallery-photo-active<% } %>" data-src="<%= item.url %>" data-thumb="<%= item.url %>">\n                                    <img src="<%= item.url %>" alt="<%= item.title %>">\n                                </li>\n                                <% } %>\n                            <% } %>\n                        </ul>\n                    </div>\n                    <div class="gallery-nav">\n                        <div class="gallery-prev"><i class="icon"></i></div>\n                        <div class="gallery-next"><i class="icon"></i></div>\n                        <div class="gallery-thumbs">\n                            <div class="gallery-mask"></div>\n                            <div class="gallery-nav-box">\n                                <ul class="gallery-nav-list">\n                                    <% if (data.picture && data.picture.length) { %>\n                                        <% for(var i = 0, len = data.picture.length, item; i < data.picture.length && (item = data.picture[i]); i++) { %>\n                                        <li class="gallery-thumb"><img src="<%= item.url %>" alt="<%= item.title %>"></li>\n                                        <% } %>\n                                    <% } %>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            <% } %>\n        </div>\n\n        <div class="detail-dialog-info">\n            <div class="detail-dialog-info-box">\n                <div class="detail-dialog-info-title">\n                    景点介绍<i class="icon detail-content-icon-note"></i>\n                </div>\n                <% if (data.beenCount && data.beenCount != 0) { %>\n                    <div class="detail-dialog-info-item">\n                        <i class="icon detail-content-icon-person"></i>\n                        <strong class="detail-dialog-info-strong"><%= data.beenCount %></strong>人去过\n                    </div>\n                <% } %>\n                <% if (data.times != 0) { %>\n                    <div class="detail-dialog-info-item">\n                        <i class="icon detail-content-icon-clock"></i> 游玩时长:\n                        <%= data.times %>\n                    </div>\n                <% } %>\n                <% if (data.opened) { %>\n                    <div class="detail-dialog-info-item">\n                        <i class="icon detail-content-icon-calendar"></i> 开放时间:\n                        <%= data.opened %>\n                    </div>\n                <% } %>\n                <% if (data.telephone) { %>\n                    <div class="detail-dialog-info-item">\n                        <i class="icon detail-content-icon-telphone"></i> 电话号码:\n                        <%= data.telephone %>\n                    </div>\n                <% } %>\n                <% if (data.address) { %>\n                    <div class="detail-dialog-info-item">\n                        <i class="icon detail-content-icon-location"></i> 景点地址:\n                        <%= data.address %>\n                    </div>\n                <% } %>\n                <% if (data.content) { %>\n                    <div class="detail-dialog-info-desc">\n                        <%- data.content %>\n                    </div>\n                <% } %>\n            </div>\n        </div>\n    </div>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.Journey = void 0;
    var i = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }

            return function (t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(), a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, o = n(0), r = S(n(10)), s = n(76), l = n(78), c = n(79), d = n(80), u = n(81), f = n(23), p = T(n(24)),
        h = n(86), v = n(87), m = n(88), g = n(89), y = n(90), b = T(n(25)), _ = T(n(26)), x = T(n(28)), j = n(13),
        w = S(n(3)), D = n(21), k = n(11), C = n(7), I = n(12);

    function T(e) {
        return e && e.__esModule ? e : {default: e}
    }

    function S(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }

    var M = 1, O = 4, E = 5, A = void 0, P = void 0, J = void 0, N = void 0, L = void 0,
        R = $("#J_MultiJourneyTab").find(".journey-tab-list"), F = $(window), H = void 0, V = void 0;
    t.Journey = function () {
        function e(t) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.status = M, this.config = t, this.journeyId = t.journeyId, this.$tab = R.find(".journey-tab-item").filter('[data-id="' + this.journeyId + '"]'), this.rel = this.$tab.data("rel"), this.journeyIns = null, this.active = !1, this.journeyData = null, A = $("#J_MultiJourneyNav"), P = A.find("[data-rel]"), J = $("#J_DetailTab").height(), N = $("#J_DetailMultiRoute"), L = $("#J_MultiJourneySelect"), H = (0, o.getStore)(), V = H.getState("multiJourneyBaseInfos"), t.data && (this.journeyData = t.data, this.status = O), $(this.rel).length && (this.status = E)
        }

        return i(e, [{
            key: "initVisa", value: function () {
                w.off(this.$visa);
                var e = new b['default']({$el: this.$visa});
                j.fetchVisa.fetch(function (t) {
                    e.load(t), e.render()
                }, function () {
                    e.remove()
                })
            }
        }, {
            key: "initGuide", value: function () {
                w.off(this.$guide);
                var e = new _['default']({$el: this.$guide});
                j.fetchGuide.fetch(function (t) {
                    e.load(t), e.render()
                }, function () {
                    e.remove()
                })
            }
        }, {
            key: "initUpgrade", value: function () {
                var e = this;
                w.off(this.$upgrade);
                var t = new x['default']({$el: this.$upgrade});
                j.fetchUpgrade.fetch(function (n) {
                    t.load(n), t.render(e.journeyId)
                }, function () {
                    t.remove()
                })
            }
        }, {
            key: "activate", value: function () {
                this.active = !0, this.journeyData ? (this.isRendered() || this.render(), this.show()) : this.fetch()
            }
        }, {
            key: "show", value: function () {
                var e = this.journeyIns;
                ["$tab", "$target", "$floatTab"].forEach(function (t) {
                    return e[t].addClass("active")
                }), e.enable(), L.text(e.label)
            }
        }, {
            key: "hide", value: function () {
                var e = this.journeyIns;
                ["$tab", "$target", "$floatTab"].forEach(function (t) {
                    return e[t].removeClass("active")
                }), e.disable()
            }
        }, {
            key: "fetch", value: function (e) {
                var t = this;
                $.ajax({
                    url: t.config.getJourneyUrl(),
                    data: t.getJourneyReqParams(t.journeyId),
                    beforeSend: function () {
                        t.startLoading()
                    }
                }).done(function (e) {
                    e && e.success && e.data && e.data.journeyDetail && t.load(function (e) {
                        var t = e && e.journeyFourDetail;
                        return t && "object" == (void 0 === t ? "undefined" : a(t)) && (t.detail || []).forEach(function (e, t) {
                            e.cid = "d" + t, (e.data || []).forEach(function (t, n) {
                                t.cid = e.cid + "-m" + n, (t.data || []).forEach(function (e, n) {
                                    return e.cid = t.cid + "-s" + n
                                })
                            })
                        }), e
                    }(e.data.journeyDetail))
                }).always(function () {
                    t.stopLoading()
                })
            }
        }, {
            key: "load", value: function (e) {
                this.journeyData = e, this.status = O, this.active && this.render()
            }
        }, {
            key: "render", value: function () {
                var e = this, t = e.createRender(l.multiJourneyTemplate), n = e.createRender(c.featureTemplate),
                    i = e.createRender(d.journeyTemplate), a = e.createRender(u.feeTemplate),
                    o = e.createRender(h.policyTemplate), r = e.createRender(m.journey4Template),
                    f = e.createRender(v.journeyOldTemplate), p = e.createRender(g.journey4PhotoTemplate),
                    b = e.createRender(y.journey4ResourceTemplate), _ = {
                        helper: s.helper,
                        cdn: {cdnHost: window.cdnConfig && window.cdnConfig.url || "http://img1.tuniucdn.com"}
                    }, x = t(Object.assign({}, _, {
                        journeyDetail: e.journeyData,
                        journeyInfo: (V || []).filter(function (t) {
                            return t.journeyId == e.journeyId
                        })[0] || {},
                        data: {
                            bookCityCode: H.getState("bookCityCode"),
                            productId: H.getState("productId"),
                            productType: H.getState("productType"),
                            classBrandId: H.getState("classBrandId"),
                            operateFlag: H.getState("operateFlag"),
                            teamCityName: H.getState("teamCityName")
                        },
                        isSupportMultipleJourney: (V || []).length > 1,
                        journey4Scene: e.journeyData && e.journeyData.journeyFourDetail,
                        characteristic: function (e) {
                            var t = {}, n = (e || []).filter(function (e) {
                                return 15 === e.type && e.desc
                            });
                            if (n.length) try {
                                var i = JSON.parse(n[0] && n[0].desc);
                                t.characteristic = i && i.modules, t.isApp = i && i.isApp
                            } catch (e) {
                            } else (n = (e || []).filter(function (e) {
                                return 12 === e.type && e.desc
                            })).length && (t = n[0] && n[0].desc);
                            return t
                        }(e.journeyData && e.journeyData.tourRecommend),
                        cityCodeFromCookie: function (e) {
                            if (document.cookie.length > 0) {
                                var t = document.cookie.indexOf(e + "=");
                                if (-1 != t) {
                                    t = t + e.length + 1;
                                    var n = document.cookie.indexOf(";", t);
                                    return -1 == n && (n = document.cookie.length), unescape(document.cookie.substring(t, n))
                                }
                            }
                            return ""
                        }("tuniuuser_citycode")
                    }), null, function (e, t) {
                        switch (e) {
                            case"feature":
                                return n(Object.assign({}, _, t));
                            case"journey":
                                return i(Object.assign({}, _, t), null, function (e, t) {
                                    switch (e) {
                                        case"journey4":
                                            return r(Object.assign({}, _, t), null, function (e, t) {
                                                if ("journey4Resource" == e) return b(Object.assign({}, _, t), null, function (e, t) {
                                                    if ("journey4Photo" == e) return p(Object.assign({}, _, t))
                                                })
                                            });
                                        case"journeyOld":
                                            return f(Object.assign({}, _, t))
                                    }
                                });
                            case"fee":
                                return a(Object.assign({}, _, t));
                            case"policy":
                                return o(Object.assign({}, _, t))
                        }
                    });
                $(".J_multiContainer").append($('<div class="J_journey' + this.journeyId + '"></div>')), $(".J_journey" + this.journeyId).html(x), this.status = E, this.bind(!0)
            }
        }, {
            key: "bind", value: function (e) {
                this.initSupplier(), this.initReception(), this.$visa = $(".J_DetailVisa").filter('[data-id="' + this.journeyId + '"]'), this.$guide = $(".J_Guide").filter('[data-id="' + this.journeyId + '"]'), this.$upgrade = $(".J_DetailUpgrade").filter('[data-id="' + this.journeyId + '"]'), w.on(this.$visa, this.initVisa.bind(this)), w.on(this.$guide, this.initGuide.bind(this)), w.on(this.$upgrade, this.initUpgrade.bind(this)), 3 == H.getState("defaultJourneyType") ? this.journeyIns = this.initOneJourney4(this.journeyData) : this.journeyIns = this.initOneJourney3(), e && this.show()
            }
        }, {
            key: "initOneJourney3", value: function () {
                var e = this.$tab.data("rel"), t = $(e), n = P.filter('[data-rel="' + e + '"]'),
                    i = t.find(".J_JourneyNav"), a = t.find(".J_DetailRoute"), o = t.find(".J_DetailJourney"),
                    r = t.find(".J_JourneyTab"), s = (t.find(".J_JourneyRouteTab"), r.find(".section-box-toolbar")),
                    l = J, c = !1, d = void 0, u = void 0, f = void 0, p = void 0;

                function h() {
                    if (c) return d && d.update(), u && u.update(), f && f.update(), void(p && p.update());
                    c = !0, function (e) {
                        e.find(".item-label-fixed").each(function () {
                            var e = $(this), t = e.find(".item-label-inner"), n = e.height(), i = t.height();
                            n < i && (t.height(n), e.addClass("fold"), e.on("click", ".item-label-more", function () {
                                e.addClass("expand"), t.height(i), F.trigger("resize")
                            }).on("click", ".item-label-less", function () {
                                e.removeClass("expand"), t.height(n), F.trigger("resize")
                            }))
                        }), F.trigger("resize")
                    }(t), function (e) {
                        var t = e.find(".J_Journey3RouteTab");
                        (0, C.createTaber)(t, {ctx: e})
                    }(a), r.length && (d = (0, k.createFixer)(r, {
                        range: {top: r, bottom: t, left: N, right: N},
                        offset: {top: l, left: 0},
                        ctx: t
                    }), l += r.height(), u = (0, I.createScrollTaber)(r, {
                        offset: l,
                        ctx: t
                    })), f = (0, k.createFixer)(i, {
                        range: {top: o, bottom: o, left: t, right: t},
                        offset: {top: l + 10},
                        ctx: t
                    }), p = (0, I.createScrollTaber)(i, {offset: l})
                }

                return function (e) {
                    e.find("img").each(function () {
                        var e = $(this), t = e.data("src");
                        w.on(e, function () {
                            var n = new Image;
                            n.onload = function () {
                                e.prop("src", t).parent().addClass("loaded"), w.off(e), F.trigger("resize")
                            }, n.onerror = function () {
                                e.parent().addClass("loaded"), w.off(e), F.trigger("resize")
                            }, n.src = t, e.src = t
                        })
                    })
                }(t), {
                    $tab: this.$tab,
                    $floatTab: n,
                    $target: t,
                    id: this.journeyId,
                    label: n.text(),
                    disable: function () {
                        d && d.disable(), u && u.disable(), f && f.disable(), p && p.disable()
                    },
                    enable: function () {
                        h(), s.prepend(A), d && d.enable(), u && u.enable(), f && f.enable(), p && p.enable()
                    }
                }
            }
        }, {
            key: "initOneJourney4", value: function (e) {
                var t = this.$tab.data("rel"), n = $(t), i = P.filter('[data-rel="' + t + '"]'),
                    a = n.find(".J_JourneyTab"), o = a.find(".section-box-toolbar"), r = J, s = !1, l = void 0,
                    c = void 0;
                a.length && (r += a.height());
                var d = D.journey4Module.init(n, e && e.journeyFourDetail, {tabHeight: r});
                return f.featureModule.init({journeyId: this.journeyId}), new p['default']({
                    journeyId: this.journeyId,
                    citiesUrl: this.config.cities
                }).bind(), {
                    $tab: this.$tab,
                    $floatTab: i,
                    $target: n,
                    id: this.journeyId,
                    label: i.text(),
                    disable: function () {
                        d.disable(), l && l.disable(), c && c.disable()
                    },
                    enable: function () {
                        s || (s = !0, a.length && (l = (0, k.createFixer)(a, {
                            range: {
                                top: a,
                                bottom: n,
                                left: N,
                                right: N
                            }, offset: {top: J, left: 0}, ctx: n
                        }), c = (0, I.createScrollTaber)(a, {
                            offset: r,
                            ctx: n
                        }))), o.prepend(A), d.enable(), l && l.update(), c && c.update(), l && l.enable(), c && c.enable()
                    }
                }
            }
        }, {
            key: "initSupplier", value: function () {
                if (!this.config.isNeedReception()) {
                    var e = H.getState("supplier");
                    e && $(".J_DetailSupplier:not(.loaded-supplier)").each(function () {
                        var t = $(this), n = t.data("id");
                        if (n) {
                            var i = (e || []).filter(function (e) {
                                return e.resId == n
                            })[0];
                            if (i) {
                                var a = "<strong>" + i.aggregationCompanyName + "</strong>";
                                0 != i.statis && (a += "（该品牌在" + i.displayDestGroupName + "目的地满意度<strong>" + i.statis + "%</strong>", 0 != i.delta && (a += "，", a += i.deltaSign > 0 ? "高" : i.deltaSign < 0 ? "低" : "等", a += "于" + i.displayDestGroupName + "平均满意度 <span>" + i.delta + "%</span>"), a += "）"), t.find(".J_DetailSupplierContent").html(a), t.show()
                            }
                        }
                        t.addClass("loaded-supplier")
                    })
                }
            }
        }, {
            key: "initReception", value: function () {
                if (this.config.isNeedReception()) {
                    var e = H.getState("supplier");
                    e && $(".J_DetailReception:not(.loaded-reception)").each(function () {
                        var t = $(this), n = t.data("id");
                        if (n) {
                            var i = (e || []).filter(function (e) {
                                return e.resId == n
                            })[0];
                            if (i && i.groundOperatorsName) {
                                var a = "接待服务由 <strong>" + (i.groundOperatorsName || "") + "</strong> 提供";
                                t.find(".J_DetailReceptionContent").html(a), t.show()
                            }
                        }
                        t.addClass("loaded-reception")
                    })
                }
            }
        }, {
            key: "loadGuide", value: function (e) {
                this.guide.load(e), this.isRendered() && this.active && this.renderGuide()
            }
        }, {
            key: "renderGuide", value: function () {
                this.guide.isLoaded() && !this.guide.isRendered() && (this.guide.render(), this.append(this.guide), this.guide.bind())
            }
        }, {
            key: "getJourneyReqParams", value: function () {
                return {
                    productId: H.getState("productId"),
                    journeyId: this.journeyId,
                    bookCity: H.getState("bookCityCode"),
                    departCity: H.getState("departCityCode"),
                    backCity: H.getState("backCityCode")
                }
            }
        }, {
            key: "startLoading", value: function () {
                $(".J_journeyLoading").show().css({height: $(".J_MultiDetailJourney.active").height()})
            }
        }, {
            key: "stopLoading", value: function () {
                $(".J_journeyLoading").hide(), F.trigger("resize")
            }
        }, {
            key: "createRender", value: function (e) {
                return r.compile(e, {client: !0, compileDebug: !1})
            }
        }, {
            key: "isLoading", value: function () {
                return 3 == this.status
            }
        }, {
            key: "isLoaded", value: function () {
                return this.status >= O
            }
        }, {
            key: "isRendered", value: function () {
                return this.status >= E
            }
        }]), e
    }()
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.helper = void 0;
    var i = function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }(n(77));
    t.helper = {
        removeHtmlTag: function (e) {
            return String(e).replace(/<[a-zA-Z\/][^<>]*>/g, "")
        }, trimBoundBr: function (e) {
            return "string" == typeof e && e ? e.replace(/\s/g, "").replace(/^(<br\/?>)+/, "").replace(/(<br\/?>)+$/, "") : e
        }, resizeImage: function (e, t, n, i, a) {
            var o = void 0;
            return t = t || 0, n = n || 0, i = i || 0, a = a || 0, (o = /^(.*?)(_w\d+_h\d+_c\d+_t\d+)*\.([\w]+\?*[\w=&]*)$/.exec(e)) ? [o[1], "_", ["w" + t, "h" + n, "c" + i, "t" + a].join("_"), ".", o[3]].join("") : e
        }, nb2br: function (e) {
            return (e = e || "").replace(/\n+?/gm, "<br>")
        }, calculateDuration: function (e, t) {
            if (e && t) {
                var n = /^(\d+):(\d+)$/, i = n.exec(e);
                n.lastIndex = 0;
                var a = n.exec(t);
                if (i && a) return 60 * parseInt(a[1], 10) + parseInt(a[2], 10) - 60 * parseInt(i[1], 10) - parseInt(i[2], 10)
            }
            return 0
        }, wrap: function (e) {
            return e
        }, empty: function (e) {
            return function e(t) {
                return i.isString(t) ? !t.replace(/^\s*|\s*$/g, "") : i.isNumber(t) ? !t : i.isBoolean(t) ? t : Array.isArray(t) ? t.every(e) : i.isEmpty(t)
            }(e)
        }
    }
}, function (e, t, n) {
    "use strict";
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    (function () {
        var n = this || window, a = n._, o = {}, r = Array.prototype, s = Object.prototype, l = Function.prototype,
            c = r.push, d = r.slice, u = r.concat, f = s.toString, p = s.hasOwnProperty, h = r.forEach, v = r.map,
            m = r.reduce, g = r.reduceRight, y = r.filter, b = r.every, _ = r.some, x = r.indexOf, j = r.lastIndexOf,
            w = Array.isArray, D = Object.keys, k = l.bind, C = function e(t) {
                return t instanceof e ? t : this instanceof e ? void(this._wrapped = t) : new e(t)
            };
        void 0 !== e && e.exports && (t = e.exports = C), t._ = C, C.VERSION = "1.6.0";
        var I = C.each = C.forEach = function (e, t, n) {
            if (null == e) return e;
            if (h && e.forEach === h) e.forEach(t, n); else if (e.length === +e.length) {
                for (var i = 0, a = e.length; i < a; i++) if (t.call(n, e[i], i, e) === o) return
            } else {
                var r = C.keys(e);
                for (i = 0, a = r.length; i < a; i++) if (t.call(n, e[r[i]], r[i], e) === o) return
            }
            return e
        };
        C.map = C.collect = function (e, t, n) {
            var i = [];
            return null == e ? i : v && e.map === v ? e.map(t, n) : (I(e, function (e, a, o) {
                i.push(t.call(n, e, a, o))
            }), i)
        };
        var T = "Reduce of empty array with no initial value";
        C.reduce = C.foldl = C.inject = function (e, t, n, i) {
            var a = arguments.length > 2;
            if (null == e && (e = []), m && e.reduce === m) return i && (t = C.bind(t, i)), a ? e.reduce(t, n) : e.reduce(t);
            if (I(e, function (e, o, r) {
                a ? n = t.call(i, n, e, o, r) : (n = e, a = !0)
            }), !a) throw new TypeError(T);
            return n
        }, C.reduceRight = C.foldr = function (e, t, n, i) {
            var a = arguments.length > 2;
            if (null == e && (e = []), g && e.reduceRight === g) return i && (t = C.bind(t, i)), a ? e.reduceRight(t, n) : e.reduceRight(t);
            var o = e.length;
            if (o !== +o) {
                var r = C.keys(e);
                o = r.length
            }
            if (I(e, function (s, l, c) {
                l = r ? r[--o] : --o, a ? n = t.call(i, n, e[l], l, c) : (n = e[l], a = !0)
            }), !a) throw new TypeError(T);
            return n
        }, C.find = C.detect = function (e, t, n) {
            var i;
            return $(e, function (e, a, o) {
                if (t.call(n, e, a, o)) return i = e, !0
            }), i
        }, C.filter = C.select = function (e, t, n) {
            var i = [];
            return null == e ? i : y && e.filter === y ? e.filter(t, n) : (I(e, function (e, a, o) {
                t.call(n, e, a, o) && i.push(e)
            }), i)
        }, C.reject = function (e, t, n) {
            return C.filter(e, function (e, i, a) {
                return !t.call(n, e, i, a)
            }, n)
        }, C.every = C.all = function (e, t, n) {
            t || (t = C.identity);
            var i = !0;
            return null == e ? i : b && e.every === b ? e.every(t, n) : (I(e, function (e, a, r) {
                if (!(i = i && t.call(n, e, a, r))) return o
            }), !!i)
        };
        var $ = C.some = C.any = function (e, t, n) {
            t || (t = C.identity);
            var i = !1;
            return null == e ? i : _ && e.some === _ ? e.some(t, n) : (I(e, function (e, a, r) {
                if (i || (i = t.call(n, e, a, r))) return o
            }), !!i)
        };
        C.contains = C.include = function (e, t) {
            return null != e && (x && e.indexOf === x ? -1 != e.indexOf(t) : $(e, function (e) {
                return e === t
            }))
        }, C.invoke = function (e, t) {
            var n = d.call(arguments, 2), i = C.isFunction(t);
            return C.map(e, function (e) {
                return (i ? t : e[t]).apply(e, n)
            })
        }, C.pluck = function (e, t) {
            return C.map(e, C.property(t))
        }, C.where = function (e, t) {
            return C.filter(e, C.matches(t))
        }, C.findWhere = function (e, t) {
            return C.find(e, C.matches(t))
        }, C.max = function (e, t, n) {
            if (!t && C.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
            var i = -1 / 0, a = -1 / 0;
            return I(e, function (e, o, r) {
                var s = t ? t.call(n, e, o, r) : e;
                s > a && (i = e, a = s)
            }), i
        }, C.min = function (e, t, n) {
            if (!t && C.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
            var i = 1 / 0, a = 1 / 0;
            return I(e, function (e, o, r) {
                var s = t ? t.call(n, e, o, r) : e;
                s < a && (i = e, a = s)
            }), i
        }, C.shuffle = function (e) {
            var t, n = 0, i = [];
            return I(e, function (e) {
                t = C.random(n++), i[n - 1] = i[t], i[t] = e
            }), i
        }, C.sample = function (e, t, n) {
            return null == t || n ? (e.length !== +e.length && (e = C.values(e)), e[C.random(e.length - 1)]) : C.shuffle(e).slice(0, Math.max(0, t))
        };
        var S = function (e) {
            return null == e ? C.identity : C.isFunction(e) ? e : C.property(e)
        };
        C.sortBy = function (e, t, n) {
            return t = S(t), C.pluck(C.map(e, function (e, i, a) {
                return {value: e, index: i, criteria: t.call(n, e, i, a)}
            }).sort(function (e, t) {
                var n = e.criteria, i = t.criteria;
                if (n !== i) {
                    if (n > i || void 0 === n) return 1;
                    if (n < i || void 0 === i) return -1
                }
                return e.index - t.index
            }), "value")
        };
        var M = function (e) {
            return function (t, n, i) {
                var a = {};
                return n = S(n), I(t, function (o, r) {
                    var s = n.call(i, o, r, t);
                    e(a, s, o)
                }), a
            }
        };
        C.groupBy = M(function (e, t, n) {
            C.has(e, t) ? e[t].push(n) : e[t] = [n]
        }), C.indexBy = M(function (e, t, n) {
            e[t] = n
        }), C.countBy = M(function (e, t) {
            C.has(e, t) ? e[t]++ : e[t] = 1
        }), C.sortedIndex = function (e, t, n, i) {
            for (var a = (n = S(n)).call(i, t), o = 0, r = e.length; o < r;) {
                var s = o + r >>> 1;
                n.call(i, e[s]) < a ? o = s + 1 : r = s
            }
            return o
        }, C.toArray = function (e) {
            return e ? C.isArray(e) ? d.call(e) : e.length === +e.length ? C.map(e, C.identity) : C.values(e) : []
        }, C.size = function (e) {
            return null == e ? 0 : e.length === +e.length ? e.length : C.keys(e).length
        }, C.first = C.head = C.take = function (e, t, n) {
            if (null != e) return null == t || n ? e[0] : t < 0 ? [] : d.call(e, 0, t)
        }, C.initial = function (e, t, n) {
            return d.call(e, 0, e.length - (null == t || n ? 1 : t))
        }, C.last = function (e, t, n) {
            if (null != e) return null == t || n ? e[e.length - 1] : d.call(e, Math.max(e.length - t, 0))
        }, C.rest = C.tail = C.drop = function (e, t, n) {
            return d.call(e, null == t || n ? 1 : t)
        }, C.compact = function (e) {
            return C.filter(e, C.identity)
        };
        C.flatten = function (e, t) {
            return function e(t, n, i) {
                return n && C.every(t, C.isArray) ? u.apply(i, t) : (I(t, function (t) {
                    C.isArray(t) || C.isArguments(t) ? n ? c.apply(i, t) : e(t, n, i) : i.push(t)
                }), i)
            }(e, t, [])
        }, C.without = function (e) {
            return C.difference(e, d.call(arguments, 1))
        }, C.partition = function (e, t) {
            var n = [], i = [];
            return I(e, function (e) {
                (t(e) ? n : i).push(e)
            }), [n, i]
        }, C.uniq = C.unique = function (e, t, n, i) {
            C.isFunction(t) && (i = n, n = t, t = !1);
            var a = n ? C.map(e, n, i) : e, o = [], r = [];
            return I(a, function (n, i) {
                (t ? i && r[r.length - 1] === n : C.contains(r, n)) || (r.push(n), o.push(e[i]))
            }), o
        }, C.union = function () {
            return C.uniq(C.flatten(arguments, !0))
        }, C.intersection = function (e) {
            var t = d.call(arguments, 1);
            return C.filter(C.uniq(e), function (e) {
                return C.every(t, function (t) {
                    return C.contains(t, e)
                })
            })
        }, C.difference = function (e) {
            var t = u.apply(r, d.call(arguments, 1));
            return C.filter(e, function (e) {
                return !C.contains(t, e)
            })
        }, C.zip = function () {
            for (var e = C.max(C.pluck(arguments, "length").concat(0)), t = new Array(e), n = 0; n < e; n++) t[n] = C.pluck(arguments, "" + n);
            return t
        }, C.object = function (e, t) {
            if (null == e) return {};
            for (var n = {}, i = 0, a = e.length; i < a; i++) t ? n[e[i]] = t[i] : n[e[i][0]] = e[i][1];
            return n
        }, C.indexOf = function (e, t, n) {
            if (null == e) return -1;
            var i = 0, a = e.length;
            if (n) {
                if ("number" != typeof n) return e[i = C.sortedIndex(e, t)] === t ? i : -1;
                i = n < 0 ? Math.max(0, a + n) : n
            }
            if (x && e.indexOf === x) return e.indexOf(t, n);
            for (; i < a; i++) if (e[i] === t) return i;
            return -1
        }, C.lastIndexOf = function (e, t, n) {
            if (null == e) return -1;
            var i = null != n;
            if (j && e.lastIndexOf === j) return i ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
            for (var a = i ? n : e.length; a--;) if (e[a] === t) return a;
            return -1
        }, C.range = function (e, t, n) {
            arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
            for (var i = Math.max(Math.ceil((t - e) / n), 0), a = 0, o = new Array(i); a < i;) o[a++] = e, e += n;
            return o
        };
        var O = function () {
        };
        C.bind = function (e, t) {
            var n, i;
            if (k && e.bind === k) return k.apply(e, d.call(arguments, 1));
            if (!C.isFunction(e)) throw new TypeError;
            return n = d.call(arguments, 2), i = function () {
                if (!(this instanceof i)) return e.apply(t, n.concat(d.call(arguments)));
                O.prototype = e.prototype;
                var a = new O;
                O.prototype = null;
                var o = e.apply(a, n.concat(d.call(arguments)));
                return Object(o) === o ? o : a
            }
        }, C.partial = function (e) {
            var t = d.call(arguments, 1);
            return function () {
                for (var n = 0, i = t.slice(), a = 0, o = i.length; a < o; a++) i[a] === C && (i[a] = arguments[n++]);
                for (; n < arguments.length;) i.push(arguments[n++]);
                return e.apply(this, i)
            }
        }, C.bindAll = function (e) {
            var t = d.call(arguments, 1);
            if (0 === t.length) throw new Error("bindAll must be passed function names");
            return I(t, function (t) {
                e[t] = C.bind(e[t], e)
            }), e
        }, C.memoize = function (e, t) {
            var n = {};
            return t || (t = C.identity), function () {
                var i = t.apply(this, arguments);
                return C.has(n, i) ? n[i] : n[i] = e.apply(this, arguments)
            }
        }, C.delay = function (e, t) {
            var n = d.call(arguments, 2);
            return setTimeout(function () {
                return e.apply(null, n)
            }, t)
        }, C.defer = function (e) {
            return C.delay.apply(C, [e, 1].concat(d.call(arguments, 1)))
        }, C.throttle = function (e, t, n) {
            var i, a, o, r = null, s = 0;
            n || (n = {});
            var l = function () {
                s = !1 === n.leading ? 0 : C.now(), r = null, o = e.apply(i, a), i = a = null
            };
            return function () {
                var c = C.now();
                s || !1 !== n.leading || (s = c);
                var d = t - (c - s);
                return i = this, a = arguments, d <= 0 ? (clearTimeout(r), r = null, s = c, o = e.apply(i, a), i = a = null) : r || !1 === n.trailing || (r = setTimeout(l, d)), o
            }
        }, C.debounce = function (e, t, n) {
            var i, a, o, r, s, l = function l() {
                var c = C.now() - r;
                c < t ? i = setTimeout(l, t - c) : (i = null, n || (s = e.apply(o, a), o = a = null))
            };
            return function () {
                o = this, a = arguments, r = C.now();
                var c = n && !i;
                return i || (i = setTimeout(l, t)), c && (s = e.apply(o, a), o = a = null), s
            }
        }, C.once = function (e) {
            var t, n = !1;
            return function () {
                return n ? t : (n = !0, t = e.apply(this, arguments), e = null, t)
            }
        }, C.wrap = function (e, t) {
            return C.partial(t, e)
        }, C.compose = function () {
            var e = arguments;
            return function () {
                for (var t = arguments, n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)];
                return t[0]
            }
        }, C.after = function (e, t) {
            return function () {
                if (--e < 1) return t.apply(this, arguments)
            }
        }, C.keys = function (e) {
            if (!C.isObject(e)) return [];
            if (D) return D(e);
            var t = [];
            for (var n in e) C.has(e, n) && t.push(n);
            return t
        }, C.values = function (e) {
            for (var t = C.keys(e), n = t.length, i = new Array(n), a = 0; a < n; a++) i[a] = e[t[a]];
            return i
        }, C.pairs = function (e) {
            for (var t = C.keys(e), n = t.length, i = new Array(n), a = 0; a < n; a++) i[a] = [t[a], e[t[a]]];
            return i
        }, C.invert = function (e) {
            for (var t = {}, n = C.keys(e), i = 0, a = n.length; i < a; i++) t[e[n[i]]] = n[i];
            return t
        }, C.functions = C.methods = function (e) {
            var t = [];
            for (var n in e) C.isFunction(e[n]) && t.push(n);
            return t.sort()
        }, C.extend = function (e) {
            return I(d.call(arguments, 1), function (t) {
                if (t) for (var n in t) e[n] = t[n]
            }), e
        }, C.pick = function (e) {
            var t = {}, n = u.apply(r, d.call(arguments, 1));
            return I(n, function (n) {
                n in e && (t[n] = e[n])
            }), t
        }, C.omit = function (e) {
            var t = {}, n = u.apply(r, d.call(arguments, 1));
            for (var i in e) C.contains(n, i) || (t[i] = e[i]);
            return t
        }, C.defaults = function (e) {
            return I(d.call(arguments, 1), function (t) {
                if (t) for (var n in t) void 0 === e[n] && (e[n] = t[n])
            }), e
        }, C.clone = function (e) {
            return C.isObject(e) ? C.isArray(e) ? e.slice() : C.extend({}, e) : e
        }, C.tap = function (e, t) {
            return t(e), e
        };
        C.isEqual = function (e, t) {
            return function e(t, n, a, o) {
                if (t === n) return 0 !== t || 1 / t == 1 / n;
                if (null == t || null == n) return t === n;
                t instanceof C && (t = t._wrapped), n instanceof C && (n = n._wrapped);
                var r = f.call(t);
                if (r != f.call(n)) return !1;
                switch (r) {
                    case"[object String]":
                        return t == String(n);
                    case"[object Number]":
                        return t != +t ? n != +n : 0 == t ? 1 / t == 1 / n : t == +n;
                    case"[object Date]":
                    case"[object Boolean]":
                        return +t == +n;
                    case"[object RegExp]":
                        return t.source == n.source && t.global == n.global && t.multiline == n.multiline && t.ignoreCase == n.ignoreCase
                }
                if ("object" != (void 0 === t ? "undefined" : i(t)) || "object" != (void 0 === n ? "undefined" : i(n))) return !1;
                for (var s = a.length; s--;) if (a[s] == t) return o[s] == n;
                var l = t.constructor, c = n.constructor;
                if (l !== c && !(C.isFunction(l) && l instanceof l && C.isFunction(c) && c instanceof c) && "constructor" in t && "constructor" in n) return !1;
                a.push(t), o.push(n);
                var d = 0, u = !0;
                if ("[object Array]" == r) {
                    if (u = (d = t.length) == n.length) for (; d-- && (u = e(t[d], n[d], a, o));) ;
                } else {
                    for (var p in t) if (C.has(t, p) && (d++, !(u = C.has(n, p) && e(t[p], n[p], a, o)))) break;
                    if (u) {
                        for (p in n) if (C.has(n, p) && !d--) break;
                        u = !d
                    }
                }
                return a.pop(), o.pop(), u
            }(e, t, [], [])
        }, C.isEmpty = function (e) {
            if (null == e) return !0;
            if (C.isArray(e) || C.isString(e)) return 0 === e.length;
            for (var t in e) if (C.has(e, t)) return !1;
            return !0
        }, C.isElement = function (e) {
            return !(!e || 1 !== e.nodeType)
        }, C.isArray = w || function (e) {
            return "[object Array]" == f.call(e)
        }, C.isObject = function (e) {
            return e === Object(e)
        }, I(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (e) {
            C["is" + e] = function (t) {
                return f.call(t) == "[object " + e + "]"
            }
        }), C.isArguments(arguments) || (C.isArguments = function (e) {
            return !(!e || !C.has(e, "callee"))
        }), C.isFunction = function (e) {
            return "function" == typeof e
        }, C.isFinite = function (e) {
            return isFinite(e) && !isNaN(parseFloat(e))
        }, C.isNaN = function (e) {
            return C.isNumber(e) && e != +e
        }, C.isBoolean = function (e) {
            return !0 === e || !1 === e || "[object Boolean]" == f.call(e)
        }, C.isNull = function (e) {
            return null === e
        }, C.isUndefined = function (e) {
            return void 0 === e
        }, C.has = function (e, t) {
            return p.call(e, t)
        }, C.noConflict = function () {
            return n._ = a, this
        }, C.identity = function (e) {
            return e
        }, C.constant = function (e) {
            return function () {
                return e
            }
        }, C.property = function (e) {
            return function (t) {
                return t[e]
            }
        }, C.matches = function (e) {
            return function (t) {
                if (t === e) return !0;
                for (var n in e) if (e[n] !== t[n]) return !1;
                return !0
            }
        }, C.times = function (e, t, n) {
            for (var i = Array(Math.max(0, e)), a = 0; a < e; a++) i[a] = t.call(n, a);
            return i
        }, C.random = function (e, t) {
            return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
        }, C.now = Date.now || function () {
            return (new Date).getTime()
        };
        var E = {escape: {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;"}};
        E.unescape = C.invert(E.escape);
        var A = {
            escape: new RegExp("[" + C.keys(E.escape).join("") + "]", "g"),
            unescape: new RegExp("(" + C.keys(E.unescape).join("|") + ")", "g")
        };
        C.each(["escape", "unescape"], function (e) {
            C[e] = function (t) {
                return null == t ? "" : ("" + t).replace(A[e], function (t) {
                    return E[e][t]
                })
            }
        }), C.result = function (e, t) {
            if (null != e) {
                var n = e[t];
                return C.isFunction(n) ? n.call(e) : n
            }
        }, C.mixin = function (e) {
            I(C.functions(e), function (t) {
                var n = C[t] = e[t];
                C.prototype[t] = function () {
                    var e = [this._wrapped];
                    return c.apply(e, arguments), R.call(this, n.apply(C, e))
                }
            })
        };
        var P = 0;
        C.uniqueId = function (e) {
            var t = ++P + "";
            return e ? e + t : t
        }, C.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var J = /(.)^/,
            N = {"'": "'", "\\": "\\", "\r": "r", "\n": "n", "\t": "t", "\u2028": "u2028", "\u2029": "u2029"},
            L = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        C.template = function (e, t, n) {
            var i;
            n = C.defaults({}, n, C.templateSettings);
            var a = new RegExp([(n.escape || J).source, (n.interpolate || J).source, (n.evaluate || J).source].join("|") + "|$", "g"),
                o = 0, r = "__p+='";
            e.replace(a, function (t, n, i, a, s) {
                return r += e.slice(o, s).replace(L, function (e) {
                    return "\\" + N[e]
                }), n && (r += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), i && (r += "'+\n((__t=(" + i + "))==null?'':__t)+\n'"), a && (r += "';\n" + a + "\n__p+='"), o = s + t.length, t
            }), r += "';\n", n.variable || (r = "with(obj||{}){\n" + r + "}\n"), r = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + r + "return __p;\n";
            try {
                i = new Function(n.variable || "obj", "_", r)
            } catch (e) {
                throw e.source = r, e
            }
            if (t) return i(t, C);
            var s = function (e) {
                return i.call(this, e, C)
            };
            return s.source = "function(" + (n.variable || "obj") + "){\n" + r + "}", s
        }, C.chain = function (e) {
            return C(e).chain()
        };
        var R = function (e) {
            return this._chain ? C(e).chain() : e
        };
        return C.mixin(C), I(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
            var t = r[e];
            C.prototype[e] = function () {
                var n = this._wrapped;
                return t.apply(n, arguments), "shift" != e && "splice" != e || 0 !== n.length || delete n[0], R.call(this, n)
            }
        }), I(["concat", "join", "slice"], function (e) {
            var t = r[e];
            C.prototype[e] = function () {
                return R.call(this, t.apply(this._wrapped, arguments))
            }
        }), C.extend(C.prototype, {
            chain: function () {
                return this._chain = !0, this
            }, value: function () {
                return this._wrapped
            }
        }), C
    }).call(void 0)
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.multiJourneyTemplate = '<div class="J_MultiDetailJourney journey-multi-item active %>" id="J_MultiJourney<%= journeyInfo.journeyId %>">\n\n    <div class="journey-multi-brief">\n        <div class="journey-multi-brief-row">\n            <div class="journey-multi-brief-row-title">行程天数：</div>\n            <div class="journey-multi-brief-row-content"><%= journeyInfo.dayDuration %>天<%= journeyInfo.nightDuration? journeyInfo.nightDuration + \'晚\': \'\' %></div>\n        </div>\n        <div class="journey-multi-brief-row">\n            <div class="journey-multi-brief-row-title">适用团期：</div>\n            <div class="journey-multi-brief-row-content">\n                <% if (journeyInfo.planDate && journeyInfo.planDate.length) { %>\n                    <%= journeyInfo.planDate.join(\'、\') %>\n                <% } else { %>\n                    暂无适用团期\n                <% } %>\n            </div>\n        </div>\n        <div class="J_DetailSupplier journey-multi-brief-row journey-multi-brief-supplier" data-id="<%= journeyInfo.resId %>">\n            <div class="journey-multi-brief-row-title">产品品牌：</div>\n            <div class="J_DetailSupplierContent journey-multi-brief-row-content"></div>\n        </div>\n        <div class="J_DetailReception journey-multi-brief-row journey-multi-brief-reception" data-id="<%= journeyInfo.resId %>">\n            <div class="journey-multi-brief-row-title">接&ensp;待&ensp;社：</div>\n            <div class="J_DetailReceptionContent journey-multi-brief-row-content"></div>\n        </div>\n    </div>\n\n    <div class="J_JourneyTab journey-multi-tab">\n        <div class="section-box-toolbar">\n            <ul class="section-box-tab">\n                <li class="active" data-rel=".J_DetailFeature" mm="点击_详情区_线路介绍_多行程_导航栏_查看产品特色">\n                    <a href="javascript:;">产品特色</a>\n                </li>\n                <li data-rel=".J_DetailRoute" mm="点击_详情区_线路介绍_多行程_导航栏_查看详细行程">\n                    <a href="javascript:;">详细行程</a>\n                </li>\n                <% if (journeyDetail.schemeResIds && journeyDetail.schemeResIds.length) { %>\n                <li data-rel=".J_DetailUpgrade" mm="点击_详情区_线路介绍_多行程_导航栏_查看产品升级">\n                    <a href="javascript:;">产品升级</a>\n                </li>\n                <% } %>\n                <li data-rel=".J_DetailFee" mm="点击_详情区_线路介绍_多行程_导航栏_查看费用说明">\n                    <a href="javascript:;">费用说明</a>\n                </li>\n                <li data-rel=".J_DetailPolicy" mm="点击_详情区_线路介绍_多行程_导航栏_查看预订须知">\n                    <a href="javascript:;">预订须知</a>\n                </li>\n                <% if (journeyDetail.visaResIds && journeyDetail.visaResIds.length) { %>\n                    <li data-rel=".J_DetailVisa" mm="点击_详情区_线路介绍_多行程_导航栏_查看签证信息">\n                        <a href="javascript:;">签证信息</a>\n                    </li>\n                <% } %>\n                <% if (journeyDetail.guideIds && journeyDetail.guideIds.length) { %>\n                <li class="last" data-rel=".J_Guide" mm="点击_详情区_导航栏_查看线路导游">\n                    <a href="javascript:;">线路导游</a>\n                </li>\n                <% } %>\n            </ul>\n        </div>\n    </div>\n\n    <%- include(\'feature\', {\n        journey: journeyDetail,\n        journeyInfo: journeyInfo,\n        isSupportMultipleJourney: isSupportMultipleJourney,\n        teamCityName: data.teamCityName,\n        productType: data.productType,\n        classBrandId: data.classBrandId,\n        helper: helper,\n        noImage: false,\n        characteristic: characteristic\n    }) %>\n\n    <%- include(\'journey\', {\n        productId: data.productId,\n        journey: journeyDetail,\n        isSupportMultipleJourney: isSupportMultipleJourney,\n        journeyId: journeyInfo.journeyId,\n        journey4Id: journey4Scene.journeyId || \'\',\n        bookCityCode: data.bookCityCode,\n        cityCodeFromCookie: cityCodeFromCookie,\n        helper: helper,\n        noImage: false\n    }) %>\n\n    <% if (journeyDetail.schemeResIds && journeyDetail.schemeResIds.length) { %>\n        <div class="J_DetailUpgrade section-loading" data-id="<%= journeyInfo.journeyId %>"></div>\n    <% } %>\n\n    <%- include(\'fee\', {\n        journey: journeyDetail,\n        helper: helper\n    }) %>\n\n    <%- include(\'policy\', {\n        journeyId: journeyInfo.journeyId,\n        journey: journeyDetail,\n        operateFlag: data.operateFlag,\n        helper: helper\n    }) %>\n\n    <% if (journeyDetail.visaResIds && journeyDetail.visaResIds.length) { %>\n        <div class="J_DetailVisa section-loading" data-id="<%= journeyInfo.journeyId %>"></div>\n    <% } %>\n\n    <% if (journeyDetail.guideIds && journeyDetail.guideIds.length) { %>\n        <div class="J_Guide section-loading" data-id="<%= journeyInfo.journeyId %>"></div>\n    <% } %>\n</div>'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.featureTemplate = '<%\nvar TEAM_TYPE_MAP = {\n    0: \'出发地成团\',\n    1: \'目的地成团\',\n    2: \'中转地联运\',\n    3: \'无\'\n};\nvar TRAFFIC_TYPE_MAP = {\n    1: \'飞机\',\n    2: \'火车卧铺\',\n    3: \'火车硬卧\',\n    4: \'火车软座\',\n    5: \'火车硬座\',\n    6: \'汽车\',\n    7: \'邮轮\',\n    8: \'火车\',\n    9: \'动车组\',\n    10: \'游船\',\n    11: \'高铁二等座\',\n    12: \'高铁一等座\',\n    13: \'高铁商务座\',\n    14: \'自行安排\'\n};\nvar RECOMMEND_TYPE_MAP = {\n    1: \'用餐安排\',\n    2: \'住宿安排\',\n    3: \'行程安排\',\n    4: \'游玩安排\',\n    5: \'购物安排\',\n    6: \'娱乐安排\',\n    7: \'贴心赠送\',\n    9: \'特别优惠\',\n    10: \'重要提示\',\n    11: \'交通信息\',\n    15: \'产品特色\',\n    13: \'其他信息\'\n};\nvar STANDARD_TYPES = [1, 2, 3, 4, 5, 6, 7];\nvar OTHER_TYPES = [9, 10, 11, 13];\nvar standardList = (journey.tourRecommend || []).filter(function(item) {\n    return ~STANDARD_TYPES.indexOf(item.type) && item.desc;\n})\nvar isPrint = false;\n\nif (typeof printMode == \'boolean\') {\n    isPrint = printMode;\n}\n\nvar tCityName = TEAM_TYPE_MAP[journey.teamType];\nif (journey.teamType == 0) {\n    tCityName = teamCityName ? (teamCityName + \'成团\') : \'\';\n} else if(journey.teamType == 1) {\n    tCityName = (journey.agglomerateName || \'目的地\') + \'成团\';\n}\n\n%>\n\n<div class="J_DetailFeature section-box detail-feature" data-id="<%= journeyInfo.journeyId %>">\n    <% if (isSupportMultipleJourney == 0) { %>\n        <div class="section-box-head">\n            <h2>产品特色</h2>\n        </div>\n    <% } %>\n    <div class="section-box-body">\n        <% if (!(productType == 8 && classBrandId != 20)) { %>\n            <div class="section-box-title">\n                <h3>产品概要</h3>\n            </div>\n\n            <div class="section-box-content">\n                <div class="detail-feature-brief">\n                    <% if (journeyInfo.dayDuration) { %>\n                        <div class="detail-feature-brief-item">\n                            行程天数：<strong><%= journeyInfo.dayDuration %>天<%= journeyInfo.nightDuration? journeyInfo.nightDuration + \'晚\': \'\' %></strong>\n                        </div>\n                    <% } %>\n                    <% if (tCityName) { %>\n                        <div class="detail-feature-brief-item">\n                            成团地点：<strong><%= tCityName %></strong>\n                        </div>\n                    <% } %>\n                    <% if (journey.destination) { %>\n                        <div class="detail-feature-brief-item">\n                            目的地：<strong><%= journey.destination %></strong>\n                        </div>\n                    <% } %>\n                    <% if ((journey.trafficGo && ~journey.trafficGo) || (journey.trafficBack && ~journey.trafficBack)) { %>\n                        <div class="detail-feature-brief-item">\n                            往返交通：<strong><%= TRAFFIC_TYPE_MAP[journey.trafficGo] %>/<%= TRAFFIC_TYPE_MAP[journey.trafficBack]%></strong>\n                        </div>\n                    <% } %>\n                    <% if (!isPrint && journey.defaultDeadline && (journey.defaultDeadline.deadLineDate || journey.defaultDeadline.deadLineHour)) { %>\n                        <div class="detail-feature-brief-item">\n                            报名截止时间：<strong>团期前<%= journey.defaultDeadline.deadLineDate %>天<%= journey.defaultDeadline.deadLineHour %>点</strong>\n                            <% if (journey.deadline && Object.keys(journey.deadline).length) { %>\n                                <a class="J_DetailFeatureDeadline" href="javascript:;" mm="点击_详情区_产品特色_产品概要_查看报名截止时间">查看全部报名截止时间<i class="icon"></i></a>\n\n                                <% var deadlineKeys = Object.keys(journey.deadline).filter(function(key) {\n                                    var deadline = journey.deadline[key];\n                                    return deadline && deadline.deadLineTime;\n                                }); %>\n                                <div class="detail-feature-deadline">\n                                    <i class="detail-feature-deadline-arrow"></i>\n                                    <div class="detail-feature-deadline-inner">\n                                        <div class="detail-feature-deadline-left">\n                                            <div class="thead">\n                                                <table>\n                                                    <thead>\n                                                        <tr>\n                                                            <th class="col-1">出发团期</th>\n                                                            <th class="col-2">报名截止时间</th>\n                                                        </tr>\n                                                    </thead>\n                                                </table>\n                                            </div>\n                                            <div class="tbody">\n                                                <table>\n                                                    <tbody>\n                                                        <% for (var index = 0; index < deadlineKeys.length; index++) { %>\n                                                            <% if (index % 2 === 0) { %>\n                                                                <% var deadline = deadlineKeys[index] %>\n                                                                <tr class="<%= index % 4 !== 0 ? \'even\' : \'\'%>">\n                                                                    <td class="col-1"><%= deadline %></td>\n                                                                    <td class="col-2"><%= journey.deadline[deadline].deadLineTime %>点之前</td>\n                                                                </tr>\n                                                            <% } %>\n                                                        <% } %>\n                                                    </tbody>\n                                                </table>\n                                            </div>\n                                        </div>\n                                        <div class="detail-feature-deadline-right">\n                                            <div class="thead">\n                                                <table>\n                                                    <thead>\n                                                        <tr>\n                                                            <th class="col-1">出发团期</th>\n                                                            <th class="col-2">报名截止时间</th>\n                                                        </tr>\n                                                    </thead>\n                                                </table>\n                                            </div>\n                                            <div class="tbody">\n                                                <table>\n                                                    <tbody>\n                                                    <% for (var index = 0; index < deadlineKeys.length; index++) { %>\n                                                        <% if (index % 2 === 1) { %>\n                                                            <% var deadline = deadlineKeys[index] %>\n                                                            <tr class="<%= (index - 1) % 4 !== 0 ? \'even\' : \'\'%>">\n                                                                <td class="col-1"><%= deadline %></td>\n                                                                <td class="col-2"><%= journey.deadline[deadline].deadLineTime %>点之前</td>\n                                                            </tr>\n                                                        <% } %>\n                                                    <% } %>\n                                                    </tbody>\n                                                </table>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n\n                            <% } %>\n                        </div>\n                    <% } %>\n                    <% if (productType != 2 && isSupportMultipleJourney == 0) { %>\n                        <div class="detail-feature-brief-item">\n                            组团形式：\n                            <strong>\n                                <% if (journey.independentTeam == 0 || journey.independentTeam == 2) { %>\n                                    <% if(journey.joinGroupItem == 1){ %>\n                                        联合发团；本产品与其他旅行社联合发团。\n                                        <% var joinGroupItemInfo = journey.joinGroupItemInfo || {} %>\n                                        <%= Object.keys(joinGroupItemInfo)\n                                                .map(function(key) {return joinGroupItemInfo[key]})\n                                                .filter(function(info) {return info})\n                                                .join(\'\')\n                                        %>\n                                    <% } else if (journey.joinGroupItem == 0){ %>\n                                        联合发团；本产品与其他旅行社联合发团。\n                                    <% } %>\n                                <% } else if(journey.independentTeam == 1) { %>\n                                    途牛独家发团；本产品为途牛独家发团产品，只接受途牛客人参团。\n                                <% } %>\n                            </strong>\n                        </div>\n\n                        <% if (!helper.empty(journey.importantAddition)) { %>\n                            <div class="detail-feature-brief-item">\n                                附加说明：\n                                <strong>\n                                    <%= journey.importantAddition.join(\'\') %>\n                                </strong>\n                            </div>\n                        <% } %>\n\n                    <% } %>\n                </div>\n            </div>\n        <% } %>\n\n        <div class="section-box-title">\n            <h3>产品特色<% characteristic.isApp %></h3>\n        </div>\n\n        <% if (Array.isArray(characteristic.characteristic) && characteristic.characteristic.length) { %>\n            <% for (var i = 0; i < characteristic.characteristic.length; i++) {%>\n                <% var character = characteristic.characteristic[i] %>\n                <% if (helper.removeHtmlTag(character.title) || helper.removeHtmlTag(character.content)) { %>\n                    <div class="section-box-content">\n                        <% if (character.title) { %>\n                            <strong><%= character.title %></strong><br>\n                        <% } %>\n                        <%- (character.content || \'\').replace(/[\\n\\r]+?/g, \'<br>\') %>\n                    </div>\n                <% } %>\n                <% if (character.imgs && !noImage) { %>\n                    <% var imgs = character.imgs.split(\',\') %>\n                    <% if(imgs && imgs.length) { %>\n                        <% var showSmallImage = characteristic.isApp%>\n                        <% if(showSmallImage) { %>\n                        <div class="detail-feature-photos">\n                            <% var photoLength = imgs.length; %>\n                                <div class="detail-feature-photo detail-feature-photo-1<%= photoLength > 1 ? \' detail-feature-photo-multi\':\'\' %>">\n                                    <% if (photoLength === 1) { %>\n                                        <div class="detail-feature-photo-item">\n                                            <div class="detail-feature-photo-item-inner">\n                                                <% if (isPrint) { %>\n                                                    <img src="<%= helper.resizeImage(imgs[0], 1024) %>">\n                                                <% } else { %>\n                                                    <img src="<%= cdn.cdnHost %>/static/img/2016/common/placeholder.png" data-src="<%= helper.resizeImage(imgs[0], 1024) %>">\n                                                <% } %>\n                                            </div>\n                                        </div>\n                                    <% } else { %>\n                                        <% imgs.forEach((photo, photoIndex) => { %>\n                                            <div class="detail-feature-photo-item">\n                                                <div class="detail-feature-photo-item-inner">\n                                                    <% if (isPrint) { %>\n                                                        <img src="<%= helper.resizeImage(photo, 1024) %>">\n                                                    <% } else { %>\n                                                        <img src="<%= cdn.cdnHost %>/static/img/2016/common/placeholder.png" data-src="<%= helper.resizeImage(photo, 1024) %>">\n                                                    <% } %>\n                                                </div>\n                                            </div>\n                                        <% }); %>\n                                    <% } %>\n                                </div>\n                            </div>\n                        <% } else { %>\n                            <div class="detail-feature-photos">\n                                <% var photoLength = imgs.length; %>\n                            <% photoLength = photoLength > 4 ? 4 : (photoLength == 3 ? 2 : photoLength) %>\n                            <% var photoStep = photoLength === 3 ? 3 : 2 %>\n                            <div class="detail-feature-photo detail-feature-photo-<%= photoLength %>">\n\n                                <% if (photoLength === 1) { %>\n                                    <div class="detail-feature-photo-item">\n                                        <div class="detail-feature-photo-item-inner">\n                                            <% if (isPrint) { %>\n                                                    <img src="<%= helper.resizeImage(imgs[0], 1024) %>">\n                                            <% } else { %>\n                                                    <img src="<%= cdn.cdnHost %>/static/img/2016/common/placeholder.png" data-src="<%= helper.resizeImage(imgs[0], 1024) %>">\n                                            <% } %>\n                                        </div>\n                                    </div>\n                                <% } else { %>\n                                    <% imgs.forEach(function(photo, photoIndex) { %>\n                                        <% if(photoIndex < photoLength) { %>\n                                            <div class="detail-feature-photo-item">\n                                                <div class="detail-feature-photo-item-inner">\n                                                    <% if (isPrint) { %>\n                                                        <img src="<%= helper.resizeImage(photo, 450, 300, 1) %>">\n                                                    <% } else { %>\n                                                        <img src="<%= cdn.cdnHost %>/static/img/2016/common/placeholder.png" data-src="<%= helper.resizeImage(photo, 450, 300, 1) %>">\n                                                    <% } %>\n                                                </div>\n                                            </div>\n                                            <% if ((photoIndex + 1) % photoStep === 0) { %>\n                                                <div class="detail-feature-photo-sep"></div>\n                                            <% } %>\n                                        <% } %>\n                                    <% }); %>\n                                <% } %>\n\n                            </div>\n                        </div>\n                        <% } %>\n                    <% } %>\n                <% } %>\n            <% } %>\n        <% } else if(typeof characteristic === \'string\' && characteristic) { %>\n            <div class="section-box-content">\n                <%- characteristic.replace(/[\\n\\r]+?/g, \'<br>\') %>\n            </div>\n        <% } %>\n\n        <% if (standardList.length) { %>\n            <div class="section-box-title">\n                <h3>接待标准</h3>\n            </div>\n            <div class="section-box-content">\n                <% for (var i = 0; i < standardList.length; i++) { %>\n                    <p class="item-label">\n                        <strong><span class="dot">•</span><%= RECOMMEND_TYPE_MAP[standardList[i].type] %>：</strong><%- helper.nb2br(standardList[i].desc) %>\n                    </p>\n                <% } %>\n            </div>\n        <% } %>\n\n        <% (journey.tourRecommend || []).filter(function(item) { %>\n            <% if (~OTHER_TYPES.indexOf(item.type) && helper.removeHtmlTag(item.desc).replace(/(\\s|&nbsp;)+/g, \'\')) { %>\n                <div class="section-box-title">\n                    <h3><%= RECOMMEND_TYPE_MAP[item.type] %></h3>\n                </div>\n                <div class="section-box-content">\n                    <%- helper.nb2br(item.desc) %>\n                </div>\n            <% } %>\n        <% }) %>\n\n    </div>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.journeyTemplate = '<% var downloadUrl %>\n<% var printUrl %>\n<div class="J_DetailRoute section-box detail-route detail-route<%= parseInt(journey.journeyType) + 1 %>" data-id="<%= journeyId %>">\n    <div class="section-box-head">\n        <% if (isSupportMultipleJourney) { %>\n            <h2>详细行程</h2>\n        <% } else { %>\n            <h2>线路介绍</h2>\n        <% } %>\n    </div>\n    <div class="section-box-body">\n\n        <% if (journey.tourTrafficInfo && !helper.empty(journey.tourTrafficInfo.departBusInfo)) { %>\n            <% var busList = journey.tourTrafficInfo.departBusInfo.filter(function(busInfo) {\n                return Object.keys(busInfo || {}).some(function(item) {\n                    return busInfo[item];\n                });\n            }) %>\n            <% if(busList.length) { %>\n            <div class="section-box-title">\n                <h3>发车信息\n                    <% if (journey.tourTrafficInfo.departInfo) { %>\n                        <span>* <%= journey.tourTrafficInfo.departInfo %></span>\n                    <% } %>\n                </h3>\n            </div>\n            <div class="section-box-content detail-depart">\n                <table>\n                    <thead>\n                        <tr>\n                            <th class="col-1">发车时间</th>\n                            <th class="col-2">发车地点</th>\n                            <th class="col-3">返回地点</th>\n                            <th class="col-4">备注</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <% journey.tourTrafficInfo.departBusInfo.forEach(function(bus) { %>\n                            <tr>\n                                <td class="col-1"><%= bus.departTime %></td>\n                                <td class="col-2"><%= bus.departPlace %></td>\n                                <td class="col-3"><%= bus.backPlace %></td>\n                                <td class="col-4"><%= bus.departRemark %></td>\n                            </tr>\n                        <% }) %>\n                    </tbody>\n                </table>\n            </div>\n            <% } %>\n        <% } %>\n\n        <% if (journey.journeyType == 3) { %>\n            <% downloadUrl = \'/tour/journey/download/\' + productId + \'/\' + journey4Id + \'?noImage=1&b=\' + bookCityCode + \'&bc=\' + cityCodeFromCookie %>\n            <% printUrl = \'/tour/journey/print/\' + productId + \'/\' + journey4Id + \'?noImage=1&b=\' + bookCityCode + \'&bc=\' + cityCodeFromCookie %>\n            <div class="detail-route-download">\n                <a class="download" href="<%= downloadUrl %>" target="_blank" m="点击_详情区_线路介绍_下载行程">下载行程</a>\n                <a class="print" href="<%= printUrl %>" target="_blank" m="点击_详情区_线路介绍_打印行程">打印行程</a>\n            </div>\n        <% } else { %>\n            <div class="detail-route-download">\n                <% if (journey.journeyType == 2) { %>\n                    <% if (journey.scheduleFile && journey.scheduleFile.filePath) { %>\n                        <% downloadUrl = journey.scheduleFile.filePath %>\n                        <a href="<%= downloadUrl %>" target="_blank" m="点击_详情区_线路介绍_下载行程"><i class="icon"></i>下载行程</a>\n                    <% } %>\n                <% } else { %>\n                    <% downloadUrl = host.main + \'/tn?r=detail/tourV3/DownloadJourneyInfo&id=\' + productId %>\n                    <a href="<%= downloadUrl %>" target="_blank" m="点击_详情区_线路介绍_下载行程"><i class="icon"></i>下载行程</a>\n                <% } %>\n            </div>\n        <% } %>\n\n\n        <% switch(parseInt(journey.journeyType)) {\n            case 0:\n            %>\n                <%- include(\'journeyOld\') %>\n            <%\n                break;\n            case 3:\n            %>\n                <%- include(\'journey4\', {\n                    journey: journey,\n                    downloadUrl: downloadUrl,\n                    printUrl: printUrl\n                }) %>\n            <%\n                break;\n            %>\n        <% }%>\n    </div>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.feeTemplate = '<%\nvar formatTitle = function(str) {\n    if(typeof str === \'string\') {\n        switch(str.length) {\n            case 2:\n                str = str.split(\'\').join(\'&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;\');\n                break;\n            case 3:\n                str = str.split(\'\').join(\'&ensp;&ensp;\');\n                break;\n        }\n    }\n    return str;\n}\n%>\n\n<% if (!helper.empty(journey.costInclude) ||\n    !helper.empty(journey.costExclude) ||\n    !helper.empty(journey.activeRecommend) ||\n    !helper.empty(journey.activeRecommend)) { %>\n    <div class="J_DetailFee section-box detail-upgrade">\n        <div class="section-box-head">\n            <h2>费用说明</h2>\n        </div>\n        <div class="section-box-body">\n            <% if (!helper.empty(journey.costInclude)) { %>\n                <div class="section-box-title">\n                    <h3>费用包含</h3>\n                </div>\n                <div class="section-box-content">\n                    <% if (typeof journey.costInclude === \'string\') { %>\n                        <%- helper.nb2br(journey.costInclude) %>\n                    <% } else { %>\n                        <% journey.costInclude.forEach(function(inItem) { %>\n                            <% var itemValue = inItem.content;\n                                itemValue = Array.isArray(itemValue) ? itemValue.join(\'；\') : itemValue; %>\n                            <% if (itemValue) { %>\n                            <p class="item-label">\n                                <strong><span class="dot">•</span><%- formatTitle(inItem.title) %>：</strong>\n                                <%= itemValue %>\n                            </p>\n                            <% } %>\n                        <% }) %>\n                    <% } %>\n                </div>\n            <% } %>\n\n            <% if (!helper.empty(journey.costExclude)) { %>\n                <div class="section-box-title">\n                    <h3>费用不包含</h3>\n                </div>\n                <div class="section-box-content">\n                    <% if (typeof journey.costExclude === \'string\') { %>\n                        <%- helper.nb2br(journey.costExclude) %>\n                    <% } else { %>\n                        <% journey.costExclude.forEach(function(exItem) { %>\n                            <% var itemValue = exItem.content;\n                            itemValue = Array.isArray(itemValue) ? itemValue.join(\'；\') : itemValue; %>\n                            <% if (itemValue) { %>\n                            <p class="item-label">\n                                <strong><span class="dot">•</span><%- formatTitle(exItem.title) %>：</strong>\n                                <%= itemValue %>\n                            </p>\n                            <% } %>\n                        <% }) %>\n                    <% } %>\n                </div>\n            <% } %>\n\n            <% var hasShop = !helper.empty(journey.shopRecommend) %>\n            <% if (hasShop) { %>\n                <div class="section-box-title">\n                    <h3>购物推荐</h3>\n                </div>\n                <div class="section-box-content">\n                    <table class="detail-upgrade-shopping">\n                        <thead>\n                            <tr>\n                                <th class="col-1">名称</th>\n                                <th class="col-2">营业产品</th>\n                                <th class="col-3">说明</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <% journey.shopRecommend.forEach(function(shop, shopIndex) { %>\n                                <tr<%= shopIndex % 2 == 1 ? \' class="even"\' : \'\' %>>\n                                    <td><%= shop.name %></td>\n                                    <td><%= shop.remark %></td>\n                                    <td><%= shop.desc %></td>\n                                </tr>\n                            <% }) %>\n                        </tbody>\n                    </table>\n                </div>\n            <% } %>\n\n            <% var hasActivity = !helper.empty(journey.activeRecommend) %>\n            <% if (hasActivity) { %>\n                <div class="section-box-title">\n                    <h3>活动推荐</h3>\n                </div>\n                <div class="section-box-content">\n                    <table class="detail-upgrade-activity">\n                        <thead>\n                            <tr>\n                                <th class="col-1">活动名称</th>\n                                <th class="col-2">参考价格</th>\n                                <th class="col-3">详细说明</th>\n                                <th class="col-4">备注</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <% journey.activeRecommend.forEach(function(activity, shopIndex) { %>\n                                <tr<%= shopIndex % 2 == 1 ? \' class="even"\' : \'\' %>>\n                                    <td><%= activity.name %></td>\n                                    <td><%= activity.priceStr %></td>\n                                    <td><%= activity.desc %></td>\n                                    <td><%= activity.remark %></td>\n                                </tr>\n                            <% }) %>\n                        </tbody>\n                    </table>\n                </div>\n            <% } %>\n\n            <% if (hasShop || hasActivity) { %>\n                <div class="section-box-content">\n                    <div class="detail-upgrade-tip">推荐说明：*所有推荐项目均是建议性项目，客人应本着"自愿自费"的原则酌情参加。</div>\n                </div>\n            <% } %>\n\n        </div>\n    </div>\n<% } %>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.retailCityModule = void 0;
    var i = n(0), a = n(2), o = (n(1), n(7)), r = n(83), s = a.template.compile(r.retailCityTemplate), l = void 0,
        c = void 0, d = void 0, u = {
            init: function (e) {
                l = $("#J_retailCity"), c = e.bookCityCode, (0, i.getStore)(), l.length && window.cityList && (l.html(s(function (e) {
                    var t = [], n = {}, i = ["推荐城市"];
                    e.Hot.forEach(function (e) {
                        n["推荐城市"] || (n["推荐城市"] = []), n["推荐城市"].push(e)
                    }), t.push(n);
                    var a = function (n) {
                        var a = e.cityLetter[n], o = {};
                        for (var r in i[n] = "", a) {
                            var s = a[r];
                            i[n] += r.toUpperCase(), s.forEach(function (e) {
                                o[e.districtName] || (o[e.districtName] = []), e.code == c && (d = e.name), o[e.districtName].push(e)
                            })
                        }
                        t.push(o)
                    };
                    for (var o in e.cityLetter) a(o);
                    return {data: t, tabHead: i, bookCityName: d}
                }(window.cityList))), (0, o.createTaber)(l.find(".retail-city-drop-tab"), {ctx: l.find(".retail-city-drop-list")}))
            }
        };
    t.retailCityModule = u
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.retailCityTemplate = '\n<div class="retail-location-label">\n    <i class="r-icon-loc"></i><span class="retail-city-selected"><%= bookCityName %></span><i class="r-icon-down"></i>\n</div>\n<div class="retail-city-drop">\n    <div class="retail-city-drop-head">\n        <ul class="retail-city-drop-tab">\n            <% for (var i = 0; i < tabHead.length; i++) { %>\n                <li class="retail-city-drop-tab-item" data-rel=".J_retailTab<%= i %>"><%= tabHead[i] %></li>\n            <% } %>\n        </ul>\n    </div>\n    <div class="retail-city-drop-list">\n        <% for (var j = 0; j < data.length; j++) {\n            var cityItem = data[j]; %>\n            <dl class="retail-city-drop-city-city J_retailTab<%= j %>">\n                <% for (var key in cityItem) {\n                    var cityArea = cityItem[key] %>\n                    <dt><%= key %></dt>\n                    <dd class="retail-city-drop-city-item">\n                        <% for (var k = 0; k < cityArea.length; k++) { %>\n                        <span class="retail-city-drop-city-name <%= cityArea[k].name == bookCityName? \'active\': \'\' %>" data-code="<%= cityArea[k].code %>" data-name="<%= cityArea[k].name %>"><%= cityArea[k].name %></span>\n                        <% } %>\n                    </dd>\n                <% } %>\n            </dl>\n        <%}%>\n    </div>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.detailRetailTemplate = '\n<div class="retail-box">\n    <div class="retail-box-close">\n    </div>\n    <div class="retail-box-head">\n        查看途牛门市\n        <div class="retail-location" id="J_retailCity">\n        </div>\n    </div>\n    <div class="retail-box-body">\n        <% if(data && data.length) { %>\n        <div class="retail-list">\n            <ul>\n                <% for(var i = 0; i < data.length; i++) {\n                    var retailItem = data[i]; %>\n                <li>\n                    <span class="retail-item-num"><%= i+1 %></span>\n                    <div class="retail-item-content">\n                        <p class="retail-item-title"><%= retailItem.name %></p>\n                        <dl class="retail-item-info">\n                            <dt>门市电话：</dt>\n                            <dd><%= retailItem.tel %></dd>\n                            <dt>营业时间：</dt>\n                            <dd><%= retailItem.openTime %></dd>\n                            <dt>门市地址：</dt>\n                            <dd><%= retailItem.address %></dd>\n                        </dl>\n                    </div>\n                </li>\n                <% } %>\n            </ul>\n        </div>\n        <% } else { %>\n        <div class="retail-nf">\n            <div class="retail-nf-bg"></div>\n            <p class="retail-nf-tips">呃~当前城市暂未开通途牛门市</p>\n            <p class="retail-nf-tips">请选择查看您附近城市的门市</p>\n        </div>\n        <% } %>\n        <div class="retail-list-loading">\n            <i class="retail-list-loading-bg"></i>\n            <i class="retail-list-loading-img"></i>\n        </div>\n    </div>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }();
    var a = [], o = $(window), r = 0;

    function s(e) {
        return "expand" == e ? $('<a class="button-more" href="javascript:;">展开全部<i class="icon"></i></a>') : $('<a class="button-less" href="javascript:;">收起全部<i class="icon"></i></a>')
    }

    var l = function () {
        function e(t, n) {
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.originHeight = 0, this.expandHeight = 0, this.buttonInited = !1, this.inited = !1, this.expanded = !1, this.$element = t, this.id = "AUTOFOLD_" + ++r, this.$inner = t.find("[data-role=fold-box-inner]"), this.$more = null, this.$less = null, this.update()
        }

        return i(e, [{
            key: "init", value: function () {
                this.originHeight = this.$inner.height(), this.inited = !0
            }
        }, {
            key: "initButton", value: function () {
                this.$more = s("expand"), this.$less = s("fold"), this.bindButton(), this.buttonInited = !0
            }
        }, {
            key: "bindButton", value: function () {
                this.$more.click(this.expand.bind(this)), this.$less.click(this.fold.bind(this))
            }
        }, {
            key: "showButton", value: function () {
                this.buttonInited || this.initButton(), this.$more.appendTo(this.$element), this.$less.appendTo(this.$element), this.updateButton()
            }
        }, {
            key: "hideButton", value: function () {
                this.buttonInited && (this.$more.remove(), this.$less.remove())
            }
        }, {
            key: "updateButton", value: function () {
                this.buttonInited && (this.expanded ? (this.$more.hide(), this.$less.show()) : (this.$more.show(), this.$less.hide()))
            }
        }, {
            key: "update", value: function () {
                this.$element.is(":visible") && (this.inited || this.init(), this.expandHeight = this.$inner[0].scrollHeight, this.$inner.css("max-height", "none"), this.expandHeight > this.originHeight ? (this.showButton(), this.updateContent(), this.$element.addClass("fold")) : (this.hideButton(), this.$inner.height(this.expandHeight), this.$element.removeClass("fold")), o.trigger("resize", "autoFold"))
            }
        }, {
            key: "updateContent", value: function () {
                this.expanded ? this.$inner.height(this.expandHeight) : this.$inner.height(this.originHeight)
            }
        }, {
            key: "expand", value: function () {
                this.expanded = !0, this.updateContent(), this.updateButton()
            }
        }, {
            key: "fold", value: function () {
                this.expanded = !1, this.updateContent(), this.updateButton()
            }
        }]), e
    }();
    o.on("resize", function (e, t) {
        "autoFold" !== t && a.forEach(function (e) {
            return e.update()
        })
    }), t.createAutoFold = function (e, t) {
        var n = new l(e, t);
        return a.push(n), n
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.policyTemplate = '<%\nvar ITEM_NAME_MAP = {\n    trafficInfos: \'交&#12288;&#12288;通\',\n    accInfos: \'住&#12288;&#12288;宿\',\n    mealInfos: \'团队用餐\',\n    tour: \'游&#12288;&#12288;览\',\n    shopping: \'购&#12288;&#12288;物\',\n    diffPrice: \'差价说明\',\n    departureNotice: \'出团通知\',\n    suggestionFeedback: \'意见反馈\',\n    activityArrangment: \'活动说明\',\n    abroadNotice: \'注意事项\',\n    specialTerms: \'特别约定\',\n    selfDriveAttentions: \'自驾须知\',\n    orderAttentions: \'预订须知\',\n    warmAttention: \'温馨提示\'\n};\n\nvar SIGN_ICON_MAP = {\n    online: \'online\',\n    fax: \'fax\',\n    toDoor: \'visit\',\n    salesroom: \'retail\'\n}\n\nvar bookNotice = journey.bookNotice || [];\n\n// type 0:出行须知 1:特殊人群限制 2:安全提示\nvar hasOut = bookNotice.some(function(item) {\n    return item.type === 0 && item.content && item.content.length;\n});\n\nvar isPrint = false;\n\nif (typeof printMode == \'boolean\') {\n    isPrint = printMode;\n}\n\nvar formatTitle = function(str) {\n    if(typeof str === \'string\' && str.length === 2) {\n        str = str.split(\'\').join(\'&#12288;&#12288;\');\n    }\n    return str;\n}\n\n%>\n\n<div class="J_DetailPolicy section-box detail-policy" data-id="<%= journeyId %>">\n    <div class="section-box-head">\n        <h2>预订须知</h2>\n    </div>\n    <div class="section-box-body">\n        <% if (hasOut) { %>\n            <div class="section-box-title">\n                <h3>出行须知</h3>\n            </div>\n            <div class="section-box-content fold-box" data-role="fold-box">\n                <div class="fold-box-inner" data-role="fold-box-inner">\n                    <% bookNotice.forEach(function(item) { %>\n                        <% var itemValue = item.content;\n                        itemValue = Array.isArray(itemValue) ? itemValue.join(\'<br>\') : itemValue; %>\n                        <% if (item.type === 0 && !helper.empty(itemValue)) { %>\n                            <div class="item-label">\n                                <strong><span class="dot">•</span><%- formatTitle(item.title) %>：</strong>\n                                <%- itemValue %>\n                            </div>\n                        <% } %>\n                    <% }) %>\n                </div>\n            </div>\n        <% } %>\n\n        <% if (!helper.empty(journey.contractLoseInfos)) { %>\n            <div class="section-box-title">\n                <h3>违约责任提示</h3>\n            </div>\n            <div class="section-box-content fold-box" data-role="fold-box">\n                <div class="fold-box-inner" data-role="fold-box-inner">\n                    <p>旅游者在出发前提出解除合同的，应当按下列标准承担退团损失：</p>\n                    <% (journey.contractLoseInfos || []).forEach(function(info) {\n                        if(!helper.empty(info.regionList)) {\n                            info.regionList.forEach(function(region) { %>\n                                <div>\n                                    <span class="dot">•</span>\n                                    <%= region.content %>\n                                </div>\n                            <% }) %>\n                        <% } %>\n                    <% }) %>\n                </div>\n            </div>\n        <% } %>\n\n        <% if (isPrint !== true) { %>\n            <% var specialData = bookNotice.filter(function(item) {\n                    return item.type === 1;\n                })\n                if(specialData.length && !helper.empty(specialData[0].content)) { %>\n            <div class="section-box-title">\n                <h3>特殊限制</h3>\n            </div>\n            <div class="section-box-content fold-box" data-role="fold-box">\n                <div class="fold-box-inner" data-role="fold-box-inner">\n                    <div>\n                        <p>\n                            <%- specialData[0].content.join(\'<br>\') %>\n                        </p>\n                    </div>\n                </div>\n            </div>\n            <% } %>\n\n            <div class="section-box-title">\n                <h3>签约方式</h3>\n            </div>\n            <div class="section-box-content">\n                <div class="detail-policy-sign">\n                    <ul>\n                        <li>\n                            <div class="detail-policy-sign-item">\n                                <div class="detail-policy-sign-icon">\n                                    <i class="icon detail-policy-sign-icon-online"></i>\n                                </div>\n                                <div class="detail-policy-sign-title">\n                                    <strong>在线签约</strong>\n                                </div>\n                                <div class="detail-policy-sign-desc">\n                                    通过在线签约页面进行签约，付款成功后，将通过电子邮件接收电子版合同，与门市签约及传真签约同等有效。\n                                </div>\n                            </div>\n                        </li>\n                        <% if(!operateFlag) { %>\n                        <li>\n                            <div class="detail-policy-sign-item">\n                                <div class="detail-policy-sign-icon">\n                                    <i class="icon detail-policy-sign-icon-fax"></i>\n                                </div>\n                                <div class="detail-policy-sign-title">\n                                    <strong>传真签约</strong>\n                                </div>\n                                <div class="detail-policy-sign-desc">\n                                    双方在合同上签字盖章后，通过传真进行签约。如涉及签证材料需要快递，请在快件中注明订单号，以便工作人员及时处理。\n                                </div>\n                            </div>\n                        </li>\n                        <li>\n                            <div class="detail-policy-sign-item">\n                                <div class="detail-policy-sign-icon">\n                                    <i class="icon detail-policy-sign-icon-visit"></i>\n                                </div>\n                                <div class="detail-policy-sign-title">\n                                    <strong>上门签约</strong>\n                                </div>\n                                <div class="detail-policy-sign-desc">\n                                    途牛专业团队为您提供上门签约收团款收出境材料服务。支持POS刷卡支付。上海外环区域以内10元/单，万元以上团款首次签约免服务费。具体详询客服人员。\n                                </div>\n                            </div>\n                        </li>\n                        <li>\n                            <div class="detail-policy-sign-item">\n                                <div class="detail-policy-sign-icon">\n                                    <i class="icon detail-policy-sign-icon-retail"></i>\n                                </div>\n                                <div class="detail-policy-sign-title">\n                                    <strong>门市签约</strong>\n                                </div>\n                                <div class="detail-policy-sign-desc">\n                                    在门市进行签约付款。\n                                        推荐门市：<br>\n                                        <div class="J_retailName">\n                                            <a class="retail-name" href="javascript:;"><i class="icon detail-policy-sign-icon-location"></i>&nbsp;<span></span></a>\n                                        </div>\n                                        <a class="detail-policy-sign-view J_retailView" href="javascript:;" mm="点击_详情区_预订须知_查看全部门市">查看全部门市</a>\n                                </div>\n                            </div>\n                        </li>\n                        <% } %>\n                    </ul>\n                </div>\n            </div>\n\n            <div class="section-box-title">\n                <h3>付款方式</h3>\n            </div>\n\n            <div class="section-box-content">\n                <div class="item-with-title">\n                   <span class="dot">•</span>\n                   <div class="item-title"><strong>网上支付：</strong></div>\n                   <p>\n                       （1）网上银行：支持以下开通网上银行的储蓄卡及信用卡：中国工商银行、建设银行、中国银行、交通银行、中国农业银行、招商银行、中国光大银行、兴业银行、中国民生银行、中信银行、上海浦东发展银行、广东发展银行、南京银行、宁波银行、平安银行、北京银行、中国邮政储蓄银行<br>（2）信用卡：无需开通网上银行，支持大额支付，包括：中国工商银行、建设银行、中国银行、中国农业银行、招商银行、中国光大银行、兴业银行、中国民生银行、中信银行、上海浦东发展银行、广东发展银行、平安银行、上海银行<br>（3）第三方支付：第三方支付：支付宝、快钱、财付通、银联在线\n                   </p>\n               </div>\n               <div class="item-with-title">\n                   <span class="dot">•</span>\n                   <div class="item-title"><strong>门市支付：</strong></div>\n                   <p>\n                       门市现金付款、转账支票、刷卡。\n                   </p>\n               </div>\n               <div class="item-with-title">\n                   <span class="dot">•</span>\n                   <div class="item-title"><strong>对公汇款：</strong></div>\n                   <p>\n                       通过银行将相关款项汇至指定账户。\n                   </p>\n               </div>\n            </div>\n\n            <% var safeData = bookNotice.filter(function(item) {\n                    return item.type === 2;\n                })\n                if(safeData.length && !helper.empty(safeData[0].content)) { %>\n            <div class="section-box-title">\n                <h3>安全提示</h3>\n            </div>\n            <div class="section-box-content fold-box" data-role="fold-box">\n                <div class="fold-box-inner" data-role="fold-box-inner">\n                        <div class="item-with-title">\n                            <p>\n                                <%- safeData[0].content.join(\'<br>\') %>\n                            </p>\n                        </div>\n                </div>\n            </div>\n            <div class="section-box-content">\n                <div class="item-with-title">\n                    <span class="dot">•</span>\n                    <div class="item-title"><strong>安全须知、文明公约：</strong></div>\n                    <p>\n                        为普及旅游安全知识及旅游文明公约，使您的旅程顺利圆满完成，特拟定安全须知：\n                        <%- [\n                                {url: journey.safetyInstruction, name: \'安全须知\'},\n                                {url: journey.civilizationConvention, name: \'文明公约\'}\n                            ].filter(function(item) { return item.url; } )\n                            .map(function(item) { return \'<a href="\' + item.url + \'">《\' + item.name + \'》</a>\'})\n                            .join(\'、\')\n                        %>\n                        。\n                    </p>\n                </div>\n            </div>\n            <% } %>\n        <% } %>\n    </div>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.journeyOldTemplate = '<div class="section-box-title">\n    <h3>行程明细<span>* 以下行程仅供参考，最终行程可能会根据实际情况进行微调，敬请以签约行程为准。</span></h3>\n</div>\n\n<% if (!helper.empty(journey.journeySummary)) { %>\n    <div class="section-box-content">\n        <div class="detail-route-brief">\n            <h4>沿途景点：</h4>\n            <% journey.journeySummary.forEach(function(item, index) { %>\n                <p><strong>第<%= index + 1 %>天</strong><%= item.join(\'、\') %></p>\n            <% }) %>\n        </div>\n    </div>\n<% } %>\n\n<div class="section-box-content">\n\n    <div class="J_DetailJourney detail-journey">\n\n        <div class="detail-journey-dot"></div>\n\n        <% if (!helper.empty(journey.journeySummary)) { %>\n            <div class="J_JourneyNav detail-journey-nav">\n                <ul>\n                    <% journey.journeySummary.forEach(function(item, index) { %>\n                        <li <% if (index === 0) { %> class="active"<% } %> data-rel="#J_JourneyDay<%= index + 1%>">第<%= index + 1%>天</li>\n                    <% }) %>\n                </ul>\n            </div>\n        <% } %>\n\n        <% if (!helper.empty(journey.journeyDescJson)) { %>\n\n            <% journey.journeyDescJson.forEach(function(oneJourney, journeyIndex) { %>\n                <div id="J_JourneyDay<%= journeyIndex + 1 %>">\n                    <div class="detail-journey-head">\n                        <i class="icon detail-journey-day">D<%= journeyIndex + 1 %></i>\n                        <%- oneJourney.journeyDescription.replace(/{(\\w+)}/g, \'<i class="icon detail-journey-transport-$1"></i>\') %>\n                    </div>\n                    <div class="detail-journey-seprate-solid"></div>\n\n                    <div class="detail-journey-title">行程描述</div>\n                    <div class="detail-journey-desc"><%- helper.trimBoundBr(helper.nb2br(oneJourney.journeyInfor)) %></div>\n                    <div class="detail-journey-seprate"></div>\n\n                    <% (oneJourney.journeyPeriodsTimeList || []).forEach(function(period) { %>\n                        <% if (period.journeyTime) {%>\n                            <div class="detail-journey-title">\n                                <i class="icon detail-journey-label-time"></i>\n                                <% if (period.journeyTime && !helper.empty(helper.removeHtmlTag(period.journeyTime))) { %>\n                                    <i class="detail-journey-time"><%- period.journeyTime %></i>\n                                <% } %>\n                            </div>\n                        <% } %>\n\n                        <% (period.journeyTimeInfor || []).forEach(function(timeInfo) { %>\n\n                            <% if (timeInfo.elementType == \'TimeDesc\' ||\n                                timeInfo.elementType == \'SubtitleText\') { %>\n                                <div class="detail-journey-desc"><%- timeInfo.elementInfor %></div>\n                            <% } else if (timeInfo.elementType == \'Subtitle\') { %>\n                                <div class="detail-journey-title"><%- timeInfo.elementInfor %></div>\n                            <% } else if (timeInfo.elementType == \'photo\') { %>\n                                <div class="detail-journey-photos">\n                                    <% var photoLength = timeInfo.elementInfor.length; %>\n                                    <% photoLength = photoLength > 4 ? 4 : (photoLength == 3 ? 2 : photoLength) %>\n                                    <div class="detail-journey-photo detail-journey-photo-<%= photoLength %>">\n                                        <% timeInfo.elementInfor.forEach(function(photo, photoIndex) { %>\n                                            <% if (photoIndex < photoLength) { %>\n                                                <div class="detail-journey-photo-item">\n                                                    <div class="detail-journey-photo-item-inner">\n                                                        <img src="<%= cdn.cdnHost %>/static/img/2016/common/placeholder.png" data-src="<%= helper.resizeImage(photo.strBigPicUrl, 500, 280, 1) %>"\n                                                        alt="<%= photo.strPicDesc %>">\n                                                    </div>\n                                                </div>\n                                                <% if ((photoIndex + 1) % 2 === 0) { %>\n                                                    <div class="detail-feature-photo-sep"></div>\n                                                <% } %>\n                                            <% } %>\n                                        <% }) %>\n                                    </div>\n                                </div>\n                            <% } %>\n\n                        <% })%>\n\n                    <% }) %>\n\n                    <% if (Array.isArray(oneJourney.foodAndStays)) { %>\n                        <div class="detail-journey-seprate"></div>\n                        <% oneJourney.foodAndStays.forEach(function(oneItem) { %>\n                            <% if (oneItem) { %>\n                                <% if (oneItem.elementType == \'food\') { %>\n                                    <div class="detail-journey-title"><i class="icon detail-journey-label-dinner"></i>餐饮</div>\n                                    <div class="detail-journey-list">\n                                        <%- oneItem.elementInfor %>\n                                    </div>\n                                    <div class="detail-journey-seprate"></div>\n                                <% } else if (oneItem.elementType == \'hotel\') { %>\n                                    <div class="detail-journey-title"><i class="icon detail-journey-label-hotel"></i>住宿</div>\n                                    <div class="detail-journey-list">\n                                        <%- oneItem.elementInfor %>\n                                    </div>\n                                    <div class="detail-journey-seprate"></div>\n                                <% } %>\n                            <% } %>\n                        <% }) %>\n                    <% } %>\n\n\n\n                    <% if (oneJourney.shops && oneJourney.shops.length) { %>\n                        <div class="detail-journey-title"><i class="icon detail-journey-label-shopping"></i>购物点信息<span>*如因游客购物造成时间延长，延长时间不计入旅行社的客观安排停留时间</span></div>\n                        <div class="detail-journey-table">\n                            <table>\n                                <thead>\n                                    <tr>\n                                        <th class="col-1">名称</th>\n                                        <th class="col-2">营业产品</th>\n                                        <th class="col-3">停留时间</th>\n                                        <th class="col-4">说明</th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    <% oneJourney.shops.forEach(function(shop, shopIndex) { %>\n                                        <tr class="<%= shopIndex % 2 == 1 ? \'even\': \'\'%>">\n                                            <td><%- shop.shopName %></td>\n                                            <td><%- shop.mainBussinessProduct %></td>\n                                            <td><%= shop.waitTime %></td>\n                                            <td><%- shop.description %></td>\n                                        </tr>\n                                    <% }) %>\n                                </tbody>\n                            </table>\n                        </div>\n                    <% } %>\n\n                </div>\n            <% }) %>\n\n        <% } %>\n\n    </div>\n</div>\n\n<% if(journey.scheduleRemark) { %>\n    <div class="detail-note">\n        <div class="detail-note-head">行程附注<i class="icon"></i></div>\n        <div class="detail-note-body">\n            *请注意以下行程补充事项：\n        </div>\n        <div class="detail-note-body">\n            <%- journey.scheduleRemark %>\n        </div>\n    </div>\n<% } %>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.journey4Template = '\n<%\nvar trafficTypeMap = {\n    1: \'none\',\n    2: \'plane\',\n    3: \'boat\',\n    4: \'train\',\n    5: \'car\',\n    6: \'other\'\n}\n\nvar moduleTypeMap = {\n    1: \'scenic\',\n    2: \'hotel\',\n    3: \'traffic\',\n    4: \'food\',\n    5: \'shopping\',\n    6: \'activity\',\n    7: \'reminder\',\n    8: \'note\'\n}\n\nvar moduleIconMap = {\n    1: \'spot\',\n    2: \'hotel\',\n    3: \'transport\',\n    4: \'dinner\',\n    5: \'shopping\',\n    6: \'activity\',\n    7: \'note\',\n    8: \'note\'\n}\n\nvar moduleDurationMap = {\n    1: \'建议时间\',\n    2: \'建议时间\',\n    3: \'建议时间\',\n    4: \'建议时间\',\n    5: \'建议时间\',\n    6: \'建议时间\',\n    7: \'建议时间\',\n    8: \'建议时间\'\n}\n\nvar resourceList = [1, 2];\nvar journeyData = journey.journeyFourDetail || {};\n\nvar spotGroups = [];\n\nvar notDownloadMode = !(typeof printMode === \'boolean\' && printMode === true);\n\nif (journeyData.scheduleType == 1) {\n    (journeyData.detail || []).reduce(function(list, dayItem) {\n        (dayItem.data || []).reduce(function(list, moduleItem) {\n            if (moduleItem.moduleTypeValue == 1) {\n                (moduleItem.data || []).reduce(function(list, resource) {\n                    if (resource.latitude && resource.longitude) {\n                        list.push(resource);\n                    }\n                    return list;\n                }, list);\n            }\n            return list;\n        }, list)\n        return list;\n    }, spotGroups);\n}\n%>\n\n<% if (journeyData.scheduleType == 1 && notDownloadMode) { %>\n    <div class="detail-journey-tab">\n        <ul class="J_Journey4RouteTab">\n            <li class="active" data-rel=".J_DetailRouteDetail">行程明细<i class="icon"></i></li>\n            <li class="seprate"></li>\n            <li data-rel=".J_DetailRouteCalendar">日历模式<i class="icon"></i></li>\n        </ul>\n        <span>* 以下行程仅供参考，最终行程可能会根据实际情况进行微调，敬请以签约行程为准。</span>\n    </div>\n\n    <div class="J_DetailRouteCalendar section-box-content detail-journey-4-summary">\n        <div class="detail-journey-table">\n            <table>\n                <thead>\n                    <tr>\n                        <th class="col-1">时间</th>\n                        <th class="col-2">行程</th>\n                        <th class="col-3">游玩景点</th>\n                        <th class="col-4">住宿</th>\n                        <th class="col-5">用餐</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <% (journeyData.detail || []).forEach(function(dayItem, dayIndex) { %>\n                        <% var resources = {} %>\n                        <% (dayItem.data || []).forEach(function(resource, resourceIndex) {\n                            var moduleType = resource.moduleTypeValue;\n                            resources[moduleType] = resources[moduleType] || [];\n                            if (moduleType == 1 || moduleType == 2) {\n                                resources[moduleType] = resources[moduleType].concat(resource.data || []);\n                            } else if (moduleType == 4 || moduleType == 5 || moduleType == 6) {\n                                resources[moduleType].push(resource);\n                            }\n                        })%>\n                        <tr class="<%= dayIndex % 2 == 1 ? \'even\': \'\'%>">\n                            <td>第<%- dayItem.day %>天</td>\n                            <td>\n                                <% (dayItem.traffic || []).forEach(function(trafficItem) { %>\n                                    <%= trafficItem.from %>\n                                    <% if (trafficItem.to) { %>\n                                        - <%= trafficItem.to %>\n                                    <% } %>\n                                <% }) %>\n                            </td>\n                            <% [1, 2, 4].forEach(function(moduleType) { %>\n                                <td>\n                                    <% if (moduleType == 4) { %>\n                                        <%- helper.nb2br(((journeyData.overview || [])[dayIndex] || {})[\'food\']) %>\n                                    <% } else { %>\n                                        <%- (resources[moduleType] || []).map(function(item) {return item.title}).join(\'<br>\') %>\n                                    <% } %>\n                                </td>\n                            <% }) %>\n                        </tr>\n                    <% })%>\n                </tbody>\n            </table>\n        </div>\n    </div>\n<% } %>\n\n<div class="J_DetailRouteDetail section-box-content detail-journey-4-detail active">\n    <% if (journeyData.scheduleType == 1 && notDownloadMode) { %>\n        <div class="section-box-content detail-route4-brief-box<% if (true || !spotGroups.length || !notDownloadMode) { %> detail-route4-brief-nomap<% } %>">\n            <div class="J_DetailRouteBrief detail-route-brief">\n                <div class="J_DetailRouteBriefBox detail-route-brief-box">\n                    <div class="J_DetailRouteBriefInner detail-route-brief-inner">\n                        <h4>沿途景点：</h4>\n                        <% (journeyData.detail || []).forEach(function(dayItem, dayIndex) { %>\n                            <p><strong>第<%= dayItem.day %>天</strong>\n                                <%\n                                    var trafficDesc = (dayItem.traffic || []).reduce(function(sum, trafficItem) {\n                                            if (trafficItem.from) sum.push(trafficItem.from);\n                                            if (trafficItem.to) sum.push(trafficItem.to);\n                                            return sum;\n                                        }, []);\n                                %>\n                                <%= trafficDesc.join(\'、\') %>\n                            </p>\n                        <% }) %>\n                    </div>\n                </div>\n                <a class="J_DetailRouteBriefMore detail-route-brief-more" href="javascript:;">展开全部<i class="icon"></i></a>\n                <a class="J_DetailRouteBriefLess detail-route-brief-less" href="javascript:;">收起全部<i class="icon"></i></a>\n            </div>\n\n            <% if (false && spotGroups.length && notDownloadMode) { %>\n                <div class="detail-route-map">\n                    <div class="detail-route-map-head">\n                        <div class="detail-route-map-day">\n                            <div class="J_DetailJourneyMapPrev detail-route-map-day-prev"><i class="icon"></i></div>\n                            <div class="J_DetailJourneyMapNext detail-route-map-day-next"><i class="icon"></i></div>\n                            <div class="J_DetailJourneyMapDay detail-route-map-day-label">正在加载...</div>\n                        </div>\n                        <div class="J_DetailJourneyMapView detail-route-map-button">\n                            <i class="icon"></i>查看大图\n                        </div>\n                    </div>\n                    <div class="detail-route-map-body">\n                        <div class="J_DetailJourneyMapSmall detail-route-map-box loading"></div>\n                    </div>\n                </div>\n            <% } %>\n        </div>\n    <% } %>\n\n    <div class="J_DetailJourney detail-journey detail-journey-4">\n\n        <div class="detail-journey-dot"></div>\n\n        <% if (notDownloadMode) { %>\n            <div class="J_JourneyNav detail-journey-4-nav">\n                <div class="detail-journey-4-nav-box">\n                    <div class="detail-journey-4-nav-inner">\n                        <ul class="detail-journey-4-nav-list">\n                            <% //1:time  2:resource %>\n                            <% if (journeyData.scheduleType == 1) { %>\n                                <% (journeyData.detail || []).forEach(function(dayItem, dayIndex) { %>\n                                    <li class="detail-journey-4-nav-group" data-rel=".J_JourneyItem<%= dayItem.cid %>">\n                                        <div class="detail-journey-4-nav-group-label"><span>第<%= dayItem.day %>天</span><i class="icon"></i></div>\n                                        <ul class="detail-journey-4-nav-sub">\n                                            <% (dayItem.data || []).forEach(function(resource) { %>\n                                                <% if (~resourceList.indexOf(resource.moduleTypeValue)) { %>\n                                                    <% if (resource.data && resource.data.length) { %>\n                                                        <% resource.data.forEach(function(item) { %>\n                                                            <li class="detail-journey-4-nav-sub-item" data-sub-rel=".J_JourneyItem<%= item.cid %>"><span><%= item.title %></span><i class="icon"></i></li>\n                                                        <% })%>\n                                                    <% } %>\n                                                <% } %>\n                                            <% }) %>\n                                        </ul>\n                                    </li>\n                                <% }) %>\n                            <% } else if (journeyData.scheduleType == 2 && journeyData.detail && journeyData.detail.length) { %>\n                                <% ((journeyData.detail[0] || {}).data || []).forEach(function(resource) { %>\n                                    <% if (~resourceList.indexOf(resource.moduleTypeValue)) { %>\n                                        <% if (resource.data && resource.data.length) { %>\n                                            <% resource.data.forEach(function(item) { %>\n                                                <li class="detail-journey-4-nav-group" data-rel=".J_JourneyItem<%= item.cid %>">\n                                                    <div class="detail-journey-4-nav-group-label"><span><%= item.title %></span><i class="icon"></i></div>\n                                                </li>\n                                            <% })%>\n                                        <% } %>\n                                    <% } %>\n                                <% }) %>\n                            <% } %>\n                        </ul>\n\n                        <% if (typeof downloadUrl !== \'undefined\') { %>\n                            <a class="J_SideDownload side-download" href="<%= downloadUrl %>" target="_blank" m="点击_详情区_线路介绍_下载行程"><i></i>下载</a>\n                        <% } %>\n                        <% if (typeof printUrl !== \'undefined\') { %>\n                            <a class="J_SidePrint side-print" href="<%= printUrl %>" target="_blank" m="点击_详情区_线路介绍_打印行程"><i></i>打印</a>\n                        <% } %>\n                    </div>\n                </div>\n            </div>\n        <% } %>\n\n\n        <% if (journeyData.scheduleType == 1) { %>\n            <% (journeyData.detail || []).forEach(function(dayItem, dayIndex) { %>\n                <div class="J_JourneyItem<%= dayItem.cid %>">\n                    <div class="detail-journey-head">\n                        <i class="icon detail-journey-day">D<%= dayItem.day %></i>\n                        <strong>第<%= dayItem.day %>天</strong>\n\n                        <% (dayItem.traffic || []).forEach(function(trafficItem) { %>\n                            <strong><%= trafficItem.from %></strong>\n                            <% if (trafficItem.to) { %>\n                                <% if (trafficItem.meanValue == 6) { %>\n                                    -\n                                <% } else { %>\n                                    <i class="icon detail-journey-transport-<%= trafficTypeMap[trafficItem.meanValue] %>"></i>\n                                <% } %>\n                                <strong><%= trafficItem.to %></strong>\n                            <% } %>\n                        <% }) %>\n                    </div>\n                    <div class="detail-journey-seprate-solid"></div>\n\n                    <%- include(\'journey4Resource\', {\n                        journeyData: dayItem || {},\n                        trafficTypeMap: trafficTypeMap,\n                        moduleTypeMap: moduleTypeMap,\n                        resourceList: resourceList,\n                        moduleIconMap: moduleIconMap,\n                        moduleDurationMap: moduleDurationMap,\n                        scheduleType: journeyData.scheduleType,\n                        noImage: typeof noImage == \'undefined\' ? false : noImage\n                    }) %>\n\n                </div>\n            <% }) %>\n        <% } else { %>\n            <%- include(\'journey4Resource\', {\n                journeyData: (journeyData.detail || [])[0] || {},\n                trafficTypeMap: trafficTypeMap,\n                moduleTypeMap: moduleTypeMap,\n                resourceList: resourceList,\n                moduleIconMap: moduleIconMap,\n                moduleDurationMap: moduleDurationMap,\n                scheduleType: journeyData.scheduleType,\n                noImage: typeof noImage == \'undefined\' ? false : noImage\n            }) %>\n        <% } %>\n    </div>\n</div>\n\n<%\nvar notes = (journeyData.detail || []).reduce(function(allNotes, dayItem) {\n    var dayNotes = (dayItem.data || []).reduce(function(sum, moduleItem) {\n        if (moduleItem.moduleTypeValue == 8) {\n            sum.push(moduleItem);\n        }\n        return sum;\n    }, []);\n\n    return allNotes.concat(dayNotes);\n}, []);\n%>\n\n<%  var noteArr = [];\n    if (notes.length) {\n        noteArr = notes.map(function(note) {\n            return helper.nb2br(note.content);\n        });\n    }\n    %>\n<% if (noteArr.join(\'\')) { %>\n    <div class="detail-note">\n        <div class="detail-note-head">行程附注<i class="icon"></i></div>\n        <div class="detail-note-body">\n            <%- noteArr.join(\'<br>\') %>\n        </div>\n    </div>\n<% } %>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.journey4PhotoTemplate = '\n\n<%\n\nvar photoLength = Array.isArray(pictures) ? pictures.length : 0,\n    photoStep = 3;\n\nif (photoLength % 3 === 0) {\n    photoStep = 3;\n} else if (photoLength % 2 === 0) {\n    photoStep = 2;\n} else if (photoLength === 1) {\n    photoStep = 2;\n}\n\n%>\n\n<% if(photoLength) { %>\n    <div class="detail-journey-photos">\n        <div class="detail-journey-photo detail-journey-photo-<%= photoStep %>">\n            <% pictures.forEach(function(photo, photoIndex) { %>\n                <% if(photoIndex < photoLength) { %>\n                    <div\n                        <% if (hasDetail) { %>\n                            class="J_ViewDetail detail-journey-photo-item detail-journey-photo-item-clickable"\n                            data-id="<%= cid %>"\n                        <% } else { %>\n                            class="detail-journey-photo-item"\n                        <% } %>\n                    >\n                        <div class="detail-journey-photo-item-inner">\n                            <img src="<%= cdn.cdnHost %>/static/img/2016/common/placeholder-4x3.png"\n                                data-src="<%= helper.resizeImage(photo.url, 640, 480, 1) %>"\n                                alt="<%= photo.pic_title %>">\n                            <% if (photo.title) { %>\n                                <div class="detail-journey-photo-item-mask"></div>\n                                <div class="detail-journey-photo-item-title"><%= photo.title %></div>\n                            <% } %>\n                        </div>\n                    </div>\n                    <% if ((photoIndex + 1) % photoStep === 0) { %>\n                        <div class="detail-feature-photo-sep"></div>\n                    <% } %>\n                <% } %>\n            <% }) %>\n        </div>\n    </div>\n<% } %>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.journey4ResourceTemplate = '\n<%\nvar resourceLength = (journeyData.data || []).length;\n\nvar hotelLevelMap = {\n    1: \'一星级\',\n    2: \'二星级\',\n    3: \'三星级\',\n    4: \'四星级\',\n    5: \'五星级\'\n};\n\nvar mealTypeMap = {\n    breakfast: \'早餐\',\n    lunch: \'午餐\',\n    dinner: \'晚餐\',\n    allDay: \'全天用餐\'\n}\n\n\nfunction isSpotAvailable(spot) {\n    if (spot &&\n        spot.poiId &&\n        spot.latitude &&\n        spot.longitude &&\n        spot.picture &&\n        spot.picture.length) {\n        return true;\n    } else {\n        return false;\n    }\n}\n\nfunction isEmpty(value) {\n    function _isEmpty(value) {\n        switch (typeof value) {\n            case \'string\':\n                return !value;\n            case \'number\':\n                return !value;\n            case \'bollean\':\n                return value;\n            default:\n                if(Array.isArray(value)) {\n                    return value.every(_isEmpty);\n                } else {\n                    return !Object.keys(value || {}).length;\n                }\n        }\n    }\n    return _isEmpty(value);\n}\n\nfunction isFoodEmpty(resData) {\n    return isEmpty((resData || {}).hasInfoList);\n}\n\nfunction isResourceEmpty(resData) {\n    var emptyFlag = false;\n    switch (parseInt((resData || {}).moduleTypeValue, 10)) {\n        case 4:\n            emptyFlag = isFoodEmpty(resData)\n            break;\n        case 8:\n            emptyFlag = true;\n            break;\n    }\n\n    return emptyFlag;\n}\n\n%>\n\n<% (journeyData.data || []).forEach(function(resource, resourceIndex) { %>\n    <% var resourceType = resource.moduleTypeValue %>\n    <% if (isResourceEmpty(resource)) { return; }%>\n    <div class="J_JourneyItem<%= resource.cid %>">\n        <% var subResourceLength = (resource.data || []).length %>\n        <div class="detail-journey-title">\n\n            <i class="icon detail-journey-label-<%= moduleIconMap[resourceType] %>"></i>\n\n            <% if (resourceType == 4) { %>\n                <% if (resource.moment) { %>\n                    <i class="detail-journey-time"><%= resource.moment %></i>\n                <% } %>\n            <% } else if ((resource.moment || resource.period) && String(resource.moment || resource.period) != \'00:00\') { %>\n                <i class="detail-journey-time"><%= resource.moment || resource.period %></i>\n            <% } %>\n\n            <% if (resourceType == 1) {%>\n                景点 · <%- (resource.data || []).map(function(scenic) {\n                    return isSpotAvailable(scenic) ? \'<a class="J_ViewDetail" data-id="\' + scenic.cid + \'" href="javascript:;">\' + scenic.title + \'</a>\' : scenic.title\n                }).join(\' - \')%>\n                <% if(resource.data && resource.data.length == 1) {%>\n                    <% if(resource.data[0].labels && resource.data[0].labels.length) { %>\n                        <%  resource.data[0].labels.forEach(function (item) { %>\n                            <span class="label"><%= item %></span>       \n                        <% })%>\n                    <% } %>     \n                <% } %>\n            <% } else if (resourceType == 2) { %>\n                住宿 · <%- (resource.data || []).map(function(hotel) {\n                    var title = hotel.title;\n                    if (hotel.starName) {\n                        title += \'<span class="detail-journey-star">\' + (hotelLevelMap[hotel.starName] || hotel.starName)  + \'</span>\'\n                    }\n                    return title;\n                }).join(resource.relative == 1 ? \'<span class="detail-journey-relative">和</span>\' : \'<span class="detail-journey-relative">或</span>\')%>\n            <% } else if (resourceType == 3) { %>\n                <% // traffic %>\n                <% if (resource.from) { %>\n                    <strong><%= resource.from %></strong>\n                <% } %>\n                <% if (resource.to) { %>\n                    <% if (resource.meanValue == 6) { %>\n                        -\n                    <% } else { %>\n                        <i class="icon detail-journey-transport-<%= trafficTypeMap[resource.meanValue] %>"></i>\n                    <% } %>\n                    <strong><%= resource.to %></strong>\n                <% } %>\n            <% } else if (resourceType == 4) { %>\n                <% // food %>\n                <%- (resource.hasInfoList).map(function(dinner) {\n                    return mealTypeMap[dinner.type] + \'：\' + (dinner.has == 0 ? \'敬请自理\' : \'已含\')\n                }).join(\'<i class="meal-sep">；</i>\') %>\n            <% } else if (resourceType == 5) { %>\n                <% // shopping %>\n                购物店信息<span><%= resource.reminder %></span>\n            <% } else if (resourceType == 6) { %>\n                <% // activity %>\n                自由活动\n            <% } else if (resourceType == 7) {%>\n                <% // reminder %>\n                <%= resource.type || \'温馨提醒\' %>\n            <% } else if (resourceType == 8) {%>\n                <% // note %>\n            <% } else { %>\n                <%= resource.title %>\n            <% } %>\n\n        </div>\n\n        <% if (resourceType == 6 && resource.title) { %>\n            <div class="detail-journey-title-sub">\n                <%= resource.title %>\n            </div>\n        <% } %>\n\n        <% if (resource.times) { %>\n            <div class="detail-journey-duration"><%= moduleDurationMap[resourceType] %>：<%= resource.times %></div>\n        <% } %>\n\n        <% if (resourceType == 4 && resource.title) { %>\n            <div class="detail-journey-title-sub">\n                <%= resource.title %>\n            </div>\n        <% } %>\n\n        <% if (resource.content) { %>\n            <div class="detail-journey-desc"><%- helper.nb2br(resource.content) %></div>\n        <% } %>\n\n        <% if (resource.poiDescription) { %>\n            <div class="detail-journey-desc"><%- helper.nb2br(resource.poiDescription) %></div>\n        <% } %>\n\n        <% if (resourceType == 5 && resource.data && resource.data.length) { %>\n            <div class="detail-journey-desc detail-journey-shopping-list">\n                <table>\n                    <thead>\n                        <tr>\n                            <th class="col-1">名称</th>\n                            <th class="col-2">营业产品</th>\n                            <th class="col-3">停留时间</th>\n                            <th class="col-4">说明</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <% resource.data.forEach(function(item) { %>\n                            <tr>\n                                <td class="col-1"><%= item.title %></td>\n                                <td class="col-2"><%= item.product %></td>\n                                <td class="col-3"><%= item.times %></td>\n                                <td class="col-4"><%= item.instruction %></td>\n                            </tr>\n                        <% }) %>\n                    </tbody>\n                </table>\n            </div>\n        <% } %>\n\n        <%- include(\'journey4Photo\', {\n            pictures: resource.picture,\n            hasDetail: false,\n            cid: \'\'\n        }) %>\n\n        <% if (resourceType == 1 && resource.data && resource.data.length) { %>\n            <% resource.data.forEach(function(item) { %>\n                <div class="J_JourneyItem<%= item.cid %>">\n                    <% if (subResourceLength > 1) { %>\n                        <div class="detail-journey-title-sub">\n                            景点 ·\n                            <% if (isSpotAvailable(item)) { %>\n                                <a class="J_ViewDetail" href="javascript:;" data-id="<%= item.cid %>"><%= item.title %></a>\n                            <% } else { %>\n                                <%= item.title %>\n                            <% } %>\n                            <% if (item.labels && item.labels.length) { %>\n                                <% item.labels.forEach(function (msg) { %>\n                                    <span class="label"><%= msg %></span>    \n                                <% })%>\n                            <% } %>\n                        </div>\n                    <% } %>\n\n                    <% if (scheduleType != 1) { %>\n                        <ul class="detail-journey-list">\n                            <% if (item.times) { %>\n                                <li><i class="icon detail-journey-icon-smile"></i>建议时间：<%= item.times %></li>\n                            <% } %>\n                            <% if (item.opened) { %>\n                                <li><i class="icon detail-journey-icon-clock"></i>开放时间：<%= item.opened %></li>\n                            <% } %>\n                            <% if (item.address) { %>\n                                <li class="single"><i class="icon detail-journey-icon-marker"></i>景点地址：<%= item.address %></li>\n                            <% } %>\n                        </ul>\n                    <% } else { %>\n                        <ul class="detail-journey-list">\n                            <% if (item.times) { %>\n                                <li><i class="icon detail-journey-icon-clock"></i>游玩时长：约<%= item.times %></li>\n                            <% } %>\n                        </ul>\n                    <% } %>\n\n\n                    <% if (item.content) { %>\n                        <div class="detail-journey-desc"><%- helper.nb2br(item.content) %></div>\n                    <% } %>\n\n                    <%- include(\'journey4Photo\', {\n                        pictures: item.picture,\n                        hasDetail: isSpotAvailable(item),\n                        cid: item.cid\n                    }) %>\n                </div>\n            <% })%>\n        <% } %>\n\n\n        <% if (resourceType == 2 && resource.data && resource.data.length) { %>\n            <% var hotelAmount = resource.data.length; %>\n            <% resource.data.filter(function(item){\n                var rooms = false;\n                if (item && Array.isArray(item.room) && item.room.length) {\n                    rooms = item.room.filter(function(room) {\n                        return room && (room.title || room.description || room.picture && room.picture.length)\n                    });\n                }\n                return rooms && rooms.length >= 1;\n            }).forEach(function(item) { %>\n                <div class="J_JourneyItem<%= item.cid %>">\n\n                    <div class="detail-journey-title-sub">\n                        <% if (hotelAmount > 1) { %>\n                            房型介绍 · <%= item.title %>\n                        <% } else { %>\n                            房型介绍\n                        <% } %>\n                    </div>\n\n                    <% item.room.forEach(function(room) { %>\n                        <% if (room.title) { %>\n                            <div class="detail-journey-title-3"><%= room.title %></div>\n                        <% } %>\n\n                        <% if (room.description) { %>\n                            <div class="detail-journey-desc"><%- room.description %></div>\n                        <% } %>\n\n                        <%- include(\'journey4Photo\', {\n                            pictures: room.picture,\n                            hasDetail: false,\n                            cid: \'\'\n                        }) %>\n\n                    <% })%>\n\n                </div>\n            <% })%>\n        <% } %>\n\n\n        <% if (resource.remark) { %>\n            <div class="detail-journey-desc">备注：<%- helper.nb2br(resource.remark) %></div>\n        <% } %>\n\n        <% if (resourceIndex < resourceLength - 1) { %>\n            <div class="detail-journey-seprate"></div>\n        <% } %>\n    </div>\n<% }) %>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.detailVisaTemplate = '\n<% var materialTypeMap = {0: \'原件\',1: \'复印件\',2: \'扫描件\',3: \'电子件\'} %>\n<% var deadline %>\n<div class="section-box detail-visa">\n    <div class="section-box-head">\n        <h2>签证信息</h2>\n    </div>\n    <div class="section-box-body">\n\n        <% for (var i = 0; i < data.length; i++) { %>\n            <div class="J_DetailVisaBlock">\n                <% var visa = data[i]; %>\n                <% var visaInfo = visa.visaInfo; %>\n                <% var deadlines = (visa.deadline || {})[journeyId]; %>\n                <div class="section-box-title">\n                    <h3><%= visaInfo.name %></h3>\n                </div>\n\n                <div class="section-box-content">\n                    <div class="detail-visa-info">\n\n                        <% if (visaInfo.visaCityName) { %>\n                            <div class="detail-visa-info-item">\n                                所属领区：<strong><%= visaInfo.visaCityName %></strong>\n                            </div>\n                        <% } %>\n                        <% if (visaInfo.enterCountryTimes) { %>\n                            <div class="detail-visa-info-item">\n                                入境次数：<strong><%= visaInfo.enterCountryTimes %></strong>\n                            </div>\n                        <% } %>\n                        <% if (visaInfo.longestResidenceTime) { %>\n                            <div class="detail-visa-info-item">\n                                停留天数：<strong><%= visaInfo.longestResidenceTime %></strong>\n                            </div>\n                        <% } %>\n                        <% if (visaInfo.handleTimeDuration) { %>\n                            <div class="detail-visa-info-item">\n                                办理时长：<strong><% if (visaInfo.handleTimeDuration == 0) { %>以实际情况为准<% } else { %>材料齐全后预计<%= visaInfo.handleTimeDuration %>个工作日<% } %></strong>\n                            </div>\n                        <% } %>\n                        <% if (deadlines && deadlines.length && (deadline = deadlines[0])) { %>\n                            <div class="detail-visa-info-item single-row">\n                                材料收取截止时间：<strong>出发<%= deadline.visaEndDay ? \'前\' + deadline.visaEndDay : \'当\'%>天的<%= deadline.visaEndOclock %>点</strong>\n                                <% if (deadlines.length > 1) { %>\n                                    <a class="J_DetailVisaDeadline detail-visa-time-more" href="javascript:;" mm="点击_详情区_签证信息_查看全部截止时间">查看全部截止时间<i class="icon"></i></a>\n                                    <div class="detail-visa-deadline">\n                                        <i class="detail-visa-deadline-arrow"></i>\n                                        <div class="detail-visa-deadline-inner">\n                                            <div class="detail-visa-deadline-left">\n                                                <div class="thead">\n                                                    <table>\n                                                        <thead>\n                                                            <tr>\n                                                                <th class="col-1">出发团期</th>\n                                                                <th class="col-2">收取材料截止时间</th>\n                                                            </tr>\n                                                        </thead>\n                                                    </table>\n                                                </div>\n                                                <div class="tbody">\n                                                    <table>\n                                                        <tbody>\n                                                            <% for (var index = 0; index < deadlines.length; index++) { %>\n                                                                <% if (index % 2 === 0) { %>\n                                                                    <% deadline = deadlines[index] %>\n                                                                    <tr class="<%= index % 4 !== 0 ? \'even\' : \'\'%>">\n                                                                        <td class="col-1"><%= deadline.departsDate %></td>\n                                                                        <td class="col-2"><%= deadline.visaEndTime%>&nbsp;&nbsp;<%= deadline.visaEndOclock %>点之前</td>\n                                                                    </tr>\n                                                                <% } %>\n                                                            <% } %>\n                                                        </tbody>\n                                                    </table>\n                                                </div>\n                                            </div>\n                                            <div class="detail-visa-deadline-right">\n                                                <div class="thead">\n                                                    <table>\n                                                        <thead>\n                                                            <tr>\n                                                                <th class="col-1">出发团期</th>\n                                                                <th class="col-2">收取材料截止时间</th>\n                                                            </tr>\n                                                        </thead>\n                                                    </table>\n                                                </div>\n                                                <div class="tbody">\n                                                    <table>\n                                                        <tbody>\n                                                        <% for (var index = 0; index < deadlines.length; index++) { %>\n                                                            <% if (index % 2 === 1) { %>\n                                                                <% deadline = deadlines[index] %>\n                                                                <tr class="<%= (index - 1) % 4 !== 0 ? \'even\' : \'\'%>">\n                                                                    <td class="col-1"><%= deadline.departsDate %></td>\n                                                                    <td class="col-2"><%= deadline.visaEndTime%>&nbsp;&nbsp;<%= deadline.visaEndOclock %>点之前</td>\n                                                                </tr>\n                                                            <% } %>\n                                                        <% } %>\n                                                        </tbody>\n                                                    </table>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                <% } %>\n                            </div>\n                        <% } %>\n                        <% if (visaInfo.acceptanceScope) { %>\n                            <div class="detail-visa-info-item single-row">\n                                受理范围：<strong><%= visaInfo.acceptanceScope %></strong>\n                            </div>\n                        <% } %>\n                    </div>\n                </div>\n\n                <div class="J_VisaTab section-box-toolbar">\n                    <ul class="section-box-tab">\n                        <% for (var h = 0; h < visaInfo.customerPropertyNames.length; h++) { %>\n                            <li<% if (h === 0) { %> class="active"<% } %> data-rel=".J_DetailVisa<%= visaInfo.customerPropertyNames[h].code %>">\n                                <a href="javascript:;"><%= visaInfo.customerPropertyNames[h].name %></a>\n                            </li>\n                        <% } %>\n                    </ul>\n\n                    <div class="detail-visa-button">\n                        <a class="J_DetailVisaSend detail-visa-button-mail" data-id="<%= visaInfo.id %>" data-name="<%= visaInfo.name %>" href="javascript:;" mm="点击_详情区_签证信息_发送材料"><i class="icon"></i>发送到我的邮箱</a>\n                        <a class="J_DetailVisaPrint detail-visa-button-print" data-id="<%= visaInfo.id %>" data-name="<%= visaInfo.name %>" href="javascript:;" mm="点击_详情区_签证信息_打印材料"><i class="icon"></i>打印材料</a>\n                    </div>\n                </div>\n\n                <div class="section-box-content detail-visa-material">\n                    <% var visaMaterial = visa.visaMaterial %>\n                    <% for (var h = 0; h < visaInfo.customerPropertyNames.length; h++) { %>\n                        <% var personType = visaInfo.customerPropertyNames[h].code %>\n\n                        <div class="J_DetailVisa<%= personType %> detail-visa-block<%= h == 0 ? \' active\' : \'\' %>">\n                            <div class="detail-visa-material-head">\n                                <table>\n                                    <thead>\n                                        <tr>\n                                            <th class="col-1">所需材料</th>\n                                            <th class="col-2">材料类型</th>\n                                            <th class="col-3">描述</th>\n                                        </tr>\n                                    </thead>\n                                </table>\n                            </div>\n                            <div class="detail-visa-material-body">\n                                <table>\n                                    <tbody>\n                                    <% for (var materialIndex = 0; materialIndex < visaMaterial.length; materialIndex++) { %>\n                                        <% var material = visaMaterial[materialIndex] %>\n                                        <% if (material.personnenlType == personType) { %>\n                                            <tr>\n                                                <td class="col-1"><%= material.customName %></td>\n                                                <td class="col-2"><%= materialTypeMap[material.materialType] %></td>\n                                                <td class="col-3">\n                                                    <%=# material.materialDesc %>\n                                                    <% if (material.attachments && material.attachments.length) { %>\n                                                        <% for (var attachmentIndex = 0; attachmentIndex < material.attachments.length; attachmentIndex++) { %>\n                                                            <div class="detail-visa-material-attachment">\n                                                                <a href="<%= material.attachments[attachmentIndex].attachmentPath %>" mm="点击_详情区_签证信息_查看材料模板"><%= material.attachments[attachmentIndex].attachmentName %></a>\n                                                            </div>\n                                                        <% } %>\n                                                    <% } %>\n                                                </td>\n                                            </tr>\n                                        <% } %>\n                                    <% } %>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    <% } %>\n                </div>\n\n            </div>\n        <% } %>\n\n\n        <div class="section-box-title">\n            <h3>签证须知</h3>\n        </div>\n\n        <div class="section-box-content">\n            <div class="item-with-title">\n                <span class="dot">•</span>\n                <div class="item-title"><strong>注意事项：</strong></div>\n                <p>\n                    当您在线提交订单成功后，可在会员中心提交材料扫描件。<br>\n                    请确保护照有效期：本次旅游归国至少还有6个月以上有效期，且尚有签证所需空白签证页。\n                </p>\n            </div>\n            <% for (var i = 0; i < data.length; i++) { %>\n                <% var visa = data[i]; %>\n                <% var visaInfo = visa.visaInfo; %>\n                <% if (visaInfo.bookNotice) { %>\n                    <div class="item-with-title">\n                        <span class="dot">•</span>\n                        <div class="item-title"><strong><%= visaInfo.customName %>办理须知：</strong></div>\n                        <p><%=# (visaInfo.bookNotice || \'\').replace(/[\\n\\r]+/g, \'<br>\') %></p>\n                    </div>\n                <% } %>\n            <% } %>\n        </div>\n\n\n        <div class="section-box-title">\n            <h3>材料递交方式</h3>\n        </div>\n\n        <div class="section-box-content">\n\n            <div class="item-with-title">\n                <span class="dot">•</span>\n                <div class="item-title"><strong>快递材料至途牛门市，具体门市请在下单时选择</strong></div>\n            </div>\n            <div class="J_retailName retail-name item-with-title">\n                <span class="dot">•</span>\n                <div class="item-title"><strong>亲自到途牛门市当面递交材料</strong></div>\n                <p>为您推荐门市：\n                    <a href="javascript:;"><i class="icon detail-visa-retail-location"></i>&nbsp;<span class="J_retailTxt"></span></a>\n                    <a class="detail-visa-retail-view J_retailView" href="javascript:;" mm="点击_详情区_签证信息_查看送签门市">查看全部门市</a>\n                </p>\n            </div>\n        </div>\n\n    </div>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.detailVisaDialogTemplate = '\n<div class="dialog dialog-visa">\n    <div class="J_VisaClose dialog-close"></div>\n    <% if (dialogType == \'send\') { %>\n        <div class="dialog-head">将材料发送到您的邮箱</div>\n    <% } else { %>\n        <div class="dialog-head">打印签证材料</div>\n    <% } %>\n    <div class="dialog-body">\n        <div class="dialog-row">请选择身份类型</div>\n        <div class="dialog-row">\n            <div class="J_VisaPersonType dialog-checkbox" data-id="2" data-name="在职人员"><i class="icon"></i>在职人员</div>\n            <div class="J_VisaPersonType dialog-checkbox" data-id="3" data-name="退休人员"><i class="icon"></i>退休人员</div>\n            <div class="J_VisaPersonType dialog-checkbox" data-id="4" data-name="自由职业者"><i class="icon"></i>自由职业者</div>\n            <div class="J_VisaPersonType dialog-checkbox" data-id="5" data-name="学龄前儿童"><i class="icon"></i>学龄前儿童</div>\n            <div class="J_VisaPersonType dialog-checkbox" data-id="6" data-name="在校学生"><i class="icon"></i>在校学生</div>\n            <div class="J_VisaPersonType dialog-checkbox" data-id="7" data-name="无业人员"><i class="icon"></i>无业人员</div>\n        </div>\n        <% if (dialogType === \'send\') { %>\n            <div class="dialog-row dialog-row-input">\n                <div class="dialog-input">\n                    <div class="dialog-label">请输入您常用的邮箱：</div>\n                    <div class="dialog-input-ctrl">\n                        <input class="J_VisaEmail" type="text" name="email">\n                    </div>\n                </div>\n            </div>\n        <% } %>\n        <div class="J_DialogError dialog-row dialog-error-tip">\n            <i class="icon"></i>&nbsp;<strong></strong>\n        </div>\n        <div class="dialog-row dialog-buttons">\n            <a class="J_VisaCancel dialog-button dialog-cancel" href="javascript:;">取消</a>\n            <% if (dialogType == \'send\') { %>\n                <a class="J_VisaSend dialog-button dialog-send" href="javascript:;">发送</a>\n            <% } else { %>\n                <a class="J_VisaSend dialog-button dialog-send" href="javascript:;">打印</a>\n            <% } %>\n        </div>\n        \n    </div>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.detailGuideTemplate = '\n<div class="section-box detail-guide">\n    <div class="section-box-head">\n        <h2>线路导游</h2>\n    </div>\n    <div class="section-box-body">\n\n        <div class="J_GuideGallery guide-wrap">\n            <div class="guide-button guide-prev" data-role="prev" mm="点击_详情区_线路导游_切换查看导游"><i class="icon"></i></div>\n            <div class="guide-button guide-next" data-role="next" mm="点击_详情区_线路导游_切换查看导游"><i class="icon"></i></div>\n            <div class="guide-box">\n                <ul class="guide-list" data-role="list">\n                    <% for(var guideIndex = 0; guideIndex < data.tourGuides.length; guideIndex++) { %>\n                        <% var guide = data.tourGuides[guideIndex] %>\n                        <li class="guide-item" data-role="item">\n                            <div class="guide-inner">\n                                <% if (guide.level == 1) { %>\n                                    <div class="guide-medal"></div>\n                                <% } %>\n\n                                <div class="guide-photo">\n                                    <% if (guide.guidesHomeUrl) { %>\n                                        <a href="<%= guide.guidesHomeUrl %>" target="_blank">\n                                            <img src="<%= guide.guideImage %>" alt="<%= guide.guideName %>">\n                                        </a>\n                                    <% } else { %>\n                                        <img src="<%= guide.guideImage %>" alt="<%= guide.guideName %>">\n                                    <% } %>\n                                </div>\n\n                                <div class="guide-info">\n                                    <div class="guide-name">\n                                        <%= guide.guideName %>\n                                        <% if (guide.guideSex == 1) { %>\n                                            <i class="icon icon-gender-male"></i>\n                                        <% } else { %>\n                                            <i class="icon icon-gender-female"></i>\n                                        <% } %>\n                                    </div>\n\n                                    <div class="guide-profile">\n                                        <% if (guide.guideSatisfaction) { %>\n                                            <span>满意度 <strong><%= guide.guideSatisfaction %>%</strong></span>\n                                        <% } else { %>\n                                            <span>满意度 <em>暂无</em></span>\n                                        <% } %>\n                                        <span class="guide-sep"></span>\n                                        <span>带团年限 <strong><%= guide.workingTime %></strong></span>\n                                    </div>\n\n                                    <% if (guide.languages) { %>\n                                        <div class="guide-desc guide-language">\n                                            <div class="guide-label">擅长语言：</div>\n                                            <div class="guide-content" title="<%= guide.languages %>"><%= guide.languages %></div>\n                                        </div>\n                                    <% } %>\n\n                                    <% if (guide.departDate) { %>\n                                        <div class="guide-desc guide-depart-date">\n                                            <div class="guide-label">分配团期：</div>\n                                            <div class="J_guideTip guide-content"><%= guide.departDate %></div>\n                                            <script class="J_guideTipContent" type="text/template">\n                                                <div class="guide-detail guide-depart-date-detail">\n                                                    <%= guide.departDate %>\n                                                </div>\n                                            <\/script>\n                                        </div>\n                                    <% } %>\n\n                                    <% if (guide.honors) { %>\n                                        <div class="guide-desc guide-award">\n                                            <div class="guide-label">荣誉成就：</div>\n                                            <div class="J_guideTip guide-content"><%= guide.honors %></div>\n                                            <script class="J_guideTipContent" type="text/template">\n                                                <div class="guide-detail guide-award-detail">\n                                                    <%= guide.honors %>\n                                                </div>\n                                            <\/script>\n                                        </div>\n                                    <% } %>\n\n                                </div>\n\n                                <% if (guide.guidesHomeUrl) { %>\n                                    <a class="guide-home" href="<%= guide.guidesHomeUrl %>" target="_blank">查看详情</a>\n                                <% } %>\n\n                            </div>\n\n                        </li>\n                    <% } %>\n                </ul>\n            </div>\n        </div>\n\n        <% if (tip) { %>\n            <div class="section-box-content">\n                <div class="guide-tip"><%= tip %></div>\n                <% if(guideEntranceUrl) { %>\n                    <a class="guide-channel" href="<%= guideEntranceUrl%>" target="_blank">更多途牛导游 ></a>\n                <% } %>\n            </div>\n        <% } %>\n\n    </div>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.detailUpgradeTemplate = '\n<% var upgrades = data %>\n<div class="section-box detail-upgrade">\n    <div class="section-box-head">\n        <h2>产品升级</h2>\n    </div>\n    <div class="section-box-body">\n        <div class="detail-upgrade-title">下单时选择您需要的升级方案：</div>\n        <div class="section-box-content detail-upgrade-list">\n            <table>\n                <thead>\n                    <tr>\n                        <th class="detail-upgrade-col-1">方案</th>\n                        <th class="detail-upgrade-col-2">项目</th>\n                        <th class="detail-upgrade-col-3">说明</th>\n                        <th class="detail-upgrade-col-4">价格</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <% for (var upgradeIndex = 0; upgradeIndex < upgrades.length; upgradeIndex++) { %>\n                        <% var upgrade = upgrades[upgradeIndex] %>\n                        <tr<%= upgradeIndex % 2 == 1 ? \'class="even"\' : \'\'%>>\n                            <td>方案<%= upgradeIndex + 1 %></td>\n                            <td><%= upgrade.type %></td>\n                            <td><%= upgrade.remark %></td>\n                            <td>\n                                <div class="J_UpgradeItem detail-upgrade-price">\n                                    <% var first = upgrade.datePrices[0] %>\n                                    <span class="detail-upgrade-price-selected">&yen;<%= first.price %>/成人 <% if (first.excludeChildFlag != 1) { %>&yen;<%= first.childPrice %>/儿童<% } else { %>&nbsp;不支持儿童<% } %></span>\n                                    <i class="icon"></i>\n                                </div>\n                                    <div class="J_UpgradeDetail detail-upgrade-price-list">\n                                    <% for (var priceIndex = 0; priceIndex < upgrade.datePrices.length; priceIndex++) { %>\n                                        <% var price = upgrade.datePrices[priceIndex] %>\n                                        <div class="detail-upgrade-price-item"><span><%= price.departDate %></span> &yen;<%= price.price %>/成人<% if (price.excludeChildFlag != 1) { %>   &yen;<%= price.childPrice %>/儿童  <% } else { %>&nbsp;&nbsp;不支持儿童<% } %></div>\n                                    <% } %>\n                                </div>\n                            </td>\n                        </tr>\n                    <% } %>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.advisoryModule = void 0;
    var i = n(0), a = n(2), o = (n(1), function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }(n(3))), r = (n(96), n(6), n(97));
    $(window);
    var s = void 0, l = void 0, c = $("#J_detailAdvisory"), d = a.template.compile(r.advisoryBlockTemplate),
        u = {productId: null, type: null};

    function f() {
        s.forEach(function (e) {
            o.off(e)
        })
    }

    var p = {
        init: function () {
            l = (0, i.getStore)(), u.productId = l.getState("productId"), (s = c.toArray().map(function (e) {
                return $(e)
            })).forEach(function (e) {
                o.on(e, f)
            }), function (e) {
                d = a.template.compile(r.advisoryBlockTemplate), s.forEach(function (t) {
                    t.append(d({data: e})).removeClass("section-loading")
                })
            }(u)
        }
    };
    t.advisoryModule = p
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.createPagination = void 0;
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        return function (t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }();
    var a = [],
        o = n(2).template.compile('\n<div class="pagination-box">\n    <span class="pagination-item pagination-prev<%= current === 1 ? \' disabled\' : \'\' %>">&lt;</span>\n    <% for (var page = min; page <= max; page++) { %>\n        <span class="pagination-item pagination-page<%= current === page ? \' active\' : \'\' %>"\n            <% if (current !== page) { %>data-page="<%= page %>"<% } %>><%= page %></span>\n    <% } %>\n    <% if (more) { %>\n        <span class="pagination-item pagination-more">•••</span>\n    <% } %>\n    <% if (last) { %>\n        <span class="pagination-item pagination-page" data-page="<%= total %>"><%= total %></span>\n    <% } %>\n    <span class="pagination-item pagination-next<%= current === total ? \' disabled\' : \'\' %>">&gt;</span>\n</div>\n'),
        r = function () {
            function e(t, n) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.current = n.current || 1, this.total = n.total || 1, this.offset = 2, this.$element = t, this.options = Object.assign({}, n), this.bind(), this.render()
            }

            return i(e, [{
                key: "bind", value: function () {
                    var e = this;
                    this.$element.on("click", ".pagination-prev", function () {
                        e.change(e.current - 1)
                    }).on("click", ".pagination-next", function () {
                        e.change(e.current + 1)
                    }).on("click", ".pagination-page", function () {
                        e.change($(this).data("page"))
                    })
                }
            }, {
                key: "change", value: function (e) {
                    (e = parseInt(e)) && this.current !== e && e > 0 && e <= this.total && (this.current = e, this.render(), this.options.onchange && this.options.onchange(e))
                }
            }, {
                key: "params", value: function () {
                    var e = this.current, t = this.total, n = this.offset, i = Math.max(e - n, 1),
                        a = Math.min(t, i + 2 * n);
                    return {current: e, total: t, min: i = Math.max(a - 2 * n, 1), max: a, more: a < t, last: a !== t}
                }
            }, {
                key: "render", value: function () {
                    this.$element.html(o(this.params()))
                }
            }, {
                key: "reload", value: function (e) {
                    this.current = e.current || this.current, this.total = e.total || this.total, this.offset = e.offset || this.offset, this.options = Object.assign({}, this.options, e)
                }
            }]), e
        }();
    t.createPagination = function (e, t) {
        var n = new r(e, t);
        return a.push(n), n
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.advisoryBlockTemplate = '\n<div class="section-box advisory">\n    <div class="section-box-head">\n        <h2>在线问答</h2>\n    </div>\n    <div class="section-box-body">\n        <p class="advisory-body-p">\n            出游有问题，好不好玩，问问去过的人～\n            <a class="advisory-body-a" href="http://www.tuniu.com/wenda/tour-<%=data.productId%>" target="_black">查看问答></a>\n        </p>\n\n    </div>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.relativeModule = void 0;
    var i = n(0), a = n(2), o = n(7), r = n(27), s = function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t['default'] = e, t
    }(n(3)), l = n(99), c = n(100);
    var d = void 0, u = $(window), f = void 0, p = void 0, h = void 0, v = void 0, m = void 0, g = void 0, y = void 0,
        b = void 0, _ = 0, x = 0, j = a.template.compile(c.detailProductTemplate);

    function w() {
        s.off(f), s.off(h), $.ajax({
            dataType: "json",
            url: d.relatedUrl(),
            data: {
                productId: m.getState("productId"),
                productType: m.getState("productType"),
                bookCode: m.getState("bookCityCode"),
                poiId: g
            },
            success: function (e) {
                e && e.success && e.data ? ((b = e.data.recommend || []).forEach(function (e, t) {
                    e.showIndex = t + 1
                }), function (e) {
                    var t = a.template.compile(l.detailRelativeTemplate);
                    f.append(t({
                        status: m.getState("status"),
                        data: e,
                        destination: y,
                        poiId: g,
                        year: (new Date).getFullYear(),
                        host: d.mainHost
                    })).removeClass("section-loading"), v = h.find(".J_productList"), p = f.find(".J_productList"), e.recommend && e.recommend.length ? (D(), k(), h.removeClass("section-loading")) : h.remove(), u.trigger("resize"), (0, o.createTaber)($("#J_localTab"), {
                        ctx: $(".J_localContent"),
                        onactive: function (e) {
                            var t = $(".J_proTypeName"), n = $(".J_proTypeLink");
                            t.text(e.$tab.text()), n.attr("href", n.attr("href").replace(/\/\w+-0-0\/$/, "/" + e.$tab.data("type") + "-0-0/"))
                        }
                    }), f.find(".J_relativeGallery").each(function () {
                        (0, r.createGallery)($(this))
                    }), b.length > 4 && f.find(".J_productMore").show().click(k), b.length > 8 && h.find(".J_productMore").show().click(D)
                }(e.data)) : T()
            },
            error: function (e, t) {
                T()
            }
        })
    }

    function D() {
        b.length <= 8 ? I(v, b) : (I(v, C(_, 8)), _ = (_ + 8) % b.length)
    }

    function k() {
        b.length <= 4 ? I(p, b) : (I(p, C(x, 4)), x = (x + 4) % b.length)
    }

    function C(e, t) {
        for (var n = b.length, i = [], a = e; a < e + t; a++) i.push(b[a % n]);
        return i
    }

    function I(e, t) {
        e.html(j({data: t}))
    }

    function T() {
        f.remove(), h.remove(), u.trigger("resize")
    }

    var S = {
        init: function (e) {
            d = e, m = (0, i.getStore)(), f = $("#J_detailRelative"), h = $("#J_detailRecommend"), g = m.getState("poiId"), y = m.getState("destination"), s.on(f, w), s.on(h, w)
        }
    };
    t.relativeModule = S
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.detailRelativeTemplate = '\n<div class="section-box relative">\n    <div class="section-box-head">\n        <h2>相关产品</h2>\n    </div>\n    <div class="section-box-body">\n        <% if (status == 0 && data.recommend && data.recommend.length) { %>\n            <div class="section-box-title">\n                <h3>为您推荐其他相似线路</h3>\n                <a class="J_productMore relative-pro-refresh" href="javascript:;" mm="点击_相关产品_相似产品_换一换">换一换 <i></i></a>\n            </div>\n            <div class="J_productList section-box-content relative-pro-list"></div>\n        <% } %>\n        <% if (data.favorite && data.favorite.length) { %>\n            <div class="section-box-title">\n                <h3>猜你喜欢</h3>\n            </div>\n            <div class="section-box-content">\n                <div class="J_relativeGallery detail-relative-wrap">\n                    <div class="detail-relative-btn detail-relative-prev" data-role="prev" mm="点击_详情区_相关产品_切换猜你喜欢产品"><i class="icon"></i></div>\n                    <div class="detail-relative-btn detail-relative-next" data-role="next" mm="点击_详情区_相关产品_切换猜你喜欢产品"><i class="icon"></i></div>\n                    <div class="detail-relative-box">\n                        <ul class="relative-pro-list gallery-list" data-role="list">\n                            <% for (var j = 0, jLen = data.favorite.length; j < jLen; j++) {\n                                var favoriteItem = data.favorite[j]; %>\n                            <li data-role="item">\n                                <a href="/tour/<%= favoriteItem.productId %>" target="_blank" mm="点击_详情区_相关产品_查看猜你喜欢产品">\n                                    <div class="relative-pro-pic">\n                                        <img src="<%= favoriteItem.picUrl %>" alt="<%= favoriteItem.productName %>" />\n                                        <div class="relative-pro-des">\n                                            <p>\n                                                <%= favoriteItem.productName %>\n                                            </p>\n                                        </div>\n                                    </div>\n                                    <div class="relative-pro-info">\n                                        <div class="relative-pro-price">\n                                            <span>￥<b><%= favoriteItem.price %></b></span>起\n                                        </div>\n                                        <div class="relative-pro-satis">\n                                            满意度：<%= favoriteItem.satisfaction %>%\n                                        </div>\n                                    </div>\n                                </a>\n                            </li>\n                            <% } %>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        <% } %>\n        <% if ((data.localPlay && data.localPlay.length) || (data.ticket && data.ticket.length)) { %>\n            <div class="section-box-title">\n                <h3><%= destination %>&nbsp;<b class="J_proTypeName">当地玩乐</b></h3>\n                <div class="relative-play" id="J_localTab">\n                    <% if (data.localPlay && data.localPlay.length) { %>\n                    <span class="active" data-rel=".J_localPlay" data-type="local" mm="点击_详情区_相关产品_选择当地玩乐">当地玩乐</span>\n                    <% } %>\n                    <% if (data.ticket && data.ticket.length) { %>\n                    <span data-rel=".J_ticket" data-type="ticket" mm="点击_详情区_相关产品_选择门票">门票</span>\n                    <% } %>\n                </div>\n                <a class="relative-pro-more J_proTypeLink" href="<%= host %>/g<%= poiId %>/local-0-0/" target="_blank" mm="点击_详情区_相关产品_查看更多当地玩乐">查看更多 <i>&gt;</i></a>\n            </div>\n            <div class="section-box-content J_localContent">\n                <% if (data.localPlay && data.localPlay.length) { %>\n                <ul class="relative-pro-list J_localPlay">\n                    <% for (var k = 0, kLen = data.localPlay.length; k < kLen; k++) {\n                        var localItem = data.localPlay[k]; %>\n                    <li>\n                        <a href="<%= host %>/tours/<%= localItem.productId %>" target="_blank" mm="点击_详情区_相关产品_当地玩乐_查看当地玩乐">\n                            <div class="relative-pro-pic">\n                                <img src="<%= localItem.picUrl %>" alt="<%= localItem.productName %>" />\n                                <% if(localItem.productName) { %>\n                                <div class="relative-pro-des">\n                                    <p>\n                                        <%= localItem.productName %>\n                                    </p>\n                                </div>\n                                <% } %>\n                            </div>\n                            <div class="relative-pro-info">\n                                <div class="relative-pro-price">\n                                    <span>￥<b><%= +localItem.price %></b></span>起\n                                </div>\n                                <div class="relative-pro-satis">\n                                    满意度：<%= (+localItem.satisfaction) * 100 %>%\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <% } %>\n                </ul>\n                <% } %>\n                <% if (data.ticket && data.ticket.length) { %>\n                <ul class="relative-pro-list J_ticket">\n                    <% for (var l = 0, lLen = data.ticket.length; l < lLen; l++) {\n                        var ticketItem = data.ticket[l]; %>\n                    <li>\n                        <a href="http://menpiao.tuniu.com/t_<%= ticketItem.productId %>" target="_blank" mm="点击_详情区_相关产品_当地玩乐_查看门票产品">\n                            <div class="relative-pro-pic">\n                                <img src="<%= ticketItem.picUrl %>" alt="<%= ticketItem.productName %>" />\n                                <% if(ticketItem.productName) { %>\n                                <div class="relative-pro-des">\n                                    <p>\n                                        <%= ticketItem.productName %>\n                                    </p>\n                                </div>\n                                <% } %>\n                            </div>\n                            <div class="relative-pro-info">\n                                <div class="relative-pro-price">\n                                    <span>￥<b><%= +ticketItem.price %></b></span>起\n                                </div>\n                                <div class="relative-pro-satis">\n                                    满意度：<%= (+ticketItem.satisfaction) * 100 %>%\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <% } %>\n                </ul>\n                <% } %>\n            </div>\n        <% } %>\n        <% if (data.strategy && data.strategy.url && data.strategy.url != "") { %>\n            <div class="section-box-title">\n                <h3><%= destination %>&nbsp;攻略&amp;游记</h3>\n            </div>\n            <div class="section-box-content">\n                <div class="relative-strategy">\n                    <div class="relative-strategy-pic" >\n                        <a href="<%= host %><%= data.strategy.url %>" target="_blank" mm="点击_详情区_相关产品_攻略&游记_查看攻略">\n                            <img src="<%= data.strategy.img %>" alt="旅游攻略" />\n                            <div class="relative-strategy-pic-name"><p><%= destination %></p><span></span></div>\n                        </a>\n                    </div>\n                    <div class="relative-strategy-info">\n                        <span class="relative-strategy-info-title"><%= year %>旅游攻略</span>\n                        <span class="relative-strategy-info-des" title="<%= destination %>"><%= destination %></span>\n                        <a class="relative-strategy-info-download" href="<%= host %><%= data.strategy.url %>" target="_blank" mm="点击_详情区_相关产品_攻略&游记_查看攻略">查看详情</a>\n                    </div>\n                </div>\n                <% if (data.strategy.travelNote && data.strategy.travelNote.length) { %>\n                <ul class="relative-travels-list">\n                    <% for (var m = 0, mLen = data.strategy.travelNote.length; m < mLen; m++) {\n                        var noteItem = data.strategy.travelNote[m]; %>\n                    <li>\n                        <a href="<%= host %>/trips/<%= noteItem.tripsId %>" target="_blank" mm="点击_详情区_相关产品_攻略&游记_查看游记">\n                            <div class="relative-travels-pic">\n                                <img src="<%= noteItem.tripsImageUrl %>" alt="<%= noteItem.tripsTitle %>" />\n                                <div class="relative-travels-des">\n                                    <p>\n                                        <%= noteItem.tripsTitle %>\n                                    </p>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <% } %>\n                </ul>\n                <% } %>\n            </div>\n        <% } %>\n        <% if (data.history && data.history.length) { %>\n            <div class="section-box-title">\n                <h3>我的浏览记录</h3>\n            </div>\n            <div class="section-box-content">\n                <div class="J_relativeGallery detail-relative-wrap">\n                    <div class="detail-relative-btn detail-relative-prev" data-role="prev" mm="点击_详情区_相关产品_浏览记录_切换已浏览产品"><i class="icon"></i></div>\n                    <div class="detail-relative-btn detail-relative-next" data-role="next" mm="点击_详情区_相关产品_浏览记录_切换已浏览产品"><i class="icon"></i></div>\n                    <div class="detail-relative-box">\n                        <ul class="relative-pro-list gallery-list" data-role="list">\n                        <% for (var n = 0, nLen = data.history.length; n < nLen; n++) {\n                            var historyItem = data.history[n]; %>\n                            <li data-role="item">\n                                <a href="/tour/<%= historyItem.productId %>" target="_blank" mm="点击_详情区_相关产品_浏览记录_查看已浏览产品">\n                                    <div class="relative-pro-pic">\n                                        <img src="<%= historyItem.picUrl %>" alt="<%= historyItem.productName %>" />\n                                        <div class="relative-pro-des">\n                                            <p>\n                                                <%= historyItem.productName %>\n                                            </p>\n                                        </div>\n                                    </div>\n                                    <div class="relative-pro-info">\n                                        <div class="relative-pro-price">\n                                            <span>￥<b><%= historyItem.price %></b></span>起\n                                        </div>\n                                        <div class="relative-pro-satis">\n                                            满意度：<%= historyItem.satisfaction %>%\n                                        </div>\n                                    </div>\n                                </a>\n                            </li>\n                            <% } %>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        <% } %>\n    </div>\n</div>\n'
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.detailProductTemplate = '\n<ul class="product-list">\n    <% for (var index = 0; index < data.length; index++) { %>\n        <% var product = data[index] %>\n        <li class="product-item">\n            <a class="product-link" href="/tour/<%= product.productId %>" target="_blank" m="点击_相关产品_相似产品_<%= product.showIndex %>_<%= product.productId %>">\n                <div class="product-picture">\n                    <img src="<%= product.picUrl %>" alt="<%= product.productName %>" />\n                    <div class="product-name">\n                        <p><%= product.productName %></p>\n                    </div>\n                </div>\n                <div class="product-info">\n                    <div class="product-price">\n                        <span>￥<b><%= product.price %></b></span> 起\n                    </div>\n                    <div class="product-satisfication">\n                        满意度：<%= product.satisfaction || 100 %>%\n                    </div>\n                </div>\n            </a>\n        </li>\n    <% }%>\n</ul>\n'
}]);