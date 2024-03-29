+function (e) {
    e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame;
    e.d = e.d instanceof Date ? e.d : new Date;
    var t = navigator.userAgent;
    var n = e.location.protocol;
    var r = {
        u: e.location.href,
        s: e.screen.width + "x" + e.screen.height,
        f: 0,
        l: 0,
        t: 0,
        o: 0,
        r: 0,
        a: 9,
        rd: -1,
        dns: -1,
        c: -1,
        rq: -1,
        rs: -1,
        i: -1,
        dcl: -1,
        dc: -1,
        dl: -1,
        or: 0,
        rr: -1,
        ar: -1,
        sp: 0,
        fp: -1,
        fcp: -1,
        rl: -1,
        e: e.elk || ""
    };
    var a = document.cookie.match(new RegExp("(^| )deviceType=([^;]*)(;|$)"));
    if (a) {
        r.a = +a[2]
    }
    if (e.localStorage && e.localStorage.getItem("deviceType")) r.a = +e.localStorage.getItem("deviceType");
    if (/ipad/gi.test(t)) {
        r.a = 3
    }
    if (!/ipad|iphone|ipod|android|windows phone/gi.test(t)) {
        r.a = 4
    }
    if (n == "https:") {
        r.a = +r.a + 10
    }
    var i = 20;
    var o = new Date;
    var d = 0;
    var s = 0;
    var c = new Date;

    function f() {
        if (e.requestAnimationFrame) {
            e.requestAnimationFrame(function () {
                d++;
                var t = new Date;
                if (t - c > 1e3) {
                    var n = s * 1e3 / (t - c);
                    if (/fps/i.test(e.location.href)) u(n);
                    if (n < r.l || r.l == 0) {
                        r.l = n >> 0;
                        r.t = document.body.scrollTop || document.documentElement.scrollTop || 0
                    }
                    c = t;
                    s = 0
                }
                s++;
                f()
            })
        }
    }

    function u(e) {
        var t = document.getElementById("FPS");
        if (!t) {
            t = document.createElement("div");
            t.style.cssText = "position:fixed;right:0px;top:0px;font-size:12px;color:#fff;background-color:#666;";
            t.id = "FPS";
            document.body.appendChild(t)
        }
        t.innerHTML = e
    }

    function l(e, t, n) {
        if (e.addEventListener) {
            e.addEventListener(t, n, false)
        } else {
            e.attachEvent("on" + t, n)
        }
    }

    function p() {
        var e = /msie\s+([\w\.]+)/i.exec(navigator.userAgent);
        if (e && parseInt(e[1]) <= 9) {
            return true
        }
        return false
    }

    function m(e) {
        var t = document.getElementsByTagName("head")[0];
        var n = document.createElement("script");
        var r = false;
        n.async = "async";
        t.insertBefore(n, t.firstChild);
        n.onload = n.onreadystatechange = function () {
            if (!r && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                t.removeChild(n);
                r = true
            }
        };
        n.src = e
    }

    l(e, "load", function () {
        r.o = new Date - e.d
    });
    var v = {
        p: e.performance || e.webkitPerformance || e.msPerformance || e.mozPerformance, isSupport: function () {
            return !!this.p
        }, format: function (t) {
            t.sp = this.isSupport() ? 1 : 0;
            t.or = t.r;
            if (t.sp) {
                var n = this.p.timing;
                t.dns = n.domainLookupEnd - n.domainLookupStart;
                t.c = n.connectEnd - n.connectStart;
                t.rq = n.responseStart - n.requestStart;
                t.rs = n.responseEnd - n.responseStart;
                t.i = n.domInteractive - n.domLoading;
                t.dcl = n.domContentLoadedEventStart - n.domLoading;
                t.dc = n.domComplete - n.domLoading;
                t.dl = n.domContentLoadedEventEnd - n.navigationStart;
                if (n.redirectStart > 0) {
                    t.rd = n.redirectEnd - n.redirectStart
                }
                if (t.or > 0) {
                    var r = typeof e.d == "number" ? e.d : e.d.getTime();
                    t.rr = t.or + r - n.domLoading;
                    t.ar = t.or + r - n.navigationStart
                }
                if (this.p.getEntriesByType) {
                    var a = this.p.getEntriesByType("paint");
                    var i = this.p.getEntriesByType("resource");
                    a && a.forEach(function (e) {
                        if (e.name == "first-paint") {
                            t.fp = e.startTime || -1
                        } else if (e.name == "first-contentful-paint") {
                            t.fcp = e.startTime || -1
                        }
                    });
                    t.rl = i && i.length || -1
                }
            }
            t.r = t.rr > -1 ? t.rr : 0;
            g.setWebPerfLog(t.r, t.fp, t.rl);
            return t
        }
    };
    var g = {
        inited: false, setWebPerfLog: function (t, n, r) {
            this.call("setWebPerfLog", {url: e.location.href, time: t, firstPaint: n, resourceLength: r}, function () {
            })
        }, call: function (e, t, n) {
            this.ready(function (r) {
                r.callHandler(e, t, n)
            })
        }, ready: function (t) {
            var n = this;
            if (e.G && e.G.isApp) {
                e.G.webviewBridgeReady(t)
            }
        }
    };
    var h = false;
    var y = function (e) {
        if (h) return;
        h = true;
        r = v.format(r);
        r.f = d * 1e3 / (new Date - o) >> 0;
        var t = new XMLHttpRequest;
        var a = [];
        for (var i in r) {
            a.push(i + "=" + encodeURIComponent(r[i]))
        }
        a = a.join("&");
        if (p()) {
            return m(n + "//api.tuniu.com/stat/save?" + a)
        }
        t.open("get", n + "//api.tuniu.com/stat/save?" + a, e || false);
        t.send(null)
    };
    l(e, "beforeunload", y);
    l(e, "unload", y);
    setTimeout(function () {
        y(true)
    }, 1e4);
    e.PERFORMANCE = r;
    f()
}(window);