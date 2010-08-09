(function(){ 

if (!this.window) window = this;

if (!window.navigator) window.navigator = {userAgent: "", product: "", cpuClass: ""}; 

if (!window.qx) window.qx = {};
  
if (!this.qxsettings) qxsettings = {};
var settings = {"qx.globalErrorHandling":"off"};
for (var k in settings) qxsettings[k] = settings[k];

qx.$$packageData = {};
qx.$$loader = {};
})();

qx.$$packageData['ae608328577a']={"locales":{},"resources":{},"translations":{}};
(function(){var bI="toString",bH=".",bG="default",bF="Object",bE='"',bD="Array",bC="()",bB="String",bA="Function",bz=".prototype",ci="function",ch="Boolean",cg="Error",cf="constructor",ce="warn",cd="hasOwnProperty",cc="string",cb="toLocaleString",ca="RegExp",bY='\", "',bP="info",bQ="BROKEN_IE",bN="isPrototypeOf",bO="Date",bL="",bM="qx.Bootstrap",bJ="]",bK="Class",bR="error",bS="[Class ",bU="valueOf",bT="Number",bW="count",bV="debug",bX="ES5";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return bS+this.classname+bJ;
},createNamespace:function(name,I){var K=name.split(bH);
var parent=window;
var J=K[0];

for(var i=0,L=K.length-1;i<L;i++,J=K[i]){if(!parent[J]){parent=parent[J]={};
}else{parent=parent[J];
}}parent[J]=I;
return J;
},setDisplayName:function(u,v,name){u.displayName=v+bH+name+bC;
},setDisplayNames:function(bu,bv){for(var name in bu){var bw=bu[name];

if(bw instanceof Function){bw.displayName=bv+bH+name+bC;
}}},define:function(name,Y){if(!Y){var Y={statics:{}};
}var be;
var bc=null;
qx.Bootstrap.setDisplayNames(Y.statics,name);

if(Y.members||Y.extend){qx.Bootstrap.setDisplayNames(Y.members,name+bz);
be=Y.construct||new Function;

if(Y.extend){this.extendClass(be,be,Y.extend,name,bd);
}var ba=Y.statics||{};
for(var i=0,bf=qx.Bootstrap.getKeys(ba),l=bf.length;i<l;i++){var bg=bf[i];
be[bg]=ba[bg];
}bc=be.prototype;
var bb=Y.members||{};
for(var i=0,bf=qx.Bootstrap.getKeys(bb),l=bf.length;i<l;i++){var bg=bf[i];
bc[bg]=bb[bg];
}}else{be=Y.statics||{};
}var bd=this.createNamespace(name,be);
be.name=be.classname=name;
be.basename=bd;
be.$$type=bK;
if(!be.hasOwnProperty(bI)){be.toString=this.genericToString;
}if(Y.defer){Y.defer(be,bc);
}qx.Bootstrap.$$registry[name]=Y.statics;
return be;
}};
qx.Bootstrap.define(bM,{statics:{LOADSTART:qx.$$start||new Date(),createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(bn,bo,bp,name,bq){var bt=bp.prototype;
var bs=new Function;
bs.prototype=bt;
var br=new bs;
bn.prototype=br;
br.name=br.classname=name;
br.basename=bq;
bo.base=bn.superclass=bp;
bo.self=bn.constructor=br.constructor=bn;
},getByName:function(name){return qx.Bootstrap.$$registry[name];
},$$registry:{},objectGetLength:({"count":function(t){return t.__count__;
},"default":function(B){var length=0;

for(var C in B){length++;
}return length;
}})[(({}).__count__==0)?bW:bG],objectMergeWith:function(n,o,p){if(p===undefined){p=true;
}
for(var q in o){if(p||n[q]===undefined){n[q]=o[q];
}}return n;
},__a:[bN,cd,cb,bI,bU,cf],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(w){var x=[];
var z=Object.prototype.hasOwnProperty;

for(var A in w){if(z.call(w,A)){x.push(A);
}}var y=qx.Bootstrap.__a;

for(var i=0,a=y,l=a.length;i<l;i++){if(z.call(w,a[i])){x.push(a[i]);
}}return x;
},"default":function(h){var j=[];
var k=Object.prototype.hasOwnProperty;

for(var m in h){if(k.call(h,m)){j.push(m);
}}return j;
}})[typeof (Object.keys)==
ci?bX:
(function(){for(var ck in {toString:1}){return ck;
}})()!==bI?bQ:bG],getKeysAsString:function(bi){var bj=qx.Bootstrap.getKeys(bi);

if(bj.length==0){return bL;
}return bE+bj.join(bY)+bE;
},__b:{"[object String]":bB,"[object Array]":bD,"[object Object]":bF,"[object RegExp]":ca,"[object Number]":bT,"[object Boolean]":ch,"[object Date]":bO,"[object Function]":bA,"[object Error]":cg},bind:function(e,self,f){var g=Array.prototype.slice.call(arguments,2,arguments.length);
return function(){var N=Array.prototype.slice.call(arguments,0,arguments.length);
return e.apply(self,g.concat(N));
};
},firstUp:function(s){return s.charAt(0).toUpperCase()+s.substr(1);
},firstLow:function(bh){return bh.charAt(0).toLowerCase()+bh.substr(1);
},getClass:function(V){var W=Object.prototype.toString.call(V);
return (qx.Bootstrap.__b[W]||W.slice(8,-1));
},isString:function(M){return (M!==null&&(typeof M===cc||qx.Bootstrap.getClass(M)==bB||M instanceof String||(!!M&&!!M.$$isString)));
},isArray:function(U){return (U!==null&&(U instanceof Array||(U&&qx.data&&qx.data.IListData&&qx.Bootstrap.hasInterface(U.constructor,qx.data.IListData))||qx.Bootstrap.getClass(U)==bD||(!!U&&!!U.$$isArray)));
},isObject:function(r){return (r!==undefined&&r!==null&&qx.Bootstrap.getClass(r)==bF);
},isFunction:function(H){return qx.Bootstrap.getClass(H)==bA;
},classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;
},getPropertyDefinition:function(bk,name){while(bk){if(bk.$$properties&&bk.$$properties[name]){return bk.$$properties[name];
}bk=bk.superclass;
}return null;
},hasProperty:function(P,name){return !!qx.Bootstrap.getPropertyDefinition(P,name);
},getEventType:function(cj,name){var cj=cj.constructor;

while(cj.superclass){if(cj.$$events&&cj.$$events[name]!==undefined){return cj.$$events[name];
}cj=cj.superclass;
}return null;
},supportsEvent:function(O,name){return !!qx.Bootstrap.getEventType(O,name);
},getByInterface:function(b,c){var d,i,l;

while(b){if(b.$$implements){d=b.$$flatImplements;

for(i=0,l=d.length;i<l;i++){if(d[i]===c){return b;
}}}b=b.superclass;
}return null;
},hasInterface:function(bx,by){return !!qx.Bootstrap.getByInterface(bx,by);
},getMixins:function(S){var T=[];

while(S){if(S.$$includes){T.push.apply(T,S.$$flatIncludes);
}S=S.superclass;
}return T;
},$$logs:[],debug:function(D,E){qx.Bootstrap.$$logs.push([bV,arguments]);
},info:function(bl,bm){qx.Bootstrap.$$logs.push([bP,arguments]);
},warn:function(F,G){qx.Bootstrap.$$logs.push([ce,arguments]);
},error:function(Q,R){qx.Bootstrap.$$logs.push([bR,arguments]);
},trace:function(X){}}});
})();
(function(){var h="qx.allowUrlSettings",g="&",f="qx.core.Setting",e="qx.allowUrlVariants",d="qx.propertyDebugLevel",c="qxsetting",b=":",a=".";
qx.Bootstrap.define(f,{statics:{__c:{},define:function(k,l){if(l===undefined){throw new Error('Default value of setting "'+k+'" must be defined!');
}
if(!this.__c[k]){this.__c[k]={};
}else if(this.__c[k].defaultValue!==undefined){throw new Error('Setting "'+k+'" is already defined!');
}this.__c[k].defaultValue=l;
},get:function(m){var n=this.__c[m];

if(n===undefined){throw new Error('Setting "'+m+'" is not defined.');
}
if(n.value!==undefined){return n.value;
}return n.defaultValue;
},set:function(r,s){if((r.split(a)).length<2){throw new Error('Malformed settings key "'+r+'". Must be following the schema "namespace.key".');
}
if(!this.__c[r]){this.__c[r]={};
}this.__c[r].value=s;
},__d:function(){if(window.qxsettings){for(var t in window.qxsettings){this.set(t,window.qxsettings[t]);
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(j){}this.__e();
}},__e:function(){if(this.get(h)!=true){return;
}var q=document.location.search.slice(1).split(g);

for(var i=0;i<q.length;i++){var p=q[i].split(b);

if(p.length!=3||p[0]!=c){continue;
}this.set(p[1],decodeURIComponent(p[2]));
}}},defer:function(o){o.define(h,false);
o.define(e,false);
o.define(d,0);
o.__d();
}});
})();
(function(){var h="function",g="Boolean",f="qx.Interface",e="]",d="toggle",c="Interface",b="is",a="[Interface ";
qx.Bootstrap.define(f,{statics:{define:function(name,r){if(r){if(r.extend&&!(r.extend instanceof Array)){r.extend=[r.extend];
}{};
var s=r.statics?r.statics:{};
if(r.extend){s.$$extends=r.extend;
}
if(r.properties){s.$$properties=r.properties;
}
if(r.members){s.$$members=r.members;
}
if(r.events){s.$$events=r.events;
}}else{var s={};
}s.$$type=c;
s.name=name;
s.toString=this.genericToString;
s.basename=qx.Bootstrap.createNamespace(name,s);
qx.Interface.$$registry[name]=s;
return s;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(t){if(!t){return [];
}var u=t.concat();

for(var i=0,l=t.length;i<l;i++){if(t[i].$$extends){u.push.apply(u,this.flatten(t[i].$$extends));
}}return u;
},__f:function(I,J,K,L){var P=K.$$members;

if(P){for(var O in P){if(qx.Bootstrap.isFunction(P[O])){var N=this.__g(J,O);
var M=N||qx.Bootstrap.isFunction(I[O]);

if(!M){throw new Error('Implementation of method "'+O+'" is missing in class "'+J.classname+'" required by interface "'+K.name+'"');
}var Q=L===true&&!N&&!qx.Bootstrap.hasInterface(J,K);

if(Q){I[O]=this.__j(K,I[O],O,P[O]);
}}else{if(typeof I[O]===undefined){if(typeof I[O]!==h){throw new Error('Implementation of member "'+O+'" is missing in class "'+J.classname+'" required by interface "'+K.name+'"');
}}}}}},__g:function(v,w){var A=w.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!A){return false;
}var x=qx.Bootstrap.firstLow(A[2]);
var y=qx.Bootstrap.getPropertyDefinition(v,x);

if(!y){return false;
}var z=A[0]==b||A[0]==d;

if(z){return qx.Bootstrap.getPropertyDefinition(v,x).check==g;
}return true;
},__h:function(j,k){if(k.$$properties){for(var m in k.$$properties){if(!qx.Bootstrap.getPropertyDefinition(j,m)){throw new Error('The property "'+m+'" is not supported by Class "'+j.classname+'"!');
}}}},__i:function(F,G){if(G.$$events){for(var H in G.$$events){if(!qx.Bootstrap.supportsEvent(F,H)){throw new Error('The event "'+H+'" is not supported by Class "'+F.classname+'"!');
}}}},assertObject:function(n,o){var q=n.constructor;
this.__f(n,q,o,false);
this.__h(q,o);
this.__i(q,o);
var p=o.$$extends;

if(p){for(var i=0,l=p.length;i<l;i++){this.assertObject(n,p[i]);
}}},assert:function(B,C,D){this.__f(B.prototype,B,C,D);
this.__h(B,C);
this.__i(B,C);
var E=C.$$extends;

if(E){for(var i=0,l=E.length;i<l;i++){this.assert(B,E[i],D);
}}},genericToString:function(){return a+this.name+e;
},$$registry:{},__j:function(){},__k:null,__l:function(){}}});
})();
(function(){var g="qx.Mixin",f=".prototype",e="constructor",d="[Mixin ",c="]",b="destruct",a="Mixin";
qx.Bootstrap.define(g,{statics:{define:function(name,u){if(u){if(u.include&&!(u.include instanceof Array)){u.include=[u.include];
}{};
var w=u.statics?u.statics:{};
qx.Bootstrap.setDisplayNames(w,name);

for(var v in w){if(w[v] instanceof Function){w[v].$$mixin=w;
}}if(u.construct){w.$$constructor=u.construct;
qx.Bootstrap.setDisplayName(u.construct,name,e);
}
if(u.include){w.$$includes=u.include;
}
if(u.properties){w.$$properties=u.properties;
}
if(u.members){w.$$members=u.members;
qx.Bootstrap.setDisplayNames(u.members,name+f);
}
for(var v in w.$$members){if(w.$$members[v] instanceof Function){w.$$members[v].$$mixin=w;
}}
if(u.events){w.$$events=u.events;
}
if(u.destruct){w.$$destructor=u.destruct;
qx.Bootstrap.setDisplayName(u.destruct,name,b);
}}else{var w={};
}w.$$type=a;
w.name=name;
w.toString=this.genericToString;
w.basename=qx.Bootstrap.createNamespace(name,w);
this.$$registry[name]=w;
return w;
},checkCompatibility:function(m){var p=this.flatten(m);
var q=p.length;

if(q<2){return true;
}var t={};
var s={};
var r={};
var o;

for(var i=0;i<q;i++){o=p[i];

for(var n in o.events){if(r[n]){throw new Error('Conflict between mixin "'+o.name+'" and "'+r[n]+'" in member "'+n+'"!');
}r[n]=o.name;
}
for(var n in o.properties){if(t[n]){throw new Error('Conflict between mixin "'+o.name+'" and "'+t[n]+'" in property "'+n+'"!');
}t[n]=o.name;
}
for(var n in o.members){if(s[n]){throw new Error('Conflict between mixin "'+o.name+'" and "'+s[n]+'" in member "'+n+'"!');
}s[n]=o.name;
}}return true;
},isCompatible:function(h,j){var k=qx.Bootstrap.getMixins(j);
k.push(h);
return qx.Mixin.checkCompatibility(k);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(x){if(!x){return [];
}var y=x.concat();

for(var i=0,l=x.length;i<l;i++){if(x[i].$$includes){y.push.apply(y,this.flatten(x[i].$$includes));
}}return y;
},genericToString:function(){return d+this.name+c;
},$$registry:{},__m:null,__n:function(){}}});
})();
(function(){var cd=';',cc='return this.',cb="string",ca="boolean",bY="",bX="setThemed",bW='!==undefined)',bV="this.",bU="set",bT="resetThemed",bI="setRuntime",bH="init",bG='else if(this.',bF="resetRuntime",bE="reset",bD="();",bC='else ',bB='if(this.',bA="return this.",bz="get",ck=";",cl="(a[",ci=' of an instance of ',cj="refresh",cg=' is not (yet) ready!");',ch="]);",ce='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',cf='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',cm='value !== null && value.nodeType === 9 && value.documentElement',cn='value !== null && value.$$type === "Mixin"',bM='return init;',bL='var init=this.',bO='value !== null && value.nodeType === 1 && value.attributes',bN="var parent = this.getLayoutParent();",bQ="Error in property ",bP='qx.core.Assert.assertInstance(value, Date, msg) || true',bS="if (!parent) return;",bR=" in method ",bK='qx.core.Assert.assertInstance(value, Error, msg) || true',bJ='Undefined value is not allowed!',D="inherit",E='Is invalid!',F="MSIE 6.0",G="': ",H=" of class ",I='value !== null && value.nodeType !== undefined',J='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',K='qx.core.Assert.assertPositiveInteger(value, msg) || true',L='if(init==qx.core.Property.$$inherit)init=null;',M='value !== null && value.$$type === "Interface"',cr='var inherit=prop.$$inherit;',cq="var value = parent.",cp="$$useinit_",co="(value);",cv="$$runtime_",cu='Requires exactly one argument!',ct="$$user_",cs='qx.core.Assert.assertArray(value, msg) || true',cx='qx.core.Assert.assertPositiveNumber(value, msg) || true',cw=".prototype",bj="Boolean",bk='return value;',bh='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',bi='Does not allow any arguments!',bn="()",bo="var a=arguments[0] instanceof Array?arguments[0]:arguments;",bl='value !== null && value.$$type === "Theme"',bm="())",bf='return null;',bg='qx.core.Assert.assertObject(value, msg) || true',U='qx.core.Assert.assertString(value, msg) || true',T="if (value===undefined) value = parent.",W='value !== null && value.$$type === "Class"',V='qx.core.Assert.assertFunction(value, msg) || true',Q="object",P="$$init_",S="$$theme_",R='qx.core.Assert.assertMap(value, msg) || true',O='qx.core.Assert.assertNumber(value, msg) || true',N='Null value is not allowed!',bt='qx.core.Assert.assertInteger(value, msg) || true',bu="value",bv="rv:1.8.1",bw="shorthand",bp='qx.core.Assert.assertInstance(value, RegExp, msg) || true',bq='value !== null && value.type !== undefined',br='value !== null && value.document',bs='throw new Error("Property ',bx="(!this.",by='qx.core.Assert.assertBoolean(value, msg) || true',be="toggle",bd="$$inherit_",bc=" with incoming value '",bb="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));",ba="qx.core.Property",Y="is",X='Could not change or apply init value after constructing phase!';
qx.Bootstrap.define(ba,{statics:{__o:{"Boolean":by,"String":U,"Number":O,"Integer":bt,"PositiveNumber":cx,"PositiveInteger":K,"Error":bK,"RegExp":bp,"Object":bg,"Array":cs,"Map":R,"Function":V,"Date":bP,"Node":I,"Element":bO,"Document":cm,"Window":br,"Event":bq,"Class":W,"Mixin":cn,"Interface":M,"Theme":bl,"Color":ce,"Decorator":J,"Font":cf},__p:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:D,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:cb,dereference:ca,inheritable:ca,nullable:ca,themeable:ca,refine:ca,init:null,apply:cb,event:cb,check:null,transform:cb,deferredInit:ca,validate:null},$$allowedGroupKeys:{name:cb,group:Q,mode:cb,themeable:ca},$$inheritable:{},__q:function(dc){var dd=this.__r(dc);

if(!dd.length){var de=qx.lang.Function.empty;
}else{de=this.__s(dd);
}dc.prototype.$$refreshInheritables=de;
},__r:function(cS){var cU=[];

while(cS){var cT=cS.$$properties;

if(cT){for(var name in this.$$inheritable){if(cT[name]&&cT[name].inheritable){cU.push(name);
}}}cS=cS.superclass;
}return cU;
},__s:function(cB){var cF=this.$$store.inherit;
var cE=this.$$store.init;
var cD=this.$$method.refresh;
var cC=[bN,bS];

for(var i=0,l=cB.length;i<l;i++){var name=cB[i];
cC.push(cq,cF[name],ck,T,cE[name],ck,bV,cD[name],co);
}return new Function(cC.join(bY));
},attachRefreshInheritables:function(q){q.prototype.$$refreshInheritables=function(){qx.core.Property.__q(q);
return this.$$refreshInheritables();
};
},attachMethods:function(w,name,x){x.group?this.__t(w,x,name):this.__u(w,x,name);
},__t:function(dk,dl,name){var dt=qx.Bootstrap.firstUp(name);
var ds=dk.prototype;
var du=dl.themeable===true;
{};
var dv=[];
var dp=[];

if(du){var dm=[];
var dr=[];
}var dq=bo;
dv.push(dq);

if(du){dm.push(dq);
}
if(dl.mode==bw){var dn=bb;
dv.push(dn);

if(du){dm.push(dn);
}}
for(var i=0,a=dl.group,l=a.length;i<l;i++){{};
dv.push(bV,this.$$method.set[a[i]],cl,i,ch);
dp.push(bV,this.$$method.reset[a[i]],bD);

if(du){{};
dm.push(bV,this.$$method.setThemed[a[i]],cl,i,ch);
dr.push(bV,this.$$method.resetThemed[a[i]],bD);
}}this.$$method.set[name]=bU+dt;
ds[this.$$method.set[name]]=new Function(dv.join(bY));
this.$$method.reset[name]=bE+dt;
ds[this.$$method.reset[name]]=new Function(dp.join(bY));

if(du){this.$$method.setThemed[name]=bX+dt;
ds[this.$$method.setThemed[name]]=new Function(dm.join(bY));
this.$$method.resetThemed[name]=bT+dt;
ds[this.$$method.resetThemed[name]]=new Function(dr.join(bY));
}},__u:function(cG,cH,name){var cJ=qx.Bootstrap.firstUp(name);
var cL=cG.prototype;
{};
if(cH.dereference===undefined&&typeof cH.check===cb){cH.dereference=this.__v(cH.check);
}var cK=this.$$method;
var cI=this.$$store;
cI.runtime[name]=cv+name;
cI.user[name]=ct+name;
cI.theme[name]=S+name;
cI.init[name]=P+name;
cI.inherit[name]=bd+name;
cI.useinit[name]=cp+name;
cK.get[name]=bz+cJ;
cL[cK.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,cG,name,bz);
};
cK.set[name]=bU+cJ;
cL[cK.set[name]]=function(y){return qx.core.Property.executeOptimizedSetter(this,cG,name,bU,arguments);
};
cK.reset[name]=bE+cJ;
cL[cK.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cG,name,bE);
};

if(cH.inheritable||cH.apply||cH.event||cH.deferredInit){cK.init[name]=bH+cJ;
cL[cK.init[name]]=function(p){return qx.core.Property.executeOptimizedSetter(this,cG,name,bH,arguments);
};
}
if(cH.inheritable){cK.refresh[name]=cj+cJ;
cL[cK.refresh[name]]=function(u){return qx.core.Property.executeOptimizedSetter(this,cG,name,cj,arguments);
};
}cK.setRuntime[name]=bI+cJ;
cL[cK.setRuntime[name]]=function(z){return qx.core.Property.executeOptimizedSetter(this,cG,name,bI,arguments);
};
cK.resetRuntime[name]=bF+cJ;
cL[cK.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cG,name,bF);
};

if(cH.themeable){cK.setThemed[name]=bX+cJ;
cL[cK.setThemed[name]]=function(df){return qx.core.Property.executeOptimizedSetter(this,cG,name,bX,arguments);
};
cK.resetThemed[name]=bT+cJ;
cL[cK.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cG,name,bT);
};
}
if(cH.check===bj){cL[be+cJ]=new Function(bA+cK.set[name]+bx+cK.get[name]+bm);
cL[Y+cJ]=new Function(bA+cK.get[name]+bn);
}},__v:function(v){return !!this.__p[v];
},__w:function(cV){return this.__p[cV]||qx.Bootstrap.classIsDefined(cV)||(qx.Interface&&qx.Interface.isDefined(cV));
},__x:{0:X,1:cu,2:bJ,3:bi,4:N,5:E},error:function(dJ,dK,dL,dM,dN){var dO=dJ.constructor.classname;
var dP=bQ+dL+H+dO+bR+this.$$method[dM][dL]+bc+dN+G;
throw new Error(dP+(this.__x[dK]||"Unknown reason: "+dK));
},__y:function(dA,dB,name,dC,dD,dE){var dF=this.$$method[dC][name];
{dB[dF]=new Function(bu,dD.join(bY));
};
{};
qx.Bootstrap.setDisplayName(dB[dF],dA.classname+cw,dF);
if(dE===undefined){return dA[dF]();
}else{return dA[dF](dE[0]);
}},executeOptimizedGetter:function(dQ,dR,name,dS){var dU=dR.$$properties[name];
var dW=dR.prototype;
var dT=[];
var dV=this.$$store;
dT.push(bB,dV.runtime[name],bW);
dT.push(cc,dV.runtime[name],cd);

if(dU.inheritable){dT.push(bG,dV.inherit[name],bW);
dT.push(cc,dV.inherit[name],cd);
dT.push(bC);
}dT.push(bB,dV.user[name],bW);
dT.push(cc,dV.user[name],cd);

if(dU.themeable){dT.push(bG,dV.theme[name],bW);
dT.push(cc,dV.theme[name],cd);
}
if(dU.deferredInit&&dU.init===undefined){dT.push(bG,dV.init[name],bW);
dT.push(cc,dV.init[name],cd);
}dT.push(bC);

if(dU.init!==undefined){if(dU.inheritable){dT.push(bL,dV.init[name],cd);

if(dU.nullable){dT.push(L);
}else if(dU.init!==undefined){dT.push(cc,dV.init[name],cd);
}else{dT.push(bh,name,ci,dR.classname,cg);
}dT.push(bM);
}else{dT.push(cc,dV.init[name],cd);
}}else if(dU.inheritable||dU.nullable){dT.push(bf);
}else{dT.push(bs,name,ci,dR.classname,cg);
}return this.__y(dQ,dW,name,dS,dT);
},executeOptimizedSetter:function(b,c,name,d,e){var k=c.$$properties[name];
var j=c.prototype;
var g=[];
var f=d===bU||d===bX||d===bI||(d===bH&&k.init===undefined);
var h=k.apply||k.event||k.inheritable;
var m=this.__z(d,name);
this.__A(g,k,name,d,f);

if(f){this.__B(g,c,k,name);
}
if(h){this.__C(g,f,m,d);
}
if(k.inheritable){g.push(cr);
}{};

if(!h){this.__E(g,name,d,f);
}else{this.__F(g,k,name,d,f);
}
if(k.inheritable){this.__G(g,k,name,d);
}else if(h){this.__H(g,k,name,d);
}
if(h){this.__I(g,k,name);
if(k.inheritable&&j._getChildren){this.__J(g,name);
}}if(f){g.push(bk);
}return this.__y(b,j,name,d,g,e);
},__z:function(n,name){if(n===bI||n===bF){var o=this.$$store.runtime[name];
}else if(n===bX||n===bT){o=this.$$store.theme[name];
}else if(n===bH){o=this.$$store.init[name];
}else{o=this.$$store.user[name];
}return o;
},__A:function(dg,dh,name,di,dj){{if(!dh.nullable||dh.check||dh.inheritable){dg.push('var prop=qx.core.Property;');
}if(di==="set"){dg.push('if(value===undefined)prop.error(this,2,"',name,'","',di,'",value);');
}};
},__B:function(dG,dH,dI,name){if(dI.transform){dG.push('value=this.',dI.transform,'(value);');
}if(dI.validate){if(typeof dI.validate==="string"){dG.push('this.',dI.validate,'(value);');
}else if(dI.validate instanceof Function){dG.push(dH.classname,'.$$properties.',name);
dG.push('.validate.call(this, value);');
}}},__C:function(cN,cO,cP,cQ){var cR=(cQ==="reset"||cQ==="resetThemed"||cQ==="resetRuntime");

if(cO){cN.push('if(this.',cP,'===value)return value;');
}else if(cR){cN.push('if(this.',cP,'===undefined)return;');
}},__D:undefined,__E:function(A,name,B,C){if(B==="setRuntime"){A.push('this.',this.$$store.runtime[name],'=value;');
}else if(B==="resetRuntime"){A.push('if(this.',this.$$store.runtime[name],'!==undefined)');
A.push('delete this.',this.$$store.runtime[name],';');
}else if(B==="set"){A.push('this.',this.$$store.user[name],'=value;');
}else if(B==="reset"){A.push('if(this.',this.$$store.user[name],'!==undefined)');
A.push('delete this.',this.$$store.user[name],';');
}else if(B==="setThemed"){A.push('this.',this.$$store.theme[name],'=value;');
}else if(B==="resetThemed"){A.push('if(this.',this.$$store.theme[name],'!==undefined)');
A.push('delete this.',this.$$store.theme[name],';');
}else if(B==="init"&&C){A.push('this.',this.$$store.init[name],'=value;');
}},__F:function(dw,dx,name,dy,dz){if(dx.inheritable){dw.push('var computed, old=this.',this.$$store.inherit[name],';');
}else{dw.push('var computed, old;');
}dw.push('if(this.',this.$$store.runtime[name],'!==undefined){');

if(dy==="setRuntime"){dw.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(dy==="resetRuntime"){dw.push('delete this.',this.$$store.runtime[name],';');
dw.push('if(this.',this.$$store.user[name],'!==undefined)');
dw.push('computed=this.',this.$$store.user[name],';');
dw.push('else if(this.',this.$$store.theme[name],'!==undefined)');
dw.push('computed=this.',this.$$store.theme[name],';');
dw.push('else if(this.',this.$$store.init[name],'!==undefined){');
dw.push('computed=this.',this.$$store.init[name],';');
dw.push('this.',this.$$store.useinit[name],'=true;');
dw.push('}');
}else{dw.push('old=computed=this.',this.$$store.runtime[name],';');
if(dy==="set"){dw.push('this.',this.$$store.user[name],'=value;');
}else if(dy==="reset"){dw.push('delete this.',this.$$store.user[name],';');
}else if(dy==="setThemed"){dw.push('this.',this.$$store.theme[name],'=value;');
}else if(dy==="resetThemed"){dw.push('delete this.',this.$$store.theme[name],';');
}else if(dy==="init"&&dz){dw.push('this.',this.$$store.init[name],'=value;');
}}dw.push('}');
dw.push('else if(this.',this.$$store.user[name],'!==undefined){');

if(dy==="set"){if(!dx.inheritable){dw.push('old=this.',this.$$store.user[name],';');
}dw.push('computed=this.',this.$$store.user[name],'=value;');
}else if(dy==="reset"){if(!dx.inheritable){dw.push('old=this.',this.$$store.user[name],';');
}dw.push('delete this.',this.$$store.user[name],';');
dw.push('if(this.',this.$$store.runtime[name],'!==undefined)');
dw.push('computed=this.',this.$$store.runtime[name],';');
dw.push('if(this.',this.$$store.theme[name],'!==undefined)');
dw.push('computed=this.',this.$$store.theme[name],';');
dw.push('else if(this.',this.$$store.init[name],'!==undefined){');
dw.push('computed=this.',this.$$store.init[name],';');
dw.push('this.',this.$$store.useinit[name],'=true;');
dw.push('}');
}else{if(dy==="setRuntime"){dw.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(dx.inheritable){dw.push('computed=this.',this.$$store.user[name],';');
}else{dw.push('old=computed=this.',this.$$store.user[name],';');
}if(dy==="setThemed"){dw.push('this.',this.$$store.theme[name],'=value;');
}else if(dy==="resetThemed"){dw.push('delete this.',this.$$store.theme[name],';');
}else if(dy==="init"&&dz){dw.push('this.',this.$$store.init[name],'=value;');
}}dw.push('}');
if(dx.themeable){dw.push('else if(this.',this.$$store.theme[name],'!==undefined){');

if(!dx.inheritable){dw.push('old=this.',this.$$store.theme[name],';');
}
if(dy==="setRuntime"){dw.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(dy==="set"){dw.push('computed=this.',this.$$store.user[name],'=value;');
}else if(dy==="setThemed"){dw.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(dy==="resetThemed"){dw.push('delete this.',this.$$store.theme[name],';');
dw.push('if(this.',this.$$store.init[name],'!==undefined){');
dw.push('computed=this.',this.$$store.init[name],';');
dw.push('this.',this.$$store.useinit[name],'=true;');
dw.push('}');
}else if(dy==="init"){if(dz){dw.push('this.',this.$$store.init[name],'=value;');
}dw.push('computed=this.',this.$$store.theme[name],';');
}else if(dy==="refresh"){dw.push('computed=this.',this.$$store.theme[name],';');
}dw.push('}');
}dw.push('else if(this.',this.$$store.useinit[name],'){');

if(!dx.inheritable){dw.push('old=this.',this.$$store.init[name],';');
}
if(dy==="init"){if(dz){dw.push('computed=this.',this.$$store.init[name],'=value;');
}else{dw.push('computed=this.',this.$$store.init[name],';');
}}else if(dy==="set"||dy==="setRuntime"||dy==="setThemed"||dy==="refresh"){dw.push('delete this.',this.$$store.useinit[name],';');

if(dy==="setRuntime"){dw.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(dy==="set"){dw.push('computed=this.',this.$$store.user[name],'=value;');
}else if(dy==="setThemed"){dw.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(dy==="refresh"){dw.push('computed=this.',this.$$store.init[name],';');
}}dw.push('}');
if(dy==="set"||dy==="setRuntime"||dy==="setThemed"||dy==="init"){dw.push('else{');

if(dy==="setRuntime"){dw.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(dy==="set"){dw.push('computed=this.',this.$$store.user[name],'=value;');
}else if(dy==="setThemed"){dw.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(dy==="init"){if(dz){dw.push('computed=this.',this.$$store.init[name],'=value;');
}else{dw.push('computed=this.',this.$$store.init[name],';');
}dw.push('this.',this.$$store.useinit[name],'=true;');
}dw.push('}');
}},__G:function(cy,cz,name,cA){cy.push('if(computed===undefined||computed===inherit){');

if(cA==="refresh"){cy.push('computed=value;');
}else{cy.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');
}cy.push('if((computed===undefined||computed===inherit)&&');
cy.push('this.',this.$$store.init[name],'!==undefined&&');
cy.push('this.',this.$$store.init[name],'!==inherit){');
cy.push('computed=this.',this.$$store.init[name],';');
cy.push('this.',this.$$store.useinit[name],'=true;');
cy.push('}else{');
cy.push('delete this.',this.$$store.useinit[name],';}');
cy.push('}');
cy.push('if(old===computed)return value;');
cy.push('if(computed===inherit){');
cy.push('computed=undefined;delete this.',this.$$store.inherit[name],';');
cy.push('}');
cy.push('else if(computed===undefined)');
cy.push('delete this.',this.$$store.inherit[name],';');
cy.push('else this.',this.$$store.inherit[name],'=computed;');
cy.push('var backup=computed;');
if(cz.init!==undefined&&cA!=="init"){cy.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{cy.push('if(old===undefined)old=null;');
}cy.push('if(computed===undefined||computed==inherit)computed=null;');
},__H:function(cW,cX,name,cY){if(cY!=="set"&&cY!=="setRuntime"&&cY!=="setThemed"){cW.push('if(computed===undefined)computed=null;');
}cW.push('if(old===computed)return value;');
if(cX.init!==undefined&&cY!=="init"){cW.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{cW.push('if(old===undefined)old=null;');
}},__I:function(da,db,name){if(db.apply){da.push('this.',db.apply,'(computed, old, "',name,'");');
}if(db.event){da.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",db.event,"')){","reg.fireEvent(this, '",db.event,"', qx.event.type.Data, [computed, old]",")}");
}},__J:function(cM,name){cM.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');
cM.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');
cM.push('}');
}},defer:function(r){var t=navigator.userAgent.indexOf(F)!=-1;
var s=navigator.userAgent.indexOf(bv)!=-1;
if(t||s){r.__v=r.__w;
}}});
})();
(function(){var g="emulated",f="native",e='"',d="qx.lang.Core",c="\\\\",b="\\\"",a="[object Error]";
qx.Bootstrap.define(d,{statics:{errorToString:{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}[(!Error.prototype.toString||Error.prototype.toString()==a)?g:f],arrayIndexOf:{"native":Array.prototype.indexOf,"emulated":function(v,w){if(w==null){w=0;
}else if(w<0){w=Math.max(0,this.length+w);
}
for(var i=w;i<this.length;i++){if(this[i]===v){return i;
}}return -1;
}}[Array.prototype.indexOf?f:g],arrayLastIndexOf:{"native":Array.prototype.lastIndexOf,"emulated":function(m,n){if(n==null){n=this.length-1;
}else if(n<0){n=Math.max(0,this.length+n);
}
for(var i=n;i>=0;i--){if(this[i]===m){return i;
}}return -1;
}}[Array.prototype.lastIndexOf?f:g],arrayForEach:{"native":Array.prototype.forEach,"emulated":function(o,p){var l=this.length;

for(var i=0;i<l;i++){var q=this[i];

if(q!==undefined){o.call(p||window,q,i,this);
}}}}[Array.prototype.forEach?f:g],arrayFilter:{"native":Array.prototype.filter,"emulated":function(r,s){var t=[];
var l=this.length;

for(var i=0;i<l;i++){var u=this[i];

if(u!==undefined){if(r.call(s||window,u,i,this)){t.push(this[i]);
}}}return t;
}}[Array.prototype.filter?f:g],arrayMap:{"native":Array.prototype.map,"emulated":function(x,y){var z=[];
var l=this.length;

for(var i=0;i<l;i++){var A=this[i];

if(A!==undefined){z[i]=x.call(y||window,A,i,this);
}}return z;
}}[Array.prototype.map?f:g],arraySome:{"native":Array.prototype.some,"emulated":function(B,C){var l=this.length;

for(var i=0;i<l;i++){var D=this[i];

if(D!==undefined){if(B.call(C||window,D,i,this)){return true;
}}}return false;
}}[Array.prototype.some?f:g],arrayEvery:{"native":Array.prototype.every,"emulated":function(h,j){var l=this.length;

for(var i=0;i<l;i++){var k=this[i];

if(k!==undefined){if(!h.call(j||window,k,i,this)){return false;
}}}return true;
}}[Array.prototype.every?f:g],stringQuote:{"native":String.prototype.quote,"emulated":function(){return e+this.replace(/\\/g,c).replace(/\"/g,b)+e;
}}[String.prototype.quote?f:g]}});
Error.prototype.toString=qx.lang.Core.errorToString;
Array.prototype.indexOf=qx.lang.Core.arrayIndexOf;
Array.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;
Array.prototype.forEach=qx.lang.Core.arrayForEach;
Array.prototype.filter=qx.lang.Core.arrayFilter;
Array.prototype.map=qx.lang.Core.arrayMap;
Array.prototype.some=qx.lang.Core.arraySome;
Array.prototype.every=qx.lang.Core.arrayEvery;
String.prototype.quote=qx.lang.Core.stringQuote;
})();
(function(){var r="[Class ",q="]",p="extend",o="qx.Class",n=".",m="static";
qx.Bootstrap.define(o,{statics:{define:function(name,bH){if(!bH){var bH={};
}if(bH.include&&!(bH.include instanceof Array)){bH.include=[bH.include];
}if(bH.implement&&!(bH.implement instanceof Array)){bH.implement=[bH.implement];
}var bI=false;

if(!bH.hasOwnProperty(p)&&!bH.type){bH.type=m;
bI=true;
}{};
var bJ=this.__O(name,bH.type,bH.extend,bH.statics,bH.construct,bH.destruct,bH.include);
if(bH.extend){if(bH.properties){this.__Q(bJ,bH.properties,true);
}if(bH.members){this.__S(bJ,bH.members,true,true,false);
}if(bH.events){this.__P(bJ,bH.events,true);
}if(bH.include){for(var i=0,l=bH.include.length;i<l;i++){this.__W(bJ,bH.include[i],false);
}}}if(bH.settings){for(var bK in bH.settings){qx.core.Setting.define(bK,bH.settings[bK]);
}}if(bH.variants){for(var bK in bH.variants){qx.core.Variant.define(bK,bH.variants[bK].allowedValues,bH.variants[bK].defaultValue);
}}if(bH.implement){for(var i=0,l=bH.implement.length;i<l;i++){this.__U(bJ,bH.implement[i]);
}}{};
if(bH.defer){bH.defer.self=bJ;
bH.defer(bJ,bJ.prototype,{add:function(name,bX){var bY={};
bY[name]=bX;
qx.Class.__Q(bJ,bY,true);
}});
}return bJ;
},undefine:function(name){delete this.$$registry[name];
var N=name.split(n);
var P=[window];

for(var i=0;i<N.length;i++){P.push(P[i][N[i]]);
}for(var i=P.length-1;i>=1;i--){var O=P[i];
var parent=P[i-1];

if(qx.Bootstrap.isFunction(O)||qx.Bootstrap.objectGetLength(O)===0){delete parent[N[i-1]];
}else{break;
}}},isDefined:qx.Bootstrap.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},getByName:qx.Bootstrap.getByName,include:function(U,V){{};
qx.Class.__W(U,V,false);
},patch:function(bm,bn){{};
qx.Class.__W(bm,bn,true);
},isSubClassOf:function(X,Y){if(!X){return false;
}
if(X==Y){return true;
}
if(X.prototype instanceof Y){return true;
}return false;
},getPropertyDefinition:qx.Bootstrap.getPropertyDefinition,getProperties:function(b){var c=[];

while(b){if(b.$$properties){c.push.apply(c,qx.Bootstrap.getKeys(b.$$properties));
}b=b.superclass;
}return c;
},getByProperty:function(A,name){while(A){if(A.$$properties&&A.$$properties[name]){return A;
}A=A.superclass;
}return null;
},hasProperty:qx.Bootstrap.hasProperty,getEventType:qx.Bootstrap.getEventType,supportsEvent:qx.Bootstrap.supportsEvent,hasOwnMixin:function(ca,cb){return ca.$$includes&&ca.$$includes.indexOf(cb)!==-1;
},getByMixin:function(bL,bM){var bN,i,l;

while(bL){if(bL.$$includes){bN=bL.$$flatIncludes;

for(i=0,l=bN.length;i<l;i++){if(bN[i]===bM){return bL;
}}}bL=bL.superclass;
}return null;
},getMixins:qx.Bootstrap.getMixins,hasMixin:function(s,t){return !!this.getByMixin(s,t);
},hasOwnInterface:function(bS,bT){return bS.$$implements&&bS.$$implements.indexOf(bT)!==-1;
},getByInterface:qx.Bootstrap.getByInterface,getInterfaces:function(bF){var bG=[];

while(bF){if(bF.$$implements){bG.push.apply(bG,bF.$$flatImplements);
}bF=bF.superclass;
}return bG;
},hasInterface:qx.Bootstrap.hasInterface,implementsInterface:function(Q,R){var S=Q.constructor;

if(this.hasInterface(S,R)){return true;
}
try{qx.Interface.assertObject(Q,R);
return true;
}catch(W){}
try{qx.Interface.assert(S,R,false);
return true;
}catch(T){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return r+this.classname+q;
},$$registry:qx.Bootstrap.$$registry,__K:null,__L:null,__M:function(){},__N:function(){},__O:function(name,B,C,D,E,F,G){var J;

if(!C&&true){J=D||{};
qx.Bootstrap.setDisplayNames(J,name);
}else{var J={};

if(C){if(!E){E=this.__X();
}
if(this.__ba(C,G)){J=this.__bb(E,name,B);
}else{J=E;
}if(B==="singleton"){J.getInstance=this.getInstance;
}qx.Bootstrap.setDisplayName(E,name,"constructor");
}if(D){qx.Bootstrap.setDisplayNames(D,name);
var K;

for(var i=0,a=qx.Bootstrap.getKeys(D),l=a.length;i<l;i++){K=a[i];
var H=D[K];
{J[K]=H;
};
}}}var I=qx.Bootstrap.createNamespace(name,J);
J.name=J.classname=name;
J.basename=I;
J.$$type="Class";

if(B){J.$$classtype=B;
}if(!J.hasOwnProperty("toString")){J.toString=this.genericToString;
}
if(C){qx.Bootstrap.extendClass(J,E,C,name,I);
if(F){{};
J.$$destructor=F;
qx.Bootstrap.setDisplayName(F,name,"destruct");
}}this.$$registry[name]=J;
return J;
},__P:function(bt,bu,bv){var bw,bw;
{};

if(bt.$$events){for(var bw in bu){bt.$$events[bw]=bu[bw];
}}else{bt.$$events=bu;
}},__Q:function(bo,bp,bq){var br;

if(bq===undefined){bq=false;
}var bs=bo.prototype;

for(var name in bp){br=bp[name];
{};
br.name=name;
if(!br.refine){if(bo.$$properties===undefined){bo.$$properties={};
}bo.$$properties[name]=br;
}if(br.init!==undefined){bo.prototype["$$init_"+name]=br.init;
}if(br.event!==undefined){var event={};
event[br.event]="qx.event.type.Data";
this.__P(bo,event,bq);
}if(br.inheritable){qx.core.Property.$$inheritable[name]=true;

if(!bs.$$refreshInheritables){qx.core.Property.attachRefreshInheritables(bo);
}}
if(!br.refine){qx.core.Property.attachMethods(bo,name,br);
}}},__R:null,__S:function(bx,by,bz,bA,bB){var bC=bx.prototype;
var bE,bD;
qx.Bootstrap.setDisplayNames(by,bx.classname+".prototype");

for(var i=0,a=qx.Bootstrap.getKeys(by),l=a.length;i<l;i++){bE=a[i];
bD=by[bE];
{};
if(bA!==false&&bD instanceof Function&&bD.$$type==null){if(bB==true){bD=this.__T(bD,bC[bE]);
}else{if(bC[bE]){bD.base=bC[bE];
}bD.self=bx;
}{};
}bC[bE]=bD;
}},__T:function(L,M){if(M){return function(){var bb=L.base;
L.base=M;
var ba=L.apply(this,arguments);
L.base=bb;
return ba;
};
}else{return L;
}},__U:function(bU,bV){{};
var bW=qx.Interface.flatten([bV]);

if(bU.$$implements){bU.$$implements.push(bV);
bU.$$flatImplements.push.apply(bU.$$flatImplements,bW);
}else{bU.$$implements=[bV];
bU.$$flatImplements=bW;
}},__V:function(bc){var name=bc.classname;
var bd=this.__bb(bc,name,bc.$$classtype);
for(var i=0,a=qx.Bootstrap.getKeys(bc),l=a.length;i<l;i++){be=a[i];
bd[be]=bc[be];
}bd.prototype=bc.prototype;
var bg=bc.prototype;

for(var i=0,a=qx.Bootstrap.getKeys(bg),l=a.length;i<l;i++){be=a[i];
var bh=bg[be];
if(bh&&bh.self==bc){bh.self=bd;
}}for(var be in this.$$registry){var bf=this.$$registry[be];

if(!bf){continue;
}
if(bf.base==bc){bf.base=bd;
}
if(bf.superclass==bc){bf.superclass=bd;
}
if(bf.$$original){if(bf.$$original.base==bc){bf.$$original.base=bd;
}
if(bf.$$original.superclass==bc){bf.$$original.superclass=bd;
}}}qx.Bootstrap.createNamespace(name,bd);
this.$$registry[name]=bd;
return bd;
},__W:function(u,v,w){{};

if(this.hasMixin(u,v)){return;
}var z=u.$$original;

if(v.$$constructor&&!z){u=this.__V(u);
}var y=qx.Mixin.flatten([v]);
var x;

for(var i=0,l=y.length;i<l;i++){x=y[i];
if(x.$$events){this.__P(u,x.$$events,w);
}if(x.$$properties){this.__Q(u,x.$$properties,w);
}if(x.$$members){this.__S(u,x.$$members,w,w,w);
}}if(u.$$includes){u.$$includes.push(v);
u.$$flatIncludes.push.apply(u.$$flatIncludes,y);
}else{u.$$includes=[v];
u.$$flatIncludes=y;
}},__X:function(){function d(){d.base.apply(this,arguments);
}return d;
},__Y:function(){return function(){};
},__ba:function(bO,bP){{};
if(bO&&bO.$$includes){var bQ=bO.$$flatIncludes;

for(var i=0,l=bQ.length;i<l;i++){if(bQ[i].$$constructor){return true;
}}}if(bP){var bR=qx.Mixin.flatten(bP);

for(var i=0,l=bR.length;i<l;i++){if(bR[i].$$constructor){return true;
}}}return false;
},__bb:function(bi,name,bj){var bk;
var bl=function(){var g=bl;
{};
var f=g.$$original.apply(this,arguments);
if(g.$$includes){var e=g.$$flatIncludes;

for(var i=0,l=e.length;i<l;i++){if(e[i].$$constructor){e[i].$$constructor.apply(this,arguments);
}}}{};
return f;
};
{};
bl.$$original=bi;
bi.wrapper=bl;
return bl;
}},defer:function(){var h,j,k;
{};
}});
})();
(function(){var f="$$hash",e="",d="qx.core.ObjectRegistry";
qx.Class.define(d,{statics:{inShutDown:false,__bc:{},__bd:0,__be:[],register:function(x){var A=this.__bc;

if(!A){return;
}var z=x.$$hash;

if(z==null){var y=this.__be;

if(y.length>0){z=y.pop();
}else{z=(this.__bd++)+e;
}x.$$hash=z;
}{};
A[z]=x;
},unregister:function(j){var k=j.$$hash;

if(k==null){return;
}var m=this.__bc;

if(m&&m[k]){delete m[k];
this.__be.push(k);
}try{delete j.$$hash;
}catch(r){if(j.removeAttribute){j.removeAttribute(f);
}}},toHashCode:function(o){{};
var q=o.$$hash;

if(q!=null){return q;
}var p=this.__be;

if(p.length>0){q=p.pop();
}else{q=(this.__bd++)+e;
}return o.$$hash=q;
},clearHashCode:function(g){{};
var h=g.$$hash;

if(h!=null){this.__be.push(h);
try{delete g.$$hash;
}catch(c){if(g.removeAttribute){g.removeAttribute(f);
}}}},fromHashCode:function(w){return this.__bc[w]||null;
},shutdown:function(){this.inShutDown=true;
var t=this.__bc;
var v=[];

for(var u in t){v.push(u);
}v.sort(function(a,b){return parseInt(b)-parseInt(a);
});
var s,i=0,l=v.length;

while(true){try{for(;i<l;i++){u=v[i];
s=t[u];

if(s&&s.dispose){s.dispose();
}}}catch(n){qx.Bootstrap.error(this,"Could not dispose object "+s.toString()+": "+n);

if(i!==l){i++;
continue;
}}break;
}qx.Bootstrap.debug(this,"Disposed "+l+" objects");
delete this.__bc;
},getRegistry:function(){return this.__bc;
}}});
})();
(function(){var a="qx.data.MBinding";
qx.Mixin.define(a,{members:{bind:function(b,c,d,e){return qx.data.SingleValueBinding.bind(this,b,c,d,e);
},removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
})();
(function(){var s="gecko",r="1.9.0.0",q=".",p="[object Opera]",o="function",n="[^\\.0-9]",m="525.26",l="",k="mshtml",j="AppleWebKit/",d="unknown",i="9.6.0",g="4.0",c="Gecko",b="opera",f="webkit",e="0.0.0",h="8.0",a="qx.bom.client.Engine";
qx.Bootstrap.define(a,{statics:{NAME:"",FULLVERSION:"0.0.0",VERSION:0.0,OPERA:false,WEBKIT:false,GECKO:false,MSHTML:false,UNKNOWN_ENGINE:false,UNKNOWN_VERSION:false,DOCUMENT_MODE:null,__bf:function(){var t=d;
var x=e;
var w=window.navigator.userAgent;
var z=false;
var v=false;

if(window.opera&&Object.prototype.toString.call(window.opera)==p){t=b;
this.OPERA=true;
if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(w)){x=RegExp.$1+q+RegExp.$2;

if(RegExp.$3!=l){x+=q+RegExp.$3;
}}else{v=true;
x=i;
}}else if(window.navigator.userAgent.indexOf(j)!=-1){t=f;
this.WEBKIT=true;

if(/AppleWebKit\/([^ ]+)/.test(w)){x=RegExp.$1;
var y=RegExp(n).exec(x);

if(y){x=x.slice(0,y.index);
}}else{v=true;
x=m;
}}else if(window.controllers&&window.navigator.product===c){t=s;
this.GECKO=true;
if(/rv\:([^\);]+)(\)|;)/.test(w)){x=RegExp.$1;
}else{v=true;
x=r;
}}else if(window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(w)){t=k;
x=RegExp.$1;

if(document.documentMode){this.DOCUMENT_MODE=document.documentMode;
}if(x<8&&/Trident\/([^\);]+)(\)|;)/.test(w)){if(RegExp.$1===g){x=h;
}}this.MSHTML=true;
}else{var u=window.qxFail;

if(u&&typeof u===o){var t=u();

if(t.NAME&&t.FULLVERSION){t=t.NAME;
this[t.toUpperCase()]=true;
x=t.FULLVERSION;
}}else{z=true;
v=true;
x=r;
t=s;
this.GECKO=true;
qx.Bootstrap.warn("Unsupported client: "+w+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}this.UNKNOWN_ENGINE=z;
this.UNKNOWN_VERSION=v;
this.NAME=t;
this.FULLVERSION=x;
this.VERSION=parseFloat(x);
}},defer:function(A){A.__bf();
}});
})();
(function(){var u="on",t="off",s="|",r="default",q="object",p="&",o="qx.aspects",n="$",m="qx.allowUrlVariants",k="qx.debug",d="qx.client",j="qx.dynlocale",g="webkit",c="qxvariant",b="opera",f=":",e="qx.core.Variant",h="mshtml",a="gecko";
qx.Bootstrap.define(e,{statics:{__bg:{},__bh:{},compilerIsSet:function(){return true;
},define:function(w,x,y){{};

if(!this.__bg[w]){this.__bg[w]={};
}else{}this.__bg[w].allowedValues=x;
this.__bg[w].defaultValue=y;
},get:function(O){var P=this.__bg[O];
{};

if(P.value!==undefined){return P.value;
}return P.defaultValue;
},__bi:function(){if(window.qxvariants){for(var z in qxvariants){{};

if(!this.__bg[z]){this.__bg[z]={};
}this.__bg[z].value=qxvariants[z];
}window.qxvariants=undefined;

try{delete window.qxvariants;
}catch(Q){}this.__bj(this.__bg);
}},__bj:function(){if(qx.core.Setting.get(m)!=true){return;
}var H=document.location.search.slice(1).split(p);

for(var i=0;i<H.length;i++){var I=H[i].split(f);

if(I.length!=3||I[0]!=c){continue;
}var J=I[1];

if(!this.__bg[J]){this.__bg[J]={};
}this.__bg[J].value=decodeURIComponent(I[2]);
}},select:function(L,M){{};

for(var N in M){if(this.isSet(L,N)){return M[N];
}}
if(M[r]!==undefined){return M[r];
}{};
},isSet:function(A,B){var C=A+n+B;

if(this.__bh[C]!==undefined){return this.__bh[C];
}var E=false;
if(B.indexOf(s)<0){E=this.get(A)===B;
}else{var D=B.split(s);

for(var i=0,l=D.length;i<l;i++){if(this.get(A)===D[i]){E=true;
break;
}}}this.__bh[C]=E;
return E;
},__bk:function(v){return typeof v===q&&v!==null&&v instanceof Array;
},__bl:function(v){return typeof v===q&&v!==null&&!(v instanceof Array);
},__bm:function(F,G){for(var i=0,l=F.length;i<l;i++){if(F[i]==G){return true;
}}return false;
}},defer:function(K){K.define(d,[a,h,b,g],qx.bom.client.Engine.NAME);
K.define(k,[u,t],u);
K.define(o,[u,t],t);
K.define(j,[u,t],u);
K.__bi();
}});
})();
(function(){var l="qx.client",k="on",j="function",i="mousedown",h="qx.bom.Event",g="return;",f="mouseover",d="HTMLEvents";
qx.Class.define(h,{statics:{addNativeListener:qx.core.Variant.select(l,{"mshtml":function(p,q,r){p.attachEvent(k+q,r);
},"default":function(A,B,C){A.addEventListener(B,C,false);
}}),removeNativeListener:qx.core.Variant.select(l,{"mshtml":function(D,E,F){try{D.detachEvent(k+E,F);
}catch(e){if(e.number!==-2146828218){throw e;
}}},"default":function(m,n,o){m.removeEventListener(n,o,false);
}}),getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:qx.core.Variant.select(l,{"mshtml":function(e){if(e.type===f){return e.fromEvent;
}else{return e.toElement;
}},"gecko":function(e){try{e.relatedTarget&&e.relatedTarget.nodeType;
}catch(e){return null;
}return e.relatedTarget;
},"default":function(e){return e.relatedTarget;
}}),preventDefault:qx.core.Variant.select(l,{"gecko":function(e){if(qx.bom.client.Engine.VERSION>=1.9&&e.type==i&&e.button==2){return;
}e.preventDefault();
if(qx.bom.client.Engine.VERSION<1.9){try{e.keyCode=0;
}catch(s){}}},"mshtml":function(e){try{e.keyCode=0;
}catch(t){}e.returnValue=false;
},"default":function(e){e.preventDefault();
}}),stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}e.cancelBubble=true;
},fire:function(a,b){if(document.createEventObject){var c=document.createEventObject();
return a.fireEvent(k+b,c);
}else{var c=document.createEvent(d);
c.initEvent(b,true,true);
return !a.dispatchEvent(c);
}},supportsEvent:qx.core.Variant.select(l,{"webkit":function(y,z){return y.hasOwnProperty(k+z);
},"default":function(u,v){var w=k+v;
var x=(w in u);

if(!x){x=typeof u[w]==j;

if(!x&&u.setAttribute){u.setAttribute(w,g);
x=typeof u[w]==j;
u.removeAttribute(w);
}}return x;
}})}});
})();
(function(){var bm="|bubble",bl="|capture",bk="|",bj="",bi="_",bh="unload",bg="UNKNOWN_",bf="__bs",be="__br",bd="c",ba="DOM_",bc="WIN_",bb="capture",Y="qx.event.Manager",X="QX_";
qx.Class.define(Y,{extend:Object,construct:function(cu,cv){this.__bn=cu;
this.__bo=qx.core.ObjectRegistry.toHashCode(cu);
this.__bp=cv;
if(cu.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(cu,bh,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(cu,bh,arguments.callee);
self.dispose();
}));
}this.__bq={};
this.__br={};
this.__bs={};
this.__bt={};
},statics:{__bu:0,getNextUniqueId:function(){return (this.__bu++)+bj;
}},members:{__bp:null,__bq:null,__bs:null,__bv:null,__br:null,__bt:null,__bn:null,__bo:null,getWindow:function(){return this.__bn;
},getWindowId:function(){return this.__bo;
},getHandler:function(H){var I=this.__br[H.classname];

if(I){return I;
}return this.__br[H.classname]=new H(this);
},getDispatcher:function(ca){var cb=this.__bs[ca.classname];

if(cb){return cb;
}return this.__bs[ca.classname]=new ca(this,this.__bp);
},getListeners:function(cn,co,cp){var cq=cn.$$hash||qx.core.ObjectRegistry.toHashCode(cn);
var cs=this.__bq[cq];

if(!cs){return null;
}var ct=co+(cp?bl:bm);
var cr=cs[ct];
return cr?cr.concat():null;
},serializeListeners:function(cw){var cD=cw.$$hash||qx.core.ObjectRegistry.toHashCode(cw);
var cF=this.__bq[cD];
var cB=[];

if(cF){var cz,cE,cx,cA,cC;

for(var cy in cF){cz=cy.indexOf(bk);
cE=cy.substring(0,cz);
cx=cy.charAt(cz+1)==bd;
cA=cF[cy];

for(var i=0,l=cA.length;i<l;i++){cC=cA[i];
cB.push({self:cC.context,handler:cC.handler,type:cE,capture:cx});
}}}return cB;
},toggleAttachedEvents:function(bH,bI){var bN=bH.$$hash||qx.core.ObjectRegistry.toHashCode(bH);
var bP=this.__bq[bN];

if(bP){var bK,bO,bJ,bL;

for(var bM in bP){bK=bM.indexOf(bk);
bO=bM.substring(0,bK);
bJ=bM.charCodeAt(bK+1)===99;
bL=bP[bM];

if(bI){this.__bw(bH,bO,bJ);
}else{this.__bx(bH,bO,bJ);
}}}},hasListener:function(bA,bB,bC){{};
var bD=bA.$$hash||qx.core.ObjectRegistry.toHashCode(bA);
var bF=this.__bq[bD];

if(!bF){return false;
}var bG=bB+(bC?bl:bm);
var bE=bF[bG];
return bE&&bE.length>0;
},importListeners:function(bQ,bR){{};
var bX=bQ.$$hash||qx.core.ObjectRegistry.toHashCode(bQ);
var bY=this.__bq[bX]={};
var bU=qx.event.Manager;

for(var bS in bR){var bV=bR[bS];
var bW=bV.type+(bV.capture?bl:bm);
var bT=bY[bW];

if(!bT){bT=bY[bW]=[];
this.__bw(bQ,bV.type,bV.capture);
}bT.push({handler:bV.listener,context:bV.self,unique:bV.unique||(bU.__bu++)+bj});
}},addListener:function(a,b,c,self,d){var h;
{};
var j=a.$$hash||qx.core.ObjectRegistry.toHashCode(a);
var m=this.__bq[j];

if(!m){m=this.__bq[j]={};
}var g=b+(d?bl:bm);
var f=m[g];

if(!f){f=m[g]=[];
}if(f.length===0){this.__bw(a,b,d);
}var k=(qx.event.Manager.__bu++)+bj;
var e={handler:c,context:self,unique:k};
f.push(e);
return g+bk+k;
},findHandler:function(bn,bo){var by=false,br=false,bz=false;
var bx;

if(bn.nodeType===1){by=true;
bx=ba+bn.tagName.toLowerCase()+bi+bo;
}else if(bn==this.__bn){br=true;
bx=bc+bo;
}else if(bn.classname){bz=true;
bx=X+bn.classname+bi+bo;
}else{bx=bg+bn+bi+bo;
}var bt=this.__bt;

if(bt[bx]){return bt[bx];
}var bw=this.__bp.getHandlers();
var bs=qx.event.IEventHandler;
var bu,bv,bq,bp;

for(var i=0,l=bw.length;i<l;i++){bu=bw[i];
bq=bu.SUPPORTED_TYPES;

if(bq&&!bq[bo]){continue;
}bp=bu.TARGET_CHECK;

if(bp){if(!by&&bp===bs.TARGET_DOMNODE){continue;
}else if(!br&&bp===bs.TARGET_WINDOW){continue;
}else if(!bz&&bp===bs.TARGET_OBJECT){continue;
}}bv=this.getHandler(bw[i]);

if(bu.IGNORE_CAN_HANDLE||bv.canHandleEvent(bn,bo)){bt[bx]=bv;
return bv;
}}return null;
},__bw:function(cj,ck,cl){var cm=this.findHandler(cj,ck);

if(cm){cm.registerEvent(cj,ck,cl);
return;
}{};
},removeListener:function(J,K,L,self,M){var Q;
{};
var R=J.$$hash||qx.core.ObjectRegistry.toHashCode(J);
var S=this.__bq[R];

if(!S){return false;
}var N=K+(M?bl:bm);
var O=S[N];

if(!O){return false;
}var P;

for(var i=0,l=O.length;i<l;i++){P=O[i];

if(P.handler===L&&P.context===self){qx.lang.Array.removeAt(O,i);

if(O.length==0){this.__bx(J,K,M);
}return true;
}}return false;
},removeListenerById:function(o,p){var v;
{};
var t=p.split(bk);
var y=t[0];
var q=t[1].charCodeAt(0)==99;
var x=t[2];
var w=o.$$hash||qx.core.ObjectRegistry.toHashCode(o);
var z=this.__bq[w];

if(!z){return false;
}var u=y+(q?bl:bm);
var s=z[u];

if(!s){return false;
}var r;

for(var i=0,l=s.length;i<l;i++){r=s[i];

if(r.unique===x){qx.lang.Array.removeAt(s,i);

if(s.length==0){this.__bx(o,y,q);
}return true;
}}return false;
},removeAllListeners:function(A){var E=A.$$hash||qx.core.ObjectRegistry.toHashCode(A);
var G=this.__bq[E];

if(!G){return false;
}var C,F,B;

for(var D in G){if(G[D].length>0){C=D.split(bk);
F=C[0];
B=C[1]===bb;
this.__bx(A,F,B);
}}delete this.__bq[E];
return true;
},deleteAllListeners:function(n){delete this.__bq[n];
},__bx:function(T,U,V){var W=this.findHandler(T,U);

if(W){W.unregisterEvent(T,U,V);
return;
}{};
},dispatchEvent:function(cc,event){var ch;
{};
var ci=event.getType();

if(!event.getBubbles()&&!this.hasListener(cc,ci)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(cc);
}var cg=this.__bp.getDispatchers();
var cf;
var ce=false;

for(var i=0,l=cg.length;i<l;i++){cf=this.getDispatcher(cg[i]);
if(cf.canDispatchEvent(cc,event,ci)){cf.dispatchEvent(cc,event,ci);
ce=true;
break;
}}
if(!ce){{};
return true;
}var cd=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !cd;
},dispose:function(){this.__bp.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,be);
qx.util.DisposeUtil.disposeMap(this,bf);
this.__bq=this.__bn=this.__bv=null;
this.__bp=this.__bt=null;
}}});
})();
(function(){var d="qx.dom.Node",c="qx.client",b="";
qx.Class.define(d,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(o){return o.nodeType===
this.DOCUMENT?o:
o.ownerDocument||o.document;
},getWindow:qx.core.Variant.select(c,{"mshtml":function(s){if(s.nodeType==null){return s;
}if(s.nodeType!==this.DOCUMENT){s=s.ownerDocument;
}return s.parentWindow;
},"default":function(f){if(f.nodeType==null){return f;
}if(f.nodeType!==this.DOCUMENT){f=f.ownerDocument;
}return f.defaultView;
}}),getDocumentElement:function(q){return this.getDocument(q).documentElement;
},getBodyElement:function(h){return this.getDocument(h).body;
},isNode:function(t){return !!(t&&t.nodeType!=null);
},isElement:function(e){return !!(e&&e.nodeType===this.ELEMENT);
},isDocument:function(g){return !!(g&&g.nodeType===this.DOCUMENT);
},isText:function(r){return !!(r&&r.nodeType===this.TEXT);
},isWindow:function(p){return !!(p&&p.history&&p.location&&p.document);
},isNodeName:function(j,k){if(!k||!j||!j.nodeName){return false;
}return k.toLowerCase()==qx.dom.Node.getName(j);
},getName:function(l){if(!l||!l.nodeName){return null;
}return l.nodeName.toLowerCase();
},getText:function(m){if(!m||!m.nodeType){return null;
}
switch(m.nodeType){case 1:var i,a=[],n=m.childNodes,length=n.length;

for(i=0;i<length;i++){a[i]=this.getText(n[i]);
}return a.join(b);
case 2:return m.nodeValue;
break;
case 3:return m.nodeValue;
break;
}return null;
}}});
})();
(function(){var n="mshtml",m="qx.client",k="[object Array]",j="qx.lang.Array",h="qx",g="number",f="string";
qx.Class.define(j,{statics:{toArray:function(X,Y){return this.cast(X,Array,Y);
},cast:function(T,U,V){if(T.constructor===U){return T;
}
if(qx.Class.hasInterface(T,qx.data.IListData)){var T=T.toArray();
}var W=new U;
if(qx.core.Variant.isSet(m,n)){if(T.item){for(var i=V||0,l=T.length;i<l;i++){W.push(T[i]);
}return W;
}}if(Object.prototype.toString.call(T)===k&&V==null){W.push.apply(W,T);
}else{W.push.apply(W,Array.prototype.slice.call(T,V||0));
}return W;
},fromArguments:function(N,O){return Array.prototype.slice.call(N,O||0);
},fromCollection:function(ba){if(qx.core.Variant.isSet(m,n)){if(ba.item){var bb=[];

for(var i=0,l=ba.length;i<l;i++){bb[i]=ba[i];
}return bb;
}}return Array.prototype.slice.call(ba,0);
},fromShortHand:function(o){var q=o.length;
var p=qx.lang.Array.clone(o);
switch(q){case 1:p[1]=p[2]=p[3]=p[0];
break;
case 2:p[2]=p[0];
case 3:p[3]=p[1];
}return p;
},clone:function(t){return t.concat();
},insertAt:function(R,S,i){R.splice(i,0,S);
return R;
},insertBefore:function(K,L,M){var i=K.indexOf(M);

if(i==-1){K.push(L);
}else{K.splice(i,0,L);
}return K;
},insertAfter:function(bc,bd,be){var i=bc.indexOf(be);

if(i==-1||i==(bc.length-1)){bc.push(bd);
}else{bc.splice(i+1,0,bd);
}return bc;
},removeAt:function(bf,i){return bf.splice(i,1)[0];
},removeAll:function(a){a.length=0;
return this;
},append:function(bk,bl){{};
Array.prototype.push.apply(bk,bl);
return bk;
},exclude:function(bn,bo){{};

for(var i=0,bq=bo.length,bp;i<bq;i++){bp=bn.indexOf(bo[i]);

if(bp!=-1){bn.splice(bp,1);
}}return bn;
},remove:function(P,Q){var i=P.indexOf(Q);

if(i!=-1){P.splice(i,1);
return Q;
}},contains:function(bg,bh){return bg.indexOf(bh)!==-1;
},equals:function(bi,bj){var length=bi.length;

if(length!==bj.length){return false;
}
for(var i=0;i<length;i++){if(bi[i]!==bj[i]){return false;
}}return true;
},sum:function(r){var s=0;

for(var i=0,l=r.length;i<l;i++){s+=r[i];
}return s;
},max:function(c){{};
var i,e=c.length,d=c[0];

for(i=1;i<e;i++){if(c[i]>d){d=c[i];
}}return d===undefined?null:d;
},min:function(u){{};
var i,w=u.length,v=u[0];

for(i=1;i<w;i++){if(u[i]<v){v=u[i];
}}return v===undefined?null:v;
},unique:function(x){var H=[],z={},C={},E={};
var D,y=0;
var I=h+qx.lang.Date.now();
var A=false,G=false,J=false;
for(var i=0,F=x.length;i<F;i++){D=x[i];
if(D===null){if(!A){A=true;
H.push(D);
}}else if(D===undefined){}else if(D===false){if(!G){G=true;
H.push(D);
}}else if(D===true){if(!J){J=true;
H.push(D);
}}else if(typeof D===f){if(!z[D]){z[D]=1;
H.push(D);
}}else if(typeof D===g){if(!C[D]){C[D]=1;
H.push(D);
}}else{B=D[I];

if(B==null){B=D[I]=y++;
}
if(!E[B]){E[B]=D;
H.push(D);
}}}for(var B in E){try{delete E[B][I];
}catch(b){try{E[B][I]=null;
}catch(bm){throw new Error("Cannot clean-up map entry doneObjects["+B+"]["+I+"]");
}}}return H;
}}});
})();
(function(){var i="()",h=".",g=".prototype.",f='anonymous()',e="qx.lang.Function",d=".constructor()";
qx.Class.define(e,{statics:{getCaller:function(G){return G.caller?G.caller.callee:G.callee.caller;
},getName:function(r){if(r.displayName){return r.displayName;
}
if(r.$$original||r.wrapper||r.classname){return r.classname+d;
}
if(r.$$mixin){for(var t in r.$$mixin.$$members){if(r.$$mixin.$$members[t]==r){return r.$$mixin.name+g+t+i;
}}for(var t in r.$$mixin){if(r.$$mixin[t]==r){return r.$$mixin.name+h+t+i;
}}}
if(r.self){var u=r.self.constructor;

if(u){for(var t in u.prototype){if(u.prototype[t]==r){return u.classname+g+t+i;
}}for(var t in u){if(u[t]==r){return u.classname+h+t+i;
}}}}var s=r.toString().match(/function\s*(\w*)\s*\(.*/);

if(s&&s.length>=1&&s[1]){return s[1]+i;
}return f;
},globalEval:function(q){if(window.execScript){return window.execScript(q);
}else{return eval.call(window,q);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(o,p){{};
if(!p){return o;
}if(!(p.self||p.args||p.delay!=null||p.periodical!=null||p.attempt)){return o;
}return function(event){{};
var b=qx.lang.Array.fromArguments(arguments);
if(p.args){b=p.args.concat(b);
}
if(p.delay||p.periodical){var a=qx.event.GlobalError.observeMethod(function(){return o.apply(p.self||this,b);
});

if(p.delay){return window.setTimeout(a,p.delay);
}
if(p.periodical){return window.setInterval(a,p.periodical);
}}else if(p.attempt){var c=false;

try{c=o.apply(p.self||this,b);
}catch(H){}return c;
}else{return o.apply(p.self||this,b);
}};
},bind:function(E,self,F){return this.create(E,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(m,n){return this.create(m,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(B,self,C){if(arguments.length<3){return function(event){return B.call(self||this,event||window.event);
};
}else{var D=qx.lang.Array.fromArguments(arguments,2);
return function(event){var l=[event||window.event];
l.push.apply(l,D);
B.apply(self||this,l);
};
}},attempt:function(j,self,k){return this.create(j,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(v,w,self,x){return this.create(v,{delay:w,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(y,z,self,A){return this.create(y,{periodical:z,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
})();
(function(){var c="qx.event.Registration";
qx.Class.define(c,{statics:{__by:{},getManager:function(B){if(B==null){{};
B=window;
}else if(B.nodeType){B=qx.dom.Node.getWindow(B);
}else if(!qx.dom.Node.isWindow(B)){B=window;
}var D=B.$$hash||qx.core.ObjectRegistry.toHashCode(B);
var C=this.__by[D];

if(!C){C=new qx.event.Manager(B,this);
this.__by[D]=C;
}return C;
},removeManager:function(P){var Q=P.getWindowId();
delete this.__by[Q];
},addListener:function(d,e,f,self,g){return this.getManager(d).addListener(d,e,f,self,g);
},removeListener:function(n,o,p,self,q){return this.getManager(n).removeListener(n,o,p,self,q);
},removeListenerById:function(r,s){return this.getManager(r).removeListenerById(r,s);
},removeAllListeners:function(O){return this.getManager(O).removeAllListeners(O);
},deleteAllListeners:function(R){var S=R.$$hash;

if(S){this.getManager(R).deleteAllListeners(S);
}},hasListener:function(u,v,w){return this.getManager(u).hasListener(u,v,w);
},serializeListeners:function(A){return this.getManager(A).serializeListeners(A);
},createEvent:function(K,L,M){{};
if(L==null){L=qx.event.type.Event;
}var N=qx.event.Pool.getInstance().getObject(L);
M?N.init.apply(N,M):N.init();
if(K){N.setType(K);
}return N;
},dispatchEvent:function(t,event){return this.getManager(t).dispatchEvent(t,event);
},fireEvent:function(E,F,G,H){var I;
{};
var J=this.createEvent(F,G||null,H);
return this.getManager(E).dispatchEvent(E,J);
},fireNonBubblingEvent:function(h,i,j,k){{};
var l=this.getManager(h);

if(!l.hasListener(h,i,false)){return true;
}var m=this.createEvent(i,j||null,k);
return l.dispatchEvent(h,m);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__bz:[],addHandler:function(z){{};
this.__bz.push(z);
this.__bz.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__bz;
},__bA:[],addDispatcher:function(x,y){{};
this.__bA.push(x);
this.__bA.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__bA;
}}});
})();
(function(){var l=":",k="qx.client",j="anonymous",h="...",g="qx.dev.StackTrace",f="",e="\n",d="/source/class/",c=".";
qx.Class.define(g,{statics:{getStackTrace:qx.core.Variant.select(k,{"gecko":function(){try{throw new Error();
}catch(E){var M=this.getStackTraceFromError(E);
qx.lang.Array.removeAt(M,0);
var K=this.getStackTraceFromCaller(arguments);
var I=K.length>M.length?K:M;

for(var i=0;i<Math.min(K.length,M.length);i++){var J=K[i];

if(J.indexOf(j)>=0){continue;
}var Q=J.split(l);

if(Q.length!=2){continue;
}var O=Q[0];
var H=Q[1];
var G=M[i];
var R=G.split(l);
var N=R[0];
var F=R[1];

if(qx.Class.getByName(N)){var L=N;
}else{L=O;
}var P=L+l;

if(H){P+=H+l;
}P+=F;
I[i]=P;
}return I;
}},"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},"opera":function(){var a;

try{a.bar();
}catch(u){var b=this.getStackTraceFromError(u);
qx.lang.Array.removeAt(b,0);
return b;
}return [];
}}),getStackTraceFromCaller:qx.core.Variant.select(k,{"opera":function(v){return [];
},"default":function(S){var X=[];
var W=qx.lang.Function.getCaller(S);
var T={};

while(W){var U=qx.lang.Function.getName(W);
X.push(U);

try{W=W.caller;
}catch(w){break;
}
if(!W){break;
}var V=qx.core.ObjectRegistry.toHashCode(W);

if(T[V]){X.push(h);
break;
}T[V]=W;
}return X;
}}),getStackTraceFromError:qx.core.Variant.select(k,{"gecko":function(n){if(!n.stack){return [];
}var t=/@(.+):(\d+)$/gm;
var o;
var p=[];

while((o=t.exec(n.stack))!=null){var q=o[1];
var s=o[2];
var r=this.__bB(q);
p.push(r+l+s);
}return p;
},"webkit":function(m){if(m.sourceURL&&m.line){return [this.__bB(m.sourceURL)+l+m.line];
}else{return [];
}},"opera":function(x){if(x.message.indexOf("Backtrace:")<0){return [];
}var z=[];
var A=qx.lang.String.trim(x.message.split("Backtrace:")[1]);
var B=A.split(e);

for(var i=0;i<B.length;i++){var y=B[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(y&&y.length>=2){var D=y[1];
var C=this.__bB(y[2]);
z.push(C+l+D);
}}return z;
},"default":function(){return [];
}}),__bB:function(Y){var bc=d;
var ba=Y.indexOf(bc);
var bb=(ba==-1)?Y:Y.substring(ba+bc.length).replace(/\//g,c).replace(/\.js$/,f);
return bb;
}}});
})();
(function(){var a="qx.lang.RingBuffer";
qx.Class.define(a,{extend:Object,construct:function(n){this.setMaxEntries(n||50);
},members:{__bC:0,__bD:0,__bE:false,__bF:0,__bG:null,__bH:null,setMaxEntries:function(f){this.__bH=f;
this.clear();
},getMaxEntries:function(){return this.__bH;
},addEntry:function(l){this.__bG[this.__bC]=l;
this.__bC=this.__bI(this.__bC,1);
var m=this.getMaxEntries();

if(this.__bD<m){this.__bD++;
}if(this.__bE&&(this.__bF<m)){this.__bF++;
}},mark:function(){this.__bE=true;
this.__bF=0;
},clearMark:function(){this.__bE=false;
},getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);
},getEntries:function(g,h){if(g>this.__bD){g=this.__bD;
}if(h&&this.__bE&&(g>this.__bF)){g=this.__bF;
}
if(g>0){var j=this.__bI(this.__bC,-1);
var i=this.__bI(j,-g+1);
var k;

if(i<=j){k=this.__bG.slice(i,j+1);
}else{k=this.__bG.slice(i,this.__bD).concat(this.__bG.slice(0,j+1));
}}else{k=[];
}return k;
},clear:function(){this.__bG=new Array(this.getMaxEntries());
this.__bD=0;
this.__bF=0;
this.__bC=0;
},__bI:function(b,c){var d=this.getMaxEntries();
var e=(b+c)%d;
if(e<0){e+=d;
}return e;
}}});
})();
(function(){var a="qx.log.appender.RingBuffer";
qx.Class.define(a,{extend:qx.lang.RingBuffer,construct:function(f){this.setMaxMessages(f||50);
},members:{setMaxMessages:function(d){this.setMaxEntries(d);
},getMaxMessages:function(){return this.getMaxEntries();
},process:function(e){this.addEntry(e);
},getAllLogEvents:function(){return this.getAllEntries();
},retrieveLogEvents:function(b,c){return this.getEntries(b,c);
},clearHistory:function(){this.clear();
}}});
})();
(function(){var bo="node",bn="error",bm="...(+",bl="array",bk=")",bj="info",bi="instance",bh="string",bg="null",bf="class",bJ="number",bI="stringify",bH="]",bG="unknown",bF="function",bE="boolean",bD="debug",bC="map",bB="undefined",bA="qx.log.Logger",bv=")}",bw="#",bt="warn",bu="document",br="{...(",bs="[",bp="text[",bq="[...(",bx="\n",by=")]",bz="object";
qx.Class.define(bA,{statics:{__bJ:bD,setLevel:function(S){this.__bJ=S;
},getLevel:function(){return this.__bJ;
},setTreshold:function(bM){this.__bM.setMaxMessages(bM);
},getTreshold:function(){return this.__bM.getMaxMessages();
},__bK:{},__bL:0,register:function(d){if(d.$$id){return;
}var e=this.__bL++;
this.__bK[e]=d;
d.$$id=e;
var f=this.__bM.getAllLogEvents();

for(var i=0,l=f.length;i<l;i++){d.process(f[i]);
}},unregister:function(bK){var bL=bK.$$id;

if(bL==null){return;
}delete this.__bK[bL];
delete bK.$$id;
},debug:function(Y,ba){qx.log.Logger.__bO(bD,arguments);
},info:function(bN,bO){qx.log.Logger.__bO(bj,arguments);
},warn:function(Q,R){qx.log.Logger.__bO(bt,arguments);
},error:function(g,h){qx.log.Logger.__bO(bn,arguments);
},trace:function(bP){qx.log.Logger.__bO(bj,[bP,qx.dev.StackTrace.getStackTrace().join(bx)]);
},deprecatedMethodWarning:function(s,t){var u;
{};
},deprecatedClassWarning:function(p,q){var r;
{};
},deprecatedEventWarning:function(a,event,b){var c;
{};
},deprecatedMixinWarning:function(V,W){var X;
{};
},deprecatedConstantWarning:function(bb,bc,bd){var self,be;
{};
},deprecateMethodOverriding:function(j,k,m,n){var o;
{};
},clear:function(){this.__bM.clearHistory();
},__bM:new qx.log.appender.RingBuffer(50),__bN:{debug:0,info:1,warn:2,error:3},__bO:function(G,H){var M=this.__bN;

if(M[G]<M[this.__bJ]){return;
}var J=H.length<2?null:H[0];
var L=J?1:0;
var I=[];

for(var i=L,l=H.length;i<l;i++){I.push(this.__bQ(H[i],true));
}var N=new Date;
var O={time:N,offset:N-qx.Bootstrap.LOADSTART,level:G,items:I,win:window};
if(J){if(J instanceof qx.core.Object){O.object=J.$$hash;
}else if(J.$$type){O.clazz=J;
}}this.__bM.process(O);
var P=this.__bK;

for(var K in P){P[K].process(O);
}},__bP:function(T){if(T===undefined){return bB;
}else if(T===null){return bg;
}
if(T.$$type){return bf;
}var U=typeof T;

if(U===bF||U==bh||U===bJ||U===bE){return U;
}else if(U===bz){if(T.nodeType){return bo;
}else if(T.classname){return bi;
}else if(T instanceof Array){return bl;
}else if(T instanceof Error){return bn;
}else{return bC;
}}
if(T.toString){return bI;
}return bG;
},__bQ:function(v,w){var D=this.__bP(v);
var z=bG;
var y=[];

switch(D){case bg:case bB:z=D;
break;
case bh:case bJ:case bE:z=v;
break;
case bo:if(v.nodeType===9){z=bu;
}else if(v.nodeType===3){z=bp+v.nodeValue+bH;
}else if(v.nodeType===1){z=v.nodeName.toLowerCase();

if(v.id){z+=bw+v.id;
}}else{z=bo;
}break;
case bF:z=qx.lang.Function.getName(v)||D;
break;
case bi:z=v.basename+bs+v.$$hash+bH;
break;
case bf:case bI:z=v.toString();
break;
case bn:y=qx.dev.StackTrace.getStackTraceFromError(v);
z=v.toString();
break;
case bl:if(w){z=[];

for(var i=0,l=v.length;i<l;i++){if(z.length>20){z.push(bm+(l-i)+bk);
break;
}z.push(this.__bQ(v[i],false));
}}else{z=bq+v.length+by;
}break;
case bC:if(w){var x;
var C=[];

for(var B in v){C.push(B);
}C.sort();
z=[];

for(var i=0,l=C.length;i<l;i++){if(z.length>20){z.push(bm+(l-i)+bk);
break;
}B=C[i];
x=this.__bQ(v[B],false);
x.key=B;
z.push(x);
}}else{var A=0;

for(var B in v){A++;
}z=br+A+bv;
}break;
}return {type:D,text:z,trace:y};
}},defer:function(E){var F=qx.Bootstrap.$$logs;

for(var i=0;i<F.length;i++){E.__bO(F[i][0],F[i][1]);
}qx.Bootstrap.debug=E.debug;
qx.Bootstrap.info=E.info;
qx.Bootstrap.warn=E.warn;
qx.Bootstrap.error=E.error;
qx.Bootstrap.trace=E.trace;
}});
})();
(function(){var F="set",E="get",D="reset",C="MSIE 6.0",B="qx.core.Object",A="]",z="rv:1.8.1",y="[",x="$$user_",w="Object";
qx.Class.define(B,{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:w},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+y+this.$$hash+A;
},base:function(bq,br){{};

if(arguments.length===1){return bq.callee.base.call(this);
}else{return bq.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(bt){return bt.callee.self;
},clone:function(){var ba=this.constructor;
var Y=new ba;
var bc=qx.Class.getProperties(ba);
var bb=qx.core.Property.$$store.user;
var bd=qx.core.Property.$$method.set;
var name;
for(var i=0,l=bc.length;i<l;i++){name=bc[i];

if(this.hasOwnProperty(bb[name])){Y[bd[name]](this[bb[name]]);
}}return Y;
},set:function(S,T){var V=qx.core.Property.$$method.set;

if(qx.Bootstrap.isString(S)){if(!this[V[S]]){if(this[F+qx.Bootstrap.firstUp(S)]!=undefined){this[F+qx.Bootstrap.firstUp(S)](T);
return this;
}{};
}return this[V[S]](T);
}else{for(var U in S){if(!this[V[U]]){if(this[F+qx.Bootstrap.firstUp(U)]!=undefined){this[F+qx.Bootstrap.firstUp(U)](S[U]);
continue;
}{};
}this[V[U]](S[U]);
}return this;
}},get:function(W){var X=qx.core.Property.$$method.get;

if(!this[X[W]]){if(this[E+qx.Bootstrap.firstUp(W)]!=undefined){return this[E+qx.Bootstrap.firstUp(W)]();
}{};
}return this[X[W]]();
},reset:function(bm){var bn=qx.core.Property.$$method.reset;

if(!this[bn[bm]]){if(this[D+qx.Bootstrap.firstUp(bm)]!=undefined){this[D+qx.Bootstrap.firstUp(bm)]();
return;
}{};
}this[bn[bm]]();
},__bR:qx.event.Registration,addListener:function(bh,bi,self,bj){if(!this.$$disposed){return this.__bR.addListener(this,bh,bi,self,bj);
}return null;
},addListenerOnce:function(O,P,self,Q){var R=function(e){P.call(self||this,e);
this.removeListener(O,R,this,Q);
};
return this.addListener(O,R,this,Q);
},removeListener:function(be,bf,self,bg){if(!this.$$disposed){return this.__bR.removeListener(this,be,bf,self,bg);
}return false;
},removeListenerById:function(N){if(!this.$$disposed){return this.__bR.removeListenerById(this,N);
}return false;
},hasListener:function(G,H){return this.__bR.hasListener(this,G,H);
},dispatchEvent:function(bu){if(!this.$$disposed){return this.__bR.dispatchEvent(this,bu);
}return true;
},fireEvent:function(q,r,s){if(!this.$$disposed){return this.__bR.fireEvent(this,q,r,s);
}return true;
},fireNonBubblingEvent:function(t,u,v){if(!this.$$disposed){return this.__bR.fireNonBubblingEvent(this,t,u,v);
}return true;
},fireDataEvent:function(bv,bw,bx,by){if(!this.$$disposed){if(bx===undefined){bx=null;
}return this.__bR.fireNonBubblingEvent(this,bv,qx.event.type.Data,[bw,bx,!!by]);
}return true;
},__bS:null,setUserData:function(L,M){if(!this.__bS){this.__bS={};
}this.__bS[L]=M;
},getUserData:function(J){if(!this.__bS){return null;
}var K=this.__bS[J];
return K===undefined?null:K;
},__bT:qx.log.Logger,debug:function(p){this.__bT.debug(this,p);
},info:function(I){this.__bT.info(this,I);
},warn:function(bs){this.__bT.warn(this,bs);
},error:function(bl){this.__bT.error(this,bl);
},trace:function(){this.__bT.trace(this);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){var bD,bB,bA,bE;
if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
{};
var bC=this.constructor;
var bz;

while(bC.superclass){if(bC.$$destructor){bC.$$destructor.call(this);
}if(bC.$$includes){bz=bC.$$flatIncludes;

for(var i=0,l=bz.length;i<l;i++){if(bz[i].$$destructor){bz[i].$$destructor.call(this);
}}}bC=bC.superclass;
}if(this.__bU){this.__bU();
}{};
},__bU:null,__bV:function(){var bG=qx.Class.getProperties(this.constructor);

for(var i=0,l=bG.length;i<l;i++){delete this[x+bG[i]];
}},_disposeObjects:function(bo){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeSingletonObjects:function(bF){qx.util.DisposeUtil.disposeObjects(this,arguments,true);
},_disposeArray:function(bk){qx.util.DisposeUtil.disposeArray(this,bk);
},_disposeMap:function(bp){qx.util.DisposeUtil.disposeMap(this,bp);
}},settings:{"qx.disposerDebugLevel":0},defer:function(a,b){{};
var d=navigator.userAgent.indexOf(C)!=-1;
var c=navigator.userAgent.indexOf(z)!=-1;
if(d||c){b.__bU=b.__bV;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);
}else{qx.event.Registration.deleteAllListeners(this);
}qx.core.ObjectRegistry.unregister(this);
this.__bS=null;
var h=this.constructor;
var n;
var o=qx.core.Property.$$store;
var k=o.user;
var m=o.theme;
var f=o.inherit;
var j=o.useinit;
var g=o.init;

while(h){n=h.$$properties;

if(n){for(var name in n){if(n[name].dereference){this[k[name]]=this[m[name]]=this[f[name]]=this[j[name]]=this[g[name]]=undefined;
}}}h=h.superclass;
}}});
})();
(function(){var b="qx.event.type.Event";
qx.Class.define(b,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(h,i){{};
this._type=null;
this._target=null;
this._currentTarget=null;
this._relatedTarget=null;
this._originalTarget=null;
this._stopPropagation=false;
this._preventDefault=false;
this._bubbles=!!h;
this._cancelable=!!i;
this._timeStamp=(new Date()).getTime();
this._eventPhase=null;
return this;
},clone:function(d){if(d){var e=d;
}else{var e=qx.event.Pool.getInstance().getObject(this.constructor);
}e._type=this._type;
e._target=this._target;
e._currentTarget=this._currentTarget;
e._relatedTarget=this._relatedTarget;
e._originalTarget=this._originalTarget;
e._stopPropagation=this._stopPropagation;
e._bubbles=this._bubbles;
e._preventDefault=this._preventDefault;
e._cancelable=this._cancelable;
return e;
},stop:function(){if(this._bubbles){this.stopPropagation();
}
if(this._cancelable){this.preventDefault();
}},stopPropagation:function(){{};
this._stopPropagation=true;
},getPropagationStopped:function(){return !!this._stopPropagation;
},preventDefault:function(){{};
this._preventDefault=true;
},getDefaultPrevented:function(){return !!this._preventDefault;
},getType:function(){return this._type;
},setType:function(g){this._type=g;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(c){this._eventPhase=c;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(k){this._target=k;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(l){this._currentTarget=l;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(m){this._relatedTarget=m;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(f){this._originalTarget=f;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(a){this._bubbles=a;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(j){this._cancelable=j;
}},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;
}});
})();
(function(){var a="qx.event.type.Data";
qx.Class.define(a,{extend:qx.event.type.Event,members:{__bW:null,__bX:null,init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,false,d);
this.__bW=b;
this.__bX=c;
return this;
},clone:function(e){var f=qx.event.type.Event.prototype.clone.call(this,e);
f.__bW=this.__bW;
f.__bX=this.__bX;
return f;
},getData:function(){return this.__bW;
},getOldData:function(){return this.__bX;
}},destruct:function(){this.__bW=this.__bX=null;
}});
})();
(function(){var bF="get",bE="",bD="[",bC="last",bB="change",bA="]",bz=".",by="Number",bx="String",bw="set",bU="deepBinding",bT="item",bS="reset",bR="' (",bQ="Boolean",bP=").",bO=") to the object '",bN="Integer",bM="qx.data.SingleValueBinding",bL="No event could be found for the property",bJ="PositiveNumber",bK="Binding from '",bH="PositiveInteger",bI="Binding does not exist!",bG="Date";
qx.Class.define(bM,{statics:{DEBUG_ON:false,__bY:{},bind:function(I,J,K,L,M){var W=this.__cb(I,J,K,L,M);
var R=J.split(bz);
var O=this.__ci(R);
var V=[];
var S=[];
var T=[];
var P=[];
var Q=I;
for(var i=0;i<R.length;i++){if(O[i]!==bE){P.push(bB);
}else{P.push(this.__cd(Q,R[i]));
}V[i]=Q;
if(i==R.length-1){if(O[i]!==bE){var ba=O[i]===bC?Q.length-1:O[i];
var N=Q.getItem(ba);
this.__ch(N,K,L,M,I);
T[i]=this.__cj(Q,P[i],K,L,M,O[i]);
}else{if(R[i]!=null&&Q[bF+qx.lang.String.firstUp(R[i])]!=null){var N=Q[bF+qx.lang.String.firstUp(R[i])]();
this.__ch(N,K,L,M,I);
}T[i]=this.__cj(Q,P[i],K,L,M);
}}else{var X={index:i,propertyNames:R,sources:V,listenerIds:T,arrayIndexValues:O,targetObject:K,targetPropertyChain:L,options:M,listeners:S};
var U=qx.lang.Function.bind(this.__ca,this,X);
S.push(U);
T[i]=Q.addListener(P[i],U);
}if(Q[bF+qx.lang.String.firstUp(R[i])]==null){Q=null;
}else if(O[i]!==bE){Q=Q[bF+qx.lang.String.firstUp(R[i])](O[i]);
}else{Q=Q[bF+qx.lang.String.firstUp(R[i])]();
}
if(!Q){break;
}}var Y={type:bU,listenerIds:T,sources:V,targetListenerIds:W.listenerIds,targets:W.targets};
this.__ck(Y,I,J,K,L);
return Y;
},__ca:function(cD){if(cD.options&&cD.options.onUpdate){cD.options.onUpdate(cD.sources[cD.index],cD.targetObject);
}for(var j=cD.index+1;j<cD.propertyNames.length;j++){var cH=cD.sources[j];
cD.sources[j]=null;

if(!cH){continue;
}cH.removeListenerById(cD.listenerIds[j]);
}var cH=cD.sources[cD.index];
for(var j=cD.index+1;j<cD.propertyNames.length;j++){if(cD.arrayIndexValues[j-1]!==bE){cH=cH[bF+qx.lang.String.firstUp(cD.propertyNames[j-1])](cD.arrayIndexValues[j-1]);
}else{cH=cH[bF+qx.lang.String.firstUp(cD.propertyNames[j-1])]();
}cD.sources[j]=cH;
if(!cH){this.__ce(cD.targetObject,cD.targetPropertyChain);
break;
}if(j==cD.propertyNames.length-1){if(qx.Class.implementsInterface(cH,qx.data.IListData)){var cI=cD.arrayIndexValues[j]===bC?cH.length-1:cD.arrayIndexValues[j];
var cF=cH.getItem(cI);
this.__ch(cF,cD.targetObject,cD.targetPropertyChain,cD.options,cD.sources[cD.index]);
cD.listenerIds[j]=this.__cj(cH,bB,cD.targetObject,cD.targetPropertyChain,cD.options,cD.arrayIndexValues[j]);
}else{if(cD.propertyNames[j]!=null&&cH[bF+qx.lang.String.firstUp(cD.propertyNames[j])]!=null){var cF=cH[bF+qx.lang.String.firstUp(cD.propertyNames[j])]();
this.__ch(cF,cD.targetObject,cD.targetPropertyChain,cD.options,cD.sources[cD.index]);
}var cG=this.__cd(cH,cD.propertyNames[j]);
cD.listenerIds[j]=this.__cj(cH,cG,cD.targetObject,cD.targetPropertyChain,cD.options);
}}else{if(cD.listeners[j]==null){var cE=qx.lang.Function.bind(this.__ca,this,cD);
cD.listeners.push(cE);
}if(qx.Class.implementsInterface(cH,qx.data.IListData)){var cG=bB;
}else{var cG=this.__cd(cH,cD.propertyNames[j]);
}cD.listenerIds[j]=cH.addListener(cG,cD.listeners[j]);
}}},__cb:function(co,cp,cq,cr,cs){var cw=cr.split(bz);
var cu=this.__ci(cw);
var cB=[];
var cA=[];
var cy=[];
var cx=[];
var cv=cq;
for(var i=0;i<cw.length-1;i++){if(cu[i]!==bE){cx.push(bB);
}else{try{cx.push(this.__cd(cv,cw[i]));
}catch(e){break;
}}cB[i]=cv;
var cz=function(){for(var j=i+1;j<cw.length-1;j++){var q=cB[j];
cB[j]=null;

if(!q){continue;
}q.removeListenerById(cy[j]);
}var q=cB[i];
for(var j=i+1;j<cw.length-1;j++){var o=qx.lang.String.firstUp(cw[j-1]);
if(cu[j-1]!==bE){var r=cu[j-1]===bC?q.getLength()-1:cu[j-1];
q=q[bF+o](r);
}else{q=q[bF+o]();
}cB[j]=q;
if(cA[j]==null){cA.push(cz);
}if(qx.Class.implementsInterface(q,qx.data.IListData)){var p=bB;
}else{try{var p=qx.data.SingleValueBinding.__cd(q,cw[j]);
}catch(e){break;
}}cy[j]=q.addListener(p,cA[j]);
}qx.data.SingleValueBinding.__cc(co,cp,cq,cr,cs);
};
cA.push(cz);
cy[i]=cv.addListener(cx[i],cz);
var ct=qx.lang.String.firstUp(cw[i]);
if(cv[bF+ct]==null){cv=null;
}else if(cu[i]!==bE){cv=cv[bF+ct](cu[i]);
}else{cv=cv[bF+ct]();
}
if(!cv){break;
}}return {listenerIds:cy,targets:cB};
},__cc:function(cd,ce,cf,cg,ch){var cl=this.__cg(cd,ce);

if(cl!=null){var cn=ce.substring(ce.lastIndexOf(bz)+1,ce.length);
if(cn.charAt(cn.length-1)==bA){var ci=cn.substring(cn.lastIndexOf(bD)+1,cn.length-1);
var ck=cn.substring(0,cn.lastIndexOf(bD));
var cm=cl[bF+qx.lang.String.firstUp(ck)]();

if(ci==bC){ci=cm.length-1;
}
if(cm!=null){var cj=cm.getItem(ci);
}}else{var cj=cl[bF+qx.lang.String.firstUp(cn)]();
}}cj=qx.data.SingleValueBinding.__cl(cj,cf,cg,ch);
this.__cf(cf,cg,cj);
},__cd:function(cJ,cK){var cL=this.__cm(cJ,cK);
if(cL==null){if(qx.Class.supportsEvent(cJ.constructor,cK)){cL=cK;
}else if(qx.Class.supportsEvent(cJ.constructor,bB+qx.lang.String.firstUp(cK))){cL=bB+qx.lang.String.firstUp(cK);
}else{throw new qx.core.AssertionError(bL,cK);
}}return cL;
},__ce:function(db,dc){var dd=this.__cg(db,dc);

if(dd!=null){var de=dc.substring(dc.lastIndexOf(bz)+1,dc.length);
if(de.charAt(de.length-1)==bA){this.__cf(db,dc,null);
return;
}if(dd[bS+qx.lang.String.firstUp(de)]!=undefined){dd[bS+qx.lang.String.firstUp(de)]();
}else{dd[bw+qx.lang.String.firstUp(de)](null);
}}},__cf:function(A,B,C){var G=this.__cg(A,B);

if(G!=null){var H=B.substring(B.lastIndexOf(bz)+1,B.length);
if(H.charAt(H.length-1)==bA){var D=H.substring(H.lastIndexOf(bD)+1,H.length-1);
var F=H.substring(0,H.lastIndexOf(bD));
var E=G[bF+qx.lang.String.firstUp(F)]();

if(D==bC){D=E.length-1;
}
if(E!=null){E.setItem(D,C);
}}else{G[bw+qx.lang.String.firstUp(H)](C);
}}},__cg:function(bb,bc){var bf=bc.split(bz);
var bg=bb;
for(var i=0;i<bf.length-1;i++){try{var be=bf[i];
if(be.indexOf(bA)==be.length-1){var bd=be.substring(be.indexOf(bD)+1,be.length-1);
be=be.substring(0,be.indexOf(bD));
}bg=bg[bF+qx.lang.String.firstUp(be)]();

if(bd!=null){if(bd==bC){bd=bg.length-1;
}bg=bg.getItem(bd);
bd=null;
}}catch(v){return null;
}}return bg;
},__ch:function(cM,cN,cO,cP,cQ){cM=this.__cl(cM,cN,cO,cP);
if(cM==null){this.__ce(cN,cO);
}if(cM!=undefined){try{this.__cf(cN,cO,cM);
if(cP&&cP.onUpdate){cP.onUpdate(cQ,cN,cM);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(cP&&cP.onSetFail){cP.onSetFail(e);
}else{this.warn("Failed so set value "+cM+" on "+cN+". Error message: "+e);
}}}},__ci:function(bh){var bi=[];
for(var i=0;i<bh.length;i++){var name=bh[i];
if(qx.lang.String.endsWith(name,bA)){var bj=name.substring(name.indexOf(bD)+1,name.indexOf(bA));
if(name.indexOf(bA)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(bj!==bC){if(bj==bE||isNaN(parseInt(bj))){throw new Error("No number or 'last' value hast been given"+" in a array binding: "+name+" does not work.");
}}if(name.indexOf(bD)!=0){bh[i]=name.substring(0,name.indexOf(bD));
bi[i]=bE;
bi[i+1]=bj;
bh.splice(i+1,0,bT);
i++;
}else{bi[i]=bj;
bh.splice(i,1,bT);
}}else{bi[i]=bE;
}}return bi;
},__cj:function(cR,cS,cT,cU,cV,cW){var cX;
{};
var da=function(bV,e){if(bV!==bE){if(bV===bC){bV=cR.length-1;
}var bY=cR.getItem(bV);
if(bY==undefined){qx.data.SingleValueBinding.__ce(cT,cU);
}var bW=e.getData().start;
var bX=e.getData().end;

if(bV<bW||bV>bX){return;
}}else{var bY=e.getData();
}if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Binding executed from "+cR+" by "+cS+" to "+cT+" ("+cU+")");
qx.log.Logger.debug("Data before conversion: "+bY);
}bY=qx.data.SingleValueBinding.__cl(bY,cT,cU,cV);
if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Data after conversion: "+bY);
}try{if(bY!=undefined){qx.data.SingleValueBinding.__cf(cT,cU,bY);
}else{qx.data.SingleValueBinding.__ce(cT,cU);
}if(cV&&cV.onUpdate){cV.onUpdate(cR,cT,bY);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(cV&&cV.onSetFail){cV.onSetFail(e);
}else{this.warn("Failed so set value "+bY+" on "+cT+". Error message: "+e);
}}};
if(!cW){cW=bE;
}da=qx.lang.Function.bind(da,cR,cW);
var cY=cR.addListener(cS,da);
return cY;
},__ck:function(bn,bo,bp,bq,br){if(this.__bY[bo.toHashCode()]===undefined){this.__bY[bo.toHashCode()]=[];
}this.__bY[bo.toHashCode()].push([bn,bo,bp,bq,br]);
},__cl:function(a,b,c,d){if(d&&d.converter){var g;

if(b.getModel){g=b.getModel();
}return d.converter(a,g);
}else{var k=this.__cg(b,c);
var l=c.substring(c.lastIndexOf(bz)+1,c.length);
if(k==null){return a;
}var h=qx.Class.getPropertyDefinition(k.constructor,l);
var f=h==null?bE:h.check;
return this.__cn(a,f);
}},__cm:function(bk,bl){var bm=qx.Class.getPropertyDefinition(bk.constructor,bl);

if(bm==null){return null;
}return bm.event;
},__cn:function(ca,cb){var cc=qx.lang.Type.getClass(ca);
if((cc==by||cc==bx)&&(cb==bN||cb==bH)){ca=parseInt(ca);
}if((cc==bQ||cc==by||cc==bG)&&cb==bx){ca=ca+bE;
}if((cc==by||cc==bx)&&(cb==by||cb==bJ)){ca=parseFloat(ca);
}return ca;
},removeBindingFromObject:function(s,t){if(t.type==bU){for(var i=0;i<t.sources.length;i++){if(t.sources[i]){t.sources[i].removeListenerById(t.listenerIds[i]);
}}for(var i=0;i<t.targets.length;i++){if(t.targets[i]){t.targets[i].removeListenerById(t.targetListenerIds[i]);
}}}else{s.removeListenerById(t);
}var u=this.__bY[s.toHashCode()];
if(u!=undefined){for(var i=0;i<u.length;i++){if(u[i][0]==t){qx.lang.Array.remove(u,u[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(bu){{};
var bv=this.__bY[bu.toHashCode()];

if(bv!=undefined){for(var i=bv.length-1;i>=0;i--){this.removeBindingFromObject(bu,bv[i][0]);
}}},getAllBindingsForObject:function(cC){if(this.__bY[cC.toHashCode()]===undefined){this.__bY[cC.toHashCode()]=[];
}return this.__bY[cC.toHashCode()];
},removeAllBindings:function(){for(var bt in this.__bY){var bs=qx.core.ObjectRegistry.fromHashCode(bt);
if(bs==null){delete this.__bY[bt];
continue;
}this.removeAllBindingsForObject(bs);
}this.__bY={};
},getAllBindings:function(){return this.__bY;
},showBindingInLog:function(w,x){var z;
for(var i=0;i<this.__bY[w.toHashCode()].length;i++){if(this.__bY[w.toHashCode()][i][0]==x){z=this.__bY[w.toHashCode()][i];
break;
}}
if(z===undefined){var y=bI;
}else{var y=bK+z[1]+bR+z[2]+bO+z[3]+bR+z[4]+bP;
}qx.log.Logger.debug(y);
},showAllBindingsInLog:function(){for(var n in this.__bY){var m=qx.core.ObjectRegistry.fromHashCode(n);

for(var i=0;i<this.__bY[n].length;i++){this.showBindingInLog(m,this.__bY[n][i][0]);
}}}}});
})();
(function(){var r="",q="g",p="0",o='\\$1',n="%",m='-',l="qx.lang.String",k=' ',j='\n',h="undefined";
qx.Class.define(l,{statics:{camelCase:function(Q){return Q.replace(/\-([a-z])/g,function(H,I){return I.toUpperCase();
});
},hyphenate:function(E){return E.replace(/[A-Z]/g,function(F){return (m+F.charAt(0).toLowerCase());
});
},capitalize:function(K){return K.replace(/\b[a-z]/g,function(t){return t.toUpperCase();
});
},clean:function(L){return this.trim(L.replace(/\s+/g,k));
},trimLeft:function(J){return J.replace(/^\s+/,r);
},trimRight:function(G){return G.replace(/\s+$/,r);
},trim:function(D){return D.replace(/^\s+|\s+$/g,r);
},startsWith:function(x,y){return x.indexOf(y)===0;
},endsWith:function(B,C){return B.substring(B.length-C.length,B.length)===C;
},repeat:function(v,w){return v.length>0?new Array(w+1).join(v):r;
},pad:function(N,length,O){var P=length-N.length;

if(P>0){if(typeof O===h){O=p;
}return this.repeat(O,P)+N;
}else{return N;
}},firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(z,A){return z.indexOf(A)!=-1;
},format:function(a,b){var c=a;

for(var i=0;i<b.length;i++){c=c.replace(new RegExp(n+(i+1),q),b[i]+r);
}return c;
},escapeRegexpChars:function(u){return u.replace(/([.*+?^${}()|[\]\/\\])/g,o);
},toArray:function(s){return s.split(/\B|\b/g);
},stripTags:function(M){return M.replace(/<\/?[^>]+>/gi,r);
},stripScripts:function(d,e){var g=r;
var f=d.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){g+=arguments[1]+j;
return r;
});

if(e===true){qx.lang.Function.globalEval(g);
}return f;
}}});
})();
(function(){var c="qx.event.type.Data",b="qx.event.type.Event",a="qx.data.IListData";
qx.Interface.define(a,{events:{"change":c,"changeLength":b},members:{getItem:function(g){},setItem:function(e,f){},splice:function(h,i,j){},contains:function(d){},getLength:function(){},toArray:function(){}}});
})();
(function(){var a="qx.lang.Date";
qx.Class.define(a,{statics:{now:function(){return +new Date;
}}});
})();
(function(){var c=": ",b="qx.type.BaseError",a="";
qx.Class.define(b,{extend:Error,construct:function(d,e){Error.call(this,e);
this.__co=d||a;
this.message=e||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__co:null,message:null,getComment:function(){return this.__co;
},toString:function(){return this.__co+c+this.message;
}}});
})();
(function(){var a="qx.core.AssertionError";
qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);
this.__cp=qx.dev.StackTrace.getStackTrace();
},members:{__cp:null,getStackTrace:function(){return this.__cp;
}}});
})();
(function(){var a="qx.core.ValidationError";
qx.Class.define(a,{extend:qx.type.BaseError});
})();
(function(){var f="qx.lang.Type",e="Error",d="RegExp",c="Date",b="Number",a="Boolean";
qx.Class.define(f,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(k){return this.getClass(k)==d;
},isNumber:function(j){return (j!==null&&(this.getClass(j)==b||j instanceof Number));
},isBoolean:function(g){return (g!==null&&(this.getClass(g)==a||g instanceof Boolean));
},isDate:function(i){return (i!==null&&(this.getClass(i)==c||i instanceof Date));
},isError:function(h){return (h!==null&&(this.getClass(h)==e||h instanceof Error));
}}});
})();
(function(){var a="qx.event.IEventHandler";
qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:3},members:{canHandleEvent:function(h,i){},registerEvent:function(b,c,d){},unregisterEvent:function(e,f,g){}}});
})();
(function(){var b="qx.util.ObjectPool",a="Integer";
qx.Class.define(b,{extend:qx.core.Object,construct:function(c){qx.core.Object.call(this);
this.__cq={};

if(c!=null){this.setSize(c);
}},properties:{size:{check:a,init:Infinity}},members:{__cq:null,getObject:function(g){if(this.$$disposed){return new g;
}
if(!g){throw new Error("Class needs to be defined!");
}var h=null;
var j=this.__cq[g.classname];

if(j){h=j.pop();
}
if(h){h.$$pooled=false;
}else{h=new g;
}return h;
},poolObject:function(d){if(!this.__cq){return;
}var e=d.classname;
var f=this.__cq[e];

if(d.$$pooled){throw new Error("Object is already pooled: "+d);
}
if(!f){this.__cq[e]=f=[];
}if(f.length>this.getSize()){if(d.destroy){d.destroy();
}else{d.dispose();
}return;
}d.$$pooled=true;
f.push(d);
}},destruct:function(){var n=this.__cq;
var k,m,i,l;

for(k in n){m=n[k];

for(i=0,l=m.length;i<l;i++){m[i].dispose();
}}delete this.__cq;
}});
})();
(function(){var b="singleton",a="qx.event.Pool";
qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){qx.util.ObjectPool.call(this,30);
}});
})();
(function(){var a="qx.util.DisposeUtil";
qx.Class.define(a,{statics:{disposeObjects:function(q,r,s){var name;

for(var i=0,l=r.length;i<l;i++){name=r[i];

if(q[name]==null||!q.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(q[name].dispose){if(!s&&q[name].constructor.$$instance){throw new Error("The object stored in key "+name+" is a singleton! Please use disposeSingleton instead.");
}else{q[name].dispose();
}}else{throw new Error("Has no disposable object under key: "+name+"!");
}}q[name]=null;
}},disposeArray:function(m,n){var p=m[n];

if(!p){return;
}if(qx.core.ObjectRegistry.inShutDown){m[n]=null;
return;
}try{var o;

for(var i=p.length-1;i>=0;i--){o=p[i];

if(o){o.dispose();
}}}catch(b){throw new Error("The array field: "+n+" of object: "+m+" has non disposable entries: "+b);
}p.length=0;
m[n]=null;
},disposeMap:function(c,d){var e=c[d];

if(!e){return;
}if(qx.core.ObjectRegistry.inShutDown){c[d]=null;
return;
}try{for(var f in e){if(e.hasOwnProperty(f)){e[f].dispose();
}}}catch(g){throw new Error("The map field: "+d+" of object: "+c+" has non disposable entries: "+g);
}c[d]=null;
},disposeTriggeredBy:function(h,j){var k=j.dispose;
j.dispose=function(){k.call(j);
h.dispose();
};
}}});
})();
(function(){var a="qx.event.IEventDispatcher";
qx.Interface.define(a,{members:{canDispatchEvent:function(b,event,c){this.assertInstance(event,qx.event.type.Event);
this.assertString(c);
},dispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);
this.assertString(e);
}}});
})();
(function(){var a="qx.event.dispatch.Direct";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(d){this._manager=d;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(b,event,c){return !event.getBubbles();
},dispatchEvent:function(f,event,g){var k,h;
{};
event.setEventPhase(qx.event.type.Event.AT_TARGET);
var m=this._manager.getListeners(f,g,false);

if(m){for(var i=0,l=m.length;i<l;i++){var j=m[i].context||f;
m[i].handler.call(j,event);
}}}},defer:function(e){qx.event.Registration.addDispatcher(e);
}});
})();
(function(){var a="qx.event.handler.Object";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(i,j){return qx.Class.supportsEvent(i.constructor,j);
},registerEvent:function(e,f,g){},unregisterEvent:function(b,c,d){}},defer:function(h){qx.event.Registration.addHandler(h);
}});
})();
(function(){var q="indexOf",p="lastIndexOf",o="slice",n="concat",m="join",k="toLocaleUpperCase",j="shift",h="substr",g="filter",f="unshift",N="match",M="quote",L="qx.lang.Generics",K="localeCompare",J="sort",I="some",H="charAt",G="split",F="substring",E="pop",y="toUpperCase",z="replace",w="push",x="charCodeAt",u="every",v="reverse",r="search",t="forEach",A="map",B="toLowerCase",D="splice",C="toLocaleLowerCase";
qx.Class.define(L,{statics:{__cr:{"Array":[m,v,J,w,E,j,f,D,n,o,q,p,t,A,g,I,u],"String":[M,F,B,y,H,x,q,p,C,k,K,N,r,z,G,h,n,o]},__cs:function(O,P){return function(s){return O.prototype[P].apply(s,Array.prototype.slice.call(arguments,1));
};
},__ct:function(){var a=qx.lang.Generics.__cr;

for(var e in a){var c=window[e];
var b=a[e];

for(var i=0,l=b.length;i<l;i++){var d=b[i];

if(!c[d]){c[d]=qx.lang.Generics.__cs(c,d);
}}}}},defer:function(Q){Q.__ct();
}});
})();
exports.qx = qx;