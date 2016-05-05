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

	window.User = {

	    el: '#user-edit',

	    data: function () {
	        return _.extend({sections: [], form: {}}, window.$data);
	    },

	    created: function () {

	        var sections = [];

	        _.forIn(this.$options.components, function (component, name) {

	            var options = component.options || {};

	            if (options.section) {
	                sections.push(_.extend({name: name, priority: 0}, options.section));
	            }

	        });

	        this.$set('sections', _.sortBy(sections, 'priority'));

	    },

	    ready: function () {
	        this.tab = UIkit.tab(this.$els.tab, {connect: this.$els.content});
	    },

	    methods: {

	        save: function () {

	            var data = {user: this.user};

	            this.$broadcast('save', data);

	            this.$resource('api/user{/id}').save({id: this.user.id}, data).then(function (res) {
	                        if (!this.user.id) {
	                            window.history.replaceState({}, '', this.$url.route('admin/user/edit', {id: res.data.user.id}))
	                        }

	                        this.$set('user', res.data.user);

	                        this.$notify('User saved.');
	                    }, function (res) {
	                        this.$notify(res.data, 'danger');
	                    }
	                );

	        }

	    },

	    components: {

	        settings: __webpack_require__(7)

	    }

	};

	Vue.ready(window.User);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(8)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app\\system\\modules\\user\\app\\components\\user-settings.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(9)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\app\\system\\modules\\user\\app\\components\\user-settings.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    section: {
	        label: 'User'
	    },

	    props: ['user', 'config', 'form'],

	    data: function data() {
	        return { password: '', hidePassword: true, editingPassword: false };
	    },

	    ready: function ready() {},

	    computed: {

	        isNew: function isNew() {
	            return !this.user.login && this.user.status;
	        }

	    },

	    events: {

	        save: function save(data) {
	            data.password = this.password;
	        }

	    }

	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"uk-grid\" data-uk-grid-margin>\n    <div class=\"uk-width-medium-2-3 uk-width-large-3-4\">\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-username\" class=\"uk-form-label\">{{ 'Username' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <input id=\"form-username\" class=\"uk-form-width-large\" type=\"text\" name=\"username\" v-model=\"user.username\" v-validate:pattern.literal=\"/^[a-zA-Z0-9._\\-]+$/\">\n                <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.username.invalid\">{{ 'Username cannot be blank and may only contain alphanumeric characters (A-Z, 0-9) and some special characters (\"._-\")' | trans }}</p>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-name\" class=\"uk-form-label\">{{ 'Name' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <input id=\"form-name\" class=\"uk-form-width-large\" type=\"text\" name=\"name\" v-model=\"user.name\" v-validate:required>\n                <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.name.invalid\">{{ 'Name cannot be blank.' | trans }}</p>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-email\" class=\"uk-form-label\">{{ 'Email' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <input id=\"form-email\" class=\"uk-form-width-large\" type=\"text\" name=\"email\" v-model=\"user.email\" v-validate:email v-validate:required lazy>\n                <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.email.invalid\">{{ 'Field must be a valid email address.' | trans }}</p>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"form-password\" class=\"uk-form-label\">{{ 'Password' | trans }}</label>\n            <div class=\"uk-form-controls uk-form-controls-text\" v-show=\"user.id && !editingPassword\">\n                <a href=\"#\" @click.prevent=\"editingPassword = true\">{{ 'Change password' | trans }}</a>\n            </div>\n            <div class=\"uk-form-controls\" :class=\"{'uk-hidden' : (user.id && !editingPassword)}\">\n                <div class=\"uk-form-password\">\n                    <input id=\"form-password\" class=\"uk-form-width-large\" :type=\"hidePassword ? 'password' : 'text'\" v-model=\"password\">\n                    <a href=\"#\" class=\"uk-form-password-toggle\" @click.prevent=\"hidePassword = !hidePassword\">{{ hidePassword ? 'Show' : 'Hide' | trans }}</a>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'Status' | trans }}</span>\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <p class=\"uk-form-controls-condensed\" v-for=\"status in config.statuses\">\n                    <label><input type=\"radio\" v-model=\"user.status\" :value=\"parseInt($key)\" :disabled=\"config.currentUser == user.id\"> {{ status }}</label>\n                </p>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'Roles' | trans }}</span>\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <p class=\"uk-form-controls-condensed\" v-for=\"role in config.roles\">\n                    <label><input type=\"checkbox\" :value=\"role.id\" :disabled=\"role.disabled\" v-model=\"user.roles\"> {{ role.name }}</label>\n                </p>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'Last login' | trans }}</span>\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                <p>{{ $trans('%date%', { date: user.login ? $date(user.login) : $trans('Never') }) }}</p>\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <span class=\"uk-form-label\">{{ 'Registered since' | trans }}</span>\n            <div class=\"uk-form-controls uk-form-controls-text\">\n                {{ user.registered ? $trans('%date%', { date: $date(user.registered) }) : '' }}\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"uk-width-medium-1-3 uk-width-large-1-4\">\n\n        <div class=\"uk-panel uk-panel-box uk-text-center\" v-show=\"user.name\">\n\n            <div class=\"uk-panel-teaser\">\n                <img height=\"280\" width=\"280\" :alt=\"user.name\" v-gravatar=\"user.email\">\n            </div>\n\n            <h3 class=\"uk-panel-tile uk-margin-bottom-remove uk-text-break\">{{ user.name }}\n                <i :title=\"(isNew ? 'New' : config.statuses[user.status]) | trans\" :class=\"{\n                    'pk-icon-circle-primary': isNew,\n                    'pk-icon-circle-success': user.access && user.status,\n                    'pk-icon-circle-danger': !user.status\n                }\"></i>\n            </h3>\n\n            <div>\n                <a class=\"uk-text-break\" :href=\"'mailto:'+user.email\">{{ user.email }}</a><i class=\"uk-icon-check\" :title=\"'Verified email address' | trans\" v-show=\"config.emailVerification && user.data.verified\"></i>\n            </div>\n\n        </div>\n\n    </div>\n</div>\n\n";

/***/ }
/******/ ]);