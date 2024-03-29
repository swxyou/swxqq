var requirejs, require, define;
(function (ba) {
    function G(b) {
        return "[object Function]" === K.call(b)
    }

    function H(b) {
        return "[object Array]" === K.call(b)
    }

    function v(b, c) {
        if (b) {
            var d;
            for (d = 0; d < b.length && (!b[d] || !c(b[d], d, b)); d += 1) ;
        }
    }

    function T(b, c) {
        if (b) {
            var d;
            for (d = b.length - 1; -1 < d && (!b[d] || !c(b[d], d, b)); d -= 1) ;
        }
    }

    function t(b, c) {
        return fa.call(b, c)
    }

    function m(b, c) {
        return t(b, c) && b[c]
    }

    function B(b, c) {
        for (var d in b) if (t(b, d) && c(b[d], d)) break
    }

    function U(b, c, d, e) {
        c && B(c, function (c, g) {
            if (d || !t(b, g)) e && "object" === typeof c && c && !H(c) && !G(c) && !(c instanceof
                RegExp) ? (b[g] || (b[g] = {}), U(b[g], c, d, e)) : b[g] = c
        });
        return b
    }

    function u(b, c) {
        return function () {
            return c.apply(b, arguments)
        }
    }

    function ca(b) {
        throw b;
    }

    function da(b) {
        if (!b) return b;
        var c = ba;
        v(b.split("."), function (b) {
            c = c[b]
        });
        return c
    }

    function C(b, c, d, e) {
        c = Error(c + "\nhttp://requirejs.org/docs/errors.html#" + b);
        c.requireType = b;
        c.requireModules = e;
        d && (c.originalError = d);
        return c
    }

    function ga(b) {
        function c(a, k, b) {
            var f, l, c, d, e, g, i, p, k = k && k.split("/"), h = j.map, n = h && h["*"];
            if (a) {
                a = a.split("/");
                l = a.length - 1;
                j.nodeIdCompat && Q.test(a[l]) && (a[l] = a[l].replace(Q, ""));
                "." === a[0].charAt(0) && k && (l = k.slice(0, k.length - 1), a = l.concat(a));
                l = a;
                for (c = 0; c < l.length; c++) if (d = l[c], "." === d) l.splice(c, 1), c -= 1; else if (".." === d && !(0 === c || 1 == c && ".." === l[2] || ".." === l[c - 1]) && 0 < c) l.splice(c - 1, 2), c -= 2;
                a = a.join("/")
            }
            if (b && h && (k || n)) {
                l = a.split("/");
                c = l.length;
                a:for (; 0 < c; c -= 1) {
                    e = l.slice(0, c).join("/");
                    if (k) for (d = k.length; 0 < d; d -= 1) if (b = m(h, k.slice(0, d).join("/"))) if (b = m(b, e)) {
                        f = b;
                        g = c;
                        break a
                    }
                    !i && (n && m(n, e)) && (i = m(n, e), p = c)
                }
                !f && i && (f = i, g = p);
                f && (l.splice(0, g, f), a = l.join("/"))
            }
            return (f = m(j.pkgs, a)) ? f : a
        }

        function d(a) {
            z && v(document.getElementsByTagName("script"), function (k) {
                if (k.getAttribute("data-requiremodule") === a && k.getAttribute("data-requirecontext") === i.contextName) return k.parentNode.removeChild(k), !0
            })
        }

        function e(a) {
            var k = m(j.paths, a);
            if (k && H(k) && 1 < k.length) return k.shift(), i.require.undef(a), i.makeRequire(null, {skipMap: !0})([a]), !0
        }

        function n(a) {
            var k, c = a ? a.indexOf("!") : -1;
            -1 < c && (k = a.substring(0, c), a = a.substring(c + 1, a.length));
            return [k, a]
        }

        function p(a, k, b, f) {
            var l, d, e = null, g = k ? k.name : null, j = a, p = !0, h = "";
            a || (p = !1, a = "_@r" + (K += 1));
            a = n(a);
            e = a[0];
            a = a[1];
            e && (e = c(e, g, f), d = m(r, e));
            a && (e ? h = d && d.normalize ? d.normalize(a, function (a) {
                return c(a, g, f)
            }) : -1 === a.indexOf("!") ? c(a, g, f) : a : (h = c(a, g, f), a = n(h), e = a[0], h = a[1], b = !0, l = i.nameToUrl(h)));
            b = e && !d && !b ? "_unnormalized" + (O += 1) : "";
            return {
                prefix: e,
                name: h,
                parentMap: k,
                unnormalized: !!b,
                url: l,
                originalName: j,
                isDefine: p,
                id: (e ? e + "!" + h : h) + b
            }
        }

        function s(a) {
            var k = a.id, b = m(h, k);
            b || (b = h[k] = new i.Module(a));
            return b
        }

        function q(a, k, b) {
            var f = a.id, c = m(h, f);
            if (t(r, f) && (!c || c.defineEmitComplete)) "defined" === k && b(r[f]); else if (c = s(a), c.error && "error" === k) b(c.error); else c.on(k, b)
        }

        function w(a, b) {
            var c = a.requireModules, f = !1;
            if (b) b(a); else if (v(c, function (b) {
                if (b = m(h, b)) b.error = a, b.events.error && (f = !0, b.emit("error", a))
            }), !f) g.onError(a)
        }

        function x() {
            R.length && (ha.apply(A, [A.length, 0].concat(R)), R = [])
        }

        function y(a) {
            delete h[a];
            delete V[a]
        }

        function F(a, b, c) {
            var f = a.map.id;
            a.error ? a.emit("error", a.error) : (b[f] = !0, v(a.depMaps, function (f, d) {
                var e = f.id, g = m(h, e);
                g && (!a.depMatched[d] && !c[e]) && (m(b, e) ? (a.defineDep(d, r[e]), a.check()) : F(g, b, c))
            }), c[f] = !0)
        }

        function D() {
            var a, b, c = (a = 1E3 * j.waitSeconds) && i.startTime + a < (new Date).getTime(), f = [], l = [], g = !1,
                h = !0;
            if (!W) {
                W = !0;
                B(V, function (a) {
                    var i = a.map, j = i.id;
                    if (a.enabled && (i.isDefine || l.push(a), !a.error)) if (!a.inited && c) e(j) ? g = b = !0 : (f.push(j), d(j)); else if (!a.inited && (a.fetched && i.isDefine) && (g = !0, !i.prefix)) return h = !1
                });
                if (c && f.length) return a = C("timeout", "Load timeout for modules: " + f, null, f), a.contextName = i.contextName, w(a);
                h && v(l, function (a) {
                    F(a, {}, {})
                });
                if ((!c || b) && g) if ((z || ea) && !X) X = setTimeout(function () {
                    X = 0;
                    D()
                }, 50);
                W = !1
            }
        }

        function E(a) {
            t(r, a[0]) || s(p(a[0], null, !0)).init(a[1], a[2])
        }

        function I(a) {
            var a = a.currentTarget || a.srcElement, b = i.onScriptLoad;
            a.detachEvent && !Y ? a.detachEvent("onreadystatechange", b) : a.removeEventListener("load", b, !1);
            b = i.onScriptError;
            (!a.detachEvent || Y) && a.removeEventListener("error", b, !1);
            return {node: a, id: a && a.getAttribute("data-requiremodule")}
        }

        function J() {
            var a;
            for (x(); A.length;) {
                a = A.shift();
                if (null === a[0]) return w(C("mismatch", "Mismatched anonymous define() module: " + a[a.length - 1]));
                E(a)
            }
        }

        var W, Z, i, L, X, j = {waitSeconds: 7, baseUrl: "./", paths: {}, bundles: {}, pkgs: {}, shim: {}, config: {}},
            h = {}, V = {}, $ = {}, A = [], r = {}, S = {}, aa = {}, K = 1, O = 1;
        L = {
            require: function (a) {
                return a.require ? a.require : a.require = i.makeRequire(a.map)
            }, exports: function (a) {
                a.usingExports = !0;
                if (a.map.isDefine) return a.exports ? r[a.map.id] = a.exports : a.exports = r[a.map.id] = {}
            }, module: function (a) {
                return a.module ? a.module : a.module = {
                    id: a.map.id, uri: a.map.url, config: function () {
                        return m(j.config, a.map.id) || {}
                    }, exports: a.exports || (a.exports = {})
                }
            }
        };
        Z = function (a) {
            this.events = m($, a.id) || {};
            this.map = a;
            this.shim = m(j.shim, a.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0
        };
        Z.prototype = {
            init: function (a, b, c, f) {
                f = f || {};
                if (!this.inited) {
                    this.factory = b;
                    if (c) this.on("error", c); else this.events.error && (c = u(this, function (a) {
                        this.emit("error", a)
                    }));
                    this.depMaps = a && a.slice(0);
                    this.errback = c;
                    this.inited = !0;
                    this.ignore = f.ignore;
                    f.enabled || this.enabled ? this.enable() : this.check()
                }
            }, defineDep: function (a, b) {
                this.depMatched[a] || (this.depMatched[a] = !0, this.depCount -= 1, this.depExports[a] = b)
            }, fetch: function () {
                if (!this.fetched) {
                    this.fetched = !0;
                    i.startTime = (new Date).getTime();
                    var a = this.map;
                    if (this.shim) i.makeRequire(this.map, {enableBuildCallback: !0})(this.shim.deps || [], u(this, function () {
                        return a.prefix ? this.callPlugin() : this.load()
                    })); else return a.prefix ? this.callPlugin() : this.load()
                }
            }, load: function () {
                var a = this.map.url;
                S[a] || (S[a] = !0, i.load(this.map.id, a))
            }, check: function () {
                if (this.enabled && !this.enabling) {
                    var a, b, c = this.map.id;
                    b = this.depExports;
                    var f = this.exports, l = this.factory;
                    if (this.inited) if (this.error) this.emit("error", this.error); else {
                        if (!this.defining) {
                            this.defining = !0;
                            if (1 > this.depCount && !this.defined) {
                                if (G(l)) {
                                    if (this.events.error && this.map.isDefine || g.onError !== ca) try {
                                        f = i.execCb(c, l, b, f)
                                    } catch (d) {
                                        a = d
                                    } else f = i.execCb(c, l, b, f);
                                    this.map.isDefine && void 0 === f && ((b = this.module) ? f = b.exports : this.usingExports && (f = this.exports));
                                    if (a) return a.requireMap = this.map, a.requireModules = this.map.isDefine ? [this.map.id] : null, a.requireType = this.map.isDefine ? "define" : "require", w(this.error = a)
                                } else f = l;
                                this.exports = f;
                                if (this.map.isDefine && !this.ignore && (r[c] = f, g.onResourceLoad)) g.onResourceLoad(i, this.map, this.depMaps);
                                y(c);
                                this.defined = !0
                            }
                            this.defining = !1;
                            this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else this.fetch()
                }
            }, callPlugin: function () {
                var a = this.map, b = a.id, d = p(a.prefix);
                this.depMaps.push(d);
                q(d, "defined", u(this, function (f) {
                    var l, d;
                    d = m(aa, this.map.id);
                    var e = this.map.name, P = this.map.parentMap ? this.map.parentMap.name : null,
                        n = i.makeRequire(a.parentMap, {enableBuildCallback: !0});
                    if (this.map.unnormalized) {
                        if (f.normalize && (e = f.normalize(e, function (a) {
                            return c(a, P, !0)
                        }) || ""), f = p(a.prefix + "!" + e, this.map.parentMap), q(f, "defined", u(this, function (a) {
                            this.init([], function () {
                                return a
                            }, null, {enabled: !0, ignore: !0})
                        })), d = m(h, f.id)) {
                            this.depMaps.push(f);
                            if (this.events.error) d.on("error", u(this, function (a) {
                                this.emit("error", a)
                            }));
                            d.enable()
                        }
                    } else d ? (this.map.url = i.nameToUrl(d), this.load()) : (l = u(this, function (a) {
                        this.init([], function () {
                            return a
                        }, null, {enabled: !0})
                    }), l.error = u(this, function (a) {
                        this.inited = !0;
                        this.error = a;
                        a.requireModules = [b];
                        B(h, function (a) {
                            0 === a.map.id.indexOf(b + "_unnormalized") && y(a.map.id)
                        });
                        w(a)
                    }), l.fromText = u(this, function (f, c) {
                        var d = a.name, e = p(d), P = M;
                        c && (f = c);
                        P && (M = !1);
                        s(e);
                        t(j.config, b) && (j.config[d] = j.config[b]);
                        try {
                            g.exec(f)
                        } catch (h) {
                            return w(C("fromtexteval", "fromText eval for " + b + " failed: " + h, h, [b]))
                        }
                        P && (M = !0);
                        this.depMaps.push(e);
                        i.completeLoad(d);
                        n([d], l)
                    }), f.load(a.name, n, l, j))
                }));
                i.enable(d, this);
                this.pluginMaps[d.id] = d
            }, enable: function () {
                V[this.map.id] = this;
                this.enabling = this.enabled = !0;
                v(this.depMaps, u(this, function (a, b) {
                    var c, f;
                    if ("string" === typeof a) {
                        a = p(a, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap);
                        this.depMaps[b] = a;
                        if (c = m(L, a.id)) {
                            this.depExports[b] = c(this);
                            return
                        }
                        this.depCount += 1;
                        q(a, "defined", u(this, function (a) {
                            this.defineDep(b, a);
                            this.check()
                        }));
                        this.errback && q(a, "error", u(this, this.errback))
                    }
                    c = a.id;
                    f = h[c];
                    !t(L, c) && (f && !f.enabled) && i.enable(a, this)
                }));
                B(this.pluginMaps, u(this, function (a) {
                    var b = m(h, a.id);
                    b && !b.enabled && i.enable(a, this)
                }));
                this.enabling = !1;
                this.check()
            }, on: function (a, b) {
                var c = this.events[a];
                c || (c = this.events[a] = []);
                c.push(b)
            }, emit: function (a, b) {
                v(this.events[a], function (a) {
                    a(b)
                });
                "error" === a && delete this.events[a]
            }
        };
        i = {
            config: j,
            contextName: b,
            registry: h,
            defined: r,
            urlFetched: S,
            defQueue: A,
            Module: Z,
            makeModuleMap: p,
            nextTick: g.nextTick,
            onError: w,
            configure: function (a) {
                a.baseUrl && "/" !== a.baseUrl.charAt(a.baseUrl.length - 1) && (a.baseUrl += "/");
                var b = j.shim, c = {paths: !0, bundles: !0, config: !0, map: !0};
                B(a, function (a, b) {
                    c[b] ? (j[b] || (j[b] = {}), U(j[b], a, !0, !0)) : j[b] = a
                });
                a.bundles && B(a.bundles, function (a, b) {
                    v(a, function (a) {
                        a !== b && (aa[a] = b)
                    })
                });
                a.shim && (B(a.shim, function (a, c) {
                    H(a) && (a = {deps: a});
                    if ((a.exports || a.init) && !a.exportsFn) a.exportsFn = i.makeShimExports(a);
                    b[c] = a
                }), j.shim = b);
                a.packages && v(a.packages, function (a) {
                    var b, a = "string" === typeof a ? {name: a} : a;
                    b = a.name;
                    a.location && (j.paths[b] = a.location);
                    j.pkgs[b] = a.name + "/" + (a.main || "main").replace(ia, "").replace(Q, "")
                });
                B(h, function (a, b) {
                    !a.inited && !a.map.unnormalized && (a.map = p(b))
                });
                if (a.deps || a.callback) i.require(a.deps || [], a.callback)
            },
            makeShimExports: function (a) {
                return function () {
                    var b;
                    a.init && (b = a.init.apply(ba, arguments));
                    return b || a.exports && da(a.exports)
                }
            },
            makeRequire: function (a, e) {
                function j(c, d, m) {
                    var n, q;
                    e.enableBuildCallback && (d && G(d)) && (d.__requireJsBuild = !0);
                    if ("string" === typeof c) {
                        if (G(d)) return w(C("requireargs", "Invalid require call"), m);
                        if (a && t(L, c)) return L[c](h[a.id]);
                        if (g.get) return g.get(i, c, a, j);
                        n = p(c, a, !1, !0);
                        n = n.id;
                        return !t(r, n) ? w(C("notloaded", 'Module name "' + n + '" has not been loaded yet for context: ' + b + (a ? "" : ". Use require([])"))) : r[n]
                    }
                    J();
                    i.nextTick(function () {
                        J();
                        q = s(p(null, a));
                        q.skipMap = e.skipMap;
                        q.init(c, d, m, {enabled: !0});
                        D()
                    });
                    return j
                }

                e = e || {};
                U(j, {
                    isBrowser: z, toUrl: function (b) {
                        var d, e = b.lastIndexOf("."), k = b.split("/")[0];
                        if (-1 !== e && (!("." === k || ".." === k) || 1 < e)) d = b.substring(e, b.length), b = b.substring(0, e);
                        return i.nameToUrl(c(b, a && a.id, !0), d, !0)
                    }, defined: function (b) {
                        return t(r, p(b, a, !1, !0).id)
                    }, specified: function (b) {
                        b = p(b, a, !1, !0).id;
                        return t(r, b) || t(h, b)
                    }
                });
                a || (j.undef = function (b) {
                    x();
                    var c = p(b, a, !0), e = m(h, b);
                    d(b);
                    delete r[b];
                    delete S[c.url];
                    delete $[b];
                    T(A, function (a, c) {
                        a[0] === b && A.splice(c, 1)
                    });
                    e && (e.events.defined && ($[b] = e.events), y(b))
                });
                return j
            },
            enable: function (a) {
                m(h, a.id) && s(a).enable()
            },
            completeLoad: function (a) {
                var b, c, d = m(j.shim, a) || {}, g = d.exports;
                for (x(); A.length;) {
                    c = A.shift();
                    if (null === c[0]) {
                        c[0] = a;
                        if (b) break;
                        b = !0
                    } else c[0] === a && (b = !0);
                    E(c)
                }
                c = m(h, a);
                if (!b && !t(r, a) && c && !c.inited) {
                    if (j.enforceDefine && (!g || !da(g))) return e(a) ? void 0 : w(C("nodefine", "No define call for " + a, null, [a]));
                    E([a, d.deps || [], d.exportsFn])
                }
                D()
            },
            nameToUrl: function (a, b, c) {
                var d, e, h;
                (d = m(j.pkgs, a)) && (a = d);
                if (d = m(aa, a)) return i.nameToUrl(d, b, c);
                if (g.jsExtRegExp.test(a)) d = a + (b || ""); else {
                    d = j.paths;
                    a = a.split("/");
                    for (e = a.length; 0 < e; e -= 1) if (h = a.slice(0, e).join("/"), h = m(d, h)) {
                        H(h) && (h = h[0]);
                        a.splice(0, e, h);
                        break
                    }
                    d = a.join("/");
                    d += b || (/^data\:|\?/.test(d) || c ? "" : ".js");
                    d = ("/" === d.charAt(0) || d.match(/^[\w\+\.\-]+:/) ? "" : j.baseUrl) + d
                }
                return j.urlArgs ? d + ((-1 === d.indexOf("?") ? "?" : "&") + j.urlArgs) : d
            },
            load: function (a, b) {
                g.load(i, a, b)
            },
            execCb: function (a, b, c, d) {
                return b.apply(d, c)
            },
            onScriptLoad: function (a) {
                if ("load" === a.type || ja.test((a.currentTarget || a.srcElement).readyState)) N = null, a = I(a), i.completeLoad(a.id)
            },
            onScriptError: function (a) {
                var b = I(a);
                if (!e(b.id)) return w(C("scripterror", "Script error for: " + b.id, a, [b.id]))
            }
        };
        i.require = i.makeRequire();
        return i
    }

    var g, x, y, D, I, E, N, J, s, O, ka = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        la = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, Q = /\.js$/, ia = /^\.\//;
    x = Object.prototype;
    var K = x.toString, fa = x.hasOwnProperty, ha = Array.prototype.splice,
        z = !!("undefined" !== typeof window && "undefined" !== typeof navigator && window.document),
        ea = !z && "undefined" !== typeof importScripts,
        ja = z && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        Y = "undefined" !== typeof opera && "[object Opera]" === opera.toString(), F = {}, q = {}, R = [], M = !1;
    if ("undefined" === typeof define) {
        if ("undefined" !== typeof requirejs) {
            if (G(requirejs)) return;
            q = requirejs;
            requirejs = void 0
        }
        "undefined" !== typeof require && !G(require) && (q = require, require = void 0);
        g = requirejs = function (b, c, d, e) {
            var n, p = "_";
            !H(b) && "string" !== typeof b && (n = b, H(c) ? (b = c, c = d, d = e) : b = []);
            n && n.context && (p = n.context);
            (e = m(F, p)) || (e = F[p] = g.s.newContext(p));
            n && e.configure(n);
            return e.require(b, c, d)
        };
        g.config = function (b) {
            return g(b)
        };
        g.nextTick = "undefined" !== typeof setTimeout ? function (b) {
            setTimeout(b, 4)
        } : function (b) {
            b()
        };
        require || (require = g);
        g.version = "2.1.15";
        g.jsExtRegExp = /^\/|:|\?|\.js$/;
        g.isBrowser = z;
        x = g.s = {contexts: F, newContext: ga};
        g({});
        v(["toUrl", "undef", "defined", "specified"], function (b) {
            g[b] = function () {
                var c = F._;
                return c.require[b].apply(c, arguments)
            }
        });
        if (z && (y = x.head = document.getElementsByTagName("head")[0], D = document.getElementsByTagName("base")[0])) y = x.head = D.parentNode;
        g.onError = ca;
        g.createNode = function (b) {
            var c = b.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            c.type = b.scriptType || "text/javascript";
            c.charset = "utf-8";
            c.async = !0;
            return c
        };
        g.load = function (b, c, d) {
            var e = b && b.config || {};
            if (z) return e = g.createNode(e, c, d), e.setAttribute("data-requirecontext", b.contextName), e.setAttribute("data-requiremodule", c), e.attachEvent && !(e.attachEvent.toString && 0 > e.attachEvent.toString().indexOf("[native code")) && !Y ? (M = !0, e.attachEvent("onreadystatechange", b.onScriptLoad)) : (e.addEventListener("load", b.onScriptLoad, !1), e.addEventListener("error", b.onScriptError, !1)), e.src = d, J = e, D ? y.insertBefore(e, D) : y.appendChild(e), J = null, e;
            if (ea) try {
                importScripts(d), b.completeLoad(c)
            } catch (m) {
                b.onError(C("importscripts", "importScripts failed for " + c + " at " + d, m, [c]))
            }
        };
        z && !q.skipDataMain && T(document.getElementsByTagName("script"), function (b) {
            y || (y = b.parentNode);
            if (I = b.getAttribute("data-main")) return s = I, q.baseUrl || (E = s.split("/"), s = E.pop(), O = E.length ? E.join("/") + "/" : "./", q.baseUrl = O), s = s.replace(Q, ""), g.jsExtRegExp.test(s) && (s = I), q.deps = q.deps ? q.deps.concat(s) : [s], !0
        });
        define = function (b, c, d) {
            var e, g;
            "string" !== typeof b && (d = c, c = b, b = null);
            H(c) || (d = c, c = null);
            !c && G(d) && (c = [], d.length && (d.toString().replace(ka, "").replace(la, function (b, d) {
                c.push(d)
            }), c = (1 === d.length ? ["require"] : ["require", "exports", "module"]).concat(c)));
            if (M) {
                if (!(e = J)) N && "interactive" === N.readyState || T(document.getElementsByTagName("script"), function (b) {
                    if ("interactive" === b.readyState) return N = b
                }), e = N;
                e && (b || (b = e.getAttribute("data-requiremodule")), g = F[e.getAttribute("data-requirecontext")])
            }
            (g ? g.defQueue : R).push([b, c, d])
        };
        define.amd = {jQuery: !0, underscore: !0};
        g.exec = function (b) {
            return eval(b)
        };
        g(q)
    }
})(this);
;require.config({
    baseUrl: (window.cdnConfig && window.cdnConfig.url || "") + "/site/static/js/",
    paths: {
        "base64": "plugins/base64/base64",
        "jquery": "lib/jquery/1.7.2/jquery",
        "jquery.autocomplete": "components/tourHeader/jquery.autocomplete",
        "underscore": "lib/underscore/1.6.0/underscore",
        'store': 'lib/store/2.0.0/store.legacy.min',
        'template/dotList': 'modules/search/dot/dotTempl',
        'ui_lib/layer': 'lib/ui_lib/layer.min',
        'storage': 'components/rightBar/storage'
    }
});
;
/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function (a, b) {
    function cy(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }

    function cu(a) {
        if (!cj[a]) {
            var b = c.body, d = f("<" + a + ">").appendTo(b), e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                ck || (ck = c.createElement("iframe"), ck.frameBorder = ck.width = ck.height = 0), b.appendChild(ck);
                if (!cl || !ck.createElement) cl = (ck.contentWindow || ck.contentDocument).document, cl.write((f.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), cl.close();
                d = cl.createElement(a), cl.body.appendChild(d), e = f.css(d, "display"), b.removeChild(ck)
            }
            cj[a] = e
        }
        return cj[a]
    }

    function ct(a, b) {
        var c = {};
        f.each(cp.concat.apply([], cp.slice(0, b)), function () {
            c[this] = a
        });
        return c
    }

    function cs() {
        cq = b
    }

    function cr() {
        setTimeout(cs, 0);
        return cq = f.now()
    }

    function ci() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
        }
    }

    function ch() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    }

    function cb(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1)
                for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*") k = l; else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break
                            }
                        }
                    }
                }
                !n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }

    function ca(a, c, d) {
        var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h)
            for (i in e)
                if (e[i] && e[i].test(h)) {
                    f.unshift(i);
                    break
                }
        if (f[0] in d) j = f[0]; else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        if (j) {
            j !== f[0] && f.unshift(j);
            return d[j]
        }
    }

    function b_(a, b, c, d) {
        if (f.isArray(b)) f.each(b, function (b, e) {
            c || bD.test(a) ? d(a, e) : b_(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
        }); else if (!c && f.type(b) === "object")
            for (var e in b) b_(a + "[" + e + "]", b[e], c, d); else d(a, b)
    }

    function b$(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e)
    }

    function bZ(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f], i = 0, j = h ? h.length : 0, k = a === bS, l;
        for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = bZ(a, c, d, e, l, g)));
        (k || !l) && !g["*"] && (l = bZ(a, c, d, e, "*", g));
        return l
    }

    function bY(a) {
        return function (b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(bO), e = 0, g = d.length, h, i, j;
                for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
            }
        }
    }

    function bB(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = b === "width" ? 1 : 0, g = 4;
        if (d > 0) {
            if (c !== "border")
                for (; e < g; e += 2) c || (d -= parseFloat(f.css(a, "padding" + bx[e])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + bx[e])) || 0 : d -= parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0;
            return d + "px"
        }
        d = by(a, b);
        if (d < 0 || d == null) d = a.style[b];
        if (bt.test(d)) return d;
        d = parseFloat(d) || 0;
        if (c)
            for (; e < g; e += 2) d += parseFloat(f.css(a, "padding" + bx[e])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + bx[e])) || 0);
        return d + "px"
    }

    function bo(a) {
        var b = c.createElement("div");
        bh.appendChild(b), b.innerHTML = a.outerHTML;
        return b.firstChild
    }

    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
    }

    function bm(a) {
        if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
    }

    function bl(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }

    function bk(a, b) {
        var c;
        b.nodeType === 1 && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? b.outerHTML = a.outerHTML : c !== "input" || a.type !== "checkbox" && a.type !== "radio" ? c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)), b.removeAttribute(f.expando), b.removeAttribute("_submit_attached"), b.removeAttribute("_change_attached"))
    }

    function bj(a, b) {
        if (b.nodeType === 1 && !!f.hasData(a)) {
            var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
            if (i) {
                delete h.handle, h.events = {};
                for (c in i)
                    for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c, i[c][d])
            }
            h.data && (h.data = f.extend({}, h.data))
        }
    }

    function bi(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function U(a) {
        var b = V.split("|"), c = a.createDocumentFragment();
        if (c.createElement)
            while (b.length) c.createElement(b.pop());
        return c
    }

    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b)) return f.grep(a, function (a, d) {
            var e = !!b.call(a, d, a);
            return e === c
        });
        if (b.nodeType) return f.grep(a, function (a, d) {
            return a === b === c
        });
        if (typeof b == "string") {
            var d = f.grep(a, function (a) {
                return a.nodeType === 1
            });
            if (O.test(b)) return f.filter(b, d, !c);
            b = f.filter(b, d)
        }
        return f.grep(a, function (a, d) {
            return f.inArray(a, b) >= 0 === c
        })
    }

    function S(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function K() {
        return !0
    }

    function J() {
        return !1
    }

    function n(a, b, c) {
        var d = b + "defer", e = b + "queue", g = b + "mark", h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
        }, 0)
    }

    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b])) continue;
            if (b !== "toJSON") return !1
        }
        return !0
    }

    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? +d : j.test(d) ? f.parseJSON(d) : d
                } catch (g) {
                }
                f.data(a, c, d)
            } else d = b
        }
        return d
    }

    function h(a) {
        var b = g[a] = {}, c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
        return b
    }

    var c = a.document, d = a.navigator, e = a.location, f = function () {
        function J() {
            if (!e.isReady) {
                try {
                    c.documentElement.doScroll("left")
                } catch (a) {
                    setTimeout(J, 1);
                    return
                }
                e.ready()
            }
        }

        var e = function (a, b) {
                return new e.fn.init(a, b, h)
            }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/,
            m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g,
            r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/,
            u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function (a, b) {
                return (b + "").toUpperCase()
            }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty,
            E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf,
            I = {};
        e.fn = e.prototype = {
            constructor: e, init: function (a, d, f) {
                var g, h, j, k;
                if (!a) return this;
                if (a.nodeType) {
                    this.context = this[0] = a, this.length = 1;
                    return this
                }
                if (a === "body" && !d && c.body) {
                    this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
                    return this
                }
                if (typeof a == "string") {
                    a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
                    if (g && (g[1] || !d)) {
                        if (g[1]) {
                            d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                            return e.merge(this, a)
                        }
                        h = c.getElementById(g[2]);
                        if (h && h.parentNode) {
                            if (h.id !== g[2]) return f.find(a);
                            this.length = 1, this[0] = h
                        }
                        this.context = c, this.selector = a;
                        return this
                    }
                    return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
                }
                if (e.isFunction(a)) return f.ready(a);
                a.selector !== b && (this.selector = a.selector, this.context = a.context);
                return e.makeArray(a, this)
            }, selector: "", jquery: "1.7.2", length: 0, size: function () {
                return this.length
            }, toArray: function () {
                return F.call(this, 0)
            }, get: function (a) {
                return a == null ? this.toArray() : a < 0 ? this[this.length +
                a] : this[a]
            }, pushStack: function (a, b, c) {
                var d = this.constructor();
                e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
                return d
            }, each: function (a, b) {
                return e.each(this, a, b)
            }, ready: function (a) {
                e.bindReady(), A.add(a);
                return this
            }, eq: function (a) {
                a = +a;
                return a === -1 ? this.slice(a) : this.slice(a, a + 1)
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, slice: function () {
                return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
            }, map: function (a) {
                return this.pushStack(e.map(this, function (b, c) {
                    return a.call(b, c, b)
                }))
            }, end: function () {
                return this.prevObject || this.constructor(null)
            }, push: E, sort: [].sort, splice: [].splice
        }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
            var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
            typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
            for (; j < k; j++)
                if ((a = arguments[j]) != null)
                    for (c in a) {
                        d = i[c], f = a[c];
                        if (i === f) continue;
                        l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
                    }
            return i
        }, e.extend({
            noConflict: function (b) {
                a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
                return e
            }, isReady: !1, readyWait: 1, holdReady: function (a) {
                a ? e.readyWait++ : e.ready(!0)
            }, ready: function (a) {
                if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                    if (!c.body) return setTimeout(e.ready, 1);
                    e.isReady = !0;
                    if (a !== !0 && --e.readyWait > 0) return;
                    A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
                }
            }, bindReady: function () {
                if (!A) {
                    A = e.Callbacks("once memory");
                    if (c.readyState === "complete") return setTimeout(e.ready, 1);
                    if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1); else if (c.attachEvent) {
                        c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                        var b = !1;
                        try {
                            b = a.frameElement == null
                        } catch (d) {
                        }
                        c.documentElement.doScroll && b && J()
                    }
                }
            }, isFunction: function (a) {
                return e.type(a) === "function"
            }, isArray: Array.isArray || function (a) {
                return e.type(a) === "array"
            }, isWindow: function (a) {
                return a != null && a == a.window
            }, isNumeric: function (a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            }, type: function (a) {
                return a == null ? String(a) : I[C.call(a)] || "object"
            }, isPlainObject: function (a) {
                if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
                try {
                    if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1
                } catch (c) {
                    return !1
                }
                var d;
                for (d in a) ;
                return d === b || D.call(a, d)
            }, isEmptyObject: function (a) {
                for (var b in a) return !1;
                return !0
            }, error: function (a) {
                throw new Error(a)
            }, parseJSON: function (b) {
                if (typeof b != "string" || !b) return null;
                b = e.trim(b);
                if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                if (n.test(b.replace(o, "@").replace(p, "]").replace(q, "")))
                    return (new Function("return " + b))();
                e.error("Invalid JSON: " + b)
            }, parseXML: function (c) {
                if (typeof c != "string" || !c) return null;
                var d, f;
                try {
                    a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                } catch (g) {
                    d = b
                }
                (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
                return d
            }, noop: function () {
            }, globalEval: function (b) {
                b && j.test(b) && (a.execScript || function (b) {
                    a.eval.call(a, b)
                })(b)
            }, camelCase: function (a) {
                return a.replace(w, "ms-").replace(v, x)
            }, nodeName: function (a, b) {
                return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
            }, each: function (a, c, d) {
                var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
                if (d) {
                    if (i) {
                        for (f in a)
                            if (c.apply(a[f], d) === !1) break
                    } else
                        for (; g < h;)
                            if (c.apply(a[g++], d) === !1) break
                } else if (i) {
                    for (f in a)
                        if (c.call(a[f], f, a[f]) === !1) break
                } else
                    for (; g < h;)
                        if (c.call(a[g], g, a[g++]) === !1) break;
                return a
            }, trim: G ? function (a) {
                return a == null ? "" : G.call(a)
            } : function (a) {
                return a == null ? "" : (a + "").replace(k, "").replace(l, "")
            }, makeArray: function (a, b) {
                var c = b || [];
                if (a != null) {
                    var d = e.type(a);
                    a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
                }
                return c
            }, inArray: function (a, b, c) {
                var d;
                if (b) {
                    if (H) return H.call(b, a, c);
                    d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                    for (; c < d; c++)
                        if (c in b && b[c] === a) return c
                }
                return -1
            }, merge: function (a, c) {
                var d = a.length, e = 0;
                if (typeof c.length == "number")
                    for (var f = c.length; e < f; e++) a[d++] = c[e]; else
                    while (c[e] !== b) a[d++] = c[e++];
                a.length = d;
                return a
            }, grep: function (a, b, c) {
                var d = [], e;
                c = !!c;
                for (var f = 0, g = a.length; f < g; f++) e = !!b(a[f], f), c !== e && d.push(a[f]);
                return d
            }, map: function (a, c, d) {
                var f, g, h = [], i = 0, j = a.length,
                    k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                if (k)
                    for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f); else
                    for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
                return h.concat.apply([], h)
            }, guid: 1, proxy: function (a, c) {
                if (typeof c == "string") {
                    var d = a[c];
                    c = a, a = d
                }
                if (!e.isFunction(a)) return b;
                var f = F.call(arguments, 2), g = function () {
                    return a.apply(c, f.concat(F.call(arguments)))
                };
                g.guid = a.guid = a.guid || g.guid || e.guid++;
                return g
            }, access: function (a, c, d, f, g, h, i) {
                var j, k = d == null, l = 0, m = a.length;
                if (d && typeof d == "object") {
                    for (l in d) e.access(a, c, l, d[l], 1, h, f);
                    g = 1
                } else if (f !== b) {
                    j = i === b && e.isFunction(f), k && (j ? (j = c, c = function (a, b, c) {
                        return j.call(e(a), c)
                    }) : (c.call(a, f), c = null));
                    if (c)
                        for (; l < m; l++) c(a[l], d, j ? f.call(a[l], l, c(a[l], d)) : f, i);
                    g = 1
                }
                return g ? a : k ? c.call(a) : m ? c(a[0], d) : h
            }, now: function () {
                return (new Date).getTime()
            }, uaMatch: function (a) {
                a = a.toLowerCase();
                var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                return {browser: b[1] || "", version: b[2] || "0"}
            }, sub: function () {
                function a(b, c) {
                    return new a.fn.init(b, c)
                }

                e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
                    f && f instanceof e && !(f instanceof a) && (f = a(f));
                    return e.fn.init.call(this, d, f, b)
                }, a.fn.init.prototype = a.fn;
                var b = a(c);
                return a
            }, browser: {}
        }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
            I["[object " + b + "]"] = b.toLowerCase()
        }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function () {
            c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
        } : c.attachEvent && (B = function () {
            c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
        });
        return e
    }(), g = {};
    f.Callbacks = function (a) {
        a = a ? g[a] || h(a) : {};
        var c = [], d = [], e, i, j, k, l, m, n = function (b) {
            var d, e, g, h, i;
            for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? n(g) : h === "function" && (!a.unique || !p.has(g)) && c.push(g)
        }, o = function (b, f) {
            f = f || [], e = !a.memory || [b, f], i = !0, j = !0, m = k || 0, k = 0, l = c.length;
            for (; c && m < l; m++)
                if (c[m].apply(b, f) === !1 && a.stopOnFalse) {
                    e = !0;
                    break
                }
            j = !1, c && (a.once ? e === !0 ? p.disable() : c = [] : d && d.length && (e = d.shift(), p.fireWith(e[0], e[1])))
        }, p = {
            add: function () {
                if (c) {
                    var a = c.length;
                    n(arguments), j ? l = c.length : e && e !== !0 && (k = a, o(e[0], e[1]))
                }
                return this
            }, remove: function () {
                if (c) {
                    var b = arguments, d = 0, e = b.length;
                    for (; d < e; d++)
                        for (var f = 0; f < c.length; f++)
                            if (b[d] === c[f]) {
                                j && f <= l && (l--, f <= m && m--), c.splice(f--, 1);
                                if (a.unique) break
                            }
                }
                return this
            }, has: function (a) {
                if (c) {
                    var b = 0, d = c.length;
                    for (; b < d; b++)
                        if (a === c[b]) return !0
                }
                return !1
            }, empty: function () {
                c = [];
                return this
            }, disable: function () {
                c = d = e = b;
                return this
            }, disabled: function () {
                return !c
            }, lock: function () {
                d = b, (!e || e === !0) && p.disable();
                return this
            }, locked: function () {
                return !d
            }, fireWith: function (b, c) {
                d && (j ? a.once || d.push([b, c]) : (!a.once || !e) && o(b, c));
                return this
            }, fire: function () {
                p.fireWith(this, arguments);
                return this
            }, fired: function () {
                return !!i
            }
        };
        return p
    };
    var i = [].slice;
    f.extend({
        Deferred: function (a) {
            var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"),
                e = "pending", g = {resolve: b, reject: c, notify: d}, h = {
                    done: b.add, fail: c.add, progress: d.add, state: function () {
                        return e
                    }, isResolved: b.fired, isRejected: c.fired, then: function (a, b, c) {
                        i.done(a).fail(b).progress(c);
                        return this
                    }, always: function () {
                        i.done.apply(i, arguments).fail.apply(i, arguments);
                        return this
                    }, pipe: function (a, b, c) {
                        return f.Deferred(function (d) {
                            f.each({done: [a, "resolve"], fail: [b, "reject"], progress: [c, "notify"]}, function (a, b) {
                                var c = b[0], e = b[1], g;
                                f.isFunction(c) ? i[a](function () {
                                    g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"]
                                    (this === i ? d : this, [g])
                                }) : i[a](d[e])
                            })
                        }).promise()
                    }, promise: function (a) {
                        if (a == null) a = h; else
                            for (var b in h) a[b] = h[b];
                        return a
                    }
                }, i = h.promise({}), j;
            for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
            i.done(function () {
                e = "resolved"
            }, c.disable, d.lock).fail(function () {
                e = "rejected"
            }, b.disable, d.lock), a && a.call(i, i);
            return i
        }, when: function (a) {
            function m(a) {
                return function (b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
                }
            }

            function l(a) {
                return function (c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
                }
            }

            var b = i.call(arguments, 0), c = 0, d = b.length, e = Array(d), g = d, h = d,
                j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(), k = j.promise();
            if (d > 1) {
                for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                g || j.resolveWith(j, b)
            } else j !== a && j.resolveWith(j, d ? [a] : []);
            return k
        }
    }), f.support = function () {
        var b, d, e, g, h, i, j, k, l, m, n, o, p = c.createElement("div"), q = c.documentElement;
        p.setAttribute("className", "t"), p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = p.getElementsByTagName("*"), e = p.getElementsByTagName("a")[0];
        if (!d || !d.length || !e) return {};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = p.getElementsByTagName("input")[0], b = {
            leadingWhitespace: p.firstChild.nodeType === 3,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !!p.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: e.getAttribute("href") === "/a",
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !!e.style.cssFloat,
            checkOn: i.value === "on",
            optSelected: h.selected,
            getSetAttribute: p.className !== "t",
            enctype: !!c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            pixelMargin: !0
        }, f.boxModel = b.boxModel = c.compatMode === "CSS1Compat", i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete p.test
        } catch (r) {
            b.deleteExpando = !1
        }
        !p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", function () {
            b.noCloneEvent = !1
        }), p.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), p.appendChild(i), j = c.createDocumentFragment(), j.appendChild(p.lastChild), b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, j.removeChild(i), j.appendChild(p);
        if (p.attachEvent)
            for (n in{
                submit: 1,
                change: 1,
                focusin: 1
            }) m = "on" + n, o = m in p, o || (p.setAttribute(m, "return;"), o = typeof p[m] == "function"), b[n + "Bubbles"] = o;
        j.removeChild(p), j = g = h = p = i = null, f(function () {
            var d, e, g, h, i, j, l, m, n, q, r, s, t, u = c.getElementsByTagName("body")[0];
            !u || (m = 1, t = "padding:0;margin:0;border:", r = "position:absolute;top:0;left:0;width:1px;height:1px;", s = t + "0;visibility:hidden;", n = "style='" + r + t + "5px solid #000;", q = "<div " + n + "display:block;'><div style='" + t + "0;display:block;overflow:hidden;'></div></div>" + "<table " +
                n + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", d = c.createElement("div"), d.style.cssText = s + "width:0;height:0;position:static;top:0;margin-top:" + m + "px", u.insertBefore(d, u.firstChild), p = c.createElement("div"), d.appendChild(p), p.innerHTML = "<table><tr><td style='" + t + "0;display:none'></td><td>t</td></tr></table>", k = p.getElementsByTagName("td"), o = k[0].offsetHeight === 0, k[0].style.display = "", k[1].style.display = "none", b.reliableHiddenOffsets = o && k[0].offsetHeight === 0, a.getComputedStyle && (p.innerHTML = "", l = c.createElement("div"), l.style.width = "0", l.style.marginRight = "0", p.style.width = "2px", p.appendChild(l), b.reliableMarginRight = (parseInt((a.getComputedStyle(l, null) || {marginRight: 0}).marginRight, 10) || 0) === 0), typeof p.style.zoom != "undefined" && (p.innerHTML = "", p.style.width = p.style.padding = "1px", p.style.border = 0, p.style.overflow = "hidden", p.style.display = "inline", p.style.zoom = 1, b.inlineBlockNeedsLayout = p.offsetWidth === 3, p.style.display = "block", p.style.overflow = "visible", p.innerHTML = "<div style='width:5px;'></div>", b.shrinkWrapBlocks = p.offsetWidth !== 3), p.style.cssText = r + s, p.innerHTML = q, e = p.firstChild, g = e.firstChild, i = e.nextSibling.firstChild.firstChild, j = {
                doesNotAddBorder: g.offsetTop !== 5,
                doesAddBorderForTableAndCells: i.offsetTop === 5
            }, g.style.position = "fixed", g.style.top = "20px", j.fixedPosition = g.offsetTop === 20 || g.offsetTop === 15, g.style.position = g.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", j.subtractsBorderForOverflowNotVisible = g.offsetTop === -5, j.doesNotIncludeMarginInBodyOffset = u.offsetTop !== m, a.getComputedStyle && (p.style.marginTop = "1%", b.pixelMargin = (a.getComputedStyle(p, null) || {marginTop: 0}).marginTop !== "1%"), typeof d.style.zoom != "undefined" && (d.style.zoom = 1), u.removeChild(d), l = p = d = null, f.extend(b, j))
        });
        return b
    }();
    var j = /^(?:\{.*\}|\[.*\])$/, k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0},
        hasData: function (a) {
            a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
            return !!a && !m(a)
        },
        data: function (a, c, d, e) {
            if (!!f.acceptData(a)) {
                var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a,
                    n = l ? a[j] : a[j] && j, o = c === "events";
                if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b)
                    return;
                n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
                if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
                g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
                if (o && !h[c]) return g.events;
                k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
                return i
            }
        },
        removeData: function (a, b, c) {
            if (!!f.acceptData(a)) {
                var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
                if (!j[k]) return;
                if (b) {
                    d = c ? j[k] : j[k].data;
                    if (d) {
                        f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in
                        d ? b = [b] : b = b.split(" ")));
                        for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
                        if (!(c ? m : f.isEmptyObject)(d)) return
                    }
                }
                if (!c) {
                    delete j[k].data;
                    if (!m(j[k])) return
                }
                f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
            }
        },
        _data: function (a, b, c) {
            return f.data(a, b, c, !0)
        },
        acceptData: function (a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b
            }
            return !0
        }
    }), f.fn.extend({
        data: function (a, c) {
            var d, e, g, h, i, j = this[0], k = 0, m = null;
            if (a === b) {
                if (this.length) {
                    m = f.data(j);
                    if (j.nodeType === 1 && !f._data(j, "parsedAttrs")) {
                        g = j.attributes;
                        for (i = g.length; k < i; k++) h = g[k].name, h.indexOf("data-") === 0 && (h = f.camelCase(h.substring(5)), l(j, h, m[h]));
                        f._data(j, "parsedAttrs", !0)
                    }
                }
                return m
            }
            if (typeof a == "object") return this.each(function () {
                f.data(this, a)
            });
            d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!";
            return f.access(this, function (c) {
                if (c === b) {
                    m = this.triggerHandler("getData" + e, [d[0]]), m === b && j && (m = f.data(j, a), m = l(j, a, m));
                    return m === b && d[1] ? this.data(d[0]) : m
                }
                d[1] = c, this.each(function () {
                    var b = f(this);
                    b.triggerHandler("setData" + e, d), f.data(this, a, c), b.triggerHandler("changeData" + e, d)
                })
            }, null, c, arguments.length > 1, null, !1)
        }, removeData: function (a) {
            return this.each(function () {
                f.removeData(this, a)
            })
        }
    }), f.extend({
        _mark: function (a, b) {
            a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) +
                1))
        }, _unmark: function (a, b, c) {
            a !== !0 && (c = b, b = a, a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark", e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
            }
        }, queue: function (a, b, c) {
            var d;
            if (a) {
                b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
                return d || []
            }
        }, dequeue: function (a, b) {
            b = b || "fx";
            var c = f.queue(a, b), d = c.shift(), e = {};
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
                f.dequeue(a, b)
            }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
        }
    }), f.fn.extend({
        queue: function (a, c) {
            var d = 2;
            typeof a != "string" && (c = a, a = "fx", d--);
            if (arguments.length < d) return f.queue(this[0], a);
            return c === b ? this : this.each(function () {
                var b = f.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
            })
        }, dequeue: function (a) {
            return this.each(function () {
                f.dequeue(this, a)
            })
        }, delay: function (a, b) {
            a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
            return this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }, promise: function (a, c) {
            function m() {
                --h || d.resolveWith(e, [e])
            }

            typeof a != "string" && (c = a, a = b), a = a || "fx";
            var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
            while (g--)
                if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
            m();
            return d.promise(c)
        }
    });
    var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i,
        s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i,
        u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        v = f.support.getSetAttribute, w, x, y;
    f.fn.extend({
        attr: function (a, b) {
            return f.access(this, f.attr, a, b, arguments.length > 1)
        }, removeAttr: function (a) {
            return this.each(function () {
                f.removeAttr(this, a)
            })
        }, prop: function (a, b) {
            return f.access(this, f.prop, a, b, arguments.length > 1)
        }, removeProp: function (a) {
            a = f.propFix[a] || a;
            return this.each(function () {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {
                }
            })
        }, addClass: function (a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).addClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string") {
                b = a.split(p);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1)
                        if (!e.className && b.length === 1) e.className = a; else {
                            g = " " + e.className + " ";
                            for (h = 0, i = b.length; h < i; h++) ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                            e.className = f.trim(g)
                        }
                }
            }
            return this
        }, removeClass: function (a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).removeClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(p);
                for (d = 0, e = this.length; d < e; d++) {
                    g = this[d];
                    if (g.nodeType === 1 && g.className)
                        if (a) {
                            h = (" " + g.className + " ").replace(o, " ");
                            for (i = 0, j = c.length; i < j; i++) h = h.replace(" " +
                                c[i] + " ", " ");
                            g.className = f.trim(h)
                        } else g.className = ""
                }
            }
            return this
        }, toggleClass: function (a, b) {
            var c = typeof a, d = typeof b == "boolean";
            if (f.isFunction(a)) return this.each(function (c) {
                f(this).toggleClass(a.call(this, c, this.className, b), b)
            });
            return this.each(function () {
                if (c === "string") {
                    var e, g = 0, h = f(this), i = b, j = a.split(p);
                    while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
                } else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
            })
        }, hasClass: function (a) {
            var b = " " + a + " ", c = 0, d = this.length;
            for (; c < d; c++)
                if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
            return !1
        }, val: function (a) {
            var c, d, e, g = this[0];
            {
                if (!!arguments.length) {
                    e = f.isFunction(a);
                    return this.each(function (d) {
                        var g = f(this), h;
                        if (this.nodeType === 1) {
                            e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                                return a == null ? "" : a + ""
                            })), c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()];
                            if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h
                        }
                    })
                }
                if (g) {
                    c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()];
                    if (c && "get" in c && (d = c.get(g, "value")) !== b) return d;
                    d = g.value;
                    return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
                }
            }
        }
    }), f.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            }, select: {
                get: function (a) {
                    var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
                    if (g < 0) return null;
                    c = j ? g : 0, d = j ? g + 1 : i.length;
                    for (; c < d; c++) {
                        e = i[c];
                        if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                            b = f(e).val();
                            if (j) return b;
                            h.push(b)
                        }
                    }
                    if (j && !h.length && i.length) return f(i[g]).val();
                    return h
                }, set: function (a, b) {
                    var c = f.makeArray(b);
                    f(a).find("option").each(function () {
                        this.selected = f.inArray(f(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex = -1);
                    return c
                }
            }
        },
        attrFn: {val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0},
        attr: function (a, c, d, e) {
            var g, h, i, j = a.nodeType;
            if (!!a && j !== 3 && j !== 8 && j !== 2) {
                if (e && c in f.attrFn) return f(a)[c](d);
                if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
                i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
                if (d !== b) {
                    if (d === null) {
                        f.removeAttr(a, c);
                        return
                    }
                    if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) return
                    g;
                    a.setAttribute(c, "" + d);
                    return d
                }
                if (h && "get" in h && i && (g = h.get(a, c)) !== null) return g;
                g = a.getAttribute(c);
                return g === null ? b : g
            }
        },
        removeAttr: function (a, b) {
            var c, d, e, g, h, i = 0;
            if (b && a.nodeType === 1) {
                d = b.toLowerCase().split(p), g = d.length;
                for (; i < g; i++) e = d[i], e && (c = f.propFix[e] || e, h = u.test(e), h || f.attr(a, e, ""), a.removeAttribute(v ? e : c), h && c in a && (a[c] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed"); else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                        var c = a.value;
                        a.setAttribute("type", b), c && (a.value = c);
                        return b
                    }
                }
            }, value: {
                get: function (a, b) {
                    if (w && f.nodeName(a, "button")) return w.get(a, b);
                    return b in a ? a.value : null
                }, set: function (a, b, c) {
                    if (w && f.nodeName(a, "button")) return w.set(a, b, c);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (a, c, d) {
            var e, g, h, i = a.nodeType;
            if (!!a && i !== 3 && i !== 8 && i !== 2) {
                h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
                return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
            }
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
        get: function (a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        }, set: function (a, b, c) {
            var d;
            b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
            return c
        }
    }, v || (y = {name: !0, id: !0, coords: !0}, w = f.valHooks.button = {
        get: function (a, c) {
            var d;
            d = a.getAttributeNode(c);
            return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
        }, set: function (a, b, d) {
            var e = a.getAttributeNode(d);
            e || (e = c.createAttribute(d), a.setAttributeNode(e));
            return e.nodeValue = b + ""
        }
    }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function (a, c) {
                if (c === "") {
                    a.setAttribute(b, "auto");
                    return c
                }
            }
        })
    }), f.attrHooks.contenteditable = {
        get: w.get, set: function (a, b, c) {
            b === "" && (b = "false"), w.set(a, b, c)
        }
    }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function (a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d
            }
        })
    }), f.support.style || (f.attrHooks.style = {
        get: function (a) {
            return a.style.cssText.toLowerCase() || b
        }, set: function (a, b) {
            return a.style.cssText = "" + b
        }
    }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function (a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
            return null
        }
    })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = {
            get: function (a) {
                return a.getAttribute("value") === null ? "on" : a.value
            }
        }
    }), f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function (a, b) {
                if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0
            }
        })
    });
    var z = /^(?:textarea|input|select)$/i, A = /^([^\.]*)?(?:\.(.+))?$/, B = /(?:^|\s)hover(\.\S+)?\b/, C = /^key/,
        D = /^(?:mouse|contextmenu)|click/, E = /^(?:focusinfocus|focusoutblur)$/,
        F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, G = function (a) {
            var b = F.exec(a);
            b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
            return b
        }, H = function (a, b) {
            var c = a.attributes || {};
            return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
        }, I = function (a) {
            return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
        };
    f.event = {
        add: function (a, c, d, e, g) {
            var h, i, j, k, l, m, n, o, p, q, r, s;
            if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
                d.handler && (p = d, d = p.handler, g = p.selector), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
                    return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
                }, i.elem = a), c = f.trim(I(c)).split(" ");
                for (k = 0; k < c.length; k++) {
                    l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                        type: m,
                        origType: l[1],
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: g,
                        quick: g && G(g),
                        namespace: n.join(".")
                    }, p), r = j[m];
                    if (!r) {
                        r = j[m] = [], r.delegateCount = 0;
                        if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                    }
                    s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
                }
                a = null
            }
        },
        global: {},
        remove: function (a, b, c, d, e) {
            var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
            if (!!g && !!(o = g.events)) {
                b = f.trim(I(b || "")).split(" ");
                for (h = 0; h < b.length; h++) {
                    i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                    if (!j) {
                        for (j in o) f.event.remove(a, j + b[h], c, d, !0);
                        continue
                    }
                    p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" +
                        l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                    for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                    r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
                }
                f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
            }
        },
        customEvent: {getData: !0, setData: !0, changeData: !0},
        trigger: function (c, d, e, g) {
            if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
                if (E.test(h + f.event.triggered)) return;
                h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
                if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
                c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
                if (!e) {
                    j = f.cache;
                    for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                    return
                }
                c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
                if (p.trigger && p.trigger.apply(e, d) === !1) return;
                r = [[e, p.bindType || h]];
                if (!g && !p.noBubble && !f.isWindow(e)) {
                    s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                    for (; m; m = m.parentNode) r.push([m, s]), n = m;
                    n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                }
                for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
                return c.result
            }
        },
        dispatch: function (c) {
            c = f.event.fix(c || a.event);
            var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0),
                h = !c.exclusive && !c.namespace, i = f.event.special[c.type] || {}, j = [], k, l, m, n, o, p, q, r, s,
                t, u;
            g[0] = c, c.delegateTarget = this;
            if (!i.preDispatch || i.preDispatch.call(this, c) !== !1) {
                if (e && (!c.button || c.type !== "click")) {
                    n = f(this), n.context = this.ownerDocument || this;
                    for (m = c.target; m != this; m = m.parentNode || this)
                        if (m.disabled !== !0) {
                            p = {}, r = [], n[0] = m;
                            for (k = 0; k < e; k++) s = d[k], t = s.selector, p[t] === b && (p[t] = s.quick ? H(m, s.quick) : n.is(t)), p[t] && r.push(s);
                            r.length && j.push({elem: m, matches: r})
                        }
                }
                d.length > e && j.push({elem: this, matches: d.slice(e)});
                for (k = 0; k < j.length && !c.isPropagationStopped(); k++) {
                    q = j[k], c.currentTarget = q.elem;
                    for (l = 0; l < q.matches.length && !c.isImmediatePropagationStopped(); l++) {
                        s = q.matches[l];
                        if (h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace)) c.data = s.data, c.handleObj = s, o = ((f.event.special[s.origType] || {}).handle || s.handler).apply(q.elem, g), o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation()))
                    }
                }
                i.postDispatch && i.postDispatch.call(this, c);
                return c.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (a, b) {
                a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
                return a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, d) {
                var e, f, g, h = d.button, i = d.fromElement;
                a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
                return a
            }
        },
        fix: function (a) {
            if (a[f.expando]) return a;
            var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
            a = f.Event(g);
            for (d = i.length; d;) e = i[--d], a[e] = g[e];
            a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
            return h.filter ? h.filter(a, g) : a
        },
        special: {
            ready: {setup: f.bindReady},
            load: {noBubble: !0},
            focus: {delegateType: "focusin"},
            blur: {delegateType: "focusout"},
            beforeunload: {
                setup: function (a, b, c) {
                    f.isWindow(this) && (this.onbeforeunload = c)
                }, teardown: function (a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = f.extend(new f.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
            d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }, f.Event = function (a, b) {
        if (!(this instanceof f.Event)) return new f.Event(a, b);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
    }, f.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = K;
            var a = this.originalEvent;
            !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        }, stopPropagation: function () {
            this.isPropagationStopped = K;
            var a = this.originalEvent;
            !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }, stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = K, this.stopPropagation()
        }, isDefaultPrevented: J, isPropagationStopped: J, isImmediatePropagationStopped: J
    }, f.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
        f.event.special[a] = {
            delegateType: b, bindType: b, handle: function (a) {
                var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
                if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
                return h
            }
        }
    }), f.support.submitBubbles || (f.event.special.submit = {
        setup: function () {
            if (f.nodeName(this, "form")) return !1;
            f.event.add(this, "click._submit keypress._submit", function (a) {
                var c = a.target, d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
                    a._submit_bubble = !0
                }), d._submit_attached = !0)
            })
        }, postDispatch: function (a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0))
        }, teardown: function () {
            if (f.nodeName(this, "form")) return !1;
            f.event.remove(this, "._submit")
        }
    }), f.support.changeBubbles || (f.event.special.change = {
        setup: function () {
            if (z.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function (a) {
                    a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                }), f.event.add(this, "click._change", function (a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
                });
                return !1
            }
            f.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;
                z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
                }), b._change_attached = !0)
            })
        }, handle: function (a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
        }, teardown: function () {
            f.event.remove(this, "._change");
            return z.test(this.nodeName)
        }
    }), f.support.focusinBubbles || f.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var d = 0, e = function (a) {
            f.event.simulate(b, a.target, f.event.fix(a), !0)
        };
        f.event.special[b] = {
            setup: function () {
                d++ === 0 && c.addEventListener(a, e, !0)
            }, teardown: function () {
                --d === 0 && c.removeEventListener(a, e, !0)
            }
        }
    }), f.fn.extend({
        on: function (a, c, d, e, g) {
            var h, i;
            if (typeof a == "object") {
                typeof c != "string" && (d = d || c, c = b);
                for (i in a) this.on(i, c, d, a[i], g);
                return this
            }
            d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
            if (e === !1) e = J; else if (!e) return this;
            g === 1 && (h = e, e = function (a) {
                f().off(a);
                return h.apply(this, arguments)
            }, e.guid = h.guid || (h.guid = f.guid++));
            return this.each(function () {
                f.event.add(this, a, e, d, c)
            })
        }, one: function (a, b, c, d) {
            return this.on(a, b, c, d, 1)
        }, off: function (a, c, d) {
            if (a && a.preventDefault && a.handleObj) {
                var e = a.handleObj;
                f(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler);
                return this
            }
            if (typeof a == "object") {
                for (var g in a) this.off(g, c, a[g]);
                return this
            }
            if (c === !1 || typeof c == "function") d = c, c = b;
            d === !1 && (d = J);
            return this.each(function () {
                f.event.remove(this, a, d, c)
            })
        }, bind: function (a, b, c) {
            return this.on(a, null, b, c)
        }, unbind: function (a, b) {
            return this.off(a, null, b)
        }, live: function (a, b, c) {
            f(this.context).on(a, this.selector, b, c);
            return this
        }, die: function (a, b) {
            f(this.context).off(a, this.selector || "**", b);
            return this
        }, delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        }, undelegate: function (a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
        }, trigger: function (a, b) {
            return this.each(function () {
                f.event.trigger(a, b, this)
            })
        }, triggerHandler: function (a, b) {
            if (this[0]) return f.event.trigger(a, b, this[0], !0)
        }, toggle: function (a) {
            var b = arguments, c = a.guid || f.guid++, d = 0, e = function (c) {
                var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
                return b[e].apply(this, arguments) || !1
            };
            e.guid = c;
            while (d < b.length) b[d++].guid = c;
            return this.click(e)
        }, hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        f.fn[b] = function (a, c) {
            c == null && (c = a, a = null);
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
    }), function () {
        function x(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        if (j.nodeType === 1) {
                            g || (j[d] = c, j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break
                                }
                            } else if (m.filter(b, [j]).length > 0) {
                                k = j;
                                break
                            }
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        function w(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            d = "sizcache" + (Math.random() + "").replace(".", ""), e = 0, g = Object.prototype.toString, h = !1,
            i = !0, j = /\\/g, k = /\r\n/g, l = /\W/;
        [0, 0].sort(function () {
            i = !1;
            return 0
        });
        var m = function (b, d, e, f) {
            e = e || [], d = d || c;
            var h = d;
            if (d.nodeType !== 1 && d.nodeType !== 9) return [];
            if (!b || typeof b != "string") return e;
            var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
            do {
                a.exec(""), i = a.exec(x);
                if (i) {
                    x = i[3], w.push(i[1]);
                    if (i[2]) {
                        l = i[3];
                        break
                    }
                }
            } while (i);
            if (w.length > 1 && p.exec(b))
                if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f); else {
                    j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                    while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
                } else {
                !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                if (d) {
                    n = f ? {
                        expr: w.pop(),
                        set: s(f)
                    } : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                    while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
                } else k = w = []
            }
            k || (k = j), k || m.error(q || b);
            if (g.call(k) === "[object Array]")
                if (!u) e.push.apply(e, k); else if (d && d.nodeType === 1)
                    for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]); else
                    for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]); else s(k, e);
            l && (m(l, h, e, f), m.uniqueSort(e));
            return e
        };
        m.uniqueSort = function (a) {
            if (u) {
                h = i, a.sort(u);
                if (h)
                    for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
            }
            return a
        }, m.matches = function (a, b) {
            return m(a, null, null, b)
        }, m.matchesSelector = function (a, b) {
            return m(b, null, null, [a]).length > 0
        }, m.find = function (a, b, c) {
            var d, e, f, g, h, i;
            if (!a) return [];
            for (e = 0, f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1], g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break
                        }
                    }
                }
            }
            d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
            return {set: d, expr: a}
        }, m.filter = function (a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter)
                    if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                        k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                        if (l.substr(l.length - 1) === "\\") continue;
                        s === r && (r = []);
                        if (o.preFilter[h]) {
                            f = o.preFilter[h](f, s, d, r, e, t);
                            if (!f) g = i = !0; else if (f === !0) continue
                        }
                        if (f)
                            for (n = 0; (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                        if (i !== b) {
                            d || (s = r), a = a.replace(o.match[h], "");
                            if (!g) return [];
                            break
                        }
                    }
                if (a === q)
                    if (g == null) m.error(a); else break;
                q = a
            }
            return s
        }, m.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        };
        var n = m.getText = function (a) {
            var b, c, d = a.nodeType, e = "";
            if (d) {
                if (d === 1 || d === 9 || d === 11) {
                    if (typeof a.textContent == "string") return a.textContent;
                    if (typeof a.innerText == "string") return a.innerText.replace(k, "");
                    for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
                } else if (d === 3 || d === 4) return a.nodeValue
            } else
                for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
            return e
        }, o = m.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {"class": "className", "for": "htmlFor"},
            attrHandle: {
                href: function (a) {
                    return a.getAttribute("href")
                }, type: function (a) {
                    return a.getAttribute("type")
                }
            },
            relative: {
                "+": function (a, b) {
                    var c = typeof b == "string", d = c && !l.test(b), e = c && !d;
                    d && (b = b.toLowerCase());
                    for (var f = 0, g = a.length, h; f < g; f++)
                        if (h = a[f]) {
                            while ((h = h.previousSibling) && h.nodeType !== 1) ;
                            a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                        }
                    e && m.filter(b, a, !0)
                }, ">": function (a, b) {
                    var c, d = typeof b == "string", e = 0, f = a.length;
                    if (d && !l.test(b)) {
                        b = b.toLowerCase();
                        for (; e < f; e++) {
                            c = a[e];
                            if (c) {
                                var g = c.parentNode;
                                a[e] = g.nodeName.toLowerCase() === b ? g : !1
                            }
                        }
                    } else {
                        for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                        d && m.filter(b, a, !0)
                    }
                }, "": function (a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
                }, "~": function (a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
                }
            },
            find: {
                ID: function (a, b, c) {
                    if (typeof b.getElementById != "undefined" && !c) {
                        var d = b.getElementById(a[1]);
                        return d && d.parentNode ? [d] : []
                    }
                }, NAME: function (a, b) {
                    if (typeof b.getElementsByName != "undefined") {
                        var c = [], d = b.getElementsByName(a[1]);
                        for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                        return c.length === 0 ? null : c
                    }
                }, TAG: function (a, b) {
                    if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
                }
            },
            preFilter: {
                CLASS: function (a, b, c, d, e, f) {
                    a = " " + a[1].replace(j, "") + " ";
                    if (f) return a;
                    for (var g = 0, h; (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                    return !1
                }, ID: function (a) {
                    return a[1].replace(j, "")
                }, TAG: function (a, b) {
                    return a[1].replace(j, "").toLowerCase()
                }, CHILD: function (a) {
                    if (a[1] === "nth") {
                        a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                        var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                        a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                    } else a[2] && m.error(a[0]);
                    a[0] = e++;
                    return a
                }, ATTR: function (a, b, c, d, e, f) {
                    var g = a[1] = a[1].replace(j, "");
                    !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " +
                        a[4] + " ");
                    return a
                }, PSEUDO: function (b, c, d, e, f) {
                    if (b[1] === "not")
                        if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = m(b[3], null, null, c); else {
                            var g = m.filter(b[3], c, d, !0 ^ f);
                            d || e.push.apply(e, g);
                            return !1
                        } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0]))
                        return !0;
                    return b
                }, POS: function (a) {
                    a.unshift(!0);
                    return a
                }
            },
            filters: {
                enabled: function (a) {
                    return a.disabled === !1 && a.type !== "hidden"
                }, disabled: function (a) {
                    return a.disabled === !0
                }, checked: function (a) {
                    return a.checked === !0
                }, selected: function (a) {
                    a.parentNode && a.parentNode.selectedIndex;
                    return a.selected === !0
                }, parent: function (a) {
                    return !!a.firstChild
                }, empty: function (a) {
                    return !a.firstChild
                }, has: function (a, b, c) {
                    return !!m(c[3], a).length
                }, header: function (a) {
                    return /h\d/i.test(a.nodeName)
                }, text: function (a) {
                    var b = a.getAttribute("type"), c = a.type;
                    return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                }, radio: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                }, checkbox: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                }, file: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "file" === a.type
                }, password: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "password" === a.type
                }, submit: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "submit" === a.type
                }, image: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "image" === a.type
                }, reset: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "reset" === a.type
                }, button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && "button" === a.type || b === "button"
                }, input: function (a) {
                    return /input|select|textarea|button/i.test(a.nodeName)
                }, focus: function (a) {
                    return a === a.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function (a, b) {
                    return b === 0
                }, last: function (a, b, c, d) {
                    return b === d.length - 1
                }, even: function (a, b) {
                    return b % 2 === 0
                }, odd: function (a, b) {
                    return b % 2 === 1
                }, lt: function (a, b, c) {
                    return b < c[3] - 0
                }, gt: function (a, b, c) {
                    return b > c[3] - 0
                }, nth: function (a, b, c) {
                    return c[3] - 0 === b
                }, eq: function (a, b, c) {
                    return c[3] - 0 === b
                }
            },
            filter: {
                PSEUDO: function (a, b, c, d) {
                    var e = b[1], f = o.filters[e];
                    if (f) return f(a, c, b, d);
                    if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                    if (e === "not") {
                        var g = b[3];
                        for (var h = 0, i = g.length; h < i; h++)
                            if (g[h] === a) return !1;
                        return !0
                    }
                    m.error(e)
                }, CHILD: function (a, b) {
                    var c, e, f, g, h, i, j, k = b[1], l = a;
                    switch (k) {
                        case"only":
                        case"first":
                            while (l = l.previousSibling)
                                if (l.nodeType === 1) return !1;
                            if (k === "first") return !0;
                            l = a;
                        case"last":
                            while (l = l.nextSibling)
                                if (l.nodeType === 1) return !1;
                            return !0;
                        case"nth":
                            c = b[2], e = b[3];
                            if (c === 1 && e === 0) return !0;
                            f = b[0], g = a.parentNode;
                            if (g && (g[d] !== f || !a.nodeIndex)) {
                                i = 0;
                                for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
                                g[d] = f
                            }
                            j = a.nodeIndex - e;
                            return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
                    }
                }, ID: function (a, b) {
                    return a.nodeType === 1 && a.getAttribute("id") === b
                }, TAG: function (a, b) {
                    return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
                }, CLASS: function (a, b) {
                    return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                }, ATTR: function (a, b) {
                    var c = b[1],
                        d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
                        e = d + "", f = b[2], g = b[4];
                    return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length -
                        g.length) === g : f === "|=" ? e === g || e.substr(0, g.length +
                        1) === g + "-" : !1 : e && d !== !1
                }, POS: function (a, b, c, d) {
                    var e = b[2], f = o.setFilters[e];
                    if (f) return f(a, c, b, d)
                }
            }
        }, p = o.match.POS, q = function (a, b) {
            return "\\" + (b - 0 + 1)
        };
        for (var r in o.match) o.match[r] = new RegExp(o.match[r].source +
            /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        o.match.globalPOS = p;
        var s = function (a, b) {
            a = Array.prototype.slice.call(a, 0);
            if (b) {
                b.push.apply(b, a);
                return b
            }
            return a
        };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
        } catch (t) {
            s = function (a, b) {
                var c = 0, d = b || [];
                if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a); else if (typeof a.length == "number")
                    for (var e = a.length; c < e; c++) d.push(a[c]); else
                    for (; a[c]; c++) d.push(a[c]);
                return d
            }
        }
        var u, v;
        c.documentElement.compareDocumentPosition ? u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (!a.compareDocumentPosition || !b.compareDocumentPosition) return
            a.compareDocumentPosition ? -1 : 1;
            return a.compareDocumentPosition(b) & 4 ? -1 : 1
        } : (u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
            if (g === i) return v(a, b);
            if (!g) return -1;
            if (!i) return 1;
            while (j) e.unshift(j), j = j.parentNode;
            j = i;
            while (j) f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++)
                if (e[k] !== f[k]) return v(e[k], f[k]);
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
        }, v = function (a, b, c) {
            if (a === b) return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b) return -1;
                d = d.nextSibling
            }
            return 1
        }), function () {
            var a = c.createElement("div"), d = "script" + (new Date).getTime(), e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            }, o.filter.ID = function (a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b
            }), e.removeChild(a), e = a = null
        }(), function () {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                    c = d
                }
                return c
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                return a.getAttribute("href", 2)
            }), a = null
        }(), c.querySelectorAll && function () {
            var a = m, b = c.createElement("div"), d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                m = function (b, e, f, g) {
                    e = e || c;
                    if (!g && !m.isXML(e)) {
                        var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                        if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                            if (h[1]) return s(e.getElementsByTagName(b), f);
                            if (h[2] && o.find.CLASS && e.getElementsByClassName)
                                return s(e.getElementsByClassName(h[2]), f)
                        }
                        if (e.nodeType === 9) {
                            if (b === "body" && e.body) return s([e.body], f);
                            if (h && h[3]) {
                                var i = e.getElementById(h[3]);
                                if (!i || !i.parentNode) return s([], f);
                                if (i.id === h[3]) return s([i], f)
                            }
                            try {
                                return s(e.querySelectorAll(b), f)
                            } catch (j) {
                            }
                        } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                            var k = e, l = e.getAttribute("id"), n = l || d, p = e.parentNode, q = /^\s*[+~]/.test(b);
                            l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                            try {
                                if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                            } catch (r) {
                            } finally {
                                l || k.removeAttribute("id")
                            }
                        }
                    }
                    return a(b, e, f, g)
                };
                for (var e in a) m[e] = a[e];
                b = null
            }
        }(), function () {
            var a = c.documentElement,
                b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var d = !b.call(c.createElement("div"), "div"), e = !1;
                try {
                    b.call(c.documentElement, "[test!='']:sizzle")
                } catch (f) {
                    e = !0
                }
                m.matchesSelector = function (a, c) {
                    c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a)) try {
                        if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                            var f = b.call(a, c);
                            if (f || !d || a.document && a.document.nodeType !== 11)
                                return f
                        }
                    } catch (g) {
                    }
                    return m(c, null, null, [a]).length > 0
                }
            }
        }(), function () {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                a.lastChild.className = "e";
                if (a.getElementsByClassName("e").length === 1) return;
                o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
                    if (typeof b.getElementsByClassName != "undefined" && !c)
                        return b.getElementsByClassName(a[1])
                }, a = null
            }
        }(), c.documentElement.contains ? m.contains = function (a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        } : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
            return !!(a.compareDocumentPosition(b) & 16)
        } : m.contains = function () {
            return !1
        }, m.isXML = function (a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1
        };
        var y = function (a, b, c) {
            var d, e = [], f = "", g = b.nodeType ? [b] : b;
            while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
            a = o.relative[a] ? a + "*" : a;
            for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
            return m.filter(f, e)
        };
        m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
    }();
    var L = /Until$/, M = /^(?:parents|prevUntil|prevAll)/, N = /,/, O = /^.[^:#\[\.,]*$/, P = Array.prototype.slice,
        Q = f.expr.match.globalPOS, R = {children: !0, contents: !0, next: !0, prev: !0};
    f.fn.extend({
        find: function (a) {
            var b = this, c, d;
            if (typeof a != "string") return f(a).filter(function () {
                for (c = 0, d = b.length; c < d; c++)
                    if (f.contains(b[c], this)) return !0
            });
            var e = this.pushStack("", "find", a), g, h, i;
            for (c = 0, d = this.length; c < d; c++) {
                g = e.length, f.find(a, this[c], e);
                if (c > 0)
                    for (h = g; h < e.length; h++)
                        for (i = 0; i < g; i++)
                            if (e[i] === e[h]) {
                                e.splice(h--, 1);
                                break
                            }
            }
            return e
        }, has: function (a) {
            var b = f(a);
            return this.filter(function () {
                for (var a = 0, c = b.length; a < c; a++)
                    if (f.contains(this, b[a])) return !0
            })
        }, not: function (a) {
            return this.pushStack(T(this, a, !1), "not", a)
        }, filter: function (a) {
            return this.pushStack(T(this, a, !0), "filter", a)
        }, is: function (a) {
            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
        }, closest: function (a, b) {
            var c = [], d, e, g = this[0];
            if (f.isArray(a)) {
                var h = 1;
                while (g && g.ownerDocument && g !== b) {
                    for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({selector: a[d], elem: g, level: h});
                    g = g.parentNode, h++
                }
                return c
            }
            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                while (g) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11)
                        break
                }
            }
            c = c.length > 1 ? f.unique(c) : c;
            return this.pushStack(c, "closest", a)
        }, index: function (a) {
            if (!a) return this[0] && this[0].parentNode ? this.prevAll().length : -1;
            if (typeof a == "string") return f.inArray(this[0], f(a));
            return f.inArray(a.jquery ? a[0] : a, this)
        }, add: function (a, b) {
            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a), d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
        }, andSelf: function () {
            return this.add(this.prevObject)
        }
    }), f.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        }, parents: function (a) {
            return f.dir(a, "parentNode")
        }, parentsUntil: function (a, b, c) {
            return f.dir(a, "parentNode", c)
        }, next: function (a) {
            return f.nth(a, 2, "nextSibling")
        }, prev: function (a) {
            return f.nth(a, 2, "previousSibling")
        }, nextAll: function (a) {
            return f.dir(a, "nextSibling")
        }, prevAll: function (a) {
            return f.dir(a, "previousSibling")
        }, nextUntil: function (a, b, c) {
            return f.dir(a, "nextSibling", c)
        }, prevUntil: function (a, b, c) {
            return f.dir(a, "previousSibling", c)
        }, siblings: function (a) {
            return f.sibling((a.parentNode || {}).firstChild, a)
        }, children: function (a) {
            return f.sibling(a.firstChild)
        }, contents: function (a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
        }
    }, function (a, b) {
        f.fn[a] = function (c, d) {
            var e = f.map(this, b, c);
            L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
            return this.pushStack(e, a, P.call(arguments).join(","))
        }
    }), f.extend({
        filter: function (a, b, c) {
            c && (a = ":not(" + a + ")");
            return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
        }, dir: function (a, c, d) {
            var e = [], g = a[c];
            while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
            return e
        }, nth: function (a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c])
                if (a.nodeType === 1 && ++e === b) break;
            return a
        }, sibling: function (a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c
        }
    });
    var V = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        W = / jQuery\d+="(?:\d+|null)"/g, X = /^\s+/,
        Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Z = /<([\w:]+)/, $ = /<tbody/i,
        _ = /<|&#?\w+;/, ba = /<(?:script|style)/i, bb = /<(?:script|object|embed|option|style)/i,
        bc = new RegExp("<(?:" + V + ")[\\s/>]", "i"), bd = /checked\s*(?:[^=]|=\s*.checked.)/i,
        be = /\/(java|ecma)script/i, bf = /^\s*<!(?:\[CDATA\[|\-\-)/, bg = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }, bh = U(c);
    bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
        text: function (a) {
            return f.access(this, function (a) {
                return a === b ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a))
            }, null, a, arguments.length)
        }, wrapAll: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        }, wrapInner: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).wrapInner(a.call(this, b))
            });
            return this.each(function () {
                var b = f(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        }, wrap: function (a) {
            var b = f.isFunction(a);
            return this.each(function (c) {
                f(this).wrapAll(b ? a.call(this, c) : a)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
            }).end()
        }, append: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        }, prepend: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        }, before: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = f.clean(arguments);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        }, after: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, f.clean(arguments));
                return a
            }
        }, remove: function (a, b) {
            for (var c = 0, d; (d = this[c]) != null; c++)
                if (!a || f.filter(a, [d]).length) !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this
        }, empty: function () {
            for (var a = 0, b; (b = this[a]) != null; a++) {
                b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) b.removeChild(b.firstChild)
            }
            return this
        }, clone: function (a, b) {
            a = a == null ? !1 : a, b = b == null ? a : b;
            return this.map(function () {
                return f.clone(this, a, b)
            })
        }, html: function (a) {
            return f.access(this, function (a) {
                var c = this[0] || {}, d = 0, e = this.length;
                if (a === b) return c.nodeType === 1 ? c.innerHTML.replace(W, "") : null;
                if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(Y, "<$1></$2>");
                    try {
                        for (; d < e; d++) c = this[d] || {}, c.nodeType === 1 && (f.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
                        c = 0
                    } catch (g) {
                    }
                }
                c && this.empty().append(a)
            }, null, a, arguments.length)
        }, replaceWith: function (a) {
            if (this[0] && this[0].parentNode) {
                if (f.isFunction(a)) return this.each(function (b) {
                    var c = f(this), d = c.html();
                    c.replaceWith(a.call(this, b, d))
                });
                typeof a != "string" && (a = f(a).detach());
                return this.each(function () {
                    var b = this.nextSibling, c = this.parentNode;
                    f(this).remove(), b ? f(b).before(a) : f(c).append(a)
                })
            }
            return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
        }, detach: function (a) {
            return this.remove(a, !0)
        }, domManip: function (a, c, d) {
            var e, g, h, i, j = a[0], k = [];
            if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function () {
                f(this).domManip(a, c, d, !0)
            });
            if (f.isFunction(j)) return this.each(function (e) {
                var g = f(this);
                a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
            });
            if (this[0]) {
                i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {fragment: i} : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
                }
                k.length && f.each(k, function (a, b) {
                    b.src ? f.ajax({
                        type: "GET",
                        global: !1,
                        url: b.src,
                        async: !1,
                        dataType: "script"
                    }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
                })
            }
            return this
        }
    }), f.buildFragment = function (a, b, d) {
        var e, g, h, i, j = a[0];
        b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
        return {fragment: e, cacheable: g}
    }, f.fragments = {}, f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        f.fn[a] = function (c) {
            var d = [], e = f(c), g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                e[b](this[0]);
                return this
            }
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), f.extend({
        clone: function (a, b, c) {
            var d, e, g,
                h = f.support.html5Clone || f.isXMLDoc(a) || !bc.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : bo(a);
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                bk(a, h), d = bl(a), e = bl(h);
                for (g = 0; d[g]; ++g) e[g] && bk(d[g], e[g])
            }
            if (b) {
                bj(a, h);
                if (c) {
                    d = bl(a), e = bl(h);
                    for (g = 0; d[g]; ++g) bj(d[g], e[g])
                }
            }
            d = e = null;
            return h
        }, clean: function (a, b, d, e) {
            var g, h, i, j = [];
            b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            for (var k = 0, l; (l = a[k]) != null; k++) {
                typeof l == "number" && (l += "");
                if (!l) continue;
                if (typeof l == "string")
                    if (!_.test(l)) l = b.createTextNode(l); else {
                        l = l.replace(Y, "<$1></$2>");
                        var m = (Z.exec(l) || ["", ""])[1].toLowerCase(), n = bg[m] || bg._default, o = n[0],
                            p = b.createElement("div"), q = bh.childNodes, r;
                        b === c ? bh.appendChild(p) : U(b).appendChild(p), p.innerHTML = n[1] + l + n[2];
                        while (o--) p = p.lastChild;
                        if (!f.support.tbody) {
                            var s = $.test(l),
                                t = m === "table" && !s ? p.firstChild && p.firstChild.childNodes : n[1] === "<table>" && !s ? p.childNodes : [];
                            for (i = t.length - 1; i >= 0; --i) f.nodeName(t[i], "tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i])
                        }
                        !f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]), p.firstChild), l = p.childNodes, p && (p.parentNode.removeChild(p), q.length > 0 && (r = q[q.length - 1], r && r.parentNode && r.parentNode.removeChild(r)))
                    }
                var u;
                if (!f.support.appendChecked)
                    if (l[0] && typeof(u = l.length) == "number")
                        for (i = 0; i < u; i++) bn(l[i]); else bn(l);
                l.nodeType ? j.push(l) : j = f.merge(j, l)
            }
            if (d) {
                g = function (a) {
                    return !a.type || be.test(a.type)
                };
                for (k = 0; j[k]; k++) {
                    h = j[k];
                    if (e && f.nodeName(h, "script") && (!h.type || be.test(h.type)))
                        e.push(h.parentNode ? h.parentNode.removeChild(h) : h); else {
                        if (h.nodeType === 1) {
                            var v = f.grep(h.getElementsByTagName("script"), g);
                            j.splice.apply(j, [k + 1, 0].concat(v))
                        }
                        d.appendChild(h)
                    }
                }
            }
            return j
        }, cleanData: function (a) {
            var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
            for (var h = 0, i; (i = a[h]) != null; h++) {
                if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
                c = i[f.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                        b.handle && (b.handle.elem = null)
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
                }
            }
        }
    });
    var bp = /alpha\([^)]*\)/i, bq = /opacity=([^)]*)/, br = /([A-Z]|^ms)/g, bs = /^[\-+]?(?:\d*\.)?\d+$/i,
        bt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i, bu = /^([\-+])=([\-+.\de]+)/, bv = /^margin/,
        bw = {position: "absolute", visibility: "hidden", display: "block"}, bx = ["Top", "Right", "Bottom", "Left"],
        by, bz, bA;
    f.fn.css = function (a, c) {
        return f.access(this, function (a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c)
        }, a, c, arguments.length > 1)
    }, f.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = by(a, "opacity");
                        return c === "" ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": f.support.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (a, c, d, e) {
            if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
                var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
                c = f.cssProps[i] || i;
                if (d === b) {
                    if (k && "get" in k && (g = k.get(a, !1, e)) !== b) return g;
                    return j[c]
                }
                h = typeof d, h === "string" && (g = bu.exec(d)) && (d = +(g[1] +
                    1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
                if (d == null || h === "number" && isNaN(d)) return;
                h === "number" && !f.cssNumber[i] && (d += "px");
                if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
                    j[c] = d
                } catch (l) {
                }
            }
        },
        css: function (a, c, d) {
            var e, g;
            c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
            if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
            if (by) return by(a, c)
        },
        swap: function (a, b, c) {
            var d = {}, e, f;
            for (f in b) d[f] = a.style[f], a.style[f] = b[f];
            e = c.call(a);
            for (f in b) a.style[f] = d[f];
            return e
        }
    }), f.curCSS = f.css, c.defaultView && c.defaultView.getComputedStyle && (bz = function (a, b) {
        var c, d, e, g, h = a.style;
        b = b.replace(br, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), !f.support.pixelMargin && e && bv.test(b) && bt.test(c) && (g = h.width, h.width = c, c = e.width, h.width = g);
        return c
    }), c.documentElement.currentStyle && (bA = function (a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
        f == null && g && (e = g[b]) && (f = e), bt.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
        return f === "" ? "auto" : f
    }), by = bz || bA, f.each(["height", "width"], function (a, b) {
        f.cssHooks[b] = {
            get: function (a, c, d) {
                if (c) return a.offsetWidth !== 0 ? bB(a, b, d) : f.swap(a, bw, function () {
                    return bB(a, b, d)
                })
            }, set: function (a, b) {
                return bs.test(b) ? b + "px" : b
            }
        }
    }), f.support.opacity || (f.cssHooks.opacity = {
        get: function (a, b) {
            return bq.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        }, set: function (a, b) {
            var c = a.style, d = a.currentStyle, e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
                g = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && f.trim(g.replace(bp, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter) return
            }
            c.filter = bp.test(g) ? g.replace(bp, e) : g + " " + e
        }
    }), f(function () {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function (a, b) {
                return f.swap(a, {display: "inline-block"}, function () {
                    return b ? by(a, "margin-right") : a.style.marginRight
                })
            }
        })
    }), f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
    }, f.expr.filters.visible = function (a) {
        return !f.expr.filters.hidden(a)
    }), f.each({margin: "", padding: "", border: "Width"}, function (a, b) {
        f.cssHooks[a + b] = {
            expand: function (c) {
                var d, e = typeof c == "string" ? c.split(" ") : [c], f = {};
                for (d = 0; d < 4; d++) f[a + bx[d] + b] = e[d] || e[d - 2] || e[0];
                return f
            }
        }
    });
    var bC = /%20/g, bD = /\[\]$/, bE = /\r?\n/g, bF = /#.*$/, bG = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        bH = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        bI = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bJ = /^(?:GET|HEAD)$/, bK = /^\/\//,
        bL = /\?/, bM = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bN = /^(?:select|textarea)/i, bO = /\s+/,
        bP = /([?&])_=[^&]*/, bQ = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, bR = f.fn.load, bS = {}, bT = {},
        bU, bV, bW = ["*/"] + ["*"];
    try {
        bU = e.href
    } catch (bX) {
        bU = c.createElement("a"), bU.href = "", bU = bU.href
    }
    bV = bQ.exec(bU.toLowerCase()) || [], f.fn.extend({
        load: function (a, c, d) {
            if (typeof a != "string" && bR) return bR.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
            var i = this;
            f.ajax({
                url: a, type: h, dataType: "html", data: c, complete: function (a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function (a) {
                        c = a
                    }), i.html(g ? f("<div>").append(c.replace(bM, "")).find(g) : c)), d && i.each(d, [c, b, a])
                }
            });
            return this
        }, serialize: function () {
            return f.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                return this.elements ? f.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || bN.test(this.nodeName) || bH.test(this.type))
            }).map(function (a, b) {
                var c = f(this).val();
                return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
                    return {name: b.name, value: a.replace(bE, "\r\n")}
                }) : {name: b.name, value: c.replace(bE, "\r\n")}
            }).get()
        }
    }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        f.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), f.each(["get", "post"], function (a, c) {
        f[c] = function (a, d, e, g) {
            f.isFunction(d) && (g = g || e, e = d, d = b);
            return f.ajax({type: c, url: a, data: d, success: e, dataType: g})
        }
    }), f.extend({
        getScript: function (a, c) {
            return f.get(a, b, c, "script")
        },
        getJSON: function (a, b, c) {
            return f.get(a, b, c, "json")
        },
        ajaxSetup: function (a, b) {
            b ? b$(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b$(a, b);
            return a
        },
        ajaxSettings: {
            url: bU,
            isLocal: bI.test(bV[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": bW
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText"},
            converters: {"* text": a.String, "text html": !0, "text json": f.parseJSON, "text xml": f.parseXML},
            flatOptions: {context: !0, url: !0}
        },
        ajaxPrefilter: bY(bS),
        ajaxTransport: bY(bT),
        ajax: function (a, c) {
            function w(a, c, l, m) {
                if (s !== 2) {
                    s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                    var o, r, u, w = c, x = l ? ca(d, v, l) : b, y, z;
                    if (a >= 200 && a < 300 || a === 304) {
                        if (d.ifModified) {
                            if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
                            if (z = v.getResponseHeader("Etag")) f.etag[k] = z
                        }
                        if (a === 304) w = "notmodified", o = !0; else try {
                            r = cb(d, x), w = "success", o = !0
                        } catch (A) {
                            w = "parsererror", u = A
                        }
                    } else {
                        u = w;
                        if (!w || a) w = "error", a < 0 && (a = 0)
                    }
                    v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
                }
            }

            typeof a == "object" && (c = a, a = b), c = c || {};
            var d = f.ajaxSetup({}, c), e = d.context || d,
                g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(),
                i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u,
                v = {
                    readyState: 0, setRequestHeader: function (a, b) {
                        if (!s) {
                            var c = a.toLowerCase();
                            a = m[c] = m[c] || a, l[a] = b
                        }
                        return this
                    }, getAllResponseHeaders: function () {
                        return s === 2 ? n : null
                    }, getResponseHeader: function (a) {
                        var c;
                        if (s === 2) {
                            if (!o) {
                                o = {};
                                while (c = bG.exec(n)) o[c[1].toLowerCase()] = c[2]
                            }
                            c = o[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    }, overrideMimeType: function (a) {
                        s || (d.mimeType = a);
                        return this
                    }, abort: function (a) {
                        a = a || "abort", p && p.abort(a), w(0, a);
                        return this
                    }
                };
            h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
                if (a) {
                    var b;
                    if (s < 2)
                        for (b in a) j[b] = [j[b], a[b]]; else b = a[v.status], v.then(b, b)
                }
                return this
            }, d.url = ((a || d.url) + "").replace(bF, "").replace(bK, bV[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bO), d.crossDomain == null && (r = bQ.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bV[1] && r[2] == bV[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bV[3] || (bV[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), bZ(bS, d, c, v);
            if (s === 2) return !1;
            t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bJ.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
            if (!d.hasContent) {
                d.data && (d.url += (bL.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
                if (d.cache === !1) {
                    var x = f.now(), y = d.url.replace(bP, "$1_=" + x);
                    d.url = y + (y === d.url ? (bL.test(d.url) ? "&" : "?") + "_=" + x : "")
                }
            }
            (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] +
                (d.dataTypes[0] !== "*" ? ", " + bW + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
            if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
                v.abort();
                return !1
            }
            for (u in{success: 1, error: 1, complete: 1}) v[u](d[u]);
            p = bZ(bT, d, c, v);
            if (!p) w(-1, "No Transport"); else {
                v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
                    v.abort("timeout")
                }, d.timeout));
                try {
                    s = 1, p.send(l, w)
                } catch (z) {
                    if (s < 2) w(-1, z); else throw z
                }
            }
            return v
        },
        param: function (a, c) {
            var d = [], e = function (a, b) {
                b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
            c === b && (c = f.ajaxSettings.traditional);
            if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function () {
                e(this.name, this.value)
            }); else
                for (var g in a) b_(g, a[g], c, e);
            return d.join("&").replace(bC, "+")
        }
    }), f.extend({active: 0, lastModified: {}, etag: {}});
    var cc = f.now(), cd = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            return f.expando + "_" + cc++
        }
    }), f.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e = typeof b.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (cd.test(b.url) || e && cd.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h],
                j = b.url, k = b.data, l = "$1" + h + "$2";
            b.jsonp !== !1 && (j = j.replace(cd, l), b.url === j && (e && (k = k.replace(cd, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
                g = [a]
            }, d.always(function () {
                a[h] = i, g && f.isFunction(i) && a[h](g[0])
            }), b.converters["script json"] = function () {
                g || f.error(h + " was not called");
                return g[0]
            }, b.dataTypes[0] = "json";
            return "script"
        }
    }), f.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /javascript|ecmascript/},
        converters: {
            "text script": function (a) {
                f.globalEval(a);
                return a
            }
        }
    }), f.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), f.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function (f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
                        if (c || !d.readyState || /loaded|complete/.test(d.readyState))
                            d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                    }, e.insertBefore(d, e.firstChild)
                }, abort: function () {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var ce = a.ActiveXObject ? function () {
        for (var a in cg) cg[a](0, 1)
    } : !1, cf = 0, cg;
    f.ajaxSettings.xhr = a.ActiveXObject ? function () {
        return !this.isLocal && ch() || ci()
    } : ch, function (a) {
        f.extend(f.support, {ajax: !!a, cors: !!a && "withCredentials" in a})
    }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return {
                send: function (e, g) {
                    var h = c.xhr(), i, j;
                    c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                    if (c.xhrFields)
                        for (j in c.xhrFields) h[j] = c.xhrFields[j];
                    c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (j in e) h.setRequestHeader(j, e[j])
                    } catch (k) {
                    }
                    h.send(c.hasContent && c.data || null), d = function (a, e) {
                        var j, k, l, m, n;
                        try {
                            if (d && (e || h.readyState === 4)) {
                                d = b, i && (h.onreadystatechange = f.noop, ce && delete cg[i]);
                                if (e) h.readyState !== 4 && h.abort(); else {
                                    j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n);
                                    try {
                                        m.text = h.responseText
                                    } catch (a) {
                                    }
                                    try {
                                        k = h.statusText
                                    } catch (o) {
                                        k = ""
                                    }
                                    !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                                }
                            }
                        } catch (p) {
                            e || g(-1, p)
                        }
                        m && g(j, k, m, l)
                    }, !c.async || h.readyState === 4 ? d() : (i = ++cf, ce && (cg || (cg = {}, f(a).unload(ce)), cg[i] = d), h.onreadystatechange = d)
                }, abort: function () {
                    d && d(0, 1)
                }
            }
        }
    });
    var cj = {}, ck, cl, cm = /^(?:toggle|show|hide)$/, cn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, co,
        cp = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]],
        cq;
    f.fn.extend({
        show: function (a, b, c) {
            var d, e;
            if (a || a === 0) return this.animate(ct("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), (e === "" && f.css(d, "display") === "none" || !f.contains(d.ownerDocument.documentElement, d)) && f._data(d, "olddisplay", cu(d.nodeName)));
            for (g = 0; g < h; g++) {
                d = this[g];
                if (d.style) {
                    e = d.style.display;
                    if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || ""
                }
            }
            return this
        }, hide: function (a, b, c) {
            if (a || a === 0) return this.animate(ct("hide", 3), a, b, c);
            var d, e, g = 0, h = this.length;
            for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
            for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
            return this
        }, _toggle: f.fn.toggle, toggle: function (a, b, c) {
            var d = typeof a == "boolean";
            f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]()
            }) : this.animate(ct("toggle", 3), a, b, c);
            return this
        }, fadeTo: function (a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
        }, animate: function (a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m,
                    n, o, p, q;
                b.animatedProperties = {};
                for (i in a) {
                    g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]);
                    if ((k = f.cssHooks[g]) && "expand" in k) {
                        l = k.expand(a[g]), delete a[g];
                        for (i in l) i in a || (a[i] = l[i])
                    }
                }
                for (g in a) {
                    h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
                    c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cu(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a) j = new f.fx(this, b, i), h = a[i], cm.test(h) ? (q = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), q ? (f._data(this, "toggle" + i, q === "show" ? "hide" : "show"), j[q]()) : j[h]()) : (m = cn.exec(h), n = j.cur(), m ? (o = parseFloat(m[2]), p = m[3] || (f.cssNumber[i] ? "" : "px"), p !== "px" && (f.style(this, i, (o || 1) + p), n = (o || 1) / j.cur() * n, f.style(this, i, n + p)), m[1] && (o = (m[1] === "-=" ? -1 : 1) * o + n), j.custom(n, o, p)) : j.custom(n, h, ""));
                return !0
            }

            var e = f.speed(b, c, d);
            if (f.isEmptyObject(a)) return this.each(e.complete, [!1]);
            a = f.extend({}, a);
            return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
        }, stop: function (a, c, d) {
            typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
            return this.each(function () {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0), e.stop(d)
                }

                var b, c = !1, e = f.timers, g = f._data(this);
                d || f._unmark(!0, this);
                if (a == null)
                    for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b); else g[b = a + ".run"] && g[b].stop && h(this, g, b);
                for (b = e.length; b--;) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
                (!d || !c) && f.dequeue(this, a)
            })
        }
    }), f.each({
        slideDown: ct("show", 1),
        slideUp: ct("hide", 1),
        slideToggle: ct("toggle", 1),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (a, b) {
        f.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), f.extend({
        speed: function (a, b, c) {
            var d = a && typeof a == "object" ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
            if (d.queue == null || d.queue === !0) d.queue = "fx";
            d.old = d.complete, d.complete = function (a) {
                f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
            };
            return d
        }, easing: {
            linear: function (a) {
                return a
            }, swing: function (a) {
                return -Math.cos(a * Math.PI) / 2 + .5
            }
        }, timers: [], fx: function (a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
        }
    }), f.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
        }, cur: function () {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
            var a, b = f.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
        }, custom: function (a, c, d) {
            function h(a) {
                return e.step(a)
            }

            var e = this, g = f.fx;
            this.startTime = cq || cr(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
                f._data(e.elem, "fxshow" + e.prop) === b && (e.options.hide ? f._data(e.elem, "fxshow" + e.prop, e.start) : e.options.show && f._data(e.elem, "fxshow" + e.prop, e.end))
            }, h() && f.timers.push(h) && !co && (co = setInterval(g.tick, g.interval))
        }, show: function () {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
        }, hide: function () {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        }, step: function (a) {
            var b, c, d, e = cq || cr(), g = !0, h = this.elem, i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
                if (g) {
                    i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
                        h.style["overflow" + b] = i.overflow[a]
                    }), i.hide && f(h).hide();
                    if (i.hide || i.show)
                        for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h))
                }
                return !1
            }
            i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
            return !0
        }
    }, f.extend(f.fx, {
        tick: function () {
            var a, b = f.timers, c = 0;
            for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || f.fx.stop()
        }, interval: 13, stop: function () {
            clearInterval(co), co = null
        }, speeds: {slow: 600, fast: 200, _default: 400}, step: {
            opacity: function (a) {
                f.style(a.elem, "opacity", a.now)
            }, _default: function (a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), f.each(cp.concat.apply([], cp), function (a, b) {
        b.indexOf("margin") && (f.fx.step[b] = function (a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit)
        })
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
        return f.grep(f.timers, function (b) {
            return a === b.elem
        }).length
    });
    var cv, cw = /^t(?:able|d|h)$/i, cx = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? cv = function (a, b, c, d) {
        try {
            d = a.getBoundingClientRect()
        } catch (e) {
        }
        if (!d || !f.contains(c, a)) return d ? {top: d.top, left: d.left} : {top: 0, left: 0};
        var g = b.body, h = cy(b), i = c.clientTop || g.clientTop || 0, j = c.clientLeft || g.clientLeft || 0,
            k = h.pageYOffset || f.support.boxModel && c.scrollTop || g.scrollTop,
            l = h.pageXOffset || f.support.boxModel && c.scrollLeft || g.scrollLeft, m = d.top + k - i,
            n = d.left + l - j;
        return {top: m, left: n}
    } : cv = function (a, b, c) {
        var d, e = a.offsetParent, g = a, h = b.body, i = b.defaultView,
            j = i ? i.getComputedStyle(a, null) : a.currentStyle, k = a.offsetTop, l = a.offsetLeft;
        while ((a = a.parentNode) && a !== h && a !== c) {
            if (f.support.fixedPosition && j.position === "fixed") break;
            d = i ? i.getComputedStyle(a, null) : a.currentStyle, k -= a.scrollTop, l -= a.scrollLeft, a === e && (k += a.offsetTop, l += a.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(a.nodeName)) && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), g = e, e = a.offsetParent), f.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), j = d
        }
        if (j.position === "relative" || j.position === "static") k += h.offsetTop, l += h.offsetLeft;
        f.support.fixedPosition && j.position === "fixed" && (k += Math.max(c.scrollTop, h.scrollTop), l += Math.max(c.scrollLeft, h.scrollLeft));
        return {top: k, left: l}
    }, f.fn.offset = function (a) {
        if (arguments.length) return a === b ? this : this.each(function (b) {
            f.offset.setOffset(this, a, b)
        });
        var c = this[0], d = c && c.ownerDocument;
        if (!d) return null;
        if (c === d.body) return f.offset.bodyOffset(c);
        return cv(c, d, d.documentElement)
    }, f.offset = {
        bodyOffset: function (a) {
            var b = a.offsetTop, c = a.offsetLeft;
            f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
            return {top: b, left: c}
        }, setOffset: function (a, b, c) {
            var d = f.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"),
                j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1, k = {}, l = {}, m, n;
            j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
        }
    }, f.fn.extend({
        position: function () {
            if (!this[0]) return null;
            var a = this[0], b = this.offsetParent(), c = this.offset(),
                d = cx.test(b[0].nodeName) ? {top: 0, left: 0} : b.offset();
            c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
            return {top: c.top - d.top, left: c.left - d.left}
        }, offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent || c.body;
                while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
                return a
            })
        }
    }), f.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, c) {
        var d = /Y/.test(c);
        f.fn[a] = function (e) {
            return f.access(this, function (a, e, g) {
                var h = cy(a);
                if (g === b) return h ? c in h ? h[c] : f.support.boxModel && h.document.documentElement[e] || h.document.body[e] : a[e];
                h ? h.scrollTo(d ? f(h).scrollLeft() : g, d ? g : f(h).scrollTop()) : a[e] = g
            }, a, e, arguments.length, null)
        }
    }), f.each({Height: "height", Width: "width"}, function (a, c) {
        var d = "client" + a, e = "scroll" + a, g = "offset" + a;
        f.fn["inner" + a] = function () {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, c, "padding")) : this[c]
            () : null
        }, f.fn["outer" + a] = function (a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, c, a ? "margin" : "border")) : this[c]() : null
        }, f.fn[c] = function (a) {
            return f.access(this, function (a, c, h) {
                var i, j, k, l;
                if (f.isWindow(a)) {
                    i = a.document, j = i.documentElement[d];
                    return f.support.boxModel && j || i.body && i.body[d] || j
                }
                if (a.nodeType === 9) {
                    i = a.documentElement;
                    if (i[d] >= i[e]) return i[d];
                    return Math.max(a.body[e], i[e], a.body[g], i[g])
                }
                if (h === b) {
                    k = f.css(a, c), l = parseFloat(k);
                    return f.isNumeric(l) ? l : k
                }
                f(a).css(c, h)
            }, c, a, arguments.length, null)
        }
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return f
    })
})(window);
try {
    false && (window.onerror = function (errorMessage, scriptUrl, lineNumber) {
        if (!window.errorList || !$.isArray(window.errorList)) {
            window.errorList = [];
        }
        var brow = $.browser;
        var browserInfo = "";
        if (brow.msie) {
            browserInfo = "Microsoft Internet Explorer," + brow.version;
        }
        if (brow.mozilla) {
            browserInfo = "Mozilla Firefox," + brow.version;
        }
        if (brow.safari && navigator.userAgent.toLowerCase().match(/chrome/) != null) {
            var agent = navigator.userAgent.toLowerCase();
            var regStr_chrome = /chrome\/[\d.]+/gi;
            var browser = agent.match(regStr_chrome);
            var verinfo = (browser + "").replace(/[^0-9.]/ig, "");
            browserInfo = "Google Chrome," + verinfo;
        }
        if (brow.safari && navigator.userAgent.toLowerCase().match(/chrome/) == null) {
            browserInfo = "Apple Safari," + brow.version;
        }
        if (brow.opera) {
            browserInfo = "Opera," + brow.version;
        }
        var data = {
            errorMessage: errorMessage,
            scriptUrl: scriptUrl,
            lineNumber: lineNumber,
            browserInfo: browserInfo,
            pageUrl: location.href
        };
        var postFlag = true;
        if (window.errorList.length) {
            $.each(window.errorList, function (i, item) {
                if (item.errorMessage == data.errorMessage && item.scriptUrl == data.scriptUrl && item.lineNumber == data.lineNumber && item.browserInfo == data.browserInfo) {
                    postFlag = false;
                    return false;
                }
            });
        }
        if (location.href.split("#")[1] && location.href.split("#")[1].match("testPage") || !postFlag) {
            return false;
        } else {
            window.errorList.push(data);
            $.ajax({
                type: 'post',
                url: "http://www.tuniu.com/common/service/jsError/",
                data: data,
                success: function (data) {
                },
                error: function (XMLHttpRequest, errMsg, errorThrown) {
                    window.console && console.error("错误收集系统接受失败", errMsg +
                        errorThrown);
                }
            });
            return false;
        }
    })
} catch (e) {
    throw e;
}
;
;require(["jquery", "base64", "jquery.autocomplete"], function ($, base64) {
    var PROTOCOL = window.location.protocol || 'http:';

    function showHeadChat(data) {
        $('.site_contact').prepend('<a class="headTuniuKefu" href="javascript:;" onclick="javascript:window.open(\'' +
            data.url + '\', \'' +
            data.label + '\', \'' +
            data.winConfig + '\');">' + '<img src="//ssl1.tuniucdn.com/img/20160919/header/head_tel.png" /><span>欢迎使用<i>在线客服</i></span>' + '</a>');
    }

    if (window.showHeadTuniuChat && typeof window.showHeadTuniuChat == 'object') {
        showHeadChat(window.showHeadTuniuChat);
    }

    function addSearchCookie(q, link) {
        var host = window.location.host;
        var hostList = host.split(".");
        hostList.splice(0, 1, '//s');
        var mainUrl = hostList.join(".");
        var url = mainUrl + "/tn?r=api/p/ajaxAddCookie&type=add_cookie&query=" + encodeURI(q) + '&link=' + encodeURI(link)
            + "&format=json&callback=?";
        $.getJSON(url);
    }

    window.showHeadTuniuChat = showHeadChat;
    window.addSearchCookie = addSearchCookie;
    var page = {
        _fnSearchSub: null, init: function () {
            this.initHighLightTab();
            this.initHeaderTop();
            this.initSearchBox();
            this.initHeaderStartCity();
            this.initScreenSize();
            this.initMainNavigator();
            this.initSearchV2();
            this.initLocation();
            this.initSearchInput();
            this.initSuggestion();
            this.initPagePhone();
        }, getHeaderJSONP: function () {
            $(document).ready(function () {
                var catLoaded = false;
                $(document).mousemove(function () {
                    if (!catLoaded) {
                        var getCookie = function (objName) {
                            var arrStr = document.cookie.split("; ");
                            for (var i = 0; i < arrStr.length; i++) {
                                var temp = arrStr[i].split("=");
                                if (temp[0] == objName) return unescape(temp[1]);
                            }
                            return false;
                        };
                        catLoaded = true;
                        var cityCode = '';
                        cityCode = getCookie("tuniuuser_citycode");
                        cityCode = base64.decode(cityCode.toString());
                        $.getScript("//www.tuniu.com/headermenu/" + cityCode);
                    }
                });
            });
        }, initHighLightTab: function () {
            var tabId = $("[name='tabId']").val();
            $("[name='nav-tab']").filter(function (index, item) {
                return $(item).attr("data-tab") == tabId;
            }).addClass("selected");
        }, initHeaderTop: function () {
            var utility = {
                isIELte: function (version) {
                    if (!$.browser.msie) {
                        return false;
                    }
                    return parseInt($.browser.version) <= version;
                }
            };
            var indexTopNav = {
                init: function () {
                    $(".index_top_nav .item_siteMap").hover(this.onSiteMapHover)
                    $(".index_top_nav .has_dropdown").hover(this.onNavItemHoverIn, this.onNavItemHOverOut);
                    $(".index_top_nav .item_weixin, .index_top_nav .item_weibo").hover(function () {
                        $(this).find(".header_icon").toggleClass("hover");
                    });
                    $(".index_top_nav .item_qrCode").hover(function () {
                        $(this).find(".header_icon").toggleClass("active");
                    });
                }, onSiteMapHover: function (e) {
                    var offsetLeft = $(this).offset().left - $(".header_top .header_inner").offset().left + 1;
                    $(this).find(".siteMap_panel").css("left", 0 - offsetLeft + "px");
                }, onNavItemHoverIn: function (e) {
                    $(this).addClass("item_hover");
                    if (utility.isIELte(8)) {
                        $(this).find(".icon_arrow").addClass("icon_arrow_rotate");
                    }
                }, onNavItemHOverOut: function (e) {
                    $(this).removeClass("item_hover");
                    if (utility.isIELte(8)) {
                        $(this).find(".icon_arrow").removeClass("icon_arrow_rotate");
                    }
                }
            };
            indexTopNav.init();
        }, initMainNavigator: function () {
            function showSubNav(item) {
                if (!$(item).hasClass("hasSubNav")) {
                    return;
                }
                $(item).addClass('cui_nav_o');
                var ThisL = $(item).offset().left, ThisW = $(item).width(), thisW = ThisW / 2, winW = $('body').width(),
                    menuW = $('ul.menu_list').width(), menuL = $('ul.menu_list').offset().left, liLeft = ThisL - menuL,
                    subNavW = $(item).find('.top_sub_nav').width(), subNavWban = subNavW / 2,
                    navL = liLeft - subNavWban + thisW;
                $("#subnav_wrap_bg").show();
                $(item).find('.top_subnav_wrap').css({'width': menuW, 'left': 0});
                if (navL < 0) {
                    navL = 0;
                    $(item).find('.top_sub_nav').css('left', 0);
                } else {
                    if (navL + subNavW > menuW) {
                        $(item).find('.top_sub_nav').css('right', 0);
                    } else {
                        $(item).find('.top_sub_nav').css('left', navL);
                    }
                }
                $(item).find('.icon_arrowUp').css('left', liLeft + thisW - 5);
            }

            function closeSubNav(item) {
                if (!$(item).hasClass("hasSubNav")) {
                    return;
                }
                $("#subnav_wrap_bg").hide();
                $(item).removeClass('cui_nav_o');
                $(item).find('.top_sub_nav')[0].style.left = null;
                $(item).find('.top_sub_nav')[0].style.right = null;
            }

            $(".index_nav_menu .menu_list>li").hover(function () {
                var self = this;
                var closeTimer = $(this).data("closeTimer");
                if (closeTimer) {
                    clearTimeout(closeTimer);
                    $(this).data("closeTimer", null);
                }
                var showTimer = $(this).data("showTimer");
                showTimer = setTimeout(function () {
                    showSubNav($(self));
                    $(self).data("showTimer", null);
                }, 100);
                $(this).data("showTimer", showTimer);
            }, function () {
                var self = this;
                var showTimer = $(this).data("showTimer");
                if (showTimer) {
                    clearTimeout(showTimer);
                    $(this).data("showTimer", null);
                }
                var closeTimer = $(this).data("closeTimer");
                closeTimer = setTimeout(function () {
                    closeSubNav($(self));
                    $(self).data("closeTimer", null);
                }, 100);
                $(this).data("closeTimer", closeTimer);
            });
        }, initSearchBox: function () {
            var searchBox = {
                init: function () {
                    $("#keyword-input").focus(this.onInputFocus);
                    $("#keyword-input").blur(this.onInputBlur);
                    this.initAutoComplete();
                }, onInputFocus: function () {
                    $(this).parents(".tn_search_box").find(".search_hot").hide();
                }, onInputBlur: function () {
                    if ($(this).val() == "") {
                        $(this).parents(".tn_search_box").find(".search_hot").show();
                    }
                }, initAutoComplete: function () {
                    var autocomplete_options, autocomplete_a;
                    var host = window.location.host;
                    var hostList = host.split(".");
                    var ishttps = 'https:' == document.location.protocol ? true : false;
                    if (ishttps) {
                        hostList.splice(0, 1, '//i');
                    } else {
                        hostList.splice(0, 1, '//s');
                    }
                    var base_url = hostList.join(".");
                    var complex = $("#from_action").val();
                    $('#keyword-input').change(function () {
                        $('#st').val(1);
                    });
                    autocomplete_options = {
                        serviceUrl: PROTOCOL + '//www.tuniu.com/tn?r=api/p/searchSugguestV2',
                        degreeUrl: PROTOCOL + '//www.tuniu.com/tn?r=api/p/searchSugguestRightV2',
                        onSelect: autocomplete_onselect,
                        isOuter: true
                    };
                    var autocomplete_a = $('#keyword-input').autocomplete(autocomplete_options);

                    function autocomplete_onselect(i) {
                        var autocomplete = $(".autocomplete-w1").find(".resultbox");
                        var autocomplete_href = autocomplete.eq(i).find("a").attr("href");
                        window.open(autocomplete_href, "_self");
                    }

                    $("#keyword-input").keyup(function () {
                        if ($(this).val() != '') {
                            $("#q").val($(this).val());
                        }
                    });
                }, initHotSuggestion: function () {
                }
            };
            searchBox.init();
        }, initHeaderStartCity: function () {
            var startCitySearch = {
                init: function () {
                    var i = this;
                    i.patternUrl = $('#tagContent .line_right a').eq(0).attr('href') || '';
                    i.bind();
                    i.cityTabClick();
                    i.searchCity();
                    i.rendRresetSearchInput();
                }, bind: function () {
                    var obj = $('#startCity');
                    var sc_name = $('#startCity .sc_name');
                    var serBox = obj.find('.show_city');
                    var tagBox = obj.find('.tagBox');
                    var input = $("#startCityKeyword");
                    var result = $("#stationSearchResult");
                    var tip = obj.find('.station_search_box p');
                    var _this = this;
                    obj.one('mouseenter', function () {
                        var $textarea = serBox.find('textarea.storedata');
                        if ($textarea[0]) {
                            tagBox.html($textarea.text());
                        }
                    }).mouseenter(function () {
                        this.className = "head_start_city change_tab";
                    }).mouseleave(function () {
                        this.className = "head_start_city";
                        input.val('');
                        input.blur();
                        result.hide();
                    });
                    input.focus(function () {
                        $(this).parent().addClass("on");
                        var a = $(this).val();
                        if (a == '') {
                            tip.hide();
                        }
                    });
                    input.blur(function () {
                        $(this).parent().removeClass("on");
                        var a = $(this).val();
                        if (a == '') {
                            tip.show();
                        } else {
                            tip.hide();
                        }
                    });
                }, rendRresetSearchInput: function () {
                    $("#startCityKeyword").val('');
                    $("#stationSearchResult").hide();
                }, stopEvent: function (event) {
                    var e = event || window.event;
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    } else {
                        e.cancelBubble = true;
                    }
                }, cityTabClick: function () {
                    $('.show_city').on('click', '.station_titlist li', function () {
                        var _this = $(this);
                        var index = _this.index();
                        _this.addClass('selectTag').siblings().removeClass('selectTag');
                        $('#tagContent .tagContent').hide().eq(index).show();
                    })
                }, searchCity: function () {
                    var _this = this;
                    var currentValue = '';
                    var defauleValue = '';
                    var request = null;
                    var tip = $("#startCity .s_text");
                    var debounce = function (idle, action) {
                        var last;
                        return function () {
                            var ctx = this, args = arguments;
                            clearTimeout(last);
                            last = setTimeout(function () {
                                action.apply(ctx, args);
                            }, idle);
                        };
                    };
                    var ieInputHandler = debounce(300, function (event) {
                        var keyCode = event.keyCode;
                        if ($.browser.msie && ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 105) || keyCode == 46 || keyCode == 8 || keyCode == 13 || keyCode == 32)) {
                            tip.hide();
                            var currentValue = lTrim($("#startCityKeyword").val());
                            if (currentValue !== defauleValue) {
                                if ($("#stationSearchResult .no_result").is(":visible") && (currentValue.length > defauleValue.length)) {
                                    return;
                                }
                                defauleValue = currentValue;
                                ajaxCity(currentValue);
                            }
                        }
                    });
                    var standardInputHandler = debounce(300, function () {
                        tip.hide();
                        var currentValue = $("#startCityKeyword").val().replace(/\s+/g, "");
                        if (currentValue !== defauleValue) {
                            if ($("#stationSearchResult .no_result").is(":visible") && (currentValue.length > defauleValue.length)) {
                                return;
                            }
                            defauleValue = currentValue;
                            ajaxCity(currentValue);
                        }
                    });
                    if ($.browser.msie) {
                        $("#startCityKeyword").keyup(function (event) {
                            ieInputHandler(event);
                        });
                    }
                    else {
                        $("#startCityKeyword").bind('input', function () {
                            standardInputHandler();
                        });
                    }

                    function lTrim(str) {
                        if (str.charAt(0) == " ") {
                            str = str.slice(1);
                            str = lTrim(str);
                        }
                        return str;
                    }

                    function ajaxCity(i) {
                        var input = $("#startCityKeyword");
                        var result = $("#stationSearchResult");
                        if (request != null) {
                            request.abort();
                            if (i == "") {
                                result.html('');
                                return;
                            }
                        }
                        request = $.ajax({
                            url: "//www.tuniu.com/tn?r=api/p/CityQueryAjax",
                            type: 'GET',
                            dataType: "jsonp",
                            jsonp: "jsoncallback",
                            data: {
                                'query': i,
                                'path': window.location ? encodeURIComponent(location.protocol + '//' + location.host + location.pathname) : "",
                                'url': $('#tagContent .line_right a').eq(0).attr('href') || ''
                            },
                            success: function (json) {
                                if (json.data.cities == null) {
                                    result.html('<p class="no_result">对不起，暂时没有找到结果</p>');
                                    result.show();
                                } else {
                                    var jsonList = json.data.cities;
                                    result.html('');
                                    for (var i = 0; i < jsonList.length; i++) {
                                        result.append('<a href="' + jsonList[i].url + '">' + jsonList[i].cityName + '</a>');
                                        result.show();
                                        if (i == 4) {
                                            break;
                                        }
                                    }
                                }
                            },
                            error: function () {
                            }
                        });
                    }
                }
            };
            startCitySearch.init();
        }, initScreenSize: function () {
            var userScreenSize = {
                resizeScreen: function () {
                    var index1200 = $("body");
                    if (!userScreenSize.isBigThan1240()) {
                        index1200.removeClass("index1200").addClass("index1000");
                        userScreenSize.floatna1000();
                    } else {
                        index1200.removeClass("index1000").addClass("index1200");
                        userScreenSize.floatna1200();
                    }
                    $(window).resize(function () {
                        if (!userScreenSize.isBigThan1240()) {
                            if (!index1200.hasClass("index1000")) {
                                index1200.removeClass("index1200").addClass("index1000");
                                userScreenSize.floatna1000();
                            }
                        } else {
                            if (!index1200.hasClass("index1200")) {
                                index1200.removeClass("index1000").addClass("index1200");
                                userScreenSize.floatna1200();
                            }
                        }
                    });
                }, isBigThan1240: function () {
                    var w_wd = $(window).width();
                    if (w_wd >= 1240) {
                        return true;
                    } else {
                        return false;
                    }
                }, floatna1000: function () {
                    if ($('#floatnav').length > 0) {
                        $('#floatnav').floatnav('leftToBody', 35).floatnav('criticalWidth', 1000);
                    }
                }, floatna1200: function () {
                    if ($('#floatnav').length > 0) {
                        $('#floatnav').floatnav('leftToBody', 50).floatnav('criticalWidth', 1200);
                    }
                }
            };
            userScreenSize.resizeScreen();
        }, initSearchV2: function () {
            var search_input = window.search_input = search_input || {
                init: function () {
                    var _self = this;
                    var s_input = $(".tn_s_input");
                    var s_popbox = $("#searchInputBox");
                    var search_box = $(".search_box");
                    search_box.each(function (i, n) {
                        _self.showMoreCondition($(n));
                    });
                    this.seniorSearch();
                    this.filterCont();
                    this.showMTTwoLines();
                    this.txt_focus();
                }, creatPopbox: function () {
                }, showPopBox: function (t, s) {
                    var _self = this;
                    var tnSearchBox = $("#tnSearchBox");
                    var search_pop_box = $(".search_pop_box");
                    var tnSearchBoxhg = tnSearchBox.height();
                    var updatePosition = function () {
                        var _offset = tnSearchBox.offset();
                        var tnSearchBoxBtom = _offset.top;
                        var tnSearchBoxLeft = _offset.left;
                        s.css({"top": tnSearchBoxBtom + tnSearchBoxhg, "left": tnSearchBoxLeft});
                    }
                    if (tnSearchBox.length) {
                        tnSearchBox.find("input").click(function (e) {
                            $("#searchAdvBox").hide();
                            if ($.trim($("#keyword-input").val()) == '') {
                                updatePosition();
                                s.show();
                            }
                            _self.stopEvent(e);
                        });
                        $(window).resize(function () {
                            if (s.is(":visible")) {
                                updatePosition();
                            }
                        })
                        t.keyup(function () {
                            if ($.trim($("#keyword-input").val()) == '') {
                                s.show();
                            } else {
                                s.hide();
                            }
                        });
                        s.find(".closeThisBox").click(function () {
                            s.hide();
                        });
                        s.click(function (e) {
                            try {
                                e = e || window.event;
                                var tar = e ? e.target : e.srcElement;
                                var m;
                                while (tar.parentNode) {
                                    if (tar.nodeName == "BODY" || tar.nodeName == "HTML") {
                                        break;
                                    }
                                    if (m = tar.getAttribute("m")) {
                                        window.eventTrack && window.eventTrack.push({
                                            text: m,
                                            x: e.clientX,
                                            y: e.clientY
                                        });
                                    }
                                    tar = tar.parentNode;
                                }
                            } catch (e) {
                            }
                            _self.stopEvent(e);
                        });
                        $("body").click(function () {
                            s.hide();
                        });
                        $("#searchInputBox").mouseleave(function () {
                            s.hide();
                        });
                    }
                }, stopEvent: function (event) {
                    var e = event || window.event;
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    } else {
                        e.cancelBubble = true;
                    }
                }, showMoreCondition: function (t) {
                    var _state = true;
                    var __this = this;
                    var t_moreCondition = t.find(".moreCondition");
                    t.find(".showallbtn_s a").click(function () {
                        var t_this = $(this);
                        if (t_moreCondition.hasClass("hide")) {
                            t_moreCondition.slideDown(function () {
                                t_moreCondition.removeClass("hide").show();
                                if (_state) {
                                    __this.showMTTwoLines(t_moreCondition);
                                    _state = false;
                                }
                            });
                            t_this.html("收起更多 <em class='tn_fontface'>&#xe620;</em>");
                        } else {
                            t_moreCondition.slideUp(function () {
                                t_moreCondition.addClass("hide").hide();
                            });
                            t_this.html("更多条件（交通类型、住宿类型、组团特色、产品特色） <em class='tn_fontface'>&#xe61f;</em>");
                        }
                    });
                }, showMTTwoLines: function (t) {
                    var J_prop = t ? t.find(".search_adv_others") : $(".search_adv_others");
                    J_prop.each(function (i, n) {
                        if (parseInt($(n).css("height")) > 28) {
                            $(n).css("height", 28);
                            $(n).next(".search_adv_more").show().unbind("click").click(function () {
                                $(n).hasClass("isShowALl") ? $(n).removeClass("isShowALl").css("height", 28) : $(n).addClass("isShowALl").css("height", "auto");
                                $(n).hasClass("isShowALl") ? $(this).html("<span>收起<i class='tn_fontface'>&#xe620;</i></span>") : $(this).html("<span>更多<i class='tn_fontface'>&#xe61f;</i></span>");
                            });
                        }
                        else {
                            $(n).css("height", "auto");
                        }
                    });
                }, seniorSearch: function () {
                    var _self = this;
                    var _state = true;
                    var seniorSearch = $("#seniorSearch");
                    var search_pop_box = $(".search_pop_box");
                    var tnSearchBox = $("#tnSearchBox");
                    var tnSearchBoxhg = tnSearchBox.height();
                    var updatePositionAdv = function () {
                        var advOffset = tnSearchBox.offset();
                        var tnSearchBoxBtom = advOffset.top;
                        var tnSearchBoxLeft = advOffset.left;
                        search_pop_box.css({"top": tnSearchBoxBtom + tnSearchBoxhg - 2, "left": tnSearchBoxLeft});
                    }
                    seniorSearch.click(function () {
                        updatePositionAdv();
                        search_pop_box.toggle();
                        if (search_pop_box.css("display") === "block") {
                            $("#searchInputBox").hide();
                            $(".autocomplete").hide();
                        }
                        if (_state) {
                            _self.showMTTwoLines($("#searchAdvBox"));
                            _state = false;
                        }
                        return false;
                    });
                    $(window).resize(function () {
                        if (search_pop_box.is(":visible")) {
                            updatePositionAdv();
                        }
                    })
                    search_pop_box.find(".closeSenSearch").click(function (e) {
                        search_pop_box.hide();
                        _self.stopEvent(e);
                    });
                    search_pop_box.click(function (e) {
                        _self.stopEvent(e);
                    });
                    $("body").click(function () {
                        search_pop_box.hide();
                    });
                }, filterCont: function () {
                    var search_adv_others_a = $(".search_adv_others a");
                    var search_adv_buxian_a = $(".search_adv_buxian a");
                    search_adv_others_a.click(function () {
                        var $this = $(this);
                        $this.parent().prev().find("a").removeClass('checked');
                        if ($this.hasClass('checked')) {
                            $this.removeClass('checked');
                        } else {
                            if ($this.parent(".onlyShowOne").length) {
                                $this.siblings('.checked').removeClass('checked');
                            }
                            $this.addClass('checked');
                        }
                    });
                    search_adv_buxian_a && search_adv_buxian_a.click(function () {
                        var $this = $(this);
                        $this.addClass('checked');
                        $this.parent().next().find("a").removeClass('checked');
                    });
                }, filterDate: function () {
                    var _self = this;
                    var search_input_date_1 = $(".search_input_date");
                    var search_input_date_2 = $(".search_input_date_2");
                    search_input_date_1.TN_date({
                        wrap: $("body"), onSelect: function () {
                        }
                    });
                    search_input_date_2.TN_date({
                        wrap: $("body"), onSelect: function () {
                        }
                    });
                }, txt_focus: function () {
                    var $keyWord = $(".pkg_input .input_addr");
                    var a = $keyWord.val();
                    $keyWord.focus(function () {
                        if (this.value == a) {
                            this.value = "";
                            this.style.color = "#333"
                        }
                    });
                    $keyWord.blur(function () {
                        if (this.value == "") {
                            this.value = a;
                            this.style.color = "#aaa"
                        }
                    });
                }, clearSearchLens: function (thisObj) {
                    var cur = $(thisObj);
                    var _parents = cur.parents(".search_box").eq(0);
                    _parents.find(".search_adv_others a").removeClass("checked");
                    _parents.find(".search_adv_buxian a").addClass("checked");
                    _parents.find(".J_FilterCustomPrice input").val("");
                    _parents.find(".search_adv_properties input").val("");
                }
            }
            var newHotSearch = false;
            var searchAjax = window.searchAjax = searchAjax || {
                init: function () {
                    var _self = this;
                    _self.getAll();
                }, getCookie: function (name) {
                    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                    if (arr = document.cookie.match(reg))
                        return unescape(arr[2]); else
                        return null;
                }, getAll: function () {
                    var _self = this;
                    var url = '//s.tuniu.com/tn?r=api/p/getSearchwidget&type=all';
                    var _tact = searchAjax.getCookie('_tact') || '';
                    var tuniuuser = searchAjax.getCookie('tuniuuser') || '';
                    $.ajax({
                        url: url,
                        type: "get",
                        async: true,
                        dataType: "jsonp",
                        jsonp: "js_callback",
                        data: {'_tact': _tact, 'tuniuuser': tuniuuser},
                        success: function (json) {
                            searchAjax.cjAdvanceCallback(json);
                            search_input.init();
                            if (json.hot && json.hot.length > 0) {
                                newHotSearch = true;
                                searchAjax.cjHotCallback(json);
                                search_input.showPopBox($(".tn_s_input"), $("#searchInputBox"));
                                $("#searchInputBox").find("a").bind('click', function (e) {
                                    e.preventDefault();
                                    var link = $(this).attr('href');
                                    var keyword = $(this).text();
                                    if (link === undefined) {
                                        return;
                                    }
                                    addSearchCookie(keyword, link);
                                    setTimeout(setTimeout(function () {
                                        window.location.href = link;
                                    }, 700));
                                });
                            }
                        }
                    });
                }, getHot: function () {
                    var _self = this;
                    var url = '//s.tuniu.com/tn?r=api/p/getSearchwidget&all=hot';
                    $.ajax({
                        url: url,
                        type: "get",
                        async: true,
                        dataType: "jsonp",
                        jsonp: "js_callback",
                        success: function (json) {
                            newHotSearch = true;
                            searchAjax.cjHotCallback(json);
                            search_input.showPopBox($(".tn_s_input"), $("#searchInputBox"));
                        }
                    });
                }, cjAdvanceCallback: function (json) {
                    if (json) {
                        $("body").append(json.advance);
                    }
                }, cjHotCallback: function (hotObj) {
                    if (hotObj) {
                        $("body").append(hotObj.hot);
                    }
                }, cookieClear: function (element) {
                    var url = '//s.tuniu.com/tn?r=api/p/ajaxAddCookie';
                    $.ajax({
                        url: url,
                        type: "get",
                        async: true,
                        dataType: "jsonp",
                        jsonp: "jsoncallback",
                        success: function (json) {
                            $(element).parents('.sib_last_search').remove();
                        }
                    });
                }, advanceSearch: function (obj) {
                    var params = {};
                    $(obj).parents('div[box="searchBox"]').find("dl[filter-type]").each(function () {
                        var filterType = $(this).attr('filter-type');
                        switch (filterType) {
                            case'keyword':
                                var advanceFunc = function (inputStr) {
                                    if (inputStr === null || inputStr === undefined || inputStr === '' || inputStr === '请输入目的地、主题或关键词') {
                                        return false;
                                    } else {
                                        return true;
                                    }
                                };
                                var defKeyword = false;
                                var inputStr = advanceFunc($(this).find("input").val());
                                if (!(defKeyword && inputStr)) params['keywords'] = false;
                                if (inputStr) {
                                    params['keywords'] = $(this).find("input").val();
                                } else if (defKeyword) {
                                    params['keywords'] = $("#keyword-input").val();
                                }
                                ;
                                break;
                            case'planDate':
                                var startDate = $(this).find('input[name="start"]').val();
                                var endDate = $(this).find('input[name="end"]').val();
                                if (startDate != 'yyyy-mm-dd') params['startDate'] = startDate;
                                if (endDate != 'yyyy-mm-dd') params['endDate'] = endDate;
                                break;
                            case'price':
                                var min = $(this).find('input[name="min"]').val();
                                var max = $(this).find('input[name="max"]').val();
                                if (min != '') params['minPrice'] = min;
                                if (max != '') params['maxPrice'] = max;
                                break;
                            case'prdType':
                                var prdType = $(this).find('.checked').attr('filter-value');
                                if (prdType != '0') params['prdType'] = prdType;
                                break;
                            default:
                                var option = new Array();
                                var rel = true;
                                $(this).find("a[filter-value]").each(function () {
                                    if ($(this).attr("class") == 'checked') {
                                        var filterValue = $(this).attr('filter-value');
                                        if (filterValue == 0) {
                                            rel = false;
                                        } else {
                                            option.push(filterValue);
                                        }
                                    }
                                });
                                if (rel) params[filterType] = option;
                        }
                    });
                    if (params.keywords !== false) {
                        $.ajax({
                            type: 'get',
                            url: "//s.tuniu.com/tn?r=api/p/getUrlForHomePage",
                            data: {'data': params},
                            dataType: "jsonp",
                            jsonp: "js_callback",
                            success: function (data) {
                                window.location.href = data;
                            }
                        });
                    }
                    else {
                        alert('请输入目的地、主题或关键词');
                    }
                }
            };
            if (typeof $ != 'undefined') {
                $(function () {
                    searchAjax.init();
                });
            }
        }, initLocation: function () {
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
                        tuniuLevel = base64.decode(unescape(cookieName['tuniuuser_level']));
                        tuniuVip = base64.decode(unescape(cookieName['tuniuuser_vip']))
                    }
                    tuniuImg = cookieName['tuniuuser_image'];
                    if (tuniuImg == "" || tuniuImg == null) {
                        imgInfo = "//img3.tuniucdn.com/img/2014040901/user_center/g_touxiang.png"
                    } else {
                        var time = new Date().toLocaleTimeString();
                        tuniuImg = unescape(base64.decode(unescape(cookieName['tuniuuser_image'])));
                        var myUrl = parse_url(tuniuImg);
                        if (myUrl.protocol == "") {
                            imgInfo = "//images.tuniucdn.com/head" + tuniuImg + "?v=" + time
                        } else {
                            imgInfo = convertPicSize(tuniuImg, 90, 90)
                        }
                    }
                    if (tuniuVip == 1) {
                        login = login + '<li><span>您好，</span></li>' + compLoginInnerInfor(_nickname, imgInfo, -1)
                    } else {
                        login = login + '<li><span>您好，</span></li>' + compLoginInnerInfor(_nickname, imgInfo, tuniuLevel)
                    }
                    login = login + '<input type="hidden" value="' + imgInfo + '" id="user_top_img"><input type="hidden" value="' + tuniuVip + '" id="is_user_vip">'
                } else {
                    login += '<li><a onclick="tuniuRecorder.push(\'1_1_1_1_0_1\');" rel="nofollow" href="http://www.tuniu.com/u/login" target="_blank">登录</a>|</li>';
                    login += '<li><a onclick="tuniuRecorder.push(\'1_1_1_1_0_2\');" rel="nofollow" href="http://www.tuniu.com/u/register" target="_blank">注册</a></li>';
                    login += '<li><a onclick="tuniuRecorder.push(\'1_1_1_1_1_3\');" rel="nofollow" href="http://www.tuniu.com/szt/newmembergift/?recId=1&q=a5" target="_blank"><img src="http://img4.tuniucdn.com/img/2017020818/common/registgift.gif" alt="会员注册有礼" style="height: 22px;line-height: 22px; vertical-align: middle;" /></a></li>';
                }
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
                ;var comp_str = '<li id="vipnameBox" class="vipname_box"><a onclick="tuniuRecorder.push(\'1_1_1_1_1_1\');" href="http://www.tuniu.com/u" id="vipname" class="vipname" rel="nofollow"><span class="fl" style="float:left;">' + nick_name + '</span><span class="' + top_user_level + '"></span> <span class="poparrow"></span></a><div class="colle_box"><div class="colle_top clearfix"><div class="right"><a href="http://www.tuniu.com/u">账户管理</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.tuniu.com/u/logout">退出</a></div></div><div class="colle_bottom"><div class="touxiang"><a href="https://i.tuniu.com"><img src="' + img_info + '"></a></div><div class="fl"><div class="vip_stage mt_10"><a style="color:#f60; font-weight:bold; font-size:16px;" class="' + bot_user_level + '" href="http://www.tuniu.com/u/club"></a></div><div><a style="color:#404040; font-weight:bold; font-size:14px;" href="http://www.tuniu.com/u/club">查看我的会员特权</a></div></div></div></div></li>';
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
                    _nickname = base64.decode(_nickname).replace(/<\/?[^>]*>/g, '')
                } else if (islogin) {
                    window.location = "http://www.tuniu.com/u/login";
                } else {
                    _isGuest = false
                }
                if (!userInfo) {
                    var _vLoginUrl = document.createElement('A');
                    _vLoginUrl.innerHTML = '非会员查单';
                    _vLoginUrl.setAttribute('href', '//passport.tuniu.com/login/pcVLogin');
                    _vLoginUrl.setAttribute('target', '_blank');
                    _vLoginUrl.setAttribute('rel', 'nofollow');
                    document.getElementsByClassName('is_order')[0].childNodes[3].appendChild(_vLoginUrl);
                }
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
            var refreshLoginState = function () {
                var user_login_info = document.getElementById("user_login_info");
                if (user_login_info) {
                    var collebox = document.getElementById("vipnameBox");
                    var vipname = document.getElementById("vipname");
                    if (collebox) {
                        collebox.onmouseover = function () {
                            collebox.className = "vipname_box on";
                            vipname.className = "vipname float_tt";
                        }, collebox.onmouseout = function () {
                            collebox.className = "vipname_box";
                            vipname.className = "vipname float_tt";
                            vipname.className = "vipname";
                        }
                    }
                }
            }
            refreshLoginState();
        }, initSearchInput: function () {
            function getUrl() {
                var host = window.location.host;
                var hostList = host.split(".");
                hostList.splice(0, 1, '//s');
                var url = hostList.join(".");
                return url;
            }

            function isProduct(id) {
                return id >= 299500001 && id <= 320000000;
            }

            function search_sub() {
                var actionStr = "";
                var queryKey = document.getElementById("keyword-input").value;
                queryKey = lrTrim(queryKey);
                queryKey = queryKey.replace(/\'*/ig, '');
                isRouteId(queryKey, function (flag) {
                    if (isProduct(queryKey)) {
                        actionStr = "http://www.tuniu.com/product/" + queryKey;
                        window.location.href = actionStr;
                    } else if (flag === 1) {
                        actionStr = "http://www.tuniu.com/tour/" + queryKey;
                        window.location.href = actionStr;
                    } else if (flag === 2) {
                        actionStr = "http://www.tuniu.com/tour/" + queryKey;
                        window.location.href = actionStr;
                    } else {
                        getKeyLink(queryKey, function (flag) {
                            if (flag) {
                                actionStr = flag;
                                window.location.href = flag;
                            } else {
                                var type = "whole";
                                var classifyId = 0;
                                var type_array = getElementsByClassName("type_s", "route_search", "div");
                                var letter = document.getElementById("letter").value;
                                for (var i = 0; i < type_array.length; i++) {
                                    if (type_array[i].style.display == "none") {
                                        classifyId = parseInt(type_array[i].attributes["classify"].nodeValue);
                                    }
                                }
                                switch (classifyId) {
                                    case 1:
                                        type = "tours";
                                        break;
                                    case 2:
                                        type = "pkg";
                                        break;
                                    case 3:
                                        type = "hotel";
                                        break;
                                    case 5:
                                        type = "team";
                                        break;
                                    case 6:
                                        type = "ticket";
                                        break;
                                    case 8:
                                        type = "drive";
                                        break;
                                    case 12:
                                        type = "cruise";
                                        break;
                                    case 13:
                                        type = "around";
                                        break;
                                    case 17:
                                        type = "local";
                                        break;
                                    case 10:
                                        type = "visa";
                                        break;
                                    case 83:
                                        type = "shoot";
                                        break;
                                    case 70:
                                        type = "mice";
                                        break;
                                    default:
                                        type = "whole";
                                }
                                if (queryKey) {
                                    actionStr = "http://s.tuniu.com/search_complex/" + type + "-" + letter + "-0-" + queryKey + "/";
                                } else {
                                    actionStr = "http://s.tuniu.com/search_complex/";
                                }
                                document.getElementById("route_search").action = actionStr;
                                setTimeout(function () {
                                    document.getElementById('route_search').submit();
                                }, 700);
                            }
                            addSearchCookie(queryKey, actionStr);
                        });
                        return;
                    }
                    addSearchCookie(queryKey, actionStr);
                });
            }

            function getKeyLink(queryKey, callback) {
                $.ajax({
                    url: "http://www.tuniu.com/tn?r=api/p/getKeyLink",
                    type: "GET",
                    dataType: "json",
                    data: {query: queryKey},
                    crossDomain: true,
                    xhrFields: {withCredentials: true},
                    success: function (ret) {
                        if (ret && ret.data) {
                            callback(ret.data);
                        } else {
                            callback(false);
                        }
                    },
                    error: function (error) {
                        callback(false);
                    }
                })
            }

            function isRouteId(queryKey, callback) {
                if (/^\d+$/.test(queryKey)) {
                    $.ajax({
                        url: "http://www.tuniu.com/tn?r=api/p/isTour",
                        type: "GET",
                        dataType: "json",
                        data: {id: queryKey},
                        success: function (ret) {
                            if (ret && ret.success) {
                                if (ret.data.isTour) {
                                    if (ret.data.productType == 1 && /^210\d{6}$/.test(queryKey)) {
                                        callback(1)
                                    } else {
                                        callback(2)
                                    }
                                } else {
                                    callback(false);
                                }
                            } else {
                                callback(false);
                            }
                        },
                        error: function (error) {
                            callback(false);
                        }
                    })
                } else {
                    callback(false);
                }
            }

            function getElementsByClassName(className, root, tagName) {
                if (root) {
                    root = typeof root == "string" ? document.getElementById(root) : root;
                } else {
                    root = document.body;
                }
                tagName = tagName || "*";
                if (document.getElementsByClassName) {
                    return root.getElementsByClassName(className);
                } else {
                    var tag = root.getElementsByTagName(tagName);
                    var tagAll = [];
                    for (var i = 0; i < tag.length; i++) {
                        for (var j = 0, n = tag[i].className.split(' '); j < n.length; j++) {
                            if (n[j] == className) {
                                tagAll.push(tag[i]);
                                break;
                            }
                        }
                    }
                    return tagAll;
                }
            }

            function lTrim(str) {
                if (str.charAt(0) == " ") {
                    str = str.slice(1);
                    str = lTrim(str);
                }
                return str;
            }

            function rTrim(str) {
                var iLength;
                iLength = str.length;
                if (str.charAt(iLength - 1) == " ") {
                    str = str.slice(0, iLength - 1);
                    str = rTrim(str);
                }
                return str;
            }

            function lrTrim(str) {
                return lTrim(rTrim(str));
            }

            this._fnSearchSub = search_sub;
            $("#searchSub").click(search_sub);
        }, initSuggestion: function () {
            var self = this, mainUrl;
            $(function ($) {
                watchFunction();
            });

            function mousehover() {
                $(".list_suggest").hover(function () {
                    var prevTrIndex = $("#prevTrIndex").val();
                    if (prevTrIndex > 0) {
                        $("#list_suggest_" + prevTrIndex).removeClass("hover");
                    }
                    $(this).addClass("hover");
                    var num = $(this).prop("id").split("list_suggest_");
                    $("#prevTrIndex").val(num[1]);
                }, function () {
                    $(this).removeClass("hover");
                });
                $("#autoCompleteDivNew").hover(function () {
                    $(".tn_s_input").data("overSuggest", true);
                }, function () {
                    $(".tn_s_input").data("overSuggest", false);
                    $("#autoCompleteDivNew").remove();
                });
            };

            function mouseClick() {
                $(".search_record_delete").click(function () {
                    var q = $(this).prev().text();
                    mainUrl = getUrl();
                    var url = mainUrl + "/tn?r=api/p/ajaxAddCookie&type=remove_cookie?query=" + q
                        + "&format=json&jsoncallback=?";
                    $.getJSON(url);
                    setTimeout("$('#keyword-input').focus()", 500);
                });
                $(".search_record").click(function () {
                    var q = $(this).text();
                    $("#keyword-input").val(q);
                    $("#autoCompleteDivNew").remove();
                    $("#route_search").submit();
                });
            }

            function clickTr(currTrIndex) {
                var prevTrIndex = $("#prevTrIndex").val();
                if (currTrIndex > 0) {
                    $("#list_suggest_" + currTrIndex).addClass("hover");
                }
                if (prevTrIndex > 0) {
                    $("#list_suggest_" + prevTrIndex).removeClass("hover");
                }
                $("#prevTrIndex").val(currTrIndex);
            };

            function replaceValue(num) {
                $("#keyword-input").val($("#search_record_" + num).text());
            }

            function addCookieSuggest() {
                $("#autoCompleteDivNew").remove();
                return;
                if (newHotSearch) {
                    return;
                }
                if ($("#keyword-input").val() == '') {
                    mainUrl = getUrl();
                    var url = mainUrl + "/tn?r=api/p/searchCookie&format=json&jsoncallback=?";
                    $.getJSON(url, function (json) {
                        $("#autoCompleteDivNew").remove();
                        if (json.length > 0 && $("#keyword-input").is(":focus")) {
                            $("<div class='autoCompleteDivNew' id='autoCompleteDivNew'><input type='hidden' name='prevTrIndex' id='prevTrIndex' value='0' />"
                                + "<input type='hidden' name='preValue' id='preValue' value='"
                                + $("#keyword-input").val()
                                + "'/></div>").appendTo($("#keyword-input").parent());
                            for (var i = 0; i < json.length; i++) {
                                $("<div class='list_suggest' id='list_suggest_"
                                    + (i + 1)
                                    + "'><div class='search_record' id='search_record_"
                                    + (i + 1)
                                    + "'>"
                                    + json[i]
                                    + "</div><div class='search_record_delete'>删除</div></div>").appendTo($("#autoCompleteDivNew"));
                            }
                            mousehover();
                            mouseClick();
                        }
                    });
                }
            }

            function addSearchCookies(q) {
                mainUrl = getUrl();
                var url = mainUrl + "/tn?r=api/p/ajaxAddCookie&type=add_cookie&query=" + encodeURI(q)
                    + "&format=json&jsoncallback=?";
                $.getJSON(url);
            }

            function getUrl() {
                var host = window.location.host;
                var hostList = host.split(".");
                hostList.splice(0, 1, '//s');
                var url = hostList.join(".");
                return url;
            }

            function watchFunction() {
                $("#keyword-input").keydown(function (event) {
                    var trSize = $(".list_suggest").size();
                    var prevTrIndex = parseInt($("#prevTrIndex").val());
                    if (event.keyCode == 38 && $("#preValue").val() == '') {
                        if (prevTrIndex == 0) {
                            replaceValue(trSize);
                            clickTr(trSize);
                        } else if (prevTrIndex == 1) {
                            $("#keyword-input").val($("#preValue").val());
                            clickTr(prevTrIndex - 1);
                        } else {
                            replaceValue(prevTrIndex - 1);
                            clickTr(prevTrIndex - 1);
                        }
                        return false;
                    } else if (event.keyCode == 40 && $("#preValue").val() == '') {
                        if (prevTrIndex == trSize) {
                            $("#keyword-input").val($("#preValue").val());
                            clickTr(0);
                        } else {
                            replaceValue(prevTrIndex + 1);
                            clickTr(prevTrIndex + 1);
                        }
                        return false;
                    } else if ((event.keyCode == 37 || event.keyCode == 39) && $("#preValue").val() == '') {
                        $("#autoCompleteDivNew").remove();
                    } else if (event.keyCode == 13) {
                        event.preventDefault();
                        event.stopPropagation();
                        if ($("#preValue").val() == '') {
                            replaceValue(prevTrIndex);
                            $("#autoCompleteDivNew").remove();
                        }
                        if ($(".autocomplete").css("display") == 'block' && $(".resultbox.selected").length > 0) {
                            $(".resultbox.selected").trigger("click");
                        }
                        else {
                            $("#route_search").submit();
                        }
                    }
                });
                var host_url = window.location.host;
                if (host_url != "s.tuniu.com") {
                    $("#keyword-input").data("suggst", $("#keyword-input").val());
                }
                $("#keyword-input").bind({
                    focus: function () {
                        if (this.value == $("#keyword-input").data("suggst")) {
                            this.value = "";
                        }
                        this.style.color = "#000";
                        addCookieSuggest();
                    }, blur: function () {
                        if (this.value == "") {
                            this.value = $("#keyword-input").data("suggst") || '';
                            this.style.color = "#999";
                        }
                        if (!$(".tn_s_input").data("overSuggest")) {
                            $("#autoCompleteDivNew").remove();
                        }
                    }
                });
                if ($.browser.msie) {
                    $("#keyword-input").keyup(function (event) {
                        var keyCode = event.keyCode;
                        if ($.browser.msie && ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 105) || keyCode == 46 || keyCode == 8)) {
                            addCookieSuggest();
                        }
                    });
                } else {
                    $("#keyword-input").bind({
                        'input propertychange': function () {
                            addCookieSuggest();
                        }
                    });
                }
                $("#route_search").submit(function () {
                    var base_url = getUrl();
                    var q = $('#keyword-input').val();
                    q = $.trim(q);
                    if (q == null || q == '' || q == '请输入目的地或编号') {
                        window.location.href = base_url;
                    } else {
                        $('#q').val(q);
                        $('#route_search').attr("target", '_self');
                        $('#check_route_hi').html('');
                    }
                });
                $(".resultbox").live('click', function () {
                    return false;
                });
                $(".resultbox").live('click', function () {
                    link = $(this).children(":first").attr('href');
                    if (link == undefined) {
                        return;
                    }
                    blank = $(this).children(":first").attr('target');
                    var _val = "";
                    if ($(this).find(".left1").length > 0) {
                        _val = $(".resultbox.selected .left1").text();
                    } else if ($(this).find(".left3").length > 0) {
                        _val = $(".resultbox.selected .left3").text() + $(".resultbox.selected .left4").text();
                    } else {
                        _val = $(this).attr("title");
                    }
                    $("#keyword-input").val(_val);
                    addSearchCookie(_val, link);
                    if (blank == "_blank") {
                        setTimeout(jumpOut_blank, 700);
                    } else {
                        setTimeout(jumpOut, 700);
                    }
                });
            }

            function jumpOut() {
                window.location.href = link;
            }

            function jumpOut_blank() {
                window.open(link, "_blank");
            }

            function searchTip($) {
                var autocomplete_options, autocomplete_a;
                var host = window.location.host;
                var hostList = host.split(".");
                var ishttps = 'https:' == document.location.protocol ? true : false;
                if (ishttps) {
                    hostList.splice(0, 1, '//i');
                } else {
                    hostList.splice(0, 1, '//s');
                }
                var base_url = hostList.join(".");
                var complex = $("#from_action").val();
                $('#keyword-input').change(function () {
                    $('#st').val(1);
                });
                autocomplete_options = {
                    serviceUrl: PROTOCOL + '//www.tuniu.com/tn?r=api/p/searchSugguestV2',
                    degreeUrl: PROTOCOL + '//www.tuniu.com/tn?r=api/p/searchSugguestRightV2',
                    onSelect: autocomplete_onselect,
                    isOuter: true
                };
                autocomplete_a = $('#keyword-input').autocomplete(autocomplete_options);

                function autocomplete_onselect(i) {
                    var autocomplete = $(".autocomplete-w1").find(".resultbox");
                    var autocomplete_href = autocomplete.eq(i).find("a").attr("href");
                    window.open(autocomplete_href, "_self");
                }

                $("#keyword-input").keyup(function () {
                    if ($(this).val() != '') {
                        $("#q").val($(this).val());
                    }
                });
            }

            function delay(e) {
                if (navigator.userAgent.indexOf("Firefox") > 0) {
                    if (e && e.preventDefault) {
                        e.preventDefault();
                    }
                }
                if (self._fnSearchSub) {
                    self._fnSearchSub();
                    return false;
                } else if (search_sub) {
                    search_sub();
                    return false;
                }
            };window.delay || (window.delay = delay);
            if (window.jQuery) {
                (function ($) {
                    var delQ = true;
                    $(window).on('getDegree', function (e, code) {
                        var temp = [];
                        var autoDiv = $('.autocomplete-w1');
                        if (autoDiv.length < 1) return;
                        var atuoDivCon = autoDiv.find('div.autocomplete');
                        var autoBox = atuoDivCon.find('div.resultbox');
                        var resultLen = autoBox.length;
                        var autoHeight = atuoDivCon.height() - 10;
                        var keyId = code.dataId || 0;
                        var bannertmp = $('.searchbanner');
                        autoBox.each(function (index, elem) {
                            var tmp;
                            var sId = $(elem).attr('data-id') || 0;
                            tmp = sId;
                            temp.push(tmp);
                        });
                        if (bannertmp.length < 1) {
                            if (keyId == 0 || keyId == "undefined") {
                                bannertmp.hide();
                                return;
                            }
                            getAjax(code.degreeUrl, {key_id: keyId, key_word: code.key_word}, function (data) {
                                if (data.hasTop) {
                                    var degreeBox = showDegree(data, resultLen, autoHeight);
                                    autoDiv.append(degreeBox);
                                    $('#sbanner' + keyId).show();
                                }
                            });
                        } else {
                            if ($('#sbanner' + keyId).length > 0) {
                                bannertmp.hide();
                                $('#sbanner' + keyId).show();
                            } else {
                                if (keyId == 0 || keyId == "undefined") {
                                    bannertmp.hide();
                                    return;
                                }
                                getAjax(code.degreeUrl, {key_id: keyId, key_word: code.key_word}, function (data) {
                                    if (data.hasTop) {
                                        var degreeBox = showDegree(data, resultLen, autoHeight);
                                        autoDiv.append(degreeBox);
                                        bannertmp.hide();
                                        $('#sbanner' + keyId).show();
                                    }
                                });
                            }
                        }

                        function getAjax(url, sendData, callback) {
                            if (!delQ) {
                                return;
                            }
                            delQ = false;
                            $.ajax({
                                url: url,
                                dataType: 'jsonp',
                                jsonp: "jsoncallback",
                                data: {'key_id': sendData.key_id, 'key_word': sendData.key_word, 'format': 'json'},
                                scriptCharset: 'utf-8',
                                success: function (data) {
                                    delQ = true;
                                    if (data) {
                                        callback(data);
                                    }
                                }
                            })
                        }

                        function showDegree(res, len, sheight) {
                            var sdiv = '', slen, stop = "", scon = "", picDiv = "";
                            if (res.keyId) {
                                var searchRoute = res.playroute;
                                if (searchRoute) {
                                    slen = searchRoute.length;
                                }
                                if (res.hasTop && res.hasTop == 1 && len > 3) {
                                    if (slen > 0 && len > 9) {
                                        for (var n = 0; n < slen; n++) {
                                            repName = searchRoute[n].routeName;
                                            repName = repName.replace(/[ ]/g, "");
                                            scon += '<div class="an_mo" liwithhan="搜索最受欢迎玩法-' + searchRoute[n].routeNum + '-' + res.key_word + '-' + repName + '">'
                                                + '<a class="topbanner" target="_self" href="' + searchRoute[n].routeUrl + '" title="' + searchRoute[n].routeName + '">'
                                                + '<span class="toptag">Top ' + searchRoute[n].routeNum + '</span>'
                                                + ' <span class="topname">' + searchRoute[n].routeName + '</span>'
                                                + '</a></div>';
                                        }
                                        stop = '<div class="searchtop">'
                                            + '<h2>最受欢迎的玩法</h2>'
                                            + scon
                                            + '</div>';
                                        if (slen > 0 && len > 10) {
                                            if (res.ad && res.ad.length > 0) {
                                                picDiv = '<div class="searchpic">'
                                                    + '<a href="' + res.ad[0].url + '">'
                                                    + '<img src="' + res.ad[0].imgUrl + '" />'
                                                    + '</a></div>'
                                            }
                                        }
                                    }
                                    sdiv = '<div class="searchbanner" id="sbanner' + keyId + '" style="display:none;height:' + sheight + 'px">'
                                        + '        <h1>' + res.key_word + '</h1>'
                                        + '        <div class="searchdegree">';
                                    if (parseInt(res.degree) >= 85) {
                                        sdiv += '            <div class="degreetag">'
                                            + '                <p class="degreetext">满意度</p>'
                                            + '                <p class="degreenum">' + res.degree + '</p>'
                                            + '            </div>';
                                    }
                                    sdiv += '            <div class="degreeitem">';
                                    if (res.follwNum > 0) {
                                        sdiv += '                <p class="degreefollow">'
                                            + '                    <label>已关注人数：</label>'
                                            + '                    <span>' + formatNum(res.follwNum) + '人</span>'
                                            + '                </p>';
                                    }
                                    if (res.tourNum > 0) {
                                        sdiv += '                <p class="degreetour">'
                                            + '                    <label>已有点评数：</label>'
                                            + '                    <span>' + formatNum(res.tourNum) + '人</span>'
                                            + '                </p>';
                                    }
                                    sdiv += '            </div>'
                                        + '        </div>'
                                        + stop
                                        + picDiv
                                        + '</div>';
                                }
                                return sdiv;
                            }
                        }

                        function formatNum(num) {
                            if (num >= 10000) {
                                return Math.floor(num / 10000) + '万';
                            } else {
                                return num;
                            }
                        }
                    });
                })(jQuery);
            }
        }, initBaseV5: function () {
            $(function () {
                clearItemTheme();
            })
            var _indexState = true;
            var changeBg;
            var addHovered;
            var alreadOut;
            var $theme = $("#item-theme");

            function themeAnimate() {
                $theme = $("#item-theme");
                var $themeLen = $theme.find(".left_title");
                var $themeBg = $theme.find("#item-theme_bg");
                changeBg = setTimeout(function () {
                    $("#item-theme_bg").fadeIn(200);
                    setTimeout(function () {
                        $("#item-theme_bg").fadeOut(200);
                    }, 200)
                }, 1000);
                addHovered = setTimeout(function () {
                    $theme.addClass("hovered");
                }, 1600);
                var showList = setTimeout(function () {
                    $theme.find(".theme_market_list").animate({left: "0px"}, 600, "easeInOutQuint");
                }, 1600);
                alreadOut = setTimeout(function () {
                    $theme.removeClass("hovered");
                }, 6600);
            }

            function hideItemTheme() {
                $theme.removeClass("hovered");
            }

            function clearItemTheme() {
                $("#_JD_ALLSORT div.item").bind("mouseenter", function () {
                    clearTimeout(changeBg);
                    clearTimeout(addHovered);
                    if ($(this).attr('id') == "item-theme") {
                        $theme.addClass("hovered");
                    } else {
                        clearTimeout(alreadOut);
                        hideItemTheme();
                    }
                })
                $("#_JD_ALLSORT div.item").bind("mouseleave", function () {
                    clearTimeout(changeBg);
                    clearTimeout(alreadOut);
                    hideItemTheme();
                })
            }

            $('.categorys').hover(function () {
                $(this).addClass('hover');
                $("#_JD_ALLSORT").css({"display": "block"});
                if (_indexState) {
                    _indexState = false;
                }
            }, function () {
                $(this).removeClass('hover');
                $("#_JD_ALLSORT").css({"display": "none"});
                hideItemTheme();
                clearTimeout(changeBg);
                clearTimeout(addHovered);
            });

            function getHeaderMenu(str) {
                if (str != '') {
                    var arr = str;
                    if (document.getElementById("categorys")) {
                        document.getElementById("categorys").innerHTML = arr.content;
                    }
                }
                (function ($) {
                    $.fn.menuAim = function (opts) {
                        this.each(function () {
                            init.call(this, opts);
                        });
                        return this;
                    };

                    function init(opts) {
                        var $menu = $(this), activeRow = null, mouseLocs = [], lastDelayLoc = null, timeoutId = null,
                            options = $.extend({
                                rowSelector: "> div",
                                submenuSelector: "*",
                                submenuDirection: "right",
                                tolerance: 75,
                                enter: $.noop,
                                exit: $.noop,
                                activate: $.noop,
                                deactivate: $.noop,
                                exitMenu: $.noop
                            }, opts);
                        var MOUSE_LOCS_TRACKED = 3, DELAY = 300;
                        var mousemoveDocument = function (e) {
                            mouseLocs.push({x: e.pageX, y: e.pageY});
                            if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
                                mouseLocs.shift();
                            }
                        };
                        var mouseleaveMenu = function () {
                            if (timeoutId) {
                                clearTimeout(timeoutId);
                            }
                            if (options.exitMenu(this)) {
                                if (activeRow) {
                                    options.deactivate(activeRow);
                                }
                                activeRow = null;
                            }
                        };
                        var mouseenterRow = function () {
                            if (timeoutId) {
                                clearTimeout(timeoutId);
                            }
                            options.enter(this);
                            possiblyActivate(this);
                        }, mouseleaveRow = function () {
                            options.exit(this);
                        };
                        var clickRow = function () {
                            activate(this);
                        };
                        var activate = function (row) {
                            if (row == activeRow) {
                                options.activate(row);
                                activeRow = row;
                                return;
                            }
                            asyMenuImg(row);
                            if (activeRow) {
                                options.deactivate(activeRow);
                            }
                            options.activate(row);
                            activeRow = row;
                        };
                        var asyMenuImg = function (r) {
                            var cover_img = $(r).find(".cover-img img");
                            var cover_img_data_src = cover_img.attr("data-src");
                            var cover_img_src = cover_img.attr("src");
                            if (cover_img_data_src && cover_img_data_src.length > 0) {
                                if (cover_img_data_src == cover_img_src) {
                                    return;
                                } else {
                                    cover_img.attr("src", cover_img_data_src)
                                }
                            }
                        }
                        var possiblyActivate = function (row) {
                            var delay = activationDelay();
                            if (delay) {
                                timeoutId = setTimeout(function () {
                                    possiblyActivate(row);
                                }, delay);
                            } else {
                                activate(row);
                            }
                        };
                        var activationDelay = function () {
                            if (!activeRow || !$(activeRow).is(options.submenuSelector)) {
                                return 0;
                            }
                            var offset = $menu.offset(),
                                upperLeft = {x: offset.left, y: offset.top - options.tolerance},
                                upperRight = {x: offset.left + $menu.outerWidth(), y: upperLeft.y},
                                lowerLeft = {x: offset.left, y: offset.top + $menu.outerHeight() + options.tolerance},
                                lowerRight = {x: offset.left + $menu.outerWidth(), y: lowerLeft.y},
                                loc = mouseLocs[mouseLocs.length - 1], prevLoc = mouseLocs[0];
                            if (!loc) {
                                return 0;
                            }
                            if (!prevLoc) {
                                prevLoc = loc;
                            }
                            if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x || prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
                                return 0;
                            }
                            if (lastDelayLoc && loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
                                return 0;
                            }

                            function slope(a, b) {
                                return (b.y - a.y) / (b.x - a.x);
                            };var decreasingCorner = upperRight, increasingCorner = lowerRight;
                            if (options.submenuDirection == "left") {
                                decreasingCorner = lowerLeft;
                                increasingCorner = upperLeft;
                            } else if (options.submenuDirection == "below") {
                                decreasingCorner = lowerRight;
                                increasingCorner = lowerLeft;
                            } else if (options.submenuDirection == "above") {
                                decreasingCorner = upperLeft;
                                increasingCorner = upperRight;
                            }
                            var decreasingSlope = slope(loc, decreasingCorner),
                                increasingSlope = slope(loc, increasingCorner),
                                prevDecreasingSlope = slope(prevLoc, decreasingCorner),
                                prevIncreasingSlope = slope(prevLoc, increasingCorner);
                            if (decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope) {
                                lastDelayLoc = loc;
                                return DELAY;
                            }
                            lastDelayLoc = null;
                            return 0;
                        };
                        $menu.mouseleave(mouseleaveMenu).find(options.rowSelector).mouseenter(mouseenterRow).mouseleave(mouseleaveRow).click(clickRow);
                        $(document).mousemove(mousemoveDocument);
                    };
                })(jQuery);
                ;leftCatv2();
                slideMenu();
            }

            function leftCatv2() {
                var x = $("#_JD_SORTLIST").remove().html();
                $("#_JD_ALLSORT").html(x).attr("load", "1");
            }

            function slideMenu() {
                var $menu = $("#_JD_ALLSORT");
                $menu.menuAim({activate: activateSubmenu, deactivate: deactivateSubmenu, exitMenu: exitMenu});

                function activateSubmenu(row) {
                    var $row = $(row), submenuId = $row.data("submenuId"), $submenu = $("#" + submenuId),
                        height = $menu.outerHeight(), width = $menu.outerWidth();
                    $submenu.css({left: width - 2});
                    $menu.find(">div").removeClass("hover");
                    $row.addClass("hover");
                }

                function deactivateSubmenu(row) {
                    var $row = $(row), submenuId = $row.data("submenuId"), $submenu = $("#" + submenuId);
                    $row.removeClass("hover");
                }

                function exitMenu(row) {
                    var $row = $(row), submenuId = $row.data("submenuId"), $submenu = $("#" + submenuId);
                    $row.find(">div").removeClass("hover");
                }
            }
        }, initPagePhone: function () {
            var headPhoneBox = $(".header_search .site_contact");
            var footPhoneBox = $(".three_trav .thr_trav");
            var tuniuHeaderPhoneText = headPhoneBox.find(".text");
            var tuniuHeaderPhoneTel = headPhoneBox.find(".tel")
            var tuniuFootPhoneText = footPhoneBox.find(".tn_text");
            var tuniuFootPhoneTel = footPhoneBox.find(".tn_phone");
            var tuniuPPhoneNumber = this.getPhoneCookie("p_phone_400") || '4007-999-999';
            var tuniuGlobalPhone = this.getPhoneCookie("p_global_phone") || '+0086-25-8685-9999';
            if (tuniuFootPhoneText.length > 0) {
            }
            else {
                footPhoneBox.find("a").prepend("<em class='tn_text'></em>");
                tuniuFootPhoneText = footPhoneBox.find(".tn_text");
            }
            if (tuniuHeaderPhoneTel) {
                var siteContact = $(".site_contact");
                siteContact.append("<div class='service_phone_box'><span id='service_phone_box_tel'></span><div class='arrow'></div></div>");
                var servicePhoneBox = $(".site_contact .service_phone_box");
                if (tuniuPPhoneNumber && tuniuPPhoneNumber == "4007-979797") {
                    tuniuHeaderPhoneText.text("24h途致贵宾专线");
                    tuniuHeaderPhoneTel.text(tuniuPPhoneNumber);
                } else {
                    tuniuHeaderPhoneText.text("24h客户服务电话");
                    tuniuHeaderPhoneTel.text("4007-999-999");
                }
                $("#service_phone_head_text").append("<em></em>");
                $("#service_phone_box_tel").html("国内：<i>" + tuniuPPhoneNumber + "</i><br>国际：<i>" + tuniuGlobalPhone + "</i>");
                siteContact.bind('mouseenter', function () {
                    servicePhoneBox.show();
                    siteContact.find("em").addClass("down");
                }).bind('mouseleave', function () {
                    servicePhoneBox.hide();
                    siteContact.find("em").removeClass("down");
                });
            }
            if (tuniuFootPhoneTel) {
                if (tuniuPPhoneNumber && tuniuPPhoneNumber == "4007-979797") {
                    tuniuFootPhoneText.text("途致贵宾专线（免长途费）");
                    tuniuFootPhoneTel.text(tuniuPPhoneNumber);
                } else {
                    tuniuFootPhoneText.text("客户服务电话（免长途费）");
                    tuniuFootPhoneTel.text("4007-999-999");
                }
            }
        }, getPhoneCookie: function (objName) {
            var arrStr = document.cookie.split("; ");
            for (var i = 0; i < arrStr.length; i++) {
                var temp = arrStr[i].split("=");
                if (temp[0] == objName) return unescape(temp[1]);
            }
            return false;
        }
    }
    page.init();
});
define('components/rightBar/main', ['jquery', 'underscore'], function ($, _) {
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
    var KEFU_TEMPLATE_ID = 22;
    rightCommon = {
        init: function (data) {
            currentPageData = data || {};
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
        }, initToolBar: function () {
            var trnode = document.getElementById("rightCommon");
            if (trnode) {
                trnode.parentNode.removeChild(trnode);
            }
            var toolBar = "<ul id='rightCommonUl' class='hide'>" + "<li id=''><ul id='rcTop'></ul></li>" + "<li ><ul id='rcMid'></ul></li>" + "<li style='position:absolute;top:280px;'><ul id='rc_phone'></ul></li>" + "<li style='position:absolute;top:540px;' id='RCU_doArea'><ul id='rcLastBtm'></ul></li>" + "<li style='position:absolute;bottom:20px;'><ul id='rcBtm'></ul></li>" + "</ul>";
            var toolBarBox = document.createElement("div");
            toolBarBox.className = "right_common";
            toolBarBox.id = "rightCommon";
            toolBarBox.innerHTML = toolBar;
            if (!document.getElementById("rightCommonCss")) {
                var toolBarCss = document.createElement("link");
                toolBarCss.href = "//ssl1.tuniucdn.com/s/201511166666/rightcommon/right_common.css";
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
                var app = "<% if(data.appArea){ %><li style='height:42px;margin-top:20px;cursor:pointer;'>" + "<% if(data.appArea.appUrl){ %><div class='rc_index'>" + "<p class='rc_app_box'>" + "<span class='rc_icon rc_app'></span>" + "</p>" + "</div>" + "<div class='rc_box rc_app_b nopad'>" + "<span class='rc_arrow'>" + "<i class='triangle_border'>" + "<em></em>" + "</i>" + "</span>" + "<div class='rc_content'>" + "<a href='<%=data.appArea.appUrl %>' target='_blank'>" + "<img src='<%=data.appArea.appImgUrl %>' alt='' />" + "</a>" + "</div>" + "</div><%}%>" + "</li><%}%>";
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
            var reNLogin = "<% if(data.islogin != 1) {%><div class='rc_common_box nologin'>" + "<div style='background-color:#fff;opacity:0.5;filter:alpha(opacity=50);width:236px;height:372px;position: absolute;top: 0;left: 0;display:none;' class='rcLoadingImg'></div>" + "<img src='http://img3.tuniucdn.com/img/20140922/common/loading-72x72.gif' class='rcLoadingImg' style='position:absolute;top:150px;left:82px;display:none;'>" + "<p class='show_error' id=''></p>" + "<dl class='rc_double_col rc_w_s clearfix'>" + "<dt>账号：</dt>" + "<dd></dd>" + "</dl>" + "<p class='account hide' class='subCookieName'>" + "<input type='text' class='rc_common_input' />" + "<span class='lenovo'>" + "<span class='nickName'></span><br>来自.tuniu.com的密码" + "</span>" + "</p>" + "<p><input type='text'tabindex=1 class='rc_common_input rcUserName' /></p>" + "<dl class='rc_double_col rc_w_s clearfix'>" + "<dt>密码：</dt>" + "<dd><a href='http://www.tuniu.com/u/get_password' target='_blank' class='rc_g_color'>找回密码</a></dd>" + "</dl>" + "<p><input type='password' tabindex=2 class='rc_common_input rcPassWord' /></p>" + "<dl class='rc_double_col rc_w_s clearfix'>" + "<dt>验证码：</dt>" + "<dd></dd>" + "</dl>" + "<dl class='rc_double_col clearfix'>" + "<dt><input type='text' tabindex=3 class='rc_common_input rc_small rcVerCode' /></dt>" + "<dd class='rc_pad_top'>" + "<img height='24' width='80' class='identify_img' alt='如验证码无法辨别，点击即可刷新。' align='absmiddle' onclick='' onload='' style='display: inline;' src=''>" + "<img src='http://img4.tuniucdn.com/img/20140911/rightcommon/refresh.jpg' alt='' class='change_img' align='absmiddle' height='24' width='24' style='display: inline;' />" + "</dd>" + "</dl>" + "<input class='rc_ableBtn' value='登录' type='button' / >" + "<dl class='rc_double_col rc_reg clearfix'>" + "<dt>首次登录，请先<a href='http://www.tuniu.com/u/register' target='_blank' class='rc_g_color'> 注册</a></dt>" + "<dd>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其他<a href='http://www.tuniu.com/u/login' target='_blank' class='rc_g_color'> 登录>></a></dd>" + "</dl>" + "</div><% } %>";
            var listNoLogin = _.template(reNLogin, {data: data});
            return getUnderscoreCompiledTemplate(listNoLogin, {data: data});
        }, getPreL: function () {
            var data = ret.data;
            var preL = "<li><a href='http://www.tuniu.com/u/club' target='_blank'><span class='right_icons tequan <%=name.userPrivilege_1 %>'></span></a></li>";
            var preLTmp = "<%_.each(data.myTuniu.userPrivilege,function(name){%>" + preL + "<% }) %>";
            return preLTmp;
        }, getMyTuniu: function () {
            var data = ret.data;
            var myTuniu = "<li class='mytuniuArea' style='padding:10px 0;cursorpointer;'>" + "<div class='rc_index'>" + "<p class=''>" + "<% if(data.islogin == 0){ %><a href='https://i.tuniu.com' target='_blank'><span class='rc_icon rc_tuniu'></span></a><%}%>" + "<% if(data.islogin == 1){ if(data.myTuniu.userHeadImgUrl){%><a href='https://i.tuniu.com' target='_blank'><img src='<%=data.myTuniu.userHeadImgUrl %>' style='width:32px;height:32px;margin:4px;background:none;border-radius:50%;' /></a><%}}%>" + "<% if(data.islogin == 1){ if(!data.myTuniu.userHeadImgUrl){%><a href='https://i.tuniu.com' target='_blank'><img src='http://img3.tuniucdn.com/img/2014040901/user_center/g_touxiang.png' style='width:32px;height:32px;margin:4px;background:none;border-radius:50%;' /></a><%}}%>" + "</p>" + "<p class='rc_wd' id='lessThanHide' style='padding:0;'>我的途牛</p>" + "</div>" + "<div class='rc_box nopad'>" + "<span class='rc_arrow'><i class='triangle_border'><em></em></i></span>"
                + "<% if(data.islogin == 1){ %><div class='rc_common_box'>" + "<div class='clearfix'>" + "<div class='rc_left'>" + "<div class='rc_user_img'>" + "<a href='https://i.tuniu.com' target='_blank'>" + "<%if(data.myTuniu.userHeadImgUrl){ %><img src='<%=data.myTuniu.userHeadImgUrl %>' /></a><% } %>" + "<%if(!data.myTuniu.userHeadImgUrl){ %><img src='http://img3.tuniucdn.com/img/2014040901/user_center/g_touxiang.png' /></a><% } %>" + "</div> " + "</div>" + "<div class='rc_right'>" + "<p class='rc_user_wel'>欢迎您！</p>" + "<p class='rc_user_name'><a href='http://www.tuniu.com/u' target='_blank'><%=data.myTuniu.userName %></a></p>" + "</div>" + "</div>"
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
                var orderList = "<li class='hoverClick'>"
                    + "<div class='rc_index'>" + "<p class='rc_topBot_b'>" + "<span class='rc_icon rc_order'></span>" + "</p>" + "</div>" + "<div class='rc_box nopad nobord rc_hover_event'>" + "<div class='rc_content'>" + "<p class='rc_des'>我的订单</p>" + "</div>" + "</div>"
                    + "<div class='rc_box rc_click_event nopad'>" + "<span class='rc_arrow'><i class='triangle_border'><em></em></i></span>"
                    + "<% if(data.islogin == 1){ %><div class='rc_common_box'>" + "<dl class='rc_double_col rc_mycol clearfix'>" + "<dt><div class='rc_btn_bord'>订单类型</div></dt>" + "<dd><a href='http://www.tuniu.com/u/order' class='rc_g_color' target='_blank'>更多订单 &gt;</a></dd>" + "</dl>"
                    + "<ul class='clearfix rc_two_col'>" + "<li>待付款<span class='rc_y_color'>(<%= data.myOrder.need_pay%>)</span></li>" + "<li>待点评<span class='rc_y_color'>(<%= data.myOrder.need_comment%>)</span></li>" + "</ul>"
                    + "<dl class='rc_double_col rc_mycol clearfix'>" + "<dt><div class='rc_btn_bord'>订单状态</div></dt>" + "<dd>"
                    + "</dd>" + "</dl>" + "<!-- rc_order_box start -->" + "<div class='rc_order_box'>" + "<% if(!data.myOrder.list[0].id){ %><img src='http://img4.tuniucdn.com/img/20140914/rightcommon/nothing.jpg' alt='' /><%}%>" + "<% if(data.myOrder.list[0].id){ %><ul class='rc_order_lists'>" + this.myOrderList()
                    + "</ul><%}%> "
                    + "</div>"
                    + "</div><% } %>"
                    + this.reNoLogin()
                    + "<% if(data.myOrder.list.preAdImg){ %><a href='<%=data.myOrder.list.prdAdUrl %>' target='_blank'>" + "<img src='<%=data.myOrder.list.preAdImg %>' alt='' />" + "</a><%}%>" + "</div>"
                    + "</li>";
                return getUnderscoreCompiledTemplate(_.template(orderList, {data: data}), {data: data});
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
                    + "<ul class='clearfix rc_two_col'>" + "<li>旅游券：<span class='rc_y_color'>&yen;<%=data.myGift.lvyouquan%></span></li>" + "<li>抵用券：<span class='rc_y_color'>&yen;<%=data.myGift.diyongquan%></span></li>" + "<li>现金账户：<span class='rc_y_color'>&yen;<%=data.myGift.cash%></span></li>" + "</ul>"
                    + "<dl class='rc_double_col rc_mycol clearfix'>" + "<dt><div class='rc_btn_bord'>如何获得旅游券</div></dt>" + "<dd>"
                    + "</dd>" + "</dl>" + "<ul class='rc_collect_box'>" + this.getArchList() + "</ul>" + "</div><%}%>"
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
                if (!this.noProduct()) {
                    kefu = "<li class='' id='onlineKefu' onclick=\"_gaq.push(['_trackEvent','在线客服按钮_1','','']);\">"
                        + "<div class='rc_index' style='cursor:pointer;'>"
                        + "<p class='rc_topBot_b' style='border-bottom:none;'>"
                        + "<a href='javascript:void(0)' id='" + kefuType + "'><span class='rc_icon rc_online'></span></a>"
                        + "</p>" + "<p class='rc_wd' style='padding:0;'>在线客服</p>"
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
            var onlineKefuLabel = '在线客服';
            var kefuWinConfig = 'width=640, height=515, top=100, left=500, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no';
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
                            currentPageData.success({
                                url: decodeURIComponent(res.url),
                                label: onlineKefuLabel,
                                winConfig: kefuWinConfig
                            })
                        } catch (err) {
                        }
                    }
                    $(document).off('click.loginPassport', '#onlineKefu, .online_service, .online_btn').on('click.loginPassport', '#onlineKefu, .online_service, .online_btn', function (e) {
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
                            + "</p>" + "<p class='rc_wd' style='padding:0;'>在线客服</p>"
                            + "</div>" + "<div class='rc_box nopad nobord rc_hover_event'>"
                            + "</div>" + "</li>";
                        $('#rc_phone').append(kefu);
                    }
                    $(document).on('click.openKefuWindow', '#onlineKefu', function (e) {
                        window.open(decodeURIComponent(res.url), onlineKefuLabel, kefuWinConfig);
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
;require(['jquery', 'underscore', 'components/rightBar/main'], function ($, _, main_prd) {
    var loaded = false;
    var checkIsLogin = checkIsLogin || [];
    var compName = window.compName || [];
    var clearTim = clearTim || "";
    var checkLogin = {
        init: function () {
            this.submitInfor();
        }, rcUserName: "", rcPassWord: "", rcVerCode: "", reTemp: 1, doAddToCollect: function () {
            $(document).ready(function () {
                var url = window.DEBUG ? "http://www.tuniu.org/tn?r=api/attention/getSingleAttentionInfo" : "http://www.tuniu.com/tn?r=api/attention/getSingleAttentionInfo";
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
                var url2 = window.DEBUG ? "http://www.tuniu.org/tn?r=api/attention/isAttention" : "http://www.tuniu.com/tn?r=api/attention/isAttention";
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
            var url = window.DEBUG ? "http://www.tuniu.org/tn?r=api/attention/attention" : "http://www.tuniu.com/tn?r=api/attention/attention";
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
            return false;
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
            var base_url = "http://www.tuniu.com";
            var url = base_url + '/tn?r=detail/tourV3Ajax/getInfo&routeIds=' + routeIds + '&jsoncallback=?';
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
            var url = "http://www.tuniu.com/main.php?do=user_reg_check_name&num=100&identify=" + this.rcVerCode + "&flag=identify2&cache=" + Math.random();
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
            "appArea": {
                "appUrl": "http://www.tuniu.com",
                "appImgUrl": "http://img3.tuniucdn.com/img/20140623/index_v2/index_app.png",
                "appImgAlt": "click here"
            },
            "myMessage": {"sum": "", "prd": [{"orderUrl": "", "orderName": "", "unreadMsgCount": ""}]}
        }
        data = main_prd.data = $.extend(true, {}, default_data, save_data);
        rightCommon.init($.extend({}, currentPageData, {
            success: function (data) {
                loaded = true;
                afterLoad(data);
            }
        }));
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
            if (!$("#page_type").val()) return false;
            var url = '//www.tuniu.com/api/sidebar/tools/' + $("#page_type").val() + "&js_callback=cjCallback";
            $.ajax({url: url, type: "get", async: true, dataType: "jsonp", jsonp: "js_callback"})
        }, getMsg: function () {
            getData.msgNumEle = $('#J_RightCommonMsgNum');
            getData.msgListEle = $('#J_RightCommonMsgList');
            setTimeout(function () {
                getData.getMsgData();
            }, loopDuration);
        }, getMsgData: function () {
            $.get('http://www.tuniu.com/u/msg/unread/', {}, function (data) {
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
                $(n).find('.identify_img').attr('src', 'http://www.tuniu.com/identify.php?flag=100&cache=' + rd);
                $(n).find(".change_img").click(function () {
                    var rd_2 = Math.random();
                    $(n).find('.identify_img').attr('src', 'http://www.tuniu.com/identify.php?flag=100&cache=' + rd_2);
                });
            })
        }, changeVcode: function () {
            var rightCommonUl = $("#rightCommonUl").find("li");
            var rd = Math.random();
            rightCommonUl.each(function (i, n) {
                $(n).find('.identify_img').attr('src', 'http://www.tuniu.com/identify.php?flag=100&cache=' + rd);
            })
        }, addLive800: function () {
            var live800 = $("#live800");
            if (live800.length < 1) return;
            var onlineKefu = $("#onlineKefu");
            if (!live800) return "";
            var groupid = $("#kefu_show").attr("groupid");
            onlineKefu.bind("click", function () {
                getData.Live800(groupid, 560, 480);
            });
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
            }
            var enterurl = encodeURIComponent(this.htmlspecialchars(window.location.href));
            var pagetitle = encodeURIComponent(this.htmlspecialchars(window.document.title));
            var url = 'http://chat16.live800.com/live800/chatClient/chatbox.jsp?companyID=319154&jid=3047301407&skillId=' + groupid + '&enterurl=' + enterurl + '&pagetitle=' + pagetitle;
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
    var sidebarData = null;
    var callbacks = [];

    function afterLoad(data) {
        sidebarData = data;
        if (callbacks.length) {
            for (var i = callbacks.length - 1; i >= 0; i--) {
                callbacks[i](sidebarData);
                callbacks.splice(i, 1);
            }
        }
    }

    function init(data) {
        currentPageData = window.rightBarData || {};
        getData.init();
        $(window).resize(function () {
            getData.compHeig();
            getData.smallWindow();
        });
    }

    window.getKefuData = function (callback) {
        if (loaded) {
            callback(sidebarData);
        } else {
            callbacks.push(callback);
        }
    }
    if ($.isArray(window.sidebarCallbacks) && window.sidebarCallbacks.length) {
        callbacks = window.sidebarCallbacks.slice();
    }
    setTimeout(init, 150);
    return {init: init}
});
;(function () {
    var a = {
        init: function () {
            this.writeGlobalScripts();
            this.trackBaidu()
        }, getTaUrl: function () {
            if (window.javascript_link && window.tuniu && window.tuniu.config) {
                return window.javascript_link(window.tuniu.config.cdn.jsVersion + "/common/tac.mini.js", "achilles")
            } else {
                var a = window.cdnConfig && window.cdnConfig.version || 20160707;
                var i = window.cdnConfig && window.cdnConfig.url || "//img1.tuniucdn.com";
                return i + "/static/j/" + a + "/common/tac.mini.js"
            }
        }, writeGlobalScripts: function () {
            document.write("<scri" + "pt>window._gaq={push:function(){}}</scr" + "ipt>");
            document.write("<scri" + "pt src='" + this.getTaUrl() + "'></scri" + "pt>")
        }, trackTa: function a(i) {
            if (typeof _tat == "undefined") {
                setTimeout(function () {
                    a(i)
                }, 1e3);
                return
            }
            var d = .065;
            var n = _tat.getTracker();
            n.setPageName(i);
            n.addOrganic("baidu.com", "w");
            n.addOrganic("baidu.com", "q1");
            n.addOrganic("baidu.com", "q2");
            n.addOrganic("baidu.com", "q3");
            n.addOrganic("baidu.com", "q4");
            n.addOrganic("baidu.com", "q5");
            n.addOrganic("baidu.com", "q6");
            n.addOrganic("www.so.com", "u");
            n.addOrganic("www.so.com", "q");
            n.addOrganic("so.360.cn", "u");
            n.addOrganic("so.360.cn", "q");
            n.trackPageView();
            n.enableLinkTracking()
        }, trackGa: function (a) {
            window._gaq = window._gaq || [];
            _gaq.push(["_setAccount", "UA-4782081-5"]);
            _gaq.push(["_setDomainName", "tuniu.com"]);
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
            _gaq.push(["_addOrganic", "www.so.com", "u"]);
            _gaq.push(["_addOrganic", "www.so.com", "q"]);
            _gaq.push(["_addOrganic", "360", "u"]);
            _gaq.push(["_addOrganic", "360", "q"]);
            _gaq.push(["_trackPageview", a])
        }, trackBaidu: function () {
            var a = a || [];
            (function () {
                var a = document.createElement("script");
                a.src = "//hm.baidu.com/hm.js?51d49a7cda10d5dd86537755f081cc02";
                var i = document.getElementsByTagName("script")[0];
                i.parentNode.insertBefore(a, i)
            })()
        }
    };
    a.init();
    var i = window.COLLECT = function () {
        var i = arguments && arguments.length > 1 ? arguments[1] : arguments[0];
        a.trackTa(i)
    };
    if (window.PageName) {
        i(PageName)
    }
})();