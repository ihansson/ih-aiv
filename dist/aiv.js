window["aiv"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const AnimateInView = {
	prefix: 'aiv',
	cls: {
		in_view: 'in-view',
		out_of_view: 'out-of-view',
	},
	throttle: 50,
	last_call: false,
	nodes: false,
	init: function(context){
		this.nodes = context.querySelectorAll('['+this.prefix+']');
		if(!this.nodes) return;
		this.scroll = this.scroll.bind(this)
		this.resize = this.resize.bind(this)
		this.add_view_classes = this.add_view_classes.bind(this)
		this.add_initial_classes()
		window.addEventListener('scroll', this.scroll)
		window.addEventListener('resize', this.resize)
		window.setTimeout(function(){
			let event = document.createEvent("Event");
			event.initEvent("scroll", false, true); 
			if(window.pageXOffset == 0) window.dispatchEvent(event);
		}, 60)
		return this
	},
	destroy: function(){
		this.nodes = false;
		this.last_call = false;
		window.removeEventListener('scroll', this.scroll)
		window.removeEventListener('resize', this.resize)
		window.removeEventListener('load', this.add_view_classes)
	},
	scroll: function(){
		this.add_view_classes()
	},
	resize: function(){
		this.add_view_classes()
	},
	add_initial_classes: function(){
		this.nodes.forEach(function(node){
			if(!node._className) node._className = '';
			if(!node.attributes[this.prefix+'-start_visible']){
				if(node.attributes[this.prefix+'-children']){
					node.aiv_children = node.querySelectorAll(node.attributes[this.prefix+'-children'].nodeValue)
					node.aiv_children.forEach(function(child_node){
						child_node._className = '';
						this.add_class(child_node, this.cls.out_of_view);
						this.commit_class_changes(child_node);
					}.bind(this))
				} else {
					this.add_class(node, this.cls.out_of_view);
					this.commit_class_changes(node);
				}
			}
		}.bind(this));
	},
	add_view_classes: function(){
		const now = Date.now();
		if(this.last_call && now - this.last_call < this.throttle) return;
		this.last_call = now;
		const visible_area = this.get_visible_area()
		this.nodes.forEach(function(node){

			// Skip if not a repeated animation and already triggered
			if(node.status == 'in-view' && !node.attributes[this.prefix+'-repeat']) return;

			const in_view = this.in_view(node, visible_area);

			if(in_view && node.status !== 'in-view'){
				node.status = 'in-view'
				this.remove_class(node, this.cls.out_of_view)
				this.add_class(node, this.cls.in_view)
				if(node.attributes[this.prefix+'-cls']){
					this.add_class(node, node.attributes[this.prefix+'-cls'].nodeValue)
				}
				if(node.attributes[this.prefix+'-out_cls']){
					this.remove_class(node, node.attributes[this.prefix+'-out_cls'].nodeValue)
				}
				// Delay animation if set
				if(node.attributes[this.prefix+'-delay'] && !node.timeout){
					if(node.attributes[this.prefix+'-children']){
						node.aiv_children.forEach(function(child_node, index){
							child_node._className = node._className;
							child_node.timeout = window.setTimeout(function(){
								this.commit_class_changes(child_node);
							}.bind(this), parseFloat(node.attributes[this.prefix+'-delay'].nodeValue) * index)
						}.bind(this))
					} else {
						node.timeout = window.setTimeout(function(){
							this.commit_class_changes(node);
						}.bind(this), parseFloat(node.attributes[this.prefix+'-delay'].nodeValue))
					}
				} else {
					// Or commit class changes
					if(node.attributes[this.prefix+'-children']){
						node.aiv_children.forEach(function(child_node){
							child_node._className = node._className;
							this.commit_class_changes(child_node);
						}.bind(this))
					} else {
						this.commit_class_changes(node);
					}
				}

			} else if(!in_view && node.status !== 'out-of-view') {
				node.status = 'out-of-view'
				// If currently inview then do out_cls when toggling out
				if(this.has_class(node,this.cls.in_view) && node.attributes[this.prefix+'-out_cls']){
					this.add_class(node, node.attributes[this.prefix+'-out_cls'].nodeValue)
				}
				this.remove_class(node, this.cls.in_view)
				this.add_class(node, this.cls.out_of_view)
				if(node.attributes[this.prefix+'-cls']){
					this.remove_class(node, node.attributes[this.prefix+'-cls'].nodeValue)
				}
				// Clear delayed animation if set
				if(node.attributes[this.prefix+'-children']){
					node.aiv_children.forEach(function(child_node, index){
						child_node._className = node._className;
						if(child_node.timeout){
							window.clearTimeout(child_node.timeout)
							child_node.timeout = false
						}
						this.commit_class_changes(child_node);
					}.bind(this))
				} else {
					if(node.timeout){
						window.clearTimeout(node.timeout)
						node.timeout = false
					}
					this.commit_class_changes(node);
				}
			}

		}.bind(this))
	},
	has_class: function(node, cls){
		return !!node._className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	},
	add_class: function(node, cls){
		if(!this.has_class(node, cls)) node._className = (node._className+" "+cls).trim();
		return node;
	},
	remove_class: function(node, cls){
		if(this.has_class(node,cls)) {
			node._className = node._className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'), ' ').trim();
		}
		return node;
	},
	commit_class_changes: function(node){
		if(node._className !== node.className){
			node.className = node._className;
			node._className = node.className;
		}
	},
	in_view: function(node, visible_area){
		// I think this is wrong
		let top = node.offsetTop + node.offsetHeight;
		let bottom = node.offsetTop;
		if(node.attributes[this.prefix+'-offset']) {
			top += parseFloat(node.attributes[this.prefix+'-offset'].nodeValue);
			bottom += parseFloat(node.attributes[this.prefix+'-offset'].nodeValue);
		}
		return top > visible_area.top && bottom < visible_area.bottom;
	},
	get_visible_area: function(){
		return {top: window.pageYOffset, bottom: window.pageYOffset + window.innerHeight}
	}
}

if ( !NodeList.prototype.forEach ) {
  NodeList.prototype.forEach = function(fn, scope) {
    for (var i = 0, len = this.length; i < len; ++i) {
      fn.call(scope || this, this[i], i, this);
    }
  }
}

module.exports = Object.create(AnimateInView).init(document.querySelector('body'));

/***/ })
/******/ ]);
//# sourceMappingURL=aiv.js.map