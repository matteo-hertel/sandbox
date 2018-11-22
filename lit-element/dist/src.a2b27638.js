// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"node_modules/lit-html/lib/directive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDirective = exports.directive = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive so that lit-html will call the function
 * during template rendering, rather than passing as a value.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object
 *
 * @example
 *
 * ```
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 * ```
 */

const directive = f => (...args) => {
  const d = f(...args);
  directives.set(d, true);
  return d;
};

exports.directive = directive;

const isDirective = o => typeof o === 'function' && directives.has(o);

exports.isDirective = isDirective;
},{}],"node_modules/lit-html/lib/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNodes = exports.reparentNodes = exports.isCEPolyfill = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isCEPolyfill = window.customElements !== undefined && window.customElements.polyfillWrapFlushCallback !== undefined;
/**
 * Reparents nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), into another container (could be the same container), before
 * `beforeNode`. If `beforeNode` is null, it appends the nodes to the
 * container.
 */

exports.isCEPolyfill = isCEPolyfill;

const reparentNodes = (container, start, end = null, before = null) => {
  let node = start;

  while (node !== end) {
    const n = node.nextSibling;
    container.insertBefore(node, before);
    node = n;
  }
};
/**
 * Removes nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), from `container`.
 */


exports.reparentNodes = reparentNodes;

const removeNodes = (container, startNode, endNode = null) => {
  let node = startNode;

  while (node !== endNode) {
    const n = node.nextSibling;
    container.removeChild(node);
    node = n;
  }
};

exports.removeNodes = removeNodes;
},{}],"node_modules/lit-html/lib/part.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noChange = void 0;

/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
exports.noChange = noChange;
},{}],"node_modules/lit-html/lib/template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastAttributeNameRegex = exports.createMarker = exports.isTemplatePartActive = exports.Template = exports.rewritesStyleAttribute = exports.markerRegex = exports.nodeMarker = exports.marker = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, not attribute positions,
 * in template.
 */

exports.marker = marker;
const nodeMarker = `<!--${marker}-->`;
exports.nodeMarker = nodeMarker;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
exports.markerRegex = markerRegex;

const rewritesStyleAttribute = (() => {
  const el = document.createElement('div');
  el.setAttribute('style', '{{bad value}}');
  return el.getAttribute('style') !== '{{bad value}}';
})();
/**
 * An updateable Template that tracks the location of dynamic parts.
 */


exports.rewritesStyleAttribute = rewritesStyleAttribute;

class Template {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    let index = -1;
    let partIndex = 0;
    const nodesToRemove = [];

    const _prepareTemplate = template => {
      const content = template.content; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
      // null

      const walker = document.createTreeWalker(content, 133
      /* NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT |
      NodeFilter.SHOW_TEXT */
      , null, false); // The actual previous node, accounting for removals: if a node is removed
      // it will never be the previousNode.

      let previousNode; // Used to set previousNode at the top of the loop.

      let currentNode;

      while (walker.nextNode()) {
        index++;
        previousNode = currentNode;
        const node = currentNode = walker.currentNode;

        if (node.nodeType === 1
        /* Node.ELEMENT_NODE */
        ) {
            if (node.hasAttributes()) {
              const attributes = node.attributes; // Per
              // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
              // attributes are not guaranteed to be returned in document order.
              // In particular, Edge/IE can return them out of order, so we cannot
              // assume a correspondance between part index and attribute index.

              let count = 0;

              for (let i = 0; i < attributes.length; i++) {
                if (attributes[i].value.indexOf(marker) >= 0) {
                  count++;
                }
              }

              while (count-- > 0) {
                // Get the template literal section leading up to the first
                // expression in this attribute
                const stringForPart = result.strings[partIndex]; // Find the attribute name

                const name = lastAttributeNameRegex.exec(stringForPart)[2]; // Find the corresponding attribute
                // If the attribute name contains special characters, lower-case
                // it so that on XML nodes with case-sensitive getAttribute() we
                // can still find the attribute, which will have been lower-cased
                // by the parser.
                //
                // If the attribute name doesn't contain special character, it's
                // important to _not_ lower-case it, in case the name is
                // case-sensitive, like with XML attributes like "viewBox".

                const attributeLookupName = rewritesStyleAttribute && name === 'style' ? 'style$' : /^[a-zA-Z-]*$/.test(name) ? name : name.toLowerCase();
                const attributeValue = node.getAttribute(attributeLookupName);
                const strings = attributeValue.split(markerRegex);
                this.parts.push({
                  type: 'attribute',
                  index,
                  name,
                  strings
                });
                node.removeAttribute(attributeLookupName);
                partIndex += strings.length - 1;
              }
            }

            if (node.tagName === 'TEMPLATE') {
              _prepareTemplate(node);
            }
          } else if (node.nodeType === 3
        /* Node.TEXT_NODE */
        ) {
            const nodeValue = node.nodeValue;

            if (nodeValue.indexOf(marker) < 0) {
              continue;
            }

            const parent = node.parentNode;
            const strings = nodeValue.split(markerRegex);
            const lastIndex = strings.length - 1; // We have a part for each match found

            partIndex += lastIndex; // Generate a new text node for each literal section
            // These nodes are also used as the markers for node parts

            for (let i = 0; i < lastIndex; i++) {
              parent.insertBefore(strings[i] === '' ? createMarker() : document.createTextNode(strings[i]), node);
              this.parts.push({
                type: 'node',
                index: index++
              });
            }

            parent.insertBefore(strings[lastIndex] === '' ? createMarker() : document.createTextNode(strings[lastIndex]), node);
            nodesToRemove.push(node);
          } else if (node.nodeType === 8
        /* Node.COMMENT_NODE */
        ) {
            if (node.nodeValue === marker) {
              const parent = node.parentNode; // Add a new marker node to be the startNode of the Part if any of
              // the following are true:
              //  * We don't have a previousSibling
              //  * previousSibling is being removed (thus it's not the
              //    `previousNode`)
              //  * previousSibling is not a Text node
              //
              // TODO(justinfagnani): We should be able to use the previousNode
              // here as the marker node and reduce the number of extra nodes we
              // add to a template. See
              // https://github.com/PolymerLabs/lit-html/issues/147

              const previousSibling = node.previousSibling;

              if (previousSibling === null || previousSibling !== previousNode || previousSibling.nodeType !== Node.TEXT_NODE) {
                parent.insertBefore(createMarker(), node);
              } else {
                index--;
              }

              this.parts.push({
                type: 'node',
                index: index++
              });
              nodesToRemove.push(node); // If we don't have a nextSibling add a marker node.
              // We don't have to check if the next node is going to be removed,
              // because that node will induce a new marker if so.

              if (node.nextSibling === null) {
                parent.insertBefore(createMarker(), node);
              } else {
                index--;
              }

              currentNode = previousNode;
              partIndex++;
            } else {
              let i = -1;

              while ((i = node.nodeValue.indexOf(marker, i + 1)) !== -1) {
                // Comment node has a binding marker inside, make an inactive part
                // The binding won't work, but subsequent bindings will
                // TODO (justinfagnani): consider whether it's even worth it to
                // make bindings in comments work
                this.parts.push({
                  type: 'node',
                  index: -1
                });
              }
            }
          }
      }
    };

