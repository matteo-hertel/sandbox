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
	__vue_script__ = __webpack_require__(16)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app\\system\\modules\\site\\app\\components\\node-page.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(17)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\app\\system\\modules\\site\\app\\components\\node-page.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 16:
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    section: {
	        label: 'Content'
	    },

	    props: ['node', 'roles', 'form'],

	    data: function data() {
	        return {
	            page: {
	                data: { title: true }
	            }
	        };
	    },

	    ready: function ready() {

	        if (!this.node.id) this.node.status = 1;
	    },

	    events: {

	        save: function save(data) {
	            data.page = this.page;

	            if (!this.node.title) {
	                this.node.title = this.page.title;
	            }
	        }

	    },

	    watch: {

	        'node.data.defaults.id': {

	            handler: function handler(id) {

	                if (id) {
	                    this.$http.get('api/site/page{/id}', { id: id }).then(function (res) {
	                        this.$set('page', res.data);
	                    });
	                }
	            },

	            immediate: true

	        }

	    }

	};

	window.Site.components['page:settings'] = module.exports;

/***/ },

/***/ 17:
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"uk-grid pk-grid-large pk-width-sidebar-large uk-form-stacked\" data-uk-grid-margin>\n    <div class=\"pk-width-content\">\n\n        <div class=\"uk-form-row\">\n            <input class=\"uk-width-1-1 uk-form-large\" type=\"text\" name=\"page[title]\" :placeholder=\"'Enter Title' | trans\" v-model=\"page.title\" v-validate:required lazy>\n\n            <div class=\"uk-form-help-block uk-text-danger\" v-show=\"form['page[title]'].invalid\">{{ 'Title cannot be blank.' | trans }}</div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <v-editor :value.sync=\"page.content\" :options=\"{markdown : page.data.markdown}\"></v-editor>\n            <p>\n                <label><input type=\"checkbox\" v-model=\"page.data.markdown\"> {{ 'Enable Markdown' | trans }}</label>\n            </p>\n        </div>\n\n    </div>\n    <div class=\"pk-width-sidebar\">\n\n        <div class=\"uk-panel\">\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-menu-title\" class=\"uk-form-label\">{{ 'Menu Title' | trans }}</label>\n\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-menu-title\" class=\"uk-form-width-large\" type=\"text\" v-model=\"node.title\">\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-slug\" class=\"uk-form-label\">{{ 'Slug' | trans }}</label>\n\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-slug\" class=\"uk-form-width-large\" type=\"text\" v-model=\"node.slug\">\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-status\" class=\"uk-form-label\">{{ 'Status' | trans }}</label>\n\n                <div class=\"uk-form-controls\">\n                    <select id=\"form-status\" class=\"uk-form-width-large\" v-model=\"node.status\">\n                        <option value=\"0\">{{ 'Disabled' | trans }}</option>\n                        <option value=\"1\">{{ 'Enabled' | trans }}</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <span class=\"uk-form-label\">{{ 'Restrict Access' | trans }}</span>\n\n                <div class=\"uk-form-controls uk-form-controls-text\">\n                    <p v-for=\"role in roles\" class=\"uk-form-controls-condensed\">\n                        <label><input type=\"checkbox\" :value=\"role.id\" v-model=\"node.roles\" number> {{ role.name }}</label>\n                    </p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <span class=\"uk-form-label\">{{ 'Menu' | trans }}</span>\n\n                <div class=\"uk-form-controls uk-form-controls-text\">\n                    <label><input type=\"checkbox\" value=\"center-content\" v-model=\"node.data.menu_hide\"> {{ 'Hide in menu' | trans }}</label>\n                </div>\n            </div>\n\n        </div>\n\n    </div>\n</div>\n\n";

/***/ }

/******/ });