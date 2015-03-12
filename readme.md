react-dom-wrapper
=================

Convert an array of element data to react elements

Installation
------------

```
$ npm install [--save] react-dom-wrapper
```

Usage
-----

```javascript
var DOM = require('react-dom-wrapper');

var element = DOM([
    'div#wrapper',
    { className: 'asd' },
    ['span.message.important', 'hello', ['span.bold', name]],
    [CustomComponent, { customProp: 'hello' }],
    arrayOfThings.map(function(thing) {
        return ['div', { key: thing.id }, thing.value]
    })
])
```

Using a different React
-----------------------

Using React with addons or something? You can change which React this uses by calling `setReact`, thusly:

```javascript
var DOM = require('react-dom-wrapper').setReact(myReact);
```

Element spec
------------

An element is an array consisting of:

1. Element type (string or React component)
2. Optional props object
3. Zero or more children (string, element spec, React element, or an array of any of those)

Testing
-------

Yeah there should probably be some tests but you know

License
-------

MIT
