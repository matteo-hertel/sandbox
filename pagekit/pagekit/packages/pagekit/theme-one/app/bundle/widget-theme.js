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
	__vue_script__ = __webpack_require__(5)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages\\pagekit\\theme-one\\app\\components\\widget-theme.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(6)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\packages\\pagekit\\theme-one\\app\\components\\widget-theme.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    section: {
	        label: 'Theme',
	        priority: 90
	    },

	    props: ['widget', 'config']

	};

	window.Widgets.components['theme'] = module.exports;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"uk-form-horizontal\">\n\n    <div class=\"uk-form-row\">\n        <span class=\"uk-form-label\">{{ 'Title' | trans }}</span>\n        <div class=\"uk-form-controls uk-form-controls-text\">\n            <label><input type=\"checkbox\" v-model=\"widget.theme.title_hide\"> {{ 'Hide Title' | trans }}</label>\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-theme-title-size\" class=\"uk-form-label\">{{ 'Title Size' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <select id=\"form-theme-title-size\" class=\"uk-form-width-large\" v-model=\"widget.theme.title_size\">\n                <option value=\"uk-panel-title\">{{ 'Default' | trans }}</option>\n                <option value=\"uk-h1 uk-margin-top-remove\">{{ 'H1' | trans }}</option>\n                <option value=\"uk-h2 uk-margin-top-remove\">{{ 'H2' | trans }}</option>\n                <option value=\"uk-h3 uk-margin-top-remove\">{{ 'H3' | trans }}</option>\n                <option value=\"uk-h4 uk-margin-top-remove\">{{ 'H4' | trans }}</option>\n                <option value=\"uk-heading-large uk-margin-top-remove\">Extra Large</option>\n            </select>\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <span class=\"uk-form-label\">{{ 'Alignment' | trans }}</span>\n        <div class=\"uk-form-controls uk-form-controls-text\">\n            <label><input type=\"checkbox\" v-model=\"widget.theme.alignment\"> {{ 'Center the title and content.' | trans }}</label>\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-theme-badge\" class=\"uk-form-label\">{{ 'HTML Class' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <input id=\"form-theme-badge\" class=\"uk-form-width-large\" type=\"text\" v-model=\"widget.theme.html_class\">\n        </div>\n    </div>\n\n    <div class=\"uk-form-row\">\n        <label for=\"form-theme-panel\" class=\"uk-form-label\">{{ 'Panel Style' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <select id=\"form-theme-panel\" class=\"uk-form-width-large\" v-model=\"widget.theme.panel\">\n                <option value=\"\">{{ 'None' | trans }}</option>\n                <option value=\"uk-panel-box\">{{ 'Box' | trans }}</option>\n                <option value=\"uk-panel-box uk-panel-box-primary\">{{ 'Box Primary' | trans }}</option>\n                <option value=\"uk-panel-box uk-panel-box-secondary\">{{ 'Box Secondary' | trans }}</option>\n                <option value=\"uk-panel-header\">{{ 'Header' | trans }}</option>\n            </select>\n        </div>\n    </div>\n\n</div>\n\n";

/***/ }
/******/ ]);