    _prepareTemplate(element); // Remove text binding nodes after the walk to not disturb the TreeWalker


    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }

}

exports.Template = Template;

const isTemplatePartActive = part => part.index !== -1; // Allows `document.createComment('')` to be renamed for a
// small manual size-savings.


exports.isTemplatePartActive = isTemplatePartActive;

const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#attributes-0
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-character
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */


exports.createMarker = createMarker;
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
exports.lastAttributeNameRegex = lastAttributeNameRegex;
},{}],"node_modules/lit-html/lib/template-instance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateInstance = void 0;

var _dom = require("./dom.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
  constructor(template, processor, options) {
    this._parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }

  update(values) {
    let i = 0;

    for (const part of this._parts) {
      if (part !== undefined) {
        part.setValue(values[i]);
      }

      i++;
    }

    for (const part of this._parts) {
      if (part !== undefined) {
        part.commit();
      }
    }
  }

  _clone() {
    // When using the Custom Elements polyfill, clone the node, rather than
    // importing it, to keep the fragment in the template's document. This
    // leaves the fragment inert so custom elements won't upgrade and
    // potentially modify their contents by creating a polyfilled ShadowRoot
    // while we traverse the tree.
    const fragment = _dom.isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const parts = this.template.parts;
    let partIndex = 0;
    let nodeIndex = 0;

    const _prepareInstance = fragment => {
      // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
      // null
      const walker = document.createTreeWalker(fragment, 133
      /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
      , null, false);
      let node = walker.nextNode(); // Loop through all the nodes and parts of a template

      while (partIndex < parts.length && node !== null) {
        const part = parts[partIndex]; // Consecutive Parts may have the same node index, in the case of
        // multiple bound attributes on an element. So each iteration we either
        // increment the nodeIndex, if we aren't on a node with a part, or the
        // partIndex if we are. By not incrementing the nodeIndex when we find a
        // part, we allow for the next part to be associated with the current
        // node if neccessasry.

        if (!(0, _template.isTemplatePartActive)(part)) {
          this._parts.push(undefined);

          partIndex++;
        } else if (nodeIndex === part.index) {
          if (part.type === 'node') {
            const part = this.processor.handleTextExpression(this.options);
            part.insertAfterNode(node);

            this._parts.push(part);
          } else {
            this._parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
          }

          partIndex++;
        } else {
          nodeIndex++;

          if (node.nodeName === 'TEMPLATE') {
            _prepareInstance(node.content);
          }

          node = walker.nextNode();
        }
      }
    };

    _prepareInstance(fragment);

    if (_dom.isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }

    return fragment;
  }

}

exports.TemplateInstance = TemplateInstance;
},{"./dom.js":"node_modules/lit-html/lib/dom.js","./template.js":"node_modules/lit-html/lib/template.js"}],"node_modules/lit-html/lib/template-result.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVGTemplateResult = exports.TemplateResult = void 0;

var _dom = require("./dom.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  /**
   * Returns a string of HTML used to create a `<template>` element.
   */


  getHTML() {
    const l = this.strings.length - 1;
    let html = '';
    let isTextBinding = true;

    for (let i = 0; i < l; i++) {
      const s = this.strings[i];
      html += s;
      const close = s.lastIndexOf('>'); // We're in a text position if the previous string closed its last tag, an
      // attribute position if the string opened an unclosed tag, and unchanged
      // if the string had no brackets at all:
      //
      // "...>...": text position. open === -1, close > -1
      // "...<...": attribute position. open > -1
      // "...": no change. open === -1, close === -1

      isTextBinding = (close > -1 || isTextBinding) && s.indexOf('<', close + 1) === -1;

      if (!isTextBinding && _template.rewritesStyleAttribute) {
        html = html.replace(_template.lastAttributeNameRegex, (match, p1, p2, p3) => {
          return p2 === 'style' ? `${p1}style$${p3}` : match;
        });
      }

      html += isTextBinding ? _template.nodeMarker : _template.marker;
    }

    html += this.strings[l];
    return html;
  }

  getTemplateElement() {
    const template = document.createElement('template');
    template.innerHTML = this.getHTML();
    return template;
  }

}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTMl in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */


exports.TemplateResult = TemplateResult;

class SVGTemplateResult extends TemplateResult {
  getHTML() {
    return `<svg>${super.getHTML()}</svg>`;
  }

  getTemplateElement() {
    const template = super.getTemplateElement();
    const content = template.content;
    const svgElement = content.firstChild;
    content.removeChild(svgElement);
    (0, _dom.reparentNodes)(content, svgElement.firstChild);
    return template;
  }

}

exports.SVGTemplateResult = SVGTemplateResult;
},{"./dom.js":"node_modules/lit-html/lib/dom.js","./template.js":"node_modules/lit-html/lib/template.js"}],"node_modules/lit-html/lib/parts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventPart = exports.PropertyPart = exports.PropertyCommitter = exports.BooleanAttributePart = exports.NodePart = exports.AttributePart = exports.AttributeCommitter = exports.isPrimitive = void 0;

var _directive = require("./directive.js");

var _dom = require("./dom.js");

var _part = require("./part.js");

var _templateInstance = require("./template-instance.js");

var _templateResult = require("./template-result.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = value => value === null || !(typeof value === 'object' || typeof value === 'function');
/**
 * Sets attribute values for AttributeParts, so that the value is only set once
 * even if there are multiple parts for an attribute.
 */


exports.isPrimitive = isPrimitive;

class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];

    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  /**
   * Creates a single part. Override this to create a differnt type of part.
   */


  _createPart() {
    return new AttributePart(this);
  }

  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    let text = '';

    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = this.parts[i];

      if (part !== undefined) {
        const v = part.value;

        if (v != null && (Array.isArray(v) || typeof v !== 'string' && v[Symbol.iterator])) {
          for (const t of v) {
            text += typeof t === 'string' ? t : String(t);
          }
        } else {
          text += typeof v === 'string' ? v : String(v);
        }
      }
    }

    text += strings[l];
    return text;
  }

  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }

}

exports.AttributeCommitter = AttributeCommitter;

class AttributePart {
  constructor(comitter) {
    this.value = undefined;
    this.committer = comitter;
  }

  setValue(value) {
    if (value !== _part.noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value; // If the value is a not a directive, dirty the committer so that it'll
      // call setAttribute. If the value is a directive, it'll dirty the
      // committer if it calls setValue().

      if (!(0, _directive.isDirective)(value)) {
        this.committer.dirty = true;
      }
    }
  }

  commit() {
    while ((0, _directive.isDirective)(this.value)) {
      const directive = this.value;
      this.value = _part.noChange;
      directive(this);
    }

    if (this.value === _part.noChange) {
      return;
    }

    this.committer.commit();
  }

}

exports.AttributePart = AttributePart;

