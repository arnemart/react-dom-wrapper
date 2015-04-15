module.exports = function(React) {
  function isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
  }

  function isString(o) {
    return Object.prototype.toString.call(o) == '[object String]';
  }
  function isNumber(o) {
    return Object.prototype.toString.call(o) == '[object Number]';
  }
  function isObject(o) {
    return Object.prototype.toString.call(o) == '[object Object]';
  }
  function recursiveFilterNulls(a) {
    return a.reduce(function(arr, e) {
      if (isArray(e)) {
        var result = recursiveFilterNulls(e);
        if (result.length > 0) {
          arr.push(result);
        }
      } else if (e != null) {
        arr.push(e);
      }
      return arr;
    }, []);
  }
  function DOM(tree) {

    if (isArray(tree[0])) {
      // Is this an array of elements? Convert them all to elements
      return tree.map(DOM);
    } else if (tree._isReactElement || isString(tree) || isNumber(tree)) {
      // Or is it maybe a React element? Or just a string, or maybe even a number? Return it.
      return tree;
    }

    var type = tree[0];
    var rest;
    var props = {};

    if (isString(type)) {
      var parts;

      // Split on dots and add class names
      if (type.indexOf('.') > -1) {
        parts = type.split('.');
        type = parts[0];
        props.className = parts.slice(1).join(' ');
      }

      // Check for ID
      if (type.indexOf('#') > -1) {
        parts = type.split('#', 2);
        type = parts[0];
        props.id = parts[1];
      }
    }

    // If we have props, get them, otherwise they're all children
    if (isObject(tree[1])) {
      var newProps = tree[1];
      if (props.className) {
        newProps.className = props.className + ' ' + (newProps.className || '');
      }
      props = newProps;
      rest = tree.slice(2);
    } else {
      rest = tree.slice(1);
    }

    // Strip out all the nulls
    rest = recursiveFilterNulls(rest);

    return React.createElement.apply(React, [type, props].concat(rest.map(DOM)));
  }

  return DOM;
};
