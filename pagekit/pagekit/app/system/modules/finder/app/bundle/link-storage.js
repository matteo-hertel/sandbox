var Finder =
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
	  console.warn("[vue-loader] app\\system\\modules\\finder\\app\\components\\link-storage.vue: named exports in *.vue files are ignored.")}
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
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\app\\system\\modules\\finder\\app\\components\\link-storage.vue"
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
	        label: 'Storage'
	    },

	    props: ['link'],

	    data: function data() {
	        return _.merge({
	            file: ''
	        }, $pagekit);
	    },

	    created: function created() {
	        this.assets = this.$asset({
	            js: ['app/assets/uikit/js/components/upload.min.js', 'app/system/modules/finder/app/bundle/panel-finder.js']
	        });
	    },

	    watch: {
	        file: function file(_file) {
	            this.$set('link', _file);
	        }
	    },

	    methods: {

	        pick: function pick() {
	            this.assets.then(function () {
	                this.$refs.modal.open();
	            });
	        },

	        select: function select() {
	            this.file = this.$refs.finder.getSelected()[0];
	            this.$refs.finder.removeSelection();
	            this.$refs.modal.close();
	        },

	        hasSelection: function hasSelection() {
	            var selected = this.$refs.finder.getSelected();
	            return selected.length === 1;
	        }

	    }

	};

	window.Links.components['link-storage'] = module.exports;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"uk-form-row\">\n    <label for=\"form-link-file\" class=\"uk-form-label\">{{ 'File' | trans }}</label>\n    <div class=\"uk-form-controls\">\n        <div class=\"pk-form-link uk-width-1-1\">\n            <input id=\"form-link-file\" class=\"uk-width-1-1\" type=\"text\" v-model=\"file\" v-validate:required=\"isRequired\" v-el:input lazy>\n            <a class=\"pk-form-link-toggle pk-link-icon uk-flex-middle\" @click.prevent=\"pick\">{{ 'Select' | trans }} <i class=\"pk-icon-link pk-icon-hover uk-margin-small-left\"></i></a>\n        </div>\n    </div>\n</div>\n\n<v-modal v-ref:modal large>\n\n    <panel-finder :root=\"storage\" v-ref:finder :modal=\"true\"></panel-finder>\n\n    <div class=\"uk-modal-footer uk-text-right\">\n        <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n        <button class=\"uk-button uk-button-primary\" type=\"button\" :disabled=\"!hasSelection()\" @click.prevent=\"select\">{{ 'Select' | trans }}</button>\n    </div>\n\n</v-modal>\n\n";

/***/ }
/******/ ]);