class NodePart {
  constructor(options) {
    this.value = undefined;
    this._pendingValue = undefined;
    this.options = options;
  }
  /**
   * Inserts this part into a container.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendInto(container) {
    this.startNode = container.appendChild((0, _template.createMarker)());
    this.endNode = container.appendChild((0, _template.createMarker)());
  }
  /**
   * Inserts this part between `ref` and `ref`'s next sibling. Both `ref` and
   * its next sibling must be static, unchanging nodes such as those that appear
   * in a literal section of a template.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  /**
   * Appends this part into a parent part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendIntoPart(part) {
    part._insert(this.startNode = (0, _template.createMarker)());

    part._insert(this.endNode = (0, _template.createMarker)());
  }
  /**
   * Appends this part after `ref`
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterPart(ref) {
    ref._insert(this.startNode = (0, _template.createMarker)());

    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }

  setValue(value) {
    this._pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this._pendingValue)) {
      const directive = this._pendingValue;
      this._pendingValue = _part.noChange;
      directive(this);
    }

    const value = this._pendingValue;

    if (value === _part.noChange) {
      return;
    }

    if (isPrimitive(value)) {
      if (value !== this.value) {
        this._commitText(value);
      }
    } else if (value instanceof _templateResult.TemplateResult) {
      this._commitTemplateResult(value);
    } else if (value instanceof Node) {
      this._commitNode(value);
    } else if (Array.isArray(value) || value[Symbol.iterator]) {
      this._commitIterable(value);
    } else if (value.then !== undefined) {
      this._commitPromise(value);
    } else {
      // Fallback, will render the string representation
      this._commitText(value);
    }
  }

  _insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }

  _commitNode(value) {
    if (this.value === value) {
      return;
    }

    this.clear();

    this._insert(value);

    this.value = value;
  }

  _commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? '' : value;

    if (node === this.endNode.previousSibling && node.nodeType === Node.TEXT_NODE) {
      // If we only have a single text node between the markers, we can just
      // set its value, rather than replacing it.
      // TODO(justinfagnani): Can we just check if this.value is primitive?
      node.textContent = value;
    } else {
      this._commitNode(document.createTextNode(typeof value === 'string' ? value : String(value)));
    }

    this.value = value;
  }

  _commitTemplateResult(value) {
    const template = this.options.templateFactory(value);

    if (this.value && this.value.template === template) {
      this.value.update(value.values);
    } else {
      // Make sure we propagate the template processor from the TemplateResult
      // so that we use its syntax extension, etc. The template factory comes
      // from the render function options so that it can control template
      // caching and preprocessing.
      const instance = new _templateInstance.TemplateInstance(template, value.processor, this.options);

      const fragment = instance._clone();

      instance.update(value.values);

      this._commitNode(fragment);

      this.value = instance;
    }
  }

  _commitIterable(value) {
    // For an Iterable, we create a new InstancePart per item, then set its
    // value to the item. This is a little bit of overhead for every item in
    // an Iterable, but it lets us recurse easily and efficiently update Arrays
    // of TemplateResults that will be commonly returned from expressions like:
    // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
    // If _value is an array, then the previous render was of an
    // iterable and _value will contain the NodeParts from the previous
    // render. If _value is not an array, clear this part and make a new
    // array for NodeParts.
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    } // Lets us keep track of how many items we stamped so we can clear leftover
    // items from a previous render


    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;

    for (const item of value) {
      // Try to reuse an existing part
      itemPart = itemParts[partIndex]; // If no existing part, create a new one

      if (itemPart === undefined) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);

        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }

      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }

    if (partIndex < itemParts.length) {
      // Truncate the parts array so _value reflects the current state
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }

  _commitPromise(value) {
    this.value = value;
    value.then(v => {
      if (this.value === value) {
        this.setValue(v);
        this.commit();
      }
    });
  }

  clear(startNode = this.startNode) {
    (0, _dom.removeNodes)(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }

}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */


exports.NodePart = NodePart;

class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = undefined;
    this._pendingValue = undefined;

    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
      throw new Error('Boolean attributes can only contain a single expression');
    }

    this.element = element;
    this.name = name;
    this.strings = strings;
  }

  setValue(value) {
    this._pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this._pendingValue)) {
      const directive = this._pendingValue;
      this._pendingValue = _part.noChange;
      directive(this);
    }

    if (this._pendingValue === _part.noChange) {
      return;
    }

    const value = !!this._pendingValue;

    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, '');
      } else {
        this.element.removeAttribute(this.name);
      }
    }

    this.value = value;
    this._pendingValue = _part.noChange;
  }

}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */


exports.BooleanAttributePart = BooleanAttributePart;

class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
  }

  _createPart() {
    return new PropertyPart(this);
  }

  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }

    return super._getValue();
  }

  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element[this.name] = this._getValue();
    }
  }

}

exports.PropertyCommitter = PropertyCommitter;

class PropertyPart extends AttributePart {} // Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the thrid
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.


exports.PropertyPart = PropertyPart;
let eventOptionsSupported = false;

try {
  const options = {
    get capture() {
      eventOptionsSupported = true;
      return false;
    }

  };
  window.addEventListener('test', options, options);
  window.removeEventListener('test', options, options);
} catch (_e) {}

class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = undefined;
    this._pendingValue = undefined;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;

    this._boundHandleEvent = e => this.handleEvent(e);
  }

  setValue(value) {
    this._pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this._pendingValue)) {
      const directive = this._pendingValue;
      this._pendingValue = _part.noChange;
      directive(this);
    }

    if (this._pendingValue === _part.noChange) {
      return;
    }

    const newListener = this._pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this._boundHandleEvent, this._options);
    }

    this._options = getOptions(newListener);

    if (shouldAddListener) {
      this.element.addEventListener(this.eventName, this._boundHandleEvent, this._options);
    }

    this.value = newListener;
    this._pendingValue = _part.noChange;
  }

  handleEvent(event) {
    if (typeof this.value === 'function') {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }

} // We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.


exports.EventPart = EventPart;

const getOptions = o => o && (eventOptionsSupported ? {
  capture: o.capture,
  passive: o.passive,
  once: o.once
} : o.capture);
},{"./directive.js":"node_modules/lit-html/lib/directive.js","./dom.js":"node_modules/lit-html/lib/dom.js","./part.js":"node_modules/lit-html/lib/part.js","./template-instance.js":"node_modules/lit-html/lib/template-instance.js","./template-result.js":"node_modules/lit-html/lib/template-result.js","./template.js":"node_modules/lit-html/lib/template.js"}],"node_modules/lit-html/lib/default-template-processor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTemplateProcessor = exports.DefaultTemplateProcessor = void 0;

var _parts = require("./parts.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
  /**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];

    if (prefix === '.') {
      const comitter = new _parts.PropertyCommitter(element, name.slice(1), strings);
      return comitter.parts;
    }

    if (prefix === '@') {
      return [new _parts.EventPart(element, name.slice(1), options.eventContext)];
    }

    if (prefix === '?') {
      return [new _parts.BooleanAttributePart(element, name.slice(1), strings)];
    }

    const comitter = new _parts.AttributeCommitter(element, name, strings);
    return comitter.parts;
  }
  /**
   * Create parts for a text-position binding.
   * @param templateFactory
   */


  handleTextExpression(options) {
    return new _parts.NodePart(options);
  }

}

