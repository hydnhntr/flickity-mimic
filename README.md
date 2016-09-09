# Flickity Mimic
Mimicry extension for Metafizzy’s [Flickity](http://flickity.metafizzy.co/).

Chosen Flickity instances can mimic the real-time interactions of another.

[Demo hydnhntr.github.io/flickity-mimic/](http://hydnhntr.github.io/flickity-mimic/).

+ Real-time dragging and navigation actions replicated
+ `indexOffset` option to set the mimic ahead or behind the target’s `selectedIndex`
+ No 2 way binding/sync compatibility, see [Flickity Sync](https://github.com/metafizzy/flickity-sync) instead
+ Intended to work with `dragging` and `accesibility` options set to `false`.
+ No support for `groupCells` option, requires matching cell counts and works best with `wrapAround: true`

### Next up

+ Support different cell widths and `cellAlign` option.

## Usage

``` html
<div class="gallery gallery-a">
  ...
</div>
<div class="gallery gallery-b">
  ...
</div>
```

``` js
// mimic options object to be supplied as nameValuePair on Flickity config
mimic: {
	target: '.gallery-a'
	// set as a selector string or HTMLElement `document.querySelector('.gallery-a')`, `jQuery('.gallery-a')[0]`

	indexOffset: 1
	// Integer, defaults to 0
}
```


### jQuery

``` js
$('.gallery-a').flickity();
$('.gallery-b').flickity({
	wrapAround: true,
	draggable: false,
  accessibility: false,
  mimic: {
		'target': '.gallery-a',
		'indexOffset': 1
	}
});
```

### Vanilla JS

``` js
var flktyA = new Flickity('.gallery-a');
var flktyB = new Flickity( '.gallery-b', {
	wrapAround: true,
	draggable: false,
  accessibility: false,
	mimic: {
		'target': '.gallery-a',
		'indexOffset': 1
	}
});
```

### HTML

``` html
<div class="gallery gallery-a js-flickity">
  ...
</div>
<div class="gallery gallery-b js-flickity"
  data-flickity='{"wrapAround": true, "draggable": false, "accessibility": false, "mimic": {"target": "#carousel-a", "indexOffset": 1}}'>
  ...
</div>
```

## Install

npm: `npm install flickity-mimic`

### RequireJS or Browserify

Untested, but should work as per Flickity’s existing plugins: [asNavFor](https://github.com/metafizzy/flickity-as-nav-for), [sync](https://github.com/metafizzy/flickity-sync). If not, I’ve goofed.

---

MIT license

By Hayden Hunter, built upon the hard yards by [Metafizzy](http://metafizzy.co)
