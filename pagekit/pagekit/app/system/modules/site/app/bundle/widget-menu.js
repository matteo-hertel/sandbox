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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(30)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app\\system\\modules\\site\\app\\components\\widget-menu.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(31)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\app\\system\\modules\\site\\app\\components\\widget-menu.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 30:
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    section: {
	        label: 'Settings'
	    },

	    props: ['widget', 'config'],

	    data: function data() {
	        return {
	            menus: {}
	        };
	    },

	    created: function created() {

	        this.$options.partials = this.$parent.$options.partials;

	        this.$http.get('api/site/menu').then(function (res) {
	            this.$set('menus', res.data.filter(function (menu) {
	                return menu.id !== 'trash';
	            }));
	        });
	    }

	};

	window.Widgets.components['system-menu:settings'] = module.exports;

/***/ },

/***/ 31:
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"uk-grid pk-grid-large pk-width-sidebar-large\" data-uk-grid-margin>\n    <div class=\"pk-width-content uk-form-horizontal\">\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <input id=\"form-title\" class=\"uk-form-width-large\" type=\"text\" name=\"title\" v-model=\"widget.title\" v-validate:required>\n\n                <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.title.invalid\">{{ 'Title cannot be blank.' | trans }}</p>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-menu\" class=\"uk-form-label\">{{ 'Menu' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <select id=\"form-menu\" class=\"uk-form-width-large\" v-model=\"widget.data.menu\">\n                    <option value=\"\">{{ '- Menu -' | trans }}</option>\n                    <option v-for=\"m in menus\" :value=\"m.id\">{{ m.label }}</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-level\" class=\"uk-form-label\">{{ 'Start Level' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <select id=\"form-level\" class=\"uk-form-width-large\" v-model=\"widget.data.start_level\" number>\n                    <option value=\"1\">1</option>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                    <option value=\"5\">5</option>\n                    <option value=\"6\">6</option>\n                    <option value=\"7\">7</option>\n                    <option value=\"8\">8</option>\n                    <option value=\"9\">9</option>\n                    <option value=\"10\">10</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-depth\" class=\"uk-form-label\">{{ 'Depth' | trans }}</label>\n\n            <div class=\"uk-form-controls\">\n                <select id=\"form-depth\" class=\"uk-form-width-large\" v-model=\"widget.data.depth\" number>\n                    <option value=\"\">{{ 'No Limit' | trans }}</option>\n                    <option value=\"1\">1</option>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                    <option value=\"5\">5</option>\n                    <option value=\"6\">6</option>\n                    <option value=\"7\">7</option>\n                    <option value=\"8\">8</option>\n                    <option value=\"9\">9</option>\n                    <option value=\"10\">10</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'Sub Items' | trans }}</span>\n\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"radio\" value=\"all\" v-model=\"widget.data.mode\"> {{ 'Show all' | trans }}</label>\n                </p>\n\n                <p class=\"uk-form-controls-condensed\">\n                    <label><input type=\"radio\" value=\"active\" v-model=\"widget.data.mode\"> {{ 'Show only for active item' | trans }}</label>\n                </p>\n            </div>\n        </div>\n\n    </div>\n    <div class=\"pk-width-sidebar\">\n\n        <partial name=\"settings\"></partial>\n\n    </div>\n</div>\n\n";

/***/ }

/******/ });