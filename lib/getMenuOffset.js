"use strict";var Region=require("region-align"),selectParent=require("select-parent");module.exports=function(d){var e=Region.from(selectParent(".z-menu",d)),f=Region.from(d);return{// pageX : thisRegion.left,
// pageY : thisRegion.top,
left:f.left-e.left,top:f.top-e.top,width:f.width,height:f.height}};