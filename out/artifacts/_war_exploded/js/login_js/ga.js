!function (e) {
    function t(i) {
        if (o[i]) return o[i].exports;
        var a = o[i] = {exports: {}, id: i, loaded: !1};
        return e[i].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
    }

    var o = {};
    return t.m = e, t.c = o, t.p = "", t(0)
}([function (e, t, o) {
    o(3), o(1), e.exports = o(2)
}, function (e, t) {
    !function () {
        var e = {
            init: function () {
                this.key = +new Date, this.bindEvent(), this.getOS(), this.POST_URL = "//analy.tuniu.cn/analysisCollect/dataCollectEvent.action", this.postCache()
            }, postCache: function (e) {
                var t, o = this;
                if (e || (t = localStorage.getItem("clickCache"), t && (e = JSON.parse(t))), e) {
                    for (var i = 0; i < e.length; i++) delete e[i].key;
                    var a = new XMLHttpRequest;
                    a.open("post", o.POST_URL), a.onreadystatechange = function () {
                        4 == a.readyState && 200 == a.status && localStorage.removeItem("clickCache")
                    }, a.send(JSON.stringify({
                        sid: o.getSid(),
                        sr: screen.width + "*" + screen.height,
                        sc: screen.colorDepth,
                        hw: window.innerHeight + "*" + window.innerWidth,
                        os: o.getOSName(),
                        bt: o.getBrowserName(),
                        bv: o.browser.version,
                        storage: e,
                        co: "_taca =" + o.getCookie("_taca") + ";tuniuuser=" + o.getCookie("tuniuuser") + ";_tact=" + o.getCookie("_tact") + ";tuniu_partner=" + o.getCookie("tuniu_partner") + ";tuniuuser_id=" + o.getCookie("tuniuuser_id") + ";tuniuuser_citycode=" + o.getCookie("tuniuuser_citycode") + ";dfyoo_user_id=" + o.getCookie("dfyoo_user_id") + ";company_id=" + o.getCookie("company_id") + ";client_type=" + (o.os.phone ? 20 : 0) + ";token=" + o.getCookie("token") + ";sessionId=" + o.getCookie("sessionId")
                    }))
                }
            }, getSid: function () {
                var e, t = new Date, o = "" + t, i = "", a = "";
                o = o.substr(o.length - 8);
                for (var n = 0; n < o.length; n++) e = Math.floor(10 * Math.random()), a += e, i += o.charCodeAt(n) << e;
                return a + i
            }, getOS: function () {
                var e = navigator.userAgent, t = navigator.platform, o = this.os = {}, i = this.browser = {},
                    a = e.match(/Web[kK]it[\/]{0,1}([\d.]+)/), n = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                    r = !!e.match(/\(Macintosh\; Intel /), s = e.match(/(iPad).*OS\s([\d_]+)/),
                    c = e.match(/(iPod)(.*OS\s([\d_]+))?/), u = !s && e.match(/(iPhone\sOS)\s([\d_]+)/),
                    l = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), d = /Win\d{2}|Windows/.test(t),
                    g = e.match(/Windows Phone ([\d.]+)/), m = l && e.match(/TouchPad/),
                    f = e.match(/Kindle\/([\d.]+)/), p = e.match(/Silk\/([\d._]+)/),
                    h = e.match(/(BlackBerry).*Version\/([\d.]+)/), k = e.match(/(BB10).*Version\/([\d.]+)/),
                    v = e.match(/(RIM\sTablet\sOS)\s([\d.]+)/), w = e.match(/PlayBook/),
                    C = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/), y = e.match(/Firefox\/([\d.]+)/),
                    A = e.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
                    T = e.match(/MSIE\s([\d.]+)/) || e.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
                    b = !C && e.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
                    x = b || e.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
                (i.webkit = !!a) && (i.version = a[1]), n && (o.android = !0, o.version = n[2]), u && !c && (o.ios = o.iphone = !0, o.version = u[2].replace(/_/g, ".")), s && (o.ios = o.ipad = !0, o.version = s[2].replace(/_/g, ".")), c && (o.ios = o.ipod = !0, o.version = c[3] ? c[3].replace(/_/g, ".") : null), g && (o.wp = !0, o.version = g[1]), l && (o.webos = !0, o.version = l[2]), m && (o.touchpad = !0), h && (o.blackberry = !0, o.version = h[2]), k && (o.bb10 = !0, o.version = k[2]), v && (o.rimtabletos = !0, o.version = v[2]), w && (i.playbook = !0), f && (o.kindle = !0, o.version = f[1]), p && (i.silk = !0, i.version = p[1]), !p && o.android && e.match(/Kindle Fire/) && (i.silk = !0), C && (i.chrome = !0, i.version = C[1]), y && (i.firefox = !0, i.version = y[1]), A && (o.firefoxos = !0, o.version = A[1]), T && (i.ie = !0, i.version = T[1]), x && (r || o.ios || d) && (i.safari = !0, o.ios || (i.version = x[1])), b && (i.webview = !0), o.tablet = !!(s || w || n && !e.match(/Mobile/) || y && e.match(/Tablet/) || T && !e.match(/Phone/) && e.match(/Touch/)), o.phone = !(o.tablet || o.ipod || !(n || u || l || h || k || C && e.match(/Android/) || C && e.match(/CriOS\/([\d.]+)/) || y && e.match(/Mobile/) || T && e.match(/Touch/)))
            }, getOSName: function () {
                return this.os.android ? "android" : this.os.ios ? "ios" : this.os.wp ? "windows phone" : void 0
            }, getBrowserName: function () {
                return this.browser.chrome ? "chrome" : this.browser.safari ? "safari" : this.browser.firefox ? "firefox" : this.browser.ie ? "ie" : "android"
            }, getCookie: function (e) {
                var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
                return null !== t ? t[2] : ""
            }, collect: function (e) {
                var t, o, i = this, a = e.target;
                for (e.touches && (e = e.touches[0]); a.parentNode && "BODY" != a.nodeName && "HTML" != a.nodeName;) (t = a.getAttribute("m")) && (document.cookie.indexOf("deviceType") !== -1 ? (o = [{
                    key: i.key,
                    url: window.location.href,
                    pageName: window.pageName || "",
                    referer: document.referrer || "",
                    events: [{text: t, x: e.clientX, y: e.clientY, lg: +new Date, pageName: window.pageName || ""}]
                }], i.postCache(o)) : i.saveClick(t, e.clientX, e.clientY)), a = a.parentNode
            }, saveClick: function (e, t, o) {
                var i = this, a = {text: e, x: t, y: o, lg: +new Date, pageName: window.pageName || ""},
                    n = localStorage.getItem("clickCache") || "[]";
                n = JSON.parse(n);
                for (var r = !1, s = 0; s < n.length; s++) if (n[s].key == i.key) {
                    r = !0, n[s].events.push(a);
                    break
                }
                r || n.push({
                    key: i.key,
                    url: window.location.href,
                    pageName: window.pageName || "",
                    referer: document.referrer || "",
                    events: [a]
                }), localStorage.setItem("clickCache", JSON.stringify(n))
            }, saveCustomEvent: function (e) {
                e.text && this.saveClick(e.text, e.x || 0, e.y || 0)
            }, bindEvent: function () {
                var e = this;
                document.addEventListener("DOMContentLoaded", function () {
                    for (var t = document.body.children, o = 0; o < t.length; o++) {
                        var i = t[o];
                        "LINK" != i.nodeName && "SCRIPT" != i.nodeName && i.addEventListener("click", e.collect.bind(e), !1)
                    }
                }, !1)
            }
        };
        e.init();
        var t = window.eventTrack;
        if (t && t.length) for (var o = 0; o < t.length; o++) e.saveCustomEvent(t[o]);
        window.eventTrack = {
            push: function (t) {
                e.saveCustomEvent(t)
            }
        }
    }()
}, function (e, t) {
    var o = window._taGlobal = window._taGlobal || {};
    !function () {
        var e = {
            addGlobalFunction: function () {
                var e = this;
                o && (o.getUrlWithPst = function (t, o) {
                    return e.getUrlWithPst.call(e, t, o)
                })
            }, addGetParamToUrl: function (e, t) {
                var o = [];
                for (var i in t) o.push(i + "=" + t[i]);
                return e.replace(/(\#.*)?$/, "?" + o.join("&")).replace(/(\?.*)\?(.*)/, "$1&$2")
            }, getUrlWithPst: function (e, t) {
                return new RegExp("^https?://").test(e) ? this.addGetParamToUrl(e, {ta_pst: encodeURIComponent(t)}) : this.addGetParamToUrl(e, {from_position_url: encodeURIComponent(t)})
            }, bind: function (e) {
                for (var t, o, i = this, a = e.target; a.parentNode && "BODY" != a.nodeName && "HTML" != a.nodeName;) "A" == a.nodeName && (o = a.getAttribute("href")) && (t = a.getAttribute("data-ta-pst")) && a.setAttribute("href", i.getUrlWithPst(o, t)), a = a.parentNode
            }, bindEvent: function () {
                var e = this;
                document.addEventListener("DOMContentLoaded", function () {
                    for (var t = document.body.children, o = 0; o < t.length; o++) {
                        var i = t[o];
                        "LINK" != i.nodeName && "SCRIPT" != i.nodeName && i.addEventListener("click", e.bind.bind(e), !1)
                    }
                }, !1)
            }, init: function () {
                this.addGlobalFunction(), this.bindEvent()
            }
        };
        e.init()
    }()
}, function (module, exports) {
    var _tac = window._tac = window._tac || [], _tat = window._tat = window._tat || function () {
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

        function addEventListener(e, t, o, i) {
            return e.addEventListener ? (e.addEventListener(t, o, i), !0) : e.attachEvent ? e.attachEvent("on" + t, o) : void(e["on" + t] = o)
        }

        function executePluginMethod(e, t) {
            var o, i, a = "";
            for (o in plugins) i = plugins[o][e], "function" == typeof i && (a += i(t));
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
            var t = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"), o = t.exec(e);
            return o ? o[1] : e
        }

        function getParameter(e, t) {
            var o = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+)[?])([^#]+)"), i = o.exec(e),
                a = new RegExp("(?:^|&)" + t + "=([^&]*)"), n = i ? a.exec(i[1]) : 0;
            return n ? unescapeWrapper(n[1]) : ""
        }

        function urlFixup(e, t, o) {
            return "webcache.googleusercontent.com" == e || "cc.bingj.com" == e || "74.6." == e.substr(0, 5) ? (t = documentAlias.links[0].href, e = getHostname(t)) : "translate.googleusercontent.com" == e && ("" === o && (o = t), t = getParameter(t, "u"), e = getHostname(t)), [e, t, o]
        }

        function getCookieDomain() {
            var e = window.location.host;
            if (!/^[\d\.]+$/.test(e)) {
                var t = e.match(/(^|\.)(\w+\.\w+)$/);
                if (t && t[2]) return "." + t[2]
            }
            return ".tuniu.com"
        }

        function Tracker() {
            function getBrowserUAInfo(e) {
                return "type" == e ? (browserType = userAgent.match(/(?:firefox|opera|safari|chrome|msie|micromessenger)/i), browserType ? browserType[0] : "applewebview") : (browserVersion = userAgent.match(/(?:firefox|opera|safari|chrome|msie|micromessenger)[\/: ]([\d.]+)/i), browserVersion ? browserVersion[1] : "1")
            }

            function needSetUtmCookie(e) {
                return decodeURIComponent(e).indexOf("utm_source") > 0 && !hasCookie("tuniu_p_utm")
            }

            function existInnerNumCookie(e) {
                if (isTuanUrl(e)) return !1;
                var t = !1;
                return t = decodeURIComponent(e).indexOf("#") != -1, !!hasCookie("inner_num") && ("MA==" != getCookie("inner_num") && (!t || !!hasCookie("inner_num_ex") && "MA==" != getCookie("inner_num_ex")))
            }

            function isTuanUrl(e) {
                var t = /^http:\/\/tuan|^tuan/, o = new RegExp(t);
                return !!o.test(e)
            }

            function getBrowser() {
                var e = windowAlias.innerWidth, t = windowAlias.innerHeight;
                return "number" != typeof e && ("CSS1Compat" == documentAlias.compatMode ? (e = documentAlias.documentElement.clientWidth, t = documentAlias.documentElement.clientHeight) : null == documentAlias.body ? (e = 0, t = 0) : (e = documentAlias.body.clientWidth, t = documentAlias.body.clientHeight)), [e, t]
            }

            function getHashValueByKey(e) {
                var t = new RegExp("(^|&|#)" + e + "=([^&]*)(&|$)"), o = window.location.hash.match(t);
                return o ? o[2] : ""
            }

            function getFromUrl() {
                var e = "";
                if (hasCookie("from_url")) e = getCookieWithOutUnescape("from_url"), delCookieSelf("from_url"); else {
                    var t = getHashValueByKey("fu");
                    e = escapeWrapper(t ? t : fromUrl)
                }
                return e
            }

            function getVisitUrl() {
                var e = visitUrl;
                if (hasCookie("from_position_url") && !/ta_pst=/.test(e)) {
                    var t = getCookieWithOutUnescape("from_position_url");
                    delCookieSelf("from_position_url"), t && (e = addGetParamToUrl(e, {ta_pst: t}), changeHref(e))
                } else {
                    var o = getHashValueByKey("ta_pst");
                    e = e.replace(/ta_pst=[^&#]*(&|$)/g, "").replace(/ta_pst=[^&#]*#/g, "#"), o && (e = addGetParamToUrl(e, {ta_pst: o}), changeHref(e))
                }
                return e
            }

            function getRequest() {
                var e = "", t = "";
                navigatorAlias.cookieEnabled && (e = getAnalysisCookie("true")), "undefined" == typeof analyTuniuBeginTime || isNaN(analyTuniuBeginTime) || (loadSpend = loginTime - analyTuniuBeginTime), "undefined" == typeof analyTuniuSpend || isNaN(analyTuniuSpend) || (executeSpend = Math.floor(1e3 * analyTuniuSpend)), pageName || (pageName = visitUrl.split("?")[0]);
                var o = 0;
                hasCookie("inner_num") && (o = getCookie("inner_num")), hasCookie("inner_num_ex") ? innerNumEx = getCookie("inner_num_ex") : innerNumEx = 0;
                var i = getFromUrl(), a = getVisitUrl();
                return t = configTrackerURL + "?hw=" + browserHW + "&bt=" + browserType + "&bv=" + browserVersion + "&fu=" + i + "&lg=" + loginTime + "&co=" + escapeWrapper(e) + "&vu=" + escapeWrapper(a) + "&sr=" + screenResolution + "&sc=" + screenColor + "&os=" + operatingSystem + "&fv=" + flashVersion + "&la=" + language + "&je=" + javaEnabled + "&ce=" + cookieEnabled + "&tn=&pn=" + escapeWrapper(escapeWrapper(pageName)) + "&clt=" + linkType + "&ev=" + isEvent + "&ei=" + eventId + "&ps=" + loadSpend + "&es=" + executeSpend + "&nm=" + o + "&ie=" + innerNumEx
            }

            function getRequestTa2() {
                var e = "", t = "";
                navigatorAlias.cookieEnabled && (e = getAnalysisCookie("true"));
                var o = getFromUrl(), i = getVisitUrl();
                return t = configTrackerHeaderURL + "?hw=" + browserHW + "&ua=" + escapeWrapper(navigatorAlias.userAgent) + "&pf=" + escapeWrapper(navigatorAlias.platform) + "&fu=" + o + "&lg=" + setCurrentTime() + "&co=" + escapeWrapper(e) + "&vu=" + escapeWrapper(i) + "&sr=" + screenResolution + "&sc=" + screenColor + "&la=" + language + "&pn=" + escapeWrapper(escapeWrapper(pageName))
            }

            function logPageView(e) {
                if ((0 == isEvent || e) && tryTimes < 10) if (existInnerNumCookie(visitUrl)) {
                    logPageViewRequest(!0);
                    var t = getRequest();
                    sendRequest(t, configTrackerPause)
                } else setTimeout(function () {
                    logPageView('"+true+"')
                }, 100), tryTimes += 1; else {
                    logPageViewRequest();
                    var t = getRequest();
                    sendRequest(t, configTrackerPause)
                }
            }

            function logPageViewRequest(e) {
                e && (isEvent = 0)
            }

            function logPageViewFast() {
                logPageViewRequest(!0);
                var e = getRequestTa2();
                sendRequest(e, 0)
            }

            function logLink(e, t) {
                fromUrl = locationArray[1], visitUrl = e, linkType = t, loginTime = setCurrentTime();
                var o = getRequest();
                sendRequest(o, configTrackerPause)
            }

            function sendRequest(e, t) {
                var o = new Date;
                expireDateTime = o.getTime() + t, getImage(e)
            }

            function getImage(e) {
                var t = new Image(1, 1);
                t.onLoad = function () {
                }, t.src = e + "&sid=" + sid, t = null
            }

            function getSid() {
                var e, t = "" + loginTime, o = "", i = "";
                t = t.substr(t.length - 8);
                for (var a = 0; a < t.length; a++) e = Math.floor(10 * Math.random()), i += e, o += t.charCodeAt(a) << e;
                return i + o
            }

            function isSiteHostName(e) {
                var t, o, i;
                for (t = 0; t < configHostsAlias.length; t++) {
                    if (o = configHostsAlias[t].toLowerCase(), e == o) return !0;
                    if (e.indexOf("tuniu")) return !0;
                    if ("*." == o.substr(0, 2)) {
                        if (e == o.substr(2)) return !0;
                        if (i = e.length - o.length + 1, i > 0 && e.substr(i) == o.substr(1)) return !0
                    }
                }
                return !1
            }

            function getClassesRegExp(e, t) {
                var o, i = "(^| )(piwik[_-]" + t;
                if (isDefined(e)) for (o = 0; o < e.length; o++) i += "|" + e[o];
                return i += ")( |$)", new RegExp(i)
            }

            function getLinkType(e, t, o) {
                if (!o) return "link";
                var i = getClassesRegExp(configDownloadClasses, "download"),
                    a = getClassesRegExp(configLinkClasses, "link"),
                    n = new RegExp("\\.(" + configDownloadExtensions + ")([?&#]|$)", "i");
                return a.test(e) ? "link" : i.test(e) || n.test(t) ? "download" : 0
            }

            function clickHandler(e) {
                var t, o, i, a, n, r, s, c;
                if (isDefined(e) || (e = windowAlias.event), isDefined(e.target)) t = e.target; else {
                    if (!isDefined(e.srcElement)) return;
                    t = e.srcElement
                }
                for (; (o = t.parentNode) && "A" != (i = t.tagName) && "AREA" != i;) t = o;
                isDefined(t.href) && (n = t.hostname, r = n.toLowerCase(), s = t.href.replace(n, r), c = new RegExp("^(javascript|vbscript|jscript|mocha|livescript|ecmascript): *", "i"), c.test(s) || (a = getLinkType(t.className, s, isSiteHostName(r)), a && logLink(s, a)))
            }

            function addClickListener(e) {
                addEventListener(e, "click", clickHandler, !1)
            }

            function addClickListeners() {
                if (!linkTrackingInstalled) {
                    linkTrackingInstalled = !0;
                    var e, t = getClassesRegExp(configIgnoreClasses, "ignore"), o = documentAlias.links;
                    if (o) for (e = 0; e < o.length; e++) t.test(o[e].className) || addClickListener(o[e])
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

            function getAnalysisCookie(e) {
                e && setAnalysisCookie();
                var t = "";
                if (hasCookie(tacaName) && ("opera" === browserType && "" !== _opera_ta[0] ? (t += tacaName + "=" + _opera_ta[0] + ";", _opera_ta[0] = "") : t += tacaName + "=" + getCookie(tacaName) + ";"), hasCookie(tacbName) && ("opera" === browserType && "" !== _opera_ta[1] ? (t += tacbName + "=" + _opera_ta[1] + ";", _opera_ta[1] = "") : t += tacbName + "=" + getCookie(tacbName) + ";"), hasCookie(tacauName) && (t += tacauName + "=" + getCookie(tacauName) + ";"), hasCookie(tactName) && (t += tactName + "=" + getCookie(tactName) + ";"), hasCookie(taczName) && ("opera" === browserType && "" !== _opera_ta[2] ? (t += taczName + "=" + _opera_ta[2] + ";", _opera_ta[2] = "") : t += taczName + "=" + getCookie(taczName) + ";"), hasCookie("tuniu_partner") && (t += "tuniu_partner=" + getCookie("tuniu_partner") + ";"), hasCookie("tuniuuser") && (t += "tuniuuser=" + getCookie("tuniuuser") + ";"), hasCookie("tuniuuser_citycode") && (t += "tuniuuser_citycode=" + getCookie("tuniuuser_citycode") + ";"), hasCookie("tuniuuser_id") && (t += "tuniuuser_id=" + getCookie("tuniuuser_id") + ";"), hasCookie("tuniu_zeus") && (t += "tuniu_zeus=" + getCookie("tuniu_zeus") + ";"), hasCookie(dfyooUserCookieName) && (t += dfyooUserCookieName + "=" + getCookie(dfyooUserCookieName) + ";"), hasCookie(dfyooCompanyCookieName) && (t += dfyooCompanyCookieName + "=" + getCookie(dfyooCompanyCookieName) + ";"), hasCookie("token") && (t += "token=" + getCookie("token") + ";"), hasCookie("sessionId") && (t += "sessionId=" + getCookie("sessionId") + ";"), "undefined" != typeof exposure && null != exposure && exposure.length > 0 && (t += "exposure=" + base64encode(escape(exposure)) + ";"), "undefined" != typeof abTest && null != abTest && 1 === abTest.length && (t += "abTest=" + abTest + ";"), "undefined" != typeof extendArray && extendArray instanceof Array) {
                    for (var o = [], i = 0; i < extendArray.length; i++) null != extendArray[i] && "" != trimStr(extendArray[i].toString()) && o.push(trimStr(extendArray[i].toString()));
                    o.length > 0 && (t += "extend=" + base64encode(o.join("#")) + ";")
                }
                return t += "ct=20;"
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
                var o = new RegExp("(^|&|\\?)" + t + "=([^&]*)(&|$|#)"), i = e.match(o);
                return i ? i[2] : ""
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
                var e, t = organicEngine, o = organicKeyword;
                e = new Array;
                for (var i = 0; i < t.length; i++) if (fromUrl.indexOf(t[i]) > -1 && getQueryStringRegExp(fromUrl, o[i])) {
                    e[0] = t[i].replace(/(.*)(\.(com|cn|org).*)$/gi, "$1"), e[1] = getQueryStringRegExp(fromUrl, o[i]);
                    break
                }
                return e
            }

            function isSearchEnginePay() {
                var e, t = organicPayVaule, o = organicPayEngine;
                e = new Array;
                for (var i = 0; i < t.length; i++) if (t[i] == getQueryStringRegExp(visitUrl, tam_pay)) return mediumValue = "(cpc)", sourceValue = o[i], campaignValue = getQueryStringRegExp(visitUrl, tam_cmp) ? getQueryStringRegExp(visitUrl, tam_cmp) : getQueryStringRegExp(visitUrl, tam_campaign) ? getQueryStringRegExp(visitUrl, tam_campaign) : "(none)", e = getSearchKey(), termValue = 2 == e.length ? e[1] : "(none)", contentValue = getQueryStringRegExp(visitUrl, tam_content) ? getQueryStringRegExp(visitUrl, tam_content) : getQueryStringRegExp(visitUrl, kw) ? getQueryStringRegExp(visitUrl, kw) : "(none)", !0;
                return !1
            }

            function isCampaign() {
                return !!getQueryStringRegExp(visitUrl, tam_cmp) && (campaignValue = getQueryStringRegExp(visitUrl, tam_cmp), mediumValue = "(campaign)", sourceValue = fromUrl ? getHostname(fromUrl) : "(direct)", termValue = getQueryStringRegExp(visitUrl, tam_term) ? getQueryStringRegExp(visitUrl, tam_term) : "(none)", contentValue = getQueryStringRegExp(visitUrl, tam_content) ? getQueryStringRegExp(visitUrl, tam_content) : "(none)", !0)
            }

            function isRight() {
                for (var e = ignoredReferrer, t = e.length, o = 0; o < t; o++) if (getHostname(fromUrl).indexOf(e[o]) > -1) return !0;
                return !1
            }

            function setAnonyCookie(e, t) {
                if (hasCookie(e)) hasCookie(t) && delCookie(t); else if (0 == hasCookie(t)) {
                    var o = "0," + newGuid() + ",";
                    setCookie(t, base64encode(o), 360, cookiePath, cookieDomain)
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

            function setTacaCookie(e, t, o) {
                hasCookie(e) && hasCookie(t) ? 0 == hasCookie(o) && setFirstTacaCookie() : hasCookie(o) ? resetTacaCookie(o) : setFirstTacaCookie()
            }

            function resetTacaCookie(e) {
                var t = getCookie(e), o = t.split(".");
                delCookie(e), t = o[0] + "." + o[2] + "." + loginTime + "." + (parseInt(o[3]) + 1), setCookie(e, t, tacaTimeoutHours, cookiePath, cookieDomain)
            }

            function setFirstTacaCookie() {
                var e = 1, t = loginTime + "." + loginTime + "." + loginTime + "." + e;
                setCookie(tacaName, t, tacaTimeoutHours, cookiePath, cookieDomain)
            }

            function setCookie(e, t, o, i, a) {
                var n;
                "opera" === browserType && ("_taca" === e ? _opera_ta[0] = t : "_tacb" === e ? _opera_ta[1] = t : "_tacz" === e && (_opera_ta[2] = t)), o && (n = new Date, n.setTime(n.getTime() + 36e5 * o)), documentAlias.cookie = e + "=" + escape(t) + (o ? ";expires=" + n.toGMTString() : "") + ";path=" + (i ? i : "/") + (a ? ";domain=" + a : "")
            }

            function resetCookie(e, t, o, i) {
                var a = getCookie(e);
                delCookie(e), setCookie(e, a, t, o, i)
            }

            function hasCookie(e) {
                var t, o = documentAlias.cookie, i = 0, a = o.length;
                for (e += "="; i < a;) {
                    if (t = i + e.length, o.substring(i, t) == e) return !0;
                    if (i = o.indexOf(" ", i) + 1, 0 == i) break
                }
                return !1
            }

            function delCookie(e) {
                var t = new Date, o = getCookie(e);
                t.setTime(t.getTime() - 1), null != o && (documentAlias.cookie = e + "=" + o + ";expires=" + t.toGMTString())
            }

            function getCookie(e) {
                var t = documentAlias.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
                return null != t ? unescape(t[2]) : null
            }

            function getCookieWithOutUnescape(e) {
                var t = documentAlias.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
                return null != t ? t[2] : null
            }

            function addGetParamToUrl(e, t) {
                var o = [];
                for (var i in t) o.push(i + "=" + t[i]);
                if (e) {
                    var a = e.replace(/#.*/, "").indexOf("?") > -1 ? "&" : "?";
                    return e.replace(/(\#.*)?$/, a + o.join("&") + "$1")
                }
                return ""
            }

            function changeHref(e) {
                window.history && window.history.replaceState && window.history.replaceState(null, document.title, e)
            }

            function delCookieSelf(e, t, o) {
                t = t || cookiePath, o = o || cookieDomain;
                var i = new Date;
                i.setTime(i.getTime() - 1), documentAlias.cookie = e + "=;domain=" + o + ";path=" + t + ";expires=" + i.toGMTString()
            }

            function getPlatform() {
                var e = "not set", t = "Win32" == navigatorAlias.platform || "Windows" == navigatorAlias.platform,
                    o = "Mac68K" == navigatorAlias.platform || "MacPPC" == navigatorAlias.platform || "Macintosh" == navigatorAlias.platform,
                    i = "X11" == navigatorAlias.platform && !t && !o;
                return o && (e = "Mac"), i && (e = "Unix"), String(navigator.platform).indexOf("Linux") > -1 && (e = "Linux"), t && ((navigatorAlias.userAgent.indexOf("Win95") > -1 || navigatorAlias.userAgent.indexOf("Windows 95") > -1) && (e = "windows 95"), (navigatorAlias.userAgent.indexOf("Win98") > -1 || navigatorAlias.userAgent.indexOf("Windows 98") > -1) && (e = "windows 98"), (navigatorAlias.userAgent.indexOf("Windows 9x 4.90") > -1 || navigatorAlias.userAgent.indexOf("Windows ME") > -1) && (e = "windows ME"), (navigatorAlias.userAgent.indexOf("Windows NT 5.0") > -1 || navigatorAlias.userAgent.indexOf("Windows 2000") > -1) && (e = "windows 2000"), (navigatorAlias.userAgent.indexOf("Windows NT 5.1") > -1 || navigatorAlias.userAgent.indexOf("Windows XP") > -1) && (e = "windows XP"), (navigatorAlias.userAgent.indexOf("Windows NT 5.2") > -1 || navigatorAlias.userAgent.indexOf("Windows 2003") > -1) && (e = "windows 2003"), (navigatorAlias.userAgent.indexOf("Windows NT 6.0") > -1 || navigatorAlias.userAgent.indexOf("Windows Vista") > -1) && (e = "Windows Vista"), (navigatorAlias.userAgent.indexOf("Windows NT 6.1") > -1 || navigatorAlias.userAgent.indexOf("Windows 7") > -1) && (e = "Win7"), (navigatorAlias.userAgent.indexOf("Windows NT 6.2") > -1 || navigatorAlias.userAgent.indexOf("Windows 8") > -1) && (e = "Win8")), android = navigatorAlias.userAgent.match(/(Android)[\s\/]+([\d\.]+)/), iPad = navigatorAlias.userAgent.match(/iPad/i), iPhone = navigatorAlias.userAgent.match(/iPhone/i), iPod = navigatorAlias.userAgent.match(/iPod/i), windowsPhone = navigatorAlias.userAgent.match(/(Windows\s+Phone)\s([\d\.]+)/), android && (e = "Android"), iPad && (e = "iOS-Pad"), iPhone && (e = "iOS-Phone"), iPod && (e = "iOS-Pod"), windowsPhone && (e = "WindowsPhone"), e
            }

            function _uFlash() {
                var e, t = "-";
                if (navigatorAlias.plugins && navigatorAlias.plugins.length) {
                    for (var o = 0; o < navigatorAlias.plugins.length; o++) if (navigatorAlias.plugins[o].name.indexOf("Shockwave Flash") != -1) {
                        t = navigatorAlias.plugins[o].description.split("Shockwave Flash ")[1];
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
                for (var e, t = "", o = 1; o <= 32; o++) e = Math.floor(16 * Math.random()).toString(16), t += e, 8 != o && 12 != o && 16 != o && 20 != o || (t += "-");
                return t
            }

            function base64encode(e) {
                e = utf16to8(e);
                for (var t, o, i, a = "", n = 0, r = e.length, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; n < r;) {
                    if (t = 255 & e.charCodeAt(n++), n == r) {
                        a += s.charAt(t >> 2), a += s.charAt((3 & t) << 4), a += "==";
                        break
                    }
                    if (o = e.charCodeAt(n++), n == r) {
                        a += s.charAt(t >> 2), a += s.charAt((3 & t) << 4 | (240 & o) >> 4), a += s.charAt((15 & o) << 2), a += "=";
                        break
                    }
                    i = e.charCodeAt(n++), a += s.charAt(t >> 2), a += s.charAt((3 & t) << 4 | (240 & o) >> 4), a += s.charAt((15 & o) << 2 | (192 & i) >> 6), a += s.charAt(63 & i)
                }
                return a
            }

            function utf16to8(e) {
                var t, o, i, a;
                for (t = "", i = e.length, o = 0; o < i; o++) a = e.charCodeAt(o), a >= 1 && a <= 127 ? t += e.charAt(o) : a > 2047 ? (t += String.fromCharCode(224 | a >> 12 & 15), t += String.fromCharCode(128 | a >> 6 & 63), t += String.fromCharCode(128 | a >> 0 & 63)) : (t += String.fromCharCode(192 | a >> 6 & 31), t += String.fromCharCode(128 | a >> 0 & 63));
                return t
            }

            var registeredHooks = {}, configTrackerPause = 500,
                locationArray = urlFixup(windowAlias.location.hostname, windowAlias.location.href, getReferrer()),
                locationHostnameAlias = locationArray[0], configHostsAlias = [locationHostnameAlias],
                configIgnoreClasses = [], configDownloadClasses = [], configLinkClasses = [],
                ignoredReferrer = [".tuniu.com"],
                organicEngine = ["baidu.com", "baidu.com", "baidu.com", "google.com", "google.cn", "sogou.com", "zhongsou.com", "search.yahoo.com", "one.cn.yahoo.com", "soso.com", "114search.118114.cn", "youdao.com", "gougou.com", "bing.com", "qihoo.com", "21cn.com", "goso.cn", "so.360.cn"],
                organicKeyword = ["word", "wd", "query", "q", "q", "query", "w", "p", "p", "w", "kw", "q", "search", "q", "kw", "keyword", "q", "q"],
                organicPayVaule = ["1044", "1558", "1045", "1559", "1499", "1326", "12358", "12991"],
                organicPayEngine = ["baidu", "baidu", "google", "google", "sogou", "soso", "youdao", "bing"],
                tam_source = "utm_source", tam_medium = "utm_medium", tam_campaign = "utm_campaign",
                tam_content = "utm_content", kw = "kw", tam_term = "utm_term", tam_cmp = "cmpid", tam_pay = "p",
                sourceValue = "", mediumValue = "", campaignValue = "", termValue = "", contentValue = "",
                linkTrackingInstalled = !1, cpro = documentAlias.location.protocol, chost = "analy.tuniu.cn",
                cgif = "analysisCollect/dataCollect.gif", headerGif = "analysisCollect/dataCollectHeader.gif",
                configTrackerURL = cpro + "//" + chost + "/" + cgif,
                configTrackerHeaderURL = cpro + "//" + chost + "/" + headerGif, sid = getSid(),
                cPageNotFoundDomain = "www.tuniu.com", cPageNotFoundPage = "html/404.html",
                url404Default = cpro + "//" + cPageNotFoundDomain + "/" + cPageNotFoundPage, fromUrl = locationArray[2],
                visitUrl = locationArray[1], browserArray = getBrowser(),
                browserHW = browserArray[1] + "*" + browserArray[0], screenColor = screenAlias.colorDepth,
                screenResolution = screenAlias.width + "*" + screenAlias.height, operatingSystem = getPlatform(),
                userAgent = navigatorAlias.userAgent.toLowerCase(), browserType = getBrowserUAInfo("type"),
                browserVersion = getBrowserUAInfo("version"), flashVersion = _uFlash(), javaEnabled = 1, language = "-",
                cookieEnabled = navigatorAlias.cookieEnabled ? "1" : "0", titleName = documentAlias.title,
                pageName = "",
                configDownloadExtensions = "7z|aac|ar[cj]|as[fx]|bin|csv|deb|dmg|doc|docx|exe|gz|gzip|hqx|jar|ms[ip]|od[bfgpst]|og[gv]|pdf|ppt|pptx|pub|qtm?|ra[mr]?|rpm|sea|sit|tar|t?bz2?|tgz|torrent|txt|wav|wm[av]|wpd|xls|xlsx|xml|z|zip|vsd",
                tacaName = "_taca", tacbName = "_tacb", taccName = "_tacc", regUserCookieName = "tuniuuser",
                tacauName = "_tacau", tactName = "_tact", taczName = "_tacz2", cookieDomain = getCookieDomain(),
                cookiePath = "/", tacbTimeoutHours = .5, tacaTimeoutHours = 17520, taczTimeoutHours = 720,
                innerNumUrl = "http://analysis.tuniu.com/", loadSpend = -1, executeSpend = -1, isEvent = 0,
                eventId = "", linkType = "link", dfyooUserCookieName = "dfyoo_user_id",
                dfyooCompanyCookieName = "company_id";
            linkTrackingInstalled = !1, javaEnabled = navigatorAlias.javaEnabled() ? 1 : 0, "Netscape" === navigatorAlias.appName && (screenColor = screenAlias.pixelDepth), navigatorAlias.language ? language = navigatorAlias.language.toLowerCase() : navigatorAlias.browserLanguage && (language = navigatorAlias.browserLanguage.toLowerCase());
            var tryTimes = 0;
            return executePluginMethod("run", registerHook), {
                setTrackerURL: function (e) {
                    isDefined(e) && (configTrackerURL = e)
                }, setSessionCookieTimeout: function (e) {
                    isDefined(e) && (tacbTimeoutHours = parseFloat(e) / 36e5)
                }, setVisitorCookieTimeout: function (e) {
                    isDefined(e) && (tacaTimeoutHours = parseFloat(e) / 36e5)
                }, addOrganic: function (e, t, o) {
                    isDefined(e) && isDefined(t) && isDefined(o) && (1 == o ? (organicEngine.unshift(e), organicKeyword.unshift(t)) : (organicEngine.push(e), organicKeyword.push(t)))
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
                }, trackFast: function () {
                    logPageViewFast()
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
            asyncTracker = new Tracker;
        addEventListener(windowAlias, "beforeunload", beforeUnloadHandler, !1), addReadyListener();
        for (var index = 0; index < _tac.length; index++) apply(_tac[index]);
        return _tac = new TrackerProxy, {
            getTracker: function () {
                return new Tracker
            }
        }
    }()
}]);
;(function () {
    var aa = encodeURIComponent, ba = Infinity, ca = setTimeout, da = isNaN, m = Math, ea = decodeURIComponent;

    function ha(a, b) {
        return a.name = b
    }

    var n = "push", ia = "test", ja = "slice", p = "replace", ka = "load", la = "floor", ma = "charAt", na = "value",
        q = "indexOf", oa = "match", pa = "port", qa = "createElement", ra = "path", r = "name", g = "getTime",
        u = "host", v = "toString", w = "length", x = "prototype", sa = "clientWidth", y = "split",
        ta = "stopPropagation", ua = "scope", z = "location", va = "search", A = "protocol", wa = "clientHeight",
        xa = "href", B = "substring", ya = "apply", za = "navigator", C = "join", D = "toLowerCase", E;

    function Aa(a, b) {
        switch (b) {
            case 0:
                return "" + a;
            case 1:
                return 1 * a;
            case 2:
                return !!a;
            case 3:
                return 1E3 * a
        }
        return a
    }

    function Ba(a) {
        return "function" == typeof a
    }

    function Ca(a) {
        return void 0 != a && -1 < (a.constructor + "")[q]("String")
    }

    function F(a, b) {
        return void 0 == a || "-" == a && !b || "" == a
    }

    function Da(a) {
        if (!a || "" == a) return "";
        for (; a && -1 < " \n\r\t"[q](a[ma](0));) a = a[B](1);
        for (; a && -1 < " \n\r\t"[q](a[ma](a[w] - 1));) a = a[B](0, a[w] - 1);
        return a
    }

    function Ea() {
        return m.round(2147483647 * m.random())
    }

    function Fa() {
    }

    function G(a, b) {
        if (aa instanceof Function) return b ? encodeURI(a) : aa(a);
        H(68);
        return escape(a)
    }

    function I(a) {
        a = a[y]("+")[C](" ");
        if (ea instanceof Function) try {
            return ea(a)
        } catch (b) {
            H(17)
        } else H(68);
        return unescape(a)
    }

    var Ga = function (a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, !!d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, Ha = function (a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, !!d) : a.detachEvent && a.detachEvent("on" + b, c)
    };

    function Ia(a, b) {
        if (a) {
            var c = J[qa]("script");
            c.type = "text/javascript";
            c.async = !0;
            c.src = a;
            c.id = b;
            var d = J.getElementsByTagName("script")[0];
            d.parentNode.insertBefore(c, d);
            return c
        }
    }

    function K(a) {
        return a && 0 < a[w] ? a[0] : ""
    }

    function L(a) {
        var b = a ? a[w] : 0;
        return 0 < b ? a[b - 1] : ""
    }

    var Ja = function () {
        this.prefix = "ga.";
        this.R = {}
    };
    Ja[x].set = function (a, b) {
        this.R[this.prefix + a] = b
    };
    Ja[x].get = function (a) {
        return this.R[this.prefix + a]
    };
    Ja[x].contains = function (a) {
        return void 0 !== this.get(a)
    };

    function Ka(a) {
        0 == a[q]("www.") && (a = a[B](4));
        return a[D]()
    }

    function La(a, b) {
        var c, d = {url: a, protocol: "http", host: "", path: "", d: new Ja, anchor: ""};
        if (!a) return d;
        c = a[q]("://");
        0 <= c && (d.protocol = a[B](0, c), a = a[B](c + 3));
        c = a[va]("/|\\?|#");
        if (0 <= c) d.host = a[B](0, c)[D](), a = a[B](c); else return d.host = a[D](), d;
        c = a[q]("#");
        0 <= c && (d.anchor = a[B](c + 1), a = a[B](0, c));
        c = a[q]("?");
        0 <= c && (Na(d.d, a[B](c + 1)), a = a[B](0, c));
        d.anchor && b && Na(d.d, d.anchor);
        a && "/" == a[ma](0) && (a = a[B](1));
        d.path = a;
        return d
    }

    function Oa(a, b) {
        function c(a) {
            var b = (a.hostname || "")[y](":")[0][D](), c = (a[A] || "")[D](),
                c = 1 * a[pa] || ("http:" == c ? 80 : "https:" == c ? 443 : "");
            a = a.pathname || "";
            0 == a[q]("/") || (a = "/" + a);
            return [b, "" + c, a]
        }

        var d = b || J[qa]("a");
        d.href = J[z][xa];
        var e = (d[A] || "")[D](), f = c(d), Be = d[va] || "", k = e + "//" + f[0] + (f[1] ? ":" + f[1] : "");
        0 == a[q]("//") ? a = e + a : 0 == a[q]("/") ? a = k + a : a && 0 != a[q]("?") ? 0 > a[y]("/")[0][q](":") && (a = k + f[2][B](0, f[2].lastIndexOf("/")) + "/" + a) : a = k + f[2] + (a || Be);
        d.href = a;
        e = c(d);
        return {protocol: (d[A] || "")[D](), host: e[0], port: e[1], path: e[2], Oa: d[va] || "", url: a || ""}
    }

    function Na(a, b) {
        function c(b, c) {
            a.contains(b) || a.set(b, []);
            a.get(b)[n](c)
        }

        for (var d = Da(b)[y]("&"), e = 0; e < d[w]; e++) if (d[e]) {
            var f = d[e][q]("=");
            0 > f ? c(d[e], "1") : c(d[e][B](0, f), d[e][B](f + 1))
        }
    }

    function Pa(a, b) {
        if (F(a) || "[" == a[ma](0) && "]" == a[ma](a[w] - 1)) return "-";
        var c = J.domain;
        return a[q](c + (b && "/" != b ? b : "")) == (0 == a[q]("http://") ? 7 : 0 == a[q]("https://") ? 8 : 0) ? "0" : a
    };var Qa = 0;

    function Ra(a, b, c) {
        1 <= Qa || 1 <= 100 * m.random() || (a = ["utmt=error", "utmerr=" + a, "utmwv=5.4.4", "utmn=" + Ea(), "utmsp=1"], b && a[n]("api=" + b), c && a[n]("msg=" + G(c[B](0, 100))), M.w && a[n]("aip=1"), Sa(a[C]("&")), Qa++)
    };var Ta = 0, Ua = {};

    function N(a) {
        return Va("x" + Ta++, a)
    }

    function Va(a, b) {
        Ua[a] = !!b;
        return a
    }

    var Wa = N(), Xa = Va("anonymizeIp"), Ya = N(), $a = N(), ab = N(), bb = N(), O = N(), P = N(), cb = N(), db = N(),
        eb = N(), fb = N(), gb = N(), hb = N(), ib = N(), jb = N(), kb = N(), lb = N(), nb = N(), ob = N(), pb = N(),
        qb = N(), rb = N(), sb = N(), tb = N(), ub = N(), vb = N(), wb = N(), xb = N(), yb = N(), zb = N(), Ab = N(),
        Bb = N(), Cb = N(), Db = N(), Eb = N(), Fb = N(!0), Gb = Va("currencyCode"), Hb = Va("page"), Ib = Va("title"),
        Jb = N(), Kb = N(), Lb = N(), Mb = N(), Nb = N(), Ob = N(), Pb = N(), Qb = N(), Rb = N(), Q = N(!0), Sb = N(!0),
        Tb = N(!0), Ub = N(!0), Vb = N(!0), Wb = N(!0), Zb = N(!0), $b = N(!0), ac = N(!0), bc = N(!0), cc = N(!0),
        R = N(!0), dc = N(!0), ec = N(!0), fc = N(!0), gc = N(!0), hc = N(!0), ic = N(!0), jc = N(!0), S = N(!0),
        kc = N(!0), lc = N(!0), mc = N(!0), nc = N(!0), oc = N(!0), pc = N(!0), qc = N(!0), rc = Va("campaignParams"),
        sc = N(), tc = Va("hitCallback"), uc = N();
    N();
    var vc = N(), wc = N(), xc = N(), yc = N(), zc = N(), Ac = N(), Bc = N(), Cc = N(), Dc = N(), Ec = N(), Fc = N(),
        Gc = N(), Hc = N(), Ic = N();
    N();
    var Mc = N(), Nc = N(), Oc = N(), Oe = Va("uaName"), Pe = Va("uaDomain"), Qe = Va("uaPath");
    var Re = function () {
        function a(a, c, d) {
            T($[x], a, c, d)
        }

        a("_createTracker", $[x].r, 55);
        a("_getTracker", $[x].oa, 0);
        a("_getTrackerByName", $[x].u, 51);
        a("_getTrackers", $[x].pa, 130);
        a("_anonymizeIp", $[x].aa, 16);
        a("_forceSSL", $[x].la, 125);
        a("_getPlugin", Pc, 120)
    }, Se = function () {
        function a(a, c, d) {
            T(U[x], a, c, d)
        }

        Qc("_getName", $a, 58);
        Qc("_getAccount", Wa, 64);
        Qc("_visitCode", Q, 54);
        Qc("_getClientInfo", ib, 53, 1);
        Qc("_getDetectTitle", lb, 56, 1);
        Qc("_getDetectFlash", jb, 65, 1);
        Qc("_getLocalGifPath", wb, 57);
        Qc("_getServiceMode", xb, 59);
        V("_setClientInfo", ib, 66, 2);
        V("_setAccount", Wa, 3);
        V("_setNamespace", Ya, 48);
        V("_setAllowLinker", fb, 11, 2);
        V("_setDetectFlash", jb, 61, 2);
        V("_setDetectTitle", lb, 62, 2);
        V("_setLocalGifPath", wb, 46, 0);
        V("_setLocalServerMode", xb, 92, void 0, 0);
        V("_setRemoteServerMode", xb, 63, void 0, 1);
        V("_setLocalRemoteServerMode", xb, 47, void 0, 2);
        V("_setSampleRate", vb, 45, 1);
        V("_setCampaignTrack", kb, 36, 2);
        V("_setAllowAnchor", gb, 7, 2);
        V("_setCampNameKey", ob, 41);
        V("_setCampContentKey", tb, 38);
        V("_setCampIdKey", nb, 39);
        V("_setCampMediumKey", rb, 40);
        V("_setCampNOKey", ub, 42);
        V("_setCampSourceKey", qb, 43);
        V("_setCampTermKey", sb, 44);
        V("_setCampCIdKey", pb, 37);
        V("_setCookiePath", P, 9, 0);
        V("_setMaxCustomVariables", yb, 0, 1);
        V("_setVisitorCookieTimeout", cb, 28, 1);
        V("_setSessionCookieTimeout", db, 26, 1);
        V("_setCampaignCookieTimeout", eb, 29, 1);
        V("_setReferrerOverride", Jb, 49);
        V("_setSiteSpeedSampleRate", Dc, 132);
        a("_trackPageview", U[x].Fa, 1);
        a("_trackEvent", U[x].F, 4);
        a("_trackPageLoadTime", U[x].Ea, 100);
        a("_trackSocial", U[x].Ga, 104);
        a("_trackTrans", U[x].Ia, 18);
        a("_sendXEvent", U[x].t, 78);
        a("_createEventTracker", U[x].ia, 74);
        a("_getVersion", U[x].qa, 60);
        a("_setDomainName", U[x].B, 6);
        a("_setAllowHash", U[x].va, 8);
        a("_getLinkerUrl", U[x].na, 52);
        a("_link", U[x].link, 101);
        a("_linkByPost", U[x].ua, 102);
        a("_setTrans", U[x].za, 20);
        a("_addTrans", U[x].$, 21);
        a("_addItem", U[x].Y, 19);
        a("_clearTrans", U[x].ea, 105);
        a("_setTransactionDelim", U[x].Aa, 82);
        a("_setCustomVar", U[x].wa, 10);
        a("_deleteCustomVar", U[x].ka, 35);
        a("_getVisitorCustomVar", U[x].ra, 50);
        a("_setXKey", U[x].Ca, 83);
        a("_setXValue", U[x].Da, 84);
        a("_getXKey", U[x].sa, 76);
        a("_getXValue", U[x].ta, 77);
        a("_clearXKey", U[x].fa, 72);
        a("_clearXValue", U[x].ga, 73);
        a("_createXObj", U[x].ja, 75);
        a("_addIgnoredOrganic", U[x].W, 15);
        a("_clearIgnoredOrganic", U[x].ba, 97);
        a("_addIgnoredRef", U[x].X, 31);
        a("_clearIgnoredRef", U[x].ca, 32);
        a("_addOrganic", U[x].Z, 14);
        a("_clearOrganic", U[x].da, 70);
        a("_cookiePathCopy", U[x].ha, 30);
        a("_get", U[x].ma, 106);
        a("_set", U[x].xa, 107);
        a("_addEventListener", U[x].addEventListener, 108);
        a("_removeEventListener", U[x].removeEventListener, 109);
        a("_addDevId", U[x].V);
        a("_getPlugin", Pc, 122);
        a("_setPageGroup", U[x].ya, 126);
        a("_trackTiming", U[x].Ha, 124);
        a("_initData", U[x].v, 2);
        a("_setVar", U[x].Ba, 22);
        V("_setSessionTimeout", db, 27, 3);
        V("_setCookieTimeout", eb, 25, 3);
        V("_setCookiePersistence", cb, 24, 1);
        a("_setAutoTrackOutbound", Fa, 79);
        a("_setTrackOutboundSubdomains", Fa, 81);
        a("_setHrefExamineLimit", Fa, 80)
    };

    function Pc(a) {
        var b = this.plugins_;
        if (b) return b.get(a)
    }

    var T = function (a, b, c, d) {
        a[b] = function () {
            try {
                return void 0 != d && H(d), c[ya](this, arguments)
            } catch (a) {
                throw Ra("exc", b, a && a[r]), a;
            }
        }
    }, Qc = function (a, b, c, d) {
        U[x][a] = function () {
            try {
                return H(c), Aa(this.a.get(b), d)
            } catch (e) {
                throw Ra("exc", a, e && e[r]), e;
            }
        }
    }, V = function (a, b, c, d, e) {
        U[x][a] = function (f) {
            try {
                H(c), void 0 == e ? this.a.set(b, Aa(f, d)) : this.a.set(b, e)
            } catch (Be) {
                throw Ra("exc", a, Be && Be[r]), Be;
            }
        }
    }, Te = function (a, b) {
        return {
            type: b, target: a, stopPropagation: function () {
                throw"aborted";
            }
        }
    };
    var Rc = RegExp(/(^|\.)doubleclick\.net$/i), Sc = function (a, b) {
        return Rc[ia](J[z].hostname) ? !0 : "/" !== b ? !1 : 0 != a[q]("www.google.") && 0 != a[q](".google.") && 0 != a[q]("google.") || -1 < a[q]("google.org") ? !1 : !0
    }, Tc = function (a) {
        var b = a.get(bb), c = a.c(P, "/");
        Sc(b, c) && a[ta]()
    };
    var Zc = function () {
        var a = {}, b = {}, c = new Uc;
        this.g = function (a, b) {
            c.add(a, b)
        };
        var d = new Uc;
        this.e = function (a, b) {
            d.add(a, b)
        };
        var e = !1, f = !1, Be = !0;
        this.T = function () {
            e = !0
        };
        this.j = function (a) {
            this[ka]();
            this.set(sc, a, !0);
            a = new Vc(this);
            e = !1;
            d.execute(this);
            e = !0;
            b = {};
            this.n();
            a.Ja()
        };
        this.load = function () {
            e && (e = !1, this.Ka(), Wc(this), f || (f = !0, c.execute(this), Xc(this), Wc(this)), e = !0)
        };
        this.n = function () {
            if (e) if (f) e = !1, Xc(this), e = !0; else this[ka]()
        };
        this.get = function (c) {
            Ua[c] && this[ka]();
            return void 0 !== b[c] ? b[c] : a[c]
        };
        this.set = function (c, d, e) {
            Ua[c] && this[ka]();
            e ? b[c] = d : a[c] = d;
            Ua[c] && this.n()
        };
        this.Za = function (b) {
            a[b] = this.b(b, 0) + 1
        };
        this.b = function (a, b) {
            var c = this.get(a);
            return void 0 == c || "" === c ? b : 1 * c
        };
        this.c = function (a, b) {
            var c = this.get(a);
            return void 0 == c ? b : c + ""
        };
        this.Ka = function () {
            if (Be) {
                var b = this.c(bb, ""), c = this.c(P, "/");
                Sc(b, c) || (a[O] = a[hb] && "" != b ? Yc(b) : 1, Be = !1)
            }
        }
    };
    Zc[x].stopPropagation = function () {
        throw"aborted";
    };
    var Vc = function (a) {
        var b = this;
        this.q = 0;
        var c = a.get(tc);
        this.Ua = function () {
            0 < b.q && c && (b.q--, b.q || c())
        };
        this.Ja = function () {
            !b.q && c && ca(c, 10)
        };
        a.set(uc, b, !0)
    };

    function $c(a, b) {
        b = b || [];
        for (var c = 0; c < b[w]; c++) {
            var d = b[c];
            if ("" + a == d || 0 == d[q](a + ".")) return d
        }
        return "-"
    }

    var bd = function (a, b, c) {
        c = c ? "" : a.c(O, "1");
        b = b[y](".");
        if (6 !== b[w] || ad(b[0], c)) return !1;
        c = 1 * b[1];
        var d = 1 * b[2], e = 1 * b[3], f = 1 * b[4];
        b = 1 * b[5];
        if (!(0 <= c && 0 < d && 0 < e && 0 < f && 0 <= b)) return !1;
        a.set(Q, c);
        a.set(Vb, d);
        a.set(Wb, e);
        a.set(Zb, f);
        a.set($b, b);
        return !0
    }, cd = function (a) {
        var b = a.get(Q), c = a.get(Vb), d = a.get(Wb), e = a.get(Zb), f = a.b($b, 1);
        return [a.b(O, 1), void 0 != b ? b : "-", c || "-", d || "-", e || "-", f][C](".")
    }, dd = function (a) {
        return [a.b(O, 1), a.b(cc, 0), a.b(R, 1), a.b(dc, 0)][C](".")
    }, ed = function (a, b, c) {
        c = c ? "" : a.c(O, "1");
        var d = b[y](".");
        if (4 !== d[w] || ad(d[0], c)) d = null;
        a.set(cc, d ? 1 * d[1] : 0);
        a.set(R, d ? 1 * d[2] : 10);
        a.set(dc, d ? 1 * d[3] : a.get(ab));
        return null != d || !ad(b, c)
    }, fd = function (a, b) {
        var c = G(a.c(Tb, "")), d = [], e = a.get(Fb);
        if (!b && e) {
            for (var f = 0; f < e[w]; f++) {
                var Be = e[f];
                Be && 1 == Be[ua] && d[n](f + "=" + G(Be[r]) + "=" + G(Be[na]) + "=1")
            }
            0 < d[w] && (c += "|" + d[C]("^"))
        }
        return c ? a.b(O, 1) + "." + c : null
    }, gd = function (a, b, c) {
        c = c ? "" : a.c(O, "1");
        b = b[y](".");
        if (2 > b[w] || ad(b[0], c)) return !1;
        b = b[ja](1)[C](".")[y]("|");
        0 < b[w] && a.set(Tb, I(b[0]));
        if (1 >= b[w]) return !0;
        b = b[1][y](-1 == b[1][q](",") ? "^" : ",");
        for (c = 0; c < b[w]; c++) {
            var d = b[c][y]("=");
            if (4 == d[w]) {
                var e = {};
                ha(e, I(d[1]));
                e.value = I(d[2]);
                e.scope = 1;
                a.get(Fb)[d[0]] = e
            }
        }
        return !0
    }, hd = function (a, b) {
        var c = Ue(a, b);
        return c ? [a.b(O, 1), a.b(ec, 0), a.b(fc, 1), a.b(gc, 1), c][C](".") : ""
    }, Ue = function (a) {
        function b(b, e) {
            if (!F(a.get(b))) {
                var f = a.c(b, ""), f = f[y](" ")[C]("%20"), f = f[y]("+")[C]("%20");
                c[n](e + "=" + f)
            }
        }

        var c = [];
        b(ic, "utmcid");
        b(nc, "utmcsr");
        b(S, "utmgclid");
        b(kc, "utmgclsrc");
        b(lc, "utmdclid");
        b(mc, "utmdsid");
        b(jc, "utmccn");
        b(oc, "utmcmd");
        b(pc, "utmctr");
        b(qc, "utmcct");
        return c[C]("|")
    }, id = function (a, b, c) {
        c = c ? "" : a.c(O, "1");
        b = b[y](".");
        if (5 > b[w] || ad(b[0], c)) return a.set(ec, void 0), a.set(fc, void 0), a.set(gc, void 0), a.set(ic, void 0), a.set(jc, void 0), a.set(nc, void 0), a.set(oc, void 0), a.set(pc, void 0), a.set(qc, void 0), a.set(S, void 0), a.set(kc, void 0), a.set(lc, void 0), a.set(mc, void 0), !1;
        a.set(ec, 1 * b[1]);
        a.set(fc, 1 * b[2]);
        a.set(gc, 1 * b[3]);
        Ve(a, b[ja](4)[C]("."));
        return !0
    }, Ve = function (a, b) {
        function c(a) {
            return (a = b[oa](a + "=(.*?)(?:\\|utm|$)")) && 2 == a[w] ? a[1] : void 0
        }

        function d(b, c) {
            c ? (c = e ? I(c) : c[y]("%20")[C](" "), a.set(b, c)) : a.set(b, void 0)
        }

        -1 == b[q]("=") && (b = I(b));
        var e = "2" == c("utmcvr");
        d(ic, c("utmcid"));
        d(jc, c("utmccn"));
        d(nc, c("utmcsr"));
        d(oc, c("utmcmd"));
        d(pc, c("utmctr"));
        d(qc, c("utmcct"));
        d(S, c("utmgclid"));
        d(kc, c("utmgclsrc"));
        d(lc, c("utmdclid"));
        d(mc, c("utmdsid"))
    }, ad = function (a, b) {
        return b ? a != b : !/^\d+$/[ia](a)
    };
    var Uc = function () {
        this.filters = []
    };
    Uc[x].add = function (a, b) {
        this.filters[n]({name: a, s: b})
    };
    Uc[x].execute = function (a) {
        try {
            for (var b = 0; b < this.filters[w]; b++) this.filters[b].s.call(W, a)
        } catch (c) {
        }
    };

    function jd(a) {
        100 != a.get(vb) && a.get(Q) % 1E4 >= 100 * a.get(vb) && a[ta]()
    }

    function kd(a) {
        ld(a.get(Wa)) && a[ta]()
    }

    function md(a) {
        "file:" == J[z][A] && a[ta]()
    }

    function nd(a) {
        a.get(Ib) || a.set(Ib, J.title, !0);
        a.get(Hb) || a.set(Hb, J[z].pathname + J[z][va], !0)
    };var od = new function () {
        var a = [];
        this.set = function (b) {
            a[b] = !0
        };
        this.Xa = function () {
            for (var b = [], c = 0; c < a[w]; c++) a[c] && (b[m[la](c / 6)] = b[m[la](c / 6)] ^ 1 << c % 6);
            for (c = 0; c < b[w]; c++) b[c] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[ma](b[c] || 0);
            return b[C]("") + "~"
        }
    };

    function H(a) {
        od.set(a)
    };var W = window, J = document, ld = function (a) {
        var b = W._gaUserPrefs;
        if (b && b.ioo && b.ioo() || a && !0 === W["ga-disable-" + a]) return !0;
        try {
            var c = W.external;
            if (c && c._gaUserPrefs && "oo" == c._gaUserPrefs) return !0
        } catch (d) {
        }
        return !1
    }, We = function (a, b) {
        ca(a, b)
    }, pd = function (a) {
        var b = [], c = J.cookie[y](";");
        a = RegExp("^\\s*" + a + "=\\s*(.*?)\\s*$");
        for (var d = 0; d < c[w]; d++) {
            var e = c[d][oa](a);
            e && b[n](e[1])
        }
        return b
    }, X = function (a, b, c, d, e, f) {
        e = ld(e) ? !1 : Sc(d, c) ? !1 : !0;
        if (e) {
            if (b && 0 <= W[za].userAgent[q]("Firefox")) {
                b = b[p](/\n|\r/g, " ");
                e = 0;
                for (var Be = b[w]; e < Be; ++e) {
                    var k = b.charCodeAt(e) & 255;
                    if (10 == k || 13 == k) b = b[B](0, e) + "?" + b[B](e + 1)
                }
            }
            b && 2E3 < b[w] && (b = b[B](0, 2E3), H(69));
            a = a + "=" + b + "; path=" + c + "; ";
            f && (a += "expires=" + (new Date((new Date)[g]() + f)).toGMTString() + "; ");
            d && (a += "domain=" + d + ";");
            J.cookie = a
        }
    };
    var qd, rd, sd = function () {
        if (!qd) {
            var a = {}, b = W[za], c = W.screen;
            a.Q = c ? c.width + "x" + c.height : "-";
            a.P = c ? c.colorDepth + "-bit" : "-";
            a.language = (b && (b.language || b.browserLanguage) || "-")[D]();
            a.javaEnabled = b && b.javaEnabled() ? 1 : 0;
            a.characterSet = J.characterSet || J.charset || "-";
            try {
                var d;
                var e = J.documentElement, f = J.body, Be = f && f[sa] && f[wa], c = [];
                e && (e[sa] && e[wa]) && ("CSS1Compat" === J.compatMode || !Be) ? c = [e[sa], e[wa]] : Be && (c = [f[sa], f[wa]]);
                d = 0 >= c[0] || 0 >= c[1] ? "" : c[C]("x");
                a.Wa = d
            } catch (k) {
                H(135)
            }
            "preview" == b.loadPurpose && H(138);
            qd = a
        }
    }, td = function () {
        sd();
        for (var a = qd, b = W[za], a = b.appName + b.version + a.language + b.platform + b.userAgent + a.javaEnabled + a.Q + a.P + (J.cookie ? J.cookie : "") + (J.referrer ? J.referrer : ""), b = a[w], c = W.history[w]; 0 < c;) a += c-- ^ b++;
        return Yc(a)
    }, ud = function (a) {
        sd();
        var b = qd;
        a.set(Lb, b.Q);
        a.set(Mb, b.P);
        a.set(Pb, b.language);
        a.set(Qb, b.characterSet);
        a.set(Nb, b.javaEnabled);
        a.set(Rb, b.Wa);
        if (a.get(ib) && a.get(jb)) {
            if (!(b = rd)) {
                var c, d, e;
                d = "ShockwaveFlash";
                if ((b = (b = W[za]) ? b.plugins : void 0) && 0 < b[w]) for (c = 0; c < b[w] && !e; c++) d = b[c], -1 < d[r][q]("Shockwave Flash") && (e = d.description[y]("Shockwave Flash ")[1]); else {
                    d = d + "." + d;
                    try {
                        c = new ActiveXObject(d + ".7"), e = c.GetVariable("$version")
                    } catch (f) {
                    }
                    if (!e) try {
                        c = new ActiveXObject(d + ".6"), e = "WIN 6,0,21,0", c.AllowScriptAccess = "always", e = c.GetVariable("$version")
                    } catch (Be) {
                    }
                    if (!e) try {
                        c = new ActiveXObject(d), e = c.GetVariable("$version")
                    } catch (k) {
                    }
                    e && (e = e[y](" ")[1][y](","), e = e[0] + "." + e[1] + " r" + e[2])
                }
                b = e ? e : "-"
            }
            rd = b;
            a.set(Ob, rd)
        } else a.set(Ob, "-")
    };
    var vd = function (a) {
        if (Ba(a)) this.s = a; else {
            var b = a[0], c = b.lastIndexOf(":"), d = b.lastIndexOf(".");
            this.h = this.i = this.l = "";
            -1 == c && -1 == d ? this.h = b : -1 == c && -1 != d ? (this.i = b[B](0, d), this.h = b[B](d + 1)) : -1 != c && -1 == d ? (this.l = b[B](0, c), this.h = b[B](c + 1)) : c > d ? (this.i = b[B](0, d), this.l = b[B](d + 1, c), this.h = b[B](c + 1)) : (this.i = b[B](0, d), this.h = b[B](d + 1));
            this.k = a[ja](1);
            this.Ma = !this.l && "_require" == this.h;
            this.J = !this.i && !this.l && "_provide" == this.h
        }
    }, Y = function () {
        T(Y[x], "push", Y[x][n], 5);
        T(Y[x], "_getPlugin", Pc, 121);
        T(Y[x], "_createAsyncTracker", Y[x].Sa, 33);
        T(Y[x], "_getAsyncTracker", Y[x].Ta, 34);
        this.I = new Ja;
        this.p = []
    };
    E = Y[x];
    E.Na = function (a, b, c) {
        var d = this.I.get(a);
        if (!Ba(d)) return !1;
        b.plugins_ = b.plugins_ || new Ja;
        b.plugins_.set(a, new d(b, c || {}));
        return !0
    };
    E.push = function (a) {
        var b = Z.Va[ya](this, arguments), b = Z.p.concat(b);
        for (Z.p = []; 0 < b[w] && !Z.O(b[0]) && !(b.shift(), 0 < Z.p[w]);) ;
        Z.p = Z.p.concat(b);
        return 0
    };
    E.Va = function (a) {
        for (var b = [], c = 0; c < arguments[w]; c++) try {
            var d = new vd(arguments[c]);
            d.J ? this.O(d) : b[n](d)
        } catch (e) {
        }
        return b
    };
    E.O = function (a) {
        try {
            if (a.s) a.s[ya](W); else if (a.J) this.I.set(a.k[0], a.k[1]); else {
                var b = "_gat" == a.i ? M : "_gaq" == a.i ? Z : M.u(a.i);
                if (a.Ma) {
                    if (!this.Na(a.k[0], b, a.k[2])) {
                        if (!a.Pa) {
                            var c = Oa("" + a.k[1]);
                            var d = c[A], e = J[z][A];
                            var f;
                            if (f = "https:" == d || d == e ? !0 : "http:" != d ? !1 : "http:" == e) {
                                var Be;
                                t:{
                                    var k = Oa(J[z][xa]);
                                    if (!(c.Oa || 0 <= c.url[q]("?") || 0 <= c[ra][q]("://") || c[u] == k[u] && c[pa] == k[pa])) for (var s = "http:" == c[A] ? 80 : 443, t = M.S, b = 0; b < t[w]; b++) if (c[u] == t[b][0] && (c[pa] || s) == (t[b][1] || s) && 0 == c[ra][q](t[b][2])) {
                                        Be = !0;
                                        break t
                                    }
                                    Be = !1
                                }
                                f = Be && !ld()
                            }
                            f && (a.Pa = Ia(c.url))
                        }
                        return !0
                    }
                } else a.l && (b = b.plugins_.get(a.l)), b[a.h][ya](b, a.k)
            }
        } catch (Za) {
        }
    };
    E.Sa = function (a, b) {
        return M.r(a, b || "")
    };
    E.Ta = function (a) {
        return M.u(a)
    };
    var yd = function () {
        function a(a, b, c, d) {
            void 0 == f[a] && (f[a] = {});
            void 0 == f[a][b] && (f[a][b] = []);
            f[a][b][c] = d
        }

        function b(a, b, c) {
            if (void 0 != f[a] && void 0 != f[a][b]) return f[a][b][c]
        }

        function c(a, b) {
            if (void 0 != f[a] && void 0 != f[a][b]) {
                f[a][b] = void 0;
                var c = !0, d;
                for (d = 0; d < Be[w]; d++) if (void 0 != f[a][Be[d]]) {
                    c = !1;
                    break
                }
                c && (f[a] = void 0)
            }
        }

        function d(a) {
            var b = "", c = !1, d, e;
            for (d = 0; d < Be[w]; d++) if (e = a[Be[d]], void 0 != e) {
                c && (b += Be[d]);
                for (var c = [], f = void 0, ga = void 0, ga = 0; ga < e[w]; ga++) if (void 0 != e[ga]) {
                    f = "";
                    ga != mb && void 0 == e[ga - 1] && (f += ga[v]() + Za);
                    for (var Cd = e[ga], Jc = "", Yb = void 0, Kc = void 0, Lc = void 0, Yb = 0; Yb < Cd[w]; Yb++) Kc = Cd[ma](Yb), Lc = Ma[Kc], Jc += void 0 != Lc ? Lc : Kc;
                    f += Jc;
                    c[n](f)
                }
                b += k + c[C](t) + s;
                c = !1
            } else c = !0;
            return b
        }

        var e = this, f = [], Be = ["k", "v"], k = "(", s = ")", t = "*", Za = "!", Ma = {"'": "'0"};
        Ma[s] = "'1";
        Ma[t] = "'2";
        Ma[Za] = "'3";
        var mb = 1;
        e.Ra = function (a) {
            return void 0 != f[a]
        };
        e.A = function () {
            for (var a = "", b = 0; b < f[w]; b++) void 0 != f[b] && (a += b[v]() + d(f[b]));
            return a
        };
        e.Qa = function (a) {
            if (void 0 == a) return e.A();
            for (var b = a.A(), c = 0; c < f[w]; c++) void 0 == f[c] || a.Ra(c) || (b += c[v]() + d(f[c]));
            return b
        };
        e.f = function (b, c, d) {
            if (!wd(d)) return !1;
            a(b, "k", c, d);
            return !0
        };
        e.o = function (b, c, d) {
            if (!xd(d)) return !1;
            a(b, "v", c, d[v]());
            return !0
        };
        e.getKey = function (a, c) {
            return b(a, "k", c)
        };
        e.N = function (a, c) {
            return b(a, "v", c)
        };
        e.L = function (a) {
            c(a, "k")
        };
        e.M = function (a) {
            c(a, "v")
        };
        T(e, "_setKey", e.f, 89);
        T(e, "_setValue", e.o, 90);
        T(e, "_getKey", e.getKey, 87);
        T(e, "_getValue", e.N, 88);
        T(e, "_clearKey", e.L, 85);
        T(e, "_clearValue", e.M, 86)
    };

    function wd(a) {
        return "string" == typeof a
    }

    function xd(a) {
        return !("number" == typeof a || void 0 != Number && a instanceof Number) || m.round(a) != a || da(a) || a == ba ? !1 : !0
    };var zd = function (a) {
        var b = W.gaGlobal;
        a && !b && (W.gaGlobal = b = {});
        return b
    }, Ad = function () {
        var a = zd(!0).hid;
        null == a && (a = Ea(), zd(!0).hid = a);
        return a
    }, Dd = function (a) {
        a.set(Kb, Ad());
        var b = zd();
        if (b && b.dh == a.get(O)) {
            var c = b.sid;
            c && (a.get(ac) ? H(112) : H(132), a.set(Zb, c), a.get(Sb) && a.set(Wb, c));
            b = b.vid;
            a.get(Sb) && b && (b = b[y]("."), a.set(Q, 1 * b[0]), a.set(Vb, 1 * b[1]))
        }
    };
    var Ed, Fd = function (a, b, c, d) {
        var e = a.c(bb, ""), f = a.c(P, "/");
        d = void 0 != d ? d : a.b(cb, 0);
        a = a.c(Wa, "");
        X(b, c, f, e, a, d)
    }, Xc = function (a) {
        var b = a.c(bb, "");
        a.b(O, 1);
        var c = a.c(P, "/"), d = a.c(Wa, "");
        X("__utma", cd(a), c, b, d, a.get(cb));
        X("__utmb", dd(a), c, b, d, a.get(db));
        X("__utmc", "" + a.b(O, 1), c, b, d);
        var e = hd(a, !0);
        e ? X("__utmz", e, c, b, d, a.get(eb)) : X("__utmz", "", c, b, "", -1);
        (e = fd(a, !1)) ? X("__utmv", e, c, b, d, a.get(cb)) : X("__utmv", "", c, b, "", -1)
    }, Wc = function (a) {
        var b = a.b(O, 1);
        if (!bd(a, $c(b, pd("__utma")))) return a.set(Ub, !0), !1;
        var c = !ed(a, $c(b, pd("__utmb")));
        a.set(bc, c);
        id(a, $c(b, pd("__utmz")));
        gd(a, $c(b, pd("__utmv")));
        Ed = !c;
        return !0
    }, Gd = function (a) {
        Ed || 0 < pd("__utmb")[w] || (X("__utmd", "1", a.c(P, "/"), a.c(bb, ""), a.c(Wa, ""), 1E4), 0 == pd("__utmd")[w] && a[ta]())
    };
    var h = 0, Jd = function (a) {
        void 0 == a.get(Q) ? Hd(a) : a.get(Ub) && !a.get(Mc) ? Hd(a) : a.get(bc) && (Id(a), h++, 1 < h && H(137))
    }, Kd = function (a) {
        a.get(hc) && !a.get(ac) && (Id(a), a.set(fc, a.get($b)))
    }, Hd = function (a) {
        var b = a.get(ab);
        a.set(Sb, !0);
        a.set(Q, Ea() ^ td(a) & 2147483647);
        a.set(Tb, "");
        a.set(Vb, b);
        a.set(Wb, b);
        a.set(Zb, b);
        a.set($b, 1);
        a.set(ac, !0);
        a.set(cc, 0);
        a.set(R, 10);
        a.set(dc, b);
        a.set(Fb, []);
        a.set(Ub, !1);
        a.set(bc, !1)
    }, Id = function (a) {
        a.set(Wb, a.get(Zb));
        a.set(Zb, a.get(ab));
        a.Za($b);
        a.set(ac, !0);
        a.set(cc, 0);
        a.set(R, 10);
        a.set(dc, a.get(ab));
        a.set(bc, !1)
    };
    var Ld = "daum:q eniro:search_word naver:query pchome:q images.google:q google:q yahoo:p yahoo:q msn:q bing:q aol:query aol:q lycos:q lycos:query ask:q netscape:query cnn:query about:terms mamma:q voila:rdata virgilio:qs live:q baidu:wd alice:qs yandex:text najdi:q seznam:q rakuten:qt biglobe:q goo.ne:MT wp:szukaj onet:qt yam:k kvasir:q ozu:q terra:query rambler:query conduit:q babylon:q search-results:q avg:q comcast:q incredimail:q startsiden:q go.mail.ru:q search.centrum.cz:q 360.cn:q".split(" "),
        Sd = function (a) {
            if (a.get(kb) && !a.get(Mc)) {
                for (var b = !F(a.get(ic)) || !F(a.get(nc)) || !F(a.get(S)) || !F(a.get(lc)), c = {}, d = 0; d < Md[w]; d++) {
                    var e = Md[d];
                    c[e] = a.get(e)
                }
                (d = a.get(rc)) ? (H(149), e = new Ja, Na(e, d), d = e) : d = La(J[z][xa], a.get(gb)).d;
                if ("1" != L(d.get(a.get(ub))) || !b) if (d = Xe(a, d) || Qd(a), d || (b || !a.get(ac)) || (Pd(a, void 0, "(direct)", void 0, void 0, void 0, "(direct)", "(none)", void 0, void 0), d = !0), d && (a.set(hc, Rd(a, c)), b = "(direct)" == a.get(nc) && "(direct)" == a.get(jc) && "(none)" == a.get(oc), a.get(hc) || a.get(ac) && !b)) a.set(ec, a.get(ab)), a.set(fc, a.get($b)), a.Za(gc)
            }
        }, Xe = function (a, b) {
            function c(c, d) {
                d = d || "-";
                var e = L(b.get(a.get(c)));
                return e && "-" != e ? I(e) : d
            }

            var d = L(b.get(a.get(nb))) || "-", e = L(b.get(a.get(qb))) || "-", f = L(b.get(a.get(pb))) || "-",
                Be = L(b.get("gclsrc")) || "-", k = L(b.get("dclid")) || "-", s = c(ob, "(not set)"),
                t = c(rb, "(not set)"), Za = c(sb), Ma = c(tb);
            if (F(d) && F(f) && F(k) && F(e)) return !1;
            var mb = !F(f) && !F(Be), mb = F(e) && (!F(k) || mb), Xb = F(Za);
            if (mb || Xb) {
                var Bd = Nd(a), Bd = La(Bd, !0);
                (Bd = Od(a, Bd)) && !F(Bd[1] && !Bd[2]) && (mb && (e = Bd[0]), Xb && (Za = Bd[1]))
            }
            Pd(a, d, e, f, Be, k, s, t, Za, Ma);
            return !0
        }, Qd = function (a) {
            var b = Nd(a), c = La(b, !0);
            if (!(void 0 != b && null != b && "" != b && "0" != b && "-" != b && 0 <= b[q]("://")) || c && -1 < c[u][q]("google") && c.d.contains("q") && "cse" == c[ra]) return !1;
            if ((b = Od(a, c)) && !b[2]) return Pd(a, void 0, b[0], void 0, void 0, void 0, "(organic)", "organic", b[1], void 0), !0;
            if (b || !a.get(ac)) return !1;
            t:{
                for (var b = a.get(Bb), d = Ka(c[u]), e = 0; e < b[w]; ++e) if (-1 < d[q](b[e])) {
                    a = !1;
                    break t
                }
                Pd(a, void 0, d, void 0, void 0, void 0, "(referral)", "referral", void 0, "/" + c[ra]);
                a = !0
            }
            return a
        }, Od = function (a, b) {
            for (var c = a.get(zb), d = 0; d < c[w]; ++d) {
                var e = c[d][y](":");
                if (-1 < b[u][q](e[0][D]())) {
                    var f = b.d.get(e[1]);
                    if (f && (f = K(f), !f && -1 < b[u][q]("google.") && (f = "(not provided)"), !e[3] || -1 < b.url[q](e[3]))) {
                        t:{
                            for (var c = f, d = a.get(Ab), c = I(c)[D](), Be = 0; Be < d[w]; ++Be) if (c == d[Be]) {
                                c = !0;
                                break t
                            }
                            c = !1
                        }
                        return [e[2] || e[0], f, c]
                    }
                }
            }
            return null
        }, Pd = function (a, b, c, d, e, f, Be, k, s, t) {
            a.set(ic, b);
            a.set(nc, c);
            a.set(S, d);
            a.set(kc, e);
            a.set(lc, f);
            a.set(jc, Be);
            a.set(oc, k);
            a.set(pc, s);
            a.set(qc, t)
        }, Md = [jc, ic, S, lc, nc, oc, pc, qc], Rd = function (a, b) {
            function c(a) {
                a = ("" + a)[y]("+")[C]("%20");
                return a = a[y](" ")[C]("%20")
            }

            function d(c) {
                var d = "" + (a.get(c) || "");
                c = "" + (b[c] || "");
                return 0 < d[w] && d == c
            }

            if (d(S) || d(lc)) return H(131), !1;
            for (var e = 0; e < Md[w]; e++) {
                var f = Md[e], Be = b[f] || "-", f = a.get(f) || "-";
                if (c(Be) != c(f)) return !0
            }
            return !1
        }, Td = RegExp(/^https:\/\/(www\.)?google(\.com?)?(\.[a-z]{2}t?)?\/?$/i), Nd = function (a) {
            a = Pa(a.get(Jb), a.get(P));
            try {
                if (Td[ia](a)) return H(136), a + "?q="
            } catch (b) {
                H(145)
            }
            return a
        };
    var Ud, Vd, Wd = function (a) {
        Ud = a.c(S, "");
        Vd = a.c(kc, "")
    }, Xd = function (a) {
        var b = a.c(S, ""), c = a.c(kc, "");
        b != Ud && (-1 < c[q]("ds") ? a.set(mc, void 0) : !F(Ud) && -1 < Vd[q]("ds") && a.set(mc, Ud))
    };
    var Zd = function (a) {
        Yd(a, J[z][xa]) ? (a.set(Mc, !0), H(12)) : a.set(Mc, !1)
    }, Yd = function (a, b) {
        if (!a.get(fb)) return !1;
        var c = La(b, a.get(gb)), d = K(c.d.get("__utma")), e = K(c.d.get("__utmb")), f = K(c.d.get("__utmc")),
            Be = K(c.d.get("__utmx")), k = K(c.d.get("__utmz")), s = K(c.d.get("__utmv")), c = K(c.d.get("__utmk"));
        if (Yc("" + d + e + f + Be + k + s) != c) {
            d = I(d);
            e = I(e);
            f = I(f);
            Be = I(Be);
            f = $d(d + e + f + Be, k, s, c);
            if (!f) return !1;
            k = f[0];
            s = f[1]
        }
        if (!bd(a, d, !0)) return !1;
        ed(a, e, !0);
        id(a, k, !0);
        gd(a, s, !0);
        ae(a, Be, !0);
        return !0
    }, ce = function (a, b, c) {
        var d;
        d = cd(a) || "-";
        var e = dd(a) || "-", f = "" + a.b(O, 1) || "-", Be = be(a) || "-", k = hd(a, !1) || "-";
        a = fd(a, !1) || "-";
        var s = Yc("" + d + e + f + Be + k + a), t = [];
        t[n]("__utma=" + d);
        t[n]("__utmb=" + e);
        t[n]("__utmc=" + f);
        t[n]("__utmx=" + Be);
        t[n]("__utmz=" + k);
        t[n]("__utmv=" + a);
        t[n]("__utmk=" + s);
        d = t[C]("&");
        if (!d) return b;
        e = b[q]("#");
        if (c) return 0 > e ? b + "#" + d : b + "&" + d;
        c = "";
        f = b[q]("?");
        0 < e && (c = b[B](e), b = b[B](0, e));
        return 0 > f ? b + "?" + d + c : b + "&" + d + c
    }, $d = function (a, b, c, d) {
        for (var e = 0; 3 > e; e++) {
            for (var f = 0; 3 > f; f++) {
                if (d == Yc(a + b + c)) return H(127), [b, c];
                var Be = b[p](/ /g, "%20"), k = c[p](/ /g, "%20");
                if (d == Yc(a + Be + k)) return H(128), [Be, k];
                Be = Be[p](/\+/g, "%20");
                k = k[p](/\+/g, "%20");
                if (d == Yc(a + Be + k)) return H(129), [Be, k];
                try {
                    var s = b[oa]("utmctr=(.*?)(?:\\|utm|$)");
                    if (s && 2 == s[w] && (Be = b[p](s[1], G(I(s[1]))), d == Yc(a + Be + c))) return H(139), [Be, c]
                } catch (t) {
                }
                b = I(b)
            }
            c = I(c)
        }
    };
    var de = "|", fe = function (a, b, c, d, e, f, Be, k, s) {
        var t = ee(a, b);
        t || (t = {}, a.get(Cb)[n](t));
        t.id_ = b;
        t.affiliation_ = c;
        t.total_ = d;
        t.tax_ = e;
        t.shipping_ = f;
        t.city_ = Be;
        t.state_ = k;
        t.country_ = s;
        t.items_ = t.items_ || [];
        return t
    }, ge = function (a, b, c, d, e, f, Be) {
        a = ee(a, b) || fe(a, b, "", 0, 0, 0, "", "", "");
        var k;
        t:{
            if (a && a.items_) {
                k = a.items_;
                for (var s = 0; s < k[w]; s++) if (k[s].sku_ == c) {
                    k = k[s];
                    break t
                }
            }
            k = null
        }
        s = k || {};
        s.transId_ = b;
        s.sku_ = c;
        s.name_ = d;
        s.category_ = e;
        s.price_ = f;
        s.quantity_ = Be;
        k || a.items_[n](s);
        return s
    }, ee = function (a, b) {
        for (var c = a.get(Cb), d = 0; d < c[w]; d++) if (c[d].id_ == b) return c[d];
        return null
    };
    var he, ie = function (a) {
        if (!he) {
            var b;
            b = J[z].hash;
            var c = W[r], d = /^#?gaso=([^&]*)/;
            if (c = (b = (b = b && b[oa](d) || c && c[oa](d)) ? b[1] : K(pd("GASO"))) && b[oa](/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i)) Fd(a, "GASO", "" + b, 0), M._gasoDomain = a.get(bb), M._gasoCPath = a.get(P), a = c[1], Ia("https://www.google.com/analytics/web/inpage/pub/inpage.js?" + (a ? "prefix=" + a + "&" : "") + Ea(), "_gasojs");
            he = !0
        }
    };
    var ae = function (a, b, c) {
        c && (b = I(b));
        c = a.b(O, 1);
        b = b[y](".");
        2 > b[w] || !/^\d+$/[ia](b[0]) || (b[0] = "" + c, Fd(a, "__utmx", b[C]("."), void 0))
    }, be = function (a, b) {
        var c = $c(a.get(O), pd("__utmx"));
        "-" == c && (c = "");
        return b ? G(c) : c
    }, Ye = function (a) {
        try {
            var b = La(J[z][xa], !1), c = ea(L(b.d.get("utm_referrer"))) || "";
            c && a.set(Jb, c);
            var d = ea(K(b.d.get("utm_expid"))) || "";
            d && (d = d[y](".")[0], a.set(Oc, "" + d))
        } catch (e) {
            H(146)
        }
    }, l = function (a) {
        var b = W.gaData && W.gaData.expId;
        b && a.set(Oc, "" + b)
    };
    var ke = function (a, b) {
        var c = m.min(a.b(Dc, 0), 100);
        if (a.b(Q, 0) % 100 >= c) return !1;
        c = Ze() || $e();
        if (void 0 == c) return !1;
        var d = c[0];
        if (void 0 == d || d == ba || da(d)) return !1;
        0 < d ? af(c) ? b(je(c)) : b(je(c[ja](0, 1))) : Ga(W, "load", function () {
            ke(a, b)
        }, !1);
        return !0
    }, me = function (a, b, c, d) {
        var e = new yd;
        e.f(14, 90, b[B](0, 500));
        e.f(14, 91, a[B](0, 150));
        e.f(14, 92, "" + le(c));
        void 0 != d && e.f(14, 93, d[B](0, 500));
        e.o(14, 90, c);
        return e
    }, af = function (a) {
        for (var b = 1; b < a[w]; b++) if (da(a[b]) || a[b] == ba || 0 > a[b]) return !1;
        return !0
    }, le = function (a) {
        return da(a) || 0 > a ? 0 : 5E3 > a ? 10 * m[la](a / 10) : 5E4 > a ? 100 * m[la](a / 100) : 41E5 > a ? 1E3 * m[la](a / 1E3) : 41E5
    }, je = function (a) {
        for (var b = new yd, c = 0; c < a[w]; c++) b.f(14, c + 1, "" + le(a[c])), b.o(14, c + 1, a[c]);
        return b
    }, Ze = function () {
        var a = W.performance || W.webkitPerformance;
        if (a = a && a.timing) {
            var b = a.navigationStart;
            if (0 == b) H(133); else return [a.loadEventStart - b, a.domainLookupEnd - a.domainLookupStart, a.connectEnd - a.connectStart, a.responseStart - a.requestStart, a.responseEnd - a.responseStart, a.fetchStart - b, a.domInteractive - b, a.domContentLoadedEventStart -
            b]
        }
    }, $e = function () {
        if (W.top == W) {
            var a = W.external, b = a && a.onloadT;
            a && !a.isValidLoadTime && (b = void 0);
            2147483648 < b && (b = void 0);
            0 < b && a.setPageReadyTime();
            return void 0 == b ? void 0 : [b]
        }
    };
    var cf = function (a) {
        if (a.get(Sb)) try {
            var b;
            t:{
                var c = pd(a.get(Oe) || "_ga");
                if (c && !(1 > c[w])) {
                    for (var d = [], e = 0; e < c[w]; e++) {
                        var f;
                        var Be = c[e][y]("."), k = Be.shift();
                        if (("GA1" == k || "1" == k) && 1 < Be[w]) {
                            var s = Be.shift()[y]("-");
                            1 == s[w] && (s[1] = "1");
                            s[0] *= 1;
                            s[1] *= 1;
                            f = {Ya: s, $a: Be[C](".")}
                        } else f = void 0;
                        f && d[n](f)
                    }
                    if (1 == d[w]) {
                        b = d[0].$a;
                        break t
                    }
                    if (0 != d[w]) {
                        var t = a.get(Pe) || a.get(bb), d = bf(d, (0 == t[q](".") ? t.substr(1) : t)[y](".")[w], 0);
                        if (1 == d[w]) {
                            b = d[0].$a;
                            break t
                        }
                        var Za = a.get(Qe) || a.get(P);
                        (c = Za) ? (1 < c[w] && "/" == c[ma](c[w] -
                            1) && (c = c.substr(0, c[w] - 1)), 0 != c[q]("/") && (c = "/" + c), Za = c) : Za = "/";
                        d = bf(d, "/" == Za ? 1 : Za[y]("/")[w], 1);
                        b = d[0].$a;
                        break t
                    }
                }
                b = void 0
            }
            if (b) {
                var Ma = ("" + b)[y](".");
                2 == Ma[w] && /[0-9.]/[ia](Ma) && (H(114), a.set(Q, Ma[0]), a.set(Vb, Ma[1]), a.set(Sb, !1))
            }
        } catch (mb) {
            H(115)
        }
    }, bf = function (a, b, c) {
        for (var d = [], e = [], f = 128, Be = 0; Be < a[w]; Be++) {
            var k = a[Be];
            if (k.Ya[c] == b) d[n](k); else if (k.Ya[c] == f) e[n](k); else k.Ya[c] < f && (e = [k], f = k.Ya[c])
        }
        return 0 < d[w] ? d : e
    };
    var U = function (a, b, c) {
        function d(a) {
            return function (b) {
                if ((b = b.get(Nc)[a]) && b[w]) for (var c = Te(e, a), d = 0; d < b[w]; d++) b[d].call(e, c)
            }
        }

        var e = this;
        this.a = new Zc;
        this.get = function (a) {
            return this.a.get(a)
        };
        this.set = function (a, b, c) {
            this.a.set(a, b, c)
        };
        this.set(Wa, b || "UA-XXXXX-X");
        this.set($a, a || "");
        this.set(Ya, c || "");
        this.set(ab, m.round((new Date)[g]() / 1E3));
        this.set(P, "/");
        this.set(cb, 63072E6);
        this.set(eb, 15768E6);
        this.set(db, 18E5);
        this.set(fb, !1);
        this.set(yb, 50);
        this.set(gb, !1);
        this.set(hb, !0);
        this.set(ib, !0);
        this.set(jb, !0);
        this.set(kb, !0);
        this.set(lb, !0);
        this.set(ob, "utm_campaign");
        this.set(nb, "utm_id");
        this.set(pb, "gclid");
        this.set(qb, "utm_source");
        this.set(rb, "utm_medium");
        this.set(sb, "utm_term");
        this.set(tb, "utm_content");
        this.set(ub, "utm_nooverride");
        this.set(vb, 100);
        this.set(Dc, 1);
        this.set(Ec, !1);
        this.set(wb, "/__utm.gif");
        this.set(xb, 1);
        this.set(Cb, []);
        this.set(Fb, []);
        this.set(zb, Ld[ja](0));
        this.set(Ab, []);
        this.set(Bb, []);
        this.B("auto");
        this.set(Jb, J.referrer);
        Ye(this.a);
        this.set(Nc, {hit: [], load: []});
        this.a.g("0", Zd);
        this.a.g("1", Wd);
        this.a.g("2", Jd);
        this.a.g("3", cf);
        this.a.g("4", Sd);
        this.a.g("5", Xd);
        this.a.g("6", Kd);
        this.a.g("7", d("load"));
        this.a.g("8", ie);
        this.a.e("A", kd);
        this.a.e("B", md);
        this.a.e("C", Jd);
        this.a.e("D", jd);
        this.a.e("E", Tc);
        this.a.e("F", ne);
        this.a.e("G", Gd);
        this.a.e("H", nd);
        this.a.e("I", ud);
        this.a.e("J", Dd);
        this.a.e("K", l);
        this.a.e("L", d("hit"));
        this.a.e("M", oe);
        this.a.e("N", pe);
        0 === this.get(ab) && H(111);
        this.a.T();
        this.H = void 0
    };
    E = U[x];
    E.m = function () {
        var a = this.get(Db);
        a || (a = new yd, this.set(Db, a));
        return a
    };
    E.La = function (a) {
        for (var b in a) {
            var c = a[b];
            a.hasOwnProperty(b) && this.set(b, c, !0)
        }
    };
    E.K = function (a) {
        if (this.get(Ec)) return !1;
        var b = this, c = ke(this.a, function (c) {
            b.set(Hb, a, !0);
            b.t(c)
        });
        this.set(Ec, c);
        return c
    };
    E.Fa = function (a) {
        a && Ca(a) ? (H(13), this.set(Hb, a, !0)) : "object" === typeof a && null !== a && this.La(a);
        this.H = a = this.get(Hb);
        this.a.j("page");
        this.K(a)
    };
    E.F = function (a, b, c, d, e) {
        if ("" == a || (!wd(a) || "" == b || !wd(b)) || void 0 != c && !wd(c) || void 0 != d && !xd(d)) return !1;
        this.set(wc, a, !0);
        this.set(xc, b, !0);
        this.set(yc, c, !0);
        this.set(zc, d, !0);
        this.set(vc, !!e, !0);
        this.a.j("event");
        return !0
    };
    E.Ha = function (a, b, c, d, e) {
        var f = this.a.b(Dc, 0);
        1 * e === e && (f = e);
        if (this.a.b(Q, 0) % 100 >= f) return !1;
        c = 1 * ("" + c);
        if ("" == a || (!wd(a) || "" == b || !wd(b) || !xd(c) || da(c) || 0 > c || 0 > f || 100 < f) || void 0 != d && ("" == d || !wd(d))) return !1;
        this.t(me(a, b, c, d));
        return !0
    };
    E.Ga = function (a, b, c, d) {
        if (!a || !b) return !1;
        this.set(Ac, a, !0);
        this.set(Bc, b, !0);
        this.set(Cc, c || J[z][xa], !0);
        d && this.set(Hb, d, !0);
        this.a.j("social");
        return !0
    };
    E.Ea = function () {
        this.set(Dc, 10);
        this.K(this.H)
    };
    E.Ia = function () {
        this.a.j("trans")
    };
    E.t = function (a) {
        this.set(Eb, a, !0);
        this.a.j("event")
    };
    E.ia = function (a) {
        this.v();
        var b = this;
        return {
            _trackEvent: function (c, d, e) {
                H(91);
                b.F(a, c, d, e)
            }
        }
    };
    E.ma = function (a) {
        return this.get(a)
    };
    E.xa = function (a, b) {
        if (a) if (Ca(a)) this.set(a, b); else if ("object" == typeof a) for (var c in a) a.hasOwnProperty(c) && this.set(c, a[c])
    };
    E.addEventListener = function (a, b) {
        var c = this.get(Nc)[a];
        c && c[n](b)
    };
    E.removeEventListener = function (a, b) {
        for (var c = this.get(Nc)[a], d = 0; c && d < c[w]; d++) if (c[d] == b) {
            c.splice(d, 1);
            break
        }
    };
    E.qa = function () {
        return "5.4.4"
    };
    E.B = function (a) {
        this.get(hb);
        a = "auto" == a ? Ka(J.domain) : a && "-" != a && "none" != a ? a[D]() : "";
        this.set(bb, a)
    };
    E.va = function (a) {
        this.set(hb, !!a)
    };
    E.na = function (a, b) {
        return ce(this.a, a, b)
    };
    E.link = function (a, b) {
        if (this.a.get(fb) && a) {
            var c = ce(this.a, a, b);
            J[z].href = c
        }
    };
    E.ua = function (a, b) {
        this.a.get(fb) && (a && a.action) && (a.action = ce(this.a, a.action, b))
    };
    E.za = function () {
        this.v();
        var a = this.a,
            b = J.getElementById ? J.getElementById("utmtrans") : J.utmform && J.utmform.utmtrans ? J.utmform.utmtrans : null;
        if (b && b[na]) {
            a.set(Cb, []);
            for (var b = b[na][y]("UTM:"), c = 0; c < b[w]; c++) {
                b[c] = Da(b[c]);
                for (var d = b[c][y](de), e = 0; e < d[w]; e++) d[e] = Da(d[e]);
                "T" == d[0] ? fe(a, d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8]) : "I" == d[0] && ge(a, d[1], d[2], d[3], d[4], d[5], d[6])
            }
        }
    };
    E.$ = function (a, b, c, d, e, f, Be, k) {
        return fe(this.a, a, b, c, d, e, f, Be, k)
    };
    E.Y = function (a, b, c, d, e, f) {
        return ge(this.a, a, b, c, d, e, f)
    };
    E.Aa = function (a) {
        de = a || "|"
    };
    E.ea = function () {
        this.set(Cb, [])
    };
    E.wa = function (a, b, c, d) {
        var e = this.a;
        if (0 >= a || a > e.get(yb)) a = !1; else if (!b || !c || 128 < b[w] + c[w]) a = !1; else {
            1 != d && 2 != d && (d = 3);
            var f = {};
            ha(f, b);
            f.value = c;
            f.scope = d;
            e.get(Fb)[a] = f;
            a = !0
        }
        a && this.a.n();
        return a
    };
    E.ka = function (a) {
        this.a.get(Fb)[a] = void 0;
        this.a.n()
    };
    E.ra = function (a) {
        return (a = this.a.get(Fb)[a]) && 1 == a[ua] ? a[na] : void 0
    };
    E.Ca = function (a, b, c) {
        this.m().f(a, b, c)
    };
    E.Da = function (a, b, c) {
        this.m().o(a, b, c)
    };
    E.sa = function (a, b) {
        return this.m().getKey(a, b)
    };
    E.ta = function (a, b) {
        return this.m().N(a, b)
    };
    E.fa = function (a) {
        this.m().L(a)
    };
    E.ga = function (a) {
        this.m().M(a)
    };
    E.ja = function () {
        return new yd
    };
    E.W = function (a) {
        a && this.get(Ab)[n](a[D]())
    };
    E.ba = function () {
        this.set(Ab, [])
    };
    E.X = function (a) {
        a && this.get(Bb)[n](a[D]())
    };
    E.ca = function () {
        this.set(Bb, [])
    };
    E.Z = function (a, b, c, d, e) {
        if (a && b) {
            a = [a, b[D]()][C](":");
            if (d || e) a = [a, d, e][C](":");
            d = this.get(zb);
            d.splice(c ? 0 : d[w], 0, a)
        }
    };
    E.da = function () {
        this.set(zb, [])
    };
    E.ha = function (a) {
        this.a[ka]();
        var b = this.get(P), c = be(this.a);
        this.set(P, a);
        this.a.n();
        ae(this.a, c);
        this.set(P, b)
    };
    E.ya = function (a, b) {
        if (0 < a && 5 >= a && Ca(b) && "" != b) {
            var c = this.get(Fc) || [];
            c[a] = b;
            this.set(Fc, c)
        }
    };
    E.V = function (a) {
        a = "" + a;
        if (a[oa](/^[A-Za-z0-9]{1,5}$/)) {
            var b = this.get(Ic) || [];
            b[n](a);
            this.set(Ic, b)
        }
    };
    E.v = function () {
        this.a[ka]()
    };
    E.Ba = function (a) {
        a && "" != a && (this.set(Tb, a), this.a.j("var"))
    };
    var ne = function (a) {
        "trans" !== a.get(sc) && 500 <= a.b(cc, 0) && a[ta]();
        if ("event" === a.get(sc)) {
            var b = (new Date)[g](), c = a.b(dc, 0), d = a.b(Zb, 0),
                c = m[la](1 * ((b - (c != d ? c : 1E3 * c)) / 1E3));
            0 < c && (a.set(dc, b), a.set(R, m.min(10, a.b(R, 0) + c)));
            0 >= a.b(R, 0) && a[ta]()
        }
    }, pe = function (a) {
        "event" === a.get(sc) && a.set(R, m.max(0, a.b(R, 10) - 1))
    };
    var qe = function () {
        var a = [];
        this.add = function (b, c, d) {
            d && (c = G("" + c));
            a[n](b + "=" + c)
        };
        this.toString = function () {
            return a[C]("&")
        }
    }, re = function (a, b) {
        (b || 2 != a.get(xb)) && a.Za(cc)
    }, se = function (a, b) {
        b.add("utmwv", "5.4.4");
        b.add("utms", a.get(cc));
        b.add("utmn", Ea());
        var c = J[z].hostname;
        F(c) || b.add("utmhn", c, !0);
        c = a.get(vb);
        100 != c && b.add("utmsp", c, !0)
    }, te = function (a, b) {
        b.add("utmht", (new Date)[g]());
        b.add("utmac", Da(a.get(Wa)));
        a.get(Oc) && b.add("utmxkey", a.get(Oc), !0);
        a.get(vc) && b.add("utmni", 1);
        var c = a.get(Ic);
        c && 0 < c[w] && b.add("utmdid", c[C]("."));
        ff(a, b);
        !1 !== a.get(Xa) && (a.get(Xa) || M.w) && b.add("aip", 1);
        1 < M.ab() && b.add("utmmt", 1);
        b.add("utmu", od.Xa())
    }, ue = function (a, b) {
        for (var c = a.get(Fc) || [], d = [], e = 1; e < c[w]; e++) c[e] && d[n](e + ":" + G(c[e][p](/%/g, "%25")[p](/:/g, "%3A")[p](/,/g, "%2C")));
        d[w] && b.add("utmpg", d[C](","))
    }, ff = function (a, b) {
        function c(a, b) {
            b && d[n](a + "=" + b + ";")
        }

        var d = [];
        c("__utma", cd(a));
        c("__utmz", hd(a, !1));
        c("__utmv", fd(a, !0));
        c("__utmx", be(a));
        b.add("utmcc", d[C]("+"), !0)
    }, ve = function (a, b) {
        a.get(ib) && (b.add("utmcs", a.get(Qb), !0), b.add("utmsr", a.get(Lb)), a.get(Rb) && b.add("utmvp", a.get(Rb)), b.add("utmsc", a.get(Mb)), b.add("utmul", a.get(Pb)), b.add("utmje", a.get(Nb)), b.add("utmfl", a.get(Ob), !0))
    }, we = function (a, b) {
        a.get(lb) && a.get(Ib) && b.add("utmdt", a.get(Ib), !0);
        b.add("utmhid", a.get(Kb));
        b.add("utmr", Pa(a.get(Jb), a.get(P)), !0);
        b.add("utmp", G(a.get(Hb), !0), !0)
    }, xe = function (a, b) {
        for (var c = a.get(Db), d = a.get(Eb), e = a.get(Fb) || [], f = 0; f < e[w]; f++) {
            var Be = e[f];
            Be && (c || (c = new yd), c.f(8, f, Be[r]), c.f(9, f, Be[na]), 3 != Be[ua] && c.f(11, f, "" + Be[ua]))
        }
        F(a.get(wc)) || F(a.get(xc), !0) || (c || (c = new yd), c.f(5, 1, a.get(wc)), c.f(5, 2, a.get(xc)), e = a.get(yc), void 0 != e && c.f(5, 3, e), e = a.get(zc), void 0 != e && c.o(5, 1, e));
        c ? b.add("utme", c.Qa(d), !0) : d && b.add("utme", d.A(), !0)
    }, ye = function (a, b, c) {
        var d = new qe;
        re(a, c);
        se(a, d);
        d.add("utmt", "tran");
        d.add("utmtid", b.id_, !0);
        d.add("utmtst", b.affiliation_, !0);
        d.add("utmtto", b.total_, !0);
        d.add("utmttx", b.tax_, !0);
        d.add("utmtsp", b.shipping_, !0);
        d.add("utmtci", b.city_, !0);
        d.add("utmtrg", b.state_, !0);
        d.add("utmtco", b.country_, !0);
        xe(a, d);
        ve(a, d);
        we(a, d);
        (b = a.get(Gb)) && d.add("utmcu", b, !0);
        c || (ue(a, d), te(a, d));
        return d[v]()
    }, ze = function (a, b, c) {
        var d = new qe;
        re(a, c);
        se(a, d);
        d.add("utmt", "item");
        d.add("utmtid", b.transId_, !0);
        d.add("utmipc", b.sku_, !0);
        d.add("utmipn", b.name_, !0);
        d.add("utmiva", b.category_, !0);
        d.add("utmipr", b.price_, !0);
        d.add("utmiqt", b.quantity_, !0);
        xe(a, d);
        ve(a, d);
        we(a, d);
        (b = a.get(Gb)) && d.add("utmcu", b, !0);
        c || (ue(a, d), te(a, d));
        return d[v]()
    }, Ae = function (a, b) {
        var c = a.get(sc);
        if ("page" == c) c = new qe, re(a, b), se(a, c), xe(a, c), ve(a, c), we(a, c), b || (ue(a, c), te(a, c)), c = [c[v]()]; else if ("event" == c) c = new qe, re(a, b), se(a, c), c.add("utmt", "event"), xe(a, c), ve(a, c), we(a, c), b || (ue(a, c), te(a, c)), c = [c[v]()]; else if ("var" == c) c = new qe, re(a, b), se(a, c), c.add("utmt", "var"), !b && te(a, c), c = [c[v]()]; else if ("trans" == c) for (var c = [], d = a.get(Cb), e = 0; e < d[w]; ++e) {
            c[n](ye(a, d[e], b));
            for (var f = d[e].items_, Be = 0; Be < f[w]; ++Be) c[n](ze(a, f[Be], b))
        } else "social" == c ? b ? c = [] : (c = new qe, re(a, b), se(a, c), c.add("utmt", "social"), c.add("utmsn", a.get(Ac), !0), c.add("utmsa", a.get(Bc), !0), c.add("utmsid", a.get(Cc), !0), xe(a, c), ve(a, c), we(a, c), ue(a, c), te(a, c), c = [c[v]()]) : "feedback" == c ? b ? c = [] : (c = new qe, re(a, b), se(a, c), c.add("utmt", "feedback"), c.add("utmfbid", a.get(Gc), !0), c.add("utmfbpr", a.get(Hc), !0), xe(a, c), ve(a, c), we(a, c), ue(a, c), te(a, c), c = [c[v]()]) : c = [];
        return c
    }, oe = function (a) {
        var b, c = a.get(xb), d = a.get(uc), e = d && d.Ua, f = 0;
        if (0 == c || 2 == c) {
            var Be = a.get(wb) + "?";
            b = Ae(a, !0);
            for (var k = 0, s = b[w]; k < s; k++) Sa(b[k], e, Be, !0), f++
        }
        if (1 == c || 2 == c) for (b = Ae(a), k = 0, s = b[w]; k < s; k++) try {
            Sa(b[k], e), f++
        } catch (t) {
            t && Ra(t[r], void 0, t.message)
        }
        d && (d.q = f)
    };
    var Ce = function (a) {
        ha(this, "len");
        this.message = a + "-8192"
    }, De = function (a) {
        ha(this, "ff2post");
        this.message = a + "-2036"
    }, Sa = function (a, b, c, d) {
        b = b || Fa;
        if (d || 2036 >= a[w]) gf(a, b, c); else if (8192 >= a[w]) {
            if (0 <= W[za].userAgent[q]("Firefox") && ![].reduce) throw new De(a[w]);
            hf(a, b) || Ee(a, b)
        } else throw new Ce(a[w]);
    }, gf = function (a, b, c) {
        c = c || ("https:" == J[z][A] || M.G ? "https://ssl.google-analytics.com" : "http://www.google-analytics.com") + "/__utm.gif?";
        var d = new Image(1, 1);
        d.src = c + a;
        d.onload = function () {
            d.onload = null;
            d.onerror = null;
            b()
        };
        d.onerror = function () {
            d.onload = null;
            d.onerror = null;
            b()
        }
    }, hf = function (a, b) {
        var c,
            d = ("https:" == J[z][A] || M.G ? "https://ssl.google-analytics.com" : "http://www.google-analytics.com") + "/p/__utm.gif",
            e = W.XDomainRequest;
        if (e) c = new e, c.open("POST", d); else if (e = W.XMLHttpRequest) e = new e, "withCredentials" in e && (c = e, c.open("POST", d, !0), c.setRequestHeader("Content-Type", "text/plain"));
        if (c) return c.onreadystatechange = function () {
            4 == c.readyState && (b(), c = null)
        }, c.send(a), !0
    }, Ee = function (a, b) {
        if (J.body) {
            a = aa(a);
            try {
                var c = J[qa]('<iframe name="' + a + '"></iframe>')
            } catch (d) {
                c = J[qa]("iframe"), ha(c, a)
            }
            c.height = "0";
            c.width = "0";
            c.style.display = "none";
            c.style.visibility = "hidden";
            var e = J[z],
                e = ("https:" == J[z][A] || M.G ? "https://ssl.google-analytics.com" : "http://www.google-analytics.com") + "/u/post_iframe.html#" + aa(e[A] + "//" + e[u] + "/favicon.ico"),
                f = function () {
                    c.src = "";
                    c.parentNode && c.parentNode.removeChild(c)
                };
            Ga(W, "beforeunload", f);
            var Be = !1, k = 0, s = function () {
                if (!Be) {
                    try {
                        if (9 < k || c.contentWindow[z][u] == J[z][u]) {
                            Be = !0;
                            f();
                            Ha(W, "beforeunload", f);
                            b();
                            return
                        }
                    } catch (a) {
                    }
                    k++;
                    ca(s, 200)
                }
            };
            Ga(c, "load", s);
            J.body.appendChild(c);
            c.src = e
        } else We(function () {
            Ee(a, b)
        }, 100)
    };
    var $ = function () {
        this.G = this.w = !1;
        this.C = {};
        this.D = [];
        this.U = 0;
        this.S = [["www.google-analytics.com", "", "/plugins/"]];
        this._gasoCPath = this._gasoDomain = void 0;
        Re();
        Se()
    };
    E = $[x];
    E.oa = function (a, b) {
        return this.r(a, void 0, b)
    };
    E.r = function (a, b, c) {
        b && H(23);
        c && H(67);
        void 0 == b && (b = "~" + M.U++);
        a = new U(b, a, c);
        M.C[b] = a;
        M.D[n](a);
        return a
    };
    E.u = function (a) {
        a = a || "";
        return M.C[a] || M.r(void 0, a)
    };
    E.pa = function () {
        return M.D[ja](0)
    };
    E.ab = function () {
        return M.D[w]
    };
    E.aa = function () {
        this.w = !0
    };
    E.la = function () {
        this.G = !0
    };
    var Fe = function (a) {
        if ("prerender" == J.webkitVisibilityState) return !1;
        a();
        return !0
    };
    var M = new $;
    var jf = W._gat;
    jf && Ba(jf._getTracker) ? M = jf : W._gat = M;
    var Z = new Y;
    (function (a) {
        if (!Fe(a)) {
            H(123);
            var b = !1, c = function () {
                !b && Fe(a) && (b = !0, Ha(J, "webkitvisibilitychange", c))
            };
            Ga(J, "webkitvisibilitychange", c)
        }
    })(function () {
        var a = W._gaq, b = !1;
        if (a && Ba(a[n]) && (b = "[object Array]" == Object[x][v].call(Object(a)), !b)) {
            Z = a;
            return
        }
        W._gaq = Z;
        b && Z[n][ya](Z, a)
    });

    function Yc(a) {
        var b = 1, c = 0, d;
        if (a) for (b = 0, d = a[w] - 1; 0 <= d; d--) c = a.charCodeAt(d), b = (b << 6 & 268435455) + c + (c << 14), c = b & 266338304, b = 0 != c ? b ^ c >> 21 : b;
        return b
    };
})();