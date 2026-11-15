function objectWithPrototype(e, t) {
    function i() {}
    i.prototype = e;
    const s = new i;
    if (s.prototype = e, void 0 !== t)
        for (const e in t) t.hasOwnProperty(e) && (s[e] = t[e]);
    return s
}
Market.Helpers.FormEscaping = {
    escapeInHiddenCopyAndDisable(e, t, i) {
        const s = $("<input>").attr({
            type: "hidden",
            name: i,
            value: this.escapeForSecurityFilters(t.val()),
            class: this.escapedValueFieldClass
        });
        e.append(s), t.prop("disabled", !0)
    },
    cleanup(e, t) {
        t.prop("disabled", !1);
        e.find("." + this.escapedValueFieldClass).remove()
    },
    onCompleteCleanup(e) {
        return t => {
            const i = $(t.target),
                s = i.find(e);
            this.cleanup(i, s)
        }
    },
    escapeForSecurityFilters: e => btoa(encodeURIComponent(e)),
    escapedValueFieldClass: "js-comment-escaped-value-field"
}, Views.AddCommentForm = class {
    constructor(e) {
        this.$form = e, this.$form.on("submit", () => {
            const e = this.$form.find("#comment_form_content");
            Market.Helpers.FormEscaping.escapeInHiddenCopyAndDisable(this.$form, e, "base64_content")
        })
    }
}, Market.Helpers._warningOnLeaveAlready = !1, Market.Helpers.warnOnLeave = function() {
    if (Market.Helpers._warningOnLeaveAlready) return;
    Market.Helpers._warningOnLeaveAlready = !0;
    const e = ["PUT", "POST", "DELETE"];
    $.activeTransforms = 0, $(document).ajaxSend(function(t, i, s) {
        e.includes(s.type) && ($.activeTransforms += 1)
    }), $(document).ajaxComplete(function(t, i, s) {
        e.includes(s.type) && ($.activeTransforms -= 1)
    }), window.onbeforeunload || (window.onbeforeunload = function() {
        if ($.activeTransforms) return "We're still saving your changes. If you leave this page now your changes may not be saved."
    })
}, Views.AjaxDelete = class {
    constructor(e) {
        e.on("ajax:before", () => e.addClass("is-hidden")), e.on("ajax:error", () => e.removeClass("is-hidden")), e.on("ajax:success", function(t, i) {
            "ok" !== i.status && e.removeClass("is-hidden")
        }), Market.Helpers.warnOnLeave()
    }
}, loadjs = function() {
    function e(e, t) {
        e = e.push ? e : [e];
        var i, s, r, n = [],
            a = e.length,
            o = a;
        for (i = function(e, i) {
                i.length && n.push(e), --o || t(n)
            }; a--;) s = e[a], (r = l[s]) ? i(s, r) : (c[s] = c[s] || []).push(i)
    }

    function t(e, t) {
        if (e) {
            var i = c[e];
            if (l[e] = t, i)
                for (; i.length;) i[0](e, t), i.splice(0, 1)
        }
    }

    function i(e, t) {
        e.call && (e = {
            success: e
        }), t.length ? (e.error || a)(t) : (e.success || a)(e)
    }

    function s(e, t, i, r) {
        var n, o, l, c = document,
            u = i.async,
            h = (i.numRetries || 0) + 1,
            d = i.before || a,
            p = e.replace(/[\?|#].*$/, ""),
            f = e.replace(/^(css|img|module|nomodule)!/, "");
        if (r = r || 0, /(^css!|\.css$)/.test(p))(l = c.createElement("link")).rel = "stylesheet", l.href = f, (n = "hideFocus" in l) && l.relList && (n = 0, l.rel = "preload", l.as = "style");
        else if (/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(p))(l = c.createElement("img")).src = f;
        else if ((l = c.createElement("script")).src = f, l.async = void 0 === u || u, o = "noModule" in l, /^module!/.test(p)) {
            if (!o) return t(e, "l");
            l.type = "module"
        } else if (/^nomodule!/.test(p) && o) return t(e, "l");
        l.onload = l.onerror = l.onbeforeload = function(a) {
            var o = a.type[0];
            if (n) try {
                l.sheet.cssText.length || (o = "e")
            } catch (e) {
                18 != e.code && (o = "e")
            }
            if ("e" == o) {
                if ((r += 1) < h) return s(e, t, i, r)
            } else if ("preload" == l.rel && "style" == l.as) return l.rel = "stylesheet";
            t(e, o, a.defaultPrevented)
        }, !1 !== d(e, l) && c.head.appendChild(l)
    }

    function r(e, t, i) {
        var r, n, a = (e = e.push ? e : [e]).length,
            o = a,
            l = [];
        for (r = function(e, i, s) {
                if ("e" == i && l.push(e), "b" == i) {
                    if (!s) return;
                    l.push(e)
                }--a || t(l)
            }, n = 0; n < o; n++) s(e[n], r, i)
    }

    function n(e, s, n) {
        function a(s, n) {
            r(e, function(e) {
                i(c, e), s && i({
                    success: s,
                    error: n
                }, e), t(l, e)
            }, c)
        }
        var l, c;
        if (s && s.trim && (l = s), c = (l ? n : s) || {}, l) {
            if (l in o) throw "LoadJS";
            o[l] = !0
        }
        if (c.returnPromise) return new Promise(a);
        a()
    }
    var a = function() {},
        o = {},
        l = {},
        c = {};
    return n.ready = function(t, s) {
        return e(t, function(e) {
            i(s, e)
        }), n
    }, n.done = function(e) {
        t(e, [])
    }, n.reset = function() {
        o = {}, l = {}, c = {}
    }, n.isDefined = function(e) {
        return e in o
    }, n
}(), Views.AnalyticsData = class {
    constructor(e) {
        window.Analytics = {}, Modernizr.xhr2 && loadjs(e.data("scriptUrl"), () => {
            new Views.AnalyticsData(e)
        })
    }
}, Views.AnalyticsReports = class {
    constructor(e) {
        this.dom = {
            reportLinks: e.find(".analytics-report-link")
        }, this.authorId = e.data("authorId"), this.dom.reportLinks.on("click", this.handleLinkClick.bind(this))
    }
    handleLinkClick(e) {
        $.ajax({
            type: "GET",
            data: {
                author_id: this.authorId,
                report_type: $(e.target).data("reportType"),
                date: $(e.target).data("reportStartDate")
            },
            url: "/user/analytics_reports/download_report"
        }).done(function(e) {
            window.location.href = e.signedReportUrl
        }).fail(e => {
            null == e.responseJSON ? alert("The report could not be retrieved right now, please try again later.") : alert(e.responseJSON.message)
        })
    }
}, Views.Announcement = class {
    constructor(e) {
        e.on("ajax:before", () => e.addClass("is-hidden"))
    }
}, Market.DOMUtils._pageResponsive = null, Market.DOMUtils.isPageResponsive = function() {
    return null !== Market.DOMUtils._pageResponsive ? Market.DOMUtils._pageResponsive : Market.DOMUtils._pageResponsive = !!$("body").data("responsive")
}, Market.DOMUtils.setupResponsiveness = function() {};
var swfobject = function() {
    function e() {
        if (!q) {
            try {
                var e = L.getElementsByTagName("body")[0].appendChild(g("span"));
                e.parentNode.removeChild(e)
            } catch (e) {
                return
            }
            q = !0;
            for (var t = B.length, i = 0; i < t; i++) B[i]()
        }
    }

    function t(e) {
        q ? e() : B[B.length] = e
    }

    function i(e) {
        if (typeof I.addEventListener != D) I.addEventListener("load", e, !1);
        else if (typeof L.addEventListener != D) L.addEventListener("load", e, !1);
        else if (typeof I.attachEvent != D) v(I, "onload", e);
        else if ("function" == typeof I.onload) {
            var t = I.onload;
            I.onload = function() {
                t(), e()
            }
        } else I.onload = e
    }

    function s() {
        R ? r() : n()
    }

    function r() {
        var e = L.getElementsByTagName("body")[0],
            t = g(P);
        t.setAttribute("type", E);
        var i = e.appendChild(t);
        if (i) {
            var s = 0;
            ! function() {
                if (typeof i.GetVariable != D) {
                    var r = i.GetVariable("$version");
                    r && (r = r.split(" ")[1].split(","), Y.pv = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)])
                } else if (s < 10) return s++, void setTimeout(arguments.callee, 10);
                e.removeChild(t), i = null, n()
            }()
        } else n()
    }

    function n() {
        var e = N.length;
        if (e > 0)
            for (var t = 0; t < e; t++) {
                var i = N[t].id,
                    s = N[t].callbackFn,
                    r = {
                        success: !1,
                        id: i
                    };
                if (Y.pv[0] > 0) {
                    var n = m(i);
                    if (n)
                        if (!y(N[t].swfVersion) || Y.wk && Y.wk < 312)
                            if (N[t].expressInstall && o()) {
                                var u = {};
                                u.data = N[t].expressInstall, u.width = n.getAttribute("width") || "0", u.height = n.getAttribute("height") || "0", n.getAttribute("class") && (u.styleclass = n.getAttribute("class")), n.getAttribute("align") && (u.align = n.getAttribute("align"));
                                for (var h = {}, d = n.getElementsByTagName("param"), p = d.length, f = 0; f < p; f++) "movie" != d[f].getAttribute("name").toLowerCase() && (h[d[f].getAttribute("name")] = d[f].getAttribute("value"));
                                l(u, h, i, s)
                            } else c(n), s && s(r);
                    else _(i, !0), s && (r.success = !0, r.ref = a(i), s(r))
                } else if (_(i, !0), s) {
                    var g = a(i);
                    g && typeof g.SetVariable != D && (r.success = !0, r.ref = g), s(r)
                }
            }
    }

    function a(e) {
        var t = null,
            i = m(e);
        if (i && "OBJECT" == i.nodeName)
            if (typeof i.SetVariable != D) t = i;
            else {
                var s = i.getElementsByTagName(P)[0];
                s && (t = s)
            }
        return t
    }

    function o() {
        return !H && y("6.0.65") && (Y.win || Y.mac) && !(Y.wk && Y.wk < 312)
    }

    function l(e, t, i, s) {
        H = !0, x = s || null, C = {
            success: !1,
            id: i
        };
        var r = m(i);
        if (r) {
            "OBJECT" == r.nodeName ? (k = u(r), $ = null) : (k = r, $ = i), e.id = F, (typeof e.width == D || !/%$/.test(e.width) && parseInt(e.width, 10) < 310) && (e.width = "310"), (typeof e.height == D || !/%$/.test(e.height) && parseInt(e.height, 10) < 137) && (e.height = "137"), L.title = L.title.slice(0, 47) + " - Flash Player Installation";
            var n = Y.ie && Y.win ? "ActiveX" : "PlugIn",
                a = "MMredirectURL=" + I.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + n + "&MMdoctitle=" + L.title;
            if (typeof t.flashvars != D ? t.flashvars += "&" + a : t.flashvars = a, Y.ie && Y.win && 4 != r.readyState) {
                var o = g("div");
                i += "SWFObjectNew", o.setAttribute("id", i), r.parentNode.insertBefore(o, r), r.style.display = "none",
                    function() {
                        4 == r.readyState ? r.parentNode.removeChild(r) : setTimeout(arguments.callee, 10)
                    }()
            }
            h(e, t, i)
        }
    }

    function c(e) {
        if (Y.ie && Y.win && 4 != e.readyState) {
            var t = g("div");
            e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(u(e), t), e.style.display = "none",
                function() {
                    4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
                }()
        } else e.parentNode.replaceChild(u(e), e)
    }

    function u(e) {
        var t = g("div");
        if (Y.win && Y.ie) t.innerHTML = e.innerHTML;
        else {
            var i = e.getElementsByTagName(P)[0];
            if (i) {
                var s = i.childNodes;
                if (s)
                    for (var r = s.length, n = 0; n < r; n++) 1 == s[n].nodeType && "PARAM" == s[n].nodeName || 8 == s[n].nodeType || t.appendChild(s[n].cloneNode(!0))
            }
        }
        return t
    }

    function h(e, t, i) {
        var s, r = m(i);
        if (Y.wk && Y.wk < 312) return s;
        if (r)
            if (typeof e.id == D && (e.id = i), Y.ie && Y.win) {
                var n = "";
                for (var a in e) e[a] != Object.prototype[a] && ("data" == a.toLowerCase() ? t.movie = e[a] : "styleclass" == a.toLowerCase() ? n += ' class="' + e[a] + '"' : "classid" != a.toLowerCase() && (n += " " + a + '="' + e[a] + '"'));
                var o = "";
                for (var l in t) t[l] != Object.prototype[l] && (o += '<param name="' + l + '" value="' + t[l] + '" />');
                r.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + n + ">" + o + "</object>", U[U.length] = e.id, s = m(e.id)
            } else {
                var c = g(P);
                for (var u in c.setAttribute("type", E), e) e[u] != Object.prototype[u] && ("styleclass" == u.toLowerCase() ? c.setAttribute("class", e[u]) : "classid" != u.toLowerCase() && c.setAttribute(u, e[u]));
                for (var h in t) t[h] != Object.prototype[h] && "movie" != h.toLowerCase() && d(c, h, t[h]);
                r.parentNode.replaceChild(c, r), s = c
            }
        return s
    }

    function d(e, t, i) {
        var s = g("param");
        s.setAttribute("name", t), s.setAttribute("value", i), e.appendChild(s)
    }

    function p(e) {
        var t = m(e);
        t && "OBJECT" == t.nodeName && (Y.ie && Y.win ? (t.style.display = "none", function() {
            4 == t.readyState ? f(e) : setTimeout(arguments.callee, 10)
        }()) : t.parentNode.removeChild(t))
    }

    function f(e) {
        var t = m(e);
        if (t) {
            for (var i in t) "function" == typeof t[i] && (t[i] = null);
            t.parentNode.removeChild(t)
        }
    }

    function m(e) {
        var t = null;
        try {
            t = L.getElementById(e)
        } catch (e) {}
        return t
    }

    function g(e) {
        return L.createElement(e)
    }

    function v(e, t, i) {
        e.attachEvent(t, i), V[V.length] = [e, t, i]
    }

    function y(e) {
        var t = Y.pv,
            i = e.split(".");
        return i[0] = parseInt(i[0], 10), i[1] = parseInt(i[1], 10) || 0, i[2] = parseInt(i[2], 10) || 0, t[0] > i[0] || t[0] == i[0] && t[1] > i[1] || t[0] == i[0] && t[1] == i[1] && t[2] >= i[2]
    }

    function b(e, t, i, s) {
        if (!Y.ie || !Y.mac) {
            var r = L.getElementsByTagName("head")[0];
            if (r) {
                var n = i && "string" == typeof i ? i : "screen";
                if (s && (S = null, A = null), !S || A != n) {
                    var a = g("style");
                    a.setAttribute("type", "text/css"), a.setAttribute("media", n), S = r.appendChild(a), Y.ie && Y.win && typeof L.styleSheets != D && L.styleSheets.length > 0 && (S = L.styleSheets[L.styleSheets.length - 1]), A = n
                }
                Y.ie && Y.win ? S && typeof S.addRule == P && S.addRule(e, t) : S && typeof L.createTextNode != D && S.appendChild(L.createTextNode(e + " {" + t + "}"))
            }
        }
    }

    function _(e, t) {
        if (W) {
            var i = t ? "visible" : "hidden";
            q && m(e) ? m(e).style.visibility = i : b("#" + e, "visibility:" + i)
        }
    }

    function w(e) {
        return null != /[\\\"<>\.;]/.exec(e) && typeof encodeURIComponent != D ? encodeURIComponent(e) : e
    }
    var k, $, x, C, S, A, D = "undefined",
        P = "object",
        M = "Shockwave Flash",
        T = "ShockwaveFlash.ShockwaveFlash",
        E = "application/x-shockwave-flash",
        F = "SWFObjectExprInst",
        j = "onreadystatechange",
        I = window,
        L = document,
        O = navigator,
        R = !1,
        B = [s],
        N = [],
        U = [],
        V = [],
        q = !1,
        H = !1,
        W = !0,
        Y = function() {
            var e = typeof L.getElementById != D && typeof L.getElementsByTagName != D && typeof L.createElement != D,
                t = O.userAgent.toLowerCase(),
                i = O.platform.toLowerCase(),
                s = i ? /win/.test(i) : /win/.test(t),
                r = i ? /mac/.test(i) : /mac/.test(t),
                n = !!/webkit/.test(t) && parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")),
                a = !1,
                o = [0, 0, 0],
                l = null;
            if (typeof O.plugins != D && typeof O.plugins[M] == P) !(l = O.plugins[M].description) || typeof O.mimeTypes != D && O.mimeTypes[E] && !O.mimeTypes[E].enabledPlugin || (R = !0, a = !1, l = l.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), o[0] = parseInt(l.replace(/^(.*)\..*$/, "$1"), 10), o[1] = parseInt(l.replace(/^.*\.(.*)\s.*$/, "$1"), 10), o[2] = /[a-zA-Z]/.test(l) ? parseInt(l.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
            else if (typeof I.ActiveXObject != D) try {
                var c = new ActiveXObject(T);
                c && (l = c.GetVariable("$version")) && (a = !0, l = l.split(" ")[1].split(","), o = [parseInt(l[0], 10), parseInt(l[1], 10), parseInt(l[2], 10)])
            } catch (e) {}
            return {
                w3: e,
                pv: o,
                wk: n,
                ie: a,
                win: s,
                mac: r
            }
        }();
    Y.w3 && ((typeof L.readyState != D && "complete" == L.readyState || typeof L.readyState == D && (L.getElementsByTagName("body")[0] || L.body)) && e(), q || (typeof L.addEventListener != D && L.addEventListener("DOMContentLoaded", e, !1), Y.ie && Y.win && (L.attachEvent(j, function() {
        "complete" == L.readyState && (L.detachEvent(j, arguments.callee), e())
    }), I == top && function() {
        if (!q) {
            try {
                L.documentElement.doScroll("left")
            } catch (e) {
                return void setTimeout(arguments.callee, 0)
            }
            e()
        }
    }()), Y.wk && function() {
        q || (/loaded|complete/.test(L.readyState) ? e() : setTimeout(arguments.callee, 0))
    }(), i(e))), Y.ie && Y.win && window.attachEvent("onunload", function() {
        for (var e = V.length, t = 0; t < e; t++) V[t][0].detachEvent(V[t][1], V[t][2]);
        for (var i = U.length, s = 0; s < i; s++) p(U[s]);
        for (var r in Y) Y[r] = null;
        for (var n in Y = null, swfobject) swfobject[n] = null;
        swfobject = null
    });
    return {
        registerObject: function(e, t, i, s) {
            if (Y.w3 && e && t) {
                var r = {};
                r.id = e, r.swfVersion = t, r.expressInstall = i, r.callbackFn = s, N[N.length] = r, _(e, !1)
            } else s && s({
                success: !1,
                id: e
            })
        },
        getObjectById: function(e) {
            if (Y.w3) return a(e)
        },
        embedSWF: function(e, i, s, r, n, a, c, u, d, p) {
            var f = {
                success: !1,
                id: i
            };
            Y.w3 && !(Y.wk && Y.wk < 312) && e && i && s && r && n ? (_(i, !1), t(function() {
                s += "", r += "";
                var t = {};
                if (d && typeof d === P)
                    for (var m in d) t[m] = d[m];
                t.data = e, t.width = s, t.height = r;
                var g = {};
                if (u && typeof u === P)
                    for (var v in u) g[v] = u[v];
                if (c && typeof c === P)
                    for (var b in c) typeof g.flashvars != D ? g.flashvars += "&" + b + "=" + c[b] : g.flashvars = b + "=" + c[b];
                if (y(n)) {
                    var w = h(t, g, i);
                    t.id == i && _(i, !0), f.success = !0, f.ref = w
                } else {
                    if (a && o()) return t.data = a, void l(t, g, i, p);
                    _(i, !0)
                }
                p && p(f)
            })) : p && p(f)
        },
        switchOffAutoHideShow: function() {
            W = !1
        },
        ua: Y,
        getFlashPlayerVersion: function() {
            return {
                major: Y.pv[0],
                minor: Y.pv[1],
                release: Y.pv[2]
            }
        },
        hasFlashPlayerVersion: y,
        createSWF: function(e, t, i) {
            return Y.w3 ? h(e, t, i) : void 0
        },
        showExpressInstall: function(e, t, i, s) {
            Y.w3 && o() && l(e, t, i, s)
        },
        removeSWF: function(e) {
            Y.w3 && p(e)
        },
        createCSS: function(e, t, i, s) {
            Y.w3 && b(e, t, i, s)
        },
        addDomLoadEvent: t,
        addLoadEvent: i,
        getQueryParamValue: function(e) {
            var t = L.location.search || L.location.hash;
            if (t) {
                if (/\?/.test(t) && (t = t.split("?")[1]), null == e) return w(t);
                for (var i = t.split("&"), s = 0; s < i.length; s++)
                    if (i[s].substring(0, i[s].indexOf("=")) == e) return w(i[s].substring(i[s].indexOf("=") + 1))
            }
            return ""
        },
        expressInstallCallback: function() {
            if (H) {
                var e = m(F);
                e && k && (e.parentNode.replaceChild(k, e), $ && (_($, !0), Y.ie && Y.win && (k.style.display = "block")), x && x(C)), H = !1
            }
        }
    }
}();
Market.DOMUtils.MiniFlashAudioPlayer = class {
    constructor() {
        this.$container = $("#content"), this.audioPlayer = ".js-audio-player", this.flashPlayerSwf = "/flash/small_aj_preview.swf", this.flashPlayerId = "temp-audio-player", this.$container.on("click", this.audioPlayer, this.handleClick.bind(this))
    }
    handleClick(e) {
        e.preventDefault(), this.addPlayer(e.currentTarget)
    }
    getMp3Url(e) {
        return $(e).attr("href")
    }
    addPlayer(e) {
        if (0 === $(e).find("object").length) {
            this.removePlayer();
            const t = null,
                i = null,
                s = {
                    songUrl: this.getMp3Url(e),
                    looping: !1,
                    autoplay: !1
                };
            $(e).append("<div id='" + this.flashPlayerId + "'>"), swfobject.embedSWF(this.flashPlayerSwf, this.flashPlayerId, "70", "21", "9.0.0", "/swfobject/expressInstall.swf", s, t, i), this.prevTrack = e
        }
    }
    removePlayer() {
        swfobject.removeSWF(this.flashPlayerId)
    }
}, Market.DOMUtils.Html5AudioPlayer = class {
    constructor() {
        this.$container = $("#content"), this.audioPlayer = ".js-audio-player", this.playingClass = null, this.pausedClass = null, this.loadedTrack = null, this.state = null, $("#large_item_preview_container").addClass("audio-player-large--is-paused"), null != Modernizr.audio.mp3 && this.$container.on("click", this.audioPlayer, this.handleClick.bind(this))
    }
    handleClick(e) {
        e.preventDefault(), this.loadedTrack === e.currentTarget ? "playing" === this.state ? this.pauseTrack() : this.playTrack() : this.loadAndPlayNewTrack(e.currentTarget)
    }
    loadAudio(e) {
        null == this.$audioElement && this.appendAudioElement(), this.$audioElement.attr("src", e)
    }
    pauseTrack() {
        this.$audioElement.get(0).pause(), this.switchClasses(this.loadedTrack, this.playingClass, this.pausedClass), this.state = "paused"
    }
    playTrack() {
        this.$audioElement.get(0).play(), this.switchClasses(this.loadedTrack, this.pausedClass, this.playingClass), this.state = "playing"
    }
    loadAndPlayNewTrack(e) {
        null !== this.loadedTrack && this.switchClasses(this.loadedTrack, this.playingClass, this.pausedClass), this.targetPlayer(e), this.switchClasses(e, this.playingClass, this.pausedClass), this.loadAudio(e.href), this.loadedTrack = e, this.playTrack()
    }
    appendAudioElement() {
        this.$audioElement = $("<audio id='html5-audio-placeholder' autoplay>"), this.$container.append(this.$audioElement)
    }
    targetPlayer(e) {
        this.size = $(e).data("playerSize"), this.playingClass = "audio-player-" + this.size + "--is-playing", this.pausedClass = "audio-player-" + this.size + "--is-paused"
    }
    switchClasses(e, t, i) {
        $(e).removeClass(t).addClass(i)
    }
}, Market.DOMUtils.setupMiniAudioPlayer = function() {
    return swfobject.hasFlashPlayerVersion("8.0.0") ? new Market.DOMUtils.MiniFlashAudioPlayer : new Market.DOMUtils.Html5AudioPlayer
};
class DisableOnSubmit {
    constructor(e) {
        this.form = e, this.$form = $(e), this.$form.on("submit.disableOnSubmit", this._disableSubmitButton.bind(this)), this.$form.on("submit-cancelled.disableOnSubmit", this._enableSubmitButton.bind(this))
    }
    _disableSubmitButton() {
        this._submitButton().prop("disabled", !0)
    }
    _enableSubmitButton() {
        this._submitButton().prop("disabled", !1)
    }
    _submitButton() {
        return this.$form.find("button[type=submit], input[type=submit]")
    }
}
$.fn.disableOnSubmit = function() {
    return this.each(function() {
        const e = $(this);
        if (void 0 === e.data("pluginDisableOnSubmit")) {
            const t = new DisableOnSubmit(this);
            e.data("pluginDisableOnSubmit", t)
        }
    })
}, Market.DOMUtils.legacyDisableFormOnSubmit = () => $("form.disable-on-submit").disableOnSubmit();
class VideoJSPlayerManager {
    constructor() {
        this._currentPlayer = null, this._has_been_setup = !1, this._deferred = new $.Deferred
    }
    register() {
        return this._has_been_setup || this._setup(), this._deferred.promise()
    }
    _setup() {
        if (this._has_been_setup = !0, window.videojs) return void this._deferred.resolve(window.videojs);
        const e = $("#video-magnifier").data("videojs-path");
        if (e) loadjs([e], {
            success: () => {
                this._deferred.resolve(window.videojs)
            },
            error: e => {
                console.error("VideoJSPlayerManager: Failed to load Video.js from", e), this._deferred.reject(new Error("Failed to load Video.js: " + e.join(", ")))
            }
        });
        else if (window.videojs) console.warn("VideoJSPlayerManager: No videojs-path found, using pre-loaded videojs"), this._deferred.resolve(window.videojs);
        else {
            const e = new Error("VideoJSPlayerManager: No videojs-path found and videojs is not pre-loaded");
            console.error(e.message), this._deferred.reject(e)
        }
    }
}
Market.DOMUtils.getVideoJSPlayerManager = function() {
    return VideoJSPlayerManager._instance || (VideoJSPlayerManager._instance = new VideoJSPlayerManager)
};
const Magnifier = {
        price_prefix: "<sup>$</sup>",
        positionMagnifierNextTo: function(e) {
            let t, i;
            const s = this.magnifierDiv();
            t = $(e).offset().top + $(e).outerHeight() - s.outerHeight(), t < $(window).scrollTop() && (t = $(window).scrollTop()), i = $(e).offset().left + $(e).outerWidth() / 2 >= $(window).width() / 2 ? $(e).offset().left - s.outerWidth() : $(e).offset().left + $(e).outerWidth(), s.css({
                top: t,
                left: i
            })
        },
        showMagnifier: function(e) {
            void 0 === $(e).attr("data-tooltip") && ($(e).attr("data-tooltip", $(e).attr("title")), $(e).attr("title", ""), $("img", e).attr("title", "")), this.populateMagnifierFrom(e), this.positionMagnifierNextTo(e), this.magnifierDiv().css({
                display: "inline"
            })
        },
        hideMagnifier: function() {
            this.magnifierDiv().hide()
        },
        magnify: function(e) {
            const t = this;
            $(document).on("mouseenter", e, function() {
                t.showMagnifier(this)
            }), $(document).on("mouseleave", e, function() {
                t.hideMagnifier(this)
            })
        },
        bindMetaData: function(e) {
            const t = $(e),
                i = this.magnifierDiv(),
                s = i.find("strong").empty(),
                r = i.find(".author").empty(),
                n = i.find(".category").empty(),
                a = i.find(".cost").empty(),
                o = t.attr("data-item-cost"),
                l = void 0 !== $(e).attr("data-item-cost");
            s.html(t.attr("data-item-name")), r.html(t.attr("data-item-author")), n.html(t.attr("data-item-category")), a.html(l ? this.price_prefix + o : o)
        }
    },
    TooltipMagnifier = objectWithPrototype(Magnifier, {
        magnifierDiv: function() {
            return $("div#tooltip-magnifier")
        },
        populateMagnifierFrom: function(e) {
            this.bindMetaData(e)
        }
    }),
    ImageMagnifier = objectWithPrototype(Magnifier, {
        populateMagnifierFrom: function(e) {
            let t;
            const i = this.magnifierDiv().find("div.size-limiter"),
                s = $(e);
            s.attr("data-preview-url") ? (t = new Image, $(t).attr("src", s.attr("data-preview-url")), s.attr("data-preview-height") && ($(t).attr("height", 350), $(t).attr("width", 350 / s.attr("data-preview-height") * s.attr("data-preview-width"))), i.empty(), i.append(t), i.show()) : i.hide(), this.bindMetaData(e)
        }
    }),
    VideoMagnifier = objectWithPrototype(Magnifier, {
        hoverID: 0,
        loggedEvents: {},
        initialize: function(e) {
            this.getDOMReferences(), this.addExtraHTML(), this.addEventListeners(e)
        },
        getDOMReferences: function() {
            this.$el = this.magnifierDiv(), this.$limiter = this.$el.find(".size-limiter")
        },
        addExtraHTML: function() {
            this.$fauxplayer = $("<div class='faux-player is-hidden'><img /></div>"), this.$img = this.$fauxplayer.find("img"), this.$limiter.append(this.$fauxplayer, "<div><div id='hover-video-preview'></div></div>")
        },
        addEventListeners: function(e) {
            const t = this;
            $(document).on("mouseenter", e, function() {
                t.hoverID++, t.showMagnifier(this)
            }), $(document).on("mouseleave", e, function() {
                t.hoverID++, t.$el.css("left", ""), t.stopVideo()
            })
        },
        magnifierDiv: function() {
            return $("#video-magnifier")
        },
        populateMagnifierFrom: function(e) {
            this.data = $(e).data(), this.bindMetaData(e), this.loadVideo()
        },
        stopVideo: function() {
            if (this._loadingVideoUrl = null, this.playerAPIReady) {
                const e = videojs("hover-videojs-preview");
                e.poster(""), e.pause()
            }
        },
        loadVideo: function() {
            const e = this.hoverID,
                t = this,
                i = this.data,
                {
                    videoFileUrl: s,
                    previewUrl: r
                } = i;
            s ? this._loadingVideoUrl !== s && (this._loadingVideoUrl = s, this.playerAPIReady || this.showFauxPlayer(r), this.registerVideoJSPlayer().done(function(i) {
                t.injectVideoJSPlayer(i, s, r).done(function() {
                    t.hoverID === e && (t.hideFauxPlayer(), t.videoJSPlay(s, r))
                })
            })) : this.showFauxPlayer(r)
        },
        showFauxPlayer: function(e) {
            this.$fauxplayer.removeClass("is-hidden"), this.$img.attr("src", e)
        },
        hideFauxPlayer: function() {
            this.$fauxplayer.addClass("is-hidden")
        },
        registerVideoJSPlayer: function() {
            return Market.DOMUtils.getVideoJSPlayerManager().register()
        },
        loopVideo: function(e) {
            e.currentTime(0), e.play()
        },
        injectVideoJSPlayer: function(e, t, i) {
            const s = this;
            if (this.playerInjection) return this.playerInjection; {
                this.playerInjection = new $.Deferred, this.$limiter.append(this.$fauxplayer, '<video id="hover-videojs-preview" class="video-js vjs-default-skin" preload="metadata"></video>');
                const e = videojs("hover-videojs-preview", {
                    poster: i,
                    fluid: !0,
                    width: 472,
                    height: 264
                });
                return e.ready(function() {
                    s.playerAPIReady = !0, s.playerInjection.resolve()
                }), e.on("ended", function() {
                    s.videoJSLooped = !0, s.loopVideo(this)
                }), this.playerInjection
            }
        },
        isVideoMuted: function() {
            const e = document.querySelectorAll(".js-.search-facet-video-mute-toggler__checkbox");
            return "true" === $.cookie("search_videos_muted") && e.length
        },
        videoJSPlay: function(e, t) {
            const i = this,
                s = videojs("hover-videojs-preview"),
                r = this.isVideoMuted() ? 0 : 1;
            this.videoJSLooped = !1, e ? (s.poster(t), s.src(e), s.volume(r), s.play().catch(function(e) {
                console.debug("VideoMagnifier: Autoplay prevented by browser policy", e.name), i.showFauxPlayer(t)
            })) : this.showFauxPlayer(t)
        }
    }),
    LandscapeImageMagnifier = objectWithPrototype(ImageMagnifier, {
        magnifierDiv: function() {
            return $("div#landscape-image-magnifier")
        }
    }),
    SquareImageMagnifier = objectWithPrototype(ImageMagnifier, {
        magnifierDiv: function() {
            return $("div#square-image-magnifier")
        }
    }),
    SmartImageMagnifier = objectWithPrototype(ImageMagnifier, {
        magnifierDiv: function() {
            return $("div#smart-image-magnifier")
        },
        populateMagnifierFrom: function(e) {
            const t = this.magnifierDiv(),
                i = t.find("div.size-limiter").empty(),
                s = t.find("strong"),
                r = new Image;
            $(r).attr("src", $(e).attr("data-preview-url"));
            const n = parseInt($(e).attr("data-preview-height"), 10),
                a = parseInt($(e).attr("data-preview-width"), 10);
            let o, l;
            if ($(i).empty(), $(i).css("height", ""), $(i).css("width", ""), $(t).removeClass("previewable"), n * a > 0) {
                if (n > a ? (o = 350, l = 350 / n * a) : (l = 350, o = 350 / a * n), $(r).attr("height", o), $(r).attr("width", l), s.css("width", l), t.css("width", l), $(i).css("height", o), $(i).css("width", l), !$(e).hasClass("no_preview")) {
                    $(t).addClass("previewable");
                    const s = $(e).clone();
                    s.addClass("thumbnail_preview").attr("width", l).attr("height", o), $(i).append(s)
                }
                $(i).show()
            } else $(r).attr("height", 225);
            $(i).append(r), this.bindMetaData(e)
        }
    }),
    PortraitImageMagnifier = objectWithPrototype(ImageMagnifier, {
        magnifierDiv: function() {
            return $("div#portrait-image-magnifier")
        }
    });
Market.DOMUtils.setupMagnifiers = function() {
        TooltipMagnifier.magnify(".tooltip-magnifier"), LandscapeImageMagnifier.magnify("img.landscape-image-magnifier"), SquareImageMagnifier.magnify("img.square-image-magnifier"), SmartImageMagnifier.magnify("img.smart-image-magnifier"), PortraitImageMagnifier.magnify("img.portrait-image-magnifier"), VideoMagnifier.initialize("img.video-image-magnifier")
    }, Views.App = class {
        constructor(e) {
            Market.DOMUtils.setupResponsiveness(), Market.DOMUtils.setupMiniAudioPlayer(), Market.DOMUtils.legacyDisableFormOnSubmit(), Market.DOMUtils.setupMagnifiers()
        }
    }, Market.Helpers.easeInSine = (e, t, i, s) => -i * Math.cos(e / s * (Math.PI / 2)) + i + t, Market.DOMUtils.AsyncForm = class {
        constructor(e, t) {
            this.checkJobStatus = this.checkJobStatus.bind(this), this.$form = e;
            const i = {
                submitButton: this.$form.find("button[type=submit], input[type=submit]"),
                postingText: "Submitting...",
                postedText: "Processing...",
                retryText: "Retry Submit",
                pollTimeoutMessage: "The upload processing timed out.\n\nThis may happen because of a temporary backend issue, or because the files being uploaded are too big or numerous for our system to quickly process.\n\nPlease try reducing the size/number of preview screenshots or try again later. If the issue persists, please contact Envato Help.",
                submitErrorMessage: "Something went wrong while submitting the form. Please try again.",
                submitUrl: this.$form.attr("action"),
                returnUrl: this.$form.attr("data-job-return-url") || this.$form.attr("action"),
                jobStatusUrl: "/async_jobs/status",
                onSubmit: () => {
                    this.submitButton.text(this.options.postingText)
                },
                onSubmitFailure: () => {
                    alert(this.options.submitErrorMessage), this.submitButton.text(this.options.retryText), this.submitButton.prop("disabled", !1)
                },
                onSubmitted: () => {
                    this.submitButton.text(this.options.postedText)
                },
                onPollTimeout: () => {
                    alert(this.options.pollTimeoutMessage), this.submitButton.text(this.options.retryText), this.submitButton.prop("disabled", !1)
                },
                onJobComplete: () => {
                    const e = new URL(this.options.returnUrl, window.location);
                    e.searchParams.set("job_id", this.jobID), window.location.href = e.href
                },
                maxTries: 50,
                initialWait: 1500,
                maxWait: 26500
            };
            this.tries = 0, this.options = $.extend(i, t || {}), this.submitButton = this.options.submitButton, this.bindSubmitEvent(), this.completed = !1
        }
        bindSubmitEvent() {
            this.$form.on({
                submit: () => (this.options.onSubmit(), $.ajax({
                    type: "POST",
                    url: this.options.submitUrl,
                    data: this.$form.serialize()
                }).then(e => {
                    this.options.onSubmitted(), this.jobID = e.job_id, setTimeout(this.checkJobStatus, this.options.initialWait)
                }).catch(() => {
                    this.options.onSubmitFailure()
                }), !1)
            })
        }
        checkJobStatus() {
            $.ajax({
                type: "GET",
                url: this.options.jobStatusUrl,
                data: {
                    job_id: this.jobID
                }
            }).then(e => {
                e.complete && (this.completed = !0, this.options.onJobComplete())
            }).always(() => {
                this.completed || (this.tries++ < this.options.maxTries ? setTimeout(this.checkJobStatus, this.calculateWaitTime(this.tries)) : (this.tries = 0, this.options.onPollTimeout()))
            })
        }
        calculateWaitTime(e) {
            return Market.Helpers.easeInSine(e, this.options.initialWait, this.options.maxWait, this.options.maxTries)
        }
    }, Views.AsyncForm = class {
        constructor(e) {
            new Market.DOMUtils.AsyncForm(e, () => ({
                postingText: "Uploading...",
                retryText: "Retry upload",
                errorAlertText: "Something went wrong. Please try uploading again."
            }))
        }
    }, Views.AuthorContactDetailsDisplay = class {
        constructor(e) {
            this.$el = e, this.dom = {
                $container: this.$el,
                $authorContactDetailsDisplay: this.$el.find(".js-author-contact-details-display")
            }, this.dom.$authorContactDetailsDisplay.on("click", () => {
                const e = this.dom.$authorContactDetailsDisplay.data("authorContactDetailsUrl");
                $.get(`${e}`, e => {
                    const t = $(e).data("redirect-url");
                    t ? window.open(t, "_blank") : Market.DOMUtils.getModalInstance().show(e, !0)
                })
            })
        }
    }, Views.AuthorDrivenPricingCalculator = class {
        constructor(e, t = null) {
            this.POPUP_TOP_OFFSET = 30, this.POPUP_LEFT_OFFSET = 100, this.$el = e, this.dom = {
                $switch: this.$el.find(".js-.adp__switch"),
                $popup: this.$el.find(".js-.adp__popup"),
                $purchasePrice: this.$el.find(".js-.adp__purchase-price"),
                $buyerFee: this.$el.find(".js-.adp__buyer-fee"),
                $authorFee: this.$el.find(".js-.adp__author-fee"),
                $earnings: this.$el.find(".js-.adp__earnings"),
                $closeButton: this.$el.find(".js-.adp__popup-close"),
                $discountPrice: $(".item-discount-form .js-.discounted-item-price"),
                $discountPercentage: $(".item-discount-form .js-.discount-percentage")
            }, this.purchasePriceVal = this.dom.$purchasePrice.val(), this.authorFeePercent = 100 * this.$el.parent().parent(".license-pricing").first().data().authorFeeRate, this.buyerFeeVal = this.dom.$popup.data("buyerFee"), this._initializeFields(), this.dom.$switch.on("click", this.handleSwitch.bind(this)), this.dom.$purchasePrice.on("keydown", this.handleDecimalInput.bind(this)), this.dom.$purchasePrice.on("keyup change mouseup", this.handlePriceChange.bind(this)), this.dom.$closeButton.on("click", this.closePopup.bind(this)), this.dom.$discountPrice.on("change", this.handleDiscountPriceChange.bind(this)), this.dom.$discountPercentage.on("change", this.handleDiscountPercentageChange.bind(this))
        }
        handleSwitch(e) {
            e.preventDefault(), this.handlePriceChange(), this.positionPopup(e)
        }
        handleDecimalInput(e) {
            if (190 === e.keyCode) return !1
        }
        handleDiscountPercentageChange(e) {
            const t = parseInt(this.buyerFeeVal, 10),
                i = Math.floor(+this.dom.$discountPercentage.val()),
                s = $(".item-discount-form .js-license-pricing__purchase-price").html(),
                r = parseInt(s, 10),
                n = Math.floor(r / 100 * (100 - i) - t);
            this.purchasePriceVal = n + t, this._handleEarningsUpdate(), this._handleUpdateDiscountPurchasePrice()
        }
        handleDiscountPriceChange(e) {
            this.purchasePriceVal = parseInt(e.target.value, 10) + parseInt(this.buyerFeeVal, 10), this._handleEarningsUpdate(), this._handleUpdateDiscountPurchasePrice()
        }
        _handleUpdateDiscountPurchasePrice() {
            this.dom.$purchasePrice.val(this.purchasePriceVal), this.dom.$purchasePrice.trigger("change")
        }
        handlePriceChange(e) {
            this._updatePurchasePrice(), this._handleEarningsUpdate()
        }
        _handleEarningsUpdate() {
            let e = this._computeEarnings(this.buyerFeeVal, this.authorFeePercent);
            e < 0 && (e = 0), this.dom.$earnings.val(e)
        }
        positionPopup(e) {
            const t = $(e.currentTarget).offset(),
                i = this.dom.$popup;
            i.toggle(), i.appendTo("body"), i.offset({
                top: t.top + this.POPUP_TOP_OFFSET,
                left: t.left + this.POPUP_LEFT_OFFSET
            })
        }
        closePopup(e) {
            this.dom.$popup.hide()
        }
        _initializeFields() {
            const e = this.$el.parent(".js-license-pricing__calculator").find(".js-license-pricing__purchase-price").html();
            this.dom.$purchasePrice.val(e), this.dom.$authorFee.val(this.authorFeePercent), this.dom.$buyerFee.html(this.buyerFeeVal), this.handlePriceChange()
        }
        _updatePurchasePrice() {
            this.purchasePriceVal = this.dom.$purchasePrice.val()
        }
        _computeEarnings() {
            const e = this.purchasePriceVal - this.buyerFeeVal;
            return e - (.01 * this.authorFeePercent * e).toFixed(2)
        }
    }, Views.BadgeExposer = class {
        constructor(e) {
            e.on("click", function(t) {
                t.preventDefault(), e.siblings(".badges").find(".hidden").removeClass("hidden"), e.remove()
            })
        }
    }, Views.BadgeManager = class {
        constructor(e) {
            const t = e.data("jqueryUiPath");
            Market.Helpers.touchDetection.isHoverPrimaryDevice() && loadjs([t], () => {
                const e = $("#badge-manager-list").addClass("dragging"),
                    t = $("#choices");
                e.sortable({
                    update(i, s) {
                        t.val(e.sortable("toArray").join("::"))
                    }
                }), t.val(e.sortable("toArray").join("::"))
            })
        }
    }, Views.BookmarkDescription = class {
        constructor(e) {
            this.showForm = this.showForm.bind(this), this.hideForm = this.hideForm.bind(this), this.submitForm = this.submitForm.bind(this), this.onSubmitSuccess = this.onSubmitSuccess.bind(this), this.onSubmitFailure = this.onSubmitFailure.bind(this), this.$el = e, this.dontHideOnBlur = !1, this.dom = {
                $form: this.$el.find(".js-edit-description-form"),
                $add: this.$el.find(".js-add-description"),
                $edit: this.$el.find(".js-edit-description"),
                $description: this.$el.find(".js-description"),
                $descriptionField: this.$el.find(".js-description-field"),
                $descriptionError: this.$el.find(".js-description-error"),
                $descriptionSubmit: this.$el.find(".js-description-submit"),
                $descriptionSpinner: this.$el.find(".js-description-spinner")
            }, this.dom.$add.on("click", this.showForm), this.dom.$edit.on("click", this.showForm), this.dom.$form.on("submit", this.submitForm), this.dom.$descriptionField.on("blur", this.hideForm), this.dom.$descriptionSubmit.on("mousedown touchstart", () => {
                this.dontHideOnBlur = !0
            })
        }
        showForm(e) {
            e.preventDefault(), this.dom.$add.addClass("is-hidden"), this.dom.$edit.addClass("is-hidden"), this.dom.$form.removeClass("is-hidden"), this.dom.$descriptionField.focus()
        }
        hideForm(e) {
            this.dontHideOnBlur ? this.dontHideOnBlur = !1 : (e.preventDefault(), this.dom.$form.addClass("is-hidden"), this.dom.$description.is(":empty") ? this.dom.$add.removeClass("is-hidden") : this.dom.$edit.removeClass("is-hidden"))
        }
        submitForm(e) {
            e.preventDefault(), this.showSpinner(), $.ajax({
                url: this.dom.$form.attr("action"),
                type: "PUT",
                data: this.dom.$form.serialize()
            }).then(e => {
                if (!e.success) return Promise.reject(e);
                this.onSubmitSuccess(e)
            }).catch(this.onSubmitFailure)
        }
        onSubmitSuccess(e) {
            this.hideSpinner(), e && e.success ? (this.dom.$form.addClass("is-hidden"), this.hideError(), e.bookmark_description ? (this.dom.$description.text(e.bookmark_description), this.dom.$edit.removeClass("is-hidden")) : (this.dom.$description.text(""),
                this.dom.$add.removeClass("is-hidden"))) : this.onSubmitFailure(e)
        }
        onSubmitFailure(e) {
            this.hideSpinner();
            const t = this.extractErrorMessage(e);
            this.showError(t)
        }
        showError(e) {
            this.dom.$descriptionError.text(e), this.dom.$descriptionError.removeClass("is-hidden"), this.dom.$descriptionField.addClass("is-error"), this.dom.$descriptionField.focus()
        }
        hideError() {
            this.dom.$descriptionError.addClass("is-hidden"), this.dom.$descriptionField.removeClass("is-error"), this.dom.$descriptionError.empty()
        }
        showSpinner() {
            this.dom.$descriptionSpinner.removeClass("is-hidden")
        }
        hideSpinner() {
            this.dom.$descriptionSpinner.addClass("is-hidden")
        }
        extractErrorMessage(e) {
            return e && !e.success && e.errors ? `Error: ${e.errors.toString()}` : e && e.statusText ? `Error: ${e.status} ${e.statusText.toString()}` : "Unknown error"
        }
    }, Views.CategorySelectWatcher = class {
        constructor() {
            const e = $("#upload_file_type").val();
            $("#category").change(function() {
                const t = $(this).data("id"),
                    i = $(this).val();
                $("#attribute_fields, #licenses").addClass("js-category-select-watcher-replacing"), $.ajax({
                    url: "/content/upload/category_select_changed",
                    data: $.param({
                        category: i,
                        id: t,
                        type: e
                    }),
                    dataType: "html",
                    type: "post"
                }).then(e => {
                    $("#attribute_fields").replaceWith(e), viewloader.execute(Views, $("#attribute_fields")), $("#attribute_fields").removeClass("js-category-select-watcher-replacing")
                }), $.ajax({
                    url: "/content/upload/licenses_for_category_select_changed",
                    data: $.param({
                        category: i,
                        id: t,
                        type: e
                    }),
                    dataType: "html",
                    type: "post"
                }).then(e => {
                    $("#licenses").replaceWith(e), viewloader.execute(Views, $("#licenses")), $("#licenses").removeClass("js-category-select-watcher-replacing")
                })
            })
        }
    }, Market.DOMUtils.CategoryTree = function() {
        return {
            setupCategoryTree: function(e) {
                $("a", e).each(function() {
                    if ($("li", $("> ul", $(this).parent())).length) {
                        $(this).parent().addClass("expandable")
                    }
                })
            },
            open_next: function(e, t) {
                const i = $(e),
                    s = $(t);
                let r = $("ul", s);
                const n = $("> ul", i.parent()).children().clone();
                i.hasClass("all-category") || 0 === $("li", $("> ul", i.parent())).length || (i.parent().parent().find(".active").removeClass("active"), i.parent().addClass("active"), s.removeClass("empty"), r.empty(), $("ul", s).length || (r = $("<ul></ul>"), s.append(r)), r.append('<li><a href="' + e.get(0) + '" class="all-category">All ' + $(e.get(0)).html() + "</a></li>"), r.append(n), r.is(":empty") && (r.remove(), s.addClass("empty")))
            }
        }
    }, Views.CategoryTreeExplorer = class {
        constructor() {
            const e = new Market.DOMUtils.CategoryTree;
            e.setupCategoryTree("#first");
            const t = $(".grid-container");
            $("#first ul:first li").on("click", function() {
                $("#second").empty(), e.open_next($("a", this).first(), "#second"), $("#third").empty().addClass("empty"), $("#fourth").empty().addClass("empty")
            }), t.on("click", "#second li", function() {
                e.open_next($("a", this).first(), "#third"), $("#fourth").empty().addClass("empty")
            }), t.on("click", "#third li", function() {
                e.open_next($("a", this).first(), "#fourth")
            }), $("li.expandable > a").on("click", function() {
                return $(this).parent().trigger("click"), !1
            }), t.on("click", "li.expandable > a", function() {
                return $(this).parent().trigger("click"), !1
            })
        }
    },
    function(e) {
        "use strict";
        e.ajaxPrefilter(function(e) {
            if (e.iframe) return e.originalURL = e.url, "iframe"
        }), e.ajaxTransport("iframe", function(t, i, s) {
            function r() {
                l.each(function(t, i) {
                    var s = e(i);
                    s.data("clone").replaceWith(s)
                }), n.remove(), a.one("load", function() {
                    a.remove()
                }), a.attr("src", "about:blank")
            }
            var n = null,
                a = null,
                o = "iframe-" + e.now(),
                l = e(t.files).filter(":file:enabled"),
                c = null;
            if (t.dataTypes.shift(), t.data = i.data, l.length) return n = e("<form enctype='multipart/form-data' method='post'></form>").hide().attr({
                action: t.originalURL,
                target: o
            }), "string" == typeof t.data && t.data.length > 0 && e.error("data must not be serialized"), e.each(t.data || {}, function(t, i) {
                e.isPlainObject(i) && (t = i.name, i = i.value), e("<input type='hidden' />").attr({
                    name: t,
                    value: i
                }).appendTo(n)
            }), e("<input type='hidden' value='IFrame' name='X-Requested-With' />").appendTo(n), c = t.dataTypes[0] && t.accepts[t.dataTypes[0]] ? t.accepts[t.dataTypes[0]] + ("*" !== t.dataTypes[0] ? ", */*; q=0.01" : "") : t.accepts["*"], e("<input type='hidden' name='X-HTTP-Accept'>").attr("value", c).appendTo(n), l.after(function() {
                var t = e(this),
                    i = t.clone().prop("disabled", !0);
                return t.data("clone", i), i
            }).next(), l.appendTo(n), {
                send: function(t, i) {
                    (a = e("<iframe src='about:blank' name='" + o + "' id='" + o + "' style='display:none'></iframe>")).one("load", function() {
                        a.one("load", function() {
                            var e = this.contentWindow ? this.contentWindow.document : this.contentDocument ? this.contentDocument : this.document,
                                t = e.documentElement ? e.documentElement : e.body,
                                n = t.getElementsByTagName("textarea")[0],
                                a = n && n.getAttribute("data-type") || null,
                                o = n && n.getAttribute("data-status") || 200,
                                l = n && n.getAttribute("data-statusText") || "OK",
                                c = {
                                    text: a ? n.value : t ? t.textContent || t.innerText : null
                                };
                            r(), s.responseText || (s.responseText = c.text), i(o, l, c, a ? "Content-Type: " + a : null)
                        }), n[0].submit()
                    }), e("body").append(n, a)
                },
                abort: function() {
                    null !== a && (a.unbind("load").attr("src", "about:blank"), r())
                }
            }
        })
    }(jQuery),
    function(e) {
        var t;
        e.remotipart = t = {
            setup: function(i) {
                var s = i.data("ujs:submit-button"),
                    r = e('meta[name="csrf-param"]').attr("content"),
                    n = e('meta[name="csrf-token"]').attr("content"),
                    a = i.find('input[name="' + r + '"]').length;
                i.one("ajax:beforeSend.remotipart", function(o, l, c) {
                    return delete c.beforeSend, c.iframe = !0, c.files = e(e.rails.fileInputSelector, i), c.data = i.serializeArray(), s && c.data.push(s), c.files.each(function(e, t) {
                        for (var i = c.data.length - 1; i >= 0; i--) c.data[i].name == t.name && c.data.splice(i, 1)
                    }), c.processData = !1, void 0 === c.dataType && (c.dataType = "script *"), c.data.push({
                        name: "remotipart_submitted",
                        value: !0
                    }), n && r && !a && c.data.push({
                        name: r,
                        value: n
                    }), e.rails.fire(i, "ajax:remotipartSubmit", [l, c]) && (e.rails.ajax(c).always(function(t) {
                        e.rails.fire(i, "ajax:remotipartComplete", [t])
                    }), setTimeout(function() {
                        e.rails.disableFormElements(i)
                    }, 20)), t.teardown(i), !1
                }).data("remotipartSubmitted", !0)
            },
            teardown: function(e) {
                e.unbind("ajax:beforeSend.remotipart").removeData("remotipartSubmitted")
            }
        }, e(document).on("ajax:aborted:file", "form", function() {
            var i = e(this);
            return t.setup(i), e.rails.handleRemote(i), !1
        })
    }(jQuery), Market.DOMUtils.uploadInputFileName = function(e) {
        this.$el = e;
        return this.$el.val().match(/([^/\\]+)$/)[1]
    }, Views.CollectionForm = class {
        constructor(e) {
            this.$el = e, this.$formNew = this.$el.find(".js-collection-form--new"), this.$formUpdate = this.$el.find(".js-collection-form--update"), this.$formRadios = this.$el.find(".js-collection-form-radios input"), this.$formError = this.$el.find(".js-collection-form-error"), this.$formFileUpload = this.$el.find(".js-collection-file-upload"), this.$formFilename = this.$el.find(".js-collection-form-filename"), this.$formSubmit = this.$el.find(".js-collection-form-submit"), this.modal = $.magnificPopup.instance, this.$formNew.on("ajax:beforeSend", this.createBeforeSend.bind(this)), this.$formNew.on("ajax:success", this.createSuccess.bind(this)), this.$formNew.on("ajax:error", this.createError.bind(this)), this.$formUpdate.on("ajax:beforeSend", this.updateBeforeSend.bind(this)), this.$formUpdate.on("ajax:success", this.updateSuccess.bind(this)), this.$formUpdate.on("ajax:error", this.updateError.bind(this)), this.$formNew.add(this.$formUpdate).on("change", ".js-collection-file-upload", this.handleFileUpload.bind(this))
        }
        createBeforeSend(e, t, i) {
            this.render("updating", e.target)
        }
        createSuccess(e, t, i, s) {
            "ok" === t.status ? this.render("new", e.target, t) : this.render("validationError", e.target, t)
        }
        createError(e, t, i, s) {
            this.render("error", e.target, t)
        }
        updateBeforeSend(e, t, i) {
            this.render("updating", e.target)
        }
        updateSuccess(e, t, i, s) {
            "ok" === t.status ? this.render("updated", e.target, t) : this.render("validationError", e.target, t)
        }
        updateError(e, t, i, s) {
            this.render("error", e.target, t)
        }
        render(e, t, i) {
            switch (e) {
                case "updating":
                    this.$formError.addClass("is-hidden").html("");
                    break;
                case "new":
                    this.$formSubmit.removeAttr("data-disable-with"), location.href = i.collection_url;
                    break;
                case "updated":
                    {
                        const e = $("#collection-" + i.collection_id);e && (e.replaceWith(i.partial), viewloader.execute(Views, $(".js-collection-list"))),
                        this.modal.close();
                        break
                    }
                case "validationError":
                    this.$formError.removeClass("is-hidden").html(i.errors);
                    break;
                case "error":
                    this.$formError.removeClass("is-hidden").html("Sorry something went wrong")
            }
        }
        handleFileUpload(e) {
            const t = Market.DOMUtils.uploadInputFileName($(e.target));
            this.$formFilename.html(t)
        }
    }, Views.CollectionShare = class {
        constructor(e) {
            this.$el = e, this.$el.on("ajax:success", ".js-collection-share", this.shareSuccess.bind(this)), this.$el.on("ajax:error", ".js-collection-share", this.shareError.bind(this)), this.$el.on("ajax:success", ".js-collection-share-revoke", this.revokeSuccess.bind(this)), this.$el.on("ajax:error", ".js-collection-share-revoke", this.revokeError.bind(this))
        }
        shareSuccess(e, t, i, s) {
            this.render("success", e.target, t)
        }
        shareError(e, t, i, s) {
            this.render("error", e.target, t)
        }
        revokeSuccess(e, t, i, s) {
            this.render("success", e.target, t)
        }
        revokeError(e, t, i, s) {
            this.render("error", e.target, t)
        }
        render(e, t, i) {
            switch (e) {
                case "success":
                    this.$el.html(i.partial), viewloader.execute(Views, $(".mfp-wrap"));
                    break;
                case "error":
                    this.$el.addClass("is-error")
            }
        }
    },
    function(e) {
        var t, i = {
                className: "autosizejs",
                id: "autosizejs",
                append: "\n",
                callback: !1,
                resizeDelay: 10,
                placeholder: !0
            },
            s = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent", "whiteSpace"],
            r = e('<textarea tabindex="-1"/>').data("autosize", !0)[0];
        r.style.cssText = "position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;", r.style.lineHeight = "99px", "99px" === e(r).css("lineHeight") && s.push("lineHeight"), r.style.lineHeight = "", e.fn.autosize = function(n) {
            return this.length ? (n = e.extend({}, i, n || {}), r.parentNode !== document.body && e(document.body).append(r), this.each(function() {
                function i() {
                    var t, i = window.getComputedStyle ? window.getComputedStyle(d, null) : null;
                    i ? (t = parseFloat(i.width), "border-box" !== i.boxSizing && "border-box" !== i.webkitBoxSizing && "border-box" !== i.mozBoxSizing || e.each(["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], function(e, s) {
                        t -= parseFloat(i[s])
                    })) : t = p.width(), r.style.width = Math.max(t, 0) + "px"
                }

                function a() {
                    var a = {};
                    if (t = d, r.className = n.className, r.id = n.id, c = parseFloat(p.css("maxHeight")), e.each(s, function(e, t) {
                            a[t] = p.css(t)
                        }), e(r).css(a).attr("wrap", p.attr("wrap")), i(), window.chrome) {
                        var o = d.style.width;
                        d.style.width = "0px";
                        d.offsetWidth;
                        d.style.width = o
                    }
                }

                function o() {
                    var e, s;
                    t !== d ? a() : i(), !d.value && n.placeholder ? r.value = p.attr("placeholder") || "" : r.value = d.value, r.value += n.append || "", r.style.overflowY = d.style.overflowY, s = parseFloat(d.style.height) || 0, r.scrollTop = 0, r.scrollTop = 9e4, e = r.scrollTop, c && e > c ? (d.style.overflowY = "scroll", e = c) : (d.style.overflowY = "hidden", e < u && (e = u)), e += f, Math.abs(s - e) > .01 && (d.style.height = e + "px", r.className = r.className, m && n.callback.call(d, d), p.trigger("autosize.resized"))
                }

                function l() {
                    clearTimeout(h), h = setTimeout(function() {
                        var e = p.width();
                        e !== v && (v = e, o())
                    }, parseInt(n.resizeDelay, 10))
                }
                var c, u, h, d = this,
                    p = e(d),
                    f = 0,
                    m = e.isFunction(n.callback),
                    g = {
                        height: d.style.height,
                        overflow: d.style.overflow,
                        overflowY: d.style.overflowY,
                        wordWrap: d.style.wordWrap,
                        resize: d.style.resize
                    },
                    v = p.width(),
                    y = p.css("resize");
                p.data("autosize") || (p.data("autosize", !0), "border-box" !== p.css("box-sizing") && "border-box" !== p.css("-moz-box-sizing") && "border-box" !== p.css("-webkit-box-sizing") || (f = p.outerHeight() - p.height()), u = Math.max(parseFloat(p.css("minHeight")) - f || 0, p.height()), p.css({
                    overflow: "hidden",
                    overflowY: "hidden",
                    wordWrap: "break-word"
                }), "vertical" === y ? p.css("resize", "none") : "both" === y && p.css("resize", "horizontal"), "onpropertychange" in d ? "oninput" in d ? p.on("input.autosize keyup.autosize", o) : p.on("propertychange.autosize", function() {
                    "value" === event.propertyName && o()
                }) : p.on("input.autosize", o), !1 !== n.resizeDelay && e(window).on("resize.autosize", l), p.on("autosize.resize", o), p.on("autosize.resizeIncludeStyle", function() {
                    t = null, o()
                }), p.on("autosize.destroy", function() {
                    t = null, clearTimeout(h), e(window).off("resize", l), p.off("autosize").off(".autosize").css(g).removeData("autosize")
                }), o())
            })) : this
        }
    }(jQuery || $), Market.DOMUtils.InsertPartial = function(e, t) {
        const i = {
                container: ".insert-partial-container",
                complete: null,
                error: null,
                loadingClass: "is-loading"
            },
            s = $.extend({}, i, t),
            r = $(s.container);
        r.empty().addClass(s.loadingClass), $.ajax({
            dataType: "html",
            url: e
        }).then(e => {
            r.removeClass(s.loadingClass), "string" == typeof e && r.html(e), "function" == typeof s.complete && s.complete()
        }, () => {
            "function" == typeof s.error && s.error()
        })
    }, Views.CommentList = class {
        constructor() {
            this.classes = {
                hidden: "is-hidden",
                loading: "is-loading",
                newReplyLoading: "comment__new-reply--is-loading",
                markRead: "e-icon -icon-circle-empty",
                markUnread: "e-icon -icon-circle-full"
            }, this.selectors = {
                cancelButton: ".complaint-form__cancel, .js-comment-cancel",
                discussion: ".js-discussion",
                comment: ".js-comment",
                commentContent: ".js-comment-content",
                commentTools: ".js-comment-tools",
                editField: "textarea",
                editForm: ".js-edit-comment-form",
                editLink: ".js-comment-edit",
                flagLink: ".js-post-flag",
                markCommentForm: ".js-comment-mark",
                markButton: ".js-post-mark",
                injectTarget: ".js-inject-target",
                newReply: ".js-comment-new-reply",
                newReplyField: ".js-comment-new-reply-field",
                newReplyForm: ".js-comment-reply-form",
                replyForm: ".js-comment-reply-form",
                commentBody: ".js-comment__body",
                commentFilter: "#filter"
            }, $(".js-discussion").each(function() {
                const e = $(this);
                e.find(".exposer").one("click", function(t) {
                    t.preventDefault(), e.find(".is-hidden").removeClass("is-hidden"), $(this).parent().remove()
                })
            });
            const e = $(document);
            this.escaping = Market.Helpers.FormEscaping, e.on("ajax:before", this.selectors.newReplyForm, this.newBefore.bind(this)), e.on("ajax:success", this.selectors.newReplyForm, this.newSuccess.bind(this)), e.on("ajax:error", this.selectors.newReplyForm, this.newError.bind(this)), e.on("ajax:complete", this.selectors.newReplyForm, this.escaping.onCompleteCleanup(this.selectors.newReplyField)), e.on("click", this.selectors.editLink, this.editFetchForm.bind(this)), e.on("ajax:before", this.selectors.editForm, this.editSubmit.bind(this)), e.on("ajax:success", this.selectors.editForm, this.editSuccess.bind(this)), e.on("ajax:error", this.selectors.editForm, this.editError.bind(this)), e.on("ajax:complete", this.selectors.editForm, this.escaping.onCompleteCleanup(this.selectors.editField)), e.on("click", this.selectors.flagLink, this.flagFetchForm.bind(this)), e.on("ajax:success", this.selectors.markCommentForm, this.markSuccess.bind(this)), e.on("click", this.selectors.cancelButton, this.cancel.bind(this)), $(this.selectors.newReplyField).autosize(), Market.Helpers.warnOnLeave()
        }
        newBefore(e) {
            const t = $(e.target),
                i = t.find(this.selectors.newReplyField),
                s = i.val();
            if (!this.validate(s)) return !1;
            this.escaping.escapeInHiddenCopyAndDisable(t, i, "base64_content"), t.closest(this.selectors.replyForm).addClass(this.classes.newReplyLoading)
        }
        newSuccess(e, t, i, s) {
            if ("ok" === t.status) {
                const i = $(e.target);
                i.closest(this.selectors.replyForm).removeClass(this.classes.newReplyLoading), i.find(this.selectors.newReplyField).val("").blur().trigger("autosize.resize");
                const s = $(t.partial).insertBefore(i.closest(this.selectors.newReply));
                viewloader.execute(Views, s)
            } else "error" === t.status && (window.location.href = t.redirect_to)
        }
        newError(e) {
            return e.target.submit()
        }
        editFetchForm(e) {
            e.preventDefault();
            const t = $(e.currentTarget).closest(this.selectors.comment);
            t.find(this.selectors.commentBody).addClass(this.classes.hidden), t.find(this.selectors.injectTarget).removeClass(this.classes.hidden), this.insertPartial(e.currentTarget.href, t)
        }
        editSubmit(e) {
            const t = $(e.target),
                i = t.find(this.selectors.editField),
                s = i.closest(this.selectors.comment),
                r = s.find(this.selectors.commentBody),
                n = i.val();
            if (!this.validate(n)) return !1;
            r.data("old", r.html()), this.escaping.escapeInHiddenCopyAndDisable(t, i, "base64_content"), i.closest(this.selectors.injectTarget).addClass(this.classes.hidden), s.find(this.selectors.commentContent).addClass(this.classes.loading), s.find(this.selectors.commentTools).addClass(this.classes.hidden)
        }
        editSuccess(e, t, i, s) {
            const r = $(e.target),
                n = r.closest(this.selectors.comment),
                a = n.find(this.selectors.commentBody);
            if ("ok" === t.status) n.find(this.selectors.commentTools).removeClass(this.classes.hidden), n.find(this.selectors.commentContent).removeClass(this.classes.loading), n.find(this.selectors.injectTarget).empty().addClass(this.classes.hidden), a.html(t.html).removeClass(this.classes.hidden);
            else if ("error" === t.status) return r.trigger("ajax:error", [null, null, t.error])
        }
        editError(e, t, i, s) {
            const r = "string" == typeof s ? s : "",
                n = $(e.target).closest(this.selectors.comment),
                a = n.find(this.selectors.commentBody);
            a.addClass(this.classes.hidden).html(a.data("old")), n.find(this.selectors.commentContent).removeClass(this.classes.loading), n.find(this.selectors.commentTools).removeClass(this.classes.hidden), n.find(this.selectors.injectTarget).prepend(`<strong class='comment-error'>Your comment was not updated. ${r}</strong>`).removeClass(this.classes.hidden)
        }
        flagFetchForm(e) {
            e.preventDefault();
            const t = $(e.currentTarget).closest(this.selectors.comment);
            t.find(this.selectors.injectTarget).removeClass(this.classes.hidden), this.insertPartial(e.currentTarget.href, t), t.find(this.selectors.commentBody).removeClass(this.classes.hidden)
        }
        markSuccess(e, t, i, s) {
            const r = $(e.target).find(this.selectors.markButton);
            t.new_title !== r.parent().attr("title") && (r.toggleClass(`${this.classes.markRead} ${this.classes.markUnread}`), r.parent().attr("title", t.new_title));
            const n = $(this.selectors.commentFilter).val();
            "unread" !== n && "unread-buyer" !== n || r.closest(this.selectors.discussion).slideUp()
        }
        cancel(e) {
            const t = $(e.target);
            t.closest(this.selectors.comment).find(this.selectors.commentBody).removeClass(this.classes.hidden), t.closest(this.selectors.injectTarget).addClass(this.classes.hidden).empty()
        }
        validate(e) {
            return "" !== e
        }
        insertPartial(e, t) {
            Market.DOMUtils.InsertPartial(e, {
                container: t.find(this.selectors.injectTarget),
                loadingClass: this.classes.loading,
                complete: () => t.find(this.selectors.editField).focus()
            })
        }
    }, Views.CommentListLegacy = class {
        constructor() {
            this.classes = {
                hidden: "is-hidden",
                loading: "is-loading",
                newReplyLoading: "comment__new-reply--is-loading",
                markRead: "e-icon -icon-circle-empty",
                markUnread: "e-icon -icon-circle-full"
            }, this.selectors = {
                cancelButton: ".complaint-form__cancel, .js-comment-cancel",
                discussion: ".js-discussion",
                comment: ".js-comment",
                commentContent: ".js-comment-content",
                commentTools: ".js-comment-tools",
                editField: "textarea",
                editForm: ".js-edit-comment-form",
                editLink: ".js-comment-edit",
                flagLink: ".js-post-flag",
                markCommentForm: ".js-comment-mark",
                markButton: ".js-post-mark",
                injectTarget: ".js-inject-target",
                newReply: ".js-comment-new-reply",
                newReplyField: ".js-comment-new-reply-field",
                newReplyForm: ".js-comment-reply-form form",
                replyForm: ".js-comment-reply-form",
                userHTML: ".user-html",
                commentFilter: "#filter"
            }, $(".js-discussion").each(function() {
                const e = $(this);
                e.find(".exposer").one("click", function(t) {
                    t.preventDefault(), e.find(".-hidden").removeClass("-hidden"), $(this).parent().remove()
                })
            });
            const e = $(document);
            this.escaping = Market.Helpers.FormEscaping, e.on("ajax:before", this.selectors.newReplyForm, this.newBefore.bind(this)), e.on("ajax:success", this.selectors.newReplyForm, this.newSuccess.bind(this)), e.on("ajax:error", this.selectors.newReplyForm, this.newError.bind(this)), e.on("ajax:complete", this.selectors.newReplyForm, this.escaping.onCompleteCleanup(this.selectors.newReplyField)), e.on("click", this.selectors.editLink, this.editFetchForm.bind(this)), e.on("ajax:before", this.selectors.editForm, this.editSubmit.bind(this)), e.on("ajax:success", this.selectors.editForm, this.editSuccess.bind(this)), e.on("ajax:error", this.selectors.editForm, this.editError.bind(this)), e.on("ajax:complete", this.selectors.editForm, this.escaping.onCompleteCleanup(this.selectors.editField)), e.on("click", this.selectors.flagLink, this.flagFetchForm.bind(this)), e.on("ajax:success", this.selectors.markCommentForm, this.markSuccess.bind(this)), e.on("click", this.selectors.cancelButton, this.cancel.bind(this)), $(this.selectors.newReplyField).autosize(), Market.Helpers.warnOnLeave()
        }
        newBefore(e) {
            const t = $(e.target),
                i = t.find(this.selectors.newReplyField),
                s = i.val();
            if (!this.validate(s)) return !1;
            this.escaping.escapeInHiddenCopyAndDisable(t, i, "base64_content"), t.closest(this.selectors.replyForm).addClass(this.classes.newReplyLoading)
        }
        newSuccess(e, t, i, s) {
            if ("ok" === t.status) {
                const i = $(e.target);
                i.closest(this.selectors.replyForm).removeClass(this.classes.newReplyLoading), i.find(this.selectors.newReplyField).val("").blur().trigger("autosize.resize");
                const s = $(t.partial).insertBefore(i.closest(this.selectors.newReply));
                viewloader.execute(Views, s)
            } else "error" === t.status && (window.location.href = t.redirect_to)
        }
        newError(e) {
            return e.target.submit()
        }
        editFetchForm(e) {
            e.preventDefault();
            const t = $(e.currentTarget).closest(this.selectors.comment);
            t.find(this.selectors.userHTML).addClass(this.classes.hidden), this.insertPartial(e.currentTarget.href, t)
        }
        editSubmit(e) {
            const t = $(e.target),
                i = t.find(this.selectors.editField),
                s = i.closest(this.selectors.comment),
                r = s.find(this.selectors.commentBody),
                n = i.val();
            if (!this.validate(n)) return !1;
            r.data("old", r.html()), this.escaping.escapeInHiddenCopyAndDisable(t, i, "base64_content"), i.closest(this.selectors.injectTarget).addClass(this.classes.hidden), s.find(this.selectors.commentContent).addClass(this.classes.loading), s.find(this.selectors.commentTools).addClass(this.classes.hidden)
        }
        editSuccess(e, t, i, s) {
            const r = $(e.target),
                n = r.closest(this.selectors.comment),
                a = n.find(this.selectors.userHTML);
            if ("ok" === t.status) n.find(this.selectors.commentTools).removeClass(this.classes.hidden), n.find(this.selectors.commentContent).removeClass(this.classes.loading), n.find(this.selectors.injectTarget).empty().removeClass(this.classes.hidden), a.html(t.html).removeClass(this.classes.hidden);
            else if ("error" === t.status) return r.trigger("ajax:error", [null, null, t.error])
        }
        editError(e, t, i, s) {
            const r = "string" == typeof s ? s : "",
                n = $(e.target).closest(this.selectors.comment),
                a = n.find(this.selectors.userHTML);
            a.addClass(this.classes.hidden).html(a.data("old")), n.find(this.selectors.commentContent).removeClass(this.classes.loading), n.find(this.selectors.commentTools).removeClass(this.classes.hidden), n.find(this.selectors.injectTarget).prepend(`<strong class='comment-error'>Your comment was not updated. ${r}</strong>`).removeClass(this.classes.hidden)
        }
        flagFetchForm(e) {
            e.preventDefault();
            const t = $(e.currentTarget).closest(this.selectors.comment);
            this.insertPartial(e.currentTarget.href, t), t.find(this.selectors.userHTML).removeClass(this.classes.hidden)
        }
        markSuccess(e, t, i, s) {
            const r = $(e.target).find(this.selectors.markButton);
            t.new_title !== r.parent().attr("title") && (r.toggleClass(`${this.classes.markRead} ${this.classes.markUnread}`), r.parent().attr("title", t.new_title));
            const n = $(this.selectors.commentFilter).val();
            "unread" !== n && "unread-buyer" !== n || r.closest(this.selectors.discussion).slideUp()
        }
        cancel(e) {
            const t = $(e.target);
            t.closest(this.selectors.comment).find(this.selectors.userHTML).removeClass(this.classes.hidden), t.closest(this.selectors.injectTarget).empty()
        }
        validate(e) {
            return "" !== e
        }
        insertPartial(e, t) {
            Market.DOMUtils.InsertPartial(e, {
                container: t.find(this.selectors.injectTarget),
                loadingClass: this.classes.loading,
                complete: () => t.find(this.selectors.editField).focus()
            })
        }
    }, Views.CommentsControls = class {
        constructor(e) {
            e.on("change", function(e) {
                const t = $(e.target).val();
                window.location.href = t
            })
        }
    }, Views.CondenseItemInfoPanel = class {
        constructor(e) {
            const t = 30,
                i = e.find(".js-meta-attributes-toggle"),
                s = i.find("a"),
                r = e.find(".js-condense-item-page-info-panel--documentation"),
                n = e.find(".js-condense-item-page-info-panel--last_update");
            if (e.hasClass("has-toggle")) {
                let a;
                a = r.length > 0 ? r.position().top + r.height() + t : n.position().top + n.height() + t, e.css("height", a + "px"), s.on("click", function(t) {
                    t.preventDefault(), e.toggleClass("is-expanded"), e.toggleClass("is-collapsed"), i.toggleClass("is-expanded"), e.hasClass("is-expanded") ? e.css("height", "auto") : (e.css("height", a + "px"), window.scrollTo(0, e.offset().top - 100))
                })
            }
        }
    },
    function() {
        function e() {
            const e = 615;
            document.body.scrollTop > e ? t.fadeIn(500) : t.fadeOut(500)
        }
        const t = $("#site-header-cta");
        if (!t) return window.removeEventListener("scroll", e), !1;
        window.addEventListener("scroll", e)
    }(), Views.DatePicker = class {
        constructor(e) {
            this.$el = e, this.dom = {
                $container: this.$el,
                $humanDate: this.$el.find(".js-date-picker__human-date"),
                $serverDate: this.$el.find(".js-date-picker__server-date")
            }, loadjs([this.dom.$container.data("jsPath"), this.dom.$container.data("cssPath")], () => {
                this.initialize()
            })
        }
        initialize() {
            this.earliestDate = moment(this.dom.$container.data("earliestDate")), this.latestDate = moment(this.dom.$container.data("latestDate")), this.constructDatePicker(this.dom.$humanDate, this.dom.$humanDate, this.dom.$serverDate)
        }
        constructDatePicker(e, t, i) {
            e.DatePicker({
                mode: "single",
                date: t.val(),
                current: t.val(),
                calendars: 1,
                starts: 1,
                position: "bottom",
                prev: "<",
                next: ">",
                onChange: s => {
                    t.val(this.humanFormat(s)), i.val(this.serverFormat(s)), e.DatePickerHide()
                }
            }), e.on("click", () => {
                e.DatePickerShow()
            })
        }
        humanFormat(e) {
            let t = this.dom.$container.data("humanFormat");
            return t || (t = "DD MMM YYYY"), moment(e).format(t)
        }
        serverFormat(e) {
            let t = this.dom.$container.data("serverFormat");
            return t || (t = "YYYY-MM-DD"), moment(e).format(t)
        }
        setDate(e) {
            this.dom.$humanDate.val(this.humanFormat(e)), this.dom.$serverDate.val(this.serverFormat(e))
        }
    }, Views.DateRangePicker = class {
        constructor(e) {
            this.$el = e, this.$datePickerStartDate = this.$el.find(".js-start-date"), this.$humanStartDate = this.$datePickerStartDate.find(".js-human-date"), this.$serverStartDate = this.$datePickerStartDate.find(".js-server-date"), this.$datePickerEndDate = this.$el.find(".js-end-date"), this.$humanEndDate = this.$datePickerEndDate.find(".js-human-date"), this.$serverEndDate = this.$datePickerEndDate.find(".js-server-date"), loadjs([this.$el.data("jsPath"), this.$el.data("cssPath")], {
                success: () => {
                    this.initialize()
                }
            })
        }
        initialize() {
            this.earliestDate = moment(this.$el.data("earliest-date")), this.latestDate = moment(this.$el.data("latest-date")), this.constructDatePicker(this.$datePickerStartDate, this.$humanStartDate, this.$serverStartDate), this.constructDatePicker(this.$datePickerEndDate, this.$humanEndDate, this.$serverEndDate)
        }
        constructDatePicker(e, t, i) {
            e.DatePicker({
                mode: "single",
                date: t.val(),
                current: t.val(),
                selectableDates: [this.earliestDate, this.latestDate],
                calendars: 1,
                starts: 1,
                position: "bottom",
                prev: "<",
                next: ">",
                onChange: s => {
                    t.val(this.humanFormat(s)), i.val(this.serverFormat(s)), e.DatePickerHide(), this.ensureDatesAreChronological()
                }
            }), e.on("click", () => {
                e.DatePickerShow()
            })
        }
        humanFormat(e) {
            return moment(e).format("DD MMM YYYY")
        }
        serverFormat(e) {
            return moment(e).format("YYYY-MM-DD")
        }
        ensureDatesAreChronological() {
            const e = moment(this.$serverStartDate.val()),
                t = moment(this.$serverEndDate.val());
            e.isAfter(t) && (this.setStartDate(t), this.setEndDate(e))
        }
        setStartDate(e) {
            this.$datePickerStartDate.DatePickerSetDate(e), this.$humanStartDate.val(this.humanFormat(e)), this.$serverStartDate.val(this.serverFormat(e))
        }
        setEndDate(e) {
            this.$datePickerEndDate.DatePickerSetDate(e), this.$humanEndDate.val(this.humanFormat(e)), this.$serverEndDate.val(this.serverFormat(e))
        }
    },
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function(e) {
        e.extend(e.fn, {
            validate: function(t) {
                if (this.length) {
                    var i = e.data(this[0], "validator");
                    return i || (this.attr("novalidate", "novalidate"), i = new e.validator(t, this[0]), e.data(this[0], "validator", i), i.settings.onsubmit && (this.on("click.validate", ":submit", function(t) {
                        i.submitButton = t.currentTarget, e(this).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== e(this).attr("formnovalidate") && (i.cancelSubmit = !0)
                    }), this.on("submit.validate", function(t) {
                        function s() {
                            var s, r;
                            return i.submitButton && (i.settings.submitHandler || i.formSubmitted) && (s = e("<input type='hidden'/>").attr("name", i.submitButton.name).val(e(i.submitButton).val()).appendTo(i.currentForm)), !(i.settings.submitHandler && !i.settings.debug) || (r = i.settings.submitHandler.call(i, i.currentForm, t), s && s.remove(), void 0 !== r && r)
                        }
                        return i.settings.debug && t.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, s()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : s() : (i.focusInvalid(), !1)
                    })), i)
                }
                t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
            },
            valid: function() {
                var t, i, s;
                return e(this[0]).is("form") ? t = this.validate().form() : (s = [], t = !0, i = e(this[0].form).validate(), this.each(function() {
                    (t = i.element(this) && t) || (s = s.concat(i.errorList))
                }), i.errorList = s), t
            },
            rules: function(t, i) {
                var s, r, n, a, o, l, c = this[0],
                    u = void 0 !== this.attr("contenteditable") && "false" !== this.attr("contenteditable");
                if (null != c && (!c.form && u && (c.form = this.closest("form")[0], c.name = this.attr("name")), null != c.form)) {
                    if (t) switch (r = (s = e.data(c.form, "validator").settings).rules, n = e.validator.staticRules(c), t) {
                        case "add":
                            e.extend(n, e.validator.normalizeRule(i)), delete n.messages, r[c.name] = n, i.messages && (s.messages[c.name] = e.extend(s.messages[c.name], i.messages));
                            break;
                        case "remove":
                            return i ? (l = {}, e.each(i.split(/\s/), function(e, t) {
                                l[t] = n[t], delete n[t]
                            }), l) : (delete r[c.name], n)
                    }
                    return (a = e.validator.normalizeRules(e.extend({}, e.validator.classRules(c), e.validator.attributeRules(c), e.validator.dataRules(c), e.validator.staticRules(c)), c)).required && (o = a.required, delete a.required, a = e.extend({
                        required: o
                    }, a)), a.remote && (o = a.remote, delete a.remote, a = e.extend(a, {
                        remote: o
                    })), a
                }
            }
        });
        var t, i = function(e) {
            return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
        };
        e.extend(e.expr.pseudos || e.expr[":"], {
            blank: function(t) {
                return !i("" + e(t).val())
            },
            filled: function(t) {
                var s = e(t).val();
                return null !== s && !!i("" + s)
            },
            unchecked: function(t) {
                return !e(t).prop("checked")
            }
        }), e.validator = function(t, i) {
            this.settings = e.extend(!0, {}, e.validator.defaults, t), this.currentForm = i, this.init()
        }, e.validator.format = function(t, i) {
            return 1 === arguments.length ? function() {
                var i = e.makeArray(arguments);
                return i.unshift(t), e.validator.format.apply(this, i)
            } : (void 0 === i || (arguments.length > 2 && i.constructor !== Array && (i = e.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), e.each(i, function(e, i) {
                t = t.replace(new RegExp("\\{" + e + "\\}", "g"), function() {
                    return i
                })
            })), t)
        }, e.extend(e.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                pendingClass: "pending",
                validClass: "valid",
                errorElement: "label",
                focusCleanup: !1,
                focusInvalid: !0,
                ariaDescribedByCleanup: !1,
                errorContainer: e([]),
                errorLabelContainer: e([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                customElements: [],
                onfocusin: function(e) {
                    this.lastActive = e, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(e)))
                },
                onfocusout: function(e) {
                    this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e)
                },
                onkeyup: function(t, i) {
                    var s = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                    9 === i.which && "" === this.elementValue(t) || -1 !== e.inArray(i.keyCode, s) || (t.name in this.submitted || t.name in this.invalid) && this.element(t)
                },
                onclick: function(e) {
                    e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
                },
                highlight: function(t, i, s) {
                    "radio" === t.type ? this.findByName(t.name).addClass(i).removeClass(s) : e(t).addClass(i).removeClass(s)
                },
                unhighlight: function(t, i, s) {
                    "radio" === t.type ? this.findByName(t.name).removeClass(i).addClass(s) : e(t).removeClass(i).addClass(s)
                }
            },
            setDefaults: function(t) {
                e.extend(e.validator.defaults, t)
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                equalTo: "Please enter the same value again.",
                maxlength: e.validator.format("Please enter no more than {0} characters."),
                minlength: e.validator.format("Please enter at least {0} characters."),
                rangelength: e.validator.format("Please enter a value between {0} and {1} characters long."),
                range: e.validator.format("Please enter a value between {0} and {1}."),
                max: e.validator.format("Please enter a value less than or equal to {0}."),
                min: e.validator.format("Please enter a value greater than or equal to {0}."),
                step: e.validator.format("Please enter a multiple of {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function() {
                    function t(t) {
                        var i = void 0 !== e(this).attr("contenteditable") && "false" !== e(this).attr("contenteditable");
                        if (!this.form && i && (this.form = e(this).closest("form")[0], this.name = e(this).attr("name")), s === this.form) {
                            var r = e.data(this.form, "validator"),
                                n = "on" + t.type.replace(/^validate/, ""),
                                a = r.settings;
                            a[n] && !e(this).is(a.ignore) && a[n].call(r, this, t)
                        }
                    }
                    this.labelContainer = e(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm), this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                    var i, s = this.currentForm,
                        r = this.groups = {};
                    e.each(this.settings.groups, function(t, i) {
                        "string" == typeof i && (i = i.split(/\s/)), e.each(i, function(e, i) {
                            r[i] = t
                        })
                    }), i = this.settings.rules, e.each(i, function(t, s) {
                        i[t] = e.validator.normalizeRule(s)
                    });
                    var n = [":text", "[type='password']", "[type='file']", "select", "textarea", "[type='number']", "[type='search']", "[type='tel']", "[type='url']", "[type='email']", "[type='datetime']", "[type='date']", "[type='month']", "[type='week']", "[type='time']", "[type='datetime-local']", "[type='range']", "[type='color']", "[type='radio']", "[type='checkbox']", "[contenteditable]", "[type='button']"],
                        a = ["select", "option", "[type='radio']", "[type='checkbox']"];
                    e(this.currentForm).on("focusin.validate focusout.validate keyup.validate", n.concat(this.settings.customElements).join(", "), t).on("click.validate", a.concat(this.settings.customElements).join(", "), t), this.settings.invalidHandler && e(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler)
                },
                form: function() {
                    return this.checkForm(), e.extend(this.submitted, this.errorMap), this.invalid = e.extend({}, this.errorMap), this.valid() || e(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                },
                checkForm: function() {
                    this.prepareForm();
                    for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]);
                    return this.valid()
                },
                element: function(t) {
                    var i, s, r = this.clean(t),
                        n = this.validationTargetFor(r),
                        a = this,
                        o = !0;
                    return void 0 === n ? delete this.invalid[r.name] : (this.prepareElement(n), this.currentElements = e(n), (s = this.groups[n.name]) && e.each(this.groups, function(e, t) {
                        t === s && e !== n.name && (r = a.validationTargetFor(a.clean(a.findByName(e)))) && r.name in a.invalid && (a.currentElements.pushStack(r), o = a.check(r) && o)
                    }), i = !1 !== this.check(n), o = o && i, this.invalid[n.name] = !i, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e(t).attr("aria-invalid", !i)), o
                },
                showErrors: function(t) {
                    if (t) {
                        var i = this;
                        e.extend(this.errorMap, t), this.errorList = e.map(this.errorMap, function(e, t) {
                            return {
                                message: e,
                                element: i.findByName(t)[0]
                            }
                        }), this.successList = e.grep(this.successList, function(e) {
                            return !(e.name in t)
                        })
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                },
                resetForm: function() {
                    e.fn.resetForm && e(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                    var t = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                    this.resetElements(t)
                },
                resetElements: function(e) {
                    var t;
                    if (this.settings.unhighlight)
                        for (t = 0; e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, ""), this.findByName(e[t].name).removeClass(this.settings.validClass);
                    else e.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
                },
                numberOfInvalids: function() {
                    return this.objectLength(this.invalid)
                },
                objectLength: function(e) {
                    var t, i = 0;
                    for (t in e) void 0 !== e[t] && null !== e[t] && !1 !== e[t] && i++;
                    return i
                },
                hideErrors: function() {
                    this.hideThese(this.toHide)
                },
                addErrorAriaDescribedBy: function(t, i, s) {
                    s = void 0 !== s && s;
                    var r, n, a, o = e(t).attr("aria-describedby");
                    r = i.attr("id"), o ? o.match(new RegExp("\\b" + this.escapeCssMeta(r) + "\\b")) || (o += " " + r) : o = r, e(t).attr("aria-describedby", o), s && (a = this.groups[t.name]) && (n = this, e.each(n.groups, function(t, s) {
                        s === a && n.addErrorAriaDescribedBy(e("[name='" + n.escapeCssMeta(t) + "']", n.currentForm), i, !1)
                    }))
                },
                removeErrorAriaDescribedBy: function(t, i) {
                    var s = e(t).attr("aria-describedby").split(" "),
                        r = i.attr("id"),
                        n = s.indexOf(r);
                    n > -1 && s.splice(n, 1), s.length ? e(t).attr("aria-describedby", s.join(" ")) : e(t).removeAttr("aria-describedby")
                },
                hideThese: function(t) {
                    for (var i = 0; t[i]; i++) {
                        var s = e(t[i]),
                            r = s.attr("id") ? this.escapeCssMeta(s.attr("id")) : void 0,
                            n = r ? this.elements().filter('[aria-describedby~="' + r + '"]') : [];
                        this.settings.ariaDescribedByCleanup && n.length && this.removeErrorAriaDescribedBy(n, s), s.is(this.containers) || s.text(""), this.addWrapper(s).hide()
                    }
                },
                valid: function() {
                    return 0 === this.size()
                },
                size: function() {
                    return this.errorList.length
                },
                focusInvalid: function() {
                    if (this.settings.focusInvalid) try {
                        e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").trigger("focus").trigger("focusin")
                    } catch (e) {}
                },
                findLastActive: function() {
                    var t = this.lastActive;
                    return t && 1 === e.grep(this.errorList, function(e) {
                        return e.element.name === t.name
                    }).length && t
                },
                elements: function() {
                    var t, i = this,
                        s = {},
                        r = ["input", "select", "textarea", "[contenteditable]"],
                        n = this.currentForm.getAttribute("id");
                    return t = e(this.currentForm).find(r.concat(this.settings.customElements).join(", ")).not(":submit, :reset, :image, :disabled").not(this.settings.ignore), n && (t = t.add(e(r.concat(this.settings.customElements).join(", ")).filter("[form='" + i.escapeCssMeta(n) + "']").not(":submit, :reset, :image, :disabled").not(this.settings.ignore))), t.filter(function() {
                        var t = this.name || e(this).attr("name"),
                            r = void 0 !== e(this).attr("contenteditable") && "false" !== e(this).attr("contenteditable");
                        return !t && i.settings.debug && window.console && console.error("%o has no name assigned", this), r && (this.form = e(this).closest("form")[0], this.name = t), this.form === i.currentForm && (!(t in s || !i.objectLength(e(this).rules())) && (s[t] = !0, !0))
                    })
                },
                clean: function(t) {
                    return e(t)[0]
                },
                errors: function() {
                    var t = this.settings.errorClass.split(" ").join(".");
                    return e(this.settings.errorElement + "." + t, this.errorContext)
                },
                resetInternals: function() {
                    this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = e([]), this.toHide = e([])
                },
                reset: function() {
                    this.resetInternals(), this.currentElements = e([])
                },
                prepareForm: function() {
                    this.reset(), this.toHide = this.errors().add(this.containers)
                },
                prepareElement: function(e) {
                    this.reset(), this.toHide = this.errorsFor(e)
                },
                elementValue: function(t) {
                    var i, s, r = e(t),
                        n = t.type,
                        a = void 0 !== r.attr("contenteditable") && "false" !== r.attr("contenteditable");
                    return "radio" === n || "checkbox" === n ? this.findByName(t.name).filter(":checked").val() : "number" === n && void 0 !== t.validity ? t.validity.badInput ? "NaN" : r.val() : (i = a ? r.text() : r.val(), "file" === n ? "C:\\fakepath\\" === i.substr(0, 12) ? i.substr(12) : (s = i.lastIndexOf("/")) >= 0 || (s = i.lastIndexOf("\\")) >= 0 ? i.substr(s + 1) : i : "string" == typeof i ? i.replace(/\r/g, "") : i)
                },
                check: function(t) {
                    t = this.validationTargetFor(this.clean(t));
                    var i, s, r, n, a = e(t).rules(),
                        o = e.map(a, function(e, t) {
                            return t
                        }).length,
                        l = !1,
                        c = this.elementValue(t);
                    for (s in this.abortRequest(t), "function" == typeof a.normalizer ? n = a.normalizer : "function" == typeof this.settings.normalizer && (n = this.settings.normalizer), n && (c = n.call(t, c), delete a.normalizer), a) {
                        r = {
                            method: s,
                            parameters: a[s]
                        };
                        try {
                            if ("dependency-mismatch" === (i = e.validator.methods[s].call(this, c, t, r.parameters)) && 1 === o) {
                                l = !0;
                                continue
                            }
                            if (l = !1, "pending" === i) return void(this.toHide = this.toHide.not(this.errorsFor(t)));
                            if (!i) return this.formatAndAdd(t, r), !1
                        } catch (e) {
                            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + r.method + "' method.", e), e instanceof TypeError && (e.message += ".  Exception occurred when checking element " + t.id + ", check the '" + r.method + "' method."), e
                        }
                    }
                    if (!l) return this.objectLength(a) && this.successList.push(t), !0
                },
                customDataMessage: function(t, i) {
                    return e(t).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || e(t).data("msg")
                },
                customMessage: function(e, t) {
                    var i = this.settings.messages[e];
                    return i && (i.constructor === String ? i : i[t])
                },
                findDefined: function() {
                    for (var e = 0; e < arguments.length; e++)
                        if (void 0 !== arguments[e]) return arguments[e]
                },
                defaultMessage: function(t, i) {
                    "string" == typeof i && (i = {
                        method: i
                    });
                    var s = this.findDefined(this.customMessage(t.name, i.method), this.customDataMessage(t, i.method), !this.settings.ignoreTitle && t.title || void 0, e.validator.messages[i.method], "<strong>Warning: No message defined for " + t.name + "</strong>"),
                        r = /\$?\{(\d+)\}/g;
                    return "function" == typeof s ? s = s.call(this, i.parameters, t) : r.test(s) && (s = e.validator.format(s.replace(r, "{$1}"), i.parameters)), s
                },
                formatAndAdd: function(e, t) {
                    var i = this.defaultMessage(e, t);
                    this.errorList.push({
                        message: i,
                        element: e,
                        method: t.method
                    }), this.errorMap[e.name] = i, this.submitted[e.name] = i
                },
                addWrapper: function(e) {
                    return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))), e
                },
                defaultShowErrors: function() {
                    var e, t, i;
                    for (e = 0; this.errorList[e]; e++) i = this.errorList[e], this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message);
                    if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                        for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
                    if (this.settings.unhighlight)
                        for (e = 0, t = this.validElements(); t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                },
                validElements: function() {
                    return this.currentElements.not(this.invalidElements())
                },
                invalidElements: function() {
                    return e(this.errorList).map(function() {
                        return this.element
                    })
                },
                showLabel: function(t, i) {
                    var s, r = this.errorsFor(t),
                        n = this.idOrName(t),
                        a = e(t).attr("aria-describedby");
                    r.length ? (0 !== r.closest("label[for='" + this.escapeCssMeta(n) + "']").length || void 0 !== a && -1 !== a.split(" ").indexOf(r.attr("id")) || this.addErrorAriaDescribedBy(t, r, !0), r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), this.settings && this.settings.escapeHtml ? r.text(i || "") : r.html(i || "")) : (r = e("<" + this.settings.errorElement + ">").attr("id", n + "-error").addClass(this.settings.errorClass), this.settings && this.settings.escapeHtml ? r.text(i || "") : r.html(i || ""), s = r, this.settings.wrapper && (s = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(s) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, s, e(t)) : s.insertAfter(t), r.is("label") ? r.attr("for", n) : 0 === r.parents("label[for='" + this.escapeCssMeta(n) + "']").length && this.addErrorAriaDescribedBy(t, r, !0)), !i && this.settings.success && (r.text(""), "string" == typeof this.settings.success ? r.addClass(this.settings.success) : this.settings.success(r, t)), this.toShow = this.toShow.add(r)
                },
                errorsFor: function(t) {
                    var i = this.escapeCssMeta(this.idOrName(t)),
                        s = e(t).attr("aria-describedby"),
                        r = "label[for='" + i + "'], label[for='" + i + "'] *";
                    return s && (r = r + ", #" + this.escapeCssMeta(s).replace(/\s+/g, ", #")), r = r + ", #" + i + "-error", this.errors().filter(r)
                },
                escapeCssMeta: function(e) {
                    return void 0 === e ? "" : e.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1")
                },
                idOrName: function(e) {
                    return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
                },
                validationTargetFor: function(t) {
                    return this.checkable(t) && (t = this.findByName(t.name)), e(t).not(this.settings.ignore)[0]
                },
                checkable: function(e) {
                    return /radio|checkbox/i.test(e.type)
                },
                findByName: function(t) {
                    var i = this.currentForm.getAttribute("id"),
                        s = "[name='" + this.escapeCssMeta(t) + "']",
                        r = e(this.currentForm).find(s);
                    return i && (r = r.add(e(s).filter("[form='" + this.escapeCssMeta(i) + "']"))), r
                },
                getLength: function(t, i) {
                    switch (i.nodeName.toLowerCase()) {
                        case "select":
                            return e("option:selected", i).length;
                        case "input":
                            if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                    }
                    return t.length
                },
                depend: function(e, t) {
                    return !this.dependTypes[typeof e] || this.dependTypes[typeof e](e, t)
                },
                dependTypes: {
                    boolean: function(e) {
                        return e
                    },
                    string: function(t, i) {
                        return !!e(t, i.form).length
                    },
                    function: function(e, t) {
                        return e(t)
                    }
                },
                optional: function(t) {
                    var i = this.elementValue(t);
                    return !e.validator.methods.required.call(this, i, t) && "dependency-mismatch"
                },
                elementAjaxPort: function(e) {
                    return "validate" + e.name
                },
                startRequest: function(t) {
                    this.pending[t.name] || (this.pendingRequest++, e(t).addClass(this.settings.pendingClass), this.pending[t.name] = !0)
                },
                stopRequest: function(t, i) {
                    this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[t.name], e(t).removeClass(this.settings.pendingClass), i && 0 === this.pendingRequest && this.formSubmitted && this.form() && 0 === this.pendingRequest ? (e(this.currentForm).trigger("submit"), this.submitButton && e("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (e(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                },
                abortRequest: function(t) {
                    var i;
                    this.pending[t.name] && (i = this.elementAjaxPort(t), e.ajaxAbort(i), this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[t.name], e(t).removeClass(this.settings.pendingClass))
                },
                previousValue: function(t, i) {
                    return i = "string" == typeof i && i || "remote", e.data(t, "previousValue") || e.data(t, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(t, {
                            method: i
                        })
                    })
                },
                destroy: function() {
                    this.resetForm(), e(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur")
                }
            },
            classRuleSettings: {
                required: {
                    required: !0
                },
                email: {
                    email: !0
                },
                url: {
                    url: !0
                },
                date: {
                    date: !0
                },
                dateISO: {
                    dateISO: !0
                },
                number: {
                    number: !0
                },
                digits: {
                    digits: !0
                },
                creditcard: {
                    creditcard: !0
                }
            },
            addClassRules: function(t, i) {
                t.constructor === String ? this.classRuleSettings[t] = i : e.extend(this.classRuleSettings, t)
            },
            classRules: function(t) {
                var i = {},
                    s = e(t).attr("class");
                return s && e.each(s.split(" "), function() {
                    this in e.validator.classRuleSettings && e.extend(i, e.validator.classRuleSettings[this])
                }), i
            },
            normalizeAttributeRule: function(e, t, i, s) {
                /min|max|step/.test(i) && (null === t || /number|range|text/.test(t)) && (s = Number(s), isNaN(s) && (s = void 0)), s || 0 === s ? e[i] = s : t === i && "range" !== t && (e["date" === t ? "dateISO" : i] = !0)
            },
            attributeRules: function(t) {
                var i, s, r = {},
                    n = e(t),
                    a = t.getAttribute("type");
                for (i in e.validator.methods) "required" === i ? ("" === (s = t.getAttribute(i)) && (s = !0), s = !!s) : s = n.attr(i), this.normalizeAttributeRule(r, a, i, s);
                return r.maxlength && /-1|2147483647|524288/.test(r.maxlength) && delete r.maxlength, r
            },
            dataRules: function(t) {
                var i, s, r = {},
                    n = e(t),
                    a = t.getAttribute("type");
                for (i in e.validator.methods) "" === (s = n.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase())) && (s = !0), this.normalizeAttributeRule(r, a, i, s);
                return r
            },
            staticRules: function(t) {
                var i = {},
                    s = e.data(t.form, "validator");
                return s.settings.rules && (i = e.validator.normalizeRule(s.settings.rules[t.name]) || {}), i
            },
            normalizeRules: function(t, i) {
                return e.each(t, function(s, r) {
                    if (!1 !== r) {
                        if (r.param || r.depends) {
                            var n = !0;
                            switch (typeof r.depends) {
                                case "string":
                                    n = !!e(r.depends, i.form).length;
                                    break;
                                case "function":
                                    n = r.depends.call(i, i)
                            }
                            n ? t[s] = void 0 === r.param || r.param : (e.data(i.form, "validator").resetElements(e(i)), delete t[s])
                        }
                    } else delete t[s]
                }), e.each(t, function(e, s) {
                    t[e] = "function" == typeof s && "normalizer" !== e ? s(i) : s
                }), e.each(["minlength", "maxlength"], function() {
                    t[this] && (t[this] = Number(t[this]))
                }), e.each(["rangelength", "range"], function() {
                    var e;
                    t[this] && (Array.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (e = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/), t[this] = [Number(e[0]), Number(e[1])]))
                }), e.validator.autoCreateRanges && (null != t.min && null != t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), null != t.minlength && null != t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
            },
            normalizeRule: function(t) {
                if ("string" == typeof t) {
                    var i = {};
                    e.each(t.split(/\s/), function() {
                        i[this] = !0
                    }), t = i
                }
                return t
            },
            addMethod: function(t, i, s) {
                e.validator.methods[t] = i, e.validator.messages[t] = void 0 !== s ? s : e.validator.messages[t], i.length < 3 && e.validator.addClassRules(t, e.validator.normalizeRule(t))
            },
            methods: {
                required: function(t, i, s) {
                    if (!this.depend(s, i)) return "dependency-mismatch";
                    if ("select" === i.nodeName.toLowerCase()) {
                        var r = e(i).val();
                        return r && r.length > 0
                    }
                    return this.checkable(i) ? this.getLength(t, i) > 0 : null != t && t.length > 0
                },
                email: function(e, t) {
                    return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
                },
                url: function(e, t) {
                    return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})+(?::(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e)
                },
                date: (t = !1, function(e, i) {
                    return t || (t = !0, this.settings.debug && window.console && console.warn("The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`.")), this.optional(i) || !/Invalid|NaN/.test(new Date(e).toString())
                }),
                dateISO: function(e, t) {
                    return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
                },
                number: function(e, t) {
                    return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:-?\.\d+)?$/.test(e)
                },
                digits: function(e, t) {
                    return this.optional(t) || /^\d+$/.test(e)
                },
                minlength: function(e, t, i) {
                    var s = Array.isArray(e) ? e.length : this.getLength(e, t);
                    return this.optional(t) || s >= i
                },
                maxlength: function(e, t, i) {
                    var s = Array.isArray(e) ? e.length : this.getLength(e, t);
                    return this.optional(t) || s <= i
                },
                rangelength: function(e, t, i) {
                    var s = Array.isArray(e) ? e.length : this.getLength(e, t);
                    return this.optional(t) || s >= i[0] && s <= i[1]
                },
                min: function(e, t, i) {
                    return this.optional(t) || e >= i
                },
                max: function(e, t, i) {
                    return this.optional(t) || e <= i
                },
                range: function(e, t, i) {
                    return this.optional(t) || e >= i[0] && e <= i[1]
                },
                step: function(t, i, s) {
                    var r, n = e(i).attr("type"),
                        a = "Step attribute on input type " + n + " is not supported.",
                        o = ["text", "number", "range"],
                        l = new RegExp("\\b" + n + "\\b"),
                        c = function(e) {
                            var t = ("" + e).match(/(?:\.(\d+))?$/);
                            return t && t[1] ? t[1].length : 0
                        },
                        u = function(e) {
                            return Math.round(e * Math.pow(10, r))
                        },
                        h = !0;
                    if (n && !l.test(o.join())) throw new Error(a);
                    return r = c(s), (c(t) > r || u(t) % u(s) !== 0) && (h = !1), this.optional(i) || h
                },
                equalTo: function(t, i, s) {
                    var r = e(s);
                    return this.settings.onfocusout && r.not(".validate-equalTo-blur").length && r.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                        e(i).valid()
                    }), t === r.val()
                },
                remote: function(t, i, s, r) {
                    if (this.optional(i)) return "dependency-mismatch";
                    r = "string" == typeof r && r || "remote";
                    var n, a, o, l = this.previousValue(i, r);
                    return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), l.originalMessage = l.originalMessage || this.settings.messages[i.name][r], this.settings.messages[i.name][r] = l.message, s = "string" == typeof s && {
                        url: s
                    } || s, o = e.param(e.extend({
                        data: t
                    }, s.data)), null !== l.valid && l.old === o ? l.valid : (l.old = o, l.valid = null, n = this, this.startRequest(i), (a = {})[i.name] = t, e.ajax(e.extend(!0, {
                        mode: "abort",
                        port: this.elementAjaxPort(i),
                        dataType: "json",
                        data: a,
                        context: n.currentForm,
                        success: function(e) {
                            var s, a, o, c = !0 === e || "true" === e;
                            n.settings.messages[i.name][r] = l.originalMessage, c ? (o = n.formSubmitted, n.toHide = n.errorsFor(i), n.formSubmitted = o, n.successList.push(i), n.invalid[i.name] = !1, n.showErrors()) : (s = {}, a = e || n.defaultMessage(i, {
                                method: r,
                                parameters: t
                            }), s[i.name] = l.message = a, n.invalid[i.name] = !0, n.showErrors(s)), l.valid = c, n.stopRequest(i, c)
                        }
                    }, s)), "pending")
                }
            }
        });
        var s, r = {};
        return e.ajaxPrefilter ? e.ajaxPrefilter(function(t, i, s) {
            var n = t.port;
            "abort" === t.mode && (e.ajaxAbort(n), r[n] = s)
        }) : (s = e.ajax, e.ajax = function(t) {
            var i = ("mode" in t ? t : e.ajaxSettings).mode,
                n = ("port" in t ? t : e.ajaxSettings).port;
            return "abort" === i ? (e.ajaxAbort(n), r[n] = s.apply(this, arguments), r[n]) : s.apply(this, arguments)
        }), e.ajaxAbort = function(e) {
            r[e] && (r[e].abort(), delete r[e])
        }, e
    }),
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery", "./jquery.validate"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function(e) {
        return function() {
            function t(e) {
                return e.replace(/<.[^<>]*?>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/[.(),;:!?%#$'\"_+=\/\-\u201c\u201d\u2019]*/g, "")
            }
            e.validator.addMethod("maxWords", function(e, i, s) {
                return this.optional(i) || t(e).match(/\b\w+\b/g).length <= s
            }, e.validator.format("Please enter {0} words or less.")), e.validator.addMethod("minWords", function(e, i, s) {
                return this.optional(i) || t(e).match(/\b\w+\b/g).length >= s
            }, e.validator.format("Please enter at least {0} words.")), e.validator.addMethod("rangeWords", function(e, i, s) {
                var r = t(e),
                    n = /\b\w+\b/g;
                return this.optional(i) || r.match(n).length >= s[0] && r.match(n).length <= s[1]
            }, e.validator.format("Please enter between {0} and {1} words."))
        }(), e.validator.addMethod("abaRoutingNumber", function(e) {
            var t = 0,
                i = e.split(""),
                s = i.length;
            if (9 !== s) return !1;
            for (var r = 0; r < s; r += 3) t += 3 * parseInt(i[r], 10) + 7 * parseInt(i[r + 1], 10) + parseInt(i[r + 2], 10);
            return 0 !== t && t % 10 == 0
        }, "Please enter a valid routing number."), e.validator.addMethod("accept", function(t, i, s) {
            var r, n, a = "string" == typeof s ? s.replace(/\s/g, "") : "image/*",
                o = this.optional(i);
            if (o) return o;
            if ("file" === e(i).attr("type") && (a = a.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, "\\$&").replace(/,/g, "|").replace(/\/\*/g, "/.*"), i.files && i.files.length))
                for (n = new RegExp(".?(" + a + ")$", "i"), r = 0; r < i.files.length; r++)
                    if (!i.files[r].type.match(n)) return !1;
            return !0
        }, e.validator.format("Please enter a value with a valid mimetype.")), e.validator.addMethod("alphanumeric", function(e, t) {
            return this.optional(t) || /^\w+$/i.test(e)
        }, "Letters, numbers, and underscores only please."), e.validator.addMethod("bankaccountNL", function(e, t) {
            if (this.optional(t)) return !0;
            if (!/^[0-9]{9}|([0-9]{2} ){3}[0-9]{3}$/.test(e)) return !1;
            var i, s = e.replace(/ /g, ""),
                r = 0,
                n = s.length;
            for (i = 0; i < n; i++) r += (n - i) * s.substring(i, i + 1);
            return r % 11 == 0
        }, "Please specify a valid bank account number."), e.validator.addMethod("bankorgiroaccountNL", function(t, i) {
            return this.optional(i) || e.validator.methods.bankaccountNL.call(this, t, i) || e.validator.methods.giroaccountNL.call(this, t, i)
        }, "Please specify a valid bank or giro account number."), e.validator.addMethod("bic", function(e, t) {
            return this.optional(t) || /^([A-Z]{6}[A-Z2-9][A-NP-Z1-9])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test(e.toUpperCase())
        }, "Please specify a valid BIC code."), e.validator.addMethod("cifES", function(e, t) {
            "use strict";

            function i(e) {
                return e % 2 == 0
            }
            if (this.optional(t)) return !0;
            var s, r, n, a, o = new RegExp(/^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/gi),
                l = e.substring(0, 1),
                c = e.substring(1, 8),
                u = e.substring(8, 9),
                h = 0,
                d = 0;
            if (9 !== e.length || !o.test(e)) return !1;
            for (s = 0; s < c.length; s++) r = parseInt(c[s], 10), i(s) ? d += (r *= 2) < 10 ? r : r - 9 : h += r;
            return n = (10 - (h + d).toString().slice(-1)).toString(), n = parseInt(n, 10) > 9 ? "0" : n, a = "JABCDEFGHI".charAt(n).toString(), l.match(/[ABEH]/) ? u === n : l.match(/[KPQS]/) ? u === a : u === n || u === a
        }, "Please specify a valid CIF number."), e.validator.addMethod("cnhBR", function(e) {
            if (11 !== (e = e.replace(/([~!@#$%^&*()_+=`{}\[\]\-|\\:;'<>,.\/? ])+/g, "")).length) return !1;
            var t, i, s, r, n, a = 0,
                o = 0;
            if (t = e.charAt(0), new Array(12).join(t) === e) return !1;
            for (r = 0, n = 9, 0; r < 9; ++r, --n) a += +e.charAt(r) * n;
            for ((i = a % 11) >= 10 && (i = 0, o = 2), a = 0, r = 0, n = 1, 0; r < 9; ++r, ++n) a += +e.charAt(r) * n;
            return (s = a % 11) >= 10 ? s = 0 : s -= o, String(i).concat(s) === e.substr(-2)
        }, "Please specify a valid CNH number."), e.validator.addMethod("cnpjBR", function(e, t) {
            "use strict";
            if (this.optional(t)) return !0;
            if (14 !== (e = e.replace(/[^\d]+/g, "")).length) return !1;
            if ("00000000000000" === e || "11111111111111" === e || "22222222222222" === e || "33333333333333" === e || "44444444444444" === e || "55555555555555" === e || "66666666666666" === e || "77777777777777" === e || "88888888888888" === e || "99999999999999" === e) return !1;
            for (var i = e.length - 2, s = e.substring(0, i), r = e.substring(i), n = 0, a = i - 7, o = i; o >= 1; o--) n += s.charAt(i - o) * a--, a < 2 && (a = 9);
            var l = n % 11 < 2 ? 0 : 11 - n % 11;
            if (l !== parseInt(r.charAt(0), 10)) return !1;
            i += 1, s = e.substring(0, i), n = 0, a = i - 7;
            for (var c = i; c >= 1; c--) n += s.charAt(i - c) * a--, a < 2 && (a = 9);
            return (l = n % 11 < 2 ? 0 : 11 - n % 11) === parseInt(r.charAt(1), 10)
        }, "Please specify a CNPJ value number."), e.validator.addMethod("cpfBR", function(e, t) {
            "use strict";
            if (this.optional(t)) return !0;
            if (11 !== (e = e.replace(/([~!@#$%^&*()_+=`{}\[\]\-|\\:;'<>,.\/? ])+/g, "")).length) return !1;
            var i, s, r, n, a = 0;
            if (i = parseInt(e.substring(9, 10), 10), s = parseInt(e.substring(10, 11), 10), r = function(e, t) {
                    var i = 10 * e % 11;
                    return 10 !== i && 11 !== i || (i = 0), i === t
                }, "" === e || "00000000000" === e || "11111111111" === e || "22222222222" === e || "33333333333" === e || "44444444444" === e || "55555555555" === e || "66666666666" === e || "77777777777" === e || "88888888888" === e || "99999999999" === e) return !1;
            for (n = 1; n <= 9; n++) a += parseInt(e.substring(n - 1, n), 10) * (11 - n);
            if (r(a, i)) {
                for (a = 0, n = 1; n <= 10; n++) a += parseInt(e.substring(n - 1, n), 10) * (12 - n);
                return r(a, s)
            }
            return !1
        }, "Please specify a valid CPF number."), e.validator.addMethod("creditcard", function(e, t) {
            if (this.optional(t)) return "dependency-mismatch";
            if (/[^0-9 \-]+/.test(e)) return !1;
            var i, s, r = 0,
                n = 0,
                a = !1;
            if ((e = e.replace(/\D/g, "")).length < 13 || e.length > 19) return !1;
            for (i = e.length - 1; i >= 0; i--) s = e.charAt(i), n = parseInt(s, 10), a && (n *= 2) > 9 && (n -= 9), r += n, a = !a;
            return r % 10 == 0
        }, "Please enter a valid credit card number."), e.validator.addMethod("creditcardtypes", function(e, t, i) {
            if (/[^0-9\-]+/.test(e)) return !1;
            e = e.replace(/\D/g, "");
            var s = 0;
            return i.mastercard && (s |= 1), i.visa && (s |= 2), i.amex && (s |= 4), i.dinersclub && (s |= 8), i.enroute && (s |= 16), i.discover && (s |= 32), i.jcb && (s |= 64), i.unknown && (s |= 128), i.all && (s = 255), 1 & s && (/^(5[12345])/.test(e) || /^(2[234567])/.test(e)) || 2 & s && /^(4)/.test(e) ? 16 === e.length : 4 & s && /^(3[47])/.test(e) ? 15 === e.length : 8 & s && /^(3(0[012345]|[68]))/.test(e) ? 14 === e.length : 16 & s && /^(2(014|149))/.test(e) ? 15 === e.length : 32 & s && /^(6011)/.test(e) || 64 & s && /^(3)/.test(e) ? 16 === e.length : 64 & s && /^(2131|1800)/.test(e) ? 15 === e.length : !!(128 & s)
        }, "Please enter a valid credit card number."), e.validator.addMethod("currency", function(e, t, i) {
            var s, r = "string" == typeof i,
                n = r ? i : i[0],
                a = !!r || i[1];
            return n = n.replace(/,/g, ""), s = "^[" + (n = a ? n + "]" : n + "]?") + "([1-9]{1}[0-9]{0,2}(\\,[0-9]{3})*(\\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\\.[0-9]{0,2})?|0(\\.[0-9]{0,2})?|(\\.[0-9]{1,2})?)$", s = new RegExp(s), this.optional(t) || s.test(e)
        }, "Please specify a valid currency."), e.validator.addMethod("dateFA", function(e, t) {
            return this.optional(t) || /^[1-4]\d{3}\/((0?[1-6]\/((3[0-1])|([1-2][0-9])|(0?[1-9])))|((1[0-2]|(0?[7-9]))\/(30|([1-2][0-9])|(0?[1-9]))))$/.test(e)
        }, e.validator.messages.date), e.validator.addMethod("dateITA", function(e, t) {
            var i, s, r, n, a, o = !1;
            return /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(e) ? (i = e.split("/"), s = parseInt(i[0], 10), r = parseInt(i[1], 10), n = parseInt(i[2], 10), o = (a = new Date(Date.UTC(n, r - 1, s, 12, 0, 0, 0))).getUTCFullYear() === n && a.getUTCMonth() === r - 1 && a.getUTCDate() === s) : o = !1, this.optional(t) || o
        }, e.validator.messages.date), e.validator.addMethod("dateNL", function(e, t) {
            return this.optional(t) || /^(0?[1-9]|[12]\d|3[01])[\.\/\-](0?[1-9]|1[012])[\.\/\-]([12]\d)?(\d\d)$/.test(e)
        }, e.validator.messages.date), e.validator.addMethod("extension", function(e, t, i) {
            return i = "string" == typeof i ? i.replace(/,/g, "|") : "png|jpe?g|gif", this.optional(t) || e.match(new RegExp("\\.(" + i + ")$", "i"))
        }, e.validator.format("Please enter a value with a valid extension.")), e.validator.addMethod("giroaccountNL", function(e, t) {
            return this.optional(t) || /^[0-9]{1,7}$/.test(e)
        }, "Please specify a valid giro account number."), e.validator.addMethod("greaterThan", function(t, i, s) {
            var r = e(s);
            return this.settings.onfocusout && r.not(".validate-greaterThan-blur").length && r.addClass("validate-greaterThan-blur").on("blur.validate-greaterThan", function() {
                e(i).valid()
            }), t > r.val()
        }, "Please enter a greater value."), e.validator.addMethod("greaterThanEqual", function(t, i, s) {
            var r = e(s);
            return this.settings.onfocusout && r.not(".validate-greaterThanEqual-blur").length && r.addClass("validate-greaterThanEqual-blur").on("blur.validate-greaterThanEqual", function() {
                e(i).valid()
            }), t >= r.val()
        }, "Please enter a greater value."), e.validator.addMethod("iban", function(e, t) {
            if (this.optional(t)) return !0;
            var i, s, r, n, a, o = e.replace(/ /g, "").toUpperCase(),
                l = "",
                c = !0,
                u = "",
                h = 5;
            if (o.length < h) return !1;
            if (void 0 !== (r = {
                    AL: "\\d{8}[\\dA-Z]{16}",
                    AD: "\\d{8}[\\dA-Z]{12}",
                    AT: "\\d{16}",
                    AZ: "[\\dA-Z]{4}\\d{20}",
                    BE: "\\d{12}",
                    BH: "[A-Z]{4}[\\dA-Z]{14}",
                    BA: "\\d{16}",
                    BR: "\\d{23}[A-Z][\\dA-Z]",
                    BG: "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
                    CR: "\\d{17}",
                    HR: "\\d{17}",
                    CY: "\\d{8}[\\dA-Z]{16}",
                    CZ: "\\d{20}",
                    DK: "\\d{14}",
                    DO: "[A-Z]{4}\\d{20}",
                    EE: "\\d{16}",
                    FO: "\\d{14}",
                    FI: "\\d{14}",
                    FR: "\\d{10}[\\dA-Z]{11}\\d{2}",
                    GE: "[\\dA-Z]{2}\\d{16}",
                    DE: "\\d{18}",
                    GI: "[A-Z]{4}[\\dA-Z]{15}",
                    GR: "\\d{7}[\\dA-Z]{16}",
                    GL: "\\d{14}",
                    GT: "[\\dA-Z]{4}[\\dA-Z]{20}",
                    HU: "\\d{24}",
                    IS: "\\d{22}",
                    IE: "[\\dA-Z]{4}\\d{14}",
                    IL: "\\d{19}",
                    IT: "[A-Z]\\d{10}[\\dA-Z]{12}",
                    KZ: "\\d{3}[\\dA-Z]{13}",
                    KW: "[A-Z]{4}[\\dA-Z]{22}",
                    LV: "[A-Z]{4}[\\dA-Z]{13}",
                    LB: "\\d{4}[\\dA-Z]{20}",
                    LI: "\\d{5}[\\dA-Z]{12}",
                    LT: "\\d{16}",
                    LU: "\\d{3}[\\dA-Z]{13}",
                    MK: "\\d{3}[\\dA-Z]{10}\\d{2}",
                    MT: "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
                    MR: "\\d{23}",
                    MU: "[A-Z]{4}\\d{19}[A-Z]{3}",
                    MC: "\\d{10}[\\dA-Z]{11}\\d{2}",
                    MD: "[\\dA-Z]{2}\\d{18}",
                    ME: "\\d{18}",
                    NL: "[A-Z]{4}\\d{10}",
                    NO: "\\d{11}",
                    PK: "[\\dA-Z]{4}\\d{16}",
                    PS: "[\\dA-Z]{4}\\d{21}",
                    PL: "\\d{24}",
                    PT: "\\d{21}",
                    RO: "[A-Z]{4}[\\dA-Z]{16}",
                    SM: "[A-Z]\\d{10}[\\dA-Z]{12}",
                    SA: "\\d{2}[\\dA-Z]{18}",
                    RS: "\\d{18}",
                    SK: "\\d{20}",
                    SI: "\\d{15}",
                    ES: "\\d{20}",
                    SE: "\\d{20}",
                    CH: "\\d{5}[\\dA-Z]{12}",
                    TN: "\\d{20}",
                    TR: "\\d{5}[\\dA-Z]{17}",
                    AE: "\\d{3}\\d{16}",
                    GB: "[A-Z]{4}\\d{14}",
                    VG: "[\\dA-Z]{4}\\d{16}"
                }[o.substring(0, 2)]) && !new RegExp("^[A-Z]{2}\\d{2}" + r + "$", "").test(o)) return !1;
            for (i = o.substring(4, o.length) + o.substring(0, 4), n = 0; n < i.length; n++) "0" !== (s = i.charAt(n)) && (c = !1), c || (l += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(s));
            for (a = 0; a < l.length; a++) u = ("" + u + l.charAt(a)) % 97;
            return 1 === u
        }, "Please specify a valid IBAN."), e.validator.addMethod("integer", function(e, t) {
            return this.optional(t) || /^-?\d+$/.test(e)
        }, "A positive or negative non-decimal number please."), e.validator.addMethod("ipv4", function(e, t) {
            return this.optional(t) || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(e)
        }, "Please enter a valid IP v4 address."), e.validator.addMethod("ipv6", function(e, t) {
            return this.optional(t) || /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(e)
        }, "Please enter a valid IP v6 address."), e.validator.addMethod("lessThan", function(t, i, s) {
            var r = e(s);
            return this.settings.onfocusout && r.not(".validate-lessThan-blur").length && r.addClass("validate-lessThan-blur").on("blur.validate-lessThan", function() {
                e(i).valid()
            }), t < r.val()
        }, "Please enter a lesser value."), e.validator.addMethod("lessThanEqual", function(t, i, s) {
            var r = e(s);
            return this.settings.onfocusout && r.not(".validate-lessThanEqual-blur").length && r.addClass("validate-lessThanEqual-blur").on("blur.validate-lessThanEqual", function() {
                e(i).valid()
            }), t <= r.val()
        }, "Please enter a lesser value."), e.validator.addMethod("lettersonly", function(e, t) {
            return this.optional(t) || /^[a-z]+$/i.test(e)
        }, "Letters only please."), e.validator.addMethod("letterswithbasicpunc", function(e, t) {
            return this.optional(t) || /^[a-z\-.,()'"\s]+$/i.test(e)
        }, "Letters or punctuation only please."), e.validator.addMethod("maxfiles", function(t, i, s) {
            return !!this.optional(i) || !("file" === e(i).attr("type") && i.files && i.files.length > s)
        }, e.validator.format("Please select no more than {0} files.")), e.validator.addMethod("maxsize", function(t, i, s) {
            if (this.optional(i)) return !0;
            if ("file" === e(i).attr("type") && i.files && i.files.length)
                for (var r = 0; r < i.files.length; r++)
                    if (i.files[r].size > s) return !1;
            return !0
        }, e.validator.format("File size must not exceed {0} bytes each.")), e.validator.addMethod("maxsizetotal", function(t, i, s) {
            if (this.optional(i)) return !0;
            if ("file" === e(i).attr("type") && i.files && i.files.length)
                for (var r = 0, n = 0; n < i.files.length; n++)
                    if ((r += i.files[n].size) > s) return !1;
            return !0
        }, e.validator.format("Total size of all files must not exceed {0} bytes.")), e.validator.addMethod("mobileNL", function(e, t) {
            return this.optional(t) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)6((\s|\s?\-\s?)?[0-9]){8}$/.test(e)
        }, "Please specify a valid mobile number."), e.validator.addMethod("mobileRU", function(e, t) {
            var i = e.replace(/\(|\)|\s+|-/g, "");
            return this.optional(t) || i.length > 9 && /^((\+7|7|8)+([0-9]){10})$/.test(i)
        }, "Please specify a valid mobile number."), e.validator.addMethod("mobileUK", function(e, t) {
            return e = e.replace(/\(|\)|\s+|-/g, ""), this.optional(t) || e.length > 9 && e.match(/^(?:(?:(?:00\s?|\+)44\s?|0)7(?:[1345789]\d{2}|624)\s?\d{3}\s?\d{3})$/)
        }, "Please specify a valid mobile number."), e.validator.addMethod("netmask", function(e, t) {
            return this.optional(t) || /^(254|252|248|240|224|192|128)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)/i.test(e)
        }, "Please enter a valid netmask."), e.validator.addMethod("nieES", function(e, t) {
            "use strict";
            if (this.optional(t)) return !0;
            var i, s = new RegExp(/^[MXYZ]{1}[0-9]{7,8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/gi),
                r = "TRWAGMYFPDXBNJZSQVHLCKET",
                n = e.substr(e.length - 1).toUpperCase();
            return !((e = e.toString().toUpperCase()).length > 10 || e.length < 9 || !s.test(e)) && (i = 9 === (e = e.replace(/^[X]/, "0").replace(/^[Y]/, "1").replace(/^[Z]/, "2")).length ? e.substr(0, 8) : e.substr(0, 9), r.charAt(parseInt(i, 10) % 23) === n)
        }, "Please specify a valid NIE number."), e.validator.addMethod("nifES", function(e, t) {
            "use strict";
            return !!this.optional(t) || !!(e = e.toUpperCase()).match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)") && (/^[0-9]{8}[A-Z]{1}$/.test(e) ? "TRWAGMYFPDXBNJZSQVHLCKE".charAt(e.substring(8, 0) % 23) === e.charAt(8) : !!/^[KLM]{1}/.test(e) && e[8] === "TRWAGMYFPDXBNJZSQVHLCKE".charAt(e.substring(8, 1) % 23))
        }, "Please specify a valid NIF number."), e.validator.addMethod("nipPL", function(e) {
            "use strict";
            if (10 !== (e = e.replace(/[^0-9]/g, "")).length) return !1;
            for (var t = [6, 5, 7, 2, 3, 4, 5, 6, 7], i = 0, s = 0; s < 9; s++) i += t[s] * e[s];
            var r = i % 11;
            return (10 === r ? 0 : r) === parseInt(e[9], 10)
        }, "Please specify a valid NIP number."), e.validator.addMethod("nisBR", function(e) {
            var t, i, s, r, n, a = 0;
            if (11 !== (e = e.replace(/([~!@#$%^&*()_+=`{}\[\]\-|\\:;'<>,.\/? ])+/g, "")).length) return !1;
            for (i = parseInt(e.substring(10, 11), 10), t = parseInt(e.substring(0, 10), 10), r = 2; r < 12; r++) n = r, 10 === r && (n = 2), 11 === r && (n = 3), a += t % 10 * n, t = parseInt(t / 10, 10);
            return i === (s = (s = a % 11) > 1 ? 11 - s : 0)
        }, "Please specify a valid NIS/PIS number."), e.validator.addMethod("notEqualTo", function(t, i, s) {
            return this.optional(i) || !e.validator.methods.equalTo.call(this, t, i, s)
        }, "Please enter a different value, values must not be the same."), e.validator.addMethod("nowhitespace", function(e, t) {
            return this.optional(t) || /^\S+$/i.test(e)
        }, "No white space please."), e.validator.addMethod("pattern", function(e, t, i) {
            return !!this.optional(t) || ("string" == typeof i && (i = new RegExp("^(?:" + i + ")$")), i.test(e))
        }, "Invalid format."), e.validator.addMethod("phoneNL", function(e, t) {
            return this.optional(t) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9]){8}$/.test(e)
        }, "Please specify a valid phone number."), e.validator.addMethod("phonePL", function(e, t) {
            e = e.replace(/\s+/g, "");
            var i = /^(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}$/;
            return this.optional(t) || i.test(e)
        }, "Please specify a valid phone number."), e.validator.addMethod("phonesUK", function(e, t) {
            return e = e.replace(/\(|\)|\s+|-/g, ""), this.optional(t) || e.length > 9 && e.match(/^(?:(?:(?:00\s?|\+)44\s?|0)(?:1\d{8,9}|[23]\d{9}|7(?:[1345789]\d{8}|624\d{6})))$/)
        }, "Please specify a valid uk phone number."), e.validator.addMethod("phoneUK", function(e, t) {
            return e = e.replace(/\(|\)|\s+|-/g, ""), this.optional(t) || e.length > 9 && e.match(/^(?:(?:(?:00\s?|\+)44\s?)|(?:\(?0))(?:\d{2}\)?\s?\d{4}\s?\d{4}|\d{3}\)?\s?\d{3}\s?\d{3,4}|\d{4}\)?\s?(?:\d{5}|\d{3}\s?\d{3})|\d{5}\)?\s?\d{4,5})$/)
        }, "Please specify a valid phone number."), e.validator.addMethod("phoneUS", function(e, t) {
            return e = e.replace(/\s+/g, ""), this.optional(t) || e.length > 9 && e.match(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]\d{2}-?\d{4}$/)
        }, "Please specify a valid phone number."), e.validator.addMethod("postalcodeBR", function(e, t) {
            return this.optional(t) || /^\d{2}.\d{3}-\d{3}?$|^\d{5}-?\d{3}?$/.test(e)
        }, "Informe um CEP v\xe1lido."), e.validator.addMethod("postalCodeCA", function(e, t) {
            return this.optional(t) || /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] *\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i.test(e)
        }, "Please specify a valid postal code."), e.validator.addMethod("postalcodeIT", function(e, t) {
            return this.optional(t) || /^\d{5}$/.test(e)
        }, "Please specify a valid postal code."), e.validator.addMethod("postalcodeNL", function(e, t) {
            return this.optional(t) || /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/.test(e)
        }, "Please specify a valid postal code."), e.validator.addMethod("postcodeUK", function(e, t) {
            return this.optional(t) || /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i.test(e)
        }, "Please specify a valid UK postcode."), e.validator.addMethod("require_from_group", function(t, i, s) {
            var r = e(s[1], i.form),
                n = r.eq(0),
                a = n.data("valid_req_grp") ? n.data("valid_req_grp") : e.extend({}, this),
                o = r.filter(function() {
                    return a.elementValue(this)
                }).length >= s[0];
            return n.data("valid_req_grp", a), e(i).data("being_validated") || (r.data("being_validated", !0), r.each(function() {
                a.element(this)
            }), r.data("being_validated", !1)), o
        }, e.validator.format("Please fill at least {0} of these fields.")), e.validator.addMethod("skip_or_fill_minimum", function(t, i, s) {
            var r = e(s[1], i.form),
                n = r.eq(0),
                a = n.data("valid_skip") ? n.data("valid_skip") : e.extend({}, this),
                o = r.filter(function() {
                    return a.elementValue(this)
                }).length,
                l = 0 === o || o >= s[0];
            return n.data("valid_skip", a), e(i).data("being_validated") || (r.data("being_validated", !0), r.each(function() {
                a.element(this)
            }), r.data("being_validated", !1)), l
        }, e.validator.format("Please either skip these fields or fill at least {0} of them.")), e.validator.addMethod("stateUS", function(e, t, i) {
            var s, r = void 0 === i,
                n = !r && void 0 !== i.caseSensitive && i.caseSensitive,
                a = !r && void 0 !== i.includeTerritories && i.includeTerritories,
                o = !r && void 0 !== i.includeMilitary && i.includeMilitary;
            return s = a || o ? a && o ? "^(A[AEKLPRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$" : a ? "^(A[KLRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$" : "^(A[AEKLPRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$" : "^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$", s = n ? new RegExp(s) : new RegExp(s, "i"), this.optional(t) || s.test(e)
        }, "Please specify a valid state."), e.validator.addMethod("strippedminlength", function(t, i, s) {
            return e(t).text().length >= s
        }, e.validator.format("Please enter at least {0} characters.")), e.validator.addMethod("time", function(e, t) {
            return this.optional(t) || /^([01]\d|2[0-3]|[0-9])(:[0-5]\d){1,2}$/.test(e)
        }, "Please enter a valid time, between 00:00 and 23:59."), e.validator.addMethod("time12h", function(e, t) {
            return this.optional(t) || /^((0?[1-9]|1[012])(:[0-5]\d){1,2}(\ ?[AP]M))$/i.test(e)
        }, "Please enter a valid time in 12-hour am/pm format."), e.validator.addMethod("url2", function(e, t) {
            return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})+(?::(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?)|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff])|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62}\.)))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e)
        }, e.validator.messages.url), e.validator.addMethod("vinUS", function(e) {
            if (17 !== e.length) return !1;
            var t, i, s, r, n, a = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
                o = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 7, 9, 2, 3, 4, 5, 6, 7, 8, 9],
                l = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2],
                c = 0;
            for (t = 0; t < 17; t++) r = l[t], s = e.slice(t, t + 1), isNaN(s) ? (s = s.toUpperCase(), i = o[a.indexOf(s)]) : i = parseInt(s, 10), 8 === t && (n = i, "X" === s && (n = 10)), c += i * r;
            return c % 11 === n
        }, "The specified vehicle identification number (VIN) is invalid."), e.validator.addMethod("zipcodeUS", function(e, t) {
            return this.optional(t) || /^\d{5}(-\d{4})?$/.test(e)
        }, "The specified US ZIP Code is invalid."), e.validator.addMethod("ziprange", function(e, t) {
            return this.optional(t) || /^90[2-5]\d\{2\}-\d{4}$/.test(e)
        }, "Your ZIP-code must be in the range 902xx-xxxx to 905xx-xxxx."), e
    }), Market.DOMUtils.FormValidation = {
        addError(e, t) {
            const i = e.closest(".e-form__group"),
                s = i.find(".e-form__response");
            if (s.length) s.html(t);
            else {
                const e = i.find(".e-form__input");
                _.isObject(t) ? (t.addClass("e-form__response"), e.after(t)) : e.after($(`<div class='e-form__response'>${t}</div>`))
            }
        },
        removeError(e) {
            e.closest(".e-form__group").find(".e-form__response").remove()
        },
        setFieldState(e, t) {
            const i = e.parent().next(".e-form__response");
            e.attr("data-status", t), i.attr("data-status", t)
        }
    }, Market.Validations.declineRefundRequest = function(e) {
        return this.dom = {
            $form: e,
            $notes: e.find(".js-decline-refund-request__notes")
        }, this.dom.$form.validate({
            errorClass: "is-error",
            errorElement: "div",
            rules: {
                "buying_refund_requests_decline_request_form[notes]": {
                    required: !0
                }
            },
            onfocusout(e) {
                return this.element(e)
            },
            errorPlacement(e, t) {
                Market.DOMUtils.FormValidation.addError(t, e)
            },
            messages: {
                "buying_refund_requests_decline_request_form[notes]": "Decline reason is required"
            }
        })
    }, Views.DeclineRefundRequest = class {
        constructor(e) {
            this.$el = e, this.dom = {
                $form: this.$el
            }, this._setupForm(), this.dom.$form.attr("data-ready", "true")
        }
        _setupForm() {
            Market.Validations.declineRefundRequest(this.dom.$form)
        }
    }, Views.DefaultMarketingConsent = class {
        constructor(e) {
            this.$el = e, $("[id='Your Location']").change(e => {
                const t = $(e.target);
                $("#user_confirmer_subscribed_to_envato_newsletter")[0].checked = "true" === t.find("option:selected").attr("data-country-marketing-consent")
            })
        }
    }, Views.Downloads = class {
        constructor(e) {
            this.dom = {
                $notify_on_update_checkbox: e.find(".notify_on_update"),
                $download__search__term: e.find(".download__search__term"),
                $clear_search: $(".download__search__clear")
            }, this.dom.$notify_on_update_checkbox.on("change", this.handleCheckBoxChange.bind(this)), this.dom.$download__search__term.on("input", this.handleInput.bind(this)), this.dom.$clear_search.on("click", this.handleClearSearch.bind(this)), this.dom.$download__search__term.focus(), this.dom.$download__search__term.val() && this.dom.$clear_search.show(), e.hasClass("list--downloads") && this._initFallbackDetection(e)
        }
        _initFallbackDetection(e) {
            const t = e.find(".download-dropdown__toggle");
            0 !== t.length && (window._downloadsErrorListenerRegistered || (window._downloadsErrorListenerRegistered = !0, window._downloadsCapturedError = null, window.addEventListener("error", e => {
                window._pendingDownloadClick && (window._downloadsCapturedError = {
                    message: e.message,
                    filename: e.filename,
                    lineno: e.lineno,
                    colno: e.colno,
                    stack: e.error ? .stack
                })
            })), t.on("click", e => {
                const t = $(e.currentTarget),
                    i = this._extractUniqueCode(t);
                window._pendingDownloadClick = i, window._downloadsCapturedError = null, setTimeout(() => {
                    t.hasClass("is-open") ? (window._pendingDownloadClick = null, window._downloadsCapturedError = null) : (window.Rollbar ? .error("download_dropdown:fallback_triggered", {
                        unique_code: i,
                        page: "user_downloads",
                        js_error: window._downloadsCapturedError,
                        user_agent: navigator.userAgent
                    }), window._pendingDownloadClick = null, window._downloadsCapturedError = null)
                }, 100)
            }))
        }
        _extractUniqueCode(e) {
            const t = (e.data("dropdownTarget") || "").match(/dropdown-(.+)/);
            return t ? t[1] : "unknown"
        }
        handleCheckBoxChange(e) {
            const t = $(e.target);
            t.prop("disabled", !0), t.parent().addClass("ajaxing");
            const i = function() {
                t.prop("disabled", !1), t.parent().removeClass("ajaxing")
            };
            $.ajax({
                type: "PUT",
                url: t.data("putUrl"),
                data: JSON.stringify({
                    notify_on_update: t.prop("checked")
                }),
                contentType: "application/json",
                dataType: "json"
            }).always(i)
        }
        handleInput(e) {
            $(".download__search__clear").show(), $(".download__search__suggestions").hide();
            const t = e.target.value;
            t.length > 3 ? (this.showSuggestions(e), this.initiateSuggestionListener()) : 0 === t.length && $(".download__search__clear").hide()
        }
        handleClearSearch(e) {
            this.dom.$download__search__term.val(""), $(".download__search__clear").hide(), $(".download__search__suggestions").hide()
        }
        showSuggestions(e) {
            const t = e.target.value.toLowerCase(),
                i = $(e.target).data("suggestions").filter(e => e.some(e => e.toLowerCase().includes(t))),
                s = i.map(e => '<li class="download__search__suggestions__suggestion"><a href="#" aria-label="click to populate search term" data-name="NAME"><span style="font-weight: bold;">NAME</span> in <span>CATEGORY</span></a></li>'.replace(/NAME/g, e[0]).replace("CATEGORY", e[1]));
            $(".download__search__suggestions").html(s), i.length > 0 && $(".download__search__suggestions").show()
        }
        initiateSuggestionListener() {
            $(".download__search__suggestions__suggestion > a").click(function(e) {
                e.preventDefault();
                const t = $(e.target).parent().is("a") ? $(e.target).parent("a").data("name") : $(e.target).data("name");
                $(".download__search__term").val(t), $(".download__search__suggestions").hide(), $("form.download__search").submit()
            })
        }
    },
    function(e) {
        function t(t, s, r) {
            return r = m(s, r), this.on("click.pjax", t, function(t) {
                var s = r;
                s.container || ((s = e.extend({}, r)).container = e(this).attr("data-pjax")), i(t, s)
            })
        }

        function i(t, i, s) {
            s = m(i, s);
            var n = t.currentTarget,
                a = e(n);
            if ("A" !== n.tagName.toUpperCase()) throw "$.fn.pjax or $.pjax.click requires an anchor element";
            if (!(t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey || location.protocol !== n.protocol || location.hostname !== n.hostname || n.href.indexOf("#") > -1 && f(n) == f(location) || t.isDefaultPrevented())) {
                var o = {
                        url: n.href,
                        container: a.attr("data-pjax"),
                        target: n
                    },
                    l = e.extend({}, o, s),
                    c = e.Event("pjax:click");
                a.trigger(c, [l]), c.isDefaultPrevented() || (r(l), t.preventDefault(), a.trigger("pjax:clicked", [l]))
            }
        }

        function s(t, i, s) {
            s = m(i, s);
            var n = t.currentTarget,
                a = e(n);
            if ("FORM" !== n.tagName.toUpperCase()) throw "$.pjax.submit requires a form element";
            var o = {
                type: (a.attr("method") || "GET").toUpperCase(),
                url: a.attr("action"),
                container: a.attr("data-pjax"),
                target: n
            };
            if ("GET" !== o.type && void 0 !== window.FormData) o.data = new FormData(n), o.processData = !1, o.contentType = !1;
            else {
                if (a.find(":file").length) return;
                o.data = a.serializeArray()
            }
            r(e.extend({}, o, s)), t.preventDefault()
        }

        function r(t) {
            function i(i, s, r) {
                r || (r = {}), r.relatedTarget = t.target;
                var n = e.Event(i, r);
                return l.trigger(n, s), !n.isDefaultPrevented()
            }
            t = e.extend(!0, {}, e.ajaxSettings, r.defaults, t), e.isFunction(t.url) && (t.url = t.url());
            var s = p(t.url).hash,
                n = e.type(t.container);
            if ("string" !== n) throw "expected string value for 'container' option; got " + n;
            var o, l = t.context = e(t.container);
            if (!l.length) throw "the container selector '" + t.container + "' did not match anything";
            t.data || (t.data = {}), e.isArray(t.data) ? t.data.push({
                name: "_pjax",
                value: t.container
            }) : t.data._pjax = t.container, t.beforeSend = function(e, r) {
                if ("GET" !== r.type && (r.timeout = 0), e.setRequestHeader("X-PJAX", "true"), e.setRequestHeader("X-PJAX-Container", t.container), !i("pjax:beforeSend", [e, r])) return !1;
                r.timeout > 0 && (o = setTimeout(function() {
                    i("pjax:timeout", [e, t]) && e.abort("timeout")
                }, r.timeout), r.timeout = 0);
                var n = p(r.url);
                s && (n.hash = s), t.requestUrl = d(n)
            }, t.complete = function(e, s) {
                o && clearTimeout(o), i("pjax:complete", [e, s, t]), i("pjax:end", [e, t])
            }, t.error = function(e, s, r) {
                var n = y("", e, t),
                    o = i("pjax:error", [e, s, r, t]);
                "GET" == t.type && "abort" !== s && o && a(n.url)
            }, t.success = function(n, o, c) {
                var h = r.state,
                    d = "function" == typeof e.pjax.defaults.version ? e.pjax.defaults.version() : e.pjax.defaults.version,
                    f = c.getResponseHeader("X-PJAX-Version"),
                    m = y(n, c, t),
                    g = p(m.url);
                if (s && (g.hash = s, m.url = g.href), d && f && d !== f) a(m.url);
                else if (m.contents) {
                    if (r.state = {
                            id: t.id || u(),
                            url: m.url,
                            title: m.title,
                            container: t.container,
                            fragment: t.fragment,
                            timeout: t.timeout
                        }, (t.push || t.replace) && window.history.replaceState(r.state, m.title, m.url), e.contains(l, document.activeElement)) try {
                        document.activeElement.blur()
                    } catch (e) {}
                    m.title && (document.title = m.title), i("pjax:beforeReplace", [m.contents, t], {
                        state: r.state,
                        previousState: h
                    }), l.html(m.contents);
                    var v = l.find("input[autofocus], textarea[autofocus]").last()[0];
                    v && document.activeElement !== v && v.focus(), b(m.scripts);
                    var _ = t.scrollTo;
                    if (s) {
                        var w = decodeURIComponent(s.slice(1)),
                            k = document.getElementById(w) || document.getElementsByName(w)[0];
                        k && (_ = e(k).offset().top)
                    }
                    "number" == typeof _ && e(window).scrollTop(_), i("pjax:success", [n, o, c, t])
                } else a(m.url)
            }, r.state || (r.state = {
                id: u(),
                url: window.location.href,
                title: document.title,
                container: t.container,
                fragment: t.fragment,
                timeout: t.timeout
            }, window.history.replaceState(r.state, document.title)), c(r.xhr), r.options = t;
            var f = r.xhr = e.ajax(t);
            return f.readyState > 0 && (t.push && !t.replace && (_(r.state.id, [t.container, h(l)]), window.history.pushState(null, "", t.requestUrl)), i("pjax:start", [f, t]), i("pjax:send", [f, t])), r.xhr
        }

        function n(t, i) {
            var s = {
                url: window.location.href,
                push: !1,
                replace: !0,
                scrollTo: !1
            };
            return r(e.extend(s, m(t, i)))
        }

        function a(e) {
            window.history.replaceState(null, "", r.state.url), window.location.replace(e)
        }

        function o(t) {
            S || c(r.xhr);
            var i, s = r.state,
                n = t.state;
            if (n && n.container) {
                if (S && A == n.url) return;
                if (s) {
                    if (s.id === n.id) return;
                    i = s.id < n.id ? "forward" : "back"
                }
                var o = P[n.id] || [],
                    l = o[0] || n.container,
                    u = e(l),
                    d = o[1];
                if (u.length) {
                    s && w(i, s.id, [l, h(u)]);
                    var p = e.Event("pjax:popstate", {
                        state: n,
                        direction: i
                    });
                    u.trigger(p);
                    var f = {
                        id: n.id,
                        url: n.url,
                        container: l,
                        push: !1,
                        fragment: n.fragment,
                        timeout: n.timeout,
                        scrollTo: !1
                    };
                    if (d) {
                        u.trigger("pjax:start", [null, f]), r.state = n, n.title && (document.title = n.title);
                        var m = e.Event("pjax:beforeReplace", {
                            state: n,
                            previousState: s
                        });
                        u.trigger(m, [d, f]), u.html(d), u.trigger("pjax:end", [null, f])
                    } else r(f);
                    u[0].offsetHeight
                } else a(location.href)
            }
            S = !1
        }

        function l(t) {
            var i = e.isFunction(t.url) ? t.url() : t.url,
                s = t.type ? t.type.toUpperCase() : "GET",
                r = e("<form>", {
                    method: "GET" === s ? "GET" : "POST",
                    action: i,
                    style: "display:none"
                });
            "GET" !== s && "POST" !== s && r.append(e("<input>", {
                type: "hidden",
                name: "_method",
                value: s.toLowerCase()
            }));
            var n = t.data;
            if ("string" == typeof n) e.each(n.split("&"), function(t, i) {
                var s = i.split("=");
                r.append(e("<input>", {
                    type: "hidden",
                    name: s[0],
                    value: s[1]
                }))
            });
            else if (e.isArray(n)) e.each(n, function(t, i) {
                r.append(e("<input>", {
                    type: "hidden",
                    name: i.name,
                    value: i.value
                }))
            });
            else if ("object" == typeof n) {
                var a;
                for (a in n) r.append(e("<input>", {
                    type: "hidden",
                    name: a,
                    value: n[a]
                }))
            }
            e(document.body).append(r), r.submit()
        }

        function c(t) {
            t && t.readyState < 4 && (t.onreadystatechange = e.noop, t.abort())
        }

        function u() {
            return (new Date).getTime()
        }

        function h(t) {
            var i = t.clone();
            return i.find("script").each(function() {
                this.src || e._data(this, "globalEval", !1)
            }), i.contents()
        }

        function d(e) {
            return e.search = e.search.replace(/([?&])(_pjax|_)=[^&]*/g, "").replace(/^&/, ""), e.href.replace(/\?($|#)/, "$1")
        }

        function p(e) {
            var t = document.createElement("a");
            return t.href = e, t
        }

        function f(e) {
            return e.href.replace(/#.*/, "")
        }

        function m(t, i) {
            return t && i ? ((i = e.extend({}, i)).container = t, i) : e.isPlainObject(t) ? t : {
                container: t
            }
        }

        function g(e, t) {
            return e.filter(t).add(e.find(t))
        }

        function v(t) {
            return e.parseHTML(t, document, !0)
        }

        function y(t, i, s) {
            var r, n, a = {},
                o = /<html/i.test(t),
                l = i.getResponseHeader("X-PJAX-URL");
            if (a.url = l ? d(p(l)) : s.requestUrl, o) {
                n = e(v(t.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
                var c = t.match(/<head[^>]*>([\s\S.]*)<\/head>/i);
                r = null != c ? e(v(c[0])) : n
            } else r = n = e(v(t));
            if (0 === n.length) return a;
            if (a.title = g(r, "title").last().text(), s.fragment) {
                var u = n;
                "body" !== s.fragment && (u = g(u, s.fragment).first()), u.length && (a.contents = "body" === s.fragment ? u : u.contents(), a.title || (a.title = u.attr("title") || u.data("title")))
            } else o || (a.contents = n);
            return a.contents && (a.contents = a.contents.not(function() {
                return e(this).is("title")
            }), a.contents.find("title").remove(), a.scripts = g(a.contents, "script[src]").remove(), a.contents = a.contents.not(a.scripts)), a.title && (a.title = e.trim(a.title)), a
        }

        function b(t) {
            if (t) {
                var i = e("script[src]");
                t.each(function() {
                    var t = this.src;
                    if (!i.filter(function() {
                            return this.src === t
                        }).length) {
                        var s = document.createElement("script"),
                            r = e(this).attr("type");
                        r && (s.type = r), s.src = e(this).attr("src"), document.head.appendChild(s)
                    }
                })
            }
        }

        function _(e, t) {
            P[e] = t, T.push(e), k(M, 0), k(T, r.defaults.maxCacheLength)
        }

        function w(e, t, i) {
            var s, n;
            P[t] = i, "forward" === e ? (s = T, n = M) : (s = M, n = T), s.push(t), (t = n.pop()) && delete P[t], k(s, r.defaults.maxCacheLength)
        }

        function k(e, t) {
            for (; e.length > t;) delete P[e.shift()]
        }

        function $() {
            return e("meta").filter(function() {
                var t = e(this).attr("http-equiv");
                return t && "X-PJAX-VERSION" === t.toUpperCase()
            }).attr("content")
        }

        function x() {
            e.fn.pjax = t, e.pjax = r, e.pjax.enable = e.noop, e.pjax.disable = C, e.pjax.click = i, e.pjax.submit = s, e.pjax.reload = n, e.pjax.defaults = {
                timeout: 650,
                push: !0,
                replace: !1,
                type: "GET",
                dataType: "html",
                scrollTo: 0,
                maxCacheLength: 20,
                version: $
            }, e(window).on("popstate.pjax", o)
        }

        function C() {
            e.fn.pjax = function() {
                return this
            }, e.pjax = l, e.pjax.enable = x, e.pjax.disable = e.noop, e.pjax.click = e.noop, e.pjax.submit = e.noop, e.pjax.reload = function() {
                window.location.reload()
            }, e(window).off("popstate.pjax", o)
        }
        var S = !0,
            A = window.location.href,
            D = window.history.state;
        D && D.container && (r.state = D), "state" in window.history && (S = !1);
        var P = {},
            M = [],
            T = [];
        e.event.props && e.inArray("state", e.event.props) < 0 ? e.event.props.push("state") : "state" in e.Event.prototype || e.event.addProp("state"), e.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/), e.support.pjax ? x() : C()
    }(jQuery), Views.EarningsData = class {
        constructor(e) {
            this.pjaxOptions = {
                timeout: 1e4,
                scrollTo: !1
            }, this.el = e, this.canvas = this.el.find(".js-graph__canvas")[0], this.$errorDiv = this.el.find(".js-graph__error-container"), this.$regionList = this.el.find(".js-minimap__region-list"), this.pjaxContainer = this.el.find(".js-pjax-container"), this.pjaxTable(), loadjs(this.el.data("jsPath"), {
                success: () => {
                    this.renderGraph(), this.togglePreloader(!1), this.updateRegionList()
                }
            })
        }
        pjaxTable() {
            $(document).on({
                "pjax:start": () => {
                    this.toggleError(!1)
                },
                "pjax:end": () => {
                    viewloader.execute(Views, this.el), this.renderGraph(), this.updateRegionList()
                },
                "pjax:send": () => {
                    this.togglePreloader(!0)
                },
                "pjax:complete": () => {
                    this.togglePreloader(!1)
                },
                "pjax:error": () => {
                    this.toggleError(!0)
                }
            }), $(document).pjax(".js-pjax-container a", ".js-pjax-container", this.pjaxOptions)
        }
        toggleError(e) {
            this.el.toggleClass("is-error", e)
        }
        togglePreloader(e) {
            this.el.toggleClass("is-preloading", e)
        }
        renderGraph() {
            let e;
            try {
                e = JSON.parse($("#graphdata").html())
            } catch (e) {
                return void this.toggleError(!0)
            }
            this.chart && this.chart.destroy(), this.chart = new Chart(this.canvas.getContext("2d"), {
                data: e,
                type: "line",
                options: {
                    clip: !1,
                    animation: {
                        easing: "easeInOutCirc"
                    },
                    elements: {
                        line: {
                            borderWidth: 2,
                            tension: .13
                        },
                        point: {
                            radius: 4,
                            borderWidth: 1
                        }
                    },
                    scales: {
                        y: {
                            min: 0,
                            ticks: {
                                callback: e => parseFloat(e).toLocaleString("en-EN", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 2
                                })
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: !1
                        },
                        tooltip: {
                            backgroundColor: "rgb(69, 69, 69)",
                            cornerRadius: 3,
                            padding: 8,
                            mode: "index",
                            intersect: !1,
                            displayColors: !1,
                            callbacks: {
                                title: () => "",
                                label: e => parseFloat(e.parsed.y).toLocaleString("en-EN", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 2
                                })
                            }
                        }
                    }
                }
            })
        }
        updateRegionList() {
            const e = $(".js-minimap__fetched-regions").clone().children();
            this.$regionList.empty(), e.length && this.$regionList.append(e), this._showEmptyState()
        }
        _getMaxValue(e) {
            const t = [];
            return _.each(e, e => t.push(_.max(e.data))), _.max(t)
        }
        _showEmptyState() {
            const e = this.pjaxContainer.find(".js-minimap__empty-contents").clone();
            e.addClass("is-visible"), this.$regionList.append(e)
        }
    }, Views.EarningsSummary = class {
        constructor(e) {
            this.$el = e, this.dom = {
                $statusMessage: this.$el.find(".js-earnings__status-message"),
                $statusMessageBox: this.$el.find(".js-earnings__status-message-box"),
                $summaryContent: this.$el.find(".js-statement-summary__content"),
                $authorFunds: this.$el.find(".js-earnings__author-funds"),
                $authorFundsOperator: this.$el.find(".js-statement-summary-author-funds__operator"),
                $earnings: this.$el.find(".js-earnings__earnings"),
                $earningsWrapper: this.$el.find(".js-earnings__earnings-wrapper"),
                $earningsOperator: this.$el.find(".js-statement-summary-earnings__operator"),
                $salesTax: this.$el.find(".js-earnings__sales-tax"),
                $salesTaxCell: this.$el.find(".js-earnings__sales-tax-cell"),
                $salesTaxWrapper: this.$el.find(".js-earnings__sales-tax-wrapper"),
                $salesTaxOperator: this.$el.find(".js-statement-summary-sales-tax__operator"),
                $taxWithheldEarnings: this.$el.find(".js-earnings__tax-withheld"),
                $taxWithheldOperator: this.$el.find(".js-statement-summary-tax-withheld__operator"),
                $taxWithheldWrapper: this.$el.find(".js-earnings__tax-withheld-wrapper"),
                $feesEarnings: this.$el.find(".js-earnings__fees"),
                $feesOperator: this.$el.find(".js-statement-summary-fees__operator"),
                $feesWrapper: this.$el.find(".js-earnings__fees-wrapper"),
                $feeTaxesCell: this.$el.find(".js-earnings__fee-taxes-cell"),
                $feeTaxesOnFees: this.$el.find(".js-earnings__fee-taxes"),
                $feeTaxesOperator: this.$el.find(".js-statement-summary-fee-taxes__operator"),
                $feeTaxesWrapper: this.$el.find(".js-earnings__fee-taxes-wrapper"),
                $preloader: this.$el.find(".js-statement-summary__preloader")
            }, this.currency = this.dom.$summaryContent.data("currency") || "$", this.fetchEarningsSummary()
        }
        _colorClass(e) {
            switch (e = parseFloat(e), !1) {
                case !(e < 0):
                    return "-color-warning";
                case !(e > 0):
                    return "-color-success"
            }
        }
        fetchEarningsSummary() {
            const e = window.location.href;
            $.ajax({
                url: e.replace("/statement", "/statement_earnings_summary"),
                type: "get",
                beforeSend: () => {
                    this._setStatusMessage({
                        status: "is-pending"
                    }), this._togglePreloader(!0)
                }
            }).then(e => {
                this._updateEarningsSummary(e)
            }).catch(() => {
                this._setStatusMessage({
                    status: "is-error",
                    message: "Something went wrong, please refresh and try again."
                }), this._togglePreloader(!1)
            })
        }
        _operator(e) {
            switch (e = parseFloat(e), !1) {
                case !(e < 0):
                    return "-";
                case !(e > 0):
                    return "+"
            }
        }
        _setStatusMessage(e) {
            this.dom.$statusMessageBox.removeClass("is-hidden--js"), this.dom.$summaryContent.addClass("is-hidden--js"), this.dom.$statusMessageBox.addClass(e.status), e.message && this.dom.$statusMessage.html(e.message)
        }
        _sumWithCurrency(e) {
            return e = e.replace("-", ""), `${this.currency}${e}`
        }
        _togglePreloader(e) {
            null == e && (e = !1), this.dom.$preloader.toggleClass("is-preloading", e)
        }
        _updateEarningsSummary(e) {
            const t = e.earnings,
                i = e.sales_tax,
                s = e.tax_withheld,
                r = e.fees,
                n = e.author_funds,
                a = e.fee_taxes;
            this.dom.$statusMessageBox.addClass("is-hidden--js"), this.dom.$summaryContent.removeClass("is-hidden--js"), this.dom.$authorFunds.html(this._sumWithCurrency(n)), parseFloat(n) < 0 && this.dom.$authorFundsOperator.html(this._operator(n)), this.dom.$earnings.html(this._sumWithCurrency(t)), this.dom.$earningsWrapper.addClass(this._colorClass(t)), this.dom.$earningsOperator.html(this._operator(t)), "0.00" !== i ? (this.dom.$salesTax.html(this._sumWithCurrency(i)), this.dom.$salesTaxWrapper.addClass(this._colorClass(i)), this.dom.$salesTaxOperator.html(this._operator(i)), this.dom.$salesTaxCell.css({
                display: ""
            })) : this.dom.$salesTaxCell.css({
                display: "none"
            }), "0.00" !== a ? (this.dom.$feeTaxesOnFees.html(this._sumWithCurrency(a)), this.dom.$feeTaxesWrapper.addClass(this._colorClass(a)), this.dom.$feeTaxesOperator.html(this._operator(a)), this.dom.$feeTaxesCell.css({
                display: ""
            })) : this.dom.$feeTaxesCell.css({
                display: "none"
            }), this.dom.$taxWithheldEarnings.html(this._sumWithCurrency(s)), this.dom.$taxWithheldWrapper.addClass(this._colorClass(s)), this.dom.$taxWithheldOperator.html(this._operator(s)), this.dom.$feesEarnings.html(this._sumWithCurrency(r)), this.dom.$feesWrapper.addClass(this._colorClass(r)), this.dom.$feesOperator.html(this._operator(r))
        }
    },
    function(e, t, i) {
        function s(t, i) {
            this.element = t, this.options = e.extend({}, n, i), this._defaults = n, this._name = r, this.init()
        }
        var r = "accordion",
            n = {
                transitionSpeed: 300,
                transitionEasing: "ease",
                controlElement: "[data-control]",
                contentElement: "[data-content]",
                groupElement: "[data-accordion-group]",
                singleOpen: !0
            };
        s.prototype.init = function() {
            function s(e, t, i) {
                var s;
                return function() {
                    function r() {
                        i || e.apply(n, a), s = null
                    }
                    var n = this,
                        a = arguments;
                    s ? clearTimeout(s) : i && e.apply(n, a), s = setTimeout(r, t || 100)
                }
            }

            function r() {
                var e = (i.body || i.documentElement).style,
                    t = "transition";
                if ("string" == typeof e[t]) return !0;
                var s = ["Moz", "webkit", "Webkit", "Khtml", "O", "ms"];
                t = "Transition";
                for (var r = 0; r < s.length; r++)
                    if ("string" == typeof e[s[r] + t]) return !0;
                return !1
            }

            function n(e) {
                return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame ? requestAnimationFrame(e) || webkitRequestAnimationFrame(e) || mozRequestAnimationFrame(e) : setTimeout(e, 1e3 / 60)
            }

            function a(e, t) {
                t ? _.css({
                    "-webkit-transition": "",
                    transition: ""
                }) : _.css({
                    "-webkit-transition": "max-height " + v.transitionSpeed + "ms " + v.transitionEasing,
                    transition: "max-height " + v.transitionSpeed + "ms " + v.transitionEasing
                })
            }

            function o(t) {
                var i = 0;
                t.children().each(function() {
                    i += e(this).outerHeight(!0)
                }), t.data("oHeight", i)
            }

            function l(t, i, s, r) {
                var n, a = t.filter(".open").find("> [data-content]"),
                    o = a.find("[data-accordion].open > [data-content]");
                v.singleOpen || (o = o.not(i.siblings("[data-accordion].open").find("> [data-content]"))), n = a.add(o), t.hasClass("open") && n.each(function() {
                    var t = e(this).data("oHeight");
                    switch (r) {
                        case "+":
                            e(this).data("oHeight", t + s);
                            break;
                        case "-":
                            e(this).data("oHeight", t - s);
                            break;
                        default:
                            throw "updateParentHeight method needs an operation"
                    }
                    e(this).css("max-height", e(this).data("oHeight"))
                })
            }

            function c(e) {
                if (e.hasClass("open")) {
                    var t = e.find("> [data-content]"),
                        i = t.find("[data-accordion].open > [data-content]"),
                        s = t.add(i);
                    o(s), s.css("max-height", s.data("oHeight"))
                }
            }

            function u(e, t) {
                if (e.trigger("accordion.close"), c(e), t.css("max-height"), $) {
                    if (w) l(e.parents("[data-accordion]"), e, t.data("oHeight"), "-");
                    t.css(k), e.removeClass("open")
                } else t.css("max-height", t.data("oHeight")), t.animate(k, v.transitionSpeed), e.removeClass("open")
            }

            function h(e, t) {
                if (e.trigger("accordion.open"), $) {
                    if (a(t), w) l(e.parents("[data-accordion]"), e, t.data("oHeight"), "+");
                    n(function() {
                        t.css("max-height", t.data("oHeight")), setTimeout(function() {
                            t.css("max-height", "none")
                        }, v.transitionSpeed), t.css("height", "auto")
                    }), e.addClass("open")
                } else t.animate({
                    "max-height": t.data("oHeight")
                }, v.transitionSpeed, function() {
                    t.css({
                        "max-height": "none"
                    })
                }), e.addClass("open")
            }

            function d(t) {
                t.closest(v.groupElement);
                var i = t.siblings("[data-accordion]").filter(".open"),
                    s = i.find("[data-accordion]").filter(".open"),
                    r = i.add(s);
                r.each(function() {
                    var t = e(this),
                        i = t.find(v.contentElement);
                    u(t, i)
                }), r.removeClass("open")
            }

            function p() {
                var e = !!v.singleOpen && y.parents(v.groupElement).length > 0;
                o(_), e && d(y), y.hasClass("open") ? u(y, _) : h(y, _)
            }

            function f() {
                b.on("click", p), b.on("accordion.toggle", function() {
                    if (v.singleOpen && b.length > 1) return !1;
                    p()
                }), e(t).on("resize", s(function() {
                    c(y)
                }))
            }

            function m() {
                _.each(function() {
                    var t = e(this);
                    0 != t.css("max-height") && (t.closest("[data-accordion]").hasClass("open") ? (a(t), o(t), t.css("max-height", t.data("oHeight"))) : t.css({
                        "max-height": 0,
                        overflow: "hidden"
                    }))
                }), y.attr("data-accordion") || (y.attr("data-accordion", ""), y.find(v.controlElement).attr("data-control", ""), y.find(v.contentElement).attr("data-content", ""))
            }
            var g = this,
                v = g.options,
                y = e(g.element),
                b = y.find("> " + v.controlElement),
                _ = y.find("> " + v.contentElement),
                w = y.parents("[data-accordion]").length > 0,
                k = {
                    "max-height": 0,
                    overflow: "hidden"
                },
                $ = r();
            m(), f()
        }, e.fn[r] = function(t) {
            return this.each(function() {
                e.data(this, "plugin_" + r) || e.data(this, "plugin_" + r, new s(this, t))
            })
        }
    }(jQuery, window, document), Views.EditItemForm = class {
        constructor(e) {
            this.dom = {
                $accordion: e.find(".js-.accordion")
            }, this.dom.$accordion.accordion({
                transitionSpeed: 400,
                singleOpen: !0
            })
        }
    }, Views.EditItemLicenses = class {
        constructor(e) {
            $("#extended").click(function() {
                this.checked ? $(".js-author-pricing-warning").removeClass("is-hidden--js") : $(".js-author-pricing-warning").addClass("is-hidden--js")
            })
        }
    }, Views.EsSimilarItems = class {
        constructor(e) {
            $.get(e.data("url"), function(t) {
                e.html(t), viewloader.execute(Views, e)
            })
        }
    }, Views.FancyLabel = class {
        constructor(e) {
            this.$el = e, this.$labels = this.$el.find(".js-fancy-label:not(.is-disabled)"), this.activateStates(), this.$labels.on({
                click: this.handleClick.bind(this),
                "fancyLabel:errorPlacement": this.handleError.bind(this),
                "fancyLabel:highlight": this.handleHighlight.bind(this),
                "fancyLabel:unhighlight": this.handleUnhighlight.bind(this),
                "fancyLabel:remoteStart": this.handleRemoteStart.bind(this),
                "fancyLabel:remoteEnd": this.handleRemoteEnd.bind(this)
            }), this.$labels.addClass("is-initialized")
        }
        handleClick(e) {
            let t;
            $(e.target).is(":text") ? (t = $(e.delegateTarget), $(e.target).parent().click(), this.updateLabel(t)) : $(e.target).is(":radio") && (t = $(e.delegateTarget), this.updateLabel(t))
        }
        updateLabel(e) {
            this.$labels.removeClass("is-active"), e.addClass("is-active");
            const t = e.find("input[type=text]");
            t.length && t.get(0).focus();
            const i = this.$labels.not(e).find("input[type='text']");
            i.length && (i.val("").valid(), i.closest(".js-fancy-label").removeClass("is-valid"), i.closest(".js-fancy-label-validation").removeClass("is-valid"))
        }
        handleError(e, t) {
            const i = $(e.delegateTarget);
            i.find(".js-fancy-label-validation-message").html(t).removeClass("is-hidden"), i.find(".js-fancy-label-hint").addClass("is-hidden")
        }
        handleHighlight(e) {
            const t = $(e.delegateTarget);
            t.addClass("is-invalid").removeClass("is-valid"), t.find(".js-fancy-label-validation").addClass("is-invalid").removeClass("is-valid")
        }
        handleUnhighlight(e) {
            const t = $(e.delegateTarget);
            t.removeClass("is-invalid").addClass("is-valid"), t.find(".js-fancy-label-validation").removeClass("is-invalid").addClass("is-valid"), t.find(".js-fancy-label-validation-message").html("").addClass("is-hidden"), t.find(".js-fancy-label-hint").removeClass("is-hidden"), t.hasClass("is-active") || (t.removeClass("is-valid is-invalid"), t.find(".js-fancy-label-validation").removeClass("is-valid is-invalid"))
        }
        handleRemoteStart(e) {
            $(e.delegateTarget).find(".js-fancy-label-validation").addClass("is-validating")
        }
        handleRemoteEnd(e) {
            $(e.delegateTarget).find(".js-fancy-label-validation").removeClass("is-validating")
        }
        activateStates() {
            this.$el.find(".js-fancy-label input[type='radio']:checked").each(function() {
                $(this).closest(".js-fancy-label").addClass("is-active")
            })
        }
    }, Views.Faqs = class {
        constructor(e) {
            e.on("click", ".js-faq-question, .js-faq-answer", this.handleClick.bind(this))
        }
        handleClick(e) {
            $(".js-faq-question, .js-faq-answer").removeClass("is-highlighted"), $($(e.target).attr("href")).addClass("is-highlighted")
        }
    }, Views.FilterSubmits = class {
        constructor(e) {
            e.on("change", e => $(e.target.form).submit())
        }
    }, Views.HostedDownload = class {
        constructor(e) {
            e.find(".js-purchase-code-toggle").on("click", this.togglePurchaseCode.bind(this))
        }
        togglePurchaseCode(e) {
            e.preventDefault();
            $(e.target).siblings(".js-purchase-code").toggleClass("is-visually-hidden")
        }
    }, Views.InputGroupDisabler = class {
        constructor(e) {
            this.$el = e, this.$group = this.$el.closest(".input-group"), this.$inputs = this.$group.find(":input").not(this.$el), this.$el.on("change.itemGroupDisabler", () => this.changed()), this.changed()
        }
        changed() {
            this.$el.prop("checked") ? this.$inputs.prop("disabled", !0).addClass("disabled") : this.$inputs.prop("disabled", !1).removeClass("disabled")
        }
    },
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.moment = t()
    }(this, function() {
        "use strict";

        function e() {
            return nr.apply(null, arguments)
        }

        function t(e) {
            nr = e
        }

        function i(e) {
            return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e)
        }

        function s(e) {
            return null != e && "[object Object]" === Object.prototype.toString.call(e)
        }

        function r(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }

        function n(e) {
            if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(e).length;
            var t;
            for (t in e)
                if (r(e, t)) return !1;
            return !0
        }

        function a(e) {
            return void 0 === e
        }

        function o(e) {
            return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e)
        }

        function l(e) {
            return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
        }

        function c(e, t) {
            var i, s = [],
                r = e.length;
            for (i = 0; i < r; ++i) s.push(t(e[i], i));
            return s
        }

        function u(e, t) {
            for (var i in t) r(t, i) && (e[i] = t[i]);
            return r(t, "toString") && (e.toString = t.toString), r(t, "valueOf") && (e.valueOf = t.valueOf), e
        }

        function h(e, t, i, s) {
            return Et(e, t, i, s, !0).utc()
        }

        function d() {
            return {
                empty: !1,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: !1,
                invalidEra: null,
                invalidMonth: null,
                invalidOffset: null,
                invalidFormat: !1,
                userInvalidated: !1,
                iso: !1,
                parsedDateParts: [],
                era: null,
                meridiem: null,
                rfc2822: !1,
                weekdayMismatch: !1
            }
        }

        function p(e) {
            return null == e._pf && (e._pf = d()), e._pf
        }

        function f(e) {
            var t = null,
                i = !1,
                s = e._d && !isNaN(e._d.getTime());
            return s && (t = p(e), i = ar.call(t.parsedDateParts, function(e) {
                return null != e
            }), s = t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidOffset && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && i), e._strict && (s = s && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour)), null != Object.isFrozen && Object.isFrozen(e) ? s : (e._isValid = s, e._isValid)
        }

        function m(e) {
            var t = h(NaN);
            return null != e ? u(p(t), e) : p(t).userInvalidated = !0, t
        }

        function g(e, t) {
            var i, s, r, n = or.length;
            if (a(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), a(t._i) || (e._i = t._i), a(t._f) || (e._f = t._f), a(t._l) || (e._l = t._l), a(t._strict) || (e._strict = t._strict), a(t._tzm) || (e._tzm = t._tzm), a(t._isUTC) || (e._isUTC = t._isUTC), a(t._offset) || (e._offset = t._offset), a(t._pf) || (e._pf = p(t)), a(t._locale) || (e._locale = t._locale), n > 0)
                for (i = 0; i < n; i++) a(r = t[s = or[i]]) || (e[s] = r);
            return e
        }

        function v(t) {
            g(this, t), this._d = new Date(null != t._d ? t._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === lr && (lr = !0, e.updateOffset(this), lr = !1)
        }

        function y(e) {
            return e instanceof v || null != e && null != e._isAMomentObject
        }

        function b(t) {
            !1 === e.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t)
        }

        function _(t, i) {
            var s = !0;
            return u(function() {
                if (null != e.deprecationHandler && e.deprecationHandler(null, t), s) {
                    var n, a, o, l = [],
                        c = arguments.length;
                    for (a = 0; a < c; a++) {
                        if (n = "", "object" == typeof arguments[a]) {
                            for (o in n += "\n[" + a + "] ", arguments[0]) r(arguments[0], o) && (n += o + ": " + arguments[0][o] + ", ");
                            n = n.slice(0, -2)
                        } else n = arguments[a];
                        l.push(n)
                    }
                    b(t + "\nArguments: " + Array.prototype.slice.call(l).join("") + "\n" + (new Error).stack), s = !1
                }
                return i.apply(this, arguments)
            }, i)
        }

        function w(t, i) {
            null != e.deprecationHandler && e.deprecationHandler(t, i), cr[t] || (b(i + "\n" + (new Error).stack), cr[t] = !0)
        }

        function k(e) {
            return "undefined" != typeof Function && e instanceof Function || "[object Function]" === Object.prototype.toString.call(e)
        }

        function $(e) {
            return "string" == typeof e ? hr[e] || hr[e.toLowerCase()] : void 0
        }

        function x(e) {
            var t, i, s = {};
            for (i in e) r(e, i) && (t = $(i)) && (s[t] = e[i]);
            return s
        }

        function C(e) {
            var t, i = [];
            for (t in e) r(e, t) && i.push({
                unit: t,
                priority: dr[t]
            });
            return i.sort(function(e, t) {
                return e.priority - t.priority
            }), i
        }

        function S(e, t, i) {
            var s = "" + Math.abs(e),
                r = t - s.length;
            return (e >= 0 ? i ? "+" : "" : "-") + Math.pow(10, Math.max(0, r)).toString().substr(1) + s
        }

        function A(e, t, i, s) {
            var r = s;
            "string" == typeof s && (r = function() {
                return this[s]()
            }), e && (gr[e] = r), t && (gr[t[0]] = function() {
                return S(r.apply(this, arguments), t[1], t[2])
            }), i && (gr[i] = function() {
                return this.localeData().ordinal(r.apply(this, arguments), e)
            })
        }

        function D(e) {
            return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
        }

        function P(e) {
            var t, i, s = e.match(pr);
            for (t = 0, i = s.length; t < i; t++) gr[s[t]] ? s[t] = gr[s[t]] : s[t] = D(s[t]);
            return function(t) {
                var r, n = "";
                for (r = 0; r < i; r++) n += k(s[r]) ? s[r].call(t, e) : s[r];
                return n
            }
        }

        function M(e, t) {
            if (!e.isValid()) return e.localeData().invalidDate();
            var i = "$" + (t = T(t, e.localeData()));
            return r(mr, i) || (mr[i] = P(t)), mr[i](e)
        }

        function T(e, t) {
            function i(e) {
                return t.longDateFormat(e) || e
            }
            var s = 5;
            for (fr.lastIndex = 0; s >= 0 && fr.test(e);) e = e.replace(fr, i), fr.lastIndex = 0, s -= 1;
            return e
        }

        function E(e, t, i) {
            ur[e] = k(t) ? t : function(e) {
                return e && i ? i : t
            }
        }

        function F(e, t) {
            return r(ur, e) ? ur[e](t._strict, t._locale) : new RegExp(j(e))
        }

        function j(e) {
            return I(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, i, s, r) {
                return t || i || s || r
            }))
        }

        function I(e) {
            return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }

        function L(e) {
            return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
        }

        function O(e) {
            var t = +e,
                i = 0;
            return 0 !== t && isFinite(t) && (i = L(t)), i
        }

        function R(e, t) {
            var i, s, r = t;
            for ("string" == typeof e && (e = [e]), o(t) && (r = function(e, i) {
                    i[t] = O(e)
                }), s = e.length, i = 0; i < s; i++) Lr[e[i]] = r
        }

        function B(e, t) {
            R(e, function(e, i, s, r) {
                s._w = s._w || {}, t(e, s._w, s, r)
            })
        }

        function N(e, t, i) {
            null != t && r(Lr, e) && Lr[e](t, i._a, i, e)
        }

        function U(e) {
            return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
        }

        function V(e) {
            return U(e) ? 366 : 365
        }

        function q() {
            return U(this.year())
        }

        function H(t, i) {
            return function(s) {
                return null != s ? (Y(this, t, s), e.updateOffset(this, i), this) : W(this, t)
            }
        }

        function W(e, t) {
            if (!e.isValid()) return NaN;
            var i = e._d,
                s = e._isUTC;
            switch (t) {
                case "Milliseconds":
                    return s ? i.getUTCMilliseconds() : i.getMilliseconds();
                case "Seconds":
                    return s ? i.getUTCSeconds() : i.getSeconds();
                case "Minutes":
                    return s ? i.getUTCMinutes() : i.getMinutes();
                case "Hours":
                    return s ? i.getUTCHours() : i.getHours();
                case "Date":
                    return s ? i.getUTCDate() : i.getDate();
                case "Day":
                    return s ? i.getUTCDay() : i.getDay();
                case "Month":
                    return s ? i.getUTCMonth() : i.getMonth();
                case "FullYear":
                    return s ? i.getUTCFullYear() : i.getFullYear();
                default:
                    return NaN
            }
        }

        function Y(e, t, i) {
            var s, r, n, a, o;
            if (e.isValid() && !isNaN(i)) {
                switch (s = e._d, r = e._isUTC, t) {
                    case "Milliseconds":
                        return void(r ? s.setUTCMilliseconds(i) : s.setMilliseconds(i));
                    case "Seconds":
                        return void(r ? s.setUTCSeconds(i) : s.setSeconds(i));
                    case "Minutes":
                        return void(r ? s.setUTCMinutes(i) : s.setMinutes(i));
                    case "Hours":
                        return void(r ? s.setUTCHours(i) : s.setHours(i));
                    case "Date":
                        return void(r ? s.setUTCDate(i) : s.setDate(i));
                    case "FullYear":
                        break;
                    default:
                        return
                }
                n = i, a = e.month(), o = 29 !== (o = e.date()) || 1 !== a || U(n) ? o : 28, r ? s.setUTCFullYear(n, a, o) : s.setFullYear(n, a, o)
            }
        }

        function z(e) {
            return k(this[e = $(e)]) ? this[e]() : this
        }

        function G(e, t) {
            if ("object" == typeof e) {
                var i, s = C(e = x(e)),
                    r = s.length;
                for (i = 0; i < r; i++) this[s[i].unit](e[s[i].unit])
            } else if (k(this[e = $(e)])) return this[e](t);
            return this
        }

        function Z(e, t) {
            return (e % t + t) % t
        }

        function Q(e, t) {
            if (isNaN(e) || isNaN(t)) return NaN;
            var i = Z(t, 12);
            return e += (t - i) / 12, 1 === i ? U(e) ? 29 : 28 : 31 - i % 7 % 2
        }

        function K(e, t) {
            var i, s;
            for (i = 0; i < Xr.length; i++) r(t, s = Xr[i]) || delete e["_" + s]
        }

        function J(e, t) {
            return e ? i(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Qr).test(t) ? "format" : "standalone"][e.month()] : i(this._months) ? this._months : this._months.standalone
        }

        function X(e, t) {
            return e ? i(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Qr.test(t) ? "format" : "standalone"][e.month()] : i(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
        }

        function ee(e, t, i) {
            var s, r, n, a = e.toLocaleLowerCase();
            if (!this._monthsParse)
                for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], s = 0; s < 12; ++s) n = h([2e3, s]), this._shortMonthsParse[s] = this.monthsShort(n, "").toLocaleLowerCase(), this._longMonthsParse[s] = this.months(n, "").toLocaleLowerCase();
            return i ? "MMM" === t ? -1 !== (r = Yr.call(this._shortMonthsParse, a)) ? r : null : -1 !== (r = Yr.call(this._longMonthsParse, a)) ? r : null : "MMM" === t ? -1 !== (r = Yr.call(this._shortMonthsParse, a)) || -1 !== (r = Yr.call(this._longMonthsParse, a)) ? r : null : -1 !== (r = Yr.call(this._longMonthsParse, a)) || -1 !== (r = Yr.call(this._shortMonthsParse, a)) ? r : null
        }

        function te(e, t, i) {
            var s, r, n;
            if (this._monthsParseExact) return ee.call(this, e, t, i);
            for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), s = 0; s < 12; s++) {
                if (r = h([2e3, s]), i && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i"), this._shortMonthsParse[s] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i")), i || this._monthsParse[s] || (n = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), this._monthsParse[s] = new RegExp(n.replace(".", ""), "i")), i && "MMMM" === t && this._longMonthsParse[s].test(e)) return s;
                if (i && "MMM" === t && this._shortMonthsParse[s].test(e)) return s;
                if (!i && this._monthsParse[s].test(e)) return s
            }
        }

        function ie(e, t) {
            if (!e.isValid()) return e;
            if ("string" == typeof t)
                if (/^\d+$/.test(t)) t = O(t);
                else if (!o(t = e.localeData().monthsParse(t))) return e;
            var i = t,
                s = e.date();
            return s = s < 29 ? s : Math.min(s, Q(e.year(), i)), e._isUTC ? e._d.setUTCMonth(i, s) : e._d.setMonth(i, s), e
        }

        function se(t) {
            return null != t ? (ie(this, t), e.updateOffset(this, !0), this) : W(this, "Month")
        }

        function re() {
            return Q(this.year(), this.month())
        }

        function ne(e) {
            return this._monthsParseExact ? (r(this, "_monthsRegex") || oe.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (r(this, "_monthsShortRegex") || (this._monthsShortRegex = Kr), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex)
        }

        function ae(e) {
            return this._monthsParseExact ? (r(this, "_monthsRegex") || oe.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (r(this, "_monthsRegex") || (this._monthsRegex = Jr), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex)
        }

        function oe() {
            function e(e, t) {
                return t.length - e.length
            }
            var t, i, s, r, n = [],
                a = [],
                o = [];
            for (t = 0; t < 12; t++) i = h([2e3, t]), s = I(this.monthsShort(i, "")), r = I(this.months(i, "")), n.push(s), a.push(r), o.push(r), o.push(s);
            n.sort(e), a.sort(e), o.sort(e), this._monthsRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + n.join("|") + ")", "i")
        }

        function le(e, t) {
            return "string" != typeof e ? e : isNaN(e) ? "number" == typeof(e = t.weekdaysParse(e)) ? e : null : parseInt(e, 10)
        }

        function ce(e, t) {
            return "string" == typeof e ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e
        }

        function ue(e, t) {
            return e.slice(t, 7).concat(e.slice(0, t))
        }

        function he(e, t) {
            var i, s;
            for (i = 0; i < ln.length; i++) r(t, s = ln[i]) || delete e["_" + s]
        }

        function de(e, t) {
            var s = i(this._weekdays) ? this._weekdays : this._weekdays[e && !0 !== e && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
            return !0 === e ? ue(s, this._week.dow) : e ? s[e.day()] : s
        }

        function pe(e) {
            return !0 === e ? ue(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort
        }

        function fe(e) {
            return !0 === e ? ue(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin
        }

        function me(e, t, i) {
            var s, r, n, a = e.toLocaleLowerCase();
            if (!this._weekdaysParse)
                for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], s = 0; s < 7; ++s) n = h([2e3, 1]).day(s), this._minWeekdaysParse[s] = this.weekdaysMin(n, "").toLocaleLowerCase(), this._shortWeekdaysParse[s] = this.weekdaysShort(n, "").toLocaleLowerCase(), this._weekdaysParse[s] = this.weekdays(n, "").toLocaleLowerCase();
            return i ? "dddd" === t ? -1 !== (r = Yr.call(this._weekdaysParse, a)) ? r : null : "ddd" === t ? -1 !== (r = Yr.call(this._shortWeekdaysParse, a)) ? r : null : -1 !== (r = Yr.call(this._minWeekdaysParse, a)) ? r : null : "dddd" === t ? -1 !== (r = Yr.call(this._weekdaysParse, a)) || -1 !== (r = Yr.call(this._shortWeekdaysParse, a)) || -1 !== (r = Yr.call(this._minWeekdaysParse, a)) ? r : null : "ddd" === t ? -1 !== (r = Yr.call(this._shortWeekdaysParse, a)) || -1 !== (r = Yr.call(this._weekdaysParse, a)) || -1 !== (r = Yr.call(this._minWeekdaysParse, a)) ? r : null : -1 !== (r = Yr.call(this._minWeekdaysParse, a)) || -1 !== (r = Yr.call(this._weekdaysParse, a)) || -1 !== (r = Yr.call(this._shortWeekdaysParse, a)) ? r : null
        }

        function ge(e, t, i) {
            var s, r, n;
            if (this._weekdaysParseExact) return me.call(this, e, t, i);
            for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), s = 0; s < 7; s++) {
                if (r = h([2e3, 1]).day(s), i && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp("^" + this.weekdays(r, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[s] = new RegExp("^" + this.weekdaysShort(r, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[s] = new RegExp("^" + this.weekdaysMin(r, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[s] || (n = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""), this._weekdaysParse[s] = new RegExp(n.replace(".", ""), "i")), i && "dddd" === t && this._fullWeekdaysParse[s].test(e)) return s;
                if (i && "ddd" === t && this._shortWeekdaysParse[s].test(e)) return s;
                if (i && "dd" === t && this._minWeekdaysParse[s].test(e)) return s;
                if (!i && this._weekdaysParse[s].test(e)) return s
            }
        }

        function ve(e) {
            if (!this.isValid()) return null != e ? this : NaN;
            var t = W(this, "Day");
            return null != e ? (e = le(e, this.localeData()), this.add(e - t, "d")) : t
        }

        function ye(e) {
            if (!this.isValid()) return null != e ? this : NaN;
            var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null == e ? t : this.add(e - t, "d")
        }

        function be(e) {
            if (!this.isValid()) return null != e ? this : NaN;
            if (null != e) {
                var t = ce(e, this.localeData());
                return this.day(this.day() % 7 ? t : t - 7)
            }
            return this.day() || 7
        }

        function _e(e) {
            return this._weekdaysParseExact ? (r(this, "_weekdaysRegex") || $e.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (r(this, "_weekdaysRegex") || (this._weekdaysRegex = nn), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex)
        }

        function we(e) {
            return this._weekdaysParseExact ? (r(this, "_weekdaysRegex") || $e.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (r(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = an), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
        }

        function ke(e) {
            return this._weekdaysParseExact ? (r(this, "_weekdaysRegex") || $e.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (r(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = on), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
        }

        function $e() {
            function e(e, t) {
                return t.length - e.length
            }
            var t, i, s, r, n, a = [],
                o = [],
                l = [],
                c = [];
            for (t = 0; t < 7; t++) i = h([2e3, 1]).day(t), s = I(this.weekdaysMin(i, "")), r = I(this.weekdaysShort(i, "")), n = I(this.weekdays(i, "")), a.push(s), o.push(r), l.push(n), c.push(s), c.push(r), c.push(n);
            a.sort(e), o.sort(e), l.sort(e), c.sort(e), this._weekdaysRegex = new RegExp("^(" + c.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + a.join("|") + ")", "i")
        }

        function xe(e) {
            var t, i;
            for (i in K(this, e), he(this, e), e) r(e, i) && (k(t = e[i]) ? this[i] = t : this["_" + i] = t);
            this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
        }

        function Ce(e, t) {
            var i, n = u({}, e);
            for (i in t) r(t, i) && (s(e[i]) && s(t[i]) ? (n[i] = {}, u(n[i], e[i]), u(n[i], t[i])) : null != t[i] ? n[i] = t[i] : delete n[i]);
            for (i in e) r(e, i) && !r(t, i) && s(e[i]) && (n[i] = u({}, n[i]));
            return n
        }

        function Se(e) {
            null != e && this.set(e)
        }

        function Ae(e, t, i) {
            var s = this._calendar[e] || this._calendar.sameElse;
            return k(s) ? s.call(t, i) : s
        }

        function De(e) {
            var t = this._longDateFormat[e],
                i = this._longDateFormat[e.toUpperCase()],
                s = this._longDateFormatCache;
            return t || !i ? t : s && s[e] && s[e].formatUpper === i ? s[e].format : (t = i.match(pr).map(function(e) {
                return "MMMM" === e || "MM" === e || "DD" === e || "dddd" === e ? e.slice(1) : e
            }).join(""), s || (s = this._longDateFormatCache = {}), s[e] = {
                formatUpper: i,
                format: t
            }, t)
        }

        function Pe() {
            return this._invalidDate
        }

        function Me(e) {
            return this._ordinal.replace("%d", e)
        }

        function Te(e, t, i, s) {
            var r = this._relativeTime[i];
            return k(r) ? r(e, t, i, s) : r.replace(/%d/i, e)
        }

        function Ee(e, t, i, s) {
            return this.postformat(Te.call(this, e, t, i, s))
        }

        function Fe(e, t) {
            var i = this._relativeTime[e > 0 ? "future" : "past"];
            return k(i) ? i(t) : i.replace(/%s/i, t)
        }

        function je(e, t) {
            return this.postformat(Fe.call(this, e, t))
        }

        function Ie(e, t, i, s, r, n, a) {
            var o;
            return e < 100 && e >= 0 ? (o = new Date(e + 400, t, i, s, r, n, a), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, i, s, r, n, a), o
        }

        function Le(e) {
            var t, i;
            return e < 100 && e >= 0 ? ((i = Array.prototype.slice.call(arguments))[0] = e + 400, t = new Date(Date.UTC.apply(null, i)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t
        }

        function Oe(e, t, i) {
            var s = 7 + t - i;
            return -((7 + Le(e, 0, s).getUTCDay() - t) % 7) + s - 1
        }

        function Re(e, t, i, s, r) {
            var n, a, o = 1 + 7 * (t - 1) + (7 + i - s) % 7 + Oe(e, s, r);
            return o <= 0 ? a = V(n = e - 1) + o : o > V(e) ? (n = e + 1, a = o - V(e)) : (n = e, a = o), {
                year: n,
                dayOfYear: a
            }
        }

        function Be(e, t, i, s) {
            var r, n, a = Oe(e, i, s),
                o = Math.floor((t - a - 1) / 7) + 1;
            return o < 1 ? r = o + Ve(n = e - 1, i, s) : o > Ve(e, i, s) ? (r = o - Ve(e, i, s), n = e + 1) : (n = e, r = o), {
                week: r,
                year: n
            }
        }

        function Ne(e, t, i) {
            return Be(e.year(), e.dayOfYear(), t, i)
        }

        function Ue(e, t, i, s, r) {
            return Be(e, Math.round((Le(e, t, i) - Le(e, 0, 1)) / 864e5) + 1, s, r)
        }

        function Ve(e, t, i) {
            var s = Oe(e, t, i),
                r = Oe(e + 1, t, i);
            return (V(e) - s + r) / 7
        }

        function qe(e) {
            return Ne(e, this._week.dow, this._week.doy).week
        }

        function He() {
            return this._week.dow
        }

        function We() {
            return this._week.doy
        }

        function Ye(e) {
            var t = this.localeData().week(this);
            return null == e ? t : this.add(7 * (e - t), "d")
        }

        function ze(e) {
            var t = Ne(this, 1, 4).week;
            return null == e ? t : this.add(7 * (e - t), "d")
        }

        function Ge() {
            return this.hours() % 12 || 12
        }

        function Ze() {
            return this.hours() || 24
        }

        function Qe(e, t) {
            A(e, 0, 0, function() {
                return this.localeData().meridiem(this.hours(), this.minutes(), t)
            })
        }

        function Ke(e, t) {
            return t._meridiemParse
        }

        function Je(e) {
            return "p" === (e + "").toLowerCase().charAt(0)
        }

        function Xe(e, t, i) {
            return e > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
        }

        function et(e, t) {
            var i, s = Math.min(e.length, t.length);
            for (i = 0; i < s; i += 1)
                if (e[i] !== t[i]) return i;
            return s
        }

        function tt(e) {
            return e ? e.toLowerCase().replace("_", "-") : e
        }

        function it(e) {
            for (var t, i, s, r, n = 0; n < e.length;) {
                for (t = (r = tt(e[n]).split("-")).length, i = (i = tt(e[n + 1])) ? i.split("-") : null; t > 0;) {
                    if (s = rt(r.slice(0, t).join("-"))) return s;
                    if (i && i.length >= t && et(r, i) >= t - 1) break;
                    t--
                }
                n++
            }
            return gn
        }

        function st(e) {
            return "string" == typeof e && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e)
        }

        function rt(e) {
            var t, i = null;
            if (r(_n, e)) return _n[e];
            if (t = tt(e), r(_n, t)) return _n[t];
            if ("undefined" != typeof module && module && module.exports && st(t)) try {
                i = gn._abbr, require("./locale/" + t), nt(i)
            } catch (e) {
                _n[t] = null
            }
            return r(_n, t) ? _n[t] : void 0
        }

        function nt(e, t) {
            var i;
            return e && ((i = a(t) ? lt(e) : at(e, t)) ? gn = i : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), gn._abbr
        }

        function at(e, t) {
            if (null !== t) {
                var i, s = bn;
                if (t.abbr = e, null != _n[e]) w("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), s = _n[e]._config;
                else if (null != t.parentLocale)
                    if (null != _n[t.parentLocale]) s = _n[t.parentLocale]._config;
                    else {
                        if (null == (i = rt(t.parentLocale))) return wn[t.parentLocale] || (wn[t.parentLocale] = []), wn[t.parentLocale].push({
                            name: e,
                            config: t
                        }), null;
                        s = i._config
                    }
                return _n[e] = new Se(Ce(s, t)), wn[e] && wn[e].forEach(function(e) {
                    at(e.name, e.config)
                }), nt(e), _n[e]
            }
            return delete _n[e], null
        }

        function ot(e, t) {
            var i, s = rt(e),
                r = bn;
            return null != s && (e = s._abbr), null != t ? (null != _n[e] && null != _n[e].parentLocale ? _n[e].set(Ce(_n[e]._config, t)) : (null != s && (r = s._config), t = Ce(r, t), null == s && (t.abbr = e), (i = new Se(t)).parentLocale = _n[e], _n[e] = i), nt(e)) : null != _n[e] && (null != _n[e].parentLocale ? (_n[e] = _n[e].parentLocale, e === nt() && nt(e)) : null != _n[e] && delete _n[e]), _n[e]
        }

        function lt(e) {
            var t;
            if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return gn;
            if (!i(e)) {
                if (t = rt(e)) return t;
                e = [e]
            }
            return it(e)
        }

        function ct() {
            return en(_n)
        }

        function ut(e) {
            var t, i = e._a;
            return i && -2 === p(e).overflow && (t = i[Rr] < 0 || i[Rr] > 11 ? Rr : i[Br] < 1 || i[Br] > Q(i[Or], i[Rr]) ? Br : i[Nr] < 0 || i[Nr] > 24 || 24 === i[Nr] && (0 !== i[Ur] || 0 !== i[Vr] || 0 !== i[qr]) ? Nr : i[Ur] < 0 || i[Ur] > 59 ? Ur : i[Vr] < 0 || i[Vr] > 59 ? Vr : i[qr] < 0 || i[qr] > 999 ? qr : -1, p(e)._overflowDayOfYear && (t < Or || t > Br) && (t = Br), p(e)._overflowWeeks && -1 === t && (t = Hr), p(e)._overflowWeekday && -1 === t && (t = Wr), p(e).overflow = t), e
        }

        function ht(e) {
            var t, i, s, r, n, a, o = e._i,
                l = kn.exec(o) || $n.exec(o),
                c = Cn.length,
                u = Sn.length;
            if (l) {
                for (p(e).iso = !0, t = 0, i = c; t < i; t++)
                    if (Cn[t][1].exec(l[1])) {
                        r = Cn[t][0], s = !1 !== Cn[t][2];
                        break
                    }
                if (null == r) return void(e._isValid = !1);
                if (l[3]) {
                    for (t = 0, i = u; t < i; t++)
                        if (Sn[t][1].exec(l[3])) {
                            n = (l[2] || " ") + Sn[t][0];
                            break
                        }
                    if (null == n) return void(e._isValid = !1)
                }
                if (!s && null != n) return void(e._isValid = !1);
                if (l[4]) {
                    if (!xn.exec(l[4])) return void(e._isValid = !1);
                    a = "Z"
                }
                e._f = r + (n || "") + (a || ""), Ct(e)
            } else e._isValid = !1
        }

        function dt(e, t, i, s, r, n) {
            var a = [pt(e), Zr.indexOf(t), parseInt(i, 10), parseInt(s, 10), parseInt(r, 10)];
            return n && a.push(parseInt(n, 10)), a
        }

        function pt(e) {
            var t = parseInt(e, 10);
            return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t
        }

        function ft(e) {
            return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
        }

        function mt(e, t, i) {
            if (e && sn.indexOf(e) !== new Date(t[0], t[1], t[2]).getDay()) return p(i).weekdayMismatch = !0, i._isValid = !1, !1;
            return !0
        }

        function gt(e, t, i) {
            if (e) return Pn[e];
            if (t) return 0;
            var s = parseInt(i, 10),
                r = s % 100;
            return 60 * ((s - r) / 100) + r
        }

        function vt(e) {
            var t, i = Dn.exec(ft(e._i));
            if (i) {
                if (t = dt(i[4], i[3], i[2], i[5], i[6], i[7]), !mt(i[1], t, e)) return;
                e._a = t, e._tzm = gt(i[8], i[9], i[10]), e._d = Le.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), p(e).rfc2822 = !0
            } else e._isValid = !1
        }

        function yt(t) {
            var i = An.exec(t._i);
            null === i ? (ht(t), !1 === t._isValid && (delete t._isValid, vt(t), !1 === t._isValid && (delete t._isValid, t._strict ? t._isValid = !1 : e.createFromInputFallback(t)))) : t._d = new Date(+i[1])
        }

        function bt(e, t, i) {
            return null != e ? e : null != t ? t : i
        }

        function _t(t, i, s) {
            var r = Object.prototype.hasOwnProperty.call(t, "_isDefaultDatePartsForWeek"),
                n = t._isDefaultDatePartsForWeek;
            t._isDefaultDatePartsForWeek = !!s;
            try {
                return e._getDefaultDateParts(t, i, s)
            } finally {
                r ? t._isDefaultDatePartsForWeek = n : delete t._isDefaultDatePartsForWeek
            }
        }

        function wt(t) {
            var i = t._defaultDatePartsNow;
            return i ? (i.hasValue || (i.value = e.now(), i.hasValue = !0), i.value) : e.now()
        }

        function kt(e, t, i) {
            var s = i || e._isDefaultDatePartsForWeek,
                r = s ? Ft(t) : new Date(t);
            return s ? [r.year(), r.month(), r.date()] : e._useUTC ? [r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate()] : [r.getFullYear(), r.getMonth(), r.getDate()]
        }

        function $t(e) {
            var t, i, s, r, n, a, o, l = [];
            if (!e._d) {
                for (null != e._a[Or] && null != e._a[Rr] && null != e._a[Br] || (r = _t(e, s = wt(e))), e._w && null == e._a[Br] && null == e._a[Rr] && xt(e, _t(e, s, !0)), null != e._dayOfYear && (a = null != e._a[Or] ? e._a[Or] : r[Or], (e._dayOfYear > V(a) || 0 === e._dayOfYear) && (p(e)._overflowDayOfYear = !0), i = Le(a, 0, e._dayOfYear), e._a[Rr] = i.getUTCMonth(), e._a[Br] = i.getUTCDate()), o = null == e._a[Or] || null == e._a[Rr] || null == e._a[Br], t = 0; t < 3 && null == e._a[t]; ++t) e._a[t] = l[t] = r[t];
                for (; t < 7; t++) e._a[t] = l[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
                24 === e._a[Nr] && 0 === e._a[Ur] && 0 === e._a[Vr] && 0 === e._a[qr] && (e._nextDay = !0, e._a[Nr] = 0), e._d = (e._useUTC ? Le : Ie).apply(null, l), n = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[Nr] = 24), e._w && void 0 !== e._w.d && !o && e._w.d !== n && (p(e).weekdayMismatch = !0)
            }
        }

        function xt(e, t) {
            var i, s, r, n, a, o, l, c, u;
            null != (i = e._w).GG || null != i.W || null != i.E ? (a = 1, o = 4, s = bt(i.GG, e._a[Or], Ue(t[Or], t[Rr], t[Br], 1, 4).year), r = bt(i.W, 1), ((n = bt(i.E, 1)) < 1 || n > 7) && (c = !0)) : (a = e._locale._week.dow, o = e._locale._week.doy, u = Ue(t[Or], t[Rr], t[Br], a, o), s = bt(i.gg, e._a[Or], u.year), r = bt(i.w, u.week), null != i.d ? ((n = i.d) < 0 || n > 6) && (c = !0) : null != i.e ? (n = i.e + a, (i.e < 0 || i.e > 6) && (c = !0)) : n = a), r < 1 || r > Ve(s, a, o) ? p(e)._overflowWeeks = !0 : null != c ? p(e)._overflowWeekday = !0 : (l = Re(s, r, n, a, o), e._a[Or] = l.year, e._dayOfYear = l.dayOfYear)
        }

        function Ct(t) {
            if (t._f !== e.ISO_8601)
                if (t._f !== e.RFC_2822) {
                    t._a = [], p(t).empty = !0;
                    var i, s, r, n, a, o, l, c = "" + t._i,
                        u = c.length,
                        h = 0;
                    for (l = (r = T(t._f, t._locale).match(pr) || []).length, i = 0; i < l; i++) n = r[i], (s = (c.match(F(n, t)) || [])[0]) && ((a = c.substr(0, c.indexOf(s))).length > 0 && p(t).unusedInput.push(a), c = c.slice(c.indexOf(s) + s.length), h += s.length), gr[n] ? (s ? p(t).empty = !1 : p(t).unusedTokens.push(n), N(n, s, t)) : t._strict && !s && p(t).unusedTokens.push(n);
                    p(t).charsLeftOver = u - h, c.length > 0 && p(t).unusedInput.push(c), t._a[Nr] <= 12 && !0 === p(t).bigHour && t._a[Nr] > 0 && (p(t).bigHour = void 0), p(t).parsedDateParts = t._a.slice(0), p(t).meridiem = t._meridiem, t._a[Nr] = St(t._locale, t._a[Nr], t._meridiem), null !== (o = p(t).era) && (t._a[Or] = t._locale.erasConvertYear(o, t._a[Or])), $t(t), ut(t)
                } else vt(t);
            else ht(t)
        }

        function St(e, t, i) {
            var s;
            return null == i ? t : null != e.meridiemHour ? e.meridiemHour(t, i) : null != e.isPM ? ((s = e.isPM(i)) && t < 12 && (t += 12), s || 12 !== t || (t = 0), t) : t
        }

        function At(e) {
            var t, i, s, r, n, a, o = !1,
                l = {},
                c = e._f.length;
            if (0 === c) return p(e).invalidFormat = !0, void(e._d = new Date(NaN));
            for (r = 0; r < c; r++) n = 0, a = !1, t = g({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._defaultDatePartsNow = l, t._f = e._f[r], Ct(t), f(t) && (a = !0), n += p(t).charsLeftOver, n += 10 * p(t).unusedTokens.length, p(t).score = n, o ? n < s && (s = n, i = t) : (null == s || n < s || a) && (s = n, i = t, a && (o = !0));
            u(e, i || t)
        }

        function Dt(e) {
            if (!e._d) {
                var t = x(e._i),
                    i = void 0 === t.day ? t.date : t.day;
                e._a = c([t.year, t.month, i, t.hour, t.minute, t.second, t.millisecond], function(e) {
                    return e && parseInt(e, 10)
                }), $t(e)
            }
        }

        function Pt(e) {
            var t = new v(ut(Mt(e)));
            return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t
        }

        function Mt(e) {
            var t = e._i,
                s = e._f;
            return e._locale = e._locale || lt(e._l), null === t || void 0 === s && "" === t ? m({
                nullInput: !0
            }) : ("string" == typeof t && (e._i = t = e._locale.preparse(t)), y(t) ? new v(ut(t)) : (l(t) ? e._d = t : i(s) ? At(e) : s ? Ct(e) : Tt(e), f(e) || (e._d = null), e))
        }

        function Tt(t) {
            var r = t._i;
            a(r) ? t._d = new Date(e.now()) : l(r) ? t._d = new Date(r.valueOf()) : "string" == typeof r ? yt(t) : i(r) ? (t._a = c(r.slice(0), function(e) {
                return parseInt(e, 10)
            }), $t(t)) : s(r) ? Dt(t) : o(r) ? t._d = new Date(r) : e.createFromInputFallback(t)
        }

        function Et(e, t, r, a, o) {
            var l = {};
            return !0 !== t && !1 !== t || (a = t, t = void 0), !0 !== r && !1 !== r || (a = r, r = void 0), (s(e) && n(e) || i(e) && 0 === e.length) && (e = void 0), l._isAMomentObject = !0, l._useUTC = l._isUTC = o, l._l = r, l._i = e, l._f = t, l._strict = a, Pt(l)
        }

        function Ft(e, t, i, s) {
            return Et(e, t, i, s, !1)
        }

        function jt(e, t) {
            var s, r;
            if (1 === t.length && i(t[0]) && (t = t[0]), !t.length) return Ft();
            for (r = 0; r < t.length; ++r)
                if (y(t[r])) {
                    s = t[r];
                    break
                }
            if (!s) return m();
            for (++r; r < t.length; ++r) !y(t[r]) || t[r].isValid() && !t[r][e](s) || (s = t[r]);
            return s
        }

        function It() {
            return jt("isBefore", [].slice.call(arguments, 0))
        }

        function Lt() {
            return jt("isAfter", [].slice.call(arguments, 0))
        }

        function Ot(e) {
            var t, i, s = !1,
                n = Fn.length;
            for (t in e)
                if (r(e, t) && (-1 === Yr.call(Fn, t) || null != e[t] && isNaN(e[t]))) return !1;
            for (i = 0; i < n; ++i)
                if (e[Fn[i]]) {
                    if (s) return !1;
                    parseFloat(e[Fn[i]]) !== O(e[Fn[i]]) && (s = !0)
                }
            return !0
        }

        function Rt() {
            return this._isValid
        }

        function Bt() {
            return ni(NaN)
        }

        function Nt(e) {
            var t = x(e),
                i = t.year || 0,
                s = t.quarter || 0,
                r = t.month || 0,
                n = t.week || t.isoWeek || 0,
                a = t.day || 0,
                o = t.hour || 0,
                l = t.minute || 0,
                c = t.second || 0,
                u = t.millisecond || 0;
            this._isValid = Ot(t), this._milliseconds = +u + 1e3 * c + 6e4 * l + 1e3 * o * 60 * 60, this._days = +a + 7 * n, this._months = +r + 3 * s + 12 * i, this._data = {}, this._locale = lt(), this._bubble()
        }

        function Ut(e) {
            return e instanceof Nt
        }

        function Vt(e) {
            return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e)
        }

        function qt(e, t) {
            var i, s = Math.min(e.length, t.length),
                r = Math.abs(e.length - t.length),
                n = 0;
            for (i = 0; i < s; i++) O(e[i]) !== O(t[i]) && n++;
            return n + r
        }

        function Ht(e, t) {
            A(e, 0, 0, function() {
                var e = this.utcOffset(),
                    i = "+";
                return e < 0 && (e = -e, i = "-"), i + S(~~(e / 60), 2) + t + S(~~e % 60, 2)
            })
        }

        function Wt(e, t) {
            var i, s, r = (t || "").match(e);
            return null === r ? null : (s = 60 * (i = ((r[r.length - 1] || []) + "").match(jn) || ["-", 0, 0])[1] + O(i[2]), O(i[2]) > 59 || ("+" === i[0] ? s > 840 : s > 720) ? null : 0 === s ? 0 : "+" === i[0] ? s : -s)
        }

        function Yt(t, i) {
            var s, r;
            return i._isUTC ? (s = i.clone(), r = (y(t) || l(t) ? t.valueOf() : Ft(t).valueOf()) - s.valueOf(), s._d.setTime(s._d.valueOf() + r), e.updateOffset(s, !1), s) : Ft(t).local()
        }

        function zt(e) {
            return -Math.round(e._d.getTimezoneOffset())
        }

        function Gt(t, i, s) {
            var r, n = this._offset || 0;
            if (!this.isValid()) return null != t ? this : NaN;
            if (null != t) {
                if ("string" == typeof t) {
                    if (null === (t = Wt(Tr, t))) return this
                } else Math.abs(t) < 16 && !s && (t *= 60);
                return !this._isUTC && i && (r = zt(this)), this._offset = t, this._isUTC = !0, null != r && this.add(r, "m"), n !== t && (!i || this._changeInProgress ? ui(this, ni(t - n, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, e.updateOffset(this, !0), this._changeInProgress = null)), this
            }
            return this._isUTC ? n : zt(this)
        }

        function Zt(e, t) {
            return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset()
        }

        function Qt(e) {
            return this.utcOffset(0, e)
        }

        function Kt(e) {
            return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(zt(this), "m")), this
        }

        function Jt() {
            if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
            else if ("string" == typeof this._i) {
                var e = Wt(Mr, this._i);
                null != e ? this.utcOffset(e) : this.utcOffset(0, !0)
            }
            return this
        }

        function Xt(e) {
            return !!this.isValid() && (e = e ? Ft(e).utcOffset() : 0, (this.utcOffset() - e) % 60 == 0)
        }

        function ei() {
            return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
        }

        function ti() {
            if (!a(this._isDSTShifted)) return this._isDSTShifted;
            var e, t = {};
            return g(t, this), (t = Mt(t))._a ? (e = t._isUTC ? h(t._a) : Ft(t._a), this._isDSTShifted = this.isValid() && qt(t._a, e.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted
        }

        function ii() {
            return !!this.isValid() && !this._isUTC
        }

        function si() {
            return !!this.isValid() && this._isUTC
        }

        function ri() {
            return !!this.isValid() && (this._isUTC && 0 === this._offset)
        }

        function ni(e, t) {
            var i, s, n, a = e,
                l = null;
            return Ut(e) ? a = {
                ms: e._milliseconds,
                d: e._days,
                M: e._months
            } : o(e) || !isNaN(+e) ? (a = {}, t ? a[t] = +e : a.milliseconds = +e) : (l = In.exec(e)) ? (i = "-" === l[1] ? -1 : 1, a = {
                y: 0,
                d: O(l[Br]) * i,
                h: O(l[Nr]) * i,
                m: O(l[Ur]) * i,
                s: O(l[Vr]) * i,
                ms: O(Vt(1e3 * l[qr])) * i
            }) : (l = Ln.exec(e)) ? (i = "-" === l[1] ? -1 : 1, a = {
                y: ai(l[2], i),
                M: ai(l[3], i),
                w: ai(l[4], i),
                d: ai(l[5], i),
                h: ai(l[6], i),
                m: ai(l[7], i),
                s: ai(l[8], i)
            }) : null == a ? a = {} : "object" == typeof a && ("from" in a || "to" in a) && (n = li(Ft(a.from), Ft(a.to)), (a = {}).ms = n.milliseconds, a.M = n.months), s = new Nt(a), Ut(e) && r(e, "_locale") && (s._locale = e._locale), Ut(e) && r(e, "_isValid") && (s._isValid = e._isValid), s
        }

        function ai(e, t) {
            var i = e && parseFloat(e.replace(",", "."));
            return (isNaN(i) ? 0 : i) * t
        }

        function oi(e, t) {
            var i = {};
            return i.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(i.months, "M").isAfter(t) && --i.months, i.milliseconds = +t - +e.clone().add(i.months, "M"), i
        }

        function li(e, t) {
            var i;
            return e.isValid() && t.isValid() ? (t = Yt(t, e), e.isBefore(t) ? i = oi(e, t) : ((i = oi(t, e)).milliseconds = -i.milliseconds, i.months = -i.months), i) : {
                milliseconds: 0,
                months: 0
            }
        }

        function ci(e, t) {
            return function(i, s) {
                var r;
                return null === s || isNaN(+s) || (w(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), r = i, i = s, s = r), ui(this, ni(i, s), e), this
            }
        }

        function ui(t, i, s, r) {
            var n = i._milliseconds,
                a = Vt(i._days),
                o = Vt(i._months);
            t.isValid() && (r = null == r || r, o && ie(t, W(t, "Month") + o * s), a && Y(t, "Date", W(t, "Date") + a * s), n && t._d.setTime(t._d.valueOf() + n * s), r && e.updateOffset(t, a || o))
        }

        function hi(e) {
            return "string" == typeof e || e instanceof String
        }

        function di(e) {
            return y(e) || l(e) || hi(e) || o(e) || fi(e) || pi(e) || null == e
        }

        function pi(e) {
            var t, i, a = s(e) && !n(e),
                o = !1,
                l = ["years", "year", "y", "months", "month", "M", "days", "day", "d", "dates", "date", "D", "hours", "hour", "h", "minutes", "minute", "m", "seconds", "second", "s", "milliseconds", "millisecond", "ms"],
                c = l.length;
            for (t = 0; t < c; t += 1) i = l[t], o = o || r(e, i);
            return a && o
        }

        function fi(e) {
            var t = i(e),
                s = !1;
            return t && (s = 0 === e.filter(function(t) {
                return !o(t) && hi(e)
            }).length), t && s
        }

        function mi(e) {
            var t, i, a = s(e) && !n(e),
                o = !1,
                l = ["sameDay", "nextDay", "lastDay", "nextWeek", "lastWeek", "sameElse"];
            for (t = 0; t < l.length; t += 1) i = l[t], o = o || r(e, i);
            return a && o
        }

        function gi(e, t) {
            var i = e.diff(t, "days", !0);
            return i < -6 ? "sameElse" : i < -1 ? "lastWeek" : i < 0 ? "lastDay" : i < 1 ? "sameDay" : i < 2 ? "nextDay" : i < 7 ? "nextWeek" : "sameElse"
        }

        function vi(t, i) {
            1 === arguments.length && (arguments[0] ? di(arguments[0]) ? (t = arguments[0], i = void 0) : mi(arguments[0]) && (i = arguments[0], t = void 0) : (t = void 0, i = void 0));
            var s = t || Ft(),
                r = Yt(s, this).startOf("day"),
                n = e.calendarFormat(this, r) || "sameElse",
                a = i && (k(i[n]) ? i[n].call(this, s) : i[n]);
            return this.format(a || this.localeData().calendar(n, this, Ft(s)))
        }

        function yi() {
            return new v(this)
        }

        function bi(e, t) {
            var i = y(e) ? e : Ft(e);
            return !(!this.isValid() || !i.isValid()) && ("millisecond" === (t = $(t) || "millisecond") ? this.valueOf() > i.valueOf() : i.valueOf() < this.clone().startOf(t).valueOf())
        }

        function _i(e, t) {
            var i = y(e) ? e : Ft(e);
            return !(!this.isValid() || !i.isValid()) && ("millisecond" === (t = $(t) || "millisecond") ? this.valueOf() < i.valueOf() : this.clone().endOf(t).valueOf() < i.valueOf())
        }

        function wi(e, t, i, s) {
            var r = y(e) ? e : Ft(e),
                n = y(t) ? t : Ft(t);
            return !!(this.isValid() && r.isValid() && n.isValid()) && (("(" === (s = s || "()")[0] ? this.isAfter(r, i) : !this.isBefore(r, i)) && (")" === s[1] ? this.isBefore(n, i) : !this.isAfter(n, i)))
        }

        function ki(e, t) {
            var i, s = y(e) ? e : Ft(e);
            return !(!this.isValid() || !s.isValid()) && ("millisecond" === (t = $(t) || "millisecond") ? this.valueOf() === s.valueOf() : (i = s.valueOf(), this.clone().startOf(t).valueOf() <= i && i <= this.clone().endOf(t).valueOf()))
        }

        function $i(e, t) {
            return this.isSame(e, t) || this.isAfter(e, t)
        }

        function xi(e, t) {
            return this.isSame(e, t) || this.isBefore(e, t)
        }

        function Ci(e, t, i) {
            var s, r, n;
            if (!this.isValid()) return NaN;
            if (!(s = Yt(e, this)).isValid()) return NaN;
            switch (r = 6e4 * (s.utcOffset() - this.utcOffset()), t = $(t)) {
                case "year":
                    n = Si(this, s) / 12;
                    break;
                case "month":
                    n = Si(this, s);
                    break;
                case "quarter":
                    n = Si(this, s) / 3;
                    break;
                case "second":
                    n = (this - s) / 1e3;
                    break;
                case "minute":
                    n = (this - s) / 6e4;
                    break;
                case "hour":
                    n = (this - s) / 36e5;
                    break;
                case "day":
                    n = (this - s - r) / 864e5;
                    break;
                case "week":
                    n = (this - s - r) / 6048e5;
                    break;
                default:
                    n = this - s
            }
            return i ? n : L(n)
        }

        function Si(e, t) {
            if (e.date() < t.date()) return -Si(t, e);
            var i = 12 * (t.year() - e.year()) + (t.month() - e.month()),
                s = e.clone().add(i, "months");
            return -(i + (t - s < 0 ? (t - s) / (s - e.clone().add(i - 1, "months")) : (t - s) / (e.clone().add(i + 1, "months") - s))) || 0
        }

        function Ai() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        }

        function Di(e) {
            if (!this.isValid()) return null;
            var t = !0 !== e,
                i = t ? this.clone().utc() : this;
            return i.year() < 0 || i.year() > 9999 ? M(i, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : k(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", M(i, "Z")) : M(i, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
        }

        function Pi() {
            if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
            var e, t, i, s, r = "moment",
                n = "";
            return this.isLocal() || (r = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", n = "Z"), e = "[" + r + '("]', t = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", i = "-MM-DD[T]HH:mm:ss.SSS", s = n + '[")]', this.format(e + t + i + s)
        }

        function Mi(t) {
            t || (t = this.isUtc() ? e.defaultFormatUtc : e.defaultFormat);
            var i = M(this, t);
            return this.localeData().postformat(i)
        }

        function Ti(e, t) {
            return this.isValid() && (y(e) && e.isValid() || Ft(e).isValid()) ? ni({
                to: this,
                from: e
            }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
        }

        function Ei(e) {
            return this.from(Ft(), e)
        }

        function Fi(e, t) {
            return this.isValid() && (y(e) && e.isValid() || Ft(e).isValid()) ? ni({
                from: this,
                to: e
            }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
        }

        function ji(e) {
            return this.to(Ft(), e)
        }

        function Ii(e) {
            var t;
            return void 0 === e ? this._locale._abbr : (null != (t = lt(e)) && (this._locale = t), this)
        }

        function Li() {
            return this._locale
        }

        function Oi(e, t) {
            return (e % t + t) % t
        }

        function Ri(e, t, i) {
            return e < 100 && e >= 0 ? new Date(e + 400, t, i) - qn : new Date(e, t, i).valueOf()
        }

        function Bi(e, t, i) {
            return e < 100 && e >= 0 ? Date.UTC(e + 400, t, i) - qn : Date.UTC(e, t, i)
        }

        function Ni(t) {
            var i, s;
            if (void 0 === (t = $(t)) || "millisecond" === t || !this.isValid()) return this;
            switch (s = this._isUTC ? Bi : Ri, t) {
                case "year":
                    i = s(this.year(), 0, 1);
                    break;
                case "quarter":
                    i = s(this.year(), this.month() - this.month() % 3, 1);
                    break;
                case "month":
                    i = s(this.year(), this.month(), 1);
                    break;
                case "week":
                    i = s(this.year(), this.month(), this.date() - this.weekday());
                    break;
                case "isoWeek":
                    i = s(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                    break;
                case "day":
                case "date":
                    i = s(this.year(), this.month(), this.date());
                    break;
                case "hour":
                    i = this._d.valueOf(), i -= Oi(i + (this._isUTC ? 0 : this.utcOffset() * Un), Vn);
                    break;
                case "minute":
                    i = this._d.valueOf(), i -= Oi(i, Un);
                    break;
                case "second":
                    i = this._d.valueOf(), i -= Oi(i, Nn)
            }
            return this._d.setTime(i), e.updateOffset(this, !0), this
        }

        function Ui(t) {
            var i, s;
            if (void 0 === (t = $(t)) || "millisecond" === t || !this.isValid()) return this;
            switch (s = this._isUTC ? Bi : Ri, t) {
                case "year":
                    i = s(this.year() + 1, 0, 1) - 1;
                    break;
                case "quarter":
                    i = s(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                    break;
                case "month":
                    i = s(this.year(), this.month() + 1, 1) - 1;
                    break;
                case "week":
                    i = s(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                    break;
                case "isoWeek":
                    i = s(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                    break;
                case "day":
                case "date":
                    i = s(this.year(), this.month(), this.date() + 1) - 1;
                    break;
                case "hour":
                    i = this._d.valueOf(), i += Vn - Oi(i + (this._isUTC ? 0 : this.utcOffset() * Un), Vn) - 1;
                    break;
                case "minute":
                    i = this._d.valueOf(), i += Un - Oi(i, Un) - 1;
                    break;
                case "second":
                    i = this._d.valueOf(), i += Nn - Oi(i, Nn) - 1
            }
            return this._d.setTime(i), e.updateOffset(this, !0), this
        }

        function Vi() {
            return this._d.valueOf() - 6e4 * (this._offset || 0)
        }

        function qi() {
            return Math.floor(this.valueOf() / 1e3)
        }

        function Hi() {
            return new Date(this.valueOf())
        }

        function Wi() {
            var e = this;
            return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
        }

        function Yi() {
            var e = this;
            return {
                years: e.year(),
                months: e.month(),
                date: e.date(),
                hours: e.hours(),
                minutes: e.minutes(),
                seconds: e.seconds(),
                milliseconds: e.milliseconds()
            }
        }

        function zi() {
            return this.isValid() ? this.toISOString() : null
        }

        function Gi() {
            return f(this)
        }

        function Zi() {
            return u({}, p(this))
        }

        function Qi() {
            return p(this).overflow
        }

        function Ki() {
            return {
                input: this._i,
                format: this._f,
                locale: this._locale,
                isUTC: this._isUTC,
                strict: this._strict
            }
        }

        function Ji() {
            var t, i, s, r = this._eras || lt("en")._eras;
            for (t = 0, i = r.length; t < i; ++t) {
                if ("string" == typeof r[t].since) s = e(r[t].since).startOf("day"), r[t].since = s.valueOf();
                switch (typeof r[t].until) {
                    case "undefined":
                        r[t].until = 1 / 0;
                        break;
                    case "string":
                        s = e(r[t].until).startOf("day").valueOf(), r[t].until = s.valueOf()
                }
            }
            return r
        }

        function Xi(e, t, i) {
            var s, r, n, a, o, l = this.eras();
            for (e = e.toUpperCase(), s = 0, r = l.length; s < r; ++s)
                if (n = l[s].name.toUpperCase(), a = l[s].abbr.toUpperCase(), o = l[s].narrow.toUpperCase(), i) switch (t) {
                    case "N":
                    case "NN":
                    case "NNN":
                        if (a === e) return l[s];
                        break;
                    case "NNNN":
                        if (n === e) return l[s];
                        break;
                    case "NNNNN":
                        if (o === e) return l[s]
                } else if ([n, a, o].indexOf(e) >= 0) return l[s]
        }

        function es(t, i) {
            var s = t.since <= t.until ? 1 : -1;
            return void 0 === i ? e(t.since).year() : e(t.since).year() + (i - t.offset) * s
        }

        function ts() {
            var e, t, i, s = this.localeData().eras();
            for (e = 0, t = s.length; e < t; ++e) {
                if (i = this.clone().startOf("day").valueOf(), s[e].since <= i && i <= s[e].until) return s[e].name;
                if (s[e].until <= i && i <= s[e].since) return s[e].name
            }
            return ""
        }

        function is() {
            var e, t, i, s = this.localeData().eras();
            for (e = 0, t = s.length; e < t; ++e) {
                if (i = this.clone().startOf("day").valueOf(), s[e].since <= i && i <= s[e].until) return s[e].narrow;
                if (s[e].until <= i && i <= s[e].since) return s[e].narrow
            }
            return ""
        }

        function ss() {
            var e, t, i, s = this.localeData().eras();
            for (e = 0, t = s.length; e < t; ++e) {
                if (i = this.clone().startOf("day").valueOf(), s[e].since <= i && i <= s[e].until) return s[e].abbr;
                if (s[e].until <= i && i <= s[e].since) return s[e].abbr
            }
            return ""
        }

        function rs() {
            var t, i, s, r, n = this.localeData().eras();
            for (t = 0, i = n.length; t < i; ++t)
                if (s = n[t].since <= n[t].until ? 1 : -1, r = this.clone().startOf("day").valueOf(), n[t].since <= r && r <= n[t].until || n[t].until <= r && r <= n[t].since) return (this.year() - e(n[t].since).year()) * s + n[t].offset;
            return this.year()
        }

        function ns(e) {
            return r(this, "_erasNameRegex") || ds.call(this), e ? this._erasNameRegex : this._erasRegex
        }

        function as(e) {
            return r(this, "_erasAbbrRegex") || ds.call(this), e ? this._erasAbbrRegex : this._erasRegex
        }

        function os(e) {
            return r(this, "_erasNarrowRegex") || ds.call(this), e ? this._erasNarrowRegex : this._erasRegex
        }

        function ls(e, t) {
            return t.erasAbbrRegex(e)
        }

        function cs(e, t) {
            return t.erasNameRegex(e)
        }

        function us(e, t) {
            return t.erasNarrowRegex(e)
        }

        function hs(e, t) {
            return t._eraYearOrdinalRegex || Dr
        }

        function ds() {
            var e, t, i, s, r, n = [],
                a = [],
                o = [],
                l = [],
                c = this.eras();
            for (e = 0, t = c.length; e < t; ++e) i = I(c[e].name), s = I(c[e].abbr), r = I(c[e].narrow), a.push(i), n.push(s), o.push(r), l.push(i), l.push(s), l.push(r);
            this._erasRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp("^(" + o.join("|") + ")", "i")
        }

        function ps(e, t) {
            A(0, [e, e.length], 0, t)
        }

        function fs(e) {
            return _s.call(this, e, this.week(), this.weekday() + this.localeData()._week.dow, this.localeData()._week.dow, this.localeData()._week.doy)
        }

        function ms(e) {
            return _s.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
        }

        function gs() {
            return Ve(this.year(), 1, 4)
        }

        function vs() {
            return Ve(this.isoWeekYear(), 1, 4)
        }

        function ys() {
            var e = this.localeData()._week;
            return Ve(this.year(), e.dow, e.doy)
        }

        function bs() {
            var e = this.localeData()._week;
            return Ve(this.weekYear(), e.dow, e.doy)
        }

        function _s(e, t, i, s, r) {
            var n;
            return null == e ? Ne(this, s, r).year : (t > (n = Ve(e, s, r)) && (t = n), ws.call(this, e, t, i, s, r))
        }

        function ws(e, t, i, s, r) {
            var n = Re(e, t, i, s, r),
                a = Le(n.year, 0, n.dayOfYear);
            return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this
        }

        function ks(e) {
            return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
        }

        function $s(e) {
            var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
            return null == e ? t : this.add(e - t, "d")
        }

        function xs(e, t) {
            t[qr] = O(1e3 * ("0." + e))
        }

        function Cs() {
            return this._isUTC ? "UTC" : ""
        }

        function Ss() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        }

        function As(e) {
            return Ft(1e3 * e)
        }

        function Ds() {
            return Ft.apply(null, arguments).parseZone()
        }

        function Ps(e) {
            return e
        }

        function Ms(e, t, i, s) {
            var r = lt(),
                n = h().set(s, t);
            return r[i](n, e)
        }

        function Ts(e, t, i) {
            if (o(e) && (t = e, e = void 0), e = e || "", null != t) return Ms(e, t, i, "month");
            var s, r = [];
            for (s = 0; s < 12; s++) r[s] = Ms(e, s, i, "month");
            return r
        }

        function Es(e, t, i, s) {
            "boolean" == typeof e ? (o(t) && (i = t, t = void 0), t = t || "") : (i = t = e, e = !1, o(t) && (i = t, t = void 0), t = t || "");
            var r, n = lt(),
                a = e ? n._week.dow : 0,
                l = [];
            if (null != i) return Ms(t, (i + a) % 7, s, "day");
            for (r = 0; r < 7; r++) l[r] = Ms(t, (r + a) % 7, s, "day");
            return l
        }

        function Fs(e, t) {
            return Ts(e, t, "months")
        }

        function js(e, t) {
            return Ts(e, t, "monthsShort")
        }

        function Is(e, t, i) {
            return Es(e, t, i, "weekdays")
        }

        function Ls(e, t, i) {
            return Es(e, t, i, "weekdaysShort")
        }

        function Os(e, t, i) {
            return Es(e, t, i, "weekdaysMin")
        }

        function Rs() {
            var e = this._data;
            return this._milliseconds = Kn(this._milliseconds), this._days = Kn(this._days), this._months = Kn(this._months), e.milliseconds = Kn(e.milliseconds), e.seconds = Kn(e.seconds), e.minutes = Kn(e.minutes), e.hours = Kn(e.hours), e.months = Kn(e.months), e.years = Kn(e.years), this
        }

        function Bs(e, t, i, s) {
            var r = ni(t, i);
            return e._milliseconds += s * r._milliseconds, e._days += s * r._days, e._months += s * r._months, e._bubble()
        }

        function Ns(e, t) {
            return Bs(this, e, t, 1)
        }

        function Us(e, t) {
            return Bs(this, e, t, -1)
        }

        function Vs(e) {
            return e < 0 ? Math.floor(e) : Math.ceil(e)
        }

        function qs() {
            var e, t, i, s, r, n = this._milliseconds,
                a = this._days,
                o = this._months,
                l = this._data;
            return n >= 0 && a >= 0 && o >= 0 || n <= 0 && a <= 0 && o <= 0 || (n += 864e5 * Vs(Ws(o) + a), a = 0, o = 0), l.milliseconds = n % 1e3, e = L(n / 1e3), l.seconds = e % 60, t = L(e / 60), l.minutes = t % 60, i = L(t / 60), l.hours = i % 24, a += L(i / 24), o += r = L(Hs(a)), a -= Vs(Ws(r)), s = L(o / 12), o %= 12, l.days = a, l.months = o, l.years = s, this
        }

        function Hs(e) {
            return 4800 * e / 146097
        }

        function Ws(e) {
            return 146097 * e / 4800
        }

        function Ys(e) {
            if (!this.isValid()) return NaN;
            var t, i, s = this._milliseconds;
            if ("month" === (e = $(e)) || "quarter" === e || "year" === e) switch (t = this._days + s / 864e5, i = this._months + Hs(t), e) {
                case "month":
                    return i;
                case "quarter":
                    return i / 3;
                case "year":
                    return i / 12
            } else switch (t = this._days + Math.round(Ws(this._months)), e) {
                case "week":
                    return t / 7 + s / 6048e5;
                case "day":
                    return t + s / 864e5;
                case "hour":
                    return 24 * t + s / 36e5;
                case "minute":
                    return 1440 * t + s / 6e4;
                case "second":
                    return 86400 * t + s / 1e3;
                case "millisecond":
                    return Math.floor(864e5 * t) + s;
                default:
                    throw new Error("Unknown unit " + e)
            }
        }

        function zs(e) {
            return function() {
                return this.as(e)
            }
        }

        function Gs() {
            return ni(this)
        }

        function Zs(e) {
            return e = $(e), this.isValid() ? this[e + "s"]() : NaN
        }

        function Qs(e) {
            return function() {
                return this.isValid() ? this._data[e] : NaN
            }
        }

        function Ks() {
            return L(this.days() / 7)
        }

        function Js(e, t, i, s, r) {
            return Te.call(r, t || 1, !!i, e, s)
        }

        function Xs(e, t, i, s) {
            var r = ni(e).abs(),
                n = ma(r.as("s")),
                a = ma(r.as("m")),
                o = ma(r.as("h")),
                l = ma(r.as("d")),
                c = ma(r.as("M")),
                u = ma(r.as("w")),
                h = ma(r.as("y")),
                d = n <= i.ss && ["s", n] || n < i.s && ["ss", n] || a <= 1 && ["m"] || a < i.m && ["mm", a] || o <= 1 && ["h"] || o < i.h && ["hh", o] || l <= 1 && ["d"] || l < i.d && ["dd", l];
            return null != i.w && (d = d || u <= 1 && ["w"] || u < i.w && ["ww", u]), (d = d || c <= 1 && ["M"] || c < i.M && ["MM", c] || h <= 1 && ["y"] || ["yy", h])[2] = t, d[3] = +e > 0, d[4] = s, Js.apply(null, d)
        }

        function er(e) {
            return void 0 === e ? ma : "function" == typeof e && (ma = e, !0)
        }

        function tr(e, t) {
            return void 0 !== ga[e] && (void 0 === t ? ga[e] : (ga[e] = t, "s" === e && (ga.ss = t - 1), !0))
        }

        function ir(e, t) {
            if (!this.isValid()) return this.localeData().invalidDate();
            var i, s, r = !1,
                n = ga;
            return "object" == typeof e && (t = e, e = !1), "boolean" == typeof e && (r = e), "object" == typeof t && (n = u(u({}, ga), t || {}), null != t.s && null == t.ss && (n.ss = t.s - 1)), s = Xs(this, !r, n, i = this.localeData()), r && (s = Fe.call(i, +this, s)), i.postformat(s)
        }

        function sr(e) {
            return (e > 0) - (e < 0) || +e
        }

        function rr() {
            if (!this.isValid()) return this.localeData().invalidDate();
            var e, t, i, s, r, n, a, o, l = va(this._milliseconds) / 1e3,
                c = va(this._days),
                u = va(this._months),
                h = this.asSeconds();
            return h ? (e = L(l / 60), t = L(e / 60), l %= 60, e %= 60, i = L(u / 12), u %= 12, s = l ? l.toFixed(3).replace(/\.?0+$/, "") : "", r = h < 0 ? "-" : "", n = sr(this._months) !== sr(h) ? "-" : "", a = sr(this._days) !== sr(h) ? "-" : "", o = sr(this._milliseconds) !== sr(h) ? "-" : "", r + "P" + (i ? n + i + "Y" : "") + (u ? n + u + "M" : "") + (c ? a + c + "D" : "") + (t || e || l ? "T" : "") + (t ? o + t + "H" : "") + (e ? o + e + "M" : "") + (l ? o + s + "S" : "")) : "P0D"
        }
        var nr, ar;
        ar = Array.prototype.some ? Array.prototype.some : function(e) {
            var t, i = Object(this),
                s = i.length >>> 0;
            for (t = 0; t < s; t++)
                if (t in i && e.call(this, i[t], t, i)) return !0;
            return !1
        };
        var or = e.momentProperties = [],
            lr = !1,
            cr = {};
        e.suppressDeprecationWarnings = !1, e.deprecationHandler = null;
        var ur, hr = {
                D: "date",
                dates: "date",
                date: "date",
                d: "day",
                days: "day",
                day: "day",
                e: "weekday",
                weekdays: "weekday",
                weekday: "weekday",
                E: "isoWeekday",
                isoweekdays: "isoWeekday",
                isoweekday: "isoWeekday",
                DDD: "dayOfYear",
                dayofyears: "dayOfYear",
                dayofyear: "dayOfYear",
                h: "hour",
                hours: "hour",
                hour: "hour",
                ms: "millisecond",
                milliseconds: "millisecond",
                millisecond: "millisecond",
                m: "minute",
                minutes: "minute",
                minute: "minute",
                M: "month",
                months: "month",
                month: "month",
                Q: "quarter",
                quarters: "quarter",
                quarter: "quarter",
                s: "second",
                seconds: "second",
                second: "second",
                gg: "weekYear",
                weekyears: "weekYear",
                weekyear: "weekYear",
                GG: "isoWeekYear",
                isoweekyears: "isoWeekYear",
                isoweekyear: "isoWeekYear",
                w: "week",
                weeks: "week",
                week: "week",
                W: "isoWeek",
                isoweeks: "isoWeek",
                isoweek: "isoWeek",
                y: "year",
                years: "year",
                year: "year"
            },
            dr = {
                date: 9,
                day: 11,
                weekday: 11,
                isoWeekday: 11,
                dayOfYear: 4,
                hour: 13,
                millisecond: 16,
                minute: 14,
                month: 8,
                quarter: 7,
                second: 15,
                weekYear: 1,
                isoWeekYear: 1,
                week: 5,
                isoWeek: 5,
                year: 1
            },
            pr = /(\[[^\[]*\])|(\\e)|(\\)?(eHHmm|[Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
            fr = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
            mr = {},
            gr = {},
            vr = /\d/,
            yr = /\d\d/,
            br = /\d{3}/,
            _r = /\d{4}/,
            wr = /[+-]?\d{6}/,
            kr = /\d\d?/,
            $r = /\d\d\d\d?/,
            xr = /\d\d\d\d\d\d?/,
            Cr = /\d{1,3}/,
            Sr = /\d{1,4}/,
            Ar = /[+-]?\d{1,6}/,
            Dr = /\d+/,
            Pr = /[+-]?\d+/,
            Mr = /Z|[+-]\d\d:?\d\d/gi,
            Tr = /Z|[+-]\d\d(?::?\d\d)?/gi,
            Er = /[+-]?\d+(\.\d{1,3})?/,
            Fr = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
            jr = /^[1-9]\d?/,
            Ir = /^([1-9]\d|\d)/;
        ur = {};
        var Lr = {},
            Or = 0,
            Rr = 1,
            Br = 2,
            Nr = 3,
            Ur = 4,
            Vr = 5,
            qr = 6,
            Hr = 7,
            Wr = 8;
        A("Y", 0, 0, function() {
            var e = this.year();
            return e <= 9999 ? S(e, 4) : "+" + e
        }), A(0, ["YY", 2], 0, function() {
            return this.year() % 100
        }), A(0, ["YYYY", 4], 0, "year"), A(0, ["YYYYY", 5], 0, "year"), A(0, ["YYYYYY", 6, !0], 0, "year"), E("Y", Pr), E("YY", kr, yr), E("YYYY", Sr, _r), E("YYYYY", Ar, wr), E("YYYYYY", Ar, wr), R(["YYYYY", "YYYYYY"], Or), R("YYYY", function(t, i) {
            i[Or] = 2 === t.length ? e.parseTwoDigitYear(t) : O(t)
        }), R("YY", function(t, i) {
            i[Or] = e.parseTwoDigitYear(t)
        }), R("Y", function(e, t) {
            t[Or] = parseInt(e, 10)
        }), e.parseTwoDigitYear = function(e) {
            return O(e) + (O(e) > 68 ? 1900 : 2e3)
        };
        var Yr, zr = H("FullYear", !0);
        Yr = Array.prototype.indexOf ? Array.prototype.indexOf : function(e) {
            var t;
            for (t = 0; t < this.length; ++t)
                if (this[t] === e) return t;
            return -1
        }, A("M", ["MM", 2], "Mo", function() {
            return this.month() + 1
        }), A("MMM", 0, 0, function(e) {
            return this.localeData().monthsShort(this, e)
        }), A("MMMM", 0, 0, function(e) {
            return this.localeData().months(this, e)
        }), E("M", kr, jr), E("MM", kr, yr), E("MMM", function(e, t) {
            return t.monthsShortRegex(e)
        }), E("MMMM", function(e, t) {
            return t.monthsRegex(e)
        }), R(["M", "MM"], function(e, t) {
            t[Rr] = O(e) - 1
        }), R(["MMM", "MMMM"], function(e, t, i, s) {
            var r = i._locale.monthsParse(e, s, i._strict);
            null != r ? t[Rr] = r : p(i).invalidMonth = e
        });
        var Gr = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            Zr = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            Qr = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
            Kr = Fr,
            Jr = Fr,
            Xr = ["monthsParse", "longMonthsParse", "shortMonthsParse", "monthsRegex", "monthsShortRegex", "monthsStrictRegex", "monthsShortStrictRegex"];
        A("d", 0, "do", "day"), A("dd", 0, 0, function(e) {
            return this.localeData().weekdaysMin(this, e)
        }), A("ddd", 0, 0, function(e) {
            return this.localeData().weekdaysShort(this, e)
        }), A("dddd", 0, 0, function(e) {
            return this.localeData().weekdays(this, e)
        }), A("e", 0, 0, "weekday"), A("E", 0, 0, "isoWeekday"), A("eHHmm", 0, 0, function() {
            return "" + this.weekday() + S(this.hours(), 2) + S(this.minutes(), 2)
        }), E("d", kr), E("e", kr), E("E", kr), E("eHHmm", xr), E("dd", function(e, t) {
            return t.weekdaysMinRegex(e)
        }), E("ddd", function(e, t) {
            return t.weekdaysShortRegex(e)
        }), E("dddd", function(e, t) {
            return t.weekdaysRegex(e)
        }), B(["dd", "ddd", "dddd"], function(e, t, i, s) {
            var r = i._locale.weekdaysParse(e, s, i._strict);
            null != r ? t.d = r : p(i).invalidWeekday = e
        }), B(["d", "e", "E"], function(e, t, i, s) {
            t[s] = O(e)
        }), B("eHHmm", function(e, t, i) {
            var s = e.length - 4;
            t.e = O(e.substr(0, s)), i._a[Nr] = O(e.substr(s, 2)), i._a[Ur] = O(e.substr(s + 2))
        });
        var en, tn = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            sn = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            rn = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            nn = Fr,
            an = Fr,
            on = Fr,
            ln = ["weekdaysParse", "fullWeekdaysParse", "shortWeekdaysParse", "minWeekdaysParse", "weekdaysRegex", "weekdaysShortRegex", "weekdaysMinRegex", "weekdaysStrictRegex", "weekdaysShortStrictRegex", "weekdaysMinStrictRegex"];
        en = Object.keys ? Object.keys : function(e) {
            var t, i = [];
            for (t in e) r(e, t) && i.push(t);
            return i
        };
        var cn = {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            un = {
                LTS: "h:mm:ss A",
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY h:mm A",
                LLLL: "dddd, MMMM D, YYYY h:mm A"
            },
            hn = "Invalid date",
            dn = "%d",
            pn = /\d{1,2}/,
            fn = {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                ss: "%d seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                w: "a week",
                ww: "%d weeks",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            };
        A("w", ["ww", 2], "wo", "week"), A("W", ["WW", 2], "Wo", "isoWeek"), E("w", kr, jr), E("ww", kr, yr), E("W", kr, jr), E("WW", kr, yr), B(["w", "ww", "W", "WW"], function(e, t, i, s) {
            t[s.substr(0, 1)] = O(e)
        });
        var mn = {
            dow: 0,
            doy: 6
        };
        A("H", ["HH", 2], 0, "hour"), A("h", ["hh", 2], 0, Ge), A("k", ["kk", 2], 0, Ze), A("hmm", 0, 0, function() {
            return "" + Ge.apply(this) + S(this.minutes(), 2)
        }), A("hmmss", 0, 0, function() {
            return "" + Ge.apply(this) + S(this.minutes(), 2) + S(this.seconds(), 2)
        }), A("Hmm", 0, 0, function() {
            return "" + this.hours() + S(this.minutes(), 2)
        }), A("Hmmss", 0, 0, function() {
            return "" + this.hours() + S(this.minutes(), 2) + S(this.seconds(), 2)
        }), Qe("a", !0), Qe("A", !1), E("a", Ke), E("A", Ke), E("H", kr, Ir), E("h", kr, jr), E("k", kr, jr), E("HH", kr, yr), E("hh", kr, yr), E("kk", kr, yr), E("hmm", $r), E("hmmss", xr), E("Hmm", $r), E("Hmmss", xr), R(["H", "HH"], Nr), R(["k", "kk"], function(e, t) {
            var i = O(e);
            t[Nr] = 24 === i ? 0 : i
        }), R(["a", "A"], function(e, t, i) {
            i._isPm = i._locale.isPM(e), i._meridiem = e
        }), R(["h", "hh"], function(e, t, i) {
            t[Nr] = O(e), p(i).bigHour = !0
        }), R("hmm", function(e, t, i) {
            var s = e.length - 2;
            t[Nr] = O(e.substr(0, s)), t[Ur] = O(e.substr(s)), p(i).bigHour = !0
        }), R("hmmss", function(e, t, i) {
            var s = e.length - 4,
                r = e.length - 2;
            t[Nr] = O(e.substr(0, s)), t[Ur] = O(e.substr(s, 2)), t[Vr] = O(e.substr(r)), p(i).bigHour = !0
        }), R("Hmm", function(e, t) {
            var i = e.length - 2;
            t[Nr] = O(e.substr(0, i)), t[Ur] = O(e.substr(i))
        }), R("Hmmss", function(e, t) {
            var i = e.length - 4,
                s = e.length - 2;
            t[Nr] = O(e.substr(0, i)), t[Ur] = O(e.substr(i, 2)), t[Vr] = O(e.substr(s))
        });
        var gn, vn = /[ap]\.?m?\.?/i,
            yn = H("Hours", !0),
            bn = {
                calendar: cn,
                longDateFormat: un,
                invalidDate: hn,
                ordinal: dn,
                dayOfMonthOrdinalParse: pn,
                relativeTime: fn,
                months: Gr,
                monthsShort: Zr,
                week: mn,
                weekdays: tn,
                weekdaysMin: rn,
                weekdaysShort: sn,
                meridiemParse: vn
            },
            _n = {},
            wn = {},
            kn = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            $n = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            xn = /Z|[+-]\d\d(?::?\d\d)?/,
            Cn = [
                ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
                ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
                ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
                ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
                ["YYYY-DDD", /\d{4}-\d{3}/],
                ["YYYY-MM", /\d{4}-\d\d/, !1],
                ["YYYYYYMMDD", /[+-]\d{10}/],
                ["YYYYMMDD", /\d{8}/],
                ["GGGG[W]WWE", /\d{4}W\d{3}/],
                ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
                ["YYYYDDD", /\d{7}/],
                ["YYYYMM", /\d{6}/, !1],
                ["YYYY", /\d{4}/, !1]
            ],
            Sn = [
                ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
                ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
                ["HH:mm:ss", /\d\d:\d\d:\d\d/],
                ["HH:mm", /\d\d:\d\d/],
                ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
                ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
                ["HHmmss", /\d\d\d\d\d\d/],
                ["HHmm", /\d\d\d\d/],
                ["HH", /\d\d/]
            ],
            An = /^\/?Date\((-?\d+)/i,
            Dn = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
            Pn = {
                UT: 0,
                GMT: 0,
                EDT: -240,
                EST: -300,
                CDT: -300,
                CST: -360,
                MDT: -360,
                MST: -420,
                PDT: -420,
                PST: -480
            };
        e.createFromInputFallback = _("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
            e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
        }), e._getDefaultDateParts = kt, e.ISO_8601 = function() {}, e.RFC_2822 = function() {};
        var Mn = _("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
                var e = Ft.apply(null, arguments);
                return this.isValid() && e.isValid() ? e < this ? this : e : m()
            }),
            Tn = _("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
                var e = Ft.apply(null, arguments);
                return this.isValid() && e.isValid() ? e > this ? this : e : m()
            }),
            En = function() {
                return Date.now ? Date.now() : +new Date
            },
            Fn = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
        Ht("Z", ":"), Ht("ZZ", ""), E("Z", Tr), E("ZZ", Tr), R(["Z", "ZZ"], function(e, t, i) {
            var s = Wt(Tr, e);
            i._useUTC = !0, i._tzm = s, null === s && (p(i).invalidOffset = e)
        });
        var jn = /([\+\-]|\d\d)/gi;
        e.updateOffset = function() {};
        var In = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
            Ln = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
        ni.fn = Nt.prototype, ni.invalid = Bt;
        var On = ci(1, "add"),
            Rn = ci(-1, "subtract");
        e.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", e.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
        var Bn = _("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
                return void 0 === e ? this.localeData() : this.locale(e)
            }),
            Nn = 1e3,
            Un = 60 * Nn,
            Vn = 60 * Un,
            qn = 3506328 * Vn;
        A("N", 0, 0, "eraAbbr"), A("NN", 0, 0, "eraAbbr"), A("NNN", 0, 0, "eraAbbr"), A("NNNN", 0, 0, "eraName"), A("NNNNN", 0, 0, "eraNarrow"), A("y", ["y", 1], "yo", "eraYear"), A("y", ["yy", 2], 0, "eraYear"), A("y", ["yyy", 3], 0, "eraYear"), A("y", ["yyyy", 4], 0, "eraYear"), E("N", ls), E("NN", ls), E("NNN", ls), E("NNNN", cs), E("NNNNN", us), R(["N", "NN", "NNN", "NNNN", "NNNNN"], function(e, t, i, s) {
            var r = i._locale.erasParse(e, s, i._strict);
            r ? p(i).era = r : p(i).invalidEra = e
        }), E("y", Dr), E("yy", Dr), E("yyy", Dr), E("yyyy", Dr), E("yo", hs), R(["y", "yy", "yyy", "yyyy"], Or), R(["yo"], function(e, t, i) {
            var s;
            i._locale._eraYearOrdinalRegex && (s = e.match(i._locale._eraYearOrdinalRegex)), i._locale.eraYearOrdinalParse ? t[Or] = i._locale.eraYearOrdinalParse(e, s) : t[Or] = parseInt(e, 10)
        }), A(0, ["gg", 2], 0, function() {
            return this.weekYear() % 100
        }), A(0, ["GG", 2], 0, function() {
            return this.isoWeekYear() % 100
        }), ps("gggg", "weekYear"), ps("ggggg", "weekYear"), ps("GGGG", "isoWeekYear"), ps("GGGGG", "isoWeekYear"), E("G", Pr), E("g", Pr), E("GG", kr, yr), E("gg", kr, yr), E("GGGG", Sr, _r), E("gggg", Sr, _r), E("GGGGG", Ar, wr), E("ggggg", Ar, wr), B(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, i, s) {
            t[s.substr(0, 2)] = O(e)
        }), B(["gg", "GG"], function(t, i, s, r) {
            i[r] = e.parseTwoDigitYear(t)
        }), A("Q", 0, "Qo", "quarter"), E("Q", vr), R("Q", function(e, t) {
            t[Rr] = 3 * (O(e) - 1)
        }), A("D", ["DD", 2], "Do", "date"), E("D", kr, jr), E("DD", kr, yr), E("Do", function(e, t) {
            return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient
        }), R(["D", "DD"], Br), R("Do", function(e, t) {
            t[Br] = O(e.match(kr)[0])
        });
        var Hn = H("Date", !0);
        A("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), E("DDD", Cr), E("DDDD", br), R(["DDD", "DDDD"], function(e, t, i) {
            i._dayOfYear = O(e)
        }), A("m", ["mm", 2], 0, "minute"), E("m", kr, Ir), E("mm", kr, yr), R(["m", "mm"], Ur);
        var Wn = H("Minutes", !1);
        A("s", ["ss", 2], 0, "second"), E("s", kr, Ir), E("ss", kr, yr), R(["s", "ss"], Vr);
        var Yn, zn, Gn = H("Seconds", !1);
        for (A("S", 0, 0, function() {
                return ~~(this.millisecond() / 100)
            }), A(0, ["SS", 2], 0, function() {
                return ~~(this.millisecond() / 10)
            }), A(0, ["SSS", 3], 0, "millisecond"), A(0, ["SSSS", 4], 0, function() {
                return 10 * this.millisecond()
            }), A(0, ["SSSSS", 5], 0, function() {
                return 100 * this.millisecond()
            }), A(0, ["SSSSSS", 6], 0, function() {
                return 1e3 * this.millisecond()
            }), A(0, ["SSSSSSS", 7], 0, function() {
                return 1e4 * this.millisecond()
            }), A(0, ["SSSSSSSS", 8], 0, function() {
                return 1e5 * this.millisecond()
            }), A(0, ["SSSSSSSSS", 9], 0, function() {
                return 1e6 * this.millisecond()
            }), E("S", Cr, vr), E("SS", Cr, yr), E("SSS", Cr, br), Yn = "SSSS"; Yn.length <= 9; Yn += "S") E(Yn, Dr);
        for (Yn = "S"; Yn.length <= 9; Yn += "S") R(Yn, xs);
        zn = H("Milliseconds", !1), A("z", 0, 0, "zoneAbbr"), A("zz", 0, 0, "zoneName");
        var Zn = v.prototype;
        Zn.add = On, Zn.calendar = vi, Zn.clone = yi, Zn.diff = Ci, Zn.endOf = Ui, Zn.format = Mi, Zn.from = Ti, Zn.fromNow = Ei, Zn.to = Fi, Zn.toNow = ji, Zn.get = z, Zn.invalidAt = Qi, Zn.isAfter = bi, Zn.isBefore = _i, Zn.isBetween = wi, Zn.isSame = ki, Zn.isSameOrAfter = $i, Zn.isSameOrBefore = xi, Zn.isValid = Gi, Zn.lang = Bn, Zn.locale = Ii, Zn.localeData = Li, Zn.max = Tn, Zn.min = Mn, Zn.parsingFlags = Zi, Zn.set = G, Zn.startOf = Ni, Zn.subtract = Rn, Zn.toArray = Wi, Zn.toObject = Yi, Zn.toDate = Hi, Zn.toISOString = Di, Zn.inspect = Pi, "undefined" != typeof Symbol && null != Symbol.for && (Zn[Symbol.for("nodejs.util.inspect.custom")] = function() {
            return "Moment<" + this.format() + ">"
        }), Zn.toJSON = zi, Zn.toString = Ai, Zn.unix = qi, Zn.valueOf = Vi, Zn.creationData = Ki, Zn.eraName = ts, Zn.eraNarrow = is, Zn.eraAbbr = ss, Zn.eraYear = rs, Zn.year = zr, Zn.isLeapYear = q, Zn.weekYear = fs, Zn.isoWeekYear = ms, Zn.quarter = Zn.quarters = ks, Zn.month = se, Zn.daysInMonth = re, Zn.week = Zn.weeks = Ye, Zn.isoWeek = Zn.isoWeeks = ze, Zn.weeksInYear = ys, Zn.weeksInWeekYear = bs, Zn.isoWeeksInYear = gs, Zn.isoWeeksInISOWeekYear = vs, Zn.date = Hn, Zn.day = Zn.days = ve, Zn.weekday = ye, Zn.isoWeekday = be, Zn.dayOfYear = $s, Zn.hour = Zn.hours = yn, Zn.minute = Zn.minutes = Wn, Zn.second = Zn.seconds = Gn, Zn.millisecond = Zn.milliseconds = zn, Zn.utcOffset = Gt, Zn.utc = Qt, Zn.local = Kt, Zn.parseZone = Jt, Zn.hasAlignedHourOffset = Xt, Zn.isDST = ei, Zn.isLocal = ii, Zn.isUtcOffset = si, Zn.isUtc = ri, Zn.isUTC = ri, Zn.zoneAbbr = Cs, Zn.zoneName = Ss, Zn.dates = _("dates accessor is deprecated. Use date instead.", Hn), Zn.months = _("months accessor is deprecated. Use month instead", se), Zn.years = _("years accessor is deprecated. Use year instead", zr), Zn.zone = _("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", Zt), Zn.isDSTShifted = _("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", ti);
        var Qn = Se.prototype;
        Qn.calendar = Ae, Qn.longDateFormat = De, Qn.invalidDate = Pe, Qn.ordinal = Me, Qn.preparse = Ps, Qn.postformat = Ps, Qn.relativeTime = Ee, Qn.pastFuture = je, Qn.set = xe, Qn.eras = Ji, Qn.erasParse = Xi, Qn.erasConvertYear = es, Qn.erasAbbrRegex = as, Qn.erasNameRegex = ns, Qn.erasNarrowRegex = os, Qn.months = J, Qn.monthsShort = X, Qn.monthsParse = te, Qn.monthsRegex = ae, Qn.monthsShortRegex = ne, Qn.week = qe, Qn.firstDayOfYear = We, Qn.firstDayOfWeek = He, Qn.weekdays = de, Qn.weekdaysMin = fe, Qn.weekdaysShort = pe, Qn.weekdaysParse = ge, Qn.weekdaysRegex = _e, Qn.weekdaysShortRegex = we, Qn.weekdaysMinRegex = ke, Qn.isPM = Je, Qn.meridiem = Xe, nt("en", {
            eras: [{
                since: "0001-01-01",
                until: 1 / 0,
                offset: 1,
                name: "Anno Domini",
                narrow: "AD",
                abbr: "AD"
            }, {
                since: "0000-12-31",
                until: -1 / 0,
                offset: 1,
                name: "Before Christ",
                narrow: "BC",
                abbr: "BC"
            }],
            dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function(e) {
                var t = e % 10;
                return e + (1 === O(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th")
            }
        }), e.lang = _("moment.lang is deprecated. Use moment.locale instead.", nt), e.langData = _("moment.langData is deprecated. Use moment.localeData instead.", lt);
        var Kn = Math.abs,
            Jn = zs("ms"),
            Xn = zs("s"),
            ea = zs("m"),
            ta = zs("h"),
            ia = zs("d"),
            sa = zs("w"),
            ra = zs("M"),
            na = zs("Q"),
            aa = zs("y"),
            oa = Jn,
            la = Qs("milliseconds"),
            ca = Qs("seconds"),
            ua = Qs("minutes"),
            ha = Qs("hours"),
            da = Qs("days"),
            pa = Qs("months"),
            fa = Qs("years"),
            ma = Math.round,
            ga = {
                ss: 44,
                s: 45,
                m: 45,
                h: 22,
                d: 26,
                w: null,
                M: 11
            },
            va = Math.abs,
            ya = Nt.prototype;
        return ya.isValid = Rt, ya.abs = Rs, ya.add = Ns, ya.subtract = Us, ya.as = Ys, ya.asMilliseconds = Jn, ya.asSeconds = Xn, ya.asMinutes = ea, ya.asHours = ta, ya.asDays = ia, ya.asWeeks = sa, ya.asMonths = ra, ya.asQuarters = na, ya.asYears = aa, ya.valueOf = oa, ya._bubble = qs, ya.clone = Gs, ya.get = Zs, ya.milliseconds = la, ya.seconds = ca, ya.minutes = ua, ya.hours = ha, ya.days = da, ya.weeks = Ks, ya.months = pa, ya.years = fa, ya.humanize = ir, ya.toISOString = rr, ya.toString = rr, ya.toJSON = rr, ya.locale = Ii, ya.localeData = Li, ya.toIsoString = _("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", rr), ya.lang = Bn, A("X", 0, 0, "unix"), A("x", 0, 0, "valueOf"),
            E("x", Pr), E("X", Er), R("X", function(e, t, i) {
                i._d = new Date(1e3 * parseFloat(e))
            }), R("x", function(e, t, i) {
                i._d = new Date(O(e))
            }), e.version = "2.31.0", t(Ft), e.fn = Zn, e.min = It, e.max = Lt, e.now = En, e.utc = h, e.unix = As, e.months = Fs, e.isDate = l, e.locale = nt, e.invalid = m, e.duration = ni, e.isMoment = y, e.weekdays = Is, e.parseZone = Ds, e.localeData = lt, e.isDuration = Ut, e.monthsShort = js, e.weekdaysMin = Os, e.defineLocale = at, e.updateLocale = ot, e.locales = ct, e.weekdaysShort = Ls, e.normalizeUnits = $, e.relativeTimeRounding = er, e.relativeTimeThreshold = tr, e.calendarFormat = gi, e.prototype = Zn, e.HTML5_FMT = {
                DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
                DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
                DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
                DATE: "YYYY-MM-DD",
                TIME: "HH:mm",
                TIME_SECONDS: "HH:mm:ss",
                TIME_MS: "HH:mm:ss.SSS",
                WEEK: "GGGG-[W]WW",
                MONTH: "YYYY-MM"
            }, e
    }), Views.ItemDiscountDatepicker = class {
        constructor(e) {
            this.defaults = {
                humanFormat: "MMMM DD, YYYY",
                serverFormat: "YYYY-MM-DD"
            }, this.settings = $.extend({}, this.defaults, e.data("props")), this.changingToProgrammatically = !1, this.dom = {
                humanFrom: e.find(".js-human-from")[0],
                humanTo: e.find(".js-human-to")[0],
                serverFrom: e.find(".js-server-from")[0],
                serverTo: e.find(".js-server-to")[0]
            }, loadjs([this.settings.jsPath, this.settings.cssPath], () => {
                this.setupFields()
            })
        }
        setupFields() {
            const e = {
                    dayFormat: "D",
                    time: !1,
                    inputFormat: this.settings.humanFormat
                },
                t = $.extend({}, e);
            this.settings.min && (t.min = moment(this.settings.min)), this.settings.max && (t.max = moment(this.settings.max)), this.from = rome(this.dom.humanFrom, t);
            const i = $.extend({}, e, {
                dateValidator: rome.val.afterEq(this.dom.humanFrom)
            });
            this.settings.max && (i.max = moment(this.settings.max)), this.to = rome(this.dom.humanTo, i), this.from.on("ready", () => {
                this.oldFromMoment = this.from.getMoment(), this.updateServerField(this.oldFromMoment, "From")
            }), this.from.on("ready", () => {
                this.oldToMoment = this.to.getMoment(), this.updateServerField(this.oldToMoment, "To")
            }), this.from.on("data", () => {
                if (this.settings.doNotAutoUpdateTo) return;
                const e = this.from.getMoment();
                this.oldFromMoment.isSame(e) || (this.updateToFieldWhenFromChanged(this.oldFromMoment, e), this.oldFromMoment = e)
            }), this.from.on("data", e => {
                this.updateServerField(e, "From")
            }), this.to.on("data", e => {
                this.updateServerField(e, "To");
                const t = this.to.getMoment();
                this.changingToProgrammatically || this.oldToMoment.isSame(t, "date") || (this.oldToMoment = t)
            })
        }
        updateToFieldWhenFromChanged(e, t) {
            let i;
            const s = t.diff(e),
                r = this.to.getMoment();
            i = r ? r.add(s) : moment().add(s);
            try {
                this.changingToProgrammatically = !0, this.to.setValue(i), this.to.emitValues()
            } finally {
                this.changingToProgrammatically = !1
            }
        }
        updateServerField(e, t) {
            this.dom[`server${t}`].value = moment(e).format(this.settings.serverFormat)
        }
    }, Views.ItemDiscountSubmission = class {
        constructor(e) {
            this.dom = {
                $form: e,
                $saveButton: e.find('[data-action="save"]'),
                $modalHTML: $(".js_confirm_create_discount_modal"),
                $modalButtonSubmit: $('.js_confirm_create_discount_modal [data-action="create-item-discount"]'),
                $modalButtonCancel: $('.js_confirm_create_discount_modal [data-action="cancel-creating-item-discount"]')
            }, this.dom.$modalButtonSubmit.on("click", this._triggerSubmit.bind(this)), this.dom.$modalButtonCancel.on("click", this._closeModal.bind(this)), this.dom.$saveButton.on("click", this._showModal.bind(this))
        }
        _showModal(e) {
            e.preventDefault(), Market.DOMUtils.getModalInstance().show(this.dom.$modalHTML.show(), !0, {})
        }
        _triggerSubmit() {
            this.dom.$form.trigger("submit"), this._closeModal()
        }
        _closeModal() {
            Market.DOMUtils.getModalInstance().close()
        }
    }, Views.ItemHeaderAjaxAddToCart = class {
        constructor(e) {
            this.$el = e, this.currentVariant = {
                license: null,
                size: null,
                support: null
            }, this.dom = {
                $price: e.find(".js-item-header__price")
            }, $(document).on("item:variantChange", this.handleVariantChange.bind(this)), this.$el.on("click", ".js-item-header__cart-button[data-add-to-cart-url]", this.handleAddToCartClick.bind(this))
        }
        handleVariantChange(e, t) {
            t.license && (this.currentVariant.license = t.license), t.size && (this.currentVariant.size = t.size), void 0 !== t.support && (this.currentVariant.support = t.support), t.price && this.updatePrice(t.price)
        }
        updatePrice(e) {
            e && this.dom.$price.html(e)
        }
        handleAddToCartClick(e) {
            e.preventDefault();
            const t = $(e.currentTarget);
            if (t.prop("disabled")) return !1;
            const i = t.data("add-to-cart-url");
            this._executeAjaxAddToCart(t, i)
        }
        async _executeAjaxAddToCart(e, t) {
            try {
                if (!await this._isDatabaseHealthy()) return alert("This functionality is disabled while maintenance is being performed. Try submitting again in a few minutes."), !1;
                this._trackAnalytics(e), this._setSubmittingState(e, !0), Market.DOMUtils.getModalInstance().init(), $.ajax({
                    url: t,
                    method: "POST",
                    data: {
                        license: this.currentVariant.license,
                        support: this.currentVariant.support || "",
                        size: this.currentVariant.size || "",
                        quantity: 1
                    },
                    dataType: "json",
                    success: e => {
                        e ? .redirect_url ? window.location.href = e.redirect_url : (null != e ? .cart_count && $(document).trigger("uiCartUpdateRequest", e), e ? .html && Market.DOMUtils.getModalInstance().show(e.html, !1))
                    },
                    error: e => {
                        this._handleAjaxError(e)
                    },
                    complete: () => this._setSubmittingState(e, !1)
                })
            } catch (e) {
                this._handleUnexpectedError(e, "_executeAjaxAddToCart")
            }
        }
        async _isDatabaseHealthy() {
            try {
                return "read-only" !== (await $.ajax({
                    url: "/_healthcheck/database"
                })).write.value
            } catch (e) {
                return this._handleUnexpectedError(e, "_isDatabaseHealthy"), !1
            }
        }
        _handleAjaxError(e) {
            Market.DOMUtils.getModalInstance().error(), window.Rollbar ? .error("Item header AJAX add-to-cart error", {
                status: e ? .status,
                statusText: e ? .statusText,
                responseText: e ? .responseText,
                url: e ? .responseURL
            })
        }
        _handleUnexpectedError(e, t) {
            e && (void 0 !== e.status || void 0 !== e.statusText) || (window.Rollbar ? .error("Item header runtime error", {
                context: t,
                error: e,
                message: e ? .message,
                stack: e ? .stack
            }), Market.DOMUtils.getModalInstance().error())
        }
        _trackAnalytics(e) {
            try {
                const t = e.data("analytics-click-payload");
                if (t && window.GtmMeasurements) {
                    const e = "string" == typeof t ? JSON.parse(t) : t;
                    window.GtmMeasurements.sendAnalyticsEvent(e)
                }
            } catch (e) {
                console.warn("[GA4] Failed to track add to cart:", e)
            }
        }
        _setSubmittingState(e, t) {
            if (e.prop("disabled", t), t) e.data("original-html", e.html()), e.html('<i class="e-icon -icon-spinner -spin"></i> Adding...');
            else {
                const t = e.data("original-html");
                t && e.html(t)
            }
        }
    }, Market.DOMUtils.ItemSubmission = function() {
        const e = function() {
                const e = this.$input_elements.filter("[type=checkbox]:checked").not(this.$input_controller).length;
                this.$selected_text.text(e + " " + (1 === e ? "File" : "Files") + " Selected")
            },
            t = function() {
                this.$control_element.slideDown("fast"), this.updateSelectedText()
            },
            i = function() {
                this.$control_element.slideUp("fast")
            },
            s = function() {
                this.$input_controller.is(":checked") && this.$input_elements.filter("[type=checkbox]:checked").length > 0 ? (this.$input_elements.prop("checked", !0), this.showControlPanel(), this.$toggle_select_text.text("Deselect All")) : (this.$input_elements.prop("checked", !1), this.hideControlPanel(), this.$toggle_select_text.text("Select All"))
            },
            r = function(e) {
                e.is(":checked") ? (this.showControlPanel(), this.$input_elements.filter("input.js-select-controller").prop("checked", !1)) : (this.$input_controller.prop("checked", !1), this.$toggle_select_text.text("Select All"), this.updateSelectedText(), 0 === this.$input_elements.filter("[type=checkbox]:checked").length && this.hideControlPanel()), this.$input_elements.filter("[type=checkbox]:checked").length === this.$input_elements.not("input.js-select-controller").length && (this.$input_controller.prop("checked", !0), this.toggleAllSelect())
            },
            n = function(e) {
                return confirm(e)
            };
        return {
            loadItemSubmissionDom: function(a) {
                return {
                    $input_controller: $("input.js-select-controller", $(a)),
                    $input_elements: $("input[type=checkbox]", $(a)),
                    $control_element: $(".content div.multiple-action", $(a)),
                    $selected_text: $("span.num-selected", $(".content div.multiple-action", $(a))),
                    $toggle_select_text: $("a.select-all", $(a)),
                    updateSelectedText: e,
                    showControlPanel: t,
                    hideControlPanel: i,
                    toggleSelect: r,
                    toggleAllSelect: s,
                    confirmLicense: n
                }
            }
        }
    }(), Views.ItemImportForm = function(e) {
        const t = {
            labelForLicense: e.data("labelForLicense"),
            authenticityToken: e.data("authenticityToken"),
            numberOfItems: e.data("numberOfItems")
        };
        $(".process-wrapper h4 input").click(function(e) {
            e.stopImmediatePropagation(), Market.DOMUtils.ItemSubmission.loadItemSubmissionDom($(this).parents(".process-wrapper")).toggleAllSelect()
        }), $(".process-wrapper .status input:checkbox").change(function(e) {
            e.stopImmediatePropagation(), Market.DOMUtils.ItemSubmission.loadItemSubmissionDom($(this).parents(".process-wrapper")).toggleSelect($(this))
        }), $(".process-wrapper .multiple-action input[name=complete]").click(function() {
            return Market.DOMUtils.ItemSubmission.loadItemSubmissionDom($(this).parents(".process-wrapper")).confirmLicense(t.labelForLicense)
        }), $(".process-wrapper a.submit-single").click(function(e) {
            e.preventDefault();
            if (Market.DOMUtils.ItemSubmission.loadItemSubmissionDom($(this).parents(".process-wrapper")).confirmLicense(t.labelForLicense)) {
                const e = $('<form style="display:none">').attr("method", "post").attr("action", this.href);
                $('<input type="hidden">').attr("name", "_method").attr("value", "put").appendTo(e), $('<input type="hidden">').attr("name", "utf8").attr("value", "&#x2713;").appendTo(e), $('<input type="hidden">').attr("name", "authenticity_token").attr("value", t.authenticityToken).appendTo(e), e.appendTo("body"), e.submit()
            }
            return !1
        }), $(".select-all").on("click", function(e) {
            e.preventDefault();
            const t = $(this),
                i = t.closest(".process-wrapper").find("h4 input");
            i[0].checked ? (i.prop("checked", !1), t.empty().append("Select All")) : (i.prop("checked", !0), t.empty().append("Deselect All")), Market.DOMUtils.ItemSubmission.loadItemSubmissionDom($(this).parents(".process-wrapper")).toggleAllSelect()
        });
        const i = function() {
            const e = "/item_submissions/progress?total_item_submissions_count=" + t.numberOfItems;
            $("#item_submission_progress").on("load", function() {
                setTimeout(i, 5e3)
            }).attr("src", e)
        };
        setTimeout(i, 5e3)
    }, Market.CurrencyFormatter = {
        parsePrice(e) {
            if (!e) return 0;
            const t = e.toString().replace(/[^\d.-]/g, ""),
                i = parseFloat(t);
            return isNaN(i) ? 0 : i
        },
        formatCurrency(e, t = {}) {
            const i = { ...{
                    symbol: "$",
                    decimals: 2,
                    thousandsSeparator: ",",
                    showCentsIfWhole: !1
                },
                ...t
            };
            if (!e || isNaN(e)) return `${i.symbol}0${i.showCentsIfWhole?".00":""}`;
            const s = Math.pow(10, i.decimals),
                r = Math.round(e * s) / s;
            let n;
            if (n = r % 1 == 0 && !i.showCentsIfWhole ? Math.round(r).toString() : r.toFixed(i.decimals), i.thousandsSeparator && r >= 1e3) {
                const e = n.split(".");
                e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, i.thousandsSeparator), n = e.join(".")
            }
            return `${i.symbol}${n}`
        },
        formatMarketPrice(e) {
            return this.formatCurrency(e, {
                symbol: "$",
                decimals: 2,
                thousandsSeparator: !1,
                showCentsIfWhole: !1
            })
        }
    }, Views.ItemLicenseDiscountingForm = class {
        constructor(e) {
            this.DEBOUNCE_DELAY = 500, this.discount_percentage_option_row_selector = ".js-.discount-percentage-option-row", this.discount_percentage_option_selector = ".js-.discount-percentage-option", this.discount_percentage_options_selector = ".js-.discount-percentage-options", this.discount_percentage_selector = "input.js-.discount-percentage", this.discounted_item_price_selector = "input.js-.discounted-item-price", this.discounted_item_list_price_selector = ".js-.discounted-item-list-price", this.form_placeholder_selector = ".js-.item-license-discounting-form-placeholder", this.discounted_item_price_error_selector = ".js-discount-validation-message--amount", this.discount_percentage_error_selector = ".js-discount-validation-message--percentage", this.cancel_discount_button = ".js-cancel-discount-button", this.cancel_modal_confirm_button = ".js-cancel-discount-modal-primary-action", this.cancel_modal_cancel_button = ".js-cancel-discount-modal-secondary-action", this.dom = {
                $body: $("body"),
                $el: e
            }, this.setupListeners(), this.renderDiscountForm()
        }
        setupListeners() {
            this.dom.$body.on("click", this.discount_percentage_option_row_selector, e => {
                this.handleRowClick(e), this.handleDiscountPercentageInputChange(e)
            }), this.dom.$body.on("keydown", this.discount_percentage_option_row_selector, _.debounce(e => this.handleDiscountPercentageInputChange(e), this.DEBOUNCE_DELAY)), this.dom.$body.on("change", this.discount_percentage_option_selector, e => this.handleOptionClick(e)), this.dom.$body.on("click", this.discounted_item_price_selector, e => this.handleDiscountedItemPriceInputChange(e)), this.dom.$body.on("keydown", this.discounted_item_price_selector, _.debounce(e => this.handleDiscountedItemPriceInputChange(e), this.DEBOUNCE_DELAY)), this.dom.$body.on("click", this.cancel_discount_button, e => this.cancelDiscountButtonClick(e)), this.dom.$body.on("click", this.cancel_modal_confirm_button, e => this.cancelModalConfirmButtonClick(e)), this.dom.$body.on("click", this.cancel_modal_cancel_button, e => this._closeModal(e))
        }
        renderDiscountForm() {
            const e = $(this.form_placeholder_selector),
                t = e.data("itemId");
            $.get(`/items/${t}/item_license_discounts/new`).done(t => {
                e.replaceWith(t), new Views.ItemDiscountDatepicker($(".edit-item-discount__date-fields")), new Views.Modal($(".js-discounts-view-history"));
                const i = parseInt($(".item-discount-form .license-pricing").data("buyerFee"), 10);
                $(".item-discount-form .adp__popup").data("buyerFee", i), new Views.AuthorDrivenPricingCalculator($(".item-discount-form .adp__wrapper")), new Views.ItemDiscountSubmission($(".item-discount-form"))
            })
        }
        cancelModalConfirmButtonClick(e) {
            this._closeModal(), $(this.cancel_discount_button).prop("disabled", !0)
        }
        _closeModal() {
            Market.DOMUtils.getModalInstance().close()
        }
        cancelDiscountButtonClick(e) {
            e.preventDefault(), Market.DOMUtils.getModalInstance().show(this.cancelDiscountModal(), !0, {})
        }
        handleDiscountPercentageInputChange(e) {
            if (this.handleResetItemPercentageInputValidations(), !this.selectedCustom() || "" === this.discountPercentageInput().val()) return;
            const t = Math.floor(+this.discountPercentageInput().val());
            this.discountPercentageInput().attr("value", t);
            const i = Math.floor(this.originalItemPrice() / 100 * (100 - t) - this.buyerFee());
            this.discountedItemPriceInput().attr("value", i), this.handleInputValidations(), $(this.discounted_item_list_price_selector).text(Market.CurrencyFormatter.formatCurrency(i + this.buyerFee()))
        }
        handleDiscountedItemPriceInputChange(e) {
            if (this.handleResetItemPriceInputValidations(), !this.selectedCustom() || "" === this.discountedItemPriceInput().val()) return;
            const t = Math.floor(+this.discountedItemPriceInput().val());
            this.discountedItemPriceInput().attr("value", t);
            const i = Math.floor(100 - 100 * (t + this.buyerFee()) / this.originalItemPrice());
            this.discountPercentageInput().attr("value", i), this.handleInputValidations(), $(this.discounted_item_list_price_selector).text(Market.CurrencyFormatter.formatCurrency(t + this.buyerFee()))
        }
        handleResetItemPriceInputValidations() {
            this.discountedItemPriceInput().removeClass("invalid"), $(this.discounted_item_price_error_selector).removeClass("active")
        }
        handleResetItemPercentageInputValidations() {
            this.discountPercentageInput().removeClass("invalid"), $(this.discount_percentage_error_selector).removeClass("active")
        }
        handleInputValidations() {
            this.handleResetItemPriceInputValidations(), Math.floor(this.discountedItemPriceInput().val()) < this.discountedItemPriceInput().data("validationMinimum") && (this.discountedItemPriceInput().addClass("invalid"), $(this.discounted_item_price_error_selector).addClass("active")), this.handleResetItemPercentageInputValidations(), Math.floor(this.discountPercentageInput().val()) < this.discountPercentageInput().data("validationMinimum") && (this.discountPercentageInput().addClass("invalid"), $(this.discount_percentage_error_selector).addClass("active"))
        }
        handleRowClick(e) {
            if ($(e.target).closest("td").hasClass("js- license-pricing-cell")) return !0;
            const t = $(e.target).parents(this.discount_percentage_option_row_selector);
            t.find(this.discount_percentage_option_selector).prop("checked") || t.find(this.discount_percentage_option_selector).prop("checked", !0).trigger("change"), this.selectedCustom() && ($(e.target).closest("td").hasClass("js- discounted-item-price") ? $(this.discountedItemPriceInput()).select().focus() : $(this.discountPercentageInput()).select().focus())
        }
        handleOptionClick(e) {
            const t = $(e.target),
                i = t.parents(this.discount_percentage_options_selector);
            i.find(".js-discount-custom-input").prop("disabled", "custom" !== t.val()), i.find(this.discount_percentage_option_row_selector).removeClass("js-selected"), t.parents(this.discount_percentage_option_row_selector).addClass("js-selected")
        }
        discountedItemPriceInput() {
            return this.dom.$el.find(this.discounted_item_price_selector)
        }
        discountPercentageInput() {
            return this.dom.$el.find(this.discount_percentage_selector)
        }
        buyerFee() {
            return +$(".js-.item-discount-form").data("buyerFee")
        }
        originalItemPrice() {
            return +$(".js-.item-discount-form").data("originalItemPrice")
        }
        selectedCustom() {
            return $(this.discountPercentageInput()).closest("tr").hasClass("js-selected")
        }
        cancelDiscountModal() {
            return $(".js-cancel-discount-modal")
        }
    }, Views.ReplaceItemNavsWithRemote = class {
        constructor(e) {
            const t = e.data("target");
            e.on("change", t, function(e) {
                e.preventDefault();
                const t = $("option:selected", this);
                window.location.href = t.data("url")
            })
        }
    }, Views.ItemPageScrollEvents = class {
        constructor() {
            this.heightsToCheck = [25, 50, 75, 100], this.$document = $(document), this.$window = $(window), this.handleScrollPositionChange = this.handleScrollPositionChange.bind(this), this.$document.on("scroll", this.handleScrollPositionChange), this.$window.on("resize", this.handleScrollPositionChange)
        }
        handleScrollPositionChange() {
            const e = Math.ceil(this.$document.scrollTop()),
                t = this.$document.height(),
                i = e + this.$window.height();
            for (const e of this.heightsToCheck) {
                if (!(i >= t * (e / 100))) break;
                this.heightsToCheck = this.heightsToCheck.filter(t => t !== e)
            }
            0 === this.heightsToCheck.length && (this.$document.off("scroll", this.handleScrollPositionChange), this.$window.off("resize", this.handleScrollPositionChange))
        }
    }, Views.ItemReview = class {
        constructor(e) {
            this.$form = e, this.$ratingWidgetEdit = this.$form.find("[data-view='starRating']"), this.item_id = this.$ratingWidgetEdit.data("itemId"), this.$ratingWidget = $("#rating-" + this.item_id), this.$formMessages = this.$form.find(".js-rating-form-notifications"), this.$formError = this.$form.find(".js-rating-form-error"), this.$formHint = this.$form.find(".js-rating-form-hint"), this.$formSuccess = this.$form.find(".js-rating-form-success"), this.$formRating = this.$form.find(".js-rating-form-input"), this.$formValidationHint = this.$form.find(".js-rating-form-validation-hint"), this.saved = !1, this.modal = $.magnificPopup.instance, this.quick_rating = this.$ratingWidgetEdit.data("ratingTemp"), this.new_rating = this.quick_rating, this.$ratingWidget.on("starRating:change", this.updateRating.bind(this)), this.$form.on("ajax:beforeSend", this.createBeforeSend.bind(this)), this.$form.on("ajax:success", this.createSuccess.bind(this)), this.$form.on("ajax:error", this.createError.bind(this)), this.modal.close = () => {
                $.magnificPopup.proto.close.call(this), this.updateStars()
            }
        }
        createBeforeSend(e, t, i) {
            this.render("updating", e.target)
        }
        createSuccess(e, t, i, s) {
            "ok" === t.status ? this.render("new", e.target, t) : this.render("validationError", e.target, t)
        }
        createError(e, t, i, s) {
            this.render("error", e.target, t)
        }
        render(e, t, i) {
            switch (e) {
                case "updating":
                    this.$formError.addClass("is-hidden").html("");
                    break;
                case "new":
                    this.saved = !0, this.modal.close();
                    break;
                case "validationError":
                    this.notification("error", i.errors);
                    break;
                case "error":
                    this.notification("error", "Sorry something went wrong")
            }
        }
        notification(e, t) {
            switch (e) {
                case "reset":
                    this.$formMessages.addClass("is-hidden"), this.$formSuccess.addClass("is-hidden"), this.$formError.addClass("is-hidden"), this.$formHint.addClass("is-hidden"), this.$formValidationHint.addClass("is-hidden");
                    break;
                case "hint":
                    this.$formMessages.removeClass("is-hidden"), this.$formSuccess.addClass("is-hidden"), this.$formHint.removeClass("is-hidden"), this.$formError.addClass("is-hidden"), this.$formValidationHint.removeClass("is-hidden");
                    break;
                case "success":
                    this.$formMessages.removeClass("is-hidden"), this.$formSuccess.removeClass("is-hidden"), this.$formHint.addClass("is-hidden"), this.$formError.addClass("is-hidden"), this.$formValidationHint.addClass("is-hidden");
                    break;
                case "error":
                    this.$formMessages.removeClass("is-hidden"), this.$formSuccess.addClass("is-hidden"), this.$formHint.addClass("is-hidden"), this.$formError.html(t).removeClass("is-hidden"), this.$formValidationHint.removeClass("is-hidden")
            }
        }
        updateStars() {
            this.saved ? this.$ratingWidget.trigger("starRating:save", this.new_rating) : this.$ratingWidget.trigger("starRating:reset")
        }
        updateRating(e, t) {
            this.new_rating = t, this.$formRating.val(t), this.notification("reset"), this.new_rating < 4 ? this.notification("hint") : this.new_rating >= 4 && this.quick_rating === this.new_rating && this.notification("success")
        }
    }, Views.ItemSupportInquiryForm = class {
        constructor(e) {
            this.$form = e, this.$form.on("submit", () => {
                const e = this.$form.find("#item_support_inquiry_form_message");
                Market.Helpers.FormEscaping.escapeInHiddenCopyAndDisable(this.$form, e, "item_support_inquiry_form[base64_message]")
            })
        }
    }, Views.ItemSupportPreferences = class {
        constructor() {
            const e = $("#new_user_item_support_preferences_updater");
            this.radios = e.find(".support-inputs :radio"), this.radios.on("change", this.onSelectChanged.bind(this)), this.sections = {
                response_time: $("#response-time-section"),
                policy: $("#support-policy-section"),
                email: $("#email-section"),
                url: $("#url-section")
            }, this.onSelectChanged()
        }
        onSelectChanged() {
            const e = this.radios.filter(":checked").val();
            this.sections.policy.toggleClass("is-hidden--js", "unsupported" === e), this.sections.response_time.toggleClass("is-hidden--js", "unsupported" === e), this.sections.email.toggleClass("is-hidden--js", "email" !== e), this.sections.url.toggleClass("is-hidden--js", "url" !== e)
        }
    }, Views.ItemVariantQuantitySelector = class {
        static DEFAULTS = {
            MIN_QUANTITY: 1,
            MAX_QUANTITY: 100,
            DEFAULT_QUANTITY: 1
        };
        constructor(e) {
            this.$el = e, this._initializeDOMElements(), this._bindEvents()
        }
        _initializeDOMElements() {
            this.dom = {
                $quantityInput: this.$el.find(".purchase-form__quantity-input"),
                $quantityDecrease: this.$el.find(".purchase-form__quantity-btn--decrease"),
                $quantityIncrease: this.$el.find(".purchase-form__quantity-btn--increase")
            }
        }
        _bindEvents() {
            this.dom.$quantityDecrease.on("click", this._handleQuantityDecrease.bind(this)), this.dom.$quantityIncrease.on("click", this._handleQuantityIncrease.bind(this)), this.dom.$quantityInput.on("change input", this._handleQuantityChange.bind(this))
        }
        _handleQuantityDecrease(e) {
            e.preventDefault();
            const t = this._getCurrentQuantity(),
                i = this._getMinQuantity(),
                s = Math.max(i, t - 1);
            this._setQuantityValue(s)
        }
        _handleQuantityIncrease(e) {
            e.preventDefault();
            const t = this._getCurrentQuantity(),
                i = this._getMaxQuantity(),
                s = Math.min(i, t + 1);
            this._setQuantityValue(s)
        }
        _handleQuantityChange(e) {
            const t = parseInt(e.target.value) || this.constructor.DEFAULTS.DEFAULT_QUANTITY,
                i = this._constrainQuantity(t);
            this.dom.$quantityInput.val(i), this._broadcastQuantityChange(i)
        }
        _setQuantityValue(e) {
            this.dom.$quantityInput.val(e).trigger("change")
        }
        _getCurrentQuantity() {
            return parseInt(this.dom.$quantityInput.val()) || this.constructor.DEFAULTS.DEFAULT_QUANTITY
        }
        _constrainQuantity(e) {
            const t = this._getMinQuantity(),
                i = this._getMaxQuantity();
            return Math.max(t, Math.min(i, e))
        }
        _getMinQuantity() {
            return parseInt(this.dom.$quantityInput.attr("min")) || this.constructor.DEFAULTS.MIN_QUANTITY
        }
        _getMaxQuantity() {
            return parseInt(this.dom.$quantityInput.attr("max")) || this.constructor.DEFAULTS.MAX_QUANTITY
        }
        _broadcastQuantityChange(e) {
            $(document).trigger("quantity:change", e)
        }
    }, Views.ItemVariantSelector = class {
        constructor(e) {
            this.$el = e, this.SUPPORT_12_MONTH_UPGRADE = "bundle_12month", this.dataOptions = this.$el.data(), this.cookiebotEnabled = this.dataOptions.cookiebotEnabled, this.consentGiven = Market.Helpers.CookieConsent.given, this.consentType = "preferences", this.dom = {
                $licenseSelector: this.$el.find(".js-purchase-license-selector"),
                $licensePrices: this.$el.find(".js-purchase-license-prices"),
                $licenses: this.$el.find(".js-purchase-license"),
                $price: this.$el.find(".js-purchase-price"),
                $defaultLicense: this.$el.find(".js-purchase-default-license"),
                $chosenLicense: this.$el.find(".js-license-selector__chosen-license"),
                $licenseDetails: this.$el.find(".js-purchase-license-details"),
                $heading: this.$el.find(".js-purchase-heading"),
                $supportDefault: this.$el.find(".js-support__default"),
                $supportCheckbox: this.$el.find(".js-support__option"),
                $supportPrice: this.$el.find(".js-support__price"),
                $renewalPrice: this.$el.find(".js-renewal__price"),
                $supportSaving: this.$el.find(".js-support__saving"),
                $supportInclusionLink: this.$el.find(".js-support__inclusion-link"),
                $supportPricingLink: this.$el.find(".js-support__pricing-link"),
                $salePriceWrapper: this.$el.find(".js-adi__item-sale-price-wrapper"),
                $saleLabelWrapper: this.$el.find(".js-adi__item-sale-savings"),
                $salePrice: this.$el.find(".js-adi__item-sale-price"),
                $purchaseButton: $(".js-purchase__buy-now"),
                $quantitySelector: this.$el.closest(".purchase-form").find('[data-view="itemVariantQuantitySelector"]')
            }, this.itemSupportable = this.dom.$supportCheckbox.length > 0, this.hasQuantitySelector = this.dom.$quantitySelector.length > 0, this.handleOnLoad(), this.dom.$licenseSelector.on("change", this.handleLicenseChange.bind(this)), this.dom.$supportCheckbox.on("change", this.handleSupportBundleChange.bind(this)), this.dom.$licenseDetails.on("click", this.handleLicenseDetailsClick.bind(this)), $(window).on("pageshow", this.handleOnLoad.bind(this)), this.hasQuantitySelector && $(document).on("quantity:change", this.handleQuantityChange.bind(this))
        }
        handleOnLoad() {
            this._setActiveLicense(), this._setActiveSupport(), this._setActivePrice(), this._updateSaleUI(), this.dom.$licenseSelector.find("option").prop("disabled", !1), this._resumeSelection(this._getCurrentURL()), this._updateUI()
        }
        handleLicenseChange() {
            this._setActiveLicense(), this._setActiveSupport(), this._setActivePrice(), this._setCookieData(), this._updateSaleUI(), this._updateUI()
        }
        handleSupportBundleChange() {
            this._setActiveSupport(), this._setActivePrice(), this._setCookieData(), this._updateSaleUI(), this._updateUI()
        }
        handleQuantityChange(e) {
            this._updateSaleUI(), this._updateUI()
        }
        handleLicenseDetailsClick(e) {
            e.preventDefault();
            const t = $(e.currentTarget).attr("href"),
                i = $.param({
                    license: this.activeLicense
                });
            window.location = `${t}?${i}`
        }
        _getCookieData() {
            const e = $.cookie("licenseSupport");
            return e ? JSON.parse(e) : []
        }
        _setCookieData() {
            if (this.cookiebotEnabled && !this.consentGiven(this.consentType)) return;
            const e = 10,
                t = {
                    item_id: this.$el.data("id"),
                    support: this.itemSupportable ? this.activeSupport.bundle : void 0,
                    license: this.activeLicense
                },
                i = this._getCookieData().filter(e => e.item_id !== t.item_id);
            i.length >= e && i.shift(), i.push(t), $.cookie("licenseSupport", JSON.stringify(i), {
                path: "/"
            })
        }
        _setActiveLicense() {
            const e = this.dom.$licenseSelector.find("option:selected").data("license");
            null != e ? (this.activeLicense = e, this.activeLicenseDefault = this.dom.$licenseSelector.find("option:selected").data("licenseDefault")) : (this.activeLicense = this.dom.$defaultLicense.data("license"), this.activeLicenseDefault = !0)
        }
        _updateSaleUI() {
            if (this.activeLicenseDefault && "active" === this.dom.$licensePrices.data("discountStatus")) {
                this.dom.$salePriceWrapper.addClass("is-active"), this.dom.$saleLabelWrapper.addClass("is-active"), this.dom.$price.addClass("adi__purchase-price-discounted");
                const e = this.dom.$supportCheckbox.prop("checked") ? this.dom.$licensePrices.data("defaultDiscountPriceUpgrade") : this.dom.$licensePrices.data("discountPrice");
                this._renderPrice(this.dom.$salePrice, e)
            } else this.dom.$salePriceWrapper.removeClass("is-active"), this.dom.$saleLabelWrapper.removeClass("is-active"), this.dom.$price.removeClass("adi__purchase-price-discounted")
        }
        _setActiveSupport() {
            if (this.itemSupportable) {
                const e = this.dom.$licensePrices.filter(`[data-license='${this.activeLicense}']`),
                    t = this.$el.find(".js-support__option:checked").val(),
                    i = this.dom.$supportDefault.val();
                this.activeSupport = {
                    bundle: t || i,
                    renewalPrice: e.data("supportRenewalPrice"),
                    price: e.data("supportUpgradePrice"),
                    saving: e.data("supportUpgradeSaving")
                }
            }
        }
        _setActivePrice() {
            const e = this.dom.$licensePrices.filter(`[data-license='${this.activeLicense}']`);
            this.activePrice = this.itemSupportable && this.activeSupport.bundle === this.SUPPORT_12_MONTH_UPGRADE ? e.data("pricePrepaidUpgrade") : e.data("pricePrepaid")
        }
        _updateUI() {
            this._renderActiveLicense(), this._renderActiveSupport(), this._renderActivePrice(), this._updateSupportPricingURI(), this._broadcastVariantChange()
        }
        _renderActiveLicense() {
            if (this.dom.$licenses.length > 1) {
                this.dom.$licenses.removeClass("is-active");
                this.dom.$licenses.filter(`[data-license='${this.activeLicense}']`).addClass("is-active");
                const e = this.dom.$licenseSelector.find("option:selected").text();
                this.dom.$chosenLicense.text(e)
            }
        }
        _renderActiveSupport() {
            this.itemSupportable && (this._renderPrice(this.dom.$supportPrice, this.activeSupport.price), this._renderPrice(this.dom.$renewalPrice, this.activeSupport.renewalPrice), this._renderPrice(this.dom.$supportSaving, this.activeSupport.saving))
        }
        _renderActivePrice() {
            if (this.activePrice.length > 6 ? this.dom.$heading.removeClass("-size-xxl").addClass("-size-l") : this.dom.$heading.removeClass("-size-l").addClass("-size-xxl"), this.activeLicenseDefault && "active" === this.dom.$licensePrices.data("discount-status")) {
                let e;
                e = this.itemSupportable && this.activeSupport.bundle === this.SUPPORT_12_MONTH_UPGRADE ? this.dom.$licensePrices.data("defaultDiscountOriginalPriceUpgrade") : this.dom.$licensePrices.data("discountOriginalPrice"), this._renderPrice(this.dom.$price, e)
            } else this._renderPrice(this.dom.$price, this.activePrice)
        }
        _renderPrice(e, t) {
            if (t)
                if (this.hasQuantitySelector) {
                    const i = this._getCurrentQuantity(),
                        s = Market.CurrencyFormatter.parsePrice(t) * i;
                    e.html(Market.CurrencyFormatter.formatCurrency(s))
                } else e.html(t)
        }
        _updateSupportPricingURI() {
            const e = this.dom.$supportPricingLink.attr("href");
            if (e) {
                const t = new URL(e, "https://localhost");
                t.searchParams.set("license", this.activeLicense), this.dom.$supportPricingLink.attr("href", t.pathname + t.search)
            }
        }
        _broadcastVariantChange() {
            const e = {
                license: this.activeLicense,
                price: this.activePrice
            };
            this.itemSupportable && (e.support = this.activeSupport.bundle), $(document).trigger("item:variantChange", e)
        }
        _resumeSelection(e) {
            const t = (e = new URL(e)).searchParams.get("license"),
                i = e.searchParams.get("open_purchase_for_item_id");
            null != t && (this.activeLicense = t, this._setActivePrice(), this._updateUI(), this.dom.$licenseSelector.find(`option[data-license='${t}']`).attr("selected", !0)), null != i && this._invokePurchaseFlow()
        }
        _invokePurchaseFlow() {
            this.dom.$purchaseButton.click()
        }
        _getCurrentURL() {
            return window.location
        }
        _getCurrentQuantity() {
            const e = this.dom.$quantitySelector.find(".purchase-form__quantity-input");
            return parseInt(e.val()) || 1
        }
    }, Views.LayoutSwitcher = class {
        constructor(e) {
            this.cookiebotEnabled = e.data().cookiebotEnabled, this.$list = $(".item-list, .item-grid"), this.$switchers = e.find("[data-layout-switch]"), this.$switchers.on("click", this.handleClick.bind(this)), this.selectInitialLayout($.cookie("item-layout"))
        }
        handleClick(e) {
            e.preventDefault(), this.$switchers.removeClass("is-active");
            const t = $(e.currentTarget);
            if (t.addClass("is-active"), "grid" === t.data("layoutSwitch")) {
                if (this.$list.addClass("item-grid").removeClass("item-list"), this.setGetCookie()) return $.cookie("item-layout", "grid")
            } else if ("list" === t.data("layoutSwitch") && (this.$list.addClass("item-list").removeClass("item-grid"), this.setGetCookie())) return $.cookie("item-layout", "list")
        }
        selectInitialLayout(e) {
            this.setGetCookie() && e ? $(`[data-layout-switch=${e}]`).click() : $(".item-list").length ? $("[data-layout-switch=list]").addClass("is-active") : $("[data-layout-switch=grid]").addClass("is-active")
        }
        setGetCookie() {
            return !this.cookiebotEnabled || Market.Helpers.CookieConsent.given("preferences")
        }
    }, Views.LicensePriceCalculator = class {
        constructor(e) {
            this.MIN_AUTHOR_PRICE = 1, this.MIN_DISPLAY_PRICE = 0, this.THRESHOLD = {
                UPPER: 1e3,
                LOWER: 10
            }, this.WARNINGS = {
                UPPER: "Have you accidentally entered an extra digit?<br> This price seems unusually high.",
                LOWER: "Have you accidentally missed a keystroke?<br> This price seems unusually low."
            }, this.ERRORS = {
                NUMBER: "Please enter a value greater than or equal to 1."
            }, this.$el = e, this.buyerFee = parseInt(this.$el.data("buyerFee"), 10), this.recommendedRange = {
                upper: parseInt(this.$el.data("recommendedRangeMax"), 10),
                lower: parseInt(this.$el.data("recommendedRangeMin"), 10)
            }, this.dom = {
                $licensePriceField: this.$el.find(".js-license-pricing__price-field"),
                $purchasePrice: this.$el.find(".js-license-pricing__purchase-price"),
                $validationMessage: this.$el.find(".js-license-pricing__validation-message"),
                $adpCalcPurchasePrice: this.$el.find(".js-.adp__purchase-price")
            }, $(".js-.adp__popup").data("buyerFee", this.buyerFee), this.handleLicensePriceChange = this.handleLicensePriceChange.bind(this), this.dom.$licensePriceField.on("keyup change", this.handleLicensePriceChange), this.dom.$licensePriceField.on("keydown", this.handleLicensePriceKeyDown.bind(this)), this.delayedErrorHandler = _.debounce(this._updateErrorWarnState, 800), this.dom.$licensePriceField.trigger("change", this.handleLicensePriceChange)
        }
        handleLicensePriceChange(e) {
            this._calculatePurchasePrice(), this.delayedErrorHandler(), this._updatePopupPrice()
        }
        handleLicensePriceKeyDown(e) {
            const t = this.dom.$licensePriceField.val();
            return 190 !== e.keyCode && (!(t.length >= this.dom.$licensePriceField.prop("maxlength") && this._isNumberKey(e.keyCode)) && void 0)
        }
        _updatePopupPrice() {
            this.dom.$adpCalcPurchasePrice.val(this.dom.$purchasePrice.html()), this.dom.$adpCalcPurchasePrice.trigger("change")
        }
        _calculatePurchasePrice() {
            const e = parseInt(this.dom.$licensePriceField.val(), 10) || 0;
            this._isValidPrice(e) && this._updatePurchasePrice(e + this.buyerFee)
        }
        _updateErrorWarnState() {
            if (this.dom.$licensePriceField.val().length) {
                const e = parseInt(this.dom.$licensePriceField.val(), 10) || 0;
                e < this.MIN_AUTHOR_PRICE ? this._updateValidationMessage(this.ERRORS.NUMBER) : e > 0 && e <= this.THRESHOLD.LOWER / 100 * this.recommendedRange.lower ? this._updateValidationMessage(this.WARNINGS.LOWER) : e >= this.THRESHOLD.UPPER / 100 * this.recommendedRange.upper ? this._updateValidationMessage(this.WARNINGS.UPPER) : this._updateValidationMessage("")
            } else this._updateValidationMessage("")
        }
        _isValidPrice(e) {
            return e >= this.MIN_DISPLAY_PRICE
        }
        _isNumberKey(e) {
            return e >= 48 && e <= 57
        }
        _updatePurchasePrice(e) {
            this.dom.$purchasePrice.text(e)
        }
        _updateValidationMessage(e) {
            const t = this.dom.$validationMessage;
            null != t && (e ? (t.html(e), t.slideDown(400), t.css("opacity", 1)) : (t.text(""), t.slideUp(400), t.css("opacity", 0)))
        }
    }, Views.LicensePricingValidator = class {
        constructor(e) {
            this.WARNINGS = {
                DIFFERENCE: "The extended license is usually priced higher than regular licenses."
            }, this.dom = {
                $licensePriceFields: e.find(".js-license-pricing__price-field"),
                $extendedValidationMessage: e.find(".js-license-pricing__validation-message--extended")
            }, this.delayedHandler = _.debounce(this.handleLicensePriceChange.bind(this), 800), this.dom.$licensePriceFields.on("keyup change", this.delayedHandler)
        }
        handleLicensePriceChange(e) {
            this.dom.$licensePriceFields.length > 1 && this.dom.$licensePriceFields[1].value.length && (parseInt(this.dom.$licensePriceFields[0].value, 10) > parseInt(this.dom.$licensePriceFields[1].value, 10) ? this._updateValidationMessage(this.WARNINGS.DIFFERENCE) : this._updateValidationMessage(""))
        }
        _updateValidationMessage(e) {
            e ? this.dom.$extendedValidationMessage.html(e).slideDown(400).css("opacity", 1) : this.dom.$extendedValidationMessage.text(e).slideUp(400).css("opacity", 0)
        }
    }, Views.LicenseSelector = class {
        constructor() {
            $(document).on("flyout:setup", this.setup.bind(this))
        }
        setup(e, t) {
            this.$flyout = t.flyout, this.dom = {
                $license: this.$flyout.find(".js-license-selector__item"),
                $selectedLabel: this.$flyout.find(".js-license-selector__selected-label"),
                $licenseSelector: $(".js-purchase-license-selector"),
                $chosenLicense: $(".js-license-selector__chosen-license")
            }, this._updateSelectedLabel(this.dom.$licenseSelector.val()), this.dom.$license.on("click", this.handleLicenseChange.bind(this))
        }
        handleLicenseChange(e) {
            const t = $(e.currentTarget),
                i = t.data("license"),
                s = t.data("name");
            this.dom.$licenseSelector.val() !== i && (this.dom.$licenseSelector.val(i), this.dom.$licenseSelector.trigger("change"), this._updateSelectedLabel(i), this._updateChosenLicense(s)), $(document).trigger("flyout:hide")
        }
        _updateSelectedLabel(e) {
            this.dom.$selectedLabel.addClass("is-hidden"), this.dom.$selectedLabel.filter(`[data-license='${e}']`).removeClass("is-hidden")
        }
        _updateChosenLicense(e) {
            this.dom.$chosenLicense.text(e)
        }
    },
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).remarkable = {})
    }(this, function(e) {
        "use strict";

        function t(e, t) {
            return !!e && ze.call(e, t)
        }

        function i(e) {
            return t(Ye, e) ? Ye[e] : e
        }

        function s(e) {
            return Object.prototype.toString.call(e)
        }

        function r(e) {
            return "[object String]" === s(e)
        }

        function n(e, t) {
            return !!e && Ge.call(e, t)
        }

        function a(e) {
            return [].slice.call(arguments, 1).forEach(function(t) {
                if (t) {
                    if ("object" != typeof t) throw new TypeError(t + "must be object");
                    Object.keys(t).forEach(function(i) {
                        e[i] = t[i]
                    })
                }
            }), e
        }

        function o(e) {
            return e.indexOf("\\") < 0 ? e : e.replace(Ze, "$1")
        }

        function l(e) {
            return !(e >= 55296 && e <= 57343) && (!(e >= 64976 && e <= 65007) && (!!(65535 & ~e && 65534 != (65535 & e)) && (!(e >= 0 && e <= 8) && (11 !== e && (!(e >= 14 && e <= 31) && (!(e >= 127 && e <= 159) && !(e > 1114111)))))))
        }

        function c(e) {
            if (e > 65535) {
                var t = 55296 + ((e -= 65536) >> 10),
                    i = 56320 + (1023 & e);
                return String.fromCharCode(t, i)
            }
            return String.fromCharCode(e)
        }

        function u(e, t) {
            var s = 0,
                r = i(t);
            return t !== r ? r : 35 === t.charCodeAt(0) && Ke.test(t) && l(s = "x" === t[1].toLowerCase() ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10)) ? c(s) : e
        }

        function h(e) {
            return e.indexOf("&") < 0 ? e : e.replace(Qe, u)
        }

        function d(e) {
            return et[e]
        }

        function p(e) {
            return Je.test(e) ? e.replace(Xe, d) : e
        }

        function f(e, t) {
            return ++t >= e.length - 2 ? t : "paragraph_open" === e[t].type && e[t].tight && "inline" === e[t + 1].type && 0 === e[t + 1].content.length && "paragraph_close" === e[t + 2].type && e[t + 2].tight ? f(e, t + 2) : t
        }

        function m() {
            this.rules = a({}, it), this.getBreak = it.getBreak
        }

        function g() {
            this.__rules__ = [], this.__cache__ = null
        }

        function v(e) {
            e.inlineMode ? e.tokens.push({
                type: "inline",
                content: e.src.replace(/\n/g, " ").trim(),
                level: 0,
                lines: [0, 1],
                children: []
            }) : e.block.parse(e.src, e.options, e.env, e.tokens)
        }

        function y(e, t, i, s, r) {
            this.src = e, this.env = s, this.options = i, this.parser = t, this.tokens = r, this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = [], this.isInLabel = !1, this.linkLevel = 0, this.linkContent = "", this.labelUnmatchedScopes = 0
        }

        function b(e, t) {
            var i, s, r, n = -1,
                a = e.posMax,
                o = e.pos,
                l = e.isInLabel;
            if (e.isInLabel) return -1;
            if (e.labelUnmatchedScopes) return e.labelUnmatchedScopes--, -1;
            for (e.pos = t + 1, e.isInLabel = !0, i = 1; e.pos < a;) {
                if (91 === (r = e.src.charCodeAt(e.pos))) i++;
                else if (93 === r && 0 === --i) {
                    s = !0;
                    break
                }
                e.parser.skipToken(e)
            }
            return s ? (n = e.pos, e.labelUnmatchedScopes = 0) : e.labelUnmatchedScopes = i - 1, e.pos = o, e.isInLabel = l, n
        }

        function _(e, t, i, s) {
            var r, n, a, o, l, c;
            if (42 !== e.charCodeAt(0)) return -1;
            if (91 !== e.charCodeAt(1)) return -1;
            if (-1 === e.indexOf("]:")) return -1;
            if ((n = b(r = new y(e, t, i, s, []), 1)) < 0 || 58 !== e.charCodeAt(n + 1)) return -1;
            for (o = r.posMax, a = n + 2; a < o && 10 !== r.src.charCodeAt(a); a++);
            return l = e.slice(2, n), 0 === (c = e.slice(n + 2, a).trim()).length ? -1 : (s.abbreviations || (s.abbreviations = {}), void 0 === s.abbreviations[":" + l] && (s.abbreviations[":" + l] = c), a)
        }

        function w(e) {
            var t, i, s, r, n = e.tokens;
            if (!e.inlineMode)
                for (t = 1, i = n.length - 1; t < i; t++)
                    if ("paragraph_open" === n[t - 1].type && "inline" === n[t].type && "paragraph_close" === n[t + 1].type) {
                        for (s = n[t].content; s.length && !((r = _(s, e.inline, e.options, e.env)) < 0);) s = s.slice(r).trim();
                        n[t].content = s, s.length || (n[t - 1].tight = !0, n[t + 1].tight = !0)
                    }
        }

        function k(e) {
            var t = h(e);
            try {
                t = decodeURI(t)
            } catch (e) {}
            return encodeURI(t)
        }

        function $(e, t) {
            var i, s, r, n = t,
                a = e.posMax;
            if (60 === e.src.charCodeAt(t)) {
                for (t++; t < a;) {
                    if (10 === (i = e.src.charCodeAt(t))) return !1;
                    if (62 === i) return r = k(o(e.src.slice(n + 1, t))), !!e.parser.validateLink(r) && (e.pos = t + 1, e.linkContent = r, !0);
                    92 === i && t + 1 < a ? t += 2 : t++
                }
                return !1
            }
            for (s = 0; t < a && 32 !== (i = e.src.charCodeAt(t)) && !(i < 32 || 127 === i);)
                if (92 === i && t + 1 < a) t += 2;
                else {
                    if (40 === i && ++s > 1) break;
                    if (41 === i && --s < 0) break;
                    t++
                }
            return n !== t && (r = o(e.src.slice(n, t)), !!e.parser.validateLink(r) && (e.linkContent = r, e.pos = t, !0))
        }

        function x(e, t) {
            var i, s = t,
                r = e.posMax,
                n = e.src.charCodeAt(t);
            if (34 !== n && 39 !== n && 40 !== n) return !1;
            for (t++, 40 === n && (n = 41); t < r;) {
                if ((i = e.src.charCodeAt(t)) === n) return e.pos = t + 1, e.linkContent = o(e.src.slice(s + 1, t)), !0;
                92 === i && t + 1 < r ? t += 2 : t++
            }
            return !1
        }

        function C(e) {
            return e.trim().replace(/\s+/g, " ").toUpperCase()
        }

        function S(e, t, i, s) {
            var r, n, a, o, l, c, u, h, d;
            if (91 !== e.charCodeAt(0)) return -1;
            if (-1 === e.indexOf("]:")) return -1;
            if ((n = b(r = new y(e, t, i, s, []), 0)) < 0 || 58 !== e.charCodeAt(n + 1)) return -1;
            for (o = r.posMax, a = n + 2; a < o && (32 === (l = r.src.charCodeAt(a)) || 10 === l); a++);
            if (!$(r, a)) return -1;
            for (u = r.linkContent, c = a = r.pos, a += 1; a < o && (32 === (l = r.src.charCodeAt(a)) || 10 === l); a++);
            for (a < o && c !== a && x(r, a) ? (h = r.linkContent, a = r.pos) : (h = "", a = c); a < o && 32 === r.src.charCodeAt(a);) a++;
            return a < o && 10 !== r.src.charCodeAt(a) ? -1 : (d = C(e.slice(1, n)), void 0 === s.references[d] && (s.references[d] = {
                title: h,
                href: u
            }), a)
        }

        function A(e) {
            var t, i, s, r, n = e.tokens;
            if (e.env.references = e.env.references || {}, !e.inlineMode)
                for (t = 1, i = n.length - 1; t < i; t++)
                    if ("inline" === n[t].type && "paragraph_open" === n[t - 1].type && "paragraph_close" === n[t + 1].type) {
                        for (s = n[t].content; s.length && !((r = S(s, e.inline, e.options, e.env)) < 0);) s = s.slice(r).trim();
                        n[t].content = s, s.length || (n[t - 1].tight = !0, n[t + 1].tight = !0)
                    }
        }

        function D(e) {
            var t, i, s, r = e.tokens;
            for (i = 0, s = r.length; i < s; i++) "inline" === (t = r[i]).type && e.inline.parse(t.content, e.options, e.env, t.children)
        }

        function P(e) {
            var t, i, s, r, n, a, o, l, c, u = 0,
                h = !1,
                d = {};
            if (e.env.footnotes && (e.tokens = e.tokens.filter(function(e) {
                    return "footnote_reference_open" === e.type ? (h = !0, l = [], c = e.label, !1) : "footnote_reference_close" === e.type ? (h = !1, d[":" + c] = l, !1) : (h && l.push(e), !h)
                }), e.env.footnotes.list)) {
                for (a = e.env.footnotes.list, e.tokens.push({
                        type: "footnote_block_open",
                        level: u++
                    }), t = 0, i = a.length; t < i; t++) {
                    for (e.tokens.push({
                            type: "footnote_open",
                            id: t,
                            level: u++
                        }), a[t].tokens ? ((o = []).push({
                            type: "paragraph_open",
                            tight: !1,
                            level: u++
                        }), o.push({
                            type: "inline",
                            content: "",
                            level: u,
                            children: a[t].tokens
                        }), o.push({
                            type: "paragraph_close",
                            tight: !1,
                            level: --u
                        })) : a[t].label && (o = d[":" + a[t].label]), e.tokens = e.tokens.concat(o), n = "paragraph_close" === e.tokens[e.tokens.length - 1].type ? e.tokens.pop() : null, r = a[t].count > 0 ? a[t].count : 1, s = 0; s < r; s++) e.tokens.push({
                        type: "footnote_anchor",
                        id: t,
                        subId: s,
                        level: u
                    });
                    n && e.tokens.push(n), e.tokens.push({
                        type: "footnote_close",
                        level: --u
                    })
                }
                e.tokens.push({
                    type: "footnote_block_close",
                    level: --u
                })
            }
        }

        function M(e) {
            return e.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1")
        }

        function T(e) {
            var t, i, s, r, n, a, o, l, c, u, h, d, p = e.tokens;
            if (e.env.abbreviations)
                for (e.env.abbrRegExp || (d = "(^|[" + rt.split("").map(M).join("") + "])(" + Object.keys(e.env.abbreviations).map(function(e) {
                        return e.substr(1)
                    }).sort(function(e, t) {
                        return t.length - e.length
                    }).map(M).join("|") + ")($|[" + rt.split("").map(M).join("") + "])", e.env.abbrRegExp = new RegExp(d, "g")), u = e.env.abbrRegExp, i = 0, s = p.length; i < s; i++)
                    if ("inline" === p[i].type)
                        for (t = (r = p[i].children).length - 1; t >= 0; t--)
                            if ("text" === (n = r[t]).type) {
                                for (l = 0, a = n.content, u.lastIndex = 0, c = n.level, o = []; h = u.exec(a);) u.lastIndex > l && o.push({
                                    type: "text",
                                    content: a.slice(l, h.index + h[1].length),
                                    level: c
                                }), o.push({
                                    type: "abbr_open",
                                    title: e.env.abbreviations[":" + h[2]],
                                    level: c++
                                }), o.push({
                                    type: "text",
                                    content: h[2],
                                    level: c
                                }), o.push({
                                    type: "abbr_close",
                                    level: --c
                                }), l = u.lastIndex - h[3].length;
                                o.length && (l < a.length && o.push({
                                    type: "text",
                                    content: a.slice(l),
                                    level: c
                                }), p[i].children = r = [].concat(r.slice(0, t), o, r.slice(t + 1)))
                            }
        }

        function E(e) {
            return e.indexOf("(") < 0 ? e : e.replace(at, function(e, t) {
                return ot[t.toLowerCase()]
            })
        }

        function F(e) {
            var t, i, s, r, n;
            if (e.options.typographer)
                for (n = e.tokens.length - 1; n >= 0; n--)
                    if ("inline" === e.tokens[n].type)
                        for (t = (r = e.tokens[n].children).length - 1; t >= 0; t--) "text" === (i = r[t]).type && (s = E(s = i.content), nt.test(s) && (s = s.replace(/\+-/g, "\xb1").replace(/\.{2,}/g, "\u2026").replace(/([?!])\u2026/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---([^-]|$)/gm, "$1\u2014$2").replace(/(^|\s)--(\s|$)/gm, "$1\u2013$2").replace(/(^|[^-\s])--([^-\s]|$)/gm, "$1\u2013$2")), i.content = s)
        }

        function j(e, t) {
            return !(t < 0 || t >= e.length) && !ut.test(e[t])
        }

        function I(e, t, i) {
            return e.substr(0, t) + i + e.substr(t + 1)
        }

        function L(e) {
            var t, i, s, r, n, a, o, l, c, u, h, d, p, f, m, g, v;
            if (e.options.typographer)
                for (v = [], m = e.tokens.length - 1; m >= 0; m--)
                    if ("inline" === e.tokens[m].type)
                        for (g = e.tokens[m].children, v.length = 0, t = 0; t < g.length; t++)
                            if ("text" === (i = g[t]).type && !lt.test(i.text)) {
                                for (o = g[t].level, p = v.length - 1; p >= 0 && !(v[p].level <= o); p--);
                                v.length = p + 1, n = 0, a = (s = i.content).length;
                                e: for (; n < a && (ct.lastIndex = n, r = ct.exec(s));)
                                    if (l = !j(s, r.index - 1), n = r.index + 1, f = "'" === r[0], (c = !j(s, n)) || l) {
                                        if (h = !c, d = !l)
                                            for (p = v.length - 1; p >= 0 && (u = v[p], !(v[p].level < o)); p--)
                                                if (u.single === f && v[p].level === o) {
                                                    u = v[p], f ? (g[u.token].content = I(g[u.token].content, u.pos, e.options.quotes[2]), i.content = I(i.content, r.index, e.options.quotes[3])) : (g[u.token].content = I(g[u.token].content, u.pos, e.options.quotes[0]), i.content = I(i.content, r.index, e.options.quotes[1])), v.length = p;
                                                    continue e
                                                }
                                        h ? v.push({
                                            token: t,
                                            pos: r.index,
                                            single: f,
                                            level: o
                                        }) : d && f && (i.content = I(i.content, r.index, ht))
                                    } else f && (i.content = I(i.content, r.index, ht))
                            }
        }

        function O() {
            this.options = {}, this.ruler = new g;
            for (var e = 0; e < dt.length; e++) this.ruler.push(dt[e][0], dt[e][1])
        }

        function R(e, t, i, s, r) {
            var n, a, o, l, c, u, h;
            for (this.src = e, this.parser = t, this.options = i, this.env = s, this.tokens = r, this.bMarks = [], this.eMarks = [], this.tShift = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.parentType = "root", this.ddIndent = -1, this.level = 0, this.result = "", u = 0, h = !1, o = l = u = 0, c = (a = this.src).length; l < c; l++) {
                if (n = a.charCodeAt(l), !h) {
                    if (32 === n) {
                        u++;
                        continue
                    }
                    h = !0
                }
                10 !== n && l !== c - 1 || (10 !== n && l++, this.bMarks.push(o), this.eMarks.push(l), this.tShift.push(u), h = !1, u = 0, o = l + 1)
            }
            this.bMarks.push(a.length), this.eMarks.push(a.length), this.tShift.push(0), this.lineMax = this.bMarks.length - 1
        }

        function B(e, t, i) {
            var s, r;
            if (e.tShift[t] - e.blkIndent < 4) return !1;
            for (r = s = t + 1; s < i;)
                if (e.isEmpty(s)) s++;
                else {
                    if (!(e.tShift[s] - e.blkIndent >= 4)) break;
                    r = ++s
                }
            return e.line = s, e.tokens.push({
                type: "code",
                content: e.getLines(t, r, 4 + e.blkIndent, !0),
                block: !0,
                lines: [t, e.line],
                level: e.level
            }), !0
        }

        function N(e, t, i, s) {
            var r, n, a, o, l, c = !1,
                u = e.bMarks[t] + e.tShift[t],
                h = e.eMarks[t];
            if (u + 3 > h) return !1;
            if (126 !== (r = e.src.charCodeAt(u)) && 96 !== r) return !1;
            if (l = u, (n = (u = e.skipChars(u, r)) - l) < 3) return !1;
            if ((a = e.src.slice(u, h).trim()).indexOf("`") >= 0) return !1;
            if (s) return !0;
            for (o = t; !(++o >= i) && !((u = l = e.bMarks[o] + e.tShift[o]) < (h = e.eMarks[o]) && e.tShift[o] < e.blkIndent);)
                if (e.src.charCodeAt(u) === r && !(e.tShift[o] - e.blkIndent >= 4 || (u = e.skipChars(u, r)) - l < n || (u = e.skipSpaces(u)) < h)) {
                    c = !0;
                    break
                }
            return n = e.tShift[t], e.line = o + (c ? 1 : 0), e.tokens.push({
                type: "fence",
                params: a,
                content: e.getLines(t + 1, o, n, !0),
                lines: [t, e.line],
                level: e.level
            }), !0
        }

        function U(e, t, i, s) {
            var r, n, a, o, l, c, u, h, d, p, f, m = e.bMarks[t] + e.tShift[t],
                g = e.eMarks[t];
            if (m > g) return !1;
            if (62 !== e.src.charCodeAt(m++)) return !1;
            if (e.level >= e.options.maxNesting) return !1;
            if (s) return !0;
            for (32 === e.src.charCodeAt(m) && m++, l = e.blkIndent, e.blkIndent = 0, o = [e.bMarks[t]], e.bMarks[t] = m, n = (m = m < g ? e.skipSpaces(m) : m) >= g, a = [e.tShift[t]], e.tShift[t] = m - e.bMarks[t], h = e.parser.ruler.getRules("blockquote"), r = t + 1; r < i && !((m = e.bMarks[r] + e.tShift[r]) >= (g = e.eMarks[r])); r++)
                if (62 !== e.src.charCodeAt(m++)) {
                    if (n) break;
                    for (f = !1, d = 0, p = h.length; d < p; d++)
                        if (h[d](e, r, i, !0)) {
                            f = !0;
                            break
                        }
                    if (f) break;
                    o.push(e.bMarks[r]), a.push(e.tShift[r]), e.tShift[r] = -1337
                } else 32 === e.src.charCodeAt(m) && m++, o.push(e.bMarks[r]), e.bMarks[r] = m, n = (m = m < g ? e.skipSpaces(m) : m) >= g, a.push(e.tShift[r]), e.tShift[r] = m - e.bMarks[r];
            for (c = e.parentType, e.parentType = "blockquote", e.tokens.push({
                    type: "blockquote_open",
                    lines: u = [t, 0],
                    level: e.level++
                }), e.parser.tokenize(e, t, r), e.tokens.push({
                    type: "blockquote_close",
                    level: --e.level
                }), e.parentType = c, u[1] = e.line, d = 0; d < a.length; d++) e.bMarks[d + t] = o[d], e.tShift[d + t] = a[d];
            return e.blkIndent = l, !0
        }

        function V(e, t, i, s) {
            var r, n, a, o = e.bMarks[t],
                l = e.eMarks[t];
            if ((o += e.tShift[t]) > l) return !1;
            if (42 !== (r = e.src.charCodeAt(o++)) && 45 !== r && 95 !== r) return !1;
            for (n = 1; o < l;) {
                if ((a = e.src.charCodeAt(o++)) !== r && 32 !== a) return !1;
                a === r && n++
            }
            return !(n < 3) && (s || (e.line = t + 1, e.tokens.push({
                type: "hr",
                lines: [t, e.line],
                level: e.level
            })), !0)
        }

        function q(e, t) {
            var i, s, r;
            return (s = e.bMarks[t] + e.tShift[t]) >= (r = e.eMarks[t]) || 42 !== (i = e.src.charCodeAt(s++)) && 45 !== i && 43 !== i || s < r && 32 !== e.src.charCodeAt(s) ? -1 : s
        }

        function H(e, t) {
            var i, s = e.bMarks[t] + e.tShift[t],
                r = e.eMarks[t];
            if (s + 1 >= r) return -1;
            if ((i = e.src.charCodeAt(s++)) < 48 || i > 57) return -1;
            for (;;) {
                if (s >= r) return -1;
                if (!((i = e.src.charCodeAt(s++)) >= 48 && i <= 57)) {
                    if (41 === i || 46 === i) break;
                    return -1
                }
            }
            return s < r && 32 !== e.src.charCodeAt(s) ? -1 : s
        }

        function W(e, t) {
            var i, s, r = e.level + 2;
            for (i = t + 2, s = e.tokens.length - 2; i < s; i++) e.tokens[i].level === r && "paragraph_open" === e.tokens[i].type && (e.tokens[i + 2].tight = !0, e.tokens[i].tight = !0, i += 2)
        }

        function Y(e, t, i, s) {
            var r, n, a, o, l, c, u, h, d, p, f, m, g, v, y, b, _, w, k, $, x, C = !0;
            if ((h = H(e, t)) >= 0) m = !0;
            else {
                if (!((h = q(e, t)) >= 0)) return !1;
                m = !1
            }
            if (e.level >= e.options.maxNesting) return !1;
            if (f = e.src.charCodeAt(h - 1), s) return !0;
            for (v = e.tokens.length, m ? (u = e.bMarks[t] + e.tShift[t], p = Number(e.src.substr(u, h - u - 1)), e.tokens.push({
                    type: "ordered_list_open",
                    order: p,
                    lines: b = [t, 0],
                    level: e.level++
                })) : e.tokens.push({
                    type: "bullet_list_open",
                    lines: b = [t, 0],
                    level: e.level++
                }), r = t, y = !1, w = e.parser.ruler.getRules("list"); !(!(r < i) || ((d = (g = e.skipSpaces(h)) >= e.eMarks[r] ? 1 : g - h) > 4 && (d = 1), d < 1 && (d = 1), n = h - e.bMarks[r] + d, e.tokens.push({
                    type: "list_item_open",
                    lines: _ = [t, 0],
                    level: e.level++
                }), o = e.blkIndent, l = e.tight, a = e.tShift[t], c = e.parentType, e.tShift[t] = g - e.bMarks[t], e.blkIndent = n, e.tight = !0, e.parentType = "list", e.parser.tokenize(e, t, i, !0), e.tight && !y || (C = !1), y = e.line - t > 1 && e.isEmpty(e.line - 1), e.blkIndent = o, e.tShift[t] = a, e.tight = l, e.parentType = c, e.tokens.push({
                    type: "list_item_close",
                    level: --e.level
                }), r = t = e.line, _[1] = r, g = e.bMarks[t], r >= i) || e.isEmpty(r) || e.tShift[r] < e.blkIndent);) {
                for (x = !1, k = 0, $ = w.length; k < $; k++)
                    if (w[k](e, r, i, !0)) {
                        x = !0;
                        break
                    }
                if (x) break;
                if (m) {
                    if ((h = H(e, r)) < 0) break
                } else if ((h = q(e, r)) < 0) break;
                if (f !== e.src.charCodeAt(h - 1)) break
            }
            return e.tokens.push({
                type: m ? "ordered_list_close" : "bullet_list_close",
                level: --e.level
            }), b[1] = r, e.line = r, C && W(e, v), !0
        }

        function z(e, t, i, s) {
            var r, n, a, o, l, c = e.bMarks[t] + e.tShift[t],
                u = e.eMarks[t];
            if (c + 4 > u) return !1;
            if (91 !== e.src.charCodeAt(c)) return !1;
            if (94 !== e.src.charCodeAt(c + 1)) return !1;
            if (e.level >= e.options.maxNesting) return !1;
            for (o = c + 2; o < u; o++) {
                if (32 === e.src.charCodeAt(o)) return !1;
                if (93 === e.src.charCodeAt(o)) break
            }
            return o !== c + 2 && (!(o + 1 >= u || 58 !== e.src.charCodeAt(++o)) && (s || (o++, e.env.footnotes || (e.env.footnotes = {}), e.env.footnotes.refs || (e.env.footnotes.refs = {}), l = e.src.slice(c + 2, o - 2), e.env.footnotes.refs[":" + l] = -1, e.tokens.push({
                type: "footnote_reference_open",
                label: l,
                level: e.level++
            }), r = e.bMarks[t], n = e.tShift[t], a = e.parentType, e.tShift[t] = e.skipSpaces(o) - o, e.bMarks[t] = o, e.blkIndent += 4, e.parentType = "footnote", e.tShift[t] < e.blkIndent && (e.tShift[t] += e.blkIndent, e.bMarks[t] -= e.blkIndent), e.parser.tokenize(e, t, i, !0), e.parentType = a, e.blkIndent -= 4, e.tShift[t] = n, e.bMarks[t] = r, e.tokens.push({
                type: "footnote_reference_close",
                level: --e.level
            })), !0))
        }

        function G(e, t, i, s) {
            var r, n, a, o = e.bMarks[t] + e.tShift[t],
                l = e.eMarks[t];
            if (o >= l) return !1;
            if (35 !== (r = e.src.charCodeAt(o)) || o >= l) return !1;
            for (n = 1, r = e.src.charCodeAt(++o); 35 === r && o < l && n <= 6;) n++, r = e.src.charCodeAt(++o);
            return !(n > 6 || o < l && 32 !== r) && (s || (l = e.skipCharsBack(l, 32, o), (a = e.skipCharsBack(l, 35, o)) > o && 32 === e.src.charCodeAt(a - 1) && (l = a), e.line = t + 1, e.tokens.push({
                type: "heading_open",
                hLevel: n,
                lines: [t, e.line],
                level: e.level
            }), o < l && e.tokens.push({
                type: "inline",
                content: e.src.slice(o, l).trim(),
                level: e.level + 1,
                lines: [t, e.line],
                children: []
            }), e.tokens.push({
                type: "heading_close",
                hLevel: n,
                level: e.level
            })), !0)
        }

        function Z(e, t, i) {
            var s, r, n, a = t + 1;
            return !(a >= i) && (!(e.tShift[a] < e.blkIndent) && (!(e.tShift[a] - e.blkIndent > 3) && (!((r = e.bMarks[a] + e.tShift[a]) >= (n = e.eMarks[a])) && ((45 === (s = e.src.charCodeAt(r)) || 61 === s) && (r = e.skipChars(r, s), !((r = e.skipSpaces(r)) < n) && (r = e.bMarks[t] + e.tShift[t], e.line = a + 1, e.tokens.push({
                type: "heading_open",
                hLevel: 61 === s ? 1 : 2,
                lines: [t, e.line],
                level: e.level
            }), e.tokens.push({
                type: "inline",
                content: e.src.slice(r, e.eMarks[t]).trim(),
                level: e.level + 1,
                lines: [t, e.line - 1],
                children: []
            }), e.tokens.push({
                type: "heading_close",
                hLevel: 61 === s ? 1 : 2,
                level: e.level
            }), !0))))))
        }

        function Q(e) {
            var t = 32 | e;
            return t >= 97 && t <= 122
        }

        function K(e, t, i, s) {
            var r, n, a, o = e.bMarks[t],
                l = e.eMarks[t],
                c = e.tShift[t];
            if (o += c, !e.options.html) return !1;
            if (c > 3 || o + 2 >= l) return !1;
            if (60 !== e.src.charCodeAt(o)) return !1;
            if (33 === (r = e.src.charCodeAt(o + 1)) || 63 === r) {
                if (s) return !0
            } else {
                if (47 !== r && !Q(r)) return !1;
                if (47 === r) {
                    if (!(n = e.src.slice(o, l).match(mt))) return !1
                } else if (!(n = e.src.slice(o, l).match(ft))) return !1;
                if (!0 !== pt[n[1].toLowerCase()]) return !1;
                if (s) return !0
            }
            for (a = t + 1; a < e.lineMax && !e.isEmpty(a);) a++;
            return e.line = a, e.tokens.push({
                type: "htmlblock",
                level: e.level,
                lines: [t, e.line],
                content: e.getLines(t, a, 0, !0)
            }), !0
        }

        function J(e, t) {
            var i = e.bMarks[t] + e.blkIndent,
                s = e.eMarks[t];
            return e.src.substr(i, s - i)
        }

        function X(e, t, i, s) {
            var r, n, a, o, l, c, u, h, d, p, f;
            if (t + 2 > i) return !1;
            if (l = t + 1, e.tShift[l] < e.blkIndent) return !1;
            if ((a = e.bMarks[l] + e.tShift[l]) >= e.eMarks[l]) return !1;
            if (124 !== (r = e.src.charCodeAt(a)) && 45 !== r && 58 !== r) return !1;
            if (n = J(e, t + 1), !/^[-:| ]+$/.test(n)) return !1;
            if ((c = n.split("|")) <= 2) return !1;
            for (h = [], o = 0; o < c.length; o++) {
                if (!(d = c[o].trim())) {
                    if (0 === o || o === c.length - 1) continue;
                    return !1
                }
                if (!/^:?-+:?$/.test(d)) return !1;
                58 === d.charCodeAt(d.length - 1) ? h.push(58 === d.charCodeAt(0) ? "center" : "right") : 58 === d.charCodeAt(0) ? h.push("left") : h.push("")
            }
            if (-1 === (n = J(e, t).trim()).indexOf("|")) return !1;
            if (c = n.replace(/^\||\|$/g, "").split("|"), h.length !== c.length) return !1;
            if (s) return !0;
            for (e.tokens.push({
                    type: "table_open",
                    lines: p = [t, 0],
                    level: e.level++
                }), e.tokens.push({
                    type: "thead_open",
                    lines: [t, t + 1],
                    level: e.level++
                }), e.tokens.push({
                    type: "tr_open",
                    lines: [t, t + 1],
                    level: e.level++
                }), o = 0; o < c.length; o++) e.tokens.push({
                type: "th_open",
                align: h[o],
                lines: [t, t + 1],
                level: e.level++
            }), e.tokens.push({
                type: "inline",
                content: c[o].trim(),
                lines: [t, t + 1],
                level: e.level,
                children: []
            }), e.tokens.push({
                type: "th_close",
                level: --e.level
            });
            for (e.tokens.push({
                    type: "tr_close",
                    level: --e.level
                }), e.tokens.push({
                    type: "thead_close",
                    level: --e.level
                }), e.tokens.push({
                    type: "tbody_open",
                    lines: f = [t + 2, 0],
                    level: e.level++
                }), l = t + 2; l < i && !(e.tShift[l] < e.blkIndent) && -1 !== (n = J(e, l).trim()).indexOf("|"); l++) {
                for (c = n.replace(/^\||\|$/g, "").split("|"), e.tokens.push({
                        type: "tr_open",
                        level: e.level++
                    }), o = 0; o < c.length; o++) e.tokens.push({
                    type: "td_open",
                    align: h[o],
                    level: e.level++
                }), u = c[o].substring(124 === c[o].charCodeAt(0) ? 1 : 0, 124 === c[o].charCodeAt(c[o].length - 1) ? c[o].length - 1 : c[o].length).trim(), e.tokens.push({
                    type: "inline",
                    content: u,
                    level: e.level,
                    children: []
                }), e.tokens.push({
                    type: "td_close",
                    level: --e.level
                });
                e.tokens.push({
                    type: "tr_close",
                    level: --e.level
                })
            }
            return e.tokens.push({
                type: "tbody_close",
                level: --e.level
            }), e.tokens.push({
                type: "table_close",
                level: --e.level
            }), p[1] = f[1] = l, e.line = l, !0
        }

        function ee(e, t) {
            var i, s, r = e.bMarks[t] + e.tShift[t],
                n = e.eMarks[t];
            return r >= n || 126 !== (s = e.src.charCodeAt(r++)) && 58 !== s || r === (i = e.skipSpaces(r)) || i >= n ? -1 : i
        }

        function te(e, t) {
            var i, s, r = e.level + 2;
            for (i = t + 2, s = e.tokens.length - 2; i < s; i++) e.tokens[i].level === r && "paragraph_open" === e.tokens[i].type && (e.tokens[i + 2].tight = !0, e.tokens[i].tight = !0, i += 2)
        }

        function ie(e, t, i, s) {
            var r, n, a, o, l, c, u, h, d, p, f, m, g, v;
            if (s) return !(e.ddIndent < 0) && ee(e, t) >= 0;
            if (u = t + 1, e.isEmpty(u) && ++u > i) return !1;
            if (e.tShift[u] < e.blkIndent) return !1;
            if ((r = ee(e, u)) < 0) return !1;
            if (e.level >= e.options.maxNesting) return !1;
            c = e.tokens.length, e.tokens.push({
                type: "dl_open",
                lines: l = [t, 0],
                level: e.level++
            }), a = t, n = u;
            e: for (;;) {
                for (v = !0, g = !1, e.tokens.push({
                        type: "dt_open",
                        lines: [a, a],
                        level: e.level++
                    }), e.tokens.push({
                        type: "inline",
                        content: e.getLines(a, a + 1, e.blkIndent, !1).trim(),
                        level: e.level + 1,
                        lines: [a, a],
                        children: []
                    }), e.tokens.push({
                        type: "dt_close",
                        level: --e.level
                    });;) {
                    if (e.tokens.push({
                            type: "dd_open",
                            lines: o = [u, 0],
                            level: e.level++
                        }), m = e.tight, d = e.ddIndent, h = e.blkIndent, f = e.tShift[n], p = e.parentType, e.blkIndent = e.ddIndent = e.tShift[n] + 2, e.tShift[n] = r - e.bMarks[n], e.tight = !0, e.parentType = "deflist", e.parser.tokenize(e, n, i, !0), e.tight && !g || (v = !1), g = e.line - n > 1 && e.isEmpty(e.line - 1), e.tShift[n] = f, e.tight = m, e.parentType = p, e.blkIndent = h, e.ddIndent = d, e.tokens.push({
                            type: "dd_close",
                            level: --e.level
                        }), o[1] = u = e.line, u >= i) break e;
                    if (e.tShift[u] < e.blkIndent) break e;
                    if ((r = ee(e, u)) < 0) break;
                    n = u
                }
                if (u >= i) break;
                if (a = u, e.isEmpty(a)) break;
                if (e.tShift[a] < e.blkIndent) break;
                if ((n = a + 1) >= i) break;
                if (e.isEmpty(n) && n++, n >= i) break;
                if (e.tShift[n] < e.blkIndent) break;
                if ((r = ee(e, n)) < 0) break
            }
            return e.tokens.push({
                type: "dl_close",
                level: --e.level
            }), l[1] = u, e.line = u, v && te(e, c), !0
        }

        function se(e, t) {
            var i, s, r, n, a, o, l = t + 1;
            if (l < (i = e.lineMax) && !e.isEmpty(l))
                for (o = e.parser.ruler.getRules("paragraph"); l < i && !e.isEmpty(l); l++)
                    if (!(e.tShift[l] - e.blkIndent > 3)) {
                        for (r = !1, n = 0, a = o.length; n < a; n++)
                            if (o[n](e, l, i, !0)) {
                                r = !0;
                                break
                            }
                        if (r) break
                    }
            return s = e.getLines(t, l, e.blkIndent, !1).trim(), e.line = l, s.length && (e.tokens.push({
                type: "paragraph_open",
                tight: !1,
                lines: [t, e.line],
                level: e.level
            }), e.tokens.push({
                type: "inline",
                content: s,
                level: e.level + 1,
                lines: [t, e.line],
                children: []
            }), e.tokens.push({
                type: "paragraph_close",
                tight: !1,
                level: e.level
            })), !0
        }

        function re() {
            this.ruler = new g;
            for (var e = 0; e < gt.length; e++) this.ruler.push(gt[e][0], gt[e][1], {
                alt: (gt[e][2] || []).slice()
            })
        }

        function ne(e) {
            switch (e) {
                case 10:
                case 92:
                case 96:
                case 42:
                case 95:
                case 94:
                case 91:
                case 93:
                case 33:
                case 38:
                case 60:
                case 62:
                case 123:
                case 125:
                case 36:
                case 37:
                case 64:
                case 126:
                case 43:
                case 61:
                case 58:
                    return !0;
                default:
                    return !1
            }
        }

        function ae(e, t) {
            for (var i = e.pos; i < e.posMax && !ne(e.src.charCodeAt(i));) i++;
            return i !== e.pos && (t || (e.pending += e.src.slice(e.pos, i)), e.pos = i, !0)
        }

        function oe(e, t) {
            var i, s, r = e.pos;
            if (10 !== e.src.charCodeAt(r)) return !1;
            if (i = e.pending.length - 1, s = e.posMax, !t)
                if (i >= 0 && 32 === e.pending.charCodeAt(i))
                    if (i >= 1 && 32 === e.pending.charCodeAt(i - 1)) {
                        for (var n = i - 2; n >= 0; n--)
                            if (32 !== e.pending.charCodeAt(n)) {
                                e.pending = e.pending.substring(0, n + 1);
                                break
                            }
                        e.push({
                            type: "hardbreak",
                            level: e.level
                        })
                    } else e.pending = e.pending.slice(0, -1), e.push({
                        type: "softbreak",
                        level: e.level
                    });
            else e.push({
                type: "softbreak",
                level: e.level
            });
            for (r++; r < s && 32 === e.src.charCodeAt(r);) r++;
            return e.pos = r, !0
        }

        function le(e, t) {
            var i, s = e.pos,
                r = e.posMax;
            if (92 !== e.src.charCodeAt(s)) return !1;
            if (++s < r) {
                if ((i = e.src.charCodeAt(s)) < 256 && 0 !== _t[i]) return t || (e.pending += e.src[s]), e.pos += 2, !0;
                if (10 === i) {
                    for (t || e.push({
                            type: "hardbreak",
                            level: e.level
                        }), s++; s < r && 32 === e.src.charCodeAt(s);) s++;
                    return e.pos = s, !0
                }
            }
            return t || (e.pending += "\\"), e.pos++, !0
        }

        function ce(e, t) {
            var i, s, r, n, a, o = e.pos;
            if (96 !== e.src.charCodeAt(o)) return !1;
            for (i = o, o++, s = e.posMax; o < s && 96 === e.src.charCodeAt(o);) o++;
            for (r = e.src.slice(i, o), n = a = o; - 1 !== (n = e.src.indexOf("`", a));) {
                for (a = n + 1; a < s && 96 === e.src.charCodeAt(a);) a++;
                if (a - n === r.length) return t || e.push({
                    type: "code",
                    content: e.src.slice(o, n).replace(/[ \n]+/g, " ").trim(),
                    block: !1,
                    level: e.level
                }), e.pos = a, !0
            }
            return t || (e.pending += r), e.pos += r.length, !0
        }

        function ue(e, t) {
            var i, s, r, n, a, o = e.posMax,
                l = e.pos;
            if (126 !== e.src.charCodeAt(l)) return !1;
            if (t) return !1;
            if (l + 4 >= o) return !1;
            if (126 !== e.src.charCodeAt(l + 1)) return !1;
            if (e.level >= e.options.maxNesting) return !1;
            if (n = l > 0 ? e.src.charCodeAt(l - 1) : -1, a = e.src.charCodeAt(l + 2), 126 === n) return !1;
            if (126 === a) return !1;
            if (32 === a || 10 === a) return !1;
            for (s = l + 2; s < o && 126 === e.src.charCodeAt(s);) s++;
            if (s > l + 3) return e.pos += s - l, t || (e.pending += e.src.slice(l, s)), !0;
            for (e.pos = l + 2, r = 1; e.pos + 1 < o;) {
                if (126 === e.src.charCodeAt(e.pos) && 126 === e.src.charCodeAt(e.pos + 1) && (n = e.src.charCodeAt(e.pos - 1), 126 !== (a = e.pos + 2 < o ? e.src.charCodeAt(e.pos + 2) : -1) && 126 !== n && (32 !== n && 10 !== n ? r-- : 32 !== a && 10 !== a && r++, r <= 0))) {
                    i = !0;
                    break
                }
                e.parser.skipToken(e)
            }
            return i ? (e.posMax = e.pos, e.pos = l + 2, t || (e.push({
                type: "del_open",
                level: e.level++
            }), e.parser.tokenize(e), e.push({
                type: "del_close",
                level: --e.level
            })), e.pos = e.posMax + 2, e.posMax = o, !0) : (e.pos = l, !1)
        }

        function he(e, t) {
            var i, s, r, n, a, o = e.posMax,
                l = e.pos;
            if (43 !== e.src.charCodeAt(l)) return !1;
            if (t) return !1;
            if (l + 4 >= o) return !1;
            if (43 !== e.src.charCodeAt(l + 1)) return !1;
            if (e.level >= e.options.maxNesting) return !1;
            if (n = l > 0 ? e.src.charCodeAt(l - 1) : -1, a = e.src.charCodeAt(l + 2), 43 === n) return !1;
            if (43 === a) return !1;
            if (32 === a || 10 === a) return !1;
            for (s = l + 2; s < o && 43 === e.src.charCodeAt(s);) s++;
            if (s !== l + 2) return e.pos += s - l, t || (e.pending += e.src.slice(l, s)), !0;
            for (e.pos = l + 2, r = 1; e.pos + 1 < o;) {
                if (43 === e.src.charCodeAt(e.pos) && 43 === e.src.charCodeAt(e.pos + 1) && (n = e.src.charCodeAt(e.pos - 1), 43 !== (a = e.pos + 2 < o ? e.src.charCodeAt(e.pos + 2) : -1) && 43 !== n && (32 !== n && 10 !== n ? r-- : 32 !== a && 10 !== a && r++, r <= 0))) {
                    i = !0;
                    break
                }
                e.parser.skipToken(e)
            }
            return i ? (e.posMax = e.pos, e.pos = l + 2, t || (e.push({
                type: "ins_open",
                level: e.level++
            }), e.parser.tokenize(e), e.push({
                type: "ins_close",
                level: --e.level
            })), e.pos = e.posMax + 2, e.posMax = o, !0) : (e.pos = l, !1)
        }

        function de(e, t) {
            var i, s, r, n, a, o = e.posMax,
                l = e.pos;
            if (61 !== e.src.charCodeAt(l)) return !1;
            if (t) return !1;
            if (l + 4 >= o) return !1;
            if (61 !== e.src.charCodeAt(l + 1)) return !1;
            if (e.level >= e.options.maxNesting) return !1;
            if (n = l > 0 ? e.src.charCodeAt(l - 1) : -1, a = e.src.charCodeAt(l + 2), 61 === n) return !1;
            if (61 === a) return !1;
            if (32 === a || 10 === a) return !1;
            for (s = l + 2; s < o && 61 === e.src.charCodeAt(s);) s++;
            if (s !== l + 2) return e.pos += s - l, t || (e.pending += e.src.slice(l, s)), !0;
            for (e.pos = l + 2, r = 1; e.pos + 1 < o;) {
                if (61 === e.src.charCodeAt(e.pos) && 61 === e.src.charCodeAt(e.pos + 1) && (n = e.src.charCodeAt(e.pos - 1), 61 !== (a = e.pos + 2 < o ? e.src.charCodeAt(e.pos + 2) : -1) && 61 !== n && (32 !== n && 10 !== n ? r-- : 32 !== a && 10 !== a && r++, r <= 0))) {
                    i = !0;
                    break
                }
                e.parser.skipToken(e)
            }
            return i ? (e.posMax = e.pos, e.pos = l + 2, t || (e.push({
                type: "mark_open",
                level: e.level++
            }), e.parser.tokenize(e), e.push({
                type: "mark_close",
                level: --e.level
            })), e.pos = e.posMax + 2, e.posMax = o, !0) : (e.pos = l, !1)
        }

        function pe(e) {
            return e >= 48 && e <= 57 || e >= 65 && e <= 90 || e >= 97 && e <= 122
        }

        function fe(e, t) {
            var i, s, r, n = t,
                a = !0,
                o = !0,
                l = e.posMax,
                c = e.src.charCodeAt(t);
            for (i = t > 0 ? e.src.charCodeAt(t - 1) : -1; n < l && e.src.charCodeAt(n) === c;) n++;
            return n >= l && (a = !1), (r = n - t) >= 4 ? a = o = !1 : (32 !== (s = n < l ? e.src.charCodeAt(n) : -1) && 10 !== s || (a = !1), 32 !== i && 10 !== i || (o = !1), 95 === c && (pe(i) && (a = !1), pe(s) && (o = !1))), {
                can_open: a,
                can_close: o,
                delims: r
            }
        }

        function me(e, t) {
            var i, s, r, n, a, o, l, c = e.posMax,
                u = e.pos,
                h = e.src.charCodeAt(u);
            if (95 !== h && 42 !== h) return !1;
            if (t) return !1;
            if (i = (l = fe(e, u)).delims, !l.can_open) return e.pos += i, t || (e.pending += e.src.slice(u, e.pos)), !0;
            if (e.level >= e.options.maxNesting) return !1;
            for (e.pos = u + i, o = [i]; e.pos < c;)
                if (e.src.charCodeAt(e.pos) !== h) e.parser.skipToken(e);
                else {
                    if (s = (l = fe(e, e.pos)).delims, l.can_close) {
                        for (n = o.pop(), a = s; n !== a;) {
                            if (a < n) {
                                o.push(n - a);
                                break
                            }
                            if (a -= n, 0 === o.length) break;
                            e.pos += n, n = o.pop()
                        }
                        if (0 === o.length) {
                            i = n, r = !0;
                            break
                        }
                        e.pos += s;
                        continue
                    }
                    l.can_open && o.push(s), e.pos += s
                }
            return r ? (e.posMax = e.pos, e.pos = u + i, t || (2 !== i && 3 !== i || e.push({
                type: "strong_open",
                level: e.level++
            }), 1 !== i && 3 !== i || e.push({
                type: "em_open",
                level: e.level++
            }), e.parser.tokenize(e), 1 !== i && 3 !== i || e.push({
                type: "em_close",
                level: --e.level
            }), 2 !== i && 3 !== i || e.push({
                type: "strong_close",
                level: --e.level
            })), e.pos = e.posMax + i, e.posMax = c, !0) : (e.pos = u, !1)
        }

        function ge(e, t) {
            var i, s, r = e.posMax,
                n = e.pos;
            if (126 !== e.src.charCodeAt(n)) return !1;
            if (t) return !1;
            if (n + 2 >= r) return !1;
            if (e.level >= e.options.maxNesting) return !1;
            for (e.pos = n + 1; e.pos < r;) {
                if (126 === e.src.charCodeAt(e.pos)) {
                    i = !0;
                    break
                }
                e.parser.skipToken(e)
            }
            return i && n + 1 !== e.pos ? (s = e.src.slice(n + 1, e.pos)).match(/(^|[^\\])(\\\\)*\s/) ? (e.pos = n, !1) : (e.posMax = e.pos, e.pos = n + 1, t || e.push({
                type: "sub",
                level: e.level,
                content: s.replace(kt, "$1")
            }), e.pos = e.posMax + 1, e.posMax = r, !0) : (e.pos = n, !1)
        }

        function ve(e, t) {
            var i, s, r = e.posMax,
                n = e.pos;
            if (94 !== e.src.charCodeAt(n)) return !1;
            if (t) return !1;
            if (n + 2 >= r) return !1;
            if (e.level >= e.options.maxNesting) return !1;
            for (e.pos = n + 1; e.pos < r;) {
                if (94 === e.src.charCodeAt(e.pos)) {
                    i = !0;
                    break
                }
                e.parser.skipToken(e)
            }
            return i && n + 1 !== e.pos ? (s = e.src.slice(n + 1, e.pos)).match(/(^|[^\\])(\\\\)*\s/) ? (e.pos = n, !1) : (e.posMax = e.pos, e.pos = n + 1, t || e.push({
                type: "sup",
                level: e.level,
                content: s.replace($t, "$1")
            }), e.pos = e.posMax + 1, e.posMax = r, !0) : (e.pos = n, !1)
        }

        function ye(e, t) {
            var i, s, r, n, a, o, l, c, u = !1,
                h = e.pos,
                d = e.posMax,
                p = e.pos,
                f = e.src.charCodeAt(p);
            if (33 === f && (u = !0, f = e.src.charCodeAt(++p)), 91 !== f) return !1;
            if (e.level >= e.options.maxNesting) return !1;
            if (i = p + 1, (s = b(e, p)) < 0) return !1;
            if ((o = s + 1) < d && 40 === e.src.charCodeAt(o)) {
                for (o++; o < d && (32 === (c = e.src.charCodeAt(o)) || 10 === c); o++);
                if (o >= d) return !1;
                for (p = o, $(e, o) ? (n = e.linkContent, o = e.pos) : n = "", p = o; o < d && (32 === (c = e.src.charCodeAt(o)) || 10 === c); o++);
                if (o < d && p !== o && x(e, o))
                    for (a = e.linkContent, o = e.pos; o < d && (32 === (c = e.src.charCodeAt(o)) || 10 === c); o++);
                else a = "";
                if (o >= d || 41 !== e.src.charCodeAt(o)) return e.pos = h, !1;
                o++
            } else {
                if (e.linkLevel > 0) return !1;
                for (; o < d && (32 === (c = e.src.charCodeAt(o)) || 10 === c); o++);
                if (o < d && 91 === e.src.charCodeAt(o) && (p = o + 1, (o = b(e, o)) >= 0 ? r = e.src.slice(p, o++) : o = p - 1), r || (void 0 === r && (o = s + 1), r = e.src.slice(i, s)), !(l = e.env.references[C(r)])) return e.pos = h, !1;
                n = l.href, a = l.title
            }
            return t || (e.pos = i, e.posMax = s, u ? e.push({
                type: "image",
                src: n,
                title: a,
                alt: e.src.substr(i, s - i),
                level: e.level
            }) : (e.push({
                type: "link_open",
                href: n,
                title: a,
                level: e.level++
            }), e.linkLevel++, e.parser.tokenize(e), e.linkLevel--, e.push({
                type: "link_close",
                level: --e.level
            }))), e.pos = o, e.posMax = d, !0
        }

        function be(e, t) {
            var i, s, r, n, a = e.posMax,
                o = e.pos;
            return !(o + 2 >= a) && (94 === e.src.charCodeAt(o) && (91 === e.src.charCodeAt(o + 1) && (!(e.level >= e.options.maxNesting) && (i = o + 2, !((s = b(e, o + 1)) < 0) && (t || (e.env.footnotes || (e.env.footnotes = {}), e.env.footnotes.list || (e.env.footnotes.list = []), r = e.env.footnotes.list.length, e.pos = i, e.posMax = s, e.push({
                type: "footnote_ref",
                id: r,
                level: e.level
            }), e.linkLevel++, n = e.tokens.length, e.parser.tokenize(e), e.env.footnotes.list[r] = {
                tokens: e.tokens.splice(n)
            }, e.linkLevel--), e.pos = s + 1, e.posMax = a, !0)))))
        }

        function _e(e, t) {
            var i, s, r, n, a = e.posMax,
                o = e.pos;
            if (o + 3 > a) return !1;
            if (!e.env.footnotes || !e.env.footnotes.refs) return !1;
            if (91 !== e.src.charCodeAt(o)) return !1;
            if (94 !== e.src.charCodeAt(o + 1)) return !1;
            if (e.level >= e.options.maxNesting) return !1;
            for (s = o + 2; s < a; s++) {
                if (32 === e.src.charCodeAt(s)) return !1;
                if (10 === e.src.charCodeAt(s)) return !1;
                if (93 === e.src.charCodeAt(s)) break
            }
            return s !== o + 2 && (!(s >= a) && (s++, i = e.src.slice(o + 2, s - 1), void 0 !== e.env.footnotes.refs[":" + i] && (t || (e.env.footnotes.list || (e.env.footnotes.list = []),
                e.env.footnotes.refs[":" + i] < 0 ? (r = e.env.footnotes.list.length, e.env.footnotes.list[r] = {
                    label: i,
                    count: 0
                }, e.env.footnotes.refs[":" + i] = r) : r = e.env.footnotes.refs[":" + i], n = e.env.footnotes.list[r].count, e.env.footnotes.list[r].count++, e.push({
                    type: "footnote_ref",
                    id: r,
                    subId: n,
                    level: e.level
                })), e.pos = s, e.posMax = a, !0)))
        }

        function we(e, t) {
            var i, s, r, n, a, o = e.pos;
            return 60 === e.src.charCodeAt(o) && (!((i = e.src.slice(o)).indexOf(">") < 0) && ((s = i.match(St)) ? !(xt.indexOf(s[1].toLowerCase()) < 0) && (a = k(n = s[0].slice(1, -1)), !!e.parser.validateLink(n) && (t || (e.push({
                type: "link_open",
                href: a,
                level: e.level
            }), e.push({
                type: "text",
                content: n,
                level: e.level + 1
            }), e.push({
                type: "link_close",
                level: e.level
            })), e.pos += s[0].length, !0)) : !!(r = i.match(Ct)) && (a = k("mailto:" + (n = r[0].slice(1, -1))), !!e.parser.validateLink(a) && (t || (e.push({
                type: "link_open",
                href: a,
                level: e.level
            }), e.push({
                type: "text",
                content: n,
                level: e.level + 1
            }), e.push({
                type: "link_close",
                level: e.level
            })), e.pos += r[0].length, !0))))
        }

        function ke(e, t) {
            return e = e.source, t = t || "",
                function i(s, r) {
                    return s ? (r = r.source || r, e = e.replace(s, r), i) : new RegExp(e, t)
                }
        }

        function $e(e) {
            var t = 32 | e;
            return t >= 97 && t <= 122
        }

        function xe(e, t) {
            var i, s, r, n = e.pos;
            return !!e.options.html && (r = e.posMax, !(60 !== e.src.charCodeAt(n) || n + 2 >= r) && (!(33 !== (i = e.src.charCodeAt(n + 1)) && 63 !== i && 47 !== i && !$e(i)) && (!!(s = e.src.slice(n).match(Bt)) && (t || e.push({
                type: "htmltag",
                content: e.src.slice(n, n + s[0].length),
                level: e.level
            }), e.pos += s[0].length, !0))))
        }

        function Ce(e, t) {
            var s, r, n = e.pos,
                a = e.posMax;
            if (38 !== e.src.charCodeAt(n)) return !1;
            if (n + 1 < a)
                if (35 === e.src.charCodeAt(n + 1)) {
                    if (r = e.src.slice(n).match(Nt)) return t || (s = "x" === r[1][0].toLowerCase() ? parseInt(r[1].slice(1), 16) : parseInt(r[1], 10), e.pending += l(s) ? c(s) : c(65533)), e.pos += r[0].length, !0
                } else if (r = e.src.slice(n).match(Ut)) {
                var o = i(r[1]);
                if (r[1] !== o) return t || (e.pending += o), e.pos += r[0].length, !0
            }
            return t || (e.pending += "&"), e.pos++, !0
        }

        function Se() {
            this.ruler = new g;
            for (var e = 0; e < Vt.length; e++) this.ruler.push(Vt[e][0], Vt[e][1]);
            this.validateLink = Ae
        }

        function Ae(e) {
            var t = ["vbscript", "javascript", "file", "data"],
                i = e.trim().toLowerCase();
            return -1 === (i = h(i)).indexOf(":") || -1 === t.indexOf(i.split(":")[0])
        }

        function De(e, t, i) {
            this.src = t, this.env = i, this.options = e.options, this.tokens = [], this.inlineMode = !1, this.inline = e.inline, this.block = e.block, this.renderer = e.renderer, this.typographer = e.typographer
        }

        function Pe(e, t) {
            "string" != typeof e && (t = e, e = "default"), t && null != t.linkify && console.warn("linkify option is removed. Use linkify plugin instead:\n\nimport Remarkable from 'remarkable';\nimport linkify from 'remarkable/linkify';\nnew Remarkable().use(linkify)\n"), this.inline = new Se, this.block = new re, this.core = new O, this.renderer = new m, this.ruler = new g, this.options = {}, this.configure(qt[e]), this.set(t || {})
        }

        function Me(e, t) {
            for (var i in t) t.hasOwnProperty(i) && void 0 === e[i] && (e[i] = t[i]);
            return e
        }

        function Te(e, t, i) {
            var s;
            return e.length > t && (null == i ? (i = "&hellip;", s = 3) : s = i.length, e = e.substring(0, t - s) + i), e
        }

        function Ee(e, t) {
            if (Array.prototype.indexOf) return e.indexOf(t);
            for (var i = 0, s = e.length; i < s; i++)
                if (e[i] === t) return i;
            return -1
        }

        function Fe(e, t) {
            for (var i = e.length - 1; i >= 0; i--) !0 === t(e[i]) && e.splice(i, 1)
        }

        function je(e, t) {
            if (!t.global) throw new Error("`splitRegex` must have the 'g' flag set");
            for (var i, s = [], r = 0; i = t.exec(e);) s.push(e.substring(r, i.index)), s.push(i[0]), r = i.index + i[0].length;
            return s.push(e.substring(r)), s
        }

        function Ie(e) {
            throw new Error("Unhandled case for value: '" + e + "'")
        }

        function Le(e, t, i) {
            var s, r;
            null == i ? (i = "&hellip;", r = 3, s = 8) : (r = i.length, s = i.length);
            var n = function(e) {
                    var t = {},
                        i = e,
                        s = i.match(/^([a-z]+):\/\//i);
                    return s && (t.scheme = s[1], i = i.substr(s[0].length)), (s = i.match(/^(.*?)(?=(\?|#|\/|$))/i)) && (t.host = s[1], i = i.substr(s[0].length)), (s = i.match(/^\/(.*?)(?=(\?|#|$))/i)) && (t.path = s[1], i = i.substr(s[0].length)), (s = i.match(/^\?(.*?)(?=(#|$))/i)) && (t.query = s[1], i = i.substr(s[0].length)), (s = i.match(/^#(.*?)$/i)) && (t.fragment = s[1]), t
                },
                a = function(e) {
                    var t = "";
                    return e.scheme && e.host && (t += e.scheme + "://"), e.host && (t += e.host), e.path && (t += "/" + e.path), e.query && (t += "?" + e.query), e.fragment && (t += "#" + e.fragment), t
                },
                o = function(e, t) {
                    var s = t / 2,
                        r = Math.ceil(s),
                        n = -1 * Math.floor(s),
                        a = "";
                    return n < 0 && (a = e.substr(n)), e.substr(0, r) + i + a
                };
            if (e.length <= t) return e;
            var l = t - r,
                c = n(e);
            if (c.query) {
                var u = c.query.match(/^(.*?)(?=(\?|\#))(.*?)$/i);
                u && (c.query = c.query.substr(0, u[1].length), e = a(c))
            }
            if (e.length <= t) return e;
            if (c.host && (c.host = c.host.replace(/^www\./, ""), e = a(c)), e.length <= t) return e;
            var h = "";
            if (c.host && (h += c.host), h.length >= l) return c.host.length == t ? (c.host.substr(0, t - r) + i).substr(0, l + s) : o(h, l).substr(0, l + s);
            var d = "";
            if (c.path && (d += "/" + c.path), c.query && (d += "?" + c.query), d) {
                if ((h + d).length >= l) return (h + d).length == t ? (h + d).substr(0, t) : (h + o(d, l - h.length)).substr(0, l + s);
                h += d
            }
            if (c.fragment) {
                var p = "#" + c.fragment;
                if ((h + p).length >= l) return (h + p).length == t ? (h + p).substr(0, t) : (h + o(p, l - h.length)).substr(0, l + s);
                h += p
            }
            if (c.scheme && c.host) {
                var f = c.scheme + "://";
                if ((h + f).length < l) return (f + h).substr(0, t)
            }
            if (h.length <= t) return h;
            var m = "";
            return l > 0 && (m = h.substr(-1 * Math.floor(l / 2))), (h.substr(0, Math.ceil(l / 2)) + i + m).substr(0, l + s)
        }

        function Oe(e, t, i) {
            if (e.length <= t) return e;
            var s, r;
            null == i ? (i = "&hellip;", s = 8, r = 3) : (s = i.length, r = i.length);
            var n = t - r,
                a = "";
            return n > 0 && (a = e.substr(-1 * Math.floor(n / 2))), (e.substr(0, Math.ceil(n / 2)) + i + a).substr(0, n + s)
        }

        function Re(e, t, i) {
            return Te(e, t, i)
        }

        function Be(e, t) {
            function i() {
                this.constructor = e
            }
            zt(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
        }

        function Ne(e, t) {
            function i(e) {
                "<" === e && x()
            }

            function s(e) {
                "!" === e ? O = 13 : "/" === e ? (O = 2, B = new Si(Gt({}, B, {
                    isClosing: !0
                }))) : "<" === e ? x() : ti.test(e) ? (O = 3, B = new Si(Gt({}, B, {
                    isOpening: !0
                }))) : (O = 0, B = j)
            }

            function r(e) {
                si.test(e) ? (B = new Si(Gt({}, B, {
                    name: A()
                })), O = 4) : "<" === e ? x() : "/" === e ? (B = new Si(Gt({}, B, {
                    name: A()
                })), O = 12) : ">" === e ? (B = new Si(Gt({}, B, {
                    name: A()
                })), C()) : ti.test(e) || ii.test(e) || ":" === e || $()
            }

            function n(e) {
                ">" === e ? $() : ti.test(e) ? O = 3 : $()
            }

            function a(e) {
                si.test(e) || ("/" === e ? O = 12 : ">" === e ? C() : "<" === e ? x() : "=" === e || ri.test(e) || ni.test(e) ? $() : O = 5)
            }

            function o(e) {
                si.test(e) ? O = 6 : "/" === e ? O = 12 : "=" === e ? O = 7 : ">" === e ? C() : "<" === e ? x() : ri.test(e) && $()
            }

            function l(e) {
                si.test(e) || ("/" === e ? O = 12 : "=" === e ? O = 7 : ">" === e ? C() : "<" === e ? x() : ri.test(e) ? $() : O = 5)
            }

            function c(e) {
                si.test(e) || ('"' === e ? O = 8 : "'" === e ? O = 9 : /[>=`]/.test(e) ? $() : "<" === e ? x() : O = 10)
            }

            function u(e) {
                '"' === e && (O = 11)
            }

            function h(e) {
                "'" === e && (O = 11)
            }

            function d(e) {
                si.test(e) ? O = 4 : ">" === e ? C() : "<" === e && x()
            }

            function p(e) {
                si.test(e) ? O = 4 : "/" === e ? O = 12 : ">" === e ? C() : "<" === e ? x() : (O = 4, D())
            }

            function f(e) {
                ">" === e ? (B = new Si(Gt({}, B, {
                    isClosing: !0
                })), C()) : O = 4
            }

            function m() {
                "--" === e.substr(I, 2) ? (I += 2, B = new Si(Gt({}, B, {
                    type: "comment"
                })), O = 14) : "DOCTYPE" === e.substr(I, 7).toUpperCase() ? (I += 7, B = new Si(Gt({}, B, {
                    type: "doctype"
                })), O = 20) : $()
            }

            function g(e) {
                "-" === e ? O = 15 : ">" === e ? $() : O = 16
            }

            function v(e) {
                "-" === e ? O = 18 : ">" === e ? $() : O = 16
            }

            function y(e) {
                "-" === e && (O = 17)
            }

            function b(e) {
                O = "-" === e ? 18 : 16
            }

            function _(e) {
                ">" === e ? C() : "!" === e ? O = 19 : "-" === e || (O = 16)
            }

            function w(e) {
                "-" === e ? O = 17 : ">" === e ? C() : O = 16
            }

            function k(e) {
                ">" === e ? C() : "<" === e && x()
            }

            function $() {
                O = 0, B = j
            }

            function x() {
                O = 1, B = new Si({
                    idx: I
                })
            }

            function C() {
                var t = e.slice(R, B.idx);
                t && T(t, R), "comment" === B.type ? E(B.idx) : "doctype" === B.type ? F(B.idx) : (B.isOpening && P(B.name, B.idx), B.isClosing && M(B.name, B.idx)), $(), R = I + 1
            }

            function S() {
                var t = e.slice(R, I);
                T(t, R), R = I + 1
            }

            function A() {
                var t = B.idx + (B.isClosing ? 2 : 1);
                return e.slice(t, I).toLowerCase()
            }

            function D() {
                I--
            }
            for (var P = t.onOpenTag, M = t.onCloseTag, T = t.onText, E = t.onComment, F = t.onDoctype, j = new Si, I = 0, L = e.length, O = 0, R = 0, B = j; I < L;) {
                var N = e.charAt(I);
                switch (O) {
                    case 0:
                        i(N);
                        break;
                    case 1:
                        s(N);
                        break;
                    case 2:
                        n(N);
                        break;
                    case 3:
                        r(N);
                        break;
                    case 4:
                        a(N);
                        break;
                    case 5:
                        o(N);
                        break;
                    case 6:
                        l(N);
                        break;
                    case 7:
                        c(N);
                        break;
                    case 8:
                        u(N);
                        break;
                    case 9:
                        h(N);
                        break;
                    case 10:
                        d(N);
                        break;
                    case 11:
                        p(N);
                        break;
                    case 12:
                        f(N);
                        break;
                    case 13:
                        m();
                        break;
                    case 14:
                        g(N);
                        break;
                    case 15:
                        v(N);
                        break;
                    case 16:
                        y(N);
                        break;
                    case 17:
                        b(N);
                        break;
                    case 18:
                        _(N);
                        break;
                    case 19:
                        w(N);
                        break;
                    case 20:
                        k(N);
                        break;
                    default:
                        Ie(O)
                }
                I++
            }
            R < I && S()
        }

        function Ue(e) {
            return /^<a[>\s]/i.test(e)
        }

        function Ve(e) {
            return /^<\/a\s*>/i.test(e)
        }

        function qe() {
            var e = [],
                t = new Ai({
                    stripPrefix: !1,
                    url: !0,
                    email: !0,
                    replaceFn: function(t) {
                        switch (t.getType()) {
                            case "url":
                                e.push({
                                    text: t.matchedText,
                                    url: t.getUrl()
                                });
                                break;
                            case "email":
                                e.push({
                                    text: t.matchedText,
                                    url: "mailto:" + t.getEmail().replace(/^mailto:/i, "")
                                })
                        }
                        return !1
                    }
                });
            return {
                links: e,
                autolinker: t
            }
        }

        function He(e) {
            var t, i, s, r, n, a, o, l, c, u, h, d, p, f = e.tokens,
                m = null;
            for (i = 0, s = f.length; i < s; i++)
                if ("inline" === f[i].type)
                    for (h = 0, t = (r = f[i].children).length - 1; t >= 0; t--)
                        if ("link_close" !== (n = r[t]).type) {
                            if ("htmltag" === n.type && (Ue(n.content) && h > 0 && h--, Ve(n.content) && h++), !(h > 0) && "text" === n.type && Di.test(n.content)) {
                                if (m || (d = (m = qe()).links, p = m.autolinker), a = n.content, d.length = 0, p.link(a), !d.length) continue;
                                for (o = [], u = n.level, l = 0; l < d.length; l++) e.inline.validateLink(d[l].url) && ((c = a.indexOf(d[l].text)) && o.push({
                                    type: "text",
                                    content: a.slice(0, c),
                                    level: u
                                }), o.push({
                                    type: "link_open",
                                    href: d[l].url,
                                    title: "",
                                    level: u++
                                }), o.push({
                                    type: "text",
                                    content: d[l].text,
                                    level: u
                                }), o.push({
                                    type: "link_close",
                                    level: --u
                                }), a = a.slice(c + d[l].text.length));
                                a.length && o.push({
                                    type: "text",
                                    content: a,
                                    level: u
                                }), f[i].children = r = [].concat(r.slice(0, t), o, r.slice(t + 1))
                            }
                        } else
                            for (t--; r[t].level !== n.level && "link_open" !== r[t].type;) t--
        }

        function We(e) {
            e.core.ruler.push("linkify", He)
        }
        var Ye = {
                Aacute: "\xc1",
                aacute: "\xe1",
                Abreve: "\u0102",
                abreve: "\u0103",
                ac: "\u223e",
                acd: "\u223f",
                acE: "\u223e\u0333",
                Acirc: "\xc2",
                acirc: "\xe2",
                acute: "\xb4",
                Acy: "\u0410",
                acy: "\u0430",
                AElig: "\xc6",
                aelig: "\xe6",
                af: "\u2061",
                Afr: "\ud835\udd04",
                afr: "\ud835\udd1e",
                Agrave: "\xc0",
                agrave: "\xe0",
                alefsym: "\u2135",
                aleph: "\u2135",
                Alpha: "\u0391",
                alpha: "\u03b1",
                Amacr: "\u0100",
                amacr: "\u0101",
                amalg: "\u2a3f",
                AMP: "&",
                amp: "&",
                And: "\u2a53",
                and: "\u2227",
                andand: "\u2a55",
                andd: "\u2a5c",
                andslope: "\u2a58",
                andv: "\u2a5a",
                ang: "\u2220",
                ange: "\u29a4",
                angle: "\u2220",
                angmsd: "\u2221",
                angmsdaa: "\u29a8",
                angmsdab: "\u29a9",
                angmsdac: "\u29aa",
                angmsdad: "\u29ab",
                angmsdae: "\u29ac",
                angmsdaf: "\u29ad",
                angmsdag: "\u29ae",
                angmsdah: "\u29af",
                angrt: "\u221f",
                angrtvb: "\u22be",
                angrtvbd: "\u299d",
                angsph: "\u2222",
                angst: "\xc5",
                angzarr: "\u237c",
                Aogon: "\u0104",
                aogon: "\u0105",
                Aopf: "\ud835\udd38",
                aopf: "\ud835\udd52",
                ap: "\u2248",
                apacir: "\u2a6f",
                apE: "\u2a70",
                ape: "\u224a",
                apid: "\u224b",
                apos: "'",
                ApplyFunction: "\u2061",
                approx: "\u2248",
                approxeq: "\u224a",
                Aring: "\xc5",
                aring: "\xe5",
                Ascr: "\ud835\udc9c",
                ascr: "\ud835\udcb6",
                Assign: "\u2254",
                ast: "*",
                asymp: "\u2248",
                asympeq: "\u224d",
                Atilde: "\xc3",
                atilde: "\xe3",
                Auml: "\xc4",
                auml: "\xe4",
                awconint: "\u2233",
                awint: "\u2a11",
                backcong: "\u224c",
                backepsilon: "\u03f6",
                backprime: "\u2035",
                backsim: "\u223d",
                backsimeq: "\u22cd",
                Backslash: "\u2216",
                Barv: "\u2ae7",
                barvee: "\u22bd",
                Barwed: "\u2306",
                barwed: "\u2305",
                barwedge: "\u2305",
                bbrk: "\u23b5",
                bbrktbrk: "\u23b6",
                bcong: "\u224c",
                Bcy: "\u0411",
                bcy: "\u0431",
                bdquo: "\u201e",
                becaus: "\u2235",
                Because: "\u2235",
                because: "\u2235",
                bemptyv: "\u29b0",
                bepsi: "\u03f6",
                bernou: "\u212c",
                Bernoullis: "\u212c",
                Beta: "\u0392",
                beta: "\u03b2",
                beth: "\u2136",
                between: "\u226c",
                Bfr: "\ud835\udd05",
                bfr: "\ud835\udd1f",
                bigcap: "\u22c2",
                bigcirc: "\u25ef",
                bigcup: "\u22c3",
                bigodot: "\u2a00",
                bigoplus: "\u2a01",
                bigotimes: "\u2a02",
                bigsqcup: "\u2a06",
                bigstar: "\u2605",
                bigtriangledown: "\u25bd",
                bigtriangleup: "\u25b3",
                biguplus: "\u2a04",
                bigvee: "\u22c1",
                bigwedge: "\u22c0",
                bkarow: "\u290d",
                blacklozenge: "\u29eb",
                blacksquare: "\u25aa",
                blacktriangle: "\u25b4",
                blacktriangledown: "\u25be",
                blacktriangleleft: "\u25c2",
                blacktriangleright: "\u25b8",
                blank: "\u2423",
                blk12: "\u2592",
                blk14: "\u2591",
                blk34: "\u2593",
                block: "\u2588",
                bne: "=\u20e5",
                bnequiv: "\u2261\u20e5",
                bNot: "\u2aed",
                bnot: "\u2310",
                Bopf: "\ud835\udd39",
                bopf: "\ud835\udd53",
                bot: "\u22a5",
                bottom: "\u22a5",
                bowtie: "\u22c8",
                boxbox: "\u29c9",
                boxDL: "\u2557",
                boxDl: "\u2556",
                boxdL: "\u2555",
                boxdl: "\u2510",
                boxDR: "\u2554",
                boxDr: "\u2553",
                boxdR: "\u2552",
                boxdr: "\u250c",
                boxH: "\u2550",
                boxh: "\u2500",
                boxHD: "\u2566",
                boxHd: "\u2564",
                boxhD: "\u2565",
                boxhd: "\u252c",
                boxHU: "\u2569",
                boxHu: "\u2567",
                boxhU: "\u2568",
                boxhu: "\u2534",
                boxminus: "\u229f",
                boxplus: "\u229e",
                boxtimes: "\u22a0",
                boxUL: "\u255d",
                boxUl: "\u255c",
                boxuL: "\u255b",
                boxul: "\u2518",
                boxUR: "\u255a",
                boxUr: "\u2559",
                boxuR: "\u2558",
                boxur: "\u2514",
                boxV: "\u2551",
                boxv: "\u2502",
                boxVH: "\u256c",
                boxVh: "\u256b",
                boxvH: "\u256a",
                boxvh: "\u253c",
                boxVL: "\u2563",
                boxVl: "\u2562",
                boxvL: "\u2561",
                boxvl: "\u2524",
                boxVR: "\u2560",
                boxVr: "\u255f",
                boxvR: "\u255e",
                boxvr: "\u251c",
                bprime: "\u2035",
                Breve: "\u02d8",
                breve: "\u02d8",
                brvbar: "\xa6",
                Bscr: "\u212c",
                bscr: "\ud835\udcb7",
                bsemi: "\u204f",
                bsim: "\u223d",
                bsime: "\u22cd",
                bsol: "\\",
                bsolb: "\u29c5",
                bsolhsub: "\u27c8",
                bull: "\u2022",
                bullet: "\u2022",
                bump: "\u224e",
                bumpE: "\u2aae",
                bumpe: "\u224f",
                Bumpeq: "\u224e",
                bumpeq: "\u224f",
                Cacute: "\u0106",
                cacute: "\u0107",
                Cap: "\u22d2",
                cap: "\u2229",
                capand: "\u2a44",
                capbrcup: "\u2a49",
                capcap: "\u2a4b",
                capcup: "\u2a47",
                capdot: "\u2a40",
                CapitalDifferentialD: "\u2145",
                caps: "\u2229\ufe00",
                caret: "\u2041",
                caron: "\u02c7",
                Cayleys: "\u212d",
                ccaps: "\u2a4d",
                Ccaron: "\u010c",
                ccaron: "\u010d",
                Ccedil: "\xc7",
                ccedil: "\xe7",
                Ccirc: "\u0108",
                ccirc: "\u0109",
                Cconint: "\u2230",
                ccups: "\u2a4c",
                ccupssm: "\u2a50",
                Cdot: "\u010a",
                cdot: "\u010b",
                cedil: "\xb8",
                Cedilla: "\xb8",
                cemptyv: "\u29b2",
                cent: "\xa2",
                CenterDot: "\xb7",
                centerdot: "\xb7",
                Cfr: "\u212d",
                cfr: "\ud835\udd20",
                CHcy: "\u0427",
                chcy: "\u0447",
                check: "\u2713",
                checkmark: "\u2713",
                Chi: "\u03a7",
                chi: "\u03c7",
                cir: "\u25cb",
                circ: "\u02c6",
                circeq: "\u2257",
                circlearrowleft: "\u21ba",
                circlearrowright: "\u21bb",
                circledast: "\u229b",
                circledcirc: "\u229a",
                circleddash: "\u229d",
                CircleDot: "\u2299",
                circledR: "\xae",
                circledS: "\u24c8",
                CircleMinus: "\u2296",
                CirclePlus: "\u2295",
                CircleTimes: "\u2297",
                cirE: "\u29c3",
                cire: "\u2257",
                cirfnint: "\u2a10",
                cirmid: "\u2aef",
                cirscir: "\u29c2",
                ClockwiseContourIntegral: "\u2232",
                CloseCurlyDoubleQuote: "\u201d",
                CloseCurlyQuote: "\u2019",
                clubs: "\u2663",
                clubsuit: "\u2663",
                Colon: "\u2237",
                colon: ":",
                Colone: "\u2a74",
                colone: "\u2254",
                coloneq: "\u2254",
                comma: ",",
                commat: "@",
                comp: "\u2201",
                compfn: "\u2218",
                complement: "\u2201",
                complexes: "\u2102",
                cong: "\u2245",
                congdot: "\u2a6d",
                Congruent: "\u2261",
                Conint: "\u222f",
                conint: "\u222e",
                ContourIntegral: "\u222e",
                Copf: "\u2102",
                copf: "\ud835\udd54",
                coprod: "\u2210",
                Coproduct: "\u2210",
                COPY: "\xa9",
                copy: "\xa9",
                copysr: "\u2117",
                CounterClockwiseContourIntegral: "\u2233",
                crarr: "\u21b5",
                Cross: "\u2a2f",
                cross: "\u2717",
                Cscr: "\ud835\udc9e",
                cscr: "\ud835\udcb8",
                csub: "\u2acf",
                csube: "\u2ad1",
                csup: "\u2ad0",
                csupe: "\u2ad2",
                ctdot: "\u22ef",
                cudarrl: "\u2938",
                cudarrr: "\u2935",
                cuepr: "\u22de",
                cuesc: "\u22df",
                cularr: "\u21b6",
                cularrp: "\u293d",
                Cup: "\u22d3",
                cup: "\u222a",
                cupbrcap: "\u2a48",
                CupCap: "\u224d",
                cupcap: "\u2a46",
                cupcup: "\u2a4a",
                cupdot: "\u228d",
                cupor: "\u2a45",
                cups: "\u222a\ufe00",
                curarr: "\u21b7",
                curarrm: "\u293c",
                curlyeqprec: "\u22de",
                curlyeqsucc: "\u22df",
                curlyvee: "\u22ce",
                curlywedge: "\u22cf",
                curren: "\xa4",
                curvearrowleft: "\u21b6",
                curvearrowright: "\u21b7",
                cuvee: "\u22ce",
                cuwed: "\u22cf",
                cwconint: "\u2232",
                cwint: "\u2231",
                cylcty: "\u232d",
                Dagger: "\u2021",
                dagger: "\u2020",
                daleth: "\u2138",
                Darr: "\u21a1",
                dArr: "\u21d3",
                darr: "\u2193",
                dash: "\u2010",
                Dashv: "\u2ae4",
                dashv: "\u22a3",
                dbkarow: "\u290f",
                dblac: "\u02dd",
                Dcaron: "\u010e",
                dcaron: "\u010f",
                Dcy: "\u0414",
                dcy: "\u0434",
                DD: "\u2145",
                dd: "\u2146",
                ddagger: "\u2021",
                ddarr: "\u21ca",
                DDotrahd: "\u2911",
                ddotseq: "\u2a77",
                deg: "\xb0",
                Del: "\u2207",
                Delta: "\u0394",
                delta: "\u03b4",
                demptyv: "\u29b1",
                dfisht: "\u297f",
                Dfr: "\ud835\udd07",
                dfr: "\ud835\udd21",
                dHar: "\u2965",
                dharl: "\u21c3",
                dharr: "\u21c2",
                DiacriticalAcute: "\xb4",
                DiacriticalDot: "\u02d9",
                DiacriticalDoubleAcute: "\u02dd",
                DiacriticalGrave: "`",
                DiacriticalTilde: "\u02dc",
                diam: "\u22c4",
                Diamond: "\u22c4",
                diamond: "\u22c4",
                diamondsuit: "\u2666",
                diams: "\u2666",
                die: "\xa8",
                DifferentialD: "\u2146",
                digamma: "\u03dd",
                disin: "\u22f2",
                div: "\xf7",
                divide: "\xf7",
                divideontimes: "\u22c7",
                divonx: "\u22c7",
                DJcy: "\u0402",
                djcy: "\u0452",
                dlcorn: "\u231e",
                dlcrop: "\u230d",
                dollar: "$",
                Dopf: "\ud835\udd3b",
                dopf: "\ud835\udd55",
                Dot: "\xa8",
                dot: "\u02d9",
                DotDot: "\u20dc",
                doteq: "\u2250",
                doteqdot: "\u2251",
                DotEqual: "\u2250",
                dotminus: "\u2238",
                dotplus: "\u2214",
                dotsquare: "\u22a1",
                doublebarwedge: "\u2306",
                DoubleContourIntegral: "\u222f",
                DoubleDot: "\xa8",
                DoubleDownArrow: "\u21d3",
                DoubleLeftArrow: "\u21d0",
                DoubleLeftRightArrow: "\u21d4",
                DoubleLeftTee: "\u2ae4",
                DoubleLongLeftArrow: "\u27f8",
                DoubleLongLeftRightArrow: "\u27fa",
                DoubleLongRightArrow: "\u27f9",
                DoubleRightArrow: "\u21d2",
                DoubleRightTee: "\u22a8",
                DoubleUpArrow: "\u21d1",
                DoubleUpDownArrow: "\u21d5",
                DoubleVerticalBar: "\u2225",
                DownArrow: "\u2193",
                Downarrow: "\u21d3",
                downarrow: "\u2193",
                DownArrowBar: "\u2913",
                DownArrowUpArrow: "\u21f5",
                DownBreve: "\u0311",
                downdownarrows: "\u21ca",
                downharpoonleft: "\u21c3",
                downharpoonright: "\u21c2",
                DownLeftRightVector: "\u2950",
                DownLeftTeeVector: "\u295e",
                DownLeftVector: "\u21bd",
                DownLeftVectorBar: "\u2956",
                DownRightTeeVector: "\u295f",
                DownRightVector: "\u21c1",
                DownRightVectorBar: "\u2957",
                DownTee: "\u22a4",
                DownTeeArrow: "\u21a7",
                drbkarow: "\u2910",
                drcorn: "\u231f",
                drcrop: "\u230c",
                Dscr: "\ud835\udc9f",
                dscr: "\ud835\udcb9",
                DScy: "\u0405",
                dscy: "\u0455",
                dsol: "\u29f6",
                Dstrok: "\u0110",
                dstrok: "\u0111",
                dtdot: "\u22f1",
                dtri: "\u25bf",
                dtrif: "\u25be",
                duarr: "\u21f5",
                duhar: "\u296f",
                dwangle: "\u29a6",
                DZcy: "\u040f",
                dzcy: "\u045f",
                dzigrarr: "\u27ff",
                Eacute: "\xc9",
                eacute: "\xe9",
                easter: "\u2a6e",
                Ecaron: "\u011a",
                ecaron: "\u011b",
                ecir: "\u2256",
                Ecirc: "\xca",
                ecirc: "\xea",
                ecolon: "\u2255",
                Ecy: "\u042d",
                ecy: "\u044d",
                eDDot: "\u2a77",
                Edot: "\u0116",
                eDot: "\u2251",
                edot: "\u0117",
                ee: "\u2147",
                efDot: "\u2252",
                Efr: "\ud835\udd08",
                efr: "\ud835\udd22",
                eg: "\u2a9a",
                Egrave: "\xc8",
                egrave: "\xe8",
                egs: "\u2a96",
                egsdot: "\u2a98",
                el: "\u2a99",
                Element: "\u2208",
                elinters: "\u23e7",
                ell: "\u2113",
                els: "\u2a95",
                elsdot: "\u2a97",
                Emacr: "\u0112",
                emacr: "\u0113",
                empty: "\u2205",
                emptyset: "\u2205",
                EmptySmallSquare: "\u25fb",
                emptyv: "\u2205",
                EmptyVerySmallSquare: "\u25ab",
                emsp: "\u2003",
                emsp13: "\u2004",
                emsp14: "\u2005",
                ENG: "\u014a",
                eng: "\u014b",
                ensp: "\u2002",
                Eogon: "\u0118",
                eogon: "\u0119",
                Eopf: "\ud835\udd3c",
                eopf: "\ud835\udd56",
                epar: "\u22d5",
                eparsl: "\u29e3",
                eplus: "\u2a71",
                epsi: "\u03b5",
                Epsilon: "\u0395",
                epsilon: "\u03b5",
                epsiv: "\u03f5",
                eqcirc: "\u2256",
                eqcolon: "\u2255",
                eqsim: "\u2242",
                eqslantgtr: "\u2a96",
                eqslantless: "\u2a95",
                Equal: "\u2a75",
                equals: "=",
                EqualTilde: "\u2242",
                equest: "\u225f",
                Equilibrium: "\u21cc",
                equiv: "\u2261",
                equivDD: "\u2a78",
                eqvparsl: "\u29e5",
                erarr: "\u2971",
                erDot: "\u2253",
                Escr: "\u2130",
                escr: "\u212f",
                esdot: "\u2250",
                Esim: "\u2a73",
                esim: "\u2242",
                Eta: "\u0397",
                eta: "\u03b7",
                ETH: "\xd0",
                eth: "\xf0",
                Euml: "\xcb",
                euml: "\xeb",
                euro: "\u20ac",
                excl: "!",
                exist: "\u2203",
                Exists: "\u2203",
                expectation: "\u2130",
                ExponentialE: "\u2147",
                exponentiale: "\u2147",
                fallingdotseq: "\u2252",
                Fcy: "\u0424",
                fcy: "\u0444",
                female: "\u2640",
                ffilig: "\ufb03",
                fflig: "\ufb00",
                ffllig: "\ufb04",
                Ffr: "\ud835\udd09",
                ffr: "\ud835\udd23",
                filig: "\ufb01",
                FilledSmallSquare: "\u25fc",
                FilledVerySmallSquare: "\u25aa",
                fjlig: "fj",
                flat: "\u266d",
                fllig: "\ufb02",
                fltns: "\u25b1",
                fnof: "\u0192",
                Fopf: "\ud835\udd3d",
                fopf: "\ud835\udd57",
                ForAll: "\u2200",
                forall: "\u2200",
                fork: "\u22d4",
                forkv: "\u2ad9",
                Fouriertrf: "\u2131",
                fpartint: "\u2a0d",
                frac12: "\xbd",
                frac13: "\u2153",
                frac14: "\xbc",
                frac15: "\u2155",
                frac16: "\u2159",
                frac18: "\u215b",
                frac23: "\u2154",
                frac25: "\u2156",
                frac34: "\xbe",
                frac35: "\u2157",
                frac38: "\u215c",
                frac45: "\u2158",
                frac56: "\u215a",
                frac58: "\u215d",
                frac78: "\u215e",
                frasl: "\u2044",
                frown: "\u2322",
                Fscr: "\u2131",
                fscr: "\ud835\udcbb",
                gacute: "\u01f5",
                Gamma: "\u0393",
                gamma: "\u03b3",
                Gammad: "\u03dc",
                gammad: "\u03dd",
                gap: "\u2a86",
                Gbreve: "\u011e",
                gbreve: "\u011f",
                Gcedil: "\u0122",
                Gcirc: "\u011c",
                gcirc: "\u011d",
                Gcy: "\u0413",
                gcy: "\u0433",
                Gdot: "\u0120",
                gdot: "\u0121",
                gE: "\u2267",
                ge: "\u2265",
                gEl: "\u2a8c",
                gel: "\u22db",
                geq: "\u2265",
                geqq: "\u2267",
                geqslant: "\u2a7e",
                ges: "\u2a7e",
                gescc: "\u2aa9",
                gesdot: "\u2a80",
                gesdoto: "\u2a82",
                gesdotol: "\u2a84",
                gesl: "\u22db\ufe00",
                gesles: "\u2a94",
                Gfr: "\ud835\udd0a",
                gfr: "\ud835\udd24",
                Gg: "\u22d9",
                gg: "\u226b",
                ggg: "\u22d9",
                gimel: "\u2137",
                GJcy: "\u0403",
                gjcy: "\u0453",
                gl: "\u2277",
                gla: "\u2aa5",
                glE: "\u2a92",
                glj: "\u2aa4",
                gnap: "\u2a8a",
                gnapprox: "\u2a8a",
                gnE: "\u2269",
                gne: "\u2a88",
                gneq: "\u2a88",
                gneqq: "\u2269",
                gnsim: "\u22e7",
                Gopf: "\ud835\udd3e",
                gopf: "\ud835\udd58",
                grave: "`",
                GreaterEqual: "\u2265",
                GreaterEqualLess: "\u22db",
                GreaterFullEqual: "\u2267",
                GreaterGreater: "\u2aa2",
                GreaterLess: "\u2277",
                GreaterSlantEqual: "\u2a7e",
                GreaterTilde: "\u2273",
                Gscr: "\ud835\udca2",
                gscr: "\u210a",
                gsim: "\u2273",
                gsime: "\u2a8e",
                gsiml: "\u2a90",
                GT: ">",
                Gt: "\u226b",
                gt: ">",
                gtcc: "\u2aa7",
                gtcir: "\u2a7a",
                gtdot: "\u22d7",
                gtlPar: "\u2995",
                gtquest: "\u2a7c",
                gtrapprox: "\u2a86",
                gtrarr: "\u2978",
                gtrdot: "\u22d7",
                gtreqless: "\u22db",
                gtreqqless: "\u2a8c",
                gtrless: "\u2277",
                gtrsim: "\u2273",
                gvertneqq: "\u2269\ufe00",
                gvnE: "\u2269\ufe00",
                Hacek: "\u02c7",
                hairsp: "\u200a",
                half: "\xbd",
                hamilt: "\u210b",
                HARDcy: "\u042a",
                hardcy: "\u044a",
                hArr: "\u21d4",
                harr: "\u2194",
                harrcir: "\u2948",
                harrw: "\u21ad",
                Hat: "^",
                hbar: "\u210f",
                Hcirc: "\u0124",
                hcirc: "\u0125",
                hearts: "\u2665",
                heartsuit: "\u2665",
                hellip: "\u2026",
                hercon: "\u22b9",
                Hfr: "\u210c",
                hfr: "\ud835\udd25",
                HilbertSpace: "\u210b",
                hksearow: "\u2925",
                hkswarow: "\u2926",
                hoarr: "\u21ff",
                homtht: "\u223b",
                hookleftarrow: "\u21a9",
                hookrightarrow: "\u21aa",
                Hopf: "\u210d",
                hopf: "\ud835\udd59",
                horbar: "\u2015",
                HorizontalLine: "\u2500",
                Hscr: "\u210b",
                hscr: "\ud835\udcbd",
                hslash: "\u210f",
                Hstrok: "\u0126",
                hstrok: "\u0127",
                HumpDownHump: "\u224e",
                HumpEqual: "\u224f",
                hybull: "\u2043",
                hyphen: "\u2010",
                Iacute: "\xcd",
                iacute: "\xed",
                ic: "\u2063",
                Icirc: "\xce",
                icirc: "\xee",
                Icy: "\u0418",
                icy: "\u0438",
                Idot: "\u0130",
                IEcy: "\u0415",
                iecy: "\u0435",
                iexcl: "\xa1",
                iff: "\u21d4",
                Ifr: "\u2111",
                ifr: "\ud835\udd26",
                Igrave: "\xcc",
                igrave: "\xec",
                ii: "\u2148",
                iiiint: "\u2a0c",
                iiint: "\u222d",
                iinfin: "\u29dc",
                iiota: "\u2129",
                IJlig: "\u0132",
                ijlig: "\u0133",
                Im: "\u2111",
                Imacr: "\u012a",
                imacr: "\u012b",
                image: "\u2111",
                ImaginaryI: "\u2148",
                imagline: "\u2110",
                imagpart: "\u2111",
                imath: "\u0131",
                imof: "\u22b7",
                imped: "\u01b5",
                Implies: "\u21d2",
                in: "\u2208",
                incare: "\u2105",
                infin: "\u221e",
                infintie: "\u29dd",
                inodot: "\u0131",
                Int: "\u222c",
                int: "\u222b",
                intcal: "\u22ba",
                integers: "\u2124",
                Integral: "\u222b",
                intercal: "\u22ba",
                Intersection: "\u22c2",
                intlarhk: "\u2a17",
                intprod: "\u2a3c",
                InvisibleComma: "\u2063",
                InvisibleTimes: "\u2062",
                IOcy: "\u0401",
                iocy: "\u0451",
                Iogon: "\u012e",
                iogon: "\u012f",
                Iopf: "\ud835\udd40",
                iopf: "\ud835\udd5a",
                Iota: "\u0399",
                iota: "\u03b9",
                iprod: "\u2a3c",
                iquest: "\xbf",
                Iscr: "\u2110",
                iscr: "\ud835\udcbe",
                isin: "\u2208",
                isindot: "\u22f5",
                isinE: "\u22f9",
                isins: "\u22f4",
                isinsv: "\u22f3",
                isinv: "\u2208",
                it: "\u2062",
                Itilde: "\u0128",
                itilde: "\u0129",
                Iukcy: "\u0406",
                iukcy: "\u0456",
                Iuml: "\xcf",
                iuml: "\xef",
                Jcirc: "\u0134",
                jcirc: "\u0135",
                Jcy: "\u0419",
                jcy: "\u0439",
                Jfr: "\ud835\udd0d",
                jfr: "\ud835\udd27",
                jmath: "\u0237",
                Jopf: "\ud835\udd41",
                jopf: "\ud835\udd5b",
                Jscr: "\ud835\udca5",
                jscr: "\ud835\udcbf",
                Jsercy: "\u0408",
                jsercy: "\u0458",
                Jukcy: "\u0404",
                jukcy: "\u0454",
                Kappa: "\u039a",
                kappa: "\u03ba",
                kappav: "\u03f0",
                Kcedil: "\u0136",
                kcedil: "\u0137",
                Kcy: "\u041a",
                kcy: "\u043a",
                Kfr: "\ud835\udd0e",
                kfr: "\ud835\udd28",
                kgreen: "\u0138",
                KHcy: "\u0425",
                khcy: "\u0445",
                KJcy: "\u040c",
                kjcy: "\u045c",
                Kopf: "\ud835\udd42",
                kopf: "\ud835\udd5c",
                Kscr: "\ud835\udca6",
                kscr: "\ud835\udcc0",
                lAarr: "\u21da",
                Lacute: "\u0139",
                lacute: "\u013a",
                laemptyv: "\u29b4",
                lagran: "\u2112",
                Lambda: "\u039b",
                lambda: "\u03bb",
                Lang: "\u27ea",
                lang: "\u27e8",
                langd: "\u2991",
                langle: "\u27e8",
                lap: "\u2a85",
                Laplacetrf: "\u2112",
                laquo: "\xab",
                Larr: "\u219e",
                lArr: "\u21d0",
                larr: "\u2190",
                larrb: "\u21e4",
                larrbfs: "\u291f",
                larrfs: "\u291d",
                larrhk: "\u21a9",
                larrlp: "\u21ab",
                larrpl: "\u2939",
                larrsim: "\u2973",
                larrtl: "\u21a2",
                lat: "\u2aab",
                lAtail: "\u291b",
                latail: "\u2919",
                late: "\u2aad",
                lates: "\u2aad\ufe00",
                lBarr: "\u290e",
                lbarr: "\u290c",
                lbbrk: "\u2772",
                lbrace: "{",
                lbrack: "[",
                lbrke: "\u298b",
                lbrksld: "\u298f",
                lbrkslu: "\u298d",
                Lcaron: "\u013d",
                lcaron: "\u013e",
                Lcedil: "\u013b",
                lcedil: "\u013c",
                lceil: "\u2308",
                lcub: "{",
                Lcy: "\u041b",
                lcy: "\u043b",
                ldca: "\u2936",
                ldquo: "\u201c",
                ldquor: "\u201e",
                ldrdhar: "\u2967",
                ldrushar: "\u294b",
                ldsh: "\u21b2",
                lE: "\u2266",
                le: "\u2264",
                LeftAngleBracket: "\u27e8",
                LeftArrow: "\u2190",
                Leftarrow: "\u21d0",
                leftarrow: "\u2190",
                LeftArrowBar: "\u21e4",
                LeftArrowRightArrow: "\u21c6",
                leftarrowtail: "\u21a2",
                LeftCeiling: "\u2308",
                LeftDoubleBracket: "\u27e6",
                LeftDownTeeVector: "\u2961",
                LeftDownVector: "\u21c3",
                LeftDownVectorBar: "\u2959",
                LeftFloor: "\u230a",
                leftharpoondown: "\u21bd",
                leftharpoonup: "\u21bc",
                leftleftarrows: "\u21c7",
                LeftRightArrow: "\u2194",
                Leftrightarrow: "\u21d4",
                leftrightarrow: "\u2194",
                leftrightarrows: "\u21c6",
                leftrightharpoons: "\u21cb",
                leftrightsquigarrow: "\u21ad",
                LeftRightVector: "\u294e",
                LeftTee: "\u22a3",
                LeftTeeArrow: "\u21a4",
                LeftTeeVector: "\u295a",
                leftthreetimes: "\u22cb",
                LeftTriangle: "\u22b2",
                LeftTriangleBar: "\u29cf",
                LeftTriangleEqual: "\u22b4",
                LeftUpDownVector: "\u2951",
                LeftUpTeeVector: "\u2960",
                LeftUpVector: "\u21bf",
                LeftUpVectorBar: "\u2958",
                LeftVector: "\u21bc",
                LeftVectorBar: "\u2952",
                lEg: "\u2a8b",
                leg: "\u22da",
                leq: "\u2264",
                leqq: "\u2266",
                leqslant: "\u2a7d",
                les: "\u2a7d",
                lescc: "\u2aa8",
                lesdot: "\u2a7f",
                lesdoto: "\u2a81",
                lesdotor: "\u2a83",
                lesg: "\u22da\ufe00",
                lesges: "\u2a93",
                lessapprox: "\u2a85",
                lessdot: "\u22d6",
                lesseqgtr: "\u22da",
                lesseqqgtr: "\u2a8b",
                LessEqualGreater: "\u22da",
                LessFullEqual: "\u2266",
                LessGreater: "\u2276",
                lessgtr: "\u2276",
                LessLess: "\u2aa1",
                lesssim: "\u2272",
                LessSlantEqual: "\u2a7d",
                LessTilde: "\u2272",
                lfisht: "\u297c",
                lfloor: "\u230a",
                Lfr: "\ud835\udd0f",
                lfr: "\ud835\udd29",
                lg: "\u2276",
                lgE: "\u2a91",
                lHar: "\u2962",
                lhard: "\u21bd",
                lharu: "\u21bc",
                lharul: "\u296a",
                lhblk: "\u2584",
                LJcy: "\u0409",
                ljcy: "\u0459",
                Ll: "\u22d8",
                ll: "\u226a",
                llarr: "\u21c7",
                llcorner: "\u231e",
                Lleftarrow: "\u21da",
                llhard: "\u296b",
                lltri: "\u25fa",
                Lmidot: "\u013f",
                lmidot: "\u0140",
                lmoust: "\u23b0",
                lmoustache: "\u23b0",
                lnap: "\u2a89",
                lnapprox: "\u2a89",
                lnE: "\u2268",
                lne: "\u2a87",
                lneq: "\u2a87",
                lneqq: "\u2268",
                lnsim: "\u22e6",
                loang: "\u27ec",
                loarr: "\u21fd",
                lobrk: "\u27e6",
                LongLeftArrow: "\u27f5",
                Longleftarrow: "\u27f8",
                longleftarrow: "\u27f5",
                LongLeftRightArrow: "\u27f7",
                Longleftrightarrow: "\u27fa",
                longleftrightarrow: "\u27f7",
                longmapsto: "\u27fc",
                LongRightArrow: "\u27f6",
                Longrightarrow: "\u27f9",
                longrightarrow: "\u27f6",
                looparrowleft: "\u21ab",
                looparrowright: "\u21ac",
                lopar: "\u2985",
                Lopf: "\ud835\udd43",
                lopf: "\ud835\udd5d",
                loplus: "\u2a2d",
                lotimes: "\u2a34",
                lowast: "\u2217",
                lowbar: "_",
                LowerLeftArrow: "\u2199",
                LowerRightArrow: "\u2198",
                loz: "\u25ca",
                lozenge: "\u25ca",
                lozf: "\u29eb",
                lpar: "(",
                lparlt: "\u2993",
                lrarr: "\u21c6",
                lrcorner: "\u231f",
                lrhar: "\u21cb",
                lrhard: "\u296d",
                lrm: "\u200e",
                lrtri: "\u22bf",
                lsaquo: "\u2039",
                Lscr: "\u2112",
                lscr: "\ud835\udcc1",
                Lsh: "\u21b0",
                lsh: "\u21b0",
                lsim: "\u2272",
                lsime: "\u2a8d",
                lsimg: "\u2a8f",
                lsqb: "[",
                lsquo: "\u2018",
                lsquor: "\u201a",
                Lstrok: "\u0141",
                lstrok: "\u0142",
                LT: "<",
                Lt: "\u226a",
                lt: "<",
                ltcc: "\u2aa6",
                ltcir: "\u2a79",
                ltdot: "\u22d6",
                lthree: "\u22cb",
                ltimes: "\u22c9",
                ltlarr: "\u2976",
                ltquest: "\u2a7b",
                ltri: "\u25c3",
                ltrie: "\u22b4",
                ltrif: "\u25c2",
                ltrPar: "\u2996",
                lurdshar: "\u294a",
                luruhar: "\u2966",
                lvertneqq: "\u2268\ufe00",
                lvnE: "\u2268\ufe00",
                macr: "\xaf",
                male: "\u2642",
                malt: "\u2720",
                maltese: "\u2720",
                Map: "\u2905",
                map: "\u21a6",
                mapsto: "\u21a6",
                mapstodown: "\u21a7",
                mapstoleft: "\u21a4",
                mapstoup: "\u21a5",
                marker: "\u25ae",
                mcomma: "\u2a29",
                Mcy: "\u041c",
                mcy: "\u043c",
                mdash: "\u2014",
                mDDot: "\u223a",
                measuredangle: "\u2221",
                MediumSpace: "\u205f",
                Mellintrf: "\u2133",
                Mfr: "\ud835\udd10",
                mfr: "\ud835\udd2a",
                mho: "\u2127",
                micro: "\xb5",
                mid: "\u2223",
                midast: "*",
                midcir: "\u2af0",
                middot: "\xb7",
                minus: "\u2212",
                minusb: "\u229f",
                minusd: "\u2238",
                minusdu: "\u2a2a",
                MinusPlus: "\u2213",
                mlcp: "\u2adb",
                mldr: "\u2026",
                mnplus: "\u2213",
                models: "\u22a7",
                Mopf: "\ud835\udd44",
                mopf: "\ud835\udd5e",
                mp: "\u2213",
                Mscr: "\u2133",
                mscr: "\ud835\udcc2",
                mstpos: "\u223e",
                Mu: "\u039c",
                mu: "\u03bc",
                multimap: "\u22b8",
                mumap: "\u22b8",
                nabla: "\u2207",
                Nacute: "\u0143",
                nacute: "\u0144",
                nang: "\u2220\u20d2",
                nap: "\u2249",
                napE: "\u2a70\u0338",
                napid: "\u224b\u0338",
                napos: "\u0149",
                napprox: "\u2249",
                natur: "\u266e",
                natural: "\u266e",
                naturals: "\u2115",
                nbsp: "\xa0",
                nbump: "\u224e\u0338",
                nbumpe: "\u224f\u0338",
                ncap: "\u2a43",
                Ncaron: "\u0147",
                ncaron: "\u0148",
                Ncedil: "\u0145",
                ncedil: "\u0146",
                ncong: "\u2247",
                ncongdot: "\u2a6d\u0338",
                ncup: "\u2a42",
                Ncy: "\u041d",
                ncy: "\u043d",
                ndash: "\u2013",
                ne: "\u2260",
                nearhk: "\u2924",
                neArr: "\u21d7",
                nearr: "\u2197",
                nearrow: "\u2197",
                nedot: "\u2250\u0338",
                NegativeMediumSpace: "\u200b",
                NegativeThickSpace: "\u200b",
                NegativeThinSpace: "\u200b",
                NegativeVeryThinSpace: "\u200b",
                nequiv: "\u2262",
                nesear: "\u2928",
                nesim: "\u2242\u0338",
                NestedGreaterGreater: "\u226b",
                NestedLessLess: "\u226a",
                NewLine: "\n",
                nexist: "\u2204",
                nexists: "\u2204",
                Nfr: "\ud835\udd11",
                nfr: "\ud835\udd2b",
                ngE: "\u2267\u0338",
                nge: "\u2271",
                ngeq: "\u2271",
                ngeqq: "\u2267\u0338",
                ngeqslant: "\u2a7e\u0338",
                nges: "\u2a7e\u0338",
                nGg: "\u22d9\u0338",
                ngsim: "\u2275",
                nGt: "\u226b\u20d2",
                ngt: "\u226f",
                ngtr: "\u226f",
                nGtv: "\u226b\u0338",
                nhArr: "\u21ce",
                nharr: "\u21ae",
                nhpar: "\u2af2",
                ni: "\u220b",
                nis: "\u22fc",
                nisd: "\u22fa",
                niv: "\u220b",
                NJcy: "\u040a",
                njcy: "\u045a",
                nlArr: "\u21cd",
                nlarr: "\u219a",
                nldr: "\u2025",
                nlE: "\u2266\u0338",
                nle: "\u2270",
                nLeftarrow: "\u21cd",
                nleftarrow: "\u219a",
                nLeftrightarrow: "\u21ce",
                nleftrightarrow: "\u21ae",
                nleq: "\u2270",
                nleqq: "\u2266\u0338",
                nleqslant: "\u2a7d\u0338",
                nles: "\u2a7d\u0338",
                nless: "\u226e",
                nLl: "\u22d8\u0338",
                nlsim: "\u2274",
                nLt: "\u226a\u20d2",
                nlt: "\u226e",
                nltri: "\u22ea",
                nltrie: "\u22ec",
                nLtv: "\u226a\u0338",
                nmid: "\u2224",
                NoBreak: "\u2060",
                NonBreakingSpace: "\xa0",
                Nopf: "\u2115",
                nopf: "\ud835\udd5f",
                Not: "\u2aec",
                not: "\xac",
                NotCongruent: "\u2262",
                NotCupCap: "\u226d",
                NotDoubleVerticalBar: "\u2226",
                NotElement: "\u2209",
                NotEqual: "\u2260",
                NotEqualTilde: "\u2242\u0338",
                NotExists: "\u2204",
                NotGreater: "\u226f",
                NotGreaterEqual: "\u2271",
                NotGreaterFullEqual: "\u2267\u0338",
                NotGreaterGreater: "\u226b\u0338",
                NotGreaterLess: "\u2279",
                NotGreaterSlantEqual: "\u2a7e\u0338",
                NotGreaterTilde: "\u2275",
                NotHumpDownHump: "\u224e\u0338",
                NotHumpEqual: "\u224f\u0338",
                notin: "\u2209",
                notindot: "\u22f5\u0338",
                notinE: "\u22f9\u0338",
                notinva: "\u2209",
                notinvb: "\u22f7",
                notinvc: "\u22f6",
                NotLeftTriangle: "\u22ea",
                NotLeftTriangleBar: "\u29cf\u0338",
                NotLeftTriangleEqual: "\u22ec",
                NotLess: "\u226e",
                NotLessEqual: "\u2270",
                NotLessGreater: "\u2278",
                NotLessLess: "\u226a\u0338",
                NotLessSlantEqual: "\u2a7d\u0338",
                NotLessTilde: "\u2274",
                NotNestedGreaterGreater: "\u2aa2\u0338",
                NotNestedLessLess: "\u2aa1\u0338",
                notni: "\u220c",
                notniva: "\u220c",
                notnivb: "\u22fe",
                notnivc: "\u22fd",
                NotPrecedes: "\u2280",
                NotPrecedesEqual: "\u2aaf\u0338",
                NotPrecedesSlantEqual: "\u22e0",
                NotReverseElement: "\u220c",
                NotRightTriangle: "\u22eb",
                NotRightTriangleBar: "\u29d0\u0338",
                NotRightTriangleEqual: "\u22ed",
                NotSquareSubset: "\u228f\u0338",
                NotSquareSubsetEqual: "\u22e2",
                NotSquareSuperset: "\u2290\u0338",
                NotSquareSupersetEqual: "\u22e3",
                NotSubset: "\u2282\u20d2",
                NotSubsetEqual: "\u2288",
                NotSucceeds: "\u2281",
                NotSucceedsEqual: "\u2ab0\u0338",
                NotSucceedsSlantEqual: "\u22e1",
                NotSucceedsTilde: "\u227f\u0338",
                NotSuperset: "\u2283\u20d2",
                NotSupersetEqual: "\u2289",
                NotTilde: "\u2241",
                NotTildeEqual: "\u2244",
                NotTildeFullEqual: "\u2247",
                NotTildeTilde: "\u2249",
                NotVerticalBar: "\u2224",
                npar: "\u2226",
                nparallel: "\u2226",
                nparsl: "\u2afd\u20e5",
                npart: "\u2202\u0338",
                npolint: "\u2a14",
                npr: "\u2280",
                nprcue: "\u22e0",
                npre: "\u2aaf\u0338",
                nprec: "\u2280",
                npreceq: "\u2aaf\u0338",
                nrArr: "\u21cf",
                nrarr: "\u219b",
                nrarrc: "\u2933\u0338",
                nrarrw: "\u219d\u0338",
                nRightarrow: "\u21cf",
                nrightarrow: "\u219b",
                nrtri: "\u22eb",
                nrtrie: "\u22ed",
                nsc: "\u2281",
                nsccue: "\u22e1",
                nsce: "\u2ab0\u0338",
                Nscr: "\ud835\udca9",
                nscr: "\ud835\udcc3",
                nshortmid: "\u2224",
                nshortparallel: "\u2226",
                nsim: "\u2241",
                nsime: "\u2244",
                nsimeq: "\u2244",
                nsmid: "\u2224",
                nspar: "\u2226",
                nsqsube: "\u22e2",
                nsqsupe: "\u22e3",
                nsub: "\u2284",
                nsubE: "\u2ac5\u0338",
                nsube: "\u2288",
                nsubset: "\u2282\u20d2",
                nsubseteq: "\u2288",
                nsubseteqq: "\u2ac5\u0338",
                nsucc: "\u2281",
                nsucceq: "\u2ab0\u0338",
                nsup: "\u2285",
                nsupE: "\u2ac6\u0338",
                nsupe: "\u2289",
                nsupset: "\u2283\u20d2",
                nsupseteq: "\u2289",
                nsupseteqq: "\u2ac6\u0338",
                ntgl: "\u2279",
                Ntilde: "\xd1",
                ntilde: "\xf1",
                ntlg: "\u2278",
                ntriangleleft: "\u22ea",
                ntrianglelefteq: "\u22ec",
                ntriangleright: "\u22eb",
                ntrianglerighteq: "\u22ed",
                Nu: "\u039d",
                nu: "\u03bd",
                num: "#",
                numero: "\u2116",
                numsp: "\u2007",
                nvap: "\u224d\u20d2",
                nVDash: "\u22af",
                nVdash: "\u22ae",
                nvDash: "\u22ad",
                nvdash: "\u22ac",
                nvge: "\u2265\u20d2",
                nvgt: ">\u20d2",
                nvHarr: "\u2904",
                nvinfin: "\u29de",
                nvlArr: "\u2902",
                nvle: "\u2264\u20d2",
                nvlt: "<\u20d2",
                nvltrie: "\u22b4\u20d2",
                nvrArr: "\u2903",
                nvrtrie: "\u22b5\u20d2",
                nvsim: "\u223c\u20d2",
                nwarhk: "\u2923",
                nwArr: "\u21d6",
                nwarr: "\u2196",
                nwarrow: "\u2196",
                nwnear: "\u2927",
                Oacute: "\xd3",
                oacute: "\xf3",
                oast: "\u229b",
                ocir: "\u229a",
                Ocirc: "\xd4",
                ocirc: "\xf4",
                Ocy: "\u041e",
                ocy: "\u043e",
                odash: "\u229d",
                Odblac: "\u0150",
                odblac: "\u0151",
                odiv: "\u2a38",
                odot: "\u2299",
                odsold: "\u29bc",
                OElig: "\u0152",
                oelig: "\u0153",
                ofcir: "\u29bf",
                Ofr: "\ud835\udd12",
                ofr: "\ud835\udd2c",
                ogon: "\u02db",
                Ograve: "\xd2",
                ograve: "\xf2",
                ogt: "\u29c1",
                ohbar: "\u29b5",
                ohm: "\u03a9",
                oint: "\u222e",
                olarr: "\u21ba",
                olcir: "\u29be",
                olcross: "\u29bb",
                oline: "\u203e",
                olt: "\u29c0",
                Omacr: "\u014c",
                omacr: "\u014d",
                Omega: "\u03a9",
                omega: "\u03c9",
                Omicron: "\u039f",
                omicron: "\u03bf",
                omid: "\u29b6",
                ominus: "\u2296",
                Oopf: "\ud835\udd46",
                oopf: "\ud835\udd60",
                opar: "\u29b7",
                OpenCurlyDoubleQuote: "\u201c",
                OpenCurlyQuote: "\u2018",
                operp: "\u29b9",
                oplus: "\u2295",
                Or: "\u2a54",
                or: "\u2228",
                orarr: "\u21bb",
                ord: "\u2a5d",
                order: "\u2134",
                orderof: "\u2134",
                ordf: "\xaa",
                ordm: "\xba",
                origof: "\u22b6",
                oror: "\u2a56",
                orslope: "\u2a57",
                orv: "\u2a5b",
                oS: "\u24c8",
                Oscr: "\ud835\udcaa",
                oscr: "\u2134",
                Oslash: "\xd8",
                oslash: "\xf8",
                osol: "\u2298",
                Otilde: "\xd5",
                otilde: "\xf5",
                Otimes: "\u2a37",
                otimes: "\u2297",
                otimesas: "\u2a36",
                Ouml: "\xd6",
                ouml: "\xf6",
                ovbar: "\u233d",
                OverBar: "\u203e",
                OverBrace: "\u23de",
                OverBracket: "\u23b4",
                OverParenthesis: "\u23dc",
                par: "\u2225",
                para: "\xb6",
                parallel: "\u2225",
                parsim: "\u2af3",
                parsl: "\u2afd",
                part: "\u2202",
                PartialD: "\u2202",
                Pcy: "\u041f",
                pcy: "\u043f",
                percnt: "%",
                period: ".",
                permil: "\u2030",
                perp: "\u22a5",
                pertenk: "\u2031",
                Pfr: "\ud835\udd13",
                pfr: "\ud835\udd2d",
                Phi: "\u03a6",
                phi: "\u03c6",
                phiv: "\u03d5",
                phmmat: "\u2133",
                phone: "\u260e",
                Pi: "\u03a0",
                pi: "\u03c0",
                pitchfork: "\u22d4",
                piv: "\u03d6",
                planck: "\u210f",
                planckh: "\u210e",
                plankv: "\u210f",
                plus: "+",
                plusacir: "\u2a23",
                plusb: "\u229e",
                pluscir: "\u2a22",
                plusdo: "\u2214",
                plusdu: "\u2a25",
                pluse: "\u2a72",
                PlusMinus: "\xb1",
                plusmn: "\xb1",
                plussim: "\u2a26",
                plustwo: "\u2a27",
                pm: "\xb1",
                Poincareplane: "\u210c",
                pointint: "\u2a15",
                Popf: "\u2119",
                popf: "\ud835\udd61",
                pound: "\xa3",
                Pr: "\u2abb",
                pr: "\u227a",
                prap: "\u2ab7",
                prcue: "\u227c",
                prE: "\u2ab3",
                pre: "\u2aaf",
                prec: "\u227a",
                precapprox: "\u2ab7",
                preccurlyeq: "\u227c",
                Precedes: "\u227a",
                PrecedesEqual: "\u2aaf",
                PrecedesSlantEqual: "\u227c",
                PrecedesTilde: "\u227e",
                preceq: "\u2aaf",
                precnapprox: "\u2ab9",
                precneqq: "\u2ab5",
                precnsim: "\u22e8",
                precsim: "\u227e",
                Prime: "\u2033",
                prime: "\u2032",
                primes: "\u2119",
                prnap: "\u2ab9",
                prnE: "\u2ab5",
                prnsim: "\u22e8",
                prod: "\u220f",
                Product: "\u220f",
                profalar: "\u232e",
                profline: "\u2312",
                profsurf: "\u2313",
                prop: "\u221d",
                Proportion: "\u2237",
                Proportional: "\u221d",
                propto: "\u221d",
                prsim: "\u227e",
                prurel: "\u22b0",
                Pscr: "\ud835\udcab",
                pscr: "\ud835\udcc5",
                Psi: "\u03a8",
                psi: "\u03c8",
                puncsp: "\u2008",
                Qfr: "\ud835\udd14",
                qfr: "\ud835\udd2e",
                qint: "\u2a0c",
                Qopf: "\u211a",
                qopf: "\ud835\udd62",
                qprime: "\u2057",
                Qscr: "\ud835\udcac",
                qscr: "\ud835\udcc6",
                quaternions: "\u210d",
                quatint: "\u2a16",
                quest: "?",
                questeq: "\u225f",
                QUOT: '"',
                quot: '"',
                rAarr: "\u21db",
                race: "\u223d\u0331",
                Racute: "\u0154",
                racute: "\u0155",
                radic: "\u221a",
                raemptyv: "\u29b3",
                Rang: "\u27eb",
                rang: "\u27e9",
                rangd: "\u2992",
                range: "\u29a5",
                rangle: "\u27e9",
                raquo: "\xbb",
                Rarr: "\u21a0",
                rArr: "\u21d2",
                rarr: "\u2192",
                rarrap: "\u2975",
                rarrb: "\u21e5",
                rarrbfs: "\u2920",
                rarrc: "\u2933",
                rarrfs: "\u291e",
                rarrhk: "\u21aa",
                rarrlp: "\u21ac",
                rarrpl: "\u2945",
                rarrsim: "\u2974",
                Rarrtl: "\u2916",
                rarrtl: "\u21a3",
                rarrw: "\u219d",
                rAtail: "\u291c",
                ratail: "\u291a",
                ratio: "\u2236",
                rationals: "\u211a",
                RBarr: "\u2910",
                rBarr: "\u290f",
                rbarr: "\u290d",
                rbbrk: "\u2773",
                rbrace: "}",
                rbrack: "]",
                rbrke: "\u298c",
                rbrksld: "\u298e",
                rbrkslu: "\u2990",
                Rcaron: "\u0158",
                rcaron: "\u0159",
                Rcedil: "\u0156",
                rcedil: "\u0157",
                rceil: "\u2309",
                rcub: "}",
                Rcy: "\u0420",
                rcy: "\u0440",
                rdca: "\u2937",
                rdldhar: "\u2969",
                rdquo: "\u201d",
                rdquor: "\u201d",
                rdsh: "\u21b3",
                Re: "\u211c",
                real: "\u211c",
                realine: "\u211b",
                realpart: "\u211c",
                reals: "\u211d",
                rect: "\u25ad",
                REG: "\xae",
                reg: "\xae",
                ReverseElement: "\u220b",
                ReverseEquilibrium: "\u21cb",
                ReverseUpEquilibrium: "\u296f",
                rfisht: "\u297d",
                rfloor: "\u230b",
                Rfr: "\u211c",
                rfr: "\ud835\udd2f",
                rHar: "\u2964",
                rhard: "\u21c1",
                rharu: "\u21c0",
                rharul: "\u296c",
                Rho: "\u03a1",
                rho: "\u03c1",
                rhov: "\u03f1",
                RightAngleBracket: "\u27e9",
                RightArrow: "\u2192",
                Rightarrow: "\u21d2",
                rightarrow: "\u2192",
                RightArrowBar: "\u21e5",
                RightArrowLeftArrow: "\u21c4",
                rightarrowtail: "\u21a3",
                RightCeiling: "\u2309",
                RightDoubleBracket: "\u27e7",
                RightDownTeeVector: "\u295d",
                RightDownVector: "\u21c2",
                RightDownVectorBar: "\u2955",
                RightFloor: "\u230b",
                rightharpoondown: "\u21c1",
                rightharpoonup: "\u21c0",
                rightleftarrows: "\u21c4",
                rightleftharpoons: "\u21cc",
                rightrightarrows: "\u21c9",
                rightsquigarrow: "\u219d",
                RightTee: "\u22a2",
                RightTeeArrow: "\u21a6",
                RightTeeVector: "\u295b",
                rightthreetimes: "\u22cc",
                RightTriangle: "\u22b3",
                RightTriangleBar: "\u29d0",
                RightTriangleEqual: "\u22b5",
                RightUpDownVector: "\u294f",
                RightUpTeeVector: "\u295c",
                RightUpVector: "\u21be",
                RightUpVectorBar: "\u2954",
                RightVector: "\u21c0",
                RightVectorBar: "\u2953",
                ring: "\u02da",
                risingdotseq: "\u2253",
                rlarr: "\u21c4",
                rlhar: "\u21cc",
                rlm: "\u200f",
                rmoust: "\u23b1",
                rmoustache: "\u23b1",
                rnmid: "\u2aee",
                roang: "\u27ed",
                roarr: "\u21fe",
                robrk: "\u27e7",
                ropar: "\u2986",
                Ropf: "\u211d",
                ropf: "\ud835\udd63",
                roplus: "\u2a2e",
                rotimes: "\u2a35",
                RoundImplies: "\u2970",
                rpar: ")",
                rpargt: "\u2994",
                rppolint: "\u2a12",
                rrarr: "\u21c9",
                Rrightarrow: "\u21db",
                rsaquo: "\u203a",
                Rscr: "\u211b",
                rscr: "\ud835\udcc7",
                Rsh: "\u21b1",
                rsh: "\u21b1",
                rsqb: "]",
                rsquo: "\u2019",
                rsquor: "\u2019",
                rthree: "\u22cc",
                rtimes: "\u22ca",
                rtri: "\u25b9",
                rtrie: "\u22b5",
                rtrif: "\u25b8",
                rtriltri: "\u29ce",
                RuleDelayed: "\u29f4",
                ruluhar: "\u2968",
                rx: "\u211e",
                Sacute: "\u015a",
                sacute: "\u015b",
                sbquo: "\u201a",
                Sc: "\u2abc",
                sc: "\u227b",
                scap: "\u2ab8",
                Scaron: "\u0160",
                scaron: "\u0161",
                sccue: "\u227d",
                scE: "\u2ab4",
                sce: "\u2ab0",
                Scedil: "\u015e",
                scedil: "\u015f",
                Scirc: "\u015c",
                scirc: "\u015d",
                scnap: "\u2aba",
                scnE: "\u2ab6",
                scnsim: "\u22e9",
                scpolint: "\u2a13",
                scsim: "\u227f",
                Scy: "\u0421",
                scy: "\u0441",
                sdot: "\u22c5",
                sdotb: "\u22a1",
                sdote: "\u2a66",
                searhk: "\u2925",
                seArr: "\u21d8",
                searr: "\u2198",
                searrow: "\u2198",
                sect: "\xa7",
                semi: ";",
                seswar: "\u2929",
                setminus: "\u2216",
                setmn: "\u2216",
                sext: "\u2736",
                Sfr: "\ud835\udd16",
                sfr: "\ud835\udd30",
                sfrown: "\u2322",
                sharp: "\u266f",
                SHCHcy: "\u0429",
                shchcy: "\u0449",
                SHcy: "\u0428",
                shcy: "\u0448",
                ShortDownArrow: "\u2193",
                ShortLeftArrow: "\u2190",
                shortmid: "\u2223",
                shortparallel: "\u2225",
                ShortRightArrow: "\u2192",
                ShortUpArrow: "\u2191",
                shy: "\xad",
                Sigma: "\u03a3",
                sigma: "\u03c3",
                sigmaf: "\u03c2",
                sigmav: "\u03c2",
                sim: "\u223c",
                simdot: "\u2a6a",
                sime: "\u2243",
                simeq: "\u2243",
                simg: "\u2a9e",
                simgE: "\u2aa0",
                siml: "\u2a9d",
                simlE: "\u2a9f",
                simne: "\u2246",
                simplus: "\u2a24",
                simrarr: "\u2972",
                slarr: "\u2190",
                SmallCircle: "\u2218",
                smallsetminus: "\u2216",
                smashp: "\u2a33",
                smeparsl: "\u29e4",
                smid: "\u2223",
                smile: "\u2323",
                smt: "\u2aaa",
                smte: "\u2aac",
                smtes: "\u2aac\ufe00",
                SOFTcy: "\u042c",
                softcy: "\u044c",
                sol: "/",
                solb: "\u29c4",
                solbar: "\u233f",
                Sopf: "\ud835\udd4a",
                sopf: "\ud835\udd64",
                spades: "\u2660",
                spadesuit: "\u2660",
                spar: "\u2225",
                sqcap: "\u2293",
                sqcaps: "\u2293\ufe00",
                sqcup: "\u2294",
                sqcups: "\u2294\ufe00",
                Sqrt: "\u221a",
                sqsub: "\u228f",
                sqsube: "\u2291",
                sqsubset: "\u228f",
                sqsubseteq: "\u2291",
                sqsup: "\u2290",
                sqsupe: "\u2292",
                sqsupset: "\u2290",
                sqsupseteq: "\u2292",
                squ: "\u25a1",
                Square: "\u25a1",
                square: "\u25a1",
                SquareIntersection: "\u2293",
                SquareSubset: "\u228f",
                SquareSubsetEqual: "\u2291",
                SquareSuperset: "\u2290",
                SquareSupersetEqual: "\u2292",
                SquareUnion: "\u2294",
                squarf: "\u25aa",
                squf: "\u25aa",
                srarr: "\u2192",
                Sscr: "\ud835\udcae",
                sscr: "\ud835\udcc8",
                ssetmn: "\u2216",
                ssmile: "\u2323",
                sstarf: "\u22c6",
                Star: "\u22c6",
                star: "\u2606",
                starf: "\u2605",
                straightepsilon: "\u03f5",
                straightphi: "\u03d5",
                strns: "\xaf",
                Sub: "\u22d0",
                sub: "\u2282",
                subdot: "\u2abd",
                subE: "\u2ac5",
                sube: "\u2286",
                subedot: "\u2ac3",
                submult: "\u2ac1",
                subnE: "\u2acb",
                subne: "\u228a",
                subplus: "\u2abf",
                subrarr: "\u2979",
                Subset: "\u22d0",
                subset: "\u2282",
                subseteq: "\u2286",
                subseteqq: "\u2ac5",
                SubsetEqual: "\u2286",
                subsetneq: "\u228a",
                subsetneqq: "\u2acb",
                subsim: "\u2ac7",
                subsub: "\u2ad5",
                subsup: "\u2ad3",
                succ: "\u227b",
                succapprox: "\u2ab8",
                succcurlyeq: "\u227d",
                Succeeds: "\u227b",
                SucceedsEqual: "\u2ab0",
                SucceedsSlantEqual: "\u227d",
                SucceedsTilde: "\u227f",
                succeq: "\u2ab0",
                succnapprox: "\u2aba",
                succneqq: "\u2ab6",
                succnsim: "\u22e9",
                succsim: "\u227f",
                SuchThat: "\u220b",
                Sum: "\u2211",
                sum: "\u2211",
                sung: "\u266a",
                Sup: "\u22d1",
                sup: "\u2283",
                sup1: "\xb9",
                sup2: "\xb2",
                sup3: "\xb3",
                supdot: "\u2abe",
                supdsub: "\u2ad8",
                supE: "\u2ac6",
                supe: "\u2287",
                supedot: "\u2ac4",
                Superset: "\u2283",
                SupersetEqual: "\u2287",
                suphsol: "\u27c9",
                suphsub: "\u2ad7",
                suplarr: "\u297b",
                supmult: "\u2ac2",
                supnE: "\u2acc",
                supne: "\u228b",
                supplus: "\u2ac0",
                Supset: "\u22d1",
                supset: "\u2283",
                supseteq: "\u2287",
                supseteqq: "\u2ac6",
                supsetneq: "\u228b",
                supsetneqq: "\u2acc",
                supsim: "\u2ac8",
                supsub: "\u2ad4",
                supsup: "\u2ad6",
                swarhk: "\u2926",
                swArr: "\u21d9",
                swarr: "\u2199",
                swarrow: "\u2199",
                swnwar: "\u292a",
                szlig: "\xdf",
                Tab: "\t",
                target: "\u2316",
                Tau: "\u03a4",
                tau: "\u03c4",
                tbrk: "\u23b4",
                Tcaron: "\u0164",
                tcaron: "\u0165",
                Tcedil: "\u0162",
                tcedil: "\u0163",
                Tcy: "\u0422",
                tcy: "\u0442",
                tdot: "\u20db",
                telrec: "\u2315",
                Tfr: "\ud835\udd17",
                tfr: "\ud835\udd31",
                there4: "\u2234",
                Therefore: "\u2234",
                therefore: "\u2234",
                Theta: "\u0398",
                theta: "\u03b8",
                thetasym: "\u03d1",
                thetav: "\u03d1",
                thickapprox: "\u2248",
                thicksim: "\u223c",
                ThickSpace: "\u205f\u200a",
                thinsp: "\u2009",
                ThinSpace: "\u2009",
                thkap: "\u2248",
                thksim: "\u223c",
                THORN: "\xde",
                thorn: "\xfe",
                Tilde: "\u223c",
                tilde: "\u02dc",
                TildeEqual: "\u2243",
                TildeFullEqual: "\u2245",
                TildeTilde: "\u2248",
                times: "\xd7",
                timesb: "\u22a0",
                timesbar: "\u2a31",
                timesd: "\u2a30",
                tint: "\u222d",
                toea: "\u2928",
                top: "\u22a4",
                topbot: "\u2336",
                topcir: "\u2af1",
                Topf: "\ud835\udd4b",
                topf: "\ud835\udd65",
                topfork: "\u2ada",
                tosa: "\u2929",
                tprime: "\u2034",
                TRADE: "\u2122",
                trade: "\u2122",
                triangle: "\u25b5",
                triangledown: "\u25bf",
                triangleleft: "\u25c3",
                trianglelefteq: "\u22b4",
                triangleq: "\u225c",
                triangleright: "\u25b9",
                trianglerighteq: "\u22b5",
                tridot: "\u25ec",
                trie: "\u225c",
                triminus: "\u2a3a",
                TripleDot: "\u20db",
                triplus: "\u2a39",
                trisb: "\u29cd",
                tritime: "\u2a3b",
                trpezium: "\u23e2",
                Tscr: "\ud835\udcaf",
                tscr: "\ud835\udcc9",
                TScy: "\u0426",
                tscy: "\u0446",
                TSHcy: "\u040b",
                tshcy: "\u045b",
                Tstrok: "\u0166",
                tstrok: "\u0167",
                twixt: "\u226c",
                twoheadleftarrow: "\u219e",
                twoheadrightarrow: "\u21a0",
                Uacute: "\xda",
                uacute: "\xfa",
                Uarr: "\u219f",
                uArr: "\u21d1",
                uarr: "\u2191",
                Uarrocir: "\u2949",
                Ubrcy: "\u040e",
                ubrcy: "\u045e",
                Ubreve: "\u016c",
                ubreve: "\u016d",
                Ucirc: "\xdb",
                ucirc: "\xfb",
                Ucy: "\u0423",
                ucy: "\u0443",
                udarr: "\u21c5",
                Udblac: "\u0170",
                udblac: "\u0171",
                udhar: "\u296e",
                ufisht: "\u297e",
                Ufr: "\ud835\udd18",
                ufr: "\ud835\udd32",
                Ugrave: "\xd9",
                ugrave: "\xf9",
                uHar: "\u2963",
                uharl: "\u21bf",
                uharr: "\u21be",
                uhblk: "\u2580",
                ulcorn: "\u231c",
                ulcorner: "\u231c",
                ulcrop: "\u230f",
                ultri: "\u25f8",
                Umacr: "\u016a",
                umacr: "\u016b",
                uml: "\xa8",
                UnderBar: "_",
                UnderBrace: "\u23df",
                UnderBracket: "\u23b5",
                UnderParenthesis: "\u23dd",
                Union: "\u22c3",
                UnionPlus: "\u228e",
                Uogon: "\u0172",
                uogon: "\u0173",
                Uopf: "\ud835\udd4c",
                uopf: "\ud835\udd66",
                UpArrow: "\u2191",
                Uparrow: "\u21d1",
                uparrow: "\u2191",
                UpArrowBar: "\u2912",
                UpArrowDownArrow: "\u21c5",
                UpDownArrow: "\u2195",
                Updownarrow: "\u21d5",
                updownarrow: "\u2195",
                UpEquilibrium: "\u296e",
                upharpoonleft: "\u21bf",
                upharpoonright: "\u21be",
                uplus: "\u228e",
                UpperLeftArrow: "\u2196",
                UpperRightArrow: "\u2197",
                Upsi: "\u03d2",
                upsi: "\u03c5",
                upsih: "\u03d2",
                Upsilon: "\u03a5",
                upsilon: "\u03c5",
                UpTee: "\u22a5",
                UpTeeArrow: "\u21a5",
                upuparrows: "\u21c8",
                urcorn: "\u231d",
                urcorner: "\u231d",
                urcrop: "\u230e",
                Uring: "\u016e",
                uring: "\u016f",
                urtri: "\u25f9",
                Uscr: "\ud835\udcb0",
                uscr: "\ud835\udcca",
                utdot: "\u22f0",
                Utilde: "\u0168",
                utilde: "\u0169",
                utri: "\u25b5",
                utrif: "\u25b4",
                uuarr: "\u21c8",
                Uuml: "\xdc",
                uuml: "\xfc",
                uwangle: "\u29a7",
                vangrt: "\u299c",
                varepsilon: "\u03f5",
                varkappa: "\u03f0",
                varnothing: "\u2205",
                varphi: "\u03d5",
                varpi: "\u03d6",
                varpropto: "\u221d",
                vArr: "\u21d5",
                varr: "\u2195",
                varrho: "\u03f1",
                varsigma: "\u03c2",
                varsubsetneq: "\u228a\ufe00",
                varsubsetneqq: "\u2acb\ufe00",
                varsupsetneq: "\u228b\ufe00",
                varsupsetneqq: "\u2acc\ufe00",
                vartheta: "\u03d1",
                vartriangleleft: "\u22b2",
                vartriangleright: "\u22b3",
                Vbar: "\u2aeb",
                vBar: "\u2ae8",
                vBarv: "\u2ae9",
                Vcy: "\u0412",
                vcy: "\u0432",
                VDash: "\u22ab",
                Vdash: "\u22a9",
                vDash: "\u22a8",
                vdash: "\u22a2",
                Vdashl: "\u2ae6",
                Vee: "\u22c1",
                vee: "\u2228",
                veebar: "\u22bb",
                veeeq: "\u225a",
                vellip: "\u22ee",
                Verbar: "\u2016",
                verbar: "|",
                Vert: "\u2016",
                vert: "|",
                VerticalBar: "\u2223",
                VerticalLine: "|",
                VerticalSeparator: "\u2758",
                VerticalTilde: "\u2240",
                VeryThinSpace: "\u200a",
                Vfr: "\ud835\udd19",
                vfr: "\ud835\udd33",
                vltri: "\u22b2",
                vnsub: "\u2282\u20d2",
                vnsup: "\u2283\u20d2",
                Vopf: "\ud835\udd4d",
                vopf: "\ud835\udd67",
                vprop: "\u221d",
                vrtri: "\u22b3",
                Vscr: "\ud835\udcb1",
                vscr: "\ud835\udccb",
                vsubnE: "\u2acb\ufe00",
                vsubne: "\u228a\ufe00",
                vsupnE: "\u2acc\ufe00",
                vsupne: "\u228b\ufe00",
                Vvdash: "\u22aa",
                vzigzag: "\u299a",
                Wcirc: "\u0174",
                wcirc: "\u0175",
                wedbar: "\u2a5f",
                Wedge: "\u22c0",
                wedge: "\u2227",
                wedgeq: "\u2259",
                weierp: "\u2118",
                Wfr: "\ud835\udd1a",
                wfr: "\ud835\udd34",
                Wopf: "\ud835\udd4e",
                wopf: "\ud835\udd68",
                wp: "\u2118",
                wr: "\u2240",
                wreath: "\u2240",
                Wscr: "\ud835\udcb2",
                wscr: "\ud835\udccc",
                xcap: "\u22c2",
                xcirc: "\u25ef",
                xcup: "\u22c3",
                xdtri: "\u25bd",
                Xfr: "\ud835\udd1b",
                xfr: "\ud835\udd35",
                xhArr: "\u27fa",
                xharr: "\u27f7",
                Xi: "\u039e",
                xi: "\u03be",
                xlArr: "\u27f8",
                xlarr: "\u27f5",
                xmap: "\u27fc",
                xnis: "\u22fb",
                xodot: "\u2a00",
                Xopf: "\ud835\udd4f",
                xopf: "\ud835\udd69",
                xoplus: "\u2a01",
                xotime: "\u2a02",
                xrArr: "\u27f9",
                xrarr: "\u27f6",
                Xscr: "\ud835\udcb3",
                xscr: "\ud835\udccd",
                xsqcup: "\u2a06",
                xuplus: "\u2a04",
                xutri: "\u25b3",
                xvee: "\u22c1",
                xwedge: "\u22c0",
                Yacute: "\xdd",
                yacute: "\xfd",
                YAcy: "\u042f",
                yacy: "\u044f",
                Ycirc: "\u0176",
                ycirc: "\u0177",
                Ycy: "\u042b",
                ycy: "\u044b",
                yen: "\xa5",
                Yfr: "\ud835\udd1c",
                yfr: "\ud835\udd36",
                YIcy: "\u0407",
                yicy: "\u0457",
                Yopf: "\ud835\udd50",
                yopf: "\ud835\udd6a",
                Yscr: "\ud835\udcb4",
                yscr: "\ud835\udcce",
                YUcy: "\u042e",
                yucy: "\u044e",
                Yuml: "\u0178",
                yuml: "\xff",
                Zacute: "\u0179",
                zacute: "\u017a",
                Zcaron: "\u017d",
                zcaron: "\u017e",
                Zcy: "\u0417",
                zcy: "\u0437",
                Zdot: "\u017b",
                zdot: "\u017c",
                zeetrf: "\u2128",
                ZeroWidthSpace: "\u200b",
                Zeta: "\u0396",
                zeta: "\u03b6",
                Zfr: "\u2128",
                zfr: "\ud835\udd37",
                ZHcy: "\u0416",
                zhcy: "\u0436",
                zigrarr: "\u21dd",
                Zopf: "\u2124",
                zopf: "\ud835\udd6b",
                Zscr: "\ud835\udcb5",
                zscr: "\ud835\udccf",
                zwj: "\u200d",
                zwnj: "\u200c"
            },
            ze = Object.prototype.hasOwnProperty,
            Ge = Object.prototype.hasOwnProperty,
            Ze = /\\([\\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g,
            Qe = /&([a-z#][a-z0-9]{1,31});/gi,
            Ke = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i,
            Je = /[&<>"]/,
            Xe = /[&<>"]/g,
            et = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;"
            },
            tt = Object.freeze({
                isString: r,
                has: n,
                assign: a,
                unescapeMd: o,
                isValidEntityCode: l,
                fromCodePoint: c,
                replaceEntities: h,
                escapeHtml: p
            }),
            it = {
                blockquote_open: function() {
                    return "<blockquote>\n"
                },
                blockquote_close: function(e, t) {
                    return "</blockquote>" + st(e, t)
                },
                code: function(e, t) {
                    return e[t].block ? "<pre><code>" + p(e[t].content) + "</code></pre>" + st(e, t) : "<code>" + p(e[t].content) + "</code>"
                },
                fence: function(e, t, i, s, r) {
                    var a, l, c = e[t],
                        u = "",
                        d = i.langPrefix;
                    if (c.params) {
                        if (l = (a = c.params.split(/\s+/g)).join(" "), n(r.rules.fence_custom, a[0])) return r.rules.fence_custom[a[0]](e, t, i, s, r);
                        u = ' class="' + d + p(h(o(l))) + '"'
                    }
                    return "<pre><code" + u + ">" + (i.highlight && i.highlight.apply(i.highlight, [c.content].concat(a)) || p(c.content)) + "</code></pre>" + st(e, t)
                },
                fence_custom: {},
                heading_open: function(e, t) {
                    return "<h" + e[t].hLevel + ">"
                },
                heading_close: function(e, t) {
                    return "</h" + e[t].hLevel + ">\n"
                },
                hr: function(e, t, i) {
                    return (i.xhtmlOut ? "<hr />" : "<hr>") + st(e, t)
                },
                bullet_list_open: function() {
                    return "<ul>\n"
                },
                bullet_list_close: function(e, t) {
                    return "</ul>" + st(e, t)
                },
                list_item_open: function() {
                    return "<li>"
                },
                list_item_close: function() {
                    return "</li>\n"
                },
                ordered_list_open: function(e, t) {
                    var i = e[t];
                    return "<ol" + (i.order > 1 ? ' start="' + i.order + '"' : "") + ">\n"
                },
                ordered_list_close: function(e, t) {
                    return "</ol>" + st(e, t)
                },
                paragraph_open: function(e, t) {
                    return e[t].tight ? "" : "<p>"
                },
                paragraph_close: function(e, t) {
                    var i = !(e[t].tight && t && "inline" === e[t - 1].type && !e[t - 1].content);
                    return (e[t].tight ? "" : "</p>") + (i ? st(e, t) : "")
                },
                link_open: function(e, t, i) {
                    var s = e[t].title ? ' title="' + p(h(e[t].title)) + '"' : "",
                        r = i.linkTarget ? ' target="' + i.linkTarget + '"' : "";
                    return '<a href="' + p(e[t].href) + '"' + s + r + ">"
                },
                link_close: function() {
                    return "</a>"
                },
                image: function(e, t, i) {
                    var s = ' src="' + p(e[t].src) + '"',
                        r = e[t].title ? ' title="' + p(h(e[t].title)) + '"' : "";
                    return "<img" + s + (' alt="' + (e[t].alt ? p(h(o(e[t].alt))) : "") + '"') + r + (i.xhtmlOut ? " /" : "") + ">"
                },
                table_open: function() {
                    return "<table>\n"
                },
                table_close: function() {
                    return "</table>\n"
                },
                thead_open: function() {
                    return "<thead>\n"
                },
                thead_close: function() {
                    return "</thead>\n"
                },
                tbody_open: function() {
                    return "<tbody>\n"
                },
                tbody_close: function() {
                    return "</tbody>\n"
                },
                tr_open: function() {
                    return "<tr>"
                },
                tr_close: function() {
                    return "</tr>\n"
                },
                th_open: function(e, t) {
                    var i = e[t];
                    return "<th" + (i.align ? ' style="text-align:' + i.align + '"' : "") + ">"
                },
                th_close: function() {
                    return "</th>"
                },
                td_open: function(e, t) {
                    var i = e[t];
                    return "<td" + (i.align ? ' style="text-align:' + i.align + '"' : "") + ">"
                },
                td_close: function() {
                    return "</td>"
                },
                strong_open: function() {
                    return "<strong>"
                },
                strong_close: function() {
                    return "</strong>"
                },
                em_open: function() {
                    return "<em>"
                },
                em_close: function() {
                    return "</em>"
                },
                del_open: function() {
                    return "<del>"
                },
                del_close: function() {
                    return "</del>"
                },
                ins_open: function() {
                    return "<ins>"
                },
                ins_close: function() {
                    return "</ins>"
                },
                mark_open: function() {
                    return "<mark>"
                },
                mark_close: function() {
                    return "</mark>"
                },
                sub: function(e, t) {
                    return "<sub>" + p(e[t].content) + "</sub>"
                },
                sup: function(e, t) {
                    return "<sup>" + p(e[t].content) + "</sup>"
                },
                hardbreak: function(e, t, i) {
                    return i.xhtmlOut ? "<br />\n" : "<br>\n"
                },
                softbreak: function(e, t, i) {
                    return i.breaks ? i.xhtmlOut ? "<br />\n" : "<br>\n" : "\n"
                },
                text: function(e, t) {
                    return p(e[t].content)
                },
                htmlblock: function(e, t) {
                    return e[t].content
                },
                htmltag: function(e, t) {
                    return e[t].content
                },
                abbr_open: function(e, t) {
                    return '<abbr title="' + p(h(e[t].title)) + '">'
                },
                abbr_close: function() {
                    return "</abbr>"
                },
                footnote_ref: function(e, t) {
                    var i = Number(e[t].id + 1).toString(),
                        s = "fnref" + i;
                    return e[t].subId > 0 && (s += ":" + e[t].subId), '<sup class="footnote-ref"><a href="#fn' + i + '" id="' + s + '">[' + i + "]</a></sup>"
                },
                footnote_block_open: function(e, t, i) {
                    return (i.xhtmlOut ? '<hr class="footnotes-sep" />\n' : '<hr class="footnotes-sep">\n') + '<section class="footnotes">\n<ol class="footnotes-list">\n'
                },
                footnote_block_close: function() {
                    return "</ol>\n</section>\n"
                },
                footnote_open: function(e, t) {
                    return '<li id="fn' + Number(e[t].id + 1).toString() + '"  class="footnote-item">'
                },
                footnote_close: function() {
                    return "</li>\n"
                },
                footnote_anchor: function(e, t) {
                    var i = "fnref" + Number(e[t].id + 1).toString();
                    return e[t].subId > 0 && (i += ":" + e[t].subId), ' <a href="#' + i + '" class="footnote-backref">\u21a9</a>'
                },
                dl_open: function() {
                    return "<dl>\n"
                },
                dt_open: function() {
                    return "<dt>"
                },
                dd_open: function() {
                    return "<dd>"
                },
                dl_close: function() {
                    return "</dl>\n"
                },
                dt_close: function() {
                    return "</dt>\n"
                },
                dd_close: function() {
                    return "</dd>\n"
                }
            },
            st = it.getBreak = function(e, t) {
                return (t = f(e, t)) < e.length && "list_item_close" === e[t].type ? "" : "\n"
            };
        m.prototype.renderInline = function(e, t, i) {
            for (var s = this.rules, r = e.length, n = 0, a = ""; r--;) a += s[e[n].type](e, n++, t, i, this);
            return a
        }, m.prototype.render = function(e, t, i) {
            for (var s = this.rules, r = e.length, n = -1, a = ""; ++n < r;) "inline" === e[n].type ? a += this.renderInline(e[n].children, t, i) : a += s[e[n].type](e, n, t, i, this);
            return a
        }, g.prototype.__find__ = function(e) {
            for (var t = this.__rules__.length, i = -1; t--;)
                if (this.__rules__[++i].name === e) return i;
            return -1
        }, g.prototype.__compile__ = function() {
            var e = this,
                t = [""];
            e.__rules__.forEach(function(e) {
                e.enabled && e.alt.forEach(function(e) {
                    t.indexOf(e) < 0 && t.push(e)
                })
            }), e.__cache__ = {}, t.forEach(function(t) {
                e.__cache__[t] = [], e.__rules__.forEach(function(i) {
                    i.enabled && (t && i.alt.indexOf(t) < 0 || e.__cache__[t].push(i.fn))
                })
            })
        }, g.prototype.at = function(e, t, i) {
            var s = this.__find__(e),
                r = i || {};
            if (-1 === s) throw new Error("Parser rule not found: " + e);
            this.__rules__[s].fn = t, this.__rules__[s].alt = r.alt || [], this.__cache__ = null
        }, g.prototype.before = function(e, t, i, s) {
            var r = this.__find__(e),
                n = s || {};
            if (-1 === r) throw new Error("Parser rule not found: " + e);
            this.__rules__.splice(r, 0, {
                name: t,
                enabled: !0,
                fn: i,
                alt: n.alt || []
            }), this.__cache__ = null
        }, g.prototype.after = function(e, t, i, s) {
            var r = this.__find__(e),
                n = s || {};
            if (-1 === r) throw new Error("Parser rule not found: " + e);
            this.__rules__.splice(r + 1, 0, {
                name: t,
                enabled: !0,
                fn: i,
                alt: n.alt || []
            }), this.__cache__ = null
        }, g.prototype.push = function(e, t, i) {
            var s = i || {};
            this.__rules__.push({
                name: e,
                enabled: !0,
                fn: t,
                alt: s.alt || []
            }), this.__cache__ = null
        }, g.prototype.enable = function(e, t) {
            e = Array.isArray(e) ? e : [e], t && this.__rules__.forEach(function(e) {
                e.enabled = !1
            }), e.forEach(function(e) {
                var t = this.__find__(e);
                if (t < 0) throw new Error("Rules manager: invalid rule name " + e);
                this.__rules__[t].enabled = !0
            }, this), this.__cache__ = null
        }, g.prototype.disable = function(e) {
            (e = Array.isArray(e) ? e : [e]).forEach(function(e) {
                var t = this.__find__(e);
                if (t < 0) throw new Error("Rules manager: invalid rule name " + e);
                this.__rules__[t].enabled = !1
            }, this), this.__cache__ = null
        }, g.prototype.getRules = function(e) {
            return null === this.__cache__ && this.__compile__(), this.__cache__[e] || []
        }, y.prototype.pushPending = function() {
            this.tokens.push({
                type: "text",
                content: this.pending,
                level: this.pendingLevel
            }), this.pending = ""
        }, y.prototype.push = function(e) {
            this.pending && this.pushPending(), this.tokens.push(e), this.pendingLevel = this.level
        }, y.prototype.cacheSet = function(e, t) {
            for (var i = this.cache.length; i <= e; i++) this.cache.push(0);
            this.cache[e] = t
        }, y.prototype.cacheGet = function(e) {
            return e < this.cache.length ? this.cache[e] : 0
        };
        var rt = " \n()[]'\".,!?-",
            nt = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/,
            at = /\((c|tm|r|p)\)/gi,
            ot = {
                c: "\xa9",
                r: "\xae",
                p: "\xa7",
                tm: "\u2122"
            },
            lt = /['"]/,
            ct = /['"]/g,
            ut = /[-\s()\[\]]/,
            ht = "\u2019",
            dt = [
                ["block", v],
                ["abbr", w],
                ["references", A],
                ["inline", D],
                ["footnote_tail", P],
                ["abbr2", T],
                ["replacements", F],
                ["smartquotes", L]
            ];
        O.prototype.process = function(e) {
            var t, i, s;
            for (t = 0, i = (s = this.ruler.getRules("")).length; t < i; t++) s[t](e)
        }, R.prototype.isEmpty = function(e) {
            return this.bMarks[e] + this.tShift[e] >= this.eMarks[e]
        }, R.prototype.skipEmptyLines = function(e) {
            for (var t = this.lineMax; e < t && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++);
            return e
        }, R.prototype.skipSpaces = function(e) {
            for (var t = this.src.length; e < t && 32 === this.src.charCodeAt(e); e++);
            return e
        }, R.prototype.skipChars = function(e, t) {
            for (var i = this.src.length; e < i && this.src.charCodeAt(e) === t; e++);
            return e
        }, R.prototype.skipCharsBack = function(e, t, i) {
            if (e <= i) return e;
            for (; e > i;)
                if (t !== this.src.charCodeAt(--e)) return e + 1;
            return e
        }, R.prototype.getLines = function(e, t, i, s) {
            var r, n, a, o, l, c = e;
            if (e >= t) return "";
            if (c + 1 === t) return n = this.bMarks[c] + Math.min(this.tShift[c], i), a = s ? this.eMarks[c] + 1 : this.eMarks[c], this.src.slice(n, a);
            for (o = new Array(t - e), r = 0; c < t; c++, r++)(l = this.tShift[c]) > i && (l = i), l < 0 && (l = 0), n = this.bMarks[c] + l, a = c + 1 < t || s ? this.eMarks[c] + 1 : this.eMarks[c], o[r] = this.src.slice(n, a);
            return o.join("")
        };
        var pt = {};
        ["article", "aside", "button", "blockquote", "body", "canvas", "caption", "col", "colgroup", "dd", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "iframe", "li", "map", "object", "ol", "output", "p", "pre", "progress", "script", "section", "style", "table", "tbody", "td", "textarea", "tfoot", "th", "tr", "thead", "ul", "video"].forEach(function(e) {
            pt[e] = !0
        });
        var ft = /^<([a-zA-Z]{1,15})[\s\/>]/,
            mt = /^<\/([a-zA-Z]{1,15})[\s>]/,
            gt = [
                ["code", B],
                ["fences", N, ["paragraph", "blockquote", "list"]],
                ["blockquote", U, ["paragraph", "blockquote", "list"]],
                ["hr", V, ["paragraph", "blockquote", "list"]],
                ["list", Y, ["paragraph", "blockquote"]],
                ["footnote", z, ["paragraph"]],
                ["heading", G, ["paragraph", "blockquote"]],
                ["lheading", Z],
                ["htmlblock", K, ["paragraph", "blockquote"]],
                ["table", X, ["paragraph"]],
                ["deflist", ie, ["paragraph"]],
                ["paragraph", se]
            ];
        re.prototype.tokenize = function(e, t, i) {
            for (var s, r = this.ruler.getRules(""), n = r.length, a = t, o = !1; a < i && (e.line = a = e.skipEmptyLines(a), !(a >= i)) && !(e.tShift[a] < e.blkIndent);) {
                for (s = 0; s < n && !r[s](e, a, i, !1); s++);
                if (e.tight = !o, e.isEmpty(e.line - 1) && (o = !0), (a = e.line) < i && e.isEmpty(a)) {
                    if (o = !0, ++a < i && "list" === e.parentType && e.isEmpty(a)) break;
                    e.line = a
                }
            }
        };
        var vt = /[\n\t]/g,
            yt = /\r[\n\u0085]|[\u2424\u2028\u0085]/g,
            bt = /\u00a0/g;
        re.prototype.parse = function(e, t, i, s) {
            var r, n = 0,
                a = 0;
            if (!e) return [];
            (e = (e = e.replace(bt, " ")).replace(yt, "\n")).indexOf("\t") >= 0 && (e = e.replace(vt, function(t, i) {
                var s;
                return 10 === e.charCodeAt(i) ? (n = i + 1, a = 0, t) : (s = "    ".slice((i - n - a) % 4), a = i - n + 1, s)
            })), r = new R(e, this, t, i, s), this.tokenize(r, r.line, r.lineMax)
        };
        for (var _t = [], wt = 0; wt < 256; wt++) _t.push(0);
        "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e) {
            _t[e.charCodeAt(0)] = 1
        });
        var kt = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g,
            $t = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g,
            xt = ["coap", "doi", "javascript", "aaa", "aaas", "about", "acap", "cap", "cid", "crid", "data", "dav", "dict", "dns", "file", "ftp", "geo", "go", "gopher", "h323", "http", "https", "iax", "icap", "im", "imap", "info", "ipp", "iris", "iris.beep", "iris.xpc", "iris.xpcs", "iris.lwz", "ldap", "mailto", "mid", "msrp", "msrps", "mtqp", "mupdate", "news", "nfs", "ni", "nih", "nntp", "opaquelocktoken", "pop", "pres", "rtsp", "service", "session", "shttp", "sieve", "sip", "sips", "sms", "snmp", "soap.beep", "soap.beeps", "tag", "tel", "telnet", "tftp", "thismessage", "tn3270", "tip", "tv", "urn", "vemmi", "ws", "wss", "xcon", "xcon-userid", "xmlrpc.beep", "xmlrpc.beeps", "xmpp", "z39.50r", "z39.50s", "adiumxtra", "afp", "afs", "aim", "apt", "attachment", "aw", "beshare", "bitcoin", "bolo", "callto", "chrome", "chrome-extension", "com-eventbrite-attendee", "content", "cvs", "dlna-playsingle", "dlna-playcontainer", "dtn", "dvb", "ed2k", "facetime", "feed", "finger", "fish", "gg", "git", "gizmoproject", "gtalk", "hcp", "icon", "ipn", "irc", "irc6", "ircs", "itms", "jar", "jms", "keyparc", "lastfm", "ldaps", "magnet", "maps", "market", "message", "mms", "ms-help", "msnim", "mumble", "mvn", "notes", "oid", "palm", "paparazzi", "platform", "proxy", "psyc", "query", "res", "resource", "rmi", "rsync", "rtmp", "secondlife", "sftp", "sgn", "skype", "smb", "soldat", "spotify", "ssh", "steam", "svn", "teamspeak", "things", "udp", "unreal", "ut2004", "ventrilo", "view-source", "webcal", "wtai", "wyciwyg", "xfire", "xri", "ymsgr"],
            Ct = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/,
            St = /^<([a-zA-Z.\-]{1,25}):([^<>\x00-\x20]*)>/,
            At = /[a-zA-Z_:][a-zA-Z0-9:._-]*/,
            Dt = /[^"'=<>`\x00-\x20]+/,
            Pt = /'[^']*'/,
            Mt = /"[^"]*"/,
            Tt = ke(/(?:unquoted|single_quoted|double_quoted)/)("unquoted", Dt)("single_quoted", Pt)("double_quoted", Mt)(),
            Et = ke(/(?:\s+attr_name(?:\s*=\s*attr_value)?)/)("attr_name", At)("attr_value", Tt)(),
            Ft = ke(/<[A-Za-z][A-Za-z0-9]*attribute*\s*\/?>/)("attribute", Et)(),
            jt = /<\/[A-Za-z][A-Za-z0-9]*\s*>/,
            It = /<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->/,
            Lt = /<[?].*?[?]>/,
            Ot = /<![A-Z]+\s+[^>]*>/,
            Rt = /<!\[CDATA\[[\s\S]*?\]\]>/,
            Bt = ke(/^(?:open_tag|close_tag|comment|processing|declaration|cdata)/)("open_tag", Ft)("close_tag", jt)("comment", It)("processing", Lt)("declaration", Ot)("cdata", Rt)(),
            Nt = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i,
            Ut = /^&([a-z][a-z0-9]{1,31});/i,
            Vt = [
                ["text", ae],
                ["newline", oe],
                ["escape", le],
                ["backticks", ce],
                ["del", ue],
                ["ins", he],
                ["mark", de],
                ["emphasis", me],
                ["sub", ge],
                ["sup", ve],
                ["links", ye],
                ["footnote_inline", be],
                ["footnote_ref", _e],
                ["autolink", we],
                ["htmltag", xe],
                ["entity", Ce]
            ];
        Se.prototype.skipToken = function(e) {
            var t, i, s = this.ruler.getRules(""),
                r = s.length,
                n = e.pos;
            if ((i = e.cacheGet(n)) > 0) e.pos = i;
            else {
                for (t = 0; t < r; t++)
                    if (s[t](e, !0)) return void e.cacheSet(n, e.pos);
                e.pos++, e.cacheSet(n, e.pos)
            }
        }, Se.prototype.tokenize = function(e) {
            for (var t, i, s = this.ruler.getRules(""), r = s.length, n = e.posMax; e.pos < n;) {
                for (i = 0; i < r && !(t = s[i](e, !1)); i++);
                if (t) {
                    if (e.pos >= n) break
                } else e.pending += e.src[e.pos++]
            }
            e.pending && e.pushPending()
        }, Se.prototype.parse = function(e, t, i, s) {
            var r = new y(e, this, t, i, s);
            this.tokenize(r)
        };
        var qt = {
            default: {
                options: {
                    html: !1,
                    xhtmlOut: !1,
                    breaks: !1,
                    langPrefix: "language-",
                    linkTarget: "",
                    typographer: !1,
                    quotes: "\u201c\u201d\u2018\u2019",
                    highlight: null,
                    maxNesting: 20
                },
                components: {
                    core: {
                        rules: ["block", "inline", "references", "replacements", "smartquotes", "references", "abbr2", "footnote_tail"]
                    },
                    block: {
                        rules: ["blockquote", "code", "fences", "footnote", "heading", "hr", "htmlblock", "lheading", "list", "paragraph", "table"]
                    },
                    inline: {
                        rules: ["autolink", "backticks", "del", "emphasis", "entity", "escape", "footnote_ref", "htmltag", "links", "newline", "text"]
                    }
                }
            },
            full: {
                options: {
                    html: !1,
                    xhtmlOut: !1,
                    breaks: !1,
                    langPrefix: "language-",
                    linkTarget: "",
                    typographer: !1,
                    quotes: "\u201c\u201d\u2018\u2019",
                    highlight: null,
                    maxNesting: 20
                },
                components: {
                    core: {},
                    block: {},
                    inline: {}
                }
            },
            commonmark: {
                options: {
                    html: !0,
                    xhtmlOut: !0,
                    breaks: !1,
                    langPrefix: "language-",
                    linkTarget: "",
                    typographer: !1,
                    quotes: "\u201c\u201d\u2018\u2019",
                    highlight: null,
                    maxNesting: 20
                },
                components: {
                    core: {
                        rules: ["block", "inline", "references", "abbr2"]
                    },
                    block: {
                        rules: ["blockquote", "code", "fences", "heading", "hr", "htmlblock", "lheading", "list", "paragraph"]
                    },
                    inline: {
                        rules: ["autolink", "backticks", "emphasis", "entity", "escape", "htmltag", "links", "newline", "text"]
                    }
                }
            }
        };
        Pe.prototype.set = function(e) {
            a(this.options, e)
        }, Pe.prototype.configure = function(e) {
            var t = this;
            if (!e) throw new Error("Wrong `remarkable` preset, check name/content");
            e.options && t.set(e.options), e.components && Object.keys(e.components).forEach(function(i) {
                e.components[i].rules && t[i].ruler.enable(e.components[i].rules, !0)
            })
        }, Pe.prototype.use = function(e, t) {
            return e(this, t), this
        }, Pe.prototype.parse = function(e, t) {
            var i = new De(this, e, t);
            return this.core.process(i), i.tokens
        }, Pe.prototype.render = function(e, t) {
            return t = t || {}, this.renderer.render(this.parse(e, t), this.options, t)
        }, Pe.prototype.parseInline = function(e, t) {
            var i = new De(this, e, t);
            return i.inlineMode = !0, this.core.process(i), i.tokens
        }, Pe.prototype.renderInline = function(e, t) {
            return t = t || {}, this.renderer.render(this.parseInline(e, t), this.options, t)
        };
        var Ht = function() {
                function e(e) {
                    void 0 === e && (e = {}), this.tagName = "", this.attrs = {}, this.innerHTML = "", this.whitespaceRegex = /\s+/, this.tagName = e.tagName || "", this.attrs = e.attrs || {}, this.innerHTML = e.innerHtml || e.innerHTML || ""
                }
                return e.prototype.setTagName = function(e) {
                    return this.tagName = e, this
                }, e.prototype.getTagName = function() {
                    return this.tagName || ""
                }, e.prototype.setAttr = function(e, t) {
                    return this.getAttrs()[e] = t, this
                }, e.prototype.getAttr = function(e) {
                    return this.getAttrs()[e]
                }, e.prototype.setAttrs = function(e) {
                    return Object.assign(this.getAttrs(), e), this
                }, e.prototype.getAttrs = function() {
                    return this.attrs || (this.attrs = {})
                }, e.prototype.setClass = function(e) {
                    return this.setAttr("class", e)
                }, e.prototype.addClass = function(e) {
                    for (var t, i = this.getClass(), s = this.whitespaceRegex, r = i ? i.split(s) : [], n = e.split(s); t = n.shift();) - 1 === Ee(r, t) && r.push(t);
                    return this.getAttrs().class = r.join(" "), this
                }, e.prototype.removeClass = function(e) {
                    for (var t, i = this.getClass(), s = this.whitespaceRegex, r = i ? i.split(s) : [], n = e.split(s); r.length && (t = n.shift());) {
                        var a = Ee(r, t); - 1 !== a && r.splice(a, 1)
                    }
                    return this.getAttrs().class = r.join(" "), this
                }, e.prototype.getClass = function() {
                    return this.getAttrs().class || ""
                }, e.prototype.hasClass = function(e) {
                    return -1 !== (" " + this.getClass() + " ").indexOf(" " + e + " ")
                }, e.prototype.setInnerHTML = function(e) {
                    return this.innerHTML = e, this
                }, e.prototype.setInnerHtml = function(e) {
                    return this.setInnerHTML(e)
                }, e.prototype.getInnerHTML = function() {
                    return this.innerHTML || ""
                }, e.prototype.getInnerHtml = function() {
                    return this.getInnerHTML()
                }, e.prototype.toAnchorString = function() {
                    var e = this.getTagName(),
                        t = this.buildAttrsStr();
                    return ["<", e, t = t ? " " + t : "", ">", this.getInnerHtml(), "</", e, ">"].join("")
                }, e.prototype.buildAttrsStr = function() {
                    if (!this.attrs) return "";
                    var e = this.getAttrs(),
                        t = [];
                    for (var i in e) e.hasOwnProperty(i) && t.push(i + '="' + e[i] + '"');
                    return t.join(" ")
                }, e
            }(),
            Wt = function() {
                function e(e) {
                    void 0 === e && (e = {}), this.newWindow = !1, this.truncate = {}, this.className = "", this.newWindow = e.newWindow || !1, this.truncate = e.truncate || {}, this.className = e.className || ""
                }
                return e.prototype.build = function(e) {
                    return new Ht({
                        tagName: "a",
                        attrs: this.createAttrs(e),
                        innerHtml: this.processAnchorText(e.getAnchorText())
                    })
                }, e.prototype.createAttrs = function(e) {
                    var t = {
                            href: e.getAnchorHref()
                        },
                        i = this.createCssClass(e);
                    return i && (t.class = i), this.newWindow && (t.target = "_blank", t.rel = "noopener noreferrer"), this.truncate && this.truncate.length && this.truncate.length < e.getAnchorText().length && (t.title = e.getAnchorHref()), t
                }, e.prototype.createCssClass = function(e) {
                    var t = this.className;
                    if (t) {
                        for (var i = [t], s = e.getCssClassSuffixes(), r = 0, n = s.length; r < n; r++) i.push(t + "-" + s[r]);
                        return i.join(" ")
                    }
                    return ""
                }, e.prototype.processAnchorText = function(e) {
                    return e = this.doTruncate(e)
                }, e.prototype.doTruncate = function(e) {
                    var t = this.truncate;
                    if (!t || !t.length) return e;
                    var i = t.length,
                        s = t.location;
                    return "smart" === s ? Le(e, i) : "middle" === s ? Oe(e, i) : Re(e, i)
                }, e
            }(),
            Yt = function() {
                function e(e) {
                    this.__jsduckDummyDocProp = null, this.matchedText = "", this.offset = 0, this.tagBuilder = e.tagBuilder, this.matchedText = e.matchedText, this.offset = e.offset
                }
                return e.prototype.getMatchedText = function() {
                    return this.matchedText
                }, e.prototype.setOffset = function(e) {
                    this.offset = e
                }, e.prototype.getOffset = function() {
                    return this.offset
                }, e.prototype.getCssClassSuffixes = function() {
                    return [this.getType()]
                }, e.prototype.buildTag = function() {
                    return this.tagBuilder.build(this)
                }, e
            }(),
            zt = function(e, t) {
                return zt = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
                }, zt(e, t)
            },
            Gt = function() {
                return Gt = Object.assign || function(e) {
                    for (var t, i = 1, s = arguments.length; i < s; i++)
                        for (var r in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    return e
                }, Gt.apply(this, arguments)
            },
            Zt = function(e) {
                function t(t) {
                    var i = e.call(this, t) || this;
                    return i.email = "", i.email = t.email, i
                }
                return Be(t, e), t.prototype.getType = function() {
                    return "email"
                }, t.prototype.getEmail = function() {
                    return this.email
                }, t.prototype.getAnchorHref = function() {
                    return "mailto:" + this.email
                }, t.prototype.getAnchorText = function() {
                    return this.email
                }, t
            }(Yt),
            Qt = function(e) {
                function t(t) {
                    var i = e.call(this, t) || this;
                    return i.serviceName = "", i.hashtag = "", i.serviceName = t.serviceName, i.hashtag = t.hashtag, i
                }
                return Be(t, e), t.prototype.getType = function() {
                    return "hashtag"
                }, t.prototype.getServiceName = function() {
                    return this.serviceName
                }, t.prototype.getHashtag = function() {
                    return this.hashtag
                }, t.prototype.getAnchorHref = function() {
                    var e = this.serviceName,
                        t = this.hashtag;
                    switch (e) {
                        case "twitter":
                            return "https://twitter.com/hashtag/" + t;
                        case "facebook":
                            return "https://www.facebook.com/hashtag/" + t;
                        case "instagram":
                            return "https://instagram.com/explore/tags/" + t;
                        default:
                            throw new Error("Unknown service name to point hashtag to: " + e)
                    }
                }, t.prototype.getAnchorText = function() {
                    return "#" + this.hashtag
                }, t
            }(Yt),
            Kt = function(e) {
                function t(t) {
                    var i = e.call(this, t) || this;
                    return i.serviceName = "twitter", i.mention = "", i.mention = t.mention, i.serviceName = t.serviceName, i
                }
                return Be(t, e), t.prototype.getType = function() {
                    return "mention"
                }, t.prototype.getMention = function() {
                    return this.mention
                }, t.prototype.getServiceName = function() {
                    return this.serviceName
                }, t.prototype.getAnchorHref = function() {
                    switch (this.serviceName) {
                        case "twitter":
                            return "https://twitter.com/" + this.mention;
                        case "instagram":
                            return "https://instagram.com/" + this.mention;
                        case "soundcloud":
                            return "https://soundcloud.com/" + this.mention;
                        default:
                            throw new Error("Unknown service name to point mention to: " + this.serviceName)
                    }
                }, t.prototype.getAnchorText = function() {
                    return "@" + this.mention
                }, t.prototype.getCssClassSuffixes = function() {
                    var t = e.prototype.getCssClassSuffixes.call(this),
                        i = this.getServiceName();
                    return i && t.push(i), t
                }, t
            }(Yt),
            Jt = function(e) {
                function t(t) {
                    var i = e.call(this, t) || this;
                    return i.number = "", i.plusSign = !1, i.number = t.number, i.plusSign = t.plusSign, i
                }
                return Be(t, e), t.prototype.getType = function() {
                    return "phone"
                }, t.prototype.getPhoneNumber = function() {
                    return this.number
                }, t.prototype.getNumber = function() {
                    return this.getPhoneNumber()
                }, t.prototype.getAnchorHref = function() {
                    return "tel:" + (this.plusSign ? "+" : "") + this.number
                }, t.prototype.getAnchorText = function() {
                    return this.matchedText
                }, t
            }(Yt),
            Xt = function(e) {
                function t(t) {
                    var i = e.call(this, t) || this;
                    return i.url = "", i.urlMatchType = "scheme", i.protocolUrlMatch = !1, i.protocolRelativeMatch = !1, i.stripPrefix = {
                        scheme: !0,
                        www: !0
                    }, i.stripTrailingSlash = !0, i.decodePercentEncoding = !0, i.schemePrefixRegex = /^(https?:\/\/)?/i, i.wwwPrefixRegex = /^(https?:\/\/)?(www\.)?/i, i.protocolRelativeRegex = /^\/\//, i.protocolPrepended = !1, i.urlMatchType = t.urlMatchType, i.url = t.url, i.protocolUrlMatch = t.protocolUrlMatch, i.protocolRelativeMatch = t.protocolRelativeMatch, i.stripPrefix = t.stripPrefix, i.stripTrailingSlash = t.stripTrailingSlash, i.decodePercentEncoding = t.decodePercentEncoding, i
                }
                return Be(t, e), t.prototype.getType = function() {
                    return "url"
                }, t.prototype.getUrlMatchType = function() {
                    return this.urlMatchType
                }, t.prototype.getUrl = function() {
                    var e = this.url;
                    return this.protocolRelativeMatch || this.protocolUrlMatch || this.protocolPrepended || (e = this.url = "http://" + e, this.protocolPrepended = !0), e
                }, t.prototype.getAnchorHref = function() {
                    return this.getUrl().replace(/&amp;/g, "&")
                }, t.prototype.getAnchorText = function() {
                    var e = this.getMatchedText();
                    return this.protocolRelativeMatch && (e = this.stripProtocolRelativePrefix(e)), this.stripPrefix.scheme && (e = this.stripSchemePrefix(e)), this.stripPrefix.www && (e = this.stripWwwPrefix(e)), this.stripTrailingSlash && (e = this.removeTrailingSlash(e)), this.decodePercentEncoding && (e = this.removePercentEncoding(e)), e
                }, t.prototype.stripSchemePrefix = function(e) {
                    return e.replace(this.schemePrefixRegex, "")
                }, t.prototype.stripWwwPrefix = function(e) {
                    return e.replace(this.wwwPrefixRegex, "$1")
                }, t.prototype.stripProtocolRelativePrefix = function(e) {
                    return e.replace(this.protocolRelativeRegex, "")
                }, t.prototype.removeTrailingSlash = function(e) {
                    return "/" === e.charAt(e.length - 1) && (e = e.slice(0, -1)), e
                }, t.prototype.removePercentEncoding = function(e) {
                    var t = e.replace(/%22/gi, "&quot;").replace(/%26/gi, "&amp;").replace(/%27/gi, "&#39;").replace(/%3C/gi, "&lt;").replace(/%3E/gi, "&gt;");
                    try {
                        return decodeURIComponent(t)
                    } catch (e) {
                        return t
                    }
                }, t
            }(Yt),
            ei = function() {
                function e(e) {
                    this.__jsduckDummyDocProp = null, this.tagBuilder = e.tagBuilder
                }
                return e
            }(),
            ti = /[A-Za-z]/,
            ii = /[0-9]/,
            si = /\s/,
            ri = /['"]/,
            ni = /[\x00-\x1F\x7F]/,
            ai = /A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC/.source,
            oi = /\u00a9\u00ae\u2000-\u3300\ud83c\ud000-\udfff\ud83d\ud000-\udfff\ud83e\ud000-\udfff/.source,
            li = /\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F/.source,
            ci = ai + oi + li,
            ui = /0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19/.source,
            hi = ci + ui,
            di = ci + ui,
            pi = "(?:[" + ui + "]{1,3}\\.){3}[" + ui + "]{1,3}",
            fi = "[" + di + "](?:[" + di + "\\-]{0,61}[" + di + "])?",
            mi = function(e) {
                return "(?=(" + fi + "))\\" + e
            },
            gi = function(e) {
                return "(?:" + mi(e) + "(?:\\." + mi(e + 1) + "){0,126}|" + pi + ")"
            },
            vi = new RegExp("[" + di + "]"),
            yi = /(?:xn--vermgensberatung-pwb|xn--vermgensberater-ctb|xn--clchc0ea0b2g2a9gcd|xn--w4r85el8fhu5dnra|northwesternmutual|travelersinsurance|verm\xf6gensberatung|xn--3oq18vl8pn36a|xn--5su34j936bgsg|xn--bck1b9a5dre4c|xn--mgbai9azgqp6j|xn--mgberp4a5d4ar|xn--xkc2dl3a5ee0h|verm\xf6gensberater|xn--fzys8d69uvgm|xn--mgba7c0bbn0a|xn--xkc2al3hye2a|americanexpress|kerryproperties|sandvikcoromant|xn--i1b6b1a6a2e|xn--kcrx77d1x4a|xn--lgbbat1ad8j|xn--mgba3a4f16a|xn--mgbaakc7dvf|xn--mgbc0a9azcg|xn--nqv7fs00ema|afamilycompany|americanfamily|bananarepublic|cancerresearch|cookingchannel|kerrylogistics|weatherchannel|xn--54b7fta0cc|xn--6qq986b3xl|xn--80aqecdr1a|xn--b4w605ferd|xn--fiq228c5hs|xn--h2breg3eve|xn--jlq61u9w7b|xn--mgba3a3ejt|xn--mgbaam7a8h|xn--mgbayh7gpa|xn--mgbb9fbpob|xn--mgbbh1a71e|xn--mgbca7dzdo|xn--mgbi4ecexp|xn--mgbx4cd0ab|xn--rvc1e0am3e|international|lifeinsurance|spreadbetting|travelchannel|wolterskluwer|xn--eckvdtc9d|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--h2brj9c8c|xn--tiq49xqyj|xn--yfro4i67o|xn--ygbi2ammx|construction|lplfinancial|scholarships|versicherung|xn--3e0b707e|xn--45br5cyl|xn--80adxhks|xn--80asehdb|xn--8y0a063a|xn--gckr3f0f|xn--mgb9awbf|xn--mgbab2bd|xn--mgbgu82a|xn--mgbpl2fh|xn--mgbt3dhd|xn--mk1bu44c|xn--ngbc5azd|xn--ngbe9e0a|xn--ogbpf8fl|xn--qcka1pmc|accountants|barclaycard|blackfriday|blockbuster|bridgestone|calvinklein|contractors|creditunion|engineering|enterprises|foodnetwork|investments|kerryhotels|lamborghini|motorcycles|olayangroup|photography|playstation|productions|progressive|redumbrella|rightathome|williamhill|xn--11b4c3d|xn--1ck2e1b|xn--1qqw23a|xn--2scrj9c|xn--3bst00m|xn--3ds443g|xn--3hcrj9c|xn--42c2d9a|xn--45brj9c|xn--55qw42g|xn--6frz82g|xn--80ao21a|xn--9krt00a|xn--cck2b3b|xn--czr694b|xn--d1acj3b|xn--efvy88h|xn--estv75g|xn--fct429k|xn--fjq720a|xn--flw351e|xn--g2xx48c|xn--gecrj9c|xn--gk3at1e|xn--h2brj9c|xn--hxt814e|xn--imr513n|xn--j6w193g|xn--jvr189m|xn--kprw13d|xn--kpry57d|xn--kpu716f|xn--mgbbh1a|xn--mgbtx2b|xn--mix891f|xn--nyqy26a|xn--otu796d|xn--pbt977c|xn--pgbs0dh|xn--q9jyb4c|xn--rhqv96g|xn--rovu88b|xn--s9brj9c|xn--ses554g|xn--t60b56a|xn--vuq861b|xn--w4rs40l|xn--xhq521b|xn--zfr164b|\u0b9a\u0bbf\u0b99\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0bc2\u0bb0\u0bcd|accountant|apartments|associates|basketball|bnpparibas|boehringer|capitalone|consulting|creditcard|cuisinella|eurovision|extraspace|foundation|healthcare|immobilien|industries|management|mitsubishi|nationwide|newholland|nextdirect|onyourside|properties|protection|prudential|realestate|republican|restaurant|schaeffler|swiftcover|tatamotors|technology|telefonica|university|vistaprint|vlaanderen|volkswagen|xn--30rr7y|xn--3pxu8k|xn--45q11c|xn--4gbrim|xn--55qx5d|xn--5tzm5g|xn--80aswg|xn--90a3ac|xn--9dbq2a|xn--9et52u|xn--c2br7g|xn--cg4bki|xn--czrs0t|xn--czru2d|xn--fiq64b|xn--fiqs8s|xn--fiqz9s|xn--io0a7i|xn--kput3i|xn--mxtq1m|xn--o3cw4h|xn--pssy2u|xn--unup4y|xn--wgbh1c|xn--wgbl6a|xn--y9a3aq|accenture|alfaromeo|allfinanz|amsterdam|analytics|aquarelle|barcelona|bloomberg|christmas|community|directory|education|equipment|fairwinds|financial|firestone|fresenius|frontdoor|fujixerox|furniture|goldpoint|hisamitsu|homedepot|homegoods|homesense|honeywell|institute|insurance|kuokgroup|ladbrokes|lancaster|landrover|lifestyle|marketing|marshalls|melbourne|microsoft|panasonic|passagens|pramerica|richardli|scjohnson|shangrila|solutions|statebank|statefarm|stockholm|travelers|vacations|xn--90ais|xn--c1avg|xn--d1alf|xn--e1a4c|xn--fhbei|xn--j1aef|xn--j1amh|xn--l1acc|xn--ngbrx|xn--nqv7f|xn--p1acf|xn--tckwe|xn--vhquv|yodobashi|abudhabi|airforce|allstate|attorney|barclays|barefoot|bargains|baseball|boutique|bradesco|broadway|brussels|budapest|builders|business|capetown|catering|catholic|chrysler|cipriani|cityeats|cleaning|clinique|clothing|commbank|computer|delivery|deloitte|democrat|diamonds|discount|discover|download|engineer|ericsson|esurance|etisalat|everbank|exchange|feedback|fidelity|firmdale|football|frontier|goodyear|grainger|graphics|guardian|hdfcbank|helsinki|holdings|hospital|infiniti|ipiranga|istanbul|jpmorgan|lighting|lundbeck|marriott|maserati|mckinsey|memorial|merckmsd|mortgage|movistar|observer|partners|pharmacy|pictures|plumbing|property|redstone|reliance|saarland|samsclub|security|services|shopping|showtime|softbank|software|stcgroup|supplies|symantec|training|uconnect|vanguard|ventures|verisign|woodside|xn--90ae|xn--node|xn--p1ai|xn--qxam|yokohama|\u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629|abogado|academy|agakhan|alibaba|android|athleta|auction|audible|auspost|avianca|banamex|bauhaus|bentley|bestbuy|booking|brother|bugatti|capital|caravan|careers|cartier|channel|charity|chintai|citadel|clubmed|college|cologne|comcast|company|compare|contact|cooking|corsica|country|coupons|courses|cricket|cruises|dentist|digital|domains|exposed|express|farmers|fashion|ferrari|ferrero|finance|fishing|fitness|flights|florist|flowers|forsale|frogans|fujitsu|gallery|genting|godaddy|grocery|guitars|hamburg|hangout|hitachi|holiday|hosting|hoteles|hotmail|hyundai|iselect|ismaili|jewelry|juniper|kitchen|komatsu|lacaixa|lancome|lanxess|lasalle|latrobe|leclerc|liaison|limited|lincoln|markets|metlife|monster|netbank|netflix|network|neustar|okinawa|oldnavy|organic|origins|philips|pioneer|politie|realtor|recipes|rentals|reviews|rexroth|samsung|sandvik|schmidt|schwarz|science|shiksha|shriram|singles|staples|starhub|storage|support|surgery|systems|temasek|theater|theatre|tickets|tiffany|toshiba|trading|walmart|wanggou|watches|weather|website|wedding|whoswho|windows|winners|xfinity|yamaxun|youtube|zuerich|\u043a\u0430\u0442\u043e\u043b\u0438\u043a|\u0627\u062a\u0635\u0627\u0644\u0627\u062a|\u0627\u0644\u062c\u0632\u0627\u0626\u0631|\u0627\u0644\u0639\u0644\u064a\u0627\u0646|\u067e\u0627\u06a9\u0633\u062a\u0627\u0646|\u0643\u0627\u062b\u0648\u0644\u064a\u0643|\u0645\u0648\u0628\u0627\u064a\u0644\u064a|\u0b87\u0ba8\u0bcd\u0ba4\u0bbf\u0baf\u0bbe|abarth|abbott|abbvie|active|africa|agency|airbus|airtel|alipay|alsace|alstom|anquan|aramco|author|bayern|beauty|berlin|bharti|blanco|bostik|boston|broker|camera|career|caseih|casino|center|chanel|chrome|church|circle|claims|clinic|coffee|comsec|condos|coupon|credit|cruise|dating|datsun|dealer|degree|dental|design|direct|doctor|dunlop|dupont|durban|emerck|energy|estate|events|expert|family|flickr|futbol|gallup|garden|george|giving|global|google|gratis|health|hermes|hiphop|hockey|hotels|hughes|imamat|insure|intuit|jaguar|joburg|juegos|kaufen|kinder|kindle|kosher|lancia|latino|lawyer|lefrak|living|locker|london|luxury|madrid|maison|makeup|market|mattel|mobile|mobily|monash|mormon|moscow|museum|mutual|nagoya|natura|nissan|nissay|norton|nowruz|office|olayan|online|oracle|orange|otsuka|pfizer|photos|physio|piaget|pictet|quebec|racing|realty|reisen|repair|report|review|rocher|rogers|ryukyu|safety|sakura|sanofi|school|schule|search|secure|select|shouji|soccer|social|stream|studio|supply|suzuki|swatch|sydney|taipei|taobao|target|tattoo|tennis|tienda|tjmaxx|tkmaxx|toyota|travel|unicom|viajes|viking|villas|virgin|vision|voting|voyage|vuelos|walter|warman|webcam|xihuan|yachts|yandex|zappos|\u043c\u043e\u0441\u043a\u0432\u0430|\u043e\u043d\u043b\u0430\u0439\u043d|\u0627\u0628\u0648\u0638\u0628\u064a|\u0627\u0631\u0627\u0645\u0643\u0648|\u0627\u0644\u0627\u0631\u062f\u0646|\u0627\u0644\u0645\u063a\u0631\u0628|\u0627\u0645\u0627\u0631\u0627\u062a|\u0641\u0644\u0633\u0637\u064a\u0646|\u0645\u0644\u064a\u0633\u064a\u0627|\u092d\u093e\u0930\u0924\u092e\u094d|\u0b87\u0bb2\u0b99\u0bcd\u0b95\u0bc8|\u30d5\u30a1\u30c3\u30b7\u30e7\u30f3|actor|adult|aetna|amfam|amica|apple|archi|audio|autos|azure|baidu|beats|bible|bingo|black|boats|bosch|build|canon|cards|chase|cheap|cisco|citic|click|cloud|coach|codes|crown|cymru|dabur|dance|deals|delta|dodge|drive|dubai|earth|edeka|email|epost|epson|faith|fedex|final|forex|forum|gallo|games|gifts|gives|glade|glass|globo|gmail|green|gripe|group|gucci|guide|homes|honda|horse|house|hyatt|ikano|intel|irish|iveco|jetzt|koeln|kyoto|lamer|lease|legal|lexus|lilly|linde|lipsy|lixil|loans|locus|lotte|lotto|lupin|macys|mango|media|miami|money|mopar|movie|nadex|nexus|nikon|ninja|nokia|nowtv|omega|osaka|paris|parts|party|phone|photo|pizza|place|poker|praxi|press|prime|promo|quest|radio|rehab|reise|ricoh|rocks|rodeo|rugby|salon|sener|seven|sharp|shell|shoes|skype|sling|smart|smile|solar|space|sport|stada|store|study|style|sucks|swiss|tatar|tires|tirol|tmall|today|tokyo|tools|toray|total|tours|trade|trust|tunes|tushu|ubank|vegas|video|vodka|volvo|wales|watch|weber|weibo|works|world|xerox|yahoo|zippo|\u0627\u06cc\u0631\u0627\u0646|\u0628\u0627\u0632\u0627\u0631|\u0628\u06be\u0627\u0631\u062a|\u0633\u0648\u062f\u0627\u0646|\u0633\u0648\u0631\u064a\u0629|\u0647\u0645\u0631\u0627\u0647|\u092d\u093e\u0930\u094b\u0924|\u0938\u0902\u0917\u0920\u0928|\u09ac\u09be\u0982\u09b2\u09be|\u0c2d\u0c3e\u0c30\u0c24\u0c4d|\u0d2d\u0d3e\u0d30\u0d24\u0d02|\u5609\u91cc\u5927\u9152\u5e97|aarp|able|adac|aero|aigo|akdn|ally|amex|arab|army|arpa|arte|asda|asia|audi|auto|baby|band|bank|bbva|beer|best|bike|bing|blog|blue|bofa|bond|book|buzz|cafe|call|camp|care|cars|casa|case|cash|cbre|cern|chat|citi|city|club|cool|coop|cyou|data|date|dclk|deal|dell|desi|diet|dish|docs|doha|duck|duns|dvag|erni|fage|fail|fans|farm|fast|fiat|fido|film|fire|fish|flir|food|ford|free|fund|game|gbiz|gent|ggee|gift|gmbh|gold|golf|goog|guge|guru|hair|haus|hdfc|help|here|hgtv|host|hsbc|icbc|ieee|imdb|immo|info|itau|java|jeep|jobs|jprs|kddi|kiwi|kpmg|kred|land|lego|lgbt|lidl|life|like|limo|link|live|loan|loft|love|ltda|luxe|maif|meet|meme|menu|mini|mint|mobi|moda|moto|name|navy|news|next|nico|nike|ollo|open|page|pars|pccw|pics|ping|pink|play|plus|pohl|porn|post|prod|prof|qpon|raid|read|reit|rent|rest|rich|rmit|room|rsvp|ruhr|safe|sale|sarl|save|saxo|scor|scot|seat|seek|sexy|shaw|shia|shop|show|silk|sina|site|skin|sncf|sohu|song|sony|spot|star|surf|talk|taxi|team|tech|teva|tiaa|tips|town|toys|tube|vana|visa|viva|vivo|vote|voto|wang|weir|wien|wiki|wine|work|xbox|yoga|zara|zero|zone|\u0434\u0435\u0442\u0438|\u0441\u0430\u0439\u0442|\u0628\u0627\u0631\u062a|\u0628\u064a\u062a\u0643|\u0680\u0627\u0631\u062a|\u062a\u0648\u0646\u0633|\u0634\u0628\u0643\u0629|\u0639\u0631\u0627\u0642|\u0639\u0645\u0627\u0646|\u0645\u0648\u0642\u0639|\u092d\u093e\u0930\u0924|\u09ad\u09be\u09b0\u09a4|\u09ad\u09be\u09f0\u09a4|\u0a2d\u0a3e\u0a30\u0a24|\u0aad\u0abe\u0ab0\u0aa4|\u0b2d\u0b3e\u0b30\u0b24|\u0cad\u0cbe\u0cb0\u0ca4|\u0dbd\u0d82\u0d9a\u0dcf|\u30b0\u30fc\u30b0\u30eb|\u30af\u30e9\u30a6\u30c9|\u30dd\u30a4\u30f3\u30c8|\u5927\u4f17\u6c7d\u8f66|\u7ec4\u7ec7\u673a\u6784|\u96fb\u8a0a\u76c8\u79d1|\u9999\u683c\u91cc\u62c9|aaa|abb|abc|aco|ads|aeg|afl|aig|anz|aol|app|art|aws|axa|bar|bbc|bbt|bcg|bcn|bet|bid|bio|biz|bms|bmw|bnl|bom|boo|bot|box|buy|bzh|cab|cal|cam|car|cat|cba|cbn|cbs|ceb|ceo|cfa|cfd|com|crs|csc|dad|day|dds|dev|dhl|diy|dnp|dog|dot|dtv|dvr|eat|eco|edu|esq|eus|fan|fit|fly|foo|fox|frl|ftr|fun|fyi|gal|gap|gdn|gea|gle|gmo|gmx|goo|gop|got|gov|hbo|hiv|hkt|hot|how|ibm|ice|icu|ifm|inc|ing|ink|int|ist|itv|jcb|jcp|jio|jll|jmp|jnj|jot|joy|kfh|kia|kim|kpn|krd|lat|law|lds|llc|lol|lpl|ltd|man|map|mba|med|men|mil|mit|mlb|mls|mma|moe|moi|mom|mov|msd|mtn|mtr|nab|nba|nec|net|new|nfl|ngo|nhk|now|nra|nrw|ntt|nyc|obi|off|one|ong|onl|ooo|org|ott|ovh|pay|pet|phd|pid|pin|pnc|pro|pru|pub|pwc|qvc|red|ren|ril|rio|rip|run|rwe|sap|sas|sbi|sbs|sca|scb|ses|sew|sex|sfr|ski|sky|soy|srl|srt|stc|tab|tax|tci|tdk|tel|thd|tjx|top|trv|tui|tvs|ubs|uno|uol|ups|vet|vig|vin|vip|wed|win|wme|wow|wtc|wtf|xin|xxx|xyz|you|yun|zip|\u0431\u0435\u043b|\u043a\u043e\u043c|\u049b\u0430\u0437|\u043c\u043a\u0434|\u043c\u043e\u043d|\u043e\u0440\u0433|\u0440\u0443\u0441|\u0441\u0440\u0431|\u0443\u043a\u0440|\u0570\u0561\u0575|\u05e7\u05d5\u05dd|\u0639\u0631\u0628|\u0642\u0637\u0631|\u0643\u0648\u0645|\u0645\u0635\u0631|\u0915\u0949\u092e|\u0928\u0947\u091f|\u0e04\u0e2d\u0e21|\u0e44\u0e17\u0e22|\u30b9\u30c8\u30a2|\u30bb\u30fc\u30eb|\u307f\u3093\u306a|\u4e2d\u6587\u7f51|\u5929\u4e3b\u6559|\u6211\u7231\u4f60|\u65b0\u52a0\u5761|\u6de1\u9a6c\u9521|\u8bfa\u57fa\u4e9a|\u98de\u5229\u6d66|ac|ad|ae|af|ag|ai|al|am|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw|\u03b5\u03bb|\u0431\u0433|\u0435\u044e|\u0440\u0444|\u10d2\u10d4|\ub2f7\ub137|\ub2f7\ucef4|\uc0bc\uc131|\ud55c\uad6d|\u30b3\u30e0|\u4e16\u754c|\u4e2d\u4fe1|\u4e2d\u56fd|\u4e2d\u570b|\u4f01\u4e1a|\u4f5b\u5c71|\u4fe1\u606f|\u5065\u5eb7|\u516b\u5366|\u516c\u53f8|\u516c\u76ca|\u53f0\u6e7e|\u53f0\u7063|\u5546\u57ce|\u5546\u5e97|\u5546\u6807|\u5609\u91cc|\u5728\u7ebf|\u5927\u62ff|\u5a31\u4e50|\u5bb6\u96fb|\u5de5\u884c|\u5e7f\u4e1c|\u5fae\u535a|\u6148\u5584|\u624b\u673a|\u624b\u8868|\u62db\u8058|\u653f\u52a1|\u653f\u5e9c|\u65b0\u95fb|\u65f6\u5c1a|\u66f8\u7c4d|\u673a\u6784|\u6e38\u620f|\u6fb3\u9580|\u70b9\u770b|\u73e0\u5b9d|\u79fb\u52a8|\u7f51\u5740|\u7f51\u5e97|\u7f51\u7ad9|\u7f51\u7edc|\u8054\u901a|\u8c37\u6b4c|\u8d2d\u7269|\u901a\u8ca9|\u96c6\u56e2|\u98df\u54c1|\u9910\u5385|\u9999\u6e2f)/,
            bi = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.localPartCharRegex = new RegExp("[" + di + "!#$%&'*+/=?^_`{|}~-]"), t.strictTldRegex = new RegExp("^" + yi.source + "$"), t
                }
                return Be(t, e), t.prototype.parseMatches = function(e) {
                    function t(e) {
                        "m" === e ? c(1) : p.test(e) && c()
                    }

                    function i(e, t) {
                        ":" === e ? p.test(t) ? (_ = 2, w = new _i(Gt({}, w, {
                            hasMailtoPrefix: !0
                        }))) : u() : y[e] === t || (p.test(t) ? _ = 2 : "." === t ? _ = 3 : "@" === t ? _ = 4 : u())
                    }

                    function s(e) {
                        "." === e ? _ = 3 : "@" === e ? _ = 4 : p.test(e) || u()
                    }

                    function r(e) {
                        "." === e || "@" === e ? u() : p.test(e) ? _ = 2 : u()
                    }

                    function n(e) {
                        vi.test(e) ? _ = 5 : u()
                    }

                    function a(e) {
                        "." === e ? _ = 7 : "-" === e ? _ = 6 : vi.test(e) || h()
                    }

                    function o(e) {
                        "-" === e || "." === e ? h() : vi.test(e) ? _ = 5 : h()
                    }

                    function l(e) {
                        "." === e || "-" === e ? h() : vi.test(e) ? (_ = 5, w = new _i(Gt({}, w, {
                            hasDomainDot: !0
                        }))) : h()
                    }

                    function c(e) {
                        void 0 === e && (e = 2), _ = e, w = new _i({
                            idx: b
                        })
                    }

                    function u() {
                        _ = 0, w = v
                    }

                    function h() {
                        function t(e) {
                            var t = (e.split(".").pop() || "").toLowerCase();
                            return f.test(t)
                        }
                        if (w.hasDomainDot) {
                            var i = e.slice(w.idx, b);
                            /[-.]$/.test(i) && (i = i.slice(0, -1));
                            var s = w.hasMailtoPrefix ? i.slice(7) : i;
                            t(s) && m.push(new Zt({
                                tagBuilder: d,
                                matchedText: i,
                                offset: w.idx,
                                email: s
                            }))
                        }
                        u()
                    }
                    for (var d = this.tagBuilder, p = this.localPartCharRegex, f = this.strictTldRegex, m = [], g = e.length, v = new _i, y = {
                            m: "a",
                            a: "i",
                            i: "l",
                            l: "t",
                            t: "o",
                            o: ":"
                        }, b = 0, _ = 0, w = v; b < g;) {
                        var k = e.charAt(b);
                        switch (_) {
                            case 0:
                                t(k);
                                break;
                            case 1:
                                i(e.charAt(b - 1), k);
                                break;
                            case 2:
                                s(k);
                                break;
                            case 3:
                                r(k);
                                break;
                            case 4:
                                n(k);
                                break;
                            case 5:
                                a(k);
                                break;
                            case 6:
                                o(k);
                                break;
                            case 7:
                                l(k);
                                break;
                            default:
                                Ie(_)
                        }
                        b++
                    }
                    return h(), m
                }, t
            }(ei),
            _i = function() {
                function e(e) {
                    void 0 === e && (e = {}), this.idx = void 0 !== e.idx ? e.idx : -1, this.hasMailtoPrefix = !!e.hasMailtoPrefix, this.hasDomainDot = !!e.hasDomainDot
                }
                return e
            }(),
            wi = function() {
                function e() {}
                return e.isValid = function(e, t) {
                    return !(t && !this.isValidUriScheme(t) || this.urlMatchDoesNotHaveProtocolOrDot(e, t) || this.urlMatchDoesNotHaveAtLeastOneWordChar(e, t) && !this.isValidIpAddress(e) || this.containsMultipleDots(e))
                }, e.isValidIpAddress = function(e) {
                    var t = new RegExp(this.hasFullProtocolRegex.source + this.ipRegex.source);
                    return null !== e.match(t)
                }, e.containsMultipleDots = function(e) {
                    var t = e;
                    return this.hasFullProtocolRegex.test(e) && (t = e.split("://")[1]), t.split("/")[0].indexOf("..") > -1
                }, e.isValidUriScheme = function(e) {
                    var t = e.match(this.uriSchemeRegex),
                        i = t && t[0].toLowerCase();
                    return "javascript:" !== i && "vbscript:" !== i
                }, e.urlMatchDoesNotHaveProtocolOrDot = function(e, t) {
                    return !(!e || t && this.hasFullProtocolRegex.test(t) || -1 !== e.indexOf("."))
                }, e.urlMatchDoesNotHaveAtLeastOneWordChar = function(e, t) {
                    return !(!e || !t) && !this.hasWordCharAfterProtocolRegex.test(e)
                }, e.hasFullProtocolRegex = /^[A-Za-z][-.+A-Za-z0-9]*:\/\//, e.uriSchemeRegex = /^[A-Za-z][-.+A-Za-z0-9]*:/, e.hasWordCharAfterProtocolRegex = new RegExp(":[^\\s]*?[" + ai + "]"), e.ipRegex = /[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?(:[0-9]*)?\/?$/, e
            }(),
            ki = function(e) {
                function t(t) {
                    var i, s, r, n = e.call(this, t) || this;
                    return n.stripPrefix = {
                        scheme: !0,
                        www: !0
                    }, n.stripTrailingSlash = !0, n.decodePercentEncoding = !0, n.matcherRegex = (i = /(?:[A-Za-z][-.+A-Za-z0-9]{0,63}:(?![A-Za-z][-.+A-Za-z0-9]{0,63}:\/\/)(?!\d+\/?)(?:\/\/)?)/, s = /(?:www\.)/, r = new RegExp("[/?#](?:[" + di + "\\-+&@#/%=~_()|'$*\\[\\]?!:,.;\u2713]*[" + di + "\\-+&@#/%=~_()|'$*\\[\\]\u2713])?"), new RegExp(["(?:", "(", i.source, gi(2), ")", "|", "(", "(//)?", s.source, gi(6), ")", "|", "(", "(//)?", gi(10) + "\\.", yi.source, "(?![-" + hi + "])", ")", ")", "(?::[0-9]+)?", "(?:" + r.source + ")?"].join(""), "gi")), n.wordCharRegExp = new RegExp("[" + di + "]"), n.stripPrefix = t.stripPrefix, n.stripTrailingSlash = t.stripTrailingSlash, n.decodePercentEncoding = t.decodePercentEncoding, n
                }
                return Be(t, e), t.prototype.parseMatches = function(e) {
                    for (var t, i = this.matcherRegex, s = this.stripPrefix, r = this.stripTrailingSlash, n = this.decodePercentEncoding, a = this.tagBuilder, o = [], l = function() {
                            var i = t[0],
                                l = t[1],
                                u = t[4],
                                h = t[5],
                                d = t[9],
                                p = t.index,
                                f = h || d,
                                m = e.charAt(p - 1);
                            if (!wi.isValid(i, l)) return "continue";
                            if (p > 0 && "@" === m) return "continue";
                            if (p > 0 && f && c.wordCharRegExp.test(m)) return "continue";
                            if (/\?$/.test(i) && (i = i.substr(0, i.length - 1)), c.matchHasUnbalancedClosingParen(i)) i = i.substr(0, i.length - 1);
                            else {
                                var g = c.matchHasInvalidCharAfterTld(i, l);
                                g > -1 && (i = i.substr(0, g))
                            }
                            var v = ["http://", "https://"].find(function(e) {
                                return !!l && -1 !== l.indexOf(e)
                            });
                            if (v) {
                                var y = i.indexOf(v);
                                i = i.substr(y), l = l.substr(y), p += y
                            }
                            var b = l ? "scheme" : u ? "www" : "tld",
                                _ = !!l;
                            o.push(new Xt({
                                tagBuilder: a,
                                matchedText: i,
                                offset: p,
                                urlMatchType: b,
                                url: i,
                                protocolUrlMatch: _,
                                protocolRelativeMatch: !!f,
                                stripPrefix: s,
                                stripTrailingSlash: r,
                                decodePercentEncoding: n
                            }))
                        }, c = this; null !== (t = i.exec(e));) l();
                    return o
                }, t.prototype.matchHasUnbalancedClosingParen = function(e) {
                    var t, i = e.charAt(e.length - 1);
                    if (")" === i) t = "(";
                    else {
                        if ("]" !== i) return !1;
                        t = "["
                    }
                    for (var s = 0, r = 0, n = e.length - 1; r < n; r++) {
                        var a = e.charAt(r);
                        a === t ? s++ : a === i && (s = Math.max(s - 1, 0))
                    }
                    return 0 === s
                }, t.prototype.matchHasInvalidCharAfterTld = function(e, t) {
                    if (!e) return -1;
                    var i = 0;
                    t && (i = e.indexOf(":"), e = e.slice(i));
                    var s = new RegExp("^((.?//)?[-." + di + "]*[-" + di + "]\\.[-" + di + "]+)").exec(e);
                    return null === s ? -1 : (i += s[1].length, e = e.slice(s[1].length), /^[^-.A-Za-z0-9:\/?#]/.test(e) ? i : -1)
                }, t
            }(ei),
            $i = function(e) {
                function t(t) {
                    var i = e.call(this, t) || this;
                    return i.serviceName = "twitter", i.matcherRegex = new RegExp("#[_" + di + "]{1,139}(?![_" + di + "])", "g"), i.nonWordCharRegex = new RegExp("[^" + di + "]"), i.serviceName = t.serviceName, i
                }
                return Be(t, e), t.prototype.parseMatches = function(e) {
                    for (var t, i = this.matcherRegex, s = this.nonWordCharRegex, r = this.serviceName, n = this.tagBuilder, a = []; null !== (t = i.exec(e));) {
                        var o = t.index,
                            l = e.charAt(o - 1);
                        if (0 === o || s.test(l)) {
                            var c = t[0],
                                u = t[0].slice(1);
                            a.push(new Qt({
                                tagBuilder: n,
                                matchedText: c,
                                offset: o,
                                serviceName: r,
                                hashtag: u
                            }))
                        }
                    }
                    return a
                }, t
            }(ei),
            xi = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.matcherRegex = /(?:(?:(?:(\+)?\d{1,3}[-\040.]?)?\(?\d{3}\)?[-\040.]?\d{3}[-\040.]?\d{4})|(?:(\+)(?:9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)[-\040.]?(?:\d[-\040.]?){6,12}\d+))([,;]+[0-9]+#?)*/g, t
                }
                return Be(t, e), t.prototype.parseMatches = function(e) {
                    for (var t, i = this.matcherRegex, s = this.tagBuilder, r = []; null !== (t = i.exec(e));) {
                        var n = t[0],
                            a = n.replace(/[^0-9,;#]/g, ""),
                            o = !(!t[1] && !t[2]),
                            l = 0 == t.index ? "" : e.substr(t.index - 1, 1),
                            c = e.substr(t.index + n.length, 1),
                            u = !l.match(/\d/) && !c.match(/\d/);
                        this.testMatch(t[3]) && this.testMatch(n) && u && r.push(new Jt({
                            tagBuilder: s,
                            matchedText: n,
                            offset: t.index,
                            number: a,
                            plusSign: o
                        }))
                    }
                    return r
                }, t.prototype.testMatch = function(e) {
                    return /\D/.test(e)
                }, t
            }(ei),
            Ci = function(e) {
                function t(t) {
                    var i = e.call(this, t) || this;
                    return i.serviceName = "twitter", i.matcherRegexes = {
                        twitter: new RegExp("@[_" + di + "]{1,50}(?![_" + di + "])", "g"),
                        instagram: new RegExp("@[_." + di + "]{1,30}(?![_" + di + "])", "g"),
                        soundcloud: new RegExp("@[-_." + di + "]{1,50}(?![-_" + di + "])", "g")
                    }, i.nonWordCharRegex = new RegExp("[^" + di + "]"), i.serviceName = t.serviceName, i
                }
                return Be(t, e), t.prototype.parseMatches = function(e) {
                    var t, i = this.serviceName,
                        s = this.matcherRegexes[this.serviceName],
                        r = this.nonWordCharRegex,
                        n = this.tagBuilder,
                        a = [];
                    if (!s) return a;
                    for (; null !== (t = s.exec(e));) {
                        var o = t.index,
                            l = e.charAt(o - 1);
                        if (0 === o || r.test(l)) {
                            var c = t[0].replace(/\.+$/g, ""),
                                u = c.slice(1);
                            a.push(new Kt({
                                tagBuilder: n,
                                matchedText: c,
                                offset: o,
                                serviceName: i,
                                mention: u
                            }))
                        }
                    }
                    return a
                }, t
            }(ei),
            Si = function() {
                function e(e) {
                    void 0 === e && (e = {}), this.idx = void 0 !== e.idx ? e.idx : -1, this.type = e.type || "tag", this.name = e.name || "", this.isOpening = !!e.isOpening, this.isClosing = !!e.isClosing
                }
                return e
            }(),
            Ai = function() {
                function e(t) {
                    void 0 === t && (t = {}), this.version = e.version, this.urls = {}, this.email = !0, this.phone = !0, this.hashtag = !1, this.mention = !1, this.newWindow = !0, this.stripPrefix = {
                        scheme: !0,
                        www: !0
                    }, this.stripTrailingSlash = !0, this.decodePercentEncoding = !0, this.truncate = {
                        length: 0,
                        location: "end"
                    }, this.className = "", this.replaceFn = null, this.context = void 0, this.matchers = null, this.tagBuilder = null, this.urls = this.normalizeUrlsCfg(t.urls), this.email = "boolean" == typeof t.email ? t.email : this.email, this.phone = "boolean" == typeof t.phone ? t.phone : this.phone, this.hashtag = t.hashtag || this.hashtag, this.mention = t.mention || this.mention, this.newWindow = "boolean" == typeof t.newWindow ? t.newWindow : this.newWindow, this.stripPrefix = this.normalizeStripPrefixCfg(t.stripPrefix), this.stripTrailingSlash = "boolean" == typeof t.stripTrailingSlash ? t.stripTrailingSlash : this.stripTrailingSlash, this.decodePercentEncoding = "boolean" == typeof t.decodePercentEncoding ? t.decodePercentEncoding : this.decodePercentEncoding;
                    var i = this.mention;
                    if (!1 !== i && "twitter" !== i && "instagram" !== i && "soundcloud" !== i) throw new Error("invalid `mention` cfg - see docs");
                    var s = this.hashtag;
                    if (!1 !== s && "twitter" !== s && "facebook" !== s && "instagram" !== s) throw new Error("invalid `hashtag` cfg - see docs");
                    this.truncate = this.normalizeTruncateCfg(t.truncate), this.className = t.className || this.className, this.replaceFn = t.replaceFn || this.replaceFn, this.context = t.context || this
                }
                return e.link = function(t, i) {
                    return new e(i).link(t)
                }, e.parse = function(t, i) {
                    return new e(i).parse(t)
                }, e.prototype.normalizeUrlsCfg = function(e) {
                    return null == e && (e = !0), "boolean" == typeof e ? {
                        schemeMatches: e,
                        wwwMatches: e,
                        tldMatches: e
                    } : {
                        schemeMatches: "boolean" != typeof e.schemeMatches || e.schemeMatches,
                        wwwMatches: "boolean" != typeof e.wwwMatches || e.wwwMatches,
                        tldMatches: "boolean" != typeof e.tldMatches || e.tldMatches
                    }
                }, e.prototype.normalizeStripPrefixCfg = function(e) {
                    return null == e && (e = !0), "boolean" == typeof e ? {
                        scheme: e,
                        www: e
                    } : {
                        scheme: "boolean" != typeof e.scheme || e.scheme,
                        www: "boolean" != typeof e.www || e.www
                    }
                }, e.prototype.normalizeTruncateCfg = function(e) {
                    return "number" == typeof e ? {
                        length: e,
                        location: "end"
                    } : Me(e || {}, {
                        length: Number.POSITIVE_INFINITY,
                        location: "end"
                    })
                }, e.prototype.parse = function(e) {
                    var t = this,
                        i = ["a", "style", "script"],
                        s = 0,
                        r = [];
                    return Ne(e, {
                        onOpenTag: function(e) {
                            i.indexOf(e) >= 0 && s++
                        },
                        onText: function(e, i) {
                            if (0 === s) {
                                var n = je(e, /(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;|&quot;|&#34;|&#39;)/gi),
                                    a = i;
                                n.forEach(function(e, i) {
                                    if (i % 2 == 0) {
                                        var s = t.parseText(e, a);
                                        r.push.apply(r, s)
                                    }
                                    a += e.length
                                })
                            }
                        },
                        onCloseTag: function(e) {
                            i.indexOf(e) >= 0 && (s = Math.max(s - 1, 0))
                        },
                        onComment: function() {},
                        onDoctype: function() {}
                    }), r = this.compactMatches(r), r = this.removeUnwantedMatches(r)
                }, e.prototype.compactMatches = function(e) {
                    e.sort(function(e, t) {
                        return e.getOffset() - t.getOffset()
                    });
                    for (var t = 0; t < e.length - 1; t++) {
                        var i = e[t],
                            s = i.getOffset(),
                            r = i.getMatchedText().length,
                            n = s + r;
                        if (t + 1 < e.length) {
                            if (e[t + 1].getOffset() === s) {
                                var a = e[t + 1].getMatchedText().length > r ? t : t + 1;
                                e.splice(a, 1);
                                continue
                            }
                            e[t + 1].getOffset() < n && e.splice(t + 1, 1)
                        }
                    }
                    return e
                }, e.prototype.removeUnwantedMatches = function(e) {
                    return this.hashtag || Fe(e, function(e) {
                        return "hashtag" === e.getType()
                    }), this.email || Fe(e, function(e) {
                        return "email" === e.getType()
                    }), this.phone || Fe(e, function(e) {
                        return "phone" === e.getType()
                    }), this.mention || Fe(e, function(e) {
                        return "mention" === e.getType()
                    }), this.urls.schemeMatches || Fe(e, function(e) {
                        return "url" === e.getType() && "scheme" === e.getUrlMatchType()
                    }), this.urls.wwwMatches || Fe(e, function(e) {
                        return "url" === e.getType() && "www" === e.getUrlMatchType()
                    }), this.urls.tldMatches || Fe(e, function(e) {
                        return "url" === e.getType() && "tld" === e.getUrlMatchType()
                    }), e
                }, e.prototype.parseText = function(e, t) {
                    void 0 === t && (t = 0), t = t || 0;
                    for (var i = this.getMatchers(), s = [], r = 0, n = i.length; r < n; r++) {
                        for (var a = i[r].parseMatches(e), o = 0, l = a.length; o < l; o++) a[o].setOffset(t + a[o].getOffset());
                        s.push.apply(s, a)
                    }
                    return s
                }, e.prototype.link = function(e) {
                    if (!e) return "";
                    for (var t = this.parse(e), i = [], s = 0, r = 0, n = t.length; r < n; r++) {
                        var a = t[r];
                        i.push(e.substring(s, a.getOffset())), i.push(this.createMatchReturnVal(a)), s = a.getOffset() + a.getMatchedText().length
                    }
                    return i.push(e.substring(s)), i.join("")
                }, e.prototype.createMatchReturnVal = function(e) {
                    var t;
                    return this.replaceFn && (t = this.replaceFn.call(this.context, e)), "string" == typeof t ? t : !1 === t ? e.getMatchedText() : t instanceof Ht ? t.toAnchorString() : e.buildTag().toAnchorString()
                }, e.prototype.getMatchers = function() {
                    if (this.matchers) return this.matchers;
                    var e = this.getTagBuilder(),
                        t = [new $i({
                            tagBuilder: e,
                            serviceName: this.hashtag
                        }), new bi({
                            tagBuilder: e
                        }), new xi({
                            tagBuilder: e
                        }), new Ci({
                            tagBuilder: e,
                            serviceName: this.mention
                        }), new ki({
                            tagBuilder: e,
                            stripPrefix: this.stripPrefix,
                            stripTrailingSlash: this.stripTrailingSlash,
                            decodePercentEncoding: this.decodePercentEncoding
                        })];
                    return this.matchers = t
                }, e.prototype.getTagBuilder = function() {
                    var e = this.tagBuilder;
                    return e || (e = this.tagBuilder = new Wt({
                        newWindow: this.newWindow,
                        truncate: this.truncate,
                        className: this.className
                    })), e
                }, e.version = "3.11.0", e.AnchorTagBuilder = Wt, e.HtmlTag = Ht, e.matcher = {
                    Email: bi,
                    Hashtag: $i,
                    Matcher: ei,
                    Mention: Ci,
                    Phone: xi,
                    Url: ki
                }, e.match = {
                    Email: Zt,
                    Hashtag: Qt,
                    Match: Yt,
                    Mention: Kt,
                    Phone: Jt,
                    Url: Xt
                }, e
            }(),
            Di = /www|@|\:\/\//;
        e.Remarkable = Pe, e.linkify = We, e.utils = tt, Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }), Views.MarkdownPreview = class {
        constructor(e) {
            this.$input = e.find(`.${e.data("input")}`), this.$output = e.find(`.${e.data("output")}`), this.$radioControls = e.find(`input[type=radio][name=${e.data("radioControls")}]`), this.remarkableParser = this._setupRemarkable(), this.$input.on("change", this.handleInputChange.bind(this)), this.$radioControls.on("change", this.handleControlsChange.bind(this))
        }
        _setupRemarkable() {
            const e = {
                    html: !1,
                    xhtmlOut: !1,
                    breaks: !1,
                    langPrefix: "language-",
                    linkify: !1,
                    typographer: !0,
                    quotes: "\u201c\u201d\u2018\u2019"
                },
                t = new remarkable.Remarkable(e);
            return t.block.ruler.disable(["code", "fences", "blockquote", "hr", "list", "footnote", "heading", "lheading", "htmlblock", "table", "deflist", "paragraph"]), t.inline.ruler.disable(["text", "newline", "escape", "backticks", "del", "ins", "mark", "emphasis", "sub", "sup", "links", "footnote_inline", "footnote_ref", "autolink", "htmltag", "entity"]), t.block.ruler.enable(["list", "paragraph"]), t.inline.ruler.enable(["text", "newline", "escape", "emphasis"]), t
        }
        handleInputChange(e) {
            this._updateOutput(e.target.value)
        }
        _updateOutput(e) {
            const t = this.remarkableParser.render(e);
            this.$output.html(t)
        }
        handleControlsChange(e) {
            const t = "is-visually-hidden";
            "Preview" === e.target.value ? (this.$input.addClass(t), this.$output.removeClass(t)) : (this.$input.removeClass(t), this.$output.addClass(t))
        }
    }, Views.PerformingRightsOrganization = class {
        constructor(e) {
            this.dom = {
                $form: e.find("form"),
                $errorMessages: e.find(".error-messages"),
                $proToggleContent: e.find(".js-performing-rights-organization__select, .js-performing-rights-organization__attributes_copy"),
                $proConfirmRadios: e.find(".js-.performing-rights-organization__affiliation").find("input:radio")
            }, this.dom.$form.validate({
                errorElement: "p",
                errorLabelContainer: ".error-messages",
                rules: {
                    "user_performing_rights_organization_form[affiliated]": {
                        required: !0
                    },
                    "user_performing_rights_organization_form[affiliated_organization]": {
                        required: () => this.isProSelected()
                    }
                }
            }), this.dom.$proConfirmRadios.on("change", this.handleProConfirmRadioChange.bind(this)), this.dom.$proConfirmRadios.each((e, t) => {
                "true" === t.value && t.checked && this.showProToggleContent()
            })
        }
        handleProConfirmRadioChange(e) {
            "true" === e.currentTarget.value ? this.showProToggleContent() : this.hideProToggleContent()
        }
        showProToggleContent() {
            this.dom.$proToggleContent.removeClass("is-hidden")
        }
        hideProToggleContent() {
            this.dom.$proToggleContent.addClass("is-hidden")
        }
        isProSelected() {
            return 0 !== this.dom.$proConfirmRadios.filter('[value="true"]:checked').length
        }
    };
const toggle = function(e, t, i) {
        t ? "disable" === i ? e.find("input,textarea,select,button,.btn").prop("disabled", !1) : e.show() : "disable" === i ? e.find("input,textarea,select,button,.btn").prop("disabled", !0) : e.hide()
    },
    showOrHideDependentFieldsSelect = function(e) {
        const t = $(this),
            i = function() {
                const i = $(this),
                    s = _.contains(i.attr("data-option-value").split("|"), t.val());
                toggle(i, s, i.data("method"), e || "fast")
            };
        $(`.js-dependent-fields[data-select-id=${t.attr("id")}]`).each(i)
    },
    showOrHideDependentFieldsCheckbox = function(e) {
        const t = $(this),
            i = function() {
                const i = $(this),
                    s = i.data("checkbox-value") === t.is(":checked");
                toggle(i, s, i.data("method"), e || "fast")
            };
        $(`.js-dependent-fields[data-checkbox-id=${t.attr("id")}]`).each(i)
    },
    showOrHideDependentFieldsRadio = function(e) {
        const t = $(this),
            i = function() {
                const i = $(this),
                    s = $(`input:checked[name=${t.attr("name").replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")}]`),
                    r = _.contains(i.attr("data-radio-value").split("|"), s.val());
                toggle(i, r, i.data("method"), e || "fast")
            };
        $(`.js-dependent-fields[data-radio-name=${t.attr("name").replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")}]`).each(i)
    },
    bind = function() {
        const e = $("select");
        e.not("[data-important]").each(_.partial(showOrHideDependentFieldsSelect, 0)), e.filter("[data-important]").each(_.partial(showOrHideDependentFieldsSelect, 0)), e.change(showOrHideDependentFieldsSelect);
        const t = $("input[type=checkbox]");
        t.not("[data-important]").each(_.partial(showOrHideDependentFieldsCheckbox, 0)), t.filter("[data-important]").each(_.partial(showOrHideDependentFieldsCheckbox, 0)), t.change(showOrHideDependentFieldsCheckbox);
        const i = $("input[type=radio]");
        i.not("[data-important]").each(_.partial(showOrHideDependentFieldsRadio, 0)), i.filter("[data-important]").each(_.partial(showOrHideDependentFieldsRadio, 0)), i.change(showOrHideDependentFieldsRadio)
    };
Market.DOMUtils.DependentFields = {
    bind: bind
}, Views.PersonalInformation = class {
    constructor(e) {
        this.$el = e, Market.DOMUtils.DependentFields.bind(), this.dom = {
            $salesTaxCountryHint: this.$el.find(".js-callout-hint.sales-tax-country-callout-hint"),
            $salesTaxRegionHint: this.$el.find(".js-callout-hint.sales-tax-region-callout-hint"),
            $countryCode: this.$el.find(".js-personal-info__country-selector"),
            $countrySubdivision: this.$el.find(".js-personal-info__country-subdivision"),
            $subdivisions: this.$el.find(".js-personal-info__subdivisions"),
            $subdivisionField: this.$el.find(".js-personal-info__subdivision-code"),
            $companyNumberLabel: this.$el.find(".js-personal-info__company_number_label"),
            $companyNumberField: this.$el.find(".js-personal-info__company_number"),
            $salesTaxGroup: this.$el.find(".js-personal-info__sales_tax_number-input-group"),
            $salesTaxInput: this.$el.find(".js-personal-info__sales_tax_number-input"),
            $jurisdictionTaxCode: this.$el.find(".js-personal-info__jurisdiction_tax_code"),
            $salesTaxExample: this.$el.find(".js-personal-info__sales_tax_number-example"),
            $salesTaxLabel: this.$el.find(".js-personal-info__sales_tax_number-local-lang")
        }, this.initialSalesTaxNumber = this.dom.$salesTaxInput.val(), this.dom.$countryCode.on("change.handleCountryChange", this.handleCountryChange.bind(this)), this.dom.$countrySubdivision.on("change", () => {
            this.handleCountrySubdivisionChange(), this.updateCountrySubdivisionField()
        }), this.dom.$salesTaxInput.on("change", this.updateJurisdictionTaxCode.bind(this)), this.dom.$subdivisions.removeClass("is-hidden--js"), this.updateCountrySubdivisions(), this.updateSalesTax(), this.updateCompanyNumberLabel()
    }
    handleCountryChange(e) {
        this.updateCountrySubdivisions(), this.handleCountrySubdivisionChange(), this.updateCountrySubdivisionField(), this.updateSalesTax();
        const t = this.dom.$companyNumberLabel.text();
        this.updateCompanyNumberLabel();
        this.dom.$companyNumberLabel.text() !== t && this.dom.$companyNumberField.val("")
    }
    handleCountrySubdivisionChange(e) {
        this.updateSalesTax()
    }
    toggleTaxHint() {
        const e = this._salesTaxNumberEnabled(),
            t = this._isCountryBasedSalesTaxNumber(),
            i = e && !t;
        this.dom.$salesTaxCountryHint.toggleClass("is-visible", t), this.dom.$salesTaxRegionHint.toggleClass("is-visible", i)
    }
    updateCountrySubdivisions(e) {
        const t = this.dom.$countryCode.val(),
            i = this.dom.$countrySubdivision.filter(`[data-show-for='${t}']`);
        this.dom.$countrySubdivision.hide(), this.dom.$subdivisionField.hide(), 0 === i.length ? this.dom.$subdivisionField.show() : i.show()
    }
    updateCountrySubdivisionField(e) {
        const t = this.dom.$countryCode.val(),
            i = this.dom.$countrySubdivision.filter(`[data-show-for='${t}']`).find(":selected");
        this.dom.$subdivisionField.val(i.val())
    }
    updateCompanyNumberLabel(e) {
        let t = "Company No.";
        "AU" === this.dom.$countryCode.val() && (t = "ABN"), this.dom.$companyNumberLabel.html(t)
    }
    updateSalesTax() {
        this._getCountrySubdivisionData();
        const e = this._salesTaxNumberEnabled();
        if (this.dom.$salesTaxGroup.toggleClass("is-hidden--js", !e), e) {
            const e = this._jurisdictionTaxCode(),
                t = this._salesTaxNumberExample(),
                i = this._salesTaxNumberLabel();
            this.dom.$jurisdictionTaxCode.val(e), this.dom.$salesTaxExample.text(t), this.dom.$salesTaxLabel.text(i)
        }
        this.updateSalesTaxNumberFieldValue(), this.updateJurisdictionTaxCode(), this.toggleTaxHint()
    }
    updateSalesTaxNumberFieldValue() {
        const e = this._salesTaxNumberEnabled(),
            t = this._defaultSalesTaxNumber();
        if (e) {
            if (!t || this.initialSalesTaxNumber) return this.dom.$salesTaxInput.val(this.initialSalesTaxNumber);
            this.dom.$salesTaxInput.val(t)
        } else this.dom.$salesTaxInput.val("")
    }
    updateJurisdictionTaxCode() {
        this._getCountrySubdivisionData();
        const e = this._jurisdictionTaxCode(),
            t = this._salesTaxNumberEnabled(),
            i = !!this.dom.$salesTaxInput.val();
        t && i ? this.dom.$jurisdictionTaxCode.val(e) : this.dom.$jurisdictionTaxCode.val("")
    }
    _isCountryBasedSalesTaxNumber() {
        return this._getCountryData(), this.countryData && !0 === this.countryData.enableSalesTaxNumber
    }
    _defaultSalesTaxNumber() {
        return this.countrySubdivisionData.defaultSalesTaxNumber
    }
    _jurisdictionTaxCode() {
        return this.countrySubdivisionData.jurisdictionTaxCode
    }
    _salesTaxNumberEnabled() {
        return !0 === this.countrySubdivisionData.enableSalesTaxNumber
    }
    _salesTaxNumberExample() {
        return this.countrySubdivisionData.salesTaxNumberExample
    }
    _salesTaxNumberLabel() {
        return this.countrySubdivisionData.salesTaxNumberLabel
    }
    _salesTaxNumber() {
        return this.dom.$salesTaxInput.val()
    }
    _getCountryData() {
        this.countryData = $("option:selected", this.dom.$countryCode).data()
    }
    _getCountrySubdivisionData() {
        this._getCountryData();
        const e = this.dom.$countryCode.val(),
            t = this.dom.$countrySubdivision.filter(`[data-show-for='${e}']`);
        this.countrySubdivisionData = $.extend({}, this.countryData, t.find("option:selected").data())
    }
}, Views.RadioCombo = class {
    constructor(e) {
        this.$el = e, this.$radios = this.$el.find(":radio"), this.$radioWithText = this.$radios.filter(".js-radio-with-text"), this.$text = this.$el.find(":input.js-text-with-radio").not(this.$radioWithText), this.$radios.on("change.radioCombo", () => this.changed()), this.changed()
    }
    changed() {
        this.$radioWithText.prop("checked") ? this.$text.prop("disabled", !1).removeClass("disabled") : (this.$text.prop("disabled", !0).addClass("disabled"), this.$text.parent().find("label.invalid").remove())
    }
}, Views.RatingBasic = class {
    constructor(e) {
        this.starOnUrl = e.data("imagePaths").on, this.starOffUrl = e.data("imagePaths").off, this.initEvents(e), e.find("a").data("viewInstance", this)
    }
    initEvents(e) {
        e.on("mouseleave", e => {
            const t = $(e.currentTarget);
            this.resetStars(t.attr("data-star-set-id"), t.attr("data-rating"))
        }).on("ajax:success", function(e, t) {
            $("#js-rating").html(t), viewloader.execute(Views, this.$el)
        }).find("a").on("click", function() {
            const e = $(this);
            e.parent().attr("data-rating", e.index() + 1)
        })
    }
    toggleStars(e, t) {
        for (let i = 1; i <= 5; i++) {
            const s = `${e}_${i}`;
            i > t ? this.turnOffStar(s) : this.turnOnStar(s)
        }
    }
    turnOnStar(e) {
        $(`#${e}`).attr("src", this.starOnUrl)
    }
    turnOffStar(e) {
        $(`#${e}`).attr("src", this.starOffUrl)
    }
    resetStars(e, t) {
        this.toggleStars(e, t)
    }
}, Views.RatingBreakdown = class {
    constructor() {
        this.$toggle = $(".js-rating-exposer"), this.$breakdown = $(".js-rating-breakdown"), this.$toggle.on("click", this.toggleBreakdown.bind(this)), this.$showLabel = this.$breakdown.data("showLabel"), this.$hideLabel = this.$breakdown.data("hideLabel")
    }
    toggleBreakdown(e) {
        e.preventDefault(), this.$breakdown.toggleClass("hidden"), this.$breakdown.hasClass("hidden") ? e.target.innerHTML = this.$showLabel : e.target.innerHTML = this.$hideLabel
    }
}, Views.RecommendedItems = class {
    constructor(e) {
        $.get(e.data("url"), function(t) {
            e.html(t), viewloader.execute(Views, e)
        })
    }
}, Views.RefundDispatcher = class {
    constructor(e) {
        this.$el = e, this.dom = {
            $actionButtons: this.$el.find(".js-refund-dispatcher__action-button")
        }, this.dom.$actionButtons.on("click", this.handleAction.bind(this)), this.dom.$actionButtons.attr("data-ready", "true")
    }
    handleAction(e) {
        e.preventDefault();
        const t = $(e.currentTarget).data("action");
        this.$el.attr("data-refund-dispatcher-status", t)
    }
}, Views.UserRefundRequest = class {
    constructor(e) {
        this.togglePurchaseCodeInput = this.togglePurchaseCodeInput.bind(this), this.handleItemOrReasonChange = this.handleItemOrReasonChange.bind(this), this.PAYMENT_REASON = "I have a problem with my payment", this.dom = {
            $purchaseCodeSelectContainer: e.find(".js-refund__purchase-code-select-container"),
            $purchaseCodeInput: e.find(".js-refund__purchase-code-field"),
            $togglePurchaseCodeSelect: e.find(".js-refund__toggle-purchase-code-select"),
            $togglePurchaseCodeField: e.find(".js-refund__toggle-purchase-code-field"),
            $itemSelect: e.find(".js-refund__purchase-code-select"),
            $reasonDropdown: e.find(".js-refund__reason-select"),
            $refundRecipient: e.find("[class*=js-refund__recipient-copy]"),
            $refundRecipientAuthor: e.find(".js-refund__recipient-copy-author"),
            $refundRecipientEnvato: e.find(".js-refund__recipient-copy-envato")
        }, this.initialize()
    }
    initialize() {
        this.dom.$togglePurchaseCodeSelect.on("click", this.togglePurchaseCodeInput), this.dom.$togglePurchaseCodeField.on("click", this.togglePurchaseCodeInput), this.dom.$itemSelect.on("change", this.handleItemOrReasonChange), this.dom.$reasonDropdown.on("change", this.handleItemOrReasonChange), this.dom.$refundRecipient.hide()
    }
    togglePurchaseCodeInput(e) {
        e.preventDefault(), this.dom.$purchaseCodeInput.toggleClass("is-hidden"), this.dom.$purchaseCodeSelectContainer.toggleClass("is-hidden"), this.dom.$itemSelect.prop("required", !this.dom.$purchaseCodeSelectContainer.hasClass("is-hidden"))
    }
    handleItemOrReasonChange(e, t) {
        if (this.dom.$itemSelect.find("option:selected").data("creativeStock")) this.toggleRecipientText("envato");
        else switch (this.dom.$reasonDropdown.find("option:selected").val()) {
            case "":
                this.dom.$refundRecipient.hide();
                break;
            case this.PAYMENT_REASON:
                this.toggleRecipientText("envato");
                break;
            default:
                this.toggleRecipientText("author")
        }
    }
    toggleRecipientText(e) {
        switch (this.dom.$refundRecipient.hide(), e) {
            case "envato":
                this.dom.$refundRecipientEnvato.show();
                break;
            case "author":
                this.dom.$refundRecipientAuthor.show()
        }
    }
}, Views.RefundRequestsLists = class {
    constructor(e) {
        this.dom = {
            $selectToggle: e.find(".js-refund-requests__toggle")
        }, this.dom.$selectToggle.on("change", this.toggleRefundURL.bind(this))
    }
    toggleRefundURL(e) {
        const t = this.dom.$selectToggle.find("option:selected").data("url");
        window.location.pathname = t
    }
}, Market.DOMUtils.Revealer = class {
    constructor(e) {
        this.toggle = this.toggle.bind(this);
        const t = {
            defaultText: "Show more",
            toggledText: "Show less",
            state: "closed"
        };
        this.options = $.extend(t, e || {}), this.$el = this.options.$el, this.dom = {
            $revealerContent: this.$el.find(".js-revealer__content"),
            $revealerInner: this.$el.find(".js-revealer__inner"),
            $revealerButton: this.$el.find(".js-revealer__button"),
            $revealerButtonText: this.$el.find(".js-revealer__text")
        }, this.innerHeight = this.dom.$revealerInner.height(), this.dom.$revealerButton.on("click.revealer", this.toggle), "opened" === this.options.state && this.toggle()
    }
    toggle(e) {
        let t, i, s;
        e && e.preventDefault();
        this.$el.hasClass("is-open") ? (s = 0, t = this.options.defaultText, i = "closed") : (s = "none", t = this.options.toggledText, i = "opened"), this.$el.toggleClass("is-open"), this.dom.$revealerContent.css({
            maxHeight: s
        }), this.dom.$revealerButtonText.text(t), this.$el.trigger(`revealer:${i}`)
    }
}, Views.Revealer = class {
    constructor(e) {
        new Market.DOMUtils.Revealer({
            $el: e
        })
    }
}, Views.RomeDateRange = class {
    constructor(e) {
        const t = {
            humanFormat: "MMMM DD, YYYY",
            serverFormat: "YYYY-MM-DD"
        };
        this.settings = $.extend({}, t, e.data("props")), this.dom = {
            humanFrom: e.find(".js-human-from")[0],
            humanTo: e.find(".js-human-to")[0],
            serverFrom: e.find(".js-server-from")[0],
            serverTo: e.find(".js-server-to")[0]
        }, loadjs([this.settings.jsPath, this.settings.cssPath], () => {
            this.setupFields()
        })
    }
    setupFields() {
        this.dom.humanFrom.disabled = !1, this.dom.humanTo.disabled = !1;
        const e = {
                dayFormat: "D",
                time: !1,
                inputFormat: this.settings.humanFormat
            },
            t = $.extend({}, e);
        this.settings.min && (t.min = moment(this.settings.min)), this.settings.max && (t.max = moment(this.settings.max)), this.from = rome(this.dom.humanFrom, t);
        const i = $.extend({}, e, {
            dateValidator: rome.val.afterEq(this.dom.humanFrom)
        });
        this.settings.max && (i.max = moment(this.settings.max)), this.to = rome(this.dom.humanTo, i), this.from.on("ready", () => {
            this.oldFromMoment = this.from.getMoment()
        }), this.from.on("data", () => {
            if (this.settings.doNotAutoUpdateTo) return;
            const e = this.from.getMoment();
            this.oldFromMoment.isSame(e) || (this.updateToFieldWhenFromChanged(this.oldFromMoment, e), this.oldFromMoment = e)
        }), this.from.on("data", e => {
            this.updateServerField(e, "From")
        }), this.to.on("data", e => {
            this.updateServerField(e, "To")
        })
    }
    updateToFieldWhenFromChanged(e, t) {
        const i = t.diff(e),
            s = this.to.getMoment().add(i);
        this.to.setValue(s), this.to.emitValues()
    }
    updateServerField(e, t) {
        const i = moment(e).format(this.settings.serverFormat);
        this.dom[`server${t}`].value = i
    }
}, Views.SendMessageForm = class {
    constructor(e) {
        this.$form = e, this.$form.on("submit", () => {
            const e = this.$form.find("#message");
            Market.Helpers.FormEscaping.escapeInHiddenCopyAndDisable(this.$form, e, "message_base64")
        })
    }
}, Views.StarRating = class {
    constructor(e) {
        this.$ratingWidget = e, this.$stars = this.$ratingWidget.find("a"), this.item_id = this.$ratingWidget.data("itemId"), this.$ratingWidget.on({
            "starRating:change": this.updateStars.bind(this),
            "starRating:reset": this.resetStars.bind(this),
            "starRating:save": this.saveRating.bind(this)
        }), this.$stars.on({
            mouseenter: this.handleMouseEnter.bind(this),
            mouseleave: this.handleMouseLeave.bind(this),
            click: this.handleClick.bind(this)
        })
    }
    resetStars(e) {
        const t = this.$ratingWidget.data("ratingOriginal");
        this.triggerChangeRating(t)
    }
    updateStars(e, t) {
        if (0 === t) this.$stars.removeClass().addClass("star-rating__star");
        else {
            const e = this.$ratingWidget.find("[data-star='" + t + "']");
            e.prevAll().addBack().removeClass().addClass("star-rating__star--full"), e.nextAll().removeClass().addClass("star-rating__star--empty")
        }
    }
    saveRating(e, t) {
        _.isUndefined(this.$ratingWidget.data("ratingOriginal")) || this.$ratingWidget.data("ratingOriginal", t)
    }
    handleMouseEnter(e) {
        const t = $(e.delegateTarget);
        t.prevAll().addBack().addClass("is-on"), t.nextAll().addClass("is-off")
    }
    handleMouseLeave(e) {
        const t = $(e.delegateTarget);
        t.prevAll().addBack().removeClass("is-on"), t.nextAll().removeClass("is-off")
    }
    handleClick(e) {
        e.preventDefault();
        const t = $(e.delegateTarget).data("star");
        this.triggerChangeRating(t), t > 3 && this.$ratingWidget.trigger("starRating:save", t)
    }
    triggerChangeRating(e) {
        $("[data-bind='item-star-rating:" + this.item_id + "']").trigger("starRating:change", e)
    }
}, Views.StatementDownloadDisabler = class {
    constructor(e) {
        this.$el = e, this.select = this.$el.find(".js-statement__download-select"), this.button = this.$el.find(".js-statement__download-btn"), this.select.on({
            change: () => this.checkSelectValue()
        }), this.checkSelectValue()
    }
    checkSelectValue() {
        this.button.prop("disabled", 0 === this.select.val().length)
    }
}, Views.StatementSearch = class {
    constructor(e) {
        this.$el = e, this.$activePreset = this.$el.find(".statement-search__presets_links a.is-active"), this.$advancedToggle = this.$el.find(".statement-search__presets_toggle"), this.$advancedForm = this.$el.find(".statement-search__advanced-form"), this.$advancedTypes = this.$el.find(".statement-search__advanced-types input"), this.$typeSelectors = this.$el.find(".statement-search__advanced-type-btn label"), this.$fieldsForFilter = this.$el.find(".statement-search__advanced-type__filter"), this.$fieldsForRange = this.$el.find(".statement-search__advanced-type__range"), this.$fieldsForPeriod = this.$el.find(".statement-search__advanced-type__period"), this.$fieldsForDocumentNumber = this.$el.find(".statement-search__advanced-type__document-number"), this.$advancedToggle.on("click", e => {
            e.preventDefault(), this.$activePreset.toggleClass("is-active"), this.$advancedToggle.toggleClass("is-active"), this.$advancedForm.toggleClass("is-hidden")
        }), this.$advancedTypes.on("change", e => {
            if ($(e.target).prop("checked", !0)) {
                const t = $(e.target).attr("value");
                switch (this.$typeSelectors.removeClass("is-active"), this.$el.find('label[for="search_type_' + t + '"]').addClass("is-active"), this.hideAdvancedFilters(), t) {
                    case "range":
                        this.$fieldsForRange.removeClass("is-hidden"), this.$fieldsForFilter.removeClass("is-hidden");
                        break;
                    case "period":
                        this.$fieldsForPeriod.removeClass("is-hidden"), this.$fieldsForFilter.removeClass("is-hidden");
                        break;
                    case "document_number":
                        this.$fieldsForDocumentNumber.removeClass("is-hidden")
                }
            }
        })
    }
    hideAdvancedFilters() {
        this.$fieldsForFilter.addClass("is-hidden"), this.$fieldsForPeriod.addClass("is-hidden"), this.$fieldsForDocumentNumber.addClass("is-hidden"), this.$fieldsForRange.addClass("is-hidden")
    }
}, Views.TableHighlightColumn = class {
    constructor(e) {
        this.$el = e, this.highlightClass = "js-highlight-column", this.$bodyCells = this.$el.find("td"), this.disableFirstColumn = this.$el.data("disableFirstColumn"), this.selectedColumn = this.$el.data("selectedColumn"), this.selectedColumnIndex = this.getSelectedColumnIndex(this.selectedColumn), this.$selectedColumnCells = this.$bodyCells.filter(`:nth-child(${this.selectedColumnIndex})`), this.$el.on("mouseenter mouseleave", "th, td", this.handleColumnHover.bind(this)), this.highlightSelectedColumn()
    }
    handleColumnHover(e) {
        const t = $(e.currentTarget).index() + 1;
        if ((!this.disableFirstColumn || 1 !== t) && t !== this.selectedColumnIndex) {
            this.$bodyCells.filter(`:nth-child(${t})`).toggleClass(this.highlightClass, "mouseenter" === e.type)
        }
    }
    getSelectedColumnIndex(e) {
        return this.$el.find(`.${e}`).index() + 1
    }
    highlightSelectedColumn() {
        this.$selectedColumnCells.addClass(this.highlightClass)
    }
}, Views.ToggleItemDescription = class {
    constructor(e) {
        let t;
        const i = 400,
            s = e.find(".js-item-togglable-content"),
            r = e.find(".js-item-description-toggle"),
            n = r.find("a");
        s.height() > i && (s.addClass("has-toggle"), n.removeClass("is-hidden"), t = r.offset().top - 140), n.on("click.toggleItemDescription", e => {
            e.preventDefault(), s.toggleClass("is-expanded"), r.toggleClass("is-expanded"), s.hasClass("is-expanded") || window.scrollTo(0, t)
        })
    }
}, Views.TooltipAlpha = class {
    constructor(e) {
        this.$el = e, this.currentlyVisible = !1, this.delayTimeout = null, this.isTouch = Market.Helpers.touchDetection.isTouchPrimaryDevice(), this.sticky = this.$el.data("sticky"), this.dom = {
            $tooltipBody: this.$el.find(".js-tooltip-alpha__body").clone().appendTo($(document.body))
        }, this.isTouch ? (this.$el.on("click", this.tooltipClick.bind(this)), this.dom.$tooltipBody.on("click", this.tooltipClick.bind(this)), $(window).on("orientationchange", this.orientationChange.bind(this))) : (this.$el.hover(this.tooltipHover.bind(this)), this.sticky && (this.dom.$tooltipBody.on("mouseenter", this.tooltipMouseEnter.bind(this)), this.dom.$tooltipBody.on("mouseleave", this.tooltipMouseLeave.bind(this))))
    }
    updatePosition(e) {
        this.dom.$tooltipBody.css(e)
    }
    updateVisibility() {
        return this.currentlyVisible ? this.sticky && !this.isTouch ? this.hideTooltipAfterDelay() : this.hideTooltip() : this.showTooltip()
    }
    showTooltip() {
        this.cancelDelayTimeout(), this.currentlyVisible = !0, this.dom.$tooltipBody.attr("data-show", this.currentlyVisible)
    }
    hideTooltip() {
        this.cancelDelayTimeout(), this.currentlyVisible = !1, this.dom.$tooltipBody.attr("data-show", this.currentlyVisible)
    }
    hideTooltipAfterDelay() {
        this.cancelDelayTimeout(), this.delayTimeout = setTimeout(this.hideTooltip.bind(this), 2e3)
    }
    cancelDelayTimeout() {
        this.delayTimeout && (clearTimeout(this.delayTimeout), this.delayTimeout = null)
    }
    orientationChange() {
        const e = {
            top: this.$el.offset().top
        };
        this.updatePosition(e)
    }
    tooltipHover() {
        const e = this.$el.offset(),
            t = {
                left: e.left,
                top: e.top
            };
        this.updatePosition(t), this.updateVisibility()
    }
    tooltipClick() {
        const e = {
            top: this.$el.offset().top
        };
        this.updatePosition(e), this.updateVisibility()
    }
    tooltipMouseEnter() {
        this.cancelDelayTimeout()
    }
    tooltipMouseLeave() {
        this.hideTooltipAfterDelay()
    }
}, Views.TransactionTypeFilter = class {
    constructor(e) {
        this.$el = e, this.$marketplaceOptions = $(".js-statement-search__marketplace"), this.canSearchByMarketplace = this.$marketplaceOptions.data("transactionTypesWithMarketplaces").split(","), this.ALL_TRANSACTIONS = "", this.$marketplaceOptions.length && (this.$el.on("change", this.changeMarketplaceSelectStatus.bind(this)), this.changeMarketplaceSelectStatus())
    }
    changeMarketplaceSelectStatus() {
        const e = this.$el.find(":selected").attr("value").toLowerCase();
        this.canSearchByMarketplace.includes(e) || e === this.ALL_TRANSACTIONS ? this.$marketplaceOptions.prop("disabled", !1) : this.$marketplaceOptions.prop("disabled", !0).val("")
    }
}, Views.TypeSelectWatcher = class {
    constructor(e) {
        this.dom = {
            $label: e.find(".js-category-message"),
            $defaultMessage: e.find(".js-category-default-message"),
            $select: e.find(".js-item-type"),
            $form: $("form#begin-upload"),
            $submitButton: $(".upload-category-selector__btn > button")
        }, this.dom.$select.on("change", this.handleSelectChanged.bind(this)), this.defaultUrl = this.dom.$form.attr("action"), this.dom.$select.trigger("change")
    }
    handleSelectChanged() {
        const e = this.dom.$select.val(),
            t = this.dom.$select.data("messages")[e] || "",
            i = this.dom.$select.data("actions")[e] || this.defaultUrl,
            s = this.dom.$select.data("disabledCategories") || [];
        this.toggleDefaultMessage(t), this.dom.$label.html(t), this.dom.$form.attr("action", i), this.dom.$submitButton.prop("disabled", !this.canSubmit(e, s))
    }
    toggleDefaultMessage(e) {
        0 === e.length ? this.dom.$defaultMessage.removeClass("is-hidden") : this.dom.$defaultMessage.addClass("is-hidden")
    }
    canSubmit(e, t) {
        return e && !Array.from(t).includes(e)
    }
}, Views.Uploader = class {
    constructor(e) {
        loadjs(e.data("script"), () => {
            viewloader.execute(Views, e)
        })
    }
}, Views.UserEditTabSelector = class {
    constructor() {
        $("#user-edit-tab").addClass("selected")
    }
}, Views.AjaxPlaceholder = class {
    constructor(e) {
        e.on("click", e => e.preventDefault())
    }
}, Views.Banner = class {
    constructor(e) {
        this.dom = {
            banner: e,
            close: e.find(".js-banner__dismiss"),
            link: e.find(".js-banner__link")
        }, this.bannerData = this.dom.banner.data(), this.bannerKey = this.bannerData.cacheKey, this.cookiebotEnabled = this.bannerData.cookiebotEnabled, this.consentGiven = Market.Helpers.CookieConsent.given, this.consentType = "preferences", this.showBanner(), Market.Helpers.CookieConsent.addListener("marketing", this.setBannerCookie.bind(this)), this.dom.close.on("click", this.handleClose.bind(this))
    }
    handleClose(e) {
        e.preventDefault(), e.stopPropagation(), this.dom.banner.slideUp(250), this.setLocalStorage(this.bannerKey)
    }
    setLocalStorage(e) {
        if (!this.cookiebotEnabled || this.consentGiven(this.consentType)) return window.localStorage.setItem(e, "hidden")
    }
    showBanner() {
        if (!!window.localStorage.getItem(this.bannerKey)) return this.dom.banner.addClass("hide");
        this.dom.banner.slideDown(250)
    }
    setBannerCookie() {
        const e = {
                path: "/",
                domain: window.location.host,
                expires: 14
            },
            t = JSON.stringify(this.bannerData.cookieData);
        return $.cookie("marketplace_banners", t, e)
    }
}, Views.CartCount = class {
    constructor(e) {
        this.$el = e, this.dom = {
            $count: this.$el.find(".js-cart-summary-count")
        }, $(document).on("uiCartUpdateRequest", this.handleCartUpdate.bind(this))
    }
    handleCartUpdate(e, t) {
        const i = t.cart_count;
        1 === i && this.$el.removeClass("is-empty"), this.dom.$count.html(i)
    }
}, Market.CartAnalytics = {
    sendCartQuantityChangeEvent({
        analyticsClickPayload: e,
        quantityDifference: t
    }) {
        let i = t;
        const s = structuredClone(e);
        if (!s || !window.GtmMeasurements) return;
        const {
            ecommerce: r
        } = s, [n] = r.items;
        0 !== i && (i < 0 ? (s.eventName = "remove_from_cart", i = Math.abs(i)) : s.eventName = "add_to_cart", n.quantity = i, r.value = i * n.price, window.GtmMeasurements.sendAnalyticsEvent(s))
    }
}, Views.CartEditQuantity = class {
    static DEFAULTS = {
        MIN_QUANTITY: 1,
        MAX_QUANTITY: 100,
        DEFAULT_QUANTITY: 1
    };
    static CSS_CLASSES = {
        ORIGINAL_PRICE: "cart-variant__output-original-price",
        ACTIVE: "active"
    };
    constructor(e) {
        this.$el = e;
        const t = this.$el.find('[data-view="cartVariantSelector"]');
        this.MATRIX = t.data("matrix"), this.DISCOUNT = t.data("discount"), this.dom = {
            $quantityInput: this.$el.find(".quantity-input"),
            $quantityDecrease: this.$el.find(".quantity-decrease"),
            $quantityIncrease: this.$el.find(".quantity-increase"),
            $totalPrice: this.$el.find(".js-cart-variant__output-price"),
            $discount: this.$el.find(".js-cart-variant__output-discount-price"),
            $licenseSelect: this.$el.find(".js-cart-variant__license"),
            $supportSelect: this.$el.find(".js-cart-variant__support"),
            $defaultLicense: this.$el.find(".js-cart-variant__default-license"),
            $form: this.$el.find("form")
        }, this.analyticsClickPayload = this.$el[0].getAttribute("data-analytics-click-payload") ? JSON.parse(this.$el[0].getAttribute("data-analytics-click-payload")) : null, this.previousQuantity = parseInt(this.$el.find('input[name="previous_quantity"]').val()) || 1, this.unitPrice = null, this.discountPrice = null, this.hasDiscount = !1, this._bindEvents(), this._captureInitialPrice()
    }
    _bindEvents() {
        this.dom.$quantityDecrease.on("click", this._handleQuantityDecrease.bind(this)), this.dom.$quantityIncrease.on("click", this._handleQuantityIncrease.bind(this)), this.dom.$quantityInput.on("change input", this._handleQuantityChange.bind(this)), $(document).on("item:variantChange", this._handleVariantChange.bind(this)), this.dom.$form.on("submit", this._handleFormSubmit.bind(this))
    }
    _captureInitialPrice() {
        const e = this.dom.$totalPrice.text();
        e && (this.unitPrice = this._parsePrice(e));
        const t = this.dom.$discount.text();
        t && this.dom.$discount.hasClass("active") && (this.discountPrice = this._parsePrice(t), this.hasDiscount = !0), this._updateTotalPrice()
    }
    _handleQuantityDecrease(e) {
        e.preventDefault();
        const t = this._getCurrentQuantity();
        t > this._getMinQuantity() && this.dom.$quantityInput.val(t - 1).trigger("change")
    }
    _handleQuantityIncrease(e) {
        e.preventDefault();
        const t = this._getCurrentQuantity();
        t < this._getMaxQuantity() && this.dom.$quantityInput.val(t + 1).trigger("change")
    }
    _handleQuantityChange() {
        const e = this._getCurrentQuantity(),
            t = this._constrainQuantity(e);
        e !== t && this.dom.$quantityInput.val(t),
            this._updateTotalPrice()
    }
    _handleVariantChange(e, t) {
        if (t && t.license) {
            const e = this._getActiveSupportKey(),
                i = this._getPriceData(t.license, e);
            i && i.price && (this.unitPrice = this._parsePrice(i.price), this.hasDiscount = this._getDiscountAvailability(t.license), this._updateTotalPrice())
        }
    }
    _updateTotalPrice() {
        const e = this._getActiveLicenseKey(),
            t = this._getActiveSupportKey(),
            i = this._getCurrentQuantity();
        if (!e) return;
        const s = this._getPriceData(e, t),
            r = this._getDiscountAvailability(e);
        this._setDiscountMode(r), r ? this._updateDiscountPricing(t, i) : s && s.price && this._updateRegularPricing(s.price, i)
    }
    _updateDiscountPricing(e, t) {
        const i = this._getDiscountOriginalPrice(e),
            s = Market.CurrencyFormatter.parsePrice(i) * t;
        this.dom.$totalPrice.text(Market.CurrencyFormatter.formatMarketPrice(s));
        const r = this._getDiscountPrice(e),
            n = Market.CurrencyFormatter.parsePrice(r) * t;
        this.dom.$discount.text(Market.CurrencyFormatter.formatMarketPrice(n))
    }
    _updateRegularPricing(e, t) {
        const i = Market.CurrencyFormatter.parsePrice(e) * t;
        this.dom.$totalPrice.text(Market.CurrencyFormatter.formatMarketPrice(i))
    }
    _setDiscountMode(e) {
        e ? (this.dom.$totalPrice.addClass(this.constructor.CSS_CLASSES.ORIGINAL_PRICE), this.dom.$discount.addClass(this.constructor.CSS_CLASSES.ACTIVE)) : (this.dom.$totalPrice.removeClass(this.constructor.CSS_CLASSES.ORIGINAL_PRICE), this.dom.$discount.removeClass(this.constructor.CSS_CLASSES.ACTIVE))
    }
    _getActiveLicenseKey() {
        return this.dom.$licenseSelect.length ? this.dom.$licenseSelect.find("option:selected").data("license") : this.dom.$defaultLicense.length ? this.dom.$defaultLicense.data("license") : null
    }
    _getActiveSupportKey() {
        return this.dom.$supportSelect.length && this.dom.$supportSelect.find("option:selected").data("support") || "none"
    }
    _getPriceData(e, t) {
        const i = this.MATRIX[e];
        if (!i) return null;
        if (t && i.support && i.support[t]) {
            const e = i.support[t];
            return {
                price: e.price,
                license_label: i.license_label,
                support_label: e.label
            }
        }
        return null
    }
    _getDiscountAvailability(e) {
        if (!this.DISCOUNT || !this.DISCOUNT.discount_original_price) return !1;
        const t = this.MATRIX[e];
        return t && t.default
    }
    _getDiscountPrice(e) {
        return this.DISCOUNT ? "bundle_12month" === e ? this.DISCOUNT.discount_upgrade_price : this.DISCOUNT.discount_price : null
    }
    _getDiscountOriginalPrice(e) {
        return this.DISCOUNT ? "bundle_12month" === e ? this.DISCOUNT.discount_upgrade_original_price : this.DISCOUNT.discount_original_price : null
    }
    _getCurrentQuantity() {
        return parseInt(this.dom.$quantityInput.val()) || this.constructor.DEFAULTS.DEFAULT_QUANTITY
    }
    _getMinQuantity() {
        return parseInt(this.dom.$quantityInput.attr("min")) || this.constructor.DEFAULTS.MIN_QUANTITY
    }
    _getMaxQuantity() {
        return parseInt(this.dom.$quantityInput.attr("max")) || this.constructor.DEFAULTS.MAX_QUANTITY
    }
    _constrainQuantity(e) {
        const t = this._getMinQuantity(),
            i = this._getMaxQuantity();
        return Math.max(t, Math.min(i, e))
    }
    _parsePrice(e) {
        return Market.CurrencyFormatter.parsePrice(e)
    }
    _formatPrice(e) {
        return Market.CurrencyFormatter.formatMarketPrice(e)
    }
    _sendCartAnalyticsEvent() {
        Market.CartAnalytics.sendCartQuantityChangeEvent({
            analyticsClickPayload: this.analyticsClickPayload,
            quantityDifference: this._getCurrentQuantity() - this.previousQuantity
        })
    }
    _handleFormSubmit() {
        this._sendCartAnalyticsEvent()
    }
}, Views.CartVariantSelector = class {
    constructor(e) {
        this.$el = e, this.MATRIX = this.$el.data("matrix"), this.DISCOUNT = this.$el.data("discount"), this.dom = {
            $licenses: this.$el.find(".js-cart-variant__license"),
            $supportBundles: this.$el.find(".js-cart-variant__support"),
            $defaultLicense: this.$el.find(".js-cart-variant__default-license"),
            $price: this.$el.find(".js-cart-variant__output-price"),
            $license: this.$el.find(".js-cart-variant__output-license"),
            $support: this.$el.find(".js-cart-variant__output-support"),
            $error: this.$el.find(".js-cart-variant__error"),
            $discount: this.$el.find(".js-cart-variant__output-discount-price")
        }, this.itemSupportable = this.dom.$supportBundles.length > 0, this.activeSupport = this._getActiveSupport(), this.activeLicense = this._getActiveLicense(), this.activePrice = this._getActivePrice(), this.discountPrice = this._getDiscountPrice(), this.discountOriginalPrice = this._getDiscountOriginalPrice(), this.discountAvailable = this._getDiscountAvailability(), this.dom.$licenses.on("change", this.handleLicenseChange.bind(this)), this.dom.$supportBundles.on("change", this.handleSupportChange.bind(this))
    }
    handleLicenseChange(e) {
        this.activeLicense = this._getActiveLicense(), this.discountAvailable = this._getDiscountAvailability(), this.discountPrice = this._getDiscountPrice(), this.discountOriginalPrice = this._getDiscountOriginalPrice(), this._updateUI()
    }
    handleSupportChange(e) {
        this.activeSupport = this._getActiveSupport(), this.discountAvailable = this._getDiscountAvailability(), this.discountPrice = this._getDiscountPrice(), this.discountOriginalPrice = this._getDiscountOriginalPrice(), this._updateUI()
    }
    _getActiveLicense() {
        return this.dom.$licenses.find("option:selected").data("license") || this.dom.$defaultLicense.data("license")
    }
    _getActiveSupport() {
        return this.dom.$supportBundles.find("option:selected").data("support") || "none"
    }
    _getActivePrice() {
        return this.MATRIX[this.activeLicense].support[this.activeSupport].price
    }
    _getActiveTermsUrl() {
        return this.dom.$licenses.find("option:selected").data("termsUrl") || this.dom.$defaultLicense.data("termsUrl")
    }
    _getDiscountAvailability() {
        return this.MATRIX[this.activeLicense].default && this.DISCOUNT.discount_original_price
    }
    _getDiscountPrice() {
        return "bundle_12month" === this.activeSupport ? this.DISCOUNT.discount_upgrade_price : this.DISCOUNT.discount_price
    }
    _getDiscountOriginalPrice() {
        return "bundle_12month" === this.activeSupport ? this.DISCOUNT.discount_upgrade_original_price : this.DISCOUNT.discount_original_price
    }
    _renderActiveLicense() {
        const e = this.MATRIX[this.activeLicense];
        this.dom.$license.html(e.license_label), this.dom.$license.attr("href", e.terms_url)
    }
    _renderActiveSupport() {
        this.itemSupportable && this.dom.$support.html(this.MATRIX[this.activeLicense].support[this.activeSupport].label)
    }
    _renderActivePrice() {
        const e = this.discountAvailable ? this.discountOriginalPrice : this.activePrice;
        this.dom.$price.html(e)
    }
    _renderDiscount() {
        this.discountAvailable ? (this.dom.$discount.text(this.discountPrice), this.dom.$price.text(this.discountOriginalPrice), this.dom.$discount.addClass("active"), this.dom.$price.addClass("cart-variant__output-original-price")) : (this.dom.$discount.removeClass("active"), this.dom.$price.removeClass("cart-variant__output-original-price"))
    }
    _updateUI() {
        this.activePrice = this._getActivePrice(), this._renderActiveLicense(), this._renderActiveSupport(), this._renderActivePrice(), this._renderDiscount(), this._broadcastVariantChange()
    }
    _broadcastVariantChange() {
        const e = {
            license: this.activeLicense,
            price: this.activePrice
        };
        $(document).trigger("item:variantChange", e)
    }
}, Views.CharacterCounter = class {
    constructor(e) {
        this.$textField = e, this.maxLength = parseInt(this.$textField.data("maxLength"), 10), this.$counterField = $(`.${this.$textField.data("counterClass")}`), this.$submitBtn = $(`.${this.$textField.data("submitBtn")}`), this.updateCounter(), this.$textField.on("input", this.updateCounter.bind(this))
    }
    updateCounter() {
        const e = this.$textField.val().length,
            t = e > this.maxLength;
        this.$counterField.html(this.maxLength - e), this.$submitBtn.prop("disabled", t), this.$counterField.toggleClass("is-error", t)
    }
}, Views.CollectionWidgetForm = class {
    constructor(e) {
        this.$el = e, this.$form = this.$el.find(".js-collection-form"), this.$formReveal = this.$el.find(".js-collection-form-reveal"), this.$formInput = this.$el.find(".js-collection-form-input"), this.$formError = this.$el.find(".js-collection-form-error"), this.$formCancel = this.$el.find(".js-collection-form-cancel"), this.formClosed = !0, this.$formInput.on("focus", this.showForm.bind(this)), this.$formCancel.on("click", this.handleCancelClick.bind(this)), this.$form.on("collection:added", this.createSuccess.bind(this))
    }
    showForm() {
        this.formClosed && (this.formClosed = !1, this.$formReveal.slideDown(), this.switchButtonPriority())
    }
    hideForm() {
        this.formClosed = !0, this.$formInput.val(""), this.$formError.html("").addClass("is-collapsed"), this.$formReveal.slideUp(), this.switchButtonPriority()
    }
    handleCancelClick(e) {
        e.preventDefault(), this.hideForm()
    }
    createSuccess() {
        this.hideForm(), $(".js-collections-list").animate({
            scrollTop: 0,
            duration: 600
        })
    }
    switchButtonPriority() {
        $(".js-collection-form-sumbit, .js-modal-close").toggleClass("-color-primary").toggleClass("-color-light")
    }
}, Views.CookieSettings = class {
    constructor(e) {
        this.$el = e, this.bindEvents()
    }
    bindEvents() {
        this.$el.on("click", this.handleClick.bind(this))
    }
    handleClick() {
        window.Cookiebot && (window.Cookiebot.renew(), window.addEventListener("CookiebotOnLoad", () => window.location.reload()))
    }
};
class DelegatedDropdownManager {
    constructor(e) {
        this.$manager = e, this.state = {
            status: "closed",
            $currentDropdown: null
        }, this.$manager.on("delegatedDropdown:change", (e, t, i) => {
            "open" === t ? this.watch(i) : this.stopWatching()
        })
    }
    watch(e) {
        "open" === this.state.status && this.state.$currentDropdown.trigger("delegatedDropdown:close"), this.state = {
            status: "open",
            $currentDropdown: e
        }, this.$manager.on("click.delegatedDropdown", e => {
            0 !== this.state.$currentDropdown.has(e.target).length || this.state.$currentDropdown.is(e.target) || this.state.$currentDropdown.trigger("delegatedDropdown:close")
        })
    }
    stopWatching() {
        this.state = {
            status: "closed",
            $el: null
        }, this.$manager.off("click.delegatedDropdown")
    }
}
Market.DOMUtils.getDelegatedDropdownManager = function() {
        return DelegatedDropdownManager._instance || (DelegatedDropdownManager._instance = new DelegatedDropdownManager($("body")))
    }, Views.DelegatedDropdown = class {
        constructor(e) {
            this.$el = e, Market.DOMUtils.getDelegatedDropdownManager(), this.state = "closed", this.$target = $(this.$el.data("dropdownTarget")), this.$el.on("click", this.toggleDropdown.bind(this)), this.$el.on("delegatedDropdown:close", this.closeDropdown.bind(this)), this.$el.data("ignoreDropdownClicks") && this.$target.on("click", e => e.stopPropagation())
        }
        toggleDropdown(e) {
            e.preventDefault(), this.$el.toggleClass("is-open"), this.$target.toggleClass("is-hidden"), this.state = "closed" === this.state ? "open" : "closed", this.$el.trigger("delegatedDropdown:change", [this.state, this.$el])
        }
        closeDropdown() {
            this.$el.removeClass("is-open"), this.$target.addClass("is-hidden"), this.state = "closed", this.$el.trigger("delegatedDropdown:change", [this.state, this.$el])
        }
    }, Views.Dropdown = class {
        constructor(e) {
            this.$toggle = e, this.$target = $(this.$toggle.data("dropdownTarget")), this.$toggle.on("click", e => {
                e.preventDefault(), this.$toggle.toggleClass("is-open"), this.$target.toggleClass("is-hidden")
            })
        }
    }, Views.Exposer = class {
        constructor(e) {
            const t = e.closest(".js-discussion");
            e.one("click", function(i) {
                i.preventDefault(), t.find(e.data("exposer")).removeClass("hidden"), e.parent().remove()
            })
        }
    }, Views.HeaderCartCount = class {
        constructor(e) {
            this.$el = e, $(document).on("uiCartUpdateRequest", this.handleCartUpdate.bind(this))
        }
        handleCartUpdate(e, t) {
            const i = t.cart_count;
            0 === i ? this.$el.addClass("is-hidden") : this.$el.removeClass("is-hidden"), this.$el.text(i)
        }
    }, Views.ModalAutoLoad = class {
        constructor(e) {
            this.$el = e, this.$el.find("a").click()
        }
    }, Views.ModalConfirmationMessage = class {
        constructor(e) {
            this.$el = e, this.modalInstance = $.magnificPopup.instance, this.$form = this.$el.find("form"), this.$inner = this.$el.find(".js-modal__form"), this.successMessage = this.$form.data("successMessage") || "Thank you for updating your details!", this.$form.on({
                "ajax:success": this.handleSuccess.bind(this),
                "ajax:error": this.handleError.bind(this)
            })
        }
        handleSuccess(e, t, i, s) {
            this.modalInstance ? ($(".js-system-banner p").html(this.successMessage), this.modalInstance.close()) : window.location.href = s.responseJSON.success_url
        }
        handleError(e, t, i, s) {
            500 === t.status ? this.$inner.html("<p class='t-body'>Sorry something went wrong.<br> Please refresh the page and try again.</p>") : this.$form.html(t.responseText)
        }
    }, Market.DOMUtils.offCanvasDrawerToggle = function(e) {
        switch (this.canvasPosition = e, this.$container = $(".page"), this.$canvas = $(".page__canvas"), this.$left = $(".page__off-canvas--left"), this.$right = $(".page__off-canvas--right"), this.$container.toggleClass("page--is-off-canvas"), $(".page__overlay").toggleClass("page__overlay--is-active"), this.canvasPosition) {
            case "left":
                this.$canvas.addClass("page__canvas--is-off-canvas-left"), this.$left.toggleClass("page__off-canvas--is-active");
                break;
            case "right":
                this.$canvas.addClass("page__canvas--is-off-canvas-right"), this.$right.toggleClass("page__off-canvas--is-active");
                break;
            case "close":
                this.$canvas.removeClass("page__canvas--is-off-canvas-right page__canvas--is-off-canvas-left"), $("[class^='page__off-canvas']").removeClass("page__off-canvas--is-active")
        }
    }, Views.OffCanvasNavToggle = class {
        constructor(e) {
            this.$el = e, this.position = this.$el.data("offCanvas"), this.$el.on("click", this.handleClick.bind(this))
        }
        handleClick(e) {
            e.preventDefault(), Market.DOMUtils.offCanvasDrawerToggle(this.position)
        }
    }, Date.now || (Date.now = function() {
        return (new Date).getTime()
    }),
    function() {
        "use strict";
        const e = ["webkit", "moz"];
        for (let t = 0; t < e.length && !window.requestAnimationFrame; ++t) {
            const i = e[t];
            window.requestAnimationFrame = window[i + "RequestAnimationFrame"], window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]
        }
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            let e = 0;
            window.requestAnimationFrame = function(t) {
                const i = Date.now(),
                    s = Math.max(e + 16, i);
                return setTimeout(function() {
                    t(e = s)
                }, s - i)
            }, window.cancelAnimationFrame = clearTimeout
        }
    }(), Views.ParallaxBackground = class {
        constructor(e) {
            this.$el = e, this.canEnableEffect() && (this.setVariables(), this.handleScroll(), this.bindEvents())
        }
        bindEvents() {
            $(window).off("scroll.parallaxBackground"), $(window).on("scroll.parallaxBackground", this.handleScroll.bind(this))
        }
        canEnableEffect() {
            return this._isContainerVisible() && this._isLargeScreenSize()
        }
        handleScroll() {
            this.windowScrollPosition = window.pageYOffset, this._animate(this._updatePosition.bind(this))
        }
        setVariables() {
            this.parallaxSpeed = 30, this.backgroundContainer = this.$el.find(".js-.page-section__background")[0], this.parentContainer = this.$el[0], this.browserPrefixes = ["-moz-", "-ms-", "-o-", "-webkit-", ""], this.isAnimating = !1
        }
        _animate(e) {
            this.isAnimating || (window.requestAnimationFrame(e), this.isAnimating = !0)
        }
        _getNewPosition() {
            const e = (this.windowScrollPosition * (100 - this.parallaxSpeed) / 100).toFixed();
            return Math.max(0, e)
        }
        _updatePosition() {
            const e = `translate3d(0px, ${this._getNewPosition()}px, 0px)`;
            for (const t of this.browserPrefixes) {
                const i = `${t}transform`;
                this.backgroundContainer.style[i] = e
            }
            this.isAnimating = !1
        }
        _isContainerVisible() {
            return this.$el.is(":visible")
        }
        _isLargeScreenSize() {
            return window.innerWidth > 800
        }
    }, Views.SystemBanner = class {
        constructor(e) {
            this.$el = e, this.dom = {
                $banner: this.$el,
                $form: this.$el.find(".js-system-banner__accept").closest("form")
            }, this.dom.$form.on({
                "ajax:success": this.handleSuccess.bind(this)
            })
        }
        handleSuccess() {
            this.dom.$banner.slideUp(100, () => this.dom.$banner.remove())
        }
    }, Views.TermsReacceptanceModal = class {
        constructor(e) {
            this.$el = e, this.submitPath = e.data("submitPath"), this.$checkbox = e.find("[data-terms-accept-checkbox]"), this.$submit = e.find("[data-terms-submit]"), this.$error = e.find("[data-terms-error]"), this.inFlight = !1, this.failureCount = 0, this.maxRetries = 3, this.onKeydown = this.handleKeydown.bind(this), this.previousActiveElement = document.activeElement, this.lockScroll(), document.addEventListener("keydown", this.onKeydown, !0), this.$checkbox.on("change", this.toggleSubmit.bind(this)), this.$submit.on("click", this.submit.bind(this)), this.toggleSubmit(), this.$el.find(".terms-reacceptance-modal").trigger("focus")
        }
        handleKeydown(e) {
            "Escape" === e.key || 27 === e.keyCode ? (e.preventDefault(), e.stopPropagation()) : "Tab" !== e.key && 9 !== e.keyCode || this.trapFocus(e)
        }
        trapFocus(e) {
            const t = this.$el.find("a[href], button:not([disabled]), input:not([disabled])").filter(":visible");
            if (!t.length) return void e.preventDefault();
            const i = t[0],
                s = t[t.length - 1],
                r = document.activeElement;
            this.$el[0].contains(r) ? e.shiftKey && r === i ? (e.preventDefault(), s.focus()) : e.shiftKey || r !== s || (e.preventDefault(), i.focus()) : (e.preventDefault(), i.focus())
        }
        toggleSubmit() {
            this.inFlight || this.$submit.prop("disabled", !this.$checkbox.prop("checked"))
        }
        submit() {
            this.inFlight || (this.inFlight = !0, this.$submit.prop("disabled", !0).attr("aria-busy", "true"), this.$error.addClass("is-hidden"), $.ajax({
                url: this.submitPath,
                method: "PUT",
                dataType: "text",
                headers: {
                    "X-CSRF-Token": this.csrfToken()
                }
            }).done(this.handleSuccess.bind(this)).fail(this.handleError.bind(this)))
        }
        handleSuccess() {
            document.removeEventListener("keydown", this.onKeydown, !0), this.unlockScroll(), this.$el.remove(), this.previousActiveElement && this.previousActiveElement.focus && this.previousActiveElement.focus()
        }
        handleError() {
            this.inFlight = !1, this.failureCount += 1;
            const e = this.failureCount >= this.maxRetries ? "We couldn\u2019t save your acceptance. Please reload the page and try again." : "Something went wrong. Please try again.";
            this.$error.text(e).removeClass("is-hidden"), this.$submit.removeAttr("aria-busy"), this.toggleSubmit()
        }
        csrfToken() {
            return $('meta[name="csrf-token"]').attr("content")
        }
        lockScroll() {
            this.previousBodyOverflow = document.body.style.overflow, document.body.style.overflow = "hidden"
        }
        unlockScroll() {
            document.body.style.overflow = this.previousBodyOverflow || ""
        }
    }, Views.TextareaAutosize = class {
        constructor(e) {
            e.autosize()
        }
    }, Views.TouchOnlyDropdown = class {
        constructor(e) {
            try {
                if (Market.Helpers.touchDetection.isTouchPrimaryDevice()) {
                    this.delegatedDropdown = new Views.DelegatedDropdown(e);
                    const t = $(e.data("dropdownTarget"));
                    t.length > 0 && t.addClass("touch-only-dropdown-is-ready is-hidden")
                }
            } catch (e) {}
        }
    }, Views.AffiliatesTracker = class {
        constructor() {
            const e = this.registerReferral.bind(this);
            (0, Market.Helpers.CookieConsent.given)("necessary") && e()
        }
        registerReferral() {
            const e = this._currentLocation(),
                t = new URL(e);
            t.pathname = "/consociate/indite", t.search && !t.search.includes("redirect_back") && (t.searchParams.append("url", e), t.searchParams.append("referrer", document.referrer)), $.ajax({
                method: "GET",
                url: t.href,
                dataType: "JSON",
                timeout: 5e3,
                xhrFields: {
                    withCredentials: !0
                }
            }).then(e => {
                e && e.redirect && (window.location.href = e.redirect_url)
            }).catch(() => {})
        }
        _currentLocation() {
            return window.location.href
        }
    }, Views.ImpressionTracker = class {
        constructor(e) {
            this.$el = e, this.#e()
        }#
        e() {
            this.observer = new IntersectionObserver(this.#t.bind(this)), this.$el.find("[data-analytics-view-payload]").each((e, t) => {
                this.observer.observe(t)
            })
        }#
        t(e) {
            for (const t of e) t.isIntersecting && (this.#i(t.target), this.observer.unobserve(t.target))
        }#
        i(e) {
            const t = this.#s(e);
            t && (window.GtmMeasurements.sendAnalyticsEvent(t), e.dataset.analyticsViewed = "true")
        }#
        s(e) {
            try {
                return JSON.parse(e.dataset.analyticsViewPayload)
            } catch (e) {
                if (document.body.dataset.railsEnv) {
                    (window.Rollbar || console).error("ImpressionTracker error", e)
                }
                return
            }
        }
    }, Views.AddToCartAutoSubmitForm = class {
        constructor(e) {
            e.submit()
        }
    }, Views.AutoSelect = class {
        constructor(e) {
            e.on("change", function() {
                e.closest("form").submit()
            })
        }
    }, Market.DOMUtils._userSignedIn = null, Market.DOMUtils.isUserSignedIn = function() {
        return null !== Market.DOMUtils._userSignedIn ? Market.DOMUtils._userSignedIn : Market.DOMUtils._userSignedIn = $("body").data("userSignedIn")
    },
    function(e, t) {
        "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Handlebars = t() : e.Handlebars = t()
    }(this, function() {
        return function(e) {
            function t(s) {
                if (i[s]) return i[s].exports;
                var r = i[s] = {
                    exports: {},
                    id: s,
                    loaded: !1
                };
                return e[s].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
            }
            var i = {};
            return t.m = e, t.c = i, t.p = "", t(0)
        }([function(e, t, i) {
            "use strict";

            function s() {
                var e = d();
                return e.compile = function(t, i) {
                    return l.compile(t, i, e)
                }, e.precompile = function(t, i) {
                    return l.precompile(t, i, e)
                }, e.AST = a.default, e.Compiler = l.Compiler, e.JavaScriptCompiler = c.default, e.Parser = o.parser, e.parse = o.parse, e.parseWithoutProcessing = o.parseWithoutProcessing, e
            }
            var r = i(1).default;
            t.__esModule = !0;
            var n = r(i(2)),
                a = r(i(83)),
                o = i(84),
                l = i(90),
                c = r(i(91)),
                u = r(i(87)),
                h = r(i(82)),
                d = n.default.create,
                p = s();
            p.create = s, h.default(p), p.Visitor = u.default, p.default = p, t.default = p, e.exports = t.default
        }, function(e, t) {
            "use strict";
            t.default = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }, t.__esModule = !0
        }, function(e, t, i) {
            "use strict";

            function s() {
                var e = new a.HandlebarsEnvironment;
                return c.extend(e, a), e.SafeString = o.default, e.Exception = l.default, e.Utils = c, e.escapeExpression = c.escapeExpression, e.VM = u, e.template = function(t) {
                    return u.template(t, e)
                }, e
            }
            var r = i(3).default,
                n = i(1).default;
            t.__esModule = !0;
            var a = r(i(4)),
                o = n(i(76)),
                l = n(i(6)),
                c = r(i(5)),
                u = r(i(77)),
                h = n(i(82)),
                d = s();
            d.create = s, h.default(d), d.default = d, t.default = d, e.exports = t.default
        }, function(e, t) {
            "use strict";
            t.default = function(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                return t.default = e, t
            }, t.__esModule = !0
        }, function(e, t, i) {
            "use strict";

            function s(e, t, i) {
                this.helpers = e || {}, this.partials = t || {}, this.decorators = i || {}, o.registerDefaultHelpers(this), l.registerDefaultDecorators(this)
            }
            var r = i(1).default;
            t.__esModule = !0, t.HandlebarsEnvironment = s;
            var n = i(5),
                a = r(i(6)),
                o = i(10),
                l = i(70),
                c = r(i(72)),
                u = i(73),
                h = "4.7.10";
            t.VERSION = h;
            var d = 8;
            t.COMPILER_REVISION = d;
            var p = 7;
            t.LAST_COMPATIBLE_COMPILER_REVISION = p;
            var f = {
                1: "<= 1.0.rc.2",
                2: "== 1.0.0-rc.3",
                3: "== 1.0.0-rc.4",
                4: "== 1.x.x",
                5: "== 2.0.0-alpha.x",
                6: ">= 2.0.0-beta.1",
                7: ">= 4.0.0 <4.3.0",
                8: ">= 4.3.0"
            };
            t.REVISION_CHANGES = f;
            var m = "[object Object]";
            s.prototype = {
                constructor: s,
                logger: c.default,
                log: c.default.log,
                registerHelper: function(e, t) {
                    if (n.toString.call(e) === m) {
                        if (t) throw new a.default("Arg not supported with multiple helpers");
                        n.extend(this.helpers, e)
                    } else this.helpers[e] = t
                },
                unregisterHelper: function(e) {
                    delete this.helpers[e]
                },
                registerPartial: function(e, t) {
                    if (n.toString.call(e) === m) n.extend(this.partials, e);
                    else {
                        if (void 0 === t) throw new a.default('Attempting to register a partial called "' + e + '" as undefined');
                        this.partials[e] = t
                    }
                },
                unregisterPartial: function(e) {
                    delete this.partials[e]
                },
                registerDecorator: function(e, t) {
                    if (n.toString.call(e) === m) {
                        if (t) throw new a.default("Arg not supported with multiple decorators");
                        n.extend(this.decorators, e)
                    } else this.decorators[e] = t
                },
                unregisterDecorator: function(e) {
                    delete this.decorators[e]
                },
                resetLoggedPropertyAccesses: function() {
                    u.resetLoggedProperties()
                }
            };
            var g = c.default.log;
            t.log = g, t.createFrame = n.createFrame, t.logger = c.default
        }, function(e, t) {
            "use strict";

            function i(e) {
                return u[e]
            }

            function s(e) {
                for (var t = 1; t < arguments.length; t++)
                    for (var i in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], i) && (e[i] = arguments[t][i]);
                return e
            }

            function r(e, t) {
                for (var i = 0, s = e.length; i < s; i++)
                    if (e[i] === t) return i;
                return -1
            }

            function n(e) {
                if ("string" != typeof e) {
                    if (e && "function" == typeof e.toHTML) return e.toHTML();
                    if (null == e) return "";
                    if (!e) return e + "";
                    e = "" + e
                }
                return d.test(e) ? e.replace(h, i) : e
            }

            function a(e) {
                return !e && 0 !== e || !(!m(e) || 0 !== e.length)
            }

            function o(e) {
                var t = s({}, e);
                return t._parent = e, t
            }

            function l(e, t) {
                return e.path = t, e
            }

            function c(e, t) {
                return (e ? e + "." : "") + t
            }
            t.__esModule = !0, t.extend = s, t.indexOf = r, t.escapeExpression = n, t.isEmpty = a, t.createFrame = o, t.blockParams = l, t.appendContextPath = c;
            var u = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;",
                    "=": "&#x3D;"
                },
                h = /[&<>"'`=]/g,
                d = /[&<>"'`=]/,
                p = Object.prototype.toString;
            t.toString = p;
            var f = function(e) {
                return "function" == typeof e
            };
            f(/x/) && (t.isFunction = f = function(e) {
                return "function" == typeof e && "[object Function]" === p.call(e)
            }), t.isFunction = f;
            var m = Array.isArray || function(e) {
                return !(!e || "object" != typeof e) && "[object Array]" === p.call(e)
            };
            t.isArray = m
        }, function(e, t, i) {
            "use strict";

            function s(e, t) {
                var i = t && t.loc,
                    a = void 0,
                    o = void 0,
                    l = void 0,
                    c = void 0;
                i && i.start && (a = i.start.line, l = i.start.column, i.end && (o = i.end.line, c = i.end.column), e += " - " + a + ":" + l);
                for (var u = Error.prototype.constructor.call(this, e), h = 0; h < n.length; h++) this[n[h]] = u[n[h]];
                Error.captureStackTrace && Error.captureStackTrace(this, s);
                try {
                    i && (this.lineNumber = a, this.endLineNumber = o, r ? (Object.defineProperty(this, "column", {
                        value: l,
                        enumerable: !0
                    }), Object.defineProperty(this, "endColumn", {
                        value: c,
                        enumerable: !0
                    })) : (this.column = l, this.endColumn = c))
                } catch (e) {}
            }
            var r = i(7).default;
            t.__esModule = !0;
            var n = ["description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack"];
            s.prototype = new Error, t.default = s, e.exports = t.default
        }, function(e, t, i) {
            e.exports = {
                default: i(8),
                __esModule: !0
            }
        }, function(e, t, i) {
            var s = i(9);
            e.exports = function(e, t, i) {
                return s.setDesc(e, t, i)
            }
        }, function(e) {
            var t = Object;
            e.exports = {
                create: t.create,
                getProto: t.getPrototypeOf,
                isEnum: {}.propertyIsEnumerable,
                getDesc: t.getOwnPropertyDescriptor,
                setDesc: t.defineProperty,
                setDescs: t.defineProperties,
                getKeys: t.keys,
                getNames: t.getOwnPropertyNames,
                getSymbols: t.getOwnPropertySymbols,
                each: [].forEach
            }
        }, function(e, t, i) {
            "use strict";

            function s(e) {
                a.default(e), o.default(e), l.default(e), c.default(e), u.default(e), h.default(e), d.default(e)
            }

            function r(e, t, i) {
                e.helpers[t] && (e.hooks[t] = e.helpers[t], i || (e.helpers[t] = void 0))
            }
            var n = i(1).default;
            t.__esModule = !0, t.registerDefaultHelpers = s, t.moveHelperToHooks = r;
            var a = n(i(11)),
                o = n(i(12)),
                l = n(i(65)),
                c = n(i(66)),
                u = n(i(67)),
                h = n(i(68)),
                d = n(i(69))
        }, function(e, t, i) {
            "use strict";
            t.__esModule = !0;
            var s = i(5);
            t.default = function(e) {
                e.registerHelper("blockHelperMissing", function(t, i) {
                    var r = i.inverse,
                        n = i.fn;
                    if (!0 === t) return n(this);
                    if (!1 === t || null == t) return r(this);
                    if (s.isArray(t)) return t.length > 0 ? (i.ids && (i.ids = [i.name]), e.helpers.each(t, i)) : r(this);
                    if (i.data && i.ids) {
                        var a = s.createFrame(i.data);
                        a.contextPath = s.appendContextPath(i.data.contextPath, i.name), i = {
                            data: a
                        }
                    }
                    return n(t, i)
                })
            }, e.exports = t.default
        }, function(e, t, i) {
            "use strict";

            function s(e) {
                try {
                    var t = e.return;
                    c.isFunction(t) && t.call(e)
                } catch (e) {}
            }
            var r = i(13).default,
                n = i(43).default,
                a = i(55).default,
                o = i(60).default,
                l = i(1).default;
            t.__esModule = !0;
            var c = i(5),
                u = l(i(6));
            t.default = function(e) {
                e.registerHelper("each", function(e, t) {
                    function i(e, t, i, s) {
                        m && (m.key = e, m.index = t, m.first = 0 === t, m.last = !!i, g && (m.contextPath = g + e)), f += h(s, {
                            data: m,
                            blockParams: c.blockParams([s, e], [g + e, null])
                        })
                    }
                    if (!t) throw new u.default("Must pass iterator to #each");
                    var l, h = t.fn,
                        d = t.inverse,
                        p = 0,
                        f = "",
                        m = void 0,
                        g = void 0;
                    if (t.data && t.ids && (g = c.appendContextPath(t.data.contextPath, t.ids[0]) + "."), c.isFunction(e) && (e = e.call(this)), t.data && (m = c.createFrame(t.data)), e && "object" == typeof e)
                        if (c.isArray(e))
                            for (var v = e.length; p < v; p++) p in e && i(p, p, p === e.length - 1, e[p]);
                        else if ("function" == typeof r && e[n])
                        for (var y = a(e), b = y.next(); !b.done;) {
                            var _ = y.next();
                            try {
                                i(p, p, _.done, b.value)
                            } catch (e) {
                                throw _.done || s(y), e
                            }
                            b = _, p++
                        } else l = void 0, o(e).forEach(function(t) {
                            void 0 !== l && i(l, p - 1, !1, e[l]), l = t, p++
                        }), void 0 !== l && i(l, p - 1, !0, e[l]);
                    return 0 === p && (f = d(this)), f
                })
            }, e.exports = t.default
        }, function(e, t, i) {
            e.exports = {
                default: i(14),
                __esModule: !0
            }
        }, function(e, t, i) {
            i(15), i(42), e.exports = i(21).Symbol
        }, function(e, t, i) {
            "use strict";
            var s = i(9),
                r = i(16),
                n = i(17),
                a = i(18),
                o = i(20),
                l = i(24),
                c = i(19),
                u = i(27),
                h = i(28),
                d = i(30),
                p = i(29),
                f = i(31),
                m = i(36),
                g = i(37),
                v = i(38),
                y = i(39),
                b = i(32),
                _ = i(26),
                w = s.getDesc,
                k = s.setDesc,
                $ = s.create,
                x = m.get,
                C = r.Symbol,
                S = r.JSON,
                A = S && S.stringify,
                D = !1,
                P = p("_hidden"),
                M = s.isEnum,
                T = u("symbol-registry"),
                E = u("symbols"),
                F = "function" == typeof C,
                j = Object.prototype,
                I = a && c(function() {
                    return 7 != $(k({}, "a", {
                        get: function() {
                            return k(this, "a", {
                                value: 7
                            }).a
                        }
                    })).a
                }) ? function(e, t, i) {
                    var s = w(j, t);
                    s && delete j[t], k(e, t, i), s && e !== j && k(j, t, s)
                } : k,
                L = function(e) {
                    var t = E[e] = $(C.prototype);
                    return t._k = e, a && D && I(j, e, {
                        configurable: !0,
                        set: function(t) {
                            n(this, P) && n(this[P], e) && (this[P][e] = !1), I(this, e, _(1, t))
                        }
                    }), t
                },
                O = function(e) {
                    return "symbol" == typeof e
                },
                R = function(e, t, i) {
                    return i && n(E, t) ? (i.enumerable ? (n(e, P) && e[P][t] && (e[P][t] = !1), i = $(i, {
                        enumerable: _(0, !1)
                    })) : (n(e, P) || k(e, P, _(1, {})), e[P][t] = !0), I(e, t, i)) : k(e, t, i)
                },
                B = function(e, t) {
                    y(e);
                    for (var i, s = g(t = b(t)), r = 0, n = s.length; n > r;) R(e, i = s[r++], t[i]);
                    return e
                },
                N = function(e, t) {
                    return void 0 === t ? $(e) : B($(e), t)
                },
                U = function(e) {
                    var t = M.call(this, e);
                    return !(t || !n(this, e) || !n(E, e) || n(this, P) && this[P][e]) || t
                },
                V = function(e, t) {
                    var i = w(e = b(e), t);
                    return !i || !n(E, t) || n(e, P) && e[P][t] || (i.enumerable = !0), i
                },
                q = function(e) {
                    for (var t, i = x(b(e)), s = [], r = 0; i.length > r;) n(E, t = i[r++]) || t == P || s.push(t);
                    return s
                },
                H = function(e) {
                    for (var t, i = x(b(e)), s = [], r = 0; i.length > r;) n(E, t = i[r++]) && s.push(E[t]);
                    return s
                },
                W = function(e) {
                    if (void 0 !== e && !O(e)) {
                        for (var t, i, s = [e], r = 1, n = arguments; n.length > r;) s.push(n[r++]);
                        return "function" == typeof(t = s[1]) && (i = t), !i && v(t) || (t = function(e, t) {
                            if (i && (t = i.call(this, e, t)), !O(t)) return t
                        }), s[1] = t, A.apply(S, s)
                    }
                },
                Y = c(function() {
                    var e = C();
                    return "[null]" != A([e]) || "{}" != A({
                        a: e
                    }) || "{}" != A(Object(e))
                });
            F || (C = function() {
                if (O(this)) throw TypeError("Symbol is not a constructor");
                return L(d(arguments.length > 0 ? arguments[0] : void 0))
            }, l(C.prototype, "toString", function() {
                return this._k
            }), O = function(e) {
                return e instanceof C
            }, s.create = N, s.isEnum = U, s.getDesc = V, s.setDesc = R, s.setDescs = B, s.getNames = m.get = q, s.getSymbols = H, a && !i(41) && l(j, "propertyIsEnumerable", U, !0));
            var z = {
                for: function(e) {
                    return n(T, e += "") ? T[e] : T[e] = C(e)
                },
                keyFor: function(e) {
                    return f(T, e)
                },
                useSetter: function() {
                    D = !0
                },
                useSimple: function() {
                    D = !1
                }
            };
            s.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), function(e) {
                var t = p(e);
                z[e] = F ? t : L(t)
            }), D = !0, o(o.G + o.W, {
                Symbol: C
            }), o(o.S, "Symbol", z), o(o.S + o.F * !F, "Object", {
                create: N,
                defineProperty: R,
                defineProperties: B,
                getOwnPropertyDescriptor: V,
                getOwnPropertyNames: q,
                getOwnPropertySymbols: H
            }), S && o(o.S + o.F * (!F || Y), "JSON", {
                stringify: W
            }), h(C, "Symbol"), h(Math, "Math", !0), h(r.JSON, "JSON", !0)
        }, function(e) {
            var t = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
            "number" == typeof __g && (__g = t)
        }, function(e) {
            var t = {}.hasOwnProperty;
            e.exports = function(e, i) {
                return t.call(e, i)
            }
        }, function(e, t, i) {
            e.exports = !i(19)(function() {
                return 7 != Object.defineProperty({}, "a", {
                    get: function() {
                        return 7
                    }
                }).a
            })
        }, function(e) {
            e.exports = function(e) {
                try {
                    return !!e()
                } catch (e) {
                    return !0
                }
            }
        }, function(e, t, i) {
            var s = i(16),
                r = i(21),
                n = i(22),
                a = "prototype",
                o = function(e, t, i) {
                    var l, c, u, h = e & o.F,
                        d = e & o.G,
                        p = e & o.S,
                        f = e & o.P,
                        m = e & o.B,
                        g = e & o.W,
                        v = d ? r : r[t] || (r[t] = {}),
                        y = d ? s : p ? s[t] : (s[t] || {})[a];
                    for (l in d && (i = t), i)(c = !h && y && l in y) && l in v || (u = c ? y[l] : i[l], v[l] = d && "function" != typeof y[l] ? i[l] : m && c ? n(u, s) : g && y[l] == u ? function(e) {
                        var t = function(t) {
                            return this instanceof e ? new e(t) : e(t)
                        };
                        return t[a] = e[a], t
                    }(u) : f && "function" == typeof u ? n(Function.call, u) : u, f && ((v[a] || (v[a] = {}))[l] = u))
                };
            o.F = 1, o.G = 2, o.S = 4, o.P = 8, o.B = 16, o.W = 32, e.exports = o
        }, function(e) {
            var t = e.exports = {
                version: "1.2.6"
            };
            "number" == typeof __e && (__e = t)
        }, function(e, t, i) {
            var s = i(23);
            e.exports = function(e, t, i) {
                if (s(e), void 0 === t) return e;
                switch (i) {
                    case 1:
                        return function(i) {
                            return e.call(t, i)
                        };
                    case 2:
                        return function(i, s) {
                            return e.call(t, i, s)
                        };
                    case 3:
                        return function(i, s, r) {
                            return e.call(t, i, s, r)
                        }
                }
                return function() {
                    return e.apply(t, arguments)
                }
            }
        }, function(e) {
            e.exports = function(e) {
                if ("function" != typeof e) throw TypeError(e + " is not a function!");
                return e
            }
        }, function(e, t, i) {
            e.exports = i(25)
        }, function(e, t, i) {
            var s = i(9),
                r = i(26);
            e.exports = i(18) ? function(e, t, i) {
                return s.setDesc(e, t, r(1, i))
            } : function(e, t, i) {
                return e[t] = i, e
            }
        }, function(e) {
            e.exports = function(e, t) {
                return {
                    enumerable: !(1 & e),
                    configurable: !(2 & e),
                    writable: !(4 & e),
                    value: t
                }
            }
        }, function(e, t, i) {
            var s = i(16),
                r = "__core-js_shared__",
                n = s[r] || (s[r] = {});
            e.exports = function(e) {
                return n[e] || (n[e] = {})
            }
        }, function(e, t, i) {
            var s = i(9).setDesc,
                r = i(17),
                n = i(29)("toStringTag");
            e.exports = function(e, t, i) {
                e && !r(e = i ? e : e.prototype, n) && s(e, n, {
                    configurable: !0,
                    value: t
                })
            }
        }, function(e, t, i) {
            var s = i(27)("wks"),
                r = i(30),
                n = i(16).Symbol;
            e.exports = function(e) {
                return s[e] || (s[e] = n && n[e] || (n || r)("Symbol." + e))
            }
        }, function(e) {
            var t = 0,
                i = Math.random();
            e.exports = function(e) {
                return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++t + i).toString(36))
            }
        }, function(e, t, i) {
            var s = i(9),
                r = i(32);
            e.exports = function(e, t) {
                for (var i, n = r(e), a = s.getKeys(n), o = a.length, l = 0; o > l;)
                    if (n[i = a[l++]] === t) return i
            }
        }, function(e, t, i) {
            var s = i(33),
                r = i(35);
            e.exports = function(e) {
                return s(r(e))
            }
        }, function(e, t, i) {
            var s = i(34);
            e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
                return "String" == s(e) ? e.split("") : Object(e)
            }
        }, function(e) {
            var t = {}.toString;
            e.exports = function(e) {
                return t.call(e).slice(8, -1)
            }
        }, function(e) {
            e.exports = function(e) {
                if (null == e) throw TypeError("Can't call method on  " + e);
                return e
            }
        }, function(e, t, i) {
            var s = i(32),
                r = i(9).getNames,
                n = {}.toString,
                a = "object" == typeof window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
                o = function(e) {
                    try {
                        return r(e)
                    } catch (e) {
                        return a.slice()
                    }
                };
            e.exports.get = function(e) {
                return a && "[object Window]" == n.call(e) ? o(e) : r(s(e))
            }
        }, function(e, t, i) {
            var s = i(9);
            e.exports = function(e) {
                var t = s.getKeys(e),
                    i = s.getSymbols;
                if (i)
                    for (var r, n = i(e), a = s.isEnum, o = 0; n.length > o;) a.call(e, r = n[o++]) && t.push(r);
                return t
            }
        }, function(e, t, i) {
            var s = i(34);
            e.exports = Array.isArray || function(e) {
                return "Array" == s(e)
            }
        }, function(e, t, i) {
            var s = i(40);
            e.exports = function(e) {
                if (!s(e)) throw TypeError(e + " is not an object!");
                return e
            }
        }, function(e) {
            e.exports = function(e) {
                return "object" == typeof e ? null !== e : "function" == typeof e
            }
        }, function(e) {
            e.exports = !0
        }, function() {}, function(e, t, i) {
            e.exports = {
                default: i(44),
                __esModule: !0
            }
        }, function(e, t, i) {
            i(45), i(51), e.exports = i(29)("iterator")
        }, function(e, t, i) {
            "use strict";
            var s = i(46)(!0);
            i(48)(String, "String", function(e) {
                this._t = String(e), this._i = 0
            }, function() {
                var e, t = this._t,
                    i = this._i;
                return i >= t.length ? {
                    value: void 0,
                    done: !0
                } : (e = s(t, i), this._i += e.length, {
                    value: e,
                    done: !1
                })
            })
        }, function(e, t, i) {
            var s = i(47),
                r = i(35);
            e.exports = function(e) {
                return function(t, i) {
                    var n, a, o = String(r(t)),
                        l = s(i),
                        c = o.length;
                    return l < 0 || l >= c ? e ? "" : void 0 : (n = o.charCodeAt(l)) < 55296 || n > 56319 || l + 1 === c || (a = o.charCodeAt(l + 1)) < 56320 || a > 57343 ? e ? o.charAt(l) : n : e ? o.slice(l, l + 2) : a - 56320 + (n - 55296 << 10) + 65536
                }
            }
        }, function(e) {
            var t = Math.ceil,
                i = Math.floor;
            e.exports = function(e) {
                return isNaN(e = +e) ? 0 : (e > 0 ? i : t)(e)
            }
        }, function(e, t, i) {
            "use strict";
            var s = i(41),
                r = i(20),
                n = i(24),
                a = i(25),
                o = i(17),
                l = i(49),
                c = i(50),
                u = i(28),
                h = i(9).getProto,
                d = i(29)("iterator"),
                p = !([].keys && "next" in [].keys()),
                f = "@@iterator",
                m = "keys",
                g = "values",
                v = function() {
                    return this
                };
            e.exports = function(e, t, i, y, b, _, w) {
                c(i, t, y);
                var k, $, x = function(e) {
                        if (!p && e in D) return D[e];
                        switch (e) {
                            case m:
                            case g:
                                return function() {
                                    return new i(this, e)
                                }
                        }
                        return function() {
                            return new i(this, e)
                        }
                    },
                    C = t + " Iterator",
                    S = b == g,
                    A = !1,
                    D = e.prototype,
                    P = D[d] || D[f] || b && D[b],
                    M = P || x(b);
                if (P) {
                    var T = h(M.call(new e));
                    u(T, C, !0), !s && o(D, f) && a(T, d, v), S && P.name !== g && (A = !0, M = function() {
                        return P.call(this)
                    })
                }
                if (s && !w || !p && !A && D[d] || a(D, d, M), l[t] = M, l[C] = v, b)
                    if (k = {
                            values: S ? M : x(g),
                            keys: _ ? M : x(m),
                            entries: S ? x("entries") : M
                        }, w)
                        for ($ in k) $ in D || n(D, $, k[$]);
                    else r(r.P + r.F * (p || A), t, k);
                return k
            }
        }, function(e) {
            e.exports = {}
        }, function(e, t, i) {
            "use strict";
            var s = i(9),
                r = i(26),
                n = i(28),
                a = {};
            i(25)(a, i(29)("iterator"), function() {
                return this
            }), e.exports = function(e, t, i) {
                e.prototype = s.create(a, {
                    next: r(1, i)
                }), n(e, t + " Iterator")
            }
        }, function(e, t, i) {
            i(52);
            var s = i(49);
            s.NodeList = s.HTMLCollection = s.Array
        }, function(e, t, i) {
            "use strict";
            var s = i(53),
                r = i(54),
                n = i(49),
                a = i(32);
            e.exports = i(48)(Array, "Array", function(e, t) {
                this._t = a(e), this._i = 0, this._k = t
            }, function() {
                var e = this._t,
                    t = this._k,
                    i = this._i++;
                return !e || i >= e.length ? (this._t = void 0, r(1)) : r(0, "keys" == t ? i : "values" == t ? e[i] : [i, e[i]])
            }, "values"), n.Arguments = n.Array, s("keys"), s("values"), s("entries")
        }, function(e) {
            e.exports = function() {}
        }, function(e) {
            e.exports = function(e, t) {
                return {
                    value: t,
                    done: !!e
                }
            }
        }, function(e, t, i) {
            e.exports = {
                default: i(56),
                __esModule: !0
            }
        }, function(e, t, i) {
            i(51), i(45), e.exports = i(57)
        }, function(e, t, i) {
            var s = i(39),
                r = i(58);
            e.exports = i(21).getIterator = function(e) {
                var t = r(e);
                if ("function" != typeof t) throw TypeError(e + " is not iterable!");
                return s(t.call(e))
            }
        }, function(e, t, i) {
            var s = i(59),
                r = i(29)("iterator"),
                n = i(49);
            e.exports = i(21).getIteratorMethod = function(e) {
                if (null != e) return e[r] || e["@@iterator"] || n[s(e)]
            }
        }, function(e, t, i) {
            var s = i(34),
                r = i(29)("toStringTag"),
                n = "Arguments" == s(function() {
                    return arguments
                }());
            e.exports = function(e) {
                var t, i, a;
                return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(i = (t = Object(e))[r]) ? i : n ? s(t) : "Object" == (a = s(t)) && "function" == typeof t.callee ? "Arguments" : a
            }
        }, function(e, t, i) {
            e.exports = {
                default: i(61),
                __esModule: !0
            }
        }, function(e, t, i) {
            i(62), e.exports = i(21).Object.keys
        }, function(e, t, i) {
            var s = i(63);
            i(64)("keys", function(e) {
                return function(t) {
                    return e(s(t))
                }
            })
        }, function(e, t, i) {
            var s = i(35);
            e.exports = function(e) {
                return Object(s(e))
            }
        }, function(e, t, i) {
            var s = i(20),
                r = i(21),
                n = i(19);
            e.exports = function(e, t) {
                var i = (r.Object || {})[e] || Object[e],
                    a = {};
                a[e] = t(i), s(s.S + s.F * n(function() {
                    i(1)
                }), "Object", a)
            }
        }, function(e, t, i) {
            "use strict";
            var s = i(1).default;
            t.__esModule = !0;
            var r = s(i(6));
            t.default = function(e) {
                e.registerHelper("helperMissing", function() {
                    if (1 !== arguments.length) throw new r.default('Missing helper: "' + arguments[arguments.length - 1].name + '"')
                })
            }, e.exports = t.default
        }, function(e, t, i) {
            "use strict";
            var s = i(1).default;
            t.__esModule = !0;
            var r = i(5),
                n = s(i(6));
            t.default = function(e) {
                e.registerHelper("if", function(e, t) {
                    if (2 != arguments.length) throw new n.default("#if requires exactly one argument");
                    return r.isFunction(e) && (e = e.call(this)), !t.hash.includeZero && !e || r.isEmpty(e) ? t.inverse(this) : t.fn(this)
                }), e.registerHelper("unless", function(t, i) {
                    if (2 != arguments.length) throw new n.default("#unless requires exactly one argument");
                    return e.helpers.if.call(this, t, {
                        fn: i.inverse,
                        inverse: i.fn,
                        hash: i.hash
                    })
                })
            }, e.exports = t.default
        }, function(e, t) {
            "use strict";
            t.__esModule = !0, t.default = function(e) {
                e.registerHelper("log", function() {
                    for (var t = [void 0], i = arguments[arguments.length - 1], s = 0; s < arguments.length - 1; s++) t.push(arguments[s]);
                    var r = 1;
                    null != i.hash.level ? r = i.hash.level : i.data && null != i.data.level && (r = i.data.level), t[0] = r, e.log.apply(e, t)
                })
            }, e.exports = t.default
        }, function(e, t) {
            "use strict";
            t.__esModule = !0, t.default = function(e) {
                e.registerHelper("lookup", function(e, t, i) {
                    return e ? i.lookupProperty(e, t) : e
                })
            }, e.exports = t.default
        }, function(e, t, i) {
            "use strict";
            var s = i(1).default;
            t.__esModule = !0;
            var r = i(5),
                n = s(i(6));
            t.default = function(e) {
                e.registerHelper("with", function(e, t) {
                    if (2 != arguments.length) throw new n.default("#with requires exactly one argument");
                    r.isFunction(e) && (e = e.call(this));
                    var i = t.fn;
                    if (r.isEmpty(e)) return t.inverse(this);
                    var s = t.data;
                    return t.data && t.ids && ((s = r.createFrame(t.data)).contextPath = r.appendContextPath(t.data.contextPath, t.ids[0])), i(e, {
                        data: s,
                        blockParams: r.blockParams([e], [s && s.contextPath])
                    })
                })
            }, e.exports = t.default
        }, function(e, t, i) {
            "use strict";

            function s(e) {
                n.default(e)
            }
            var r = i(1).default;
            t.__esModule = !0, t.registerDefaultDecorators = s;
            var n = r(i(71))
        }, function(e, t, i) {
            "use strict";
            t.__esModule = !0;
            var s = i(5);
            t.default = function(e) {
                e.registerDecorator("inline", function(e, t, i, r) {
                    var n = e;
                    return t.partials || (t.partials = {}, n = function(r, n) {
                        var a = i.partials;
                        i.partials = s.extend({}, a, t.partials);
                        var o = e(r, n);
                        return i.partials = a, o
                    }), t.partials[r.args[0]] = r.fn, n
                })
            }, e.exports = t.default
        }, function(e, t, i) {
            "use strict";
            t.__esModule = !0;
            var s = i(5),
                r = {
                    methodMap: ["debug", "info", "warn", "error"],
                    level: "info",
                    lookupLevel: function(e) {
                        if ("string" == typeof e) {
                            var t = s.indexOf(r.methodMap, e.toLowerCase());
                            e = t >= 0 ? t : parseInt(e, 10)
                        }
                        return e
                    },
                    log: function(e) {
                        if (e = r.lookupLevel(e), "undefined" != typeof console && r.lookupLevel(r.level) <= e) {
                            var t = r.methodMap[e];
                            console[t] || (t = "log");
                            for (var i = arguments.length, s = Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++) s[n - 1] = arguments[n];
                            console[t].apply(console, s)
                        }
                    }
                };
            t.default = r, e.exports = t.default
        }, function(e, t, i) {
            "use strict";

            function s(e) {
                var t = c(null);
                t.__proto__ = !1, d.extend(t, e.allowedProtoProperties);
                var i = c(null);
                return i.constructor = !1, i.__defineGetter__ = !1, i.__defineSetter__ = !1, i.__lookupGetter__ = !1, i.__lookupSetter__ = !1, d.extend(i, e.allowedProtoMethods), {
                    properties: {
                        whitelist: t,
                        defaultValue: e.allowProtoPropertiesByDefault
                    },
                    methods: {
                        whitelist: i,
                        defaultValue: e.allowProtoMethodsByDefault
                    }
                }
            }

            function r(e, t, i) {
                return a("function" == typeof e ? t.methods : t.properties, i)
            }

            function n(e, t, i) {
                return "constructor" === t && "function" == typeof i && e === i.prototype
            }

            function a(e, t) {
                return void 0 !== e.whitelist[t] ? !0 === e.whitelist[t] : void 0 !== e.defaultValue ? e.defaultValue : (o(t), !1)
            }

            function o(e) {
                !0 !== f[e] && (f[e] = !0, p.default.log("error", 'Handlebars: Access has been denied to resolve the property "' + e + '" because it is not an "own property" of its parent.\nYou can add a runtime option to disable the check or this warning:\nSee https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details'))
            }

            function l() {
                u(f).forEach(function(e) {
                    delete f[e]
                })
            }
            var c = i(74).default,
                u = i(60).default,
                h = i(1).default;
            t.__esModule = !0, t.createProtoAccessControl = s, t.resultIsAllowed = r, t.isPrototypeConstructor = n, t.resetLoggedProperties = l;
            var d = i(5),
                p = h(i(72)),
                f = c(null)
        }, function(e, t, i) {
            e.exports = {
                default: i(75),
                __esModule: !0
            }
        }, function(e, t, i) {
            var s = i(9);
            e.exports = function(e, t) {
                return s.create(e, t)
            }
        }, function(e, t) {
            "use strict";

            function i(e) {
                this.string = e
            }
            t.__esModule = !0, i.prototype.toString = i.prototype.toHTML = function() {
                return "" + this.string
            }, t.default = i, e.exports = t.default
        }, function(e, t, i) {
            "use strict";

            function s(e) {
                var t = e && e[0] || 1,
                    i = _.COMPILER_REVISION;
                if (!(t >= _.LAST_COMPATIBLE_COMPILER_REVISION && t <= _.COMPILER_REVISION)) {
                    if (t < _.LAST_COMPATIBLE_COMPILER_REVISION) {
                        var s = _.REVISION_CHANGES[i],
                            r = _.REVISION_CHANGES[t];
                        throw new b.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + s + ") or downgrade your runtime to an older version (" + r + ").")
                    }
                    throw new b.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").")
                }
            }

            function r(e, t) {
                function i(i, s, r) {
                    r.hash && (s = y.extend({}, s, r.hash), r.ids && (r.ids[0] = !0)), i = t.VM.resolvePartial.call(this, i, s, r), r.hooks = this.hooks, r.protoAccessControl = this.protoAccessControl;
                    var n = t.VM.invokePartial.call(this, i, s, r);
                    if (null == n && y.isFunction(i)) throw new b.default("The partial " + r.name + " returned no output: partials must return a string");
                    if (null == n && t.compile) {
                        if ("string" != typeof i) throw new b.default("The partial " + r.name + " could not be compiled: partials must be strings or functions returning strings");
                        r.partials[r.name] = t.compile(i, e.compilerOptions, t), n = r.partials[r.name](s, r)
                    }
                    if (null != n) {
                        if (r.indent) {
                            for (var a = n.split("\n"), o = 0, l = a.length; o < l && (a[o] || o + 1 !== l); o++) a[o] = r.indent + a[o];
                            n = a.join("\n")
                        }
                        return n
                    }
                    throw new b.default("The partial " + r.name + " could not be compiled when running in runtime-only mode")
                }

                function s(t) {
                    function i(t) {
                        return "" + e.main(a, t, a.helpers, a.partials, n, l, o)
                    }
                    var r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        n = r.data;
                    s._setup(r), !r.partial && e.useData && (n = u(t, n));
                    var o = void 0,
                        l = e.useBlockParams ? [] : void 0;
                    return e.useDepths && (o = r.depths ? t != r.depths[0] ? [t].concat(r.depths) : r.depths : [t]), (i = h(e.main, i, a, r.depths || [], n, l))(t, r)
                }
                if (!t) throw new b.default("No environment passed to template");
                if (!e || !e.main) throw new b.default("Unknown template object: " + typeof e);
                e.main.decorator = e.main_d, t.VM.checkRevision(e.compiler);
                var r = e.compiler && 7 === e.compiler[0],
                    a = {
                        strict: function(e, t, i) {
                            if (!e || !(t in e)) throw new b.default('"' + t + '" not defined in ' + e, {
                                loc: i
                            });
                            return a.lookupProperty(e, t)
                        },
                        lookupProperty: function(e, t) {
                            var i = e[t];
                            return null == i || Object.prototype.hasOwnProperty.call(e, t) && !$.isPrototypeConstructor(e, t, i) || $.resultIsAllowed(i, a.protoAccessControl, t) ? i : void 0
                        },
                        lookup: function(e, t) {
                            for (var i = e.length, s = 0; s < i; s++) {
                                var r = e[s] && a.lookupProperty(e[s], t);
                                if (null != r) return r
                            }
                        },
                        lambda: function(e, t) {
                            return "function" == typeof e ? e.call(t) : e
                        },
                        escapeExpression: y.escapeExpression,
                        invokePartial: i,
                        fn: function(t) {
                            var i = e[t];
                            return i.decorator = e[t + "_d"], i
                        },
                        programs: [],
                        program: function(e, t, i, s, r) {
                            var a = this.programs[e],
                                o = this.fn(e);
                            return t || r || s || i ? a = n(this, e, o, t, i, s, r) : a || (a = this.programs[e] = n(this, e, o)), a
                        },
                        data: function(e, t) {
                            for (; e && t--;) e = e._parent;
                            return e
                        },
                        mergeIfNeeded: function(e, t) {
                            var i = e || t;
                            return e && t && e !== t && (i = y.extend({}, t, e)), i
                        },
                        nullContext: f({}),
                        noop: t.VM.noop,
                        compilerInfo: e.compiler
                    };
                return s.isTop = !0, s._setup = function(i) {
                    if (i.partial) a.protoAccessControl = i.protoAccessControl, a.helpers = i.helpers, a.partials = i.partials, a.decorators = i.decorators, a.hooks = i.hooks;
                    else {
                        var s = {};
                        d(s, t.helpers, a), d(s, i.helpers, a), a.helpers = s, e.usePartial && (a.partials = a.mergeIfNeeded(i.partials, t.partials)), (e.usePartial || e.useDecorators) && (a.decorators = y.extend({}, t.decorators, i.decorators)), a.hooks = {}, a.protoAccessControl = $.createProtoAccessControl(i);
                        var n = i.allowCallsToHelperMissing || r;
                        w.moveHelperToHooks(a, "helperMissing", n), w.moveHelperToHooks(a, "blockHelperMissing", n)
                    }
                }, s._child = function(t, i, s, r) {
                    if (e.useBlockParams && !s) throw new b.default("must pass block params");
                    if (e.useDepths && !r) throw new b.default("must pass parent depths");
                    return n(a, t, e[t], i, 0, s, r)
                }, s
            }

            function n(e, t, i, s, r, n, a) {
                function o(t) {
                    var r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        o = a;
                    return !a || t == a[0] || t === e.nullContext && null === a[0] || (o = [t].concat(a)), i(e, t, e.helpers, e.partials, r.data || s, n && [r.blockParams].concat(n), o)
                }
                return (o = h(i, o, e, a, s, n)).program = t, o.depth = a ? a.length : 0, o.blockParams = r || 0, o
            }

            function a(e, t, i) {
                return e ? "function" == typeof e || i.name || (i.name = e, e = c(i.partials, e)) : e = "@partial-block" === i.name ? c(i.data, "partial-block") : c(i.partials, i.name), e
            }

            function o(e, t, i) {
                var s = c(i.data, "partial-block");
                i.partial = !0, i.ids && (i.data.contextPath = i.ids[0] || i.data.contextPath);
                var r = void 0;
                if (i.fn && i.fn !== l && function() {
                        i.data = _.createFrame(i.data);
                        var e = i.fn;
                        r = i.data["partial-block"] = function(t) {
                            var i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                            return i.data = _.createFrame(i.data), i.data["partial-block"] = s, e(t, i)
                        }, e.partials && (i.partials = y.extend({}, i.partials, e.partials))
                    }(), void 0 === e && r && (e = r), void 0 === e) throw new b.default("The partial " + i.name + " could not be found");
                if (e instanceof Function) return e(t, i)
            }

            function l() {
                return ""
            }

            function c(e, t) {
                if (e && Object.prototype.hasOwnProperty.call(e, t)) return e[t]
            }

            function u(e, t) {
                return t && "root" in t || ((t = t ? _.createFrame(t) : {}).root = e), t
            }

            function h(e, t, i, s, r, n) {
                if (e.decorator) {
                    var a = {};
                    t = e.decorator(t, a, i, s && s[0], r, n, s), y.extend(t, a)
                }
                return t
            }

            function d(e, t, i) {
                t && m(t).forEach(function(s) {
                    var r = t[s];
                    e[s] = p(r, i)
                })
            }

            function p(e, t) {
                var i = t.lookupProperty;
                return k.wrapHelper(e, function(e) {
                    return e.lookupProperty = i, e
                })
            }
            var f = i(78).default,
                m = i(60).default,
                g = i(3).default,
                v = i(1).default;
            t.__esModule = !0, t.checkRevision = s, t.template = r, t.wrapProgram = n, t.resolvePartial = a, t.invokePartial = o, t.noop = l;
            var y = g(i(5)),
                b = v(i(6)),
                _ = i(4),
                w = i(10),
                k = i(81),
                $ = i(73)
        }, function(e, t, i) {
            e.exports = {
                default: i(79),
                __esModule: !0
            }
        }, function(e, t, i) {
            i(80), e.exports = i(21).Object.seal
        }, function(e, t, i) {
            var s = i(40);
            i(64)("seal", function(e) {
                return function(t) {
                    return e && s(t) ? e(t) : t
                }
            })
        }, function(e, t) {
            "use strict";

            function i(e, t) {
                if ("function" != typeof e) return e;
                var i = function() {
                    var i = arguments[arguments.length - 1];
                    return arguments[arguments.length - 1] = t(i), e.apply(this, arguments)
                };
                return i
            }
            t.__esModule = !0, t.wrapHelper = i
        }, function(e, t) {
            "use strict";
            t.__esModule = !0, t.default = function(e) {
                "object" != typeof globalThis && (Object.prototype.__defineGetter__("__magic__", function() {
                    return this
                }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__);
                var t = globalThis.Handlebars;
                e.noConflict = function() {
                    return globalThis.Handlebars === e && (globalThis.Handlebars = t), e
                }
            }, e.exports = t.default
        }, function(e, t) {
            "use strict";
            t.__esModule = !0;
            var i = {
                helpers: {
                    helperExpression: function(e) {
                        return "SubExpression" === e.type || ("MustacheStatement" === e.type || "BlockStatement" === e.type) && !!(e.params && e.params.length || e.hash)
                    },
                    scopedId: function(e) {
                        return /^\.|this\b/.test(e.original)
                    },
                    simpleId: function(e) {
                        return 1 === e.parts.length && !i.helpers.scopedId(e) && !e.depth
                    }
                }
            };
            t.default = i, e.exports = t.default
        }, function(e, t, i) {
            "use strict";

            function s(e, t) {
                return "Program" === e.type ? e : (o.default.yy = h, h.locInfo = function(e) {
                    return new h.SourceLocation(t && t.srcName, e)
                }, o.default.parse(e))
            }

            function r(e, t) {
                var i = s(e, t);
                return new l.default(t).accept(i)
            }
            var n = i(1).default,
                a = i(3).default;
            t.__esModule = !0, t.parseWithoutProcessing = s, t.parse = r;
            var o = n(i(85)),
                l = n(i(86)),
                c = a(i(89)),
                u = i(5);
            t.parser = o.default;
            var h = {};
            u.extend(h, c)
        }, function(e, t) {
            "use strict";
            t.__esModule = !0;
            var i = function() {
                function e() {
                    this.yy = {}
                }
                var t = {
                        trace: function() {},
                        yy: {},
                        symbols_: {
                            error: 2,
                            root: 3,
                            program: 4,
                            EOF: 5,
                            program_repetition0: 6,
                            statement: 7,
                            mustache: 8,
                            block: 9,
                            rawBlock: 10,
                            partial: 11,
                            partialBlock: 12,
                            content: 13,
                            COMMENT: 14,
                            CONTENT: 15,
                            openRawBlock: 16,
                            rawBlock_repetition0: 17,
                            END_RAW_BLOCK: 18,
                            OPEN_RAW_BLOCK: 19,
                            helperName: 20,
                            openRawBlock_repetition0: 21,
                            openRawBlock_option0: 22,
                            CLOSE_RAW_BLOCK: 23,
                            openBlock: 24,
                            block_option0: 25,
                            closeBlock: 26,
                            openInverse: 27,
                            block_option1: 28,
                            OPEN_BLOCK: 29,
                            openBlock_repetition0: 30,
                            openBlock_option0: 31,
                            openBlock_option1: 32,
                            CLOSE: 33,
                            OPEN_INVERSE: 34,
                            openInverse_repetition0: 35,
                            openInverse_option0: 36,
                            openInverse_option1: 37,
                            openInverseChain: 38,
                            OPEN_INVERSE_CHAIN: 39,
                            openInverseChain_repetition0: 40,
                            openInverseChain_option0: 41,
                            openInverseChain_option1: 42,
                            inverseAndProgram: 43,
                            INVERSE: 44,
                            inverseChain: 45,
                            inverseChain_option0: 46,
                            OPEN_ENDBLOCK: 47,
                            OPEN: 48,
                            mustache_repetition0: 49,
                            mustache_option0: 50,
                            OPEN_UNESCAPED: 51,
                            mustache_repetition1: 52,
                            mustache_option1: 53,
                            CLOSE_UNESCAPED: 54,
                            OPEN_PARTIAL: 55,
                            partialName: 56,
                            partial_repetition0: 57,
                            partial_option0: 58,
                            openPartialBlock: 59,
                            OPEN_PARTIAL_BLOCK: 60,
                            openPartialBlock_repetition0: 61,
                            openPartialBlock_option0: 62,
                            param: 63,
                            sexpr: 64,
                            OPEN_SEXPR: 65,
                            sexpr_repetition0: 66,
                            sexpr_option0: 67,
                            CLOSE_SEXPR: 68,
                            hash: 69,
                            hash_repetition_plus0: 70,
                            hashSegment: 71,
                            ID: 72,
                            EQUALS: 73,
                            blockParams: 74,
                            OPEN_BLOCK_PARAMS: 75,
                            blockParams_repetition_plus0: 76,
                            CLOSE_BLOCK_PARAMS: 77,
                            path: 78,
                            dataName: 79,
                            STRING: 80,
                            NUMBER: 81,
                            BOOLEAN: 82,
                            UNDEFINED: 83,
                            NULL: 84,
                            DATA: 85,
                            pathSegments: 86,
                            SEP: 87,
                            $accept: 0,
                            $end: 1
                        },
                        terminals_: {
                            2: "error",
                            5: "EOF",
                            14: "COMMENT",
                            15: "CONTENT",
                            18: "END_RAW_BLOCK",
                            19: "OPEN_RAW_BLOCK",
                            23: "CLOSE_RAW_BLOCK",
                            29: "OPEN_BLOCK",
                            33: "CLOSE",
                            34: "OPEN_INVERSE",
                            39: "OPEN_INVERSE_CHAIN",
                            44: "INVERSE",
                            47: "OPEN_ENDBLOCK",
                            48: "OPEN",
                            51: "OPEN_UNESCAPED",
                            54: "CLOSE_UNESCAPED",
                            55: "OPEN_PARTIAL",
                            60: "OPEN_PARTIAL_BLOCK",
                            65: "OPEN_SEXPR",
                            68: "CLOSE_SEXPR",
                            72: "ID",
                            73: "EQUALS",
                            75: "OPEN_BLOCK_PARAMS",
                            77: "CLOSE_BLOCK_PARAMS",
                            80: "STRING",
                            81: "NUMBER",
                            82: "BOOLEAN",
                            83: "UNDEFINED",
                            84: "NULL",
                            85: "DATA",
                            87: "SEP"
                        },
                        productions_: [0, [3, 2],
                            [4, 1],
                            [7, 1],
                            [7, 1],
                            [7, 1],
                            [7, 1],
                            [7, 1],
                            [7, 1],
                            [7, 1],
                            [13, 1],
                            [10, 3],
                            [16, 5],
                            [9, 4],
                            [9, 4],
                            [24, 6],
                            [27, 6],
                            [38, 6],
                            [43, 2],
                            [45, 3],
                            [45, 1],
                            [26, 3],
                            [8, 5],
                            [8, 5],
                            [11, 5],
                            [12, 3],
                            [59, 5],
                            [63, 1],
                            [63, 1],
                            [64, 5],
                            [69, 1],
                            [71, 3],
                            [74, 3],
                            [20, 1],
                            [20, 1],
                            [20, 1],
                            [20, 1],
                            [20, 1],
                            [20, 1],
                            [20, 1],
                            [56, 1],
                            [56, 1],
                            [79, 2],
                            [78, 1],
                            [86, 3],
                            [86, 1],
                            [6, 0],
                            [6, 2],
                            [17, 0],
                            [17, 2],
                            [21, 0],
                            [21, 2],
                            [22, 0],
                            [22, 1],
                            [25, 0],
                            [25, 1],
                            [28, 0],
                            [28, 1],
                            [30, 0],
                            [30, 2],
                            [31, 0],
                            [31, 1],
                            [32, 0],
                            [32, 1],
                            [35, 0],
                            [35, 2],
                            [36, 0],
                            [36, 1],
                            [37, 0],
                            [37, 1],
                            [40, 0],
                            [40, 2],
                            [41, 0],
                            [41, 1],
                            [42, 0],
                            [42, 1],
                            [46, 0],
                            [46, 1],
                            [49, 0],
                            [49, 2],
                            [50, 0],
                            [50, 1],
                            [52, 0],
                            [52, 2],
                            [53, 0],
                            [53, 1],
                            [57, 0],
                            [57, 2],
                            [58, 0],
                            [58, 1],
                            [61, 0],
                            [61, 2],
                            [62, 0],
                            [62, 1],
                            [66, 0],
                            [66, 2],
                            [67, 0],
                            [67, 1],
                            [70, 1],
                            [70, 2],
                            [76, 1],
                            [76, 2]
                        ],
                        performAction: function(e, t, i, s, r, n) {
                            var a = n.length - 1;
                            switch (r) {
                                case 1:
                                    return n[a - 1];
                                case 2:
                                    this.$ = s.prepareProgram(n[a]);
                                    break;
                                case 3:
                                case 4:
                                case 5:
                                case 6:
                                case 7:
                                case 8:
                                case 20:
                                case 27:
                                case 28:
                                case 33:
                                case 34:
                                case 40:
                                case 41:
                                    this.$ = n[a];
                                    break;
                                case 9:
                                    this.$ = {
                                        type: "CommentStatement",
                                        value: s.stripComment(n[a]),
                                        strip: s.stripFlags(n[a], n[a]),
                                        loc: s.locInfo(this._$)
                                    };
                                    break;
                                case 10:
                                    this.$ = {
                                        type: "ContentStatement",
                                        original: n[a],
                                        value: n[a],
                                        loc: s.locInfo(this._$)
                                    };
                                    break;
                                case 11:
                                    this.$ = s.prepareRawBlock(n[a - 2], n[a - 1], n[a], this._$);
                                    break;
                                case 12:
                                    this.$ = {
                                        path: n[a - 3],
                                        params: n[a - 2],
                                        hash: n[a - 1]
                                    };
                                    break;
                                case 13:
                                    this.$ = s.prepareBlock(n[a - 3], n[a - 2], n[a - 1], n[a], !1, this._$);
                                    break;
                                case 14:
                                    this.$ = s.prepareBlock(n[a - 3], n[a - 2], n[a - 1], n[a], !0, this._$);
                                    break;
                                case 15:
                                    this.$ = {
                                        open: n[a - 5],
                                        path: n[a - 4],
                                        params: n[a - 3],
                                        hash: n[a - 2],
                                        blockParams: n[a - 1],
                                        strip: s.stripFlags(n[a - 5], n[a])
                                    };
                                    break;
                                case 16:
                                case 17:
                                    this.$ = {
                                        path: n[a - 4],
                                        params: n[a - 3],
                                        hash: n[a - 2],
                                        blockParams: n[a - 1],
                                        strip: s.stripFlags(n[a - 5], n[a])
                                    };
                                    break;
                                case 18:
                                    this.$ = {
                                        strip: s.stripFlags(n[a - 1], n[a - 1]),
                                        program: n[a]
                                    };
                                    break;
                                case 19:
                                    var o = s.prepareBlock(n[a - 2], n[a - 1], n[a], n[a], !1, this._$),
                                        l = s.prepareProgram([o], n[a - 1].loc);
                                    l.chained = !0, this.$ = {
                                        strip: n[a - 2].strip,
                                        program: l,
                                        chain: !0
                                    };
                                    break;
                                case 21:
                                    this.$ = {
                                        path: n[a - 1],
                                        strip: s.stripFlags(n[a - 2], n[a])
                                    };
                                    break;
                                case 22:
                                case 23:
                                    this.$ = s.prepareMustache(n[a - 3], n[a - 2], n[a - 1], n[a - 4], s.stripFlags(n[a - 4], n[a]), this._$);
                                    break;
                                case 24:
                                    this.$ = {
                                        type: "PartialStatement",
                                        name: n[a - 3],
                                        params: n[a - 2],
                                        hash: n[a - 1],
                                        indent: "",
                                        strip: s.stripFlags(n[a - 4], n[a]),
                                        loc: s.locInfo(this._$)
                                    };
                                    break;
                                case 25:
                                    this.$ = s.preparePartialBlock(n[a - 2], n[a - 1], n[a], this._$);
                                    break;
                                case 26:
                                    this.$ = {
                                        path: n[a - 3],
                                        params: n[a - 2],
                                        hash: n[a - 1],
                                        strip: s.stripFlags(n[a - 4], n[a])
                                    };
                                    break;
                                case 29:
                                    this.$ = {
                                        type: "SubExpression",
                                        path: n[a - 3],
                                        params: n[a - 2],
                                        hash: n[a - 1],
                                        loc: s.locInfo(this._$)
                                    };
                                    break;
                                case 30:
                                    this.$ = {
                                        type: "Hash",
                                        pairs: n[a],
                                        loc: s.locInfo(this._$)
                                    };
                                    break;
                                case 31:
                                    this.$ = {
                                        type: "HashPair",
                                        key: s.id(n[a - 2]),
                                        value: n[a],
                                        loc: s.locInfo(this._$)
                                    };
                                    break;
                                case 32:
                                    this.$ = s.id(n[a - 1]);
                                    break;
                                case 35:
                                    this.$ = {
                                        type: "StringLiteral",
                                        value: n[a],
                                        original: n[a],
                                        loc: s.locInfo(this._$)
                                    };
                                    break;
                                case 36:
                                    this.$ = {
                                        type: "NumberLiteral",
                                        value: Number(n[a]),
                                        original: Number(n[a]),
                                        loc: s.locInfo(this._$)
                                    };
                                    break;
                                case 37:
                                    this.$ = {
                                        type: "BooleanLiteral",
                                        value: "true" === n[a],
                                        original: "true" === n[a],
                                        loc: s.locInfo(this._$)
                                    };
                                    break;
                                case 38:
                                    this.$ = {
                                        type: "UndefinedLiteral",
                                        original: void 0,
                                        value: void 0,
                                        loc: s.locInfo(this._$)
                                    };
                                    break;
                                case 39:
                                    this.$ = {
                                        type: "NullLiteral",
                                        original: null,
                                        value: null,
                                        loc: s.locInfo(this._$)
                                    };
                                    break;
                                case 42:
                                    this.$ = s.preparePath(!0, n[a], this._$);
                                    break;
                                case 43:
                                    this.$ = s.preparePath(!1, n[a], this._$);
                                    break;
                                case 44:
                                    n[a - 2].push({
                                        part: s.id(n[a]),
                                        original: n[a],
                                        separator: n[a - 1]
                                    }), this.$ = n[a - 2];
                                    break;
                                case 45:
                                    this.$ = [{
                                        part: s.id(n[a]),
                                        original: n[a]
                                    }];
                                    break;
                                case 46:
                                case 48:
                                case 50:
                                case 58:
                                case 64:
                                case 70:
                                case 78:
                                case 82:
                                case 86:
                                case 90:
                                case 94:
                                    this.$ = [];
                                    break;
                                case 47:
                                case 49:
                                case 51:
                                case 59:
                                case 65:
                                case 71:
                                case 79:
                                case 83:
                                case 87:
                                case 91:
                                case 95:
                                case 99:
                                case 101:
                                    n[a - 1].push(n[a]);
                                    break;
                                case 98:
                                case 100:
                                    this.$ = [n[a]]
                            }
                        },
                        table: [{
                            3: 1,
                            4: 2,
                            5: [2, 46],
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {
                            1: [3]
                        }, {
                            5: [1, 4]
                        }, {
                            5: [2, 2],
                            7: 5,
                            8: 6,
                            9: 7,
                            10: 8,
                            11: 9,
                            12: 10,
                            13: 11,
                            14: [1, 12],
                            15: [1, 20],
                            16: 17,
                            19: [1, 23],
                            24: 15,
                            27: 16,
                            29: [1, 21],
                            34: [1, 22],
                            39: [2, 2],
                            44: [2, 2],
                            47: [2, 2],
                            48: [1, 13],
                            51: [1, 14],
                            55: [1, 18],
                            59: 19,
                            60: [1, 24]
                        }, {
                            1: [2, 1]
                        }, {
                            5: [2, 47],
                            14: [2, 47],
                            15: [2, 47],
                            19: [2, 47],
                            29: [2, 47],
                            34: [2, 47],
                            39: [2, 47],
                            44: [2, 47],
                            47: [2, 47],
                            48: [2, 47],
                            51: [2, 47],
                            55: [2, 47],
                            60: [2, 47]
                        }, {
                            5: [2, 3],
                            14: [2, 3],
                            15: [2, 3],
                            19: [2, 3],
                            29: [2, 3],
                            34: [2, 3],
                            39: [2, 3],
                            44: [2, 3],
                            47: [2, 3],
                            48: [2, 3],
                            51: [2, 3],
                            55: [2, 3],
                            60: [2, 3]
                        }, {
                            5: [2, 4],
                            14: [2, 4],
                            15: [2, 4],
                            19: [2, 4],
                            29: [2, 4],
                            34: [2, 4],
                            39: [2, 4],
                            44: [2, 4],
                            47: [2, 4],
                            48: [2, 4],
                            51: [2, 4],
                            55: [2, 4],
                            60: [2, 4]
                        }, {
                            5: [2, 5],
                            14: [2, 5],
                            15: [2, 5],
                            19: [2, 5],
                            29: [2, 5],
                            34: [2, 5],
                            39: [2, 5],
                            44: [2, 5],
                            47: [2, 5],
                            48: [2, 5],
                            51: [2, 5],
                            55: [2, 5],
                            60: [2, 5]
                        }, {
                            5: [2, 6],
                            14: [2, 6],
                            15: [2, 6],
                            19: [2, 6],
                            29: [2, 6],
                            34: [2, 6],
                            39: [2, 6],
                            44: [2, 6],
                            47: [2, 6],
                            48: [2, 6],
                            51: [2, 6],
                            55: [2, 6],
                            60: [2, 6]
                        }, {
                            5: [2, 7],
                            14: [2, 7],
                            15: [2, 7],
                            19: [2, 7],
                            29: [2, 7],
                            34: [2, 7],
                            39: [2, 7],
                            44: [2, 7],
                            47: [2, 7],
                            48: [2, 7],
                            51: [2, 7],
                            55: [2, 7],
                            60: [2, 7]
                        }, {
                            5: [2, 8],
                            14: [2, 8],
                            15: [2, 8],
                            19: [2, 8],
                            29: [2, 8],
                            34: [2, 8],
                            39: [2, 8],
                            44: [2, 8],
                            47: [2, 8],
                            48: [2, 8],
                            51: [2, 8],
                            55: [2, 8],
                            60: [2, 8]
                        }, {
                            5: [2, 9],
                            14: [2, 9],
                            15: [2, 9],
                            19: [2, 9],
                            29: [2, 9],
                            34: [2, 9],
                            39: [2, 9],
                            44: [2, 9],
                            47: [2, 9],
                            48: [2, 9],
                            51: [2, 9],
                            55: [2, 9],
                            60: [2, 9]
                        }, {
                            20: 25,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 36,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            4: 37,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            39: [2, 46],
                            44: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {
                            4: 38,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            44: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {
                            15: [2, 48],
                            17: 39,
                            18: [2, 48]
                        }, {
                            20: 41,
                            56: 40,
                            64: 42,
                            65: [1, 43],
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            4: 44,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {
                            5: [2, 10],
                            14: [2, 10],
                            15: [2, 10],
                            18: [2, 10],
                            19: [2, 10],
                            29: [2, 10],
                            34: [2, 10],
                            39: [2, 10],
                            44: [2, 10],
                            47: [2, 10],
                            48: [2, 10],
                            51: [2, 10],
                            55: [2, 10],
                            60: [2, 10]
                        }, {
                            20: 45,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 46,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 47,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 41,
                            56: 48,
                            64: 42,
                            65: [1, 43],
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            33: [2, 78],
                            49: 49,
                            65: [2, 78],
                            72: [2, 78],
                            80: [2, 78],
                            81: [2, 78],
                            82: [2, 78],
                            83: [2, 78],
                            84: [2, 78],
                            85: [2, 78]
                        }, {
                            23: [2, 33],
                            33: [2, 33],
                            54: [2, 33],
                            65: [2, 33],
                            68: [2, 33],
                            72: [2, 33],
                            75: [2, 33],
                            80: [2, 33],
                            81: [2, 33],
                            82: [2, 33],
                            83: [2, 33],
                            84: [2, 33],
                            85: [2, 33]
                        }, {
                            23: [2, 34],
                            33: [2, 34],
                            54: [2, 34],
                            65: [2, 34],
                            68: [2, 34],
                            72: [2, 34],
                            75: [2, 34],
                            80: [2, 34],
                            81: [2, 34],
                            82: [2, 34],
                            83: [2, 34],
                            84: [2, 34],
                            85: [2, 34]
                        }, {
                            23: [2, 35],
                            33: [2, 35],
                            54: [2, 35],
                            65: [2, 35],
                            68: [2, 35],
                            72: [2, 35],
                            75: [2, 35],
                            80: [2, 35],
                            81: [2, 35],
                            82: [2, 35],
                            83: [2, 35],
                            84: [2, 35],
                            85: [2, 35]
                        }, {
                            23: [2, 36],
                            33: [2, 36],
                            54: [2, 36],
                            65: [2, 36],
                            68: [2, 36],
                            72: [2, 36],
                            75: [2, 36],
                            80: [2, 36],
                            81: [2, 36],
                            82: [2, 36],
                            83: [2, 36],
                            84: [2, 36],
                            85: [2, 36]
                        }, {
                            23: [2, 37],
                            33: [2, 37],
                            54: [2, 37],
                            65: [2, 37],
                            68: [2, 37],
                            72: [2, 37],
                            75: [2, 37],
                            80: [2, 37],
                            81: [2, 37],
                            82: [2, 37],
                            83: [2, 37],
                            84: [2, 37],
                            85: [2, 37]
                        }, {
                            23: [2, 38],
                            33: [2, 38],
                            54: [2, 38],
                            65: [2, 38],
                            68: [2, 38],
                            72: [2, 38],
                            75: [2, 38],
                            80: [2, 38],
                            81: [2, 38],
                            82: [2, 38],
                            83: [2, 38],
                            84: [2, 38],
                            85: [2, 38]
                        }, {
                            23: [2, 39],
                            33: [2, 39],
                            54: [2, 39],
                            65: [2, 39],
                            68: [2, 39],
                            72: [2, 39],
                            75: [2, 39],
                            80: [2, 39],
                            81: [2, 39],
                            82: [2, 39],
                            83: [2, 39],
                            84: [2, 39],
                            85: [2, 39]
                        }, {
                            23: [2, 43],
                            33: [2, 43],
                            54: [2, 43],
                            65: [2, 43],
                            68: [2, 43],
                            72: [2, 43],
                            75: [2, 43],
                            80: [2, 43],
                            81: [2, 43],
                            82: [2, 43],
                            83: [2, 43],
                            84: [2, 43],
                            85: [2, 43],
                            87: [1, 50]
                        }, {
                            72: [1, 35],
                            86: 51
                        }, {
                            23: [2, 45],
                            33: [2, 45],
                            54: [2, 45],
                            65: [2, 45],
                            68: [2, 45],
                            72: [2, 45],
                            75: [2, 45],
                            80: [2, 45],
                            81: [2, 45],
                            82: [2, 45],
                            83: [2, 45],
                            84: [2, 45],
                            85: [2, 45],
                            87: [2, 45]
                        }, {
                            52: 52,
                            54: [2, 82],
                            65: [2, 82],
                            72: [2, 82],
                            80: [2, 82],
                            81: [2, 82],
                            82: [2, 82],
                            83: [2, 82],
                            84: [2, 82],
                            85: [2, 82]
                        }, {
                            25: 53,
                            38: 55,
                            39: [1, 57],
                            43: 56,
                            44: [1, 58],
                            45: 54,
                            47: [2, 54]
                        }, {
                            28: 59,
                            43: 60,
                            44: [1, 58],
                            47: [2, 56]
                        }, {
                            13: 62,
                            15: [1, 20],
                            18: [1, 61]
                        }, {
                            33: [2, 86],
                            57: 63,
                            65: [2, 86],
                            72: [2, 86],
                            80: [2, 86],
                            81: [2, 86],
                            82: [2, 86],
                            83: [2, 86],
                            84: [2, 86],
                            85: [2, 86]
                        }, {
                            33: [2, 40],
                            65: [2, 40],
                            72: [2, 40],
                            80: [2, 40],
                            81: [2, 40],
                            82: [2, 40],
                            83: [2, 40],
                            84: [2, 40],
                            85: [2, 40]
                        }, {
                            33: [2, 41],
                            65: [2, 41],
                            72: [2, 41],
                            80: [2, 41],
                            81: [2, 41],
                            82: [2, 41],
                            83: [2, 41],
                            84: [2, 41],
                            85: [2, 41]
                        }, {
                            20: 64,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            26: 65,
                            47: [1, 66]
                        }, {
                            30: 67,
                            33: [2, 58],
                            65: [2, 58],
                            72: [2, 58],
                            75: [2, 58],
                            80: [2, 58],
                            81: [2, 58],
                            82: [2, 58],
                            83: [2, 58],
                            84: [2, 58],
                            85: [2, 58]
                        }, {
                            33: [2, 64],
                            35: 68,
                            65: [2, 64],
                            72: [2, 64],
                            75: [2, 64],
                            80: [2, 64],
                            81: [2, 64],
                            82: [2, 64],
                            83: [2, 64],
                            84: [2, 64],
                            85: [2, 64]
                        }, {
                            21: 69,
                            23: [2, 50],
                            65: [2, 50],
                            72: [2, 50],
                            80: [2, 50],
                            81: [2, 50],
                            82: [2, 50],
                            83: [2, 50],
                            84: [2, 50],
                            85: [2, 50]
                        }, {
                            33: [2, 90],
                            61: 70,
                            65: [2, 90],
                            72: [2, 90],
                            80: [2, 90],
                            81: [2, 90],
                            82: [2, 90],
                            83: [2, 90],
                            84: [2, 90],
                            85: [2, 90]
                        }, {
                            20: 74,
                            33: [2, 80],
                            50: 71,
                            63: 72,
                            64: 75,
                            65: [1, 43],
                            69: 73,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            72: [1, 79]
                        }, {
                            23: [2, 42],
                            33: [2, 42],
                            54: [2, 42],
                            65: [2, 42],
                            68: [2, 42],
                            72: [2, 42],
                            75: [2, 42],
                            80: [2, 42],
                            81: [2, 42],
                            82: [2, 42],
                            83: [2, 42],
                            84: [2, 42],
                            85: [2, 42],
                            87: [1, 50]
                        }, {
                            20: 74,
                            53: 80,
                            54: [2, 84],
                            63: 81,
                            64: 75,
                            65: [1, 43],
                            69: 82,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            26: 83,
                            47: [1, 66]
                        }, {
                            47: [2, 55]
                        }, {
                            4: 84,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            39: [2, 46],
                            44: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {
                            47: [2, 20]
                        }, {
                            20: 85,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            4: 86,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46]
                        }, {
                            26: 87,
                            47: [1, 66]
                        }, {
                            47: [2, 57]
                        }, {
                            5: [2, 11],
                            14: [2, 11],
                            15: [2, 11],
                            19: [2, 11],
                            29: [2, 11],
                            34: [2, 11],
                            39: [2, 11],
                            44: [2, 11],
                            47: [2, 11],
                            48: [2, 11],
                            51: [2, 11],
                            55: [2, 11],
                            60: [2, 11]
                        }, {
                            15: [2, 49],
                            18: [2, 49]
                        }, {
                            20: 74,
                            33: [2, 88],
                            58: 88,
                            63: 89,
                            64: 75,
                            65: [1, 43],
                            69: 90,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            65: [2, 94],
                            66: 91,
                            68: [2, 94],
                            72: [2, 94],
                            80: [2, 94],
                            81: [2, 94],
                            82: [2, 94],
                            83: [2, 94],
                            84: [2, 94],
                            85: [2, 94]
                        }, {
                            5: [2, 25],
                            14: [2, 25],
                            15: [2, 25],
                            19: [2, 25],
                            29: [2, 25],
                            34: [2, 25],
                            39: [2, 25],
                            44: [2, 25],
                            47: [2, 25],
                            48: [2, 25],
                            51: [2, 25],
                            55: [2, 25],
                            60: [2, 25]
                        }, {
                            20: 92,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 74,
                            31: 93,
                            33: [2, 60],
                            63: 94,
                            64: 75,
                            65: [1, 43],
                            69: 95,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            75: [2, 60],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 74,
                            33: [2, 66],
                            36: 96,
                            63: 97,
                            64: 75,
                            65: [1, 43],
                            69: 98,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            75: [2, 66],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 74,
                            22: 99,
                            23: [2, 52],
                            63: 100,
                            64: 75,
                            65: [1, 43],
                            69: 101,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            20: 74,
                            33: [2, 92],
                            62: 102,
                            63: 103,
                            64: 75,
                            65: [1, 43],
                            69: 104,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            33: [1, 105]
                        }, {
                            33: [2, 79],
                            65: [2, 79],
                            72: [2, 79],
                            80: [2, 79],
                            81: [2, 79],
                            82: [2, 79],
                            83: [2, 79],
                            84: [2, 79],
                            85: [2, 79]
                        }, {
                            33: [2, 81]
                        }, {
                            23: [2, 27],
                            33: [2, 27],
                            54: [2, 27],
                            65: [2, 27],
                            68: [2, 27],
                            72: [2, 27],
                            75: [2, 27],
                            80: [2, 27],
                            81: [2, 27],
                            82: [2, 27],
                            83: [2, 27],
                            84: [2, 27],
                            85: [2, 27]
                        }, {
                            23: [2, 28],
                            33: [2, 28],
                            54: [2, 28],
                            65: [2, 28],
                            68: [2, 28],
                            72: [2, 28],
                            75: [2, 28],
                            80: [2, 28],
                            81: [2, 28],
                            82: [2, 28],
                            83: [2, 28],
                            84: [2, 28],
                            85: [2, 28]
                        }, {
                            23: [2, 30],
                            33: [2, 30],
                            54: [2, 30],
                            68: [2, 30],
                            71: 106,
                            72: [1, 107],
                            75: [2, 30]
                        }, {
                            23: [2, 98],
                            33: [2, 98],
                            54: [2, 98],
                            68: [2, 98],
                            72: [2, 98],
                            75: [2, 98]
                        }, {
                            23: [2, 45],
                            33: [2, 45],
                            54: [2, 45],
                            65: [2, 45],
                            68: [2, 45],
                            72: [2, 45],
                            73: [1, 108],
                            75: [2, 45],
                            80: [2, 45],
                            81: [2, 45],
                            82: [2, 45],
                            83: [2, 45],
                            84: [2, 45],
                            85: [2, 45],
                            87: [2, 45]
                        }, {
                            23: [2, 44],
                            33: [2, 44],
                            54: [2, 44],
                            65: [2, 44],
                            68: [2, 44],
                            72: [2, 44],
                            75: [2, 44],
                            80: [2, 44],
                            81: [2, 44],
                            82: [2, 44],
                            83: [2, 44],
                            84: [2, 44],
                            85: [2, 44],
                            87: [2, 44]
                        }, {
                            54: [1, 109]
                        }, {
                            54: [2, 83],
                            65: [2, 83],
                            72: [2, 83],
                            80: [2, 83],
                            81: [2, 83],
                            82: [2, 83],
                            83: [2, 83],
                            84: [2, 83],
                            85: [2, 83]
                        }, {
                            54: [2, 85]
                        }, {
                            5: [2, 13],
                            14: [2, 13],
                            15: [2, 13],
                            19: [2, 13],
                            29: [2, 13],
                            34: [2, 13],
                            39: [2, 13],
                            44: [2, 13],
                            47: [2, 13],
                            48: [2, 13],
                            51: [2, 13],
                            55: [2, 13],
                            60: [2, 13]
                        }, {
                            38: 55,
                            39: [1, 57],
                            43: 56,
                            44: [1, 58],
                            45: 111,
                            46: 110,
                            47: [2, 76]
                        }, {
                            33: [2, 70],
                            40: 112,
                            65: [2, 70],
                            72: [2, 70],
                            75: [2, 70],
                            80: [2, 70],
                            81: [2, 70],
                            82: [2, 70],
                            83: [2, 70],
                            84: [2, 70],
                            85: [2, 70]
                        }, {
                            47: [2, 18]
                        }, {
                            5: [2, 14],
                            14: [2, 14],
                            15: [2, 14],
                            19: [2, 14],
                            29: [2, 14],
                            34: [2, 14],
                            39: [2, 14],
                            44: [2, 14],
                            47: [2, 14],
                            48: [2, 14],
                            51: [2, 14],
                            55: [2, 14],
                            60: [2, 14]
                        }, {
                            33: [1, 113]
                        }, {
                            33: [2, 87],
                            65: [2, 87],
                            72: [2, 87],
                            80: [2, 87],
                            81: [2, 87],
                            82: [2, 87],
                            83: [2, 87],
                            84: [2, 87],
                            85: [2, 87]
                        }, {
                            33: [2, 89]
                        }, {
                            20: 74,
                            63: 115,
                            64: 75,
                            65: [1, 43],
                            67: 114,
                            68: [2, 96],
                            69: 116,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            33: [1, 117]
                        }, {
                            32: 118,
                            33: [2, 62],
                            74: 119,
                            75: [1, 120]
                        }, {
                            33: [2, 59],
                            65: [2, 59],
                            72: [2, 59],
                            75: [2, 59],
                            80: [2, 59],
                            81: [2, 59],
                            82: [2, 59],
                            83: [2, 59],
                            84: [2, 59],
                            85: [2, 59]
                        }, {
                            33: [2, 61],
                            75: [2, 61]
                        }, {
                            33: [2, 68],
                            37: 121,
                            74: 122,
                            75: [1, 120]
                        }, {
                            33: [2, 65],
                            65: [2, 65],
                            72: [2, 65],
                            75: [2, 65],
                            80: [2, 65],
                            81: [2, 65],
                            82: [2, 65],
                            83: [2, 65],
                            84: [2, 65],
                            85: [2, 65]
                        }, {
                            33: [2, 67],
                            75: [2, 67]
                        }, {
                            23: [1, 123]
                        }, {
                            23: [2, 51],
                            65: [2, 51],
                            72: [2, 51],
                            80: [2, 51],
                            81: [2, 51],
                            82: [2, 51],
                            83: [2, 51],
                            84: [2, 51],
                            85: [2, 51]
                        }, {
                            23: [2, 53]
                        }, {
                            33: [1, 124]
                        }, {
                            33: [2, 91],
                            65: [2, 91],
                            72: [2, 91],
                            80: [2, 91],
                            81: [2, 91],
                            82: [2, 91],
                            83: [2, 91],
                            84: [2, 91],
                            85: [2, 91]
                        }, {
                            33: [2, 93]
                        }, {
                            5: [2, 22],
                            14: [2, 22],
                            15: [2, 22],
                            19: [2, 22],
                            29: [2, 22],
                            34: [2, 22],
                            39: [2, 22],
                            44: [2, 22],
                            47: [2, 22],
                            48: [2, 22],
                            51: [2, 22],
                            55: [2, 22],
                            60: [2, 22]
                        }, {
                            23: [2, 99],
                            33: [2, 99],
                            54: [2, 99],
                            68: [2, 99],
                            72: [2, 99],
                            75: [2, 99]
                        }, {
                            73: [1, 108]
                        }, {
                            20: 74,
                            63: 125,
                            64: 75,
                            65: [1, 43],
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            5: [2, 23],
                            14: [2, 23],
                            15: [2, 23],
                            19: [2, 23],
                            29: [2, 23],
                            34: [2, 23],
                            39: [2, 23],
                            44: [2, 23],
                            47: [2, 23],
                            48: [2, 23],
                            51: [2, 23],
                            55: [2, 23],
                            60: [2, 23]
                        }, {
                            47: [2, 19]
                        }, {
                            47: [2, 77]
                        }, {
                            20: 74,
                            33: [2, 72],
                            41: 126,
                            63: 127,
                            64: 75,
                            65: [1, 43],
                            69: 128,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            75: [2, 72],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33
                        }, {
                            5: [2, 24],
                            14: [2, 24],
                            15: [2, 24],
                            19: [2, 24],
                            29: [2, 24],
                            34: [2, 24],
                            39: [2, 24],
                            44: [2, 24],
                            47: [2, 24],
                            48: [2, 24],
                            51: [2, 24],
                            55: [2, 24],
                            60: [2, 24]
                        }, {
                            68: [1, 129]
                        }, {
                            65: [2, 95],
                            68: [2, 95],
                            72: [2, 95],
                            80: [2, 95],
                            81: [2, 95],
                            82: [2, 95],
                            83: [2, 95],
                            84: [2, 95],
                            85: [2, 95]
                        }, {
                            68: [2, 97]
                        }, {
                            5: [2, 21],
                            14: [2, 21],
                            15: [2, 21],
                            19: [2, 21],
                            29: [2, 21],
                            34: [2, 21],
                            39: [2, 21],
                            44: [2, 21],
                            47: [2, 21],
                            48: [2, 21],
                            51: [2, 21],
                            55: [2, 21],
                            60: [2, 21]
                        }, {
                            33: [1, 130]
                        }, {
                            33: [2, 63]
                        }, {
                            72: [1, 132],
                            76: 131
                        }, {
                            33: [1, 133]
                        }, {
                            33: [2, 69]
                        }, {
                            15: [2, 12],
                            18: [2, 12]
                        }, {
                            14: [2, 26],
                            15: [2, 26],
                            19: [2, 26],
                            29: [2, 26],
                            34: [2, 26],
                            47: [2, 26],
                            48: [2, 26],
                            51: [2, 26],
                            55: [2, 26],
                            60: [2, 26]
                        }, {
                            23: [2, 31],
                            33: [2, 31],
                            54: [2, 31],
                            68: [2, 31],
                            72: [2, 31],
                            75: [2, 31]
                        }, {
                            33: [2, 74],
                            42: 134,
                            74: 135,
                            75: [1, 120]
                        }, {
                            33: [2, 71],
                            65: [2, 71],
                            72: [2, 71],
                            75: [2, 71],
                            80: [2, 71],
                            81: [2, 71],
                            82: [2, 71],
                            83: [2, 71],
                            84: [2, 71],
                            85: [2, 71]
                        }, {
                            33: [2, 73],
                            75: [2, 73]
                        }, {
                            23: [2, 29],
                            33: [2, 29],
                            54: [2, 29],
                            65: [2, 29],
                            68: [2, 29],
                            72: [2, 29],
                            75: [2, 29],
                            80: [2, 29],
                            81: [2, 29],
                            82: [2, 29],
                            83: [2, 29],
                            84: [2, 29],
                            85: [2, 29]
                        }, {
                            14: [2, 15],
                            15: [2, 15],
                            19: [2, 15],
                            29: [2, 15],
                            34: [2, 15],
                            39: [2, 15],
                            44: [2, 15],
                            47: [2, 15],
                            48: [2, 15],
                            51: [2, 15],
                            55: [2, 15],
                            60: [2, 15]
                        }, {
                            72: [1, 137],
                            77: [1, 136]
                        }, {
                            72: [2, 100],
                            77: [2, 100]
                        }, {
                            14: [2, 16],
                            15: [2, 16],
                            19: [2, 16],
                            29: [2, 16],
                            34: [2, 16],
                            44: [2, 16],
                            47: [2, 16],
                            48: [2, 16],
                            51: [2, 16],
                            55: [2, 16],
                            60: [2, 16]
                        }, {
                            33: [1, 138]
                        }, {
                            33: [2, 75]
                        }, {
                            33: [2, 32]
                        }, {
                            72: [2, 101],
                            77: [2, 101]
                        }, {
                            14: [2, 17],
                            15: [2, 17],
                            19: [2, 17],
                            29: [2, 17],
                            34: [2, 17],
                            39: [2, 17],
                            44: [2, 17],
                            47: [2, 17],
                            48: [2, 17],
                            51: [2, 17],
                            55: [2, 17],
                            60: [2, 17]
                        }],
                        defaultActions: {
                            4: [2, 1],
                            54: [2, 55],
                            56: [2, 20],
                            60: [2, 57],
                            73: [2, 81],
                            82: [2, 85],
                            86: [2, 18],
                            90: [2, 89],
                            101: [2, 53],
                            104: [2, 93],
                            110: [2, 19],
                            111: [2, 77],
                            116: [2, 97],
                            119: [2, 63],
                            122: [2, 69],
                            135: [2, 75],
                            136: [2, 32]
                        },
                        parseError: function(e) {
                            throw new Error(e)
                        },
                        parse: function(e) {
                            function t() {
                                var e;
                                return "number" != typeof(e = i.lexer.lex() || 1) && (e = i.symbols_[e] || e), e
                            }
                            var i = this,
                                s = [0],
                                r = [null],
                                n = [],
                                a = this.table,
                                o = "",
                                l = 0,
                                c = 0,
                                u = 0;
                            this.lexer.setInput(e), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this,
                                void 0 === this.lexer.yylloc && (this.lexer.yylloc = {});
                            var h = this.lexer.yylloc;
                            n.push(h);
                            var d = this.lexer.options && this.lexer.options.ranges;
                            "function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
                            for (var p, f, m, g, v, y, b, _, w, k = {};;) {
                                if (m = s[s.length - 1], this.defaultActions[m] ? g = this.defaultActions[m] : (null == p && (p = t()), g = a[m] && a[m][p]), void 0 === g || !g.length || !g[0]) {
                                    var $ = "";
                                    if (!u) {
                                        for (y in w = [], a[m]) this.terminals_[y] && y > 2 && w.push("'" + this.terminals_[y] + "'");
                                        $ = this.lexer.showPosition ? "Parse error on line " + (l + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + w.join(", ") + ", got '" + (this.terminals_[p] || p) + "'" : "Parse error on line " + (l + 1) + ": Unexpected " + (1 == p ? "end of input" : "'" + (this.terminals_[p] || p) + "'"), this.parseError($, {
                                            text: this.lexer.match,
                                            token: this.terminals_[p] || p,
                                            line: this.lexer.yylineno,
                                            loc: h,
                                            expected: w
                                        })
                                    }
                                }
                                if (g[0] instanceof Array && g.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + m + ", token: " + p);
                                switch (g[0]) {
                                    case 1:
                                        s.push(p), r.push(this.lexer.yytext), n.push(this.lexer.yylloc), s.push(g[1]), p = null, f ? (p = f, f = null) : (c = this.lexer.yyleng, o = this.lexer.yytext, l = this.lexer.yylineno, h = this.lexer.yylloc, u > 0 && u--);
                                        break;
                                    case 2:
                                        if (b = this.productions_[g[1]][1], k.$ = r[r.length - b], k._$ = {
                                                first_line: n[n.length - (b || 1)].first_line,
                                                last_line: n[n.length - 1].last_line,
                                                first_column: n[n.length - (b || 1)].first_column,
                                                last_column: n[n.length - 1].last_column
                                            }, d && (k._$.range = [n[n.length - (b || 1)].range[0], n[n.length - 1].range[1]]), void 0 !== (v = this.performAction.call(k, o, c, l, this.yy, g[1], r, n))) return v;
                                        b && (s = s.slice(0, -1 * b * 2), r = r.slice(0, -1 * b), n = n.slice(0, -1 * b)), s.push(this.productions_[g[1]][0]), r.push(k.$), n.push(k._$), _ = a[s[s.length - 2]][s[s.length - 1]], s.push(_);
                                        break;
                                    case 3:
                                        return !0
                                }
                            }
                            return !0
                        }
                    },
                    i = function() {
                        var e = {
                            EOF: 1,
                            parseError: function(e, t) {
                                if (!this.yy.parser) throw new Error(e);
                                this.yy.parser.parseError(e, t)
                            },
                            setInput: function(e) {
                                return this._input = e, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                                    first_line: 1,
                                    first_column: 0,
                                    last_line: 1,
                                    last_column: 0
                                }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
                            },
                            input: function() {
                                var e = this._input[0];
                                return this.yytext += e, this.yyleng++, this.offset++, this.match += e, this.matched += e, e.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), e
                            },
                            unput: function(e) {
                                var t = e.length,
                                    i = e.split(/(?:\r\n?|\n)/g);
                                this._input = e + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - t - 1), this.offset -= t;
                                var s = this.match.split(/(?:\r\n?|\n)/g);
                                this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), i.length - 1 && (this.yylineno -= i.length - 1);
                                var r = this.yylloc.range;
                                return this.yylloc = {
                                    first_line: this.yylloc.first_line,
                                    last_line: this.yylineno + 1,
                                    first_column: this.yylloc.first_column,
                                    last_column: i ? (i.length === s.length ? this.yylloc.first_column : 0) + s[s.length - i.length].length - i[0].length : this.yylloc.first_column - t
                                }, this.options.ranges && (this.yylloc.range = [r[0], r[0] + this.yyleng - t]), this
                            },
                            more: function() {
                                return this._more = !0, this
                            },
                            less: function(e) {
                                this.unput(this.match.slice(e))
                            },
                            pastInput: function() {
                                var e = this.matched.substr(0, this.matched.length - this.match.length);
                                return (e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "")
                            },
                            upcomingInput: function() {
                                var e = this.match;
                                return e.length < 20 && (e += this._input.substr(0, 20 - e.length)), (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "")
                            },
                            showPosition: function() {
                                var e = this.pastInput(),
                                    t = new Array(e.length + 1).join("-");
                                return e + this.upcomingInput() + "\n" + t + "^"
                            },
                            next: function() {
                                if (this.done) return this.EOF;
                                var e, t, i, s, r;
                                this._input || (this.done = !0), this._more || (this.yytext = "", this.match = "");
                                for (var n = this._currentRules(), a = 0; a < n.length && (!(i = this._input.match(this.rules[n[a]])) || t && !(i[0].length > t[0].length) || (t = i, s = a, this.options.flex)); a++);
                                return t ? ((r = t[0].match(/(?:\r\n?|\n).*/g)) && (this.yylineno += r.length), this.yylloc = {
                                    first_line: this.yylloc.last_line,
                                    last_line: this.yylineno + 1,
                                    first_column: this.yylloc.last_column,
                                    last_column: r ? r[r.length - 1].length - r[r.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + t[0].length
                                }, this.yytext += t[0], this.match += t[0], this.matches = t, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(t[0].length), this.matched += t[0], e = this.performAction.call(this, this.yy, this, n[s], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), e || void 0) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                                    text: "",
                                    token: null,
                                    line: this.yylineno
                                })
                            },
                            lex: function() {
                                var e = this.next();
                                return void 0 !== e ? e : this.lex()
                            },
                            begin: function(e) {
                                this.conditionStack.push(e)
                            },
                            popState: function() {
                                return this.conditionStack.pop()
                            },
                            _currentRules: function() {
                                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
                            },
                            topState: function() {
                                return this.conditionStack[this.conditionStack.length - 2]
                            },
                            pushState: function(e) {
                                this.begin(e)
                            },
                            options: {},
                            performAction: function(e, t, i) {
                                function s(e, i) {
                                    return t.yytext = t.yytext.substring(e, t.yyleng - i + e)
                                }
                                switch (i) {
                                    case 0:
                                        if ("\\\\" === t.yytext.slice(-2) ? (s(0, 1), this.begin("mu")) : "\\" === t.yytext.slice(-1) ? (s(0, 1), this.begin("emu")) : this.begin("mu"), t.yytext) return 15;
                                        break;
                                    case 1:
                                    case 5:
                                        return 15;
                                    case 2:
                                        return this.popState(), 15;
                                    case 3:
                                        return this.begin("raw"), 15;
                                    case 4:
                                        return this.popState(), "raw" === this.conditionStack[this.conditionStack.length - 1] ? 15 : (s(5, 9), "END_RAW_BLOCK");
                                    case 6:
                                    case 22:
                                        return this.popState(), 14;
                                    case 7:
                                        return 65;
                                    case 8:
                                        return 68;
                                    case 9:
                                        return 19;
                                    case 10:
                                        return this.popState(), this.begin("raw"), 23;
                                    case 11:
                                        return 55;
                                    case 12:
                                        return 60;
                                    case 13:
                                        return 29;
                                    case 14:
                                        return 47;
                                    case 15:
                                    case 16:
                                        return this.popState(), 44;
                                    case 17:
                                        return 34;
                                    case 18:
                                        return 39;
                                    case 19:
                                        return 51;
                                    case 20:
                                    case 23:
                                        return 48;
                                    case 21:
                                        this.unput(t.yytext), this.popState(), this.begin("com");
                                        break;
                                    case 24:
                                        return 73;
                                    case 25:
                                    case 26:
                                    case 41:
                                        return 72;
                                    case 27:
                                        return 87;
                                    case 28:
                                        break;
                                    case 29:
                                        return this.popState(), 54;
                                    case 30:
                                        return this.popState(), 33;
                                    case 31:
                                        return t.yytext = s(1, 2).replace(/\\"/g, '"'), 80;
                                    case 32:
                                        return t.yytext = s(1, 2).replace(/\\'/g, "'"), 80;
                                    case 33:
                                        return 85;
                                    case 34:
                                    case 35:
                                        return 82;
                                    case 36:
                                        return 83;
                                    case 37:
                                        return 84;
                                    case 38:
                                        return 81;
                                    case 39:
                                        return 75;
                                    case 40:
                                        return 77;
                                    case 42:
                                        return t.yytext = t.yytext.replace(/\\([\\\]])/g, "$1"), 72;
                                    case 43:
                                        return "INVALID";
                                    case 44:
                                        return 5
                                }
                            },
                            rules: [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/],
                            conditions: {
                                mu: {
                                    rules: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
                                    inclusive: !1
                                },
                                emu: {
                                    rules: [2],
                                    inclusive: !1
                                },
                                com: {
                                    rules: [6],
                                    inclusive: !1
                                },
                                raw: {
                                    rules: [3, 4, 5],
                                    inclusive: !1
                                },
                                INITIAL: {
                                    rules: [0, 1, 44],
                                    inclusive: !0
                                }
                            }
                        };
                        return e
                    }();
                return t.lexer = i, e.prototype = t, t.Parser = e, new e
            }();
            t.default = i, e.exports = t.default
        }, function(e, t, i) {
            "use strict";

            function s() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                this.options = e
            }

            function r(e, t, i) {
                void 0 === t && (t = e.length);
                var s = e[t - 1],
                    r = e[t - 2];
                return s ? "ContentStatement" === s.type ? (r || !i ? /(?:^|\S)[^\S\n]*\n\s*$/ : /^\s*$|(?:^|\S)[^\S\n]*\n\s*$/).test(s.original) : void 0 : i
            }

            function n(e, t, i) {
                void 0 === t && (t = -1);
                var s = e[t + 1],
                    r = e[t + 2];
                return s ? "ContentStatement" === s.type ? (r || !i ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(s.original) : void 0 : i
            }

            function a(e, t, i) {
                var s = e[null == t ? 0 : t + 1];
                if (s && "ContentStatement" === s.type && (i || !s.rightStripped)) {
                    var r = s.value;
                    s.value = s.value.replace(i ? /^\s+/ : /^[ \t]*\r?\n?/, ""), s.rightStripped = s.value !== r
                }
            }

            function o(e, t, i) {
                var s = e[null == t ? e.length - 1 : t - 1];
                if (s && "ContentStatement" === s.type && (i || !s.leftStripped)) {
                    var r = s.value;
                    return s.value = s.value.replace(i ? /(^|\S)\s+$/ : /(^|[^ \t])[ \t]+$/, "$1"), s.leftStripped = s.value !== r, s.leftStripped
                }
            }
            var l = i(1).default;
            t.__esModule = !0;
            var c = l(i(87));
            s.prototype = new c.default, s.prototype.Program = function(e) {
                var t = !this.options.ignoreStandalone,
                    i = !this.isRootSeen;
                this.isRootSeen = !0;
                for (var s = e.body, l = 0, c = s.length; l < c; l++) {
                    var u = s[l],
                        h = this.accept(u);
                    if (h) {
                        var d = r(s, l, i),
                            p = n(s, l, i),
                            f = h.openStandalone && d,
                            m = h.closeStandalone && p,
                            g = h.inlineStandalone && d && p;
                        h.close && a(s, l, !0), h.open && o(s, l, !0), t && g && (a(s, l), o(s, l) && "PartialStatement" === u.type && (u.indent = /(?:^|[^ \t])([ \t]+)$/.exec(s[l - 1].original)[1])), t && f && (a((u.program || u.inverse).body), o(s, l)), t && m && (a(s, l), o((u.inverse || u.program).body))
                    }
                }
                return e
            }, s.prototype.BlockStatement = s.prototype.DecoratorBlock = s.prototype.PartialBlockStatement = function(e) {
                this.accept(e.program), this.accept(e.inverse);
                var t = e.program || e.inverse,
                    i = e.program && e.inverse,
                    s = i,
                    l = i;
                if (i && i.chained)
                    for (s = i.body[0].program; l.chained;) l = l.body[l.body.length - 1].program;
                var c = {
                    open: e.openStrip.open,
                    close: e.closeStrip.close,
                    openStandalone: n(t.body),
                    closeStandalone: r((s || t).body)
                };
                if (e.openStrip.close && a(t.body, null, !0), i) {
                    var u = e.inverseStrip;
                    u.open && o(t.body, null, !0), u.close && a(s.body, null, !0), e.closeStrip.open && o(l.body, null, !0), !this.options.ignoreStandalone && r(t.body) && n(s.body) && (o(t.body), a(s.body))
                } else e.closeStrip.open && o(t.body, null, !0);
                return c
            }, s.prototype.Decorator = s.prototype.MustacheStatement = function(e) {
                return e.strip
            }, s.prototype.PartialStatement = s.prototype.CommentStatement = function(e) {
                var t = e.strip || {};
                return {
                    inlineStandalone: !0,
                    open: t.open,
                    close: t.close
                }
            }, t.default = s, e.exports = t.default
        }, function(e, t, i) {
            "use strict";

            function s() {
                this.parents = []
            }

            function r(e, t) {
                return -1 !== u.indexOf(h.NODE_TYPES, t) || !(t in s.prototype) && "function" == typeof e[t]
            }

            function n(e) {
                this.acceptRequired(e, "path"), this.acceptArray(e.params), this.acceptKey(e, "hash")
            }

            function a(e) {
                n.call(this, e), this.acceptKey(e, "program"), this.acceptKey(e, "inverse")
            }

            function o(e) {
                this.acceptRequired(e, "name"), this.acceptArray(e.params), this.acceptKey(e, "hash")
            }
            var l = i(1).default;
            t.__esModule = !0;
            var c = l(i(6)),
                u = i(5),
                h = i(88);
            s.prototype = {
                constructor: s,
                mutating: !1,
                acceptKey: function(e, t) {
                    var i = this.accept(e[t]);
                    if (this.mutating) {
                        if (i && !r(this, i.type)) throw new c.default('Unexpected node type "' + i.type + '" found when accepting ' + t + " on " + e.type);
                        e[t] = i
                    }
                },
                acceptRequired: function(e, t) {
                    if (this.acceptKey(e, t), !e[t]) throw new c.default(e.type + " requires " + t)
                },
                acceptArray: function(e) {
                    for (var t = 0, i = e.length; t < i; t++) this.acceptKey(e, t), e[t] || (e.splice(t, 1), t--, i--)
                },
                accept: function(e) {
                    if (e) {
                        if (!r(this, e.type) || !this[e.type]) throw new c.default("Unknown type: " + e.type, e);
                        this.current && this.parents.unshift(this.current), this.current = e;
                        var t = this[e.type](e);
                        return this.current = this.parents.shift(), !this.mutating || t ? t : !1 !== t ? e : void 0
                    }
                },
                Program: function(e) {
                    this.acceptArray(e.body)
                },
                MustacheStatement: n,
                Decorator: n,
                BlockStatement: a,
                DecoratorBlock: a,
                PartialStatement: o,
                PartialBlockStatement: function(e) {
                    o.call(this, e), this.acceptKey(e, "program")
                },
                ContentStatement: function() {},
                CommentStatement: function() {},
                SubExpression: n,
                PathExpression: function() {},
                StringLiteral: function() {},
                NumberLiteral: function() {},
                BooleanLiteral: function() {},
                UndefinedLiteral: function() {},
                NullLiteral: function() {},
                Hash: function(e) {
                    this.acceptArray(e.pairs)
                },
                HashPair: function(e) {
                    this.acceptRequired(e, "value")
                }
            }, t.default = s, e.exports = t.default
        }, function(e, t) {
            "use strict";
            t.__esModule = !0;
            var i = ["Program", "BlockStatement", "DecoratorBlock", "PartialStatement", "PartialBlockStatement", "Decorator", "MustacheStatement", "ContentStatement", "CommentStatement", "SubExpression", "PathExpression", "StringLiteral", "NumberLiteral", "BooleanLiteral", "UndefinedLiteral", "NullLiteral", "Hash", "HashPair"];
            t.NODE_TYPES = i
        }, function(e, t, i) {
            "use strict";

            function s(e, t) {
                if (t = t.path ? t.path.original : t, e.path.original !== t) {
                    var i = {
                        loc: e.path.loc
                    };
                    throw new m.default(e.path.original + " doesn't match " + t, i)
                }
            }

            function r(e, t) {
                this.source = e, this.start = {
                    line: t.first_line,
                    column: t.first_column
                }, this.end = {
                    line: t.last_line,
                    column: t.last_column
                }
            }

            function n(e) {
                return /^\[.*\]$/.test(e) ? e.substring(1, e.length - 1) : e
            }

            function a(e, t) {
                return {
                    open: "~" === e.charAt(2),
                    close: "~" === t.charAt(t.length - 3)
                }
            }

            function o(e) {
                return e.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "")
            }

            function l(e, t, i) {
                i = this.locInfo(i);
                for (var s = e ? "@" : "", r = [], n = 0, a = 0, o = t.length; a < o; a++) {
                    var l = t[a].part,
                        c = t[a].original !== l;
                    if (s += (t[a].separator || "") + l, c || ".." !== l && "." !== l && "this" !== l) r.push(l);
                    else {
                        if (r.length > 0) throw new m.default("Invalid path: " + s, {
                            loc: i
                        });
                        ".." === l && n++
                    }
                }
                return {
                    type: "PathExpression",
                    data: e,
                    depth: n,
                    parts: r,
                    original: s,
                    loc: i
                }
            }

            function c(e, t, i, s, r, n) {
                var a = s.charAt(3) || s.charAt(2),
                    o = "{" !== a && "&" !== a;
                return {
                    type: /\*/.test(s) ? "Decorator" : "MustacheStatement",
                    path: e,
                    params: t,
                    hash: i,
                    escaped: o,
                    strip: r,
                    loc: this.locInfo(n)
                }
            }

            function u(e, t, i, r) {
                s(e, i);
                var n = {
                    type: "Program",
                    body: t,
                    strip: {},
                    loc: r = this.locInfo(r)
                };
                return {
                    type: "BlockStatement",
                    path: e.path,
                    params: e.params,
                    hash: e.hash,
                    program: n,
                    openStrip: {},
                    inverseStrip: {},
                    closeStrip: {},
                    loc: r
                }
            }

            function h(e, t, i, r, n, a) {
                r && r.path && s(e, r);
                var o = /\*/.test(e.open);
                t.blockParams = e.blockParams;
                var l = void 0,
                    c = void 0;
                if (i) {
                    if (o) throw new m.default("Unexpected inverse block on decorator", i);
                    i.chain && (i.program.body[0].closeStrip = r.strip), c = i.strip, l = i.program
                }
                return n && (n = l, l = t, t = n), {
                    type: o ? "DecoratorBlock" : "BlockStatement",
                    path: e.path,
                    params: e.params,
                    hash: e.hash,
                    program: t,
                    inverse: l,
                    openStrip: e.strip,
                    inverseStrip: c,
                    closeStrip: r && r.strip,
                    loc: this.locInfo(a)
                }
            }

            function d(e, t) {
                if (!t && e.length) {
                    var i = e[0].loc,
                        s = e[e.length - 1].loc;
                    i && s && (t = {
                        source: i.source,
                        start: {
                            line: i.start.line,
                            column: i.start.column
                        },
                        end: {
                            line: s.end.line,
                            column: s.end.column
                        }
                    })
                }
                return {
                    type: "Program",
                    body: e,
                    strip: {},
                    loc: t
                }
            }

            function p(e, t, i, r) {
                return s(e, i), {
                    type: "PartialBlockStatement",
                    name: e.path,
                    params: e.params,
                    hash: e.hash,
                    program: t,
                    openStrip: e.strip,
                    closeStrip: i && i.strip,
                    loc: this.locInfo(r)
                }
            }
            var f = i(1).default;
            t.__esModule = !0, t.SourceLocation = r, t.id = n, t.stripFlags = a, t.stripComment = o, t.preparePath = l, t.prepareMustache = c, t.prepareRawBlock = u, t.prepareBlock = h, t.prepareProgram = d, t.preparePartialBlock = p;
            var m = f(i(6))
        }, function(e, t, i) {
            "use strict";

            function s() {}

            function r(e, t, i) {
                if (null == e || "string" != typeof e && "Program" !== e.type) throw new g.default("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + e);
                "data" in (t = t || {}) || (t.data = !0), t.compat && (t.useDepths = !0);
                var s = i.parse(e, t),
                    r = (new i.Compiler).compile(s, t);
                return (new i.JavaScriptCompiler).compile(r, t)
            }

            function n(e, t, i) {
                function s() {
                    var s = i.parse(e, t),
                        r = (new i.Compiler).compile(s, t),
                        n = (new i.JavaScriptCompiler).compile(r, t, void 0, !0);
                    return i.template(n)
                }

                function r(e, t) {
                    return n || (n = s()), n.call(this, e, t)
                }
                if (void 0 === t && (t = {}), null == e || "string" != typeof e && "Program" !== e.type) throw new g.default("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + e);
                "data" in (t = v.extend({}, t)) || (t.data = !0), t.compat && (t.useDepths = !0);
                var n = void 0;
                return r._setup = function(e) {
                    return n || (n = s()), n._setup(e)
                }, r._child = function(e, t, i, r) {
                    return n || (n = s()), n._child(e, t, i, r)
                }, r
            }

            function a(e, t) {
                return new g.default("Invalid AST: " + e.type + " " + t, e)
            }

            function o(e) {
                var t = e.depth;
                if (null == t) return 0;
                if ("number" != typeof t || !isFinite(t) || Math.floor(t) !== t || t < 0) throw a(e, "depth must be a non-negative integer");
                return t
            }

            function l(e) {
                var t = e.value;
                if ("StringLiteral" === e.type && "string" != typeof t) throw a(e, "value must be a string");
                if ("NumberLiteral" === e.type && "number" != typeof t) throw a(e, "value must be a number");
                if ("BooleanLiteral" === e.type && "boolean" != typeof t) throw a(e, "value must be a boolean")
            }

            function c(e, t, i) {
                if (!v.isArray(t)) throw a(e, i + " must be an array");
                for (var s = 0; s < t.length; s++)
                    if ("string" != typeof t[s]) throw a(e, i + " must only contain strings");
                return t
            }

            function u(e) {
                return c(e, e.parts, "parts")
            }

            function h(e) {
                null != e.blockParams && c(e, e.blockParams, "blockParams")
            }

            function d(e, t) {
                if (e === t) return !0;
                if (v.isArray(e) && v.isArray(t) && e.length === t.length) {
                    for (var i = 0; i < e.length; i++)
                        if (!d(e[i], t[i])) return !1;
                    return !0
                }
            }

            function p(e) {
                if (!e.path.parts) {
                    var t = e.path;
                    e.path = {
                        type: "PathExpression",
                        data: !1,
                        depth: 0,
                        parts: [t.original + ""],
                        original: t.original + "",
                        loc: t.loc
                    }
                }
            }
            var f = i(74).default,
                m = i(1).default;
            t.__esModule = !0, t.Compiler = s, t.precompile = r, t.compile = n;
            var g = m(i(6)),
                v = i(5),
                y = m(i(83)),
                b = i(88),
                _ = [].slice;
            s.prototype = {
                compiler: s,
                equals: function(e) {
                    var t = this.opcodes.length;
                    if (e.opcodes.length !== t) return !1;
                    for (var i = 0; i < t; i++) {
                        var s = this.opcodes[i],
                            r = e.opcodes[i];
                        if (s.opcode !== r.opcode || !d(s.args, r.args)) return !1
                    }
                    t = this.children.length;
                    for (i = 0; i < t; i++)
                        if (!this.children[i].equals(e.children[i])) return !1;
                    return !0
                },
                guid: 0,
                compile: function(e, t) {
                    return this.sourceNode = [], this.opcodes = [], this.children = [], this.options = t, this.stringParams = t.stringParams, this.trackIds = t.trackIds, t.blockParams = t.blockParams || [], t.knownHelpers = v.extend(f(null), {
                        helperMissing: !0,
                        blockHelperMissing: !0,
                        each: !0,
                        if: !0,
                        unless: !0,
                        with: !0,
                        log: !0,
                        lookup: !0
                    }, t.knownHelpers), this.accept(e)
                },
                compileProgram: function(e) {
                    var t = (new this.compiler).compile(e, this.options),
                        i = this.guid++;
                    return this.usePartial = this.usePartial || t.usePartial, this.children[i] = t, this.useDepths = this.useDepths || t.useDepths, i
                },
                accept: function(e) {
                    if (-1 === v.indexOf(b.NODE_TYPES, e.type) || !this[e.type]) throw new g.default("Unknown type: " + e.type, e);
                    this.sourceNode.unshift(e);
                    var t = this[e.type](e);
                    return this.sourceNode.shift(), t
                },
                Program: function(e) {
                    h(e), this.options.blockParams.unshift(e.blockParams);
                    for (var t = e.body, i = t.length, s = 0; s < i; s++) this.accept(t[s]);
                    return this.options.blockParams.shift(), this.isSimple = 1 === i, this.blockParams = e.blockParams ? e.blockParams.length : 0, this
                },
                BlockStatement: function(e) {
                    p(e);
                    var t = e.program,
                        i = e.inverse;
                    t = t && this.compileProgram(t), i = i && this.compileProgram(i);
                    var s = this.classifySexpr(e);
                    "helper" === s ? this.helperSexpr(e, t, i) : "simple" === s ? (this.simpleSexpr(e), this.opcode("pushProgram", t), this.opcode("pushProgram", i), this.opcode("emptyHash"), this.opcode("blockValue", e.path.original)) : (this.ambiguousSexpr(e, t, i), this.opcode("pushProgram", t), this.opcode("pushProgram", i), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), this.opcode("append")
                },
                DecoratorBlock: function(e) {
                    var t = e.program && this.compileProgram(e.program),
                        i = this.setupFullMustacheParams(e, t, void 0),
                        s = e.path;
                    this.useDecorators = !0, this.opcode("registerDecorator", i.length, s.original)
                },
                PartialStatement: function(e) {
                    this.usePartial = !0;
                    var t = e.program;
                    t && (t = this.compileProgram(e.program));
                    var i = e.params;
                    if (i.length > 1) throw new g.default("Unsupported number of partial arguments: " + i.length, e);
                    i.length || (this.options.explicitPartialContext ? this.opcode("pushLiteral", "undefined") : i.push({
                        type: "PathExpression",
                        parts: [],
                        depth: 0
                    }));
                    var s = e.name.original,
                        r = "SubExpression" === e.name.type;
                    r && this.accept(e.name), this.setupFullMustacheParams(e, t, void 0, !0);
                    var n = e.indent || "";
                    this.options.preventIndent && n && (this.opcode("appendContent", n), n = ""), this.opcode("invokePartial", r, s, n), this.opcode("append")
                },
                PartialBlockStatement: function(e) {
                    this.PartialStatement(e)
                },
                MustacheStatement: function(e) {
                    this.SubExpression(e), e.escaped && !this.options.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
                },
                Decorator: function(e) {
                    this.DecoratorBlock(e)
                },
                ContentStatement: function(e) {
                    if (null != e.value && "string" != typeof e.value) throw a(e, "value must be a string");
                    e.value && this.opcode("appendContent", e.value)
                },
                CommentStatement: function() {},
                SubExpression: function(e) {
                    p(e);
                    var t = this.classifySexpr(e);
                    "simple" === t ? this.simpleSexpr(e) : "helper" === t ? this.helperSexpr(e) : this.ambiguousSexpr(e)
                },
                ambiguousSexpr: function(e, t, i) {
                    var s = e.path,
                        r = s.parts[0],
                        n = null != t || null != i;
                    this.opcode("getContext", o(s)), this.opcode("pushProgram", t), this.opcode("pushProgram", i), s.strict = !0, this.accept(s), this.opcode("invokeAmbiguous", r, n)
                },
                simpleSexpr: function(e) {
                    var t = e.path;
                    t.strict = !0, this.accept(t), this.opcode("resolvePossibleLambda")
                },
                helperSexpr: function(e, t, i) {
                    var s = this.setupFullMustacheParams(e, t, i),
                        r = e.path,
                        n = r.parts[0];
                    if (this.options.knownHelpers[n]) this.opcode("invokeKnownHelper", s.length, n);
                    else {
                        if (this.options.knownHelpersOnly) throw new g.default("You specified knownHelpersOnly, but used the unknown helper " + n, e);
                        r.strict = !0, r.falsy = !0, this.accept(r), this.opcode("invokeHelper", s.length, r.original, y.default.helpers.simpleId(r))
                    }
                },
                PathExpression: function(e) {
                    var t = o(e),
                        i = u(e);
                    this.addDepth(t), this.opcode("getContext", t);
                    var s = i[0],
                        r = y.default.helpers.scopedId(e),
                        n = !t && !r && this.blockParamIndex(s);
                    n ? this.opcode("lookupBlockParam", n, i) : s ? e.data ? (this.options.data = !0, this.opcode("lookupData", t, i, e.strict)) : this.opcode("lookupOnContext", i, e.falsy, e.strict, r) : this.opcode("pushContext")
                },
                StringLiteral: function(e) {
                    l(e), this.opcode("pushString", e.value)
                },
                NumberLiteral: function(e) {
                    l(e), this.opcode("pushLiteral", e.value)
                },
                BooleanLiteral: function(e) {
                    l(e), this.opcode("pushLiteral", e.value)
                },
                UndefinedLiteral: function() {
                    this.opcode("pushLiteral", "undefined")
                },
                NullLiteral: function() {
                    this.opcode("pushLiteral", "null")
                },
                Hash: function(e) {
                    var t = e.pairs,
                        i = 0,
                        s = void 0;
                    if (!v.isArray(t)) throw a(e, "pairs must be an array");
                    s = t.length;
                    for (var r = 0; r < s; r++)
                        if (!t[r] || "string" != typeof t[r].key) throw a(e, "pair keys must be strings");
                    for (this.opcode("pushHash"); i < s; i++) this.pushParam(t[i].value);
                    for (; i--;) this.opcode("assignToHash", t[i].key);
                    this.opcode("popHash")
                },
                opcode: function(e) {
                    this.opcodes.push({
                        opcode: e,
                        args: _.call(arguments, 1),
                        loc: this.sourceNode[0].loc
                    })
                },
                addDepth: function(e) {
                    e && (this.useDepths = !0)
                },
                classifySexpr: function(e) {
                    u(e.path);
                    var t = y.default.helpers.simpleId(e.path),
                        i = t && !!this.blockParamIndex(e.path.parts[0]),
                        s = !i && y.default.helpers.helperExpression(e),
                        r = !i && (s || t);
                    if (r && !s) {
                        var n = e.path.parts[0],
                            a = this.options;
                        a.knownHelpers[n] ? s = !0 : a.knownHelpersOnly && (r = !1)
                    }
                    return s ? "helper" : r ? "ambiguous" : "simple"
                },
                pushParams: function(e) {
                    for (var t = 0, i = e.length; t < i; t++) this.pushParam(e[t])
                },
                pushParam: function(e) {
                    l(e);
                    var t = null != e.value ? e.value : e.original || "",
                        i = o(e);
                    if (this.stringParams) "number" != typeof t && "boolean" != typeof t && (t = String(t)), t.replace && (t = t.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".")), i && this.addDepth(i), this.opcode("getContext", i), this.opcode("pushStringParam", t, e.type), "SubExpression" === e.type && this.accept(e);
                    else {
                        if (this.trackIds) {
                            var s = void 0;
                            if (!e.parts || y.default.helpers.scopedId(e) || i || (s = this.blockParamIndex(u(e)[0])), s) {
                                var r = e.parts.slice(1).join(".");
                                this.opcode("pushId", "BlockParam", s, r)
                            } else(t = e.original || t).replace && (t = t.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "")), this.opcode("pushId", e.type, t)
                        }
                        this.accept(e)
                    }
                },
                setupFullMustacheParams: function(e, t, i, s) {
                    var r = e.params;
                    return this.pushParams(r), this.opcode("pushProgram", t), this.opcode("pushProgram", i), e.hash ? this.accept(e.hash) : this.opcode("emptyHash", s), r
                },
                blockParamIndex: function(e) {
                    for (var t = 0, i = this.options.blockParams.length; t < i; t++) {
                        var s = this.options.blockParams[t],
                            r = s && v.indexOf(s, e);
                        if (s && r >= 0) return [t, r]
                    }
                }
            }
        }, function(e, t, i) {
            "use strict";

            function s(e) {
                this.value = e
            }

            function r() {}

            function n(e) {
                var t = e.source.currentLocation;
                return t ? d.safeJsonLiteral(t) : "undefined"
            }

            function a(e, t, i, s, r) {
                var a = t.popStack(),
                    o = i.length;
                e && o--;
                for (var l = s; l < o; l++) a = t.nameLookup(a, i[l], r);
                return e ? [t.aliasable("container.strict"), "(", a, ", ", t.quotedString(i[o]), ", ", n(t), " )"] : a
            }
            var o = i(60).default,
                l = i(1).default;
            t.__esModule = !0;
            var c = i(4),
                u = l(i(6)),
                h = i(5),
                d = i(92),
                p = l(d);
            r.prototype = {
                    nameLookup: function(e, t) {
                        return this.internalNameLookup(e, t)
                    },
                    depthedLookup: function(e) {
                        return [this.aliasable("container.lookup"), "(depths, ", this.quotedString(e), ")"]
                    },
                    compilerInfo: function() {
                        var e = c.COMPILER_REVISION;
                        return [e, c.REVISION_CHANGES[e]]
                    },
                    appendToBuffer: function(e, t, i) {
                        return h.isArray(e) || (e = [e]), e = this.source.wrap(e, t), this.environment.isSimple ? ["return ", e, ";"] : i ? ["buffer += ", e, ";"] : (e.appendToBuffer = !0, e)
                    },
                    initializeBuffer: function() {
                        return this.quotedString("")
                    },
                    internalNameLookup: function(e, t) {
                        return this.lookupPropertyFunctionIsUsed = !0, ["lookupProperty(", e, ",", this.quotedString(t), ")"]
                    },
                    lookupPropertyFunctionIsUsed: !1,
                    compile: function(e, t, i, s) {
                        this.environment = e, this.options = t, this.stringParams = this.options.stringParams, this.trackIds = this.options.trackIds, this.precompile = !s, this.name = this.environment.name, this.isChild = !!i, this.context = i || {
                            decorators: [],
                            programs: [],
                            environments: []
                        }, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.aliases = {}, this.registers = {
                            list: []
                        }, this.hashes = [], this.compileStack = [], this.inlineStack = [], this.blockParams = [], this.compileChildren(e, t), this.useDepths = this.useDepths || e.useDepths || e.useDecorators || this.options.compat, this.useBlockParams = this.useBlockParams || e.useBlockParams;
                        var r = e.opcodes,
                            n = void 0,
                            a = void 0,
                            o = void 0,
                            l = void 0;
                        for (o = 0, l = r.length; o < l; o++) n = r[o], this.source.currentLocation = n.loc, a = a || n.loc, this[n.opcode].apply(this, n.args);
                        if (this.source.currentLocation = a, this.pushSource(""), this.stackSlot || this.inlineStack.length || this.compileStack.length) throw new u.default("Compile completed with content left on stack");
                        this.decorators.isEmpty() ? this.decorators = void 0 : (this.useDecorators = !0, this.decorators.prepend(["var decorators = container.decorators, ", this.lookupPropertyFunctionVarDeclaration(), ";\n"]), this.decorators.push("return fn;"), s ? this.decorators = Function.apply(this, ["fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge()]) : (this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n"), this.decorators.push("}\n"), this.decorators = this.decorators.merge()));
                        var c = this.createFunctionContext(s);
                        if (this.isChild) return c;
                        var h = {
                            compiler: this.compilerInfo(),
                            main: c
                        };
                        this.decorators && (h.main_d = this.decorators, h.useDecorators = !0);
                        var d = this.context,
                            p = d.programs,
                            f = d.decorators;
                        for (o = 0, l = p.length; o < l; o++) h[o] = p[o], f[o] && (h[o + "_d"] = f[o], h.useDecorators = !0);
                        return this.environment.usePartial && (h.usePartial = !0), this.options.data && (h.useData = !0), this.useDepths && (h.useDepths = !0), this.useBlockParams && (h.useBlockParams = !0), this.options.compat && (h.compat = !0), s ? h.compilerOptions = this.options : (h.compiler = JSON.stringify(h.compiler), this.source.currentLocation = {
                            start: {
                                line: 1,
                                column: 0
                            }
                        }, h = this.objectLiteral(h), t.srcName ? (h = h.toStringWithSourceMap({
                            file: t.destName
                        })).map = h.map && h.map.toString() : h = h.toString()), h
                    },
                    preamble: function() {
                        this.lastContext = 0, this.source = new p.default(this.options.srcName), this.decorators = new p.default(this.options.srcName)
                    },
                    createFunctionContext: function(e) {
                        var t = this,
                            i = "",
                            s = this.stackVars.concat(this.registers.list);
                        s.length > 0 && (i += ", " + s.join(", "));
                        var r = 0;
                        o(this.aliases).forEach(function(e) {
                            var s = t.aliases[e];
                            s.children && s.referenceCount > 1 && (i += ", alias" + ++r + "=" + e, s.children[0] = "alias" + r)
                        }), this.lookupPropertyFunctionIsUsed && (i += ", " + this.lookupPropertyFunctionVarDeclaration());
                        var n = ["container", "depth0", "helpers", "partials", "data"];
                        (this.useBlockParams || this.useDepths) && n.push("blockParams"), this.useDepths && n.push("depths");
                        var a = this.mergeSource(i);
                        return e ? (n.push(a), Function.apply(this, n)) : this.source.wrap(["function(", n.join(","), ") {\n  ", a, "}"])
                    },
                    mergeSource: function(e) {
                        var t = this.environment.isSimple,
                            i = !this.forceBuffer,
                            s = void 0,
                            r = void 0,
                            n = void 0,
                            a = void 0;
                        return this.source.each(function(e) {
                            e.appendToBuffer ? (n ? e.prepend("  + ") : n = e, a = e) : (n && (r ? n.prepend("buffer += ") : s = !0, a.add(";"), n = a = void 0), r = !0, t || (i = !1))
                        }), i ? n ? (n.prepend("return "), a.add(";")) : r || this.source.push('return "";') : (e += ", buffer = " + (s ? "" : this.initializeBuffer()), n ? (n.prepend("return buffer + "), a.add(";")) : this.source.push("return buffer;")), e && this.source.prepend("var " + e.substring(2) + (s ? "" : ";\n")), this.source.merge()
                    },
                    lookupPropertyFunctionVarDeclaration: function() {
                        return "\n      lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    }\n    ".trim()
                    },
                    blockValue: function(e) {
                        var t = this.aliasable("container.hooks.blockHelperMissing"),
                            i = [this.contextName(0)];
                        this.setupHelperArgs(e, 0, i);
                        var s = this.popStack();
                        i.splice(1, 0, s), this.push(this.source.functionCall(t, "call", i))
                    },
                    ambiguousBlockValue: function() {
                        var e = this.aliasable("container.hooks.blockHelperMissing"),
                            t = [this.contextName(0)];
                        this.setupHelperArgs("", 0, t, !0), this.flushInline();
                        var i = this.topStack();
                        t.splice(1, 0, i), this.pushSource(["if (!", this.lastHelper, ") { ", i, " = ", this.source.functionCall(e, "call", t), "}"])
                    },
                    appendContent: function(e) {
                        this.pendingContent ? e = this.pendingContent + e : this.pendingLocation = this.source.currentLocation, this.pendingContent = e
                    },
                    append: function() {
                        if (this.isInline()) this.replaceStack(function(e) {
                            return [" != null ? ", e, ' : ""']
                        }), this.pushSource(this.appendToBuffer(this.popStack()));
                        else {
                            var e = this.popStack();
                            this.pushSource(["if (", e, " != null) { ", this.appendToBuffer(e, void 0, !0), " }"]), this.environment.isSimple && this.pushSource(["else { ", this.appendToBuffer("''", void 0, !0), " }"])
                        }
                    },
                    appendEscaped: function() {
                        this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"), "(", this.popStack(), ")"]))
                    },
                    getContext: function(e) {
                        this.lastContext = e
                    },
                    pushContext: function() {
                        this.pushStackLiteral(this.contextName(this.lastContext))
                    },
                    lookupOnContext: function(e, t, i, s) {
                        var r = 0;
                        s || !this.options.compat || this.lastContext ? this.pushContext() : this.push(this.depthedLookup(e[r++])), this.resolvePath("context", e, r, t, i)
                    },
                    lookupBlockParam: function(e, t) {
                        this.useBlockParams = !0, this.push(["blockParams[", e[0], "][", e[1], "]"]), this.resolvePath("context", t, 1)
                    },
                    lookupData: function(e, t, i) {
                        e ? this.pushStackLiteral("container.data(data, " + e + ")") : this.pushStackLiteral("data"), this.resolvePath("data", t, 0, !0, i)
                    },
                    resolvePath: function(e, t, i, s, r) {
                        var n = this;
                        if (this.options.strict || this.options.assumeObjects) this.push(a(this.options.strict && r, this, t, i, e));
                        else
                            for (var o = t.length, l = function(i) {
                                    n.replaceStack(function(r) {
                                        var a = n.nameLookup(r, t[i], e);
                                        return s ? [" && ", a] : [" != null ? ", a, " : ", r]
                                    })
                                }, c = i; c < o; c++) l(c)
                    },
                    resolvePossibleLambda: function() {
                        this.push([this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"])
                    },
                    pushStringParam: function(e, t) {
                        this.pushContext(), this.pushString(t), "SubExpression" !== t && ("string" == typeof e ? this.pushString(e) : this.pushStackLiteral(e))
                    },
                    emptyHash: function(e) {
                        this.trackIds && this.push("{}"), this.stringParams && (this.push("{}"), this.push("{}")), this.pushStackLiteral(e ? "undefined" : "{}")
                    },
                    pushHash: function() {
                        this.hash && this.hashes.push(this.hash), this.hash = {
                            values: {},
                            types: [],
                            contexts: [],
                            ids: []
                        }
                    },
                    popHash: function() {
                        var e = this.hash;
                        this.hash = this.hashes.pop(), this.trackIds && this.push(this.objectLiteral(e.ids)), this.stringParams && (this.push(this.objectLiteral(e.contexts)), this.push(this.objectLiteral(e.types))), this.push(this.objectLiteral(e.values))
                    },
                    pushString: function(e) {
                        this.pushStackLiteral(this.quotedString(e))
                    },
                    pushLiteral: function(e) {
                        this.pushStackLiteral(e)
                    },
                    pushProgram: function(e) {
                        null != e ? this.pushStackLiteral(this.programExpression(e)) : this.pushStackLiteral(null)
                    },
                    registerDecorator: function(e, t) {
                        var i = this.nameLookup("decorators", t, "decorator"),
                            s = this.setupHelperArgs(t, e);
                        this.decorators.push(["var decorator = ", i, ";"]), this.decorators.push(['if (typeof decorator !== "function") { throw new Error(', this.quotedString('Missing decorator: "' + t + '"'), "); }"]), this.decorators.push(["fn = ", this.decorators.functionCall("decorator", "", ["fn", "props", "container", s]), " || fn;"])
                    },
                    invokeHelper: function(e, t, i) {
                        var s = this.popStack(),
                            r = this.setupHelper(e, t),
                            n = [];
                        i && n.push(r.name), n.push(s), this.options.strict || n.push(this.aliasable("container.hooks.helperMissing"));
                        var a = ["(", this.itemsSeparatedBy(n, "||"), ")"],
                            o = this.source.functionCall(a, "call", r.callParams);
                        this.push(o)
                    },
                    itemsSeparatedBy: function(e, t) {
                        var i = [];
                        i.push(e[0]);
                        for (var s = 1; s < e.length; s++) i.push(t, e[s]);
                        return i
                    },
                    invokeKnownHelper: function(e, t) {
                        var i = this.setupHelper(e, t);
                        this.push(this.source.functionCall(i.name, "call", i.callParams))
                    },
                    invokeAmbiguous: function(e, t) {
                        this.useRegister("helper");
                        var i = this.popStack();
                        this.emptyHash();
                        var s = this.setupHelper(0, e, t),
                            r = ["(", "(helper = ", this.lastHelper = this.nameLookup("helpers", e, "helper"), " || ", i, ")"];
                        this.options.strict || (r[0] = "(helper = ", r.push(" != null ? helper : ", this.aliasable("container.hooks.helperMissing"))), this.push(["(", r, s.paramsInit ? ["),(", s.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", s.callParams), " : helper))"])
                    },
                    invokePartial: function(e, t, i) {
                        var s = [],
                            r = this.setupParams(t, 1, s);
                        e && (t = this.popStack(), delete r.name), i && (r.indent = this.quotedString(i)), r.helpers = "helpers", r.partials = "partials", r.decorators = "container.decorators", e ? s.unshift(t) : s.unshift(this.nameLookup("partials", t, "partial")), this.options.compat && (r.depths = "depths"), r = this.objectLiteral(r), s.push(r), this.push(this.source.functionCall("container.invokePartial", "", s))
                    },
                    assignToHash: function(e) {
                        var t = this.popStack(),
                            i = void 0,
                            s = void 0,
                            r = void 0;
                        this.trackIds && (r = this.popStack()), this.stringParams && (s = this.popStack(), i = this.popStack());
                        var n = this.hash;
                        i && (n.contexts[e] = i), s && (n.types[e] = s), r && (n.ids[e] = r), n.values[e] = t
                    },
                    pushId: function(e, t, i) {
                        "BlockParam" === e ? this.pushStackLiteral("blockParams[" + t[0] + "].path[" + t[1] + "]" + (i ? " + " + this.quotedString("." + i) : "")) : "PathExpression" === e ? this.pushString(t) : "SubExpression" === e ? this.pushStackLiteral("true") : this.pushStackLiteral("null")
                    },
                    compiler: r,
                    compileChildren: function(e, t) {
                        for (var i = e.children, s = void 0, r = void 0, n = 0, a = i.length; n < a; n++) {
                            s = i[n], r = new this.compiler;
                            var o = this.matchExistingProgram(s);
                            if (null == o) {
                                var l = this.context.programs.push("") - 1;
                                s.index = l, s.name = "program" + l, this.context.programs[l] = r.compile(s, t, this.context, !this.precompile), this.context.decorators[l] = r.decorators, this.context.environments[l] = s, this.useDepths = this.useDepths || r.useDepths, this.useBlockParams = this.useBlockParams || r.useBlockParams, s.useDepths = this.useDepths, s.useBlockParams = this.useBlockParams
                            } else s.index = o.index, s.name = "program" + o.index, this.useDepths = this.useDepths || o.useDepths, this.useBlockParams = this.useBlockParams || o.useBlockParams
                        }
                    },
                    matchExistingProgram: function(e) {
                        for (var t = 0, i = this.context.environments.length; t < i; t++) {
                            var s = this.context.environments[t];
                            if (s && s.equals(e)) return s
                        }
                    },
                    programExpression: function(e) {
                        var t = this.environment.children[e],
                            i = [t.index, "data", t.blockParams];
                        return (this.useBlockParams || this.useDepths) && i.push("blockParams"), this.useDepths && i.push("depths"), "container.program(" + i.join(", ") + ")"
                    },
                    useRegister: function(e) {
                        this.registers[e] || (this.registers[e] = !0, this.registers.list.push(e))
                    },
                    push: function(e) {
                        return e instanceof s || (e = this.source.wrap(e)), this.inlineStack.push(e), e
                    },
                    pushStackLiteral: function(e) {
                        this.push(new s(e))
                    },
                    pushSource: function(e) {
                        this.pendingContent && (this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation)), this.pendingContent = void 0), e && this.source.push(e)
                    },
                    replaceStack: function(e) {
                        var t = ["("],
                            i = void 0,
                            r = void 0,
                            n = void 0;
                        if (!this.isInline()) throw new u.default("replaceStack on non-inline");
                        var a = this.popStack(!0);
                        if (a instanceof s) t = ["(", i = [a.value]], n = !0;
                        else {
                            r = !0;
                            var o = this.incrStack();
                            t = ["((", this.push(o), " = ", a, ")"], i = this.topStack()
                        }
                        var l = e.call(this, i);
                        n || this.popStack(), r && this.stackSlot--, this.push(t.concat(l, ")"))
                    },
                    incrStack: function() {
                        return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName()
                    },
                    topStackName: function() {
                        return "stack" + this.stackSlot
                    },
                    flushInline: function() {
                        var e = this.inlineStack;
                        this.inlineStack = [];
                        for (var t = 0, i = e.length; t < i; t++) {
                            var r = e[t];
                            if (r instanceof s) this.compileStack.push(r);
                            else {
                                var n = this.incrStack();
                                this.pushSource([n, " = ", r, ";"]), this.compileStack.push(n)
                            }
                        }
                    },
                    isInline: function() {
                        return this.inlineStack.length
                    },
                    popStack: function(e) {
                        var t = this.isInline(),
                            i = (t ? this.inlineStack : this.compileStack).pop();
                        if (!e && i instanceof s) return i.value;
                        if (!t) {
                            if (!this.stackSlot) throw new u.default("Invalid stack pop");
                            this.stackSlot--
                        }
                        return i
                    },
                    topStack: function() {
                        var e = this.isInline() ? this.inlineStack : this.compileStack,
                            t = e[e.length - 1];
                        return t instanceof s ? t.value : t
                    },
                    contextName: function(e) {
                        return this.useDepths && e ? "depths[" + e + "]" : "depth" + e
                    },
                    quotedString: function(e) {
                        return this.source.quotedString(e)
                    },
                    objectLiteral: function(e) {
                        return this.source.objectLiteral(e)
                    },
                    aliasable: function(e) {
                        var t = this.aliases[e];
                        return t ? (t.referenceCount++, t) : ((t = this.aliases[e] = this.source.wrap(e)).aliasable = !0, t.referenceCount = 1, t)
                    },
                    setupHelper: function(e, t, i) {
                        var s = [];
                        return {
                            params: s,
                            paramsInit: this.setupHelperArgs(t, e, s, i),
                            name: this.nameLookup("helpers", t, "helper"),
                            callParams: [this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : (container.nullContext || {})")].concat(s)
                        }
                    },
                    setupParams: function(e, t, i) {
                        var s = {},
                            r = [],
                            n = [],
                            a = [],
                            o = !i,
                            l = void 0;
                        o && (i = []), s.name = this.quotedString(e), s.hash = this.popStack(), this.trackIds && (s.hashIds = this.popStack()), this.stringParams && (s.hashTypes = this.popStack(), s.hashContexts = this.popStack());
                        var c = this.popStack(),
                            u = this.popStack();
                        (u || c) && (s.fn = u || "container.noop", s.inverse = c || "container.noop");
                        for (var h = t; h--;) l = this.popStack(), i[h] = l, this.trackIds && (a[h] = this.popStack()), this.stringParams && (n[h] = this.popStack(), r[h] = this.popStack());
                        return o && (s.args = this.source.generateArray(i)), this.trackIds && (s.ids = this.source.generateArray(a)), this.stringParams && (s.types = this.source.generateArray(n), s.contexts = this.source.generateArray(r)), this.options.data && (s.data = "data"), this.useBlockParams && (s.blockParams = "blockParams"), s
                    },
                    setupHelperArgs: function(e, t, i, s) {
                        var r = this.setupParams(e, t, i);
                        return r.loc = n(this), r = this.objectLiteral(r), s ? (this.useRegister("options"), i.push("options"), ["options=", r]) : i ? (i.push(r), "") : r
                    }
                },
                function() {
                    for (var e = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "), t = r.RESERVED_WORDS = {}, i = 0, s = e.length; i < s; i++) t[e[i]] = !0
                }(), r.isValidJavaScriptVariableName = function(e) {
                    return !r.RESERVED_WORDS[e] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(e)
                }, t.default = r, e.exports = t.default
        }, function(e, t, i) {
            "use strict";

            function s(e) {
                return e.replace(h, "\\u003C")
            }

            function r(e) {
                return "\\u" + e.charCodeAt(0).toString(16)
            }

            function n(e) {
                return s(JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/[\ud800-\udfff]/g, r))
            }

            function a(e, t, i) {
                if (c.isArray(e)) {
                    for (var s = [], r = 0, n = e.length; r < n; r++) s.push(t.wrap(e[r], i));
                    return s
                }
                return "boolean" == typeof e || "number" == typeof e ? e + "" : e
            }

            function o(e) {
                this.srcFile = e, this.source = []
            }
            var l = i(60).default;
            t.__esModule = !0, t.safeJsonLiteral = n;
            var c = i(5),
                u = /[\x00-\x1f\\"\u2028\u2029<\ud800-\udfff]/,
                h = /<(?=!--|\/?script)/gi,
                d = void 0;
            try {} catch (e) {}
            d || ((d = function(e, t, i, s) {
                this.src = "", s && this.add(s)
            }).prototype = {
                add: function(e) {
                    c.isArray(e) && (e = e.join("")), this.src += e
                },
                prepend: function(e) {
                    c.isArray(e) && (e = e.join("")), this.src = e + this.src
                },
                toStringWithSourceMap: function() {
                    return {
                        code: this.toString()
                    }
                },
                toString: function() {
                    return this.src
                }
            }), o.prototype = {
                isEmpty: function() {
                    return !this.source.length
                },
                prepend: function(e, t) {
                    this.source.unshift(this.wrap(e, t))
                },
                push: function(e, t) {
                    this.source.push(this.wrap(e, t))
                },
                merge: function() {
                    var e = this.empty();
                    return this.each(function(t) {
                        e.add(["  ", t, "\n"])
                    }), e
                },
                each: function(e) {
                    for (var t = 0, i = this.source.length; t < i; t++) e(this.source[t])
                },
                empty: function() {
                    var e = this.currentLocation || {
                        start: {}
                    };
                    return new d(e.start.line, e.start.column, this.srcFile)
                },
                wrap: function(e) {
                    var t = arguments.length <= 1 || void 0 === arguments[1] ? this.currentLocation || {
                        start: {}
                    } : arguments[1];
                    return e instanceof d ? e : (e = a(e, this, t), new d(t.start.line, t.start.column, this.srcFile, e))
                },
                functionCall: function(e, t, i) {
                    return i = this.generateList(i), this.wrap([e, t ? "." + t + "(" : "(", i, ")"])
                },
                quotedString: function(e) {
                    return e += "", u.test(e) ? n(e) : '"' + e + '"'
                },
                objectLiteral: function(e) {
                    var t = this,
                        i = [];
                    l(e).forEach(function(s) {
                        var r = a(e[s], t);
                        "undefined" !== r && i.push([t.quotedString(s), ":", r])
                    });
                    var s = this.generateList(i);
                    return s.prepend("{"), s.add("}"), s
                },
                generateList: function(e) {
                    for (var t = this.empty(), i = 0, s = e.length; i < s; i++) i && t.add(","), t.add(a(e[i], this));
                    return t
                },
                generateArray: function(e) {
                    var t = this.generateList(e);
                    return t.prepend("["), t.add("]"), t
                }
            }, t.default = o
        }])
    }), Market.DOMUtils.Bookmark = class {
        constructor(e) {
            this.$widget = e, this.$collectionsList = this.$widget.find(".js-collections-list"), this.$form = this.$widget.find(".js-collection-form"), this.$formInput = this.$widget.find(".js-collection-form-input"), this.$formError = this.$widget.find(".js-collection-form-error"), this.templates = {
                add: Handlebars.compile($("#template-bookmark-add").html()),
                remove: Handlebars.compile($("#template-bookmark-remove").html())
            }, this.$widget.on("ajax:beforeSend", ".js-bookmark-add", this.addBeforeSend.bind(this)), this.$widget.on("ajax:success", ".js-bookmark-add", this.addSuccess.bind(this)), this.$widget.on("ajax:error", ".js-bookmark-add", this.addError.bind(this)), this.$widget.on("ajax:beforeSend", ".js-bookmark-remove", this.removeBeforeSend.bind(this)), this.$widget.on("ajax:success", ".js-bookmark-remove", this.removeSuccess.bind(this)), this.$widget.on("ajax:error", ".js-bookmark-remove", this.removeError.bind(this)), this.$widget.on("ajax:beforeSend", ".js-collection-form", this.newBeforeSend.bind(this)), this.$widget.on("ajax:success", ".js-collection-form", this.newSuccess.bind(this)), this.$widget.on("ajax:error", ".js-collection-form", this.newError.bind(this))
        }
        addBeforeSend(e, t, i) {
            this.render("updating", e.target)
        }
        addSuccess(e, t, i, s) {
            this.render("remove", e.target, t)
        }
        addError(e, t, i, s) {
            this.render("error", e.target, t)
        }
        removeBeforeSend(e, t, i) {
            this.render("updating", e.target)
        }
        removeSuccess(e, t, i, s) {
            this.render("add", e.target, t)
        }
        removeError(e, t, i, s) {
            this.render("error", e.target, t)
        }
        newBeforeSend(e, t, i) {
            this.$formError.addClass("is-hidden").html(""), this.render("updating", e.target)
        }
        newSuccess(e, t, i, s) {
            !0 === t.success ? this.render("new", e.target, t) : this.$formError.removeClass("is-hidden").html(t.errors)
        }
        newError(e, t, i, s) {
            this.render("error", e.target, t)
        }
        triggerItemCollectedStatusChange(e) {
            const t = {
                item_id: e.item_id,
                is_collected: e.item_collected
            };
            $("[data-bind='item-collected-status:" + t.item_id + "']").trigger("itemCollectedStatus:change", t)
        }
        triggerNewCollectionAdded() {
            this.$collectionsList.hasClass("is-empty") ? this.$collectionsList.removeClass("is-empty").html(this.html) : this.$collectionsList.prepend(this.html), this.$form.trigger("collection:added")
        }
        render(e, t, i) {
            switch (e) {
                case "updating":
                    $(t).addClass("is-updating");
                    break;
                case "error":
                    $(t).removeClass("is-updating").addClass("is-error");
                    break;
                case "add":
                    $(t).replaceWith(this.templates.add(i)), this.triggerItemCollectedStatusChange(i);
                    break;
                case "remove":
                    $(t).replaceWith(this.templates.remove(i)), this.triggerItemCollectedStatusChange(i);
                    break;
                case "new":
                    i.new_collection = !0, this.html = "<li>" + this.templates.remove(i) + "</li>", this.triggerNewCollectionAdded(this.html), this.triggerItemCollectedStatusChange(i)
            }
        }
    }, Market.DOMUtils.CollectionWidget = class {
        constructor(e) {
            this.$el = e, this.templates = {
                active: Handlebars.compile($("#template-collection-active").html()),
                inactive: Handlebars.compile($("#template-collection-inactive").html())
            }, this.$el.on("modalAjaxContent:added", this.modalContentAdded.bind(this)), this.$el.on("itemCollectedStatus:change", this.updateWidget.bind(this))
        }
        modalContentAdded(e, t) {
            new Market.DOMUtils.Bookmark($(t))
        }
        updateWidget(e, t) {
            this.$widget = this.$el.find("a"), this.active = this.$el.hasClass(this.activeClass), this.collected = t.is_collected, this.collected && !this.active ? this.$widget.replaceWith(this.templates.active(t)) : this.collected || this.$widget.replaceWith(this.templates.inactive(t)), viewloader.execute(Views, this.$el)
        }
    }, Market.DOMUtils.FavoriteWidget = class {
        constructor(e) {
            this.$el = e, this.$widget = this.$el.find("a"), this.$removableItem = this.$el.closest(".js-favorite-widget__removable-item"), this.$noResultsMessage = $(".js-favorite-widget__no-results"), this.templates = {
                add: Handlebars.compile($("#template-favorite-add").html()),
                remove: Handlebars.compile($("#template-favorite-remove").html())
            }, this.$el.on("itemFavoritedStatus:change", this.updateWidget.bind(this)), this.$el.on("ajax:beforeSend", ".js-favorite-add", this.addBeforeSend.bind(this)), this.$el.on("ajax:success", ".js-favorite-add", this.addSuccess.bind(this)), this.$el.on("ajax:error", ".js-favorite-add", this.addError.bind(this)), this.$el.on("ajax:beforeSend", ".js-favorite-remove", this.removeBeforeSend.bind(this)), this.$el.on("ajax:success", ".js-favorite-remove", this.removeSuccess.bind(this)), this.$el.on("ajax:error", ".js-favorite-remove", this.removeError.bind(this))
        }
        addBeforeSend(e, t, i) {
            this.render("updating", e.target)
        }
        addSuccess(e, t, i, s) {
            this.render("remove", e.target, t)
        }
        addError(e, t, i, s) {
            this.render("error", e.target, t)
        }
        removeBeforeSend(e, t, i) {
            this.render("updating", e.target), this.$removableItem.addClass("is-hidden"), this.showEmptyMessageIfEmpty()
        }
        removeSuccess(e, t, i, s) {
            this.render("add", e.target, t), this.$removableItem.remove()
        }
        removeError(e, t, i, s) {
            this.render("error", e.target, t), this.$removableItem.removeClass("is-hidden")
        }
        showEmptyMessageIfEmpty() {
            0 === $(".js-favorite-widget__removable-item:not(.is-hidden)").length && this.$noResultsMessage.removeClass("is-hidden")
        }
        hideEmptyMessage() {
            this.$noResultsMessage.addClass("is-hidden")
        }
        render(e, t, i) {
            switch (e) {
                case "updating":
                    $(t).addClass("is-updating");
                    break;
                case "error":
                    $(t).removeClass("is-updating").addClass("is-error");
                    break;
                case "add":
                    $(t).replaceWith(this.templates.add(i));
                    break;
                case "remove":
                    $(t).replaceWith(this.templates.remove(i))
            }
        }
        updateWidget(e, t) {
            t.is_favorited ? this.$widget.replaceWith(this.templates.remove(t)) : this.$widget.replaceWith(this.templates.add(t))
        }
    }, Views.BookmarkStatesLoader = class {
        constructor(e) {
            if (this.$el = e, Market.DOMUtils.isUserSignedIn()) {
                const e = [];
                this.$el.find(".js-collection-widget").each(function(t, i) {
                    this.$item = $(i), this.$item.addClass("is-initialized"), new Market.DOMUtils.CollectionWidget(this.$item), e.push(this.$item.data("itemId"))
                }), this.$el.find(".js-favorite-widget").each(function(t, i) {
                    this.$item = $(i), this.$item.addClass("is-initialized"), new Market.DOMUtils.FavoriteWidget(this.$item), e.push(this.$item.data("itemId"))
                }), this.fetchData(_.uniq(e)), $(document).on("uiCartUpdateRequest", this.handleCartUpdate.bind(this))
            }
        }
        fetchData(e) {
            e.length && $.getJSON("/bookmarks/states", {
                "item_ids[]": e
            }).done(e => this.initBookmarkStates(e))
        }
        initBookmarkStates(e) {
            for (const t of e) $("[data-bind='item-collected-status:" + t.item_id + "']").trigger("itemCollectedStatus:change", t), $("[data-bind='item-favorited-status:" + t.item_id + "']").trigger("itemFavoritedStatus:change", t), $("[data-bind='item-cart-status:" + t.item_id + "']").toggleClass("is-active", t.is_in_cart);
            this.autoLaunchModal()
        }
        handleCartUpdate(e, t) {
            $("[data-bind='item-cart-status:" + t.item_id + "']").addClass("is-active")
        }
        autoLaunchModal() {
            this.uri = new URL(window.location), this.uriItemId = this.uri.searchParams.get("open_collect_for_item_id"), _.isUndefined(this.uriItemId) || (this.$uriItem = this.$el.find(".js-collection-widget[data-item-id='" + this.uriItemId + "'] a"), this.$uriItem.click())
        }
    }, Views.CarouselList = class {
        constructor(e) {
            this.$el = e, this.dom = this.getDomReferences(), this.carouselSettings = this.getInitialSettings(this.$el.data("settings")), this.carouselListWidth = this.getTotalWidth(this.dom.$salesBadges), this.setupCarousel()
        }
        addEventListeners() {
            this.$el.on({
                "mouseover.carousel": this.scrollCarousel.bind(this),
                "mouseout.carousel": this.stopCarousel.bind(this)
            }, ".js-carousel__nav--left, .js-carousel__nav--right");
            const e = _.throttle(this.updateScrollArrows.bind(this), 100);
            return this.dom.$carouselInner.on("scroll", e)
        }
        getDomReferences() {
            const e = this.$el.find(".js-carousel__inner"),
                t = e.find("ul"),
                i = t.children("li").not(".js-community-badges__category-text");
            return {
                $carouselInner: e,
                $carouselScrollDirectionLeft: this.$el.find(".js-carousel__nav--left"),
                $carouselScrollDirectionRight: this.$el.find(".js-carousel__nav--right"),
                $carouselList: t,
                $salesBadges: i,
                $badgeCategoryText: t.find(".js-community-badges__category-text"),
                $currentBadge: i.filter(".is-current")
            }
        }
        getElementCenterPosition(e, t, i) {
            return e + t / 2 - i / 2
        }
        getInitialSettings(e) {
            e = e || {};
            const t = {
                showArrows: !1,
                scrollToCurrent: !1,
                showNextBadgeProgress: !1
            };
            return $.extend({}, t, e)
        }
        getTotalWidth(e) {
            if (!e || !e.length) return !1;
            const t = Array.from(e).map(e => $(e).outerWidth(!0));
            return _.reduce(t, (e, t) => e + t)
        }
        setupCarousel() {
            this.dom.$carouselList.width(this.carouselListWidth), this.carouselSettings.showArrows && this.$el.addClass("has-arrows"), this.carouselSettings.scrollToCurrent && this.scrollCarouselTo(this.dom.$currentBadge), this.carouselSettings.showNextBadgeProgress && this.$el.find(".js-community-badges__progress-overlay").removeClass("is-staged");
            const e = this.carouselListWidth > this.dom.$carouselInner.width();
            this.dom.$badgeCategoryText.length && this.positionBadgeCategoryText(), this.updateScrollArrows(), e ? Market.Helpers.touchDetection.isHoverPrimaryDevice() && this.addEventListeners() : this.dom.$carouselScrollDirectionLeft.add(this.dom.$carouselScrollDirectionRight).addClass("is-invisible")
        }
        scrollCarousel(e) {
            $(e.currentTarget).hasClass("js-carousel__nav--left") ? this.dom.$carouselInner.animate({
                scrollLeft: `-=${this.carouselListWidth}`
            }, 2e3, "swing") : this.dom.$carouselInner.animate({
                scrollLeft: `+=${this.carouselListWidth}`
            }, 2e3, "swing")
        }
        scrollCarouselTo(e) {
            if (e.length) {
                const t = this.getElementCenterPosition(e.position().left, e.outerWidth(!0), this.dom.$carouselInner.width());
                this.dom.$carouselInner.scrollLeft(t)
            }
        }
        stopCarousel() {
            this.dom.$carouselInner.stop(), this.updateScrollArrows()
        }
        updateScrollArrows() {
            0 === this.dom.$carouselInner.scrollLeft() ? (this.dom.$carouselScrollDirectionLeft.addClass("is-invisible"), this.dom.$carouselScrollDirectionRight.removeClass("is-invisible")) : this.dom.$carouselInner.scrollLeft() + this.dom.$carouselInner.width() >= this.carouselListWidth ? (this.dom.$carouselScrollDirectionLeft.removeClass("is-invisible"), this.dom.$carouselScrollDirectionRight.addClass("is-invisible")) : (this.dom.$carouselScrollDirectionLeft.removeClass("is-invisible"), this.dom.$carouselScrollDirectionRight.removeClass("is-invisible"))
        }
        positionBadgeCategoryText() {
            const e = e => {
                const t = e.data("category"),
                    i = this.dom.$salesBadges.filter(`[data-category='${t}']`),
                    s = i.first().position().left,
                    r = this.getTotalWidth(i) - 15;
                e.css("left", `${s}px`), e.width(r)
            };
            Array.from(this.dom.$badgeCategoryText).forEach(t => e($(t)))
        }
    }, Views.CartSupportUpgrade = class {
        constructor(e) {
            const t = e.data();
            this.settings = {
                entryId: t.entryId,
                urlPath: t.path,
                index: t.index
            }, this.dom = {
                $form: e,
                $upgrade: e.find(".js-support-upgrade"),
                $itemPrice: e.parent().find(".js-item-upgrade__item-price"),
                $itemVariantPrice: $(".js-cart-variant__output-price"),
                $cartOriginalPrice: $(".js-item-upgrade__item-original-price"),
                $cartPageOriginalPrice: e.parent().find(".js-cart-page-item-upgrade__item-original-price"),
                $cartTotal: $(".js-item-upgrade__cart-total"),
                $cartCheckout: $(".js-cart__checkout"),
                $variantSupport: $(".js-cart-variant__output-support"),
                $discountEnabled: e.find(".js-support-upgrade").data("discountEnabled"),
                $discountOriginalPrice: e.find(".js-support-upgrade").data("discountOriginalPrice"),
                $discountPrice: e.find(".js-support-upgrade").data("discountPrice"),
                $discountPriceWrapper: $(".js-cart-variant__output-discount-price"),
                $discountUpgradePrice: e.find(".js-support-upgrade").data("discountUpgradePrice"),
                $discountUpgradeOriginalPrice: e.find(".js-support-upgrade").data("discountUpgradeOriginalPrice")
            }, this.dom.$upgrade.on("change", this.handleFormSubmit.bind(this))
        }
        handleFormSubmit() {
            this.dom.$upgrade.prop("disabled", !0);
            const e = this._getSupportValue();
            $.ajax({
                method: "PUT",
                url: this.settings.urlPath,
                data: {
                    support: e,
                    entry_id: this.settings.entryId
                }
            }).then(e => {
                this.dom.$form.attr("data-upgrade-error", !1), this.dom.$upgrade.prop("disabled", !1), this._updatePrices(e), this._updateSupportPeriod(e), this._updateCartPath(e.cart_identifier)
            }).catch(() => {
                this.dom.$form.attr("data-upgrade-error", !0)
            })
        }
        _updatePrices(e) {
            this.dom.$itemPrice.text(e.item_price), this.dom.$itemVariantPrice.text(e.item_price), this.dom.$cartTotal.text(e.cart_total), this._updateDiscountablePrices()
        }
        _updateDiscountablePrices() {
            this.dom.$discountEnabled && this.dom.$discountPrice && (this.dom.$upgrade.prop("checked") ? (this.dom.$itemVariantPrice.text(this.dom.$discountUpgradeOriginalPrice), this.dom.$cartOriginalPrice.text(this.dom.$discountUpgradeOriginalPrice), this.dom.$discountPriceWrapper.text(this.dom.$discountUpgradePrice), this.dom.$cartPageOriginalPrice.text(this.dom.$discountUpgradeOriginalPrice)) : (this.dom.$itemVariantPrice.text(this.dom.$discountOriginalPrice), this.dom.$cartOriginalPrice.text(this.dom.$discountOriginalPrice), this.dom.$discountPriceWrapper.text(this.dom.$discountPrice), this.dom.$cartPageOriginalPrice.text(this.dom.$discountOriginalPrice)))
        }
        _updateSupportPeriod(e) {
            this.dom.$variantSupport.text(e.support_period)
        }
        _updateCartPath(e) {
            if (this.dom.$cartCheckout.length) {
                const t = this.dom.$cartCheckout.attr("action").replace(/\d+/, e);
                this.dom.$cartCheckout.attr("action", t)
            }
        }
        _getSupportValue() {
            return this.dom.$upgrade.prop("checked") ? "bundle_12month" : "bundle_6month"
        }
    }, Views.CreditCardList = class {
        constructor(e) {
            this.$el = e, this.dom = {
                $selectCard: this.$el.find(".js-credit-card-list__select"),
                $addCard: this.$el.find(".js-credit-card-list__add-new"),
                $deleteCard: this.$el.find(".js-credit-card-list__delete"),
                $deleteAlert: this.$el.find(".js-credit-card-list__delete-alert"),
                $deleteConfirm: this.$el.find(".js-credit-card-list__delete-confirm"),
                $deleteDecline: this.$el.find(".js-credit-card-list__delete-decline")
            }, this.selector = {
                listItem: ".js-credit-card-list__card",
                selectedCardField: ".js-credit-card-list__card-id",
                deleteOverlay: ".js-credit-card-list__delete-alert"
            }, this.dom.$selectCard.on("click", this.handleSelectCard.bind(this)), this.dom.$addCard.on("click", this.handleNewCard.bind(this)), this.dom.$deleteCard.on("click", this.handleDeleteCard.bind(this)), this.dom.$deleteDecline.on("click", this.handleDeleteDecline.bind(this)), this.dom.$deleteConfirm.on({
                "ajax:beforeSend": this.handleDeleteBeforeSend.bind(this),
                "ajax:success": this.handleDeleteSuccess.bind(this),
                "ajax:error": this.handleDeleteError.bind(this)
            }), this.dom.$selectCard.first().click()
        }
        handleSelectCard(e) {
            e.preventDefault(), this._hideForm(), this._clearSelectIndicator(), $(this.selector.selectedCardField).val($(e.currentTarget).data("cardId")), $(e.currentTarget).closest(this.selector.listItem).addClass("is-selected")
        }
        handleNewCard(e) {
            e.preventDefault(), this._clearSelectIndicator(), this._showForm(), $(this.selector.selectedCardField).val("")
        }
        handleDeleteCard(e) {
            e.preventDefault();
            $(e.currentTarget).closest(this.selector.listItem).find(this.selector.deleteOverlay).attr("data-show-delete-overlay", !0)
        }
        handleDeleteDecline(e) {
            e.preventDefault(), this._hideDeleteOverlay()
        }
        handleDeleteBeforeSend(e) {
            this._hideDeleteOverlay(), $(e.currentTarget).closest(this.selector.listItem).addClass("is-hidden")
        }
        handleDeleteSuccess(e, t) {
            $(e.currentTarget).closest(this.selector.listItem).remove(), 0 === $(this.selector.listItem).length && this._showForm()
        }
        handleDeleteError(e) {
            const t = $(e.currentTarget).closest(this.selector.listItem);
            t.find(this.selector.deleteOverlay).attr("data-show-delete-overlay", !0), t.removeClass("is-hidden")
        }
        _hideDeleteOverlay() {
            this.dom.$deleteAlert.attr("data-show-delete-overlay", !1)
        }
        _showForm() {
            this.$el.attr("data-show-form", !0)
        }
        _hideForm() {
            this.$el.attr("data-show-form", !1)
        }
        _clearSelectIndicator() {
            $(this.selector.listItem).removeClass("is-selected")
        }
    }, Views.FollowButton = class {
        constructor(e) {
            this.$el = e, this.props = this.$el.data("props"), this.dom = {
                $buttons: this.$el.find("button")
            }, this.state = {
                loading: !1,
                following: this.props.following
            }, this.$el.on({
                "ajax:beforeSend": this.renderButtonDisability.bind(this),
                "ajax:success": this.handleAjaxSuccess.bind(this),
                "ajax:error": this.renderButtonDisability.bind(this)
            })
        }
        handleAjaxSuccess(e, t) {
            this.renderButtonDisability(), this.state.following = t.following, this.renderButtonUpdate(), this.props.selectors.count && this.renderCount(t.follower_count, t.follower_label)
        }
        renderCount(e, t) {
            $(this.props.selectors.count).html(e), $(this.props.selectors.label).html(t)
        }
        renderButtonDisability() {
            this.state.loading = !this.state.loading, this.dom.$buttons.prop("disabled", this.state.loading), this.$el.toggleClass("is-waiting")
        }
        renderButtonUpdate() {
            this.state.following ? this.$el.attr("action", this.props.routes.unfollow).addClass("is-following") : this.$el.attr("action", this.props.routes.follow).removeClass("is-following")
        }
    },
    function(e, t, i, s) {
        var r = i("html"),
            n = i(e),
            a = i(t),
            o = i.fancybox = function() {
                o.open.apply(this, arguments)
            },
            l = navigator.userAgent.match(/msie/i),
            c = null,
            u = t.createTouch !== s,
            h = function(e) {
                return e && e.hasOwnProperty && e instanceof i
            },
            d = function(e) {
                return e && "string" === i.type(e)
            },
            p = function(e) {
                return d(e) && 0 < e.indexOf("%")
            },
            f = function(e, t) {
                var i = parseInt(e, 10) || 0;
                return t && p(e) && (i *= o.getViewport()[t] / 100), Math.ceil(i)
            },
            m = function(e, t) {
                return f(e, t) + "px"
            };
        i.extend(o, {
            version: "2.1.5",
            defaults: {
                padding: 15,
                margin: 20,
                width: 800,
                height: 600,
                minWidth: 100,
                minHeight: 100,
                maxWidth: 9999,
                maxHeight: 9999,
                pixelRatio: 1,
                autoSize: !0,
                autoHeight: !1,
                autoWidth: !1,
                autoResize: !0,
                autoCenter: !u,
                fitToView: !0,
                aspectRatio: !1,
                topRatio: .5,
                leftRatio: .5,
                scrolling: "auto",
                wrapCSS: "",
                arrows: !0,
                closeBtn: !0,
                closeClick: !1,
                nextClick: !1,
                mouseWheel: !0,
                autoPlay: !1,
                playSpeed: 3e3,
                preload: 3,
                modal: !1,
                loop: !0,
                ajax: {
                    dataType: "html",
                    headers: {
                        "X-fancyBox": !0
                    }
                },
                iframe: {
                    scrolling: "auto",
                    preload: !0
                },
                swf: {
                    wmode: "transparent",
                    allowfullscreen: "true",
                    allowscriptaccess: "always"
                },
                keys: {
                    next: {
                        13: "left",
                        34: "up",
                        39: "left",
                        40: "up"
                    },
                    prev: {
                        8: "right",
                        33: "down",
                        37: "right",
                        38: "down"
                    },
                    close: [27],
                    play: [32],
                    toggle: [70]
                },
                direction: {
                    next: "left",
                    prev: "right"
                },
                scrollOutside: !0,
                index: 0,
                type: null,
                href: null,
                content: null,
                title: null,
                tpl: {
                    wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                    image: '<img class="fancybox-image" src="{href}" alt="" />',
                    iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' : "") + "></iframe>",
                    error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                    closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                    next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                    prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
                },
                openEffect: "fade",
                openSpeed: 250,
                openEasing: "swing",
                openOpacity: !0,
                openMethod: "zoomIn",
                closeEffect: "fade",
                closeSpeed: 250,
                closeEasing: "swing",
                closeOpacity: !0,
                closeMethod: "zoomOut",
                nextEffect: "elastic",
                nextSpeed: 250,
                nextEasing: "swing",
                nextMethod: "changeIn",
                prevEffect: "elastic",
                prevSpeed: 250,
                prevEasing: "swing",
                prevMethod: "changeOut",
                helpers: {
                    overlay: !0,
                    title: !0
                },
                onCancel: i.noop,
                beforeLoad: i.noop,
                afterLoad: i.noop,
                beforeShow: i.noop,
                afterShow: i.noop,
                beforeChange: i.noop,
                beforeClose: i.noop,
                afterClose: i.noop
            },
            group: {},
            opts: {},
            previous: null,
            coming: null,
            current: null,
            isActive: !1,
            isOpen: !1,
            isOpened: !1,
            wrap: null,
            skin: null,
            outer: null,
            inner: null,
            player: {
                timer: null,
                isActive: !1
            },
            ajaxLoad: null,
            imgPreload: null,
            transitions: {},
            helpers: {},
            open: function(e, t) {
                if (e && (i.isPlainObject(t) || (t = {}), !1 !== o.close(!0))) return i.isArray(e) || (e = h(e) ? i(e).get() : [e]), i.each(e, function(r, n) {
                    var a, l, c, u, p, f = {};
                    "object" === i.type(n) && (n.nodeType && (n = i(n)), h(n) ? (f = {
                        href: n.data("fancybox-href") || n.attr("href"),
                        title: n.data("fancybox-title") || n.attr("title"),
                        isDom: !0,
                        element: n
                    }, i.metadata && i.extend(!0, f, n.metadata())) : f = n), a = t.href || f.href || (d(n) ? n : null), l = t.title !== s ? t.title : f.title || "", !(u = (c = t.content || f.content) ? "html" : t.type || f.type) && f.isDom && ((u = n.data("fancybox-type")) || (u = (u = n.prop("class").match(/fancybox\.(\w+)/)) ? u[1] : null)), d(a) && (u || (o.isImage(a) ? u = "image" : o.isSWF(a) ? u = "swf" : "#" === a.charAt(0) ? u = "inline" : d(n) && (u = "html", c = n)), "ajax" === u && (p = a.split(/\s+/, 2), a = p.shift(), p = p.shift())), c || ("inline" === u ? a ? c = i(d(a) ? a.replace(/.*(?=#[^\s]+$)/, "") : a) : f.isDom && (c = n) : "html" === u ? c = a : !u && !a && f.isDom && (u = "inline", c = n)), i.extend(f, {
                        href: a,
                        type: u,
                        content: c,
                        title: l,
                        selector: p
                    }), e[r] = f
                }), o.opts = i.extend(!0, {}, o.defaults, t), t.keys !== s && (o.opts.keys = !!t.keys && i.extend({}, o.defaults.keys, t.keys)), o.group = e, o._start(o.opts.index)
            },
            cancel: function() {
                var e = o.coming;
                e && !1 !== o.trigger("onCancel") && (o.hideLoading(), o.ajaxLoad && o.ajaxLoad.abort(), o.ajaxLoad = null, o.imgPreload && (o.imgPreload.onload = o.imgPreload.onerror = null), e.wrap && e.wrap.stop(!0, !0).trigger("onReset").remove(), o.coming = null, o.current || o._afterZoomOut(e))
            },
            close: function(e) {
                o.cancel(), !1 !== o.trigger("beforeClose") && (o.unbindEvents(), o.isActive && (o.isOpen && !0 !== e ? (o.isOpen = o.isOpened = !1, o.isClosing = !0, i(".fancybox-item, .fancybox-nav").remove(), o.wrap.stop(!0, !0).removeClass("fancybox-opened"), o.transitions[o.current.closeMethod]()) : (i(".fancybox-wrap").stop(!0).trigger("onReset").remove(), o._afterZoomOut())))
            },
            play: function(e) {
                var t = function() {
                        clearTimeout(o.player.timer)
                    },
                    i = function() {
                        t(), o.current && o.player.isActive && (o.player.timer = setTimeout(o.next, o.current.playSpeed))
                    },
                    s = function() {
                        t(), a.unbind(".player"), o.player.isActive = !1, o.trigger("onPlayEnd")
                    };
                !0 === e || !o.player.isActive && !1 !== e ? o.current && (o.current.loop || o.current.index < o.group.length - 1) && (o.player.isActive = !0, a.bind({
                    "onCancel.player beforeClose.player": s,
                    "onUpdate.player": i,
                    "beforeLoad.player": t
                }), i(), o.trigger("onPlayStart")) : s()
            },
            next: function(e) {
                var t = o.current;
                t && (d(e) || (e = t.direction.next), o.jumpto(t.index + 1, e, "next"))
            },
            prev: function(e) {
                var t = o.current;
                t && (d(e) || (e = t.direction.prev), o.jumpto(t.index - 1, e, "prev"))
            },
            jumpto: function(e, t, i) {
                var r = o.current;
                r && (e = f(e), o.direction = t || r.direction[e >= r.index ? "next" : "prev"], o.router = i || "jumpto", r.loop && (0 > e && (e = r.group.length + e % r.group.length), e %= r.group.length), r.group[e] !== s && (o.cancel(), o._start(e)))
            },
            reposition: function(e, t) {
                var s, r = o.current,
                    n = r ? r.wrap : null;
                n && (s = o._getPosition(t), e && "scroll" === e.type ? (delete s.position, n.stop(!0, !0).animate(s, 200)) : (n.css(s), r.pos = i.extend({}, r.dim, s)))
            },
            update: function(e) {
                var t = e && e.type,
                    i = !t || "orientationchange" === t;
                i && (clearTimeout(c), c = null), o.isOpen && !c && (c = setTimeout(function() {
                    var s = o.current;
                    s && !o.isClosing && (o.wrap.removeClass("fancybox-tmp"), (i || "load" === t || "resize" === t && s.autoResize) && o._setDimension(), "scroll" === t && s.canShrink || o.reposition(e), o.trigger("onUpdate"), c = null)
                }, i && !u ? 0 : 300))
            },
            toggle: function(e) {
                o.isOpen && (o.current.fitToView = "boolean" === i.type(e) ? e : !o.current.fitToView, u && (o.wrap.removeAttr("style").addClass("fancybox-tmp"), o.trigger("onUpdate")), o.update())
            },
            hideLoading: function() {
                a.unbind(".loading"), i("#fancybox-loading").remove()
            },
            showLoading: function() {
                var e, t;
                o.hideLoading(), e = i('<div id="fancybox-loading"><div></div></div>').click(o.cancel).appendTo("body"), a.bind("keydown.loading", function(e) {
                    27 === (e.which || e.keyCode) && (e.preventDefault(), o.cancel())
                }), o.defaults.fixed || (t = o.getViewport(), e.css({
                    position: "absolute",
                    top: .5 * t.h + t.y,
                    left: .5 * t.w + t.x
                }))
            },
            getViewport: function() {
                var t = o.current && o.current.locked || !1,
                    i = {
                        x: n.scrollLeft(),
                        y: n.scrollTop()
                    };
                return t ? (i.w = t[0].clientWidth, i.h = t[0].clientHeight) : (i.w = u && e.innerWidth ? e.innerWidth : n.width(), i.h = u && e.innerHeight ? e.innerHeight : n.height()), i
            },
            unbindEvents: function() {
                o.wrap && h(o.wrap) && o.wrap.unbind(".fb"), a.unbind(".fb"), n.unbind(".fb")
            },
            bindEvents: function() {
                var e, t = o.current;
                t && (n.bind("orientationchange.fb" + (u ? "" : " resize.fb") + (t.autoCenter && !t.locked ? " scroll.fb" : ""), o.update), (e = t.keys) && a.bind("keydown.fb", function(r) {
                    var n = r.which || r.keyCode,
                        a = r.target || r.srcElement;
                    if (27 === n && o.coming) return !1;
                    !r.ctrlKey && !r.altKey && !r.shiftKey && !r.metaKey && (!a || !a.type && !i(a).is("[contenteditable]")) && i.each(e, function(e, a) {
                        return 1 < t.group.length && a[n] !== s ? (o[e](a[n]), r.preventDefault(), !1) : -1 < i.inArray(n, a) ? (o[e](), r.preventDefault(), !1) : void 0
                    })
                }), i.fn.mousewheel && t.mouseWheel && o.wrap.bind("mousewheel.fb", function(e, s, r, n) {
                    for (var a = i(e.target || null), l = !1; a.length && !l && !a.is(".fancybox-skin") && !a.is(".fancybox-wrap");) l = a[0] && !(a[0].style.overflow && "hidden" === a[0].style.overflow) && (a[0].clientWidth && a[0].scrollWidth > a[0].clientWidth || a[0].clientHeight && a[0].scrollHeight > a[0].clientHeight), a = i(a).parent();
                    0 !== s && !l && 1 < o.group.length && !t.canShrink && (0 < n || 0 < r ? o.prev(0 < n ? "down" : "left") : (0 > n || 0 > r) && o.next(0 > n ? "up" : "right"), e.preventDefault())
                }))
            },
            trigger: function(e, t) {
                var s, r = t || o.coming || o.current;
                if (r) {
                    if (i.isFunction(r[e]) && (s = r[e].apply(r, Array.prototype.slice.call(arguments, 1))), !1 === s) return !1;
                    r.helpers && i.each(r.helpers, function(t, s) {
                        s && o.helpers[t] && i.isFunction(o.helpers[t][e]) && o.helpers[t][e](i.extend(!0, {}, o.helpers[t].defaults, s), r)
                    }), a.trigger(e)
                }
            },
            isImage: function(e) {
                return d(e) && e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
            },
            isSWF: function(e) {
                return d(e) && e.match(/\.(swf)((\?|#).*)?$/i)
            },
            _start: function(e) {
                var t, s, r = {};
                if (e = f(e), !(t = o.group[e] || null)) return !1;
                if (t = (r = i.extend(!0, {}, o.opts, t)).margin, s = r.padding, "number" === i.type(t) && (r.margin = [t, t, t, t]), "number" === i.type(s) && (r.padding = [s, s, s, s]), r.modal && i.extend(!0, r, {
                        closeBtn: !1,
                        closeClick: !1,
                        nextClick: !1,
                        arrows: !1,
                        mouseWheel: !1,
                        keys: null,
                        helpers: {
                            overlay: {
                                closeClick: !1
                            }
                        }
                    }), r.autoSize && (r.autoWidth = r.autoHeight = !0), "auto" === r.width && (r.autoWidth = !0), "auto" === r.height && (r.autoHeight = !0), r.group = o.group, r.index = e, o.coming = r, !1 === o.trigger("beforeLoad")) o.coming = null;
                else {
                    if (s = r.type, t = r.href, !s) return o.coming = null, !(!o.current || !o.router || "jumpto" === o.router) && (o.current.index = e, o[o.router](o.direction));
                    if (o.isActive = !0, "image" !== s && "swf" !== s || (r.autoHeight = r.autoWidth = !1, r.scrolling = "visible"), "image" === s && (r.aspectRatio = !0), "iframe" === s && u && (r.scrolling = "scroll"), r.wrap = i(r.tpl.wrap).addClass("fancybox-" + (u ? "mobile" : "desktop") + " fancybox-type-" + s + " fancybox-tmp " + r.wrapCSS).appendTo(r.parent || "body"), i.extend(r, {
                            skin: i(".fancybox-skin", r.wrap),
                            outer: i(".fancybox-outer", r.wrap),
                            inner: i(".fancybox-inner", r.wrap)
                        }), i.each(["Top", "Right", "Bottom", "Left"], function(e, t) {
                            r.skin.css("padding" + t, m(r.padding[e]))
                        }), o.trigger("onReady"), "inline" === s || "html" === s) {
                        if (!r.content || !r.content.length) return o._error("content")
                    } else if (!t) return o._error("href");
                    "image" === s ? o._loadImage() : "ajax" === s ? o._loadAjax() : "iframe" === s ? o._loadIframe() : o._afterLoad()
                }
            },
            _error: function(e) {
                i.extend(o.coming, {
                    type: "html",
                    autoWidth: !0,
                    autoHeight: !0,
                    minWidth: 0,
                    minHeight: 0,
                    scrolling: "no",
                    hasError: e,
                    content: o.coming.tpl.error
                }), o._afterLoad()
            },
            _loadImage: function() {
                var e = o.imgPreload = new Image;
                e.onload = function() {
                    this.onload = this.onerror = null, o.coming.width = this.width / o.opts.pixelRatio, o.coming.height = this.height / o.opts.pixelRatio, o._afterLoad()
                }, e.onerror = function() {
                    this.onload = this.onerror = null, o._error("image")
                }, e.src = o.coming.href, !0 !== e.complete && o.showLoading()
            },
            _loadAjax: function() {
                var e = o.coming;
                o.showLoading(), o.ajaxLoad = i.ajax(i.extend({}, e.ajax, {
                    url: e.href,
                    error: function(e, t) {
                        o.coming && "abort" !== t ? o._error("ajax", e) : o.hideLoading()
                    },
                    success: function(t, i) {
                        "success" === i && (e.content = t, o._afterLoad())
                    }
                }))
            },
            _loadIframe: function() {
                var e = o.coming,
                    t = i(e.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", u ? "auto" : e.iframe.scrolling).attr("src", e.href);
                i(e.wrap).bind("onReset", function() {
                    try {
                        i(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                    } catch (e) {}
                }), e.iframe.preload && (o.showLoading(), t.one("load", function() {
                    i(this).data("ready", 1), u || i(this).bind("load.fb", o.update), i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), o._afterLoad()
                })), e.content = t.appendTo(e.inner), e.iframe.preload || o._afterLoad()
            },
            _preloadImages: function() {
                var e, t, i = o.group,
                    s = o.current,
                    r = i.length,
                    n = s.preload ? Math.min(s.preload, r - 1) : 0;
                for (t = 1; t <= n; t += 1) "image" === (e = i[(s.index + t) % r]).type && e.href && ((new Image).src = e.href)
            },
            _afterLoad: function() {
                var e, t, s, r, n, a = o.coming,
                    l = o.current;
                if (o.hideLoading(), a && !1 !== o.isActive)
                    if (!1 === o.trigger("afterLoad", a, l)) a.wrap.stop(!0).trigger("onReset").remove(), o.coming = null;
                    else {
                        switch (l && (o.trigger("beforeChange", l), l.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), o.unbindEvents(), e = a.content, t = a.type, s = a.scrolling, i.extend(o, {
                            wrap: a.wrap,
                            skin: a.skin,
                            outer: a.outer,
                            inner: a.inner,
                            current: a,
                            previous: l
                        }), r = a.href, t) {
                            case "inline":
                            case "ajax":
                            case "html":
                                a.selector ? e = i("<div>").html(e).find(a.selector) : h(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", i('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function() {
                                    i(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
                                }));
                                break;
                            case "image":
                                e = a.tpl.image.replace("{href}", r);
                                break;
                            case "swf":
                                e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + r + '"></param>', n = "", i.each(a.swf, function(t, i) {
                                    e += '<param name="' + t + '" value="' + i + '"></param>', n += " " + t + '="' + i + '"'
                                }), e += '<embed src="' + r + '" type="application/x-shockwave-flash" width="100%" height="100%"' + n + "></embed></object>"
                        }(!h(e) || !e.parent().is(a.inner)) && a.inner.append(e), o.trigger("beforeShow"), a.inner.css("overflow", "yes" === s ? "scroll" : "no" === s ? "hidden" : s), o._setDimension(), o.reposition(), o.isOpen = !1, o.coming = null, o.bindEvents(), o.isOpened ? l.prevMethod && o.transitions[l.prevMethod]() : i(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove(), o.transitions[o.isOpened ? a.nextMethod : a.openMethod](), o._preloadImages()
                    }
            },
            _setDimension: function() {
                var e, t, s, r, n, a, l, c, u, h = o.getViewport(),
                    d = 0,
                    g = !1,
                    v = !1,
                    y = (g = o.wrap, o.skin),
                    b = o.inner,
                    _ = o.current,
                    w = (v = _.width, _.height),
                    k = _.minWidth,
                    $ = _.minHeight,
                    x = _.maxWidth,
                    C = _.maxHeight,
                    S = _.scrolling,
                    A = _.scrollOutside ? _.scrollbarWidth : 0,
                    D = _.margin,
                    P = f(D[1] + D[3]),
                    M = f(D[0] + D[2]);
                if (g.add(y).add(b).width("auto").height("auto").removeClass("fancybox-tmp"), t = P + (D = f(y.outerWidth(!0) - y.width())), s = M + (e = f(y.outerHeight(!0) - y.height())), r = p(v) ? (h.w - t) * f(v) / 100 : v, n = p(w) ? (h.h - s) * f(w) / 100 : w, "iframe" === _.type) {
                    if (u = _.content, _.autoHeight && 1 === u.data("ready")) try {
                        u[0].contentWindow.document.location && (b.width(r).height(9999), a = u.contents().find("body"), A && a.css("overflow-x", "hidden"), n = a.outerHeight(!0))
                    } catch (e) {}
                } else(_.autoWidth || _.autoHeight) && (b.addClass("fancybox-tmp"), _.autoWidth || b.width(r), _.autoHeight || b.height(n), _.autoWidth && (r = b.width()), _.autoHeight && (n = b.height()), b.removeClass("fancybox-tmp"));
                if (v = f(r), w = f(n), c = r / n, k = f(p(k) ? f(k, "w") - t : k), x = f(p(x) ? f(x, "w") - t : x), $ = f(p($) ? f($, "h") - s : $), a = x, l = C = f(p(C) ? f(C, "h") - s : C), _.fitToView && (x = Math.min(h.w - t, x), C = Math.min(h.h - s, C)), t = h.w - P, M = h.h - M, _.aspectRatio ? (v > x && (w = f((v = x) / c)), w > C && (v = f((w = C) * c)), v < k && (w = f((v = k) / c)), w < $ && (v = f((w = $) * c))) : (v = Math.max(k, Math.min(v, x)), _.autoHeight && "iframe" !== _.type && (b.width(v), w = b.height()), w = Math.max($, Math.min(w, C))), _.fitToView)
                    if (b.width(v).height(w), g.width(v + D), h = g.width(), P = g.height(), _.aspectRatio)
                        for (;
                            (h > t || P > M) && v > k && w > $ && !(19 < d++);) w = Math.max($, Math.min(C, w - 10)), (v = f(w * c)) < k && (w = f((v = k) / c)), v > x && (w = f((v = x) / c)), b.width(v).height(w), g.width(v + D), h = g.width(), P = g.height();
                    else v = Math.max(k, Math.min(v, v - (h - t))), w = Math.max($, Math.min(w, w - (P - M)));
                A && "auto" === S && w < n && v + D + A < t && (v += A), b.width(v).height(w), g.width(v + D), h = g.width(), P = g.height(), g = (h > t || P > M) && v > k && w > $, v = _.aspectRatio ? v < a && w < l && v < r && w < n : (v < a || w < l) && (v < r || w < n), i.extend(_, {
                    dim: {
                        width: m(h),
                        height: m(P)
                    },
                    origWidth: r,
                    origHeight: n,
                    canShrink: g,
                    canExpand: v,
                    wPadding: D,
                    hPadding: e,
                    wrapSpace: P - y.outerHeight(!0),
                    skinSpace: y.height() - w
                }), !u && _.autoHeight && w > $ && w < C && !v && b.height("auto")
            },
            _getPosition: function(e) {
                var t = o.current,
                    i = o.getViewport(),
                    s = t.margin,
                    r = o.wrap.width() + s[1] + s[3],
                    n = o.wrap.height() + s[0] + s[2];
                s = {
                    position: "absolute",
                    top: s[0],
                    left: s[3]
                };
                return t.autoCenter && t.fixed && !e && n <= i.h && r <= i.w ? s.position = "fixed" : t.locked || (s.top += i.y, s.left += i.x), s.top = m(Math.max(s.top, s.top + (i.h - n) * t.topRatio)), s.left = m(Math.max(s.left, s.left + (i.w - r) * t.leftRatio)), s
            },
            _afterZoomIn: function() {
                var e = o.current;
                e && (o.isOpen = o.isOpened = !0, o.wrap.css("overflow", "visible").addClass("fancybox-opened"), o.update(), (e.closeClick || e.nextClick && 1 < o.group.length) && o.inner.css("cursor", "pointer").bind("click.fb", function(t) {
                    !i(t.target).is("a") && !i(t.target).parent().is("a") && (t.preventDefault(), o[e.closeClick ? "close" : "next"]())
                }), e.closeBtn && i(e.tpl.closeBtn).appendTo(o.skin).bind("click.fb", function(e) {
                    e.preventDefault(), o.close()
                }), e.arrows && 1 < o.group.length && ((e.loop || 0 < e.index) && i(e.tpl.prev).appendTo(o.outer).bind("click.fb", o.prev), (e.loop || e.index < o.group.length - 1) && i(e.tpl.next).appendTo(o.outer).bind("click.fb", o.next)), o.trigger("afterShow"), e.loop || e.index !== e.group.length - 1 ? o.opts.autoPlay && !o.player.isActive && (o.opts.autoPlay = !1, o.play()) : o.play(!1))
            },
            _afterZoomOut: function(e) {
                e = e || o.current, i(".fancybox-wrap").trigger("onReset").remove(), i.extend(o, {
                    group: {},
                    opts: {},
                    router: !1,
                    current: null,
                    isActive: !1,
                    isOpened: !1,
                    isOpen: !1,
                    isClosing: !1,
                    wrap: null,
                    skin: null,
                    outer: null,
                    inner: null
                }), o.trigger("afterClose", e)
            }
        }), o.transitions = {
            getOrigPosition: function() {
                var e = o.current,
                    t = e.element,
                    i = e.orig,
                    s = {},
                    r = 50,
                    n = 50,
                    a = e.hPadding,
                    l = e.wPadding,
                    c = o.getViewport();
                return !i && e.isDom && t.is(":visible") && ((i = t.find("img:first")).length || (i = t)), h(i) ? (s = i.offset(), i.is("img") && (r = i.outerWidth(), n = i.outerHeight())) : (s.top = c.y + (c.h - n) * e.topRatio, s.left = c.x + (c.w - r) * e.leftRatio), ("fixed" === o.wrap.css("position") || e.locked) && (s.top -= c.y, s.left -= c.x), {
                    top: m(s.top - a * e.topRatio),
                    left: m(s.left - l * e.leftRatio),
                    width: m(r + l),
                    height: m(n + a)
                }
            },
            step: function(e, t) {
                var i, s, r = t.prop,
                    n = (s = o.current).wrapSpace,
                    a = s.skinSpace;
                "width" !== r && "height" !== r || (i = t.end === t.start ? 1 : (e - t.start) / (t.end - t.start), o.isClosing && (i = 1 - i), s = e - (s = "width" === r ? s.wPadding : s.hPadding), o.skin[r](f("width" === r ? s : s - n * i)), o.inner[r](f("width" === r ? s : s - n * i - a * i)))
            },
            zoomIn: function() {
                var e = o.current,
                    t = e.pos,
                    s = e.openEffect,
                    r = "elastic" === s,
                    n = i.extend({
                        opacity: 1
                    }, t);
                delete n.position, r ? (t = this.getOrigPosition(), e.openOpacity && (t.opacity = .1)) : "fade" === s && (t.opacity = .1), o.wrap.css(t).animate(n, {
                    duration: "none" === s ? 0 : e.openSpeed,
                    easing: e.openEasing,
                    step: r ? this.step : null,
                    complete: o._afterZoomIn
                })
            },
            zoomOut: function() {
                var e = o.current,
                    t = e.closeEffect,
                    i = "elastic" === t,
                    s = {
                        opacity: .1
                    };
                i && (s = this.getOrigPosition(), e.closeOpacity && (s.opacity = .1)), o.wrap.animate(s, {
                    duration: "none" === t ? 0 : e.closeSpeed,
                    easing: e.closeEasing,
                    step: i ? this.step : null,
                    complete: o._afterZoomOut
                })
            },
            changeIn: function() {
                var e, t = o.current,
                    i = t.nextEffect,
                    s = t.pos,
                    r = {
                        opacity: 1
                    },
                    n = o.direction;
                s.opacity = .1, "elastic" === i && (e = "down" === n || "up" === n ? "top" : "left", "down" === n || "right" === n ? (s[e] = m(f(s[e]) - 200), r[e] = "+=200px") : (s[e] = m(f(s[e]) + 200), r[e] = "-=200px")), "none" === i ? o._afterZoomIn() : o.wrap.css(s).animate(r, {
                    duration: t.nextSpeed,
                    easing: t.nextEasing,
                    complete: o._afterZoomIn
                })
            },
            changeOut: function() {
                var e = o.previous,
                    t = e.prevEffect,
                    s = {
                        opacity: .1
                    },
                    r = o.direction;
                "elastic" === t && (s["down" === r || "up" === r ? "top" : "left"] = ("up" === r || "left" === r ? "-" : "+") + "=200px"), e.wrap.animate(s, {
                    duration: "none" === t ? 0 : e.prevSpeed,
                    easing: e.prevEasing,
                    complete: function() {
                        i(this).trigger("onReset").remove()
                    }
                })
            }
        }, o.helpers.overlay = {
            defaults: {
                closeClick: !0,
                speedOut: 200,
                showEarly: !0,
                css: {},
                locked: !u,
                fixed: !0
            },
            overlay: null,
            fixed: !1,
            el: i("html"),
            create: function(e) {
                e = i.extend({}, this.defaults, e), this.overlay && this.close(), this.overlay = i('<div class="fancybox-overlay"></div>').appendTo(o.coming ? o.coming.parent : e.parent), this.fixed = !1, e.fixed && o.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
            },
            open: function(e) {
                var t = this;
                e = i.extend({}, this.defaults, e), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(e), this.fixed || (n.bind("resize.overlay", i.proxy(this.update, this)), this.update()), e.closeClick && this.overlay.bind("click.overlay", function(e) {
                    if (i(e.target).hasClass("fancybox-overlay")) return o.isActive ? o.close() : t.close(), !1
                }), this.overlay.css(e.css).show()
            },
            close: function() {
                var e, t;
                n.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (i(".fancybox-margin").removeClass("fancybox-margin"), e = n.scrollTop(), t = n.scrollLeft(), this.el.removeClass("fancybox-lock"), n.scrollTop(e).scrollLeft(t)), i(".fancybox-overlay").remove().hide(), i.extend(this, {
                    overlay: null,
                    fixed: !1
                })
            },
            update: function() {
                var e, i = "100%";
                this.overlay.width(i).height("100%"), l ? (e = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth), a.width() > e && (i = a.width())) : a.width() > n.width() && (i = a.width()), this.overlay.width(i).height(a.height())
            },
            onReady: function(e, t) {
                var s = this.overlay;
                i(".fancybox-overlay").stop(!0, !0), s || this.create(e), e.locked && this.fixed && t.fixed && (s || (this.margin = a.height() > n.height() && i("html").css("margin-right").replace("px", "")), t.locked = this.overlay.append(t.wrap), t.fixed = !1), !0 === e.showEarly && this.beforeShow.apply(this, arguments)
            },
            beforeShow: function(e, t) {
                var s, r;
                t.locked && (!1 !== this.margin && (i("*").filter(function() {
                    return "fixed" === i(this).css("position") && !i(this).hasClass("fancybox-overlay") && !i(this).hasClass("fancybox-wrap")
                }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), s = n.scrollTop(), r = n.scrollLeft(), this.el.addClass("fancybox-lock"), n.scrollTop(s).scrollLeft(r)), this.open(e)
            },
            onUpdate: function() {
                this.fixed || this.update()
            },
            afterClose: function(e) {
                this.overlay && !o.coming && this.overlay.fadeOut(e.speedOut, i.proxy(this.close, this))
            }
        }, o.helpers.title = {
            defaults: {
                type: "float",
                position: "bottom"
            },
            beforeShow: function(e) {
                var t = o.current,
                    s = t.title,
                    r = e.type;
                if (i.isFunction(s) && (s = s.call(t.element, t)), d(s) && "" !== i.trim(s)) {
                    switch (t = i('<div class="fancybox-title fancybox-title-' + r + '-wrap">' + s + "</div>"), r) {
                        case "inside":
                            r = o.skin;
                            break;
                        case "outside":
                            r = o.wrap;
                            break;
                        case "over":
                            r = o.inner;
                            break;
                        default:
                            r = o.skin, t.appendTo("body"), l && t.width(t.width()), t.wrapInner('<span class="child"></span>'), o.current.margin[2] += Math.abs(f(t.css("margin-bottom")))
                    }
                    t["top" === e.position ? "prependTo" : "appendTo"](r)
                }
            }
        }, i.fn.fancybox = function(e) {
            var t, s = i(this),
                r = this.selector || "",
                n = function(n) {
                    var a, l, c = i(this).blur(),
                        u = t;
                    !n.ctrlKey && !n.altKey && !n.shiftKey && !n.metaKey && !c.is(".fancybox-wrap") && (a = e.groupAttr || "data-fancybox-group", (l = c.attr(a)) || (a = "rel", l = c.get(0)[a]), l && "" !== l && "nofollow" !== l && (u = (c = (c = r.length ? i(r) : s).filter("[" + a + '="' + l + '"]')).index(this)), e.index = u, !1 !== o.open(c, e) && n.preventDefault())
                };
            return t = (e = e || {}).index || 0, r && !1 !== e.live ? a.undelegate(r, "click.fb-start").delegate(r + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", n) : s.unbind("click.fb-start").bind("click.fb-start", n), this.filter("[data-fancybox-start=1]").trigger("click"), this
        }, a.ready(function() {
            var t, n;
            if (i.scrollbarWidth === s && (i.scrollbarWidth = function() {
                    var e = i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                        t = (t = e.children()).innerWidth() - t.height(99).innerWidth();
                    return e.remove(), t
                }), i.support.fixedPosition === s) {
                t = i.support;
                var a = 20 === (n = i('<div style="position:fixed;top:20px;"></div>').appendTo("body"))[0].offsetTop || 15 === n[0].offsetTop;
                n.remove(), t.fixedPosition = a
            }
            i.extend(o.defaults, {
                scrollbarWidth: i.scrollbarWidth(),
                fixed: i.support.fixedPosition,
                parent: i("body")
            }), t = i(e).width(), r.addClass("fancybox-lock-test"), n = i(e).width(), r.removeClass("fancybox-lock-test"), i("<style type='text/css'>.fancybox-margin{margin-right:" + (n - t) + "px;}</style>").appendTo("head")
        })
    }(window, document, jQuery), Market.DOMUtils.Video = class {
        constructor(e) {
            this.setup = this.setup.bind(this), this.handleSetupError = this.handleSetupError.bind(this), this.getFile = this.getFile.bind(this), this.video = e;
            const t = $(".js-video-player");
            this.dom = {
                $el: t,
                $container: t.parent(),
                $legacyVideoButton: $(".video-preview"),
                $legacyButtons: $("#fullscreen"),
                $legacyButtonContainer: $(".js-legacy-preview-buttons"),
                $errors: $("js-video-error-container")
            }
        }
        setup() {
            this.video.isMainPreview ? (this.setupFancyboxVideo(this.dom.$el.add(this.dom.$legacyVideoButton)), this.dom.$el.addClass("fake-video-player--is-ready")) : this.setupFancyboxVideo(this.dom.$legacyVideoButton)
        }
        handleSetupError(e) {
            $.fancybox.close(!0);
            const t = -1 !== e.message.indexOf("No suitable players found") ? `Your browser is unable to play videos. You can <a href='${this.video.file}'>download the video</a> or <a href='https://get.adobe.com/flashplayer'>get Flash</a>.` : `Uh-oh, something went wrong. You can <a href='${this.video.file}'>download the video</a> or reload the page.`;
            this.dom.$errors.html(`<div class='error'>${t}</div>`)
        }
        getFile() {
            window.location.href = this.video.file
        }
        fancyboxOptions() {
            const e = "<video id='inline-videojs-preview' class='video-js vjs-default-skin' preload='metadata'></video>";
            return {
                width: this.video.width,
                height: this.video.height,
                autoSize: !1,
                padding: 3,
                hideOnContentClick: !1,
                scrolling: "no",
                model: !1,
                content: e,
                openEffect: "none",
                closeEffect: "none",
                beforeShow: () => this.setupInlineVideo({
                    autostart: !0,
                    image: null
                }),
                beforeClose: () => {
                    this.videoJs.dispose()
                },
                helpers: {
                    overlay: {
                        css: {
                            background: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                }
            }
        }
        setupFancyboxVideo(e) {
            e.fancybox(this.fancyboxOptions())
        }
        playVideoJs() {
            const {
                video: e
            } = this;
            this.videoJs.ready(function() {
                this.src(e.file), this.one("loadedmetadata", function() {
                    this.play().catch(function(e) {
                        console.error("Video: Autoplay prevented by browser policy", e.name)
                    })
                })
            })
        }
        setupVideoJs() {
            const e = this;
            this.videoJs = videojs("inline-videojs-preview", {
                src: this.video.file,
                fluid: !0,
                controls: !0
            }), this.videoJs.on("ended", function() {
                e.videoJSLooped = !0, e.loopVideo(this)
            })
        }
        loopVideo(e) {
            e.currentTime(0), e.play().catch(function(e) {
                console.error("Video: Loop playback prevented by browser policy", e.name)
            })
        }
        setupInlineVideo(e) {
            this.setupVideoJs(), this.playVideoJs()
        }
    }, Views.InlineVideoPreview = class {
        constructor(e) {
            const t = e.data("props");
            this.loadVideoJs(t)
        }
        loadVideoJs(e) {
            Market.DOMUtils.getVideoJSPlayerManager().register().then(() => {
                new Market.DOMUtils.Video(e).setup()
            }).catch(e => {
                console.error("InlineVideoPreview: Failed to initialize video player", e)
            })
        }
    }, Market.Validations.itemAttributeFields = function() {
        return $.validator.addMethod("regex", function(e, t) {
            const i = $(t),
                s = i.attr("data-regex"),
                r = -1 !== s.split("/").pop().indexOf("i"),
                n = new RegExp(s.replace(/^\/|\/$|\/i$|\/g$|\/m$|\/y$/g, ""), r ? "i" : "");
            return $.validator.messages.regex = i.attr("data-message"), "" === e || n.test(e)
        }), $.validator.addClassRules("regex-validate", {
            regex: !0
        }), $("#attribute_fields").closest("form").validate({
            errorClass: "invalid",
            validClass: "valid",
            errorPlacement(e, t) {
                "user[accepted_terms]" === t.attr("name") ? e.appendTo($(t).parent("label")) : e.insertAfter(t)
            },
            invalidHandler(e, t) {
                $(this).trigger("submit-cancelled")
            }
        })
    }, Views.ItemAttributeFields = class {
        constructor() {
            Market.Validations.itemAttributeFields()
        }
    }, Views.ScreenshotGallery = class {
        constructor(e) {
            this.link = e, this.gallery = $(".js-.item-preview-image__gallery"), 0 !== this.gallery.length && ($.magnificPopup.instance = null, this.link.on("click", this.handleClick.bind(this)), this.link.data("specGalleryLoaded", !0))
        }
        handleClick(e) {
            this.loadModal(), $(window).width() >= 501 && (this.gallery.magnificPopup("open"), e.preventDefault())
        }
        loadModal() {
            this.gallery.magnificPopup({
                delegate: "a",
                type: "image",
                gallery: {
                    enabled: !0
                },
                callbacks: {
                    afterClose() {
                        $.magnificPopup.instance = null
                    }
                }
            })
        }
    }, Views.PjaxSelector = class {
        constructor(e) {
            this.$el = e, this.radioButtonSelector = "input[type='radio']", this.pjaxContainerSelector = this.$el.data("pjaxContainerSelector"), this.setupPjax()
        }
        setupPjax() {
            this.$el.on("click", this.radioButtonSelector, this.handleSelection.bind(this)), $(this.pjaxContainerSelector).on({
                "pjax:start": this.handleStart.bind(this),
                "pjax:success": this.handleSuccess.bind(this),
                "pjax:end": this.handleEnd.bind(this)
            })
        }
        handleSelection(e) {
            const t = $(e.currentTarget).data("url");
            $.pjax({
                url: t,
                container: this.pjaxContainerSelector,
                fragment: this.pjaxContainerSelector,
                target: this.pjaxContainerSelector,
                scrollTo: !1
            })
        }
        handleSuccess(e, t, i, s, r) {
            viewloader.execute(Views, $(this.pjaxContainerSelector))
        }
        handleStart(e) {
            $(this.pjaxContainerSelector).addClass("is-disabled-loading")
        }
        handleEnd(e) {
            $(this.pjaxContainerSelector).removeClass("is-disabled-loading")
        }
    },
    function(e, t) {
        "function" == typeof define && define.amd ? define(t) : "object" == typeof module && module.exports ? module.exports = t() : e.numeral = t()
    }(this, function() {
        function e(e, t) {
            this._input = e, this._value = t
        }
        var t, i, s, r, n, a = "2.0.6",
            o = {},
            l = {},
            c = {
                currentLocale: "en",
                zeroFormat: null,
                nullFormat: null,
                defaultFormat: "0,0",
                scalePercentBy100: !0
            },
            u = {
                currentLocale: c.currentLocale,
                zeroFormat: c.zeroFormat,
                nullFormat: c.nullFormat,
                defaultFormat: c.defaultFormat,
                scalePercentBy100: c.scalePercentBy100
            };
        return (t = function(s) {
            var r, n, a, l;
            if (t.isNumeral(s)) r = s.value();
            else if (0 === s || void 0 === s) r = 0;
            else if (null === s || i.isNaN(s)) r = null;
            else if ("string" == typeof s)
                if (u.zeroFormat && s === u.zeroFormat) r = 0;
                else if (u.nullFormat && s === u.nullFormat || !s.replace(/[^0-9]+/g, "").length) r = null;
            else {
                for (n in o)
                    if ((l = "function" == typeof o[n].regexps.unformat ? o[n].regexps.unformat() : o[n].regexps.unformat) && s.match(l)) {
                        a = o[n].unformat;
                        break
                    }
                r = (a = a || t._.stringToNumber)(s)
            } else r = Number(s) || null;
            return new e(s, r)
        }).version = a, t.isNumeral = function(t) {
            return t instanceof e
        }, t._ = i = {
            numberToFormat: function(e, i, s) {
                var r, n, a, o, c, u, h, d = l[t.options.currentLocale],
                    p = !1,
                    f = !1,
                    m = 0,
                    g = "",
                    v = 1e12,
                    y = 1e9,
                    b = 1e6,
                    _ = 1e3,
                    w = "",
                    k = !1;
                if (e = e || 0, n = Math.abs(e), t._.includes(i, "(") ? (p = !0, i = i.replace(/[\(|\)]/g, "")) : (t._.includes(i, "+") || t._.includes(i, "-")) && (c = t._.includes(i, "+") ? i.indexOf("+") : e < 0 ? i.indexOf("-") : -1, i = i.replace(/[\+|\-]/g, "")), t._.includes(i, "a") && (r = !!(r = i.match(/a(k|m|b|t)?/)) && r[1], t._.includes(i, " a") && (g = " "), i = i.replace(new RegExp(g + "a[kmbt]?"), ""), n >= v && !r || "t" === r ? (g += d.abbreviations.trillion, e /= v) : n < v && n >= y && !r || "b" === r ? (g += d.abbreviations.billion, e /= y) : n < y && n >= b && !r || "m" === r ? (g += d.abbreviations.million, e /= b) : (n < b && n >= _ && !r || "k" === r) && (g += d.abbreviations.thousand, e /= _)), t._.includes(i, "[.]") && (f = !0, i = i.replace("[.]", ".")), a = e.toString().split(".")[0], o = i.split(".")[1], u = i.indexOf(","), m = (i.split(".")[0].split(",")[0].match(/0/g) || []).length, o ? (t._.includes(o, "[") ? (o = (o = o.replace("]", "")).split("["), w = t._.toFixed(e, o[0].length + o[1].length, s, o[1].length)) : w = t._.toFixed(e, o.length, s), a = w.split(".")[0], w = t._.includes(w, ".") ? d.delimiters.decimal + w.split(".")[1] : "", f && 0 === Number(w.slice(1)) && (w = "")) : a = t._.toFixed(e, 0, s), g && !r && Number(a) >= 1e3 && g !== d.abbreviations.trillion) switch (a = String(Number(a) / 1e3), g) {
                    case d.abbreviations.thousand:
                        g = d.abbreviations.million;
                        break;
                    case d.abbreviations.million:
                        g = d.abbreviations.billion;
                        break;
                    case d.abbreviations.billion:
                        g = d.abbreviations.trillion
                }
                if (t._.includes(a, "-") && (a = a.slice(1), k = !0), a.length < m)
                    for (var $ = m - a.length; $ > 0; $--) a = "0" + a;
                return u > -1 && (a = a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + d.delimiters.thousands)), 0 === i.indexOf(".") && (a = ""), h = a + w + (g || ""), p ? h = (p && k ? "(" : "") + h + (p && k ? ")" : "") : c >= 0 ? h = 0 === c ? (k ? "-" : "+") + h : h + (k ? "-" : "+") : k && (h = "-" + h), h
            },
            stringToNumber: function(e) {
                var t, i, s, r = l[u.currentLocale],
                    n = e,
                    a = {
                        thousand: 3,
                        million: 6,
                        billion: 9,
                        trillion: 12
                    };
                if (u.zeroFormat && e === u.zeroFormat) i = 0;
                else if (u.nullFormat && e === u.nullFormat || !e.replace(/[^0-9]+/g, "").length) i = null;
                else {
                    for (t in i = 1, "." !== r.delimiters.decimal && (e = e.replace(/\./g, "").replace(r.delimiters.decimal, ".")), a)
                        if (s = new RegExp("[^a-zA-Z]" + r.abbreviations[t] + "(?:\\)|(\\" + r.currency.symbol + ")?(?:\\))?)?$"), n.match(s)) {
                            i *= Math.pow(10, a[t]);
                            break
                        }
                    i *= (e.split("-").length + Math.min(e.split("(").length - 1, e.split(")").length - 1)) % 2 ? 1 : -1, e = e.replace(/[^0-9\.]+/g, ""), i *= Number(e)
                }
                return i
            },
            isNaN: function(e) {
                return "number" == typeof e && isNaN(e)
            },
            includes: function(e, t) {
                return -1 !== e.indexOf(t)
            },
            insert: function(e, t, i) {
                return e.slice(0, i) + t + e.slice(i)
            },
            reduce: function(e, t) {
                if (null === this) throw new TypeError("Array.prototype.reduce called on null or undefined");
                if ("function" != typeof t) throw new TypeError(t + " is not a function");
                var i, s = Object(e),
                    r = s.length >>> 0,
                    n = 0;
                if (3 === arguments.length) i = arguments[2];
                else {
                    for (; n < r && !(n in s);) n++;
                    if (n >= r) throw new TypeError("Reduce of empty array with no initial value");
                    i = s[n++]
                }
                for (; n < r; n++) n in s && (i = t(i, s[n], n, s));
                return i
            },
            multiplier: function(e) {
                var t = e.toString().split(".");
                return t.length < 2 ? 1 : Math.pow(10, t[1].length)
            },
            correctionFactor: function() {
                return Array.prototype.slice.call(arguments).reduce(function(e, t) {
                    var s = i.multiplier(t);
                    return e > s ? e : s
                }, 1)
            },
            toFixed: function(e, t, i, s) {
                var r, n, a, o, l = e.toString().split("."),
                    c = t - (s || 0);
                return r = 2 === l.length ? Math.min(Math.max(l[1].length, c), t) : c, a = Math.pow(10, r), o = (i(e + "e+" + r) / a).toFixed(r), s > t - r && (n = new RegExp("\\.?0{1," + (s - (t - r)) + "}$"), o = o.replace(n, "")), o
            }
        }, t.options = u, t.formats = o, t.locales = l, t.locale = function(e) {
            return e && (u.currentLocale = e.toLowerCase()), u.currentLocale
        }, t.localeData = function(e) {
            if (!e) return l[u.currentLocale];
            if (e = e.toLowerCase(), !l[e]) throw new Error("Unknown locale : " + e);
            return l[e]
        }, t.reset = function() {
            for (var e in c) u[e] = c[e]
        }, t.zeroFormat = function(e) {
            u.zeroFormat = "string" == typeof e ? e : null
        }, t.nullFormat = function(e) {
            u.nullFormat = "string" == typeof e ? e : null
        }, t.defaultFormat = function(e) {
            u.defaultFormat = "string" == typeof e ? e : "0.0"
        }, t.register = function(e, t, i) {
            if (t = t.toLowerCase(), this[e + "s"][t]) throw new TypeError(t + " " + e + " already registered.");
            return this[e + "s"][t] = i, i
        }, t.validate = function(e, i) {
            var s, r, n, a, o, l, c, u;
            if ("string" != typeof e && (e += "", console.warn && console.warn("Numeral.js: Value is not string. It has been co-erced to: ", e)), (e = e.trim()).match(/^\d+$/)) return !0;
            if ("" === e) return !1;
            try {
                c = t.localeData(i)
            } catch (e) {
                c = t.localeData(t.locale())
            }
            return n = c.currency.symbol, o = c.abbreviations, s = c.delimiters.decimal, r = "." === c.delimiters.thousands ? "\\." : c.delimiters.thousands, (null === (u = e.match(/^[^\d]+/)) || (e = e.substr(1), u[0] === n)) && ((null === (u = e.match(/[^\d]+$/)) || (e = e.slice(0, -1), u[0] === o.thousand || u[0] === o.million || u[0] === o.billion || u[0] === o.trillion)) && (l = new RegExp(r + "{2}"), !e.match(/[^\d.,]/g) && (!((a = e.split(s)).length > 2) && (a.length < 2 ? !!a[0].match(/^\d+.*\d$/) && !a[0].match(l) : 1 === a[0].length ? !!a[0].match(/^\d+$/) && !a[0].match(l) && !!a[1].match(/^\d+$/) : !!a[0].match(/^\d+.*\d$/) && !a[0].match(l) && !!a[1].match(/^\d+$/)))))
        }, t.fn = e.prototype = {
            clone: function() {
                return t(this)
            },
            format: function(e, i) {
                var s, r, n, a = this._value,
                    l = e || u.defaultFormat;
                if (i = i || Math.round, 0 === a && null !== u.zeroFormat) r = u.zeroFormat;
                else if (null === a && null !== u.nullFormat) r = u.nullFormat;
                else {
                    for (s in o)
                        if (l.match(o[s].regexps.format)) {
                            n = o[s].format;
                            break
                        }
                    r = (n = n || t._.numberToFormat)(a, l, i)
                }
                return r
            },
            value: function() {
                return this._value
            },
            input: function() {
                return this._input
            },
            set: function(e) {
                return this._value = Number(e), this
            },
            add: function(e) {
                function t(e, t) {
                    return e + Math.round(s * t)
                }
                var s = i.correctionFactor.call(null, this._value, e);
                return this._value = i.reduce([this._value, e], t, 0) / s, this
            },
            subtract: function(e) {
                function t(e, t) {
                    return e - Math.round(s * t)
                }
                var s = i.correctionFactor.call(null, this._value, e);
                return this._value = i.reduce([e], t, Math.round(this._value * s)) / s, this
            },
            multiply: function(e) {
                function t(e, t) {
                    var s = i.correctionFactor(e, t);
                    return Math.round(e * s) * Math.round(t * s) / Math.round(s * s)
                }
                return this._value = i.reduce([this._value, e], t, 1), this
            },
            divide: function(e) {
                function t(e, t) {
                    var s = i.correctionFactor(e, t);
                    return Math.round(e * s) / Math.round(t * s)
                }
                return this._value = i.reduce([this._value, e], t), this
            },
            difference: function(e) {
                return Math.abs(t(this._value).subtract(e).value())
            }
        }, t.register("locale", "en", {
            delimiters: {
                thousands: ",",
                decimal: "."
            },
            abbreviations: {
                thousand: "k",
                million: "m",
                billion: "b",
                trillion: "t"
            },
            ordinal: function(e) {
                var t = e % 10;
                return 1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th"
            },
            currency: {
                symbol: "$"
            }
        }), t.register("format", "bps", {
            regexps: {
                format: /(BPS)/,
                unformat: /(BPS)/
            },
            format: function(e, i, s) {
                var r, n = t._.includes(i, " BPS") ? " " : "";
                return e *= 1e4, i = i.replace(/\s?BPS/, ""), r = t._.numberToFormat(e, i, s), t._.includes(r, ")") ? ((r = r.split("")).splice(-1, 0, n + "BPS"), r = r.join("")) : r = r + n + "BPS", r
            },
            unformat: function(e) {
                return +(1e-4 * t._.stringToNumber(e)).toFixed(15)
            }
        }), r = {
            base: 1024,
            suffixes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
        }, n = "(" + (n = (s = {
            base: 1e3,
            suffixes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        }).suffixes.concat(r.suffixes.filter(function(e) {
            return s.suffixes.indexOf(e) < 0
        })).join("|")).replace("B", "B(?!PS)") + ")", t.register("format", "bytes", {
            regexps: {
                format: /([0\s]i?b)/,
                unformat: new RegExp(n)
            },
            format: function(e, i, n) {
                var a, o, l, c = t._.includes(i, "ib") ? r : s,
                    u = t._.includes(i, " b") || t._.includes(i, " ib") ? " " : "";
                for (i = i.replace(/\s?i?b/, ""), a = 0; a <= c.suffixes.length; a++)
                    if (o = Math.pow(c.base, a), l = Math.pow(c.base, a + 1), null === e || 0 === e || e >= o && e < l) {
                        u += c.suffixes[a], o > 0 && (e /= o);
                        break
                    }
                return t._.numberToFormat(e, i, n) + u
            },
            unformat: function(e) {
                var i, n, a = t._.stringToNumber(e);
                if (a) {
                    for (i = s.suffixes.length - 1; i >= 0; i--) {
                        if (t._.includes(e, s.suffixes[i])) {
                            n = Math.pow(s.base, i);
                            break
                        }
                        if (t._.includes(e, r.suffixes[i])) {
                            n = Math.pow(r.base, i);
                            break
                        }
                    }
                    a *= n || 1
                }
                return a
            }
        }), t.register("format", "currency", {
            regexps: {
                format: /(\$)/
            },
            format: function(e, i, s) {
                var r, n, a = t.locales[t.options.currentLocale],
                    o = {
                        before: i.match(/^([\+|\-|\(|\s|\$]*)/)[0],
                        after: i.match(/([\+|\-|\)|\s|\$]*)$/)[0]
                    };
                for (i = i.replace(/\s?\$\s?/, ""), r = t._.numberToFormat(e, i, s), e >= 0 ? (o.before = o.before.replace(/[\-\(]/, ""), o.after = o.after.replace(/[\-\)]/, "")) : e < 0 && !t._.includes(o.before, "-") && !t._.includes(o.before, "(") && (o.before = "-" + o.before), n = 0; n < o.before.length; n++) switch (o.before[n]) {
                    case "$":
                        r = t._.insert(r, a.currency.symbol, n);
                        break;
                    case " ":
                        r = t._.insert(r, " ", n + a.currency.symbol.length - 1)
                }
                for (n = o.after.length - 1; n >= 0; n--) switch (o.after[n]) {
                    case "$":
                        r = n === o.after.length - 1 ? r + a.currency.symbol : t._.insert(r, a.currency.symbol, -(o.after.length - (1 + n)));
                        break;
                    case " ":
                        r = n === o.after.length - 1 ? r + " " : t._.insert(r, " ", -(o.after.length - (1 + n) + a.currency.symbol.length - 1))
                }
                return r
            }
        }), t.register("format", "exponential", {
            regexps: {
                format: /(e\+|e-)/,
                unformat: /(e\+|e-)/
            },
            format: function(e, i, s) {
                var r = ("number" != typeof e || t._.isNaN(e) ? "0e+0" : e.toExponential()).split("e");
                return i = i.replace(/e[\+|\-]{1}0/, ""), t._.numberToFormat(Number(r[0]), i, s) + "e" + r[1]
            },
            unformat: function(e) {
                function i(e, i) {
                    var s = t._.correctionFactor(e, i);
                    return e * s * (i * s) / (s * s)
                }
                var s = t._.includes(e, "e+") ? e.split("e+") : e.split("e-"),
                    r = Number(s[0]),
                    n = Number(s[1]);
                return n = t._.includes(e, "e-") ? n *= -1 : n, t._.reduce([r, Math.pow(10, n)], i, 1)
            }
        }), t.register("format", "ordinal", {
            regexps: {
                format: /(o)/
            },
            format: function(e, i, s) {
                var r = t.locales[t.options.currentLocale],
                    n = t._.includes(i, " o") ? " " : "";
                return i = i.replace(/\s?o/, ""), n += r.ordinal(e), t._.numberToFormat(e, i, s) + n
            }
        }), t.register("format", "percentage", {
            regexps: {
                format: /(%)/,
                unformat: /(%)/
            },
            format: function(e, i, s) {
                var r, n = t._.includes(i, " %") ? " " : "";
                return t.options.scalePercentBy100 && (e *= 100), i = i.replace(/\s?\%/, ""), r = t._.numberToFormat(e, i, s), t._.includes(r, ")") ? ((r = r.split("")).splice(-1, 0, n + "%"), r = r.join("")) : r = r + n + "%", r
            },
            unformat: function(e) {
                var i = t._.stringToNumber(e);
                return t.options.scalePercentBy100 ? .01 * i : i
            }
        }), t.register("format", "time", {
            regexps: {
                format: /(:)/,
                unformat: /(:)/
            },
            format: function(e) {
                var t = Math.floor(e / 60 / 60),
                    i = Math.floor((e - 60 * t * 60) / 60),
                    s = Math.round(e - 60 * t * 60 - 60 * i);
                return t + ":" + (i < 10 ? "0" + i : i) + ":" + (s < 10 ? "0" + s : s)
            },
            unformat: function(e) {
                var t = e.split(":"),
                    i = 0;
                return 3 === t.length ? (i += 60 * Number(t[0]) * 60, i += 60 * Number(t[1]), i += Number(t[2])) : 2 === t.length && (i += 60 * Number(t[0]), i += Number(t[1])), Number(i)
            }
        }), t
    }), Views.PurchaseForm = class {
        constructor(e) {
            this.redirectConditionMet = Market.Helpers.detectRedirect.check({
                mobile: !0
            }), this.dom = {
                $form: e,
                $addToCart: e.find(".js-purchase__add-to-cart"),
                $buyNow: e.find(".js-purchase__buy-now"),
                $breadcrumbCategory: $(".js-breadcrumb-category"),
                $itemSidebarMetaAttributes: $(".js-item-sidebar-meta-attributes"),
                $analyticsClickPayload: e.data("analyticsClickPayload"),
                $quantityInput: e.find('input[name="quantity"]')
            }, this.dom.$form.on({
                "ajax:beforeSend": this.handleBeforeSend.bind(this),
                "ajax:success": this.handleSuccess.bind(this),
                "ajax:error": this.handleError.bind(this)
            }), $(document).on("item:variantChange", this.handleItemVariantChange.bind(this)), $(document).on("modal:beforeCloseInstance", this.addCloseModalAttributes.bind(this)), this.dom.$addToCart.on("click", this.handleAddToCart.bind(this)), this.dom.$buyNow.on("click", this.handleBuyNow.bind(this)), this.dom.$breadcrumbCategory.on("click", this.handleBreadcrumbCategory.bind(this)), this.dom.$itemSidebarMetaAttributes.on("click", this.handleItemSidebarMetaAttributes.bind(this))
        }
        handleItemVariantChange(e, t) {
            this._updateAnalyticsClickPayload(t)
        }
        handleAddToCart() {
            return this.submit = !1, this.databaseReadOnly = !1, $.ajax({
                url: "/_healthcheck/database",
                async: !1
            }).then(e => {
                "read-only" === e.write.value && (this.databaseReadOnly = !0)
            }), this.databaseReadOnly ? (alert("This functionality is disabled while maintenance is being performed. Try submitting again in a few minutes."), !1) : (Market.CartAnalytics.sendCartQuantityChangeEvent({
                analyticsClickPayload: this.dom.$analyticsClickPayload,
                quantityDifference: this._getCurrentQuantity()
            }), this.redirectConditionMet ? this.submit = !0 : this._submitWithAjax(this.dom.$addToCart), this.submit)
        }
        handleBuyNow() {
            return this.submit = !1, this.databaseReadOnly = !1, $.ajax({
                url: "/_healthcheck/database",
                async: !1
            }).then(e => {
                "read-only" === e.write.value && (this.databaseReadOnly = !0)
            }), this.databaseReadOnly ? (alert("This functionality is disabled while maintenance is being performed. Try submitting again in a few minutes."), !1) : (this.submit = !0, this.submit)
        }
        handleBreadcrumbCategory(e) {
            e.preventDefault(), window.location.href = $(e.target).prop("href")
        }
        handleItemSidebarMetaAttributes(e) {
            e.preventDefault(), window.location.href = $(e.target).prop("href")
        }
        handleBeforeSend() {
            Market.DOMUtils.getModalInstance().init()
        }
        handleError() {
            Market.DOMUtils.getModalInstance().error()
        }
        handleSuccess(e, t) {
            null != t.cart_count && $(document).trigger("uiCartUpdateRequest", t);
            const i = null != t.html ? t.html : t;
            Market.DOMUtils.getModalInstance().show(i, !1)
        }
        addCloseModalAttributes() {
            const e = document.querySelector(".js-added-confirmation-modal");
            e && (e.parentElement.setAttribute("data-analytics-click-label", "close"), e.parentElement.setAttribute("data-analytics-context", "add to cart modal"))
        }
        _submitWithAjax(e) {
            this.dom.$form.data("ujs:submit-button", {
                name: e.attr("name"),
                value: e.val()
            }), $.rails.handleRemote(this.dom.$form)
        }
        _updateAnalyticsClickPayload(e) {
            const t = numeral(e.price).value(),
                i = numeral(t).format("0.00");
            $.extend(this.dom.$analyticsClickPayload.ecommerce, {
                value: i
            }), $.extend(this.dom.$analyticsClickPayload.ecommerce.items[0], {
                price: i
            })
        }
        _getCurrentQuantity() {
            return parseInt(this.dom.$quantityInput.val(), 10) || 1
        }
    }, Views.SelectToggleText = class {
        constructor(e) {
            this.dom = {
                $toggleInitiator: e.find(".js-select-toggle__initiator"),
                $toggleElement: e.find(".js-select-toggle__element")
            }, this.useDictionary = !!e.data("dictionary"), this.useDictionary && (this.dictionary = e.data("dictionary"));
            const t = (e.data("radioToggle") ? this.handleRadioInitiatorChange : this.handleInitiatorChange).bind(this);
            this.dom.$toggleInitiator.on("change.handleInitiatorChange", t), t()
        }
        handleRadioInitiatorChange() {
            const e = $(".js-select-toggle__initiator:checked").data("toggleAction");
            e ? this.dom.$toggleElement.show().html(e) : this.dom.$toggleElement.hide()
        }
        handleInitiatorChange() {
            const e = $("option:selected", this.dom.$toggleInitiator).data("toggleAction"),
                t = this.useDictionary ? this.dictionary[e] : e;
            this.dom.$toggleElement.html(t)
        }
    }, Views.TieredSelect = class {
        constructor(e) {
            this.$el = e, this.dom = {
                $inputEl: this.$el,
                $form: this.$el.closest("form")
            }, this.$selectEl = $("<select>").attr({
                name: this.$el.attr("name")
            }), this.selectAttributes = this.$el.data("tieredSelectAttributes"), this.selectAttributes && this.$selectEl.attr(this.selectAttributes), this.options = this.$el.data("tieredSelectOptions"), this.$parentEl = $(this.$el.data("tieredSelectParent"), this.$el.closest("form")).on("change.tieredSelect", () => this.updateOptions()), this.updateOptions()
        }
        updateOptions() {
            const e = this.$el.val(),
                t = this.$parentEl.val();
            t in this.options ? (this.$el !== this.$selectEl && (this.$el.replaceWith(this.$selectEl), this.$el = this.$selectEl), this.$selectEl.html(this.options[t]).val(e), this.dom.$form.trigger("tieredSelectChange", !0)) : this.$el !== this.dom.$inputEl && (this.$el.replaceWith(this.dom.$inputEl), this.$el = this.dom.$inputEl, this.$el.val(e), this.dom.$form.trigger("tieredSelectChange", !1))
        }
    }, Views.WaveformPlayer = class {
        constructor(e) {
            if (this.delayedAutoPlay = this.delayedAutoPlay.bind(this), this.keyboardEvent = this.keyboardEvent.bind(this), this.audioProgress = this.audioProgress.bind(this), this.checkIfOnScreenYet = this.checkIfOnScreenYet.bind(this), this.$el = e, this.cannotPlayMP3()) return void this.displayError("Your browser does not support our audio player. Please try again with a browser that supports HTML5 Audio.");
            this.fileUrl = this.$el.data("file"), this.waveformUrl = this.$el.data("waveform"), this.autoPlay = null != this.$el.data("autoplay"), this.preload = null != this.$el.data("preload"), this.loop = null != this.$el.data("loop") && !this.userPreferenceLoopDisabled();
            const t = /^http/i;
            this.fileUrl.match(t) && ($.support.cors ? (this.containerWidth = this.$el.width(), this.containerHeight = this.$el.height(), this.isDragging = !1, this.firstPlayed = !1, this.toggleButtonTimeout = null, this.scrollCheckTimeout = null, this.fileLoaded = !1, this.expectedSeekOffset = null, this.createPlayerElements(), this.connectToExistingElements(), this.setLoopButton(), this.loadVolumePreference(), this.$el.attr("unselectable", "on").on("selectstart", !1), this.$el.on({
                mousedown: this.startDragging.bind(this),
                mouseup: this.stopDragging.bind(this),
                mouseleave: this.cancelDragging.bind(this),
                mousemove: this.dragWaveform.bind(this)
            }), this.dom.$playTimeLabel.add(this.dom.$loadingIcon).on("mousemove", e => e.preventDefault()), this.dom.$loadingIcon.css("pointer-events", "none"), this.dom.$audioPlayer.on({
                canplay: this.audioFileLoaded.bind(this),
                play: this.audioPlaying.bind(this),
                pause: this.audioPaused.bind(this),
                progress: this.audioLoading.bind(this),
                error: this.handleError.bind(this)
            }), $(window).resize(_.debounce(() => {
                const e = this.$el.width();
                this.containerWidth !== e && (this.containerWidth = e, this.$el.find("canvas").css("width", this.containerWidth))
            }, 100)), window.requestAnimationFrame || this.dom.$audioPlayer.on("timeupdate", this.audioProgress), this.dom.$toggleButton.on("click", this.togglePlay.bind(this)), this.dom.$loopButton.on("click", this.toggleLoop.bind(this)), this.dom.$volumeSlider.on("change input", this.adjustVolume.bind(this)), $(document).on("WaveformPlayer:startPlay", this.stopPlayingForOthers.bind(this)), this.isOnScreen() ? this.fetchWaveform() : this.fetchWaveformLater()) : this.noCorsSupport())
        }
        createPlayerElements() {
            const e = {
                src: this.fileUrl,
                preload: this.preload ? "auto" : "none"
            };
            this.loop && (e.loop = "loop"), this.dom = {
                $backgroundCanvas: $("<canvas>", {
                    class: "waveform-player__background-canvas",
                    width: this.containerWidth,
                    height: this.containerHeight
                }),
                $loadedContainer: $("<div>", {
                    class: "waveform-player__loaded-container"
                }),
                $loadedCanvas: $("<canvas>", {
                    class: "waveform-player__loaded-canvas",
                    width: this.containerWidth,
                    height: this.containerHeight
                }),
                $progressContainer: $("<div>", {
                    class: "waveform-player__progress-container"
                }),
                $progressCanvas: $("<canvas>", {
                    class: "waveform-player__progress-canvas",
                    width: this.containerWidth,
                    height: this.containerHeight
                }),
                $audioPlayer: $("<audio>", e),
                $playTimeLabelContainer: $("<div>", {
                    class: "waveform-player__time-label-container"
                }),
                $playTimeLabel: $("<div>", {
                    class: "waveform-player__time-label"
                }).html("0:00")
            }, this.dom.$backgroundCanvas.appendTo(this.$el), this.dom.$loadedContainer.appendTo(this.$el), this.dom.$loadedCanvas.appendTo(this.dom.$loadedContainer), this.dom.$progressContainer.appendTo(this.$el), this.dom.$progressCanvas.appendTo(this.dom.$progressContainer), this.dom.$audioPlayer.appendTo(this.$el), this.dom.$playTimeLabelContainer.appendTo(this.$el), this.dom.$playTimeLabel.appendTo(this.dom.$playTimeLabelContainer), this.audioPlayer = this.dom.$audioPlayer[0]
        }
        connectToExistingElements() {
            this.dom.$toggleButton = $("#" + this.$el.data("toggleButton")), this.dom.$toggleButtonIcon = this.dom.$toggleButton.find(".js-waveform-player__toggle-icon"), this.dom.$loadingIcon = this.$el.find(".js-waveform-player-loading-icon"), this.dom.$loopButton = $("#" + this.$el.data("loopButton")), this.dom.$resultContainer = $("#" + this.$el.data("resultContainer")), this.dom.$volumeSlider = $("#" + this.$el.data("volumeSlider")), this.dom.$mutedIcon = $("#" + this.$el.data("volumeSliderMute")), this.dom.$notMutedIcon = $("#" + this.$el.data("volumeSliderNotMute"))
        }
        userPreferenceLoopDisabled() {
            return Modernizr.localstorage && "false" === localStorage.getItem("waveform-player-loop-preference")
        }
        audioFileLoaded() {
            this.fileLoaded = !0;
            const e = this.doAutoPlay();
            e && e.then(() => {
                this.expectedSeekOffset && (this.audioPlayer.currentTime = this.audioPlayer.duration * this.expectedSeekOffset / this.containerWidth, this.expectedSeekOffset = null), this.audioLoading()
            })
        }
        doAutoPlay() {
            if (this.autoPlay && this.audioPlayer.paused) {
                if (!document.hidden) return this.play();
                $(window).focus(this.delayedAutoPlay)
            }
        }
        delayedAutoPlay() {
            $(window).off("focus", this.delayedAutoPlay), this.play()
        }
        audioLoading() {
            if (this.audioPlayer.buffered.length > 0 && this.audioPlayer.duration) {
                const e = Math.min(this.audioPlayer.buffered.end(this.audioPlayer.buffered.length - 1) / this.audioPlayer.duration * 100, 100);
                this.dom.$loadedContainer.animate({
                    width: e + "%"
                }, 500)
            }
        }
        audioPlaying() {
            window.requestAnimationFrame && window.requestAnimationFrame(this.audioProgress), this.firstPlayed || (this.firstPlayed = !0, this.dom.$progressContainer.add(this.dom.$playTimeLabel).animate({
                opacity: 1
            }, 1e3))
        }
        audioPaused() {
            this.updateToggleButton("play")
        }
        stopPlayingForOthers(e, t) {
            t.element !== this.$el[0] && (this.pause(), $(window).off("keydown", this.keyboardEvent), this.setContainerStatus(""))
        }
        startDragging(e) {
            this.fileLoaded && (this.pause(), this.isDragging = !0, this.dragWaveform(e))
        }
        cancelDragging() {
            this.isDragging && this.fileLoaded && (this.redrawProgress(this.audioPlayer.currentTime / this.audioPlayer.duration, this.audioPlayer.currentTime), this.isDragging = !1)
        }
        stopDragging(e) {
            this.fileLoaded ? (this.isDragging = !1, this.audioPlayer.currentTime = this.audioPlayer.duration * this.getOffsetX(e) / this.containerWidth, this.updateToggleButton("loading"), this.audioPlayer.paused && this.play()) : (this.expectedSeekOffset = this.getOffsetX(e), this.play())
        }
        dragWaveform(e) {
            if (this.isDragging && this.fileLoaded) {
                const t = this.getOffsetX(e) / this.containerWidth,
                    i = this.audioPlayer.duration * t;
                this.redrawProgress(t, i)
            }
        }
        keyboardEvent(e) {
            if (document.activeElement === document.getElementsByTagName("body")[0] || document.activeElement === this.dom.$toggleButton[0]) switch (e.which) {
                case 32:
                    e.preventDefault(), this.togglePlay();
                    break;
                case 37:
                    this.audioPlayer.currentTime = Math.max(this.audioPlayer.currentTime - this.audioPlayer.duration / 10, 0), this.audioPlayer.paused && this.play();
                    break;
                case 39:
                    {
                        const e = this.audioPlayer.currentTime + this.audioPlayer.duration / 10;this.audioPlayer.currentTime = e <= this.audioPlayer.duration ? e : 0,
                        this.audioPlayer.paused && this.play();
                        break
                    }
            }
        }
        isOnScreen() {
            const e = $(window).scrollTop(),
                t = e + $(window).height();
            return null == this.elementTop && (this.elementTop = this.$el.offset().top), null == this.elementBottom && (this.elementBottom = this.elementTop + this.$el.outerHeight()), this.elementTop <= t && this.elementBottom >= e
        }
        getOffsetX(e) {
            return null != e.offsetX ? e.offsetX : e.originalEvent.layerX
        }
        play() {
            const e = this.audioPlayer.play();
            return e && e.then(() => {
                $(document).trigger("WaveformPlayer:startPlay", {
                    element: this.$el[0]
                }), $(window).off("keydown", this.keyboardEvent), $(window).keydown(this.keyboardEvent), this.setContainerStatus("active")
            }).catch(e => {
                if ("NotAllowedError" !== e.name) throw e
            })
        }
        pause() {
            this.audioPlayer.pause()
        }
        adjustVolume(e) {
            e && e.preventDefault();
            const t = this.dom.$volumeSlider.prop("value");
            this.setVolume(t), Modernizr.localstorage && localStorage.setItem("waveform-player-volume-preference", t)
        }
        setVolume(e) {
            this.audioPlayer.volume = e, this.updateVolumeIcon(e)
        }
        updateVolumeIcon(e) {
            "0" === e ? (this.dom.$mutedIcon.removeClass("is-hidden"), this.dom.$notMutedIcon.addClass("is-hidden")) : (this.dom.$mutedIcon.addClass("is-hidden"), this.dom.$notMutedIcon.removeClass("is-hidden"))
        }
        loadVolumePreference() {
            if (Modernizr.localstorage && this.dom.$volumeSlider.length) {
                const e = localStorage.getItem("waveform-player-volume-preference");
                null != e && (this.dom.$volumeSlider.prop("value", e), this.setVolume(e))
            }
        }
        togglePlay(e) {
            e && e.preventDefault(), this.audioPlayer.paused ? this.play() : this.pause()
        }
        toggleLoop(e) {
            e && e.preventDefault(), this.loop = !this.loop, this.loop ? this.dom.$audioPlayer.attr("loop", "loop") : this.dom.$audioPlayer.removeAttr("loop"), Modernizr.localstorage && localStorage.setItem("waveform-player-loop-preference", this.loop), this.setLoopButton()
        }
        setLoopButton() {
            this.loop ? this.dom.$loopButton.addClass("-color-primary") : this.dom.$loopButton.removeClass("-color-primary")
        }
        updateToggleButton(e) {
            e !== this.desiredToggleButtonStatus && (this.desiredToggleButtonStatus = e, clearTimeout(this.toggleButtonTimeout), e !== this.currentToggleButtonStatus && (this.toggleButtonTimeout = setTimeout(this.updateToggleButtonCallback.bind(this), 100)))
        }
        updateToggleButtonCallback() {
            this.currentToggleButtonStatus = this.desiredToggleButtonStatus, this.dom.$toggleButtonIcon.attr("data-status", this.currentToggleButtonStatus).find("span").text(this.currentToggleButtonStatus), this.dom.$playTimeLabel.attr("data-status", this.currentToggleButtonStatus)
        }
        setContainerStatus(e) {
            this.dom.$resultContainer && this.dom.$resultContainer.attr("data-status", e)
        }
        audioProgress() {
            this.audioPlayer.paused || (this.redrawProgress(this.audioPlayer.currentTime / this.audioPlayer.duration, this.audioPlayer.currentTime), this.audioPlayer.seeking || this.audioPlayer.readyState < 3 ? this.updateToggleButton("loading") : this.updateToggleButton("pause"), window.requestAnimationFrame && window.requestAnimationFrame(this.audioProgress))
        }
        redrawProgress(e, t) {
            const i = 100 * e;
            this.dom.$progressContainer.add(this.dom.$playTimeLabelContainer).css("width", i + "%"), this.dom.$playTimeLabel.text(this.prettyTime(t))
        }
        prettyTime(e) {
            e = Math.floor(e);
            const t = Math.floor(e / 60);
            return (e -= 60 * t) < 10 && (e = `0${e}`), `${t}:${e}`
        }
        fetchWaveform() {
            this.waveformUrl && $.ajax({
                url: this.waveformUrl,
                success: this.waveformReceived.bind(this)
            })
        }
        fetchWaveformLater() {
            $(window).scroll(this.checkIfOnScreenYet)
        }
        checkIfOnScreenYet() {
            this.scrollCheckTimeout || (this.scrollCheckTimeout = setTimeout(this.checkIfOnScreenYetCallback.bind(this), 500))
        }
        checkIfOnScreenYetCallback() {
            this.scrollCheckTimeout && (clearTimeout(this.scrollCheckTimeout), this.scrollCheckTimeout = null, this.isOnScreen() && ($(window).off("scroll", this.checkIfOnScreenYet), this.fetchWaveform()))
        }
        waveformReceived(e) {
            const t = this.generateForm(e);
            this.drawWaveform(this.dom.$backgroundCanvas, t, "#aaa"), this.drawWaveform(this.dom.$progressCanvas, t, "#7aa93c"), this.drawWaveform(this.dom.$loadedCanvas, t, "#7e7e7e"), this.dom.$loadingIcon.remove()
        }
        generateForm(e) {
            const t = {
                max: 1,
                samples: []
            };
            for (let i = 0; i < e.length; i++) {
                const s = e.data[2 * i + 1] - e.data[2 * i];
                t.samples.push(s), t.max = Math.max(t.max, s)
            }
            return t
        }
        drawWaveform(e, t, i) {
            const s = e[0],
                r = s.getContext("2d"),
                n = t.samples.length;
            s.width = n, s.height = this.containerHeight, r.clearRect(0, 0, n, this.containerHeight);
            const a = this.containerHeight / 2,
                o = a / t.max;
            r.lineWidth = .1, r.beginPath(), r.moveTo(0, a), r.lineTo(n, a), r.stroke(), r.fillStyle = i, r.beginPath(), r.moveTo(0, a);
            for (let e = 0; e < t.samples.length; e++) r.lineTo(e, a - t.samples[e] * o);
            r.lineTo(n, a), r.closePath(), r.fill(), r.beginPath(), r.moveTo(0, a);
            for (let e = 0; e < t.samples.length; e++) r.lineTo(e, a + t.samples[e] * o);
            r.lineTo(n, a), r.closePath(), r.fill(), e.css("width", this.containerWidth).animate({
                opacity: 1
            }, 1e3)
        }
        cannotPlayMP3() {
            const e = document.createElement("audio");
            return !(e.canPlayType && e.canPlayType("audio/mpeg;").replace(/no/, ""))
        }
        noCorsSupport() {
            const e = {
                src: this.fileUrl,
                controls: !0
            };
            this.removeExternalElements(), $audioPlayer.html($("<audio>", e))
        }
        handleError(e) {
            this.displayError()
        }
        displayError(e) {
            e = e || "The audio player could not be loaded. Please try again later.", this.removeExternalElements(), this.dom.$loadingIcon.remove(), this.$el.prepend($('<span class="t-body -size-s"></span>').html(e))
        }
        removeExternalElements() {
            $("#" + this.$el.data("toggleButton")).remove(), $("#" + this.$el.data("loopButton")).remove()
        }
    }, Views.EditItemVariantForm = class {
        static DEFAULTS = {
            MIN_QUANTITY: 1,
            MAX_QUANTITY: 100,
            DEFAULT_QUANTITY: 1
        };
        static MESSAGES = {
            LOADING: "Updating...",
            DEFAULT_BUTTON: "Update Cart",
            LICENSE_REQUIRED: "Please select a license type.",
            QUANTITY_INVALID: (e, t) => `Please enter a valid quantity between ${e} and ${t}.`
        };
        static CSS_CLASSES = {
            ORIGINAL_PRICE: "cart-variant__output-original-price",
            ACTIVE: "active"
        };
        constructor(e) {
            this.$el = e, this.MATRIX = this.$el.data("matrix"), this.DISCOUNT = this.$el.data("discount"), this.LICENSE_SUPPORT_SEPARATOR = this.$el.data("license-support-separator") || "||", this._initializeDOMElements(), this._initializeState(), this._bindEvents()
        }
        _initializeDOMElements() {
            this.dom = {
                $form: this.$el,
                $updateBtn: this.$el.find(".js-item-variant-edit__update-button"),
                $checkoutBtn: this.$el.closest(".e-modal").find(".js-item-variant-edit__checkout-button"),
                $licenseOptions: this.$el.find(".js-cart-variant__license"),
                $quantityInput: this.$el.find(".quantity-input"),
                $quantityDecrease: this.$el.find(".quantity-decrease"),
                $quantityIncrease: this.$el.find(".quantity-increase"),
                $totalPrice: this.$el.find(".js-cart-variant__output-price"),
                $license: this.$el.find(".js-cart-variant__output-license"),
                $support: this.$el.find(".js-cart-variant__output-support"),
                $error: this.$el.find(".js-cart-variant__error"),
                $discount: this.$el.find(".js-cart-variant__output-discount-price"),
                $licensePrices: this.$el.find(".js-license-price")
            };
            const e = this.$el.closest(".e-modal")[0];
            this.analyticsClickPayload = e ? JSON.parse(e.getAttribute("data-analytics-click-payload")) : null
        }
        _initializeState() {
            this.state = {
                previousQuantity: parseInt(this.$el.data("previous-quantity")) || this.constructor.DEFAULTS.DEFAULT_QUANTITY,
                initialQuantity: this._getCurrentQuantity(),
                initialLicense: this._getSelectedLicenseValue(),
                hasChanges: !1,
                isSubmitting: !1
            }
        }
        _bindEvents() {
            this.dom.$updateBtn.on("click", this.handleUpdateItemVariantForm.bind(this)), this.dom.$checkoutBtn.on("click", this.handleCheckoutSubmit.bind(this)), this._bindVariantEvents(), this._updateTotalPrice()
        }
        async handleUpdateItemVariantForm(e) {
            if (e.preventDefault(), !await this._canSubmit()) return !1;
            this._sendCartAnalyticsEvent();
            try {
                await this._submitFormData()
            } catch (e) {
                this._handleUnexpectedError(e, "handleUpdateItemVariantForm")
            }
            return !1
        }
        async handleCheckoutSubmit(e) {
            if (e.preventDefault(), !await this._canSubmit()) return !1;
            try {
                await this._submitFormData({
                    onSuccess: e => {
                        e.checkout_from_cart_path ? window.location.href = e.checkout_from_cart_path : this._showError("Unable to proceed to checkout. Please try again.")
                    }
                })
            } catch (e) {
                this._handleUnexpectedError(e, "handleCheckoutSubmit")
            }
            return !1
        }
        async _canSubmit() {
            return !(this.state.isSubmitting || !this._validateFormData()) && this._checkDatabaseAvailability()
        }
        async _checkDatabaseAvailability() {
            try {
                return "read-only" !== (await $.ajax({
                    url: "/_healthcheck/database"
                })).write.value || (this._showError("This functionality is disabled while maintenance is being performed. Try submitting again in a few minutes."), !1)
            } catch (e) {
                return this._handleUnexpectedError(e, "_checkDatabaseAvailability"), !1
            }
        }
        handleError(e) {
            Market.DOMUtils.getModalInstance().error(), window.Rollbar ? .error("Item variant form AJAX error", {
                status: e ? .status,
                statusText: e ? .statusText,
                responseText: e ? .responseText
            })
        }
        _handleUnexpectedError(e, t) {
            e && (void 0 !== e.status || void 0 !== e.statusText) || (window.Rollbar ? .error("Item variant form runtime error", {
                context: t,
                error: e
            }), Market.DOMUtils.getModalInstance().error(), this._setSubmittingState(!1))
        }
        handleSuccess(e) {
            this._triggerCartUpdate(e), this._showSuccessResponse(e)
        }
        _triggerCartUpdate(e) {
            null != e.cart_count && $(document).trigger("uiCartUpdateRequest", e)
        }
        _showSuccessResponse(e) {
            const t = null != e.html ? e.html : e;
            Market.DOMUtils.getModalInstance().show(t, !1)
        }
        _submitFormData({
            onSuccess: e
        } = {}) {
            const t = this._gatherFormData();
            return this._setSubmittingState(!0), $.ajax({
                url: this.dom.$form.attr("action"),
                method: "PUT",
                data: t,
                success: e ? t => {
                    this._triggerCartUpdate(t), e(t)
                } : this.handleSuccess.bind(this),
                error: this.handleError.bind(this),
                complete: this._handleComplete.bind(this)
            })
        }
        _setSubmittingState(e) {
            this.state.isSubmitting = e, this.dom.$checkoutBtn.prop("disabled", e), e ? (this.dom.$updateBtn.prop("disabled", !0), this._showLoading()) : (this.dom.$updateBtn.prop("disabled", !this.state.hasChanges), this._hideLoading())
        }
        _gatherFormData() {
            const e = this._getCurrentQuantity();
            return {
                license: this._getActiveLicense(),
                support: this._getActiveSupport(),
                quantity: e,
                previous_quantity: this.state.previousQuantity
            }
        }
        _sendCartAnalyticsEvent() {
            Market.CartAnalytics.sendCartQuantityChangeEvent({
                analyticsClickPayload: this.analyticsClickPayload,
                quantityDifference: this._getCurrentQuantity() - this.state.previousQuantity
            })
        }
        _getCurrentQuantity() {
            return parseInt(this.dom.$quantityInput.val() || this.constructor.DEFAULTS.DEFAULT_QUANTITY)
        }
        _bindVariantEvents() {
            this.dom.$licenseOptions.on("change", this._handleLicenseChange.bind(this)), this.dom.$quantityDecrease.on("click", this._handleQuantityDecrease.bind(this)), this.dom.$quantityIncrease.on("click", this._handleQuantityIncrease.bind(this)), this.dom.$quantityInput.on("change input", this._handleQuantityChange.bind(this))
        }
        _handleLicenseChange(e) {
            const t = e.target.value;
            this._updateLicensePricing(t), this._updateLicenseDisplay(t), this._updateTotalPrice(), this._broadcastVariantChange(), this._checkForChanges()
        }
        _handleQuantityDecrease(e) {
            e.preventDefault();
            const t = this._getCurrentQuantity(),
                i = this._getMinQuantity(),
                s = Math.max(i, t - 1);
            this._setQuantityValue(s)
        }
        _handleQuantityIncrease(e) {
            e.preventDefault();
            const t = this._getCurrentQuantity(),
                i = this._getMaxQuantity(),
                s = Math.min(i, t + 1);
            this._setQuantityValue(s)
        }
        _handleQuantityChange(e) {
            const t = parseInt(e.target.value) || this.constructor.DEFAULTS.DEFAULT_QUANTITY,
                i = this._constrainQuantity(t);
            this.dom.$quantityInput.val(i), this._updateTotalPrice(), this._broadcastVariantChange(), this._checkForChanges()
        }
        _setQuantityValue(e) {
            this.dom.$quantityInput.val(e).trigger("change")
        }
        _constrainQuantity(e) {
            const t = this._getMinQuantity(),
                i = this._getMaxQuantity();
            return Math.max(t, Math.min(i, e))
        }
        _updateLicensePricing(e) {
            const {
                licenseKey: t,
                supportKey: i
            } = this._parseSelectedValue(e);
            this.dom.$licensePrices.each((e, s) => {
                const r = $(s);
                if (r.data("license") === t) {
                    const e = this._getPriceData(t, i);
                    if (e && e.price) {
                        const t = Market.CurrencyFormatter.parsePrice(e.price);
                        r.text(Market.CurrencyFormatter.formatMarketPrice(t))
                    }
                }
            })
        }
        _updateTotalPrice() {
            const e = this._getSelectedLicenseValue(),
                t = this._getCurrentQuantity();
            if (!e) return;
            const {
                licenseKey: i,
                supportKey: s
            } = this._parseSelectedValue(e), r = this._getPriceData(i, s), n = this._getDiscountAvailability(e);
            this._setDiscountMode(n), n ? this._updateDiscountPricing(s, t) : r && r.price && this._updateRegularPricing(r.price, t)
        }
        _updateDiscountPricing(e, t) {
            const i = this._getDiscountOriginalPrice(e),
                s = Market.CurrencyFormatter.parsePrice(i) * t;
            this.dom.$totalPrice.text(Market.CurrencyFormatter.formatMarketPrice(s));
            const r = this._getDiscountPrice(e),
                n = Market.CurrencyFormatter.parsePrice(r) * t;
            this.dom.$discount.text(Market.CurrencyFormatter.formatMarketPrice(n))
        }
        _updateRegularPricing(e, t) {
            const i = Market.CurrencyFormatter.parsePrice(e) * t;
            this.dom.$totalPrice.text(Market.CurrencyFormatter.formatMarketPrice(i))
        }
        _setDiscountMode(e) {
            e ? (this.dom.$totalPrice.addClass(this.constructor.CSS_CLASSES.ORIGINAL_PRICE), this.dom.$discount.addClass(this.constructor.CSS_CLASSES.ACTIVE)) : (this.dom.$totalPrice.removeClass(this.constructor.CSS_CLASSES.ORIGINAL_PRICE), this.dom.$discount.removeClass(this.constructor.CSS_CLASSES.ACTIVE))
        }
        _getSelectedLicenseValue() {
            return this.dom.$licenseOptions.val()
        }
        _getActiveLicense() {
            const {
                licenseKey: e
            } = this._parseSelectedValue(this._getSelectedLicenseValue());
            return e
        }
        _getActiveSupport() {
            const {
                supportKey: e
            } = this._parseSelectedValue(this._getSelectedLicenseValue());
            return "none" === e ? "" : e
        }
        _parseSelectedValue(e) {
            const t = this.LICENSE_SUPPORT_SEPARATOR;
            if (!e || -1 === e.indexOf(t)) return {
                licenseKey: e,
                supportKey: null
            };
            const i = e.split(t);
            return 2 === i.length ? {
                licenseKey: i[0],
                supportKey: i[1]
            } : {
                licenseKey: e,
                supportKey: null
            }
        }
        _getPriceData(e, t) {
            const i = this.MATRIX[e];
            if (!i) return null;
            if (t && i.support && i.support[t]) {
                const e = i.support[t];
                return {
                    price: e.price,
                    license_label: i.license_label,
                    support_label: e.label
                }
            }
            return t ? null : {
                price: i.price,
                license_label: i.license_label,
                support_label: null
            }
        }
        _updateLicenseDisplay(e) {
            const {
                licenseKey: t,
                supportKey: i
            } = this._parseSelectedValue(e), s = this._getPriceData(t, i);
            s && (this.dom.$license.length && this.dom.$license.text(s.license_label || t), this.dom.$support.length && this.dom.$support.text(s.support_label || "None"))
        }
        _getDiscountAvailability(e) {
            if (!this.DISCOUNT || !this.DISCOUNT.discount_original_price) return !1;
            const {
                licenseKey: t
            } = this._parseSelectedValue(e), i = this.MATRIX[t];
            return i && i.default
        }
        _getDiscountPrice(e) {
            return this.DISCOUNT ? "bundle_12month" === e ? this.DISCOUNT.discount_upgrade_price : this.DISCOUNT.discount_price : null
        }
        _getDiscountOriginalPrice(e) {
            return this.DISCOUNT ? "bundle_12month" === e ? this.DISCOUNT.discount_upgrade_original_price : this.DISCOUNT.discount_original_price : null
        }
        _validateFormData() {
            return this._validateLicense() && this._validateQuantity()
        }
        _validateLicense() {
            return !!this._getSelectedLicenseValue() || (this._showError(this.constructor.MESSAGES.LICENSE_REQUIRED), !1)
        }
        _validateQuantity() {
            const e = parseInt(this.dom.$quantityInput.val()),
                t = this._getMinQuantity(),
                i = this._getMaxQuantity();
            return !(isNaN(e) || e < t || e > i) || (this._showError(this.constructor.MESSAGES.QUANTITY_INVALID(t, i)), !1)
        }
        _getMinQuantity() {
            return parseInt(this.dom.$quantityInput.attr("min")) || this.constructor.DEFAULTS.MIN_QUANTITY
        }
        _getMaxQuantity() {
            return parseInt(this.dom.$quantityInput.attr("max")) || this.constructor.DEFAULTS.MAX_QUANTITY
        }
        _showLoading() {
            const e = this.dom.$updateBtn.text();
            this.dom.$updateBtn.data("original-text", e), this.dom.$updateBtn.text(this.constructor.MESSAGES.LOADING), this._hideError()
        }
        _hideLoading() {
            const e = this.dom.$updateBtn.data("original-text") || this.constructor.MESSAGES.DEFAULT_BUTTON;
            this.dom.$updateBtn.text(e)
        }
        _showError(e) {
            this.dom.$error.length ? this.dom.$error.text(e).show() : this._createErrorElement(e)
        }
        _createErrorElement(e) {
            const t = $('<div class="js-cart-variant__error alert -color-danger -size-s"></div>');
            t.text(e), this.dom.$form.find(".js-cart-variant__error").append(t), this.dom.$error = t
        }
        _hideError() {
            this.dom.$error.length && this.dom.$error.hide()
        }
        _handleComplete() {
            this._setSubmittingState(!1)
        }
        _checkForChanges() {
            const e = this._getCurrentQuantity(),
                t = this._getSelectedLicenseValue(),
                i = e !== this.state.initialQuantity,
                s = t !== this.state.initialLicense;
            this.state.hasChanges = i || s, this.dom.$updateBtn.prop("disabled", !this.state.hasChanges)
        }
        _broadcastVariantChange() {
            try {
                const e = this._getSelectedLicenseValue();
                if (!e) return;
                const {
                    licenseKey: t,
                    supportKey: i
                } = this._parseSelectedValue(e), s = this._getPriceData(t, i), r = {
                    license: t,
                    price: s ? s.price : null,
                    quantity: this._getCurrentQuantity()
                };
                $(document).trigger("item:variantChange", r)
            } catch (e) {
                this._handleUnexpectedError(e, "_broadcastVariantChange")
            }
        }
    };