var Editor =
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
	  console.warn("[vue-loader] app\\system\\modules\\editor\\app\\components\\editor.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(26)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\app\\system\\modules\\editor\\app\\components\\editor.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {

	    props: ['type', 'value', 'options'],

	    data: function data() {
	        return {
	            editor: {},
	            height: 500
	        };
	    },

	    compiled: function compiled() {

	        if (this.options && this.options.height) {
	            this.height = this.options.height;
	        }

	        if (this.$el.hasAttributes()) {

	            var attrs = this.$el.attributes;

	            for (var i = attrs.length - 1; i >= 0; i--) {
	                this.$els.editor.setAttribute(attrs[i].name, attrs[i].value);
	                this.$el.removeAttribute(attrs[i].name);
	            }
	        }

	        var components = this.$options.components,
	            type = 'editor-' + this.type,
	            self = this,
	            Editor = components[type] || components['editor-' + window.$pagekit.editor] || components['editor-textarea'];

	        new Editor({ parent: this }).$on('ready', function () {

	            _.forIn(self.$options.components, function (Component) {
	                if (Component.options && Component.options.plugin) {
	                    new Component({ parent: self });
	                }
	            }, this);
	        });
	    },

	    components: {

	        'editor-textarea': {

	            created: function created() {
	                this.$emit('ready');
	                this.$parent.$set('show', true);
	            }

	        },
	        'editor-html': __webpack_require__(2),
	        'editor-code': __webpack_require__(3),
	        'plugin-link': __webpack_require__(4),
	        'plugin-image': __webpack_require__(8),
	        'plugin-video': __webpack_require__(12),
	        'plugin-url': __webpack_require__(16)

	    },

	    utils: {
	        'image-picker': Vue.extend(__webpack_require__(17)),
	        'video-picker': Vue.extend(__webpack_require__(20)),
	        'link-picker': Vue.extend(__webpack_require__(23))
	    }

	};

	Vue.component('v-editor', function (resolve) {
	    resolve(module.exports);
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {

	    created: function () {

	        this.$parent.$set('height', this.$parent.height + 47);

	        this.$asset({

	            css: [
	                'app/assets/codemirror/hint.css',
	                'app/assets/codemirror/codemirror.css'
	            ],
	            js: [
	                'app/assets/codemirror/codemirror.js',
	                'app/assets/marked/marked.js',
	                'app/assets/uikit/js/components/htmleditor.min.js'
	            ]

	        }).then(function () {

	            var editor = this.$parent.editor = UIkit.htmleditor(this.$parent.$els.editor, _.extend({
	                marked: window.marked,
	                CodeMirror: window.CodeMirror
	            }, this.$parent.options));

	            editor.element
	                .on('htmleditor-save', function (e, editor) {
	                    if (editor.element[0].form) {
	                        var event = document.createEvent('HTMLEvents');
	                        event.initEvent('submit', true, true);
	                        editor.element[0].form.dispatchEvent(event);
	                    }
	                });

	            editor.on('render', function () {
	                var regexp = /<script(.*)>[^<]+<\/script>|<style(.*)>[^<]+<\/style>/gi;
	                editor.replaceInPreview(regexp, '');
	            });

	            this.$watch('$parent.value', function (value) {
	                if (value != editor.editor.getValue()) {
	                    editor.editor.setValue(value);
	                }
	            });

	            this.$watch('$parent.options.markdown', function (markdown) {
	                    editor.trigger(markdown ? 'enableMarkdown' : 'disableMarkdown');
	                }, {immediate: true}
	            );

	            this.$emit('ready');
	        })

	    }

	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {

	    created: function () {

	        var self = this, $el = $(this.$parent.$els.editor), $parent = $el.parent();

	        $parent.addClass('pk-editor');

	        this.$asset({
	            css: [
	                'app/assets/codemirror/hint.css',
	                'app/assets/codemirror/codemirror.css'
	            ],
	            js: [
	                'app/assets/codemirror/codemirror.js'
	            ]

	        }).then(function () {

	            this.editor = CodeMirror.fromTextArea(this.$parent.$els.editor, _.extend({
	                mode: 'htmlmixed',
	                dragDrop: false,
	                autoCloseTags: true,
	                matchTags: true,
	                autoCloseBrackets: true,
	                matchBrackets: true,
	                indentUnit: 4,
	                indentWithTabs: false,
	                tabSize: 4
	            }, this.$parent.options));

	            $parent.attr('data-uk-check-display', 'true').on('display.uk.check', function (e) {
	                self.editor.refresh();
	            });

	            this.editor.on('change', function () {
	                self.editor.save();
	                $el.trigger('input');
	            });

	            this.$watch('$parent.value', function (value) {
	                if (value != this.editor.getValue()) {
	                    this.editor.setValue(value);
	                }
	            });

	            this.$emit('ready');

	        });
	    }

	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Editor Link plugin.
	 */

	module.exports = {

	    plugin: true,

	    created: function () {

	        var vm = this, editor = this.$parent.editor;

	        if (!editor || !editor.htmleditor) {
	            return;
	        }

	        this.links = [];

	        editor
	            .off('action.link')
	            .on('action.link', function (e, editor) {
	                vm.openModal(_.find(vm.links, function (link) {
	                    return link.inRange(editor.getCursor());
	                }));
	            })
	            .on('render', function () {
	                var regexp = editor.getMode() != 'gfm' ? /<a(?:\s.+?>|\s*>)(?:[^<]*)<\/a>/gi : /<a(?:\s.+?>|\s*>)(?:[^<]*)<\/a>|(?:\[([^\n\]]*)\])(?:\(([^\n\]]*)\))?/gi;
	                vm.links = editor.replaceInPreview(regexp, vm.replaceInPreview);
	            })
	            .on('renderLate', function () {

	                while (vm.$children.length) {
	                    vm.$children[0].$destroy();
	                }

	                Vue.nextTick(function () {
	                    editor.preview.find('link-preview').each(function () {
	                        vm.$compile(this);
	                    });
	                });

	            });

	    },

	    methods: {

	        openModal: function (link) {

	            var parser = new DOMParser(), editor = this.$parent.editor, cursor = editor.editor.getCursor();

	            if (!link) {
	                link = {
	                    replace: function (value) {
	                        editor.editor.replaceRange(value, cursor);
	                    }
	                };
	            }

	            new this.$parent.$options.utils['link-picker']({
	                parent: this,
	                data: {
	                    link: link
	                }
	            }).$mount()
	                .$appendTo('body')
	                .$on('select', function (link) {

	                    if (!link.anchor) {
	                        link.anchor = parser.parseFromString('<a></a>', "text/html").body.childNodes[0];
	                    }

	                    link.anchor.setAttribute('href', link.link);
	                    link.anchor.innerHTML = link.txt;

	                    link.replace(link.anchor.outerHTML);
	                });
	        },

	        replaceInPreview: function (data, index) {
	            var parser = new DOMParser();

	            data.data = {};
	            if (data.matches[0][0] == '<') {
	                data.anchor = parser.parseFromString(data.matches[0], "text/html").body.childNodes[0];
	                data.link = data.anchor.attributes.href ? data.anchor.attributes.href.nodeValue : '';
	                data.txt = data.anchor.innerHTML;
	            } else {

	                if (data.matches[data.matches.length - 1][data.matches[data.matches.length - 2] - 1] == '!') return false;

	                data.link = data.matches[2];
	                data.txt = data.matches[1];

	            }

	            return '<link-preview index="' + index + '"></link-preview>';
	        }

	    },

	    components: {

	        'link-preview': __webpack_require__(5)

	    }

	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(6)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app\\system\\modules\\editor\\app\\components\\link-preview.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(7)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\app\\system\\modules\\editor\\app\\components\\link-preview.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    props: ['index'],

	    computed: {

	        link: function link() {
	            return this.$parent.links[this.index] || {};
	        }

	    }

	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "\n\n<a :class=\"link.class\" :href=\"link.link\" @click.prevent=\"$parent.openModal(link)\"><span v-html=\"link.txt\" v-if=\"link.txt\"></span><span v-else>{{ 'Select Link' | trans }}</span> <span class=\"pk-icon-link pk-icon-hover\"></span></a>\n\n";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Editor Image plugin.
	 */

	module.exports = {

	    plugin: true,

	    created: function () {

	        var vm = this, editor = this.$parent.editor;

	        if (!editor || !editor.htmleditor) {
	            return;
	        }

	        this.images = [];

	        editor
	            .off('action.image')
	            .on('action.image', function (e, editor) {
	                vm.openModal(_.find(vm.images, function (img) {
	                    return img.inRange(editor.getCursor());
	                }));
	            })
	            .on('render', function () {
	                var regexp = editor.getMode() != 'gfm' ? /<img(.+?)>/gi : /(?:<img(.+?)>|!(?:\[([^\n\]]*)])(?:\(([^\n\]]*?)\))?)/gi;
	                vm.images = editor.replaceInPreview(regexp, vm.replaceInPreview);
	            })
	            .on('renderLate', function () {

	                while (vm.$children.length) {
	                    vm.$children[0].$destroy();
	                }

	                Vue.nextTick(function () {
	                    editor.preview.find('image-preview').each(function () {
	                        vm.$compile(this);
	                    });
	                });
	            });
	    },

	    methods: {

	        openModal: function (image) {

	            var parser = new DOMParser(), editor = this.$parent.editor, cursor = editor.editor.getCursor();

	            if (!image) {
	                image = {
	                    replace: function (value) {
	                        editor.editor.replaceRange(value, cursor);
	                    }
	                };
	            }

	            new this.$parent.$options.utils['image-picker']({
	                parent: this,
	                data: {
	                    image: image
	                }
	            }).$mount()
	                .$appendTo('body')
	                .$on('select', function (image) {

	                    var content;

	                    if ((image.tag || editor.getCursorMode()) == 'html') {

	                        if (!image.anchor) {
	                            image.anchor = parser.parseFromString('<img>', "text/html").body.childNodes[0];;
	                        }

	                        image.anchor.setAttribute('src', image.data.src);
	                        image.anchor.setAttribute('alt', image.data.alt);

	                        content = image.anchor.outerHTML;

	                    } else {
	                        content = '![' + image.data.alt + '](' + image.data.src + ')';
	                    }

	                    image.replace(content);
	                });
	        },

	        replaceInPreview: function (data, index) {
	            var parser = new DOMParser();

	            data.data = {};
	            if (data.matches[0][0] == '<') {
	                data.anchor = parser.parseFromString(data.matches[0], "text/html").body.childNodes[0];
	                data.data.src = data.anchor.attributes.src ? data.anchor.attributes.src.nodeValue : '';
	                data.data.alt = data.anchor.attributes.alt ? data.anchor.attributes.alt.nodeValue : '';
	                data.tag = 'html';
	            } else {
	                data.data.src = data.matches[3];
	                data.data.alt = data.matches[2];
	                data.tag = 'gfm';
	            }

	            return '<image-preview index="' + index + '"></image-preview>';
	        }

	    },

	    components: {

	        'image-preview': __webpack_require__(9)

	    }

	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(10)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app\\system\\modules\\editor\\app\\components\\image-preview.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(11)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\app\\system\\modules\\editor\\app\\components\\image-preview.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    props: ['index'],

	    computed: {

	        image: function image() {
	            return this.$parent.images[this.index] || {};
	        }

	    },

	    methods: {

	        config: function config() {
	            this.$parent.openModal(this.image);
	        },

	        remove: function remove() {
	            this.image.replace('');
	        }

	    }

	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"uk-panel uk-placeholder uk-placeholder-large uk-text-center uk-visible-hover\" v-if=\"!image.data.src\">\n\n    <img width=\"60\" height=\"60\" :alt=\"'Placeholder Image' | trans\" :src=\"$url('app/system/assets/images/placeholder-image.svg')\">\n    <p class=\"uk-text-muted uk-margin-small-top\">{{ 'Add Image' | trans }}</p>\n\n    <a class=\"uk-position-cover\" @click.prevent=\"config\"></a>\n\n    <div class=\"uk-panel-badge pk-panel-badge uk-hidden\">\n        <ul class=\"uk-subnav pk-subnav-icon\">\n            <li><a class=\"pk-icon-delete pk-icon-hover\" :title=\"'Delete' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"remove\"></a></li>\n        </ul>\n    </div>\n\n</div>\n\n<div class=\"uk-overlay uk-overlay-hover uk-visible-hover\" v-else>\n\n    <img :src=\"$url(image.data.src)\" :alt=\"image.data.alt\">\n\n    <div class=\"uk-overlay-panel uk-overlay-background uk-overlay-fade\"></div>\n\n    <a class=\"uk-position-cover\" @click.prevent=\"config\"></a>\n\n    <div class=\"uk-panel-badge pk-panel-badge uk-hidden\">\n        <ul class=\"uk-subnav pk-subnav-icon\">\n            <li><a class=\"pk-icon-delete pk-icon-hover\" :title=\"'Delete' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"remove\"></a></li>\n        </ul>\n    </div>\n\n</div>\n\n";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Editor Video plugin.
	 */

	module.exports = {

	    plugin: true,

	    created: function () {

	        var vm = this, editor = this.$parent.editor;

	        if (!editor || !editor.htmleditor) {
	            return;
	        }

	        this.videos = [];

	        editor.addButton('video', {
	            title: 'Video',
	            label: '<i class="uk-icon-video-camera"></i>'
	        });

	        editor.options.toolbar.push('video');

	        editor
	            .on('action.video', function (e, editor) {
	                vm.openModal(_.find(vm.videos, function (vid) {
	                    return vid.inRange(editor.getCursor());
	                }));
	            })
	            .on('render', function () {
	                vm.videos = editor.replaceInPreview(/<(video|iframe)([^>]*)>[^<]*<\/(?:video|iframe)>|\(video\)(\{.+?})/gi, vm.replaceInPreview);
	            })
	            .on('renderLate', function () {

	                while (vm.$children.length) {
	                    vm.$children[0].$destroy();
	                }

	                Vue.nextTick(function () {
	                    editor.preview.find('video-preview').each(function () {
	                        vm.$compile(this);
	                    });
	                });

	            });

	        editor.debouncedRedraw();
	    },

	    methods: {

	        openModal: function (video) {

	            var parser = new DOMParser(), editor = this.$parent.editor, cursor = editor.editor.getCursor();

	            if (!video) {
	                video = {
	                    replace: function (value) {
	                        editor.editor.replaceRange(value, cursor);
	                    }
	                };
	            }

	            var picker = new this.$parent.$options.utils['video-picker']({
	                parent: this,
	                data: {
	                    video: video
	                }
	            }).$mount()
	                .$appendTo('body')
	                .$on('select', function (video) {

	                    var attributes, src, match;

	                    delete video.data.playlist;

	                    if (match = picker.isYoutube) {
	                        src = 'https://www.youtube.com/embed/' + match[1] + '?';

	                        if (video.data.loop) {
	                            video.data.playlist = match[1];
	                        }
	                    } else if (match = picker.isVimeo) {
	                        src = 'https://player.vimeo.com/video/' + match[3] + '?';
	                    }

	                    if (src) {

	                        if (!video.anchor) {
	                            video.anchor = parser.parseFromString('<iframe></iframe>', "text/html").body.childNodes[0];
	                        }

	                        _.forEach(video.data, function (value, key) {
	                            if (key === 'src' || key === 'width' || key === 'height') {
	                                return;
	                            }

	                            src += key + '=' + (_.isBoolean(value) ? Number(value) : value) + '&';
	                        });

	                        video.attributes = video.attributes || {};

	                        video.attributes.src = src.slice(0, -1);
	                        video.attributes.width = video.data.width || 690;
	                        video.attributes.height = video.data.height || 390;
	                        video.attributes.allowfullscreen = true;

	                        attributes = video.attributes;

	                    } else {

	                        if (!video.anchor) {
	                            video.anchor = parser.parseFromString('<video></video>', "text/html").body.childNodes[0];
	                        }

	                        attributes = video.data;

	                    }


	                    _.forEach(attributes, function (value, key) {
	                        if (value) {
	                            video.anchor.setAttribute(key, _.isBoolean(value) ? '' : value);
	                        } else {
	                            video.anchor.removeAttribute(key);
	                        }
	                    });

	                    video.replace(video.anchor.outerHTML);

	                });
	        },

	        replaceInPreview: function (data, index) {

	            var parser = new DOMParser(), settings, src, query;

	            if (!data.matches[3]) {

	                data.data = {};
	                data.anchor = parser.parseFromString(data.matches[0], "text/html").body.childNodes[0];

	                if (data.anchor.nodeName === 'VIDEO') {

	                    _.forEach(data.anchor.attributes, function (attr) {
	                        data.data[attr.name] = attr.nodeValue === '' || attr.nodeValue;
	                    });

	                    data.data['controls'] = data.data['controls'] !== undefined;

	                } else if (data.anchor.nodeName === 'IFRAME') {

	                    data.attributes = {};
	                    _.forEach(data.anchor.attributes, function (attr) {
	                        data.attributes[attr.name] = attr.nodeValue === '' || attr.nodeValue;
	                    });

	                    src = data.attributes.src || '';
	                    src = src.split('?');
	                    query = src[1] || '';
	                    src = src[0];
	                    query.split('&').forEach(function (param) {
	                        param = param.split('=');
	                        data.data[param[0]] = param[1];
	                    });

	                    data.data.src = src;
	                    if (data.attributes.width) {
	                        data.data.width = data.attributes.width;
	                    }
	                    if (data.attributes.height) {
	                        data.data.height = data.attributes.height;
	                    }
	                }
	            } else {

	                try {
	                    settings = JSON.parse(data.matches[3]);
	                } catch (e) {}

	                data.data = settings || {src: ''};
	            }

	            return '<video-preview index="' + index + '"></video-preview>';

	        }

	    },

	    components: {

	        'video-preview': __webpack_require__(13)

	    }

	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(14)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app\\system\\modules\\editor\\app\\components\\video-preview.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(15)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\app\\system\\modules\\editor\\app\\components\\video-preview.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    props: ['index'],

	    data: function data() {
	        return { imageSrc: false, videoSrc: false, width: '', height: '' };
	    },

	    watch: {
	        'video.data': {
	            handler: 'update',
	            immediate: true,
	            deep: true
	        }
	    },

	    computed: {

	        video: function video() {
	            return this.$parent.videos[this.index] || {};
	        }

	    },

	    methods: {

	        config: function config() {
	            this.$parent.openModal(this.video);
	        },

	        remove: function remove() {
	            this.video.replace('');
	        },

	        update: function update(data) {

	            var matches;

	            this.$set('imageSrc', false);
	            this.$set('videoSrc', false);
	            this.$set('width', data.width || 690);
	            this.$set('height', data.height || 390);

	            var src = data.src || '';
	            if (matches = src.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)) {

	                this.imageSrc = '//img.youtube.com/vi/' + matches[1] + '/hqdefault.jpg';
	            } else if (src.match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/)) {

	                this.$http.get('http://vimeo.com/api/oembed.json', { url: src }, { cache: 10 }).then(function (res) {
	                    this.imageSrc = res.data.thumbnail_url;
	                });
	            } else {

	                this.videoSrc = this.$url(src);
	            }
	        }

	    }

	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"uk-panel uk-placeholder uk-placeholder-large uk-text-center uk-visible-hover\" v-if=\"!video.data.src\">\n\n    <img width=\"60\" height=\"60\" :alt=\"'Placeholder Video' | trans\" :src=\"$url('app/system/assets/images/placeholder-video.svg')\">\n    <p class=\"uk-text-muted uk-margin-small-top\">{{ 'Add Video' | trans }}</p>\n\n    <a class=\"uk-position-cover\" @click.prevent=\"config\"></a>\n\n    <div class=\"uk-panel-badge pk-panel-badge uk-hidden\">\n        <ul class=\"uk-subnav pk-subnav-icon\">\n            <li><a class=\"pk-icon-delete pk-icon-hover\" :title=\"'Delete' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"remove\"></a></li>\n        </ul>\n    </div>\n\n</div>\n\n<div class=\"uk-overlay uk-overlay-hover uk-visible-hover\" v-else>\n\n    <img :src=\"imageSrc\" v-if=\"imageSrc\">\n    <video class=\"uk-responsive-width\" :src=\"videoSrc\" :width=\"width\" :height=\"height\" v-if=\"videoSrc\"></video>\n\n    <div class=\"uk-overlay-panel uk-overlay-background uk-overlay-fade\"></div>\n\n    <a class=\"uk-position-cover\" @click.prevent=\"config\"></a>\n\n    <div class=\"uk-panel-badge pk-panel-badge uk-hidden\">\n        <ul class=\"uk-subnav pk-subnav-icon\">\n            <li><a class=\"pk-icon-delete pk-icon-hover\" :title=\"'Delete' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"remove\"></a></li>\n        </ul>\n    </div>\n\n</div>\n\n";

/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * URL resolver plugin
	 */

	module.exports = {

	    plugin: true,

	    created: function () {

	        var editor = this.editor;

	        if (!editor || !editor.htmleditor) {
	            return;
	        }

	        editor.element.on('renderLate', function () {

	            editor.replaceInPreview(/src=["'](.+?)["']/gi, function (data) {

	                var replacement = data.matches[0];

	                if (!data.matches[1].match(/^(\/|http:|https:|ftp:)/i)) {
	                    replacement = replacement.replace(data.matches[1], Vue.url(data.matches[1], true));
	                }

	                return replacement;
	            });

	        });

	    }

	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(18)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app\\system\\modules\\editor\\app\\components\\image-picker.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(19)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\app\\system\\modules\\editor\\app\\components\\image-picker.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    data: function data() {
	        return {
	            image: { data: { src: '', alt: '' } }
	        };
	    },

	    ready: function ready() {

	        this.$refs.modal.open();

	        this.$on('image-selected', function (path) {

	            if (path && !this.image.data.alt) {

	                var alt = path.split('/').slice(-1)[0].replace(/\.(jpeg|jpg|png|svg|gif)$/i, '').replace(/(_|-)/g, ' ').trim(),
	                    first = alt.charAt(0).toUpperCase();

	                this.image.data.alt = first + alt.substr(1);
	            }
	        });
	    },

	    methods: {

	        close: function close() {
	            this.$destroy(true);
	        },

	        update: function update() {
	            this.$refs.modal.close();
	            this.$emit('select', this.image);
	        }

	    }

	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "\n\n<div>\n    <v-modal v-ref:modal :closed=\"close\">\n        <form class=\"uk-form uk-form-stacked\" @submit.prevent=\"update\">\n\n            <div class=\"uk-modal-header\">\n                <h2>{{ 'Add Image' | trans }}</h2>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <input-image :source.sync=\"image.data.src\"></input-image>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-src\" class=\"uk-form-label\">{{ 'URL' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-src\" class=\"uk-width-1-1\" type=\"text\" v-model=\"image.data.src\" lazy>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-alt\" class=\"uk-form-label\">{{ 'Alt' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-alt\" class=\"uk-width-1-1\" type=\"text\" v-model=\"image.data.alt\">\n                </div>\n            </div>\n\n            <div class=\"uk-modal-footer uk-text-right\">\n                <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                <button class=\"uk-button uk-button-link\" type=\"submit\">{{ 'Update' | trans }}</button>\n            </div>\n\n        </form>\n    </v-modal>\n</div>\n\n";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(21)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app\\system\\modules\\editor\\app\\components\\video-picker.vue: named exports in *.vue files are ignored.")}
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
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\app\\system\\modules\\editor\\app\\components\\video-picker.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    data: function data() {
	        return {
	            video: { data: { src: '', controls: true } }
	        };
	    },

	    ready: function ready() {
	        this.$refs.modal.open();
	    },

	    computed: {

	        isYoutube: function isYoutube() {
	            return this.video.data.src ? this.video.data.src.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/) : false;
	        },

	        isVimeo: function isVimeo() {
	            return this.video.data.src ? this.video.data.src.match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/) : false;
	        }

	    },

	    methods: {

	        close: function close() {
	            this.$destroy(true);
	        },

	        update: function update() {
	            this.$refs.modal.close();
	            this.$emit('select', this.video);
	        }

	    }

	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "\n\n<div>\n    <v-modal v-ref:modal :closed=\"close\">\n        <form class=\"uk-form uk-form-stacked\" @submit.prevent=\"update\">\n\n            <div class=\"uk-modal-header\">\n                <h2>{{ 'Add Video' | trans }}</h2>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <input-video :source.sync=\"video.data.src\"></input-video>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-src\" class=\"uk-form-label\">{{ 'URL' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-src\" class=\"uk-width-1-1\" type=\"text\" v-model=\"video.data.src\" debounce=\"500\">\n                </div>\n            </div>\n\n            <div class=\"uk-grid uk-grid-width-1-2 uk-form-row\">\n                <div>\n                    <label for=\"form-src\" class=\"uk-form-label\">{{ 'Width' | trans }}</label>\n                    <input class=\"uk-width-1-1\" id=\"form-width\" type=\"text\" :placeholder=\"'auto' | trans\" v-model=\"video.data.width\">\n                </div>\n                <div>\n                    <label for=\"form-src\" class=\"uk-form-label\">{{ 'Height' | trans }}</label>\n                    <input class=\"uk-width-1-1\" id=\"form-height\" type=\"text\" :disabled=\"!isVimeo && !isYoutube\" :placeholder=\"'auto' | trans\"v-model=\"video.data.height\">\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label><input type=\"checkbox\" v-model=\"video.data.autoplay\"> {{ 'Autoplay' | trans }}</label>\n                <label class=\"uk-margin-small-left\" v-show=\"!isVimeo\"><input type=\"checkbox\" v-model=\"video.data.controls\"> {{ 'Controls' | trans }}</label>\n                <label class=\"uk-margin-small-left\"><input type=\"checkbox\" v-model=\"video.data.loop\"> {{ 'Loop' | trans }}</label>\n                <label class=\"uk-margin-small-left\" v-show=\"!isVimeo && !isYoutube\"><input type=\"checkbox\" v-model=\"video.data.muted\"> {{ 'Muted' | trans }}</label>\n            </div>\n\n            <div class=\"uk-form-row\" v-show=\"!isYoutube && !isVimeo\">\n                <span class=\"uk-form-label\">{{ 'Poster Image' | trans }}</span>\n                <div class=\"uk-form-controls\">\n                    <input-image class=\"uk-width-1-1\" :source.sync=\"video.data.poster\"></input-image>\n                </div>\n            </div>\n\n            <div class=\"uk-modal-footer uk-text-right\">\n                <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                <button class=\"uk-button uk-button-link\" type=\"submit\">{{ 'Update' | trans }}</button>\n            </div>\n\n        </form>\n\n    </v-modal>\n</div>\n\n";

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(24)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app\\system\\modules\\editor\\app\\components\\link-picker.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(25)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\Matteo\\Desktop\\Code\\publicsandbox\\pagekit\\pagekit\\app\\system\\modules\\editor\\app\\components\\link-picker.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	    data: function data() {
	        return {
	            link: { link: '', txt: '', class: '' }
	        };
	    },

	    ready: function ready() {
	        this.$refs.modal.open();
	    },

	    methods: {

	        close: function close() {
	            this.$destroy(true);
	        },

	        update: function update() {
	            this.$refs.modal.close();
	            this.$emit('select', this.link);
	        }

	    }

	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "\n\n<div>\n    <v-modal v-ref:modal :closed=\"close\">\n        <form class=\"uk-form uk-form-stacked\" @submit.prevent=\"update\">\n\n            <div class=\"uk-modal-header\">\n                <h2>{{ 'Add Link' | trans }}</h2>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-link-title\" class=\"uk-form-label\">{{ 'Title' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-link-title\" class=\"uk-width-1-1\" type=\"text\" v-model=\"link.txt\">\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-link-url\" class=\"uk-form-label\">{{ 'Url' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input-link id=\"form-link-url\" class=\"uk-width-1-1\" :link.sync=\"link.link\"></input-link>\n                </div>\n            </div>\n\n            <div class=\"uk-modal-footer uk-text-right\">\n                <button class=\"uk-button uk-button-link uk-modal-close\" type=\"button\">{{ 'Cancel' | trans }}</button>\n                <button class=\"uk-button uk-button-link\" type=\"submit\">{{ 'Update' | trans }}</button>\n            </div>\n\n        </form>\n    </v-modal>\n</div>\n\n";

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "\n\n<div>\n    <textarea autocomplete=\"off\" :style=\"{height: height + 'px'}\" :class=\"{'uk-invisible': !show}\" v-el:editor v-model=\"value\"></textarea>\n</div>\n\n";

/***/ }
/******/ ]);