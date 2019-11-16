# AIV - Animate In View - [View demo](https://ianhan.com/library/aiv)

AIV is a simple library for toggling classes when elements are inview. With support for offseting when the element is in-view, delaying the animation, or triggering classes on child elements in sequence.

## Basic Example

Simply adding the aiv property will trigger the built in `in-view` and `out-of-view` classes. Settings are separated with a comma, here we are setting the repeat flag to activate the toggle on repeat changes in visibility.

```html
<div aiv="cls: toggled; repeat;">Will have the 'toggled' class when in view.</div>

```

You can add custom classes when an element comes in or out of view. Set an offset from which the toggle will happen. Add a delay to when the node is toggled. Or change wheter a toggle is repeated or visible from the start (to not include the out-of-view class).

```html
<div aiv="cls: yellow; out_cls: red; repeat;">Yellow when in. Red when out. Repeats when revisiting.</div>

<div aiv="cls: yellow; offset: 200;">Yellow when 200px into viewport.</div>

<div aiv="cls: yellow; delay: 2000;">Yellow after being in viewport for 2 seconds.</div>

<div aiv="cls: yellow; start_visible">Yellow in viewport. Starts visible</div>
```

### Children

You can toggle classes on child elements by using a selector in the `children` setting. This is best used with `delay` which will toggle child elements in sequence. If you want to delay the execution of an entire child block then use the `delay_all` setting.

```html
<ul aiv="cls: aiv-fade; children: li; delay: 200;">
	<li>Fade in when in view</li>
	<li>Fade in when in view after 200 milliseconds</li>
	<li>Fade in when in view after 400 milliseconds</li>
</ul>
<ul aiv="cls: aiv-fade; children: li; delay: 200; delay_all: 600;">
	<li>Fade in when in view</li>
	<li>Fade in when in view after 200 milliseconds</li>
	<li>Fade in when in view after 400 milliseconds</li>
</ul>
```

### In View

Numbers correlating to the positions in view to show the element as visible. For example -0.1,1.1 would show the element 10% before and after the element would usually be visible. 0.1,0.9 would should the element when it is 10% below the top of the screen and 10% above the bottom of the screen.

```html
<div aiv="cls: yellow; in_view: 0.1,0.9;">Yellow when between 10% and 90% of the screen</div>
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

### Events

The following events are triggered for nodes in AIV

| Event Name | Action |
| --- | --- |
| aiv/load | Node has been loaded into aiv |
| aiv/before_load | Node is about to be loaded |
| aiv/remove | Node has been removed from the aiv watch list |
| aiv/in_view | Node is in view |
| aiv/out_of_view | Node is out of view |
| aiv/class_change | Classes are about to be toggled |

```javascript
const el = document.getElementById('event_test');
el.addEventListener('aiv/in_view', function(){
	// in view
});
el.addEventListener('aiv/out_of_view', function(){
	// out of view
});
```

### AIV Options

One can also initilize aiv using the javascript interface by supplying a selector and options.

| Command | Default | Description |
| --- | --- | --- |
| cls | none | Class to be added when element is in view |
| out_cls | none | Class to be added when element goes out of view |
| repeat | false | If the element should repeat the toggle when going out and in view after it has gone into view once. |
| delay | 0 | Time in milliseconds before the element goes in view when class is added |
| delay_all | 0 | Used with child elements to add a delay to all children in addition to a delay between them |
| offset | 0 | Distance in pixels the element is from the viewport before it should toggle the class |
| in_view | '0,1' | Numbers correlating to the positions in view to show the element as visible. |
| children | none | Selector for child elements which should be toggled. This will cause delay to work in sequence. |
| start_visible | false | If the element should be visible before toggled (include the out-of-view class) |

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

### Optional CSS

AIV does not require you to include any CSS to work. If you want to hide elements on load you should add the following class

```css
.out-of-view {
	visibility: hidden;
}
```

You can also include the `aiv-optional.css` file which includes this helper and basic animations. 

```html
<link rel="stylesheet" type="text/css" href="aiv-optional.css">
```

### TODO

* Add option for child elements to only trigger when in view