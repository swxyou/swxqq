!function (e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var a = n[o] = {exports: {}, id: o, loaded: !1};
        return e[o].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
    }

    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function (e, t, n) {
    n(6), n(1), e.exports = n(2)
}, function (module, exports) {
    !function () {
        if ("object" != typeof JSON) var JSON = window.JSON = {};
        !function () {
            "use strict";

            function f(e) {
                return e < 10 ? "0" + e : e
            }

            function this_value() {
                return this.valueOf()
            }

            function quote(e) {
                return rx_escapable.lastIndex = 0, rx_escapable.test(e) ? '"' + e.replace(rx_escapable, function (e) {
                    var t = meta[e];
                    return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + e + '"'
            }

            function str(e, t) {
                var n, o, a, i, r, s = gap, c = t[e];
                switch (c && "object" == typeof c && "function" == typeof c.toJSON && (c = c.toJSON(e)), "function" == typeof rep && (c = rep.call(t, e, c)), typeof c) {
                    case"string":
                        return quote(c);
                    case"number":
                        return isFinite(c) ? String(c) : "null";
                    case"boolean":
                    case"null":
                        return String(c);
                    case"object":
                        if (!c) return "null";
                        if (gap += indent, r = [], "[object Array]" === Object.prototype.toString.apply(c)) {
                            for (i = c.length, n = 0; n < i; n += 1) r[n] = str(n, c) || "null";
                            return a = 0 === r.length ? "[]" : gap ? "[\n" + gap + r.join(",\n" + gap) + "\n" + s + "]" : "[" + r.join(",") + "]", gap = s, a
                        }
                        if (rep && "object" == typeof rep) for (i = rep.length, n = 0; n < i; n += 1) "string" == typeof rep[n] && (o = rep[n], a = str(o, c), a && r.push(quote(o) + (gap ? ": " : ":") + a)); else for (o in c) Object.prototype.hasOwnProperty.call(c, o) && (a = str(o, c), a && r.push(quote(o) + (gap ? ": " : ":") + a));
                        return a = 0 === r.length ? "{}" : gap ? "{\n" + gap + r.join(",\n" + gap) + "\n" + s + "}" : "{" + r.join(",") + "}", gap = s, a
                }
            }

            var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                rx_four = /(?:^|:|,)(?:\s*\[)+/g,
                rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
            }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value);
            var gap, indent, meta, rep;
            "function" != typeof JSON.stringify && (meta = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            }, JSON.stringify = function (e, t, n) {
                var o;
                if (gap = "", indent = "", "number" == typeof n) for (o = 0; o < n; o += 1) indent += " "; else "string" == typeof n && (indent = n);
                if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
                return str("", {"": e})
            }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
                function walk(e, t) {
                    var n, o, a = e[t];
                    if (a && "object" == typeof a) for (n in a) Object.prototype.hasOwnProperty.call(a, n) && (o = walk(a, n), void 0 !== o ? a[n] = o : delete a[n]);
                    return reviver.call(e, t, a)
                }

                var j;
                if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function (e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
                throw new SyntaxError("JSON.parse")
            })
        }()
    }()
}, function (e, t) {
    !function () {
        var e = {
            init: function () {
                this.key = +new Date, this.bindEvent(), this.getOS(), this.IMAGE_URL = "//analy.tuniu.cn/analysisCollect/pcEvent.gif", this.postCache()
            }, postCache: function () {
                var e = this, t = e.getCache();
                if (t) {
                    t = JSON.parse(t);
                    for (var n = 0; n < t.length; n++) delete t[n].key;
                    var o = new Image;
                    o.onload = o.onerror = function () {
                        o = null, e.clearCache()
                    }, o.src = e.IMAGE_URL + "?" + e.makeQueryString(t)
                }
            }, makeQueryString: function (e) {
                var t = this, n = [], o = {
                    sid: t.getSid(),
                    sr: screen.width + "*" + screen.height,
                    sc: screen.colorDepth,
                    hw: window.innerHeight + "*" + window.innerWidth,
                    os: t.getOSName(),
                    bt: t.getBrowserName(),
                    bv: t.browser.version,
                    storage: e,
                    co: "_taca =" + t.getCookie("_taca") + ";tuniuuser=" + t.getCookie("tuniuuser") + ";_tact=" + t.getCookie("_tact") + ";tuniu_partner=" + t.getCookie("tuniu_partner") + ";tuniuuser_id=" + t.getCookie("tuniuuser_id") + ";tuniuuser_citycode=" + t.getCookie("tuniuuser_citycode") + ";client_type=" + (t.os.phone ? 20 : 0)
                };
                for (var a in o) n.push(a + "=" + encodeURIComponent("string" == typeof o[a] ? o[a] : JSON.stringify(o[a])));
                return n.join("&")
            }, getSid: function () {
                var e, t = new Date, n = "" + t, o = "", a = "";
                n = n.substr(n.length - 8);
                for (var i = 0; i < n.length; i++) e = Math.floor(10 * Math.random()), a += e, o += n.charCodeAt(i) << e;
                return a + o
            }, getOS: function () {
                var e = navigator.userAgent, t = navigator.platform, n = this.os = {}, o = this.browser = {},
                    a = e.match(/Web[kK]it[\/]{0,1}([\d.]+)/), i = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                    r = !!e.match(/\(Macintosh\; Intel /), s = e.match(/(iPad).*OS\s([\d_]+)/),
                    c = e.match(/(iPod)(.*OS\s([\d_]+))?/), u = !s && e.match(/(iPhone\sOS)\s([\d_]+)/),
                    l = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), g = /Win\d{2}|Windows/.test(t),
                    d = e.match(/Windows Phone ([\d.]+)/), f = l && e.match(/TouchPad/),
                    m = e.match(/Kindle\/([\d.]+)/), p = e.match(/Silk\/([\d._]+)/),
                    h = e.match(/(BlackBerry).*Version\/([\d.]+)/), v = e.match(/(BB10).*Version\/([\d.]+)/),
                    w = e.match(/(RIM\sTablet\sOS)\s([\d.]+)/), k = e.match(/PlayBook/),
                    A = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/), y = e.match(/Firefox\/([\d.]+)/),
                    C = e.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
                    x = e.match(/MSIE\s([\d.]+)/) || e.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
                    b = !A && e.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
                    T = b || e.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
                (o.webkit = !!a) && (o.version = a[1]), i && (n.android = !0, n.version = i[2]), u && !c && (n.ios = n.iphone = !0, n.version = u[2].replace(/_/g, ".")), s && (n.ios = n.ipad = !0, n.version = s[2].replace(/_/g, ".")), c && (n.ios = n.ipod = !0, n.version = c[3] ? c[3].replace(/_/g, ".") : null), g && (n.win = !0), d && (n.wp = !0, n.version = d[1]), l && (n.webos = !0, n.version = l[2]), f && (n.touchpad = !0), h && (n.blackberry = !0, n.version = h[2]), v && (n.bb10 = !0, n.version = v[2]), w && (n.rimtabletos = !0, n.version = w[2]), k && (o.playbook = !0), m && (n.kindle = !0, n.version = m[1]), p && (o.silk = !0, o.version = p[1]), !p && n.android && e.match(/Kindle Fire/) && (o.silk = !0), A && (o.chrome = !0, o.version = A[1]), y && (o.firefox = !0, o.version = y[1]), C && (n.firefoxos = !0, n.version = C[1]), x && (o.ie = !0, o.version = x[1]), T && (r || n.ios || g) && (o.safari = !0, n.ios || (o.version = T[1])), b && (o.webview = !0), n.tablet = !!(s || k || i && !e.match(/Mobile/) || y && e.match(/Tablet/) || x && !e.match(/Phone/) && e.match(/Touch/)), n.phone = !(n.tablet || n.ipod || !(i || u || l || h || v || A && e.match(/Android/) || A && e.match(/CriOS\/([\d.]+)/) || y && e.match(/Mobile/) || x && e.match(/Touch/)))
            }, getOSName: function () {
                var e = "not set", t = "Win32" == navigator.platform || "Windows" == navigator.platform,
                    n = "Mac68K" == navigator.platform || "MacIntel" == navigator.platform || "MacPPC" == navigator.platform || "Macintosh" == navigator.platform,
                    o = "X11" == navigator.platform && !t && !n;
                n && (e = "Mac"), o && (e = "Unix"), String(navigator.platform).indexOf("Linux") > -1 && (e = "Linux"), t && ((navigator.userAgent.indexOf("Win95") > -1 || navigator.userAgent.indexOf("Windows 95") > -1) && (e = "windows 95"), (navigator.userAgent.indexOf("Win98") > -1 || navigator.userAgent.indexOf("Windows 98") > -1) && (e = "windows 98"), (navigator.userAgent.indexOf("Windows 9x 4.90") > -1 || navigator.userAgent.indexOf("Windows ME") > -1) && (e = "windows ME"), (navigator.userAgent.indexOf("Windows NT 5.0") > -1 || navigator.userAgent.indexOf("Windows 2000") > -1) && (e = "windows 2000"), (navigator.userAgent.indexOf("Windows NT 5.1") > -1 || navigator.userAgent.indexOf("Windows XP") > -1) && (e = "windows XP"), (navigator.userAgent.indexOf("Windows NT 5.2") > -1 || navigator.userAgent.indexOf("Windows 2003") > -1) && (e = "windows 2003"), (navigator.userAgent.indexOf("Windows NT 6.0") > -1 || navigator.userAgent.indexOf("Windows Vista") > -1) && (e = "Windows Vista"), (navigator.userAgent.indexOf("Windows NT 6.1") > -1 || navigator.userAgent.indexOf("Windows 7") > -1) && (e = "Win7"), (navigator.userAgent.indexOf("Windows NT 6.2") > -1 || navigator.userAgent.indexOf("Windows 8") > -1) && (e = "Win8"));
                var a = navigator.userAgent.match(/(Android)[\s\/]+([\d\.]+)/), i = navigator.userAgent.match(/iPad/i),
                    r = navigator.userAgent.match(/iPhone/i), s = navigator.userAgent.match(/iPod/i),
                    c = navigator.userAgent.match(/(Windows\s+Phone)\s([\d\.]+)/);
                return a && (e = "Android"), i && (e = "iOS-Pad"), r && (e = "iOS-Phone"), s && (e = "iOS-Pod"), c && (e = "WindowsPhone"), e
            }, getBrowserName: function () {
                return this.browser.chrome ? "chrome" : this.browser.safari ? "safari" : this.browser.firefox ? "firefox" : this.browser.ie ? "ie" : "android"
            }, getCookie: function (e) {
                var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
                return null !== t ? t[2] : ""
            }, collect: function (e) {
                var t = this;
                e = e || window.event;
                for (var n, o = e ? e.target : e.srcElement; o.parentNode && "BODY" != o.nodeName && "HTML" != o.nodeName;) (n = o.getAttribute("m")) && t.saveClick(n, e.clientX, e.clientY), o = o.parentNode
            }, clearCache: function () {
                var e = new Date;
                e.setDate(e.getDate() - 1), document.cookie = "clickCache=; expires=" + e.toUTCString() + "; domain=tuniu.com; path=/"
            }, saveCache: function (e) {
                var t = new Date;
                t.setDate(t.getDate() + 7), document.cookie = "clickCache=" + encodeURIComponent(e) + "; expires=" + t.toUTCString() + "; domain=tuniu.com; path=/"
            }, getCache: function () {
                return decodeURIComponent(this.getCookie("clickCache"))
            }, saveClick: function (e, t, n) {
                var o = this, a = {text: e, x: t, y: n, lg: +new Date}, i = o.getCache() || "[]";
                i = JSON.parse(i);
                for (var r = !1, s = 0; s < i.length; s++) if (i[s].key == o.key) {
                    r = !0, i[s].events.push(a);
                    break
                }
                r || i.push({
                    key: o.key,
                    url: window.location.href,
                    pageName: window.PageName || "",
                    referer: document.referrer || "",
                    events: [a]
                }), o.saveCache(JSON.stringify(i))
            }, saveCustomEvent: function (e) {
                e.text && this.saveClick(e.text, e.x || 0, e.y || 0)
            }, bindEvent: function () {
                var e = this;
                e.domReady(function () {
                    e.addEvent(document.body, "click", function (t) {
                        e.collect(t)
                    })
                })
            }, domReady: function (e) {
                setTimeout(e, 0)
            }, addEvent: function (e, t, n) {
                e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent(t, n)
            }
        };
        e.init();
        var t = window.eventTrack;
        if (t && t.length) for (var n = 0; n < t.length; n++) e.saveCustomEvent(t[n]);
        window.eventTrack = {
            push: function (t) {
                e.saveCustomEvent(t)
            }
        }
    }()
}, , , , function (module, exports) {
    define("common_amd/tat", [], function () {
        function setCurrentTime() {
            var e = (new Date).getTime();
            return e
        }

        function isDefined(e) {
            return "undefined" != (e = typeof e) && "unknown" !== e
        }

        function apply(e) {
            var t = e.shift();
            "string" == typeof t ? asyncTracker[t].apply(this, e) : t.apply(this, e)
        }

        function addEventListener(e, t, n, o) {
            return e.addEventListener ? (e.addEventListener(t, n, o), !0) : e.attachEvent ? e.attachEvent("on" + t, n) : void(e["on" + t] = n)
        }

        function executePluginMethod(e, t) {
            var n, o, a = "";
            for (n in plugins) o = plugins[n][e], "function" == typeof o && (a += o(t));
            return a
        }

        function beforeUnloadHandler(e) {
            if (executePluginMethod("unload"), isDefined(expireDateTime)) {
                var t;
                do t = new Date; while (t.getTime() < expireDateTime)
            }
        }

        function loadHandler(e) {
            if (!hasLoaded) {
                hasLoaded = !0, executePluginMethod("load");
                for (var t = 0; t < registeredOnLoadHandlers.length; t++) registeredOnLoadHandlers[t]()
            }
            return !0
        }

        function addReadyListener() {
            documentAlias.addEventListener ? addEventListener(documentAlias, "DOMContentLoaded", function e() {
                documentAlias.removeEventListener("DOMContentLoaded", e, !1), loadHandler()
            }) : documentAlias.attachEvent && (documentAlias.attachEvent("onreadystatechange", function e() {
                "complete" === documentAlias.readyState && (documentAlias.detachEvent("onreadystatechange", e), loadHandler())
            }), documentAlias.documentElement.doScroll && windowAlias == windowAlias.top && !function e() {
                if (!hasLoaded) {
                    try {
                        documentAlias.documentElement.doScroll("left")
                    } catch (t) {
                        return void setTimeout(e, 0)
                    }
                    loadHandler()
                }
            }()), addEventListener(windowAlias, "load", loadHandler, !1)
        }

        function getReferrer() {
            var e = "";
            try {
                e = top.documentAlias.referrer
            } catch (t) {
                if (parent) try {
                    e = parent.documentAlias.referrer
                } catch (t) {
                    e = ""
                }
            }
            return "" === e && (e = documentAlias.referrer), e
        }

        function getHostname(e) {
            var t = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"), n = t.exec(e);
            return n ? n[1] : e
        }

        function getParameter(e, t) {
            var n = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+)[?])([^#]+)"), o = n.exec(e),
                a = new RegExp("(?:^|&)" + t + "=([^&]*)"), i = o ? a.exec(o[1]) : 0;
            return i ? unescapeWrapper(i[1]) : ""
        }

        function urlFixup(e, t, n) {
            return "webcache.googleusercontent.com" == e || "cc.bingj.com" == e || "74.6." == e.substr(0, 5) ? (t = documentAlias.links[0].href, e = getHostname(t)) : "translate.googleusercontent.com" == e && ("" === n && (n = t), t = getParameter(t, "u"), e = getHostname(t)), [e, t, n]
        }

        function Tracker() {
            function needSetUtmCookie(e) {
                return decodeURIComponent(e).indexOf("utm_source") > 0 && !hasCookie("tuniu_p_utm")
            }

            function isTuanUrl(e) {
                var t = /^http:\/\/tuan|^tuan/, n = new RegExp(t);
                return !!n.test(e)
            }

            function getBrowser() {
                var e = windowAlias.innerWidth, t = windowAlias.innerHeight;
                return "number" != typeof e && ("CSS1Compat" == documentAlias.compatMode ? (e = documentAlias.documentElement.clientWidth, t = documentAlias.documentElement.clientHeight) : null == documentAlias.body ? (e = 0, t = 0) : (e = documentAlias.body.clientWidth, t = documentAlias.body.clientHeight)), [e, t]
            }

            function getRequest() {
                var e = "", t = "";
                return navigatorAlias.cookieEnabled && (e = getAnalysisCookie()), "undefined" == typeof analyTuniuBeginTime || isNaN(analyTuniuBeginTime) || (loadSpend = loginTime - analyTuniuBeginTime), "undefined" == typeof analyTuniuSpend || isNaN(analyTuniuSpend) || (executeSpend = Math.floor(1e3 * analyTuniuSpend)), pageName || (pageName = visitUrl.split("?")[0]), t = "hw=" + browserHW + "&bt=" + browserType + "&bv=" + browserVersion + "&fu=" + escapeWrapper(fromUrl) + "&lg=" + loginTime + "&co=" + e + "&vu=" + escapeWrapper(visitUrl) + "&sr=" + screenResolution + "&sc=" + screenColor + "&os=" + operatingSystem + "&fv=" + flashVersion + "&la=" + language + "&je=" + javaEnabled + "&ce=" + cookieEnabled + "&tn=&pn=" + escapeWrapper(escapeWrapper(pageName)) + "&clt=" + linkType + "&ev=" + isEvent + "&ei=" + eventId + "&ps=" + loadSpend + "&es=" + executeSpend
            }

            function logPageView(e) {
                logPageViewRequest();
                var t = getRequest();
                sendRequest(t, configTrackerPause)
            }

            function logPageViewRequest(e) {
                e && (isEvent = 0)
            }

            function logLink(e, t) {
                fromUrl = locationArray[1], visitUrl = e, linkType = t, loginTime = setCurrentTime();
                var n = getRequest();
                sendRequest(n, configTrackerPause)
            }

            function sendRequest(e, t) {
                var n = new Date;
                expireDateTime = n.getTime() + t, getImage(e)
            }

            function getImage(e) {
                var t = new Image(1, 1);
                t.onLoad = function () {
                }, t.src = configTrackerURL + "?" + e + "&sid=" + getSid(), t = null
            }

            function getSid() {
                var e, t = "" + loginTime, n = "", o = "";
                t = t.substr(t.length - 8);
                for (var a = 0; a < t.length; a++) e = Math.floor(10 * Math.random()), o += e, n += t.charCodeAt(a) << e;
                return o + n
            }

            function isSiteHostName(e) {
                var t, n, o;
                for (t = 0; t < configHostsAlias.length; t++) {
                    if (n = configHostsAlias[t].toLowerCase(), e == n) return !0;
                    if (e.indexOf("tuniu")) return !0;
                    if ("*." == n.substr(0, 2)) {
                        if (e == n.substr(2)) return !0;
                        if (o = e.length - n.length + 1, o > 0 && e.substr(o) == n.substr(1)) return !0
                    }
                }
                return !1
            }

            function getClassesRegExp(e, t) {
                var n, o = "(^| )(piwik[_-]" + t;
                if (isDefined(e)) for (n = 0; n < e.length; n++) o += "|" + e[n];
                return o += ")( |$)", new RegExp(o)
            }

            function getLinkType(e, t, n) {
                if (!n) return "link";
                var o = getClassesRegExp(configDownloadClasses, "download"),
                    a = getClassesRegExp(configLinkClasses, "link"),
                    i = new RegExp("\\.(" + configDownloadExtensions + ")([?&#]|$)", "i");
                return a.test(e) ? "link" : o.test(e) || i.test(t) ? "download" : 0
            }

            function clickHandler(e) {
                var t, n, o, a, i, r, s, c;
                if (isDefined(e) || (e = windowAlias.event), isDefined(e.target)) t = e.target; else {
                    if (!isDefined(e.srcElement)) return;
                    t = e.srcElement
                }
                for (; (n = t.parentNode) && "A" != (o = t.tagName) && "AREA" != o;) t = n;
                isDefined(t.href) && (i = t.hostname, r = i.toLowerCase(), s = t.href.replace(i, r), c = new RegExp("^(javascript|vbscript|jscript|mocha|livescript|ecmascript): *", "i"), c.test(s) || (a = getLinkType(t.className, s, isSiteHostName(r)), a && logLink(s, a)))
            }

            function addClickListener(e) {
                addEventListener(e, "click", clickHandler, !1)
            }

            function addClickListeners() {
                if (!linkTrackingInstalled) {
                    linkTrackingInstalled = !0;
                    var e, t = getClassesRegExp(configIgnoreClasses, "ignore"), n = documentAlias.links;
                    if (n) for (e = 0; e < n.length; e++) t.test(n[e].className) || addClickListener(n[e])
                }
            }

            function registerHook(hookName, userHook) {
                var hookObj = null;
                if ("string" == typeof hookName && !isDefined(registeredHooks[hookName])) {
                    if ("object" == typeof userHook) hookObj = userHook; else if ("string" == typeof userHook) try {
                        eval("hookObj =" + userHook)
                    } catch (e) {
                    }
                    registeredHooks[hookName] = hookObj
                }
                return hookObj
            }

            function setAnalysisCookie() {
                setAnonyCookie(regUserCookieName, tacauName), setTraceCookie(tactName), setTaczCookie(taczName), setTacaCookie(taccName, tacbName, tacaName), setTacbCookie(taccName, tacbName), setTaccCookie(taccName)
            }

            function getAnalysisCookie() {
                setAnalysisCookie();
                var e = "";
                if (hasCookie(tacaName) && ("opera" === browserType && "" !== _opera_ta[0] ? (e += tacaName + "=" + _opera_ta[0] + ";", _opera_ta[0] = "") : e += tacaName + "=" + getCookie(tacaName) + ";"), hasCookie(tacbName) && ("opera" === browserType && "" !== _opera_ta[1] ? (e += tacbName + "=" + _opera_ta[1] + ";", _opera_ta[1] = "") : e += tacbName + "=" + getCookie(tacbName) + ";"), hasCookie(tacauName) && (e += tacauName + "=" + getCookie(tacauName) + ";"), hasCookie(tactName) && (e += tactName + "=" + getCookie(tactName) + ";"), hasCookie(taczName) && ("opera" === browserType && "" !== _opera_ta[2] ? (e += taczName + "=" + _opera_ta[2] + ";", _opera_ta[2] = "") : e += taczName + "=" + getCookie(taczName) + ";"), hasCookie("tuniu_partner") && (e += "tuniu_partner=" + getCookie("tuniu_partner") + ";"), hasCookie("tuniuuser") && (e += "tuniuuser=" + getCookie("tuniuuser") + ";"), hasCookie("tuniuuser_citycode") && (e += "tuniuuser_citycode=" + getCookie("tuniuuser_citycode") + ";"), hasCookie("tuniuuser_id") && (e += "tuniuuser_id=" + getCookie("tuniuuser_id") + ";"), null != navigatorAlias.userAgent && navigatorAlias.userAgent.length > 0 && (e += "userAgent=" + base64encode(escape(navigatorAlias.userAgent)) + ";"), "undefined" != typeof exposure && null != exposure && exposure.length > 0 && (e += "exposure=" + base64encode(escape(exposure)) + ";"), "undefined" != typeof abTest && null != abTest && 1 === abTest.length && (e += "abTest=" + abTest + ";"), "undefined" != typeof extendArray && extendArray instanceof Array) {
                    for (var t = [], n = 0; n < extendArray.length; n++) null != extendArray[n] && "" != trimStr(extendArray[n].toString()) && t.push(trimStr(extendArray[n].toString()));
                    t.length > 0 && (e += "extend=" + base64encode(t.join("#")) + ";")
                }
                return e += "ct=0;"
            }

            function trimStr(e) {
                return e.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            }

            function setTaczCookie(e, t) {
                new Array;
                if (hasCookie(e)) {
                    if (isSearchEnginePay()) return void resetTaczCookie(!0);
                    if (isSearchEngine()) return void resetTaczCookie(!0);
                    if (isCampaign()) return void resetTaczCookie(!0);
                    if (!(hasCookie(tacbName) && hasCookie(taccName) || isRight()) && isReferral()) return void resetTaczCookie(!0)
                } else setNewTaczCookie(t)
            }

            function setNewTaczCookie(e) {
                return isSearchEnginePay() ? void resetTaczCookie(!1) : isSearchEngine() ? void resetTaczCookie(!1) : isCampaign() ? void resetTaczCookie(!1) : isReferral() ? void resetTaczCookie(!1) : isReferral() ? void resetTaczCookie(!1) : (directInfo(), void resetTaczCookie(!1))
            }

            function getQueryStringRegExp(e, t) {
                var n = new RegExp("(^|&|\\?)" + t + "=([^&]*)(&|$|#)"), o = e.match(n);
                return o ? o[2] : ""
            }

            function resetTaczCookie(e) {
                var t;
                (e || "true" == e) && delCookie(taczName), t = "taccsr=" + sourceValue + "|tacccn=" + mediumValue + "|taccmd=" + campaignValue + "|taccct=" + termValue.replace(new RegExp("%", "g"), "%25") + "|taccrt=" + contentValue.replace(new RegExp("%", "g"), "%25"), setCookie(taczName, t, taczTimeoutHours, cookiePath, cookieDomain)
            }

            function directInfo() {
                sourceValue = "(direct)", mediumValue = "(none)", campaignValue = "(none)", termValue = "(none)", contentValue = "(none)"
            }

            function isReferral() {
                return !(isRight() || !getHostname(fromUrl)) && (sourceValue = getHostname(fromUrl), mediumValue = "(referral)", campaignValue = "(none)", termValue = "(none)", contentValue = "(none)", !0)
            }

            function isSearchEngine() {
                var e;
                return e = new Array, e = getSearchKey(), 2 == e.length && (sourceValue = e[0], mediumValue = "(organic)", campaignValue = getQueryStringRegExp(visitUrl, tam_cmp) ? getQueryStringRegExp(visitUrl, tam_cmp) : "(none)", termValue = e[1], contentValue = getQueryStringRegExp(visitUrl, tam_content) ? getQueryStringRegExp(visitUrl, tam_content) : getQueryStringRegExp(visitUrl, kw) ? getQueryStringRegExp(visitUrl, kw) : "(none)", !0)
            }

            function getSearchKey() {
                var e, t = organicEngine, n = organicKeyword;
                e = new Array;
                for (var o = 0; o < t.length; o++) if (fromUrl.indexOf(t[o]) > -1 && getQueryStringRegExp(fromUrl, n[o])) {
                    e[0] = t[o].replace(/(.*)(\.(com|cn|org).*)$/gi, "$1"), e[1] = getQueryStringRegExp(fromUrl, n[o]);
                    break
                }
                return e
            }

            function isSearchEnginePay() {
                var e, t = organicPayVaule, n = organicPayEngine;
                e = new Array;
                for (var o = 0; o < t.length; o++) if (t[o] == getQueryStringRegExp(visitUrl, tam_pay)) return mediumValue = "(cpc)", sourceValue = n[o], campaignValue = getQueryStringRegExp(visitUrl, tam_cmp) ? getQueryStringRegExp(visitUrl, tam_cmp) : getQueryStringRegExp(visitUrl, tam_campaign) ? getQueryStringRegExp(visitUrl, tam_campaign) : "(none)", e = getSearchKey(), termValue = 2 == e.length ? e[1] : "(none)", contentValue = getQueryStringRegExp(visitUrl, tam_content) ? getQueryStringRegExp(visitUrl, tam_content) : getQueryStringRegExp(visitUrl, kw) ? getQueryStringRegExp(visitUrl, kw) : "(none)", !0;
                return !1
            }

            function isCampaign() {
                return !!getQueryStringRegExp(visitUrl, tam_cmp) && (campaignValue = getQueryStringRegExp(visitUrl, tam_cmp), mediumValue = "(campaign)", sourceValue = fromUrl ? getHostname(fromUrl) : "(direct)", termValue = getQueryStringRegExp(visitUrl, tam_term) ? getQueryStringRegExp(visitUrl, tam_term) : "(none)", contentValue = getQueryStringRegExp(visitUrl, tam_content) ? getQueryStringRegExp(visitUrl, tam_content) : "(none)", !0)
            }

            function isRight() {
                for (var e = ignoredReferrer, t = e.length, n = 0; n < t; n++) if (getHostname(fromUrl).indexOf(e[n]) > -1) return !0;
                return !1
            }

            function setAnonyCookie(e, t) {
                if (hasCookie(e)) hasCookie(t) && delCookie(t); else if (0 == hasCookie(t)) {
                    var n = "0," + newGuid() + ",";
                    setCookie(t, base64encode(n), 360, cookiePath, cookieDomain)
                }
            }

            function setTraceCookie(e) {
                hasCookie(e) ? resetCookie(e, tacaTimeoutHours, cookiePath, cookieDomain) : setCookie(e, base64encode(newGuid()), tacaTimeoutHours, cookiePath, cookieDomain)
            }

            function setTaccCookie(e) {
                0 == hasCookie(e) && setCookie(e, "1", "", cookiePath, cookieDomain)
            }

            function setTacbCookie(e, t) {
                hasCookie(e) ? hasCookie(t) ? resetCookie(t, tacbTimeoutHours, cookiePath, cookieDomain) : setCookie(t, base64encode(newGuid()), tacbTimeoutHours, cookiePath, cookieDomain) : hasCookie(t) ? (delCookie(t), setCookie(t, base64encode(newGuid()), tacbTimeoutHours, cookiePath, cookieDomain)) : setCookie(t, base64encode(newGuid()), tacbTimeoutHours, cookiePath, cookieDomain)
            }

            function setTacaCookie(e, t, n) {
                hasCookie(e) && hasCookie(t) ? 0 == hasCookie(n) && setFirstTacaCookie() : hasCookie(n) ? resetTacaCookie(n) : setFirstTacaCookie()
            }

            function resetTacaCookie(e) {
                var t = getCookie(e), n = t.split(".");
                delCookie(e), t = n[0] + "." + n[2] + "." + loginTime + "." + (parseInt(n[3]) + 1), setCookie(e, t, tacaTimeoutHours, cookiePath, cookieDomain)
            }

            function setFirstTacaCookie() {
                var e = 1, t = loginTime + "." + loginTime + "." + loginTime + "." + e;
                setCookie(tacaName, t, tacaTimeoutHours, cookiePath, cookieDomain)
            }

            function setCookie(e, t, n, o, a) {
                var i;
                "opera" === browserType && ("_taca" === e ? _opera_ta[0] = t : "_tacb" === e ? _opera_ta[1] = t : "_tacz" === e && (_opera_ta[2] = t)), n && (i = new Date, i.setTime(i.getTime() + 36e5 * n)), documentAlias.cookie = e + "=" + escape(t) + (n ? ";expires=" + i.toGMTString() : "") + ";path=" + (o ? o : "/") + (a ? ";domain=" + a : "")
            }

            function resetCookie(e, t, n, o) {
                var a = getCookie(e);
                delCookie(e), setCookie(e, a, t, n, o)
            }

            function hasCookie(e) {
                var t, n = documentAlias.cookie, o = 0, a = n.length;
                for (e += "="; o < a;) {
                    if (t = o + e.length, n.substring(o, t) == e) return !0;
                    if (o = n.indexOf(" ", o) + 1, 0 == o) break
                }
                return !1
            }

            function delCookie(e) {
                var t = new Date, n = getCookie(e);
                t.setTime(t.getTime() - 1), null != n && (documentAlias.cookie = e + "=" + n + ";expires=" + t.toGMTString())
            }

            function getCookie(e) {
                var t = documentAlias.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
                return null != t ? unescape(t[2]) : null
            }

            function getPlatform() {
                var e = "not set", t = "Win32" == navigatorAlias.platform || "Windows" == navigatorAlias.platform,
                    n = "Mac68K" == navigatorAlias.platform || "MacPPC" == navigatorAlias.platform || "Macintosh" == navigatorAlias.platform,
                    o = "X11" == navigatorAlias.platform && !t && !n;
                return n && (e = "Mac"), o && (e = "Unix"), String(navigator.platform).indexOf("Linux") > -1 && (e = "Linux"), t && ((navigatorAlias.userAgent.indexOf("Win95") > -1 || navigatorAlias.userAgent.indexOf("Windows 95") > -1) && (e = "windows 95"), (navigatorAlias.userAgent.indexOf("Win98") > -1 || navigatorAlias.userAgent.indexOf("Windows 98") > -1) && (e = "windows 98"), (navigatorAlias.userAgent.indexOf("Windows 9x 4.90") > -1 || navigatorAlias.userAgent.indexOf("Windows ME") > -1) && (e = "windows ME"), (navigatorAlias.userAgent.indexOf("Windows NT 5.0") > -1 || navigatorAlias.userAgent.indexOf("Windows 2000") > -1) && (e = "windows 2000"), (navigatorAlias.userAgent.indexOf("Windows NT 5.1") > -1 || navigatorAlias.userAgent.indexOf("Windows XP") > -1) && (e = "windows XP"), (navigatorAlias.userAgent.indexOf("Windows NT 5.2") > -1 || navigatorAlias.userAgent.indexOf("Windows 2003") > -1) && (e = "windows 2003"), (navigatorAlias.userAgent.indexOf("Windows NT 6.0") > -1 || navigatorAlias.userAgent.indexOf("Windows Vista") > -1) && (e = "Windows Vista"), (navigatorAlias.userAgent.indexOf("Windows NT 6.1") > -1 || navigatorAlias.userAgent.indexOf("Windows 7") > -1) && (e = "Win7"), (navigatorAlias.userAgent.indexOf("Windows NT 6.2") > -1 || navigatorAlias.userAgent.indexOf("Windows 8") > -1) && (e = "Win8")), android = navigatorAlias.userAgent.match(/(Android)[\s\/]+([\d\.]+)/), iPad = navigatorAlias.userAgent.match(/iPad/i), iPhone = navigatorAlias.userAgent.match(/iPhone/i), iPod = navigatorAlias.userAgent.match(/iPod/i), windowsPhone = navigatorAlias.userAgent.match(/(Windows\s+Phone)\s([\d\.]+)/), android && (e = "Android"), iPad && (e = "iOS-Pad"), iPhone && (e = "iOS-Phone"), iPod && (e = "iOS-Pod"), windowsPhone && (e = "WindowsPhone"), e
            }

            function _uFlash() {
                var e, t = "-";
                if (navigatorAlias.plugins && navigatorAlias.plugins.length) {
                    for (var n = 0; n < navigatorAlias.plugins.length; n++) if (navigatorAlias.plugins[n].name.indexOf("Shockwave Flash") != -1) {
                        t = navigatorAlias.plugins[n].description.split("Shockwave Flash ")[1];
                        break
                    }
                } else {
                    try {
                        e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), t = e.GetVariable("$version")
                    } catch (e) {
                    }
                    if ("-" == t) try {
                        e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), t = "WIN 6,0,21,0", e.AllowScriptAccess = "always", t = e.GetVariable("$version")
                    } catch (e) {
                    }
                    if ("-" == t) try {
                        e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), t = e.GetVariable("$version")
                    } catch (e) {
                    }
                    "-" != t && (t = t.split(" ")[1].split(","), t = t[0] + "." + t[1] + " r" + t[2])
                }
                return t
            }

            function newGuid() {
                for (var e, t = "", n = 1; n <= 32; n++) e = Math.floor(16 * Math.random()).toString(16), t += e, 8 != n && 12 != n && 16 != n && 20 != n || (t += "-");
                return t
            }

            function base64encode(e) {
                e = utf16to8(e);
                for (var t, n, o, a = "", i = 0, r = e.length, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; i < r;) {
                    if (t = 255 & e.charCodeAt(i++), i == r) {
                        a += s.charAt(t >> 2), a += s.charAt((3 & t) << 4), a += "==";
                        break
                    }
                    if (n = e.charCodeAt(i++), i == r) {
                        a += s.charAt(t >> 2), a += s.charAt((3 & t) << 4 | (240 & n) >> 4), a += s.charAt((15 & n) << 2), a += "=";
                        break
                    }
                    o = e.charCodeAt(i++), a += s.charAt(t >> 2), a += s.charAt((3 & t) << 4 | (240 & n) >> 4), a += s.charAt((15 & n) << 2 | (192 & o) >> 6), a += s.charAt(63 & o)
                }
                return a
            }

            function utf16to8(e) {
                var t, n, o, a;
                for (t = "", o = e.length, n = 0; n < o; n++) a = e.charCodeAt(n), a >= 1 && a <= 127 ? t += e.charAt(n) : a > 2047 ? (t += String.fromCharCode(224 | a >> 12 & 15), t += String.fromCharCode(128 | a >> 6 & 63), t += String.fromCharCode(128 | a >> 0 & 63)) : (t += String.fromCharCode(192 | a >> 6 & 31), t += String.fromCharCode(128 | a >> 0 & 63));
                return t
            }

            var registeredHooks = {}, configTrackerPause = 500,
                locationArray = urlFixup(windowAlias.location.hostname, windowAlias.location.href, getReferrer()),
                locationHostnameAlias = locationArray[0], configHostsAlias = [locationHostnameAlias],
                configIgnoreClasses = [], configDownloadClasses = [], configLinkClasses = [],
                ignoredReferrer = [".tuniu.com"],
                organicEngine = ["baidu.com", "baidu.com", "baidu.com", "baidu.com", "baidu.com", "baidu.com", "baidu.com", "baidu.com", "baidu.com", "baidu.com", "google.com", "google.cn", "sogou.com", "zhongsou.com", "search.yahoo.com", "one.cn.yahoo.com", "soso.com", "114search.118114.cn", "youdao.com", "gougou.com", "bing.com", "qihoo.com", "21cn.com", "goso.cn", "so.360.cn", "so.360.cn", "www.so.com", "www.so.com"],
                organicKeyword = ["word", "wd", "query", "q1", "q2", "q3", "q4", "q5", "q6", "w", "q", "q", "query", "w", "p", "p", "w", "kw", "q", "search", "q", "kw", "keyword", "q", "q", "u", "u", "q"],
                organicPayVaule = ["1044", "1558", "1045", "1559", "1499", "1326", "12358", "12991"],
                organicPayEngine = ["baidu", "baidu", "google", "google", "sogou", "soso", "youdao", "bing"],
                tam_source = "utm_source", tam_medium = "utm_medium", tam_campaign = "utm_campaign",
                tam_content = "utm_content", kw = "kw", tam_term = "utm_term", tam_cmp = "cmpid", tam_pay = "p",
                sourceValue = "", mediumValue = "", campaignValue = "", termValue = "", contentValue = "",
                linkTrackingInstalled = !1, cpro = documentAlias.location.protocol, chost = "analy.tuniu.cn",
                cgif = "analysisCollect/dataCollect.action", configTrackerURL = cpro + "//" + chost + "/" + cgif,
                cPageNotFoundDomain = "www.tuniu.com", cPageNotFoundPage = "html/404.html",
                url404Default = cpro + "//" + cPageNotFoundDomain + "/" + cPageNotFoundPage, fromUrl = locationArray[2],
                visitUrl = locationArray[1], browserArray = getBrowser(),
                browserHW = browserArray[1] + "*" + browserArray[0], screenColor = screenAlias.colorDepth,
                screenResolution = screenAlias.width + "*" + screenAlias.height, operatingSystem = getPlatform(),
                userAgent = navigatorAlias.userAgent.toLowerCase(), browserType, browserTypeMatch, browserVersion,
                browserVersionMatch, flashVersion = _uFlash(), javaEnabled = 1, language = "-",
                cookieEnabled = navigatorAlias.cookieEnabled ? "1" : "0", titleName = documentAlias.title,
                pageName = "",
                configDownloadExtensions = "7z|aac|ar[cj]|as[fx]|bin|csv|deb|dmg|doc|docx|exe|gz|gzip|hqx|jar|ms[ip]|od[bfgpst]|og[gv]|pdf|ppt|pptx|pub|qtm?|ra[mr]?|rpm|sea|sit|tar|t?bz2?|tgz|torrent|txt|wav|wm[av]|wpd|xls|xlsx|xml|z|zip|vsd",
                tacaName = "_taca", tacbName = "_tacb", taccName = "_tacc", regUserCookieName = "tuniuuser",
                tacauName = "_tacau", tactName = "_tact", taczName = "_tacz2", cookieDomain = ".tuniu.com",
                cookiePath = "/", tacbTimeoutHours = .5, tacaTimeoutHours = 17520, taczTimeoutHours = 720,
                loadSpend = -1, executeSpend = -1, isEvent = 0, eventId = "", linkType = "link";
            return browserTypeMatch = userAgent.match(/(?:firefox|opera|safari|chrome|msie|micromessenger)/), browserType = browserTypeMatch && browserTypeMatch[0] ? browserTypeMatch[0] : "unknown", browserVersionMatch = userAgent.match(/(?:firefox|opera|safari|chrome|msie|micromessenger)[\/: ]([\d.]+)/), browserVersion = browserVersionMatch && browserVersionMatch[1] ? browserVersionMatch[1] : "unknown", linkTrackingInstalled = !1, javaEnabled = navigatorAlias.javaEnabled() ? 1 : 0, "Netscape" === navigatorAlias.appName && (screenColor = screenAlias.pixelDepth), navigatorAlias.language ? language = navigatorAlias.language.toLowerCase() : navigatorAlias.browserLanguage && (language = navigatorAlias.browserLanguage.toLowerCase()), executePluginMethod("run", registerHook), {
                setTrackerURL: function (e) {
                    isDefined(e) && (configTrackerURL = e)
                }, setSessionCookieTimeout: function (e) {
                    isDefined(e) && (tacbTimeoutHours = parseFloat(e) / 36e5)
                }, setVisitorCookieTimeout: function (e) {
                    isDefined(e) && (tacaTimeoutHours = parseFloat(e) / 36e5)
                }, addOrganic: function (e, t, n) {
                    isDefined(e) && isDefined(t) && isDefined(n) && (1 == n ? (organicEngine.unshift(e), organicKeyword.unshift(t)) : (organicEngine.push(e), organicKeyword.push(t)))
                }, setTrafficSourceCookieTimeout: function (e) {
                    isDefined(e) && (taczTimeoutHours = parseFloat(e) / 36e5)
                }, setPageName: function (e) {
                    isDefined(e) && (pageName = e)
                }, trackEvent: function (e) {
                    isDefined(e) && (isEvent = 1, eventId = e, loginTime = setCurrentTime(), logPageView())
                }, addSearchPay: function (e, t) {
                    isDefined(e) && isDefined(t) && (organicPayVaule.push(e), organicPayEngine.push(t))
                }, setCampaignArg: function (e) {
                    isDefined(e) && (tam_cmp = e)
                }, setSearchPayArg: function (e) {
                    isDefined(e) && (tam_pay = e)
                }, setDocumentTitle: function (e) {
                    isDefined(e) && (titleName = e)
                }, addDownloadExtensions: function (e) {
                    isDefined(e) && (configDownloadExtensions += "|" + e)
                }, enableLinkTracking: function () {
                    hasLoaded ? addClickListeners() : registeredOnLoadHandlers[registeredOnLoadHandlers.length] = function () {
                        addClickListeners()
                    }
                }, setPageNotFoundUrl: function (e) {
                    if (isDefined(e)) {
                        var t = e.indexOf("___");
                        t > -1 && (visitUrl = e.substr(0, t), "/404/url/" == visitUrl && (visitUrl += url404Default), fromUrl = e.substr(t + 3))
                    }
                }, setDefaultPageNotFoundUrl: function () {
                    visitUrl = "/404/url/" + url404Default
                }, trackLink: function (e, t) {
                    logLink(e, t)
                }, trackPageView: function () {
                    logPageView()
                }
            }
        }

        function TrackerProxy() {
            return {push: apply}
        }

        var expireDateTime, loginTime = setCurrentTime(), plugins = {}, hasLoaded = !1, registeredOnLoadHandlers = [],
            documentAlias = document, navigatorAlias = navigator, screenAlias = screen, windowAlias = window,
            escapeWrapper = windowAlias.encodeURIComponent || escape,
            unescapeWrapper = windowAlias.decodeURIComponent || unescape, _opera_ta = ["", "", ""],
            _tac = window._tac || [], asyncTracker = new Tracker;
        addEventListener(windowAlias, "beforeunload", beforeUnloadHandler, !1), addReadyListener();
        for (var index = 0; index < _tac.length; index++) apply(_tac[index]);
        return _tac = new TrackerProxy, {
            getTracker: function () {
                return new Tracker
            }
        }
    })
}]);
;define('common_amd/tool', [], function () {
    var tool = {
        event: {
            observe: function (o, type, fn, capture) {
                if (o.addEventListener) {
                    o.addEventListener(type, fn, !!capture);
                } else {
                    o.attachEvent('on' + type, fn);
                }
            }, unobserve: function (o, type, fn, capture) {
                if (o.removeEventListener) {
                    o.removeEventListener(type, fn, !!capture);
                } else {
                    o.detachEvent('on' + type, fn);
                }
            }, throttle: function (fn, delay) {
                var timer = null;
                return function () {
                    var _this = this;
                    var args = arguments;
                    if (!timer) {
                        timer = window.setTimeout(function () {
                            fn.apply(_this, args);
                            timer = null;
                        }, delay || 100);
                    }
                };
            }, debounce: function (fn, delay) {
                var timer = null;
                delay = delay || 100;
                return function () {
                    var _this = this;
                    var args = arguments;
                    window.clearTimeout(timer);
                    timer = window.setTimeout(function () {
                        fn.apply(_this, args);
                    }, delay);
                };
            }
        }, each: function (o, callback) {
            if (o.length === +o.length) {
                for (var i = 0, l = o.length; i < l; i++) {
                    callback(o[i], i);
                }
            } else {
                for (var k in o) {
                    o.hasOwnProperty(k) && callback(o[k], k);
                }
            }
        }, every: function (arr, callback) {
            for (var i = 0, l = arr.length; i < l; i++) {
                if (!callback(arr[i], i)) {
                    break;
                }
            }
        }, get: function (url, callback) {
            var xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest;
            } else {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 304) {
                        callback && callback(xhr.responseText);
                    }
                }
            };
            xhr.send();
        }, getScript: function (src, callback) {
            var loaded = false;
            var script = document.createElement('script');
            script.src = src;
            if (callback) {
                script.onload = script.onreadystatechange = function () {
                    if (loaded) {
                        return;
                    }
                    loaded = true;
                    if (!this.readyState || /complete|loaded/.test(this.readyState)) {
                        callback.call(this);
                    }
                };
            }
            document.body.appendChild(script);
        }, delay: function (fn, milliseconds) {
            milliseconds = milliseconds || 1000;
            window.setTimeout(fn, milliseconds);
        }, loadcss: function loadcss(url) {
            if (document.createStyleSheet) {
                document.createStyleSheet(url);
            } else {
                var link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = url;
                document.getElementsByTagName("head")[0].appendChild(link);
            }
        }, imgcache: (function () {
            var canvas = document.createElement('canvas'), storage = window.localStorage, ctx,
                support = !!(storage && canvas.toDataURL && canvas.getContext && (ctx = canvas.getContext('2d')));
            return {
                support: support, get: function (key, config) {
                    var ver = config && config.ver, ver_key = key + '_ver', src;
                    if (!support) return false;
                    if (ver && storage.getItem(ver_key) == ver && (src = storage.getItem(key))) {
                        return src;
                    }
                    return false;
                }, set: function (key, src, config, callback) {
                    var ver = config && config.ver, ver_key = key + '_ver', img = new Image, imgonload;
                    if (!support) return false;
                    if (!ver) return false;
                    img.crossOrigin = '';
                    img.src = src;
                    imgonload = function () {
                        canvas.width = img.naturalWidth || img.width;
                        canvas.height = img.naturalHeight || img.height;
                        ctx.drawImage(img, 0, 0);
                        src = canvas.toDataURL();
                        storage.setItem(key, src);
                        storage.setItem(ver_key, ver);
                        callback && callback('succeed');
                    };
                    if (img.complete) {
                        imgonload();
                    } else {
                        img.onload = img.onerror = function (e) {
                            e = e || window.event;
                            if (e.type === 'load') {
                                imgonload();
                            } else {
                                callback && callback('failed');
                            }
                        };
                    }
                }, remove: function (key) {
                    if (!support) return false;
                    storage.removeItem(key);
                    storage.removeItem(key + '_ver');
                }
            };
        }()), jscodecache: {
            get: function (key, config, src, callback) {
                var code, script, ver = config && config.ver, ver_key = key + '_ver', storage = window.localStorage,
                    getScript = tool.getScript;
                if (ver && storage) {
                    if (storage.getItem(ver_key) == ver && (code = storage.getItem(key))) {
                        try {
                            eval(code);
                            callback && callback('cache');
                        } catch (ex) {
                            getScript(src, callback);
                        }
                    } else {
                        getScript(src, callback);
                    }
                } else {
                    getScript(src, callback);
                }
            }, remove: function (key) {
                var storage;
                if (storage = window.localStorage) {
                    storage.removeItem(key);
                    storage.removeItem(key + '_ver');
                }
            }
        }, cookie: {
            set: function (key, val, path, domain, expireseconds) {
                val = escape(val);
                var exdate, str = key + '=' + val;
                str += path ? ';path=' + path : '';
                str += domain ? ';domain=' + domain : '';
                if (expireseconds != undefined) {
                    exdate = new Date;
                    exdate.setTime(exdate.getTime() + expireseconds * 1000);
                    str += ';expires=' + exdate.toGMTString();
                }
                document.cookie = str;
            }, get: function (key) {
                if (document.cookie.length > 0) {
                    var start = document.cookie.indexOf(key + '='), end;
                    if (start !== -1) {
                        start += key.length + 1;
                        end = document.cookie.indexOf(';', start);
                        if (end === -1) end = document.cookie.length;
                        return unescape(document.cookie.substring(start, end));
                    }
                }
                return '';
            }
        }, base64: {
            encode: function (str) {
                var out, i, len;
                var c1, c2, c3;
                var encodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                len = str.length;
                i = 0;
                out = "";
                while (i < len) {
                    c1 = str.charCodeAt(i++) & 0xff;
                    if (i == len) {
                        out += encodeChars.charAt(c1 >> 2);
                        out += encodeChars.charAt((c1 & 0x3) << 4);
                        out += "==";
                        break;
                    }
                    c2 = str.charCodeAt(i++);
                    if (i == len) {
                        out += encodeChars.charAt(c1 >> 2);
                        out += encodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                        out += encodeChars.charAt((c2 & 0xF) << 2);
                        out += "=";
                        break;
                    }
                    c3 = str.charCodeAt(i++);
                    out += encodeChars.charAt(c1 >> 2);
                    out += encodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += encodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                    out += encodeChars.charAt(c3 & 0x3F);
                }
                return out;
            }, decode: function (str) {
                var c1, c2, c3, c4;
                var i, len, out;
                var decodeChars = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
                len = str.length;
                i = 0;
                out = "";
                while (i < len) {
                    do {
                        c1 = decodeChars[str.charCodeAt(i++) & 0xff];
                    }
                    while (i < len && c1 == -1);
                    if (c1 == -1)
                        break;
                    do {
                        c2 = decodeChars[str.charCodeAt(i++) & 0xff];
                    }
                    while (i < len && c2 == -1);
                    if (c2 == -1)
                        break;
                    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                    do {
                        c3 = str.charCodeAt(i++) & 0xff;
                        if (c3 == 61)
                            return out;
                        c3 = decodeChars[c3];
                    }
                    while (i < len && c3 == -1);
                    if (c3 == -1)
                        break;
                    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
                    do {
                        c4 = str.charCodeAt(i++) & 0xff;
                        if (c4 == 61)
                            return out;
                        c4 = decodeChars[c4];
                    }
                    while (i < len && c4 == -1);
                    if (c4 == -1)
                        break;
                    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
                }
                return out;
            }, utf16to8: function (str) {
                var out, i, len, c;
                out = "";
                len = str.length;
                for (i = 0; i < len; i++) {
                    c = str.charCodeAt(i);
                    if ((c >= 0x0001) && (c <= 0x007F)) {
                        out += str.charAt(i);
                    }
                    else if (c > 0x07FF) {
                        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                    }
                    else {
                        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                    }
                }
                return out;
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
                            break;
                    }
                }
                return out;
            }
        }
    };
    var tuniu_cachejscode = function (config) {
        var storage = window.localStorage;
        if (config && storage) {
            storage.setItem(config.key, config.code);
            storage.setItem(config.key + '_ver', config.ver);
        }
    };
    window.tuniu_cachejscode = tuniu_cachejscode;
    return tool;
});
;define('common_amd/zeus', ['common_amd/tool'], function (tool) {
    var base64 = tool.base64, base64encode = base64.encode, base64decode = base64.decode, utf8to16 = base64.utf8to16,
        utf16to8 = base64.utf16to8;
    var _zeus;
    var windowAlias = window, visitUrl = windowAlias.location.href, currentTime = '', hostName = 'tuniu.com';

    function isInCookie(needle, haystack) {
        for (s = 0; s < haystack.length; s++) {
            thisEntry = haystack[s].toString();
            if (thisEntry == needle) {
                return true;
            }
        }
    }

    function getCookie(name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) return unescape(arr[2]);
        return null;
    }

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
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    function getCurrentTime() {
        return new Date().Format("yyyy-MM-dd hh:mm:ss");
    }

    function getHostname(url) {
        var e = new RegExp('^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)'), matches = e.exec(url);
        return matches ? matches[1].substring(matches[1].indexOf('.')) : url;
    }

    function setZeusCookie(code) {
        currentTime = getCurrentTime();
        hostName = getHostname(visitUrl);
        var zeusStr = base64encode(utf16to8(code + '::' + visitUrl + '::' + currentTime));
        var zeusCookieStrArr, zeusCookieStr = getCookie('tuniu_zeus');
        if (zeusCookieStr != '' && zeusCookieStr != null) {
            var zeusCookieStrArr = String(zeusCookieStr).split(",");
            if (zeusCookieStrArr.length > 10) {
                zeusCookieStrArr.shift();
            }
            zeusCookieStr = zeusCookieStrArr.join(",");
            if (!isInCookie(zeusStr, zeusCookieStrArr)) {
                var value = zeusCookieStr + ',' + zeusStr;
                tool.cookie.set('tuniu_zeus', value, '/', hostName, 30 * 24 * 3600);
            }
        } else {
            tool.cookie.set('tuniu_zeus', zeusStr, '/', hostName, 30 * 24 * 3600);
        }
    }

    function Recorder() {
        return {
            push: function (code) {
                if (code != undefined && code != '') {
                    setZeusCookie(code);
                }
            }
        };
    }

    return {
        getRecorder: function () {
            return new Recorder();
        }
    };
});
;define('index_amd/stat', ['common_amd/tat', 'common_amd/zeus'], function (tat, zeus) {
    var startGa = function (pageView) {
        var _gaq = window._gaq || [];
        _gaq.push(["_setAllowHash", false]);
        _gaq.push(["_setAllowAnchor", true]);
        _gaq.push(["_addOrganic", "baidu", "wd"]);
        _gaq.push(["_addOrganic", "baidu", "word"]);
        _gaq.push(["_addOrganic", "google", "q"]);
        _gaq.push(["_addOrganic", "118114", "kw"]);
        _gaq.push(["_addOrganic", "bing", "q"]);
        _gaq.push(["_addOrganic", "soso", "w"]);
        _gaq.push(["_addOrganic", "youdao", "q"]);
        _gaq.push(["_addOrganic", "sogou", "query"]);
        _gaq.push(["_addOrganic", "360", "q"]);
        _gaq.push(["_addOrganic", "baidu", "w"]);
        _gaq.push(["_addOrganic", "baidu", "q1"]);
        _gaq.push(["_addOrganic", "baidu", "q2"]);
        _gaq.push(["_addOrganic", "baidu", "q3"]);
        _gaq.push(["_addOrganic", "baidu", "q4"]);
        _gaq.push(["_addOrganic", "baidu", "q5"]);
        _gaq.push(["_addOrganic", "baidu", "q6"]);
        _gaq.push(["_addOrganic", "baidu", "q6"]);
        _gaq.push(["_setDomainName", "tuniu.com"]);
        _gaq.push(["_setAccount", "UA-4782081-5"]);
        _gaq.push(["_trackPageview", pageView]);
    };
    var startTat = function (pageName) {
        var analyTuniuSpend = 0.004;
        var tuniuTracker = tat.getTracker();
        tuniuTracker.setPageName(pageName);
        tuniuTracker.addOrganic("www.so.com", "u");
        tuniuTracker.addOrganic("www.so.com", "q");
        tuniuTracker.addOrganic("so.360.cn", "u");
        tuniuTracker.addOrganic("so.360.cn", "q");
        tuniuTracker.addOrganic("baidu.com", "w");
        tuniuTracker.addOrganic("baidu.com", "q1");
        tuniuTracker.addOrganic("baidu.com", "q2");
        tuniuTracker.addOrganic("baidu.com", "q3");
        tuniuTracker.addOrganic("baidu.com", "q4");
        tuniuTracker.addOrganic("baidu.com", "q5");
        tuniuTracker.addOrganic("baidu.com", "q6");
        tuniuTracker.trackPageView();
        tuniuTracker.enableLinkTracking();
    };
    var startOther = function () {
        var tuniuRecorder = zeus.getRecorder();
        window.tuniuRecorder = tuniuRecorder;
        window._hmt = window._hmt || [];
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?51d49a7cda10d5dd86537755f081cc02";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    };
    return {
        start: function (param) {
            startTat(param.pageName);
            startOther();
        }
    };
});
;require(['index_amd/stat'], function (stat) {
    stat.start({pageView: window.GaPageName, pageName: window.PageName});
});