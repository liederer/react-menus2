"use strict";
var _reactDom = require("react-dom"),
  Region = require("region-align"),
  selectParent = require("select-parent");
module.exports = function(a) {
  var b;
  if ((!0 === a && (b = Region.getDocRegion()), !b && "string" == typeof a)) {
    var c = selectParent(a, (0, _reactDom.findDOMNode)(this));
    b = Region.from(c);
  }
  return b || "function" != typeof a || (b = Region.from(a())), b;
};

