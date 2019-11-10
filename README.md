## I would not recommend using this package at the moment as it's still under heavy construction.

# AIV - Animate In View

AIV is a simple library for toggling classes when elements are inview. With support for offseting when the element is in-view, delaying the animation, or triggering classes on child elements in sequence.

## Basic Example

In-view classes can be toggled using an html attribute `aiv` `aiv-...` interface. Simply calling aiv will trigger the built in `in-view` and `out-of-view` classes.

```html
<div aiv="cls: toggled; repeat;">Will have the 'toggled' class when in view.</div>

```

### Extended Examples

You can add custom classes using `aiv-cls` and `aiv-out_cls`. Set an offset from which the toggle will happen. Add a delay to when the node is toggled. Or change wheter a toggle is repeated or if visible from the start.

```html
<div aiv="cls: yellow; cls_out: red; repeat;">Yellow when in. Red when out. Repeats when revisiting.</div>

<div aiv="cls: yellow; offset: 200;">Yellow when 200px into viewport.</div>

<div aiv="cls: yellow; delay: 2000;">Yellow after being in viewport for 2 seconds.</div>

<div aiv="cls: yellow; start_visible">Yellow in viewport. Starts visible</div>
```

### Children

You can toggle classes on child elements by adding a css selector in the `aiv-children` property. This is best used with `aiv-delay` which will toggle child elements in sequence.

```html
<ul aiv="cls: animation-fade; children: li; delay: 200;">
	<li>Fade in when in view</li>
	<li>Fade in when in view after 200 milliseconds</li>
	<li>Fade in when in view after 400 milliseconds</li>
</ul>
```

### Javascript initialization 

One can also initilize aiv using the javascript interface by supplying a selector and options.

```html
<h3 class="js-api-example">JS API Example</h3>
```

```javascript
aiv.add('.js-api-example',{
	repeat: true,
	delay: 500
})
```

### AIV Options

One can also initilize aiv using the javascript interface by supplying a selector and options.

| Command | Default | Description |
| --- | --- | --- |
| cls | none | Class to be added when element is in view |
| out_cls | none | Class to be added when element goes out of view |
| repeat | false | If the element should repeat the toggle when going out and in view after it has gone into view once. |
| delay | 0 | Time in milliseconds before the element goes in view when class is added |
| offset | 0 | Distance in pixels the element is from the viewport before it should toggle the class |
| children | none | Selector for child elements which should be toggled. This will cause delay to work in sequence. |
| start_visible | false | If the element should be visible before toggled |

### Init

Include the library and init using default options.

```html
<script type="text/javascript" src="aiv.min.js"></script>
<script type="text/javascript">aiv.init()</script>
```

### Init Options

The following options can be configured when initializing aiv 

| Command | Default | Description |
| --- | --- | --- |
| in_cls | 'in-view' | The default class to be added to elements in view |
| out_cls | 'out-of-view' | The default class to be added to elements out of view |
| throttle | 50 | Time in milliseconds to limit the updating of toggles |
| context | document.body | The parent node from which to track nodes for updating |
| selector | [aiv] | Selector for loading nodes to be tracked by aiv |

#### Change default classes

```html
<script type="text/javascript" src="aiv.min.js"></script>
<script type="text/javascript">aiv.init({
	in_cls: 'in-view',
	out_cls: 'out-of-view',
})</script>
```

#### All init settings

```html
<script type="text/javascript" src="aiv.min.js"></script>
<script type="text/javascript">aiv.init({
	in_cls: 'in-view',
	out_cls: 'out-of-view',
	throttle: 50,
	context: document.body,
	selector: '[aiv]'
})</script>
```