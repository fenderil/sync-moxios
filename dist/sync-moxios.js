(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("axios"));
	else if(typeof define === 'function' && define.amd)
		define(["axios"], factory);
	else if(typeof exports === 'object')
		exports["moxios"] = factory(require("axios"));
	else
		root["moxios"] = factory(root["axios"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _axios = __webpack_require__(1);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultAdapter = void 0;
	var defaultRequest = /./;
	var noop = function noop() {};
	var stubs = {};
	
	var mockAdapter = function mockAdapter(request) {
	    return new Promise(function (resolve, reject) {
	        var stub = stubs[request.url];
	
	        if (stub) {
	            stub.requests.push(request);
	            var response = stub.response,
	                _stub$afterRequest = stub.afterRequest,
	                afterRequest = _stub$afterRequest === undefined ? noop : _stub$afterRequest,
	                _stub$afterResponse = stub.afterResponse,
	                afterResponse = _stub$afterResponse === undefined ? noop : _stub$afterResponse;
	
	
	            afterRequest(request);
	            if (typeof response === 'function') {
	                response(function (data) {
	                    stub.responses.push(data);
	                    resolve(data);
	                    afterResponse(request, data);
	                });
	            } else {
	                stub.responses.push(response);
	                resolve(response);
	                afterResponse(request, response);
	            }
	        } else {
	            reject(new Error('There is no stub for ' + request.url + ' service'));
	        }
	    });
	};
	
	exports.default = {
	    stubs: stubs,
	
	    install: function install() {
	        var instance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _axios2.default;
	
	        defaultAdapter = instance.defaults.adapter;
	        instance.defaults.adapter = mockAdapter;
	    },
	
	    uninstall: function uninstall() {
	        var instance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _axios2.default;
	
	        instance.defaults.adapter = defaultAdapter;
	        stubs = {};
	    },
	
	    stubRequest: function stubRequest(url, response, afterRequest, afterResponse) {
	        var key = url.source || url || defaultRequest.source;
	        stubs[key] = {
	            response: response,
	            afterRequest: afterRequest,
	            afterResponse: afterResponse,
	            requests: [],
	            responses: [],
	            mostRecentRequest: function mostRecentRequest() {
	                return this.requests[this.requests.length - 1];
	            },
	            getRequest: function getRequest(index) {
	                return this.requests[index];
	            },
	            mostRecentResponse: function mostRecentResponse() {
	                return this.responses[this.responses.length - 1];
	            },
	            getResponse: function getResponse(index) {
	                return this.responses[index];
	            },
	            requestsCount: function requestsCount() {
	                return this.requests.length;
	            }
	        };
	
	        return stubs[key];
	    },
	
	    unstubRequest: function unstubRequest(url) {
	        delete stubs[url.source || url || defaultRequest.source];
	    }
	};
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=sync-moxios.js.map