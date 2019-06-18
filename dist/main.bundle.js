/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {var require;var require;(function (f) {
  if (true) {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }(g.braintree || (g.braintree = {})).client = f();
  }
})(function () {
  var define, module, exports;return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;if (!f && c) return require(i, !0);if (u) return u(i, !0);var a = new Error("Cannot find module '" + i + "'");throw a.code = "MODULE_NOT_FOUND", a;
          }var p = n[i] = { exports: {} };e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];return o(n || r);
          }, p, p.exports, r, e, n, t);
        }return n[i].exports;
      }for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);return o;
    }return r;
  }()({ 1: [function (_dereq_, module, exports) {
      (function (global) {
        'use strict';

        var PromisePolyfill = _dereq_('promise-polyfill');

        module.exports = global.Promise || PromisePolyfill;
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "promise-polyfill": 10 }], 2: [function (_dereq_, module, exports) {
      'use strict';

      var Promise = _dereq_('./lib/promise');
      var scriptPromiseCache = {};

      function loadScript(options) {
        var attrs, container, script, scriptLoadPromise;
        var stringifiedOptions = JSON.stringify(options);

        if (!options.forceScriptReload) {
          scriptLoadPromise = scriptPromiseCache[stringifiedOptions];

          if (scriptLoadPromise) {
            return scriptLoadPromise;
          }
        }

        script = document.createElement('script');
        attrs = options.dataAttributes || {};
        container = options.container || document.head;

        script.src = options.src;
        script.id = options.id;
        script.async = true;

        Object.keys(attrs).forEach(function (key) {
          script.setAttribute('data-' + key, attrs[key]);
        });

        scriptLoadPromise = new Promise(function (resolve, reject) {
          script.addEventListener('load', function () {
            resolve(script);
          });
          script.addEventListener('error', function () {
            reject(new Error(options.src + ' failed to load.'));
          });
          script.addEventListener('abort', function () {
            reject(new Error(options.src + ' has aborted.'));
          });
          container.appendChild(script);
        });

        scriptPromiseCache[stringifiedOptions] = scriptLoadPromise;

        return scriptLoadPromise;
      }

      loadScript.clearCache = function () {
        scriptPromiseCache = {};
      };

      module.exports = loadScript;
    }, { "./lib/promise": 1 }], 3: [function (_dereq_, module, exports) {
      (function (global) {
        'use strict';

        var isIE11 = _dereq_('./is-ie11');

        module.exports = function isIE(ua) {
          ua = ua || global.navigator.userAgent;
          return ua.indexOf('MSIE') !== -1 || isIE11(ua);
        };
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "./is-ie11": 4 }], 4: [function (_dereq_, module, exports) {
      'use strict';

      module.exports = function isIe11(ua) {
        ua = ua || navigator.userAgent;
        return ua.indexOf('Trident/7') !== -1;
      };
    }, {}], 5: [function (_dereq_, module, exports) {
      'use strict';

      module.exports = function isIe9(ua) {
        ua = ua || navigator.userAgent;
        return ua.indexOf('MSIE 9') !== -1;
      };
    }, {}], 6: [function (_dereq_, module, exports) {
      'use strict';

      function deferred(fn) {
        return function () {
          // IE9 doesn't support passing arguments to setTimeout so we have to emulate it.
          var args = arguments;

          setTimeout(function () {
            try {
              fn.apply(null, args);
            } catch (err) {
              /* eslint-disable no-console */
              console.log('Error in callback function');
              console.log(err);
              /* eslint-enable no-console */
            }
          }, 1);
        };
      }

      module.exports = deferred;
    }, {}], 7: [function (_dereq_, module, exports) {
      'use strict';

      function once(fn) {
        var called = false;

        return function () {
          if (!called) {
            called = true;
            fn.apply(null, arguments);
          }
        };
      }

      module.exports = once;
    }, {}], 8: [function (_dereq_, module, exports) {
      'use strict';

      function promiseOrCallback(promise, callback) {
        // eslint-disable-line consistent-return
        if (callback) {
          promise.then(function (data) {
            callback(null, data);
          }).catch(function (err) {
            callback(err);
          });
        } else {
          return promise;
        }
      }

      module.exports = promiseOrCallback;
    }, {}], 9: [function (_dereq_, module, exports) {
      'use strict';

      var deferred = _dereq_('./lib/deferred');
      var once = _dereq_('./lib/once');
      var promiseOrCallback = _dereq_('./lib/promise-or-callback');

      function wrapPromise(fn) {
        return function () {
          var callback;
          var args = Array.prototype.slice.call(arguments);
          var lastArg = args[args.length - 1];

          if (typeof lastArg === 'function') {
            callback = args.pop();
            callback = once(deferred(callback));
          }

          return promiseOrCallback(fn.apply(this, args), callback); // eslint-disable-line no-invalid-this
        };
      }

      wrapPromise.wrapPrototype = function (target, options) {
        var methods, ignoreMethods, includePrivateMethods;

        options = options || {};
        ignoreMethods = options.ignoreMethods || [];
        includePrivateMethods = options.transformPrivateMethods === true;

        methods = Object.getOwnPropertyNames(target.prototype).filter(function (method) {
          var isNotPrivateMethod;
          var isNonConstructorFunction = method !== 'constructor' && typeof target.prototype[method] === 'function';
          var isNotAnIgnoredMethod = ignoreMethods.indexOf(method) === -1;

          if (includePrivateMethods) {
            isNotPrivateMethod = true;
          } else {
            isNotPrivateMethod = method.charAt(0) !== '_';
          }

          return isNonConstructorFunction && isNotPrivateMethod && isNotAnIgnoredMethod;
        });

        methods.forEach(function (method) {
          var original = target.prototype[method];

          target.prototype[method] = wrapPromise(original);
        });

        return target;
      };

      module.exports = wrapPromise;
    }, { "./lib/deferred": 6, "./lib/once": 7, "./lib/promise-or-callback": 8 }], 10: [function (_dereq_, module, exports) {
      'use strict';

      /**
       * @this {Promise}
       */

      function finallyConstructor(callback) {
        var constructor = this.constructor;
        return this.then(function (value) {
          return constructor.resolve(callback()).then(function () {
            return value;
          });
        }, function (reason) {
          return constructor.resolve(callback()).then(function () {
            return constructor.reject(reason);
          });
        });
      }

      // Store setTimeout reference so promise-polyfill will be unaffected by
      // other code modifying setTimeout (like sinon.useFakeTimers())
      var setTimeoutFunc = setTimeout;

      function noop() {}

      // Polyfill for Function.prototype.bind
      function bind(fn, thisArg) {
        return function () {
          fn.apply(thisArg, arguments);
        };
      }

      /**
       * @constructor
       * @param {Function} fn
       */
      function Promise(fn) {
        if (!(this instanceof Promise)) throw new TypeError('Promises must be constructed via new');
        if (typeof fn !== 'function') throw new TypeError('not a function');
        /** @type {!number} */
        this._state = 0;
        /** @type {!boolean} */
        this._handled = false;
        /** @type {Promise|undefined} */
        this._value = undefined;
        /** @type {!Array<!Function>} */
        this._deferreds = [];

        doResolve(fn, this);
      }

      function handle(self, deferred) {
        while (self._state === 3) {
          self = self._value;
        }
        if (self._state === 0) {
          self._deferreds.push(deferred);
          return;
        }
        self._handled = true;
        Promise._immediateFn(function () {
          var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
          if (cb === null) {
            (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
            return;
          }
          var ret;
          try {
            ret = cb(self._value);
          } catch (e) {
            reject(deferred.promise, e);
            return;
          }
          resolve(deferred.promise, ret);
        });
      }

      function resolve(self, newValue) {
        try {
          // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
          if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
          if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (newValue instanceof Promise) {
              self._state = 3;
              self._value = newValue;
              finale(self);
              return;
            } else if (typeof then === 'function') {
              doResolve(bind(then, newValue), self);
              return;
            }
          }
          self._state = 1;
          self._value = newValue;
          finale(self);
        } catch (e) {
          reject(self, e);
        }
      }

      function reject(self, newValue) {
        self._state = 2;
        self._value = newValue;
        finale(self);
      }

      function finale(self) {
        if (self._state === 2 && self._deferreds.length === 0) {
          Promise._immediateFn(function () {
            if (!self._handled) {
              Promise._unhandledRejectionFn(self._value);
            }
          });
        }

        for (var i = 0, len = self._deferreds.length; i < len; i++) {
          handle(self, self._deferreds[i]);
        }
        self._deferreds = null;
      }

      /**
       * @constructor
       */
      function Handler(onFulfilled, onRejected, promise) {
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.promise = promise;
      }

      /**
       * Take a potentially misbehaving resolver function and make sure
       * onFulfilled and onRejected are only called once.
       *
       * Makes no guarantees about asynchrony.
       */
      function doResolve(fn, self) {
        var done = false;
        try {
          fn(function (value) {
            if (done) return;
            done = true;
            resolve(self, value);
          }, function (reason) {
            if (done) return;
            done = true;
            reject(self, reason);
          });
        } catch (ex) {
          if (done) return;
          done = true;
          reject(self, ex);
        }
      }

      Promise.prototype['catch'] = function (onRejected) {
        return this.then(null, onRejected);
      };

      Promise.prototype.then = function (onFulfilled, onRejected) {
        // @ts-ignore
        var prom = new this.constructor(noop);

        handle(this, new Handler(onFulfilled, onRejected, prom));
        return prom;
      };

      Promise.prototype['finally'] = finallyConstructor;

      Promise.all = function (arr) {
        return new Promise(function (resolve, reject) {
          if (!arr || typeof arr.length === 'undefined') throw new TypeError('Promise.all accepts an array');
          var args = Array.prototype.slice.call(arr);
          if (args.length === 0) return resolve([]);
          var remaining = args.length;

          function res(i, val) {
            try {
              if (val && (typeof val === 'object' || typeof val === 'function')) {
                var then = val.then;
                if (typeof then === 'function') {
                  then.call(val, function (val) {
                    res(i, val);
                  }, reject);
                  return;
                }
              }
              args[i] = val;
              if (--remaining === 0) {
                resolve(args);
              }
            } catch (ex) {
              reject(ex);
            }
          }

          for (var i = 0; i < args.length; i++) {
            res(i, args[i]);
          }
        });
      };

      Promise.resolve = function (value) {
        if (value && typeof value === 'object' && value.constructor === Promise) {
          return value;
        }

        return new Promise(function (resolve) {
          resolve(value);
        });
      };

      Promise.reject = function (value) {
        return new Promise(function (resolve, reject) {
          reject(value);
        });
      };

      Promise.race = function (values) {
        return new Promise(function (resolve, reject) {
          for (var i = 0, len = values.length; i < len; i++) {
            values[i].then(resolve, reject);
          }
        });
      };

      // Use polyfill for setImmediate for performance gains
      Promise._immediateFn = typeof setImmediate === 'function' && function (fn) {
        setImmediate(fn);
      } || function (fn) {
        setTimeoutFunc(fn, 0);
      };

      Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
        if (typeof console !== 'undefined' && console) {
          console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
        }
      };

      module.exports = Promise;
    }, {}], 11: [function (_dereq_, module, exports) {
      'use strict';

      var isIe = _dereq_('@braintree/browser-detection/is-ie');
      var isIe9 = _dereq_('@braintree/browser-detection/is-ie9');

      module.exports = {
        isIe: isIe,
        isIe9: isIe9
      };
    }, { "@braintree/browser-detection/is-ie": 3, "@braintree/browser-detection/is-ie9": 5 }], 12: [function (_dereq_, module, exports) {
      'use strict';

      var BRAINTREE_VERSION = _dereq_('./constants').BRAINTREE_VERSION;

      var GraphQL = _dereq_('./request/graphql');
      var request = _dereq_('./request');
      var isVerifiedDomain = _dereq_('../lib/is-verified-domain');
      var BraintreeError = _dereq_('../lib/braintree-error');
      var convertToBraintreeError = _dereq_('../lib/convert-to-braintree-error');
      var createAuthorizationData = _dereq_('../lib/create-authorization-data');
      var getGatewayConfiguration = _dereq_('./get-configuration').getConfiguration;
      var addMetadata = _dereq_('../lib/add-metadata');
      var Promise = _dereq_('../lib/promise');
      var wrapPromise = _dereq_('@braintree/wrap-promise');
      var once = _dereq_('../lib/once');
      var deferred = _dereq_('../lib/deferred');
      var assign = _dereq_('../lib/assign').assign;
      var analytics = _dereq_('../lib/analytics');
      var constants = _dereq_('./constants');
      var errors = _dereq_('./errors');
      var sharedErrors = _dereq_('../lib/errors');
      var VERSION = _dereq_('../lib/constants').VERSION;
      var GRAPHQL_URLS = _dereq_('../lib/constants').GRAPHQL_URLS;
      var methods = _dereq_('../lib/methods');
      var convertMethodsToError = _dereq_('../lib/convert-methods-to-error');
      var assets = _dereq_('../lib/assets');
      var FRAUDNET_FNCLS = _dereq_('../lib/constants').FRAUDNET_FNCLS;
      var FRAUDNET_SOURCE = _dereq_('../lib/constants').FRAUDNET_SOURCE;
      var FRAUDNET_URL = _dereq_('../lib/constants').FRAUDNET_URL;

      var cachedClients = {};

      /**
       * This object is returned by {@link Client#getConfiguration|getConfiguration}. This information is used extensively by other Braintree modules to properly configure themselves.
       * @typedef {object} Client~configuration
       * @property {object} client The braintree-web/client parameters.
       * @property {string} client.authorization A tokenizationKey or clientToken.
       * @property {object} gatewayConfiguration Gateway-supplied configuration.
       * @property {object} analyticsMetadata Analytics-specific data.
       * @property {string} analyticsMetadata.sessionId Uniquely identifies a browsing session.
       * @property {string} analyticsMetadata.sdkVersion The braintree.js version.
       * @property {string} analyticsMetadata.merchantAppId Identifies the merchant's web app.
       */

      /**
       * @class
       * @param {Client~configuration} configuration Options
       * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/client.create|braintree.client.create} instead.</strong>
       * @classdesc This class is required by many other Braintree components. It serves as the base API layer that communicates with our servers. It is also capable of being used to formulate direct calls to our servers, such as direct credit card tokenization. See {@link Client#request}.
       */
      function Client(configuration) {
        var configurationJSON, gatewayConfiguration, braintreeApiConfiguration;

        configuration = configuration || {};

        configurationJSON = JSON.stringify(configuration);
        gatewayConfiguration = configuration.gatewayConfiguration;

        if (!gatewayConfiguration) {
          throw new BraintreeError(errors.CLIENT_MISSING_GATEWAY_CONFIGURATION);
        }

        ['assetsUrl', 'clientApiUrl', 'configUrl'].forEach(function (property) {
          if (property in gatewayConfiguration && !isVerifiedDomain(gatewayConfiguration[property])) {
            throw new BraintreeError({
              type: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
              code: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
              message: property + ' property is on an invalid domain.'
            });
          }
        });

        /**
         * Returns a copy of the configuration values.
         * @public
         * @returns {Client~configuration} configuration
         */
        this.getConfiguration = function () {
          return JSON.parse(configurationJSON);
        };

        this._request = request;
        this._configuration = this.getConfiguration();

        this._clientApiBaseUrl = gatewayConfiguration.clientApiUrl + '/v1/';

        braintreeApiConfiguration = gatewayConfiguration.braintreeApi;
        if (braintreeApiConfiguration) {
          this._braintreeApi = {
            baseUrl: braintreeApiConfiguration.url + '/',
            accessToken: braintreeApiConfiguration.accessToken
          };

          if (!isVerifiedDomain(this._braintreeApi.baseUrl)) {
            throw new BraintreeError({
              type: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
              code: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
              message: 'braintreeApi URL is on an invalid domain.'
            });
          }
        }

        if (gatewayConfiguration.graphQL) {
          this._graphQL = new GraphQL({
            graphQL: gatewayConfiguration.graphQL
          });
        }
      }

      Client.initialize = function (options) {
        var clientInstance;
        var promise = cachedClients[options.authorization];

        if (promise) {
          analytics.sendEvent(promise, 'custom.client.load.cached');

          return promise;
        }

        promise = getGatewayConfiguration(options).then(function (configuration) {
          if (options.debug) {
            configuration.isDebug = true;
          }

          clientInstance = new Client(configuration);

          return clientInstance;
        });

        cachedClients[options.authorization] = promise;

        analytics.sendEvent(promise, 'custom.client.load.initialized');

        return promise.then(function (client) {
          analytics.sendEvent(clientInstance, 'custom.client.load.succeeded');

          return client;
        }).catch(function (err) {
          delete cachedClients[options.authorization];

          return Promise.reject(err);
        });
      };

      // Primarily used for testing the client initalization call
      Client.clearCache = function () {
        cachedClients = {};
      };

      Client.prototype._findOrCreateFraudnetJSON = function (clientMetadataId) {
        var el = document.querySelector('script[fncls="' + FRAUDNET_FNCLS + '"]');
        var config, additionalData, authorizationFingerprint, parameters;

        if (!el) {
          el = document.body.appendChild(document.createElement('script'));
          el.type = 'application/json';
          el.setAttribute('fncls', FRAUDNET_FNCLS);
        }

        config = this.getConfiguration();
        additionalData = {
          rda_tenant: 'bt_card', // eslint-disable-line camelcase
          mid: config.gatewayConfiguration.merchantId
        };
        authorizationFingerprint = createAuthorizationData(config.authorization).attrs.authorizationFingerprint;

        if (authorizationFingerprint) {
          authorizationFingerprint.split('&').forEach(function (pieces) {
            var component = pieces.split('=');

            if (component[0] === 'customer_id' && component.length > 1) {
              additionalData.cid = component[1];
            }
          });
        }

        parameters = {
          f: clientMetadataId.substr(0, 32),
          fp: additionalData,
          bu: false,
          s: FRAUDNET_SOURCE
        };
        el.text = JSON.stringify(parameters);
      };

      /**
       * Used by other modules to formulate all network requests to the Braintree gateway. It is also capable of being used directly from your own form to tokenize credit card information. However, be sure to satisfy PCI compliance if you use direct card tokenization.
       * @public
       * @param {object} options Request options:
       * @param {string} options.method HTTP method, e.g. "get" or "post".
       * @param {string} options.endpoint Endpoint path, e.g. "payment_methods".
       * @param {object} options.data Data to send with the request.
       * @param {number} [options.timeout=60000] Set a timeout (in milliseconds) for the request.
       * @param {callback} [callback] The second argument, <code>data</code>, is the returned server data.
       * @example
       * <caption>Direct Credit Card Tokenization</caption>
       * var createClient = require('braintree-web/client').create;
       *
       * createClient({
       *   authorization: CLIENT_AUTHORIZATION
       * }, function (createErr, clientInstance) {
       *   var form = document.getElementById('my-form-id');
       *   var data = {
       *     creditCard: {
       *       number: form['cc-number'].value,
       *       cvv: form['cc-cvv'].value,
       *       expirationDate: form['cc-expiration-date'].value,
       *       billingAddress: {
       *         postalCode: form['cc-postal-code'].value
       *       },
       *       options: {
       *         validate: false
       *       }
       *     }
       *   };
       *
       *   // Warning: For a merchant to be eligible for the easiest level of PCI compliance (SAQ A),
       *   // payment fields cannot be hosted on your checkout page.
       *   // For an alternative to the following, use Hosted Fields.
       *   clientInstance.request({
       *     endpoint: 'payment_methods/credit_cards',
       *     method: 'post',
       *     data: data
       *   }, function (requestErr, response) {
       *     // More detailed example of handling API errors: https://codepen.io/braintree/pen/MbwjdM
       *     if (requestErr) { throw new Error(requestErr); }
       *
       *     console.log('Got nonce:', response.creditCards[0].nonce);
       *   });
       * });
       * @example
       * <caption>Tokenizing Fields for AVS Checks</caption>
       * var createClient = require('braintree-web/client').create;
       *
       * createClient({
       *   authorization: CLIENT_AUTHORIZATION
       * }, function (createErr, clientInstance) {
       *   var form = document.getElementById('my-form-id');
       *   var data = {
       *     creditCard: {
       *       number: form['cc-number'].value,
       *       cvv: form['cc-cvv'].value,
       *       expirationDate: form['cc-date'].value,
       *       // The billing address can be checked with AVS rules.
       *       // See: https://articles.braintreepayments.com/support/guides/fraud-tools/basic/avs-cvv-rules
       *       billingAddress: {
       *         postalCode: form['cc-postal-code'].value,
       *         streetAddress: form['cc-street-address'].value,
       *         countryName: form['cc-country-name'].value,
       *         countryCodeAlpha2: form['cc-country-alpha2'].value,
       *         countryCodeAlpha3: form['cc-country-alpha3'].value,
       *         countryCodeNumeric: form['cc-country-numeric'].value
       *       },
       *       options: {
       *         validate: false
       *       }
       *     }
       *   };
       *
       *   // Warning: For a merchant to be eligible for the easiest level of PCI compliance (SAQ A),
       *   // payment fields cannot be hosted on your checkout page.
       *   // For an alternative to the following, use Hosted Fields.
       *   clientInstance.request({
       *     endpoint: 'payment_methods/credit_cards',
       *     method: 'post',
       *     data: data
       *   }, function (requestErr, response) {
       *     // More detailed example of handling API errors: https://codepen.io/braintree/pen/MbwjdM
       *     if (requestErr) { throw new Error(requestErr); }
       *
       *     console.log('Got nonce:', response.creditCards[0].nonce);
       *   });
       * });
       * @returns {Promise|void} Returns a promise if no callback is provided.
       */
      Client.prototype.request = function (options, callback) {
        var self = this; // eslint-disable-line no-invalid-this
        var requestPromise = new Promise(function (resolve, reject) {
          var optionName, api, baseUrl, requestOptions;
          var shouldCollectData = Boolean(options.endpoint === 'payment_methods/credit_cards' && self.getConfiguration().gatewayConfiguration.creditCards.collectDeviceData);

          if (options.api !== 'graphQLApi') {
            if (!options.method) {
              optionName = 'options.method';
            } else if (!options.endpoint) {
              optionName = 'options.endpoint';
            }
          }

          if (optionName) {
            throw new BraintreeError({
              type: errors.CLIENT_OPTION_REQUIRED.type,
              code: errors.CLIENT_OPTION_REQUIRED.code,
              message: optionName + ' is required when making a request.'
            });
          }

          if ('api' in options) {
            api = options.api;
          } else {
            api = 'clientApi';
          }

          requestOptions = {
            method: options.method,
            graphQL: self._graphQL,
            timeout: options.timeout,
            metadata: self._configuration.analyticsMetadata
          };

          if (api === 'clientApi') {
            baseUrl = self._clientApiBaseUrl;

            requestOptions.data = addMetadata(self._configuration, options.data);
          } else if (api === 'braintreeApi') {
            if (!self._braintreeApi) {
              throw new BraintreeError(sharedErrors.BRAINTREE_API_ACCESS_RESTRICTED);
            }

            baseUrl = self._braintreeApi.baseUrl;

            requestOptions.data = options.data;

            requestOptions.headers = {
              'Braintree-Version': constants.BRAINTREE_API_VERSION_HEADER,
              Authorization: 'Bearer ' + self._braintreeApi.accessToken
            };
          } else if (api === 'graphQLApi') {
            baseUrl = GRAPHQL_URLS[self._configuration.gatewayConfiguration.environment];
            options.endpoint = '';
            requestOptions.method = 'post';
            requestOptions.data = assign({
              clientSdkMetadata: {
                source: self._configuration.analyticsMetadata.source,
                integration: self._configuration.analyticsMetadata.integration,
                sessionId: self._configuration.analyticsMetadata.sessionId
              }
            }, options.data);

            requestOptions.headers = getAuthorizationHeadersForGraphQL(self._configuration.authorization);
          } else {
            throw new BraintreeError({
              type: errors.CLIENT_OPTION_INVALID.type,
              code: errors.CLIENT_OPTION_INVALID.code,
              message: 'options.api is invalid.'
            });
          }

          requestOptions.url = baseUrl + options.endpoint;
          requestOptions.sendAnalyticsEvent = function (kind) {
            analytics.sendEvent(self, kind);
          };

          self._request(requestOptions, function (err, data, status) {
            var resolvedData, requestError;

            requestError = formatRequestError(status, err);

            if (requestError) {
              reject(requestError);

              return;
            }

            if (api === 'graphQLApi' && data.errors) {
              reject(convertToBraintreeError(data.errors, {
                type: errors.CLIENT_GRAPHQL_REQUEST_ERROR.type,
                code: errors.CLIENT_GRAPHQL_REQUEST_ERROR.code,
                message: errors.CLIENT_GRAPHQL_REQUEST_ERROR.message
              }));

              return;
            }

            resolvedData = assign({ _httpStatus: status }, data);

            if (shouldCollectData && resolvedData.creditCards && resolvedData.creditCards.length > 0) {
              self._findOrCreateFraudnetJSON(resolvedData.creditCards[0].nonce);

              assets.loadScript({
                src: FRAUDNET_URL,
                forceScriptReload: true
              });
            }
            resolve(resolvedData);
          });
        });

        if (typeof callback === 'function') {
          callback = once(deferred(callback));

          requestPromise.then(function (response) {
            callback(null, response, response._httpStatus);
          }).catch(function (err) {
            var status = err && err.details && err.details.httpStatus;

            callback(err, null, status);
          });

          return;
        }

        return requestPromise; // eslint-disable-line consistent-return
      };

      function formatRequestError(status, err) {
        // eslint-disable-line consistent-return
        var requestError;

        if (status === -1) {
          requestError = new BraintreeError(errors.CLIENT_REQUEST_TIMEOUT);
        } else if (status === 403) {
          requestError = new BraintreeError(errors.CLIENT_AUTHORIZATION_INSUFFICIENT);
        } else if (status === 429) {
          requestError = new BraintreeError(errors.CLIENT_RATE_LIMITED);
        } else if (status >= 500) {
          requestError = new BraintreeError(errors.CLIENT_GATEWAY_NETWORK);
        } else if (status < 200 || status >= 400) {
          requestError = convertToBraintreeError(err, {
            type: errors.CLIENT_REQUEST_ERROR.type,
            code: errors.CLIENT_REQUEST_ERROR.code,
            message: errors.CLIENT_REQUEST_ERROR.message
          });
        }

        if (requestError) {
          requestError.details = requestError.details || {};
          requestError.details.httpStatus = status;

          return requestError;
        }
      }

      Client.prototype.toJSON = function () {
        return this.getConfiguration();
      };

      /**
       * Returns the Client version.
       * @public
       * @returns {String} The created client's version.
       * @example
       * var createClient = require('braintree-web/client').create;
       *
       * createClient({
       *   authorization: CLIENT_AUTHORIZATION
       * }, function (createErr, clientInstance) {
       *   console.log(clientInstance.getVersion()); // Ex: 1.0.0
       * });
       * @returns {void}
       */
      Client.prototype.getVersion = function () {
        return VERSION;
      };

      /**
       * Cleanly tear down anything set up by {@link module:braintree-web/client.create|create}.
       * @public
       * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
       * @example
       * clientInstance.teardown();
       * @example <caption>With callback</caption>
       * clientInstance.teardown(function () {
       *   // teardown is complete
       * });
       * @returns {Promise|void} Returns a promise if no callback is provided.
       */
      Client.prototype.teardown = wrapPromise(function () {
        var self = this; // eslint-disable-line no-invalid-this

        delete cachedClients[self.getConfiguration().authorization];
        convertMethodsToError(self, methods(Client.prototype));

        return Promise.resolve();
      });

      function getAuthorizationHeadersForGraphQL(authorization) {
        var authAttrs = createAuthorizationData(authorization).attrs;
        var token = authAttrs.authorizationFingerprint || authAttrs.tokenizationKey;

        return {
          Authorization: 'Bearer ' + token,
          'Braintree-Version': BRAINTREE_VERSION
        };
      }

      module.exports = Client;
    }, { "../lib/add-metadata": 33, "../lib/analytics": 34, "../lib/assets": 35, "../lib/assign": 36, "../lib/braintree-error": 37, "../lib/constants": 38, "../lib/convert-methods-to-error": 39, "../lib/convert-to-braintree-error": 40, "../lib/create-authorization-data": 41, "../lib/deferred": 42, "../lib/errors": 44, "../lib/is-verified-domain": 46, "../lib/methods": 48, "../lib/once": 49, "../lib/promise": 50, "./constants": 13, "./errors": 14, "./get-configuration": 15, "./request": 27, "./request/graphql": 25, "@braintree/wrap-promise": 9 }], 13: [function (_dereq_, module, exports) {
      'use strict';

      module.exports = {
        BRAINTREE_API_VERSION_HEADER: '2017-04-03',
        BRAINTREE_VERSION: '2018-05-10'
      };
    }, {}], 14: [function (_dereq_, module, exports) {
      'use strict';

      /**
       * @name BraintreeError.Client - Interal Error Codes
       * @ignore
       * @description These codes should never be experienced by the mechant directly.
       * @property {MERCHANT} CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN An error to prevent client creation for domains that are not allowed in the JS.
       * @property {INTERNAL} CLIENT_MISSING_GATEWAY_CONFIGURATION Occurs when the client is created without a gateway configuration. Should never happen.
       */

      /**
       * @name BraintreeError.Client - Create Error Codes
       * @description Errors that may occur when [creating the client](/current/module-braintree-web_client.html#.create)
       * @property {MERCHANT} CLIENT_INVALID_AUTHORIZATION Occurs when client token cannot be parsed.
       */

      /**
       * @name BraintreeError.Client - Request Error Codes
       * @description Errors that may occur when [using the request method](/current/Client.html#request)
       * @property {MERCHANT} CLIENT_OPTION_REQUIRED An option required in the request method was not provided. Usually `options.method` or `options.endpoint`
       * @property {MERCHANT} CLIENT_OPTION_INVALID The request option provided is invalid.
       * @property {MERCHANT} CLIENT_GATEWAY_NETWORK The Braintree gateway could not be contacted.
       * @property {NETWORK} CLIENT_REQUEST_TIMEOUT The request took too long to complete and timed out.
       * @property {NETWORK} CLIENT_REQUEST_ERROR The response from a request had status 400 or greater.
       * @property {NETWORK} CLIENT_GRAPHQL_REQUEST_ERROR The response from a request to GraphQL contained an error.
       * @property {MERCHANT} CLIENT_RATE_LIMITED The response from a request had a status of 429, indicating rate limiting.
       * @property {MERCHANT} CLIENT_AUTHORIZATION_INSUFFICIENT The user assocaited with the client token or tokenization key does not have permissions to make the request.
       */

      var BraintreeError = _dereq_('../lib/braintree-error');

      module.exports = {
        CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN: {
          type: BraintreeError.types.MERCHANT,
          code: 'CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN'
        },
        CLIENT_OPTION_REQUIRED: {
          type: BraintreeError.types.MERCHANT,
          code: 'CLIENT_OPTION_REQUIRED'
        },
        CLIENT_OPTION_INVALID: {
          type: BraintreeError.types.MERCHANT,
          code: 'CLIENT_OPTION_INVALID'
        },
        CLIENT_MISSING_GATEWAY_CONFIGURATION: {
          type: BraintreeError.types.INTERNAL,
          code: 'CLIENT_MISSING_GATEWAY_CONFIGURATION',
          message: 'Missing gatewayConfiguration.'
        },
        CLIENT_INVALID_AUTHORIZATION: {
          type: BraintreeError.types.MERCHANT,
          code: 'CLIENT_INVALID_AUTHORIZATION',
          message: 'Authorization is invalid. Make sure your client token or tokenization key is valid.'
        },
        CLIENT_GATEWAY_NETWORK: {
          type: BraintreeError.types.NETWORK,
          code: 'CLIENT_GATEWAY_NETWORK',
          message: 'Cannot contact the gateway at this time.'
        },
        CLIENT_REQUEST_TIMEOUT: {
          type: BraintreeError.types.NETWORK,
          code: 'CLIENT_REQUEST_TIMEOUT',
          message: 'Request timed out waiting for a reply.'
        },
        CLIENT_REQUEST_ERROR: {
          type: BraintreeError.types.NETWORK,
          code: 'CLIENT_REQUEST_ERROR',
          message: 'There was a problem with your request.'
        },
        CLIENT_GRAPHQL_REQUEST_ERROR: {
          type: BraintreeError.types.NETWORK,
          code: 'CLIENT_GRAPHQL_REQUEST_ERROR',
          message: 'There was a problem with your request.'
        },
        CLIENT_RATE_LIMITED: {
          type: BraintreeError.types.MERCHANT,
          code: 'CLIENT_RATE_LIMITED',
          message: 'You are being rate-limited; please try again in a few minutes.'
        },
        CLIENT_AUTHORIZATION_INSUFFICIENT: {
          type: BraintreeError.types.MERCHANT,
          code: 'CLIENT_AUTHORIZATION_INSUFFICIENT',
          message: 'The authorization used has insufficient privileges.'
        }
      };
    }, { "../lib/braintree-error": 37 }], 15: [function (_dereq_, module, exports) {
      (function (global) {
        'use strict';

        var BraintreeError = _dereq_('../lib/braintree-error');
        var Promise = _dereq_('../lib/promise');
        var wrapPromise = _dereq_('@braintree/wrap-promise');
        var request = _dereq_('./request');
        var uuid = _dereq_('../lib/vendor/uuid');
        var constants = _dereq_('../lib/constants');
        var createAuthorizationData = _dereq_('../lib/create-authorization-data');
        var errors = _dereq_('./errors');
        var GraphQL = _dereq_('./request/graphql');
        var isDateStringBeforeOrOn = _dereq_('../lib/is-date-string-before-or-on');

        var BRAINTREE_VERSION = _dereq_('./constants').BRAINTREE_VERSION;

        function getConfiguration(options) {
          return new Promise(function (resolve, reject) {
            var configuration, authData, attrs, configUrl, reqOptions;
            var sessionId = uuid();
            var analyticsMetadata = {
              merchantAppId: global.location.host,
              platform: constants.PLATFORM,
              sdkVersion: constants.VERSION,
              source: constants.SOURCE,
              integration: constants.INTEGRATION,
              integrationType: constants.INTEGRATION,
              sessionId: sessionId
            };

            try {
              authData = createAuthorizationData(options.authorization);
            } catch (err) {
              reject(new BraintreeError(errors.CLIENT_INVALID_AUTHORIZATION));

              return;
            }
            attrs = authData.attrs;
            configUrl = authData.configUrl;

            attrs._meta = analyticsMetadata;
            attrs.braintreeLibraryVersion = constants.BRAINTREE_LIBRARY_VERSION;
            attrs.configVersion = '3';

            reqOptions = {
              url: configUrl,
              method: 'GET',
              data: attrs
            };

            if (attrs.authorizationFingerprint && authData.graphQL) {
              if (isDateStringBeforeOrOn(authData.graphQL.date, BRAINTREE_VERSION)) {
                reqOptions.graphQL = new GraphQL({
                  graphQL: {
                    url: authData.graphQL.url,
                    features: ['configuration']
                  }
                });
              }

              reqOptions.metadata = analyticsMetadata;
            }

            request(reqOptions, function (err, response, status) {
              var errorTemplate;

              if (err) {
                if (status === 403) {
                  errorTemplate = errors.CLIENT_AUTHORIZATION_INSUFFICIENT;
                } else {
                  errorTemplate = errors.CLIENT_GATEWAY_NETWORK;
                }

                reject(new BraintreeError({
                  type: errorTemplate.type,
                  code: errorTemplate.code,
                  message: errorTemplate.message,
                  details: {
                    originalError: err
                  }
                }));

                return;
              }

              configuration = {
                authorization: options.authorization,
                authorizationType: attrs.tokenizationKey ? 'TOKENIZATION_KEY' : 'CLIENT_TOKEN',
                analyticsMetadata: analyticsMetadata,
                gatewayConfiguration: response
              };

              resolve(configuration);
            });
          });
        }

        module.exports = {
          getConfiguration: wrapPromise(getConfiguration)
        };
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "../lib/braintree-error": 37, "../lib/constants": 38, "../lib/create-authorization-data": 41, "../lib/is-date-string-before-or-on": 45, "../lib/promise": 50, "../lib/vendor/uuid": 53, "./constants": 13, "./errors": 14, "./request": 27, "./request/graphql": 25, "@braintree/wrap-promise": 9 }], 16: [function (_dereq_, module, exports) {
      'use strict';

      var BraintreeError = _dereq_('../lib/braintree-error');
      var Client = _dereq_('./client');
      var VERSION = "3.46.0";
      var Promise = _dereq_('../lib/promise');
      var wrapPromise = _dereq_('@braintree/wrap-promise');
      var sharedErrors = _dereq_('../lib/errors');

      /** @module braintree-web/client */

      /**
       * @function create
       * @description This function is the entry point for the <code>braintree.client</code> module. It is used for creating {@link Client} instances that service communication to Braintree servers.
       * @param {object} options Object containing all {@link Client} options:
       * @param {string} options.authorization A tokenizationKey or clientToken.
       * @param {callback} [callback] The second argument, <code>data</code>, is the {@link Client} instance.
       * @returns {Promise|void} Returns a promise if no callback is provided.
       * @example
       * var createClient = require('braintree-web/client').create;
       *
       * createClient({
       *   authorization: CLIENT_AUTHORIZATION
       * }, function (createErr, clientInstance) {
       *   // ...
       * });
       * @static
       */
      function create(options) {
        if (!options.authorization) {
          return Promise.reject(new BraintreeError({
            type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
            code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
            message: 'options.authorization is required when instantiating a client.'
          }));
        }

        return Client.initialize(options);
      }

      module.exports = {
        create: wrapPromise(create),
        /**
         * @description The current version of the SDK, i.e. `{@pkg version}`.
         * @type {string}
         */
        VERSION: VERSION
      };
    }, { "../lib/braintree-error": 37, "../lib/errors": 44, "../lib/promise": 50, "./client": 12, "@braintree/wrap-promise": 9 }], 17: [function (_dereq_, module, exports) {
      'use strict';

      var querystring = _dereq_('../../lib/querystring');
      var browserDetection = _dereq_('../browser-detection');
      var assign = _dereq_('../../lib/assign').assign;
      var prepBody = _dereq_('./prep-body');
      var parseBody = _dereq_('./parse-body');
      var xhr = _dereq_('./xhr');
      var isXHRAvailable = xhr.isAvailable;
      var GraphQLRequest = _dereq_('./graphql/request');
      var DefaultRequest = _dereq_('./default-request');

      var MAX_TCP_RETRYCOUNT = 1;
      var TCP_PRECONNECT_BUG_STATUS_CODE = 408;

      function requestShouldRetry(status) {
        return (!status || status === TCP_PRECONNECT_BUG_STATUS_CODE) && browserDetection.isIe();
      }

      function graphQLRequestShouldRetryWithClientApi(body) {
        var errorClass = !body.data && body.errors && body.errors[0] && body.errors[0].extensions && body.errors[0].extensions.errorClass;

        return errorClass === 'UNKNOWN' || errorClass === 'INTERNAL';
      }

      function _requestWithRetry(options, tcpRetryCount, cb) {
        var status, resBody, ajaxRequest, body, method, headers, parsedBody;
        var url = options.url;
        var graphQL = options.graphQL;
        var timeout = options.timeout;
        var req = xhr.getRequestObject();
        var callback = cb;
        var isGraphQLRequest = Boolean(graphQL && graphQL.isGraphQLRequest(url, options.data));

        options.headers = assign({ 'Content-Type': 'application/json' }, options.headers);

        if (isGraphQLRequest) {
          ajaxRequest = new GraphQLRequest(options);
        } else {
          ajaxRequest = new DefaultRequest(options);
        }

        url = ajaxRequest.getUrl();
        body = ajaxRequest.getBody();
        method = ajaxRequest.getMethod();
        headers = ajaxRequest.getHeaders();

        if (method === 'GET') {
          url = querystring.queryify(url, body);
          body = null;
        }

        if (isXHRAvailable) {
          req.onreadystatechange = function () {
            if (req.readyState !== 4) {
              return;
            }

            if (req.status === 0 && isGraphQLRequest) {
              // If a merchant experiences a connection
              // issue to the GraphQL endpoint (possibly
              // due to a Content Security Policy), retry
              // the request against the old client API.
              delete options.graphQL;
              _requestWithRetry(options, tcpRetryCount, cb);

              return;
            }

            parsedBody = parseBody(req.responseText);
            resBody = ajaxRequest.adaptResponseBody(parsedBody);
            status = ajaxRequest.determineStatus(req.status, parsedBody);

            if (status >= 400 || status < 200) {
              if (isGraphQLRequest && graphQLRequestShouldRetryWithClientApi(parsedBody)) {
                delete options.graphQL;
                _requestWithRetry(options, tcpRetryCount, cb);

                return;
              }

              if (tcpRetryCount < MAX_TCP_RETRYCOUNT && requestShouldRetry(status)) {
                tcpRetryCount++;
                _requestWithRetry(options, tcpRetryCount, cb);

                return;
              }
              callback(resBody || 'error', null, status || 500);
            } else {
              callback(null, resBody, status);
            }
          };
        } else {
          if (options.headers) {
            url = querystring.queryify(url, headers);
          }

          req.onload = function () {
            callback(null, parseBody(req.responseText), req.status);
          };

          req.onerror = function () {
            // XDomainRequest does not report a body or status for errors, so
            // hardcode to 'error' and 500, respectively
            callback('error', null, 500);
          };

          // This must remain for IE9 to work
          req.onprogress = function () {};

          req.ontimeout = function () {
            callback('timeout', null, -1);
          };
        }

        try {
          req.open(method, url, true);
        } catch (requestOpenError) {
          // If a merchant has a Content Security Policy and they have
          // not allowed our endpoints, some browsers may
          // synchronously throw an error. If it is not a GraphQL
          // request, we throw the error. If it is a GraphQL request
          // we remove the GraphQL option and try the request against
          // the old client API.
          if (!isGraphQLRequest) {
            throw requestOpenError;
          }

          delete options.graphQL;

          _requestWithRetry(options, tcpRetryCount, cb);

          return;
        }

        req.timeout = timeout;

        if (isXHRAvailable) {
          Object.keys(headers).forEach(function (headerKey) {
            req.setRequestHeader(headerKey, headers[headerKey]);
          });
        }

        try {
          req.send(prepBody(method, body));
        } catch (e) {/* ignored */}
      }

      function request(options, cb) {
        _requestWithRetry(options, 0, cb);
      }

      module.exports = {
        request: request
      };
    }, { "../../lib/assign": 36, "../../lib/querystring": 51, "../browser-detection": 11, "./default-request": 18, "./graphql/request": 26, "./parse-body": 30, "./prep-body": 31, "./xhr": 32 }], 18: [function (_dereq_, module, exports) {
      'use strict';

      function DefaultRequest(options) {
        this._url = options.url;
        this._data = options.data;
        this._method = options.method;
        this._headers = options.headers;
      }

      DefaultRequest.prototype.getUrl = function () {
        return this._url;
      };

      DefaultRequest.prototype.getBody = function () {
        return this._data;
      };

      DefaultRequest.prototype.getMethod = function () {
        return this._method;
      };

      DefaultRequest.prototype.getHeaders = function () {
        return this._headers;
      };

      DefaultRequest.prototype.adaptResponseBody = function (parsedBody) {
        return parsedBody;
      };

      DefaultRequest.prototype.determineStatus = function (status) {
        return status;
      };

      module.exports = DefaultRequest;
    }, {}], 19: [function (_dereq_, module, exports) {
      (function (global) {
        'use strict';

        module.exports = function getUserAgent() {
          return global.navigator.userAgent;
        };
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 20: [function (_dereq_, module, exports) {
      'use strict';

      var errorResponseAdapter = _dereq_('./error');
      var assign = _dereq_('../../../../lib/assign').assign;

      /* eslint-disable camelcase */
      var cardTypeTransforms = {
        creditCard: {
          AMERICAN_EXPRESS: 'American Express',
          DISCOVER: 'Discover',
          INTERNATIONAL_MAESTRO: 'Maestro',
          JCB: 'JCB',
          MASTERCARD: 'MasterCard',
          SOLO: 'Solo',
          UK_MAESTRO: 'UK Maestro',
          UNION_PAY: 'UnionPay',
          VISA: 'Visa'
        },
        applePayWeb: {
          VISA: 'visa',
          MASTERCARD: 'mastercard',
          DISCOVER: 'discover',
          AMERICAN_EXPRESS: 'amex'
        },
        visaCheckout: {
          VISA: 'Visa',
          MASTERCARD: 'MasterCard',
          DISCOVER: 'Discover',
          AMERICAN_EXPRESS: 'American Express'
        },
        googlePay: {
          VISA: 'visa',
          MASTERCARD: 'mastercard',
          DISCOVER: 'discover',
          AMERICAN_EXPRESS: 'amex'
        },
        masterpass: {
          VISA: 'visa',
          MASTERCARD: 'master',
          DISCOVER: 'discover',
          AMERICAN_EXPRESS: 'amex',
          DINERS: 'diners',
          INTERNATIONAL_MAESTRO: 'maestro',
          JCB: 'jcb'
        }
      };
      /* eslint-enable camelcase */

      function configurationResponseAdapter(responseBody, ctx) {
        var adaptedResponse;

        if (responseBody.data && !responseBody.errors) {
          adaptedResponse = adaptConfigurationResponseBody(responseBody, ctx);
        } else {
          adaptedResponse = errorResponseAdapter(responseBody);
        }

        return adaptedResponse;
      }

      function adaptConfigurationResponseBody(body, ctx) {
        var configuration = body.data.clientConfiguration;
        var response;

        response = {
          environment: configuration.environment.toLowerCase(),
          clientApiUrl: configuration.clientApiUrl,
          assetsUrl: configuration.assetsUrl,
          analytics: {
            url: configuration.analyticsUrl
          },
          merchantId: configuration.merchantId,
          venmo: 'off'
        };

        if (configuration.supportedFeatures) {
          response.graphQL = {
            url: ctx._graphQL._config.url,
            features: configuration.supportedFeatures.map(function (feature) {
              return feature.toLowerCase();
            })
          };
        }

        if (configuration.braintreeApi) {
          response.braintreeApi = configuration.braintreeApi;
        }

        if (configuration.applePayWeb) {
          response.applePayWeb = configuration.applePayWeb;
          response.applePayWeb.supportedNetworks = mapCardTypes(configuration.applePayWeb.supportedCardBrands, cardTypeTransforms.applePayWeb);

          delete response.applePayWeb.supportedCardBrands;
        }

        if (configuration.ideal) {
          response.ideal = configuration.ideal;
        }

        if (configuration.kount) {
          response.kount = {
            kountMerchantId: configuration.kount.merchantId
          };
        }

        if (configuration.creditCard) {
          response.challenges = configuration.creditCard.challenges.map(function (challenge) {
            return challenge.toLowerCase();
          });

          response.creditCards = {
            supportedCardTypes: mapCardTypes(configuration.creditCard.supportedCardBrands, cardTypeTransforms.creditCard)
          };
          response.threeDSecureEnabled = configuration.creditCard.threeDSecureEnabled;
        } else {
          response.challenges = [];
          response.creditCards = {
            supportedCardTypes: []
          };
          response.threeDSecureEnabled = false;
        }

        if (configuration.googlePay) {
          response.androidPay = {
            displayName: configuration.googlePay.displayName,
            enabled: true,
            environment: configuration.googlePay.environment.toLowerCase(),
            googleAuthorizationFingerprint: configuration.googlePay.googleAuthorization,
            supportedNetworks: mapCardTypes(configuration.googlePay.supportedCardBrands, cardTypeTransforms.googlePay)
          };
        }

        if (configuration.venmo) {
          response.payWithVenmo = {
            merchantId: configuration.venmo.merchantId,
            accessToken: configuration.venmo.accessToken,
            environment: configuration.venmo.environment.toLowerCase()
          };
        }

        if (configuration.paypal) {
          response.paypalEnabled = true;
          response.paypal = assign({}, configuration.paypal);
          response.paypal.currencyIsoCode = response.paypal.currencyCode;
          response.paypal.environment = response.paypal.environment.toLowerCase();

          delete response.paypal.currencyCode;
        } else {
          response.paypalEnabled = false;
        }

        if (configuration.unionPay) {
          response.unionPay = {
            enabled: true,
            merchantAccountId: configuration.unionPay.merchantAccountId
          };
        }

        if (configuration.visaCheckout) {
          response.visaCheckout = {
            apikey: configuration.visaCheckout.apiKey,
            externalClientId: configuration.visaCheckout.externalClientId,
            supportedCardTypes: mapCardTypes(configuration.visaCheckout.supportedCardBrands, cardTypeTransforms.visaCheckout)
          };
        }

        if (configuration.masterpass) {
          response.masterpass = {
            merchantCheckoutId: configuration.masterpass.merchantCheckoutId,
            supportedNetworks: mapCardTypes(configuration.masterpass.supportedCardBrands, cardTypeTransforms.masterpass)
          };
        }

        if (configuration.usBankAccount) {
          response.usBankAccount = {
            routeId: configuration.usBankAccount.routeId,
            plaid: {
              publicKey: configuration.usBankAccount.plaidPublicKey
            }
          };
        }

        return response;
      }

      function mapCardTypes(cardTypes, cardTypeTransformMap) {
        return cardTypes.reduce(function (acc, type) {
          if (cardTypeTransformMap.hasOwnProperty(type)) {
            return acc.concat(cardTypeTransformMap[type]);
          }

          return acc;
        }, []);
      }

      module.exports = configurationResponseAdapter;
    }, { "../../../../lib/assign": 36, "./error": 22 }], 21: [function (_dereq_, module, exports) {
      'use strict';

      var errorResponseAdapter = _dereq_('./error');

      var CARD_BRAND_MAP = {
        /* eslint-disable camelcase */
        AMERICAN_EXPRESS: 'American Express',
        DINERS: 'Discover',
        DISCOVER: 'Discover',
        INTERNATIONAL_MAESTRO: 'Maestro',
        JCB: 'JCB',
        MASTERCARD: 'MasterCard',
        UK_MAESTRO: 'Maestro',
        UNION_PAY: 'Union Pay',
        VISA: 'Visa'
        /* eslint-enable camelcase */
      };

      var BIN_DATA_MAP = {
        YES: 'Yes',
        NO: 'No',
        UNKNOWN: 'Unknown'
      };

      function creditCardTokenizationResponseAdapter(responseBody) {
        var adaptedResponse;

        if (responseBody.data && !responseBody.errors) {
          adaptedResponse = adaptTokenizeCreditCardResponseBody(responseBody);
        } else {
          adaptedResponse = errorResponseAdapter(responseBody);
        }

        return adaptedResponse;
      }

      function adaptTokenizeCreditCardResponseBody(body) {
        var data = body.data.tokenizeCreditCard;
        var creditCard = data.creditCard;
        var lastTwo = creditCard.last4 ? creditCard.last4.substr(2, 4) : '';
        var binData = creditCard.binData;
        var response;

        if (binData) {
          ['commercial', 'debit', 'durbinRegulated', 'healthcare', 'payroll', 'prepaid'].forEach(function (key) {
            if (binData[key]) {
              binData[key] = BIN_DATA_MAP[binData[key]];
            } else {
              binData[key] = 'Unknown';
            }
          });

          ['issuingBank', 'countryOfIssuance', 'productId'].forEach(function (key) {
            if (!binData[key]) {
              binData[key] = 'Unknown';
            }
          });
        }

        response = {
          creditCards: [{
            binData: binData,
            consumed: false,
            description: lastTwo ? 'ending in ' + lastTwo : '',
            nonce: data.token,
            details: {
              bin: creditCard.bin || '',
              cardType: CARD_BRAND_MAP[creditCard.brandCode] || 'Unknown',
              lastFour: creditCard.last4 || '',
              lastTwo: lastTwo
            },
            type: 'CreditCard',
            threeDSecureInfo: null
          }]
        };

        return response;
      }

      module.exports = creditCardTokenizationResponseAdapter;
    }, { "./error": 22 }], 22: [function (_dereq_, module, exports) {
      'use strict';

      function errorResponseAdapter(responseBody) {
        var response;
        var errorClass = responseBody.errors && responseBody.errors[0] && responseBody.errors[0].extensions && responseBody.errors[0].extensions.errorClass;

        if (errorClass === 'VALIDATION') {
          response = userErrorResponseAdapter(responseBody);
        } else if (errorClass) {
          response = errorWithClassResponseAdapter(responseBody);
        } else {
          response = { error: { message: 'There was a problem serving your request' }, fieldErrors: [] };
        }

        return response;
      }

      function errorWithClassResponseAdapter(responseBody) {
        return { error: { message: responseBody.errors[0].message }, fieldErrors: [] };
      }

      function userErrorResponseAdapter(responseBody) {
        var fieldErrors = buildFieldErrors(responseBody.errors);

        return { error: { message: getLegacyMessage(fieldErrors) }, fieldErrors: fieldErrors };
      }

      function buildFieldErrors(errors) {
        var fieldErrors = [];

        errors.forEach(function (error) {
          addFieldError(error.extensions.inputPath.slice(1), error, fieldErrors);
        });

        return fieldErrors;
      }

      function addFieldError(inputPath, errorDetail, fieldErrors) {
        var fieldError;
        var legacyCode = errorDetail.extensions.legacyCode;
        var inputField = inputPath[0];

        if (inputPath.length === 1) {
          fieldErrors.push({
            code: legacyCode,
            field: inputField,
            message: errorDetail.message
          });

          return;
        }

        fieldErrors.forEach(function (candidate) {
          if (candidate.field === inputField) {
            fieldError = candidate;
          }
        });

        if (!fieldError) {
          fieldError = { field: inputField, fieldErrors: [] };
          fieldErrors.push(fieldError);
        }

        addFieldError(inputPath.slice(1), errorDetail, fieldError.fieldErrors);
      }

      function getLegacyMessage(errors) {
        var legacyMessages = {
          creditCard: 'Credit card is invalid'
        };

        var field = errors[0].field;

        return legacyMessages[field];
      }

      module.exports = errorResponseAdapter;
    }, {}], 23: [function (_dereq_, module, exports) {
      'use strict';

      var CONFIGURATION_QUERY = 'query ClientConfiguration { ' + '  clientConfiguration { ' + '    analyticsUrl ' + '    environment ' + '    merchantId ' + '    assetsUrl ' + '    clientApiUrl ' + '    creditCard { ' + '      supportedCardBrands ' + '      challenges ' + '      threeDSecureEnabled ' + '    } ' + '    applePayWeb { ' + '      countryCode ' + '      currencyCode ' + '      merchantIdentifier ' + '      supportedCardBrands ' + '    } ' + '    googlePay { ' + '      displayName ' + '      supportedCardBrands ' + '      environment ' + '      googleAuthorization ' + '    } ' + '    ideal { ' + '      routeId ' + '      assetsUrl ' + '    } ' + '    kount { ' + '      merchantId ' + '    } ' + '    masterpass { ' + '      merchantCheckoutId ' + '      supportedCardBrands ' + '    } ' + '    paypal { ' + '      displayName ' + '      clientId ' + '      privacyUrl ' + '      userAgreementUrl ' + '      assetsUrl ' + '      environment ' + '      environmentNoNetwork ' + '      unvettedMerchant ' + '      braintreeClientId ' + '      billingAgreementsEnabled ' + '      merchantAccountId ' + '      currencyCode ' + '      payeeEmail ' + '    } ' + '    unionPay { ' + '      merchantAccountId ' + '    } ' + '    usBankAccount { ' + '      routeId ' + '      plaidPublicKey ' + '    } ' + '    venmo { ' + '      merchantId ' + '      accessToken ' + '      environment ' + '    } ' + '    visaCheckout { ' + '      apiKey ' + '      externalClientId ' + '      supportedCardBrands ' + '    } ' + '    braintreeApi { ' + '      accessToken ' + '      url ' + '    } ' + '    supportedFeatures ' + '  } ' + '}';

      function configuration() {
        return {
          query: CONFIGURATION_QUERY,
          operationName: 'ClientConfiguration'
        };
      }

      module.exports = configuration;
    }, {}], 24: [function (_dereq_, module, exports) {
      'use strict';

      var assign = _dereq_('../../../../lib/assign').assign;

      var CREDIT_CARD_TOKENIZATION_MUTATION = 'mutation TokenizeCreditCard($input: TokenizeCreditCardInput!) { ' + '  tokenizeCreditCard(input: $input) { ' + '    token ' + '    creditCard { ' + '      bin ' + '      brandCode ' + '      last4 ' + '      binData { ' + '        prepaid ' + '        healthcare ' + '        debit ' + '        durbinRegulated ' + '        commercial ' + '        payroll ' + '        issuingBank ' + '        countryOfIssuance ' + '        productId ' + '      } ' + '    } ' + '  } ' + '}';

      function createCreditCardTokenizationBody(body) {
        var cc = body.creditCard;
        var billingAddress = cc && cc.billingAddress;
        var expDate = cc && cc.expirationDate;
        var expirationMonth = cc && (cc.expirationMonth || expDate && expDate.split('/')[0].trim());
        var expirationYear = cc && (cc.expirationYear || expDate && expDate.split('/')[1].trim());
        var variables = {
          input: {
            creditCard: {
              number: cc && cc.number,
              expirationMonth: expirationMonth,
              expirationYear: expirationYear,
              cvv: cc && cc.cvv,
              cardholderName: cc && cc.cardholderName
            },
            options: {}
          }
        };

        if (billingAddress) {
          variables.input.creditCard.billingAddress = billingAddress;
        }

        variables.input = addValidationRule(body, variables.input);

        return variables;
      }

      function addValidationRule(body, input) {
        var validate;

        if (body.creditCard && body.creditCard.options && typeof body.creditCard.options.validate === 'boolean') {
          validate = body.creditCard.options.validate;
        } else if (body.authorizationFingerprint && body.tokenizationKey || body.authorizationFingerprint) {
          validate = true;
        } else if (body.tokenizationKey) {
          validate = false;
        }

        if (typeof validate === 'boolean') {
          input.options = assign({
            validate: validate
          }, input.options);
        }

        return input;
      }

      function creditCardTokenization(body) {
        return {
          query: CREDIT_CARD_TOKENIZATION_MUTATION,
          variables: createCreditCardTokenizationBody(body),
          operationName: 'TokenizeCreditCard'
        };
      }

      module.exports = creditCardTokenization;
    }, { "../../../../lib/assign": 36 }], 25: [function (_dereq_, module, exports) {
      'use strict';

      var browserDetection = _dereq_('../../browser-detection');

      var features = {
        tokenize_credit_cards: 'payment_methods/credit_cards', // eslint-disable-line camelcase
        configuration: 'configuration'
      };

      var disallowedInputPaths = ['creditCard.options.unionPayEnrollment'];

      function GraphQL(config) {
        this._config = config.graphQL;
      }

      GraphQL.prototype.getGraphQLEndpoint = function () {
        return this._config.url;
      };

      GraphQL.prototype.isGraphQLRequest = function (url, body) {
        var featureEnabled;
        var path = this.getClientApiPath(url);

        if (!this._isGraphQLEnabled() || !path || browserDetection.isIe9()) {
          return false;
        }

        featureEnabled = this._config.features.some(function (feature) {
          return features[feature] === path;
        });

        if (containsDisallowedlistedKeys(body)) {
          return false;
        }

        return featureEnabled;
      };

      GraphQL.prototype.getClientApiPath = function (url) {
        var path;
        var clientApiPrefix = '/client_api/v1/';
        var pathParts = url.split(clientApiPrefix);

        if (pathParts.length > 1) {
          path = pathParts[1].split('?')[0];
        }

        return path;
      };

      GraphQL.prototype._isGraphQLEnabled = function () {
        return Boolean(this._config);
      };

      function containsDisallowedlistedKeys(body) {
        return disallowedInputPaths.some(function (keys) {
          var value = keys.split('.').reduce(function (accumulator, key) {
            return accumulator && accumulator[key];
          }, body);

          return value !== undefined; // eslint-disable-line no-undefined
        });
      }

      module.exports = GraphQL;
    }, { "../../browser-detection": 11 }], 26: [function (_dereq_, module, exports) {
      'use strict';

      var BRAINTREE_VERSION = _dereq_('../../constants').BRAINTREE_VERSION;

      var assign = _dereq_('../../../lib/assign').assign;

      var creditCardTokenizationBodyGenerator = _dereq_('./generators/credit-card-tokenization');
      var creditCardTokenizationResponseAdapter = _dereq_('./adapters/credit-card-tokenization');

      var configurationBodyGenerator = _dereq_('./generators/configuration');
      var configurationResponseAdapter = _dereq_('./adapters/configuration');

      var generators = {
        'payment_methods/credit_cards': creditCardTokenizationBodyGenerator,
        configuration: configurationBodyGenerator
      };
      var adapters = {
        'payment_methods/credit_cards': creditCardTokenizationResponseAdapter,
        configuration: configurationResponseAdapter
      };

      function GraphQLRequest(options) {
        var clientApiPath = options.graphQL.getClientApiPath(options.url);

        this._graphQL = options.graphQL;
        this._data = options.data;
        this._method = options.method;
        this._headers = options.headers;
        this._clientSdkMetadata = {
          source: options.metadata.source,
          integration: options.metadata.integration,
          sessionId: options.metadata.sessionId
        };
        this._sendAnalyticsEvent = options.sendAnalyticsEvent || Function.prototype;

        this._generator = generators[clientApiPath];
        this._adapter = adapters[clientApiPath];

        this._sendAnalyticsEvent('graphql.init');
      }

      GraphQLRequest.prototype.getUrl = function () {
        return this._graphQL.getGraphQLEndpoint();
      };

      GraphQLRequest.prototype.getBody = function () {
        var formattedBody = formatBodyKeys(this._data);
        var generatedBody = this._generator(formattedBody);
        var body = assign({ clientSdkMetadata: this._clientSdkMetadata }, generatedBody);

        return JSON.stringify(body);
      };

      GraphQLRequest.prototype.getMethod = function () {
        return 'POST';
      };

      GraphQLRequest.prototype.getHeaders = function () {
        var authorization, headers;

        if (this._data.authorizationFingerprint) {
          this._sendAnalyticsEvent('graphql.authorization-fingerprint');
          authorization = this._data.authorizationFingerprint;
        } else {
          this._sendAnalyticsEvent('graphql.tokenization-key');
          authorization = this._data.tokenizationKey;
        }

        headers = {
          Authorization: 'Bearer ' + authorization,
          'Braintree-Version': BRAINTREE_VERSION
        };

        return assign({}, this._headers, headers);
      };

      GraphQLRequest.prototype.adaptResponseBody = function (parsedBody) {
        return this._adapter(parsedBody, this);
      };

      GraphQLRequest.prototype.determineStatus = function (httpStatus, parsedResponse) {
        var status, errorClass;

        if (httpStatus === 200) {
          errorClass = parsedResponse.errors && parsedResponse.errors[0] && parsedResponse.errors[0].extensions && parsedResponse.errors[0].extensions.errorClass;

          if (parsedResponse.data && !parsedResponse.errors) {
            status = 200;
          } else if (errorClass === 'VALIDATION') {
            status = 422;
          } else if (errorClass === 'AUTHORIZATION') {
            status = 403;
          } else if (errorClass === 'AUTHENTICATION') {
            status = 401;
          } else if (isGraphQLError(errorClass, parsedResponse)) {
            status = 403;
          } else {
            status = 500;
          }
        } else if (!httpStatus) {
          status = 500;
        } else {
          status = httpStatus;
        }

        this._sendAnalyticsEvent('graphql.status.' + httpStatus);
        this._sendAnalyticsEvent('graphql.determinedStatus.' + status);

        return status;
      };

      function isGraphQLError(errorClass, parsedResponse) {
        return !errorClass && parsedResponse.errors[0].message;
      }

      function snakeCaseToCamelCase(snakeString) {
        if (snakeString.indexOf('_') === -1) {
          return snakeString;
        }

        return snakeString.toLowerCase().replace(/(\_\w)/g, function (match) {
          return match[1].toUpperCase();
        });
      }

      function formatBodyKeys(originalBody) {
        var body = {};

        Object.keys(originalBody).forEach(function (key) {
          var camelCaseKey = snakeCaseToCamelCase(key);

          if (typeof originalBody[key] === 'object') {
            body[camelCaseKey] = formatBodyKeys(originalBody[key]);
          } else if (typeof originalBody[key] === 'number') {
            body[camelCaseKey] = String(originalBody[key]);
          } else {
            body[camelCaseKey] = originalBody[key];
          }
        });

        return body;
      }

      module.exports = GraphQLRequest;
    }, { "../../../lib/assign": 36, "../../constants": 13, "./adapters/configuration": 20, "./adapters/credit-card-tokenization": 21, "./generators/configuration": 23, "./generators/credit-card-tokenization": 24 }], 27: [function (_dereq_, module, exports) {
      'use strict';

      var ajaxIsAvaliable;
      var once = _dereq_('../../lib/once');
      var JSONPDriver = _dereq_('./jsonp-driver');
      var AJAXDriver = _dereq_('./ajax-driver');
      var getUserAgent = _dereq_('./get-user-agent');
      var isHTTP = _dereq_('./is-http');

      function isAjaxAvailable() {
        if (ajaxIsAvaliable == null) {
          ajaxIsAvaliable = !(isHTTP() && /MSIE\s(8|9)/.test(getUserAgent()));
        }

        return ajaxIsAvaliable;
      }

      module.exports = function (options, cb) {
        cb = once(cb || Function.prototype);
        options.method = (options.method || 'GET').toUpperCase();
        options.timeout = options.timeout == null ? 60000 : options.timeout;
        options.data = options.data || {};

        if (isAjaxAvailable()) {
          AJAXDriver.request(options, cb);
        } else {
          JSONPDriver.request(options, cb);
        }
      };
    }, { "../../lib/once": 49, "./ajax-driver": 17, "./get-user-agent": 19, "./is-http": 28, "./jsonp-driver": 29 }], 28: [function (_dereq_, module, exports) {
      (function (global) {
        'use strict';

        module.exports = function () {
          return global.location.protocol === 'http:';
        };
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 29: [function (_dereq_, module, exports) {
      (function (global) {
        'use strict';

        var head;
        var uuid = _dereq_('../../lib/vendor/uuid');
        var querystring = _dereq_('../../lib/querystring');
        var timeouts = {};

        function _removeScript(script) {
          if (script && script.parentNode) {
            script.parentNode.removeChild(script);
          }
        }

        function _createScriptTag(url, callbackName) {
          var script = document.createElement('script');
          var done = false;

          script.src = url;
          script.async = true;
          script.onerror = function () {
            global[callbackName]({ message: 'error', status: 500 });
          };

          script.onload = script.onreadystatechange = function () {
            if (done) {
              return;
            }

            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
              done = true;
              script.onload = script.onreadystatechange = null;
            }
          };

          return script;
        }

        function _cleanupGlobal(callbackName) {
          try {
            delete global[callbackName];
          } catch (_) {
            global[callbackName] = null;
          }
        }

        function _setupTimeout(timeout, callbackName) {
          timeouts[callbackName] = setTimeout(function () {
            timeouts[callbackName] = null;

            global[callbackName]({
              error: 'timeout',
              status: -1
            });

            global[callbackName] = function () {
              _cleanupGlobal(callbackName);
            };
          }, timeout);
        }

        function _setupGlobalCallback(script, callback, callbackName) {
          global[callbackName] = function (response) {
            var status = response.status || 500;
            var err = null;
            var data = null;

            delete response.status;

            if (status >= 400 || status < 200) {
              err = response;
            } else {
              data = response;
            }

            _cleanupGlobal(callbackName);
            _removeScript(script);

            clearTimeout(timeouts[callbackName]);
            callback(err, data, status);
          };
        }

        function request(options, callback) {
          var script;
          var callbackName = 'callback_json_' + uuid().replace(/-/g, '');
          var url = options.url;
          var attrs = options.data;
          var method = options.method;
          var timeout = options.timeout;

          url = querystring.queryify(url, attrs);
          url = querystring.queryify(url, {
            _method: method,
            callback: callbackName
          });

          script = _createScriptTag(url, callbackName);
          _setupGlobalCallback(script, callback, callbackName);
          _setupTimeout(timeout, callbackName);

          if (!head) {
            head = document.getElementsByTagName('head')[0];
          }

          head.appendChild(script);
        }

        module.exports = {
          request: request
        };
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "../../lib/querystring": 51, "../../lib/vendor/uuid": 53 }], 30: [function (_dereq_, module, exports) {
      'use strict';

      module.exports = function (body) {
        try {
          body = JSON.parse(body);
        } catch (e) {/* ignored */}

        return body;
      };
    }, {}], 31: [function (_dereq_, module, exports) {
      'use strict';

      module.exports = function (method, body) {
        if (typeof method !== 'string') {
          throw new Error('Method must be a string');
        }

        if (method.toLowerCase() !== 'get' && body != null) {
          body = typeof body === 'string' ? body : JSON.stringify(body);
        }

        return body;
      };
    }, {}], 32: [function (_dereq_, module, exports) {
      (function (global) {
        'use strict';

        var isXHRAvailable = global.XMLHttpRequest && 'withCredentials' in new global.XMLHttpRequest();

        function getRequestObject() {
          return isXHRAvailable ? new global.XMLHttpRequest() : new global.XDomainRequest();
        }

        module.exports = {
          isAvailable: isXHRAvailable,
          getRequestObject: getRequestObject
        };
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 33: [function (_dereq_, module, exports) {
      'use strict';

      var createAuthorizationData = _dereq_('./create-authorization-data');
      var jsonClone = _dereq_('./json-clone');
      var constants = _dereq_('./constants');

      function addMetadata(configuration, data) {
        var key;
        var attrs = data ? jsonClone(data) : {};
        var authAttrs = createAuthorizationData(configuration.authorization).attrs;
        var _meta = jsonClone(configuration.analyticsMetadata);

        attrs.braintreeLibraryVersion = constants.BRAINTREE_LIBRARY_VERSION;

        for (key in attrs._meta) {
          if (attrs._meta.hasOwnProperty(key)) {
            _meta[key] = attrs._meta[key];
          }
        }

        attrs._meta = _meta;

        if (authAttrs.tokenizationKey) {
          attrs.tokenizationKey = authAttrs.tokenizationKey;
        } else {
          attrs.authorizationFingerprint = authAttrs.authorizationFingerprint;
        }

        return attrs;
      }

      module.exports = addMetadata;
    }, { "./constants": 38, "./create-authorization-data": 41, "./json-clone": 47 }], 34: [function (_dereq_, module, exports) {
      'use strict';

      var Promise = _dereq_('./promise');
      var constants = _dereq_('./constants');
      var addMetadata = _dereq_('./add-metadata');

      function _millisToSeconds(millis) {
        return Math.floor(millis / 1000);
      }

      function sendAnalyticsEvent(clientInstanceOrPromise, kind, callback) {
        var timestamp = _millisToSeconds(Date.now());

        return Promise.resolve(clientInstanceOrPromise).then(function (client) {
          var timestampInPromise = _millisToSeconds(Date.now());
          var configuration = client.getConfiguration();
          var request = client._request;
          var url = configuration.gatewayConfiguration.analytics.url;
          var data = {
            analytics: [{
              kind: constants.ANALYTICS_PREFIX + kind,
              isAsync: timestampInPromise !== timestamp,
              timestamp: timestamp
            }]
          };

          request({
            url: url,
            method: 'post',
            data: addMetadata(configuration, data),
            timeout: constants.ANALYTICS_REQUEST_TIMEOUT_MS
          }, callback);
        });
      }

      module.exports = {
        sendEvent: sendAnalyticsEvent
      };
    }, { "./add-metadata": 33, "./constants": 38, "./promise": 50 }], 35: [function (_dereq_, module, exports) {
      'use strict';

      var loadScript = _dereq_('@braintree/asset-loader/load-script');

      module.exports = {
        loadScript: loadScript
      };
    }, { "@braintree/asset-loader/load-script": 2 }], 36: [function (_dereq_, module, exports) {
      'use strict';

      var assignNormalized = typeof Object.assign === 'function' ? Object.assign : assignPolyfill;

      function assignPolyfill(destination) {
        var i, source, key;

        for (i = 1; i < arguments.length; i++) {
          source = arguments[i];
          for (key in source) {
            if (source.hasOwnProperty(key)) {
              destination[key] = source[key];
            }
          }
        }

        return destination;
      }

      module.exports = {
        assign: assignNormalized,
        _assign: assignPolyfill
      };
    }, {}], 37: [function (_dereq_, module, exports) {
      'use strict';

      var enumerate = _dereq_('./enumerate');

      /**
       * @class
       * @global
       * @param {object} options Construction options
       * @classdesc This class is used to report error conditions, frequently as the first parameter to callbacks throughout the Braintree SDK.
       * @description <strong>You cannot use this constructor directly. Interact with instances of this class through {@link callback callbacks}.</strong>
       */
      function BraintreeError(options) {
        if (!BraintreeError.types.hasOwnProperty(options.type)) {
          throw new Error(options.type + ' is not a valid type.');
        }

        if (!options.code) {
          throw new Error('Error code required.');
        }

        if (!options.message) {
          throw new Error('Error message required.');
        }

        this.name = 'BraintreeError';

        /**
         * @type {string}
         * @description A code that corresponds to specific errors.
         */
        this.code = options.code;

        /**
         * @type {string}
         * @description A short description of the error.
         */
        this.message = options.message;

        /**
         * @type {BraintreeError.types}
         * @description The type of error.
         */
        this.type = options.type;

        /**
         * @type {object=}
         * @description Additional information about the error, such as an underlying network error response.
         */
        this.details = options.details;
      }

      BraintreeError.prototype = Object.create(Error.prototype);
      BraintreeError.prototype.constructor = BraintreeError;

      /**
       * Enum for {@link BraintreeError} types.
       * @name BraintreeError.types
       * @enum
       * @readonly
       * @memberof BraintreeError
       * @property {string} CUSTOMER An error caused by the customer.
       * @property {string} MERCHANT An error that is actionable by the merchant.
       * @property {string} NETWORK An error due to a network problem.
       * @property {string} INTERNAL An error caused by Braintree code.
       * @property {string} UNKNOWN An error where the origin is unknown.
       */
      BraintreeError.types = enumerate(['CUSTOMER', 'MERCHANT', 'NETWORK', 'INTERNAL', 'UNKNOWN']);

      BraintreeError.findRootError = function (err) {
        if (err instanceof BraintreeError && err.details && err.details.originalError) {
          return BraintreeError.findRootError(err.details.originalError);
        }

        return err;
      };

      module.exports = BraintreeError;
    }, { "./enumerate": 43 }], 38: [function (_dereq_, module, exports) {
      'use strict';

      var VERSION = "3.46.0";
      var PLATFORM = 'web';

      var CLIENT_API_URLS = {
        production: 'https://api.braintreegateway.com:443',
        sandbox: 'https://api.sandbox.braintreegateway.com:443'
      };

      var ASSETS_URLS = {
        production: 'https://assets.braintreegateway.com',
        sandbox: 'https://assets.braintreegateway.com'
      };

      var GRAPHQL_URLS = {
        production: 'https://payments.braintree-api.com/graphql',
        sandbox: 'https://payments.sandbox.braintree-api.com/graphql'
      };

      // endRemoveIf(production)

      module.exports = {
        ANALYTICS_PREFIX: PLATFORM + '.',
        ANALYTICS_REQUEST_TIMEOUT_MS: 2000,
        ASSETS_URLS: ASSETS_URLS,
        CLIENT_API_URLS: CLIENT_API_URLS,
        FRAUDNET_SOURCE: 'BRAINTREE_SIGNIN',
        FRAUDNET_FNCLS: 'fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99',
        FRAUDNET_URL: 'https://c.paypal.com/da/r/fb.js',
        GRAPHQL_URLS: GRAPHQL_URLS,
        INTEGRATION_TIMEOUT_MS: 60000,
        VERSION: VERSION,
        INTEGRATION: 'custom',
        SOURCE: 'client',
        PLATFORM: PLATFORM,
        BRAINTREE_LIBRARY_VERSION: 'braintree/' + PLATFORM + '/' + VERSION
      };
    }, {}], 39: [function (_dereq_, module, exports) {
      'use strict';

      var BraintreeError = _dereq_('./braintree-error');
      var sharedErrors = _dereq_('./errors');

      module.exports = function (instance, methodNames) {
        methodNames.forEach(function (methodName) {
          instance[methodName] = function () {
            throw new BraintreeError({
              type: sharedErrors.METHOD_CALLED_AFTER_TEARDOWN.type,
              code: sharedErrors.METHOD_CALLED_AFTER_TEARDOWN.code,
              message: methodName + ' cannot be called after teardown.'
            });
          };
        });
      };
    }, { "./braintree-error": 37, "./errors": 44 }], 40: [function (_dereq_, module, exports) {
      'use strict';

      var BraintreeError = _dereq_('./braintree-error');

      function convertToBraintreeError(originalErr, btErrorObject) {
        if (originalErr instanceof BraintreeError) {
          return originalErr;
        }

        return new BraintreeError({
          type: btErrorObject.type,
          code: btErrorObject.code,
          message: btErrorObject.message,
          details: {
            originalError: originalErr
          }
        });
      }

      module.exports = convertToBraintreeError;
    }, { "./braintree-error": 37 }], 41: [function (_dereq_, module, exports) {
      'use strict';

      var atob = _dereq_('../lib/vendor/polyfill').atob;
      var CLIENT_API_URLS = _dereq_('../lib/constants').CLIENT_API_URLS;

      function _isTokenizationKey(str) {
        return (/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(str)
        );
      }

      function _parseTokenizationKey(tokenizationKey) {
        var tokens = tokenizationKey.split('_');
        var environment = tokens[0];
        var merchantId = tokens.slice(2).join('_');

        return {
          merchantId: merchantId,
          environment: environment
        };
      }

      function createAuthorizationData(authorization) {
        var parsedClientToken, parsedTokenizationKey;
        var data = {
          attrs: {},
          configUrl: ''
        };

        if (_isTokenizationKey(authorization)) {
          parsedTokenizationKey = _parseTokenizationKey(authorization);
          data.environment = parsedTokenizationKey.environment;
          data.attrs.tokenizationKey = authorization;
          data.configUrl = CLIENT_API_URLS[parsedTokenizationKey.environment] + '/merchants/' + parsedTokenizationKey.merchantId + '/client_api/v1/configuration';
        } else {
          parsedClientToken = JSON.parse(atob(authorization));
          data.environment = parsedClientToken.environment;
          data.attrs.authorizationFingerprint = parsedClientToken.authorizationFingerprint;
          data.configUrl = parsedClientToken.configUrl;
          data.graphQL = parsedClientToken.graphQL;
        }

        return data;
      }

      module.exports = createAuthorizationData;
    }, { "../lib/constants": 38, "../lib/vendor/polyfill": 52 }], 42: [function (_dereq_, module, exports) {
      'use strict';

      module.exports = function (fn) {
        return function () {
          // IE9 doesn't support passing arguments to setTimeout so we have to emulate it.
          var args = arguments;

          setTimeout(function () {
            fn.apply(null, args);
          }, 1);
        };
      };
    }, {}], 43: [function (_dereq_, module, exports) {
      'use strict';

      function enumerate(values, prefix) {
        prefix = prefix == null ? '' : prefix;

        return values.reduce(function (enumeration, value) {
          enumeration[value] = prefix + value;

          return enumeration;
        }, {});
      }

      module.exports = enumerate;
    }, {}], 44: [function (_dereq_, module, exports) {
      'use strict';

      /**
       * @name BraintreeError.Shared Interal Error Codes
       * @ignore
       * @description These codes should never be experienced by the mechant directly.
       * @property {INTERNAL} INVALID_USE_OF_INTERNAL_FUNCTION Occurs when the client is created without a gateway configuration. Should never happen.
       */

      /**
       * @name BraintreeError.Shared Errors - Component Creation Error Codes
       * @description Errors that occur when creating components.
       * @property {MERCHANT} INSTANTIATION_OPTION_REQUIRED Occurs when a component is created that is missing a required option.
       * @property {MERCHANT} INCOMPATIBLE_VERSIONS Occurs when a component is created with a client with a different version than the component.
       * @property {NETWORK} CLIENT_SCRIPT_FAILED_TO_LOAD Occurs when a component attempts to load the Braintree client script, but the request fails.
       */

      /**
       * @name BraintreeError.Shared Errors - Component Instance Error Codes
       * @description Errors that occur when using instances of components.
       * @property {MERCHANT} METHOD_CALLED_AFTER_TEARDOWN Occurs when a method is called on a component instance after it has been torn down.
       * @property {MERCHANT} BRAINTREE_API_ACCESS_RESTRICTED Occurs when the client token or tokenization key does not have the correct permissions.
       */

      var BraintreeError = _dereq_('./braintree-error');

      module.exports = {
        INVALID_USE_OF_INTERNAL_FUNCTION: {
          type: BraintreeError.types.INTERNAL,
          code: 'INVALID_USE_OF_INTERNAL_FUNCTION'
        },
        INSTANTIATION_OPTION_REQUIRED: {
          type: BraintreeError.types.MERCHANT,
          code: 'INSTANTIATION_OPTION_REQUIRED'
        },
        INCOMPATIBLE_VERSIONS: {
          type: BraintreeError.types.MERCHANT,
          code: 'INCOMPATIBLE_VERSIONS'
        },
        CLIENT_SCRIPT_FAILED_TO_LOAD: {
          type: BraintreeError.types.NETWORK,
          code: 'CLIENT_SCRIPT_FAILED_TO_LOAD',
          message: 'Braintree client script could not be loaded.'
        },
        METHOD_CALLED_AFTER_TEARDOWN: {
          type: BraintreeError.types.MERCHANT,
          code: 'METHOD_CALLED_AFTER_TEARDOWN'
        },
        BRAINTREE_API_ACCESS_RESTRICTED: {
          type: BraintreeError.types.MERCHANT,
          code: 'BRAINTREE_API_ACCESS_RESTRICTED',
          message: 'Your access is restricted and cannot use this part of the Braintree API.'
        }
      };
    }, { "./braintree-error": 37 }], 45: [function (_dereq_, module, exports) {
      'use strict';

      function convertDateStringToDate(dateString) {
        var splitDate = dateString.split('-');

        return new Date(splitDate[0], splitDate[1], splitDate[2]);
      }

      function isDateStringBeforeOrOn(firstDate, secondDate) {
        return convertDateStringToDate(firstDate) <= convertDateStringToDate(secondDate);
      }

      module.exports = isDateStringBeforeOrOn;
    }, {}], 46: [function (_dereq_, module, exports) {
      'use strict';

      var parser;
      var legalHosts = {
        'paypal.com': 1,
        'braintreepayments.com': 1,
        'braintreegateway.com': 1,
        'braintree-api.com': 1
      };

      // endRemoveIf(production)

      function stripSubdomains(domain) {
        return domain.split('.').slice(-2).join('.');
      }

      function isVerifiedDomain(url) {
        var mainDomain;

        url = url.toLowerCase();

        if (!/^https:/.test(url)) {
          return false;
        }

        parser = parser || document.createElement('a');
        parser.href = url;
        mainDomain = stripSubdomains(parser.hostname);

        return legalHosts.hasOwnProperty(mainDomain);
      }

      module.exports = isVerifiedDomain;
    }, {}], 47: [function (_dereq_, module, exports) {
      'use strict';

      module.exports = function (value) {
        return JSON.parse(JSON.stringify(value));
      };
    }, {}], 48: [function (_dereq_, module, exports) {
      'use strict';

      module.exports = function (obj) {
        return Object.keys(obj).filter(function (key) {
          return typeof obj[key] === 'function';
        });
      };
    }, {}], 49: [function (_dereq_, module, exports) {
      arguments[4][7][0].apply(exports, arguments);
    }, { "dup": 7 }], 50: [function (_dereq_, module, exports) {
      (function (global) {
        'use strict';

        var Promise = global.Promise || _dereq_('promise-polyfill');

        module.exports = Promise;
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "promise-polyfill": 10 }], 51: [function (_dereq_, module, exports) {
      (function (global) {
        'use strict';

        function _notEmpty(obj) {
          var key;

          for (key in obj) {
            if (obj.hasOwnProperty(key)) {
              return true;
            }
          }

          return false;
        }

        /* eslint-disable no-mixed-operators */
        function _isArray(value) {
          return value && typeof value === 'object' && typeof value.length === 'number' && Object.prototype.toString.call(value) === '[object Array]' || false;
        }
        /* eslint-enable no-mixed-operators */

        function parse(url) {
          var query, params;

          url = url || global.location.href;

          if (!/\?/.test(url)) {
            return {};
          }

          query = url.replace(/#.*$/, '').replace(/^.*\?/, '').split('&');

          params = query.reduce(function (toReturn, keyValue) {
            var parts = keyValue.split('=');
            var key = decodeURIComponent(parts[0]);
            var value = decodeURIComponent(parts[1]);

            toReturn[key] = value;

            return toReturn;
          }, {});

          return params;
        }

        function stringify(params, namespace) {
          var k, v, p;
          var query = [];

          for (p in params) {
            if (!params.hasOwnProperty(p)) {
              continue;
            }

            v = params[p];

            if (namespace) {
              if (_isArray(params)) {
                k = namespace + '[]';
              } else {
                k = namespace + '[' + p + ']';
              }
            } else {
              k = p;
            }
            if (typeof v === 'object') {
              query.push(stringify(v, k));
            } else {
              query.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
            }
          }

          return query.join('&');
        }

        function queryify(url, params) {
          url = url || '';

          if (params != null && typeof params === 'object' && _notEmpty(params)) {
            url += url.indexOf('?') === -1 ? '?' : '';
            url += url.indexOf('=') !== -1 ? '&' : '';
            url += stringify(params);
          }

          return url;
        }

        module.exports = {
          parse: parse,
          stringify: stringify,
          queryify: queryify
        };
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 52: [function (_dereq_, module, exports) {
      (function (global) {
        'use strict';

        var atobNormalized = typeof global.atob === 'function' ? global.atob : atob;

        function atob(base64String) {
          var a, b, c, b1, b2, b3, b4, i;
          var base64Matcher = new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$');
          var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
          var result = '';

          if (!base64Matcher.test(base64String)) {
            throw new Error('Non base64 encoded input passed to window.atob polyfill');
          }

          i = 0;
          do {
            b1 = characters.indexOf(base64String.charAt(i++));
            b2 = characters.indexOf(base64String.charAt(i++));
            b3 = characters.indexOf(base64String.charAt(i++));
            b4 = characters.indexOf(base64String.charAt(i++));

            a = (b1 & 0x3F) << 2 | b2 >> 4 & 0x3;
            b = (b2 & 0xF) << 4 | b3 >> 2 & 0xF;
            c = (b3 & 0x3) << 6 | b4 & 0x3F;

            result += String.fromCharCode(a) + (b ? String.fromCharCode(b) : '') + (c ? String.fromCharCode(c) : '');
          } while (i < base64String.length);

          return result;
        }

        module.exports = {
          atob: function (base64String) {
            return atobNormalized.call(global, base64String);
          },
          _atob: atob
        };
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 53: [function (_dereq_, module, exports) {
      'use strict';

      function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0;
          var v = c === 'x' ? r : r & 0x3 | 0x8;

          return v.toString(16);
        });
      }

      module.exports = uuid;
    }, {}] }, {}, [16])(16);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(5).setImmediate))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

!function (e, t) {
   true ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["react-native-webview-messaging"] = t() : e["react-native-webview-messaging"] = t();
}(this, function () {
  return function (e) {
    function t(r) {
      if (n[r]) return n[r].exports;var i = n[r] = { i: r, l: !1, exports: {} };return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports;
    }var n = {};return t.m = e, t.c = n, t.i = function (e) {
      return e;
    }, t.d = function (e, n, r) {
      t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r });
    }, t.n = function (e) {
      var n = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };return t.d(n, "a", n), n;
    }, t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 2);
  }([function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.RN_MESSAGES_CHANNEL_PREFIX = "f251c210-e7c9-42fa-bae3-b9352ec3722a";
  }, function (e, t, n) {
    "use strict";
    function r() {
      this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
    }function i(e) {
      return "function" == typeof e;
    }function s(e) {
      return "number" == typeof e;
    }function o(e) {
      return "object" === (void 0 === e ? "undefined" : f(e)) && null !== e;
    }function u(e) {
      return void 0 === e;
    }var f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    };e.exports = r, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function (e) {
      if (!s(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");return this._maxListeners = e, this;
    }, r.prototype.emit = function (e) {
      var t, n, r, s, f, l;if (this._events || (this._events = {}), "error" === e && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
        if ((t = arguments[1]) instanceof Error) throw t;var a = new Error('Uncaught, unspecified "error" event. (' + t + ")");throw a.context = t, a;
      }if (n = this._events[e], u(n)) return !1;if (i(n)) switch (arguments.length) {case 1:
          n.call(this);break;case 2:
          n.call(this, arguments[1]);break;case 3:
          n.call(this, arguments[1], arguments[2]);break;default:
          s = Array.prototype.slice.call(arguments, 1), n.apply(this, s);} else if (o(n)) for (s = Array.prototype.slice.call(arguments, 1), l = n.slice(), r = l.length, f = 0; f < r; f++) l[f].apply(this, s);return !0;
    }, r.prototype.addListener = function (e, t) {
      var n;if (!i(t)) throw TypeError("listener must be a function");return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, i(t.listener) ? t.listener : t), this._events[e] ? o(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, o(this._events[e]) && !this._events[e].warned && (n = u(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners) && n > 0 && this._events[e].length > n && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this;
    }, r.prototype.on = r.prototype.addListener, r.prototype.once = function (e, t) {
      function n() {
        this.removeListener(e, n), r || (r = !0, t.apply(this, arguments));
      }if (!i(t)) throw TypeError("listener must be a function");var r = !1;return n.listener = t, this.on(e, n), this;
    }, r.prototype.removeListener = function (e, t) {
      var n, r, s, u;if (!i(t)) throw TypeError("listener must be a function");if (!this._events || !this._events[e]) return this;if (n = this._events[e], s = n.length, r = -1, n === t || i(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);else if (o(n)) {
        for (u = s; u-- > 0;) if (n[u] === t || n[u].listener && n[u].listener === t) {
          r = u;break;
        }if (r < 0) return this;1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(r, 1), this._events.removeListener && this.emit("removeListener", e, t);
      }return this;
    }, r.prototype.removeAllListeners = function (e) {
      var t, n;if (!this._events) return this;if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;if (0 === arguments.length) {
        for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);return this.removeAllListeners("removeListener"), this._events = {}, this;
      }if (n = this._events[e], i(n)) this.removeListener(e, n);else if (n) for (; n.length;) this.removeListener(e, n[n.length - 1]);return delete this._events[e], this;
    }, r.prototype.listeners = function (e) {
      return this._events && this._events[e] ? i(this._events[e]) ? [this._events[e]] : this._events[e].slice() : [];
    }, r.prototype.listenerCount = function (e) {
      if (this._events) {
        var t = this._events[e];if (i(t)) return 1;if (t) return t.length;
      }return 0;
    }, r.listenerCount = function (e, t) {
      return e.listenerCount(t);
    };
  }, function (e, t, n) {
    "use strict";
    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;
    }function s(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }function o(e, t) {
      return JSON.stringify({ type: e, payload: t });
    }var u = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        f = function e(t, n, r) {
      null === t && (t = Function.prototype);var i = Object.getOwnPropertyDescriptor(t, n);if (void 0 === i) {
        var s = Object.getPrototypeOf(t);return null === s ? void 0 : e(s, n, r);
      }if ("value" in i) return i.value;var o = i.get;if (void 0 !== o) return o.call(r);
    },
        l = n(1),
        a = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(l),
        c = n(0),
        p = function (e) {
      function t() {
        return r(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
      }return s(t, e), u(t, [{ key: "sendJSON", value: function (e) {
          window.postMessage(c.RN_MESSAGES_CHANNEL_PREFIX + o("json", e));
        } }, { key: "send", value: function (e) {
          window.postMessage(c.RN_MESSAGES_CHANNEL_PREFIX + o("text", e));
        } }, { key: "emit", value: function (e, n, r) {
          f(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "emit", this).call(this, e, n), r || window.postMessage(c.RN_MESSAGES_CHANNEL_PREFIX + JSON.stringify({ type: "event", meta: { eventName: e }, payload: n }));
        } }]), t;
    }(a.default);window.RNMessagesChannel = new p(), e.exports = window.RNMessagesChannel;
  }]);
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
        // Callback can either be a function or a string
        if (typeof callback !== "function") {
            callback = new Function("" + callback);
        }
        // Copy function arguments
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 1];
        }
        // Store and register the task
        var task = { callback: callback, args: args };
        tasksByHandle[nextHandle] = task;
        registerImmediate(nextHandle);
        return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(args[0]);
                break;
            case 2:
                callback(args[0], args[1]);
                break;
            case 3:
                callback(args[0], args[1], args[2]);
                break;
            default:
                callback.apply(undefined, args);
                break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function (handle) {
            process.nextTick(function () {
                runIfPresent(handle);
            });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function (event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function (handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function (handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function (handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function (handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();
    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();
    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();
    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(3)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function () {};
Timeout.prototype.close = function () {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(4);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || this && this.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || this && this.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_native_webview_messaging__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_native_webview_messaging___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_native_webview_messaging__);


const createClient = __webpack_require__(1).create;

__WEBPACK_IMPORTED_MODULE_0_react_native_webview_messaging___default.a.on('json', text => {
  console.log('Fired!');
  createClient({
    authorization: text.payload.token
  }, (createErr, clientInstance) => {
    if (createErr) {
      console.log(createErr);
      __WEBPACK_IMPORTED_MODULE_0_react_native_webview_messaging___default.a.emit('isError', {
        message: createErr
      });
    }
    const data = {
      creditCard: {
        number: text.payload.number,
        cvv: text.payload.cvv,
        expirationDate: text.payload.expirationDate,
        options: {
          validate: false
        }
      }
    };

    clientInstance.request({
      endpoint: 'payment_methods/credit_cards',
      method: 'post',
      data
    }, (requestErr, response) => {
      if (requestErr) {
        __WEBPACK_IMPORTED_MODULE_0_react_native_webview_messaging___default.a.emit('isError', {
          message: requestErr
        });
      }

      __WEBPACK_IMPORTED_MODULE_0_react_native_webview_messaging___default.a.emit('isTokenizationComplete', {
        payload: response.creditCards[0].nonce
      });
    });
  });
});

/***/ })
/******/ ]);