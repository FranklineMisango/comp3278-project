! function(t, e) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
        if (!t.document) throw new Error("jQuery requires a window with a document");
        return e(t)
    } : e(t)
}("undefined" != typeof window ? window : this, function(t, e) {
    "use strict";

    function n(t, e, n) {
        var r, o, i = (n = n || wt).createElement("script");
        if (i.text = t, e)
            for (r in _t)(o = e[r] || e.getAttribute && e.getAttribute(r)) && i.setAttribute(r, o);
        n.head.appendChild(i).parentNode.removeChild(i)
    }

    function r(t) {
        return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? ft[pt.call(t)] || "object" : typeof t
    }

    function o(t) {
        var e = !!t && "length" in t && t.length,
            n = r(t);
        return !yt(t) && !bt(t) && ("array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
    }

    function i(t, e) {
        return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
    }

    function a(t, e) {
        return e ? "\0" === t ? "\ufffd" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
    }

    function s(t, e, n) {
        return yt(e) ? kt.grep(t, function(t, r) {
            return !!e.call(t, r, t) !== n
        }) : e.nodeType ? kt.grep(t, function(t) {
            return t === e !== n
        }) : "string" != typeof e ? kt.grep(t, function(t) {
            return dt.call(e, t) > -1 !== n
        }) : kt.filter(e, t, n)
    }

    function c(t, e) {
        for (;
            (t = t[e]) && 1 !== t.nodeType;);
        return t
    }

    function u(t) {
        var e = {};
        return kt.each(t.match(Vt) || [], function(t, n) {
            e[n] = !0
        }), e
    }

    function l(t) {
        return t
    }

    function d(t) {
        throw t
    }

    function f(t, e, n, r) {
        var o;
        try {
            t && yt(o = t.promise) ? o.call(t).done(e).fail(n) : t && yt(o = t.then) ? o.call(t, e, n) : e.apply(void 0, [t].slice(r))
        } catch (t) {
            n.apply(void 0, [t])
        }
    }

    function p() {
        wt.removeEventListener("DOMContentLoaded", p), t.removeEventListener("load", p), kt.ready()
    }

    function h(t, e) {
        return e.toUpperCase()
    }

    function m(t) {
        return t.replace(Ht, "ms-").replace(Wt, h)
    }

    function g() {
        this.expando = kt.expando + g.uid++
    }

    function v(t) {
        return "true" === t || "false" !== t && ("null" === t ? null : t === +t + "" ? +t : Qt.test(t) ? JSON.parse(t) : t)
    }

    function y(t, e, n) {
        var r;
        if (void 0 === n && 1 === t.nodeType)
            if (r = "data-" + e.replace(Xt, "-$&").toLowerCase(), "string" == typeof(n = t.getAttribute(r))) {
                try {
                    n = v(n)
                } catch (t) {}
                Jt.set(t, e, n)
            } else n = void 0;
        return n
    }

    function b(t, e, n, r) {
        var o, i, a = 20,
            s = r ? function() {
                return r.cur()
            } : function() {
                return kt.css(t, e, "")
            },
            c = s(),
            u = n && n[3] || (kt.cssNumber[e] ? "" : "px"),
            l = t.nodeType && (kt.cssNumber[e] || "px" !== u && +c) && Zt.exec(kt.css(t, e));
        if (l && l[3] !== u) {
            for (c /= 2, u = u || l[3], l = +c || 1; a--;) kt.style(t, e, l + u), (1 - i) * (1 - (i = s() / c || .5)) <= 0 && (a = 0), l /= i;
            l *= 2, kt.style(t, e, l + u), n = n || []
        }
        return n && (l = +l || +c || 0, o = n[1] ? l + (n[1] + 1) * n[2] : +n[2], r && (r.unit = u, r.start = l, r.end = o)), o
    }

    function w(t) {
        var e, n = t.ownerDocument,
            r = t.nodeName,
            o = ie[r];
        return o || (e = n.body.appendChild(n.createElement(r)), o = kt.css(e, "display"), e.parentNode.removeChild(e), "none" === o && (o = "block"), ie[r] = o, o)
    }

    function _(t, e) {
        for (var n, r, o = [], i = 0, a = t.length; i < a; i++)(r = t[i]).style && (n = r.style.display, e ? ("none" === n && (o[i] = Kt.get(r, "display") || null, o[i] || (r.style.display = "")), "" === r.style.display && oe(r) && (o[i] = w(r))) : "none" !== n && (o[i] = "none", Kt.set(r, "display", n)));
        for (i = 0; i < a; i++) null != o[i] && (t[i].style.display = o[i]);
        return t
    }

    function x(t, e) {
        var n;
        return n = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : [], void 0 === e || e && i(t, e) ? kt.merge([t], n) : n
    }

    function S(t, e) {
        for (var n = 0, r = t.length; n < r; n++) Kt.set(t[n], "globalEval", !e || Kt.get(e[n], "globalEval"))
    }

    function k(t, e, n, o, i) {
        for (var a, s, c, u, l, d, f = e.createDocumentFragment(), p = [], h = 0, m = t.length; h < m; h++)
            if ((a = t[h]) || 0 === a)
                if ("object" === r(a)) kt.merge(p, a.nodeType ? [a] : a);
                else if (fe.test(a)) {
            for (s = s || f.appendChild(e.createElement("div")), c = (ue.exec(a) || ["", ""])[1].toLowerCase(), u = de[c] || de._default, s.innerHTML = u[1] + kt.htmlPrefilter(a) + u[2], d = u[0]; d--;) s = s.lastChild;
            kt.merge(p, s.childNodes), (s = f.firstChild).textContent = ""
        } else p.push(e.createTextNode(a));
        for (f.textContent = "", h = 0; a = p[h++];)
            if (o && kt.inArray(a, o) > -1) i && i.push(a);
            else if (l = ne(a), s = x(f.appendChild(a), "script"), l && S(s), n)
            for (d = 0; a = s[d++];) le.test(a.type || "") && n.push(a);
        return f
    }

    function C() {
        return !0
    }

    function T() {
        return !1
    }

    function E(t, e, n, r, o, i) {
        var a, s;
        if ("object" == typeof e) {
            for (s in "string" != typeof n && (r = r || n, n = void 0), e) E(t, s, n, r, e[s], i);
            return t
        }
        if (null == r && null == o ? (o = n, r = n = void 0) : null == o && ("string" == typeof n ? (o = r, r = void 0) : (o = r, r = n, n = void 0)), !1 === o) o = T;
        else if (!o) return t;
        return 1 === i && (a = o, o = function(t) {
            return kt().off(t), a.apply(this, arguments)
        }, o.guid = a.guid || (a.guid = kt.guid++)), t.each(function() {
            kt.event.add(this, e, o, r, n)
        })
    }

    function A(t, e, n) {
        n ? (Kt.set(t, e, !1), kt.event.add(t, e, {
            namespace: !1,
            handler: function(t) {
                var n, r = Kt.get(this, e);
                if (1 & t.isTrigger && this[e]) {
                    if (r)(kt.event.special[e] || {}).delegateType && t.stopPropagation();
                    else if (r = ct.call(arguments), Kt.set(this, e, r), this[e](), n = Kt.get(this, e), Kt.set(this, e, !1), r !== n) return t.stopImmediatePropagation(), t.preventDefault(), n
                } else r && (Kt.set(this, e, kt.event.trigger(r[0], r.slice(1), this)), t.stopPropagation(), t.isImmediatePropagationStopped = C)
            }
        })) : void 0 === Kt.get(t, e) && kt.event.add(t, e, C)
    }

    function I(t, e) {
        return i(t, "table") && i(11 !== e.nodeType ? e : e.firstChild, "tr") && kt(t).children("tbody")[0] || t
    }

    function O(t) {
        return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
    }

    function R(t) {
        return "true/" === (t.type || "").slice(0, 5) ? t.type = t.type.slice(5) : t.removeAttribute("type"), t
    }

    function M(t, e) {
        var n, r, o, i, a, s;
        if (1 === e.nodeType) {
            if (Kt.hasData(t) && (s = Kt.get(t).events))
                for (o in Kt.remove(e, "handle events"), s)
                    for (n = 0, r = s[o].length; n < r; n++) kt.event.add(e, o, s[o][n]);
            Jt.hasData(t) && (i = Jt.access(t), a = kt.extend({}, i), Jt.set(e, a))
        }
    }

    function P(t, e) {
        var n = e.nodeName.toLowerCase();
        "input" === n && ce.test(t.type) ? e.checked = t.checked : "input" !== n && "textarea" !== n || (e.defaultValue = t.defaultValue)
    }

    function N(t, e, r, o) {
        e = ut(e);
        var i, a, s, c, u, l, d = 0,
            f = t.length,
            p = f - 1,
            h = e[0],
            m = yt(h);
        if (m || f > 1 && "string" == typeof h && !vt.checkClone && me.test(h)) return t.each(function(n) {
            var i = t.eq(n);
            m && (e[0] = h.call(this, n, i.html())), N(i, e, r, o)
        });
        if (f && (a = (i = k(e, t[0].ownerDocument, !1, t, o)).firstChild, 1 === i.childNodes.length && (i = a), a || o)) {
            for (c = (s = kt.map(x(i, "script"), O)).length; d < f; d++) u = i, d !== p && (u = kt.clone(u, !0, !0), c && kt.merge(s, x(u, "script"))), r.call(t[d], u, d);
            if (c)
                for (l = s[s.length - 1].ownerDocument, kt.map(s, R), d = 0; d < c; d++) u = s[d], le.test(u.type || "") && !Kt.access(u, "globalEval") && kt.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? kt._evalUrl && !u.noModule && kt._evalUrl(u.src, {
                    nonce: u.nonce || u.getAttribute("nonce")
                }, l) : n(u.textContent.replace(ge, ""), u, l))
        }
        return t
    }

    function j(t, e, n) {
        for (var r, o = e ? kt.filter(e, t) : t, i = 0; null != (r = o[i]); i++) n || 1 !== r.nodeType || kt.cleanData(x(r)), r.parentNode && (n && ne(r) && S(x(r, "script")), r.parentNode.removeChild(r));
        return t
    }

    function D(t, e, n) {
        var r, o, i, a, s = ye.test(e),
            c = t.style;
        return (n = n || be(t)) && (a = n.getPropertyValue(e) || n[e], s && a && (a = a.replace(It, "$1") || void 0), "" !== a || ne(t) || (a = kt.style(t, e)), !vt.pixelBoxStyles() && ve.test(a) && _e.test(e) && (r = c.width, o = c.minWidth, i = c.maxWidth, c.minWidth = c.maxWidth = c.width = a, a = n.width, c.width = r, c.minWidth = o, c.maxWidth = i)), void 0 !== a ? a + "" : a
    }

    function L(t, e) {
        return {
            get: function() {
                if (!t()) return (this.get = e).apply(this, arguments);
                delete this.get
            }
        }
    }

    function $(t) {
        for (var e = t[0].toUpperCase() + t.slice(1), n = xe.length; n--;)
            if ((t = xe[n] + e) in Se) return t
    }

    function q(t) {
        var e = kt.cssProps[t] || ke[t];
        return e || (t in Se ? t : ke[t] = $(t) || t)
    }

    function U(t, e, n) {
        var r = Zt.exec(e);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : e
    }

    function V(t, e, n, r, o, i) {
        var a = "width" === e ? 1 : 0,
            s = 0,
            c = 0,
            u = 0;
        if (n === (r ? "border" : "content")) return 0;
        for (; a < 4; a += 2) "margin" === n && (u += kt.css(t, n + te[a], !0, o)), r ? ("content" === n && (c -= kt.css(t, "padding" + te[a], !0, o)), "margin" !== n && (c -= kt.css(t, "border" + te[a] + "Width", !0, o))) : (c += kt.css(t, "padding" + te[a], !0, o), "padding" !== n ? c += kt.css(t, "border" + te[a] + "Width", !0, o) : s += kt.css(t, "border" + te[a] + "Width", !0, o));
        return !r && i >= 0 && (c += Math.max(0, Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - i - c - s - .5)) || 0), c + u
    }

    function B(t, e, n) {
        var r = be(t),
            o = (!vt.boxSizingReliable() || n) && "border-box" === kt.css(t, "boxSizing", !1, r),
            a = o,
            s = D(t, e, r),
            c = "offset" + e[0].toUpperCase() + e.slice(1);
        if (ve.test(s)) {
            if (!n) return s;
            s = "auto"
        }
        return (!vt.boxSizingReliable() && o || !vt.reliableTrDimensions() && i(t, "tr") || "auto" === s || !parseFloat(s) && "inline" === kt.css(t, "display", !1, r)) && t.getClientRects().length && (o = "border-box" === kt.css(t, "boxSizing", !1, r), (a = c in t) && (s = t[c])), (s = parseFloat(s) || 0) + V(t, e, n || (o ? "border" : "content"), a, r, s) + "px"
    }

    function F(t, e, n, r, o) {
        return new F.prototype.init(t, e, n, r, o)
    }

    function z() {
        Ie && (!1 === wt.hidden && t.requestAnimationFrame ? t.requestAnimationFrame(z) : t.setTimeout(z, kt.fx.interval), kt.fx.tick())
    }

    function H() {
        return t.setTimeout(function() {
            Ae = void 0
        }), Ae = Date.now()
    }

    function W(t, e) {
        var n, r = 0,
            o = {
                height: t
            };
        for (e = e ? 1 : 0; r < 4; r += 2 - e) o["margin" + (n = te[r])] = o["padding" + n] = t;
        return e && (o.opacity = o.width = t), o
    }

    function G(t, e, n) {
        for (var r, o = (Q.tweeners[e] || []).concat(Q.tweeners["*"]), i = 0, a = o.length; i < a; i++)
            if (r = o[i].call(n, e, t)) return r
    }

    function K(t, e, n) {
        var r, o, i, a, s, c, u, l, d = "width" in e || "height" in e,
            f = this,
            p = {},
            h = t.style,
            m = t.nodeType && oe(t),
            g = Kt.get(t, "fxshow");
        for (r in n.queue || (null == (a = kt._queueHooks(t, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
                a.unqueued || s()
            }), a.unqueued++, f.always(function() {
                f.always(function() {
                    a.unqueued--, kt.queue(t, "fx").length || a.empty.fire()
                })
            })), e)
            if (o = e[r], Oe.test(o)) {
                if (delete e[r], i = i || "toggle" === o, o === (m ? "hide" : "show")) {
                    if ("show" !== o || !g || void 0 === g[r]) continue;
                    m = !0
                }
                p[r] = g && g[r] || kt.style(t, r)
            }
        if ((c = !kt.isEmptyObject(e)) || !kt.isEmptyObject(p))
            for (r in d && 1 === t.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (u = g && g.display) && (u = Kt.get(t, "display")), "none" === (l = kt.css(t, "display")) && (u ? l = u : (_([t], !0), u = t.style.display || u, l = kt.css(t, "display"), _([t]))), ("inline" === l || "inline-block" === l && null != u) && "none" === kt.css(t, "float") && (c || (f.done(function() {
                    h.display = u
                }), null == u && (l = h.display, u = "none" === l ? "" : l)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", f.always(function() {
                    h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                })), c = !1, p) c || (g ? "hidden" in g && (m = g.hidden) : g = Kt.access(t, "fxshow", {
                display: u
            }), i && (g.hidden = !m), m && _([t], !0), f.done(function() {
                for (r in m || _([t]), Kt.remove(t, "fxshow"), p) kt.style(t, r, p[r])
            })), c = G(m ? g[r] : 0, r, f), r in g || (g[r] = c.start, m && (c.end = c.start, c.start = 0))
    }

    function J(t, e) {
        var n, r, o, i, a;
        for (n in t)
            if (o = e[r = m(n)], i = t[n], Array.isArray(i) && (o = i[1], i = t[n] = i[0]), n !== r && (t[r] = i, delete t[n]), (a = kt.cssHooks[r]) && "expand" in a)
                for (n in i = a.expand(i), delete t[r], i) n in t || (t[n] = i[n], e[n] = o);
            else e[r] = o
    }

    function Q(t, e, n) {
        var r, o, i = 0,
            a = Q.prefilters.length,
            s = kt.Deferred().always(function() {
                delete c.elem
            }),
            c = function() {
                if (o) return !1;
                for (var e = Ae || H(), n = Math.max(0, u.startTime + u.duration - e), r = 1 - (n / u.duration || 0), i = 0, a = u.tweens.length; i < a; i++) u.tweens[i].run(r);
                return s.notifyWith(t, [u, r, n]), r < 1 && a ? n : (a || s.notifyWith(t, [u, 1, 0]), s.resolveWith(t, [u]), !1)
            },
            u = s.promise({
                elem: t,
                props: kt.extend({}, e),
                opts: kt.extend(!0, {
                    specialEasing: {},
                    easing: kt.easing._default
                }, n),
                originalProperties: e,
                originalOptions: n,
                startTime: Ae || H(),
                duration: n.duration,
                tweens: [],
                createTween: function(e, n) {
                    var r = kt.Tween(t, u.opts, e, n, u.opts.specialEasing[e] || u.opts.easing);
                    return u.tweens.push(r), r
                },
                stop: function(e) {
                    var n = 0,
                        r = e ? u.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; n < r; n++) u.tweens[n].run(1);
                    return e ? (s.notifyWith(t, [u, 1, 0]), s.resolveWith(t, [u, e])) : s.rejectWith(t, [u, e]), this
                }
            }),
            l = u.props;
        for (J(l, u.opts.specialEasing); i < a; i++)
            if (r = Q.prefilters[i].call(u, t, l, u.opts)) return yt(r.stop) && (kt._queueHooks(u.elem, u.opts.queue).stop = r.stop.bind(r)), r;
        return kt.map(l, G, u), yt(u.opts.start) && u.opts.start.call(t, u), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always), kt.fx.timer(kt.extend(c, {
            elem: t,
            anim: u,
            queue: u.opts.queue
        })), u
    }

    function X(t) {
        return (t.match(Vt) || []).join(" ")
    }

    function Y(t) {
        return t.getAttribute && t.getAttribute("class") || ""
    }

    function Z(t) {
        return Array.isArray(t) ? t : "string" == typeof t && t.match(Vt) || []
    }

    function tt(t, e, n, o) {
        var i;
        if (Array.isArray(e)) kt.each(e, function(e, r) {
            n || Be.test(t) ? o(t, r) : tt(t + "[" + ("object" == typeof r && null != r ? e : "") + "]", r, n, o)
        });
        else if (n || "object" !== r(e)) o(t, e);
        else
            for (i in e) tt(t + "[" + i + "]", e[i], n, o)
    }

    function et(t) {
        return function(e, n) {
            "string" != typeof e && (n = e, e = "*");
            var r, o = 0,
                i = e.toLowerCase().match(Vt) || [];
            if (yt(n))
                for (; r = i[o++];) "+" === r[0] ? (r = r.slice(1) || "*", (t[r] = t[r] || []).unshift(n)) : (t[r] = t[r] || []).push(n)
        }
    }

    function nt(t, e, n, r) {
        function o(s) {
            var c;
            return i[s] = !0, kt.each(t[s] || [], function(t, s) {
                var u = s(e, n, r);
                return "string" != typeof u || a || i[u] ? a ? !(c = u) : void 0 : (e.dataTypes.unshift(u), o(u), !1)
            }), c
        }
        var i = {},
            a = t === tn;
        return o(e.dataTypes[0]) || !i["*"] && o("*")
    }

    function rt(t, e) {
        var n, r, o = kt.ajaxSettings.flatOptions || {};
        for (n in e) void 0 !== e[n] && ((o[n] ? t : r || (r = {}))[n] = e[n]);
        return r && kt.extend(!0, t, r), t
    }

    function ot(t, e, n) {
        for (var r, o, i, a, s = t.contents, c = t.dataTypes;
            "*" === c[0];) c.shift(), void 0 === r && (r = t.mimeType || e.getResponseHeader("Content-Type"));
        if (r)
            for (o in s)
                if (s[o] && s[o].test(r)) {
                    c.unshift(o);
                    break
                }
        if (c[0] in n) i = c[0];
        else {
            for (o in n) {
                if (!c[0] || t.converters[o + " " + c[0]]) {
                    i = o;
                    break
                }
                a || (a = o)
            }
            i = i || a
        }
        if (i) return i !== c[0] && c.unshift(i), n[i]
    }

    function it(t, e, n, r) {
        var o, i, a, s, c, u = {},
            l = t.dataTypes.slice();
        if (l[1])
            for (a in t.converters) u[a.toLowerCase()] = t.converters[a];
        for (i = l.shift(); i;)
            if (t.responseFields[i] && (n[t.responseFields[i]] = e), !c && r && t.dataFilter && (e = t.dataFilter(e, t.dataType)), c = i, i = l.shift())
                if ("*" === i) i = c;
                else if ("*" !== c && c !== i) {
            if (!(a = u[c + " " + i] || u["* " + i]))
                for (o in u)
                    if ((s = o.split(" "))[1] === i && (a = u[c + " " + s[0]] || u["* " + s[0]])) {
                        !0 === a ? a = u[o] : !0 !== u[o] && (i = s[0], l.unshift(s[1]));
                        break
                    }
            if (!0 !== a)
                if (a && t.throws) e = a(e);
                else try {
                    e = a(e)
                } catch (t) {
                    return {
                        state: "parsererror",
                        error: a ? t : "No conversion from " + c + " to " + i
                    }
                }
        }
        return {
            state: "success",
            data: e
        }
    }
    var at = [],
        st = Object.getPrototypeOf,
        ct = at.slice,
        ut = at.flat ? function(t) {
            return at.flat.call(t)
        } : function(t) {
            return at.concat.apply([], t)
        },
        lt = at.push,
        dt = at.indexOf,
        ft = {},
        pt = ft.toString,
        ht = ft.hasOwnProperty,
        mt = ht.toString,
        gt = mt.call(Object),
        vt = {},
        yt = function(t) {
            return "function" == typeof t && "number" != typeof t.nodeType && "function" != typeof t.item
        },
        bt = function(t) {
            return null != t && t === t.window
        },
        wt = t.document,
        _t = {
            type: !0,
            src: !0,
            nonce: !0,
            noModule: !0
        },
        xt = "3.7.1",
        St = /HTML$/i,
        kt = function(t, e) {
            return new kt.fn.init(t, e)
        };
    kt.fn = kt.prototype = {
        jquery: xt,
        constructor: kt,
        length: 0,
        toArray: function() {
            return ct.call(this)
        },
        get: function(t) {
            return null == t ? ct.call(this) : t < 0 ? this[t + this.length] : this[t]
        },
        pushStack: function(t) {
            var e = kt.merge(this.constructor(), t);
            return e.prevObject = this, e
        },
        each: function(t) {
            return kt.each(this, t)
        },
        map: function(t) {
            return this.pushStack(kt.map(this, function(e, n) {
                return t.call(e, n, e)
            }))
        },
        slice: function() {
            return this.pushStack(ct.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        even: function() {
            return this.pushStack(kt.grep(this, function(t, e) {
                return (e + 1) % 2
            }))
        },
        odd: function() {
            return this.pushStack(kt.grep(this, function(t, e) {
                return e % 2
            }))
        },
        eq: function(t) {
            var e = this.length,
                n = +t + (t < 0 ? e : 0);
            return this.pushStack(n >= 0 && n < e ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: lt,
        sort: at.sort,
        splice: at.splice
    }, kt.extend = kt.fn.extend = function() {
        var t, e, n, r, o, i, a = arguments[0] || {},
            s = 1,
            c = arguments.length,
            u = !1;
        for ("boolean" == typeof a && (u = a, a = arguments[s] || {}, s++), "object" == typeof a || yt(a) || (a = {}), s === c && (a = this, s--); s < c; s++)
            if (null != (t = arguments[s]))
                for (e in t) r = t[e], "__proto__" !== e && a !== r && (u && r && (kt.isPlainObject(r) || (o = Array.isArray(r))) ? (n = a[e], i = o && !Array.isArray(n) ? [] : o || kt.isPlainObject(n) ? n : {}, o = !1, a[e] = kt.extend(u, i, r)) : void 0 !== r && (a[e] = r));
        return a
    }, kt.extend({
        expando: "jQuery" + (xt + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(t) {
            throw new Error(t)
        },
        noop: function() {},
        isPlainObject: function(t) {
            var e, n;
            return !(!t || "[object Object]" !== pt.call(t)) && (!(e = st(t)) || "function" == typeof(n = ht.call(e, "constructor") && e.constructor) && mt.call(n) === gt)
        },
        isEmptyObject: function(t) {
            var e;
            for (e in t) return !1;
            return !0
        },
        globalEval: function(t, e, r) {
            n(t, {
                nonce: e && e.nonce
            }, r)
        },
        each: function(t, e) {
            var n, r = 0;
            if (o(t))
                for (n = t.length; r < n && !1 !== e.call(t[r], r, t[r]); r++);
            else
                for (r in t)
                    if (!1 === e.call(t[r], r, t[r])) break;
            return t
        },
        text: function(t) {
            var e, n = "",
                r = 0,
                o = t.nodeType;
            if (!o)
                for (; e = t[r++];) n += kt.text(e);
            return 1 === o || 11 === o ? t.textContent : 9 === o ? t.documentElement.textContent : 3 === o || 4 === o ? t.nodeValue : n
        },
        makeArray: function(t, e) {
            var n = e || [];
            return null != t && (o(Object(t)) ? kt.merge(n, "string" == typeof t ? [t] : t) : lt.call(n, t)), n
        },
        inArray: function(t, e, n) {
            return null == e ? -1 : dt.call(e, t, n)
        },
        isXMLDoc: function(t) {
            var e = t && t.namespaceURI,
                n = t && (t.ownerDocument || t).documentElement;
            return !St.test(e || n && n.nodeName || "HTML")
        },
        merge: function(t, e) {
            for (var n = +e.length, r = 0, o = t.length; r < n; r++) t[o++] = e[r];
            return t.length = o, t
        },
        grep: function(t, e, n) {
            for (var r = [], o = 0, i = t.length, a = !n; o < i; o++) !e(t[o], o) !== a && r.push(t[o]);
            return r
        },
        map: function(t, e, n) {
            var r, i, a = 0,
                s = [];
            if (o(t))
                for (r = t.length; a < r; a++) null != (i = e(t[a], a, n)) && s.push(i);
            else
                for (a in t) null != (i = e(t[a], a, n)) && s.push(i);
            return ut(s)
        },
        guid: 1,
        support: vt
    }), "function" == typeof Symbol && (kt.fn[Symbol.iterator] = at[Symbol.iterator]), kt.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
        ft["[object " + e + "]"] = e.toLowerCase()
    });
    var Ct = at.pop,
        Tt = at.sort,
        Et = at.splice,
        At = "[\\x20\\t\\r\\n\\f]",
        It = new RegExp("^" + At + "+|((?:^|[^\\\\])(?:\\\\.)*)" + At + "+$", "g");
    kt.contains = function(t, e) {
        var n = e && e.parentNode;
        return t === n || !(!n || 1 !== n.nodeType || !(t.contains ? t.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
    };
    var Ot = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
    kt.escapeSelector = function(t) {
        return (t + "").replace(Ot, a)
    };
    var Rt = wt,
        Mt = lt;
    ! function() {
        function e() {
            try {
                return O.activeElement
            } catch (t) {}
        }

        function n(t, e, r, o) {
            var i, a, s, c, u, l, p, g = e && e.ownerDocument,
                v = e ? e.nodeType : 9;
            if (r = r || [], "string" != typeof t || !t || 1 !== v && 9 !== v && 11 !== v) return r;
            if (!o && (f(e), e = e || O, M)) {
                if (11 !== v && (u = rt.exec(t)))
                    if (i = u[1]) {
                        if (9 === v) {
                            if (!(s = e.getElementById(i))) return r;
                            if (s.id === i) return j.call(r, s), r
                        } else if (g && (s = g.getElementById(i)) && n.contains(e, s) && s.id === i) return j.call(r, s), r
                    } else {
                        if (u[2]) return j.apply(r, e.getElementsByTagName(t)), r;
                        if ((i = u[3]) && e.getElementsByClassName) return j.apply(r, e.getElementsByClassName(i)), r
                    }
                if (!(B[t + " "] || P && P.test(t))) {
                    if (p = t, g = e, 1 === v && (X.test(t) || Q.test(t))) {
                        for ((g = ot.test(t) && d(e.parentNode) || e) == e && vt.scope || ((c = e.getAttribute("id")) ? c = kt.escapeSelector(c) : e.setAttribute("id", c = D)), a = (l = h(t)).length; a--;) l[a] = (c ? "#" + c : ":scope") + " " + m(l[a]);
                        p = l.join(",")
                    }
                    try {
                        return j.apply(r, g.querySelectorAll(p)), r
                    } catch (e) {
                        B(t, !0)
                    } finally {
                        c === D && e.removeAttribute("id")
                    }
                }
            }
            return k(t.replace(It, "$1"), e, r, o)
        }

        function r() {
            function t(n, r) {
                return e.push(n + " ") > T.cacheLength && delete t[e.shift()], t[n + " "] = r
            }
            var e = [];
            return t
        }

        function o(t) {
            return t[D] = !0, t
        }

        function a(t) {
            var e = O.createElement("fieldset");
            try {
                return !!t(e)
            } catch (t) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }
        }

        function s(t) {
            return function(e) {
                return i(e, "input") && e.type === t
            }
        }

        function c(t) {
            return function(e) {
                return (i(e, "input") || i(e, "button")) && e.type === t
            }
        }

        function u(t) {
            return function(e) {
                return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && lt(e) === t : e.disabled === t : "label" in e && e.disabled === t
            }
        }

        function l(t) {
            return o(function(e) {
                return e = +e, o(function(n, r) {
                    for (var o, i = t([], n.length, e), a = i.length; a--;) n[o = i[a]] && (n[o] = !(r[o] = n[o]))
                })
            })
        }

        function d(t) {
            return t && void 0 !== t.getElementsByTagName && t
        }

        function f(t) {
            var e, r = t ? t.ownerDocument || t : Rt;
            return r != O && 9 === r.nodeType && r.documentElement ? (R = (O = r).documentElement, M = !kt.isXMLDoc(O), N = R.matches || R.webkitMatchesSelector || R.msMatchesSelector, R.msMatchesSelector && Rt != O && (e = O.defaultView) && e.top !== e && e.addEventListener("unload", ut), vt.getById = a(function(t) {
                return R.appendChild(t).id = kt.expando, !O.getElementsByName || !O.getElementsByName(kt.expando).length
            }), vt.disconnectedMatch = a(function(t) {
                return N.call(t, "*")
            }), vt.scope = a(function() {
                return O.querySelectorAll(":scope")
            }), vt.cssHas = a(function() {
                try {
                    return O.querySelector(":has(*,:jqfake)"), !1
                } catch (t) {
                    return !0
                }
            }), vt.getById ? (T.filter.ID = function(t) {
                var e = t.replace(it, st);
                return function(t) {
                    return t.getAttribute("id") === e
                }
            }, T.find.ID = function(t, e) {
                if (void 0 !== e.getElementById && M) {
                    var n = e.getElementById(t);
                    return n ? [n] : []
                }
            }) : (T.filter.ID = function(t) {
                var e = t.replace(it, st);
                return function(t) {
                    var n = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
                    return n && n.value === e
                }
            }, T.find.ID = function(t, e) {
                if (void 0 !== e.getElementById && M) {
                    var n, r, o, i = e.getElementById(t);
                    if (i) {
                        if ((n = i.getAttributeNode("id")) && n.value === t) return [i];
                        for (o = e.getElementsByName(t), r = 0; i = o[r++];)
                            if ((n = i.getAttributeNode("id")) && n.value === t) return [i]
                    }
                    return []
                }
            }), T.find.TAG = function(t, e) {
                return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : e.querySelectorAll(t)
            }, T.find.CLASS = function(t, e) {
                if (void 0 !== e.getElementsByClassName && M) return e.getElementsByClassName(t)
            }, P = [], a(function(t) {
                var e;
                R.appendChild(t).innerHTML = "<a id='" + D + "' href='' disabled='disabled'></a><select id='" + D + "-\r\\' disabled='disabled'><option selected=''></option></select>", t.querySelectorAll("[selected]").length || P.push("\\[" + At + "*(?:value|" + z + ")"), t.querySelectorAll("[id~=" + D + "-]").length || P.push("~="), t.querySelectorAll("a#" + D + "+*").length || P.push(".#.+[+~]"), t.querySelectorAll(":checked").length || P.push(":checked"), (e = O.createElement("input")).setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), R.appendChild(t).disabled = !0, 2 !== t.querySelectorAll(":disabled").length && P.push(":enabled", ":disabled"), (e = O.createElement("input")).setAttribute("name", ""), t.appendChild(e), t.querySelectorAll("[name='']").length || P.push("\\[" + At + "*name" + At + "*=" + At + "*(?:''|\"\")")
            }), vt.cssHas || P.push(":has"), P = P.length && new RegExp(P.join("|")), F = function(t, e) {
                if (t === e) return I = !0, 0;
                var r = !t.compareDocumentPosition - !e.compareDocumentPosition;
                return r || (1 & (r = (t.ownerDocument || t) == (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !vt.sortDetached && e.compareDocumentPosition(t) === r ? t === O || t.ownerDocument == Rt && n.contains(Rt, t) ? -1 : e === O || e.ownerDocument == Rt && n.contains(Rt, e) ? 1 : A ? dt.call(A, t) - dt.call(A, e) : 0 : 4 & r ? -1 : 1)
            }, O) : O
        }

        function p() {}

        function h(t, e) {
            var r, o, i, a, s, c, u, l = U[t + " "];
            if (l) return e ? 0 : l.slice(0);
            for (s = t, c = [], u = T.preFilter; s;) {
                for (a in r && !(o = J.exec(s)) || (o && (s = s.slice(o[0].length) || s), c.push(i = [])), r = !1, (o = Q.exec(s)) && (r = o.shift(), i.push({
                        value: r,
                        type: o[0].replace(It, " ")
                    }), s = s.slice(r.length)), T.filter) !(o = tt[a].exec(s)) || u[a] && !(o = u[a](o)) || (r = o.shift(), i.push({
                    value: r,
                    type: a,
                    matches: o
                }), s = s.slice(r.length));
                if (!r) break
            }
            return e ? s.length : s ? n.error(t) : U(t, c).slice(0)
        }

        function m(t) {
            for (var e = 0, n = t.length, r = ""; e < n; e++) r += t[e].value;
            return r
        }

        function g(t, e, n) {
            var r = e.dir,
                o = e.next,
                a = o || r,
                s = n && "parentNode" === a,
                c = $++;
            return e.first ? function(e, n, o) {
                for (; e = e[r];)
                    if (1 === e.nodeType || s) return t(e, n, o);
                return !1
            } : function(e, n, u) {
                var l, d, f = [L, c];
                if (u) {
                    for (; e = e[r];)
                        if ((1 === e.nodeType || s) && t(e, n, u)) return !0
                } else
                    for (; e = e[r];)
                        if (1 === e.nodeType || s)
                            if (d = e[D] || (e[D] = {}), o && i(e, o)) e = e[r] || e;
                            else {
                                if ((l = d[a]) && l[0] === L && l[1] === c) return f[2] = l[2];
                                if (d[a] = f, f[2] = t(e, n, u)) return !0
                            } return !1
            }
        }

        function v(t) {
            return t.length > 1 ? function(e, n, r) {
                for (var o = t.length; o--;)
                    if (!t[o](e, n, r)) return !1;
                return !0
            } : t[0]
        }

        function y(t, e, r) {
            for (var o = 0, i = e.length; o < i; o++) n(t, e[o], r);
            return r
        }

        function b(t, e, n, r, o) {
            for (var i, a = [], s = 0, c = t.length, u = null != e; s < c; s++)(i = t[s]) && (n && !n(i, r, o) || (a.push(i), u && e.push(s)));
            return a
        }

        function w(t, e, n, r, i, a) {
            return r && !r[D] && (r = w(r)), i && !i[D] && (i = w(i, a)), o(function(o, a, s, c) {
                var u, l, d, f, p = [],
                    h = [],
                    m = a.length,
                    g = o || y(e || "*", s.nodeType ? [s] : s, []),
                    v = !t || !o && e ? g : b(g, p, t, s, c);
                if (n ? n(v, f = i || (o ? t : m || r) ? [] : a, s, c) : f = v, r)
                    for (u = b(f, h), r(u, [], s, c), l = u.length; l--;)(d = u[l]) && (f[h[l]] = !(v[h[l]] = d));
                if (o) {
                    if (i || t) {
                        if (i) {
                            for (u = [], l = f.length; l--;)(d = f[l]) && u.push(v[l] = d);
                            i(null, f = [], u, c)
                        }
                        for (l = f.length; l--;)(d = f[l]) && (u = i ? dt.call(o, d) : p[l]) > -1 && (o[u] = !(a[u] = d))
                    }
                } else f = b(f === a ? f.splice(m, f.length) : f), i ? i(null, a, f, c) : j.apply(a, f)
            })
        }

        function _(t) {
            for (var e, n, r, o = t.length, i = T.relative[t[0].type], a = i || T.relative[" "], s = i ? 1 : 0, c = g(function(t) {
                    return t === e
                }, a, !0), u = g(function(t) {
                    return dt.call(e, t) > -1
                }, a, !0), l = [function(t, n, r) {
                    var o = !i && (r || n != E) || ((e = n).nodeType ? c(t, n, r) : u(t, n, r));
                    return e = null, o
                }]; s < o; s++)
                if (n = T.relative[t[s].type]) l = [g(v(l), n)];
                else {
                    if ((n = T.filter[t[s].type].apply(null, t[s].matches))[D]) {
                        for (r = ++s; r < o && !T.relative[t[r].type]; r++);
                        return w(s > 1 && v(l), s > 1 && m(t.slice(0, s - 1).concat({
                            value: " " === t[s - 2].type ? "*" : ""
                        })).replace(It, "$1"), n, s < r && _(t.slice(s, r)), r < o && _(t = t.slice(r)), r < o && m(t))
                    }
                    l.push(n)
                }
            return v(l)
        }

        function x(t, e) {
            var n = e.length > 0,
                r = t.length > 0,
                i = function(o, i, a, s, c) {
                    var u, l, d, p = 0,
                        h = "0",
                        m = o && [],
                        g = [],
                        v = E,
                        y = o || r && T.find.TAG("*", c),
                        w = L += null == v ? 1 : Math.random() || .1,
                        _ = y.length;
                    for (c && (E = i == O || i || c); h !== _ && null != (u = y[h]); h++) {
                        if (r && u) {
                            for (l = 0, i || u.ownerDocument == O || (f(u), a = !M); d = t[l++];)
                                if (d(u, i || O, a)) {
                                    j.call(s, u);
                                    break
                                }
                            c && (L = w)
                        }
                        n && ((u = !d && u) && p--, o && m.push(u))
                    }
                    if (p += h, n && h !== p) {
                        for (l = 0; d = e[l++];) d(m, g, i, a);
                        if (o) {
                            if (p > 0)
                                for (; h--;) m[h] || g[h] || (g[h] = Ct.call(s));
                            g = b(g)
                        }
                        j.apply(s, g), c && !o && g.length > 0 && p + e.length > 1 && kt.uniqueSort(s)
                    }
                    return c && (L = w, E = v), m
                };
            return n ? o(i) : i
        }

        function S(t, e) {
            var n, r = [],
                o = [],
                i = V[t + " "];
            if (!i) {
                for (e || (e = h(t)), n = e.length; n--;)(i = _(e[n]))[D] ? r.push(i) : o.push(i);
                (i = V(t, x(o, r))).selector = t
            }
            return i
        }

        function k(t, e, n, r) {
            var o, i, a, s, c, u = "function" == typeof t && t,
                l = !r && h(t = u.selector || t);
            if (n = n || [], 1 === l.length) {
                if ((i = l[0] = l[0].slice(0)).length > 2 && "ID" === (a = i[0]).type && 9 === e.nodeType && M && T.relative[i[1].type]) {
                    if (!(e = (T.find.ID(a.matches[0].replace(it, st), e) || [])[0])) return n;
                    u && (e = e.parentNode), t = t.slice(i.shift().value.length)
                }
                for (o = tt.needsContext.test(t) ? 0 : i.length; o-- && (a = i[o], !T.relative[s = a.type]);)
                    if ((c = T.find[s]) && (r = c(a.matches[0].replace(it, st), ot.test(i[0].type) && d(e.parentNode) || e))) {
                        if (i.splice(o, 1), !(t = r.length && m(i))) return j.apply(n, r), n;
                        break
                    }
            }
            return (u || S(t, l))(r, e, !M, n, !e || ot.test(t) && d(e.parentNode) || e), n
        }
        var C, T, E, A, I, O, R, M, P, N, j = Mt,
            D = kt.expando,
            L = 0,
            $ = 0,
            q = r(),
            U = r(),
            V = r(),
            B = r(),
            F = function(t, e) {
                return t === e && (I = !0), 0
            },
            z = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            H = "(?:\\\\[\\da-fA-F]{1,6}" + At + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
            W = "\\[" + At + "*(" + H + ")(?:" + At + "*([*^$|!~]?=)" + At + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + H + "))|)" + At + "*\\]",
            G = ":(" + H + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)",
            K = new RegExp(At + "+", "g"),
            J = new RegExp("^" + At + "*," + At + "*"),
            Q = new RegExp("^" + At + "*([>+~]|" + At + ")" + At + "*"),
            X = new RegExp(At + "|>"),
            Y = new RegExp(G),
            Z = new RegExp("^" + H + "$"),
            tt = {
                ID: new RegExp("^#(" + H + ")"),
                CLASS: new RegExp("^\\.(" + H + ")"),
                TAG: new RegExp("^(" + H + "|[*])"),
                ATTR: new RegExp("^" + W),
                PSEUDO: new RegExp("^" + G),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + At + "*(even|odd|(([+-]|)(\\d*)n|)" + At + "*(?:([+-]|)" + At + "*(\\d+)|))" + At + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + z + ")$", "i"),
                needsContext: new RegExp("^" + At + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + At + "*((?:-\\d)?\\d*)" + At + "*\\)|)(?=[^-]|$)", "i")
            },
            et = /^(?:input|select|textarea|button)$/i,
            nt = /^h\d$/i,
            rt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ot = /[+~]/,
            it = new RegExp("\\\\[\\da-fA-F]{1,6}" + At + "?|\\\\([^\\r\\n\\f])", "g"),
            st = function(t, e) {
                var n = "0x" + t.slice(1) - 65536;
                return e || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
            },
            ut = function() {
                f()
            },
            lt = g(function(t) {
                return !0 === t.disabled && i(t, "fieldset")
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            j.apply(at = ct.call(Rt.childNodes), Rt.childNodes), at[Rt.childNodes.length].nodeType
        } catch (t) {
            j = {
                apply: function(t, e) {
                    Mt.apply(t, ct.call(e))
                },
                call: function(t) {
                    Mt.apply(t, ct.call(arguments, 1))
                }
            }
        }
        for (C in n.matches = function(t, e) {
                return n(t, null, null, e)
            }, n.matchesSelector = function(t, e) {
                if (f(t), M && !B[e + " "] && (!P || !P.test(e))) try {
                    var r = N.call(t, e);
                    if (r || vt.disconnectedMatch || t.document && 11 !== t.document.nodeType) return r
                } catch (t) {
                    B(e, !0)
                }
                return n(e, O, null, [t]).length > 0
            }, n.contains = function(t, e) {
                return (t.ownerDocument || t) != O && f(t), kt.contains(t, e)
            }, n.attr = function(t, e) {
                (t.ownerDocument || t) != O && f(t);
                var n = T.attrHandle[e.toLowerCase()],
                    r = n && ht.call(T.attrHandle, e.toLowerCase()) ? n(t, e, !M) : void 0;
                return void 0 !== r ? r : t.getAttribute(e)
            }, n.error = function(t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            }, kt.uniqueSort = function(t) {
                var e, n = [],
                    r = 0,
                    o = 0;
                if (I = !vt.sortStable, A = !vt.sortStable && ct.call(t, 0), Tt.call(t, F), I) {
                    for (; e = t[o++];) e === t[o] && (r = n.push(o));
                    for (; r--;) Et.call(t, n[r], 1)
                }
                return A = null, t
            }, kt.fn.uniqueSort = function() {
                return this.pushStack(kt.uniqueSort(ct.apply(this)))
            }, T = kt.expr = {
                cacheLength: 50,
                createPseudo: o,
                match: tt,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(t) {
                        return t[1] = t[1].replace(it, st), t[3] = (t[3] || t[4] || t[5] || "").replace(it, st), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                    },
                    CHILD: function(t) {
                        return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || n.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && n.error(t[0]), t
                    },
                    PSEUDO: function(t) {
                        var e, n = !t[6] && t[2];
                        return tt.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && Y.test(n) && (e = h(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(t) {
                        var e = t.replace(it, st).toLowerCase();
                        return "*" === t ? function() {
                            return !0
                        } : function(t) {
                            return i(t, e)
                        }
                    },
                    CLASS: function(t) {
                        var e = q[t + " "];
                        return e || (e = new RegExp("(^|" + At + ")" + t + "(" + At + "|$)")) && q(t, function(t) {
                            return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(t, e, r) {
                        return function(o) {
                            var i = n.attr(o, t);
                            return null == i ? "!=" === e : !e || (i += "", "=" === e ? i === r : "!=" === e ? i !== r : "^=" === e ? r && 0 === i.indexOf(r) : "*=" === e ? r && i.indexOf(r) > -1 : "$=" === e ? r && i.slice(-r.length) === r : "~=" === e ? (" " + i.replace(K, " ") + " ").indexOf(r) > -1 : "|=" === e && (i === r || i.slice(0, r.length + 1) === r + "-"))
                        }
                    },
                    CHILD: function(t, e, n, r, o) {
                        var a = "nth" !== t.slice(0, 3),
                            s = "last" !== t.slice(-4),
                            c = "of-type" === e;
                        return 1 === r && 0 === o ? function(t) {
                            return !!t.parentNode
                        } : function(e, n, u) {
                            var l, d, f, p, h, m = a !== s ? "nextSibling" : "previousSibling",
                                g = e.parentNode,
                                v = c && e.nodeName.toLowerCase(),
                                y = !u && !c,
                                b = !1;
                            if (g) {
                                if (a) {
                                    for (; m;) {
                                        for (f = e; f = f[m];)
                                            if (c ? i(f, v) : 1 === f.nodeType) return !1;
                                        h = m = "only" === t && !h && "nextSibling"
                                    }
                                    return !0
                                }
                                if (h = [s ? g.firstChild : g.lastChild], s && y) {
                                    for (b = (p = (l = (d = g[D] || (g[D] = {}))[t] || [])[0] === L && l[1]) && l[2], f = p && g.childNodes[p]; f = ++p && f && f[m] || (b = p = 0) || h.pop();)
                                        if (1 === f.nodeType && ++b && f === e) {
                                            d[t] = [L, p, b];
                                            break
                                        }
                                } else if (y && (b = p = (l = (d = e[D] || (e[D] = {}))[t] || [])[0] === L && l[1]), !1 === b)
                                    for (;
                                        (f = ++p && f && f[m] || (b = p = 0) || h.pop()) && (!(c ? i(f, v) : 1 === f.nodeType) || !++b || (y && ((d = f[D] || (f[D] = {}))[t] = [L, b]), f !== e)););
                                return (b -= o) === r || b % r === 0 && b / r >= 0
                            }
                        }
                    },
                    PSEUDO: function(t, e) {
                        var r, i = T.pseudos[t] || T.setFilters[t.toLowerCase()] || n.error("unsupported pseudo: " + t);
                        return i[D] ? i(e) : i.length > 1 ? (r = [t, t, "", e], T.setFilters.hasOwnProperty(t.toLowerCase()) ? o(function(t, n) {
                            for (var r, o = i(t, e), a = o.length; a--;) t[r = dt.call(t, o[a])] = !(n[r] = o[a])
                        }) : function(t) {
                            return i(t, 0, r)
                        }) : i
                    }
                },
                pseudos: {
                    not: o(function(t) {
                        var e = [],
                            n = [],
                            r = S(t.replace(It, "$1"));
                        return r[D] ? o(function(t, e, n, o) {
                            for (var i, a = r(t, null, o, []), s = t.length; s--;)(i = a[s]) && (t[s] = !(e[s] = i))
                        }) : function(t, o, i) {
                            return e[0] = t, r(e, null, i, n), e[0] = null, !n.pop()
                        }
                    }),
                    has: o(function(t) {
                        return function(e) {
                            return n(t, e).length > 0
                        }
                    }),
                    contains: o(function(t) {
                        return t = t.replace(it, st),
                            function(e) {
                                return (e.textContent || kt.text(e)).indexOf(t) > -1
                            }
                    }),
                    lang: o(function(t) {
                        return Z.test(t || "") || n.error("unsupported lang: " + t), t = t.replace(it, st).toLowerCase(),
                            function(e) {
                                var n;
                                do {
                                    if (n = M ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (n = n.toLowerCase()) === t || 0 === n.indexOf(t + "-")
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function(e) {
                        var n = t.location && t.location.hash;
                        return n && n.slice(1) === e.id
                    },
                    root: function(t) {
                        return t === R
                    },
                    focus: function(t) {
                        return t === e() && O.hasFocus() && !!(t.type || t.href || ~t.tabIndex)
                    },
                    enabled: u(!1),
                    disabled: u(!0),
                    checked: function(t) {
                        return i(t, "input") && !!t.checked || i(t, "option") && !!t.selected
                    },
                    selected: function(t) {
                        return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                    },
                    empty: function(t) {
                        for (t = t.firstChild; t; t = t.nextSibling)
                            if (t.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(t) {
                        return !T.pseudos.empty(t)
                    },
                    header: function(t) {
                        return nt.test(t.nodeName)
                    },
                    input: function(t) {
                        return et.test(t.nodeName)
                    },
                    button: function(t) {
                        return i(t, "input") && "button" === t.type || i(t, "button")
                    },
                    text: function(t) {
                        var e;
                        return i(t, "input") && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                    },
                    first: l(function() {
                        return [0]
                    }),
                    last: l(function(t, e) {
                        return [e - 1]
                    }),
                    eq: l(function(t, e, n) {
                        return [n < 0 ? n + e : n]
                    }),
                    even: l(function(t, e) {
                        for (var n = 0; n < e; n += 2) t.push(n);
                        return t
                    }),
                    odd: l(function(t, e) {
                        for (var n = 1; n < e; n += 2) t.push(n);
                        return t
                    }),
                    lt: l(function(t, e, n) {
                        var r;
                        for (r = n < 0 ? n + e : n > e ? e : n; --r >= 0;) t.push(r);
                        return t
                    }),
                    gt: l(function(t, e, n) {
                        for (var r = n < 0 ? n + e : n; ++r < e;) t.push(r);
                        return t
                    })
                }
            }, T.pseudos.nth = T.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) T.pseudos[C] = s(C);
        for (C in {
                submit: !0,
                reset: !0
            }) T.pseudos[C] = c(C);
        p.prototype = T.filters = T.pseudos, T.setFilters = new p, vt.sortStable = D.split("").sort(F).join("") === D, f(), vt.sortDetached = a(function(t) {
            return 1 & t.compareDocumentPosition(O.createElement("fieldset"))
        }), kt.find = n, kt.expr[":"] = kt.expr.pseudos, kt.unique = kt.uniqueSort, n.compile = S, n.select = k, n.setDocument = f, n.tokenize = h, n.escape = kt.escapeSelector, n.getText = kt.text, n.isXML = kt.isXMLDoc, n.selectors = kt.expr, n.support = kt.support, n.uniqueSort = kt.uniqueSort
    }();
    var Pt = function(t, e, n) {
            for (var r = [], o = void 0 !== n;
                (t = t[e]) && 9 !== t.nodeType;)
                if (1 === t.nodeType) {
                    if (o && kt(t).is(n)) break;
                    r.push(t)
                }
            return r
        },
        Nt = function(t, e) {
            for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
            return n
        },
        jt = kt.expr.match.needsContext,
        Dt = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    kt.filter = function(t, e, n) {
        var r = e[0];
        return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === r.nodeType ? kt.find.matchesSelector(r, t) ? [r] : [] : kt.find.matches(t, kt.grep(e, function(t) {
            return 1 === t.nodeType
        }))
    }, kt.fn.extend({
        find: function(t) {
            var e, n, r = this.length,
                o = this;
            if ("string" != typeof t) return this.pushStack(kt(t).filter(function() {
                for (e = 0; e < r; e++)
                    if (kt.contains(o[e], this)) return !0
            }));
            for (n = this.pushStack([]), e = 0; e < r; e++) kt.find(t, o[e], n);
            return r > 1 ? kt.uniqueSort(n) : n
        },
        filter: function(t) {
            return this.pushStack(s(this, t || [], !1))
        },
        not: function(t) {
            return this.pushStack(s(this, t || [], !0))
        },
        is: function(t) {
            return !!s(this, "string" == typeof t && jt.test(t) ? kt(t) : t || [], !1).length
        }
    });
    var Lt, $t = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (kt.fn.init = function(t, e, n) {
        var r, o;
        if (!t) return this;
        if (n = n || Lt, "string" == typeof t) {
            if (!(r = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : $t.exec(t)) || !r[1] && e) return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
            if (r[1]) {
                if (e = e instanceof kt ? e[0] : e, kt.merge(this, kt.parseHTML(r[1], e && e.nodeType ? e.ownerDocument || e : wt, !0)), Dt.test(r[1]) && kt.isPlainObject(e))
                    for (r in e) yt(this[r]) ? this[r](e[r]) : this.attr(r, e[r]);
                return this
            }
            return (o = wt.getElementById(r[2])) && (this[0] = o, this.length = 1), this
        }
        return t.nodeType ? (this[0] = t, this.length = 1, this) : yt(t) ? void 0 !== n.ready ? n.ready(t) : t(kt) : kt.makeArray(t, this)
    }).prototype = kt.fn, Lt = kt(wt);
    var qt = /^(?:parents|prev(?:Until|All))/,
        Ut = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    kt.fn.extend({
        has: function(t) {
            var e = kt(t, this),
                n = e.length;
            return this.filter(function() {
                for (var t = 0; t < n; t++)
                    if (kt.contains(this, e[t])) return !0
            })
        },
        closest: function(t, e) {
            var n, r = 0,
                o = this.length,
                i = [],
                a = "string" != typeof t && kt(t);
            if (!jt.test(t))
                for (; r < o; r++)
                    for (n = this[r]; n && n !== e; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && kt.find.matchesSelector(n, t))) {
                            i.push(n);
                            break
                        }
            return this.pushStack(i.length > 1 ? kt.uniqueSort(i) : i)
        },
        index: function(t) {
            return t ? "string" == typeof t ? dt.call(kt(t), this[0]) : dt.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(t, e) {
            return this.pushStack(kt.uniqueSort(kt.merge(this.get(), kt(t, e))))
        },
        addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), kt.each({
        parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(t) {
            return Pt(t, "parentNode")
        },
        parentsUntil: function(t, e, n) {
            return Pt(t, "parentNode", n)
        },
        next: function(t) {
            return c(t, "nextSibling")
        },
        prev: function(t) {
            return c(t, "previousSibling")
        },
        nextAll: function(t) {
            return Pt(t, "nextSibling")
        },
        prevAll: function(t) {
            return Pt(t, "previousSibling")
        },
        nextUntil: function(t, e, n) {
            return Pt(t, "nextSibling", n)
        },
        prevUntil: function(t, e, n) {
            return Pt(t, "previousSibling", n)
        },
        siblings: function(t) {
            return Nt((t.parentNode || {}).firstChild, t)
        },
        children: function(t) {
            return Nt(t.firstChild)
        },
        contents: function(t) {
            return null != t.contentDocument && st(t.contentDocument) ? t.contentDocument : (i(t, "template") && (t = t.content || t), kt.merge([], t.childNodes))
        }
    }, function(t, e) {
        kt.fn[t] = function(n, r) {
            var o = kt.map(this, e, n);
            return "Until" !== t.slice(-5) && (r = n), r && "string" == typeof r && (o = kt.filter(r, o)), this.length > 1 && (Ut[t] || kt.uniqueSort(o), qt.test(t) && o.reverse()), this.pushStack(o)
        }
    });
    var Vt = /[^\x20\t\r\n\f]+/g;
    kt.Callbacks = function(t) {
        t = "string" == typeof t ? u(t) : kt.extend({}, t);
        var e, n, o, i, a = [],
            s = [],
            c = -1,
            l = function() {
                for (i = i || t.once, o = e = !0; s.length; c = -1)
                    for (n = s.shift(); ++c < a.length;) !1 === a[c].apply(n[0], n[1]) && t.stopOnFalse && (c = a.length, n = !1);
                t.memory || (n = !1), e = !1, i && (a = n ? [] : "")
            },
            d = {
                add: function() {
                    return a && (n && !e && (c = a.length - 1, s.push(n)), function e(n) {
                        kt.each(n, function(n, o) {
                            yt(o) ? t.unique && d.has(o) || a.push(o) : o && o.length && "string" !== r(o) && e(o)
                        })
                    }(arguments), n && !e && l()), this
                },
                remove: function() {
                    return kt.each(arguments, function(t, e) {
                        for (var n;
                            (n = kt.inArray(e, a, n)) > -1;) a.splice(n, 1), n <= c && c--
                    }), this
                },
                has: function(t) {
                    return t ? kt.inArray(t, a) > -1 : a.length > 0
                },
                empty: function() {
                    return a && (a = []), this
                },
                disable: function() {
                    return i = s = [], a = n = "", this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    return i = s = [], n || e || (a = n = ""), this
                },
                locked: function() {
                    return !!i
                },
                fireWith: function(t, n) {
                    return i || (n = [t, (n = n || []).slice ? n.slice() : n], s.push(n), e || l()), this
                },
                fire: function() {
                    return d.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!o
                }
            };
        return d
    }, kt.extend({
        Deferred: function(e) {
            var n = [
                    ["notify", "progress", kt.Callbacks("memory"), kt.Callbacks("memory"), 2],
                    ["resolve", "done", kt.Callbacks("once memory"), kt.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", kt.Callbacks("once memory"), kt.Callbacks("once memory"), 1, "rejected"]
                ],
                r = "pending",
                o = {
                    state: function() {
                        return r
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    catch: function(t) {
                        return o.then(null, t)
                    },
                    pipe: function() {
                        var t = arguments;
                        return kt.Deferred(function(e) {
                            kt.each(n, function(n, r) {
                                var o = yt(t[r[4]]) && t[r[4]];
                                i[r[1]](function() {
                                    var t = o && o.apply(this, arguments);
                                    t && yt(t.promise) ? t.promise().progress(e.notify).done(e.resolve).fail(e.reject) : e[r[0] + "With"](this, o ? [t] : arguments)
                                })
                            }), t = null
                        }).promise()
                    },
                    then: function(e, r, o) {
                        function i(e, n, r, o) {
                            return function() {
                                var s = this,
                                    c = arguments,
                                    u = function() {
                                        var t, u;
                                        if (!(e < a)) {
                                            if ((t = r.apply(s, c)) === n.promise()) throw new TypeError("Thenable self-resolution");
                                            u = t && ("object" == typeof t || "function" == typeof t) && t.then, yt(u) ? o ? u.call(t, i(a, n, l, o), i(a, n, d, o)) : (a++, u.call(t, i(a, n, l, o), i(a, n, d, o), i(a, n, l, n.notifyWith))) : (r !== l && (s = void 0, c = [t]), (o || n.resolveWith)(s, c))
                                        }
                                    },
                                    f = o ? u : function() {
                                        try {
                                            u()
                                        } catch (t) {
                                            kt.Deferred.exceptionHook && kt.Deferred.exceptionHook(t, f.error), e + 1 >= a && (r !== d && (s = void 0, c = [t]), n.rejectWith(s, c))
                                        }
                                    };
                                e ? f() : (kt.Deferred.getErrorHook ? f.error = kt.Deferred.getErrorHook() : kt.Deferred.getStackHook && (f.error = kt.Deferred.getStackHook()), t.setTimeout(f))
                            }
                        }
                        var a = 0;
                        return kt.Deferred(function(t) {
                            n[0][3].add(i(0, t, yt(o) ? o : l, t.notifyWith)), n[1][3].add(i(0, t, yt(e) ? e : l)), n[2][3].add(i(0, t, yt(r) ? r : d))
                        }).promise()
                    },
                    promise: function(t) {
                        return null != t ? kt.extend(t, o) : o
                    }
                },
                i = {};
            return kt.each(n, function(t, e) {
                var a = e[2],
                    s = e[5];
                o[e[1]] = a.add, s && a.add(function() {
                    r = s
                }, n[3 - t][2].disable, n[3 - t][3].disable, n[0][2].lock, n[0][3].lock), a.add(e[3].fire), i[e[0]] = function() {
                    return i[e[0] + "With"](this === i ? void 0 : this, arguments), this
                }, i[e[0] + "With"] = a.fireWith
            }), o.promise(i), e && e.call(i, i), i
        },
        when: function(t) {
            var e = arguments.length,
                n = e,
                r = Array(n),
                o = ct.call(arguments),
                i = kt.Deferred(),
                a = function(t) {
                    return function(n) {
                        r[t] = this, o[t] = arguments.length > 1 ? ct.call(arguments) : n, --e || i.resolveWith(r, o)
                    }
                };
            if (e <= 1 && (f(t, i.done(a(n)).resolve, i.reject, !e), "pending" === i.state() || yt(o[n] && o[n].then))) return i.then();
            for (; n--;) f(o[n], a(n), i.reject);
            return i.promise()
        }
    });
    var Bt = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    kt.Deferred.exceptionHook = function(e, n) {
        t.console && t.console.warn && e && Bt.test(e.name) && t.console.warn("jQuery.Deferred exception: " + e.message, e.stack, n)
    }, kt.readyException = function(e) {
        t.setTimeout(function() {
            throw e
        })
    };
    var Ft = kt.Deferred();
    kt.fn.ready = function(t) {
        return Ft.then(t).catch(function(t) {
            kt.readyException(t)
        }), this
    }, kt.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(t) {
            (!0 === t ? --kt.readyWait : kt.isReady) || (kt.isReady = !0, !0 !== t && --kt.readyWait > 0 || Ft.resolveWith(wt, [kt]))
        }
    }), kt.ready.then = Ft.then, "complete" === wt.readyState || "loading" !== wt.readyState && !wt.documentElement.doScroll ? t.setTimeout(kt.ready) : (wt.addEventListener("DOMContentLoaded", p), t.addEventListener("load", p));
    var zt = function(t, e, n, o, i, a, s) {
            var c = 0,
                u = t.length,
                l = null == n;
            if ("object" === r(n))
                for (c in i = !0, n) zt(t, e, c, n[c], !0, a, s);
            else if (void 0 !== o && (i = !0, yt(o) || (s = !0), l && (s ? (e.call(t, o), e = null) : (l = e, e = function(t, e, n) {
                    return l.call(kt(t), n)
                })), e))
                for (; c < u; c++) e(t[c], n, s ? o : o.call(t[c], c, e(t[c], n)));
            return i ? t : l ? e.call(t) : u ? e(t[0], n) : a
        },
        Ht = /^-ms-/,
        Wt = /-([a-z])/g,
        Gt = function(t) {
            return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
        };
    g.uid = 1, g.prototype = {
        cache: function(t) {
            var e = t[this.expando];
            return e || (e = {}, Gt(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
                value: e,
                configurable: !0
            }))), e
        },
        set: function(t, e, n) {
            var r, o = this.cache(t);
            if ("string" == typeof e) o[m(e)] = n;
            else
                for (r in e) o[m(r)] = e[r];
            return o
        },
        get: function(t, e) {
            return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][m(e)]
        },
        access: function(t, e, n) {
            return void 0 === e || e && "string" == typeof e && void 0 === n ? this.get(t, e) : (this.set(t, e, n), void 0 !== n ? n : e)
        },
        remove: function(t, e) {
            var n, r = t[this.expando];
            if (void 0 !== r) {
                if (void 0 !== e) {
                    n = (e = Array.isArray(e) ? e.map(m) : (e = m(e)) in r ? [e] : e.match(Vt) || []).length;
                    for (; n--;) delete r[e[n]]
                }(void 0 === e || kt.isEmptyObject(r)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
            }
        },
        hasData: function(t) {
            var e = t[this.expando];
            return void 0 !== e && !kt.isEmptyObject(e)
        }
    };
    var Kt = new g,
        Jt = new g,
        Qt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Xt = /[A-Z]/g;
    kt.extend({
        hasData: function(t) {
            return Jt.hasData(t) || Kt.hasData(t)
        },
        data: function(t, e, n) {
            return Jt.access(t, e, n)
        },
        removeData: function(t, e) {
            Jt.remove(t, e)
        },
        _data: function(t, e, n) {
            return Kt.access(t, e, n)
        },
        _removeData: function(t, e) {
            Kt.remove(t, e)
        }
    }), kt.fn.extend({
        data: function(t, e) {
            var n, r, o, i = this[0],
                a = i && i.attributes;
            if (void 0 === t) {
                if (this.length && (o = Jt.get(i), 1 === i.nodeType && !Kt.get(i, "hasDataAttrs"))) {
                    for (n = a.length; n--;) a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = m(r.slice(5)), y(i, r, o[r]));
                    Kt.set(i, "hasDataAttrs", !0)
                }
                return o
            }
            return "object" == typeof t ? this.each(function() {
                Jt.set(this, t)
            }) : zt(this, function(e) {
                var n;
                if (i && void 0 === e) return void 0 !== (n = Jt.get(i, t)) || void 0 !== (n = y(i, t)) ? n : void 0;
                this.each(function() {
                    Jt.set(this, t, e)
                })
            }, null, e, arguments.length > 1, null, !0)
        },
        removeData: function(t) {
            return this.each(function() {
                Jt.remove(this, t)
            })
        }
    }), kt.extend({
        queue: function(t, e, n) {
            var r;
            if (t) return e = (e || "fx") + "queue", r = Kt.get(t, e), n && (!r || Array.isArray(n) ? r = Kt.access(t, e, kt.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function(t, e) {
            e = e || "fx";
            var n = kt.queue(t, e),
                r = n.length,
                o = n.shift(),
                i = kt._queueHooks(t, e),
                a = function() {
                    kt.dequeue(t, e)
                };
            "inprogress" === o && (o = n.shift(), r--), o && ("fx" === e && n.unshift("inprogress"), delete i.stop, o.call(t, a, i)), !r && i && i.empty.fire()
        },
        _queueHooks: function(t, e) {
            var n = e + "queueHooks";
            return Kt.get(t, n) || Kt.access(t, n, {
                empty: kt.Callbacks("once memory").add(function() {
                    Kt.remove(t, [e + "queue", n])
                })
            })
        }
    }), kt.fn.extend({
        queue: function(t, e) {
            var n = 2;
            return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? kt.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                var n = kt.queue(this, t, e);
                kt._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && kt.dequeue(this, t)
            })
        },
        dequeue: function(t) {
            return this.each(function() {
                kt.dequeue(this, t)
            })
        },
        clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },
        promise: function(t, e) {
            var n, r = 1,
                o = kt.Deferred(),
                i = this,
                a = this.length,
                s = function() {
                    --r || o.resolveWith(i, [i])
                };
            for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; a--;)(n = Kt.get(i[a], t + "queueHooks")) && n.empty && (r++, n.empty.add(s));
            return s(), o.promise(e)
        }
    });
    var Yt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Zt = new RegExp("^(?:([+-])=|)(" + Yt + ")([a-z%]*)$", "i"),
        te = ["Top", "Right", "Bottom", "Left"],
        ee = wt.documentElement,
        ne = function(t) {
            return kt.contains(t.ownerDocument, t)
        },
        re = {
            composed: !0
        };
    ee.getRootNode && (ne = function(t) {
        return kt.contains(t.ownerDocument, t) || t.getRootNode(re) === t.ownerDocument
    });
    var oe = function(t, e) {
            return "none" === (t = e || t).style.display || "" === t.style.display && ne(t) && "none" === kt.css(t, "display")
        },
        ie = {};
    kt.fn.extend({
        show: function() {
            return _(this, !0)
        },
        hide: function() {
            return _(this)
        },
        toggle: function(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                oe(this) ? kt(this).show() : kt(this).hide()
            })
        }
    });
    var ae, se, ce = /^(?:checkbox|radio)$/i,
        ue = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
        le = /^$|^module$|\/(?:java|ecma)script/i;
    ae = wt.createDocumentFragment().appendChild(wt.createElement("div")), (se = wt.createElement("input")).setAttribute("type", "radio"), se.setAttribute("checked", "checked"), se.setAttribute("name", "t"), ae.appendChild(se), vt.checkClone = ae.cloneNode(!0).cloneNode(!0).lastChild.checked, ae.innerHTML = "<textarea>x</textarea>", vt.noCloneChecked = !!ae.cloneNode(!0).lastChild.defaultValue, ae.innerHTML = "<option></option>", vt.option = !!ae.lastChild;
    var de = {
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    de.tbody = de.tfoot = de.colgroup = de.caption = de.thead, de.th = de.td, vt.option || (de.optgroup = de.option = [1, "<select multiple='multiple'>", "</select>"]);
    var fe = /<|&#?\w+;/,
        pe = /^([^.]*)(?:\.(.+)|)/;
    kt.event = {
        global: {},
        add: function(t, e, n, r, o) {
            var i, a, s, c, u, l, d, f, p, h, m, g = Kt.get(t);
            if (Gt(t))
                for (n.handler && (n = (i = n).handler, o = i.selector), o && kt.find.matchesSelector(ee, o), n.guid || (n.guid = kt.guid++), (c = g.events) || (c = g.events = Object.create(null)), (a = g.handle) || (a = g.handle = function(e) {
                        return void 0 !== kt && kt.event.triggered !== e.type ? kt.event.dispatch.apply(t, arguments) : void 0
                    }), u = (e = (e || "").match(Vt) || [""]).length; u--;) p = m = (s = pe.exec(e[u]) || [])[1], h = (s[2] || "").split(".").sort(), p && (d = kt.event.special[p] || {}, p = (o ? d.delegateType : d.bindType) || p, d = kt.event.special[p] || {}, l = kt.extend({
                    type: p,
                    origType: m,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && kt.expr.match.needsContext.test(o),
                    namespace: h.join(".")
                }, i), (f = c[p]) || ((f = c[p] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(p, a)), d.add && (d.add.call(t, l), l.handler.guid || (l.handler.guid = n.guid)), o ? f.splice(f.delegateCount++, 0, l) : f.push(l), kt.event.global[p] = !0)
        },
        remove: function(t, e, n, r, o) {
            var i, a, s, c, u, l, d, f, p, h, m, g = Kt.hasData(t) && Kt.get(t);
            if (g && (c = g.events)) {
                for (u = (e = (e || "").match(Vt) || [""]).length; u--;)
                    if (p = m = (s = pe.exec(e[u]) || [])[1], h = (s[2] || "").split(".").sort(), p) {
                        for (d = kt.event.special[p] || {}, f = c[p = (r ? d.delegateType : d.bindType) || p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = i = f.length; i--;) l = f[i], !o && m !== l.origType || n && n.guid !== l.guid || s && !s.test(l.namespace) || r && r !== l.selector && ("**" !== r || !l.selector) || (f.splice(i, 1), l.selector && f.delegateCount--, d.remove && d.remove.call(t, l));
                        a && !f.length && (d.teardown && !1 !== d.teardown.call(t, h, g.handle) || kt.removeEvent(t, p, g.handle), delete c[p])
                    } else
                        for (p in c) kt.event.remove(t, p + e[u], n, r, !0);
                kt.isEmptyObject(c) && Kt.remove(t, "handle events")
            }
        },
        dispatch: function(t) {
            var e, n, r, o, i, a, s = new Array(arguments.length),
                c = kt.event.fix(t),
                u = (Kt.get(this, "events") || Object.create(null))[c.type] || [],
                l = kt.event.special[c.type] || {};
            for (s[0] = c, e = 1; e < arguments.length; e++) s[e] = arguments[e];
            if (c.delegateTarget = this, !l.preDispatch || !1 !== l.preDispatch.call(this, c)) {
                for (a = kt.event.handlers.call(this, c, u), e = 0;
                    (o = a[e++]) && !c.isPropagationStopped();)
                    for (c.currentTarget = o.elem, n = 0;
                        (i = o.handlers[n++]) && !c.isImmediatePropagationStopped();) c.rnamespace && !1 !== i.namespace && !c.rnamespace.test(i.namespace) || (c.handleObj = i, c.data = i.data, void 0 !== (r = ((kt.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, s)) && !1 === (c.result = r) && (c.preventDefault(), c.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, c), c.result
            }
        },
        handlers: function(t, e) {
            var n, r, o, i, a, s = [],
                c = e.delegateCount,
                u = t.target;
            if (c && u.nodeType && !("click" === t.type && t.button >= 1))
                for (; u !== this; u = u.parentNode || this)
                    if (1 === u.nodeType && ("click" !== t.type || !0 !== u.disabled)) {
                        for (i = [], a = {}, n = 0; n < c; n++) void 0 === a[o = (r = e[n]).selector + " "] && (a[o] = r.needsContext ? kt(o, this).index(u) > -1 : kt.find(o, this, null, [u]).length), a[o] && i.push(r);
                        i.length && s.push({
                            elem: u,
                            handlers: i
                        })
                    }
            return u = this, c < e.length && s.push({
                elem: u,
                handlers: e.slice(c)
            }), s
        },
        addProp: function(t, e) {
            Object.defineProperty(kt.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: yt(e) ? function() {
                    if (this.originalEvent) return e(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[t]
                },
                set: function(e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    })
                }
            })
        },
        fix: function(t) {
            return t[kt.expando] ? t : new kt.Event(t)
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                setup: function(t) {
                    var e = this || t;
                    return ce.test(e.type) && e.click && i(e, "input") && A(e, "click", !0), !1
                },
                trigger: function(t) {
                    var e = this || t;
                    return ce.test(e.type) && e.click && i(e, "input") && A(e, "click"), !0
                },
                _default: function(t) {
                    var e = t.target;
                    return ce.test(e.type) && e.click && i(e, "input") && Kt.get(e, "click") || i(e, "a")
                }
            },
            beforeunload: {
                postDispatch: function(t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        }
    }, kt.removeEvent = function(t, e, n) {
        t.removeEventListener && t.removeEventListener(e, n)
    }, kt.Event = function(t, e) {
        if (!(this instanceof kt.Event)) return new kt.Event(t, e);
        t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? C : T, this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target, this.currentTarget = t.currentTarget, this.relatedTarget = t.relatedTarget) : this.type = t, e && kt.extend(this, e), this.timeStamp = t && t.timeStamp || Date.now(), this[kt.expando] = !0
    }, kt.Event.prototype = {
        constructor: kt.Event,
        isDefaultPrevented: T,
        isPropagationStopped: T,
        isImmediatePropagationStopped: T,
        isSimulated: !1,
        preventDefault: function() {
            var t = this.originalEvent;
            this.isDefaultPrevented = C, t && !this.isSimulated && t.preventDefault()
        },
        stopPropagation: function() {
            var t = this.originalEvent;
            this.isPropagationStopped = C, t && !this.isSimulated && t.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = C, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation()
        }
    }, kt.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: !0
    }, kt.event.addProp), kt.each({
        focus: "focusin",
        blur: "focusout"
    }, function(t, e) {
        function n(t) {
            if (wt.documentMode) {
                var n = Kt.get(this, "handle"),
                    r = kt.event.fix(t);
                r.type = "focusin" === t.type ? "focus" : "blur", r.isSimulated = !0, n(t), r.target === r.currentTarget && n(r)
            } else kt.event.simulate(e, t.target, kt.event.fix(t))
        }
        kt.event.special[t] = {
            setup: function() {
                var r;
                if (A(this, t, !0), !wt.documentMode) return !1;
                (r = Kt.get(this, e)) || this.addEventListener(e, n), Kt.set(this, e, (r || 0) + 1)
            },
            trigger: function() {
                return A(this, t), !0
            },
            teardown: function() {
                var t;
                if (!wt.documentMode) return !1;
                (t = Kt.get(this, e) - 1) ? Kt.set(this, e, t): (this.removeEventListener(e, n), Kt.remove(this, e))
            },
            _default: function(e) {
                return Kt.get(e.target, t)
            },
            delegateType: e
        }, kt.event.special[e] = {
            setup: function() {
                var r = this.ownerDocument || this.document || this,
                    o = wt.documentMode ? this : r,
                    i = Kt.get(o, e);
                i || (wt.documentMode ? this.addEventListener(e, n) : r.addEventListener(t, n, !0)), Kt.set(o, e, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this.document || this,
                    o = wt.documentMode ? this : r,
                    i = Kt.get(o, e) - 1;
                i ? Kt.set(o, e, i) : (wt.documentMode ? this.removeEventListener(e, n) : r.removeEventListener(t, n, !0), Kt.remove(o, e))
            }
        }
    }), kt.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(t, e) {
        kt.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function(t) {
                var n, r = this,
                    o = t.relatedTarget,
                    i = t.handleObj;
                return o && (o === r || kt.contains(r, o)) || (t.type = i.origType, n = i.handler.apply(this, arguments), t.type = e), n
            }
        }
    }), kt.fn.extend({
        on: function(t, e, n, r) {
            return E(this, t, e, n, r)
        },
        one: function(t, e, n, r) {
            return E(this, t, e, n, r, 1)
        },
        off: function(t, e, n) {
            var r, o;
            if (t && t.preventDefault && t.handleObj) return r = t.handleObj, kt(t.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof t) {
                for (o in t) this.off(o, e, t[o]);
                return this
            }
            return !1 !== e && "function" != typeof e || (n = e, e = void 0), !1 === n && (n = T), this.each(function() {
                kt.event.remove(this, t, n, e)
            })
        }
    });
    var he = /<script|<style|<link/i,
        me = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ge = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
    kt.extend({
        htmlPrefilter: function(t) {
            return t
        },
        clone: function(t, e, n) {
            var r, o, i, a, s = t.cloneNode(!0),
                c = ne(t);
            if (!(vt.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || kt.isXMLDoc(t)))
                for (a = x(s), r = 0, o = (i = x(t)).length; r < o; r++) P(i[r], a[r]);
            if (e)
                if (n)
                    for (i = i || x(t), a = a || x(s), r = 0, o = i.length; r < o; r++) M(i[r], a[r]);
                else M(t, s);
            return (a = x(s, "script")).length > 0 && S(a, !c && x(t, "script")), s
        },
        cleanData: function(t) {
            for (var e, n, r, o = kt.event.special, i = 0; void 0 !== (n = t[i]); i++)
                if (Gt(n)) {
                    if (e = n[Kt.expando]) {
                        if (e.events)
                            for (r in e.events) o[r] ? kt.event.remove(n, r) : kt.removeEvent(n, r, e.handle);
                        n[Kt.expando] = void 0
                    }
                    n[Jt.expando] && (n[Jt.expando] = void 0)
                }
        }
    }), kt.fn.extend({
        detach: function(t) {
            return j(this, t, !0)
        },
        remove: function(t) {
            return j(this, t)
        },
        text: function(t) {
            return zt(this, function(t) {
                return void 0 === t ? kt.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
                })
            }, null, t, arguments.length)
        },
        append: function() {
            return N(this, arguments, function(t) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || I(this, t).appendChild(t)
            })
        },
        prepend: function() {
            return N(this, arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = I(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        },
        before: function() {
            return N(this, arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        },
        after: function() {
            return N(this, arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        },
        empty: function() {
            for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (kt.cleanData(x(t, !1)), t.textContent = "");
            return this
        },
        clone: function(t, e) {
            return t = null != t && t, e = null == e ? t : e, this.map(function() {
                return kt.clone(this, t, e)
            })
        },
        html: function(t) {
            return zt(this, function(t) {
                var e = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                if ("string" == typeof t && !he.test(t) && !de[(ue.exec(t) || ["", ""])[1].toLowerCase()]) {
                    t = kt.htmlPrefilter(t);
                    try {
                        for (; n < r; n++) 1 === (e = this[n] || {}).nodeType && (kt.cleanData(x(e, !1)), e.innerHTML = t);
                        e = 0
                    } catch (t) {}
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        },
        replaceWith: function() {
            var t = [];
            return N(this, arguments, function(e) {
                var n = this.parentNode;
                kt.inArray(this, t) < 0 && (kt.cleanData(x(this)), n && n.replaceChild(e, this))
            }, t)
        }
    }), kt.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, e) {
        kt.fn[t] = function(t) {
            for (var n, r = [], o = kt(t), i = o.length - 1, a = 0; a <= i; a++) n = a === i ? this : this.clone(!0), kt(o[a])[e](n), lt.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var ve = new RegExp("^(" + Yt + ")(?!px)[a-z%]+$", "i"),
        ye = /^--/,
        be = function(e) {
            var n = e.ownerDocument.defaultView;
            return n && n.opener || (n = t), n.getComputedStyle(e)
        },
        we = function(t, e, n) {
            var r, o, i = {};
            for (o in e) i[o] = t.style[o], t.style[o] = e[o];
            for (o in r = n.call(t), e) t.style[o] = i[o];
            return r
        },
        _e = new RegExp(te.join("|"), "i");
    ! function() {
        function e() {
            if (l) {
                u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ee.appendChild(u).appendChild(l);
                var e = t.getComputedStyle(l);
                r = "1%" !== e.top, c = 12 === n(e.marginLeft), l.style.right = "60%", a = 36 === n(e.right), o = 36 === n(e.width), l.style.position = "absolute", i = 12 === n(l.offsetWidth / 3), ee.removeChild(u), l = null
            }
        }

        function n(t) {
            return Math.round(parseFloat(t))
        }
        var r, o, i, a, s, c, u = wt.createElement("div"),
            l = wt.createElement("div");
        l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", vt.clearCloneStyle = "content-box" === l.style.backgroundClip, kt.extend(vt, {
            boxSizingReliable: function() {
                return e(), o
            },
            pixelBoxStyles: function() {
                return e(), a
            },
            pixelPosition: function() {
                return e(), r
            },
            reliableMarginLeft: function() {
                return e(), c
            },
            scrollboxSize: function() {
                return e(), i
            },
            reliableTrDimensions: function() {
                var e, n, r, o;
                return null == s && (e = wt.createElement("table"), n = wt.createElement("tr"), r = wt.createElement("div"), e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", n.style.cssText = "box-sizing:content-box;border:1px solid", n.style.height = "1px", r.style.height = "9px", r.style.display = "block", ee.appendChild(e).appendChild(n).appendChild(r), o = t.getComputedStyle(n), s = parseInt(o.height, 10) + parseInt(o.borderTopWidth, 10) + parseInt(o.borderBottomWidth, 10) === n.offsetHeight, ee.removeChild(e)), s
            }
        }))
    }();
    var xe = ["Webkit", "Moz", "ms"],
        Se = wt.createElement("div").style,
        ke = {},
        Ce = /^(none|table(?!-c[ea]).+)/,
        Te = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Ee = {
            letterSpacing: "0",
            fontWeight: "400"
        };
    kt.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var n = D(t, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            aspectRatio: !0,
            borderImageSlice: !0,
            columnCount: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            scale: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0
        },
        cssProps: {},
        style: function(t, e, n, r) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var o, i, a, s = m(e),
                    c = ye.test(e),
                    u = t.style;
                if (c || (e = q(s)), a = kt.cssHooks[e] || kt.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (o = a.get(t, !1, r)) ? o : u[e];
                "string" === (i = typeof n) && (o = Zt.exec(n)) && o[1] && (n = b(t, e, o), i = "number"), null != n && n == n && ("number" !== i || c || (n += o && o[3] || (kt.cssNumber[s] ? "" : "px")), vt.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (u[e] = "inherit"), a && "set" in a && void 0 === (n = a.set(t, n, r)) || (c ? u.setProperty(e, n) : u[e] = n))
            }
        },
        css: function(t, e, n, r) {
            var o, i, a, s = m(e);
            return ye.test(e) || (e = q(s)), (a = kt.cssHooks[e] || kt.cssHooks[s]) && "get" in a && (o = a.get(t, !0, n)), void 0 === o && (o = D(t, e, r)), "normal" === o && e in Ee && (o = Ee[e]), "" === n || n ? (i = parseFloat(o), !0 === n || isFinite(i) ? i || 0 : o) : o
        }
    }), kt.each(["height", "width"], function(t, e) {
        kt.cssHooks[e] = {
            get: function(t, n, r) {
                if (n) return !Ce.test(kt.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? B(t, e, r) : we(t, Te, function() {
                    return B(t, e, r)
                })
            },
            set: function(t, n, r) {
                var o, i = be(t),
                    a = !vt.scrollboxSize() && "absolute" === i.position,
                    s = (a || r) && "border-box" === kt.css(t, "boxSizing", !1, i),
                    c = r ? V(t, e, r, s, i) : 0;
                return s && a && (c -= Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - parseFloat(i[e]) - V(t, e, "border", !1, i) - .5)), c && (o = Zt.exec(n)) && "px" !== (o[3] || "px") && (t.style[e] = n, n = kt.css(t, e)), U(t, n, c)
            }
        }
    }), kt.cssHooks.marginLeft = L(vt.reliableMarginLeft, function(t, e) {
        if (e) return (parseFloat(D(t, "marginLeft")) || t.getBoundingClientRect().left - we(t, {
            marginLeft: 0
        }, function() {
            return t.getBoundingClientRect().left
        })) + "px"
    }), kt.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(t, e) {
        kt.cssHooks[t + e] = {
            expand: function(n) {
                for (var r = 0, o = {}, i = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) o[t + te[r] + e] = i[r] || i[r - 2] || i[0];
                return o
            }
        }, "margin" !== t && (kt.cssHooks[t + e].set = U)
    }), kt.fn.extend({
        css: function(t, e) {
            return zt(this, function(t, e, n) {
                var r, o, i = {},
                    a = 0;
                if (Array.isArray(e)) {
                    for (r = be(t), o = e.length; a < o; a++) i[e[a]] = kt.css(t, e[a], !1, r);
                    return i
                }
                return void 0 !== n ? kt.style(t, e, n) : kt.css(t, e)
            }, t, e, arguments.length > 1)
        }
    }), kt.Tween = F, F.prototype = {
        constructor: F,
        init: function(t, e, n, r, o, i) {
            this.elem = t, this.prop = n, this.easing = o || kt.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = r, this.unit = i || (kt.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var t = F.propHooks[this.prop];
            return t && t.get ? t.get(this) : F.propHooks._default.get(this)
        },
        run: function(t) {
            var e, n = F.propHooks[this.prop];
            return this.options.duration ? this.pos = e = kt.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : F.propHooks._default.set(this), this
        }
    }, F.prototype.init.prototype = F.prototype, F.propHooks = {
        _default: {
            get: function(t) {
                var e;
                return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = kt.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0
            },
            set: function(t) {
                kt.fx.step[t.prop] ? kt.fx.step[t.prop](t) : 1 !== t.elem.nodeType || !kt.cssHooks[t.prop] && null == t.elem.style[q(t.prop)] ? t.elem[t.prop] = t.now : kt.style(t.elem, t.prop, t.now + t.unit)
            }
        }
    }, F.propHooks.scrollTop = F.propHooks.scrollLeft = {
        set: function(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, kt.easing = {
        linear: function(t) {
            return t
        },
        swing: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        },
        _default: "swing"
    }, kt.fx = F.prototype.init, kt.fx.step = {};
    var Ae, Ie, Oe = /^(?:toggle|show|hide)$/,
        Re = /queueHooks$/;
    kt.Animation = kt.extend(Q, {
            tweeners: {
                "*": [function(t, e) {
                    var n = this.createTween(t, e);
                    return b(n.elem, t, Zt.exec(e), n), n
                }]
            },
            tweener: function(t, e) {
                yt(t) ? (e = t, t = ["*"]) : t = t.match(Vt);
                for (var n, r = 0, o = t.length; r < o; r++) n = t[r], Q.tweeners[n] = Q.tweeners[n] || [], Q.tweeners[n].unshift(e)
            },
            prefilters: [K],
            prefilter: function(t, e) {
                e ? Q.prefilters.unshift(t) : Q.prefilters.push(t)
            }
        }), kt.speed = function(t, e, n) {
            var r = t && "object" == typeof t ? kt.extend({}, t) : {
                complete: n || !n && e || yt(t) && t,
                duration: t,
                easing: n && e || e && !yt(e) && e
            };
            return kt.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in kt.fx.speeds ? r.duration = kt.fx.speeds[r.duration] : r.duration = kt.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                yt(r.old) && r.old.call(this), r.queue && kt.dequeue(this, r.queue)
            }, r
        }, kt.fn.extend({
            fadeTo: function(t, e, n, r) {
                return this.filter(oe).css("opacity", 0).show().end().animate({
                    opacity: e
                }, t, n, r)
            },
            animate: function(t, e, n, r) {
                var o = kt.isEmptyObject(t),
                    i = kt.speed(e, n, r),
                    a = function() {
                        var e = Q(this, kt.extend({}, t), i);
                        (o || Kt.get(this, "finish")) && e.stop(!0)
                    };
                return a.finish = a, o || !1 === i.queue ? this.each(a) : this.queue(i.queue, a)
            },
            stop: function(t, e, n) {
                var r = function(t) {
                    var e = t.stop;
                    delete t.stop, e(n)
                };
                return "string" != typeof t && (n = e, e = t, t = void 0), e && this.queue(t || "fx", []), this.each(function() {
                    var e = !0,
                        o = null != t && t + "queueHooks",
                        i = kt.timers,
                        a = Kt.get(this);
                    if (o) a[o] && a[o].stop && r(a[o]);
                    else
                        for (o in a) a[o] && a[o].stop && Re.test(o) && r(a[o]);
                    for (o = i.length; o--;) i[o].elem !== this || null != t && i[o].queue !== t || (i[o].anim.stop(n), e = !1, i.splice(o, 1));
                    !e && n || kt.dequeue(this, t)
                })
            },
            finish: function(t) {
                return !1 !== t && (t = t || "fx"), this.each(function() {
                    var e, n = Kt.get(this),
                        r = n[t + "queue"],
                        o = n[t + "queueHooks"],
                        i = kt.timers,
                        a = r ? r.length : 0;
                    for (n.finish = !0, kt.queue(this, t, []), o && o.stop && o.stop.call(this, !0), e = i.length; e--;) i[e].elem === this && i[e].queue === t && (i[e].anim.stop(!0), i.splice(e, 1));
                    for (e = 0; e < a; e++) r[e] && r[e].finish && r[e].finish.call(this);
                    delete n.finish
                })
            }
        }), kt.each(["toggle", "show", "hide"], function(t, e) {
            var n = kt.fn[e];
            kt.fn[e] = function(t, r, o) {
                return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(W(e, !0), t, r, o)
            }
        }), kt.each({
            slideDown: W("show"),
            slideUp: W("hide"),
            slideToggle: W("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(t, e) {
            kt.fn[t] = function(t, n, r) {
                return this.animate(e, t, n, r)
            }
        }), kt.timers = [], kt.fx.tick = function() {
            var t, e = 0,
                n = kt.timers;
            for (Ae = Date.now(); e < n.length; e++)(t = n[e])() || n[e] !== t || n.splice(e--, 1);
            n.length || kt.fx.stop(), Ae = void 0
        }, kt.fx.timer = function(t) {
            kt.timers.push(t), kt.fx.start()
        }, kt.fx.interval = 13, kt.fx.start = function() {
            Ie || (Ie = !0, z())
        }, kt.fx.stop = function() {
            Ie = null
        }, kt.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, kt.fn.delay = function(e, n) {
            return e = kt.fx && kt.fx.speeds[e] || e, n = n || "fx", this.queue(n, function(n, r) {
                var o = t.setTimeout(n, e);
                r.stop = function() {
                    t.clearTimeout(o)
                }
            })
        },
        function() {
            var t = wt.createElement("input"),
                e = wt.createElement("select").appendChild(wt.createElement("option"));
            t.type = "checkbox", vt.checkOn = "" !== t.value, vt.optSelected = e.selected, (t = wt.createElement("input")).value = "t", t.type = "radio", vt.radioValue = "t" === t.value
        }();
    var Me, Pe = kt.expr.attrHandle;
    kt.fn.extend({
        attr: function(t, e) {
            return zt(this, kt.attr, t, e, arguments.length > 1)
        },
        removeAttr: function(t) {
            return this.each(function() {
                kt.removeAttr(this, t)
            })
        }
    }), kt.extend({
        attr: function(t, e, n) {
            var r, o, i = t.nodeType;
            if (3 !== i && 8 !== i && 2 !== i) return void 0 === t.getAttribute ? kt.prop(t, e, n) : (1 === i && kt.isXMLDoc(t) || (o = kt.attrHooks[e.toLowerCase()] || (kt.expr.match.bool.test(e) ? Me : void 0)), void 0 !== n ? null === n ? void kt.removeAttr(t, e) : o && "set" in o && void 0 !== (r = o.set(t, n, e)) ? r : (t.setAttribute(e, n + ""), n) : o && "get" in o && null !== (r = o.get(t, e)) ? r : null == (r = kt.find.attr(t, e)) ? void 0 : r)
        },
        attrHooks: {
            type: {
                set: function(t, e) {
                    if (!vt.radioValue && "radio" === e && i(t, "input")) {
                        var n = t.value;
                        return t.setAttribute("type", e), n && (t.value = n), e
                    }
                }
            }
        },
        removeAttr: function(t, e) {
            var n, r = 0,
                o = e && e.match(Vt);
            if (o && 1 === t.nodeType)
                for (; n = o[r++];) t.removeAttribute(n)
        }
    }), Me = {
        set: function(t, e, n) {
            return !1 === e ? kt.removeAttr(t, n) : t.setAttribute(n, n), n
        }
    }, kt.each(kt.expr.match.bool.source.match(/\w+/g), function(t, e) {
        var n = Pe[e] || kt.find.attr;
        Pe[e] = function(t, e, r) {
            var o, i, a = e.toLowerCase();
            return r || (i = Pe[a], Pe[a] = o, o = null != n(t, e, r) ? a : null, Pe[a] = i), o
        }
    });
    var Ne = /^(?:input|select|textarea|button)$/i,
        je = /^(?:a|area)$/i;
    kt.fn.extend({
        prop: function(t, e) {
            return zt(this, kt.prop, t, e, arguments.length > 1)
        },
        removeProp: function(t) {
            return this.each(function() {
                delete this[kt.propFix[t] || t]
            })
        }
    }), kt.extend({
        prop: function(t, e, n) {
            var r, o, i = t.nodeType;
            if (3 !== i && 8 !== i && 2 !== i) return 1 === i && kt.isXMLDoc(t) || (e = kt.propFix[e] || e, o = kt.propHooks[e]), void 0 !== n ? o && "set" in o && void 0 !== (r = o.set(t, n, e)) ? r : t[e] = n : o && "get" in o && null !== (r = o.get(t, e)) ? r : t[e]
        },
        propHooks: {
            tabIndex: {
                get: function(t) {
                    var e = kt.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : Ne.test(t.nodeName) || je.test(t.nodeName) && t.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), vt.optSelected || (kt.propHooks.selected = {
        get: function(t) {
            var e = t.parentNode;
            return e && e.parentNode && e.parentNode.selectedIndex, null
        },
        set: function(t) {
            var e = t.parentNode;
            e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
        }
    }), kt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        kt.propFix[this.toLowerCase()] = this
    }), kt.fn.extend({
        addClass: function(t) {
            var e, n, r, o, i, a;
            return yt(t) ? this.each(function(e) {
                kt(this).addClass(t.call(this, e, Y(this)))
            }) : (e = Z(t)).length ? this.each(function() {
                if (r = Y(this), n = 1 === this.nodeType && " " + X(r) + " ") {
                    for (i = 0; i < e.length; i++) o = e[i], n.indexOf(" " + o + " ") < 0 && (n += o + " ");
                    a = X(n), r !== a && this.setAttribute("class", a)
                }
            }) : this
        },
        removeClass: function(t) {
            var e, n, r, o, i, a;
            return yt(t) ? this.each(function(e) {
                kt(this).removeClass(t.call(this, e, Y(this)))
            }) : arguments.length ? (e = Z(t)).length ? this.each(function() {
                if (r = Y(this), n = 1 === this.nodeType && " " + X(r) + " ") {
                    for (i = 0; i < e.length; i++)
                        for (o = e[i]; n.indexOf(" " + o + " ") > -1;) n = n.replace(" " + o + " ", " ");
                    a = X(n), r !== a && this.setAttribute("class", a)
                }
            }) : this : this.attr("class", "")
        },
        toggleClass: function(t, e) {
            var n, r, o, i, a = typeof t,
                s = "string" === a || Array.isArray(t);
            return yt(t) ? this.each(function(n) {
                kt(this).toggleClass(t.call(this, n, Y(this), e), e)
            }) : "boolean" == typeof e && s ? e ? this.addClass(t) : this.removeClass(t) : (n = Z(t), this.each(function() {
                if (s)
                    for (i = kt(this), o = 0; o < n.length; o++) r = n[o], i.hasClass(r) ? i.removeClass(r) : i.addClass(r);
                else void 0 !== t && "boolean" !== a || ((r = Y(this)) && Kt.set(this, "__className__", r), this.setAttribute && this.setAttribute("class", r || !1 === t ? "" : Kt.get(this, "__className__") || ""))
            }))
        },
        hasClass: function(t) {
            var e, n, r = 0;
            for (e = " " + t + " "; n = this[r++];)
                if (1 === n.nodeType && (" " + X(Y(n)) + " ").indexOf(e) > -1) return !0;
            return !1
        }
    });
    var De = /\r/g;
    kt.fn.extend({
        val: function(t) {
            var e, n, r, o = this[0];
            return arguments.length ? (r = yt(t), this.each(function(n) {
                var o;
                1 === this.nodeType && (null == (o = r ? t.call(this, n, kt(this).val()) : t) ? o = "" : "number" == typeof o ? o += "" : Array.isArray(o) && (o = kt.map(o, function(t) {
                    return null == t ? "" : t + ""
                })), (e = kt.valHooks[this.type] || kt.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, o, "value") || (this.value = o))
            })) : o ? (e = kt.valHooks[o.type] || kt.valHooks[o.nodeName.toLowerCase()]) && "get" in e && void 0 !== (n = e.get(o, "value")) ? n : "string" == typeof(n = o.value) ? n.replace(De, "") : null == n ? "" : n : void 0
        }
    }), kt.extend({
        valHooks: {
            option: {
                get: function(t) {
                    var e = kt.find.attr(t, "value");
                    return null != e ? e : X(kt.text(t))
                }
            },
            select: {
                get: function(t) {
                    var e, n, r, o = t.options,
                        a = t.selectedIndex,
                        s = "select-one" === t.type,
                        c = s ? null : [],
                        u = s ? a + 1 : o.length;
                    for (r = a < 0 ? u : s ? a : 0; r < u; r++)
                        if (((n = o[r]).selected || r === a) && !n.disabled && (!n.parentNode.disabled || !i(n.parentNode, "optgroup"))) {
                            if (e = kt(n).val(), s) return e;
                            c.push(e)
                        }
                    return c
                },
                set: function(t, e) {
                    for (var n, r, o = t.options, i = kt.makeArray(e), a = o.length; a--;)((r = o[a]).selected = kt.inArray(kt.valHooks.option.get(r), i) > -1) && (n = !0);
                    return n || (t.selectedIndex = -1), i
                }
            }
        }
    }), kt.each(["radio", "checkbox"], function() {
        kt.valHooks[this] = {
            set: function(t, e) {
                if (Array.isArray(e)) return t.checked = kt.inArray(kt(t).val(), e) > -1
            }
        }, vt.checkOn || (kt.valHooks[this].get = function(t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    });
    var Le = t.location,
        $e = {
            guid: Date.now()
        },
        qe = /\?/;
    kt.parseXML = function(e) {
        var n, r;
        if (!e || "string" != typeof e) return null;
        try {
            n = (new t.DOMParser).parseFromString(e, "text/xml")
        } catch (t) {}
        return r = n && n.getElementsByTagName("parsererror")[0], n && !r || kt.error("Invalid XML: " + (r ? kt.map(r.childNodes, function(t) {
            return t.textContent
        }).join("\n") : e)), n
    };
    var Ue = /^(?:focusinfocus|focusoutblur)$/,
        Ve = function(t) {
            t.stopPropagation()
        };
    kt.extend(kt.event, {
        trigger: function(e, n, r, o) {
            var i, a, s, c, u, l, d, f, p = [r || wt],
                h = ht.call(e, "type") ? e.type : e,
                m = ht.call(e, "namespace") ? e.namespace.split(".") : [];
            if (a = f = s = r = r || wt, 3 !== r.nodeType && 8 !== r.nodeType && !Ue.test(h + kt.event.triggered) && (h.indexOf(".") > -1 && (m = h.split("."), h = m.shift(), m.sort()), u = h.indexOf(":") < 0 && "on" + h, (e = e[kt.expando] ? e : new kt.Event(h, "object" == typeof e && e)).isTrigger = o ? 2 : 3, e.namespace = m.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = r), n = null == n ? [e] : kt.makeArray(n, [e]), d = kt.event.special[h] || {}, o || !d.trigger || !1 !== d.trigger.apply(r, n))) {
                if (!o && !d.noBubble && !bt(r)) {
                    for (c = d.delegateType || h, Ue.test(c + h) || (a = a.parentNode); a; a = a.parentNode) p.push(a), s = a;
                    s === (r.ownerDocument || wt) && p.push(s.defaultView || s.parentWindow || t)
                }
                for (i = 0;
                    (a = p[i++]) && !e.isPropagationStopped();) f = a, e.type = i > 1 ? c : d.bindType || h, (l = (Kt.get(a, "events") || Object.create(null))[e.type] && Kt.get(a, "handle")) && l.apply(a, n), (l = u && a[u]) && l.apply && Gt(a) && (e.result = l.apply(a, n), !1 === e.result && e.preventDefault());
                return e.type = h, o || e.isDefaultPrevented() || d._default && !1 !== d._default.apply(p.pop(), n) || !Gt(r) || u && yt(r[h]) && !bt(r) && ((s = r[u]) && (r[u] = null), kt.event.triggered = h, e.isPropagationStopped() && f.addEventListener(h, Ve), r[h](), e.isPropagationStopped() && f.removeEventListener(h, Ve), kt.event.triggered = void 0, s && (r[u] = s)), e.result
            }
        },
        simulate: function(t, e, n) {
            var r = kt.extend(new kt.Event, n, {
                type: t,
                isSimulated: !0
            });
            kt.event.trigger(r, null, e)
        }
    }), kt.fn.extend({
        trigger: function(t, e) {
            return this.each(function() {
                kt.event.trigger(t, e, this)
            })
        },
        triggerHandler: function(t, e) {
            var n = this[0];
            if (n) return kt.event.trigger(t, e, n, !0)
        }
    });
    var Be = /\[\]$/,
        Fe = /\r?\n/g,
        ze = /^(?:submit|button|image|reset|file)$/i,
        He = /^(?:input|select|textarea|keygen)/i;
    kt.param = function(t, e) {
        var n, r = [],
            o = function(t, e) {
                var n = yt(e) ? e() : e;
                r[r.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (null == t) return "";
        if (Array.isArray(t) || t.jquery && !kt.isPlainObject(t)) kt.each(t, function() {
            o(this.name, this.value)
        });
        else
            for (n in t) tt(n, t[n], e, o);
        return r.join("&")
    }, kt.fn.extend({
        serialize: function() {
            return kt.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var t = kt.prop(this, "elements");
                return t ? kt.makeArray(t) : this
            }).filter(function() {
                var t = this.type;
                return this.name && !kt(this).is(":disabled") && He.test(this.nodeName) && !ze.test(t) && (this.checked || !ce.test(t))
            }).map(function(t, e) {
                var n = kt(this).val();
                return null == n ? null : Array.isArray(n) ? kt.map(n, function(t) {
                    return {
                        name: e.name,
                        value: t.replace(Fe, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: n.replace(Fe, "\r\n")
                }
            }).get()
        }
    });
    var We = /%20/g,
        Ge = /#.*$/,
        Ke = /([?&])_=[^&]*/,
        Je = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Qe = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Xe = /^(?:GET|HEAD)$/,
        Ye = /^\/\//,
        Ze = {},
        tn = {},
        en = "*/".concat("*"),
        nn = wt.createElement("a");
    nn.href = Le.href, kt.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Le.href,
            type: "GET",
            isLocal: Qe.test(Le.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": en,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": kt.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(t, e) {
            return e ? rt(rt(t, kt.ajaxSettings), e) : rt(kt.ajaxSettings, t)
        },
        ajaxPrefilter: et(Ze),
        ajaxTransport: et(tn),
        ajax: function(e, n) {
            function r(e, n, r, s) {
                var u, f, p, w, _, x = n;
                l || (l = !0, c && t.clearTimeout(c), o = void 0, a = s || "", S.readyState = e > 0 ? 4 : 0, u = e >= 200 && e < 300 || 304 === e, r && (w = ot(h, S, r)), !u && kt.inArray("script", h.dataTypes) > -1 && kt.inArray("json", h.dataTypes) < 0 && (h.converters["text script"] = function() {}), w = it(h, w, S, u), u ? (h.ifModified && ((_ = S.getResponseHeader("Last-Modified")) && (kt.lastModified[i] = _), (_ = S.getResponseHeader("etag")) && (kt.etag[i] = _)), 204 === e || "HEAD" === h.type ? x = "nocontent" : 304 === e ? x = "notmodified" : (x = w.state, f = w.data, u = !(p = w.error))) : (p = x, !e && x || (x = "error", e < 0 && (e = 0))), S.status = e, S.statusText = (n || x) + "", u ? v.resolveWith(m, [f, x, S]) : v.rejectWith(m, [S, x, p]), S.statusCode(b), b = void 0, d && g.trigger(u ? "ajaxSuccess" : "ajaxError", [S, h, u ? f : p]), y.fireWith(m, [S, x]), d && (g.trigger("ajaxComplete", [S, h]), --kt.active || kt.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (n = e, e = void 0), n = n || {};
            var o, i, a, s, c, u, l, d, f, p, h = kt.ajaxSetup({}, n),
                m = h.context || h,
                g = h.context && (m.nodeType || m.jquery) ? kt(m) : kt.event,
                v = kt.Deferred(),
                y = kt.Callbacks("once memory"),
                b = h.statusCode || {},
                w = {},
                _ = {},
                x = "canceled",
                S = {
                    readyState: 0,
                    getResponseHeader: function(t) {
                        var e;
                        if (l) {
                            if (!s)
                                for (s = {}; e = Je.exec(a);) s[e[1].toLowerCase() + " "] = (s[e[1].toLowerCase() + " "] || []).concat(e[2]);
                            e = s[t.toLowerCase() + " "]
                        }
                        return null == e ? null : e.join(", ")
                    },
                    getAllResponseHeaders: function() {
                        return l ? a : null
                    },
                    setRequestHeader: function(t, e) {
                        return null == l && (t = _[t.toLowerCase()] = _[t.toLowerCase()] || t, w[t] = e), this
                    },
                    overrideMimeType: function(t) {
                        return null == l && (h.mimeType = t), this
                    },
                    statusCode: function(t) {
                        var e;
                        if (t)
                            if (l) S.always(t[S.status]);
                            else
                                for (e in t) b[e] = [b[e], t[e]];
                        return this
                    },
                    abort: function(t) {
                        var e = t || x;
                        return o && o.abort(e), r(0, e), this
                    }
                };
            if (v.promise(S), h.url = ((e || h.url || Le.href) + "").replace(Ye, Le.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(Vt) || [""], null == h.crossDomain) {
                u = wt.createElement("a");
                try {
                    u.href = h.url, u.href = u.href, h.crossDomain = nn.protocol + "//" + nn.host != u.protocol + "//" + u.host
                } catch (t) {
                    h.crossDomain = !0
                }
            }
            if (h.data && h.processData && "string" != typeof h.data && (h.data = kt.param(h.data, h.traditional)), nt(Ze, h, n, S), l) return S;
            for (f in (d = kt.event && h.global) && 0 === kt.active++ && kt.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Xe.test(h.type), i = h.url.replace(Ge, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(We, "+")) : (p = h.url.slice(i.length), h.data && (h.processData || "string" == typeof h.data) && (i += (qe.test(i) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (i = i.replace(Ke, "$1"), p = (qe.test(i) ? "&" : "?") + "_=" + $e.guid++ + p), h.url = i + p), h.ifModified && (kt.lastModified[i] && S.setRequestHeader("If-Modified-Since", kt.lastModified[i]), kt.etag[i] && S.setRequestHeader("If-None-Match", kt.etag[i])), (h.data && h.hasContent && !1 !== h.contentType || n.contentType) && S.setRequestHeader("Content-Type", h.contentType), S.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + en + "; q=0.01" : "") : h.accepts["*"]), h.headers) S.setRequestHeader(f, h.headers[f]);
            if (h.beforeSend && (!1 === h.beforeSend.call(m, S, h) || l)) return S.abort();
            if (x = "abort", y.add(h.complete), S.done(h.success), S.fail(h.error), o = nt(tn, h, n, S)) {
                if (S.readyState = 1, d && g.trigger("ajaxSend", [S, h]), l) return S;
                h.async && h.timeout > 0 && (c = t.setTimeout(function() {
                    S.abort("timeout")
                }, h.timeout));
                try {
                    l = !1, o.send(w, r)
                } catch (t) {
                    if (l) throw t;
                    r(-1, t)
                }
            } else r(-1, "No Transport");
            return S
        },
        getJSON: function(t, e, n) {
            return kt.get(t, e, n, "json")
        },
        getScript: function(t, e) {
            return kt.get(t, void 0, e, "script")
        }
    }), kt.each(["get", "post"], function(t, e) {
        kt[e] = function(t, n, r, o) {
            return yt(n) && (o = o || r, r = n, n = void 0), kt.ajax(kt.extend({
                url: t,
                type: e,
                dataType: o,
                data: n,
                success: r
            }, kt.isPlainObject(t) && t))
        }
    }), kt.ajaxPrefilter(function(t) {
        var e;
        for (e in t.headers) "content-type" === e.toLowerCase() && (t.contentType = t.headers[e] || "")
    }), kt._evalUrl = function(t, e, n) {
        return kt.ajax({
            url: t,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: {
                "text script": function() {}
            },
            dataFilter: function(t) {
                kt.globalEval(t, e, n)
            }
        })
    }, kt.fn.extend({
        wrapAll: function(t) {
            var e;
            return this[0] && (yt(t) && (t = t.call(this[0])), e = kt(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                return t
            }).append(this)), this
        },
        wrapInner: function(t) {
            return yt(t) ? this.each(function(e) {
                kt(this).wrapInner(t.call(this, e))
            }) : this.each(function() {
                var e = kt(this),
                    n = e.contents();
                n.length ? n.wrapAll(t) : e.append(t)
            })
        },
        wrap: function(t) {
            var e = yt(t);
            return this.each(function(n) {
                kt(this).wrapAll(e ? t.call(this, n) : t)
            })
        },
        unwrap: function(t) {
            return this.parent(t).not("body").each(function() {
                kt(this).replaceWith(this.childNodes)
            }), this
        }
    }), kt.expr.pseudos.hidden = function(t) {
        return !kt.expr.pseudos.visible(t)
    }, kt.expr.pseudos.visible = function(t) {
        return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
    }, kt.ajaxSettings.xhr = function() {
        try {
            return new t.XMLHttpRequest
        } catch (t) {}
    };
    var rn = {
            0: 200,
            1223: 204
        },
        on = kt.ajaxSettings.xhr();
    vt.cors = !!on && "withCredentials" in on, vt.ajax = on = !!on, kt.ajaxTransport(function(e) {
        var n, r;
        if (vt.cors || on && !e.crossDomain) return {
            send: function(o, i) {
                var a, s = e.xhr();
                if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                    for (a in e.xhrFields) s[a] = e.xhrFields[a];
                for (a in e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest"), o) s.setRequestHeader(a, o[a]);
                n = function(t) {
                    return function() {
                        n && (n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === t ? s.abort() : "error" === t ? "number" != typeof s.status ? i(0, "error") : i(s.status, s.statusText) : i(rn[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                            binary: s.response
                        } : {
                            text: s.responseText
                        }, s.getAllResponseHeaders()))
                    }
                }, s.onload = n(), r = s.onerror = s.ontimeout = n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                    4 === s.readyState && t.setTimeout(function() {
                        n && r()
                    })
                }, n = n("abort");
                try {
                    s.send(e.hasContent && e.data || null)
                } catch (t) {
                    if (n) throw t
                }
            },
            abort: function() {
                n && n()
            }
        }
    }), kt.ajaxPrefilter(function(t) {
        t.crossDomain && (t.contents.script = !1)
    }), kt.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(t) {
                return kt.globalEval(t), t
            }
        }
    }), kt.ajaxPrefilter("script", function(t) {
        void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
    }), kt.ajaxTransport("script", function(t) {
        var e, n;
        if (t.crossDomain || t.scriptAttrs) return {
            send: function(r, o) {
                e = kt("<script>").attr(t.scriptAttrs || {}).prop({
                    charset: t.scriptCharset,
                    src: t.url
                }).on("load error", n = function(t) {
                    e.remove(), n = null, t && o("error" === t.type ? 404 : 200, t.type)
                }), wt.head.appendChild(e[0])
            },
            abort: function() {
                n && n()
            }
        }
    });
    var an, sn = [],
        cn = /(=)\?(?=&|$)|\?\?/;
    kt.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var t = sn.pop() || kt.expando + "_" + $e.guid++;
            return this[t] = !0, t
        }
    }), kt.ajaxPrefilter("json jsonp", function(e, n, r) {
        var o, i, a, s = !1 !== e.jsonp && (cn.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && cn.test(e.data) && "data");
        if (s || "jsonp" === e.dataTypes[0]) return o = e.jsonpCallback = yt(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(cn, "$1" + o) : !1 !== e.jsonp && (e.url += (qe.test(e.url) ? "&" : "?") + e.jsonp + "=" + o), e.converters["script json"] = function() {
            return a || kt.error(o + " was not called"), a[0]
        }, e.dataTypes[0] = "json", i = t[o], t[o] = function() {
            a = arguments
        }, r.always(function() {
            void 0 === i ? kt(t).removeProp(o) : t[o] = i, e[o] && (e.jsonpCallback = n.jsonpCallback, sn.push(o)), a && yt(i) && i(a[0]), a = i = void 0
        }), "script"
    }), vt.createHTMLDocument = ((an = wt.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === an.childNodes.length), kt.parseHTML = function(t, e, n) {
        return "string" != typeof t ? [] : ("boolean" == typeof e && (n = e, e = !1), e || (vt.createHTMLDocument ? ((r = (e = wt.implementation.createHTMLDocument("")).createElement("base")).href = wt.location.href, e.head.appendChild(r)) : e = wt), i = !n && [], (o = Dt.exec(t)) ? [e.createElement(o[1])] : (o = k([t], e, i), i && i.length && kt(i).remove(), kt.merge([], o.childNodes)));
        var r, o, i
    }, kt.fn.load = function(t, e, n) {
        var r, o, i, a = this,
            s = t.indexOf(" ");
        return s > -1 && (r = X(t.slice(s)), t = t.slice(0, s)), yt(e) ? (n = e, e = void 0) : e && "object" == typeof e && (o = "POST"), a.length > 0 && kt.ajax({
            url: t,
            type: o || "GET",
            dataType: "html",
            data: e
        }).done(function(t) {
            i = arguments, a.html(r ? kt("<div>").append(kt.parseHTML(t)).find(r) : t)
        }).always(n && function(t, e) {
            a.each(function() {
                n.apply(this, i || [t.responseText, e, t])
            })
        }), this
    }, kt.expr.pseudos.animated = function(t) {
        return kt.grep(kt.timers, function(e) {
            return t === e.elem
        }).length
    }, kt.offset = {
        setOffset: function(t, e, n) {
            var r, o, i, a, s, c, u = kt.css(t, "position"),
                l = kt(t),
                d = {};
            "static" === u && (t.style.position = "relative"), s = l.offset(), i = kt.css(t, "top"), c = kt.css(t, "left"), ("absolute" === u || "fixed" === u) && (i + c).indexOf("auto") > -1 ? (a = (r = l.position()).top, o = r.left) : (a = parseFloat(i) || 0, o = parseFloat(c) || 0), yt(e) && (e = e.call(t, n, kt.extend({}, s))), null != e.top && (d.top = e.top - s.top + a), null != e.left && (d.left = e.left - s.left + o), "using" in e ? e.using.call(t, d) : l.css(d)
        }
    }, kt.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                kt.offset.setOffset(this, t, e)
            });
            var e, n, r = this[0];
            return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                top: e.top + n.pageYOffset,
                left: e.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var t, e, n, r = this[0],
                    o = {
                        top: 0,
                        left: 0
                    };
                if ("fixed" === kt.css(r, "position")) e = r.getBoundingClientRect();
                else {
                    for (e = this.offset(), n = r.ownerDocument, t = r.offsetParent || n.documentElement; t && (t === n.body || t === n.documentElement) && "static" === kt.css(t, "position");) t = t.parentNode;
                    t && t !== r && 1 === t.nodeType && ((o = kt(t).offset()).top += kt.css(t, "borderTopWidth", !0), o.left += kt.css(t, "borderLeftWidth", !0))
                }
                return {
                    top: e.top - o.top - kt.css(r, "marginTop", !0),
                    left: e.left - o.left - kt.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent; t && "static" === kt.css(t, "position");) t = t.offsetParent;
                return t || ee
            })
        }
    }), kt.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, e) {
        var n = "pageYOffset" === e;
        kt.fn[t] = function(r) {
            return zt(this, function(t, r, o) {
                var i;
                if (bt(t) ? i = t : 9 === t.nodeType && (i = t.defaultView), void 0 === o) return i ? i[e] : t[r];
                i ? i.scrollTo(n ? i.pageXOffset : o, n ? o : i.pageYOffset) : t[r] = o
            }, t, r, arguments.length)
        }
    }), kt.each(["top", "left"], function(t, e) {
        kt.cssHooks[e] = L(vt.pixelPosition, function(t, n) {
            if (n) return n = D(t, e), ve.test(n) ? kt(t).position()[e] + "px" : n
        })
    }), kt.each({
        Height: "height",
        Width: "width"
    }, function(t, e) {
        kt.each({
            padding: "inner" + t,
            content: e,
            "": "outer" + t
        }, function(n, r) {
            kt.fn[r] = function(o, i) {
                var a = arguments.length && (n || "boolean" != typeof o),
                    s = n || (!0 === o || !0 === i ? "margin" : "border");
                return zt(this, function(e, n, o) {
                    var i;
                    return bt(e) ? 0 === r.indexOf("outer") ? e["inner" + t] : e.document.documentElement["client" + t] : 9 === e.nodeType ? (i = e.documentElement, Math.max(e.body["scroll" + t], i["scroll" + t], e.body["offset" + t], i["offset" + t], i["client" + t])) : void 0 === o ? kt.css(e, n, s) : kt.style(e, n, o, s)
                }, e, a ? o : void 0, a)
            }
        })
    }), kt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
        kt.fn[e] = function(t) {
            return this.on(e, t)
        }
    }), kt.fn.extend({
        bind: function(t, e, n) {
            return this.on(t, null, e, n)
        },
        unbind: function(t, e) {
            return this.off(t, null, e)
        },
        delegate: function(t, e, n, r) {
            return this.on(e, t, n, r)
        },
        undelegate: function(t, e, n) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
        },
        hover: function(t, e) {
            return this.on("mouseenter", t).on("mouseleave", e || t)
        }
    }), kt.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(t, e) {
        kt.fn[e] = function(t, n) {
            return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
        }
    });
    var un = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
    kt.proxy = function(t, e) {
        var n, r, o;
        if ("string" == typeof e && (n = t[e], e = t, t = n), yt(t)) return r = ct.call(arguments, 2), o = function() {
            return t.apply(e || this, r.concat(ct.call(arguments)))
        }, o.guid = t.guid = t.guid || kt.guid++, o
    }, kt.holdReady = function(t) {
        t ? kt.readyWait++ : kt.ready(!0)
    }, kt.isArray = Array.isArray, kt.parseJSON = JSON.parse, kt.nodeName = i, kt.isFunction = yt, kt.isWindow = bt, kt.camelCase = m, kt.type = r, kt.now = Date.now, kt.isNumeric = function(t) {
        var e = kt.type(t);
        return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
    }, kt.trim = function(t) {
        return null == t ? "" : (t + "").replace(un, "$1")
    }, "function" == typeof define && define.amd && define("jquery", [], function() {
        return kt
    });
    var ln = t.jQuery,
        dn = t.$;
    return kt.noConflict = function(e) {
        return t.$ === kt && (t.$ = dn), e && t.jQuery === kt && (t.jQuery = ln), kt
    }, void 0 === e && (t.jQuery = t.$ = kt), kt
}),
function() {
    "use strict";
    var t = function(t, e) {
        var n;
        t.rails !== e && t.error("jquery-ujs has already been loaded!");
        var r = t(document);
        t.rails = n = {
            linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
            buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
            inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
            formSubmitSelector: "form:not([data-turbo=true])",
            formInputClickSelector: "form:not([data-turbo=true]) input[type=submit], form:not([data-turbo=true]) input[type=image], form:not([data-turbo=true]) button[type=submit], form:not([data-turbo=true]) button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
            disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
            enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
            requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
            fileInputSelector: "input[name][type=file]:not([disabled])",
            linkDisableSelector: "a[data-disable-with], a[data-disable]",
            buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
            csrfToken: function() {
                return t("meta[name=csrf-token]").attr("content")
            },
            csrfParam: function() {
                return t("meta[name=csrf-param]").attr("content")
            },
            CSRFProtection: function(t) {
                var e = n.csrfToken();
                e && t.setRequestHeader("X-CSRF-Token", e)
            },
            refreshCSRFTokens: function() {
                t('form input[name="' + n.csrfParam() + '"]').val(n.csrfToken())
            },
            fire: function(e, n, r) {
                var o = t.Event(n);
                return e.trigger(o, r), !1 !== o.result
            },
            confirm: function(t) {
                return confirm(t)
            },
            ajax: function(e) {
                return t.ajax(e)
            },
            href: function(t) {
                return t[0].href
            },
            isRemote: function(t) {
                return t.data("remote") !== e && !1 !== t.data("remote")
            },
            handleRemote: function(r) {
                var o, i, a, s, c, u;
                if (n.fire(r, "ajax:before")) {
                    if (s = r.data("with-credentials") || null, c = r.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, r.is("form")) {
                        o = r.data("ujs:submit-button-formmethod") || r.attr("method"), i = r.data("ujs:submit-button-formaction") || r.attr("action"), a = t(r[0]).serializeArray();
                        var l = r.data("ujs:submit-button");
                        l && (a.push(l), r.data("ujs:submit-button", null)), r.data("ujs:submit-button-formmethod", null), r.data("ujs:submit-button-formaction", null)
                    } else r.is(n.inputChangeSelector) ? (o = r.data("method"), i = r.data("url"), a = r.serialize(), r.data("params") && (a = a + "&" + r.data("params"))) : r.is(n.buttonClickSelector) ? (o = r.data("method") || "get", i = r.data("url"), a = r.serialize(), r.data("params") && (a = a + "&" + r.data("params"))) : (o = r.data("method"), i = n.href(r), a = r.data("params") || null);
                    return u = {
                        type: o || "GET",
                        data: a,
                        dataType: c,
                        beforeSend: function(t, o) {
                            if (o.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + o.accepts.script), !n.fire(r, "ajax:beforeSend", [t, o])) return !1;
                            r.trigger("ajax:send", t)
                        },
                        success: function(t, e, n) {
                            r.trigger("ajax:success", [t, e, n])
                        },
                        complete: function(t, e) {
                            r.trigger("ajax:complete", [t, e])
                        },
                        error: function(t, e, n) {
                            r.trigger("ajax:error", [t, e, n])
                        },
                        crossDomain: n.isCrossDomain(i)
                    }, s && (u.xhrFields = {
                        withCredentials: s
                    }), i && (u.url = i), n.ajax(u)
                }
                return !1
            },
            isCrossDomain: function(t) {
                var e = document.createElement("a");
                e.href = location.href;
                var n = document.createElement("a");
                try {
                    return n.href = t, n.href = n.href, !((!n.protocol || ":" === n.protocol) && !n.host || e.protocol + "//" + e.host == n.protocol + "//" + n.host)
                } catch (t) {
                    return !0
                }
            },
            handleMethod: function(r) {
                var o = n.href(r),
                    i = r.data("method"),
                    a = r.attr("target"),
                    s = n.csrfToken(),
                    c = n.csrfParam(),
                    u = t('<form method="post" action="' + o + '"></form>'),
                    l = '<input name="_method" value="' + i + '" type="hidden" />';
                c === e || s === e || n.isCrossDomain(o) || (l += '<input name="' + c + '" value="' + s + '" type="hidden" />'), a && u.attr("target", a), u.hide().append(l).appendTo("body"), u.submit()
            },
            formElements: function(e, n) {
                return e.is("form") ? t(e[0].elements).filter(n) : e.find(n)
            },
            disableFormElements: function(e) {
                n.formElements(e, n.disableSelector).each(function() {
                    n.disableFormElement(t(this))
                })
            },
            disableFormElement: function(t) {
                var n, r;
                n = t.is("button") ? "html" : "val", (r = t.data("disable-with")) !== e && (t.data("ujs:enable-with", t[n]()), t[n](r)), t.prop("disabled", !0), t.data("ujs:disabled", !0)
            },
            enableFormElements: function(e) {
                n.formElements(e, n.enableSelector).each(function() {
                    n.enableFormElement(t(this))
                })
            },
            enableFormElement: function(t) {
                var n = t.is("button") ? "html" : "val";
                t.data("ujs:enable-with") !== e && (t[n](t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.prop("disabled", !1), t.removeData("ujs:disabled")
            },
            allowAction: function(t) {
                var e, r = t.data("confirm"),
                    o = !1;
                if (!r) return !0;
                if (n.fire(t, "confirm")) {
                    try {
                        o = n.confirm(r)
                    } catch (t) {
                        (console.error || console.log).call(console, t.stack || t)
                    }
                    e = n.fire(t, "confirm:complete", [o])
                }
                return o && e
            },
            blankInputs: function(e, n, r) {
                var o, i, a, s = t(),
                    c = n || "input,textarea",
                    u = e.find(c),
                    l = {};
                return u.each(function() {
                    (o = t(this)).is("input[type=radio]") ? (a = o.attr("name"), l[a] || (0 === e.find('input[type=radio]:checked[name="' + a + '"]').length && (i = e.find('input[type=radio][name="' + a + '"]'), s = s.add(i)), l[a] = a)) : (o.is("input[type=checkbox],input[type=radio]") ? o.is(":checked") : !!o.val()) === r && (s = s.add(o))
                }), !!s.length && s
            },
            nonBlankInputs: function(t, e) {
                return n.blankInputs(t, e, !0)
            },
            stopEverything: function(e) {
                return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
            },
            disableElement: function(t) {
                var r = t.data("disable-with");
                r !== e && (t.data("ujs:enable-with", t.html()), t.html(r)), t.on("click.railsDisable", function(t) {
                    return n.stopEverything(t)
                }), t.data("ujs:disabled", !0)
            },
            enableElement: function(t) {
                t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.off("click.railsDisable"), t.removeData("ujs:disabled")
            }
        }, n.fire(r, "rails:attachBindings") && (t.ajaxPrefilter(function(t, e, r) {
            t.crossDomain || n.CSRFProtection(r)
        }), t(window).on("pageshow.rails", function() {
            t(t.rails.enableSelector).each(function() {
                var e = t(this);
                e.data("ujs:disabled") && t.rails.enableFormElement(e)
            }), t(t.rails.linkDisableSelector).each(function() {
                var e = t(this);
                e.data("ujs:disabled") && t.rails.enableElement(e)
            })
        }), r.on("ajax:complete", n.linkDisableSelector, function() {
            n.enableElement(t(this))
        }), r.on("ajax:complete", n.buttonDisableSelector, function() {
            n.enableFormElement(t(this))
        }), r.on("click.rails", n.linkClickSelector, function(e) {
            var r = t(this),
                o = r.data("method"),
                i = r.data("params"),
                a = e.metaKey || e.ctrlKey;
            if (!n.allowAction(r)) return n.stopEverything(e);
            if (!a && r.is(n.linkDisableSelector) && n.disableElement(r), n.isRemote(r)) {
                if (a && (!o || "GET" === o) && !i) return !0;
                var s = n.handleRemote(r);
                return !1 === s ? n.enableElement(r) : s.fail(function() {
                    n.enableElement(r)
                }), !1
            }
            return o ? (n.handleMethod(r), !1) : void 0
        }), r.on("click.rails", n.buttonClickSelector, function(e) {
            var r = t(this);
            if (!n.allowAction(r) || !n.isRemote(r)) return n.stopEverything(e);
            r.is(n.buttonDisableSelector) && n.disableFormElement(r);
            var o = n.handleRemote(r);
            return !1 === o ? n.enableFormElement(r) : o.fail(function() {
                n.enableFormElement(r)
            }), !1
        }), r.on("change.rails", n.inputChangeSelector, function(e) {
            var r = t(this);
            return n.allowAction(r) && n.isRemote(r) ? (n.handleRemote(r), !1) : n.stopEverything(e)
        }), r.on("submit.rails", n.formSubmitSelector, function(r) {
            var o, i, a = t(this),
                s = n.isRemote(a);
            if (!n.allowAction(a)) return n.stopEverything(r);
            if (a.attr("novalidate") === e)
                if (a.data("ujs:formnovalidate-button") === e) {
                    if ((o = n.blankInputs(a, n.requiredInputSelector, !1)) && n.fire(a, "ajax:aborted:required", [o])) return n.stopEverything(r)
                } else a.data("ujs:formnovalidate-button", e);
            if (s) {
                if (i = n.nonBlankInputs(a, n.fileInputSelector)) {
                    setTimeout(function() {
                        n.disableFormElements(a)
                    }, 13);
                    var c = n.fire(a, "ajax:aborted:file", [i]);
                    return c || setTimeout(function() {
                        n.enableFormElements(a)
                    }, 13), c
                }
                return n.handleRemote(a), !1
            }
            setTimeout(function() {
                n.disableFormElements(a)
            }, 13)
        }), r.on("click.rails", n.formInputClickSelector, function(e) {
            var r = t(this);
            if (!n.allowAction(r)) return n.stopEverything(e);
            var o = r.attr("name"),
                i = o ? {
                    name: o,
                    value: r.val()
                } : null,
                a = r.closest("form");
            0 === a.length && (a = t("#" + r.attr("form"))), a.data("ujs:submit-button", i), a.data("ujs:formnovalidate-button", r.attr("formnovalidate")), a.data("ujs:submit-button-formaction", r.attr("formaction")), a.data("ujs:submit-button-formmethod", r.attr("formmethod"))
        }), r.on("ajax:send.rails", n.formSubmitSelector, function(e) {
            this === e.target && n.disableFormElements(t(this))
        }), r.on("ajax:complete.rails", n.formSubmitSelector, function(e) {
            this === e.target && n.enableFormElements(t(this))
        }), t(function() {
            n.refreshCSRFTokens()
        }))
    };
    window.jQuery ? t(jQuery) : "object" == typeof exports && "object" == typeof module && (module.exports = t)
}(),
function() {
    function t(t, e) {
        const n = e.getResponseHeader("X-CSRF-Token");
        n && document.querySelector('meta[name="csrf-token"]').setAttribute("content", n)
    }
    $(document).on("ajaxComplete", t)
}(),
function(t, e) {
    t.viewloader = e({}, t.jQuery || t.Zepto || t.$)
}(this, function(t, e) {
    "use strict";
    const n = function(t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
    };
    return t.execute = function(t, r) {
        (r ? r.find("[data-view]") : e("[data-view]")).each(function(r, o) {
            const i = e(o);
            i.data("view").split(" ").forEach(e => {
                (e = n(e)) && t[e] && new t[e](i, o)
            })
        })
    }, t
}), window.Market = {
        DOMUtils: {},
        Helpers: {},
        SpecialEvents: {},
        State: {},
        Validations: {}
    }, window.Views = {},
    function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? t(require("jquery")) : t(window.jQuery || window.Zepto)
    }(function(t) {
        var e, n, r, o, i, a, s = "Close",
            c = "BeforeClose",
            u = "AfterClose",
            l = "BeforeAppend",
            d = "MarkupParse",
            f = "Open",
            p = "Change",
            h = "mfp",
            m = "." + h,
            g = "mfp-ready",
            v = "mfp-removing",
            y = "mfp-prevent-close",
            b = function() {},
            w = !!window.jQuery,
            _ = t(window),
            x = function(t, n) {
                e.ev.on(h + t + m, n)
            },
            S = function(e, n, r, o) {
                var i = document.createElement("div");
                return i.className = "mfp-" + e, r && (i.innerHTML = r), o ? n && n.appendChild(i) : (i = t(i), n && i.appendTo(n)), i
            },
            k = function(t, n) {
                e.ev.triggerHandler(h + t, n), e.st.callbacks && (t = t.charAt(0).toLowerCase() + t.slice(1), e.st.callbacks[t] && e.st.callbacks[t].apply(e, Array.isArray(n) ? n : [n]))
            },
            C = function(n) {
                return n === a && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), a = n), e.currTemplate.closeBtn
            },
            T = function() {
                t.magnificPopup.instance || ((e = new b).init(), t.magnificPopup.instance = e)
            },
            E = function() {
                var t = document.createElement("p").style,
                    e = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== t.transition) return !0;
                for (; e.length;)
                    if (e.pop() + "Transition" in t) return !0;
                return !1
            };
        b.prototype = {
            constructor: b,
            init: function() {
                var n = navigator.appVersion;
                e.isLowIE = e.isIE8 = document.all && !document.addEventListener, e.isAndroid = /android/gi.test(n),
                    e.isIOS = /iphone|ipad|ipod/gi.test(n), e.supportsTransition = E(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), r = t(document), e.popupsCache = {}
            },
            open: function(n) {
                var o;
                if (!1 === n.isObj) {
                    e.items = n.items.toArray(), e.index = 0;
                    var a, s = n.items;
                    for (o = 0; o < s.length; o++)
                        if ((a = s[o]).parsed && (a = a.el[0]), a === n.el[0]) {
                            e.index = o;
                            break
                        }
                } else e.items = Array.isArray(n.items) ? n.items : [n.items], e.index = n.index || 0;
                if (!e.isOpen) {
                    e.types = [], i = "", n.mainEl && n.mainEl.length ? e.ev = n.mainEl.eq(0) : e.ev = r, n.key ? (e.popupsCache[n.key] || (e.popupsCache[n.key] = {}), e.currTemplate = e.popupsCache[n.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, n), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = S("bg").on("click" + m, function() {
                        e.close()
                    }), e.wrap = S("wrap").attr("tabindex", -1).on("click" + m, function(t) {
                        e._checkIfClose(t.target) && e.close()
                    }), e.container = S("container", e.wrap)), e.contentContainer = S("content"), e.st.preloader && (e.preloader = S("preloader", e.container, e.st.tLoading));
                    var c = t.magnificPopup.modules;
                    for (o = 0; o < c.length; o++) {
                        var u = c[o];
                        u = u.charAt(0).toUpperCase() + u.slice(1), e["init" + u].call(e)
                    }
                    k("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (x(d, function(t, e, n, r) {
                        n.close_replaceWith = C(r.type)
                    }), i += " mfp-close-btn-in") : e.wrap.append(C())), e.st.alignTop && (i += " mfp-align-top"), e.fixedContentPos ? e.wrap.css({
                        overflow: e.st.overflowY,
                        overflowX: "hidden",
                        overflowY: e.st.overflowY
                    }) : e.wrap.css({
                        top: _.scrollTop(),
                        position: "absolute"
                    }), (!1 === e.st.fixedBgPos || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
                        height: r.height(),
                        position: "absolute"
                    }), e.st.enableEscapeKey && r.on("keyup" + m, function(t) {
                        27 === t.keyCode && e.close()
                    }), _.on("resize" + m, function() {
                        e.updateSize()
                    }), e.st.closeOnContentClick || (i += " mfp-auto-cursor"), i && e.wrap.addClass(i);
                    var l = e.wH = _.height(),
                        p = {};
                    if (e.fixedContentPos && e._hasScrollBar(l)) {
                        var h = e._getScrollbarSize();
                        h && (p.marginRight = h)
                    }
                    e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : p.overflow = "hidden");
                    var v = e.st.mainClass;
                    return e.isIE7 && (v += " mfp-ie7"), v && e._addClassToMFP(v), e.updateItemHTML(), k("BuildControls"), t("html").css(p), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function() {
                        e.content ? (e._addClassToMFP(g), e._setFocus()) : e.bgOverlay.addClass(g), r.on("focusin" + m, e._onFocusIn)
                    }, 16), e.isOpen = !0, e.updateSize(l), k(f), n
                }
                e.updateItemHTML()
            },
            close: function() {
                e.isOpen && (k(c), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(v), setTimeout(function() {
                    e._close()
                }, e.st.removalDelay)) : e._close())
            },
            _close: function() {
                k(s);
                var n = v + " " + g + " ";
                if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (n += e.st.mainClass + " "), e._removeClassFromMFP(n), e.fixedContentPos) {
                    var o = {
                        marginRight: ""
                    };
                    e.isIE7 ? t("body, html").css("overflow", "") : o.overflow = "", t("html").css(o)
                }
                r.off("keyup" + m + " focusin" + m), e.ev.off(m), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && !0 !== e.currTemplate[e.currItem.type] || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).trigger("focus"), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, k(u)
            },
            updateSize: function(t) {
                if (e.isIOS) {
                    var n = document.documentElement.clientWidth / window.innerWidth,
                        r = window.innerHeight * n;
                    e.wrap.css("height", r), e.wH = r
                } else e.wH = t || _.height();
                e.fixedContentPos || e.wrap.css("height", e.wH), k("Resize")
            },
            updateItemHTML: function() {
                var n = e.items[e.index];
                e.contentContainer.detach(), e.content && e.content.detach(), n.parsed || (n = e.parseEl(e.index));
                var r = n.type;
                if (k("BeforeChange", [e.currItem ? e.currItem.type : "", r]), e.currItem = n, !e.currTemplate[r]) {
                    var i = !!e.st[r] && e.st[r].markup;
                    k("FirstMarkupParse", i), e.currTemplate[r] = !i || t(i)
                }
                o && o !== n.type && e.container.removeClass("mfp-" + o + "-holder");
                var a = e["get" + r.charAt(0).toUpperCase() + r.slice(1)](n, e.currTemplate[r]);
                e.appendContent(a, r), n.preloaded = !0, k(p, n), o = n.type, e.container.prepend(e.contentContainer), k("AfterChange")
            },
            appendContent: function(t, n) {
                e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && !0 === e.currTemplate[n] ? e.content.find(".mfp-close").length || e.content.append(C()) : e.content = t : e.content = "", k(l), e.container.addClass("mfp-" + n + "-holder"), e.contentContainer.append(e.content)
            },
            parseEl: function(n) {
                var r, o = e.items[n];
                if (o.tagName ? o = {
                        el: t(o)
                    } : (r = o.type, o = {
                        data: o,
                        src: o.src
                    }), o.el) {
                    for (var i = e.types, a = 0; a < i.length; a++)
                        if (o.el.hasClass("mfp-" + i[a])) {
                            r = i[a];
                            break
                        }
                    o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
                }
                return o.type = r || e.st.type || "inline", o.index = n, o.parsed = !0, e.items[n] = o, k("ElementParse", o), e.items[n]
            },
            addGroup: function(t, n) {
                var r = function(r) {
                    r.mfpEl = this, e._openClick(r, t, n)
                };
                n || (n = {});
                var o = "click.magnificPopup";
                n.mainEl = t, n.items ? (n.isObj = !0, t.off(o).on(o, r)) : (n.isObj = !1, n.delegate ? t.off(o).on(o, n.delegate, r) : (n.items = t, t.off(o).on(o, r)))
            },
            _openClick: function(n, r, o) {
                if ((void 0 !== o.midClick ? o.midClick : t.magnificPopup.defaults.midClick) || !(2 === n.which || n.ctrlKey || n.metaKey || n.altKey || n.shiftKey)) {
                    var i = void 0 !== o.disableOn ? o.disableOn : t.magnificPopup.defaults.disableOn;
                    if (i)
                        if ("function" == typeof i) {
                            if (!i.call(e)) return !0
                        } else if (_.width() < i) return !0;
                    n.type && (n.preventDefault(), e.isOpen && n.stopPropagation()), o.el = t(n.mfpEl), o.delegate && (o.items = r.find(o.delegate)), e.open(o)
                }
            },
            updateStatus: function(t, r) {
                if (e.preloader) {
                    n !== t && e.container.removeClass("mfp-s-" + n), r || "loading" !== t || (r = e.st.tLoading);
                    var o = {
                        status: t,
                        text: r
                    };
                    k("UpdateStatus", o), t = o.status, r = o.text, e.st.allowHTMLInStatusIndicator ? e.preloader.html(r) : e.preloader.text(r), e.preloader.find("a").on("click", function(t) {
                        t.stopImmediatePropagation()
                    }), e.container.addClass("mfp-s-" + t), n = t
                }
            },
            _checkIfClose: function(n) {
                if (!t(n).closest("." + y).length) {
                    var r = e.st.closeOnContentClick,
                        o = e.st.closeOnBgClick;
                    if (r && o) return !0;
                    if (!e.content || t(n).closest(".mfp-close").length || e.preloader && n === e.preloader[0]) return !0;
                    if (n === e.content[0] || t.contains(e.content[0], n)) {
                        if (r) return !0
                    } else if (o && t.contains(document, n)) return !0;
                    return !1
                }
            },
            _addClassToMFP: function(t) {
                e.bgOverlay.addClass(t), e.wrap.addClass(t)
            },
            _removeClassFromMFP: function(t) {
                this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
            },
            _hasScrollBar: function(t) {
                return (e.isIE7 ? r.height() : document.body.scrollHeight) > (t || _.height())
            },
            _setFocus: function() {
                (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).trigger("focus")
            },
            _onFocusIn: function(n) {
                if (n.target !== e.wrap[0] && !t.contains(e.wrap[0], n.target)) return e._setFocus(), !1
            },
            _parseMarkup: function(n, r, o) {
                var i;
                o.data && (r = t.extend(o.data, r)), k(d, [n, r, o]), t.each(r, function(r, o) {
                    if (void 0 === o || !1 === o) return !0;
                    if ((i = r.split("_")).length > 1) {
                        var a = n.find(m + "-" + i[0]);
                        if (a.length > 0) {
                            var s = i[1];
                            "replaceWith" === s ? a[0] !== o[0] && a.replaceWith(o) : "img" === s ? a.is("img") ? a.attr("src", o) : a.replaceWith(t("<img>").attr("src", o).attr("class", a.attr("class"))) : a.attr(i[1], o)
                        }
                    } else e.st.allowHTMLInTemplate ? n.find(m + "-" + r).html(o) : n.find(m + "-" + r).text(o)
                })
            },
            _getScrollbarSize: function() {
                if (void 0 === e.scrollbarSize) {
                    var t = document.createElement("div");
                    t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
                }
                return e.scrollbarSize
            }
        }, t.magnificPopup = {
            instance: null,
            proto: b.prototype,
            modules: [],
            open: function(e, n) {
                return T(), (e = e ? t.extend(!0, {}, e) : {}).isObj = !0, e.index = n || 0, this.instance.open(e)
            },
            close: function() {
                return t.magnificPopup.instance && t.magnificPopup.instance.close()
            },
            registerModule: function(e, n) {
                n.options && (t.magnificPopup.defaults[e] = n.options), t.extend(this.proto, n.proto), this.modules.push(e)
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                prependTo: null,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading...",
                autoFocusLast: !0,
                allowHTMLInStatusIndicator: !1,
                allowHTMLInTemplate: !1
            }
        }, t.fn.magnificPopup = function(n) {
            T();
            var r = t(this);
            if ("string" == typeof n)
                if ("open" === n) {
                    var o, i = w ? r.data("magnificPopup") : r[0].magnificPopup,
                        a = parseInt(arguments[1], 10) || 0;
                    i.items ? o = i.items[a] : (o = r, i.delegate && (o = o.find(i.delegate)), o = o.eq(a)), e._openClick({
                        mfpEl: o
                    }, r, i)
                } else e.isOpen && e[n].apply(e, Array.prototype.slice.call(arguments, 1));
            else n = t.extend(!0, {}, n), w ? r.data("magnificPopup", n) : r[0].magnificPopup = n, e.addGroup(r, n);
            return r
        };
        var A, I, O, R = "inline",
            M = function() {
                O && (I.after(O.addClass(A)).detach(), O = null)
            };
        t.magnificPopup.registerModule(R, {
            options: {
                hiddenClass: "hide",
                markup: "",
                tNotFound: "Content not found"
            },
            proto: {
                initInline: function() {
                    e.types.push(R), x(s + "." + R, function() {
                        M()
                    })
                },
                getInline: function(n, r) {
                    if (M(), n.src) {
                        var o = e.st.inline,
                            i = t(n.src);
                        if (i.length) {
                            var a = i[0].parentNode;
                            a && a.tagName && (I || (A = o.hiddenClass, I = S(A), A = "mfp-" + A), O = i.after(I).detach().removeClass(A)), e.updateStatus("ready")
                        } else e.updateStatus("error", o.tNotFound), i = t("<div>");
                        return n.inlineElement = i, i
                    }
                    return e.updateStatus("ready"), e._parseMarkup(r, {}, n), r
                }
            }
        });
        var P, N = "ajax",
            j = function() {
                P && t(document.body).removeClass(P)
            },
            D = function() {
                j(), e.req && e.req.abort()
            };
        t.magnificPopup.registerModule(N, {
            options: {
                settings: null,
                cursor: "mfp-ajax-cur",
                tError: "The content could not be loaded."
            },
            proto: {
                initAjax: function() {
                    e.types.push(N), P = e.st.ajax.cursor, x(s + "." + N, D), x("BeforeChange." + N, D)
                },
                getAjax: function(n) {
                    P && t(document.body).addClass(P), e.updateStatus("loading");
                    var r = t.extend({
                        url: n.src,
                        success: function(r, o, i) {
                            var a = {
                                data: r,
                                xhr: i
                            };
                            k("ParseAjax", a), e.appendContent(t(a.data), N), n.finished = !0, j(), e._setFocus(), setTimeout(function() {
                                e.wrap.addClass(g)
                            }, 16), e.updateStatus("ready"), k("AjaxContentAdded")
                        },
                        error: function() {
                            j(), n.finished = n.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", n.src))
                        }
                    }, e.st.ajax.settings);
                    return e.req = t.ajax(r), ""
                }
            }
        });
        var L, $ = function(t) {
            if (t.data && void 0 !== t.data.title) return t.data.title;
            var n = e.st.image.titleSrc;
            if (n) {
                if ("function" == typeof n) return n.call(e, t);
                if (t.el) return t.el.attr(n) || ""
            }
            return ""
        };
        t.magnificPopup.registerModule("image", {
            options: {
                markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                cursor: "mfp-zoom-out-cur",
                titleSrc: "title",
                verticalFit: !0,
                tError: "The image could not be loaded."
            },
            proto: {
                initImage: function() {
                    var n = e.st.image,
                        r = ".image";
                    e.types.push("image"), x(f + r, function() {
                        "image" === e.currItem.type && n.cursor && t(document.body).addClass(n.cursor)
                    }), x(s + r, function() {
                        n.cursor && t(document.body).removeClass(n.cursor), _.off("resize" + m)
                    }), x("Resize" + r, e.resizeImage), e.isLowIE && x("AfterChange", e.resizeImage)
                },
                resizeImage: function() {
                    var t = e.currItem;
                    if (t && t.img && e.st.image.verticalFit) {
                        var n = 0;
                        e.isLowIE && (n = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - n)
                    }
                },
                _onImageHasSize: function(t) {
                    t.img && (t.hasSize = !0, L && clearInterval(L), t.isCheckingImgSize = !1, k("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1))
                },
                findImageSize: function(t) {
                    var n = 0,
                        r = t.img[0],
                        o = function(i) {
                            L && clearInterval(L), L = setInterval(function() {
                                r.naturalWidth > 0 ? e._onImageHasSize(t) : (n > 200 && clearInterval(L), 3 === ++n ? o(10) : 40 === n ? o(50) : 100 === n && o(500))
                            }, i)
                        };
                    o(1)
                },
                getImage: function(n, r) {
                    var o = 0,
                        i = e.st.image,
                        a = function() {
                            n && (n.img.off(".mfploader"), n === e.currItem && (e._onImageHasSize(n), e.updateStatus("error", i.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
                        },
                        s = function() {
                            n && (n.img[0].complete ? (n.img.off(".mfploader"), n === e.currItem && (e._onImageHasSize(n), e.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, k("ImageLoadComplete")) : ++o < 200 ? setTimeout(s, 100) : a())
                        },
                        c = r.find(".mfp-img");
                    if (c.length) {
                        var u = document.createElement("img");
                        u.className = "mfp-img", n.el && n.el.find("img").length && (u.alt = n.el.find("img").attr("alt")), n.img = t(u).on("load.mfploader", s).on("error.mfploader", a), u.src = n.src, c.is("img") && (n.img = n.img.clone()), (u = n.img[0]).naturalWidth > 0 ? n.hasSize = !0 : u.width || (n.hasSize = !1)
                    }
                    return e._parseMarkup(r, {
                        title: $(n),
                        img_replaceWith: n.img
                    }, n), e.resizeImage(), n.hasSize ? (L && clearInterval(L), n.loadError ? (r.addClass("mfp-loading"), e.updateStatus("error", i.tError.replace("%url%", n.src))) : (r.removeClass("mfp-loading"), e.updateStatus("ready")), r) : (e.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, r.addClass("mfp-loading"), e.findImageSize(n)), r)
                }
            }
        });
        var q, U = function() {
            return void 0 === q && (q = void 0 !== document.createElement("p").style.MozTransform), q
        };
        t.magnificPopup.registerModule("zoom", {
            options: {
                enabled: !1,
                easing: "ease-in-out",
                duration: 300,
                opener: function(t) {
                    return t.is("img") ? t : t.find("img")
                }
            },
            proto: {
                initZoom: function() {
                    var t, n = e.st.zoom,
                        r = ".zoom";
                    if (n.enabled && e.supportsTransition) {
                        var o, i, a = n.duration,
                            u = function(t) {
                                var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                    r = "all " + n.duration / 1e3 + "s " + n.easing,
                                    o = {
                                        position: "fixed",
                                        zIndex: 9999,
                                        left: 0,
                                        top: 0,
                                        "-webkit-backface-visibility": "hidden"
                                    },
                                    i = "transition";
                                return o["-webkit-" + i] = o["-moz-" + i] = o["-o-" + i] = o[i] = r, e.css(o), e
                            },
                            l = function() {
                                e.content.css("visibility", "visible")
                            };
                        x("BuildControls" + r, function() {
                            if (e._allowZoom()) {
                                if (clearTimeout(o), e.content.css("visibility", "hidden"), !(t = e._getItemToZoom())) return void l();
                                (i = u(t)).css(e._getOffset()), e.wrap.append(i), o = setTimeout(function() {
                                    i.css(e._getOffset(!0)), o = setTimeout(function() {
                                        l(), setTimeout(function() {
                                            i.remove(), t = i = null, k("ZoomAnimationEnded")
                                        }, 16)
                                    }, a)
                                }, 16)
                            }
                        }), x(c + r, function() {
                            if (e._allowZoom()) {
                                if (clearTimeout(o), e.st.removalDelay = a, !t) {
                                    if (!(t = e._getItemToZoom())) return;
                                    i = u(t)
                                }
                                i.css(e._getOffset(!0)), e.wrap.append(i), e.content.css("visibility", "hidden"), setTimeout(function() {
                                    i.css(e._getOffset())
                                }, 16)
                            }
                        }), x(s + r, function() {
                            e._allowZoom() && (l(), i && i.remove(), t = null)
                        })
                    }
                },
                _allowZoom: function() {
                    return "image" === e.currItem.type
                },
                _getItemToZoom: function() {
                    return !!e.currItem.hasSize && e.currItem.img
                },
                _getOffset: function(n) {
                    var r, o = (r = n ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem)).offset(),
                        i = parseInt(r.css("padding-top"), 10),
                        a = parseInt(r.css("padding-bottom"), 10);
                    o.top -= t(window).scrollTop() - i;
                    var s = {
                        width: r.width(),
                        height: (w ? r.innerHeight() : r[0].offsetHeight) - a - i
                    };
                    return U() ? s["-moz-transform"] = s.transform = "translate(" + o.left + "px," + o.top + "px)" : (s.left = o.left, s.top = o.top), s
                }
            }
        });
        var V = "iframe",
            B = "//about:blank",
            F = function(t) {
                if (e.currTemplate[V]) {
                    var n = e.currTemplate[V].find("iframe");
                    n.length && (t || (n[0].src = B), e.isIE8 && n.css("display", t ? "block" : "none"))
                }
            };
        t.magnificPopup.registerModule(V, {
            options: {
                markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                srcAction: "iframe_src",
                patterns: {
                    youtube: {
                        index: "youtube.com",
                        id: "v=",
                        src: "//www.youtube.com/embed/%id%?autoplay=1"
                    },
                    vimeo: {
                        index: "vimeo.com/",
                        id: "/",
                        src: "//player.vimeo.com/video/%id%?autoplay=1"
                    },
                    gmaps: {
                        index: "//maps.google.",
                        src: "%id%&output=embed"
                    }
                }
            },
            proto: {
                initIframe: function() {
                    e.types.push(V), x("BeforeChange", function(t, e, n) {
                        e !== n && (e === V ? F() : n === V && F(!0))
                    }), x(s + "." + V, function() {
                        F()
                    })
                },
                getIframe: function(n, r) {
                    var o = n.src,
                        i = e.st.iframe;
                    t.each(i.patterns, function() {
                        if (o.indexOf(this.index) > -1) return this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1
                    });
                    var a = {};
                    return i.srcAction && (a[i.srcAction] = o), e._parseMarkup(r, a, n), e.updateStatus("ready"), r
                }
            }
        });
        var z = function(t) {
                var n = e.items.length;
                return t > n - 1 ? t - n : t < 0 ? n + t : t
            },
            H = function(t, e, n) {
                return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, n)
            };
        t.magnificPopup.registerModule("gallery", {
            options: {
                enabled: !1,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                preload: [0, 2],
                navigateByImgClick: !0,
                arrows: !0,
                tPrev: "Previous (Left arrow key)",
                tNext: "Next (Right arrow key)",
                tCounter: "%curr% of %total%",
                langDir: null,
                loop: !0
            },
            proto: {
                initGallery: function() {
                    var n = e.st.gallery,
                        o = ".mfp-gallery";
                    if (e.direction = !0, !n || !n.enabled) return !1;
                    n.langDir || (n.langDir = document.dir || "ltr"), i += " mfp-gallery", x(f + o, function() {
                        n.navigateByImgClick && e.wrap.on("click" + o, ".mfp-img", function() {
                            if (e.items.length > 1) return e.next(), !1
                        }), r.on("keydown" + o, function(t) {
                            37 === t.keyCode ? "rtl" === n.langDir ? e.next() : e.prev() : 39 === t.keyCode && ("rtl" === n.langDir ? e.prev() : e.next())
                        }), e.updateGalleryButtons()
                    }), x("UpdateStatus" + o, function() {
                        e.updateGalleryButtons()
                    }), x("UpdateStatus" + o, function(t, n) {
                        n.text && (n.text = H(n.text, e.currItem.index, e.items.length))
                    }), x(d + o, function(t, r, o, i) {
                        var a = e.items.length;
                        o.counter = a > 1 ? H(n.tCounter, i.index, a) : ""
                    }), x("BuildControls" + o, function() {
                        if (e.items.length > 1 && n.arrows && !e.arrowLeft) {
                            var r, o, i, a;
                            "rtl" === n.langDir ? (r = n.tNext, o = n.tPrev, i = "next", a = "prev") : (r = n.tPrev, o = n.tNext, i = "prev", a = "next");
                            var s = n.arrowMarkup,
                                c = e.arrowLeft = t(s.replace(/%title%/gi, r).replace(/%action%/gi, i).replace(/%dir%/gi, "left")).addClass(y),
                                u = e.arrowRight = t(s.replace(/%title%/gi, o).replace(/%action%/gi, a).replace(/%dir%/gi, "right")).addClass(y);
                            "rtl" === n.langDir ? (e.arrowNext = c, e.arrowPrev = u) : (e.arrowNext = u, e.arrowPrev = c), c.on("click", function() {
                                "rtl" === n.langDir ? e.next() : e.prev()
                            }), u.on("click", function() {
                                "rtl" === n.langDir ? e.prev() : e.next()
                            }), e.container.append(c.add(u))
                        }
                    }), x(p + o, function() {
                        e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function() {
                            e.preloadNearbyImages(), e._preloadTimeout = null
                        }, 16)
                    }), x(s + o, function() {
                        r.off(o), e.wrap.off("click" + o), e.arrowRight = e.arrowLeft = null
                    })
                },
                next: function() {
                    var t = z(e.index + 1);
                    if (!e.st.gallery.loop && 0 === t) return !1;
                    e.direction = !0, e.index = t, e.updateItemHTML()
                },
                prev: function() {
                    var t = e.index - 1;
                    if (!e.st.gallery.loop && t < 0) return !1;
                    e.direction = !1, e.index = z(t), e.updateItemHTML()
                },
                goTo: function(t) {
                    e.direction = t >= e.index, e.index = t, e.updateItemHTML()
                },
                preloadNearbyImages: function() {
                    var t, n = e.st.gallery.preload,
                        r = Math.min(n[0], e.items.length),
                        o = Math.min(n[1], e.items.length);
                    for (t = 1; t <= (e.direction ? o : r); t++) e._preloadItem(e.index + t);
                    for (t = 1; t <= (e.direction ? r : o); t++) e._preloadItem(e.index - t)
                },
                _preloadItem: function(n) {
                    if (n = z(n), !e.items[n].preloaded) {
                        var r = e.items[n];
                        r.parsed || (r = e.parseEl(n)), k("LazyLoad", r), "image" === r.type && (r.img = t('<img class="mfp-img" />').on("load.mfploader", function() {
                            r.hasSize = !0
                        }).on("error.mfploader", function() {
                            r.hasSize = !0, r.loadError = !0, k("LazyLoadError", r)
                        }).attr("src", r.src)), r.preloaded = !0
                    }
                },
                updateGalleryButtons: function() {
                    e.st.gallery.loop || "object" != typeof e.arrowPrev || null === e.arrowPrev || (0 === e.index ? e.arrowPrev.hide() : e.arrowPrev.show(), e.index === e.items.length - 1 ? e.arrowNext.hide() : e.arrowNext.show())
                }
            }
        });
        var W = "retina";
        t.magnificPopup.registerModule(W, {
            options: {
                replaceSrc: function(t) {
                    return t.src.replace(/\.\w+$/, function(t) {
                        return "@2x" + t
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var t = e.st.retina,
                            n = t.ratio;
                        (n = isNaN(n) ? n() : n) > 1 && (x("ImageHasSize." + W, function(t, e) {
                            e.img.css({
                                "max-width": e.img[0].naturalWidth / n,
                                width: "100%"
                            })
                        }), x("ElementParse." + W, function(e, r) {
                            r.src = t.replaceSrc(r, n)
                        }))
                    }
                }
            }
        }), T()
    }), Market.Helpers.String = {
        slugify: t => t.toString().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""),
        humanize: t => t.toString().toLowerCase().replace(/^[\s_]+|[\s_]+$/g, "").replace(/[_\s]+/g, " ").replace(/^[a-z]/, t => t.toUpperCase()),
        sanitize: t => t.toString().replace(/(<([^>]+)>)/g, "").replace(/[`~!#$%^&*()_|+\-=\xf7\xbf?;:'",<>{}[\]\\/]/g, "").replace(/^[ ]+|[ ]+$/g, "")
    }, Market.DOMUtils.ModalBeta = class {
        show(t, e, n) {
            this.html = t, this.showCloseBtn = e, this.opts = n || {}, this._launchModal()
        }
        close() {
            $.magnificPopup.close()
        }
        init(t) {
            this.opts = t || {}, this.html = "<div></div>", this.showCloseBtn = !1, this._launchModal(!0)
        }
        error() {
            this.html = "<div class='e-modal -width-xs'>\n  <div class=\"e-modal__section -padding-l -radius-all h-text-align-center\">\n    <p class='t-body h-m0'>\n        Hmm, looks like we can't load this content.\n        <br>\n        If you are using an ad blocker, just check that it's not blocking this page.\n    </p>\n  </div>\n</div>", this._launchModal()
        }
        _launchModal(t) {
            const e = $.magnificPopup.instance;
            e && e.items ? t ? $(".mfp-wrap .modal, .mfp-wrap .e-modal").addClass("is-disabled-loading") : (e.items[0].src = this.html, e.updateItemHTML(), this._modalCallbacks()) : $.magnificPopup.open({
                items: {
                    type: "inline",
                    src: this.html
                },
                showCloseBtn: this.showCloseBtn,
                mainClass: "mfp-fade",
                callbacks: {
                    change: this._modalCallbacks.bind(this),
                    close: () => {
                        this.opts && this.opts.onClose && this.opts.onClose()
                    },
                    beforeClose() {
                        $(document).trigger("modal:beforeCloseInstance")
                    },
                    afterClose() {
                        $.magnificPopup.instance = null
                    },
                    ajaxContentAdded: () => {}
                }
            })
        }
        _modalCallbacks() {
            viewloader.execute(Views, $(".mfp-content"))
        }
    }, Market.DOMUtils.getModalInstance = function() {
        return Market.DOMUtils.ModalBeta._instance || (Market.DOMUtils.ModalBeta._instance = new Market.DOMUtils.ModalBeta)
    },
    function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? t(require("jquery")) : t(jQuery)
    }(function(t) {
        function e(t) {
            return s.raw ? t : encodeURIComponent(t)
        }

        function n(t) {
            return s.raw ? t : decodeURIComponent(t)
        }

        function r(t) {
            return e(s.json ? JSON.stringify(t) : String(t))
        }

        function o(t) {
            0 === t.indexOf('"') && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return t = decodeURIComponent(t.replace(a, " ")), s.json ? JSON.parse(t) : t
            } catch (t) {}
        }

        function i(e, n) {
            var r = s.raw ? e : o(e);
            return t.isFunction(n) ? n(r) : r
        }
        var a = /\+/g,
            s = t.cookie = function(o, a, c) {
                if (void 0 !== a && !t.isFunction(a)) {
                    if ("number" == typeof(c = t.extend({}, s.defaults, c)).expires) {
                        var u = c.expires,
                            l = c.expires = new Date;
                        l.setTime(+l + 864e5 * u)
                    }
                    return document.cookie = [e(o), "=", r(a), c.expires ? "; expires=" + c.expires.toUTCString() : "", c.path ? "; path=" + c.path : "", c.domain ? "; domain=" + c.domain : "", c.secure ? "; secure" : ""].join("")
                }
                for (var d = o ? void 0 : {}, f = document.cookie ? document.cookie.split("; ") : [], p = 0, h = f.length; p < h; p++) {
                    var m = f[p].split("="),
                        g = n(m.shift()),
                        v = m.join("=");
                    if (o && o === g) {
                        d = i(v, a);
                        break
                    }
                    o || void 0 === (v = i(v)) || (d[g] = v)
                }
                return d
            };
        s.defaults = {}, t.removeCookie = function(e, n) {
            return void 0 !== t.cookie(e) && (t.cookie(e, "", t.extend({}, n, {
                expires: -1
            })), !t.cookie(e))
        }
    }), Market.Helpers.CookieConsent = {
        given: function(t) {
            if ("necessary" === t) return !0;
            if ("undefined" != typeof Cookiebot && Cookiebot.consent) return Cookiebot.consent[t];
            const e = $.cookie("CookieConsent");
            if (!e) return console.log("could not read CCC"), !1;
            if ("-1" === e) return console.log("CC outside of targeted area"), !0;
            try {
                const n = JSON.parse(e.replace(/%2c/g, ",").replace(/'/g, '"').replace(/([{[,])\s*([a-zA-Z0-9_]+?):/g, '$1"$2":'));
                return n && !!n[t]
            } catch (t) {
                return console.log("could not parse CCC"), !1
            }
        },
        cookieAvailable: function() {
            return !!$.cookie("CookieConsent")
        },
        addListener: function(t, e) {
            window.addEventListener("CookiebotOnAccept", function() {
                Market.Helpers.CookieConsent.given(t) && e()
            }, !1)
        }
    }, Views.CsatSurvey = class {
        constructor(t) {
            this.PAGE_VIEWS_COOKIE_NAME = "page_view_count", this.SURVEY_COMPLETED_COOKIE_NAME = "feedback_survey_complete", this.MAX_PAGE_VIEWS = 5, this._onSurveySubmit = this._onSurveySubmit.bind(this);
            const e = {
                themeforest: "https://envatocommunity.typeform.com/to/LDPRjQhh#",
                codecanyon: "https://envatocommunity.typeform.com/MarketCSAT#",
                videohive: "https://envatocommunity.typeform.com/to/rlOnlrTg#",
                audiojungle: "https://envatocommunity.typeform.com/to/Au2RsPxD#",
                graphicriver: "https://envatocommunity.typeform.com/to/Fu2Irz9V#"
            };
            this.dom = {
                $popup: $("#js-customer-satisfaction-popup"),
                $showSurveyButton: $("#js-show-survey-button"),
                $closeButton: $("#js-popup-close-button"),
                $modalHTML: $("#js-customer-satisfaction-survey"),
                $surveyModal: $("#js-customer-satisfaction-survey-iframe-wrapper")
            }, this.dataOptions = t.data(), this.survey_url = e[this.dataOptions.site] + `market=${this.dataOptions.site}`, this.cookiebotEnabled = this.dataOptions.cookiebotEnabled, this.consentGiven = Market.Helpers.CookieConsent.given, this.consentType = "preferences", this.dom.$closeButton.on("click", this._onClosePopupClick.bind(this)), this.dom.$showSurveyButton.on("click", this._onShowSurveyClick.bind(this)), window.addEventListener("message", this._onSurveySubmit), $(window).on("load", () => {
                "true" !== this._getCookie(this.SURVEY_COMPLETED_COOKIE_NAME) && this._pageViews() >= this.MAX_PAGE_VIEWS && this._showPopup()
            })
        }
        _onSurveySubmit(t) {
            "https://envatocommunity.typeform.com" === t.origin && "form-submit" === t.data.type && (this._markSurveyAsCompleted(), window.removeEventListener("message", this._onSurveySubmit), setTimeout(Market.DOMUtils.getModalInstance().close, 3500))
        }
        _pageViews() {
            const t = (parseInt(this._getCookie(this.PAGE_VIEWS_COOKIE_NAME), 10) || 0) + 1;
            return t <= this.MAX_PAGE_VIEWS && this._setCookie(this.PAGE_VIEWS_COOKIE_NAME, t), t
        }
        _onShowSurveyClick(t) {
            t.preventDefault(), this._hidePopup(), $.ajax({
                url: "/storefront_api/csat",
                dataType: "json"
            }).then(t => {
                let e;
                e = t.errors ? this.survey_url : `${this.survey_url}&page=${window.location.pathname}&${$.param(t)}`, this._openSurveyModal(e)
            }).catch(() => {
                this._openSurveyModal(this.survey_url)
            })
        }
        _openSurveyModal(t) {
            this.dom.$surveyModal.html(`<iframe src='${t}' class='survey-content'></iframe>`), Market.DOMUtils.getModalInstance().show(this.dom.$modalHTML.html(), !0, {
                onClose: () => this._onSurveyClose()
            })
        }
        _onClosePopupClick() {
            this._markSurveyAsCompleted(), this._hidePopup()
        }
        _onSurveyClose() {
            this._markSurveyAsCompleted()
        }
        _markSurveyAsCompleted() {
            this._setCookie(this.SURVEY_COMPLETED_COOKIE_NAME, "true")
        }
        _hidePopup() {
            this.dom.$popup.addClass("is-visually-hidden")
        }
        _showPopup() {
            this.dom.$popup.removeClass("is-visually-hidden")
        }
        _getCookie(t) {
            return this._consented() ? $.cookie(t) : null
        }
        _setCookie(t, e) {
            if (!this._consented()) return;
            const n = {
                expires: 365,
                path: "/"
            };
            $.cookie(t, e, n)
        }
        _consented() {
            return !this.cookiebotEnabled || this.consentGiven(this.consentType)
        }
    },
    function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("underscore", e) : (t = "undefined" != typeof globalThis ? globalThis : t || self, function() {
            var n = t._,
                r = t._ = e();
            r.noConflict = function() {
                return t._ = n, r
            }
        }())
    }(this, function() {
        function t(t, e) {
            return e = null == e ? t.length - 1 : +e,
                function() {
                    for (var n = Math.max(arguments.length - e, 0), r = Array(n), o = 0; o < n; o++) r[o] = arguments[o + e];
                    switch (e) {
                        case 0:
                            return t.call(this, r);
                        case 1:
                            return t.call(this, arguments[0], r);
                        case 2:
                            return t.call(this, arguments[0], arguments[1], r)
                    }
                    var i = Array(e + 1);
                    for (o = 0; o < e; o++) i[o] = arguments[o];
                    return i[e] = r, t.apply(this, i)
                }
        }

        function e(t) {
            var e = typeof t;
            return "function" === e || "object" === e && !!t
        }

        function n(t) {
            return null === t
        }

        function r(t) {
            return void 0 === t
        }

        function o(t) {
            return !0 === t || !1 === t || "[object Boolean]" === ae.call(t)
        }

        function i(t) {
            return !(!t || 1 !== t.nodeType)
        }

        function a(t) {
            var e = "[object " + t + "]";
            return function(t) {
                return ae.call(t) === e
            }
        }

        function s(t) {
            return null != t && Ae(t.getInt8) && Ce(t.buffer)
        }

        function c(t, e) {
            return null != t && se.call(t, e)
        }

        function u(t) {
            return !ke(t) && me(t) && !isNaN(parseFloat(t))
        }

        function l(t) {
            return we(t) && he(t)
        }

        function d(t) {
            return function() {
                return t
            }
        }

        function f(t) {
            return function(e) {
                var n = t(e);
                return "number" == typeof n && n >= 0 && n <= ye
            }
        }

        function p(t) {
            return function(e) {
                return null == e ? void 0 : e[t]
            }
        }

        function h(t) {
            return pe ? pe(t) && !Pe(t) : $e(t) && qe.test(ae.call(t))
        }

        function m(t) {
            for (var e = {}, n = t.length, r = 0; r < n; ++r) e[t[r]] = !0;
            return {
                contains: function(t) {
                    return !0 === e[t]
                },
                push: function(n) {
                    return e[n] = !0, t.push(n)
                }
            }
        }

        function g(t, e) {
            e = m(e);
            var n = ve.length,
                r = t.constructor,
                o = Ae(r) && r.prototype || ne,
                i = "constructor";
            for (c(t, i) && !e.contains(i) && e.push(i); n--;)(i = ve[n]) in t && t[i] !== o[i] && !e.contains(i) && e.push(i)
        }

        function v(t) {
            if (!e(t)) return [];
            if (de) return de(t);
            var n = [];
            for (var r in t) c(t, r) && n.push(r);
            return ge && g(t, n), n
        }

        function y(t) {
            if (null == t) return !0;
            var e = Ve(t);
            return "number" == typeof e && (Ne(t) || be(t) || De(t)) ? 0 === e : 0 === Ve(v(t))
        }

        function b(t, e) {
            var n = v(e),
                r = n.length;
            if (null == t) return !r;
            for (var o = Object(t), i = 0; i < r; i++) {
                var a = n[i];
                if (e[a] !== o[a] || !(a in o)) return !1
            }
            return !0
        }

        function w(t) {
            return t instanceof w ? t : this instanceof w ? void(this._wrapped = t) : new w(t)
        }

        function _(t) {
            return new Uint8Array(t.buffer || t, t.byteOffset || 0, Le(t))
        }

        function x(t, e) {
            for (var n = [{
                    a: t,
                    b: e
                }], r = [], o = []; n.length;) {
                var i = n.pop();
                if (!0 !== i) {
                    if ((t = i.a) === (e = i.b)) {
                        if (0 !== t || 1 / t == 1 / e) continue;
                        return !1
                    }
                    if (null == t || null == e) return !1;
                    if (t != t) {
                        if (e != e) continue;
                        return !1
                    }
                    var a = typeof t;
                    if ("function" !== a && "object" !== a && "object" != typeof e) return !1;
                    t instanceof w && (t = t._wrapped), e instanceof w && (e = e._wrapped);
                    var s = ae.call(t);
                    if (s !== ae.call(e)) return !1;
                    if (Oe && "[object Object]" == s && Pe(t)) {
                        if (!Pe(e)) return !1;
                        s = Be
                    }
                    switch (s) {
                        case "[object RegExp]":
                        case "[object String]":
                            if ("" + t == "" + e) continue;
                            return !1;
                        case "[object Number]":
                            n.push({
                                a: +t,
                                b: +e
                            });
                            continue;
                        case "[object Date]":
                        case "[object Boolean]":
                            if (+t === +e) continue;
                            return !1;
                        case "[object Symbol]":
                            if (re.valueOf.call(t) === re.valueOf.call(e)) continue;
                            return !1;
                        case "[object ArrayBuffer]":
                        case Be:
                            n.push({
                                a: _(t),
                                b: _(e)
                            });
                            continue
                    }
                    var u = "[object Array]" === s;
                    if (!u && Ue(t)) {
                        if (Le(t) !== Le(e)) return !1;
                        if (t.buffer === e.buffer && t.byteOffset === e.byteOffset) continue;
                        u = !0
                    }
                    if (!u) {
                        if ("object" != typeof t || "object" != typeof e) return !1;
                        var l = t.constructor,
                            d = e.constructor;
                        if (l !== d && !(Ae(l) && l instanceof l && Ae(d) && d instanceof d) && "constructor" in t && "constructor" in e) return !1
                    }
                    for (var f = r.length; f--;)
                        if (r[f] === t) {
                            if (o[f] === e) break;
                            return !1
                        }
                    if (!(f >= 0))
                        if (r.push(t), o.push(e), n.push(!0), u) {
                            if ((f = t.length) !== e.length) return !1;
                            for (; f--;) n.push({
                                a: t[f],
                                b: e[f]
                            })
                        } else {
                            var p, h = v(t);
                            if (f = h.length, v(e).length !== f) return !1;
                            for (; f--;) {
                                if (!c(e, p = h[f])) return !1;
                                n.push({
                                    a: t[p],
                                    b: e[p]
                                })
                            }
                        }
                } else r.pop(), o.pop()
            }
            return !0
        }

        function S(t) {
            if (!e(t)) return [];
            var n = [];
            for (var r in t) n.push(r);
            return ge && g(t, n), n
        }

        function k(t) {
            var e = Ve(t);
            return function(n) {
                if (null == n) return !1;
                var r = S(n);
                if (Ve(r)) return !1;
                for (var o = 0; o < e; o++)
                    if (!Ae(n[t[o]])) return !1;
                return t !== Ke || !Ae(n[Fe])
            }
        }

        function C(t) {
            for (var e = v(t), n = e.length, r = Array(n), o = 0; o < n; o++) r[o] = t[e[o]];
            return r
        }

        function T(t) {
            for (var e = v(t), n = e.length, r = Array(n), o = 0; o < n; o++) r[o] = [e[o], t[e[o]]];
            return r
        }

        function E(t) {
            for (var e = {}, n = v(t), r = 0, o = n.length; r < o; r++) e[t[n[r]]] = n[r];
            return e
        }

        function A(t) {
            var e = [];
            for (var n in t) Ae(t[n]) && e.push(n);
            return e.sort()
        }

        function I(t, e) {
            return function(n) {
                var r = arguments.length;
                if (e && (n = Object(n)), r < 2 || null == n) return n;
                for (var o = 1; o < r; o++)
                    for (var i = arguments[o], a = t(i), s = a.length, c = 0; c < s; c++) {
                        var u = a[c];
                        e && void 0 !== n[u] || (n[u] = i[u])
                    }
                return n
            }
        }

        function O() {
            return function() {}
        }

        function R(t) {
            if (!e(t)) return {};
            if (fe) return fe(t);
            var n = O();
            n.prototype = t;
            var r = new n;
            return n.prototype = null, r
        }

        function M(t, e) {
            var n = R(t);
            return e && en(n, e), n
        }

        function P(t) {
            return e(t) ? Ne(t) ? t.slice() : tn({}, t) : t
        }

        function N(t, e) {
            return e(t), t
        }

        function j(t) {
            return Ne(t) ? t : [t]
        }

        function D(t) {
            return w.toPath(t)
        }

        function L(t, e) {
            for (var n = e.length, r = 0; r < n; r++) {
                if (null == t) return;
                t = t[e[r]]
            }
            return n ? t : void 0
        }

        function $(t, e, n) {
            var o = L(t, D(e));
            return r(o) ? n : o
        }

        function q(t, e) {
            for (var n = (e = D(e)).length, r = 0; r < n; r++) {
                var o = e[r];
                if (!c(t, o)) return !1;
                t = t[o]
            }
            return !!n
        }

        function U(t) {
            return t
        }

        function V(t) {
            return t = en({}, t),
                function(e) {
                    return b(e, t)
                }
        }

        function B(t) {
            return t = D(t),
                function(e) {
                    return L(e, t)
                }
        }

        function F(t, e, n) {
            if (void 0 === e) return t;
            switch (null == n ? 3 : n) {
                case 1:
                    return function(n) {
                        return t.call(e, n)
                    };
                case 3:
                    return function(n, r, o) {
                        return t.call(e, n, r, o)
                    };
                case 4:
                    return function(n, r, o, i) {
                        return t.call(e, n, r, o, i)
                    }
            }
            return function() {
                return t.apply(e, arguments)
            }
        }

        function z(t, n, r) {
            return null == t ? U : Ae(t) ? F(t, n, r) : e(t) && !Ne(t) ? V(t) : B(t)
        }

        function H(t, e) {
            return z(t, e, 1 / 0)
        }

        function W(t, e, n) {
            return w.iteratee !== H ? w.iteratee(t, e) : z(t, e, n)
        }

        function G(t, e, n) {
            e = W(e, n);
            for (var r = v(t), o = r.length, i = {}, a = 0; a < o; a++) {
                var s = r[a];
                i[s] = e(t[s], s, t)
            }
            return i
        }

        function K() {}

        function J(t) {
            return null == t ? K : function(e) {
                return $(t, e)
            }
        }

        function Q(t, e, n) {
            var r = Array(Math.max(0, t));
            e = F(e, n, 1);
            for (var o = 0; o < t; o++) r[o] = e(o);
            return r
        }

        function X(t, e) {
            return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
        }

        function Y(t) {
            var e = function(e) {
                    return t[e]
                },
                n = "(?:" + v(t).join("|") + ")",
                r = RegExp(n),
                o = RegExp(n, "g");
            return function(t) {
                return t = null == t ? "" : "" + t, r.test(t) ? t.replace(o, e) : t
            }
        }

        function Z(t) {
            return "\\" + ln[t]
        }

        function tt(t, e, n) {
            !e && n && (e = n), e = nn({}, e, w.templateSettings);
            var r = RegExp([(e.escape || un).source, (e.interpolate || un).source, (e.evaluate || un).source].join("|") + "|$", "g"),
                o = 0,
                i = "__p+='";
            t.replace(r, function(e, n, r, a, s) {
                return i += t.slice(o, s).replace(dn, Z), o = s + e.length, n ? i += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? i += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : a && (i += "';\n" + a + "\n__p+='"), e
            }), i += "';\n";
            var a, s = e.variable;
            if (s) {
                if (!fn.test(s)) throw new Error("variable is not a bare identifier: " + s)
            } else i = "with(obj||{}){\n" + i + "}\n", s = "obj";
            i = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
            try {
                a = new Function(s, "_", i)
            } catch (t) {
                throw t.source = i, t
            }
            var c = function(t) {
                return a.call(this, t, w)
            };
            return c.source = "function(" + s + "){\n" + i + "}", c
        }

        function et(t, e, n) {
            var r = (e = D(e)).length;
            if (!r) return Ae(n) ? n.call(t) : n;
            for (var o = 0; o < r; o++) {
                var i = null == t ? void 0 : t[e[o]];
                void 0 === i && (i = n, o = r), t = Ae(i) ? i.call(t) : i
            }
            return t
        }

        function nt(t) {
            var e = ++pn + "";
            return t ? t + e : e
        }

        function rt(t) {
            var e = w(t);
            return e._chain = !0, e
        }

        function ot(t, n, r, o, i) {
            if (!(o instanceof n)) return t.apply(r, i);
            var a = R(t.prototype),
                s = t.apply(a, i);
            return e(s) ? s : a
        }

        function it(t, e, n) {
            e || 0 === e || (e = 1 / 0);
            for (var r = [], o = 0, i = 0, a = Ve(t) || 0, s = [];;)
                if (i >= a) {
                    if (!s.length) break;
                    var c = s.pop();
                    i = c.i, t = c.v, a = Ve(t)
                } else {
                    var u = t[i++];
                    s.length >= e ? r[o++] = u : gn(u) && (Ne(u) || De(u)) ? (s.push({
                        i: i,
                        v: t
                    }), i = 0, a = Ve(t = u)) : n || (r[o++] = u)
                }
            return r
        }

        function at(t, e) {
            var n = function(r) {
                var o = n.cache,
                    i = "" + (e ? e.apply(this, arguments) : r);
                return c(o, i) || (o[i] = t.apply(this, arguments)), o[i]
            };
            return n.cache = {}, n
        }

        function st(t, e, n) {
            var r, o, i, a, s = 0;
            n || (n = {});
            var c = function() {
                    s = !1 === n.leading ? 0 : rn(), r = null, a = t.apply(o, i), r || (o = i = null)
                },
                u = function() {
                    var u = rn();
                    s || !1 !== n.leading || (s = u);
                    var l = e - (u - s);
                    return o = this, i = arguments, l <= 0 || l > e ? (r && (clearTimeout(r), r = null), s = u, a = t.apply(o, i), r || (o = i = null)) : r || !1 === n.trailing || (r = setTimeout(c, l)), a
                };
            return u.cancel = function() {
                clearTimeout(r), s = 0, r = o = i = null
            }, u
        }

        function ct(e, n, r) {
            var o, i, a, s, c, u = function() {
                    var t = rn() - i;
                    n > t ? o = setTimeout(u, n - t) : (o = null, r || (s = e.apply(c, a)), o || (a = c = null))
                },
                l = t(function(t) {
                    return c = this, a = t, i = rn(), o || (o = setTimeout(u, n), r && (s = e.apply(c, a))), s
                });
            return l.cancel = function() {
                clearTimeout(o), o = a = c = null
            }, l
        }

        function ut(t, e) {
            return hn(e, t)
        }

        function lt(t) {
            return function() {
                return !t.apply(this, arguments)
            }
        }

        function dt() {
            var t = arguments,
                e = t.length - 1;
            return function() {
                for (var n = e, r = t[e].apply(this, arguments); n--;) r = t[n].call(this, r);
                return r
            }
        }

        function ft(t, e) {
            return function() {
                if (--t < 1) return e.apply(this, arguments)
            }
        }

        function pt(t, e) {
            var n;
            return function() {
                return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = null), n
            }
        }

        function ht(t, e, n) {
            e = W(e, n);
            for (var r, o = v(t), i = 0, a = o.length; i < a; i++)
                if (e(t[r = o[i]], r, t)) return r
        }

        function mt(t) {
            return function(e, n, r) {
                n = W(n, r);
                for (var o = Ve(e), i = t > 0 ? 0 : o - 1; i >= 0 && i < o; i += t)
                    if (n(e[i], i, e)) return i;
                return -1
            }
        }

        function gt(t, e, n, r) {
            for (var o = (n = W(n, r, 1))(e), i = 0, a = Ve(t); i < a;) {
                var s = Math.floor((i + a) / 2);
                n(t[s]) < o ? i = s + 1 : a = s
            }
            return i
        }

        function vt(t, e, n) {
            return function(r, o, i) {
                var a = 0,
                    s = Ve(r);
                if ("number" == typeof i) t > 0 ? a = i >= 0 ? i : Math.max(i + s, a) : s = i >= 0 ? Math.min(i + 1, s) : i + s + 1;
                else if (n && i && s) return r[i = n(r, o)] === o ? i : -1;
                if (o != o) return (i = e(ie.call(r, a, s), l)) >= 0 ? i + a : -1;
                for (i = t > 0 ? a : s - 1; i >= 0 && i < s; i += t)
                    if (r[i] === o) return i;
                return -1
            }
        }

        function yt(t, e, n) {
            var r = (gn(t) ? _n : ht)(t, e, n);
            if (void 0 !== r && -1 !== r) return t[r]
        }

        function bt(t, e) {
            return yt(t, V(e))
        }

        function wt(t, e, n) {
            var r, o;
            if (e = F(e, n), gn(t))
                for (r = 0, o = t.length; r < o; r++) e(t[r], r, t);
            else {
                var i = v(t);
                for (r = 0, o = i.length; r < o; r++) e(t[i[r]], i[r], t)
            }
            return t
        }

        function _t(t, e, n) {
            e = W(e, n);
            for (var r = !gn(t) && v(t), o = (r || t).length, i = Array(o), a = 0; a < o; a++) {
                var s = r ? r[a] : a;
                i[a] = e(t[s], s, t)
            }
            return i
        }

        function xt(t) {
            var e = function(e, n, r, o) {
                var i = !gn(e) && v(e),
                    a = (i || e).length,
                    s = t > 0 ? 0 : a - 1;
                for (o || (r = e[i ? i[s] : s], s += t); s >= 0 && s < a; s += t) {
                    var c = i ? i[s] : s;
                    r = n(r, e[c], c, e)
                }
                return r
            };
            return function(t, n, r, o) {
                var i = arguments.length >= 3;
                return e(t, F(n, o, 4), r, i)
            }
        }

        function St(t, e, n) {
            var r = [];
            return e = W(e, n), wt(t, function(t, n, o) {
                e(t, n, o) && r.push(t)
            }), r
        }

        function kt(t, e, n) {
            return St(t, lt(W(e)), n)
        }

        function Ct(t, e, n) {
            e = W(e, n);
            for (var r = !gn(t) && v(t), o = (r || t).length, i = 0; i < o; i++) {
                var a = r ? r[i] : i;
                if (!e(t[a], a, t)) return !1
            }
            return !0
        }

        function Tt(t, e, n) {
            e = W(e, n);
            for (var r = !gn(t) && v(t), o = (r || t).length, i = 0; i < o; i++) {
                var a = r ? r[i] : i;
                if (e(t[a], a, t)) return !0
            }
            return !1
        }

        function Et(t, e, n, r) {
            return gn(t) || (t = C(t)), ("number" != typeof n || r) && (n = 0), Sn(t, e, n) >= 0
        }

        function At(t, e) {
            return _t(t, B(e))
        }

        function It(t, e) {
            return St(t, V(e))
        }

        function Ot(t, e, n) {
            var r, o, i = -1 / 0,
                a = -1 / 0;
            if (null == e || "number" == typeof e && "object" != typeof t[0] && null != t)
                for (var s = 0, c = (t = gn(t) ? t : C(t)).length; s < c; s++) null != (r = t[s]) && r > i && (i = r);
            else e = W(e, n), wt(t, function(t, n, r) {
                ((o = e(t, n, r)) > a || o === -1 / 0 && i === -1 / 0) && (i = t, a = o)
            });
            return i
        }

        function Rt(t, e, n) {
            var r, o, i = 1 / 0,
                a = 1 / 0;
            if (null == e || "number" == typeof e && "object" != typeof t[0] && null != t)
                for (var s = 0, c = (t = gn(t) ? t : C(t)).length; s < c; s++) null != (r = t[s]) && r < i && (i = r);
            else e = W(e, n), wt(t, function(t, n, r) {
                ((o = e(t, n, r)) < a || o === 1 / 0 && i === 1 / 0) && (i = t, a = o)
            });
            return i
        }

        function Mt(t) {
            return t ? Ne(t) ? ie.call(t) : be(t) ? t.match(An) : gn(t) ? _t(t, U) : C(t) : []
        }

        function Pt(t, e, n) {
            if (null == e || n) return gn(t) || (t = C(t)), t[X(t.length - 1)];
            var r = Mt(t),
                o = Ve(r);
            e = Math.max(Math.min(e, o), 0);
            for (var i = o - 1, a = 0; a < e; a++) {
                var s = X(a, i),
                    c = r[a];
                r[a] = r[s], r[s] = c
            }
            return r.slice(0, e)
        }

        function Nt(t) {
            return Pt(t, 1 / 0)
        }

        function jt(t, e, n) {
            var r = 0;
            return e = W(e, n), At(_t(t, function(t, n, o) {
                return {
                    value: t,
                    index: r++,
                    criteria: e(t, n, o)
                }
            }).sort(function(t, e) {
                var n = t.criteria,
                    r = e.criteria;
                if (n !== r) {
                    if (n > r || void 0 === n) return 1;
                    if (n < r || void 0 === r) return -1
                }
                return t.index - e.index
            }), "value")
        }

        function Dt(t, e) {
            return function(n, r, o) {
                var i = e ? [
                    [],
                    []
                ] : {};
                return r = W(r, o), wt(n, function(e, o) {
                    var a = r(e, o, n);
                    t(i, e, a)
                }), i
            }
        }

        function Lt(t) {
            return null == t ? 0 : gn(t) ? t.length : v(t).length
        }

        function $t(t, e, n) {
            return e in n
        }

        function qt(t, e, n) {
            return ie.call(t, 0, Math.max(0, t.length - (null == e || n ? 1 : e)))
        }

        function Ut(t, e, n) {
            return null == t || t.length < 1 ? null == e || n ? void 0 : [] : null == e || n ? t[0] : qt(t, t.length - e)
        }

        function Vt(t, e, n) {
            return ie.call(t, null == e || n ? 1 : e)
        }

        function Bt(t, e, n) {
            return null == t || t.length < 1 ? null == e || n ? void 0 : [] : null == e || n ? t[t.length - 1] : Vt(t, Math.max(0, t.length - e))
        }

        function Ft(t) {
            return St(t, Boolean)
        }

        function zt(t, e) {
            return it(t, e, !1)
        }

        function Ht(t, e, n, r) {
            o(e) || (r = n, n = e, e = !1), null != n && (n = W(n, r));
            for (var i = [], a = [], s = 0, c = Ve(t); s < c; s++) {
                var u = t[s],
                    l = n ? n(u, s, t) : u;
                e && !n ? (s && a === l || i.push(u), a = l) : n ? Et(a, l) || (a.push(l), i.push(u)) : Et(i, u) || i.push(u)
            }
            return i
        }

        function Wt(t) {
            for (var e = [], n = arguments.length, r = 0, o = Ve(t); r < o; r++) {
                var i = t[r];
                if (!Et(e, i)) {
                    var a;
                    for (a = 1; a < n && Et(arguments[a], i); a++);
                    a === n && e.push(i)
                }
            }
            return e
        }

        function Gt(t) {
            for (var e = t && Ot(t, Ve).length || 0, n = Array(e), r = 0; r < e; r++) n[r] = At(t, r);
            return n
        }

        function Kt(t, e) {
            for (var n = {}, r = 0, o = Ve(t); r < o; r++) e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
            return n
        }

        function Jt(t, e, n) {
            null == e && (e = t || 0, t = 0), n || (n = e < t ? -1 : 1);
            for (var r = Math.max(Math.ceil((e - t) / n), 0), o = Array(r), i = 0; i < r; i++, t += n) o[i] = t;
            return o
        }

        function Qt(t, e) {
            if (null == e || e < 1) return [];
            for (var n = [], r = 0, o = t.length; r < o;) n.push(ie.call(t, r, r += e));
            return n
        }

        function Xt(t, e) {
            return t._chain ? w(e).chain() : e
        }

        function Yt(t) {
            return wt(A(t), function(e) {
                var n = w[e] = t[e];
                w.prototype[e] = function() {
                    var t = [this._wrapped];
                    return oe.apply(t, arguments), Xt(this, n.apply(w, t))
                }
            }), w
        }
        var Zt = "1.13.8",
            te = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global || Function("return this")() || {},
            ee = Array.prototype,
            ne = Object.prototype,
            re = "undefined" != typeof Symbol ? Symbol.prototype : null,
            oe = ee.push,
            ie = ee.slice,
            ae = ne.toString,
            se = ne.hasOwnProperty,
            ce = "undefined" != typeof ArrayBuffer,
            ue = "undefined" != typeof DataView,
            le = Array.isArray,
            de = Object.keys,
            fe = Object.create,
            pe = ce && ArrayBuffer.isView,
            he = isNaN,
            me = isFinite,
            ge = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            ve = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"],
            ye = Math.pow(2, 53) - 1,
            be = a("String"),
            we = a("Number"),
            _e = a("Date"),
            xe = a("RegExp"),
            Se = a("Error"),
            ke = a("Symbol"),
            Ce = a("ArrayBuffer"),
            Te = a("Function"),
            Ee = te.document && te.document.childNodes;
        "function" != typeof /./ && "object" != typeof Int8Array && "function" != typeof Ee && (Te = function(t) {
            return "function" == typeof t || !1
        });
        var Ae = Te,
            Ie = a("Object"),
            Oe = ue && (!/\[native code\]/.test(String(DataView)) || Ie(new DataView(new ArrayBuffer(8)))),
            Re = "undefined" != typeof Map && Ie(new Map),
            Me = a("DataView"),
            Pe = Oe ? s : Me,
            Ne = le || a("Array"),
            je = a("Arguments");
        ! function() {
            je(arguments) || (je = function(t) {
                return c(t, "callee")
            })
        }();
        var De = je,
            Le = p("byteLength"),
            $e = f(Le),
            qe = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/,
            Ue = ce ? h : d(!1),
            Ve = p("length");
        w.VERSION = Zt, w.prototype.value = function() {
            return this._wrapped
        }, w.prototype.valueOf = w.prototype.toJSON = w.prototype.value, w.prototype.toString = function() {
            return String(this._wrapped)
        };
        var Be = "[object DataView]",
            Fe = "forEach",
            ze = "has",
            He = ["clear", "delete"],
            We = ["get", ze, "set"],
            Ge = He.concat(Fe, We),
            Ke = He.concat(We),
            Je = ["add"].concat(He, Fe, ze),
            Qe = Re ? k(Ge) : a("Map"),
            Xe = Re ? k(Ke) : a("WeakMap"),
            Ye = Re ? k(Je) : a("Set"),
            Ze = a("WeakSet"),
            tn = I(S),
            en = I(v),
            nn = I(S, !0);
        w.toPath = j, w.iteratee = H;
        var rn = Date.now || function() {
                return (new Date).getTime()
            },
            on = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            an = Y(on),
            sn = Y(E(on)),
            cn = w.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            },
            un = /(.)^/,
            ln = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            dn = /\\|'|\r|\n|\u2028|\u2029/g,
            fn = /^\s*(\w|\$)+\s*$/,
            pn = 0,
            hn = t(function(t, e) {
                var n = hn.placeholder,
                    r = function() {
                        for (var o = 0, i = e.length, a = Array(i), s = 0; s < i; s++) a[s] = e[s] === n ? arguments[o++] : e[s];
                        for (; o < arguments.length;) a.push(arguments[o++]);
                        return ot(t, r, this, this, a)
                    };
                return r
            });
        hn.placeholder = w;
        var mn = t(function(e, n, r) {
                if (!Ae(e)) throw new TypeError("Bind must be called on a function");
                var o = t(function(t) {
                    return ot(e, o, n, this, r.concat(t))
                });
                return o
            }),
            gn = f(Ve),
            vn = t(function(t, e) {
                var n = (e = it(e, !1, !1)).length;
                if (n < 1) throw new Error("bindAll must be passed function names");
                for (; n--;) {
                    var r = e[n];
                    t[r] = mn(t[r], t)
                }
                return t
            }),
            yn = t(function(t, e, n) {
                return setTimeout(function() {
                    return t.apply(null, n)
                }, e)
            }),
            bn = hn(yn, w, 1),
            wn = hn(pt, 2),
            _n = mt(1),
            xn = mt(-1),
            Sn = vt(1, _n, gt),
            kn = vt(-1, xn),
            Cn = xt(1),
            Tn = xt(-1),
            En = t(function(t, e, n) {
                var r, o;
                return Ae(e) ? o = e : (e = D(e), r = e.slice(0, -1), e = e[e.length - 1]), _t(t, function(t) {
                    var i = o;
                    if (!i) {
                        if (r && r.length && (t = L(t, r)), null == t) return;
                        i = t[e]
                    }
                    return null == i ? i : i.apply(t, n)
                })
            }),
            An = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g,
            In = Dt(function(t, e, n) {
                c(t, n) ? t[n].push(e) : t[n] = [e]
            }),
            On = Dt(function(t, e, n) {
                t[n] = e
            }),
            Rn = Dt(function(t, e, n) {
                c(t, n) ? t[n]++ : t[n] = 1
            }),
            Mn = Dt(function(t, e, n) {
                t[n ? 0 : 1].push(e)
            }, !0),
            Pn = t(function(t, e) {
                var n = {},
                    r = e[0];
                if (null == t) return n;
                Ae(r) ? (e.length > 1 && (r = F(r, e[1])), e = S(t)) : (r = $t, e = it(e, !1, !1), t = Object(t));
                for (var o = 0, i = e.length; o < i; o++) {
                    var a = e[o],
                        s = t[a];
                    r(s, a, t) && (n[a] = s)
                }
                return n
            }),
            Nn = t(function(t, e) {
                var n, r = e[0];
                return Ae(r) ? (r = lt(r), e.length > 1 && (n = e[1])) : (e = _t(it(e, !1, !1), String), r = function(t, n) {
                    return !Et(e, n)
                }), Pn(t, r, n)
            }),
            jn = t(function(t, e) {
                return e = it(e, !0, !0), St(t, function(t) {
                    return !Et(e, t)
                })
            }),
            Dn = t(function(t, e) {
                return jn(t, e)
            }),
            Ln = t(function(t) {
                return Ht(it(t, !0, !0))
            }),
            $n = t(Gt);
        wt(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
            var e = ee[t];
            w.prototype[t] = function() {
                var n = this._wrapped;
                return null != n && (e.apply(n, arguments), "shift" !== t && "splice" !== t || 0 !== n.length || delete n[0]), Xt(this, n)
            }
        }), wt(["concat", "join", "slice"], function(t) {
            var e = ee[t];
            w.prototype[t] = function() {
                var t = this._wrapped;
                return null != t && (t = e.apply(t, arguments)), Xt(this, t)
            }
        });
        var qn = Yt({
            __proto__: null,
            VERSION: Zt,
            restArguments: t,
            isObject: e,
            isNull: n,
            isUndefined: r,
            isBoolean: o,
            isElement: i,
            isString: be,
            isNumber: we,
            isDate: _e,
            isRegExp: xe,
            isError: Se,
            isSymbol: ke,
            isArrayBuffer: Ce,
            isDataView: Pe,
            isArray: Ne,
            isFunction: Ae,
            isArguments: De,
            isFinite: u,
            isNaN: l,
            isTypedArray: Ue,
            isEmpty: y,
            isMatch: b,
            isEqual: x,
            isMap: Qe,
            isWeakMap: Xe,
            isSet: Ye,
            isWeakSet: Ze,
            keys: v,
            allKeys: S,
            values: C,
            pairs: T,
            invert: E,
            functions: A,
            methods: A,
            extend: tn,
            extendOwn: en,
            assign: en,
            defaults: nn,
            create: M,
            clone: P,
            tap: N,
            get: $,
            has: q,
            mapObject: G,
            identity: U,
            constant: d,
            noop: K,
            toPath: j,
            property: B,
            propertyOf: J,
            matcher: V,
            matches: V,
            times: Q,
            random: X,
            now: rn,
            escape: an,
            unescape: sn,
            templateSettings: cn,
            template: tt,
            result: et,
            uniqueId: nt,
            chain: rt,
            iteratee: H,
            partial: hn,
            bind: mn,
            bindAll: vn,
            memoize: at,
            delay: yn,
            defer: bn,
            throttle: st,
            debounce: ct,
            wrap: ut,
            negate: lt,
            compose: dt,
            after: ft,
            before: pt,
            once: wn,
            findKey: ht,
            findIndex: _n,
            findLastIndex: xn,
            sortedIndex: gt,
            indexOf: Sn,
            lastIndexOf: kn,
            find: yt,
            detect: yt,
            findWhere: bt,
            each: wt,
            forEach: wt,
            map: _t,
            collect: _t,
            reduce: Cn,
            foldl: Cn,
            inject: Cn,
            reduceRight: Tn,
            foldr: Tn,
            filter: St,
            select: St,
            reject: kt,
            every: Ct,
            all: Ct,
            some: Tt,
            any: Tt,
            contains: Et,
            includes: Et,
            include: Et,
            invoke: En,
            pluck: At,
            where: It,
            max: Ot,
            min: Rt,
            shuffle: Nt,
            sample: Pt,
            sortBy: jt,
            groupBy: In,
            indexBy: On,
            countBy: Rn,
            partition: Mn,
            toArray: Mt,
            size: Lt,
            pick: Pn,
            omit: Nn,
            first: Ut,
            head: Ut,
            take: Ut,
            initial: qt,
            last: Bt,
            rest: Vt,
            tail: Vt,
            drop: Vt,
            compact: Ft,
            flatten: zt,
            without: Dn,
            uniq: Ht,
            unique: Ht,
            union: Ln,
            intersection: Wt,
            difference: jn,
            unzip: Gt,
            transpose: Gt,
            zip: $n,
            object: Kt,
            range: Jt,
            chunk: Qt,
            mixin: Yt,
            default: w
        });
        return qn._ = qn, qn
    }), Views.Flyout = class {
        constructor(t) {
            this._updatePosition = this._updatePosition.bind(this), this._triggerFlyoutHideEvent = this._triggerFlyoutHideEvent.bind(this), this.$el = t, this.status = !1, this.firstRun = !0, this.dom = {
                $flyoutBody: this.$el.find(".js-flyout__body").clone(!0, !0).appendTo($(document.body))
            }, this.dom.$flyoutBody.attr("data-show", !1), this._throttledUpdatePosition = _.throttle(this._updatePosition, 100), this.$el.on("click", this.toggleStatus.bind(this)), this.dom.$flyoutBody.on("click", this.handleFlyoutBodyClick), $(document).on("flyout:hide", this.hideFlyout.bind(this))
        }
        toggleStatus(t) {
            "true" === this.dom.$flyoutBody.attr("data-show") ? (this.hideFlyout(), this._triggerFlyoutHideEvent()) : (this._triggerFlyoutHideEvent(), this.showFlyout(t))
        }
        handleFlyoutBodyClick(t) {
            t.stopPropagation()
        }
        showFlyout(t) {
            if (t.stopPropagation(), $(document).trigger("flyout:open", {
                    flyout: this
                }), this.firstRun) {
                this.firstRun = !1;
                const t = {
                    flyout: this.dom.$flyoutBody
                };
                $(document).trigger("flyout:setup", t)
            }
            this._updatePosition(), this.dom.$flyoutBody.attr("data-show", !0), $(document).on("click", this._triggerFlyoutHideEvent), $(window).on("scroll", this._throttledUpdatePosition), $(window).on("resize", this._throttledUpdatePosition), $(window).on("orientationchange", this._updatePosition)
        }
        hideFlyout() {
            this.dom.$flyoutBody.attr("data-show", !1), $(document).off("click", this._triggerFlyoutHideEvent), $(window).off("scroll", this._throttledUpdatePosition), $(window).off("resize", this._throttledUpdatePosition), $(window).off("orientationchange", this._updatePosition)
        }
        _updatePosition() {
            const t = this.$el.offset(),
                e = this.$el.data("flyout-position");
            "object" == typeof e ? (t.top += e.topPixels, t.left += e.leftPixels) : t.left -= 15, this.dom.$flyoutBody.css({
                top: t.top,
                left: t.left
            })
        }
        _triggerFlyoutHideEvent() {
            $(document).trigger("flyout:hide")
        }
    }, Views.GlobalHeaderMenuDropdownHandler = class {
        constructor(t) {
            this.$el = t, $(".global-header").on("keyup", this.onKeyPress.bind(this))
        }
        onKeyPress(t) {
            this.dropdownMenuOpenFromFocus() && this.isKeyPressIsEscKey(t) && $(this.$el).focus()
        }
        dropdownMenuOpenFromFocus() {
            return this.$el.is(":focus-within")
        }
        isKeyPressIsEscKey(t) {
            const e = 27;
            return t.keyCode === e
        }
    }, Market.DOMUtils.Modal = class {
        constructor(t, e) {
            this.url = t, this.options = e || {}, this.$form = this.options.form, this.method = this._getMethod(), this.modalInstance = $.magnificPopup.instance || !1, this.responsive = !!this.options.responsiveEnabled, this.showCloseBtn = !this.options.hideCloseBtn
        }
        open() {
            this._detectModalType(this.responsive, this._getScreenWidth(), this.modalInstance && this.modalInstance.items)
        }
        _detectModalType(t, e, n) {
            e && t ? this._modalResponsive() : n ? this._modalExisting() : this._modalLightbox()
        }
        _modalExisting() {
            $.ajax({
                url: this.url,
                type: this.method
            }).done(this._updateModal.bind(this)).fail(() => {
                this._updateModal("<div class='e-modal -width-xs'><div class='e-modal__section -padding-l -radius-all h-text-align-center'><a class='t-link' href='" + this.url + "'>The content</a> could not be loaded.</div></div>")
            })
        }
        _modalLightbox() {
            const t = this;
            $.magnificPopup.open({
                items: {
                    type: "ajax",
                    src: this.url
                },
                ajax: {
                    tError: "<div class='e-modal -width-xs'>\n  <div class='e-modal__section -padding-l -radius-all h-text-align-center'>\n    <p class='t-body h-m0'>\n       Hmm, looks like we can't load this content.\n       <br>\n       If you are using an ad blocker, just check that it's not blocking this page.\n    </p>\n  </div>\n</div>",
                    settings: {
                        cache: !1,
                        type: this.method
                    }
                },
                showCloseBtn: this.showCloseBtn,
                mainClass: "mfp-fade",
                callbacks: {
                    open() {
                        t.modalInstance = $.magnificPopup.instance
                    },
                    afterClose() {
                        $.magnificPopup.instance = null
                    },
                    ajaxContentAdded() {
                        t._modalCallback(this.content)
                    }
                }
            })
        }
        _modalResponsive() {
            "post" === this.method ? this.$form.trigger("submit") : window.location.href = this.url
        }
        _updateModal(t) {
            this.modalInstance.items[0] = {
                src: t,
                type: "inline"
            }, this.modalInstance.updateItemHTML(), this._modalCallback($(".mfp-wrap"))
        }
        _getMethod() {
            return this.$form && this.$form.attr("method") ? this.$form.attr("method") : this.options.modalMethod ? this.options.modalMethod : "get"
        }
        _getScreenWidth() {
            return window.screen.width < 500 || Modernizr.mq("only all and (max-width: 500px)")
        }
        _modalCallback(t) {
            t.length || $.magnificPopup.close(), this.options.$el && this.options.$el.trigger("modalAjaxContent:added", t), viewloader.execute(Views, $(".mfp-wrap")), window.DeveloperTools && viewloader.execute(DeveloperTools.Views, $(".mfp-wrap"))
        }
    }, Views.Modal = class {
        constructor(t) {
            this.href = t.attr("href"), this.options = _.extend(t.data(), {
                $el: t
            }), t.on("click", this.handleClick.bind(this))
        }
        handleClick(t) {
            t.preventDefault(), new Market.DOMUtils.Modal(this.href, this.options).open()
        }
    }, Market.Helpers.touchDetection = {
        isTouchPrimaryDevice() {
            try {
                if (!(window.matchMedia && "function" == typeof window.matchMedia)) return !1;
                const t = window.matchMedia("(hover: none)");
                return !!t && Boolean(t.matches)
            } catch (t) {
                return !1
            }
        },
        isHoverPrimaryDevice() {
            return !this.isTouchPrimaryDevice()
        },
        isTouch() {
            return this.isTouchPrimaryDevice()
        }
    }, Market.Helpers.detectRedirect = {
        check(t) {
            return this.url = null, $.each(t, (t, e) => {
                if (this.testRedirectCondition[t]()) return this.url = e, !1
            }), this.url
        },
        testRedirectCondition: {
            mobile: () => window.screen.width < 500 || Modernizr.mq("only all and (max-width: 500px)"),
            tablet: () => window.screen.width < 1024 || Modernizr.mq("only all and (max-width: 1024px)"),
            touch: () => Market.Helpers.touchDetection.isTouchPrimaryDevice(),
            cfUnauthorized: () => !0
        }
    }, Views.ModalAjax = class {
        constructor(t) {
            this.handleSubmit = this.handleSubmit.bind(this), this.handleBeforeSend = this.handleBeforeSend.bind(this), this.handleSuccess = this.handleSuccess.bind(this), this.$el = t, this.method = this.$el.attr("method") || this.$el.data("method") || "get", this.redirectConditions = this.$el.data("redirectConditions") || {
                mobile: !0
            }, this.showCloseBtn = !this.$el.data("hideCloseButton"), null != this.$el.attr("action") ? this.$el.on("submit", this.handleSubmit) : this.$el.on("click", this.handleSubmit), this.$el.on({
                "ajax:beforeSend": this.handleBeforeSend,
                "ajax:success": this.handleSuccess,
                "ajax:error": this.handleError
            })
        }
        handleSubmit(t) {
            return this._testRedirectConditions(), this._detectModalType() || t.preventDefault()
        }
        handleBeforeSend() {
            this.redirectAfterSubmit || Market.DOMUtils.getModalInstance().init()
        }
        handleError() {
            Market.DOMUtils.getModalInstance().error()
        }
        handleSuccess(t, e) {
            const n = null != e.html ? e.html : e;
            this.redirectAfterSubmit ? this._redirect() : Market.DOMUtils.getModalInstance().show(n, this.showCloseBtn)
        }
        _detectModalType() {
            return this.submit = !1, this.redirectConditionMet ? this.customRedirect ? "get" === this.method ? this._redirect() : (this.redirectAfterSubmit = !0, this._submitWithAjax()) : this.submit = !0 : this._submitWithAjax(), this.submit
        }
        _redirect() {
            window.location = this.redirectUrl
        }
        _submitWithAjax() {
            $.rails.handleRemote(this.$el)
        }
        _testRedirectConditions() {
            this.redirectUrl = Market.Helpers.detectRedirect.check(this.redirectConditions), this.redirectConditionMet = null !== this.redirectUrl, this.customRedirect = this.redirectConditionMet && !_.isBoolean(this.redirectUrl)
        }
    }, Views.ModalInline = class {
        constructor(t, e, n) {
            this.handleSubmit = this.handleSubmit.bind(this), this.$el = t, this.method = this.$el.attr("method") || this.$el.data("method") || "get", this.redirectConditions = this.$el.data("redirectConditions") || {
                mobile: !0
            }, this.showCloseBtn = !this.$el.data("hideCloseButton"), this.html = this.$el.data("html"), this.window = n || window, null != this.$el.attr("action") ? this.$el.on("submit", this.handleSubmit) : this.$el.on("click", this.handleSubmit)
        }
        handleSubmit(t) {
            return this._testRedirectConditions(), this._detectModalType() || this._showModal()
        }
        _testRedirectConditions() {
            this.redirectUrl = Market.Helpers.detectRedirect.check(this.redirectConditions), this.redirectConditionMet = null !== this.redirectUrl, this.customRedirect = this.redirectConditionMet && !_.isBoolean(this.redirectUrl)
        }
        _detectModalType() {
            let t = !1;
            return this.redirectConditionMet ? this.customRedirect ? "get" === this.method ? this._redirect() : this._submitWithAjax() : t = !0 : this._submitWithAjax(), t
        }
        _submitWithAjax() {
            $.rails.handleRemote(this.$el)
        }
        _redirect() {
            this.window.location = this.redirectUrl
        }
        _showModal() {
            const t = $(this.html).clone().show()[0].outerHTML;
            return Market.DOMUtils.getModalInstance().show(t, this.showCloseBtn), viewloader.execute(Views, $(".mfp-wrap")), !1
        }
    }, Views.ModalInternalControls = class {
        constructor(t) {
            this.$el = t, this.modalInstance = $.magnificPopup.instance, this.$el.on("click", ".js-modal-close", this.handleClose.bind(this))
        }
        handleClose(t) {
            this._modalActive() && (t.preventDefault(), this._closeModal())
        }
        _modalActive() {
            return !!this.modalInstance
        }
        _closeModal() {
            this.modalInstance.close()
        }
    }, window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = function(t, e) {
        e = e || window;
        for (let n = 0; n < this.length; n++) t.call(e, this[n], n, this)
    }), (() => {
        function t(e) {
            const n = m[e];
            if (void 0 !== n) return n.exports;
            const r = m[e] = {
                exports: {}
            };
            return h[e](r, r.exports, t), r.exports
        }

        function e(t, e) {
            function n() {
                const t = 0 === a.length ? new Uint8Array(0) : (0, x.wh)(a.concat(o)),
                    e = {
                        rawBytesCount: i,
                        output: t,
                        outputBytesCount: t.byteLength,
                        encoding: "deflate"
                    };
                return i = 0, a = [], e
            }

            function r() {
                s || (t.postMessage({
                    action: "reset",
                    streamId: e
                }), s = !0)
            }
            let o, i = 0,
                a = [],
                s = !0,
                c = 0;
            const u = [],
                l = e,
                {
                    stop: d
                } = (0, S.q2)(t, "message", ({
                    data: t
                }) => {
                    if ("wrote" !== t.type || t.streamId !== l) return;
                    const e = u[0];
                    e && (e.id === t.id ? (u.shift(), i += t.additionalBytesCount, a.push(t.result), o = t.trailer, e.writeCallback ? e.writeCallback(t.result.byteLength) : e.finishCallback && e.finishCallback()) : e.id < t.id && d())
                });
            return {
                isAsync: !0,
                get isEmpty() {
                    return s
                },
                write(n, r) {
                    t.postMessage({
                        action: "write",
                        id: c,
                        data: n,
                        streamId: e
                    }), u.push({
                        id: c,
                        writeCallback: r,
                        data: n
                    }), s = !1, c += 1
                },
                finish(t) {
                    r(), u.length ? (u.forEach(t => {
                        delete t.writeCallback
                    }), u[u.length - 1].finishCallback = () => t(n())) : t(n())
                },
                finishSync() {
                    r();
                    const t = u.map(t => t.data).join("");
                    return u.length = 0, { ...n(),
                        pendingData: t
                    }
                },
                estimateEncodedBytesCount: t => t.length / 8,
                stop() {
                    d()
                }
            }
        }

        function n({
            configuredUrl: t,
            error: e,
            source: n,
            scriptType: r
        }) {
            if (k.V.error(`${n} failed to start: an error occurred while initializing the ${r}:`, e), e instanceof Event || e instanceof Error && ((o = e.message).includes("Content Security Policy") || o.includes("requires 'TrustedScriptURL'"))) {
                let e;
                e = t ? `Please make sure the ${r} URL ${t} is correct and CSP is correctly configured.` : "Please make sure CSP is correctly configured.", k.V.error(`${e} See documentation at ${A.fH}/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay`)
            } else "worker" === r && (0, C.VJ)(e);
            var o
        }

        function r(t) {
            return new Worker(t.workerUrl || URL.createObjectURL(new Blob(['(()=>{function t(t){if(1===t.length)return t[0];const e=t.reduce((t,e)=>t+e.length,0),a=new Uint8Array(e);let n=0;for(const e of t)a.set(e,n),n+=e.length;return a}function e(t){for(var e=t.length;--e>=0;)t[e]=0}var a=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),n=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),r=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),i=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),s=Array(576);e(s);var h=Array(60);e(h);var l=Array(512);e(l);var o=Array(256);e(o);var _=Array(29);e(_);var d,u,c,f=Array(30);function g(t,e,a,n,r){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=n,this.max_length=r,this.has_stree=t?.length}function p(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}e(f);var m=function(t){return t<256?l[t]:l[256+(t>>>7)]},v=function(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},w=function(t,e,a){t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,v(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},b=function(t,e,a){w(t,a[2*e],a[2*e+1])},y=function(t,e){var a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},z=function(t,e,a){var n,r,i=Array(16),s=0;for(n=1;n<=15;n++)i[n]=s=s+a[n-1]<<1;for(r=0;r<=e;r++){var h=t[2*r+1];0!==h&&(t[2*r]=y(i[h]++,h))}},k=function(t){var e;for(e=0;e<286;e++)t.dyn_ltree[2*e]=0;for(e=0;e<30;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0},x=function(t){t.bi_valid>8?v(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},A=function(t,e,a,n){var r=2*e,i=2*a;return t[r]<t[i]||t[r]===t[i]&&n[e]<=n[a]},U=function(t,e,a){for(var n=t.heap[a],r=a<<1;r<=t.heap_len&&(r<t.heap_len&&A(e,t.heap[r+1],t.heap[r],t.depth)&&r++,!A(e,n,t.heap[r],t.depth));)t.heap[a]=t.heap[r],a=r,r<<=1;t.heap[a]=n},M=function(t,e,r){var i,s,h,l,d=0;if(0!==t.last_lit)do{i=t.pending_buf[t.d_buf+2*d]<<8|t.pending_buf[t.d_buf+2*d+1],s=t.pending_buf[t.l_buf+d],d++,0===i?b(t,s,e):(h=o[s],b(t,h+256+1,e),0!==(l=a[h])&&(s-=_[h],w(t,s,l)),i--,h=m(i),b(t,h,r),0!==(l=n[h])&&(i-=f[h],w(t,i,l)))}while(d<t.last_lit);b(t,256,e)},B=function(t,e){var a,n,r,i=e.dyn_tree,s=e.stat_desc.static_tree,h=e.stat_desc.has_stree,l=e.stat_desc.elems,o=-1;for(t.heap_len=0,t.heap_max=573,a=0;a<l;a++)0!==i[2*a]?(t.heap[++t.heap_len]=o=a,t.depth[a]=0):i[2*a+1]=0;for(;t.heap_len<2;)i[2*(r=t.heap[++t.heap_len]=o<2?++o:0)]=1,t.depth[r]=0,t.opt_len--,h&&(t.static_len-=s[2*r+1]);for(e.max_code=o,a=t.heap_len>>1;a>=1;a--)U(t,i,a);r=l;do{a=t.heap[1],t.heap[1]=t.heap[t.heap_len--],U(t,i,1),n=t.heap[1],t.heap[--t.heap_max]=a,t.heap[--t.heap_max]=n,i[2*r]=i[2*a]+i[2*n],t.depth[r]=(t.depth[a]>=t.depth[n]?t.depth[a]:t.depth[n])+1,i[2*a+1]=i[2*n+1]=r,t.heap[1]=r++,U(t,i,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],function(t,e){var a,n,r,i,s,h,l=e.dyn_tree,o=e.max_code,_=e.stat_desc.static_tree,d=e.stat_desc.has_stree,u=e.stat_desc.extra_bits,c=e.stat_desc.extra_base,f=e.stat_desc.max_length,g=0;for(i=0;i<=15;i++)t.bl_count[i]=0;for(l[2*t.heap[t.heap_max]+1]=0,a=t.heap_max+1;a<573;a++)(i=l[2*l[2*(n=t.heap[a])+1]+1]+1)>f&&(i=f,g++),l[2*n+1]=i,n>o||(t.bl_count[i]++,s=0,n>=c&&(s=u[n-c]),h=l[2*n],t.opt_len+=h*(i+s),d&&(t.static_len+=h*(_[2*n+1]+s)));if(0!==g){do{for(i=f-1;0===t.bl_count[i];)i--;t.bl_count[i]--,t.bl_count[i+1]+=2,t.bl_count[f]--,g-=2}while(g>0);for(i=f;0!==i;i--)for(n=t.bl_count[i];0!==n;)(r=t.heap[--a])>o||(l[2*r+1]!==i&&(t.opt_len+=(i-l[2*r+1])*l[2*r],l[2*r+1]=i),n--)}}(t,e),z(i,o,t.bl_count)},I=function(t,e,a){var n,r,i=-1,s=e[1],h=0,l=7,o=4;for(0===s&&(l=138,o=3),e[2*(a+1)+1]=65535,n=0;n<=a;n++)r=s,s=e[2*(n+1)+1],++h<l&&r===s||(h<o?t.bl_tree[2*r]+=h:0!==r?(r!==i&&t.bl_tree[2*r]++,t.bl_tree[32]++):h<=10?t.bl_tree[34]++:t.bl_tree[36]++,h=0,i=r,0===s?(l=138,o=3):r===s?(l=6,o=3):(l=7,o=4))},C=function(t,e,a){var n,r,i=-1,s=e[1],h=0,l=7,o=4;for(0===s&&(l=138,o=3),n=0;n<=a;n++)if(r=s,s=e[2*(n+1)+1],!(++h<l&&r===s)){if(h<o)do{b(t,r,t.bl_tree)}while(0!==--h);else 0!==r?(r!==i&&(b(t,r,t.bl_tree),h--),b(t,16,t.bl_tree),w(t,h-3,2)):h<=10?(b(t,17,t.bl_tree),w(t,h-3,3)):(b(t,18,t.bl_tree),w(t,h-11,7));h=0,i=r,0===s?(l=138,o=3):r===s?(l=6,o=3):(l=7,o=4)}},S=!1,D=function(t,e,a,n){w(t,0+(n?1:0),3),function(t,e,a){x(t),v(t,a),v(t,~a),t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a}(t,e,a)},E=D,j=function(t,e,a,n){for(var r=65535&t,i=t>>>16&65535,s=0;0!==a;){a-=s=a>2e3?2e3:a;do{i=i+(r=r+e[n++]|0)|0}while(--s);r%=65521,i%=65521}return r|i<<16},H=new Uint32Array(function(){for(var t,e=[],a=0;a<256;a++){t=a;for(var n=0;n<8;n++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e}()),L=function(t,e,a,n){var r=H,i=n+a;t^=-1;for(var s=n;s<i;s++)t=t>>>8^r[255&(t^e[s])];return-1^t},T={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},$=E,O=function(t,e,a){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&a,t.last_lit++,0===e?t.dyn_ltree[2*a]++:(t.matches++,e--,t.dyn_ltree[2*(o[a]+256+1)]++,t.dyn_dtree[2*m(e)]++),t.last_lit===t.lit_bufsize-1},Q=-2,q=258,F=262,N=103,P=113,W=666,G=function(t,e){return t.msg=T[e],e},J=function(t){return(t<<1)-(t>4?9:0)},K=function(t){for(var e=t.length;--e>=0;)t[e]=0},R=function(t,e,a){return(e<<t.hash_shift^a)&t.hash_mask},V=function(t){var e=t.state,a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},X=function(t,e){(function(t,e,a,n){var r,l,o=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=function(t){var e,a=4093624447;for(e=0;e<=31;e++,a>>>=1)if(1&a&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<256;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0}(t)),B(t,t.l_desc),B(t,t.d_desc),o=function(t){var e;for(I(t,t.dyn_ltree,t.l_desc.max_code),I(t,t.dyn_dtree,t.d_desc.max_code),B(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*i[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}(t),r=t.opt_len+3+7>>>3,(l=t.static_len+3+7>>>3)<=r&&(r=l)):r=l=a+5,a+4<=r&&-1!==e?D(t,e,a,n):4===t.strategy||l===r?(w(t,2+(n?1:0),3),M(t,s,h)):(w(t,4+(n?1:0),3),function(t,e,a,n){var r;for(w(t,e-257,5),w(t,a-1,5),w(t,n-4,4),r=0;r<n;r++)w(t,t.bl_tree[2*i[r]+1],3);C(t,t.dyn_ltree,e-1),C(t,t.dyn_dtree,a-1)}(t,t.l_desc.max_code+1,t.d_desc.max_code+1,o+1),M(t,t.dyn_ltree,t.dyn_dtree)),k(t),n&&x(t)})(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,V(t.strm)},Y=function(t,e){t.pending_buf[t.pending++]=e},Z=function(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},tt=function(t,e,a,n){var r=t.avail_in;return r>n&&(r=n),0===r?0:(t.avail_in-=r,e.set(t.input.subarray(t.next_in,t.next_in+r),a),1===t.state.wrap?t.adler=j(t.adler,e,r,a):2===t.state.wrap&&(t.adler=L(t.adler,e,r,a)),t.next_in+=r,t.total_in+=r,r)},et=function(t,e){var a,n,r=t.max_chain_length,i=t.strstart,s=t.prev_length,h=t.nice_match,l=t.strstart>t.w_size-F?t.strstart-(t.w_size-F):0,o=t.window,_=t.w_mask,d=t.prev,u=t.strstart+q,c=o[i+s-1],f=o[i+s];t.prev_length>=t.good_match&&(r>>=2),h>t.lookahead&&(h=t.lookahead);do{if(o[(a=e)+s]===f&&o[a+s-1]===c&&o[a]===o[i]&&o[++a]===o[i+1]){i+=2,a++;do{}while(o[++i]===o[++a]&&o[++i]===o[++a]&&o[++i]===o[++a]&&o[++i]===o[++a]&&o[++i]===o[++a]&&o[++i]===o[++a]&&o[++i]===o[++a]&&o[++i]===o[++a]&&i<u);if(n=q-(u-i),i=u-q,n>s){if(t.match_start=e,s=n,n>=h)break;c=o[i+s-1],f=o[i+s]}}}while((e=d[e&_])>l&&0!==--r);return s<=t.lookahead?s:t.lookahead},at=function(t){var e,a,n,r,i,s=t.w_size;do{if(r=t.window_size-t.lookahead-t.strstart,t.strstart>=s+(s-F)){t.window.set(t.window.subarray(s,s+s),0),t.match_start-=s,t.strstart-=s,t.block_start-=s,e=a=t.hash_size;do{n=t.head[--e],t.head[e]=n>=s?n-s:0}while(--a);e=a=s;do{n=t.prev[--e],t.prev[e]=n>=s?n-s:0}while(--a);r+=s}if(0===t.strm.avail_in)break;if(a=tt(t.strm,t.window,t.strstart+t.lookahead,r),t.lookahead+=a,t.lookahead+t.insert>=3)for(i=t.strstart-t.insert,t.ins_h=t.window[i],t.ins_h=R(t,t.ins_h,t.window[i+1]);t.insert&&(t.ins_h=R(t,t.ins_h,t.window[i+3-1]),t.prev[i&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=i,i++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<F&&0!==t.strm.avail_in)},nt=function(t,e){for(var a,n;;){if(t.lookahead<F){if(at(t),t.lookahead<F&&0===e)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=R(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-F&&(t.match_length=et(t,a)),t.match_length>=3)if(n=O(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=R(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!==--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=R(t,t.ins_h,t.window[t.strstart+1]);else n=O(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(n&&(X(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,4===e?(X(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(X(t,!1),0===t.strm.avail_out)?1:2},rt=function(t,e){for(var a,n,r;;){if(t.lookahead<F){if(at(t),t.lookahead<F&&0===e)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=R(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-F&&(t.match_length=et(t,a),t.match_length<=5&&(1===t.strategy||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){r=t.strstart+t.lookahead-3,n=O(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=r&&(t.ins_h=R(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!==--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,n&&(X(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if((n=O(t,0,t.window[t.strstart-1]))&&X(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(n=O(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,4===e?(X(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(X(t,!1),0===t.strm.avail_out)?1:2};function it(t,e,a,n,r){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=n,this.func=r}var st=[new it(0,0,0,0,function(t,e){var a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(at(t),0===t.lookahead&&0===e)return 1;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var n=t.block_start+a;if((0===t.strstart||t.strstart>=n)&&(t.lookahead=t.strstart-n,t.strstart=n,X(t,!1),0===t.strm.avail_out))return 1;if(t.strstart-t.block_start>=t.w_size-F&&(X(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,4===e?(X(t,!0),0===t.strm.avail_out?3:4):(t.strstart>t.block_start&&(X(t,!1),t.strm.avail_out),1)}),new it(4,4,8,4,nt),new it(4,5,16,8,nt),new it(4,6,32,32,nt),new it(4,4,16,16,rt),new it(8,16,32,32,rt),new it(8,16,128,128,rt),new it(8,32,128,256,rt),new it(32,128,258,1024,rt),new it(32,258,258,4096,rt)];function ht(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=8,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),K(this.dyn_ltree),K(this.dyn_dtree),K(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),K(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),K(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}for(var lt=function(t){var e,i=function(t){if(!t?.state)return G(t,Q);t.total_in=t.total_out=0,t.data_type=2;var e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?42:P,t.adler=2===e.wrap?0:1,e.last_flush=0,function(t){S||(function(){var t,e,i,p,m,v=Array(16);for(i=0,p=0;p<28;p++)for(_[p]=i,t=0;t<1<<a[p];t++)o[i++]=p;for(o[i-1]=p,m=0,p=0;p<16;p++)for(f[p]=m,t=0;t<1<<n[p];t++)l[m++]=p;for(m>>=7;p<30;p++)for(f[p]=m<<7,t=0;t<1<<n[p]-7;t++)l[256+m++]=p;for(e=0;e<=15;e++)v[e]=0;for(t=0;t<=143;)s[2*t+1]=8,t++,v[8]++;for(;t<=255;)s[2*t+1]=9,t++,v[9]++;for(;t<=279;)s[2*t+1]=7,t++,v[7]++;for(;t<=287;)s[2*t+1]=8,t++,v[8]++;for(z(s,287,v),t=0;t<30;t++)h[2*t+1]=5,h[2*t]=y(t,5);d=new g(s,a,257,286,15),u=new g(h,n,0,30,15),c=new g([],r,0,19,7)}(),S=!0),t.l_desc=new p(t.dyn_ltree,d),t.d_desc=new p(t.dyn_dtree,u),t.bl_desc=new p(t.bl_tree,c),t.bi_buf=0,t.bi_valid=0,k(t)}(e),0}(t);return 0===i&&((e=t.state).window_size=2*e.w_size,K(e.head),e.max_lazy_match=st[e.level].max_lazy,e.good_match=st[e.level].good_length,e.nice_match=st[e.level].nice_length,e.max_chain_length=st[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=2,e.match_available=0,e.ins_h=0),i},ot=function(t,e){var a,n;if(!t?.state||e>5||e<0)return t?G(t,Q):Q;var r=t.state;if(!t.output||!t.input&&0!==t.avail_in||r.status===W&&4!==e)return G(t,0===t.avail_out?-5:Q);r.strm=t;var i=r.last_flush;if(r.last_flush=e,42===r.status)if(2===r.wrap)t.adler=0,Y(r,31),Y(r,139),Y(r,8),r.gzhead?(Y(r,(r.gzhead.text?1:0)+(r.gzhead.hcrc?2:0)+(r.gzhead.extra?4:0)+(r.gzhead.name?8:0)+(r.gzhead.comment?16:0)),Y(r,255&r.gzhead.time),Y(r,r.gzhead.time>>8&255),Y(r,r.gzhead.time>>16&255),Y(r,r.gzhead.time>>24&255),Y(r,9===r.level?2:r.strategy>=2||r.level<2?4:0),Y(r,255&r.gzhead.os),r.gzhead.extra?.length&&(Y(r,255&r.gzhead.extra.length),Y(r,r.gzhead.extra.length>>8&255)),r.gzhead.hcrc&&(t.adler=L(t.adler,r.pending_buf,r.pending,0)),r.gzindex=0,r.status=69):(Y(r,0),Y(r,0),Y(r,0),Y(r,0),Y(r,0),Y(r,9===r.level?2:r.strategy>=2||r.level<2?4:0),Y(r,3),r.status=P);else{var h=8+(r.w_bits-8<<4)<<8;h|=(r.strategy>=2||r.level<2?0:r.level<6?1:6===r.level?2:3)<<6,0!==r.strstart&&(h|=32),h+=31-h%31,r.status=P,Z(r,h),0!==r.strstart&&(Z(r,t.adler>>>16),Z(r,65535&t.adler)),t.adler=1}if(69===r.status)if(r.gzhead.extra){for(a=r.pending;r.gzindex<(65535&r.gzhead.extra.length)&&(r.pending!==r.pending_buf_size||(r.gzhead.hcrc&&r.pending>a&&(t.adler=L(t.adler,r.pending_buf,r.pending-a,a)),V(t),a=r.pending,r.pending!==r.pending_buf_size));)Y(r,255&r.gzhead.extra[r.gzindex]),r.gzindex++;r.gzhead.hcrc&&r.pending>a&&(t.adler=L(t.adler,r.pending_buf,r.pending-a,a)),r.gzindex===r.gzhead.extra.length&&(r.gzindex=0,r.status=73)}else r.status=73;if(73===r.status)if(r.gzhead.name){a=r.pending;do{if(r.pending===r.pending_buf_size&&(r.gzhead.hcrc&&r.pending>a&&(t.adler=L(t.adler,r.pending_buf,r.pending-a,a)),V(t),a=r.pending,r.pending===r.pending_buf_size)){n=1;break}n=r.gzindex<r.gzhead.name.length?255&r.gzhead.name.charCodeAt(r.gzindex++):0,Y(r,n)}while(0!==n);r.gzhead.hcrc&&r.pending>a&&(t.adler=L(t.adler,r.pending_buf,r.pending-a,a)),0===n&&(r.gzindex=0,r.status=91)}else r.status=91;if(91===r.status)if(r.gzhead.comment){a=r.pending;do{if(r.pending===r.pending_buf_size&&(r.gzhead.hcrc&&r.pending>a&&(t.adler=L(t.adler,r.pending_buf,r.pending-a,a)),V(t),a=r.pending,r.pending===r.pending_buf_size)){n=1;break}n=r.gzindex<r.gzhead.comment.length?255&r.gzhead.comment.charCodeAt(r.gzindex++):0,Y(r,n)}while(0!==n);r.gzhead.hcrc&&r.pending>a&&(t.adler=L(t.adler,r.pending_buf,r.pending-a,a)),0===n&&(r.status=N)}else r.status=N;if(r.status===N&&(r.gzhead.hcrc?(r.pending+2>r.pending_buf_size&&V(t),r.pending+2<=r.pending_buf_size&&(Y(r,255&t.adler),Y(r,t.adler>>8&255),t.adler=0,r.status=P)):r.status=P),0!==r.pending){if(V(t),0===t.avail_out)return r.last_flush=-1,0}else if(0===t.avail_in&&J(e)<=J(i)&&4!==e)return G(t,-5);if(r.status===W&&0!==t.avail_in)return G(t,-5);if(0!==t.avail_in||0!==r.lookahead||0!==e&&r.status!==W){var l=2===r.strategy?function(t,e){for(var a;;){if(0===t.lookahead&&(at(t),0===t.lookahead)){if(0===e)return 1;break}if(t.match_length=0,a=O(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(X(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,4===e?(X(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(X(t,!1),0===t.strm.avail_out)?1:2}(r,e):3===r.strategy?function(t,e){for(var a,n,r,i,s=t.window;;){if(t.lookahead<=q){if(at(t),t.lookahead<=q&&0===e)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=s[r=t.strstart-1])===s[++r]&&n===s[++r]&&n===s[++r]){i=t.strstart+q;do{}while(n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&r<i);t.match_length=q-(i-r),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=O(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=O(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(X(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,4===e?(X(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(X(t,!1),0===t.strm.avail_out)?1:2}(r,e):st[r.level].func(r,e);if(3!==l&&4!==l||(r.status=W),1===l||3===l)return 0===t.avail_out&&(r.last_flush=-1),0;if(2===l&&(1===e?function(t){w(t,2,3),b(t,256,s),function(t){16===t.bi_valid?(v(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}(t)}(r):5!==e&&($(r,0,0,!1),3===e&&(K(r.head),0===r.lookahead&&(r.strstart=0,r.block_start=0,r.insert=0))),V(t),0===t.avail_out))return r.last_flush=-1,0}return 4!==e?0:r.wrap<=0?1:(2===r.wrap?(Y(r,255&t.adler),Y(r,t.adler>>8&255),Y(r,t.adler>>16&255),Y(r,t.adler>>24&255),Y(r,255&t.total_in),Y(r,t.total_in>>8&255),Y(r,t.total_in>>16&255),Y(r,t.total_in>>24&255)):(Z(r,t.adler>>>16),Z(r,65535&t.adler)),V(t),r.wrap>0&&(r.wrap=-r.wrap),0!==r.pending?0:1)},_t=function(t){if(!t?.state)return Q;var e=t.state.status;return 42!==e&&69!==e&&73!==e&&91!==e&&e!==N&&e!==P&&e!==W?G(t,Q):(t.state=null,e===P?G(t,-3):0)},dt=new Uint8Array(256),ut=0;ut<256;ut++)dt[ut]=ut>=252?6:ut>=248?5:ut>=240?4:ut>=224?3:ut>=192?2:1;dt[254]=dt[254]=1;var ct=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0},ft=Object.prototype.toString;function gt(){this.options={level:-1,method:8,chunkSize:16384,windowBits:15,memLevel:8,strategy:0};var t=this.options;t.raw&&t.windowBits>0?t.windowBits=-t.windowBits:t.gzip&&t.windowBits>0&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new ct,this.strm.avail_out=0;var e,a,n=function(t,e,a,n,r,i){if(!t)return Q;var s=1;if(-1===e&&(e=6),n<0?(s=0,n=-n):n>15&&(s=2,n-=16),r<1||r>9||8!==a||n<8||n>15||e<0||e>9||i<0||i>4)return G(t,Q);8===n&&(n=9);var h=new ht;return t.state=h,h.strm=t,h.wrap=s,h.gzhead=null,h.w_bits=n,h.w_size=1<<h.w_bits,h.w_mask=h.w_size-1,h.hash_bits=r+7,h.hash_size=1<<h.hash_bits,h.hash_mask=h.hash_size-1,h.hash_shift=~~((h.hash_bits+3-1)/3),h.window=new Uint8Array(2*h.w_size),h.head=new Uint16Array(h.hash_size),h.prev=new Uint16Array(h.w_size),h.lit_bufsize=1<<r+6,h.pending_buf_size=4*h.lit_bufsize,h.pending_buf=new Uint8Array(h.pending_buf_size),h.d_buf=1*h.lit_bufsize,h.l_buf=3*h.lit_bufsize,h.level=e,h.strategy=i,h.method=a,lt(t)}(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(0!==n)throw Error(T[n]);if(t.header&&(e=this.strm,a=t.header,e?.state&&(2!==e.state.wrap||(e.state.gzhead=a))),t.dictionary){var r;if(r="[object ArrayBuffer]"===ft.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,0!==(n=function(t,e){var a=e.length;if(!t?.state)return Q;var n=t.state,r=n.wrap;if(2===r||1===r&&42!==n.status||n.lookahead)return Q;if(1===r&&(t.adler=j(t.adler,e,a,0)),n.wrap=0,a>=n.w_size){0===r&&(K(n.head),n.strstart=0,n.block_start=0,n.insert=0);var i=new Uint8Array(n.w_size);i.set(e.subarray(a-n.w_size,a),0),e=i,a=n.w_size}var s=t.avail_in,h=t.next_in,l=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,at(n);n.lookahead>=3;){var o=n.strstart,_=n.lookahead-2;do{n.ins_h=R(n,n.ins_h,n.window[o+3-1]),n.prev[o&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=o,o++}while(--_);n.strstart=o,n.lookahead=2,at(n)}return n.strstart+=n.lookahead,n.block_start=n.strstart,n.insert=n.lookahead,n.lookahead=0,n.match_length=n.prev_length=2,n.match_available=0,t.next_in=h,t.input=l,t.avail_in=s,n.wrap=r,0}(this.strm,r)))throw Error(T[n]);this._dict_set=!0}}gt.prototype.push=function(t,e){var a,n,r=this.strm,i=this.options.chunkSize;if(this.ended)return!1;for(n=e===~~e?e:!0===e?4:0,"[object ArrayBuffer]"===ft.call(t)?r.input=new Uint8Array(t):r.input=t,r.next_in=0,r.avail_in=r.input.length;;)if(0===r.avail_out&&(r.output=new Uint8Array(i),r.next_out=0,r.avail_out=i),(2===n||3===n)&&r.avail_out<=6)this.onData(r.output.subarray(0,r.next_out)),r.avail_out=0;else{if(1===(a=ot(r,n)))return r.next_out>0&&this.onData(r.output.subarray(0,r.next_out)),a=_t(this.strm),this.onEnd(a),this.ended=!0,0===a;if(0!==r.avail_out){if(n>0&&r.next_out>0)this.onData(r.output.subarray(0,r.next_out)),r.avail_out=0;else if(0===r.avail_in)break}else this.onData(r.output)}return!0},gt.prototype.onData=function(t){this.chunks.push(t)},gt.prototype.onEnd=function(t){0===t&&(this.result=function(t){for(var e=0,a=0,n=t.length;a<n;a++)e+=t[a].length;for(var r=new Uint8Array(e),i=0,s=0,h=t.length;i<h;i++){var l=t[i];r.set(l,s),s+=l.length}return r}(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},new Map;const pt=globalThis;function mt(t,e,a){const n=new OffscreenCanvas(e,a).getContext("2d");if(!n)throw Error("2d context unavailable");return n.imageSmoothingQuality="low",n.drawImage(t,0,0,e,a),n}function vt(t){return Array.from(new Uint8Array(t),t=>t.toString(16).padStart(2,"0")).join("")}function wt(t){let e=2166136261;for(let a=0;a<t.length;a+=1)e^=t[a],e=Math.imul(e,16777619);return(e>>>0).toString(16).padStart(8,"0")}function bt(t,e,a){try{t.postMessage({type:"errored",error:e,streamId:a})}catch{t.postMessage({type:"errored",error:e+"",streamId:a})}}function yt(t){const e=t.strm.adler;return new Uint8Array([3,0,e>>>24&255,e>>>16&255,e>>>8&255,255&e])}!function(e=self){try{const a=new Map;e.addEventListener("message",n=>{try{const r=function(e,a,n){switch(n.action){case"init":return{type:"initialized",version:"7.17.0"};case"write":{let e=a.get(n.streamId);e||(e=new gt,a.set(n.streamId,e));const r=e.chunks.length,i=(new TextEncoder).encode(n.data);return e.push(i,2),{type:"wrote",id:n.id,streamId:n.streamId,result:t(e.chunks.slice(r)),trailer:yt(e),additionalBytesCount:i.length}}case"reset":a.delete(n.streamId);break;case"captureCanvas":(async function(t){const{id:e,bitmap:a}=t;try{const n=mt(a,a.width,a.height),r=Math.max(a.width,a.height)<=t.hashingMaxDimension?n:mt(n.canvas,...function(t,e,a){const n=Math.min(1,a/Math.max(t,e));return[Math.max(1,Math.round(t*n)),Math.max(1,Math.round(e*n))]}(a.width,a.height,t.hashingMaxDimension)),i=r.getImageData(0,0,r.canvas.width,r.canvas.height).data,s=`${t.canvasWidth}x${t.canvasHeight}-${await function(t){const e=pt.crypto?.subtle;return e?e.digest("SHA-256",t).then(vt,()=>wt(t)):Promise.resolve(wt(t))}(i)}`;return s===t.lastChangeHash?{type:"canvasUnchanged",id:e}:{type:"canvasCaptured",id:e,hash:s,image:await n.canvas.convertToBlob({type:"image/webp",quality:t.encodeQuality})}}catch(t){return{type:"canvasCaptureFailed",id:e,errorName:t instanceof Error?t.name:void 0}}finally{a.close()}})(n).then(t=>e.postMessage(t))}}(e,a,n.data);r&&e.postMessage(r)}catch(t){bt(e,t,n.data&&"streamId"in n.data?n.data.streamId:void 0)}})}catch(t){bt(e,t)}}()})();'])))
        }

        function o(t) {
            return I.get(t) || {
                status: 0
            }
        }

        function i(t, e, n, i = "deflate") {
            0 === o(i).status && function(t, e, n) {
                try {
                    const i = (0, T.B)(r)(t),
                        {
                            stop: a
                        } = (0, S.q2)(i, "error", r => {
                            s(t, e, n, r)
                        }),
                        {
                            stop: c
                        } = (0, S.q2)(i, "message", ({
                            data: r
                        }) => {
                            "errored" === r.type ? s(t, e, n, r.error, r.streamId) : "initialized" === r.type && function(t, e) {
                                const n = o(t);
                                1 === n.status && I.set(t, {
                                    status: 3,
                                    worker: n.worker,
                                    stop: n.stop,
                                    version: e
                                })
                            }(n, r.version)
                        });
                    i.postMessage({
                        action: "init"
                    }), (0, E.wg)(() => function(t, e) {
                        const n = o(e);
                        1 === n.status && (k.V.error(t + " failed to start: a timeout occurred while initializing the Worker"), n.initializationFailureCallbacks.forEach(t => t()), I.set(e, {
                            status: 2
                        }))
                    }(e, n), 3e4);
                    const u = () => {
                        a(), c()
                    };
                    I.set(n, {
                        status: 1,
                        worker: i,
                        stop: u,
                        initializationFailureCallbacks: []
                    })
                } catch (r) {
                    s(t, e, n, r)
                }
            }(t, e, i);
            const a = o(i);
            switch (a.status) {
                case 1:
                    return a.initializationFailureCallbacks.push(n), a.worker;
                case 3:
                    return a.worker
            }
        }

        function a(t = "deflate") {
            return o(t).status
        }

        function s(t, e, r, i, a) {
            const s = o(r);
            1 === s.status || 0 === s.status ? (n({
                configuredUrl: t.workerUrl,
                error: i,
                source: e,
                scriptType: "worker"
            }), 1 === s.status && s.initializationFailureCallbacks.forEach(t => t()), I.set(r, {
                status: 2
            })) : (0, C.VJ)(i, {
                worker_version: 3 === s.status && s.version,
                stream_id: a
            })
        }
        async function c() {
            try {
                return await (0, T.B)(u)()
            } catch (t) {
                n({
                    error: t,
                    source: "Recorder",
                    scriptType: "module"
                })
            }
        }
        async function u() {
            return (await t.e("datadogRecorder").then(() => t(766))).startRecording
        }
        async function l(t, e, n) {
            try {
                return await n
            } finally {
                t.notify(e)
            }
        }

        function d() {
            return void 0 !== g.J.Profiler
        }
        async function f() {
            try {
                return await (0, T.B)(p)()
            } catch (t) {
                n({
                    error: t,
                    source: "Profiler",
                    scriptType: "module"
                })
            }
        }
        async function p() {
            return (await t.e("datadogProfiler").then(() => t(3760))).createRumProfiler
        }
        var h = {
            5021(t, e, n) {
                function r(t) {
                    const e = {
                        version: "7.17.0",
                        onReady(t) {
                            t()
                        },
                        ...t
                    };
                    return Object.defineProperty(e, "_setDebug", {
                        get: () => i.p,
                        enumerable: !1
                    }), e
                }

                function o(t, e, n) {
                    const r = t[e];
                    r && !r.q && r.version && s.V.warn("SDK is loaded more than once. This is unsupported and might have unexpected behavior."), t[e] = n, r ? .q && r.q.forEach(t => (0, a.y)(t, "onReady callback threw an error:")())
                }
                n.d(e, {
                    Z: () => o,
                    m: () => r
                });
                var i = n(8789),
                    a = n(4993),
                    s = n(5648)
            },
            6448(t, e, n) {
                function r() {
                    return new a.cP(t => {
                        const e = i.J.window;
                        if (!e) return;
                        const {
                            stop: n
                        } = (0, s.lQ)(e, ["visibilitychange", "freeze"], e => {
                            "visibilitychange" === e.type && "hidden" === document.visibilityState ? t.notify({
                                reason: u.HIDDEN
                            }) : "freeze" === e.type && t.notify({
                                reason: u.FROZEN
                            })
                        }, {
                            capture: !0
                        }), r = (0, s.q2)(e, "beforeunload", () => {
                            t.notify({
                                reason: u.UNLOADING
                            })
                        }).stop, o = (0, s.q2)(e, "pagehide", e => {
                            e.persisted || t.notify({
                                reason: u.PAGE_TERMINATED
                            })
                        }).stop;
                        return () => {
                            n(), r(), o()
                        }
                    })
                }

                function o(t) {
                    return (0, c.KQ)(u).includes(t)
                }
                n.d(e, {
                    Kp: () => o,
                    _T: () => r
                });
                var i = n(2128),
                    a = n(3540),
                    s = n(449),
                    c = n(8424);
                const u = {
                    HIDDEN: "visibility_hidden",
                    UNLOADING: "before_unload",
                    PAGE_TERMINATED: "page_terminated",
                    FROZEN: "page_frozen"
                };
                n.d(e, ["y5", 0, u])
            },
            7409(t, e, n) {
                function r(t, e) {
                    if (document.readyState === t || "complete" === document.readyState) return e(), {
                        stop: i.l
                    };
                    const n = "complete" === t ? "load" : "DOMContentLoaded";
                    return (0, a.q2)(window, n, e, {
                        once: !0
                    })
                }

                function o(t) {
                    return new Promise(e => {
                        r(t, e)
                    })
                }
                n.d(e, {
                    H: () => r,
                    N: () => o
                });
                var i = n(9360),
                    a = n(449)
            },
            64(t, e, n) {
                function r() {
                    const {
                        navigator: t
                    } = o.J;
                    return {
                        status: t ? .onLine ? "connected" : "not_connected",
                        interfaces: t ? .connection ? .type ? [t.connection.type] : void 0,
                        effective_type: t ? .connection ? .effectiveType
                    }
                }
                n.d(e, {
                    q: () => r
                });
                var o = n(2128)
            },
            4023(t, e, n) {
                n.d(e, ["g", 0, {
                    AGENT: "agent",
                    CONSOLE: "console",
                    CUSTOM: "custom",
                    LOGGER: "logger",
                    NETWORK: "network",
                    SOURCE: "source",
                    REPORT: "report"
                }])
            },
            1468(t, e, n) {
                function r(t) {
                    try {
                        return t instanceof Error || "[object Error]" === Object.prototype.toString.call(t)
                    } catch {
                        return !1
                    }
                }
                n.d(e, {
                    b: () => r
                }), n.d(e, ["e", 0, "No stack, consider using an instance of Error"])
            },
            4215(t, e, n) {
                function r(t, e) {
                    return t * e / 100
                }

                function o(t, e) {
                    if (100 === e) return !0;
                    if (0 === e) return !1;
                    const n = i.get(e);
                    if (t === n ? .sessionId) return n.decision;
                    const r = function(t, e) {
                        const n = 1 n << 64 n;
                        return Number(1111111111111111111 n * t % n) <= e / 100 * Number(n)
                    }(BigInt("0x" + t.split("-")[4]), e);
                    return i.set(e, {
                        sessionId: t,
                        decision: r
                    }), r
                }
                n.d(e, {
                    $5: () => o,
                    it: () => r
                });
                const i = new Map
            },
            603(t, e, n) {
                var r = n(8333);
                const o = 4 * r.MA,
                    i = r.$H;
                n.d(e, ["AQ", 0, o, "HB", 0, 9e5, "Q_", 0, {
                    COOKIE: "cookie",
                    MEMORY: "memory",
                    LOCAL_STORAGE: "local-storage"
                }, "_P", 0, i])
            },
            8032(t, e, n) {
                function r() {
                    const t = a.J.window ? .DD_SOURCE_CODE_CONTEXT;
                    if (!t) return;
                    let e = !1,
                        n = !1,
                        r = !1;
                    for (const [o, i] of Object.entries(t)) {
                        if (e = e || void 0 !== i.ddDebugId, n = n || void 0 !== i.service, r = r || void 0 !== i.version, l.has(o)) continue;
                        l.add(o);
                        const t = (0, s.T)({
                            stack: o
                        }).stack[0] ? .url;
                        t && !u.has(t) && u.set(t, i)
                    }
                    d || (d = !0, (0, c.Q6)({
                        feature: "source-code-context",
                        use_debug_id: e,
                        use_service: n,
                        use_version: r
                    }))
                }

                function o(t) {
                    r();
                    const e = new Set,
                        n = [];
                    for (const r of t) {
                        if (e.has(r)) continue;
                        e.add(r);
                        const t = u.get(r) ? .ddDebugId;
                        void 0 !== t && n.push({
                            url: r,
                            id: t
                        })
                    }
                    return n.length ? n : void 0
                }

                function i(t) {
                    return r(), u.get(t)
                }
                n.d(e, {
                    Jv: () => o,
                    yN: () => i
                });
                var a = n(2128),
                    s = n(7286),
                    c = n(7003);
                const u = new Map,
                    l = new Set;
                let d = !1
            },
            98(t, e, n) {
                function r(t) {
                    const {
                        env: e,
                        service: n,
                        version: r,
                        datacenter: i,
                        sdkVersion: a,
                        variant: s
                    } = t, c = [o("sdk_version", a ? ? "7.17.0")];
                    return e && c.push(o("env", e)), n && c.push(o("service", n)), r && c.push(o("version", r)), i && c.push(o("datacenter", i)), s && c.push(o("variant", s)), c
                }

                function o(t, e) {
                    const n = e ? `${t}:${e}` : t;
                    return (n.length > 200 || function(t) {
                            return RegExp("[^\\p{Ll}\\p{Lo}0-9_:./-]", "u").test(t)
                        }(n)) && a.V.warn(`Tag ${n} doesn't meet tag requirements and will be sanitized. ${i.xG} ${i.fH}/getting_started/tagging/#defining-tags`),
                        function(t) {
                            return t.replace(/,/g, "_")
                        }(n)
                }
                n.d(e, {
                    m5: () => r
                });
                var i = n(1864),
                    a = n(5648)
            },
            7003(t, e, n) {
                function r(t) {
                    return 0 !== t && 100 * Math.random() <= t
                }

                function o() {
                    return q || (q = new h.dX(100)), q
                }

                function i(t, e, n, i) {
                    const a = new h.cP,
                        {
                            enabled: c,
                            metricsEnabled: u
                        } = function(t, e, n, i, a, c = 1, u = 15) {
                            const l = {},
                                d = !$.includes(e.site) && r(e.telemetrySampleRate),
                                f = {
                                    [N]: d,
                                    [j]: d && r(e.telemetryConfigurationSampleRate),
                                    [D]: d && r(e.telemetryUsageSampleRate),
                                    metric: d && r(c)
                                },
                                h = {
                                    is_local_file: "file:" === y.J.location ? .protocol,
                                    is_worker: y.W
                                },
                                v = o();
                            return v.subscribe(({
                                rawEvent: r,
                                metricName: o
                            }) => {
                                if (o && !f.metric || !f[r.type]) return;
                                const s = o || r.status || r.type;
                                let c = l[s];
                                if (c || (c = l[s] = new Set), c.size >= u) return;
                                const d = (0, m.s)(r);
                                if (c.has(d)) return;
                                const v = n.trigger({
                                    startTime: (0, p.M8)().relative
                                });
                                if (v === w.ug) return;
                                const y = function(t, n, r, o) {
                                    const i = {
                                        type: "telemetry",
                                        date: (0, p.M8)().timeStamp,
                                        service: n,
                                        version: "7.17.0",
                                        source: "browser",
                                        _dd: {
                                            format_version: 2
                                        },
                                        telemetry: (0, g.kg)(r, {
                                            runtime_env: o,
                                            connectivity: (0, R.q)(),
                                            sdk_setup: "cdn",
                                            sdk_name: a
                                        }),
                                        ddtags: (0, E.m5)(e).join(","),
                                        experimental_features: Array.from((0, T.q7)())
                                    };
                                    return (0, g.kg)(i, t)
                                }(v, t, r, h);
                                i.notify(y), (0, I.b)("telemetry", y), c.add(d)
                            }), v.unbuffer(), (0, S.Bd)(s), {
                                enabled: d,
                                metricsEnabled: f.metric
                            }
                        }(t, e, n, a, i),
                        {
                            stop: l
                        } = function(t, e) {
                            const n = [];
                            if ((0, M.d0)()) {
                                const t = (0, M.Y9)(),
                                    r = e.subscribe(e => t.send("internal_telemetry", e));
                                n.push(r.unsubscribe)
                            } else {
                                const r = [(0, x.ns)(t, "rum")],
                                    o = (0, x.np)(t, "rum");
                                o && function(t) {
                                    return t.site === _.Bb
                                }(t) && r.push(o);
                                const i = (0, P.X)({
                                    endpoints: r,
                                    reportError: v.l
                                });
                                n.push(i.stop);
                                const a = e.subscribe(i.add);
                                n.push(a.unsubscribe)
                            }
                            return {
                                stop: () => n.forEach(t => t())
                            }
                        }(e, a);
                    return {
                        stop: l,
                        enabled: c,
                        metricsEnabled: u
                    }
                }

                function a(t, e) {
                    (0, b.N)() && A.V.debug("[Telemetry]", t, e), o().notify({
                        rawEvent: {
                            type: N,
                            message: t,
                            status: "debug",
                            ...e
                        }
                    })
                }

                function s(t, e) {
                    o().notify({
                        rawEvent: {
                            type: N,
                            status: "error",
                            ...d(t),
                            ...e
                        }
                    })
                }

                function c(t) {
                    o().notify({
                        rawEvent: {
                            type: j,
                            configuration: t
                        }
                    })
                }

                function u(t, e) {
                    o().notify({
                        rawEvent: {
                            type: N,
                            message: t,
                            status: "debug",
                            ...e
                        },
                        metricName: t
                    })
                }

                function l(t) {
                    o().notify({
                        rawEvent: {
                            type: D,
                            usage: t
                        }
                    })
                }

                function d(t) {
                    if ((0, k.b)(t)) {
                        const e = (0, O.T)(t);
                        return {
                            error: {
                                kind: e.name,
                                stack: (0, C.Yn)(f(e))
                            },
                            message: e.message
                        }
                    }
                    return {
                        error: {
                            stack: k.e
                        },
                        message: "Uncaught " + (0, m.s)(t)
                    }
                }

                function f(t) {
                    return t.stack = t.stack.filter(t => !t.url || L.some(e => t.url.startsWith(e))), t
                }
                n.d(e, {
                    Rr: () => c,
                    A2: () => a,
                    VJ: () => s,
                    Gk: () => u,
                    Q6: () => l,
                    a5: () => i
                });
                var p = n(8333),
                    h = n(3540),
                    m = n(7637),
                    g = n(7472),
                    v = n(9360),
                    y = n(2128),
                    b = n(8789),
                    w = n(5119),
                    _ = n(8383),
                    x = n(5387),
                    S = n(1e3),
                    k = n(1468),
                    C = n(4021),
                    T = n(8925),
                    E = n(98),
                    A = n(5648),
                    I = n(350),
                    O = n(7286),
                    R = n(64),
                    M = n(9305),
                    P = n(6625);
                const N = "log",
                    j = "configuration",
                    D = "usage",
                    L = ["https://www.datadoghq-browser-agent.com", "https://www.datad0g-browser-agent.com", "https://d3uc069fcn7uxw.cloudfront.net", "https://d20xtzwzcl0ceb.cloudfront.net", "http://localhost", "<anonymous>"],
                    $ = [_.R8, _.KG];
                let q
            },
            4993(t, e, n) {
                function r(t, e) {
                    return (...n) => {
                        try {
                            return t(...n)
                        } catch (t) {
                            o.V.error(e, t)
                        }
                    }
                }
                n.d(e, {
                    y: () => r
                });
                var o = n(5648)
            },
            5648(t, e, n) {
                var r = n(1864);
                const o = (0, r.XH)("Datadog Browser SDK:"),
                    i = r.fH + "/real_user_monitoring/browser/troubleshooting";
                n.d(e, ["V", 0, o, "X", 0, i])
            },
            7522(t, e, n) {
                function r() {
                    let t = "",
                        e = 0;
                    return {
                        isAsync: !1,
                        get isEmpty() {
                            return !t
                        },
                        write(n, r) {
                            const i = (0, o.WW)(n);
                            e += i, t += n, r && r(i)
                        },
                        finish(t) {
                            t(this.finishSync())
                        },
                        finishSync() {
                            const n = {
                                output: t,
                                outputBytesCount: e,
                                rawBytesCount: e,
                                pendingData: ""
                            };
                            return t = "", e = 0, n
                        },
                        estimateEncodedBytesCount: t => t.length
                    }
                }
                n.d(e, {
                    N: () => r
                });
                var o = n(4989)
            },
            8925(t, e, n) {
                function r(t) {
                    Array.isArray(t) && t.filter(t => (0, s.Rj)(a, t)).forEach(t => {
                        c.add(t)
                    })
                }

                function o(t) {
                    return c.has(t)
                }

                function i() {
                    return c
                }
                n.d(e, {
                    Aq: () => r,
                    R9: () => a,
                    q7: () => i,
                    sr: () => o
                });
                var a, s = n(9056);
                ! function(t) {
                    t.SESSION_REPLAY_RECORD_CANVAS = "session_replay_record_canvas", t.TRACK_INTAKE_REQUESTS = "track_intake_requests", t.TRACK_WEBSOCKETS = "track_websockets", t.SOFT_NAVIGATION = "soft_navigation", t.COMPOSED_PATH_SELECTOR_ATTRIBUTES = "composed_path_selector_attributes"
                }(a || (a = {}));
                const c = new Set
            },
            3444(t, e, n) {
                function r(t, e, n, {
                    computeHandlingStack: r,
                    handlingStackType: o = "instrumented method"
                } = {}) {
                    let a = t[e];
                    if ("function" != typeof a) {
                        if (!(e in t) || "string" != typeof e || !e.startsWith("on")) return {
                            stop: d.l
                        };
                        a = d.l
                    }
                    let c = !1;
                    const {
                        stop: u
                    } = i(t, e, a, function(...t) {
                        return c ? a.apply(this, t) : s(n, {
                            target: this,
                            parameters: t,
                            handlingStack: r ? (0, f.uC)(o) : void 0
                        }, () => a.apply(this, t))
                    });
                    return {
                        stop() {
                            c = !0, u()
                        }
                    }
                }

                function o(t, e, n, {
                    computeHandlingStack: r
                } = {}) {
                    const o = t[e];
                    if ("function" != typeof o || a(t, e)) return {
                        stop: d.l
                    };
                    let c = !1;
                    const u = function(...t) {
                            if (!new.target) return Reflect.apply(o, this, t);
                            const e = new.target === u ? o : new.target;
                            return c ? Reflect.construct(o, t, e) : s(n, {
                                parameters: t,
                                handlingStack: r ? (0, f.uC)("instrumented constructor") : void 0
                            }, () => Reflect.construct(o, t, e))
                        },
                        l = function(t, e) {
                            for (const n of [].concat(Object.getOwnPropertyNames(e), Object.getOwnPropertySymbols(e))) Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
                            Object.setPrototypeOf(t, Object.getPrototypeOf(e));
                            const {
                                stop: n
                            } = i(e.prototype, "constructor", e.prototype.constructor, t);
                            return n
                        }(u, o),
                        {
                            stop: p
                        } = i(t, e, o, u);
                    return {
                        stop() {
                            c = !0, l(), p()
                        }
                    }
                }

                function i(t, e, n, r) {
                    return a(t, e) ? {
                        stop: d.l
                    } : (t[e] = r, {
                        stop() {
                            t[e] === r && (t[e] = n)
                        }
                    })
                }

                function a(t, e) {
                    const n = Object.getOwnPropertyDescriptor(t, e);
                    return !!n && !n.writable && !n.set
                }

                function s(t, e, n) {
                    let r;
                    (0, u.um)(t, null, [{ ...e,
                        onPostCall(t) {
                            r = t
                        }
                    }]);
                    const o = n();
                    return r && (0, u.um)(r, null, [o]), o
                }

                function c(t, e, n) {
                    const r = Object.getOwnPropertyDescriptor(t, e);
                    if (!r ? .set || !r.configurable) return {
                        stop: d.l
                    };
                    const o = d.l;
                    let i = (t, e) => {
                        (0, l.wg)(() => {
                            i !== o && n(t, e)
                        }, 0)
                    };
                    const a = function(t) {
                        r.set.call(this, t), i(this, t)
                    };
                    return Object.defineProperty(t, e, {
                        set: a
                    }), {
                        stop() {
                            Object.getOwnPropertyDescriptor(t, e) ? .set === a && Object.defineProperty(t, e, r), i = o
                        }
                    }
                }
                n.d(e, {
                    H7: () => r,
                    my: () => o,
                    tv: () => c
                });
                var u = n(1e3),
                    l = n(8975),
                    d = n(9360),
                    f = n(4021)
            },
            7922(t, e, n) {
                function r(t, e) {
                    if (window.requestIdleCallback && window.cancelIdleCallback) {
                        const n = window.requestIdleCallback((0, i.dm)(t), e);
                        return () => window.cancelIdleCallback(n)
                    }
                    return function(t) {
                        const e = (0, o.x3)(),
                            n = (0, a.wg)(() => {
                                t({
                                    didTimeout: !1,
                                    timeRemaining: () => Math.max(0, 50 - ((0, o.x3)() - e))
                                })
                            }, 0);
                        return () => (0, a.DJ)(n)
                    }(t)
                }
                n.d(e, {
                    BB: () => r
                });
                var o = n(8333),
                    i = n(1e3),
                    a = n(8975)
            },
            350(t, e, n) {
                function r(t, e) {
                    const n = o.J.__ddBrowserSdkExtensionCallback;
                    n && n({
                        type: t,
                        payload: e
                    })
                }
                n.d(e, {
                    b: () => r
                });
                var o = n(2128)
            },
            7286(t, e, n) {
                function r(t) {
                    const e = [];
                    let n = o(t, "stack");
                    const r = t + "";
                    if (n ? .startsWith(r) && (n = n.slice(r.length)), n && n.split("\n").forEach(t => {
                            const n = function(t) {
                                const e = d.exec(t);
                                if (!e) return;
                                const n = 0 === e[2] ? .indexOf("native"),
                                    r = 0 === e[2] ? .indexOf("eval"),
                                    o = f.exec(e[2]);
                                return r && o && (e[2] = o[1], e[3] = o[2], e[4] = o[3]), {
                                    args: n ? [e[2]] : [],
                                    column: e[4] ? +e[4] : void 0,
                                    func: e[1] || c,
                                    line: e[3] ? +e[3] : void 0,
                                    url: n ? void 0 : e[2]
                                }
                            }(t) || function(t) {
                                const e = p.exec(t);
                                if (e) return {
                                    args: [],
                                    column: e[4] ? +e[4] : void 0,
                                    func: e[1] || c,
                                    line: e[3] ? +e[3] : void 0,
                                    url: e[2]
                                }
                            }(t) || function(t) {
                                const e = h.exec(t);
                                if (e) return {
                                    args: [],
                                    column: e[4] ? +e[4] : void 0,
                                    func: e[1] || c,
                                    line: +e[3],
                                    url: e[2]
                                }
                            }(t) || function(t) {
                                const e = m.exec(t);
                                if (!e) return;
                                const n = e[3] && e[3].indexOf(" > eval") > -1,
                                    r = g.exec(e[3]);
                                return n && r && (e[3] = r[1], e[4] = r[2], e[5] = void 0), {
                                    args: e[2] ? e[2].split(",") : [],
                                    column: e[5] ? +e[5] : void 0,
                                    func: e[1] || c,
                                    line: e[4] ? +e[4] : void 0,
                                    url: e[3]
                                }
                            }(t);
                            n && (!n.func && n.line && (n.func = c), e.push(n))
                        }), e.length > 0 && function() {
                            if (void 0 !== y) return y;
                            const [t, e] = [class extends Error {
                                constructor() {
                                    super(), this.name = "Error"
                                }
                            }, Error].map(t => new t);
                            return y = a(Object.getPrototypeOf(t)) && e.stack !== t.stack, y
                        }() && t instanceof Error) {
                        const n = [];
                        let r = t;
                        for (;
                            (r = Object.getPrototypeOf(r)) && a(r);) {
                            const t = r.constructor ? .name || c;
                            n.push(t)
                        }
                        for (let t = n.length - 1; t >= 0 && e[0] ? .func === n[t]; t--) e.shift()
                    }
                    return {
                        message: o(t, "message"),
                        name: o(t, "name"),
                        stack: e
                    }
                }

                function o(t, e) {
                    return (0, s.OE)(t) && "string" == typeof t[e] ? t[e] : void 0
                }

                function i(t, e, n, r) {
                    if (void 0 === e) return;
                    const {
                        name: o,
                        message: i
                    } = function(t) {
                        let e, n;
                        return "[object String]" === {}.toString.call(t) && ([, e, n] = v.exec(t)), {
                            name: e,
                            message: n
                        }
                    }(t);
                    return {
                        name: o,
                        message: i,
                        stack: [{
                            url: e,
                            column: r,
                            line: n
                        }]
                    }
                }

                function a(t) {
                    return (t.constructor + "").startsWith("class ")
                }
                n.d(e, {
                    T: () => r,
                    h: () => i
                });
                var s = n(8307);
                const c = "?",
                    u = "((?:blob|native|eval|<anonymous>|[a-zA-Z][a-zA-Z0-9+.-]*:\\/\\/|\\w+\\.|\\/).*?)",
                    l = "(?::(\\d+))",
                    d = RegExp(`^\\s*at (.*?) ?\\(${u}${l}?${l}?\\)?\\s*$`, "i"),
                    f = RegExp(`\\((\\S*)${l}${l}\\)`),
                    p = RegExp(`^\\s*at\\s*(?:(.*)?(?: @))?\\s*${u}${l}?${l}??\\s*$`, "i"),
                    h = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
                    m = /^\s*(.*?)(?:\((.*?)\))?(?:(?:(?:^|@)((?:file|https?|blob|chrome|webpack|resource|capacitor|\[native).*?|[^@]*bundle|\[wasm code\])(?::(\d+))?(?::(\d+))?)|@)\s*$/i,
                    g = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
                    v = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?([\s\S]*)$/;
                let y
            },
            4021(t, e, n) {
                function r(t) {
                    const e = Error(t);
                    let n;
                    return e.name = "HandlingStack", (0, a.um)(() => {
                        const t = (0, s.T)(e);
                        t.stack = t.stack.slice(2), n = o(t)
                    }), n
                }

                function o(t) {
                    let e = i(t);
                    return t.stack.forEach(t => {
                        const n = "?" === t.func ? "<anonymous>" : t.func,
                            r = t.args && t.args.length > 0 ? `(${t.args.join(", ")})` : "",
                            o = t.line ? ":" + t.line : "",
                            i = t.line && t.column ? ":" + t.column : "";
                        e += `\n  at ${n}${r} @ ${t.url}${o}${i}`
                    }), e
                }

                function i(t) {
                    return `${t.name||"Error"}: ${t.message}`
                }
                n.d(e, {
                    NR: () => i,
                    Yn: () => o,
                    uC: () => r
                });
                var a = n(1e3),
                    s = n(7286)
            },
            6672(t, e, n) {
                function r(t, e) {
                    const n = t.indexOf(e);
                    n >= 0 && t.splice(n, 1)
                }

                function o(t) {
                    return Array.isArray(t) && t.length > 0
                }
                n.d(e, {
                    Ai: () => r,
                    EI: () => o
                })
            },
            9056(t, e, n) {
                function r(t) {
                    try {
                        return JSON.parse(t, c)
                    } catch {}
                }

                function o(t) {
                    return { ...t
                    }
                }

                function i(t, e) {
                    return Object.keys(t).some(n => t[n] === e)
                }

                function a(t) {
                    return 0 === Object.keys(t).length
                }

                function s(t, e) {
                    const n = {};
                    for (const r of Object.keys(t)) n[r] = e(t[r]);
                    return n
                }
                n.d(e, {
                    LG: () => s,
                    RI: () => a,
                    Rj: () => i,
                    XU: () => r,
                    yG: () => o
                });
                const c = (t, e) => "__proto__" === t ? void 0 : e
            },
            8424(t, e, n) {
                function r(t, e) {
                    for (let n = t.length - 1; n >= 0; n -= 1) {
                        const r = t[n];
                        if (e(r, n, t)) return r
                    }
                }

                function o(t) {
                    return Object.values(t)
                }

                function i(t) {
                    return Object.entries(t)
                }
                n.d(e, {
                    KQ: () => o,
                    Uk: () => r,
                    WP: () => i
                })
            },
            3472(t, e, n) {
                function r(t) {
                    return t >= 500
                }

                function o(t) {
                    try {
                        return t.clone()
                    } catch {
                        return
                    }
                }
                n.d(e, {
                    G: () => r,
                    i: () => o
                })
            },
            2511(t, e, n) {
                function r({
                    expireDelay: t,
                    maxEntries: e
                }) {
                    let n = [];
                    const r = () => {
                        if (!t) return;
                        const e = (0, o.$S)() - t;
                        for (; n.length > 0 && n[n.length - 1].endTime < e;) n.pop()
                    };
                    return t && (c || (c = (0, i.yb)(() => {
                        u.forEach(t => t())
                    }, 6e4)), u.add(r)), {
                        add(t, r) {
                            const o = {
                                value: t,
                                startTime: r,
                                endTime: s,
                                remove() {
                                    (0, a.Ai)(n, o)
                                },
                                close(t) {
                                    o.endTime = t
                                }
                            };
                            return e && n.length >= e && n.pop(), n.unshift(o), o
                        },
                        find(t = 1 / 0, e = {
                            returnInactive: !1
                        }) {
                            for (const r of n)
                                if (r.startTime <= t) {
                                    if (e.returnInactive || t <= r.endTime) return r.value;
                                    break
                                }
                        },
                        closeActive(t) {
                            const e = n[0];
                            e ? .endTime === s && e.close(t)
                        },
                        findAll(t = 1 / 0, e = 0) {
                            const r = (0, o.Gw)(t, e);
                            return n.filter(e => e.startTime <= r && t <= e.endTime).map(t => t.value)
                        },
                        findAllEntries(t = 1 / 0, e = 0) {
                            const r = (0, o.Gw)(t, e);
                            return n.filter(e => e.startTime <= r && t <= e.endTime)
                        },
                        getEntries: t => n.filter(e => e.startTime === t),
                        reset() {
                            n = []
                        },
                        stop() {
                            u.delete(r), 0 === u.size && c && ((0, i.vG)(c), c = void 0)
                        }
                    }
                }
                n.d(e, {
                    qj: () => r
                });
                var o = n(8333),
                    i = n(8975),
                    a = n(6672);
                const s = 1 / 0;
                let c;
                const u = new Set
            },
            6625(t, e, n) {
                function r({
                    pageMayExitObservable: t
                }) {
                    function e(t) {
                        if (0 === c) return;
                        const e = c,
                            n = s;
                        c = 0, s = 0, (0, v.DJ)(a), a = void 0, i.notify({
                            reason: t,
                            messagesCount: e,
                            bytesCount: n
                        })
                    }
                    let n;
                    const r = new g.cP,
                        o = t.subscribe(t => {
                            n = t.reason;
                            try {
                                r.notify(t.reason)
                            } finally {
                                n = void 0
                            }
                            e(t.reason)
                        }),
                        i = new g.cP(() => () => {
                            o.unsubscribe()
                        });
                    let a, s = 0,
                        c = 0;
                    return {
                        flushObservable: i,
                        prepareUrgentFlushObservable: r,
                        forceFlush: e,
                        get messagesCount() {
                            return c
                        },
                        notifyBeforeAddMessage(t) {
                            s + t >= h.AK && e(n ? ? "bytes_limit"), c += 1, s += t, void 0 === a && (a = (0, v.wg)(() => {
                                e("duration_limit")
                            }, 3e4))
                        },
                        notifyAfterAddMessage(t = 0) {
                            s += t, c >= y ? e(n ? ? "messages_limit") : s >= h.AK && e(n ? ? "bytes_limit")
                        }
                    }
                }

                function o({
                    encoder: t = (0, p.N)(),
                    endpoints: e,
                    reportError: n
                }) {
                    function o(e, n) {
                        const r = (0, s.s)(e),
                            o = t.estimateEncodedBytesCount(r);
                        o >= 262144 ? l.V.warn(`Discarded a message whose size was bigger than the maximum allowed size 256KiB. ${c.xG} ${l.X}/#technical-limitations`) : function(e, n, r) {
                            if (void 0 !== r) {
                                let o;
                                void 0 !== y[r] ? o = n - t.estimateEncodedBytesCount(y[r]) : (v.notifyBeforeAddMessage(n), o = 0), y[r] = e, v.notifyAfterAddMessage(o)
                            } else v.notifyBeforeAddMessage(n), t.write(t.isEmpty ? e : "\n" + e, t => {
                                v.notifyAfterAddMessage(t - n)
                            })
                        }(r, o, n)
                    }
                    const m = (0, a.B)(h.sA)(e, n),
                        g = (0, a.B)(f._T)(),
                        v = (0, a.B)(r)({
                            pageMayExitObservable: g
                        });
                    let y = {};
                    const b = v.flushObservable.subscribe(e => function(e) {
                        const n = (0, d.KQ)(y).join("\n");
                        y = {};
                        const r = (0, f.Kp)(e.reason),
                            o = r ? m.sendOnExit : m.send;
                        if (r && t.isAsync) {
                            const e = t.finishSync();
                            e.outputBytesCount && o(i(e));
                            const r = [e.pendingData, n].filter(Boolean).join("\n");
                            r && o({
                                data: r,
                                bytesCount: (0, u.WW)(r)
                            })
                        } else n && t.write(t.isEmpty ? n : "\n" + n), t.finish(t => {
                            o(i(t))
                        })
                    }(e));
                    return {
                        get isEmpty() {
                            return 0 === v.messagesCount
                        },
                        add: o,
                        upsert: o,
                        prepareUrgentFlushObservable: v.prepareUrgentFlushObservable,
                        forceFlush: v.forceFlush,
                        flushObservable: v.flushObservable,
                        stop: b.unsubscribe
                    }
                }

                function i(t) {
                    let e;
                    return e = "string" == typeof t.output ? t.output : new Blob([t.output], {
                        type: "text/plain"
                    }), {
                        data: e,
                        bytesCount: t.outputBytesCount,
                        encoding: t.encoding
                    }
                }
                n.d(e, {
                    X: () => o
                });
                var a = n(5762),
                    s = n(7637),
                    c = n(1864),
                    u = n(4989),
                    l = n(5648),
                    d = n(8424),
                    f = n(6448),
                    p = n(7522),
                    h = n(1776),
                    m = n(2128),
                    g = n(3540),
                    v = n(8975);
                const y = m.W ? 1 : 50
            },
            9305(t, e, n) {
                function r() {
                    const t = a.J.DatadogEventBridge;
                    if (t) return {
                        getCapabilities: () => JSON.parse(t.getCapabilities ? .() || "[]"),
                        getPrivacyLevel: () => t.getPrivacyLevel ? .(),
                        getIsTraceSampled: () => JSON.parse(t.getIsTraceSampled ? .() || "null"),
                        getAllowedWebViewHosts: () => JSON.parse(t.getAllowedWebViewHosts()),
                        send(e, n, r) {
                            const o = r ? {
                                id: r
                            } : void 0;
                            t.send(JSON.stringify({
                                eventType: e,
                                event: n,
                                view: o
                            }))
                        }
                    }
                }

                function o(t) {
                    const e = r();
                    return !!e && e.getCapabilities().includes(t)
                }

                function i(t = a.J.location ? .hostname) {
                    const e = r();
                    return e ? .getAllowedWebViewHosts().some(e => function(t, e) {
                        if (!e.includes("*")) return t === e || t.endsWith("." + e);
                        const n = e.split("*");
                        if (2 !== n.length) return s.V.error(`Invalid WebView host pattern "${e}": only one wildcard (*) is supported.`), !1;
                        const [r, o] = n;
                        return t.length > r.length + o.length && t.startsWith(r) && t.endsWith(o)
                    }(t, e)) ? ? !1
                }
                n.d(e, {
                    Ww: () => o,
                    Y9: () => r,
                    d0: () => i
                });
                var a = n(2128),
                    s = n(5648)
            },
            1776(t, e, n) {
                function r(t, e, n, r, s, c) {
                    0 === e.transportStatus && 0 === e.queuedPayloads.size() && e.bandwidthMonitor.canHandle(t) ? i(t, e, n, c, {
                        onSuccess: () => a(0, e, n, r, s, c),
                        onFailure() {
                            e.queuedPayloads.enqueue(t) || c.notify({
                                type: "queue-full",
                                bandwidth: e.bandwidthMonitor.stats(),
                                payload: t
                            }), o(e, n, r, s, c)
                        }
                    }) : e.queuedPayloads.enqueue(t) || c.notify({
                        type: "queue-full",
                        bandwidth: e.bandwidthMonitor.stats(),
                        payload: t
                    })
                }

                function o(t, e, n, r, s) {
                    2 === t.transportStatus && (0, v.wg)(() => {
                        i(t.queuedPayloads.first(), t, e, s, {
                            onSuccess() {
                                t.queuedPayloads.dequeue(), t.currentBackoffTime = 1e3, a(1, t, e, n, r, s)
                            },
                            onFailure() {
                                t.currentBackoffTime = Math.min(6e4, 2 * t.currentBackoffTime), o(t, e, n, r, s)
                            }
                        })
                    }, t.currentBackoffTime)
                }

                function i(t, e, n, r, {
                    onSuccess: o,
                    onFailure: i
                }) {
                    e.bandwidthMonitor.add(t), n(t, n => {
                        e.bandwidthMonitor.remove(t),
                            function(t) {
                                return "opaque" !== t.type && (0 === t.status && !navigator.onLine || 408 === t.status || 429 === t.status || (0, y.G)(t.status))
                            }(n) ? (e.transportStatus = e.bandwidthMonitor.ongoingRequestCount > 0 ? 1 : 2, t.retry = {
                                count: t.retry ? t.retry.count + 1 : 1,
                                lastFailureStatus: n.status
                            }, r.notify({
                                type: "failure",
                                bandwidth: e.bandwidthMonitor.stats(),
                                payload: t
                            }), i()) : (e.transportStatus = 0, r.notify({
                                type: "success",
                                bandwidth: e.bandwidthMonitor.stats(),
                                payload: t
                            }), o())
                    })
                }

                function a(t, e, n, o, i, a) {
                    0 === t && e.queuedPayloads.isFull() && !e.queueFullReported && (i(`Reached max ${o} events size queued for upload: ${b/p.iH}MiB`), e.queueFullReported = !0);
                    const c = e.queuedPayloads;
                    for (e.queuedPayloads = s(); c.size() > 0;) r(c.dequeue(), e, n, o, i, a)
                }

                function s() {
                    const t = [];
                    return {
                        bytesCount: 0,
                        enqueue(e) {
                            return !this.isFull() && (t.push(e), this.bytesCount += e.bytesCount, !0)
                        },
                        first: () => t[0],
                        dequeue() {
                            const e = t.shift();
                            return e && (this.bytesCount -= e.bytesCount), e
                        },
                        size: () => t.length,
                        isFull() {
                            return this.bytesCount >= b
                        }
                    }
                }

                function c(t, e, n = w) {
                    const o = new f.cP,
                        i = {
                            transportStatus: 0,
                            currentBackoffTime: 1e3,
                            bandwidthMonitor: {
                                ongoingRequestCount: 0,
                                ongoingByteCount: 0,
                                canHandle(t) {
                                    return 0 === this.ongoingRequestCount || this.ongoingByteCount + t.bytesCount <= 81920 && this.ongoingRequestCount < 32
                                },
                                add(t) {
                                    this.ongoingRequestCount += 1, this.ongoingByteCount += t.bytesCount
                                },
                                remove(t) {
                                    this.ongoingRequestCount -= 1, this.ongoingByteCount -= t.bytesCount
                                },
                                stats() {
                                    return {
                                        ongoingByteCount: this.ongoingByteCount,
                                        ongoingRequestCount: this.ongoingRequestCount
                                    }
                                }
                            },
                            queuedPayloads: s(),
                            queueFullReported: !1
                        };
                    return {
                        observable: o,
                        send(n) {
                            for (const a of t) r(n, i, (t, e) => {
                                l(a, t, e)
                            }, a.trackType, e, o)
                        },
                        sendOnExit(e) {
                            const r = function(t, e) {
                                if (t.bytesCount < e || "string" != typeof t.data) return [t];
                                const n = [];
                                let r = [],
                                    o = 0;
                                for (const i of t.data.split("\n")) {
                                    const a = (0, p.WW)(i);
                                    r.length > 0 && o + 1 + a >= e && (n.push({ ...t,
                                        data: r.join("\n"),
                                        bytesCount: o
                                    }), r = [], o = 0), o += (r.length > 0 ? 1 : 0) + a, r.push(i)
                                }
                                return 0 === n.length ? [t] : (n.push({ ...t,
                                    data: r.join("\n"),
                                    bytesCount: o
                                }), n)
                            }(e, n);
                            for (const e of t)
                                for (const t of r) u(e, n, t)
                        }
                    }
                }

                function u(t, e, n) {
                    if (n.bytesCount < e) try {
                        const e = t.build("beacon", n),
                            r = (0, h.c$)(e, m.J.document ? .baseURI ? ? m.J.location ? .href).protocol;
                        if (("http:" === r || "https:" === r) && navigator.sendBeacon(e, n.data)) return
                    } catch (t) {
                        ! function(t) {
                            _ || (_ = !0, (0, d.Dx)(t))
                        }(t)
                    }
                    l(t, n)
                }

                function l(t, e, n) {
                    const r = t.build("fetch", e);
                    (0, g.h)(r, {
                        method: "POST",
                        body: e.data,
                        mode: "cors"
                    }).then((0, d.dm)(t => n ? .({
                        status: t.status,
                        type: t.type
                    }))).catch((0, d.dm)(() => n ? .({
                        status: 0
                    })))
                }
                n.d(e, {
                    AK: () => w,
                    sA: () => c
                });
                var d = n(1e3),
                    f = n(3540),
                    p = n(4989),
                    h = n(9164),
                    m = n(2128),
                    g = n(5358),
                    v = n(8975),
                    y = n(3472);
                const b = 20 * p.iH,
                    w = 16384;
                let _ = !1
            },
            4539(t, e, n) {
                function r({
                    responseBodyAction: t
                } = {}) {
                    return t && Ir.push(t), Ar || (Ar = new br.cP(t => {
                        if (!_r.J.fetch) return;
                        const {
                            stop: e
                        } = (0, kr.H7)(_r.J, "fetch", e => function({
                            parameters: t,
                            onPostCall: e,
                            handlingStack: n
                        }, r) {
                            const [o, i] = t;
                            let a = i ? .method;
                            void 0 === a && o instanceof Request && (a = o.method);
                            const s = void 0 !== a ? (a + "").toUpperCase() : "GET",
                                c = o instanceof Request ? o.url : (0, xr.l2)(o + ""),
                                u = {
                                    state: "start",
                                    init: i,
                                    input: o,
                                    method: s,
                                    startClocks: (0, hr.M8)(),
                                    url: c,
                                    handlingStack: n,
                                    isAbortedOnStart: o instanceof Request && o.signal ? .aborted || i ? .signal ? .aborted || !1
                                };
                            r.notify(u), u.input !== o && (t[0] = u.input), u.init !== i && (t[1] = u.init), e(t => {
                                (async function(t, e, n) {
                                    const r = n;
                                    let o;
                                    try {
                                        o = await e
                                    } catch (e) {
                                        return void t.notify({ ...r,
                                            state: "resolve",
                                            status: 0,
                                            isAborted: r.init ? .signal ? .aborted || e instanceof DOMException && e.code === DOMException.ABORT_ERR,
                                            error: e
                                        })
                                    }
                                    if (r.response = o, r.status = o.status, r.responseType = o.type, r.isAborted = !1, 1 === Ir.reduce((t, e) => Math.max(t, e(r)), 0)) {
                                        const t = (0, Er.i)(o);
                                        if (t ? .body) try {
                                            const e = await async function(t) {
                                                const e = t.getReader(),
                                                    n = [];
                                                for (;;) {
                                                    const t = await e.read();
                                                    if (t.done) break;
                                                    n.push(t.value)
                                                }
                                                return e.cancel().catch(Cr.l), (0, Tr.wh)(n)
                                            }(t.body);
                                            r.responseBody = (new TextDecoder).decode(e)
                                        } catch {}
                                    }
                                    t.notify({ ...r,
                                        state: "resolve"
                                    })
                                })(r, t, u).catch(Sr.Dx)
                            })
                        }(e, t), {
                            computeHandlingStack: !0
                        });
                        return e
                    })), Ar
                }

                function o() {
                    return Rr || (Rr = "XMLHttpRequest" in _r.J ? new br.cP(t => {
                        const {
                            stop: e
                        } = (0, kr.H7)(XMLHttpRequest.prototype, "open", i), {
                            stop: n
                        } = (0, kr.H7)(XMLHttpRequest.prototype, "send", e => {
                            ! function({
                                target: t,
                                parameters: [e],
                                handlingStack: n
                            }, r) {
                                const o = Mr.get(t);
                                if (!o) return;
                                const i = o;
                                i.state = "start", i.startClocks = (0, hr.M8)(), i.isAborted = !1, i.xhr = t, i.handlingStack = n, i.requestBody = e;
                                let a = !1;
                                const {
                                    stop: s
                                } = (0, kr.H7)(t, "onreadystatechange", () => {
                                    t.readyState === XMLHttpRequest.DONE && c()
                                }), c = () => {
                                    if (u(), s(), a) return;
                                    a = !0;
                                    const e = o;
                                    e.duration = (0, hr.vk)(i.startClocks.timeStamp, (0, hr.nx)()), e.status = t.status, "string" == typeof t.response && (e.responseBody = t.response), r.notify({ ...e,
                                        state: "complete"
                                    })
                                }, {
                                    stop: u
                                } = (0, Or.q2)(t, "loadend", c);
                                r.notify(i)
                            }(e, t)
                        }, {
                            computeHandlingStack: !0
                        }), {
                            stop: r
                        } = (0, kr.H7)(XMLHttpRequest.prototype, "abort", a);
                        return () => {
                            e(), n(), r()
                        }
                    }) : new br.cP), Rr
                }

                function i({
                    target: t,
                    parameters: [e, n]
                }) {
                    Mr.set(t, {
                        state: "open",
                        method: (e + "").toUpperCase(),
                        url: (0, xr.l2)(n + "")
                    })
                }

                function a({
                    target: t
                }) {
                    const e = Mr.get(t);
                    e && (e.isAborted = !0)
                }

                function s(t, e = 225280) {
                    const n = (0, jr.M)(Object.prototype),
                        r = (0, jr.M)(Array.prototype);
                    try {
                        const n = [],
                            r = new WeakMap,
                            o = c(t, "$", void 0, n, r),
                            i = JSON.stringify(o);
                        let a = i ? i.length : 0;
                        if (a > e) return void l(e, "discarded", t);
                        for (; n.length > 0 && a < e;) {
                            const o = n.shift();
                            let i = 0;
                            if (Array.isArray(o.source))
                                for (let s = 0; s < o.source.length; s++) {
                                    const u = c(o.source[s], o.path, s, n, r);
                                    if (a += void 0 !== u ? JSON.stringify(u).length : 4, a += i, i = 1, a > e) {
                                        l(e, "truncated", t);
                                        break
                                    }
                                    o.target[s] = u
                                } else
                                    for (const s in o.source)
                                        if (Object.prototype.hasOwnProperty.call(o.source, s)) {
                                            const u = c(o.source[s], o.path, s, n, r);
                                            if (void 0 !== u && (a += JSON.stringify(u).length + i + s.length + 3, i = 1), a > e) {
                                                l(e, "truncated", t);
                                                break
                                            }
                                            o.target[s] = u
                                        }
                        }
                        return o
                    } finally {
                        n(), r()
                    }
                }

                function c(t, e, n, r, o) {
                    const i = function(t) {
                        if (("object" != typeof t || null === t) && "function" != typeof t) return t;
                        const e = t;
                        if ("function" == typeof e.toJSON) try {
                            return e.toJSON()
                        } catch {}
                        return t
                    }(t);
                    if (!i || "object" != typeof i) return "bigint" == typeof(a = i) ? "[BigInt] " + a.toString() : "function" == typeof a ? "[Function] " + (a.name || "unknown") : "symbol" == typeof a ? "[Symbol] " + (a.description || a.toString()) : a;
                    var a;
                    const s = u(i);
                    if ("[Object]" !== s && "[Array]" !== s && "[Error]" !== s) return s;
                    const c = t;
                    if (o.has(c)) return `[Reference seen at ${o.get(c)}]`;
                    const l = void 0 !== n ? `${e}.${n}` : e,
                        d = Array.isArray(i) ? [] : {};
                    return o.set(c, l), r.push({
                        source: i,
                        target: d,
                        path: l
                    }), d
                }

                function u(t) {
                    try {
                        if (t instanceof Event) return {
                            type: (e = t).type,
                            isTrusted: e.isTrusted,
                            currentTarget: e.currentTarget ? u(e.currentTarget) : null,
                            target: e.target ? u(e.target) : null
                        };
                        if (t instanceof RegExp) return "[RegExp] " + t.toString();
                        const n = Object.prototype.toString.call(t).match(/\[object (.*)\]/);
                        if (n ? .[1]) return `[${n[1]}]`
                    } catch {}
                    var e;
                    return "[Unserializable]"
                }

                function l(t, e, n) {
                    Lr.V.warn(`The data provided has been ${e} as it is over the limit of ${t} characters:`, n)
                }

                function d({
                    originalError: t,
                    stackTrace: e,
                    source: n,
                    useFallbackStack: r = !0,
                    nonErrorPrefix: o
                }) {
                    const i = (0, Ur.b)(t);
                    return {
                        source: n,
                        type: e ? e.name : void 0,
                        message: m(e, i, o, t),
                        stack: e ? (0, $r.Yn)(e) : r ? Ur.e : void 0
                    }
                }

                function f(t) {
                    return t ? .stack.map(t => t.url).filter(t => !!t) ? ? []
                }

                function p(t, e) {
                    const n = e.flatMap(({
                        stackTrace: t
                    }) => f(t));
                    return (0, qr.Jv)(f(t).concat(n))
                }

                function h({
                    stackTrace: t,
                    originalError: e,
                    handlingStack: n,
                    componentStack: r,
                    startClocks: o,
                    nonErrorPrefix: i,
                    useFallbackStack: a = !0,
                    source: s,
                    handling: c
                }) {
                    const u = t ? ? ((0, Ur.b)(e) ? (0, Nr.T)(e) : void 0),
                        l = (0, Ur.b)(e) ? function(t) {
                            const e = [];
                            let n = t.cause;
                            for (; null != n && e.length < 10;) {
                                const t = (0, Ur.b)(n),
                                    r = t ? (0, Nr.T)(n) : void 0;
                                e.push({
                                    originalError: n,
                                    stackTrace: r
                                }), n = t ? n.cause : void 0
                            }
                            return e
                        }(e) : [],
                        f = d({
                            originalError: e,
                            stackTrace: u,
                            source: s,
                            useFallbackStack: a,
                            nonErrorPrefix: i
                        }),
                        h = l.map(({
                            originalError: t,
                            stackTrace: e
                        }) => d({
                            originalError: t,
                            stackTrace: e,
                            source: s,
                            useFallbackStack: !1
                        }));
                    return {
                        startClocks: o,
                        handling: c,
                        handlingStack: n,
                        componentStack: r,
                        originalError: e,
                        ...f,
                        debugIds: p(u, l),
                        causes: h.length ? h : void 0,
                        fingerprint: g(e),
                        context: v(e)
                    }
                }

                function m(t, e, n, r) {
                    return t ? .message && t ? .name ? t.message : e ? "Empty message" : n ? `${n} ${(0,jr.s)(s(r))}` : (0, jr.s)(s(r))
                }

                function g(t) {
                    return (0, Ur.b)(t) && "dd_fingerprint" in t ? t.dd_fingerprint + "" : void 0
                }

                function v(t) {
                    if ((0, Dr.OE)(t)) return t.dd_context
                }

                function y() {
                    return new br.cP(t => {
                        const e = (e, n) => {
                                const r = h({
                                    stackTrace: n,
                                    originalError: e,
                                    startClocks: (0, hr.M8)(),
                                    nonErrorPrefix: "Uncaught",
                                    source: Vr.g.SOURCE,
                                    handling: "unhandled"
                                });
                                t.notify(r)
                            },
                            {
                                stop: n
                            } = (r = e, (0, kr.H7)(_r.J, "onerror", ({
                                parameters: [t, e, n, o, i]
                            }) => {
                                let a;
                                (0, Ur.b)(i) || (a = (0, Nr.h)(t, e, n, o)), r(i ? ? t, a)
                            }));
                        var r;
                        const {
                            stop: o
                        } = function(t) {
                            return (0, Or.BX)(_r.J.window, "unhandledrejection") ? (0, kr.H7)(_r.J, "onunhandledrejection", ({
                                parameters: [e]
                            }) => {
                                t(e.reason || "Empty reason")
                            }) : {
                                stop: Cr.l
                            }
                        }(e);
                        return () => {
                            n(), o()
                        }
                    })
                }

                function b(t, e, n, r) {
                    return (0, Sr.dm)((...o) => (r && (0, Pr.Q6)({
                        feature: r
                    }), t()[e][n](...o)))
                }

                function w(t, e, n) {
                    t.changeObservable.subscribe(() => {
                        const r = t.getContext();
                        n.notify(t => t[e].setContext(r))
                    })
                }

                function _(t, e) {
                    e.silentMultipleInit || Lr.V.error(t + " is already initialized.")
                }

                function x(t, e) {
                    return +t.toFixed(e)
                }

                function S(t) {
                    return "number" == typeof t
                }

                function k(t, e) {
                    switch (e.type) {
                        case "string":
                            return `"${t}" must be a non-empty string`;
                        case "number":
                            return void 0 !== e.min && void 0 !== e.max ? `"${t}" must be a number between ${e.min} and ${e.max}` : void 0 !== e.min ? `"${t}" must be a number greater than or equal to ${e.min}` : void 0 !== e.max ? `"${t}" must be a number less than or equal to ${e.max}` : `"${t}" must be a finite number`;
                        case "percentage":
                            return `"${t}" must be a number between 0 and 100`;
                        case "boolean":
                            return `"${t}" must be a boolean`;
                        case "site":
                            return `"${t}" must be a valid Datadog site. ${mr.xG} ${mr.fH}/getting_started/site/.`;
                        case "match-option":
                            return `"${t}" must be a string, RegExp, or function`;
                        case "enum":
                            return `"${t}" must be one of: "${A(e.values).join('", "')}"`;
                        case "union":
                            return `"${t}" does not match any expected type`;
                        case "schema":
                            return `"${t}" is not a valid object`;
                        case "function":
                            return `"${t}" must be a function`
                    }
                }

                function C(t, e, n) {
                    const r = {};
                    for (const [o, i] of Object.entries(t)) {
                        const t = e[o],
                            a = i.multiple ? T(i, t, n) : E(i, t, n);
                        if (void 0 === a) {
                            if (null != t && "" !== t) {
                                if (n.error(k(o, i)), i.required || !1 !== i.strict) return
                            } else if (i.required) return void n.error(`"${o}" is required`);
                            r[o] = "default" in i ? (0, vr.Go)(i.default) : void 0
                        } else r[o] = a
                    }
                    return r
                }

                function T(t, e, n) {
                    if (null == e) return;
                    if ("enum" === t.type && t.allowAll && "all" === e) return A(t.values).slice();
                    const r = Array.isArray(e) ? e : [e],
                        o = [];
                    for (const e of r) {
                        const r = E(t, e, n);
                        if (void 0 === r) {
                            if (!1 !== t.strict) return
                        } else o.push(r)
                    }
                    return !1 === t.strict && 0 === o.length && r.length > 0 ? void 0 : o
                }

                function E(t, e, n) {
                    if ("schema" === t.type) {
                        if ("object" != typeof e || null === e) return;
                        return C(t.schema, e, n)
                    }
                    if ("union" !== t.type) {
                        if (null != e) switch (t.type) {
                            case "function":
                                return "function" == typeof e ? e : void 0;
                            case "string":
                                return "string" == typeof e && e.length > 0 ? e : void 0;
                            case "number":
                                return "number" == typeof e && Number.isFinite(e) && (void 0 === t.min || e >= t.min) && (void 0 === t.max || e <= t.max) ? e : void 0;
                            case "percentage":
                                return (0, Dr.fp)(e) ? e : void 0;
                            case "boolean":
                                return "boolean" == typeof e ? e : !1 === t.strict ? !!e : void 0;
                            case "site":
                                if ("string" != typeof e || !vo.test(e)) return;
                                return e;
                            case "match-option":
                                return (0, Dr.Vl)(e) ? e : void 0;
                            case "enum":
                                return "string" == typeof e && A(t.values).includes(e) ? e : void 0
                        }
                    } else {
                        if (null == e) return;
                        for (const r of t.variants) {
                            const t = E(r, e, n);
                            if (void 0 !== t) return t
                        }
                    }
                }

                function A(t) {
                    return Array.isArray(t) ? t : Object.values(t)
                }

                function I(t, e) {
                    for (bo.lastIndex = 0;;) {
                        const n = bo.exec(t);
                        if (!n) break;
                        if (n[1] === e) return n[2]
                    }
                }

                function O(t, e, n = "") {
                    const r = t.charCodeAt(e - 1),
                        o = r >= 55296 && r <= 56319 ? e + 1 : e;
                    return t.length <= o ? t : `${t.slice(0,o)}${n}`
                }

                function R(t, e, n = 0, r) {
                    const o = new Date;
                    o.setTime(o.getTime() + n);
                    const i = "expires=" + o.toUTCString(),
                        a = r ? .crossSite ? "none" : "strict",
                        s = r ? .domain ? ";domain=" + r.domain : "",
                        c = r ? .secure ? ";secure" : "",
                        u = r ? .partitioned ? ";partitioned" : "";
                    document.cookie = `${t}=${e};${i};path=/;samesite=${a}${s}${c}${u}`
                }

                function M(t) {
                    const e = I(j(), t);
                    if ("" !== e) return e
                }

                function P(t) {
                    return function(t) {
                        const e = new Map;
                        for (bo.lastIndex = 0;;) {
                            const n = bo.exec(t);
                            if (!n) break; {
                                const t = n[1],
                                    r = n[2];
                                e.has(t) ? e.get(t).push(r) : e.set(t, [r])
                            }
                        }
                        return e
                    }(j()).get(t) || []
                }

                function N(t) {
                    return wo || (wo = function(t) {
                        const e = new Map;
                        for (bo.lastIndex = 0;;) {
                            const n = bo.exec(t);
                            if (!n) break;
                            e.set(n[1], n[2])
                        }
                        return e
                    }(j())), wo.get(t)
                }

                function j() {
                    try {
                        return document.cookie
                    } catch {
                        return ""
                    }
                }

                function D(t, e) {
                    R(t, "", 0, e)
                }

                function L(t, e) {
                    e.lastIndex = 0;
                    const n = e.exec(t);
                    if (!n) return;
                    const [r, o] = n;
                    return o || r
                }

                function $(t) {
                    return "\"'/\\bfnrt".includes(t) || t.startsWith("u") && 5 === t.length
                }

                function q(t) {
                    return t.startsWith("u") ? String.fromCharCode(parseInt(t.slice(1), 16)) : Mo[t]
                }

                function U(t, e) {
                    try {
                        localStorage.setItem(t, JSON.stringify(e))
                    } catch {}
                }

                function V(t, e, n, r) {
                    function o(t) {
                        if (Array.isArray(t)) return t.map(o);
                        if ((0, Dr.OE)(t)) {
                            if ("rcSerializedType" in t) {
                                const e = t.rcSerializedType;
                                switch (e) {
                                    case "string":
                                        return t.value;
                                    case "regex":
                                        return F(t.value);
                                    case "dynamic":
                                        return function(t) {
                                            const e = t.strategy;
                                            let n;
                                            switch (e) {
                                                case "cookie":
                                                    n = function({
                                                        name: t
                                                    }) {
                                                        const e = M(t);
                                                        return r.increment("cookie", void 0 !== e ? "success" : "missing"), e
                                                    }(t);
                                                    break;
                                                case "dom":
                                                    n = function({
                                                        selector: t,
                                                        attribute: e
                                                    }) {
                                                        let n;
                                                        try {
                                                            n = document.querySelector(t)
                                                        } catch {
                                                            return Lr.V.error(`Invalid selector in the remote configuration: '${t}'`), void r.increment("dom", "failure")
                                                        }
                                                        if (!n) return void r.increment("dom", "missing");
                                                        if (function(t, e) {
                                                                return "password" === t.getAttribute("type") && "value" === e
                                                            }(n, e)) return Lr.V.error(`Forbidden element selected by the remote configuration: '${t}'`), void r.increment("dom", "failure");
                                                        const o = void 0 !== e ? n.getAttribute(e) : n.textContent;
                                                        if (null !== o) return r.increment("dom", "success"), o;
                                                        r.increment("dom", "missing")
                                                    }(t);
                                                    break;
                                                case "js":
                                                    n = function({
                                                        path: t
                                                    }) {
                                                        let e = window;
                                                        const n = function(t) {
                                                            const e = [];
                                                            let n, r = 0;
                                                            const o = {
                                                                quote: void 0,
                                                                escapeSequence: void 0
                                                            };
                                                            let i = "";
                                                            for (const a of t) {
                                                                if (n = Io[r].find(t => Ao[t](a, o)), !n) return [];
                                                                if (void 0 !== o.escapeSequence && 12 !== n) {
                                                                    if (!$(o.escapeSequence)) return [];
                                                                    i += q(o.escapeSequence), o.escapeSequence = void 0
                                                                }
                                                                Oo.includes(n) ? i += a : Ro.includes(n) && "" !== i ? (e.push(i), i = "") : 12 === n ? o.escapeSequence = o.escapeSequence ? `${o.escapeSequence}${a}` : a : 8 === n ? o.quote = a : 9 === n && (o.quote = void 0), r = n
                                                            }
                                                            return Io[r].includes(1) ? ("" !== i && e.push(i), e) : []
                                                        }(t);
                                                        if (0 === n.length) return Lr.V.error(`Invalid JSON path in the remote configuration: '${t}'`), void r.increment("js", "failure");
                                                        for (const o of n) {
                                                            if (!(o in e)) return void r.increment("js", "missing");
                                                            try {
                                                                e = e[o]
                                                            } catch (e) {
                                                                return Lr.V.error(`Error accessing: '${t}'`, e), void r.increment("js", "failure")
                                                            }
                                                        }
                                                        return r.increment("js", "success"), e
                                                    }(t);
                                                    break;
                                                case "localStorage":
                                                    n = function({
                                                        key: t
                                                    }) {
                                                        let e;
                                                        try {
                                                            e = localStorage.getItem(t)
                                                        } catch {
                                                            return void r.increment("localStorage", "failure")
                                                        }
                                                        return r.increment("localStorage", null !== e ? "success" : "missing"), e ? ? void 0
                                                    }(t);
                                                    break;
                                                default:
                                                    return void Lr.V.error(`Unsupported remote configuration: "strategy": "${e}"`)
                                            }
                                            const o = t.extractor;
                                            return void 0 !== o && "string" == typeof n ? function(t, e) {
                                                const n = F(t.value);
                                                if (void 0 !== n) return L(e, n)
                                            }(o, n) : n
                                        }(t);
                                    default:
                                        return void Lr.V.error(`Unsupported remote configuration: "rcSerializedType": "${e}"`)
                                }
                            }
                            return (0, yo.LG)(t, o)
                        }
                        return t
                    }
                    const i = { ...t
                    };
                    if (e.rum) {
                        const t = e.rum;
                        No.forEach(e => {
                            e in t && (i[e] = o(t[e]))
                        }), Object.keys(n).forEach(e => {
                            var r;
                            void 0 !== t[e] && (r = n[e], t[e].forEach(({
                                key: t,
                                value: e
                            }) => {
                                r.setContextProperty(t, o(e))
                            }))
                        })
                    }
                    return void 0 !== e.profiling ? .sampleRate && (i.profilingSampleRate = e.profiling.sampleRate), i
                }

                function B() {
                    const t = {
                        fetch: {}
                    };
                    return {
                        get: () => t,
                        increment(e, n) {
                            t[e] || (t[e] = {}), t[e][n] || (t[e][n] = 0), t[e][n] = t[e][n] + 1
                        }
                    }
                }

                function F(t) {
                    try {
                        return RegExp(t)
                    } catch {
                        Lr.V.error(`Invalid regex in the remote configuration: '${t}'`)
                    }
                }

                function z(t) {
                    const e = t.headers ? .get("last-modified");
                    if (!e) return;
                    const n = new Date(e).getTime();
                    return isNaN(n) ? void 0 : n
                }
                async function H(t) {
                    let e;
                    try {
                        e = await (0, xo.h)(function(t) {
                            if (t.remoteConfigurationProxy) return t.remoteConfigurationProxy;
                            const e = W(t);
                            return (0, So.Hg)({
                                site: t.site,
                                path: `/v1/${encodeURIComponent(e)}.json`,
                                subdomain: "sdk-configuration"
                            })
                        }(t))
                    } catch {
                        e = void 0
                    }
                    if (!e ? .ok) return {
                        ok: !1,
                        error: Error("Error fetching the remote configuration.")
                    };
                    const n = await e.json();
                    return n.rum || n.profiling ? {
                        ok: !0,
                        value: n,
                        lastModified: z(e)
                    } : {
                        ok: !1,
                        error: Error("No remote configuration for RUM.")
                    }
                }

                function W(t) {
                    return t.remoteConfiguration ? .id ? ? t.remoteConfigurationId
                }

                function G(t, e, n) {
                    return !(0, ho.d0)() && (t ? ? (!e && "rum-salesforce" !== n))
                }

                function K(t) {
                    const e = new Set;
                    return (0, go.EI)(t.allowedTracingUrls) && t.allowedTracingUrls.forEach(t => {
                        J(t) ? .propagatorTypes.forEach(t => e.add(t))
                    }), Array.from(e)
                }

                function J(t) {
                    return (0, Dr.Vl)(t) ? {
                        match: t,
                        propagatorTypes: jo
                    } : (0, Dr.OE)(t) && (0, Dr.Vl)(t.match) && (null === t.propagatorTypes || void 0 === t.propagatorTypes || Array.isArray(t.propagatorTypes)) ? {
                        match: t.match,
                        propagatorTypes: t.propagatorTypes || jo
                    } : void 0
                }

                function Q(t) {
                    if (!t.allowedGraphQlUrls) return [];
                    if (!Array.isArray(t.allowedGraphQlUrls)) return Lr.V.warn("allowedGraphQlUrls should be an array"), [];
                    const e = [];
                    return t.allowedGraphQlUrls.forEach(t => {
                        (0, Dr.Vl)(t) ? e.push({
                            match: t,
                            trackPayload: !1,
                            trackResponseErrors: !1
                        }): (0, Dr.OE)(t) && (0, Dr.Vl)(t.match) && e.push({
                            match: t.match,
                            trackPayload: !!t.trackPayload,
                            trackResponseErrors: !!t.trackResponseErrors
                        })
                    }), e
                }

                function X(t) {
                    const e = t.trackResourceHeaders;
                    if (void 0 === e || !1 === e) return [];
                    if (!0 === e) return Do.map(t => ({
                        name: t
                    }));
                    if (!Array.isArray(e)) return Lr.V.warn("trackResourceHeaders should be true or an array of MatchHeader"), [];
                    if (0 === e.length) return Lr.V.warn("trackResourceHeaders is an empty array, no headers will be captured"), [];
                    const n = [];
                    return e.forEach((t, e) => {
                        if (!(0, Dr.OE)(t)) return void Lr.V.warn(`trackResourceHeaders[${e}] should be a MatchHeader object`);
                        if (void 0 !== t.name && !(0, Dr.Vl)(t.name)) return void Lr.V.warn(`trackResourceHeaders[${e}].name should be a MatchOption`);
                        if (void 0 !== t.url && !(0, Dr.Vl)(t.url)) return void Lr.V.warn(`trackResourceHeaders[${e}].url should be a MatchOption`);
                        if (void 0 !== t.extractor && !(t.extractor instanceof RegExp)) return void Lr.V.warn(`trackResourceHeaders[${e}].extractor should be a RegExp`);
                        if (void 0 !== t.location && ("string" != typeof t.location || !Uo.includes(t.location))) return void Lr.V.warn(`trackResourceHeaders[${e}].location should be 'request', 'response', or 'any'`);
                        const {
                            name: r,
                            ...o
                        } = t;
                        n.push({ ...o,
                            ...void 0 !== r ? {
                                name: "string" == typeof r ? r.toLowerCase() : r
                            } : {}
                        })
                    }), n
                }

                function Y(t) {
                    return (0, go.EI)(t) && t.some(t => (0, Dr.OE)(t) && t.trackResponseErrors)
                }

                function Z(t) {
                    return !!t && "function" == typeof t.then
                }

                function tt(t, e, n) {
                    function r() {
                        const t = localStorage.getItem(o);
                        return t ? (0, yo.XU)(t) ? ? {} : {}
                    }
                    if ("undefined" == typeof window || "undefined" == typeof localStorage) return;
                    const o = function(t, e) {
                        return `_dd_c_${t}_${e}`
                    }(e, n);
                    Vo.push((0, Or.q2)(window, "storage", ({
                        key: e
                    }) => {
                        o === e && t.setContext(r())
                    })), t.changeObservable.subscribe(function() {
                        localStorage.setItem(o, JSON.stringify(t.getContext()))
                    });
                    const i = (0, vr.kg)(r(), t.getContext());
                    (0, yo.RI)(i) || t.setContext(i)
                }

                function et(t, e, n) {
                    const r = { ...t
                    };
                    for (const [t, {
                            required: o,
                            type: i
                        }] of Object.entries(e)) "string" !== i || nt(r[t]) || (r[t] = r[t] + ""), o && nt(r[t]) && Lr.V.warn(`The property ${t} of ${n} is required; context will not be sent to the intake.`);
                    return r
                }

                function nt(t) {
                    return null == t || "" === t
                }

                function rt(t = "", {
                    propertiesConfig: e = {}
                } = {}) {
                    let n = {};
                    const r = new br.cP,
                        o = {
                            getContext: () => (0, vr.Go)(n),
                            setContext(i) {
                                ! function(t) {
                                    const e = "object" === (0, Dr.Pw)(t);
                                    return e || Lr.V.error("Unsupported context:", t), e
                                }(i) ? o.clearContext(): n = s(et(i, e, t)), r.notify()
                            },
                            setContextProperty(o, i) {
                                n = s(et({ ...n,
                                    [o]: i
                                }, e, t)), r.notify()
                            },
                            removeContextProperty(o) {
                                delete n[o], et(n, e, t), r.notify()
                            },
                            clearContext() {
                                n = {}, r.notify()
                            },
                            changeObservable: r
                        };
                    return o
                }

                function ot() {
                    return rt("global context")
                }

                function it() {
                    return rt("user", {
                        propertiesConfig: {
                            id: {
                                type: "string"
                            },
                            name: {
                                type: "string"
                            },
                            email: {
                                type: "string"
                            }
                        }
                    })
                }

                function at() {
                    return rt("account", {
                        propertiesConfig: {
                            id: {
                                type: "string",
                                required: !0
                            },
                            name: {
                                type: "string"
                            }
                        }
                    })
                }

                function st(t, e, n = !1) {
                    return t.some(t => {
                        try {
                            if ("function" == typeof t) return t(e);
                            if (t instanceof RegExp) return t.lastIndex = 0, t.test(e);
                            if ("string" == typeof t) return n ? e.startsWith(t) : t === e
                        } catch (t) {
                            Lr.V.error(t)
                        }
                        return !1
                    })
                }

                function ct(t) {
                    return Fo.some(e => t.includes(e))
                }

                function ut(t) {
                    return t.created ? Number(t.created) : void 0
                }

                function lt(t) {
                    const e = t.expire && Number(t.expire),
                        n = ut(t);
                    if (e && n) return Math.min(e, n + Jo.AQ)
                }

                function dt(t, e) {
                    const n = {
                        isExpired: "1"
                    };
                    return e.trackAnonymousUser && t ? .anonymousId && (n.anonymousId = t ? .anonymousId), n
                }

                function ft(t) {
                    return (0, yo.RI)(t)
                }

                function pt(t) {
                    return void 0 !== t.isExpired || ! function(t) {
                        const e = lt(t);
                        return !!e && (0, hr.x3)() < e
                    }(t)
                }

                function ht(t) {
                    t.expire = (0, hr.x3)() + Jo.HB + ""
                }

                function mt(t) {
                    return (0, Ko.WP)(t).map(([t, e]) => "anonymousId" === t ? "aid=" + e : `${t}=${e}`).join("&")
                }

                function gt(t) {
                    const e = {};
                    return function(t) {
                        return !!t && (-1 !== t.indexOf("&") || Qo.test(t))
                    }(t) && t.split("&").forEach(t => {
                        const n = Qo.exec(t);
                        if (null !== n) {
                            const [, t, r] = n;
                            "aid" === t ? e.anonymousId = r : e[t] = r
                        }
                    }), e
                }

                function vt(t, e) {
                    return ft(t) ? (e.trackAnonymousUser && (t.anonymousId = (0, yr.l)()), dt(t, e)) : t
                }

                function yt(t, e) {
                    if (ft(t)) return t;
                    let n = t;
                    return pt(t) && (n = dt(t, e)), n.id || (n.id = (0, yr.l)(), n.created = (0, hr.x3)() + ""), e.trackAnonymousUser && !n.anonymousId && (n.anonymousId = (0, yr.l)()), delete n.isExpired, ht(n), n
                }
                async function bt(t, e) {
                    const n = "dd_cookie_test_" + (0, yr.l)(),
                        r = "test",
                        o = t(n, e);
                    try {
                        return await o.getAllAndSet(() => ({
                            value: r,
                            expireDelay: 6e4
                        })), (await o.getAll()).includes(r)
                    } catch (t) {
                        return Lr.V.error(t), !1
                    } finally {
                        try {
                            await o.delete()
                        } catch {}
                    }
                }

                function wt(t, e) {
                    const n = (0, gr.B)(_r.J.cookieStore),
                        r = new br.cP(() => (0, Or.q2)(n, "change", e => {
                            (e.changed.some(e => e.name === t) || e.deleted.some(e => e.name === t)) && r.notify()
                        }).stop);
                    return {
                        getAll: async () => (await n.getAll(t)).map(t => t.value),
                        delete: () => n.delete({
                            name: t,
                            domain: e.domain,
                            path: "/",
                            partitioned: e.partitioned
                        }),
                        async getAllAndSet(r) {
                            const o = (await n.getAll(t)).map(t => t.value),
                                {
                                    value: i,
                                    expireDelay: a
                                } = r(o);
                            try {
                                await n.set({
                                    name: t,
                                    value: i,
                                    expires: (0, hr.x3)() + a,
                                    path: "/",
                                    sameSite: e.crossSite ? "none" : "strict",
                                    domain: e.domain,
                                    secure: e.secure,
                                    partitioned: e.partitioned
                                })
                            } catch {}
                        },
                        observable: r
                    }
                }

                function _t(t, e) {
                    function n(t) {
                        t + "" != r + "" && (r = t, o.notify())
                    }
                    let r = P(t);
                    const o = new br.cP(() => {
                        const e = (0, Ho.yb)(() => {
                            n(P(t))
                        }, 1e3);
                        return () => {
                            (0, Ho.vG)(e)
                        }
                    });
                    return {
                        getAll: () => Promise.resolve(P(t)),
                        async getAllAndSet(r) {
                            const o = P(t),
                                {
                                    value: i,
                                    expireDelay: a
                                } = r(o);
                            R(t, i, a, e), await Promise.resolve(), n([i])
                        },
                        async delete() {
                            D(t, e), await Promise.resolve(), n([])
                        },
                        observable: o
                    }
                }

                function xt() {
                    const t = (0, gr.B)(_r.J.cookieStore);
                    return !(!t || !(0, Or.BX)(t, "change"))
                }

                function St(t, e) {
                    return 1 === t ? wt(Xo, e) : _t(Xo, e)
                }

                function kt(t, e) {
                    let n;
                    for (const r of t.slice().reverse())
                        if (n = gt(r), n.c === e) break;
                    return delete n ? .c, n ? ? {}
                }

                function Ct(t) {
                    let e = 0;
                    return e |= 0, e |= (t.domain ? t.domain.split(".").length - 1 : 0) << 1, e |= t.crossSite ? 1 : 0, e.toString(16)
                }
                async function Tt(t) {
                    const e = void 0 !== (n = t.sessionPersistence) ? n : _r.W ? [Jo.Q_.MEMORY] : [Jo.Q_.COOKIE];
                    var n;
                    for (const n of e) {
                        const e = await Et(n, t);
                        if (void 0 !== e) return e
                    }
                }

                function Et(t, e) {
                    switch (t) {
                        case Jo.Q_.COOKIE:
                            return async function(t) {
                                const e = function(t) {
                                    const e = {};
                                    if (e.secure = t.useSecureSessionCookie || t.usePartitionedCrossSiteSessionCookie, e.crossSite = t.usePartitionedCrossSiteSessionCookie, e.partitioned = t.usePartitionedCrossSiteSessionCookie, t.trackSessionAcrossSubdomains) {
                                        const t = function(t = _r.J.location ? .hostname ? ? "", e = ("undefined" != typeof document ? document.referrer : "")) {
                                            if ("undefined" != typeof document) {
                                                if (void 0 === _o) {
                                                    const n = function(t, e) {
                                                        try {
                                                            return t || (0, xr.c$)(e).hostname
                                                        } catch {}
                                                    }(t, e);
                                                    if (n) {
                                                        const t = "dd_site_test_" + (0, yr.l)(),
                                                            e = "test",
                                                            r = n.split(".");
                                                        let o = r.pop();
                                                        try {
                                                            for (; r.length && !M(t);) o = `${r.pop()}.${o}`, R(t, e, 1e3, {
                                                                domain: o
                                                            });
                                                            D(t, {
                                                                domain: o
                                                            })
                                                        } catch {
                                                            return
                                                        }
                                                        _o = o
                                                    }
                                                }
                                                return _o
                                            }
                                        }();
                                        if (!t) return;
                                        e.domain = t
                                    }
                                    return e
                                }(t);
                                if (e) return xt() && await bt(wt, e) ? {
                                    type: Jo.Q_.COOKIE,
                                    cookieOptions: e,
                                    cookieApi: 1
                                } : await bt(_t, e) ? {
                                    type: Jo.Q_.COOKIE,
                                    cookieOptions: e,
                                    cookieApi: 0
                                } : void 0
                            }(e);
                        case Jo.Q_.LOCAL_STORAGE:
                            return function() {
                                try {
                                    const t = (0, yr.l)(),
                                        e = "_dd_test_" + t;
                                    localStorage.setItem(e, t);
                                    const n = localStorage.getItem(e);
                                    return localStorage.removeItem(e), t === n ? {
                                        type: Jo.Q_.LOCAL_STORAGE
                                    } : void 0
                                } catch {
                                    return
                                }
                            }();
                        case Jo.Q_.MEMORY:
                            return {
                                type: Jo.Q_.MEMORY
                            };
                        default:
                            return void Lr.V.error(`Invalid session persistence '${t+""}'`)
                    }
                }

                function At(t, e) {
                    switch (t.type) {
                        case Jo.Q_.COOKIE:
                            return function(t, e) {
                                function n(t) {
                                    return c.getAllAndSet(e => {
                                        let n = kt(e, s);
                                        u && (0, yo.RI)(n) && (n = kt(P("_dd_s"), s)), u = !1;
                                        const o = function(t, e) {
                                            return mt((0, yo.RI)(t) ? t : { ...t,
                                                c: Ct(e)
                                            })
                                        }(t(n), r);
                                        return {
                                            value: o,
                                            expireDelay: a ? Jo._P : Jo.AQ
                                        }
                                    })
                                }
                                const {
                                    cookieOptions: r,
                                    cookieApi: o
                                } = t, i = new br.cP, a = !!e.trackAnonymousUser, s = Ct(r), c = (0, gr.B)(St)(o, r);
                                let u = !0;
                                return c.observable.subscribe(() => {
                                    c.getAll().then(t => {
                                        i.notify(kt(t, s))
                                    }).catch(t => (0, Sr.Dx)(Error("Error while reading session cookies on change: " + t)))
                                }), {
                                    async setSessionState(t, e) {
                                        "undefined" != typeof navigator && navigator.locks ? await navigator.locks.request(Xo, () => n(t)).catch(t => {
                                            if (! function(t) {
                                                    return t instanceof Error && ("AbortError" === t.name || t.message.includes("no longer runnable") || t.message.includes("Responsible document is not fully active") || t.message.includes("The document is not active"))
                                                }(t)) throw t
                                        }) : (Yo = (Yo ? ? Promise.resolve()).then(() => n(t)), await Yo)
                                    },
                                    sessionObservable: i
                                }
                            }(t, e);
                        case Jo.Q_.LOCAL_STORAGE:
                            return function() {
                                const t = new br.cP(t => (0, Or.q2)(window, "storage", e => {
                                    e.key === Xo && e.storageArea === localStorage && t.notify(gt(e.newValue))
                                }).stop);
                                let e = !0;
                                return {
                                    async setSessionState(n, r) {
                                        let o = gt(localStorage.getItem(Xo));
                                        e && ft(o) && (o = gt(localStorage.getItem("_dd_s"))), e = !1;
                                        const i = n(o);
                                        localStorage.setItem(Xo, mt(i)), await Promise.resolve(), t.notify(i)
                                    },
                                    sessionObservable: t
                                }
                            }();
                        case Jo.Q_.MEMORY:
                            return function() {
                                const t = _r.J;
                                t[Zo] || (t[Zo] = {});
                                const e = t[Zo],
                                    n = new br.cP,
                                    r = e.onChange;
                                return e.onChange = t => {
                                    r ? .(t), n.notify(t)
                                }, {
                                    async setSessionState(t, n) {
                                        const r = e.state ? ? {},
                                            o = (0, yo.yG)(t(r));
                                        e.state = o, await Promise.resolve(), e.onChange ? .(o)
                                    },
                                    sessionObservable: n
                                }
                            }()
                    }
                }
                async function It(t, e) {
                    async function n() {
                        let e = {};
                        return await f.setSessionState(n => {
                            const r = vt(n, t);
                            return e = yt(r, t), e
                        }, "initialize"), e
                    }

                    function r(n) {
                        (0, Ho.DJ)(v);
                        const r = lt(n);
                        if (r) {
                            const n = r - (0, hr.x3)();
                            v = (0, Ho.wg)(() => {
                                f.setSessionState(n => pt(n) ? (e.isGranted() || delete n.anonymousId, dt(n, t)) : n, "expireOnTimeout").catch(Sr.Dx)
                            }, n)
                        }
                    }

                    function o(t) {
                        const e = p.find(),
                            n = void 0 !== e ? .id,
                            r = void 0 !== t.id,
                            o = n && r && e.id !== t.id;
                        if (!n || r && !o || (h = !0, l.notify(), p.closeActive((0, hr.$S)())), !r || n && !o) n && r && !o && (e.isReplayForced = !!t.forcedReplay);
                        else {
                            if (h) return;
                            p.add(s(t), (0, hr.$S)()), u.notify()
                        }
                    }

                    function i() {
                        e.isGranted() && m()
                    }

                    function a() {
                        g();
                        const n = dt(p.find(), t);
                        e.isGranted() || delete n.anonymousId, o(n), f.setSessionState(n => (e.isGranted() || delete n.anonymousId, dt(n, t)), "expire").catch(Sr.Dx)
                    }

                    function s(t) {
                        const e = ut(t) ? ? (0, hr.nx)();
                        return t.id ? {
                            id: t.id,
                            isReplayForced: !!t.forcedReplay,
                            anonymousId: t.anonymousId,
                            createdAt: e
                        } : {
                            id: "invalid",
                            isReplayForced: !1,
                            anonymousId: void 0,
                            createdAt: e
                        }
                    }
                    const c = (0, hr.$S)(),
                        u = new br.cP,
                        l = new br.cP,
                        d = await (0, gr.B)(Tt)(t);
                    if (!d) return void Lr.V.warn("No storage available for session. We will not send any data.");
                    const f = (0, gr.B)(At)(d, t),
                        p = (0, Wo.qj)({
                            maxEntries: 1e3
                        });
                    ei.push(() => p.stop());
                    let h = !1;
                    const {
                        throttled: m,
                        cancel: g
                    } = (0, zo.n)(() => {
                        h = !1, f.setSessionState(e => yt(e, t), "expandOrRenewOnActivity").catch(Sr.Dx)
                    }, 1e3);
                    let v;
                    ei.push(g), ei.push(() => (0, Ho.DJ)(v));
                    let y = !1;
                    ei.push(() => {
                        y = !0
                    });
                    let b = await n().catch(t => (0, Sr.Dx)(Error("Error while resolving initial session state: " + t)));
                    if (b && !y) {
                        for (; !e.isGranted();) {
                            if (a(), await new Promise(t => e.onGrantedOnce(t)), y) return;
                            if (b = await n().catch(Sr.Dx), !b || y) return
                        }
                        return p.add(s(b), (0, hr.Oc)().relative), r(b),
                            function() {
                                const t = f.sessionObservable.subscribe(t => {
                                    r(t), o(t)
                                });
                                ei.push(() => t.unsubscribe())
                            }(), e.observable.subscribe(() => {
                                e.isGranted() ? (h = !1, f.setSessionState(e => yt(e, t), "expandOrRenewOnConsent").catch(Sr.Dx)) : a()
                            }), _r.W || (function(t) {
                                const {
                                    stop: e
                                } = (0, Or.lQ)(window, ["click", "touchstart", "keydown", "scroll"], t, {
                                    capture: !0,
                                    passive: !0
                                });
                                ei.push(e)
                            }(i), function() {
                                const t = () => {
                                        "visible" === document.visibilityState && (h || f.setSessionState(t => function(t) {
                                            return pt(t) || ft(t) || !t.id || ht(t), t
                                        }(t), "expandOnVisibility").catch(Sr.Dx))
                                    },
                                    {
                                        stop: e
                                    } = (0, Or.q2)(document, "visibilitychange", t);
                                ei.push(e);
                                const n = (0, Ho.yb)(t, 6e4);
                                ei.push(() => {
                                    (0, Ho.vG)(n)
                                })
                            }(), function() {
                                const {
                                    stop: e
                                } = (0, Or.q2)(window, "resume", () => {
                                    f.setSessionState(e => vt(e, t), "initializeOnResume").catch(Sr.Dx)
                                }, {
                                    capture: !0
                                });
                                ei.push(e)
                            }()), (0, Pr.Gk)("Session manager init metrics", {
                                metrics: {
                                    duration: (0, hr.vk)(c, (0, hr.$S)())
                                }
                            }), {
                                findSession: (t, e) => p.find(t, e),
                                findTrackedSession(e, {
                                    returnInactive: n = !1,
                                    maxAge: r = ti
                                } = {}) {
                                    const o = p.find(e, {
                                        returnInactive: n
                                    });
                                    if (o && "invalid" !== o.id && (0, Go.$5)(o.id, t.sessionSampleRate) && !((0, hr.x3)() - o.createdAt > r)) return o
                                },
                                renewObservable: u,
                                expireObservable: l,
                                expire: a,
                                expandOrRenew: i,
                                updateSessionState(t) {
                                    f.setSessionState(e => ({ ...e,
                                        ...t
                                    }), "updateState").catch(Sr.Dx)
                                }
                            }
                    }
                }

                function Ot() {
                    return !(_r.W || !_r.J._DATADOG_SYNTHETICS_INJECTS_RUM && !N(ii))
                }

                function Rt() {
                    const t = function() {
                        const t = _r.J._DATADOG_SYNTHETICS_RUM_CONTEXT;
                        if (t) return t;
                        const e = N(ai);
                        return e ? (0, yo.XU)(decodeURIComponent(e)) : {
                            test_id: window._DATADOG_SYNTHETICS_PUBLIC_ID || N(ri),
                            result_id: window._DATADOG_SYNTHETICS_RESULT_ID || N(oi)
                        }
                    }();
                    return "object" == typeof(e = t) && null !== e && "string" == typeof e.test_id && "string" == typeof e.result_id ? t : void 0;
                    var e
                }

                function Mt(t) {
                    const e = t.name;
                    if (!(0, xr.AY)(e)) return mi;
                    const n = (0, xr.L2)(e);
                    for (const [e, r] of vi)
                        if (r(t.initiatorType, n)) return e;
                    return mi
                }

                function Pt(...t) {
                    for (let e = 1; e < t.length; e += 1)
                        if (t[e - 1] > t[e]) return !1;
                    return !0
                }

                function Nt(t) {
                    return "xmlhttprequest" === t.initiatorType || "fetch" === t.initiatorType
                }

                function jt(t) {
                    if (! function(t) {
                            const e = Pt(t.startTime, t.fetchStart, t.domainLookupStart, t.domainLookupEnd, t.connectStart, t.connectEnd, t.requestStart, t.responseStart, t.responseEnd),
                                n = ! function(t) {
                                    return t.redirectEnd > t.startTime
                                }(t) || Pt(t.startTime, t.redirectStart, t.redirectEnd, t.fetchStart);
                            return e && n
                        }(t)) return;
                    const {
                        startTime: e,
                        fetchStart: n,
                        workerStart: r,
                        redirectStart: o,
                        redirectEnd: i,
                        domainLookupStart: a,
                        domainLookupEnd: s,
                        connectStart: c,
                        secureConnectionStart: u,
                        connectEnd: l,
                        requestStart: d,
                        responseStart: f,
                        responseEnd: p
                    } = t, h = {
                        download: Dt(e, f, p),
                        first_byte: Dt(e, d, f)
                    };
                    return 0 < r && r < n && (h.worker = Dt(e, r, n)), n < l && (h.connect = Dt(e, c, l), c <= u && u <= l && (h.ssl = Dt(e, u, l))), n < s && (h.dns = Dt(e, a, s)), e < i && (h.redirect = Dt(e, o, i)), h
                }

                function Dt(t, e, n) {
                    if (t <= e && e <= n) return {
                        duration: (0, hr.Zj)((0, hr.vk)(e, n)),
                        start: (0, hr.Zj)((0, hr.vk)(t, e))
                    }
                }

                function Lt(t) {
                    return "" === t.nextHopProtocol ? void 0 : t.nextHopProtocol
                }

                function $t(t) {
                    return "" === t.deliveryType ? "other" : t.deliveryType
                }

                function qt(t) {
                    if (t.startTime < t.responseStart) {
                        const {
                            encodedBodySize: e,
                            decodedBodySize: n,
                            transferSize: r
                        } = t;
                        return {
                            size: n,
                            encoded_body_size: e,
                            decoded_body_size: n,
                            transfer_size: r
                        }
                    }
                    return {
                        size: void 0,
                        encoded_body_size: void 0,
                        decoded_body_size: void 0,
                        transfer_size: void 0
                    }
                }

                function Ut(t) {
                    return t && (!(0, uo.wo)(t) || (0, co.sr)(co.R9.TRACK_INTAKE_REQUESTS))
                }

                function Vt(t, e = 24e3) {
                    if (t.length <= e || !t.startsWith("data:")) return t;
                    const n = t.substring(0, 100).match(yi);
                    return n ? n[0] + "[...]" : t
                }

                function Bt() {
                    return Ft(63)
                }

                function Ft(t) {
                    const e = crypto.getRandomValues(new Uint32Array(2));
                    let n = BigInt(e[0]) + (BigInt(e[1]) << 32 n);
                    return 63 === t && (n &= 0x7fffffffffffffff n), n
                }

                function zt(t) {
                    return t.toString(16).padStart(16, "0")
                }

                function Ht(t) {
                    0 !== t.status || t.isAborted || (t.traceId = void 0, t.spanId = void 0, t.traceSampled = void 0)
                }

                function Wt(t, e, n, r, o, i) {
                    const a = n.findTrackedSession();
                    if (!a) return;
                    const s = t.allowedTracingUrls.find(t => st([t.match], e.url, !0));
                    if (!s) return;
                    const c = (0, Go.$5)(a.id, (0, Go.it)(t.sessionSampleRate, t.traceSampleRate)),
                        u = (0, ho.d0)() ? (0, ho.Y9)() ? .getIsTraceSampled() ? ? c : c;
                    (u || t.traceContextInjection === fo.ALL) && (e.traceSampled = u, e.traceId = Ft(64), e.spanId = Bt(), i(function(t, e, n, r, o, i, a, s) {
                        const c = {};
                        if (o.forEach(r => {
                                switch (r) {
                                    case "datadog":
                                        Object.assign(c, {
                                            "x-datadog-origin": "rum",
                                            "x-datadog-parent-id": e.toString(),
                                            "x-datadog-sampling-priority": n ? "1" : "0",
                                            "x-datadog-trace-id": t.toString()
                                        });
                                        break;
                                    case "tracecontext":
                                        Object.assign(c, {
                                            traceparent: `00-0000000000000000${zt(t)}-${zt(e)}-0${n?"1":"0"}`,
                                            tracestate: `dd=s:${n?"1":"0"};o:rum`
                                        });
                                        break;
                                    case "b3":
                                        Object.assign(c, {
                                            b3: `${zt(t)}-${zt(e)}-${n?"1":"0"}`
                                        });
                                        break;
                                    case "b3multi":
                                        Object.assign(c, {
                                            "X-B3-TraceId": zt(t),
                                            "X-B3-SpanId": zt(e),
                                            "X-B3-Sampled": n ? "1" : "0"
                                        })
                                }
                            }), s.propagateTraceBaggage) {
                            const t = {
                                    "session.id": r
                                },
                                e = i.getContext().id;
                            "string" == typeof e && (t["user.id"] = e);
                            const n = a.getContext().id;
                            "string" == typeof n && (t["account.id"] = n);
                            const o = Object.entries(t).map(([t, e]) => `${t}=${encodeURIComponent(e)}`).join(",");
                            o && (c.baggage = o)
                        }
                        return c
                    }(e.traceId, e.spanId, e.traceSampled, a.id, s.propagatorTypes, r, o, t)))
                }

                function Gt(t, e) {
                    return e.allowedGraphQlUrls.find(e => st([e.match], t))
                }

                function Kt(t) {
                    t.requestIndex || (t.requestIndex = wi++)
                }

                function Jt(t) {
                    return "string" == typeof t ? (0, Tr.WW)(t) : t instanceof ArrayBuffer || ArrayBuffer.isView(t) ? t.byteLength : "undefined" != typeof Blob && t instanceof Blob ? t.size : 0
                }

                function Qt(t) {
                    const e = t.id,
                        n = t.connectingClocks,
                        r = n.timeStamp,
                        o = Xt(t).timeStamp;
                    switch (t.phase) {
                        case "connecting":
                            return Zt(o, {
                                name: "websocket_connecting",
                                websocket: {
                                    id: e,
                                    url: t.url,
                                    requested_protocols: t.requestedProtocols,
                                    connecting_date: r
                                }
                            });
                        case "open":
                            return Zt(o, {
                                name: "websocket_open",
                                websocket: {
                                    id: e,
                                    connecting_duration: (0, hr.Zj)((0, hr.vk)(n.relative, t.openClocks.relative)),
                                    open_date: Yt(n, t.openClocks),
                                    selected_protocol: t.selectedProtocol,
                                    selected_extensions: t.selectedExtensions,
                                    snapshot_version: t.snapshotVersion,
                                    snapshot: te(t.snapshot)
                                }
                            });
                        case "closing":
                            return Zt(o, {
                                name: "websocket_closing",
                                websocket: {
                                    id: e,
                                    closing_date: Yt(n, t.closingClocks),
                                    close_initiator: "client"
                                }
                            });
                        case "closed":
                            return Zt(o, {
                                name: "websocket_closed",
                                websocket: {
                                    id: e,
                                    url: t.url,
                                    closed_date: Yt(n, t.endClocks),
                                    duration: (0, hr.Zj)((0, hr.vk)(n.relative, t.endClocks.relative)),
                                    tracking_end_reason: t.trackingEndReason,
                                    close_code: t.closeEvent ? .code,
                                    close_reason: t.closeEvent ? .reason,
                                    was_clean: t.closeEvent ? .wasClean,
                                    snapshot_version: t.snapshotVersion,
                                    snapshot: t.snapshot && te(t.snapshot, t)
                                }
                            })
                    }
                }

                function Xt(t) {
                    switch (t.phase) {
                        case "connecting":
                            return t.connectingClocks;
                        case "open":
                            return t.reportClocks;
                        case "closing":
                            return t.closingClocks;
                        case "closed":
                            return t.endClocks
                    }
                }

                function Yt(t, e) {
                    return Math.round((0, hr.Gw)(t.timeStamp, (0, hr.vk)(t.relative, e.relative)))
                }

                function Zt(t, e) {
                    return {
                        date: t,
                        type: Zr.VITAL,
                        vital: {
                            id: (0, yr.l)(),
                            type: so.WEBSOCKET,
                            ...e
                        }
                    }
                }

                function te({
                    inbound: t,
                    outbound: e,
                    bufferedAmountMax: n
                }, r) {
                    return {
                        inbound: { ...ee(t),
                            silence_before_close: (0, hr.Zj)(r ? .silenceBeforeClose.inbound)
                        },
                        outbound: { ...ee(e),
                            buffered_amount_max: n,
                            silence_before_close: (0, hr.Zj)(r ? .silenceBeforeClose.outbound),
                            buffered_amount_at_close: r ? .bufferedAmountAtClose
                        }
                    }
                }

                function ee(t) {
                    return {
                        message_count: t.messageCount,
                        message_size_total: t.messageSizeTotal,
                        message_size_max: t.messageSizeMax,
                        time_to_first_message: (0, hr.Zj)(t.timeToFirstMessage),
                        longest_silence: (0, hr.Zj)(t.longestSilence)
                    }
                }

                function ne(t) {
                    const e = "string" == typeof t ? [t] : t;
                    return e && e.length > 0 ? e : void 0
                }

                function re(t, e, n, r, o) {
                    void 0 === e ? o && (t.timeToFirstMessage = (0, hr.vk)(o.relative, r)) : t.longestSilence = ae(t.longestSilence, (0, hr.vk)(e, r)), t.messageCount += 1, t.messageSizeTotal += n, t.messageSizeMax = Math.max(t.messageSizeMax, n)
                }

                function oe(t, e, n) {
                    return void 0 === t ? n.longestSilence : ae(n.longestSilence, (0, hr.vk)(t, e))
                }

                function ie(t, e) {
                    return void 0 === t ? void 0 : (0, hr.vk)(t, e)
                }

                function ae(t, e) {
                    return Math.max(t, e)
                }

                function se(t) {
                    return S(t) && t < 0 ? void 0 : t
                }

                function ce(t) {
                    return t.nodeType === Node.TEXT_NODE
                }

                function ue(t) {
                    return t.nodeType === Node.ELEMENT_NODE
                }

                function le(t) {
                    return ue(t) && "CANVAS" === t.tagName
                }

                function de(t) {
                    return ue(t) && !!t.shadowRoot
                }

                function fe(t) {
                    const e = t;
                    return !!e.host && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && ue(e.host)
                }

                function pe(t, e) {
                    let n = t.firstChild;
                    for (; n;) e(n), n = n.nextSibling;
                    de(t) && e(t.shadowRoot)
                }

                function he(t) {
                    return fe(t) ? t.host : t.parentNode
                }

                function me(t) {
                    if (t.parentElement) return t.parentElement;
                    const e = t.parentNode;
                    return e && fe(e) ? e.host : null
                }

                function ge(t) {
                    return new br.cP(e => {
                        const n = t => {
                            const n = function(t) {
                                return t.filter(t => ! function(t) {
                                    return !(t.entryType !== _i.RESOURCE || Ut(t.name) && function(t) {
                                        return t.duration >= 0
                                    }(t))
                                }(t))
                            }(t);
                            n.length > 0 && e.notify(n)
                        };
                        let r, o = !0;
                        const i = new PerformanceObserver((0, Sr.dm)(t => {
                            o ? r = (0, Ho.wg)(() => n(t.getEntries())) : n(t.getEntries())
                        }));
                        return i.observe(t), o = !1, !xi && void 0 !== window.performance && "getEntries" in performance && "addEventListener" in performance && (xi = (0, Or.q2)(performance, "resourcetimingbufferfull", () => {
                            performance.clearResourceTimings()
                        })), () => {
                            i.disconnect(), (0, Ho.DJ)(r)
                        }
                    })
                }

                function ve(t) {
                    return PerformanceObserver.supportedEntryTypes.includes(t)
                }

                function ye(t, e, n, r, o, i) {
                    function a(t) {
                        u || (p(), o(t))
                    }
                    const s = (0, gr.B)(be)(t, e, n, r);
                    let c, u = !1;
                    const l = (0, Ho.wg)((0, Sr.dm)(() => a({
                            hadActivity: !1
                        })), 100),
                        d = void 0 !== i ? (0, Ho.wg)((0, Sr.dm)(() => a({
                            hadActivity: !0,
                            end: (0, hr.nx)()
                        })), i) : void 0,
                        f = s.subscribe(({
                            isBusy: t
                        }) => {
                            (0, Ho.DJ)(l), (0, Ho.DJ)(c);
                            const e = (0, hr.nx)();
                            t || (c = (0, Ho.wg)((0, Sr.dm)(() => a({
                                hadActivity: !0,
                                end: e
                            })), 100))
                        }),
                        p = () => {
                            u = !0, (0, Ho.DJ)(l), (0, Ho.DJ)(c), (0, Ho.DJ)(d), f.unsubscribe()
                        };
                    return {
                        stop: p
                    }
                }

                function be(t, e, n, r) {
                    return new br.cP(o => {
                        function i() {
                            o.notify({
                                isBusy: c > 0
                            })
                        }
                        const a = [];
                        let s, c = 0;
                        return a.push(e.subscribe(t => {
                            t.every(_e) || i()
                        }), n.subscribe(i), ge({
                            type: _i.RESOURCE
                        }).subscribe(t => {
                            t.some(t => !we(r, t.name)) && i()
                        }), t.subscribe(7, t => {
                            we(r, t.url) || (void 0 === s && (s = t.requestIndex), c += 1, i())
                        }), t.subscribe(8, t => {
                            we(r, t.url) || void 0 === s || t.requestIndex < s || (c -= 1, i())
                        })), () => {
                            a.forEach(t => t.unsubscribe())
                        }
                    })
                }

                function we(t, e) {
                    return st(t.excludedActivityUrls, e)
                }

                function _e(t) {
                    const e = "characterData" === t.type ? t.target.parentElement : t.target;
                    return !!(e && ue(e) && e.matches(`[${Si}], [${Si}] *`))
                }

                function xe(t, e) {
                    if (!t.isConnected) return;
                    const n = function(t) {
                            const e = [];
                            let n = t;
                            for (; n;) {
                                const t = n.getRootNode();
                                if (e.push({
                                        rootNode: t,
                                        target: n
                                    }), !fe(t)) break;
                                n = t.host
                            }
                            return e.reverse()
                        }(t),
                        r = [];
                    for (const {
                            rootNode: t,
                            target: o
                        } of n) {
                        const n = Se(o, t, e);
                        if (!n) return;
                        r.push(n)
                    }
                    return r.join("::shadow ")
                }

                function Se(t, e, n) {
                    let r, o = t;
                    for (; o && "HTML" !== o.nodeName;) {
                        const t = Re(o, e, Ei, Me, n, r);
                        if (t) return Ne(t, r);
                        r = Ne(Re(o, e, Ai, Pe, n, r) || Ie(o), r), o = o.parentElement
                    }
                    return r
                }

                function ke(t) {
                    return /[0-9]/.test(t)
                }

                function Ce(t) {
                    if (t.id && !ke(t.id)) return "#" + CSS.escape(t.id)
                }

                function Te(t) {
                    return CSS.escape(t.tagName)
                }

                function Ee(t, e) {
                    function n(e) {
                        if (t.hasAttribute(e)) return `${CSS.escape(t.tagName)}${Ae(e,t.getAttribute(e))}`
                    }
                    if (e) {
                        const t = n(e);
                        if (t) return t
                    }
                    for (const t of Ti) {
                        const e = n(t);
                        if (e) return e
                    }
                }

                function Ae(t, e) {
                    return `[${t}="${CSS.escape(e)}"]`
                }

                function Ie(t) {
                    const e = Oe(t);
                    return `${CSS.escape(t.tagName)}:nth-of-type(${e})`
                }

                function Oe(t) {
                    let e = t.parentNode.firstElementChild,
                        n = 1;
                    for (; e && e !== t;) e.tagName === t.tagName && (n += 1), e = e.nextElementSibling;
                    return n
                }

                function Re(t, e, n, r, o, i) {
                    for (const a of n) {
                        const n = a(t, o);
                        if (n && r(t, e, n, i)) return n
                    }
                }

                function Me(t, e, n, r) {
                    return 1 === e.querySelectorAll(Ne(n, r)).length
                }

                function Pe(t, e, n, r) {
                    let o;
                    if (void 0 === r) o = t => t.matches(n);
                    else {
                        const t = Ne(n + ":scope", r);
                        o = e => null !== e.querySelector(t)
                    }
                    let i = t.previousElementSibling;
                    for (; i;) {
                        if (o(i)) return !1;
                        i = i.previousElementSibling
                    }
                    for (i = t.nextElementSibling; i;) {
                        if (o(i)) return !1;
                        i = i.nextElementSibling
                    }
                    return !0
                }

                function Ne(t, e) {
                    return e ? `${t}>${e}` : t
                }

                function je(t) {
                    return `[${Oi}="${t}"], .dd-privacy-${t}`
                }

                function De(t, e, n) {
                    if (n ? .has(t)) return n.get(t);
                    const r = he(t),
                        o = r ? De(r, e, n) : e,
                        i = Le($e(t), o);
                    return n && n.set(t, i), i
                }

                function Le(t, e) {
                    switch (e) {
                        case Ii.HIDDEN:
                        case Ii.IGNORE:
                            return e
                    }
                    switch (t) {
                        case Ii.ALLOW:
                        case Ii.MASK:
                        case Ii.MASK_USER_INPUT:
                        case Ii.MASK_UNLESS_ALLOWLISTED:
                        case Ii.HIDDEN:
                        case Ii.IGNORE:
                            return t;
                        default:
                            return e
                    }
                }

                function $e(t) {
                    if (ue(t)) {
                        if ("BASE" === t.tagName) return Ii.ALLOW;
                        if ("INPUT" === t.tagName) {
                            const e = t;
                            if ("password" === e.type || "email" === e.type || "tel" === e.type) return Ii.MASK;
                            if ("hidden" === e.type) return Ii.MASK;
                            const n = e.getAttribute("autocomplete");
                            if (n && (n.startsWith("cc-") || n.endsWith("-password"))) return Ii.MASK
                        }
                        return t.matches(je(Ii.HIDDEN)) ? Ii.HIDDEN : t.matches(je(Ii.MASK)) ? Ii.MASK : t.matches(je(Ii.MASK_UNLESS_ALLOWLISTED)) ? Ii.MASK_UNLESS_ALLOWLISTED : t.matches(je(Ii.MASK_USER_INPUT)) ? Ii.MASK_USER_INPUT : t.matches(je(Ii.ALLOW)) ? Ii.ALLOW : function(t) {
                            function e(e) {
                                return (t.getAttribute(e) || "").toLowerCase()
                            }
                            if ("SCRIPT" === t.nodeName) return !0;
                            if ("LINK" === t.nodeName) {
                                const t = e("rel");
                                return /preload|prefetch/i.test(t) && "script" === e("as") || "shortcut icon" === t || "icon" === t
                            }
                            if ("META" === t.nodeName) {
                                const n = e("name"),
                                    r = e("rel"),
                                    o = e("property");
                                return /^msapplication-tile(image|color)$/.test(n) || "application-name" === n || "icon" === r || "apple-touch-icon" === r || "shortcut icon" === r || "keywords" === n || "description" === n || /^(og|twitter|fb):/.test(o) || /^(og|twitter):/.test(n) || "pinterest" === n || "robots" === n || "googlebot" === n || "bingbot" === n || t.hasAttribute("http-equiv") || "author" === n || "generator" === n || "framework" === n || "publisher" === n || "progid" === n || /^article:/.test(o) || /^product:/.test(o) || "google-site-verification" === n || "yandex-verification" === n || "csrf-token" === n || "p:domain_verify" === n || "verify-v1" === n || "verification" === n || "shopify-checkout-api-token" === n
                            }
                            return !1
                        }(t) ? Ii.IGNORE : void 0
                    }
                }

                function qe(t, e) {
                    switch (e) {
                        case Ii.MASK:
                        case Ii.HIDDEN:
                        case Ii.IGNORE:
                            return !0;
                        case Ii.MASK_UNLESS_ALLOWLISTED:
                            return ce(t) ? !!Ve(t.parentNode) || !ze(t.textContent || "") : Ve(t) || le(t);
                        case Ii.MASK_USER_INPUT:
                            return ce(t) ? Ve(t.parentNode) : Ve(t);
                        default:
                            return !1
                    }
                }

                function Ue(t, e, n, r, o) {
                    if (r !== Ii.MASK && r !== Ii.MASK_UNLESS_ALLOWLISTED) return !1;
                    if (e === Oi || Ti.includes(e) || e === o.actionNameAttribute) return !1;
                    switch (e) {
                        case "title":
                        case "alt":
                        case "placeholder":
                        case "aria-label":
                            return !0;
                        case "name":
                            return "SLOT" !== t
                    }
                    return "A" === t && "href" === e || "IFRAME" === t && "srcdoc" === e || !(!n || !e.startsWith("data-")) || !("IMG" !== t && "SOURCE" !== t || "src" !== e && "srcset" !== e)
                }

                function Ve(t) {
                    if (!t || t.nodeType !== t.ELEMENT_NODE) return !1;
                    const e = t;
                    if ("INPUT" === e.tagName) switch (e.type) {
                        case "button":
                        case "color":
                        case "reset":
                        case "submit":
                            return !1
                    }
                    return !!Mi[e.tagName]
                }

                function Be(t) {
                    return t.replace(/\S/g, "x")
                }

                function Fe(t, e) {
                    const n = t.parentElement ? .tagName;
                    let r = t.textContent || "";
                    const o = e;
                    return "SCRIPT" === n || o === Ii.HIDDEN ? r = "***" : qe(t, o) && ("DATALIST" === n || "SELECT" === n || "OPTGROUP" === n || (r = "OPTION" === n ? "***" : Be(r))), "HEAD" !== n || r.trim() ? r : ""
                }

                function ze(t) {
                    return !t ? .trim() || window.$DD_ALLOW ? .has(t.toLocaleLowerCase()) || !1
                }

                function He({
                    lifeCycle: t,
                    isChildEvent: e,
                    onChange: n = Cr.l
                }) {
                    const r = {
                            errorCount: 0,
                            longTaskCount: 0,
                            resourceCount: 0,
                            actionCount: 0,
                            frustrationCount: 0
                        },
                        o = t.subscribe(13, t => {
                            if ("view" !== t.type && "vital" !== t.type && e(t)) switch (t.type) {
                                case Zr.ERROR:
                                    r.errorCount += 1, n();
                                    break;
                                case Zr.ACTION:
                                    r.actionCount += 1, t.action.frustration && (r.frustrationCount += t.action.frustration.type.length), n();
                                    break;
                                case Zr.LONG_TASK:
                                    r.longTaskCount += 1, n();
                                    break;
                                case Zr.RESOURCE:
                                    t._dd ? .discarded || (r.resourceCount += 1, n())
                            }
                        });
                    return {
                        stop() {
                            o.unsubscribe()
                        },
                        eventCounts: r
                    }
                }

                function We(t) {
                    function e(t) {
                        i.delete(t.key), t.eventCounts ? .stop()
                    }

                    function n() {
                        i.forEach(t => {
                            e(t)
                        }), o.reset()
                    }

                    function r(t) {
                        const n = i.get(t);
                        if (!n) return;
                        const r = n.eventCounts ? .eventCounts;
                        return e(n), n.historyEntry.remove(), { ...n.data,
                            id: n.id,
                            startClocks: n.startClocks,
                            counts: r
                        }
                    }
                    const o = (0, Wo.qj)({
                            expireDelay: 3e5
                        }),
                        i = new Map,
                        a = t.subscribe(10, n);
                    return {
                        start(e, n, a, s) {
                            const c = (0, yr.l)(),
                                u = o.add(c, n.relative);
                            i.has(e) && r(e);
                            const l = {
                                id: c,
                                key: e,
                                startClocks: n,
                                data: a,
                                historyEntry: u,
                                eventCounts: s ? .isChildEvent ? He({
                                    lifeCycle: t,
                                    isChildEvent: s.isChildEvent(c)
                                }) : void 0
                            };
                            return i.set(e, l), l
                        },
                        stop(t, n, r) {
                            const o = i.get(t);
                            if (!o) return;
                            const a = r ? (0, vr.kg)(o.data, r) : o.data;
                            o.historyEntry.close(n.relative);
                            const s = (0, hr.vk)(o.startClocks.timeStamp, n.timeStamp),
                                c = o.eventCounts ? .eventCounts;
                            return e(o), { ...a,
                                id: o.id,
                                startClocks: o.startClocks,
                                duration: s,
                                counts: c
                            }
                        },
                        discard: r,
                        getCounts: t => i.get(t) ? .eventCounts ? .eventCounts,
                        findId: t => o.findAll(t),
                        stopAll() {
                            a.unsubscribe(), n(), o.stop()
                        }
                    }
                }

                function Ge(t, e, n) {
                    return [Te(t), Ce(t) || ""].concat(function(t, e, n) {
                        const r = [];
                        for (const o of Array.from(t.attributes)) {
                            const i = o.name;
                            if (n && Ke(t, i, e)) {
                                const e = De(t, n.configuration.defaultPrivacyLevel, n.nodePrivacyLevelCache);
                                if (e === Ii.HIDDEN || e === Ii.IGNORE) continue;
                                const a = o.value;
                                if (Ue(t.tagName, i, a, e, n.configuration) && (e !== Ii.MASK_UNLESS_ALLOWLISTED || !ze(a))) continue;
                                r.push(Ae(CSS.escape(i), O(a, 100)))
                            } else e.includes(i) && r.push(Ae(i, o.value))
                        }
                        return r.sort()
                    }(t, e, n), function(t) {
                        return Array.from(t.classList).filter(t => !ke(t)).sort().map(t => "." + CSS.escape(t))
                    }(t), function(t) {
                        const e = Array.from(t.parentNode.children);
                        if (e.length <= 1) return "";
                        const n = e.filter(e => e.tagName === t.tagName),
                            r = e.indexOf(t),
                            o = Oe(t);
                        return `:nth-child(${r+1})${n.length>1?`:nth-of-type(${o})`:""}`
                    }(t), ";")
                }

                function Ke(t, e, n) {
                    return "href" === e ? "A" === t.tagName : e.startsWith("data-") ? e !== Oi && !Ti.includes(e) && (!ke(e) || n.includes(e)) : Di.includes(e)
                }

                function Je(t, e) {
                    return 0 !== (t & e)
                }

                function Qe(t) {
                    let e = 0,
                        n = t;
                    for (; n;) {
                        const t = n.getAttribute("data-dd-ignore-frustration");
                        if (null !== t) {
                            const n = t.split(/\s+/);
                            if ("" === t.trim() || n.includes("all")) return 7;
                            n.includes("rage-click") && (e |= 1), n.includes("dead-click") && (e |= 2), n.includes("error-click") && (e |= 4)
                        }
                        if (7 === e) break;
                        n = me(n)
                    }
                    return e
                }

                function Xe(t, e) {
                    const n = function(t, e) {
                        let n = t;
                        for (; n;) {
                            if (n.matches(e)) return n;
                            n = me(n)
                        }
                        return null
                    }(t, `[${e}]`);
                    if (n) return tn(Ze(n.getAttribute(e).trim()))
                }

                function Ye(t, e, n, r) {
                    let o = t,
                        i = 0;
                    for (; i <= 10 && o && "BODY" !== o.nodeName && "HTML" !== o.nodeName && "HEAD" !== o.nodeName;) {
                        for (const t of e) {
                            const e = t(o, n, r);
                            if (e) {
                                const {
                                    name: t,
                                    nameSource: n
                                } = e, r = t ? .trim();
                                if (r) return {
                                    name: tn(Ze(r)),
                                    nameSource: n
                                }
                            }
                        }
                        if ("FORM" === o.nodeName) break;
                        o = me(o), i += 1
                    }
                }

                function Ze(t) {
                    return t.replace(/\s+/g, " ")
                }

                function tn(t) {
                    return t.length > 100 ? O(t, 100) + " [...]" : t
                }

                function en(t, e, n, r) {
                    const {
                        enablePrivacyForActionName: o,
                        defaultPrivacyLevel: i
                    } = n;
                    let a = t.getAttribute(e);
                    if (a && o) {
                        const o = De(t, i, r);
                        Ue(t.tagName, e, a, o, n) && (c = Ci, a = ze(s = a) ? s : c || Be(s))
                    } else a || (a = "");
                    var s, c;
                    return {
                        name: a,
                        nameSource: "standard_attribute"
                    }
                }

                function nn(t, e, n) {
                    return {
                        name: rn(t, e, n) || "",
                        nameSource: "text_content"
                    }
                }

                function rn(t, e, n) {
                    if (t.isContentEditable) return;
                    const {
                        enablePrivacyForActionName: r,
                        actionNameAttribute: o,
                        defaultPrivacyLevel: i
                    } = e, a = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, function(t) {
                        const e = De(t, i, n);
                        if (r && e && qe(t, e)) return NodeFilter.FILTER_REJECT;
                        if (ue(t)) {
                            if (t.hasAttribute(ki) || o && t.hasAttribute(o)) return NodeFilter.FILTER_REJECT;
                            const e = getComputedStyle(t);
                            if ("visible" !== e.visibility || "none" === e.display || e.contentVisibility && "visible" !== e.contentVisibility) return NodeFilter.FILTER_REJECT
                        }
                        return NodeFilter.FILTER_ACCEPT
                    });
                    let s = "";
                    for (; a.nextNode();) {
                        const t = a.currentNode;
                        ue(t) ? ("BR" === t.nodeName || "P" === t.nodeName || ["block", "flex", "grid", "list-item", "table", "table-caption"].includes(getComputedStyle(t).display)) && (s += " ") : s += t.textContent || ""
                    }
                    return s.replace(/\s+/g, " ").trim()
                }

                function on() {
                    const t = window.getSelection();
                    return !t || t.isCollapsed
                }

                function an(t) {
                    return t.target instanceof Element && !1 !== t.isPrimary
                }

                function sn(t) {
                    if (Je(t.ignore, 2)) return !1;
                    if (t.hasPageActivity || t.getUserActivity().input || t.getUserActivity().scroll) return !1;
                    let e = t.event.target;
                    return "LABEL" === e.tagName && e.hasAttribute("for") && (e = document.getElementById(e.getAttribute("for"))), !e ? .matches('input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]),textarea,select,[contenteditable],[contenteditable] *,canvas,a[href],a[href] *')
                }

                function cn(t, e) {
                    qi.set(t, e), qi.forEach((t, e) => {
                        (0, hr.vk)(e, (0, hr.$S)()) > 1e4 && qi.delete(e)
                    })
                }

                function un(t) {
                    return e => e.action ? .id ? .includes(t) ? ? !1
                }

                function ln(t, e, n, r) {
                    function o(t) {
                        if (!c ? .tryAppend(t)) {
                            const e = t.clone(),
                                n = function(t) {
                                    function r(t) {
                                        t.stopObservable.subscribe(o), a.push(t), (0, Ho.DJ)(s), s = (0, Ho.wg)(i, 1e3)
                                    }

                                    function o() {
                                        1 === u && a.every(t => t.isStopped()) && (u = 2, function(t, e) {
                                            const {
                                                isRage: n
                                            } = function(t, e) {
                                                if (function(t) {
                                                        if (t.some(t => Je(t.ignore, 1) || t.getUserActivity().selection || t.getUserActivity().scroll)) return !1;
                                                        for (let e = 0; e < t.length - 2; e += 1)
                                                            if (t[e + 3 - 1].event.timeStamp - t[e].event.timeStamp <= 1e3) return !0;
                                                        return !1
                                                    }(t)) return e.addFrustration("rage_click"), t.some(sn) && e.addFrustration(ao), e.hasError && !Je(e.ignore, 4) && e.addFrustration(io), {
                                                    isRage: !0
                                                };
                                                const n = t.some(t => t.getUserActivity().selection);
                                                return t.forEach(t => {
                                                    t.hasError && !Je(t.ignore, 4) && t.addFrustration(io), sn(t) && !n && t.addFrustration(ao)
                                                }), {
                                                    isRage: !1
                                                }
                                            }(t, e);
                                            n ? (t.forEach(t => t.discard()), e.stop((0, hr.nx)()), e.validate(t.map(t => t.event))) : (e.discard(), t.forEach(t => t.validate()))
                                        }(a, e), c === n && (c = void 0))
                                    }

                                    function i() {
                                        (0, Ho.DJ)(s), 0 === u && (u = 1, o())
                                    }
                                    const a = [];
                                    let s, u = 0;
                                    return r(t), {
                                        tryAppend(t) {
                                            return 0 === u && (a.length > 0 && (n = t, !(Je((e = a[a.length - 1]).ignore, 1) === Je(n.ignore, 1) && e.event.target === n.event.target && (o = e.event, s = n.event, Math.sqrt(Math.pow(o.clientX - s.clientX, 2) + Math.pow(o.clientY - s.clientY, 2)) <= 100) && e.event.timeStamp - n.event.timeStamp <= 1e3)) ? (i(), !1) : (r(t), !0));
                                            var e, n, o, s
                                        },
                                        stop() {
                                            i()
                                        }
                                    }
                                }(t);
                            c = n
                        }
                    }

                    function i() {
                        c && c.stop()
                    }
                    const a = We(t),
                        s = new br.cP;
                    let c;
                    t.subscribe(5, i), t.subscribe(11, t => {
                        t !== ci.y5.PAGE_TERMINATED && i()
                    });
                    const {
                        stop: u
                    } = function({
                        onPointerDown: t,
                        onPointerUp: e
                    }) {
                        let n, r, o = {
                            selection: !1,
                            input: !1,
                            scroll: !1
                        };
                        const i = [(0, Or.q2)(window, "pointerdown", e => {
                            an(e) && (n = on(), o = {
                                selection: !1,
                                input: !1,
                                scroll: !1
                            }, r = t(e))
                        }, {
                            capture: !0
                        }), (0, Or.q2)(window, "selectionchange", () => {
                            n && on() || (o.selection = !0)
                        }, {
                            capture: !0
                        }), (0, Or.q2)(window, "scroll", () => {
                            o.scroll = !0
                        }, {
                            capture: !0,
                            passive: !0
                        }), (0, Or.q2)(window, "pointerup", t => {
                            if (an(t) && r) {
                                const n = o;
                                e(r, t, () => n), r = void 0
                            }
                        }, {
                            capture: !0
                        }), (0, Or.q2)(window, "input", () => {
                            o.input = !0
                        }, {
                            capture: !0
                        })];
                        return {
                            stop() {
                                i.forEach(t => t.stop())
                            }
                        }
                    }({
                        onPointerDown: o => function(t, e, n, r, o) {
                            let i;
                            if (i = t.enablePrivacyForActionName ? De(dn(r), t.defaultPrivacyLevel) : Ii.ALLOW, i === Ii.HIDDEN) return;
                            const a = function(t, e, n) {
                                const r = dn(t),
                                    o = r.getBoundingClientRect(),
                                    i = xe(r, n.actionNameAttribute),
                                    a = function(t, e) {
                                        const n = t.filter(t => t instanceof Element && !Pi.includes(t.tagName));
                                        if (0 === n.length) return "";
                                        const r = (0, co.sr)(co.R9.COMPOSED_PATH_SELECTOR_ATTRIBUTES),
                                            {
                                                actionNameAttribute: o
                                            } = e,
                                            i = r ? ji.filter(t => "action" !== t) : ji,
                                            a = o ? [o].concat(i) : i,
                                            s = r ? {
                                                configuration: { ...e,
                                                    actionNameAttribute: void 0
                                                },
                                                nodePrivacyLevelCache: new Map
                                            } : void 0;
                                        let c = "";
                                        for (const t of n) {
                                            const e = Ge(t, a, s);
                                            if (s)
                                                for (const t of e) {
                                                    if (c.length + t.length > Ni) return c;
                                                    c += t
                                                } else if (c += e.join(""), c.length >= Ni) return O(c, Ni)
                                        }
                                        return c
                                    }(t.composedPath(), n);
                                i && cn(t.timeStamp, i);
                                const {
                                    name: s,
                                    nameSource: c
                                } = function(t, e, n = Ii.ALLOW) {
                                    const r = new Map,
                                        {
                                            actionNameAttribute: o
                                        } = e,
                                        i = Xe(t, ki) || o && Xe(t, o);
                                    return i ? {
                                        name: i,
                                        nameSource: "custom_attribute"
                                    } : n === Ii.MASK ? {
                                        name: Ci,
                                        nameSource: "mask_placeholder"
                                    } : Ye(t, Li, e, r) || Ye(t, $i, e, r) || {
                                        name: "",
                                        nameSource: "blank"
                                    }
                                }(r, n, e);
                                return {
                                    type: "click",
                                    target: {
                                        width: Math.round(o.width),
                                        height: Math.round(o.height),
                                        selector: i,
                                        composedPathSelector: a || void 0
                                    },
                                    position: {
                                        x: Math.round(t.clientX - o.left),
                                        y: Math.round(t.clientY - o.top)
                                    },
                                    name: s,
                                    nameSource: c
                                }
                            }(r, i, t);
                            let s = !1;
                            return ye(e, n, o, t, t => {
                                s = t.hadActivity
                            }, 100), {
                                clickActionBase: a,
                                ignore: Qe(dn(r)),
                                hadActivityOnPointerDown: () => s
                            }
                        }(r, t, e, o, n),
                        onPointerUp({
                            clickActionBase: i,
                            ignore: c,
                            hadActivityOnPointerDown: u
                        }, l, d) {
                            ! function(t, e, n, r, o, i, a, s, c, u, l, d) {
                                const f = fn(e, o, l, s, c, u);
                                a(f);
                                const p = s ? .target ? .selector;
                                p && cn(u.timeStamp, p);
                                const {
                                    stop: h
                                } = ye(e, n, r, t, t => {
                                    t.hadActivity && t.end < f.startClocks.timeStamp ? f.discard() : t.hadActivity ? f.stop(t.end) : d() ? f.stop(f.startClocks.timeStamp) : f.stop()
                                }, 1e4), m = e.subscribe(5, ({
                                    endClocks: t
                                }) => {
                                    f.stop(t.timeStamp)
                                }), g = e.subscribe(11, t => {
                                    t !== ci.y5.PAGE_TERMINATED && f.stop((0, hr.nx)())
                                }), v = i.subscribe(() => {
                                    f.stop()
                                });
                                f.stopObservable.subscribe(() => {
                                    g.unsubscribe(), m.unsubscribe(), h(), v.unsubscribe()
                                })
                            }(r, t, e, n, a, s, o, i, c, l, d, u)
                        }
                    });
                    return {
                        stop() {
                            i(), s.notify(), u(), a.stopAll()
                        },
                        findActionId: a.findId
                    }
                }

                function dn(t) {
                    if (t.composed && de(t.target) && "function" == typeof t.composedPath) {
                        const e = t.composedPath();
                        if (e.length > 0 && e[0] instanceof Element) return e[0]
                    }
                    return t.target
                }

                function fn(t, e, n, r, o, i) {
                    function a(t) {
                        0 === d && (d = 1, l = t ? e.stop(s, (0, hr.jR)(t)) : e.discard(s), p.notify())
                    }
                    const s = (0, yr.l)(),
                        c = (0, hr.FR)(i.timeStamp),
                        u = e.start(s, c, r, {
                            isChildEvent: un
                        });
                    t.notify(15, u);
                    let l, d = 0;
                    const f = [],
                        p = new br.cP;
                    return {
                        event: i,
                        ignore: o,
                        stop: a,
                        stopObservable: p,
                        get hasError() {
                            const t = l ? .counts ? ? e.getCounts(s);
                            return !!t && t.errorCount > 0
                        },
                        get hasPageActivity() {
                            return l && "duration" in l
                        },
                        getUserActivity: n,
                        addFrustration(t) {
                            f.push(t)
                        },
                        get startClocks() {
                            return c
                        },
                        isStopped: () => 1 === d || 2 === d,
                        clone: () => fn(t, e, n, r, o, i),
                        validate(e) {
                            if (a(), 1 !== d) return;
                            if (!l) return;
                            const n = {
                                frustrationTypes: f,
                                events: e ? ? [i],
                                event: i,
                                ...l,
                                counts: l.counts
                            };
                            t.notify(0, n), d = 2
                        },
                        discard() {
                            a(), d = 2
                        }
                    }
                }

                function pn(t) {
                    const e = function(t) {
                            return "events" in t
                        }(t),
                        n = se((0, hr.Zj)(t.duration));
                    return {
                        rawRumEvent: {
                            type: Zr.ACTION,
                            date: t.startClocks.timeStamp,
                            action: {
                                id: t.id,
                                target: {
                                    name: t.name
                                },
                                type: t.type,
                                ...void 0 !== n && {
                                    loading_time: n
                                },
                                ...t.counts && {
                                    error: {
                                        count: t.counts.errorCount
                                    },
                                    long_task: {
                                        count: t.counts.longTaskCount
                                    },
                                    resource: {
                                        count: t.counts.resourceCount
                                    }
                                },
                                frustration: {
                                    type: t.frustrationTypes
                                }
                            },
                            ...e ? {
                                _dd: {
                                    action: {
                                        target: {
                                            selector: t.target ? .selector || void 0,
                                            width: t.target ? .width || void 0,
                                            height: t.target ? .height || void 0,
                                            composed_path_selector: t.target ? .composedPathSelector
                                        },
                                        position: t.position,
                                        name_source: t.nameSource
                                    }
                                }
                            } : {
                                context: t.context
                            }
                        },
                        duration: t.duration,
                        startClocks: t.startClocks,
                        domainContext: e ? {
                            events: t.events
                        } : {
                            handlingStack: t.handlingStack
                        }
                    }
                }

                function hn(t) {
                    return {
                        startClocks: (0, hr.M8)(),
                        source: Vr.g.REPORT,
                        handling: "unhandled",
                        ...t
                    }
                }

                function mn(t, e, n, r, o) {
                    return n ? (0, $r.Yn)({
                        name: t,
                        message: e,
                        stack: [{
                            func: "?",
                            url: n,
                            line: r ? ? void 0,
                            column: o ? ? void 0
                        }]
                    }) : void 0
                }

                function gn() {
                    function t(t) {
                        let r;
                        if (!t || t.didTimeout) {
                            const t = performance.now();
                            r = () => 30 - (performance.now() - t)
                        } else r = t.timeRemaining.bind(t);
                        for (; r() > 0 && n.length;) n.shift()();
                        n.length && e()
                    }

                    function e() {
                        (0, Vi.BB)(t, {
                            timeout: 1e3
                        })
                    }
                    const n = [];
                    return {
                        push(t) {
                            1 === n.push(t) && e()
                        },
                        stop() {
                            n.length = 0
                        }
                    }
                }

                function vn() {
                    if (ve(_i.NAVIGATION)) {
                        const t = performance.getEntriesByType(_i.NAVIGATION)[0];
                        if (t && function(t) {
                                return !(t.loadEventEnd > 0 && t.domComplete <= 0)
                            }(t)) return t
                    }
                    const t = function() {
                            const t = {},
                                e = performance.timing;
                            for (const n in e)
                                if (S(e[n])) {
                                    const r = n,
                                        o = e[r];
                                    t[r] = 0 === o ? 0 : (0, hr.d6)(o)
                                }
                            return t
                        }(),
                        e = {
                            entryType: _i.NAVIGATION,
                            initiatorType: "navigation",
                            name: window.location.href,
                            startTime: 0,
                            duration: t.loadEventEnd,
                            decodedBodySize: 0,
                            encodedBodySize: 0,
                            transferSize: 0,
                            workerStart: 0,
                            toJSON: () => ({ ...e,
                                toJSON: void 0
                            }),
                            ...t
                        };
                    return e
                }

                function yn(t) {
                    return t.responseStart >= 0 && t.responseStart <= (0, hr.$S)() ? t.responseStart : void 0
                }

                function bn(t) {
                    const e = function(t) {
                        const e = t.querySelector("meta[name=dd-trace-id]"),
                            n = t.querySelector("meta[name=dd-trace-time]");
                        return wn(e ? .content, n ? .content)
                    }(t) || function(t) {
                        const e = function(t) {
                            for (let e = 0; e < t.childNodes.length; e += 1) {
                                const n = _n(t.childNodes[e]);
                                if (n) return n
                            }
                            if (t.body)
                                for (let e = t.body.childNodes.length - 1; e >= 0; e -= 1) {
                                    const n = t.body.childNodes[e],
                                        r = _n(n);
                                    if (r) return r;
                                    if (!ce(n)) break
                                }
                        }(t);
                        if (e) return wn(I(e, "trace-id"), I(e, "trace-time"))
                    }(t);
                    if (e && !(e.traceTime <= (0, hr.uc)() - 12e4)) return e.traceId
                }

                function wn(t, e) {
                    const n = e && Number(e);
                    if (t && n) return {
                        traceId: t,
                        traceTime: n
                    }
                }

                function _n(t) {
                    if (t && function(t) {
                            return t.nodeType === Node.COMMENT_NODE
                        }(t)) {
                        const e = /^\s*DATADOG;(.*?)\s*$/.exec(t.data);
                        if (e) return e[1]
                    }
                }

                function xn(t, e, n) {
                    const r = e ? function(t, e) {
                        if (t.traceSampled && t.traceId && t.spanId) return {
                            _dd: {
                                span_id: t.spanId.toString(),
                                trace_id: t.traceId.toString(),
                                rule_psr: e.rulePsr
                            }
                        }
                    }(e, n) : function(t, e) {
                        if ("navigation" !== t.initiatorType) return;
                        const n = (0, gr.B)(bn)(document);
                        return n ? {
                            _dd: {
                                trace_id: n,
                                span_id: Bt().toString(),
                                rule_psr: e.rulePsr
                            }
                        } : void 0
                    }(t, n);
                    if (!n.trackResources && !r) return;
                    const o = (0, hr.FR)(t.startTime),
                        i = function(t) {
                            const {
                                duration: e,
                                startTime: n,
                                responseEnd: r
                            } = t;
                            return "navigation" === t.initiatorType || 0 === e && n < r ? (0, hr.vk)(n, r) : e
                        }(t),
                        a = function(t, e) {
                            const n = e.trackResourceHeaders;
                            if (0 === n.length || !t) return;
                            const r = n.filter(e => void 0 === e.url || st([e.url], t.url, !0));
                            if (0 === r.length) return;
                            const o = r.filter(t => void 0 === t.location || "any" === t.location || "response" === t.location),
                                i = r.filter(t => void 0 === t.location || "any" === t.location || "request" === t.location),
                                a = o.length > 0 ? function(t, e) {
                                    if (t.type === gi && t.response) return Cn(t.response.headers, e);
                                    if ("xhr" === t.type && t.xhr) {
                                        const n = t.xhr.getAllResponseHeaders();
                                        if (n) try {
                                            return Cn(new Headers(function(t) {
                                                const e = [],
                                                    n = t.trim().split(/\r\n/);
                                                for (const t of n) {
                                                    const n = t.indexOf(":");
                                                    n > 0 && e.push([t.substring(0, n).trim(), t.substring(n + 1).trim()])
                                                }
                                                return e
                                            }(n)), e)
                                        } catch {}
                                    }
                                }(t, o) : void 0,
                                s = i.length > 0 ? function(t, e) {
                                    if (t.type !== gi) return;
                                    let n;
                                    return t.init ? .headers ? n = new Headers(t.init.headers) : t.input instanceof Request && (n = t.input.headers), n ? Cn(n, e) : void 0
                                }(t, i) : void 0;
                            return a || s ? {
                                resource: {
                                    request: s ? {
                                        headers: s
                                    } : void 0,
                                    response: a ? {
                                        headers: a
                                    } : void 0
                                }
                            } : void 0
                        }(e, n),
                        s = (0, vr.kg)({
                            date: o.timeStamp,
                            resource: {
                                id: (0, yr.l)(),
                                duration: (0, hr.Zj)(i),
                                type: Mt(t),
                                method: e ? .method,
                                status_code: e ? e.status : (c = t.responseStatus, 0 === c ? void 0 : c),
                                url: e ? Vt(e.url) : t.name,
                                protocol: Lt(t),
                                delivery_type: $t(t),
                                graphql: e && Sn(e, n),
                                render_blocking_status: t.renderBlockingStatus,
                                ...qt(t),
                                ...jt(t)
                            },
                            type: Zr.RESOURCE,
                            _dd: {
                                discarded: !n.trackResources
                            }
                        }, r, function(t) {
                            const e = t.contentType;
                            if (e) return {
                                resource: {
                                    response: {
                                        headers: {
                                            "content-type": e
                                        }
                                    }
                                }
                            }
                        }(t), a);
                    var c;
                    return {
                        startClocks: o,
                        duration: i,
                        rawRumEvent: s,
                        domainContext: kn(t, e)
                    }
                }

                function Sn(t, e) {
                    const n = Gt(t.url, e);
                    if (n) return function(t, e) {
                        const n = function(t, e = !1) {
                            let n;
                            if ("POST" === t.method ? n = function(t) {
                                    if (!t || "string" != typeof t) return;
                                    const e = (0, yo.XU)(t);
                                    return e ? {
                                        query: e.query,
                                        operationName: e.operationName,
                                        variables: e.variables ? JSON.stringify(e.variables) : void 0,
                                        operationType: e.operationType
                                    } : void 0
                                }(t.requestBody) : "GET" === t.method && (n = function(t) {
                                    const e = (0, xr.c$)(t).searchParams,
                                        n = e.get("variables"),
                                        r = n && void 0 !== (0, yo.XU)(n) ? n : void 0;
                                    return {
                                        query: e.get("query") || void 0,
                                        operationName: e.get("operationName") || void 0,
                                        variables: r,
                                        operationType: e.get("operationType") || void 0
                                    }
                                }(t.url)), n) return function(t, e) {
                                let n, r, o;
                                if (t.query) {
                                    const o = t.query.trim();
                                    i = o, n = i.match(/^\s*(query|mutation|subscription)\b/i) ? .[1], e && (r = O(o, 32768, "..."))
                                }
                                var i;
                                if (!n) {
                                    const e = t.operationType;
                                    "query" !== e && "mutation" !== e && "subscription" !== e || (n = e)
                                }
                                return t.variables && (o = t.variables), {
                                    operationType: n,
                                    operationName: t.operationName,
                                    variables: o,
                                    payload: r
                                }
                            }(n, e)
                        }(t, e.trackPayload);
                        if (n) {
                            if (e.trackResponseErrors && t.responseBody) {
                                const e = function(t) {
                                    const e = (0, yo.XU)(t);
                                    if (!e || "object" != typeof e) return;
                                    const n = e;
                                    return (0, go.EI)(n.errors) ? n.errors.map(t => ({
                                        message: t.message,
                                        path: t.path,
                                        locations: t.locations,
                                        code: t.extensions ? .code
                                    })) : void 0
                                }(t.responseBody);
                                e && (n.error_count = e.length, n.errors = e)
                            }
                            return n
                        }
                    }(t, n)
                }

                function kn(t, e) {
                    return {
                        performanceEntry: t,
                        isManual: !1,
                        isAborted: !!e && e.isAborted,
                        isWebSocket: !1,
                        handlingStack: e ? .handlingStack,
                        requestInit: e ? .init,
                        requestInput: e ? .input,
                        response: e ? .response,
                        error: e ? .error,
                        xhr: e ? .xhr
                    }
                }

                function Cn(t, e) {
                    const n = {};
                    let r = 0,
                        o = !1;
                    return t.forEach((t, i) => {
                        if (r >= 100) return void(o || (Lr.V.warn("Maximum number of headers (100) has been reached. Further headers are dropped."), o = !0));
                        const a = i.toLowerCase();
                        if (Fi.test(a)) return;
                        const s = e.find(t => st([t.name ? ? zi], a));
                        if (!s) return;
                        const {
                            extractor: c
                        } = s, u = c ? L(t, c) : t;
                        void 0 !== u && (u.length > 128 && Lr.V.warn(`Header "${a}" value was truncated from ${u.length} to 128 characters.`), n[a] = O(u, 128), r++)
                    }), r > 0 ? n : void 0
                }

                function Tn() {
                    try {
                        return (new Intl.DateTimeFormat).resolvedOptions().timeZone
                    } catch {
                        return
                    }
                }

                function En(t, e, n) {
                    if (void 0 === n) return;
                    const r = t ? function(t, e) {
                            const n = function() {
                                if (ve(_i.RESOURCE)) return performance.getEntriesByType(_i.RESOURCE)
                            }();
                            if (n) return (0, Ko.Uk)(n, n => n.name === t && n.startTime <= e)
                        }(t, e) : void 0,
                        o = r ? Math.max(n, r.requestStart || r.startTime) : n,
                        i = Math.min(e, Math.max(o, r ? .responseEnd || 0));
                    return {
                        loadDelay: o - n,
                        loadTime: i - o,
                        renderDelay: e - i
                    }
                }

                function An(t, e = window) {
                    if ("hidden" === document.visibilityState) return {
                        timeStamp: 0,
                        stop: Cr.l
                    };
                    if (ve(_i.VISIBILITY_STATE)) {
                        const e = performance.getEntriesByType(_i.VISIBILITY_STATE).filter(t => "hidden" === t.name).find(e => e.startTime >= t.relative);
                        if (e) return {
                            timeStamp: e.startTime,
                            stop: Cr.l
                        }
                    }
                    let n = 1 / 0;
                    const {
                        stop: r
                    } = (0, Or.lQ)(e, ["pagehide", "visibilitychange"], t => {
                        "pagehide" !== t.type && "hidden" !== document.visibilityState || (n = t.timeStamp, r())
                    }, {
                        capture: !0
                    });
                    return {
                        get timeStamp() {
                            return n
                        },
                        stop: r
                    }
                }

                function In(t, e, n, r) {
                    const o = {},
                        {
                            stop: i
                        } = (u = t => {
                            n(t.loadEvent), o.navigationTimings = t, r()
                        }, function(t) {
                            let e;
                            const {
                                stop: n
                            } = (0, Bi.H)("complete", () => {
                                e = (0, Ho.wg)(() => t())
                            });
                            return {
                                stop() {
                                    n(), (0, Ho.DJ)(e)
                                }
                            }
                        }(() => {
                            const t = (0, gr.B)(vn)();
                            (function(t) {
                                return t.loadEventEnd <= 0
                            })(t) || u(function(t) {
                                return {
                                    domComplete: t.domComplete,
                                    domContentLoaded: t.domContentLoadedEventEnd,
                                    domInteractive: t.domInteractive,
                                    loadEvent: t.loadEventEnd,
                                    firstByte: yn(t)
                                }
                            }(t))
                        })),
                        a = An(e),
                        {
                            stop: s
                        } = function(t) {
                            return {
                                stop: ge({
                                    type: _i.PAINT,
                                    buffered: !0
                                }).subscribe(e => {
                                    const n = e.find(e => "first-contentful-paint" === e.name && e.startTime < t.timeStamp && e.startTime < 6e5);
                                    var i;
                                    n && (i = n.startTime, o.firstContentfulPaint = i, r())
                                }).unsubscribe
                            }
                        }(a),
                        {
                            stop: c
                        } = function(t, e, n) {
                            let i = 1 / 0;
                            const {
                                stop: a
                            } = (0, Or.lQ)(n, ["pointerdown", "keydown"], t => {
                                i = t.timeStamp
                            }, {
                                capture: !0,
                                once: !0
                            });
                            let s = 0;
                            const c = ge({
                                type: _i.LARGEST_CONTENTFUL_PAINT,
                                buffered: !0
                            }).subscribe(n => {
                                const a = (0, Ko.Uk)(n, t => t.entryType === _i.LARGEST_CONTENTFUL_PAINT && t.startTime < i && t.startTime < e.timeStamp && t.startTime < 6e5 && t.size > s);
                                if (a) {
                                    let e;
                                    a.element && (e = xe(a.element, t.actionNameAttribute));
                                    const n = "" === (u = a).url ? void 0 : u.url,
                                        i = a.startTime;
                                    c = {
                                        value: i,
                                        targetSelector: e,
                                        resourceUrl: n,
                                        subParts: En(n, i, yn(vn()))
                                    }, o.largestContentfulPaint = c, r(), s = a.size
                                }
                                var c, u
                            });
                            return {
                                stop() {
                                    a(), c.unsubscribe()
                                }
                            }
                        }(t, a, window);
                    var u;
                    return {
                        stop() {
                            i(), s(), c(), a.stop()
                        },
                        initialViewMetrics: o
                    }
                }

                function On(t) {
                    let e, n, r = [];
                    return {
                        accept(o) {
                            const {
                                navigationId: i
                            } = o;
                            return !t || void 0 === i || (void 0 !== n ? i >= n : (void 0 === e ? e = i : i > e && r.push(o), !0))
                        },
                        setNavigationId(t, o) {
                            const i = r;
                            r = [], n = t, void 0 !== e && t > e && o(i.filter(e => e.navigationId >= t))
                        }
                    }
                }

                function Rn(t) {
                    let e;
                    for (const n of t)
                        if (n.node && ue(n.node)) {
                            const t = Wi(n);
                            (!e || Wi(e) < t) && (e = n)
                        }
                    return e
                }

                function Mn({
                    x: t,
                    y: e,
                    width: n,
                    height: r
                }) {
                    return {
                        x: t,
                        y: e,
                        width: n,
                        height: r
                    }
                }

                function Pn() {
                    let t, e, n = 0,
                        r = 0;
                    return {
                        update(o) {
                            let i;
                            return void 0 === t || o.startTime - e >= 1e3 || o.startTime - t >= 5e3 ? (t = e = o.startTime, r = n = o.value, i = !0) : (n += o.value, e = o.startTime, i = o.value > r, i && (r = o.value)), {
                                cumulatedValue: n,
                                isMaxValue: i
                            }
                        }
                    }
                }

                function Nn(t) {
                    function e() {
                        n.sort((t, e) => e.duration - t.duration).splice(10)
                    }
                    const n = [];
                    return {
                        process(t) {
                            const r = n.findIndex(e => t.interactionId === e.interactionId),
                                o = n[n.length - 1]; - 1 !== r ? t.duration > n[r].duration && (n[r] = t, e()) : (n.length < 10 || t.duration > o.duration) && (n.push(t), e())
                        },
                        estimateP98Interaction() {
                            const e = Math.min(n.length - 1, Math.floor(t() / 50));
                            return n[e]
                        },
                        isTracked: t => n.some(e => e.interactionId === t)
                    }
                }

                function jn(t) {
                    function e(t, e) {
                        t.startTime = Math.min(e.startTime, t.startTime), t.processingStart = Math.min(e.processingStart, t.processingStart), t.processingEnd = Math.max(e.processingEnd, t.processingEnd)
                    }
                    const n = new Map;
                    return {
                        process(t) {
                            if (void 0 === t.interactionId || !t.processingStart || !t.processingEnd) return;
                            const r = t.startTime + t.duration,
                                o = n.get(t.interactionId);
                            if (o) e(o, t);
                            else {
                                for (const [, o] of n.entries())
                                    if (Math.abs(r - o.referenceRenderTime) <= 8) return e(o, t), void n.set(t.interactionId, o);
                                n.set(t.interactionId, {
                                    startTime: t.startTime,
                                    processingStart: t.processingStart,
                                    processingEnd: t.processingEnd,
                                    referenceRenderTime: r
                                })
                            }
                        },
                        pruneUntracked() {
                            for (const [e] of n) t.isTracked(e) || n.delete(e)
                        },
                        computeSubParts(t, e) {
                            if (!t.processingStart || !t.processingEnd || void 0 === t.interactionId) return;
                            const r = n.get(t.interactionId);
                            if (!r) return;
                            const o = Math.max(r.startTime + e, r.processingStart),
                                i = Math.min(r.processingEnd, o);
                            return {
                                inputDelay: (0, hr.vk)(r.startTime, r.processingStart),
                                processingDuration: (0, hr.vk)(r.processingStart, i),
                                presentationDelay: (0, hr.vk)(i, o)
                            }
                        },
                        stop() {
                            n.clear()
                        }
                    }
                }

                function Dn(t) {
                    return Math.min(t, 6e4)
                }

                function Ln() {
                    let t;
                    const e = window.visualViewport;
                    return t = e ? e.pageLeft - e.offsetLeft : void 0 !== window.scrollX ? window.scrollX : window.pageXOffset || 0, Math.round(t)
                }

                function $n() {
                    let t;
                    const e = window.visualViewport;
                    return t = e ? e.pageTop - e.offsetTop : void 0 !== window.scrollY ? window.scrollY : window.pageYOffset || 0, Math.round(t)
                }

                function qn() {
                    return Yi || (Yi = new br.cP(t => {
                        const {
                            throttled: e
                        } = (0, zo.n)(() => {
                            t.notify(Un())
                        }, 200);
                        return (0, Or.q2)(window, "resize", e, {
                            capture: !0,
                            passive: !0
                        }).stop
                    })), Yi
                }

                function Un() {
                    const t = window.visualViewport;
                    return t ? {
                        width: Number(t.width * t.scale),
                        height: Number(t.height * t.scale)
                    } : {
                        width: Number(window.innerWidth || 0),
                        height: Number(window.innerHeight || 0)
                    }
                }

                function Vn(t) {
                    const e = t.indexOf("?");
                    return e < 0 ? t : t.slice(0, e)
                }

                function Bn({
                    cumulativeLayoutShift: t,
                    interactionToNextPaint: e
                }, {
                    firstContentfulPaint: n,
                    largestContentfulPaint: r
                }) {
                    return {
                        cls: t && {
                            score: t.value,
                            timestamp: (0, hr.Zj)(t.time),
                            target_selector: t.targetSelector,
                            previous_rect: t.previousRect,
                            current_rect: t.currentRect
                        },
                        fcp: n && {
                            timestamp: (0, hr.Zj)(n)
                        },
                        inp: e && {
                            duration: (0, hr.Zj)(e.value),
                            timestamp: (0, hr.Zj)(e.time),
                            target_selector: e.targetSelector,
                            sub_parts: e.subParts ? {
                                input_delay: (0, hr.Zj)(e.subParts.inputDelay),
                                processing_duration: (0, hr.Zj)(e.subParts.processingDuration),
                                presentation_delay: (0, hr.Zj)(e.subParts.presentationDelay)
                            } : void 0
                        },
                        lcp: r && {
                            timestamp: (0, hr.Zj)(r.value),
                            target_selector: r.targetSelector,
                            resource_url: r.resourceUrl,
                            sub_parts: r.subParts ? {
                                load_delay: (0, hr.Zj)(r.subParts.loadDelay),
                                load_time: (0, hr.Zj)(r.subParts.loadTime),
                                render_delay: (0, hr.Zj)(r.subParts.renderDelay)
                            } : void 0
                        }
                    }
                }

                function Fn(t, e) {
                    if (t === e) return !0;
                    if (null === t || "object" != typeof t || null === e || "object" != typeof e) return t === e;
                    if (Array.isArray(t) && Array.isArray(e)) return t.length === e.length && t.every((t, n) => Fn(t, e[n]));
                    if (Array.isArray(t) || Array.isArray(e)) return !1;
                    const n = t,
                        r = e,
                        o = Object.keys(n),
                        i = Object.keys(r);
                    return o.length === i.length && o.every(t => i.includes(t) && Fn(n[t], r[t]))
                }

                function zn(t, e, n) {
                    const r = {},
                        o = n ? .replaceKeys ? ? new Set,
                        i = n ? .appendKeys ? ? new Set,
                        a = n ? .ignoreKeys ? ? new Set;
                    for (const n of Object.keys(t)) {
                        if (a.has(n)) continue;
                        const s = t[n],
                            c = e[n];
                        if (!o.has(n) && (0, Dr.OE)(s) && (0, Dr.OE)(c)) {
                            const t = zn(s, c, {
                                replaceKeys: Hn(o, n),
                                appendKeys: Hn(i, n),
                                ignoreKeys: Hn(a, n)
                            });
                            t && (r[n] = t)
                        } else i.has(n) && Array.isArray(s) && Array.isArray(c) ? s.length > c.length && (r[n] = s.slice(c.length)) : Fn(s, c) || (r[n] = s)
                    }
                    for (const n of Object.keys(e)) n in t || (r[n] = null);
                    return Object.keys(r).length > 0 ? r : void 0
                }

                function Hn(t, e) {
                    const n = new Set;
                    for (const r of t) r.startsWith(e + ".") && n.add(r.slice(e.length + 1));
                    return n
                }

                function Wn(t, e) {
                    const n = zn(t, e, {
                        replaceKeys: new Set(["view.custom_timings", "context", "connectivity", "usr", "device", "privacy"]),
                        appendKeys: new Set(["_dd.page_states"]),
                        ignoreKeys: new Set(["date", "type", "application", "session", "view.id", "view.url", "_dd.document_version", "_dd.format_version"])
                    });
                    if (n) return (0, vr.kg)(n, {
                        type: Zr.VIEW_UPDATE,
                        date: t.date,
                        application: t.application,
                        session: t.session,
                        view: {
                            id: t.view.id,
                            url: t.view.url
                        },
                        _dd: {
                            document_version: t._dd.document_version,
                            format_version: t._dd.format_version
                        }
                    })
                }

                function Gn() {
                    return (0, gr.B)(_r.J.location)
                }

                function Kn(t) {
                    return Object.prototype.hasOwnProperty.call(history, t) ? history : History.prototype
                }

                function Jn() {
                    0 !== na.batchCount && ((0, Pr.Gk)("Customer data measures", na), Xn())
                }

                function Qn(t, e) {
                    t.sum += e, t.min = Math.min(t.min, e), t.max = Math.max(t.max, e)
                }

                function Xn() {
                    na = {
                        batchCount: 0,
                        batchBytesCount: {
                            min: 1 / 0,
                            max: 0,
                            sum: 0
                        },
                        batchMessagesCount: {
                            min: 1 / 0,
                            max: 0,
                            sum: 0
                        }
                    }
                }

                function Yn(t, e, n) {
                    if (0 !== t.length) return t.slice(-n).reverse().map(({
                        state: t,
                        startTime: n
                    }) => ({
                        state: t,
                        start: (0, hr.Zj)((0, hr.vk)(e, n))
                    }))
                }

                function Zn() {
                    return "hidden" === document.visibilityState ? "hidden" : document.hasFocus() ? "active" : "passive"
                }

                function tr(t) {
                    const {
                        startClocks: e,
                        type: n,
                        name: r,
                        description: o,
                        context: i,
                        handlingStack: a
                    } = t, s = {
                        id: (t.type === so.DURATION ? t.id : void 0) ? ? (0, yr.l)(),
                        type: n,
                        name: r,
                        description: o,
                        ...n === so.DURATION ? {
                            duration: (0, hr.Zj)(t.duration)
                        } : {
                            step_type: t.stepType,
                            operation_key: t.operationKey,
                            failure_reason: t.failureReason
                        }
                    };
                    return {
                        rawRumEvent: {
                            date: e.timeStamp,
                            vital: s,
                            type: Zr.VITAL,
                            context: i
                        },
                        startClocks: e,
                        duration: n === so.DURATION ? t.duration : void 0,
                        domainContext: a ? {
                            handlingStack: a
                        } : {}
                    }
                }

                function er(t, e) {
                    let n = M(t);
                    const r = (0, Ho.yb)(() => {
                        const r = M(t);
                        r !== n && (n = r, e(r))
                    }, 1e3);
                    return () => {
                        (0, Ho.vG)(r)
                    }
                }

                function nr(t, e) {
                    const n = (0, yr.l)(),
                        r = (0, hr.Zj)(t.duration),
                        o = {
                            date: e.timeStamp,
                            type: Zr.LONG_TASK,
                            _dd: {
                                discarded: !1
                            }
                        };
                    if (t.entryType === _i.LONG_TASK) return { ...o,
                        long_task: {
                            id: n,
                            entry_type: to.LONG_TASK,
                            duration: r
                        }
                    };
                    const i = t.scripts.map(t => t.sourceURL).filter(t => !!t),
                        a = (0, qr.Jv)(i);
                    return { ...o,
                        _dd: {
                            discarded: !1,
                            debug_ids: a
                        },
                        long_task: {
                            id: n,
                            entry_type: to.LONG_ANIMATION_FRAME,
                            duration: r,
                            blocking_duration: (0, hr.Zj)(t.blockingDuration),
                            first_ui_event_timestamp: (0, hr.Zj)(t.firstUIEventTimestamp),
                            render_start: (0, hr.Zj)(t.renderStart),
                            style_and_layout_start: (0, hr.Zj)(t.styleAndLayoutStart),
                            start_time: (0, hr.Zj)(t.startTime),
                            scripts: t.scripts.map(t => ({
                                duration: (0, hr.Zj)(t.duration),
                                pause_duration: (0, hr.Zj)(t.pauseDuration),
                                forced_style_and_layout_duration: (0, hr.Zj)(t.forcedStyleAndLayoutDuration),
                                start_time: (0, hr.Zj)(t.startTime),
                                execution_start: (0, hr.Zj)(t.executionStart),
                                source_url: t.sourceURL,
                                source_function_name: t.sourceFunctionName,
                                source_char_position: t.sourceCharPosition,
                                invoker: t.invoker,
                                invoker_type: t.invokerType,
                                window_attribution: t.windowAttribution
                            }))
                        }
                    }
                }

                function rr(t, e, n = 3e3) {
                    let r = 0,
                        o = !1;
                    return {
                        isLimitReached() {
                            if (0 === r && (0, Ho.wg)(() => {
                                    r = 0
                                }, 6e4), r += 1, r <= n || o) return o = !1, !1;
                            if (r === n + 1) {
                                o = !0;
                                try {
                                    e(`Reached max number of ${t}s by minute: ${n}`)
                                } finally {
                                    o = !1
                                }
                            }
                            return !0
                        }
                    }
                }

                function or(t, e, n) {
                    const r = (0, vr.Go)(t),
                        o = n(r);
                    return (0, Ko.WP)(e).forEach(([e, n]) => ir(t, r, e.split(/\.|(?=\[\])/), n)), o
                }

                function ir(t, e, n, r) {
                    const [o, ...i] = n;
                    if ("[]" !== o) {
                        if (ar(t) && ar(e)) return i.length > 0 ? ir(t[o], e[o], i, r) : void
                        function(t, e, n, r) {
                            if (t[e] === n) return;
                            const o = (0, Dr.Pw)(n);
                            o === r ? t[e] = s(n) : "object" !== r || "undefined" !== o && "null" !== o ? "array" !== r || "undefined" !== o && "null" !== o || (t[e] = []) : t[e] = {}
                        }(t, o, e[o], r)
                    } else Array.isArray(t) && Array.isArray(e) && t.forEach((t, n) => ir(t, e[n], i, r))
                }

                function ar(t) {
                    return "object" === (0, Dr.Pw)(t)
                }

                function sr(t, e) {
                    return (0, ho.d0)() ? (0, ho.Ww)("records") ? 1 : 0 : (0, Go.$5)(t.id, (0, Go.it)(e.sessionSampleRate, e.sessionReplaySampleRate)) ? 1 : t.isReplayForced ? 2 : 0
                }

                function cr(t, e, n, i, a, c, u, l, d, f) {
                    const p = [],
                        m = new fi;
                    m.subscribe(13, t => (0, si.b)("rum", t)), e.expireObservable.subscribe(() => m.notify(9, {
                        endClocks: (0, hr.M8)()
                    })), e.renewObservable.subscribe(() => m.notify(10));
                    const g = t => {
                        m.notify(14, {
                            error: {
                                message: t,
                                source: Vr.g.AGENT,
                                startClocks: (0, hr.M8)()
                            }
                        }), (0, Pr.A2)("Error reported to customer", {
                            "error.message": t
                        })
                    };
                    if ((0, ho.d0)()) {
                        ! function(t) {
                            const e = (0, ho.Y9)();
                            t.subscribe(13, t => {
                                e.send("rum", t)
                            })
                        }(m);
                        const t = (0, ci._T)().subscribe(t => {
                            m.notify(11, t.reason)
                        });
                        p.push(() => t.unsubscribe())
                    } else {
                        const n = function(t, e, n, r, o) {
                                const i = [(0, So.ns)(t, "rum")],
                                    a = (0, So.np)(t, "rum");
                                a && i.push(a);
                                const s = (0, Zi.X)({
                                    encoder: o(2),
                                    endpoints: i,
                                    reportError: n
                                });
                                r.subscribe(() => s.forceFlush("session_expire"));
                                const {
                                    dispatch: c,
                                    stop: u
                                } = function(t, e) {
                                    let n, r, o = !1,
                                        i = 0;
                                    const {
                                        unsubscribe: a
                                    } = t.flushObservable.subscribe(() => {
                                        o = !1, r = n
                                    });
                                    return {
                                        dispatch(a) {
                                            if (a.type !== Zr.VIEW) return void t.add(a);
                                            if (!e) return void t.upsert(a, a.view.id);
                                            const s = a.view.id;
                                            if (!a.view.is_active) return s === n ? .view.id && (n = void 0, r = void 0, o = !1, i = 0), void t.upsert(a, s);
                                            if (s !== n ? .view.id) return i = 0, t.upsert(a, s), n = a, void(o = !t.isEmpty);
                                            if (n = a, o) t.upsert(a, s);
                                            else {
                                                if (i += 1, i >= 100) return i = 0, t.upsert(a, s), void(o = !t.isEmpty);
                                                if (r) {
                                                    const e = Wn(a, r);
                                                    e && ((0, si.b)("rum", e), t.upsert(e, s))
                                                }
                                            }
                                        },
                                        stop: a
                                    }
                                }(s, t.betaEnableViewUpdates);
                                e.subscribe(13, c);
                                const l = s.stop.bind(s);
                                return s.stop = () => {
                                    u(), l()
                                }, s
                            }(t, m, g, e.expireObservable, c),
                            r = n.prepareUrgentFlushObservable.subscribe(t => {
                                m.notify(11, t)
                            });
                        p.push(() => r.unsubscribe()), p.push(() => n.stop()),
                            function(t, e, n) {
                                t.metricsEnabled && (Xn(), ra = !1, e.subscribe(13, () => {
                                    ra = !0
                                }), n.subscribe(({
                                    bytesCount: t,
                                    messagesCount: e
                                }) => {
                                    ra && (ra = !1, na.batchCount += 1, Qn(na.batchBytesCount, t), Qn(na.batchMessagesCount, e))
                                }), (0, Ho.yb)(Jn, 1e4))
                            }(l, m, n.flushObservable)
                    }
                    const {
                        stop: v,
                        ...y
                    } = function(t, e, n, i, a, c, u, l, d) {
                        const f = [],
                            p = (0, di.l)(),
                            m = function() {
                                let t = (0, yo.yG)(Gn());
                                return new br.cP(e => {
                                    function n() {
                                        if (t.href === Gn().href) return;
                                        const n = (0, yo.yG)(Gn());
                                        e.notify({
                                            newLocation: n,
                                            oldLocation: t
                                        }), t = n
                                    }
                                    const {
                                        stop: r
                                    } = function(t) {
                                        const {
                                            stop: e
                                        } = (0, kr.H7)(Kn("pushState"), "pushState", ({
                                            onPostCall: e
                                        }) => {
                                            e(t)
                                        }), {
                                            stop: n
                                        } = (0, kr.H7)(Kn("replaceState"), "replaceState", ({
                                            onPostCall: e
                                        }) => {
                                            e(t)
                                        }), {
                                            stop: r
                                        } = (0, Or.q2)(window, "popstate", t);
                                        return {
                                            stop() {
                                                e(), n(), r()
                                            }
                                        }
                                    }(n), {
                                        stop: o
                                    } = (i = n, (0, Or.q2)(window, "hashchange", i));
                                    var i;
                                    return () => {
                                        r(), o()
                                    }
                                })
                            }(),
                            {
                                observable: g,
                                stop: v
                            } = function() {
                                const t = new br.cP,
                                    {
                                        stop: e
                                    } = (0, kr.H7)(window, "open", () => t.notify());
                                return {
                                    observable: t,
                                    stop: e
                                }
                            }();
                        f.push(v);
                        const {
                            assembleEventDefaults: y
                        } = e;
                        ! function(t, e, n) {
                            t.register(({
                                eventType: t
                            }) => {
                                const r = e.source;
                                return {
                                    type: t,
                                    _dd: {
                                        format_version: 2,
                                        drift: (0, hr._O)(),
                                        configuration: {
                                            session_sample_rate: x(e.sessionSampleRate, 3),
                                            session_replay_sample_rate: x(e.sessionReplaySampleRate, 3),
                                            profiling_sample_rate: x(e.profilingSampleRate, 3),
                                            trace_sample_rate: x(e.traceSampleRate, 3)
                                        },
                                        browser_sdk_version: (0, ho.d0)() ? "7.17.0" : void 0,
                                        sdk_name: n
                                    },
                                    application: {
                                        id: e.applicationId
                                    },
                                    date: (0, hr.nx)(),
                                    source: r
                                }
                            })
                        }(y, n, l);
                        const b = function(t, e = 500) {
                            function n(t, e = (0, hr.$S)()) {
                                t !== i && (i = t, o.closeActive(e), o.add({
                                    state: i,
                                    startTime: e
                                }, e))
                            }

                            function r(t, e, n) {
                                return o.findAll(e, n).some(e => e.state === t)
                            }
                            const o = (0, Wo.qj)({
                                expireDelay: oa,
                                maxEntries: 4e3
                            });
                            let i;
                            ve(_i.VISIBILITY_STATE) && performance.getEntriesByType(_i.VISIBILITY_STATE).forEach(t => {
                                n("hidden" === t.name ? "hidden" : "active", t.startTime)
                            }), n(Zn(), (0, hr.$S)());
                            const {
                                stop: a
                            } = (0, Or.lQ)(window, ["pageshow", "focus", "blur", "visibilitychange", "resume", "freeze", "pagehide"], t => {
                                n(function(t) {
                                    return "freeze" === t.type ? "frozen" : "pagehide" === t.type ? t.persisted ? "frozen" : "terminated" : Zn()
                                }(t), t.timeStamp)
                            }, {
                                capture: !0
                            });
                            return t.register(({
                                startTime: t,
                                duration: n = 0,
                                eventType: i
                            }) => i === Zr.VIEW ? {
                                type: i,
                                _dd: {
                                    page_states: Yn(o.findAll(t, n), t, e)
                                }
                            } : i === Zr.ACTION || i === Zr.ERROR ? {
                                type: i,
                                view: {
                                    in_foreground: r("active", t, 0)
                                }
                            } : Bo.$O), {
                                wasInPageStateDuringPeriod: r,
                                addPageState: n,
                                stop() {
                                    a(), o.stop()
                                }
                            }
                        }(y);
                        f.push(() => b.stop());
                        const w = function(t) {
                            const e = (0, Wo.qj)({
                                expireDelay: pi
                            });
                            return t.subscribe(1, t => {
                                e.add(function(t) {
                                    return {
                                        service: t.service,
                                        version: t.version,
                                        context: t.context,
                                        id: t.id,
                                        name: t.name,
                                        startClocks: t.startClocks
                                    }
                                }(t), t.startClocks.relative)
                            }), t.subscribe(6, ({
                                endClocks: t
                            }) => {
                                e.closeActive(t.relative)
                            }), t.subscribe(3, t => {
                                const n = e.find(t.startClocks.relative);
                                n && (t.name && (n.name = t.name), t.context && (n.context = t.context), n.sessionIsActive = t.sessionIsActive)
                            }), t.subscribe(10, () => {
                                e.reset()
                            }), {
                                findView: (t, n) => e.find(t, n),
                                stop() {
                                    e.stop()
                                }
                            }
                        }(t);
                        f.push(() => w.stop());
                        const _ = function(t, e, n) {
                            function r({
                                url: t,
                                referrer: e
                            }) {
                                return {
                                    url: t,
                                    referrer: e
                                }
                            }
                            const o = (0, Wo.qj)({
                                expireDelay: ta
                            });
                            let i;
                            t.subscribe(1, ({
                                startClocks: t,
                                url: e
                            }) => {
                                const n = (0, gr.B)(_r.J.location).href,
                                    a = void 0 !== e ? (0, xr.c$)(e, n).href : n;
                                o.add(r({
                                    url: a,
                                    referrer: i || document.referrer
                                }), t.relative), i = a
                            }), t.subscribe(6, ({
                                endClocks: t
                            }) => {
                                o.closeActive(t.relative)
                            });
                            const a = n.subscribe(({
                                newLocation: t
                            }) => {
                                const e = o.find();
                                if (e) {
                                    const n = (0, hr.$S)();
                                    o.closeActive(n), o.add(r({
                                        url: t.href,
                                        referrer: e.referrer
                                    }), n)
                                }
                            });
                            return e.register(({
                                startTime: t,
                                eventType: e
                            }) => {
                                const n = o.find(t);
                                return n ? {
                                    type: e,
                                    view: {
                                        url: n.url,
                                        referrer: n.referrer
                                    }
                                } : Bo.ug
                            }), {
                                findUrl: t => o.find(t),
                                stop() {
                                    a.unsubscribe(), o.stop()
                                }
                            }
                        }(t, y, m);
                        f.push(() => _.stop());
                        const S = function(t, e, n) {
                            const r = (0, Wo.qj)({
                                expireDelay: ea
                            });
                            return t.subscribe(1, ({
                                startClocks: t
                            }) => {
                                r.add({}, t.relative)
                            }), t.subscribe(6, ({
                                endClocks: t
                            }) => {
                                r.closeActive(t.relative)
                            }), e.register(({
                                startTime: t,
                                eventType: e
                            }) => {
                                if (!n.trackFeatureFlagsForEvents.concat([Zr.VIEW, Zr.ERROR]).includes(e)) return Bo.$O;
                                const o = r.find(t);
                                return !o || (0, yo.RI)(o) ? Bo.$O : {
                                    type: e,
                                    feature_flags: o
                                }
                            }), {
                                addFeatureFlagEvaluation(t, e) {
                                    const n = r.find();
                                    n && (n[t] = e)
                                }
                            }
                        }(t, y, n);
                        (function(t, e, n, r, o) {
                            t.register(({
                                eventType: t,
                                startTime: i
                            }) => {
                                const a = n.findTrackedSession(i),
                                    s = o.findView(i);
                                if (!a || !s) return Bo.ug;
                                let c, u, l;
                                return t === Zr.VIEW ? (c = !!r.getReplayStats(s.id) || void 0, u = 1 === sr(a, e), l = !!s.sessionIsActive && void 0) : c = !!r.isRecording() || void 0, {
                                    type: t,
                                    session: {
                                        id: a.id,
                                        type: "user",
                                        has_replay: c,
                                        sampled_for_replay: u,
                                        is_active: l
                                    }
                                }
                            })
                        })(y, n, i, a, w),
                        function(t) {
                            t.register(({
                                eventType: t
                            }) => ({
                                type: t,
                                connectivity: (0, ua.q)()
                            }))
                        }(y),
                        function(t) {
                            const e = (li || (li = function() {
                                try {
                                    const t = sessionStorage.getItem(ui);
                                    if (t) return t;
                                    const e = (0, yr.l)();
                                    return sessionStorage.setItem(ui, e), e
                                } catch {
                                    return
                                }
                            }() ? ? (0, yr.l)()), li);
                            t.register(() => ({
                                tab: {
                                    id: e
                                }
                            }))
                        }(y);
                        const k = function(t, e) {
                                const n = ot();
                                return e.storeContextsAcrossPages && tt(n, "rum", 2), t.register(() => ({
                                    context: n.getContext()
                                })), n
                            }(y, n),
                            C = function(t, e, n) {
                                const r = it();
                                return e.storeContextsAcrossPages && tt(r, "rum", 1), t.register(({
                                    eventType: t,
                                    startTime: o
                                }) => {
                                    const i = r.getContext(),
                                        a = n.findTrackedSession(o);
                                    return a ? .anonymousId && !i.anonymous_id && e.trackAnonymousUser && (i.anonymous_id = a.anonymousId), (0, yo.RI)(i) ? Bo.$O : {
                                        type: t,
                                        usr: i
                                    }
                                }), r
                            }(y, n, i),
                            T = function(t, e) {
                                const n = at();
                                return e.storeContextsAcrossPages && tt(n, "rum", 4), t.register(() => {
                                    const t = n.getContext();
                                    return (0, yo.RI)(t) || !t.id ? Bo.$O : {
                                        account: t
                                    }
                                }), n
                            }(y, n),
                            E = function(t, e, n, r, o) {
                                const {
                                    unsubscribe: i
                                } = t.subscribe(0, e => {
                                    t.notify(12, pn(e))
                                }), a = Cr.l;
                                let s;
                                o.trackUserInteractions && (s = ln(t, n, r, o));
                                const c = function(t, e) {
                                        const n = We(t);
                                        return {
                                            addAction(t) {
                                                e({
                                                    id: (0, yr.l)(),
                                                    frustrationTypes: [],
                                                    ...t
                                                })
                                            },
                                            startAction(e, r = {}, o = (0, hr.M8)()) {
                                                const i = r.actionKey ? ? e,
                                                    a = n.start(i, o, {
                                                        name: e,
                                                        ...r
                                                    }, {
                                                        isChildEvent: un
                                                    });
                                                t.notify(15, a)
                                            },
                                            stopAction(t, r = {}, o = (0, hr.M8)()) {
                                                const i = r.actionKey ? ? t,
                                                    a = n.stop(i, o, r);
                                                if (!a) return;
                                                const s = [];
                                                a.counts && a.counts.errorCount > 0 && s.push(io);
                                                const c = { ...a,
                                                    type: a.type || oo,
                                                    frustrationTypes: s
                                                };
                                                e(c)
                                            },
                                            findActionId: n.findId,
                                            stop: n.stopAll
                                        }
                                    }(t, e => {
                                        t.notify(12, pn(e))
                                    }),
                                    u = {
                                        findActionId(t) {
                                            const e = c.findActionId(t),
                                                n = s ? .findActionId(t) ? ? [];
                                            return e.concat(n)
                                        }
                                    };
                                return e.assembleEventDefaults.register(({
                                    startTime: t,
                                    eventType: e
                                }) => {
                                    if (e !== Zr.ERROR && e !== Zr.RESOURCE && e !== Zr.LONG_TASK) return Bo.$O;
                                    const n = e === Zr.LONG_TASK ? (0, hr.Gw)(t, 1) : t,
                                        r = u.findActionId(n);
                                    return r.length ? {
                                        type: e,
                                        action: {
                                            id: r
                                        }
                                    } : Bo.$O
                                }), e.assembleTelemetry.register(({
                                    startTime: t
                                }) => ({
                                    action: {
                                        id: u.findActionId(t)
                                    }
                                })), {
                                    addAction: c.addAction,
                                    startAction: c.startAction,
                                    stopAction: c.stopAction,
                                    actionContexts: u,
                                    stop() {
                                        i(), a(), c.stop(), s ? .stop()
                                    }
                                }
                            }(t, e, p, g, n);
                        f.push(E.stop);
                        const A = function(t) {
                                return {
                                    addEvent(e, n, r, o) {
                                        la.includes(n.type) && t.notify(12, {
                                            startClocks: (0, hr.FR)(e),
                                            rawRumEvent: n,
                                            domainContext: r,
                                            duration: o
                                        })
                                    }
                                }
                            }(t),
                            I = function(t) {
                                let e;
                                const n = requestAnimationFrame((0, Sr.dm)(() => {
                                        e = Un()
                                    })),
                                    r = qn().subscribe(t => {
                                        e = t
                                    }).unsubscribe;
                                return t.register(({
                                    eventType: t
                                }) => ({
                                    type: t,
                                    display: e ? {
                                        viewport: e
                                    } : void 0
                                })), {
                                    stop() {
                                        r(), n && cancelAnimationFrame(n)
                                    }
                                }
                            }(y);
                        f.push(I.stop);
                        const R = function(t, e = function(t) {
                            const e = xt() ? (t, e) => (0, Or.q2)(_r.J.cookieStore, "change", n => {
                                const r = n.changed.find(e => e.name === t) || n.deleted.find(e => e.name === t);
                                r && e(r.value)
                            }).stop : er;
                            return new br.cP(n => e(t, t => n.notify(t)))
                        }(ia)) {
                            let n = N(ia) || function() {
                                const t = window.Cypress;
                                if (t) try {
                                    return t.env("traceId")
                                } catch {
                                    return void Lr.V.warn("Failed to read Cypress test execution id via Cypress.env(). Upgrade dd-trace-js to >= 5.88.0 to keep RUM \u2194 test correlation working.")
                                }
                            }();
                            const r = e.subscribe(t => {
                                n = t
                            });
                            return t.register(({
                                eventType: t
                            }) => "string" != typeof n ? Bo.$O : {
                                type: t,
                                session: {
                                    type: "ci_test"
                                },
                                ci_test: {
                                    test_execution_id: n
                                }
                            }), {
                                stop() {
                                    r.unsubscribe()
                                }
                            }
                        }(y);
                        f.push(R.stop),
                            function(t) {
                                t.register(({
                                    eventType: t
                                }) => Rt() ? {
                                    type: t,
                                    session: {
                                        type: "synthetics"
                                    },
                                    synthetics: { ...Rt(),
                                        injected: Ot()
                                    }
                                } : Bo.$O)
                            }(y),
                            function(t, e, n, r, o) {
                                const i = {
                                    [Zr.ERROR]: rr(Zr.ERROR, r, o),
                                    [Zr.ACTION]: rr(Zr.ACTION, r, o),
                                    [Zr.VITAL]: rr(Zr.VITAL, r, o)
                                };
                                e.subscribe(12, ({
                                    startClocks: r,
                                    duration: o,
                                    rawRumEvent: a,
                                    domainContext: s
                                }) => {
                                    const c = {
                                            eventType: a.type,
                                            rawRumEvent: a,
                                            domainContext: s,
                                            startTime: r.relative,
                                            duration: o
                                        },
                                        u = n.assembleEventDefaults.trigger(c);
                                    if (u === Bo.ug) return;
                                    const l = n.assembleEvent.trigger(c);
                                    if (l === Bo.ug) return;
                                    const d = (0, vr.kg)(u, a, l, {
                                        ddtags: (0, aa.m5)(t).join(",")
                                    });
                                    (function(t, e, n, r) {
                                        if (e) {
                                            const r = or(t, ca[t.type], t => e(t, n));
                                            if (!1 === r) {
                                                const e = t.type === Zr.VIEW ? "view" : t.type === Zr.VITAL && t.vital ? .type === so.WEBSOCKET ? "WebSocket vital" : void 0;
                                                if (!e) return !1;
                                                Lr.V.warn(`Can't dismiss ${e} events using beforeSend!`)
                                            }
                                        }
                                        const o = r[t.type] ? .isLimitReached();
                                        return !o
                                    })(d, t.beforeSend, s, i) && ((0, yo.RI)(d.context) && delete d.context, e.notify(13, d))
                                })
                            }(n, t, e, d);
                        const {
                            addTiming: M,
                            setLoadingTime: P,
                            startView: j,
                            setViewName: D,
                            setViewContext: L,
                            setViewContextProperty: $,
                            getViewContext: q,
                            stop: U
                        } = function(t, e, n, r, o, i, a, s, c) {
                            return t.subscribe(4, e => t.notify(12, function(t, e, n) {
                                    const r = n.getReplayStats(t.id),
                                        o = t.commonViewMetrics ? .cumulativeLayoutShift ? .devicePixelRatio,
                                        i = {
                                            _dd: {
                                                document_version: t.documentVersion,
                                                replay_stats: r,
                                                cls: o ? {
                                                    device_pixel_ratio: o
                                                } : void 0,
                                                configuration: {
                                                    start_session_replay_recording_manually: e.startSessionReplayRecordingManually,
                                                    remote_configuration_id: e.remoteConfigurationId
                                                }
                                            },
                                            date: t.startClocks.timeStamp,
                                            type: Zr.VIEW,
                                            view: {
                                                action: {
                                                    count: t.eventCounts.actionCount
                                                },
                                                frustration: {
                                                    count: t.eventCounts.frustrationCount
                                                },
                                                cumulative_layout_shift: t.commonViewMetrics.cumulativeLayoutShift ? .value,
                                                cumulative_layout_shift_time: (0, hr.Zj)(t.commonViewMetrics.cumulativeLayoutShift ? .time),
                                                cumulative_layout_shift_target_selector: t.commonViewMetrics.cumulativeLayoutShift ? .targetSelector,
                                                first_byte: (0, hr.Zj)(t.initialViewMetrics.navigationTimings ? .firstByte),
                                                dom_complete: (0, hr.Zj)(t.initialViewMetrics.navigationTimings ? .domComplete),
                                                dom_content_loaded: (0, hr.Zj)(t.initialViewMetrics.navigationTimings ? .domContentLoaded),
                                                dom_interactive: (0, hr.Zj)(t.initialViewMetrics.navigationTimings ? .domInteractive),
                                                error: {
                                                    count: t.eventCounts.errorCount
                                                },
                                                first_contentful_paint: (0, hr.Zj)(t.initialViewMetrics.firstContentfulPaint),
                                                interaction_to_next_paint: (0, hr.Zj)(t.commonViewMetrics.interactionToNextPaint ? .value),
                                                interaction_to_next_paint_time: (0, hr.Zj)(t.commonViewMetrics.interactionToNextPaint ? .time),
                                                interaction_to_next_paint_target_selector: t.commonViewMetrics.interactionToNextPaint ? .targetSelector,
                                                is_active: t.isActive,
                                                name: t.name,
                                                largest_contentful_paint: (0, hr.Zj)(t.initialViewMetrics.largestContentfulPaint ? .value),
                                                largest_contentful_paint_target_selector: t.initialViewMetrics.largestContentfulPaint ? .targetSelector,
                                                load_event: (0, hr.Zj)(t.initialViewMetrics.navigationTimings ? .loadEvent),
                                                loading_time: se((0, hr.Zj)(t.commonViewMetrics.loadingTime)),
                                                loading_type: t.loadingType,
                                                long_task: {
                                                    count: t.eventCounts.longTaskCount
                                                },
                                                performance: Bn(t.commonViewMetrics, t.initialViewMetrics),
                                                resource: {
                                                    count: t.eventCounts.resourceCount
                                                },
                                                time_spent: (0, hr.Zj)(t.duration)
                                            },
                                            display: t.commonViewMetrics.scroll ? {
                                                scroll: {
                                                    max_depth: t.commonViewMetrics.scroll.maxDepth,
                                                    max_depth_scroll_top: t.commonViewMetrics.scroll.maxDepthScrollTop,
                                                    max_scroll_height: t.commonViewMetrics.scroll.maxScrollHeight,
                                                    max_scroll_height_time: (0, hr.Zj)(t.commonViewMetrics.scroll.maxScrollHeightTime)
                                                }
                                            } : void 0,
                                            privacy: {
                                                replay_level: e.defaultPrivacyLevel
                                            },
                                            device: {
                                                locale: navigator.language,
                                                locales: navigator.languages,
                                                time_zone: Tn()
                                            }
                                        };
                                    return (0, yo.RI)(t.customTimings) || (i.view.custom_timings = (0, yo.LG)(t.customTimings, hr.Zj)), {
                                        rawRumEvent: i,
                                        startClocks: t.startClocks,
                                        duration: t.duration,
                                        domainContext: {
                                            location: t.location,
                                            handlingStack: t.handlingStack
                                        }
                                    }
                                }(e, n, a))), e.assembleEventDefaults.register(({
                                    startTime: t,
                                    eventType: e
                                }) => {
                                    const n = s.findView(t);
                                    return n ? {
                                        type: e,
                                        service: n.service,
                                        version: n.version,
                                        context: n.context,
                                        view: {
                                            id: n.id,
                                            name: n.name
                                        }
                                    } : Bo.ug
                                }), e.assembleTelemetry.register(({
                                    startTime: t
                                }) => ({
                                    view: {
                                        id: s.findView(t) ? .id
                                    }
                                })),
                                function(t, e, n, r, o, i, a) {
                                    function s(o, i, a) {
                                        const s = function(t, e, n, r, o, i = (0, hr.M8)(), a) {
                                            function s() {
                                                t.notify(3, {
                                                    id: l,
                                                    name: y,
                                                    context: g.getContext(),
                                                    startClocks: i,
                                                    sessionIsActive: v
                                                })
                                            }

                                            function c() {
                                                s(), C()
                                            }

                                            function u() {
                                                T(), s(), h += 1;
                                                const e = void 0 === p ? (0, hr.nx)() : p.timeStamp;
                                                t.notify(4, {
                                                    customTimings: f,
                                                    documentVersion: h,
                                                    id: l,
                                                    name: y,
                                                    service: b,
                                                    version: w,
                                                    context: g.getContext(),
                                                    loadingType: o,
                                                    location: m,
                                                    handlingStack: S,
                                                    startClocks: i,
                                                    commonViewMetrics: M(),
                                                    initialViewMetrics: L,
                                                    duration: (0, hr.vk)(i.timeStamp, e),
                                                    isActive: void 0 === p,
                                                    sessionIsActive: v,
                                                    eventCounts: U
                                                })
                                            }
                                            const l = (0, yr.l)(),
                                                d = new br.cP,
                                                f = {};
                                            let p, h = 0;
                                            const m = (0, yo.yG)((0, gr.B)(window.location)),
                                                g = rt();
                                            let v = !0,
                                                y = a ? .name;
                                            const b = a ? .service || r.service,
                                                w = a ? .version || r.version,
                                                _ = a ? .context,
                                                S = a ? .handlingStack;
                                            _ && g.setContext(_);
                                            const k = {
                                                id: l,
                                                name: y,
                                                startClocks: i,
                                                service: b,
                                                version: w,
                                                context: _,
                                                url: a ? .url
                                            };
                                            t.notify(1, k), t.notify(2, k);
                                            const {
                                                throttled: C,
                                                cancel: T
                                            } = (0, zo.n)(u, 3e3, {
                                                leading: !1
                                            }), E = o === no && (0, co.sr)(co.R9.SOFT_NAVIGATION) && ve(_i.SOFT_NAVIGATION), {
                                                setLoadEvent: A,
                                                setViewEnd: I,
                                                stop: O,
                                                stopINPTracking: R,
                                                getCommonViewMetrics: M,
                                                setLoadingTime: P,
                                                setNavigationId: N
                                            } = function(t, e, n, r, o, i, a, s) {
                                                const c = {};
                                                let u = !1,
                                                    l = !1;
                                                const {
                                                    stop: d,
                                                    setLoadEvent: f
                                                } = function(t, e, n, r, i, a) {
                                                    function s() {
                                                        if (!d && !l && f.length > 0) {
                                                            const e = Math.max(...f);
                                                            e < p.timeStamp - a.relative && (t = e, u || (c.loadingTime = t, o()))
                                                        }
                                                        var t
                                                    }
                                                    let l = i === eo,
                                                        d = !0;
                                                    const f = [],
                                                        p = An(a),
                                                        {
                                                            stop: h
                                                        } = ye(t, e, n, r, t => {
                                                            d && (d = !1, t.hadActivity && f.push((0, hr.vk)(a.timeStamp, t.end)), s())
                                                        });
                                                    return {
                                                        stop() {
                                                            h(), p.stop()
                                                        },
                                                        setLoadEvent(t) {
                                                            l && (l = !1, f.push(t), s())
                                                        }
                                                    }
                                                }(t, e, n, r, i, a), {
                                                    stop: p
                                                } = function(t, e, n = function(t = 1e3) {
                                                    return new br.cP(e => {
                                                        const n = (0, zo.n)(function() {
                                                                e.notify(function() {
                                                                    const t = $n(),
                                                                        {
                                                                            height: e
                                                                        } = Un();
                                                                    return {
                                                                        scrollHeight: Math.round((document.scrollingElement || document.documentElement).scrollHeight),
                                                                        scrollDepth: Math.round(e + t),
                                                                        scrollTop: t
                                                                    }
                                                                }())
                                                            }, t, {
                                                                leading: !1,
                                                                trailing: !0
                                                            }),
                                                            r = document.scrollingElement || document.documentElement,
                                                            o = new ResizeObserver((0, Sr.dm)(n.throttled));
                                                        r && o.observe(r);
                                                        const i = (0, Or.q2)(window, "scroll", n.throttled, {
                                                            passive: !0
                                                        });
                                                        return () => {
                                                            n.cancel(), o.disconnect(), i.stop()
                                                        }
                                                    })
                                                }()) {
                                                    let r = 0,
                                                        o = 0,
                                                        i = 0;
                                                    const a = n.subscribe(({
                                                        scrollDepth: n,
                                                        scrollTop: a,
                                                        scrollHeight: s
                                                    }) => {
                                                        let c = !1;
                                                        if (n > r && (r = n, c = !0), s > o) {
                                                            o = s;
                                                            const e = (0, hr.$S)();
                                                            i = (0, hr.vk)(t.relative, e), c = !0
                                                        }
                                                        c && e({
                                                            maxDepth: Math.min(r, o),
                                                            maxDepthScrollTop: a,
                                                            maxScrollHeight: o,
                                                            maxScrollHeightTime: i
                                                        })
                                                    });
                                                    return {
                                                        stop: () => a.unsubscribe()
                                                    }
                                                }(a, t => {
                                                    c.scroll = t
                                                }), {
                                                    stop: h,
                                                    setNavigationId: m
                                                } = function(t, e, n, r) {
                                                    function o(r) {
                                                        for (const o of r) {
                                                            if (o.hadRecentInput || o.startTime < e || !s.accept(o)) continue;
                                                            const {
                                                                cumulatedValue: r,
                                                                isMaxValue: u
                                                            } = c.update(o);
                                                            if (u) {
                                                                const t = Rn(o.sources);
                                                                i = {
                                                                    target: t ? .node ? new WeakRef(t.node) : void 0,
                                                                    time: (0, hr.vk)(e, o.startTime),
                                                                    previousRect: t ? .previousRect,
                                                                    currentRect: t ? .currentRect,
                                                                    devicePixelRatio: window.devicePixelRatio
                                                                }
                                                            }
                                                            if (r > a) {
                                                                a = r;
                                                                const e = i ? .target ? .deref();
                                                                n({
                                                                    value: x(a, 4),
                                                                    targetSelector: e && xe(e, t.actionNameAttribute),
                                                                    time: i ? .time,
                                                                    previousRect: i ? .previousRect ? Mn(i.previousRect) : void 0,
                                                                    currentRect: i ? .currentRect ? Mn(i.currentRect) : void 0,
                                                                    devicePixelRatio: i ? .devicePixelRatio
                                                                })
                                                            }
                                                        }
                                                    }
                                                    if (!ve(_i.LAYOUT_SHIFT) || !("WeakRef" in window)) return {
                                                        stop: Cr.l,
                                                        setNavigationId: Cr.l
                                                    };
                                                    let i, a = 0;
                                                    const s = On(r);
                                                    n({
                                                        value: 0
                                                    });
                                                    let c = Pn();
                                                    const u = ge({
                                                        type: _i.LAYOUT_SHIFT,
                                                        buffered: !0
                                                    }).subscribe(o);
                                                    return {
                                                        stop() {
                                                            u.unsubscribe()
                                                        },
                                                        setNavigationId(t) {
                                                            s.setNavigationId(t, t => {
                                                                a = 0, i = void 0, c = Pn(), n({
                                                                    value: 0
                                                                }), o(t)
                                                            })
                                                        }
                                                    }
                                                }(r, a.relative, t => {
                                                    c.cumulativeLayoutShift = t, o()
                                                }, s), {
                                                    stop: g,
                                                    getInteractionToNextPaint: v,
                                                    setViewEnd: y,
                                                    setNavigationId: b
                                                } = function(t, e, n, r) {
                                                    function o(n) {
                                                        for (const t of n) t.interactionId && t.startTime >= e && t.startTime <= a && f.accept(t) && (l.process(t), d.process(t));
                                                        d.pruneUntracked();
                                                        const r = l.estimateP98Interaction();
                                                        r && function(n) {
                                                            const r = (0, hr.vk)(e, n.startTime);
                                                            if (n.duration !== i ? .duration || r !== i.startTime) {
                                                                let e = function(t) {
                                                                    const e = qi.get(t);
                                                                    return qi.delete(t), e
                                                                }(n.startTime);
                                                                !e && n.target && ue(n.target) && (e = xe(n.target, t.actionNameAttribute)), i = {
                                                                    duration: n.duration,
                                                                    startTime: r,
                                                                    targetSelector: e
                                                                }
                                                            }
                                                            i.subParts = d.computeSubParts(n, Dn(i.duration))
                                                        }(r)
                                                    }
                                                    if (!(ve(_i.EVENT) && window.PerformanceEventTiming && "interactionId" in PerformanceEventTiming.prototype)) return {
                                                        getInteractionToNextPaint() {},
                                                        setViewEnd: Cr.l,
                                                        setNavigationId: Cr.l,
                                                        stop: Cr.l
                                                    };
                                                    let i, a = 1 / 0;
                                                    const {
                                                        getViewInteractionCount: s,
                                                        stopViewInteractionCount: c,
                                                        resetViewInteractionCount: u
                                                    } = function(t) {
                                                        function e() {
                                                            return Xi() - n
                                                        }
                                                        "interactionCount" in performance || Gi || (Gi = new window.PerformanceObserver((0, Sr.dm)(t => {
                                                            t.getEntries().forEach(t => {
                                                                const e = t;
                                                                e.interactionId && (Ji = Math.min(Ji, e.interactionId), Qi = Math.max(Qi, e.interactionId), Ki = (Qi - Ji) / 7 + 1)
                                                            })
                                                        })), Gi.observe({
                                                            type: "event",
                                                            buffered: !0,
                                                            durationThreshold: 0
                                                        }));
                                                        let n = t === eo ? 0 : Xi(),
                                                            r = {
                                                                stopped: !1
                                                            };
                                                        return {
                                                            getViewInteractionCount: () => r.stopped ? r.interactionCount : e(),
                                                            stopViewInteractionCount() {
                                                                r = {
                                                                    stopped: !0,
                                                                    interactionCount: e()
                                                                }
                                                            },
                                                            resetViewInteractionCount() {
                                                                n = Xi()
                                                            }
                                                        }
                                                    }(n);
                                                    let l = Nn(s),
                                                        d = jn(l);
                                                    const f = On(r),
                                                        p = ge({
                                                            type: _i.FIRST_INPUT,
                                                            buffered: !0
                                                        }).subscribe(o),
                                                        h = ge({
                                                            type: _i.EVENT,
                                                            durationThreshold: 40,
                                                            buffered: !0
                                                        }).subscribe(o);
                                                    return {
                                                        getInteractionToNextPaint: () => i ? {
                                                            value: Dn(i.duration),
                                                            targetSelector: i.targetSelector,
                                                            time: i.startTime,
                                                            subParts: i.subParts
                                                        } : s() ? {
                                                            value: 0
                                                        } : void 0,
                                                        setViewEnd(t) {
                                                            a = t, c()
                                                        },
                                                        setNavigationId(t) {
                                                            u(), f.setNavigationId(t, t => {
                                                                l = Nn(s), d = jn(l), i = void 0, o(t)
                                                            })
                                                        },
                                                        stop() {
                                                            h.unsubscribe(), p.unsubscribe(), d.stop()
                                                        }
                                                    }
                                                }(r, a.relative, i, s);
                                                return {
                                                    stop() {
                                                        d(), h(), p()
                                                    },
                                                    stopINPTracking: g,
                                                    setLoadEvent: f,
                                                    setViewEnd(t) {
                                                        l = !0, y(t)
                                                    },
                                                    setNavigationId(t) {
                                                        m(t), b(t)
                                                    },
                                                    getCommonViewMetrics: () => (c.interactionToNextPaint = v(), c),
                                                    setLoadingTime(t) {
                                                        if (l) return;
                                                        const e = (0, hr.vk)(a.timeStamp, t ? ? (0, hr.nx)());
                                                        u || d(), u = !0, c.loadingTime = e, o()
                                                    }
                                                }
                                            }(t, e, n, r, c, o, i, E);
                                            let j = o === eo ? { ...In(r, i, A, c),
                                                setViewEnd: Cr.l
                                            } : {
                                                stop: Cr.l,
                                                initialViewMetrics: {},
                                                setViewEnd: Cr.l
                                            };
                                            E && (j = function(t, e, n) {
                                                function r(n) {
                                                    if (i)
                                                        for (const r of n) {
                                                            if (r.interactionId !== i.interactionId || r.largestContentfulPaint.size <= s) continue;
                                                            s = r.largestContentfulPaint.size;
                                                            const n = r.largestContentfulPaint,
                                                                a = n.url || void 0,
                                                                c = {
                                                                    value: n.startTime - i.startTime,
                                                                    targetSelector: n.element ? xe(n.element, t.actionNameAttribute) : void 0,
                                                                    resourceUrl: a,
                                                                    subParts: En(a, n.startTime, i.startTime)
                                                                };
                                                            o.largestContentfulPaint = c, e()
                                                        }
                                                }
                                                const o = {};
                                                let i, a = !1,
                                                    s = 0;
                                                const c = [],
                                                    u = ge({
                                                        type: _i.INTERACTION_CONTENTFUL_PAINT,
                                                        buffered: !0
                                                    }).subscribe(t => {
                                                        i || c.push(...t), r(t)
                                                    }),
                                                    l = ge({
                                                        type: _i.SOFT_NAVIGATION,
                                                        buffered: !1
                                                    }).subscribe(t => {
                                                        if (i) return;
                                                        i = t[0], o.firstContentfulPaint = (0, hr.vk)(i.startTime, i.presentationTime || i.paintTime), n(i.navigationId), e(), r(c), c.length = 0;
                                                        const a = i.getLargestInteractionContentfulPaint();
                                                        a && r([a])
                                                    });
                                                return {
                                                    initialViewMetrics: o,
                                                    setViewEnd() {
                                                        a = !0, l.unsubscribe(), i || u.unsubscribe()
                                                    },
                                                    stop() {
                                                        a || l.unsubscribe(), u.unsubscribe()
                                                    }
                                                }
                                            }(r, c, N));
                                            const {
                                                stop: D,
                                                initialViewMetrics: L,
                                                setViewEnd: $
                                            } = j;
                                            o === ro && function(t, e, n) {
                                                var r, o;
                                                r = t.relative, o = t => {
                                                    e.firstContentfulPaint = t, e.largestContentfulPaint = {
                                                        value: t
                                                    }, n()
                                                }, requestAnimationFrame(() => {
                                                    requestAnimationFrame(() => {
                                                        o((0, hr.vk)(r, (0, hr.$S)()))
                                                    })
                                                })
                                            }(i, L, c);
                                            const {
                                                stop: q,
                                                eventCounts: U
                                            } = function(t, e, n) {
                                                const {
                                                    stop: r,
                                                    eventCounts: o
                                                } = He({
                                                    lifeCycle: t,
                                                    isChildEvent: t => t.view.id === e,
                                                    onChange: n
                                                });
                                                return {
                                                    stop: r,
                                                    eventCounts: o
                                                }
                                            }(t, l, c), V = (0, Ho.yb)(u, 3e5), B = t.subscribe(11, t => {
                                                t === ci.y5.UNLOADING && u()
                                            });
                                            return u(), g.changeObservable.subscribe(c), {
                                                get name() {
                                                    return y
                                                },
                                                service: b,
                                                version: w,
                                                contextManager: g,
                                                stopObservable: d,
                                                end(e = {}) {
                                                    p || (p = e.endClocks ? ? (0, hr.M8)(), v = e.sessionIsActive ? ? !0, t.notify(5, {
                                                        endClocks: p
                                                    }), t.notify(6, {
                                                        endClocks: p
                                                    }), (0, Ho.vG)(V), I(p.relative), $(), O(), B.unsubscribe(), u(), (0, Ho.wg)(() => {
                                                        this.stop()
                                                    }, 3e5))
                                                },
                                                stop() {
                                                    D(), q(), R(), d.notify()
                                                },
                                                addTiming(t, e) {
                                                    if (p) return;
                                                    const n = (0, hr.A3)(e) ? e : (0, hr.vk)(i.timeStamp, e);
                                                    f[function(t) {
                                                        const e = t.replace(/[^a-zA-Z0-9-_.@$]/g, "_");
                                                        return e !== t && Lr.V.warn(`Invalid timing name: ${t}, sanitized to: ${e}`), e
                                                    }(t)] = n, c()
                                                },
                                                setLoadingTime: P,
                                                setViewName(t) {
                                                    y = t, u()
                                                }
                                            }
                                        }(t, e, n, r, o, i, a);
                                        return c.add(s), s.stopObservable.subscribe(() => {
                                            c.delete(s)
                                        }), s
                                    }
                                    const c = new Set;
                                    let u, l, d = s(eo, (0, hr.Oc)(), a);
                                    return t.subscribe(10, () => {
                                        d = s("session_renewal", void 0, {
                                            name: d.name,
                                            service: d.service,
                                            version: d.version,
                                            context: d.contextManager.getContext()
                                        })
                                    }), t.subscribe(9, ({
                                        endClocks: t
                                    }) => {
                                        d.end({
                                            sessionIsActive: !1,
                                            endClocks: t
                                        })
                                    }), i && (l = function(t) {
                                        return t.subscribe(({
                                            oldLocation: t,
                                            newLocation: e
                                        }) => {
                                            var n, r;
                                            r = e, ((n = t).pathname !== r.pathname || ! function(t) {
                                                const e = t.substring(1);
                                                return "" !== e && !!document.getElementById(e)
                                            }(r.hash) && Vn(r.hash) !== Vn(n.hash)) && (d.end(), d = s(no))
                                        })
                                    }(o), u = function() {
                                        const {
                                            stop: t
                                        } = (0, Or.q2)(window, "pageshow", t => {
                                            t.persisted && (t => {
                                                d.end();
                                                const e = (0, hr.FR)(t.timeStamp);
                                                d = s(ro, e, void 0)
                                            })(t)
                                        }, {
                                            capture: !0
                                        });
                                        return t
                                    }()), {
                                        addTiming(t, e = (0, hr.nx)()) {
                                            d.addTiming(t, e)
                                        },
                                        setLoadingTime: t => d.setLoadingTime(t),
                                        startView(t, e) {
                                            d.end({
                                                endClocks: e
                                            }), d = s(no, e, t)
                                        },
                                        setViewContext(t) {
                                            d.contextManager.setContext(t)
                                        },
                                        setViewContextProperty(t, e) {
                                            d.contextManager.setContextProperty(t, e)
                                        },
                                        setViewName(t) {
                                            d.setViewName(t)
                                        },
                                        getViewContext: () => d.contextManager.getContext(),
                                        stop() {
                                            l && l.unsubscribe(), u && u(), d.end(), c.forEach(t => t.stop())
                                        }
                                    }
                                }(t, r, o, n, i, !n.trackViewsManually, c)
                        }(t, e, n, p, g, m, a, w, c);
                        (function(t) {
                            t.register(({
                                domainContext: t,
                                rawRumEvent: e
                            }) => {
                                const n = function(t, e) {
                                    if ("long_task" === e.type && "long-animation-frame" === e.long_task.entry_type) return e.long_task.scripts[0] ? .source_url;
                                    let n;
                                    "handlingStack" in t && (n = t.handlingStack), "error" === e.type && e.error.stack && (n = e.error.stack);
                                    const r = (0, Nr.T)({
                                        stack: n
                                    });
                                    return r.stack[0] ? .url
                                }(t, e);
                                if (!n) return Bo.$O;
                                const r = (0, qr.yN)(n);
                                return r ? {
                                    type: e.type,
                                    service: r.service,
                                    version: r.version
                                } : Bo.$O
                            })
                        })(y), f.push(U);
                        const V = function(t, e) {
                            function n(e) {
                                r.push(() => {
                                    const n = e();
                                    n && t.notify(12, n)
                                })
                            }
                            const r = (0, gr.B)(gn)(),
                                o = function(t) {
                                    const e = new Set,
                                        n = t.subscribe(8, t => {
                                            e.add(t), e.size > 1e3 && e.delete(e.values().next().value)
                                        });
                                    return {
                                        getMatchingRequest(t) {
                                            let n, r = 1 / 0;
                                            for (const o of e) {
                                                const e = t.startTime - o.startClocks.relative;
                                                0 <= e && e < r && o.url === t.name && (r = Math.abs(e), n = o)
                                            }
                                            return n && e.delete(n), n
                                        },
                                        stop() {
                                            n.unsubscribe()
                                        }
                                    }
                                }(t),
                                i = ge({
                                    type: _i.RESOURCE,
                                    buffered: !0
                                }).subscribe(r => {
                                    for (const i of r) Nt(i) ? (0, Ho.wg)(() => {
                                        const n = xn(i, o.getMatchingRequest(i), e);
                                        n && t.notify(12, n)
                                    }, 50) : n(() => xn(i, void 0, e))
                                }),
                                {
                                    stop: a
                                } = (0, Bi.H)("interactive", () => {
                                    n(() => xn(vn(), void 0, e))
                                }),
                                s = We(t),
                                c = function(t, e) {
                                    return {
                                        startResource(t, n = {}, r = (0, hr.M8)()) {
                                            const o = n.resourceKey ? ? t;
                                            e.start(o, r, {
                                                url: t,
                                                ...n
                                            })
                                        },
                                        stopResource(n, r = {}, o = (0, hr.M8)()) {
                                            const i = r.resourceKey ? ? n,
                                                a = e.stop(i, o, {
                                                    context: r.context,
                                                    type: r.type
                                                });
                                            if (!a) return;
                                            const s = (0, hr.vk)(a.startClocks.relative, o.relative),
                                                c = {
                                                    date: a.startClocks.timeStamp,
                                                    type: Zr.RESOURCE,
                                                    resource: {
                                                        id: a.id,
                                                        type: a.type || mi,
                                                        url: Vt(a.url),
                                                        duration: (0, hr.Zj)(s),
                                                        method: a.method,
                                                        status_code: r.statusCode,
                                                        size: r.size
                                                    },
                                                    _dd: {},
                                                    context: a.context
                                                };
                                            t.notify(12, {
                                                rawRumEvent: c,
                                                startClocks: a.startClocks,
                                                duration: s,
                                                domainContext: {
                                                    isManual: !0
                                                }
                                            })
                                        }
                                    }
                                }(t, s);
                            return {
                                startResource: c.startResource,
                                stopResource: c.stopResource,
                                stop() {
                                    a(), r.stop(), i.unsubscribe(), s.stopAll()
                                }
                            }
                        }(t, n);
                        f.push(V.stop);
                        const {
                            stop: B
                        } = function(t, e) {
                            const n = ge({
                                type: ve(_i.LONG_ANIMATION_FRAME) ? _i.LONG_ANIMATION_FRAME : _i.LONG_TASK,
                                buffered: !0
                            }).subscribe(n => {
                                for (const r of n) {
                                    if (!e.trackLongTasks) break;
                                    const n = (0, hr.FR)(r.startTime),
                                        o = nr(r, n);
                                    t.notify(12, {
                                        rawRumEvent: o,
                                        startClocks: n,
                                        duration: r.duration,
                                        domainContext: {
                                            performanceEntry: r
                                        }
                                    })
                                }
                            });
                            return {
                                stop: () => n.unsubscribe()
                            }
                        }(t, n);
                        f.push(B);
                        const {
                            addError: F
                        } = function(t, e) {
                            const n = new br.cP;
                            return e.subscribe(({
                                    data: t,
                                    type: e
                                }) => {
                                    0 === e ? n.notify(t) : 3 === e && t.api === mr.bP.error && n.notify(t.error)
                                }),
                                function(t) {
                                    (function(t) {
                                        const e = [];
                                        t.includes(Ui) && e.push(new br.cP(t => {
                                            if (!(0, Or.BX)(document, "securitypolicyviolation")) return;
                                            const {
                                                stop: e
                                            } = (0, Or.q2)(document, "securitypolicyviolation", e => {
                                                t.notify(function(t) {
                                                    const e = `'${t.blockedURI}' blocked by '${t.effectiveDirective}' directive`;
                                                    return hn({
                                                        type: t.effectiveDirective,
                                                        message: `${Ui}: ${e}`,
                                                        originalError: t,
                                                        csp: {
                                                            disposition: t.disposition
                                                        },
                                                        stack: mn(t.effectiveDirective, t.originalPolicy ? `${e} of the policy "${O(t.originalPolicy,100,"...")}"` : "no policy", t.sourceFile, t.lineNumber, t.columnNumber),
                                                        debugIds: t.sourceFile ? (0, qr.Jv)([t.sourceFile]) : void 0
                                                    })
                                                }(e))
                                            });
                                            return e
                                        }));
                                        const n = t.filter(t => t !== Ui);
                                        return n.length && e.push(function(t) {
                                            return new br.cP(e => {
                                                if (!window.ReportingObserver) return;
                                                const n = (0, Sr.dm)(t => t.forEach(t => e.notify(function(t) {
                                                        const {
                                                            type: e,
                                                            body: n
                                                        } = t;
                                                        return hn({
                                                            type: n.id,
                                                            message: `${e}: ${n.message}`,
                                                            originalError: t,
                                                            stack: mn(n.id, n.message, n.sourceFile, n.lineNumber, n.columnNumber),
                                                            debugIds: n.sourceFile ? (0, qr.Jv)([n.sourceFile]) : void 0
                                                        })
                                                    }(t)))),
                                                    r = new window.ReportingObserver(n, {
                                                        types: t,
                                                        buffered: !0
                                                    });
                                                return r.observe(), () => {
                                                    r.disconnect()
                                                }
                                            })
                                        }(n)), (0, br.Fx)(...e)
                                    })([Ui, "intervention"]).subscribe(e => t.notify(e))
                                }(n), n.subscribe(e => t.notify(14, {
                                    error: e
                                })),
                                function(t) {
                                    return t.subscribe(14, ({
                                        error: e
                                    }) => {
                                        t.notify(12, function(t) {
                                            const e = {
                                                    date: t.startClocks.timeStamp,
                                                    error: {
                                                        id: (0, yr.l)(),
                                                        message: t.message,
                                                        source: t.source,
                                                        stack: t.stack,
                                                        handling_stack: t.handlingStack,
                                                        component_stack: t.componentStack,
                                                        type: t.type,
                                                        handling: t.handling,
                                                        causes: t.causes,
                                                        source_type: "browser",
                                                        fingerprint: t.fingerprint,
                                                        csp: t.csp
                                                    },
                                                    _dd: {
                                                        debug_ids: t.debugIds
                                                    },
                                                    type: Zr.ERROR,
                                                    context: t.context
                                                },
                                                n = {
                                                    error: t.originalError,
                                                    handlingStack: t.handlingStack
                                                };
                                            return {
                                                rawRumEvent: e,
                                                startClocks: t.startClocks,
                                                domainContext: n
                                            }
                                        }(e))
                                    }), {
                                        addError({
                                            error: e,
                                            handlingStack: n,
                                            componentStack: r,
                                            startClocks: o,
                                            context: i
                                        }) {
                                            const a = h({
                                                originalError: e,
                                                handlingStack: n,
                                                componentStack: r,
                                                startClocks: o,
                                                nonErrorPrefix: "Provided",
                                                source: Vr.g.CUSTOM,
                                                handling: "handled"
                                            });
                                            a.context = (0, vr.kg)(a.context, i), t.notify(14, {
                                                error: a
                                            })
                                        }
                                    }
                                }(t)
                        }(t, u);
                        ! function(t, e, n, i, a, s) {
                            const c = function(t, e, n, r) {
                                return {
                                    clearTracingIfNeeded: Ht,
                                    traceFetch: o => Wt(t, o, e, n, r, t => {
                                        if (o.input instanceof Request && !o.init ? .headers) o.input = new Request(o.input), Object.keys(t).forEach(e => {
                                            o.input.headers.append(e, t[e])
                                        });
                                        else {
                                            o.init = (0, yo.yG)(o.init);
                                            const e = [];
                                            o.init.headers instanceof Headers ? o.init.headers.forEach((t, n) => {
                                                e.push([n, t])
                                            }) : Array.isArray(o.init.headers) ? o.init.headers.forEach(t => {
                                                e.push(t)
                                            }) : o.init.headers && Object.keys(o.init.headers).forEach(t => {
                                                e.push([t, o.init.headers[t]])
                                            }), o.init.headers = e.concat((0, Ko.WP)(t))
                                        }
                                    }),
                                    traceXhr: (o, i) => Wt(t, o, e, n, r, t => {
                                        try {
                                            Object.keys(t).forEach(e => {
                                                i.setRequestHeader(e, t[e])
                                            })
                                        } catch {}
                                    })
                                }
                            }(e, n, i, a);
                            ! function(t, e, n) {
                                const r = [];
                                r.push(o().subscribe(t => {
                                    "start" === t.state && Ut(t.url) && (e.traceXhr(t, t.xhr), Kt(t))
                                })), r.push(n.subscribe(({
                                    data: n,
                                    type: r
                                }) => {
                                    if (2 !== r) return;
                                    const o = n;
                                    if (Ut(o.url)) switch (o.state) {
                                        case "start":
                                            Kt(o), t.notify(7, {
                                                requestIndex: o.requestIndex,
                                                url: o.url
                                            });
                                            break;
                                        case "complete":
                                            e.clearTracingIfNeeded(o), t.notify(8, { ...o,
                                                type: "xhr",
                                                isAbortedOnStart: !1
                                            })
                                    }
                                }))
                            }(t, c, s),
                            function(t, e, n, o) {
                                const i = [];
                                i.push(r({
                                    responseBodyAction: t => Gt(t.url, e) ? .trackResponseErrors ? 1 : 0
                                }).subscribe(t => {
                                    "start" === t.state && Ut(t.url) && (n.traceFetch(t), Kt(t))
                                })), i.push(o.subscribe(({
                                    data: e,
                                    type: r
                                }) => {
                                    if (1 !== r) return;
                                    const o = e;
                                    if (Ut(o.url)) switch (o.state) {
                                        case "start":
                                            Kt(o), t.notify(7, {
                                                requestIndex: o.requestIndex,
                                                url: o.url
                                            });
                                            break;
                                        case "resolve":
                                            n.clearTracingIfNeeded(o), t.notify(8, { ...o,
                                                duration: (0, hr.vk)(o.startClocks.timeStamp, (0, hr.nx)()),
                                                type: gi,
                                                requestBody: o.init ? .body
                                            })
                                    }
                                }))
                            }(t, e, c, s)
                        }(t, n, i, C, T, u);
                        const z = function(t, e) {
                                function n(n) {
                                    (function(t) {
                                        return !e.wasInPageStateDuringPeriod("frozen", t.startClocks.relative, t.duration)
                                    })(n) && t.notify(12, tr(n))
                                }
                                const r = We(t);
                                return {
                                    addOperationStepVital(e, n, r, o) {
                                        const {
                                            operationKey: i,
                                            context: a,
                                            description: c,
                                            handlingStack: u
                                        } = r || {}, l = {
                                            name: e,
                                            type: so.OPERATION_STEP,
                                            operationKey: i,
                                            failureReason: o,
                                            stepType: n,
                                            startClocks: (0, hr.M8)(),
                                            context: s(a),
                                            description: c,
                                            handlingStack: u
                                        };
                                        t.notify(12, tr(l))
                                    },
                                    addDurationVital: n,
                                    startDurationVital(e, n = {}, o = (0, hr.M8)()) {
                                        const {
                                            id: i
                                        } = r.start(n.vitalKey ? ? e, o, {
                                            name: e,
                                            ...n
                                        });
                                        t.notify(16, {
                                            id: i,
                                            name: e,
                                            startClocks: o,
                                            ...n
                                        })
                                    },
                                    stopDurationVital(t, e = {}, o = (0, hr.M8)()) {
                                        const i = r.stop(e.vitalKey ? ? t, o, e);
                                        i && n({
                                            type: so.DURATION,
                                            ...i
                                        })
                                    }
                                }
                            }(t, b),
                            H = function(t, e) {
                                if (! function(t) {
                                        return t.trackResources && (t.betaTrackWebSockets || (0, co.sr)(co.R9.TRACK_WEBSOCKETS))
                                    }(e)) return {
                                    stop: Cr.l
                                };
                                const n = function(t, e) {
                                        function n(e, n) {
                                            const r = n.getState();
                                            t.notify(12, {
                                                rawRumEvent: Qt(r),
                                                startClocks: Xt(r),
                                                domainContext: {
                                                    webSocket: e
                                                }
                                            })
                                        }

                                        function r() {
                                            const t = (0, hr.M8)();
                                            i.forEach((e, r) => {
                                                e.isOpen() && (e.recordReport(t), n(r, e))
                                            })
                                        }

                                        function o() {
                                            (0, Ho.vG)(a), a = void 0
                                        }
                                        const i = new Map;
                                        let a;
                                        const s = e.subscribe(t => {
                                            (function(t) {
                                                switch (t.state) {
                                                    case "connecting":
                                                        {
                                                            const e = function({
                                                                url: t,
                                                                protocols: e,
                                                                startClocks: n
                                                            }) {
                                                                function r() {
                                                                    return h += 1, h
                                                                }

                                                                function o(t) {
                                                                    return {
                                                                        inbound: { ...u.inbound,
                                                                            longestSilence: oe(l, t, u.inbound)
                                                                        },
                                                                        outbound: { ...u.outbound,
                                                                            longestSilence: oe(d, t, u.outbound)
                                                                        },
                                                                        bufferedAmountMax: u.bufferedAmountMax
                                                                    }
                                                                }

                                                                function i(t, e, n, i) {
                                                                    p = {
                                                                        id: a,
                                                                        connectingClocks: s,
                                                                        phase: "closed",
                                                                        url: c,
                                                                        endClocks: t,
                                                                        trackingEndReason: e,
                                                                        closeEvent: i,
                                                                        snapshotVersion: r(),
                                                                        snapshot: f ? o(t.relative) : void 0,
                                                                        bufferedAmountAtClose: n,
                                                                        silenceBeforeClose: {
                                                                            inbound: ie(l, t.relative),
                                                                            outbound: ie(d, t.relative)
                                                                        }
                                                                    }
                                                                }
                                                                const a = (0, yr.l)(),
                                                                    s = n,
                                                                    c = function(t) {
                                                                        const e = (0, xr.c$)(t);
                                                                        return e.search = "", e.href
                                                                    }(t),
                                                                    u = {
                                                                        inbound: {
                                                                            messageCount: 0,
                                                                            messageSizeTotal: 0,
                                                                            messageSizeMax: 0,
                                                                            longestSilence: 0
                                                                        },
                                                                        outbound: {
                                                                            messageCount: 0,
                                                                            messageSizeTotal: 0,
                                                                            messageSizeMax: 0,
                                                                            longestSilence: 0
                                                                        },
                                                                        bufferedAmountMax: 0
                                                                    };
                                                                let l, d, f, p = {
                                                                        id: a,
                                                                        connectingClocks: s,
                                                                        phase: "connecting",
                                                                        url: c,
                                                                        requestedProtocols: ne(e)
                                                                    },
                                                                    h = 0;
                                                                return {
                                                                    getState: () => (0, vr.Go)(p),
                                                                    isOpen: () => "open" === p.phase,
                                                                    recordOpen(t) {
                                                                        f = t.openClocks, p = {
                                                                            id: a,
                                                                            connectingClocks: s,
                                                                            phase: "open",
                                                                            openClocks: f,
                                                                            reportClocks: { ...f
                                                                            },
                                                                            selectedProtocol: t.protocol || void 0,
                                                                            selectedExtensions: t.extensions || void 0,
                                                                            snapshotVersion: r(),
                                                                            snapshot: o(f.relative)
                                                                        }
                                                                    },
                                                                    recordReport(t) {
                                                                        "open" === p.phase && (p = { ...p,
                                                                            reportClocks: t,
                                                                            snapshotVersion: r(),
                                                                            snapshot: o(t.relative)
                                                                        })
                                                                    },
                                                                    recordInboundMessage({
                                                                        size: t,
                                                                        at: e
                                                                    }) {
                                                                        re(u.inbound, l, t, e.relative, f), l = e.relative
                                                                    },
                                                                    recordOutboundMessage({
                                                                        size: t,
                                                                        bufferedAmountPreSend: e,
                                                                        at: n
                                                                    }) {
                                                                        u.bufferedAmountMax = Math.max(u.bufferedAmountMax, e + t), re(u.outbound, d, t, n.relative, f), d = n.relative
                                                                    },
                                                                    recordClosing({
                                                                        at: t
                                                                    }) {
                                                                        p = {
                                                                            id: a,
                                                                            connectingClocks: s,
                                                                            phase: "closing",
                                                                            closingClocks: t
                                                                        }
                                                                    },
                                                                    recordClose({
                                                                        at: t,
                                                                        code: e,
                                                                        reason: n,
                                                                        wasClean: r,
                                                                        bufferedAmountAtClose: o
                                                                    }) {
                                                                        i(t, "close_event", o, {
                                                                            code: e,
                                                                            reason: n,
                                                                            wasClean: r
                                                                        })
                                                                    },
                                                                    recordTrackingEnd(t, e, n) {
                                                                        i(t, e, n)
                                                                    }
                                                                }
                                                            }(t);
                                                            return i.set(t.instance, e),
                                                            void n(t.instance, e)
                                                        }
                                                    case "open":
                                                        {
                                                            const e = i.get(t.instance);
                                                            if (!e) return;
                                                            return e.recordOpen(t),
                                                            void n(t.instance, e)
                                                        }
                                                    case "message-in":
                                                        return void i.get(t.instance) ? .recordInboundMessage(t);
                                                    case "message-out":
                                                        return void i.get(t.instance) ? .recordOutboundMessage(t);
                                                    case "closing":
                                                        {
                                                            const e = i.get(t.instance);
                                                            if (!e) return;
                                                            return e.recordClosing(t),
                                                            void n(t.instance, e)
                                                        }
                                                    case "closed":
                                                        {
                                                            const e = i.get(t.instance);
                                                            if (!e) return;i.delete(t.instance),
                                                            e.recordClose(t),
                                                            n(t.instance, e)
                                                        }
                                                }
                                            })(t), "message-in" !== t.state && "message-out" !== t.state && (function() {
                                                for (const t of i.values())
                                                    if (t.isOpen()) return !0;
                                                return !1
                                            }() ? void 0 === a && (a = (0, Ho.yb)(r, 6e4)) : o())
                                        });
                                        return {
                                            reportOpenConnections: r,
                                            flushOpenConnections(t = (0, hr.M8)(), e = "session_end") {
                                                const r = i.size;
                                                return i.forEach((r, o) => {
                                                    r.recordTrackingEnd(t, e, o.bufferedAmount), n(o, r)
                                                }), i.clear(), o(), r
                                            },
                                            stop() {
                                                s.unsubscribe(), i.clear(), o()
                                            }
                                        }
                                    }(t, (bi || (bi = new br.cP(t => {
                                        if ("function" != typeof _r.J.WebSocket) return;
                                        const {
                                            stop: e
                                        } = (0, kr.my)(_r.J, "WebSocket", ({
                                            parameters: e,
                                            onPostCall: n
                                        }) => {
                                            const r = Array.isArray(e[1]) ? [].concat(e[1]) : e[1],
                                                o = (0, hr.M8)();
                                            n(e => {
                                                t.notify({
                                                        state: "connecting",
                                                        instance: e,
                                                        url: e.url,
                                                        protocols: r,
                                                        startClocks: o
                                                    }),
                                                    function(t, e) {
                                                        const {
                                                            stop: n
                                                        } = (0, Or.q2)(t, "open", () => {
                                                            e.notify({
                                                                state: "open",
                                                                instance: t,
                                                                openClocks: (0, hr.M8)(),
                                                                protocol: t.protocol || "",
                                                                extensions: t.extensions || ""
                                                            }), n()
                                                        }), {
                                                            stop: r
                                                        } = (0, Or.q2)(t, "message", n => {
                                                            e.notify({
                                                                state: "message-in",
                                                                instance: t,
                                                                size: Jt(n.data),
                                                                at: (0, hr.M8)()
                                                            })
                                                        }), {
                                                            stop: o
                                                        } = (0, Or.q2)(t, "close", n => {
                                                            e.notify({
                                                                state: "closed",
                                                                instance: t,
                                                                code: n.code,
                                                                reason: n.reason,
                                                                wasClean: n.wasClean,
                                                                bufferedAmountAtClose: t.bufferedAmount,
                                                                at: (0, hr.M8)()
                                                            }), r(), o()
                                                        })
                                                    }(e, t)
                                            })
                                        }), {
                                            stop: n
                                        } = (0, kr.H7)(_r.J.WebSocket.prototype, "send", ({
                                            target: e,
                                            parameters: [n],
                                            onPostCall: r
                                        }) => {
                                            if (1 !== e.readyState) return;
                                            const o = Jt(n),
                                                i = e.bufferedAmount;
                                            r(() => {
                                                t.notify({
                                                    state: "message-out",
                                                    instance: e,
                                                    size: o,
                                                    bufferedAmountPreSend: i,
                                                    at: (0, hr.M8)()
                                                })
                                            })
                                        }), {
                                            stop: r
                                        } = (0, kr.H7)(_r.J.WebSocket.prototype, "close", ({
                                            target: e,
                                            onPostCall: n
                                        }) => {
                                            2 !== e.readyState && 3 !== e.readyState && n(() => {
                                                t.notify({
                                                    state: "closing",
                                                    instance: e,
                                                    at: (0, hr.M8)()
                                                })
                                            })
                                        });
                                        return () => {
                                            e(), n(), r()
                                        }
                                    })), bi)),
                                    r = t.subscribe(9, ({
                                        endClocks: t
                                    }) => {
                                        n.flushOpenConnections(t)
                                    }),
                                    o = t.subscribe(11, t => {
                                        t === ci.y5.PAGE_TERMINATED ? n.flushOpenConnections((0, hr.M8)(), "page_terminated") : n.reportOpenConnections()
                                    });
                                return {
                                    stop() {
                                        r.unsubscribe(), o.unsubscribe(), n.flushOpenConnections(), n.stop()
                                    }
                                }
                            }(t, n);
                        f.push(H.stop);
                        const W = function(t, e, n, r, o) {
                            return {
                                get(i) {
                                    const a = n.findView(i),
                                        s = o.findUrl(i),
                                        c = e.findTrackedSession(i);
                                    if (c && a && s) {
                                        const e = r.findActionId(i);
                                        return {
                                            application_id: t,
                                            session_id: c.id,
                                            user_action: e ? {
                                                id: e
                                            } : void 0,
                                            view: {
                                                id: a.id,
                                                name: a.name,
                                                referrer: s.referrer,
                                                url: s.url
                                            }
                                        }
                                    }
                                }
                            }
                        }(n.applicationId, i, w, E.actionContexts, _);
                        return {
                            addAction: E.addAction,
                            startAction: E.startAction,
                            stopAction: E.stopAction,
                            startResource: V.startResource,
                            stopResource: V.stopResource,
                            addEvent: A.addEvent,
                            addError: F,
                            addTiming: M,
                            setLoadingTime: P,
                            addFeatureFlagEvaluation: S.addFeatureFlagEvaluation,
                            startView: j,
                            setViewContext: L,
                            setViewContextProperty: $,
                            getViewContext: q,
                            setViewName: D,
                            viewHistory: w,
                            sessionManager: i,
                            stopSession: () => i.expire(),
                            getInternalContext: W.get,
                            startDurationVital: z.startDurationVital,
                            stopDurationVital: z.stopDurationVital,
                            addDurationVital: z.addDurationVital,
                            addOperationStepVital: z.addOperationStepVital,
                            globalContext: k,
                            userContext: C,
                            accountContext: T,
                            stop: () => f.forEach(t => t())
                        }
                    }(m, d, t, e, n, a, u, f, g);
                    return p.push(v), u.unbuffer(), p.push(() => i.stop()), { ...y,
                        lifeCycle: m,
                        sessionManager: e,
                        stopSession: () => e.expire(),
                        telemetry: l,
                        stop() {
                            p.forEach(t => t())
                        },
                        hooks: d
                    }
                }

                function ur(t, e, n = {}) {
                    const i = function(t) {
                            function e() {
                                return t === wr.GRANTED
                            }
                            const n = new br.cP;
                            return {
                                tryToInit(e) {
                                    t || (t = e)
                                },
                                onGrantedOnce(t) {
                                    if (e()) t();
                                    else {
                                        const r = n.subscribe(() => {
                                            e() && (t(), r.unsubscribe())
                                        })
                                    }
                                },
                                update(e) {
                                    t = e, n.notify()
                                },
                                isGranted: e,
                                observable: n
                            }
                        }(),
                        a = function(t = Object.values(mr.bP)) {
                            function e(t, e) {
                                return e.subscribe(e => {
                                    n.notify({
                                        type: t,
                                        data: e
                                    })
                                })
                            }
                            const n = new br.dX(500, t => {
                                    (0, Pr.A2)("Early data collection dropped data on unbuffer", {
                                        count: t
                                    })
                                }),
                                i = [e(0, (0, gr.B)(y)()), e(1, r()), e(2, o())],
                                a = new Map;
                            return t.forEach(t => {
                                a.set(t, e(3, function(t) {
                                    const e = t.map(t => (Br[t] || (Br[t] = function(t) {
                                        return new br.cP(e => {
                                            const {
                                                stop: n
                                            } = (0, kr.H7)(mr.JZ, t, ({
                                                parameters: n,
                                                handlingStack: r,
                                                onPostCall: o
                                            }) => {
                                                o(() => e.notify(function(t, e, n) {
                                                    const r = t.map(t => function(t) {
                                                        return "string" == typeof t ? s(t) : (0, Ur.b)(t) ? (0, $r.NR)((0, Nr.T)(t)) : (0, jr.s)(s(t), void 0, 2)
                                                    }(t)).join(" ");
                                                    if (e === mr.bP.error) {
                                                        const o = h({
                                                            originalError: t.find(Ur.b),
                                                            handlingStack: n,
                                                            startClocks: (0, hr.M8)(),
                                                            source: Vr.g.CONSOLE,
                                                            handling: "handled",
                                                            nonErrorPrefix: "Provided",
                                                            useFallbackStack: !1
                                                        });
                                                        return o.message = r, {
                                                            api: e,
                                                            message: r,
                                                            handlingStack: n,
                                                            error: o
                                                        }
                                                    }
                                                    return {
                                                        api: e,
                                                        message: r,
                                                        error: void 0,
                                                        handlingStack: n
                                                    }
                                                }(n, t, r)))
                                            }, {
                                                computeHandlingStack: !0,
                                                handlingStackType: "console error"
                                            });
                                            return n
                                        })
                                    }(t)), Br[t]));
                                    return (0, br.Fx)(...e)
                                }([t])))
                            }), {
                                observable: n,
                                restrictConsoleApis(t) {
                                    a.forEach((e, n) => {
                                        t.includes(n) || (e.unsubscribe(), a.delete(n))
                                    })
                                },
                                stop() {
                                    i.forEach(t => t.unsubscribe()), a.forEach(t => t.unsubscribe()), a.clear()
                                }
                            }
                        }([mr.bP.error]);
                    let c = function({
                        ignoreInitIfSyntheticsWillInjectRum: t = !0,
                        startDeflateWorker: e,
                        sdkName: n
                    }, r, o) {
                        function i() {
                            if (k || !h || !m || !g || !v) return;
                            let t;
                            if (b.unsubscribe(), m.trackViewsManually) {
                                if (!f) return;
                                t = f.options
                            }
                            const e = m.trackViewsManually ? f ? .callback : void 0,
                                n = o(m, g, p, t, v, y);
                            k = !0, c.subscribe(t => {
                                t !== e && t(n)
                            }), c.unbuffer()
                        }

                        function a(t, o, a, s) {
                            const c = (0, ho.d0)();
                            if (c && (t = function(t) {
                                    return { ...t,
                                        service: t.service || t.applicationId,
                                        applicationId: "00000000-aaaa-0000-aaaa-000000000000",
                                        clientToken: "empty",
                                        sessionSampleRate: 100,
                                        defaultPrivacyLevel: t.defaultPrivacyLevel ? ? (0, ho.Y9)() ? .getPrivacyLevel()
                                    }
                                }(t)), h = t, m) return void _("DD_RUM", t);
                            const u = function(t, e) {
                                const n = function(t, e, n) {
                                    if (t && "object" == typeof t) return C(e, t, n);
                                    n.error("Configuration must be an object")
                                }(t, qo, Lr.V);
                                if (!n) return;
                                const r = n.allowedTracingUrls.map(J).filter(Boolean);
                                if (r.length > 0 && !n.service) return void Lr.V.error("Service needs to be configured when tracing is enabled");
                                const o = function(t) {
                                    const e = t && $o[t.quality];
                                    return (0, co.sr)(co.R9.SESSION_REPLAY_RECORD_CANVAS) && t ? .enable && e ? {
                                        enable: !0,
                                        ...e
                                    } : void 0
                                }(n.sessionReplayCanvasRecording);
                                return { ...n,
                                    service: n.service || n.applicationId,
                                    sessionReplayCanvasRecording: o,
                                    betaEnableViewUpdates: G(n.betaEnableViewUpdates, n.proxy, e),
                                    allowedTracingUrls: r,
                                    beforeSend: n.beforeSend ? (0, mo.y)(n.beforeSend, "beforeSend threw an error:") : void 0,
                                    rulePsr: S(t.traceSampleRate) ? t.traceSampleRate / 100 : void 0,
                                    trackResourceHeaders: X(t),
                                    allowedGraphQlUrls: Q(t),
                                    remoteConfigurationId: W(t)
                                }
                            }(t, n);
                            u && function(t, e) {
                                const n = (0, gr.B)(_r.J.location),
                                    r = n ? n.origin : "",
                                    o = t.allowedTrackingOrigins;
                                if (!o) return ! function(t, e = "") {
                                    return !ct(t) && ct(e.split("\n").filter(t => {
                                        const e = t.trim();
                                        return e.length && /^at\s+|@/.test(e)
                                    })[1] || "")
                                }(r, e) || (Lr.V.error("Running the Browser SDK in a Web extension content script is forbidden unless the `allowedTrackingOrigins` option is provided."), !1);
                                const i = st(o, r);
                                return i || Lr.V.error("SDK initialized on a non-allowed domain."), i
                            }(u, a ? ? "") && (u.compressIntakeRequests && !c && e && (p = e(u, "Datadog RUM", Cr.l), !p) || (m = u, o ? .user && l.setContext(o.user), o ? .account && d.setContext(o.account), r.tryToInit(u.trackingConsent), r.onGrantedOnce(() => {
                                const {
                                    assembleTelemetry: e
                                } = y;
                                if (function(t, e) {
                                        t.register(() => e.isGranted() ? Bo.$O : Bo.ug)
                                    }(e, r), v = (0, gr.B)(Pr.a5)("browser-rum-sdk", u, e, n), _r.W) return void Lr.V.warn("The RUM SDK is not supported in a web or service worker environment.");
                                const o = r => {
                                    g = r,
                                        function(t, e, n) {
                                            t.register(({
                                                startTime: t
                                            }) => {
                                                const r = e.findTrackedSession(t);
                                                return r ? {
                                                    session: {
                                                        id: r.id
                                                    },
                                                    anonymous_id: r.anonymousId,
                                                    ...n
                                                } : Bo.$O
                                            })
                                        }(e, g, {
                                            application: {
                                                id: u.applicationId
                                            }
                                        }), (0, Pr.Rr)(function(t, e, n) {
                                            const r = {
                                                session_sample_rate: (o = t).sessionSampleRate,
                                                telemetry_sample_rate: o.telemetrySampleRate,
                                                telemetry_configuration_sample_rate: o.telemetryConfigurationSampleRate,
                                                telemetry_usage_sample_rate: o.telemetryUsageSampleRate,
                                                use_before_send: !!o.beforeSend,
                                                use_partitioned_cross_site_session_cookie: o.usePartitionedCrossSiteSessionCookie,
                                                use_secure_session_cookie: o.useSecureSessionCookie,
                                                use_proxy: !!o.proxy,
                                                silent_multiple_init: o.silentMultipleInit,
                                                track_session_across_subdomains: o.trackSessionAcrossSubdomains,
                                                track_anonymous_user: o.trackAnonymousUser,
                                                session_persistence: Array.isArray(o.sessionPersistence) ? o.sessionPersistence[0] : o.sessionPersistence,
                                                store_contexts_across_pages: !!o.storeContextsAcrossPages,
                                                allow_untrusted_events: !!o.allowUntrustedEvents,
                                                tracking_consent: o.trackingConsent,
                                                use_allowed_tracking_origins: Array.isArray(o.allowedTrackingOrigins),
                                                source: o.source,
                                                sdk_version: o.sdkVersion,
                                                variant: o.variant
                                            };
                                            var o, i, a;
                                            return {
                                                session_replay_sample_rate: t.sessionReplaySampleRate,
                                                start_session_replay_recording_manually: t.startSessionReplayRecordingManually,
                                                trace_sample_rate: t.traceSampleRate,
                                                trace_context_injection: t.traceContextInjection,
                                                propagate_trace_baggage: t.propagateTraceBaggage,
                                                action_name_attribute: t.actionNameAttribute,
                                                use_allowed_tracing_urls: (0, go.EI)(t.allowedTracingUrls),
                                                use_allowed_graph_ql_urls: (0, go.EI)(t.allowedGraphQlUrls),
                                                use_track_graph_ql_payload: (a = t.allowedGraphQlUrls, (0, go.EI)(a) && a.some(t => (0, Dr.OE)(t) && t.trackPayload)),
                                                use_track_graph_ql_response_errors: Y(t.allowedGraphQlUrls),
                                                selected_tracing_propagators: K(t),
                                                default_privacy_level: t.defaultPrivacyLevel,
                                                enable_privacy_for_action_name: t.enablePrivacyForActionName,
                                                use_excluded_activity_urls: (0, go.EI)(t.excludedActivityUrls),
                                                use_worker_url: !!t.workerUrl,
                                                compress_intake_requests: t.compressIntakeRequests,
                                                track_views_manually: t.trackViewsManually,
                                                track_user_interactions: t.trackUserInteractions,
                                                track_resources: t.trackResources,
                                                track_long_task: t.trackLongTasks,
                                                plugins: t.plugins ? .map(t => ({
                                                    name: t.name,
                                                    ...t.getConfigurationTelemetry ? .()
                                                })),
                                                track_feature_flags_for_events: t.trackFeatureFlagsForEvents,
                                                remote_configuration_id: W(t),
                                                remote_configuration: n && {
                                                    config_id: W(t),
                                                    last_modified: n.lastModified,
                                                    last_synced: n.lastSynced,
                                                    first_applied: n.firstApplied,
                                                    sync_id: n.syncId
                                                },
                                                profiling_sample_rate: t.profilingSampleRate,
                                                use_remote_configuration_proxy: !!t.remoteConfigurationProxy,
                                                track_resource_headers: (i = t.trackResourceHeaders, !0 === i ? "default_headers" : Array.isArray(i) ? "custom" : void 0),
                                                beta_enable_view_updates: G(t.betaEnableViewUpdates, t.proxy, e),
                                                beta_track_web_sockets: t.betaTrackWebSockets,
                                                session_replay_canvas_recording: t.sessionReplayCanvasRecording ? .enable,
                                                session_replay_canvas_recording_quality: t.sessionReplayCanvasRecording ? .quality,
                                                ...r
                                            }
                                        }(t, n, s)), i()
                                };
                                (0, ho.d0)() ? o(function() {
                                    let t = {
                                        id: (0, yr.l)(),
                                        isReplayForced: !1,
                                        anonymousId: void 0,
                                        createdAt: (0, hr.nx)()
                                    };
                                    return {
                                        findSession: () => t,
                                        findTrackedSession: () => t,
                                        renewObservable: new br.cP,
                                        expireObservable: new br.cP,
                                        expire: Cr.l,
                                        expandOrRenew: Cr.l,
                                        updateSessionState(e) {
                                            t = { ...t,
                                                ...e
                                            }
                                        }
                                    }
                                }()): (0, gr.B)(It)(u, r).then(t => {
                                    t && o(t)
                                }).catch(Sr.Dx)
                            })))
                        }
                        const c = new br.dX(500, t => {
                                (0, Pr.A2)("preStartRum buffer data lost", {
                                    count: t
                                })
                            }),
                            u = ot();
                        w(u, Wr, c);
                        const l = it();
                        w(l, Hr, c);
                        const d = at();
                        let f, p, h, m, g, v;
                        w(d, Gr, c);
                        const y = {
                                assembleEventDefaults: (0, Bo.ab)(),
                                assembleTelemetry: (0, Bo.ab)(),
                                assembleEvent: (0, Bo.ab)()
                            },
                            b = r.observable.subscribe(i),
                            x = {};
                        let k = !1;
                        const T = {
                            init(e, n, r, o) {
                                function i() {
                                    if (W(e)) {
                                        const t = {
                                            user: l,
                                            context: u
                                        };
                                        if (e.remoteConfigurationId || e.remoteConfiguration ? .sync)(async function(t, e) {
                                            let n;
                                            const r = B(),
                                                o = await H(t);
                                            return o.ok ? (r.increment("fetch", "success"), n = V(t, o.value, e, r)) : (r.increment("fetch", "failure"), Lr.V.error(o.error)), (0, Pr.Gk)("remote configuration metrics", {
                                                metrics: r.get()
                                            }), n
                                        })(e, t).then(t => {
                                            t && a(t, o, r)
                                        }).catch(Sr.Dx);
                                        else {
                                            const n = function(t, e) {
                                                const n = function({
                                                        remoteConfigurationId: t
                                                    }) {
                                                        const e = function(t) {
                                                            return "dd_rc_" + t
                                                        }(t);
                                                        return {
                                                            read() {
                                                                let t;
                                                                try {
                                                                    t = localStorage.getItem(e)
                                                                } catch {
                                                                    return {
                                                                        status: "error"
                                                                    }
                                                                }
                                                                if (null === t) return {
                                                                    status: "miss"
                                                                };
                                                                const n = (0, yo.XU)(t);
                                                                return void 0 === n ? (this.remove(), {
                                                                    status: "error"
                                                                }) : function(t) {
                                                                    if ("object" != typeof t || null === t) return !1;
                                                                    const e = "version" in t && 3 === t.version,
                                                                        n = "config" in t && "object" == typeof t.config && null !== t.config,
                                                                        r = "metadata" in t && (0, Dr.OE)(t.metadata) && "string" == typeof t.metadata.syncId && "number" == typeof t.metadata.lastSynced;
                                                                    return e && n && r
                                                                }(n) ? {
                                                                    status: "hit",
                                                                    config: n.config,
                                                                    metadata: n.metadata
                                                                } : (this.remove(), {
                                                                    status: "error"
                                                                })
                                                            },
                                                            remove() {
                                                                try {
                                                                    localStorage.removeItem(e)
                                                                } catch {}
                                                            },
                                                            write(t, n) {
                                                                const r = this.read();
                                                                "hit" === r.status && JSON.stringify(r.config) === JSON.stringify(t) || U(e, {
                                                                    version: 3,
                                                                    config: t,
                                                                    metadata: {
                                                                        lastModified: n,
                                                                        lastSynced: (0, hr.nx)(),
                                                                        syncId: (0, yr.l)()
                                                                    }
                                                                })
                                                            },
                                                            stampFirstApplied(t) {
                                                                if (void 0 !== t.metadata.firstApplied) return t.metadata;
                                                                const n = { ...t.metadata,
                                                                    firstApplied: (0, hr.nx)()
                                                                };
                                                                return U(e, {
                                                                    version: 3,
                                                                    config: t.config,
                                                                    metadata: n
                                                                }), n
                                                            }
                                                        }
                                                    }({
                                                        remoteConfigurationId: W(t)
                                                    }),
                                                    r = B(),
                                                    o = n.read();
                                                return r.increment("cache", Po[o.status]),
                                                    function(t, e, n) {
                                                        H(t).then(t => {
                                                            t.ok ? (n.increment("fetch", "success"), e.write(t.value, t.lastModified)) : (n.increment("fetch", "failure"), Lr.V.error(t.error))
                                                        }).catch(Sr.Dx).finally(() => {
                                                            (0, Pr.Gk)("remote configuration metrics", {
                                                                metrics: n.get()
                                                            })
                                                        })
                                                    }(t, n, r), "hit" === o.status ? {
                                                        metadata: n.stampFirstApplied(o),
                                                        initConfiguration: V(t, o.config, e, r)
                                                    } : t.remoteConfiguration ? .required ? void 0 : {
                                                        initConfiguration: t
                                                    }
                                            }(e, t);
                                            n && a(n.initConfiguration, o, r, n.metadata)
                                        }
                                    } else a(e, o, r)
                                }
                                if (!e) return void Lr.V.error("Missing configuration");
                                if ((0, co.Aq)(e.enableExperimentalFeatures), (0, Or.fK)(e.allowUntrustedEvents), h = e, t && Ot()) return;
                                const s = function(t, e) {
                                    if (!t) return !0;
                                    const n = t.map(t => t.onInit ? .(e));
                                    return n.some(Z) ? Promise.all(n).then(t => !t.includes(!1)) : !n.includes(!1)
                                }(e.plugins, {
                                    initConfiguration: e,
                                    publicApi: n,
                                    registerAssembleEventHook: y.assembleEvent.register
                                });
                                "boolean" == typeof s ? s && i() : s.then(t => {
                                    t && i()
                                }).catch(Sr.Dx)
                            },
                            get initConfiguration() {
                                return h
                            },
                            getInternalContext: Cr.l,
                            stopSession: Cr.l,
                            addTiming(t, e = (0, hr.nx)()) {
                                c.notify(n => n.addTiming(t, e))
                            },
                            setLoadingTime(t) {
                                c.notify(e => e.setLoadingTime(t))
                            },
                            startView(t, e = (0, hr.M8)()) {
                                const n = n => {
                                    n.startView(t, e)
                                };
                                c.notify(n), f || (f = {
                                    options: t,
                                    callback: n
                                }, i())
                            },
                            setViewName(t) {
                                c.notify(e => e.setViewName(t))
                            },
                            setViewContext(t) {
                                c.notify(e => e.setViewContext(t))
                            },
                            setViewContextProperty(t, e) {
                                c.notify(n => n.setViewContextProperty(t, e))
                            },
                            getViewContext: () => x,
                            globalContext: u,
                            userContext: l,
                            accountContext: d,
                            addAction(t) {
                                c.notify(e => e.addAction(t))
                            },
                            startAction(t, e) {
                                const n = (0, hr.M8)();
                                c.notify(r => r.startAction(t, e, n))
                            },
                            stopAction(t, e) {
                                const n = (0, hr.M8)();
                                c.notify(r => r.stopAction(t, e, n))
                            },
                            startResource(t, e) {
                                const n = (0, hr.M8)();
                                c.notify(r => r.startResource(t, e, n))
                            },
                            stopResource(t, e) {
                                const n = (0, hr.M8)();
                                c.notify(r => r.stopResource(t, e, n))
                            },
                            addError(t) {
                                c.notify(e => e.addError(t))
                            },
                            addFeatureFlagEvaluation(t, e) {
                                c.notify(n => n.addFeatureFlagEvaluation(t, e))
                            },
                            startDurationVital(t, e) {
                                const n = (0, hr.M8)();
                                c.notify(r => r.startDurationVital(t, e, n))
                            },
                            stopDurationVital(t, e) {
                                const n = (0, hr.M8)();
                                c.notify(r => r.stopDurationVital(t, e, n))
                            },
                            addDurationVital(t) {
                                c.notify(e => e.addDurationVital(t))
                            },
                            addOperationStepVital(t, e, n, r) {
                                c.notify(o => o.addOperationStepVital(s(t), e, s(n), s(r)))
                            }
                        };
                        return T
                    }(n, i, (r, o, i, s, u, l) => {
                        const d = i && n.createDeflateEncoder ? t => n.createDeflateEncoder(i, t) : Fr.N,
                            f = (0, gr.B)(cr)(r, o, t, e, s, d, a.observable, u, l, n.sdkName);
                        return t.onRumStart(f.lifeCycle, r, o, f.viewHistory, i, f.telemetry), e.onRumStart(f.lifeCycle, f.hooks, r, o, f.viewHistory, d), c = function(t, e) {
                                return { ...t,
                                    init(t) {
                                        _("DD_RUM", t)
                                    },
                                    getInternalContext: e.getInternalContext,
                                    stopSession: e.stopSession,
                                    getViewContext: e.getViewContext,
                                    globalContext: e.globalContext,
                                    userContext: e.userContext,
                                    accountContext: e.accountContext
                                }
                            }(c, f),
                            function(t, e) {
                                for (const n of t ? ? []) n.onRumStart ? .(e)
                            }(r.plugins, {
                                addEvent: f.addEvent,
                                addError: f.addError
                            }), f
                    });
                    const u = () => c,
                        l = (t, e) => {
                            const n = (0, $r.uC)("vital");
                            (0, Sr.um)(() => {
                                (0, Pr.Q6)({
                                    feature: "add-operation-step-vital",
                                    action_type: "start"
                                }), c.addOperationStepVital(t, "start", { ...e,
                                    handlingStack: n
                                })
                            })
                        },
                        d = (0, Sr.dm)((t, e) => {
                            (0, Pr.Q6)({
                                feature: "add-operation-step-vital",
                                action_type: "succeed"
                            }), c.addOperationStepVital(t, "end", e)
                        }),
                        f = (0, Sr.dm)((t, e, n) => {
                            (0, Pr.Q6)({
                                feature: "add-operation-step-vital",
                                action_type: "fail"
                            }), c.addOperationStepVital(t, "end", n, e)
                        }),
                        p = (0, zr.m)({
                            init(t, e) {
                                const n = Error().stack;
                                (0, Sr.um)(() => c.init(t, p, n, e))
                            },
                            setTrackingConsent: (0, Sr.dm)(t => {
                                i.update(t), (0, Pr.Q6)({
                                    feature: "set-tracking-consent",
                                    tracking_consent: t
                                })
                            }),
                            setViewName: (0, Sr.dm)(t => {
                                c.setViewName(lr(t, "view name")), (0, Pr.Q6)({
                                    feature: "set-view-name"
                                })
                            }),
                            setViewContext: (0, Sr.dm)(t => {
                                c.setViewContext(t), (0, Pr.Q6)({
                                    feature: "set-view-context"
                                })
                            }),
                            setViewContextProperty: (0, Sr.dm)((t, e) => {
                                c.setViewContextProperty(t, e), (0, Pr.Q6)({
                                    feature: "set-view-context-property"
                                })
                            }),
                            getViewContext: (0, Sr.dm)(() => ((0, Pr.Q6)({
                                feature: "set-view-context-property"
                            }), c.getViewContext())),
                            getInternalContext: (0, Sr.dm)(t => c.getInternalContext(t)),
                            getInitConfiguration: (0, Sr.dm)(() => (0, vr.Go)(c.initConfiguration)),
                            addAction(t, e) {
                                const n = (0, $r.uC)("action");
                                (0, Sr.um)(() => {
                                    c.addAction({
                                        name: s(t),
                                        context: s(e),
                                        startClocks: (0, hr.M8)(),
                                        type: oo,
                                        handlingStack: n
                                    }), (0, Pr.Q6)({
                                        feature: "add-action"
                                    })
                                })
                            },
                            startAction: (0, Sr.dm)((t, e) => {
                                (0, Pr.Q6)({
                                    feature: "start-action"
                                }), c.startAction(s(t), {
                                    type: s(e ? .type),
                                    context: s(e ? .context),
                                    actionKey: e ? .actionKey
                                })
                            }),
                            stopAction: (0, Sr.dm)((t, e) => {
                                (0, Pr.Q6)({
                                    feature: "stop-action"
                                }), c.stopAction(s(t), {
                                    type: s(e ? .type),
                                    context: s(e ? .context),
                                    actionKey: e ? .actionKey
                                })
                            }),
                            startResource: (0, Sr.dm)((t, e) => {
                                (0, Pr.Q6)({
                                    feature: "start-resource"
                                }),
                                c.startResource(s(t), {
                                    type: s(e ? .type),
                                    method: s(e ? .method),
                                    context: s(e ? .context),
                                    resourceKey: e ? .resourceKey
                                })
                            }),
                            stopResource: (0, Sr.dm)((t, e) => {
                                (0, Pr.Q6)({
                                    feature: "stop-resource"
                                }), c.stopResource(s(t), {
                                    type: s(e ? .type),
                                    statusCode: e ? .statusCode,
                                    size: e ? .size,
                                    context: s(e ? .context),
                                    resourceKey: e ? .resourceKey
                                })
                            }),
                            addError(t, e) {
                                const n = (0, $r.uC)("error");
                                (0, Sr.um)(() => {
                                    c.addError({
                                        error: t,
                                        handlingStack: n,
                                        context: s(e),
                                        startClocks: (0, hr.M8)()
                                    }), (0, Pr.Q6)({
                                        feature: "add-error"
                                    })
                                })
                            },
                            addTiming: (0, Sr.dm)((t, e) => {
                                c.addTiming(s(t), e)
                            }),
                            setViewLoadingTime: (0, Sr.dm)(() => {
                                const t = (0, hr.nx)();
                                c.setLoadingTime(t), (0, Pr.Q6)({
                                    feature: "addViewLoadingTime"
                                })
                            }),
                            setGlobalContext: b(u, Wr, Jr, "set-global-context"),
                            getGlobalContext: b(u, Wr, Kr, "get-global-context"),
                            setGlobalContextProperty: b(u, Wr, Qr, "set-global-context-property"),
                            removeGlobalContextProperty: b(u, Wr, Xr, "remove-global-context-property"),
                            clearGlobalContext: b(u, Wr, Yr, "clear-global-context"),
                            setUser: b(u, Hr, Jr, "set-user"),
                            getUser: b(u, Hr, Kr, "get-user"),
                            setUserProperty: b(u, Hr, Qr, "set-user-property"),
                            removeUserProperty: b(u, Hr, Xr, "remove-user-property"),
                            clearUser: b(u, Hr, Yr, "clear-user"),
                            setAccount: b(u, Gr, Jr, "set-account"),
                            getAccount: b(u, Gr, Kr, "get-account"),
                            setAccountProperty: b(u, Gr, Qr, "set-account-property"),
                            removeAccountProperty: b(u, Gr, Xr, "remove-account-property"),
                            clearAccount: b(u, Gr, Yr, "clear-account"),
                            startView(t) {
                                const e = (0, $r.uC)("view");
                                (0, Sr.um)(() => {
                                    const n = "object" == typeof t ? t : {
                                        name: t
                                    };
                                    c.startView({ ...n,
                                        name: lr(n.name, "view name"),
                                        service: lr(n.service, "view service"),
                                        version: lr(n.version, "view version"),
                                        handlingStack: e
                                    }), (0, Pr.Q6)({
                                        feature: "start-view"
                                    })
                                })
                            },
                            stopSession: (0, Sr.dm)(() => {
                                c.stopSession(), (0, Pr.Q6)({
                                    feature: "stop-session"
                                })
                            }),
                            addFeatureFlagEvaluation: (0, Sr.dm)((t, e) => {
                                c.addFeatureFlagEvaluation(s(t), s(e)), (0, Pr.Q6)({
                                    feature: "add-feature-flag-evaluation"
                                })
                            }),
                            getSessionReplayLink: (0, Sr.dm)(() => t.getSessionReplayLink()),
                            startSessionReplayRecording: (0, Sr.dm)(e => {
                                t.start(e), (0, Pr.Q6)({
                                    feature: "start-session-replay-recording",
                                    force: e ? .force
                                })
                            }),
                            stopSessionReplayRecording: (0, Sr.dm)(() => t.stop()),
                            addDurationVital(t, e) {
                                const n = (0, $r.uC)("vital");
                                (0, Sr.um)(() => {
                                    (0, Pr.Q6)({
                                        feature: "add-duration-vital"
                                    }), c.addDurationVital({
                                        id: (0, yr.l)(),
                                        name: s(t),
                                        type: so.DURATION,
                                        startClocks: (0, hr.jR)(e.startTime),
                                        duration: e.duration,
                                        context: s(e ? .context),
                                        description: s(e ? .description),
                                        handlingStack: n
                                    })
                                })
                            },
                            startDurationVital(t, e) {
                                const n = (0, $r.uC)("vital");
                                (0, Sr.um)(() => {
                                    (0, Pr.Q6)({
                                        feature: "start-duration-vital"
                                    }), c.startDurationVital(s(t), {
                                        vitalKey: e ? .vitalKey,
                                        context: s(e ? .context),
                                        description: s(e ? .description),
                                        handlingStack: n
                                    })
                                })
                            },
                            stopDurationVital: (0, Sr.dm)((t, e) => {
                                (0, Pr.Q6)({
                                    feature: "stop-duration-vital"
                                }), c.stopDurationVital(s(t), {
                                    vitalKey: e ? .vitalKey,
                                    context: s(e ? .context),
                                    description: s(e ? .description)
                                })
                            }),
                            startOperation: l,
                            succeedOperation: d,
                            failOperation: f,
                            startFeatureOperation: l,
                            succeedFeatureOperation: d,
                            failFeatureOperation: f,
                            DEFAULT_TRACKED_RESOURCE_HEADERS: Do
                        });
                    return p
                }

                function lr(t, e) {
                    if (void 0 !== t) {
                        if ("string" == typeof t) return s(t);
                        Lr.V.warn(`Invalid ${e} provided (expected a string, got ${typeof t}). Ignoring.`)
                    }
                }

                function dr(t, {
                    session: e,
                    viewContext: n,
                    errorType: r
                }) {
                    const o = e ? e.id : "no-session-id",
                        i = [];
                    void 0 !== r && i.push("error-type=" + r), n && (i.push("seed=" + n.id), i.push("from=" + n.startClocks.timeStamp));
                    const a = function(t) {
                        const e = t.site,
                            n = t.subdomain || function(t) {
                                switch (t.site) {
                                    case uo.NW:
                                    case uo.dV:
                                        return "app";
                                    case uo.Bb:
                                        return "dd";
                                    default:
                                        return
                                }
                            }(t);
                        return `https://${n?n+".":""}${e}`
                    }(t);
                    return `${a}${"/rum/replay/sessions/"+o}?${i.join("&")}`
                }

                function fr(t, e, n, r) {
                    const o = (0, da.sA)([(0, So.ns)(t, "profile")], t => {
                            e.notify(14, {
                                error: {
                                    message: t,
                                    source: Vr.g.AGENT,
                                    startClocks: (0, hr.M8)()
                                }
                            }), (0, Pr.A2)("Error reported to customer", {
                                "error.message": t
                            })
                        }),
                        i = n(r);
                    return {
                        async send({
                            event: t,
                            ...e
                        }) {
                            const n = new FormData,
                                r = (0, jr.s)(t);
                            if (!r) throw Error("Failed to serialize event");
                            n.append("event", new Blob([r], {
                                type: "application/json"
                            }), "event.json");
                            let a = r.length;
                            for (const [t, r] of (0, Ko.WP)(e)) {
                                const e = (0, jr.s)(r);
                                if (!e) throw Error("Failed to serialize attachment");
                                const o = await pr(i, e);
                                a += o.outputBytesCount, n.append(t, new Blob([o.output]), t)
                            }
                            o.send({
                                data: n,
                                bytesCount: a
                            })
                        }
                    }
                }

                function pr(t, e) {
                    return new Promise(n => {
                        t.write(e), t.finish(t => {
                            n(t)
                        })
                    })
                }
                n.d(e, {
                    eT: () => Ri,
                    o: () => "***",
                    $m: () => Ii,
                    NT: () => Oi,
                    Wd: () => "hidden",
                    bb: () => Zr,
                    K: () => to,
                    do: () => _i,
                    DL: () => so,
                    K$: () => sr,
                    wP: () => fr,
                    wI: () => pe,
                    PJ: () => De,
                    dT: () => $e,
                    $4: () => he,
                    Gn: () => Ln,
                    zL: () => $n,
                    dx: () => dr,
                    rf: () => Fe,
                    pB: () => Un,
                    g1: () => qn,
                    r0: () => le,
                    nS: () => ue,
                    XS: () => de,
                    p_: () => fe,
                    AB: () => ur,
                    jR: () => Le,
                    ei: () => Vt,
                    ap: () => Ue,
                    Ie: () => qe
                });
                var hr = n(8333),
                    mr = n(1864),
                    gr = n(5762),
                    vr = n(7472),
                    yr = n(3192),
                    br = n(3540);
                const wr = {
                    GRANTED: "granted",
                    NOT_GRANTED: "not-granted"
                };
                var _r = n(2128),
                    xr = n(9164),
                    Sr = n(1e3),
                    kr = n(3444),
                    Cr = n(9360),
                    Tr = n(4989),
                    Er = n(3472);
                let Ar;
                const Ir = [];
                var Or = n(449);
                let Rr;
                const Mr = new WeakMap;
                var Pr = n(7003),
                    Nr = n(7286),
                    jr = n(7637),
                    Dr = n(8307),
                    Lr = n(5648),
                    $r = n(4021),
                    qr = n(8032),
                    Ur = n(1468),
                    Vr = n(4023);
                let Br = {};
                var Fr = n(7522),
                    zr = n(5021);
                const Hr = "userContext",
                    Wr = "globalContext",
                    Gr = "accountContext",
                    Kr = "getContext",
                    Jr = "setContext",
                    Qr = "setContextProperty",
                    Xr = "removeContextProperty",
                    Yr = "clearContext",
                    Zr = {
                        ACTION: "action",
                        ERROR: "error",
                        LONG_TASK: "long_task",
                        VIEW: "view",
                        VIEW_UPDATE: "view_update",
                        RESOURCE: "resource",
                        VITAL: "vital"
                    },
                    to = {
                        LONG_TASK: "long-task",
                        LONG_ANIMATION_FRAME: "long-animation-frame"
                    },
                    eo = "initial_load",
                    no = "route_change",
                    ro = "bf_cache",
                    oo = "custom",
                    io = "error_click",
                    ao = "dead_click",
                    so = {
                        DURATION: "duration",
                        OPERATION_STEP: "operation_step",
                        WEBSOCKET: "websocket"
                    };
                var co = n(8925),
                    uo = n(8383);
                const lo = {
                        ALLOW: "allow",
                        MASK: "mask",
                        MASK_USER_INPUT: "mask-user-input",
                        MASK_UNLESS_ALLOWLISTED: "mask-unless-allowlisted"
                    },
                    fo = {
                        ALL: "all",
                        SAMPLED: "sampled"
                    },
                    po = {
                        clientToken: {
                            type: "string",
                            required: !0
                        },
                        service: {
                            type: "string"
                        },
                        env: {
                            type: "string"
                        },
                        version: {
                            type: "string"
                        },
                        site: {
                            type: "site",
                            default: uo.NW
                        },
                        proxy: {
                            type: "union",
                            variants: [{
                                type: "string"
                            }, {
                                type: "function",
                                signature: void 0
                            }]
                        },
                        sessionSampleRate: {
                            type: "percentage",
                            default: 100
                        },
                        telemetrySampleRate: {
                            type: "percentage",
                            default: 20
                        },
                        telemetryConfigurationSampleRate: {
                            type: "percentage",
                            default: 5
                        },
                        telemetryUsageSampleRate: {
                            type: "percentage",
                            default: 5
                        },
                        silentMultipleInit: {
                            type: "boolean",
                            default: !1,
                            strict: !1
                        },
                        storeContextsAcrossPages: {
                            type: "boolean",
                            default: !1,
                            strict: !1
                        },
                        trackAnonymousUser: {
                            type: "boolean",
                            default: !0,
                            strict: !1
                        },
                        useSecureSessionCookie: {
                            type: "boolean",
                            default: !1,
                            strict: !1
                        },
                        usePartitionedCrossSiteSessionCookie: {
                            type: "boolean",
                            default: !1,
                            strict: !1
                        },
                        trackSessionAcrossSubdomains: {
                            type: "boolean",
                            default: !1,
                            strict: !1
                        },
                        allowedTrackingOrigins: {
                            type: "match-option",
                            multiple: !0,
                            strict: !1
                        },
                        trackingConsent: {
                            type: "enum",
                            values: wr,
                            default: wr.GRANTED
                        },
                        beforeSend: {
                            type: "function",
                            signature: void 0
                        },
                        source: {
                            type: "enum",
                            values: ["browser", "flutter", "unity"],
                            default: "browser",
                            strict: !1
                        },
                        sessionPersistence: {
                            type: "enum",
                            values: ["cookie", "local-storage", "memory"],
                            multiple: !0,
                            strict: !1
                        },
                        replica: {
                            type: "schema",
                            schema: {
                                clientToken: {
                                    type: "string",
                                    required: !0
                                },
                                applicationId: {
                                    type: "string"
                                }
                            }
                        },
                        datacenter: {
                            type: "string"
                        },
                        sdkVersion: {
                            type: "string"
                        },
                        variant: {
                            type: "string"
                        }
                    };
                var ho = n(9305),
                    mo = n(4993),
                    go = n(6672);
                const vo = /(datadog|ddog|datad0g|dd0g)/;
                var yo = n(9056);
                const bo = /(\S+?)\s*=\s*(.*?)(?:;|$)/g;
                let wo, _o;
                var xo = n(5358),
                    So = n(5387);
                const ko = /[a-zA-Z_$]/,
                    Co = /[a-zA-Z0-9_$]/,
                    To = /[0-9]/,
                    Eo = /[a-fA-F0-9]/,
                    Ao = {
                        0: () => !1,
                        1: () => !1,
                        2: t => ko.test(t),
                        3: t => Co.test(t),
                        4: t => "." === t,
                        5: t => "[" === t,
                        6: t => "]" === t,
                        7: t => To.test(t),
                        8: t => "'\"".includes(t),
                        9: (t, e) => t === e.quote,
                        10: () => !0,
                        11: t => "\\" === t,
                        12: (t, e) => void 0 === e.escapeSequence ? (e.quote + "/\\bfnrtu").includes(t) : !!(e.escapeSequence.startsWith("u") && e.escapeSequence.length < 5) && Eo.test(t)
                    },
                    Io = {
                        0: [2, 5],
                        1: [],
                        2: [3, 4, 5, 1],
                        3: [3, 4, 5, 1],
                        4: [2],
                        5: [8, 7],
                        6: [4, 5, 1],
                        7: [7, 6],
                        8: [11, 9, 10],
                        9: [6],
                        10: [11, 9, 10],
                        11: [12],
                        12: [12, 11, 9, 10]
                    },
                    Oo = [2, 3, 7, 10],
                    Ro = [4, 5, 6],
                    Mo = {
                        '"': '"',
                        "'": "'",
                        "/": "/",
                        "\\": "\\",
                        b: "\b",
                        f: "\f",
                        n: "\n",
                        r: "\r",
                        t: "\t"
                    },
                    Po = {
                        hit: "success",
                        miss: "missing",
                        error: "failure"
                    },
                    No = ["applicationId", "service", "env", "version", "sessionSampleRate", "sessionReplaySampleRate", "telemetrySampleRate", "trackAnonymousUser", "trackUserInteractions", "trackResources", "trackLongTasks", "traceContextInjection", "actionNameAttribute", "defaultPrivacyLevel", "enablePrivacyForActionName", "traceSampleRate", "trackSessionAcrossSubdomains", "allowedTracingUrls", "allowedTrackingOrigins"],
                    jo = ["tracecontext", "datadog"],
                    Do = ["cache-control", "etag", "age", "expires", "content-type", "content-encoding", "vary", "content-length", "server-timing", "x-cache", "cf-cache-status", "x-vercel-cache"],
                    Lo = {
                        LOW: "low",
                        MEDIUM: "medium",
                        HIGH: "high"
                    },
                    $o = {
                        [Lo.LOW]: {
                            maxFramesPerSecond: 1,
                            hashingMaxDimension: 50,
                            maxImageDimension: 600,
                            encodeQuality: .3
                        },
                        [Lo.MEDIUM]: {
                            maxFramesPerSecond: 4,
                            hashingMaxDimension: 100,
                            maxImageDimension: 1e3,
                            encodeQuality: .5
                        },
                        [Lo.HIGH]: {
                            maxFramesPerSecond: 8,
                            hashingMaxDimension: 100,
                            maxImageDimension: 1280,
                            encodeQuality: .75
                        }
                    },
                    qo = { ...po,
                        applicationId: {
                            type: "string",
                            required: !0
                        },
                        actionNameAttribute: {
                            type: "string"
                        },
                        workerUrl: {
                            type: "string"
                        },
                        subdomain: {
                            type: "string"
                        },
                        sessionReplaySampleRate: {
                            type: "percentage",
                            default: 0
                        },
                        traceSampleRate: {
                            type: "percentage",
                            default: 100
                        },
                        profilingSampleRate: {
                            type: "percentage",
                            default: 0
                        },
                        compressIntakeRequests: {
                            type: "boolean",
                            default: !1
                        },
                        trackUserInteractions: {
                            type: "boolean",
                            default: !0,
                            strict: !1
                        },
                        trackResources: {
                            type: "boolean",
                            default: !0,
                            strict: !1
                        },
                        trackLongTasks: {
                            type: "boolean",
                            default: !0,
                            strict: !1
                        },
                        trackViewsManually: {
                            type: "boolean",
                            default: !1,
                            strict: !1
                        },
                        betaEnableViewUpdates: {
                            type: "boolean"
                        },
                        betaTrackWebSockets: {
                            type: "boolean",
                            default: !1,
                            strict: !1
                        },
                        enablePrivacyForActionName: {
                            type: "boolean",
                            default: !0
                        },
                        propagateTraceBaggage: {
                            type: "boolean",
                            default: !0
                        },
                        startSessionReplayRecordingManually: {
                            type: "boolean",
                            default: !1,
                            strict: !1
                        },
                        sessionReplayCanvasRecording: {
                            type: "schema",
                            schema: {
                                enable: {
                                    type: "boolean",
                                    required: !0
                                },
                                quality: {
                                    type: "enum",
                                    values: Lo,
                                    default: Lo.MEDIUM
                                }
                            }
                        },
                        defaultPrivacyLevel: {
                            type: "enum",
                            values: lo,
                            default: lo.MASK_USER_INPUT,
                            strict: !1
                        },
                        traceContextInjection: {
                            type: "enum",
                            values: fo,
                            default: fo.SAMPLED,
                            strict: !1
                        },
                        excludedActivityUrls: {
                            type: "match-option",
                            multiple: !0,
                            default: []
                        },
                        allowedTracingUrls: {
                            type: "union",
                            multiple: !0,
                            strict: !1,
                            default: [],
                            variants: [{
                                type: "match-option"
                            }, {
                                type: "schema",
                                schema: {
                                    match: {
                                        type: "match-option",
                                        required: !0
                                    },
                                    propagatorTypes: {
                                        type: "enum",
                                        values: ["datadog", "b3", "b3multi", "tracecontext"],
                                        multiple: !0,
                                        strict: !1,
                                        default: jo
                                    }
                                }
                            }]
                        },
                        plugins: {
                            type: "schema",
                            multiple: !0,
                            strict: !1,
                            default: [],
                            schema: {
                                name: {
                                    type: "string",
                                    required: !0
                                },
                                getConfigurationTelemetry: {
                                    type: "function",
                                    strict: !1,
                                    signature: void 0
                                },
                                onInit: {
                                    type: "function",
                                    strict: !1,
                                    signature: void 0
                                },
                                onRumStart: {
                                    type: "function",
                                    strict: !1,
                                    signature: void 0
                                }
                            }
                        },
                        trackFeatureFlagsForEvents: {
                            type: "enum",
                            values: ["vital", "action", "long_task", "resource"],
                            multiple: !0,
                            strict: !1,
                            default: []
                        }
                    },
                    Uo = ["request", "response", "any"],
                    Vo = [];
                var Bo = n(5119);
                const Fo = ["chrome-extension://", "moz-extension://"];
                var zo = n(3935),
                    Ho = n(8975),
                    Wo = n(2511),
                    Go = n(4215),
                    Ko = n(8424),
                    Jo = n(603);
                const Qo = /^([a-zA-Z]+)=([a-z0-9-]+)$/,
                    Xo = "_dd_s_v2";
                let Yo;
                const Zo = "_DD_SESSION",
                    ti = 12 * hr.MA;
                let ei = [];
                const ni = "datadog-synthetics-",
                    ri = ni + "public-id",
                    oi = ni + "result-id",
                    ii = ni + "injects-rum",
                    ai = ni + "rum-context";
                var si = n(350),
                    ci = n(6448);
                const ui = "_dd_tab_id";
                let li;
                var di = n(8780);
                const fi = class {
                        constructor() {
                            this.callbacks = {}
                        }
                        notify(t, e) {
                            const n = this.callbacks[t];
                            n && n.forEach(t => t(e))
                        }
                        subscribe(t, e) {
                            return this.callbacks[t] || (this.callbacks[t] = []), this.callbacks[t].push(e), {
                                unsubscribe: () => {
                                    this.callbacks[t] = this.callbacks[t].filter(t => e !== t)
                                }
                            }
                        }
                    },
                    pi = Jo.AQ,
                    hi = "fetch",
                    mi = "other",
                    gi = hi,
                    vi = [
                        ["document", t => "navigation" === t],
                        ["xhr", t => "xmlhttprequest" === t],
                        [hi, t => "fetch" === t],
                        ["beacon", t => "beacon" === t],
                        ["css", (t, e) => /\.css$/i.test(e)],
                        ["js", (t, e) => /\.js$/i.test(e)],
                        ["image", (t, e) => ["image", "img", "icon"].includes(t) || null !== /\.(gif|jpg|jpeg|tiff|png|svg|ico)$/i.exec(e)],
                        ["font", (t, e) => null !== /\.(woff|eot|woff2|ttf)$/i.exec(e)],
                        ["media", (t, e) => ["audio", "video"].includes(t) || null !== /\.(mp3|mp4)$/i.exec(e)]
                    ],
                    yi = /data:(.+)?(;base64)?,/g;
                let bi, wi = 1;
                var _i;
                let xi;
                ! function(t) {
                    t.EVENT = "event", t.FIRST_INPUT = "first-input", t.LARGEST_CONTENTFUL_PAINT = "largest-contentful-paint", t.LAYOUT_SHIFT = "layout-shift", t.LONG_TASK = "longtask", t.LONG_ANIMATION_FRAME = "long-animation-frame", t.NAVIGATION = "navigation", t.PAINT = "paint", t.RESOURCE = "resource", t.SOFT_NAVIGATION = "soft-navigation", t.INTERACTION_CONTENTFUL_PAINT = "interaction-contentful-paint", t.VISIBILITY_STATE = "visibility-state"
                }(_i || (_i = {}));
                const Si = "data-dd-excluded-activity-mutations",
                    ki = "data-dd-action-name",
                    Ci = "Masked Element",
                    Ti = [ki, "data-testid", "data-test", "data-qa", "data-cy", "data-test-id", "data-qa-id", "data-testing", "data-component", "data-element", "data-source-file"],
                    Ei = [Ee, Ce],
                    Ai = [Ee, function(t) {
                        if ("BODY" === t.tagName) return;
                        const e = t.classList;
                        for (let n = 0; n < e.length; n += 1) {
                            const r = e[n];
                            if (!ke(r)) return `${CSS.escape(t.tagName)}.${CSS.escape(r)}`
                        }
                    }, Te],
                    Ii = {
                        IGNORE: "ignore",
                        HIDDEN: "hidden",
                        ALLOW: lo.ALLOW,
                        MASK: lo.MASK,
                        MASK_USER_INPUT: lo.MASK_USER_INPUT,
                        MASK_UNLESS_ALLOWLISTED: lo.MASK_UNLESS_ALLOWLISTED
                    },
                    Oi = "data-dd-privacy",
                    Ri = "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
                    Mi = {
                        INPUT: !0,
                        OUTPUT: !0,
                        TEXTAREA: !0,
                        SELECT: !0,
                        OPTION: !0,
                        DATALIST: !0,
                        OPTGROUP: !0
                    },
                    Pi = ["HTML", "BODY"],
                    Ni = 2048,
                    ji = Ti.concat(["role", "type", "disabled", "readonly", "tabindex", "draggable", "target", "rel", "download", "method", "action", "enctype", "autocomplete"]),
                    Di = ["aria-label", "name", "title", "alt"],
                    Li = [(t, e, n) => {
                        if ("labels" in t && t.labels && t.labels.length > 0) return nn(t.labels[0], e, n)
                    }, t => {
                        if ("INPUT" === t.nodeName) {
                            const e = t,
                                n = e.getAttribute("type");
                            if ("button" === n || "submit" === n || "reset" === n) return {
                                name: e.value,
                                nameSource: "text_content"
                            }
                        }
                    }, (t, e, n) => {
                        if ("BUTTON" === t.nodeName || "LABEL" === t.nodeName || "A" === t.nodeName || "button" === t.getAttribute("role") || "link" === t.getAttribute("role")) return nn(t, e, n)
                    }, (t, e, n) => en(t, "aria-label", e, n), (t, e, n) => {
                        const r = t.getAttribute("aria-labelledby");
                        if (r) return {
                            name: r.split(/\s+/).map(e => function(t, e) {
                                const n = t.getRootNode();
                                if (n instanceof ShadowRoot) {
                                    const t = n.getElementById(e);
                                    if (t) return t
                                }
                                return t.ownerDocument ? t.ownerDocument.getElementById(e) : null
                            }(t, e)).filter(t => !!t).map(t => rn(t, e, n)).join(" "),
                            nameSource: "text_content"
                        }
                    }, (t, e, n) => en(t, "alt", e, n), (t, e, n) => en(t, "name", e, n), (t, e, n) => en(t, "title", e, n), (t, e, n) => en(t, "placeholder", e, n), (t, e, n) => {
                        if ("options" in t && t.options.length > 0) return nn(t.options[0], e, n)
                    }],
                    $i = [(t, e, n) => nn(t, e, n)],
                    qi = new Map,
                    Ui = "csp_violation";
                var Vi = n(7922),
                    Bi = n(7409);
                const Fi = /(token|cookie|secret|authorization|(api|secret|access|app).?key|(client|connecting|real).?ip|forwarded)/,
                    zi = t => Do.includes(t),
                    Hi = (t, e) => t * e,
                    Wi = t => Hi(t.previousRect.width, t.previousRect.height) + Hi(t.currentRect.width, t.currentRect.height) - ((t, e) => {
                        const n = Math.max(t.left, e.left),
                            r = Math.max(t.top, e.top),
                            o = Math.min(t.right, e.right),
                            i = Math.min(t.bottom, e.bottom);
                        return n >= o || r >= i ? 0 : Hi(o - n, i - r)
                    })(t.previousRect, t.currentRect);
                let Gi, Ki = 0,
                    Ji = 1 / 0,
                    Qi = 0;
                const Xi = () => Gi ? Ki : window.performance.interactionCount || 0;
                let Yi;
                var Zi = n(6625);
                const ta = Jo.AQ,
                    ea = Jo.AQ;
                let na, ra;
                const oa = Jo.AQ,
                    ia = "datadog-ci-visibility-test-execution-id";
                var aa = n(98);
                const sa = {
                        "view.name": "string",
                        "view.url": "string",
                        "view.referrer": "string",
                        context: "object",
                        service: "string",
                        version: "string"
                    },
                    ca = {
                        [Zr.VIEW]: { ...sa,
                            "view.performance.lcp.resource_url": "string"
                        },
                        [Zr.ERROR]: { ...sa,
                            "error.message": "string",
                            "error.stack": "string",
                            "error.handling_stack": "string",
                            "error.resource.url": "string",
                            "error.fingerprint": "string",
                            "_dd.debug_ids": "array"
                        },
                        [Zr.RESOURCE]: { ...sa,
                            "resource.url": "string",
                            "resource.graphql.variables": "string",
                            "resource.request.headers": "object",
                            "resource.response.headers": "object"
                        },
                        [Zr.ACTION]: { ...sa,
                            "action.target.name": "string"
                        },
                        [Zr.LONG_TASK]: { ...sa,
                            "long_task.scripts[].source_url": "string",
                            "long_task.scripts[].invoker": "string",
                            "_dd.debug_ids": "array"
                        },
                        [Zr.VITAL]: { ...sa,
                            "vital.websocket.url": "string",
                            "vital.websocket.requested_protocols": "array",
                            "vital.websocket.selected_protocol": "string",
                            "vital.websocket.close_reason": "string"
                        }
                    };
                var ua = n(64);
                const la = [Zr.ACTION, Zr.ERROR, Zr.LONG_TASK, Zr.RESOURCE, Zr.VITAL];
                var da = n(1776)
            },
            5119(t, e, n) {
                function r() {
                    let t = [];
                    return {
                        register: e => (t.push(e), {
                            unregister() {
                                t = t.filter(t => t !== e)
                            }
                        }),
                        trigger(e) {
                            const n = [];
                            for (const r of t) {
                                const t = r(e);
                                if (t === i) return i;
                                t !== a && n.push(t)
                            }
                            return (0, o.kg)(...n)
                        }
                    }
                }
                n.d(e, {
                    ab: () => r
                });
                var o = n(7472);
                const i = "DISCARDED",
                    a = "SKIPPED";
                n.d(e, ["$O", 0, a, "ug", 0, i])
            },
            449(t, e, n) {
                function r(t, e, n, r) {
                    return o(t, [e], n, r)
                }

                function o(t, e, n, {
                    once: r,
                    capture: o,
                    passive: i
                } = {}) {
                    function a() {
                        const n = (0, c.W)(f, "removeEventListener");
                        e.forEach(e => n.call(t, e, u, d))
                    }
                    const u = (0, s.dm)(t => {
                            (t.isTrusted || t.__ddIsTrusted || !1 !== l) && (r && a(), n(t))
                        }),
                        d = i ? {
                            capture: o,
                            passive: i
                        } : o,
                        f = window.EventTarget && t instanceof EventTarget ? window.EventTarget.prototype : t,
                        p = (0, c.W)(f, "addEventListener");
                    return e.forEach(e => p.call(t, e, u, d)), {
                        stop: a
                    }
                }

                function i(t, e) {
                    if (!t) return !1;
                    try {
                        return r(t, e, u.l).stop(), !0
                    } catch {
                        return !1
                    }
                }

                function a(t) {
                    !0 !== l && (l = t ? ? !1)
                }
                n.d(e, {
                    BX: () => i,
                    fK: () => a,
                    lQ: () => o,
                    q2: () => r
                });
                var s = n(1e3),
                    c = n(9211),
                    u = n(9360);
                let l
            },
            8780(t, e, n) {
                function r() {
                    const t = o();
                    return new s.cP(e => {
                        const n = new t((0, i.dm)(t => e.notify(t)));
                        return n.observe(document, {
                            attributes: !0,
                            characterData: !0,
                            childList: !0,
                            subtree: !0
                        }), () => n.disconnect()
                    })
                }

                function o() {
                    let t;
                    const e = window;
                    if (e.Zone && (t = (0, c.W)(e, "MutationObserver"), e.MutationObserver && t === e.MutationObserver)) {
                        const n = new e.MutationObserver(a.l),
                            r = (0, c.W)(n, "originalInstance");
                        t = r ? .constructor
                    }
                    return t || (t = e.MutationObserver), t
                }
                n.d(e, {
                    W: () => o,
                    l: () => r
                });
                var i = n(1e3),
                    a = n(9360),
                    s = n(3540),
                    c = n(9211)
            },
            5358(t, e, n) {
                function r(t, e) {
                    return (0, i.W)(o.J, "fetch")(t, e)
                }
                n.d(e, {
                    h: () => r
                });
                var o = n(2128),
                    i = n(9211)
            },
            1e3(t, e, n) {
                function r(t) {
                    return !a && (a = t, !0)
                }
                n.d(e, {
                    Bd: () => r
                });
                var o = n(1864),
                    i = n(8789);
                let a;
                const s = function(t, e) {
                        function n(t) {
                            return function(...e) {
                                return r(t, this, e)
                            }
                        }

                        function r(t, e, n) {
                            try {
                                return t.apply(e, n)
                            } catch (t) {
                                o(t)
                            }
                        }

                        function o(n) {
                            const r = e => {
                                (0, i.N)() && t.error("[MONITOR]", e)
                            };
                            r(n);
                            try {
                                e(n)
                            } catch (n) {
                                r(n)
                            }
                        }
                        return {
                            monitored(t, e, r) {
                                r.value = n(r.value)
                            },
                            monitor: n,
                            callMonitored: r,
                            monitorError: o
                        }
                    }((0, o.XH)("Datadog SDK:"), t => a ? .(t)),
                    c = s.monitor,
                    u = s.callMonitored,
                    l = s.monitorError;
                n.d(e, ["Dx", 0, l, "dm", 0, c, "um", 0, u])
            },
            8333(t, e, n) {
                function r() {
                    return (new Date).getTime()
                }

                function o() {
                    return r()
                }

                function i(t, e) {
                    return e - t
                }

                function a(t) {
                    return "number" != typeof t ? t : Math.round(1e6 * t)
                }

                function s(t, e) {
                    return t + e
                }

                function c() {
                    return performance.now()
                }

                function u() {
                    return {
                        relative: c(),
                        timeStamp: o()
                    }
                }

                function l() {
                    return {
                        relative: 0,
                        timeStamp: g()
                    }
                }

                function d(t) {
                    return {
                        relative: t,
                        timeStamp: v(t)
                    }
                }

                function f(t) {
                    return {
                        relative: p(t),
                        timeStamp: t
                    }
                }

                function p(t) {
                    return t - g()
                }

                function h(t) {
                    return t < y
                }

                function m() {
                    return Math.round(r() - s(g(), performance.now()))
                }

                function g() {
                    return void 0 === b && (b = performance.timing ? .navigationStart ? ? Math.floor(performance.timeOrigin)), b
                }

                function v(t) {
                    const e = r() - performance.now();
                    return e > g() ? Math.round(s(e, t)) : function(t) {
                        return Math.round(s(g(), t))
                    }(t)
                }
                n.d(e, {
                    $S: () => c,
                    A3: () => h,
                    FR: () => d,
                    Gw: () => s,
                    M8: () => u,
                    Oc: () => l,
                    Zj: () => a,
                    _O: () => m,
                    d6: () => p,
                    jR: () => f,
                    nx: () => o,
                    uc: () => g,
                    vk: () => i,
                    x3: () => r
                });
                const y = 31536e6;
                let b;
                n.d(e, ["$H", 0, y, "MA", 0, 36e5])
            },
            5387(t, e, n) {
                function r(t, e, n) {
                    return {
                        build: (r, o) => i({
                            proxy: t.proxy,
                            site: t.site,
                            path: "/api/v2/" + e,
                            parameters: a(t, e, r, o, n)
                        }),
                        trackType: e
                    }
                }

                function o({
                    replica: t,
                    proxy: e,
                    source: n
                }, o) {
                    if (t) return r({
                        clientToken: t.clientToken,
                        proxy: e,
                        source: n,
                        site: l.NW
                    }, o, "rum" === o ? ["application.id=" + t.applicationId] : void 0)
                }

                function i({
                    proxy: t,
                    site: e = l.NW,
                    path: n,
                    parameters: r = "",
                    subdomain: o
                }) {
                    let i = n;
                    if (r && (i += "?" + r), "string" == typeof t) {
                        let e = `${(0,c.l2)(t)}?ddforward=${encodeURIComponent(i)}`;
                        return o && (e += "&ddforwardSubdomain=" + o), e
                    }
                    if ("function" == typeof t) return t({
                        path: n,
                        parameters: r,
                        subdomain: o
                    });
                    const a = e.split("."),
                        s = a.pop();
                    let u = `browser-intake-${a.join("-")}.${s}`;
                    return o && (u = `${o}.${u}`), `https://${u}${i}`
                }

                function a({
                    clientToken: t,
                    source: e = "browser"
                }, n, r, {
                    retry: o,
                    encoding: i
                }, a = []) {
                    const c = ["ddsource=" + e, "dd-api-key=" + t, "dd-evp-origin-version=" + encodeURIComponent("7.17.0"), "dd-evp-origin=browser", "dd-request-id=" + (0, u.l)()].concat(a);
                    return i && c.push("dd-evp-encoding=" + i), "rum" === n && (c.push("batch_time=" + (0, s.nx)(), "_dd.api=" + r), o && c.push("_dd.retry_count=" + o.count, "_dd.retry_after=" + o.lastFailureStatus)), c.join("&")
                }
                n.d(e, {
                    Hg: () => i,
                    np: () => o,
                    ns: () => r
                });
                var s = n(8333),
                    c = n(9164),
                    u = n(3192),
                    l = n(8383)
            },
            8383(t, e, n) {
                function r(t) {
                    return o.every(e => t.includes(e))
                }
                n.d(e, {
                    wo: () => r
                });
                const o = ["ddsource", "dd-api-key", "dd-request-id"];
                n.d(e, ["Bb", 0, "datad0g.com", "KG", 0, "us2.ddog-gov.com", "NW", 0, "datadoghq.com", "R8", 0, "ddog-gov.com", "dV", 0, "datadoghq.eu"])
            },
            4989(t, e, n) {
                function r(t) {
                    return i.test(t) ? (new TextEncoder).encode(t).length : t.length
                }

                function o(t) {
                    if (1 === t.length) return t[0];
                    const e = t.reduce((t, e) => t + e.length, 0),
                        n = new Uint8Array(e);
                    let r = 0;
                    for (const e of t) n.set(e, r), r += e.length;
                    return n
                }
                n.d(e, {
                    WW: () => r,
                    wh: () => o
                });
                const i = /[^\u0000-\u007F]/;
                n.d(e, ["iH", 0, 1048576])
            },
            8789(t, e, n) {
                function r(t) {
                    i = t
                }

                function o() {
                    return i
                }
                n.d(e, {
                    N: () => o,
                    p: () => r
                });
                let i = !1
            },
            1864(t, e, n) {
                function r(t) {
                    return {
                        debug: i.debug.bind(o, t),
                        log: i.log.bind(o, t),
                        info: i.info.bind(o, t),
                        warn: i.warn.bind(o, t),
                        error: i.error.bind(o, t)
                    }
                }
                n.d(e, {
                    XH: () => r
                });
                const o = console,
                    i = {
                        log: o.log,
                        debug: o.debug,
                        info: o.info,
                        warn: o.warn,
                        error: o.error
                    };
                n.d(e, ["JZ", 0, o, "bP", 0, {
                    log: "log",
                    debug: "debug",
                    info: "info",
                    warn: "warn",
                    error: "error"
                }, "fH", 0, "https://docs.datadoghq.com", "xG", 0, "More details:"])
            },
            3935(t, e, n) {
                function r(t, e, n) {
                    const r = void 0 === n ? .leading || n.leading,
                        i = void 0 === n ? .trailing || n.trailing;
                    let a, s, c = !1;
                    return {
                        throttled(...n) {
                            c ? a = n : (r ? t(...n) : a = n, c = !0, s = (0, o.wg)(() => {
                                i && a && t(...a), c = !1, a = void 0
                            }, e))
                        },
                        cancel() {
                            (0, o.DJ)(s), c = !1, a = void 0
                        }
                    }
                }
                n.d(e, {
                    n: () => r
                });
                var o = n(8975)
            },
            9211(t, e, n) {
                function r(t, e) {
                    const n = o.J;
                    let r;
                    return n.Zone && "function" == typeof n.Zone.__symbol__ && (r = t[n.Zone.__symbol__(e)]), r || (r = t[e]), r
                }
                n.d(e, {
                    W: () => r
                });
                var o = n(2128)
            },
            2128(t, e, n) {
                const r = globalThis,
                    o = "WorkerGlobalScope" in r;
                n.d(e, ["J", 0, r, "W", 0, o])
            },
            7637(t, e, n) {
                function r(t, e, n) {
                    if ("object" != typeof t || null === t) return JSON.stringify(t);
                    const r = o(Object.prototype),
                        i = o(Array.prototype),
                        a = o(Object.getPrototypeOf(t)),
                        s = o(t);
                    try {
                        return JSON.stringify(t, e, n)
                    } catch {
                        return "<error: unable to serialize object>"
                    } finally {
                        r(), i(), a(), s()
                    }
                }

                function o(t) {
                    const e = t,
                        n = e.toJSON;
                    return n ? (delete e.toJSON, () => {
                        e.toJSON = n
                    }) : i
                }

                function i() {}
                n.d(e, {
                    M: () => o,
                    s: () => r
                })
            },
            7472(t, e, n) {
                function r(t, e) {
                    return o(t, e, function() {
                        const t = new WeakSet;
                        return {
                            hasAlreadyBeenSeen(e) {
                                const n = t.has(e);
                                return n || t.add(e), n
                            }
                        }
                    }())
                }

                function o(t, e, n) {
                    if (void 0 === e) return t;
                    if ("object" != typeof e || null === e) return e;
                    if (e instanceof Date) return new Date(e.getTime());
                    if (e instanceof RegExp) return RegExp(e.source, e.flags);
                    if (n.hasAlreadyBeenSeen(e)) return;
                    if (Array.isArray(e)) {
                        const r = Array.isArray(t) ? t : [];
                        for (let t = 0; t < e.length; ++t) r[t] = o(r[t], e[t], n);
                        return r
                    }
                    const r = "object" === (0, s.Pw)(t) ? t : {};
                    for (const t in e) Object.prototype.hasOwnProperty.call(e, t) && "__proto__" !== t && (r[t] = o(r[t], e[t], n));
                    return r
                }

                function i(t) {
                    return r(void 0, t)
                }

                function a(...t) {
                    let e;
                    for (const n of t) null != n && (e = r(e, n));
                    return e
                }
                n.d(e, {
                    Go: () => i,
                    kg: () => a
                });
                var s = n(8307)
            },
            5762(t, e, n) {
                function r(t) {
                    return t
                }
                n.d(e, {
                    B: () => r
                }), new Map
            },
            9360(t, e, n) {
                function r() {}
                n.d(e, {
                    l: () => r
                })
            },
            3540(t, e, n) {
                function r(t) {
                    const e = a.J.queueMicrotask;
                    "function" == typeof e ? e((0, i.dm)(t)) : Promise.resolve().then((0, i.dm)(t))
                }

                function o(...t) {
                    return new s(e => {
                        const n = t.map(t => t.subscribe(t => e.notify(t)));
                        return () => n.forEach(t => t.unsubscribe())
                    })
                }
                n.d(e, {
                    dX: () => c,
                    cP: () => s,
                    Fx: () => o
                });
                var i = n(1e3),
                    a = n(2128);
                class s {
                    constructor(t) {
                        this.onFirstSubscribe = t, this.observers = []
                    }
                    subscribe(t) {
                        return this.addObserver(t), {
                            unsubscribe: () => this.removeObserver(t)
                        }
                    }
                    notify(t) {
                        this.observers.forEach(e => e(t))
                    }
                    addObserver(t) {
                        this.observers.push(t), 1 === this.observers.length && this.onFirstSubscribe && (this.onLastUnsubscribe = this.onFirstSubscribe(this) || void 0)
                    }
                    removeObserver(t) {
                        this.observers = this.observers.filter(e => t !== e), !this.observers.length && this.onLastUnsubscribe && this.onLastUnsubscribe()
                    }
                }
                class c extends s {
                    constructor(t, e) {
                        super(), this.maxBufferSize = t, this.onDrop = e, this.buffer = [], this.droppedCount = 0
                    }
                    notify(t) {
                        this.buffer.push(t), this.buffer.length > this.maxBufferSize && (this.buffer.shift(), this.droppedCount++), super.notify(t)
                    }
                    subscribe(t) {
                        let e = !1;
                        const n = {
                            unsubscribe: () => {
                                e = !0, this.removeObserver(t)
                            }
                        };
                        return r(() => {
                            for (const n of this.buffer) {
                                if (e) return;
                                t(n)
                            }
                            e || this.addObserver(t)
                        }), n
                    }
                    unbuffer() {
                        r(() => {
                            this.droppedCount > 0 && this.onDrop && this.onDrop(this.droppedCount), this.maxBufferSize = this.buffer.length = 0
                        })
                    }
                }
            },
            3192(t, e, n) {
                function r() {
                    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, o)
                }

                function o(t) {
                    return (parseInt(t, 10) ^ 16 * Math.random() >> parseInt(t, 10) / 4).toString(16)
                }
                n.d(e, {
                    l: () => r
                })
            },
            8975(t, e, n) {
                function r(t, e) {
                    return (0, u.W)(c.J, "setTimeout")((0, s.dm)(t), e)
                }

                function o(t) {
                    (0, u.W)(c.J, "clearTimeout")(t)
                }

                function i(t, e) {
                    return (0, u.W)(c.J, "setInterval")((0, s.dm)(t), e)
                }

                function a(t) {
                    (0, u.W)(c.J, "clearInterval")(t)
                }
                n.d(e, {
                    DJ: () => o,
                    vG: () => a,
                    wg: () => r,
                    yb: () => i
                });
                var s = n(1e3),
                    c = n(2128),
                    u = n(9211)
            },
            8307(t, e, n) {
                function r(t) {
                    return null === t ? "null" : Array.isArray(t) ? "array" : typeof t
                }

                function o(t) {
                    return "object" === r(t)
                }

                function i(t) {
                    return "number" == typeof t && t >= 0 && t <= 100
                }

                function a(t) {
                    return "string" == typeof t || t instanceof RegExp || "function" == typeof t
                }
                n.d(e, {
                    OE: () => o,
                    Pw: () => r,
                    Vl: () => a,
                    fp: () => i
                })
            },
            9164(t, e, n) {
                function r(t) {
                    return a(t, s.J.document ? .baseURI ? ? s.J.location ? .href).href
                }

                function o(t) {
                    try {
                        return !!a(t)
                    } catch {
                        return !1
                    }
                }

                function i(t) {
                    const e = a(t).pathname;
                    return "/" === e[0] ? e : "/" + e
                }

                function a(t, e) {
                    const n = function() {
                        if (!c) {
                            let t = !1;
                            try {
                                t = "http://a/b" === new s.J.URL("b", "http://a").href
                            } catch {}
                            c = t ? s.J.URL : function() {
                                if (!u) {
                                    let t, e;
                                    try {
                                        t = document.createElement("iframe"), t.style.display = "none", document.body.appendChild(t), e = t.contentWindow ? ? s.J
                                    } catch {
                                        e = s.J
                                    }
                                    u = {
                                        URL: e.URL
                                    }, t ? .remove()
                                }
                                return u
                            }().URL
                        }
                        return c
                    }();
                    try {
                        return void 0 !== e ? new n(t, e) : new n(t)
                    } catch (t) {
                        throw Error("Failed to construct URL: " + t)
                    }
                }
                n.d(e, {
                    AY: () => o,
                    L2: () => i,
                    c$: () => a,
                    l2: () => r
                });
                var s = n(2128);
                let c, u
            },
            2300(t, e, n) {
                function r(t) {
                    return u(t).segments_count
                }

                function o(t) {
                    u(t).segments_count += 1
                }

                function i(t) {
                    u(t).records_count += 1
                }

                function a(t) {
                    u(t).resources_count += 1
                }

                function s(t, e) {
                    u(t).segments_total_raw_size += e
                }

                function c(t) {
                    return l ? .get(t)
                }

                function u(t) {
                    let e;
                    return l || (l = new Map), l.has(t) ? e = l.get(t) : (e = {
                        records_count: 0,
                        resources_count: 0,
                        segments_count: 0,
                        segments_total_raw_size: 0
                    }, l.set(t, e), l.size > 1e3 && function() {
                        if (!l) return;
                        const t = l.keys().next().value;
                        t && l.delete(t)
                    }()), e
                }
                let l;
                n.d(e, {
                    $1: () => i,
                    H5: () => o,
                    K_: () => r,
                    L7: () => s,
                    Mt: () => a,
                    lv: () => c
                })
            }
        };
        const m = {};
        t.m = h, t.d = (e, n) => {
            if (Array.isArray(n))
                for (var r = 0; r < n.length;) {
                    var o = n[r++],
                        i = n[r++],
                        a = 0 === i ? {
                            enumerable: !0,
                            value: n[r++]
                        } : {
                            enumerable: !0,
                            get: i
                        };
                    t.o(e, o) || Object.defineProperty(e, o, a)
                } else
                    for (var o in n) t.o(n, o) && !t.o(e, o) && Object.defineProperty(e, o, {
                        enumerable: !0,
                        get: n[o]
                    })
        }, t.f = {}, t.e = e => {
            const n = [];
            return t.f.j(e, n), Promise.all(n)
        }, t.u = t => "chunks/" + t + "-" + {
            datadogRecorder: "ab4cf72230c104639163",
            datadogProfiler: "fdeb0f045d7448340a55"
        }[t] + "-datadog-rum.js", t.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), (() => {
            const e = {
                    main: 0
                },
                n = n => {
                    let {
                        __webpack_esm_ids__: r,
                        __webpack_esm_modules__: o,
                        __webpack_esm_runtime__: i
                    } = n;
                    var a, s, c = 0;
                    for (a in o) t.o(o, a) && (t.m[a] = o[a]);
                    for (i && i(t); c < r.length; c++) s = r[c], t.o(e, s) && e[s] && e[s][0](), e[s] = 0
                };
            t.f.j = (r, o) => {
                let i = t.o(e, r) ? e[r] : void 0;
                if (0 !== i)
                    if (i) o.push(i[1]);
                    else {
                        let a =
                            import ("./" + t.u(r)).then(n, t => {
                                throw 0 !== e[r] && (e[r] = void 0), t
                            });
                        a = Promise.race([a, new Promise(t => i = e[r] = [t])]), o.push(i[1] = a)
                    }
            }
        })();
        var g = t(2128),
            v = t(5021),
            y = t(4539),
            b = t(9360),
            w = t(9305),
            _ = t(2300),
            x = t(4989),
            S = t(449),
            k = t(5648),
            C = t(7003),
            T = t(5762),
            E = t(8975),
            A = t(1864);
        const I = new Map;
        var O = t(1e3),
            R = t(7409),
            M = t(3540),
            P = t(8333),
            N = t(4215),
            j = t(5119);
        const D = function() {
                if ((0, w.d0)() && !(0, w.Ww)("records")) return {
                    start: b.l,
                    stop: b.l,
                    getReplayStats() {},
                    onRumStart: b.l,
                    isRecording: () => !1,
                    getSessionReplayLink() {}
                };
                let {
                    strategy: t,
                    shouldStartImmediately: n
                } = function() {
                    let t = 0;
                    return {
                        strategy: {
                            start() {
                                t = 1
                            },
                            stop() {
                                t = 2
                            },
                            isRecording: () => !1,
                            getSessionReplayLink: b.l
                        },
                        shouldStartImmediately: e => 1 === t || 0 === t && !e.startSessionReplayRecordingManually
                    }
                }();
                return {
                    start: e => t.start(e),
                    stop: () => t.stop(),
                    getSessionReplayLink: () => t.getSessionReplayLink(),
                    onRumStart(r, o, a, s, u, d) {
                        let f;
                        t = function(t, e, n, r, o, i) {
                            function a(e) {
                                const r = n.findTrackedSession(),
                                    o = r ? (0, y.K$)(r, t) : void 0;
                                if (! function(t, e) {
                                        return void 0 !== t && (0 !== t || e ? .force)
                                    }(o, e)) return void(d = 1);
                                if (function(t) {
                                        return 2 === t || 3 === t
                                    }(d)) return;
                                d = 2;
                                const i = function(t, e) {
                                    return e && e.force && 0 === t
                                }(o, e) || !1;
                                p(i).catch(O.Dx), i && n.updateSessionState({
                                    forcedReplay: "1"
                                })
                            }

                            function s() {
                                3 === d && u ? .(), d = 0
                            }
                            let u, d = 0;
                            e.subscribe(9, () => {
                                2 !== d && 3 !== d || (s(), d = 1)
                            }), e.subscribe(10, () => {
                                1 === d && a()
                            });
                            const f = new M.cP;
                            ! function(t, e) {
                                if (!t.metricsEnabled) return {
                                    stop: b.l
                                };
                                let n, r, o;
                                const {
                                    unsubscribe: i
                                } = e.subscribe(t => {
                                    switch (t.type) {
                                        case "start":
                                            n = {
                                                forced: t.forced,
                                                timestamp: (0, P.nx)()
                                            }, r = void 0, o = void 0;
                                            break;
                                        case "document-ready":
                                            n && (r = (0, P.vk)(n.timestamp, (0, P.nx)()));
                                            break;
                                        case "recorder-settled":
                                            n && (o = (0, P.vk)(n.timestamp, (0, P.nx)()));
                                            break;
                                        case "aborted":
                                        case "deflate-encoder-load-failed":
                                        case "recorder-load-failed":
                                        case "succeeded":
                                            i(), n && (0, C.Gk)("Recorder init metrics", {
                                                metrics: (e = n.forced, a = o, s = (0, P.vk)(n.timestamp, (0, P.nx)()), c = t.type, u = r, {
                                                    forced: e,
                                                    loadRecorderModuleDuration: a,
                                                    recorderInitDuration: s,
                                                    result: c,
                                                    waitForDocReadyDuration: u
                                                })
                                            })
                                    }
                                    var e, a, s, c, u
                                })
                            }(i, f);
                            const p = async a => {
                                f.notify({
                                    type: "start",
                                    forced: a
                                });
                                const [s] = await Promise.all([l(f, {
                                    type: "recorder-settled"
                                }, c()), l(f, {
                                    type: "document-ready"
                                }, (0, R.N)("interactive"))]);
                                if (2 !== d) return void f.notify({
                                    type: "aborted"
                                });
                                if (!s) return d = 0, void f.notify({
                                    type: "recorder-load-failed"
                                });
                                const p = o();
                                if (!p) return d = 0, void f.notify({
                                    type: "deflate-encoder-load-failed"
                                });
                                ({
                                    stop: u
                                } = s(e, t, n, r, p, i)), d = 3, f.notify({
                                    type: "succeeded"
                                })
                            };
                            return {
                                start: a,
                                stop: s,
                                getSessionReplayLink: () => function(t, e, n, r) {
                                    const o = e.findTrackedSession(),
                                        i = function(t, e, n) {
                                            return e ? 0 === (0, y.K$)(e, t) ? "incorrect-session-plan" : n ? void 0 : "replay-not-started" : "rum-not-tracked"
                                        }(t, o, r),
                                        a = n.findView();
                                    return (0, y.dx)(t, {
                                        viewContext: a,
                                        errorType: i,
                                        session: o
                                    })
                                }(t, n, r, 0 !== d),
                                isRecording: () => 3 === d
                            }
                        }(o, r, a, s, function() {
                            return f || (u ? ? (u = i(o, "Datadog Session Replay", () => t.stop())), u && (f = e(u, 1))), f
                        }, d), n(o) && t.start()
                    },
                    isRecording: () => 3 === a() && t.isRecording(),
                    getReplayStats: t => 3 === a() ? (0, _.lv)(t) : void 0
                }
            }(),
            L = function() {
                let t;
                return {
                    onRumStart(e, n, r, o, i, a) {
                        const s = o.findTrackedSession();
                        if (!s) return;
                        if (! function(t, e) {
                                return (0, w.d0)() ? (0, w.Ww)("profiles") : (0, N.$5)(e.id, (0, N.it)(t.sessionSampleRate, t.profilingSampleRate))
                            }(r, s)) return;
                        const c = function(t) {
                            let e = {
                                status: "starting"
                            };
                            return t.assembleEventDefaults.register(({
                                eventType: t
                            }) => t !== y.bb.VIEW && t !== y.bb.LONG_TASK && t !== y.bb.ACTION && t !== y.bb.VITAL ? j.$O : {
                                type: t,
                                _dd: {
                                    profiling: e
                                }
                            }), {
                                get: () => e,
                                set(t) {
                                    e = t
                                }
                            }
                        }(n);
                        (0, T.B)(d)() ? (0, T.B)(f)().then(n => {
                            n ? (t = n(r, e, o, c, a, i, void 0), t.start()) : c.set({
                                status: "error",
                                error_reason: "failed-to-lazy-load"
                            })
                        }).catch(O.Dx): c.set({
                            status: "error",
                            error_reason: "not-supported-by-browser"
                        })
                    },
                    stop() {
                        t ? .stop()
                    }
                }
            }(),
            $ = (0, y.AB)(D, L, {
                startDeflateWorker: i,
                createDeflateEncoder: e,
                sdkName: "rum"
            });
        (0, v.Z)(g.J, "DD_RUM", $)
    })(), document.addEventListener("DOMContentLoaded", function() {
        window.addEventListener("CookiebotOnConsentReady", function() {
            if (!window.DD_RUM) return;
            if (!window.DATADOG_CONFIG) return;
            const t = window.DATADOG_CONFIG;
            window.DD_RUM.init({
                clientToken: t.clientToken,
                applicationId: t.applicationId,
                site: t.site,
                service: t.service,
                env: t.env,
                version: t.version,
                sessionSampleRate: t.sessionSampleRate,
                sessionReplaySampleRate: t.sessionReplaySampleRate,
                trackUserInteractions: !1,
                defaultPrivacyLevel: "mask-user-input",
                beforeSend: t => {
                    "object" == typeof window.datadog_attributes && (t.context = Object.assign({}, t.context, window.datadog_attributes))
                },
                trackingConsent: Market.Helpers.CookieConsent.given("statistics") ? "granted" : "not-granted"
            })
        })
    });