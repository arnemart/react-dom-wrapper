# react-dom-wrapper [![Build Status](https://travis-ci.org/arnemart/react-dom-wrapper.svg?branch=master)](https://travis-ci.org/arnemart/react-dom-wrapper)

Convert an array of element data to react elements. Prettier than JSX, less verbose than using React.DOM directly. Inspired by (though not as pretty as) [Hiccup](https://github.com/weavejester/hiccup).

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
    [
        'ul',
        arrayOfThings.map(function(thing) {
            return ['li', { key: thing.id }, thing.value]
        })
    ]
]);

React.render(element, mountNode);
```

Using a custom React
-----------------------

If you want to use a different version of React entirely, you can do `var DOM = require('react-dom-wrapper/react-dom-wrapper')(myCustomReact)`.

Element spec
------------

An element is an array consisting of:

1. Element type (string or React component)
2. Optional props object
3. Zero or more children (string, element spec, React element, or an array (can even be nested) of any of those)

Testing
-------

There are test! [Buster](http://busterjs.org) is used. `npm test` runs the test, `npm run autotest` watches the files and runs tests automatically.

License
-------

MIT
