"use strict";var React=require("react"),assign=require("object-assign"),getArrowStyle=require("arrow-style");function emptyFn(){}var SCROLLER_STYLE={left:0,right:0,position:"absolute",cursor:"pointer",zIndex:1};function generateArrowStyle(i,j,k){var l=assign({},k),m={color:l.color||i.arrowColor},n=4,o=l.width||i.arrowWidth||i.arrowSize||i.style.height-n,p=l.height||i.arrowHeight||i.arrowSize||i.style.height-n;return m.width=o,m.height=p,assign(l,getArrowStyle("top"==i.side?"up":"down",m)),l.display="inline-block",l.position="absolute",l.left="50%",l.marginLeft=-o,l.top="50%",l.marginTop=-p/2,j.active&&(l.marginTop+="top"==i.side?-1:1),l}var Scroller=React.createClass({displayName:"Scroller",display:"ReactMenuScroller",getInitialState:function(){return{}},getDefaultProps:function(){return{height:10,defaultStyle:{background:"white"},defaultOverStyle:{},overStyle:{},defaultTopStyle:{borderBottom:"1px solid gray"},topStyle:{},defaultBottomStyle:{borderTop:"1px solid gray"},bottomStyle:{},arrowColor:"gray",arrowStyle:{},defaultArrowStyle:{},defaultArrowOverStyle:{color:"rgb(74, 74, 74)"},arrowOverStyle:{}}},handleMouseEnter:function(){this.setState({mouseOver:!0})},handleMouseLeave:function(){this.setState({mouseOver:!1})},handleMouseDown:function(j){this.setState({active:!0}),(this.props.onMouseDown||emptyFn)(j)},handleMouseUp:function(j){this.setState({active:!1}),(this.props.onMouseUp||emptyFn)(j)},render:function(){var j=assign({},this.props,{onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave,onMouseDown:this.handleMouseDown,onMouseUp:this.handleMouseUp}),k=this.state,l=j.side;j.className=this.prepareClassName(j,k),j.style=this.prepareStyle(j,k);var m=this.prepareArrowStyle(j,k);return j.factory?j.factory(j,l):React.createElement("div",j,React.createElement("div",{style:m}))},prepareStyle:function(j,k){var l,m;k.mouseOver&&(m=j.overStyle,l=j.defaultOverStyle);var n="top"==j.side?j.defaultTopStyle:j.defaultBottomStyle,o="top"==j.side?j.topStyle:j.bottomStyle,p=assign({},SCROLLER_STYLE,j.defaultStyle,n,l,j.style,o,m);return p.height=p.height||j.height,p[j.side]=0,j.visible||(p.display="none"),p},prepareClassName:function(j){//className
var k=j.className||"";return k+=" z-menu-scroller "+j.side,j.active&&j.visible&&(k+=" active"),k},prepareArrowStyle:function(j,k){var l,m;k.mouseOver&&(l=j.defaultArrowOverStyle,m=j.arrowOverStyle);var n=assign({},j.defaultArrowStyle,l,j.arrowStyle,m);return generateArrowStyle(j,k,n)},handleClick:function(j){j.stopPropagation}});module.exports=Scroller;