exports.DefaultTemplateProcessor = DefaultTemplateProcessor;
const defaultTemplateProcessor = new DefaultTemplateProcessor();
exports.defaultTemplateProcessor = defaultTemplateProcessor;
},{"./parts.js":"node_modules/lit-html/lib/parts.js"}],"node_modules/lit-html/lib/template-factory.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateFactory = templateFactory;
exports.templateCaches = void 0;

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);

  if (templateCache === undefined) {
    templateCache = new Map();
    templateCaches.set(result.type, templateCache);
  }

  let template = templateCache.get(result.strings);

  if (template === undefined) {
    template = new _template.Template(result, result.getTemplateElement());
    templateCache.set(result.strings, template);
  }

  return template;
} // The first argument to JS template tags retain identity across multiple
// calls to a tag for the same literal, so we can cache work done per literal
// in a Map.


const templateCaches = new Map();
exports.templateCaches = templateCaches;
},{"./template.js":"node_modules/lit-html/lib/template.js"}],"node_modules/lit-html/lib/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.parts = void 0;

var _dom = require("./dom.js");

var _parts = require("./parts.js");

var _templateFactory = require("./template-factory.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = new WeakMap();
/**
 * Renders a template to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result a TemplateResult created by evaluating a template tag like
 *     `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */

exports.parts = parts;

const render = (result, container, options) => {
  let part = parts.get(container);

  if (part === undefined) {
    (0, _dom.removeNodes)(container, container.firstChild);
    parts.set(container, part = new _parts.NodePart(Object.assign({
      templateFactory: _templateFactory.templateFactory
    }, options)));
    part.appendInto(container);
  }

  part.setValue(result);
  part.commit();
};

exports.render = render;
},{"./dom.js":"node_modules/lit-html/lib/dom.js","./parts.js":"node_modules/lit-html/lib/parts.js","./template-factory.js":"node_modules/lit-html/lib/template-factory.js"}],"node_modules/lit-html/lit-html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DefaultTemplateProcessor", {
  enumerable: true,
  get: function () {
    return _defaultTemplateProcessor.DefaultTemplateProcessor;
  }
});
Object.defineProperty(exports, "defaultTemplateProcessor", {
  enumerable: true,
  get: function () {
    return _defaultTemplateProcessor.defaultTemplateProcessor;
  }
});
Object.defineProperty(exports, "SVGTemplateResult", {
  enumerable: true,
  get: function () {
    return _templateResult.SVGTemplateResult;
  }
});
Object.defineProperty(exports, "TemplateResult", {
  enumerable: true,
  get: function () {
    return _templateResult.TemplateResult;
  }
});
Object.defineProperty(exports, "directive", {
  enumerable: true,
  get: function () {
    return _directive.directive;
  }
});
Object.defineProperty(exports, "isDirective", {
  enumerable: true,
  get: function () {
    return _directive.isDirective;
  }
});
Object.defineProperty(exports, "removeNodes", {
  enumerable: true,
  get: function () {
    return _dom.removeNodes;
  }
});
Object.defineProperty(exports, "reparentNodes", {
  enumerable: true,
  get: function () {
    return _dom.reparentNodes;
  }
});
Object.defineProperty(exports, "noChange", {
  enumerable: true,
  get: function () {
    return _part.noChange;
  }
});
Object.defineProperty(exports, "AttributeCommitter", {
  enumerable: true,
  get: function () {
    return _parts.AttributeCommitter;
  }
});
Object.defineProperty(exports, "AttributePart", {
  enumerable: true,
  get: function () {
    return _parts.AttributePart;
  }
});
Object.defineProperty(exports, "BooleanAttributePart", {
  enumerable: true,
  get: function () {
    return _parts.BooleanAttributePart;
  }
});
Object.defineProperty(exports, "EventPart", {
  enumerable: true,
  get: function () {
    return _parts.EventPart;
  }
});
Object.defineProperty(exports, "isPrimitive", {
  enumerable: true,
  get: function () {
    return _parts.isPrimitive;
  }
});
Object.defineProperty(exports, "NodePart", {
  enumerable: true,
  get: function () {
    return _parts.NodePart;
  }
});
Object.defineProperty(exports, "PropertyCommitter", {
  enumerable: true,
  get: function () {
    return _parts.PropertyCommitter;
  }
});
Object.defineProperty(exports, "PropertyPart", {
  enumerable: true,
  get: function () {
    return _parts.PropertyPart;
  }
});
Object.defineProperty(exports, "parts", {
  enumerable: true,
  get: function () {
    return _render.parts;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return _render.render;
  }
});
Object.defineProperty(exports, "templateCaches", {
  enumerable: true,
  get: function () {
    return _templateFactory.templateCaches;
  }
});
Object.defineProperty(exports, "templateFactory", {
  enumerable: true,
  get: function () {
    return _templateFactory.templateFactory;
  }
});
Object.defineProperty(exports, "TemplateInstance", {
  enumerable: true,
  get: function () {
    return _templateInstance.TemplateInstance;
  }
});
Object.defineProperty(exports, "createMarker", {
  enumerable: true,
  get: function () {
    return _template.createMarker;
  }
});
Object.defineProperty(exports, "isTemplatePartActive", {
  enumerable: true,
  get: function () {
    return _template.isTemplatePartActive;
  }
});
Object.defineProperty(exports, "Template", {
  enumerable: true,
  get: function () {
    return _template.Template;
  }
});
exports.svg = exports.html = void 0;

var _defaultTemplateProcessor = require("./lib/default-template-processor.js");

var _templateResult = require("./lib/template-result.js");

var _directive = require("./lib/directive.js");

var _dom = require("./lib/dom.js");

var _part = require("./lib/part.js");

var _parts = require("./lib/parts.js");

var _render = require("./lib/render.js");

var _templateFactory = require("./lib/template-factory.js");

var _templateInstance = require("./lib/template-instance.js");

var _template = require("./lib/template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// TODO(justinfagnani): remove line when we get NodePart moving methods

/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new _templateResult.TemplateResult(strings, values, 'html', _defaultTemplateProcessor.defaultTemplateProcessor);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */


exports.html = html;

const svg = (strings, ...values) => new _templateResult.SVGTemplateResult(strings, values, 'svg', _defaultTemplateProcessor.defaultTemplateProcessor);

exports.svg = svg;
},{"./lib/default-template-processor.js":"node_modules/lit-html/lib/default-template-processor.js","./lib/template-result.js":"node_modules/lit-html/lib/template-result.js","./lib/directive.js":"node_modules/lit-html/lib/directive.js","./lib/dom.js":"node_modules/lit-html/lib/dom.js","./lib/part.js":"node_modules/lit-html/lib/part.js","./lib/parts.js":"node_modules/lit-html/lib/parts.js","./lib/render.js":"node_modules/lit-html/lib/render.js","./lib/template-factory.js":"node_modules/lit-html/lib/template-factory.js","./lib/template-instance.js":"node_modules/lit-html/lib/template-instance.js","./lib/template.js":"node_modules/lit-html/lib/template.js"}],"node_modules/lit-html/lib/modify-template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNodesFromTemplate = removeNodesFromTemplate;
exports.insertNodeIntoTemplate = insertNodeIntoTemplate;

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const walkerNodeFilter = NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */

