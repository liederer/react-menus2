"use strict";
var _reactDom = require("react-dom"),
  Region = require("region-align"),
  assign = require("object-assign"),
  align = require("./align");
module.exports = function(b, c) {
  if (!c.menu || !this.didMount) return void (this.prevMenuIndex = -1);
  var d = c.menuOffset,
    e = d.left + d.width,
    f = d.top,
    g = c.itemProps.index,
    h = this.prevMenuIndex == g;
  this.aligning && !h && (this.aligning = !1), (this.prevMenuIndex = g);
  var i = {
    position: "absolute",
    visibility: "hidden",
    overflow: "hidden",
    pointerEvents: "none",
    left: e,
    top: f,
    zIndex: 1
  };
  return (
    this.aligning ||
      h ||
      setTimeout(
        function() {
          if (this.didMount) {
            var j = Region.from((0, _reactDom.findDOMNode)(this)),
              k = Region.from({
                left: j.left,
                top: j.top + d.top,
                width: d.width,
                height: d.height
              }),
              l = this.refs.subMenu && this.refs.subMenu.isMounted();
            if (l) {
              var q,
                m = Region.from(
                  this.refs.subMenu.refs.scrollContainer.getCurrentSizeDOM()
                ),
                n = m.height,
                o = align(b, m, /* alignTo */ k, b.constrainTo),
                p = m.height;
              p < n && (q = p - b.subMenuConstrainMargin),
                q && -1 == o /* upwards*/ && (m.top = m.bottom - q);
              var r = m.left - j.left,
                s = m.top - j.top;
              5 > Math.abs(r - e) && (r = e),
                5 > Math.abs(s - f) && (s = f),
                (this.subMenuPosition = 0 > r ? "left" : "right"),
                (this.alignOffset = { left: r, top: s }),
                (this.aligning = !0),
                this.setState({ subMenuMaxHeight: q });
            }
          }
        }.bind(this),
        0
      ),
    (h || (this.aligning && this.alignOffset)) &&
      (assign(i, this.alignOffset),
      (i.visibility = "visible"),
      delete i.pointerEvents,
      delete i.overflow),
    (this.aligning = !1),
    i
  );
};

