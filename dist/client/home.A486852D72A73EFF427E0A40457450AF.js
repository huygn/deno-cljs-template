(function(){
'use strict';var Gn,Hn,Kn,Ln,In;Gn=function(a){return a+1};Hn=function(a){return a-1};Kn=function(a,b){a=new $APP.Y(null,2,5,$APP.zd,[$APP.Xm(a),b],null);a=$APP.T(a,0,null);b=$APP.qm(a);a=$APP.U.h(b,In);b=$APP.U.h(b,$APP.He);$APP.t(!1)&&$APP.t(Zo)&&(Zo.H?Zo.H():Zo.call(null));return $APP.Pn.createElement("button",{onClick:a,style:{margin:$APP.jn.C("4px",$APP.bc([$APP.kn,$APP.gn.h($APP.Wm,$APP.Le)]))}},b)};
Ln=function(){var a=$APP.Pn.useState(0),b=$APP.T(a,0,null),c=$APP.T(a,1,null);a=$APP.Pn.useCallback(function(){function d(h){return c.g?c.g(h):c.call(null,h)}var e=null,g=function(){function h(l,m){var n=null;if(1<arguments.length){n=0;for(var p=Array(arguments.length-1);n<p.length;)p[n]=arguments[n+1],++n;n=new $APP.F(p,0,null)}return k.call(this,l,n)}function k(l,m){return e.g(function(n){return $APP.Xc(l,n,m)})}h.M=1;h.R=function(l){var m=$APP.H(l);l=$APP.Jb(l);return k(m,l)};h.C=k;return h}();
e=function(h,k){switch(arguments.length){case 1:return d.call(this,h);default:var l=null;if(1<arguments.length){l=0;for(var m=Array(arguments.length-1);l<m.length;)m[l]=arguments[l+1],++l;l=new $APP.F(m,0,null)}return g.C(h,l)}throw Error("Invalid arity: "+arguments.length);};e.M=1;e.R=g.R;e.g=d;e.C=g.C;return e}(),[]);return new $APP.Y(null,2,5,$APP.zd,[b,a],null)};
$APP.xn=function(a){$APP.Xm(a);$APP.t(!1)&&$APP.t($o)&&($o.H?$o.H():$o.call(null));a=Ln();var b=$APP.T(a,0,null),c=$APP.T(a,1,null);a=$APP.Wo.j?$APP.Wo.j("h1",null,"Home page"):$APP.Wo.call(null,"h1",null,"Home page");var d=function(){var e=$APP.Pn.createElement(Kn,function(){return{"on-click":function(){return c.g?c.g(Hn):c.call(null,Hn)}}}(),"-");return $APP.dn($APP.Wo,"div",$APP.ic(e)?$APP.Do(e):null,$APP.ic(e)?new $APP.Y(null,2,5,$APP.zd,[$APP.dn($APP.Wo,"span",$APP.ic(b)?$APP.Do(b):null,$APP.ic(b)?
null:new $APP.Y(null,1,5,$APP.zd,[$APP.uo(b)],null)),$APP.uo($APP.Pn.createElement(Kn,function(){return{"on-click":function(){return c.g?c.g(Gn):c.call(null,Gn)}}}(),"+"))],null):new $APP.Y(null,3,5,$APP.zd,[$APP.uo(e),$APP.dn($APP.Wo,"span",$APP.ic(b)?$APP.Do(b):null,$APP.ic(b)?null:new $APP.Y(null,1,5,$APP.zd,[$APP.uo(b)],null)),$APP.uo($APP.Pn.createElement(Kn,function(){return{"on-click":function(){return c.g?c.g(Gn):c.call(null,Gn)}}}(),"+"))],null))}();return $APP.Wo.D?$APP.Wo.D($APP.Xo,null,
a,d):$APP.Wo.call(null,$APP.Xo,null,a,d)};In=new $APP.W(null,"on-click","on-click",1632826543);$APP.ak("home");if($APP.t(!1))var Zo=$APP.Zm();$APP.t(!1)&&($APP.t(Zo)&&(Zo.D?Zo.D(Kn,"",null,null):Zo.call(null,Kn,"",null,null)),$APP.Ym(Kn,"app.main/button"));if($APP.t(!1))var $o=$APP.Zm();$APP.t(!1)&&($APP.t($o)&&($o.D?$o.D($APP.xn,"(h/use-state 0)",null,null):$o.call(null,$APP.xn,"(h/use-state 0)",null,null)),$APP.Ym($APP.xn,"app.pages.home/page"));$APP.Zj.$c();
}).call(this);