function removeNodesFromTemplate(template, nodesToRemove) {
  const {
    element: {
      content
    },
    parts
  } = template;
  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts);
  let part = parts[partIndex];
  let nodeIndex = -1;
  let removeCount = 0;
  const nodesToRemoveInTemplate = [];
  let currentRemovingNode = null;

  while (walker.nextNode()) {
    nodeIndex++;
    const node = walker.currentNode; // End removal if stepped past the removing node

    if (node.previousSibling === currentRemovingNode) {
      currentRemovingNode = null;
    } // A node to remove was found in the template


    if (nodesToRemove.has(node)) {
      nodesToRemoveInTemplate.push(node); // Track node we're removing

      if (currentRemovingNode === null) {
        currentRemovingNode = node;
      }
    } // When removing, increment count by which to adjust subsequent part indices


    if (currentRemovingNode !== null) {
      removeCount++;
    }

    while (part !== undefined && part.index === nodeIndex) {
      // If part is in a removed node deactivate it by setting index to -1 or
      // adjust the index as needed.
      part.index = currentRemovingNode !== null ? -1 : part.index - removeCount; // go to the next active part.

      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
      part = parts[partIndex];
    }
  }

  nodesToRemoveInTemplate.forEach(n => n.parentNode.removeChild(n));
}

const countNodes = node => {
  let count = node.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? 0 : 1;
  const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);

  while (walker.nextNode()) {
    count++;
  }

  return count;
};

const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
  for (let i = startIndex + 1; i < parts.length; i++) {
    const part = parts[i];

    if ((0, _template.isTemplatePartActive)(part)) {
      return i;
    }
  }

  return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */


function insertNodeIntoTemplate(template, node, refNode = null) {
  const {
    element: {
      content
    },
    parts
  } = template; // If there's no refNode, then put node at end of template.
  // No part indices need to be shifted in this case.

  if (refNode === null || refNode === undefined) {
    content.appendChild(node);
    return;
  }

  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts);
  let insertCount = 0;
  let walkerIndex = -1;

  while (walker.nextNode()) {
    walkerIndex++;
    const walkerNode = walker.currentNode;

    if (walkerNode === refNode) {
      insertCount = countNodes(node);
      refNode.parentNode.insertBefore(node, refNode);
    }

    while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
      // If we've inserted the node, simply adjust all subsequent parts
      if (insertCount > 0) {
        while (partIndex !== -1) {
          parts[partIndex].index += insertCount;
          partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }

        return;
      }

      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
    }
  }
}
},{"./template.js":"node_modules/lit-html/lib/template.js"}],"node_modules/lit-html/lib/shady-render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _litHtml.html;
  }
});
Object.defineProperty(exports, "svg", {
  enumerable: true,
  get: function () {
    return _litHtml.svg;
  }
});
Object.defineProperty(exports, "TemplateResult", {
  enumerable: true,
  get: function () {
    return _litHtml.TemplateResult;
  }
});
exports.render = void 0;

var _modifyTemplate = require("./modify-template.js");

var _render = require("./render.js");

var _templateFactory = require("./template-factory.js");

var _templateResult = require("./template-result.js");

var _template = require("./template.js");

var _litHtml = require("../lit-html.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;

let compatibleShadyCSSVersion = true;

if (typeof window.ShadyCSS === 'undefined') {
  compatibleShadyCSSVersion = false;
} else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
  console.warn(`Incompatible ShadyCSS version detected.` + `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and` + `@webcomponents/shadycss@1.3.1.`);
  compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */


const shadyTemplateFactory = scopeName => result => {
  const cacheKey = getTemplateCacheKey(result.type, scopeName);

  let templateCache = _templateFactory.templateCaches.get(cacheKey);

  if (templateCache === undefined) {
    templateCache = new Map();

    _templateFactory.templateCaches.set(cacheKey, templateCache);
  }

  let template = templateCache.get(result.strings);

  if (template === undefined) {
    const element = result.getTemplateElement();

    if (compatibleShadyCSSVersion) {
      window.ShadyCSS.prepareTemplateDom(element, scopeName);
    }

    template = new _template.Template(result, element);
    templateCache.set(result.strings, template);
  }

  return template;
};

const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */

const removeStylesFromLitTemplates = scopeName => {
  TEMPLATE_TYPES.forEach(type => {
    const templates = _templateFactory.templateCaches.get(getTemplateCacheKey(type, scopeName));

    if (templates !== undefined) {
      templates.forEach(template => {
        const {
          element: {
            content
          }
        } = template; // IE 11 doesn't support the iterable param Set constructor

        const styles = new Set();
        Array.from(content.querySelectorAll('style')).forEach(s => {
          styles.add(s);
        });
        (0, _modifyTemplate.removeNodesFromTemplate)(template, styles);
      });
    }
  });
};

const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */

const prepareTemplateStyles = (renderedDOM, template, scopeName) => {
  shadyRenderSet.add(scopeName); // Move styles out of rendered DOM and store.

  const styles = renderedDOM.querySelectorAll('style'); // If there are no styles, there's no work to do.

  if (styles.length === 0) {
    return;
  }

  const condensedStyle = document.createElement('style'); // Collect styles into a single style. This helps us make sure ShadyCSS
  // manipulations will not prevent us from being able to fix up template
  // part indices.
  // NOTE: collecting styles is inefficient for browsers but ShadyCSS
  // currently does this anyway. When it does not, this should be changed.

  for (let i = 0; i < styles.length; i++) {
    const style = styles[i];
    style.parentNode.removeChild(style);
    condensedStyle.textContent += style.textContent;
  } // Remove styles from nested templates in this scope.


  removeStylesFromLitTemplates(scopeName); // And then put the condensed style into the "root" template passed in as
  // `template`.

  (0, _modifyTemplate.insertNodeIntoTemplate)(template, condensedStyle, template.element.content.firstChild); // Note, it's important that ShadyCSS gets the template that `lit-html`
  // will actually render so that it can update the style inside when
  // needed (e.g. @apply native Shadow DOM case).

  window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);

  if (window.ShadyCSS.nativeShadow) {
    // When in native Shadow DOM, re-add styling to rendered content using
    // the style ShadyCSS produced.
    const style = template.element.content.querySelector('style');
    renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
  } else {
    // When not in native Shadow DOM, at this point ShadyCSS will have
    // removed the style from the lit template and parts will be broken as a
    // result. To fix this, we put back the style node ShadyCSS removed
    // and then tell lit to remove that node from the template.
    // NOTE, ShadyCSS creates its own style so we can safely add/remove
    // `condensedStyle` here.
    template.element.content.insertBefore(condensedStyle, template.element.content.firstChild);
    const removes = new Set();
    removes.add(condensedStyle);
    (0, _modifyTemplate.removeNodesFromTemplate)(template, removes);
  }
};

