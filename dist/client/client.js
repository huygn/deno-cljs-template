
import { $APP, shadow$provide, $jscomp } from "./shared.js";
let ex_client_hydrate;
let ex_client_render;
let ex_client_getNavHelper;
shadow$provide[1]=function(g,h,d,e){d.exports=ReactDOM};
shadow$provide[2]=function(g,h,d,e){var f=function(c){return c?"A"===c.tagName?c:f(c.parentElement):null};e.findAnchorTag=f;e.getNavHelper=function(c){return function(b){if(!(0!==b.button||b.ctrlKey||b.shiftKey||b.altKey||b.metaKey)){var a=f(b.target);a&&"_blank"!==a.target&&"_external"!==a.target&&"external"!==a.rel&&!a.hasAttribute("download")&&(a=-1!==a.href.indexOf(location.protocol+"//"+location.host)?a.href.split(location.host,2)[1]:null)&&(b.preventDefault(),c(a))}}}};
'use strict';var Ig=function(a,b){a=new $APP.Y(null,2,5,$APP.zd,[$APP.Ie(a),b],null);a=$APP.T(a,0,null);a=$APP.bd(a);a=$APP.U.h(a,$APP.He);$APP.t(!1)&&$APP.t(Cg)&&(Cg.H?Cg.H():Cg.call(null));return $APP.of.createElement($APP.fi,null,$APP.of.createElement("header",null,$APP.of.createElement("nav",null,$APP.of.createElement("a",{href:"/",style:{marginRight:$APP.Ff.C("8px",$APP.bc([$APP.Bg,$APP.ni.h($APP.li,$APP.Le)]))}},"Home"),$APP.of.createElement("a",{href:"/about"},"About"))),a)};var mi=$APP.mf(1,{});var oi=$APP.mf(2,{});if($APP.t(!1))var Cg=$APP.Ke();$APP.t(!1)&&($APP.t(Cg)&&(Cg.D?Cg.D(Ig,"",null,null):Cg.call(null,Ig,"",null,null)),$APP.Kg(Ig,"app.pages.layout/layout"));var Jg=oi.getNavHelper;ex_client_hydrate=function(a,b){return mi.hydrate($APP.of.createElement(Ig,null,$APP.of.createElement(a,null)),b)};ex_client_render=function(a,b){return mi.render($APP.of.createElement(Ig,null,$APP.of.createElement(a,null)),b)};ex_client_getNavHelper=Jg;
export { ex_client_hydrate as hydrate };
export { ex_client_render as render };
export { ex_client_getNavHelper as getNavHelper };
export { $APP, shadow$provide, $jscomp };
