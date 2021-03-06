"use strict";
var React = require("react"),
  assign = require("object-assign");
var createClass = require('create-react-class');
var MenuItemCell = createClass({
    displayName: "ReactMenuItemCell",
    getDefaultProps: function getDefaultProps() {
      return { style: { padding: 5, whiteSpace: "nowrap" } };
    },
    render: function render() {
      var a = this.prepareProps(this.props),
        b = a.children;
      return (
        a.expander && (b = !0 === a.expander ? "\u203A" : a.expander),
        React.createElement("td", a, b)
      );
    },
    prepareProps: function prepareProps(a) {
      var b = {};
      return assign(b, a), (b.style = this.prepareStyle(b)), b;
    },
    prepareStyle: function prepareStyle(a) {
      var b = {}; // if (props.itemIndex != props.itemCount - 1){
      //     style.paddingBottom = 0
      // }
      return assign(b, a.style, a.style), b;
    }
  });
module.exports = MenuItemCell;

