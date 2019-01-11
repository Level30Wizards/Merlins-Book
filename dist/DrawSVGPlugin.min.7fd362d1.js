// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"plugins/DrawSVGPlugin.min.js":[function(require,module,exports) {
var global = arguments[3];
var define;
/*!
 * VERSION: 0.2.0
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * DrawSVGPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;

(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";

  function a(a, b, c, d, e, f) {
    return c = (parseFloat(c || 0) - parseFloat(a || 0)) * e, d = (parseFloat(d || 0) - parseFloat(b || 0)) * f, Math.sqrt(c * c + d * d);
  }

  function b(a) {
    return "string" != typeof a && a.nodeType || (a = _gsScope.TweenLite.selector(a), a.length && (a = a[0])), a;
  }

  function c(a, b, c) {
    var d,
        e,
        f = a.indexOf(" ");
    return -1 === f ? (d = void 0 !== c ? c + "" : a, e = a) : (d = a.substr(0, f), e = a.substr(f + 1)), d = -1 !== d.indexOf("%") ? parseFloat(d) / 100 * b : parseFloat(d), e = -1 !== e.indexOf("%") ? parseFloat(e) / 100 * b : parseFloat(e), d > e ? [e, d] : [d, e];
  }

  function d(c) {
    if (!c) return 0;
    c = b(c);
    var d,
        e,
        f,
        g,
        h,
        j,
        l,
        m = c.tagName.toLowerCase(),
        n = 1,
        o = 1;
    "non-scaling-stroke" === c.getAttribute("vector-effect") && (o = c.getScreenCTM(), n = Math.sqrt(o.a * o.a + o.b * o.b), o = Math.sqrt(o.d * o.d + o.c * o.c));

    try {
      e = c.getBBox();
    } catch (p) {
      console.log("Error: Some browsers like Firefox won't report measurements of invisible elements (like display:none or masks inside defs).");
    }

    if (e && (e.width || e.height) || !k[m] || (e = {
      width: parseFloat(c.getAttribute(k[m][0])),
      height: parseFloat(c.getAttribute(k[m][1]))
    }, "rect" !== m && "line" !== m && (e.width *= 2, e.height *= 2), "line" === m && (e.x = parseFloat(c.getAttribute("x1")), e.y = parseFloat(c.getAttribute("y1")), e.width = Math.abs(e.width - e.x), e.height = Math.abs(e.height - e.y))), "path" === m) g = c.style.strokeDasharray, c.style.strokeDasharray = "none", d = c.getTotalLength() || 0, n !== o && console.log("Warning: <path> length cannot be measured accurately when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."), d *= (n + o) / 2, c.style.strokeDasharray = g;else if ("rect" === m) d = 2 * e.width * n + 2 * e.height * o;else if ("line" === m) d = a(e.x, e.y, e.x + e.width, e.y + e.height, n, o);else if ("polyline" === m || "polygon" === m) for (f = c.getAttribute("points").match(i) || [], "polygon" === m && f.push(f[0], f[1]), d = 0, h = 2; h < f.length; h += 2) {
      d += a(f[h - 2], f[h - 1], f[h], f[h + 1], n, o) || 0;
    } else ("circle" === m || "ellipse" === m) && (j = e.width / 2 * n, l = e.height / 2 * o, d = Math.PI * (3 * (j + l) - Math.sqrt((3 * j + l) * (j + 3 * l))));
    return d || 0;
  }

  function e(a, c) {
    if (!a) return [0, 0];
    a = b(a), c = c || d(a) + 1;
    var e = h(a),
        f = e.strokeDasharray || "",
        g = parseFloat(e.strokeDashoffset),
        i = f.indexOf(",");
    return 0 > i && (i = f.indexOf(" ")), f = 0 > i ? c : parseFloat(f.substr(0, i)) || 1e-5, f > c && (f = c), [Math.max(0, -g), Math.max(0, f - g)];
  }

  var f,
      g = _gsScope.document,
      h = g.defaultView ? g.defaultView.getComputedStyle : function () {},
      i = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
      j = -1 !== ((_gsScope.navigator || {}).userAgent || "").indexOf("Edge"),
      k = {
    rect: ["width", "height"],
    circle: ["r", "r"],
    ellipse: ["rx", "ry"],
    line: ["x2", "y2"]
  };
  f = _gsScope._gsDefine.plugin({
    propName: "drawSVG",
    API: 2,
    version: "0.2.0",
    global: !0,
    overwriteProps: ["drawSVG"],
    init: function init(a, b, f, g) {
      if (!a.getBBox) return !1;
      var i,
          k,
          l,
          m,
          n = d(a) + 1;
      return this._style = a.style, this._target = a, "function" == typeof b && (b = b(g, a)), b === !0 || "true" === b ? b = "0 100%" : b ? -1 === (b + "").indexOf(" ") && (b = "0 " + b) : b = "0 0", i = e(a, n), k = c(b, n, i[0]), this._length = n + 10, 0 === i[0] && 0 === k[0] ? (l = Math.max(1e-5, k[1] - n), this._dash = n + l, this._offset = n - i[1] + l, this._offsetPT = this._addTween(this, "_offset", this._offset, n - k[1] + l, "drawSVG")) : (this._dash = i[1] - i[0] || 1e-6, this._offset = -i[0], this._dashPT = this._addTween(this, "_dash", this._dash, k[1] - k[0] || 1e-5, "drawSVG"), this._offsetPT = this._addTween(this, "_offset", this._offset, -k[0], "drawSVG")), j && (m = h(a), m.strokeLinecap !== m.strokeLinejoin && (k = parseFloat(m.strokeMiterlimit), this._addTween(a.style, "strokeMiterlimit", k, k + 1e-4, "strokeMiterlimit"))), this._live = "non-scaling-stroke" === a.getAttribute("vector-effect") || -1 !== (b + "").indexOf("live"), !0;
    },
    set: function set(a) {
      if (this._firstPT) {
        if (this._live) {
          var b,
              c = d(this._target) + 11;
          c !== this._length && (b = c / this._length, this._length = c, this._offsetPT.s *= b, this._offsetPT.c *= b, this._dashPT ? (this._dashPT.s *= b, this._dashPT.c *= b) : this._dash *= b);
        }

        this._super.setRatio.call(this, a), this._style.strokeDashoffset = this._offset, 1 === a || 0 === a ? this._style.strokeDasharray = this._offset < .001 && this._length - this._dash <= 10 ? "none" : this._offset === this._dash ? "0px, 999999px" : this._dash + "px," + this._length + "px" : this._style.strokeDasharray = this._dash + "px," + this._length + "px";
      }
    }
  }), f.getLength = d, f.getPosition = e;
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (a) {
  "use strict";

  var b = function b() {
    return (_gsScope.GreenSockGlobals || _gsScope)[a];
  };

  "undefined" != typeof module && module.exports ? (require("../TweenLite.min.js"), module.exports = b()) : "function" == typeof define && define.amd && define(["TweenLite"], b);
}("DrawSVGPlugin");
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49803" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","plugins/DrawSVGPlugin.min.js"], null)
//# sourceMappingURL=/DrawSVGPlugin.min.7fd362d1.map