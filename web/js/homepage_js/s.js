(function () {
    function wa(d) {
        function b(d) {
            function u() {
                g.onreadystatechange = g.onload = null;
                d.callback && d.callback.apply(d)
            }

            var g = document.createElement("script");
            "undefined" != typeof d.id && (g.id = d.id);
            g.setAttribute("type", "text/javascript");
            g.setAttribute("src", d.url);
            g.setAttribute("charset", "utf-8");
            document.getElementsByTagName("head")[0].appendChild(g);
            g.onreadystatechange = function () {
                "loaded" != this.readyState && "complete" != this.readyState || u()
            };
            g.onload = g.onerror = u
        }

        function g() {
            for (l.zid = l.zid ||
                ""; l.funList[0];) {
                var d = l.funList.shift();
                d && d(l.zid)
            }
        }

        var f = T("__xsptplusUT_" + N), E = (new Date).getTime() + 3E5;
        f || (d.zid = null);
        var l = window.__zpCMSDCB;
        l || (l = window.__zpCMSDCB = function (d) {
            l.zid || l.bw || (l.bw = l.zid = l.zid || l.bw || d && d.data || "")
        });
        l.funList = l.cE = l.funList || l.cE || [];
        l.bw = l.zid = l.zid || l.bw || d.zid;
        l.funList.push(d.fun);
        (l.isGet || l.ds || l.zid) && g();
        l.zid || l.isTouch || l.dj || (U("__xsptplusUT_" + N, 1, new Date(E), "/", ba), l.isTouch = 1, l.dj = 1, b({
            url: I("//cms.gtags.net/g?z=__zpCMSDCB") + "&a=" + d.a, callback: function () {
                l.isGet =
                    1;
                l.ds = 1;
                g()
            }
        }))
    }

    function ca() {
        var d = navigator.userAgent || "";
        return -1 < d.indexOf("MSIE 8.0") || -1 < d.indexOf("MSIE 7.0") || -1 < d.indexOf("MSIE 6.0") ? !0 : !1
    }

    function pa(d) {
        for (var b in d) return !1;
        return !0
    }

    var M = navigator.userAgent.toLowerCase() || "";
    if (-1 < M.indexOf("spider") || -1 < M.indexOf("msnbot") || -1 < M.indexOf("networkbench")) return !1;
    var q = document, m = window, qa = navigator, V = Image, O = Array, f = encodeURIComponent, b = decodeURIComponent,
        da = "", J = "", N = "", ra, ea = 0, ba, T = function (d) {
            d = f(d) + "=";
            var u = q.cookie.indexOf(d),
                g = "";
            -1 < u && (g = q.cookie.indexOf(";", u), -1 == g && (g = q.cookie.length), g = b(q.cookie.substring(u + d.length, g)));
            return g
        }, U = function (d, b, g, m, E, l) {
            d = f(d) + "=" + f(b);
            g instanceof Date && (d += "; expires=" + g.toGMTString());
            m && (d += "; path=" + m);
            E && (d += "; domain=" + E);
            l && (d += "; secure");
            q.cookie = d
        }, W = function (d) {
            var b = {};
            if (0 < d.indexOf("?")) {
                d = d.substring(d.indexOf("?") + 1);
                0 < d.indexOf("#") && (d = d.substring(0, d.indexOf("#")));
                d = d.split("&");
                for (var g = 0; g < d.length; g++) b[d[g].split("=")[0]] = d[g].split("=")[1]
            }
            if (void 0 ==
                b.zpclkid || "" == b.zpclkid) b.zpclkid = window.__zpclkid;
            return b
        }, fa = function (d, b, g) {
            d.addEventListener ? d.addEventListener(b, g, !1) : d.attachEvent ? d.attachEvent("on" + b, g) : d["on" + b] = g
        }, I = function (d) {
            var b = "";
            try {
                b = "https:" == q.location.protocol ? "https:" : "http:"
            } catch (g) {
            }
            return b + d
        }, xa = function () {
            var b = m.location.href;
            return b && "" != b ? b.replace(/\s/g, " ") : ""
        }, ga = function () {
            var b = "";
            try {
                b = q.referrer
            } catch (f) {
            }
            if ("" == b) try {
                opener && opener.location && (b = opener.location.href)
            } catch (f) {
            }
            return b && "" != b ? b.replace(/\s/g,
                " ") : b
        }, ya = function (b) {
            function f(b) {
                var d = "__ctd" + (Math.random() + "").substr(2), m = b.replace(/[^\.]+\./i, "");
                if (m == b) return b;
                U(d, "1", "", "", m);
                if (!T(d)) return b;
                U(d, "", new Date(0), "", m, void 0);
                return f(m)
            }

            return b ? b : document.domain ? f(document.domain) : null
        }, n = function (b) {
            b && (b = b.replace(/[\s#,|]/g, " "));
            return b
        }, G = function (b) {
            b && "string" == typeof b && (b = b.replace(/^(\s|\u00A0)+/, "").replace(/(\s|\u00A0)+$/, ""));
            return b
        }, P = [["m.baidu", "word"], ["wap.baidu", "word"], ["opendata.baidu", "wd"], ["baidu", "word"],
            ["baidu", "wd"], ["baidu", "q1"], ["baidu", "kw"], ["google", "q"], ["soso", "w"], ["sogou", "query"], ["youdao", "q"], ["bing", "q"], ["yahoo", "p"], ["so.360.cn", "q"], ["360so", "q"], ["360sou", "q"], ["so.com", "q"], ["ask", "q"], ["3721", "name"], ["vent", "kw"], ["ucweb", "keyword"], ["ucweb", "word"], ["114so", "kw"], ["haosou", "q"], ["chinaso", "q"], ["zhongsou", "w"], ["etao.com", "q"], [".sm.cn", "q"]],
        ha = function (b) {
            var f = /^https?:\/\/(.*?)($|\/.*)/.exec(b);
            if (null != f) {
                var g = "", g = f[1];
                b = W(b);
                for (f = 0; f < P.length; f++) if (0 <= g.indexOf(P[f][0]) &&
                    "undefined" != typeof b[P[f][1]]) return [2, n(g), "", "", n(b[P[f][1]]), ""];
                return [3, n(g), "", "", "", ""]
            }
            return [3, n(b), "", "", "", ""]
        };
    (new function () {
        function d(b, c) {
            var a = "rid=" + c + "&zid=" + J;
            b = 0 <= b.indexOf("?") ? b + ("&" + a) : b + ("?" + a);
            var d = document.createElement("iframe");
            d.setAttribute("scrolling", "no");
            d.frameBorder = "0";
            d.src = b;
            d.style.cssText = "width:1px;height:1px;position:fixed;_position:absolute;left:0px;top:0px;margin:0px;padding:0px;z-index:2147483648";
            setTimeout(function () {
                try {
                    document.body && document.body.insertBefore(d,
                        document.body.firstChild)
                } catch (a) {
                    setTimeout(arguments.callee, 13)
                }
            }, 13);
            setTimeout(function () {
                try {
                    d.parentNode.removeChild(d)
                } catch (a) {
                }
            }, 1E4)
        }

        var u = !1, g = !1, aa = null, E = 0, l = 0, S = 0, L = 0, h = 4, r = "", F = "", t = "", A = "", H = "", X = 0,
            M = 0, B = "", w = "", K = "", C = "w", D = function (b) {
                return b instanceof O && 2 == b.length ? b[1] : ""
            }, v = "", Y = ya();
        ba = Y;
        var Q = "", k = "", R = "", ia = "", e = "", ja = "", Z = {}, sa = {
            _addOrganic: function (b) {
                b instanceof O && 3 == b.length && P.push([b[1], b[2]])
            }, _setAccount: function (b) {
                N = v = D(b)
            }, _setDomain: function (b) {
                ba = Y = D(b)
            },
            _setPageID: function (b) {
                k = D(b)
            }, _setPageType: function (b) {
                R = D(b)
            }, _setParams: function (b) {
                if (b instanceof O) {
                    var c = b.length;
                    16 < c && (c = 16);
                    for (var a = 1, d = []; a < c;) d.push(f(G(b[a]))), a++;
                    e = d.join(",")
                }
            }, _setUserID: function (b) {
                Q = D(b)
            }, _setMType: function (b) {
                b instanceof O && 2 == b.length && ("p" == b[1] ? C = "p" : "" == b[1] && (C = ""))
            }, _setSiteID: function (b) {
                ia = D(b)
            }
        }, z = "", ka = "", la = "", ma = "", na = "", fa = function () {
            if ("" != C && !m.__zp_smartpixel_list[C + "_" + v]) {
                var b = I("//cms.gtags.net/" + C) + "?a=" + v, b = b + ("&zid=" + J);
                "" != Q && (b += "&xid=" +
                    Q);
                if ("w" == C) {
                    m.__zp_smartpixel_list[C + "_" + v] = !0;
                    var c = q.createElement("iframe");
                    c.setAttribute("scrolling", "no");
                    c.frameBorder = "0";
                    c.src = b;
                    c.style.cssText = "width:1px;height:1px;position:fixed;_position:absolute;left:0px;top:0px;margin:0px;padding:0px;z-index:2147483648";
                    var a = q.createElement("iframe");
                    a.setAttribute("scrolling", "no");
                    a.frameBorder = "0";
                    a.src = "about:blank";
                    a.style.cssText = "width:1px;height:1px;position:fixed;_position:absolute;left:0px;top:0px;margin:0px;padding:0px;z-index:2147483648";
                    setTimeout(function () {
                        try {
                            q.body.insertBefore(c, q.body.firstChild), q.body.insertBefore(a, q.body.firstChild)
                        } catch (b) {
                            setTimeout(arguments.callee, 13)
                        }
                    }, 13);
                    setTimeout(function () {
                        try {
                            c.parentNode.removeChild(c), a.parentNode.removeChild(a)
                        } catch (b) {
                        }
                    }, 1E4)
                } else if ("p" == C) {
                    var d = new V;
                    d.src = b;
                    m.__zp_smartpixel_list[C + "_" + v] = d
                }
            }
        }, ta = function (b) {
            var c = "", a = "a=" + v, a = a + ("&zid=" + J);
            "" != K && (a = a + "&rid=" + f(K));
            "" != Q && (a = a + "&uid=" + f(Q));
            if (2 == b) c = "imp/dasp", "" != k && (a = a + "&pi=" + k), "" != R && (a = a + "&pt=" + R), "" != e && (a =
                a + "&args=" + e); else if (3 == b) {
                c = "imp/dasp3";
                m.zamplus_tag_params || (m.zamplus_tag_params = {});
                var a = a + "&ext_args=", d;
                b = m.zamplus_tag_params;
                b = ra || b;
                z = "";
                if ("object" == typeof b) for (d in b) if (b.hasOwnProperty(d)) {
                    var g = G(d), p = b[d];
                    if ("p_zp_type" == g) {
                        if ("string" == typeof p || "number" == typeof p) ka = f(G(p))
                    } else if ("p_zp_uuid" == g) {
                        if ("string" == typeof p || "number" == typeof p) la = f(G(p))
                    } else if ("p_zp_conversion" == g) {
                        if ("string" == typeof p || "number" == typeof p) ma = f(G(p))
                    } else if ("p_zp_convinfo" == g) {
                        if ("string" == typeof p ||
                            "number" == typeof p) na = f(G(p))
                    } else if ("p_zp_prodstype" == g) {
                        if ("string" == typeof p || "number" == typeof p) ja = f(G(p))
                    } else if ("p_zp_prods" == g) {
                        if (!("object" != typeof p || p instanceof Array || pa(p))) for (var u in p) "" != p[u] && (Z[u] = p[u])
                    } else if (p instanceof O) {
                        for (var n in p) p.hasOwnProperty(n) && (p[n] = f(G(p[n])));
                        z += f(g) + "=" + p.join(",") + ";"
                    } else if ("string" == typeof p || "number" == typeof p || "boolean" == typeof p) z += f(g) + "=" + f(G(p)) + ";"
                }
                d = "" != z ? z.substring(0, z.length - 1) : z;
                a += f(d)
            }
            "" != ka && (a = a + "&type=" + ka);
            "" != la &&
            (a = a + "&uuid=" + la);
            "" != ia && (a = a + "&siteid=" + f(ia));
            a = a + "&vc=" + E + "&vt=" + l + "&vpc=" + L + "&rvt=" + S + "&fr=" + X + "&vrt=" + M + "&ot=" + h;
            "" != r && (a = a + "&os=" + f(r));
            "" != F && (a = a + "&om=" + f(F));
            "" != t && (a = a + "&oc=" + f(t));
            "" != A && (a = a + "&ok=" + f(A));
            "" != H && (a = a + "&oa=" + f(H));
            "" != w && (a = a + "&u=" + f(w));
            d = m.screen;
            a = a + "&sc=" + f(d.width + "x" + d.height) + "&ch=" + f(q.characterSet || q.charset) + "&la=" + f(qa.language || qa.userLanguage) + "&ti=" + f(q.title) + "&v=3.1.0.23";
            "" != B && (a = a + "&ru=" + f(B));
            a = a + "&t=1&r=" + Math.random();
            d = I("//dat.gtags.net/" + c) + "?" +
                a;
            2084 < d.length && ca() && (a = a.replace("&u=" + f(w), ""), d = (I("//dat.gtags.net/" + c) + "?argserror=true&" + a).substring(0, 2084));
            return [c, d]
        }, ua = function (b, c) {
            try {
                6 <= c.length && (h = c[0], r = c[1], F = c[2], t = c[3], A = c[4], H = c[5])
            } catch (d) {
            }
            var a = [], a = W(w);
            return "undefined" != typeof a.zpclkid || "undefined" != typeof a.utm_source && "undefined" != typeof a.utm_campaign && "undefined" != typeof a.utm_medium ? ("undefined" != typeof a.zpclkid ? (F = r = "zampda", t = n(a.zpclkid), A = ha(B)[4], H = "") : (r = n(a.utm_source), F = n(a.utm_medium), t = n(a.utm_campaign),
                A = "undefined" != typeof a.utm_term ? n(a.utm_term) : ha(B)[4], H = "undefined" != typeof a.utm_content ? n(a.utm_content) : ""), h = 1, [!0, [h, r, F, t, A, H].join("|")]) : "" == B || null == B || "undefined" == B || (new RegExp("^https?://[\\w\\.]*?" + Y + "($|/.*|:.*)")).test(B) ? b && 0 == c.length ? (h = 4, r = F = t = A = H = "", [!0, [h, "||||"].join("|")]) : [!1, c.join("|")] : (a = ha(B), 2 == a[0] || 3 == a[0] && b ? (h = a[0], r = a[1], A = a[4], F = t = H = "", [!0, a.join("|")]) : [!1, c.join("|")])
        }, va = function (b) {
            b = W(w);
            return "undefined" != typeof b.zpclkid ? b.zpclkid : ""
        }, oa = function (b) {
            if (0 ==
                b.length) return !1;
            for (i in b) if (b.hasOwnProperty(i) && sa.hasOwnProperty(b[i][0])) sa[b[i][0]](b[i]);
            return "" == v ? !1 : !0
        };
        this.pageView = function () {
            "undefined" != typeof _zpq && (g = oa(_zpq));
            "undefined" != typeof _zampq && (u = oa(_zampq));
            window.__zpSMConfig = window.__zpSMConfig || [];
            if (!u && !g) {
                for (; !u && 0 < __zpSMConfig.length;) {
                    var h = __zpSMConfig.shift();
                    h && (u = oa(h.query || []), ra = h.args, ea = h.nosp)
                }
                if (!u) return
            }
            m.__zp_smartpixel_list || (m.__zp_smartpixel_list = {accout_map: {}});
            0 < arguments.length ? (B = w, w = arguments[0], w =
                w.replace(/\t|\n|\r/g, "")) : (w = xa(), B = ga());
            wa({
                fun: function (c) {
                    J = c;
                    c = new Date;
                    c.setTime(c.getTime() + 63072E6);
                    var a = l = E = 0, h = S = 0;
                    L = 0;
                    var r;
                    r = String(Date.parse(new Date));
                    r = r.substr(0, r.length - 3);
                    var p = "", F = va(w), q = "", t = T("__xsptplus" + v).split("#"), n = !1, A = [], C = 0;
                    if (!t || 5 > t.length) n = !0; else {
                        var p = t[2], q = t[4], z = t[0].split("."), A = t[1].split("|");
                        if (5 != z.length || 6 != A.length) n = !0; else {
                            E = z[1];
                            a = z[2];
                            h = z[3];
                            L = z[4];
                            try {
                                C = (new Date(parseInt(h + "000"))).getDate()
                            } catch (H) {
                            }
                            1800 <= r - h && (n = !0);
                            C != (new Date(parseInt(r +
                                "000"))).getDate() && (n = !0)
                        }
                    }
                    t = [!0, ""];
                    0 < h && (M = parseInt((r - h) / 86400));
                    n ? (E++, X = 1, K = F, L = 0, a = r, t = ua(n, A)) : (t = ua(n, A), m.__zp_smartpixel_list.accout_map && "undefined" != typeof m.__zp_smartpixel_list.accout_map[v] && (t[0] = !1), (n = t[0]) ? (E++, X = 1, K = F, L = 0, a = r) : (K = p, l = r - a, S = r - h));
                    h = W(w);
                    h.zpclkid && h.zpdl && decodeURIComponent(h.zpdl) && q != h.zpclkid && (q = h.zpclkid, da = decodeURIComponent(h.zpdl));
                    L++;
                    U("__xsptplus" + v, v + "." + E + "." + a + "." + r + "." + L + "#" + t[1] + "#" + K + "#" + J + "#" + q, c, "/", Y);
                    m.__zp_smartpixel_list.accout_map || (m.__zp_smartpixel_list.accout_map =
                        {});
                    m.__zp_smartpixel_list.accout_map[v] = 1;
                    da && d(da, va(w));
                    if (!ea) {
                        a = a = c = "";
                        if (u) a = ta(3); else if (g) {
                            c = {};
                            if ("240" == k) c.ptype = "homepage"; else if ("241" == k) c.ptype = "regpage"; else if ("242" == k) "" != e && (c.userid = b(e)), c.ptype = "regSuccPage"; else if ("243" == k) "" != e && (a = e.split(","), 3 <= a.length && (c.productId_list = b(a[0]), c.totalPrice = b(a[1]), c.totalNum = b(a[2]))), c.ptype = "mycartPage"; else if ("244" == k) "" != e && (a = e.split(","), 3 <= a.length && (c.productId_list = b(a[0]), c.totalPrice = b(a[1]), c.totalNum = b(a[2]))), c.ptype =
                                "orderInfoPage"; else if ("245" == k) "" != e && (a = e.split(","), 3 <= a.length && (c.productId_list = b(a[0]), c.totalPrice = b(a[1]), c.totalNum = b(a[2]))), c.ptype = "orderInfoPage"; else if ("246" == k) "" != e && (a = e.split(","), 3 <= a.length && (c.productId = b(a[0]), c.inStock = b(a[1]), c.isWine = b(a[2]))), c.ptype = "productPage"; else if ("247" == k) "" != e && (a = e.split(","), 4 <= a.length && (c.productId_list = b(a[0]), c.catname = b(a[1]), c.catid = b(a[2]), c.orderby = b(a[3]))), c.ptype = "categoryPage"; else if ("248" == k) "" != e && (a = e.split(","), 3 <= a.length &&
                            (c.productId_list = b(a[0]), c.keyword = b(a[1]), c.orderby = b(a[2]))), c.ptype = "searchPage"; else if ("358" == k) "" != e && (c.cityid = b(e)), c.ptype = "homepage"; else if ("360" == k) "" != e && (a = e.split(","), 2 <= a.length && (c.channelid = b(a[0]), c.categoryid = b(a[1]))), c.ptype = "category"; else if ("361" == k) "" != e && (c.productid = b(e)), c.ptype = "detailpage"; else if ("362" == k) "" != e && (c.productid = b(e)), c.ptype = "shoppingcart"; else if ("457" == k) c.ptype = "orderinfo"; else if ("809" == k) c.ptype = "homepage"; else if ("810" == k) c.ptype = "logregpage",
                            "" != e && (c.action = b(e)); else if ("811" == k) c.ptype = "regSuccPage", "" != e && (c.userid = b(e)); else if ("812" == k) c.ptype = "searchPage", "" != e && (a = e.split(","), 3 <= a.length && (c.productId_list = b(a[0]), c.keyword = b(a[1]), c.orderby = b(a[2]))); else if ("813" == k) c.ptype = "categoryPage", "" != e && (a = e.split(","), 4 <= a.length && (c.productId_list = b(a[0]), c.catname = b(a[1]), c.catid = b(a[2]), c.orderby = b(a[3]))); else if ("814" == k) c.ptype = "topicPage", "" != e && (a = e.split(","), 2 <= a.length && (c.productId_list = b(a[0]), c.topicName = b(a[1]))); else if ("815" ==
                                k) c.ptype = "productPage", "" != e && (a = e.split(","), 2 <= a.length && (c.productId = b(a[0]), c.inStock = b(a[1]))); else if ("816" == k) c.ptype = "mycartPage", "" != e && (a = e.split(","), 3 <= a.length && (c.productId_list = b(a[0]), c.totalPrice = b(a[1]), c.totalNum = b(a[2]))); else if ("817" == k) c.ptype = "orderInfoPage", "" != e && (a = e.split(","), 3 <= a.length && (c.productId_list = b(a[0]), c.totalPrice = b(a[1]), c.totalNum = b(a[2]))); else if ("818" == k) c.ptype = "orderSuccPage", "" != e && (a = e.split(","), 3 <= a.length && (c.productId_list = b(a[0]), c.totalPrice =
                                b(a[1]), c.totalNum = b(a[2]))); else if ("752" == k) c.ptype = "homepage"; else if ("753" == k) c.ptype = "regpage"; else if ("754" == k) c.ptype = "regSuccPage"; else if ("755" == k) c.ptype = "familysalesPage"; else if ("756" == k) c.ptype = "chanelPage", "" != e && (c.chanelName = b(e)); else if ("757" == k) c.ptype = "searchPage", "" != e && (a = e.split(","), 3 <= a.length && (c.productId_list = b(a[0]), c.keyword = b(a[1]), c.orderby = b(a[2]))); else if ("758" == k) c.ptype = "categoryPage", "" != e && (a = e.split(","), 4 <= a.length && (c.productId_list = b(a[0]), c.catname = b(a[1]),
                                c.brand = b(a[2]), c.orderby = b(a[3]))); else if ("759" == k) c.ptype = "productPage", "" != e && (a = e.split(","), 4 <= a.length && (c.productId = b(a[0]), c.inStock = b(a[1]), c.inventoryDiv = b(a[2]), c.flashBuyTime = b(a[3]))); else if ("760" == k) c.ptype = "mycartPage", "" != e && (a = e.split(","), 3 <= a.length && (c.productId_list = b(a[0]), c.totalPrice = b(a[1]), c.totalNum = b(a[2]))); else if ("761" == k) c.ptype = "orderInfoPage", "" != e && (a = e.split(","), 3 <= a.length && (c.productId_list = b(a[0]), c.totalPrice = b(a[1]), c.totalNum = b(a[2]))); else if ("762" == k) c.ptype =
                                "orderSuccPage", "" != e && (a = e.split(","), 3 <= a.length && (c.productId_list = b(a[0]), c.totalPrice = b(a[1]), c.totalNum = b(a[2]))); else if ("854" == k) c.ptype = "homepage"; else if ("855" == k) c.ptype = "logregpage", "" != e && (c.action = b(e)); else if ("856" == k) c.ptype = "regSuccPage", "" != e && (c.userid = b(e)); else if ("857" == k) c.ptype = "specialPage", "" != e && (a = e.split(","), 3 <= a.length && (c.productId_list = b(a[0]), c.keyword = b(a[1]), c.orderby = b(a[2]))); else if ("858" == k) c.ptype = "promotionsPage", "" != e && (a = e.split(","), 2 <= a.length && (c.productId_list =
                                b(a[0]), c.orderby = b(a[1]))); else if ("859" == k) c.ptype = "topicPage", "" != e && (a = e.split(","), 2 <= a.length && (c.productId_list = b(a[0]), c.topicName = b(a[1]))); else if ("860" == k) c.ptype = "productPage", "" != e && (a = e.split(","), 2 <= a.length && (c.productId = b(a[0]), c.inStock = b(a[1]))); else if ("861" == k) c.ptype = "mycartPage", "" != e && (a = e.split(","), 3 <= a.length && (c.productId_list = b(a[0]), c.totalPrice = b(a[1]), c.totalNum = b(a[2]))); else if ("862" == k) c.ptype = "orderInfoPage", "" != e && (a = e.split(","), 3 <= a.length && (c.productId_list =
                                b(a[0]), c.totalPrice = b(a[1]), c.totalNum = b(a[2]))); else if ("863" == k) c.ptype = "orderSuccPage", "" != e && (a = e.split(","), 3 <= a.length && (c.productId_list = b(a[0]), c.totalPrice = b(a[1]), c.totalNum = b(a[2]))); else if (c.pagetype = R, "" != e) for (a = e.split(","), h = 0; h < a.length; h++) c[R + "_k" + (h + 1)] = b(a[h]).split(",");
                            m.zamplus_tag_params = c;
                            a = ta(3)
                        }
                        c = a[0];
                        a = a[1];
                        aa = new V;
                        m.__zp_smartpixel_list[c] || (m.__zp_smartpixel_list[c] = []);
                        m.__zp_smartpixel_list[c].push(aa);
                        aa.src = a;
                        X = 0
                    }
                    fa();
                    "" != ma && (a = "a=" + v + "&c=" + ma + "&zid=" + J + "&allow=0&type=23",
                    "" != K && (a = a + "&i=" + f(K)), "" != na && (a = a + "&info=" + na), "" != w && (a = a + "&u=" + f(w)), "" != B && (a = a + "&ru=" + f(B)), a += "&r=" + Math.random(), c = I("//ut.gtags.net/imp/conv") + "?" + a, 2084 < c.length && ca() && (a = a.replace("&u=" + f(w), ""), c = (I("//ut.gtags.net/imp/conv") + "?argserror=true&" + a).substring(0, 2084)), a = new V, m.__zp_smartpixel_list["//ut.gtags.net/imp/conv_" + v] = a, a.src = c);
                    if ("" != ja && !pa(Z)) {
                        c = "a=" + v + "&t=" + ja;
                        for (var D in Z) c += "&" + D + "=" + f(G(Z[D]));
                        c += "&_=" + (Math.random() + "").substr(2);
                        D = I("//ut.gtags.net/imp/material") +
                            "?" + c;
                        2084 < D.length && ca() || (c = new V, m.__zp_smartpixel_list["//ut.gtags.net/imp/material"] = c, c.src = D)
                    }
                }, a: v, zid: T("__xsptplus" + v).split("#")[3]
            });
            g && (_zpq = []);
            u && (_zampq = [])
        }
    }).pageView();
    window.__zampBroadcast || (window.__zampBroadcast = function () {
        try {
            var b = function (g, f) {
                f = f || "opener.top";
                l[f] || n.push(g);
                for (var h = 0, m; h < g.frames.length && (m = g.frames[h]); h++) b(m, f + ".frames[" + h + "]")
            }, f = function (b, d) {
                d = d || "opener.top";
                if (b == opener) g = d; else for (var h = 0, l; h < b.frames.length && (l = b.frames[h]); h++) f(l, d + ".frames[" +
                    h + "]")
            }, g = "", m = opener.top, n = [], l = {};
            f(m);
            (function (b, d) {
                var g = arguments.callee;
                n.push(b);
                l[d] = 1;
                b.parent != b && g(b.parent, d.replace(/\.[^\.]+$/i, ""))
            })(opener, g);
            b(m, "");
            (function () {
                if (n[0]) {
                    var b = n.shift();
                    try {
                        b.postMessage({
                            token: "catchLanding",
                            landing: document.location.href,
                            sourceUrl: ga(),
                            sourceFramePath: g
                        }, "*")
                    } catch (d) {
                    }
                    setTimeout(arguments.callee, 1)
                }
            })()
        } catch (S) {
        }
    }, window.__zampBroadcast());
    (function () {
        function b() {
            m || (m = 1, clearInterval(g), g = setInterval(function () {
                null != J && null != N && (clearInterval(g),
                    (new Image).src = I("//dat.gtags.net/imp/hm") + "?zid=" + J + "&a=" + N + "&u=" + encodeURIComponent(document.location) + "&ru=" + encodeURIComponent(ga()) + "&_=" + Math.random())
            }, 50))
        }

        function f(g) {
            function l(f) {
                clearTimeout(h);
                h = setTimeout(function () {
                    for (var f = 0; f < m.length - 1; f++) {
                        var h = m[f], q = m[f + 1];
                        if (null == h || null == q) return;
                        if (h[0] != q[0] || h[1] != q[1]) {
                            f = g;
                            h = l;
                            f.removeEventListener ? f.removeEventListener("mousemove", h, !1) : f.detachEvent ? f.detachEvent("onmousemove", h) : f.onmousemove = null;
                            b();
                            return
                        }
                    }
                    m = [];
                    n = null
                }, 30);
                document.all ?
                    (x = f.clientX, y = f.clientY) : (x = f.pageX, y = f.pageY);
                n && m.push([x - n[0], y - n[1]]);
                n = [x, y]
            }

            var m = [], n, h;
            fa(g, "mousemove", l)
        }

        if (!ea) {
            var g, m = 0;
            f(document.body)
        }
    })();
    (function () {
        try {
            window.addEventListener("message", function (b) {
                b.data.evalCall && eval("(" + b.data.evalCall + ")")
            })
        } catch (b) {
        }
    })()
})();
