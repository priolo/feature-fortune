import { i as importShared } from "../_virtual___federation_fn_import-1-WGQjMR.js";
const { useSyncExternalStore: M, useState: $, useRef: p, useEffect: z } = await importShared("react");
function y(n) {
  return n !== null && typeof n == "object";
}
function N(n) {
  return n !== null && !Array.isArray(n) && typeof n == "object";
}
function J(n) {
  return typeof n == "string" || n instanceof String;
}
function W(n) {
  return !!R(n);
}
function Y(n) {
  const r = R(n);
  if (!r)
    return false;
  const t = r.pathname.split(".").pop();
  return t == null ? false : ["jpg", "jpeg", "png", "gif"].includes(t.toLowerCase());
}
function R(n) {
  let r;
  try {
    r = new URL(n);
  } catch {
    return null;
  }
  return r.protocol === "http:" || r.protocol === "https:" ? r : null;
}
const q = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isObject: y,
  isObjectStrict: N,
  isString: J,
  isUrl: W,
  isUrlImage: Y
}, Symbol.toStringTag, { value: "Module" }));
function k(n, r, t) {
  return t.ignoreUndefined && n == null && r == null ? true : Object.is(n, r);
}
function E(n, r, t = {}) {
  if (!y(n) || !y(r))
    return k(n, r, t);
  for (let e in n)
    if (!E(n[e], r[e], t))
      return false;
  for (let e in r)
    if (!n.hasOwnProperty(e))
      return false;
  return true;
}
const B = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isEqual: k,
  isEqualDeep: E
}, Symbol.toStringTag, { value: "Module" }));
function X(n, r, t) {
  try {
    let { parent: e, value: i } = P(n, r);
    return typeof i == "function" ? i.bind(e) : i;
  } catch {
    return t;
  }
}
function Z(n, r, t) {
  let { parent: e, key: i } = P(n, r, true);
  return typeof i == "number" ? e.splice(i, 1, t) : e[i] = t;
}
function P(n, r, t = false) {
  let e = n.split("."), i = r || window, l = "", u;
  for (let s = 0; s < e.length; s++) {
    let o = e[s], c = o.indexOf("[");
    if (c != -1) {
      let f = Number(o.substring(c + 1, o.length - 1)), a = o.substring(0, c);
      u = i[a], i = u, o = f.toString(), l = o;
    } else
      u = i, l = o;
    if (i[o] == null)
      if (t)
        i[o] = {};
      else
        throw new Error(`Il parametro: ${n}; non esiste`);
    i = i[o];
  }
  return {
    parent: u,
    key: l,
    value: i
  };
}
function F(n, r, t = false) {
  if (t && r == null || Object.is(n, r) || G(n, r) || H(n, r))
    return true;
  if (typeof n == "object" && typeof r == "object") {
    for (var e in n)
      if (!r.hasOwnProperty(e) || !F(n[e], r[e], t))
        return false;
    return true;
  }
  return false;
}
function G(n, r) {
  if (typeof n != "function" || typeof r != "function")
    return false;
  let t = n.toString();
  t = t.substring(t.indexOf("{"));
  let e = r.toString();
  return e = e.substring(e.indexOf("{")), t == e;
}
function H(n, r) {
  return !(n instanceof Date) || !(r instanceof Date) ? false : n.getTime() == r.getTime();
}
function T(n, r) {
  let t = { ...n }, e = r.indexOf(".");
  if (e == -1)
    return t;
  let i = r.slice(0, e);
  if (t[i] == null)
    throw "Path non trovata";
  return t[i] = T(t[i], r.slice(e + 1)), t;
}
function nn(n) {
  return n.reduce((r, t) => {
    const e = new Set(Object.keys(r));
    for (const i in t)
      i in r ? r[i] !== t[i] && (r[i] = null) : r[i] = t[i], e.delete(i);
    return e.forEach((i) => r[i] = null), r;
  }, {});
}
function rn(n) {
  if (n != null)
    return JSON.parse(JSON.stringify(n));
}
function en(n) {
  return { ...n };
}
function D(n, r, t = true) {
  if (t) {
    if (n == null && r != null)
      return r;
    if (n != null && r == null)
      return n;
  }
  return !y(n) || !y(r) ? n : Array.isArray(n) && Array.isArray(r) ? U(n, r) : Array.isArray(n) || Array.isArray(r) ? n : Object.keys(n).reduce((e, i) => (r.hasOwnProperty(i) ? e[i] = D(n[i], r[i]) : e[i] = n[i], e), { ...r });
}
function U(n, r) {
  const t = [];
  for (let e = 0; e < n.length && e < r.length; e++)
    t[e] = D(n[e], r[e]);
  return t.concat(n.length > r.length ? n.slice(r.length) : r.slice(n.length));
}
function K(n, r, t, e = [], i) {
  for (const l in n) {
    r[l] = tn(n[l]);
    const u = [...e, l], s = t ? t(n, r, i, u) : true;
    y(r[l]) && s && K(n[l], r[l], t, u, n);
  }
  return r;
}
function tn(n) {
  return N(n) ? {} : Array.isArray(n) ? [] : n;
}
function ln(n, r) {
  const t = n.split("."), e = r.split(".");
  return A(t, e);
}
function A(n, r, t = 0) {
  if (r.length == 0)
    return t;
  if (n.length < r.length)
    return -1;
  const e = n[0], i = r[0];
  if (t++, i == e || i === "*")
    return A(n.slice(1), r.slice(1), t);
  if (i === "?")
    for (let l = 0; l < n.length - r.length + 1; l++) {
      let u = A(n.slice(1 + l), r.slice(1), t);
      if (u != -1)
        return l + u;
    }
  return -1;
}
const on = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getValueWithPath: X,
  setValueWithPath: Z,
  getParentAndKey: P,
  objectIsIn: F,
  clonePath: T,
  minCommonProps: nn,
  cloneDeep: rn,
  clone: en,
  merge: D,
  mergeArray: U,
  reduceObject: K,
  matchPath: ln,
  matchPathArray: A
}, Symbol.toStringTag, { value: "Module" }));
function L(n) {
  return !!/^[^\s@]+@[^\s@]+$/.test(n);
}
function un(n) {
  return n != null && n.trim().length > 0;
}
function sn(n) {
  return !!(Array.isArray(n) && n.length > 0);
}
function V(n) {
  var r = new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
  return !!r.test(n);
}
function v(n, r) {
  if (!r)
    return true;
  if (typeof r == "string") {
    const t = r.charAt(0) == "?";
    if (t && (r = r.slice(1)), t && n == null)
      return true;
    const [e, i] = r.split(":");
    switch (e) {
      case "email":
        return L(n);
      case "url":
        return V(n);
      case "tel":
        return /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g.test(n);
      case "string":
        return typeof n != "string" ? false : m(n.trim().length, i);
      case "array":
        return Array.isArray(n) ? m(n.length, i) : false;
      case "int":
        return Number.isInteger(n) ? m(n, i) : false;
      case "number":
        return Number.isFinite(n) ? m(n, i) : false;
    }
    return true;
  }
  if (Array.isArray(r))
    return r.every((t) => v(n, t));
  if (typeof r == "object") {
    const t = Object.keys(r);
    for (const e of t) {
      const i = n[e], l = r[e];
      if (v(i, l) == false)
        return false;
    }
  }
  return true;
}
function m(n, r) {
  if (r == null || r.length == 0)
    return true;
  let t = r.charAt(0), e;
  switch (isNaN(t) ? e = +r.slice(1) : (t = "=", e = +r), t) {
    case "=":
      return n == e;
    case ">":
      return n > e;
    case "<":
      return n < e;
    case "!":
      return n != e;
    default:
      return true;
  }
}
const _ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  email: L,
  obligatory: un,
  obligatoryArray: sn,
  url: V,
  verify: v
}, Symbol.toStringTag, { value: "Module" }));
({ ...B, ...q });
var S = /* @__PURE__ */ ((n) => (n[n.ADD = 0] = "ADD", n[n.REMOVE = 1] = "REMOVE", n))(S || {}), w = /* @__PURE__ */ ((n) => (n.ACTION = "action", n.ACTION_SYNC = "action-sync", n.MUTATION = "mutation", n))(w || {});
const g = /* @__PURE__ */ new Map();
function I(n, r, t, e, i, l) {
  const u = { type: n, store: r, key: t, payload: e, result: i, subcall: l };
  if (!g.has(r))
    return;
  const s = g.get(r);
  if (!s)
    return;
  const o = s["*"];
  if (o)
    for (const f of o)
      f(u);
  const c = s[t];
  if (c)
    for (const f of c)
      f(u);
}
function fn({ store: n, actionName: r, callback: t }) {
  let e;
  g.has(n) ? e = g.get(n) : (e = {}, g.set(n, e));
  let i = e[r];
  i || (i = /* @__PURE__ */ new Set(), e[r] = i), i.add(t);
}
function gn({ store: n, actionName: r, callback: t }) {
  if (!g.has(n))
    return;
  const e = g.get(n);
  if (!e)
    return;
  const i = e[r];
  i && t && i.delete(t), (!i || i.size === 0 || !t) && delete e[r], (Object.keys(e).length === 0 || !r) && g.delete(n);
}
let O = false;
function yn(n) {
  return n ? M(n._subscribe, () => n.state) : null;
}
function hn(n, r) {
  return n ? M((t) => n._subscribe(t, r), () => n.state) : null;
}
function bn(n) {
  let r = {
    // the current state of the store
    state: C(n.state),
    // the listeners that are watching the store
    _listeners: /* @__PURE__ */ new Set(),
    // add listener to the store. Called by "useSyncExternalStore"
    _subscribe: (t, e) => {
      var i;
      return t.fn = e, r._listeners.add(t), (i = r._listenerChange) == null || i.call(r, r, S.ADD), () => {
        var l;
        r._listeners.delete(t), (l = r._listenerChange) == null || l.call(r, r, S.REMOVE);
      };
    },
    /** smista l'aggiornamento a tutti i listener dello STORE */
    _update: (t) => {
      var e;
      r.state = { ...r.state }, (e = r._stateChange) == null || e.call(r, r, t);
      for (const i of r._listeners)
        (!i.fn || i.fn(r.state, t)) && i(r.state);
    },
    _listenerChange: null
  };
  return r._listenerChange = n.onListenerChange, r._stateChange = n.onStateChange, n.getters && (r = Object.keys(n.getters).reduce((t, e) => (t[e] = (i) => n.getters[e](i, r), t), r)), n.actions && (r = Object.keys(n.actions).reduce((t, e) => (t[e] = async (i) => {
    const l = O;
    l == false && (O = true);
    const u = await n.actions[e](i, r);
    return I(w.ACTION, r, e, i, u, l), l == false && (O = false), u;
  }, t), r)), n.mutators && (r = Object.keys(n.mutators).reduce((t, e) => (t[e] = (i) => {
    var s;
    const l = n.mutators[e](i, r);
    if (l === void 0 || Object.keys(l).every((o) => l[o] === r.state[o]))
      return;
    const u = r.state;
    r.state = { ...r.state, ...l }, I(
      w.MUTATION,
      r,
      e,
      i,
      null,
      O
    ), (s = r._stateChange) == null || s.call(r, r, u);
    for (const o of r._listeners)
      (!o.fn || o.fn(r.state, u)) && o(r.state);
  }, t), r)), r;
}
function C(n) {
  return n ? typeof n == "function" ? n() : on.cloneDeep(n) : {};
}
function dn(...n) {
  return n.reduce((r, t) => r == null ? t : cn(r, t), null);
}
function cn(n, r) {
  return !n && !r ? null : n ? r ? {
    state: typeof n.state == "function" || typeof r.state == "function" ? () => {
      const e = C(n.state), i = C(r.state);
      return { ...e, ...i };
    } : { ...n.state, ...r.state },
    mutators: {
      ...n.mutators,
      ...r.mutators
    },
    getters: {
      ...n.getters,
      ...r.getters
    },
    actions: {
      ...n.actions,
      ...r.actions
    },
    actionsSync: {
      ...n.actionsSync,
      ...r.actionsSync
    },
    onListenerChange: r.onListenerChange ?? n.onListenerChange,
    onStateChange: r.onStateChange ?? n.onStateChange
  } : n : r;
}
let h = [];
function mn() {
  return h.reduce((n, r) => {
    const { error: t, ref: e } = r.validate();
    return t != null && (n.push({ error: t, ref: e }), n.length == 1 && e && e.current != null && e.current.focus()), n;
  }, []);
}
function _n() {
  h.forEach((n) => n.reset());
}
function On(n, r, t = "inputRef") {
  const [e, i] = $(null), l = p(null), u = p(n), s = p(false);
  z(() => {
    const a = h.filter((b) => b != o);
    return a.push({ validate: o, reset: c }), h = a, () => {
      h = h.filter((b) => b.validate != o);
    };
  }, []), z(() => {
    u.current = n, !(s.current == false && f() != null) && o();
  }, [n]);
  function o() {
    s.current = true;
    const a = f();
    return i(a), { error: a, ref: l };
  }
  function c() {
    s.current = false, i(null);
  }
  function f() {
    let a = null;
    return Object.keys(r).some((b) => a = r[b](u.current)), a;
  }
  return { helperText: e, error: e != null, [t]: l };
}
const An = {
  obligatory: (n) => {
    if (!_.obligatory(n))
      return "string.obligatory";
  },
  // https://www.w3resource.com/javascript/form/email-validation.php
  email: (n) => {
    if (!_.email(n))
      return "email.syntax";
  },
  // https://stackoverflow.com/a/5717133/5224029
  url: (n) => {
    if (!_.url(n))
      return "url.syntax";
  },
  obligatoryArray: (n) => {
    if (!_.obligatoryArray(n))
      return "array.obligatory";
  }
};
export {
  w as EVENTS_TYPES,
  S as LISTENER_CHANGE,
  fn as addWatch,
  bn as createStore,
  dn as mixStores,
  gn as removeWatch,
  _n as resetAll,
  An as rules,
  yn as useStore,
  hn as useStoreNext,
  On as useValidator,
  mn as validateAll
};
//# sourceMappingURL=jon-BvSGLcTE.js.map
