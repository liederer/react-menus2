"use strict";
var assign = require("object-assign");
module.exports = function(a) {
  var b = assign({}, a.defaultItemStyle, a.itemStyle),
    c = assign({}, a.defaultItemOverStyle, a.itemOverStyle),
    d = assign({}, a.defaultItemActiveStyle, a.itemActiveStyle),
    e = assign({}, a.defaultItemDisabledStyle, a.itemDisabledStyle),
    f = assign({}, a.defaultItemExpandedStyle, a.itemExpandedStyle),
    g = assign({}, a.defaultCellStyle, a.cellStyle);
  return {
    itemStyle: b,
    itemOverStyle: c,
    itemActiveStyle: d,
    itemDisabledStyle: e,
    itemExpandedStyle: f,
    cellStyle: g
  };
};

