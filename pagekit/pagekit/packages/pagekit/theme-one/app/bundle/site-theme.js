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
	__vue_script__ = __webpack_require__(3)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages\\pagekit\\theme-one\\app\\components\\site-theme.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(4)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\packages\\pagekit\\theme-one\\app\\components\\site-theme.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    section: {
	        label: 'Theme',
	        icon: 'pk-icon-large-brush',
	        priority: 15
	    },

	    data: function data() {
	        return _.extend({ config: {} }, window.$theme);
	    },

	    events: {

	        save: function save() {

	            this.$http.post('admin/system/settings/config', { name: this.name, config: this.config }).catch(function (res) {
	                this.$notify(res.data, 'danger');
	            });
	        }

	    }

	};

	window.Site.components['site-theme'] = module.exports;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"uk-margin uk-flex uk-flex-space-between uk-flex-wrap\" data-uk-margin>\n    <div data-uk-margin>\n        <h2 class=\"uk-margin-remove\">{{ 'Theme' | trans }}</h2>\n    </div>\n    <div data-uk-margin>\n        <button class=\"uk-button uk-button-primary\" type=\"submit\">{{ 'Save' | trans }}</button>\n    </div>\n</div>\n\n<div class=\"uk-form uk-form-horizontal\">\n\n    <div class=\"uk-form-row\">\n        <label class=\"uk-form-label\">{{ 'Logo Contrast' | trans }}</label>\n        <div class=\"uk-form-controls uk-form-width-large\">\n            <input-image :source.sync=\"config.logo_contrast\"></input-image>\n            <p class=\"uk-form-help-block\">{{ 'Select an alternative logo which looks great on images.' | trans }}</p>\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <label class=\"uk-form-label\">{{ 'Logo Off-canvas' | trans }}</label>\n        <div class=\"uk-form-controls uk-form-width-large\">\n            <input-image :source.sync=\"config.logo_offcanvas\"></input-image>\n            <p class=\"uk-form-help-block\">{{ 'Select an optional logo for the off-canvas menu.' | trans }}</p>\n        </div>\n    </div>\n\n</div>\n\n";

/***/ }
/******/ ]);