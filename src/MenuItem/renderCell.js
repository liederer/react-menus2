"use strict";
var React = require("react"),
  assign = require("object-assign"),
  MenuItemCell = require("../MenuItemCell");
module.exports = function(a, b) {
  var c = assign({}, a.defaultCellStyle, a.cellStyle);
  return React.createElement(MenuItemCell, { style: c }, a.data[b]);
};

