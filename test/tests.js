var buster = require('buster');
var DOM = require('../');
var React = require('react');

buster.testCase('React DOM element generation', {
  'simple DOM element': function() {
    var element = DOM(['span', 'hello']);
    buster.assert.equals(element.type, 'span');
    buster.assert.equals(element.props.children, 'hello');
  },

  'DOM element with class names': function() {
    var element = DOM(['div.test1.test2', 'hello']);
    buster.assert.equals(element.props.className, 'test1 test2');
  },

  'DOM element with ID': function() {
    var element = DOM(['p#testid', 'hello']);
    buster.assert.equals(element.props.id, 'testid');
  },

  'DOM element with ID and class names': function() {
    var element = DOM(['div#testid.test1.test2', 'hello']);
    buster.assert.equals(element.props.className, 'test1 test2');
    buster.assert.equals(element.props.id, 'testid');
  },

  'Class names in props and element name': function() {
    var element = DOM(['span#testid.test1.test2', { className: 'test3' }, 'hello']);
    buster.assert.equals(element.props.className, 'test1 test2 test3');
  },

  'Props do not displace children': function() {
    var element = DOM(['div', { className: 'test-test' }, 'hello', 'hello2']);
    buster.assert.equals(element.props.className, 'test-test');
    buster.assert.equals(element.props.children[0], 'hello');
    buster.assert.equals(element.props.children[1], 'hello2');
  },

  'Nested DOM elements': function() {
    var element = DOM([
      'div',
      ['span', 'hello'],
      ['span', ['strong', 'hello2']]
    ]);
    buster.assert.equals(element.props.children[0].type, 'span');
    buster.assert.equals(element.props.children[1].props.children.type, 'strong');
  },

  'Array of DOM elements': function() {
    var element = DOM([
      'ul',
      [
        ['li.first', { key: '1' }, '1'],
        ['li.second', { key: '2' }, '2'],
        ['li.third', { key: '3' }, '3']
      ]
    ]);
    buster.assert.equals(element.props.children.length, 3);
    buster.assert.equals(element.props.children[1].type, 'li');
    buster.assert.equals(element.props.children[1].key, '2');
  },

  'Deeply nested': function() {
    var element = DOM([
      'ul',
      [
        [
          'li.first',
          { key: '1' },
          [
            'div',
            [
              ['span', { key: 'one' }, 'one'],
              ['span', { key: 'two' }, 'two']
            ]
          ]
        ],
        ['li.second', { key: '2' }, 'second']
      ]
    ]);

    buster.assert.equals(element.props.children[0].props.children.props.children.length, 2);
    buster.assert.equals(element.props.children[0].props.children.props.children[0].type, 'span');
  },

  'Custom component': function() {
    var C = React.createClass({
      render: function() {
        return React.DOM.p(null, this.props.text);
      }
    });

    var element = DOM([C, { text: 'Hello!' }]);

    buster.assert.equals(element.type, C);
    buster.assert.equals(element.props.text, 'Hello!');
  }

});
