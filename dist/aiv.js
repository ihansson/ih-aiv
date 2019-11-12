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

let nodes = [],
	last_call = false,
	opts = {},
	events = {};

// Custom events

const event_names = ['aiv/load', 'aiv/before_load', 'aiv/remove', 'aiv/in_view', 'aiv/out_of_view', 'aiv/class_change'];
for(ev in event_names){
	let event = document.createEvent('Event');
	event.initEvent(event_names[ev], true, true);
	events[event_names[ev]] = event;
}

// Update options
function configure(_opts){
	for(opt in _opts){
		opts[opt] = _opts[opt]
	}
}

// Setup before first update
function add(selector, options){
	let _nodes = opts.context.querySelectorAll(selector);
	_nodes = Array.prototype.slice.call(_nodes)
	for(i in _nodes) load(_nodes[i], options)
	nodes = nodes.concat(_nodes)
}

// Remove node from list to update
function remove(node){
	node.dispatchEvent(events['aiv/remove'])
	if(node.aiv.timeout) window.clearTimeout(node.aiv.timeout)
	nodes = nodes.filter(function(_node){ return _node !== node})
}

// Sets up initial classes on nodes
function load(node, options){

	node.aiv = {
		delay : 0,
		delay_all: 0,
		offset : 0,
		in_view: [0,1]
	}

	if(node.attributes.aiv){
		let settings = node.attributes.aiv ? extract_settings(node.attributes.aiv.nodeValue) : {};
		for(setting in settings){
			node.aiv[setting] = settings[setting]
		}
	}

	if(options){
		for(opt in options){
			node.aiv[opt] = options[opt]
		}
	}

	if(node.aiv.children) node.aiv.children = Array.prototype.slice.call(node.querySelectorAll(node.aiv.children));

	node.dispatchEvent(events['aiv/before_load'])

	const to_change = node.aiv.children ? node.aiv.children : [node]

	let in_cls = [node.aiv.cls ? node.aiv.cls : opts.in_cls];
	let out_cls = [node.aiv.out_cls ? node.aiv.out_cls : opts.out_cls];

	for(index in to_change){

		let target_node = to_change[index];
		if(!target_node.aiv) target_node.aiv = {}

		// Store active and inactive classes. Append the current className
		target_node.aiv.in_cls = in_cls.slice();
		target_node.aiv.out_cls = out_cls.slice();
		target_node.aiv.in_cls.push(target_node.className)
		target_node.aiv.out_cls.push(target_node.className)

		// Don't set initial classes on start_visible nodes
		if(!node.aiv.start_visible){
			className(target_node, target_node.aiv.out_cls)
		}

		target_node.dispatchEvent(events['aiv/load'])

	}
}

// Update all nodes
function update(){
	const now = Date.now();
	if(last_call && now - last_call < opts.throttle) return;
	last_call = now;
	const visible = visible_area()
	let _nodes = nodes;
	for(i in _nodes) toggle(_nodes[i], visible)
}

// Toggle statuses on a single node
function toggle(node, visible){

	const in_view = is_in_view(node, visible);	
	const to_change = node.aiv.children ? node.aiv.children : [node]

	for(index in to_change){
		// Set classes if in
		let target_node = to_change[index];
		if(in_view && target_node.aiv_status !== 'in'){
			target_node.dispatchEvent(events['aiv/in_view'])
			target_node.aiv_status = 'in';
			node.aiv.triggered = true;
			if(node.aiv.delay){
				target_node.aiv.timeout = window.setTimeout(function(){
					className(target_node, target_node.aiv.in_cls)
				}, (node.aiv.delay * (node.aiv.children ? index : index + 1)) + node.aiv.delay_all)
			} else {
				className(target_node, target_node.aiv.in_cls)
			}
		}
		// Set classes if out
		if(!in_view && target_node.aiv_status !== 'out'){
			target_node.dispatchEvent(events['aiv/out_of_view'])
			if(target_node.aiv.timeout){
				window.clearTimeout(target_node.aiv.timeout)
				target_node.aiv.timeout = false
			}
			if(node.aiv.triggered && !node.aiv.repeat){
				remove(node)
				continue;
			}
			target_node.aiv_status = 'out';
			className(target_node, target_node.aiv.out_cls)
		}
	}

}

// Changes classes to stored _className
function className(node, cls){
	node.dispatchEvent(events['aiv/class_change'])
	node.className = cls.join(' ');
}

// Extracts setting values
function extract_settings(string){
	let settings = {};
	if(!string) return settings;
	string.split(';').forEach(function(setting){
		let arr = setting.trim().split(':')
		if(!arr[0]) return;
		let key = arr[0].trim();
		let value = arr[1] ? arr[1].trim() : true;
		if(['delay', 'offset', 'delay_all'].indexOf(key) !== -1) value = parseInt(value)
		if(['in_view'].indexOf(key) !== -1) value = value.split(',').map(function(value){ return parseFloat(value) })
		settings[key] = arr[1] ? value : true
	});
	return settings;
}

// Is element within window bounds
function is_in_view(node, visible){
	let bottom = visible.bottom + (node.aiv.in_view[1] * visible.height) - visible.height;
	let top = visible.top + (node.aiv.in_view[0] * visible.height);
	return (node.offsetTop + node.aiv.offset) <= bottom && (node.offsetTop + node.offsetHeight + node.aiv.offset) >= top;
}

// Get visible area in window
function visible_area(){
	let y = parseInt(window.pageYOffset);
	let height = parseInt(window.innerHeight);
	return {top: y, bottom: y + height, height: height}
}

// Bind scroll and resize events to update toggles
function bind(){
	window.addEventListener('scroll', update)
	window.addEventListener('resize', update)
	window.setTimeout(function(){
		let event = document.createEvent("Event");
		event.initEvent("scroll", false, true); 
		if(window.pageXOffset == 0) window.dispatchEvent(event);
	}, 60)
}

// Unbind events
function unbind(){
	window.removeEventListener('scroll', update)
	window.removeEventListener('resize', update)
}

// Set default options
function init(options){
	configure({
		in_cls: 'in-view',
		out_cls: 'out-of-view',
		throttle: 50,
		context: document.body,
		selector: '[aiv]'
	});
	if(options) configure(options);
	if(opts.context){
		add('[aiv]');
	}
	bind();
}

module.exports = {
	add: add,
	remove: remove,
	bind: bind,
	unbind: unbind,
	init: init
};

/***/ })
/******/ ]);
//# sourceMappingURL=aiv.js.map