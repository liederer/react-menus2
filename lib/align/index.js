"use strict";var Region=require("region-align"),getConstrainRegion=require("./getConstrainRegion");module.exports=function(g,h,i,j){var k=getConstrainRegion.call(this,j);if(k)if("function"==typeof g.alignSubMenu)g.alignSubMenu(h,i,k);else{var l=h.alignTo(i,["tl-tr","bl-br","tr-tl","br-bl"],{constrain:k});return"tl-tr"==l||"tr-tl"==l//align downwards
?1//align upwards
:-1}};