const render = (result, container, options) => {
  const scopeName = options.scopeName;

  const hasRendered = _render.parts.has(container);

  (0, _render.render)(result, container, Object.assign({
    templateFactory: shadyTemplateFactory(scopeName)
  }, options)); // When rendering a TemplateResult, scope the template with ShadyCSS

  if (container instanceof ShadowRoot && compatibleShadyCSSVersion && result instanceof _templateResult.TemplateResult) {
    // Scope the element template one time only for this scope.
    if (!shadyRenderSet.has(scopeName)) {
      const part = _render.parts.get(container);

      const instance = part.value;
      prepareTemplateStyles(container, instance.template, scopeName);
    } // Update styling if this is the initial render to this container.


    if (!hasRendered) {
      window.ShadyCSS.styleElement(container.host);
    }
  }
};

exports.render = render;
},{"./modify-template.js":"node_modules/lit-html/lib/modify-template.js","./render.js":"node_modules/lit-html/lib/render.js","./template-factory.js":"node_modules/lit-html/lib/template-factory.js","./template-result.js":"node_modules/lit-html/lib/template-result.js","./template.js":"node_modules/lit-html/lib/template.js","../lit-html.js":"node_modules/lit-html/lit-html.js"}],"node_modules/@polymer/lit-element/lib/updating-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdatingElement = exports.notEqual = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// serializer/deserializers for boolean attribute
const fromBooleanAttribute = value => value !== null;

const toBooleanAttribute = value => value ? '' : null;
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */


const notEqual = (value, old) => {
  // This ensures (old==NaN, value==NaN) always returns false
  return old !== value && (old === old || value === value);
};

exports.notEqual = notEqual;
const defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  reflect: false,
  hasChanged: notEqual
};
const microtaskPromise = new Promise(resolve => resolve(true));
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING = 1 << 3;
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 */

class UpdatingElement extends HTMLElement {
  constructor() {
    super();
    this._updateState = 0;
    this._instanceProperties = undefined;
    this._updatePromise = microtaskPromise;
    /**
     * Map with keys for any properties that have changed since the last
     * update cycle with previous values.
     */

    this._changedProperties = new Map();
    /**
     * Map with keys of properties that should be reflected when updated.
     */

    this._reflectingProperties = undefined;
    this.initialize();
  }
  /**
   * Returns a list of attributes corresponding to the registered properties.
   */


  static get observedAttributes() {
    // note: piggy backing on this to ensure we're _finalized.
    this._finalize();

    const attributes = [];

    for (const [p, v] of this._classProperties) {
      const attr = this._attributeNameForProperty(p, v);

      if (attr !== undefined) {
        this._attributeToPropertyMap.set(attr, p);

        attributes.push(attr);
      }
    }

    return attributes;
  }
  /**
   * Creates a property accessor on the element prototype if one does not exist.
   * The property setter calls the property's `hasChanged` property option
   * or uses a strict identity check to determine whether or not to request
   * an update.
   */


  static createProperty(name, options = defaultPropertyDeclaration) {
    // ensure private storage for property declarations.
    if (!this.hasOwnProperty('_classProperties')) {
      this._classProperties = new Map(); // NOTE: Workaround IE11 not supporting Map constructor argument.

      const superProperties = Object.getPrototypeOf(this)._classProperties;

      if (superProperties !== undefined) {
        superProperties.forEach((v, k) => this._classProperties.set(k, v));
      }
    }

    this._classProperties.set(name, options); // Allow user defined accessors by not replacing an existing own-property
    // accessor.


    if (this.prototype.hasOwnProperty(name)) {
      return;
    }

    const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
    Object.defineProperty(this.prototype, name, {
      get() {
        return this[key];
      },

      set(value) {
        const oldValue = this[name];
        this[key] = value;

        this._requestPropertyUpdate(name, oldValue, options);
      },

      configurable: true,
      enumerable: true
    });
  }
  /**
   * Creates property accessors for registered properties and ensures
   * any superclasses are also finalized.
   */


  static _finalize() {
    if (this.hasOwnProperty('_finalized') && this._finalized) {
      return;
    } // finalize any superclasses


    const superCtor = Object.getPrototypeOf(this);

    if (typeof superCtor._finalize === 'function') {
      superCtor._finalize();
    }

    this._finalized = true; // initialize Map populated in observedAttributes

    this._attributeToPropertyMap = new Map(); // make any properties

    const props = this.properties; // support symbols in properties (IE11 does not support this)

    const propKeys = [...Object.getOwnPropertyNames(props), ...(typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : [])];

    for (const p of propKeys) {
      // note, use of `any` is due to TypeSript lack of support for symbol in
      // index types
      this.createProperty(p, props[p]);
    }
  }
  /**
   * Returns the property name for the given attribute `name`.
   */


  static _attributeNameForProperty(name, options) {
    const attribute = options !== undefined && options.attribute;
    return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
  }
  /**
   * Returns true if a property should request an update.
   * Called when a property value is set and uses the `hasChanged`
   * option for the property if present or a strict identity check.
   */


  static _valueHasChanged(value, old, hasChanged = notEqual) {
    return hasChanged(value, old);
  }
  /**
   * Returns the property value for the given attribute value.
   * Called via the `attributeChangedCallback` and uses the property's `type`
   * or `type.fromAttribute` property option.
   */


  static _propertyValueFromAttribute(value, options) {
    const type = options && options.type;

    if (type === undefined) {
      return value;
    } // Note: special case `Boolean` so users can use it as a `type`.


    const fromAttribute = type === Boolean ? fromBooleanAttribute : typeof type === 'function' ? type : type.fromAttribute;
    return fromAttribute ? fromAttribute(value) : value;
  }
  /**
   * Returns the attribute value for the given property value. If this
   * returns undefined, the property will *not* be reflected to an attribute.
   * If this returns null, the attribute will be removed, otherwise the
   * attribute will be set to the value.
   * This uses the property's `reflect` and `type.toAttribute` property options.
   */


  static _propertyValueToAttribute(value, options) {
    if (options === undefined || options.reflect === undefined) {
      return;
    } // Note: special case `Boolean` so users can use it as a `type`.


    const toAttribute = options.type === Boolean ? toBooleanAttribute : options.type && options.type.toAttribute || String;
    return toAttribute(value);
  }
  /**
   * Performs element initialization. By default this calls `createRenderRoot`
   * to create the element `renderRoot` node and captures any pre-set values for
   * registered properties.
   */


