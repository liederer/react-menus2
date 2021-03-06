"use strict";
var _reactDom = require("react-dom");
function emptyFn() {}
var React = require("react"),
  assign = require("object-assign"),
  Region = require("region-align"),
  inTriangle = require("point-in-triangle"),
  hasTouch = require("has-touch"),
  normalize = require("react-style-normalizer"),
  getMenuOffset = require("./getMenuOffset"),
  getConstrainRegion = require("./align/getConstrainRegion"),
  getItemStyleProps = require("./getItemStyleProps"),
  renderSubMenu = require("./renderSubMenu"),
  renderChildren = require("./renderChildren"),
  prepareItem = require("./prepareItem"),
  propTypes = require("./propTypes"),
  ScrollContainer = require("./ScrollContainer");
var createClass = require('create-react-class');
var MenuItem = require("./MenuItem"),
  MenuClass = createClass({
    displayName: "Menu",
    propTypes: propTypes,
    getDefaultProps: function getDefaultProps() {
      return {
        isMenu: !0,
        constrainTo: !0,
        enableScroll: !0,
        interactionStyles: !0,
        applyDefaultTheme: !0,
        style: {
          display: "inline-block",
          boxSizing: "border-box",
          position: "relative",
          background: "white", //theme props
          border: "1px solid rgb(46, 153, 235)"
        },
        defaultSubMenuStyle: { position: "absolute" },
        subMenuStyle: null,
        scrollerProps: {},
        columns: ["label"],
        items: null,
        visible: !0,
        defaultItemStyle: {},
        itemStyle: {},
        defaultItemOverStyle: {},
        itemOverStyle: {},
        defaultItemDisabledStyle: {},
        itemDisabledStyle: {},
        defaultItemExpandedStyle: {},
        itemExpandedStyle: {},
        defaultCellStyle: {},
        cellStyle: {},
        stopClickPropagation: !0
      };
    },
    getInitialState: function getInitialState() {
      return { mouseOver: !1 };
    },
    componentWillUnmount: function componentWillUnmount() {
      this.didMount = !1;
    },
    componentDidMount: function componentDidMount() {
      (this.props.onMount || emptyFn)(this),
        (this.didMount = !0),
        (this.props.constrainTo || this.props.alignTo) &&
          !this.props.subMenu &&
          setTimeout(
            function() {
              if (this.isMounted()) {
                var i,
                  a = this.props,
                  b = Region.from(
                    (0, _reactDom.findDOMNode)(this.refs.scrollContainer)
                  ),
                  c = (0, _reactDom.findDOMNode)(this),
                  d = Region.from(c),
                  e = d.height,
                  f = b.height + e,
                  g = Region({
                    left: d.left,
                    right: d.right,
                    top: d.top,
                    bottom: d.top + f
                  }),
                  h = a.constrainTo ? getConstrainRegion(a.constrainTo) : null; //get clientHeight of this dom node, so as to account for padding
                //build the actual region of the menu
                if (a.alignTo) {
                  var j = Region.from(c.parentNode),
                    k = Region.from(a.alignTo);
                  g.alignTo(k, a.alignPositions, {
                    offset: a.alignOffset,
                    constrain: h
                  });
                  var l = g.top - j.top,
                    m = g.left - j.left;
                  i = { style: { left: m, top: l } };
                }
                h &&
                  ((i = i || {}),
                  g.bottom > h.bottom && (i.maxHeight = h.bottom - g.top - e)),
                  i && this.setState(i);
              }
            }.bind(this),
            0
          );
    },
    prepareProps: function prepareProps(a, b) {
      var c = {};
      return (
        assign(c, this.props),
        (c.style = this.prepareStyle(c, b)),
        (c.className = this.prepareClassName(c)),
        (c.itemStyleProps = getItemStyleProps(c, b)),
        (c.children = this.prepareChildren(c, b)),
        (c.scrollerProps = this.prepareScrollerProps(c)),
        c
      );
    },
    prepareScrollerProps: function prepareScrollerProps(a) {
      return assign({}, a.scrollerProps);
    },
    prepareChildren: function prepareChildren(a, b) {
      var c = a.children;
      return (
        a.items &&
          a.items.length &&
          (c = a.items.map(this.prepareItem.bind(this, a, b))),
        c
      );
    },
    prepareItem: prepareItem,
    prepareClassName: function prepareClassName(a) {
      var b = a.className || "";
      return (b += " z-menu"), b;
    },
    prepareStyle: function prepareStyle(a, b) {
      var c = a.subMenu ? a.defaultSubMenuStyle : null,
        d = assign({}, a.style, c, a.style, a.subMenuStyle);
      if (
        ((a.visible && (!a.items || a.items.length)) || (d.display = "none"),
        a.absolute && (d.position = "absolute"),
        a.at)
      ) {
        var e = Array.isArray(a.at),
          f = {
            left: e
              ? a.at[0]
              : void 0 === a.at.left ? a.at.x || a.at.pageX : a.at.left,
            top: e
              ? a.at[1]
              : void 0 === a.at.top ? a.at.y || a.at.pageY : a.at.top
          };
        assign(d, f);
      }
      return (
        b.style && assign(d, b.style),
        !this.didMount &&
          (a.constrainTo || a.alignTo) &&
          !a.subMenu &&
          ((d.visibility = "hidden"),
          (d.maxHeight = 0),
          (d.overflow = "hidden")),
        normalize(d)
      );
    }, /////////////// RENDERING LOGIC
    renderSubMenu: renderSubMenu,
    render: function render() {
      var a = this.state,
        b = this.prepareProps(this.props, a),
        c = this.renderSubMenu(b, a),
        d = this.renderChildren(b, a);
      return React.createElement(
        "div",
        b,
        c,
        React.createElement(
          ScrollContainer,
          {
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            scrollerProps: b.scrollerProps,
            ref: "scrollContainer",
            enableScroll: b.enableScroll,
            maxHeight: a.maxHeight || b.maxHeight
          },
          React.createElement(
            "table",
            { ref: "table", style: { borderSpacing: 0 } },
            React.createElement("tbody", null, d)
          )
        )
      );
    },
    renderChildren: renderChildren, ////////////////////////// BEHAVIOUR LOGIC
    handleMouseEnter: function handleMouseEnter() {
      this.setState({ mouseInside: !0 }), this.onActivate();
    },
    handleMouseLeave: function handleMouseLeave() {
      this.setState({ mouseInside: !1 }),
        this.state.menu || this.state.nextItem || this.onInactivate();
    },
    onActivate: function onActivate() {
      this.state.activated ||
        (this.setState({ activated: !0 }),
        (this.props.onActivate || emptyFn)());
    },
    onInactivate: function onInactivate() {
      this.state.activated &&
        (this.setState({ activated: !1 }), // console.log('inactivate')
        (this.props.onInactivate || emptyFn)());
    }, //we also need mouseOverSubMenu: Boolean
    //since when from a submenu we move back to a parent menu, we may move
    //to a different menu item than the one that triggered the submenu
    //so we should display another submenu
    handleSubMenuMouseEnter: function handleSubMenuMouseEnter() {
      this.setState({ mouseOverSubMenu: !0 });
    },
    handleSubMenuMouseLeave: function handleSubMenuMouseLeave() {
      this.setState({ mouseOverSubMenu: !1 });
    },
    isSubMenuActive: function isSubMenuActive() {
      return this.state.subMenuActive;
    },
    onSubMenuActivate: function onSubMenuActivate() {
      this.setState({ subMenuActive: !0 });
    },
    onSubMenuInactivate: function onSubMenuInactivate() {
      var a = +new Date(),
        b = this.state.nextItem,
        c = this.state.nextTimestamp || 0;
      this.setState({ subMenuActive: !1, timestamp: a }, function() {
        setTimeout(
          function() {
            return a != this.state.timestamp || (b && 100 > a - c)
              ? void this.setItem(this.state.nextItem, this.state.nextOffset)
              : void (!this.isSubMenuActive() && this.setItem());
          }.bind(this),
          10
        );
      });
    },
    removeMouseMoveListener: function removeMouseMoveListener() {
      this.onWindowMouseMove &&
        (window.removeEventListener("mousemove", this.onWindowMouseMove),
        (this.onWindowMouseMove = null));
    },
    onMenuItemMouseOut: function onMenuItemMouseOut(a, b) {
      this.state.menu && this.setupCheck(b);
    },
    /**
     * Called when mouseout happens on the item for which there is a submenu displayed
     */ onMenuItemMouseOver: function onMenuItemMouseOver(a, b) {
      if (this.didMount) {
        var c = a.menu;
        +new Date(),
          c && (this.state.menu ? this.setNextItem(a, b) : this.setItem(a, b));
      }
    },
    setupCheck: function setupCheck(a) {
      // + tolerance
      // - tolerance
      if (this.didMount) {
        var b = 5,
          c = (0, _reactDom.findDOMNode)(this),
          d = c.querySelector(".z-menu");
        if (d) {
          var e = Region.from(d),
            f = e.left,
            g = e.top,
            h = e.left,
            i = e.bottom;
          "left" == this.subMenuPosition && ((f = e.right), (h = e.right));
          var j = a.x + ("left" == this.subMenuPosition ? b : -b),
            k = a.y,
            l = [[f, g], [h, i], [j, k]];
          this.removeMouseMoveListener(),
            (this.onWindowMouseMove = function(m) {
              var n = [m.pageX, m.pageY];
              inTriangle(n, l) ||
                (this.removeMouseMoveListener(),
                !this.state.mouseOverSubMenu &&
                  this.setItem(this.state.nextItem, this.state.nextOffset));
            }.bind(this)),
            window.addEventListener("mousemove", this.onWindowMouseMove);
        }
      }
    },
    setNextItem: function setNextItem(a, b) {
      var c = +new Date();
      this.setState({
        timestamp: c,
        nextItem: a,
        nextOffset: b,
        nextTimestamp: +new Date()
      });
    },
    setItem: function setItem(a, b) {
      var c = a ? a.menu : null; // if (!menu){
      //     return
      // }
      this.removeMouseMoveListener();
      this.didMount &&
        (!c && !this.state.mouseInside && this.onInactivate(),
        this.setState({
          itemProps: a,
          menu: c,
          menuOffset: b,
          timestamp: +new Date(),
          nextItem: null,
          nextOffset: null,
          nextTimestamp: null
        }));
    },
    onMenuItemExpanderClick: function onMenuItemExpanderClick(a) {
      a.nativeEvent.expanderClick = !0;
    },
    onMenuItemClick: function onMenuItemClick(a, b, c) {
      var d = a.isPropagationStopped();
      if (
        (this.props.stopClickPropagation && a.stopPropagation(),
        hasTouch && b && a && a.nativeEvent && a.nativeEvent.expanderClick)
      ) {
        var e = { x: a.pageX, y: a.pageY },
          f = getMenuOffset(a.currentTarget);
        return void this.onMenuItemMouseOver(b, f, e);
      }
      d ||
        (b && (this.props.onClick || emptyFn)(a, b, c),
        this.onChildClick(a, b));
    },
    onChildClick: function onChildClick(a, b) {
      (this.props.onChildClick || emptyFn)(a, b),
        this.props.parentMenu && this.props.parentMenu.onChildClick(a, b);
    }
  });
(MenuClass.themes = require("./MenuItem/themes")), (module.exports = MenuClass);

