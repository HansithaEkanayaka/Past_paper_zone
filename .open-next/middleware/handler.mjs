
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "4.1.0";globalThis.nextVersion = "16.3.0";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_0_kjzx3.js
var require_node_modules_next_dist_esm_build_templates_edge_wrapper_0_kjzx3 = __commonJS({
  ".next/server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_0_kjzx3.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_0_kjzx3.js", 35825, (e, t, l) => {
      self._ENTRIES ||= {};
      let n = Promise.resolve().then(() => e.i(58217));
      n.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(n, { get(e2, t2) {
        if ("then" === t2) return (t3, l3) => e2.then(t3, l3);
        let l2 = (...l3) => e2.then((e3) => (0, e3[t2])(...l3));
        return l2.then = (l3, n2) => e2.then((e3) => e3[t2]).then(l3, n2), l2;
      } });
    }]);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__1867t5a._.js
var require_root_of_the_server_1867t5a = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__1867t5a._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__1867t5a._.js", 74398, (e, t, r) => {
    }, 28042, (e, t, r) => {
      "use strict";
      var n = Object.defineProperty, s = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, a = Object.prototype.hasOwnProperty, o = {}, l = { RequestCookies: () => g, ResponseCookies: () => m, parseCookie: () => d, parseSetCookie: () => h, stringifyCookie: () => c };
      for (var u in l) n(o, u, { get: l[u], enumerable: true });
      function c(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function d(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, s2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != s2 ? s2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function h(e2) {
        if (!e2) return;
        let [[t2, r2], ...n2] = d(e2), { domain: s2, expires: i2, httponly: a2, maxage: o2, path: l2, samesite: u2, secure: c2, partitioned: h2, priority: g2 } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var m2, _, y = { name: t2, value: decodeURIComponent(r2), domain: s2, ...i2 && { expires: new Date(i2) }, ...a2 && { httpOnly: true }, ..."string" == typeof o2 && { maxAge: Number(o2) }, path: l2, ...u2 && { sameSite: p.includes(m2 = (m2 = u2).toLowerCase()) ? m2 : void 0 }, ...c2 && { secure: true }, ...g2 && { priority: f.includes(_ = (_ = g2).toLowerCase()) ? _ : void 0 }, ...h2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in y) y[t3] && (e3[t3] = y[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let o2 of i(t2)) a.call(e2, o2) || void 0 === o2 || n(e2, o2, { get: () => t2[o2], enumerable: !(r2 = s(t2, o2)) || r2.enumerable });
        return e2;
      })(n({}, "__esModule", { value: true }), o);
      var p = ["strict", "lax", "none"], f = ["low", "medium", "high"], g = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const t2 = e2.get("cookie");
          if (t2) for (const [e3, r2] of d(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => c(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => c(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, m = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const s2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (const e3 of Array.isArray(s2) ? s2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, s3, i2, a2 = [], o2 = 0;
            function l2() {
              for (; o2 < e4.length && /\s/.test(e4.charAt(o2)); ) o2 += 1;
              return o2 < e4.length;
            }
            for (; o2 < e4.length; ) {
              for (t3 = o2, i2 = false; l2(); ) if ("," === (r3 = e4.charAt(o2))) {
                for (n3 = o2, o2 += 1, l2(), s3 = o2; o2 < e4.length && "=" !== (r3 = e4.charAt(o2)) && ";" !== r3 && "," !== r3; ) o2 += 1;
                o2 < e4.length && "=" === e4.charAt(o2) ? (i2 = true, o2 = s3, a2.push(e4.substring(t3, n3)), t3 = o2) : o2 = n3 + 1;
              } else o2 += 1;
              (!i2 || o2 >= e4.length) && a2.push(e4.substring(t3, e4.length));
            }
            return a2;
          }(s2)) {
            const t3 = h(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, s2 = this._parsed;
          return s2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = c(r3);
              t3.append("set-cookie", e4);
            }
          }(s2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(c).join("; ");
        }
      };
    }, 59110, (e, t, r) => {
      (() => {
        "use strict";
        let r2, n, s, i, a;
        var o, l, u, c, d, h, p, f, g, m, _, y, b, w, v, E, S = { 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let n2 = r3(108), s2 = r3(221), i2 = r3(44), a2 = "context", o2 = new n2.NoopContextManager();
          t2.ContextAPI = class e3 {
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalContextManager(e4) {
              return (0, s2.registerGlobal)(a2, e4, i2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e4, t3, r4, ...n3) {
              return this._getContextManager().with(e4, t3, r4, ...n3);
            }
            bind(e4, t3) {
              return this._getContextManager().bind(e4, t3);
            }
            _getContextManager() {
              return (0, s2.getGlobal)(a2) || o2;
            }
            disable() {
              this._getContextManager().disable(), (0, s2.unregisterGlobal)(a2, i2.DiagAPI.instance());
            }
          };
        }, 44: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let n2 = r3(757), s2 = r3(412), i2 = r3(711), a2 = r3(221);
          t2.DiagAPI = class e3 {
            constructor() {
              function e4(e5) {
                return function(...t4) {
                  let r4 = (0, a2.getGlobal)("diag");
                  if (r4) return r4[e5](...t4);
                };
              }
              const t3 = this;
              t3.setLogger = (e5, r4 = { logLevel: i2.DiagLogLevel.INFO }) => {
                var n3, o2, l2;
                if (e5 === t3) {
                  let e6 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (n3 = e6.stack) ? n3 : e6.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let u2 = (0, a2.getGlobal)("diag"), c2 = (0, s2.createLogLevelDiagLogger)(null != (o2 = r4.logLevel) ? o2 : i2.DiagLogLevel.INFO, e5);
                if (u2 && !r4.suppressOverrideMessage) {
                  let e6 = null != (l2 = Error().stack) ? l2 : "<failed to generate stacktrace>";
                  u2.warn(`Current logger will be overwritten from ${e6}`), c2.warn(`Current logger will overwrite one already registered from ${e6}`);
                }
                return (0, a2.registerGlobal)("diag", c2, t3, true);
              }, t3.disable = () => {
                (0, a2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e5) => new n2.DiagComponentLogger(e5), t3.verbose = e4("verbose"), t3.debug = e4("debug"), t3.info = e4("info"), t3.warn = e4("warn"), t3.error = e4("error");
            }
            static instance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
          };
        }, 262: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let n2 = r3(586), s2 = r3(221), i2 = r3(44), a2 = "metrics";
          t2.MetricsAPI = class e3 {
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalMeterProvider(e4) {
              return (0, s2.registerGlobal)(a2, e4, i2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, s2.getGlobal)(a2) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e4, t3, r4) {
              return this.getMeterProvider().getMeter(e4, t3, r4);
            }
            disable() {
              (0, s2.unregisterGlobal)(a2, i2.DiagAPI.instance());
            }
          };
        }, 25: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let n2 = r3(221), s2 = r3(19), i2 = r3(92), a2 = r3(398), o2 = r3(504), l2 = r3(44), u2 = "propagation", c2 = new s2.NoopTextMapPropagator();
          t2.PropagationAPI = class e3 {
            constructor() {
              this.createBaggage = o2.createBaggage, this.getBaggage = a2.getBaggage, this.getActiveBaggage = a2.getActiveBaggage, this.setBaggage = a2.setBaggage, this.deleteBaggage = a2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalPropagator(e4) {
              return (0, n2.registerGlobal)(u2, e4, l2.DiagAPI.instance());
            }
            inject(e4, t3, r4 = i2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e4, t3, r4);
            }
            extract(e4, t3, r4 = i2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e4, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(u2, l2.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(u2) || c2;
            }
          };
        }, 397: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let n2 = r3(221), s2 = r3(498), i2 = r3(477), a2 = r3(793), o2 = r3(44), l2 = "trace";
          t2.TraceAPI = class e3 {
            constructor() {
              this._proxyTracerProvider = new s2.ProxyTracerProvider(), this.wrapSpanContext = i2.wrapSpanContext, this.isSpanContextValid = i2.isSpanContextValid, this.deleteSpan = a2.deleteSpan, this.getSpan = a2.getSpan, this.getActiveSpan = a2.getActiveSpan, this.getSpanContext = a2.getSpanContext, this.setSpan = a2.setSpan, this.setSpanContext = a2.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalTracerProvider(e4) {
              let t3 = (0, n2.registerGlobal)(l2, this._proxyTracerProvider, o2.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e4), t3;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(l2) || this._proxyTracerProvider;
            }
            getTracer(e4, t3) {
              return this.getTracerProvider().getTracer(e4, t3);
            }
            disable() {
              (0, n2.unregisterGlobal)(l2, o2.DiagAPI.instance()), this._proxyTracerProvider = new s2.ProxyTracerProvider();
            }
          };
        }, 398: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let n2 = r3(912), s2 = (0, r3(23).createContextKey)("OpenTelemetry Baggage Key");
          function i2(e3) {
            return e3.getValue(s2) || void 0;
          }
          t2.getBaggage = i2, t2.getActiveBaggage = function() {
            return i2(n2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(s2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(s2);
          };
        }, 152: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0, t2.BaggageImpl = class e3 {
            constructor(e4) {
              this._entries = e4 ? new Map(e4) : /* @__PURE__ */ new Map();
            }
            getEntry(e4) {
              let t3 = this._entries.get(e4);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e4, t3]) => [e4, t3]);
            }
            setEntry(t3, r3) {
              let n2 = new e3(this._entries);
              return n2._entries.set(t3, r3), n2;
            }
            removeEntry(t3) {
              let r3 = new e3(this._entries);
              return r3._entries.delete(t3), r3;
            }
            removeEntries(...t3) {
              let r3 = new e3(this._entries);
              for (let e4 of t3) r3._entries.delete(e4);
              return r3;
            }
            clear() {
              return new e3();
            }
          };
        }, 647: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 504: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let n2 = r3(44), s2 = r3(152), i2 = r3(647), a2 = n2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new s2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (a2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: i2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 778: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(912).ContextAPI.getInstance();
        }, 108: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let n2 = r3(23);
          t2.NoopContextManager = class {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...n3) {
              return t3.call(r4, ...n3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 23: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          }, t2.ROOT_CONTEXT = new class e3 {
            constructor(t3) {
              const r3 = this;
              r3._currentContext = t3 ? new Map(t3) : /* @__PURE__ */ new Map(), r3.getValue = (e4) => r3._currentContext.get(e4), r3.setValue = (t4, n2) => {
                let s2 = new e3(r3._currentContext);
                return s2._currentContext.set(t4, n2), s2;
              }, r3.deleteValue = (t4) => {
                let n2 = new e3(r3._currentContext);
                return n2._currentContext.delete(t4), n2;
              };
            }
          }();
        }, 304: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(44).DiagAPI.instance();
        }, 757: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let n2 = r3(221);
          function s2(e3, t3, r4) {
            let s3 = (0, n2.getGlobal)("diag");
            if (s3) return r4.unshift(t3), s3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return s2("debug", this._namespace, e3);
            }
            error(...e3) {
              return s2("error", this._namespace, e3);
            }
            info(...e3) {
              return s2("info", this._namespace, e3);
            }
            warn(...e3) {
              return s2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return s2("verbose", this._namespace, e3);
            }
          };
        }, 83: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              }(r3[e3].c);
            }
          };
        }, 412: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let n2 = r3(711);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, n3) {
              let s2 = t3[r5];
              return "function" == typeof s2 && e3 >= n3 ? s2.bind(t3) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", n2.DiagLogLevel.ERROR), warn: r4("warn", n2.DiagLogLevel.WARN), info: r4("info", n2.DiagLogLevel.INFO), debug: r4("debug", n2.DiagLogLevel.DEBUG), verbose: r4("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 711: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, (r3 = t2.DiagLogLevel || (t2.DiagLogLevel = {}))[r3.NONE = 0] = "NONE", r3[r3.ERROR = 30] = "ERROR", r3[r3.WARN = 50] = "WARN", r3[r3.INFO = 60] = "INFO", r3[r3.DEBUG = 70] = "DEBUG", r3[r3.VERBOSE = 80] = "VERBOSE", r3[r3.ALL = 9999] = "ALL";
        }, 221: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let n2 = r3(678), s2 = r3(652), i2 = r3(662), a2 = s2.VERSION.split(".")[0], o2 = Symbol.for(`opentelemetry.js.api.${a2}`), l2 = n2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, n3 = false) {
            var i3;
            let a3 = l2[o2] = null != (i3 = l2[o2]) ? i3 : { version: s2.VERSION };
            if (!n3 && a3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (a3.version !== s2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${a3.version} for ${e3} does not match previously registered API v${s2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return a3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${s2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let n3 = null == (t3 = l2[o2]) ? void 0 : t3.version;
            if (n3 && (0, i2.isCompatible)(n3)) return null == (r4 = l2[o2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${s2.VERSION}.`);
            let r4 = l2[o2];
            r4 && delete r4[e3];
          };
        }, 662: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let n2 = r3(652), s2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function i2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), n3 = e3.match(s2);
            if (!n3) return () => false;
            let i3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != i3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function a2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let n4 = e4.match(s2);
              if (!n4) return a2(e4);
              let o2 = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              if (null != o2.prerelease || i3.major !== o2.major) return a2(e4);
              if (0 === i3.major) return i3.minor === o2.minor && i3.patch <= o2.patch ? (t3.add(e4), true) : a2(e4);
              return i3.minor <= o2.minor ? (t3.add(e4), true) : a2(e4);
            };
          }
          t2._makeCompatibilityCheck = i2, t2.isCompatible = i2(n2.VERSION);
        }, 120: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(262).MetricsAPI.getInstance();
        }, 532: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, (r3 = t2.ValueType || (t2.ValueType = {}))[r3.INT = 0] = "INT", r3[r3.DOUBLE = 1] = "DOUBLE";
        }, 440: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class n2 {
          }
          t2.NoopMetric = n2;
          class s2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = s2;
          class i2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = i2;
          class a2 extends n2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = a2;
          class o2 {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = o2;
          class l2 extends o2 {
          }
          t2.NoopObservableCounterMetric = l2;
          class u2 extends o2 {
          }
          t2.NoopObservableGaugeMetric = u2;
          class c2 extends o2 {
          }
          t2.NoopObservableUpDownCounterMetric = c2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new s2(), t2.NOOP_HISTOGRAM_METRIC = new a2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new i2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new l2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new u2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new c2(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 586: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let n2 = r3(440);
          class s2 {
            getMeter(e3, t3, r4) {
              return n2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = s2, t2.NOOP_METER_PROVIDER = new s2();
        }, 678: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), s2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), s2(r3(59), t2);
        }, 460: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 59: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), s2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), s2(r3(460), t2);
        }, 27: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(25).PropagationAPI.getInstance();
        }, 19: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 92: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 816: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(397).TraceAPI.getInstance();
        }, 374: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let n2 = r3(546);
          t2.NonRecordingSpan = class {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 637: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let n2 = r3(912), s2 = r3(793), i2 = r3(374), a2 = r3(477), o2 = n2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = o2.active()) {
              var n3;
              if (null == t3 ? void 0 : t3.root) return new i2.NonRecordingSpan();
              let l2 = r4 && (0, s2.getSpanContext)(r4);
              return "object" == typeof (n3 = l2) && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, a2.isSpanContextValid)(l2) ? new i2.NonRecordingSpan(l2) : new i2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, n3) {
              let i3, a3, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t3 : 3 == arguments.length ? (i3 = t3, l2 = r4) : (i3 = t3, a3 = r4, l2 = n3);
              let u2 = null != a3 ? a3 : o2.active(), c2 = this.startSpan(e3, i3, u2), d2 = (0, s2.setSpan)(u2, c2);
              return o2.with(d2, l2, void 0, c2);
            }
          };
        }, 76: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let n2 = r3(637);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new n2.NoopTracer();
            }
          };
        }, 779: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let n2 = new (r3(637)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, n3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = n3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, n3) {
              let s2 = this._getTracer();
              return Reflect.apply(s2.startActiveSpan, s2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          };
        }, 498: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let n2 = r3(779), s2 = new (r3(76)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var s3;
              return null != (s3 = this.getDelegateTracer(e3, t3, r4)) ? s3 : new n2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : s2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var n3;
              return null == (n3 = this._delegate) ? void 0 : n3.getTracer(e3, t3, r4);
            }
          };
        }, 312: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, (r3 = t2.SamplingDecision || (t2.SamplingDecision = {}))[r3.NOT_RECORD = 0] = "NOT_RECORD", r3[r3.RECORD = 1] = "RECORD", r3[r3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
        }, 793: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let n2 = r3(23), s2 = r3(374), i2 = r3(912), a2 = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function o2(e3) {
            return e3.getValue(a2) || void 0;
          }
          function l2(e3, t3) {
            return e3.setValue(a2, t3);
          }
          t2.getSpan = o2, t2.getActiveSpan = function() {
            return o2(i2.ContextAPI.getInstance().active());
          }, t2.setSpan = l2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(a2);
          }, t2.setSpanContext = function(e3, t3) {
            return l2(e3, new s2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = o2(e3)) ? void 0 : t3.spanContext();
          };
        }, 285: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let n2 = r3(240);
          t2.TraceStateImpl = class e3 {
            constructor(e4) {
              this._internalState = /* @__PURE__ */ new Map(), e4 && this._parse(e4);
            }
            set(e4, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e4) && r4._internalState.delete(e4), r4._internalState.set(e4, t3), r4;
            }
            unset(e4) {
              let t3 = this._clone();
              return t3._internalState.delete(e4), t3;
            }
            get(e4) {
              return this._internalState.get(e4);
            }
            serialize() {
              return this._keys().reduce((e4, t3) => (e4.push(t3 + "=" + this.get(t3)), e4), []).join(",");
            }
            _parse(e4) {
              !(e4.length > 512) && (this._internalState = e4.split(",").reverse().reduce((e5, t3) => {
                let r4 = t3.trim(), s2 = r4.indexOf("=");
                if (-1 !== s2) {
                  let i2 = r4.slice(0, s2), a2 = r4.slice(s2 + 1, t3.length);
                  (0, n2.validateKey)(i2) && (0, n2.validateValue)(a2) && e5.set(i2, a2);
                }
                return e5;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let t3 = new e3();
              return t3._internalState = new Map(this._internalState), t3;
            }
          };
        }, 240: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", n2 = `[a-z]${r3}{0,255}`, s2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, i2 = RegExp(`^(?:${n2}|${s2})$`), a2 = /^[ -~]{0,255}[!-~]$/, o2 = /,|=/;
          t2.validateKey = function(e3) {
            return i2.test(e3);
          }, t2.validateValue = function(e3) {
            return a2.test(e3) && !o2.test(e3);
          };
        }, 87: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let n2 = r3(285);
          t2.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 546: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let n2 = r3(731);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 613: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, (r3 = t2.SpanKind || (t2.SpanKind = {}))[r3.INTERNAL = 0] = "INTERNAL", r3[r3.SERVER = 1] = "SERVER", r3[r3.CLIENT = 2] = "CLIENT", r3[r3.PRODUCER = 3] = "PRODUCER", r3[r3.CONSUMER = 4] = "CONSUMER";
        }, 477: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let n2 = r3(546), s2 = r3(374), i2 = /^([0-9a-f]{32})$/i, a2 = /^[0-9a-f]{16}$/i;
          function o2(e3) {
            return i2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function l2(e3) {
            return a2.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t2.isValidTraceId = o2, t2.isValidSpanId = l2, t2.isSpanContextValid = function(e3) {
            return o2(e3.traceId) && l2(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new s2.NonRecordingSpan(e3);
          };
        }, 854: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, (r3 = t2.SpanStatusCode || (t2.SpanStatusCode = {}))[r3.UNSET = 0] = "UNSET", r3[r3.OK = 1] = "OK", r3[r3.ERROR = 2] = "ERROR";
        }, 731: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, (r3 = t2.TraceFlags || (t2.TraceFlags = {}))[r3.NONE = 0] = "NONE", r3[r3.SAMPLED = 1] = "SAMPLED";
        }, 652: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, k = {};
        function T(e2) {
          var t2 = k[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = k[e2] = { exports: {} }, n2 = true;
          try {
            S[e2].call(r3.exports, r3, r3.exports, T), n2 = false;
          } finally {
            n2 && delete k[e2];
          }
          return r3.exports;
        }
        T.ab = "/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";
        var R = {};
        Object.defineProperty(R, "__esModule", { value: true }), R.trace = R.propagation = R.metrics = R.diag = R.context = R.INVALID_SPAN_CONTEXT = R.INVALID_TRACEID = R.INVALID_SPANID = R.isValidSpanId = R.isValidTraceId = R.isSpanContextValid = R.createTraceState = R.TraceFlags = R.SpanStatusCode = R.SpanKind = R.SamplingDecision = R.ProxyTracerProvider = R.ProxyTracer = R.defaultTextMapSetter = R.defaultTextMapGetter = R.ValueType = R.createNoopMeter = R.DiagLogLevel = R.DiagConsoleLogger = R.ROOT_CONTEXT = R.createContextKey = R.baggageEntryMetadataFromString = void 0, o = T(504), Object.defineProperty(R, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return o.baggageEntryMetadataFromString;
        } }), l = T(23), Object.defineProperty(R, "createContextKey", { enumerable: true, get: function() {
          return l.createContextKey;
        } }), Object.defineProperty(R, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return l.ROOT_CONTEXT;
        } }), u = T(83), Object.defineProperty(R, "DiagConsoleLogger", { enumerable: true, get: function() {
          return u.DiagConsoleLogger;
        } }), c = T(711), Object.defineProperty(R, "DiagLogLevel", { enumerable: true, get: function() {
          return c.DiagLogLevel;
        } }), d = T(440), Object.defineProperty(R, "createNoopMeter", { enumerable: true, get: function() {
          return d.createNoopMeter;
        } }), h = T(532), Object.defineProperty(R, "ValueType", { enumerable: true, get: function() {
          return h.ValueType;
        } }), p = T(92), Object.defineProperty(R, "defaultTextMapGetter", { enumerable: true, get: function() {
          return p.defaultTextMapGetter;
        } }), Object.defineProperty(R, "defaultTextMapSetter", { enumerable: true, get: function() {
          return p.defaultTextMapSetter;
        } }), f = T(779), Object.defineProperty(R, "ProxyTracer", { enumerable: true, get: function() {
          return f.ProxyTracer;
        } }), g = T(498), Object.defineProperty(R, "ProxyTracerProvider", { enumerable: true, get: function() {
          return g.ProxyTracerProvider;
        } }), m = T(312), Object.defineProperty(R, "SamplingDecision", { enumerable: true, get: function() {
          return m.SamplingDecision;
        } }), _ = T(613), Object.defineProperty(R, "SpanKind", { enumerable: true, get: function() {
          return _.SpanKind;
        } }), y = T(854), Object.defineProperty(R, "SpanStatusCode", { enumerable: true, get: function() {
          return y.SpanStatusCode;
        } }), b = T(731), Object.defineProperty(R, "TraceFlags", { enumerable: true, get: function() {
          return b.TraceFlags;
        } }), w = T(87), Object.defineProperty(R, "createTraceState", { enumerable: true, get: function() {
          return w.createTraceState;
        } }), v = T(477), Object.defineProperty(R, "isSpanContextValid", { enumerable: true, get: function() {
          return v.isSpanContextValid;
        } }), Object.defineProperty(R, "isValidTraceId", { enumerable: true, get: function() {
          return v.isValidTraceId;
        } }), Object.defineProperty(R, "isValidSpanId", { enumerable: true, get: function() {
          return v.isValidSpanId;
        } }), E = T(546), Object.defineProperty(R, "INVALID_SPANID", { enumerable: true, get: function() {
          return E.INVALID_SPANID;
        } }), Object.defineProperty(R, "INVALID_TRACEID", { enumerable: true, get: function() {
          return E.INVALID_TRACEID;
        } }), Object.defineProperty(R, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return E.INVALID_SPAN_CONTEXT;
        } }), r2 = T(778), Object.defineProperty(R, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), n = T(304), Object.defineProperty(R, "diag", { enumerable: true, get: function() {
          return n.diag;
        } }), s = T(120), Object.defineProperty(R, "metrics", { enumerable: true, get: function() {
          return s.metrics;
        } }), i = T(27), Object.defineProperty(R, "propagation", { enumerable: true, get: function() {
          return i.propagation;
        } }), a = T(816), Object.defineProperty(R, "trace", { enumerable: true, get: function() {
          return a.trace;
        } }), R.default = { context: r2.context, diag: n.diag, metrics: s.metrics, propagation: i.propagation, trace: a.trace }, t.exports = R;
      })();
    }, 71498, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/cookie/");
        var e2, r2, n, s, i = {};
        i.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var s2 = {}, i2 = t2.split(n), a = (r3 || {}).decode || e2, o = 0; o < i2.length; o++) {
            var l = i2[o], u = l.indexOf("=");
            if (!(u < 0)) {
              var c = l.substr(0, u).trim(), d = l.substr(++u, l.length).trim();
              '"' == d[0] && (d = d.slice(1, -1)), void 0 == s2[c] && (s2[c] = function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              }(d, a));
            }
          }
          return s2;
        }, i.serialize = function(e3, t2, n2) {
          var i2 = n2 || {}, a = i2.encode || r2;
          if ("function" != typeof a) throw TypeError("option encode is invalid");
          if (!s.test(e3)) throw TypeError("argument name is invalid");
          var o = a(t2);
          if (o && !s.test(o)) throw TypeError("argument val is invalid");
          var l = e3 + "=" + o;
          if (null != i2.maxAge) {
            var u = i2.maxAge - 0;
            if (isNaN(u) || !isFinite(u)) throw TypeError("option maxAge is invalid");
            l += "; Max-Age=" + Math.floor(u);
          }
          if (i2.domain) {
            if (!s.test(i2.domain)) throw TypeError("option domain is invalid");
            l += "; Domain=" + i2.domain;
          }
          if (i2.path) {
            if (!s.test(i2.path)) throw TypeError("option path is invalid");
            l += "; Path=" + i2.path;
          }
          if (i2.expires) {
            if ("function" != typeof i2.expires.toUTCString) throw TypeError("option expires is invalid");
            l += "; Expires=" + i2.expires.toUTCString();
          }
          if (i2.httpOnly && (l += "; HttpOnly"), i2.secure && (l += "; Secure"), i2.sameSite) switch ("string" == typeof i2.sameSite ? i2.sameSite.toLowerCase() : i2.sameSite) {
            case true:
            case "strict":
              l += "; SameSite=Strict";
              break;
            case "lax":
              l += "; SameSite=Lax";
              break;
            case "none":
              l += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return l;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, n = /; */, s = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = i;
      })();
    }, 99734, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, n, s, i;
        var a = { 234: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function n2() {
          }
          function s2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function i2(e4, t3, n3, i3, a3) {
            if ("function" != typeof n3) throw TypeError("The listener must be a function");
            var o3 = new s2(n3, i3 || e4, a3), l2 = r3 ? r3 + t3 : t3;
            return e4._events[l2] ? e4._events[l2].fn ? e4._events[l2] = [e4._events[l2], o3] : e4._events[l2].push(o3) : (e4._events[l2] = o3, e4._eventsCount++), e4;
          }
          function a2(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new n2() : delete e4._events[t3];
          }
          function o2() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r3 = false)), o2.prototype.eventNames = function() {
            var e4, n3, s3 = [];
            if (0 === this._eventsCount) return s3;
            for (n3 in e4 = this._events) t2.call(e4, n3) && s3.push(r3 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? s3.concat(Object.getOwnPropertySymbols(e4)) : s3;
          }, o2.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            if (!n3) return [];
            if (n3.fn) return [n3.fn];
            for (var s3 = 0, i3 = n3.length, a3 = Array(i3); s3 < i3; s3++) a3[s3] = n3[s3].fn;
            return a3;
          }, o2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, o2.prototype.emit = function(e4, t3, n3, s3, i3, a3) {
            var o3 = r3 ? r3 + e4 : e4;
            if (!this._events[o3]) return false;
            var l2, u2, c = this._events[o3], d = arguments.length;
            if (c.fn) {
              switch (c.once && this.removeListener(e4, c.fn, void 0, true), d) {
                case 1:
                  return c.fn.call(c.context), true;
                case 2:
                  return c.fn.call(c.context, t3), true;
                case 3:
                  return c.fn.call(c.context, t3, n3), true;
                case 4:
                  return c.fn.call(c.context, t3, n3, s3), true;
                case 5:
                  return c.fn.call(c.context, t3, n3, s3, i3), true;
                case 6:
                  return c.fn.call(c.context, t3, n3, s3, i3, a3), true;
              }
              for (u2 = 1, l2 = Array(d - 1); u2 < d; u2++) l2[u2 - 1] = arguments[u2];
              c.fn.apply(c.context, l2);
            } else {
              var h, p = c.length;
              for (u2 = 0; u2 < p; u2++) switch (c[u2].once && this.removeListener(e4, c[u2].fn, void 0, true), d) {
                case 1:
                  c[u2].fn.call(c[u2].context);
                  break;
                case 2:
                  c[u2].fn.call(c[u2].context, t3);
                  break;
                case 3:
                  c[u2].fn.call(c[u2].context, t3, n3);
                  break;
                case 4:
                  c[u2].fn.call(c[u2].context, t3, n3, s3);
                  break;
                default:
                  if (!l2) for (h = 1, l2 = Array(d - 1); h < d; h++) l2[h - 1] = arguments[h];
                  c[u2].fn.apply(c[u2].context, l2);
              }
            }
            return true;
          }, o2.prototype.on = function(e4, t3, r4) {
            return i2(this, e4, t3, r4, false);
          }, o2.prototype.once = function(e4, t3, r4) {
            return i2(this, e4, t3, r4, true);
          }, o2.prototype.removeListener = function(e4, t3, n3, s3) {
            var i3 = r3 ? r3 + e4 : e4;
            if (!this._events[i3]) return this;
            if (!t3) return a2(this, i3), this;
            var o3 = this._events[i3];
            if (o3.fn) o3.fn !== t3 || s3 && !o3.once || n3 && o3.context !== n3 || a2(this, i3);
            else {
              for (var l2 = 0, u2 = [], c = o3.length; l2 < c; l2++) (o3[l2].fn !== t3 || s3 && !o3[l2].once || n3 && o3[l2].context !== n3) && u2.push(o3[l2]);
              u2.length ? this._events[i3] = 1 === u2.length ? u2[0] : u2 : a2(this, i3);
            }
            return this;
          }, o2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && a2(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, o2.prototype.off = o2.prototype.removeListener, o2.prototype.addListener = o2.prototype.on, o2.prefixed = r3, o2.EventEmitter = o2, e3.exports = o2;
        }, 274: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 294: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let n2 = 0, s2 = e4.length;
            for (; s2 > 0; ) {
              let i2 = s2 / 2 | 0, a2 = n2 + i2;
              0 >= r3(e4[a2], t3) ? (n2 = ++a2, s2 -= i2 + 1) : s2 = i2;
            }
            return n2;
          };
        }, 838: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let n2 = r3(294);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let s2 = n2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(s2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 138: (e3, t2, r3) => {
          let n2 = r3(274);
          class s2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let i2 = (e4, t3, r4) => new Promise((i3, a2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void i3(e4);
            let o2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  i3(r4());
                } catch (e5) {
                  a2(e5);
                }
                return;
              }
              let n3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, o3 = r4 instanceof Error ? r4 : new s2(n3);
              "function" == typeof e4.cancel && e4.cancel(), a2(o3);
            }, t3);
            n2(e4.then(i3, a2), () => {
              clearTimeout(o2);
            });
          });
          e3.exports = i2, e3.exports.default = i2, e3.exports.TimeoutError = s2;
        } }, o = {};
        function l(e3) {
          var t2 = o[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = o[e3] = { exports: {} }, n2 = true;
          try {
            a[e3](r3, r3.exports, l), n2 = false;
          } finally {
            n2 && delete o[e3];
          }
          return r3.exports;
        }
        l.ab = "/ROOT/node_modules/next/dist/compiled/p-queue/";
        var u = {};
        Object.defineProperty(u, "__esModule", { value: true }), e2 = l(234), r2 = l(138), n = l(838), s = () => {
        }, i = new r2.TimeoutError(), u.default = class extends e2 {
          constructor(e3) {
            var t2, r3, i2, a2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = s, this._resolveIdle = s, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: n.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (a2 = null == (i2 = e3.interval) ? void 0 : i2.toString()) ? a2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = s, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = s, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            let e3 = Date.now();
            if (void 0 === this._intervalId) {
              let t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              let e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                let t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            for (; this._tryToStartAnother(); ) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((n2, s2) => {
              let a2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let a3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && s2(i);
                  });
                  n2(await a3);
                } catch (e4) {
                  s2(e4);
                }
                this._next();
              };
              this._queue.enqueue(a2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = u;
      })();
    }, 51615, (e, t, r) => {
      t.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 78500, (e, t, r) => {
      t.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 25085, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { getTestReqInfo: function() {
        return l;
      }, withRequest: function() {
        return o;
      } };
      for (var s in n) Object.defineProperty(r, s, { enumerable: true, get: n[s] });
      let i = new (e.r(78500)).AsyncLocalStorage();
      function a(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let n2 = t2.url(e2);
        return { url: n2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function o(e2, t2, r2) {
        let n2 = a(e2, t2);
        return n2 ? i.run(n2, r2) : r2();
      }
      function l(e2, t2) {
        let r2 = i.getStore();
        return r2 || (e2 && t2 ? a(e2, t2) : void 0);
      }
    }, 28325, (e, t, r) => {
      "use strict";
      var n = e.i(51615);
      Object.defineProperty(r, "__esModule", { value: true });
      var s = { handleFetch: function() {
        return u;
      }, interceptFetch: function() {
        return c;
      }, reader: function() {
        return o;
      } };
      for (var i in s) Object.defineProperty(r, i, { enumerable: true, get: s[i] });
      let a = e.r(25085), o = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function l(e2, t2) {
        let { url: r2, method: s2, headers: i2, body: a2, cache: o2, credentials: l2, integrity: u2, mode: c2, redirect: d, referrer: h, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: s2, headers: [...Array.from(i2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: a2 ? n.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: l2, integrity: u2, mode: c2, redirect: d, referrer: h, referrerPolicy: p } };
      }
      async function u(e2, t2) {
        let r2 = (0, a.getTestReqInfo)(t2, o);
        if (!r2) return e2(t2);
        let { testData: s2, proxyPort: i2 } = r2, u2 = await l(s2, t2), c2 = await e2(`http://localhost:${i2}`, { method: "POST", body: JSON.stringify(u2), headers: { "next-test-internal": "1" }, next: { internal: true } });
        if (!c2.ok) throw Object.defineProperty(Error(`Proxy request failed: ${c2.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let d = await c2.json(), { api: h } = d;
        switch (h) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            return function(e3) {
              let { status: t3, headers: r3, body: s3 } = e3.response;
              return new Response(s3 ? n.Buffer.from(s3, "base64") : null, { status: t3, headers: new Headers(r3) });
            }(d);
          default:
            return h;
        }
      }
      function c(t2) {
        return e.g.fetch = function(e2, r2) {
          var n2;
          return (null == r2 || null == (n2 = r2.next) ? void 0 : n2.internal) ? t2(e2, r2) : u(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 94165, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { interceptTestApis: function() {
        return o;
      }, wrapRequestHandler: function() {
        return l;
      } };
      for (var s in n) Object.defineProperty(r, s, { enumerable: true, get: n[s] });
      let i = e.r(25085), a = e.r(28325);
      function o() {
        return (0, a.interceptFetch)(e.g.fetch);
      }
      function l(e2) {
        return (t2, r2) => (0, i.withRequest)(t2, a.reader, () => e2(t2, r2));
      }
    }, 54846, (e, t, r) => {
      !function() {
        "use strict";
        var e2 = { 431: function(e3) {
          function t2(e4) {
            if ("string" != typeof e4) throw TypeError("Path must be a string. Received " + JSON.stringify(e4));
          }
          function r3(e4, t3) {
            for (var r4, n3 = "", s = 0, i = -1, a = 0, o = 0; o <= e4.length; ++o) {
              if (o < e4.length) r4 = e4.charCodeAt(o);
              else if (47 === r4) break;
              else r4 = 47;
              if (47 === r4) {
                if (i === o - 1 || 1 === a) ;
                else if (i !== o - 1 && 2 === a) {
                  if (n3.length < 2 || 2 !== s || 46 !== n3.charCodeAt(n3.length - 1) || 46 !== n3.charCodeAt(n3.length - 2)) {
                    if (n3.length > 2) {
                      var l = n3.lastIndexOf("/");
                      if (l !== n3.length - 1) {
                        -1 === l ? (n3 = "", s = 0) : s = (n3 = n3.slice(0, l)).length - 1 - n3.lastIndexOf("/"), i = o, a = 0;
                        continue;
                      }
                    } else if (2 === n3.length || 1 === n3.length) {
                      n3 = "", s = 0, i = o, a = 0;
                      continue;
                    }
                  }
                  t3 && (n3.length > 0 ? n3 += "/.." : n3 = "..", s = 2);
                } else n3.length > 0 ? n3 += "/" + e4.slice(i + 1, o) : n3 = e4.slice(i + 1, o), s = o - i - 1;
                i = o, a = 0;
              } else 46 === r4 && -1 !== a ? ++a : a = -1;
            }
            return n3;
          }
          var n2 = { resolve: function() {
            for (var e4, n3, s = "", i = false, a = arguments.length - 1; a >= -1 && !i; a--) a >= 0 ? n3 = arguments[a] : (void 0 === e4 && (e4 = ""), n3 = e4), t2(n3), 0 !== n3.length && (s = n3 + "/" + s, i = 47 === n3.charCodeAt(0));
            if (s = r3(s, !i), i) if (s.length > 0) return "/" + s;
            else return "/";
            return s.length > 0 ? s : ".";
          }, normalize: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            var n3 = 47 === e4.charCodeAt(0), s = 47 === e4.charCodeAt(e4.length - 1);
            return (0 !== (e4 = r3(e4, !n3)).length || n3 || (e4 = "."), e4.length > 0 && s && (e4 += "/"), n3) ? "/" + e4 : e4;
          }, isAbsolute: function(e4) {
            return t2(e4), e4.length > 0 && 47 === e4.charCodeAt(0);
          }, join: function() {
            if (0 == arguments.length) return ".";
            for (var e4, r4 = 0; r4 < arguments.length; ++r4) {
              var s = arguments[r4];
              t2(s), s.length > 0 && (void 0 === e4 ? e4 = s : e4 += "/" + s);
            }
            return void 0 === e4 ? "." : n2.normalize(e4);
          }, relative: function(e4, r4) {
            if (t2(e4), t2(r4), e4 === r4 || (e4 = n2.resolve(e4)) === (r4 = n2.resolve(r4))) return "";
            for (var s = 1; s < e4.length && 47 === e4.charCodeAt(s); ++s) ;
            for (var i = e4.length, a = i - s, o = 1; o < r4.length && 47 === r4.charCodeAt(o); ++o) ;
            for (var l = r4.length - o, u = a < l ? a : l, c = -1, d = 0; d <= u; ++d) {
              if (d === u) {
                if (l > u) {
                  if (47 === r4.charCodeAt(o + d)) return r4.slice(o + d + 1);
                  else if (0 === d) return r4.slice(o + d);
                } else a > u && (47 === e4.charCodeAt(s + d) ? c = d : 0 === d && (c = 0));
                break;
              }
              var h = e4.charCodeAt(s + d);
              if (h !== r4.charCodeAt(o + d)) break;
              47 === h && (c = d);
            }
            var p = "";
            for (d = s + c + 1; d <= i; ++d) (d === i || 47 === e4.charCodeAt(d)) && (0 === p.length ? p += ".." : p += "/..");
            return p.length > 0 ? p + r4.slice(o + c) : (o += c, 47 === r4.charCodeAt(o) && ++o, r4.slice(o));
          }, _makeLong: function(e4) {
            return e4;
          }, dirname: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            for (var r4 = e4.charCodeAt(0), n3 = 47 === r4, s = -1, i = true, a = e4.length - 1; a >= 1; --a) if (47 === (r4 = e4.charCodeAt(a))) {
              if (!i) {
                s = a;
                break;
              }
            } else i = false;
            return -1 === s ? n3 ? "/" : "." : n3 && 1 === s ? "//" : e4.slice(0, s);
          }, basename: function(e4, r4) {
            if (void 0 !== r4 && "string" != typeof r4) throw TypeError('"ext" argument must be a string');
            t2(e4);
            var n3, s = 0, i = -1, a = true;
            if (void 0 !== r4 && r4.length > 0 && r4.length <= e4.length) {
              if (r4.length === e4.length && r4 === e4) return "";
              var o = r4.length - 1, l = -1;
              for (n3 = e4.length - 1; n3 >= 0; --n3) {
                var u = e4.charCodeAt(n3);
                if (47 === u) {
                  if (!a) {
                    s = n3 + 1;
                    break;
                  }
                } else -1 === l && (a = false, l = n3 + 1), o >= 0 && (u === r4.charCodeAt(o) ? -1 == --o && (i = n3) : (o = -1, i = l));
              }
              return s === i ? i = l : -1 === i && (i = e4.length), e4.slice(s, i);
            }
            for (n3 = e4.length - 1; n3 >= 0; --n3) if (47 === e4.charCodeAt(n3)) {
              if (!a) {
                s = n3 + 1;
                break;
              }
            } else -1 === i && (a = false, i = n3 + 1);
            return -1 === i ? "" : e4.slice(s, i);
          }, extname: function(e4) {
            t2(e4);
            for (var r4 = -1, n3 = 0, s = -1, i = true, a = 0, o = e4.length - 1; o >= 0; --o) {
              var l = e4.charCodeAt(o);
              if (47 === l) {
                if (!i) {
                  n3 = o + 1;
                  break;
                }
                continue;
              }
              -1 === s && (i = false, s = o + 1), 46 === l ? -1 === r4 ? r4 = o : 1 !== a && (a = 1) : -1 !== r4 && (a = -1);
            }
            return -1 === r4 || -1 === s || 0 === a || 1 === a && r4 === s - 1 && r4 === n3 + 1 ? "" : e4.slice(r4, s);
          }, format: function(e4) {
            var t3, r4;
            if (null === e4 || "object" != typeof e4) throw TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e4);
            return t3 = e4.dir || e4.root, r4 = e4.base || (e4.name || "") + (e4.ext || ""), t3 ? t3 === e4.root ? t3 + r4 : t3 + "/" + r4 : r4;
          }, parse: function(e4) {
            t2(e4);
            var r4, n3 = { root: "", dir: "", base: "", ext: "", name: "" };
            if (0 === e4.length) return n3;
            var s = e4.charCodeAt(0), i = 47 === s;
            i ? (n3.root = "/", r4 = 1) : r4 = 0;
            for (var a = -1, o = 0, l = -1, u = true, c = e4.length - 1, d = 0; c >= r4; --c) {
              if (47 === (s = e4.charCodeAt(c))) {
                if (!u) {
                  o = c + 1;
                  break;
                }
                continue;
              }
              -1 === l && (u = false, l = c + 1), 46 === s ? -1 === a ? a = c : 1 !== d && (d = 1) : -1 !== a && (d = -1);
            }
            return -1 === a || -1 === l || 0 === d || 1 === d && a === l - 1 && a === o + 1 ? -1 !== l && (0 === o && i ? n3.base = n3.name = e4.slice(1, l) : n3.base = n3.name = e4.slice(o, l)) : (0 === o && i ? (n3.name = e4.slice(1, a), n3.base = e4.slice(1, l)) : (n3.name = e4.slice(o, a), n3.base = e4.slice(o, l)), n3.ext = e4.slice(a, l)), o > 0 ? n3.dir = e4.slice(0, o - 1) : i && (n3.dir = "/"), n3;
          }, sep: "/", delimiter: ":", win32: null, posix: null };
          n2.posix = n2, e3.exports = n2;
        } }, r2 = {};
        function n(t2) {
          var s = r2[t2];
          if (void 0 !== s) return s.exports;
          var i = r2[t2] = { exports: {} }, a = true;
          try {
            e2[t2](i, i.exports, n), a = false;
          } finally {
            a && delete r2[t2];
          }
          return i.exports;
        }
        n.ab = "/ROOT/node_modules/next/dist/compiled/path-browserify/", t.exports = n(431);
      }();
    }, 68886, (e, t, r) => {
      t.exports = e.r(54846);
    }, 67914, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/path-to-regexp/");
        var e2 = {};
        (() => {
          function t2(e3, t3) {
            void 0 === t3 && (t3 = {});
            for (var r3 = function(e4) {
              for (var t4 = [], r4 = 0; r4 < e4.length; ) {
                var n3 = e4[r4];
                if ("*" === n3 || "+" === n3 || "?" === n3) {
                  t4.push({ type: "MODIFIER", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("\\" === n3) {
                  t4.push({ type: "ESCAPED_CHAR", index: r4++, value: e4[r4++] });
                  continue;
                }
                if ("{" === n3) {
                  t4.push({ type: "OPEN", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("}" === n3) {
                  t4.push({ type: "CLOSE", index: r4, value: e4[r4++] });
                  continue;
                }
                if (":" === n3) {
                  for (var s2 = "", i3 = r4 + 1; i3 < e4.length; ) {
                    var a3 = e4.charCodeAt(i3);
                    if (a3 >= 48 && a3 <= 57 || a3 >= 65 && a3 <= 90 || a3 >= 97 && a3 <= 122 || 95 === a3) {
                      s2 += e4[i3++];
                      continue;
                    }
                    break;
                  }
                  if (!s2) throw TypeError("Missing parameter name at ".concat(r4));
                  t4.push({ type: "NAME", index: r4, value: s2 }), r4 = i3;
                  continue;
                }
                if ("(" === n3) {
                  var o3 = 1, l2 = "", i3 = r4 + 1;
                  if ("?" === e4[i3]) throw TypeError('Pattern cannot start with "?" at '.concat(i3));
                  for (; i3 < e4.length; ) {
                    if ("\\" === e4[i3]) {
                      l2 += e4[i3++] + e4[i3++];
                      continue;
                    }
                    if (")" === e4[i3]) {
                      if (0 == --o3) {
                        i3++;
                        break;
                      }
                    } else if ("(" === e4[i3] && (o3++, "?" !== e4[i3 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(i3));
                    l2 += e4[i3++];
                  }
                  if (o3) throw TypeError("Unbalanced pattern at ".concat(r4));
                  if (!l2) throw TypeError("Missing pattern at ".concat(r4));
                  t4.push({ type: "PATTERN", index: r4, value: l2 }), r4 = i3;
                  continue;
                }
                t4.push({ type: "CHAR", index: r4, value: e4[r4++] });
              }
              return t4.push({ type: "END", index: r4, value: "" }), t4;
            }(e3), n2 = t3.prefixes, i2 = void 0 === n2 ? "./" : n2, a2 = t3.delimiter, o2 = void 0 === a2 ? "/#?" : a2, l = [], u = 0, c = 0, d = "", h = function(e4) {
              if (c < r3.length && r3[c].type === e4) return r3[c++].value;
            }, p = function(e4) {
              var t4 = h(e4);
              if (void 0 !== t4) return t4;
              var n3 = r3[c], s2 = n3.type, i3 = n3.index;
              throw TypeError("Unexpected ".concat(s2, " at ").concat(i3, ", expected ").concat(e4));
            }, f = function() {
              for (var e4, t4 = ""; e4 = h("CHAR") || h("ESCAPED_CHAR"); ) t4 += e4;
              return t4;
            }, g = function(e4) {
              for (var t4 = 0; t4 < o2.length; t4++) {
                var r4 = o2[t4];
                if (e4.indexOf(r4) > -1) return true;
              }
              return false;
            }, m = function(e4) {
              var t4 = l[l.length - 1], r4 = e4 || (t4 && "string" == typeof t4 ? t4 : "");
              if (t4 && !r4) throw TypeError('Must have text between two parameters, missing text after "'.concat(t4.name, '"'));
              return !r4 || g(r4) ? "[^".concat(s(o2), "]+?") : "(?:(?!".concat(s(r4), ")[^").concat(s(o2), "])+?");
            }; c < r3.length; ) {
              var _ = h("CHAR"), y = h("NAME"), b = h("PATTERN");
              if (y || b) {
                var w = _ || "";
                -1 === i2.indexOf(w) && (d += w, w = ""), d && (l.push(d), d = ""), l.push({ name: y || u++, prefix: w, suffix: "", pattern: b || m(w), modifier: h("MODIFIER") || "" });
                continue;
              }
              var v = _ || h("ESCAPED_CHAR");
              if (v) {
                d += v;
                continue;
              }
              if (d && (l.push(d), d = ""), h("OPEN")) {
                var w = f(), E = h("NAME") || "", S = h("PATTERN") || "", k = f();
                p("CLOSE"), l.push({ name: E || (S ? u++ : ""), pattern: E && !S ? m(w) : S, prefix: w, suffix: k, modifier: h("MODIFIER") || "" });
                continue;
              }
              p("END");
            }
            return l;
          }
          function r2(e3, t3) {
            void 0 === t3 && (t3 = {});
            var r3 = i(t3), n2 = t3.encode, s2 = void 0 === n2 ? function(e4) {
              return e4;
            } : n2, a2 = t3.validate, o2 = void 0 === a2 || a2, l = e3.map(function(e4) {
              if ("object" == typeof e4) return new RegExp("^(?:".concat(e4.pattern, ")$"), r3);
            });
            return function(t4) {
              for (var r4 = "", n3 = 0; n3 < e3.length; n3++) {
                var i2 = e3[n3];
                if ("string" == typeof i2) {
                  r4 += i2;
                  continue;
                }
                var a3 = t4 ? t4[i2.name] : void 0, u = "?" === i2.modifier || "*" === i2.modifier, c = "*" === i2.modifier || "+" === i2.modifier;
                if (Array.isArray(a3)) {
                  if (!c) throw TypeError('Expected "'.concat(i2.name, '" to not repeat, but got an array'));
                  if (0 === a3.length) {
                    if (u) continue;
                    throw TypeError('Expected "'.concat(i2.name, '" to not be empty'));
                  }
                  for (var d = 0; d < a3.length; d++) {
                    var h = s2(a3[d], i2);
                    if (o2 && !l[n3].test(h)) throw TypeError('Expected all "'.concat(i2.name, '" to match "').concat(i2.pattern, '", but got "').concat(h, '"'));
                    r4 += i2.prefix + h + i2.suffix;
                  }
                  continue;
                }
                if ("string" == typeof a3 || "number" == typeof a3) {
                  var h = s2(String(a3), i2);
                  if (o2 && !l[n3].test(h)) throw TypeError('Expected "'.concat(i2.name, '" to match "').concat(i2.pattern, '", but got "').concat(h, '"'));
                  r4 += i2.prefix + h + i2.suffix;
                  continue;
                }
                if (!u) {
                  var p = c ? "an array" : "a string";
                  throw TypeError('Expected "'.concat(i2.name, '" to be ').concat(p));
                }
              }
              return r4;
            };
          }
          function n(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            var n2 = r3.decode, s2 = void 0 === n2 ? function(e4) {
              return e4;
            } : n2;
            return function(r4) {
              var n3 = e3.exec(r4);
              if (!n3) return false;
              for (var i2 = n3[0], a2 = n3.index, o2 = /* @__PURE__ */ Object.create(null), l = 1; l < n3.length; l++) !function(e4) {
                if (void 0 !== n3[e4]) {
                  var r5 = t3[e4 - 1];
                  "*" === r5.modifier || "+" === r5.modifier ? o2[r5.name] = n3[e4].split(r5.prefix + r5.suffix).map(function(e5) {
                    return s2(e5, r5);
                  }) : o2[r5.name] = s2(n3[e4], r5);
                }
              }(l);
              return { path: i2, index: a2, params: o2 };
            };
          }
          function s(e3) {
            return e3.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
          }
          function i(e3) {
            return e3 && e3.sensitive ? "" : "i";
          }
          function a(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            for (var n2 = r3.strict, a2 = void 0 !== n2 && n2, o2 = r3.start, l = r3.end, u = r3.encode, c = void 0 === u ? function(e4) {
              return e4;
            } : u, d = r3.delimiter, h = r3.endsWith, p = "[".concat(s(void 0 === h ? "" : h), "]|$"), f = "[".concat(s(void 0 === d ? "/#?" : d), "]"), g = void 0 === o2 || o2 ? "^" : "", m = 0; m < e3.length; m++) {
              var _ = e3[m];
              if ("string" == typeof _) g += s(c(_));
              else {
                var y = s(c(_.prefix)), b = s(c(_.suffix));
                if (_.pattern) if (t3 && t3.push(_), y || b) if ("+" === _.modifier || "*" === _.modifier) {
                  var w = "*" === _.modifier ? "?" : "";
                  g += "(?:".concat(y, "((?:").concat(_.pattern, ")(?:").concat(b).concat(y, "(?:").concat(_.pattern, "))*)").concat(b, ")").concat(w);
                } else g += "(?:".concat(y, "(").concat(_.pattern, ")").concat(b, ")").concat(_.modifier);
                else {
                  if ("+" === _.modifier || "*" === _.modifier) throw TypeError('Can not repeat "'.concat(_.name, '" without a prefix and suffix'));
                  g += "(".concat(_.pattern, ")").concat(_.modifier);
                }
                else g += "(?:".concat(y).concat(b, ")").concat(_.modifier);
              }
            }
            if (void 0 === l || l) a2 || (g += "".concat(f, "?")), g += r3.endsWith ? "(?=".concat(p, ")") : "$";
            else {
              var v = e3[e3.length - 1], E = "string" == typeof v ? f.indexOf(v[v.length - 1]) > -1 : void 0 === v;
              a2 || (g += "(?:".concat(f, "(?=").concat(p, "))?")), E || (g += "(?=".concat(f, "|").concat(p, ")"));
            }
            return new RegExp(g, i(r3));
          }
          function o(e3, r3, n2) {
            if (e3 instanceof RegExp) {
              var s2;
              if (!r3) return e3;
              for (var l = /\((?:\?<(.*?)>)?(?!\?)/g, u = 0, c = l.exec(e3.source); c; ) r3.push({ name: c[1] || u++, prefix: "", suffix: "", modifier: "", pattern: "" }), c = l.exec(e3.source);
              return e3;
            }
            return Array.isArray(e3) ? (s2 = e3.map(function(e4) {
              return o(e4, r3, n2).source;
            }), new RegExp("(?:".concat(s2.join("|"), ")"), i(n2))) : a(t2(e3, n2), r3, n2);
          }
          Object.defineProperty(e2, "__esModule", { value: true }), e2.pathToRegexp = e2.tokensToRegexp = e2.regexpToFunction = e2.match = e2.tokensToFunction = e2.compile = e2.parse = void 0, e2.parse = t2, e2.compile = function(e3, n2) {
            return r2(t2(e3, n2), n2);
          }, e2.tokensToFunction = r2, e2.match = function(e3, t3) {
            var r3 = [];
            return n(o(e3, r3, t3), r3, t3);
          }, e2.regexpToFunction = n, e2.tokensToRegexp = a, e2.pathToRegexp = o;
        })(), t.exports = e2;
      })();
    }, 64445, (e, t, r) => {
      var n = { 943: function(t2, r2) {
        !function(n2) {
          "use strict";
          var s2 = "function", i2 = "undefined", a = "object", o = "string", l = "major", u = "model", c = "name", d = "type", h = "vendor", p = "version", f = "architecture", g = "console", m = "mobile", _ = "tablet", y = "smarttv", b = "wearable", w = "embedded", v = "Amazon", E = "Apple", S = "ASUS", k = "BlackBerry", T = "Browser", R = "Chrome", O = "Firefox", C = "Google", x = "Huawei", P = "Microsoft", A = "Motorola", I = "Opera", N = "Samsung", j = "Sharp", L = "Sony", $ = "Xiaomi", M = "Zebra", D = "Facebook", U = "Chromium OS", q = "Mac OS", B = function(e2, t3) {
            var r3 = {};
            for (var n3 in e2) t3[n3] && t3[n3].length % 2 == 0 ? r3[n3] = t3[n3].concat(e2[n3]) : r3[n3] = e2[n3];
            return r3;
          }, H = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, G = function(e2, t3) {
            return typeof e2 === o && -1 !== F(t3).indexOf(F(e2));
          }, F = function(e2) {
            return e2.toLowerCase();
          }, V = function(e2, t3) {
            if (typeof e2 === o) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === i2 ? e2 : e2.substring(0, 350);
          }, z = function(e2, t3) {
            for (var r3, n3, i3, o2, l2, u2, c2 = 0; c2 < t3.length && !l2; ) {
              var d2 = t3[c2], h2 = t3[c2 + 1];
              for (r3 = n3 = 0; r3 < d2.length && !l2 && d2[r3]; ) if (l2 = d2[r3++].exec(e2)) for (i3 = 0; i3 < h2.length; i3++) u2 = l2[++n3], typeof (o2 = h2[i3]) === a && o2.length > 0 ? 2 === o2.length ? typeof o2[1] == s2 ? this[o2[0]] = o2[1].call(this, u2) : this[o2[0]] = o2[1] : 3 === o2.length ? typeof o2[1] !== s2 || o2[1].exec && o2[1].test ? this[o2[0]] = u2 ? u2.replace(o2[1], o2[2]) : void 0 : this[o2[0]] = u2 ? o2[1].call(this, u2, o2[2]) : void 0 : 4 === o2.length && (this[o2[0]] = u2 ? o2[3].call(this, u2.replace(o2[1], o2[2])) : void 0) : this[o2] = u2 || void 0;
              c2 += 2;
            }
          }, K = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === a && t3[r3].length > 0) {
              for (var n3 = 0; n3 < t3[r3].length; n3++) if (G(t3[r3][n3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (G(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, W = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, J = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [p, [c, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [p, [c, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [c, p], [/opios[\/ ]+([\w\.]+)/i], [p, [c, I + " Mini"]], [/\bopr\/([\w\.]+)/i], [p, [c, I]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [c, p], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [p, [c, "UC" + T]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [p, [c, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [p, [c, "WeChat"]], [/konqueror\/([\w\.]+)/i], [p, [c, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [p, [c, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [p, [c, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[c, /(.+)/, "$1 Secure " + T], p], [/\bfocus\/([\w\.]+)/i], [p, [c, O + " Focus"]], [/\bopt\/([\w\.]+)/i], [p, [c, I + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [p, [c, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [p, [c, "Dolphin"]], [/coast\/([\w\.]+)/i], [p, [c, I + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [p, [c, "MIUI " + T]], [/fxios\/([-\w\.]+)/i], [p, [c, O]], [/\bqihu|(qi?ho?o?|360)browser/i], [[c, "360 " + T]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[c, /(.+)/, "$1 " + T], p], [/(comodo_dragon)\/([\w\.]+)/i], [[c, /_/g, " "], p], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [c, p], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [c], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[c, D], p], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [c, p], [/\bgsa\/([\w\.]+) .*safari\//i], [p, [c, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [p, [c, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [p, [c, R + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[c, R + " WebView"], p], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [p, [c, "Android " + T]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [c, p], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [p, [c, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [p, c], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [c, [p, K, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [c, p], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[c, "Netscape"], p], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [p, [c, O + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [c, p], [/(cobalt)\/([\w\.]+)/i], [c, [p, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[f, "amd64"]], [/(ia32(?=;))/i], [[f, F]], [/((?:i[346]|x)86)[;\)]/i], [[f, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[f, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[f, "armhf"]], [/windows (ce|mobile); ppc;/i], [[f, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[f, /ower/, "", F]], [/(sun4\w)[;\)]/i], [[f, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[f, F]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [u, [h, N], [d, _]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [u, [h, N], [d, m]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [u, [h, E], [d, m]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [u, [h, E], [d, _]], [/(macintosh);/i], [u, [h, E]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [u, [h, j], [d, m]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [u, [h, x], [d, _]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [u, [h, x], [d, m]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[u, /_/g, " "], [h, $], [d, m]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[u, /_/g, " "], [h, $], [d, _]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [u, [h, "OPPO"], [d, m]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [u, [h, "Vivo"], [d, m]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [u, [h, "Realme"], [d, m]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [u, [h, A], [d, m]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [u, [h, A], [d, _]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [u, [h, "LG"], [d, _]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [u, [h, "LG"], [d, m]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [u, [h, "Lenovo"], [d, _]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[u, /_/g, " "], [h, "Nokia"], [d, m]], [/(pixel c)\b/i], [u, [h, C], [d, _]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [u, [h, C], [d, m]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [u, [h, L], [d, m]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[u, "Xperia Tablet"], [h, L], [d, _]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [u, [h, "OnePlus"], [d, m]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [u, [h, v], [d, _]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[u, /(.+)/g, "Fire Phone $1"], [h, v], [d, m]], [/(playbook);[-\w\),; ]+(rim)/i], [u, h, [d, _]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [u, [h, k], [d, m]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [u, [h, S], [d, _]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [u, [h, S], [d, m]], [/(nexus 9)/i], [u, [h, "HTC"], [d, _]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [h, [u, /_/g, " "], [d, m]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [u, [h, "Acer"], [d, _]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [u, [h, "Meizu"], [d, m]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [h, u, [d, m]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [h, u, [d, _]], [/(surface duo)/i], [u, [h, P], [d, _]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [u, [h, "Fairphone"], [d, m]], [/(u304aa)/i], [u, [h, "AT&T"], [d, m]], [/\bsie-(\w*)/i], [u, [h, "Siemens"], [d, m]], [/\b(rct\w+) b/i], [u, [h, "RCA"], [d, _]], [/\b(venue[\d ]{2,7}) b/i], [u, [h, "Dell"], [d, _]], [/\b(q(?:mv|ta)\w+) b/i], [u, [h, "Verizon"], [d, _]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [u, [h, "Barnes & Noble"], [d, _]], [/\b(tm\d{3}\w+) b/i], [u, [h, "NuVision"], [d, _]], [/\b(k88) b/i], [u, [h, "ZTE"], [d, _]], [/\b(nx\d{3}j) b/i], [u, [h, "ZTE"], [d, m]], [/\b(gen\d{3}) b.+49h/i], [u, [h, "Swiss"], [d, m]], [/\b(zur\d{3}) b/i], [u, [h, "Swiss"], [d, _]], [/\b((zeki)?tb.*\b) b/i], [u, [h, "Zeki"], [d, _]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[h, "Dragon Touch"], u, [d, _]], [/\b(ns-?\w{0,9}) b/i], [u, [h, "Insignia"], [d, _]], [/\b((nxa|next)-?\w{0,9}) b/i], [u, [h, "NextBook"], [d, _]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[h, "Voice"], u, [d, m]], [/\b(lvtel\-)?(v1[12]) b/i], [[h, "LvTel"], u, [d, m]], [/\b(ph-1) /i], [u, [h, "Essential"], [d, m]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [u, [h, "Envizen"], [d, _]], [/\b(trio[-\w\. ]+) b/i], [u, [h, "MachSpeed"], [d, _]], [/\btu_(1491) b/i], [u, [h, "Rotor"], [d, _]], [/(shield[\w ]+) b/i], [u, [h, "Nvidia"], [d, _]], [/(sprint) (\w+)/i], [h, u, [d, m]], [/(kin\.[onetw]{3})/i], [[u, /\./g, " "], [h, P], [d, m]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [u, [h, M], [d, _]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [u, [h, M], [d, m]], [/smart-tv.+(samsung)/i], [h, [d, y]], [/hbbtv.+maple;(\d+)/i], [[u, /^/, "SmartTV"], [h, N], [d, y]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[h, "LG"], [d, y]], [/(apple) ?tv/i], [h, [u, E + " TV"], [d, y]], [/crkey/i], [[u, R + "cast"], [h, C], [d, y]], [/droid.+aft(\w)( bui|\))/i], [u, [h, v], [d, y]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [u, [h, j], [d, y]], [/(bravia[\w ]+)( bui|\))/i], [u, [h, L], [d, y]], [/(mitv-\w{5}) bui/i], [u, [h, $], [d, y]], [/Hbbtv.*(technisat) (.*);/i], [h, u, [d, y]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[h, V], [u, V], [d, y]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[d, y]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [h, u, [d, g]], [/droid.+; (shield) bui/i], [u, [h, "Nvidia"], [d, g]], [/(playstation [345portablevi]+)/i], [u, [h, L], [d, g]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [u, [h, P], [d, g]], [/((pebble))app/i], [h, u, [d, b]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [u, [h, E], [d, b]], [/droid.+; (glass) \d/i], [u, [h, C], [d, b]], [/droid.+; (wt63?0{2,3})\)/i], [u, [h, M], [d, b]], [/(quest( 2| pro)?)/i], [u, [h, D], [d, b]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [h, [d, w]], [/(aeobc)\b/i], [u, [h, v], [d, w]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [u, [d, m]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [u, [d, _]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[d, _]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[d, m]], [/(android[-\w\. ]{0,9});.+buil/i], [u, [h, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [p, [c, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [p, [c, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [c, p], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [p, c]], os: [[/microsoft (windows) (vista|xp)/i], [c, p], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [c, [p, K, W]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[c, "Windows"], [p, K, W]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[p, /_/g, "."], [c, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[c, q], [p, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [p, c], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [c, p], [/\(bb(10);/i], [p, [c, k]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [p, [c, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [p, [c, O + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [p, [c, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [p, [c, "watchOS"]], [/crkey\/([\d\.]+)/i], [p, [c, R + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[c, U], p], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [c, p], [/(sunos) ?([\w\.\d]*)/i], [[c, "Solaris"], p], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [c, p]] }, X = function(e2, t3) {
            if (typeof e2 === a && (t3 = e2, e2 = void 0), !(this instanceof X)) return new X(e2, t3).getResult();
            var r3 = typeof n2 !== i2 && n2.navigator ? n2.navigator : void 0, g2 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), y2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, b2 = t3 ? B(J, t3) : J, w2 = r3 && r3.userAgent == g2;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[c] = void 0, t4[p] = void 0, z.call(t4, g2, b2.browser), t4[l] = typeof (e3 = t4[p]) === o ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, w2 && r3 && r3.brave && typeof r3.brave.isBrave == s2 && (t4[c] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[f] = void 0, z.call(e3, g2, b2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[h] = void 0, e3[u] = void 0, e3[d] = void 0, z.call(e3, g2, b2.device), w2 && !e3[d] && y2 && y2.mobile && (e3[d] = m), w2 && "Macintosh" == e3[u] && r3 && typeof r3.standalone !== i2 && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[u] = "iPad", e3[d] = _), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[c] = void 0, e3[p] = void 0, z.call(e3, g2, b2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[c] = void 0, e3[p] = void 0, z.call(e3, g2, b2.os), w2 && !e3[c] && y2 && "Unknown" != y2.platform && (e3[c] = y2.platform.replace(/chrome os/i, U).replace(/macos/i, q)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return g2;
            }, this.setUA = function(e3) {
              return g2 = typeof e3 === o && e3.length > 350 ? V(e3, 350) : e3, this;
            }, this.setUA(g2), this;
          };
          if (X.VERSION = "1.0.35", X.BROWSER = H([c, p, l]), X.CPU = H([f]), X.DEVICE = H([u, h, d, g, m, y, _, b, w]), X.ENGINE = X.OS = H([c, p]), typeof r2 !== i2) t2.exports && (r2 = t2.exports = X), r2.UAParser = X;
          else if (typeof define === s2 && define.amd) e.r, void 0 !== X && e.v(X);
          else typeof n2 !== i2 && (n2.UAParser = X);
          var Y = typeof n2 !== i2 && (n2.jQuery || n2.Zepto);
          if (Y && !Y.ua) {
            var Z = new X();
            Y.ua = Z.getResult(), Y.ua.get = function() {
              return Z.getUA();
            }, Y.ua.set = function(e2) {
              Z.setUA(e2);
              var t3 = Z.getResult();
              for (var r3 in t3) Y.ua[r3] = t3[r3];
            };
          }
        }(this);
      } }, s = {};
      function i(e2) {
        var t2 = s[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = s[e2] = { exports: {} }, a = true;
        try {
          n[e2].call(r2.exports, r2, r2.exports, i), a = false;
        } finally {
          a && delete s[e2];
        }
        return r2.exports;
      }
      i.ab = "/ROOT/node_modules/next/dist/compiled/ua-parser-js/", t.exports = i(943);
    }, 8946, (e, t, r) => {
      "use strict";
      var n = { H: null, A: null };
      function s(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var i = Array.isArray;
      function a() {
      }
      var o = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), f = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), m = Symbol.for("react.activity"), _ = Symbol.for("react.view_transition"), y = Symbol.iterator, b = Object.prototype.hasOwnProperty, w = Object.assign;
      function v(e2, t2, r2) {
        var n2 = r2.ref;
        return { $$typeof: o, type: e2, key: t2, ref: void 0 !== n2 ? n2 : null, props: r2 };
      }
      function E(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === o;
      }
      var S = /\/+/g;
      function k(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function T(e2, t2, r2) {
        if (null == e2) return e2;
        var n2 = [], u2 = 0;
        return !function e3(t3, r3, n3, u3, c2) {
          var d2, h2, p2, f2 = typeof t3;
          ("undefined" === f2 || "boolean" === f2) && (t3 = null);
          var m2 = false;
          if (null === t3) m2 = true;
          else switch (f2) {
            case "bigint":
            case "string":
            case "number":
              m2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case o:
                case l:
                  m2 = true;
                  break;
                case g:
                  return e3((m2 = t3._init)(t3._payload), r3, n3, u3, c2);
              }
          }
          if (m2) return c2 = c2(t3), m2 = "" === u3 ? "." + k(t3, 0) : u3, i(c2) ? (n3 = "", null != m2 && (n3 = m2.replace(S, "$&/") + "/"), e3(c2, r3, n3, "", function(e4) {
            return e4;
          })) : null != c2 && (E(c2) && (d2 = c2, h2 = n3 + (null == c2.key || t3 && t3.key === c2.key ? "" : ("" + c2.key).replace(S, "$&/") + "/") + m2, c2 = v(d2.type, h2, d2.props)), r3.push(c2)), 1;
          m2 = 0;
          var _2 = "" === u3 ? "." : u3 + ":";
          if (i(t3)) for (var b2 = 0; b2 < t3.length; b2++) f2 = _2 + k(u3 = t3[b2], b2), m2 += e3(u3, r3, n3, f2, c2);
          else if ("function" == typeof (b2 = null === (p2 = t3) || "object" != typeof p2 ? null : "function" == typeof (p2 = y && p2[y] || p2["@@iterator"]) ? p2 : null)) for (t3 = b2.call(t3), b2 = 0; !(u3 = t3.next()).done; ) f2 = _2 + k(u3 = u3.value, b2++), m2 += e3(u3, r3, n3, f2, c2);
          else if ("object" === f2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(a, a) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, n3, u3, c2);
            throw Error(s(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return m2;
        }(e2, n2, "", "", function(e3) {
          return t2.call(r2, e3, u2++);
        }), n2;
      }
      function R(e2) {
        if (-1 === e2._status) {
          var t2 = (0, e2._result)();
          t2.then(function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = r2, void 0 === t2.status && (t2.status = "fulfilled", t2.value = r2));
          }, function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = r2, void 0 === t2.status && (t2.status = "rejected", t2.reason = r2));
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function O() {
        return /* @__PURE__ */ new WeakMap();
      }
      function C() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      r.Activity = m, r.Children = { map: T, forEach: function(e2, t2, r2) {
        T(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return T(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return T(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!E(e2)) throw Error(s(143));
        return e2;
      } }, r.Fragment = u, r.Profiler = d, r.StrictMode = c, r.Suspense = p, r.ViewTransition = _, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n, r.cache = function(e2) {
        return function() {
          var t2 = n.A;
          if (!t2) return e2.apply(null, arguments);
          var r2 = t2.getCacheForType(O);
          void 0 === (t2 = r2.get(e2)) && (t2 = C(), r2.set(e2, t2)), r2 = 0;
          for (var s2 = arguments.length; r2 < s2; r2++) {
            var i2 = arguments[r2];
            if ("function" == typeof i2 || "object" == typeof i2 && null !== i2) {
              var a2 = t2.o;
              null === a2 && (t2.o = a2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = a2.get(i2)) && (t2 = C(), a2.set(i2, t2));
            } else null === (a2 = t2.p) && (t2.p = a2 = /* @__PURE__ */ new Map()), void 0 === (t2 = a2.get(i2)) && (t2 = C(), a2.set(i2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var o2 = e2.apply(null, arguments);
            return (r2 = t2).s = 1, r2.v = o2;
          } catch (e3) {
            throw (o2 = t2).s = 2, o2.v = e3, e3;
          }
        };
      }, r.cacheSignal = function() {
        var e2 = n.A;
        return e2 ? e2.cacheSignal() : null;
      }, r.captureOwnerStack = function() {
        return null;
      }, r.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(s(267, e2));
        var n2 = w({}, e2.props), i2 = e2.key;
        if (null != t2) for (a2 in void 0 !== t2.key && (i2 = "" + t2.key), t2) b.call(t2, a2) && "key" !== a2 && "__self" !== a2 && "__source" !== a2 && ("ref" !== a2 || void 0 !== t2.ref) && (n2[a2] = t2[a2]);
        var a2 = arguments.length - 2;
        if (1 === a2) n2.children = r2;
        else if (1 < a2) {
          for (var o2 = Array(a2), l2 = 0; l2 < a2; l2++) o2[l2] = arguments[l2 + 2];
          n2.children = o2;
        }
        return v(e2.type, i2, n2);
      }, r.createElement = function(e2, t2, r2) {
        var n2, s2 = {}, i2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (i2 = "" + t2.key), t2) b.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (s2[n2] = t2[n2]);
        var a2 = arguments.length - 2;
        if (1 === a2) s2.children = r2;
        else if (1 < a2) {
          for (var o2 = Array(a2), l2 = 0; l2 < a2; l2++) o2[l2] = arguments[l2 + 2];
          s2.children = o2;
        }
        if (e2 && e2.defaultProps) for (n2 in a2 = e2.defaultProps) void 0 === s2[n2] && (s2[n2] = a2[n2]);
        return v(e2, i2, s2);
      }, r.createRef = function() {
        return { current: null };
      }, r.forwardRef = function(e2) {
        return { $$typeof: h, render: e2 };
      }, r.isValidElement = E, r.lazy = function(e2) {
        return { $$typeof: g, _payload: { _status: -1, _result: e2 }, _init: R };
      }, r.memo = function(e2, t2) {
        return { $$typeof: f, type: e2, compare: void 0 === t2 ? null : t2 };
      }, r.use = function(e2) {
        return n.H.use(e2);
      }, r.useCallback = function(e2, t2) {
        return n.H.useCallback(e2, t2);
      }, r.useDebugValue = function() {
      }, r.useId = function() {
        return n.H.useId();
      }, r.useMemo = function(e2, t2) {
        return n.H.useMemo(e2, t2);
      }, r.version = "19.3.0-canary-cbb046ab-20260731";
    }, 40049, (e, t, r) => {
      "use strict";
      t.exports = e.r(8946);
    }, 15737, (e, t, r) => {
      "use strict";
      t.exports = s, t.exports.preferredCharsets = s;
      var n = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
      function s(e2, t2) {
        var r2 = function(e3) {
          for (var t3 = e3.split(","), r3 = 0, s3 = 0; r3 < t3.length; r3++) {
            var i2 = function(e4, t4) {
              var r4 = n.exec(e4);
              if (!r4) return null;
              var s4 = r4[1], i3 = 1;
              if (r4[2]) for (var a2 = r4[2].split(";"), o2 = 0; o2 < a2.length; o2++) {
                var l = a2[o2].trim().split("=");
                if ("q" === l[0]) {
                  i3 = parseFloat(l[1]);
                  break;
                }
              }
              return { charset: s4, q: i3, i: t4 };
            }(t3[r3].trim(), r3);
            i2 && (t3[s3++] = i2);
          }
          return t3.length = s3, t3;
        }(void 0 === e2 ? "*" : e2 || "");
        if (!t2) return r2.filter(o).sort(i).map(a);
        var s2 = t2.map(function(e3, t3) {
          for (var n2 = { o: -1, q: 0, s: 0 }, s3 = 0; s3 < r2.length; s3++) {
            var i2 = function(e4, t4, r3) {
              var n3 = 0;
              if (t4.charset.toLowerCase() === e4.toLowerCase()) n3 |= 1;
              else if ("*" !== t4.charset) return null;
              return { i: r3, o: t4.i, q: t4.q, s: n3 };
            }(e3, r2[s3], t3);
            i2 && 0 > (n2.s - i2.s || n2.q - i2.q || n2.o - i2.o) && (n2 = i2);
          }
          return n2;
        });
        return s2.filter(o).sort(i).map(function(e3) {
          return t2[s2.indexOf(e3)];
        });
      }
      function i(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i || 0;
      }
      function a(e2) {
        return e2.charset;
      }
      function o(e2) {
        return e2.q > 0;
      }
    }, 27819, (e, t, r) => {
      "use strict";
      t.exports = i, t.exports.preferredEncodings = i;
      var n = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
      function s(e2, t2, r2) {
        var n2 = 0;
        if (t2.encoding.toLowerCase() === e2.toLowerCase()) n2 |= 1;
        else if ("*" !== t2.encoding) return null;
        return { encoding: e2, i: r2, o: t2.i, q: t2.q, s: n2 };
      }
      function i(e2, t2, r2) {
        var i2 = function(e3) {
          for (var t3 = e3.split(","), r3 = false, i3 = 1, a2 = 0, o2 = 0; a2 < t3.length; a2++) {
            var l2 = function(e4, t4) {
              var r4 = n.exec(e4);
              if (!r4) return null;
              var s2 = r4[1], i4 = 1;
              if (r4[2]) for (var a3 = r4[2].split(";"), o3 = 0; o3 < a3.length; o3++) {
                var l3 = a3[o3].trim().split("=");
                if ("q" === l3[0]) {
                  i4 = parseFloat(l3[1]);
                  break;
                }
              }
              return { encoding: s2, q: i4, i: t4 };
            }(t3[a2].trim(), a2);
            l2 && (t3[o2++] = l2, r3 = r3 || s("identity", l2), i3 = Math.min(i3, l2.q || 1));
          }
          return r3 || (t3[o2++] = { encoding: "identity", q: i3, i: a2 }), t3.length = o2, t3;
        }(e2 || ""), u = r2 ? function(e3, t3) {
          if (e3.q !== t3.q) return t3.q - e3.q;
          var n2 = r2.indexOf(e3.encoding), s2 = r2.indexOf(t3.encoding);
          return -1 === n2 && -1 === s2 ? t3.s - e3.s || e3.o - t3.o || e3.i - t3.i : -1 !== n2 && -1 !== s2 ? n2 - s2 : -1 === n2 ? 1 : -1;
        } : a;
        if (!t2) return i2.filter(l).sort(u).map(o);
        var c = t2.map(function(e3, t3) {
          for (var r3 = { encoding: e3, o: -1, q: 0, s: 0 }, n2 = 0; n2 < i2.length; n2++) {
            var a2 = s(e3, i2[n2], t3);
            a2 && 0 > (r3.s - a2.s || r3.q - a2.q || r3.o - a2.o) && (r3 = a2);
          }
          return r3;
        });
        return c.filter(l).sort(u).map(function(e3) {
          return t2[c.indexOf(e3)];
        });
      }
      function a(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i;
      }
      function o(e2) {
        return e2.encoding;
      }
      function l(e2) {
        return e2.q > 0;
      }
    }, 1980, (e, t, r) => {
      "use strict";
      t.exports = i, t.exports.preferredLanguages = i;
      var n = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
      function s(e2, t2) {
        var r2 = n.exec(e2);
        if (!r2) return null;
        var s2 = r2[1], i2 = r2[2], a2 = s2;
        i2 && (a2 += "-" + i2);
        var o2 = 1;
        if (r2[3]) for (var l2 = r2[3].split(";"), u = 0; u < l2.length; u++) {
          var c = l2[u].split("=");
          "q" === c[0] && (o2 = parseFloat(c[1]));
        }
        return { prefix: s2, suffix: i2, q: o2, i: t2, full: a2 };
      }
      function i(e2, t2) {
        var r2 = function(e3) {
          for (var t3 = e3.split(","), r3 = 0, n3 = 0; r3 < t3.length; r3++) {
            var i2 = s(t3[r3].trim(), r3);
            i2 && (t3[n3++] = i2);
          }
          return t3.length = n3, t3;
        }(void 0 === e2 ? "*" : e2 || "");
        if (!t2) return r2.filter(l).sort(a).map(o);
        var n2 = t2.map(function(e3, t3) {
          for (var n3 = { o: -1, q: 0, s: 0 }, i2 = 0; i2 < r2.length; i2++) {
            var a2 = function(e4, t4, r3) {
              var n4 = s(e4);
              if (!n4) return null;
              var i3 = 0;
              if (t4.full.toLowerCase() === n4.full.toLowerCase()) i3 |= 4;
              else if (t4.prefix.toLowerCase() === n4.full.toLowerCase()) i3 |= 2;
              else if (t4.full.toLowerCase() === n4.prefix.toLowerCase()) i3 |= 1;
              else if ("*" !== t4.full) return null;
              return { i: r3, o: t4.i, q: t4.q, s: i3 };
            }(e3, r2[i2], t3);
            a2 && 0 > (n3.s - a2.s || n3.q - a2.q || n3.o - a2.o) && (n3 = a2);
          }
          return n3;
        });
        return n2.filter(l).sort(a).map(function(e3) {
          return t2[n2.indexOf(e3)];
        });
      }
      function a(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i || 0;
      }
      function o(e2) {
        return e2.full;
      }
      function l(e2) {
        return e2.q > 0;
      }
    }, 84974, (e, t, r) => {
      "use strict";
      t.exports = i, t.exports.preferredMediaTypes = i;
      var n = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
      function s(e2, t2) {
        var r2 = n.exec(e2);
        if (!r2) return null;
        var s2 = /* @__PURE__ */ Object.create(null), i2 = 1, a2 = r2[2], o2 = r2[1];
        if (r2[3]) for (var l2 = function(e3) {
          for (var t3 = e3.split(";"), r3 = 1, n2 = 0; r3 < t3.length; r3++) u(t3[n2]) % 2 == 0 ? t3[++n2] = t3[r3] : t3[n2] += ";" + t3[r3];
          t3.length = n2 + 1;
          for (var r3 = 0; r3 < t3.length; r3++) t3[r3] = t3[r3].trim();
          return t3;
        }(r2[3]).map(c), d = 0; d < l2.length; d++) {
          var h = l2[d], p = h[0].toLowerCase(), f = h[1], g = f && '"' === f[0] && '"' === f[f.length - 1] ? f.slice(1, -1) : f;
          if ("q" === p) {
            i2 = parseFloat(g);
            break;
          }
          s2[p] = g;
        }
        return { type: o2, subtype: a2, params: s2, q: i2, i: t2 };
      }
      function i(e2, t2) {
        var r2 = function(e3) {
          for (var t3 = function(e4) {
            for (var t4 = e4.split(","), r4 = 1, n4 = 0; r4 < t4.length; r4++) u(t4[n4]) % 2 == 0 ? t4[++n4] = t4[r4] : t4[n4] += "," + t4[r4];
            return t4.length = n4 + 1, t4;
          }(e3), r3 = 0, n3 = 0; r3 < t3.length; r3++) {
            var i2 = s(t3[r3].trim(), r3);
            i2 && (t3[n3++] = i2);
          }
          return t3.length = n3, t3;
        }(void 0 === e2 ? "*/*" : e2 || "");
        if (!t2) return r2.filter(l).sort(a).map(o);
        var n2 = t2.map(function(e3, t3) {
          for (var n3 = { o: -1, q: 0, s: 0 }, i2 = 0; i2 < r2.length; i2++) {
            var a2 = function(e4, t4, r3) {
              var n4 = s(e4), i3 = 0;
              if (!n4) return null;
              if (t4.type.toLowerCase() == n4.type.toLowerCase()) i3 |= 4;
              else if ("*" != t4.type) return null;
              if (t4.subtype.toLowerCase() == n4.subtype.toLowerCase()) i3 |= 2;
              else if ("*" != t4.subtype) return null;
              var a3 = Object.keys(t4.params);
              if (a3.length > 0) if (!a3.every(function(e5) {
                return "*" == t4.params[e5] || (t4.params[e5] || "").toLowerCase() == (n4.params[e5] || "").toLowerCase();
              })) return null;
              else i3 |= 1;
              return { i: r3, o: t4.i, q: t4.q, s: i3 };
            }(e3, r2[i2], t3);
            a2 && 0 > (n3.s - a2.s || n3.q - a2.q || n3.o - a2.o) && (n3 = a2);
          }
          return n3;
        });
        return n2.filter(l).sort(a).map(function(e3) {
          return t2[n2.indexOf(e3)];
        });
      }
      function a(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i || 0;
      }
      function o(e2) {
        return e2.type + "/" + e2.subtype;
      }
      function l(e2) {
        return e2.q > 0;
      }
      function u(e2) {
        for (var t2 = 0, r2 = 0; -1 !== (r2 = e2.indexOf('"', r2)); ) t2++, r2++;
        return t2;
      }
      function c(e2) {
        var t2, r2, n2 = e2.indexOf("=");
        return -1 === n2 ? t2 = e2 : (t2 = e2.slice(0, n2), r2 = e2.slice(n2 + 1)), [t2, r2];
      }
    }, 29300, (e, t, r) => {
      "use strict";
      var n = e.r(15737), s = e.r(27819), i = e.r(1980), a = e.r(84974);
      function o(e2) {
        if (!(this instanceof o)) return new o(e2);
        this.request = e2;
      }
      t.exports = o, t.exports.Negotiator = o, o.prototype.charset = function(e2) {
        var t2 = this.charsets(e2);
        return t2 && t2[0];
      }, o.prototype.charsets = function(e2) {
        return n(this.request.headers["accept-charset"], e2);
      }, o.prototype.encoding = function(e2, t2) {
        var r2 = this.encodings(e2, t2);
        return r2 && r2[0];
      }, o.prototype.encodings = function(e2, t2) {
        return s(this.request.headers["accept-encoding"], e2, (t2 || {}).preferred);
      }, o.prototype.language = function(e2) {
        var t2 = this.languages(e2);
        return t2 && t2[0];
      }, o.prototype.languages = function(e2) {
        return i(this.request.headers["accept-language"], e2);
      }, o.prototype.mediaType = function(e2) {
        var t2 = this.mediaTypes(e2);
        return t2 && t2[0];
      }, o.prototype.mediaTypes = function(e2) {
        return a(this.request.headers.accept, e2);
      }, o.prototype.preferredCharset = o.prototype.charset, o.prototype.preferredCharsets = o.prototype.charsets, o.prototype.preferredEncoding = o.prototype.encoding, o.prototype.preferredEncodings = o.prototype.encodings, o.prototype.preferredLanguage = o.prototype.language, o.prototype.preferredLanguages = o.prototype.languages, o.prototype.preferredMediaType = o.prototype.mediaType, o.prototype.preferredMediaTypes = o.prototype.mediaTypes;
    }, 99929, (e, t, r) => {
      "use strict";
      let n;
      Object.defineProperty(r, "__esModule", { value: true }), r.parseCookie = d, r.parse = d, r.stringifyCookie = function(e2, t2) {
        let r2 = t2?.encode || encodeURIComponent, n2 = [];
        for (let t3 of Object.keys(e2)) {
          let a2 = e2[t3];
          if (void 0 === a2) continue;
          if (!s.test(t3)) throw TypeError(`cookie name is invalid: ${t3}`);
          let o2 = r2(a2);
          if (!i.test(o2)) throw TypeError(`cookie val is invalid: ${a2}`);
          n2.push(`${t3}=${o2}`);
        }
        return n2.join("; ");
      }, r.stringifySetCookie = h, r.serialize = h, r.parseSetCookie = function(e2, t2) {
        let r2 = t2?.decode || m, n2 = e2.length, s2 = p(e2, 0, n2), i2 = f(e2, 0, s2), a2 = -1 === i2 ? { name: "", value: r2(g(e2, 0, s2)) } : { name: g(e2, 0, i2), value: r2(g(e2, i2 + 1, s2)) }, o2 = s2 + 1;
        for (; o2 < n2; ) {
          let t3 = p(e2, o2, n2), r3 = f(e2, o2, t3), s3 = -1 === r3 ? g(e2, o2, t3) : g(e2, o2, r3), i3 = -1 === r3 ? void 0 : g(e2, r3 + 1, t3);
          switch (s3.toLowerCase()) {
            case "httponly":
              a2.httpOnly = true;
              break;
            case "secure":
              a2.secure = true;
              break;
            case "partitioned":
              a2.partitioned = true;
              break;
            case "domain":
              a2.domain = i3;
              break;
            case "path":
              a2.path = i3;
              break;
            case "max-age":
              i3 && l.test(i3) && (a2.maxAge = Number(i3));
              break;
            case "expires":
              if (!i3) break;
              let u2 = new Date(i3);
              Number.isFinite(u2.valueOf()) && (a2.expires = u2);
              break;
            case "priority":
              if (!i3) break;
              let c2 = i3.toLowerCase();
              ("low" === c2 || "medium" === c2 || "high" === c2) && (a2.priority = c2);
              break;
            case "samesite":
              if (!i3) break;
              let d2 = i3.toLowerCase();
              ("lax" === d2 || "strict" === d2 || "none" === d2) && (a2.sameSite = d2);
          }
          o2 = t3 + 1;
        }
        return a2;
      }, r.stringifySetCookie = h, r.serialize = h;
      let s = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/, i = /^[\u0021-\u003A\u003C-\u007E]*$/, a = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, o = /^[\u0020-\u003A\u003D-\u007E]*$/, l = /^-?\d+$/, u = Object.prototype.toString, c = ((n = function() {
      }).prototype = /* @__PURE__ */ Object.create(null), n);
      function d(e2, t2) {
        let r2 = new c(), n2 = e2.length;
        if (n2 < 2) return r2;
        let s2 = t2?.decode || m, i2 = 0;
        do {
          let t3 = f(e2, i2, n2);
          if (-1 === t3) break;
          let a2 = p(e2, i2, n2);
          if (t3 > a2) {
            i2 = e2.lastIndexOf(";", t3 - 1) + 1;
            continue;
          }
          let o2 = g(e2, i2, t3);
          void 0 === r2[o2] && (r2[o2] = s2(g(e2, t3 + 1, a2))), i2 = a2 + 1;
        } while (i2 < n2);
        return r2;
      }
      function h(e2, t2, r2) {
        let n2 = "object" == typeof e2 ? e2 : { ...r2, name: e2, value: String(t2) }, l2 = ("object" == typeof t2 ? t2 : r2)?.encode || encodeURIComponent;
        if (!s.test(n2.name)) throw TypeError(`argument name is invalid: ${n2.name}`);
        let c2 = n2.value ? l2(n2.value) : "";
        if (!i.test(c2)) throw TypeError(`argument val is invalid: ${n2.value}`);
        let d2 = n2.name + "=" + c2;
        if (void 0 !== n2.maxAge) {
          if (!Number.isInteger(n2.maxAge)) throw TypeError(`option maxAge is invalid: ${n2.maxAge}`);
          d2 += "; Max-Age=" + n2.maxAge;
        }
        if (n2.domain) {
          if (!a.test(n2.domain)) throw TypeError(`option domain is invalid: ${n2.domain}`);
          d2 += "; Domain=" + n2.domain;
        }
        if (n2.path) {
          if (!o.test(n2.path)) throw TypeError(`option path is invalid: ${n2.path}`);
          d2 += "; Path=" + n2.path;
        }
        if (n2.expires) {
          var h2;
          if (h2 = n2.expires, "[object Date]" !== u.call(h2) || !Number.isFinite(n2.expires.valueOf())) throw TypeError(`option expires is invalid: ${n2.expires}`);
          d2 += "; Expires=" + n2.expires.toUTCString();
        }
        if (n2.httpOnly && (d2 += "; HttpOnly"), n2.secure && (d2 += "; Secure"), n2.partitioned && (d2 += "; Partitioned"), n2.priority) switch ("string" == typeof n2.priority ? n2.priority.toLowerCase() : void 0) {
          case "low":
            d2 += "; Priority=Low";
            break;
          case "medium":
            d2 += "; Priority=Medium";
            break;
          case "high":
            d2 += "; Priority=High";
            break;
          default:
            throw TypeError(`option priority is invalid: ${n2.priority}`);
        }
        if (n2.sameSite) switch ("string" == typeof n2.sameSite ? n2.sameSite.toLowerCase() : n2.sameSite) {
          case true:
          case "strict":
            d2 += "; SameSite=Strict";
            break;
          case "lax":
            d2 += "; SameSite=Lax";
            break;
          case "none":
            d2 += "; SameSite=None";
            break;
          default:
            throw TypeError(`option sameSite is invalid: ${n2.sameSite}`);
        }
        return d2;
      }
      function p(e2, t2, r2) {
        let n2 = e2.indexOf(";", t2);
        return -1 === n2 ? r2 : n2;
      }
      function f(e2, t2, r2) {
        let n2 = e2.indexOf("=", t2);
        return n2 < r2 ? n2 : -1;
      }
      function g(e2, t2, r2) {
        let n2 = t2, s2 = r2;
        do {
          let t3 = e2.charCodeAt(n2);
          if (32 !== t3 && 9 !== t3) break;
        } while (++n2 < s2);
        for (; s2 > n2; ) {
          let t3 = e2.charCodeAt(s2 - 1);
          if (32 !== t3 && 9 !== t3) break;
          s2--;
        }
        return e2.slice(n2, s2);
      }
      function m(e2) {
        if (-1 === e2.indexOf("%")) return e2;
        try {
          return decodeURIComponent(e2);
        } catch (t2) {
          return e2;
        }
      }
    }, 58217, (e) => {
      "use strict";
      let t, r, n, s, i, a, o, l, u, c;
      async function d() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      e.i(74398);
      let h = null;
      async function p() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        h || (h = d());
        let e10 = await h;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function f(...e10) {
        let t10 = await d();
        try {
          var r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let g = null;
      function m() {
        return g || (g = p()), g;
      }
      function _(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t10 = new Proxy(function() {
          }, { get(t11, r10) {
            if ("then" === r10) return {};
            throw Object.defineProperty(Error(_(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(_(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r10, n10, s10) {
            if ("function" == typeof s10[0]) return s10[0](t10);
            throw Object.defineProperty(Error(_(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      m();
      class y extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `), Object.defineProperty(this, "__NEXT_ERROR_CODE", { value: "E1177", enumerable: false, configurable: true });
        }
      }
      class b extends Error {
        constructor() {
          super("The request.page has been deprecated in favour of `URLPattern`.\n  Read more: https://nextjs.org/docs/messages/middleware-request-page\n  "), Object.defineProperty(this, "__NEXT_ERROR_CODE", { value: "E1178", enumerable: false, configurable: true });
        }
      }
      class w extends Error {
        constructor() {
          super("The request.ua has been removed in favour of `userAgent` function.\n  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent\n  "), Object.defineProperty(this, "__NEXT_ERROR_CODE", { value: "E1172", enumerable: false, configurable: true });
        }
      }
      let v = "x-prerender-revalidate", E = "x-prerender-revalidate-if-generated", S = ".meta", k = "x-next-cache-tags", T = "x-next-revalidated-tags", R = "_N_T_", O = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function C(e10) {
        var t10, r10, n10, s10, i10, a10 = [], o2 = 0;
        function l2() {
          for (; o2 < e10.length && /\s/.test(e10.charAt(o2)); ) o2 += 1;
          return o2 < e10.length;
        }
        for (; o2 < e10.length; ) {
          for (t10 = o2, i10 = false; l2(); ) if ("," === (r10 = e10.charAt(o2))) {
            for (n10 = o2, o2 += 1, l2(), s10 = o2; o2 < e10.length && "=" !== (r10 = e10.charAt(o2)) && ";" !== r10 && "," !== r10; ) o2 += 1;
            o2 < e10.length && "=" === e10.charAt(o2) ? (i10 = true, o2 = s10, a10.push(e10.substring(t10, n10)), t10 = o2) : o2 = n10 + 1;
          } else o2 += 1;
          (!i10 || o2 >= e10.length) && a10.push(e10.substring(t10, e10.length));
        }
        return a10;
      }
      function x(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [n10, s10] of e10.entries()) "set-cookie" === n10.toLowerCase() ? (r10.push(...C(s10)), t10[n10] = 1 === r10.length ? r10[0] : r10) : t10[n10] = s10;
        return t10;
      }
      function P(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...O, GROUP: { builtinReact: [O.reactServerComponents, O.actionBrowser], serverOnly: [O.reactServerComponents, O.actionBrowser, O.instrument, O.middleware], neutralTarget: [O.apiNode, O.apiEdge], clientOnly: [O.serverSideRendering, O.appPagesBrowser], bundled: [O.reactServerComponents, O.actionBrowser, O.serverSideRendering, O.appPagesBrowser, O.shared, O.instrument, O.middleware], appPages: [O.reactServerComponents, O.serverSideRendering, O.appPagesBrowser, O.actionBrowser] } });
      let A = Symbol("response"), I = Symbol("passThrough"), N = Symbol("waitUntil");
      class j {
        constructor(e10, t10) {
          this[I] = false, this[N] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[A] || (this[A] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[I] = true;
        }
        waitUntil(e10) {
          if ("external" === this[N].kind) return (0, this[N].function)(e10);
          this[N].promises.push(e10);
        }
      }
      class L extends j {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new y({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new y({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function $(e10) {
        return 47 === e10.charCodeAt(e10.length - 1) && e10.length > 1 ? e10.slice(0, -1) : e10;
      }
      function M(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), n10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return n10 || t10 > -1 ? { pathname: e10.substring(0, n10 ? r10 : t10), query: n10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function D(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: s10 } = M(e10);
        return `${t10}${r10}${n10}${s10}`;
      }
      function U(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: s10 } = M(e10);
        return `${r10}${t10}${n10}${s10}`;
      }
      function q(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = M(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      let B = /* @__PURE__ */ new WeakMap();
      function H(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let n10 = B.get(t10);
        n10 || (n10 = t10.map((e11) => e11.toLowerCase()), B.set(t10, n10));
        let s10 = e10.split("/", 2);
        if (!s10[1]) return { pathname: e10 };
        let i10 = s10[1].toLowerCase(), a10 = n10.indexOf(i10);
        return a10 < 0 ? { pathname: e10 } : (r10 = t10[a10], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      let G = /^(?:127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)$/;
      function F(e10, t10) {
        let r10 = new URL(String(e10), t10 && String(t10));
        return G.test(r10.hostname) && (r10.hostname = "localhost"), r10;
      }
      let V = Symbol("NextURLInternal");
      class z {
        constructor(e10, t10, r10) {
          let n10, s10;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (n10 = t10, s10 = r10 || {}) : s10 = r10 || t10 || {}, this[V] = { url: F(e10, n10 ?? s10.base), options: s10, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, n10, s10;
          let i10 = function(e11, t11) {
            let { basePath: r11, i18n: n11, trailingSlash: s11 } = t11.nextConfig ?? {}, i11 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : s11 };
            r11 && q(i11.pathname, r11) && (i11.pathname = function(e12, t12) {
              if (!q(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : `/${r12}`;
            }(i11.pathname, r11), i11.basePath = r11);
            let a11 = i11.pathname;
            if (i11.pathname.startsWith("/_next/data/") && i11.pathname.endsWith(".json")) {
              let e12 = i11.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              i11.buildId = e12[0], a11 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t11.parseData && (i11.pathname = a11);
            }
            if (n11) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(i11.pathname) : H(i11.pathname, n11.locales);
              i11.locale = e12.detectedLocale, i11.pathname = e12.pathname ?? i11.pathname, !e12.detectedLocale && i11.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(a11) : H(a11, n11.locales)).detectedLocale && (i11.locale = e12.detectedLocale);
            }
            return i11;
          }(this[V].url.pathname, { nextConfig: this[V].options.nextConfig, parseData: true, i18nProvider: this[V].options.i18nProvider }), a10 = function(e11, t11) {
            let r11;
            if (t11?.host && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[V].url, this[V].options.headers);
          this[V].domainLocale = this[V].options.i18nProvider ? this[V].options.i18nProvider.detectDomainLocale(a10) : function(e11, t11, r11) {
            if (e11) {
              for (let n11 of (r11 && (r11 = r11.toLowerCase()), e11)) if (t11 === n11.domain?.split(":", 1)[0].toLowerCase() || r11 === n11.defaultLocale.toLowerCase() || n11.locales?.some((e12) => e12.toLowerCase() === r11)) return n11;
            }
          }(null == (t10 = this[V].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, a10);
          let o2 = (null == (r10 = this[V].domainLocale) ? void 0 : r10.defaultLocale) || (null == (s10 = this[V].options.nextConfig) || null == (n10 = s10.i18n) ? void 0 : n10.defaultLocale);
          this[V].url.pathname = i10.pathname, this[V].defaultLocale = o2, this[V].basePath = i10.basePath ?? "", this[V].buildId = i10.buildId, this[V].locale = i10.locale ?? o2, this[V].trailingSlash = i10.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, n10) {
            if (!t11 || t11 === r10) return e11;
            let s10 = e11.toLowerCase();
            return !n10 && (q(s10, "/api") || q(s10, `/${t11.toLowerCase()}`)) ? e11 : D(e11, `/${t11}`);
          }((e10 = { basePath: this[V].basePath, buildId: this[V].buildId, defaultLocale: this[V].options.forceLocale ? void 0 : this[V].defaultLocale, locale: this[V].locale, pathname: this[V].url.pathname, trailingSlash: this[V].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = $(t10)), e10.buildId && (t10 = U(D(t10, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t10 = D(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : U(t10, "/") : $(t10);
        }
        formatSearch() {
          return this[V].url.search;
        }
        get buildId() {
          return this[V].buildId;
        }
        set buildId(e10) {
          this[V].buildId = e10;
        }
        get locale() {
          return this[V].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[V].locale || !(null == (r10 = this[V].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[V].locale = e10;
        }
        get defaultLocale() {
          return this[V].defaultLocale;
        }
        get domainLocale() {
          return this[V].domainLocale;
        }
        get searchParams() {
          return this[V].url.searchParams;
        }
        get host() {
          return this[V].url.host;
        }
        set host(e10) {
          this[V].url.host = e10;
        }
        get hostname() {
          return this[V].url.hostname;
        }
        set hostname(e10) {
          this[V].url.hostname = e10;
        }
        get port() {
          return this[V].url.port;
        }
        set port(e10) {
          this[V].url.port = e10;
        }
        get protocol() {
          return this[V].url.protocol;
        }
        set protocol(e10) {
          this[V].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[V].url = F(e10), this.analyze();
        }
        get origin() {
          return this[V].url.origin;
        }
        get pathname() {
          return this[V].url.pathname;
        }
        set pathname(e10) {
          this[V].url.pathname = e10;
        }
        get hash() {
          return this[V].url.hash;
        }
        set hash(e10) {
          this[V].url.hash = e10;
        }
        get search() {
          return this[V].url.search;
        }
        set search(e10) {
          this[V].url.search = e10;
        }
        get password() {
          return this[V].url.password;
        }
        set password(e10) {
          this[V].url.password = e10;
        }
        get username() {
          return this[V].url.username;
        }
        set username(e10) {
          this[V].url.username = e10;
        }
        get basePath() {
          return this[V].basePath;
        }
        set basePath(e10) {
          this[V].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new z(String(this), this[V].options);
        }
      }
      var K, W, J, X, Y, Z, Q, ee, et, er, en, es, ei, ea, eo, el, eu, ec, ed, eh, ep, ef, eg, em, e_, ey, eb, ew, ev, eE, eS, ek, eT, eR, eO, eC = e.i(28042);
      let ex = Symbol("internal request");
      class eP extends Request {
        constructor(e10, t10 = {}) {
          const r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          P(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          const n10 = new z(r10, { headers: x(this.headers), nextConfig: t10.nextConfig });
          this[ex] = { cookies: new eC.RequestCookies(this.headers), nextUrl: n10, url: n10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[ex].cookies;
        }
        get nextUrl() {
          return this[ex].nextUrl;
        }
        get page() {
          throw new b();
        }
        get ua() {
          throw new w();
        }
        get url() {
          return this[ex].url;
        }
      }
      class eA {
        static get(e10, t10, r10) {
          let n10 = Reflect.get(e10, t10, r10);
          return "function" == typeof n10 ? n10.bind(e10) : n10;
        }
        static set(e10, t10, r10, n10) {
          return Reflect.set(e10, t10, r10, n10);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let eI = Symbol("internal response"), eN = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function ej(e10, t10) {
        var r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r11 = [];
          for (let [n10, s10] of e10.request.headers) t10.set("x-middleware-request-" + n10, s10), r11.push(n10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class eL extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          const r10 = this.headers, n10 = new Proxy(new eC.ResponseCookies(r10), { get(e11, n11, s10) {
            switch (n11) {
              case "delete":
              case "set":
                return (...s11) => {
                  let i10 = Reflect.apply(e11[n11], e11, s11), a10 = new Headers(r10);
                  return i10 instanceof eC.ResponseCookies && r10.set("x-middleware-set-cookie", i10.getAll().map((e12) => (0, eC.stringifyCookie)(e12)).join(",")), ej(t10, a10), i10;
                };
              default:
                return eA.get(e11, n11, s10);
            }
          } });
          this[eI] = { cookies: n10, url: t10.url ? new z(t10.url, { headers: x(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[eI].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new eL(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!eN.has(r10)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let n10 = "object" == typeof t10 ? t10 : {}, s10 = new Headers(null == n10 ? void 0 : n10.headers);
          return s10.set("Location", P(e10)), new eL(null, { ...n10, headers: s10, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", P(e10)), ej(t10, r10), new eL(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), ej(e10, t10), new eL(null, { ...e10, headers: t10 });
        }
      }
      function e$(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, n10 = new URL(e10, t10), s10 = n10.origin === r10.origin;
        return { url: s10 ? n10.toString().slice(r10.origin.length) : n10.toString(), isRelative: s10 };
      }
      let eM = "next-router-prefetch", eD = ["rsc", "next-router-state-tree", eM, "next-hmr-refresh", "next-router-segment-prefetch"], eU = "_rsc";
      function eq(e10) {
        return e10.startsWith("/") ? e10 : `/${e10}`;
      }
      function eB(e10) {
        return eq(e10.split("/").reduce((e11, t10, r10, n10) => t10 ? "(" === t10[0] && t10.endsWith(")") || "@" === t10[0] || ("page" === t10 || "route" === t10) && r10 === n10.length - 1 ? e11 : `${e11}/${t10}` : e11, ""));
      }
      class eH extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers"), Object.defineProperty(this, "__NEXT_ERROR_CODE", { value: "E1176", enumerable: false, configurable: true });
        }
        static callable() {
          throw new eH();
        }
      }
      class eG extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, n10) {
            if ("symbol" == typeof r10) return eA.get(t10, r10, n10);
            let s10 = r10.toLowerCase(), i10 = Object.keys(e10).find((e11) => e11.toLowerCase() === s10);
            if (void 0 !== i10) return eA.get(t10, i10, n10);
          }, set(t10, r10, n10, s10) {
            if ("symbol" == typeof r10) return eA.set(t10, r10, n10, s10);
            let i10 = r10.toLowerCase(), a10 = Object.keys(e10).find((e11) => e11.toLowerCase() === i10);
            return eA.set(t10, a10 ?? r10, n10, s10);
          }, has(t10, r10) {
            if ("symbol" == typeof r10) return eA.has(t10, r10);
            let n10 = r10.toLowerCase(), s10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            return void 0 !== s10 && eA.has(t10, s10);
          }, deleteProperty(t10, r10) {
            if ("symbol" == typeof r10) return eA.deleteProperty(t10, r10);
            let n10 = r10.toLowerCase(), s10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            return void 0 === s10 || eA.deleteProperty(t10, s10);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "append":
              case "delete":
              case "set":
                return eH.callable;
              default:
                return eA.get(e11, t10, r10);
            }
          } });
        }
        static fresh(e10) {
          return new Proxy(e10, { get: (e11, t10, r10) => eA.get(e11, t10, r10) });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new eG(e10);
        }
        append(e10, t10) {
          let r10 = this.headers[e10];
          "string" == typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r10, n10] of this.entries()) e10.call(t10, n10, r10, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      let eF = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class eV {
        disable() {
          throw eF;
        }
        getStore() {
        }
        run() {
          throw eF;
        }
        exit() {
          throw eF;
        }
        enterWith() {
          throw eF;
        }
        static bind(e10) {
          return e10;
        }
      }
      let ez = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
      function eK() {
        return ez ? new ez() : new eV();
      }
      let eW = eK();
      class eJ extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options"), Object.defineProperty(this, "__NEXT_ERROR_CODE", { value: "E1180", enumerable: false, configurable: true });
        }
        static callable() {
          throw new eJ();
        }
      }
      class eX {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return eJ.callable;
              default:
                return eA.get(e11, t10, r10);
            }
          } });
        }
        static fresh(e10) {
          return new Proxy(e10, { get: (e11, t10, r10) => eA.get(e11, t10, r10) });
        }
      }
      let eY = Symbol.for("next.mutated.cookies");
      class eZ {
        static wrap(e10, t10) {
          let r10 = new eC.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r10.set(t11);
          let n10 = [], s10 = /* @__PURE__ */ new Set(), i10 = () => {
            let e11 = eW.getStore();
            if (e11 && (e11.pathWasRevalidated = 1), n10 = r10.getAll().filter((e12) => s10.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of n10) {
                let r11 = new eC.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          }, a10 = new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case eY:
                return n10;
              case "delete":
                return function(...t12) {
                  s10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), a10;
                  } finally {
                    i10();
                  }
                };
              case "set":
                return function(...t12) {
                  s10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), a10;
                  } finally {
                    i10();
                  }
                };
              default:
                return eA.get(e11, t11, r11);
            }
          } });
          return a10;
        }
      }
      function eQ(e10, t10) {
        if ("action" !== e10.phase) throw new eJ();
      }
      var e0 = ((K = e0 || {}).handleRequest = "BaseServer.handleRequest", K.run = "BaseServer.run", K.pipe = "BaseServer.pipe", K.getStaticHTML = "BaseServer.getStaticHTML", K.render = "BaseServer.render", K.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", K.renderToResponse = "BaseServer.renderToResponse", K.renderToHTML = "BaseServer.renderToHTML", K.renderError = "BaseServer.renderError", K.renderErrorToResponse = "BaseServer.renderErrorToResponse", K.renderErrorToHTML = "BaseServer.renderErrorToHTML", K.render404 = "BaseServer.render404", K), e1 = ((W = e1 || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", W.loadComponents = "LoadComponents.loadComponents", W), e2 = ((J = e2 || {}).getRequestHandler = "NextServer.getRequestHandler", J.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", J.getServer = "NextServer.getServer", J.getServerRequestHandler = "NextServer.getServerRequestHandler", J.createServer = "createServer.createServer", J), e3 = ((X = e3 || {}).compression = "NextNodeServer.compression", X.getBuildId = "NextNodeServer.getBuildId", X.createComponentTree = "NextNodeServer.createComponentTree", X.clientComponentLoading = "NextNodeServer.clientComponentLoading", X.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", X.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", X.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", X.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", X.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", X.sendRenderResult = "NextNodeServer.sendRenderResult", X.proxyRequest = "NextNodeServer.proxyRequest", X.runApi = "NextNodeServer.runApi", X.render = "NextNodeServer.render", X.renderHTML = "NextNodeServer.renderHTML", X.imageOptimizer = "NextNodeServer.imageOptimizer", X.getPagePath = "NextNodeServer.getPagePath", X.getRoutesManifest = "NextNodeServer.getRoutesManifest", X.findPageComponents = "NextNodeServer.findPageComponents", X.getFontManifest = "NextNodeServer.getFontManifest", X.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", X.getRequestHandler = "NextNodeServer.getRequestHandler", X.renderToHTML = "NextNodeServer.renderToHTML", X.renderError = "NextNodeServer.renderError", X.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", X.render404 = "NextNodeServer.render404", X.startResponse = "NextNodeServer.startResponse", X.route = "route", X.onProxyReq = "onProxyReq", X.apiResolver = "apiResolver", X.internalFetch = "internalFetch", X), e4 = ((Y = e4 || {}).startServer = "startServer.startServer", Y), e5 = ((Z = e5 || {}).getServerSideProps = "Render.getServerSideProps", Z.getStaticProps = "Render.getStaticProps", Z.renderToString = "Render.renderToString", Z.renderDocument = "Render.renderDocument", Z.createBodyResult = "Render.createBodyResult", Z), e6 = ((Q = e6 || {}).renderToString = "AppRender.renderToString", Q.renderToReadableStream = "AppRender.renderToReadableStream", Q.getBodyResult = "AppRender.getBodyResult", Q.fetch = "AppRender.fetch", Q.waitShellReady = "AppRender.waitShellReady", Q.renderToNodeFizzStream = "AppRender.renderToNodeFizzStream", Q.instantInsights = "AppRender.instantInsights", Q.instantInsightsPrepareValidation = "AppRender.instantInsights.prepareValidation", Q.instantInsightsRunValidation = "AppRender.instantInsights.runValidation", Q), e8 = ((ee = e8 || {}).executeRoute = "Router.executeRoute", ee), e9 = ((et = e9 || {}).runHandler = "Node.runHandler", et), e7 = ((er = e7 || {}).runHandler = "AppRouteRouteHandlers.runHandler", er), te = ((en = te || {}).generateMetadata = "ResolveMetadata.generateMetadata", en.generateViewport = "ResolveMetadata.generateViewport", en), tt = ((es = tt || {}).execute = "Middleware.execute", es);
      let tr = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), tn = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function ts(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let ti = process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
      function ta() {
      }
      Symbol.for("@next/local-span-recorder");
      let { context: to, propagation: tl, trace: tu, SpanStatusCode: tc, SpanKind: td, ROOT_CONTEXT: th } = t = e.r(59110);
      class tp extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let tf = (e10, t10) => {
        "object" == typeof t10 && null !== t10 && t10 instanceof tp && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: tc.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, tg = /* @__PURE__ */ new Map(), tm = t.createContextKey("next.rootSpanId"), t_ = 0, ty = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } }, tb = (o = new class e {
        getTracerInstance() {
          return tu.getTracer("next.js", "0.0.1");
        }
        isOpenTelemetryEnabled() {
          var e10, t10;
          let r10 = tu.getSpan(to.active());
          if (null == r10 ? void 0 : r10.isRecording()) return true;
          let n10 = tu.getTracerProvider();
          return !("getDelegate" in n10) || (null == n10.getDelegate || null == (t10 = n10.getDelegate.call(n10)) || null == (e10 = t10.constructor) ? void 0 : e10.name) !== "NoopTracerProvider";
        }
        getContext() {
          return to;
        }
        getTracePropagationData() {
          let e10 = to.active(), t10 = [];
          return tl.inject(e10, t10, ty), t10;
        }
        getActiveScopeSpan() {
          let e10 = ta(), t10 = null == e10 ? void 0 : e10.getActiveLocalSpan();
          return t10 && (null == e10 ? void 0 : e10.isOpenTelemetryIsolatedSpan(t10)) ? t10 : tu.getSpan(to.active());
        }
        runWithDetachedContext(e10) {
          return ti || this.isOpenTelemetryEnabled() ? to.with(th, e10) : e10();
        }
        withPropagatedContext(e10, t10, r10, n10 = false) {
          let s10 = to.active();
          if (!ti && !this.isOpenTelemetryEnabled() && !tu.getSpanContext(s10)) return t10();
          if (n10) {
            let n11 = tl.extract(th, e10, r10);
            if (tu.getSpanContext(n11)) return to.with(n11, t10);
            let i11 = tl.extract(s10, e10, r10);
            return to.with(i11, t10);
          }
          if (tu.getSpanContext(s10)) return t10();
          let i10 = tl.extract(s10, e10, r10);
          return to.with(i10, t10);
        }
        trace(...e10) {
          let [t10, r10, n10] = e10, s10 = !!ti || this.isOpenTelemetryEnabled(), i10 = ta(), a10 = (null == i10 ? void 0 : i10.isLocalSpanRecordingEnabled()) ?? false;
          if (!s10 && !a10) return "function" == typeof r10 ? r10() : n10();
          let { fn: o2, options: l2 } = "function" == typeof r10 ? { fn: r10, options: {} } : { fn: n10, options: { ...r10 } }, u2 = l2.spanName ?? t10, c2 = l2.parentSpan ?? this.getActiveScopeSpan(), d2 = c2 && (null == i10 ? void 0 : i10.isOpenTelemetryIsolatedSpan(c2)) ? c2 : void 0, h2 = !d2 && (tr.has(t10) || "1" === process.env.NEXT_OTEL_VERBOSE);
          if (!(h2 || (null == i10 ? void 0 : i10.isRequestInsightsEnabled())) || l2.hideSpan) return o2();
          let p2 = d2 ? to.active() : this.getSpanContext(c2);
          p2 || (p2 = (null == to ? void 0 : to.active()) ?? th);
          let f2 = p2.getValue(tm), g2 = "number" != typeof f2 || !tg.has(f2), m2 = t_++;
          return l2.attributes = { "next.span_category": "nextjs", "next.span_name": u2, "next.span_type": t10, ...l2.attributes }, to.with(p2.setValue(tm, m2), () => this.runWithActiveSpan(u2, l2, p2, s10 && h2, a10, d2, (e11) => {
            let r11;
            ti && t10 && tn.has(t10) && (r11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let n11 = false, s11 = () => {
              !n11 && (n11 = true, tg.delete(m2), r11 && performance.measure(`${ti}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r11, end: performance.now() }));
            };
            if (g2 && tg.set(m2, new Map(Object.entries(l2.attributes ?? {}))), o2.length > 1) try {
              return o2(e11, (t11) => {
                t11 ? tf(e11, t11) : e11.end();
              });
            } catch (t11) {
              throw tf(e11, t11), t11;
            } finally {
              s11();
            }
            try {
              let t11 = o2(e11);
              if (ts(t11)) return t11.then((t12) => (e11.end(), t12)).catch((t12) => {
                throw tf(e11, t12), t12;
              }).finally(s11);
              return e11.end(), s11(), t11;
            } catch (t11) {
              throw tf(e11, t11), s11(), t11;
            }
          }));
        }
        runWithActiveSpan(e10, t10, r10, n10, s10, i10, a10) {
          if (n10) return this.getTracerInstance().startActiveSpan(e10, t10, (n11) => a10(s10 ? this.createLocalRecordingSpan(e10, t10, r10, n11, i10) : n11));
          let o2 = this.createLocalRecordingSpan(e10, t10, r10, void 0, i10), l2 = ta();
          return l2.withLocalSpan(o2, () => l2.isOpenTelemetryIsolatedSpan(o2) ? a10(o2) : to.with(tu.setSpan(to.active(), o2), a10, void 0, o2));
        }
        createLocalRecordingSpan(e10, t10, r10, n10, s10) {
          let i10 = (null == s10 ? void 0 : s10.spanContext()) ?? tu.getSpanContext(r10), a10 = null == n10 ? void 0 : n10.spanContext();
          return ta().createLocalSpan({ name: e10, attributes: t10.attributes, links: t10.links, startTime: t10.startTime, delegateSpan: n10, traceId: (null == a10 ? void 0 : a10.traceId) ?? (null == i10 ? void 0 : i10.traceId), spanId: null == a10 ? void 0 : a10.spanId, parentSpanId: null == i10 ? void 0 : i10.spanId, isolateOpenTelemetry: void 0 !== s10 });
        }
        wrap(...e10) {
          let t10 = this, [r10, n10, s10] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return tr.has(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n10;
            "function" == typeof e11 && "function" == typeof s10 && (e11 = e11.apply(this, arguments));
            let i10 = arguments.length - 1, a10 = arguments[i10];
            if ("function" != typeof a10) return t10.trace(r10, e11, () => s10.apply(this, arguments));
            {
              let n11 = t10.getContext().bind(to.active(), a10);
              return t10.trace(r10, e11, (e12, t11) => (arguments[i10] = function(e13) {
                return null == t11 || t11(e13), n11.apply(this, arguments);
              }, s10.apply(this, arguments)));
            }
          } : s10;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, n10 = r10 ? { ...r10, attributes: { "next.span_category": "nextjs", ...r10.attributes } } : { attributes: { "next.span_category": "nextjs" } }, s10 = ta(), i10 = n10.parentSpan ?? this.getActiveScopeSpan(), a10 = i10 && (null == s10 ? void 0 : s10.isOpenTelemetryIsolatedSpan(i10)) ? i10 : void 0, o2 = (a10 ? void 0 : this.getSpanContext(i10)) ?? to.active();
          if (!(null == s10 ? void 0 : s10.isLocalSpanRecordingEnabled())) return this.getTracerInstance().startSpan(t10, n10, o2);
          let l2 = !a10 && this.isOpenTelemetryEnabled() ? this.getTracerInstance().startSpan(t10, n10, o2) : void 0;
          return this.createLocalRecordingSpan(t10, n10, o2, l2, a10);
        }
        getSpanContext(e10) {
          return e10 ? tu.setSpan(to.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = to.active().getValue(tm);
          return tg.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = to.active().getValue(tm), n10 = tg.get(r10);
          n10 && !n10.has(e10) && n10.set(e10, t10);
        }
        withSpan(e10, t10) {
          let r10 = ta();
          return (null == r10 ? void 0 : r10.isLocalRecordingSpan(e10)) ? r10.withLocalSpan(e10, () => r10.isOpenTelemetryIsolatedSpan(e10) ? t10() : to.with(tu.setSpan(to.active(), e10), t10)) : to.with(tu.setSpan(to.active(), e10), t10);
        }
      }(), () => o), tw = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(tw);
      class tv {
        constructor(e10, t10, r10, n10) {
          var s10;
          const i10 = e10 && function(e11, t11) {
            if ("function" == typeof e11.get) {
              let r11 = eG.from(e11);
              return { isOnDemandRevalidate: r11.get(v) === t11.previewModeId, revalidateOnlyGenerated: r11.has(E) };
            }
            return { isOnDemandRevalidate: e11[v] === t11.previewModeId, revalidateOnlyGenerated: e11.hasOwnProperty(E) };
          }(t10, e10).isOnDemandRevalidate, a10 = null == (s10 = r10.get(tw)) ? void 0 : s10.value;
          this._isEnabled = !!(!i10 && a10 && e10 && a10 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n10;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: tw, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: tw, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function tE(e10, t10) {
        if ("x-middleware-set-cookie" in e10 && "string" == typeof e10["x-middleware-set-cookie"]) {
          let r10 = e10["x-middleware-set-cookie"], n10 = new Headers();
          for (let e11 of C(r10)) n10.append("set-cookie", e11);
          for (let e11 of new eC.ResponseCookies(n10).getAll()) t10.set(e11);
        }
      }
      let tS = eK();
      function tk(e10) {
        switch (e10.type) {
          case "request":
          case "prerender":
          case "prerender-runtime":
          case "prerender-client":
          case "validation-client":
          case "prerender-ppr":
            return e10.resumeDataCache;
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-legacy":
          case "generate-static-params":
            return null;
          default:
            return e10;
        }
      }
      var tT = e.i(99734);
      class tR extends Error {
        constructor(e10, t10) {
          super(`Invariant: ${e10.endsWith(".") ? e10 : e10 + "."} This is a bug in Next.js.`, t10), Object.defineProperty(this, "__NEXT_ERROR_CODE", { value: "E1179", enumerable: false, configurable: true }), this.name = "InvariantError";
        }
      }
      var tO = e.i(51615);
      process.env.NEXT_PRIVATE_DEBUG_CACHE, Symbol.for("@next/cache-handlers");
      let tC = Symbol.for("@next/cache-handlers-map"), tx = Symbol.for("@next/cache-handlers-set");
      Symbol.for("@next/cache-handlers-private"), Symbol.for("@next/cache-handlers-dev-fronts"), Symbol.for("@next/cache-handlers-dev-tiered"), Symbol.for("@next/cache-handlers-memory-disabled");
      let tP = globalThis;
      function tA() {
        let e10 = tP[tC];
        if (e10) return e10.entries();
      }
      async function tI(e10, t10) {
        if (!e10) return t10();
        let r10 = tN(e10);
        try {
          return await t10();
        } finally {
          var n10, s10, i10, a10;
          let t11, o2, l2, u2, c2 = (n10 = r10, s10 = tN(e10), t11 = new Set(n10.pendingRevalidatedTags.map((e11) => {
            let t12 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return `${e11.tag}:${t12}`;
          })), o2 = new Set(n10.pendingRevalidateWrites), { pendingRevalidatedTags: s10.pendingRevalidatedTags.filter((e11) => {
            let r11 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return !t11.has(`${e11.tag}:${r11}`);
          }), pendingRevalidates: Object.fromEntries(Object.entries(s10.pendingRevalidates).filter(([e11]) => !(e11 in n10.pendingRevalidates))), pendingRevalidateWrites: s10.pendingRevalidateWrites.filter((e11) => !o2.has(e11)) });
          await (i10 = e10, l2 = [], (u2 = (null == (a10 = c2) ? void 0 : a10.pendingRevalidatedTags) ?? i10.pendingRevalidatedTags ?? []).length > 0 && l2.push(tj(u2, i10.incrementalCache, i10)), l2.push(...Object.values((null == a10 ? void 0 : a10.pendingRevalidates) ?? i10.pendingRevalidates ?? {})), l2.push(...(null == a10 ? void 0 : a10.pendingRevalidateWrites) ?? i10.pendingRevalidateWrites ?? []), 0 !== l2.length && Promise.all(l2).then(() => void 0));
        }
      }
      function tN(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function tj(e10, t10, r10) {
        if (0 === e10.length) return;
        let n10 = function() {
          let e11 = tP[tx];
          if (e11) return e11.values();
        }(), s10 = [], i10 = /* @__PURE__ */ new Map();
        for (let t11 of e10) {
          let e11, r11 = t11.profile;
          for (let [t12] of i10) if ("string" == typeof t12 && "string" == typeof r11 && t12 === r11 || "object" == typeof t12 && "object" == typeof r11 && JSON.stringify(t12) === JSON.stringify(r11) || t12 === r11) {
            e11 = t12;
            break;
          }
          let n11 = e11 || r11;
          i10.has(n11) || i10.set(n11, []), i10.get(n11).push(t11.tag);
        }
        for (let [e11, a10] of i10) {
          let i11;
          if (e11) {
            let t11;
            if ("object" == typeof e11) t11 = e11;
            else if ("string" == typeof e11 && !(t11 = null == r10 ? void 0 : r10.cacheLifeProfiles[e11])) throw Object.defineProperty(Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`), "__NEXT_ERROR_CODE", { value: "E873", enumerable: false, configurable: true });
            t11 && (i11 = { expire: t11.expire });
          }
          for (let t11 of n10 || []) e11 ? s10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, a10, i11)) : s10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, a10));
          t10 && s10.push(t10.revalidateTag(a10, i11));
        }
        await Promise.all(s10);
      }
      let tL = eK();
      class t$ {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.isRequestClosed = false, this.initialOnCloseError = null, this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new tT.default(), this.callbackQueue.pause();
          try {
            t10(() => {
              for (let e11 of (this.isRequestClosed = true, this.workUnitStores)) e11.phase = "after";
            });
          } catch (e11) {
            this.initialOnCloseError = { error: e11 };
          }
        }
        after(e10, t10) {
          if (this.initialOnCloseError) throw Object.defineProperty(new tR("An onClose call failed, which means after() can't work correctly.", { cause: this.initialOnCloseError.error }), "__NEXT_ERROR_CODE", { value: "E1376", enumerable: false, configurable: true });
          if (this.workUnitStores.add(t10), ts(e10)) this.addThenable(e10);
          else if ("function" == typeof e10) this.addCallback(e10, t10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addThenable(e10) {
          this.waitUntil || tM(), this.waitUntil(new Promise((t10) => {
            e10.then(() => {
              t10();
            }, (e11) => {
              t10(), this.reportTaskError("promise", e11);
            });
          }));
        }
        addCallback(e10, t10) {
          var r10;
          this.waitUntil || tM();
          let n10 = tL.getStore(), s10 = n10 ? n10.rootTaskSpawnPhase : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let i10 = (r10 = async () => {
            try {
              await tL.run({ rootTaskSpawnPhase: s10 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          }, ez ? ez.bind(r10) : eV.bind(r10));
          this.callbackQueue.add(i10);
        }
        async runCallbacksOnClose() {
          return this.isRequestClosed ? await new Promise((e10) => {
            setTimeout(e10, 0);
          }) : await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          let e10 = eW.getStore();
          if (!e10) throw Object.defineProperty(new tR("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return tI(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new tR("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function tM() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function tD(e10) {
        let t10, r10 = { then: (n10, s10) => (t10 || (t10 = Promise.resolve(e10())), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(n10, s10)) };
        return r10;
      }
      class tU {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function tq() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let tB = Symbol.for("@next/request-context"), tH = /[^\t\x20-\x7e]/, tG = /[^\t\x20-\x7e]+/g;
      function tF(e10) {
        return tH.test(e10) ? e10.replace(tG, (e11) => encodeURIComponent(e11)) : e10;
      }
      async function tV(e10, t10, r10) {
        let n10 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r11 = e11.indexOf("/", 1);
            for (; ; ) {
              -1 === r11 && (r11 = e11.length);
              let n11 = e11.slice(0, r11);
              if (n11 && (n11.endsWith("/page") || n11.endsWith("/route") || (n11 = `${n11}${!n11.endsWith("/") ? "/" : ""}layout`), t12.push(n11)), r11 === e11.length) break;
              r11 = e11.indexOf("/", r11 + 1);
            }
          }
          return t12;
        })(e10)) t11 = tF(`${R}${t11}`), n10.add(t11);
        if (t10 && (!r10 || 0 === r10.size)) {
          let e11 = tF(`${R}${t10}`);
          n10.add(e11);
        }
        n10.has(`${R}/`) && n10.add(`${R}/index`), n10.has(`${R}/index`) && n10.add(`${R}/`);
        let s10 = Array.from(n10);
        return { tags: s10, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = tA();
          if (r11) for (let [n11, s11] of r11) "getExpiration" in s11 && t11.set(n11, tD(async () => s11.getExpiration(e11)));
          return t11;
        }(s10) };
      }
      let tz = Symbol.for("NextInternalRequestMeta"), tK = { get default() {
        throw Object.defineProperty(new tR("Proxy does not support `use cache`, so reading its `default` cacheLife profile is unexpected."), "__NEXT_ERROR_CODE", { value: "E1406", enumerable: false, configurable: true });
      } };
      class tW extends eP {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new y({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new y({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new y({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let tJ = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, tX = (e10, t10) => tb().withPropagatedContext(e10.headers, t10, tJ), tY = false;
      async function tZ(t10) {
        var r10, n10, s10, i10, a10;
        let o2, l2, u2, c2, d2;
        !function() {
          if (!tY && (tY = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t11, wrapRequestHandler: r11 } = e.r(94165);
            t11(), tX = r11(tX);
          }
        }(), await m();
        let h2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let p2 = t10.bypassNextUrl ? new URL(t10.request.url) : new z(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...p2.searchParams.keys()]) {
          let t11 = p2.searchParams.getAll(e10), r11 = function(e11) {
            for (let t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          }(e10);
          if (r11) {
            for (let e11 of (p2.searchParams.delete(r11), t11)) p2.searchParams.append(r11, e11);
            p2.searchParams.delete(e10);
          }
        }
        let f2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in p2 && (f2 = p2.buildId || "", p2.buildId = "");
        let g2 = function(e10) {
          let t11 = new Headers();
          for (let [r11, n11] of Object.entries(e10)) for (let e11 of Array.isArray(n11) ? n11 : [n11]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t11.append(r11, e11));
          return t11;
        }(t10.request.headers), _2 = g2.has("x-nextjs-data"), y2 = "1" === g2.get("rsc");
        _2 && "/index" === p2.pathname && (p2.pathname = "/");
        let b2 = /* @__PURE__ */ new Map();
        if (!h2) for (let e10 of eD) {
          let t11 = g2.get(e10);
          null !== t11 && (b2.set(e10, t11), g2.delete(e10));
        }
        let w2 = p2.searchParams.get(eU), v2 = new tW({ page: t10.page, input: ((c2 = (u2 = "string" == typeof p2) ? new URL(p2) : p2).searchParams.delete(eU), u2 ? c2.toString() : c2).toString(), init: { body: t10.request.body, headers: g2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        t10.request.requestMeta && (a10 = t10.request.requestMeta, v2[tz] = a10), _2 && Object.defineProperty(v2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: tq() }) }));
        let E2 = t10.request.waitUntil ?? (null == (r10 = null == (d2 = globalThis[tB]) ? void 0 : d2.get()) ? void 0 : r10.waitUntil), S2 = new L({ request: v2, page: t10.page, context: E2 ? { waitUntil: E2 } : void 0 });
        if ((o2 = await tX(v2, () => {
          if ("/middleware" === t10.page || "/src/middleware" === t10.page || "/proxy" === t10.page || "/src/proxy" === t10.page) {
            let e10 = S2.waitUntil.bind(S2), r11 = new tU();
            return tb().trace(tt.execute, { spanName: `middleware ${v2.method}`, attributes: { "http.target": v2.nextUrl.pathname, "http.method": v2.method } }, async () => {
              try {
                var n11, s11, i11, a11, o3;
                let u3 = tq(), c3 = await tV("/", v2.nextUrl.pathname, null), d3 = (i11 = v2.nextUrl, a11 = (e11) => {
                  l2 = e11;
                }, o3 = void 0, function(e11) {
                  let { phase: t11, headers: r12, onUpdateCookies: n12, url: s12, rootParams: i12, implicitTags: a12, resumeDataCache: o4, previewProps: l3, isHmrRefresh: u4, serverComponentsHmrCache: c4, hmrRefreshHash: d4, fallbackParams: h4 } = e11, p3 = {};
                  return { type: "request", phase: t11, implicitTags: a12, url: { pathname: s12.pathname, search: s12.search ?? "" }, rootParams: i12, get headers() {
                    return p3.headers || (p3.headers = function(e12) {
                      let t12 = eG.from(e12 instanceof Headers ? new Headers(e12) : { ...e12 });
                      for (let e13 of eD) t12.delete(e13);
                      return t12.delete("x-nextjs-request-id"), t12.delete("x-nextjs-html-request-id"), eG.seal(t12);
                    }(r12)), p3.headers;
                  }, get cookies() {
                    if (!p3.cookies) {
                      let e12 = new eC.RequestCookies(eG.from(r12));
                      tE(r12, e12), p3.cookies = eX.seal(e12);
                    }
                    return p3.cookies;
                  }, set cookies(value) {
                    p3.cookies = value;
                  }, get mutableCookies() {
                    if (!p3.mutableCookies) {
                      let e12, t12 = (e12 = new eC.RequestCookies(eG.from(r12)), eZ.wrap(e12, n12));
                      tE(r12, t12), p3.mutableCookies = t12;
                    }
                    return p3.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!p3.userspaceMutableCookies) {
                      var f3;
                      let e12;
                      f3 = this, p3.userspaceMutableCookies = e12 = new Proxy(f3.mutableCookies, { get(t12, r13, n13) {
                        switch (r13) {
                          case "delete":
                            return function(...r14) {
                              return eQ(f3, "cookies().delete"), t12.delete(...r14), e12;
                            };
                          case "set":
                            return function(...r14) {
                              return eQ(f3, "cookies().set"), t12.set(...r14), e12;
                            };
                          default:
                            return eA.get(t12, r13, n13);
                        }
                      } });
                    }
                    return p3.userspaceMutableCookies;
                  }, get draftMode() {
                    return p3.draftMode || (p3.draftMode = new tv(l3, r12, this.cookies, this.mutableCookies)), p3.draftMode;
                  }, resumeDataCache: o4 ?? null, isHmrRefresh: u4, serverComponentsHmrCache: c4 || globalThis.__serverComponentsHmrCache, hmrRefreshHash: d4, fallbackParams: h4 };
                }({ phase: "action", headers: v2.headers, onUpdateCookies: a11, url: i11, rootParams: {}, implicitTags: c3, resumeDataCache: null, previewProps: u3, isHmrRefresh: false, serverComponentsHmrCache: void 0, hmrRefreshHash: o3, fallbackParams: null })), h3 = function({ page: e11, renderOpts: t11, isPrefetchRequest: r12, buildId: n12, deploymentId: s12, previouslyRevalidatedTags: i12, nonce: a12 }) {
                  let o4 = !t11.supportsDynamicResponse && !t11.isDraftMode && !t11.isPossibleServerAction, l3 = o4 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), u4 = { isStaticGeneration: o4, page: e11, route: eB(e11), incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, useCacheTimeout: t11.experimental.useCacheTimeout, staticPageGenerationTimeout: t11.staticPageGenerationTimeout, isBuildTimePrerendering: t11.isBuildTimePrerendering, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, requestId: void 0, htmlRequestId: void 0, isDraftMode: t11.isDraftMode, isPrefetchRequest: r12, buildId: n12, deploymentId: s12, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: a12, afterContext: function(e12) {
                    let { waitUntil: t12, onClose: r13, onAfterTaskError: n13 } = e12;
                    return new t$({ waitUntil: t12, onClose: r13, onTaskError: n13 });
                  }(t11), cacheComponentsEnabled: t11.cacheComponents, validationLevel: t11.validationLevel, previouslyRevalidatedTags: i12, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t12 = tA();
                    if (t12) for (let [r13, n13] of t12) "refreshTags" in n13 && e12.set(r13, tD(async () => n13.refreshTags()));
                    return e12;
                  }(), runInCleanSnapshot: ez ? ez.snapshot() : function(e12, ...t12) {
                    return e12(...t12);
                  }, shouldTrackFetchMetrics: l3, reactServerErrorsByDigest: /* @__PURE__ */ new Map() };
                  return t11.store = u4, u4;
                }({ page: "/", renderOpts: { cacheLifeProfiles: tK, staticPageGenerationTimeout: 0, cacheComponents: false, validationLevel: "warning", experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (s11 = t10.request.nextConfig) || null == (n11 = s11.experimental) ? void 0 : n11.authInterrupts), useCacheTimeout: 0 }, supportsDynamicResponse: true, waitUntil: e10, onClose: r11.onClose.bind(r11), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === v2.headers.get(eM), buildId: f2 ?? "", deploymentId: false, previouslyRevalidatedTags: [] });
                return await eW.run(h3, () => tS.run(d3, t10.handler, v2, S2));
              } finally {
                setTimeout(() => {
                  r11.dispatchClose();
                }, 0);
              }
            });
          }
          return t10.handler(v2, S2);
        })) && !(o2 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        o2 && l2 && o2.headers.set("set-cookie", l2);
        let k2 = null == o2 ? void 0 : o2.headers.get("x-middleware-rewrite");
        if (o2 && k2 && (y2 || !h2)) {
          let e10 = new z(k2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          h2 || e10.host !== v2.nextUrl.host || (e10.buildId = f2 || e10.buildId, o2.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r11, isRelative: a11 } = e$(e10.toString(), p2.toString());
          !h2 && _2 && o2.headers.set("x-nextjs-rewrite", r11);
          let l3 = !a11 && (null == (i10 = t10.request.nextConfig) || null == (s10 = i10.experimental) || null == (n10 = s10.clientParamParsingOrigins) ? void 0 : n10.some((t11) => new RegExp(t11).test(e10.origin)));
          y2 && (a11 || l3) && (p2.pathname !== e10.pathname && o2.headers.set("x-nextjs-rewritten-path", e10.pathname), p2.search !== e10.search && o2.headers.set("x-nextjs-rewritten-query", e10.search.slice(1)));
        }
        if (o2 && k2 && y2 && w2) {
          let e10 = new URL(k2);
          e10.searchParams.has(eU) || (e10.searchParams.set(eU, w2), o2.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let T2 = null == o2 ? void 0 : o2.headers.get("Location");
        if (o2 && T2 && !h2) {
          let e10 = new z(T2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          o2 = new Response(o2.body, o2), e10.host === p2.host && (e10.buildId = f2 || e10.buildId, o2.headers.set("Location", e$(e10, p2).url)), _2 && (o2.headers.delete("Location"), o2.headers.set("x-nextjs-redirect", e$(e10.toString(), p2.toString()).url));
        }
        let R2 = o2 || eL.next(), O2 = R2.headers.get("x-middleware-override-headers"), C2 = [];
        if (O2) {
          for (let [e10, t11] of b2) R2.headers.set(`x-middleware-request-${e10}`, t11), C2.push(e10);
          C2.length > 0 && R2.headers.set("x-middleware-override-headers", O2 + "," + C2.join(","));
        }
        return { response: R2, waitUntil: ("internal" === S2[N].kind ? Promise.all(S2[N].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: v2.fetchMetrics };
      }
      class tQ {
        constructor() {
          let e10, t10;
          this.promise = new Promise((r10, n10) => {
            e10 = r10, t10 = n10;
          }), this.resolve = e10, this.reject = t10;
        }
      }
      class t0 {
        constructor(e10, t10, r10) {
          this.prev = null, this.next = null, this.key = e10, this.data = t10, this.size = r10;
        }
      }
      class t1 {
        constructor() {
          this.prev = null, this.next = null;
        }
      }
      class t2 {
        constructor(e10, t10, r10) {
          this.cache = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t10, this.onEvict = r10, this.head = new t1(), this.tail = new t1(), this.head.next = this.tail, this.tail.prev = this.head;
        }
        addToHead(e10) {
          e10.prev = this.head, e10.next = this.head.next, this.head.next.prev = e10, this.head.next = e10;
        }
        removeNode(e10) {
          e10.prev.next = e10.next, e10.next.prev = e10.prev;
        }
        moveToHead(e10) {
          this.removeNode(e10), this.addToHead(e10);
        }
        removeTail() {
          let e10 = this.tail.prev;
          return this.removeNode(e10), e10;
        }
        set(e10, t10) {
          let r10 = (null == this.calculateSize ? void 0 : this.calculateSize.call(this, t10, e10)) ?? 1;
          if (r10 <= 0) throw Object.defineProperty(Error(`LRUCache: calculateSize returned ${r10}, but size must be > 0. Items with size 0 would never be evicted, causing unbounded cache growth.`), "__NEXT_ERROR_CODE", { value: "E1045", enumerable: false, configurable: true });
          if (r10 > this.maxSize) return console.warn("Single item size exceeds maxSize"), false;
          let n10 = this.cache.get(e10);
          if (n10) n10.data = t10, this.totalSize = this.totalSize - n10.size + r10, n10.size = r10, this.moveToHead(n10);
          else {
            let n11 = new t0(e10, t10, r10);
            this.cache.set(e10, n11), this.addToHead(n11), this.totalSize += r10;
          }
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) {
            let e11 = this.removeTail();
            this.cache.delete(e11.key), this.totalSize -= e11.size, null == this.onEvict || this.onEvict.call(this, e11.key, e11.data);
          }
          return true;
        }
        has(e10) {
          return this.cache.has(e10);
        }
        get(e10) {
          let t10 = this.cache.get(e10);
          if (t10) return this.moveToHead(t10), t10.data;
        }
        *[Symbol.iterator]() {
          let e10 = this.head.next;
          for (; e10 && e10 !== this.tail; ) {
            let t10 = e10;
            yield [t10.key, t10.data], e10 = e10.next;
          }
        }
        remove(e10) {
          let t10 = this.cache.get(e10);
          t10 && (this.removeNode(t10), this.cache.delete(e10), this.totalSize -= t10.size);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      let { env: t3, stdout: t4 } = (null == (eb = globalThis) ? void 0 : eb.process) ?? {}, t5 = t3 && !t3.NO_COLOR && (t3.FORCE_COLOR || (null == t4 ? void 0 : t4.isTTY) && !t3.CI && "dumb" !== t3.TERM), t6 = (e10, t10, r10, n10) => {
        let s10 = e10.substring(0, n10) + r10, i10 = e10.substring(n10 + t10.length), a10 = i10.indexOf(t10);
        return ~a10 ? s10 + t6(i10, t10, r10, a10) : s10 + i10;
      }, t8 = (e10, t10, r10 = e10) => t5 ? (n10) => {
        let s10 = "" + n10, i10 = s10.indexOf(t10, e10.length);
        return ~i10 ? e10 + t6(s10, t10, r10, i10) + t10 : e10 + s10 + t10;
      } : String, t9 = t8("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
      t8("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"), t8("\x1B[3m", "\x1B[23m"), t8("\x1B[4m", "\x1B[24m"), t8("\x1B[7m", "\x1B[27m"), t8("\x1B[8m", "\x1B[28m"), t8("\x1B[9m", "\x1B[29m"), t8("\x1B[30m", "\x1B[39m");
      let t7 = t8("\x1B[31m", "\x1B[39m"), re = t8("\x1B[32m", "\x1B[39m"), rt = t8("\x1B[33m", "\x1B[39m");
      t8("\x1B[34m", "\x1B[39m");
      let rr = t8("\x1B[35m", "\x1B[39m");
      t8("\x1B[38;2;173;127;168m", "\x1B[39m"), t8("\x1B[36m", "\x1B[39m");
      let rn = t8("\x1B[37m", "\x1B[39m");
      t8("\x1B[90m", "\x1B[39m"), t8("\x1B[40m", "\x1B[49m"), t8("\x1B[41m", "\x1B[49m"), t8("\x1B[42m", "\x1B[49m"), t8("\x1B[43m", "\x1B[49m"), t8("\x1B[44m", "\x1B[49m"), t8("\x1B[45m", "\x1B[49m"), t8("\x1B[46m", "\x1B[49m"), t8("\x1B[47m", "\x1B[49m"), rn(t9("\u25CB")), t7(t9("\u2A2F")), rt(t9("\u26A0")), rn(t9(" ")), re(t9("\u2713")), rr(t9("\xBB")), new t2(1e4, (e10) => e10.length), new t2(1e4, (e10) => e10.length);
      var rs = ((ei = {}).APP_PAGE = "APP_PAGE", ei.APP_ROUTE = "APP_ROUTE", ei.PAGES = "PAGES", ei.FETCH = "FETCH", ei.REDIRECT = "REDIRECT", ei.IMAGE = "IMAGE", ei), ri = ((ea = {}).APP_PAGE = "APP_PAGE", ea.APP_ROUTE = "APP_ROUTE", ea.PAGES = "PAGES", ea.FETCH = "FETCH", ea.IMAGE = "IMAGE", ea);
      function ra() {
      }
      new TextEncoder();
      let ro = new TextEncoder();
      function rl(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(ro.encode(e10)), t10.close();
        } });
      }
      function ru(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(e10), t10.close();
        } });
      }
      async function rc(e10, t10) {
        let r10 = new TextDecoder("utf-8", { fatal: true }), n10 = "";
        for await (let s10 of e10) {
          if (null == t10 ? void 0 : t10.aborted) return n10;
          n10 += r10.decode(s10, { stream: true });
        }
        return n10 + r10.decode();
      }
      let rd = "ResponseAborted";
      class rh extends Error {
        constructor(...e10) {
          super(...e10), this.name = rd;
        }
      }
      let rp = 0, rf = 0, rg = 0;
      function rm(e10 = {}) {
        let t10 = 0 === rp ? void 0 : { clientComponentLoadStart: rp, clientComponentLoadTimes: rf, clientComponentLoadCount: rg };
        return e10.reset && (rp = 0, rf = 0, rg = 0), t10;
      }
      function r_(e10) {
        return (null == e10 ? void 0 : e10.name) === "AbortError" || (null == e10 ? void 0 : e10.name) === rd;
      }
      let ry = "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
      async function rb(e10, t10, r10) {
        try {
          let n10, { errored: s10, destroyed: i10 } = t10;
          if (s10 || i10) return;
          let a10 = (n10 = new AbortController(), t10.once("close", () => {
            t10.writableFinished || n10.abort(new rh());
          }), n10), o2 = function(e11, t11) {
            let r11 = false, n11 = new tQ();
            function s11() {
              n11.resolve();
            }
            e11.on("drain", s11), e11.once("close", () => {
              e11.off("drain", s11), n11.resolve();
            });
            let i11 = new tQ();
            return e11.once("finish", () => {
              i11.resolve();
            }), new WritableStream({ write: async (t12) => {
              if (!r11) {
                if (r11 = true, ry) {
                  let e12 = rm();
                  e12 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e12.clientComponentLoadStart, end: e12.clientComponentLoadStart + e12.clientComponentLoadTimes });
                }
                e11.flushHeaders(), tb().trace(e3.startResponse, { spanName: "start response" }, () => void 0);
              }
              try {
                let r12 = e11.write(t12);
                "flush" in e11 && "function" == typeof e11.flush && e11.flush(), r12 || (await n11.promise, n11 = new tQ());
              } catch (t13) {
                throw e11.end(), Object.defineProperty(Error("failed to write chunk to response", { cause: t13 }), "__NEXT_ERROR_CODE", { value: "E321", enumerable: false, configurable: true });
              }
            }, abort: (t12) => {
              e11.writableFinished || e11.destroy(t12);
            }, close: async () => {
              if (t11 && await t11, !e11.writableFinished) return e11.end(), i11.promise;
            } });
          }(t10, r10);
          await e10.pipeTo(o2, { signal: a10.signal });
        } catch (e11) {
          if (r_(e11)) return;
          throw Object.defineProperty(Error("failed to pipe response", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E180", enumerable: false, configurable: true });
        }
      }
      async function rw(e10, t10, r10) {
        try {
          let { errored: n10, destroyed: s10 } = t10;
          if (n10 || s10) return;
          let i10 = false, a10 = new tQ();
          t10.once("close", () => {
            e10.destroy(), a10.resolve();
          }), e10.on("data", (r11) => {
            if (!i10) {
              if (i10 = true, "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX) {
                let e11 = rm();
                e11 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e11.clientComponentLoadStart, end: e11.clientComponentLoadStart + e11.clientComponentLoadTimes });
              }
              t10.flushHeaders(), tb().trace(e3.startResponse, { spanName: "start response" }, () => void 0);
            }
            let n11 = t10.write(r11);
            "flush" in t10 && "function" == typeof t10.flush && t10.flush(), n11 || (e10.pause(), t10.once("drain", () => {
              e10.resume();
            }));
          }), e10.on("end", async () => {
            r10 && await r10, t10.writableFinished || t10.end(), a10.resolve();
          }), e10.on("error", (e11) => {
            r_(e11) || t10.destroy(e11), a10.resolve();
          }), await a10.promise;
        } catch (e11) {
          if (r_(e11)) return;
          throw Object.defineProperty(Error("failed to pipe response", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E180", enumerable: false, configurable: true });
        }
      }
      function rv(e10) {
        return null !== e10 && "object" == typeof e10 && "function" == typeof e10.pipe && "function" == typeof e10.on && !(e10 instanceof ReadableStream);
      }
      class rE {
        static #e = this.EMPTY = new rE(null, { metadata: {}, contentType: null });
        static fromStatic(e10, t10) {
          return new rE(e10, { metadata: {}, contentType: t10 });
        }
        constructor(e10, { contentType: t10, waitUntil: r10, metadata: n10 }) {
          this.response = e10, this.contentType = t10, this.metadata = n10, this.waitUntil = r10;
        }
        assignMetadata(e10) {
          Object.assign(this.metadata, e10);
        }
        get isNull() {
          return null === this.response;
        }
        get isDynamic() {
          return "string" != typeof this.response;
        }
        toUnchunkedString(e10 = false) {
          if (null === this.response) return "";
          if ("string" != typeof this.response) {
            if (!e10) throw Object.defineProperty(new tR("dynamic responses cannot be unchunked. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E732", enumerable: false, configurable: true });
            return rc(this.readable);
          }
          return this.response;
        }
        get readable() {
          if (null === this.response) return new ReadableStream({ start(e10) {
            e10.close();
          } });
          if ("string" == typeof this.response) return rl(this.response);
          if (tO.Buffer.isBuffer(this.response)) return ru(this.response);
          if (Array.isArray(this.response)) return function(...e10) {
            if (0 === e10.length) return new ReadableStream({ start(e11) {
              e11.close();
            } });
            if (1 === e10.length) return e10[0];
            let { readable: t10, writable: r10 } = new TransformStream(), n10 = e10[0].pipeTo(r10, { preventClose: true }), s10 = 1;
            for (; s10 < e10.length - 1; s10++) {
              let t11 = e10[s10];
              n10 = n10.then(() => t11.pipeTo(r10, { preventClose: true }));
            }
            let i10 = e10[s10];
            return (n10 = n10.then(() => i10.pipeTo(r10))).catch(ra), t10;
          }(...this.response);
          if (rv(this.response)) throw Object.defineProperty(new tR("Node.js Readable cannot be converted to a web stream in the edge runtime"), "__NEXT_ERROR_CODE", { value: "E1150", enumerable: false, configurable: true });
          return this.response;
        }
        coerce() {
          if (null === this.response) return [];
          if ("string" == typeof this.response) return [rl(this.response)];
          if (Array.isArray(this.response)) return this.response;
          if (tO.Buffer.isBuffer(this.response)) return [ru(this.response)];
          if (!rv(this.response)) return [this.response];
          throw Object.defineProperty(new tR("Node.js Readable cannot be converted to a web stream in the edge runtime"), "__NEXT_ERROR_CODE", { value: "E1150", enumerable: false, configurable: true });
        }
        pipeThrough(e10) {
          this.response = this.readable.pipeThrough(e10);
        }
        unshift(e10) {
          this.response = this.coerce(), this.response.unshift(e10);
        }
        push(e10) {
          this.response = this.coerce(), this.response.push(e10);
        }
        async pipeTo(e10) {
          try {
            await this.readable.pipeTo(e10, { preventClose: true }), this.waitUntil && await this.waitUntil, await e10.close();
          } catch (t10) {
            if (r_(t10)) return void await e10.abort(t10);
            throw t10;
          }
        }
        async pipeToNodeResponse(e10) {
          null !== this.response && "string" != typeof this.response && !tO.Buffer.isBuffer(this.response) && !Array.isArray(this.response) && rv(this.response) ? await rw(this.response, e10, this.waitUntil) : await rb(this.readable, e10, this.waitUntil);
        }
      }
      function rS(e10, t10) {
        if (!e10) return t10;
        let r10 = parseInt(e10, 10);
        return Number.isFinite(r10) && r10 > 0 ? r10 : t10;
      }
      rS(process.env.NEXT_PRIVATE_RESPONSE_CACHE_TTL, 1e4), rS(process.env.NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE, 150);
      var rk = e.i(68886);
      let rT = /* @__PURE__ */ new Map(), rR = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = rT.get(r10), n10 = null == e11 ? void 0 : e11.expired;
          if ("number" == typeof n10 && n10 <= performance.timeOrigin + performance.now() && n10 > t10) return true;
        }
        return false;
      }, rO = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = rT.get(r10), n10 = (null == e11 ? void 0 : e11.stale) ?? 0;
          if ("number" == typeof n10 && n10 > t10) return true;
        }
        return false;
      };
      class rC {
        constructor(e10) {
          this.fs = e10, this.tasks = [];
        }
        findOrCreateTask(e10) {
          for (let t11 of this.tasks) if (t11[0] === e10) return t11;
          let t10 = this.fs.mkdir(e10);
          t10.catch(() => {
          });
          let r10 = [e10, t10, []];
          return this.tasks.push(r10), r10;
        }
        append(e10, t10) {
          let r10 = this.findOrCreateTask(rk.default.dirname(e10)), n10 = r10[1].then(() => this.fs.writeFile(e10, t10));
          n10.catch(() => {
          }), r10[2].push(n10);
        }
        wait() {
          return Promise.all(this.tasks.flatMap((e10) => e10[2]));
        }
      }
      function rx(e10) {
        return (null == e10 ? void 0 : e10.length) || 0;
      }
      class rP {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor(e10) {
          this.fs = e10.fs, this.flushToDisk = e10.flushToDisk, this.serverDistDir = e10.serverDistDir, this.revalidatedTags = e10.revalidatedTags, e10.maxMemoryCacheSize ? rP.memoryCache ? rP.debug && console.log("FileSystemCache: memory store already initialized") : (rP.debug && console.log("FileSystemCache: using memory store for fetch cache"), rP.memoryCache = function(e11) {
            return r || (r = new t2(e11, function({ value: e12 }, t10) {
              var r10, n10;
              let s10;
              if (e12) if (e12.kind === rs.REDIRECT) s10 = JSON.stringify(e12.props).length;
              else if (e12.kind === rs.IMAGE) throw Object.defineProperty(Error("invariant image should not be incremental-cache"), "__NEXT_ERROR_CODE", { value: "E501", enumerable: false, configurable: true });
              else s10 = e12.kind === rs.FETCH ? JSON.stringify(e12.data || "").length : e12.kind === rs.APP_ROUTE ? e12.body.length : e12.kind === rs.APP_PAGE ? Math.max(1, e12.html.length + rx(e12.rscData) + ((null == (r10 = e12.postponed) ? void 0 : r10.length) || 0) + function(e13) {
                if (!e13) return 0;
                let t11 = 0;
                for (let [r11, n11] of e13) t11 += r11.length + rx(n11);
                return t11;
              }(e12.segmentData)) : e12.html.length + ((null == (n10 = JSON.stringify(e12.pageData)) ? void 0 : n10.length) || 0);
              else s10 = 25;
              return t10.length + s10;
            })), r;
          }(e10.maxMemoryCacheSize)) : rP.debug && console.log("FileSystemCache: not using memory store for fetch cache");
        }
        resetRequestCache() {
        }
        async revalidateTag(e10, t10) {
          if (e10 = "string" == typeof e10 ? [e10] : e10, rP.debug && console.log("FileSystemCache: revalidateTag", e10, t10), 0 === e10.length) return;
          let r10 = Date.now();
          for (let n10 of e10) {
            let e11 = rT.get(n10) || {};
            if (t10) {
              let s10 = { ...e11 };
              s10.stale = r10, void 0 !== t10.expire && (s10.expired = r10 + 1e3 * t10.expire), rT.set(n10, s10);
            } else rT.set(n10, { ...e11, expired: r10 });
          }
        }
        async get(...e10) {
          var t10, r10, n10, s10, i10, a10;
          let [o2, l2] = e10, { kind: u2 } = l2, c2 = null == (t10 = rP.memoryCache) ? void 0 : t10.get(o2);
          if (rP.debug && (u2 === ri.FETCH ? console.log("FileSystemCache: get", o2, l2.tags, u2, !!c2) : console.log("FileSystemCache: get", o2, u2, !!c2)), (null == c2 || null == (r10 = c2.value) ? void 0 : r10.kind) === rs.APP_PAGE || (null == c2 || null == (n10 = c2.value) ? void 0 : n10.kind) === rs.APP_ROUTE || (null == c2 || null == (s10 = c2.value) ? void 0 : s10.kind) === rs.PAGES) {
            let e11 = null == (a10 = c2.value.headers) ? void 0 : a10[k];
            if ("string" == typeof e11) {
              let t11 = e11.split(",");
              if (t11.length > 0 && rR(t11, c2.lastModified)) return rP.debug && console.log("FileSystemCache: expired tags", t11), null;
            }
          } else if ((null == c2 || null == (i10 = c2.value) ? void 0 : i10.kind) === rs.FETCH) {
            let e11 = l2.kind === ri.FETCH ? [...l2.tags || [], ...l2.softTags || []] : [];
            if (e11.some((e12) => this.revalidatedTags.includes(e12))) return rP.debug && console.log("FileSystemCache: was revalidated", e11), null;
            if (rR(e11, c2.lastModified)) return rP.debug && console.log("FileSystemCache: expired tags", e11), null;
          }
          return c2 ?? null;
        }
        async set(e10, t10, r10) {
          var n10;
          if (null == (n10 = rP.memoryCache) || n10.set(e10, { value: t10, lastModified: Date.now() }), rP.debug && console.log("FileSystemCache: set", e10), !this.flushToDisk || !t10) return;
          let s10 = new rC(this.fs);
          if (t10.kind === rs.APP_ROUTE) {
            let r11 = this.getFilePath(`${e10}.body`, ri.APP_ROUTE);
            s10.append(r11, t10.body);
            let n11 = { headers: t10.headers, status: t10.status, postponed: void 0, segmentPaths: void 0, prefetchHints: void 0 };
            s10.append(r11.replace(/\.body$/, S), JSON.stringify(n11, null, 2));
          } else if (t10.kind === rs.PAGES || t10.kind === rs.APP_PAGE) {
            let n11 = t10.kind === rs.APP_PAGE, i10 = this.getFilePath(`${e10}.html`, n11 ? ri.APP_PAGE : ri.PAGES);
            if (s10.append(i10, t10.html), r10.fetchCache || r10.isFallback || r10.isRoutePPREnabled || s10.append(this.getFilePath(`${e10}${n11 ? ".rsc" : ".json"}`, n11 ? ri.APP_PAGE : ri.PAGES), n11 ? t10.rscData : JSON.stringify(t10.pageData)), (null == t10 ? void 0 : t10.kind) === rs.APP_PAGE) {
              let e11;
              if (t10.segmentData) {
                e11 = [];
                let r12 = i10.replace(/\.html$/, ".segments");
                for (let [n12, i11] of t10.segmentData) {
                  e11.push(n12);
                  let t11 = r12 + n12 + ".segment.rsc";
                  s10.append(t11, i11);
                }
              }
              let r11 = { headers: t10.headers, status: t10.status, postponed: t10.postponed, segmentPaths: e11, prefetchHints: void 0 };
              s10.append(i10.replace(/\.html$/, S), JSON.stringify(r11));
            }
          } else if (t10.kind === rs.FETCH) {
            let n11 = this.getFilePath(e10, ri.FETCH);
            s10.append(n11, JSON.stringify({ ...t10, tags: r10.fetchCache ? r10.tags : [] }));
          }
          await s10.wait();
        }
        getFilePath(e10, t10) {
          switch (t10) {
            case ri.FETCH:
              return rk.default.join(this.serverDistDir, "..", "cache", "fetch-cache", e10);
            case ri.PAGES:
              return rk.default.join(this.serverDistDir, "pages", e10);
            case ri.IMAGE:
            case ri.APP_PAGE:
            case ri.APP_ROUTE:
              return rk.default.join(this.serverDistDir, "app", e10);
            default:
              throw Object.defineProperty(Error(`Unexpected file path kind: ${t10}`), "__NEXT_ERROR_CODE", { value: "E479", enumerable: false, configurable: true });
          }
        }
      }
      let rA = ["(..)(..)", "(.)", "(..)", "(...)"], rI = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, rN = /\/\[[^/]+\](?=\/|$)/;
      function rj(e10) {
        return e10.replace(/(?:\/index)?\/?$/, "") || "/";
      }
      class rL {
        static #e = this.cacheControls = /* @__PURE__ */ new Map();
        constructor(e10) {
          this.prerenderManifest = e10;
        }
        get(e10) {
          let t10 = rL.cacheControls.get(e10);
          if (t10) return t10;
          let r10 = this.prerenderManifest.routes[e10];
          if (r10) {
            let { initialRevalidateSeconds: e11, initialExpireSeconds: t11 } = r10;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
          let n10 = this.prerenderManifest.dynamicRoutes[e10];
          if (n10) {
            let { fallbackRevalidate: e11, fallbackExpire: t11 } = n10;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
        }
        set(e10, t10) {
          rL.cacheControls.set(e10, t10);
        }
        clear() {
          rL.cacheControls.clear();
        }
      }
      function r$(e10) {
        let t10 = "buffer" in e10 ? new Uint8Array(e10.buffer, e10.byteOffset, e10.byteLength) : new Uint8Array(e10), r10 = "";
        for (let e11 of t10) r10 += e11.toString(16).padStart(2, "0");
        return r10;
      }
      async function rM(e10) {
        {
          let t10 = new TextEncoder().encode(e10);
          return r$(await crypto.subtle.digest("SHA-256", t10));
        }
      }
      e.i(67914);
      class rD {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor({ fs: e10, dev: t10, flushToDisk: r10, minimalMode: n10, serverDistDir: s10, requestHeaders: i10, maxMemoryCacheSize: a10, getPrerenderManifest: o2, fetchCacheKeyPrefix: l2, CurCacheHandler: u2, allowedRevalidateHeaderKeys: c2 }) {
          var d2, h2, p2, f2;
          this.locks = /* @__PURE__ */ new Map(), this.hasCustomCacheHandler = !!u2;
          const g2 = Symbol.for("@next/cache-handlers"), m2 = globalThis;
          if (u2) rD.debug && console.log("IncrementalCache: using custom cache handler", u2.name);
          else {
            const t11 = m2[g2];
            (null == t11 ? void 0 : t11.FetchCache) ? (u2 = t11.FetchCache, rD.debug && console.log("IncrementalCache: using global FetchCache cache handler")) : e10 && s10 && (rD.debug && console.log("IncrementalCache: using filesystem cache handler"), u2 = rP);
          }
          process.env.__NEXT_TEST_MAX_ISR_CACHE && (a10 = parseInt(process.env.__NEXT_TEST_MAX_ISR_CACHE, 10)), this.dev = t10, this.disableForTestmode = "true" === process.env.NEXT_PRIVATE_TEST_PROXY, this.minimalMode = n10, this.requestHeaders = i10, this.allowedRevalidateHeaderKeys = c2, this.prerenderManifest = o2(), this.cacheControls = new rL(this.prerenderManifest), this.fetchCacheKeyPrefix = l2;
          let _2 = [];
          i10[v] === (null == (h2 = this.prerenderManifest) || null == (d2 = h2.preview) ? void 0 : d2.previewModeId) && (this.isOnDemandRevalidate = true), n10 && (_2 = this.revalidatedTags = function(e11, t11) {
            return "string" == typeof e11[T] && e11["x-next-revalidate-tag-token"] === t11 ? e11[T].split(",") : [];
          }(i10, null == (f2 = this.prerenderManifest) || null == (p2 = f2.preview) ? void 0 : p2.previewModeId)), u2 && (this.cacheHandler = new u2({ dev: t10, fs: e10, flushToDisk: r10, serverDistDir: s10, revalidatedTags: _2, maxMemoryCacheSize: a10, _requestHeaders: i10, fetchCacheKeyPrefix: l2 }));
        }
        calculateRevalidate(e10, t10, r10, n10) {
          if (r10) return Math.floor(performance.timeOrigin + performance.now() - 1e3);
          let s10 = this.cacheControls.get(rj(e10)), i10 = s10 ? s10.revalidate : !n10 && 1;
          return "number" == typeof i10 ? 1e3 * i10 + t10 : i10;
        }
        _getPathname(e10, t10) {
          return t10 ? e10 : /^\/index(\/|$)/.test(e10) && !function(e11, t11 = true) {
            return (void 0 !== e11.split("/").find((e12) => rA.find((t12) => e12.startsWith(t12))) && (e11 = function(e12) {
              let t12, r10, n10;
              for (let s10 of e12.split("/")) if (r10 = rA.find((e13) => s10.startsWith(e13))) {
                [t12, n10] = e12.split(r10, 2);
                break;
              }
              if (!t12 || !r10 || !n10) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", { value: "E269", enumerable: false, configurable: true });
              switch (t12 = eB(t12), r10) {
                case "(.)":
                  n10 = "/" === t12 ? `/${n10}` : t12 + "/" + n10;
                  break;
                case "(..)":
                  if ("/" === t12) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", { value: "E207", enumerable: false, configurable: true });
                  n10 = t12.split("/").slice(0, -1).concat(n10).join("/");
                  break;
                case "(...)":
                  n10 = "/" + n10;
                  break;
                case "(..)(..)":
                  let s10 = t12.split("/");
                  if (s10.length <= 2) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", { value: "E486", enumerable: false, configurable: true });
                  n10 = s10.slice(0, -2).concat(n10).join("/");
                  break;
                default:
                  throw Object.defineProperty(Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", { value: "E112", enumerable: false, configurable: true });
              }
              return { interceptingRoute: t12, interceptedRoute: n10 };
            }(e11).interceptedRoute), t11) ? rN.test(e11) : rI.test(e11);
          }(e10) ? `/index${e10}` : "/" === e10 ? "/index" : eq(e10);
        }
        resetRequestCache() {
          var e10, t10;
          null == (t10 = this.cacheHandler) || null == (e10 = t10.resetRequestCache) || e10.call(t10);
        }
        async lock(e10) {
          for (; ; ) {
            let t11 = this.locks.get(e10);
            if (rD.debug && console.log("IncrementalCache: lock get", e10, !!t11), !t11) break;
            await t11;
          }
          let { resolve: t10, promise: r10 } = new tQ();
          return rD.debug && console.log("IncrementalCache: successfully locked", e10), this.locks.set(e10, r10), () => {
            t10(), this.locks.delete(e10);
          };
        }
        async revalidateTag(e10, t10) {
          var r10;
          return null == (r10 = this.cacheHandler) ? void 0 : r10.revalidateTag(e10, t10);
        }
        async generateSimpleCacheKey(e10) {
          return rM(JSON.stringify(["v4", this.fetchCacheKeyPrefix || "", e10]));
        }
        async generateCacheKey(e10, t10 = {}) {
          let r10 = [], n10 = new TextEncoder(), s10 = null, i10 = t10.body;
          if (i10) if ("object" == typeof i10 && "byteLength" in i10) r10.push(`bytes:${r$(i10)}`), t10._ogBody = i10;
          else if ("function" == typeof i10.getReader) {
            let e11 = [];
            try {
              await i10.pipeTo(new WritableStream({ write(t11) {
                e11.push("string" == typeof t11 ? n10.encode(t11) : t11);
              } }));
              let s11 = e11.reduce((e12, t11) => e12 + t11.length, 0), a11 = new Uint8Array(s11), o2 = 0;
              for (let t11 of e11) a11.set(t11, o2), o2 += t11.length;
              r10.push(`bytes:${r$(a11)}`), t10._ogBody = a11;
            } catch (e12) {
              console.error("Problem reading body", e12);
            }
          } else if ("function" == typeof i10.keys) for (let [e11, n11] of (s10 = "[object FormData]" === String(i10) ? "multipart/form-data; boundary=" : "application/x-www-form-urlencoded;charset=UTF-8", t10._ogBody = i10, i10.entries())) r10.push(`key:${e11}`), "string" == typeof n11 ? r10.push(`str:${n11}`) : r10.push("file", n11.name, n11.type, `bytes:${r$(await n11.arrayBuffer())}`);
          else if ("function" == typeof i10.arrayBuffer) {
            let e11 = await i10.arrayBuffer();
            r10.push("blob", i10.type, `bytes:${r$(e11)}`), t10._ogBody = new Blob([e11], { type: i10.type }), s10 = i10.type;
          } else if ("string" == typeof i10) r10.push(`str:${i10}`), t10._ogBody = i10, s10 = "text/plain;charset=UTF-8";
          else throw Object.defineProperty(Error(`Unsupported body type: ${typeof i10}`), "__NEXT_ERROR_CODE", { value: "E1443", enumerable: false, configurable: true });
          let a10 = "function" == typeof (t10.headers || {}).keys ? Object.fromEntries(t10.headers) : Object.assign({}, t10.headers);
          return "traceparent" in a10 && delete a10.traceparent, "tracestate" in a10 && delete a10.tracestate, rM(JSON.stringify(["v4", this.fetchCacheKeyPrefix || "", e10, t10.method, s10, a10, t10.mode, t10.redirect, t10.credentials, t10.referrer, t10.referrerPolicy, t10.integrity, t10.cache, r10]));
        }
        async get(e10, t10) {
          var r10, n10, s10, i10, a10, o2, l2;
          let u2, c2;
          if (t10.kind === ri.FETCH) {
            let r11 = tS.getStore(), n11 = r11 ? tk(r11) : null;
            if (n11) {
              let r12 = n11.fetch.get(e10);
              if ((null == r12 ? void 0 : r12.kind) === rs.FETCH) {
                let n12 = eW.getStore();
                if (![...t10.tags || [], ...t10.softTags || []].some((e11) => {
                  var t11, r13;
                  return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == n12 || null == (r13 = n12.pendingRevalidatedTags) ? void 0 : r13.some((t12) => t12.tag === e11));
                })) return rD.debug && console.log("IncrementalCache: rdc:hit", e10), { isStale: false, value: r12 };
                rD.debug && console.log("IncrementalCache: rdc:revalidated-tag", e10);
              } else rD.debug && console.log("IncrementalCache: rdc:miss", e10);
            } else rD.debug && console.log("IncrementalCache: rdc:no-resume-data");
          }
          if (this.disableForTestmode || this.dev && (t10.kind !== ri.FETCH || "no-cache" === this.requestHeaders["cache-control"])) return null;
          e10 = this._getPathname(e10, t10.kind === ri.FETCH);
          let d2 = await (null == (r10 = this.cacheHandler) ? void 0 : r10.get(e10, t10));
          if (t10.kind === ri.FETCH) {
            if (!d2) return null;
            if ((null == (s10 = d2.value) ? void 0 : s10.kind) !== rs.FETCH) throw Object.defineProperty(new tR(`Expected cached value for cache key ${JSON.stringify(e10)} to be a "FETCH" kind, got ${JSON.stringify(null == (i10 = d2.value) ? void 0 : i10.kind)} instead.`), "__NEXT_ERROR_CODE", { value: "E653", enumerable: false, configurable: true });
            let r11 = eW.getStore(), n11 = [...t10.tags || [], ...t10.softTags || []];
            if (n11.some((e11) => {
              var t11, n12;
              return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == r11 || null == (n12 = r11.pendingRevalidatedTags) ? void 0 : n12.some((t12) => t12.tag === e11));
            })) return rD.debug && console.log("IncrementalCache: expired tag", e10), null;
            let a11 = tS.getStore();
            if (a11) {
              let t11 = tk(a11);
              (null == t11 ? void 0 : t11.mutable) && (rD.debug && console.log("IncrementalCache: rdc:set", e10), t11.fetch.set(e10, d2.value));
            }
            let o3 = t10.revalidate || d2.value.revalidate, l3 = (performance.timeOrigin + performance.now() - (d2.lastModified || 0)) / 1e3 > o3, u3 = d2.value.data;
            return rR(n11, d2.lastModified) ? null : (rO(n11, d2.lastModified) && (l3 = true), { isStale: l3, value: { kind: rs.FETCH, data: u3, revalidate: o3 } });
          }
          if ((null == d2 || null == (n10 = d2.value) ? void 0 : n10.kind) === rs.FETCH) throw Object.defineProperty(new tR(`Expected cached value for cache key ${JSON.stringify(e10)} not to be a ${JSON.stringify(t10.kind)} kind, got "FETCH" instead.`), "__NEXT_ERROR_CODE", { value: "E652", enumerable: false, configurable: true });
          let h2 = null, { isFallback: p2 } = t10, f2 = this.cacheControls.get(rj(e10));
          if ((null == d2 ? void 0 : d2.lastModified) === -1) u2 = -1, c2 = -31536e6;
          else {
            let r11 = performance.timeOrigin + performance.now(), n11 = (null == d2 ? void 0 : d2.lastModified) || r11;
            c2 = this.calculateRevalidate(e10, n11, this.dev ?? false, t10.isFallback);
            let s11 = "number" == typeof (null == f2 ? void 0 : f2.expire) ? 1e3 * f2.expire + n11 : void 0;
            if (void 0 !== s11 && s11 < r11) u2 = -1;
            else if (void 0 === (u2 = false !== c2 && c2 < r11 || void 0) && ((null == d2 || null == (a10 = d2.value) ? void 0 : a10.kind) === rs.APP_PAGE || (null == d2 || null == (o2 = d2.value) ? void 0 : o2.kind) === rs.APP_ROUTE)) {
              let e11 = null == (l2 = d2.value.headers) ? void 0 : l2[k];
              if ("string" == typeof e11) {
                let t11 = e11.split(",");
                t11.length > 0 && (rR(t11, n11) ? u2 = -1 : rO(t11, n11) && (u2 = true));
              }
            }
          }
          return d2 && (h2 = { isStale: u2, cacheControl: f2, revalidateAfter: c2, value: d2.value, isFallback: p2 }), !d2 && this.prerenderManifest.notFoundRoutes.includes(e10) && (h2 = { isStale: u2, value: null, cacheControl: f2, revalidateAfter: c2, isFallback: p2 }, this.set(e10, h2.value, { ...t10, cacheControl: f2 })), h2;
        }
        async set(e10, t10, r10) {
          if ((null == t10 ? void 0 : t10.kind) === rs.FETCH) {
            let r11 = tS.getStore(), n11 = r11 ? tk(r11) : null;
            (null == n11 ? void 0 : n11.mutable) && (rD.debug && console.log("IncrementalCache: rdc:set", e10), n11.fetch.set(e10, t10));
          }
          if (this.disableForTestmode || this.dev && !r10.fetchCache) return;
          e10 = this._getPathname(e10, r10.fetchCache);
          let n10 = JSON.stringify(t10).length;
          if (r10.fetchCache && n10 > 2097152 && !this.hasCustomCacheHandler && !r10.isImplicitBuildTimeCache) {
            let t11 = `Failed to set Next.js data cache for ${r10.fetchUrl || e10}, items over 2MB can not be cached (${n10} bytes)`;
            if (this.dev) throw Object.defineProperty(Error(t11), "__NEXT_ERROR_CODE", { value: "E1003", enumerable: false, configurable: true });
            console.warn(t11);
            return;
          }
          try {
            var s10;
            !r10.fetchCache && r10.cacheControl && this.cacheControls.set(rj(e10), r10.cacheControl), await (null == (s10 = this.cacheHandler) ? void 0 : s10.set(e10, t10, r10));
          } catch (t11) {
            console.warn("Failed to update prerender cache for", e10, t11);
          }
        }
      }
      e.i(64445);
      var rU = e.i(40049), rq = ((eo = {})[eo.Before = 1] = "Before", eo[eo.ShellStatic = 11] = "ShellStatic", eo[eo.Static = 13] = "Static", eo[eo.ShellRuntime = 21] = "ShellRuntime", eo[eo.Runtime = 23] = "Runtime", eo[eo.Dynamic = 30] = "Dynamic", eo[eo.Abandoned = 40] = "Abandoned", eo);
      if (/* @__PURE__ */ new WeakMap(), rq.ShellRuntime, rq.Static, rq.Runtime, rU.default.unstable_postpone, false === ("Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error".includes("needs to bail out of prerendering at this point because it used") && "Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error".includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      function rB(e10, t10, r10) {
        return "string" == typeof e10 ? e10 : e10[t10] || r10;
      }
      function rH(e10) {
        let t10 = function() {
          try {
            return "true" === process.env._next_intl_trailing_slash;
          } catch {
            return false;
          }
        }(), [r10, ...n10] = e10.split("#"), s10 = n10.join("#"), i10 = r10;
        if ("/" !== i10) {
          let e11 = i10.endsWith("/");
          t10 && !e11 ? i10 += "/" : !t10 && e11 && (i10 = i10.slice(0, -1));
        }
        return s10 && (i10 += "#" + s10), i10;
      }
      function rG(e10, t10) {
        let r10 = rH(e10), n10 = rH(t10);
        return rV(r10).test(n10);
      }
      function rF(e10, t10) {
        return "never" !== t10.mode && t10.prefixes?.[e10] || "/" + e10;
      }
      function rV(e10) {
        let t10 = e10.replace(/\/\[\[(\.\.\.[^\]]+)\]\]/g, "(?:/(.*))?").replace(/\[\[(\.\.\.[^\]]+)\]\]/g, "(?:/(.*))?").replace(/\[(\.\.\.[^\]]+)\]/g, "(.+)").replace(/\[([^\]]+)\]/g, "([^/]+)");
        return RegExp(`^${t10}$`);
      }
      function rz(e10) {
        return e10.includes("[[...");
      }
      function rK(e10) {
        return e10.includes("[...");
      }
      function rW(e10) {
        return e10.includes("[");
      }
      function rJ(e10, t10) {
        let r10 = e10.split("/"), n10 = t10.split("/"), s10 = Math.max(r10.length, n10.length);
        for (let e11 = 0; e11 < s10; e11++) {
          let t11 = r10[e11], s11 = n10[e11];
          if (!t11 && s11) return -1;
          if (t11 && !s11) return 1;
          if (t11 || s11) {
            if (!rW(t11) && rW(s11)) return -1;
            if (rW(t11) && !rW(s11)) return 1;
            if (!rK(t11) && rK(s11)) return -1;
            if (rK(t11) && !rK(s11)) return 1;
            if (!rz(t11) && rz(s11)) return -1;
            if (rz(t11) && !rz(s11)) return 1;
          }
        }
        return 0;
      }
      function rX(e10, t10, r10, n10) {
        let s10 = "";
        return s10 += function(e11, t11) {
          if (!t11) return e11;
          let r11 = e11 = e11.replace(/\[\[/g, "[").replace(/\]\]/g, "]");
          return Object.entries(t11).forEach(([e12, t12]) => {
            r11 = r11.replace(`[${e12}]`, t12);
          }), r11;
        }(r10, function(e11, t11) {
          let r11 = rH(t11), n11 = rH(e11), s11 = rV(n11).exec(r11);
          if (!s11) return;
          let i10 = {}, a10 = n11.match(/\[([^\]]+)\]/g) ?? [];
          for (let e12 = 1; e12 < s11.length; e12++) {
            let t12 = a10[e12 - 1];
            if (!t12) continue;
            let r12 = t12.replace(/[[\]]/g, ""), n12 = s11[e12] ?? "";
            i10[r12] = n12;
          }
          return i10;
        }(t10, e10)), s10 = rH(s10);
      }
      function rY(e10, t10, r10) {
        e10.endsWith("/") || (e10 += "/");
        let n10 = rZ(t10, r10), s10 = RegExp(`^(${n10.map(([, e11]) => e11.replaceAll("/", "\\/")).join("|")})/(.*)`, "i"), i10 = e10.match(s10), a10 = i10 ? "/" + i10[2] : e10;
        return "/" !== a10 && (a10 = rH(a10)), a10;
      }
      function rZ(e10, t10, r10 = true) {
        let n10 = e10.map((e11) => [e11, rF(e11, t10)]);
        return r10 && n10.sort((e11, t11) => t11[1].length - e11[1].length), n10;
      }
      function rQ(e10, t10, r10, n10) {
        let s10 = rZ(t10, r10);
        for (let [t11, r11] of (n10 && s10.sort(([e11], [t12]) => {
          if (e11 === n10.defaultLocale) return -1;
          if (t12 === n10.defaultLocale) return 1;
          let r12 = n10.locales.includes(e11), s11 = n10.locales.includes(t12);
          return r12 && !s11 ? -1 : !r12 && s11 ? 1 : 0;
        }), s10)) {
          let n11, s11;
          if (e10 === r11 || e10.startsWith(r11 + "/")) n11 = s11 = true;
          else {
            let t12 = e10.toLowerCase(), i10 = r11.toLowerCase();
            (t12 === i10 || t12.startsWith(i10 + "/")) && (n11 = false, s11 = true);
          }
          if (s11) return { locale: t11, prefix: r11, matchedPrefix: e10.slice(0, r11.length), exact: n11 };
        }
      }
      function r0(e10, t10, r10) {
        var n10;
        let s10, i10 = e10;
        return t10 && (n10 = i10, s10 = t10, /^\/(\?.*)?$/.test(n10) && (n10 = n10.slice(1)), i10 = s10 += n10), r10 && (i10 += r10), i10;
      }
      function r1(e10) {
        return e10.get("x-forwarded-host") ?? e10.get("host") ?? void 0;
      }
      function r2(e10, t10) {
        return t10.defaultLocale === e10 || t10.locales.includes(e10);
      }
      function r3(e10, t10, r10) {
        let n10;
        return e10 && r2(t10, e10) && (n10 = e10), n10 || (n10 = r10.find((e11) => e11.defaultLocale === t10)), n10 || (n10 = r10.find((e11) => e11.locales.includes(t10))), n10;
      }
      RegExp("\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)"), RegExp("\\n\\s+at __next_metadata_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_viewport_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_outlet_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_instant_validation_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_instant_slot_(\\d+)__[\\n\\s]"), eK();
      function r4(e10, t10, r10, n10) {
        let s10 = null == n10 || "number" == typeof n10 || "boolean" == typeof n10 ? n10 : r10(n10), i10 = t10.get(s10);
        return void 0 === i10 && (i10 = e10.call(this, n10), t10.set(s10, i10)), i10;
      }
      function r5(e10, t10, r10) {
        let n10 = Array.prototype.slice.call(arguments, 3), s10 = r10(n10), i10 = t10.get(s10);
        return void 0 === i10 && (i10 = e10.apply(this, n10), t10.set(s10, i10)), i10;
      }
      var r6 = class {
        constructor() {
          this.cache = /* @__PURE__ */ Object.create(null);
        }
        get(e10) {
          return this.cache[e10];
        }
        set(e10, t10) {
          this.cache[e10] = t10;
        }
      };
      let r8 = { "written-new": [{ paradigmLocales: { _locales: "en en_GB es es_419 pt_BR pt_PT" } }, { $enUS: { _value: "AS+CA+GU+MH+MP+PH+PR+UM+US+VI" } }, { $cnsar: { _value: "HK+MO" } }, { $americas: { _value: "019" } }, { $maghreb: { _value: "MA+DZ+TN+LY+MR+EH" } }, { no: { _desired: "nb", _distance: "1" } }, { bs: { _desired: "hr", _distance: "4" } }, { bs: { _desired: "sh", _distance: "4" } }, { hr: { _desired: "sh", _distance: "4" } }, { sr: { _desired: "sh", _distance: "4" } }, { aa: { _desired: "ssy", _distance: "4" } }, { de: { _desired: "gsw", _distance: "4", _oneway: "true" } }, { de: { _desired: "lb", _distance: "4", _oneway: "true" } }, { no: { _desired: "da", _distance: "8" } }, { nb: { _desired: "da", _distance: "8" } }, { ru: { _desired: "ab", _distance: "30", _oneway: "true" } }, { en: { _desired: "ach", _distance: "30", _oneway: "true" } }, { nl: { _desired: "af", _distance: "20", _oneway: "true" } }, { en: { _desired: "ak", _distance: "30", _oneway: "true" } }, { en: { _desired: "am", _distance: "30", _oneway: "true" } }, { es: { _desired: "ay", _distance: "20", _oneway: "true" } }, { ru: { _desired: "az", _distance: "30", _oneway: "true" } }, { ur: { _desired: "bal", _distance: "20", _oneway: "true" } }, { ru: { _desired: "be", _distance: "20", _oneway: "true" } }, { en: { _desired: "bem", _distance: "30", _oneway: "true" } }, { hi: { _desired: "bh", _distance: "30", _oneway: "true" } }, { en: { _desired: "bn", _distance: "30", _oneway: "true" } }, { zh: { _desired: "bo", _distance: "20", _oneway: "true" } }, { fr: { _desired: "br", _distance: "20", _oneway: "true" } }, { es: { _desired: "ca", _distance: "20", _oneway: "true" } }, { fil: { _desired: "ceb", _distance: "30", _oneway: "true" } }, { en: { _desired: "chr", _distance: "20", _oneway: "true" } }, { ar: { _desired: "ckb", _distance: "30", _oneway: "true" } }, { fr: { _desired: "co", _distance: "20", _oneway: "true" } }, { fr: { _desired: "crs", _distance: "20", _oneway: "true" } }, { sk: { _desired: "cs", _distance: "20" } }, { en: { _desired: "cy", _distance: "20", _oneway: "true" } }, { en: { _desired: "ee", _distance: "30", _oneway: "true" } }, { en: { _desired: "eo", _distance: "30", _oneway: "true" } }, { es: { _desired: "eu", _distance: "20", _oneway: "true" } }, { da: { _desired: "fo", _distance: "20", _oneway: "true" } }, { nl: { _desired: "fy", _distance: "20", _oneway: "true" } }, { en: { _desired: "ga", _distance: "20", _oneway: "true" } }, { en: { _desired: "gaa", _distance: "30", _oneway: "true" } }, { en: { _desired: "gd", _distance: "20", _oneway: "true" } }, { es: { _desired: "gl", _distance: "20", _oneway: "true" } }, { es: { _desired: "gn", _distance: "20", _oneway: "true" } }, { hi: { _desired: "gu", _distance: "30", _oneway: "true" } }, { en: { _desired: "ha", _distance: "30", _oneway: "true" } }, { en: { _desired: "haw", _distance: "20", _oneway: "true" } }, { fr: { _desired: "ht", _distance: "20", _oneway: "true" } }, { ru: { _desired: "hy", _distance: "30", _oneway: "true" } }, { en: { _desired: "ia", _distance: "30", _oneway: "true" } }, { en: { _desired: "ig", _distance: "30", _oneway: "true" } }, { en: { _desired: "is", _distance: "20", _oneway: "true" } }, { id: { _desired: "jv", _distance: "20", _oneway: "true" } }, { en: { _desired: "ka", _distance: "30", _oneway: "true" } }, { fr: { _desired: "kg", _distance: "30", _oneway: "true" } }, { ru: { _desired: "kk", _distance: "30", _oneway: "true" } }, { en: { _desired: "km", _distance: "30", _oneway: "true" } }, { en: { _desired: "kn", _distance: "30", _oneway: "true" } }, { en: { _desired: "kri", _distance: "30", _oneway: "true" } }, { tr: { _desired: "ku", _distance: "30", _oneway: "true" } }, { ru: { _desired: "ky", _distance: "30", _oneway: "true" } }, { it: { _desired: "la", _distance: "20", _oneway: "true" } }, { en: { _desired: "lg", _distance: "30", _oneway: "true" } }, { fr: { _desired: "ln", _distance: "30", _oneway: "true" } }, { en: { _desired: "lo", _distance: "30", _oneway: "true" } }, { en: { _desired: "loz", _distance: "30", _oneway: "true" } }, { fr: { _desired: "lua", _distance: "30", _oneway: "true" } }, { hi: { _desired: "mai", _distance: "20", _oneway: "true" } }, { en: { _desired: "mfe", _distance: "30", _oneway: "true" } }, { fr: { _desired: "mg", _distance: "30", _oneway: "true" } }, { en: { _desired: "mi", _distance: "20", _oneway: "true" } }, { en: { _desired: "ml", _distance: "30", _oneway: "true" } }, { ru: { _desired: "mn", _distance: "30", _oneway: "true" } }, { hi: { _desired: "mr", _distance: "30", _oneway: "true" } }, { id: { _desired: "ms", _distance: "30", _oneway: "true" } }, { en: { _desired: "mt", _distance: "30", _oneway: "true" } }, { en: { _desired: "my", _distance: "30", _oneway: "true" } }, { en: { _desired: "ne", _distance: "30", _oneway: "true" } }, { nb: { _desired: "nn", _distance: "20" } }, { no: { _desired: "nn", _distance: "20" } }, { en: { _desired: "nso", _distance: "30", _oneway: "true" } }, { en: { _desired: "ny", _distance: "30", _oneway: "true" } }, { en: { _desired: "nyn", _distance: "30", _oneway: "true" } }, { fr: { _desired: "oc", _distance: "20", _oneway: "true" } }, { en: { _desired: "om", _distance: "30", _oneway: "true" } }, { en: { _desired: "or", _distance: "30", _oneway: "true" } }, { en: { _desired: "pa", _distance: "30", _oneway: "true" } }, { en: { _desired: "pcm", _distance: "20", _oneway: "true" } }, { en: { _desired: "ps", _distance: "30", _oneway: "true" } }, { es: { _desired: "qu", _distance: "30", _oneway: "true" } }, { de: { _desired: "rm", _distance: "20", _oneway: "true" } }, { en: { _desired: "rn", _distance: "30", _oneway: "true" } }, { fr: { _desired: "rw", _distance: "30", _oneway: "true" } }, { hi: { _desired: "sa", _distance: "30", _oneway: "true" } }, { en: { _desired: "sd", _distance: "30", _oneway: "true" } }, { en: { _desired: "si", _distance: "30", _oneway: "true" } }, { en: { _desired: "sn", _distance: "30", _oneway: "true" } }, { en: { _desired: "so", _distance: "30", _oneway: "true" } }, { en: { _desired: "sq", _distance: "30", _oneway: "true" } }, { en: { _desired: "st", _distance: "30", _oneway: "true" } }, { id: { _desired: "su", _distance: "20", _oneway: "true" } }, { en: { _desired: "sw", _distance: "30", _oneway: "true" } }, { en: { _desired: "ta", _distance: "30", _oneway: "true" } }, { en: { _desired: "te", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tg", _distance: "30", _oneway: "true" } }, { en: { _desired: "ti", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tk", _distance: "30", _oneway: "true" } }, { en: { _desired: "tlh", _distance: "30", _oneway: "true" } }, { en: { _desired: "tn", _distance: "30", _oneway: "true" } }, { en: { _desired: "to", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tt", _distance: "30", _oneway: "true" } }, { en: { _desired: "tum", _distance: "30", _oneway: "true" } }, { zh: { _desired: "ug", _distance: "20", _oneway: "true" } }, { ru: { _desired: "uk", _distance: "20", _oneway: "true" } }, { en: { _desired: "ur", _distance: "30", _oneway: "true" } }, { ru: { _desired: "uz", _distance: "30", _oneway: "true" } }, { fr: { _desired: "wo", _distance: "30", _oneway: "true" } }, { en: { _desired: "xh", _distance: "30", _oneway: "true" } }, { en: { _desired: "yi", _distance: "30", _oneway: "true" } }, { en: { _desired: "yo", _distance: "30", _oneway: "true" } }, { zh: { _desired: "za", _distance: "20", _oneway: "true" } }, { en: { _desired: "zu", _distance: "30", _oneway: "true" } }, { ar: { _desired: "aao", _distance: "10", _oneway: "true" } }, { ar: { _desired: "abh", _distance: "10", _oneway: "true" } }, { ar: { _desired: "abv", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acm", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acq", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acw", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acx", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acy", _distance: "10", _oneway: "true" } }, { ar: { _desired: "adf", _distance: "10", _oneway: "true" } }, { ar: { _desired: "aeb", _distance: "10", _oneway: "true" } }, { ar: { _desired: "aec", _distance: "10", _oneway: "true" } }, { ar: { _desired: "afb", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ajp", _distance: "10", _oneway: "true" } }, { ar: { _desired: "apc", _distance: "10", _oneway: "true" } }, { ar: { _desired: "apd", _distance: "10", _oneway: "true" } }, { ar: { _desired: "arq", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ars", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ary", _distance: "10", _oneway: "true" } }, { ar: { _desired: "arz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "auz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "avl", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayh", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayl", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayn", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayp", _distance: "10", _oneway: "true" } }, { ar: { _desired: "bbz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "pga", _distance: "10", _oneway: "true" } }, { ar: { _desired: "shu", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ssh", _distance: "10", _oneway: "true" } }, { az: { _desired: "azb", _distance: "10", _oneway: "true" } }, { et: { _desired: "vro", _distance: "10", _oneway: "true" } }, { ff: { _desired: "ffm", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fub", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fue", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuf", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuh", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fui", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuq", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuv", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gnw", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gui", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gun", _distance: "10", _oneway: "true" } }, { gn: { _desired: "nhd", _distance: "10", _oneway: "true" } }, { iu: { _desired: "ikt", _distance: "10", _oneway: "true" } }, { kln: { _desired: "enb", _distance: "10", _oneway: "true" } }, { kln: { _desired: "eyo", _distance: "10", _oneway: "true" } }, { kln: { _desired: "niq", _distance: "10", _oneway: "true" } }, { kln: { _desired: "oki", _distance: "10", _oneway: "true" } }, { kln: { _desired: "pko", _distance: "10", _oneway: "true" } }, { kln: { _desired: "sgc", _distance: "10", _oneway: "true" } }, { kln: { _desired: "tec", _distance: "10", _oneway: "true" } }, { kln: { _desired: "tuy", _distance: "10", _oneway: "true" } }, { kok: { _desired: "gom", _distance: "10", _oneway: "true" } }, { kpe: { _desired: "gkp", _distance: "10", _oneway: "true" } }, { luy: { _desired: "ida", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lkb", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lko", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lks", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lri", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lrm", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lsm", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lto", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lts", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lwg", _distance: "10", _oneway: "true" } }, { luy: { _desired: "nle", _distance: "10", _oneway: "true" } }, { luy: { _desired: "nyd", _distance: "10", _oneway: "true" } }, { luy: { _desired: "rag", _distance: "10", _oneway: "true" } }, { lv: { _desired: "ltg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bhr", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bjq", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bmm", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bzc", _distance: "10", _oneway: "true" } }, { mg: { _desired: "msh", _distance: "10", _oneway: "true" } }, { mg: { _desired: "skg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "tdx", _distance: "10", _oneway: "true" } }, { mg: { _desired: "tkg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "txy", _distance: "10", _oneway: "true" } }, { mg: { _desired: "xmv", _distance: "10", _oneway: "true" } }, { mg: { _desired: "xmw", _distance: "10", _oneway: "true" } }, { mn: { _desired: "mvf", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bjn", _distance: "10", _oneway: "true" } }, { ms: { _desired: "btj", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bve", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bvu", _distance: "10", _oneway: "true" } }, { ms: { _desired: "coa", _distance: "10", _oneway: "true" } }, { ms: { _desired: "dup", _distance: "10", _oneway: "true" } }, { ms: { _desired: "hji", _distance: "10", _oneway: "true" } }, { ms: { _desired: "id", _distance: "10", _oneway: "true" } }, { ms: { _desired: "jak", _distance: "10", _oneway: "true" } }, { ms: { _desired: "jax", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kvb", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kvr", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kxd", _distance: "10", _oneway: "true" } }, { ms: { _desired: "lce", _distance: "10", _oneway: "true" } }, { ms: { _desired: "lcf", _distance: "10", _oneway: "true" } }, { ms: { _desired: "liw", _distance: "10", _oneway: "true" } }, { ms: { _desired: "max", _distance: "10", _oneway: "true" } }, { ms: { _desired: "meo", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mfa", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mfb", _distance: "10", _oneway: "true" } }, { ms: { _desired: "min", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mqg", _distance: "10", _oneway: "true" } }, { ms: { _desired: "msi", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mui", _distance: "10", _oneway: "true" } }, { ms: { _desired: "orn", _distance: "10", _oneway: "true" } }, { ms: { _desired: "ors", _distance: "10", _oneway: "true" } }, { ms: { _desired: "pel", _distance: "10", _oneway: "true" } }, { ms: { _desired: "pse", _distance: "10", _oneway: "true" } }, { ms: { _desired: "tmw", _distance: "10", _oneway: "true" } }, { ms: { _desired: "urk", _distance: "10", _oneway: "true" } }, { ms: { _desired: "vkk", _distance: "10", _oneway: "true" } }, { ms: { _desired: "vkt", _distance: "10", _oneway: "true" } }, { ms: { _desired: "xmm", _distance: "10", _oneway: "true" } }, { ms: { _desired: "zlm", _distance: "10", _oneway: "true" } }, { ms: { _desired: "zmi", _distance: "10", _oneway: "true" } }, { ne: { _desired: "dty", _distance: "10", _oneway: "true" } }, { om: { _desired: "gax", _distance: "10", _oneway: "true" } }, { om: { _desired: "hae", _distance: "10", _oneway: "true" } }, { om: { _desired: "orc", _distance: "10", _oneway: "true" } }, { or: { _desired: "spv", _distance: "10", _oneway: "true" } }, { ps: { _desired: "pbt", _distance: "10", _oneway: "true" } }, { ps: { _desired: "pst", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qub", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qud", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quf", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qug", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quk", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qul", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qup", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qur", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qus", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quw", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qux", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quy", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qva", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qve", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvi", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvj", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvl", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvm", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvn", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvo", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvp", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvs", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvw", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvz", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwa", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qws", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxa", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxl", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxn", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxo", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxp", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxr", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxt", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxu", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxw", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sdc", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sdn", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sro", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aae", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aat", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aln", _distance: "10", _oneway: "true" } }, { syr: { _desired: "aii", _distance: "10", _oneway: "true" } }, { uz: { _desired: "uzs", _distance: "10", _oneway: "true" } }, { yi: { _desired: "yih", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cdo", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cjy", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cpx", _distance: "10", _oneway: "true" } }, { zh: { _desired: "czh", _distance: "10", _oneway: "true" } }, { zh: { _desired: "czo", _distance: "10", _oneway: "true" } }, { zh: { _desired: "gan", _distance: "10", _oneway: "true" } }, { zh: { _desired: "hak", _distance: "10", _oneway: "true" } }, { zh: { _desired: "hsn", _distance: "10", _oneway: "true" } }, { zh: { _desired: "lzh", _distance: "10", _oneway: "true" } }, { zh: { _desired: "mnp", _distance: "10", _oneway: "true" } }, { zh: { _desired: "nan", _distance: "10", _oneway: "true" } }, { zh: { _desired: "wuu", _distance: "10", _oneway: "true" } }, { zh: { _desired: "yue", _distance: "10", _oneway: "true" } }, { "*": { _desired: "*", _distance: "80" } }, { "en-Latn": { _desired: "am-Ethi", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "az-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "bn-Beng", _distance: "10", _oneway: "true" } }, { "zh-Hans": { _desired: "bo-Tibt", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "hy-Armn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ka-Geor", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "km-Khmr", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "kn-Knda", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "lo-Laoo", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ml-Mlym", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "my-Mymr", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ne-Deva", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "or-Orya", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "pa-Guru", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ps-Arab", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "sd-Arab", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "si-Sinh", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ta-Taml", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "te-Telu", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ti-Ethi", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "tk-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ur-Arab", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "uz-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "yi-Hebr", _distance: "10", _oneway: "true" } }, { "sr-Cyrl": { _desired: "sr-Latn", _distance: "5" } }, { "zh-Hans": { _desired: "za-Latn", _distance: "10", _oneway: "true" } }, { "zh-Hans": { _desired: "zh-Hani", _distance: "20", _oneway: "true" } }, { "zh-Hant": { _desired: "zh-Hani", _distance: "20", _oneway: "true" } }, { "ar-Arab": { _desired: "ar-Latn", _distance: "20", _oneway: "true" } }, { "bn-Beng": { _desired: "bn-Latn", _distance: "20", _oneway: "true" } }, { "gu-Gujr": { _desired: "gu-Latn", _distance: "20", _oneway: "true" } }, { "hi-Deva": { _desired: "hi-Latn", _distance: "20", _oneway: "true" } }, { "kn-Knda": { _desired: "kn-Latn", _distance: "20", _oneway: "true" } }, { "ml-Mlym": { _desired: "ml-Latn", _distance: "20", _oneway: "true" } }, { "mr-Deva": { _desired: "mr-Latn", _distance: "20", _oneway: "true" } }, { "ta-Taml": { _desired: "ta-Latn", _distance: "20", _oneway: "true" } }, { "te-Telu": { _desired: "te-Latn", _distance: "20", _oneway: "true" } }, { "zh-Hans": { _desired: "zh-Latn", _distance: "20", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Latn", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hani", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hira", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Kana", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hrkt", _distance: "5", _oneway: "true" } }, { "ja-Hrkt": { _desired: "ja-Hira", _distance: "5", _oneway: "true" } }, { "ja-Hrkt": { _desired: "ja-Kana", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Hani", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Hang", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Jamo", _distance: "5", _oneway: "true" } }, { "ko-Hang": { _desired: "ko-Jamo", _distance: "5", _oneway: "true" } }, { "*-*": { _desired: "*-*", _distance: "50" } }, { "ar-*-$maghreb": { _desired: "ar-*-$maghreb", _distance: "4" } }, { "ar-*-$!maghreb": { _desired: "ar-*-$!maghreb", _distance: "4" } }, { "ar-*-*": { _desired: "ar-*-*", _distance: "5" } }, { "en-*-$enUS": { _desired: "en-*-$enUS", _distance: "4" } }, { "en-*-GB": { _desired: "en-*-$!enUS", _distance: "3" } }, { "en-*-$!enUS": { _desired: "en-*-$!enUS", _distance: "4" } }, { "en-*-*": { _desired: "en-*-*", _distance: "5" } }, { "es-*-$americas": { _desired: "es-*-$americas", _distance: "4" } }, { "es-*-$!americas": { _desired: "es-*-$!americas", _distance: "4" } }, { "es-*-*": { _desired: "es-*-*", _distance: "5" } }, { "pt-*-$americas": { _desired: "pt-*-$americas", _distance: "4" } }, { "pt-*-$!americas": { _desired: "pt-*-$!americas", _distance: "4" } }, { "pt-*-*": { _desired: "pt-*-*", _distance: "5" } }, { "zh-Hant-$cnsar": { _desired: "zh-Hant-$cnsar", _distance: "4" } }, { "zh-Hant-$!cnsar": { _desired: "zh-Hant-$!cnsar", _distance: "4" } }, { "zh-Hant-*": { _desired: "zh-Hant-*", _distance: "5" } }, { "*-*-*": { _desired: "*-*-*", _distance: "4" } }] }, r9 = { "001": ["001", "001-status-grouping", "002", "005", "009", "011", "013", "014", "015", "017", "018", "019", "021", "029", "030", "034", "035", "039", "053", "054", "057", "061", "142", "143", "145", "150", "151", "154", "155", "AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CP", "CQ", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DG", "DJ", "DK", "DM", "DO", "DZ", "EA", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "EU", "EZ", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "IC", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "QO", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "UN", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW"], "002": ["002", "002-status-grouping", "011", "014", "015", "017", "018", "202", "AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "CV", "DJ", "DZ", "EA", "EG", "EH", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "IC", "IO", "KE", "KM", "LR", "LS", "LY", "MA", "MG", "ML", "MR", "MU", "MW", "MZ", "NA", "NE", "NG", "RE", "RW", "SC", "SD", "SH", "SL", "SN", "SO", "SS", "ST", "SZ", "TD", "TF", "TG", "TN", "TZ", "UG", "YT", "ZA", "ZM", "ZW"], "003": ["003", "013", "021", "029", "AG", "AI", "AW", "BB", "BL", "BM", "BQ", "BS", "BZ", "CA", "CR", "CU", "CW", "DM", "DO", "GD", "GL", "GP", "GT", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PM", "PR", "SV", "SX", "TC", "TT", "US", "VC", "VG", "VI"], "005": ["005", "AR", "BO", "BR", "BV", "CL", "CO", "EC", "FK", "GF", "GS", "GY", "PE", "PY", "SR", "UY", "VE"], "009": ["009", "053", "054", "057", "061", "AC", "AQ", "AS", "AU", "CC", "CK", "CP", "CX", "DG", "FJ", "FM", "GU", "HM", "KI", "MH", "MP", "NC", "NF", "NR", "NU", "NZ", "PF", "PG", "PN", "PW", "QO", "SB", "TA", "TK", "TO", "TV", "UM", "VU", "WF", "WS"], "011": ["011", "BF", "BJ", "CI", "CV", "GH", "GM", "GN", "GW", "LR", "ML", "MR", "NE", "NG", "SH", "SL", "SN", "TG"], "013": ["013", "BZ", "CR", "GT", "HN", "MX", "NI", "PA", "SV"], "014": ["014", "BI", "DJ", "ER", "ET", "IO", "KE", "KM", "MG", "MU", "MW", "MZ", "RE", "RW", "SC", "SO", "SS", "TF", "TZ", "UG", "YT", "ZM", "ZW"], "015": ["015", "DZ", "EA", "EG", "EH", "IC", "LY", "MA", "SD", "TN"], "017": ["017", "AO", "CD", "CF", "CG", "CM", "GA", "GQ", "ST", "TD"], "018": ["018", "BW", "LS", "NA", "SZ", "ZA"], "019": ["003", "005", "013", "019", "019-status-grouping", "021", "029", "419", "AG", "AI", "AR", "AW", "BB", "BL", "BM", "BO", "BQ", "BR", "BS", "BV", "BZ", "CA", "CL", "CO", "CR", "CU", "CW", "DM", "DO", "EC", "FK", "GD", "GF", "GL", "GP", "GS", "GT", "GY", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PE", "PM", "PR", "PY", "SR", "SV", "SX", "TC", "TT", "US", "UY", "VC", "VE", "VG", "VI"], "021": ["021", "BM", "CA", "GL", "PM", "US"], "029": ["029", "AG", "AI", "AW", "BB", "BL", "BQ", "BS", "CU", "CW", "DM", "DO", "GD", "GP", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI"], "030": ["030", "CN", "HK", "JP", "KP", "KR", "MN", "MO", "TW"], "034": ["034", "AF", "BD", "BT", "IN", "IR", "LK", "MV", "NP", "PK"], "035": ["035", "BN", "ID", "KH", "LA", "MM", "MY", "PH", "SG", "TH", "TL", "VN"], "039": ["039", "AD", "AL", "BA", "ES", "GI", "GR", "HR", "IT", "ME", "MK", "MT", "PT", "RS", "SI", "SM", "VA", "XK"], "053": ["053", "AU", "CC", "CX", "HM", "NF", "NZ"], "054": ["054", "FJ", "NC", "PG", "SB", "VU"], "057": ["057", "FM", "GU", "KI", "MH", "MP", "NR", "PW", "UM"], "061": ["061", "AS", "CK", "NU", "PF", "PN", "TK", "TO", "TV", "WF", "WS"], 142: ["030", "034", "035", "142", "143", "145", "AE", "AF", "AM", "AZ", "BD", "BH", "BN", "BT", "CN", "CY", "GE", "HK", "ID", "IL", "IN", "IQ", "IR", "JO", "JP", "KG", "KH", "KP", "KR", "KW", "KZ", "LA", "LB", "LK", "MM", "MN", "MO", "MV", "MY", "NP", "OM", "PH", "PK", "PS", "QA", "SA", "SG", "SY", "TH", "TJ", "TL", "TM", "TR", "TW", "UZ", "VN", "YE"], 143: ["143", "KG", "KZ", "TJ", "TM", "UZ"], 145: ["145", "AE", "AM", "AZ", "BH", "CY", "GE", "IL", "IQ", "JO", "KW", "LB", "OM", "PS", "QA", "SA", "SY", "TR", "YE"], 150: ["039", "150", "151", "154", "155", "AD", "AL", "AT", "AX", "BA", "BE", "BG", "BY", "CH", "CQ", "CZ", "DE", "DK", "EE", "ES", "FI", "FO", "FR", "GB", "GG", "GI", "GR", "HR", "HU", "IE", "IM", "IS", "IT", "JE", "LI", "LT", "LU", "LV", "MC", "MD", "ME", "MK", "MT", "NL", "NO", "PL", "PT", "RO", "RS", "RU", "SE", "SI", "SJ", "SK", "SM", "UA", "VA", "XK"], 151: ["151", "BG", "BY", "CZ", "HU", "MD", "PL", "RO", "RU", "SK", "UA"], 154: ["154", "AX", "CQ", "DK", "EE", "FI", "FO", "GB", "GG", "IE", "IM", "IS", "JE", "LT", "LV", "NO", "SE", "SJ"], 155: ["155", "AT", "BE", "CH", "DE", "FR", "LI", "LU", "MC", "NL"], 202: ["011", "014", "017", "018", "202", "AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "CV", "DJ", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "IO", "KE", "KM", "LR", "LS", "MG", "ML", "MR", "MU", "MW", "MZ", "NA", "NE", "NG", "RE", "RW", "SC", "SH", "SL", "SN", "SO", "SS", "ST", "SZ", "TD", "TF", "TG", "TZ", "UG", "YT", "ZA", "ZM", "ZW"], 419: ["005", "013", "029", "419", "AG", "AI", "AR", "AW", "BB", "BL", "BO", "BQ", "BR", "BS", "BV", "BZ", "CL", "CO", "CR", "CU", "CW", "DM", "DO", "EC", "FK", "GD", "GF", "GP", "GS", "GT", "GY", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PE", "PR", "PY", "SR", "SV", "SX", "TC", "TT", "UY", "VC", "VE", "VG", "VI"], EU: ["AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "EU", "FI", "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK"], EZ: ["AT", "BE", "CY", "DE", "EE", "ES", "EZ", "FI", "FR", "GR", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK"], QO: ["AC", "AQ", "CP", "DG", "QO", "TA"], UN: ["AD", "AE", "AF", "AG", "AL", "AM", "AO", "AR", "AT", "AU", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "ER", "ES", "ET", "FI", "FJ", "FM", "FR", "GA", "GB", "GD", "GE", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IQ", "IR", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MG", "MH", "MK", "ML", "MM", "MN", "MR", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PT", "PW", "PY", "QA", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SI", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SY", "SZ", "TD", "TG", "TH", "TJ", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TZ", "UA", "UG", "UN", "US", "UY", "UZ", "VC", "VE", "VN", "VU", "WS", "YE", "ZA", "ZM", "ZW"] }, r7 = /-u(?:-[0-9a-z]{2,8})+/gi;
      function ne(e10, t10, r10 = Error) {
        if (!e10) throw new r10(t10);
      }
      function nt(e10, t10, r10) {
        let [n10, s10, i10] = t10.split("-"), a10 = true;
        if (i10 && "$" === i10[0]) {
          let t11 = "!" !== i10[1], n11 = (t11 ? r10[i10.slice(1)] : r10[i10.slice(2)]).map((e11) => r9[e11] || [e11]).reduce((e11, t12) => [...e11, ...t12], []);
          a10 &&= n11.indexOf(e10.region || "") > -1 == t11;
        } else a10 &&= !e10.region || "*" === i10 || i10 === e10.region;
        return a10 &&= !e10.script || "*" === s10 || s10 === e10.script, a10 &&= !e10.language || "*" === n10 || n10 === e10.language;
      }
      function nr(e10) {
        return [e10.language, e10.script, e10.region].filter(Boolean).join("-");
      }
      function nn(e10, t10, r10) {
        for (let n10 of r10.matches) {
          let s10 = nt(e10, n10.desired, r10.matchVariables) && nt(t10, n10.supported, r10.matchVariables);
          if (n10.oneway || s10 || (s10 = nt(e10, n10.supported, r10.matchVariables) && nt(t10, n10.desired, r10.matchVariables)), s10) {
            let s11 = 10 * n10.distance;
            if (r10.paradigmLocales.indexOf(nr(e10)) > -1 != r10.paradigmLocales.indexOf(nr(t10)) > -1) return s11 - 1;
            return s11;
          }
        }
        throw Error("No matching distance found");
      }
      let ns = (el = function(e10, t10) {
        let r10 = new Intl.Locale(e10).maximize(), s10 = new Intl.Locale(t10).maximize(), i10 = { language: r10.language, script: r10.script || "", region: r10.region || "" }, a10 = { language: s10.language, script: s10.script || "", region: s10.region || "" }, o2 = 0, l2 = function() {
          if (!n) {
            let e11 = r8["written-new"][0]?.paradigmLocales?._locales.split(" "), t11 = r8["written-new"].slice(1, 5);
            n = { matches: r8["written-new"].slice(5).map((e12) => {
              let t12 = Object.keys(e12)[0], r11 = e12[t12];
              return { supported: t12, desired: r11._desired, distance: +r11._distance, oneway: "true" === r11.oneway };
            }, {}), matchVariables: t11.reduce((e12, t12) => {
              let r11 = Object.keys(t12)[0], n10 = t12[r11];
              return e12[r11.slice(1)] = n10._value.split("+"), e12;
            }, {}), paradigmLocales: [...e11, ...e11.map((e12) => new Intl.Locale(e12.replace(/_/g, "-")).maximize().toString())] };
          }
          return n;
        }();
        return i10.language !== a10.language && (o2 += nn({ language: r10.language, script: "", region: "" }, { language: s10.language, script: "", region: "" }, l2)), i10.script !== a10.script && (o2 += nn({ language: r10.language, script: i10.script, region: "" }, { language: s10.language, script: a10.script, region: "" }, l2)), i10.region !== a10.region && (o2 += nn(i10, a10, l2)), o2;
      }, l = (eu = { serializer: (e10) => `${e10[0]}|${e10[1]}` }).cache ? eu.cache : { create: function() {
        return new r6();
      } }, u = eu && eu.serializer ? eu.serializer : function() {
        return JSON.stringify(arguments);
      }, (eu && eu.strategy ? eu.strategy : function(e10, t10) {
        var r10, n10;
        let s10 = 1 === e10.length ? r4 : r5;
        return r10 = t10.cache.create(), n10 = t10.serializer, s10.bind(this, e10, r10, n10);
      })(el, { cache: l, serializer: u })), ni = /* @__PURE__ */ new WeakMap();
      function na(e10) {
        return Intl.getCanonicalLocales(e10)[0];
      }
      let no = /* @__PURE__ */ new WeakMap();
      var nl = e.i(29300);
      function nu(e10, t10, r10) {
        let n10, s10 = new nl.default({ headers: { "accept-language": e10.get("accept-language") || void 0 } }).languages();
        try {
          var i10;
          let e11 = t10.slice().sort((e12, t11) => t11.length - e12.length);
          i10 = function(e12, t11, r11, n11, s11, i11) {
            let a10, o2;
            if ("lookup" === r11.localeMatcher) a10 = function(e13, t12, r12) {
              let n12 = { locale: "" };
              for (let r13 of t12) {
                let t13 = r13.replace(r7, ""), s12 = function(e14, t14) {
                  let r14 = no.get(e14);
                  r14 || (r14 = new Set(e14), no.set(e14, r14));
                  let n13 = t14;
                  for (; ; ) {
                    if (r14.has(n13)) return n13;
                    let e15 = n13.lastIndexOf("-");
                    if (!~e15) return;
                    e15 >= 2 && "-" === n13[e15 - 2] && (e15 -= 2), n13 = n13.slice(0, e15);
                  }
                }(e13, t13);
                if (s12) return n12.locale = s12, r13 !== t13 && (n12.extension = r13.slice(t13.length, r13.length)), n12;
              }
              return n12.locale = r12(), n12;
            }(Array.from(e12), t11, i11);
            else {
              var l2;
              let r12, n12, s12, o3, u3;
              l2 = Array.from(e12), s12 = [], o3 = t11.reduce((e13, t12) => {
                let r13 = t12.replace(r7, "");
                return s12.push(r13), e13[r13] = t12, e13;
              }, {}), (u3 = function(e13, t12, r13 = 838) {
                let n13 = 1 / 0, s13 = { matchedDesiredLocale: "", distances: {} }, i12 = ni.get(t12);
                i12 || (i12 = t12.map((e14) => {
                  try {
                    return Intl.getCanonicalLocales([e14])[0] || e14;
                  } catch {
                    return e14;
                  }
                }), ni.set(t12, i12));
                let a11 = new Set(i12);
                for (let t13 = 0; t13 < e13.length; t13++) {
                  let r14 = e13[t13];
                  if (a11.has(r14)) {
                    let e14 = 0 + 40 * t13;
                    if (s13.distances[r14] = { [r14]: e14 }, e14 < n13 && (n13 = e14, s13.matchedDesiredLocale = r14, s13.matchedSupportedLocale = r14), 0 === t13) return s13;
                  }
                }
                for (let t13 = 0; t13 < e13.length; t13++) {
                  let r14 = e13[t13];
                  try {
                    let e14 = new Intl.Locale(r14).maximize().toString();
                    if (e14 !== r14) {
                      let i13 = function(e15) {
                        let t14 = [], r15 = e15;
                        for (; r15; ) {
                          t14.push(r15);
                          let e16 = r15.lastIndexOf("-");
                          if (-1 === e16) break;
                          r15 = r15.substring(0, e16);
                        }
                        return t14;
                      }(e14);
                      for (let o4 = 0; o4 < i13.length; o4++) {
                        let l3 = i13[o4];
                        if (l3 !== r14 && a11.has(l3)) {
                          let i14;
                          try {
                            i14 = new Intl.Locale(l3).maximize().toString() === e14 ? 0 + 40 * t13 : 10 * o4 + 40 * t13;
                          } catch {
                            i14 = 10 * o4 + 40 * t13;
                          }
                          s13.distances[r14] || (s13.distances[r14] = {}), s13.distances[r14][l3] = i14, i14 < n13 && (n13 = i14, s13.matchedDesiredLocale = r14, s13.matchedSupportedLocale = l3);
                          break;
                        }
                      }
                    }
                  } catch {
                  }
                }
                return s13.matchedSupportedLocale && 0 === n13 || (n13 = 1 / 0, e13.forEach((e14, r14) => {
                  s13.distances[e14] || (s13.distances[e14] = {}), i12.forEach((i13, a12) => {
                    let o4 = t12[a12], l3 = ns(e14, i13) + 0 + 40 * r14;
                    s13.distances[e14][o4] = l3, l3 < n13 && (n13 = l3, s13.matchedDesiredLocale = e14, s13.matchedSupportedLocale = o4);
                  });
                }), n13 >= r13 && (s13.matchedDesiredLocale = void 0, s13.matchedSupportedLocale = void 0)), s13;
              }(s12, l2)).matchedSupportedLocale && u3.matchedDesiredLocale && (r12 = u3.matchedSupportedLocale, n12 = o3[u3.matchedDesiredLocale].slice(u3.matchedDesiredLocale.length) || void 0), a10 = r12 ? { locale: r12, extension: n12 } : { locale: i11() };
            }
            null == a10 && (a10 = { locale: i11(), extension: "" });
            let u2 = a10.locale, c2 = s11[u2], d2 = { locale: "en", dataLocale: u2 };
            o2 = a10.extension ? function(e13) {
              let t12;
              ne(e13 === e13.toLowerCase(), "Expected extension to be lowercase"), ne("-u-" === e13.slice(0, 3), "Expected extension to be a Unicode locale extension");
              let r12 = [], n12 = [], s12 = e13.length, i12 = 3;
              for (; i12 < s12; ) {
                let a11, o3 = e13.indexOf("-", i12);
                a11 = -1 === o3 ? s12 - i12 : o3 - i12;
                let l3 = e13.slice(i12, i12 + a11);
                ne(a11 >= 2, "Expected a subtag to have at least 2 characters"), void 0 === t12 && 2 != a11 ? -1 === r12.indexOf(l3) && r12.push(l3) : 2 === a11 ? (t12 = { key: l3, value: "" }, void 0 === n12.find((e14) => e14.key === t12?.key) && n12.push(t12)) : t12?.value === "" ? t12.value = l3 : (ne(void 0 !== t12, "Expected keyword to be defined"), t12.value += "-" + l3), i12 += a11 + 1;
              }
              return { attributes: r12, keywords: n12 };
            }(a10.extension).keywords : [];
            let h2 = [];
            for (let e13 of n11) {
              let t12, n12 = c2?.[e13] ?? [];
              ne(Array.isArray(n12), `keyLocaleData for ${e13} must be an array`);
              let s12 = n12[0];
              ne(void 0 === s12 || "string" == typeof s12, "value must be a string or undefined");
              let i12 = o2.find((t13) => t13.key === e13);
              if (i12) {
                let r12 = i12.value;
                "" !== r12 ? n12.indexOf(r12) > -1 && (t12 = { key: e13, value: s12 = r12 }) : n12.indexOf("true") > -1 && (t12 = { key: e13, value: s12 = "true" });
              }
              let a11 = r11[e13];
              ne(null == a11 || "string" == typeof a11, "optionsValue must be a string or undefined"), "string" == typeof a11 && "" === (a11 = function(e14, t13) {
                let r12 = t13.toLowerCase();
                return ne(void 0 !== e14, "ukey must be defined"), r12;
              }(e13.toLowerCase(), a11)) && (a11 = "true"), a11 !== s12 && n12.indexOf(a11) > -1 && (s12 = a11, t12 = void 0), t12 && h2.push(t12), d2[e13] = s12;
            }
            return h2.length > 0 && (u2 = function(e13, t12, r12) {
              ne(-1 === e13.indexOf("-u-"), "Expected locale to not have a Unicode locale extension");
              let n12 = "-u";
              for (let e14 of t12) n12 += `-${e14}`;
              for (let e14 of r12) {
                let { key: t13, value: r13 } = e14;
                n12 += `-${t13}`, "" !== r13 && (n12 += `-${r13}`);
              }
              if ("-u" === n12) return na(e13);
              let s12 = e13.indexOf("-x-");
              return na(-1 === s12 ? e13 + n12 : e13.slice(0, s12) + n12 + e13.slice(s12));
            }(u2, [], h2)), d2.locale = u2, d2;
          }(e11, Intl.getCanonicalLocales(s10), { localeMatcher: "best fit" }, [], {}, () => r10).locale, n10 = t10.find((e12) => e12.toLowerCase() === i10.toLowerCase());
        } catch {
        }
        return n10;
      }
      function nc(e10, t10) {
        if (e10.localeCookie && t10.has(e10.localeCookie.name)) {
          let r10 = t10.get(e10.localeCookie.name)?.value;
          if (r10 && e10.locales.includes(r10)) return r10;
        }
      }
      function nd(e10, t10, r10, n10) {
        let s10;
        return n10 && (s10 = rQ(n10, e10.locales, e10.localePrefix)?.locale), !s10 && e10.localeDetection && (s10 = nc(e10, r10)), !s10 && e10.localeDetection && (s10 = nu(t10, e10.locales, e10.defaultLocale)), s10 || (s10 = e10.defaultLocale), s10;
      }
      let nh = Symbol.for("@supabase/supabase-js.traceContextExtractor");
      class np extends Error {
        constructor(e10, t10 = "FunctionsError", r10) {
          super(e10), this.name = t10, this.context = r10;
        }
        toJSON() {
          return { name: this.name, message: this.message, context: this.context };
        }
      }
      class nf extends np {
        constructor(e10) {
          super("Failed to send a request to the Edge Function", "FunctionsFetchError", e10);
        }
      }
      class ng extends np {
        constructor(e10) {
          super("Relay Error invoking the Edge Function", "FunctionsRelayError", e10);
        }
      }
      class nm extends np {
        constructor(e10) {
          super("Edge Function returned a non-2xx status code", "FunctionsHttpError", e10);
        }
      }
      (ec = ew || (ew = {})).Any = "any", ec.ApNortheast1 = "ap-northeast-1", ec.ApNortheast2 = "ap-northeast-2", ec.ApSouth1 = "ap-south-1", ec.ApSoutheast1 = "ap-southeast-1", ec.ApSoutheast2 = "ap-southeast-2", ec.CaCentral1 = "ca-central-1", ec.EuCentral1 = "eu-central-1", ec.EuWest1 = "eu-west-1", ec.EuWest2 = "eu-west-2", ec.EuWest3 = "eu-west-3", ec.SaEast1 = "sa-east-1", ec.UsEast1 = "us-east-1", ec.UsWest1 = "us-west-1", ec.UsWest2 = "us-west-2";
      function n_(e10, t10) {
        var r10 = {};
        for (var n10 in e10) Object.prototype.hasOwnProperty.call(e10, n10) && 0 > t10.indexOf(n10) && (r10[n10] = e10[n10]);
        if (null != e10 && "function" == typeof Object.getOwnPropertySymbols) for (var s10 = 0, n10 = Object.getOwnPropertySymbols(e10); s10 < n10.length; s10++) 0 > t10.indexOf(n10[s10]) && Object.prototype.propertyIsEnumerable.call(e10, n10[s10]) && (r10[n10[s10]] = e10[n10[s10]]);
        return r10;
      }
      "function" == typeof SuppressedError && SuppressedError;
      class ny {
        constructor(e10, { headers: t10 = {}, customFetch: r10, region: n10 = ew.Any } = {}) {
          this.url = e10, this.headers = t10, this.region = n10, this.fetch = /* @__PURE__ */ ((e11) => e11 ? (...t11) => e11(...t11) : (...e12) => fetch(...e12))(r10);
        }
        setAuth(e10) {
          this.headers.Authorization = `Bearer ${e10}`;
        }
        invoke(e10) {
          var t10, r10, n10, s10;
          return t10 = this, r10 = arguments, n10 = void 0, s10 = function* (e11, t11 = {}) {
            var r11, n11;
            let s11, i10, a10;
            try {
              let n12, { headers: o2, method: l2, body: u2, signal: c2, timeout: d2 } = t11, h2 = {}, { region: p2 } = t11;
              p2 || (p2 = this.region);
              let f2 = new URL(`${this.url}/${e11}`);
              p2 && "any" !== p2 && (h2["x-region"] = p2, f2.searchParams.set("forceFunctionRegion", p2));
              let g2 = !!o2 && Object.keys(o2).some((e12) => "content-type" === e12.toLowerCase());
              u2 && !g2 ? "u" > typeof Blob && u2 instanceof Blob || u2 instanceof ArrayBuffer ? (h2["Content-Type"] = "application/octet-stream", n12 = u2) : "string" == typeof u2 ? (h2["Content-Type"] = "text/plain", n12 = u2) : "u" > typeof FormData && u2 instanceof FormData ? n12 = u2 : (h2["Content-Type"] = "application/json", n12 = JSON.stringify(u2)) : n12 = !u2 || "string" == typeof u2 || "u" > typeof Blob && u2 instanceof Blob || u2 instanceof ArrayBuffer || "u" > typeof FormData && u2 instanceof FormData ? u2 : JSON.stringify(u2);
              let m2 = c2;
              d2 && (i10 = new AbortController(), s11 = setTimeout(() => i10.abort(), d2), c2 ? (m2 = i10.signal, a10 = () => i10.abort(), c2.addEventListener("abort", a10)) : m2 = i10.signal);
              let _2 = yield this.fetch(f2.toString(), { method: l2 || "POST", headers: Object.assign(Object.assign(Object.assign({}, h2), this.headers), o2), body: n12, signal: m2 }).catch((e12) => {
                throw new nf(e12);
              }), y2 = _2.headers.get("x-relay-error");
              if (y2 && "true" === y2) throw new ng(_2);
              if (!_2.ok) throw new nm(_2);
              let b2 = (null != (r11 = _2.headers.get("Content-Type")) ? r11 : "text/plain").split(";")[0].trim().toLowerCase();
              return { data: "application/json" === b2 ? yield _2.json() : "application/octet-stream" === b2 || "application/pdf" === b2 ? yield _2.blob() : "text/event-stream" === b2 ? _2 : "multipart/form-data" === b2 ? yield _2.formData() : yield _2.text(), error: null, response: _2 };
            } catch (e12) {
              return { data: null, error: e12, response: e12 instanceof nm || e12 instanceof ng ? e12.context : void 0 };
            } finally {
              s11 && clearTimeout(s11), a10 && (null == (n11 = t11.signal) || n11.removeEventListener("abort", a10));
            }
          }, new (n10 || (n10 = Promise))(function(e11, i10) {
            function a10(e12) {
              try {
                l2(s10.next(e12));
              } catch (e13) {
                i10(e13);
              }
            }
            function o2(e12) {
              try {
                l2(s10.throw(e12));
              } catch (e13) {
                i10(e13);
              }
            }
            function l2(t11) {
              var r11;
              t11.done ? e11(t11.value) : ((r11 = t11.value) instanceof n10 ? r11 : new n10(function(e12) {
                e12(r11);
              })).then(a10, o2);
            }
            l2((s10 = s10.apply(t10, r10 || [])).next());
          });
        }
      }
      let nb = (e10) => Math.min(1e3 * 2 ** e10, 3e4), nw = [520, 503], nv = ["GET", "HEAD", "OPTIONS"];
      var nE = class extends Error {
        constructor(e10) {
          super(e10.message), this.name = "PostgrestError", this.details = e10.details, this.hint = e10.hint, this.code = e10.code;
        }
        toJSON() {
          return { name: this.name, message: this.message, details: this.details, hint: this.hint, code: this.code };
        }
      };
      function nS(e10) {
        return (nS = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e11) {
          return typeof e11;
        } : function(e11) {
          return e11 && "function" == typeof Symbol && e11.constructor === Symbol && e11 !== Symbol.prototype ? "symbol" : typeof e11;
        })(e10);
      }
      function nk(e10, t10) {
        var r10 = Object.keys(e10);
        if (Object.getOwnPropertySymbols) {
          var n10 = Object.getOwnPropertySymbols(e10);
          t10 && (n10 = n10.filter(function(t11) {
            return Object.getOwnPropertyDescriptor(e10, t11).enumerable;
          })), r10.push.apply(r10, n10);
        }
        return r10;
      }
      function nT(e10) {
        for (var t10 = 1; t10 < arguments.length; t10++) {
          var r10 = null != arguments[t10] ? arguments[t10] : {};
          t10 % 2 ? nk(Object(r10), true).forEach(function(t11) {
            !function(e11, t12, r11) {
              var n10;
              (n10 = function(e12, t13) {
                if ("object" != nS(e12) || !e12) return e12;
                var r12 = e12[Symbol.toPrimitive];
                if (void 0 !== r12) {
                  var n11 = r12.call(e12, t13 || "default");
                  if ("object" != nS(n11)) return n11;
                  throw TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === t13 ? String : Number)(e12);
              }(t12, "string"), (t12 = "symbol" == nS(n10) ? n10 : n10 + "") in e11) ? Object.defineProperty(e11, t12, { value: r11, enumerable: true, configurable: true, writable: true }) : e11[t12] = r11;
            }(e10, t11, r10[t11]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e10, Object.getOwnPropertyDescriptors(r10)) : nk(Object(r10)).forEach(function(t11) {
            Object.defineProperty(e10, t11, Object.getOwnPropertyDescriptor(r10, t11));
          });
        }
        return e10;
      }
      function nR(e10, t10) {
        return new Promise((r10) => {
          if (null == t10 ? void 0 : t10.aborted) return void r10();
          let n10 = setTimeout(() => {
            null == t10 || t10.removeEventListener("abort", s10), r10();
          }, e10);
          function s10() {
            clearTimeout(n10), r10();
          }
          null == t10 || t10.addEventListener("abort", s10);
        });
      }
      var nO = class {
        constructor(e10) {
          var t10, r10, n10, s10, i10;
          this.shouldThrowOnError = false, this.retryEnabled = true, this.method = e10.method, this.url = e10.url, this.headers = new Headers(e10.headers), this.schema = e10.schema, this.body = e10.body, this.shouldThrowOnError = null != (t10 = e10.shouldThrowOnError) && t10, this.signal = e10.signal, this.isMaybeSingle = null != (r10 = e10.isMaybeSingle) && r10, this.shouldStripNulls = null != (n10 = e10.shouldStripNulls) && n10, this.urlLengthLimit = null != (s10 = e10.urlLengthLimit) ? s10 : 8e3, this.retryEnabled = null == (i10 = e10.retry) || i10, e10.fetch ? this.fetch = e10.fetch : this.fetch = fetch;
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        stripNulls() {
          if ("text/csv" === this.headers.get("Accept")) throw Error("stripNulls() cannot be used with csv()");
          return this.shouldStripNulls = true, this;
        }
        setHeader(e10, t10) {
          return this.headers = new Headers(this.headers), this.headers.set(e10, t10), this;
        }
        retry(e10) {
          return this.retryEnabled = e10, this;
        }
        then(e10, t10) {
          var r10 = this;
          if (void 0 === this.schema || (["GET", "HEAD"].includes(this.method) ? this.headers.set("Accept-Profile", this.schema) : this.headers.set("Content-Profile", this.schema)), "GET" !== this.method && "HEAD" !== this.method && this.headers.set("Content-Type", "application/json"), this.shouldStripNulls) {
            let e11 = this.headers.get("Accept");
            "application/vnd.pgrst.object+json" === e11 ? this.headers.set("Accept", "application/vnd.pgrst.object+json;nulls=stripped") : e11 && "application/json" !== e11 || this.headers.set("Accept", "application/vnd.pgrst.array+json;nulls=stripped");
          }
          let n10 = this.fetch, s10 = (async () => {
            let e11 = 0;
            for (; ; ) {
              var t11, s11, i10, a10, o2;
              let l2, u2 = {};
              r10.headers.forEach((e12, t12) => {
                u2[t12] = e12;
              }), e11 > 0 && (u2["X-Retry-Count"] = String(e11));
              try {
                l2 = await n10(r10.url.toString(), { method: r10.method, headers: u2, body: JSON.stringify(r10.body, (e12, t12) => "bigint" == typeof t12 ? t12.toString() : t12), signal: r10.signal });
              } catch (t12) {
                if ((null == t12 ? void 0 : t12.name) === "AbortError" || (null == t12 ? void 0 : t12.code) === "ABORT_ERR" || !nv.includes(r10.method)) throw t12;
                if (r10.retryEnabled && e11 < 3) {
                  let t13 = nb(e11);
                  e11++, await nR(t13, r10.signal);
                  continue;
                }
                throw t12;
              }
              if (t11 = r10.method, s11 = l2.status, i10 = e11, r10.retryEnabled && !(i10 >= 3) && nv.includes(t11) && nw.includes(s11) && 1) {
                let t12 = null != (a10 = null == (o2 = l2.headers) ? void 0 : o2.get("Retry-After")) ? a10 : null, n11 = null !== t12 ? 1e3 * Math.max(0, parseInt(t12, 10) || 0) : nb(e11);
                await l2.text(), e11++, await nR(n11, r10.signal);
                continue;
              }
              return await r10.processResponse(l2);
            }
          })();
          return this.shouldThrowOnError || (s10 = s10.catch((e11) => {
            var t11, r11, n11, s11, i10, a10;
            let o2 = "", l2 = "", u2 = "", c2 = null == e11 ? void 0 : e11.cause;
            if (c2) {
              let t12 = null != (r11 = null == c2 ? void 0 : c2.message) ? r11 : "", a11 = null != (n11 = null == c2 ? void 0 : c2.code) ? n11 : "";
              o2 = `${null != (s11 = null == e11 ? void 0 : e11.name) ? s11 : "FetchError"}: ${null == e11 ? void 0 : e11.message}

Caused by: ${null != (i10 = null == c2 ? void 0 : c2.name) ? i10 : "Error"}: ${t12}`, a11 && (o2 += ` (${a11})`), (null == c2 ? void 0 : c2.stack) && (o2 += `
${c2.stack}`);
            } else o2 = null != (a10 = null == e11 ? void 0 : e11.stack) ? a10 : "";
            let d2 = this.url.toString().length;
            return (null == e11 ? void 0 : e11.name) === "AbortError" || (null == e11 ? void 0 : e11.code) === "ABORT_ERR" ? (u2 = "", l2 = "Request was aborted (timeout or manual cancellation)", d2 > this.urlLengthLimit && (l2 += `. Note: Your request URL is ${d2} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)) : ((null == c2 ? void 0 : c2.name) === "HeadersOverflowError" || (null == c2 ? void 0 : c2.code) === "UND_ERR_HEADERS_OVERFLOW") && (u2 = "", l2 = "HTTP headers exceeded server limits (typically 16KB)", d2 > this.urlLengthLimit && (l2 += `. Your request URL is ${d2} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)), { success: false, error: { message: `${null != (t11 = null == e11 ? void 0 : e11.name) ? t11 : "FetchError"}: ${null == e11 ? void 0 : e11.message}`, details: o2, hint: l2, code: u2 }, data: null, count: null, status: 0, statusText: "" };
          })), s10.then(e10, t10);
        }
        async processResponse(e10) {
          var t10, r10, n10, s10;
          let i10 = null, a10 = null, o2 = null, l2 = e10.status, u2 = e10.statusText;
          if (e10.ok) {
            if ("HEAD" !== this.method) {
              let t11 = await e10.text();
              if ("" === t11) ;
              else if ("text/csv" === this.headers.get("Accept")) a10 = t11;
              else if (this.headers.get("Accept") && (null == (n10 = this.headers.get("Accept")) ? void 0 : n10.includes("application/vnd.pgrst.plan+text"))) a10 = t11;
              else try {
                a10 = JSON.parse(t11);
              } catch (e11) {
                if (i10 = { message: t11 }, a10 = null, this.shouldThrowOnError) throw new nE({ message: t11, details: "", hint: "", code: "" });
              }
            }
            let c2 = null == (t10 = this.headers.get("Prefer")) ? void 0 : t10.match(/count=(exact|planned|estimated)/), d2 = null == (r10 = e10.headers.get("content-range")) ? void 0 : r10.split("/");
            if (c2 && d2 && d2.length > 1 && (o2 = parseInt(d2[1])), this.isMaybeSingle && Array.isArray(a10)) if (a10.length > 1) {
              if (i10 = { code: "PGRST116", details: `Results contain ${a10.length} rows, application/vnd.pgrst.object+json requires 1 row`, hint: null, message: "JSON object requested, multiple (or no) rows returned" }, a10 = null, o2 = null, l2 = 406, u2 = "Not Acceptable", this.shouldThrowOnError) throw new nE(nT(nT({}, i10), {}, { hint: null != (s10 = i10.hint) ? s10 : "" }));
            } else a10 = 1 === a10.length ? a10[0] : null;
          } else {
            let t11 = await e10.text();
            try {
              i10 = JSON.parse(t11), Array.isArray(i10) && 404 === e10.status && (a10 = [], i10 = null, l2 = 200, u2 = "OK");
            } catch (r11) {
              404 === e10.status && "" === t11 ? (l2 = 204, u2 = "No Content") : i10 = { message: t11 };
            }
            if (i10 && this.shouldThrowOnError) throw new nE(i10);
          }
          return { success: null === i10, error: i10, data: a10, count: o2, status: l2, statusText: u2 };
        }
        returns() {
          return this;
        }
        overrideTypes() {
          return this;
        }
      }, nC = class extends nO {
        throwOnError() {
          return super.throwOnError();
        }
        select(e10) {
          let t10 = false, r10 = (null != e10 ? e10 : "*").split("").map((e11) => /\s/.test(e11) && !t10 ? "" : ('"' === e11 && (t10 = !t10), e11)).join("");
          return this.url.searchParams.set("select", r10), this.headers.append("Prefer", "return=representation"), this;
        }
        order(e10, { ascending: t10 = true, nullsFirst: r10, foreignTable: n10, referencedTable: s10 = n10 } = {}) {
          let i10 = s10 ? `${s10}.order` : "order", a10 = this.url.searchParams.get(i10);
          return this.url.searchParams.set(i10, `${a10 ? `${a10},` : ""}${e10}.${t10 ? "asc" : "desc"}${void 0 === r10 ? "" : r10 ? ".nullsfirst" : ".nullslast"}`), this;
        }
        limit(e10, { foreignTable: t10, referencedTable: r10 = t10 } = {}) {
          let n10 = void 0 === r10 ? "limit" : `${r10}.limit`;
          return this.url.searchParams.set(n10, `${e10}`), this;
        }
        range(e10, t10, { foreignTable: r10, referencedTable: n10 = r10 } = {}) {
          let s10 = void 0 === n10 ? "offset" : `${n10}.offset`, i10 = void 0 === n10 ? "limit" : `${n10}.limit`;
          return this.url.searchParams.set(s10, `${e10}`), this.url.searchParams.set(i10, `${t10 - e10 + 1}`), this;
        }
        abortSignal(e10) {
          return this.signal = e10, this;
        }
        single() {
          return this.headers.set("Accept", "application/vnd.pgrst.object+json"), this;
        }
        maybeSingle() {
          return this.isMaybeSingle = true, this;
        }
        csv() {
          return this.headers.set("Accept", "text/csv"), this;
        }
        geojson() {
          return this.headers.set("Accept", "application/geo+json"), this;
        }
        explain({ analyze: e10 = false, verbose: t10 = false, settings: r10 = false, buffers: n10 = false, wal: s10 = false, format: i10 = "text" } = {}) {
          var a10;
          let o2 = [e10 ? "analyze" : null, t10 ? "verbose" : null, r10 ? "settings" : null, n10 ? "buffers" : null, s10 ? "wal" : null].filter(Boolean).join("|"), l2 = null != (a10 = this.headers.get("Accept")) ? a10 : "application/json";
          return this.headers.set("Accept", `application/vnd.pgrst.plan+${i10}; for="${l2}"; options=${o2};`), this;
        }
        rollback() {
          return this.headers.append("Prefer", "tx=rollback"), this;
        }
        returns() {
          return this;
        }
        maxAffected(e10) {
          return this.headers.append("Prefer", "handling=strict"), this.headers.append("Prefer", `max-affected=${e10}`), this;
        }
      };
      let nx = RegExp("[,()]");
      var nP = class extends nC {
        throwOnError() {
          return super.throwOnError();
        }
        eq(e10, t10) {
          return this.url.searchParams.append(e10, `eq.${t10}`), this;
        }
        neq(e10, t10) {
          return this.url.searchParams.append(e10, `neq.${t10}`), this;
        }
        gt(e10, t10) {
          return this.url.searchParams.append(e10, `gt.${t10}`), this;
        }
        gte(e10, t10) {
          return this.url.searchParams.append(e10, `gte.${t10}`), this;
        }
        lt(e10, t10) {
          return this.url.searchParams.append(e10, `lt.${t10}`), this;
        }
        lte(e10, t10) {
          return this.url.searchParams.append(e10, `lte.${t10}`), this;
        }
        like(e10, t10) {
          return this.url.searchParams.append(e10, `like.${t10}`), this;
        }
        likeAllOf(e10, t10) {
          return this.url.searchParams.append(e10, `like(all).{${t10.join(",")}}`), this;
        }
        likeAnyOf(e10, t10) {
          return this.url.searchParams.append(e10, `like(any).{${t10.join(",")}}`), this;
        }
        ilike(e10, t10) {
          return this.url.searchParams.append(e10, `ilike.${t10}`), this;
        }
        ilikeAllOf(e10, t10) {
          return this.url.searchParams.append(e10, `ilike(all).{${t10.join(",")}}`), this;
        }
        ilikeAnyOf(e10, t10) {
          return this.url.searchParams.append(e10, `ilike(any).{${t10.join(",")}}`), this;
        }
        regexMatch(e10, t10) {
          return this.url.searchParams.append(e10, `match.${t10}`), this;
        }
        regexIMatch(e10, t10) {
          return this.url.searchParams.append(e10, `imatch.${t10}`), this;
        }
        is(e10, t10) {
          return this.url.searchParams.append(e10, `is.${t10}`), this;
        }
        isDistinct(e10, t10) {
          return this.url.searchParams.append(e10, `isdistinct.${t10}`), this;
        }
        in(e10, t10) {
          let r10 = Array.from(new Set(t10)).map((e11) => "string" == typeof e11 && nx.test(e11) ? `"${e11}"` : `${e11}`).join(",");
          return this.url.searchParams.append(e10, `in.(${r10})`), this;
        }
        notIn(e10, t10) {
          let r10 = Array.from(new Set(t10)).map((e11) => "string" == typeof e11 && nx.test(e11) ? `"${e11}"` : `${e11}`).join(",");
          return this.url.searchParams.append(e10, `not.in.(${r10})`), this;
        }
        contains(e10, t10) {
          return "string" == typeof t10 ? this.url.searchParams.append(e10, `cs.${t10}`) : Array.isArray(t10) ? this.url.searchParams.append(e10, `cs.{${t10.join(",")}}`) : this.url.searchParams.append(e10, `cs.${JSON.stringify(t10)}`), this;
        }
        containedBy(e10, t10) {
          return "string" == typeof t10 ? this.url.searchParams.append(e10, `cd.${t10}`) : Array.isArray(t10) ? this.url.searchParams.append(e10, `cd.{${t10.join(",")}}`) : this.url.searchParams.append(e10, `cd.${JSON.stringify(t10)}`), this;
        }
        rangeGt(e10, t10) {
          return this.url.searchParams.append(e10, `sr.${t10}`), this;
        }
        rangeGte(e10, t10) {
          return this.url.searchParams.append(e10, `nxl.${t10}`), this;
        }
        rangeLt(e10, t10) {
          return this.url.searchParams.append(e10, `sl.${t10}`), this;
        }
        rangeLte(e10, t10) {
          return this.url.searchParams.append(e10, `nxr.${t10}`), this;
        }
        rangeAdjacent(e10, t10) {
          return this.url.searchParams.append(e10, `adj.${t10}`), this;
        }
        overlaps(e10, t10) {
          return "string" == typeof t10 ? this.url.searchParams.append(e10, `ov.${t10}`) : this.url.searchParams.append(e10, `ov.{${t10.join(",")}}`), this;
        }
        textSearch(e10, t10, { config: r10, type: n10 } = {}) {
          let s10 = "";
          "plain" === n10 ? s10 = "pl" : "phrase" === n10 ? s10 = "ph" : "websearch" === n10 && (s10 = "w");
          let i10 = void 0 === r10 ? "" : `(${r10})`;
          return this.url.searchParams.append(e10, `${s10}fts${i10}.${t10}`), this;
        }
        match(e10) {
          return Object.entries(e10).filter(([e11, t10]) => void 0 !== t10).forEach(([e11, t10]) => {
            this.url.searchParams.append(e11, `eq.${t10}`);
          }), this;
        }
        not(e10, t10, r10) {
          return this.url.searchParams.append(e10, `not.${t10}.${r10}`), this;
        }
        or(e10, { foreignTable: t10, referencedTable: r10 = t10 } = {}) {
          let n10 = r10 ? `${r10}.or` : "or";
          return this.url.searchParams.append(n10, `(${e10})`), this;
        }
        filter(e10, t10, r10) {
          return this.url.searchParams.append(e10, `${t10}.${r10}`), this;
        }
      }, nA = class {
        constructor(e10, { headers: t10 = {}, schema: r10, fetch: n10, urlLengthLimit: s10 = 8e3, retry: i10 }) {
          this.url = e10, this.headers = new Headers(t10), this.schema = r10, this.fetch = n10, this.urlLengthLimit = s10, this.retry = i10;
        }
        cloneRequestState() {
          return { url: new URL(this.url.toString()), headers: new Headers(this.headers) };
        }
        select(e10, t10) {
          let { head: r10 = false, count: n10 } = null != t10 ? t10 : {}, s10 = false, i10 = (null != e10 ? e10 : "*").split("").map((e11) => /\s/.test(e11) && !s10 ? "" : ('"' === e11 && (s10 = !s10), e11)).join(""), { url: a10, headers: o2 } = this.cloneRequestState();
          return a10.searchParams.set("select", i10), n10 && o2.append("Prefer", `count=${n10}`), new nP({ method: r10 ? "HEAD" : "GET", url: a10, headers: o2, schema: this.schema, fetch: this.fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        insert(e10, { count: t10, defaultToNull: r10 = true } = {}) {
          var n10;
          let { url: s10, headers: i10 } = this.cloneRequestState();
          if (t10 && i10.append("Prefer", `count=${t10}`), r10 || i10.append("Prefer", "missing=default"), Array.isArray(e10)) {
            let t11 = e10.reduce((e11, t12) => e11.concat(Object.keys(t12)), []);
            if (t11.length > 0) {
              let e11 = [...new Set(t11)].map((e12) => `"${e12}"`);
              s10.searchParams.set("columns", e11.join(","));
            }
          }
          return new nP({ method: "POST", url: s10, headers: i10, schema: this.schema, body: e10, fetch: null != (n10 = this.fetch) ? n10 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        upsert(e10, { onConflict: t10, ignoreDuplicates: r10 = false, count: n10, defaultToNull: s10 = true } = {}) {
          var i10;
          let { url: a10, headers: o2 } = this.cloneRequestState();
          if (o2.append("Prefer", `resolution=${r10 ? "ignore" : "merge"}-duplicates`), void 0 !== t10 && a10.searchParams.set("on_conflict", t10), n10 && o2.append("Prefer", `count=${n10}`), s10 || o2.append("Prefer", "missing=default"), Array.isArray(e10)) {
            let t11 = e10.reduce((e11, t12) => e11.concat(Object.keys(t12)), []);
            if (t11.length > 0) {
              let e11 = [...new Set(t11)].map((e12) => `"${e12}"`);
              a10.searchParams.set("columns", e11.join(","));
            }
          }
          return new nP({ method: "POST", url: a10, headers: o2, schema: this.schema, body: e10, fetch: null != (i10 = this.fetch) ? i10 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        update(e10, { count: t10 } = {}) {
          var r10;
          let { url: n10, headers: s10 } = this.cloneRequestState();
          return t10 && s10.append("Prefer", `count=${t10}`), new nP({ method: "PATCH", url: n10, headers: s10, schema: this.schema, body: e10, fetch: null != (r10 = this.fetch) ? r10 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        delete({ count: e10 } = {}) {
          var t10;
          let { url: r10, headers: n10 } = this.cloneRequestState();
          return e10 && n10.append("Prefer", `count=${e10}`), new nP({ method: "DELETE", url: r10, headers: n10, schema: this.schema, fetch: null != (t10 = this.fetch) ? t10 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
      }, nI = class e10 {
        constructor(e11, { headers: t10 = {}, schema: r10, fetch: n10, timeout: s10, urlLengthLimit: i10 = 8e3, retry: a10 } = {}) {
          this.url = e11, this.headers = new Headers(t10), this.schemaName = r10, this.urlLengthLimit = i10;
          const o2 = null != n10 ? n10 : globalThis.fetch;
          void 0 !== s10 && s10 > 0 ? this.fetch = (e12, t11) => {
            let r11 = new AbortController(), n11 = setTimeout(() => r11.abort(), s10), i11 = null == t11 ? void 0 : t11.signal;
            if (i11) {
              if (i11.aborted) return clearTimeout(n11), o2(e12, t11);
              let s11 = () => {
                clearTimeout(n11), r11.abort();
              };
              return i11.addEventListener("abort", s11, { once: true }), o2(e12, nT(nT({}, t11), {}, { signal: r11.signal })).finally(() => {
                clearTimeout(n11), i11.removeEventListener("abort", s11);
              });
            }
            return o2(e12, nT(nT({}, t11), {}, { signal: r11.signal })).finally(() => clearTimeout(n11));
          } : this.fetch = o2, this.retry = a10;
        }
        from(e11) {
          if (!e11 || "string" != typeof e11 || "" === e11.trim()) throw Error("Invalid relation name: relation must be a non-empty string.");
          return new nA(new URL(`${this.url}/${e11}`), { headers: new Headers(this.headers), schema: this.schemaName, fetch: this.fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        schema(t10) {
          return new e10(this.url, { headers: this.headers, schema: t10, fetch: this.fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        rpc(e11, t10 = {}, { head: r10 = false, get: n10 = false, count: s10 } = {}) {
          var i10;
          let a10, o2, l2 = new URL(`${this.url}/rpc/${e11}`), u2 = (e12) => null !== e12 && "object" == typeof e12 && (!Array.isArray(e12) || e12.some(u2)), c2 = r10 && Object.values(t10).some(u2);
          c2 ? (a10 = "POST", o2 = t10) : r10 || n10 ? (a10 = r10 ? "HEAD" : "GET", Object.entries(t10).filter(([e12, t11]) => void 0 !== t11).map(([e12, t11]) => [e12, Array.isArray(t11) ? `{${t11.join(",")}}` : `${t11}`]).forEach(([e12, t11]) => {
            l2.searchParams.append(e12, t11);
          })) : (a10 = "POST", o2 = t10);
          let d2 = new Headers(this.headers);
          return c2 ? d2.set("Prefer", s10 ? `count=${s10},return=minimal` : "return=minimal") : s10 && d2.set("Prefer", `count=${s10}`), new nP({ method: a10, url: l2, headers: d2, schema: this.schemaName, body: o2, fetch: null != (i10 = this.fetch) ? i10 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
      };
      let nN = class {
        static detectEnvironment() {
          var t10;
          if ("u" > typeof WebSocket) return { type: "native", wsConstructor: WebSocket };
          let r10 = globalThis;
          if ("u" > typeof globalThis && void 0 !== r10.WebSocket) return { type: "native", wsConstructor: r10.WebSocket };
          let n10 = e.g;
          if (n10 && void 0 !== n10.WebSocket) return { type: "native", wsConstructor: n10.WebSocket };
          if ("u" > typeof globalThis && void 0 !== r10.WebSocketPair && void 0 === globalThis.WebSocket) return { type: "cloudflare", error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.", workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime." };
          if ("u" > typeof globalThis && r10.EdgeRuntime || "u" > typeof navigator && (null == (t10 = navigator.userAgent) ? void 0 : t10.includes("Vercel-Edge"))) return { type: "unsupported", error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.", workaround: "Use serverless functions or a different deployment target for WebSocket functionality." };
          let s10 = globalThis.process;
          if (s10) {
            let e10 = s10.versions;
            if (e10 && e10.node) return { type: "unsupported", error: "Node.js detected but native WebSocket not found.", workaround: "Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option." };
          }
          return { type: "unsupported", error: "Unknown JavaScript runtime without WebSocket support.", workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation." };
        }
        static getWebSocketConstructor() {
          let e10 = this.detectEnvironment();
          if (e10.wsConstructor) return e10.wsConstructor;
          let t10 = e10.error || "WebSocket not supported in this environment.";
          throw e10.workaround && (t10 += `

Suggested solution: ${e10.workaround}`), Error(t10);
        }
        static isWebSocketSupported() {
          try {
            let e10 = this.detectEnvironment();
            return "native" === e10.type;
          } catch (e10) {
            return false;
          }
        }
      }, nj = "2.0.0", nL = "errored", n$ = "joined", nM = { close: "phx_close", error: "phx_error", join: "phx_join", reply: "phx_reply", leave: "phx_leave", access_token: "access_token" };
      class nD {
        constructor(e10) {
          this.HEADER_LENGTH = 1, this.USER_BROADCAST_PUSH_META_LENGTH = 6, this.KINDS = { userBroadcastPush: 3, userBroadcast: 4 }, this.BINARY_ENCODING = 0, this.JSON_ENCODING = 1, this.BROADCAST_EVENT = "broadcast", this.allowedMetadataKeys = [], this.allowedMetadataKeys = null != e10 ? e10 : [];
        }
        encode(e10, t10) {
          return e10.event !== this.BROADCAST_EVENT || e10.payload instanceof ArrayBuffer || "string" != typeof e10.payload.event ? t10(JSON.stringify([e10.join_ref, e10.ref, e10.topic, e10.event, e10.payload])) : t10(this._binaryEncodeUserBroadcastPush(e10));
        }
        _binaryEncodeUserBroadcastPush(e10) {
          var t10;
          return this._isArrayBuffer(null == (t10 = e10.payload) ? void 0 : t10.payload) ? this._encodeBinaryUserBroadcastPush(e10) : this._encodeJsonUserBroadcastPush(e10);
        }
        _encodeBinaryUserBroadcastPush(e10) {
          var t10, r10;
          let n10 = null != (r10 = null == (t10 = e10.payload) ? void 0 : t10.payload) ? r10 : new ArrayBuffer(0);
          return this._encodeUserBroadcastPush(e10, this.BINARY_ENCODING, n10);
        }
        _encodeJsonUserBroadcastPush(e10) {
          var t10, r10;
          let n10 = null != (r10 = null == (t10 = e10.payload) ? void 0 : t10.payload) ? r10 : {}, s10 = new TextEncoder().encode(JSON.stringify(n10)).buffer;
          return this._encodeUserBroadcastPush(e10, this.JSON_ENCODING, s10);
        }
        _encodeUserBroadcastPush(e10, t10, r10) {
          let n10 = new TextEncoder(), s10 = n10.encode(e10.topic), i10 = n10.encode(null != (g2 = e10.ref) ? g2 : ""), a10 = n10.encode(null != (m2 = e10.join_ref) ? m2 : ""), o2 = n10.encode(e10.payload.event), l2 = this.allowedMetadataKeys ? this._pick(e10.payload, this.allowedMetadataKeys) : {}, u2 = n10.encode(0 === Object.keys(l2).length ? "" : JSON.stringify(l2));
          if (a10.length > 255) throw Error(`joinRef length ${a10.length} exceeds maximum of 255`);
          if (i10.length > 255) throw Error(`ref length ${i10.length} exceeds maximum of 255`);
          if (s10.length > 255) throw Error(`topic length ${s10.length} exceeds maximum of 255`);
          if (o2.length > 255) throw Error(`userEvent length ${o2.length} exceeds maximum of 255`);
          if (u2.length > 255) throw Error(`metadata length ${u2.length} exceeds maximum of 255`);
          let c2 = this.USER_BROADCAST_PUSH_META_LENGTH + a10.length + i10.length + s10.length + o2.length + u2.length, d2 = new ArrayBuffer(this.HEADER_LENGTH + c2), h2 = new DataView(d2), p2 = new Uint8Array(d2), f2 = 0;
          h2.setUint8(f2++, this.KINDS.userBroadcastPush), h2.setUint8(f2++, a10.length), h2.setUint8(f2++, i10.length), h2.setUint8(f2++, s10.length), h2.setUint8(f2++, o2.length), h2.setUint8(f2++, u2.length), h2.setUint8(f2++, t10), p2.set(a10, f2), f2 += a10.length, p2.set(i10, f2), f2 += i10.length, p2.set(s10, f2), f2 += s10.length, p2.set(o2, f2), f2 += o2.length, p2.set(u2, f2), f2 += u2.length;
          var g2, m2, _2 = new Uint8Array(d2.byteLength + r10.byteLength);
          return _2.set(new Uint8Array(d2), 0), _2.set(new Uint8Array(r10), d2.byteLength), _2.buffer;
        }
        decode(e10, t10) {
          if (this._isArrayBuffer(e10)) return t10(this._binaryDecode(e10));
          if ("string" == typeof e10) {
            let [r10, n10, s10, i10, a10] = JSON.parse(e10);
            return t10({ join_ref: r10, ref: n10, topic: s10, event: i10, payload: a10 });
          }
          return t10({});
        }
        _binaryDecode(e10) {
          let t10 = new DataView(e10), r10 = t10.getUint8(0), n10 = new TextDecoder();
          if (r10 === this.KINDS.userBroadcast) return this._decodeUserBroadcast(e10, t10, n10);
        }
        _decodeUserBroadcast(e10, t10, r10) {
          let n10 = t10.getUint8(1), s10 = t10.getUint8(2), i10 = t10.getUint8(3), a10 = t10.getUint8(4), o2 = this.HEADER_LENGTH + 4, l2 = r10.decode(e10.slice(o2, o2 + n10));
          o2 += n10;
          let u2 = r10.decode(e10.slice(o2, o2 + s10));
          o2 += s10;
          let c2 = r10.decode(e10.slice(o2, o2 + i10));
          o2 += i10;
          let d2 = e10.slice(o2, e10.byteLength), h2 = a10 === this.JSON_ENCODING ? JSON.parse(r10.decode(d2)) : d2, p2 = { type: this.BROADCAST_EVENT, event: u2, payload: h2 };
          return i10 > 0 && (p2.meta = JSON.parse(c2)), { join_ref: null, ref: null, topic: l2, event: this.BROADCAST_EVENT, payload: p2 };
        }
        _isArrayBuffer(e10) {
          var t10;
          return e10 instanceof ArrayBuffer || (null == (t10 = null == e10 ? void 0 : e10.constructor) ? void 0 : t10.name) === "ArrayBuffer";
        }
        _pick(e10, t10) {
          return e10 && "object" == typeof e10 ? Object.fromEntries(Object.entries(e10).filter(([e11]) => t10.includes(e11))) : {};
        }
      }
      (ed = ev || (ev = {})).abstime = "abstime", ed.bool = "bool", ed.date = "date", ed.daterange = "daterange", ed.float4 = "float4", ed.float8 = "float8", ed.int2 = "int2", ed.int4 = "int4", ed.int4range = "int4range", ed.int8 = "int8", ed.int8range = "int8range", ed.json = "json", ed.jsonb = "jsonb", ed.money = "money", ed.numeric = "numeric", ed.oid = "oid", ed.reltime = "reltime", ed.text = "text", ed.time = "time", ed.timestamp = "timestamp", ed.timestamptz = "timestamptz", ed.timetz = "timetz", ed.tsrange = "tsrange", ed.tstzrange = "tstzrange";
      let nU = (e10, t10, r10 = {}) => {
        var n10;
        let s10 = null != (n10 = r10.skipTypes) ? n10 : [];
        return t10 ? Object.keys(t10).reduce((r11, n11) => (r11[n11] = nq(n11, e10, t10, s10), r11), {}) : {};
      }, nq = (e10, t10, r10, n10) => {
        let s10 = t10.find((t11) => t11.name === e10), i10 = null == s10 ? void 0 : s10.type, a10 = r10[e10];
        return i10 && !n10.includes(i10) ? nB(i10, a10) : nH(a10);
      }, nB = (e10, t10) => {
        if ("_" === e10.charAt(0)) return nz(t10, e10.slice(1, e10.length));
        switch (e10) {
          case ev.bool:
            return nG(t10);
          case ev.float4:
          case ev.float8:
          case ev.int2:
          case ev.int4:
          case ev.int8:
          case ev.numeric:
          case ev.oid:
            return nF(t10);
          case ev.json:
          case ev.jsonb:
            return nV(t10);
          case ev.timestamp:
            return nK(t10);
          case ev.abstime:
          case ev.date:
          case ev.daterange:
          case ev.int4range:
          case ev.int8range:
          case ev.money:
          case ev.reltime:
          case ev.text:
          case ev.time:
          case ev.timestamptz:
          case ev.timetz:
          case ev.tsrange:
          case ev.tstzrange:
          default:
            return nH(t10);
        }
      }, nH = (e10) => e10, nG = (e10) => {
        switch (e10) {
          case "t":
            return true;
          case "f":
            return false;
          default:
            return e10;
        }
      }, nF = (e10) => {
        if ("string" == typeof e10) {
          let t10 = parseFloat(e10);
          if (!Number.isNaN(t10)) return t10;
        }
        return e10;
      }, nV = (e10) => {
        if ("string" == typeof e10) try {
          return JSON.parse(e10);
        } catch (e11) {
        }
        return e10;
      }, nz = (e10, t10) => {
        if ("string" != typeof e10) return e10;
        let r10 = e10.length - 1, n10 = e10[r10];
        if ("{" === e10[0] && "}" === n10) {
          let n11, s10 = e10.slice(1, r10);
          try {
            n11 = JSON.parse("[" + s10 + "]");
          } catch (e11) {
            n11 = s10 ? s10.split(",") : [];
          }
          return n11.map((e11) => nB(t10, e11));
        }
        return e10;
      }, nK = (e10) => "string" == typeof e10 ? e10.replace(" ", "T") : e10, nW = (e10) => {
        let t10 = new URL(e10);
        return t10.protocol = t10.protocol.replace(/^ws/i, "http"), t10.pathname = t10.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, ""), "" === t10.pathname || "/" === t10.pathname ? t10.pathname = "/api/broadcast" : t10.pathname = t10.pathname + "/api/broadcast", t10.href;
      };
      var nJ = (e10) => "function" == typeof e10 ? e10 : function() {
        return e10;
      }, nX = ("u" > typeof self ? self : null) || globalThis, nY = "closed", nZ = "errored", nQ = "joined", n0 = "joining", n1 = "leaving", n2 = "phx_close", n3 = "phx_error", n4 = "phx_reply", n5 = "phx_leave", n6 = "websocket", n8 = "base64url.bearer.phx.", n9 = class {
        constructor(e10, t10, r10, n10) {
          this.channel = e10, this.event = t10, this.payload = r10 || function() {
            return {};
          }, this.receivedResp = null, this.timeout = n10, this.timeoutTimer = null, this.recHooks = [], this.sent = false, this.ref = void 0;
        }
        resend(e10) {
          this.timeout = e10, this.reset(), this.send();
        }
        send() {
          this.hasReceived("timeout") || (this.startTimeout(), this.sent = true, this.channel.socket.push({ topic: this.channel.topic, event: this.event, payload: this.payload(), ref: this.ref, join_ref: this.channel.joinRef() }));
        }
        receive(e10, t10) {
          return this.hasReceived(e10) && t10(this.receivedResp.response), this.recHooks.push({ status: e10, callback: t10 }), this;
        }
        reset() {
          this.cancelRefEvent(), this.ref = null, this.refEvent = null, this.receivedResp = null, this.sent = false;
        }
        destroy() {
          this.cancelRefEvent(), this.cancelTimeout();
        }
        matchReceive({ status: e10, response: t10, _ref: r10 }) {
          this.recHooks.filter((t11) => t11.status === e10).forEach((e11) => e11.callback(t10));
        }
        cancelRefEvent() {
          this.refEvent && this.channel.off(this.refEvent);
        }
        cancelTimeout() {
          clearTimeout(this.timeoutTimer), this.timeoutTimer = null;
        }
        startTimeout() {
          this.timeoutTimer && this.cancelTimeout(), this.ref = this.channel.socket.makeRef(), this.refEvent = this.channel.replyEventName(this.ref), this.channel.on(this.refEvent, (e10) => {
            this.cancelRefEvent(), this.cancelTimeout(), this.receivedResp = e10, this.matchReceive(e10);
          }), this.timeoutTimer = setTimeout(() => {
            this.trigger("timeout", {});
          }, this.timeout);
        }
        hasReceived(e10) {
          return this.receivedResp && this.receivedResp.status === e10;
        }
        trigger(e10, t10) {
          this.channel.trigger(this.refEvent, { status: e10, response: t10 });
        }
      }, n7 = class {
        constructor(e10, t10) {
          this.callback = e10, this.timerCalc = t10, this.timer = void 0, this.tries = 0;
        }
        reset() {
          this.tries = 0, clearTimeout(this.timer);
        }
        scheduleTimeout() {
          clearTimeout(this.timer), this.timer = setTimeout(() => {
            this.tries = this.tries + 1, this.callback();
          }, this.timerCalc(this.tries + 1));
        }
      }, se = class {
        constructor(e10, t10, r10) {
          this.state = nY, this.topic = e10, this.params = nJ(t10 || {}), this.socket = r10, this.bindings = [], this.bindingRef = 0, this.timeout = this.socket.timeout, this.joinedOnce = false, this.joinPush = new n9(this, "phx_join", this.params, this.timeout), this.pushBuffer = [], this.stateChangeRefs = [], this.rejoinTimer = new n7(() => {
            this.socket.isConnected() && this.rejoin();
          }, this.socket.rejoinAfterMs), this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset())), this.stateChangeRefs.push(this.socket.onOpen(() => {
            this.rejoinTimer.reset(), this.isErrored() && this.rejoin();
          })), this.joinPush.receive("ok", () => {
            this.state = nQ, this.rejoinTimer.reset(), this.pushBuffer.forEach((e11) => e11.send()), this.pushBuffer = [];
          }), this.joinPush.receive("error", (e11) => {
            this.state = nZ, this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, e11), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
          }), this.onClose(() => {
            this.rejoinTimer.reset(), this.socket.hasLogger() && this.socket.log("channel", `close ${this.topic}`), this.state = nY, this.socket.remove(this);
          }), this.onError((e11) => {
            this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, e11), this.isJoining() && this.joinPush.reset(), this.state = nZ, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
          }), this.joinPush.receive("timeout", () => {
            this.socket.hasLogger() && this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), new n9(this, n5, nJ({}), this.timeout).send(), this.state = nZ, this.joinPush.reset(), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
          }), this.on(n4, (e11, t11) => {
            this.trigger(this.replyEventName(t11), e11);
          });
        }
        join(e10 = this.timeout) {
          if (!this.joinedOnce) return this.timeout = e10, this.joinedOnce = true, this.rejoin(), this.joinPush;
          throw Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
        }
        teardown() {
          this.pushBuffer.forEach((e10) => e10.destroy()), this.pushBuffer = [], this.rejoinTimer.reset(), this.joinPush.destroy(), this.state = nY, this.bindings = [];
        }
        onClose(e10) {
          this.on(n2, e10);
        }
        onError(e10) {
          return this.on(n3, (t10) => e10(t10));
        }
        on(e10, t10) {
          let r10 = this.bindingRef++;
          return this.bindings.push({ event: e10, ref: r10, callback: t10 }), r10;
        }
        off(e10, t10) {
          this.bindings = this.bindings.filter((r10) => r10.event !== e10 || void 0 !== t10 && t10 !== r10.ref);
        }
        canPush() {
          return this.socket.isConnected() && this.isJoined();
        }
        push(e10, t10, r10 = this.timeout) {
          if (t10 = t10 || {}, !this.joinedOnce) throw Error(`tried to push '${e10}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
          let n10 = new n9(this, e10, function() {
            return t10;
          }, r10);
          return this.canPush() ? n10.send() : (n10.startTimeout(), this.pushBuffer.push(n10)), n10;
        }
        leave(e10 = this.timeout) {
          this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), this.state = n1;
          let t10 = () => {
            this.socket.hasLogger() && this.socket.log("channel", `leave ${this.topic}`), this.trigger(n2, "leave");
          }, r10 = new n9(this, n5, nJ({}), e10);
          return r10.receive("ok", () => t10()).receive("timeout", () => t10()), r10.send(), this.canPush() || r10.trigger("ok", {}), r10;
        }
        onMessage(e10, t10, r10) {
          return t10;
        }
        filterBindings(e10, t10, r10) {
          return true;
        }
        isMember(e10, t10, r10, n10) {
          return this.topic === e10 && (!n10 || n10 === this.joinRef() || (this.socket.hasLogger() && this.socket.log("channel", "dropping outdated message", { topic: e10, event: t10, payload: r10, joinRef: n10 }), false));
        }
        joinRef() {
          return this.joinPush.ref;
        }
        rejoin(e10 = this.timeout) {
          this.isLeaving() || (this.socket.leaveOpenTopic(this.topic), this.state = n0, this.joinPush.resend(e10));
        }
        trigger(e10, t10, r10, n10) {
          let s10 = this.onMessage(e10, t10, r10, n10);
          if (t10 && !s10) throw Error("channel onMessage callbacks must return the payload, modified or unmodified");
          let i10 = this.bindings.filter((n11) => n11.event === e10 && this.filterBindings(n11, t10, r10));
          for (let e11 = 0; e11 < i10.length; e11++) i10[e11].callback(s10, r10, n10 || this.joinRef());
        }
        replyEventName(e10) {
          return `chan_reply_${e10}`;
        }
        isClosed() {
          return this.state === nY;
        }
        isErrored() {
          return this.state === nZ;
        }
        isJoined() {
          return this.state === nQ;
        }
        isJoining() {
          return this.state === n0;
        }
        isLeaving() {
          return this.state === n1;
        }
      }, st = class {
        static request(e10, t10, r10, n10, s10, i10, a10) {
          if (nX.XDomainRequest) {
            let r11 = new nX.XDomainRequest();
            return this.xdomainRequest(r11, e10, t10, n10, s10, i10, a10);
          }
          if (nX.XMLHttpRequest) {
            let o2 = new nX.XMLHttpRequest();
            return this.xhrRequest(o2, e10, t10, r10, n10, s10, i10, a10);
          }
          if (nX.fetch && nX.AbortController) return this.fetchRequest(e10, t10, r10, n10, s10, i10, a10);
          throw Error("No suitable XMLHttpRequest implementation found");
        }
        static fetchRequest(e10, t10, r10, n10, s10, i10, a10) {
          let o2 = { method: e10, headers: r10, body: n10 }, l2 = null;
          return s10 && (l2 = new AbortController(), setTimeout(() => l2.abort(), s10), o2.signal = l2.signal), nX.fetch(t10, o2).then((e11) => e11.text()).then((e11) => this.parseJSON(e11)).then((e11) => a10 && a10(e11)).catch((e11) => {
            "AbortError" === e11.name && i10 ? i10() : a10 && a10(null);
          }), l2;
        }
        static xdomainRequest(e10, t10, r10, n10, s10, i10, a10) {
          return e10.timeout = s10, e10.open(t10, r10), e10.onload = () => {
            let t11 = this.parseJSON(e10.responseText);
            a10 && a10(t11);
          }, i10 && (e10.ontimeout = i10), e10.onprogress = () => {
          }, e10.send(n10), e10;
        }
        static xhrRequest(e10, t10, r10, n10, s10, i10, a10, o2) {
          for (let [s11, a11] of (e10.open(t10, r10, true), e10.timeout = i10, Object.entries(n10))) e10.setRequestHeader(s11, a11);
          return e10.onerror = () => o2 && o2(null), e10.onreadystatechange = () => {
            4 === e10.readyState && o2 && o2(this.parseJSON(e10.responseText));
          }, a10 && (e10.ontimeout = a10), e10.send(s10), e10;
        }
        static parseJSON(e10) {
          if (!e10 || "" === e10) return null;
          try {
            return JSON.parse(e10);
          } catch {
            return console && console.log("failed to parse JSON response", e10), null;
          }
        }
        static serialize(e10, t10) {
          let r10 = [];
          for (var n10 in e10) {
            if (!Object.prototype.hasOwnProperty.call(e10, n10)) continue;
            let s10 = t10 ? `${t10}[${n10}]` : n10, i10 = e10[n10];
            "object" == typeof i10 ? r10.push(this.serialize(i10, s10)) : r10.push(encodeURIComponent(s10) + "=" + encodeURIComponent(i10));
          }
          return r10.join("&");
        }
        static appendParams(e10, t10) {
          if (0 === Object.keys(t10).length) return e10;
          let r10 = e10.match(/\?/) ? "&" : "?";
          return `${e10}${r10}${this.serialize(t10)}`;
        }
      }, sr = class {
        constructor(e10, t10) {
          t10 && 2 === t10.length && t10[1].startsWith(n8) && (this.authToken = atob(t10[1].slice(n8.length))), this.endPoint = null, this.token = null, this.skipHeartbeat = true, this.reqs = /* @__PURE__ */ new Set(), this.awaitingBatchAck = false, this.currentBatch = null, this.currentBatchTimer = null, this.batchBuffer = [], this.onopen = function() {
          }, this.onerror = function() {
          }, this.onmessage = function() {
          }, this.onclose = function() {
          }, this.pollEndpoint = this.normalizeEndpoint(e10), this.readyState = 0, setTimeout(() => this.poll(), 0);
        }
        normalizeEndpoint(e10) {
          return e10.replace("ws://", "http://").replace("wss://", "https://").replace(RegExp("(.*)/" + n6), "$1/longpoll");
        }
        endpointURL() {
          return st.appendParams(this.pollEndpoint, { token: this.token });
        }
        closeAndRetry(e10, t10, r10) {
          this.close(e10, t10, r10), this.readyState = 0;
        }
        ontimeout() {
          this.onerror("timeout"), this.closeAndRetry(1005, "timeout", false);
        }
        isActive() {
          return 1 === this.readyState || 0 === this.readyState;
        }
        poll() {
          let e10 = { Accept: "application/json" };
          this.authToken && (e10["X-Phoenix-AuthToken"] = this.authToken), this.ajax("GET", e10, null, () => this.ontimeout(), (e11) => {
            if (e11) {
              var { status: t10, token: r10, messages: n10 } = e11;
              if (410 === t10 && null !== this.token) {
                this.onerror(410), this.closeAndRetry(3410, "session_gone", false);
                return;
              }
              this.token = r10;
            } else t10 = 0;
            switch (t10) {
              case 200:
                n10.forEach((e12) => {
                  setTimeout(() => this.onmessage({ data: e12 }), 0);
                }), this.poll();
                break;
              case 204:
                this.poll();
                break;
              case 410:
                this.readyState = 1, this.onopen({}), this.poll();
                break;
              case 403:
                this.onerror(403), this.close(1008, "forbidden", false);
                break;
              case 0:
              case 500:
                this.onerror(500), this.closeAndRetry(1011, "internal server error", 500);
                break;
              default:
                throw Error(`unhandled poll status ${t10}`);
            }
          });
        }
        send(e10) {
          "string" != typeof e10 && (e10 = ((e11) => {
            let t10 = "", r10 = new Uint8Array(e11), n10 = r10.byteLength;
            for (let e12 = 0; e12 < n10; e12++) t10 += String.fromCharCode(r10[e12]);
            return btoa(t10);
          })(e10)), this.currentBatch ? this.currentBatch.push(e10) : this.awaitingBatchAck ? this.batchBuffer.push(e10) : (this.currentBatch = [e10], this.currentBatchTimer = setTimeout(() => {
            this.batchSend(this.currentBatch), this.currentBatch = null;
          }, 0));
        }
        batchSend(e10, t10 = 0) {
          this.awaitingBatchAck = true;
          let r10 = t10 + 100, n10 = e10.slice(t10, r10);
          this.ajax("POST", { "Content-Type": "application/x-ndjson" }, n10.join("\n"), () => this.onerror("timeout"), (t11) => {
            t11 && 200 === t11.status ? r10 < e10.length ? this.batchSend(e10, r10) : this.batchBuffer.length > 0 ? (this.batchSend(this.batchBuffer), this.batchBuffer = []) : this.awaitingBatchAck = false : (this.awaitingBatchAck = false, this.onerror(t11 && t11.status), this.closeAndRetry(1011, "internal server error", false));
          });
        }
        close(e10, t10, r10) {
          for (let e11 of this.reqs) e11.abort();
          this.readyState = 3;
          let n10 = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code: e10, reason: t10, wasClean: r10 });
          this.batchBuffer = [], clearTimeout(this.currentBatchTimer), this.currentBatchTimer = null, "u" > typeof CloseEvent ? this.onclose(new CloseEvent("close", n10)) : this.onclose(n10);
        }
        ajax(e10, t10, r10, n10, s10) {
          let i10, a10 = () => {
            this.reqs.delete(i10), n10();
          };
          i10 = st.request(e10, this.endpointURL(), t10, r10, this.timeout, a10, (e11) => {
            this.reqs.delete(i10), this.isActive() && s10(e11);
          }), this.reqs.add(i10);
        }
      }, sn = class e10 {
        constructor(t10, r10 = {}) {
          let n10 = r10.events || { state: "presence_state", diff: "presence_diff" };
          this.state = /* @__PURE__ */ Object.create(null), this.pendingDiffs = [], this.channel = t10, this.joinRef = null, this.caller = { onJoin: function() {
          }, onLeave: function() {
          }, onSync: function() {
          } }, this.channel.on(n10.state, (t11) => {
            let { onJoin: r11, onLeave: n11, onSync: s10 } = this.caller;
            this.joinRef = this.channel.joinRef(), this.state = e10.syncState(this.state, t11, r11, n11), this.pendingDiffs.forEach((t12) => {
              this.state = e10.syncDiff(this.state, t12, r11, n11);
            }), this.pendingDiffs = [], s10();
          }), this.channel.on(n10.diff, (t11) => {
            let { onJoin: r11, onLeave: n11, onSync: s10 } = this.caller;
            this.inPendingSyncState() ? this.pendingDiffs.push(t11) : (this.state = e10.syncDiff(this.state, t11, r11, n11), s10());
          });
        }
        onJoin(e11) {
          this.caller.onJoin = e11;
        }
        onLeave(e11) {
          this.caller.onLeave = e11;
        }
        onSync(e11) {
          this.caller.onSync = e11;
        }
        list(t10) {
          return e10.list(this.state, t10);
        }
        inPendingSyncState() {
          return !this.joinRef || this.joinRef !== this.channel.joinRef();
        }
        static syncState(e11, t10, r10, n10) {
          let s10 = this.toNullProtoObj(this.clone(e11));
          t10 = this.toNullProtoObj(t10);
          let i10 = /* @__PURE__ */ Object.create(null), a10 = /* @__PURE__ */ Object.create(null);
          return this.map(s10, (e12, r11) => {
            t10[e12] || (a10[e12] = r11);
          }), this.map(t10, (e12, t11) => {
            let r11 = s10[e12];
            if (r11) {
              let n11 = t11.metas.map((e13) => e13.phx_ref), s11 = r11.metas.map((e13) => e13.phx_ref), o2 = t11.metas.filter((e13) => 0 > s11.indexOf(e13.phx_ref)), l2 = r11.metas.filter((e13) => 0 > n11.indexOf(e13.phx_ref));
              o2.length > 0 && (i10[e12] = t11, i10[e12].metas = o2), l2.length > 0 && (a10[e12] = this.clone(r11), a10[e12].metas = l2);
            } else i10[e12] = t11;
          }), this.syncDiff(s10, { joins: i10, leaves: a10 }, r10, n10);
        }
        static syncDiff(e11, t10, r10, n10) {
          e11 = this.toNullProtoObj(e11);
          let { joins: s10, leaves: i10 } = this.clone(t10);
          return r10 || (r10 = function() {
          }), n10 || (n10 = function() {
          }), this.map(s10, (t11, n11) => {
            let s11 = e11[t11];
            if (e11[t11] = this.clone(n11), s11) {
              let r11 = e11[t11].metas.map((e12) => e12.phx_ref), n12 = s11.metas.filter((e12) => 0 > r11.indexOf(e12.phx_ref));
              e11[t11].metas.unshift(...n12);
            }
            r10(t11, s11, n11);
          }), this.map(i10, (t11, r11) => {
            let s11 = e11[t11];
            if (!s11) return;
            let i11 = r11.metas.map((e12) => e12.phx_ref);
            s11.metas = s11.metas.filter((e12) => 0 > i11.indexOf(e12.phx_ref)), n10(t11, s11, r11), 0 === s11.metas.length && delete e11[t11];
          }), e11;
        }
        static list(e11, t10) {
          return t10 || (t10 = function(e12, t11) {
            return t11;
          }), this.map(e11, (e12, r10) => t10(e12, r10));
        }
        static map(e11, t10) {
          return Object.getOwnPropertyNames(e11).map((r10) => t10(r10, e11[r10]));
        }
        static toNullProtoObj(e11) {
          if (null === Object.getPrototypeOf(e11)) return e11;
          let t10 = /* @__PURE__ */ Object.create(null);
          return Object.getOwnPropertyNames(e11).forEach((r10) => {
            t10[r10] = e11[r10];
          }), t10;
        }
        static clone(e11) {
          return JSON.parse(JSON.stringify(e11));
        }
      }, ss = { HEADER_LENGTH: 1, META_LENGTH: 4, KINDS: { push: 0, reply: 1, broadcast: 2 }, encode(e10, t10) {
        return e10.payload.constructor === ArrayBuffer ? t10(this.binaryEncode(e10)) : t10(JSON.stringify([e10.join_ref, e10.ref, e10.topic, e10.event, e10.payload]));
      }, decode(e10, t10) {
        if (e10.constructor === ArrayBuffer) return t10(this.binaryDecode(e10));
        {
          let [r10, n10, s10, i10, a10] = JSON.parse(e10);
          return t10({ join_ref: r10, ref: n10, topic: s10, event: i10, payload: a10 });
        }
      }, binaryEncode(e10) {
        let { join_ref: t10, ref: r10, event: n10, topic: s10, payload: i10 } = e10, a10 = new TextEncoder(), o2 = a10.encode(t10), l2 = a10.encode(r10), u2 = a10.encode(s10), c2 = a10.encode(n10);
        this.assertFieldSize(o2.byteLength, "join_ref"), this.assertFieldSize(l2.byteLength, "ref"), this.assertFieldSize(u2.byteLength, "topic"), this.assertFieldSize(c2.byteLength, "event");
        let d2 = this.META_LENGTH + o2.byteLength + l2.byteLength + u2.byteLength + c2.byteLength, h2 = new ArrayBuffer(this.HEADER_LENGTH + d2), p2 = new Uint8Array(h2), f2 = new DataView(h2), g2 = 0;
        f2.setUint8(g2++, this.KINDS.push), f2.setUint8(g2++, o2.byteLength), f2.setUint8(g2++, l2.byteLength), f2.setUint8(g2++, u2.byteLength), f2.setUint8(g2++, c2.byteLength), p2.set(o2, g2), g2 += o2.byteLength, p2.set(l2, g2), g2 += l2.byteLength, p2.set(u2, g2), g2 += u2.byteLength, p2.set(c2, g2), g2 += c2.byteLength;
        var m2 = new Uint8Array(h2.byteLength + i10.byteLength);
        return m2.set(p2, 0), m2.set(new Uint8Array(i10), h2.byteLength), m2.buffer;
      }, assertFieldSize(e10, t10) {
        if (e10 > 255) throw Error(`unable to convert ${t10} to binary: must be less than or equal to 255 bytes, but is ${e10} bytes`);
      }, binaryDecode(e10) {
        let t10 = new DataView(e10), r10 = t10.getUint8(0), n10 = new TextDecoder();
        switch (r10) {
          case this.KINDS.push:
            return this.decodePush(e10, t10, n10);
          case this.KINDS.reply:
            return this.decodeReply(e10, t10, n10);
          case this.KINDS.broadcast:
            return this.decodeBroadcast(e10, t10, n10);
        }
      }, decodePush(e10, t10, r10) {
        let n10 = t10.getUint8(1), s10 = t10.getUint8(2), i10 = t10.getUint8(3), a10 = this.HEADER_LENGTH + this.META_LENGTH - 1, o2 = r10.decode(e10.slice(a10, a10 + n10));
        a10 += n10;
        let l2 = r10.decode(e10.slice(a10, a10 + s10));
        a10 += s10;
        let u2 = r10.decode(e10.slice(a10, a10 + i10));
        return a10 += i10, { join_ref: o2, ref: null, topic: l2, event: u2, payload: e10.slice(a10, e10.byteLength) };
      }, decodeReply(e10, t10, r10) {
        let n10 = t10.getUint8(1), s10 = t10.getUint8(2), i10 = t10.getUint8(3), a10 = t10.getUint8(4), o2 = this.HEADER_LENGTH + this.META_LENGTH, l2 = r10.decode(e10.slice(o2, o2 + n10));
        o2 += n10;
        let u2 = r10.decode(e10.slice(o2, o2 + s10));
        o2 += s10;
        let c2 = r10.decode(e10.slice(o2, o2 + i10));
        o2 += i10;
        let d2 = r10.decode(e10.slice(o2, o2 + a10));
        return o2 += a10, { join_ref: l2, ref: u2, topic: c2, event: n4, payload: { status: d2, response: e10.slice(o2, e10.byteLength) } };
      }, decodeBroadcast(e10, t10, r10) {
        let n10 = t10.getUint8(1), s10 = t10.getUint8(2), i10 = this.HEADER_LENGTH + 2, a10 = r10.decode(e10.slice(i10, i10 + n10));
        i10 += n10;
        let o2 = r10.decode(e10.slice(i10, i10 + s10));
        return i10 += s10, { join_ref: null, ref: null, topic: a10, event: o2, payload: e10.slice(i10, e10.byteLength) };
      } }, si = class {
        constructor(e10, t10 = {}) {
          this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }, this.channels = [], this.sendBuffer = [], this.ref = 0, this.fallbackRef = null, this.timeout = t10.timeout || 1e4, this.transport = t10.transport || nX.WebSocket || sr, this.conn = void 0, this.primaryPassedHealthCheck = false, this.longPollFallbackMs = t10.longPollFallbackMs, this.fallbackTimer = null;
          let r10 = null;
          try {
            r10 = nX && nX.sessionStorage;
          } catch {
          }
          this.sessionStore = t10.sessionStorage || r10, this.establishedConnections = 0, this.defaultEncoder = ss.encode.bind(ss), this.defaultDecoder = ss.decode.bind(ss), this.closeWasClean = true, this.disconnecting = false, this.binaryType = t10.binaryType || "arraybuffer", this.connectClock = 1, this.pageHidden = false, this.encode = void 0, this.decode = void 0, this.transport !== sr ? (this.encode = t10.encode || this.defaultEncoder, this.decode = t10.decode || this.defaultDecoder) : (this.encode = this.defaultEncoder, this.decode = this.defaultDecoder), this.heartbeatIntervalMs = t10.heartbeatIntervalMs || 3e4, this.autoSendHeartbeat = t10.autoSendHeartbeat ?? true, this.heartbeatCallback = t10.heartbeatCallback ?? (() => {
          }), this.rejoinAfterMs = (e11) => t10.rejoinAfterMs ? t10.rejoinAfterMs(e11) : [1e3, 2e3, 5e3][e11 - 1] || 1e4, this.reconnectAfterMs = (e11) => t10.reconnectAfterMs ? t10.reconnectAfterMs(e11) : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][e11 - 1] || 5e3, this.logger = t10.logger || null, !this.logger && t10.debug && (this.logger = (e11, t11, r11) => {
            console.log(`${e11}: ${t11}`, r11);
          }), this.longpollerTimeout = t10.longpollerTimeout || 2e4, this.params = nJ(t10.params || {}), this.endPoint = `${e10}/${n6}`, this.vsn = t10.vsn || "2.0.0", this.heartbeatTimeoutTimer = null, this.heartbeatTimer = null, this.heartbeatSentAt = null, this.pendingHeartbeatRef = null, this.reconnectTimer = new n7(() => {
            if (this.pageHidden) {
              this.log("Not reconnecting as page is hidden!"), this.teardown();
              return;
            }
            this.teardown(async () => {
              t10.beforeReconnect && await t10.beforeReconnect(), this.connect();
            });
          }, this.reconnectAfterMs), this.authToken = t10.authToken && nJ(t10.authToken);
        }
        getLongPollTransport() {
          return sr;
        }
        replaceTransport(e10) {
          this.connectClock++, this.closeWasClean = true, clearTimeout(this.fallbackTimer), this.reconnectTimer.reset(), this.conn && (this.conn.close(), this.conn = null), this.transport = e10;
        }
        protocol() {
          return location.protocol.match(/^https/) ? "wss" : "ws";
        }
        endPointURL() {
          let e10 = st.appendParams(st.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
          return "/" !== e10.charAt(0) ? e10 : "/" === e10.charAt(1) ? `${this.protocol()}:${e10}` : `${this.protocol()}://${location.host}${e10}`;
        }
        disconnect(e10, t10, r10) {
          this.connectClock++, this.disconnecting = true, this.closeWasClean = true, clearTimeout(this.fallbackTimer), this.reconnectTimer.reset(), this.teardown(() => {
            this.disconnecting = false, e10 && e10();
          }, t10, r10);
        }
        connect(e10) {
          e10 && (console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"), this.params = nJ(e10)), (!this.conn || this.disconnecting) && (this.longPollFallbackMs && this.transport !== sr ? this.connectWithFallback(sr, this.longPollFallbackMs) : this.transportConnect());
        }
        log(e10, t10, r10) {
          this.logger && this.logger(e10, t10, r10);
        }
        hasLogger() {
          return null !== this.logger;
        }
        onOpen(e10) {
          let t10 = this.makeRef();
          return this.stateChangeCallbacks.open.push([t10, e10]), t10;
        }
        onClose(e10) {
          let t10 = this.makeRef();
          return this.stateChangeCallbacks.close.push([t10, e10]), t10;
        }
        onError(e10) {
          let t10 = this.makeRef();
          return this.stateChangeCallbacks.error.push([t10, e10]), t10;
        }
        onMessage(e10) {
          let t10 = this.makeRef();
          return this.stateChangeCallbacks.message.push([t10, e10]), t10;
        }
        onHeartbeat(e10) {
          this.heartbeatCallback = e10;
        }
        ping(e10) {
          if (!this.isConnected()) return false;
          let t10 = this.makeRef(), r10 = Date.now();
          this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: t10 });
          let n10 = this.onMessage((s10) => {
            s10.ref === t10 && (this.off([n10]), e10(Date.now() - r10));
          });
          return true;
        }
        transportName(e10) {
          return e10 === sr ? "LongPoll" : e10.name;
        }
        transportConnect() {
          let e10;
          this.connectClock++, this.closeWasClean = false, this.authToken && (e10 = ["phoenix", `${n8}${btoa(this.authToken()).replace(/=/g, "")}`]), this.conn = new this.transport(this.endPointURL(), e10), this.conn.binaryType = this.binaryType, this.conn.timeout = this.longpollerTimeout, this.conn.onopen = () => this.onConnOpen(), this.conn.onerror = (e11) => this.onConnError(e11), this.conn.onmessage = (e11) => this.onConnMessage(e11), this.conn.onclose = (e11) => this.onConnClose(e11);
        }
        getSession(e10) {
          return this.sessionStore && this.sessionStore.getItem(e10);
        }
        storeSession(e10, t10) {
          this.sessionStore && this.sessionStore.setItem(e10, t10);
        }
        connectWithFallback(e10, t10 = 2500) {
          let r10, n10;
          clearTimeout(this.fallbackTimer);
          let s10 = false, i10 = true, a10 = this.transportName(e10), o2 = (t11) => {
            this.log("transport", `falling back to ${a10}...`, t11), this.off([r10, n10]), i10 = false, this.replaceTransport(e10), this.transportConnect();
          };
          if (this.getSession(`phx:fallback:${a10}`)) return o2("memorized");
          this.fallbackTimer = setTimeout(o2, t10), n10 = this.onError((e11) => {
            this.log("transport", "error", e11), i10 && !s10 && (clearTimeout(this.fallbackTimer), o2(e11));
          }), this.fallbackRef && this.off([this.fallbackRef]), this.fallbackRef = this.onOpen(() => {
            if (s10 = true, !i10) {
              let t11 = this.transportName(e10);
              return this.primaryPassedHealthCheck || this.storeSession(`phx:fallback:${t11}`, "true"), this.log("transport", `established ${t11} fallback`);
            }
            clearTimeout(this.fallbackTimer), this.fallbackTimer = setTimeout(o2, t10), this.ping((e11) => {
              this.log("transport", "connected to primary after", e11), this.primaryPassedHealthCheck = true, clearTimeout(this.fallbackTimer);
            });
          }), this.transportConnect();
        }
        clearHeartbeats() {
          clearTimeout(this.heartbeatTimer), clearTimeout(this.heartbeatTimeoutTimer);
        }
        onConnOpen() {
          this.hasLogger() && this.log("transport", `connected to ${this.endPointURL()}`), this.closeWasClean = false, this.disconnecting = false, this.establishedConnections++, this.flushSendBuffer(), this.reconnectTimer.reset(), this.autoSendHeartbeat && this.resetHeartbeat(), this.triggerStateCallbacks("open");
        }
        heartbeatTimeout() {
          if (this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null, this.heartbeatSentAt = null, this.hasLogger() && this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
            try {
              this.heartbeatCallback("timeout");
            } catch (e10) {
              this.log("error", "error in heartbeat callback", e10);
            }
            this.triggerChanError(Error("heartbeat timeout")), this.closeWasClean = false, this.teardown(() => this.reconnectTimer.scheduleTimeout(), 1e3, "heartbeat timeout");
          }
        }
        resetHeartbeat() {
          this.conn && this.conn.skipHeartbeat || (this.pendingHeartbeatRef = null, this.clearHeartbeats(), this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs));
        }
        teardown(e10, t10, r10) {
          if (!this.conn) return e10 && e10();
          let n10 = this.conn;
          this.waitForBufferDone(n10, () => {
            t10 ? n10.close(t10, r10 || "") : n10.close(), this.waitForSocketClosed(n10, () => {
              this.conn === n10 && (this.conn.onopen = function() {
              }, this.conn.onerror = function() {
              }, this.conn.onmessage = function() {
              }, this.conn.onclose = function() {
              }, this.conn = null), e10 && e10();
            });
          });
        }
        waitForBufferDone(e10, t10, r10 = 1) {
          5 !== r10 && e10.bufferedAmount ? setTimeout(() => {
            this.waitForBufferDone(e10, t10, r10 + 1);
          }, 150 * r10) : t10();
        }
        waitForSocketClosed(e10, t10, r10 = 1) {
          5 === r10 || 3 === e10.readyState ? t10() : setTimeout(() => {
            this.waitForSocketClosed(e10, t10, r10 + 1);
          }, 150 * r10);
        }
        onConnClose(e10) {
          this.conn && (this.conn.onclose = () => {
          }), this.hasLogger() && this.log("transport", "close", e10), this.triggerChanError(e10), this.clearHeartbeats(), this.closeWasClean || this.reconnectTimer.scheduleTimeout(), this.triggerStateCallbacks("close", e10);
        }
        onConnError(e10) {
          this.hasLogger() && this.log("transport", "error", e10);
          let t10 = this.transport, r10 = this.establishedConnections;
          this.triggerStateCallbacks("error", e10, t10, r10), (t10 === this.transport || r10 > 0) && this.triggerChanError(e10);
        }
        triggerChanError(e10) {
          this.channels.forEach((t10) => {
            t10.isErrored() || t10.isLeaving() || t10.isClosed() || t10.trigger(n3, e10);
          });
        }
        connectionState() {
          switch (this.conn && this.conn.readyState) {
            case 0:
              return "connecting";
            case 1:
              return "open";
            case 2:
              return "closing";
            default:
              return "closed";
          }
        }
        isConnected() {
          return "open" === this.connectionState();
        }
        remove(e10) {
          this.off(e10.stateChangeRefs), this.channels = this.channels.filter((t10) => t10 !== e10);
        }
        off(e10) {
          for (let t10 in this.stateChangeCallbacks) this.stateChangeCallbacks[t10] = this.stateChangeCallbacks[t10].filter(([t11]) => -1 === e10.indexOf(t11));
        }
        channel(e10, t10 = {}) {
          let r10 = new se(e10, t10, this);
          return this.channels.push(r10), r10;
        }
        push(e10) {
          if (this.hasLogger()) {
            let { topic: t10, event: r10, payload: n10, ref: s10, join_ref: i10 } = e10;
            this.log("push", `${t10} ${r10} (${i10}, ${s10})`, n10);
          }
          this.isConnected() ? this.encode(e10, (e11) => this.conn.send(e11)) : this.sendBuffer.push(() => this.encode(e10, (e11) => this.conn.send(e11)));
        }
        makeRef() {
          let e10 = this.ref + 1;
          return e10 === this.ref ? this.ref = 0 : this.ref = e10, this.ref.toString();
        }
        sendHeartbeat() {
          if (!this.isConnected()) {
            try {
              this.heartbeatCallback("disconnected");
            } catch (e10) {
              this.log("error", "error in heartbeat callback", e10);
            }
            return;
          }
          if (this.pendingHeartbeatRef) return void this.heartbeatTimeout();
          this.pendingHeartbeatRef = this.makeRef(), this.heartbeatSentAt = Date.now(), this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
          try {
            this.heartbeatCallback("sent");
          } catch (e10) {
            this.log("error", "error in heartbeat callback", e10);
          }
          this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
        }
        flushSendBuffer() {
          this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e10) => e10()), this.sendBuffer = []);
        }
        onConnMessage(e10) {
          this.decode(e10.data, (e11) => {
            let { topic: t10, event: r10, payload: n10, ref: s10, join_ref: i10 } = e11;
            if (s10 && s10 === this.pendingHeartbeatRef) {
              let e12 = this.heartbeatSentAt ? Date.now() - this.heartbeatSentAt : void 0;
              this.clearHeartbeats();
              try {
                this.heartbeatCallback("ok" === n10.status ? "ok" : "error", e12);
              } catch (e13) {
                this.log("error", "error in heartbeat callback", e13);
              }
              this.pendingHeartbeatRef = null, this.heartbeatSentAt = null, this.autoSendHeartbeat && (this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs));
            }
            this.hasLogger() && this.log("receive", `${n10.status || ""} ${t10} ${r10} ${s10 && "(" + s10 + ")" || ""}`.trim(), n10);
            for (let e12 = 0; e12 < this.channels.length; e12++) {
              let a10 = this.channels[e12];
              a10.isMember(t10, r10, n10, i10) && a10.trigger(r10, n10, s10, i10);
            }
            this.triggerStateCallbacks("message", e11);
          });
        }
        triggerStateCallbacks(e10, ...t10) {
          try {
            this.stateChangeCallbacks[e10].forEach(([r10, n10]) => {
              try {
                n10(...t10);
              } catch (t11) {
                this.log("error", `error in ${e10} callback`, t11);
              }
            });
          } catch (t11) {
            this.log("error", `error triggering ${e10} callbacks`, t11);
          }
        }
        leaveOpenTopic(e10) {
          let t10 = this.channels.find((t11) => t11.topic === e10 && (t11.isJoined() || t11.isJoining()));
          t10 && (this.hasLogger() && this.log("transport", `leaving duplicate topic "${e10}"`), t10.leave());
        }
      };
      class sa {
        constructor(e10, t10) {
          const r10 = function(e11) {
            return (null == e11 ? void 0 : e11.events) && { events: e11.events };
          }(t10);
          this.presence = new sn(e10.getChannel(), r10), this.presence.onJoin((t11, r11, n10) => {
            let s10 = sa.onJoinPayload(t11, r11, n10);
            e10.getChannel().trigger("presence", s10);
          }), this.presence.onLeave((t11, r11, n10) => {
            let s10 = sa.onLeavePayload(t11, r11, n10);
            e10.getChannel().trigger("presence", s10);
          }), this.presence.onSync(() => {
            e10.getChannel().trigger("presence", { event: "sync" });
          });
        }
        get state() {
          return sa.transformState(this.presence.state);
        }
        static transformState(e10) {
          return Object.getOwnPropertyNames(e10 = JSON.parse(JSON.stringify(e10))).reduce((t10, r10) => {
            let n10 = e10[r10];
            return t10[r10] = so(n10), t10;
          }, {});
        }
        static onJoinPayload(e10, t10, r10) {
          return { event: "join", key: e10, currentPresences: sl(t10), newPresences: so(r10) };
        }
        static onLeavePayload(e10, t10, r10) {
          return { event: "leave", key: e10, currentPresences: sl(t10), leftPresences: so(r10) };
        }
      }
      function so(e10) {
        return e10.metas.map((e11) => {
          let t10 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(e11));
          return t10.presence_ref = t10.phx_ref, delete t10.phx_ref, delete t10.phx_ref_prev, t10;
        });
      }
      function sl(e10) {
        return (null == e10 ? void 0 : e10.metas) ? so(e10) : [];
      }
      (eh = eE || (eE = {})).SYNC = "sync", eh.JOIN = "join", eh.LEAVE = "leave";
      class su {
        get state() {
          return this.presenceAdapter.state;
        }
        constructor(e10, t10) {
          this.channel = e10, this.presenceAdapter = new sa(this.channel.channelAdapter, t10);
        }
      }
      class sc {
        constructor(e10, t10, r10) {
          const n10 = function(e11) {
            return { config: Object.assign({ broadcast: { ack: false, self: false }, presence: { key: "", enabled: false }, private: false }, e11.config) };
          }(r10);
          this.channel = e10.getSocket().channel(t10, n10), this.socket = e10;
        }
        get state() {
          return this.channel.state;
        }
        set state(e10) {
          this.channel.state = e10;
        }
        get joinedOnce() {
          return this.channel.joinedOnce;
        }
        get joinPush() {
          return this.channel.joinPush;
        }
        get rejoinTimer() {
          return this.channel.rejoinTimer;
        }
        on(e10, t10) {
          return this.channel.on(e10, t10);
        }
        off(e10, t10) {
          this.channel.off(e10, t10);
        }
        subscribe(e10) {
          return this.channel.join(e10);
        }
        unsubscribe(e10) {
          return this.channel.leave(e10);
        }
        teardown() {
          this.channel.teardown();
        }
        onClose(e10) {
          this.channel.onClose(e10);
        }
        onError(e10) {
          return this.channel.onError(e10);
        }
        push(e10, t10, r10) {
          let n10;
          try {
            n10 = this.channel.push(e10, t10, r10);
          } catch (t11) {
            throw Error(`tried to push '${e10}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`);
          }
          if (this.channel.pushBuffer.length > 100) {
            let e11 = this.channel.pushBuffer.shift();
            e11.cancelTimeout(), this.socket.log("channel", `discarded push due to buffer overflow: ${e11.event}`, e11.payload());
          }
          return n10;
        }
        updateJoinPayload(e10) {
          let t10 = this.channel.joinPush.payload();
          this.channel.joinPush.payload = () => Object.assign(Object.assign({}, t10), e10);
        }
        canPush() {
          return this.socket.isConnected() && this.state === n$;
        }
        isJoined() {
          return this.state === n$;
        }
        isJoining() {
          return "joining" === this.state;
        }
        isClosed() {
          return "closed" === this.state;
        }
        isLeaving() {
          return "leaving" === this.state;
        }
        updateFilterBindings(e10) {
          this.channel.filterBindings = e10;
        }
        updatePayloadTransform(e10) {
          this.channel.onMessage = e10;
        }
        getChannel() {
          return this.channel;
        }
      }
      let sd = /[,()"\\]/, sh = (e10) => {
        let t10 = null === e10 ? "null" : String(e10);
        return sd.test(t10) || t10 !== t10.trim() ? `"${t10.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"` : t10;
      };
      class sp {
        constructor() {
          this.filters = [];
        }
        add(e10, t10, r10, n10 = false) {
          return this.filters.push(`${e10}=${n10 ? "not." : ""}${((e11, t11) => {
            if ("in" === e11) {
              let e12 = Array.isArray(t11) ? t11 : [t11];
              if (0 === e12.length) throw Error("Realtime `in` filter requires at least one value.");
              let r11 = Array.from(new Set(e12)).map((e13) => sh(e13)).join(",");
              return `in.(${r11})`;
            }
            if ("is" === e11) return `is.${null === t11 ? "null" : String(t11)}`;
            return `${e11}.${sh(t11)}`;
          })(t10, r10)}`), this;
        }
        eq(e10, t10) {
          return this.add(e10, "eq", t10);
        }
        neq(e10, t10) {
          return this.add(e10, "neq", t10);
        }
        gt(e10, t10) {
          return this.add(e10, "gt", t10);
        }
        gte(e10, t10) {
          return this.add(e10, "gte", t10);
        }
        lt(e10, t10) {
          return this.add(e10, "lt", t10);
        }
        lte(e10, t10) {
          return this.add(e10, "lte", t10);
        }
        in(e10, t10) {
          return this.add(e10, "in", t10);
        }
        like(e10, t10) {
          return this.add(e10, "like", t10);
        }
        ilike(e10, t10) {
          return this.add(e10, "ilike", t10);
        }
        match(e10, t10) {
          return this.add(e10, "match", t10);
        }
        imatch(e10, t10) {
          return this.add(e10, "imatch", t10);
        }
        is(e10, t10) {
          return this.add(e10, "is", t10);
        }
        isDistinct(e10, t10) {
          return this.add(e10, "isdistinct", t10);
        }
        not(e10, t10, r10) {
          return this.add(e10, t10, r10, true);
        }
        build() {
          return this.filters.join(",");
        }
        toString() {
          return this.build();
        }
      }
      (ep = eS || (eS = {})).ALL = "*", ep.INSERT = "INSERT", ep.UPDATE = "UPDATE", ep.DELETE = "DELETE", (ef = ek || (ek = {})).BROADCAST = "broadcast", ef.PRESENCE = "presence", ef.POSTGRES_CHANGES = "postgres_changes", ef.SYSTEM = "system", (eg = eT || (eT = {})).SUBSCRIBED = "SUBSCRIBED", eg.TIMED_OUT = "TIMED_OUT", eg.CLOSED = "CLOSED", eg.CHANNEL_ERROR = "CHANNEL_ERROR";
      class sf {
        get state() {
          return this.channelAdapter.state;
        }
        set state(e10) {
          this.channelAdapter.state = e10;
        }
        get joinedOnce() {
          return this.channelAdapter.joinedOnce;
        }
        get timeout() {
          return this.socket.timeout;
        }
        get joinPush() {
          return this.channelAdapter.joinPush;
        }
        get rejoinTimer() {
          return this.channelAdapter.rejoinTimer;
        }
        constructor(e10, t10 = { config: {} }, r10) {
          var n10, s10;
          if (this.topic = e10, this.params = t10, this.socket = r10, this.bindings = {}, this.subTopic = e10.replace(/^realtime:/i, ""), this.params.config = Object.assign({ broadcast: { ack: false, self: false }, presence: { key: "", enabled: false }, private: false }, t10.config), this.channelAdapter = new sc(this.socket.socketAdapter, e10, this.params), this.presence = new su(this), this._onClose(() => {
            this.socket._remove(this);
          }), this._updateFilterTransform(), this.broadcastEndpointURL = nW(this.socket.socketAdapter.endPointURL()), this.private = this.params.config.private || false, !this.private && (null == (s10 = null == (n10 = this.params.config) ? void 0 : n10.broadcast) ? void 0 : s10.replay)) throw Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`);
        }
        subscribe(e10, t10 = this.timeout) {
          var r10, n10, s10;
          if (this.socket.isConnected() || this.socket.connect(), this.channelAdapter.isClosed()) {
            let { config: { broadcast: i10, presence: a10, private: o2 } } = this.params, l2 = null != (n10 = null == (r10 = this.bindings.postgres_changes) ? void 0 : r10.map((e11) => e11.filter)) ? n10 : [], u2 = !!this.bindings[ek.PRESENCE] && this.bindings[ek.PRESENCE].length > 0 || (null == (s10 = this.params.config.presence) ? void 0 : s10.enabled) === true, c2 = {}, d2 = { broadcast: i10, presence: Object.assign(Object.assign({}, a10), { enabled: u2 }), postgres_changes: l2, private: o2 };
            this.socket.accessTokenValue && (c2.access_token = this.socket.accessTokenValue), this._onError((t11) => {
              null == e10 || e10(eT.CHANNEL_ERROR, function(e11) {
                if (e11 instanceof Error) return e11;
                if ("string" == typeof e11) return Error(e11);
                if (e11 && "object" == typeof e11) {
                  if ("number" == typeof e11.code) {
                    let t12 = "string" == typeof e11.reason && e11.reason ? ` (${e11.reason})` : "";
                    return Error(`socket closed: ${e11.code}${t12}`, { cause: e11 });
                  }
                  return Error("channel error: transport failure", { cause: e11 });
                }
                return Error("channel error: connection lost");
              }(t11));
            }), this._onClose(() => null == e10 ? void 0 : e10(eT.CLOSED)), this.updateJoinPayload(Object.assign({ config: d2 }, c2)), this._updateFilterMessage(), this.channelAdapter.subscribe(t10).receive("ok", async ({ postgres_changes: t11 }) => {
              if (this.socket._isManualToken() || this.socket.setAuth(), void 0 === t11) {
                null == e10 || e10(eT.SUBSCRIBED);
                return;
              }
              this._updatePostgresBindings(t11, e10);
            }).receive("error", (t11) => {
              this.state = nL;
              let r11 = Object.values(t11).join(", ") || "error";
              null == e10 || e10(eT.CHANNEL_ERROR, Error(r11, { cause: t11 }));
            }).receive("timeout", () => {
              null == e10 || e10(eT.TIMED_OUT);
            });
          }
          return this;
        }
        _updatePostgresBindings(e10, t10) {
          var r10;
          let n10 = this.bindings.postgres_changes, s10 = null != (r10 = null == n10 ? void 0 : n10.length) ? r10 : 0, i10 = [];
          for (let r11 = 0; r11 < s10; r11++) {
            let s11 = n10[r11], { filter: { event: a10, schema: o2, table: l2, filter: u2 } } = s11, c2 = e10 && e10[r11];
            if (c2 && c2.event === a10 && sf.isFilterValueEqual(c2.schema, o2) && sf.isFilterValueEqual(c2.table, l2) && sf.isFilterValueEqual(c2.filter, u2)) i10.push(Object.assign(Object.assign({}, s11), { id: c2.id }));
            else {
              this.unsubscribe(), this.state = nL, null == t10 || t10(eT.CHANNEL_ERROR, Error("mismatch between server and client bindings for postgres changes"));
              return;
            }
          }
          this.bindings.postgres_changes = i10, this.state != nL && t10 && t10(eT.SUBSCRIBED);
        }
        presenceState() {
          return this.presence.state;
        }
        async track(e10, t10 = {}) {
          return await this.send({ type: "presence", event: "track", payload: e10 }, t10);
        }
        async untrack(e10 = {}) {
          return await this.send({ type: "presence", event: "untrack" }, e10);
        }
        on(e10, t10, r10) {
          let n10 = this.channelAdapter.isJoined() || this.channelAdapter.isJoining(), s10 = e10 === ek.PRESENCE || e10 === ek.POSTGRES_CHANGES;
          if (n10 && s10) throw this.socket.log("channel", `cannot add \`${e10}\` callbacks for ${this.topic} after \`subscribe()\`.`), Error(`cannot add \`${e10}\` callbacks for ${this.topic} after \`subscribe()\`.`);
          return this._on(e10, t10, r10);
        }
        async httpSend(e10, t10, r10 = {}) {
          var n10;
          if (null == t10) return Promise.reject(Error("Payload is required for httpSend()"));
          let s10 = t10 instanceof ArrayBuffer || ArrayBuffer.isView(t10), i10 = { apikey: this.socket.apiKey ? this.socket.apiKey : "", "Content-Type": s10 ? "application/octet-stream" : "application/json" };
          this.socket.accessTokenValue && (i10.Authorization = `Bearer ${this.socket.accessTokenValue}`);
          let a10 = new URL(this.broadcastEndpointURL);
          a10.pathname += `/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e10)}`, this.private && a10.searchParams.set("private", "true");
          let o2 = { method: "POST", headers: i10, body: s10 ? t10 : JSON.stringify(t10) }, l2 = await this._fetchWithTimeout(a10.toString(), o2, null != (n10 = r10.timeout) ? n10 : this.timeout);
          if (202 === l2.status) return { success: true };
          if (404 === l2.status) return Promise.reject(Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));
          let u2 = l2.statusText;
          try {
            let e11 = await l2.json();
            u2 = e11.error || e11.message || u2;
          } catch (e11) {
          }
          return Promise.reject(Error(u2));
        }
        async send(e10, t10 = {}) {
          var r10, n10;
          if (this.channelAdapter.canPush() || "broadcast" !== e10.type) return new Promise((r11) => {
            var n11, s10, i10;
            let a10 = this.channelAdapter.push(e10.type, e10, t10.timeout || this.timeout);
            "broadcast" !== e10.type || (null == (i10 = null == (s10 = null == (n11 = this.params) ? void 0 : n11.config) ? void 0 : s10.broadcast) ? void 0 : i10.ack) || r11("ok"), a10.receive("ok", () => r11("ok")), a10.receive("error", () => r11("error")), a10.receive("timeout", () => r11("timed out"));
          });
          {
            console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");
            let { event: s10, payload: i10 } = e10, a10 = { apikey: this.socket.apiKey ? this.socket.apiKey : "", "Content-Type": "application/json" };
            this.socket.accessTokenValue && (a10.Authorization = `Bearer ${this.socket.accessTokenValue}`);
            let o2 = { method: "POST", headers: a10, body: JSON.stringify({ messages: [{ topic: this.subTopic, event: s10, payload: i10, private: this.private }] }) };
            try {
              let e11 = await this._fetchWithTimeout(this.broadcastEndpointURL, o2, null != (r10 = t10.timeout) ? r10 : this.timeout);
              return await (null == (n10 = e11.body) ? void 0 : n10.cancel()), e11.ok ? "ok" : "error";
            } catch (e11) {
              if (e11 instanceof Error && "AbortError" === e11.name) return "timed out";
              return "error";
            }
          }
        }
        updateJoinPayload(e10) {
          this.channelAdapter.updateJoinPayload(e10);
        }
        async unsubscribe(e10 = this.timeout) {
          return new Promise((t10) => {
            this.channelAdapter.unsubscribe(e10).receive("ok", () => t10("ok")).receive("timeout", () => t10("timed out")).receive("error", () => t10("error"));
          });
        }
        teardown() {
          this.channelAdapter.teardown();
        }
        async _fetchWithTimeout(e10, t10, r10) {
          let n10 = new AbortController(), s10 = setTimeout(() => n10.abort(), r10), i10 = await this.socket.fetch(e10, Object.assign(Object.assign({}, t10), { signal: n10.signal }));
          return clearTimeout(s10), i10;
        }
        _on(e10, t10, r10) {
          var n10;
          let s10 = e10.toLocaleLowerCase(), i10 = null == t10 ? void 0 : t10.filter;
          if ((i10 instanceof sp || "object" == typeof i10 && null !== i10 && "function" == typeof i10.build) && (t10 = Object.assign(Object.assign({}, t10), { filter: i10.build() })), s10 === ek.POSTGRES_CHANGES && (null == (n10 = this.bindings[s10]) ? void 0 : n10.find((e11) => sf.isSamePostgresFilter(e11.filter, t10)))) return this.socket.log("error", `duplicate \`postgres_changes\` binding for ${this.topic} ignored`, t10), this;
          let a10 = this.channelAdapter.on(e10, r10), o2 = { type: s10, filter: t10, callback: r10, ref: a10 };
          return this.bindings[s10] ? this.bindings[s10].push(o2) : this.bindings[s10] = [o2], this._updateFilterMessage(), this;
        }
        _onClose(e10) {
          this.channelAdapter.onClose(e10);
        }
        _onError(e10) {
          this.channelAdapter.onError(e10);
        }
        _updateFilterMessage() {
          this.channelAdapter.updateFilterBindings((e10, t10, r10) => {
            var n10, s10, i10, a10, o2, l2, u2;
            let c2 = e10.event.toLocaleLowerCase();
            if (this._notThisChannelEvent(c2, r10)) return false;
            let d2 = null == (n10 = this.bindings[c2]) ? void 0 : n10.find((t11) => t11.ref === e10.ref);
            if (!d2) return true;
            if (!["broadcast", "presence", "postgres_changes"].includes(c2)) return d2.type.toLocaleLowerCase() === c2;
            if ("id" in d2) {
              let e11 = d2.id, r11 = null == (s10 = d2.filter) ? void 0 : s10.event;
              return e11 && (null == (i10 = t10.ids) ? void 0 : i10.includes(e11)) && ("*" === r11 || (null == r11 ? void 0 : r11.toLocaleLowerCase()) === (null == (a10 = t10.data) ? void 0 : a10.type.toLocaleLowerCase()));
            }
            {
              let e11 = null == (l2 = null == (o2 = null == d2 ? void 0 : d2.filter) ? void 0 : o2.event) ? void 0 : l2.toLocaleLowerCase();
              return "*" === e11 || e11 === (null == (u2 = null == t10 ? void 0 : t10.event) ? void 0 : u2.toLocaleLowerCase());
            }
          });
        }
        _notThisChannelEvent(e10, t10) {
          let { close: r10, error: n10, leave: s10, join: i10 } = nM;
          return t10 && [r10, n10, s10, i10].includes(e10) && t10 !== this.joinPush.ref;
        }
        _updateFilterTransform() {
          this.channelAdapter.updatePayloadTransform((e10, t10, r10) => {
            if ("object" == typeof t10 && "ids" in t10) {
              let e11 = t10.data, { schema: r11, table: n10, commit_timestamp: s10, type: i10, errors: a10 } = e11;
              return Object.assign(Object.assign({}, { schema: r11, table: n10, commit_timestamp: s10, eventType: i10, new: {}, old: {}, errors: a10 }), this._getPayloadRecords(e11));
            }
            return t10;
          });
        }
        copyBindings(e10) {
          if (this.joinedOnce) throw Error("cannot copy bindings into joined channel");
          for (let t10 in e10.bindings) for (let r10 of e10.bindings[t10]) this._on(r10.type, r10.filter, r10.callback);
        }
        static isFilterValueEqual(e10, t10) {
          return (null != e10 ? e10 : void 0) === (null != t10 ? t10 : void 0);
        }
        static isSamePostgresFilter(e10, t10) {
          var r10, n10, s10, i10;
          let a10 = null != (n10 = null == (r10 = null == e10 ? void 0 : e10.select) ? void 0 : r10.join()) ? n10 : void 0, o2 = null != (i10 = null == (s10 = null == t10 ? void 0 : t10.select) ? void 0 : s10.join()) ? i10 : void 0;
          return (null == e10 ? void 0 : e10.event) === (null == t10 ? void 0 : t10.event) && sf.isFilterValueEqual(null == e10 ? void 0 : e10.schema, null == t10 ? void 0 : t10.schema) && sf.isFilterValueEqual(null == e10 ? void 0 : e10.table, null == t10 ? void 0 : t10.table) && sf.isFilterValueEqual(null == e10 ? void 0 : e10.filter, null == t10 ? void 0 : t10.filter) && a10 === o2;
        }
        _getPayloadRecords(e10) {
          let t10 = { new: {}, old: {} };
          return ("INSERT" === e10.type || "UPDATE" === e10.type) && (t10.new = nU(e10.columns, e10.record)), ("UPDATE" === e10.type || "DELETE" === e10.type) && (t10.old = nU(e10.columns, e10.old_record)), t10;
        }
      }
      class sg {
        constructor(e10, t10) {
          this.socket = new si(e10, t10);
        }
        get timeout() {
          return this.socket.timeout;
        }
        get endPoint() {
          return this.socket.endPoint;
        }
        get transport() {
          return this.socket.transport;
        }
        get heartbeatIntervalMs() {
          return this.socket.heartbeatIntervalMs;
        }
        get heartbeatCallback() {
          return this.socket.heartbeatCallback;
        }
        set heartbeatCallback(e10) {
          this.socket.heartbeatCallback = e10;
        }
        get heartbeatTimer() {
          return this.socket.heartbeatTimer;
        }
        get pendingHeartbeatRef() {
          return this.socket.pendingHeartbeatRef;
        }
        get reconnectTimer() {
          return this.socket.reconnectTimer;
        }
        get vsn() {
          return this.socket.vsn;
        }
        get encode() {
          return this.socket.encode;
        }
        get decode() {
          return this.socket.decode;
        }
        get reconnectAfterMs() {
          return this.socket.reconnectAfterMs;
        }
        get sendBuffer() {
          return this.socket.sendBuffer;
        }
        get stateChangeCallbacks() {
          return this.socket.stateChangeCallbacks;
        }
        connect() {
          this.socket.connect();
        }
        disconnect(e10, t10, r10, n10 = 1e4) {
          return new Promise((s10) => {
            setTimeout(() => s10("timeout"), n10), this.socket.disconnect(() => {
              e10(), s10("ok");
            }, t10, r10);
          });
        }
        push(e10) {
          this.socket.push(e10);
        }
        log(e10, t10, r10) {
          this.socket.log(e10, t10, r10);
        }
        makeRef() {
          return this.socket.makeRef();
        }
        onOpen(e10) {
          this.socket.onOpen(e10);
        }
        onClose(e10) {
          this.socket.onClose(e10);
        }
        onError(e10) {
          this.socket.onError(e10);
        }
        onMessage(e10) {
          this.socket.onMessage(e10);
        }
        isConnected() {
          return this.socket.isConnected();
        }
        isConnecting() {
          return "connecting" == this.socket.connectionState();
        }
        isDisconnecting() {
          return "closing" == this.socket.connectionState();
        }
        connectionState() {
          return this.socket.connectionState();
        }
        endPointURL() {
          return this.socket.endPointURL();
        }
        sendHeartbeat() {
          this.socket.sendHeartbeat();
        }
        getSocket() {
          return this.socket;
        }
      }
      let sm = [1e3, 2e3, 5e3, 1e4], s_ = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
      class sy {
        get endPoint() {
          return this.socketAdapter.endPoint;
        }
        get timeout() {
          return this.socketAdapter.timeout;
        }
        get transport() {
          return this.socketAdapter.transport;
        }
        get heartbeatCallback() {
          return this.socketAdapter.heartbeatCallback;
        }
        get heartbeatIntervalMs() {
          return this.socketAdapter.heartbeatIntervalMs;
        }
        get heartbeatTimer() {
          return this.worker ? this._workerHeartbeatTimer : this.socketAdapter.heartbeatTimer;
        }
        get pendingHeartbeatRef() {
          return this.worker ? this._pendingWorkerHeartbeatRef : this.socketAdapter.pendingHeartbeatRef;
        }
        get reconnectTimer() {
          return this.socketAdapter.reconnectTimer;
        }
        get vsn() {
          return this.socketAdapter.vsn;
        }
        get encode() {
          return this.socketAdapter.encode;
        }
        get decode() {
          return this.socketAdapter.decode;
        }
        get reconnectAfterMs() {
          return this.socketAdapter.reconnectAfterMs;
        }
        get sendBuffer() {
          return this.socketAdapter.sendBuffer;
        }
        get stateChangeCallbacks() {
          return this.socketAdapter.stateChangeCallbacks;
        }
        constructor(e10, t10) {
          var r10;
          if (this.channels = [], this.accessTokenValue = null, this.accessToken = null, this.apiKey = null, this.httpEndpoint = "", this.headers = {}, this.params = {}, this.ref = 0, this.serializer = new nD(), this._manuallySetToken = false, this._authPromise = null, this._authGeneration = 0, this._workerHeartbeatTimer = void 0, this._pendingWorkerHeartbeatRef = null, this._pendingDisconnectTimer = null, this._disconnectOnEmptyChannelsAfterMs = 0, this._resolveFetch = (e11) => e11 ? (...t11) => e11(...t11) : (...e12) => fetch(...e12), !(null == (r10 = null == t10 ? void 0 : t10.params) ? void 0 : r10.apikey)) throw Error("API key is required to connect to Realtime");
          this.apiKey = t10.params.apikey;
          const n10 = this._initializeOptions(t10);
          this.socketAdapter = new sg(e10, n10), this.httpEndpoint = nW(e10), this.fetch = this._resolveFetch(null == t10 ? void 0 : t10.fetch);
        }
        connect() {
          if (!(this.isConnecting() || this.isDisconnecting() || this.isConnected())) {
            this.accessToken && !this._authPromise && this._setAuthSafely("connect"), this._setupConnectionHandlers();
            try {
              this.socketAdapter.connect();
            } catch (t10) {
              let e10 = t10.message;
              throw Error(`WebSocket not available: ${e10}`);
            }
            this._handleNodeJsRaceCondition();
          }
        }
        endpointURL() {
          return this.socketAdapter.endPointURL();
        }
        async disconnect(e10, t10) {
          return (this._cancelPendingDisconnect(), this.isDisconnecting()) ? "ok" : await this.socketAdapter.disconnect(() => {
            clearInterval(this._workerHeartbeatTimer), this._terminateWorker();
          }, e10, t10);
        }
        getChannels() {
          return this.channels;
        }
        async removeChannel(e10) {
          let t10 = await e10.unsubscribe();
          return "ok" === t10 && e10.teardown(), t10;
        }
        async removeAllChannels() {
          let e10 = this.channels.map(async (e11) => {
            let t11 = await e11.unsubscribe();
            return e11.teardown(), t11;
          }), t10 = await Promise.all(e10);
          return await this.disconnect(), t10;
        }
        log(e10, t10, r10) {
          this.socketAdapter.log(e10, t10, r10);
        }
        connectionState() {
          return this.socketAdapter.connectionState() || "closed";
        }
        isConnected() {
          return this.socketAdapter.isConnected();
        }
        isConnecting() {
          return this.socketAdapter.isConnecting();
        }
        isDisconnecting() {
          return this.socketAdapter.isDisconnecting();
        }
        channel(e10, t10 = { config: {} }) {
          let r10 = `realtime:${e10}`, n10 = this.getChannels().find((e11) => e11.topic === r10);
          if (n10) return n10;
          {
            let r11 = new sf(`realtime:${e10}`, t10, this);
            return this._cancelPendingDisconnect(), this.channels.push(r11), r11;
          }
        }
        push(e10) {
          this.socketAdapter.push(e10);
        }
        async setAuth(e10 = null) {
          let t10 = ++this._authGeneration, r10 = this._performAuth(e10, t10);
          t10 === this._authGeneration && (this._authPromise = r10);
          try {
            await r10;
          } finally {
            this._authPromise === r10 && (this._authPromise = null);
          }
        }
        _isManualToken() {
          return this._manuallySetToken;
        }
        async sendHeartbeat() {
          this.socketAdapter.sendHeartbeat();
        }
        onHeartbeat(e10) {
          this.socketAdapter.heartbeatCallback = this._wrapHeartbeatCallback(e10);
        }
        _makeRef() {
          return this.socketAdapter.makeRef();
        }
        _remove(e10) {
          this.channels = this.channels.filter((t10) => t10.topic !== e10.topic), 0 === this.channels.length && (this.log("transport", "no channels remaining, scheduling disconnect"), this._schedulePendingDisconnect());
        }
        _schedulePendingDisconnect() {
          if (this._cancelPendingDisconnect(), 0 === this._disconnectOnEmptyChannelsAfterMs) {
            this.log("transport", "disconnecting immediately - no channels"), this.disconnect();
            return;
          }
          this._pendingDisconnectTimer = setTimeout(() => {
            this._pendingDisconnectTimer = null, 0 === this.channels.length && (this.log("transport", "deferred disconnect fired - no channels, disconnecting"), this.disconnect());
          }, this._disconnectOnEmptyChannelsAfterMs), this.log("transport", `deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`);
        }
        _cancelPendingDisconnect() {
          null !== this._pendingDisconnectTimer && (this.log("transport", "pending disconnect cancelled - channel activity detected"), clearTimeout(this._pendingDisconnectTimer), this._pendingDisconnectTimer = null);
        }
        async _performAuth(e10, t10) {
          let r10, n10 = false;
          if (e10) r10 = e10, n10 = true;
          else if (this.accessToken) try {
            r10 = await this.accessToken();
          } catch (e11) {
            this.log("error", "Error fetching access token from callback", e11), r10 = this.accessTokenValue;
          }
          else r10 = this.accessTokenValue;
          t10 === this._authGeneration && (this.accessToken ? this._manuallySetToken = false : n10 && (this._manuallySetToken = true), this.accessTokenValue != r10 && (this.accessTokenValue = r10, this.channels.forEach((e11) => {
            let t11 = { access_token: r10, version: "realtime-js/2.112.2" };
            e11.updateJoinPayload(t11), e11.joinedOnce && e11.channelAdapter.isJoined() && e11.channelAdapter.push(nM.access_token, { access_token: r10 });
          })));
        }
        async _waitForAuthIfNeeded() {
          this._authPromise && await this._authPromise;
        }
        _setAuthSafely(e10 = "general") {
          this._isManualToken() || this.setAuth().catch((t10) => {
            this.log("error", `Error setting auth in ${e10}`, t10);
          });
        }
        _setupConnectionHandlers() {
          this.socketAdapter.onOpen(() => {
            (this._authPromise || (this.accessToken && !this.accessTokenValue ? this.setAuth() : Promise.resolve())).catch((e10) => {
              this.log("error", "error waiting for auth on connect", e10);
            }), this.worker && !this.workerRef && this._startWorkerHeartbeat();
          }), this.socketAdapter.onClose(() => {
            this.worker && this.workerRef && this._terminateWorker();
          }), this.socketAdapter.onMessage((e10) => {
            e10.ref && e10.ref === this._pendingWorkerHeartbeatRef && (this._pendingWorkerHeartbeatRef = null);
          });
        }
        _handleNodeJsRaceCondition() {
          this.socketAdapter.isConnected() && this.socketAdapter.getSocket().onConnOpen();
        }
        _wrapHeartbeatCallback(e10) {
          return (t10, r10) => {
            "disconnected" !== t10 && ("sent" == t10 && this._setAuthSafely(), e10 && e10(t10, r10));
          };
        }
        _startWorkerHeartbeat() {
          this.workerUrl ? this.log("worker", `starting worker for from ${this.workerUrl}`) : this.log("worker", "starting default worker");
          let e10 = this._workerObjectUrl(this.workerUrl);
          this.workerRef = new Worker(e10), this.workerRef.onerror = (e11) => {
            this.log("worker", "worker error", e11.message), this._terminateWorker(), this.disconnect();
          }, this.workerRef.onmessage = (e11) => {
            "keepAlive" === e11.data.event && this.sendHeartbeat();
          }, this.workerRef.postMessage({ event: "start", interval: this.heartbeatIntervalMs });
        }
        _terminateWorker() {
          this.workerRef && (this.log("worker", "terminating worker"), this.workerRef.terminate(), this.workerRef = void 0);
        }
        _workerObjectUrl(e10) {
          let t10;
          if (e10) t10 = e10;
          else {
            let e11 = new Blob([s_], { type: "application/javascript" });
            t10 = URL.createObjectURL(e11);
          }
          return t10;
        }
        _initializeOptions(e10) {
          var t10, r10, n10, s10, i10, a10, o2, l2, u2, c2, d2, h2;
          let p2, f2;
          this.worker = null != (t10 = null == e10 ? void 0 : e10.worker) && t10, this.accessToken = null != (r10 = null == e10 ? void 0 : e10.accessToken) ? r10 : null;
          let g2 = {};
          g2.timeout = null != (n10 = null == e10 ? void 0 : e10.timeout) ? n10 : 1e4, g2.heartbeatIntervalMs = null != (s10 = null == e10 ? void 0 : e10.heartbeatIntervalMs) ? s10 : 25e3, this._disconnectOnEmptyChannelsAfterMs = null != (i10 = null == e10 ? void 0 : e10.disconnectOnEmptyChannelsAfterMs) ? i10 : 2 * (null != (a10 = null == e10 ? void 0 : e10.heartbeatIntervalMs) ? a10 : 25e3), g2.transport = null != (o2 = null == e10 ? void 0 : e10.transport) ? o2 : nN.getWebSocketConstructor(), g2.params = null == e10 ? void 0 : e10.params, g2.logger = null == e10 ? void 0 : e10.logger, g2.heartbeatCallback = this._wrapHeartbeatCallback(null == e10 ? void 0 : e10.heartbeatCallback), g2.sessionStorage = null != (l2 = null == e10 ? void 0 : e10.sessionStorage) ? l2 : function() {
            let e11;
            try {
              if ("u" > typeof globalThis && globalThis.sessionStorage) return globalThis.sessionStorage;
            } catch (e12) {
            }
            return e11 = /* @__PURE__ */ new Map(), { get length() {
              return e11.size;
            }, clear() {
              e11.clear();
            }, getItem: (t11) => e11.has(t11) ? e11.get(t11) : null, key(t11) {
              var r11;
              return null != (r11 = Array.from(e11.keys())[t11]) ? r11 : null;
            }, removeItem(t11) {
              e11.delete(t11);
            }, setItem(t11, r11) {
              e11.set(t11, String(r11));
            } };
          }(), g2.reconnectAfterMs = null != (u2 = null == e10 ? void 0 : e10.reconnectAfterMs) ? u2 : (e11) => sm[e11 - 1] || 1e4;
          let m2 = null != (c2 = null == e10 ? void 0 : e10.vsn) ? c2 : nj;
          switch (m2) {
            case "1.0.0":
              p2 = (e11, t11) => t11(JSON.stringify(e11)), f2 = (e11, t11) => t11(JSON.parse(e11));
              break;
            case nj:
              p2 = this.serializer.encode.bind(this.serializer), f2 = this.serializer.decode.bind(this.serializer);
              break;
            default:
              throw Error(`Unsupported serializer version: ${g2.vsn}`);
          }
          return g2.vsn = m2, g2.encode = null != (d2 = null == e10 ? void 0 : e10.encode) ? d2 : p2, g2.decode = null != (h2 = null == e10 ? void 0 : e10.decode) ? h2 : f2, g2.beforeReconnect = this._reconnectAuth.bind(this), ((null == e10 ? void 0 : e10.logLevel) || (null == e10 ? void 0 : e10.log_level)) && (this.logLevel = e10.logLevel || e10.log_level, g2.params = Object.assign(Object.assign({}, g2.params), { log_level: this.logLevel })), this.worker && (this.workerUrl = null == e10 ? void 0 : e10.workerUrl, g2.autoSendHeartbeat = !this.worker), g2;
        }
        async _reconnectAuth() {
          await this._waitForAuthIfNeeded(), this.isConnected() || this.connect();
        }
      }
      var sb = class extends Error {
        constructor(e10, t10) {
          super(e10), this.name = "IcebergError", this.status = t10.status, this.icebergType = t10.icebergType, this.icebergCode = t10.icebergCode, this.details = t10.details, this.isCommitStateUnknown = "CommitStateUnknownException" === t10.icebergType || [500, 502, 504].includes(t10.status) && t10.icebergType?.includes("CommitState") === true;
        }
        isNotFound() {
          return 404 === this.status;
        }
        isConflict() {
          return 409 === this.status;
        }
        isAuthenticationTimeout() {
          return 419 === this.status;
        }
      };
      async function sw(e10) {
        return e10 && "none" !== e10.type ? "bearer" === e10.type ? { Authorization: `Bearer ${e10.token}` } : "header" === e10.type ? { [e10.name]: e10.value } : "custom" === e10.type ? await e10.getHeaders() : {} : {};
      }
      function sv(e10) {
        return e10.join("");
      }
      var sE = class {
        constructor(e10, t10 = "") {
          this.client = e10, this.prefix = t10;
        }
        async listNamespaces(e10) {
          let t10 = e10 ? { parent: sv(e10.namespace) } : void 0;
          return (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces`, query: t10 })).data.namespaces.map((e11) => ({ namespace: e11 }));
        }
        async createNamespace(e10, t10) {
          let r10 = { namespace: e10.namespace, properties: t10?.properties };
          return (await this.client.request({ method: "POST", path: `${this.prefix}/namespaces`, body: r10 })).data;
        }
        async dropNamespace(e10) {
          await this.client.request({ method: "DELETE", path: `${this.prefix}/namespaces/${sv(e10.namespace)}` });
        }
        async loadNamespaceMetadata(e10) {
          return { properties: (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${sv(e10.namespace)}` })).data.properties };
        }
        async namespaceExists(e10) {
          try {
            return await this.client.request({ method: "HEAD", path: `${this.prefix}/namespaces/${sv(e10.namespace)}` }), true;
          } catch (e11) {
            if (e11 instanceof sb && 404 === e11.status) return false;
            throw e11;
          }
        }
        async createNamespaceIfNotExists(e10, t10) {
          try {
            return await this.createNamespace(e10, t10);
          } catch (e11) {
            if (e11 instanceof sb && 409 === e11.status) return;
            throw e11;
          }
        }
      };
      function sS(e10) {
        return e10.join("");
      }
      var sk = class {
        constructor(e10, t10 = "", r10) {
          this.client = e10, this.prefix = t10, this.accessDelegation = r10;
        }
        async listTables(e10) {
          return (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${sS(e10.namespace)}/tables` })).data.identifiers;
        }
        async createTable(e10, t10) {
          let r10 = {};
          return this.accessDelegation && (r10["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({ method: "POST", path: `${this.prefix}/namespaces/${sS(e10.namespace)}/tables`, body: t10, headers: r10 })).data.metadata;
        }
        async updateTable(e10, t10) {
          let r10 = await this.client.request({ method: "POST", path: `${this.prefix}/namespaces/${sS(e10.namespace)}/tables/${e10.name}`, body: t10 });
          return { "metadata-location": r10.data["metadata-location"], metadata: r10.data.metadata };
        }
        async dropTable(e10, t10) {
          await this.client.request({ method: "DELETE", path: `${this.prefix}/namespaces/${sS(e10.namespace)}/tables/${e10.name}`, query: { purgeRequested: String(t10?.purge ?? false) } });
        }
        async loadTable(e10) {
          let t10 = {};
          return this.accessDelegation && (t10["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${sS(e10.namespace)}/tables/${e10.name}`, headers: t10 })).data.metadata;
        }
        async tableExists(e10) {
          let t10 = {};
          this.accessDelegation && (t10["X-Iceberg-Access-Delegation"] = this.accessDelegation);
          try {
            return await this.client.request({ method: "HEAD", path: `${this.prefix}/namespaces/${sS(e10.namespace)}/tables/${e10.name}`, headers: t10 }), true;
          } catch (e11) {
            if (e11 instanceof sb && 404 === e11.status) return false;
            throw e11;
          }
        }
        async createTableIfNotExists(e10, t10) {
          try {
            return await this.createTable(e10, t10);
          } catch (r10) {
            if (r10 instanceof sb && 409 === r10.status) return await this.loadTable({ namespace: e10.namespace, name: t10.name });
            throw r10;
          }
        }
      }, sT = class {
        constructor(e10) {
          let t10 = "v1";
          e10.catalogName && (t10 += `/${e10.catalogName}`);
          const r10 = e10.baseUrl.endsWith("/") ? e10.baseUrl : `${e10.baseUrl}/`;
          this.client = function(e11) {
            let t11 = e11.fetchImpl ?? globalThis.fetch;
            return { async request({ method: r11, path: n10, query: s10, body: i10, headers: a10 }) {
              let o2 = function(e12, t12, r12) {
                let n11 = new URL(t12, e12);
                if (r12) for (let [e13, t13] of Object.entries(r12)) void 0 !== t13 && n11.searchParams.set(e13, t13);
                return n11.toString();
              }(e11.baseUrl, n10, s10), l2 = await sw(e11.auth), u2 = await t11(o2, { method: r11, headers: { ...i10 ? { "Content-Type": "application/json" } : {}, ...l2, ...a10 }, body: i10 ? JSON.stringify(i10) : void 0 }), c2 = await u2.text(), d2 = (u2.headers.get("content-type") || "").includes("application/json"), h2 = d2 && c2 ? JSON.parse(c2) : c2;
              if (!u2.ok) {
                let e12 = d2 ? h2 : void 0, t12 = e12?.error;
                throw new sb(t12?.message ?? `Request failed with status ${u2.status}`, { status: u2.status, icebergType: t12?.type, icebergCode: t12?.code, details: e12 });
              }
              return { status: u2.status, headers: u2.headers, data: h2 };
            } };
          }({ baseUrl: r10, auth: e10.auth, fetchImpl: e10.fetch }), this.accessDelegation = e10.accessDelegation?.join(","), this.namespaceOps = new sE(this.client, t10), this.tableOps = new sk(this.client, t10, this.accessDelegation);
        }
        async listNamespaces(e10) {
          return this.namespaceOps.listNamespaces(e10);
        }
        async createNamespace(e10, t10) {
          return this.namespaceOps.createNamespace(e10, t10);
        }
        async dropNamespace(e10) {
          await this.namespaceOps.dropNamespace(e10);
        }
        async loadNamespaceMetadata(e10) {
          return this.namespaceOps.loadNamespaceMetadata(e10);
        }
        async listTables(e10) {
          return this.tableOps.listTables(e10);
        }
        async createTable(e10, t10) {
          return this.tableOps.createTable(e10, t10);
        }
        async updateTable(e10, t10) {
          return this.tableOps.updateTable(e10, t10);
        }
        async dropTable(e10, t10) {
          await this.tableOps.dropTable(e10, t10);
        }
        async loadTable(e10) {
          return this.tableOps.loadTable(e10);
        }
        async namespaceExists(e10) {
          return this.namespaceOps.namespaceExists(e10);
        }
        async tableExists(e10) {
          return this.tableOps.tableExists(e10);
        }
        async createNamespaceIfNotExists(e10, t10) {
          return this.namespaceOps.createNamespaceIfNotExists(e10, t10);
        }
        async createTableIfNotExists(e10, t10) {
          return this.tableOps.createTableIfNotExists(e10, t10);
        }
      };
      function sR(e10) {
        return (sR = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e11) {
          return typeof e11;
        } : function(e11) {
          return e11 && "function" == typeof Symbol && e11.constructor === Symbol && e11 !== Symbol.prototype ? "symbol" : typeof e11;
        })(e10);
      }
      function sO(e10, t10) {
        var r10 = Object.keys(e10);
        if (Object.getOwnPropertySymbols) {
          var n10 = Object.getOwnPropertySymbols(e10);
          t10 && (n10 = n10.filter(function(t11) {
            return Object.getOwnPropertyDescriptor(e10, t11).enumerable;
          })), r10.push.apply(r10, n10);
        }
        return r10;
      }
      function sC(e10) {
        for (var t10 = 1; t10 < arguments.length; t10++) {
          var r10 = null != arguments[t10] ? arguments[t10] : {};
          t10 % 2 ? sO(Object(r10), true).forEach(function(t11) {
            !function(e11, t12, r11) {
              var n10;
              (n10 = function(e12, t13) {
                if ("object" != sR(e12) || !e12) return e12;
                var r12 = e12[Symbol.toPrimitive];
                if (void 0 !== r12) {
                  var n11 = r12.call(e12, t13 || "default");
                  if ("object" != sR(n11)) return n11;
                  throw TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === t13 ? String : Number)(e12);
              }(t12, "string"), (t12 = "symbol" == sR(n10) ? n10 : n10 + "") in e11) ? Object.defineProperty(e11, t12, { value: r11, enumerable: true, configurable: true, writable: true }) : e11[t12] = r11;
            }(e10, t11, r10[t11]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e10, Object.getOwnPropertyDescriptors(r10)) : sO(Object(r10)).forEach(function(t11) {
            Object.defineProperty(e10, t11, Object.getOwnPropertyDescriptor(r10, t11));
          });
        }
        return e10;
      }
      var sx = class extends Error {
        constructor(e10, t10 = "storage", r10, n10) {
          super(e10), this.__isStorageError = true, this.namespace = t10, this.name = "vectors" === t10 ? "StorageVectorsError" : "StorageError", this.status = r10, this.statusCode = n10;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, statusCode: this.statusCode };
        }
      };
      function sP(e10) {
        return "object" == typeof e10 && null !== e10 && "__isStorageError" in e10;
      }
      var sA = class extends sx {
        constructor(e10, t10, r10, n10 = "storage", s10) {
          super(e10, n10, t10, r10), this.name = "vectors" === n10 ? "StorageVectorsApiError" : "StorageApiError", this.status = t10, this.statusCode = r10, this.code = s10;
        }
        toJSON() {
          return sC(sC({}, super.toJSON()), {}, { code: this.code });
        }
      }, sI = class extends sx {
        constructor(e10, t10, r10 = "storage") {
          super(e10, r10), this.name = "vectors" === r10 ? "StorageVectorsUnknownError" : "StorageUnknownError", this.originalError = t10;
        }
      };
      function sN(e10, t10, r10) {
        let n10 = sC({}, e10), s10 = t10.toLowerCase();
        for (let e11 of Object.keys(n10)) e11.toLowerCase() === s10 && delete n10[e11];
        return n10[s10] = r10, n10;
      }
      let sj = (e10) => {
        if (Array.isArray(e10)) return e10.map((e11) => sj(e11));
        if ("function" == typeof e10 || e10 !== Object(e10)) return e10;
        let t10 = {};
        return Object.entries(e10).forEach(([e11, r10]) => {
          t10[e11.replace(/([-_][a-z])/gi, (e12) => e12.toUpperCase().replace(/[-_]/g, ""))] = sj(r10);
        }), t10;
      }, sL = (e10) => e10.split("/").map(encodeURIComponent).join("/"), s$ = (e10) => {
        if ("object" == typeof e10 && null !== e10) {
          if ("string" == typeof e10.msg) return e10.msg;
          if ("string" == typeof e10.message) return e10.message;
          if ("string" == typeof e10.error_description) return e10.error_description;
          if ("string" == typeof e10.error) return e10.error;
          if ("object" == typeof e10.error && null !== e10.error) {
            let t10 = e10.error;
            if ("string" == typeof t10.message) return t10.message;
          }
        }
        return JSON.stringify(e10);
      }, sM = async (e10, t10, r10, n10) => {
        if (null !== e10 && "object" == typeof e10 && "json" in e10 && "function" == typeof e10.json) {
          let r11 = parseInt(String(e10.status), 10);
          Number.isFinite(r11) || (r11 = 500), e10.json().then((e11) => {
            let s10 = (null == e11 ? void 0 : e11.statusCode) || (null == e11 ? void 0 : e11.code) || r11 + "";
            t10(new sA(s$(e11), r11, s10, n10, null == e11 ? void 0 : e11.code));
          }).catch(() => {
            let s10 = r11 + "";
            t10(new sA(e10.statusText || `HTTP ${r11} error`, r11, s10, n10));
          });
        } else t10(new sI(s$(e10), e10, n10));
      };
      async function sD(e10, t10, r10, n10, s10, i10, a10) {
        return new Promise((o2, l2) => {
          e10(r10, ((e11, t11, r11, n11) => {
            let s11 = { method: e11, headers: (null == t11 ? void 0 : t11.headers) || {} };
            if ("GET" === e11 || "HEAD" === e11 || !n11) return sC(sC({}, s11), r11);
            if (((e12) => {
              if ("object" != typeof e12 || null === e12) return false;
              let t12 = Object.getPrototypeOf(e12);
              return (null === t12 || t12 === Object.prototype || null === Object.getPrototypeOf(t12)) && !(Symbol.toStringTag in e12) && !(Symbol.iterator in e12);
            })(n11)) {
              var i11;
              let e12, r12 = (null == t11 ? void 0 : t11.headers) || {};
              for (let [t12, n12] of Object.entries(r12)) "content-type" === t12.toLowerCase() && (e12 = n12);
              s11.headers = sN(r12, "Content-Type", null != (i11 = e12) ? i11 : "application/json"), s11.body = JSON.stringify(n11);
            } else s11.body = n11;
            return (null == t11 ? void 0 : t11.duplex) && (s11.duplex = t11.duplex), sC(sC({}, s11), r11);
          })(t10, n10, s10, i10)).then((e11) => {
            if (!e11.ok) throw e11;
            if (null == n10 ? void 0 : n10.noResolveJson) return e11;
            if ("vectors" === a10) {
              let t11 = e11.headers.get("content-type");
              if ("0" === e11.headers.get("content-length") || 204 === e11.status || !t11 || !t11.includes("application/json")) return {};
            }
            return e11.json();
          }).then((e11) => o2(e11)).catch((e11) => sM(e11, l2, n10, a10));
        });
      }
      function sU(e10 = "storage") {
        return { get: async (t10, r10, n10, s10) => sD(t10, "GET", r10, n10, s10, void 0, e10), post: async (t10, r10, n10, s10, i10) => sD(t10, "POST", r10, s10, i10, n10, e10), put: async (t10, r10, n10, s10, i10) => sD(t10, "PUT", r10, s10, i10, n10, e10), head: async (t10, r10, n10, s10) => sD(t10, "HEAD", r10, sC(sC({}, n10), {}, { noResolveJson: true }), s10, void 0, e10), remove: async (t10, r10, n10, s10, i10) => sD(t10, "DELETE", r10, s10, i10, n10, e10) };
      }
      let { get: sq, post: sB, put: sH, head: sG, remove: sF } = sU("storage"), sV = sU("vectors");
      var sz = class {
        constructor(e10, t10 = {}, r10, n10 = "storage") {
          this.shouldThrowOnError = false, this.url = e10, this.headers = function(e11) {
            let t11 = {};
            for (let [r11, n11] of Object.entries(e11)) t11[r11.toLowerCase()] = n11;
            return t11;
          }(t10), this.fetch = /* @__PURE__ */ ((e11) => e11 ? (...t11) => e11(...t11) : (...e12) => fetch(...e12))(r10), this.namespace = n10;
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        setHeader(e10, t10) {
          return this.headers = sN(this.headers, e10, t10), this;
        }
        async handleOperation(e10) {
          try {
            return { data: await e10(), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (sP(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
      };
      s = Symbol.toStringTag;
      var sK = class {
        constructor(e10, t10) {
          this.downloadFn = e10, this.shouldThrowOnError = t10, this[s] = "StreamDownloadBuilder", this.promise = null;
        }
        then(e10, t10) {
          return this.getPromise().then(e10, t10);
        }
        catch(e10) {
          return this.getPromise().catch(e10);
        }
        finally(e10) {
          return this.getPromise().finally(e10);
        }
        getPromise() {
          return this.promise || (this.promise = this.execute()), this.promise;
        }
        async execute() {
          try {
            return { data: (await this.downloadFn()).body, error: null };
          } catch (e10) {
            if (this.shouldThrowOnError) throw e10;
            if (sP(e10)) return { data: null, error: e10 };
            throw e10;
          }
        }
      };
      i = Symbol.toStringTag;
      var sW = class {
        constructor(e10, t10) {
          this.downloadFn = e10, this.shouldThrowOnError = t10, this[i] = "BlobDownloadBuilder", this.promise = null;
        }
        asStream() {
          return new sK(this.downloadFn, this.shouldThrowOnError);
        }
        then(e10, t10) {
          return this.getPromise().then(e10, t10);
        }
        catch(e10) {
          return this.getPromise().catch(e10);
        }
        finally(e10) {
          return this.getPromise().finally(e10);
        }
        getPromise() {
          return this.promise || (this.promise = this.execute()), this.promise;
        }
        async execute() {
          try {
            return { data: await (await this.downloadFn()).blob(), error: null };
          } catch (e10) {
            if (this.shouldThrowOnError) throw e10;
            if (sP(e10)) return { data: null, error: e10 };
            throw e10;
          }
        }
      };
      let sJ = { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } }, sX = { cacheControl: "3600", contentType: "text/plain;charset=UTF-8", upsert: false };
      var sY = class extends sz {
        constructor(e10, t10 = {}, r10, n10) {
          super(e10, t10, n10, "storage"), this.bucketId = r10;
        }
        async uploadOrUpdate(e10, t10, r10, n10) {
          var s10 = this;
          return s10.handleOperation(async () => {
            let i10, a10 = sC(sC({}, sX), n10), o2 = sC(sC({}, s10.headers), "POST" === e10 && { "x-upsert": String(a10.upsert) }), l2 = a10.metadata;
            if ("u" > typeof Blob && r10 instanceof Blob ? ((i10 = new FormData()).append("cacheControl", a10.cacheControl), l2 && i10.append("metadata", s10.encodeMetadata(l2)), i10.append("", r10)) : "u" > typeof FormData && r10 instanceof FormData ? ((i10 = r10).has("cacheControl") || i10.append("cacheControl", a10.cacheControl), l2 && !i10.has("metadata") && i10.append("metadata", s10.encodeMetadata(l2))) : (i10 = r10, o2["cache-control"] = `max-age=${a10.cacheControl}`, o2["content-type"] = a10.contentType, l2 && (o2["x-metadata"] = s10.toBase64(s10.encodeMetadata(l2))), ("u" > typeof ReadableStream && i10 instanceof ReadableStream || i10 && "object" == typeof i10 && "pipe" in i10 && "function" == typeof i10.pipe) && !a10.duplex && (a10.duplex = "half")), null == n10 ? void 0 : n10.headers) for (let [e11, t11] of Object.entries(n10.headers)) o2 = sN(o2, e11, t11);
            let u2 = s10._removeEmptyFolders(t10), c2 = s10._getFinalPath(u2), d2 = await ("PUT" == e10 ? sH : sB)(s10.fetch, `${s10.url}/object/${c2}`, i10, sC({ headers: o2 }, (null == a10 ? void 0 : a10.duplex) ? { duplex: a10.duplex } : {}));
            return { path: u2, id: d2.Id, fullPath: d2.Key };
          });
        }
        async upload(e10, t10, r10) {
          return this.uploadOrUpdate("POST", e10, t10, r10);
        }
        async uploadToSignedUrl(e10, t10, r10, n10) {
          var s10 = this;
          let i10 = s10._removeEmptyFolders(e10), a10 = s10._getFinalPath(i10), o2 = new URL(s10.url + `/object/upload/sign/${a10}`);
          return o2.searchParams.set("token", t10), s10.handleOperation(async () => {
            let e11, t11 = sC(sC({}, sX), n10), a11 = sC(sC({}, s10.headers), { "x-upsert": String(t11.upsert) }), l2 = t11.metadata;
            if ("u" > typeof Blob && r10 instanceof Blob ? ((e11 = new FormData()).append("cacheControl", t11.cacheControl), l2 && e11.append("metadata", s10.encodeMetadata(l2)), e11.append("", r10)) : "u" > typeof FormData && r10 instanceof FormData ? ((e11 = r10).has("cacheControl") || e11.append("cacheControl", t11.cacheControl), l2 && !e11.has("metadata") && e11.append("metadata", s10.encodeMetadata(l2))) : (e11 = r10, a11["cache-control"] = `max-age=${t11.cacheControl}`, a11["content-type"] = t11.contentType, l2 && (a11["x-metadata"] = s10.toBase64(s10.encodeMetadata(l2))), ("u" > typeof ReadableStream && e11 instanceof ReadableStream || e11 && "object" == typeof e11 && "pipe" in e11 && "function" == typeof e11.pipe) && !t11.duplex && (t11.duplex = "half")), null == n10 ? void 0 : n10.headers) for (let [e12, t12] of Object.entries(n10.headers)) a11 = sN(a11, e12, t12);
            return { path: i10, fullPath: (await sH(s10.fetch, o2.toString(), e11, sC({ headers: a11 }, (null == t11 ? void 0 : t11.duplex) ? { duplex: t11.duplex } : {}))).Key };
          });
        }
        async createSignedUploadUrl(e10, t10) {
          var r10 = this;
          return r10.handleOperation(async () => {
            let n10 = r10._getFinalPath(e10), s10 = sC({}, r10.headers);
            (null == t10 ? void 0 : t10.upsert) && (s10["x-upsert"] = "true");
            let i10 = await sB(r10.fetch, `${r10.url}/object/upload/sign/${n10}`, {}, { headers: s10 }), a10 = new URL(r10.url + i10.url), o2 = a10.searchParams.get("token");
            if (!o2) throw new sx("No token returned by API");
            return { signedUrl: a10.toString(), path: e10, token: o2 };
          });
        }
        async update(e10, t10, r10) {
          return this.uploadOrUpdate("PUT", e10, t10, r10);
        }
        async move(e10, t10, r10) {
          var n10 = this;
          return n10.handleOperation(async () => await sB(n10.fetch, `${n10.url}/object/move`, { bucketId: n10.bucketId, sourceKey: e10, destinationKey: t10, destinationBucket: null == r10 ? void 0 : r10.destinationBucket }, { headers: n10.headers }));
        }
        async copy(e10, t10, r10) {
          var n10 = this;
          return n10.handleOperation(async () => ({ path: (await sB(n10.fetch, `${n10.url}/object/copy`, { bucketId: n10.bucketId, sourceKey: e10, destinationKey: t10, destinationBucket: null == r10 ? void 0 : r10.destinationBucket }, { headers: n10.headers })).Key }));
        }
        async createSignedUrl(e10, t10, r10) {
          var n10 = this;
          return n10.handleOperation(async () => {
            let s10 = n10._getFinalPath(e10), i10 = "object" == typeof (null == r10 ? void 0 : r10.transform) && null !== r10.transform && Object.keys(r10.transform).length > 0, a10 = await sB(n10.fetch, `${n10.url}/object/sign/${s10}`, sC({ expiresIn: t10 }, i10 ? { transform: r10.transform } : {}), { headers: n10.headers }), o2 = new URLSearchParams();
            (null == r10 ? void 0 : r10.download) && o2.set("download", true === r10.download ? "" : r10.download), (null == r10 ? void 0 : r10.cacheNonce) != null && o2.set("cacheNonce", String(r10.cacheNonce));
            let l2 = o2.toString();
            return { signedUrl: encodeURI(`${n10.url}${a10.signedURL}${l2 ? `&${l2}` : ""}`) };
          });
        }
        async createSignedUrls(e10, t10, r10) {
          var n10 = this;
          return n10.handleOperation(async () => {
            let s10 = await sB(n10.fetch, `${n10.url}/object/sign/${n10.bucketId}`, { expiresIn: t10, paths: e10 }, { headers: n10.headers }), i10 = new URLSearchParams();
            (null == r10 ? void 0 : r10.download) && i10.set("download", true === r10.download ? "" : r10.download), (null == r10 ? void 0 : r10.cacheNonce) != null && i10.set("cacheNonce", String(r10.cacheNonce));
            let a10 = i10.toString();
            return s10.map((e11) => sC(sC({}, e11), {}, { signedUrl: e11.signedURL ? encodeURI(`${n10.url}${e11.signedURL}${a10 ? `&${a10}` : ""}`) : null }));
          });
        }
        download(e10, t10, r10) {
          let n10 = "object" == typeof (null == t10 ? void 0 : t10.transform) && null !== t10.transform && Object.keys(t10.transform).length > 0 ? "render/image/authenticated" : "object", s10 = new URLSearchParams();
          (null == t10 ? void 0 : t10.transform) && this.applyTransformOptsToQuery(s10, t10.transform), (null == t10 ? void 0 : t10.cacheNonce) != null && s10.set("cacheNonce", String(t10.cacheNonce));
          let i10 = s10.toString(), a10 = this._getFinalPath(e10);
          return new sW(() => sq(this.fetch, `${this.url}/${n10}/${a10}${i10 ? `?${i10}` : ""}`, { headers: this.headers, noResolveJson: true }, r10), this.shouldThrowOnError);
        }
        async info(e10) {
          var t10 = this;
          let r10 = t10._getFinalPath(e10);
          return t10.handleOperation(async () => sj(await sq(t10.fetch, `${t10.url}/object/info/${r10}`, { headers: t10.headers })));
        }
        async exists(e10) {
          var t10;
          let r10 = this._getFinalPath(e10);
          try {
            return await sG(this.fetch, `${this.url}/object/${r10}`, { headers: this.headers }), { data: true, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (sP(e11)) {
              let r11 = e11 instanceof sA ? e11.status : e11 instanceof sI ? null == (t10 = e11.originalError) ? void 0 : t10.status : void 0;
              if (void 0 !== r11 && [400, 404].includes(r11)) return { data: false, error: e11 };
            }
            throw e11;
          }
        }
        getPublicUrl(e10, t10) {
          let r10 = this._getFinalPath(e10), n10 = new URLSearchParams();
          (null == t10 ? void 0 : t10.download) && n10.set("download", true === t10.download ? "" : t10.download), (null == t10 ? void 0 : t10.transform) && this.applyTransformOptsToQuery(n10, t10.transform), (null == t10 ? void 0 : t10.cacheNonce) != null && n10.set("cacheNonce", String(t10.cacheNonce));
          let s10 = n10.toString(), i10 = "object" == typeof (null == t10 ? void 0 : t10.transform) && null !== t10.transform && Object.keys(t10.transform).length > 0 ? "render/image" : "object";
          return { data: { publicUrl: encodeURI(`${this.url}/${i10}/public/${r10}`) + (s10 ? `?${s10}` : "") } };
        }
        async remove(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await sF(t10.fetch, `${t10.url}/object/${t10.bucketId}`, { prefixes: e10 }, { headers: t10.headers }));
        }
        async purgeCache(e10, t10, r10) {
          var n10 = this;
          return n10.handleOperation(async () => {
            let s10 = sL(n10._getFinalPath(e10)), i10 = new URLSearchParams();
            (null == t10 ? void 0 : t10.transformations) && i10.set("transformations", "true");
            let a10 = i10.toString();
            return await sF(n10.fetch, `${n10.url}/cdn/${s10}${a10 ? `?${a10}` : ""}`, {}, { headers: n10.headers }, r10);
          });
        }
        async list(e10, t10, r10) {
          var n10 = this;
          return n10.handleOperation(async () => {
            let s10 = (null == t10 ? void 0 : t10.sortBy) ? sC(sC({}, sJ.sortBy), t10.sortBy) : sJ.sortBy, i10 = sC(sC(sC({}, sJ), t10), {}, { sortBy: s10, prefix: e10 || "" });
            return await sB(n10.fetch, `${n10.url}/object/list/${n10.bucketId}`, i10, { headers: n10.headers }, r10);
          });
        }
        async listV2(e10, t10) {
          var r10 = this;
          return r10.handleOperation(async () => {
            let n10 = sC({}, e10);
            return await sB(r10.fetch, `${r10.url}/object/list-v2/${r10.bucketId}`, n10, { headers: r10.headers }, t10);
          });
        }
        encodeMetadata(e10) {
          return JSON.stringify(e10);
        }
        toBase64(e10) {
          return void 0 !== tO.Buffer ? tO.Buffer.from(e10).toString("base64") : btoa(e10);
        }
        _getFinalPath(e10) {
          return `${this.bucketId}/${e10.replace(/^\/+/, "")}`;
        }
        _removeEmptyFolders(e10) {
          return e10.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
        }
        applyTransformOptsToQuery(e10, t10) {
          return t10.width && e10.set("width", t10.width.toString()), t10.height && e10.set("height", t10.height.toString()), t10.resize && e10.set("resize", t10.resize), t10.format && e10.set("format", t10.format), t10.quality && e10.set("quality", t10.quality.toString()), e10;
        }
      };
      let sZ = { "X-Client-Info": "storage-js/2.112.2" };
      var sQ = class extends sz {
        constructor(e10, t10 = {}, r10, n10) {
          const s10 = new URL(e10);
          (null == n10 ? void 0 : n10.useNewHostname) && /supabase\.(co|in|red)$/.test(s10.hostname) && !s10.hostname.includes("storage.supabase.") && (s10.hostname = s10.hostname.replace("supabase.", "storage.supabase.")), super(s10.href.replace(/\/$/, ""), sC(sC({}, sZ), t10), r10, "storage");
        }
        async listBuckets(e10) {
          var t10 = this;
          return t10.handleOperation(async () => {
            let r10 = t10.listBucketOptionsToQueryString(e10);
            return await sq(t10.fetch, `${t10.url}/bucket${r10}`, { headers: t10.headers });
          });
        }
        async getBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await sq(t10.fetch, `${t10.url}/bucket/${e10}`, { headers: t10.headers }));
        }
        async createBucket(e10, t10 = { public: false }) {
          var r10 = this;
          return r10.handleOperation(async () => await sB(r10.fetch, `${r10.url}/bucket`, { id: e10, name: e10, type: t10.type, public: t10.public, file_size_limit: t10.fileSizeLimit, allowed_mime_types: t10.allowedMimeTypes }, { headers: r10.headers }));
        }
        async updateBucket(e10, t10) {
          var r10 = this;
          return r10.handleOperation(async () => await sH(r10.fetch, `${r10.url}/bucket/${e10}`, { id: e10, name: e10, public: t10.public, file_size_limit: t10.fileSizeLimit, allowed_mime_types: t10.allowedMimeTypes }, { headers: r10.headers }));
        }
        async emptyBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await sB(t10.fetch, `${t10.url}/bucket/${e10}/empty`, {}, { headers: t10.headers }));
        }
        async deleteBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await sF(t10.fetch, `${t10.url}/bucket/${e10}`, {}, { headers: t10.headers }));
        }
        async purgeBucketCache(e10, t10, r10) {
          var n10 = this;
          return n10.handleOperation(async () => {
            let s10 = new URLSearchParams();
            (null == t10 ? void 0 : t10.transformations) && s10.set("transformations", "true");
            let i10 = s10.toString();
            return await sF(n10.fetch, `${n10.url}/cdn/${sL(e10)}${i10 ? `?${i10}` : ""}`, {}, { headers: n10.headers }, r10);
          });
        }
        listBucketOptionsToQueryString(e10) {
          let t10 = {};
          return e10 && ("limit" in e10 && (t10.limit = String(e10.limit)), "offset" in e10 && (t10.offset = String(e10.offset)), e10.search && (t10.search = e10.search), e10.sortColumn && (t10.sortColumn = e10.sortColumn), e10.sortOrder && (t10.sortOrder = e10.sortOrder)), Object.keys(t10).length > 0 ? "?" + new URLSearchParams(t10).toString() : "";
        }
      }, s0 = class extends sz {
        constructor(e10, t10 = {}, r10) {
          super(e10.replace(/\/$/, ""), sC(sC({}, sZ), t10), r10, "storage");
        }
        async createBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await sB(t10.fetch, `${t10.url}/bucket`, { name: e10 }, { headers: t10.headers }));
        }
        async listBuckets(e10) {
          var t10 = this;
          return t10.handleOperation(async () => {
            let r10 = new URLSearchParams();
            (null == e10 ? void 0 : e10.limit) !== void 0 && r10.set("limit", e10.limit.toString()), (null == e10 ? void 0 : e10.offset) !== void 0 && r10.set("offset", e10.offset.toString()), (null == e10 ? void 0 : e10.sortColumn) && r10.set("sortColumn", e10.sortColumn), (null == e10 ? void 0 : e10.sortOrder) && r10.set("sortOrder", e10.sortOrder), (null == e10 ? void 0 : e10.search) && r10.set("search", e10.search);
            let n10 = r10.toString(), s10 = n10 ? `${t10.url}/bucket?${n10}` : `${t10.url}/bucket`;
            return await sq(t10.fetch, s10, { headers: t10.headers });
          });
        }
        async deleteBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await sF(t10.fetch, `${t10.url}/bucket/${e10}`, {}, { headers: t10.headers }));
        }
        from(e10) {
          var t10 = this;
          if (!(!(!e10 || "string" != typeof e10 || 0 === e10.length || e10.length > 100 || e10.trim() !== e10 || e10.includes("/") || e10.includes("\\")) && /^[\w!.\*'() &$@=;:+,?-]+$/.test(e10))) throw new sx("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");
          let r10 = new sT({ baseUrl: this.url, catalogName: e10, auth: { type: "custom", getHeaders: async () => t10.headers }, fetch: this.fetch }), n10 = this.shouldThrowOnError;
          return new Proxy(r10, { get(e11, t11) {
            let r11 = e11[t11];
            return "function" != typeof r11 ? r11 : async (...t12) => {
              try {
                return { data: await r11.apply(e11, t12), error: null };
              } catch (e12) {
                if (n10) throw e12;
                return { data: null, error: e12 };
              }
            };
          } });
        }
      }, s1 = class extends sz {
        constructor(e10, t10 = {}, r10) {
          super(e10.replace(/\/$/, ""), sC(sC({}, sZ), {}, { "Content-Type": "application/json" }, t10), r10, "vectors");
        }
        async createIndex(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await sV.post(t10.fetch, `${t10.url}/CreateIndex`, e10, { headers: t10.headers }) || {});
        }
        async getIndex(e10, t10) {
          var r10 = this;
          return r10.handleOperation(async () => await sV.post(r10.fetch, `${r10.url}/GetIndex`, { vectorBucketName: e10, indexName: t10 }, { headers: r10.headers }));
        }
        async listIndexes(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await sV.post(t10.fetch, `${t10.url}/ListIndexes`, e10, { headers: t10.headers }));
        }
        async deleteIndex(e10, t10) {
          var r10 = this;
          return r10.handleOperation(async () => await sV.post(r10.fetch, `${r10.url}/DeleteIndex`, { vectorBucketName: e10, indexName: t10 }, { headers: r10.headers }) || {});
        }
      }, s2 = class extends sz {
        constructor(e10, t10 = {}, r10) {
          super(e10.replace(/\/$/, ""), sC(sC({}, sZ), {}, { "Content-Type": "application/json" }, t10), r10, "vectors");
        }
        async putVectors(e10) {
          var t10 = this;
          if (e10.vectors.length < 1 || e10.vectors.length > 500) throw Error("Vector batch size must be between 1 and 500 items");
          return t10.handleOperation(async () => await sV.post(t10.fetch, `${t10.url}/PutVectors`, e10, { headers: t10.headers }) || {});
        }
        async getVectors(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await sV.post(t10.fetch, `${t10.url}/GetVectors`, e10, { headers: t10.headers }));
        }
        async listVectors(e10) {
          var t10 = this;
          if (void 0 !== e10.segmentCount) {
            if (e10.segmentCount < 1 || e10.segmentCount > 16) throw Error("segmentCount must be between 1 and 16");
            if (void 0 !== e10.segmentIndex && (e10.segmentIndex < 0 || e10.segmentIndex >= e10.segmentCount)) throw Error(`segmentIndex must be between 0 and ${e10.segmentCount - 1}`);
          }
          return t10.handleOperation(async () => await sV.post(t10.fetch, `${t10.url}/ListVectors`, e10, { headers: t10.headers }));
        }
        async queryVectors(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await sV.post(t10.fetch, `${t10.url}/QueryVectors`, e10, { headers: t10.headers }));
        }
        async deleteVectors(e10) {
          var t10 = this;
          if (e10.keys.length < 1 || e10.keys.length > 500) throw Error("Keys batch size must be between 1 and 500 items");
          return t10.handleOperation(async () => await sV.post(t10.fetch, `${t10.url}/DeleteVectors`, e10, { headers: t10.headers }) || {});
        }
      }, s3 = class extends sz {
        constructor(e10, t10 = {}, r10) {
          super(e10.replace(/\/$/, ""), sC(sC({}, sZ), {}, { "Content-Type": "application/json" }, t10), r10, "vectors");
        }
        async createBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await sV.post(t10.fetch, `${t10.url}/CreateVectorBucket`, { vectorBucketName: e10 }, { headers: t10.headers }) || {});
        }
        async getBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await sV.post(t10.fetch, `${t10.url}/GetVectorBucket`, { vectorBucketName: e10 }, { headers: t10.headers }));
        }
        async listBuckets(e10 = {}) {
          var t10 = this;
          return t10.handleOperation(async () => await sV.post(t10.fetch, `${t10.url}/ListVectorBuckets`, e10, { headers: t10.headers }));
        }
        async deleteBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await sV.post(t10.fetch, `${t10.url}/DeleteVectorBucket`, { vectorBucketName: e10 }, { headers: t10.headers }) || {});
        }
      }, s4 = class extends s3 {
        constructor(e10, t10 = {}) {
          super(e10, t10.headers || {}, t10.fetch);
        }
        from(e10) {
          return new s5(this.url, this.headers, e10, this.fetch);
        }
        async createBucket(e10) {
          return super.createBucket.call(this, e10);
        }
        async getBucket(e10) {
          return super.getBucket.call(this, e10);
        }
        async listBuckets(e10 = {}) {
          return super.listBuckets.call(this, e10);
        }
        async deleteBucket(e10) {
          return super.deleteBucket.call(this, e10);
        }
      }, s5 = class extends s1 {
        constructor(e10, t10, r10, n10) {
          super(e10, t10, n10), this.vectorBucketName = r10;
        }
        async createIndex(e10) {
          return super.createIndex.call(this, sC(sC({}, e10), {}, { vectorBucketName: this.vectorBucketName }));
        }
        async listIndexes(e10 = {}) {
          return super.listIndexes.call(this, sC(sC({}, e10), {}, { vectorBucketName: this.vectorBucketName }));
        }
        async getIndex(e10) {
          return super.getIndex.call(this, this.vectorBucketName, e10);
        }
        async deleteIndex(e10) {
          return super.deleteIndex.call(this, this.vectorBucketName, e10);
        }
        index(e10) {
          return new s6(this.url, this.headers, this.vectorBucketName, e10, this.fetch);
        }
      }, s6 = class extends s2 {
        constructor(e10, t10, r10, n10, s10) {
          super(e10, t10, s10), this.vectorBucketName = r10, this.indexName = n10;
        }
        async putVectors(e10) {
          return super.putVectors.call(this, sC(sC({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async getVectors(e10) {
          return super.getVectors.call(this, sC(sC({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async listVectors(e10 = {}) {
          return super.listVectors.call(this, sC(sC({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async queryVectors(e10) {
          return super.queryVectors.call(this, sC(sC({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async deleteVectors(e10) {
          return super.deleteVectors.call(this, sC(sC({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
      }, s8 = class extends sQ {
        constructor(e10, t10 = {}, r10, n10) {
          super(e10, t10, r10, n10);
        }
        from(e10) {
          return new sY(this.url, this.headers, e10, this.fetch);
        }
        get vectors() {
          return new s4(this.url + "/vector", { headers: this.headers, fetch: this.fetch });
        }
        get analytics() {
          return new s0(this.url + "/iceberg", this.headers, this.fetch);
        }
      };
      let s9 = "2.112.2", s7 = { "X-Client-Info": `gotrue-js/${s9}` }, ie = "X-Supabase-Api-Version", it = { "2024-01-01": { timestamp: Date.parse("2024-01-01T00:00:00.0Z"), name: "2024-01-01" } }, ir = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i, is = "sb_flow_id";
      class ii extends Error {
        constructor(e10, t10, r10) {
          super(e10), this.__isAuthError = true, this.name = "AuthError", this.status = t10, this.code = r10;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, code: this.code };
        }
      }
      function ia(e10) {
        return "object" == typeof e10 && null !== e10 && "__isAuthError" in e10;
      }
      class io extends ii {
        constructor(e10, t10, r10) {
          super(e10, t10, r10), this.name = "AuthApiError", this.status = t10, this.code = r10;
        }
      }
      function il(e10) {
        return ia(e10) && "AuthApiError" === e10.name;
      }
      class iu extends ii {
        constructor(e10, t10) {
          super(e10), this.name = "AuthUnknownError", this.originalError = t10;
        }
      }
      class ic extends ii {
        constructor(e10, t10, r10, n10) {
          super(e10, r10, n10), this.name = t10, this.status = r10;
        }
      }
      class id extends ic {
        constructor() {
          super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
        }
      }
      function ih(e10) {
        return ia(e10) && "AuthSessionMissingError" === e10.name;
      }
      class ip extends ic {
        constructor() {
          super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
        }
      }
      class ig extends ic {
        constructor(e10) {
          super(e10, "AuthInvalidCredentialsError", 400, void 0);
        }
      }
      class im extends ic {
        constructor(e10, t10 = null) {
          super(e10, "AuthImplicitGrantRedirectError", 500, void 0), this.details = null, this.details = t10;
        }
        toJSON() {
          return Object.assign(Object.assign({}, super.toJSON()), { details: this.details });
        }
      }
      class i_ extends ic {
        constructor() {
          super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.", "AuthPKCECodeVerifierMissingError", 400, "pkce_code_verifier_not_found");
        }
      }
      class iy extends ic {
        constructor(e10, t10) {
          super(e10, "AuthRetryableFetchError", t10, void 0);
        }
      }
      function ib(e10) {
        return ia(e10) && "AuthRetryableFetchError" === e10.name;
      }
      class iw extends ic {
        constructor(e10 = "Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)") {
          super(e10, "AuthRefreshDiscardedError", 409, void 0);
        }
      }
      class iv extends ic {
        constructor(e10, t10, r10) {
          super(e10, "AuthWeakPasswordError", t10, "weak_password"), this.reasons = r10;
        }
        toJSON() {
          return Object.assign(Object.assign({}, super.toJSON()), { reasons: this.reasons });
        }
      }
      class iE extends ic {
        constructor(e10) {
          super(e10, "AuthInvalidJwtError", 400, "invalid_jwt");
        }
      }
      let iS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), ik = " 	\n\r=".split(""), iT = (() => {
        let e10 = Array(128);
        for (let t10 = 0; t10 < e10.length; t10 += 1) e10[t10] = -1;
        for (let t10 = 0; t10 < ik.length; t10 += 1) e10[ik[t10].charCodeAt(0)] = -2;
        for (let t10 = 0; t10 < iS.length; t10 += 1) e10[iS[t10].charCodeAt(0)] = t10;
        return e10;
      })();
      function iR(e10, t10, r10) {
        if (null !== e10) for (t10.queue = t10.queue << 8 | e10, t10.queuedBits += 8; t10.queuedBits >= 6; ) r10(iS[t10.queue >> t10.queuedBits - 6 & 63]), t10.queuedBits -= 6;
        else if (t10.queuedBits > 0) for (t10.queue = t10.queue << 6 - t10.queuedBits, t10.queuedBits = 6; t10.queuedBits >= 6; ) r10(iS[t10.queue >> t10.queuedBits - 6 & 63]), t10.queuedBits -= 6;
      }
      function iO(e10, t10, r10) {
        let n10 = iT[e10];
        if (n10 > -1) for (t10.queue = t10.queue << 6 | n10, t10.queuedBits += 6; t10.queuedBits >= 8; ) r10(t10.queue >> t10.queuedBits - 8 & 255), t10.queuedBits -= 8;
        else if (-2 === n10) return;
        else throw Error(`Invalid Base64-URL character "${String.fromCharCode(e10)}"`);
      }
      function iC(e10) {
        let t10 = [], r10 = (e11) => {
          t10.push(String.fromCodePoint(e11));
        }, n10 = { utf8seq: 0, codepoint: 0 }, s10 = { queue: 0, queuedBits: 0 }, i10 = (e11) => {
          !function(e12, t11, r11) {
            if (0 === t11.utf8seq) {
              if (e12 <= 127) return r11(e12);
              for (let r12 = 1; r12 < 6; r12 += 1) if ((e12 >> 7 - r12 & 1) == 0) {
                t11.utf8seq = r12;
                break;
              }
              if (2 === t11.utf8seq) t11.codepoint = 31 & e12;
              else if (3 === t11.utf8seq) t11.codepoint = 15 & e12;
              else if (4 === t11.utf8seq) t11.codepoint = 7 & e12;
              else throw Error("Invalid UTF-8 sequence");
              t11.utf8seq -= 1;
            } else if (t11.utf8seq > 0) {
              if (e12 <= 127) throw Error("Invalid UTF-8 sequence");
              t11.codepoint = t11.codepoint << 6 | 63 & e12, t11.utf8seq -= 1, 0 === t11.utf8seq && r11(t11.codepoint);
            }
          }(e11, n10, r10);
        };
        for (let t11 = 0; t11 < e10.length; t11 += 1) iO(e10.charCodeAt(t11), s10, i10);
        return t10.join("");
      }
      function ix(e10) {
        let t10 = [], r10 = { queue: 0, queuedBits: 0 }, n10 = (e11) => {
          t10.push(e11);
        };
        for (let t11 = 0; t11 < e10.length; t11 += 1) iO(e10.charCodeAt(t11), r10, n10);
        return new Uint8Array(t10);
      }
      function iP(e10) {
        let t10 = [], r10 = { queue: 0, queuedBits: 0 }, n10 = (e11) => {
          t10.push(e11);
        };
        return e10.forEach((e11) => iR(e11, r10, n10)), iR(null, r10, n10), t10.join("");
      }
      let iA = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11), iI = async (e10, t10, r10) => {
        await e10.setItem(t10, JSON.stringify(r10));
      }, iN = async (e10, t10) => {
        let r10 = await e10.getItem(t10);
        if (!r10) return null;
        try {
          return JSON.parse(r10);
        } catch (e11) {
          return null;
        }
      }, ij = async (e10, t10) => {
        await e10.removeItem(t10);
      };
      class iL {
        constructor() {
          this.promise = new iL.promiseConstructor((e10, t10) => {
            this.resolve = e10, this.reject = t10;
          });
        }
      }
      function i$(e10) {
        let t10 = e10.split(".");
        if (3 !== t10.length) throw new iE("Invalid JWT structure");
        for (let e11 = 0; e11 < t10.length; e11++) if (!ir.test(t10[e11])) throw new iE("JWT not in base64url format");
        return { header: JSON.parse(iC(t10[0])), payload: JSON.parse(iC(t10[1])), signature: ix(t10[2]), raw: { header: t10[0], payload: t10[1] } };
      }
      async function iM(e10) {
        return await new Promise((t10) => {
          setTimeout(() => t10(null), e10);
        });
      }
      function iD(e10) {
        return ("0" + e10.toString(16)).substr(-2);
      }
      async function iU(e10) {
        let t10 = new TextEncoder().encode(e10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t10))).map((e11) => String.fromCharCode(e11)).join("");
      }
      async function iq(e10) {
        return "u" > typeof crypto && void 0 !== crypto.subtle && "u" > typeof TextEncoder ? btoa(await iU(e10)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : (console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), e10);
      }
      iL.promiseConstructor = Promise;
      let iB = /^[a-zA-Z0-9_-]{8,64}$/;
      function iH(e10) {
        return "string" == typeof e10 && iB.test(e10) ? e10 : null;
      }
      let iG = (e10, t10) => `${e10}-flow-${t10}-code-verifier`, iF = (e10) => `${e10}-flows-code-verifier`;
      async function iV(e10, t10) {
        let r10 = await iN(e10, iF(t10));
        return Array.isArray(r10) ? r10.filter((e11) => null !== iH(e11)) : [];
      }
      async function iz(e10, t10, r10, n10, s10) {
        await iI(e10, iG(t10, r10), n10);
        let i10 = (await iV(e10, t10)).filter((e11) => e11 !== r10);
        for (i10.push(r10); i10.length > 5; ) {
          let r11 = i10.shift();
          await ij(e10, iG(t10, r11)), null == s10 || s10(r11);
        }
        await iI(e10, iF(t10), i10), await iI(e10, `${t10}-code-verifier`, n10);
      }
      async function iK(e10, t10, r10) {
        if (r10) {
          let n11 = await iN(e10, iG(t10, r10));
          return { verifier: "string" == typeof n11 ? n11 : null, flowId: r10 };
        }
        let n10 = await iN(e10, `${t10}-code-verifier`);
        return { verifier: "string" == typeof n10 ? n10 : null, flowId: null };
      }
      async function iW(e10, t10, r10) {
        let n10 = `${t10}-code-verifier`;
        if (!r10) return void await ij(e10, n10);
        let s10 = iG(t10, r10), i10 = await iN(e10, s10);
        await ij(e10, s10);
        let a10 = await iV(e10, t10), o2 = a10.filter((e11) => e11 !== r10);
        o2.length !== a10.length && (o2.length > 0 ? await iI(e10, iF(t10), o2) : await ij(e10, iF(t10))), null != i10 && i10 === await iN(e10, n10) && await ij(e10, n10);
      }
      async function iJ(e10, t10) {
        for (let r10 of await iV(e10, t10)) await ij(e10, iG(t10, r10));
        await ij(e10, iF(t10)), await ij(e10, `${t10}-code-verifier`);
      }
      async function iX(e10, t10, r10 = false, n10) {
        let s10 = function() {
          let e11 = new Uint32Array(56);
          if ("u" < typeof crypto) {
            let e12 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~", t11 = e12.length, r11 = "";
            for (let n11 = 0; n11 < 56; n11++) r11 += e12.charAt(Math.floor(Math.random() * t11));
            return r11;
          }
          return crypto.getRandomValues(e11), Array.from(e11, iD).join("");
        }(), i10 = s10;
        r10 && (i10 += "/recovery");
        let a10 = function() {
          if ("u" > typeof crypto && "function" == typeof crypto.getRandomValues) {
            let e12 = new Uint8Array(16);
            return crypto.getRandomValues(e12), Array.from(e12, iD).join("");
          }
          let e11 = "";
          for (let t11 = 0; t11 < 32; t11++) e11 += Math.floor(16 * Math.random()).toString(16);
          return e11;
        }();
        await iz(e10, t10, a10, i10, n10);
        let o2 = await iq(s10), l2 = s10 === o2 ? "plain" : "s256";
        return [o2, l2, a10];
      }
      let iY = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i, iZ = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      function iQ(e10) {
        if (!iZ.test(e10)) throw Error("@supabase/auth-js: Expected parameter to be UUID but is not");
      }
      function i0(e10) {
        if (!e10.passkey) throw Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).");
      }
      function i1() {
        return new Proxy({}, { get: (e10, t10) => {
          if ("__isUserNotAvailableProxy" === t10) return true;
          if ("symbol" == typeof t10) {
            let e11 = t10.toString();
            if ("Symbol(Symbol.toPrimitive)" === e11 || "Symbol(Symbol.toStringTag)" === e11 || "Symbol(util.inspect.custom)" === e11) return;
          }
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t10}" property of the session object is not supported. Please use getUser() instead.`);
        }, set: (e10, t10) => {
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t10}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
        }, deleteProperty: (e10, t10) => {
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t10}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
        } });
      }
      function i2(e10) {
        return JSON.parse(JSON.stringify(e10));
      }
      let i3 = (e10) => {
        if ("object" == typeof e10 && null !== e10) {
          if ("string" == typeof e10.msg) return e10.msg;
          if ("string" == typeof e10.message) return e10.message;
          if ("string" == typeof e10.error_description) return e10.error_description;
          if ("string" == typeof e10.error) return e10.error;
        }
        return JSON.stringify(e10);
      }, i4 = [500, 501, 502, 503, 504, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530];
      async function i5(e10) {
        var t10;
        let r10, n10;
        if (!("object" == typeof e10 && null !== e10 && "status" in e10 && "ok" in e10 && "json" in e10 && "function" == typeof e10.json)) throw new iy(i3(e10), 0);
        try {
          r10 = await e10.json();
        } catch (t11) {
          if (i4.includes(e10.status)) throw new iy(e10.statusText || `HTTP ${e10.status}`, e10.status);
          throw new iu(i3(t11), t11);
        }
        if (i4.includes(e10.status)) throw new iy(i3(r10), e10.status);
        let s10 = function(e11) {
          let t11 = e11.headers.get(ie);
          if (!t11 || !t11.match(iY)) return null;
          try {
            return /* @__PURE__ */ new Date(`${t11}T00:00:00.0Z`);
          } catch (e12) {
            return null;
          }
        }(e10);
        if (s10 && s10.getTime() >= it["2024-01-01"].timestamp && "object" == typeof r10 && r10 && "string" == typeof r10.code ? n10 = r10.code : "object" == typeof r10 && r10 && "string" == typeof r10.error_code && (n10 = r10.error_code), n10) {
          if ("weak_password" === n10) throw new iv(i3(r10), e10.status, (null == (t10 = r10.weak_password) ? void 0 : t10.reasons) || []);
          else if ("session_not_found" === n10) throw new id();
        } else if ("object" == typeof r10 && r10 && "object" == typeof r10.weak_password && r10.weak_password && Array.isArray(r10.weak_password.reasons) && r10.weak_password.reasons.length && r10.weak_password.reasons.reduce((e11, t11) => e11 && "string" == typeof t11, true)) throw new iv(i3(r10), e10.status, r10.weak_password.reasons);
        throw new io(i3(r10), e10.status || 500, n10);
      }
      async function i6(e10, t10, r10, n10) {
        var s10;
        let i10 = Object.assign({}, null == n10 ? void 0 : n10.headers);
        i10[ie] || (i10[ie] = it["2024-01-01"].name), (null == n10 ? void 0 : n10.jwt) && (i10.Authorization = `Bearer ${n10.jwt}`);
        let a10 = null != (s10 = null == n10 ? void 0 : n10.query) ? s10 : {};
        (null == n10 ? void 0 : n10.redirectTo) && (a10.redirect_to = n10.redirectTo);
        let o2 = Object.keys(a10).length ? "?" + new URLSearchParams(a10).toString() : "", l2 = await i8(e10, t10, r10 + o2, { headers: i10, noResolveJson: null == n10 ? void 0 : n10.noResolveJson }, {}, null == n10 ? void 0 : n10.body);
        return (null == n10 ? void 0 : n10.xform) ? null == n10 ? void 0 : n10.xform(l2) : { data: Object.assign({}, l2), error: null };
      }
      async function i8(e10, t10, r10, n10, s10, i10) {
        let a10, o2, l2 = (o2 = { method: t10, headers: (null == n10 ? void 0 : n10.headers) || {} }, "GET" === t10 ? o2 : (o2.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, null == n10 ? void 0 : n10.headers), o2.body = JSON.stringify(i10), Object.assign(Object.assign({}, o2), s10)));
        try {
          a10 = await e10(r10, Object.assign({}, l2));
        } catch (e11) {
          throw new iy(i3(e11), 0);
        }
        if (a10.ok || await i5(a10), null == n10 ? void 0 : n10.noResolveJson) return a10;
        try {
          return await a10.json();
        } catch (e11) {
          await i5(e11);
        }
      }
      function i9(e10) {
        var t10, r10, n10;
        let s10 = null;
        (n10 = e10).access_token && n10.refresh_token && n10.expires_in && (s10 = Object.assign({}, e10), e10.expires_at || (s10.expires_at = (r10 = e10.expires_in, Math.round(Date.now() / 1e3) + r10)));
        return { data: { session: s10, user: null != (t10 = e10.user) ? t10 : "string" == typeof (null == e10 ? void 0 : e10.id) ? e10 : null }, error: null };
      }
      function i7(e10) {
        let t10 = i9(e10);
        return !t10.error && e10.weak_password && "object" == typeof e10.weak_password && Array.isArray(e10.weak_password.reasons) && e10.weak_password.reasons.length && e10.weak_password.message && "string" == typeof e10.weak_password.message && e10.weak_password.reasons.reduce((e11, t11) => e11 && "string" == typeof t11, true) && (t10.data.weak_password = e10.weak_password), t10;
      }
      function ae(e10) {
        var t10;
        return { data: { user: null != (t10 = e10.user) ? t10 : e10 }, error: null };
      }
      function at(e10) {
        return { data: e10, error: null };
      }
      function ar(e10) {
        let { action_link: t10, email_otp: r10, hashed_token: n10, redirect_to: s10, verification_type: i10 } = e10;
        return { data: { properties: { action_link: t10, email_otp: r10, hashed_token: n10, redirect_to: s10, verification_type: i10 }, user: Object.assign({}, n_(e10, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"])) }, error: null };
      }
      function an(e10) {
        return e10;
      }
      let as = ["global", "local", "others"];
      class ai {
        constructor({ url: e10 = "", headers: t10 = {}, fetch: r10, experimental: n10 }) {
          this.url = e10, this.headers = t10, this.fetch = iA(r10), this.experimental = null != n10 ? n10 : {}, this.mfa = { listFactors: this._listFactors.bind(this), deleteFactor: this._deleteFactor.bind(this) }, this.oauth = { listClients: this._listOAuthClients.bind(this), createClient: this._createOAuthClient.bind(this), getClient: this._getOAuthClient.bind(this), updateClient: this._updateOAuthClient.bind(this), deleteClient: this._deleteOAuthClient.bind(this), regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this) }, this.customProviders = { listProviders: this._listCustomProviders.bind(this), createProvider: this._createCustomProvider.bind(this), getProvider: this._getCustomProvider.bind(this), updateProvider: this._updateCustomProvider.bind(this), deleteProvider: this._deleteCustomProvider.bind(this) }, this.passkey = { listPasskeys: this._adminListPasskeys.bind(this), deletePasskey: this._adminDeletePasskey.bind(this) };
        }
        async signOut(e10, t10 = as[0]) {
          if (0 > as.indexOf(t10)) throw Error(`@supabase/auth-js: Parameter scope must be one of ${as.join(", ")}`);
          try {
            return await i6(this.fetch, "POST", `${this.url}/logout?scope=${t10}`, { headers: this.headers, jwt: e10, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async inviteUserByEmail(e10, t10 = {}) {
          try {
            return await i6(this.fetch, "POST", `${this.url}/invite`, { body: { email: e10, data: t10.data }, headers: this.headers, redirectTo: t10.redirectTo, xform: ae });
          } catch (e11) {
            if (ia(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async generateLink(e10) {
          try {
            let { options: t10 } = e10, r10 = n_(e10, ["options"]), n10 = Object.assign(Object.assign({}, r10), t10);
            return "newEmail" in r10 && (n10.new_email = null == r10 ? void 0 : r10.newEmail, delete n10.newEmail), await i6(this.fetch, "POST", `${this.url}/admin/generate_link`, { body: n10, headers: this.headers, xform: ar, redirectTo: null == t10 ? void 0 : t10.redirectTo });
          } catch (e11) {
            if (ia(e11)) return { data: { properties: null, user: null }, error: e11 };
            throw e11;
          }
        }
        async createUser(e10) {
          try {
            return await i6(this.fetch, "POST", `${this.url}/admin/users`, { body: e10, headers: this.headers, xform: ae });
          } catch (e11) {
            if (ia(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async listUsers(e10) {
          var t10, r10, n10, s10, i10, a10, o2;
          try {
            let l2 = { nextPage: null, lastPage: 0, total: 0 }, u2 = await i6(this.fetch, "GET", `${this.url}/admin/users`, { headers: this.headers, noResolveJson: true, query: { page: null != (r10 = null == (t10 = null == e10 ? void 0 : e10.page) ? void 0 : t10.toString()) ? r10 : "", per_page: null != (s10 = null == (n10 = null == e10 ? void 0 : e10.perPage) ? void 0 : n10.toString()) ? s10 : "" }, xform: an });
            if (u2.error) throw u2.error;
            let c2 = await u2.json(), d2 = null != (i10 = u2.headers.get("x-total-count")) ? i10 : 0, h2 = null != (o2 = null == (a10 = u2.headers.get("link")) ? void 0 : a10.split(",")) ? o2 : [];
            return h2.length > 0 && (h2.forEach((e11) => {
              let t11 = parseInt(e11.split(";")[0].split("=")[1].substring(0, 1)), r11 = JSON.parse(e11.split(";")[1].split("=")[1]);
              l2[`${r11}Page`] = t11;
            }), l2.total = parseInt(d2)), { data: Object.assign(Object.assign({}, c2), l2), error: null };
          } catch (e11) {
            if (ia(e11)) return { data: { users: [] }, error: e11 };
            throw e11;
          }
        }
        async getUserById(e10) {
          iQ(e10);
          try {
            return await i6(this.fetch, "GET", `${this.url}/admin/users/${e10}`, { headers: this.headers, xform: ae });
          } catch (e11) {
            if (ia(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async updateUserById(e10, t10) {
          iQ(e10);
          try {
            return await i6(this.fetch, "PUT", `${this.url}/admin/users/${e10}`, { body: t10, headers: this.headers, xform: ae });
          } catch (e11) {
            if (ia(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async deleteUser(e10, t10 = false) {
          iQ(e10);
          try {
            return await i6(this.fetch, "DELETE", `${this.url}/admin/users/${e10}`, { headers: this.headers, body: { should_soft_delete: t10 }, xform: ae });
          } catch (e11) {
            if (ia(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async _listFactors(e10) {
          iQ(e10.userId);
          try {
            let { data: t10, error: r10 } = await i6(this.fetch, "GET", `${this.url}/admin/users/${e10.userId}/factors`, { headers: this.headers, xform: (e11) => ({ data: { factors: e11 }, error: null }) });
            return { data: t10, error: r10 };
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _deleteFactor(e10) {
          iQ(e10.userId), iQ(e10.id);
          try {
            return { data: await i6(this.fetch, "DELETE", `${this.url}/admin/users/${e10.userId}/factors/${e10.id}`, { headers: this.headers }), error: null };
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _listOAuthClients(e10) {
          var t10, r10, n10, s10, i10, a10, o2;
          try {
            let l2 = { nextPage: null, lastPage: 0, total: 0 }, u2 = await i6(this.fetch, "GET", `${this.url}/admin/oauth/clients`, { headers: this.headers, noResolveJson: true, query: { page: null != (r10 = null == (t10 = null == e10 ? void 0 : e10.page) ? void 0 : t10.toString()) ? r10 : "", per_page: null != (s10 = null == (n10 = null == e10 ? void 0 : e10.perPage) ? void 0 : n10.toString()) ? s10 : "" }, xform: an });
            if (u2.error) throw u2.error;
            let c2 = await u2.json(), d2 = null != (i10 = u2.headers.get("x-total-count")) ? i10 : 0, h2 = null != (o2 = null == (a10 = u2.headers.get("link")) ? void 0 : a10.split(",")) ? o2 : [];
            return h2.length > 0 && (h2.forEach((e11) => {
              let t11 = parseInt(e11.split(";")[0].split("=")[1].substring(0, 1)), r11 = JSON.parse(e11.split(";")[1].split("=")[1]);
              l2[`${r11}Page`] = t11;
            }), l2.total = parseInt(d2)), { data: Object.assign(Object.assign({}, c2), l2), error: null };
          } catch (e11) {
            if (ia(e11)) return { data: { clients: [] }, error: e11 };
            throw e11;
          }
        }
        async _createOAuthClient(e10) {
          try {
            return await i6(this.fetch, "POST", `${this.url}/admin/oauth/clients`, { body: e10, headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _getOAuthClient(e10) {
          try {
            return await i6(this.fetch, "GET", `${this.url}/admin/oauth/clients/${e10}`, { headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _updateOAuthClient(e10, t10) {
          try {
            return await i6(this.fetch, "PUT", `${this.url}/admin/oauth/clients/${e10}`, { body: t10, headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _deleteOAuthClient(e10) {
          try {
            return await i6(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${e10}`, { headers: this.headers, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _regenerateOAuthClientSecret(e10) {
          try {
            return await i6(this.fetch, "POST", `${this.url}/admin/oauth/clients/${e10}/regenerate_secret`, { headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _listCustomProviders(e10) {
          try {
            let t10 = {};
            return (null == e10 ? void 0 : e10.type) && (t10.type = e10.type), await i6(this.fetch, "GET", `${this.url}/admin/custom-providers`, { headers: this.headers, query: t10, xform: (e11) => {
              var t11;
              return { data: { providers: null != (t11 = null == e11 ? void 0 : e11.providers) ? t11 : [] }, error: null };
            } });
          } catch (e11) {
            if (ia(e11)) return { data: { providers: [] }, error: e11 };
            throw e11;
          }
        }
        async _createCustomProvider(e10) {
          try {
            return await i6(this.fetch, "POST", `${this.url}/admin/custom-providers`, { body: e10, headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _getCustomProvider(e10) {
          try {
            return await i6(this.fetch, "GET", `${this.url}/admin/custom-providers/${e10}`, { headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _updateCustomProvider(e10, t10) {
          try {
            return await i6(this.fetch, "PUT", `${this.url}/admin/custom-providers/${e10}`, { body: t10, headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _deleteCustomProvider(e10) {
          try {
            return await i6(this.fetch, "DELETE", `${this.url}/admin/custom-providers/${e10}`, { headers: this.headers, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _adminListPasskeys(e10) {
          i0(this.experimental), iQ(e10.userId);
          try {
            return await i6(this.fetch, "GET", `${this.url}/admin/users/${e10.userId}/passkeys`, { headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _adminDeletePasskey(e10) {
          i0(this.experimental), iQ(e10.userId), iQ(e10.passkeyId);
          try {
            return await i6(this.fetch, "DELETE", `${this.url}/admin/users/${e10.userId}/passkeys/${e10.passkeyId}`, { headers: this.headers, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
      }
      function aa(e10 = {}) {
        return { getItem: (t10) => e10[t10] || null, setItem: (t10, r10) => {
          e10[t10] = r10;
        }, removeItem: (t10) => {
          delete e10[t10];
        } };
      }
      class ao extends Error {
        constructor(e10) {
          super(e10), this.isAcquireTimeout = true;
        }
      }
      function al(e10) {
        if (!/^0x[a-fA-F0-9]{40}$/.test(e10)) throw Error(`@supabase/auth-js: Address "${e10}" is invalid.`);
        return e10.toLowerCase();
      }
      class au extends Error {
        constructor({ message: e10, code: t10, cause: r10, name: n10 }) {
          var s10;
          super(e10, { cause: r10 }), this.__isWebAuthnError = true, this.name = null != (s10 = null != n10 ? n10 : r10 instanceof Error ? r10.name : void 0) ? s10 : "Unknown Error", this.code = t10;
        }
        toJSON() {
          return { name: this.name, message: this.message, code: this.code };
        }
      }
      class ac extends au {
        constructor(e10, t10) {
          super({ code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: t10, message: e10 }), this.name = "WebAuthnUnknownError", this.originalError = t10;
        }
      }
      let ad = new class {
        createNewAbortSignal() {
          if (this.controller) {
            let e11 = Error("Cancelling existing WebAuthn API call for new one");
            e11.name = "AbortError", this.controller.abort(e11);
          }
          let e10 = new AbortController();
          return this.controller = e10, e10.signal;
        }
        cancelCeremony() {
          if (this.controller) {
            let e10 = Error("Manually cancelling existing WebAuthn API call");
            e10.name = "AbortError", this.controller.abort(e10), this.controller = void 0;
          }
        }
      }();
      function ah(e10) {
        if (!e10) throw Error("Credential creation options are required");
        if ("u" > typeof PublicKeyCredential && "parseCreationOptionsFromJSON" in PublicKeyCredential && "function" == typeof PublicKeyCredential.parseCreationOptionsFromJSON) return PublicKeyCredential.parseCreationOptionsFromJSON(e10);
        let { challenge: t10, user: r10, excludeCredentials: n10 } = e10, s10 = n_(e10, ["challenge", "user", "excludeCredentials"]), i10 = ix(t10).buffer, a10 = Object.assign(Object.assign({}, r10), { id: ix(r10.id).buffer }), o2 = Object.assign(Object.assign({}, s10), { challenge: i10, user: a10 });
        if (n10 && n10.length > 0) {
          o2.excludeCredentials = Array(n10.length);
          for (let e11 = 0; e11 < n10.length; e11++) {
            let t11 = n10[e11];
            o2.excludeCredentials[e11] = Object.assign(Object.assign({}, t11), { id: ix(t11.id).buffer, type: t11.type || "public-key", transports: t11.transports });
          }
        }
        return o2;
      }
      function ap(e10) {
        if (!e10) throw Error("Credential request options are required");
        if ("u" > typeof PublicKeyCredential && "parseRequestOptionsFromJSON" in PublicKeyCredential && "function" == typeof PublicKeyCredential.parseRequestOptionsFromJSON) return PublicKeyCredential.parseRequestOptionsFromJSON(e10);
        let { challenge: t10, allowCredentials: r10 } = e10, n10 = n_(e10, ["challenge", "allowCredentials"]), s10 = ix(t10).buffer, i10 = Object.assign(Object.assign({}, n10), { challenge: s10 });
        if (r10 && r10.length > 0) {
          i10.allowCredentials = Array(r10.length);
          for (let e11 = 0; e11 < r10.length; e11++) {
            let t11 = r10[e11];
            i10.allowCredentials[e11] = Object.assign(Object.assign({}, t11), { id: ix(t11.id).buffer, type: t11.type || "public-key", transports: t11.transports });
          }
        }
        return i10;
      }
      function af(e10) {
        var t10;
        return "toJSON" in e10 && "function" == typeof e10.toJSON ? e10.toJSON() : { id: e10.id, rawId: e10.id, response: { attestationObject: iP(new Uint8Array(e10.response.attestationObject)), clientDataJSON: iP(new Uint8Array(e10.response.clientDataJSON)) }, type: "public-key", clientExtensionResults: e10.getClientExtensionResults(), authenticatorAttachment: null != (t10 = e10.authenticatorAttachment) ? t10 : void 0 };
      }
      function ag(e10) {
        var t10;
        if ("toJSON" in e10 && "function" == typeof e10.toJSON) return e10.toJSON();
        let r10 = e10.getClientExtensionResults(), n10 = e10.response;
        return { id: e10.id, rawId: e10.id, response: { authenticatorData: iP(new Uint8Array(n10.authenticatorData)), clientDataJSON: iP(new Uint8Array(n10.clientDataJSON)), signature: iP(new Uint8Array(n10.signature)), userHandle: n10.userHandle ? iP(new Uint8Array(n10.userHandle)) : void 0 }, type: "public-key", clientExtensionResults: r10, authenticatorAttachment: null != (t10 = e10.authenticatorAttachment) ? t10 : void 0 };
      }
      function am(e10) {
        return "localhost" === e10 || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e10);
      }
      async function a_(e10) {
        try {
          let t10 = await navigator.credentials.create(e10);
          if (!t10) return { data: null, error: new ac("Empty credential response", t10) };
          if (!(t10 instanceof PublicKeyCredential)) return { data: null, error: new ac("Browser returned unexpected credential type", t10) };
          return { data: t10, error: null };
        } catch (t10) {
          return { data: null, error: function({ error: e11, options: t11 }) {
            var r10, n10, s10;
            let { publicKey: i10 } = t11;
            if (!i10) throw Error("options was missing required publicKey property");
            if ("AbortError" === e11.name) {
              if (t11.signal instanceof AbortSignal) return new au({ message: "Registration ceremony was sent an abort signal", code: "ERROR_CEREMONY_ABORTED", cause: e11 });
            } else if ("ConstraintError" === e11.name) {
              if ((null == (r10 = i10.authenticatorSelection) ? void 0 : r10.requireResidentKey) === true) return new au({ message: "Discoverable credentials were required but no available authenticator supported it", code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT", cause: e11 });
              else if ("conditional" === t11.mediation && (null == (n10 = i10.authenticatorSelection) ? void 0 : n10.userVerification) === "required") return new au({ message: "User verification was required during automatic registration but it could not be performed", code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE", cause: e11 });
              else if ((null == (s10 = i10.authenticatorSelection) ? void 0 : s10.userVerification) === "required") return new au({ message: "User verification was required but no available authenticator supported it", code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT", cause: e11 });
            } else if ("InvalidStateError" === e11.name) return new au({ message: "The authenticator was previously registered", code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED", cause: e11 });
            else if ("NotAllowedError" === e11.name) return new au({ message: e11.message, code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
            else if ("NotSupportedError" === e11.name) return new au(0 === i10.pubKeyCredParams.filter((e12) => "public-key" === e12.type).length ? { message: 'No entry in pubKeyCredParams was of type "public-key"', code: "ERROR_MALFORMED_PUBKEYCREDPARAMS", cause: e11 } : { message: "No available authenticator supported any of the specified pubKeyCredParams algorithms", code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG", cause: e11 });
            else if ("SecurityError" === e11.name) {
              let t12 = window.location.hostname;
              if (!am(t12)) return new au({ message: `${window.location.hostname} is an invalid domain`, code: "ERROR_INVALID_DOMAIN", cause: e11 });
              if (i10.rp.id !== t12) return new au({ message: `The RP ID "${i10.rp.id}" is invalid for this domain`, code: "ERROR_INVALID_RP_ID", cause: e11 });
            } else if ("TypeError" === e11.name) {
              if (i10.user.id.byteLength < 1 || i10.user.id.byteLength > 64) return new au({ message: "User ID was not between 1 and 64 characters", code: "ERROR_INVALID_USER_ID_LENGTH", cause: e11 });
            } else if ("UnknownError" === e11.name) return new au({ message: "The authenticator was unable to process the specified options, or could not create a new credential", code: "ERROR_AUTHENTICATOR_GENERAL_ERROR", cause: e11 });
            return new au({ message: "a Non-Webauthn related error has occurred", code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
          }({ error: t10, options: e10 }) };
        }
      }
      async function ay(e10) {
        try {
          let t10 = await navigator.credentials.get(e10);
          if (!t10) return { data: null, error: new ac("Empty credential response", t10) };
          if (!(t10 instanceof PublicKeyCredential)) return { data: null, error: new ac("Browser returned unexpected credential type", t10) };
          return { data: t10, error: null };
        } catch (t10) {
          return { data: null, error: function({ error: e11, options: t11 }) {
            let { publicKey: r10 } = t11;
            if (!r10) throw Error("options was missing required publicKey property");
            if ("AbortError" === e11.name) {
              if (t11.signal instanceof AbortSignal) return new au({ message: "Authentication ceremony was sent an abort signal", code: "ERROR_CEREMONY_ABORTED", cause: e11 });
            } else if ("NotAllowedError" === e11.name) return new au({ message: e11.message, code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
            else if ("SecurityError" === e11.name) {
              let t12 = window.location.hostname;
              if (!am(t12)) return new au({ message: `${window.location.hostname} is an invalid domain`, code: "ERROR_INVALID_DOMAIN", cause: e11 });
              if (r10.rpId !== t12) return new au({ message: `The RP ID "${r10.rpId}" is invalid for this domain`, code: "ERROR_INVALID_RP_ID", cause: e11 });
            } else if ("UnknownError" === e11.name) return new au({ message: "The authenticator was unable to process the specified options, or could not create a new assertion signature", code: "ERROR_AUTHENTICATOR_GENERAL_ERROR", cause: e11 });
            return new au({ message: "a Non-Webauthn related error has occurred", code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
          }({ error: t10, options: e10 }) };
        }
      }
      let ab = { hints: ["security-key"], authenticatorSelection: { authenticatorAttachment: "cross-platform", requireResidentKey: false, userVerification: "preferred", residentKey: "discouraged" }, attestation: "direct" }, aw = { userVerification: "preferred", hints: ["security-key"], attestation: "direct" };
      function av(...e10) {
        let t10 = (e11) => null !== e11 && "object" == typeof e11 && !Array.isArray(e11), r10 = (e11) => e11 instanceof ArrayBuffer || ArrayBuffer.isView(e11), n10 = {};
        for (let s10 of e10) if (s10) for (let e11 in s10) {
          let i10 = s10[e11];
          if (void 0 !== i10) if (Array.isArray(i10)) n10[e11] = i10;
          else if (r10(i10)) n10[e11] = i10;
          else if (t10(i10)) {
            let r11 = n10[e11];
            t10(r11) ? n10[e11] = av(r11, i10) : n10[e11] = av(i10);
          } else n10[e11] = i10;
        }
        return n10;
      }
      class aE {
        constructor(e10) {
          this.client = e10, this.enroll = this._enroll.bind(this), this.challenge = this._challenge.bind(this), this.verify = this._verify.bind(this), this.authenticate = this._authenticate.bind(this), this.register = this._register.bind(this);
        }
        async _enroll(e10) {
          return this.client.mfa.enroll(Object.assign(Object.assign({}, e10), { factorType: "webauthn" }));
        }
        async _challenge({ factorId: e10, webauthn: t10, friendlyName: r10, signal: n10 }, s10) {
          var i10, a10, o2, l2, u2;
          try {
            let { data: c2, error: d2 } = await this.client.mfa.challenge({ factorId: e10, webauthn: t10 });
            if (!c2) return { data: null, error: d2 };
            let h2 = null != n10 ? n10 : ad.createNewAbortSignal();
            if ("create" === c2.webauthn.type) {
              let { user: e11 } = c2.webauthn.credential_options.publicKey;
              if (!e11.name) if (r10) e11.name = `${e11.id}:${r10}`;
              else {
                let t11 = (await this.client.getUser()).data.user, r11 = (null == (i10 = null == t11 ? void 0 : t11.user_metadata) ? void 0 : i10.name) || (null == t11 ? void 0 : t11.email) || (null == t11 ? void 0 : t11.id) || "User";
                e11.name = `${e11.id}:${r11}`;
              }
              e11.displayName || (e11.displayName = e11.name);
            }
            switch (c2.webauthn.type) {
              case "create": {
                let t11 = (a10 = c2.webauthn.credential_options.publicKey, o2 = null == s10 ? void 0 : s10.create, av(ab, a10, o2 || {})), { data: r11, error: n11 } = await a_({ publicKey: t11, signal: h2 });
                if (r11) return { data: { factorId: e10, challengeId: c2.id, webauthn: { type: c2.webauthn.type, credential_response: r11 } }, error: null };
                return { data: null, error: n11 };
              }
              case "request": {
                let t11 = (l2 = c2.webauthn.credential_options.publicKey, u2 = null == s10 ? void 0 : s10.request, av(aw, l2, u2 || {})), { data: r11, error: n11 } = await ay(Object.assign(Object.assign({}, c2.webauthn.credential_options), { publicKey: t11, signal: h2 }));
                if (r11) return { data: { factorId: e10, challengeId: c2.id, webauthn: { type: c2.webauthn.type, credential_response: r11 } }, error: null };
                return { data: null, error: n11 };
              }
            }
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            return { data: null, error: new iu("Unexpected error in challenge", e11) };
          }
        }
        async _verify({ challengeId: e10, factorId: t10, webauthn: r10 }) {
          return this.client.mfa.verify({ factorId: t10, challengeId: e10, webauthn: r10 });
        }
        async _authenticate({ factorId: e10, webauthn: { rpId: t10, rpOrigins: r10, signal: n10 } = {} }, s10) {
          if (!t10) return { data: null, error: new ii("rpId is required for WebAuthn authentication") };
          try {
            1;
            return { data: null, error: new iu("Browser does not support WebAuthn", null) };
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            return { data: null, error: new iu("Unexpected error in authenticate", e11) };
          }
        }
        async _register({ friendlyName: e10, webauthn: { rpId: t10, rpOrigins: r10, signal: n10 } = {} }, s10) {
          if (!t10) return { data: null, error: new ii("rpId is required for WebAuthn registration") };
          try {
            1;
            return { data: null, error: new iu("Browser does not support WebAuthn", null) };
          } catch (e11) {
            if (ia(e11)) return { data: null, error: e11 };
            return { data: null, error: new iu("Unexpected error in register", e11) };
          }
        }
      }
      if ("object" != typeof globalThis) try {
        Object.defineProperty(Object.prototype, "__magic__", { get: function() {
          return this;
        }, configurable: true }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__;
      } catch (e10) {
        "u" > typeof self && (self.globalThis = self);
      }
      let aS = { url: "http://localhost:9999", storageKey: "supabase.auth.token", autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, headers: s7, flowType: "implicit", debug: false, hasCustomAuthorizationHeader: false, throwOnError: false, lockAcquireTimeout: 5e3, skipAutoInitialize: false, experimental: {} }, ak = {};
      class aT {
        get jwks() {
          var e10, t10;
          return null != (t10 = null == (e10 = ak[this.storageKey]) ? void 0 : e10.jwks) ? t10 : { keys: [] };
        }
        set jwks(e10) {
          ak[this.storageKey] = Object.assign(Object.assign({}, ak[this.storageKey]), { jwks: e10 });
        }
        get jwks_cached_at() {
          var e10, t10;
          return null != (t10 = null == (e10 = ak[this.storageKey]) ? void 0 : e10.cachedAt) ? t10 : Number.MIN_SAFE_INTEGER;
        }
        set jwks_cached_at(e10) {
          ak[this.storageKey] = Object.assign(Object.assign({}, ak[this.storageKey]), { cachedAt: e10 });
        }
        constructor(e10) {
          var t10, r10;
          this.userStorage = null, this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.autoRefreshTickTimeout = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.lastRefreshFailure = null, this._sessionRemovalEpoch = 0, this.initializePromise = null, this._pendingInitNotifications = null, this.detectSessionInUrl = true, this.hasCustomAuthorizationHeader = false, this.suppressGetSessionWarning = false, this.lock = null, this.lockAcquired = false, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log;
          const n10 = Object.assign(Object.assign({}, aS), e10);
          this.storageKey = n10.storageKey, this.instanceID = null != (t10 = aT.nextInstanceID[this.storageKey]) ? t10 : 0, aT.nextInstanceID[this.storageKey] = this.instanceID + 1, this.logDebugMessages = !!n10.debug, "function" == typeof n10.debug && (this.logger = n10.debug), this.instanceID, this.persistSession = n10.persistSession, this.autoRefreshToken = n10.autoRefreshToken, this.experimental = null != (r10 = n10.experimental) ? r10 : {}, this.admin = new ai({ url: n10.url, headers: n10.headers, fetch: n10.fetch, experimental: this.experimental }), this.url = n10.url, this.headers = n10.headers, this.fetch = iA(n10.fetch), this.detectSessionInUrl = n10.detectSessionInUrl, this.flowType = n10.flowType, this.hasCustomAuthorizationHeader = n10.hasCustomAuthorizationHeader, this.throwOnError = n10.throwOnError, this.lockAcquireTimeout = n10.lockAcquireTimeout, null != n10.lock && (this.lock = n10.lock), this.jwks || (this.jwks = { keys: [] }, this.jwks_cached_at = Number.MIN_SAFE_INTEGER), this.mfa = { verify: this._verify.bind(this), enroll: this._enroll.bind(this), unenroll: this._unenroll.bind(this), challenge: this._challenge.bind(this), listFactors: this._listFactors.bind(this), challengeAndVerify: this._challengeAndVerify.bind(this), getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this), webauthn: new aE(this) }, this.oauth = { getAuthorizationDetails: this._getAuthorizationDetails.bind(this), approveAuthorization: this._approveAuthorization.bind(this), denyAuthorization: this._denyAuthorization.bind(this), listGrants: this._listOAuthGrants.bind(this), revokeGrant: this._revokeOAuthGrant.bind(this) }, this.passkey = { startRegistration: this._startPasskeyRegistration.bind(this), verifyRegistration: this._verifyPasskeyRegistration.bind(this), startAuthentication: this._startPasskeyAuthentication.bind(this), verifyAuthentication: this._verifyPasskeyAuthentication.bind(this), list: this._listPasskeys.bind(this), update: this._updatePasskey.bind(this), delete: this._deletePasskey.bind(this) }, this.persistSession ? (n10.storage ? this.storage = n10.storage : (this.memoryStorage = {}, this.storage = aa(this.memoryStorage)), n10.userStorage && (this.userStorage = n10.userStorage)) : (this.memoryStorage = {}, this.storage = aa(this.memoryStorage)), n10.skipAutoInitialize || this.initialize().catch((e11) => {
            this._debug("#initialize()", "error", e11);
          });
        }
        isThrowOnErrorEnabled() {
          return this.throwOnError;
        }
        _returnResult(e10) {
          if (this.throwOnError && e10 && e10.error) throw e10.error;
          return e10;
        }
        _logPrefix() {
          return `GoTrueClient@${this.storageKey}:${this.instanceID} (${s9}) ${(/* @__PURE__ */ new Date()).toISOString()}`;
        }
        _debug(...e10) {
          return this.logDebugMessages && this.logger(this._logPrefix(), ...e10), this;
        }
        async initialize() {
          var e10;
          if (this.initializePromise) return await this.initializePromise;
          this._pendingInitNotifications = [], this.initializePromise = (async () => null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._initialize()) : await this._initialize())();
          let t10 = await this.initializePromise, r10 = null != (e10 = this._pendingInitNotifications) ? e10 : [];
          for (let e11 of (this._pendingInitNotifications = null, r10)) await this._notifyAllSubscribers(e11.event, e11.session, e11.broadcast);
          return t10;
        }
        async _initialize() {
          try {
            return await this._recoverAndRefresh(), { error: null };
          } catch (e10) {
            if (ia(e10)) return this._returnResult({ error: e10 });
            return this._returnResult({ error: new iu("Unexpected error during initialization", e10) });
          } finally {
            await this._handleVisibilityChange(), this._debug("#_initialize()", "end");
          }
        }
        async signInAnonymously(e10) {
          var t10, r10, n10;
          try {
            let { data: s10, error: i10 } = await i6(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { data: null != (r10 = null == (t10 = null == e10 ? void 0 : e10.options) ? void 0 : t10.data) ? r10 : {}, gotrue_meta_security: { captcha_token: null == (n10 = null == e10 ? void 0 : e10.options) ? void 0 : n10.captchaToken } }, xform: i9 });
            if (i10 || !s10) return this._returnResult({ data: { user: null, session: null }, error: i10 });
            let a10 = s10.session, o2 = s10.user;
            return s10.session && (await this._saveSession(s10.session), await this._notifyAllSubscribers("SIGNED_IN", a10)), this._returnResult({ data: { user: o2, session: a10 }, error: null });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signUp(e10) {
          var t10, r10, n10;
          let s10 = null;
          try {
            let i10;
            if ("email" in e10) {
              let { email: r11, password: n11, options: a11 } = e10, o3 = null, l3 = null;
              "pkce" === this.flowType && ([o3, l3, s10] = await this._getCodeChallengeAndMethod()), i10 = await i6(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, redirectTo: this._maybeAppendFlowIdToRedirect(null == a11 ? void 0 : a11.emailRedirectTo, s10), body: { email: r11, password: n11, data: null != (t10 = null == a11 ? void 0 : a11.data) ? t10 : {}, gotrue_meta_security: { captcha_token: null == a11 ? void 0 : a11.captchaToken }, code_challenge: o3, code_challenge_method: l3 }, xform: i9 });
            } else if ("phone" in e10) {
              let { phone: t11, password: s11, options: a11 } = e10;
              i10 = await i6(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { phone: t11, password: s11, data: null != (r10 = null == a11 ? void 0 : a11.data) ? r10 : {}, channel: null != (n10 = null == a11 ? void 0 : a11.channel) ? n10 : "sms", gotrue_meta_security: { captcha_token: null == a11 ? void 0 : a11.captchaToken } }, xform: i9 });
            } else throw new ig("You must provide either an email or phone number and a password");
            let { data: a10, error: o2 } = i10;
            if (o2 || !a10) return await iW(this.storage, this.storageKey, s10), this._returnResult({ data: { user: null, session: null }, error: o2 });
            let l2 = a10.session, u2 = a10.user;
            return a10.session && (await this._saveSession(a10.session), await this._notifyAllSubscribers("SIGNED_IN", l2)), this._returnResult({ data: { user: u2, session: l2 }, error: null });
          } catch (e11) {
            if (await iW(this.storage, this.storageKey, s10), ia(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithPassword(e10) {
          try {
            let t10;
            if ("email" in e10) {
              let { email: r11, password: n11, options: s10 } = e10;
              t10 = await i6(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { email: r11, password: n11, gotrue_meta_security: { captcha_token: null == s10 ? void 0 : s10.captchaToken } }, xform: i7 });
            } else if ("phone" in e10) {
              let { phone: r11, password: n11, options: s10 } = e10;
              t10 = await i6(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { phone: r11, password: n11, gotrue_meta_security: { captcha_token: null == s10 ? void 0 : s10.captchaToken } }, xform: i7 });
            } else throw new ig("You must provide either an email or phone number and a password");
            let { data: r10, error: n10 } = t10;
            if (n10) return this._returnResult({ data: { user: null, session: null }, error: n10 });
            if (!r10 || !r10.session || !r10.user) {
              let e11 = new ip();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return r10.session && (await this._saveSession(r10.session), await this._notifyAllSubscribers("SIGNED_IN", r10.session)), this._returnResult({ data: Object.assign({ user: r10.user, session: r10.session }, r10.weak_password ? { weakPassword: r10.weak_password } : null), error: n10 });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithOAuth(e10) {
          var t10, r10, n10, s10;
          return await this._handleProviderSignIn(e10.provider, { redirectTo: null == (t10 = e10.options) ? void 0 : t10.redirectTo, scopes: null == (r10 = e10.options) ? void 0 : r10.scopes, queryParams: null == (n10 = e10.options) ? void 0 : n10.queryParams, skipBrowserRedirect: null == (s10 = e10.options) ? void 0 : s10.skipBrowserRedirect });
        }
        async exchangeCodeForSession(e10, t10) {
          return (await this.initializePromise, null != this.lock) ? this._acquireLock(this.lockAcquireTimeout, async () => this._exchangeCodeForSession(e10, t10)) : this._exchangeCodeForSession(e10, t10);
        }
        async signInWithWeb3(e10) {
          let { chain: t10 } = e10;
          switch (t10) {
            case "ethereum":
              return await this.signInWithEthereum(e10);
            case "solana":
              return await this.signInWithSolana(e10);
            default:
              throw Error(`@supabase/auth-js: Unsupported chain "${t10}"`);
          }
        }
        async signInWithEthereum(e10) {
          var t10, r10, n10, s10, i10, a10, o2, l2, u2, c2, d2, h2;
          let p2, f2;
          if ("message" in e10) p2 = e10.message, f2 = e10.signature;
          else {
            let { chain: c3, wallet: d3, statement: g2, options: m2 } = e10;
            if ("object" != typeof d3 || !(null == m2 ? void 0 : m2.url)) throw Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
            let _2 = new URL(null != (t10 = null == m2 ? void 0 : m2.url) ? t10 : window.location.href), y2 = await d3.request({ method: "eth_requestAccounts" }).then((e11) => e11).catch(() => {
              throw Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid");
            });
            if (!y2 || 0 === y2.length) throw Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");
            let b2 = al(y2[0]), w2 = null == (r10 = null == m2 ? void 0 : m2.signInWithEthereum) ? void 0 : r10.chainId;
            w2 || (w2 = parseInt(await d3.request({ method: "eth_chainId" }), 16)), p2 = function(e11) {
              var t11;
              let { chainId: r11, domain: n11, expirationTime: s11, issuedAt: i11 = /* @__PURE__ */ new Date(), nonce: a11, notBefore: o3, requestId: l3, resources: u3, scheme: c4, uri: d4, version: h3 } = e11;
              if (!Number.isInteger(r11)) throw Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r11}`);
              if (!n11) throw Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');
              if (a11 && a11.length < 8) throw Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a11}`);
              if (!d4) throw Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');
              if ("1" !== h3) throw Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${h3}`);
              if (null == (t11 = e11.statement) ? void 0 : t11.includes("\n")) throw Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e11.statement}`);
              let p3 = al(e11.address), f3 = c4 ? `${c4}://${n11}` : n11, g3 = e11.statement ? `${e11.statement}
` : "", m3 = `${f3} wants you to sign in with your Ethereum account:
${p3}

${g3}`, _3 = `URI: ${d4}
Version: ${h3}
Chain ID: ${r11}${a11 ? `
Nonce: ${a11}` : ""}
Issued At: ${i11.toISOString()}`;
              if (s11 && (_3 += `
Expiration Time: ${s11.toISOString()}`), o3 && (_3 += `
Not Before: ${o3.toISOString()}`), l3 && (_3 += `
Request ID: ${l3}`), u3) {
                let e12 = "\nResources:";
                for (let t12 of u3) {
                  if (!t12 || "string" != typeof t12) throw Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${t12}`);
                  e12 += `
- ${t12}`;
                }
                _3 += e12;
              }
              return `${m3}
${_3}`;
            }({ domain: _2.host, address: b2, statement: g2, uri: _2.href, version: "1", chainId: w2, nonce: null == (n10 = null == m2 ? void 0 : m2.signInWithEthereum) ? void 0 : n10.nonce, issuedAt: null != (i10 = null == (s10 = null == m2 ? void 0 : m2.signInWithEthereum) ? void 0 : s10.issuedAt) ? i10 : /* @__PURE__ */ new Date(), expirationTime: null == (a10 = null == m2 ? void 0 : m2.signInWithEthereum) ? void 0 : a10.expirationTime, notBefore: null == (o2 = null == m2 ? void 0 : m2.signInWithEthereum) ? void 0 : o2.notBefore, requestId: null == (l2 = null == m2 ? void 0 : m2.signInWithEthereum) ? void 0 : l2.requestId, resources: null == (u2 = null == m2 ? void 0 : m2.signInWithEthereum) ? void 0 : u2.resources }), f2 = await d3.request({ method: "personal_sign", params: [(h2 = p2, "0x" + Array.from(new TextEncoder().encode(h2), (e11) => e11.toString(16).padStart(2, "0")).join("")), b2] });
          }
          try {
            let { data: t11, error: r11 } = await i6(this.fetch, "POST", `${this.url}/token?grant_type=web3`, { headers: this.headers, body: Object.assign({ chain: "ethereum", message: p2, signature: f2 }, (null == (c2 = e10.options) ? void 0 : c2.captchaToken) ? { gotrue_meta_security: { captcha_token: null == (d2 = e10.options) ? void 0 : d2.captchaToken } } : null), xform: i9 });
            if (r11) throw r11;
            if (!t11 || !t11.session || !t11.user) {
              let e11 = new ip();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return t11.session && (await this._saveSession(t11.session), await this._notifyAllSubscribers("SIGNED_IN", t11.session)), this._returnResult({ data: Object.assign({}, t11), error: r11 });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithSolana(e10) {
          var t10, r10, n10, s10, i10, a10, o2, l2, u2, c2, d2, h2;
          let p2, f2;
          if ("message" in e10) p2 = e10.message, f2 = e10.signature;
          else {
            let { chain: d3, wallet: h3, statement: g2, options: m2 } = e10;
            if ("object" != typeof h3 || !(null == m2 ? void 0 : m2.url)) throw Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
            let _2 = new URL(null != (t10 = null == m2 ? void 0 : m2.url) ? t10 : window.location.href);
            if ("signIn" in h3 && h3.signIn) {
              let e11, t11 = await h3.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, null == m2 ? void 0 : m2.signInWithSolana), { version: "1", domain: _2.host, uri: _2.href }), g2 ? { statement: g2 } : null));
              if (Array.isArray(t11) && t11[0] && "object" == typeof t11[0]) e11 = t11[0];
              else if (t11 && "object" == typeof t11 && "signedMessage" in t11 && "signature" in t11) e11 = t11;
              else throw Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
              if ("signedMessage" in e11 && "signature" in e11 && ("string" == typeof e11.signedMessage || e11.signedMessage instanceof Uint8Array) && e11.signature instanceof Uint8Array) p2 = "string" == typeof e11.signedMessage ? e11.signedMessage : new TextDecoder().decode(e11.signedMessage), f2 = e11.signature;
              else throw Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
            } else {
              if (!("signMessage" in h3) || "function" != typeof h3.signMessage || !("publicKey" in h3) || "object" != typeof h3 || !h3.publicKey || !("toBase58" in h3.publicKey) || "function" != typeof h3.publicKey.toBase58) throw Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
              p2 = [`${_2.host} wants you to sign in with your Solana account:`, h3.publicKey.toBase58(), ...g2 ? ["", g2, ""] : [""], "Version: 1", `URI: ${_2.href}`, `Issued At: ${null != (n10 = null == (r10 = null == m2 ? void 0 : m2.signInWithSolana) ? void 0 : r10.issuedAt) ? n10 : (/* @__PURE__ */ new Date()).toISOString()}`, ...(null == (s10 = null == m2 ? void 0 : m2.signInWithSolana) ? void 0 : s10.notBefore) ? [`Not Before: ${m2.signInWithSolana.notBefore}`] : [], ...(null == (i10 = null == m2 ? void 0 : m2.signInWithSolana) ? void 0 : i10.expirationTime) ? [`Expiration Time: ${m2.signInWithSolana.expirationTime}`] : [], ...(null == (a10 = null == m2 ? void 0 : m2.signInWithSolana) ? void 0 : a10.chainId) ? [`Chain ID: ${m2.signInWithSolana.chainId}`] : [], ...(null == (o2 = null == m2 ? void 0 : m2.signInWithSolana) ? void 0 : o2.nonce) ? [`Nonce: ${m2.signInWithSolana.nonce}`] : [], ...(null == (l2 = null == m2 ? void 0 : m2.signInWithSolana) ? void 0 : l2.requestId) ? [`Request ID: ${m2.signInWithSolana.requestId}`] : [], ...(null == (c2 = null == (u2 = null == m2 ? void 0 : m2.signInWithSolana) ? void 0 : u2.resources) ? void 0 : c2.length) ? ["Resources", ...m2.signInWithSolana.resources.map((e12) => `- ${e12}`)] : []].join("\n");
              let e11 = await h3.signMessage(new TextEncoder().encode(p2), "utf8");
              if (!e11 || !(e11 instanceof Uint8Array)) throw Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
              f2 = e11;
            }
          }
          try {
            let { data: t11, error: r11 } = await i6(this.fetch, "POST", `${this.url}/token?grant_type=web3`, { headers: this.headers, body: Object.assign({ chain: "solana", message: p2, signature: iP(f2) }, (null == (d2 = e10.options) ? void 0 : d2.captchaToken) ? { gotrue_meta_security: { captcha_token: null == (h2 = e10.options) ? void 0 : h2.captchaToken } } : null), xform: i9 });
            if (r11) throw r11;
            if (!t11 || !t11.session || !t11.user) {
              let e11 = new ip();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return t11.session && (await this._saveSession(t11.session), await this._notifyAllSubscribers("SIGNED_IN", t11.session)), this._returnResult({ data: Object.assign({}, t11), error: r11 });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async _exchangeCodeForSession(e10, t10) {
          let r10 = (null == t10 ? void 0 : t10.flowId) != null, n10 = r10 ? iH(null == t10 ? void 0 : t10.flowId) : null;
          r10 && !n10 && this._debug("#_exchangeCodeForSession()", "provided flowId is not a valid flow id", null == t10 ? void 0 : t10.flowId);
          let { verifier: s10, flowId: i10 } = r10 && !n10 ? { verifier: null, flowId: null } : await iK(this.storage, this.storageKey, n10), [a10, o2] = (null != s10 ? s10 : "").split("/");
          try {
            if (!a10 && "pkce" === this.flowType) throw new i_();
            let { data: t11, error: r11 } = await i6(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, { headers: this.headers, body: { auth_code: e10, code_verifier: a10 }, xform: i9 });
            if (await iW(this.storage, this.storageKey, i10), r11) throw r11;
            if (!t11 || !t11.session || !t11.user) {
              let e11 = new ip();
              return this._returnResult({ data: { user: null, session: null, redirectType: null }, error: e11 });
            }
            return t11.session && (await this._saveSession(t11.session), await this._notifyAllSubscribers("recovery" === o2 ? "PASSWORD_RECOVERY" : "SIGNED_IN", t11.session)), this._returnResult({ data: Object.assign(Object.assign({}, t11), { redirectType: null != o2 ? o2 : null }), error: r11 });
          } catch (e11) {
            if (await iW(this.storage, this.storageKey, i10), ia(e11)) return this._returnResult({ data: { user: null, session: null, redirectType: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithIdToken(e10) {
          try {
            let { options: t10, provider: r10, token: n10, access_token: s10, nonce: i10 } = e10, { data: a10, error: o2 } = await i6(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, body: { provider: r10, id_token: n10, access_token: s10, nonce: i10, gotrue_meta_security: { captcha_token: null == t10 ? void 0 : t10.captchaToken } }, xform: i9 });
            if (o2) return this._returnResult({ data: { user: null, session: null }, error: o2 });
            if (!a10 || !a10.session || !a10.user) {
              let e11 = new ip();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return a10.session && (await this._saveSession(a10.session), await this._notifyAllSubscribers("SIGNED_IN", a10.session)), this._returnResult({ data: a10, error: o2 });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithOtp(e10) {
          var t10, r10, n10, s10, i10;
          let a10 = null;
          try {
            if ("email" in e10) {
              let { email: n11, options: s11 } = e10, i11 = null, o2 = null;
              "pkce" === this.flowType && ([i11, o2, a10] = await this._getCodeChallengeAndMethod());
              let { error: l2 } = await i6(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { email: n11, data: null != (t10 = null == s11 ? void 0 : s11.data) ? t10 : {}, create_user: null == (r10 = null == s11 ? void 0 : s11.shouldCreateUser) || r10, gotrue_meta_security: { captcha_token: null == s11 ? void 0 : s11.captchaToken }, code_challenge: i11, code_challenge_method: o2 }, redirectTo: this._maybeAppendFlowIdToRedirect(null == s11 ? void 0 : s11.emailRedirectTo, a10) });
              return this._returnResult({ data: { user: null, session: null }, error: l2 });
            }
            if ("phone" in e10) {
              let { phone: t11, options: r11 } = e10, { data: a11, error: o2 } = await i6(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { phone: t11, data: null != (n10 = null == r11 ? void 0 : r11.data) ? n10 : {}, create_user: null == (s10 = null == r11 ? void 0 : r11.shouldCreateUser) || s10, gotrue_meta_security: { captcha_token: null == r11 ? void 0 : r11.captchaToken }, channel: null != (i10 = null == r11 ? void 0 : r11.channel) ? i10 : "sms" } });
              return this._returnResult({ data: { user: null, session: null, messageId: null == a11 ? void 0 : a11.message_id }, error: o2 });
            }
            throw new ig("You must provide either an email or phone number.");
          } catch (e11) {
            if (await iW(this.storage, this.storageKey, a10), ia(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async verifyOtp(e10) {
          var t10, r10;
          try {
            let n10, s10;
            "options" in e10 && (n10 = null == (t10 = e10.options) ? void 0 : t10.redirectTo, s10 = null == (r10 = e10.options) ? void 0 : r10.captchaToken);
            let { data: i10, error: a10 } = await i6(this.fetch, "POST", `${this.url}/verify`, { headers: this.headers, body: Object.assign(Object.assign({}, e10), { gotrue_meta_security: { captcha_token: s10 } }), redirectTo: n10, xform: i9 });
            if (a10) throw a10;
            if (!i10) throw Error("An error occurred on token verification.");
            let o2 = i10.session, l2 = i10.user;
            return (null == o2 ? void 0 : o2.access_token) && (await this._saveSession(o2), await this._notifyAllSubscribers("recovery" == e10.type ? "PASSWORD_RECOVERY" : "SIGNED_IN", o2)), this._returnResult({ data: { user: l2, session: o2 }, error: null });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithSSO(e10) {
          var t10, r10, n10;
          let s10 = null;
          try {
            let i10 = null, a10 = null;
            "pkce" === this.flowType && ([i10, a10, s10] = await this._getCodeChallengeAndMethod());
            let o2 = await i6(this.fetch, "POST", `${this.url}/sso`, { body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e10 ? { provider_id: e10.providerId } : null), "domain" in e10 ? { domain: e10.domain } : null), { redirect_to: this._maybeAppendFlowIdToRedirect(null == (t10 = e10.options) ? void 0 : t10.redirectTo, s10) }), (null == (r10 = null == e10 ? void 0 : e10.options) ? void 0 : r10.captchaToken) ? { gotrue_meta_security: { captcha_token: e10.options.captchaToken } } : null), { skip_http_redirect: true, code_challenge: i10, code_challenge_method: a10 }), headers: this.headers, xform: at });
            return null == (n10 = o2.data) || n10.url, this._returnResult(o2);
          } catch (e11) {
            if (await iW(this.storage, this.storageKey, s10), ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async reauthenticate() {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._reauthenticate()) : await this._reauthenticate();
        }
        async _reauthenticate() {
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              if (r10) throw r10;
              if (!t10) throw new id();
              let { error: n10 } = await i6(this.fetch, "GET", `${this.url}/reauthenticate`, { headers: this.headers, jwt: t10.access_token });
              return this._returnResult({ data: { user: null, session: null }, error: n10 });
            });
          } catch (e10) {
            if (ia(e10)) return this._returnResult({ data: { user: null, session: null }, error: e10 });
            throw e10;
          }
        }
        async resend(e10) {
          let t10 = null;
          try {
            let r10 = `${this.url}/resend`;
            if ("email" in e10) {
              let { email: n10, type: s10, options: i10 } = e10, a10 = null, o2 = null;
              "pkce" === this.flowType && ([a10, o2, t10] = await this._getCodeChallengeAndMethod());
              let { error: l2 } = await i6(this.fetch, "POST", r10, { headers: this.headers, body: { email: n10, type: s10, gotrue_meta_security: { captcha_token: null == i10 ? void 0 : i10.captchaToken }, code_challenge: a10, code_challenge_method: o2 }, redirectTo: this._maybeAppendFlowIdToRedirect(null == i10 ? void 0 : i10.emailRedirectTo, t10) });
              return l2 && await iW(this.storage, this.storageKey, t10), this._returnResult({ data: { user: null, session: null }, error: l2 });
            }
            if ("phone" in e10) {
              let { phone: t11, type: n10, options: s10 } = e10, { data: i10, error: a10 } = await i6(this.fetch, "POST", r10, { headers: this.headers, body: { phone: t11, type: n10, gotrue_meta_security: { captcha_token: null == s10 ? void 0 : s10.captchaToken } } });
              return this._returnResult({ data: { user: null, session: null, messageId: null == i10 ? void 0 : i10.message_id }, error: a10 });
            }
            throw new ig("You must provide either an email or phone number and a type");
          } catch (e11) {
            if (await iW(this.storage, this.storageKey, t10), ia(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async getSession() {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => this._useSession(async (e10) => e10)) : await this._useSession(async (e10) => e10);
        }
        async _acquireLock(e10, t10) {
          this._debug("#_acquireLock", "begin", e10);
          try {
            if (this.lockAcquired) {
              let e11 = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), r10 = (async () => (await e11, await t10()))();
              return this.pendingInLock.push((async () => {
                try {
                  await r10;
                } catch (e12) {
                }
              })()), r10;
            }
            return await this.lock(`lock:${this.storageKey}`, e10, async () => {
              this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
              try {
                this.lockAcquired = true;
                let e11 = t10();
                for (this.pendingInLock.push((async () => {
                  try {
                    await e11;
                  } catch (e12) {
                  }
                })()), await e11; this.pendingInLock.length; ) {
                  let e12 = [...this.pendingInLock];
                  await Promise.all(e12), this.pendingInLock.splice(0, e12.length);
                }
                return await e11;
              } finally {
                this._debug("#_acquireLock", "lock released for storage key", this.storageKey), this.lockAcquired = false;
              }
            });
          } finally {
            this._debug("#_acquireLock", "end");
          }
        }
        async _useSession(e10) {
          this._debug("#_useSession", "begin");
          try {
            let t10 = await this.__loadSession();
            return await e10(t10);
          } finally {
            this._debug("#_useSession", "end");
          }
        }
        async __loadSession() {
          this._debug("#__loadSession()", "begin"), null == this.lock || this.lockAcquired || this._debug("#__loadSession()", "used outside of an acquired lock!", Error().stack);
          try {
            let t10 = null, r10 = await iN(this.storage, this.storageKey);
            if (this._debug("#getSession()", "session from storage", r10), null !== r10 && (this._isValidSession(r10) ? t10 = r10 : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !t10) return { data: { session: null }, error: null };
            let n10 = !!t10.expires_at && 1e3 * t10.expires_at - Date.now() < 9e4;
            if (this._debug("#__loadSession()", `session has${n10 ? "" : " not"} expired`, "expires_at", t10.expires_at), !n10) {
              if (this.userStorage) {
                let e11 = await iN(this.userStorage, this.storageKey + "-user");
                (null == e11 ? void 0 : e11.user) ? t10.user = e11.user : t10.user = i1();
              }
              if (this.storage.isServer && t10.user && !t10.user.__isUserNotAvailableProxy) {
                var e10;
                let r11 = { value: this.suppressGetSessionWarning };
                t10.user = (e10 = t10.user, new Proxy(e10, { get: (e11, t11, n11) => {
                  if ("__isInsecureUserWarningProxy" === t11) return true;
                  if ("symbol" == typeof t11) {
                    let r12 = t11.toString();
                    if ("Symbol(Symbol.toPrimitive)" === r12 || "Symbol(Symbol.toStringTag)" === r12 || "Symbol(util.inspect.custom)" === r12 || "Symbol(nodejs.util.inspect.custom)" === r12) return Reflect.get(e11, t11, n11);
                  }
                  return r11.value || "string" != typeof t11 || (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), r11.value = true), Reflect.get(e11, t11, n11);
                } })), r11.value && (this.suppressGetSessionWarning = true);
              }
              return { data: { session: t10 }, error: null };
            }
            let { data: s10, error: i10 } = await this._callRefreshToken(t10.refresh_token);
            if (i10) {
              if (t10.expires_at && 1e3 * t10.expires_at > Date.now()) {
                let e11 = await iN(this.storage, this.storageKey);
                if (e11 && e11.refresh_token === t10.refresh_token) return this._returnResult({ data: { session: t10 }, error: null });
              }
              return this._returnResult({ data: { session: null }, error: i10 });
            }
            return this._returnResult({ data: { session: s10 }, error: null });
          } finally {
            this._debug("#__loadSession()", "end");
          }
        }
        async getUser(e10) {
          let t10;
          return e10 ? await this._getUser(e10) : (await this.initializePromise, (t10 = null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._getUser()) : await this._getUser()).data.user && (this.suppressGetSessionWarning = true), t10);
        }
        async _getUser(e10) {
          try {
            if (e10) return await i6(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: e10, xform: ae });
            return await this._useSession(async (e11) => {
              var t10, r10, n10;
              let { data: s10, error: i10 } = e11;
              if (i10) throw i10;
              return (null == (t10 = s10.session) ? void 0 : t10.access_token) || this.hasCustomAuthorizationHeader ? await i6(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: null != (n10 = null == (r10 = s10.session) ? void 0 : r10.access_token) ? n10 : void 0, xform: ae }) : { data: { user: null }, error: new id() };
            });
          } catch (e11) {
            if (ia(e11)) return ih(e11) && await this._removeSession(), this._returnResult({ data: { user: null }, error: e11 });
            throw e11;
          }
        }
        async updateUser(e10, t10 = {}) {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._updateUser(e10, t10)) : await this._updateUser(e10, t10);
        }
        async _updateUser(e10, t10 = {}) {
          let r10 = null;
          try {
            return await this._useSession(async (n10) => {
              let { data: s10, error: i10 } = n10;
              if (i10) throw i10;
              if (!s10.session) throw new id();
              let a10 = s10.session, o2 = null, l2 = null;
              "pkce" === this.flowType && null != e10.email && ([o2, l2, r10] = await this._getCodeChallengeAndMethod());
              let { data: u2, error: c2 } = await i6(this.fetch, "PUT", `${this.url}/user`, { headers: this.headers, redirectTo: this._maybeAppendFlowIdToRedirect(null == t10 ? void 0 : t10.emailRedirectTo, r10), body: Object.assign(Object.assign({}, e10), { code_challenge: o2, code_challenge_method: l2 }), jwt: a10.access_token, xform: ae });
              if (c2) throw c2;
              return a10.user = u2.user, await this._saveSession(a10), await this._notifyAllSubscribers("USER_UPDATED", a10), this._returnResult({ data: { user: a10.user }, error: null });
            });
          } catch (e11) {
            if (await iW(this.storage, this.storageKey, r10), ia(e11)) return this._returnResult({ data: { user: null }, error: e11 });
            throw e11;
          }
        }
        async setSession(e10) {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._setSession(e10)) : await this._setSession(e10);
        }
        async _setSession(e10) {
          try {
            if (!e10.access_token || !e10.refresh_token) throw new id();
            let t10 = Date.now() / 1e3, r10 = t10, n10 = true, s10 = null, { payload: i10 } = i$(e10.access_token);
            if (i10.exp && (n10 = (r10 = i10.exp) <= t10), n10) {
              let { data: t11, error: r11 } = await this._callRefreshToken(e10.refresh_token);
              if (r11) return this._returnResult({ data: { user: null, session: null }, error: r11 });
              if (!t11) return { data: { user: null, session: null }, error: null };
              s10 = t11;
            } else {
              let { data: n11, error: i11 } = await this._getUser(e10.access_token);
              if (i11) return this._returnResult({ data: { user: null, session: null }, error: i11 });
              s10 = { access_token: e10.access_token, refresh_token: e10.refresh_token, user: n11.user, token_type: "bearer", expires_in: r10 - t10, expires_at: r10 }, await this._saveSession(s10), await this._notifyAllSubscribers("SIGNED_IN", s10);
            }
            return this._returnResult({ data: { user: s10.user, session: s10 }, error: null });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: { session: null, user: null }, error: e11 });
            throw e11;
          }
        }
        async refreshSession(e10) {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._refreshSession(e10)) : await this._refreshSession(e10);
        }
        async _refreshSession(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10;
              if (!e10) {
                let { data: n11, error: s11 } = t10;
                if (s11) throw s11;
                e10 = null != (r10 = n11.session) ? r10 : void 0;
              }
              if (!(null == e10 ? void 0 : e10.refresh_token)) throw new id();
              let { data: n10, error: s10 } = await this._callRefreshToken(e10.refresh_token);
              return s10 ? this._returnResult({ data: { user: null, session: null }, error: s10 }) : n10 ? this._returnResult({ data: { user: n10.user, session: n10 }, error: null }) : this._returnResult({ data: { user: null, session: null }, error: null });
            });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async _getSessionFromURL(e10, t10) {
          try {
            throw new im("No browser detected.");
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: { session: null, redirectType: null }, error: e11 });
            throw e11;
          }
        }
        _isImplicitGrantCallback(e10) {
          return "function" == typeof this.detectSessionInUrl ? this.detectSessionInUrl(new URL(window.location.href), e10) : !!(e10.access_token || e10.error || e10.error_description || e10.error_code);
        }
        async _isPKCECallback(e10) {
          if (!e10.code) return false;
          let t10 = iH(e10[is]);
          return !!(t10 && await iN(this.storage, iG(this.storageKey, t10))) || !!await iN(this.storage, `${this.storageKey}-code-verifier`);
        }
        async signOut(e10 = { scope: "global" }) {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._signOut(e10)) : await this._signOut(e10);
        }
        async _signOut({ scope: e10 } = { scope: "global" }) {
          return await this._useSession(async (t10) => {
            var r10;
            let n10 = async () => {
              await this._removeSession();
            }, { data: s10, error: i10 } = t10;
            if (i10 && !ih(i10)) return this._returnResult({ error: i10 });
            let a10 = null == (r10 = s10.session) ? void 0 : r10.access_token;
            if (a10) {
              let { error: t11 } = await this.admin.signOut(a10, e10);
              if (t11 && !(il(t11) && (404 === t11.status || 401 === t11.status || 403 === t11.status) || ih(t11))) return "others" !== e10 && await n10(), this._returnResult({ error: t11 });
            }
            return "others" !== e10 && await n10(), this._returnResult({ error: null });
          });
        }
        onAuthStateChange(e10) {
          let t10 = Symbol("auth-callback"), r10 = { id: t10, callback: e10, unsubscribe: () => {
            this._debug("#unsubscribe()", "state change callback with id removed", t10), this.stateChangeEmitters.delete(t10);
          } };
          return this._debug("#onAuthStateChange()", "registered callback with id", t10), this.stateChangeEmitters.set(t10, r10), (async () => {
            await this.initializePromise, null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => {
              this._emitInitialSession(t10);
            }) : await this._emitInitialSession(t10);
          })(), { data: { subscription: r10 } };
        }
        async _emitInitialSession(e10) {
          return await this._useSession(async (t10) => {
            var r10, n10;
            try {
              let { data: { session: n11 }, error: s10 } = t10;
              if (s10) throw s10;
              await (null == (r10 = this.stateChangeEmitters.get(e10)) ? void 0 : r10.callback("INITIAL_SESSION", n11)), this._debug("INITIAL_SESSION", "callback id", e10, "session", n11);
            } catch (t11) {
              await (null == (n10 = this.stateChangeEmitters.get(e10)) ? void 0 : n10.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e10, "error", t11), ih(t11) || ib(t11) || il(t11) && ("refresh_token_not_found" === t11.code || "refresh_token_already_used" === t11.code || "session_expired" === t11.code) ? console.warn(t11) : console.error(t11);
            }
          });
        }
        async resetPasswordForEmail(e10, t10 = {}) {
          let r10 = null, n10 = null, s10 = null;
          "pkce" === this.flowType && ([r10, n10, s10] = await this._getCodeChallengeAndMethod(true));
          try {
            return await i6(this.fetch, "POST", `${this.url}/recover`, { body: { email: e10, code_challenge: r10, code_challenge_method: n10, gotrue_meta_security: { captcha_token: t10.captchaToken } }, headers: this.headers, redirectTo: this._maybeAppendFlowIdToRedirect(t10.redirectTo, s10) });
          } catch (e11) {
            if (await iW(this.storage, this.storageKey, s10), ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async getUserIdentities() {
          var e10;
          try {
            let { data: t10, error: r10 } = await this.getUser();
            if (r10) throw r10;
            return this._returnResult({ data: { identities: null != (e10 = t10.user.identities) ? e10 : [] }, error: null });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async linkIdentity(e10) {
          return "token" in e10 ? this.linkIdentityIdToken(e10) : this.linkIdentityOAuth(e10);
        }
        async linkIdentityOAuth(e10) {
          let t10 = null;
          try {
            let { data: r10, error: n10 } = await this._useSession(async (r11) => {
              var n11, s10, i10, a10, o2;
              let { data: l2, error: u2 } = r11;
              if (u2) throw u2;
              let { url: c2, flowId: d2 } = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e10.provider, { redirectTo: null == (n11 = e10.options) ? void 0 : n11.redirectTo, scopes: null == (s10 = e10.options) ? void 0 : s10.scopes, queryParams: null == (i10 = e10.options) ? void 0 : i10.queryParams, skipBrowserRedirect: true });
              return t10 = d2, await i6(this.fetch, "GET", c2, { headers: this.headers, jwt: null != (o2 = null == (a10 = l2.session) ? void 0 : a10.access_token) ? o2 : void 0 });
            });
            if (n10) throw n10;
            return this._returnResult({ data: { provider: e10.provider, url: null == r10 ? void 0 : r10.url, flowId: t10 }, error: null });
          } catch (r10) {
            if (ia(r10)) return this._returnResult({ data: { provider: e10.provider, url: null, flowId: t10 }, error: r10 });
            throw r10;
          }
        }
        async linkIdentityIdToken(e10) {
          return await this._useSession(async (t10) => {
            var r10;
            try {
              let { error: n10, data: { session: s10 } } = t10;
              if (n10) throw n10;
              let { options: i10, provider: a10, token: o2, access_token: l2, nonce: u2 } = e10, { data: c2, error: d2 } = await i6(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, jwt: null != (r10 = null == s10 ? void 0 : s10.access_token) ? r10 : void 0, body: { provider: a10, id_token: o2, access_token: l2, nonce: u2, link_identity: true, gotrue_meta_security: { captcha_token: null == i10 ? void 0 : i10.captchaToken } }, xform: i9 });
              if (d2) return this._returnResult({ data: { user: null, session: null }, error: d2 });
              if (!c2 || !c2.session || !c2.user) return this._returnResult({ data: { user: null, session: null }, error: new ip() });
              return c2.session && (await this._saveSession(c2.session), await this._notifyAllSubscribers("USER_UPDATED", c2.session)), this._returnResult({ data: c2, error: d2 });
            } catch (e11) {
              if (await iW(this.storage, this.storageKey, null), ia(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
              throw e11;
            }
          });
        }
        async unlinkIdentity(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10, n10;
              let { data: s10, error: i10 } = t10;
              if (i10) throw i10;
              return await i6(this.fetch, "DELETE", `${this.url}/user/identities/${e10.identity_id}`, { headers: this.headers, jwt: null != (n10 = null == (r10 = s10.session) ? void 0 : r10.access_token) ? n10 : void 0 });
            });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _refreshAccessToken(e10) {
          let t10 = "#_refreshAccessToken()";
          this._debug(t10, "begin");
          try {
            var r10, n10;
            let s10 = Date.now();
            return await (r10 = async (r11) => (r11 > 0 && await iM(200 * Math.pow(2, r11 - 1)), this._debug(t10, "refreshing attempt", r11), await i6(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, { body: { refresh_token: e10 }, headers: this.headers, xform: i9 })), n10 = (e11, t11) => {
              let r11 = 200 * Math.pow(2, e11);
              return t11 && ib(t11) && Date.now() + r11 - s10 < 3e4;
            }, new Promise((e11, t11) => {
              (async () => {
                for (let s11 = 0; s11 < 1 / 0; s11++) try {
                  let t12 = await r10(s11);
                  if (!n10(s11, null)) return void e11(t12);
                } catch (e12) {
                  if (!n10(s11, e12)) return void t11(e12);
                }
              })();
            }));
          } catch (e11) {
            if (this._debug(t10, "error", e11), ia(e11)) return this._returnResult({ data: { session: null, user: null }, error: e11 });
            throw e11;
          } finally {
            this._debug(t10, "end");
          }
        }
        _isValidSession(e10) {
          return "object" == typeof e10 && null !== e10 && "access_token" in e10 && "refresh_token" in e10 && "expires_at" in e10;
        }
        async _handleProviderSignIn(e10, t10) {
          let { url: r10, flowId: n10 } = await this._getUrlForProvider(`${this.url}/authorize`, e10, { redirectTo: t10.redirectTo, scopes: t10.scopes, queryParams: t10.queryParams });
          return this._debug("#_handleProviderSignIn()", "provider", e10, "options", t10, "url", r10), { data: { provider: e10, url: r10, flowId: n10 }, error: null };
        }
        async _recoverAndRefresh() {
          var e10, t10;
          let r10 = "#_recoverAndRefresh()";
          this._debug(r10, "begin");
          try {
            let n10 = await iN(this.storage, this.storageKey);
            if (n10 && this.userStorage) {
              let t11 = await iN(this.userStorage, this.storageKey + "-user");
              !this.storage.isServer && Object.is(this.storage, this.userStorage) && !t11 && (t11 = { user: n10.user }, await iI(this.userStorage, this.storageKey + "-user", t11)), n10.user = null != (e10 = null == t11 ? void 0 : t11.user) ? e10 : i1();
            } else if (n10 && !n10.user && !n10.user) {
              let e11 = await iN(this.storage, this.storageKey + "-user");
              e11 && (null == e11 ? void 0 : e11.user) ? (n10.user = e11.user, await ij(this.storage, this.storageKey + "-user"), await iI(this.storage, this.storageKey, n10)) : n10.user = i1();
            }
            if (this._debug(r10, "session from storage", n10), !this._isValidSession(n10)) {
              this._debug(r10, "session is not valid"), null !== n10 && await this._removeSession();
              return;
            }
            let s10 = (null != (t10 = n10.expires_at) ? t10 : 1 / 0) * 1e3 - Date.now() < 9e4;
            if (this._debug(r10, `session has${s10 ? "" : " not"} expired with margin of 90000s`), s10) {
              if (this.autoRefreshToken && n10.refresh_token) {
                let { error: e11 } = await this._callRefreshToken(n10.refresh_token);
                e11 && (ia(e11) && "AuthRefreshDiscardedError" === e11.name ? this._debug(r10, "refresh discarded by commit guard", e11) : this._debug(r10, "refresh failed", e11));
              }
            } else if (n10.user && true === n10.user.__isUserNotAvailableProxy) try {
              let { data: e11, error: t11 } = await this._getUser(n10.access_token);
              !t11 && (null == e11 ? void 0 : e11.user) ? (n10.user = e11.user, await this._saveSession(n10), await this._notifyAllSubscribers("SIGNED_IN", n10)) : this._debug(r10, "could not get user data, skipping SIGNED_IN notification");
            } catch (e11) {
              console.error("Error getting user data:", e11), this._debug(r10, "error getting user data, skipping SIGNED_IN notification", e11);
            }
            else await this._notifyAllSubscribers("SIGNED_IN", n10);
          } catch (e11) {
            this._debug(r10, "error", e11), ib(e11) ? console.warn(e11) : console.error(e11);
            return;
          } finally {
            this._debug(r10, "end");
          }
        }
        async _callRefreshToken(e10) {
          var t10, r10;
          if (!e10) throw new id();
          if (this.refreshingDeferred) return this.refreshingDeferred.promise;
          if (this.lastRefreshFailure && this.lastRefreshFailure.refreshToken === e10 && Date.now() < this.lastRefreshFailure.expiresAt) return this._debug("#_callRefreshToken()", "returning cached failure (cooldown active)"), this.lastRefreshFailure.result;
          let n10 = "#_callRefreshToken()";
          this._debug(n10, "begin");
          try {
            this.refreshingDeferred = new iL();
            let t11 = await iN(this.storage, this.storageKey), { data: r11, error: s10 } = await this._refreshAccessToken(e10);
            if (s10) throw s10;
            if (!r11.session) throw new id();
            let i10 = await iN(this.storage, this.storageKey);
            if (null !== t11 && (null === i10 || i10.refresh_token !== t11.refresh_token)) {
              this._debug(n10, "commit guard: storage changed since refresh started, discarding rotated tokens", { startedWith: "present", nowHolds: i10 ? "replaced" : "cleared" });
              let e11 = { data: null, error: new iw() };
              return this.refreshingDeferred.resolve(e11), e11;
            }
            let a10 = this._sessionRemovalEpoch;
            if (await this._saveSession(r11.session), this._sessionRemovalEpoch !== a10) {
              this._debug(n10, "commit guard (post-save): _removeSession ran during _saveSession, undoing write"), await ij(this.storage, this.storageKey), this.userStorage && await ij(this.userStorage, this.storageKey + "-user");
              let e11 = { data: null, error: new iw() };
              return this.refreshingDeferred.resolve(e11), e11;
            }
            await this._notifyAllSubscribers("TOKEN_REFRESHED", r11.session);
            let o2 = { data: r11.session, error: null };
            return this.lastRefreshFailure = null, this.refreshingDeferred.resolve(o2), o2;
          } catch (s10) {
            if (this._debug(n10, "error", s10), ia(s10)) {
              let r11 = { data: null, error: s10 };
              if (!ib(s10)) {
                let e11 = await iN(this.storage, this.storageKey);
                (null == e11 ? void 0 : e11.expires_at) && 1e3 * e11.expires_at > Date.now() ? this._debug(n10, "proactive refresh failed, access token still valid \u2014 preserving session") : await this._removeSession();
              }
              return this.lastRefreshFailure = { refreshToken: e10, result: r11, expiresAt: Date.now() + 6e4 }, null == (t10 = this.refreshingDeferred) || t10.resolve(r11), r11;
            }
            throw null == (r10 = this.refreshingDeferred) || r10.reject(s10), s10;
          } finally {
            this.refreshingDeferred = null, this._debug(n10, "end");
          }
        }
        async _notifyAllSubscribers(e10, t10, r10 = true) {
          if (null !== this._pendingInitNotifications && r10) return void this._pendingInitNotifications.push({ event: e10, session: t10, broadcast: r10 });
          let n10 = `#_notifyAllSubscribers(${e10})`;
          this._debug(n10, "begin", t10, `broadcast = ${r10}`);
          try {
            this.broadcastChannel && r10 && this.broadcastChannel.postMessage({ event: e10, session: t10 });
            let n11 = [], s10 = Array.from(this.stateChangeEmitters.values()).map(async (r11) => {
              try {
                await r11.callback(e10, t10);
              } catch (e11) {
                n11.push(e11);
              }
            });
            if (await Promise.all(s10), n11.length > 0) {
              for (let e11 = 0; e11 < n11.length; e11 += 1) console.error(n11[e11]);
              throw n11[0];
            }
          } finally {
            this._debug(n10, "end");
          }
        }
        async _saveSession(e10) {
          this._debug("#_saveSession()", e10), this.suppressGetSessionWarning = true;
          let t10 = Object.assign({}, e10), r10 = t10.user && true === t10.user.__isUserNotAvailableProxy;
          if (this.userStorage) {
            !r10 && t10.user && await iI(this.userStorage, this.storageKey + "-user", { user: t10.user });
            let e11 = Object.assign({}, t10);
            delete e11.user;
            let n10 = i2(e11);
            await iI(this.storage, this.storageKey, n10);
          } else {
            let e11 = i2(t10);
            await iI(this.storage, this.storageKey, e11);
          }
        }
        async _removeSession() {
          this._sessionRemovalEpoch += 1, this._debug("#_removeSession()"), this.lastRefreshFailure = null, this.suppressGetSessionWarning = false, await ij(this.storage, this.storageKey), await iJ(this.storage, this.storageKey), await ij(this.storage, this.storageKey + "-user"), this.userStorage && await ij(this.userStorage, this.storageKey + "-user"), await this._notifyAllSubscribers("SIGNED_OUT", null);
        }
        _removeVisibilityChangedCallback() {
          this._debug("#_removeVisibilityChangedCallback()"), this.visibilityChangedCallback, this.visibilityChangedCallback = null;
        }
        async _startAutoRefresh() {
          await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
          let e10 = setInterval(() => this._autoRefreshTokenTick(), 3e4);
          this.autoRefreshTicker = e10, e10 && "object" == typeof e10 && "function" == typeof e10.unref ? e10.unref() : "u" > typeof Deno && "function" == typeof Deno.unrefTimer && Deno.unrefTimer(e10);
          let t10 = setTimeout(async () => {
            await this.initializePromise, await this._autoRefreshTokenTick();
          }, 0);
          this.autoRefreshTickTimeout = t10, t10 && "object" == typeof t10 && "function" == typeof t10.unref ? t10.unref() : "u" > typeof Deno && "function" == typeof Deno.unrefTimer && Deno.unrefTimer(t10);
        }
        async _stopAutoRefresh() {
          this._debug("#_stopAutoRefresh()");
          let e10 = this.autoRefreshTicker;
          this.autoRefreshTicker = null, e10 && clearInterval(e10);
          let t10 = this.autoRefreshTickTimeout;
          this.autoRefreshTickTimeout = null, t10 && clearTimeout(t10);
        }
        async startAutoRefresh() {
          this._removeVisibilityChangedCallback(), await this._startAutoRefresh();
        }
        async stopAutoRefresh() {
          this._removeVisibilityChangedCallback(), await this._stopAutoRefresh();
        }
        async dispose() {
          var e10;
          this._removeVisibilityChangedCallback(), await this._stopAutoRefresh(), null == (e10 = this.broadcastChannel) || e10.close(), this.broadcastChannel = null, this.stateChangeEmitters.clear();
        }
        async _autoRefreshTokenTick() {
          if (this._debug("#_autoRefreshTokenTick()", "begin"), null != this.lock) {
            try {
              await this._acquireLock(0, async () => {
                try {
                  let e10 = Date.now();
                  try {
                    return await this._useSession(async (t10) => {
                      let { data: { session: r10 } } = t10;
                      if (!r10 || !r10.refresh_token || !r10.expires_at) return void this._debug("#_autoRefreshTokenTick()", "no session");
                      let n10 = Math.floor((1e3 * r10.expires_at - e10) / 3e4);
                      this._debug("#_autoRefreshTokenTick()", `access token expires in ${n10} ticks, a tick lasts 30000ms, refresh threshold is 3 ticks`), n10 <= 3 && await this._callRefreshToken(r10.refresh_token);
                    });
                  } catch (e11) {
                    console.error("Auto refresh tick failed with error. This is likely a transient error.", e11);
                  }
                } finally {
                  this._debug("#_autoRefreshTokenTick()", "end");
                }
              });
            } catch (e10) {
              if (e10 instanceof ao) this._debug("auto refresh token tick lock not available");
              else throw e10;
            }
            return;
          }
          if (null !== this.refreshingDeferred) return void this._debug("#_autoRefreshTokenTick()", "refresh already in flight, skipping");
          try {
            let e10 = Date.now();
            try {
              await this._useSession(async (t10) => {
                let { data: { session: r10 } } = t10;
                if (!r10 || !r10.refresh_token || !r10.expires_at) return void this._debug("#_autoRefreshTokenTick()", "no session");
                let n10 = Math.floor((1e3 * r10.expires_at - e10) / 3e4);
                this._debug("#_autoRefreshTokenTick()", `access token expires in ${n10} ticks, a tick lasts 30000ms, refresh threshold is 3 ticks`), n10 <= 3 && await this._callRefreshToken(r10.refresh_token);
              });
            } catch (e11) {
              console.error("Auto refresh tick failed with error. This is likely a transient error.", e11);
            }
          } finally {
            this._debug("#_autoRefreshTokenTick()", "end");
          }
        }
        async _handleVisibilityChange() {
          return this._debug("#_handleVisibilityChange()"), this.autoRefreshToken && this.startAutoRefresh(), false;
        }
        async _onVisibilityChanged(e10) {
          let t10 = `#_onVisibilityChanged(${e10})`;
          if (this._debug(t10, "visibilityState", document.visibilityState), "visible" === document.visibilityState) {
            if (this.autoRefreshToken && this._startAutoRefresh(), !e10) if (await this.initializePromise, null != this.lock) await this._acquireLock(this.lockAcquireTimeout, async () => {
              "visible" !== document.visibilityState ? this._debug(t10, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting") : await this._recoverAndRefresh();
            });
            else {
              if ("visible" !== document.visibilityState) return void this._debug(t10, "visibilityState is no longer visible, skipping recovery");
              await this._recoverAndRefresh();
            }
          } else "hidden" === document.visibilityState && this.autoRefreshToken && this._stopAutoRefresh();
        }
        async _getUrlForProvider(e10, t10, r10) {
          let n10 = null == r10 ? void 0 : r10.redirectTo, s10 = null, i10 = null, a10 = null;
          "pkce" === this.flowType && ([s10, i10, a10] = await this._getCodeChallengeAndMethod(), n10 = this._maybeAppendFlowIdToRedirect(n10, a10));
          let o2 = [`provider=${encodeURIComponent(t10)}`];
          if (n10 && o2.push(`redirect_to=${encodeURIComponent(n10)}`), (null == r10 ? void 0 : r10.scopes) && o2.push(`scopes=${encodeURIComponent(r10.scopes)}`), null != s10 && null != i10) {
            let e11 = new URLSearchParams({ code_challenge: `${encodeURIComponent(s10)}`, code_challenge_method: `${encodeURIComponent(i10)}` });
            o2.push(e11.toString());
          }
          if (null == r10 ? void 0 : r10.queryParams) {
            let e11 = new URLSearchParams(r10.queryParams);
            o2.push(e11.toString());
          }
          return (null == r10 ? void 0 : r10.skipBrowserRedirect) && o2.push(`skip_http_redirect=${r10.skipBrowserRedirect}`), { url: `${e10}?${o2.join("&")}`, flowId: a10 };
        }
        _maybeAppendFlowIdToRedirect(e10, t10) {
          return e10 && t10 && this.experimental.appendPkceFlowIdToRedirects ? function(e11, t11) {
            let r10 = e11.indexOf("#"), n10 = -1 === r10 ? e11 : e11.slice(0, r10), s10 = -1 === r10 ? "" : e11.slice(r10), i10 = n10.indexOf("?");
            if (-1 !== i10) {
              let e12 = n10.slice(0, i10), t12 = n10.slice(i10 + 1).split("&").filter((e13) => "" !== e13 && e13 !== is && !e13.startsWith(`${is}=`));
              n10 = t12.length > 0 ? `${e12}?${t12.join("&")}` : e12;
            }
            let a10 = n10.includes("?") ? "&" : "?";
            return `${n10}${a10}${is}=${encodeURIComponent(t11)}${s10}`;
          }(e10, t10) : null != e10 ? e10 : void 0;
        }
        async _getCodeChallengeAndMethod(e10 = false) {
          return iX(this.storage, this.storageKey, e10, (e11) => this._debug("#_getCodeChallengeAndMethod()", "evicted oldest pending PKCE verifier slot", e11));
        }
        async _unenroll(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10;
              let { data: n10, error: s10 } = t10;
              return s10 ? this._returnResult({ data: null, error: s10 }) : await i6(this.fetch, "DELETE", `${this.url}/factors/${e10.factorId}`, { headers: this.headers, jwt: null == (r10 = null == n10 ? void 0 : n10.session) ? void 0 : r10.access_token });
            });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _enroll(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10, n10;
              let { data: s10, error: i10 } = t10;
              if (i10) return this._returnResult({ data: null, error: i10 });
              let a10 = Object.assign({ friendly_name: e10.friendlyName, factor_type: e10.factorType }, "phone" === e10.factorType ? { phone: e10.phone } : "totp" === e10.factorType ? { issuer: e10.issuer } : {}), { data: o2, error: l2 } = await i6(this.fetch, "POST", `${this.url}/factors`, { body: a10, headers: this.headers, jwt: null == (r10 = null == s10 ? void 0 : s10.session) ? void 0 : r10.access_token });
              return l2 ? this._returnResult({ data: null, error: l2 }) : ("totp" === e10.factorType && "totp" === o2.type && (null == (n10 = null == o2 ? void 0 : o2.totp) ? void 0 : n10.qr_code) && (o2.totp.qr_code = `data:image/svg+xml;utf-8,${o2.totp.qr_code}`), this._returnResult({ data: o2, error: null }));
            });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _verify(e10) {
          let t10 = async () => {
            try {
              return await this._useSession(async (t11) => {
                var r10;
                let { data: n10, error: s10 } = t11;
                if (s10) return this._returnResult({ data: null, error: s10 });
                let i10 = Object.assign({ challenge_id: e10.challengeId }, "webauthn" in e10 ? { webauthn: Object.assign(Object.assign({}, e10.webauthn), { credential_response: "create" === e10.webauthn.type ? af(e10.webauthn.credential_response) : ag(e10.webauthn.credential_response) }) } : { code: e10.code }), { data: a10, error: o2 } = await i6(this.fetch, "POST", `${this.url}/factors/${e10.factorId}/verify`, { body: i10, headers: this.headers, jwt: null == (r10 = null == n10 ? void 0 : n10.session) ? void 0 : r10.access_token });
                return o2 ? this._returnResult({ data: null, error: o2 }) : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + a10.expires_in }, a10)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", a10), this._returnResult({ data: a10, error: o2 }));
              });
            } catch (e11) {
              if (ia(e11)) return this._returnResult({ data: null, error: e11 });
              throw e11;
            }
          };
          return null != this.lock ? this._acquireLock(this.lockAcquireTimeout, t10) : t10();
        }
        async _challenge(e10) {
          let t10 = async () => {
            try {
              return await this._useSession(async (t11) => {
                var r10;
                let { data: n10, error: s10 } = t11;
                if (s10) return this._returnResult({ data: null, error: s10 });
                let i10 = await i6(this.fetch, "POST", `${this.url}/factors/${e10.factorId}/challenge`, { body: e10, headers: this.headers, jwt: null == (r10 = null == n10 ? void 0 : n10.session) ? void 0 : r10.access_token });
                if (i10.error) return i10;
                let { data: a10 } = i10;
                if ("webauthn" !== a10.type) return { data: a10, error: null };
                switch (a10.webauthn.type) {
                  case "create":
                    return { data: Object.assign(Object.assign({}, a10), { webauthn: Object.assign(Object.assign({}, a10.webauthn), { credential_options: Object.assign(Object.assign({}, a10.webauthn.credential_options), { publicKey: ah(a10.webauthn.credential_options.publicKey) }) }) }), error: null };
                  case "request":
                    return { data: Object.assign(Object.assign({}, a10), { webauthn: Object.assign(Object.assign({}, a10.webauthn), { credential_options: Object.assign(Object.assign({}, a10.webauthn.credential_options), { publicKey: ap(a10.webauthn.credential_options.publicKey) }) }) }), error: null };
                }
              });
            } catch (e11) {
              if (ia(e11)) return this._returnResult({ data: null, error: e11 });
              throw e11;
            }
          };
          return null != this.lock ? this._acquireLock(this.lockAcquireTimeout, t10) : t10();
        }
        async _challengeAndVerify(e10) {
          let { data: t10, error: r10 } = await this._challenge({ factorId: e10.factorId });
          return r10 ? this._returnResult({ data: null, error: r10 }) : await this._verify({ factorId: e10.factorId, challengeId: t10.id, code: e10.code });
        }
        async _listFactors() {
          var e10;
          let { data: { user: t10 }, error: r10 } = await this.getUser();
          if (r10) return { data: null, error: r10 };
          let n10 = { all: [], phone: [], totp: [], webauthn: [] };
          for (let r11 of null != (e10 = null == t10 ? void 0 : t10.factors) ? e10 : []) n10.all.push(r11), "verified" === r11.status && n10[r11.factor_type].push(r11);
          return { data: n10, error: null };
        }
        async _getAuthenticatorAssuranceLevel(e10) {
          var t10, r10, n10, s10;
          if (e10) try {
            let { payload: n11 } = i$(e10), s11 = null;
            n11.aal && (s11 = n11.aal);
            let i11 = s11, { data: { user: a11 }, error: o3 } = await this.getUser(e10);
            if (o3) return this._returnResult({ data: null, error: o3 });
            (null != (r10 = null == (t10 = null == a11 ? void 0 : a11.factors) ? void 0 : t10.filter((e11) => "verified" === e11.status)) ? r10 : []).length > 0 && (i11 = "aal2");
            let l3 = n11.amr || [];
            return { data: { currentLevel: s11, nextLevel: i11, currentAuthenticationMethods: l3 }, error: null };
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
          let { data: { session: i10 }, error: a10 } = await this.getSession();
          if (a10) return this._returnResult({ data: null, error: a10 });
          if (!i10) return { data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] }, error: null };
          let { payload: o2 } = i$(i10.access_token), l2 = null;
          o2.aal && (l2 = o2.aal);
          let u2 = l2;
          return (null != (s10 = null == (n10 = i10.user.factors) ? void 0 : n10.filter((e11) => "verified" === e11.status)) ? s10 : []).length > 0 && (u2 = "aal2"), { data: { currentLevel: l2, nextLevel: u2, currentAuthenticationMethods: o2.amr || [] }, error: null };
        }
        async _getAuthorizationDetails(e10) {
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: n10 } = t10;
              return n10 ? this._returnResult({ data: null, error: n10 }) : r10 ? await i6(this.fetch, "GET", `${this.url}/oauth/authorizations/${e10}`, { headers: this.headers, jwt: r10.access_token, xform: (e11) => ({ data: e11, error: null }) }) : this._returnResult({ data: null, error: new id() });
            });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _approveAuthorization(e10, t10) {
          try {
            return await this._useSession(async (t11) => {
              let { data: { session: r10 }, error: n10 } = t11;
              if (n10) return this._returnResult({ data: null, error: n10 });
              if (!r10) return this._returnResult({ data: null, error: new id() });
              let s10 = await i6(this.fetch, "POST", `${this.url}/oauth/authorizations/${e10}/consent`, { headers: this.headers, jwt: r10.access_token, body: { action: "approve" }, xform: (e11) => ({ data: e11, error: null }) });
              return s10.data && s10.data.redirect_url, s10;
            });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _denyAuthorization(e10, t10) {
          try {
            return await this._useSession(async (t11) => {
              let { data: { session: r10 }, error: n10 } = t11;
              if (n10) return this._returnResult({ data: null, error: n10 });
              if (!r10) return this._returnResult({ data: null, error: new id() });
              let s10 = await i6(this.fetch, "POST", `${this.url}/oauth/authorizations/${e10}/consent`, { headers: this.headers, jwt: r10.access_token, body: { action: "deny" }, xform: (e11) => ({ data: e11, error: null }) });
              return s10.data && s10.data.redirect_url, s10;
            });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _listOAuthGrants() {
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              return r10 ? this._returnResult({ data: null, error: r10 }) : t10 ? await i6(this.fetch, "GET", `${this.url}/user/oauth/grants`, { headers: this.headers, jwt: t10.access_token, xform: (e11) => ({ data: e11, error: null }) }) : this._returnResult({ data: null, error: new id() });
            });
          } catch (e10) {
            if (ia(e10)) return this._returnResult({ data: null, error: e10 });
            throw e10;
          }
        }
        async _revokeOAuthGrant(e10) {
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: n10 } = t10;
              return n10 ? this._returnResult({ data: null, error: n10 }) : r10 ? (await i6(this.fetch, "DELETE", `${this.url}/user/oauth/grants`, { headers: this.headers, jwt: r10.access_token, query: { client_id: e10.clientId }, noResolveJson: true }), { data: {}, error: null }) : this._returnResult({ data: null, error: new id() });
            });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async fetchJwk(e10, t10 = { keys: [] }) {
          let r10 = t10.keys.find((t11) => t11.kid === e10);
          if (r10) return r10;
          let n10 = Date.now();
          if ((r10 = this.jwks.keys.find((t11) => t11.kid === e10)) && this.jwks_cached_at + 6e5 > n10) return r10;
          let { data: s10, error: i10 } = await i6(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, { headers: this.headers });
          if (i10) throw i10;
          return s10.keys && 0 !== s10.keys.length && (this.jwks = s10, this.jwks_cached_at = n10, r10 = s10.keys.find((t11) => t11.kid === e10)) ? r10 : null;
        }
        async getClaims(e10, t10 = {}) {
          try {
            let s10, i10 = e10;
            if (!i10) {
              let { data: e11, error: t11 } = await this.getSession();
              if (t11 || !e11.session) return this._returnResult({ data: null, error: t11 });
              i10 = e11.session.access_token;
            }
            let { header: a10, payload: o2, signature: l2, raw: { header: u2, payload: c2 } } = i$(i10);
            if (!(null == t10 ? void 0 : t10.allowExpired)) try {
              var r10, n10 = o2.exp;
              if (!n10) throw Error("Missing exp claim");
              if (n10 <= Math.floor(Date.now() / 1e3)) throw Error("JWT has expired");
            } catch (e11) {
              throw new iE(e11 instanceof Error ? e11.message : "JWT validation failed");
            }
            let d2 = !a10.alg || a10.alg.startsWith("HS") || !a10.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(a10.kid, (null == t10 ? void 0 : t10.keys) ? { keys: t10.keys } : null == t10 ? void 0 : t10.jwks);
            if (!d2) {
              let { error: e11 } = await this.getUser(i10);
              if (e11) throw e11;
              return { data: { claims: o2, header: a10, signature: l2 }, error: null };
            }
            let h2 = function(e11) {
              switch (e11) {
                case "RS256":
                  return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
                case "ES256":
                  return { name: "ECDSA", namedCurve: "P-256", hash: { name: "SHA-256" } };
                default:
                  throw Error("Invalid alg claim");
              }
            }(a10.alg), p2 = await crypto.subtle.importKey("jwk", d2, h2, true, ["verify"]);
            if (!await crypto.subtle.verify(h2, p2, l2, (r10 = `${u2}.${c2}`, s10 = [], !function(e11, t11) {
              for (let r11 = 0; r11 < e11.length; r11 += 1) {
                let n11 = e11.charCodeAt(r11);
                if (n11 > 55295 && n11 <= 56319) {
                  let t12 = (n11 - 55296) * 1024 & 65535;
                  n11 = (e11.charCodeAt(r11 + 1) - 56320 & 65535 | t12) + 65536, r11 += 1;
                }
                !function(e12, t12) {
                  if (e12 <= 127) return t12(e12);
                  if (e12 <= 2047) {
                    t12(192 | e12 >> 6), t12(128 | 63 & e12);
                    return;
                  }
                  if (e12 <= 65535) {
                    t12(224 | e12 >> 12), t12(128 | e12 >> 6 & 63), t12(128 | 63 & e12);
                    return;
                  }
                  if (e12 <= 1114111) {
                    t12(240 | e12 >> 18), t12(128 | e12 >> 12 & 63), t12(128 | e12 >> 6 & 63), t12(128 | 63 & e12);
                    return;
                  }
                  throw Error(`Unrecognized Unicode codepoint: ${e12.toString(16)}`);
                }(n11, t11);
              }
            }(r10, (e11) => s10.push(e11)), new Uint8Array(s10)))) throw new iE("Invalid JWT signature");
            return { data: { claims: o2, header: a10, signature: l2 }, error: null };
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async signInWithPasskey(e10) {
          var t10, r10, n10;
          i0(this.experimental);
          try {
            1;
            return this._returnResult({ data: null, error: new iu("Browser does not support WebAuthn", null) });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async registerPasskey(e10) {
          var t10, r10;
          i0(this.experimental);
          try {
            1;
            return this._returnResult({ data: null, error: new iu("Browser does not support WebAuthn", null) });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _startPasskeyRegistration() {
          i0(this.experimental);
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              if (r10) return this._returnResult({ data: null, error: r10 });
              if (!t10) return this._returnResult({ data: null, error: new id() });
              let { data: n10, error: s10 } = await i6(this.fetch, "POST", `${this.url}/passkeys/registration/options`, { headers: this.headers, jwt: t10.access_token, body: {} });
              return s10 ? this._returnResult({ data: null, error: s10 }) : this._returnResult({ data: n10, error: null });
            });
          } catch (e10) {
            if (ia(e10)) return this._returnResult({ data: null, error: e10 });
            throw e10;
          }
        }
        async _verifyPasskeyRegistration(e10) {
          i0(this.experimental);
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: n10 } = t10;
              if (n10) return this._returnResult({ data: null, error: n10 });
              if (!r10) return this._returnResult({ data: null, error: new id() });
              let { data: s10, error: i10 } = await i6(this.fetch, "POST", `${this.url}/passkeys/registration/verify`, { headers: this.headers, jwt: r10.access_token, body: { challenge_id: e10.challengeId, credential: e10.credential } });
              return i10 ? this._returnResult({ data: null, error: i10 }) : this._returnResult({ data: s10, error: null });
            });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _startPasskeyAuthentication(e10) {
          var t10;
          i0(this.experimental);
          try {
            let { data: r10, error: n10 } = await i6(this.fetch, "POST", `${this.url}/passkeys/authentication/options`, { headers: this.headers, body: { gotrue_meta_security: { captcha_token: null == (t10 = null == e10 ? void 0 : e10.options) ? void 0 : t10.captchaToken } } });
            if (n10) return this._returnResult({ data: null, error: n10 });
            return this._returnResult({ data: r10, error: null });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _verifyPasskeyAuthentication(e10) {
          i0(this.experimental);
          try {
            let { data: t10, error: r10 } = await i6(this.fetch, "POST", `${this.url}/passkeys/authentication/verify`, { headers: this.headers, body: { challenge_id: e10.challengeId, credential: e10.credential }, xform: i9 });
            if (r10) return this._returnResult({ data: null, error: r10 });
            return t10.session && (await this._saveSession(t10.session), await this._notifyAllSubscribers("SIGNED_IN", t10.session)), this._returnResult({ data: t10, error: null });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _listPasskeys() {
          i0(this.experimental);
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              if (r10) return this._returnResult({ data: null, error: r10 });
              if (!t10) return this._returnResult({ data: null, error: new id() });
              let { data: n10, error: s10 } = await i6(this.fetch, "GET", `${this.url}/passkeys`, { headers: this.headers, jwt: t10.access_token, xform: (e11) => ({ data: e11, error: null }) });
              return s10 ? this._returnResult({ data: null, error: s10 }) : this._returnResult({ data: n10, error: null });
            });
          } catch (e10) {
            if (ia(e10)) return this._returnResult({ data: null, error: e10 });
            throw e10;
          }
        }
        async _updatePasskey(e10) {
          i0(this.experimental);
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: n10 } = t10;
              if (n10) return this._returnResult({ data: null, error: n10 });
              if (!r10) return this._returnResult({ data: null, error: new id() });
              let { data: s10, error: i10 } = await i6(this.fetch, "PATCH", `${this.url}/passkeys/${e10.passkeyId}`, { headers: this.headers, jwt: r10.access_token, body: { friendly_name: e10.friendlyName } });
              return i10 ? this._returnResult({ data: null, error: i10 }) : this._returnResult({ data: s10, error: null });
            });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _deletePasskey(e10) {
          i0(this.experimental);
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: n10 } = t10;
              if (n10) return this._returnResult({ data: null, error: n10 });
              if (!r10) return this._returnResult({ data: null, error: new id() });
              let { error: s10 } = await i6(this.fetch, "DELETE", `${this.url}/passkeys/${e10.passkeyId}`, { headers: this.headers, jwt: r10.access_token, noResolveJson: true });
              return s10 ? this._returnResult({ data: null, error: s10 }) : this._returnResult({ data: null, error: null });
            });
          } catch (e11) {
            if (ia(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
      }
      aT.nextInstanceID = {};
      let aR = aT, aO = "";
      if ("u" > typeof Deno) aO = "deno", a = null == (eR = Deno.version) ? void 0 : eR.deno;
      else if ("u" > typeof document) aO = "web";
      else if ("u" > typeof navigator && "ReactNative" === navigator.product) aO = "react-native";
      else {
        aO = "node";
        let e10 = globalThis.process;
        a = null == e10 || null == (eO = e10.version) ? void 0 : eO.replace(/^v/, "");
      }
      let aC = [`runtime=${aO}`];
      a && aC.push(`runtime-version=${a}`);
      let ax = { headers: { "X-Client-Info": `supabase-js/2.112.2; ${aC.join("; ")}` } }, aP = { schema: "public" }, aA = { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, flowType: "implicit" }, aI = {}, aN = { enabled: false, respectSamplingDecision: true };
      function aj(e10) {
        return (aj = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e11) {
          return typeof e11;
        } : function(e11) {
          return e11 && "function" == typeof Symbol && e11.constructor === Symbol && e11 !== Symbol.prototype ? "symbol" : typeof e11;
        })(e10);
      }
      function aL(e10, t10) {
        var r10 = Object.keys(e10);
        if (Object.getOwnPropertySymbols) {
          var n10 = Object.getOwnPropertySymbols(e10);
          t10 && (n10 = n10.filter(function(t11) {
            return Object.getOwnPropertyDescriptor(e10, t11).enumerable;
          })), r10.push.apply(r10, n10);
        }
        return r10;
      }
      function a$(e10) {
        for (var t10 = 1; t10 < arguments.length; t10++) {
          var r10 = null != arguments[t10] ? arguments[t10] : {};
          t10 % 2 ? aL(Object(r10), true).forEach(function(t11) {
            !function(e11, t12, r11) {
              var n10;
              (n10 = function(e12, t13) {
                if ("object" != aj(e12) || !e12) return e12;
                var r12 = e12[Symbol.toPrimitive];
                if (void 0 !== r12) {
                  var n11 = r12.call(e12, t13 || "default");
                  if ("object" != aj(n11)) return n11;
                  throw TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === t13 ? String : Number)(e12);
              }(t12, "string"), (t12 = "symbol" == aj(n10) ? n10 : n10 + "") in e11) ? Object.defineProperty(e11, t12, { value: r11, enumerable: true, configurable: true, writable: true }) : e11[t12] = r11;
            }(e10, t11, r10[t11]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e10, Object.getOwnPropertyDescriptors(r10)) : aL(Object(r10)).forEach(function(t11) {
            Object.defineProperty(e10, t11, Object.getOwnPropertyDescriptor(r10, t11));
          });
        }
        return e10;
      }
      let aM = (e10) => e10.startsWith("sb_publishable_") || e10.startsWith("sb_secret_"), aD = /* @__PURE__ */ new Set(), aU = (e10, t10, r10, n10, s10, i10) => {
        let a10 = n10 ? (...e11) => n10(...e11) : (...e11) => fetch(...e11), o2 = Headers, l2 = (null == s10 ? void 0 : s10.enabled) === true, u2 = (null == s10 ? void 0 : s10.respectSamplingDecision) !== false, c2 = l2 ? function(e11) {
          let t11 = [];
          try {
            let r11 = new URL(e11);
            t11.push(r11.hostname);
          } catch (e12) {
          }
          return t11.push("*.supabase.co", "*.supabase.in"), t11.push("localhost", "127.0.0.1", "[::1]"), t11;
        }(t10) : null, d2 = !((null == i10 ? void 0 : i10.omitApiKeyAsBearer) && aM(e10));
        return async (t11, n11) => {
          let s11 = await r10(), i11 = new o2(null == n11 ? void 0 : n11.headers);
          if (i11.has("apikey") || i11.set("apikey", e10), !i11.has("Authorization")) {
            let t12 = null != s11 ? s11 : d2 ? e10 : null;
            t12 && i11.set("Authorization", `Bearer ${t12}`);
          }
          if (c2) {
            let e11 = function(e12, t12, r11) {
              let n12 = globalThis[nh];
              if (!n12) return aq || (aq = true, console.warn("@supabase/supabase-js: tracePropagation is enabled but the tracing runtime is not loaded, so trace headers will not be attached. Add `import '@supabase/supabase-js/tracing'` at your application entry point (requires the OpenTelemetry API package to be installed). The CDN/UMD build does not support trace propagation.")), null;
              if (!function(e13, t13) {
                let r12;
                if (!e13 || !t13 || 0 === t13.length) return false;
                if (e13 instanceof URL) r12 = e13;
                else try {
                  r12 = new URL(e13);
                } catch (e14) {
                  return false;
                }
                for (let e14 of t13) try {
                  if ("string" == typeof e14) {
                    if (function(e15, t14) {
                      if (t14 === e15) return true;
                      if (t14.startsWith("*.")) {
                        let r13 = t14.slice(2);
                        if (e15.endsWith(r13) && (e15 === r13 || e15.endsWith("." + r13))) return true;
                      }
                      return false;
                    }(r12.hostname, e14)) return true;
                  } else if (e14 instanceof RegExp) {
                    if (e14.test(r12.hostname)) return true;
                  } else if ("function" == typeof e14 && e14(r12)) return true;
                } catch (e15) {
                  continue;
                }
                return false;
              }("string" == typeof e12 || e12 instanceof URL ? e12 : e12.url, t12)) return null;
              let s12 = n12();
              if (!s12 || !s12.traceparent) return null;
              if (r11) {
                let e13 = function(e14) {
                  if (!e14 || "string" != typeof e14) return null;
                  let t13 = e14.split("-");
                  if (4 !== t13.length) return null;
                  let [r12, n13, s13, i12] = t13;
                  if (2 !== r12.length || 32 !== n13.length || 16 !== s13.length || 2 !== i12.length) return null;
                  let a11 = /^[0-9a-f]+$/i;
                  return a11.test(r12) && a11.test(n13) && a11.test(s13) && a11.test(i12) && "00000000000000000000000000000000" !== n13 && "0000000000000000" !== s13 ? { version: r12, traceId: n13, parentId: s13, traceFlags: i12, isSampled: (1 & parseInt(i12, 16)) == 1 } : null;
                }(s12.traceparent);
                if (e13 && !e13.isSampled) return null;
              }
              return s12;
            }(t11, c2, u2);
            e11 && (e11.traceparent && !i11.has("traceparent") && i11.set("traceparent", e11.traceparent), e11.tracestate && !i11.has("tracestate") && i11.set("tracestate", e11.tracestate), e11.baggage && !i11.has("baggage") && i11.set("baggage", e11.baggage));
          }
          return a10(t11, a$(a$({}, n11), {}, { headers: i11 }));
        };
      }, aq = false;
      function aB(e10) {
        return "boolean" == typeof e10 ? { enabled: e10 } : e10;
      }
      var aH = class extends aR {
        constructor(e10) {
          super(e10);
        }
      }, aG = class {
        constructor(e10, t10, r10) {
          var n10, s10, i10;
          this.supabaseUrl = e10, this.supabaseKey = t10;
          const a10 = function(e11) {
            let t11 = null == e11 ? void 0 : e11.trim();
            if (!t11) throw Error("supabaseUrl is required.");
            if (!t11.match(/^https?:\/\//i)) throw Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
            try {
              return new URL(t11.endsWith("/") ? t11 : t11 + "/");
            } catch (e12) {
              throw Error("Invalid supabaseUrl: Provided URL is malformed.");
            }
          }(e10);
          if (!t10) throw Error("supabaseKey is required.");
          ((e11) => {
            var t11, r11;
            if (!e11.startsWith("sb_") || aM(e11) || e11.startsWith("sb_temp_")) return;
            let n11 = null != (t11 = null == (r11 = e11.match(/^sb_[a-zA-Z0-9]+_/)) ? void 0 : r11[0]) ? t11 : "unknown";
            aD.has(n11) || (aD.add(n11), console.warn("@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type."));
          })(t10), this.realtimeUrl = new URL("realtime/v1", a10), this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws"), this.authUrl = new URL("auth/v1", a10), this.storageUrl = new URL("storage/v1", a10), this.functionsUrl = new URL("functions/v1", a10);
          const o2 = `sb-${a10.hostname.split(".")[0]}-auth-token`, l2 = function(e11, t11) {
            var r11, n11, s11, i11, a11, o3;
            let { db: l3, auth: u2, realtime: c2, global: d2 } = e11, { db: h2, auth: p2, realtime: f2, global: g2 } = t11, m2 = aB(e11.tracePropagation), _2 = aB(t11.tracePropagation), y2 = { db: a$(a$({}, h2), l3), auth: a$(a$({}, p2), u2), realtime: a$(a$({}, f2), c2), storage: {}, global: a$(a$(a$({}, g2), d2), {}, { headers: a$(a$({}, null != (r11 = null == g2 ? void 0 : g2.headers) ? r11 : {}), null != (n11 = null == d2 ? void 0 : d2.headers) ? n11 : {}) }), tracePropagation: { enabled: null != (s11 = null != (i11 = null == m2 ? void 0 : m2.enabled) ? i11 : null == _2 ? void 0 : _2.enabled) && s11, respectSamplingDecision: null == (a11 = null != (o3 = null == m2 ? void 0 : m2.respectSamplingDecision) ? o3 : null == _2 ? void 0 : _2.respectSamplingDecision) || a11 }, accessToken: async () => "" };
            return e11.accessToken ? y2.accessToken = e11.accessToken : delete y2.accessToken, y2;
          }(null != r10 ? r10 : {}, { db: aP, realtime: aI, auth: a$(a$({}, aA), {}, { storageKey: o2 }), global: ax, tracePropagation: aN });
          this.settings = l2, this.storageKey = null != (n10 = l2.auth.storageKey) ? n10 : "", this.headers = null != (s10 = l2.global.headers) ? s10 : {}, l2.accessToken ? (this.accessToken = l2.accessToken, this.auth = new Proxy({}, { get: (e11, t11) => {
            throw Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t11)} is not possible`);
          } })) : this.auth = this._initSupabaseAuthClient(null != (i10 = l2.auth) ? i10 : {}, this.headers, l2.global.fetch), this.fetch = aU(t10, e10, this._getSessionToken.bind(this), l2.global.fetch, l2.tracePropagation), this.functionsFetch = aU(t10, e10, this._getSessionToken.bind(this), l2.global.fetch, l2.tracePropagation, { omitApiKeyAsBearer: true }), this.realtime = this._initRealtimeClient(a$({ headers: this.headers, accessToken: this._getAccessToken.bind(this), fetch: this.fetch }, l2.realtime)), this.accessToken && Promise.resolve(this.accessToken()).then((e11) => this.realtime.setAuth(e11)).catch((e11) => console.warn("Failed to set initial Realtime auth token:", e11)), this.rest = new nI(new URL("rest/v1", a10).href, { headers: this.headers, schema: l2.db.schema, fetch: this.fetch, timeout: l2.db.timeout, urlLengthLimit: l2.db.urlLengthLimit, retry: l2.db.retry }), this.storage = new s8(this.storageUrl.href, this.headers, this.fetch, null == r10 ? void 0 : r10.storage), l2.accessToken || this._listenForAuthEvents();
        }
        get functions() {
          return new ny(this.functionsUrl.href, { headers: this.headers, customFetch: this.functionsFetch });
        }
        from(e10) {
          return this.rest.from(e10);
        }
        schema(e10) {
          return this.rest.schema(e10);
        }
        rpc(e10, t10 = {}, r10 = { head: false, get: false, count: void 0 }) {
          return this.rest.rpc(e10, t10, r10);
        }
        channel(e10, t10 = { config: {} }) {
          return this.realtime.channel(e10, t10);
        }
        getChannels() {
          return this.realtime.getChannels();
        }
        removeChannel(e10) {
          return this.realtime.removeChannel(e10);
        }
        removeAllChannels() {
          return this.realtime.removeAllChannels();
        }
        async _getSessionToken() {
          var e10, t10;
          if (this.accessToken) return await this.accessToken();
          let { data: r10 } = await this.auth.getSession();
          return null != (e10 = null == (t10 = r10.session) ? void 0 : t10.access_token) ? e10 : null;
        }
        async _getAccessToken() {
          var e10;
          return null != (e10 = await this._getSessionToken()) ? e10 : this.supabaseKey;
        }
        _initSupabaseAuthClient({ autoRefreshToken: e10, persistSession: t10, detectSessionInUrl: r10, storage: n10, userStorage: s10, storageKey: i10, flowType: a10, lock: o2, debug: l2, throwOnError: u2, experimental: c2, lockAcquireTimeout: d2, skipAutoInitialize: h2 }, p2, f2) {
          let g2 = { Authorization: `Bearer ${this.supabaseKey}`, apikey: `${this.supabaseKey}` };
          return new aH({ url: this.authUrl.href, headers: a$(a$({}, g2), p2), storageKey: i10, autoRefreshToken: e10, persistSession: t10, detectSessionInUrl: r10, storage: n10, userStorage: s10, flowType: a10, lock: o2, debug: l2, throwOnError: u2, experimental: c2, fetch: f2, lockAcquireTimeout: d2, skipAutoInitialize: h2, hasCustomAuthorizationHeader: Object.keys(this.headers).some((e11) => "authorization" === e11.toLowerCase()) });
        }
        _initRealtimeClient(e10) {
          return new sy(this.realtimeUrl.href, a$(a$({}, e10), {}, { params: a$(a$({}, { apikey: this.supabaseKey }), null == e10 ? void 0 : e10.params) }));
        }
        _listenForAuthEvents() {
          return this.auth.onAuthStateChange((e10, t10) => {
            this._handleTokenChanged(e10, "CLIENT", null == t10 ? void 0 : t10.access_token);
          });
        }
        _handleTokenChanged(e10, t10, r10) {
          ("TOKEN_REFRESHED" === e10 || "SIGNED_IN" === e10 || "INITIAL_SESSION" === e10) && this.changedAccessToken !== r10 ? (this.changedAccessToken = r10, this.realtime.setAuth(r10)) : "SIGNED_OUT" === e10 && (this.realtime.setAuth(), "STORAGE" == t10 && this.auth.signOut(), this.changedAccessToken = void 0);
        }
      };
      (function() {
        if (void 0 !== globalThis.Deno) return false;
        let e10 = globalThis.process;
        if (!e10) return false;
        let t10 = e10.version;
        if (null == t10) return false;
        let r10 = t10.match(/^v(\d+)\./);
        return !!r10 && 20 >= parseInt(r10[1], 10);
      })() && console.warn("\u26A0\uFE0F  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715");
      var aF = e.i(99929);
      let aV = { path: "/", sameSite: "lax", httpOnly: false, maxAge: 3456e4 }, az = /^(.*)[.](0|[1-9][0-9]*)$/;
      function aK(e10, t10) {
        if (e10 === t10) return true;
        let r10 = e10.match(az);
        return !!r10 && r10[1] === t10;
      }
      function aW(e10, t10, r10) {
        let n10 = r10 ?? 3180, s10 = encodeURIComponent(t10);
        if (s10.length <= n10) return [{ name: e10, value: t10 }];
        let i10 = [];
        for (; s10.length > 0; ) {
          let e11 = s10.slice(0, n10), t11 = e11.lastIndexOf("%");
          t11 > n10 - 3 && (e11 = e11.slice(0, t11));
          let r11 = "";
          for (; e11.length > 0; ) try {
            r11 = decodeURIComponent(e11);
            break;
          } catch (t12) {
            if (t12 instanceof URIError && "%" === e11.at(-3) && e11.length > 3) e11 = e11.slice(0, e11.length - 3);
            else throw t12;
          }
          i10.push(r11), s10 = s10.slice(e11.length);
        }
        return i10.map((t11, r11) => ({ name: `${e10}.${r11}`, value: t11 }));
      }
      async function aJ(e10, t10) {
        let r10 = await t10(e10);
        if (r10) return r10;
        let n10 = [];
        for (let r11 = 0; ; r11++) {
          let s10 = `${e10}.${r11}`, i10 = await t10(s10);
          if (!i10) break;
          n10.push(i10);
        }
        return n10.length > 0 ? n10.join("") : null;
      }
      aF.parse, aF.serialize;
      let aX = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), aY = " 	\n\r=".split(""), aZ = (() => {
        let e10 = Array(128);
        for (let t10 = 0; t10 < e10.length; t10 += 1) e10[t10] = -1;
        for (let t10 = 0; t10 < aY.length; t10 += 1) e10[aY[t10].charCodeAt(0)] = -2;
        for (let t10 = 0; t10 < aX.length; t10 += 1) e10[aX[t10].charCodeAt(0)] = t10;
        return e10;
      })();
      function aQ(e10) {
        let t10 = [], r10 = 0, n10 = 0;
        if (function(e11, t11) {
          for (let r11 = 0; r11 < e11.length; r11 += 1) {
            let n11 = e11.charCodeAt(r11);
            if (n11 > 55295 && n11 <= 56319) {
              let t12 = (n11 - 55296) * 1024 & 65535;
              n11 = (e11.charCodeAt(r11 + 1) - 56320 & 65535 | t12) + 65536, r11 += 1;
            }
            !function(e12, t12) {
              if (e12 <= 127) return t12(e12);
              if (e12 <= 2047) {
                t12(192 | e12 >> 6), t12(128 | 63 & e12);
                return;
              }
              if (e12 <= 65535) {
                t12(224 | e12 >> 12), t12(128 | e12 >> 6 & 63), t12(128 | 63 & e12);
                return;
              }
              if (e12 <= 1114111) {
                t12(240 | e12 >> 18), t12(128 | e12 >> 12 & 63), t12(128 | e12 >> 6 & 63), t12(128 | 63 & e12);
                return;
              }
              throw Error(`Unrecognized Unicode codepoint: ${e12.toString(16)}`);
            }(n11, t11);
          }
        }(e10, (e11) => {
          for (r10 = r10 << 8 | e11, n10 += 8; n10 >= 6; ) {
            let e12 = r10 >> n10 - 6 & 63;
            t10.push(aX[e12]), n10 -= 6;
          }
        }), n10 > 0) for (r10 <<= 6 - n10, n10 = 6; n10 >= 6; ) {
          let e11 = r10 >> n10 - 6 & 63;
          t10.push(aX[e11]), n10 -= 6;
        }
        return t10.join("");
      }
      let a0 = "base64-", a1 = /-flow-[A-Za-z0-9_-]{8,64}-code-verifier$/;
      function a2(e10) {
        let t10;
        if (!e10.startsWith(a0)) return e10;
        try {
          t10 = function(e11) {
            let t11 = [], r10 = (e12) => {
              t11.push(String.fromCodePoint(e12));
            }, n10 = { utf8seq: 0, codepoint: 0 }, s10 = 0, i10 = 0;
            for (let t12 = 0; t12 < e11.length; t12 += 1) {
              let a10 = aZ[e11.charCodeAt(t12)];
              if (a10 > -1) for (s10 = s10 << 6 | a10, i10 += 6; i10 >= 8; ) (function(e12, t13, r11) {
                if (0 === t13.utf8seq) {
                  if (e12 <= 127) return r11(e12);
                  for (let r12 = 1; r12 < 6; r12 += 1) if ((e12 >> 7 - r12 & 1) == 0) {
                    t13.utf8seq = r12;
                    break;
                  }
                  if (2 === t13.utf8seq) t13.codepoint = 31 & e12;
                  else if (3 === t13.utf8seq) t13.codepoint = 15 & e12;
                  else if (4 === t13.utf8seq) t13.codepoint = 7 & e12;
                  else throw Error("Invalid UTF-8 sequence");
                  t13.utf8seq -= 1;
                } else if (t13.utf8seq > 0) {
                  if (e12 <= 127) throw Error("Invalid UTF-8 sequence");
                  t13.codepoint = t13.codepoint << 6 | 63 & e12, t13.utf8seq -= 1, 0 === t13.utf8seq && r11(t13.codepoint);
                }
              })(s10 >> i10 - 8 & 255, n10, r10), i10 -= 8;
              else if (-2 === a10) continue;
              else throw Error(`Invalid Base64-URL character "${e11.at(t12)}" at position ${t12}`);
            }
            return t11.join("");
          }(e10.substring(a0.length));
        } catch (e11) {
          return console.warn("@supabase/ssr: could not base64url-decode chunked cookie value, treating as absent. Cookie chunks may have been written partially across responses.", e11), null;
        }
        try {
          JSON.parse(t10);
        } catch {
          return console.warn("@supabase/ssr: chunked cookie decoded to invalid JSON, treating as absent. This usually indicates that cookie chunks from different writes were combined (e.g. response committed before all Set-Cookie headers were sent)."), null;
        }
        return t10;
      }
      async function a3({ getAll: e10, setAll: t10, setItems: r10, removedItems: n10 }, s10) {
        let i10 = s10.cookieEncoding, a10 = s10.cookieOptions ?? null, o2 = await e10([...r10 ? Object.keys(r10) : [], ...n10 ? Object.keys(n10) : []]), l2 = o2?.map(({ name: e11 }) => e11) || [], u2 = new Map(o2?.map(({ name: e11, value: t11 }) => [e11, t11]) || []), c2 = Object.keys(n10).flatMap((e11) => l2.filter((t11) => aK(t11, e11))), d2 = Object.keys(r10).flatMap((e11) => {
          let t11 = new Set(l2.filter((t12) => aK(t12, e11))), n11 = r10[e11];
          "base64url" === i10 && (n11 = a0 + aQ(n11));
          let s11 = aW(e11, n11);
          return s11.forEach((e12) => {
            t11.delete(e12.name);
          }), c2.push(...t11), s11;
        }).filter(({ name: e11, value: t11 }) => u2.get(e11) !== t11), h2 = c2.filter((e11) => u2.has(e11)), p2 = { ...aV, ...a10, maxAge: 0 }, f2 = { ...aV, ...a10, maxAge: aV.maxAge };
        delete p2.name, delete f2.name;
        let g2 = p2.domain && h2.length > 0 ? (() => {
          let { domain: e11, ...t11 } = p2;
          return t11;
        })() : null;
        (0 !== h2.length || 0 !== d2.length) && await t10([...g2 ? h2.map((e11) => ({ name: e11, value: "", options: g2 })) : [], ...h2.map((e11) => ({ name: e11, value: "", options: p2 })), ...d2.map(({ name: e11, value: t11 }) => ({ name: e11, value: t11, options: f2 }))], { "Cache-Control": "private, no-cache, no-store, must-revalidate, max-age=0", Expires: "0", Pragma: "no-cache" });
      }
      let a4 = false, a5 = ["@supabase/auth-helpers-nextjs", "@supabase/auth-helpers-react", "@supabase/auth-helpers-remix", "@supabase/auth-helpers-sveltekit"], a6 = (c = { ...em = { locales: ["en", "si", "ta"], defaultLocale: "en" }, localePrefix: "object" == typeof (ey = em.localePrefix) ? ey : { mode: ey || "always" }, localeCookie: !!((e_ = em.localeCookie) ?? 1) && { name: "NEXT_LOCALE", sameSite: "lax", ..."object" == typeof e_ && e_ }, localeDetection: em.localeDetection ?? true, alternateLinks: em.alternateLinks ?? true }, function(e10) {
        var t10, r10;
        let n10;
        try {
          n10 = decodeURI(e10.nextUrl.pathname);
        } catch {
          return eL.next();
        }
        let s10 = n10.replace(/\\/g, "%5C").replace(/[\t\n\r]/g, "").replace(/\/+/g, "/"), { domain: i10, locale: a10 } = (t10 = e10.headers, r10 = e10.cookies, c.domains ? function(e11, t11, r11, n11) {
          let s11, i11 = function(e12, t12) {
            let r12 = r1(e12);
            if (r12) return t12.find((e13) => e13.domain === r12);
          }(t11, e11.domains);
          if (!i11) return { locale: nd(e11, t11, r11, n11) };
          if (n11) {
            let t12 = rQ(n11, e11.locales, e11.localePrefix, i11)?.locale;
            if (t12) {
              if (!r2(t12, i11)) return { locale: t12, domain: i11 };
              s11 = t12;
            }
          }
          if (!s11 && e11.localeDetection) {
            let t12 = nc(e11, r11);
            t12 && r2(t12, i11) && (s11 = t12);
          }
          if (!s11 && e11.localeDetection) {
            let e12 = nu(t11, i11.locales, i11.defaultLocale);
            e12 && (s11 = e12);
          }
          return s11 || (s11 = i11.defaultLocale), { locale: s11, domain: i11 };
        }(c, t10, r10, s10) : { locale: nd(c, t10, r10, s10) }), o2 = i10 ? i10.defaultLocale === a10 : a10 === c.defaultLocale, l2 = c.domains?.filter((e11) => r2(a10, e11)) || [], u2 = null != c.domains && !i10;
        function d2(t11) {
          var r11;
          let n11 = new URL(t11, e10.url);
          e10.nextUrl.basePath && (r11 = n11.pathname, n11.pathname = rH(e10.nextUrl.basePath + r11));
          let s11 = new Headers(e10.headers);
          return s11.set("X-NEXT-INTL-LOCALE", a10), rH(e10.nextUrl.pathname) !== rH(n11.pathname) ? eL.rewrite(n11, { request: { headers: s11 } }) : eL.next({ request: { headers: s11 } });
        }
        function h2(t11, r11) {
          var n11;
          let s11 = new URL(t11, e10.url);
          if (s11.pathname = rH(s11.pathname), l2.length > 0 && !r11 && i10) {
            let e11 = r3(i10, a10, l2);
            if (e11) {
              r11 = e11.domain;
              let t12 = e11.localePrefix || c.localePrefix.mode;
              e11.defaultLocale === a10 && "as-needed" === t12 && (s11.pathname = rY(s11.pathname, c.locales, c.localePrefix));
            }
          }
          return r11 && (s11.host = r11, e10.headers.get("x-forwarded-host")) && (s11.protocol = e10.headers.get("x-forwarded-proto") ?? e10.nextUrl.protocol, s11.port = r11.split(":")[1] ?? e10.headers.get("x-forwarded-port") ?? ""), e10.nextUrl.basePath && (n11 = s11.pathname, s11.pathname = rH(e10.nextUrl.basePath + n11)), w2 = true, eL.redirect(s11.toString());
        }
        let p2 = rY(s10, c.locales, c.localePrefix), f2 = rQ(s10, c.locales, c.localePrefix, i10), g2 = null != f2, m2 = i10?.localePrefix || c.localePrefix.mode, _2 = "never" === m2 || o2 && "as-needed" === m2, y2, b2, w2, v2 = p2, E2 = c.pathnames;
        if (E2) {
          let t11;
          if ([t11, b2] = function(e11, t12, r11) {
            for (let n11 of Object.keys(e11).sort(rJ)) {
              let s11 = e11[n11];
              if ("string" == typeof s11) {
                if (rG(s11, t12)) return [void 0, n11];
              } else {
                let i11 = Object.entries(s11), a11 = i11.findIndex(([e12]) => e12 === r11);
                for (let [r12] of (a11 > 0 && i11.unshift(i11.splice(a11, 1)[0]), i11)) if (rG(rB(e11[n11], r12, n11), t12)) return [r12, n11];
              }
            }
            for (let r12 of Object.keys(e11)) if (rG(r12, t12)) return [void 0, r12];
            return [void 0, void 0];
          }(E2, p2, a10), b2) {
            let r11 = E2[b2], n11 = rB(r11, a10, b2);
            if (rG(n11, p2)) v2 = rX(p2, n11, b2);
            else {
              let s11;
              s11 = t11 ? rB(r11, t11, b2) : b2;
              let i11 = _2 ? void 0 : rF(a10, c.localePrefix);
              y2 = h2(r0(rX(p2, s11, n11), i11, e10.nextUrl.search));
            }
          }
        }
        if (!y2) if ("/" !== v2 || g2) {
          let t11 = r0(v2, `/${a10}`, e10.nextUrl.search);
          if (g2) {
            let r11 = r0(p2, f2.prefix, e10.nextUrl.search);
            if ("never" === m2) y2 = h2(r0(p2, void 0, e10.nextUrl.search));
            else if (f2.exact) if (o2 && _2) y2 = h2(r0(p2, void 0, e10.nextUrl.search));
            else if (c.domains) {
              let e11 = r3(i10, f2.locale, l2);
              y2 = i10?.domain === e11?.domain || u2 ? d2(t11) : h2(r11, e11?.domain);
            } else y2 = d2(t11);
            else y2 = h2(r11);
          } else y2 = _2 ? d2(t11) : h2(r0(p2, rF(a10, c.localePrefix), e10.nextUrl.search));
        } else y2 = _2 ? d2(r0(v2, `/${a10}`, e10.nextUrl.search)) : h2(r0(p2, rF(a10, c.localePrefix), e10.nextUrl.search));
        return function(e11, t11, r11, n11, s11) {
          if (!n11.localeCookie) return;
          let i11 = e11.headers.get("sec-fetch-dest");
          if (null != i11 && "document" !== i11) return;
          let { name: a11, ...o3 } = n11.localeCookie, l3 = e11.cookies.has(a11);
          l3 && e11.cookies.get(a11)?.value !== r11 ? t11.cookies.set(a11, r11, { path: e11.nextUrl.basePath || void 0, ...o3 }) : l3 || nu(e11.headers, s11?.locales || n11.locales, n11.defaultLocale) === r11 || t11.cookies.set(a11, r11, { path: e11.nextUrl.basePath || void 0, ...o3 });
        }(e10, y2, a10, c, i10), !w2 && "never" !== m2 && c.alternateLinks && c.locales.length > 1 && y2.headers.set("Link", function({ internalTemplateName: e11, localizedPathnames: t11, request: r11, resolvedLocale: n11, routing: s11 }) {
          let i11 = r11.nextUrl.clone(), a11 = r1(r11.headers);
          function o3(e12, t12) {
            var n12;
            return e12.pathname = rH(e12.pathname), r11.nextUrl.basePath && ((e12 = new URL(e12)).pathname = (n12 = e12.pathname, rH(r11.nextUrl.basePath + n12))), `<${e12.toString()}>; rel="alternate"; hreflang="${t12}"`;
          }
          function l3(r12, s12) {
            return t11 && "object" == typeof t11 ? rX(r12, t11[n11] ?? e11, t11[s12] ?? e11) : r12;
          }
          a11 && (i11.port = "", i11.host = a11), i11.protocol = r11.headers.get("x-forwarded-proto") ?? i11.protocol, i11.pathname = rY(i11.pathname, s11.locales, s11.localePrefix);
          let u3 = rZ(s11.locales, s11.localePrefix, false).flatMap(([e12, r12]) => {
            let n12;
            function a12(e13) {
              return "/" === e13 ? r12 : r12 + e13;
            }
            if (s11.domains) return s11.domains.filter((t12) => r2(e12, t12)).map((t12) => {
              (n12 = new URL(i11)).port = "", n12.host = t12.domain, n12.pathname = l3(i11.pathname, e12);
              let r13 = t12.localePrefix || s11.localePrefix.mode;
              return e12 === t12.defaultLocale && "always" !== r13 || (n12.pathname = a12(n12.pathname)), o3(n12, e12);
            });
            {
              let r13;
              r13 = t11 && "object" == typeof t11 ? l3(i11.pathname, e12) : i11.pathname, e12 === s11.defaultLocale && "always" !== s11.localePrefix.mode || (r13 = a12(r13)), n12 = new URL(r13, i11);
            }
            return o3(n12, e12);
          });
          if (!s11.domains || 0 === s11.domains.length) {
            let e12 = l3(i11.pathname, s11.defaultLocale);
            if (e12) {
              let t12 = new URL(e12, i11);
              u3.push(o3(t12, "x-default"));
            }
          }
          return u3.join(", ");
        }({ routing: c, internalTemplateName: b2, localizedPathnames: null != b2 && E2 ? E2[b2] : void 0, request: e10, resolvedLocale: a10 })), y2;
      });
      async function a8(e10) {
        let t10 = a6(e10), r10 = function(e11, t11, r11) {
          if (!function() {
            if (a4 || "u" < typeof process || !process.env?.npm_package_name) return;
            let e12 = process.env.npm_package_name;
            a5.includes(e12) && (a4 = true, console.warn(`
\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
\u2551 \u26A0\uFE0F  IMPORTANT: Package Consolidation Notice                                \u2551
\u2551                                                                            \u2551
\u2551 The ${e12.padEnd(35)} package name is deprecated.  \u2551
\u2551                                                                            \u2551
\u2551 You are now using @supabase/ssr - a unified solution for all frameworks.  \u2551
\u2551                                                                            \u2551
\u2551 The auth-helpers packages have been consolidated into @supabase/ssr       \u2551
\u2551 to provide better maintenance and consistent APIs across frameworks.      \u2551
\u2551                                                                            \u2551
\u2551 Please update your package.json to use @supabase/ssr directly:            \u2551
\u2551   npm uninstall ${e12.padEnd(42)} \u2551
\u2551   npm install @supabase/ssr                                               \u2551
\u2551                                                                            \u2551
\u2551 For more information, visit:                                              \u2551
\u2551 https://supabase.com/docs/guides/auth/server-side                         \u2551
\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D
    `));
          }(), !e11 || !t11) throw Error(`Your project's URL and Key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`);
          let { storage: n10, getAll: s10, setAll: i10, setItems: a10, removedItems: o2 } = function(e12, t12) {
            let r12, n11, s11 = e12.cookies ?? null, i11 = e12.cookieEncoding, a11 = {}, o3 = {}, l3 = () => {
              let e13 = (0, aF.parse)(document.cookie);
              return Object.keys(e13).map((t13) => ({ name: t13, value: e13[t13] ?? "" }));
            }, u2 = (e13) => {
              e13.forEach(({ name: e14, value: t13, options: r13 }) => {
                document.cookie = (0, aF.serialize)(e14, t13, r13);
              });
            };
            if (s11) if ("get" in s11) {
              let e13 = async (e14) => {
                let t13 = e14.flatMap((e15) => [e15, ...Array.from({ length: 5 }).map((t14, r14) => `${e15}.${r14}`)]), r13 = [];
                for (let e15 = 0; e15 < t13.length; e15 += 1) {
                  let n12 = await s11.get(t13[e15]);
                  (n12 || "string" == typeof n12) && r13.push({ name: t13[e15], value: n12 });
                }
                return r13;
              };
              if (r12 = async (t13) => await e13(t13), "set" in s11 && "remove" in s11) n11 = async (e14) => {
                for (let t13 = 0; t13 < e14.length; t13 += 1) {
                  let { name: r13, value: n12, options: i12 } = e14[t13];
                  n12 ? await s11.set(r13, n12, i12) : await s11.remove(r13, i12);
                }
              };
              else if (t12) n11 = async () => {
                console.warn("@supabase/ssr: createServerClient was configured without set and remove cookie methods, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness. Consider switching to the getAll and setAll cookie methods instead of get, set and remove which are deprecated and can be difficult to use correctly.");
              };
              else throw Error("@supabase/ssr: createBrowserClient requires configuring a getAll and setAll cookie method (deprecated: alternatively both get, set and remove can be used)");
            } else if ("getAll" in s11) if (r12 = async () => await s11.getAll(), "setAll" in s11) n11 = s11.setAll;
            else if (t12) n11 = async () => {
              console.warn("@supabase/ssr: createServerClient was configured without the setAll cookie method, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness.");
            };
            else throw Error("@supabase/ssr: createBrowserClient requires configuring both getAll and setAll cookie methods (deprecated: alternatively both get, set and remove can be used)");
            else if (t12 || 1) throw Error(`@supabase/ssr: ${t12 ? "createServerClient" : "createBrowserClient"} requires configuring getAll and setAll cookie methods (deprecated: alternatively use get, set and remove).`);
            else r12 = () => l3(), n11 = u2;
            else if (t12 || 1) if (t12) throw Error("@supabase/ssr: createServerClient must be initialized with cookie options that specify getAll and setAll functions (deprecated, not recommended: alternatively use get, set and remove)");
            else r12 = () => [], n11 = () => {
              throw Error("@supabase/ssr: createBrowserClient in non-browser runtimes (including Next.js pre-rendering mode) was not initialized cookie options that specify getAll and setAll functions (deprecated: alternatively use get, set and remove), but they were needed");
            };
            else r12 = () => l3(), n11 = u2;
            return t12 ? { getAll: r12, setAll: n11, setItems: a11, removedItems: o3, storage: { isServer: true, getItem: async (e13) => {
              if ("string" == typeof a11[e13]) return a11[e13];
              if (o3[e13]) return null;
              let t13 = await r12([e13]), n12 = await aJ(e13, async (e14) => {
                let r13 = t13?.find(({ name: t14 }) => t14 === e14) || null;
                return r13 ? r13.value : null;
              });
              return n12 ? "string" != typeof n12 ? n12 : a2(n12) : null;
            }, setItem: async (t13, s12) => {
              t13.endsWith("-code-verifier") && await a3({ getAll: r12, setAll: n11, setItems: { [t13]: s12 }, removedItems: {} }, { cookieOptions: e12?.cookieOptions ?? null, cookieEncoding: i11 }), a11[t13] = s12, delete o3[t13];
            }, removeItem: async (t13) => {
              (a1.test(t13) || t13.endsWith("-flows-code-verifier")) && await a3({ getAll: r12, setAll: n11, setItems: {}, removedItems: { [t13]: true } }, { cookieOptions: e12?.cookieOptions ?? null, cookieEncoding: i11 }), delete a11[t13], o3[t13] = true;
            } } } : { getAll: r12, setAll: n11, setItems: a11, removedItems: o3, storage: { isServer: false, getItem: async (e13) => {
              let t13 = await r12([e13]), n12 = await aJ(e13, async (e14) => {
                let r13 = t13?.find(({ name: t14 }) => t14 === e14) || null;
                return r13 ? r13.value : null;
              });
              return n12 ? a2(n12) : null;
            }, setItem: async (t13, s12) => {
              let a12 = await r12([t13]), o4 = new Set((a12?.map(({ name: e13 }) => e13) || []).filter((e13) => aK(e13, t13))), l4 = s12;
              "base64url" === i11 && (l4 = a0 + aQ(s12));
              let u3 = aW(t13, l4);
              u3.forEach(({ name: e13 }) => {
                o4.delete(e13);
              });
              let c2 = { ...aV, ...e12?.cookieOptions, maxAge: 0 }, d2 = { ...aV, ...e12?.cookieOptions, maxAge: aV.maxAge };
              delete c2.name, delete d2.name;
              let h2 = c2.domain ? (() => {
                let { domain: e13, ...t14 } = c2;
                return t14;
              })() : null, p2 = [...h2 ? [...o4].map((e13) => ({ name: e13, value: "", options: h2 })) : [], ...[...o4].map((e13) => ({ name: e13, value: "", options: c2 })), ...u3.map(({ name: e13, value: t14 }) => ({ name: e13, value: t14, options: d2 }))];
              p2.length > 0 && await n11(p2, {});
            }, removeItem: async (t13) => {
              let s12 = await r12([t13]), i12 = (s12?.map(({ name: e13 }) => e13) || []).filter((e13) => aK(e13, t13));
              if (0 === i12.length) return;
              let a12 = { ...aV, ...e12?.cookieOptions, maxAge: 0 };
              delete a12.name;
              let o4 = a12.domain ? (() => {
                let { domain: e13, ...t14 } = a12;
                return t14;
              })() : null, l4 = [...o4 ? i12.map((e13) => ({ name: e13, value: "", options: o4 })) : [], ...i12.map((e13) => ({ name: e13, value: "", options: a12 }))];
              await n11(l4, {});
            } } };
          }({ ...r11, cookieEncoding: r11?.cookieEncoding ?? "base64url" }, true), l2 = new aG(e11, t11, { ...r11, global: { ...r11?.global, headers: { ...r11?.global?.headers, "X-Client-Info": "supabase-ssr/0.12.4 createServerClient" } }, auth: { ...r11?.cookieOptions?.name ? { storageKey: r11.cookieOptions.name } : null, ...r11?.auth, flowType: "pkce", autoRefreshToken: false, detectSessionInUrl: false, persistSession: true, skipAutoInitialize: true, storage: n10, ...r11?.cookies && "encode" in r11.cookies && "tokens-only" === r11.cookies.encode ? { userStorage: r11?.auth?.userStorage ?? /* @__PURE__ */ function(e12 = {}) {
            return { getItem: (t12) => e12[t12] || null, setItem: (t12, r12) => {
              e12[t12] = r12;
            }, removeItem: (t12) => {
              delete e12[t12];
            } };
          }() } : null } });
          return l2.auth.onAuthStateChange(async (e12) => {
            (Object.keys(a10).length > 0 || Object.keys(o2).length > 0) && ("SIGNED_IN" === e12 || "TOKEN_REFRESHED" === e12 || "USER_UPDATED" === e12 || "PASSWORD_RECOVERY" === e12 || "SIGNED_OUT" === e12 || "MFA_CHALLENGE_VERIFIED" === e12) && await a3({ getAll: s10, setAll: i10, setItems: a10, removedItems: o2 }, { cookieOptions: r11?.cookieOptions ?? null, cookieEncoding: r11?.cookieEncoding ?? "base64url" });
          }), l2;
        }("https://zmwefiyxfolmrnoiekph.supabase.co", "sb_publishable_-yQ0nKy78O23U_6B9J2MYA_dOJWk4jl", { cookies: { getAll: () => e10.cookies.getAll(), setAll(e11) {
          e11.forEach(({ name: e12, value: r11, options: n10 }) => t10.cookies.set(e12, r11, n10));
        } } });
        return await r10.auth.getUser(), t10;
      }
      e.s(["config", 0, { matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"] }, "default", 0, a8], 96592);
      let a9 = { ...e.i(96592) }, a7 = "/middleware", oe = a9.middleware || a9.default;
      if ("function" != typeof oe) throw new class extends Error {
        constructor(e10) {
          super(e10), Object.defineProperty(this, "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true }), this.stack = "";
        }
      }(`The Middleware file "${a7}" must export a function named \`middleware\` or a default function.`);
      let ot = async (e10) => tZ({ ...e10, IncrementalCache: rD, incrementalCacheHandler: null, page: a7, handler: async (...e11) => {
        try {
          return await oe(...e11);
        } catch (s10) {
          let t10 = e11[0], r10 = new URL(t10.url), n10 = r10.pathname + r10.search;
          throw await f(s10, { path: n10, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), s10;
        }
      } });
      async function or(e10, t10) {
        let r10 = await ot({ request: { url: e10.url, method: e10.method, headers: x(e10.headers), nextConfig: { basePath: "", i18n: "", trailingSlash: false, experimental: { cacheLife: { default: { stale: 300, revalidate: 900, expire: 4294967294 }, seconds: { stale: 30, revalidate: 1, expire: 60 }, minutes: { stale: 300, revalidate: 60, expire: 3600 }, hours: { stale: 300, revalidate: 3600, expire: 86400 }, days: { stale: 300, revalidate: 86400, expire: 604800 }, weeks: { stale: 300, revalidate: 604800, expire: 2592e3 }, max: { stale: 300, revalidate: 2592e3, expire: 31536e3 } }, authInterrupts: false, clientParamParsingOrigins: [] } }, page: { name: a7 }, body: "GET" !== e10.method && "HEAD" !== e10.method ? e10.body ?? void 0 : void 0, waitUntil: t10.waitUntil, requestMeta: t10.requestMeta, signal: t10.signal || new AbortController().signal } });
        return null == t10.waitUntil || t10.waitUntil.call(t10, r10.waitUntil), r10.response;
      }
      e.s(["default", 0, ot, "handler", 0, or], 58217);
    }]);
  }
});

// .next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_10tjhr6.js
var require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_10tjhr6 = __commonJS({
  ".next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_10tjhr6.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_10tjhr6.js", { otherChunks: ["chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_0_kjzx3.js", "chunks/[root-of-the-server]__1867t5a._.js"], runtimeModuleIds: [35825] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      var t, r = ((t = r || {})[t.Runtime = 0] = "Runtime", t[t.Parent = 1] = "Parent", t[t.Update = 2] = "Update", t);
      let n = /* @__PURE__ */ new WeakMap();
      function o(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let u = o.prototype, l = Object.prototype.hasOwnProperty, i = "u" > typeof Symbol && Symbol.toStringTag;
      function a(e2, t2, r2) {
        l.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function s(e2, t2) {
        let r2 = e2[t2];
        return r2 || (r2 = f(t2), e2[t2] = r2), r2;
      }
      function f(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function c(e2, t2, r2) {
        a(e2, "__esModule", { value: true }), i && a(e2, i, { value: "Module" });
        let n2 = 0;
        for (; n2 < t2.length; ) {
          let r3 = t2[n2++], o2 = t2[n2++];
          if ("number" == typeof o2) if (0 === o2) a(e2, r3, { value: t2[n2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" == typeof t2[n2] ? a(e2, r3, { get: o2, set: t2[n2++], enumerable: true }) : a(e2, r3, { get: o2, enumerable: true });
        }
        r2 || Object.seal(e2);
      }
      function d(e2, t2) {
        (null != t2 ? s(this.c, t2) : this.m).exports = e2;
      }
      u.s = function(e2, t2, r2) {
        let n2, o2;
        null != t2 ? o2 = (n2 = s(this.c, t2)).exports : (n2 = this.m, o2 = this.e), n2.namespaceObject = o2, c(o2, e2, r2);
      }, u.j = function(e2, t2) {
        let r2, o2;
        null != t2 ? o2 = (r2 = s(this.c, t2)).exports : (r2 = this.m, o2 = this.e);
        let u2 = function(e3, t3) {
          let r3 = n.get(e3);
          if (!r3) {
            n.set(e3, r3 = []);
            let o3 = (e4) => {
              if ("default" !== e4) {
                for (let t4 of r3) if (l.call(t4, e4)) return t4;
              }
            };
            e3.exports = e3.namespaceObject = new Proxy(t3, { get(e4, t4) {
              if (l.call(e4, t4) || "default" === t4 || "__esModule" === t4) return Reflect.get(e4, t4);
              let r4 = o3(t4);
              return r4 && Reflect.get(r4, t4);
            }, set: () => false, defineProperty: () => false, deleteProperty: () => false, has: (e4, t4) => !!Reflect.has(e4, t4) || "default" !== t4 && "__esModule" !== t4 && void 0 !== o3(t4), ownKeys(e4) {
              let t4 = Reflect.ownKeys(e4);
              for (let e5 of r3) for (let r4 of Reflect.ownKeys(e5)) "default" === r4 || t4.includes(r4) || t4.push(r4);
              return t4;
            }, getOwnPropertyDescriptor(e4, t4) {
              let r4 = Reflect.getOwnPropertyDescriptor(e4, t4);
              if (r4 || "default" === t4 || "__esModule" === t4) return r4;
              let n2 = o3(t4);
              if (n2) return { enumerable: true, configurable: true, get: () => Reflect.get(n2, t4) };
            } });
          }
          return r3;
        }(r2, o2);
        "object" == typeof e2 && null !== e2 && u2.push(e2);
      }, u.v = d, u.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? s(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let p = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, h = [null, p({}), p([]), p(p)];
      function m(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !h.includes(t3); t3 = p(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ function(e3, t4) {
          return () => e3[t4];
        }(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), c(t2, n2), t2;
      }
      function y(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function b(e2) {
        let t2 = A(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = m(r2, y(r2), r2 && r2.__esModule);
      }
      function g(e2) {
        let t2 = e2.indexOf("#");
        -1 !== t2 && (e2 = e2.substring(0, t2));
        let r2 = e2.indexOf("?");
        return -1 !== r2 && (e2 = e2.substring(0, r2)), e2;
      }
      function w(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      u.i = b, u.A = function(e2) {
        return this.r(e2)(b.bind(this));
      }, u.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, u.r = function(e2) {
        return A(e2, this.m).exports;
      }, u.f = function(e2) {
        function t2(t3) {
          if (t3 = g(t3), l.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (t3 = g(t3), l.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let O = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function _(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      O.prototype = URL.prototype, u.U = O, u.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, u.g = globalThis;
      let k = o.prototype, j = /* @__PURE__ */ new Map();
      u.M = j;
      let R = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Map(), C = /* @__PURE__ */ new Map();
      async function v(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return function(e3, t3, r3) {
          return M(e3, t3, r3);
        }(e2, t2, T(r2));
        let o2 = r2.included || [], u2 = o2.map((e3) => !!j.has(e3) || R.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        for (let u3 of (n2 = M(e2, t2, T(r2.path)), o2)) R.has(u3) || R.set(u3, n2);
        await n2;
      }
      k.l = function(e2) {
        return v(r.Parent, this.m.id, e2);
      };
      let U = Promise.resolve(void 0), x = /* @__PURE__ */ new WeakMap();
      function M(t2, n2, o2) {
        let u2 = e.loadChunkCached(t2, o2), l2 = x.get(u2);
        if (void 0 === l2) {
          let e2 = x.set.bind(x, u2, U);
          l2 = u2.then(e2).catch((e3) => {
            let u3;
            switch (t2) {
              case r.Runtime:
                u3 = `as a runtime dependency of chunk ${n2}`;
                break;
              case r.Parent:
                u3 = `from module ${n2}`;
                break;
              case r.Update:
                u3 = "from an HMR update";
                break;
              default:
                _(t2, (e4) => `Unknown source type: ${e4}`);
            }
            let l3 = Error(`Failed to load chunk ${o2} ${u3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
            throw l3.name = "ChunkLoadError", l3;
          }), x.set(u2, l2);
        }
        return l2;
      }
      k.L = function(e2) {
        var t2, n2;
        return t2 = r.Parent, n2 = this.m.id, M(t2, n2, e2);
      };
      k.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, k.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, k.F = function(e2) {
        return e2 ? `file:///ROOT/${e2.split("/").map(encodeURIComponent).join("/")}` : "file:///ROOT/";
      }, k.q = function(e2, t2) {
        d.call(this, `${e2}`, t2);
      };
      let $ = /[^A-Za-z0-9\-_.!~*'()/]/;
      function T(e2, t2 = "") {
        let r2 = $.test(e2) ? e2.split("/").map(encodeURIComponent).join("/") : e2;
        return `${t2}${r2}`;
      }
      k.b = "", k.X = "", k.h = T;
      let E = {};
      u.c = E;
      let A = (e2, t2) => {
        let n2 = E[e2];
        if (n2) {
          if (n2.error) throw n2.error;
          return n2;
        }
        return K(e2, r.Parent, t2.id);
      };
      function K(e2, t2, r2) {
        let n2 = j.get(e2);
        if ("function" != typeof n2) throw Error(function(e3, t3, r3) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r3}`;
              break;
            case 1:
              n3 = `because it was required from module ${r3}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              _(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        }(e2, t2, r2));
        let u2 = f(e2), l2 = u2.exports;
        E[e2] = u2;
        let i2 = new o(u2, l2);
        try {
          n2(i2, u2, l2);
        } catch (e3) {
          throw u2.error = e3, e3;
        }
        return u2.namespaceObject && u2.exports !== u2.namespaceObject && m(u2.exports, u2.namespaceObject), u2;
      }
      function q(t2) {
        let r2;
        if (!Array.isArray(t2)) return e.registerChunk(void 0, t2);
        let n2 = function(e2) {
          if ("string" == typeof e2) return e2;
          if (e2) return { src: e2.getAttribute("src") };
          if ("u" > typeof TURBOPACK_NEXT_CHUNK_URLS) return { src: TURBOPACK_NEXT_CHUNK_URLS.pop() };
          throw Error("chunk path empty but not in a worker");
        }(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !function(e2, t3) {
          let r3 = 1;
          for (; r3 < e2.length; ) {
            let n3, o2 = r3 + 1;
            for (; o2 < e2.length && "function" != typeof e2[o2]; ) o2++;
            if (o2 === e2.length) throw Error("malformed chunk format, expected a factory function");
            let u2 = e2[o2];
            for (let u3 = r3; u3 < o2; u3++) {
              let r4 = e2[u3], o3 = t3.get(r4);
              if (o3) {
                n3 = o3;
                break;
              }
            }
            let l2 = n3 ?? u2, i2 = false;
            for (let n4 = r3; n4 < o2; n4++) {
              let r4 = e2[n4];
              t3.has(r4) || (i2 || (l2 === u2 && Object.defineProperty(u2, "name", { value: "module evaluation" }), i2 = true), t3.set(r4, l2));
            }
            r3 = o2 + 1;
          }
        }(t2, j)), e.registerChunk(n2, r2);
      }
      function N(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : m(n2, y(n2), true);
      }
      u.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? m(t2.default, y(t2), true) : t2;
      }, N.resolve = (e2, t2) => __require.resolve(e2, t2), u.x = N, e = { registerChunk(e2, t2) {
        if (null == e2) throw Error("inline entry registration is not supported");
        let r2 = function(e3) {
          if ("string" == typeof e3) return e3;
          let t3 = decodeURIComponent(e3.src.replace(/[?#].*$/, ""));
          return t3.startsWith("") ? t3.slice(0) : t3;
        }(e2);
        S.add(r2), function(e3) {
          let t3 = I.get(e3);
          if (null != t3) {
            for (let r3 of t3) r3.requiredChunks.delete(e3), 0 === r3.requiredChunks.size && L(r3.runtimeModuleIds, r3.chunkPath);
            I.delete(e3);
          }
        }(r2), null != t2 && (0 === t2.otherChunks.length ? L(t2.runtimeModuleIds, r2) : function(e3, t3, r3) {
          let n2 = /* @__PURE__ */ new Set(), o2 = { runtimeModuleIds: r3, chunkPath: e3, requiredChunks: n2 };
          for (let e4 of t3) {
            let t4 = w(e4);
            if (S.has(t4)) continue;
            n2.add(t4);
            let r4 = I.get(t4);
            null == r4 && (r4 = /* @__PURE__ */ new Set(), I.set(t4, r4)), r4.add(o2);
          }
          0 === o2.requiredChunks.size && L(o2.runtimeModuleIds, o2.chunkPath);
        }(r2, t2.otherChunks.filter((e3) => function(e4) {
          let t3, r3 = e4.indexOf("?");
          if (-1 !== r3) t3 = r3;
          else {
            let r4 = e4.indexOf("#");
            t3 = -1 !== r4 ? r4 : e4.length;
          }
          return t3 >= 3 && e4.startsWith(".js", t3 - 3);
        }(w(e3))), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      } };
      let S = /* @__PURE__ */ new Set(), I = /* @__PURE__ */ new Map();
      function L(e2, t2) {
        for (let n2 of e2) !function(e3, t3) {
          let n3 = E[t3];
          if (n3) {
            if (n3.error) throw n3.error;
            return;
          }
          K(t3, r.Runtime, e3);
        }(t2, n2);
      }
      var B = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: q }, B.forEach(q);
    })();
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(path3);
  } catch {
  }
  const correspondingRoute = routes.find((route) => route.regex.some((r) => {
    const regex = new RegExp(r);
    return regex.test(path3) || decodedPath !== void 0 && regex.test(decodedPath);
  }));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next|_vercel|.*\\..*).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$"] }];
    require_node_modules_next_dist_esm_build_templates_edge_wrapper_0_kjzx3();
    require_root_of_the_server_1867t5a();
    require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_10tjhr6();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": false }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "instrumentationClientInject": [], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "maximumResponseBody": 5e7, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [], "qualities": [75], "unoptimized": false, "customCacheHandler": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": { "serverFunctions": true, "browserToTerminal": "warn" }, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "C:\\Users\\hansi\\Desktop\\New folder\\Past_paper_zone", "enablePrerenderSourceMaps": true, "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "experimental": { "appNewScrollHandler": true, "coldCacheBadge": false, "devValidationWorker": true, "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "cachedNavigations": false, "dynamicOnHover": false, "useOffline": false, "varyParams": true, "optimisticRouting": true, "instrumentationClientRouterTransitionEvents": false, "prefetchInlining": { "maxSize": 2048, "maxBundleSize": 10240 }, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 11, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptOperationCache": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "devMemoryThresholdRestart": true, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "requestInsights": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "strictRouteTypes": false, "useTypeScriptCli": true, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": true, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": true, "serverComponentsHmrCache": true, "serverComponentsHmrCancellation": false, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "transitionIndicator": false, "gestureTransition": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "browserDebugInfoInTerminal": "warn", "lockDistDir": true, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "turbopackFileSystemCacheForDev": true, "turbopackFileSystemCacheForBuild": true, "turbopackInferModuleSideEffects": true, "turbopackPluginRuntimeStrategy": "childProcesses", "turbopackMemoryEvictionMode": "auto", "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "useCacheTimeout": 54, "instantInsights": { "validationLevel": "warning" }, "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "resolveAlias": { "next-intl/config": "./src/i18n/request.ts" }, "root": "C:\\Users\\hansi\\Desktop\\New folder\\Past_paper_zone" }, "repoRoot": "C:\\Users\\hansi\\Desktop\\New folder\\Past_paper_zone", "distDirRoot": ".next" };
var BuildId = "smXD0mzR7vwU5fT67M89y";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/api/admin/delete", "regex": "^/api/admin/delete(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/delete(?:/)?$" }, { "page": "/api/admin/upload", "regex": "^/api/admin/upload(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/upload(?:/)?$" }, { "page": "/api/auth/callback", "regex": "^/api/auth/callback(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/callback(?:/)?$" }, { "page": "/api/auth/login", "regex": "^/api/auth/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/login(?:/)?$" }, { "page": "/api/auth/logout", "regex": "^/api/auth/logout(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/logout(?:/)?$" }, { "page": "/api/auth/register", "regex": "^/api/auth/register(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/register(?:/)?$" }, { "page": "/api/request-paper", "regex": "^/api/request\\-paper(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/request\\-paper(?:/)?$" }, { "page": "/api/stats", "regex": "^/api/stats(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/stats(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }], "dynamic": [{ "page": "/[locale]", "regex": "^/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)(?:/)?$" }, { "page": "/[locale]/admin/dashboard", "regex": "^/([^/]+?)/admin/dashboard(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/admin/dashboard(?:/)?$" }, { "page": "/[locale]/admin/login", "regex": "^/([^/]+?)/admin/login(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/admin/login(?:/)?$" }, { "page": "/[locale]/search", "regex": "^/([^/]+?)/search(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/search(?:/)?$" }, { "page": "/[locale]/subject/[id]", "regex": "^/([^/]+?)/subject/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale", "nxtPid": "nxtPid" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/subject/(?<nxtPid>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/_global-error": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 9029, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_not-found": { "initialStatus": 404, "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 7804, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "routeType": "route", "response": "complete", "compute": "static", "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "396c5c8bf677cd76544d5789088840a1", "previewModeSigningKey": "f046d2c42b89df3648a3a01935904dadba9f05f4aea6fbf45945bb436a3bfe58", "previewModeEncryptionKey": "aec8a7b4bb27fa927ffe3df9839823ba4724d458b60fd225af80777e454132a0" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_0_kjzx3.js", "server/edge/chunks/[root-of-the-server]__1867t5a._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_10tjhr6.js"], "name": "middleware", "page": "/", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_10tjhr6.js", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next|_vercel|.*\\..*).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/((?!api|_next|_vercel|.*\\..*).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "smXD0mzR7vwU5fT67M89y", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Zju4HQjEgEH/sPLJid1GYI1ebjVBxRXvxHbImeTan4M=", "__NEXT_PREVIEW_MODE_ID": "396c5c8bf677cd76544d5789088840a1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "aec8a7b4bb27fa927ffe3df9839823ba4724d458b60fd225af80777e454132a0", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "f046d2c42b89df3648a3a01935904dadba9f05f4aea6fbf45945bb436a3bfe58" } } }, "sortedMiddleware": ["/"], "functions": {} };
var AppPathRoutesManifest = { "/[locale]/admin/dashboard/page": "/[locale]/admin/dashboard", "/[locale]/admin/login/page": "/[locale]/admin/login", "/[locale]/page": "/[locale]", "/[locale]/search/page": "/[locale]/search", "/[locale]/subject/[id]/page": "/[locale]/subject/[id]", "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/api/admin/delete/route": "/api/admin/delete", "/api/admin/upload/route": "/api/admin/upload", "/api/auth/callback/route": "/api/auth/callback", "/api/auth/login/route": "/api/auth/login", "/api/auth/logout/route": "/api/auth/logout", "/api/auth/register/route": "/api/auth/register", "/api/request-paper/route": "/api/request-paper", "/api/stats/route": "/api/stats", "/favicon.ico/route": "/favicon.ico" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/404": "pages/404.html", "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = NextConfig.deploymentId ?? BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified, isStaleFromTagCache = false) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  const isStaleFromTime = !isSSG && remainingTtl === 1;
  const isStale2 = isStaleFromTime || isStaleFromTagCache;
  if (!isSSG || isStaleFromTagCache) {
    const sMaxAge = isStaleFromTagCache ? 1 : remainingTtl;
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate,
      isStaleFromTagCache
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {}) && !NextConfig.experimental?.prefetchInlining;
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified, isStaleFromTagCache = false) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = event.headers.rsc === "1";
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified, isStaleFromTagCache);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => escapePathDelimiters(decodeURIComponent(segment), true)).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  try {
    localizedPath = decodePathParams(localizedPath) || "/";
  } catch {
    return event;
  }
  const cacheKey = localizedPath === "/" ? "/index" : localizedPath;
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath) || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(cacheKey);
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const tags = getTagsFromValue(cachedData.value);
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(cacheKey, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const _isStale = cachedData.shouldBypassTagCache ? false : await isStale(cacheKey, tags, cachedData.lastModified ?? Date.now());
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified, _isStale);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !(event.query.__nextDataReq === "1") && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      headers: {
        ...internalEvent.headers,
        "x-nextjs-data": "1"
      },
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(normalizedPath);
  } catch {
  }
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath) || decodedPath !== void 0 && r.test(decodedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
var NEXT_INTERNAL_HEADERS = [
  "x-middleware-rewrite",
  "x-middleware-redirect",
  "x-middleware-set-cookie",
  "x-middleware-skip",
  "x-middleware-override-headers",
  "x-middleware-next",
  "x-now-route-matches",
  "x-matched-path",
  "x-nextjs-data",
  "x-next-resume-state-length"
];
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey.startsWith(INTERNAL_HEADER_PREFIX) || lowerCaseKey.startsWith(MIDDLEWARE_HEADER_PREFIX) || NEXT_INTERNAL_HEADERS.includes(lowerCaseKey)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