  initialize() {
    this.renderRoot = this.createRenderRoot();

    this._saveInstanceProperties();
  }
  /**
   * Fixes any properties set on the instance before upgrade time.
   * Otherwise these would shadow the accessor and break these properties.
   * The properties are stored in a Map which is played back after the
   * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
   * (<=41), properties created for native platform properties like (`id` or
   * `name`) may not have default values set in the element constructor. On
   * these browsers native properties appear on instances and therefore their
   * default value will overwrite any element default (e.g. if the element sets
   * this.id = 'id' in the constructor, the 'id' will become '' since this is
   * the native platform default).
   */


  _saveInstanceProperties() {
    for (const [p] of this.constructor._classProperties) {
      if (this.hasOwnProperty(p)) {
        const value = this[p];
        delete this[p];

        if (!this._instanceProperties) {
          this._instanceProperties = new Map();
        }

        this._instanceProperties.set(p, value);
      }
    }
  }
  /**
   * Applies previously saved instance properties.
   */


  _applyInstanceProperties() {
    for (const [p, v] of this._instanceProperties) {
      this[p] = v;
    }

    this._instanceProperties = undefined;
  }
  /**
   * Returns the node into which the element should render and by default
   * creates and returns an open shadowRoot. Implement to customize where the
   * element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   * @returns {Element|DocumentFragment} Returns a node into which to render.
   */


  createRenderRoot() {
    return this.attachShadow({
      mode: 'open'
    });
  }
  /**
   * Uses ShadyCSS to keep element DOM updated.
   */


  connectedCallback() {
    if (this._updateState & STATE_HAS_UPDATED) {
      if (window.ShadyCSS !== undefined) {
        window.ShadyCSS.styleElement(this);
      }
    } else {
      this.requestUpdate();
    }
  }
  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   */


  disconnectedCallback() {}
  /**
   * Synchronizes property values when attributes change.
   */


  attributeChangedCallback(name, old, value) {
    if (old !== value) {
      this._attributeToProperty(name, value);
    }
  }

  _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
    const ctor = this.constructor;

    const attrValue = ctor._propertyValueToAttribute(value, options);

    if (attrValue !== undefined) {
      const attr = ctor._attributeNameForProperty(name, options);

      if (attr !== undefined) {
        // Track if the property is being reflected to avoid
        // setting the property again via `attributeChangedCallback`. Note:
        // 1. this takes advantage of the fact that the callback is synchronous.
        // 2. will behave incorrectly if multiple attributes are in the reaction
        // stack at time of calling. However, since we process attributes
        // in `update` this should not be possible (or an extreme corner case
        // that we'd like to discover).
        // mark state reflecting
        this._updateState = this._updateState | STATE_IS_REFLECTING;

        if (attrValue === null) {
          this.removeAttribute(attr);
        } else {
          this.setAttribute(attr, attrValue);
        } // mark state not reflecting


        this._updateState = this._updateState & ~STATE_IS_REFLECTING;
      }
    }
  }

  _attributeToProperty(name, value) {
    // Use tracking info to avoid deserializing attribute value if it was
    // just set from a property setter.
    if (!(this._updateState & STATE_IS_REFLECTING)) {
      const ctor = this.constructor;

      const propName = ctor._attributeToPropertyMap.get(name);

      if (propName !== undefined) {
        const options = ctor._classProperties.get(propName);

        this[propName] = ctor._propertyValueFromAttribute(value, options);
      }
    }
  }
  /**
   * Requests an update which is processed asynchronously. This should
   * be called when an element should update based on some state not triggered
   * by setting a property. In this case, pass no arguments. It should also be
   * called when manually implementing a property setter. In this case, pass the
   * property `name` and `oldValue` to ensure that any configured property
   * options are honored. Returns the `updateComplete` Promise which is resolved
   * when the update completes.
   *
   * @param name {PropertyKey} (optional) name of requesting property
   * @param oldValue {any} (optional) old value of requesting property
   * @returns {Promise} A Promise that is resolved when the update completes.
   */


  requestUpdate(name, oldValue) {
    if (name !== undefined) {
      const options = this.constructor._classProperties.get(name) || defaultPropertyDeclaration;
      return this._requestPropertyUpdate(name, oldValue, options);
    }

    return this._invalidate();
  }
  /**
   * Requests an update for a specific property and records change information.
   * @param name {PropertyKey} name of requesting property
   * @param oldValue {any} old value of requesting property
   * @param options {PropertyDeclaration}
   */


  _requestPropertyUpdate(name, oldValue, options) {
    if (!this.constructor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
      return this.updateComplete;
    } // track old value when changing.


    if (!this._changedProperties.has(name)) {
      this._changedProperties.set(name, oldValue);
    } // add to reflecting properties set


    if (options.reflect === true) {
      if (this._reflectingProperties === undefined) {
        this._reflectingProperties = new Map();
      }

      this._reflectingProperties.set(name, options);
    }

    return this._invalidate();
  }
  /**
   * Invalidates the element causing it to asynchronously update regardless
   * of whether or not any property changes are pending. This method is
   * automatically called when any registered property changes.
   */


  async _invalidate() {
    if (!this._hasRequestedUpdate) {
      // mark state updating...
      this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
      let resolver;
      const previousValidatePromise = this._updatePromise;
      this._updatePromise = new Promise(r => resolver = r);
      await previousValidatePromise;

      this._validate();

      resolver(!this._hasRequestedUpdate);
    }

    return this.updateComplete;
  }

  get _hasRequestedUpdate() {
    return this._updateState & STATE_UPDATE_REQUESTED;
  }
  /**
   * Validates the element by updating it.
   */


  _validate() {
    // Mixin instance properties once, if they exist.
    if (this._instanceProperties) {
      this._applyInstanceProperties();
    }

    if (this.shouldUpdate(this._changedProperties)) {
      const changedProperties = this._changedProperties;
      this.update(changedProperties);

      this._markUpdated();

      if (!(this._updateState & STATE_HAS_UPDATED)) {
        this._updateState = this._updateState | STATE_HAS_UPDATED;
        this.firstUpdated(changedProperties);
      }

      this.updated(changedProperties);
    } else {
      this._markUpdated();
    }
  }

  _markUpdated() {
    this._changedProperties = new Map();
    this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
  }
  /**
   * Returns a Promise that resolves when the element has completed updating.
   * The Promise value is a boolean that is `true` if the element completed the
   * update without triggering another update. The Promise result is `false` if
   * a property was set inside `updated()`. This getter can be implemented to
   * await additional state. For example, it is sometimes useful to await a
   * rendered element before fulfilling this Promise. To do this, first await
   * `super.updateComplete` then any subsequent state.
   *
   * @returns {Promise} The Promise returns a boolean that indicates if the
   * update resolved without triggering another update.
   */


  get updateComplete() {
    return this._updatePromise;
  }
  /**
   * Controls whether or not `update` should be called when the element requests
   * an update. By default, this method always returns `true`, but this can be
   * customized to control when to update.
   *
   * * @param _changedProperties Map of changed properties with old values
   */


  shouldUpdate(_changedProperties) {
    return true;
  }
  /**
   * Updates the element. This method reflects property values to attributes.
   * It can be overridden to render and keep updated DOM in the element's
   * `renderRoot`. Setting properties inside this method will *not* trigger
   * another update.
   *
   * * @param _changedProperties Map of changed properties with old values
   */


  update(_changedProperties) {
    if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
      for (const [k, v] of this._reflectingProperties) {
        this._propertyToAttribute(k, this[k], v);
      }

      this._reflectingProperties = undefined;
    }
  }
  /**
   * Invoked whenever the element is updated. Implement to perform
   * post-updating tasks via DOM APIs, for example, focusing an element.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * * @param _changedProperties Map of changed properties with old values
   */


  updated(_changedProperties) {}
  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * * @param _changedProperties Map of changed properties with old values
   */


  firstUpdated(_changedProperties) {}

}
/**
 * Maps attribute names to properties; for example `foobar` attribute
 * to `fooBar` property.
 */


