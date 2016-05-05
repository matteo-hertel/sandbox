/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(1)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages\\pagekit\\blog\\app\\components\\link-blog.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(2)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\packages\\pagekit\\blog\\app\\components\\link-blog.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    link: {
	        label: 'Blog'
	    },

	    props: ['link'],

	    data: function data() {
	        return {
	            posts: []
	        };
	    },

	    created: function created() {
	        this.$http.get('api/blog/post', { filter: { limit: 1000 } }).then(function (res) {
	            this.$set('posts', res.data.posts);
	        });
	    },

	    ready: function ready() {
	        this.link = '@blog';
	    },

	    filters: {

	        link: function link(post) {
	            return '@blog/id?id=' + post.id;
	        }

	    }

	};

	window.Links.components['link-blog'] = module.exports;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"uk-form-row\">\n    <label for=\"form-link-blog\" class=\"uk-form-label\">{{ 'View' | trans }}</label>\n    <div class=\"uk-form-controls\">\n        <select id=\"form-link-blog\" class=\"uk-width-1-1\" v-model=\"link\">\n            <option value=\"@blog\">{{ 'Posts View' | trans }}</option>\n            <optgroup :label=\"'Posts' | trans\">\n                <option v-for=\"p in posts\" :value=\"p | link\">{{ p.title }}</option>\n            </optgroup>\n        </select>\n    </div>\n</div>\n\n";

/***/ }
/******/ ]);