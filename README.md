## I would not recommend using this package at the moment as it's still under heavy construction.

# AIV - Animate In View

AIV is a simple library for toggling classes when elements are inview. With support for offseting when the element is in-view, delaying the animation, or triggering classes on child elements in sequence.

## Init

Include the library and init using default options or given options

```html
<script type="text/javascript" src="aiv.min.js"></script>
<script type="text/javascript">aiv.init()</script>
```

```html
<script type="text/javascript" src="aiv.min.js"></script>
<script type="text/javascript">aiv.init({
	in_cls: 'in-view',
	out_cls: 'out-of-view',
	throttle: 50
})</script>
```

## Getting Started

In-view classes can be toggled using an html attribute `aiv` `aiv-...` interface. Simply calling aiv will trigger the built in `in-view` and `out-of-view` classes.

```html
<div aiv>Basic Toggle</div>
```

### Custom Classes

You can add custom classes using `aiv-cls` and `aiv-out_cls`.

```html
<div aiv aiv-cls="yellow" aiv-out_cls="red">Yellow when in. Red when out.</div>
```

### Repeat

By default an element will only trigger classes once. If you want the animation to repeat when coming back to it use `aiv-repeat`.

```html
<div aiv aiv-cls="yellow" aiv-out_cls="red" aiv-repeat>Repeating transition.</div>
```

### Delay

Setting `aiv-delay` will hold the transition to in-view by the specified number in milliseconds.

```html
<div aiv aiv-delay="500">Repeating transition.</div>
```

### Offset

To make an element trigger it's in-view classes earlier or later specifcy `aiv-offset` in pixels.

```html
<div aiv aiv-offset="200">Toggle classes 200px down the page.</div>
```

### Children

You can toggle classes on child elements by adding a css selector in the `aiv-children` property. This is best used with `aiv-delay` which will toggle child elements in sequence.

```html
<ul aiv aiv-children="li" aiv-delay="200">
	<li>Child element 1</li>
	<li>Child element 2</li>
	<li>Child element 3</li>
</ul>
```

### Start Visible

By default, aiv will add the out classes to an element immediately upon loading to allow for page load animations. If you do not wish to use this set the `aiv-start_visible` paramater.

```html
<div aiv aiv-offset="200" aiv-start_visible>Toggle classes 200px down the page.</div>
```

### JS Api

Temporary, to be rewritten

```html
<h3 class="js-api-example">JS API Example</h3>
```

```javascript
aiv.add_nodes('.js-api-example',{
	repeat: true,
	delay: 500
})
```
