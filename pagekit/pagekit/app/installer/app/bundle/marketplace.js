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

	module.exports = {

	    el: '#marketplace',

	    data: function () {
	        return _.extend({
	            search: this.$session.get('marketplace.search', '')
	        }, window.$data);
	    },

	    watch: {

	        search: function (search) {
	            this.$session.set('marketplace.search', search);
	        }

	    },

	    components: {
	        'marketplace': __webpack_require__(20)
	    }

	};

	Vue.ready(module.exports);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Install = Vue.extend(__webpack_require__(3));
	var Uninstall = Vue.extend(__webpack_require__(7));
	var Update = Vue.extend(__webpack_require__(10));

	module.exports = {

	    methods: {

	        queryUpdates: function (packages, success) {

	            var pkgs = {}, options = {emulateJSON: true};

	            _.each(packages, function (pkg) {
	                pkgs[pkg.name] = pkg.version;
	            });

	            return this.$http.post(this.api + '/api/package/update', {
	                packages: JSON.stringify(pkgs)
	            }, options).then(success, this.error);
	        },

	        enable: function (pkg) {
	            return this.$http.post('admin/system/package/enable', {name: pkg.name}).then(function () {
	                    this.$notify(this.$trans('"%title%" enabled.', {title: pkg.title}));
	                    Vue.set(pkg, 'enabled', true);
	                    document.location.reload();
	                }, this.error);
	        },

	        disable: function (pkg) {
	            return this.$http.post('admin/system/package/disable', {name: pkg.name})
	                .then(function () {
	                    this.$notify(this.$trans('"%title%" disabled.', {title: pkg.title}));
	                    Vue.set(pkg, 'enabled', false);
	                    document.location.reload();
	                }, this.error);
	        },

	        install: function (pkg, packages, onClose, packagist) {
	            var install = new Install({parent: this});

	            return install.install(pkg, packages, onClose, packagist);
	        },

	        update: function (pkg, updates, onClose, packagist) {
	            var update = new Update({parent: this});

	            return update.update(pkg, updates, onClose, packagist);
	        },

	        uninstall: function (pkg, packages) {
	            var uninstall = new Uninstall({parent: this});

	            return uninstall.uninstall(pkg, packages);
	        },

	        error: function (message) {
	            this.$notify(message.data, 'danger');
	        }

	    }

	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(4)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app\\installer\\app\\lib\\install.vue: named exports in *.vue files are ignored.")}
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
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\app\\installer\\app\\lib\\install.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {

	    mixins: [__webpack_require__(5)],

	    methods: {

	        install: function install(pkg, packages, onClose, packagist) {
	            this.$set('pkg', pkg);
	            this.cb = onClose;

	            return this.$http.post('admin/system/package/install', { package: pkg, packagist: Boolean(packagist) }, null, { xhr: this.init() }).then(function () {
	                if (this.status === 'success' && packages) {
	                    var index = _.findIndex(packages, 'name', pkg.name);

	                    if (-1 !== index) {
	                        packages.splice(index, 1, pkg);
	                    } else {
	                        packages.push(pkg);
	                    }
	                }
	            }, function (msg) {
	                this.$notify(msg.data, 'danger');
	                this.close();
	            });
	        },

	        enable: function enable() {
	            this.$parent.enable(this.pkg);
	            this.close();
	        }
	    }

	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = {

	    data: function () {
	        return {
	            pkg: {},
	            output: '',
	            status: 'loading',
	            options: {
	                bgclose: false,
	                keyboard: false
	            }
	        }
	    },

	    created: function () {
	        this.$mount().$appendTo('body');
	    },

	    methods: {

	        init: function () {
	            var vm = this;

	            this.open();
	            return {
	                onprogress: function () {
	                    vm.setOutput(this.responseText);
	                }
	            }

	        },

	        setOutput: function (output) {
	            var lines = output.split("\n");
	            var match = lines[lines.length - 1].match(/^status=(success|error)$/);

	            if (match) {
	                this.status = match[1];
	                delete lines[lines.length - 1];
	                this.output = lines.join("\n");
	            } else {
	                this.output = output;
	            }
	        },

	        open: function () {
	            this.$refs.output.open();
	            this.$refs.output.modal.on('hide.uk.modal', this.onClose);
	        },

	        close: function () {
	            this.$refs.output.close();
	        },

	        onClose: function () {
	            if (this.cb) {
	                this.cb(this);
	            }

	            this.$destroy();
	        }

	    },

	    watch: {
	        status: function () {
	            if (this.status !== 'loading') {
	                this.$refs.output.modal.options.bgclose = true;
	                this.$refs.output.modal.options.keyboard = true;
	            }
	        }
	    }

	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "\n\n<div>\n    <v-modal v-ref:output :options=\"options\">\n\n        <div class=\"uk-modal-header uk-flex uk-flex-middle\">\n            <h2>{{ 'Installing %title% %version%' | trans {title:pkg.title,version:pkg.version} }}</h2>\n        </div>\n\n        <pre class=\"pk-pre uk-text-break\" v-html=\"output\"></pre>\n\n        <v-loader v-show=\"status == 'loading'\"></v-loader>\n\n        <div class=\"uk-alert uk-alert-success\" v-show=\"status == 'success'\">{{ 'Successfully installed.' | trans }}</div>\n        <div class=\"uk-alert uk-alert-danger\" v-show=\"status == 'error'\">{{ 'Error' | trans}}</div>\n\n        <div class=\"uk-modal-footer uk-text-right\" v-show=\"status != 'loading'\">\n            <a class=\"uk-button uk-button-link\" @click.prevent=\"close\">{{ 'Close' | trans }}</a>\n            <a class=\"uk-button uk-button-primary\" @click.prevent=\"enable\" v-show=\"status == 'success'\">{{ 'Enable' | trans }}</a>\n        </div>\n\n    </v-modal>\n</div>\n\n";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(8)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app\\installer\\app\\lib\\uninstall.vue: named exports in *.vue files are ignored.")}
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
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\app\\installer\\app\\lib\\uninstall.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {

	    mixins: [__webpack_require__(5)],

	    methods: {

	        uninstall: function uninstall(pkg, packages) {
	            this.$set('pkg', pkg);

	            return this.$http.post('admin/system/package/uninstall', { name: pkg.name }, { xhr: this.init() }).then(function () {
	                if (this.status === 'success' && packages) {
	                    packages.splice(packages.indexOf(pkg), 1);
	                }
	            }, function (msg) {
	                this.$notify(msg.data, 'danger');
	                this.close();
	            });
	        }

	    }

	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "\n\n<div>\n    <v-modal v-ref:output :options=\"options\">\n\n        <div class=\"uk-modal-header uk-flex uk-flex-middle\">\n            <h2>{{ 'Removing %title% %version%' | trans {title:pkg.title,version:pkg.version} }}</h2>\n        </div>\n\n        <pre class=\"pk-pre uk-text-break\" v-html=\"output\"></pre>\n\n        <v-loader v-show=\"status == 'loading'\"></v-loader>\n\n        <div class=\"uk-alert uk-alert-success\" v-show=\"status == 'success'\">{{ 'Successfully removed.' | trans }}</div>\n        <div class=\"uk-alert uk-alert-danger\" v-show=\"status == 'error'\">{{ 'Error' | trans}}</div>\n\n        <div class=\"uk-modal-footer uk-text-right\" v-show=\"status != 'loading'\">\n            <a class=\"uk-button uk-button-link\" @click.prevent=\"close\">{{ 'Close' | trans }}</a>\n        </div>\n\n    </v-modal>\n</div>\n\n";

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(11)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app\\installer\\app\\lib\\update.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(12)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\app\\installer\\app\\lib\\update.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {

	    mixins: [__webpack_require__(5)],

	    methods: {

	        update: function update(pkg, updates, onClose, packagist) {
	            this.$set('pkg', pkg);
	            this.cb = onClose;

	            return this.$http.post('admin/system/package/install', { package: updates[pkg.name], packagist: Boolean(packagist) }, null, { xhr: this.init() }).then(function () {
	                if (this.status === 'loading') {
	                    this.status = 'error';
	                }

	                if (this.status === 'success') {
	                    Vue.delete(updates, pkg.name);
	                }

	                if (pkg.enabled) {
	                    this.$parent.enable(pkg).then(null, function () {
	                        this.status = 'error';
	                    });
	                }
	            }, function (msg) {
	                this.$notify(msg.data, 'danger');
	                this.close();
	            });
	        }
	    }

	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "\n\n<div>\n    <v-modal v-ref:output :options=\"options\">\n\n        <div class=\"uk-modal-header uk-flex uk-flex-middle\">\n            <h2>{{ 'Updating %title% to %version%' | trans {title:pkg.title,version:pkg.version} }}</h2>\n        </div>\n\n        <pre class=\"pk-pre uk-text-break\" v-html=\"output\"></pre>\n\n        <v-loader v-show=\"status == 'loading'\"></v-loader>\n\n        <div class=\"uk-alert uk-alert-success\" v-show=\"status == 'success'\">{{ 'Successfully updated.' | trans }}</div>\n        <div class=\"uk-alert uk-alert-danger\" v-show=\"status == 'error'\">{{ 'Error' | trans}}</div>\n\n        <div class=\"uk-modal-footer uk-text-right\" v-show=\"status != 'loading'\">\n            <a class=\"uk-button uk-button-link\" @click.prevent=\"close\">{{ 'Close' | trans }}</a>\n        </div>\n\n    </v-modal>\n</div>\n\n";

/***/ },
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(21)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app\\installer\\app\\components\\marketplace.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(22)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\app\\installer\\app\\components\\marketplace.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {

	    mixins: [__webpack_require__(2)],

	    props: {
	        api: { type: String, default: '' },
	        search: { type: String, default: '' },
	        page: { type: Number, default: 0 },
	        type: { type: String, default: 'pagekit-extension' },
	        installed: {
	            type: Array, default: function _default() {
	                return [];
	            }
	        }
	    },

	    data: function data() {
	        return {
	            pkg: null,
	            packages: null,
	            updates: null,
	            pages: 0,
	            iframe: '',
	            status: ''
	        };
	    },

	    created: function created() {
	        this.$options.name = this.type;
	    },

	    ready: function ready() {

	        this.$watch('page', this.query, { immediate: true });

	        this.queryUpdates(this.installed, function (res) {
	            var data = res.data;
	            this.$set('updates', data.packages.length ? data.packages : null);
	        });
	    },

	    watch: {

	        search: function search() {
	            if (this.page) {
	                this.page = 0;
	            } else {
	                this.query();
	            }
	        },

	        type: function type() {
	            if (this.page) {
	                this.page = 0;
	            } else {
	                this.query();
	            }
	        }

	    },

	    methods: {

	        query: function query() {

	            var url = this.api + '/api/package/search',
	                options = { emulateJSON: true };

	            this.$http.post(url, { q: this.search, type: this.type, page: this.page }, options).then(function (res) {
	                var data = res.data;
	                this.$set('packages', data.packages);
	                this.$set('pages', data.pages);
	            }, function () {
	                this.$set('packages', null);
	                this.$set('status', 'error');
	            });
	        },

	        details: function details(pkg) {

	            if (!this.modal) {
	                this.modal = UIkit.modal(this.$els.modal);
	            }

	            this.$set('pkg', pkg);
	            this.$set('status', '');

	            this.modal.show();
	        },

	        doInstall: function doInstall(pkg) {

	            this.modal.hide();
	            this.install(pkg, this.installed);
	        },

	        isInstalled: function isInstalled(pkg) {
	            return _.isObject(pkg) ? _.find(this.installed, 'name', pkg.name) : undefined;
	        }
	    },

	    filters: {
	        marked: marked
	    }

	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "\n\n<div>\n\n    <div class=\"uk-grid uk-grid-medium uk-grid-match uk-grid-width-small-1-2 uk-grid-width-xlarge-1-3\" data-uk-grid-margin=\"observe:true\">\n        <div v-for=\"pkg in packages\">\n            <div class=\"uk-panel uk-panel-box uk-overlay-hover\">\n\n                <div class=\"uk-panel-teaser\">\n                    <div class=\"uk-overlay uk-display-block\">\n                        <div class=\"uk-cover-background uk-position-cover\" :style=\"{ 'background-image': 'url(' + pkg.extra.image + ')' }\"></div>\n                        <canvas class=\"uk-responsive-width uk-display-block\" width=\"1200\" height=\"800\"></canvas>\n                        <div class=\"uk-overlay-panel uk-overlay-background pk-overlay-background uk-overlay-fade\"></div>\n                    </div>\n                </div>\n\n                <h2 class=\"uk-panel-title uk-margin-remove\">{{ pkg.title }}</h2>\n\n                <p class=\"uk-text-muted uk-margin-remove\">{{ pkg.author.name }}</p>\n                <a class=\"uk-position-cover\" @click=\"details(pkg)\"></a>\n\n            </div>\n        </div>\n    </div>\n\n    <v-pagination :page.sync=\"page\" :pages=\"pages\" v-show=\"pages > 1 || page > 0\"></v-pagination>\n\n    <div class=\"uk-modal\" v-el:modal>\n        <div class=\"uk-modal-dialog uk-modal-dialog-large\" v-if=\"pkg\">\n\n            <div class=\"pk-modal-dialog-badge\">\n                <button class=\"uk-button\" disabled v-show=\"isInstalled(pkg)\">{{ 'Installed' | trans }}</button>\n                <button class=\"uk-button uk-button-primary\" @click=\"doInstall(pkg)\" v-else>{{ 'Install' | trans }}</button>\n            </div>\n\n            <div class=\"uk-modal-header\">\n                <h2 class=\"uk-margin-small-bottom\">{{ pkg.title }}</h2>\n                <ul class=\"uk-subnav uk-subnav-line uk-margin-bottom-remove\">\n                    <li v-if=\"pkg.author.homepage\"><a class=\"uk-link-muted\" :href=\"pkg.author.homepage\" target=\"_blank\">{{ pkg.author.name }}</a></li>\n                    <li class=\"uk-text-muted\" v-else>{{ pkg.author.name }}</li>\n                    <li class=\"uk-text-muted\">{{ 'Version %version%' | trans {version:pkg.version} }}</li>\n                    <li class=\"uk-text-muted\" v-if=\"pkg.license\">{{ pkg.license }}</li>\n                </ul>\n            </div>\n\n            <div class=\"uk-grid\">\n                <div class=\"uk-width-medium-1-2\">\n                    <img width=\"1200\" height=\"800\" :alt=\"pkg.title\" :src=\"pkg.extra.image\">\n                </div>\n                <div class=\"uk-width-medium-1-2\">\n\n                    <div v-html=\"pkg.description | marked\" v-if=\"pkg.description\"></div>\n\n                    <ul class=\"uk-grid uk-grid-small\" data-uk-grid-margin>\n                        <li v-if=\"pkg.demo\"><a class=\"uk-button\" :href=\"pkg.demo\" target=\"_blank\">{{ 'Demo' | trans }}</a></li>\n                        <li v-if=\"pkg.support\"><a class=\"uk-button\" :href=\"pkg.support\" target=\"_blank\">{{ 'Support' | trans }}</a></li>\n                        <li v-if=\"pkg.documentation\"><a class=\"uk-button\" :href=\"pkg.documentation\" target=\"_blank\">{{ 'Documentation' | trans }}</a></li>\n                    </ul>\n\n                </div>\n            </div>\n\n        </div>\n    </div>\n\n    <h3 class=\"uk-h1 uk-text-muted uk-text-center\" v-show=\"packages && !packages.length\">{{ 'Nothing found.' | trans }}</h3>\n\n    <p class=\"uk-alert uk-alert-warning\" v-show=\"status == 'error'\">{{ 'Cannot connect to the marketplace. Please try again later.' | trans }}</p>\n\n</div>\n\n";

/***/ }
/******/ ]);