exports.UpdatingElement = UpdatingElement;
UpdatingElement._attributeToPropertyMap = new Map();
/**
 * Marks class as having finished creating properties.
 */

UpdatingElement._finalized = true;
/**
 * Memoized list of all class properties, including any superclass properties.
 */

UpdatingElement._classProperties = new Map();
UpdatingElement.properties = {};
},{}],"node_modules/@polymer/lit-element/lib/decorators.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventOptions = exports.queryAll = exports.query = exports.property = exports.customElement = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * @param tagName the name of the custom element to define
 *
 * In TypeScript, the `tagName` passed to `customElement` must be a key of the
 * `HTMLElementTagNameMap` interface. To add your element to the interface,
 * declare the interface in this module:
 *
 *     @customElement('my-element')
 *     export class MyElement extends LitElement {}
 *
 *     declare global {
 *       interface HTMLElementTagNameMap {
 *         'my-element': MyElement;
 *       }
 *     }
 *
 */
const customElement = tagName => clazz => {
  window.customElements.define(tagName, clazz); // Cast as any because TS doesn't recognize the return type as being a
  // subtype of the decorated class when clazz is typed as
  // `Constructor<HTMLElement>` for some reason. `Constructor<HTMLElement>`
  // is helpful to make sure the decorator is applied to elements however.

  return clazz;
};
/**
 * A property decorator which creates a LitElement property which reflects a
 * corresponding attribute value. A `PropertyDeclaration` may optionally be
 * supplied to configure property features.
 */


exports.customElement = customElement;

const property = options => (proto, name) => {
  proto.constructor.createProperty(name, options);
};
/**
 * A property decorator that converts a class property into a getter that
 * executes a querySelector on the element's renderRoot.
 */


exports.property = property;

const query = _query((target, selector) => target.querySelector(selector));
/**
 * A property decorator that converts a class property into a getter
 * that executes a querySelectorAll on the element's renderRoot.
 */


exports.query = query;

const queryAll = _query((target, selector) => target.querySelectorAll(selector));
/**
 * Base-implementation of `@query` and `@queryAll` decorators.
 *
 * @param queryFn exectute a `selector` (ie, querySelector or querySelectorAll)
 * against `target`.
 */


exports.queryAll = queryAll;

function _query(queryFn) {
  return selector => (proto, propName) => {
    Object.defineProperty(proto, propName, {
      get() {
        return queryFn(this.renderRoot, selector);
      },

      enumerable: true,
      configurable: true
    });
  };
}
/**
 * Adds event listener options to a method used as an event listener in a
 * lit-html template.
 *
 * @param options An object that specifis event listener options as accepted by
 * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.
 *
 * Current browsers support the `capture`, `passive`, and `once` options. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
 *
 * @example
 *
 *     class MyElement {
 *
 *       clicked = false;
 *
 *       render() {
 *         return html`<div @click=${this._onClick}`><button></button></div>`;
 *       }
 *
 *       @eventOptions({capture: true})
 *       _onClick(e) {
 *         this.clicked = true;
 *       }
 *     }
 */


const eventOptions = options => (proto, name) => {
  // This comment is here to fix a disagreement between formatter and linter
  Object.assign(proto[name], options);
};

exports.eventOptions = eventOptions;
},{}],"node_modules/@polymer/lit-element/lit-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  LitElement: true,
  html: true,
  svg: true
};
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _litHtml2.html;
  }
});
Object.defineProperty(exports, "svg", {
  enumerable: true,
  get: function () {
    return _litHtml2.svg;
  }
});
exports.LitElement = void 0;

var _litHtml = require("lit-html");

var _shadyRender = require("lit-html/lib/shady-render");

var _updatingElement = require("./lib/updating-element.js");

Object.keys(_updatingElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _updatingElement[key];
    }
  });
});

var _decorators = require("./lib/decorators.js");

Object.keys(_decorators).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _decorators[key];
    }
  });
});

var _litHtml2 = require("lit-html/lit-html");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class LitElement extends _updatingElement.UpdatingElement {
  /**
   * Updates the element. This method reflects property values to attributes
   * and calls `render` to render DOM via lit-html. Setting properties inside
   * this method will *not* trigger another update.
   * * @param _changedProperties Map of changed properties with old values
   */
  update(changedProperties) {
    super.update(changedProperties);
    const templateResult = this.render();

    if (templateResult instanceof _litHtml.TemplateResult) {
      this.constructor.render(templateResult, this.renderRoot, {
        scopeName: this.localName,
        eventContext: this
      });
    }
  }
  /**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   * @returns {TemplateResult} Must return a lit-html TemplateResult.
   */


  render() {}

}
/**
 * Render method used to render the lit-html TemplateResult to the element's
 * DOM.
 * @param {TemplateResult} Template to render.
 * @param {Element|DocumentFragment} Node into which to render.
 * @param {String} Element name.
 */


exports.LitElement = LitElement;
LitElement.render = _shadyRender.render;
},{"lit-html":"node_modules/lit-html/lit-html.js","lit-html/lib/shady-render":"node_modules/lit-html/lib/shady-render.js","./lib/updating-element.js":"node_modules/@polymer/lit-element/lib/updating-element.js","./lib/decorators.js":"node_modules/@polymer/lit-element/lib/decorators.js","lit-html/lit-html":"node_modules/lit-html/lit-html.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _litElement = require("@polymer/lit-element");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["<p>Hello, ", "!</p>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Create your custom component
var CustomGreeting =
/*#__PURE__*/
function (_LitElement) {
  _inherits(CustomGreeting, _LitElement);

  _createClass(CustomGreeting, null, [{
    key: "properties",
    // Declare properties
    get: function get() {
      return {
        name: {
          type: String
        }
      };
    } // Initialize properties

  }]);

  function CustomGreeting() {
    var _this;

    _classCallCheck(this, CustomGreeting);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomGreeting).call(this));
    _this.name = 'World';
    return _this;
  } // Define a template


  _createClass(CustomGreeting, [{
    key: "render",
    value: function render() {
      return (0, _litElement.html)(_templateObject(), this.name);
    }
  }]);

  return CustomGreeting;
}(_litElement.LitElement);

customElements.define('custom-greeting', CustomGreeting);
},{"@polymer/lit-element":"node_modules/@polymer/lit-element/lit-element.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55999" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.map