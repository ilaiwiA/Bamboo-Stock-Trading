function t(t, e, i, s) {
  Object.defineProperty(t, e, {
    get: i,
    set: s,
    enumerable: !0,
    configurable: !0,
  });
}
function e(t) {
  return t && t.__esModule ? t.default : t;
}
var i =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof self
      ? self
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : {},
  s = {},
  n = {},
  o = i.parcelRequire10c2;
null == o &&
  (((o = function (t) {
    if (t in s) return s[t].exports;
    if (t in n) {
      var e = n[t];
      delete n[t];
      var i = { id: t, exports: {} };
      return (s[t] = i), e.call(i.exports, i, i.exports), i.exports;
    }
    var o = new Error("Cannot find module '" + t + "'");
    throw ((o.code = "MODULE_NOT_FOUND"), o);
  }).register = function (t, e) {
    n[t] = e;
  }),
  (i.parcelRequire10c2 = o)),
  o.register("27Lyk", function (e, i) {
    var s, n;
    t(
      e.exports,
      "register",
      () => s,
      (t) => (s = t)
    ),
      t(
        e.exports,
        "resolve",
        () => n,
        (t) => (n = t)
      );
    var o = {};
    (s = function (t) {
      for (var e = Object.keys(t), i = 0; i < e.length; i++) o[e[i]] = t[e[i]];
    }),
      (n = function (t) {
        var e = o[t];
        if (null == e) throw new Error("Could not resolve bundle with id " + t);
        return e;
      });
  }),
  o("27Lyk").register(
    JSON.parse(
      '{"5kGlb":"index.cd2be5b8.js","lJfxJ":"tickers_noSpecialChart_withName.e24a985a.csv","lW39w":"checkmark.5704a074.svg","9Eqac":"plus-sign.fcde53b5.svg","8lR7J":"stock_img.6078f990.jpg"}'
    )
  );
var a;
a = new URL(o("27Lyk").resolve("lJfxJ"), import.meta.url).toString();
const r = "https://bamboospring-production.up.railway.app/api/",
  l = "/Bamboo-Stock-Trading/Register.html",
  h = "stocklist",
  c = "watchlist",
  d = "toplist",
  u = { hour: "numeric", minute: "numeric" },
  f = { month: "short", day: "numeric", hour: "numeric", minute: "numeric" },
  p = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  },
  g = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  },
  m = fetch(e(a))
    .then((t) => t.text())
    .then((t) =>
      t
        .split("\n")
        .map((t) => {
          const e = t.split(",");
          if (
            ((e[1] = e[1]?.slice(0, -1)),
            "undefined" !== e[1] &&
              e[1] &&
              !(e[1].length < 1) &&
              "ZZZ" !== e[0])
          )
            return e;
        })
        .filter((t) => t)
    ),
  b = async function (t) {
    try {
      let i = new Headers(),
        s = new Request(t, {
          method: "GET",
          headers: i,
          credentials: "include",
        });
      const n = await Promise.race([
        fetch(s),
        ((e = 10),
        new Promise(function (t) {
          setTimeout(t, 1e3 * e);
        })),
      ]);
      if ((console.log(n.status, n.ok), 204 === n.status))
        return void console.log("RES STATUS 204: " + n.status);
      if (!n.ok) throw (console.log("HERE?"), new Error(`${n.status}`));
      return await n.json();
    } catch (t) {
      throw (console.error("JSON ERR"), t);
    }
    var e;
  },
  x = async function (t, e) {
    let i = new Headers();
    i.append("Content-type", "application/json");
    let s = new Request(t, {
      method: "POST",
      headers: i,
      credentials: "include",
      body: JSON.stringify(e),
    });
    return await fetch(s);
  },
  y = function () {
    const t = new Date();
    return (
      0 !== t.getDay() &&
      6 !== t.getDay() &&
      !(t.getHours() < 6 || t.getHours() > 19)
    );
  },
  _ = { stock: {} },
  v = async function (t, e = "day", i = !1) {
    try {
      const s =
          "portfolio" === t
            ? r + "user/portfolio/" + e
            : r +
              "stock/" +
              t +
              "/quotes/" +
              `${"day" === e ? "" : e}` +
              (i ? "reduced" : ""),
        n = await b(s),
        o = new Date();
      let a = [],
        l = [],
        h =
          "day" === e &&
          0 != o.getDay() &&
          6 != o.getDay() &&
          o.getHours() >= 6;
      if (
        (((1 === o.getDay() && o.getHours() < 7) ||
          new Date(n[0].datetime).getDay() != o.getDay()) &&
          (h = !1),
        h)
      ) {
        o.setHours(6), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0);
        let t = o.getTime();
        const e = new Date();
        e.setSeconds(0),
          e.setMilliseconds(0),
          (a = [...new Array(156)].map((e, i) => t + 3e5 * i));
        const i = a.findIndex((t) => t > e.getTime());
        e.getMinutes() % 5 != 0 && -1 != i && a.splice(i, 0, e.getTime());
        let s = 0;
        l = a
          .map((t, e, i) => {
            if (s === n.length - 1 && t <= new Date().getTime()) {
              const e = { ...n[s] };
              return (e.datetime = t), e;
            }
            if (!(s > n.length - 1)) {
              if (t < n[s].datetime) {
                const o = { ...n[s] };
                return (
                  (o.datetime = t), i[e + 1] >= n[s + 1]?.datetime && s++, o
                );
              }
              if (t === n[s].datetime) {
                const e = { ...n[s] };
                return (e.datetime = t), s++, e;
              }
            }
          })
          .filter((t) => t);
      }
      const c = l.length > 0 ? l : n,
        d = a.length > 0 ? a : n,
        p = [
          ...d.map((t) =>
            new Intl.DateTimeFormat(
              "en-US",
              "day" === e ? u : "week" === e ? f : g
            ).format(t.datetime || t)
          ),
        ],
        m = p.findIndex((t) => t.includes("8:30")),
        x = p.findIndex((t) => t.includes("3:00"));
      return {
        dates: p,
        preDates: p.filter((t, e) => e < m),
        intraDates: p.filter(
          (t, e) => e >= m && e <= (-1 === x ? p.length - 1 : x)
        ),
        postDates: p.filter((t, e) => e > (-1 === x ? p.length - 1 : x)),
        prices: c,
        timePeriod: e,
      };
    } catch (t) {
      console.error(`🚨🚨🚨 + ${t}`);
    }
  },
  w = function (t) {
    const e = [];
    return (
      t.forEach((t, i) => {
        i >= 10 || e.push(t);
      }),
      e
    );
  },
  M = async function (t) {
    try {
      console.log("LOAD USER: ");
      const {
        firstName: e,
        userName: i,
        portfolio: {
          stocks: s,
          watchList: n,
          stockList: o,
          availableBalance: a,
          totalBalance: l,
        },
      } = await b(r + "user");
      console.log("FIRST: " + e),
        (_.firstName = e),
        (_.userName = i),
        (_.availableBal = a),
        (_.totalBal = l.toFixed(2)),
        (_.userStocks = s),
        t ||
          (console.log("SECOND: "),
          !n && o.length < 1
            ? (console.log("THIRD: "),
              await k(["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "TSLA"], d))
            : (console.log("Forth: "), await k(n, c), await k(o, h))),
        console.log("Five: ");
    } catch (t) {
      throw new Error(401);
    }
  },
  k = async function (t, e) {
    try {
      if (!t?.length) return delete _[`${e}`];
      const i = [...Object.values(await b(r + "stocks/" + t))];
      for (data of i)
        console.log("A: ", data),
          (data.quotes = await v(data.symbol, "day", !0));
      console.log(i + "   C"),
        (_[`${e}`] = (function (t) {
          try {
            const e = t;
            return (
              e.forEach((t, e) => {
                (t.lastPrice = Number(t.lastPrice).toFixed(2)),
                  (t.quantity = _.userStocks.find(
                    (e) => e.ticker === t.symbol
                  )?.quantity);
              }),
              e
            );
          } catch (t) {
            console.error(`🚨🚨🚨 + ${t}`);
          }
        })(i));
    } catch (t) {
      throw (console.log("ERROR IN LOADING STOCKLIST"), t);
    }
  },
  S = async function (t) {
    try {
      (_.stock = await (async function (t) {
        try {
          const e = await b(r + "stock/" + t);
          if (!e) throw Error;
          return e;
        } catch (t) {
          console.error(`🚨🚨🚨 + ${t}`), (window.location = "/");
        }
      })(t)),
        (_.stock.quotes = await v(t)),
        _.userStocks &&
          (_.stock.user = _?.userStocks.find((e) => e.ticker === t)),
        _.watched?.includes(t) && (_.stock.bookmarked = !0);
    } catch (t) {
      throw new Error("Ticker not Found");
    }
  },
  P = async function (t) {
    try {
      if (!_.stock) return;
      const e = "portfolio" === _.stock.symbol ? "portfolio" : _.stock.symbol;
      (_.stock.quotes = await v(e, t)), (_.stock.quotes.timePeriod = t);
    } catch (t) {
      throw new Error("Ticker not Found");
    }
  },
  C = async function (t) {
    try {
      const e = (function (t) {
        try {
          return (
            Object.keys(t).forEach((e, i) => {
              (t[`${e[0].toLowerCase() + e.slice(1)}`] = t[`${e}`]),
                delete t[`${e}`];
            }),
            t
          );
        } catch (t) {
          console.error(`🚨🚨🚨 + ${t}`);
        }
      })(await b(r + "stock/" + t + "/summary"));
      if (0 === Object.keys(e).length) return;
      _.stock.summary = e;
    } catch (t) {
      console.error(t);
    }
  },
  D = async function (t) {
    try {
      let e;
      if (
        (t && (e = await b(`${r}${t}/news`)),
        (t && null !== e.feed) || (e = await b(`${r}news`)),
        !e)
      )
        return;
      const i = (function (t, e) {
          try {
            if (!t.feed) return;
            const i = t.feed.filter(
                (t) =>
                  "Benzinga" !== t.source ||
                  t.symbol.includes("CRYPTO") ||
                  t.symbol.includes("FOREX")
              ),
              s = i.filter((t) => t.symbol === e);
            return s.length > 1 ? w(s) : w(i);
          } catch (t) {
            console.error(t);
          }
        })(e, t),
        s = i
          .map((t) =>
            t.symbol.startsWith("FOREX") || !t.symbol ? "" : t.symbol
          )
          .toString(),
        n = Object.values(await b(r + "stocks/" + s)).map((t, e, i) =>
          t.symbol
            ? {
                symbol: t.symbol,
                netChange: t.netChange,
                netPercentChangeInDouble: t.netPercentChangeInDouble,
              }
            : ""
        );
      i.forEach((t, e, i) => {
        const s = n.findIndex((e) => e.symbol === t.symbol);
        -1 !== s &&
          ((t.netChange = n[s].netChange),
          (t.netPercentChangeInDouble = n[s].netPercentChangeInDouble));
      }),
        (_.stock.news = i);
    } catch (t) {
      console.error(t);
    }
  };
/*!
 * Chart.js v4.2.1
 * https://www.chartjs.org
 * (c) 2023 Chart.js Contributors
 * Released under the MIT License
 */
/*!
 * Chart.js v4.2.1
 * https://www.chartjs.org
 * (c) 2023 Chart.js Contributors
 * Released under the MIT License
 */
/*!
 * @kurkle/color v0.3.2
 * https://github.com/kurkle/color#readme
 * (c) 2023 Jukka Kurkela
 * Released under the MIT License
 */
function T(t) {
  return (t + 0.5) | 0;
}
const O = (t, e, i) => Math.max(Math.min(t, i), e);
function L(t) {
  return O(T(2.55 * t), 0, 255);
}
function A(t) {
  return O(T(255 * t), 0, 255);
}
function E(t) {
  return O(T(t / 2.55) / 100, 0, 1);
}
function R(t) {
  return O(T(100 * t), 0, 100);
}
const $ = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
  },
  I = [..."0123456789ABCDEF"],
  F = (t) => I[15 & t],
  H = (t) => I[(240 & t) >> 4] + I[15 & t],
  z = (t) => (240 & t) >> 4 == (15 & t),
  B = (t) => z(t.r) && z(t.g) && z(t.b) && z(t.a);
const V = (t, e) => (t < 255 ? e(t) : "");
const W =
  /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function j(t, e, i) {
  const s = e * Math.min(i, 1 - i),
    n = (e, n = (e + t / 30) % 12) =>
      i - s * Math.max(Math.min(n - 3, 9 - n, 1), -1);
  return [n(0), n(8), n(4)];
}
function N(t, e, i) {
  const s = (s, n = (s + t / 60) % 6) =>
    i - i * e * Math.max(Math.min(n, 4 - n, 1), 0);
  return [s(5), s(3), s(1)];
}
function q(t, e, i) {
  const s = j(t, 1, 0.5);
  let n;
  for (e + i > 1 && ((n = 1 / (e + i)), (e *= n), (i *= n)), n = 0; n < 3; n++)
    (s[n] *= 1 - e - i), (s[n] += e);
  return s;
}
function Y(t) {
  const e = t.r / 255,
    i = t.g / 255,
    s = t.b / 255,
    n = Math.max(e, i, s),
    o = Math.min(e, i, s),
    a = (n + o) / 2;
  let r, l, h;
  return (
    n !== o &&
      ((h = n - o),
      (l = a > 0.5 ? h / (2 - n - o) : h / (n + o)),
      (r = (function (t, e, i, s, n) {
        return t === n
          ? (e - i) / s + (e < i ? 6 : 0)
          : e === n
          ? (i - t) / s + 2
          : (t - e) / s + 4;
      })(e, i, s, h, n)),
      (r = 60 * r + 0.5)),
    [0 | r, l || 0, a]
  );
}
function X(t, e, i, s) {
  return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, i, s)).map(A);
}
function U(t, e, i) {
  return X(j, t, e, i);
}
function G(t) {
  return ((t % 360) + 360) % 360;
}
function J(t) {
  const e = W.exec(t);
  let i,
    s = 255;
  if (!e) return;
  e[5] !== i && (s = e[6] ? L(+e[5]) : A(+e[5]));
  const n = G(+e[2]),
    o = +e[3] / 100,
    a = +e[4] / 100;
  return (
    (i =
      "hwb" === e[1]
        ? (function (t, e, i) {
            return X(q, t, e, i);
          })(n, o, a)
        : "hsv" === e[1]
        ? (function (t, e, i) {
            return X(N, t, e, i);
          })(n, o, a)
        : U(n, o, a)),
    { r: i[0], g: i[1], b: i[2], a: s }
  );
}
const K = {
    x: "dark",
    Z: "light",
    Y: "re",
    X: "blu",
    W: "gr",
    V: "medium",
    U: "slate",
    A: "ee",
    T: "ol",
    S: "or",
    B: "ra",
    C: "lateg",
    D: "ights",
    R: "in",
    Q: "turquois",
    E: "hi",
    P: "ro",
    O: "al",
    N: "le",
    M: "de",
    L: "yello",
    F: "en",
    K: "ch",
    G: "arks",
    H: "ea",
    I: "ightg",
    J: "wh",
  },
  Z = {
    OiceXe: "f0f8ff",
    antiquewEte: "faebd7",
    aqua: "ffff",
    aquamarRe: "7fffd4",
    azuY: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "0",
    blanKedOmond: "ffebcd",
    Xe: "ff",
    XeviTet: "8a2be2",
    bPwn: "a52a2a",
    burlywood: "deb887",
    caMtXe: "5f9ea0",
    KartYuse: "7fff00",
    KocTate: "d2691e",
    cSO: "ff7f50",
    cSnflowerXe: "6495ed",
    cSnsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "ffff",
    xXe: "8b",
    xcyan: "8b8b",
    xgTMnPd: "b8860b",
    xWay: "a9a9a9",
    xgYF: "6400",
    xgYy: "a9a9a9",
    xkhaki: "bdb76b",
    xmagFta: "8b008b",
    xTivegYF: "556b2f",
    xSange: "ff8c00",
    xScEd: "9932cc",
    xYd: "8b0000",
    xsOmon: "e9967a",
    xsHgYF: "8fbc8f",
    xUXe: "483d8b",
    xUWay: "2f4f4f",
    xUgYy: "2f4f4f",
    xQe: "ced1",
    xviTet: "9400d3",
    dAppRk: "ff1493",
    dApskyXe: "bfff",
    dimWay: "696969",
    dimgYy: "696969",
    dodgerXe: "1e90ff",
    fiYbrick: "b22222",
    flSOwEte: "fffaf0",
    foYstWAn: "228b22",
    fuKsia: "ff00ff",
    gaRsbSo: "dcdcdc",
    ghostwEte: "f8f8ff",
    gTd: "ffd700",
    gTMnPd: "daa520",
    Way: "808080",
    gYF: "8000",
    gYFLw: "adff2f",
    gYy: "808080",
    honeyMw: "f0fff0",
    hotpRk: "ff69b4",
    RdianYd: "cd5c5c",
    Rdigo: "4b0082",
    ivSy: "fffff0",
    khaki: "f0e68c",
    lavFMr: "e6e6fa",
    lavFMrXsh: "fff0f5",
    lawngYF: "7cfc00",
    NmoncEffon: "fffacd",
    ZXe: "add8e6",
    ZcSO: "f08080",
    Zcyan: "e0ffff",
    ZgTMnPdLw: "fafad2",
    ZWay: "d3d3d3",
    ZgYF: "90ee90",
    ZgYy: "d3d3d3",
    ZpRk: "ffb6c1",
    ZsOmon: "ffa07a",
    ZsHgYF: "20b2aa",
    ZskyXe: "87cefa",
    ZUWay: "778899",
    ZUgYy: "778899",
    ZstAlXe: "b0c4de",
    ZLw: "ffffe0",
    lime: "ff00",
    limegYF: "32cd32",
    lRF: "faf0e6",
    magFta: "ff00ff",
    maPon: "800000",
    VaquamarRe: "66cdaa",
    VXe: "cd",
    VScEd: "ba55d3",
    VpurpN: "9370db",
    VsHgYF: "3cb371",
    VUXe: "7b68ee",
    VsprRggYF: "fa9a",
    VQe: "48d1cc",
    VviTetYd: "c71585",
    midnightXe: "191970",
    mRtcYam: "f5fffa",
    mistyPse: "ffe4e1",
    moccasR: "ffe4b5",
    navajowEte: "ffdead",
    navy: "80",
    Tdlace: "fdf5e6",
    Tive: "808000",
    TivedBb: "6b8e23",
    Sange: "ffa500",
    SangeYd: "ff4500",
    ScEd: "da70d6",
    pOegTMnPd: "eee8aa",
    pOegYF: "98fb98",
    pOeQe: "afeeee",
    pOeviTetYd: "db7093",
    papayawEp: "ffefd5",
    pHKpuff: "ffdab9",
    peru: "cd853f",
    pRk: "ffc0cb",
    plum: "dda0dd",
    powMrXe: "b0e0e6",
    purpN: "800080",
    YbeccapurpN: "663399",
    Yd: "ff0000",
    Psybrown: "bc8f8f",
    PyOXe: "4169e1",
    saddNbPwn: "8b4513",
    sOmon: "fa8072",
    sandybPwn: "f4a460",
    sHgYF: "2e8b57",
    sHshell: "fff5ee",
    siFna: "a0522d",
    silver: "c0c0c0",
    skyXe: "87ceeb",
    UXe: "6a5acd",
    UWay: "708090",
    UgYy: "708090",
    snow: "fffafa",
    sprRggYF: "ff7f",
    stAlXe: "4682b4",
    tan: "d2b48c",
    teO: "8080",
    tEstN: "d8bfd8",
    tomato: "ff6347",
    Qe: "40e0d0",
    viTet: "ee82ee",
    JHt: "f5deb3",
    wEte: "ffffff",
    wEtesmoke: "f5f5f5",
    Lw: "ffff00",
    LwgYF: "9acd32",
  };
let Q;
function tt(t) {
  Q ||
    ((Q = (function () {
      const t = {},
        e = Object.keys(Z),
        i = Object.keys(K);
      let s, n, o, a, r;
      for (s = 0; s < e.length; s++) {
        for (a = r = e[s], n = 0; n < i.length; n++)
          (o = i[n]), (r = r.replace(o, K[o]));
        (o = parseInt(Z[a], 16)),
          (t[r] = [(o >> 16) & 255, (o >> 8) & 255, 255 & o]);
      }
      return t;
    })()),
    (Q.transparent = [0, 0, 0, 0]));
  const e = Q[t.toLowerCase()];
  return e && { r: e[0], g: e[1], b: e[2], a: 4 === e.length ? e[3] : 255 };
}
const et =
  /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
const it = (t) =>
    t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055,
  st = (t) => (t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4));
function nt(t, e, i) {
  if (t) {
    let s = Y(t);
    (s[e] = Math.max(0, Math.min(s[e] + s[e] * i, 0 === e ? 360 : 1))),
      (s = U(s)),
      (t.r = s[0]),
      (t.g = s[1]),
      (t.b = s[2]);
  }
}
function ot(t, e) {
  return t ? Object.assign(e || {}, t) : t;
}
function at(t) {
  var e = { r: 0, g: 0, b: 0, a: 255 };
  return (
    Array.isArray(t)
      ? t.length >= 3 &&
        ((e = { r: t[0], g: t[1], b: t[2], a: 255 }),
        t.length > 3 && (e.a = A(t[3])))
      : ((e = ot(t, { r: 0, g: 0, b: 0, a: 1 })).a = A(e.a)),
    e
  );
}
function rt(t) {
  return "r" === t.charAt(0)
    ? (function (t) {
        const e = et.exec(t);
        let i,
          s,
          n,
          o = 255;
        if (e) {
          if (e[7] !== i) {
            const t = +e[7];
            o = e[8] ? L(t) : O(255 * t, 0, 255);
          }
          return (
            (i = +e[1]),
            (s = +e[3]),
            (n = +e[5]),
            (i = 255 & (e[2] ? L(i) : O(i, 0, 255))),
            (s = 255 & (e[4] ? L(s) : O(s, 0, 255))),
            (n = 255 & (e[6] ? L(n) : O(n, 0, 255))),
            { r: i, g: s, b: n, a: o }
          );
        }
      })(t)
    : J(t);
}
class lt {
  constructor(t) {
    if (t instanceof lt) return t;
    const e = typeof t;
    let i;
    var s, n, o;
    "object" === e
      ? (i = at(t))
      : "string" === e &&
        ((o = (s = t).length),
        "#" === s[0] &&
          (4 === o || 5 === o
            ? (n = {
                r: 255 & (17 * $[s[1]]),
                g: 255 & (17 * $[s[2]]),
                b: 255 & (17 * $[s[3]]),
                a: 5 === o ? 17 * $[s[4]] : 255,
              })
            : (7 !== o && 9 !== o) ||
              (n = {
                r: ($[s[1]] << 4) | $[s[2]],
                g: ($[s[3]] << 4) | $[s[4]],
                b: ($[s[5]] << 4) | $[s[6]],
                a: 9 === o ? ($[s[7]] << 4) | $[s[8]] : 255,
              })),
        (i = n || tt(t) || rt(t))),
      (this._rgb = i),
      (this._valid = !!i);
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = ot(this._rgb);
    return t && (t.a = E(t.a)), t;
  }
  set rgb(t) {
    this._rgb = at(t);
  }
  rgbString() {
    return this._valid
      ? (t = this._rgb) &&
          (t.a < 255
            ? `rgba(${t.r}, ${t.g}, ${t.b}, ${E(t.a)})`
            : `rgb(${t.r}, ${t.g}, ${t.b})`)
      : void 0;
    var t;
  }
  hexString() {
    return this._valid
      ? ((t = this._rgb),
        (e = B(t) ? F : H),
        t ? "#" + e(t.r) + e(t.g) + e(t.b) + V(t.a, e) : void 0)
      : void 0;
    var t, e;
  }
  hslString() {
    return this._valid
      ? (function (t) {
          if (!t) return;
          const e = Y(t),
            i = e[0],
            s = R(e[1]),
            n = R(e[2]);
          return t.a < 255
            ? `hsla(${i}, ${s}%, ${n}%, ${E(t.a)})`
            : `hsl(${i}, ${s}%, ${n}%)`;
        })(this._rgb)
      : void 0;
  }
  mix(t, e) {
    if (t) {
      const i = this.rgb,
        s = t.rgb;
      let n;
      const o = e === n ? 0.5 : e,
        a = 2 * o - 1,
        r = i.a - s.a,
        l = ((a * r == -1 ? a : (a + r) / (1 + a * r)) + 1) / 2;
      (n = 1 - l),
        (i.r = 255 & (l * i.r + n * s.r + 0.5)),
        (i.g = 255 & (l * i.g + n * s.g + 0.5)),
        (i.b = 255 & (l * i.b + n * s.b + 0.5)),
        (i.a = o * i.a + (1 - o) * s.a),
        (this.rgb = i);
    }
    return this;
  }
  interpolate(t, e) {
    return (
      t &&
        (this._rgb = (function (t, e, i) {
          const s = st(E(t.r)),
            n = st(E(t.g)),
            o = st(E(t.b));
          return {
            r: A(it(s + i * (st(E(e.r)) - s))),
            g: A(it(n + i * (st(E(e.g)) - n))),
            b: A(it(o + i * (st(E(e.b)) - o))),
            a: t.a + i * (e.a - t.a),
          };
        })(this._rgb, t._rgb, e)),
      this
    );
  }
  clone() {
    return new lt(this.rgb);
  }
  alpha(t) {
    return (this._rgb.a = A(t)), this;
  }
  clearer(t) {
    return (this._rgb.a *= 1 - t), this;
  }
  greyscale() {
    const t = this._rgb,
      e = T(0.3 * t.r + 0.59 * t.g + 0.11 * t.b);
    return (t.r = t.g = t.b = e), this;
  }
  opaquer(t) {
    return (this._rgb.a *= 1 + t), this;
  }
  negate() {
    const t = this._rgb;
    return (t.r = 255 - t.r), (t.g = 255 - t.g), (t.b = 255 - t.b), this;
  }
  lighten(t) {
    return nt(this._rgb, 2, t), this;
  }
  darken(t) {
    return nt(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return nt(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return nt(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return (
      (function (t, e) {
        var i = Y(t);
        (i[0] = G(i[0] + e)),
          (i = U(i)),
          (t.r = i[0]),
          (t.g = i[1]),
          (t.b = i[2]);
      })(this._rgb, t),
      this
    );
  }
}
function ht() {}
const ct = (() => {
  let t = 0;
  return () => t++;
})();
function dt(t) {
  return null == t;
}
function ut(t) {
  if (Array.isArray && Array.isArray(t)) return !0;
  const e = Object.prototype.toString.call(t);
  return "[object" === e.slice(0, 7) && "Array]" === e.slice(-6);
}
function ft(t) {
  return null !== t && "[object Object]" === Object.prototype.toString.call(t);
}
function pt(t) {
  return ("number" == typeof t || t instanceof Number) && isFinite(+t);
}
function gt(t, e) {
  return pt(t) ? t : e;
}
function mt(t, e) {
  return void 0 === t ? e : t;
}
const bt = (t, e) =>
  "string" == typeof t && t.endsWith("%") ? (parseFloat(t) / 100) * e : +t;
function xt(t, e, i) {
  if (t && "function" == typeof t.call) return t.apply(i, e);
}
function yt(t, e, i, s) {
  let n, o, a;
  if (ut(t))
    if (((o = t.length), s)) for (n = o - 1; n >= 0; n--) e.call(i, t[n], n);
    else for (n = 0; n < o; n++) e.call(i, t[n], n);
  else if (ft(t))
    for (a = Object.keys(t), o = a.length, n = 0; n < o; n++)
      e.call(i, t[a[n]], a[n]);
}
function _t(t, e) {
  let i, s, n, o;
  if (!t || !e || t.length !== e.length) return !1;
  for (i = 0, s = t.length; i < s; ++i)
    if (
      ((n = t[i]),
      (o = e[i]),
      n.datasetIndex !== o.datasetIndex || n.index !== o.index)
    )
      return !1;
  return !0;
}
function vt(t) {
  if (ut(t)) return t.map(vt);
  if (ft(t)) {
    const e = Object.create(null),
      i = Object.keys(t),
      s = i.length;
    let n = 0;
    for (; n < s; ++n) e[i[n]] = vt(t[i[n]]);
    return e;
  }
  return t;
}
function wt(t) {
  return -1 === ["__proto__", "prototype", "constructor"].indexOf(t);
}
function Mt(t, e, i, s) {
  if (!wt(t)) return;
  const n = e[t],
    o = i[t];
  ft(n) && ft(o) ? kt(n, o, s) : (e[t] = vt(o));
}
function kt(t, e, i) {
  const s = ut(e) ? e : [e],
    n = s.length;
  if (!ft(t)) return t;
  const o = (i = i || {}).merger || Mt;
  let a;
  for (let e = 0; e < n; ++e) {
    if (((a = s[e]), !ft(a))) continue;
    const n = Object.keys(a);
    for (let e = 0, s = n.length; e < s; ++e) o(n[e], t, a, i);
  }
  return t;
}
function St(t, e) {
  return kt(t, e, { merger: Pt });
}
function Pt(t, e, i) {
  if (!wt(t)) return;
  const s = e[t],
    n = i[t];
  ft(s) && ft(n)
    ? St(s, n)
    : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = vt(n));
}
const Ct = { "": (t) => t, x: (t) => t.x, y: (t) => t.y };
function Dt(t, e) {
  const i =
    Ct[e] ||
    (Ct[e] = (function (t) {
      const e = (function (t) {
        const e = t.split("."),
          i = [];
        let s = "";
        for (const t of e)
          (s += t),
            s.endsWith("\\")
              ? (s = s.slice(0, -1) + ".")
              : (i.push(s), (s = ""));
        return i;
      })(t);
      return (t) => {
        for (const i of e) {
          if ("" === i) break;
          t = t && t[i];
        }
        return t;
      };
    })(e));
  return i(t);
}
function Tt(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
const Ot = (t) => void 0 !== t,
  Lt = (t) => "function" == typeof t,
  At = (t, e) => {
    if (t.size !== e.size) return !1;
    for (const i of t) if (!e.has(i)) return !1;
    return !0;
  };
function Et(t) {
  return "mouseup" === t.type || "click" === t.type || "contextmenu" === t.type;
}
const Rt = Math.PI,
  $t = 2 * Rt,
  It = $t + Rt,
  Ft = Number.POSITIVE_INFINITY,
  Ht = Rt / 180,
  zt = Rt / 2,
  Bt = Rt / 4,
  Vt = (2 * Rt) / 3,
  Wt = Math.log10,
  jt = Math.sign;
function Nt(t, e, i) {
  return Math.abs(t - e) < i;
}
function qt(t) {
  const e = Math.round(t);
  t = Nt(t, e, t / 1e3) ? e : t;
  const i = Math.pow(10, Math.floor(Wt(t))),
    s = t / i;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * i;
}
function Yt(t) {
  const e = [],
    i = Math.sqrt(t);
  let s;
  for (s = 1; s < i; s++) t % s == 0 && (e.push(s), e.push(t / s));
  return i === (0 | i) && e.push(i), e.sort((t, e) => t - e).pop(), e;
}
function Xt(t) {
  return !isNaN(parseFloat(t)) && isFinite(t);
}
function Ut(t, e) {
  const i = Math.round(t);
  return i - e <= t && i + e >= t;
}
function Gt(t, e, i) {
  let s, n, o;
  for (s = 0, n = t.length; s < n; s++)
    (o = t[s][i]),
      isNaN(o) || ((e.min = Math.min(e.min, o)), (e.max = Math.max(e.max, o)));
}
function Jt(t) {
  return t * (Rt / 180);
}
function Kt(t) {
  return t * (180 / Rt);
}
function Zt(t) {
  if (!pt(t)) return;
  let e = 1,
    i = 0;
  for (; Math.round(t * e) / e !== t; ) (e *= 10), i++;
  return i;
}
function Qt(t, e) {
  const i = e.x - t.x,
    s = e.y - t.y,
    n = Math.sqrt(i * i + s * s);
  let o = Math.atan2(s, i);
  return o < -0.5 * Rt && (o += $t), { angle: o, distance: n };
}
function te(t, e) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function ee(t, e) {
  return ((t - e + It) % $t) - Rt;
}
function ie(t) {
  return ((t % $t) + $t) % $t;
}
function se(t, e, i, s) {
  const n = ie(t),
    o = ie(e),
    a = ie(i),
    r = ie(o - n),
    l = ie(a - n),
    h = ie(n - o),
    c = ie(n - a);
  return n === o || n === a || (s && o === a) || (r > l && h < c);
}
function ne(t, e, i) {
  return Math.max(e, Math.min(i, t));
}
function oe(t, e, i, s = 1e-6) {
  return t >= Math.min(e, i) - s && t <= Math.max(e, i) + s;
}
function ae(t, e, i) {
  i = i || ((i) => t[i] < e);
  let s,
    n = t.length - 1,
    o = 0;
  for (; n - o > 1; ) (s = (o + n) >> 1), i(s) ? (o = s) : (n = s);
  return { lo: o, hi: n };
}
const re = (t, e, i, s) =>
    ae(
      t,
      i,
      s
        ? (s) => {
            const n = t[s][e];
            return n < i || (n === i && t[s + 1][e] === i);
          }
        : (s) => t[s][e] < i
    ),
  le = (t, e, i) => ae(t, i, (s) => t[s][e] >= i);
function he(t, e, i) {
  let s = 0,
    n = t.length;
  for (; s < n && t[s] < e; ) s++;
  for (; n > s && t[n - 1] > i; ) n--;
  return s > 0 || n < t.length ? t.slice(s, n) : t;
}
const ce = ["push", "pop", "shift", "splice", "unshift"];
function de(t, e) {
  const i = t._chartjs;
  if (!i) return;
  const s = i.listeners,
    n = s.indexOf(e);
  -1 !== n && s.splice(n, 1),
    s.length > 0 ||
      (ce.forEach((e) => {
        delete t[e];
      }),
      delete t._chartjs);
}
function ue(t) {
  const e = new Set();
  let i, s;
  for (i = 0, s = t.length; i < s; ++i) e.add(t[i]);
  return e.size === s ? t : Array.from(e);
}
const fe =
  "undefined" == typeof window
    ? function (t) {
        return t();
      }
    : window.requestAnimationFrame;
function pe(t, e) {
  let i = [],
    s = !1;
  return function (...n) {
    (i = n),
      s ||
        ((s = !0),
        fe.call(window, () => {
          (s = !1), t.apply(e, i);
        }));
  };
}
function ge(t, e) {
  let i;
  return function (...s) {
    return (
      e ? (clearTimeout(i), (i = setTimeout(t, e, s))) : t.apply(this, s), e
    );
  };
}
const me = (t) => ("start" === t ? "left" : "end" === t ? "right" : "center"),
  be = (t, e, i) => ("start" === t ? e : "end" === t ? i : (e + i) / 2),
  xe = (t, e, i, s) =>
    t === (s ? "left" : "right") ? i : "center" === t ? (e + i) / 2 : e;
function ye(t, e, i) {
  const s = e.length;
  let n = 0,
    o = s;
  if (t._sorted) {
    const { iScale: a, _parsed: r } = t,
      l = a.axis,
      { min: h, max: c, minDefined: d, maxDefined: u } = a.getUserBounds();
    d &&
      (n = ne(
        Math.min(
          re(r, a.axis, h).lo,
          i ? s : re(e, l, a.getPixelForValue(h)).lo
        ),
        0,
        s - 1
      )),
      (o = u
        ? ne(
            Math.max(
              re(r, a.axis, c, !0).hi + 1,
              i ? 0 : re(e, l, a.getPixelForValue(c), !0).hi + 1
            ),
            n,
            s
          ) - n
        : s - n);
  }
  return { start: n, count: o };
}
function _e(t) {
  const { xScale: e, yScale: i, _scaleRanges: s } = t,
    n = { xmin: e.min, xmax: e.max, ymin: i.min, ymax: i.max };
  if (!s) return (t._scaleRanges = n), !0;
  const o =
    s.xmin !== e.min ||
    s.xmax !== e.max ||
    s.ymin !== i.min ||
    s.ymax !== i.max;
  return Object.assign(s, n), o;
}
const ve = (t) => 0 === t || 1 === t,
  we = (t, e, i) => -Math.pow(2, 10 * (t -= 1)) * Math.sin(((t - e) * $t) / i),
  Me = (t, e, i) => Math.pow(2, -10 * t) * Math.sin(((t - e) * $t) / i) + 1,
  ke = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => -t * (t - 2),
    easeInOutQuad: (t) =>
      (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1),
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => (t -= 1) * t * t + 1,
    easeInOutCubic: (t) =>
      (t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2),
    easeInQuart: (t) => t * t * t * t,
    easeOutQuart: (t) => -((t -= 1) * t * t * t - 1),
    easeInOutQuart: (t) =>
      (t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2),
    easeInQuint: (t) => t * t * t * t * t,
    easeOutQuint: (t) => (t -= 1) * t * t * t * t + 1,
    easeInOutQuint: (t) =>
      (t /= 0.5) < 1
        ? 0.5 * t * t * t * t * t
        : 0.5 * ((t -= 2) * t * t * t * t + 2),
    easeInSine: (t) => 1 - Math.cos(t * zt),
    easeOutSine: (t) => Math.sin(t * zt),
    easeInOutSine: (t) => -0.5 * (Math.cos(Rt * t) - 1),
    easeInExpo: (t) => (0 === t ? 0 : Math.pow(2, 10 * (t - 1))),
    easeOutExpo: (t) => (1 === t ? 1 : 1 - Math.pow(2, -10 * t)),
    easeInOutExpo: (t) =>
      ve(t)
        ? t
        : t < 0.5
        ? 0.5 * Math.pow(2, 10 * (2 * t - 1))
        : 0.5 * (2 - Math.pow(2, -10 * (2 * t - 1))),
    easeInCirc: (t) => (t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1)),
    easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
    easeInOutCirc: (t) =>
      (t /= 0.5) < 1
        ? -0.5 * (Math.sqrt(1 - t * t) - 1)
        : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
    easeInElastic: (t) => (ve(t) ? t : we(t, 0.075, 0.3)),
    easeOutElastic: (t) => (ve(t) ? t : Me(t, 0.075, 0.3)),
    easeInOutElastic(t) {
      const e = 0.1125;
      return ve(t)
        ? t
        : t < 0.5
        ? 0.5 * we(2 * t, e, 0.45)
        : 0.5 + 0.5 * Me(2 * t - 1, e, 0.45);
    },
    easeInBack(t) {
      const e = 1.70158;
      return t * t * ((e + 1) * t - e);
    },
    easeOutBack(t) {
      const e = 1.70158;
      return (t -= 1) * t * ((e + 1) * t + e) + 1;
    },
    easeInOutBack(t) {
      let e = 1.70158;
      return (t /= 0.5) < 1
        ? t * t * ((1 + (e *= 1.525)) * t - e) * 0.5
        : 0.5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2);
    },
    easeInBounce: (t) => 1 - ke.easeOutBounce(1 - t),
    easeOutBounce(t) {
      const e = 7.5625,
        i = 2.75;
      return t < 1 / i
        ? e * t * t
        : t < 2 / i
        ? e * (t -= 1.5 / i) * t + 0.75
        : t < 2.5 / i
        ? e * (t -= 2.25 / i) * t + 0.9375
        : e * (t -= 2.625 / i) * t + 0.984375;
    },
    easeInOutBounce: (t) =>
      t < 0.5
        ? 0.5 * ke.easeInBounce(2 * t)
        : 0.5 * ke.easeOutBounce(2 * t - 1) + 0.5,
  };
function Se(t) {
  if (t && "object" == typeof t) {
    const e = t.toString();
    return "[object CanvasPattern]" === e || "[object CanvasGradient]" === e;
  }
  return !1;
}
function Pe(t) {
  return Se(t) ? t : new lt(t);
}
function Ce(t) {
  return Se(t) ? t : new lt(t).saturate(0.5).darken(0.1).hexString();
}
const De = ["x", "y", "borderWidth", "radius", "tension"],
  Te = ["color", "borderColor", "backgroundColor"];
const Oe = new Map();
function Le(t, e, i) {
  return (function (t, e) {
    e = e || {};
    const i = t + JSON.stringify(e);
    let s = Oe.get(i);
    return s || ((s = new Intl.NumberFormat(t, e)), Oe.set(i, s)), s;
  })(e, i).format(t);
}
const Ae = {
  values: (t) => (ut(t) ? t : "" + t),
  numeric(t, e, i) {
    if (0 === t) return "0";
    const s = this.chart.options.locale;
    let n,
      o = t;
    if (i.length > 1) {
      const e = Math.max(Math.abs(i[0].value), Math.abs(i[i.length - 1].value));
      (e < 1e-4 || e > 1e15) && (n = "scientific"),
        (o = (function (t, e) {
          let i =
            e.length > 3 ? e[2].value - e[1].value : e[1].value - e[0].value;
          Math.abs(i) >= 1 && t !== Math.floor(t) && (i = t - Math.floor(t));
          return i;
        })(t, i));
    }
    const a = Wt(Math.abs(o)),
      r = Math.max(Math.min(-1 * Math.floor(a), 20), 0),
      l = { notation: n, minimumFractionDigits: r, maximumFractionDigits: r };
    return Object.assign(l, this.options.ticks.format), Le(t, s, l);
  },
  logarithmic(t, e, i) {
    if (0 === t) return "0";
    const s = i[e].significand || t / Math.pow(10, Math.floor(Wt(t)));
    return [1, 2, 3, 5, 10, 15].includes(s) || e > 0.8 * i.length
      ? Ae.numeric.call(this, t, e, i)
      : "";
  },
};
var Ee = { formatters: Ae };
const Re = Object.create(null),
  $e = Object.create(null);
function Ie(t, e) {
  if (!e) return t;
  const i = e.split(".");
  for (let e = 0, s = i.length; e < s; ++e) {
    const s = i[e];
    t = t[s] || (t[s] = Object.create(null));
  }
  return t;
}
function Fe(t, e, i) {
  return "string" == typeof e ? kt(Ie(t, e), i) : kt(Ie(t, ""), e);
}
class He {
  constructor(t, e) {
    (this.animation = void 0),
      (this.backgroundColor = "rgba(0,0,0,0.1)"),
      (this.borderColor = "rgba(0,0,0,0.1)"),
      (this.color = "#666"),
      (this.datasets = {}),
      (this.devicePixelRatio = (t) => t.chart.platform.getDevicePixelRatio()),
      (this.elements = {}),
      (this.events = [
        "mousemove",
        "mouseout",
        "click",
        "touchstart",
        "touchmove",
      ]),
      (this.font = {
        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        size: 12,
        style: "normal",
        lineHeight: 1.2,
        weight: null,
      }),
      (this.hover = {}),
      (this.hoverBackgroundColor = (t, e) => Ce(e.backgroundColor)),
      (this.hoverBorderColor = (t, e) => Ce(e.borderColor)),
      (this.hoverColor = (t, e) => Ce(e.color)),
      (this.indexAxis = "x"),
      (this.interaction = {
        mode: "nearest",
        intersect: !0,
        includeInvisible: !1,
      }),
      (this.maintainAspectRatio = !0),
      (this.onHover = null),
      (this.onClick = null),
      (this.parsing = !0),
      (this.plugins = {}),
      (this.responsive = !0),
      (this.scale = void 0),
      (this.scales = {}),
      (this.showLine = !0),
      (this.drawActiveElementsOnTop = !0),
      this.describe(t),
      this.apply(e);
  }
  set(t, e) {
    return Fe(this, t, e);
  }
  get(t) {
    return Ie(this, t);
  }
  describe(t, e) {
    return Fe($e, t, e);
  }
  override(t, e) {
    return Fe(Re, t, e);
  }
  route(t, e, i, s) {
    const n = Ie(this, t),
      o = Ie(this, i),
      a = "_" + e;
    Object.defineProperties(n, {
      [a]: { value: n[e], writable: !0 },
      [e]: {
        enumerable: !0,
        get() {
          const t = this[a],
            e = o[s];
          return ft(t) ? Object.assign({}, e, t) : mt(t, e);
        },
        set(t) {
          this[a] = t;
        },
      },
    });
  }
  apply(t) {
    t.forEach((t) => t(this));
  }
}
var ze = new He(
  {
    _scriptable: (t) => !t.startsWith("on"),
    _indexable: (t) => "events" !== t,
    hover: { _fallback: "interaction" },
    interaction: { _scriptable: !1, _indexable: !1 },
  },
  [
    function (t) {
      t.set("animation", {
        delay: void 0,
        duration: 1e3,
        easing: "easeOutQuart",
        fn: void 0,
        from: void 0,
        loop: void 0,
        to: void 0,
        type: void 0,
      }),
        t.describe("animation", {
          _fallback: !1,
          _indexable: !1,
          _scriptable: (t) =>
            "onProgress" !== t && "onComplete" !== t && "fn" !== t,
        }),
        t.set("animations", {
          colors: { type: "color", properties: Te },
          numbers: { type: "number", properties: De },
        }),
        t.describe("animations", { _fallback: "animation" }),
        t.set("transitions", {
          active: { animation: { duration: 400 } },
          resize: { animation: { duration: 0 } },
          show: {
            animations: {
              colors: { from: "transparent" },
              visible: { type: "boolean", duration: 0 },
            },
          },
          hide: {
            animations: {
              colors: { to: "transparent" },
              visible: { type: "boolean", easing: "linear", fn: (t) => 0 | t },
            },
          },
        });
    },
    function (t) {
      t.set("layout", {
        autoPadding: !0,
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
      });
    },
    function (t) {
      t.set("scale", {
        display: !0,
        offset: !1,
        reverse: !1,
        beginAtZero: !1,
        bounds: "ticks",
        grace: 0,
        grid: {
          display: !0,
          lineWidth: 1,
          drawOnChartArea: !0,
          drawTicks: !0,
          tickLength: 8,
          tickWidth: (t, e) => e.lineWidth,
          tickColor: (t, e) => e.color,
          offset: !1,
        },
        border: { display: !0, dash: [], dashOffset: 0, width: 1 },
        title: { display: !1, text: "", padding: { top: 4, bottom: 4 } },
        ticks: {
          minRotation: 0,
          maxRotation: 50,
          mirror: !1,
          textStrokeWidth: 0,
          textStrokeColor: "",
          padding: 3,
          display: !0,
          autoSkip: !0,
          autoSkipPadding: 3,
          labelOffset: 0,
          callback: Ee.formatters.values,
          minor: {},
          major: {},
          align: "center",
          crossAlign: "near",
          showLabelBackdrop: !1,
          backdropColor: "rgba(255, 255, 255, 0.75)",
          backdropPadding: 2,
        },
      }),
        t.route("scale.ticks", "color", "", "color"),
        t.route("scale.grid", "color", "", "borderColor"),
        t.route("scale.border", "color", "", "borderColor"),
        t.route("scale.title", "color", "", "color"),
        t.describe("scale", {
          _fallback: !1,
          _scriptable: (t) =>
            !t.startsWith("before") &&
            !t.startsWith("after") &&
            "callback" !== t &&
            "parser" !== t,
          _indexable: (t) =>
            "borderDash" !== t && "tickBorderDash" !== t && "dash" !== t,
        }),
        t.describe("scales", { _fallback: "scale" }),
        t.describe("scale.ticks", {
          _scriptable: (t) => "backdropPadding" !== t && "callback" !== t,
          _indexable: (t) => "backdropPadding" !== t,
        });
    },
  ]
);
function Be(t, e, i, s, n) {
  let o = e[n];
  return (
    o || ((o = e[n] = t.measureText(n).width), i.push(n)), o > s && (s = o), s
  );
}
function Ve(t, e, i, s) {
  let n = ((s = s || {}).data = s.data || {}),
    o = (s.garbageCollect = s.garbageCollect || []);
  s.font !== e &&
    ((n = s.data = {}), (o = s.garbageCollect = []), (s.font = e)),
    t.save(),
    (t.font = e);
  let a = 0;
  const r = i.length;
  let l, h, c, d, u;
  for (l = 0; l < r; l++)
    if (((d = i[l]), null != d && !0 !== ut(d))) a = Be(t, n, o, a, d);
    else if (ut(d))
      for (h = 0, c = d.length; h < c; h++)
        (u = d[h]), null == u || ut(u) || (a = Be(t, n, o, a, u));
  t.restore();
  const f = o.length / 2;
  if (f > i.length) {
    for (l = 0; l < f; l++) delete n[o[l]];
    o.splice(0, f);
  }
  return a;
}
function We(t, e, i) {
  const s = t.currentDevicePixelRatio,
    n = 0 !== i ? Math.max(i / 2, 0.5) : 0;
  return Math.round((e - n) * s) / s + n;
}
function je(t, e) {
  (e = e || t.getContext("2d")).save(),
    e.resetTransform(),
    e.clearRect(0, 0, t.width, t.height),
    e.restore();
}
function Ne(t, e, i, s) {
  qe(t, e, i, s, null);
}
function qe(t, e, i, s, n) {
  let o, a, r, l, h, c, d, u;
  const f = e.pointStyle,
    p = e.rotation,
    g = e.radius;
  let m = (p || 0) * Ht;
  if (
    f &&
    "object" == typeof f &&
    ((o = f.toString()),
    "[object HTMLImageElement]" === o || "[object HTMLCanvasElement]" === o)
  )
    return (
      t.save(),
      t.translate(i, s),
      t.rotate(m),
      t.drawImage(f, -f.width / 2, -f.height / 2, f.width, f.height),
      void t.restore()
    );
  if (!(isNaN(g) || g <= 0)) {
    switch ((t.beginPath(), f)) {
      default:
        n ? t.ellipse(i, s, n / 2, g, 0, 0, $t) : t.arc(i, s, g, 0, $t),
          t.closePath();
        break;
      case "triangle":
        (c = n ? n / 2 : g),
          t.moveTo(i + Math.sin(m) * c, s - Math.cos(m) * g),
          (m += Vt),
          t.lineTo(i + Math.sin(m) * c, s - Math.cos(m) * g),
          (m += Vt),
          t.lineTo(i + Math.sin(m) * c, s - Math.cos(m) * g),
          t.closePath();
        break;
      case "rectRounded":
        (h = 0.516 * g),
          (l = g - h),
          (a = Math.cos(m + Bt) * l),
          (d = Math.cos(m + Bt) * (n ? n / 2 - h : l)),
          (r = Math.sin(m + Bt) * l),
          (u = Math.sin(m + Bt) * (n ? n / 2 - h : l)),
          t.arc(i - d, s - r, h, m - Rt, m - zt),
          t.arc(i + u, s - a, h, m - zt, m),
          t.arc(i + d, s + r, h, m, m + zt),
          t.arc(i - u, s + a, h, m + zt, m + Rt),
          t.closePath();
        break;
      case "rect":
        if (!p) {
          (l = Math.SQRT1_2 * g),
            (c = n ? n / 2 : l),
            t.rect(i - c, s - l, 2 * c, 2 * l);
          break;
        }
        m += Bt;
      case "rectRot":
        (d = Math.cos(m) * (n ? n / 2 : g)),
          (a = Math.cos(m) * g),
          (r = Math.sin(m) * g),
          (u = Math.sin(m) * (n ? n / 2 : g)),
          t.moveTo(i - d, s - r),
          t.lineTo(i + u, s - a),
          t.lineTo(i + d, s + r),
          t.lineTo(i - u, s + a),
          t.closePath();
        break;
      case "crossRot":
        m += Bt;
      case "cross":
        (d = Math.cos(m) * (n ? n / 2 : g)),
          (a = Math.cos(m) * g),
          (r = Math.sin(m) * g),
          (u = Math.sin(m) * (n ? n / 2 : g)),
          t.moveTo(i - d, s - r),
          t.lineTo(i + d, s + r),
          t.moveTo(i + u, s - a),
          t.lineTo(i - u, s + a);
        break;
      case "star":
        (d = Math.cos(m) * (n ? n / 2 : g)),
          (a = Math.cos(m) * g),
          (r = Math.sin(m) * g),
          (u = Math.sin(m) * (n ? n / 2 : g)),
          t.moveTo(i - d, s - r),
          t.lineTo(i + d, s + r),
          t.moveTo(i + u, s - a),
          t.lineTo(i - u, s + a),
          (m += Bt),
          (d = Math.cos(m) * (n ? n / 2 : g)),
          (a = Math.cos(m) * g),
          (r = Math.sin(m) * g),
          (u = Math.sin(m) * (n ? n / 2 : g)),
          t.moveTo(i - d, s - r),
          t.lineTo(i + d, s + r),
          t.moveTo(i + u, s - a),
          t.lineTo(i - u, s + a);
        break;
      case "line":
        (a = n ? n / 2 : Math.cos(m) * g),
          (r = Math.sin(m) * g),
          t.moveTo(i - a, s - r),
          t.lineTo(i + a, s + r);
        break;
      case "dash":
        t.moveTo(i, s),
          t.lineTo(i + Math.cos(m) * (n ? n / 2 : g), s + Math.sin(m) * g);
        break;
      case !1:
        t.closePath();
    }
    t.fill(), e.borderWidth > 0 && t.stroke();
  }
}
function Ye(t, e, i) {
  return (
    (i = i || 0.5),
    !e ||
      (t &&
        t.x > e.left - i &&
        t.x < e.right + i &&
        t.y > e.top - i &&
        t.y < e.bottom + i)
  );
}
function Xe(t, e) {
  t.save(),
    t.beginPath(),
    t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top),
    t.clip();
}
function Ue(t) {
  t.restore();
}
function Ge(t, e, i, s, n) {
  if (!e) return t.lineTo(i.x, i.y);
  if ("middle" === n) {
    const s = (e.x + i.x) / 2;
    t.lineTo(s, e.y), t.lineTo(s, i.y);
  } else ("after" === n) != !!s ? t.lineTo(e.x, i.y) : t.lineTo(i.x, e.y);
  t.lineTo(i.x, i.y);
}
function Je(t, e, i, s) {
  if (!e) return t.lineTo(i.x, i.y);
  t.bezierCurveTo(
    s ? e.cp1x : e.cp2x,
    s ? e.cp1y : e.cp2y,
    s ? i.cp2x : i.cp1x,
    s ? i.cp2y : i.cp1y,
    i.x,
    i.y
  );
}
function Ke(t, e, i, s, n, o = {}) {
  const a = ut(e) ? e : [e],
    r = o.strokeWidth > 0 && "" !== o.strokeColor;
  let l, h;
  for (
    t.save(),
      t.font = n.string,
      (function (t, e) {
        e.translation && t.translate(e.translation[0], e.translation[1]);
        dt(e.rotation) || t.rotate(e.rotation);
        e.color && (t.fillStyle = e.color);
        e.textAlign && (t.textAlign = e.textAlign);
        e.textBaseline && (t.textBaseline = e.textBaseline);
      })(t, o),
      l = 0;
    l < a.length;
    ++l
  )
    (h = a[l]),
      o.backdrop && Qe(t, o.backdrop),
      r &&
        (o.strokeColor && (t.strokeStyle = o.strokeColor),
        dt(o.strokeWidth) || (t.lineWidth = o.strokeWidth),
        t.strokeText(h, i, s, o.maxWidth)),
      t.fillText(h, i, s, o.maxWidth),
      Ze(t, i, s, h, o),
      (s += n.lineHeight);
  t.restore();
}
function Ze(t, e, i, s, n) {
  if (n.strikethrough || n.underline) {
    const o = t.measureText(s),
      a = e - o.actualBoundingBoxLeft,
      r = e + o.actualBoundingBoxRight,
      l = i - o.actualBoundingBoxAscent,
      h = i + o.actualBoundingBoxDescent,
      c = n.strikethrough ? (l + h) / 2 : h;
    (t.strokeStyle = t.fillStyle),
      t.beginPath(),
      (t.lineWidth = n.decorationWidth || 2),
      t.moveTo(a, c),
      t.lineTo(r, c),
      t.stroke();
  }
}
function Qe(t, e) {
  const i = t.fillStyle;
  (t.fillStyle = e.color),
    t.fillRect(e.left, e.top, e.width, e.height),
    (t.fillStyle = i);
}
function ti(t, e) {
  const { x: i, y: s, w: n, h: o, radius: a } = e;
  t.arc(i + a.topLeft, s + a.topLeft, a.topLeft, -zt, Rt, !0),
    t.lineTo(i, s + o - a.bottomLeft),
    t.arc(i + a.bottomLeft, s + o - a.bottomLeft, a.bottomLeft, Rt, zt, !0),
    t.lineTo(i + n - a.bottomRight, s + o),
    t.arc(
      i + n - a.bottomRight,
      s + o - a.bottomRight,
      a.bottomRight,
      zt,
      0,
      !0
    ),
    t.lineTo(i + n, s + a.topRight),
    t.arc(i + n - a.topRight, s + a.topRight, a.topRight, 0, -zt, !0),
    t.lineTo(i + a.topLeft, s);
}
const ei = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,
  ii = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function si(t, e) {
  const i = ("" + t).match(ei);
  if (!i || "normal" === i[1]) return 1.2 * e;
  switch (((t = +i[2]), i[3])) {
    case "px":
      return t;
    case "%":
      t /= 100;
  }
  return e * t;
}
const ni = (t) => +t || 0;
function oi(t, e) {
  const i = {},
    s = ft(e),
    n = s ? Object.keys(e) : e,
    o = ft(t) ? (s ? (i) => mt(t[i], t[e[i]]) : (e) => t[e]) : () => t;
  for (const t of n) i[t] = ni(o(t));
  return i;
}
function ai(t) {
  return oi(t, { top: "y", right: "x", bottom: "y", left: "x" });
}
function ri(t) {
  return oi(t, ["topLeft", "topRight", "bottomLeft", "bottomRight"]);
}
function li(t) {
  const e = ai(t);
  return (e.width = e.left + e.right), (e.height = e.top + e.bottom), e;
}
function hi(t, e) {
  (t = t || {}), (e = e || ze.font);
  let i = mt(t.size, e.size);
  "string" == typeof i && (i = parseInt(i, 10));
  let s = mt(t.style, e.style);
  s &&
    !("" + s).match(ii) &&
    (console.warn('Invalid font style specified: "' + s + '"'), (s = void 0));
  const n = {
    family: mt(t.family, e.family),
    lineHeight: si(mt(t.lineHeight, e.lineHeight), i),
    size: i,
    style: s,
    weight: mt(t.weight, e.weight),
    string: "",
  };
  return (
    (n.string = (function (t) {
      return !t || dt(t.size) || dt(t.family)
        ? null
        : (t.style ? t.style + " " : "") +
            (t.weight ? t.weight + " " : "") +
            t.size +
            "px " +
            t.family;
    })(n)),
    n
  );
}
function ci(t, e, i, s) {
  let n,
    o,
    a,
    r = !0;
  for (n = 0, o = t.length; n < o; ++n)
    if (
      ((a = t[n]),
      void 0 !== a &&
        (void 0 !== e && "function" == typeof a && ((a = a(e)), (r = !1)),
        void 0 !== i && ut(a) && ((a = a[i % a.length]), (r = !1)),
        void 0 !== a))
    )
      return s && !r && (s.cacheable = !1), a;
}
function di(t, e, i) {
  const { min: s, max: n } = t,
    o = bt(e, (n - s) / 2),
    a = (t, e) => (i && 0 === t ? 0 : t + e);
  return { min: a(s, -Math.abs(o)), max: a(n, o) };
}
function ui(t, e) {
  return Object.assign(Object.create(t), e);
}
function fi(t, e = [""], i = t, s, n = () => t[0]) {
  Ot(s) || (s = ki("_fallback", t));
  const o = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: t,
    _rootScopes: i,
    _fallback: s,
    _getTarget: n,
    override: (n) => fi([n, ...t], e, i, s),
  };
  return new Proxy(o, {
    deleteProperty: (e, i) => (delete e[i], delete e._keys, delete t[0][i], !0),
    get: (i, s) =>
      xi(i, s, () =>
        (function (t, e, i, s) {
          let n;
          for (const o of e)
            if (((n = ki(mi(o, t), i)), Ot(n)))
              return bi(t, n) ? wi(i, s, t, n) : n;
        })(s, e, t, i)
      ),
    getOwnPropertyDescriptor: (t, e) =>
      Reflect.getOwnPropertyDescriptor(t._scopes[0], e),
    getPrototypeOf: () => Reflect.getPrototypeOf(t[0]),
    has: (t, e) => Si(t).includes(e),
    ownKeys: (t) => Si(t),
    set(t, e, i) {
      const s = t._storage || (t._storage = n());
      return (t[e] = s[e] = i), delete t._keys, !0;
    },
  });
}
function pi(t, e, i, s) {
  const n = {
    _cacheable: !1,
    _proxy: t,
    _context: e,
    _subProxy: i,
    _stack: new Set(),
    _descriptors: gi(t, s),
    setContext: (e) => pi(t, e, i, s),
    override: (n) => pi(t.override(n), e, i, s),
  };
  return new Proxy(n, {
    deleteProperty: (e, i) => (delete e[i], delete t[i], !0),
    get: (t, e, i) =>
      xi(t, e, () =>
        (function (t, e, i) {
          const { _proxy: s, _context: n, _subProxy: o, _descriptors: a } = t;
          let r = s[e];
          Lt(r) &&
            a.isScriptable(e) &&
            (r = (function (t, e, i, s) {
              const { _proxy: n, _context: o, _subProxy: a, _stack: r } = i;
              if (r.has(t))
                throw new Error(
                  "Recursion detected: " + Array.from(r).join("->") + "->" + t
                );
              r.add(t),
                (e = e(o, a || s)),
                r.delete(t),
                bi(t, e) && (e = wi(n._scopes, n, t, e));
              return e;
            })(e, r, t, i));
          ut(r) &&
            r.length &&
            (r = (function (t, e, i, s) {
              const {
                _proxy: n,
                _context: o,
                _subProxy: a,
                _descriptors: r,
              } = i;
              if (Ot(o.index) && s(t)) e = e[o.index % e.length];
              else if (ft(e[0])) {
                const i = e,
                  s = n._scopes.filter((t) => t !== i);
                e = [];
                for (const l of i) {
                  const i = wi(s, n, t, l);
                  e.push(pi(i, o, a && a[t], r));
                }
              }
              return e;
            })(e, r, t, a.isIndexable));
          bi(e, r) && (r = pi(r, n, o && o[e], a));
          return r;
        })(t, e, i)
      ),
    getOwnPropertyDescriptor: (e, i) =>
      e._descriptors.allKeys
        ? Reflect.has(t, i)
          ? { enumerable: !0, configurable: !0 }
          : void 0
        : Reflect.getOwnPropertyDescriptor(t, i),
    getPrototypeOf: () => Reflect.getPrototypeOf(t),
    has: (e, i) => Reflect.has(t, i),
    ownKeys: () => Reflect.ownKeys(t),
    set: (e, i, s) => ((t[i] = s), delete e[i], !0),
  });
}
function gi(t, e = { scriptable: !0, indexable: !0 }) {
  const {
    _scriptable: i = e.scriptable,
    _indexable: s = e.indexable,
    _allKeys: n = e.allKeys,
  } = t;
  return {
    allKeys: n,
    scriptable: i,
    indexable: s,
    isScriptable: Lt(i) ? i : () => i,
    isIndexable: Lt(s) ? s : () => s,
  };
}
const mi = (t, e) => (t ? t + Tt(e) : e),
  bi = (t, e) =>
    ft(e) &&
    "adapters" !== t &&
    (null === Object.getPrototypeOf(e) || e.constructor === Object);
function xi(t, e, i) {
  if (Object.prototype.hasOwnProperty.call(t, e)) return t[e];
  const s = i();
  return (t[e] = s), s;
}
function yi(t, e, i) {
  return Lt(t) ? t(e, i) : t;
}
const _i = (t, e) => (!0 === t ? e : "string" == typeof t ? Dt(e, t) : void 0);
function vi(t, e, i, s, n) {
  for (const o of e) {
    const e = _i(i, o);
    if (e) {
      t.add(e);
      const o = yi(e._fallback, i, n);
      if (Ot(o) && o !== i && o !== s) return o;
    } else if (!1 === e && Ot(s) && i !== s) return null;
  }
  return !1;
}
function wi(t, e, i, s) {
  const n = e._rootScopes,
    o = yi(e._fallback, i, s),
    a = [...t, ...n],
    r = new Set();
  r.add(s);
  let l = Mi(r, a, i, o || i, s);
  return (
    null !== l &&
    (!Ot(o) || o === i || ((l = Mi(r, a, o, l, s)), null !== l)) &&
    fi(Array.from(r), [""], n, o, () =>
      (function (t, e, i) {
        const s = t._getTarget();
        e in s || (s[e] = {});
        const n = s[e];
        return ut(n) && ft(i) ? i : n || {};
      })(e, i, s)
    )
  );
}
function Mi(t, e, i, s, n) {
  for (; i; ) i = vi(t, e, i, s, n);
  return i;
}
function ki(t, e) {
  for (const i of e) {
    if (!i) continue;
    const e = i[t];
    if (Ot(e)) return e;
  }
}
function Si(t) {
  let e = t._keys;
  return (
    e ||
      (e = t._keys =
        (function (t) {
          const e = new Set();
          for (const i of t)
            for (const t of Object.keys(i).filter((t) => !t.startsWith("_")))
              e.add(t);
          return Array.from(e);
        })(t._scopes)),
    e
  );
}
function Pi(t, e, i, s) {
  const { iScale: n } = t,
    { key: o = "r" } = this._parsing,
    a = new Array(s);
  let r, l, h, c;
  for (r = 0, l = s; r < l; ++r)
    (h = r + i), (c = e[h]), (a[r] = { r: n.parse(Dt(c, o), h) });
  return a;
}
const Ci = Number.EPSILON || 1e-14,
  Di = (t, e) => e < t.length && !t[e].skip && t[e],
  Ti = (t) => ("x" === t ? "y" : "x");
function Oi(t, e, i, s) {
  const n = t.skip ? e : t,
    o = e,
    a = i.skip ? e : i,
    r = te(o, n),
    l = te(a, o);
  let h = r / (r + l),
    c = l / (r + l);
  (h = isNaN(h) ? 0 : h), (c = isNaN(c) ? 0 : c);
  const d = s * h,
    u = s * c;
  return {
    previous: { x: o.x - d * (a.x - n.x), y: o.y - d * (a.y - n.y) },
    next: { x: o.x + u * (a.x - n.x), y: o.y + u * (a.y - n.y) },
  };
}
function Li(t, e = "x") {
  const i = Ti(e),
    s = t.length,
    n = Array(s).fill(0),
    o = Array(s);
  let a,
    r,
    l,
    h = Di(t, 0);
  for (a = 0; a < s; ++a)
    if (((r = l), (l = h), (h = Di(t, a + 1)), l)) {
      if (h) {
        const t = h[e] - l[e];
        n[a] = 0 !== t ? (h[i] - l[i]) / t : 0;
      }
      o[a] = r
        ? h
          ? jt(n[a - 1]) !== jt(n[a])
            ? 0
            : (n[a - 1] + n[a]) / 2
          : n[a - 1]
        : n[a];
    }
  !(function (t, e, i) {
    const s = t.length;
    let n,
      o,
      a,
      r,
      l,
      h = Di(t, 0);
    for (let c = 0; c < s - 1; ++c)
      (l = h),
        (h = Di(t, c + 1)),
        l &&
          h &&
          (Nt(e[c], 0, Ci)
            ? (i[c] = i[c + 1] = 0)
            : ((n = i[c] / e[c]),
              (o = i[c + 1] / e[c]),
              (r = Math.pow(n, 2) + Math.pow(o, 2)),
              r <= 9 ||
                ((a = 3 / Math.sqrt(r)),
                (i[c] = n * a * e[c]),
                (i[c + 1] = o * a * e[c]))));
  })(t, n, o),
    (function (t, e, i = "x") {
      const s = Ti(i),
        n = t.length;
      let o,
        a,
        r,
        l = Di(t, 0);
      for (let h = 0; h < n; ++h) {
        if (((a = r), (r = l), (l = Di(t, h + 1)), !r)) continue;
        const n = r[i],
          c = r[s];
        a &&
          ((o = (n - a[i]) / 3),
          (r[`cp1${i}`] = n - o),
          (r[`cp1${s}`] = c - o * e[h])),
          l &&
            ((o = (l[i] - n) / 3),
            (r[`cp2${i}`] = n + o),
            (r[`cp2${s}`] = c + o * e[h]));
      }
    })(t, o, e);
}
function Ai(t, e, i) {
  return Math.max(Math.min(t, i), e);
}
function Ei(t, e, i, s, n) {
  let o, a, r, l;
  if (
    (e.spanGaps && (t = t.filter((t) => !t.skip)),
    "monotone" === e.cubicInterpolationMode)
  )
    Li(t, n);
  else {
    let i = s ? t[t.length - 1] : t[0];
    for (o = 0, a = t.length; o < a; ++o)
      (r = t[o]),
        (l = Oi(i, r, t[Math.min(o + 1, a - (s ? 0 : 1)) % a], e.tension)),
        (r.cp1x = l.previous.x),
        (r.cp1y = l.previous.y),
        (r.cp2x = l.next.x),
        (r.cp2y = l.next.y),
        (i = r);
  }
  e.capBezierPoints &&
    (function (t, e) {
      let i,
        s,
        n,
        o,
        a,
        r = Ye(t[0], e);
      for (i = 0, s = t.length; i < s; ++i)
        (a = o),
          (o = r),
          (r = i < s - 1 && Ye(t[i + 1], e)),
          o &&
            ((n = t[i]),
            a &&
              ((n.cp1x = Ai(n.cp1x, e.left, e.right)),
              (n.cp1y = Ai(n.cp1y, e.top, e.bottom))),
            r &&
              ((n.cp2x = Ai(n.cp2x, e.left, e.right)),
              (n.cp2y = Ai(n.cp2y, e.top, e.bottom))));
    })(t, i);
}
function Ri() {
  return "undefined" != typeof window && "undefined" != typeof document;
}
function $i(t) {
  let e = t.parentNode;
  return e && "[object ShadowRoot]" === e.toString() && (e = e.host), e;
}
function Ii(t, e, i) {
  let s;
  return (
    "string" == typeof t
      ? ((s = parseInt(t, 10)),
        -1 !== t.indexOf("%") && (s = (s / 100) * e.parentNode[i]))
      : (s = t),
    s
  );
}
const Fi = (t) => t.ownerDocument.defaultView.getComputedStyle(t, null);
const Hi = ["top", "right", "bottom", "left"];
function zi(t, e, i) {
  const s = {};
  i = i ? "-" + i : "";
  for (let n = 0; n < 4; n++) {
    const o = Hi[n];
    s[o] = parseFloat(t[e + "-" + o + i]) || 0;
  }
  return (s.width = s.left + s.right), (s.height = s.top + s.bottom), s;
}
const Bi = (t, e, i) => (t > 0 || e > 0) && (!i || !i.shadowRoot);
function Vi(t, e) {
  if ("native" in t) return t;
  const { canvas: i, currentDevicePixelRatio: s } = e,
    n = Fi(i),
    o = "border-box" === n.boxSizing,
    a = zi(n, "padding"),
    r = zi(n, "border", "width"),
    {
      x: l,
      y: h,
      box: c,
    } = (function (t, e) {
      const i = t.touches,
        s = i && i.length ? i[0] : t,
        { offsetX: n, offsetY: o } = s;
      let a,
        r,
        l = !1;
      if (Bi(n, o, t.target)) (a = n), (r = o);
      else {
        const t = e.getBoundingClientRect();
        (a = s.clientX - t.left), (r = s.clientY - t.top), (l = !0);
      }
      return { x: a, y: r, box: l };
    })(t, i),
    d = a.left + (c && r.left),
    u = a.top + (c && r.top);
  let { width: f, height: p } = e;
  return (
    o && ((f -= a.width + r.width), (p -= a.height + r.height)),
    {
      x: Math.round((((l - d) / f) * i.width) / s),
      y: Math.round((((h - u) / p) * i.height) / s),
    }
  );
}
const Wi = (t) => Math.round(10 * t) / 10;
function ji(t, e, i, s) {
  const n = Fi(t),
    o = zi(n, "margin"),
    a = Ii(n.maxWidth, t, "clientWidth") || Ft,
    r = Ii(n.maxHeight, t, "clientHeight") || Ft,
    l = (function (t, e, i) {
      let s, n;
      if (void 0 === e || void 0 === i) {
        const o = $i(t);
        if (o) {
          const t = o.getBoundingClientRect(),
            a = Fi(o),
            r = zi(a, "border", "width"),
            l = zi(a, "padding");
          (e = t.width - l.width - r.width),
            (i = t.height - l.height - r.height),
            (s = Ii(a.maxWidth, o, "clientWidth")),
            (n = Ii(a.maxHeight, o, "clientHeight"));
        } else (e = t.clientWidth), (i = t.clientHeight);
      }
      return { width: e, height: i, maxWidth: s || Ft, maxHeight: n || Ft };
    })(t, e, i);
  let { width: h, height: c } = l;
  if ("content-box" === n.boxSizing) {
    const t = zi(n, "border", "width"),
      e = zi(n, "padding");
    (h -= e.width + t.width), (c -= e.height + t.height);
  }
  (h = Math.max(0, h - o.width)),
    (c = Math.max(0, s ? h / s : c - o.height)),
    (h = Wi(Math.min(h, a, l.maxWidth))),
    (c = Wi(Math.min(c, r, l.maxHeight))),
    h && !c && (c = Wi(h / 2));
  return (
    (void 0 !== e || void 0 !== i) &&
      s &&
      l.height &&
      c > l.height &&
      ((c = l.height), (h = Wi(Math.floor(c * s)))),
    { width: h, height: c }
  );
}
function Ni(t, e, i) {
  const s = e || 1,
    n = Math.floor(t.height * s),
    o = Math.floor(t.width * s);
  (t.height = Math.floor(t.height)), (t.width = Math.floor(t.width));
  const a = t.canvas;
  return (
    a.style &&
      (i || (!a.style.height && !a.style.width)) &&
      ((a.style.height = `${t.height}px`), (a.style.width = `${t.width}px`)),
    (t.currentDevicePixelRatio !== s || a.height !== n || a.width !== o) &&
      ((t.currentDevicePixelRatio = s),
      (a.height = n),
      (a.width = o),
      t.ctx.setTransform(s, 0, 0, s, 0, 0),
      !0)
  );
}
const qi = (function () {
  let t = !1;
  try {
    const e = {
      get passive() {
        return (t = !0), !1;
      },
    };
    window.addEventListener("test", null, e),
      window.removeEventListener("test", null, e);
  } catch (t) {}
  return t;
})();
function Yi(t, e) {
  const i = (function (t, e) {
      return Fi(t).getPropertyValue(e);
    })(t, e),
    s = i && i.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
function Xi(t, e, i, s) {
  return { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) };
}
function Ui(t, e, i, s) {
  return {
    x: t.x + i * (e.x - t.x),
    y:
      "middle" === s
        ? i < 0.5
          ? t.y
          : e.y
        : "after" === s
        ? i < 1
          ? t.y
          : e.y
        : i > 0
        ? e.y
        : t.y,
  };
}
function Gi(t, e, i, s) {
  const n = { x: t.cp2x, y: t.cp2y },
    o = { x: e.cp1x, y: e.cp1y },
    a = Xi(t, n, i),
    r = Xi(n, o, i),
    l = Xi(o, e, i),
    h = Xi(a, r, i),
    c = Xi(r, l, i);
  return Xi(h, c, i);
}
const Ji = function (t, e) {
    return {
      x: (i) => t + t + e - i,
      setWidth(t) {
        e = t;
      },
      textAlign: (t) => ("center" === t ? t : "right" === t ? "left" : "right"),
      xPlus: (t, e) => t - e,
      leftForLtr: (t, e) => t - e,
    };
  },
  Ki = function () {
    return {
      x: (t) => t,
      setWidth(t) {},
      textAlign: (t) => t,
      xPlus: (t, e) => t + e,
      leftForLtr: (t, e) => t,
    };
  };
function Zi(t, e, i) {
  return t ? Ji(e, i) : Ki();
}
function Qi(t, e) {
  let i, s;
  ("ltr" !== e && "rtl" !== e) ||
    ((i = t.canvas.style),
    (s = [i.getPropertyValue("direction"), i.getPropertyPriority("direction")]),
    i.setProperty("direction", e, "important"),
    (t.prevTextDirection = s));
}
function ts(t, e) {
  void 0 !== e &&
    (delete t.prevTextDirection,
    t.canvas.style.setProperty("direction", e[0], e[1]));
}
function es(t) {
  return "angle" === t
    ? { between: se, compare: ee, normalize: ie }
    : { between: oe, compare: (t, e) => t - e, normalize: (t) => t };
}
function is({ start: t, end: e, count: i, loop: s, style: n }) {
  return {
    start: t % i,
    end: e % i,
    loop: s && (e - t + 1) % i == 0,
    style: n,
  };
}
function ss(t, e, i) {
  if (!i) return [t];
  const { property: s, start: n, end: o } = i,
    a = e.length,
    { compare: r, between: l, normalize: h } = es(s),
    {
      start: c,
      end: d,
      loop: u,
      style: f,
    } = (function (t, e, i) {
      const { property: s, start: n, end: o } = i,
        { between: a, normalize: r } = es(s),
        l = e.length;
      let h,
        c,
        { start: d, end: u, loop: f } = t;
      if (f) {
        for (
          d += l, u += l, h = 0, c = l;
          h < c && a(r(e[d % l][s]), n, o);
          ++h
        )
          d--, u--;
        (d %= l), (u %= l);
      }
      return u < d && (u += l), { start: d, end: u, loop: f, style: t.style };
    })(t, e, i),
    p = [];
  let g,
    m,
    b,
    x = !1,
    y = null;
  const _ = () => x || (l(n, b, g) && 0 !== r(n, b)),
    v = () => !x || 0 === r(o, g) || l(o, b, g);
  for (let t = c, i = c; t <= d; ++t)
    (m = e[t % a]),
      m.skip ||
        ((g = h(m[s])),
        g !== b &&
          ((x = l(g, n, o)),
          null === y && _() && (y = 0 === r(g, n) ? t : i),
          null !== y &&
            v() &&
            (p.push(is({ start: y, end: t, loop: u, count: a, style: f })),
            (y = null)),
          (i = t),
          (b = g)));
  return (
    null !== y && p.push(is({ start: y, end: d, loop: u, count: a, style: f })),
    p
  );
}
function ns(t, e) {
  const i = [],
    s = t.segments;
  for (let n = 0; n < s.length; n++) {
    const o = ss(s[n], t.points, e);
    o.length && i.push(...o);
  }
  return i;
}
function os(t, e) {
  const i = t.points,
    s = t.options.spanGaps,
    n = i.length;
  if (!n) return [];
  const o = !!t._loop,
    { start: a, end: r } = (function (t, e, i, s) {
      let n = 0,
        o = e - 1;
      if (i && !s) for (; n < e && !t[n].skip; ) n++;
      for (; n < e && t[n].skip; ) n++;
      for (n %= e, i && (o += n); o > n && t[o % e].skip; ) o--;
      return (o %= e), { start: n, end: o };
    })(i, n, o, s);
  if (!0 === s) return as(t, [{ start: a, end: r, loop: o }], i, e);
  return as(
    t,
    (function (t, e, i, s) {
      const n = t.length,
        o = [];
      let a,
        r = e,
        l = t[e];
      for (a = e + 1; a <= i; ++a) {
        const i = t[a % n];
        i.skip || i.stop
          ? l.skip ||
            ((s = !1),
            o.push({ start: e % n, end: (a - 1) % n, loop: s }),
            (e = r = i.stop ? a : null))
          : ((r = a), l.skip && (e = a)),
          (l = i);
      }
      return null !== r && o.push({ start: e % n, end: r % n, loop: s }), o;
    })(i, a, r < a ? r + n : r, !!t._fullLoop && 0 === a && r === n - 1),
    i,
    e
  );
}
function as(t, e, i, s) {
  return s && s.setContext && i
    ? (function (t, e, i, s) {
        const n = t._chart.getContext(),
          o = rs(t.options),
          {
            _datasetIndex: a,
            options: { spanGaps: r },
          } = t,
          l = i.length,
          h = [];
        let c = o,
          d = e[0].start,
          u = d;
        function f(t, e, s, n) {
          const o = r ? -1 : 1;
          if (t !== e) {
            for (t += l; i[t % l].skip; ) t -= o;
            for (; i[e % l].skip; ) e += o;
            t % l != e % l &&
              (h.push({ start: t % l, end: e % l, loop: s, style: n }),
              (c = n),
              (d = e % l));
          }
        }
        for (const t of e) {
          d = r ? d : t.start;
          let e,
            o = i[d % l];
          for (u = d + 1; u <= t.end; u++) {
            const r = i[u % l];
            (e = rs(
              s.setContext(
                ui(n, {
                  type: "segment",
                  p0: o,
                  p1: r,
                  p0DataIndex: (u - 1) % l,
                  p1DataIndex: u % l,
                  datasetIndex: a,
                })
              )
            )),
              ls(e, c) && f(d, u - 1, t.loop, c),
              (o = r),
              (c = e);
          }
          d < u - 1 && f(d, u - 1, t.loop, c);
        }
        return h;
      })(t, e, i, s)
    : e;
}
function rs(t) {
  return {
    backgroundColor: t.backgroundColor,
    borderCapStyle: t.borderCapStyle,
    borderDash: t.borderDash,
    borderDashOffset: t.borderDashOffset,
    borderJoinStyle: t.borderJoinStyle,
    borderWidth: t.borderWidth,
    borderColor: t.borderColor,
  };
}
function ls(t, e) {
  return e && JSON.stringify(t) !== JSON.stringify(e);
}
class hs {
  constructor() {
    (this._request = null),
      (this._charts = new Map()),
      (this._running = !1),
      (this._lastDate = void 0);
  }
  _notify(t, e, i, s) {
    const n = e.listeners[s],
      o = e.duration;
    n.forEach((s) =>
      s({
        chart: t,
        initial: e.initial,
        numSteps: o,
        currentStep: Math.min(i - e.start, o),
      })
    );
  }
  _refresh() {
    this._request ||
      ((this._running = !0),
      (this._request = fe.call(window, () => {
        this._update(),
          (this._request = null),
          this._running && this._refresh();
      })));
  }
  _update(t = Date.now()) {
    let e = 0;
    this._charts.forEach((i, s) => {
      if (!i.running || !i.items.length) return;
      const n = i.items;
      let o,
        a = n.length - 1,
        r = !1;
      for (; a >= 0; --a)
        (o = n[a]),
          o._active
            ? (o._total > i.duration && (i.duration = o._total),
              o.tick(t),
              (r = !0))
            : ((n[a] = n[n.length - 1]), n.pop());
      r && (s.draw(), this._notify(s, i, t, "progress")),
        n.length ||
          ((i.running = !1),
          this._notify(s, i, t, "complete"),
          (i.initial = !1)),
        (e += n.length);
    }),
      (this._lastDate = t),
      0 === e && (this._running = !1);
  }
  _getAnims(t) {
    const e = this._charts;
    let i = e.get(t);
    return (
      i ||
        ((i = {
          running: !1,
          initial: !0,
          items: [],
          listeners: { complete: [], progress: [] },
        }),
        e.set(t, i)),
      i
    );
  }
  listen(t, e, i) {
    this._getAnims(t).listeners[e].push(i);
  }
  add(t, e) {
    e && e.length && this._getAnims(t).items.push(...e);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const e = this._charts.get(t);
    e &&
      ((e.running = !0),
      (e.start = Date.now()),
      (e.duration = e.items.reduce((t, e) => Math.max(t, e._duration), 0)),
      this._refresh());
  }
  running(t) {
    if (!this._running) return !1;
    const e = this._charts.get(t);
    return !!(e && e.running && e.items.length);
  }
  stop(t) {
    const e = this._charts.get(t);
    if (!e || !e.items.length) return;
    const i = e.items;
    let s = i.length - 1;
    for (; s >= 0; --s) i[s].cancel();
    (e.items = []), this._notify(t, e, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var cs = new hs();
const ds = "transparent",
  us = {
    boolean: (t, e, i) => (i > 0.5 ? e : t),
    color(t, e, i) {
      const s = Pe(t || ds),
        n = s.valid && Pe(e || ds);
      return n && n.valid ? n.mix(s, i).hexString() : e;
    },
    number: (t, e, i) => t + (e - t) * i,
  };
class fs {
  constructor(t, e, i, s) {
    const n = e[i];
    s = ci([t.to, s, n, t.from]);
    const o = ci([t.from, n, s]);
    (this._active = !0),
      (this._fn = t.fn || us[t.type || typeof o]),
      (this._easing = ke[t.easing] || ke.linear),
      (this._start = Math.floor(Date.now() + (t.delay || 0))),
      (this._duration = this._total = Math.floor(t.duration)),
      (this._loop = !!t.loop),
      (this._target = e),
      (this._prop = i),
      (this._from = o),
      (this._to = s),
      (this._promises = void 0);
  }
  active() {
    return this._active;
  }
  update(t, e, i) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop],
        n = i - this._start,
        o = this._duration - n;
      (this._start = i),
        (this._duration = Math.floor(Math.max(o, t.duration))),
        (this._total += n),
        (this._loop = !!t.loop),
        (this._to = ci([t.to, e, s, t.from])),
        (this._from = ci([t.from, s, e]));
    }
  }
  cancel() {
    this._active &&
      (this.tick(Date.now()), (this._active = !1), this._notify(!1));
  }
  tick(t) {
    const e = t - this._start,
      i = this._duration,
      s = this._prop,
      n = this._from,
      o = this._loop,
      a = this._to;
    let r;
    if (((this._active = n !== a && (o || e < i)), !this._active))
      return (this._target[s] = a), void this._notify(!0);
    e < 0
      ? (this._target[s] = n)
      : ((r = (e / i) % 2),
        (r = o && r > 1 ? 2 - r : r),
        (r = this._easing(Math.min(1, Math.max(0, r)))),
        (this._target[s] = this._fn(n, a, r)));
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((e, i) => {
      t.push({ res: e, rej: i });
    });
  }
  _notify(t) {
    const e = t ? "res" : "rej",
      i = this._promises || [];
    for (let t = 0; t < i.length; t++) i[t][e]();
  }
}
class ps {
  constructor(t, e) {
    (this._chart = t), (this._properties = new Map()), this.configure(e);
  }
  configure(t) {
    if (!ft(t)) return;
    const e = Object.keys(ze.animation),
      i = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const n = t[s];
      if (!ft(n)) return;
      const o = {};
      for (const t of e) o[t] = n[t];
      ((ut(n.properties) && n.properties) || [s]).forEach((t) => {
        (t !== s && i.has(t)) || i.set(t, o);
      });
    });
  }
  _animateOptions(t, e) {
    const i = e.options,
      s = (function (t, e) {
        if (!e) return;
        let i = t.options;
        if (!i) return void (t.options = e);
        i.$shared &&
          (t.options = i =
            Object.assign({}, i, { $shared: !1, $animations: {} }));
        return i;
      })(t, i);
    if (!s) return [];
    const n = this._createAnimations(s, i);
    return (
      i.$shared &&
        (function (t, e) {
          const i = [],
            s = Object.keys(e);
          for (let e = 0; e < s.length; e++) {
            const n = t[s[e]];
            n && n.active() && i.push(n.wait());
          }
          return Promise.all(i);
        })(t.options.$animations, i).then(
          () => {
            t.options = i;
          },
          () => {}
        ),
      n
    );
  }
  _createAnimations(t, e) {
    const i = this._properties,
      s = [],
      n = t.$animations || (t.$animations = {}),
      o = Object.keys(e),
      a = Date.now();
    let r;
    for (r = o.length - 1; r >= 0; --r) {
      const l = o[r];
      if ("$" === l.charAt(0)) continue;
      if ("options" === l) {
        s.push(...this._animateOptions(t, e));
        continue;
      }
      const h = e[l];
      let c = n[l];
      const d = i.get(l);
      if (c) {
        if (d && c.active()) {
          c.update(d, h, a);
          continue;
        }
        c.cancel();
      }
      d && d.duration
        ? ((n[l] = c = new fs(d, t, l, h)), s.push(c))
        : (t[l] = h);
    }
    return s;
  }
  update(t, e) {
    if (0 === this._properties.size) return void Object.assign(t, e);
    const i = this._createAnimations(t, e);
    return i.length ? (cs.add(this._chart, i), !0) : void 0;
  }
}
function gs(t, e) {
  const i = (t && t.options) || {},
    s = i.reverse,
    n = void 0 === i.min ? e : 0,
    o = void 0 === i.max ? e : 0;
  return { start: s ? o : n, end: s ? n : o };
}
function ms(t, e) {
  const i = [],
    s = t._getSortedDatasetMetas(e);
  let n, o;
  for (n = 0, o = s.length; n < o; ++n) i.push(s[n].index);
  return i;
}
function bs(t, e, i, s = {}) {
  const n = t.keys,
    o = "single" === s.mode;
  let a, r, l, h;
  if (null !== e) {
    for (a = 0, r = n.length; a < r; ++a) {
      if (((l = +n[a]), l === i)) {
        if (s.all) continue;
        break;
      }
      (h = t.values[l]), pt(h) && (o || 0 === e || jt(e) === jt(h)) && (e += h);
    }
    return e;
  }
}
function xs(t, e) {
  const i = t && t.options.stacked;
  return i || (void 0 === i && void 0 !== e.stack);
}
function ys(t, e, i) {
  const s = t[e] || (t[e] = {});
  return s[i] || (s[i] = {});
}
function _s(t, e, i, s) {
  for (const n of e.getMatchingVisibleMetas(s).reverse()) {
    const e = t[n.index];
    if ((i && e > 0) || (!i && e < 0)) return n.index;
  }
  return null;
}
function vs(t, e) {
  const { chart: i, _cachedMeta: s } = t,
    n = i._stacks || (i._stacks = {}),
    { iScale: o, vScale: a, index: r } = s,
    l = o.axis,
    h = a.axis,
    c = (function (t, e, i) {
      return `${t.id}.${e.id}.${i.stack || i.type}`;
    })(o, a, s),
    d = e.length;
  let u;
  for (let t = 0; t < d; ++t) {
    const i = e[t],
      { [l]: o, [h]: d } = i;
    (u = (i._stacks || (i._stacks = {}))[h] = ys(n, c, o)),
      (u[r] = d),
      (u._top = _s(u, a, !0, s.type)),
      (u._bottom = _s(u, a, !1, s.type));
    (u._visualValues || (u._visualValues = {}))[r] = d;
  }
}
function ws(t, e) {
  const i = t.scales;
  return Object.keys(i)
    .filter((t) => i[t].axis === e)
    .shift();
}
function Ms(t, e) {
  const i = t.controller.index,
    s = t.vScale && t.vScale.axis;
  if (s) {
    e = e || t._parsed;
    for (const t of e) {
      const e = t._stacks;
      if (!e || void 0 === e[s] || void 0 === e[s][i]) return;
      delete e[s][i],
        void 0 !== e[s]._visualValues &&
          void 0 !== e[s]._visualValues[i] &&
          delete e[s]._visualValues[i];
    }
  }
}
const ks = (t) => "reset" === t || "none" === t,
  Ss = (t, e) => (e ? t : Object.assign({}, t));
class Ps {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, e) {
    (this.chart = t),
      (this._ctx = t.ctx),
      (this.index = e),
      (this._cachedDataOpts = {}),
      (this._cachedMeta = this.getMeta()),
      (this._type = this._cachedMeta.type),
      (this.options = void 0),
      (this._parsing = !1),
      (this._data = void 0),
      (this._objectData = void 0),
      (this._sharedOptions = void 0),
      (this._drawStart = void 0),
      (this._drawCount = void 0),
      (this.enableOptionSharing = !1),
      (this.supportsDecimation = !1),
      (this.$context = void 0),
      (this._syncList = []),
      (this.datasetElementType = new.target.datasetElementType),
      (this.dataElementType = new.target.dataElementType),
      this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(),
      this.linkScales(),
      (t._stacked = xs(t.vScale, t)),
      this.addElements(),
      this.options.fill &&
        !this.chart.isPluginEnabled("filler") &&
        console.warn(
          "Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options"
        );
  }
  updateIndex(t) {
    this.index !== t && Ms(this._cachedMeta), (this.index = t);
  }
  linkScales() {
    const t = this.chart,
      e = this._cachedMeta,
      i = this.getDataset(),
      s = (t, e, i, s) => ("x" === t ? e : "r" === t ? s : i),
      n = (e.xAxisID = mt(i.xAxisID, ws(t, "x"))),
      o = (e.yAxisID = mt(i.yAxisID, ws(t, "y"))),
      a = (e.rAxisID = mt(i.rAxisID, ws(t, "r"))),
      r = e.indexAxis,
      l = (e.iAxisID = s(r, n, o, a)),
      h = (e.vAxisID = s(r, o, n, a));
    (e.xScale = this.getScaleForId(n)),
      (e.yScale = this.getScaleForId(o)),
      (e.rScale = this.getScaleForId(a)),
      (e.iScale = this.getScaleForId(l)),
      (e.vScale = this.getScaleForId(h));
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const e = this._cachedMeta;
    return t === e.iScale ? e.vScale : e.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && de(this._data, this), t._stacked && Ms(t);
  }
  _dataCheck() {
    const t = this.getDataset(),
      e = t.data || (t.data = []),
      i = this._data;
    if (ft(e))
      this._data = (function (t) {
        const e = Object.keys(t),
          i = new Array(e.length);
        let s, n, o;
        for (s = 0, n = e.length; s < n; ++s)
          (o = e[s]), (i[s] = { x: o, y: t[o] });
        return i;
      })(e);
    else if (i !== e) {
      if (i) {
        de(i, this);
        const t = this._cachedMeta;
        Ms(t), (t._parsed = []);
      }
      e &&
        Object.isExtensible(e) &&
        ((n = this),
        (s = e)._chartjs
          ? s._chartjs.listeners.push(n)
          : (Object.defineProperty(s, "_chartjs", {
              configurable: !0,
              enumerable: !1,
              value: { listeners: [n] },
            }),
            ce.forEach((t) => {
              const e = "_onData" + Tt(t),
                i = s[t];
              Object.defineProperty(s, t, {
                configurable: !0,
                enumerable: !1,
                value(...t) {
                  const n = i.apply(this, t);
                  return (
                    s._chartjs.listeners.forEach((i) => {
                      "function" == typeof i[e] && i[e](...t);
                    }),
                    n
                  );
                },
              });
            }))),
        (this._syncList = []),
        (this._data = e);
    }
    var s, n;
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(),
      this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const e = this._cachedMeta,
      i = this.getDataset();
    let s = !1;
    this._dataCheck();
    const n = e._stacked;
    (e._stacked = xs(e.vScale, e)),
      e.stack !== i.stack && ((s = !0), Ms(e), (e.stack = i.stack)),
      this._resyncElements(t),
      (s || n !== e._stacked) && vs(this, e._parsed);
  }
  configure() {
    const t = this.chart.config,
      e = t.datasetScopeKeys(this._type),
      i = t.getOptionScopes(this.getDataset(), e, !0);
    (this.options = t.createResolver(i, this.getContext())),
      (this._parsing = this.options.parsing),
      (this._cachedDataOpts = {});
  }
  parse(t, e) {
    const { _cachedMeta: i, _data: s } = this,
      { iScale: n, _stacked: o } = i,
      a = n.axis;
    let r,
      l,
      h,
      c = (0 === t && e === s.length) || i._sorted,
      d = t > 0 && i._parsed[t - 1];
    if (!1 === this._parsing) (i._parsed = s), (i._sorted = !0), (h = s);
    else {
      h = ut(s[t])
        ? this.parseArrayData(i, s, t, e)
        : ft(s[t])
        ? this.parseObjectData(i, s, t, e)
        : this.parsePrimitiveData(i, s, t, e);
      const n = () => null === l[a] || (d && l[a] < d[a]);
      for (r = 0; r < e; ++r)
        (i._parsed[r + t] = l = h[r]), c && (n() && (c = !1), (d = l));
      i._sorted = c;
    }
    o && vs(this, h);
  }
  parsePrimitiveData(t, e, i, s) {
    const { iScale: n, vScale: o } = t,
      a = n.axis,
      r = o.axis,
      l = n.getLabels(),
      h = n === o,
      c = new Array(s);
    let d, u, f;
    for (d = 0, u = s; d < u; ++d)
      (f = d + i),
        (c[d] = { [a]: h || n.parse(l[f], f), [r]: o.parse(e[f], f) });
    return c;
  }
  parseArrayData(t, e, i, s) {
    const { xScale: n, yScale: o } = t,
      a = new Array(s);
    let r, l, h, c;
    for (r = 0, l = s; r < l; ++r)
      (h = r + i),
        (c = e[h]),
        (a[r] = { x: n.parse(c[0], h), y: o.parse(c[1], h) });
    return a;
  }
  parseObjectData(t, e, i, s) {
    const { xScale: n, yScale: o } = t,
      { xAxisKey: a = "x", yAxisKey: r = "y" } = this._parsing,
      l = new Array(s);
    let h, c, d, u;
    for (h = 0, c = s; h < c; ++h)
      (d = h + i),
        (u = e[d]),
        (l[h] = { x: n.parse(Dt(u, a), d), y: o.parse(Dt(u, r), d) });
    return l;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, e, i) {
    const s = this.chart,
      n = this._cachedMeta,
      o = e[t.axis];
    return bs(
      { keys: ms(s, !0), values: e._stacks[t.axis]._visualValues },
      o,
      n.index,
      { mode: i }
    );
  }
  updateRangeFromParsed(t, e, i, s) {
    const n = i[e.axis];
    let o = null === n ? NaN : n;
    const a = s && i._stacks[e.axis];
    s && a && ((s.values = a), (o = bs(s, n, this._cachedMeta.index))),
      (t.min = Math.min(t.min, o)),
      (t.max = Math.max(t.max, o));
  }
  getMinMax(t, e) {
    const i = this._cachedMeta,
      s = i._parsed,
      n = i._sorted && t === i.iScale,
      o = s.length,
      a = this._getOtherScale(t),
      r = ((t, e, i) =>
        t && !e.hidden && e._stacked && { keys: ms(i, !0), values: null })(
        e,
        i,
        this.chart
      ),
      l = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
      { min: h, max: c } = (function (t) {
        const {
          min: e,
          max: i,
          minDefined: s,
          maxDefined: n,
        } = t.getUserBounds();
        return {
          min: s ? e : Number.NEGATIVE_INFINITY,
          max: n ? i : Number.POSITIVE_INFINITY,
        };
      })(a);
    let d, u;
    function f() {
      u = s[d];
      const e = u[a.axis];
      return !pt(u[t.axis]) || h > e || c < e;
    }
    for (
      d = 0;
      d < o && (f() || (this.updateRangeFromParsed(l, t, u, r), !n));
      ++d
    );
    if (n)
      for (d = o - 1; d >= 0; --d)
        if (!f()) {
          this.updateRangeFromParsed(l, t, u, r);
          break;
        }
    return l;
  }
  getAllParsedValues(t) {
    const e = this._cachedMeta._parsed,
      i = [];
    let s, n, o;
    for (s = 0, n = e.length; s < n; ++s)
      (o = e[s][t.axis]), pt(o) && i.push(o);
    return i;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta,
      i = e.iScale,
      s = e.vScale,
      n = this.getParsed(t);
    return {
      label: i ? "" + i.getLabelForValue(n[i.axis]) : "",
      value: s ? "" + s.getLabelForValue(n[s.axis]) : "",
    };
  }
  _update(t) {
    const e = this._cachedMeta;
    this.update(t || "default"),
      (e._clip = (function (t) {
        let e, i, s, n;
        return (
          ft(t)
            ? ((e = t.top), (i = t.right), (s = t.bottom), (n = t.left))
            : (e = i = s = n = t),
          { top: e, right: i, bottom: s, left: n, disabled: !1 === t }
        );
      })(
        mt(
          this.options.clip,
          (function (t, e, i) {
            if (!1 === i) return !1;
            const s = gs(t, i),
              n = gs(e, i);
            return { top: n.end, right: s.end, bottom: n.start, left: s.start };
          })(e.xScale, e.yScale, this.getMaxOverflow())
        )
      ));
  }
  update(t) {}
  draw() {
    const t = this._ctx,
      e = this.chart,
      i = this._cachedMeta,
      s = i.data || [],
      n = e.chartArea,
      o = [],
      a = this._drawStart || 0,
      r = this._drawCount || s.length - a,
      l = this.options.drawActiveElementsOnTop;
    let h;
    for (i.dataset && i.dataset.draw(t, n, a, r), h = a; h < a + r; ++h) {
      const e = s[h];
      e.hidden || (e.active && l ? o.push(e) : e.draw(t, n));
    }
    for (h = 0; h < o.length; ++h) o[h].draw(t, n);
  }
  getStyle(t, e) {
    const i = e ? "active" : "default";
    return void 0 === t && this._cachedMeta.dataset
      ? this.resolveDatasetElementOptions(i)
      : this.resolveDataElementOptions(t || 0, i);
  }
  getContext(t, e, i) {
    const s = this.getDataset();
    let n;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const e = this._cachedMeta.data[t];
      (n =
        e.$context ||
        (e.$context = (function (t, e, i) {
          return ui(t, {
            active: !1,
            dataIndex: e,
            parsed: void 0,
            raw: void 0,
            element: i,
            index: e,
            mode: "default",
            type: "data",
          });
        })(this.getContext(), t, e))),
        (n.parsed = this.getParsed(t)),
        (n.raw = s.data[t]),
        (n.index = n.dataIndex = t);
    } else
      (n =
        this.$context ||
        (this.$context = (function (t, e) {
          return ui(t, {
            active: !1,
            dataset: void 0,
            datasetIndex: e,
            index: e,
            mode: "default",
            type: "dataset",
          });
        })(this.chart.getContext(), this.index))),
        (n.dataset = s),
        (n.index = n.datasetIndex = this.index);
    return (n.active = !!e), (n.mode = i), n;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, e) {
    return this._resolveElementOptions(this.dataElementType.id, e, t);
  }
  _resolveElementOptions(t, e = "default", i) {
    const s = "active" === e,
      n = this._cachedDataOpts,
      o = t + "-" + e,
      a = n[o],
      r = this.enableOptionSharing && Ot(i);
    if (a) return Ss(a, r);
    const l = this.chart.config,
      h = l.datasetElementScopeKeys(this._type, t),
      c = s ? [`${t}Hover`, "hover", t, ""] : [t, ""],
      d = l.getOptionScopes(this.getDataset(), h),
      u = Object.keys(ze.elements[t]),
      f = l.resolveNamedOptions(d, u, () => this.getContext(i, s, e), c);
    return f.$shared && ((f.$shared = r), (n[o] = Object.freeze(Ss(f, r)))), f;
  }
  _resolveAnimations(t, e, i) {
    const s = this.chart,
      n = this._cachedDataOpts,
      o = `animation-${e}`,
      a = n[o];
    if (a) return a;
    let r;
    if (!1 !== s.options.animation) {
      const s = this.chart.config,
        n = s.datasetAnimationScopeKeys(this._type, e),
        o = s.getOptionScopes(this.getDataset(), n);
      r = s.createResolver(o, this.getContext(t, i, e));
    }
    const l = new ps(s, r && r.animations);
    return r && r._cacheable && (n[o] = Object.freeze(l)), l;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return (
        this._sharedOptions || (this._sharedOptions = Object.assign({}, t))
      );
  }
  includeOptions(t, e) {
    return !e || ks(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, e) {
    const i = this.resolveDataElementOptions(t, e),
      s = this._sharedOptions,
      n = this.getSharedOptions(i),
      o = this.includeOptions(e, n) || n !== s;
    return (
      this.updateSharedOptions(n, e, i), { sharedOptions: n, includeOptions: o }
    );
  }
  updateElement(t, e, i, s) {
    ks(s) ? Object.assign(t, i) : this._resolveAnimations(e, s).update(t, i);
  }
  updateSharedOptions(t, e, i) {
    t && !ks(e) && this._resolveAnimations(void 0, e).update(t, i);
  }
  _setStyle(t, e, i, s) {
    t.active = s;
    const n = this.getStyle(e, s);
    this._resolveAnimations(e, i, s).update(t, {
      options: (!s && this.getSharedOptions(n)) || n,
    });
  }
  removeHoverStyle(t, e, i) {
    this._setStyle(t, i, "active", !1);
  }
  setHoverStyle(t, e, i) {
    this._setStyle(t, i, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const e = this._data,
      i = this._cachedMeta.data;
    for (const [t, e, i] of this._syncList) this[t](e, i);
    this._syncList = [];
    const s = i.length,
      n = e.length,
      o = Math.min(n, s);
    o && this.parse(0, o),
      n > s
        ? this._insertElements(s, n - s, t)
        : n < s && this._removeElements(n, s - n);
  }
  _insertElements(t, e, i = !0) {
    const s = this._cachedMeta,
      n = s.data,
      o = t + e;
    let a;
    const r = (t) => {
      for (t.length += e, a = t.length - 1; a >= o; a--) t[a] = t[a - e];
    };
    for (r(n), a = t; a < o; ++a) n[a] = new this.dataElementType();
    this._parsing && r(s._parsed),
      this.parse(t, e),
      i && this.updateElements(n, t, e, "reset");
  }
  updateElements(t, e, i, s) {}
  _removeElements(t, e) {
    const i = this._cachedMeta;
    if (this._parsing) {
      const s = i._parsed.splice(t, e);
      i._stacked && Ms(i, s);
    }
    i.data.splice(t, e);
  }
  _sync(t) {
    if (this._parsing) this._syncList.push(t);
    else {
      const [e, i, s] = t;
      this[e](i, s);
    }
    this.chart._dataChanges.push([this.index, ...t]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync(["_insertElements", this.getDataset().data.length - t, t]);
  }
  _onDataPop() {
    this._sync(["_removeElements", this._cachedMeta.data.length - 1, 1]);
  }
  _onDataShift() {
    this._sync(["_removeElements", 0, 1]);
  }
  _onDataSplice(t, e) {
    e && this._sync(["_removeElements", t, e]);
    const i = arguments.length - 2;
    i && this._sync(["_insertElements", t, i]);
  }
  _onDataUnshift() {
    this._sync(["_insertElements", 0, arguments.length]);
  }
}
function Cs(t) {
  const e = t.iScale,
    i = (function (t, e) {
      if (!t._cache.$bar) {
        const i = t.getMatchingVisibleMetas(e);
        let s = [];
        for (let e = 0, n = i.length; e < n; e++)
          s = s.concat(i[e].controller.getAllParsedValues(t));
        t._cache.$bar = ue(s.sort((t, e) => t - e));
      }
      return t._cache.$bar;
    })(e, t.type);
  let s,
    n,
    o,
    a,
    r = e._length;
  const l = () => {
    32767 !== o &&
      -32768 !== o &&
      (Ot(a) && (r = Math.min(r, Math.abs(o - a) || r)), (a = o));
  };
  for (s = 0, n = i.length; s < n; ++s) (o = e.getPixelForValue(i[s])), l();
  for (a = void 0, s = 0, n = e.ticks.length; s < n; ++s)
    (o = e.getPixelForTick(s)), l();
  return r;
}
function Ds(t, e, i, s) {
  return (
    ut(t)
      ? (function (t, e, i, s) {
          const n = i.parse(t[0], s),
            o = i.parse(t[1], s),
            a = Math.min(n, o),
            r = Math.max(n, o);
          let l = a,
            h = r;
          Math.abs(a) > Math.abs(r) && ((l = r), (h = a)),
            (e[i.axis] = h),
            (e._custom = {
              barStart: l,
              barEnd: h,
              start: n,
              end: o,
              min: a,
              max: r,
            });
        })(t, e, i, s)
      : (e[i.axis] = i.parse(t, s)),
    e
  );
}
function Ts(t, e, i, s) {
  const n = t.iScale,
    o = t.vScale,
    a = n.getLabels(),
    r = n === o,
    l = [];
  let h, c, d, u;
  for (h = i, c = i + s; h < c; ++h)
    (u = e[h]),
      (d = {}),
      (d[n.axis] = r || n.parse(a[h], h)),
      l.push(Ds(u, d, o, h));
  return l;
}
function Os(t) {
  return t && void 0 !== t.barStart && void 0 !== t.barEnd;
}
function Ls(t, e, i, s) {
  let n = e.borderSkipped;
  const o = {};
  if (!n) return void (t.borderSkipped = o);
  if (!0 === n)
    return void (t.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0,
    });
  const {
    start: a,
    end: r,
    reverse: l,
    top: h,
    bottom: c,
  } = (function (t) {
    let e, i, s, n, o;
    return (
      t.horizontal
        ? ((e = t.base > t.x), (i = "left"), (s = "right"))
        : ((e = t.base < t.y), (i = "bottom"), (s = "top")),
      e ? ((n = "end"), (o = "start")) : ((n = "start"), (o = "end")),
      { start: i, end: s, reverse: e, top: n, bottom: o }
    );
  })(t);
  "middle" === n &&
    i &&
    ((t.enableBorderRadius = !0),
    (i._top || 0) === s
      ? (n = h)
      : (i._bottom || 0) === s
      ? (n = c)
      : ((o[As(c, a, r, l)] = !0), (n = h))),
    (o[As(n, a, r, l)] = !0),
    (t.borderSkipped = o);
}
function As(t, e, i, s) {
  var n, o, a;
  return (
    s
      ? ((a = i),
        (t = Es((t = (n = t) === (o = e) ? a : n === a ? o : n), i, e)))
      : (t = Es(t, e, i)),
    t
  );
}
function Es(t, e, i) {
  return "start" === t ? e : "end" === t ? i : t;
}
function Rs(t, { inflateAmount: e }, i) {
  t.inflateAmount = "auto" === e ? (1 === i ? 0.33 : 0) : e;
}
class $s extends Ps {
  static id = "doughnut";
  static defaults = {
    datasetElementType: !1,
    dataElementType: "arc",
    animation: { animateRotate: !0, animateScale: !1 },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "circumference",
          "endAngle",
          "innerRadius",
          "outerRadius",
          "startAngle",
          "x",
          "y",
          "offset",
          "borderWidth",
          "spacing",
        ],
      },
    },
    cutout: "50%",
    rotation: 0,
    circumference: 360,
    radius: "100%",
    spacing: 0,
    indexAxis: "r",
  };
  static descriptors = {
    _scriptable: (t) => "spacing" !== t,
    _indexable: (t) => "spacing" !== t,
  };
  static overrides = {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels(t) {
            const e = t.data;
            if (e.labels.length && e.datasets.length) {
              const {
                labels: { pointStyle: i, color: s },
              } = t.legend.options;
              return e.labels.map((e, n) => {
                const o = t.getDatasetMeta(0).controller.getStyle(n);
                return {
                  text: e,
                  fillStyle: o.backgroundColor,
                  strokeStyle: o.borderColor,
                  fontColor: s,
                  lineWidth: o.borderWidth,
                  pointStyle: i,
                  hidden: !t.getDataVisibility(n),
                  index: n,
                };
              });
            }
            return [];
          },
        },
        onClick(t, e, i) {
          i.chart.toggleDataVisibility(e.index), i.chart.update();
        },
      },
    },
  };
  constructor(t, e) {
    super(t, e),
      (this.enableOptionSharing = !0),
      (this.innerRadius = void 0),
      (this.outerRadius = void 0),
      (this.offsetX = void 0),
      (this.offsetY = void 0);
  }
  linkScales() {}
  parse(t, e) {
    const i = this.getDataset().data,
      s = this._cachedMeta;
    if (!1 === this._parsing) s._parsed = i;
    else {
      let n,
        o,
        a = (t) => +i[t];
      if (ft(i[t])) {
        const { key: t = "value" } = this._parsing;
        a = (e) => +Dt(i[e], t);
      }
      for (n = t, o = t + e; n < o; ++n) s._parsed[n] = a(n);
    }
  }
  _getRotation() {
    return Jt(this.options.rotation - 90);
  }
  _getCircumference() {
    return Jt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = $t,
      e = -$t;
    for (let i = 0; i < this.chart.data.datasets.length; ++i)
      if (
        this.chart.isDatasetVisible(i) &&
        this.chart.getDatasetMeta(i).type === this._type
      ) {
        const s = this.chart.getDatasetMeta(i).controller,
          n = s._getRotation(),
          o = s._getCircumference();
        (t = Math.min(t, n)), (e = Math.max(e, n + o));
      }
    return { rotation: t, circumference: e - t };
  }
  update(t) {
    const e = this.chart,
      { chartArea: i } = e,
      s = this._cachedMeta,
      n = s.data,
      o =
        this.getMaxBorderWidth() + this.getMaxOffset(n) + this.options.spacing,
      a = Math.max((Math.min(i.width, i.height) - o) / 2, 0),
      r = Math.min(
        ((l = this.options.cutout),
        (h = a),
        "string" == typeof l && l.endsWith("%") ? parseFloat(l) / 100 : +l / h),
        1
      );
    var l, h;
    const c = this._getRingWeight(this.index),
      { circumference: d, rotation: u } = this._getRotationExtents(),
      {
        ratioX: f,
        ratioY: p,
        offsetX: g,
        offsetY: m,
      } = (function (t, e, i) {
        let s = 1,
          n = 1,
          o = 0,
          a = 0;
        if (e < $t) {
          const r = t,
            l = r + e,
            h = Math.cos(r),
            c = Math.sin(r),
            d = Math.cos(l),
            u = Math.sin(l),
            f = (t, e, s) =>
              se(t, r, l, !0) ? 1 : Math.max(e, e * i, s, s * i),
            p = (t, e, s) =>
              se(t, r, l, !0) ? -1 : Math.min(e, e * i, s, s * i),
            g = f(0, h, d),
            m = f(zt, c, u),
            b = p(Rt, h, d),
            x = p(Rt + zt, c, u);
          (s = (g - b) / 2),
            (n = (m - x) / 2),
            (o = -(g + b) / 2),
            (a = -(m + x) / 2);
        }
        return { ratioX: s, ratioY: n, offsetX: o, offsetY: a };
      })(u, d, r),
      b = (i.width - o) / f,
      x = (i.height - o) / p,
      y = Math.max(Math.min(b, x) / 2, 0),
      _ = bt(this.options.radius, y),
      v = (_ - Math.max(_ * r, 0)) / this._getVisibleDatasetWeightTotal();
    (this.offsetX = g * _),
      (this.offsetY = m * _),
      (s.total = this.calculateTotal()),
      (this.outerRadius = _ - v * this._getRingWeightOffset(this.index)),
      (this.innerRadius = Math.max(this.outerRadius - v * c, 0)),
      this.updateElements(n, 0, n.length, t);
  }
  _circumference(t, e) {
    const i = this.options,
      s = this._cachedMeta,
      n = this._getCircumference();
    return (e && i.animation.animateRotate) ||
      !this.chart.getDataVisibility(t) ||
      null === s._parsed[t] ||
      s.data[t].hidden
      ? 0
      : this.calculateCircumference((s._parsed[t] * n) / $t);
  }
  updateElements(t, e, i, s) {
    const n = "reset" === s,
      o = this.chart,
      a = o.chartArea,
      r = o.options.animation,
      l = (a.left + a.right) / 2,
      h = (a.top + a.bottom) / 2,
      c = n && r.animateScale,
      d = c ? 0 : this.innerRadius,
      u = c ? 0 : this.outerRadius,
      { sharedOptions: f, includeOptions: p } = this._getSharedOptions(e, s);
    let g,
      m = this._getRotation();
    for (g = 0; g < e; ++g) m += this._circumference(g, n);
    for (g = e; g < e + i; ++g) {
      const e = this._circumference(g, n),
        i = t[g],
        o = {
          x: l + this.offsetX,
          y: h + this.offsetY,
          startAngle: m,
          endAngle: m + e,
          circumference: e,
          outerRadius: u,
          innerRadius: d,
        };
      p &&
        (o.options =
          f || this.resolveDataElementOptions(g, i.active ? "active" : s)),
        (m += e),
        this.updateElement(i, g, o, s);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta,
      e = t.data;
    let i,
      s = 0;
    for (i = 0; i < e.length; i++) {
      const n = t._parsed[i];
      null === n ||
        isNaN(n) ||
        !this.chart.getDataVisibility(i) ||
        e[i].hidden ||
        (s += Math.abs(n));
    }
    return s;
  }
  calculateCircumference(t) {
    const e = this._cachedMeta.total;
    return e > 0 && !isNaN(t) ? $t * (Math.abs(t) / e) : 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta,
      i = this.chart,
      s = i.data.labels || [],
      n = Le(e._parsed[t], i.options.locale);
    return { label: s[t] || "", value: n };
  }
  getMaxBorderWidth(t) {
    let e = 0;
    const i = this.chart;
    let s, n, o, a, r;
    if (!t)
      for (s = 0, n = i.data.datasets.length; s < n; ++s)
        if (i.isDatasetVisible(s)) {
          (o = i.getDatasetMeta(s)), (t = o.data), (a = o.controller);
          break;
        }
    if (!t) return 0;
    for (s = 0, n = t.length; s < n; ++s)
      (r = a.resolveDataElementOptions(s)),
        "inner" !== r.borderAlign &&
          (e = Math.max(e, r.borderWidth || 0, r.hoverBorderWidth || 0));
    return e;
  }
  getMaxOffset(t) {
    let e = 0;
    for (let i = 0, s = t.length; i < s; ++i) {
      const t = this.resolveDataElementOptions(i);
      e = Math.max(e, t.offset || 0, t.hoverOffset || 0);
    }
    return e;
  }
  _getRingWeightOffset(t) {
    let e = 0;
    for (let i = 0; i < t; ++i)
      this.chart.isDatasetVisible(i) && (e += this._getRingWeight(i));
    return e;
  }
  _getRingWeight(t) {
    return Math.max(mt(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class Is extends Ps {
  static id = "polarArea";
  static defaults = {
    dataElementType: "arc",
    animation: { animateRotate: !0, animateScale: !0 },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "startAngle",
          "endAngle",
          "innerRadius",
          "outerRadius",
        ],
      },
    },
    indexAxis: "r",
    startAngle: 0,
  };
  static overrides = {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels(t) {
            const e = t.data;
            if (e.labels.length && e.datasets.length) {
              const {
                labels: { pointStyle: i, color: s },
              } = t.legend.options;
              return e.labels.map((e, n) => {
                const o = t.getDatasetMeta(0).controller.getStyle(n);
                return {
                  text: e,
                  fillStyle: o.backgroundColor,
                  strokeStyle: o.borderColor,
                  fontColor: s,
                  lineWidth: o.borderWidth,
                  pointStyle: i,
                  hidden: !t.getDataVisibility(n),
                  index: n,
                };
              });
            }
            return [];
          },
        },
        onClick(t, e, i) {
          i.chart.toggleDataVisibility(e.index), i.chart.update();
        },
      },
    },
    scales: {
      r: {
        type: "radialLinear",
        angleLines: { display: !1 },
        beginAtZero: !0,
        grid: { circular: !0 },
        pointLabels: { display: !1 },
        startAngle: 0,
      },
    },
  };
  constructor(t, e) {
    super(t, e), (this.innerRadius = void 0), (this.outerRadius = void 0);
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta,
      i = this.chart,
      s = i.data.labels || [],
      n = Le(e._parsed[t].r, i.options.locale);
    return { label: s[t] || "", value: n };
  }
  parseObjectData(t, e, i, s) {
    return Pi.bind(this)(t, e, i, s);
  }
  update(t) {
    const e = this._cachedMeta.data;
    this._updateRadius(), this.updateElements(e, 0, e.length, t);
  }
  getMinMax() {
    const t = this._cachedMeta,
      e = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY };
    return (
      t.data.forEach((t, i) => {
        const s = this.getParsed(i).r;
        !isNaN(s) &&
          this.chart.getDataVisibility(i) &&
          (s < e.min && (e.min = s), s > e.max && (e.max = s));
      }),
      e
    );
  }
  _updateRadius() {
    const t = this.chart,
      e = t.chartArea,
      i = t.options,
      s = Math.min(e.right - e.left, e.bottom - e.top),
      n = Math.max(s / 2, 0),
      o =
        (n -
          Math.max(
            i.cutoutPercentage ? (n / 100) * i.cutoutPercentage : 1,
            0
          )) /
        t.getVisibleDatasetCount();
    (this.outerRadius = n - o * this.index),
      (this.innerRadius = this.outerRadius - o);
  }
  updateElements(t, e, i, s) {
    const n = "reset" === s,
      o = this.chart,
      a = o.options.animation,
      r = this._cachedMeta.rScale,
      l = r.xCenter,
      h = r.yCenter,
      c = r.getIndexAngle(0) - 0.5 * Rt;
    let d,
      u = c;
    const f = 360 / this.countVisibleElements();
    for (d = 0; d < e; ++d) u += this._computeAngle(d, s, f);
    for (d = e; d < e + i; d++) {
      const e = t[d];
      let i = u,
        p = u + this._computeAngle(d, s, f),
        g = o.getDataVisibility(d)
          ? r.getDistanceFromCenterForValue(this.getParsed(d).r)
          : 0;
      (u = p), n && (a.animateScale && (g = 0), a.animateRotate && (i = p = c));
      const m = {
        x: l,
        y: h,
        innerRadius: 0,
        outerRadius: g,
        startAngle: i,
        endAngle: p,
        options: this.resolveDataElementOptions(d, e.active ? "active" : s),
      };
      this.updateElement(e, d, m, s);
    }
  }
  countVisibleElements() {
    const t = this._cachedMeta;
    let e = 0;
    return (
      t.data.forEach((t, i) => {
        !isNaN(this.getParsed(i).r) && this.chart.getDataVisibility(i) && e++;
      }),
      e
    );
  }
  _computeAngle(t, e, i) {
    return this.chart.getDataVisibility(t)
      ? Jt(this.resolveDataElementOptions(t, e).angle || i)
      : 0;
  }
}
var Fs = Object.freeze({
  __proto__: null,
  BarController: class extends Ps {
    static id = "bar";
    static defaults = {
      datasetElementType: !1,
      dataElementType: "bar",
      categoryPercentage: 0.8,
      barPercentage: 0.9,
      grouped: !0,
      animations: {
        numbers: {
          type: "number",
          properties: ["x", "y", "base", "width", "height"],
        },
      },
    };
    static overrides = {
      scales: {
        _index_: { type: "category", offset: !0, grid: { offset: !0 } },
        _value_: { type: "linear", beginAtZero: !0 },
      },
    };
    parsePrimitiveData(t, e, i, s) {
      return Ts(t, e, i, s);
    }
    parseArrayData(t, e, i, s) {
      return Ts(t, e, i, s);
    }
    parseObjectData(t, e, i, s) {
      const { iScale: n, vScale: o } = t,
        { xAxisKey: a = "x", yAxisKey: r = "y" } = this._parsing,
        l = "x" === n.axis ? a : r,
        h = "x" === o.axis ? a : r,
        c = [];
      let d, u, f, p;
      for (d = i, u = i + s; d < u; ++d)
        (p = e[d]),
          (f = {}),
          (f[n.axis] = n.parse(Dt(p, l), d)),
          c.push(Ds(Dt(p, h), f, o, d));
      return c;
    }
    updateRangeFromParsed(t, e, i, s) {
      super.updateRangeFromParsed(t, e, i, s);
      const n = i._custom;
      n &&
        e === this._cachedMeta.vScale &&
        ((t.min = Math.min(t.min, n.min)), (t.max = Math.max(t.max, n.max)));
    }
    getMaxOverflow() {
      return 0;
    }
    getLabelAndValue(t) {
      const e = this._cachedMeta,
        { iScale: i, vScale: s } = e,
        n = this.getParsed(t),
        o = n._custom,
        a = Os(o)
          ? "[" + o.start + ", " + o.end + "]"
          : "" + s.getLabelForValue(n[s.axis]);
      return { label: "" + i.getLabelForValue(n[i.axis]), value: a };
    }
    initialize() {
      (this.enableOptionSharing = !0), super.initialize();
      this._cachedMeta.stack = this.getDataset().stack;
    }
    update(t) {
      const e = this._cachedMeta;
      this.updateElements(e.data, 0, e.data.length, t);
    }
    updateElements(t, e, i, s) {
      const n = "reset" === s,
        {
          index: o,
          _cachedMeta: { vScale: a },
        } = this,
        r = a.getBasePixel(),
        l = a.isHorizontal(),
        h = this._getRuler(),
        { sharedOptions: c, includeOptions: d } = this._getSharedOptions(e, s);
      for (let u = e; u < e + i; u++) {
        const e = this.getParsed(u),
          i =
            n || dt(e[a.axis])
              ? { base: r, head: r }
              : this._calculateBarValuePixels(u),
          f = this._calculateBarIndexPixels(u, h),
          p = (e._stacks || {})[a.axis],
          g = {
            horizontal: l,
            base: i.base,
            enableBorderRadius:
              !p || Os(e._custom) || o === p._top || o === p._bottom,
            x: l ? i.head : f.center,
            y: l ? f.center : i.head,
            height: l ? f.size : Math.abs(i.size),
            width: l ? Math.abs(i.size) : f.size,
          };
        d &&
          (g.options =
            c || this.resolveDataElementOptions(u, t[u].active ? "active" : s));
        const m = g.options || t[u].options;
        Ls(g, m, p, o), Rs(g, m, h.ratio), this.updateElement(t[u], u, g, s);
      }
    }
    _getStacks(t, e) {
      const { iScale: i } = this._cachedMeta,
        s = i
          .getMatchingVisibleMetas(this._type)
          .filter((t) => t.controller.options.grouped),
        n = i.options.stacked,
        o = [],
        a = (t) => {
          const i = t.controller.getParsed(e),
            s = i && i[t.vScale.axis];
          if (dt(s) || isNaN(s)) return !0;
        };
      for (const i of s)
        if (
          (void 0 === e || !a(i)) &&
          ((!1 === n ||
            -1 === o.indexOf(i.stack) ||
            (void 0 === n && void 0 === i.stack)) &&
            o.push(i.stack),
          i.index === t)
        )
          break;
      return o.length || o.push(void 0), o;
    }
    _getStackCount(t) {
      return this._getStacks(void 0, t).length;
    }
    _getStackIndex(t, e, i) {
      const s = this._getStacks(t, i),
        n = void 0 !== e ? s.indexOf(e) : -1;
      return -1 === n ? s.length - 1 : n;
    }
    _getRuler() {
      const t = this.options,
        e = this._cachedMeta,
        i = e.iScale,
        s = [];
      let n, o;
      for (n = 0, o = e.data.length; n < o; ++n)
        s.push(i.getPixelForValue(this.getParsed(n)[i.axis], n));
      const a = t.barThickness;
      return {
        min: a || Cs(e),
        pixels: s,
        start: i._startPixel,
        end: i._endPixel,
        stackCount: this._getStackCount(),
        scale: i,
        grouped: t.grouped,
        ratio: a ? 1 : t.categoryPercentage * t.barPercentage,
      };
    }
    _calculateBarValuePixels(t) {
      const {
          _cachedMeta: { vScale: e, _stacked: i, index: s },
          options: { base: n, minBarLength: o },
        } = this,
        a = n || 0,
        r = this.getParsed(t),
        l = r._custom,
        h = Os(l);
      let c,
        d,
        u = r[e.axis],
        f = 0,
        p = i ? this.applyStack(e, r, i) : u;
      p !== u && ((f = p - u), (p = u)),
        h &&
          ((u = l.barStart),
          (p = l.barEnd - l.barStart),
          0 !== u && jt(u) !== jt(l.barEnd) && (f = 0),
          (f += u));
      const g = dt(n) || h ? f : n;
      let m = e.getPixelForValue(g);
      if (
        ((c = this.chart.getDataVisibility(t) ? e.getPixelForValue(f + p) : m),
        (d = c - m),
        Math.abs(d) < o)
      ) {
        (d =
          (function (t, e, i) {
            return 0 !== t
              ? jt(t)
              : (e.isHorizontal() ? 1 : -1) * (e.min >= i ? 1 : -1);
          })(d, e, a) * o),
          u === a && (m -= d / 2);
        const t = e.getPixelForDecimal(0),
          n = e.getPixelForDecimal(1),
          l = Math.min(t, n),
          f = Math.max(t, n);
        (m = Math.max(Math.min(m, f), l)),
          (c = m + d),
          i &&
            !h &&
            (r._stacks[e.axis]._visualValues[s] =
              e.getValueForPixel(c) - e.getValueForPixel(m));
      }
      if (m === e.getPixelForValue(a)) {
        const t = (jt(d) * e.getLineWidthForValue(a)) / 2;
        (m += t), (d -= t);
      }
      return { size: d, base: m, head: c, center: c + d / 2 };
    }
    _calculateBarIndexPixels(t, e) {
      const i = e.scale,
        s = this.options,
        n = s.skipNull,
        o = mt(s.maxBarThickness, 1 / 0);
      let a, r;
      if (e.grouped) {
        const i = n ? this._getStackCount(t) : e.stackCount,
          l =
            "flex" === s.barThickness
              ? (function (t, e, i, s) {
                  const n = e.pixels,
                    o = n[t];
                  let a = t > 0 ? n[t - 1] : null,
                    r = t < n.length - 1 ? n[t + 1] : null;
                  const l = i.categoryPercentage;
                  null === a &&
                    (a = o - (null === r ? e.end - e.start : r - o)),
                    null === r && (r = o + o - a);
                  const h = o - ((o - Math.min(a, r)) / 2) * l;
                  return {
                    chunk: ((Math.abs(r - a) / 2) * l) / s,
                    ratio: i.barPercentage,
                    start: h,
                  };
                })(t, e, s, i)
              : (function (t, e, i, s) {
                  const n = i.barThickness;
                  let o, a;
                  return (
                    dt(n)
                      ? ((o = e.min * i.categoryPercentage),
                        (a = i.barPercentage))
                      : ((o = n * s), (a = 1)),
                    { chunk: o / s, ratio: a, start: e.pixels[t] - o / 2 }
                  );
                })(t, e, s, i),
          h = this._getStackIndex(
            this.index,
            this._cachedMeta.stack,
            n ? t : void 0
          );
        (a = l.start + l.chunk * h + l.chunk / 2),
          (r = Math.min(o, l.chunk * l.ratio));
      } else
        (a = i.getPixelForValue(this.getParsed(t)[i.axis], t)),
          (r = Math.min(o, e.min * e.ratio));
      return { base: a - r / 2, head: a + r / 2, center: a, size: r };
    }
    draw() {
      const t = this._cachedMeta,
        e = t.vScale,
        i = t.data,
        s = i.length;
      let n = 0;
      for (; n < s; ++n)
        null !== this.getParsed(n)[e.axis] && i[n].draw(this._ctx);
    }
  },
  BubbleController: class extends Ps {
    static id = "bubble";
    static defaults = {
      datasetElementType: !1,
      dataElementType: "point",
      animations: {
        numbers: {
          type: "number",
          properties: ["x", "y", "borderWidth", "radius"],
        },
      },
    };
    static overrides = {
      scales: { x: { type: "linear" }, y: { type: "linear" } },
    };
    initialize() {
      (this.enableOptionSharing = !0), super.initialize();
    }
    parsePrimitiveData(t, e, i, s) {
      const n = super.parsePrimitiveData(t, e, i, s);
      for (let t = 0; t < n.length; t++)
        n[t]._custom = this.resolveDataElementOptions(t + i).radius;
      return n;
    }
    parseArrayData(t, e, i, s) {
      const n = super.parseArrayData(t, e, i, s);
      for (let t = 0; t < n.length; t++) {
        const s = e[i + t];
        n[t]._custom = mt(s[2], this.resolveDataElementOptions(t + i).radius);
      }
      return n;
    }
    parseObjectData(t, e, i, s) {
      const n = super.parseObjectData(t, e, i, s);
      for (let t = 0; t < n.length; t++) {
        const s = e[i + t];
        n[t]._custom = mt(
          s && s.r && +s.r,
          this.resolveDataElementOptions(t + i).radius
        );
      }
      return n;
    }
    getMaxOverflow() {
      const t = this._cachedMeta.data;
      let e = 0;
      for (let i = t.length - 1; i >= 0; --i)
        e = Math.max(e, t[i].size(this.resolveDataElementOptions(i)) / 2);
      return e > 0 && e;
    }
    getLabelAndValue(t) {
      const e = this._cachedMeta,
        i = this.chart.data.labels || [],
        { xScale: s, yScale: n } = e,
        o = this.getParsed(t),
        a = s.getLabelForValue(o.x),
        r = n.getLabelForValue(o.y),
        l = o._custom;
      return {
        label: i[t] || "",
        value: "(" + a + ", " + r + (l ? ", " + l : "") + ")",
      };
    }
    update(t) {
      const e = this._cachedMeta.data;
      this.updateElements(e, 0, e.length, t);
    }
    updateElements(t, e, i, s) {
      const n = "reset" === s,
        { iScale: o, vScale: a } = this._cachedMeta,
        { sharedOptions: r, includeOptions: l } = this._getSharedOptions(e, s),
        h = o.axis,
        c = a.axis;
      for (let d = e; d < e + i; d++) {
        const e = t[d],
          i = !n && this.getParsed(d),
          u = {},
          f = (u[h] = n ? o.getPixelForDecimal(0.5) : o.getPixelForValue(i[h])),
          p = (u[c] = n ? a.getBasePixel() : a.getPixelForValue(i[c]));
        (u.skip = isNaN(f) || isNaN(p)),
          l &&
            ((u.options =
              r || this.resolveDataElementOptions(d, e.active ? "active" : s)),
            n && (u.options.radius = 0)),
          this.updateElement(e, d, u, s);
      }
    }
    resolveDataElementOptions(t, e) {
      const i = this.getParsed(t);
      let s = super.resolveDataElementOptions(t, e);
      s.$shared && (s = Object.assign({}, s, { $shared: !1 }));
      const n = s.radius;
      return (
        "active" !== e && (s.radius = 0), (s.radius += mt(i && i._custom, n)), s
      );
    }
  },
  DoughnutController: $s,
  LineController: class extends Ps {
    static id = "line";
    static defaults = {
      datasetElementType: "line",
      dataElementType: "point",
      showLine: !0,
      spanGaps: !1,
    };
    static overrides = {
      scales: { _index_: { type: "category" }, _value_: { type: "linear" } },
    };
    initialize() {
      (this.enableOptionSharing = !0),
        (this.supportsDecimation = !0),
        super.initialize();
    }
    update(t) {
      const e = this._cachedMeta,
        { dataset: i, data: s = [], _dataset: n } = e,
        o = this.chart._animationsDisabled;
      let { start: a, count: r } = ye(e, s, o);
      (this._drawStart = a),
        (this._drawCount = r),
        _e(e) && ((a = 0), (r = s.length)),
        (i._chart = this.chart),
        (i._datasetIndex = this.index),
        (i._decimated = !!n._decimated),
        (i.points = s);
      const l = this.resolveDatasetElementOptions(t);
      this.options.showLine || (l.borderWidth = 0),
        (l.segment = this.options.segment),
        this.updateElement(i, void 0, { animated: !o, options: l }, t),
        this.updateElements(s, a, r, t);
    }
    updateElements(t, e, i, s) {
      const n = "reset" === s,
        { iScale: o, vScale: a, _stacked: r, _dataset: l } = this._cachedMeta,
        { sharedOptions: h, includeOptions: c } = this._getSharedOptions(e, s),
        d = o.axis,
        u = a.axis,
        { spanGaps: f, segment: p } = this.options,
        g = Xt(f) ? f : Number.POSITIVE_INFINITY,
        m = this.chart._animationsDisabled || n || "none" === s,
        b = e + i,
        x = t.length;
      let y = e > 0 && this.getParsed(e - 1);
      for (let i = 0; i < x; ++i) {
        const f = t[i],
          x = m ? f : {};
        if (i < e || i >= b) {
          x.skip = !0;
          continue;
        }
        const _ = this.getParsed(i),
          v = dt(_[u]),
          w = (x[d] = o.getPixelForValue(_[d], i)),
          M = (x[u] =
            n || v
              ? a.getBasePixel()
              : a.getPixelForValue(r ? this.applyStack(a, _, r) : _[u], i));
        (x.skip = isNaN(w) || isNaN(M) || v),
          (x.stop = i > 0 && Math.abs(_[d] - y[d]) > g),
          p && ((x.parsed = _), (x.raw = l.data[i])),
          c &&
            (x.options =
              h || this.resolveDataElementOptions(i, f.active ? "active" : s)),
          m || this.updateElement(f, i, x, s),
          (y = _);
      }
    }
    getMaxOverflow() {
      const t = this._cachedMeta,
        e = t.dataset,
        i = (e.options && e.options.borderWidth) || 0,
        s = t.data || [];
      if (!s.length) return i;
      const n = s[0].size(this.resolveDataElementOptions(0)),
        o = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
      return Math.max(i, n, o) / 2;
    }
    draw() {
      const t = this._cachedMeta;
      t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis),
        super.draw();
    }
  },
  PolarAreaController: Is,
  PieController: class extends $s {
    static id = "pie";
    static defaults = {
      cutout: 0,
      rotation: 0,
      circumference: 360,
      radius: "100%",
    };
  },
  RadarController: class extends Ps {
    static id = "radar";
    static defaults = {
      datasetElementType: "line",
      dataElementType: "point",
      indexAxis: "r",
      showLine: !0,
      elements: { line: { fill: "start" } },
    };
    static overrides = {
      aspectRatio: 1,
      scales: { r: { type: "radialLinear" } },
    };
    getLabelAndValue(t) {
      const e = this._cachedMeta.vScale,
        i = this.getParsed(t);
      return {
        label: e.getLabels()[t],
        value: "" + e.getLabelForValue(i[e.axis]),
      };
    }
    parseObjectData(t, e, i, s) {
      return Pi.bind(this)(t, e, i, s);
    }
    update(t) {
      const e = this._cachedMeta,
        i = e.dataset,
        s = e.data || [],
        n = e.iScale.getLabels();
      if (((i.points = s), "resize" !== t)) {
        const e = this.resolveDatasetElementOptions(t);
        this.options.showLine || (e.borderWidth = 0);
        const o = { _loop: !0, _fullLoop: n.length === s.length, options: e };
        this.updateElement(i, void 0, o, t);
      }
      this.updateElements(s, 0, s.length, t);
    }
    updateElements(t, e, i, s) {
      const n = this._cachedMeta.rScale,
        o = "reset" === s;
      for (let a = e; a < e + i; a++) {
        const e = t[a],
          i = this.resolveDataElementOptions(a, e.active ? "active" : s),
          r = n.getPointPositionForValue(a, this.getParsed(a).r),
          l = o ? n.xCenter : r.x,
          h = o ? n.yCenter : r.y,
          c = {
            x: l,
            y: h,
            angle: r.angle,
            skip: isNaN(l) || isNaN(h),
            options: i,
          };
        this.updateElement(e, a, c, s);
      }
    }
  },
  ScatterController: class extends Ps {
    static id = "scatter";
    static defaults = {
      datasetElementType: !1,
      dataElementType: "point",
      showLine: !1,
      fill: !1,
    };
    static overrides = {
      interaction: { mode: "point" },
      scales: { x: { type: "linear" }, y: { type: "linear" } },
    };
    getLabelAndValue(t) {
      const e = this._cachedMeta,
        i = this.chart.data.labels || [],
        { xScale: s, yScale: n } = e,
        o = this.getParsed(t),
        a = s.getLabelForValue(o.x),
        r = n.getLabelForValue(o.y);
      return { label: i[t] || "", value: "(" + a + ", " + r + ")" };
    }
    update(t) {
      const e = this._cachedMeta,
        { data: i = [] } = e,
        s = this.chart._animationsDisabled;
      let { start: n, count: o } = ye(e, i, s);
      if (
        ((this._drawStart = n),
        (this._drawCount = o),
        _e(e) && ((n = 0), (o = i.length)),
        this.options.showLine)
      ) {
        const { dataset: n, _dataset: o } = e;
        (n._chart = this.chart),
          (n._datasetIndex = this.index),
          (n._decimated = !!o._decimated),
          (n.points = i);
        const a = this.resolveDatasetElementOptions(t);
        (a.segment = this.options.segment),
          this.updateElement(n, void 0, { animated: !s, options: a }, t);
      }
      this.updateElements(i, n, o, t);
    }
    addElements() {
      const { showLine: t } = this.options;
      !this.datasetElementType &&
        t &&
        (this.datasetElementType = this.chart.registry.getElement("line")),
        super.addElements();
    }
    updateElements(t, e, i, s) {
      const n = "reset" === s,
        { iScale: o, vScale: a, _stacked: r, _dataset: l } = this._cachedMeta,
        h = this.resolveDataElementOptions(e, s),
        c = this.getSharedOptions(h),
        d = this.includeOptions(s, c),
        u = o.axis,
        f = a.axis,
        { spanGaps: p, segment: g } = this.options,
        m = Xt(p) ? p : Number.POSITIVE_INFINITY,
        b = this.chart._animationsDisabled || n || "none" === s;
      let x = e > 0 && this.getParsed(e - 1);
      for (let h = e; h < e + i; ++h) {
        const e = t[h],
          i = this.getParsed(h),
          p = b ? e : {},
          y = dt(i[f]),
          _ = (p[u] = o.getPixelForValue(i[u], h)),
          v = (p[f] =
            n || y
              ? a.getBasePixel()
              : a.getPixelForValue(r ? this.applyStack(a, i, r) : i[f], h));
        (p.skip = isNaN(_) || isNaN(v) || y),
          (p.stop = h > 0 && Math.abs(i[u] - x[u]) > m),
          g && ((p.parsed = i), (p.raw = l.data[h])),
          d &&
            (p.options =
              c || this.resolveDataElementOptions(h, e.active ? "active" : s)),
          b || this.updateElement(e, h, p, s),
          (x = i);
      }
      this.updateSharedOptions(c, s, h);
    }
    getMaxOverflow() {
      const t = this._cachedMeta,
        e = t.data || [];
      if (!this.options.showLine) {
        let t = 0;
        for (let i = e.length - 1; i >= 0; --i)
          t = Math.max(t, e[i].size(this.resolveDataElementOptions(i)) / 2);
        return t > 0 && t;
      }
      const i = t.dataset,
        s = (i.options && i.options.borderWidth) || 0;
      if (!e.length) return s;
      const n = e[0].size(this.resolveDataElementOptions(0)),
        o = e[e.length - 1].size(this.resolveDataElementOptions(e.length - 1));
      return Math.max(s, n, o) / 2;
    }
  },
});
function Hs() {
  throw new Error(
    "This method is not implemented: Check that a complete date adapter is provided."
  );
}
class zs {
  static override(t) {
    Object.assign(zs.prototype, t);
  }
  constructor(t) {
    this.options = t || {};
  }
  init() {}
  formats() {
    return Hs();
  }
  parse() {
    return Hs();
  }
  format() {
    return Hs();
  }
  add() {
    return Hs();
  }
  diff() {
    return Hs();
  }
  startOf() {
    return Hs();
  }
  endOf() {
    return Hs();
  }
}
var Bs = zs;
function Vs(t, e, i, s) {
  const { controller: n, data: o, _sorted: a } = t,
    r = n._cachedMeta.iScale;
  if (r && e === r.axis && "r" !== e && a && o.length) {
    const t = r._reversePixels ? le : re;
    if (!s) return t(o, e, i);
    if (n._sharedOptions) {
      const s = o[0],
        n = "function" == typeof s.getRange && s.getRange(e);
      if (n) {
        const s = t(o, e, i - n),
          a = t(o, e, i + n);
        return { lo: s.lo, hi: a.hi };
      }
    }
  }
  return { lo: 0, hi: o.length - 1 };
}
function Ws(t, e, i, s, n) {
  const o = t.getSortedVisibleDatasetMetas(),
    a = i[e];
  for (let t = 0, i = o.length; t < i; ++t) {
    const { index: i, data: r } = o[t],
      { lo: l, hi: h } = Vs(o[t], e, a, n);
    for (let t = l; t <= h; ++t) {
      const e = r[t];
      e.skip || s(e, i, t);
    }
  }
}
function js(t, e, i, s, n) {
  const o = [];
  if (!n && !t.isPointInArea(e)) return o;
  return (
    Ws(
      t,
      i,
      e,
      function (i, a, r) {
        (n || Ye(i, t.chartArea, 0)) &&
          i.inRange(e.x, e.y, s) &&
          o.push({ element: i, datasetIndex: a, index: r });
      },
      !0
    ),
    o
  );
}
function Ns(t, e, i, s, n, o) {
  let a = [];
  const r = (function (t) {
    const e = -1 !== t.indexOf("x"),
      i = -1 !== t.indexOf("y");
    return function (t, s) {
      const n = e ? Math.abs(t.x - s.x) : 0,
        o = i ? Math.abs(t.y - s.y) : 0;
      return Math.sqrt(Math.pow(n, 2) + Math.pow(o, 2));
    };
  })(i);
  let l = Number.POSITIVE_INFINITY;
  return (
    Ws(t, i, e, function (i, h, c) {
      const d = i.inRange(e.x, e.y, n);
      if (s && !d) return;
      const u = i.getCenterPoint(n);
      if (!(!!o || t.isPointInArea(u)) && !d) return;
      const f = r(e, u);
      f < l
        ? ((a = [{ element: i, datasetIndex: h, index: c }]), (l = f))
        : f === l && a.push({ element: i, datasetIndex: h, index: c });
    }),
    a
  );
}
function qs(t, e, i, s, n, o) {
  return o || t.isPointInArea(e)
    ? "r" !== i || s
      ? Ns(t, e, i, s, n, o)
      : (function (t, e, i, s) {
          let n = [];
          return (
            Ws(t, i, e, function (t, i, o) {
              const { startAngle: a, endAngle: r } = t.getProps(
                  ["startAngle", "endAngle"],
                  s
                ),
                { angle: l } = Qt(t, { x: e.x, y: e.y });
              se(l, a, r) && n.push({ element: t, datasetIndex: i, index: o });
            }),
            n
          );
        })(t, e, i, n)
    : [];
}
function Ys(t, e, i, s, n) {
  const o = [],
    a = "x" === i ? "inXRange" : "inYRange";
  let r = !1;
  return (
    Ws(t, i, e, (t, s, l) => {
      t[a](e[i], n) &&
        (o.push({ element: t, datasetIndex: s, index: l }),
        (r = r || t.inRange(e.x, e.y, n)));
    }),
    s && !r ? [] : o
  );
}
var Xs = {
  evaluateInteractionItems: Ws,
  modes: {
    index(t, e, i, s) {
      const n = Vi(e, t),
        o = i.axis || "x",
        a = i.includeInvisible || !1,
        r = i.intersect ? js(t, n, o, s, a) : qs(t, n, o, !1, s, a),
        l = [];
      return r.length
        ? (t.getSortedVisibleDatasetMetas().forEach((t) => {
            const e = r[0].index,
              i = t.data[e];
            i &&
              !i.skip &&
              l.push({ element: i, datasetIndex: t.index, index: e });
          }),
          l)
        : [];
    },
    dataset(t, e, i, s) {
      const n = Vi(e, t),
        o = i.axis || "xy",
        a = i.includeInvisible || !1;
      let r = i.intersect ? js(t, n, o, s, a) : qs(t, n, o, !1, s, a);
      if (r.length > 0) {
        const e = r[0].datasetIndex,
          i = t.getDatasetMeta(e).data;
        r = [];
        for (let t = 0; t < i.length; ++t)
          r.push({ element: i[t], datasetIndex: e, index: t });
      }
      return r;
    },
    point: (t, e, i, s) =>
      js(t, Vi(e, t), i.axis || "xy", s, i.includeInvisible || !1),
    nearest(t, e, i, s) {
      const n = Vi(e, t),
        o = i.axis || "xy",
        a = i.includeInvisible || !1;
      return qs(t, n, o, i.intersect, s, a);
    },
    x: (t, e, i, s) => Ys(t, Vi(e, t), "x", i.intersect, s),
    y: (t, e, i, s) => Ys(t, Vi(e, t), "y", i.intersect, s),
  },
};
const Us = ["left", "top", "right", "bottom"];
function Gs(t, e) {
  return t.filter((t) => t.pos === e);
}
function Js(t, e) {
  return t.filter((t) => -1 === Us.indexOf(t.pos) && t.box.axis === e);
}
function Ks(t, e) {
  return t.sort((t, i) => {
    const s = e ? i : t,
      n = e ? t : i;
    return s.weight === n.weight ? s.index - n.index : s.weight - n.weight;
  });
}
function Zs(t, e) {
  const i = (function (t) {
      const e = {};
      for (const i of t) {
        const { stack: t, pos: s, stackWeight: n } = i;
        if (!t || !Us.includes(s)) continue;
        const o = e[t] || (e[t] = { count: 0, placed: 0, weight: 0, size: 0 });
        o.count++, (o.weight += n);
      }
      return e;
    })(t),
    { vBoxMaxWidth: s, hBoxMaxHeight: n } = e;
  let o, a, r;
  for (o = 0, a = t.length; o < a; ++o) {
    r = t[o];
    const { fullSize: a } = r.box,
      l = i[r.stack],
      h = l && r.stackWeight / l.weight;
    r.horizontal
      ? ((r.width = h ? h * s : a && e.availableWidth), (r.height = n))
      : ((r.width = s), (r.height = h ? h * n : a && e.availableHeight));
  }
  return i;
}
function Qs(t, e, i, s) {
  return Math.max(t[i], e[i]) + Math.max(t[s], e[s]);
}
function tn(t, e) {
  (t.top = Math.max(t.top, e.top)),
    (t.left = Math.max(t.left, e.left)),
    (t.bottom = Math.max(t.bottom, e.bottom)),
    (t.right = Math.max(t.right, e.right));
}
function en(t, e, i, s) {
  const { pos: n, box: o } = i,
    a = t.maxPadding;
  if (!ft(n)) {
    i.size && (t[n] -= i.size);
    const e = s[i.stack] || { size: 0, count: 1 };
    (e.size = Math.max(e.size, i.horizontal ? o.height : o.width)),
      (i.size = e.size / e.count),
      (t[n] += i.size);
  }
  o.getPadding && tn(a, o.getPadding());
  const r = Math.max(0, e.outerWidth - Qs(a, t, "left", "right")),
    l = Math.max(0, e.outerHeight - Qs(a, t, "top", "bottom")),
    h = r !== t.w,
    c = l !== t.h;
  return (
    (t.w = r),
    (t.h = l),
    i.horizontal ? { same: h, other: c } : { same: c, other: h }
  );
}
function sn(t, e) {
  const i = e.maxPadding;
  function s(t) {
    const s = { left: 0, top: 0, right: 0, bottom: 0 };
    return (
      t.forEach((t) => {
        s[t] = Math.max(e[t], i[t]);
      }),
      s
    );
  }
  return s(t ? ["left", "right"] : ["top", "bottom"]);
}
function nn(t, e, i, s) {
  const n = [];
  let o, a, r, l, h, c;
  for (o = 0, a = t.length, h = 0; o < a; ++o) {
    (r = t[o]),
      (l = r.box),
      l.update(r.width || e.w, r.height || e.h, sn(r.horizontal, e));
    const { same: a, other: d } = en(e, i, r, s);
    (h |= a && n.length), (c = c || d), l.fullSize || n.push(r);
  }
  return (h && nn(n, e, i, s)) || c;
}
function on(t, e, i, s, n) {
  (t.top = i),
    (t.left = e),
    (t.right = e + s),
    (t.bottom = i + n),
    (t.width = s),
    (t.height = n);
}
function an(t, e, i, s) {
  const n = i.padding;
  let { x: o, y: a } = e;
  for (const r of t) {
    const t = r.box,
      l = s[r.stack] || { count: 1, placed: 0, weight: 1 },
      h = r.stackWeight / l.weight || 1;
    if (r.horizontal) {
      const s = e.w * h,
        o = l.size || t.height;
      Ot(l.start) && (a = l.start),
        t.fullSize
          ? on(t, n.left, a, i.outerWidth - n.right - n.left, o)
          : on(t, e.left + l.placed, a, s, o),
        (l.start = a),
        (l.placed += s),
        (a = t.bottom);
    } else {
      const s = e.h * h,
        a = l.size || t.width;
      Ot(l.start) && (o = l.start),
        t.fullSize
          ? on(t, o, n.top, a, i.outerHeight - n.bottom - n.top)
          : on(t, o, e.top + l.placed, a, s),
        (l.start = o),
        (l.placed += s),
        (o = t.right);
    }
  }
  (e.x = o), (e.y = a);
}
var rn = {
  addBox(t, e) {
    t.boxes || (t.boxes = []),
      (e.fullSize = e.fullSize || !1),
      (e.position = e.position || "top"),
      (e.weight = e.weight || 0),
      (e._layers =
        e._layers ||
        function () {
          return [
            {
              z: 0,
              draw(t) {
                e.draw(t);
              },
            },
          ];
        }),
      t.boxes.push(e);
  },
  removeBox(t, e) {
    const i = t.boxes ? t.boxes.indexOf(e) : -1;
    -1 !== i && t.boxes.splice(i, 1);
  },
  configure(t, e, i) {
    (e.fullSize = i.fullSize), (e.position = i.position), (e.weight = i.weight);
  },
  update(t, e, i, s) {
    if (!t) return;
    const n = li(t.options.layout.padding),
      o = Math.max(e - n.width, 0),
      a = Math.max(i - n.height, 0),
      r = (function (t) {
        const e = (function (t) {
            const e = [];
            let i, s, n, o, a, r;
            for (i = 0, s = (t || []).length; i < s; ++i)
              (n = t[i]),
                ({
                  position: o,
                  options: { stack: a, stackWeight: r = 1 },
                } = n),
                e.push({
                  index: i,
                  box: n,
                  pos: o,
                  horizontal: n.isHorizontal(),
                  weight: n.weight,
                  stack: a && o + a,
                  stackWeight: r,
                });
            return e;
          })(t),
          i = Ks(
            e.filter((t) => t.box.fullSize),
            !0
          ),
          s = Ks(Gs(e, "left"), !0),
          n = Ks(Gs(e, "right")),
          o = Ks(Gs(e, "top"), !0),
          a = Ks(Gs(e, "bottom")),
          r = Js(e, "x"),
          l = Js(e, "y");
        return {
          fullSize: i,
          leftAndTop: s.concat(o),
          rightAndBottom: n.concat(l).concat(a).concat(r),
          chartArea: Gs(e, "chartArea"),
          vertical: s.concat(n).concat(l),
          horizontal: o.concat(a).concat(r),
        };
      })(t.boxes),
      l = r.vertical,
      h = r.horizontal;
    yt(t.boxes, (t) => {
      "function" == typeof t.beforeLayout && t.beforeLayout();
    });
    const c =
        l.reduce(
          (t, e) => (e.box.options && !1 === e.box.options.display ? t : t + 1),
          0
        ) || 1,
      d = Object.freeze({
        outerWidth: e,
        outerHeight: i,
        padding: n,
        availableWidth: o,
        availableHeight: a,
        vBoxMaxWidth: o / 2 / c,
        hBoxMaxHeight: a / 2,
      }),
      u = Object.assign({}, n);
    tn(u, li(s));
    const f = Object.assign(
        { maxPadding: u, w: o, h: a, x: n.left, y: n.top },
        n
      ),
      p = Zs(l.concat(h), d);
    nn(r.fullSize, f, d, p),
      nn(l, f, d, p),
      nn(h, f, d, p) && nn(l, f, d, p),
      (function (t) {
        const e = t.maxPadding;
        function i(i) {
          const s = Math.max(e[i] - t[i], 0);
          return (t[i] += s), s;
        }
        (t.y += i("top")), (t.x += i("left")), i("right"), i("bottom");
      })(f),
      an(r.leftAndTop, f, d, p),
      (f.x += f.w),
      (f.y += f.h),
      an(r.rightAndBottom, f, d, p),
      (t.chartArea = {
        left: f.left,
        top: f.top,
        right: f.left + f.w,
        bottom: f.top + f.h,
        height: f.h,
        width: f.w,
      }),
      yt(r.chartArea, (e) => {
        const i = e.box;
        Object.assign(i, t.chartArea),
          i.update(f.w, f.h, { left: 0, top: 0, right: 0, bottom: 0 });
      });
  },
};
class ln {
  acquireContext(t, e) {}
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, e, i) {}
  removeEventListener(t, e, i) {}
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, e, i, s) {
    return (
      (e = Math.max(0, e || t.width)),
      (i = i || t.height),
      { width: e, height: Math.max(0, s ? Math.floor(e / s) : i) }
    );
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {}
}
class hn extends ln {
  acquireContext(t) {
    return (t && t.getContext && t.getContext("2d")) || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const cn = "$chartjs",
  dn = {
    touchstart: "mousedown",
    touchmove: "mousemove",
    touchend: "mouseup",
    pointerenter: "mouseenter",
    pointerdown: "mousedown",
    pointermove: "mousemove",
    pointerup: "mouseup",
    pointerleave: "mouseout",
    pointerout: "mouseout",
  },
  un = (t) => null === t || "" === t;
const fn = !!qi && { passive: !0 };
function pn(t, e, i) {
  t.canvas.removeEventListener(e, i, fn);
}
function gn(t, e) {
  for (const i of t) if (i === e || i.contains(e)) return !0;
}
function mn(t, e, i) {
  const s = t.canvas,
    n = new MutationObserver((t) => {
      let e = !1;
      for (const i of t)
        (e = e || gn(i.addedNodes, s)), (e = e && !gn(i.removedNodes, s));
      e && i();
    });
  return n.observe(document, { childList: !0, subtree: !0 }), n;
}
function bn(t, e, i) {
  const s = t.canvas,
    n = new MutationObserver((t) => {
      let e = !1;
      for (const i of t)
        (e = e || gn(i.removedNodes, s)), (e = e && !gn(i.addedNodes, s));
      e && i();
    });
  return n.observe(document, { childList: !0, subtree: !0 }), n;
}
const xn = new Map();
let yn = 0;
function _n() {
  const t = window.devicePixelRatio;
  t !== yn &&
    ((yn = t),
    xn.forEach((e, i) => {
      i.currentDevicePixelRatio !== t && e();
    }));
}
function vn(t, e, i) {
  const s = t.canvas,
    n = s && $i(s);
  if (!n) return;
  const o = pe((t, e) => {
      const s = n.clientWidth;
      i(t, e), s < n.clientWidth && i();
    }, window),
    a = new ResizeObserver((t) => {
      const e = t[0],
        i = e.contentRect.width,
        s = e.contentRect.height;
      (0 === i && 0 === s) || o(i, s);
    });
  return (
    a.observe(n),
    (function (t, e) {
      xn.size || window.addEventListener("resize", _n), xn.set(t, e);
    })(t, o),
    a
  );
}
function wn(t, e, i) {
  i && i.disconnect(),
    "resize" === e &&
      (function (t) {
        xn.delete(t), xn.size || window.removeEventListener("resize", _n);
      })(t);
}
function Mn(t, e, i) {
  const s = t.canvas,
    n = pe((e) => {
      null !== t.ctx &&
        i(
          (function (t, e) {
            const i = dn[t.type] || t.type,
              { x: s, y: n } = Vi(t, e);
            return {
              type: i,
              chart: e,
              native: t,
              x: void 0 !== s ? s : null,
              y: void 0 !== n ? n : null,
            };
          })(e, t)
        );
    }, t);
  return (
    (function (t, e, i) {
      t.addEventListener(e, i, fn);
    })(s, e, n),
    n
  );
}
class kn extends ln {
  acquireContext(t, e) {
    const i = t && t.getContext && t.getContext("2d");
    return i && i.canvas === t
      ? ((function (t, e) {
          const i = t.style,
            s = t.getAttribute("height"),
            n = t.getAttribute("width");
          if (
            ((t[cn] = {
              initial: {
                height: s,
                width: n,
                style: { display: i.display, height: i.height, width: i.width },
              },
            }),
            (i.display = i.display || "block"),
            (i.boxSizing = i.boxSizing || "border-box"),
            un(n))
          ) {
            const e = Yi(t, "width");
            void 0 !== e && (t.width = e);
          }
          if (un(s))
            if ("" === t.style.height) t.height = t.width / (e || 2);
            else {
              const e = Yi(t, "height");
              void 0 !== e && (t.height = e);
            }
        })(t, e),
        i)
      : null;
  }
  releaseContext(t) {
    const e = t.canvas;
    if (!e[cn]) return !1;
    const i = e[cn].initial;
    ["height", "width"].forEach((t) => {
      const s = i[t];
      dt(s) ? e.removeAttribute(t) : e.setAttribute(t, s);
    });
    const s = i.style || {};
    return (
      Object.keys(s).forEach((t) => {
        e.style[t] = s[t];
      }),
      (e.width = e.width),
      delete e[cn],
      !0
    );
  }
  addEventListener(t, e, i) {
    this.removeEventListener(t, e);
    const s = t.$proxies || (t.$proxies = {}),
      n = { attach: mn, detach: bn, resize: vn }[e] || Mn;
    s[e] = n(t, e, i);
  }
  removeEventListener(t, e) {
    const i = t.$proxies || (t.$proxies = {}),
      s = i[e];
    if (!s) return;
    (({ attach: wn, detach: wn, resize: wn })[e] || pn)(t, e, s),
      (i[e] = void 0);
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, e, i, s) {
    return ji(t, e, i, s);
  }
  isAttached(t) {
    const e = $i(t);
    return !(!e || !e.isConnected);
  }
}
class Sn {
  static defaults = {};
  static defaultRoutes = void 0;
  active = !1;
  tooltipPosition(t) {
    const { x: e, y: i } = this.getProps(["x", "y"], t);
    return { x: e, y: i };
  }
  hasValue() {
    return Xt(this.x) && Xt(this.y);
  }
  getProps(t, e) {
    const i = this.$animations;
    if (!e || !i) return this;
    const s = {};
    return (
      t.forEach((t) => {
        s[t] = i[t] && i[t].active() ? i[t]._to : this[t];
      }),
      s
    );
  }
}
function Pn(t, e) {
  const i = t.options.ticks,
    s = (function (t) {
      const e = t.options.offset,
        i = t._tickSize(),
        s = t._length / i + (e ? 0 : 1),
        n = t._maxLength / i;
      return Math.floor(Math.min(s, n));
    })(t),
    n = Math.min(i.maxTicksLimit || s, s),
    o = i.major.enabled
      ? (function (t) {
          const e = [];
          let i, s;
          for (i = 0, s = t.length; i < s; i++) t[i].major && e.push(i);
          return e;
        })(e)
      : [],
    a = o.length,
    r = o[0],
    l = o[a - 1],
    h = [];
  if (a > n)
    return (
      (function (t, e, i, s) {
        let n,
          o = 0,
          a = i[0];
        for (s = Math.ceil(s), n = 0; n < t.length; n++)
          n === a && (e.push(t[n]), o++, (a = i[o * s]));
      })(e, h, o, a / n),
      h
    );
  const c = (function (t, e, i) {
    const s = (function (t) {
        const e = t.length;
        let i, s;
        if (e < 2) return !1;
        for (s = t[0], i = 1; i < e; ++i) if (t[i] - t[i - 1] !== s) return !1;
        return s;
      })(t),
      n = e.length / i;
    if (!s) return Math.max(n, 1);
    const o = Yt(s);
    for (let t = 0, e = o.length - 1; t < e; t++) {
      const e = o[t];
      if (e > n) return e;
    }
    return Math.max(n, 1);
  })(o, e, n);
  if (a > 0) {
    let t, i;
    const s = a > 1 ? Math.round((l - r) / (a - 1)) : null;
    for (Cn(e, h, c, dt(s) ? 0 : r - s, r), t = 0, i = a - 1; t < i; t++)
      Cn(e, h, c, o[t], o[t + 1]);
    return Cn(e, h, c, l, dt(s) ? e.length : l + s), h;
  }
  return Cn(e, h, c), h;
}
function Cn(t, e, i, s, n) {
  const o = mt(s, 0),
    a = Math.min(mt(n, t.length), t.length);
  let r,
    l,
    h,
    c = 0;
  for (
    i = Math.ceil(i), n && ((r = n - s), (i = r / Math.floor(r / i))), h = o;
    h < 0;

  )
    c++, (h = Math.round(o + c * i));
  for (l = Math.max(o, 0); l < a; l++)
    l === h && (e.push(t[l]), c++, (h = Math.round(o + c * i)));
}
const Dn = (t) => ("left" === t ? "right" : "right" === t ? "left" : t),
  Tn = (t, e, i) => ("top" === e || "left" === e ? t[e] + i : t[e] - i),
  On = (t, e) => Math.min(e || t, t);
function Ln(t, e) {
  const i = [],
    s = t.length / e,
    n = t.length;
  let o = 0;
  for (; o < n; o += s) i.push(t[Math.floor(o)]);
  return i;
}
function An(t, e, i) {
  const s = t.ticks.length,
    n = Math.min(e, s - 1),
    o = t._startPixel,
    a = t._endPixel,
    r = 1e-6;
  let l,
    h = t.getPixelForTick(n);
  if (
    !(
      i &&
      ((l =
        1 === s
          ? Math.max(h - o, a - h)
          : 0 === e
          ? (t.getPixelForTick(1) - h) / 2
          : (h - t.getPixelForTick(n - 1)) / 2),
      (h += n < e ? l : -l),
      h < o - r || h > a + r)
    )
  )
    return h;
}
function En(t) {
  return t.drawTicks ? t.tickLength : 0;
}
function Rn(t, e) {
  if (!t.display) return 0;
  const i = hi(t.font, e),
    s = li(t.padding);
  return (ut(t.text) ? t.text.length : 1) * i.lineHeight + s.height;
}
function $n(t, e, i) {
  let s = me(t);
  return ((i && "right" !== e) || (!i && "right" === e)) && (s = Dn(s)), s;
}
class In extends Sn {
  constructor(t) {
    super(),
      (this.id = t.id),
      (this.type = t.type),
      (this.options = void 0),
      (this.ctx = t.ctx),
      (this.chart = t.chart),
      (this.top = void 0),
      (this.bottom = void 0),
      (this.left = void 0),
      (this.right = void 0),
      (this.width = void 0),
      (this.height = void 0),
      (this._margins = { left: 0, right: 0, top: 0, bottom: 0 }),
      (this.maxWidth = void 0),
      (this.maxHeight = void 0),
      (this.paddingTop = void 0),
      (this.paddingBottom = void 0),
      (this.paddingLeft = void 0),
      (this.paddingRight = void 0),
      (this.axis = void 0),
      (this.labelRotation = void 0),
      (this.min = void 0),
      (this.max = void 0),
      (this._range = void 0),
      (this.ticks = []),
      (this._gridLineItems = null),
      (this._labelItems = null),
      (this._labelSizes = null),
      (this._length = 0),
      (this._maxLength = 0),
      (this._longestTextCache = {}),
      (this._startPixel = void 0),
      (this._endPixel = void 0),
      (this._reversePixels = !1),
      (this._userMax = void 0),
      (this._userMin = void 0),
      (this._suggestedMax = void 0),
      (this._suggestedMin = void 0),
      (this._ticksLength = 0),
      (this._borderValue = 0),
      (this._cache = {}),
      (this._dataLimitsCached = !1),
      (this.$context = void 0);
  }
  init(t) {
    (this.options = t.setContext(this.getContext())),
      (this.axis = t.axis),
      (this._userMin = this.parse(t.min)),
      (this._userMax = this.parse(t.max)),
      (this._suggestedMin = this.parse(t.suggestedMin)),
      (this._suggestedMax = this.parse(t.suggestedMax));
  }
  parse(t, e) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: e, _suggestedMin: i, _suggestedMax: s } = this;
    return (
      (t = gt(t, Number.POSITIVE_INFINITY)),
      (e = gt(e, Number.NEGATIVE_INFINITY)),
      (i = gt(i, Number.POSITIVE_INFINITY)),
      (s = gt(s, Number.NEGATIVE_INFINITY)),
      { min: gt(t, i), max: gt(e, s), minDefined: pt(t), maxDefined: pt(e) }
    );
  }
  getMinMax(t) {
    let e,
      { min: i, max: s, minDefined: n, maxDefined: o } = this.getUserBounds();
    if (n && o) return { min: i, max: s };
    const a = this.getMatchingVisibleMetas();
    for (let r = 0, l = a.length; r < l; ++r)
      (e = a[r].controller.getMinMax(this, t)),
        n || (i = Math.min(i, e.min)),
        o || (s = Math.max(s, e.max));
    return (
      (i = o && i > s ? s : i),
      (s = n && i > s ? i : s),
      { min: gt(i, gt(s, i)), max: gt(s, gt(i, s)) }
    );
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0,
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return (
      this.options.labels ||
      (this.isHorizontal() ? t.xLabels : t.yLabels) ||
      t.labels ||
      []
    );
  }
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    (this._cache = {}), (this._dataLimitsCached = !1);
  }
  beforeUpdate() {
    xt(this.options.beforeUpdate, [this]);
  }
  update(t, e, i) {
    const { beginAtZero: s, grace: n, ticks: o } = this.options,
      a = o.sampleSize;
    this.beforeUpdate(),
      (this.maxWidth = t),
      (this.maxHeight = e),
      (this._margins = i =
        Object.assign({ left: 0, right: 0, top: 0, bottom: 0 }, i)),
      (this.ticks = null),
      (this._labelSizes = null),
      (this._gridLineItems = null),
      (this._labelItems = null),
      this.beforeSetDimensions(),
      this.setDimensions(),
      this.afterSetDimensions(),
      (this._maxLength = this.isHorizontal()
        ? this.width + i.left + i.right
        : this.height + i.top + i.bottom),
      this._dataLimitsCached ||
        (this.beforeDataLimits(),
        this.determineDataLimits(),
        this.afterDataLimits(),
        (this._range = di(this, n, s)),
        (this._dataLimitsCached = !0)),
      this.beforeBuildTicks(),
      (this.ticks = this.buildTicks() || []),
      this.afterBuildTicks();
    const r = a < this.ticks.length;
    this._convertTicksToLabels(r ? Ln(this.ticks, a) : this.ticks),
      this.configure(),
      this.beforeCalculateLabelRotation(),
      this.calculateLabelRotation(),
      this.afterCalculateLabelRotation(),
      o.display &&
        (o.autoSkip || "auto" === o.source) &&
        ((this.ticks = Pn(this, this.ticks)),
        (this._labelSizes = null),
        this.afterAutoSkip()),
      r && this._convertTicksToLabels(this.ticks),
      this.beforeFit(),
      this.fit(),
      this.afterFit(),
      this.afterUpdate();
  }
  configure() {
    let t,
      e,
      i = this.options.reverse;
    this.isHorizontal()
      ? ((t = this.left), (e = this.right))
      : ((t = this.top), (e = this.bottom), (i = !i)),
      (this._startPixel = t),
      (this._endPixel = e),
      (this._reversePixels = i),
      (this._length = e - t),
      (this._alignToPixels = this.options.alignToPixels);
  }
  afterUpdate() {
    xt(this.options.afterUpdate, [this]);
  }
  beforeSetDimensions() {
    xt(this.options.beforeSetDimensions, [this]);
  }
  setDimensions() {
    this.isHorizontal()
      ? ((this.width = this.maxWidth),
        (this.left = 0),
        (this.right = this.width))
      : ((this.height = this.maxHeight),
        (this.top = 0),
        (this.bottom = this.height)),
      (this.paddingLeft = 0),
      (this.paddingTop = 0),
      (this.paddingRight = 0),
      (this.paddingBottom = 0);
  }
  afterSetDimensions() {
    xt(this.options.afterSetDimensions, [this]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), xt(this.options[t], [this]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {}
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    xt(this.options.beforeTickToLabelConversion, [this]);
  }
  generateTickLabels(t) {
    const e = this.options.ticks;
    let i, s, n;
    for (i = 0, s = t.length; i < s; i++)
      (n = t[i]), (n.label = xt(e.callback, [n.value, i, t], this));
  }
  afterTickToLabelConversion() {
    xt(this.options.afterTickToLabelConversion, [this]);
  }
  beforeCalculateLabelRotation() {
    xt(this.options.beforeCalculateLabelRotation, [this]);
  }
  calculateLabelRotation() {
    const t = this.options,
      e = t.ticks,
      i = On(this.ticks.length, t.ticks.maxTicksLimit),
      s = e.minRotation || 0,
      n = e.maxRotation;
    let o,
      a,
      r,
      l = s;
    if (
      !this._isVisible() ||
      !e.display ||
      s >= n ||
      i <= 1 ||
      !this.isHorizontal()
    )
      return void (this.labelRotation = s);
    const h = this._getLabelSizes(),
      c = h.widest.width,
      d = h.highest.height,
      u = ne(this.chart.width - c, 0, this.maxWidth);
    (o = t.offset ? this.maxWidth / i : u / (i - 1)),
      c + 6 > o &&
        ((o = u / (i - (t.offset ? 0.5 : 1))),
        (a =
          this.maxHeight -
          En(t.grid) -
          e.padding -
          Rn(t.title, this.chart.options.font)),
        (r = Math.sqrt(c * c + d * d)),
        (l = Kt(
          Math.min(
            Math.asin(ne((h.highest.height + 6) / o, -1, 1)),
            Math.asin(ne(a / r, -1, 1)) - Math.asin(ne(d / r, -1, 1))
          )
        )),
        (l = Math.max(s, Math.min(n, l)))),
      (this.labelRotation = l);
  }
  afterCalculateLabelRotation() {
    xt(this.options.afterCalculateLabelRotation, [this]);
  }
  afterAutoSkip() {}
  beforeFit() {
    xt(this.options.beforeFit, [this]);
  }
  fit() {
    const t = { width: 0, height: 0 },
      {
        chart: e,
        options: { ticks: i, title: s, grid: n },
      } = this,
      o = this._isVisible(),
      a = this.isHorizontal();
    if (o) {
      const o = Rn(s, e.options.font);
      if (
        (a
          ? ((t.width = this.maxWidth), (t.height = En(n) + o))
          : ((t.height = this.maxHeight), (t.width = En(n) + o)),
        i.display && this.ticks.length)
      ) {
        const {
            first: e,
            last: s,
            widest: n,
            highest: o,
          } = this._getLabelSizes(),
          r = 2 * i.padding,
          l = Jt(this.labelRotation),
          h = Math.cos(l),
          c = Math.sin(l);
        if (a) {
          const e = i.mirror ? 0 : c * n.width + h * o.height;
          t.height = Math.min(this.maxHeight, t.height + e + r);
        } else {
          const e = i.mirror ? 0 : h * n.width + c * o.height;
          t.width = Math.min(this.maxWidth, t.width + e + r);
        }
        this._calculatePadding(e, s, c, h);
      }
    }
    this._handleMargins(),
      a
        ? ((this.width = this._length =
            e.width - this._margins.left - this._margins.right),
          (this.height = t.height))
        : ((this.width = t.width),
          (this.height = this._length =
            e.height - this._margins.top - this._margins.bottom));
  }
  _calculatePadding(t, e, i, s) {
    const {
        ticks: { align: n, padding: o },
        position: a,
      } = this.options,
      r = 0 !== this.labelRotation,
      l = "top" !== a && "x" === this.axis;
    if (this.isHorizontal()) {
      const a = this.getPixelForTick(0) - this.left,
        h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let c = 0,
        d = 0;
      r
        ? l
          ? ((c = s * t.width), (d = i * e.height))
          : ((c = i * t.height), (d = s * e.width))
        : "start" === n
        ? (d = e.width)
        : "end" === n
        ? (c = t.width)
        : "inner" !== n && ((c = t.width / 2), (d = e.width / 2)),
        (this.paddingLeft = Math.max(
          ((c - a + o) * this.width) / (this.width - a),
          0
        )),
        (this.paddingRight = Math.max(
          ((d - h + o) * this.width) / (this.width - h),
          0
        ));
    } else {
      let i = e.height / 2,
        s = t.height / 2;
      "start" === n
        ? ((i = 0), (s = t.height))
        : "end" === n && ((i = e.height), (s = 0)),
        (this.paddingTop = i + o),
        (this.paddingBottom = s + o);
    }
  }
  _handleMargins() {
    this._margins &&
      ((this._margins.left = Math.max(this.paddingLeft, this._margins.left)),
      (this._margins.top = Math.max(this.paddingTop, this._margins.top)),
      (this._margins.right = Math.max(this.paddingRight, this._margins.right)),
      (this._margins.bottom = Math.max(
        this.paddingBottom,
        this._margins.bottom
      )));
  }
  afterFit() {
    xt(this.options.afterFit, [this]);
  }
  isHorizontal() {
    const { axis: t, position: e } = this.options;
    return "top" === e || "bottom" === e || "x" === t;
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    let e, i;
    for (
      this.beforeTickToLabelConversion(),
        this.generateTickLabels(t),
        e = 0,
        i = t.length;
      e < i;
      e++
    )
      dt(t[e].label) && (t.splice(e, 1), i--, e--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const e = this.options.ticks.sampleSize;
      let i = this.ticks;
      e < i.length && (i = Ln(i, e)),
        (this._labelSizes = t =
          this._computeLabelSizes(
            i,
            i.length,
            this.options.ticks.maxTicksLimit
          ));
    }
    return t;
  }
  _computeLabelSizes(t, e, i) {
    const { ctx: s, _longestTextCache: n } = this,
      o = [],
      a = [],
      r = Math.floor(e / On(e, i));
    let l,
      h,
      c,
      d,
      u,
      f,
      p,
      g,
      m,
      b,
      x,
      y = 0,
      _ = 0;
    for (l = 0; l < e; l += r) {
      if (
        ((d = t[l].label),
        (u = this._resolveTickFontOptions(l)),
        (s.font = f = u.string),
        (p = n[f] = n[f] || { data: {}, gc: [] }),
        (g = u.lineHeight),
        (m = b = 0),
        dt(d) || ut(d))
      ) {
        if (ut(d))
          for (h = 0, c = d.length; h < c; ++h)
            (x = d[h]),
              dt(x) || ut(x) || ((m = Be(s, p.data, p.gc, m, x)), (b += g));
      } else (m = Be(s, p.data, p.gc, m, d)), (b = g);
      o.push(m), a.push(b), (y = Math.max(m, y)), (_ = Math.max(b, _));
    }
    !(function (t, e) {
      yt(t, (t) => {
        const i = t.gc,
          s = i.length / 2;
        let n;
        if (s > e) {
          for (n = 0; n < s; ++n) delete t.data[i[n]];
          i.splice(0, s);
        }
      });
    })(n, e);
    const v = o.indexOf(y),
      w = a.indexOf(_),
      M = (t) => ({ width: o[t] || 0, height: a[t] || 0 });
    return {
      first: M(0),
      last: M(e - 1),
      widest: M(v),
      highest: M(w),
      widths: o,
      heights: a,
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, e) {
    return NaN;
  }
  getValueForPixel(t) {}
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const e = this._startPixel + t * this._length;
    return ne(this._alignToPixels ? We(this.chart, e, 0) : e, -32768, 32767);
  }
  getDecimalForPixel(t) {
    const e = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - e : e;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: e } = this;
    return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
  }
  getContext(t) {
    const e = this.ticks || [];
    if (t >= 0 && t < e.length) {
      const i = e[t];
      return (
        i.$context ||
        (i.$context = (function (t, e, i) {
          return ui(t, { tick: i, index: e, type: "tick" });
        })(this.getContext(), t, i))
      );
    }
    return (
      this.$context ||
      (this.$context = ui(this.chart.getContext(), {
        scale: this,
        type: "scale",
      }))
    );
  }
  _tickSize() {
    const t = this.options.ticks,
      e = Jt(this.labelRotation),
      i = Math.abs(Math.cos(e)),
      s = Math.abs(Math.sin(e)),
      n = this._getLabelSizes(),
      o = t.autoSkipPadding || 0,
      a = n ? n.widest.width + o : 0,
      r = n ? n.highest.height + o : 0;
    return this.isHorizontal()
      ? r * i > a * s
        ? a / i
        : r / s
      : r * s < a * i
      ? r / i
      : a / s;
  }
  _isVisible() {
    const t = this.options.display;
    return "auto" !== t ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const e = this.axis,
      i = this.chart,
      s = this.options,
      { grid: n, position: o, border: a } = s,
      r = n.offset,
      l = this.isHorizontal(),
      h = this.ticks.length + (r ? 1 : 0),
      c = En(n),
      d = [],
      u = a.setContext(this.getContext()),
      f = u.display ? u.width : 0,
      p = f / 2,
      g = function (t) {
        return We(i, t, f);
      };
    let m, b, x, y, _, v, w, M, k, S, P, C;
    if ("top" === o)
      (m = g(this.bottom)),
        (v = this.bottom - c),
        (M = m - p),
        (S = g(t.top) + p),
        (C = t.bottom);
    else if ("bottom" === o)
      (m = g(this.top)),
        (S = t.top),
        (C = g(t.bottom) - p),
        (v = m + p),
        (M = this.top + c);
    else if ("left" === o)
      (m = g(this.right)),
        (_ = this.right - c),
        (w = m - p),
        (k = g(t.left) + p),
        (P = t.right);
    else if ("right" === o)
      (m = g(this.left)),
        (k = t.left),
        (P = g(t.right) - p),
        (_ = m + p),
        (w = this.left + c);
    else if ("x" === e) {
      if ("center" === o) m = g((t.top + t.bottom) / 2 + 0.5);
      else if (ft(o)) {
        const t = Object.keys(o)[0],
          e = o[t];
        m = g(this.chart.scales[t].getPixelForValue(e));
      }
      (S = t.top), (C = t.bottom), (v = m + p), (M = v + c);
    } else if ("y" === e) {
      if ("center" === o) m = g((t.left + t.right) / 2);
      else if (ft(o)) {
        const t = Object.keys(o)[0],
          e = o[t];
        m = g(this.chart.scales[t].getPixelForValue(e));
      }
      (_ = m - p), (w = _ - c), (k = t.left), (P = t.right);
    }
    const D = mt(s.ticks.maxTicksLimit, h),
      T = Math.max(1, Math.ceil(h / D));
    for (b = 0; b < h; b += T) {
      const t = this.getContext(b),
        e = n.setContext(t),
        s = a.setContext(t),
        o = e.lineWidth,
        h = e.color,
        c = s.dash || [],
        u = s.dashOffset,
        f = e.tickWidth,
        p = e.tickColor,
        g = e.tickBorderDash || [],
        m = e.tickBorderDashOffset;
      (x = An(this, b, r)),
        void 0 !== x &&
          ((y = We(i, x, o)),
          l ? (_ = w = k = P = y) : (v = M = S = C = y),
          d.push({
            tx1: _,
            ty1: v,
            tx2: w,
            ty2: M,
            x1: k,
            y1: S,
            x2: P,
            y2: C,
            width: o,
            color: h,
            borderDash: c,
            borderDashOffset: u,
            tickWidth: f,
            tickColor: p,
            tickBorderDash: g,
            tickBorderDashOffset: m,
          }));
    }
    return (this._ticksLength = h), (this._borderValue = m), d;
  }
  _computeLabelItems(t) {
    const e = this.axis,
      i = this.options,
      { position: s, ticks: n } = i,
      o = this.isHorizontal(),
      a = this.ticks,
      { align: r, crossAlign: l, padding: h, mirror: c } = n,
      d = En(i.grid),
      u = d + h,
      f = c ? -h : u,
      p = -Jt(this.labelRotation),
      g = [];
    let m,
      b,
      x,
      y,
      _,
      v,
      w,
      M,
      k,
      S,
      P,
      C,
      D = "middle";
    if ("top" === s)
      (v = this.bottom - f), (w = this._getXAxisLabelAlignment());
    else if ("bottom" === s)
      (v = this.top + f), (w = this._getXAxisLabelAlignment());
    else if ("left" === s) {
      const t = this._getYAxisLabelAlignment(d);
      (w = t.textAlign), (_ = t.x);
    } else if ("right" === s) {
      const t = this._getYAxisLabelAlignment(d);
      (w = t.textAlign), (_ = t.x);
    } else if ("x" === e) {
      if ("center" === s) v = (t.top + t.bottom) / 2 + u;
      else if (ft(s)) {
        const t = Object.keys(s)[0],
          e = s[t];
        v = this.chart.scales[t].getPixelForValue(e) + u;
      }
      w = this._getXAxisLabelAlignment();
    } else if ("y" === e) {
      if ("center" === s) _ = (t.left + t.right) / 2 - u;
      else if (ft(s)) {
        const t = Object.keys(s)[0],
          e = s[t];
        _ = this.chart.scales[t].getPixelForValue(e);
      }
      w = this._getYAxisLabelAlignment(d).textAlign;
    }
    "y" === e && ("start" === r ? (D = "top") : "end" === r && (D = "bottom"));
    const T = this._getLabelSizes();
    for (m = 0, b = a.length; m < b; ++m) {
      (x = a[m]), (y = x.label);
      const t = n.setContext(this.getContext(m));
      (M = this.getPixelForTick(m) + n.labelOffset),
        (k = this._resolveTickFontOptions(m)),
        (S = k.lineHeight),
        (P = ut(y) ? y.length : 1);
      const e = P / 2,
        i = t.color,
        r = t.textStrokeColor,
        h = t.textStrokeWidth;
      let d,
        u = w;
      if (
        (o
          ? ((_ = M),
            "inner" === w &&
              (u =
                m === b - 1
                  ? this.options.reverse
                    ? "left"
                    : "right"
                  : 0 === m
                  ? this.options.reverse
                    ? "right"
                    : "left"
                  : "center"),
            (C =
              "top" === s
                ? "near" === l || 0 !== p
                  ? -P * S + S / 2
                  : "center" === l
                  ? -T.highest.height / 2 - e * S + S
                  : -T.highest.height + S / 2
                : "near" === l || 0 !== p
                ? S / 2
                : "center" === l
                ? T.highest.height / 2 - e * S
                : T.highest.height - P * S),
            c && (C *= -1),
            0 === p || t.showLabelBackdrop || (_ += (S / 2) * Math.sin(p)))
          : ((v = M), (C = ((1 - P) * S) / 2)),
        t.showLabelBackdrop)
      ) {
        const e = li(t.backdropPadding),
          i = T.heights[m],
          s = T.widths[m];
        let n = C - e.top,
          o = 0 - e.left;
        switch (D) {
          case "middle":
            n -= i / 2;
            break;
          case "bottom":
            n -= i;
        }
        switch (w) {
          case "center":
            o -= s / 2;
            break;
          case "right":
            o -= s;
        }
        d = {
          left: o,
          top: n,
          width: s + e.width,
          height: i + e.height,
          color: t.backdropColor,
        };
      }
      g.push({
        label: y,
        font: k,
        textOffset: C,
        options: {
          rotation: p,
          color: i,
          strokeColor: r,
          strokeWidth: h,
          textAlign: u,
          textBaseline: D,
          translation: [_, v],
          backdrop: d,
        },
      });
    }
    return g;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: e } = this.options;
    if (-Jt(this.labelRotation)) return "top" === t ? "left" : "right";
    let i = "center";
    return (
      "start" === e.align
        ? (i = "left")
        : "end" === e.align
        ? (i = "right")
        : "inner" === e.align && (i = "inner"),
      i
    );
  }
  _getYAxisLabelAlignment(t) {
    const {
        position: e,
        ticks: { crossAlign: i, mirror: s, padding: n },
      } = this.options,
      o = t + n,
      a = this._getLabelSizes().widest.width;
    let r, l;
    return (
      "left" === e
        ? s
          ? ((l = this.right + n),
            "near" === i
              ? (r = "left")
              : "center" === i
              ? ((r = "center"), (l += a / 2))
              : ((r = "right"), (l += a)))
          : ((l = this.right - o),
            "near" === i
              ? (r = "right")
              : "center" === i
              ? ((r = "center"), (l -= a / 2))
              : ((r = "left"), (l = this.left)))
        : "right" === e
        ? s
          ? ((l = this.left + n),
            "near" === i
              ? (r = "right")
              : "center" === i
              ? ((r = "center"), (l -= a / 2))
              : ((r = "left"), (l -= a)))
          : ((l = this.left + o),
            "near" === i
              ? (r = "left")
              : "center" === i
              ? ((r = "center"), (l += a / 2))
              : ((r = "right"), (l = this.right)))
        : (r = "right"),
      { textAlign: r, x: l }
    );
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror) return;
    const t = this.chart,
      e = this.options.position;
    return "left" === e || "right" === e
      ? { top: 0, left: this.left, bottom: t.height, right: this.right }
      : "top" === e || "bottom" === e
      ? { top: this.top, left: 0, bottom: this.bottom, right: t.width }
      : void 0;
  }
  drawBackground() {
    const {
      ctx: t,
      options: { backgroundColor: e },
      left: i,
      top: s,
      width: n,
      height: o,
    } = this;
    e && (t.save(), (t.fillStyle = e), t.fillRect(i, s, n, o), t.restore());
  }
  getLineWidthForValue(t) {
    const e = this.options.grid;
    if (!this._isVisible() || !e.display) return 0;
    const i = this.ticks.findIndex((e) => e.value === t);
    if (i >= 0) {
      return e.setContext(this.getContext(i)).lineWidth;
    }
    return 0;
  }
  drawGrid(t) {
    const e = this.options.grid,
      i = this.ctx,
      s =
        this._gridLineItems ||
        (this._gridLineItems = this._computeGridLineItems(t));
    let n, o;
    const a = (t, e, s) => {
      s.width &&
        s.color &&
        (i.save(),
        (i.lineWidth = s.width),
        (i.strokeStyle = s.color),
        i.setLineDash(s.borderDash || []),
        (i.lineDashOffset = s.borderDashOffset),
        i.beginPath(),
        i.moveTo(t.x, t.y),
        i.lineTo(e.x, e.y),
        i.stroke(),
        i.restore());
    };
    if (e.display)
      for (n = 0, o = s.length; n < o; ++n) {
        const t = s[n];
        e.drawOnChartArea && a({ x: t.x1, y: t.y1 }, { x: t.x2, y: t.y2 }, t),
          e.drawTicks &&
            a(
              { x: t.tx1, y: t.ty1 },
              { x: t.tx2, y: t.ty2 },
              {
                color: t.tickColor,
                width: t.tickWidth,
                borderDash: t.tickBorderDash,
                borderDashOffset: t.tickBorderDashOffset,
              }
            );
      }
  }
  drawBorder() {
    const {
        chart: t,
        ctx: e,
        options: { border: i, grid: s },
      } = this,
      n = i.setContext(this.getContext()),
      o = i.display ? n.width : 0;
    if (!o) return;
    const a = s.setContext(this.getContext(0)).lineWidth,
      r = this._borderValue;
    let l, h, c, d;
    this.isHorizontal()
      ? ((l = We(t, this.left, o) - o / 2),
        (h = We(t, this.right, a) + a / 2),
        (c = d = r))
      : ((c = We(t, this.top, o) - o / 2),
        (d = We(t, this.bottom, a) + a / 2),
        (l = h = r)),
      e.save(),
      (e.lineWidth = n.width),
      (e.strokeStyle = n.color),
      e.beginPath(),
      e.moveTo(l, c),
      e.lineTo(h, d),
      e.stroke(),
      e.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display) return;
    const e = this.ctx,
      i = this._computeLabelArea();
    i && Xe(e, i);
    const s = this.getLabelItems(t);
    for (const t of s) {
      const i = t.options,
        s = t.font;
      Ke(e, t.label, 0, t.textOffset, s, i);
    }
    i && Ue(e);
  }
  drawTitle() {
    const {
      ctx: t,
      options: { position: e, title: i, reverse: s },
    } = this;
    if (!i.display) return;
    const n = hi(i.font),
      o = li(i.padding),
      a = i.align;
    let r = n.lineHeight / 2;
    "bottom" === e || "center" === e || ft(e)
      ? ((r += o.bottom),
        ut(i.text) && (r += n.lineHeight * (i.text.length - 1)))
      : (r += o.top);
    const {
      titleX: l,
      titleY: h,
      maxWidth: c,
      rotation: d,
    } = (function (t, e, i, s) {
      const { top: n, left: o, bottom: a, right: r, chart: l } = t,
        { chartArea: h, scales: c } = l;
      let d,
        u,
        f,
        p = 0;
      const g = a - n,
        m = r - o;
      if (t.isHorizontal()) {
        if (((u = be(s, o, r)), ft(i))) {
          const t = Object.keys(i)[0],
            s = i[t];
          f = c[t].getPixelForValue(s) + g - e;
        } else
          f = "center" === i ? (h.bottom + h.top) / 2 + g - e : Tn(t, i, e);
        d = r - o;
      } else {
        if (ft(i)) {
          const t = Object.keys(i)[0],
            s = i[t];
          u = c[t].getPixelForValue(s) - m + e;
        } else
          u = "center" === i ? (h.left + h.right) / 2 - m + e : Tn(t, i, e);
        (f = be(s, a, n)), (p = "left" === i ? -zt : zt);
      }
      return { titleX: u, titleY: f, maxWidth: d, rotation: p };
    })(this, r, e, a);
    Ke(t, i.text, 0, 0, n, {
      color: i.color,
      maxWidth: c,
      rotation: d,
      textAlign: $n(a, e, s),
      textBaseline: "middle",
      translation: [l, h],
    });
  }
  draw(t) {
    this._isVisible() &&
      (this.drawBackground(),
      this.drawGrid(t),
      this.drawBorder(),
      this.drawTitle(),
      this.drawLabels(t));
  }
  _layers() {
    const t = this.options,
      e = (t.ticks && t.ticks.z) || 0,
      i = mt(t.grid && t.grid.z, -1),
      s = mt(t.border && t.border.z, 0);
    return this._isVisible() && this.draw === In.prototype.draw
      ? [
          {
            z: i,
            draw: (t) => {
              this.drawBackground(), this.drawGrid(t), this.drawTitle();
            },
          },
          {
            z: s,
            draw: () => {
              this.drawBorder();
            },
          },
          {
            z: e,
            draw: (t) => {
              this.drawLabels(t);
            },
          },
        ]
      : [
          {
            z: e,
            draw: (t) => {
              this.draw(t);
            },
          },
        ];
  }
  getMatchingVisibleMetas(t) {
    const e = this.chart.getSortedVisibleDatasetMetas(),
      i = this.axis + "AxisID",
      s = [];
    let n, o;
    for (n = 0, o = e.length; n < o; ++n) {
      const o = e[n];
      o[i] !== this.id || (t && o.type !== t) || s.push(o);
    }
    return s;
  }
  _resolveTickFontOptions(t) {
    return hi(this.options.ticks.setContext(this.getContext(t)).font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Fn {
  constructor(t, e, i) {
    (this.type = t),
      (this.scope = e),
      (this.override = i),
      (this.items = Object.create(null));
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(
      this.type.prototype,
      t.prototype
    );
  }
  register(t) {
    const e = Object.getPrototypeOf(t);
    let i;
    (function (t) {
      return "id" in t && "defaults" in t;
    })(e) && (i = this.register(e));
    const s = this.items,
      n = t.id,
      o = this.scope + "." + n;
    if (!n) throw new Error("class does not have id: " + t);
    return (
      n in s ||
        ((s[n] = t),
        (function (t, e, i) {
          const s = kt(Object.create(null), [
            i ? ze.get(i) : {},
            ze.get(e),
            t.defaults,
          ]);
          ze.set(e, s),
            t.defaultRoutes &&
              (function (t, e) {
                Object.keys(e).forEach((i) => {
                  const s = i.split("."),
                    n = s.pop(),
                    o = [t].concat(s).join("."),
                    a = e[i].split("."),
                    r = a.pop(),
                    l = a.join(".");
                  ze.route(o, n, l, r);
                });
              })(e, t.defaultRoutes);
          t.descriptors && ze.describe(e, t.descriptors);
        })(t, o, i),
        this.override && ze.override(t.id, t.overrides)),
      o
    );
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const e = this.items,
      i = t.id,
      s = this.scope;
    i in e && delete e[i],
      s && i in ze[s] && (delete ze[s][i], this.override && delete Re[i]);
  }
}
class Hn {
  constructor() {
    (this.controllers = new Fn(Ps, "datasets", !0)),
      (this.elements = new Fn(Sn, "elements")),
      (this.plugins = new Fn(Object, "plugins")),
      (this.scales = new Fn(In, "scales")),
      (this._typedRegistries = [this.controllers, this.scales, this.elements]);
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, e, i) {
    [...e].forEach((e) => {
      const s = i || this._getRegistryForType(e);
      i || s.isForType(e) || (s === this.plugins && e.id)
        ? this._exec(t, s, e)
        : yt(e, (e) => {
            const s = i || this._getRegistryForType(e);
            this._exec(t, s, e);
          });
    });
  }
  _exec(t, e, i) {
    const s = Tt(t);
    xt(i["before" + s], [], i), e[t](i), xt(i["after" + s], [], i);
  }
  _getRegistryForType(t) {
    for (let e = 0; e < this._typedRegistries.length; e++) {
      const i = this._typedRegistries[e];
      if (i.isForType(t)) return i;
    }
    return this.plugins;
  }
  _get(t, e, i) {
    const s = e.get(t);
    if (void 0 === s)
      throw new Error('"' + t + '" is not a registered ' + i + ".");
    return s;
  }
}
var zn = new Hn();
class Bn {
  constructor() {
    this._init = [];
  }
  notify(t, e, i, s) {
    "beforeInit" === e &&
      ((this._init = this._createDescriptors(t, !0)),
      this._notify(this._init, t, "install"));
    const n = s ? this._descriptors(t).filter(s) : this._descriptors(t),
      o = this._notify(n, t, e, i);
    return (
      "afterDestroy" === e &&
        (this._notify(n, t, "stop"), this._notify(this._init, t, "uninstall")),
      o
    );
  }
  _notify(t, e, i, s) {
    s = s || {};
    for (const n of t) {
      const t = n.plugin;
      if (!1 === xt(t[i], [e, s, n.options], t) && s.cancelable) return !1;
    }
    return !0;
  }
  invalidate() {
    dt(this._cache) || ((this._oldCache = this._cache), (this._cache = void 0));
  }
  _descriptors(t) {
    if (this._cache) return this._cache;
    const e = (this._cache = this._createDescriptors(t));
    return this._notifyStateChanges(t), e;
  }
  _createDescriptors(t, e) {
    const i = t && t.config,
      s = mt(i.options && i.options.plugins, {}),
      n = (function (t) {
        const e = {},
          i = [],
          s = Object.keys(zn.plugins.items);
        for (let t = 0; t < s.length; t++) i.push(zn.getPlugin(s[t]));
        const n = t.plugins || [];
        for (let t = 0; t < n.length; t++) {
          const s = n[t];
          -1 === i.indexOf(s) && (i.push(s), (e[s.id] = !0));
        }
        return { plugins: i, localIds: e };
      })(i);
    return !1 !== s || e
      ? (function (t, { plugins: e, localIds: i }, s, n) {
          const o = [],
            a = t.getContext();
          for (const r of e) {
            const e = r.id,
              l = Vn(s[e], n);
            null !== l &&
              o.push({
                plugin: r,
                options: Wn(t.config, { plugin: r, local: i[e] }, l, a),
              });
          }
          return o;
        })(t, n, s, e)
      : [];
  }
  _notifyStateChanges(t) {
    const e = this._oldCache || [],
      i = this._cache,
      s = (t, e) =>
        t.filter((t) => !e.some((e) => t.plugin.id === e.plugin.id));
    this._notify(s(e, i), t, "stop"), this._notify(s(i, e), t, "start");
  }
}
function Vn(t, e) {
  return e || !1 !== t ? (!0 === t ? {} : t) : null;
}
function Wn(t, { plugin: e, local: i }, s, n) {
  const o = t.pluginScopeKeys(e),
    a = t.getOptionScopes(s, o);
  return (
    i && e.defaults && a.push(e.defaults),
    t.createResolver(a, n, [""], { scriptable: !1, indexable: !1, allKeys: !0 })
  );
}
function jn(t, e) {
  const i = ze.datasets[t] || {};
  return (
    ((e.datasets || {})[t] || {}).indexAxis || e.indexAxis || i.indexAxis || "x"
  );
}
function Nn(t, e) {
  if ("x" === t || "y" === t || "r" === t) return t;
  var i;
  if (
    (t =
      e.axis ||
      ("top" === (i = e.position) || "bottom" === i
        ? "x"
        : "left" === i || "right" === i
        ? "y"
        : void 0) ||
      (t.length > 1 && Nn(t[0].toLowerCase(), e)))
  )
    return t;
  throw new Error(
    `Cannot determine type of '${name}' axis. Please provide 'axis' or 'position' option.`
  );
}
function qn(t) {
  const e = t.options || (t.options = {});
  (e.plugins = mt(e.plugins, {})),
    (e.scales = (function (t, e) {
      const i = Re[t.type] || { scales: {} },
        s = e.scales || {},
        n = jn(t.type, e),
        o = Object.create(null);
      return (
        Object.keys(s).forEach((t) => {
          const e = s[t];
          if (!ft(e))
            return console.error(`Invalid scale configuration for scale: ${t}`);
          if (e._proxy)
            return console.warn(
              `Ignoring resolver passed as options for scale: ${t}`
            );
          const a = Nn(t, e),
            r = (function (t, e) {
              return t === e ? "_index_" : "_value_";
            })(a, n),
            l = i.scales || {};
          o[t] = St(Object.create(null), [{ axis: a }, e, l[a], l[r]]);
        }),
        t.data.datasets.forEach((i) => {
          const n = i.type || t.type,
            a = i.indexAxis || jn(n, e),
            r = (Re[n] || {}).scales || {};
          Object.keys(r).forEach((t) => {
            const e = (function (t, e) {
                let i = t;
                return (
                  "_index_" === t
                    ? (i = e)
                    : "_value_" === t && (i = "x" === e ? "y" : "x"),
                  i
                );
              })(t, a),
              n = i[e + "AxisID"] || e;
            (o[n] = o[n] || Object.create(null)),
              St(o[n], [{ axis: e }, s[n], r[t]]);
          });
        }),
        Object.keys(o).forEach((t) => {
          const e = o[t];
          St(e, [ze.scales[e.type], ze.scale]);
        }),
        o
      );
    })(t, e));
}
function Yn(t) {
  return (
    ((t = t || {}).datasets = t.datasets || []), (t.labels = t.labels || []), t
  );
}
const Xn = new Map(),
  Un = new Set();
function Gn(t, e) {
  let i = Xn.get(t);
  return i || ((i = e()), Xn.set(t, i), Un.add(i)), i;
}
const Jn = (t, e, i) => {
  const s = Dt(e, i);
  void 0 !== s && t.add(s);
};
class Kn {
  constructor(t) {
    (this._config = (function (t) {
      return ((t = t || {}).data = Yn(t.data)), qn(t), t;
    })(t)),
      (this._scopeCache = new Map()),
      (this._resolverCache = new Map());
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = Yn(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), qn(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return Gn(t, () => [[`datasets.${t}`, ""]]);
  }
  datasetAnimationScopeKeys(t, e) {
    return Gn(`${t}.transition.${e}`, () => [
      [`datasets.${t}.transitions.${e}`, `transitions.${e}`],
      [`datasets.${t}`, ""],
    ]);
  }
  datasetElementScopeKeys(t, e) {
    return Gn(`${t}-${e}`, () => [
      [`datasets.${t}.elements.${e}`, `datasets.${t}`, `elements.${e}`, ""],
    ]);
  }
  pluginScopeKeys(t) {
    const e = t.id;
    return Gn(`${this.type}-plugin-${e}`, () => [
      [`plugins.${e}`, ...(t.additionalOptionScopes || [])],
    ]);
  }
  _cachedScopes(t, e) {
    const i = this._scopeCache;
    let s = i.get(t);
    return (s && !e) || ((s = new Map()), i.set(t, s)), s;
  }
  getOptionScopes(t, e, i) {
    const { options: s, type: n } = this,
      o = this._cachedScopes(t, i),
      a = o.get(e);
    if (a) return a;
    const r = new Set();
    e.forEach((e) => {
      t && (r.add(t), e.forEach((e) => Jn(r, t, e))),
        e.forEach((t) => Jn(r, s, t)),
        e.forEach((t) => Jn(r, Re[n] || {}, t)),
        e.forEach((t) => Jn(r, ze, t)),
        e.forEach((t) => Jn(r, $e, t));
    });
    const l = Array.from(r);
    return (
      0 === l.length && l.push(Object.create(null)), Un.has(e) && o.set(e, l), l
    );
  }
  chartOptionScopes() {
    const { options: t, type: e } = this;
    return [t, Re[e] || {}, ze.datasets[e] || {}, { type: e }, ze, $e];
  }
  resolveNamedOptions(t, e, i, s = [""]) {
    const n = { $shared: !0 },
      { resolver: o, subPrefixes: a } = Zn(this._resolverCache, t, s);
    let r = o;
    if (
      (function (t, e) {
        const { isScriptable: i, isIndexable: s } = gi(t);
        for (const n of e) {
          const e = i(n),
            o = s(n),
            a = (o || e) && t[n];
          if ((e && (Lt(a) || Qn(a))) || (o && ut(a))) return !0;
        }
        return !1;
      })(o, e)
    ) {
      n.$shared = !1;
      r = pi(o, (i = Lt(i) ? i() : i), this.createResolver(t, i, a));
    }
    for (const t of e) n[t] = r[t];
    return n;
  }
  createResolver(t, e, i = [""], s) {
    const { resolver: n } = Zn(this._resolverCache, t, i);
    return ft(e) ? pi(n, e, void 0, s) : n;
  }
}
function Zn(t, e, i) {
  let s = t.get(e);
  s || ((s = new Map()), t.set(e, s));
  const n = i.join();
  let o = s.get(n);
  if (!o) {
    (o = {
      resolver: fi(e, i),
      subPrefixes: i.filter((t) => !t.toLowerCase().includes("hover")),
    }),
      s.set(n, o);
  }
  return o;
}
const Qn = (t) =>
  ft(t) && Object.getOwnPropertyNames(t).reduce((e, i) => e || Lt(t[i]), !1);
const to = ["top", "bottom", "left", "right", "chartArea"];
function eo(t, e) {
  return "top" === t || "bottom" === t || (-1 === to.indexOf(t) && "x" === e);
}
function io(t, e) {
  return function (i, s) {
    return i[t] === s[t] ? i[e] - s[e] : i[t] - s[t];
  };
}
function so(t) {
  const e = t.chart,
    i = e.options.animation;
  e.notifyPlugins("afterRender"), xt(i && i.onComplete, [t], e);
}
function no(t) {
  const e = t.chart,
    i = e.options.animation;
  xt(i && i.onProgress, [t], e);
}
function oo(t) {
  return (
    Ri() && "string" == typeof t
      ? (t = document.getElementById(t))
      : t && t.length && (t = t[0]),
    t && t.canvas && (t = t.canvas),
    t
  );
}
const ao = {},
  ro = (t) => {
    const e = oo(t);
    return Object.values(ao)
      .filter((t) => t.canvas === e)
      .pop();
  };
function lo(t, e, i) {
  const s = Object.keys(t);
  for (const n of s) {
    const s = +n;
    if (s >= e) {
      const o = t[n];
      delete t[n], (i > 0 || s > e) && (t[s + i] = o);
    }
  }
}
class ho {
  static defaults = ze;
  static instances = ao;
  static overrides = Re;
  static registry = zn;
  static version = "4.2.1";
  static getChart = ro;
  static register(...t) {
    zn.add(...t), co();
  }
  static unregister(...t) {
    zn.remove(...t), co();
  }
  constructor(t, e) {
    const i = (this.config = new Kn(e)),
      s = oo(t),
      n = ro(s);
    if (n)
      throw new Error(
        "Canvas is already in use. Chart with ID '" +
          n.id +
          "' must be destroyed before the canvas with ID '" +
          n.canvas.id +
          "' can be reused."
      );
    const o = i.createResolver(i.chartOptionScopes(), this.getContext());
    (this.platform = new (i.platform ||
      (function (t) {
        return !Ri() ||
          ("undefined" != typeof OffscreenCanvas &&
            t instanceof OffscreenCanvas)
          ? hn
          : kn;
      })(s))()),
      this.platform.updateConfig(i);
    const a = this.platform.acquireContext(s, o.aspectRatio),
      r = a && a.canvas,
      l = r && r.height,
      h = r && r.width;
    (this.id = ct()),
      (this.ctx = a),
      (this.canvas = r),
      (this.width = h),
      (this.height = l),
      (this._options = o),
      (this._aspectRatio = this.aspectRatio),
      (this._layers = []),
      (this._metasets = []),
      (this._stacks = void 0),
      (this.boxes = []),
      (this.currentDevicePixelRatio = void 0),
      (this.chartArea = void 0),
      (this._active = []),
      (this._lastEvent = void 0),
      (this._listeners = {}),
      (this._responsiveListeners = void 0),
      (this._sortedMetasets = []),
      (this.scales = {}),
      (this._plugins = new Bn()),
      (this.$proxies = {}),
      (this._hiddenIndices = {}),
      (this.attached = !1),
      (this._animationsDisabled = void 0),
      (this.$context = void 0),
      (this._doResize = ge((t) => this.update(t), o.resizeDelay || 0)),
      (this._dataChanges = []),
      (ao[this.id] = this),
      a && r
        ? (cs.listen(this, "complete", so),
          cs.listen(this, "progress", no),
          this._initialize(),
          this.attached && this.update())
        : console.error(
            "Failed to create chart: can't acquire context from the given item"
          );
  }
  get aspectRatio() {
    const {
      options: { aspectRatio: t, maintainAspectRatio: e },
      width: i,
      height: s,
      _aspectRatio: n,
    } = this;
    return dt(t) ? (e && n ? n : s ? i / s : null) : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  get registry() {
    return zn;
  }
  _initialize() {
    return (
      this.notifyPlugins("beforeInit"),
      this.options.responsive
        ? this.resize()
        : Ni(this, this.options.devicePixelRatio),
      this.bindEvents(),
      this.notifyPlugins("afterInit"),
      this
    );
  }
  clear() {
    return je(this.canvas, this.ctx), this;
  }
  stop() {
    return cs.stop(this), this;
  }
  resize(t, e) {
    cs.running(this)
      ? (this._resizeBeforeDraw = { width: t, height: e })
      : this._resize(t, e);
  }
  _resize(t, e) {
    const i = this.options,
      s = this.canvas,
      n = i.maintainAspectRatio && this.aspectRatio,
      o = this.platform.getMaximumSize(s, t, e, n),
      a = i.devicePixelRatio || this.platform.getDevicePixelRatio(),
      r = this.width ? "resize" : "attach";
    (this.width = o.width),
      (this.height = o.height),
      (this._aspectRatio = this.aspectRatio),
      Ni(this, a, !0) &&
        (this.notifyPlugins("resize", { size: o }),
        xt(i.onResize, [this, o], this),
        this.attached && this._doResize(r) && this.render());
  }
  ensureScalesHaveIDs() {
    yt(this.options.scales || {}, (t, e) => {
      t.id = e;
    });
  }
  buildOrUpdateScales() {
    const t = this.options,
      e = t.scales,
      i = this.scales,
      s = Object.keys(i).reduce((t, e) => ((t[e] = !1), t), {});
    let n = [];
    e &&
      (n = n.concat(
        Object.keys(e).map((t) => {
          const i = e[t],
            s = Nn(t, i),
            n = "r" === s,
            o = "x" === s;
          return {
            options: i,
            dposition: n ? "chartArea" : o ? "bottom" : "left",
            dtype: n ? "radialLinear" : o ? "category" : "linear",
          };
        })
      )),
      yt(n, (e) => {
        const n = e.options,
          o = n.id,
          a = Nn(o, n),
          r = mt(n.type, e.dtype);
        (void 0 !== n.position && eo(n.position, a) === eo(e.dposition)) ||
          (n.position = e.dposition),
          (s[o] = !0);
        let l = null;
        if (o in i && i[o].type === r) l = i[o];
        else {
          (l = new (zn.getScale(r))({
            id: o,
            type: r,
            ctx: this.ctx,
            chart: this,
          })),
            (i[l.id] = l);
        }
        l.init(n, t);
      }),
      yt(s, (t, e) => {
        t || delete i[e];
      }),
      yt(i, (t) => {
        rn.configure(this, t, t.options), rn.addBox(this, t);
      });
  }
  _updateMetasets() {
    const t = this._metasets,
      e = this.data.datasets.length,
      i = t.length;
    if ((t.sort((t, e) => t.index - e.index), i > e)) {
      for (let t = e; t < i; ++t) this._destroyDatasetMeta(t);
      t.splice(e, i - e);
    }
    this._sortedMetasets = t.slice(0).sort(io("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const {
      _metasets: t,
      data: { datasets: e },
    } = this;
    t.length > e.length && delete this._stacks,
      t.forEach((t, i) => {
        0 === e.filter((e) => e === t._dataset).length &&
          this._destroyDatasetMeta(i);
      });
  }
  buildOrUpdateControllers() {
    const t = [],
      e = this.data.datasets;
    let i, s;
    for (this._removeUnreferencedMetasets(), i = 0, s = e.length; i < s; i++) {
      const s = e[i];
      let n = this.getDatasetMeta(i);
      const o = s.type || this.config.type;
      if (
        (n.type &&
          n.type !== o &&
          (this._destroyDatasetMeta(i), (n = this.getDatasetMeta(i))),
        (n.type = o),
        (n.indexAxis = s.indexAxis || jn(o, this.options)),
        (n.order = s.order || 0),
        (n.index = i),
        (n.label = "" + s.label),
        (n.visible = this.isDatasetVisible(i)),
        n.controller)
      )
        n.controller.updateIndex(i), n.controller.linkScales();
      else {
        const e = zn.getController(o),
          { datasetElementType: s, dataElementType: a } = ze.datasets[o];
        Object.assign(e, {
          dataElementType: zn.getElement(a),
          datasetElementType: s && zn.getElement(s),
        }),
          (n.controller = new e(this, i)),
          t.push(n.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    yt(
      this.data.datasets,
      (t, e) => {
        this.getDatasetMeta(e).controller.reset();
      },
      this
    );
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const e = this.config;
    e.update();
    const i = (this._options = e.createResolver(
        e.chartOptionScopes(),
        this.getContext()
      )),
      s = (this._animationsDisabled = !i.animation);
    if (
      (this._updateScales(),
      this._checkEventBindings(),
      this._updateHiddenIndices(),
      this._plugins.invalidate(),
      !1 === this.notifyPlugins("beforeUpdate", { mode: t, cancelable: !0 }))
    )
      return;
    const n = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let o = 0;
    for (let t = 0, e = this.data.datasets.length; t < e; t++) {
      const { controller: e } = this.getDatasetMeta(t),
        i = !s && -1 === n.indexOf(e);
      e.buildOrUpdateElements(i), (o = Math.max(+e.getMaxOverflow(), o));
    }
    (o = this._minPadding = i.layout.autoPadding ? o : 0),
      this._updateLayout(o),
      s ||
        yt(n, (t) => {
          t.reset();
        }),
      this._updateDatasets(t),
      this.notifyPlugins("afterUpdate", { mode: t }),
      this._layers.sort(io("z", "_idx"));
    const { _active: a, _lastEvent: r } = this;
    r
      ? this._eventHandler(r, !0)
      : a.length && this._updateHoverStyles(a, a, !0),
      this.render();
  }
  _updateScales() {
    yt(this.scales, (t) => {
      rn.removeBox(this, t);
    }),
      this.ensureScalesHaveIDs(),
      this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options,
      e = new Set(Object.keys(this._listeners)),
      i = new Set(t.events);
    (At(e, i) && !!this._responsiveListeners === t.responsive) ||
      (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this,
      e = this._getUniformDataChanges() || [];
    for (const { method: i, start: s, count: n } of e) {
      lo(t, s, "_removeElements" === i ? -n : n);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length) return;
    this._dataChanges = [];
    const e = this.data.datasets.length,
      i = (e) =>
        new Set(
          t
            .filter((t) => t[0] === e)
            .map((t, e) => e + "," + t.splice(1).join(","))
        ),
      s = i(0);
    for (let t = 1; t < e; t++) if (!At(s, i(t))) return;
    return Array.from(s)
      .map((t) => t.split(","))
      .map((t) => ({ method: t[1], start: +t[2], count: +t[3] }));
  }
  _updateLayout(t) {
    if (!1 === this.notifyPlugins("beforeLayout", { cancelable: !0 })) return;
    rn.update(this, this.width, this.height, t);
    const e = this.chartArea,
      i = e.width <= 0 || e.height <= 0;
    (this._layers = []),
      yt(
        this.boxes,
        (t) => {
          (i && "chartArea" === t.position) ||
            (t.configure && t.configure(), this._layers.push(...t._layers()));
        },
        this
      ),
      this._layers.forEach((t, e) => {
        t._idx = e;
      }),
      this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (
      !1 !==
      this.notifyPlugins("beforeDatasetsUpdate", { mode: t, cancelable: !0 })
    ) {
      for (let t = 0, e = this.data.datasets.length; t < e; ++t)
        this.getDatasetMeta(t).controller.configure();
      for (let e = 0, i = this.data.datasets.length; e < i; ++e)
        this._updateDataset(e, Lt(t) ? t({ datasetIndex: e }) : t);
      this.notifyPlugins("afterDatasetsUpdate", { mode: t });
    }
  }
  _updateDataset(t, e) {
    const i = this.getDatasetMeta(t),
      s = { meta: i, index: t, mode: e, cancelable: !0 };
    !1 !== this.notifyPlugins("beforeDatasetUpdate", s) &&
      (i.controller._update(e),
      (s.cancelable = !1),
      this.notifyPlugins("afterDatasetUpdate", s));
  }
  render() {
    !1 !== this.notifyPlugins("beforeRender", { cancelable: !0 }) &&
      (cs.has(this)
        ? this.attached && !cs.running(this) && cs.start(this)
        : (this.draw(), so({ chart: this })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: t, height: e } = this._resizeBeforeDraw;
      this._resize(t, e), (this._resizeBeforeDraw = null);
    }
    if ((this.clear(), this.width <= 0 || this.height <= 0)) return;
    if (!1 === this.notifyPlugins("beforeDraw", { cancelable: !0 })) return;
    const e = this._layers;
    for (t = 0; t < e.length && e[t].z <= 0; ++t) e[t].draw(this.chartArea);
    for (this._drawDatasets(); t < e.length; ++t) e[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const e = this._sortedMetasets,
      i = [];
    let s, n;
    for (s = 0, n = e.length; s < n; ++s) {
      const n = e[s];
      (t && !n.visible) || i.push(n);
    }
    return i;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (!1 === this.notifyPlugins("beforeDatasetsDraw", { cancelable: !0 }))
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let e = t.length - 1; e >= 0; --e) this._drawDataset(t[e]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const e = this.ctx,
      i = t._clip,
      s = !i.disabled,
      n =
        (function (t) {
          const { xScale: e, yScale: i } = t;
          if (e && i)
            return {
              left: e.left,
              right: e.right,
              top: i.top,
              bottom: i.bottom,
            };
        })(t) || this.chartArea,
      o = { meta: t, index: t.index, cancelable: !0 };
    !1 !== this.notifyPlugins("beforeDatasetDraw", o) &&
      (s &&
        Xe(e, {
          left: !1 === i.left ? 0 : n.left - i.left,
          right: !1 === i.right ? this.width : n.right + i.right,
          top: !1 === i.top ? 0 : n.top - i.top,
          bottom: !1 === i.bottom ? this.height : n.bottom + i.bottom,
        }),
      t.controller.draw(),
      s && Ue(e),
      (o.cancelable = !1),
      this.notifyPlugins("afterDatasetDraw", o));
  }
  isPointInArea(t) {
    return Ye(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, e, i, s) {
    const n = Xs.modes[e];
    return "function" == typeof n ? n(this, t, i, s) : [];
  }
  getDatasetMeta(t) {
    const e = this.data.datasets[t],
      i = this._metasets;
    let s = i.filter((t) => t && t._dataset === e).pop();
    return (
      s ||
        ((s = {
          type: null,
          data: [],
          dataset: null,
          controller: null,
          hidden: null,
          xAxisID: null,
          yAxisID: null,
          order: (e && e.order) || 0,
          index: t,
          _dataset: e,
          _parsed: [],
          _sorted: !1,
        }),
        i.push(s)),
      s
    );
  }
  getContext() {
    return (
      this.$context ||
      (this.$context = ui(null, { chart: this, type: "chart" }))
    );
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const e = this.data.datasets[t];
    if (!e) return !1;
    const i = this.getDatasetMeta(t);
    return "boolean" == typeof i.hidden ? !i.hidden : !e.hidden;
  }
  setDatasetVisibility(t, e) {
    this.getDatasetMeta(t).hidden = !e;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, e, i) {
    const s = i ? "show" : "hide",
      n = this.getDatasetMeta(t),
      o = n.controller._resolveAnimations(void 0, s);
    Ot(e)
      ? ((n.data[e].hidden = !i), this.update())
      : (this.setDatasetVisibility(t, i),
        o.update(n, { visible: i }),
        this.update((e) => (e.datasetIndex === t ? s : void 0)));
  }
  hide(t, e) {
    this._updateVisibility(t, e, !1);
  }
  show(t, e) {
    this._updateVisibility(t, e, !0);
  }
  _destroyDatasetMeta(t) {
    const e = this._metasets[t];
    e && e.controller && e.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, e;
    for (
      this.stop(), cs.remove(this), t = 0, e = this.data.datasets.length;
      t < e;
      ++t
    )
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: e } = this;
    this._stop(),
      this.config.clearCache(),
      t &&
        (this.unbindEvents(),
        je(t, e),
        this.platform.releaseContext(e),
        (this.canvas = null),
        (this.ctx = null)),
      delete ao[this.id],
      this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(),
      this.options.responsive
        ? this.bindResponsiveEvents()
        : (this.attached = !0);
  }
  bindUserEvents() {
    const t = this._listeners,
      e = this.platform,
      i = (i, s) => {
        e.addEventListener(this, i, s), (t[i] = s);
      },
      s = (t, e, i) => {
        (t.offsetX = e), (t.offsetY = i), this._eventHandler(t);
      };
    yt(this.options.events, (t) => i(t, s));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners,
      e = this.platform,
      i = (i, s) => {
        e.addEventListener(this, i, s), (t[i] = s);
      },
      s = (i, s) => {
        t[i] && (e.removeEventListener(this, i, s), delete t[i]);
      },
      n = (t, e) => {
        this.canvas && this.resize(t, e);
      };
    let o;
    const a = () => {
      s("attach", a),
        (this.attached = !0),
        this.resize(),
        i("resize", n),
        i("detach", o);
    };
    (o = () => {
      (this.attached = !1),
        s("resize", n),
        this._stop(),
        this._resize(0, 0),
        i("attach", a);
    }),
      e.isAttached(this.canvas) ? a() : o();
  }
  unbindEvents() {
    yt(this._listeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }),
      (this._listeners = {}),
      yt(this._responsiveListeners, (t, e) => {
        this.platform.removeEventListener(this, e, t);
      }),
      (this._responsiveListeners = void 0);
  }
  updateHoverStyle(t, e, i) {
    const s = i ? "set" : "remove";
    let n, o, a, r;
    for (
      "dataset" === e &&
        ((n = this.getDatasetMeta(t[0].datasetIndex)),
        n.controller["_" + s + "DatasetHoverStyle"]()),
        a = 0,
        r = t.length;
      a < r;
      ++a
    ) {
      o = t[a];
      const e = o && this.getDatasetMeta(o.datasetIndex).controller;
      e && e[s + "HoverStyle"](o.element, o.datasetIndex, o.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const e = this._active || [],
      i = t.map(({ datasetIndex: t, index: e }) => {
        const i = this.getDatasetMeta(t);
        if (!i) throw new Error("No dataset found at index " + t);
        return { datasetIndex: t, element: i.data[e], index: e };
      });
    !_t(i, e) &&
      ((this._active = i),
      (this._lastEvent = null),
      this._updateHoverStyles(i, e));
  }
  notifyPlugins(t, e, i) {
    return this._plugins.notify(this, t, e, i);
  }
  isPluginEnabled(t) {
    return 1 === this._plugins._cache.filter((e) => e.plugin.id === t).length;
  }
  _updateHoverStyles(t, e, i) {
    const s = this.options.hover,
      n = (t, e) =>
        t.filter(
          (t) =>
            !e.some(
              (e) => t.datasetIndex === e.datasetIndex && t.index === e.index
            )
        ),
      o = n(e, t),
      a = i ? t : n(t, e);
    o.length && this.updateHoverStyle(o, s.mode, !1),
      a.length && s.mode && this.updateHoverStyle(a, s.mode, !0);
  }
  _eventHandler(t, e) {
    const i = {
        event: t,
        replay: e,
        cancelable: !0,
        inChartArea: this.isPointInArea(t),
      },
      s = (e) =>
        (e.options.events || this.options.events).includes(t.native.type);
    if (!1 === this.notifyPlugins("beforeEvent", i, s)) return;
    const n = this._handleEvent(t, e, i.inChartArea);
    return (
      (i.cancelable = !1),
      this.notifyPlugins("afterEvent", i, s),
      (n || i.changed) && this.render(),
      this
    );
  }
  _handleEvent(t, e, i) {
    const { _active: s = [], options: n } = this,
      o = e,
      a = this._getActiveElements(t, s, i, o),
      r = Et(t),
      l = (function (t, e, i, s) {
        return i && "mouseout" !== t.type ? (s ? e : t) : null;
      })(t, this._lastEvent, i, r);
    i &&
      ((this._lastEvent = null),
      xt(n.onHover, [t, a, this], this),
      r && xt(n.onClick, [t, a, this], this));
    const h = !_t(a, s);
    return (
      (h || e) && ((this._active = a), this._updateHoverStyles(a, s, e)),
      (this._lastEvent = l),
      h
    );
  }
  _getActiveElements(t, e, i, s) {
    if ("mouseout" === t.type) return [];
    if (!i) return e;
    const n = this.options.hover;
    return this.getElementsAtEventForMode(t, n.mode, n, s);
  }
}
function co() {
  return yt(ho.instances, (t) => t._plugins.invalidate());
}
function uo(t, e, i, s) {
  const n = oi(t.options.borderRadius, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd",
  ]);
  const o = (i - e) / 2,
    a = Math.min(o, (s * e) / 2),
    r = (t) => {
      const e = ((i - Math.min(o, t)) * s) / 2;
      return ne(t, 0, Math.min(o, e));
    };
  return {
    outerStart: r(n.outerStart),
    outerEnd: r(n.outerEnd),
    innerStart: ne(n.innerStart, 0, a),
    innerEnd: ne(n.innerEnd, 0, a),
  };
}
function fo(t, e, i, s) {
  return { x: i + t * Math.cos(e), y: s + t * Math.sin(e) };
}
function po(t, e, i, s, n, o) {
  const { x: a, y: r, startAngle: l, pixelMargin: h, innerRadius: c } = e,
    d = Math.max(e.outerRadius + s + i - h, 0),
    u = c > 0 ? c + s + i + h : 0;
  let f = 0;
  const p = n - l;
  if (s) {
    const t = ((c > 0 ? c - s : 0) + (d > 0 ? d - s : 0)) / 2;
    f = (p - (0 !== t ? (p * t) / (t + s) : p)) / 2;
  }
  const g = (p - Math.max(0.001, p * d - i / Rt) / d) / 2,
    m = l + g + f,
    b = n - g - f,
    {
      outerStart: x,
      outerEnd: y,
      innerStart: _,
      innerEnd: v,
    } = uo(e, u, d, b - m),
    w = d - x,
    M = d - y,
    k = m + x / w,
    S = b - y / M,
    P = u + _,
    C = u + v,
    D = m + _ / P,
    T = b - v / C;
  if ((t.beginPath(), o)) {
    const e = (k + S) / 2;
    if ((t.arc(a, r, d, k, e), t.arc(a, r, d, e, S), y > 0)) {
      const e = fo(M, S, a, r);
      t.arc(e.x, e.y, y, S, b + zt);
    }
    const i = fo(C, b, a, r);
    if ((t.lineTo(i.x, i.y), v > 0)) {
      const e = fo(C, T, a, r);
      t.arc(e.x, e.y, v, b + zt, T + Math.PI);
    }
    const s = (b - v / u + (m + _ / u)) / 2;
    if (
      (t.arc(a, r, u, b - v / u, s, !0),
      t.arc(a, r, u, s, m + _ / u, !0),
      _ > 0)
    ) {
      const e = fo(P, D, a, r);
      t.arc(e.x, e.y, _, D + Math.PI, m - zt);
    }
    const n = fo(w, m, a, r);
    if ((t.lineTo(n.x, n.y), x > 0)) {
      const e = fo(w, k, a, r);
      t.arc(e.x, e.y, x, m - zt, k);
    }
  } else {
    t.moveTo(a, r);
    const e = Math.cos(k) * d + a,
      i = Math.sin(k) * d + r;
    t.lineTo(e, i);
    const s = Math.cos(S) * d + a,
      n = Math.sin(S) * d + r;
    t.lineTo(s, n);
  }
  t.closePath();
}
function go(t, e, i, s, n) {
  const { fullCircles: o, startAngle: a, circumference: r, options: l } = e,
    { borderWidth: h, borderJoinStyle: c } = l,
    d = "inner" === l.borderAlign;
  if (!h) return;
  d
    ? ((t.lineWidth = 2 * h), (t.lineJoin = c || "round"))
    : ((t.lineWidth = h), (t.lineJoin = c || "bevel"));
  let u = e.endAngle;
  if (o) {
    po(t, e, i, s, u, n);
    for (let e = 0; e < o; ++e) t.stroke();
    isNaN(r) || (u = a + (r % $t || $t));
  }
  d &&
    (function (t, e, i) {
      const {
        startAngle: s,
        pixelMargin: n,
        x: o,
        y: a,
        outerRadius: r,
        innerRadius: l,
      } = e;
      let h = n / r;
      t.beginPath(),
        t.arc(o, a, r, s - h, i + h),
        l > n
          ? ((h = n / l), t.arc(o, a, l, i + h, s - h, !0))
          : t.arc(o, a, n, i + zt, s - zt),
        t.closePath(),
        t.clip();
    })(t, e, u),
    o || (po(t, e, i, s, u, n), t.stroke());
}
function mo(t, e, i = e) {
  (t.lineCap = mt(i.borderCapStyle, e.borderCapStyle)),
    t.setLineDash(mt(i.borderDash, e.borderDash)),
    (t.lineDashOffset = mt(i.borderDashOffset, e.borderDashOffset)),
    (t.lineJoin = mt(i.borderJoinStyle, e.borderJoinStyle)),
    (t.lineWidth = mt(i.borderWidth, e.borderWidth)),
    (t.strokeStyle = mt(i.borderColor, e.borderColor));
}
function bo(t, e, i) {
  t.lineTo(i.x, i.y);
}
function xo(t, e, i = {}) {
  const s = t.length,
    { start: n = 0, end: o = s - 1 } = i,
    { start: a, end: r } = e,
    l = Math.max(n, a),
    h = Math.min(o, r),
    c = (n < a && o < a) || (n > r && o > r);
  return {
    count: s,
    start: l,
    loop: e.loop,
    ilen: h < l && !c ? s + h - l : h - l,
  };
}
function yo(t, e, i, s) {
  const { points: n, options: o } = e,
    { count: a, start: r, loop: l, ilen: h } = xo(n, i, s),
    c = (function (t) {
      return t.stepped
        ? Ge
        : t.tension || "monotone" === t.cubicInterpolationMode
        ? Je
        : bo;
    })(o);
  let d,
    u,
    f,
    { move: p = !0, reverse: g } = s || {};
  for (d = 0; d <= h; ++d)
    (u = n[(r + (g ? h - d : d)) % a]),
      u.skip ||
        (p ? (t.moveTo(u.x, u.y), (p = !1)) : c(t, f, u, g, o.stepped),
        (f = u));
  return l && ((u = n[(r + (g ? h : 0)) % a]), c(t, f, u, g, o.stepped)), !!l;
}
function _o(t, e, i, s) {
  const n = e.points,
    { count: o, start: a, ilen: r } = xo(n, i, s),
    { move: l = !0, reverse: h } = s || {};
  let c,
    d,
    u,
    f,
    p,
    g,
    m = 0,
    b = 0;
  const x = (t) => (a + (h ? r - t : t)) % o,
    y = () => {
      f !== p && (t.lineTo(m, p), t.lineTo(m, f), t.lineTo(m, g));
    };
  for (l && ((d = n[x(0)]), t.moveTo(d.x, d.y)), c = 0; c <= r; ++c) {
    if (((d = n[x(c)]), d.skip)) continue;
    const e = d.x,
      i = d.y,
      s = 0 | e;
    s === u
      ? (i < f ? (f = i) : i > p && (p = i), (m = (b * m + e) / ++b))
      : (y(), t.lineTo(e, i), (u = s), (b = 0), (f = p = i)),
      (g = i);
  }
  y();
}
function vo(t) {
  const e = t.options,
    i = e.borderDash && e.borderDash.length;
  return !(
    t._decimated ||
    t._loop ||
    e.tension ||
    "monotone" === e.cubicInterpolationMode ||
    e.stepped ||
    i
  )
    ? _o
    : yo;
}
const wo = "function" == typeof Path2D;
function Mo(t, e, i, s) {
  wo && !e.options.segment
    ? (function (t, e, i, s) {
        let n = e._path;
        n || ((n = e._path = new Path2D()), e.path(n, i, s) && n.closePath()),
          mo(t, e.options),
          t.stroke(n);
      })(t, e, i, s)
    : (function (t, e, i, s) {
        const { segments: n, options: o } = e,
          a = vo(e);
        for (const r of n)
          mo(t, o, r.style),
            t.beginPath(),
            a(t, e, r, { start: i, end: i + s - 1 }) && t.closePath(),
            t.stroke();
      })(t, e, i, s);
}
class ko extends Sn {
  static id = "line";
  static defaults = {
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: "miter",
    borderWidth: 3,
    capBezierPoints: !0,
    cubicInterpolationMode: "default",
    fill: !1,
    spanGaps: !1,
    stepped: !1,
    tension: 0,
  };
  static defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor",
  };
  static descriptors = {
    _scriptable: !0,
    _indexable: (t) => "borderDash" !== t && "fill" !== t,
  };
  constructor(t) {
    super(),
      (this.animated = !0),
      (this.options = void 0),
      (this._chart = void 0),
      (this._loop = void 0),
      (this._fullLoop = void 0),
      (this._path = void 0),
      (this._points = void 0),
      (this._segments = void 0),
      (this._decimated = !1),
      (this._pointsUpdated = !1),
      (this._datasetIndex = void 0),
      t && Object.assign(this, t);
  }
  updateControlPoints(t, e) {
    const i = this.options;
    if (
      (i.tension || "monotone" === i.cubicInterpolationMode) &&
      !i.stepped &&
      !this._pointsUpdated
    ) {
      const s = i.spanGaps ? this._loop : this._fullLoop;
      Ei(this._points, i, t, s, e), (this._pointsUpdated = !0);
    }
  }
  set points(t) {
    (this._points = t),
      delete this._segments,
      delete this._path,
      (this._pointsUpdated = !1);
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = os(this, this.options.segment));
  }
  first() {
    const t = this.segments,
      e = this.points;
    return t.length && e[t[0].start];
  }
  last() {
    const t = this.segments,
      e = this.points,
      i = t.length;
    return i && e[t[i - 1].end];
  }
  interpolate(t, e) {
    const i = this.options,
      s = t[e],
      n = this.points,
      o = ns(this, { property: e, start: s, end: s });
    if (!o.length) return;
    const a = [],
      r = (function (t) {
        return t.stepped
          ? Ui
          : t.tension || "monotone" === t.cubicInterpolationMode
          ? Gi
          : Xi;
      })(i);
    let l, h;
    for (l = 0, h = o.length; l < h; ++l) {
      const { start: h, end: c } = o[l],
        d = n[h],
        u = n[c];
      if (d === u) {
        a.push(d);
        continue;
      }
      const f = r(d, u, Math.abs((s - d[e]) / (u[e] - d[e])), i.stepped);
      (f[e] = t[e]), a.push(f);
    }
    return 1 === a.length ? a[0] : a;
  }
  pathSegment(t, e, i) {
    return vo(this)(t, this, e, i);
  }
  path(t, e, i) {
    const s = this.segments,
      n = vo(this);
    let o = this._loop;
    (e = e || 0), (i = i || this.points.length - e);
    for (const a of s) o &= n(t, this, a, { start: e, end: e + i - 1 });
    return !!o;
  }
  draw(t, e, i, s) {
    const n = this.options || {};
    (this.points || []).length &&
      n.borderWidth &&
      (t.save(), Mo(t, this, i, s), t.restore()),
      this.animated && ((this._pointsUpdated = !1), (this._path = void 0));
  }
}
function So(t, e, i, s) {
  const n = t.options,
    { [i]: o } = t.getProps([i], s);
  return Math.abs(e - o) < n.radius + n.hitRadius;
}
function Po(t, e) {
  const {
    x: i,
    y: s,
    base: n,
    width: o,
    height: a,
  } = t.getProps(["x", "y", "base", "width", "height"], e);
  let r, l, h, c, d;
  return (
    t.horizontal
      ? ((d = a / 2),
        (r = Math.min(i, n)),
        (l = Math.max(i, n)),
        (h = s - d),
        (c = s + d))
      : ((d = o / 2),
        (r = i - d),
        (l = i + d),
        (h = Math.min(s, n)),
        (c = Math.max(s, n))),
    { left: r, top: h, right: l, bottom: c }
  );
}
function Co(t, e, i, s) {
  return t ? 0 : ne(e, i, s);
}
function Do(t) {
  const e = Po(t),
    i = e.right - e.left,
    s = e.bottom - e.top,
    n = (function (t, e, i) {
      const s = t.options.borderWidth,
        n = t.borderSkipped,
        o = ai(s);
      return {
        t: Co(n.top, o.top, 0, i),
        r: Co(n.right, o.right, 0, e),
        b: Co(n.bottom, o.bottom, 0, i),
        l: Co(n.left, o.left, 0, e),
      };
    })(t, i / 2, s / 2),
    o = (function (t, e, i) {
      const { enableBorderRadius: s } = t.getProps(["enableBorderRadius"]),
        n = t.options.borderRadius,
        o = ri(n),
        a = Math.min(e, i),
        r = t.borderSkipped,
        l = s || ft(n);
      return {
        topLeft: Co(!l || r.top || r.left, o.topLeft, 0, a),
        topRight: Co(!l || r.top || r.right, o.topRight, 0, a),
        bottomLeft: Co(!l || r.bottom || r.left, o.bottomLeft, 0, a),
        bottomRight: Co(!l || r.bottom || r.right, o.bottomRight, 0, a),
      };
    })(t, i / 2, s / 2);
  return {
    outer: { x: e.left, y: e.top, w: i, h: s, radius: o },
    inner: {
      x: e.left + n.l,
      y: e.top + n.t,
      w: i - n.l - n.r,
      h: s - n.t - n.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(n.t, n.l)),
        topRight: Math.max(0, o.topRight - Math.max(n.t, n.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(n.b, n.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(n.b, n.r)),
      },
    },
  };
}
function To(t, e, i, s) {
  const n = null === e,
    o = null === i,
    a = t && !(n && o) && Po(t, s);
  return a && (n || oe(e, a.left, a.right)) && (o || oe(i, a.top, a.bottom));
}
function Oo(t, e) {
  t.rect(e.x, e.y, e.w, e.h);
}
function Lo(t, e, i = {}) {
  const s = t.x !== i.x ? -e : 0,
    n = t.y !== i.y ? -e : 0,
    o = (t.x + t.w !== i.x + i.w ? e : 0) - s,
    a = (t.y + t.h !== i.y + i.h ? e : 0) - n;
  return { x: t.x + s, y: t.y + n, w: t.w + o, h: t.h + a, radius: t.radius };
}
var Ao = Object.freeze({
  __proto__: null,
  ArcElement: class extends Sn {
    static id = "arc";
    static defaults = {
      borderAlign: "center",
      borderColor: "#fff",
      borderJoinStyle: void 0,
      borderRadius: 0,
      borderWidth: 2,
      offset: 0,
      spacing: 0,
      angle: void 0,
      circular: !0,
    };
    static defaultRoutes = { backgroundColor: "backgroundColor" };
    constructor(t) {
      super(),
        (this.options = void 0),
        (this.circumference = void 0),
        (this.startAngle = void 0),
        (this.endAngle = void 0),
        (this.innerRadius = void 0),
        (this.outerRadius = void 0),
        (this.pixelMargin = 0),
        (this.fullCircles = 0),
        t && Object.assign(this, t);
    }
    inRange(t, e, i) {
      const s = this.getProps(["x", "y"], i),
        { angle: n, distance: o } = Qt(s, { x: t, y: e }),
        {
          startAngle: a,
          endAngle: r,
          innerRadius: l,
          outerRadius: h,
          circumference: c,
        } = this.getProps(
          [
            "startAngle",
            "endAngle",
            "innerRadius",
            "outerRadius",
            "circumference",
          ],
          i
        ),
        d = this.options.spacing / 2,
        u = mt(c, r - a) >= $t || se(n, a, r),
        f = oe(o, l + d, h + d);
      return u && f;
    }
    getCenterPoint(t) {
      const {
          x: e,
          y: i,
          startAngle: s,
          endAngle: n,
          innerRadius: o,
          outerRadius: a,
        } = this.getProps(
          ["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"],
          t
        ),
        { offset: r, spacing: l } = this.options,
        h = (s + n) / 2,
        c = (o + a + l + r) / 2;
      return { x: e + Math.cos(h) * c, y: i + Math.sin(h) * c };
    }
    tooltipPosition(t) {
      return this.getCenterPoint(t);
    }
    draw(t) {
      const { options: e, circumference: i } = this,
        s = (e.offset || 0) / 4,
        n = (e.spacing || 0) / 2,
        o = e.circular;
      if (
        ((this.pixelMargin = "inner" === e.borderAlign ? 0.33 : 0),
        (this.fullCircles = i > $t ? Math.floor(i / $t) : 0),
        0 === i || this.innerRadius < 0 || this.outerRadius < 0)
      )
        return;
      t.save();
      const a = (this.startAngle + this.endAngle) / 2;
      t.translate(Math.cos(a) * s, Math.sin(a) * s);
      const r = s * (1 - Math.sin(Math.min(Rt, i || 0)));
      (t.fillStyle = e.backgroundColor),
        (t.strokeStyle = e.borderColor),
        (function (t, e, i, s, n) {
          const { fullCircles: o, startAngle: a, circumference: r } = e;
          let l = e.endAngle;
          if (o) {
            po(t, e, i, s, l, n);
            for (let e = 0; e < o; ++e) t.fill();
            isNaN(r) || (l = a + (r % $t || $t));
          }
          po(t, e, i, s, l, n), t.fill();
        })(t, this, r, n, o),
        go(t, this, r, n, o),
        t.restore();
    }
  },
  LineElement: ko,
  PointElement: class extends Sn {
    static id = "point";
    static defaults = {
      borderWidth: 1,
      hitRadius: 1,
      hoverBorderWidth: 1,
      hoverRadius: 4,
      pointStyle: "circle",
      radius: 3,
      rotation: 0,
    };
    static defaultRoutes = {
      backgroundColor: "backgroundColor",
      borderColor: "borderColor",
    };
    constructor(t) {
      super(),
        (this.options = void 0),
        (this.parsed = void 0),
        (this.skip = void 0),
        (this.stop = void 0),
        t && Object.assign(this, t);
    }
    inRange(t, e, i) {
      const s = this.options,
        { x: n, y: o } = this.getProps(["x", "y"], i);
      return (
        Math.pow(t - n, 2) + Math.pow(e - o, 2) <
        Math.pow(s.hitRadius + s.radius, 2)
      );
    }
    inXRange(t, e) {
      return So(this, t, "x", e);
    }
    inYRange(t, e) {
      return So(this, t, "y", e);
    }
    getCenterPoint(t) {
      const { x: e, y: i } = this.getProps(["x", "y"], t);
      return { x: e, y: i };
    }
    size(t) {
      let e = (t = t || this.options || {}).radius || 0;
      e = Math.max(e, (e && t.hoverRadius) || 0);
      return 2 * (e + ((e && t.borderWidth) || 0));
    }
    draw(t, e) {
      const i = this.options;
      this.skip ||
        i.radius < 0.1 ||
        !Ye(this, e, this.size(i) / 2) ||
        ((t.strokeStyle = i.borderColor),
        (t.lineWidth = i.borderWidth),
        (t.fillStyle = i.backgroundColor),
        Ne(t, i, this.x, this.y));
    }
    getRange() {
      const t = this.options || {};
      return t.radius + t.hitRadius;
    }
  },
  BarElement: class extends Sn {
    static id = "bar";
    static defaults = {
      borderSkipped: "start",
      borderWidth: 0,
      borderRadius: 0,
      inflateAmount: "auto",
      pointStyle: void 0,
    };
    static defaultRoutes = {
      backgroundColor: "backgroundColor",
      borderColor: "borderColor",
    };
    constructor(t) {
      super(),
        (this.options = void 0),
        (this.horizontal = void 0),
        (this.base = void 0),
        (this.width = void 0),
        (this.height = void 0),
        (this.inflateAmount = void 0),
        t && Object.assign(this, t);
    }
    draw(t) {
      const {
          inflateAmount: e,
          options: { borderColor: i, backgroundColor: s },
        } = this,
        { inner: n, outer: o } = Do(this),
        a =
          (r = o.radius).topLeft || r.topRight || r.bottomLeft || r.bottomRight
            ? ti
            : Oo;
      var r;
      t.save(),
        (o.w === n.w && o.h === n.h) ||
          (t.beginPath(),
          a(t, Lo(o, e, n)),
          t.clip(),
          a(t, Lo(n, -e, o)),
          (t.fillStyle = i),
          t.fill("evenodd")),
        t.beginPath(),
        a(t, Lo(n, e)),
        (t.fillStyle = s),
        t.fill(),
        t.restore();
    }
    inRange(t, e, i) {
      return To(this, t, e, i);
    }
    inXRange(t, e) {
      return To(this, t, null, e);
    }
    inYRange(t, e) {
      return To(this, null, t, e);
    }
    getCenterPoint(t) {
      const {
        x: e,
        y: i,
        base: s,
        horizontal: n,
      } = this.getProps(["x", "y", "base", "horizontal"], t);
      return { x: n ? (e + s) / 2 : e, y: n ? i : (i + s) / 2 };
    }
    getRange(t) {
      return "x" === t ? this.width / 2 : this.height / 2;
    }
  },
});
const Eo = [
    "rgb(54, 162, 235)",
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)",
  ],
  Ro = Eo.map((t) => t.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function $o(t) {
  return Eo[t % Eo.length];
}
function Io(t) {
  return Ro[t % Ro.length];
}
function Fo(t) {
  let e = 0;
  return (i, s) => {
    const n = t.getDatasetMeta(s).controller;
    n instanceof $s
      ? (e = (function (t, e) {
          return (t.backgroundColor = t.data.map(() => $o(e++))), e;
        })(i, e))
      : n instanceof Is
      ? (e = (function (t, e) {
          return (t.backgroundColor = t.data.map(() => Io(e++))), e;
        })(i, e))
      : n &&
        (e = (function (t, e) {
          return (t.borderColor = $o(e)), (t.backgroundColor = Io(e)), ++e;
        })(i, e));
  };
}
function Ho(t) {
  let e;
  for (e in t) if (t[e].borderColor || t[e].backgroundColor) return !0;
  return !1;
}
var zo = {
  id: "colors",
  defaults: { enabled: !0, forceOverride: !1 },
  beforeLayout(t, e, i) {
    if (!i.enabled) return;
    const {
        data: { datasets: s },
        options: n,
      } = t.config,
      { elements: o } = n;
    if (
      !i.forceOverride &&
      (Ho(s) ||
        ((a = n) && (a.borderColor || a.backgroundColor)) ||
        (o && Ho(o)))
    )
      return;
    var a;
    const r = Fo(t);
    s.forEach(r);
  },
};
function Bo(t) {
  if (t._decimated) {
    const e = t._data;
    delete t._decimated,
      delete t._data,
      Object.defineProperty(t, "data", {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        value: e,
      });
  }
}
function Vo(t) {
  t.data.datasets.forEach((t) => {
    Bo(t);
  });
}
var Wo = {
  id: "decimation",
  defaults: { algorithm: "min-max", enabled: !1 },
  beforeElementsUpdate: (t, e, i) => {
    if (!i.enabled) return void Vo(t);
    const s = t.width;
    t.data.datasets.forEach((e, n) => {
      const { _data: o, indexAxis: a } = e,
        r = t.getDatasetMeta(n),
        l = o || e.data;
      if ("y" === ci([a, t.options.indexAxis])) return;
      if (!r.controller.supportsDecimation) return;
      const h = t.scales[r.xAxisID];
      if ("linear" !== h.type && "time" !== h.type) return;
      if (t.options.parsing) return;
      let { start: c, count: d } = (function (t, e) {
        const i = e.length;
        let s,
          n = 0;
        const { iScale: o } = t,
          { min: a, max: r, minDefined: l, maxDefined: h } = o.getUserBounds();
        return (
          l && (n = ne(re(e, o.axis, a).lo, 0, i - 1)),
          (s = h ? ne(re(e, o.axis, r).hi + 1, n, i) - n : i - n),
          { start: n, count: s }
        );
      })(r, l);
      if (d <= (i.threshold || 4 * s)) return void Bo(e);
      let u;
      switch (
        (dt(o) &&
          ((e._data = l),
          delete e.data,
          Object.defineProperty(e, "data", {
            configurable: !0,
            enumerable: !0,
            get: function () {
              return this._decimated;
            },
            set: function (t) {
              this._data = t;
            },
          })),
        i.algorithm)
      ) {
        case "lttb":
          u = (function (t, e, i, s, n) {
            const o = n.samples || s;
            if (o >= i) return t.slice(e, e + i);
            const a = [],
              r = (i - 2) / (o - 2);
            let l = 0;
            const h = e + i - 1;
            let c,
              d,
              u,
              f,
              p,
              g = e;
            for (a[l++] = t[g], c = 0; c < o - 2; c++) {
              let s,
                n = 0,
                o = 0;
              const h = Math.floor((c + 1) * r) + 1 + e,
                m = Math.min(Math.floor((c + 2) * r) + 1, i) + e,
                b = m - h;
              for (s = h; s < m; s++) (n += t[s].x), (o += t[s].y);
              (n /= b), (o /= b);
              const x = Math.floor(c * r) + 1 + e,
                y = Math.min(Math.floor((c + 1) * r) + 1, i) + e,
                { x: _, y: v } = t[g];
              for (u = f = -1, s = x; s < y; s++)
                (f =
                  0.5 *
                  Math.abs((_ - n) * (t[s].y - v) - (_ - t[s].x) * (o - v))),
                  f > u && ((u = f), (d = t[s]), (p = s));
              (a[l++] = d), (g = p);
            }
            return (a[l++] = t[h]), a;
          })(l, c, d, s, i);
          break;
        case "min-max":
          u = (function (t, e, i, s) {
            let n,
              o,
              a,
              r,
              l,
              h,
              c,
              d,
              u,
              f,
              p = 0,
              g = 0;
            const m = [],
              b = e + i - 1,
              x = t[e].x,
              y = t[b].x - x;
            for (n = e; n < e + i; ++n) {
              (o = t[n]), (a = ((o.x - x) / y) * s), (r = o.y);
              const e = 0 | a;
              if (e === l)
                r < u ? ((u = r), (h = n)) : r > f && ((f = r), (c = n)),
                  (p = (g * p + o.x) / ++g);
              else {
                const i = n - 1;
                if (!dt(h) && !dt(c)) {
                  const e = Math.min(h, c),
                    s = Math.max(h, c);
                  e !== d && e !== i && m.push({ ...t[e], x: p }),
                    s !== d && s !== i && m.push({ ...t[s], x: p });
                }
                n > 0 && i !== d && m.push(t[i]),
                  m.push(o),
                  (l = e),
                  (g = 0),
                  (u = f = r),
                  (h = c = d = n);
              }
            }
            return m;
          })(l, c, d, s);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${i.algorithm}'`);
      }
      e._decimated = u;
    });
  },
  destroy(t) {
    Vo(t);
  },
};
function jo(t, e, i, s) {
  if (s) return;
  let n = e[t],
    o = i[t];
  return (
    "angle" === t && ((n = ie(n)), (o = ie(o))),
    { property: t, start: n, end: o }
  );
}
function No(t, e, i) {
  for (; e > t; e--) {
    const t = i[e];
    if (!isNaN(t.x) && !isNaN(t.y)) break;
  }
  return e;
}
function qo(t, e, i, s) {
  return t && e ? s(t[i], e[i]) : t ? t[i] : e ? e[i] : 0;
}
function Yo(t, e) {
  let i = [],
    s = !1;
  return (
    ut(t)
      ? ((s = !0), (i = t))
      : (i = (function (t, e) {
          const { x: i = null, y: s = null } = t || {},
            n = e.points,
            o = [];
          return (
            e.segments.forEach(({ start: t, end: e }) => {
              e = No(t, e, n);
              const a = n[t],
                r = n[e];
              null !== s
                ? (o.push({ x: a.x, y: s }), o.push({ x: r.x, y: s }))
                : null !== i &&
                  (o.push({ x: i, y: a.y }), o.push({ x: i, y: r.y }));
            }),
            o
          );
        })(t, e)),
    i.length
      ? new ko({ points: i, options: { tension: 0 }, _loop: s, _fullLoop: s })
      : null
  );
}
function Xo(t) {
  return t && !1 !== t.fill;
}
function Uo(t, e, i) {
  let s = t[e].fill;
  const n = [e];
  let o;
  if (!i) return s;
  for (; !1 !== s && -1 === n.indexOf(s); ) {
    if (!pt(s)) return s;
    if (((o = t[s]), !o)) return !1;
    if (o.visible) return s;
    n.push(s), (s = o.fill);
  }
  return !1;
}
function Go(t, e, i) {
  const s = (function (t) {
    const e = t.options,
      i = e.fill;
    let s = mt(i && i.target, i);
    void 0 === s && (s = !!e.backgroundColor);
    return !1 !== s && null !== s && (!0 === s ? "origin" : s);
  })(t);
  if (ft(s)) return !isNaN(s.value) && s;
  let n = parseFloat(s);
  return pt(n) && Math.floor(n) === n
    ? (function (t, e, i, s) {
        ("-" !== t && "+" !== t) || (i = e + i);
        return !(i === e || i < 0 || i >= s) && i;
      })(s[0], e, n, i)
    : ["origin", "start", "end", "stack", "shape"].indexOf(s) >= 0 && s;
}
function Jo(t, e, i) {
  const s = [];
  for (let n = 0; n < i.length; n++) {
    const o = i[n],
      { first: a, last: r, point: l } = Ko(o, e, "x");
    if (!(!l || (a && r)))
      if (a) s.unshift(l);
      else if ((t.push(l), !r)) break;
  }
  t.push(...s);
}
function Ko(t, e, i) {
  const s = t.interpolate(e, i);
  if (!s) return {};
  const n = s[i],
    o = t.segments,
    a = t.points;
  let r = !1,
    l = !1;
  for (let t = 0; t < o.length; t++) {
    const e = o[t],
      s = a[e.start][i],
      h = a[e.end][i];
    if (oe(n, s, h)) {
      (r = n === s), (l = n === h);
      break;
    }
  }
  return { first: r, last: l, point: s };
}
class Zo {
  constructor(t) {
    (this.x = t.x), (this.y = t.y), (this.radius = t.radius);
  }
  pathSegment(t, e, i) {
    const { x: s, y: n, radius: o } = this;
    return (
      (e = e || { start: 0, end: $t }),
      t.arc(s, n, o, e.end, e.start, !0),
      !i.bounds
    );
  }
  interpolate(t) {
    const { x: e, y: i, radius: s } = this,
      n = t.angle;
    return { x: e + Math.cos(n) * s, y: i + Math.sin(n) * s, angle: n };
  }
}
function Qo(t) {
  const { chart: e, fill: i, line: s } = t;
  if (pt(i))
    return (function (t, e) {
      const i = t.getDatasetMeta(e),
        s = i && t.isDatasetVisible(e);
      return s ? i.dataset : null;
    })(e, i);
  if ("stack" === i)
    return (function (t) {
      const { scale: e, index: i, line: s } = t,
        n = [],
        o = s.segments,
        a = s.points,
        r = (function (t, e) {
          const i = [],
            s = t.getMatchingVisibleMetas("line");
          for (let t = 0; t < s.length; t++) {
            const n = s[t];
            if (n.index === e) break;
            n.hidden || i.unshift(n.dataset);
          }
          return i;
        })(e, i);
      r.push(Yo({ x: null, y: e.bottom }, s));
      for (let t = 0; t < o.length; t++) {
        const e = o[t];
        for (let t = e.start; t <= e.end; t++) Jo(n, a[t], r);
      }
      return new ko({ points: n, options: {} });
    })(t);
  if ("shape" === i) return !0;
  const n = (function (t) {
    const e = t.scale || {};
    return e.getPointPositionForValue
      ? (function (t) {
          const { scale: e, fill: i } = t,
            s = e.options,
            n = e.getLabels().length,
            o = s.reverse ? e.max : e.min,
            a = (function (t, e, i) {
              let s;
              return (
                (s =
                  "start" === t
                    ? i
                    : "end" === t
                    ? e.options.reverse
                      ? e.min
                      : e.max
                    : ft(t)
                    ? t.value
                    : e.getBaseValue()),
                s
              );
            })(i, e, o),
            r = [];
          if (s.grid.circular) {
            const t = e.getPointPositionForValue(0, o);
            return new Zo({
              x: t.x,
              y: t.y,
              radius: e.getDistanceFromCenterForValue(a),
            });
          }
          for (let t = 0; t < n; ++t) r.push(e.getPointPositionForValue(t, a));
          return r;
        })(t)
      : (function (t) {
          const { scale: e = {}, fill: i } = t,
            s = (function (t, e) {
              let i = null;
              return (
                "start" === t
                  ? (i = e.bottom)
                  : "end" === t
                  ? (i = e.top)
                  : ft(t)
                  ? (i = e.getPixelForValue(t.value))
                  : e.getBasePixel && (i = e.getBasePixel()),
                i
              );
            })(i, e);
          if (pt(s)) {
            const t = e.isHorizontal();
            return { x: t ? s : null, y: t ? null : s };
          }
          return null;
        })(t);
  })(t);
  return n instanceof Zo ? n : Yo(n, s);
}
function ta(t, e, i) {
  const s = Qo(e),
    { line: n, scale: o, axis: a } = e,
    r = n.options,
    l = r.fill,
    h = r.backgroundColor,
    { above: c = h, below: d = h } = l || {};
  s &&
    n.points.length &&
    (Xe(t, i),
    (function (t, e) {
      const { line: i, target: s, above: n, below: o, area: a, scale: r } = e,
        l = i._loop ? "angle" : e.axis;
      t.save(),
        "x" === l &&
          o !== n &&
          (ea(t, s, a.top),
          ia(t, { line: i, target: s, color: n, scale: r, property: l }),
          t.restore(),
          t.save(),
          ea(t, s, a.bottom));
      ia(t, { line: i, target: s, color: o, scale: r, property: l }),
        t.restore();
    })(t, {
      line: n,
      target: s,
      above: c,
      below: d,
      area: i,
      scale: o,
      axis: a,
    }),
    Ue(t));
}
function ea(t, e, i) {
  const { segments: s, points: n } = e;
  let o = !0,
    a = !1;
  t.beginPath();
  for (const r of s) {
    const { start: s, end: l } = r,
      h = n[s],
      c = n[No(s, l, n)];
    o ? (t.moveTo(h.x, h.y), (o = !1)) : (t.lineTo(h.x, i), t.lineTo(h.x, h.y)),
      (a = !!e.pathSegment(t, r, { move: a })),
      a ? t.closePath() : t.lineTo(c.x, i);
  }
  t.lineTo(e.first().x, i), t.closePath(), t.clip();
}
function ia(t, e) {
  const { line: i, target: s, property: n, color: o, scale: a } = e,
    r = (function (t, e, i) {
      const s = t.segments,
        n = t.points,
        o = e.points,
        a = [];
      for (const t of s) {
        let { start: s, end: r } = t;
        r = No(s, r, n);
        const l = jo(i, n[s], n[r], t.loop);
        if (!e.segments) {
          a.push({ source: t, target: l, start: n[s], end: n[r] });
          continue;
        }
        const h = ns(e, l);
        for (const e of h) {
          const s = jo(i, o[e.start], o[e.end], e.loop),
            r = ss(t, n, s);
          for (const t of r)
            a.push({
              source: t,
              target: e,
              start: { [i]: qo(l, s, "start", Math.max) },
              end: { [i]: qo(l, s, "end", Math.min) },
            });
        }
      }
      return a;
    })(i, s, n);
  for (const { source: e, target: l, start: h, end: c } of r) {
    const { style: { backgroundColor: r = o } = {} } = e,
      d = !0 !== s;
    t.save(), (t.fillStyle = r), sa(t, a, d && jo(n, h, c)), t.beginPath();
    const u = !!i.pathSegment(t, e);
    let f;
    if (d) {
      u ? t.closePath() : na(t, s, c, n);
      const e = !!s.pathSegment(t, l, { move: u, reverse: !0 });
      (f = u && e), f || na(t, s, h, n);
    }
    t.closePath(), t.fill(f ? "evenodd" : "nonzero"), t.restore();
  }
}
function sa(t, e, i) {
  const { top: s, bottom: n } = e.chart.chartArea,
    { property: o, start: a, end: r } = i || {};
  "x" === o && (t.beginPath(), t.rect(a, s, r - a, n - s), t.clip());
}
function na(t, e, i, s) {
  const n = e.interpolate(i, s);
  n && t.lineTo(n.x, n.y);
}
var oa = {
  id: "filler",
  afterDatasetsUpdate(t, e, i) {
    const s = (t.data.datasets || []).length,
      n = [];
    let o, a, r, l;
    for (a = 0; a < s; ++a)
      (o = t.getDatasetMeta(a)),
        (r = o.dataset),
        (l = null),
        r &&
          r.options &&
          r instanceof ko &&
          (l = {
            visible: t.isDatasetVisible(a),
            index: a,
            fill: Go(r, a, s),
            chart: t,
            axis: o.controller.options.indexAxis,
            scale: o.vScale,
            line: r,
          }),
        (o.$filler = l),
        n.push(l);
    for (a = 0; a < s; ++a)
      (l = n[a]), l && !1 !== l.fill && (l.fill = Uo(n, a, i.propagate));
  },
  beforeDraw(t, e, i) {
    const s = "beforeDraw" === i.drawTime,
      n = t.getSortedVisibleDatasetMetas(),
      o = t.chartArea;
    for (let e = n.length - 1; e >= 0; --e) {
      const i = n[e].$filler;
      i &&
        (i.line.updateControlPoints(o, i.axis), s && i.fill && ta(t.ctx, i, o));
    }
  },
  beforeDatasetsDraw(t, e, i) {
    if ("beforeDatasetsDraw" !== i.drawTime) return;
    const s = t.getSortedVisibleDatasetMetas();
    for (let e = s.length - 1; e >= 0; --e) {
      const i = s[e].$filler;
      Xo(i) && ta(t.ctx, i, t.chartArea);
    }
  },
  beforeDatasetDraw(t, e, i) {
    const s = e.meta.$filler;
    Xo(s) && "beforeDatasetDraw" === i.drawTime && ta(t.ctx, s, t.chartArea);
  },
  defaults: { propagate: !0, drawTime: "beforeDatasetDraw" },
};
const aa = (t, e) => {
  let { boxHeight: i = e, boxWidth: s = e } = t;
  return (
    t.usePointStyle &&
      ((i = Math.min(i, e)), (s = t.pointStyleWidth || Math.min(s, e))),
    { boxWidth: s, boxHeight: i, itemHeight: Math.max(e, i) }
  );
};
class ra extends Sn {
  constructor(t) {
    super(),
      (this._added = !1),
      (this.legendHitBoxes = []),
      (this._hoveredItem = null),
      (this.doughnutMode = !1),
      (this.chart = t.chart),
      (this.options = t.options),
      (this.ctx = t.ctx),
      (this.legendItems = void 0),
      (this.columnSizes = void 0),
      (this.lineWidths = void 0),
      (this.maxHeight = void 0),
      (this.maxWidth = void 0),
      (this.top = void 0),
      (this.bottom = void 0),
      (this.left = void 0),
      (this.right = void 0),
      (this.height = void 0),
      (this.width = void 0),
      (this._margins = void 0),
      (this.position = void 0),
      (this.weight = void 0),
      (this.fullSize = void 0);
  }
  update(t, e, i) {
    (this.maxWidth = t),
      (this.maxHeight = e),
      (this._margins = i),
      this.setDimensions(),
      this.buildLabels(),
      this.fit();
  }
  setDimensions() {
    this.isHorizontal()
      ? ((this.width = this.maxWidth),
        (this.left = this._margins.left),
        (this.right = this.width))
      : ((this.height = this.maxHeight),
        (this.top = this._margins.top),
        (this.bottom = this.height));
  }
  buildLabels() {
    const t = this.options.labels || {};
    let e = xt(t.generateLabels, [this.chart], this) || [];
    t.filter && (e = e.filter((e) => t.filter(e, this.chart.data))),
      t.sort && (e = e.sort((e, i) => t.sort(e, i, this.chart.data))),
      this.options.reverse && e.reverse(),
      (this.legendItems = e);
  }
  fit() {
    const { options: t, ctx: e } = this;
    if (!t.display) return void (this.width = this.height = 0);
    const i = t.labels,
      s = hi(i.font),
      n = s.size,
      o = this._computeTitleHeight(),
      { boxWidth: a, itemHeight: r } = aa(i, n);
    let l, h;
    (e.font = s.string),
      this.isHorizontal()
        ? ((l = this.maxWidth), (h = this._fitRows(o, n, a, r) + 10))
        : ((h = this.maxHeight), (l = this._fitCols(o, s, a, r) + 10)),
      (this.width = Math.min(l, t.maxWidth || this.maxWidth)),
      (this.height = Math.min(h, t.maxHeight || this.maxHeight));
  }
  _fitRows(t, e, i, s) {
    const {
        ctx: n,
        maxWidth: o,
        options: {
          labels: { padding: a },
        },
      } = this,
      r = (this.legendHitBoxes = []),
      l = (this.lineWidths = [0]),
      h = s + a;
    let c = t;
    (n.textAlign = "left"), (n.textBaseline = "middle");
    let d = -1,
      u = -h;
    return (
      this.legendItems.forEach((t, f) => {
        const p = i + e / 2 + n.measureText(t.text).width;
        (0 === f || l[l.length - 1] + p + 2 * a > o) &&
          ((c += h), (l[l.length - (f > 0 ? 0 : 1)] = 0), (u += h), d++),
          (r[f] = { left: 0, top: u, row: d, width: p, height: s }),
          (l[l.length - 1] += p + a);
      }),
      c
    );
  }
  _fitCols(t, e, i, s) {
    const {
        ctx: n,
        maxHeight: o,
        options: {
          labels: { padding: a },
        },
      } = this,
      r = (this.legendHitBoxes = []),
      l = (this.columnSizes = []),
      h = o - t;
    let c = a,
      d = 0,
      u = 0,
      f = 0,
      p = 0;
    return (
      this.legendItems.forEach((t, o) => {
        const { itemWidth: g, itemHeight: m } = (function (t, e, i, s, n) {
          const o = (function (t, e, i, s) {
              let n = t.text;
              n &&
                "string" != typeof n &&
                (n = n.reduce((t, e) => (t.length > e.length ? t : e)));
              return e + i.size / 2 + s.measureText(n).width;
            })(s, t, e, i),
            a = (function (t, e, i) {
              let s = t;
              "string" != typeof e.text && (s = la(e, i));
              return s;
            })(n, s, e.lineHeight);
          return { itemWidth: o, itemHeight: a };
        })(i, e, n, t, s);
        o > 0 &&
          u + m + 2 * a > h &&
          ((c += d + a),
          l.push({ width: d, height: u }),
          (f += d + a),
          p++,
          (d = u = 0)),
          (r[o] = { left: f, top: u, col: p, width: g, height: m }),
          (d = Math.max(d, g)),
          (u += m + a);
      }),
      (c += d),
      l.push({ width: d, height: u }),
      c
    );
  }
  adjustHitBoxes() {
    if (!this.options.display) return;
    const t = this._computeTitleHeight(),
      {
        legendHitBoxes: e,
        options: {
          align: i,
          labels: { padding: s },
          rtl: n,
        },
      } = this,
      o = Zi(n, this.left, this.width);
    if (this.isHorizontal()) {
      let n = 0,
        a = be(i, this.left + s, this.right - this.lineWidths[n]);
      for (const r of e)
        n !== r.row &&
          ((n = r.row),
          (a = be(i, this.left + s, this.right - this.lineWidths[n]))),
          (r.top += this.top + t + s),
          (r.left = o.leftForLtr(o.x(a), r.width)),
          (a += r.width + s);
    } else {
      let n = 0,
        a = be(i, this.top + t + s, this.bottom - this.columnSizes[n].height);
      for (const r of e)
        r.col !== n &&
          ((n = r.col),
          (a = be(
            i,
            this.top + t + s,
            this.bottom - this.columnSizes[n].height
          ))),
          (r.top = a),
          (r.left += this.left + s),
          (r.left = o.leftForLtr(o.x(r.left), r.width)),
          (a += r.height + s);
    }
  }
  isHorizontal() {
    return (
      "top" === this.options.position || "bottom" === this.options.position
    );
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Xe(t, this), this._draw(), Ue(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: e, lineWidths: i, ctx: s } = this,
      { align: n, labels: o } = t,
      a = ze.color,
      r = Zi(t.rtl, this.left, this.width),
      l = hi(o.font),
      { padding: h } = o,
      c = l.size,
      d = c / 2;
    let u;
    this.drawTitle(),
      (s.textAlign = r.textAlign("left")),
      (s.textBaseline = "middle"),
      (s.lineWidth = 0.5),
      (s.font = l.string);
    const { boxWidth: f, boxHeight: p, itemHeight: g } = aa(o, c),
      m = this.isHorizontal(),
      b = this._computeTitleHeight();
    (u = m
      ? {
          x: be(n, this.left + h, this.right - i[0]),
          y: this.top + h + b,
          line: 0,
        }
      : {
          x: this.left + h,
          y: be(n, this.top + b + h, this.bottom - e[0].height),
          line: 0,
        }),
      Qi(this.ctx, t.textDirection);
    const x = g + h;
    this.legendItems.forEach((y, _) => {
      (s.strokeStyle = y.fontColor), (s.fillStyle = y.fontColor);
      const v = s.measureText(y.text).width,
        w = r.textAlign(y.textAlign || (y.textAlign = o.textAlign)),
        M = f + d + v;
      let k = u.x,
        S = u.y;
      r.setWidth(this.width),
        m
          ? _ > 0 &&
            k + M + h > this.right &&
            ((S = u.y += x),
            u.line++,
            (k = u.x = be(n, this.left + h, this.right - i[u.line])))
          : _ > 0 &&
            S + x > this.bottom &&
            ((k = u.x = k + e[u.line].width + h),
            u.line++,
            (S = u.y =
              be(n, this.top + b + h, this.bottom - e[u.line].height)));
      if (
        ((function (t, e, i) {
          if (isNaN(f) || f <= 0 || isNaN(p) || p < 0) return;
          s.save();
          const n = mt(i.lineWidth, 1);
          if (
            ((s.fillStyle = mt(i.fillStyle, a)),
            (s.lineCap = mt(i.lineCap, "butt")),
            (s.lineDashOffset = mt(i.lineDashOffset, 0)),
            (s.lineJoin = mt(i.lineJoin, "miter")),
            (s.lineWidth = n),
            (s.strokeStyle = mt(i.strokeStyle, a)),
            s.setLineDash(mt(i.lineDash, [])),
            o.usePointStyle)
          ) {
            const a = {
                radius: (p * Math.SQRT2) / 2,
                pointStyle: i.pointStyle,
                rotation: i.rotation,
                borderWidth: n,
              },
              l = r.xPlus(t, f / 2);
            qe(s, a, l, e + d, o.pointStyleWidth && f);
          } else {
            const o = e + Math.max((c - p) / 2, 0),
              a = r.leftForLtr(t, f),
              l = ri(i.borderRadius);
            s.beginPath(),
              Object.values(l).some((t) => 0 !== t)
                ? ti(s, { x: a, y: o, w: f, h: p, radius: l })
                : s.rect(a, o, f, p),
              s.fill(),
              0 !== n && s.stroke();
          }
          s.restore();
        })(r.x(k), S, y),
        (k = xe(w, k + f + d, m ? k + M : this.right, t.rtl)),
        (function (t, e, i) {
          Ke(s, i.text, t, e + g / 2, l, {
            strikethrough: i.hidden,
            textAlign: r.textAlign(i.textAlign),
          });
        })(r.x(k), S, y),
        m)
      )
        u.x += M + h;
      else if ("string" != typeof y.text) {
        const t = l.lineHeight;
        u.y += la(y, t);
      } else u.y += x;
    }),
      ts(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options,
      e = t.title,
      i = hi(e.font),
      s = li(e.padding);
    if (!e.display) return;
    const n = Zi(t.rtl, this.left, this.width),
      o = this.ctx,
      a = e.position,
      r = i.size / 2,
      l = s.top + r;
    let h,
      c = this.left,
      d = this.width;
    if (this.isHorizontal())
      (d = Math.max(...this.lineWidths)),
        (h = this.top + l),
        (c = be(t.align, c, this.right - d));
    else {
      const e = this.columnSizes.reduce((t, e) => Math.max(t, e.height), 0);
      h =
        l +
        be(
          t.align,
          this.top,
          this.bottom - e - t.labels.padding - this._computeTitleHeight()
        );
    }
    const u = be(a, c, c + d);
    (o.textAlign = n.textAlign(me(a))),
      (o.textBaseline = "middle"),
      (o.strokeStyle = e.color),
      (o.fillStyle = e.color),
      (o.font = i.string),
      Ke(o, e.text, u, h, i);
  }
  _computeTitleHeight() {
    const t = this.options.title,
      e = hi(t.font),
      i = li(t.padding);
    return t.display ? e.lineHeight + i.height : 0;
  }
  _getLegendItemAt(t, e) {
    let i, s, n;
    if (oe(t, this.left, this.right) && oe(e, this.top, this.bottom))
      for (n = this.legendHitBoxes, i = 0; i < n.length; ++i)
        if (
          ((s = n[i]),
          oe(t, s.left, s.left + s.width) && oe(e, s.top, s.top + s.height))
        )
          return this.legendItems[i];
    return null;
  }
  handleEvent(t) {
    const e = this.options;
    if (
      !(function (t, e) {
        return (
          !(
            ("mousemove" !== t && "mouseout" !== t) ||
            (!e.onHover && !e.onLeave)
          ) || !(!e.onClick || ("click" !== t && "mouseup" !== t))
        );
      })(t.type, e)
    )
      return;
    const i = this._getLegendItemAt(t.x, t.y);
    if ("mousemove" === t.type || "mouseout" === t.type) {
      const o = this._hoveredItem,
        a =
          ((n = i),
          null !== (s = o) &&
            null !== n &&
            s.datasetIndex === n.datasetIndex &&
            s.index === n.index);
      o && !a && xt(e.onLeave, [t, o, this], this),
        (this._hoveredItem = i),
        i && !a && xt(e.onHover, [t, i, this], this);
    } else i && xt(e.onClick, [t, i, this], this);
    var s, n;
  }
}
function la(t, e) {
  return e * (t.text ? t.text.length + 0.5 : 0);
}
var ha = {
  id: "legend",
  _element: ra,
  start(t, e, i) {
    const s = (t.legend = new ra({ ctx: t.ctx, options: i, chart: t }));
    rn.configure(t, s, i), rn.addBox(t, s);
  },
  stop(t) {
    rn.removeBox(t, t.legend), delete t.legend;
  },
  beforeUpdate(t, e, i) {
    const s = t.legend;
    rn.configure(t, s, i), (s.options = i);
  },
  afterUpdate(t) {
    const e = t.legend;
    e.buildLabels(), e.adjustHitBoxes();
  },
  afterEvent(t, e) {
    e.replay || t.legend.handleEvent(e.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(t, e, i) {
      const s = e.datasetIndex,
        n = i.chart;
      n.isDatasetVisible(s)
        ? (n.hide(s), (e.hidden = !0))
        : (n.show(s), (e.hidden = !1));
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (t) => t.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(t) {
        const e = t.data.datasets,
          {
            labels: {
              usePointStyle: i,
              pointStyle: s,
              textAlign: n,
              color: o,
              useBorderRadius: a,
              borderRadius: r,
            },
          } = t.legend.options;
        return t._getSortedDatasetMetas().map((t) => {
          const l = t.controller.getStyle(i ? 0 : void 0),
            h = li(l.borderWidth);
          return {
            text: e[t.index].label,
            fillStyle: l.backgroundColor,
            fontColor: o,
            hidden: !t.visible,
            lineCap: l.borderCapStyle,
            lineDash: l.borderDash,
            lineDashOffset: l.borderDashOffset,
            lineJoin: l.borderJoinStyle,
            lineWidth: (h.width + h.height) / 4,
            strokeStyle: l.borderColor,
            pointStyle: s || l.pointStyle,
            rotation: l.rotation,
            textAlign: n || l.textAlign,
            borderRadius: a && (r || l.borderRadius),
            datasetIndex: t.index,
          };
        }, this);
      },
    },
    title: {
      color: (t) => t.chart.options.color,
      display: !1,
      position: "center",
      text: "",
    },
  },
  descriptors: {
    _scriptable: (t) => !t.startsWith("on"),
    labels: {
      _scriptable: (t) => !["generateLabels", "filter", "sort"].includes(t),
    },
  },
};
class ca extends Sn {
  constructor(t) {
    super(),
      (this.chart = t.chart),
      (this.options = t.options),
      (this.ctx = t.ctx),
      (this._padding = void 0),
      (this.top = void 0),
      (this.bottom = void 0),
      (this.left = void 0),
      (this.right = void 0),
      (this.width = void 0),
      (this.height = void 0),
      (this.position = void 0),
      (this.weight = void 0),
      (this.fullSize = void 0);
  }
  update(t, e) {
    const i = this.options;
    if (((this.left = 0), (this.top = 0), !i.display))
      return void (this.width = this.height = this.right = this.bottom = 0);
    (this.width = this.right = t), (this.height = this.bottom = e);
    const s = ut(i.text) ? i.text.length : 1;
    this._padding = li(i.padding);
    const n = s * hi(i.font).lineHeight + this._padding.height;
    this.isHorizontal() ? (this.height = n) : (this.width = n);
  }
  isHorizontal() {
    const t = this.options.position;
    return "top" === t || "bottom" === t;
  }
  _drawArgs(t) {
    const { top: e, left: i, bottom: s, right: n, options: o } = this,
      a = o.align;
    let r,
      l,
      h,
      c = 0;
    return (
      this.isHorizontal()
        ? ((l = be(a, i, n)), (h = e + t), (r = n - i))
        : ("left" === o.position
            ? ((l = i + t), (h = be(a, s, e)), (c = -0.5 * Rt))
            : ((l = n - t), (h = be(a, e, s)), (c = 0.5 * Rt)),
          (r = s - e)),
      { titleX: l, titleY: h, maxWidth: r, rotation: c }
    );
  }
  draw() {
    const t = this.ctx,
      e = this.options;
    if (!e.display) return;
    const i = hi(e.font),
      s = i.lineHeight / 2 + this._padding.top,
      { titleX: n, titleY: o, maxWidth: a, rotation: r } = this._drawArgs(s);
    Ke(t, e.text, 0, 0, i, {
      color: e.color,
      maxWidth: a,
      rotation: r,
      textAlign: me(e.align),
      textBaseline: "middle",
      translation: [n, o],
    });
  }
}
var da = {
  id: "title",
  _element: ca,
  start(t, e, i) {
    !(function (t, e) {
      const i = new ca({ ctx: t.ctx, options: e, chart: t });
      rn.configure(t, i, e), rn.addBox(t, i), (t.titleBlock = i);
    })(t, i);
  },
  stop(t) {
    const e = t.titleBlock;
    rn.removeBox(t, e), delete t.titleBlock;
  },
  beforeUpdate(t, e, i) {
    const s = t.titleBlock;
    rn.configure(t, s, i), (s.options = i);
  },
  defaults: {
    align: "center",
    display: !1,
    font: { weight: "bold" },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3,
  },
  defaultRoutes: { color: "color" },
  descriptors: { _scriptable: !0, _indexable: !1 },
};
const ua = new WeakMap();
var fa = {
  id: "subtitle",
  start(t, e, i) {
    const s = new ca({ ctx: t.ctx, options: i, chart: t });
    rn.configure(t, s, i), rn.addBox(t, s), ua.set(t, s);
  },
  stop(t) {
    rn.removeBox(t, ua.get(t)), ua.delete(t);
  },
  beforeUpdate(t, e, i) {
    const s = ua.get(t);
    rn.configure(t, s, i), (s.options = i);
  },
  defaults: {
    align: "center",
    display: !1,
    font: { weight: "normal" },
    fullSize: !0,
    padding: 0,
    position: "top",
    text: "",
    weight: 1500,
  },
  defaultRoutes: { color: "color" },
  descriptors: { _scriptable: !0, _indexable: !1 },
};
const pa = {
  average(t) {
    if (!t.length) return !1;
    let e,
      i,
      s = 0,
      n = 0,
      o = 0;
    for (e = 0, i = t.length; e < i; ++e) {
      const i = t[e].element;
      if (i && i.hasValue()) {
        const t = i.tooltipPosition();
        (s += t.x), (n += t.y), ++o;
      }
    }
    return { x: s / o, y: n / o };
  },
  nearest(t, e) {
    if (!t.length) return !1;
    let i,
      s,
      n,
      o = e.x,
      a = e.y,
      r = Number.POSITIVE_INFINITY;
    for (i = 0, s = t.length; i < s; ++i) {
      const s = t[i].element;
      if (s && s.hasValue()) {
        const t = te(e, s.getCenterPoint());
        t < r && ((r = t), (n = s));
      }
    }
    if (n) {
      const t = n.tooltipPosition();
      (o = t.x), (a = t.y);
    }
    return { x: o, y: a };
  },
};
function ga(t, e) {
  return e && (ut(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t;
}
function ma(t) {
  return ("string" == typeof t || t instanceof String) && t.indexOf("\n") > -1
    ? t.split("\n")
    : t;
}
function ba(t, e) {
  const { element: i, datasetIndex: s, index: n } = e,
    o = t.getDatasetMeta(s).controller,
    { label: a, value: r } = o.getLabelAndValue(n);
  return {
    chart: t,
    label: a,
    parsed: o.getParsed(n),
    raw: t.data.datasets[s].data[n],
    formattedValue: r,
    dataset: o.getDataset(),
    dataIndex: n,
    datasetIndex: s,
    element: i,
  };
}
function xa(t, e) {
  const i = t.chart.ctx,
    { body: s, footer: n, title: o } = t,
    { boxWidth: a, boxHeight: r } = e,
    l = hi(e.bodyFont),
    h = hi(e.titleFont),
    c = hi(e.footerFont),
    d = o.length,
    u = n.length,
    f = s.length,
    p = li(e.padding);
  let g = p.height,
    m = 0,
    b = s.reduce(
      (t, e) => t + e.before.length + e.lines.length + e.after.length,
      0
    );
  if (
    ((b += t.beforeBody.length + t.afterBody.length),
    d &&
      (g += d * h.lineHeight + (d - 1) * e.titleSpacing + e.titleMarginBottom),
    b)
  ) {
    g +=
      f * (e.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight) +
      (b - f) * l.lineHeight +
      (b - 1) * e.bodySpacing;
  }
  u && (g += e.footerMarginTop + u * c.lineHeight + (u - 1) * e.footerSpacing);
  let x = 0;
  const y = function (t) {
    m = Math.max(m, i.measureText(t).width + x);
  };
  return (
    i.save(),
    (i.font = h.string),
    yt(t.title, y),
    (i.font = l.string),
    yt(t.beforeBody.concat(t.afterBody), y),
    (x = e.displayColors ? a + 2 + e.boxPadding : 0),
    yt(s, (t) => {
      yt(t.before, y), yt(t.lines, y), yt(t.after, y);
    }),
    (x = 0),
    (i.font = c.string),
    yt(t.footer, y),
    i.restore(),
    (m += p.width),
    { width: m, height: g }
  );
}
function ya(t, e, i, s) {
  const { x: n, width: o } = i,
    {
      width: a,
      chartArea: { left: r, right: l },
    } = t;
  let h = "center";
  return (
    "center" === s
      ? (h = n <= (r + l) / 2 ? "left" : "right")
      : n <= o / 2
      ? (h = "left")
      : n >= a - o / 2 && (h = "right"),
    (function (t, e, i, s) {
      const { x: n, width: o } = s,
        a = i.caretSize + i.caretPadding;
      return (
        ("left" === t && n + o + a > e.width) ||
        ("right" === t && n - o - a < 0) ||
        void 0
      );
    })(h, t, e, i) && (h = "center"),
    h
  );
}
function _a(t, e, i) {
  const s =
    i.yAlign ||
    e.yAlign ||
    (function (t, e) {
      const { y: i, height: s } = e;
      return i < s / 2 ? "top" : i > t.height - s / 2 ? "bottom" : "center";
    })(t, i);
  return { xAlign: i.xAlign || e.xAlign || ya(t, e, i, s), yAlign: s };
}
function va(t, e, i, s) {
  const { caretSize: n, caretPadding: o, cornerRadius: a } = t,
    { xAlign: r, yAlign: l } = i,
    h = n + o,
    { topLeft: c, topRight: d, bottomLeft: u, bottomRight: f } = ri(a);
  let p = (function (t, e) {
    let { x: i, width: s } = t;
    return "right" === e ? (i -= s) : "center" === e && (i -= s / 2), i;
  })(e, r);
  const g = (function (t, e, i) {
    let { y: s, height: n } = t;
    return "top" === e ? (s += i) : (s -= "bottom" === e ? n + i : n / 2), s;
  })(e, l, h);
  return (
    "center" === l
      ? "left" === r
        ? (p += h)
        : "right" === r && (p -= h)
      : "left" === r
      ? (p -= Math.max(c, u) + n)
      : "right" === r && (p += Math.max(d, f) + n),
    { x: ne(p, 0, s.width - e.width), y: ne(g, 0, s.height - e.height) }
  );
}
function wa(t, e, i) {
  const s = li(i.padding);
  return "center" === e
    ? t.x + t.width / 2
    : "right" === e
    ? t.x + t.width - s.right
    : t.x + s.left;
}
function Ma(t) {
  return ga([], ma(t));
}
function ka(t, e) {
  const i = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
  return i ? t.override(i) : t;
}
const Sa = {
  beforeTitle: ht,
  title(t) {
    if (t.length > 0) {
      const e = t[0],
        i = e.chart.data.labels,
        s = i ? i.length : 0;
      if (this && this.options && "dataset" === this.options.mode)
        return e.dataset.label || "";
      if (e.label) return e.label;
      if (s > 0 && e.dataIndex < s) return i[e.dataIndex];
    }
    return "";
  },
  afterTitle: ht,
  beforeBody: ht,
  beforeLabel: ht,
  label(t) {
    if (this && this.options && "dataset" === this.options.mode)
      return t.label + ": " + t.formattedValue || t.formattedValue;
    let e = t.dataset.label || "";
    e && (e += ": ");
    const i = t.formattedValue;
    return dt(i) || (e += i), e;
  },
  labelColor(t) {
    const e = t.chart
      .getDatasetMeta(t.datasetIndex)
      .controller.getStyle(t.dataIndex);
    return {
      borderColor: e.borderColor,
      backgroundColor: e.backgroundColor,
      borderWidth: e.borderWidth,
      borderDash: e.borderDash,
      borderDashOffset: e.borderDashOffset,
      borderRadius: 0,
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(t) {
    const e = t.chart
      .getDatasetMeta(t.datasetIndex)
      .controller.getStyle(t.dataIndex);
    return { pointStyle: e.pointStyle, rotation: e.rotation };
  },
  afterLabel: ht,
  afterBody: ht,
  beforeFooter: ht,
  footer: ht,
  afterFooter: ht,
};
function Pa(t, e, i, s) {
  const n = t[e].call(i, s);
  return void 0 === n ? Sa[e].call(i, s) : n;
}
class Ca extends Sn {
  static positioners = pa;
  constructor(t) {
    super(),
      (this.opacity = 0),
      (this._active = []),
      (this._eventPosition = void 0),
      (this._size = void 0),
      (this._cachedAnimations = void 0),
      (this._tooltipItems = []),
      (this.$animations = void 0),
      (this.$context = void 0),
      (this.chart = t.chart),
      (this.options = t.options),
      (this.dataPoints = void 0),
      (this.title = void 0),
      (this.beforeBody = void 0),
      (this.body = void 0),
      (this.afterBody = void 0),
      (this.footer = void 0),
      (this.xAlign = void 0),
      (this.yAlign = void 0),
      (this.x = void 0),
      (this.y = void 0),
      (this.height = void 0),
      (this.width = void 0),
      (this.caretX = void 0),
      (this.caretY = void 0),
      (this.labelColors = void 0),
      (this.labelPointStyles = void 0),
      (this.labelTextColors = void 0);
  }
  initialize(t) {
    (this.options = t),
      (this._cachedAnimations = void 0),
      (this.$context = void 0);
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t) return t;
    const e = this.chart,
      i = this.options.setContext(this.getContext()),
      s = i.enabled && e.options.animation && i.animations,
      n = new ps(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(n)), n;
  }
  getContext() {
    return (
      this.$context ||
      (this.$context =
        ((t = this.chart.getContext()),
        (e = this),
        (i = this._tooltipItems),
        ui(t, { tooltip: e, tooltipItems: i, type: "tooltip" })))
    );
    var t, e, i;
  }
  getTitle(t, e) {
    const { callbacks: i } = e,
      s = Pa(i, "beforeTitle", this, t),
      n = Pa(i, "title", this, t),
      o = Pa(i, "afterTitle", this, t);
    let a = [];
    return (a = ga(a, ma(s))), (a = ga(a, ma(n))), (a = ga(a, ma(o))), a;
  }
  getBeforeBody(t, e) {
    return Ma(Pa(e.callbacks, "beforeBody", this, t));
  }
  getBody(t, e) {
    const { callbacks: i } = e,
      s = [];
    return (
      yt(t, (t) => {
        const e = { before: [], lines: [], after: [] },
          n = ka(i, t);
        ga(e.before, ma(Pa(n, "beforeLabel", this, t))),
          ga(e.lines, Pa(n, "label", this, t)),
          ga(e.after, ma(Pa(n, "afterLabel", this, t))),
          s.push(e);
      }),
      s
    );
  }
  getAfterBody(t, e) {
    return Ma(Pa(e.callbacks, "afterBody", this, t));
  }
  getFooter(t, e) {
    const { callbacks: i } = e,
      s = Pa(i, "beforeFooter", this, t),
      n = Pa(i, "footer", this, t),
      o = Pa(i, "afterFooter", this, t);
    let a = [];
    return (a = ga(a, ma(s))), (a = ga(a, ma(n))), (a = ga(a, ma(o))), a;
  }
  _createItems(t) {
    const e = this._active,
      i = this.chart.data,
      s = [],
      n = [],
      o = [];
    let a,
      r,
      l = [];
    for (a = 0, r = e.length; a < r; ++a) l.push(ba(this.chart, e[a]));
    return (
      t.filter && (l = l.filter((e, s, n) => t.filter(e, s, n, i))),
      t.itemSort && (l = l.sort((e, s) => t.itemSort(e, s, i))),
      yt(l, (e) => {
        const i = ka(t.callbacks, e);
        s.push(Pa(i, "labelColor", this, e)),
          n.push(Pa(i, "labelPointStyle", this, e)),
          o.push(Pa(i, "labelTextColor", this, e));
      }),
      (this.labelColors = s),
      (this.labelPointStyles = n),
      (this.labelTextColors = o),
      (this.dataPoints = l),
      l
    );
  }
  update(t, e) {
    const i = this.options.setContext(this.getContext()),
      s = this._active;
    let n,
      o = [];
    if (s.length) {
      const t = pa[i.position].call(this, s, this._eventPosition);
      (o = this._createItems(i)),
        (this.title = this.getTitle(o, i)),
        (this.beforeBody = this.getBeforeBody(o, i)),
        (this.body = this.getBody(o, i)),
        (this.afterBody = this.getAfterBody(o, i)),
        (this.footer = this.getFooter(o, i));
      const e = (this._size = xa(this, i)),
        a = Object.assign({}, t, e),
        r = _a(this.chart, i, a),
        l = va(i, a, r, this.chart);
      (this.xAlign = r.xAlign),
        (this.yAlign = r.yAlign),
        (n = {
          opacity: 1,
          x: l.x,
          y: l.y,
          width: e.width,
          height: e.height,
          caretX: t.x,
          caretY: t.y,
        });
    } else 0 !== this.opacity && (n = { opacity: 0 });
    (this._tooltipItems = o),
      (this.$context = void 0),
      n && this._resolveAnimations().update(this, n),
      t &&
        i.external &&
        i.external.call(this, { chart: this.chart, tooltip: this, replay: e });
  }
  drawCaret(t, e, i, s) {
    const n = this.getCaretPosition(t, i, s);
    e.lineTo(n.x1, n.y1), e.lineTo(n.x2, n.y2), e.lineTo(n.x3, n.y3);
  }
  getCaretPosition(t, e, i) {
    const { xAlign: s, yAlign: n } = this,
      { caretSize: o, cornerRadius: a } = i,
      { topLeft: r, topRight: l, bottomLeft: h, bottomRight: c } = ri(a),
      { x: d, y: u } = t,
      { width: f, height: p } = e;
    let g, m, b, x, y, _;
    return (
      "center" === n
        ? ((y = u + p / 2),
          "left" === s
            ? ((g = d), (m = g - o), (x = y + o), (_ = y - o))
            : ((g = d + f), (m = g + o), (x = y - o), (_ = y + o)),
          (b = g))
        : ((m =
            "left" === s
              ? d + Math.max(r, h) + o
              : "right" === s
              ? d + f - Math.max(l, c) - o
              : this.caretX),
          "top" === n
            ? ((x = u), (y = x - o), (g = m - o), (b = m + o))
            : ((x = u + p), (y = x + o), (g = m + o), (b = m - o)),
          (_ = x)),
      { x1: g, x2: m, x3: b, y1: x, y2: y, y3: _ }
    );
  }
  drawTitle(t, e, i) {
    const s = this.title,
      n = s.length;
    let o, a, r;
    if (n) {
      const l = Zi(i.rtl, this.x, this.width);
      for (
        t.x = wa(this, i.titleAlign, i),
          e.textAlign = l.textAlign(i.titleAlign),
          e.textBaseline = "middle",
          o = hi(i.titleFont),
          a = i.titleSpacing,
          e.fillStyle = i.titleColor,
          e.font = o.string,
          r = 0;
        r < n;
        ++r
      )
        e.fillText(s[r], l.x(t.x), t.y + o.lineHeight / 2),
          (t.y += o.lineHeight + a),
          r + 1 === n && (t.y += i.titleMarginBottom - a);
    }
  }
  _drawColorBox(t, e, i, s, n) {
    const o = this.labelColors[i],
      a = this.labelPointStyles[i],
      { boxHeight: r, boxWidth: l, boxPadding: h } = n,
      c = hi(n.bodyFont),
      d = wa(this, "left", n),
      u = s.x(d),
      f = r < c.lineHeight ? (c.lineHeight - r) / 2 : 0,
      p = e.y + f;
    if (n.usePointStyle) {
      const e = {
          radius: Math.min(l, r) / 2,
          pointStyle: a.pointStyle,
          rotation: a.rotation,
          borderWidth: 1,
        },
        i = s.leftForLtr(u, l) + l / 2,
        h = p + r / 2;
      (t.strokeStyle = n.multiKeyBackground),
        (t.fillStyle = n.multiKeyBackground),
        Ne(t, e, i, h),
        (t.strokeStyle = o.borderColor),
        (t.fillStyle = o.backgroundColor),
        Ne(t, e, i, h);
    } else {
      (t.lineWidth = ft(o.borderWidth)
        ? Math.max(...Object.values(o.borderWidth))
        : o.borderWidth || 1),
        (t.strokeStyle = o.borderColor),
        t.setLineDash(o.borderDash || []),
        (t.lineDashOffset = o.borderDashOffset || 0);
      const e = s.leftForLtr(u, l - h),
        i = s.leftForLtr(s.xPlus(u, 1), l - h - 2),
        a = ri(o.borderRadius);
      Object.values(a).some((t) => 0 !== t)
        ? (t.beginPath(),
          (t.fillStyle = n.multiKeyBackground),
          ti(t, { x: e, y: p, w: l, h: r, radius: a }),
          t.fill(),
          t.stroke(),
          (t.fillStyle = o.backgroundColor),
          t.beginPath(),
          ti(t, { x: i, y: p + 1, w: l - 2, h: r - 2, radius: a }),
          t.fill())
        : ((t.fillStyle = n.multiKeyBackground),
          t.fillRect(e, p, l, r),
          t.strokeRect(e, p, l, r),
          (t.fillStyle = o.backgroundColor),
          t.fillRect(i, p + 1, l - 2, r - 2));
    }
    t.fillStyle = this.labelTextColors[i];
  }
  drawBody(t, e, i) {
    const { body: s } = this,
      {
        bodySpacing: n,
        bodyAlign: o,
        displayColors: a,
        boxHeight: r,
        boxWidth: l,
        boxPadding: h,
      } = i,
      c = hi(i.bodyFont);
    let d = c.lineHeight,
      u = 0;
    const f = Zi(i.rtl, this.x, this.width),
      p = function (i) {
        e.fillText(i, f.x(t.x + u), t.y + d / 2), (t.y += d + n);
      },
      g = f.textAlign(o);
    let m, b, x, y, _, v, w;
    for (
      e.textAlign = o,
        e.textBaseline = "middle",
        e.font = c.string,
        t.x = wa(this, g, i),
        e.fillStyle = i.bodyColor,
        yt(this.beforeBody, p),
        u = a && "right" !== g ? ("center" === o ? l / 2 + h : l + 2 + h) : 0,
        y = 0,
        v = s.length;
      y < v;
      ++y
    ) {
      for (
        m = s[y],
          b = this.labelTextColors[y],
          e.fillStyle = b,
          yt(m.before, p),
          x = m.lines,
          a &&
            x.length &&
            (this._drawColorBox(e, t, y, f, i),
            (d = Math.max(c.lineHeight, r))),
          _ = 0,
          w = x.length;
        _ < w;
        ++_
      )
        p(x[_]), (d = c.lineHeight);
      yt(m.after, p);
    }
    (u = 0), (d = c.lineHeight), yt(this.afterBody, p), (t.y -= n);
  }
  drawFooter(t, e, i) {
    const s = this.footer,
      n = s.length;
    let o, a;
    if (n) {
      const r = Zi(i.rtl, this.x, this.width);
      for (
        t.x = wa(this, i.footerAlign, i),
          t.y += i.footerMarginTop,
          e.textAlign = r.textAlign(i.footerAlign),
          e.textBaseline = "middle",
          o = hi(i.footerFont),
          e.fillStyle = i.footerColor,
          e.font = o.string,
          a = 0;
        a < n;
        ++a
      )
        e.fillText(s[a], r.x(t.x), t.y + o.lineHeight / 2),
          (t.y += o.lineHeight + i.footerSpacing);
    }
  }
  drawBackground(t, e, i, s) {
    const { xAlign: n, yAlign: o } = this,
      { x: a, y: r } = t,
      { width: l, height: h } = i,
      {
        topLeft: c,
        topRight: d,
        bottomLeft: u,
        bottomRight: f,
      } = ri(s.cornerRadius);
    (e.fillStyle = s.backgroundColor),
      (e.strokeStyle = s.borderColor),
      (e.lineWidth = s.borderWidth),
      e.beginPath(),
      e.moveTo(a + c, r),
      "top" === o && this.drawCaret(t, e, i, s),
      e.lineTo(a + l - d, r),
      e.quadraticCurveTo(a + l, r, a + l, r + d),
      "center" === o && "right" === n && this.drawCaret(t, e, i, s),
      e.lineTo(a + l, r + h - f),
      e.quadraticCurveTo(a + l, r + h, a + l - f, r + h),
      "bottom" === o && this.drawCaret(t, e, i, s),
      e.lineTo(a + u, r + h),
      e.quadraticCurveTo(a, r + h, a, r + h - u),
      "center" === o && "left" === n && this.drawCaret(t, e, i, s),
      e.lineTo(a, r + c),
      e.quadraticCurveTo(a, r, a + c, r),
      e.closePath(),
      e.fill(),
      s.borderWidth > 0 && e.stroke();
  }
  _updateAnimationTarget(t) {
    const e = this.chart,
      i = this.$animations,
      s = i && i.x,
      n = i && i.y;
    if (s || n) {
      const i = pa[t.position].call(this, this._active, this._eventPosition);
      if (!i) return;
      const o = (this._size = xa(this, t)),
        a = Object.assign({}, i, this._size),
        r = _a(e, t, a),
        l = va(t, a, r, e);
      (s._to === l.x && n._to === l.y) ||
        ((this.xAlign = r.xAlign),
        (this.yAlign = r.yAlign),
        (this.width = o.width),
        (this.height = o.height),
        (this.caretX = i.x),
        (this.caretY = i.y),
        this._resolveAnimations().update(this, l));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const e = this.options.setContext(this.getContext());
    let i = this.opacity;
    if (!i) return;
    this._updateAnimationTarget(e);
    const s = { width: this.width, height: this.height },
      n = { x: this.x, y: this.y };
    i = Math.abs(i) < 0.001 ? 0 : i;
    const o = li(e.padding),
      a =
        this.title.length ||
        this.beforeBody.length ||
        this.body.length ||
        this.afterBody.length ||
        this.footer.length;
    e.enabled &&
      a &&
      (t.save(),
      (t.globalAlpha = i),
      this.drawBackground(n, t, s, e),
      Qi(t, e.textDirection),
      (n.y += o.top),
      this.drawTitle(n, t, e),
      this.drawBody(n, t, e),
      this.drawFooter(n, t, e),
      ts(t, e.textDirection),
      t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, e) {
    const i = this._active,
      s = t.map(({ datasetIndex: t, index: e }) => {
        const i = this.chart.getDatasetMeta(t);
        if (!i) throw new Error("Cannot find a dataset at index " + t);
        return { datasetIndex: t, element: i.data[e], index: e };
      }),
      n = !_t(i, s),
      o = this._positionChanged(s, e);
    (n || o) &&
      ((this._active = s),
      (this._eventPosition = e),
      (this._ignoreReplayEvents = !0),
      this.update(!0));
  }
  handleEvent(t, e, i = !0) {
    if (e && this._ignoreReplayEvents) return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options,
      n = this._active || [],
      o = this._getActiveElements(t, n, e, i),
      a = this._positionChanged(o, t),
      r = e || !_t(o, n) || a;
    return (
      r &&
        ((this._active = o),
        (s.enabled || s.external) &&
          ((this._eventPosition = { x: t.x, y: t.y }), this.update(!0, e))),
      r
    );
  }
  _getActiveElements(t, e, i, s) {
    const n = this.options;
    if ("mouseout" === t.type) return [];
    if (!s) return e;
    const o = this.chart.getElementsAtEventForMode(t, n.mode, n, i);
    return n.reverse && o.reverse(), o;
  }
  _positionChanged(t, e) {
    const { caretX: i, caretY: s, options: n } = this,
      o = pa[n.position].call(this, t, e);
    return !1 !== o && (i !== o.x || s !== o.y);
  }
}
var Da = {
    id: "tooltip",
    _element: Ca,
    positioners: pa,
    afterInit(t, e, i) {
      i && (t.tooltip = new Ca({ chart: t, options: i }));
    },
    beforeUpdate(t, e, i) {
      t.tooltip && t.tooltip.initialize(i);
    },
    reset(t, e, i) {
      t.tooltip && t.tooltip.initialize(i);
    },
    afterDraw(t) {
      const e = t.tooltip;
      if (e && e._willRender()) {
        const i = { tooltip: e };
        if (
          !1 === t.notifyPlugins("beforeTooltipDraw", { ...i, cancelable: !0 })
        )
          return;
        e.draw(t.ctx), t.notifyPlugins("afterTooltipDraw", i);
      }
    },
    afterEvent(t, e) {
      if (t.tooltip) {
        const i = e.replay;
        t.tooltip.handleEvent(e.event, i, e.inChartArea) && (e.changed = !0);
      }
    },
    defaults: {
      enabled: !0,
      external: null,
      position: "average",
      backgroundColor: "rgba(0,0,0,0.8)",
      titleColor: "#fff",
      titleFont: { weight: "bold" },
      titleSpacing: 2,
      titleMarginBottom: 6,
      titleAlign: "left",
      bodyColor: "#fff",
      bodySpacing: 2,
      bodyFont: {},
      bodyAlign: "left",
      footerColor: "#fff",
      footerSpacing: 2,
      footerMarginTop: 6,
      footerFont: { weight: "bold" },
      footerAlign: "left",
      padding: 6,
      caretPadding: 2,
      caretSize: 5,
      cornerRadius: 6,
      boxHeight: (t, e) => e.bodyFont.size,
      boxWidth: (t, e) => e.bodyFont.size,
      multiKeyBackground: "#fff",
      displayColors: !0,
      boxPadding: 0,
      borderColor: "rgba(0,0,0,0)",
      borderWidth: 0,
      animation: { duration: 400, easing: "easeOutQuart" },
      animations: {
        numbers: {
          type: "number",
          properties: ["x", "y", "width", "height", "caretX", "caretY"],
        },
        opacity: { easing: "linear", duration: 200 },
      },
      callbacks: Sa,
    },
    defaultRoutes: { bodyFont: "font", footerFont: "font", titleFont: "font" },
    descriptors: {
      _scriptable: (t) =>
        "filter" !== t && "itemSort" !== t && "external" !== t,
      _indexable: !1,
      callbacks: { _scriptable: !1, _indexable: !1 },
      animation: { _fallback: !1 },
      animations: { _fallback: "animation" },
    },
    additionalOptionScopes: ["interaction"],
  },
  Ta = Object.freeze({
    __proto__: null,
    Colors: zo,
    Decimation: Wo,
    Filler: oa,
    Legend: ha,
    SubTitle: fa,
    Title: da,
    Tooltip: Da,
  });
const Oa = (t, e, i, s) => (
  "string" == typeof e
    ? ((i = t.push(e) - 1), s.unshift({ index: i, label: e }))
    : isNaN(e) && (i = null),
  i
);
function La(t) {
  const e = this.getLabels();
  return t >= 0 && t < e.length ? e[t] : t;
}
function Aa(t, e) {
  const i = [],
    {
      bounds: s,
      step: n,
      min: o,
      max: a,
      precision: r,
      count: l,
      maxTicks: h,
      maxDigits: c,
      includeBounds: d,
    } = t,
    u = n || 1,
    f = h - 1,
    { min: p, max: g } = e,
    m = !dt(o),
    b = !dt(a),
    x = !dt(l),
    y = (g - p) / (c + 1);
  let _,
    v,
    w,
    M,
    k = qt((g - p) / f / u) * u;
  if (k < 1e-14 && !m && !b) return [{ value: p }, { value: g }];
  (M = Math.ceil(g / k) - Math.floor(p / k)),
    M > f && (k = qt((M * k) / f / u) * u),
    dt(r) || ((_ = Math.pow(10, r)), (k = Math.ceil(k * _) / _)),
    "ticks" === s
      ? ((v = Math.floor(p / k) * k), (w = Math.ceil(g / k) * k))
      : ((v = p), (w = g)),
    m && b && n && Ut((a - o) / n, k / 1e3)
      ? ((M = Math.round(Math.min((a - o) / k, h))),
        (k = (a - o) / M),
        (v = o),
        (w = a))
      : x
      ? ((v = m ? o : v), (w = b ? a : w), (M = l - 1), (k = (w - v) / M))
      : ((M = (w - v) / k),
        (M = Nt(M, Math.round(M), k / 1e3) ? Math.round(M) : Math.ceil(M)));
  const S = Math.max(Zt(k), Zt(v));
  (_ = Math.pow(10, dt(r) ? S : r)),
    (v = Math.round(v * _) / _),
    (w = Math.round(w * _) / _);
  let P = 0;
  for (
    m &&
    (d && v !== o
      ? (i.push({ value: o }),
        v < o && P++,
        Nt(Math.round((v + P * k) * _) / _, o, Ea(o, y, t)) && P++)
      : v < o && P++);
    P < M;
    ++P
  )
    i.push({ value: Math.round((v + P * k) * _) / _ });
  return (
    b && d && w !== a
      ? i.length && Nt(i[i.length - 1].value, a, Ea(a, y, t))
        ? (i[i.length - 1].value = a)
        : i.push({ value: a })
      : (b && w !== a) || i.push({ value: w }),
    i
  );
}
function Ea(t, e, { horizontal: i, minRotation: s }) {
  const n = Jt(s),
    o = (i ? Math.sin(n) : Math.cos(n)) || 0.001,
    a = 0.75 * e * ("" + t).length;
  return Math.min(e / o, a);
}
class Ra extends In {
  constructor(t) {
    super(t),
      (this.start = void 0),
      (this.end = void 0),
      (this._startValue = void 0),
      (this._endValue = void 0),
      (this._valueRange = 0);
  }
  parse(t, e) {
    return dt(t) ||
      (("number" == typeof t || t instanceof Number) && !isFinite(+t))
      ? null
      : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options,
      { minDefined: e, maxDefined: i } = this.getUserBounds();
    let { min: s, max: n } = this;
    const o = (t) => (s = e ? s : t),
      a = (t) => (n = i ? n : t);
    if (t) {
      const t = jt(s),
        e = jt(n);
      t < 0 && e < 0 ? a(0) : t > 0 && e > 0 && o(0);
    }
    if (s === n) {
      let e = 0 === n ? 1 : Math.abs(0.05 * n);
      a(n + e), t || o(s - e);
    }
    (this.min = s), (this.max = n);
  }
  getTickLimit() {
    const t = this.options.ticks;
    let e,
      { maxTicksLimit: i, stepSize: s } = t;
    return (
      s
        ? ((e = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1),
          e > 1e3 &&
            (console.warn(
              `scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${e} ticks. Limiting to 1000.`
            ),
            (e = 1e3)))
        : ((e = this.computeTickLimit()), (i = i || 11)),
      i && (e = Math.min(i, e)),
      e
    );
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options,
      e = t.ticks;
    let i = this.getTickLimit();
    i = Math.max(2, i);
    const s = Aa(
      {
        maxTicks: i,
        bounds: t.bounds,
        min: t.min,
        max: t.max,
        precision: e.precision,
        step: e.stepSize,
        count: e.count,
        maxDigits: this._maxDigits(),
        horizontal: this.isHorizontal(),
        minRotation: e.minRotation || 0,
        includeBounds: !1 !== e.includeBounds,
      },
      this._range || this
    );
    return (
      "ticks" === t.bounds && Gt(s, this, "value"),
      t.reverse
        ? (s.reverse(), (this.start = this.max), (this.end = this.min))
        : ((this.start = this.min), (this.end = this.max)),
      s
    );
  }
  configure() {
    const t = this.ticks;
    let e = this.min,
      i = this.max;
    if ((super.configure(), this.options.offset && t.length)) {
      const s = (i - e) / Math.max(t.length - 1, 1) / 2;
      (e -= s), (i += s);
    }
    (this._startValue = e), (this._endValue = i), (this._valueRange = i - e);
  }
  getLabelForValue(t) {
    return Le(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class $a extends Ra {
  static id = "linear";
  static defaults = { ticks: { callback: Ee.formatters.numeric } };
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    (this.min = pt(t) ? t : 0),
      (this.max = pt(e) ? e : 1),
      this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(),
      e = t ? this.width : this.height,
      i = Jt(this.options.ticks.minRotation),
      s = (t ? Math.sin(i) : Math.cos(i)) || 0.001,
      n = this._resolveTickFontOptions(0);
    return Math.ceil(e / Math.min(40, n.lineHeight / s));
  }
  getPixelForValue(t) {
    return null === t
      ? NaN
      : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Ia = (t) => Math.floor(Wt(t)),
  Fa = (t, e) => Math.pow(10, Ia(t) + e);
function Ha(t) {
  return 1 === t / Math.pow(10, Ia(t));
}
function za(t, e, i) {
  const s = Math.pow(10, i),
    n = Math.floor(t / s);
  return Math.ceil(e / s) - n;
}
function Ba(t, { min: e, max: i }) {
  e = gt(t.min, e);
  const s = [],
    n = Ia(e);
  let o = (function (t, e) {
      let i = Ia(e - t);
      for (; za(t, e, i) > 10; ) i++;
      for (; za(t, e, i) < 10; ) i--;
      return Math.min(i, Ia(t));
    })(e, i),
    a = o < 0 ? Math.pow(10, Math.abs(o)) : 1;
  const r = Math.pow(10, o),
    l = n > o ? Math.pow(10, n) : 0,
    h = Math.round((e - l) * a) / a,
    c = Math.floor((e - l) / r / 10) * r * 10;
  let d = Math.floor((h - c) / Math.pow(10, o)),
    u = gt(t.min, Math.round((l + c + d * Math.pow(10, o)) * a) / a);
  for (; u < i; )
    s.push({ value: u, major: Ha(u), significand: d }),
      d >= 10 ? (d = d < 15 ? 15 : 20) : d++,
      d >= 20 && (o++, (d = 2), (a = o >= 0 ? 1 : a)),
      (u = Math.round((l + c + d * Math.pow(10, o)) * a) / a);
  const f = gt(t.max, u);
  return s.push({ value: f, major: Ha(f), significand: d }), s;
}
class Va extends In {
  static id = "logarithmic";
  static defaults = {
    ticks: { callback: Ee.formatters.logarithmic, major: { enabled: !0 } },
  };
  constructor(t) {
    super(t),
      (this.start = void 0),
      (this.end = void 0),
      (this._startValue = void 0),
      (this._valueRange = 0);
  }
  parse(t, e) {
    const i = Ra.prototype.parse.apply(this, [t, e]);
    if (0 !== i) return pt(i) && i > 0 ? i : null;
    this._zero = !0;
  }
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    (this.min = pt(t) ? Math.max(0, t) : null),
      (this.max = pt(e) ? Math.max(0, e) : null),
      this.options.beginAtZero && (this._zero = !0),
      this._zero &&
        this.min !== this._suggestedMin &&
        !pt(this._userMin) &&
        (this.min = t === Fa(this.min, 0) ? Fa(this.min, -1) : Fa(this.min, 0)),
      this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let i = this.min,
      s = this.max;
    const n = (e) => (i = t ? i : e),
      o = (t) => (s = e ? s : t);
    i === s && (i <= 0 ? (n(1), o(10)) : (n(Fa(i, -1)), o(Fa(s, 1)))),
      i <= 0 && n(Fa(s, -1)),
      s <= 0 && o(Fa(i, 1)),
      (this.min = i),
      (this.max = s);
  }
  buildTicks() {
    const t = this.options,
      e = Ba({ min: this._userMin, max: this._userMax }, this);
    return (
      "ticks" === t.bounds && Gt(e, this, "value"),
      t.reverse
        ? (e.reverse(), (this.start = this.max), (this.end = this.min))
        : ((this.start = this.min), (this.end = this.max)),
      e
    );
  }
  getLabelForValue(t) {
    return void 0 === t
      ? "0"
      : Le(t, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const t = this.min;
    super.configure(),
      (this._startValue = Wt(t)),
      (this._valueRange = Wt(this.max) - Wt(t));
  }
  getPixelForValue(t) {
    return (
      (void 0 !== t && 0 !== t) || (t = this.min),
      null === t || isNaN(t)
        ? NaN
        : this.getPixelForDecimal(
            t === this.min ? 0 : (Wt(t) - this._startValue) / this._valueRange
          )
    );
  }
  getValueForPixel(t) {
    const e = this.getDecimalForPixel(t);
    return Math.pow(10, this._startValue + e * this._valueRange);
  }
}
function Wa(t) {
  const e = t.ticks;
  if (e.display && t.display) {
    const t = li(e.backdropPadding);
    return mt(e.font && e.font.size, ze.font.size) + t.height;
  }
  return 0;
}
function ja(t, e, i, s, n) {
  return t === s || t === n
    ? { start: e - i / 2, end: e + i / 2 }
    : t < s || t > n
    ? { start: e - i, end: e }
    : { start: e, end: e + i };
}
function Na(t) {
  const e = {
      l: t.left + t._padding.left,
      r: t.right - t._padding.right,
      t: t.top + t._padding.top,
      b: t.bottom - t._padding.bottom,
    },
    i = Object.assign({}, e),
    s = [],
    n = [],
    o = t._pointLabels.length,
    a = t.options.pointLabels,
    r = a.centerPointLabels ? Rt / o : 0;
  for (let d = 0; d < o; d++) {
    const o = a.setContext(t.getPointLabelContext(d));
    n[d] = o.padding;
    const u = t.getPointPosition(d, t.drawingArea + n[d], r),
      f = hi(o.font),
      p =
        ((l = t.ctx),
        (h = f),
        (c = ut((c = t._pointLabels[d])) ? c : [c]),
        { w: Ve(l, h.string, c), h: c.length * h.lineHeight });
    s[d] = p;
    const g = ie(t.getIndexAngle(d) + r),
      m = Math.round(Kt(g));
    qa(i, e, g, ja(m, u.x, p.w, 0, 180), ja(m, u.y, p.h, 90, 270));
  }
  var l, h, c;
  t.setCenterPoint(e.l - i.l, i.r - e.r, e.t - i.t, i.b - e.b),
    (t._pointLabelItems = (function (t, e, i) {
      const s = [],
        n = t._pointLabels.length,
        o = t.options,
        a = Wa(o) / 2,
        r = t.drawingArea,
        l = o.pointLabels.centerPointLabels ? Rt / n : 0;
      for (let o = 0; o < n; o++) {
        const n = t.getPointPosition(o, r + a + i[o], l),
          h = Math.round(Kt(ie(n.angle + zt))),
          c = e[o],
          d = Ua(n.y, c.h, h),
          u = Ya(h),
          f = Xa(n.x, c.w, u);
        s.push({
          x: n.x,
          y: d,
          textAlign: u,
          left: f,
          top: d,
          right: f + c.w,
          bottom: d + c.h,
        });
      }
      return s;
    })(t, s, n));
}
function qa(t, e, i, s, n) {
  const o = Math.abs(Math.sin(i)),
    a = Math.abs(Math.cos(i));
  let r = 0,
    l = 0;
  s.start < e.l
    ? ((r = (e.l - s.start) / o), (t.l = Math.min(t.l, e.l - r)))
    : s.end > e.r && ((r = (s.end - e.r) / o), (t.r = Math.max(t.r, e.r + r))),
    n.start < e.t
      ? ((l = (e.t - n.start) / a), (t.t = Math.min(t.t, e.t - l)))
      : n.end > e.b &&
        ((l = (n.end - e.b) / a), (t.b = Math.max(t.b, e.b + l)));
}
function Ya(t) {
  return 0 === t || 180 === t ? "center" : t < 180 ? "left" : "right";
}
function Xa(t, e, i) {
  return "right" === i ? (t -= e) : "center" === i && (t -= e / 2), t;
}
function Ua(t, e, i) {
  return (
    90 === i || 270 === i ? (t -= e / 2) : (i > 270 || i < 90) && (t -= e), t
  );
}
function Ga(t, e, i, s) {
  const { ctx: n } = t;
  if (i) n.arc(t.xCenter, t.yCenter, e, 0, $t);
  else {
    let i = t.getPointPosition(0, e);
    n.moveTo(i.x, i.y);
    for (let o = 1; o < s; o++)
      (i = t.getPointPosition(o, e)), n.lineTo(i.x, i.y);
  }
}
class Ja extends Ra {
  static id = "radialLinear";
  static defaults = {
    display: !0,
    animate: !0,
    position: "chartArea",
    angleLines: {
      display: !0,
      lineWidth: 1,
      borderDash: [],
      borderDashOffset: 0,
    },
    grid: { circular: !1 },
    startAngle: 0,
    ticks: { showLabelBackdrop: !0, callback: Ee.formatters.numeric },
    pointLabels: {
      backdropColor: void 0,
      backdropPadding: 2,
      display: !0,
      font: { size: 10 },
      callback: (t) => t,
      padding: 5,
      centerPointLabels: !1,
    },
  };
  static defaultRoutes = {
    "angleLines.color": "borderColor",
    "pointLabels.color": "color",
    "ticks.color": "color",
  };
  static descriptors = { angleLines: { _fallback: "grid" } };
  constructor(t) {
    super(t),
      (this.xCenter = void 0),
      (this.yCenter = void 0),
      (this.drawingArea = void 0),
      (this._pointLabels = []),
      (this._pointLabelItems = []);
  }
  setDimensions() {
    const t = (this._padding = li(Wa(this.options) / 2)),
      e = (this.width = this.maxWidth - t.width),
      i = (this.height = this.maxHeight - t.height);
    (this.xCenter = Math.floor(this.left + e / 2 + t.left)),
      (this.yCenter = Math.floor(this.top + i / 2 + t.top)),
      (this.drawingArea = Math.floor(Math.min(e, i) / 2));
  }
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!1);
    (this.min = pt(t) && !isNaN(t) ? t : 0),
      (this.max = pt(e) && !isNaN(e) ? e : 0),
      this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / Wa(this.options));
  }
  generateTickLabels(t) {
    Ra.prototype.generateTickLabels.call(this, t),
      (this._pointLabels = this.getLabels()
        .map((t, e) => {
          const i = xt(this.options.pointLabels.callback, [t, e], this);
          return i || 0 === i ? i : "";
        })
        .filter((t, e) => this.chart.getDataVisibility(e)));
  }
  fit() {
    const t = this.options;
    t.display && t.pointLabels.display
      ? Na(this)
      : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(t, e, i, s) {
    (this.xCenter += Math.floor((t - e) / 2)),
      (this.yCenter += Math.floor((i - s) / 2)),
      (this.drawingArea -= Math.min(
        this.drawingArea / 2,
        Math.max(t, e, i, s)
      ));
  }
  getIndexAngle(t) {
    return ie(
      t * ($t / (this._pointLabels.length || 1)) +
        Jt(this.options.startAngle || 0)
    );
  }
  getDistanceFromCenterForValue(t) {
    if (dt(t)) return NaN;
    const e = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - t) * e : (t - this.min) * e;
  }
  getValueForDistanceFromCenter(t) {
    if (dt(t)) return NaN;
    const e = t / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - e : this.min + e;
  }
  getPointLabelContext(t) {
    const e = this._pointLabels || [];
    if (t >= 0 && t < e.length) {
      const i = e[t];
      return (function (t, e, i) {
        return ui(t, { label: i, index: e, type: "pointLabel" });
      })(this.getContext(), t, i);
    }
  }
  getPointPosition(t, e, i = 0) {
    const s = this.getIndexAngle(t) - zt + i;
    return {
      x: Math.cos(s) * e + this.xCenter,
      y: Math.sin(s) * e + this.yCenter,
      angle: s,
    };
  }
  getPointPositionForValue(t, e) {
    return this.getPointPosition(t, this.getDistanceFromCenterForValue(e));
  }
  getBasePosition(t) {
    return this.getPointPositionForValue(t || 0, this.getBaseValue());
  }
  getPointLabelPosition(t) {
    const { left: e, top: i, right: s, bottom: n } = this._pointLabelItems[t];
    return { left: e, top: i, right: s, bottom: n };
  }
  drawBackground() {
    const {
      backgroundColor: t,
      grid: { circular: e },
    } = this.options;
    if (t) {
      const i = this.ctx;
      i.save(),
        i.beginPath(),
        Ga(
          this,
          this.getDistanceFromCenterForValue(this._endValue),
          e,
          this._pointLabels.length
        ),
        i.closePath(),
        (i.fillStyle = t),
        i.fill(),
        i.restore();
    }
  }
  drawGrid() {
    const t = this.ctx,
      e = this.options,
      { angleLines: i, grid: s, border: n } = e,
      o = this._pointLabels.length;
    let a, r, l;
    if (
      (e.pointLabels.display &&
        (function (t, e) {
          const {
            ctx: i,
            options: { pointLabels: s },
          } = t;
          for (let n = e - 1; n >= 0; n--) {
            const e = s.setContext(t.getPointLabelContext(n)),
              o = hi(e.font),
              {
                x: a,
                y: r,
                textAlign: l,
                left: h,
                top: c,
                right: d,
                bottom: u,
              } = t._pointLabelItems[n],
              { backdropColor: f } = e;
            if (!dt(f)) {
              const t = ri(e.borderRadius),
                s = li(e.backdropPadding);
              i.fillStyle = f;
              const n = h - s.left,
                o = c - s.top,
                a = d - h + s.width,
                r = u - c + s.height;
              Object.values(t).some((t) => 0 !== t)
                ? (i.beginPath(),
                  ti(i, { x: n, y: o, w: a, h: r, radius: t }),
                  i.fill())
                : i.fillRect(n, o, a, r);
            }
            Ke(i, t._pointLabels[n], a, r + o.lineHeight / 2, o, {
              color: e.color,
              textAlign: l,
              textBaseline: "middle",
            });
          }
        })(this, o),
      s.display &&
        this.ticks.forEach((t, e) => {
          if (0 !== e) {
            r = this.getDistanceFromCenterForValue(t.value);
            const i = this.getContext(e),
              a = s.setContext(i),
              l = n.setContext(i);
            !(function (t, e, i, s, n) {
              const o = t.ctx,
                a = e.circular,
                { color: r, lineWidth: l } = e;
              (!a && !s) ||
                !r ||
                !l ||
                i < 0 ||
                (o.save(),
                (o.strokeStyle = r),
                (o.lineWidth = l),
                o.setLineDash(n.dash),
                (o.lineDashOffset = n.dashOffset),
                o.beginPath(),
                Ga(t, i, a, s),
                o.closePath(),
                o.stroke(),
                o.restore());
            })(this, a, r, o, l);
          }
        }),
      i.display)
    ) {
      for (t.save(), a = o - 1; a >= 0; a--) {
        const s = i.setContext(this.getPointLabelContext(a)),
          { color: n, lineWidth: o } = s;
        o &&
          n &&
          ((t.lineWidth = o),
          (t.strokeStyle = n),
          t.setLineDash(s.borderDash),
          (t.lineDashOffset = s.borderDashOffset),
          (r = this.getDistanceFromCenterForValue(
            e.ticks.reverse ? this.min : this.max
          )),
          (l = this.getPointPosition(a, r)),
          t.beginPath(),
          t.moveTo(this.xCenter, this.yCenter),
          t.lineTo(l.x, l.y),
          t.stroke());
      }
      t.restore();
    }
  }
  drawBorder() {}
  drawLabels() {
    const t = this.ctx,
      e = this.options,
      i = e.ticks;
    if (!i.display) return;
    const s = this.getIndexAngle(0);
    let n, o;
    t.save(),
      t.translate(this.xCenter, this.yCenter),
      t.rotate(s),
      (t.textAlign = "center"),
      (t.textBaseline = "middle"),
      this.ticks.forEach((s, a) => {
        if (0 === a && !e.reverse) return;
        const r = i.setContext(this.getContext(a)),
          l = hi(r.font);
        if (
          ((n = this.getDistanceFromCenterForValue(this.ticks[a].value)),
          r.showLabelBackdrop)
        ) {
          (t.font = l.string),
            (o = t.measureText(s.label).width),
            (t.fillStyle = r.backdropColor);
          const e = li(r.backdropPadding);
          t.fillRect(
            -o / 2 - e.left,
            -n - l.size / 2 - e.top,
            o + e.width,
            l.size + e.height
          );
        }
        Ke(t, s.label, 0, -n, l, { color: r.color });
      }),
      t.restore();
  }
  drawTitle() {}
}
const Ka = {
    millisecond: { common: !0, size: 1, steps: 1e3 },
    second: { common: !0, size: 1e3, steps: 60 },
    minute: { common: !0, size: 6e4, steps: 60 },
    hour: { common: !0, size: 36e5, steps: 24 },
    day: { common: !0, size: 864e5, steps: 30 },
    week: { common: !1, size: 6048e5, steps: 4 },
    month: { common: !0, size: 2628e6, steps: 12 },
    quarter: { common: !1, size: 7884e6, steps: 4 },
    year: { common: !0, size: 3154e7 },
  },
  Za = Object.keys(Ka);
function Qa(t, e) {
  return t - e;
}
function tr(t, e) {
  if (dt(e)) return null;
  const i = t._adapter,
    { parser: s, round: n, isoWeekday: o } = t._parseOpts;
  let a = e;
  return (
    "function" == typeof s && (a = s(a)),
    pt(a) || (a = "string" == typeof s ? i.parse(a, s) : i.parse(a)),
    null === a
      ? null
      : (n &&
          (a =
            "week" !== n || (!Xt(o) && !0 !== o)
              ? i.startOf(a, n)
              : i.startOf(a, "isoWeek", o)),
        +a)
  );
}
function er(t, e, i, s) {
  const n = Za.length;
  for (let o = Za.indexOf(t); o < n - 1; ++o) {
    const t = Ka[Za[o]],
      n = t.steps ? t.steps : Number.MAX_SAFE_INTEGER;
    if (t.common && Math.ceil((i - e) / (n * t.size)) <= s) return Za[o];
  }
  return Za[n - 1];
}
function ir(t, e, i) {
  if (i) {
    if (i.length) {
      const { lo: s, hi: n } = ae(i, e);
      t[i[s] >= e ? i[s] : i[n]] = !0;
    }
  } else t[e] = !0;
}
function sr(t, e, i) {
  const s = [],
    n = {},
    o = e.length;
  let a, r;
  for (a = 0; a < o; ++a)
    (r = e[a]), (n[r] = a), s.push({ value: r, major: !1 });
  return 0 !== o && i
    ? (function (t, e, i, s) {
        const n = t._adapter,
          o = +n.startOf(e[0].value, s),
          a = e[e.length - 1].value;
        let r, l;
        for (r = o; r <= a; r = +n.add(r, 1, s))
          (l = i[r]), l >= 0 && (e[l].major = !0);
        return e;
      })(t, s, n, i)
    : s;
}
class nr extends In {
  static id = "time";
  static defaults = {
    bounds: "data",
    adapters: {},
    time: {
      parser: !1,
      unit: !1,
      round: !1,
      isoWeekday: !1,
      minUnit: "millisecond",
      displayFormats: {},
    },
    ticks: { source: "auto", callback: !1, major: { enabled: !1 } },
  };
  constructor(t) {
    super(t),
      (this._cache = { data: [], labels: [], all: [] }),
      (this._unit = "day"),
      (this._majorUnit = void 0),
      (this._offsets = {}),
      (this._normalized = !1),
      (this._parseOpts = void 0);
  }
  init(t, e = {}) {
    const i = t.time || (t.time = {}),
      s = (this._adapter = new Bs(t.adapters.date));
    s.init(e),
      St(i.displayFormats, s.formats()),
      (this._parseOpts = {
        parser: i.parser,
        round: i.round,
        isoWeekday: i.isoWeekday,
      }),
      super.init(t),
      (this._normalized = e.normalized);
  }
  parse(t, e) {
    return void 0 === t ? null : tr(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), (this._cache = { data: [], labels: [], all: [] });
  }
  determineDataLimits() {
    const t = this.options,
      e = this._adapter,
      i = t.time.unit || "day";
    let { min: s, max: n, minDefined: o, maxDefined: a } = this.getUserBounds();
    function r(t) {
      o || isNaN(t.min) || (s = Math.min(s, t.min)),
        a || isNaN(t.max) || (n = Math.max(n, t.max));
    }
    (o && a) ||
      (r(this._getLabelBounds()),
      ("ticks" === t.bounds && "labels" === t.ticks.source) ||
        r(this.getMinMax(!1))),
      (s = pt(s) && !isNaN(s) ? s : +e.startOf(Date.now(), i)),
      (n = pt(n) && !isNaN(n) ? n : +e.endOf(Date.now(), i) + 1),
      (this.min = Math.min(s, n - 1)),
      (this.max = Math.max(s + 1, n));
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let e = Number.POSITIVE_INFINITY,
      i = Number.NEGATIVE_INFINITY;
    return t.length && ((e = t[0]), (i = t[t.length - 1])), { min: e, max: i };
  }
  buildTicks() {
    const t = this.options,
      e = t.time,
      i = t.ticks,
      s = "labels" === i.source ? this.getLabelTimestamps() : this._generate();
    "ticks" === t.bounds &&
      s.length &&
      ((this.min = this._userMin || s[0]),
      (this.max = this._userMax || s[s.length - 1]));
    const n = this.min,
      o = he(s, n, this.max);
    return (
      (this._unit =
        e.unit ||
        (i.autoSkip
          ? er(e.minUnit, this.min, this.max, this._getLabelCapacity(n))
          : (function (t, e, i, s, n) {
              for (let o = Za.length - 1; o >= Za.indexOf(i); o--) {
                const i = Za[o];
                if (Ka[i].common && t._adapter.diff(n, s, i) >= e - 1) return i;
              }
              return Za[i ? Za.indexOf(i) : 0];
            })(this, o.length, e.minUnit, this.min, this.max))),
      (this._majorUnit =
        i.major.enabled && "year" !== this._unit
          ? (function (t) {
              for (let e = Za.indexOf(t) + 1, i = Za.length; e < i; ++e)
                if (Ka[Za[e]].common) return Za[e];
            })(this._unit)
          : void 0),
      this.initOffsets(s),
      t.reverse && o.reverse(),
      sr(this, o, this._majorUnit)
    );
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip &&
      this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let e,
      i,
      s = 0,
      n = 0;
    this.options.offset &&
      t.length &&
      ((e = this.getDecimalForValue(t[0])),
      (s = 1 === t.length ? 1 - e : (this.getDecimalForValue(t[1]) - e) / 2),
      (i = this.getDecimalForValue(t[t.length - 1])),
      (n =
        1 === t.length
          ? i
          : (i - this.getDecimalForValue(t[t.length - 2])) / 2));
    const o = t.length < 3 ? 0.5 : 0.25;
    (s = ne(s, 0, o)),
      (n = ne(n, 0, o)),
      (this._offsets = { start: s, end: n, factor: 1 / (s + 1 + n) });
  }
  _generate() {
    const t = this._adapter,
      e = this.min,
      i = this.max,
      s = this.options,
      n = s.time,
      o = n.unit || er(n.minUnit, e, i, this._getLabelCapacity(e)),
      a = mt(s.ticks.stepSize, 1),
      r = "week" === o && n.isoWeekday,
      l = Xt(r) || !0 === r,
      h = {};
    let c,
      d,
      u = e;
    if (
      (l && (u = +t.startOf(u, "isoWeek", r)),
      (u = +t.startOf(u, l ? "day" : o)),
      t.diff(i, e, o) > 1e5 * a)
    )
      throw new Error(
        e + " and " + i + " are too far apart with stepSize of " + a + " " + o
      );
    const f = "data" === s.ticks.source && this.getDataTimestamps();
    for (c = u, d = 0; c < i; c = +t.add(c, a, o), d++) ir(h, c, f);
    return (
      (c !== i && "ticks" !== s.bounds && 1 !== d) || ir(h, c, f),
      Object.keys(h)
        .sort((t, e) => t - e)
        .map((t) => +t)
    );
  }
  getLabelForValue(t) {
    const e = this._adapter,
      i = this.options.time;
    return i.tooltipFormat
      ? e.format(t, i.tooltipFormat)
      : e.format(t, i.displayFormats.datetime);
  }
  format(t, e) {
    const i = this.options.time.displayFormats,
      s = this._unit,
      n = e || i[s];
    return this._adapter.format(t, n);
  }
  _tickFormatFunction(t, e, i, s) {
    const n = this.options,
      o = n.ticks.callback;
    if (o) return xt(o, [t, e, i], this);
    const a = n.time.displayFormats,
      r = this._unit,
      l = this._majorUnit,
      h = r && a[r],
      c = l && a[l],
      d = i[e],
      u = l && c && d && d.major;
    return this._adapter.format(t, s || (u ? c : h));
  }
  generateTickLabels(t) {
    let e, i, s;
    for (e = 0, i = t.length; e < i; ++e)
      (s = t[e]), (s.label = this._tickFormatFunction(s.value, e, t));
  }
  getDecimalForValue(t) {
    return null === t ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const e = this._offsets,
      i = this.getDecimalForValue(t);
    return this.getPixelForDecimal((e.start + i) * e.factor);
  }
  getValueForPixel(t) {
    const e = this._offsets,
      i = this.getDecimalForPixel(t) / e.factor - e.end;
    return this.min + i * (this.max - this.min);
  }
  _getLabelSize(t) {
    const e = this.options.ticks,
      i = this.ctx.measureText(t).width,
      s = Jt(this.isHorizontal() ? e.maxRotation : e.minRotation),
      n = Math.cos(s),
      o = Math.sin(s),
      a = this._resolveTickFontOptions(0).size;
    return { w: i * n + a * o, h: i * o + a * n };
  }
  _getLabelCapacity(t) {
    const e = this.options.time,
      i = e.displayFormats,
      s = i[e.unit] || i.millisecond,
      n = this._tickFormatFunction(t, 0, sr(this, [t], this._majorUnit), s),
      o = this._getLabelSize(n),
      a =
        Math.floor(this.isHorizontal() ? this.width / o.w : this.height / o.h) -
        1;
    return a > 0 ? a : 1;
  }
  getDataTimestamps() {
    let t,
      e,
      i = this._cache.data || [];
    if (i.length) return i;
    const s = this.getMatchingVisibleMetas();
    if (this._normalized && s.length)
      return (this._cache.data = s[0].controller.getAllParsedValues(this));
    for (t = 0, e = s.length; t < e; ++t)
      i = i.concat(s[t].controller.getAllParsedValues(this));
    return (this._cache.data = this.normalize(i));
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let e, i;
    if (t.length) return t;
    const s = this.getLabels();
    for (e = 0, i = s.length; e < i; ++e) t.push(tr(this, s[e]));
    return (this._cache.labels = this._normalized ? t : this.normalize(t));
  }
  normalize(t) {
    return ue(t.sort(Qa));
  }
}
function or(t, e, i) {
  let s,
    n,
    o,
    a,
    r = 0,
    l = t.length - 1;
  i
    ? (e >= t[r].pos && e <= t[l].pos && ({ lo: r, hi: l } = re(t, "pos", e)),
      ({ pos: s, time: o } = t[r]),
      ({ pos: n, time: a } = t[l]))
    : (e >= t[r].time &&
        e <= t[l].time &&
        ({ lo: r, hi: l } = re(t, "time", e)),
      ({ time: s, pos: o } = t[r]),
      ({ time: n, pos: a } = t[l]));
  const h = n - s;
  return h ? o + ((a - o) * (e - s)) / h : o;
}
const ar = [
  Fs,
  Ao,
  Ta,
  Object.freeze({
    __proto__: null,
    CategoryScale: class extends In {
      static id = "category";
      static defaults = { ticks: { callback: La } };
      constructor(t) {
        super(t),
          (this._startValue = void 0),
          (this._valueRange = 0),
          (this._addedLabels = []);
      }
      init(t) {
        const e = this._addedLabels;
        if (e.length) {
          const t = this.getLabels();
          for (const { index: i, label: s } of e) t[i] === s && t.splice(i, 1);
          this._addedLabels = [];
        }
        super.init(t);
      }
      parse(t, e) {
        if (dt(t)) return null;
        const i = this.getLabels();
        return (
          (e =
            isFinite(e) && i[e] === t
              ? e
              : (function (t, e, i, s) {
                  const n = t.indexOf(e);
                  return -1 === n
                    ? Oa(t, e, i, s)
                    : n !== t.lastIndexOf(e)
                    ? i
                    : n;
                })(i, t, mt(e, t), this._addedLabels)),
          ((t, e) => (null === t ? null : ne(Math.round(t), 0, e)))(
            e,
            i.length - 1
          )
        );
      }
      determineDataLimits() {
        const { minDefined: t, maxDefined: e } = this.getUserBounds();
        let { min: i, max: s } = this.getMinMax(!0);
        "ticks" === this.options.bounds &&
          (t || (i = 0), e || (s = this.getLabels().length - 1)),
          (this.min = i),
          (this.max = s);
      }
      buildTicks() {
        const t = this.min,
          e = this.max,
          i = this.options.offset,
          s = [];
        let n = this.getLabels();
        (n = 0 === t && e === n.length - 1 ? n : n.slice(t, e + 1)),
          (this._valueRange = Math.max(n.length - (i ? 0 : 1), 1)),
          (this._startValue = this.min - (i ? 0.5 : 0));
        for (let i = t; i <= e; i++) s.push({ value: i });
        return s;
      }
      getLabelForValue(t) {
        return La.call(this, t);
      }
      configure() {
        super.configure(),
          this.isHorizontal() || (this._reversePixels = !this._reversePixels);
      }
      getPixelForValue(t) {
        return (
          "number" != typeof t && (t = this.parse(t)),
          null === t
            ? NaN
            : this.getPixelForDecimal((t - this._startValue) / this._valueRange)
        );
      }
      getPixelForTick(t) {
        const e = this.ticks;
        return t < 0 || t > e.length - 1
          ? null
          : this.getPixelForValue(e[t].value);
      }
      getValueForPixel(t) {
        return Math.round(
          this._startValue + this.getDecimalForPixel(t) * this._valueRange
        );
      }
      getBasePixel() {
        return this.bottom;
      }
    },
    LinearScale: $a,
    LogarithmicScale: Va,
    RadialLinearScale: Ja,
    TimeScale: nr,
    TimeSeriesScale: class extends nr {
      static id = "timeseries";
      static defaults = nr.defaults;
      constructor(t) {
        super(t),
          (this._table = []),
          (this._minPos = void 0),
          (this._tableRange = void 0);
      }
      initOffsets() {
        const t = this._getTimestampsForTable(),
          e = (this._table = this.buildLookupTable(t));
        (this._minPos = or(e, this.min)),
          (this._tableRange = or(e, this.max) - this._minPos),
          super.initOffsets(t);
      }
      buildLookupTable(t) {
        const { min: e, max: i } = this,
          s = [],
          n = [];
        let o, a, r, l, h;
        for (o = 0, a = t.length; o < a; ++o)
          (l = t[o]), l >= e && l <= i && s.push(l);
        if (s.length < 2)
          return [
            { time: e, pos: 0 },
            { time: i, pos: 1 },
          ];
        for (o = 0, a = s.length; o < a; ++o)
          (h = s[o + 1]),
            (r = s[o - 1]),
            (l = s[o]),
            Math.round((h + r) / 2) !== l &&
              n.push({ time: l, pos: o / (a - 1) });
        return n;
      }
      _getTimestampsForTable() {
        let t = this._cache.all || [];
        if (t.length) return t;
        const e = this.getDataTimestamps(),
          i = this.getLabelTimestamps();
        return (
          (t =
            e.length && i.length
              ? this.normalize(e.concat(i))
              : e.length
              ? e
              : i),
          (t = this._cache.all = t),
          t
        );
      }
      getDecimalForValue(t) {
        return (or(this._table, t) - this._minPos) / this._tableRange;
      }
      getValueForPixel(t) {
        const e = this._offsets,
          i = this.getDecimalForPixel(t) / e.factor - e.end;
        return or(this._table, i * this._tableRange + this._minPos, !0);
      }
    },
  }),
];
ho.register(...ar);
/*!
 * chartjs-plugin-annotation v2.1.2
 * https://www.chartjs.org/chartjs-plugin-annotation/index
 * (c) 2023 chartjs-plugin-annotation Contributors
 * Released under the MIT License
 */
const rr = {
  modes: {
    point: (t, e) => hr(t, e, { intersect: !0 }),
    nearest: (t, e, i) =>
      (function (t, e, i) {
        let s = Number.POSITIVE_INFINITY;
        return hr(t, e, i)
          .reduce((t, n) => {
            const o = n.getCenterPoint(),
              a = (function (t, e, i) {
                if ("x" === i) return { x: t.x, y: e.y };
                if ("y" === i) return { x: e.x, y: t.y };
                return e;
              })(e, o, i.axis),
              r = (0, $50e8ddfc489f09fc$exports.distanceBetweenPoints)(e, a);
            return r < s ? ((t = [n]), (s = r)) : r === s && t.push(n), t;
          }, [])
          .sort((t, e) => t._index - e._index)
          .slice(0, 1);
      })(t, e, i),
    x: (t, e, i) => hr(t, e, { intersect: i.intersect, axis: "x" }),
    y: (t, e, i) => hr(t, e, { intersect: i.intersect, axis: "y" }),
  },
};
function lr(t, e, i) {
  return (rr.modes[i.mode] || rr.modes.nearest)(t, e, i);
}
function hr(t, e, i) {
  return t.visibleElements.filter((t) =>
    i.intersect
      ? t.inRange(e.x, e.y)
      : (function (t, e, i) {
          return "x" !== i && "y" !== i
            ? t.inRange(e.x, e.y, "x", !0) || t.inRange(e.x, e.y, "y", !0)
            : t.inRange(e.x, e.y, i, !0);
        })(t, e, i.axis)
  );
}
const cr = ["enter", "leave"],
  dr = cr.concat("click");
function ur(t, e, i) {
  if (t.listened)
    switch (e.type) {
      case "mousemove":
      case "mouseout":
        return (function (t, e, i) {
          if (!t.moveListened) return;
          let s;
          s = "mousemove" === e.type ? lr(t, e, i.interaction) : [];
          const n = t.hovered;
          t.hovered = s;
          const o = { state: t, event: e };
          let a = fr(o, "leave", n, s);
          return fr(o, "enter", s, n) || a;
        })(t, e, i);
      case "click":
        return (function (t, e, i) {
          const s = t.listeners,
            n = lr(t, e, i.interaction);
          let o;
          for (const t of n) o = pr(t.options.click || s.click, t, e) || o;
          return o;
        })(t, e, i);
    }
}
function fr({ state: t, event: e }, i, s, n) {
  let o;
  for (const a of s)
    n.indexOf(a) < 0 && (o = pr(a.options[i] || t.listeners[i], a, e) || o);
  return o;
}
function pr(t, e, i) {
  return !0 === (0, $50e8ddfc489f09fc$exports.callback)(t, [e.$context, i]);
}
const gr = (t, e) =>
    e > t || (t.length > e.length && t.slice(0, e.length) === e),
  mr = 0.001,
  br = (t, e, i) => Math.min(i, Math.max(e, t));
function xr(t, e, i) {
  for (const s of Object.keys(t)) t[s] = br(t[s], e, i);
  return t;
}
function yr(t, { x: e, y: i, x2: s, y2: n }, o, a) {
  const r = a / 2,
    l = t.x >= e - r - mr && t.x <= s + r + mr,
    h = t.y >= i - r - mr && t.y <= n + r + mr;
  return "x" === o ? l : ("y" === o || l) && h;
}
function _r(t, e) {
  const { centerX: i, centerY: s } = t.getProps(["centerX", "centerY"], e);
  return { x: i, y: s };
}
const vr = (t) => "string" == typeof t && t.endsWith("%"),
  wr = (t) => br(parseFloat(t) / 100, 0, 1);
function Mr(t, e) {
  return "start" === e ? 0 : "end" === e ? t : vr(e) ? wr(e) * t : t / 2;
}
function kr(t, e) {
  return "number" == typeof e ? e : vr(e) ? wr(e) * t : t;
}
function Sr(t) {
  return (0, $50e8ddfc489f09fc$exports.isObject)(t)
    ? {
        x: (0, $50e8ddfc489f09fc$exports.valueOrDefault)(t.x, "center"),
        y: (0, $50e8ddfc489f09fc$exports.valueOrDefault)(t.y, "center"),
      }
    : {
        x: (t = (0, $50e8ddfc489f09fc$exports.valueOrDefault)(t, "center")),
        y: t,
      };
}
function Pr(t) {
  return (
    t &&
    ((0, $50e8ddfc489f09fc$exports.defined)(t.xValue) ||
      (0, $50e8ddfc489f09fc$exports.defined)(t.yValue))
  );
}
const Cr = new Map();
function Dr(t) {
  if (t && "object" == typeof t) {
    const e = t.toString();
    return (
      "[object HTMLImageElement]" === e || "[object HTMLCanvasElement]" === e
    );
  }
}
function Tr(t, { x: e, y: i }, s) {
  s &&
    (t.translate(e, i),
    t.rotate((0, $50e8ddfc489f09fc$exports.toRadians)(s)),
    t.translate(-e, -i));
}
function Or(t, e) {
  if (e && e.borderWidth)
    return (
      (t.lineCap = e.borderCapStyle),
      t.setLineDash(e.borderDash),
      (t.lineDashOffset = e.borderDashOffset),
      (t.lineJoin = e.borderJoinStyle),
      (t.lineWidth = e.borderWidth),
      (t.strokeStyle = e.borderColor),
      !0
    );
}
function Lr(t, e) {
  (t.shadowColor = e.backgroundShadowColor),
    (t.shadowBlur = e.shadowBlur),
    (t.shadowOffsetX = e.shadowOffsetX),
    (t.shadowOffsetY = e.shadowOffsetY);
}
function Ar(t, e) {
  const i = e.content;
  if (Dr(i))
    return { width: kr(i.width, e.width), height: kr(i.height, e.height) };
  const s = (0, $50e8ddfc489f09fc$exports.toFont)(e.font),
    n = e.textStrokeWidth,
    o = (0, $50e8ddfc489f09fc$exports.isArray)(i) ? i : [i],
    a = o.join() + s.string + n + (t._measureText ? "-spriting" : "");
  if (!Cr.has(a)) {
    t.save(), (t.font = s.string);
    const e = o.length;
    let i = 0;
    for (let s = 0; s < e; s++) {
      const e = o[s];
      i = Math.max(i, t.measureText(e).width + n);
    }
    t.restore();
    const r = e * s.lineHeight + n;
    Cr.set(a, { width: i, height: r });
  }
  return Cr.get(a);
}
function Er(t, e, i) {
  const { x: s, y: n, width: o, height: a } = e;
  t.save(), Lr(t, i);
  const r = Or(t, i);
  (t.fillStyle = i.backgroundColor),
    t.beginPath(),
    (0, $50e8ddfc489f09fc$exports.addRoundedRectPath)(t, {
      x: s,
      y: n,
      w: o,
      h: a,
      radius: xr(
        (0, $50e8ddfc489f09fc$exports.toTRBLCorners)(i.borderRadius),
        0,
        Math.min(o, a) / 2
      ),
    }),
    t.closePath(),
    t.fill(),
    r && ((t.shadowColor = i.borderShadowColor), t.stroke()),
    t.restore();
}
function Rr(t, e, i) {
  return (
    (e = "number" == typeof e ? e : t.parse(e)),
    (0, $50e8ddfc489f09fc$exports.isFinite)(e) ? t.getPixelForValue(e) : i
  );
}
function $r(t, e, i) {
  const s = e[i];
  if (s || "scaleID" === i) return s;
  const n = i.charAt(0),
    o = Object.values(t).filter((t) => t.axis && t.axis === n);
  return o.length ? o[0].id : n;
}
function Ir(t, e) {
  if (t) {
    const i = t.options.reverse;
    return {
      start: Rr(t, e.min, i ? e.end : e.start),
      end: Rr(t, e.max, i ? e.start : e.end),
    };
  }
}
function Fr(t, e) {
  const { chartArea: i, scales: s } = t,
    n = s[$r(s, e, "xScaleID")],
    o = s[$r(s, e, "yScaleID")];
  let a = i.width / 2,
    r = i.height / 2;
  return (
    n && (a = Rr(n, e.xValue, n.left + n.width / 2)),
    o && (r = Rr(o, e.yValue, o.top + o.height / 2)),
    { x: a, y: r }
  );
}
function Hr(t, e) {
  const i = t.scales,
    s = i[$r(i, e, "xScaleID")],
    n = i[$r(i, e, "yScaleID")];
  if (!s && !n) return {};
  let { left: o, right: a } = s || t.chartArea,
    { top: r, bottom: l } = n || t.chartArea;
  const h = Vr(s, { min: e.xMin, max: e.xMax, start: o, end: a });
  (o = h.start), (a = h.end);
  const c = Vr(n, { min: e.yMin, max: e.yMax, start: l, end: r });
  return (
    (r = c.start),
    (l = c.end),
    {
      x: o,
      y: r,
      x2: a,
      y2: l,
      width: a - o,
      height: l - r,
      centerX: o + (a - o) / 2,
      centerY: r + (l - r) / 2,
    }
  );
}
function zr(t, e) {
  if (!Pr(e)) {
    const i = Hr(t, e);
    let s = e.radius;
    (s && !isNaN(s)) || ((s = Math.min(i.width, i.height) / 2), (e.radius = s));
    const n = 2 * s;
    return {
      x: i.x + e.xAdjust,
      y: i.y + e.yAdjust,
      x2: i.x + n + e.xAdjust,
      y2: i.y + n + e.yAdjust,
      centerX: i.centerX + e.xAdjust,
      centerY: i.centerY + e.yAdjust,
      width: n,
      height: n,
    };
  }
  return (function (t, e) {
    const i = Fr(t, e),
      s = 2 * e.radius;
    return {
      x: i.x - e.radius + e.xAdjust,
      y: i.y - e.radius + e.yAdjust,
      x2: i.x + e.radius + e.xAdjust,
      y2: i.y + e.radius + e.yAdjust,
      centerX: i.x + e.xAdjust,
      centerY: i.y + e.yAdjust,
      width: s,
      height: s,
    };
  })(t, e);
}
function Br(t, e) {
  const i = Hr(t, e),
    { x: s, y: n } = i;
  return (
    (i.elements = [
      { type: "label", optionScope: "label", properties: jr(t, i, e) },
    ]),
    (i.initProperties = { x: s, y: n }),
    i
  );
}
function Vr(t, e) {
  const i = Ir(t, e) || e;
  return { start: Math.min(i.start, i.end), end: Math.max(i.start, i.end) };
}
function Wr(t, e) {
  const { start: i, end: s, borderWidth: n } = t,
    {
      position: o,
      padding: { start: a, end: r },
      adjust: l,
    } = e;
  return i + n / 2 + l + Mr(s - n - i - a - r - e.size, o);
}
function jr(t, e, i) {
  const s = i.label;
  (s.backgroundColor = "transparent"), (s.callout.display = !1);
  const n = Sr(s.position),
    o = (0, $50e8ddfc489f09fc$exports.toPadding)(s.padding),
    a = Ar(t.ctx, s),
    r = (function ({ properties: t, options: e }, i, s, n) {
      const { x: o, x2: a, width: r } = t;
      return Wr(
        { start: o, end: a, size: r, borderWidth: e.borderWidth },
        {
          position: s.x,
          padding: { start: n.left, end: n.right },
          adjust: e.label.xAdjust,
          size: i.width,
        }
      );
    })({ properties: e, options: i }, a, n, o),
    l = (function ({ properties: t, options: e }, i, s, n) {
      const { y: o, y2: a, height: r } = t;
      return Wr(
        { start: o, end: a, size: r, borderWidth: e.borderWidth },
        {
          position: s.y,
          padding: { start: n.top, end: n.bottom },
          adjust: e.label.yAdjust,
          size: i.height,
        }
      );
    })({ properties: e, options: i }, a, n, o),
    h = a.width + o.width,
    c = a.height + o.height;
  return {
    x: r,
    y: l,
    x2: r + h,
    y2: l + c,
    width: h,
    height: c,
    centerX: r + h / 2,
    centerY: l + c / 2,
    rotation: s.rotation,
  };
}
function Nr(t, e, i) {
  const s = Math.cos(i),
    n = Math.sin(i),
    o = e.x,
    a = e.y;
  return {
    x: o + s * (t.x - o) - n * (t.y - a),
    y: a + n * (t.x - o) + s * (t.y - a),
  };
}
function qr(t, e, i) {
  const s = (function (t, e, i) {
    const s = e.axis,
      n = e.id,
      o = s + "ScaleID",
      a = {
        min: (0, $50e8ddfc489f09fc$exports.valueOrDefault)(
          e.min,
          Number.NEGATIVE_INFINITY
        ),
        max: (0, $50e8ddfc489f09fc$exports.valueOrDefault)(
          e.max,
          Number.POSITIVE_INFINITY
        ),
      };
    for (const r of i)
      r.scaleID === n
        ? Gr(r, e, ["value", "endValue"], a)
        : $r(t, r, o) === n && Gr(r, e, [s + "Min", s + "Max", s + "Value"], a);
    return a;
  })(t.scales, e, i);
  let n = Yr(e, s, "min", "suggestedMin");
  (n = Yr(e, s, "max", "suggestedMax") || n),
    n &&
      "function" == typeof e.handleTickRangeOptions &&
      e.handleTickRangeOptions();
}
function Yr(t, e, i, s) {
  if (
    (0, $50e8ddfc489f09fc$exports.isFinite)(e[i]) &&
    !(function (t, e, i) {
      return (
        (0, $50e8ddfc489f09fc$exports.defined)(t[e]) ||
        (0, $50e8ddfc489f09fc$exports.defined)(t[i])
      );
    })(t.options, i, s)
  ) {
    const s = t[i] !== e[i];
    return (t[i] = e[i]), s;
  }
}
function Xr(t, e) {
  for (const i of ["scaleID", "xScaleID", "yScaleID"]) {
    const s = $r(e, t, i);
    s &&
      !e[s] &&
      Ur(t, i) &&
      console.warn(`No scale found with id '${s}' for annotation '${t.id}'`);
  }
}
function Ur(t, e) {
  if ("scaleID" === e) return !0;
  const i = e.charAt(0);
  for (const e of ["Min", "Max", "Value"])
    if ((0, $50e8ddfc489f09fc$exports.defined)(t[i + e])) return !0;
  return !1;
}
function Gr(t, e, i, s) {
  for (const n of i) {
    const i = t[n];
    if ((0, $50e8ddfc489f09fc$exports.defined)(i)) {
      const t = e.parse(i);
      (s.min = Math.min(s.min, t)), (s.max = Math.max(s.max, t));
    }
  }
}
class Jr extends Sn {
  inRange(t, e, i, s) {
    const { x: n, y: o } = Nr(
      { x: t, y: e },
      this.getCenterPoint(s),
      (0, $50e8ddfc489f09fc$exports.toRadians)(-this.options.rotation)
    );
    return yr(
      { x: n, y: o },
      this.getProps(["x", "y", "x2", "y2"], s),
      i,
      this.options.borderWidth
    );
  }
  getCenterPoint(t) {
    return _r(this, t);
  }
  draw(t) {
    t.save(),
      Tr(t, this.getCenterPoint(), this.options.rotation),
      Er(t, this, this.options),
      t.restore();
  }
  get label() {
    return this.elements && this.elements[0];
  }
  resolveElementProperties(t, e) {
    return Br(t, e);
  }
}
(Jr.id = "boxAnnotation"),
  (Jr.defaults = {
    adjustScaleRange: !0,
    backgroundShadowColor: "transparent",
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: "miter",
    borderRadius: 0,
    borderShadowColor: "transparent",
    borderWidth: 1,
    display: !0,
    label: {
      backgroundColor: "transparent",
      borderWidth: 0,
      callout: { display: !1 },
      color: "black",
      content: null,
      display: !1,
      drawTime: void 0,
      font: {
        family: void 0,
        lineHeight: void 0,
        size: void 0,
        style: void 0,
        weight: "bold",
      },
      height: void 0,
      padding: 6,
      position: "center",
      rotation: void 0,
      textAlign: "start",
      textStrokeColor: void 0,
      textStrokeWidth: 0,
      width: void 0,
      xAdjust: 0,
      yAdjust: 0,
      z: void 0,
    },
    rotation: 0,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    xMax: void 0,
    xMin: void 0,
    xScaleID: void 0,
    yMax: void 0,
    yMin: void 0,
    yScaleID: void 0,
    z: 0,
  }),
  (Jr.defaultRoutes = { borderColor: "color", backgroundColor: "color" }),
  (Jr.descriptors = { label: { _fallback: !0 } });
const Kr = ["left", "bottom", "top", "right"];
class Zr extends Sn {
  inRange(t, e, i, s) {
    const { x: n, y: o } = Nr(
      { x: t, y: e },
      this.getCenterPoint(s),
      (0, $50e8ddfc489f09fc$exports.toRadians)(-this.rotation)
    );
    return yr(
      { x: n, y: o },
      this.getProps(["x", "y", "x2", "y2"], s),
      i,
      this.options.borderWidth
    );
  }
  getCenterPoint(t) {
    return _r(this, t);
  }
  draw(t) {
    const e = this.options,
      i =
        !(0, $50e8ddfc489f09fc$exports.defined)(this._visible) || this._visible;
    e.display &&
      e.content &&
      i &&
      (t.save(),
      Tr(t, this.getCenterPoint(), this.rotation),
      (function (t, e) {
        const { pointX: i, pointY: s, options: n } = e,
          o = n.callout,
          a =
            o &&
            o.display &&
            (function (t, e) {
              const i = e.position;
              return Kr.includes(i)
                ? i
                : (function (t, e) {
                    const {
                        x: i,
                        y: s,
                        x2: n,
                        y2: o,
                        width: a,
                        height: r,
                        pointX: l,
                        pointY: h,
                        centerX: c,
                        centerY: d,
                        rotation: u,
                      } = t,
                      f = { x: c, y: d },
                      p = e.start,
                      g = kr(a, p),
                      m = kr(r, p),
                      b = [i, i + g, i + g, n],
                      x = [s + m, o, s, o],
                      y = [];
                    for (let t = 0; t < 4; t++) {
                      const e = Nr(
                        { x: b[t], y: x[t] },
                        f,
                        (0, $50e8ddfc489f09fc$exports.toRadians)(u)
                      );
                      y.push({
                        position: Kr[t],
                        distance: (0,
                        $50e8ddfc489f09fc$exports.distanceBetweenPoints)(e, {
                          x: l,
                          y: h,
                        }),
                      });
                    }
                    return y.sort((t, e) => t.distance - e.distance)[0]
                      .position;
                  })(t, e);
            })(e, o);
        if (
          !a ||
          (function (t, e, i) {
            const { pointX: s, pointY: n } = t,
              o = e.margin;
            let a = s,
              r = n;
            "left" === i
              ? (a += o)
              : "right" === i
              ? (a -= o)
              : "top" === i
              ? (r += o)
              : "bottom" === i && (r -= o);
            return t.inRange(a, r);
          })(e, o, a)
        )
          return;
        t.save(), t.beginPath();
        const r = Or(t, o);
        if (!r) return t.restore();
        const { separatorStart: l, separatorEnd: h } = (function (t, e) {
            const { x: i, y: s, x2: n, y2: o } = t,
              a = (function (t, e) {
                const { width: i, height: s, options: n } = t,
                  o = n.callout.margin + n.borderWidth / 2;
                if ("right" === e) return i + o;
                if ("bottom" === e) return s + o;
                return -o;
              })(t, e);
            let r, l;
            "left" === e || "right" === e
              ? ((r = { x: i + a, y: s }), (l = { x: r.x, y: o }))
              : ((r = { x: i, y: s + a }), (l = { x: n, y: r.y }));
            return { separatorStart: r, separatorEnd: l };
          })(e, a),
          { sideStart: c, sideEnd: d } = (function (t, e, i) {
            const { y: s, width: n, height: o, options: a } = t,
              r = a.callout.start,
              l = (function (t, e) {
                const i = e.side;
                return "left" === t || "top" === t ? -i : i;
              })(e, a.callout);
            let h, c;
            "left" === e || "right" === e
              ? ((h = { x: i.x, y: s + kr(o, r) }),
                (c = { x: h.x + l, y: h.y }))
              : ((h = { x: i.x + kr(n, r), y: i.y }),
                (c = { x: h.x, y: h.y + l }));
            return { sideStart: h, sideEnd: c };
          })(e, a, l);
        (o.margin > 0 || 0 === n.borderWidth) &&
          (t.moveTo(l.x, l.y), t.lineTo(h.x, h.y));
        t.moveTo(c.x, c.y), t.lineTo(d.x, d.y);
        const u = Nr(
          { x: i, y: s },
          e.getCenterPoint(),
          (0, $50e8ddfc489f09fc$exports.toRadians)(-e.rotation)
        );
        t.lineTo(u.x, u.y), t.stroke(), t.restore();
      })(t, this),
      Er(t, this, e),
      (function (t, e, i) {
        const s = i.content;
        if (Dr(s)) return void t.drawImage(s, e.x, e.y, e.width, e.height);
        const n = (0, $50e8ddfc489f09fc$exports.isArray)(s) ? s : [s],
          o = (0, $50e8ddfc489f09fc$exports.toFont)(i.font),
          a = o.lineHeight,
          r = (function (t, e) {
            const { x: i, width: s } = t,
              n = e.textAlign;
            return "center" === n
              ? i + s / 2
              : "end" === n || "right" === n
              ? i + s
              : i;
          })(e, i),
          l = e.y + a / 2 + i.textStrokeWidth / 2;
        t.save(),
          (t.font = o.string),
          (t.textBaseline = "middle"),
          (t.textAlign = i.textAlign),
          (function (t, e) {
            if (e.textStrokeWidth > 0)
              return (
                (t.lineJoin = "round"),
                (t.miterLimit = 2),
                (t.lineWidth = e.textStrokeWidth),
                (t.strokeStyle = e.textStrokeColor),
                !0
              );
          })(t, i) && n.forEach((e, i) => t.strokeText(e, r, l + i * a)),
          (t.fillStyle = i.color),
          n.forEach((e, i) => t.fillText(e, r, l + i * a)),
          t.restore();
      })(
        t,
        (function ({ x: t, y: e, width: i, height: s, options: n }) {
          const o = n.borderWidth / 2,
            a = (0, $50e8ddfc489f09fc$exports.toPadding)(n.padding);
          return {
            x: t + a.left + o,
            y: e + a.top + o,
            width: i - a.left - a.right - n.borderWidth,
            height: s - a.top - a.bottom - n.borderWidth,
          };
        })(this),
        e
      ),
      t.restore());
  }
  resolveElementProperties(t, e) {
    let i;
    if (Pr(e)) i = Fr(t, e);
    else {
      const { centerX: s, centerY: n } = Hr(t, e);
      i = { x: s, y: n };
    }
    const s = (0, $50e8ddfc489f09fc$exports.toPadding)(e.padding),
      n = (function (t, e, i, s) {
        const n = e.width + s.width + i.borderWidth,
          o = e.height + s.height + i.borderWidth,
          a = Sr(i.position),
          r = Qr(t.x, n, i.xAdjust, a.x),
          l = Qr(t.y, o, i.yAdjust, a.y);
        return {
          x: r,
          y: l,
          x2: r + n,
          y2: l + o,
          width: n,
          height: o,
          centerX: r + n / 2,
          centerY: l + o / 2,
        };
      })(i, Ar(t.ctx, e), e, s);
    return { pointX: i.x, pointY: i.y, ...n, rotation: e.rotation };
  }
}
function Qr(t, e, i = 0, s) {
  return t - Mr(e, s) + i;
}
(Zr.id = "labelAnnotation"),
  (Zr.defaults = {
    adjustScaleRange: !0,
    backgroundColor: "transparent",
    backgroundShadowColor: "transparent",
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: "miter",
    borderRadius: 0,
    borderShadowColor: "transparent",
    borderWidth: 0,
    callout: {
      borderCapStyle: "butt",
      borderColor: void 0,
      borderDash: [],
      borderDashOffset: 0,
      borderJoinStyle: "miter",
      borderWidth: 1,
      display: !1,
      margin: 5,
      position: "auto",
      side: 5,
      start: "50%",
    },
    color: "black",
    content: null,
    display: !0,
    font: {
      family: void 0,
      lineHeight: void 0,
      size: void 0,
      style: void 0,
      weight: void 0,
    },
    height: void 0,
    padding: 6,
    position: "center",
    rotation: 0,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textAlign: "center",
    textStrokeColor: void 0,
    textStrokeWidth: 0,
    width: void 0,
    xAdjust: 0,
    xMax: void 0,
    xMin: void 0,
    xScaleID: void 0,
    xValue: void 0,
    yAdjust: 0,
    yMax: void 0,
    yMin: void 0,
    yScaleID: void 0,
    yValue: void 0,
    z: 0,
  }),
  (Zr.defaultRoutes = { borderColor: "color" });
const tl = (t, e, i) => ({
    x: t.x + i * (e.x - t.x),
    y: t.y + i * (e.y - t.y),
  }),
  el = (t, e, i) => tl(e, i, Math.abs((t - e.y) / (i.y - e.y))).x,
  il = (t, e, i) => tl(e, i, Math.abs((t - e.x) / (i.x - e.x))).y,
  sl = (t) => t * t;
class nl extends Sn {
  inRange(t, e, i, s) {
    const n = this.options.borderWidth / 2;
    if ("x" !== i && "y" !== i) {
      const i = { mouseX: t, mouseY: e };
      return (
        (function (t, { mouseX: e, mouseY: i }, s = mr, n) {
          const {
              x: o,
              y: a,
              x2: r,
              y2: l,
            } = t.getProps(["x", "y", "x2", "y2"], n),
            h = r - o,
            c = l - a,
            d = sl(h) + sl(c),
            u = 0 === d ? -1 : ((e - o) * h + (i - a) * c) / d;
          let f, p;
          u < 0
            ? ((f = o), (p = a))
            : u > 1
            ? ((f = r), (p = l))
            : ((f = o + u * h), (p = a + u * c));
          return sl(e - f) + sl(i - p) <= s;
        })(this, i, sl(n), s) || rl(this, i, s)
      );
    }
    const o = ((t, e, { x: i, y: s, x2: n, y2: o }, a) =>
      "y" === a
        ? { start: Math.min(s, o), end: Math.max(s, o), value: e }
        : { start: Math.min(i, n), end: Math.max(i, n), value: t })(
      t,
      e,
      this.getProps(["x", "y", "x2", "y2"], s),
      i
    );
    return (
      (o.value >= o.start - n && o.value <= o.end + n) ||
      rl(this, { mouseX: t, mouseY: e }, s, i)
    );
  }
  getCenterPoint(t) {
    return _r(this, t);
  }
  draw(t) {
    const { x: e, y: i, x2: s, y2: n, options: o } = this;
    if ((t.save(), !Or(t, o))) return t.restore();
    Lr(t, o);
    const a = Math.atan2(n - i, s - e),
      r = Math.sqrt(Math.pow(s - e, 2) + Math.pow(n - i, 2)),
      {
        startOpts: l,
        endOpts: h,
        startAdjust: c,
        endAdjust: d,
      } = (function (t) {
        const e = t.options,
          i = e.arrowHeads && e.arrowHeads.start,
          s = e.arrowHeads && e.arrowHeads.end;
        return {
          startOpts: i,
          endOpts: s,
          startAdjust: dl(t, i),
          endAdjust: dl(t, s),
        };
      })(this);
    t.translate(e, i),
      t.rotate(a),
      t.beginPath(),
      t.moveTo(0 + c, 0),
      t.lineTo(r - d, 0),
      (t.shadowColor = o.borderShadowColor),
      t.stroke(),
      ul(t, 0, c, l),
      ul(t, r, -d, h),
      t.restore();
  }
  get label() {
    return this.elements && this.elements[0];
  }
  resolveElementProperties(t, e) {
    const { scales: i, chartArea: s } = t,
      n = i[e.scaleID],
      o = { x: s.left, y: s.top, x2: s.right, y2: s.bottom };
    let a, r;
    if (n)
      (a = Rr(n, e.value, NaN)),
        (r = Rr(n, e.endValue, a)),
        n.isHorizontal() ? ((o.x = a), (o.x2 = r)) : ((o.y = a), (o.y2 = r));
    else {
      const t = i[$r(i, e, "xScaleID")],
        s = i[$r(i, e, "yScaleID")];
      t &&
        ll(o, t, {
          min: e.xMin,
          max: e.xMax,
          start: t.left,
          end: t.right,
          startProp: "x",
          endProp: "x2",
        }),
        s &&
          ll(o, s, {
            min: e.yMin,
            max: e.yMax,
            start: s.bottom,
            end: s.top,
            startProp: "y",
            endProp: "y2",
          });
    }
    const { x: l, y: h, x2: c, y2: d } = o,
      u = (function (
        { x: t, y: e, x2: i, y2: s },
        { top: n, right: o, bottom: a, left: r }
      ) {
        return !(
          (t < r && i < r) ||
          (t > o && i > o) ||
          (e < n && s < n) ||
          (e > a && s > a)
        );
      })(o, t.chartArea),
      f = u
        ? (function (t, e, i) {
            const { x: s, y: n } = al(t, e, i),
              { x: o, y: a } = al(e, t, i);
            return {
              x: s,
              y: n,
              x2: o,
              y2: a,
              width: Math.abs(o - s),
              height: Math.abs(a - n),
            };
          })({ x: l, y: h }, { x: c, y: d }, t.chartArea)
        : {
            x: l,
            y: h,
            x2: c,
            y2: d,
            width: Math.abs(c - l),
            height: Math.abs(d - h),
          };
    (f.centerX = (c + l) / 2), (f.centerY = (d + h) / 2);
    const p = (function (t, e, i) {
      const s = i.borderWidth,
        n = (0, $50e8ddfc489f09fc$exports.toPadding)(i.padding),
        o = Ar(t.ctx, i),
        a = o.width + n.width + s,
        r = o.height + n.height + s;
      return (function (t, e, i, s) {
        const { width: n, height: o, padding: a } = i,
          { xAdjust: r, yAdjust: l } = e,
          h = { x: t.x, y: t.y },
          c = { x: t.x2, y: t.y2 },
          d =
            "auto" === e.rotation
              ? (function (t) {
                  const { x: e, y: i, x2: s, y2: n } = t,
                    o = Math.atan2(n - i, s - e);
                  return o > $50e8ddfc489f09fc$exports.PI / 2
                    ? o - $50e8ddfc489f09fc$exports.PI
                    : o < $50e8ddfc489f09fc$exports.PI / -2
                    ? o + $50e8ddfc489f09fc$exports.PI
                    : o;
                })(t)
              : (0, $50e8ddfc489f09fc$exports.toRadians)(e.rotation),
          u = (function (t, e, i) {
            const s = Math.cos(i),
              n = Math.sin(i);
            return {
              w: Math.abs(t * s) + Math.abs(e * n),
              h: Math.abs(t * n) + Math.abs(e * s),
            };
          })(n, o, d),
          f = (function (t, e, i, s) {
            let n;
            const o = (function (t, e) {
              const { x: i, x2: s, y: n, y2: o } = t,
                a = Math.min(n, o) - e.top,
                r = Math.min(i, s) - e.left,
                l = e.bottom - Math.max(n, o),
                h = e.right - Math.max(i, s);
              return {
                x: Math.min(r, h),
                y: Math.min(a, l),
                dx: r <= h ? 1 : -1,
                dy: a <= l ? 1 : -1,
              };
            })(t, s);
            n =
              "start" === e.position
                ? hl({ w: t.x2 - t.x, h: t.y2 - t.y }, i, e, o)
                : "end" === e.position
                ? 1 - hl({ w: t.x - t.x2, h: t.y - t.y2 }, i, e, o)
                : Mr(1, e.position);
            return n;
          })(t, e, { labelSize: u, padding: a }, s),
          p = tl(h, c, f),
          g = { size: u.w, min: s.left, max: s.right, padding: a.left },
          m = { size: u.h, min: s.top, max: s.bottom, padding: a.top },
          b = cl(p.x, g) + r,
          x = cl(p.y, m) + l;
        return {
          x: b - n / 2,
          y: x - o / 2,
          x2: b + n / 2,
          y2: x + o / 2,
          centerX: b,
          centerY: x,
          pointX: p.x,
          pointY: p.y,
          width: n,
          height: o,
          rotation: (0, $50e8ddfc489f09fc$exports.toDegrees)(d),
        };
      })(e, i, { width: a, height: r, padding: n }, t.chartArea);
    })(t, f, e.label);
    return (
      (p._visible = u),
      (f.elements = [{ type: "label", optionScope: "label", properties: p }]),
      f
    );
  }
}
nl.id = "lineAnnotation";
const ol = {
  backgroundColor: void 0,
  backgroundShadowColor: void 0,
  borderColor: void 0,
  borderDash: void 0,
  borderDashOffset: void 0,
  borderShadowColor: void 0,
  borderWidth: void 0,
  display: void 0,
  fill: void 0,
  length: void 0,
  shadowBlur: void 0,
  shadowOffsetX: void 0,
  shadowOffsetY: void 0,
  width: void 0,
};
function al({ x: t, y: e }, i, { top: s, right: n, bottom: o, left: a }) {
  return (
    t < a && ((e = il(a, { x: t, y: e }, i)), (t = a)),
    t > n && ((e = il(n, { x: t, y: e }, i)), (t = n)),
    e < s && ((t = el(s, { x: t, y: e }, i)), (e = s)),
    e > o && ((t = el(o, { x: t, y: e }, i)), (e = o)),
    { x: t, y: e }
  );
}
function rl(t, { mouseX: e, mouseY: i }, s, n) {
  const o = t.label;
  return o.options.display && o.inRange(e, i, n, s);
}
function ll(t, e, i) {
  const s = Ir(e, i);
  (t[i.startProp] = s.start), (t[i.endProp] = s.end);
}
function hl(t, e, i, s) {
  const { labelSize: n, padding: o } = e,
    a = t.w * s.dx,
    r = t.h * s.dy,
    l = a > 0 && (n.w / 2 + o.left - s.x) / a,
    h = r > 0 && (n.h / 2 + o.top - s.y) / r;
  return br(Math.max(l, h), 0, 0.25);
}
function cl(t, e) {
  const { size: i, min: s, max: n, padding: o } = e,
    a = i / 2;
  return i > n - s
    ? (n + s) / 2
    : (s >= t - o - a && (t = s + o + a), n <= t + o + a && (t = n - o - a), t);
}
function dl(t, e) {
  if (!e || !e.display) return 0;
  const { length: i, width: s } = e,
    n = t.options.borderWidth / 2,
    o = { x: i, y: s + n },
    a = { x: 0, y: n };
  return Math.abs(el(0, o, a));
}
function ul(t, e, i, s) {
  if (!s || !s.display) return;
  const {
      length: n,
      width: o,
      fill: a,
      backgroundColor: r,
      borderColor: l,
    } = s,
    h = Math.abs(e - n) + i;
  t.beginPath(),
    Lr(t, s),
    Or(t, s),
    t.moveTo(h, -o),
    t.lineTo(e + i, 0),
    t.lineTo(h, o),
    !0 === a
      ? ((t.fillStyle = r || l),
        t.closePath(),
        t.fill(),
        (t.shadowColor = "transparent"))
      : (t.shadowColor = s.borderShadowColor),
    t.stroke();
}
(nl.defaults = {
  adjustScaleRange: !0,
  arrowHeads: {
    display: !1,
    end: Object.assign({}, ol),
    fill: !1,
    length: 12,
    start: Object.assign({}, ol),
    width: 6,
  },
  borderDash: [],
  borderDashOffset: 0,
  borderShadowColor: "transparent",
  borderWidth: 2,
  display: !0,
  endValue: void 0,
  label: {
    backgroundColor: "rgba(0,0,0,0.8)",
    backgroundShadowColor: "transparent",
    borderCapStyle: "butt",
    borderColor: "black",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: "miter",
    borderRadius: 6,
    borderShadowColor: "transparent",
    borderWidth: 0,
    callout: Object.assign({}, Zr.defaults.callout),
    color: "#fff",
    content: null,
    display: !1,
    drawTime: void 0,
    font: {
      family: void 0,
      lineHeight: void 0,
      size: void 0,
      style: void 0,
      weight: "bold",
    },
    height: void 0,
    padding: 6,
    position: "center",
    rotation: 0,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textAlign: "center",
    textStrokeColor: void 0,
    textStrokeWidth: 0,
    width: void 0,
    xAdjust: 0,
    yAdjust: 0,
    z: void 0,
  },
  scaleID: void 0,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  value: void 0,
  xMax: void 0,
  xMin: void 0,
  xScaleID: void 0,
  yMax: void 0,
  yMin: void 0,
  yScaleID: void 0,
  z: 0,
}),
  (nl.descriptors = {
    arrowHeads: {
      start: { _fallback: !0 },
      end: { _fallback: !0 },
      _fallback: !0,
    },
  }),
  (nl.defaultRoutes = { borderColor: "color" });
class fl extends Sn {
  inRange(t, e, i, s) {
    const n = this.options.rotation,
      o = this.options.borderWidth;
    if ("x" !== i && "y" !== i)
      return (function (t, e, i, s) {
        const { width: n, height: o, centerX: a, centerY: r } = e,
          l = n / 2,
          h = o / 2;
        if (l <= 0 || h <= 0) return !1;
        const c = (0, $50e8ddfc489f09fc$exports.toRadians)(i || 0),
          d = s / 2 || 0,
          u = Math.cos(c),
          f = Math.sin(c),
          p = Math.pow(u * (t.x - a) + f * (t.y - r), 2),
          g = Math.pow(f * (t.x - a) - u * (t.y - r), 2);
        return p / Math.pow(l + d, 2) + g / Math.pow(h + d, 2) <= 1.0001;
      })(
        { x: t, y: e },
        this.getProps(["width", "height", "centerX", "centerY"], s),
        n,
        o
      );
    const {
        x: a,
        y: r,
        x2: l,
        y2: h,
      } = this.getProps(["x", "y", "x2", "y2"], s),
      c = o / 2,
      d = "y" === i ? { start: r, end: h } : { start: a, end: l },
      u = Nr(
        { x: t, y: e },
        this.getCenterPoint(s),
        (0, $50e8ddfc489f09fc$exports.toRadians)(-n)
      );
    return u[i] >= d.start - c - mr && u[i] <= d.end + c + mr;
  }
  getCenterPoint(t) {
    return _r(this, t);
  }
  draw(t) {
    const { width: e, height: i, centerX: s, centerY: n, options: o } = this;
    t.save(),
      Tr(t, this.getCenterPoint(), o.rotation),
      Lr(t, this.options),
      t.beginPath(),
      (t.fillStyle = o.backgroundColor);
    const a = Or(t, o);
    t.ellipse(
      s,
      n,
      i / 2,
      e / 2,
      $50e8ddfc489f09fc$exports.PI / 2,
      0,
      2 * $50e8ddfc489f09fc$exports.PI
    ),
      t.fill(),
      a && ((t.shadowColor = o.borderShadowColor), t.stroke()),
      t.restore();
  }
  get label() {
    return this.elements && this.elements[0];
  }
  resolveElementProperties(t, e) {
    return Br(t, e);
  }
}
(fl.id = "ellipseAnnotation"),
  (fl.defaults = {
    adjustScaleRange: !0,
    backgroundShadowColor: "transparent",
    borderDash: [],
    borderDashOffset: 0,
    borderShadowColor: "transparent",
    borderWidth: 1,
    display: !0,
    label: Object.assign({}, Jr.defaults.label),
    rotation: 0,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    xMax: void 0,
    xMin: void 0,
    xScaleID: void 0,
    yMax: void 0,
    yMin: void 0,
    yScaleID: void 0,
    z: 0,
  }),
  (fl.defaultRoutes = { borderColor: "color", backgroundColor: "color" }),
  (fl.descriptors = { label: { _fallback: !0 } });
class pl extends Sn {
  inRange(t, e, i, s) {
    const {
        x: n,
        y: o,
        x2: a,
        y2: r,
        width: l,
      } = this.getProps(["x", "y", "x2", "y2", "width"], s),
      h = this.options.borderWidth;
    if ("x" !== i && "y" !== i)
      return (function (t, e, i, s) {
        if (!t || !e || i <= 0) return !1;
        const n = s / 2;
        return (
          Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2) <= Math.pow(i + n, 2)
        );
      })({ x: t, y: e }, this.getCenterPoint(s), l / 2, h);
    const c = h / 2,
      d =
        "y" === i
          ? { start: o, end: r, value: e }
          : { start: n, end: a, value: t };
    return d.value >= d.start - c && d.value <= d.end + c;
  }
  getCenterPoint(t) {
    return _r(this, t);
  }
  draw(t) {
    const e = this.options,
      i = e.borderWidth;
    if (e.radius < 0.1) return;
    t.save(), (t.fillStyle = e.backgroundColor), Lr(t, e);
    const s = Or(t, e);
    (e.borderWidth = 0),
      (0, $50e8ddfc489f09fc$exports.drawPoint)(
        t,
        e,
        this.centerX,
        this.centerY
      ),
      s &&
        !Dr(e.pointStyle) &&
        ((t.shadowColor = e.borderShadowColor), t.stroke()),
      t.restore(),
      (e.borderWidth = i);
  }
  resolveElementProperties(t, e) {
    return zr(t, e);
  }
}
(pl.id = "pointAnnotation"),
  (pl.defaults = {
    adjustScaleRange: !0,
    backgroundShadowColor: "transparent",
    borderDash: [],
    borderDashOffset: 0,
    borderShadowColor: "transparent",
    borderWidth: 1,
    display: !0,
    pointStyle: "circle",
    radius: 10,
    rotation: 0,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    xAdjust: 0,
    xMax: void 0,
    xMin: void 0,
    xScaleID: void 0,
    xValue: void 0,
    yAdjust: 0,
    yMax: void 0,
    yMin: void 0,
    yScaleID: void 0,
    yValue: void 0,
    z: 0,
  }),
  (pl.defaultRoutes = { borderColor: "color", backgroundColor: "color" });
class gl extends Sn {
  inRange(t, e, i, s) {
    if ("x" !== i && "y" !== i)
      return (
        this.options.radius >= 0.1 &&
        this.elements.length > 1 &&
        (function (t, e, i, s) {
          let n = !1,
            o = t[t.length - 1].getProps(["bX", "bY"], s);
          for (const a of t) {
            const t = a.getProps(["bX", "bY"], s);
            t.bY > i != o.bY > i &&
              e < ((o.bX - t.bX) * (i - t.bY)) / (o.bY - t.bY) + t.bX &&
              (n = !n),
              (o = t);
          }
          return n;
        })(this.elements, t, e, s)
      );
    const n = Nr(
        { x: t, y: e },
        this.getCenterPoint(s),
        (0, $50e8ddfc489f09fc$exports.toRadians)(-this.options.rotation)
      ),
      o = this.elements.map((t) => ("y" === i ? t.bY : t.bX)),
      a = Math.min(...o),
      r = Math.max(...o);
    return n[i] >= a && n[i] <= r;
  }
  getCenterPoint(t) {
    return _r(this, t);
  }
  draw(t) {
    const { elements: e, options: i } = this;
    t.save(), t.beginPath(), (t.fillStyle = i.backgroundColor), Lr(t, i);
    const s = Or(t, i);
    let n = !0;
    for (const i of e) n ? (t.moveTo(i.x, i.y), (n = !1)) : t.lineTo(i.x, i.y);
    t.closePath(),
      t.fill(),
      s && ((t.shadowColor = i.borderShadowColor), t.stroke()),
      t.restore();
  }
  resolveElementProperties(t, e) {
    const i = zr(t, e),
      { x: s, y: n } = i,
      { sides: o, rotation: a } = e,
      r = [],
      l = (2 * $50e8ddfc489f09fc$exports.PI) / o;
    let h = a * $50e8ddfc489f09fc$exports.RAD_PER_DEG;
    for (let t = 0; t < o; t++, h += l) r.push(ml(i, e, h));
    return (i.elements = r), (i.initProperties = { x: s, y: n }), i;
  }
}
function ml({ centerX: t, centerY: e }, { radius: i, borderWidth: s }, n) {
  const o = s / 2,
    a = Math.sin(n),
    r = Math.cos(n),
    l = { x: t + a * i, y: e - r * i };
  return {
    type: "point",
    optionScope: "point",
    properties: {
      x: l.x,
      y: l.y,
      centerX: l.x,
      centerY: l.y,
      bX: t + a * (i + o),
      bY: e - r * (i + o),
    },
  };
}
(gl.id = "polygonAnnotation"),
  (gl.defaults = {
    adjustScaleRange: !0,
    backgroundShadowColor: "transparent",
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: "miter",
    borderShadowColor: "transparent",
    borderWidth: 1,
    display: !0,
    point: { radius: 0 },
    radius: 10,
    rotation: 0,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    sides: 3,
    xAdjust: 0,
    xMax: void 0,
    xMin: void 0,
    xScaleID: void 0,
    xValue: void 0,
    yAdjust: 0,
    yMax: void 0,
    yMin: void 0,
    yScaleID: void 0,
    yValue: void 0,
    z: 0,
  }),
  (gl.defaultRoutes = { borderColor: "color", backgroundColor: "color" });
const bl = {
  box: Jr,
  ellipse: fl,
  label: Zr,
  line: nl,
  point: pl,
  polygon: gl,
};
Object.keys(bl).forEach((t) => {
  ze.describe(`elements.${bl[t].id}`, {
    _fallback: "plugins.annotation.common",
  });
});
const xl = { update: Object.assign };
function yl(t = "line") {
  return bl[t]
    ? t
    : (console.warn(`Unknown annotation type: '${t}', defaulting to 'line'`),
      "line");
}
function _l(t, e, i, s) {
  const n = (function (t, e, i) {
      return "reset" === i || "none" === i || "resize" === i
        ? xl
        : new ps(t, e);
    })(t, i.animations, s),
    o = e.annotations,
    a = (function (t, e) {
      const i = e.length,
        s = t.length;
      if (s < i) {
        const e = i - s;
        t.splice(s, 0, ...new Array(e));
      } else s > i && t.splice(i, s - i);
      return t;
    })(e.elements, o);
  for (let e = 0; e < o.length; e++) {
    const i = o[e],
      s = Ml(a, e, i.type),
      r = i.setContext(Pl(t, s, i)),
      l = s.resolveElementProperties(t, r);
    (l.skip = vl(l)),
      "elements" in l && (wl(s, l, r, n), delete l.elements),
      (0, $50e8ddfc489f09fc$exports.defined)(s.x) || Object.assign(s, l),
      (l.options = kl(r)),
      n.update(s, l);
  }
}
function vl(t) {
  return isNaN(t.x) || isNaN(t.y);
}
function wl(t, { elements: e, initProperties: i }, s, n) {
  const o = t.elements || (t.elements = []);
  o.length = e.length;
  for (let t = 0; t < e.length; t++) {
    const a = e[t],
      r = a.properties,
      l = Ml(o, t, a.type, i),
      h = s[a.optionScope].override(a);
    (r.options = kl(h)), n.update(l, r);
  }
}
function Ml(t, e, i, s) {
  const n = bl[yl(i)];
  let o = t[e];
  return (
    (o && o instanceof n) ||
      ((o = t[e] = new n()),
      (0, $50e8ddfc489f09fc$exports.isObject)(s) && Object.assign(o, s)),
    o
  );
}
function kl(t) {
  const e = bl[yl(t.type)],
    i = {};
  (i.id = t.id),
    (i.type = t.type),
    (i.drawTime = t.drawTime),
    Object.assign(i, Sl(t, e.defaults), Sl(t, e.defaultRoutes));
  for (const e of dr) i[e] = t[e];
  return i;
}
function Sl(t, e) {
  const i = {};
  for (const s of Object.keys(e)) {
    const n = e[s],
      o = t[s];
    i[s] = (0, $50e8ddfc489f09fc$exports.isObject)(n) ? Sl(o, n) : o;
  }
  return i;
}
function Pl(t, e, i) {
  return (
    e.$context ||
    (e.$context = Object.assign(Object.create(t.getContext()), {
      element: e,
      id: i.id,
      type: "annotation",
    }))
  );
}
const Cl = new Map();
var Dl = {
  id: "annotation",
  version: "2.1.2",
  beforeRegister() {
    !(function (t, e, i, s = !0) {
      const n = i.split(".");
      let o = 0;
      for (const a of e.split(".")) {
        const r = n[o++];
        if (parseInt(a, 10) < parseInt(r, 10)) break;
        if (gr(r, a)) {
          if (s)
            throw new Error(
              `${t} v${i} is not supported. v${e} or newer is required.`
            );
          return !1;
        }
      }
    })("chart.js", "3.7", ho.version);
  },
  afterRegister() {
    ho.register(bl);
  },
  afterUnregister() {
    ho.unregister(bl);
  },
  beforeInit(t) {
    Cl.set(t, {
      annotations: [],
      elements: [],
      visibleElements: [],
      listeners: {},
      listened: !1,
      moveListened: !1,
      hovered: [],
    });
  },
  beforeUpdate(t, e, i) {
    const s = (Cl.get(t).annotations = []);
    let n = i.annotations;
    (0, $50e8ddfc489f09fc$exports.isObject)(n)
      ? Object.keys(n).forEach((t) => {
          const e = n[t];
          (0, $50e8ddfc489f09fc$exports.isObject)(e) && ((e.id = t), s.push(e));
        })
      : (0, $50e8ddfc489f09fc$exports.isArray)(n) && s.push(...n),
      (function (t, e) {
        for (const i of t) Xr(i, e);
      })(s, t.scales);
  },
  afterDataLimits(t, e) {
    const i = Cl.get(t);
    qr(
      t,
      e.scale,
      i.annotations.filter((t) => t.display && t.adjustScaleRange)
    );
  },
  afterUpdate(t, e, i) {
    const s = Cl.get(t);
    !(function (t, e, i) {
      (e.listened = !1),
        (e.moveListened = !1),
        (e._getElements = lr),
        dr.forEach((t) => {
          "function" == typeof i[t]
            ? ((e.listened = !0), (e.listeners[t] = i[t]))
            : (0, $50e8ddfc489f09fc$exports.defined)(e.listeners[t]) &&
              delete e.listeners[t];
        }),
        cr.forEach((t) => {
          "function" == typeof i[t] && (e.moveListened = !0);
        }),
        (e.listened && e.moveListened) ||
          e.annotations.forEach((t) => {
            e.listened || "function" != typeof t.click || (e.listened = !0),
              e.moveListened ||
                cr.forEach((i) => {
                  "function" == typeof t[i] &&
                    ((e.listened = !0), (e.moveListened = !0));
                });
          });
    })(0, s, i),
      _l(t, s, i, e.mode),
      (s.visibleElements = s.elements.filter(
        (t) => !t.skip && t.options.display
      ));
  },
  beforeDatasetsDraw(t, e, i) {
    Tl(t, "beforeDatasetsDraw", i.clip);
  },
  afterDatasetsDraw(t, e, i) {
    Tl(t, "afterDatasetsDraw", i.clip);
  },
  beforeDraw(t, e, i) {
    Tl(t, "beforeDraw", i.clip);
  },
  afterDraw(t, e, i) {
    Tl(t, "afterDraw", i.clip);
  },
  beforeEvent(t, e, i) {
    ur(Cl.get(t), e.event, i) && (e.changed = !0);
  },
  afterDestroy(t) {
    Cl.delete(t);
  },
  _getState: (t) => Cl.get(t),
  defaults: {
    animations: {
      numbers: {
        properties: [
          "x",
          "y",
          "x2",
          "y2",
          "width",
          "height",
          "centerX",
          "centerY",
          "pointX",
          "pointY",
          "radius",
        ],
        type: "number",
      },
    },
    clip: !0,
    interaction: { mode: void 0, axis: void 0, intersect: void 0 },
    common: { drawTime: "afterDatasetsDraw", label: {} },
  },
  descriptors: {
    _indexable: !1,
    _scriptable: (t) => !dr.includes(t),
    annotations: {
      _allKeys: !1,
      _fallback: (t, e) => `elements.${bl[yl(e.type)].id}`,
    },
    interaction: { _fallback: !0 },
    common: { label: { _fallback: !0 } },
  },
  additionalOptionScopes: [""],
};
function Tl(t, e, i) {
  const { ctx: s, chartArea: n } = t,
    { visibleElements: o } = Cl.get(t);
  i && (0, $50e8ddfc489f09fc$exports.clipArea)(s, n);
  const a = (function (t, e) {
    const i = [];
    for (const s of t)
      if (
        (s.options.drawTime === e && i.push(s), s.elements && s.elements.length)
      )
        for (const t of s.elements)
          t.options.display && t.options.drawTime === e && i.push(t);
    return i;
  })(o, e).sort((t, e) => t.options.z - e.options.z);
  for (const e of a) e.draw(t.ctx, n);
  i && (0, $50e8ddfc489f09fc$exports.unclipArea)(s);
}
class Ol {
  render(t) {
    if (!t) return;
    (this._user = t),
      (this._currentStock = t?.userStocks.find(
        (e) => e.ticker === t.stock.symbol
      )),
      (this._data = t.stock);
    const e = this._generateHTML();
    this._parentElement.insertAdjacentHTML("beforeend", e),
      this._generateChart?.();
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
  clear() {
    this._parentElement.innerHTML = "";
  }
  renderLoad() {
    this._parentElement.querySelector(".loading") || this.clear();
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      '\n    <div class="loading">\n    </div>\n    '
    );
  }
  _generatePanelTypes() {
    return [
      this._user.stocklist ? h : void 0,
      this._user.watchlist ? c : void 0,
      this._user.toplist ? d : void 0,
    ].filter((t) => t);
  }
  _generateColor(t) {
    return t > 0 ? "positive_green" : t < 0 ? "negative_red" : "NEUTRAL";
  }
  _generateSymbol(t) {
    return t > 0 ? "+" : "";
  }
  _generateRGB(t) {
    const e = this._generateColor(+t);
    return "positive_green" === e
      ? "rgb(0,200,0)"
      : "negative_red" === e
      ? "rgb(253,82,64)"
      : "rgb(178, 178, 178)";
  }
  _formatCurrency(t) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      signDisplay: "auto",
    }).format(t);
  }
}
ho.register(Dl);
var Ll,
  Al = new (class extends Ol {
    _parentElement = document.querySelector(".aside-container");
    _data;
    constructor() {
      super();
    }
    addHandlerRender(t) {
      ["load"].forEach((e) =>
        window.addEventListener(e, function () {
          t();
        })
      );
    }
    _generateHTML = function () {
      return `${this._generatePanelTypes()
        .map(this._generatePanel.bind(this))
        .join("")}`;
    };
    _generatePanel = function (t) {
      return `\n        <div class="side-container ${t}">\n          <h1>${this._generatePanelType(
        t
      )}</h1>\n          <div class="stocks-panel panel">\n          ${this._user[
        `${t}`
      ]
        .map(this._generateStocks.bind(this))
        .join("")}\n          </div>\n        </div>\n        `;
    };
    _generatePanelType = function (t) {
      switch (t) {
        case c:
          return "Watchlist";
        case h:
          return "My Stocks";
        case d:
          return "Top Stocks";
      }
    };
    _generateStocks = function (t) {
      return `\n    <a class="stocks" id = "${t.symbol}" href="#stocks/${
        t.symbol
      }">\n        <div class="ticker">\n            <p>${
        t.symbol
      }</p>\n            ${
        t.quantity
          ? `<p class= "ticker-sub user-shares">${t.quantity} ${
              t.quantity > 1 ? "Shares" : "Share"
            }`
          : ""
      }\n        </div>\n    \n        <canvas class="ticker-graph">GRAPH</canvas>\n    \n        <div class="ticker-price ticker">\n        <p>${
        t.lastPrice
      }<p>\n        <p class= "ticker-sub ${this._generateColor(
        t.netPercentChangeInDouble
      )}">${Number(t.netPercentChangeInDouble).toFixed(
        2
      )}%<p>\n        </div>    \n    </a>\n    `;
    };
    _generateChart() {
      this._generatePanelTypes().map(this.createChart.bind(this));
    }
    createChart(t) {
      if (!this._user[`${t}`][0].quotes) return;
      const e = this._parentElement
        .querySelector(`.${t}`)
        .querySelector(".stocks-panel");
      for (let i = 0; i < e.children.length; i++) {
        const s = {
            type: "line",
            yMax: this._user[`${t}`][i].closePrice,
            yMin: this._user[`${t}`][i].closePrice,
            borderColor: "rgb(123, 123, 123)",
            borderDash: [1, 5],
          },
          n = this._generateRGB(this._user[`${t}`][i].netChange);
        new ho(e.children[i].querySelector("canvas"), {
          type: "line",
          data: {
            labels: this._user[`${t}`][i].quotes.dates,
            datasets: [
              { data: this._user[`${t}`][i].quotes.prices.map((t) => t.close) },
            ],
          },
          options: {
            borderColor: n,
            hover: { mode: null },
            animation: { animation: !1 },
            elements: { point: { radius: 0 }, line: { borderWidth: 2 } },
            plugins: {
              annotation: { annotations: { line1: s } },
              legend: { display: !1 },
              tooltip: { enabled: !1 },
            },
            scales: {
              y: { display: !1, grid: { display: !1 } },
              x: { display: !1, grid: { display: !1 } },
            },
          },
        });
      }
    }
  })();
Ll = new URL(o("27Lyk").resolve("lW39w"), import.meta.url).toString();
var El;
El = new URL(o("27Lyk").resolve("9Eqac"), import.meta.url).toString();
var Rl,
  $l = new (class extends Ol {
    _parentElement = document.querySelector(".aside-container");
    constructor() {
      super(), this.addHandlerReview();
    }
    addHandlerTransactionType() {}
    addHandlerReview() {
      this._parentElement.addEventListener(
        "submit",
        this.reviewPurchase.bind(this)
      );
    }
    addHandlerPurchaseForm(t) {
      const e = this;
      this._parentElement.addEventListener("click", function (i) {
        if ("cancel" === i.target.value?.toLowerCase()) {
          (i.target.closest(".purchase-panel").style.height = "550px"), t();
        }
        if (i.target.closest(".purchase-panel-header")?.children.length > 1) {
          const t = i.target.id;
          (i.target.style = `border-bottom: 1px solid var(--${e._generateColor(
            e._data.netChange
          )})`),
            i.target.classList.toggle("active");
          const s =
            "buy" === t
              ? i.target.nextElementSibling
              : i.target.previousElementSibling;
          if (!s) return;
          (s.style = ""),
            s.classList.toggle("active"),
            (e._data.tradeType = t),
            e._updateAvailableBal();
        }
      });
    }
    addHandlerSubmit(t) {
      this._submitHandler = t;
    }
    reviewPurchase(t) {
      t.preventDefault();
      const e = t.target.closest(".purchase-panel").querySelector(".active").id,
        i = t.target.querySelector(".btn-submit"),
        s = t.target.querySelector(".form-buttons");
      if (!i) return;
      const n = this._parentElement.querySelector(".active").id,
        o = t.target.querySelector(".order-value").id.slice(6),
        a = +t.target.querySelector(`#order-${o}`).value,
        r = t.target
          .querySelector("#estimated-price")
          .innerHTML.slice(1)
          .replace(",", "");
      if ("submit" === i.value.toLowerCase())
        return this._submitHandler(o, a, this._data.symbol, e);
      const l = [
          s,
          this._generateReviewMessageSuccess(o, a, this._data.lastPrice, n),
          this._generateCancelButton(this._data.netChange),
        ],
        h = [
          s,
          this._generateReviewMessageFailure(o, "Share" === o ? r : a),
          this._generateCancelButton(this._data.netChange),
          !1,
        ];
      "buy" === e
        ? this._checkValidPurchase(o, a)
          ? this.renderPurchaseReview.call(...l)
          : this.renderPurchaseReview.call(...h)
        : "sell" === e &&
          (this._checkValidSell(o, a)
            ? this.renderPurchaseReview.call(...l)
            : this.renderPurchaseReview.call(...h));
    }
    addHandlerInput(t) {
      this._parentElement.addEventListener(
        "input",
        this.updatePurchasePanel.bind(t)
      );
    }
    renderPurchaseReview(t, e, i = !0) {
      const s = this.closest(".purchase-panel"),
        n = s.querySelector(".current-available"),
        o = n.outerHTML;
      n.remove(),
        this.classList.add("animateReview"),
        this.insertAdjacentHTML("beforebegin", t),
        this.insertAdjacentHTML("beforeend", e),
        this.insertAdjacentHTML("beforeend", o),
        i
          ? (this.querySelector(".btn-submit").value = "Submit")
          : this.querySelector(".btn-submit").remove();
      let a = s.offsetHeight + this.offsetHeight;
      i && (a += 40),
        (s.style.height = `${a}px`),
        (n.style.maxHeight = "800px");
    }
    addHandlerWatchlist(t) {
      this._parentElement.addEventListener("click", function (e) {
        if (e.target.closest("#btn_watchlist")) {
          const e = this.querySelector(".purchase-container").id;
          t(e);
        }
      });
    }
    updatePurchasePanel(t) {
      if ((t.preventDefault(), "order-type" === t.target.id)) {
        const e = t.target
          .closest(".purchase-panel")
          .querySelector(".active").id;
        return this(t.target.value, e);
      }
      const e = t.target.closest(".aside-container"),
        i = e.querySelector("#estimated-price"),
        s = t.target.value;
      if ("order-Shares" === t.target.id) {
        const t = Number(
          s * +e.querySelector("#market-price").innerHTML.slice(1)
        ).toFixed(2);
        i.innerHTML =
          "$" +
          Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(t);
      } else if ("order-Dollars" === t.target.id) {
        const t = s / +e.querySelector("#market-price").innerHTML.slice(1);
        i.innerHTML = t - t.toFixed(6) == 0 ? t : t.toFixed(6);
      }
    }
    _updateAvailableBal() {
      this._parentElement.querySelector(
        ".user-available"
      ).innerHTML = `${this._generateAvailableBal()}`;
    }
    updateWatchlistIMG() {
      const t = this._parentElement
        .querySelector("#btn_watchlist")
        .querySelector("img");
      t.src.includes("plus") ? (t.src = e(Ll)) : (t.src = e(El));
    }
    _generateHTML() {
      return `\n    <div class="purchase-container side-container" id = '${
        this._data.symbol
      }'>\n          <div class="purchase-panel panel">\n          ${this._generateHeaderHTML()}\n            <hr />\n            <form action="" class="purchase-form">\n              <section>\n                <p>Order Type</p>\n                <p>Market Order</p>\n              </section>\n\n              <section>\n              ${this._generatePurchaseLabelHTML()}\n              </section>\n\n              <section>\n                <label for="order-${this._generatePurchaseType()}">${this._generatePurchaseType()}</label>\n                <input type="number" min="0" class= "order-value" step="0.01" id="order-${this._generatePurchaseType(
        this._data.purchaseType
      )}" placeholder = '0'/>\n              </section>\n              \n              <section class="current-market">\n                <p>Market Price</p>\n                <p id="market-price">$${Number(
        this._data.lastPrice
      ).toFixed(
        2
      )}</p>\n              </section>\n              <hr />\n\n              <section class="current-estimated">\n                <p>${
        "Dollars" === this._data.purchaseType ? "Est. Quantity" : "Est. Price"
      }</p>\n                <p id="estimated-price">${
        "Dollars" === this._data.purchaseType ? "" : "$"
      }0.00\n                </p>\n              </section>\n\n\n              <div class="form-buttons">\n                <input type="submit" class="btn-submit btn-alternative" value="Review" style="background-color: var(--${this._generateColor(
        `${this._data.netChange}`
      )}" />\n              </div>\n            </form>\n\n            ${this._generateBalanceHTML()}\n\n          </div>\n          ${this._generateSubLabelHTML()}\n        </div>\n    `;
    }
    _generateHeaderHTML() {
      const t = `class = "active" style= "border-bottom: 1px solid var(--${this._generateColor(
        this._data.netChange
      )})"`;
      return `\n    <section class="purchase-panel-header">\n    <h2 id="buy" ${
        this._data.tradeType &&
        this._currentStock &&
        "buy" !== this._data.tradeType
          ? ""
          : t
      }>Buy ${this._data.symbol}</h2>\n    ${
        this._currentStock
          ? `<h2 id="sell" ${"sell" === this._data.tradeType ? t : ""}>Sell ${
              this._data.symbol
            }</h2>`
          : ""
      }\n  </section>\n    `;
    }
    _generatePurchaseLabelHTML() {
      const t = this._data.purchaseType ? this._data.purchaseType : "Shares";
      return `\n    <label for="order-type">Buy in</label>\n    <select name="order-type" id="order-type">\n      <option value="Shares" ${
        "Shares" === t ? "selected" : ""
      }>Shares</option>\n      <option value="Dollars" ${
        "Dollars" === t ? "selected" : ""
      }>Dollars</option>\n    </select>\n    `;
    }
    _generateBalanceHTML() {
      return `\n    <section class="current-available">\n      <p class="user-available">${this._generateAvailableBal()}</p>\n    </section>\n    `;
    }
    _generateSubLabelHTML() {
      return `\n    <button class="btn-alternative ${this._generateColor(
        this._data.netChange
      )}_button btn-subPanel" id= 'btn_watchlist'>\n    <img\n      class="${this._generateColor(
        this._data.netChange
      )}_symbol"\n      src="${
        this._data.bookmarked ? e(Ll) : e(El)
      }"\n      alt=""\n    />\n    Add to Watchlist\n    </button>\n    `;
    }
    _generateAvailableBal() {
      return this._currentStock &&
        this._data.tradeType &&
        "buy" !== this._data.tradeType
        ? this._data.purchaseType && "Shares" !== this._data.purchaseType
          ? `${this._formatCurrency(
              +this._currentStock.quantity * +this._data.lastPrice
            )} available`
          : `${this._currentStock.quantity} ${this._currentStock.ticker} available`
        : `${this._formatCurrency(+this._user.availableBal)} available`;
    }
    _generateCost(t) {
      return Number(this._data.lastPrice) * t;
    }
    _generateQuantity(t) {
      return t / Number(this._data.lastPrice);
    }
    _generatePurchaseType() {
      return this._data.purchaseType ? this._data.purchaseType : "Shares";
    }
    _generateReviewMessageSuccess(t, e, i, s = "buy") {
      return `\n    <section class="order-summary">\n    <h3>Order Summary </h3>\n    ${
        "Shares" === t
          ? `You are placing a market order to ${s} ${e} ${
              1 === e ? "share" : "shares"
            } of ${
              this._data.symbol
            }. Your pending order will execute at ${i} per share or better.`
          : `You are placing a market order to ${s} ${e} ${
              1 === e ? "dollar" : "dollars"
            } of ${
              this._data.symbol
            }. \n    Your pending order will execute at the best market price.`
      }</section>`;
    }
    _generateReviewMessageFailure(t, e) {
      return `\n    <section class="order-summary">\n    <h3>${
        e <= 0 ? "Order not valid." : "Not enough buying power"
      } </h3>\n\n    ${
        e <= 0
          ? `Your order must be greater than 0 ${
              "Shares" === t ? "shares" : "dollars"
            }.`
          : "You do not have enough buying power in your account to place this order."
      }\n    </section>\n    `;
    }
    _generateCancelButton(t) {
      return `\n    <input type="button" \n    class="btn-alternative" \n    value="Cancel" \n    style="color: var(--${this._generateColor(
        t
      )}); \n    border: 1px solid var(--${this._generateColor(t)})"\n    />`;
    }
    _checkValidPurchase(t, e) {
      return "Shares" === t
        ? e * this._data.lastPrice <= this._user.availableBal && e > 0
        : "Dollars" === t
        ? e <= this._user.availableBal
        : void 0;
    }
    _checkValidSell(t, e) {
      const i = this._user.userStocks.find(
        (t) => t.ticker === this._data.symbol
      );
      return "Shares" === t
        ? e <= i.quantity
        : "Dollars" === t
        ? e / this._data.lastPrice <= i.quantity
        : void 0;
    }
  })();
Rl = new URL(o("27Lyk").resolve("8lR7J"), import.meta.url).toString();
var Il = new (class extends Ol {
  _parentElement = document.querySelector(".main-container");
  constructor() {
    super(), this.addHandlerTicker();
  }
  addHandlerTicker() {
    this._parentElement.addEventListener("click", function (t) {
      if (!t.target.closest(".news-tickers")) return;
      t.preventDefault();
      const e = t.target
        .closest(".news-tickers")
        ?.querySelector(".news-ticker").innerHTML;
      window.location.hash = `stocks/${e}`;
    });
  }
  _generateHTML() {
    return `\n    <section>\n    <h1>News</h1>\n    ${this._data.news
      .map((t) => this._generateNewsPanel(t))
      .join("")}\n    </section>\n    `;
  }
  _generateNewsPanel(t) {
    return `\n    <a class="news-panel sub-panel" href = "${
      t.url
    }" target="_blank">\n    <div class="news-panel-main">\n    <p class="news-publisher">\n    ${
      t.source
    }\n    <span class="news-publisher-time">${this._calcDate(
      t.time_published
    )}</span>\n    </p>\n    <h1 class="news-title">\n    ${
      t.title
    }\n    </h1>\n    \n    <p class="news-teaser">${t.summary}</p>\n\n    ${
      this._data.symbol && t.symbol.length > 0
        ? `\n    <div class="news-tickers">\n      <span class="news-ticker">${
            t.symbol
          }</span>\n      <span class="${this._generateColor(+t.netChange)}">${
            +t.netPercentChangeInDouble
              ? Number(+t.netPercentChangeInDouble).toFixed(2) + "%"
              : ""
          }</span>\n    </div>\n    `
        : ""
    }\n\n      </div>\n        <div class = "news-image">\n            <img\n            src="${
      t.banner_image || e(Rl)
    }"\n            alt=""\n            />\n      </div>\n  </a>  \n  `;
  }
  _calcDate(t) {
    const e = new Date(),
      i = new Date(this._convertTime(t));
    if (e.getDay() === i.getDay() && e.getMonth() === i.getMonth()) {
      if (e.getHours() === i.getHours()) {
        return `${e.getMinutes() - i.getMinutes()}min`;
      }
      return `${e.getHours() - i.getHours()}h`;
    }
    const s = Math.abs(this._convertToDays(e) - this._convertToDays(i));
    return s < 31
      ? `${s}d`
      : "" +
          (1 === Math.trunc(s / 31)
            ? "1 Month Ago"
            : `${Math.trunc(s / 31)} months ago`);
  }
  _convertTime(t) {
    const e = t.split("T");
    return (
      (e[0] = e[0].slice(0, 4) + "-" + e[0].slice(4, 6) + "-" + e[0].slice(6)),
      (e[1] =
        e[1].slice(0, 2) + ":" + e[1].slice(2, 4) + ":" + e[1].slice(4) + "Z"),
      e.join("T")
    );
  }
  _convertToDays(t) {
    return (
      (Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) -
        Date.UTC(t.getFullYear(), 0, 0)) /
      24 /
      60 /
      60 /
      1e3
    );
  }
})();
var Fl = new (class extends Ol {
  _parentElement = document.querySelector(".main-container");
  _generateHTML() {
    return this._generateAboutSection() + this._generateStatisticsSection();
  }
  _generateAboutSection() {
    return this._data.summary && "None" !== this._data.summary.description
      ? `\n        <section>\n          <h1>About</h1>\n          <div class="sub-panel">\n            <p class="stock-description">\n            ${this._data.summary.description}\n            </p>\n\n            <ul>\n              <li>\n                <p><b>Industry</b></p>\n                <p>${this._data.summary.industry}</p>\n              </li>\n              <li>\n                <p><b>Employees</b></p>\n                <p>15,500</p>\n              </li>\n              <li>\n                <p><b>Headquarters</b></p>\n                <p>${this._data.summary.address}</p>\n              </li>\n              <li>\n                <p><b>Founded</b></p>\n                <p>1969</p>\n              </li>\n            </ul>\n          </div>\n        </section>\n        \n        `
      : "";
  }
  _generateStatisticsSection() {
    return `\n        <section>\n          <h1>Key statistics</h1>\n          <div class="sub-panel">\n            <ul>\n              <li>\n                <p><b>Market cap</b></p>\n                <p>${
      Number.isFinite(this._data.summary?.marketCapitalization)
        ? Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 2,
          }).format(this._data.summary?.marketCapitalization)
        : "-"
    }</p>\n              </li>\n              <li>\n                <p><b>Price-Earnings ratio</b></p>\n                <p>${
      this._data.peRatio.toFixed(2) || "-"
    }</p>\n              </li>\n              <li>\n                <p><b>Dividend yield</b></p>\n                <p>${
      this._data.divAmount ? this._data.divAmount : "-"
    }</p>\n              </li>\n              <li>\n                <p><b>Average volume</b></p>\n                <p>-</p>\n              </li>\n              <li>\n                <p><b>High today</b></p>\n                <p>${
      this._data.highPrice.toFixed(2) || "-"
    }</p>\n              </li>\n              <li>\n                <p><b>Low today</b></p>\n                <p>${
      this._data.lowPrice.toFixed(2) || "-"
    }</p>\n              </li>\n              <li>\n                <p><b>Open price</b></p>\n                <p>${
      this._data.openPrice.toFixed(2) || "-"
    }</p>\n              </li>\n              <li>\n                <p><b>Volume</b></p>\n                <p>${
      Number.isFinite(this._data.totalVolume)
        ? Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 2,
          }).format(this._data.totalVolume)
        : "-"
    }</p>\n              </li>\n              <li>\n                <p><b>52 Week high</b></p>\n                <p>${
      this._data["52WkHigh"].toFixed(2) || "-"
    }</p>\n              </li>\n              <li>\n                <p><b>52 Week low</b></p>\n                <p>${
      this._data["52WkLow"].toFixed(2) || "-"
    }</p>\n              </li>\n            </ul>\n          </div>\n        </section>\n        `;
  }
})();
ho.register(Dl);
var Hl = new (class extends Ol {
  _parentElement = document.querySelector(".main-container");
  constructor() {
    super();
  }
  addHandlerPortfolio(t) {
    ["hashchange", "load"].forEach((e) => window.addEventListener(e, t));
  }
  addHandlerPortfolioDate(t) {
    this._parentElement.addEventListener("click", function (e) {
      e.target.closest(".portfolio-dates") &&
        "" !== e.target.id &&
        t(e.target.id);
    });
  }
  _generateHTML() {
    return `\n    <div class="portfolio-container">\n        <div class="portfolio-chart-container">\n        ${this._generatePriceHTML()}\n          <canvas id="portfolio-chart"></canvas>\n        </div>\n\n        <ul class="portfolio-dates">\n          <li id="day">1D</li>\n          <li id="week">1W</li>\n          <li id="month">1M</li>\n          <li id="3month">3M</li>\n          <li id="ytd">YTD</li>\n          <li id="all">ALL</li>\n        </ul>\n        </div>\n        \n        ${
      this._data.symbol
        ? `\n        <div class="sub-panel" id="buying-power">\n          <div class="portfolio-bp">\n            <p>Buying Power</p>\n            <p id="available-bal">${this._formatCurrency(
            this._user.availableBal || "0.00"
          )}</p>\n         </div>\n        </div>\n        `
        : ""
    }\n        `;
  }
  _generatePriceHTML() {
    const t = this._data.summary?.name
      ? -1 != this._data.summary.name.indexOf("Inc")
        ? this._data.summary.name.slice(
            0,
            this._data.summary.name.indexOf("Inc")
          )
        : this._data.summary.name
      : -1;
    return `\n    <div class="chart-info">\n    ${
      -1 != t
        ? `<h1>${t}</h1>`
        : `<h1>${
            "portfolio" === this._data.symbol ? "" : this._data.symbol || ""
          }</h1>`
    }\n      <h1 class="ticker-price">${this._formatCurrency(
      +this._data.lastPrice
    )}</h1>\n      <span class="${this._generateColor(
      +this._data.netChange
    )} ticker-change">${this._generateSymbol(+this._data.netChange)}${Number(
      this._data.netChange
    ).toFixed(
      2
    )} \n        \n        <span>(${this._data.netPercentChangeInDouble.toFixed(
      2
    )}${
      0 === this._data.netPercentChangeInDouble ? "" : "%"
    })</span>\n      </span>\n        \n      <span class="ticker-date">${
      this._generateDate(this._data.quotes?.timePeriod) || ""
    }</span>\n    </div>\n    `;
  }
  updateChart() {
    const t = this._generateRGB(
        "day" === this._data.quotes.timePeriod
          ? this._data.netChange
          : this._data.quotes.prices.slice(-1)[0].close -
              this._data.quotes.prices[0].close
      ),
      e =
        "day" === this._data.quotes.timePeriod
          ? {
              type: "line",
              yMax: this._data.closePrice,
              yMin: this._data.closePrice,
              borderColor: "rgb(123, 123, 123)",
              borderDash: [1, 5],
            }
          : "",
      i = Math.max.apply(
        this,
        this._data.quotes.prices.map((t) => t.close)
      ),
      s = Math.min.apply(
        this,
        this._data.quotes.prices.map((t) => t.close)
      );
    (this.myChart.data.labels = this._data.quotes.dates),
      (this.myChart.data.datasets[0].data = this._data.quotes.prices.map(
        (t) => t.close
      )),
      (this.myChart.options.plugins.annotation.annotations.line1 = e),
      (this.myChart.options.borderColor = t),
      (this.myChart.options.scales.y.max =
        i - s != 0 ? i + (i - s) / 5 : void 0);
    const n = this.myChart.data.datasets[0].data.slice(-1)[0],
      o =
        "portfolio" === this._data.symbol
          ? this._data.closePrice
          : +n - +this._data.netChange;
    this._updatePrice(
      +n,
      "day" === this._data.quotes.timePeriod
        ? o
        : +this._data.quotes.prices[0].close
    ),
      this.myChart.update();
  }
  _generateChart() {
    const t = document.querySelector("#portfolio-chart"),
      e = this._generateRGB(
        "day" === this._data.quotes.timePeriod
          ? this._data.netChange
          : this._data.quotes.prices.slice(-1)[0].close -
              this._data.quotes.prices[0].close
      ),
      i =
        "day" === this._data.quotes.timePeriod
          ? {
              type: "line",
              yMax: this._data.closePrice,
              yMin: this._data.closePrice,
              borderColor: "rgb(123, 123, 123)",
              borderDash: [1, 5],
            }
          : "";
    Da.positioners.top = function (t, e) {
      const {
          chartArea: { top: i },
          scales: { x: s },
        } = this.chart,
        n = s.getValueForPixel(e.x),
        o = this.chart.data.datasets[0].data[n],
        a = this.chart.data.datasets[0].data.length;
      return { x: o ? s.getPixelForValue(n) : s.getPixelForValue(a - 1), y: i };
    };
    const s = Math.min.apply(
      null,
      this._data.quotes.prices.map((t) => t.close)
    );
    let n = Math.max.apply(
      null,
      this._data.quotes.prices.map((t) => t.close)
    );
    "day" === this._data.quotes.timePeriod &&
      this._data.closePrice > n &&
      (n = this._data.closePrice),
      (this.myChart = new ho(t, {
        type: "line",
        data: {
          labels: this._data.quotes.dates,
          datasets: [{ data: this._data.quotes.prices.map((t) => t.close) }],
        },
        options: {
          borderColor: e,
          onHover: this._onHover.bind(this),
          clip: !1,
          layout: { padding: { top: 15, left: 10, right: 10 } },
          interaction: {
            mode: "index",
            intersect: !1,
            axis: "x",
            animation: !1,
          },
          hover: { intersect: !1, axis: "x" },
          animation: { animation: !1 },
          elements: {
            point: { radius: 0, hoverRadius: 6, backgroundColor: e, zindex: 1 },
          },
          plugins: {
            annotation: { annotations: { line1: i } },
            legend: { display: !1 },
            tooltip: {
              enabled: !0,
              backgroundColor: "#ffffff",
              displayColors: !1,
              titleColor: "#939393",
              bodyColor: "rgba(0, 0, 0, 0)",
              xAlign: "center",
              yAlign: "center",
              titleFont: { weight: "lighter", size: "16" },
              position: "top",
              callbacks: { label: () => null },
            },
          },
          scales: {
            y: {
              display: !1,
              grid: { display: !1 },
              max: n - s != 0 ? n + (n - s) / 5 : void 0,
            },
            x: { display: !1, grid: { display: !1 } },
          },
        },
        plugins: [
          { id: "clearHover", afterEvent: this._onMouseOut.bind(this) },
        ],
      }));
  }
  _generateDate(t) {
    switch (t) {
      case "day":
        return "Today";
      case "week":
        return "Past week";
      case "month":
        return "Past month";
      case "3month":
        return "Past 3 months";
      case "ytd":
        return "Year to date";
      case "all":
        return "Past 5 years";
    }
  }
  _updatePrice(t, e) {
    const i = document.querySelector(".ticker-price"),
      s = document.querySelector(".ticker-change"),
      n = document.querySelector(".ticker-date"),
      o = s.classList[0],
      a = (t - e).toFixed(2),
      r = (((t - e) / e) * 100).toFixed(2);
    (i.innerHTML = this._formatCurrency(t)),
      s.classList.replace(o, this._generateColor(r)),
      (s.textContent = `${this._generateSymbol(a)}${a} (${r}%)`),
      (n.textContent = this._generateDate(this._data.quotes.timePeriod));
  }
  renderUserBalance(t) {
    this._parentElement.querySelector(
      "#available-bal"
    ).textContent = `${this._formatCurrency(t.availableBal)}`;
  }
  _onHover(t, e, i) {
    if (e.length <= 0) return;
    const s = this._generateRGB(
        "day" === this._data.quotes.timePeriod
          ? this._data.netChange
          : this._data.quotes.prices.slice(-1)[0].close -
              this._data.quotes.prices[0].close
      ),
      n = i.data.labels[e[0].index],
      o = i.data.datasets[0].data[e[0].index];
    let a;
    "day" === this._data.quotes.timePeriod &&
      ((i.options.borderColor = s.slice(0, -1) + ",.25)"),
      (a = this._data.quotes.preDates.includes(n)
        ? "preDates"
        : this._data.quotes.intraDates.includes(n)
        ? "intraDates"
        : "postDates"),
      (i.data.datasets[0].segment = {
        borderColor: (t) =>
          this._data.quotes[`${a}`].includes(i.data.labels[t.p0DataIndex])
            ? s
            : void 0,
      })),
      (i.options.plugins.annotation.annotations.verticalLine = {
        type: "line",
        xMin: n,
        xMax: n,
        borderColor: "#BFBFBF",
        borderWidth: 2,
        drawTime: "beforeDraw",
      }),
      (i.options.elements.point.backgroundColor = s),
      "day" === this._data.quotes.timePeriod
        ? this._updatePrice(+o.toFixed(2), +this._data.closePrice)
        : this._updatePrice(+o.toFixed(2), +this._data.quotes.prices[0].close),
      i.update();
  }
  _onMouseOut(t, e, i) {
    if ("mouseout" === e.event.type) {
      const e = this._generateRGB(
        "day" === this._data.quotes.timePeriod
          ? this._data.netChange
          : this._data.quotes.prices.slice(-1)[0].close -
              this._data.quotes.prices[0].close
      );
      (t.options.plugins.annotation.annotations.verticalLine = null),
        (t.data.datasets[0].segment = null),
        (t.options.borderColor = e),
        this._updatePrice(
          +this._data.lastPrice,
          "day" === this._data.quotes.timePeriod
            ? +this._data.lastPrice - +this._data.netChange
            : +this._data.quotes.prices[0].close
        ),
        t.update();
    }
  }
})();
var zl = new (class extends Ol {
  _parentElement = document.querySelector("body");
  addHandlerHomeButton(t) {
    this._parentElement.addEventListener("click", function (e) {
      e.target.closest(".home-btn") && t();
    });
  }
  _generateHTML() {
    return '\n        <div class="missing-page">\n        <div class="missing-text">\n          <section>\n            <h1>\n              404<br />\n              Page Not Found\n            </h1>\n          </section>\n          <p>Can\'t seem to find that page! Click to return home.</p>\n          <button class="home-btn">Home</button>\n        </div>\n        <div class="missing-img">\n          <img src="images/404-error.png" alt="" />\n        </div>\n      </div>\n        ';
  }
  renderStart() {
    this.clear(),
      (window.location.hash = "#"),
      this._parentElement.insertAdjacentHTML(
        "afterBegin",
        '\n    <header>\n      <a href="#">\n        <img src="images/bamboo_logo.png" alt="main-logo-home" />\n      </a>\n      <form action="">\n        <label for="search_input"></label>\n        <input type="text" id="search_input" placeholder="Search" />\n      </form>\n\n      <nav>\n        <ul>\n          <li>Portfolio</li>\n          <li>About</li>\n          <li>Logout</li>\n        </ul>\n      </nav>\n    </header>\n\n    <main class="app-container">\n      <div class="main-container">\n      </div>\n\n      <aside class="aside-container">\n      </aside>\n    </main>\n    '
      );
  }
})();
var Bl = new (class extends Ol {
  _parentElement = document.querySelector(".main-container");
  _generateHTML() {
    return this._currentStock
      ? `\n    <section>\n        <div class="sub-panel-stocks">\n\n        ${this._generateEquityPanel()}\n\n        ${this._generateCostPanel()}\n\n        </div>\n    </section>\n    `
      : "";
  }
  _generateEquityPanel() {
    return `\n    <div class="user-stock-panel equity-panel">\n        <div class="user-stock-info">\n            <h4>Your Equity</h4>\n            <h1>${this._formatCurrency(
      this._data.lastPrice * this._currentStock.quantity
    )}</h1>\n        </div>\n        <div class="user-stock-stats">\n            <p>Today's Return</p>\n            <p>${this._generateTodayReturnHTML()}</p>\n        </div>\n        <hr />\n        <div class="user-stock-stats">\n            <p>Total Return</p>\n            <p>${this._generateTotalReturnHTML()}</p>\n        </div>\n    </div>\n    `;
  }
  _generateCostPanel() {
    return `\n    <div class="user-stock-panel cost-panel">\n        <div class="user-stock-info">\n            <h4>Your average cost</h4>\n            <h1>${this._formatCurrency(
      this._currentStock.avgPrice
    )}</h1>\n        </div>\n\n        <div class="user-stock-stats">\n            <p>Date purchased</p>\n            <p>${new Intl.DateTimeFormat(
      "en-US",
      p
    ).format(
      this._currentStock.date
    )}</p>\n        </div>\n        <hr/>\n\n        <div class="user-stock-stats">\n            <p>Quantity</p>\n            <p>${
      this._currentStock.quantity
    }</p>\n        </div>\n    </div>\n    `;
  }
  _generateTotalReturnHTML() {
    const t =
        (this._data.lastPrice - this._currentStock.avgPrice) *
        this._currentStock.quantity,
      e = this._formatCurrency(t),
      i =
        ((this._data.lastPrice - this._currentStock.avgPrice) /
          this._data.lastPrice) *
        100;
    return `${this._generateSymbol(t)}${e} (${i.toFixed(2)}%)`;
  }
  _generateTodayReturnHTML() {
    const t = this._currentStock.quantity * this._data.netChange,
      e = this._formatCurrency(t),
      i = this._data.netPercentChangeInDouble;
    return new Date().getFullYear() ===
      new Date(this._currentStock.date).getFullYear() &&
      new Date().getMonth() === new Date(this._currentStock.date).getMonth() &&
      new Date().getDate() === new Date(this._currentStock.date).getDate()
      ? this._generateTotalReturnHTML()
      : `${this._generateSymbol(t)}${e} (${i.toFixed(2)}%)`;
  }
})();
var Vl = new (class extends Ol {
  _parentElement = document.querySelector("header");
  constructor() {
    super(), this.addHandlerNav();
  }
  addHandlerNav(t) {
    this._parentElement.addEventListener("click", function (e) {
      "portfolio" === e.target.id && (window.location.href = "#"),
        "logout" === e.target.id && t();
    });
  }
  addHandlerLogout(t) {
    this._parentElement.addEventListener("click", function (e) {
      "logout" === e.target.id && t();
    });
  }
})();
new (class extends Ol {
  mainPage = document.querySelector("body");
  searchBar = document.querySelector("#search_input");
  resultsHTML = document.querySelector("#results");
  constructor() {
    super(),
      this.addSearchHandler(),
      this.addResultsHandler(),
      this.addPageHandler();
  }
  addSearchHandler() {
    ["input"].forEach((t) =>
      this.searchBar.addEventListener(t, this.autoComplete.bind(this))
    );
  }
  addResultsHandler() {
    this.resultsHTML.addEventListener("click", this.setResultsHTML.bind(this));
  }
  addPageHandler() {
    this.mainPage.addEventListener("click", this.hideResults.bind(this));
  }
  async autoComplete(t) {
    let e = [];
    const i = this.searchBar.value;
    if (
      ((this.resultsHTML.innerHTML = ""),
      this.resultsHTML.classList.add("hidden"),
      i && i.length > 1)
    ) {
      if (
        ((e = await this.getSearchResults(i.toUpperCase())),
        this.resultsHTML.classList.remove("hidden"),
        !e)
      )
        return;
      if (((this.searchBar.style.borderBottom = "none"), 0 === e.length))
        return void (this.resultsHTML.innerHTML =
          "<li>We were unable to find any results for your search.</li>");
      const t = e.length >= 10 ? 10 : e.length;
      for (let i = 0; i < t; i++)
        this.resultsHTML.innerHTML += `<li class='auto-ticker' id='${e[i][0]}'><p>${e[i][1]}</p> <p>${e[i][0]}</p></li>`;
    }
  }
  async getSearchResults(t) {
    const e = [],
      i = await m;
    let s = !1;
    for (let n = 0; n < i.length; n++)
      t === i[n][1]?.slice(0, t.length).toUpperCase() &&
        (e.push(i[n]), (s = !0));
    return e;
  }
  setResultsHTML(t) {
    (window.location.hash = "#stocks/" + t.target.closest(".auto-ticker")?.id),
      (this.resultsHTML.innerHTML = ""),
      (this.searchBar.value = "");
  }
  hideResults(t) {
    t.target !== this.searchBar &&
      ((this.resultsHTML.innerHTML = ""),
      this.resultsHTML.classList.add("hidden"),
      (this.searchBar.style.borderBottom = "1px solid black"),
      (this.searchBar.value = ""));
  }
})();
const Wl = async function () {
    try {
      if (window.location.hash) return;
      Hl.renderLoad(),
        Al.renderLoad(),
        Il.renderLoad(),
        await M(),
        await (async function () {
          try {
            const t = await v("portfolio", "day", !1);
            (_.stock = {}),
              (_.stock.symbol = "portfolio"),
              (_.stock.lastPrice = t.prices[t.prices.length - 1].close),
              (_.stock.netChange = _.stock.lastPrice - t.prices[0].previous),
              (_.stock.netPercentChangeInDouble =
                ((_.stock.lastPrice - t.prices[0].previous) /
                  t.prices[0].previous) *
                100),
              (_.stock.closePrice = t.prices[0].previous),
              (_.stock.quotes = t),
              (_.stock.quotes.timePeriod = "day");
          } catch (t) {
            console.error(t);
          }
        })(),
        await D(),
        Hl.clear(),
        Al.clear(),
        Hl.render(_),
        setInterval(async () => {
          "day" == _.stock.quotes.timePeriod &&
            y() &&
            (await P("day"), Hl.updateChart());
        }, 7500),
        Al.render(_),
        _.stock.news && Il.render(_);
    } catch (t) {
      "401" === t.message &&
        (console.error("CALLED ERROR: " + t.message),
        setTimeout(() => {
          window.location.href = l;
        }, 2e4));
    }
  },
  jl = async function () {
    try {
      const t = window.location.hash.indexOf("/") + 1,
        e = window.location.hash.slice(t);
      if (!e) return;
      await M(e),
        Hl.renderLoad(),
        $l.renderLoad(),
        Il.renderLoad(),
        window.scrollTo(0, 0),
        await (async function () {
          try {
            const t = await b(r + "user/" + `${c}`);
            if (!t) return;
            _.watched = [...Object.values(t)];
          } catch (t) {
            throw t;
          }
        })(),
        await S(e),
        await C(e),
        await D(e),
        Hl.clear(),
        Al.clear(),
        Hl.render(_),
        setInterval(async () => {
          "day" == _.stock.quotes.timePeriod &&
            y() &&
            (await P("day"), Hl.updateChart());
        }, 7500),
        $l.render(_),
        Bl.render(_),
        Fl.render(_),
        _.stock.news && Il.render(_);
    } catch (t) {
      "Ticker not Found" === t.message
        ? (zl.clear(), zl.render())
        : (console.error(t),
          "401" === t.message &&
            (console.error(t),
            setTimeout(() => {
              window.location.href = l;
            }, 3e3)));
    }
  },
  Nl = function (t, e) {
    !(function (t, e) {
      try {
        (_.stock.purchaseType = t), (_.stock.tradeType = e);
      } catch (t) {
        console.error(t);
      }
    })(t, e),
      $l.clear(),
      $l.render(_);
  },
  ql = function (t) {
    $l.clear(), $l.render(_);
  },
  Yl = async function (t, e, i, s) {
    await (async function (t, e, i, s) {
      try {
        const n =
          "buy" === s
            ? await x(r + "user/purchase", {
                orderBuyIn: t,
                orderValue: e,
                symbol: i,
              })
            : await x(r + "user/sell", {
                orderBuyIn: t,
                orderValue: e,
                symbol: i,
              });
        "all shares sold" === (await n.text()) && delete _.stock.tradeType;
      } catch (t) {
        console.error(t);
      }
    })(t, e.toString(), i, s),
      await (async function () {
        try {
          const {
            firstName: t,
            userName: e,
            portfolio: { stocks: i, availableBalance: s },
          } = await b(r + "user");
          (_.firstName = t),
            (_.userName = e),
            (_.availableBal = s),
            (_.userStocks = i);
        } catch (t) {
          console.error(t);
        }
      })(),
      Hl.clear(),
      $l.clear(),
      Hl.render(_),
      $l.render(_),
      Bl.render(_),
      Fl.render(_);
  },
  Xl = function () {
    try {
      zl.renderStart();
    } catch (t) {
      console.error(t);
    }
  },
  Ul = function (t) {
    try {
      !(async function (t) {
        try {
          await x(r + "user/portfolio/watchlist", { ticker: t });
        } catch (t) {
          console.error(t);
        }
      })(t),
        $l.updateWatchlistIMG();
    } catch (t) {
      console.error(t);
    }
  },
  Gl = async function (t) {
    await P(t), Hl.updateChart();
  },
  Jl = function () {
    try {
      !(async function () {
        try {
          console.log("LOGGED OUT"),
            "success" ===
              (
                await b(
                  "https://bamboospring-production.up.railway.app/auth/logout"
                )
              ).response && (window.location.href = "/");
        } catch (t) {
          throw t;
        }
      })();
    } catch (t) {}
  };
Hl.addHandlerPortfolio(Wl),
  Hl.addHandlerPortfolio(jl),
  Hl.addHandlerPortfolioDate(Gl),
  $l.addHandlerInput(Nl),
  $l.addHandlerWatchlist(Ul),
  $l.addHandlerPurchaseForm(ql),
  $l.addHandlerSubmit(Yl),
  zl.addHandlerHomeButton(Xl),
  Vl.addHandlerLogout(Jl);
//# sourceMappingURL=index.cd2be5b8.js.map
