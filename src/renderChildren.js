"use strict";
var React = require("react"),
  MenuItemCell = require("./MenuItemCell"),
  cloneElement = React.cloneElement,
  assign = require("object-assign");
function emptyFn() {}
module.exports = function(a, b) {
  var d = b.itemProps ? b.itemProps.index : -1,
    e = a.children,
    f = 1,
    g = [];
  React.Children.map(e, function(l) {
    var m = l.props;
    if ((g.push(l), m && m.isMenuItem)) {
      var n = React.Children.count(m.children);
      f = Math.max(f, n);
    }
  });
  var h = a.itemStyleProps,
    j = -1,
    k = g.map(function(l, m) {
      var n = l.props,
        o = {};
      n &&
        n.isMenuItem &&
        (j++,
        (o.onMenuItemMouseOver = this.onMenuItemMouseOver),
        (o.onMenuItemMouseOut = this.onMenuItemMouseOut));
      var p = React.Children.map(n.children, function(t) {
          return t;
        }),
        q = React.Children.count(p);
      for (q < f && (p = p ? [p] : []); q < f; )
        q++, p.push(React.createElement(MenuItemCell, null));
      var r = n.onClick || emptyFn,
        s = cloneElement(
          l,
          assign(
            {
              interactionStyles: a.interactionStyles,
              itemIndex: j,
              itemCount: g.length,
              key: m,
              index: m,
              expanded: d == m,
              children: p,
              expander: a.expander,
              applyDefaultTheme: a.applyDefaultTheme,
              theme: a.theme,
              themes: a.themes || this.constructor.themes,
              onExpanderClick: this.onMenuItemExpanderClick,
              onClick: function(t, u, v) {
                r.apply(null, arguments), this.onMenuItemClick(t, u, v);
              }.bind(this)
            },
            o,
            {
              style: h.itemStyle,
              overStyle: h.itemOverStyle,
              activeStyle: h.itemActiveStyle,
              disabledStyle: h.itemDisabledStyle,
              expandedStyle: h.itemExpandedStyle,
              cellStyle: h.cellStyle
            }
          )
        );
      return s;
    }, this);
  return k;
};

