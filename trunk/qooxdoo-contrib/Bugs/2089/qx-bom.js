if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!window.qxsettings) qxsettings = {};
var settings = {};
for (var k in settings) qxsettings[k] = settings[k];

if (!window.qxvariants) qxvariants = {};
var variants = {"qx.debug": "on", "qx.aspects": "off"};
for (var k in variants) qxvariants[k] = variants[k];

if (!window.qxlibraries) qxlibraries = {};
var libinfo = {"qx": {"resourceUri": ".", "version": "trunk"}};
for (var k in libinfo) qxlibraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {};
qx.$$locales = {"C": {"cldr_day_abbreviated_tue": "Tue", "cldr_day_wide_thu": "Thursday", "cldr_date_time_format_MEd": "E, M/d", "cldr_date_time_format_MMM": "LLL", "cldr_day_abbreviated_fri": "Fri", "cldr_day_wide_sun": "Sunday", "cldr_day_wide_mon": "Monday", "cldr_pm": "PM", "alternateQuotationEnd": "’", "cldr_day_narrow_sun": "S", "cldr_date_format_full": "EEEE, MMMM d, yyyy", "cldr_month_abbreviated_9": "Sep", "cldr_month_abbreviated_8": "Aug", "cldr_month_narrow_10": "O", "cldr_month_narrow_11": "N", "cldr_month_abbreviated_1": "Jan", "cldr_month_abbreviated_3": "Mar", "cldr_month_abbreviated_2": "Feb", "cldr_month_abbreviated_5": "May", "cldr_month_abbreviated_4": "Apr", "cldr_month_abbreviated_7": "Jul", "cldr_month_abbreviated_6": "Jun", "cldr_date_time_format_MMMd": "MMM d", "cldr_date_time_format_yM": "M/yyyy", "cldr_number_group_separator": ",", "cldr_date_time_format_MMMEd": "E, MMM d", "cldr_date_time_format_yQ": "Q yyyy", "cldr_date_time_format_hm": "h:mm a", "cldr_month_wide_2": "February", "cldr_month_narrow_12": "D", "cldr_month_wide_1": "January", "cldr_month_wide_6": "June", "cldr_month_wide_7": "July", "cldr_date_time_format_MMMMd": "MMMM d", "cldr_month_wide_5": "May", "cldr_month_wide_8": "August", "cldr_month_wide_9": "September", "cldr_date_time_format_MMMMEd": "E, MMMM d", "cldr_month_wide_10": "October", "cldr_month_wide_11": "November", "cldr_month_wide_12": "December", "cldr_number_decimal_separator": ".", "cldr_number_percent_format": "#,##0%", "cldr_day_narrow_tue": "T", "alternateQuotationStart": "‘", "cldr_time_format_short": "h:mm a", "cldr_time_format_medium": "h:mm:ss a", "cldr_date_time_format_yMMMEd": "EEE, MMM d, yyyy", "cldr_date_time_format_yMEd": "EEE, M/d/yyyy", "cldr_date_time_format_yMMM": "MMM yyyy", "cldr_date_time_format_yMMMM": "MMMM yyyy", "cldr_day_wide_wed": "Wednesday", "cldr_date_format_long": "MMMM d, yyyy", "cldr_month_abbreviated_11": "Nov", "cldr_month_abbreviated_10": "Oct", "cldr_month_abbreviated_12": "Dec", "cldr_day_wide_fri": "Friday", "cldr_day_wide_tue": "Tuesday", "cldr_date_time_format_Md": "M/d", "cldr_day_abbreviated_mon": "Mon", "cldr_date_time_format_Hms": "HH:mm:ss", "cldr_date_time_format_y": "yyyy", "quotationEnd": "”", "cldr_month_narrow_5": "M", "cldr_day_narrow_sat": "S", "cldr_date_format_medium": "MMM d, yyyy", "cldr_day_abbreviated_wed": "Wed", "cldr_date_time_format_ms": "mm:ss", "quotationStart": "“", "cldr_month_narrow_9": "S", "cldr_day_abbreviated_sat": "Sat", "cldr_day_narrow_wed": "W", "cldr_am": "AM", "cldr_day_narrow_fri": "F", "cldr_day_wide_sat": "Saturday", "cldr_day_narrow_thu": "T", "cldr_month_wide_3": "March", "cldr_day_abbreviated_sun": "Sun", "cldr_day_abbreviated_thu": "Thu", "cldr_date_format_short": "M/d/yy", "cldr_date_time_format_M": "L", "cldr_time_format_long": "h:mm:ss a z", "cldr_date_time_format_Hm": "HH:mm", "cldr_day_narrow_mon": "M", "cldr_month_narrow_1": "J", "cldr_month_narrow_2": "F", "cldr_month_narrow_3": "M", "cldr_month_narrow_4": "A", "cldr_month_wide_4": "April", "cldr_month_narrow_6": "J", "cldr_month_narrow_7": "J", "cldr_month_narrow_8": "A", "cldr_date_time_format_yQQQ": "QQQ yyyy", "cldr_time_format_full": "h:mm:ss a v", "cldr_date_time_format_d": "d"}}

qx.$$loader = {
  parts : {"boot":[0]},
  uris : [["./qx-bom-0.js"]],
  boot : "boot"
};  

if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return "[Class "+this.classname+"]";
},createNamespace:function(name,object){var splits=name.split(".");
var parent=window;
var part=splits[0];

for(var i=0,len=splits.length-1;i<len;i++,part=splits[i]){if(!parent[part]){parent=parent[part]={};
}else{parent=parent[part];
}}parent[part]=object;
return part;
},define:function(name,config){if(!config){var config={statics:{}};
}var clazz;
var proto=null;

if(config.members){clazz=config.construct||new Function;
var statics=config.statics;

for(var key in statics){clazz[key]=statics[key];
}proto=clazz.prototype;
var members=config.members;

for(var key in members){proto[key]=members[key];
}}else{clazz=config.statics||{};
}var basename=this.createNamespace(name,clazz);
clazz.name=clazz.classname=name;
clazz.basename=basename;
clazz.$$type="Class";
if(!clazz.hasOwnProperty("toString")){clazz.toString=this.genericToString;
}if(config.defer){config.defer(clazz,proto);
}qx.Bootstrap.$$registry[name]=config.statics;
}};
qx.Bootstrap.define("qx.Bootstrap",{statics:{LOADSTART:new Date,createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,genericToString:qx.Bootstrap.genericToString,getByName:function(name){return this.$$registry[name];
},$$registry:{}}});
qx.Bootstrap.define("qx.core.Setting",{statics:{__settings:{},define:function(key,defaultValue){if(defaultValue===undefined){throw new Error('Default value of setting "'+key+'" must be defined!');
}
if(!this.__settings[key]){this.__settings[key]={};
}else if(this.__settings[key].defaultValue!==undefined){throw new Error('Setting "'+key+'" is already defined!');
}this.__settings[key].defaultValue=defaultValue;
},get:function(key){var cache=this.__settings[key];

if(cache===undefined){throw new Error('Setting "'+key+'" is not defined.');
}
if(cache.value!==undefined){return cache.value;
}return cache.defaultValue;
},__init:function(){if(window.qxsettings){for(var key in qxsettings){if((key.split(".")).length<2){throw new Error('Malformed settings key "'+key+'". Must be following the schema "namespace.key".');
}
if(!this.__settings[key]){this.__settings[key]={};
}this.__settings[key].value=qxsettings[key];
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(ex){}this.__loadUrlSettings();
}},__loadUrlSettings:function(){if(this.get("qx.allowUrlSettings")!=true){return;
}var urlSettings=document.location.search.slice(1).split("&");

for(var i=0;i<urlSettings.length;i++){var setting=urlSettings[i].split(":");

if(setting.length!=3||setting[0]!="qxsetting"){continue;
}var key=setting[1];

if(!this.__settings[key]){this.__settings[key]={};
}this.__settings[key].value=decodeURIComponent(setting[2]);
}}},defer:function(statics){statics.define("qx.allowUrlSettings",false);
statics.define("qx.allowUrlVariants",false);
statics.__init();
}});
qx.Bootstrap.define("qx.bom.client.Engine",{statics:{NAME:"",FULLVERSION:"0.0.0",VERSION:0.0,OPERA:false,WEBKIT:false,GECKO:false,MSHTML:false,UNKNOWN_ENGINE:false,UNKNOWN_VERSION:false,__init:function(){var engine="unknown";
var version="0.0.0";
var agent=navigator.userAgent;
var unknownEngine=false;
var unknownVersion=false;

if(window.opera){engine="opera";
this.OPERA=true;
if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(agent)){version=RegExp.$1+"."+RegExp.$2;

if(RegExp.$3!=""){version+="."+RegExp.$3;
}}else{unknownVersion=true;
version="9.6.0";
}}else if(navigator.userAgent.indexOf("AppleWebKit/")!=-1){engine="webkit";
this.WEBKIT=true;

if(/AppleWebKit\/([^ ]+)/.test(agent)){version=RegExp.$1;
var invalidCharacter=RegExp("[^\\.0-9]").exec(version);

if(invalidCharacter){version=version.slice(0,invalidCharacter.index);
}}else{unknownVersion=true;
version="525.26";
}}else if(window.controllers&&navigator.product==="Gecko"){engine="gecko";
this.GECKO=true;
if(/rv\:([^\);]+)(\)|;)/.test(agent)){version=RegExp.$1;
}else{unknownVersion=true;
version="1.9.0.0";
}}else if(navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(agent)){engine="mshtml";
version=RegExp.$1;
if(version>=8&&document.documentMode<8){version="7.0";
}this.MSHTML=true;
}else{var failFunction=window.qxFail;

if(failFunction&&typeof failFunction==="function"){var engine=failFunction();

if(engine.NAME&&engine.FULLVERSION){engine=engine.NAME;
this[engine.toUpperCase()]=true;
version=engine.FULLVERSION;
}}else{unknownEngine=true;
unknownVersion=true;
version="1.9.0.0";
engine="gecko";
this.GECKO=true;
alert("Unsupported client: "+agent+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}this.UNKNOWN_ENGINE=unknownEngine;
this.UNKNOWN_VERSION=unknownVersion;
this.NAME=engine;
this.FULLVERSION=version;
this.VERSION=parseFloat(version);
}},defer:function(statics){statics.__init();
}});
qx.Bootstrap.define("qx.core.Variant",{statics:{__variants:{},__cache:{},compilerIsSet:function(){return true;
},define:function(key,allowedValues,defaultValue){{if(!this.__isValidArray(allowedValues)){throw new Error('Allowed values of variant "'+key+'" must be defined!');
}
if(defaultValue===undefined){throw new Error('Default value of variant "'+key+'" must be defined!');
}};

if(!this.__variants[key]){this.__variants[key]={};
}else{if(this.__variants[key].defaultValue!==undefined){throw new Error('Variant "'+key+'" is already defined!');
}}this.__variants[key].allowedValues=allowedValues;
this.__variants[key].defaultValue=defaultValue;
},get:function(key){var data=this.__variants[key];
{if(data===undefined){throw new Error('Variant "'+key+'" is not defined.');
}};

if(data.value!==undefined){return data.value;
}return data.defaultValue;
},__init:function(){if(window.qxvariants){for(var key in qxvariants){{if((key.split(".")).length<2){throw new Error('Malformed settings key "'+key+'". Must be following the schema "namespace.key".');
}};

if(!this.__variants[key]){this.__variants[key]={};
}this.__variants[key].value=qxvariants[key];
}window.qxvariants=undefined;

try{delete window.qxvariants;
}catch(ex){}this.__loadUrlVariants(this.__variants);
}},__loadUrlVariants:function(){if(qx.core.Setting.get("qx.allowUrlVariants")!=true){return;
}var urlVariants=document.location.search.slice(1).split("&");

for(var i=0;i<urlVariants.length;i++){var variant=urlVariants[i].split(":");

if(variant.length!=3||variant[0]!="qxvariant"){continue;
}var key=variant[1];

if(!this.__variants[key]){this.__variants[key]={};
}this.__variants[key].value=decodeURIComponent(variant[2]);
}},select:function(key,variantFunctionMap){{if(!this.__isValidObject(this.__variants[key])){throw new Error("Variant \""+key+"\" is not defined");
}
if(!this.__isValidObject(variantFunctionMap)){throw new Error("the second parameter must be a map!");
}};

for(var variant in variantFunctionMap){if(this.isSet(key,variant)){return variantFunctionMap[variant];
}}
if(variantFunctionMap["default"]!==undefined){return variantFunctionMap["default"];
}{throw new Error('No match for variant "'+key+'" in variants ['+qx.lang.Object.getKeysAsString(variantFunctionMap)+'] found, and no default ("default") given');
};
},isSet:function(key,variants){var access=key+"$"+variants;

if(this.__cache[access]!==undefined){return this.__cache[access];
}var retval=false;
if(variants.indexOf("|")<0){retval=this.get(key)===variants;
}else{var keyParts=variants.split("|");

for(var i=0,l=keyParts.length;i<l;i++){if(this.get(key)===keyParts[i]){retval=true;
break;
}}}this.__cache[access]=retval;
return retval;
},__isValidArray:function(v){return typeof v==="object"&&v!==null&&v instanceof Array;
},__isValidObject:function(v){return typeof v==="object"&&v!==null&&!(v instanceof Array);
},__arrayContains:function(arr,obj){for(var i=0,l=arr.length;i<l;i++){if(arr[i]==obj){return true;
}}return false;
}},defer:function(statics){statics.define("qx.client",["gecko","mshtml","opera","webkit"],qx.bom.client.Engine.NAME);
statics.define("qx.debug",["on","off"],"on");
statics.define("qx.aspects",["on","off"],"off");
statics.define("qx.dynlocale",["on","off"],"on");
statics.__init();
}});
qx.Bootstrap.define("qx.bom.Event",{statics:{addNativeListener:qx.core.Variant.select("qx.client",{"mshtml":function(target,type,listener){target.attachEvent("on"+type,listener);
},"default":function(target,type,listener){target.addEventListener(type,listener,false);
}}),removeNativeListener:qx.core.Variant.select("qx.client",{"mshtml":function(target,type,listener){target.detachEvent("on"+type,listener);
},"default":function(target,type,listener){target.removeEventListener(type,listener,false);
}}),getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:qx.core.Variant.select("qx.client",{"mshtml":function(e){if(e.type==="mouseover"){return e.fromEvent;
}else{return e.toElement;
}},"default":function(e){return e.relatedTarget;
}}),preventDefault:qx.core.Variant.select("qx.client",{"gecko":function(e){if(qx.bom.client.Engine.VERSION>=1.9&&e.type=="mousedown"&&e.button==2){return;
}e.preventDefault();

try{e.keyCode=0;
}catch(ex){}},"mshtml":function(e){try{e.keyCode=0;
}catch(ex){}e.returnValue=false;
},"default":function(e){e.preventDefault();
}}),stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}e.cancelBubble=true;
}}});
qx.Bootstrap.define("qx.event.Manager",{construct:function(win){this.__window=win;
if(win.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(win,"unload",function(){qx.bom.Event.removeNativeListener(win,"unload",arguments.callee);
self.dispose();
});
}this.__listeners={};
this.__handlers={};
this.__dispatchers={};
this.__handlerCache={};
},statics:{__lastUnique:0,getNextUniqueId:function(){return (this.__lastUnique++).toString(36);
}},members:{getWindow:function(){return this.__window;
},getHandler:function(clazz){var handler=this.__handlers[clazz.classname];

if(handler){return handler;
}return this.__handlers[clazz.classname]=new clazz(this);
},getDispatcher:function(clazz){var dispatcher=this.__dispatchers[clazz.classname];

if(dispatcher){return dispatcher;
}return this.__dispatchers[clazz.classname]=new clazz(this);
},getListeners:function(target,type,capture){var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];

if(!targetMap){return null;
}var entryKey=type+(capture?"|capture":"|bubble");
var entryList=targetMap[entryKey];
return entryList?entryList.concat():null;
},serializeListeners:function(target){var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];
var result=[];

if(targetMap){var indexOf,type,capture,entryList,entry;

for(var entryKey in targetMap){indexOf=entryKey.indexOf("|");
type=entryKey.substring(0,indexOf);
capture=entryKey.charAt(indexOf+1)=="c";
entryList=targetMap[entryKey];

for(var i=0,l=entryList.length;i<l;i++){entry=entryList[i];
result.push({self:entry.context,handler:entry.handler,type:type,capture:capture});
}}}return result;
},toggleAttachedEvents:function(target,enable){var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];

if(targetMap){var indexOf,type,capture,entryList;

for(var entryKey in targetMap){indexOf=entryKey.indexOf("|");
type=entryKey.substring(0,indexOf);
capture=entryKey.charCodeAt(indexOf+1)===99;
entryList=targetMap[entryKey];

if(enable){this.__registerAtHandler(target,type,capture);
}else{this.__unregisterAtHandler(target,type,capture);
}}}},hasListener:function(target,type,capture){{if(target==null){qx.log.Logger.trace(this);
throw new Error("Invalid object: "+target);
}};
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];

if(!targetMap){return false;
}var entryKey=type+(capture?"|capture":"|bubble");
var entryList=targetMap[entryKey];
return entryList&&entryList.length>0;
},importListeners:function(target,list){{if(target==null){qx.log.Logger.trace(this);
throw new Error("Invalid object: "+target);
}};
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey]={};
var clazz=qx.event.Manager;

for(var listKey in list){var item=list[listKey];
var entryKey=item.type+(item.capture?"|capture":"|bubble");
var entryList=targetMap[entryKey];

if(!entryList){entryList=targetMap[entryKey]=[];
this.__registerAtHandler(target,item.type,item.capture);
}entryList.push({handler:item.listener,context:item.self,unique:item.unique||(clazz.__lastUnique++).toString(36)});
}},addListener:function(target,type,listener,self,capture){{var msg="Failed to add event listener for type '"+type+"'"+" to the target '"+target+"': ";
qx.core.Assert.assertObject(target,msg+"Invalid Target.");
qx.core.Assert.assertString(type,msg+"Invalid event type.");
qx.core.Assert.assertFunction(listener,msg+"Invalid callback function");

if(capture!==undefined){qx.core.Assert.assertBoolean(capture,"Invalid capture flag.");
}};
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];

if(!targetMap){targetMap=this.__listeners[targetKey]={};
}var entryKey=type+(capture?"|capture":"|bubble");
var entryList=targetMap[entryKey];

if(!entryList){entryList=targetMap[entryKey]=[];
}if(entryList.length===0){this.__registerAtHandler(target,type,capture);
}var unique=(qx.event.Manager.__lastUnique++).toString(36);
var entry={handler:listener,context:self,unique:unique};
entryList.push(entry);
return entryKey+"|"+unique;
},findHandler:function(target,type){var isDomNode=false,isWindow=false,isObject=false;
var key;

if(target.nodeType===1){isDomNode=true;
key="DOM_"+target.tagName.toLowerCase()+"_"+type;
}else if(target==this.__window){isWindow=true;
key="WIN_"+type;
}else if(target.classname){isObject=true;
key="QX_"+target.classname+"_"+type;
}else{key="UNKNOWN_"+target+"_"+type;
}var cache=this.__handlerCache;

if(cache[key]){return cache[key];
}var classes=qx.event.Registration.getHandlers();
var IEventHandler=qx.event.IEventHandler;
var clazz,instance,supportedTypes,targetCheck;

for(var i=0,l=classes.length;i<l;i++){clazz=classes[i];
supportedTypes=clazz.SUPPORTED_TYPES;

if(supportedTypes&&!supportedTypes[type]){continue;
}targetCheck=clazz.TARGET_CHECK;

if(targetCheck){if(!isDomNode&&targetCheck===IEventHandler.TARGET_DOMNODE){continue;
}else if(!isWindow&&targetCheck===IEventHandler.TARGET_WINDOW){continue;
}else if(!isObject&&targetCheck===IEventHandler.TARGET_OBJECT){continue;
}}instance=this.getHandler(classes[i]);

if(clazz.IGNORE_CAN_HANDLE||instance.canHandleEvent(target,type)){cache[key]=instance;
return instance;
}}return null;
},__registerAtHandler:function(target,type,capture){var handler=this.findHandler(target,type);

if(handler){handler.registerEvent(target,type,capture);
return;
}{qx.log.Logger.warn(this,"There is no event handler for the event '"+type+"' on target '"+target+"'!");
};
},removeListener:function(target,type,listener,self,capture){{var msg="Failed to remove event listener for type '"+type+"'"+" from the target '"+target+"': ";
qx.core.Assert.assertObject(target,msg+"Invalid Target.");
qx.core.Assert.assertString(type,msg+"Invalid event type.");
qx.core.Assert.assertFunction(listener,msg+"Invalid callback function");

if(self!==undefined){qx.core.Assert.assertObject(self,"Invalid context for callback.");
}
if(capture!==undefined){qx.core.Assert.assertBoolean(capture,"Invalid capture falg.");
}};
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];

if(!targetMap){return false;
}var entryKey=type+(capture?"|capture":"|bubble");
var entryList=targetMap[entryKey];

if(!entryList){return false;
}var entry;

for(var i=0,l=entryList.length;i<l;i++){entry=entryList[i];

if(entry.handler===listener&&entry.context===self){qx.lang.Array.removeAt(entryList,i);

if(entryList.length==0){this.__unregisterAtHandler(target,type,capture);
}return true;
}}return false;
},removeListenerById:function(target,id){{var msg="Failed to remove event listener for id '"+id+"'"+" from the target '"+target+"': ";
qx.core.Assert.assertObject(target,msg+"Invalid Target.");
qx.core.Assert.assertString(id,msg+"Invalid id type.");
};
var split=id.split("|");
var type=split[0];
var capture=split[1].charCodeAt(0)==99;
var unique=split[2];
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];

if(!targetMap){return false;
}var entryKey=type+(capture?"|capture":"|bubble");
var entryList=targetMap[entryKey];

if(!entryList){return false;
}var entry;

for(var i=0,l=entryList.length;i<l;i++){entry=entryList[i];

if(entry.unique===unique){qx.lang.Array.removeAt(entryList,i);

if(entryList.length==0){this.__unregisterAtHandler(target,type,capture);
}return true;
}}return false;
},removeAllListeners:function(target){var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];

if(!targetMap){return false;
}var split,type,capture;

for(var entryKey in targetMap){if(targetMap[entryKey].length>0){split=entryKey.split("|");
type=split[0];
capture=split[1]==="capture";
this.__unregisterAtHandler(target,type,capture);
}}delete this.__listeners[targetKey];
return true;
},__unregisterAtHandler:function(target,type,capture){var handler=this.findHandler(target,type);

if(handler){handler.unregisterEvent(target,type,capture);
return;
}{qx.log.Logger.warn(this,"There is no event handler for the event '"+type+"' on target '"+target+"'!");
};
},dispatchEvent:function(target,event){{var msg="Could not dispatch event '"+event+"' on target '"+target+"': ";
qx.core.Assert.assertNotUndefined(target,msg+"Invalid event target.");
qx.core.Assert.assertNotNull(target,msg+"Invalid event target.");
qx.core.Assert.assertInstance(event,qx.event.type.Event,msg+"Invalid event object.");
};
var type=event.getType();

if(!event.getBubbles()&&!this.hasListener(target,type)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(target);
}var classes=qx.event.Registration.getDispatchers();
var instance;
var dispatched=false;

for(var i=0,l=classes.length;i<l;i++){instance=this.getDispatcher(classes[i]);
if(instance.canDispatchEvent(target,event,type)){instance.dispatchEvent(target,event,type);
dispatched=true;
break;
}}
if(!dispatched){qx.log.Logger.error(this,"No dispatcher can handle event of type "+type+" on "+target);
return true;
}var preventDefault=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !preventDefault;
}},destruct:function(){qx.event.Registration.removeManager(this);
this.__listeners=this.__window=this.__handlers=this.__dispatchers=this.__disposeWrapper=this.__handlerCache=null;
}});
qx.Bootstrap.define("qx.lang.Object",{statics:{empty:function(map){for(var key in map){if(map.hasOwnProperty(key)){delete map[key];
}}},isEmpty:function(map){for(var key in map){return false;
}return true;
},hasMinLength:function(map,minLength){var length=0;

for(var key in map){if((++length)>=minLength){return true;
}}return false;
},getLength:function(map){var length=0;

for(var key in map){length++;
}return length;
},_shadowedKeys:["isPrototypeOf","hasOwnProperty","toLocaleString","toString","valueOf"],getKeys:qx.core.Variant.select("qx.client",{"mshtml":function(map){{if(!(map&&map.constructor&&map.constructor===({}).constructor)){qx.log.Logger.trace(this);
throw new Error("Invalid map: "+map);
}};
var arr=[];

for(var key in map){arr.push(key);
}for(var i=0,a=this._shadowedKeys,l=a.length;i<l;i++){if(map.hasOwnProperty(a[i])){arr.push(a[i]);
}}return arr;
},"default":function(map){var arr=[];

for(var key in map){arr.push(key);
}return arr;
}}),getKeysAsString:function(map){var keys=qx.lang.Object.getKeys(map);

if(keys.length==0){return "";
}return '"'+keys.join('\", "')+'"';
},getValues:function(map){var arr=[];

for(var key in map){arr.push(map[key]);
}return arr;
},mergeWith:function(target,source,overwrite){if(overwrite===undefined){overwrite=true;
}
for(var key in source){if(overwrite||target[key]===undefined){target[key]=source[key];
}}return target;
},carefullyMergeWith:function(target,source){return qx.lang.Object.mergeWith(target,source,false);
},merge:function(target,varargs){var len=arguments.length;

for(var i=1;i<len;i++){qx.lang.Object.mergeWith(target,arguments[i]);
}return target;
},copy:function(source){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Use 'clone()' instead!");
return qx.lang.Object.clone(source);
},clone:function(source){var clone={};

for(var key in source){clone[key]=source[key];
}return clone;
},invert:function(map){var result={};

for(var key in map){result[map[key].toString()]=key;
}return result;
},getKeyFromValue:function(obj,value){for(var key in obj){if(obj.hasOwnProperty(key)&&obj[key]===value){return key;
}}return null;
},contains:function(obj,value){return this.getKeyFromValue(obj,value)!==null;
},select:function(key,map){return map[key];
},fromArray:function(array){var obj={};

for(var i=0,l=array.length;i<l;i++){{switch(typeof array[i]){case "object":case "function":case "undefined":throw new Error("Could not convert complex objects like "+array[i]+" at array index "+i+" to map syntax");
}};
obj[array[i].toString()]=true;
}return obj;
}}});
qx.Bootstrap.define("qx.Class",{statics:{define:function(name,config){if(!config){var config={};
}if(config.include&&!(config.include instanceof Array)){config.include=[config.include];
}if(config.implement&&!(config.implement instanceof Array)){config.implement=[config.implement];
}if(!config.hasOwnProperty("extend")&&!config.type){config.type="static";
}{this.__validateConfig(name,config);
};
var clazz=this.__createClass(name,config.type,config.extend,config.statics,config.construct,config.destruct);
if(config.extend){if(config.properties){this.__addProperties(clazz,config.properties,true);
}if(config.members){this.__addMembers(clazz,config.members,true,true,false);
}if(config.events){this.__addEvents(clazz,config.events,true);
}if(config.include){for(var i=0,l=config.include.length;i<l;i++){this.__addMixin(clazz,config.include[i],false);
}}}if(config.settings){for(var key in config.settings){qx.core.Setting.define(key,config.settings[key]);
}}if(config.variants){for(var key in config.variants){qx.core.Variant.define(key,config.variants[key].allowedValues,config.variants[key].defaultValue);
}}if(config.implement){for(var i=0,l=config.implement.length;i<l;i++){this.__addInterface(clazz,config.implement[i]);
}}{this.__validateAbstractInterfaces(clazz);
};
if(config.defer){config.defer.self=clazz;
config.defer(clazz,clazz.prototype,{add:function(name,config){var properties={};
properties[name]=config;
qx.Class.__addProperties(clazz,properties,true);
}});
}},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},getByName:function(name){return this.$$registry[name];
},include:function(clazz,mixin){{if(!mixin){throw new Error("Includes of mixins must be mixins. A dynamic mixin of class '"+clazz.classname+"' is undefined/null!");
}qx.Mixin.isCompatible(mixin,clazz);
};
qx.Class.__addMixin(clazz,mixin,false);
},patch:function(clazz,mixin){{if(!mixin){throw new Error("Includes of mixins must be mixins. A dynamic mixin of class '"+clazz.classname+"' is undefined/null!");
}qx.Mixin.isCompatible(mixin,clazz);
};
qx.Class.__addMixin(clazz,mixin,true);
},isSubClassOf:function(clazz,superClass){if(!clazz){return false;
}
if(clazz==superClass){return true;
}
if(clazz.prototype instanceof superClass){return true;
}return false;
},getPropertyDefinition:function(clazz,name){while(clazz){if(clazz.$$properties&&clazz.$$properties[name]){return clazz.$$properties[name];
}clazz=clazz.superclass;
}return null;
},getProperties:function(clazz){var list=[];

while(clazz){if(clazz.$$properties){list.push.apply(list,qx.lang.Object.getKeys(clazz.$$properties));
}clazz=clazz.superclass;
}return list;
},getByProperty:function(clazz,name){while(clazz){if(clazz.$$properties&&clazz.$$properties[name]){return clazz;
}clazz=clazz.superclass;
}return null;
},hasProperty:function(clazz,name){return !!this.getPropertyDefinition(clazz,name);
},getEventType:function(clazz,name){var clazz=clazz.constructor;

while(clazz.superclass){if(clazz.$$events&&clazz.$$events[name]!==undefined){return clazz.$$events[name];
}clazz=clazz.superclass;
}return null;
},supportsEvent:function(clazz,name){return !!this.getEventType(clazz,name);
},hasOwnMixin:function(clazz,mixin){return clazz.$$includes&&clazz.$$includes.indexOf(mixin)!==-1;
},getByMixin:function(clazz,mixin){var list,i,l;

while(clazz){if(clazz.$$includes){list=clazz.$$flatIncludes;

for(i=0,l=list.length;i<l;i++){if(list[i]===mixin){return clazz;
}}}clazz=clazz.superclass;
}return null;
},getMixins:function(clazz){var list=[];

while(clazz){if(clazz.$$includes){list.push.apply(list,clazz.$$flatIncludes);
}clazz=clazz.superclass;
}return list;
},hasMixin:function(clazz,mixin){return !!this.getByMixin(clazz,mixin);
},hasOwnInterface:function(clazz,iface){return clazz.$$implements&&clazz.$$implements.indexOf(iface)!==-1;
},getByInterface:function(clazz,iface){var list,i,l;

while(clazz){if(clazz.$$implements){list=clazz.$$flatImplements;

for(i=0,l=list.length;i<l;i++){if(list[i]===iface){return clazz;
}}}clazz=clazz.superclass;
}return null;
},getInterfaces:function(clazz){var list=[];

while(clazz){if(clazz.$$implements){list.push.apply(list,clazz.$$flatImplements);
}clazz=clazz.superclass;
}return list;
},hasInterface:function(clazz,iface){return !!this.getByInterface(clazz,iface);
},implementsInterface:function(obj,iface){var clazz=obj.constructor;

if(this.hasInterface(clazz,iface)){return true;
}
try{qx.Interface.assertObject(obj,iface);
return true;
}catch(ex){}
try{qx.Interface.assert(clazz,iface,false);
return true;
}catch(ex){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return "[Class "+this.classname+"]";
},$$registry:qx.Bootstrap.$$registry,__allowedKeys:{"type":"string","extend":"function","implement":"object","include":"object","construct":"function","statics":"object","properties":"object","members":"object","settings":"object","variants":"object","events":"object","defer":"function","destruct":"function"},__staticAllowedKeys:{"type":"string","statics":"object","settings":"object","variants":"object","defer":"function"},__validateConfig:function(name,config){if(config.type&&!(config.type==="static"||config.type==="abstract"||config.type==="singleton")){throw new Error('Invalid type "'+config.type+'" definition for class "'+name+'"!');
}if(config.type&&config.type!=="static"&&!config.extend){throw new Error('Invalid config in class "'+name+'"! Every non-static class has to extend at least the "qx.core.Object" class.');
}var allowed=config.type==="static"?this.__staticAllowedKeys:this.__allowedKeys;

for(var key in config){if(!allowed[key]){throw new Error('The configuration key "'+key+'" in class "'+name+'" is not allowed!');
}
if(config[key]==null){throw new Error('Invalid key "'+key+'" in class "'+name+'"! The value is undefined/null!');
}
if(typeof config[key]!==allowed[key]){throw new Error('Invalid type of key "'+key+'" in class "'+name+'"! The type of the key must be "'+allowed[key]+'"!');
}}var maps=["statics","properties","members","settings","variants","events"];

for(var i=0,l=maps.length;i<l;i++){var key=maps[i];

if(config[key]!==undefined&&(config[key] instanceof Array||config[key] instanceof RegExp||config[key] instanceof Date||config[key].classname!==undefined)){throw new Error('Invalid key "'+key+'" in class "'+name+'"! The value needs to be a map!');
}}if(config.include){if(config.include instanceof Array){for(var i=0,a=config.include,l=a.length;i<l;i++){if(a[i]==null||a[i].$$type!=="Mixin"){throw new Error('The include definition in class "'+name+'" contains an invalid mixin at position '+i+': '+a[i]);
}}}else{throw new Error('Invalid include definition in class "'+name+'"! Only mixins and arrays of mixins are allowed!');
}}if(config.implement){if(config.implement instanceof Array){for(var i=0,a=config.implement,l=a.length;i<l;i++){if(a[i]==null||a[i].$$type!=="Interface"){throw new Error('The implement definition in class "'+name+'" contains an invalid interface at position '+i+': '+a[i]);
}}}else{throw new Error('Invalid implement definition in class "'+name+'"! Only interfaces and arrays of interfaces are allowed!');
}}if(config.include){try{qx.Mixin.checkCompatibility(config.include);
}catch(ex){throw new Error('Error in include definition of class "'+name+'"! '+ex.message);
}}if(config.settings){for(var key in config.settings){if(key.substr(0,key.indexOf("."))!=name.substr(0,name.indexOf("."))){throw new Error('Forbidden setting "'+key+'" found in "'+name+'". It is forbidden to define a default setting for an external namespace!');
}}}if(config.variants){for(var key in config.variants){if(key.substr(0,key.indexOf("."))!=name.substr(0,name.indexOf("."))){throw new Error('Forbidden variant "'+key+'" found in "'+name+'". It is forbidden to define a variant for an external namespace!');
}}}},__validateAbstractInterfaces:function(clazz){var superclass=clazz.superclass;

while(superclass){if(superclass.$$classtype!=="abstract"){break;
}var interfaces=superclass.$$implements;

if(interfaces){for(var i=0;i<interfaces.length;i++){qx.Interface.assert(clazz,interfaces[i],true);
}}superclass=superclass.superclass;
}},__createClass:function(name,type,extend,statics,construct,destruct){var clazz;

if(!extend&&true){clazz=statics||{};
}else{clazz={};

if(extend){if(!construct){construct=this.__createDefaultConstructor();
}clazz=this.__wrapConstructor(construct,name,type);
}if(statics){var key;

for(var i=0,a=qx.lang.Object.getKeys(statics),l=a.length;i<l;i++){key=a[i];
{clazz[key]=statics[key];
};
var staticValue;
}}}var basename=qx.Bootstrap.createNamespace(name,clazz,false);
clazz.name=clazz.classname=name;
clazz.basename=basename;
clazz.$$type="Class";

if(type){clazz.$$classtype=type;
}if(!clazz.hasOwnProperty("toString")){clazz.toString=this.genericToString;
}
if(extend){var superproto=extend.prototype;
var helper=this.__createEmptyFunction();
helper.prototype=superproto;
var proto=new helper;
clazz.prototype=proto;
proto.name=proto.classname=name;
proto.basename=basename;
construct.base=clazz.superclass=extend;
construct.self=clazz.constructor=proto.constructor=clazz;
if(destruct){{};
clazz.$$destructor=destruct;
}}this.$$registry[name]=clazz;
return clazz;
},__addEvents:function(clazz,events,patch){{if(typeof events!=="object"||events instanceof Array){throw new Error(clazz.classname+": the events must be defined as map!");
}
for(var key in events){if(typeof events[key]!=="string"){throw new Error(clazz.classname+"/"+key+": the event value needs to be a string with the class name of the event object which will be fired.");
}}if(clazz.$$events&&patch!==true){for(var key in events){if(clazz.$$events[key]!==undefined&&clazz.$$events[key]!==events[key]){throw new Error(clazz.classname+"/"+key+": the event value/type cannot be changed from "+clazz.$$events[key]+" to "+events[key]);
}}}};

if(clazz.$$events){for(var key in events){clazz.$$events[key]=events[key];
}}else{clazz.$$events=events;
}},__addProperties:function(clazz,properties,patch){var config;

if(patch===undefined){patch=false;
}var attach=!!clazz.$$propertiesAttached;

for(var name in properties){config=properties[name];
{this.__validateProperty(clazz,name,config,patch);
};
config.name=name;
if(!config.refine){if(clazz.$$properties===undefined){clazz.$$properties={};
}clazz.$$properties[name]=config;
}if(config.init!==undefined){clazz.prototype["$$init_"+name]=config.init;
}if(config.event!==undefined){var event={};
event[config.event]="qx.event.type.Data";
this.__addEvents(clazz,event,patch);
}if(config.inheritable){qx.core.Property.$$inheritable[name]=true;
}if(attach){qx.core.Property.attachMethods(clazz,name,config);
}}},__validateProperty:function(clazz,name,config,patch){var has=this.hasProperty(clazz,name);

if(has){var existingProperty=this.getPropertyDefinition(clazz,name);

if(config.refine&&existingProperty.init===undefined){throw new Error("Could not refine a init value if there was previously no init value defined. Property '"+name+"' of class '"+clazz.classname+"'.");
}}
if(!has&&config.refine){throw new Error("Could not refine non-existent property: "+name+"!");
}
if(has&&!patch){throw new Error("Class "+clazz.classname+" already has a property: "+name+"!");
}
if(has&&patch){if(!config.refine){throw new Error('Could not refine property "'+name+'" without a "refine" flag in the property definition! This class: '+clazz.classname+', original class: '+this.getByProperty(clazz,name).classname+'.');
}
for(var key in config){if(key!=="init"&&key!=="refine"){throw new Error("Class "+clazz.classname+" could not refine property: "+name+"! Key: "+key+" could not be refined!");
}}}var allowed=config.group?qx.core.Property.$$allowedGroupKeys:qx.core.Property.$$allowedKeys;

for(var key in config){if(allowed[key]===undefined){throw new Error('The configuration key "'+key+'" of property "'+name+'" in class "'+clazz.classname+'" is not allowed!');
}
if(config[key]===undefined){throw new Error('Invalid key "'+key+'" of property "'+name+'" in class "'+clazz.classname+'"! The value is undefined: '+config[key]);
}
if(allowed[key]!==null&&typeof config[key]!==allowed[key]){throw new Error('Invalid type of key "'+key+'" of property "'+name+'" in class "'+clazz.classname+'"! The type of the key must be "'+allowed[key]+'"!');
}}
if(config.transform!=null){if(!(typeof config.transform=="string")){throw new Error('Invalid transform definition of property "'+name+'" in class "'+clazz.classname+'"! Needs to be a String.');
}}
if(config.check!=null){if(!(typeof config.check=="string"||config.check instanceof Array||config.check instanceof Function)){throw new Error('Invalid check definition of property "'+name+'" in class "'+clazz.classname+'"! Needs to be a String, Array or Function.');
}}},__addMembers:function(clazz,members,patch,base,wrap){var proto=clazz.prototype;
var key,member;

for(var i=0,a=qx.lang.Object.getKeys(members),l=a.length;i<l;i++){key=a[i];
member=members[key];
{if(proto[key]!==undefined&&key.charAt(0)=="_"&&key.charAt(1)=="_"){throw new Error('Overwriting private member "'+key+'" of Class "'+clazz.classname+'" is not allowed!');
}
if(patch!==true&&proto.hasOwnProperty(key)){throw new Error('Overwriting member "'+key+'" of Class "'+clazz.classname+'" is not allowed!');
}};
if(base!==false&&member instanceof Function&&member.$$type==null){if(wrap==true){member=this.__mixinMemberWrapper(member,proto[key]);
}else{if(proto[key]){member.base=proto[key];
}member.self=clazz;
}{};
}proto[key]=member;
}},__mixinMemberWrapper:function(member,base){if(base){return function(){var oldBase=member.base;
member.base=base;
var retval=member.apply(this,arguments);
member.base=oldBase;
return retval;
};
}else{return member;
}},__addInterface:function(clazz,iface){{if(!clazz||!iface){throw new Error("Incomplete parameters!");
}if(this.hasOwnInterface(clazz,iface)){throw new Error('Interface "'+iface.name+'" is already used by Class "'+clazz.classname+'!');
}if(clazz.$$classtype!=="abstract"){qx.Interface.assert(clazz,iface,true);
}};
var list=qx.Interface.flatten([iface]);

if(clazz.$$implements){clazz.$$implements.push(iface);
clazz.$$flatImplements.push.apply(clazz.$$flatImplements,list);
}else{clazz.$$implements=[iface];
clazz.$$flatImplements=list;
}},__addMixin:function(clazz,mixin,patch){{if(!clazz||!mixin){throw new Error("Incomplete parameters!");
}};

if(this.hasMixin(clazz,mixin)){qx.log.Logger.warn('Mixin "'+mixin.name+'" is already included into Class "'+clazz.classname+'" by class: '+this.getByMixin(clazz,mixin).classname+'!');
return;
}var list=qx.Mixin.flatten([mixin]);
var entry;

for(var i=0,l=list.length;i<l;i++){entry=list[i];
if(entry.$$events){this.__addEvents(clazz,entry.$$events,patch);
}if(entry.$$properties){this.__addProperties(clazz,entry.$$properties,patch);
}if(entry.$$members){this.__addMembers(clazz,entry.$$members,patch,patch,patch);
}}if(clazz.$$includes){clazz.$$includes.push(mixin);
clazz.$$flatIncludes.push.apply(clazz.$$flatIncludes,list);
}else{clazz.$$includes=[mixin];
clazz.$$flatIncludes=list;
}},__createDefaultConstructor:function(){function defaultConstructor(){arguments.callee.base.apply(this,arguments);
}return defaultConstructor;
},__createEmptyFunction:function(){return function(){};
},__wrapConstructor:function(construct,name,type){var wrapper=function(){var clazz=arguments.callee.constructor;
{if(!(this instanceof clazz)){throw new Error("Please initialize '"+name+"' objects using the new keyword!");
}if(type==="abstract"){if(this.classname===name){throw new Error("The class ',"+name+"' is abstract! It is not possible to instantiate it.");
}}else if(type==="singleton"){if(!clazz.$$allowconstruct){throw new Error("The class '"+name+"' is a singleton! It is not possible to instantiate it directly. Use the static getInstance() method instead.");
}}};
if(!clazz.$$propertiesAttached){qx.core.Property.attach(clazz);
}var retval=clazz.$$original.apply(this,arguments);
if(clazz.$$includes){var mixins=clazz.$$flatIncludes;

for(var i=0,l=mixins.length;i<l;i++){if(mixins[i].$$constructor){mixins[i].$$constructor.apply(this,arguments);
}}}if(this.classname===name.classname){this.$$initialized=true;
}return retval;
};
var aspectWrapper;
if(type==="singleton"){wrapper.getInstance=this.getInstance;
}wrapper.$$original=construct;
construct.wrapper=wrapper;
return wrapper;
}},defer:function(statics){var classname,statics,key;
}});
qx.Class.define("qx.dom.Node",{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(node){return node.nodeType===
this.DOCUMENT?node:
node.ownerDocument||node.document;
},getWindow:qx.core.Variant.select("qx.client",{"mshtml":function(node){if(node.nodeType==null){return node;
}if(node.nodeType!==this.DOCUMENT){node=node.ownerDocument;
}return node.parentWindow;
},"default":function(node){if(node.nodeType==null){return node;
}if(node.nodeType!==this.DOCUMENT){node=node.ownerDocument;
}return node.defaultView;
}}),getDocumentElement:function(node){return this.getDocument(node).documentElement;
},getBodyElement:function(node){return this.getDocument(node).body;
},isNode:function(node){return !!(node&&node.nodeType!=null);
},isElement:function(node){return !!(node&&node.nodeType===this.ELEMENT);
},isDocument:function(node){return !!(node&&node.nodeType===this.DOCUMENT);
},isText:function(node){return !!(node&&node.nodeType===this.TEXT);
},isWindow:function(obj){return !!(obj&&obj.history&&obj.location&&obj.document);
},getText:function(node){if(!node||!node.nodeType){return null;
}
switch(node.nodeType){case 1:var i,a=[],nodes=node.childNodes,length=nodes.length;

for(i=0;i<length;i++){a[i]=this.getText(nodes[i]);
}return a.join("");
case 2:return node.nodeValue;
break;
case 3:return node.nodeValue;
break;
}return null;
}}});
qx.Bootstrap.define("qx.lang.Array",{statics:{isArray:function(obj){return Object.prototype.toString.call(obj)==="[object Array]"||obj instanceof Array;
},toArray:function(object,offset){return this.cast(object,Array,offset);
},cast:function(object,constructor,offset){if(object.constructor===constructor){return object;
}
if(qx.Class.hasInterface(object,qx.data.IListData)){var object=object.toArray();
}var ret=new constructor;
if(qx.core.Variant.isSet("qx.client","mshtml")){if(object.item){for(var i=offset||0,l=object.length;i<l;i++){ret.push(object[i]);
}return ret;
}}if(Object.prototype.toString.call(object)==="[object Array]"&&offset==null){ret.push.apply(ret,object);
}else{ret.push.apply(ret,Array.prototype.slice.call(object,offset||0));
}return ret;
},fromArguments:function(args,offset){return Array.prototype.slice.call(args,offset||0);
},fromCollection:function(coll){if(qx.core.Variant.isSet("qx.client","mshtml")){if(coll.item){var arr=[];

for(var i=0,l=coll.length;i<l;i++){arr[i]=coll[i];
}return arr;
}}return Array.prototype.slice.call(coll,0);
},fromShortHand:function(input){var len=input.length;
var result=qx.lang.Array.clone(input);
switch(len){case 1:result[1]=result[2]=result[3]=result[0];
break;
case 2:result[2]=result[0];
case 3:result[3]=result[1];
}return result;
},copy:function(arr){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Use 'clone()' instead!");
return qx.lang.Array.clone(arr);
},clone:function(arr){return arr.concat();
},getLast:function(arr){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Use the native Array access instead: arr[arr.length - 1]");
return arr[arr.length-1];
},getFirst:function(arr){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Use the native Array access instead: arr[0]");
return arr[0];
},insertAt:function(arr,obj,i){arr.splice(i,0,obj);
return arr;
},insertBefore:function(arr,obj,obj2){var i=arr.indexOf(obj2);

if(i==-1){arr.push(obj);
}else{arr.splice(i,0,obj);
}return arr;
},insertAfter:function(arr,obj,obj2){var i=arr.indexOf(obj2);

if(i==-1||i==(arr.length-1)){arr.push(obj);
}else{arr.splice(i+1,0,obj);
}return arr;
},removeAt:function(arr,i){return arr.splice(i,1)[0];
},removeAll:function(arr){arr.length=0;
return this;
},append:function(arr1,arr2){{qx.core.Assert.assertArray(arr1,"The first parameter must be an array.");
qx.core.Assert.assertArray(arr2,"The second parameter must be an array.");
};
Array.prototype.push.apply(arr1,arr2);
return arr1;
},exclude:function(arr1,arr2){{qx.core.Assert.assertArray(arr1,"The first parameter must be an array.");
qx.core.Assert.assertArray(arr2,"The second parameter must be an array.");
};

for(var i=0,il=arr2.length,index;i<il;i++){index=arr1.indexOf(arr2[i]);

if(index!=-1){arr1.splice(index,1);
}}return arr1;
},remove:function(arr,obj){var i=arr.indexOf(obj);

if(i!=-1){arr.splice(i,1);
return obj;
}},contains:function(arr,obj){return arr.indexOf(obj)!==-1;
},equals:function(arr1,arr2){var length=arr1.length;

if(length!==arr2.length){return false;
}
for(var i=0;i<length;i++){if(arr1[i]!==arr2[i]){return false;
}}return true;
},sum:function(arr){var result=0;

for(var i=0,l=arr.length;i<l;i++){result+=arr[i];
}return result;
},max:function(arr){{qx.core.Assert.assertArray(arr,"Parameter must be an array.");
};
var i,len=arr.length,result=arr[0];

for(i=1;i<len;i++){if(arr[i]>result){result=arr[i];
}}return result===undefined?null:result;
},min:function(arr){{qx.core.Assert.assertArray(arr,"Parameter must be an array.");
};
var i,len=arr.length,result=arr[0];

for(i=1;i<len;i++){if(arr[i]<result){result=arr[i];
}}return result===undefined?null:result;
},unique:function(arr){var ret=[],doneStrings={},doneNumbers={},doneObjects={};
var value,count=0;
var key="qx"+qx.lang.Date.now();
var hasNull=false,hasFalse=false,hasTrue=false;
for(var i=0,len=arr.length;i<len;i++){value=arr[i];
if(value===null){if(!hasNull){hasNull=true;
ret.push(value);
}}else if(value===false){if(!hasFalse){hasFalse=true;
ret.push(value);
}}else if(value===true){if(!hasTrue){hasTrue=true;
ret.push(value);
}}else if(typeof value==="string"){if(!doneStrings[value]){doneStrings[value]=1;
ret.push(value);
}}else if(typeof value==="number"){if(!doneNumbers[value]){doneNumbers[value]=1;
ret.push(value);
}}else{hash=value[key];

if(hash==null){hash=value[key]=count++;
}
if(!doneObjects[hash]){doneObjects[hash]=value;
ret.push(value);
}}}for(var hash in doneObjects){try{delete doneObjects[hash][key];
}catch(ex){try{doneObjects[hash][key]=null;
}catch(ex){throw new Error("Cannot clean-up map entry doneObjects["+hash+"]["+key+"]");
}}}return ret;
}}});
qx.Bootstrap.define("qx.lang.Function",{statics:{isFunction:function(obj){return Object.prototype.toString.call(obj)==="[object Function]";
},getCaller:function(args){return args.caller?args.caller.callee:args.callee.caller;
},getName:function(fcn){if(fcn.$$original){return fcn.classname+":constructor wrapper";
}
if(fcn.wrapper){return fcn.wrapper.classname+":constructor";
}
if(fcn.classname){return fcn.classname+":constructor";
}
if(fcn.$$mixin){for(var key in fcn.$$mixin.$$members){if(fcn.$$mixin.$$members[key]==fcn){return fcn.$$mixin.name+":"+key;
}}for(var key in fcn.$$mixin){if(fcn.$$mixin[key]==fcn){return fcn.$$mixin.name+":"+key;
}}}
if(fcn.self){var clazz=fcn.self.constructor;

if(clazz){for(var key in clazz.prototype){if(clazz.prototype[key]==fcn){return clazz.classname+":"+key;
}}for(var key in clazz){if(clazz[key]==fcn){return clazz.classname+":"+key;
}}}}var fcnReResult=fcn.toString().match(/(function\s*\w*\(.*?\))/);

if(fcnReResult&&fcnReResult.length>=1&&fcnReResult[1]){return fcnReResult[1];
}var fcnReResult=fcn.toString().match(/(function\s*\(.*?\))/);

if(fcnReResult&&fcnReResult.length>=1&&fcnReResult[1]){return "anonymous: "+fcnReResult[1];
}return 'anonymous';
},globalEval:function(data){if(window.execScript){return window.execScript(data);
}else{return eval.call(window,data);
}},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(func,options){{qx.core.Assert.assertFunction(func,"Invalid parameter 'func'.");
};
if(!options){return func;
}if(!(options.self||options.args||options.delay!=null||options.periodical!=null||options.attempt)){return func;
}return function(event){var args=qx.lang.Array.fromArguments(arguments);
if(options.args){args=options.args.concat(args);
}
if(options.delay||options.periodical){var returns=function(){return func.apply(options.self||this,args);
};

if(options.delay){return setTimeout(returns,options.delay);
}
if(options.periodical){return setInterval(returns,options.periodical);
}}else if(options.attempt){var ret=false;

try{ret=func.apply(options.self||this,args);
}catch(ex){}return ret;
}else{return func.apply(options.self||this,args);
}};
},bind:function(func,self,varargs){return this.create(func,{self:self,args:varargs!==undefined?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(func,varargs){return this.create(func,{args:varargs!==undefined?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(func,self,varargs){if(varargs===undefined){return function(event){return func.call(self||this,event||window.event);
};
}else{var optargs=qx.lang.Array.fromArguments(arguments,2);
return function(event){var args=[event||window.event];
args.push.apply(args,optargs);
func.apply(self||this,args);
};
}},attempt:function(func,self,varargs){return this.create(func,{self:self,attempt:true,args:varargs!==undefined?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(func,delay,self,varargs){return this.create(func,{delay:delay,self:self,args:varargs!==undefined?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(func,interval,self,varargs){return this.create(func,{periodical:interval,self:self,args:varargs!==undefined?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
qx.Bootstrap.define("qx.event.Registration",{statics:{__managers:{},getManager:function(target){if(target==null){{qx.log.Logger.error("qx.event.Registration.getManager(null) was called!");
qx.log.Logger.trace(this);
};
target=window;
}else if(target.nodeType){target=qx.dom.Node.getWindow(target);
}else if(!qx.dom.Node.isWindow(target)){target=window;
}var hash=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var manager=this.__managers[hash];

if(!manager){manager=new qx.event.Manager(target);
this.__managers[hash]=manager;
}return manager;
},removeManager:function(mgr){var id=qx.core.ObjectRegistry.toHashCode(mgr.getWindow());
delete this.__managers[id];
},addListener:function(target,type,listener,self,capture){return this.getManager(target).addListener(target,type,listener,self,capture);
},removeListener:function(target,type,listener,self,capture){return this.getManager(target).removeListener(target,type,listener,self,capture);
},removeListenerById:function(target,id){return this.getManager(target).removeListenerById(target,id);
},removeAllListeners:function(target){return this.getManager(target).removeAllListeners(target);
},hasListener:function(target,type,capture){return this.getManager(target).hasListener(target,type,capture);
},serializeListeners:function(target){return this.getManager(target).serializeListeners(target);
},createEvent:function(type,clazz,args){{if(arguments.length>1&&clazz===undefined){throw new Error("Create event of type "+type+" with undefined class. Please use null to explicit fallback to default event type!");
}};
if(clazz==null){clazz=qx.event.type.Event;
}var obj=qx.event.Pool.getInstance().getObject(clazz);

if(!obj){return;
}args?obj.init.apply(obj,args):obj.init();
if(type){obj.setType(type);
}return obj;
},dispatchEvent:function(target,event){return this.getManager(target).dispatchEvent(target,event);
},fireEvent:function(target,type,clazz,args){{if(arguments.length>2&&clazz===undefined&&args!==undefined){throw new Error("Create event of type "+type+" with undefined class. Please use null to explicit fallback to default event type!");
}var msg="Could not fire event '"+type+"' on target '"+target+"': ";
qx.core.Assert.assertNotUndefined(target,msg+"Invalid event target.");
qx.core.Assert.assertNotNull(target,msg+"Invalid event target.");
};
var evt=this.createEvent(type,clazz||null,args);
return this.getManager(target).dispatchEvent(target,evt);
},fireNonBubblingEvent:function(target,type,clazz,args){{if(arguments.length>2&&clazz===undefined&&args!==undefined){throw new Error("Create event of type "+type+" with undefined class. Please use null to explicit fallback to default event type!");
}};
var mgr=this.getManager(target);

if(!mgr.hasListener(target,type,false)){return true;
}var evt=this.createEvent(type,clazz||null,args);
return mgr.dispatchEvent(target,evt);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__handlers:[],addHandler:function(handler){{qx.core.Assert.assertInterface(handler,qx.event.IEventHandler,"Invalid event handler.");
};
this.__handlers.push(handler);
this.__handlers.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__handlers;
},__dispatchers:[],addDispatcher:function(dispatcher,priority){{qx.core.Assert.assertInterface(dispatcher,qx.event.IEventDispatcher,"Invalid event dispatcher!");
};
this.__dispatchers.push(dispatcher);
this.__dispatchers.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__dispatchers;
}}});
qx.Class.define("qx.core.Property",{statics:{__checks:{"Boolean":'qx.core.Assert.assertBoolean(value, msg) || true',"String":'qx.core.Assert.assertString(value, msg) || true',"Number":'qx.core.Assert.assertNumber(value, msg) || true',"Integer":'qx.core.Assert.assertInteger(value, msg) || true',"PositiveNumber":'qx.core.Assert.assertPositiveNumber(value, msg) || true',"PositiveInteger":'qx.core.Assert.assertPositiveInteger(value, msg) || true',"Error":'qx.core.Assert.assertInstance(value, Error, msg) || true',"RegExp":'qx.core.Assert.assertInstance(value, RegExp, msg) || true',"Object":'qx.core.Assert.assertObject(value, msg) || true',"Array":'qx.core.Assert.assertArray(value, msg) || true',"Map":'qx.core.Assert.assertMap(value, msg) || true',"Function":'qx.core.Assert.assertFunction(value, msg) || true',"Date":'qx.core.Assert.assertInstance(value, Date, msg) || true',"Node":'value !== null && value.nodeType !== undefined',"Element":'value !== null && value.nodeType === 1 && value.attributes',"Document":'value !== null && value.nodeType === 9 && value.documentElement',"Window":'value !== null && value.document',"Event":'value !== null && value.type !== undefined',"Class":'value !== null && value.$$type === "Class"',"Mixin":'value !== null && value.$$type === "Mixin"',"Interface":'value !== null && value.$$type === "Interface"',"Theme":'value !== null && value.$$type === "Theme"',"Color":'(typeof value === "string" || value instanceof String) && qx.util.ColorUtil.isValidPropertyValue(value)',"Decorator":'value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',"Font":'value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)'},__dispose:{"Object":true,"Array":true,"Map":true,"Function":true,"Date":true,"Node":true,"Element":true,"Document":true,"Window":true,"Event":true,"Class":true,"Mixin":true,"Interface":true,"Theme":true,"Font":true,"Decorator":true},$$inherit:"inherit",$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:"string",dispose:"boolean",inheritable:"boolean",nullable:"boolean",themeable:"boolean",refine:"boolean",init:null,apply:"string",event:"string",check:null,transform:"string",deferredInit:"boolean",validate:null},$$allowedGroupKeys:{name:"string",group:"object",mode:"string",themeable:"boolean"},$$inheritable:{},refresh:function(widget){var parent=widget.getLayoutParent();

if(parent){var clazz=widget.constructor;
var inherit=this.$$store.inherit;
var init=this.$$store.init;
var refresh=this.$$method.refresh;
var properties;
var value;
{if(qx.core.Setting.get("qx.propertyDebugLevel")>1){widget.debug("Update property inheritance");
}};

while(clazz){properties=clazz.$$properties;

if(properties){for(var name in this.$$inheritable){if(properties[name]&&widget[refresh[name]]){value=parent[inherit[name]];

if(value===undefined){value=parent[init[name]];
}{if(qx.core.Setting.get("qx.propertyDebugLevel")>2){widget.debug("Updating property: "+name+" to '"+value+"'");
}};
widget[refresh[name]](value);
}}}clazz=clazz.superclass;
}}},attach:function(clazz){var properties=clazz.$$properties;

if(properties){for(var name in properties){this.attachMethods(clazz,name,properties[name]);
}}clazz.$$propertiesAttached=true;
},attachMethods:function(clazz,name,config){config.group?this.__attachGroupMethods(clazz,config,name):this.__attachPropertyMethods(clazz,config,name);
},__attachGroupMethods:function(clazz,config,name){var upname=qx.lang.String.firstUp(name);
var members=clazz.prototype;
var themeable=config.themeable===true;
{if(qx.core.Setting.get("qx.propertyDebugLevel")>1){qx.log.Logger.debug("Generating property group: "+name);
}};
var setter=[];
var resetter=[];

if(themeable){var styler=[];
var unstyler=[];
}var argHandler="var a=arguments[0] instanceof Array?arguments[0]:arguments;";
setter.push(argHandler);

if(themeable){styler.push(argHandler);
}
if(config.mode=="shorthand"){var shorthand="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));";
setter.push(shorthand);

if(themeable){styler.push(shorthand);
}}
for(var i=0,a=config.group,l=a.length;i<l;i++){{if(!this.$$method.set[a[i]]||!this.$$method.reset[a[i]]){throw new Error("Cannot create property group '"+name+"' including non-existing property '"+a[i]+"'!");
}};
setter.push("this.",this.$$method.set[a[i]],"(a[",i,"]);");
resetter.push("this.",this.$$method.reset[a[i]],"();");

if(themeable){{if(!this.$$method.setThemed[a[i]]){throw new Error("Cannot add the non themable property '"+a[i]+"' to the themable property group '"+name+"'");
}};
styler.push("this.",this.$$method.setThemed[a[i]],"(a[",i,"]);");
unstyler.push("this.",this.$$method.resetThemed[a[i]],"();");
}}this.$$method.set[name]="set"+upname;
members[this.$$method.set[name]]=new Function(setter.join(""));
this.$$method.reset[name]="reset"+upname;
members[this.$$method.reset[name]]=new Function(resetter.join(""));

if(themeable){this.$$method.setThemed[name]="setThemed"+upname;
members[this.$$method.setThemed[name]]=new Function(styler.join(""));
this.$$method.resetThemed[name]="resetThemed"+upname;
members[this.$$method.resetThemed[name]]=new Function(unstyler.join(""));
}},__attachPropertyMethods:function(clazz,config,name){var upname=qx.lang.String.firstUp(name);
var members=clazz.prototype;
{if(qx.core.Setting.get("qx.propertyDebugLevel")>1){qx.log.Logger.debug("Generating property wrappers: "+name);
}};
if(config.dispose===undefined&&typeof config.check==="string"){config.dispose=this.__dispose[config.check]||qx.Class.isDefined(config.check)||qx.Interface.isDefined(config.check);
}var method=this.$$method;
var store=this.$$store;
store.runtime[name]="$$runtime_"+name;
store.user[name]="$$user_"+name;
store.theme[name]="$$theme_"+name;
store.init[name]="$$init_"+name;
store.inherit[name]="$$inherit_"+name;
store.useinit[name]="$$useinit_"+name;
method.get[name]="get"+upname;
members[method.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,clazz,name,"get");
};
method.set[name]="set"+upname;
members[method.set[name]]=function(value){return qx.core.Property.executeOptimizedSetter(this,clazz,name,"set",arguments);
};
method.reset[name]="reset"+upname;
members[method.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,clazz,name,"reset");
};

if(config.inheritable||config.apply||config.event||config.deferredInit){method.init[name]="init"+upname;
members[method.init[name]]=function(value){return qx.core.Property.executeOptimizedSetter(this,clazz,name,"init",arguments);
};
}
if(config.inheritable){method.refresh[name]="refresh"+upname;
members[method.refresh[name]]=function(value){return qx.core.Property.executeOptimizedSetter(this,clazz,name,"refresh",arguments);
};
}method.setRuntime[name]="setRuntime"+upname;
members[method.setRuntime[name]]=function(value){return qx.core.Property.executeOptimizedSetter(this,clazz,name,"setRuntime",arguments);
};
method.resetRuntime[name]="resetRuntime"+upname;
members[method.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,clazz,name,"resetRuntime");
};

if(config.themeable){method.setThemed[name]="setThemed"+upname;
members[method.setThemed[name]]=function(value){return qx.core.Property.executeOptimizedSetter(this,clazz,name,"setThemed",arguments);
};
method.resetThemed[name]="resetThemed"+upname;
members[method.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,clazz,name,"resetThemed");
};
}
if(config.check==="Boolean"){members["toggle"+upname]=new Function("return this."+method.set[name]+"(!this."+method.get[name]+"())");
members["is"+upname]=new Function("return this."+method.get[name]+"()");
}},__errors:{0:'Could not change or apply init value after constructing phase!',1:'Requires exactly one argument!',2:'Undefined value is not allowed!',3:'Does not allow any arguments!',4:'Null value is not allowed!',5:'Is invalid!'},error:function(obj,id,property,variant,value){var classname=obj.constructor.classname;
var msg="Error in property "+property+" of class "+classname+" in method "+this.$$method[variant][property]+" with incoming value '"+value+"': ";
throw new Error(msg+(this.__errors[id]||"Unknown reason: "+id));
},__unwrapFunctionFromCode:function(instance,members,name,variant,code,args){var store=this.$$method[variant][name];
{if(qx.core.Setting.get("qx.propertyDebugLevel")>1){qx.log.Logger.debug("Code["+this.$$method[variant][name]+"]: "+code.join(""));
}try{members[store]=new Function("value",code.join(""));
}catch(ex){alert("Malformed generated code to unwrap method: "+this.$$method[variant][name]+"\n"+code.join(""));
}};
{};
if(args===undefined){return instance[store]();
}else{return instance[store].apply(instance,args);
}},executeOptimizedGetter:function(instance,clazz,name,variant){var config=clazz.$$properties[name];
var members=clazz.prototype;
var code=[];
var store=this.$$store;
code.push('if(this.',store.runtime[name],'!==undefined)');
code.push('return this.',store.runtime[name],';');

if(config.inheritable){code.push('else if(this.',store.inherit[name],'!==undefined)');
code.push('return this.',store.inherit[name],';');
code.push('else ');
}code.push('if(this.',store.user[name],'!==undefined)');
code.push('return this.',store.user[name],';');

if(config.themeable){code.push('else if(this.',store.theme[name],'!==undefined)');
code.push('return this.',store.theme[name],';');
}
if(config.deferredInit&&config.init===undefined){code.push('else if(this.',store.init[name],'!==undefined)');
code.push('return this.',store.init[name],';');
}code.push('else ');

if(config.init!==undefined){if(config.inheritable){code.push('var init=this.',store.init[name],';');

if(config.nullable){code.push('if(init==qx.core.Property.$$inherit)init=null;');
}else if(config.init!==undefined){code.push('return this.',store.init[name],';');
}else{code.push('if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',name,' of an instance of ',clazz.classname,' is not (yet) ready!");');
}code.push('return init;');
}else{code.push('return this.',store.init[name],';');
}}else if(config.inheritable||config.nullable){code.push('return null;');
}else{code.push('throw new Error("Property ',name,' of an instance of ',clazz.classname,' is not (yet) ready!");');
}return this.__unwrapFunctionFromCode(instance,members,name,variant,code);
},executeOptimizedSetter:function(instance,clazz,name,variant,args){var config=clazz.$$properties[name];
var members=clazz.prototype;
var code=[];
var incomingValue=variant==="set"||variant==="setThemed"||variant==="setRuntime"||(variant==="init"&&config.init===undefined);
var resetValue=variant==="reset"||variant==="resetThemed"||variant==="resetRuntime";
var hasCallback=config.apply||config.event||config.inheritable;

if(variant==="setRuntime"||variant==="resetRuntime"){var store=this.$$store.runtime[name];
}else if(variant==="setThemed"||variant==="resetThemed"){var store=this.$$store.theme[name];
}else if(variant==="init"){var store=this.$$store.init[name];
}else{var store=this.$$store.user[name];
}{code.push('var prop=qx.core.Property;');

if(variant==="init"){code.push('if(this.$$initialized)prop.error(this,0,"',name,'","',variant,'",value);');
}
if(variant==="refresh"){}else if(incomingValue){code.push('if(arguments.length!==1)prop.error(this,1,"',name,'","',variant,'",value);');
code.push('if(value===undefined)prop.error(this,2,"',name,'","',variant,'",value);');
}else{code.push('if(arguments.length!==0)prop.error(this,3,"',name,'","',variant,'",value);');
}};
if(incomingValue){if(config.transform){code.push('value=this.',config.transform,'(value);');
}if(config.validate){if(typeof config.validate==="string"){code.push('this.',config.validate,'(value);');
}else if(config.validate instanceof Function){code.push(clazz.classname,'.$$properties.',name);
code.push('.validate.call(this, value);');
}}}if(hasCallback){if(incomingValue){code.push('if(this.',store,'===value)return value;');
}else if(resetValue){code.push('if(this.',store,'===undefined)return;');
}}if(config.inheritable){code.push('var inherit=prop.$$inherit;');
}{if(incomingValue){if(!config.nullable){code.push('if(value===null)prop.error(this,4,"',name,'","',variant,'",value);');
}if(config.check!==undefined){code.push('var msg = "Invalid incoming value for property \''+name+'\' of class \''+clazz.classname+'\'";');
if(config.nullable){code.push('if(value!==null)');
}if(config.inheritable){code.push('if(value!==inherit)');
}code.push('if(');

if(this.__checks[config.check]!==undefined){code.push('!(',this.__checks[config.check],')');
}else if(qx.Class.isDefined(config.check)){code.push('qx.core.Assert.assertInstance(value, qx.Class.getByName("',config.check,'"), msg)');
}else if(qx.Interface&&qx.Interface.isDefined(config.check)){code.push('qx.core.Assert.assertInterface(value, qx.Interface.getByName("',config.check,'"), msg)');
}else if(typeof config.check==="function"){code.push('!',clazz.classname,'.$$properties.',name);
code.push('.check.call(this, value)');
}else if(typeof config.check==="string"){code.push('!(',config.check,')');
}else if(config.check instanceof Array){code.push('qx.core.Assert.assertInArray(value, ',clazz.classname,'.$$properties.',name,'.check, msg)');
}else{throw new Error("Could not add check to property "+name+" of class "+clazz.classname);
}code.push(')prop.error(this,5,"',name,'","',variant,'",value);');
}}};

if(!hasCallback){if(variant==="setRuntime"){code.push('this.',this.$$store.runtime[name],'=value;');
}else if(variant==="resetRuntime"){code.push('if(this.',this.$$store.runtime[name],'!==undefined)');
code.push('delete this.',this.$$store.runtime[name],';');
}else if(variant==="set"){code.push('this.',this.$$store.user[name],'=value;');
}else if(variant==="reset"){code.push('if(this.',this.$$store.user[name],'!==undefined)');
code.push('delete this.',this.$$store.user[name],';');
}else if(variant==="setThemed"){code.push('this.',this.$$store.theme[name],'=value;');
}else if(variant==="resetThemed"){code.push('if(this.',this.$$store.theme[name],'!==undefined)');
code.push('delete this.',this.$$store.theme[name],';');
}else if(variant==="init"&&incomingValue){code.push('this.',this.$$store.init[name],'=value;');
}}else{if(config.inheritable){code.push('var computed, old=this.',this.$$store.inherit[name],';');
}else{code.push('var computed, old;');
}code.push('if(this.',this.$$store.runtime[name],'!==undefined){');

if(variant==="setRuntime"){code.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(variant==="resetRuntime"){code.push('delete this.',this.$$store.runtime[name],';');
code.push('if(this.',this.$$store.user[name],'!==undefined)');
code.push('computed=this.',this.$$store.user[name],';');
code.push('else if(this.',this.$$store.theme[name],'!==undefined)');
code.push('computed=this.',this.$$store.theme[name],';');
code.push('else if(this.',this.$$store.init[name],'!==undefined){');
code.push('computed=this.',this.$$store.init[name],';');
code.push('this.',this.$$store.useinit[name],'=true;');
code.push('}');
}else{code.push('old=computed=this.',this.$$store.runtime[name],';');
if(variant==="set"){code.push('this.',this.$$store.user[name],'=value;');
}else if(variant==="reset"){code.push('delete this.',this.$$store.user[name],';');
}else if(variant==="setThemed"){code.push('this.',this.$$store.theme[name],'=value;');
}else if(variant==="resetThemed"){code.push('delete this.',this.$$store.theme[name],';');
}else if(variant==="init"&&incomingValue){code.push('this.',this.$$store.init[name],'=value;');
}}code.push('}');
code.push('else if(this.',this.$$store.user[name],'!==undefined){');

if(variant==="set"){if(!config.inheritable){code.push('old=this.',this.$$store.user[name],';');
}code.push('computed=this.',this.$$store.user[name],'=value;');
}else if(variant==="reset"){if(!config.inheritable){code.push('old=this.',this.$$store.user[name],';');
}code.push('delete this.',this.$$store.user[name],';');
code.push('if(this.',this.$$store.runtime[name],'!==undefined)');
code.push('computed=this.',this.$$store.runtime[name],';');
code.push('if(this.',this.$$store.theme[name],'!==undefined)');
code.push('computed=this.',this.$$store.theme[name],';');
code.push('else if(this.',this.$$store.init[name],'!==undefined){');
code.push('computed=this.',this.$$store.init[name],';');
code.push('this.',this.$$store.useinit[name],'=true;');
code.push('}');
}else{if(variant==="setRuntime"){code.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(config.inheritable){code.push('computed=this.',this.$$store.user[name],';');
}else{code.push('old=computed=this.',this.$$store.user[name],';');
}if(variant==="setThemed"){code.push('this.',this.$$store.theme[name],'=value;');
}else if(variant==="resetThemed"){code.push('delete this.',this.$$store.theme[name],';');
}else if(variant==="init"&&incomingValue){code.push('this.',this.$$store.init[name],'=value;');
}}code.push('}');
if(config.themeable){code.push('else if(this.',this.$$store.theme[name],'!==undefined){');

if(!config.inheritable){code.push('old=this.',this.$$store.theme[name],';');
}
if(variant==="setRuntime"){code.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(variant==="set"){code.push('computed=this.',this.$$store.user[name],'=value;');
}else if(variant==="setThemed"){code.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(variant==="resetThemed"){code.push('delete this.',this.$$store.theme[name],';');
code.push('if(this.',this.$$store.init[name],'!==undefined){');
code.push('computed=this.',this.$$store.init[name],';');
code.push('this.',this.$$store.useinit[name],'=true;');
code.push('}');
}else if(variant==="init"){if(incomingValue){code.push('this.',this.$$store.init[name],'=value;');
}code.push('computed=this.',this.$$store.theme[name],';');
}else if(variant==="refresh"){code.push('computed=this.',this.$$store.theme[name],';');
}code.push('}');
}code.push('else if(this.',this.$$store.useinit[name],'){');

if(!config.inheritable){code.push('old=this.',this.$$store.init[name],';');
}
if(variant==="init"){if(incomingValue){code.push('computed=this.',this.$$store.init[name],'=value;');
}else{code.push('computed=this.',this.$$store.init[name],';');
}}else if(variant==="set"||variant==="setRuntime"||variant==="setThemed"||variant==="refresh"){code.push('delete this.',this.$$store.useinit[name],';');

if(variant==="setRuntime"){code.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(variant==="set"){code.push('computed=this.',this.$$store.user[name],'=value;');
}else if(variant==="setThemed"){code.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(variant==="refresh"){code.push('computed=this.',this.$$store.init[name],';');
}}code.push('}');
if(variant==="set"||variant==="setRuntime"||variant==="setThemed"||variant==="init"){code.push('else{');

if(variant==="setRuntime"){code.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(variant==="set"){code.push('computed=this.',this.$$store.user[name],'=value;');
}else if(variant==="setThemed"){code.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(variant==="init"){if(incomingValue){code.push('computed=this.',this.$$store.init[name],'=value;');
}else{code.push('computed=this.',this.$$store.init[name],';');
}code.push('this.',this.$$store.useinit[name],'=true;');
}code.push('}');
}}
if(config.inheritable){code.push('if(computed===undefined||computed===inherit){');

if(variant==="refresh"){code.push('computed=value;');
}else{code.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');
}code.push('if((computed===undefined||computed===inherit)&&');
code.push('this.',this.$$store.init[name],'!==undefined&&');
code.push('this.',this.$$store.init[name],'!==inherit){');
code.push('computed=this.',this.$$store.init[name],';');
code.push('this.',this.$$store.useinit[name],'=true;');
code.push('}else{');
code.push('delete this.',this.$$store.useinit[name],';}');
code.push('}');
code.push('if(old===computed)return value;');
code.push('if(computed===inherit){');
code.push('computed=undefined;delete this.',this.$$store.inherit[name],';');
code.push('}');
code.push('else if(computed===undefined)');
code.push('delete this.',this.$$store.inherit[name],';');
code.push('else this.',this.$$store.inherit[name],'=computed;');
code.push('var backup=computed;');
code.push('if(old===undefined)old=null;');
code.push('if(computed===undefined||computed==inherit)computed=null;');
}else if(hasCallback){if(variant!=="set"&&variant!=="setRuntime"&&variant!=="setThemed"){code.push('if(computed===undefined)computed=null;');
}code.push('if(old===computed)return value;');
code.push('if(old===undefined)old=null;');
}if(hasCallback){if(config.apply){code.push('this.',config.apply,'(computed, old, "',name,'");');
}if(config.event){code.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",config.event,"')){","reg.fireEvent(this, '",config.event,"', qx.event.type.Data, [computed, old]",")}");
}if(config.inheritable&&members._getChildren){code.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');
code.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');
code.push('}');
}}if(incomingValue){code.push('return value;');
}return this.__unwrapFunctionFromCode(instance,members,name,variant,code,args);
}},settings:{"qx.propertyDebugLevel":0}});
qx.Bootstrap.define("qx.core.ObjectRegistry",{statics:{inShutDown:false,__registry:{},__nextHash:0,__freeHashes:[],register:function(obj){var registry=this.__registry;

if(!registry){return;
}var hash=obj.$$hash;

if(hash==null){var cache=this.__freeHashes;

if(cache.length>0){hash=cache.pop();
}else{hash=(this.__nextHash++).toString(36);
}obj.$$hash=hash;
}{if(!obj.dispose){throw new Error("Invalid object: "+obj);
}};
registry[hash]=obj;
},unregister:function(obj){var hash=obj.$$hash;

if(hash==null){return;
}var registry=this.__registry;

if(registry&&registry[hash]){delete registry[hash];
this.__freeHashes.push(hash);
}try{delete obj.$$hash;
}catch(ex){if(obj.removeAttribute){obj.removeAttribute("$$hash");
}}},toHashCode:function(obj){{if(obj==null){qx.log.Logger.trace(this);
throw new Error("Invalid object: "+obj);
}};
var hash=obj.$$hash;

if(hash!=null){return hash;
}var cache=this.__freeHashes;

if(cache.length>0){hash=cache.pop();
}else{hash=(this.__nextHash++).toString(36);
}return obj.$$hash=hash;
},clearHashCode:function(obj){{if(obj==null){qx.log.Logger.trace(this);
throw new Error("Invalid object: "+obj);
}};
var hash=obj.$$hash;

if(hash!=null){this.__freeHashes.push(hash);
try{delete obj.$$hash;
}catch(ex){if(obj.removeAttribute){obj.removeAttribute("$$hash");
}}}},fromHashCode:function(hash){return this.__registry[hash]||null;
},shutdown:function(){this.inShutDown=true;
var registry=this.__registry;
var hashes=[];

for(var hash in registry){hashes.push(hash);
}hashes.sort(function(a,b){return parseInt(b,36)-parseInt(a,36);
});
var obj,i=0,l=hashes.length;

while(true){try{for(;i<l;i++){hash=hashes[i];
obj=registry[hash];

if(obj&&obj.dispose){obj.dispose();
}}}catch(ex){qx.log.Logger.error(this,"Could not dispose object "+obj.toString()+": "+ex);

if(i!==0){continue;
}}break;
}qx.log.Logger.debug(this,"Disposed "+l+" objects");
delete this.__registry;
},getRegistry:function(){return this.__registry;
}}});
qx.Class.define("qx.core.Assert",{statics:{__assert:function(condition,comment,msg){if(!condition){var errorMsg="Assertion error! "+comment+": "+msg;
qx.log.Logger.error(errorMsg);

if(qx.Class.isDefined("qx.core.AssertionError")){var err=new qx.core.AssertionError(comment,msg);
qx.log.Logger.error("Stack trace: \n"+err.getStackTrace());
throw err;
}else{throw new Error(errorMsg);
}}},assert:function(condition,msg){this.__assert(condition==true,msg||"","Called assert with 'false'");
},fail:function(msg){this.__assert(false,msg||"","Called fail().");
},assertTrue:function(value,msg){this.__assert(value===true,msg||"","Called assertTrue with 'false'");
},assertFalse:function(value,msg){this.__assert(value===false,msg||"","Called assertFalse with 'true'");
},assertEquals:function(expected,found,msg){this.__assert(expected==found,msg||"","Expected '"+expected+"' but found '"+found+"'!");
},assertNotEquals:function(expected,found,msg){this.__assert(expected!=found,msg||"","Expected '"+expected+"' to be not equal with '"+found+"'!");
},assertIdentical:function(expected,found,msg){this.__assert(expected===found,msg||"","Expected '"+expected+"' (identical) but found '"+found+"'!");
},assertNotIdentical:function(expected,found,msg){this.__assert(expected!==found,msg||"","Expected '"+expected+"' to be not identical with '"+found+"'!");
},assertNotUndefined:function(value,msg){this.__assert(value!==undefined,msg||"","Expected value not to be undefined but found "+value+"!");
},assertUndefined:function(value,msg){this.__assert(value===undefined,msg||"","Expected value to be undefined but found "+value+"!");
},assertNotNull:function(value,msg){this.__assert(value!==null,msg||"","Expected value not to be null but found "+value+"!");
},assertNull:function(value,msg){this.__assert(value===null,msg||"","Expected value to be null but found "+value+"!");
},assertJsonEquals:function(expected,found,msg){this.assertEquals(qx.util.Json.stringify(expected),qx.util.Json.stringify(found),msg);
},assertMatch:function(str,re,msg){this.assertString(str);
this.__assert(str.search(re)>=0?true:false,msg||"","The String '"+str+"' does not match the regular expression '"+re.toString()+"'!");
},assertArgumentsCount:function(args,minCount,maxCount,msg){var argCount=args.length;
this.__assert((argCount>=minCount&&argCount<=maxCount),msg||"","Wrong number of arguments given. Expected '"+minCount+"' to '"+maxCount+"' arguments but found '"+arguments.length+"' arguments.");
},assertEventFired:function(obj,event,invokeFunc,listenerFunc,msg){var called=false;
var listener=function(e){if(listenerFunc){listenerFunc.call(obj,e);
}called=true;
};
var id=obj.addListener(event,listener,obj);
invokeFunc.call();
this.__assert(called===true,msg||"","Event ("+event+") not fired.");
obj.removeListenerById(id);
},assertEventNotFired:function(obj,event,invokeFunc,msg){var called=false;
var listener=function(e){called=true;
};
var id=obj.addListener(event,listener,obj);
invokeFunc.call();
this.__assert(called===false,msg||"","Event ("+event+") was fired.");
obj.removeListenerById(id);
},assertException:function(callback,exception,re,msg){var exception=exception||Error;
var error;
qx.log.Logger.warn("This exception is expected: "+exception.classname);

try{callback();
}catch(ex){error=ex;
}
if(error==null){this.__assert(false,msg||"","The function did not raise an exception!");
}this.__assert(error instanceof exception,msg||"","The raised exception does not have the expected type! "+exception);

if(re){this.assertMatch(error.toString(),re,msg);
}},assertInArray:function(value,array,msg){this.__assert(array.indexOf(value)!==-1,msg||"","The value '"+value+"' must have any of the values defined in the array '"+array.join(", ")+"'");
},assertArrayEquals:function(expected,found,msg){this.assertArray(expected,msg);
this.assertArray(found,msg);
this.assertEquals(expected.length,found.length,msg);

for(var i=0;i<expected.length;i++){this.assertIdentical(expected[i],found[i],msg);
}},assertKeyInMap:function(value,map,msg){this.__assert(map[value]!==undefined,msg||"","The value '"+value+"' must must be a key of the map '"+qx.util.Json.stringify(map)+"'");
},assertFunction:function(value,msg){this.__assert(typeof value==="function",msg||"","Expected value to be typeof function but found "+value+"!");
},assertString:function(value,msg){this.__assert(typeof value==="string"||value instanceof String,msg||"","Expected value to be a string but found "+value+"!");
},assertBoolean:function(value,msg){this.__assert(typeof value==="boolean"||value instanceof Boolean,msg||"","Expected value to be a boolean but found "+value+"!");
},assertNumber:function(value,msg){this.__assert((typeof value==="number"||value instanceof Number)&&isFinite(value),msg||"","Expected value to be a number but found "+value+"!");
},assertPositiveNumber:function(value,msg){this.__assert((typeof value==="number"||value instanceof Number)&&isFinite(value)&&value>=0,msg||"","Expected value to be a number >= 0 but found "+value+"!");
},assertInteger:function(value,msg){this.__assert(((typeof value==="number"||value instanceof Number)&&isFinite(value)&&value%1===0),msg||"","Expected value to be an integer but found "+value+"!");
},assertPositiveInteger:function(value,msg){this.__assert(((typeof value==="number"||value instanceof Number)&&isFinite(value)&&value%1===0&&value>=0),msg||"","Expected value to be an integer >= 0 but found "+value+"!");
},assertInRange:function(value,min,max,msg){this.__assert(value>=min&&value<=max,msg||"",qx.lang.String.format("Expected value '%1' to be in the range '%2'..'%3'!",[value,min,max]));
},assertObject:function(value,msg){this.__assert(typeof value==="object"&&value!==null,msg||"","Expected value to be typeof object but found "+value+"!");
},assertArray:function(value,msg){this.__assert(value instanceof Array||value.constructor.toString().indexOf("function Array(")===0||value.$$isArray,msg||"","Expected value to be an array but found "+value+"!");
},assertMap:function(value,msg){var objConstructor=({}).constructor;
this.__assert(value&&value.constructor===objConstructor,msg||"","Expected value to be a map but found "+value+"!");
},assertType:function(value,type,msg){this.__assert(typeof (value)===type,msg||"","Expected value to be typeof '"+type+"' but found "+value+"!");
},assertInstance:function(value,clazz,msg){var className=clazz.classname||clazz+"";
this.__assert(value instanceof clazz,msg||"","Expected value to be instanceof '"+className+"' but found "+value+"!");
},assertInterface:function(value,iface,msg){this.__assert(qx.Class.implementsInterface(value,iface),msg||"","Expected object '"+value+"' to implement the interface '"+iface+"'!");
},assertCssColor:function(expected,value,msg){var ColorUtil=qx.util.ColorUtil;
var expectedRgb=ColorUtil.stringToRgb(expected);

try{var valueRgb=ColorUtil.stringToRgb(value);
}catch(ex){this.__assert(false,msg||"",qx.lang.String.format("Expected value to be the CSS color '%1' (rgb(%2)), but found value '%3', which cannot be converted to a CSS color!",[expected,expectedRgb.join(","),value]));
}this.__assert(expectedRgb[0]==valueRgb[0]&&expectedRgb[1]==valueRgb[1]&&expectedRgb[2]==valueRgb[2],msg||"",qx.lang.String.format("Expected value to be the CSS color '%1' (rgb(%2)), but found value '%3' (rgb(%4))!",[expected,expectedRgb.join(","),value,valueRgb.join(",")]));
},assertElement:function(value,msg){this.__assert(qx.dom.Node.isElement(value),msg||"",qx.lang.String.format("Expected value to be a DOM element but found  '%1'!",[value]));
},assertQxObject:function(value,msg){this.__assert(value instanceof qx.core.Object,msg||"","Expected value to be a qooxdoo object but found "+value+"!");
},assertQxWidget:function(value,msg){this.__assert(value instanceof qx.ui.core.Widget,msg||"","Expected value to be a qooxdoo widget but found "+value+"!");
}}});
qx.Class.define("qx.Mixin",{statics:{define:function(name,config){if(config){if(config.include&&!(config.include instanceof Array)){config.include=[config.include];
}{this.__validateConfig(name,config);
};
var mixin=config.statics?config.statics:{};

for(var key in mixin){if(mixin[key] instanceof Function){mixin[key].$$mixin=mixin;
}}if(config.construct){mixin.$$constructor=config.construct;
}
if(config.include){mixin.$$includes=config.include;
}
if(config.properties){mixin.$$properties=config.properties;
}
if(config.members){mixin.$$members=config.members;
}
for(var key in mixin.$$members){if(mixin.$$members[key] instanceof Function){mixin.$$members[key].$$mixin=mixin;
}}
if(config.events){mixin.$$events=config.events;
}
if(config.destruct){mixin.$$destructor=config.destruct;
}}else{var mixin={};
}mixin.$$type="Mixin";
mixin.name=name;
mixin.toString=this.genericToString;
mixin.basename=qx.Bootstrap.createNamespace(name,mixin);
this.$$registry[name]=mixin;
return mixin;
},checkCompatibility:function(mixins){var list=this.flatten(mixins);
var len=list.length;

if(len<2){return true;
}var properties={};
var members={};
var events={};
var mixin;

for(var i=0;i<len;i++){mixin=list[i];

for(var key in mixin.events){if(events[key]){throw new Error('Conflict between mixin "'+mixin.name+'" and "'+events[key]+'" in member "'+key+'"!');
}events[key]=mixin.name;
}
for(var key in mixin.properties){if(properties[key]){throw new Error('Conflict between mixin "'+mixin.name+'" and "'+properties[key]+'" in property "'+key+'"!');
}properties[key]=mixin.name;
}
for(var key in mixin.members){if(members[key]){throw new Error('Conflict between mixin "'+mixin.name+'" and "'+members[key]+'" in member "'+key+'"!');
}members[key]=mixin.name;
}}return true;
},isCompatible:function(mixin,clazz){var list=qx.Class.getMixins(clazz);
list.push(mixin);
return qx.Mixin.checkCompatibility(list);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},flatten:function(mixins){if(!mixins){return [];
}var list=mixins.concat();

for(var i=0,l=mixins.length;i<l;i++){if(mixins[i].$$includes){list.push.apply(list,this.flatten(mixins[i].$$includes));
}}return list;
},genericToString:function(){return "[Mixin "+this.name+"]";
},$$registry:{},__allowedKeys:{"include":"object","statics":"object","members":"object","properties":"object","events":"object","destruct":"function","construct":"function"},__validateConfig:function(name,config){var allowed=this.__allowedKeys;

for(var key in config){if(!allowed[key]){throw new Error('The configuration key "'+key+'" in mixin "'+name+'" is not allowed!');
}
if(config[key]==null){throw new Error('Invalid key "'+key+'" in mixin "'+name+'"! The value is undefined/null!');
}
if(allowed[key]!==null&&typeof config[key]!==allowed[key]){throw new Error('Invalid type of key "'+key+'" in mixin "'+name+'"! The type of the key must be "'+allowed[key]+'"!');
}}var maps=["statics","members","properties","events"];

for(var i=0,l=maps.length;i<l;i++){var key=maps[i];

if(config[key]!==undefined&&(config[key] instanceof Array||config[key] instanceof RegExp||config[key] instanceof Date||config[key].classname!==undefined)){throw new Error('Invalid key "'+key+'" in mixin "'+name+'"! The value needs to be a map!');
}}if(config.include){for(var i=0,a=config.include,l=a.length;i<l;i++){if(a[i]==null){throw new Error("Includes of mixins must be mixins. The include number '"+(i+1)+"' in mixin '"+name+"'is undefined/null!");
}
if(a[i].$$type!=="Mixin"){throw new Error("Includes of mixins must be mixins. The include number '"+(i+1)+"' in mixin '"+name+"'is not a mixin!");
}}this.checkCompatibility(config.include);
}}}});
qx.Mixin.define("qx.core.MAssert",{members:{assert:function(condition,msg){qx.core.Assert.assert(condition,msg);
},fail:function(msg){qx.core.Assert.fail(msg);
},assertTrue:function(value,msg){qx.core.Assert.assertTrue(value,msg);
},assertFalse:function(value,msg){qx.core.Assert.assertFalse(value,msg);
},assertEquals:function(expected,found,msg){qx.core.Assert.assertEquals(expected,found,msg);
},assertNotEquals:function(expected,found,msg){qx.core.Assert.assertNotEquals(expected,found,msg);
},assertIdentical:function(expected,found,msg){qx.core.Assert.assertIdentical(expected,found,msg);
},assertNotIdentical:function(expected,found,msg){qx.core.Assert.assertNotIdentical(expected,found,msg);
},assertNotUndefined:function(value,msg){qx.core.Assert.assertNotUndefined(value,msg);
},assertUndefined:function(value,msg){qx.core.Assert.assertUndefined(value,msg);
},assertNotNull:function(value,msg){qx.core.Assert.assertNotNull(value,msg);
},assertNull:function(value,msg){qx.core.Assert.assertNull(value,msg);
},assertJsonEquals:function(expected,found,msg){qx.core.Assert.assertJsonEquals(expected,found,msg);
},assertMatch:function(str,re,msg){qx.core.Assert.assertMatch(str,re,msg);
},assertArgumentsCount:function(args,minCount,maxCount,msg){qx.core.Assert.assertArgumentsCount(args,minCount,maxCount,msg);
},assertEventFired:function(obj,event,invokeFunc,listener,msg){qx.core.Assert.assertEventFired(obj,event,invokeFunc,listener,msg);
},assertEventNotFired:function(obj,event,invokeFunc,msg){qx.core.Assert.assertEventNotFired(obj,event,invokeFunc,msg);
},assertException:function(callback,exception,re,msg){qx.core.Assert.assertException(callback,exception,re,msg);
},assertInArray:function(value,array,msg){qx.core.Assert.assertInArray(value,array,msg);
},assertArrayEquals:function(expected,found,msg){qx.core.Assert.assertArrayEquals(expected,found,msg);
},assertKeyInMap:function(value,map,msg){qx.core.Assert.assertKeyInMap(value,map,msg);
},assertFunction:function(value,msg){qx.core.Assert.assertFunction(value,msg);
},assertString:function(value,msg){qx.core.Assert.assertString(value,msg);
},assertBoolean:function(value,msg){qx.core.Assert.assertBoolean(value,msg);
},assertNumber:function(value,msg){qx.core.Assert.assertNumber(value,msg);
},assertPositiveNumber:function(value,msg){qx.core.Assert.assertPositiveNumber(value,msg);
},assertInteger:function(value,msg){qx.core.Assert.assertInteger(value,msg);
},assertPositiveInteger:function(value,msg){qx.core.Assert.assertPositiveInteger(value,msg);
},assertInRange:function(value,min,max,msg){qx.core.Assert.assertInRange(value,min,max,msg);
},assertObject:function(value,msg){qx.core.Assert.assertObject(value,msg);
},assertArray:function(value,msg){qx.core.Assert.assertArray(value,msg);
},assertMap:function(value,msg){qx.core.Assert.assertMap(value,msg);
},assertType:function(value,type,msg){qx.core.Assert.assertType(value,type,msg);
},assertInstance:function(value,clazz,msg){qx.core.Assert.assertInstance(value,clazz,msg);
},assertInterface:function(value,iface,msg){qx.core.Assert.assertInterface(value,iface,msg);
},assertCssColor:function(expected,value,msg){qx.core.Assert.assertCssColor(expected,value,msg);
},assertElement:function(value,msg){qx.core.Assert.assertElement(value,msg);
},assertQxObject:function(value,msg){qx.core.Assert.assertQxObject(value,msg);
},assertQxWidget:function(value,msg){qx.core.Assert.assertQxWidget(value,msg);
}}});
qx.Mixin.define("qx.data.MBinding",{members:{bind:function(sourcePropertyChain,targetObject,targetProperty,options){return qx.data.SingleValueBinding.bind(this,sourcePropertyChain,targetObject,targetProperty,options);
},removeBinding:function(id){qx.data.SingleValueBinding.removeBindingFromObject(this,id);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
qx.Bootstrap.define("qx.log.Logger",{statics:{__treshold:50,__level:"debug",setLevel:function(value){this.__level=value;
},getLevel:function(){return this.__level;
},setTreshold:function(value){this.__treshold=value;
},getTreshold:function(){return this.__treshold;
},__appender:{},__id:0,register:function(appender){if(appender.$$id){return;
}var id=this.__id++;
this.__appender[id]=appender;
appender.$$id=id;
var buffer=this.__buffer;

for(var i=0,l=buffer.length;i<l;i++){appender.process(buffer[i]);
}},unregister:function(appender){var id=appender.$$id;

if(id==null){return;
}delete this.__appender[id];
delete appender.$$id;
},debug:function(object,message){this.__log("debug",arguments);
},info:function(object,message){this.__log("info",arguments);
},warn:function(object,message){this.__log("warn",arguments);
},error:function(object,message){this.__log("error",arguments);
},trace:function(object){this.__log("info",[object,qx.dev.StackTrace.getStackTrace().join("\n")]);
},deprecatedMethodWarning:function(fcn,msg){{var functionName=qx.lang.Function.getName(fcn);
var className=fcn.self?fcn.self.classname:"unknown";
this.warn("The method '"+functionName+"' of class '"+className+"' is deprecated: "+msg||"Please consult the API documentation of this method for alternatives.");
this.trace();
};
},deprecatedClassWarning:function(clazz,msg){{var className=clazz.self?clazz.self.classname:"unknown";
this.warn("The method class '"+className+"' is deprecated: "+msg||"Please consult the API documentation of this class for alternatives.");
this.trace();
};
},clear:function(){this.__buffer=[];
},__buffer:[],__levels:{debug:0,info:1,warn:2,error:3},__log:function(level,args){var levels=this.__levels;

if(levels[level]<levels[this.__level]){return;
}var object=args.length<2?null:args[0];
var start=object?1:0;
var items=[];

for(var i=start,l=args.length;i<l;i++){items.push(this.__serialize(args[i],true));
}var time=new Date;
var entry={time:time,offset:time-qx.Bootstrap.LOADSTART,level:level,items:items,win:window};
if(object){if(object instanceof qx.core.Object){entry.object=object.$$hash;
}else if(object.$$type){entry.clazz=object;
}}var buffer=this.__buffer;
buffer.push(entry);

if(buffer.length>(this.__treshold+10)){buffer.splice(this.__treshold,buffer.length);
}var appender=this.__appender;

for(var id in appender){appender[id].process(entry);
}},__detect:function(value){if(value===undefined){return "undefined";
}else if(value===null){return "null";
}
if(value.$$type){return "class";
}var type=typeof value;

if(type==="function"||type=="string"||type==="number"||type==="boolean"){return type;
}else if(type==="object"){if(value.nodeType){return "node";
}else if(value.classname){return "instance";
}else if(value instanceof Array){return "array";
}else if(value instanceof Error){return "error";
}else{return "map";
}}
if(value.toString){return "stringify";
}return "unknown";
},__serialize:function(value,deep){var type=this.__detect(value);
var text="unknown";

switch(type){case "null":case "undefined":text=type;
break;
case "string":case "number":case "boolean":text=value;
break;
case "node":if(value.nodeType===9){text="document";
}else if(value.nodeType===3){text="text["+value.nodeValue+"]";
}else if(value.nodeType===1){text=value.nodeName.toLowerCase();

if(value.id){text+="#"+value.id;
}}else{text="node";
}break;
case "function":text=qx.lang.Function.getName(value)||type;
break;
case "instance":text=value.basename+"["+value.$$hash+"]";
break;
case "class":case "stringify":case "error":text=value.toString();
break;
case "array":if(deep){text=[];

for(var i=0,l=value.length;i<l;i++){if(text.length>20){text.push("...(+"+(l-i)+")");
break;
}text.push(this.__serialize(value[i],false));
}}else{text="[...("+value.length+")]";
}break;
case "map":if(deep){var temp;
var sorted=[];

for(var key in value){sorted.push(key);
}sorted.sort();
text=[];

for(var i=0,l=sorted.length;i<l;i++){if(text.length>20){text.push("...(+"+(l-i)+")");
break;
}key=sorted[i];
temp=this.__serialize(value[key],false);
temp.key=key;
text.push(temp);
}}else{var number=0;

for(var key in value){number++;
}text="{...("+number+")}";
}break;
}return {type:type,text:text};
}}});
qx.Class.define("qx.core.Object",{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:"Object"},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+"["+this.$$hash+"]";
},base:function(args,varags){if(arguments.length===1){return args.callee.base.call(this);
}else{return args.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(args){return args.callee.self;
},clone:function(){var clazz=this.constructor;
var clone=new clazz;
var props=qx.Class.getProperties(clazz);
var user=qx.core.Property.$$store.user;
var setter=qx.core.Property.$$method.set;
var name;
for(var i=0,l=props.length;i<l;i++){name=props[i];

if(this.hasOwnProperty(user[name])){clone[setter[name]](this[user[name]]);
}}return clone;
},serialize:function(){var clazz=this.constructor;
var props=qx.Class.getProperties(clazz);
var user=qx.core.Property.$$store.user;
var name,value;
var result={classname:clazz.classname,properties:{}};
for(var i=0,l=props.length;i<l;i++){name=props[i];

if(this.hasOwnProperty(user[name])){value=this[user[name]];

if(value instanceof qx.core.Object){result.properties[name]={$$hash:value.$$hash};
}else{result.properties[name]=value;
}}}return result;
},set:function(data,value){var setter=qx.core.Property.$$method.set;

if(typeof data==="string"){{if(!this[setter[data]]){this.error("No such property: "+data);
return this;
}};
return this[setter[data]](value);
}else{for(var prop in data){{if(!this[setter[prop]]){this.error("No such property: "+prop);
continue;
}};
this[setter[prop]](data[prop]);
}return this;
}},get:function(prop){var getter=qx.core.Property.$$method.get;
{if(!this[getter[prop]]){this.error("No such property: "+prop);
return;
}};
return this[getter[prop]]();
},reset:function(prop){var resetter=qx.core.Property.$$method.reset;
{if(!this[resetter[prop]]){this.error("No such property: "+prop);
return;
}};
this[resetter[prop]]();
},__Registration:qx.event.Registration,addListener:function(type,listener,self,capture){if(!this.$$disposed){return this.__Registration.addListener(this,type,listener,self,capture);
}return null;
},addListenerOnce:function(type,listener,self,capture){var callback=function(e){listener.call(self||this,e);
this.removeListener(type,callback,this,capture);
};
return this.addListener(type,callback,this,capture);
},removeListener:function(type,listener,self,capture){if(!this.$$disposed){return this.__Registration.removeListener(this,type,listener,self,capture);
}return false;
},removeListenerById:function(id){if(!this.$$disposed){return this.__Registration.removeListenerById(this,id);
}return false;
},hasListener:function(type,capture){return this.__Registration.hasListener(this,type,capture);
},dispatchEvent:function(evt){if(!this.$$disposed){return this.__Registration.dispatchEvent(this,evt);
}return true;
},fireEvent:function(type,clazz,args){if(!this.$$disposed){return this.__Registration.fireEvent(this,type,clazz,args);
}return true;
},fireNonBubblingEvent:function(type,clazz,args){if(!this.$$disposed){return this.__Registration.fireNonBubblingEvent(this,type,clazz,args);
}return true;
},fireDataEvent:function(type,data,oldData,cancelable){if(!this.$$disposed){return this.__Registration.fireNonBubblingEvent(this,type,qx.event.type.Data,[data,oldData||null,!!cancelable]);
}return true;
},__userData:null,setUserData:function(key,value){if(!this.__userData){this.__userData={};
}this.__userData[key]=value;
},getUserData:function(key){if(!this.__userData){return null;
}var data=this.__userData[key];
return data===undefined?null:data;
},__Logger:qx.log.Logger,debug:function(msg){this.__Logger.debug(this,msg);
},info:function(msg){this.__Logger.info(this,msg);
},warn:function(msg){this.__Logger.warn(this,msg);
},error:function(msg){this.__Logger.error(this,msg);
},trace:function(){this.__Logger.trace(this);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){if(this.$$disposed){return;
}this.$$disposed=true;
{if(qx.core.Setting.get("qx.disposerDebugLevel")>1){qx.log.Logger.debug(this,"Disposing "+this.classname+"["+this.toHashCode()+"]");
}};
var clazz=this.constructor;
var mixins;

while(clazz.superclass){if(clazz.$$destructor){clazz.$$destructor.call(this);
}if(clazz.$$includes){mixins=clazz.$$flatIncludes;

for(var i=0,l=mixins.length;i<l;i++){if(mixins[i].$$destructor){mixins[i].$$destructor.call(this);
}}}clazz=clazz.superclass;
}{if(qx.core.Setting.get("qx.disposerDebugLevel")>0){var key,value;

for(key in this){value=this[key];
if(value!==null&&typeof value==="object"&&!(value instanceof String)){if(this.constructor.prototype[key]!=null){continue;
}qx.log.Logger.warn(this,"Missing destruct definition for '"+key+"' in "+this.classname+"["+this.toHashCode()+"]: "+value);
delete this[key];
}}}};
},_disposeFields:function(varargs){qx.util.DisposeUtil.disposeFields(this,arguments);
},_disposeObjects:function(varargs){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeArray:function(field){qx.util.DisposeUtil.disposeArray(this,field);
},_disposeMap:function(field){qx.util.DisposeUtil.disposeMap(this,field);
}},settings:{"qx.disposerDebugLevel":0},defer:function(statics){{qx.Class.include(statics,qx.core.MAssert);
};
},destruct:function(){qx.event.Registration.removeAllListeners(this);
qx.core.ObjectRegistry.unregister(this);
this._disposeFields("__userData");
var clazz=this.constructor;
var properties;
var store=qx.core.Property.$$store;
var storeUser=store.user;
var storeTheme=store.theme;
var storeInherit=store.inherit;
var storeUseinit=store.useinit;
var storeInit=store.init;

while(clazz){properties=clazz.$$properties;

if(properties){for(var name in properties){if(properties[name].dispose){this[storeUser[name]]=this[storeTheme[name]]=this[storeInherit[name]]=this[storeUseinit[name]]=this[storeInit[name]]=undefined;
}}}clazz=clazz.superclass;
}}});
qx.Bootstrap.define("qx.lang.String",{statics:{camelCase:function(str){return str.replace(/\-([a-z])/g,function(match,chr){return chr.toUpperCase();
});
},hyphenate:function(str){return str.replace(/[A-Z]/g,function(match){return ('-'+match.charAt(0).toLowerCase());
});
},capitalize:function(str){return str.replace(/\b[a-z]/g,function(match){return match.toUpperCase();
});
},clean:function(str){return str.replace(/\s+/g,' ').trim();
},trimLeft:function(str){return str.replace(/^\s+/,"");
},trimRight:function(str){return str.replace(/\s+$/,"");
},trim:function(str){return str.replace(/^\s+|\s+$/g,"");
},startsWith:function(fullstr,substr){return fullstr.substring(0,substr.length)===substr;
},endsWith:function(fullstr,substr){return fullstr.substring(fullstr.length-substr.length,fullstr.length)===substr;
},pad:function(str,length,ch){if(typeof ch==="undefined"){ch="0";
}var temp="";

for(var i=str.length;i<length;i++){temp+=ch;
}return temp+str;
},firstUp:function(str){return str.charAt(0).toUpperCase()+str.substr(1);
},firstLow:function(str){return str.charAt(0).toLowerCase()+str.substr(1);
},contains:function(str,substring){return str.indexOf(substring)!=-1;
},format:function(pattern,args){var str=pattern;

for(var i=0;i<args.length;i++){str=str.replace(new RegExp("%"+(i+1),"g"),args[i]);
}return str;
},escapeRegexpChars:function(str){return str.replace(/([.*+?^${}()|[\]\/\\])/g,'\\$1');
},toArray:function(str){return str.split(/\B|\b/g);
},stripTags:function(str){return str.replace(/<\/?[^>]+>/gi,"");
},stripScripts:function(str,exec){var scripts="";
var text=str.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){scripts+=arguments[1]+'\n';
return "";
});

if(exec===true){qx.lang.Function.globalEval(scripts);
}return text;
}}});
qx.Class.define("qx.Interface",{statics:{define:function(name,config){if(config){if(config.extend&&!(config.extend instanceof Array)){config.extend=[config.extend];
}{this.__validateConfig(name,config);
};
var iface=config.statics?config.statics:{};
if(config.extend){iface.$$extends=config.extend;
}
if(config.properties){iface.$$properties=config.properties;
}
if(config.members){iface.$$members=config.members;
}
if(config.events){iface.$$events=config.events;
}}else{var iface={};
}iface.$$type="Interface";
iface.name=name;
iface.toString=this.genericToString;
iface.basename=qx.Bootstrap.createNamespace(name,iface);
qx.Interface.$$registry[name]=iface;
return iface;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},flatten:function(ifaces){if(!ifaces){return [];
}var list=ifaces.concat();

for(var i=0,l=ifaces.length;i<l;i++){if(ifaces[i].$$extends){list.push.apply(list,this.flatten(ifaces[i].$$extends));
}}return list;
},__assertMembers:function(object,clazz,iface,wrap){var members=iface.$$members;

if(members){for(var key in members){if(typeof members[key]==="function"){if(typeof object[key]==="function"){if(wrap===true&&!qx.Class.hasInterface(clazz,iface)){object[key]=this.__wrapInterfaceMember(iface,object[key],key,members[key]);
}}else{var match=key.match(/^(get|set|reset)(.*)$/);

if(!match||!qx.Class.hasProperty(clazz,qx.lang.String.firstLow(match[2]))){throw new Error('Implementation of method "'+key+'" is missing in class "'+clazz.classname+'" required by interface "'+iface.name+'"');
}}}else{if(typeof object[key]===undefined){if(typeof object[key]!=="function"){throw new Error('Implementation of member "'+key+'" is missing in class "'+clazz.classname+'" required by interface "'+iface.name+'"');
}}}}}},__assertProperties:function(clazz,iface){if(iface.$$properties){for(var key in iface.$$properties){if(!qx.Class.hasProperty(clazz,key)){throw new Error('The property "'+key+'" is not supported by Class "'+clazz.classname+'"!');
}}}},__assertEvents:function(clazz,iface){if(iface.$$events){for(var key in iface.$$events){if(!qx.Class.supportsEvent(clazz,key)){throw new Error('The event "'+key+'" is not supported by Class "'+clazz.classname+'"!');
}}}},assertObject:function(object,iface){var clazz=object.constructor;
this.__assertMembers(object,clazz,iface,false);
this.__assertProperties(clazz,iface);
this.__assertEvents(clazz,iface);
var extend=iface.$$extends;

if(extend){for(var i=0,l=extend.length;i<l;i++){this.assertObject(object,extend[i]);
}}},assert:function(clazz,iface,wrap){this.__assertMembers(clazz.prototype,clazz,iface,wrap);
this.__assertProperties(clazz,iface);
this.__assertEvents(clazz,iface);
var extend=iface.$$extends;

if(extend){for(var i=0,l=extend.length;i<l;i++){this.assert(clazz,extend[i],wrap);
}}},genericToString:function(){return "[Interface "+this.name+"]";
},$$registry:{},__wrapInterfaceMember:function(iface,origFunction,functionName,preCondition){function wrappedFunction(){preCondition.apply(this,arguments);
return origFunction.apply(this,arguments);
}origFunction.wrapper=wrappedFunction;
return wrappedFunction;
},__allowedKeys:{"extend":"object","statics":"object","members":"object","properties":"object","events":"object"},__validateConfig:function(name,config){{var allowed=this.__allowedKeys;

for(var key in config){if(allowed[key]===undefined){throw new Error('The configuration key "'+key+'" in class "'+name+'" is not allowed!');
}
if(config[key]==null){throw new Error("Invalid key '"+key+"' in interface '"+name+"'! The value is undefined/null!");
}
if(allowed[key]!==null&&typeof config[key]!==allowed[key]){throw new Error('Invalid type of key "'+key+'" in interface "'+name+'"! The type of the key must be "'+allowed[key]+'"!');
}}var maps=["statics","members","properties","events"];

for(var i=0,l=maps.length;i<l;i++){var key=maps[i];

if(config[key]!==undefined&&(config[key] instanceof Array||config[key] instanceof RegExp||config[key] instanceof Date||config[key].classname!==undefined)){throw new Error('Invalid key "'+key+'" in interface "'+name+'"! The value needs to be a map!');
}}if(config.extend){for(var i=0,a=config.extend,l=a.length;i<l;i++){if(a[i]==null){throw new Error("Extends of interfaces must be interfaces. The extend number '"+i+1+"' in interface '"+name+"' is undefined/null!");
}
if(a[i].$$type!=="Interface"){throw new Error("Extends of interfaces must be interfaces. The extend number '"+i+1+"' in interface '"+name+"' is not an interface!");
}}}if(config.statics){for(var key in config.statics){if(key.toUpperCase()!==key){throw new Error('Invalid key "'+key+'" in interface "'+name+'"! Static constants must be all uppercase.');
}
switch(typeof config.statics[key]){case "boolean":case "string":case "number":break;
default:throw new Error('Invalid key "'+key+'" in interface "'+name+'"! Static constants must be all of a primitive type.');
}}}};
}}});
qx.Interface.define("qx.event.IEventDispatcher",{members:{canDispatchEvent:function(target,event,type){this.assertInstance(event,qx.event.type.Event);
this.assertString(type);
},dispatchEvent:function(target,event,type){this.assertInstance(event,qx.event.type.Event);
this.assertString(type);
}}});
qx.Class.define("qx.event.dispatch.Direct",{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(manager){this._manager=manager;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(target,event,type){return !event.getBubbles();
},dispatchEvent:function(target,event,type){event.setEventPhase(qx.event.type.Event.AT_TARGET);
var listeners=this._manager.getListeners(target,type,false);

if(listeners){for(var i=0,l=listeners.length;i<l;i++){var context=listeners[i].context||target;
listeners[i].handler.call(context,event);
}}}},defer:function(statics){qx.event.Registration.addDispatcher(statics);
}});
qx.Class.define("qx.event.dispatch.AbstractBubbling",{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:"abstract",construct:function(manager){this._manager=manager;
},members:{_getParent:function(target){throw new Error("Missing implementation");
},canDispatchEvent:function(target,event,type){return event.getBubbles();
},dispatchEvent:function(target,event,type){var parent=target;
var manager=this._manager;
var captureListeners,bubbleListeners;
var localList;
var listener,context;
var currentTarget;
var targetList=[];
captureListeners=manager.getListeners(target,type,true);
bubbleListeners=manager.getListeners(target,type,false);

if(captureListeners){targetList.push(captureListeners);
}
if(bubbleListeners){targetList.push(bubbleListeners);
}var parent=this._getParent(target);
var bubbleList=[];
var bubbleTargets=[];
var captureList=[];
var captureTargets=[];
while(parent!=null){captureListeners=manager.getListeners(parent,type,true);

if(captureListeners){captureList.push(captureListeners);
captureTargets.push(parent);
}bubbleListeners=manager.getListeners(parent,type,false);

if(bubbleListeners){bubbleList.push(bubbleListeners);
bubbleTargets.push(parent);
}parent=this._getParent(parent);
}event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);

for(var i=captureList.length-1;i>=0;i--){currentTarget=captureTargets[i];
event.setCurrentTarget(currentTarget);
localList=captureList[i];

for(var j=0,jl=localList.length;j<jl;j++){listener=localList[j];
context=listener.context||currentTarget;
listener.handler.call(context,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.AT_TARGET);
event.setCurrentTarget(target);

for(var i=0,il=targetList.length;i<il;i++){localList=targetList[i];

for(var j=0,jl=localList.length;j<jl;j++){listener=localList[j];
context=listener.context||target;
listener.handler.call(context,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);

for(var i=0,il=bubbleList.length;i<il;i++){currentTarget=bubbleTargets[i];
event.setCurrentTarget(currentTarget);
localList=bubbleList[i];

for(var j=0,jl=localList.length;j<jl;j++){listener=localList[j];
context=listener.context||currentTarget;
listener.handler.call(context,event);
}
if(event.getPropagationStopped()){return;
}}}}});
qx.Class.define("qx.event.dispatch.DomBubbling",{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(target){return target.parentNode;
},canDispatchEvent:function(target,event,type){return target.nodeType!==undefined&&event.getBubbles();
}},defer:function(statics){qx.event.Registration.addDispatcher(statics);
}});
qx.Interface.define("qx.event.IEventHandler",{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:3},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){}}});
qx.Class.define("qx.event.handler.UserAction",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){this.base(arguments);
this.__manager=manager;
this.__window=manager.getWindow();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){}},destruct:function(){this._disposeFields("__manager","__window");
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Class.define("qx.event.handler.Keyboard",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){this.base(arguments);
this.__manager=manager;
this.__window=manager.getWindow();
if(qx.core.Variant.isSet("qx.client","gecko")){this.__root=this.__window;
}else{this.__root=this.__window.document.documentElement;
}this.__lastUpDownType={};
this._initKeyObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(keyIdentifier){if(this._identifierToKeyCodeMap[keyIdentifier]){return true;
}
if(keyIdentifier.length!=1){return false;
}
if(keyIdentifier>="0"&&keyIdentifier<="9"){return true;
}
if(keyIdentifier>="A"&&keyIdentifier<="Z"){return true;
}
switch(keyIdentifier){case "+":case "-":case "*":case "/":return true;
default:return false;
}}},members:{__onKeyUpDownWrapper:null,__manager:null,__window:null,__root:null,__lastUpDownType:null,canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){},_fireInputEvent:function(domEvent,charCode){var focusHandler=this.__manager.getHandler(qx.event.handler.Focus);
var target=focusHandler.getActive();
if(!target||target.offsetWidth==0){target=focusHandler.getFocus();
}if(target&&target.offsetWidth!=0){var event=qx.event.Registration.createEvent("keyinput",qx.event.type.KeyInput,[domEvent,target,charCode]);
this.__manager.dispatchEvent(target,event);
}if(this.__window){qx.event.Registration.fireEvent(this.__window,"useraction",qx.event.type.Data,["keyinput"]);
}},_fireSequenceEvent:function(domEvent,type,keyIdentifier){var focusHandler=this.__manager.getHandler(qx.event.handler.Focus);
var target=focusHandler.getActive();
if(!target||target.offsetWidth==0){target=focusHandler.getFocus();
}if(!target||target.offsetWidth==0){target=this.__manager.getWindow().document.body;
}var event=qx.event.Registration.createEvent(type,qx.event.type.KeySequence,[domEvent,target,keyIdentifier]);
this.__manager.dispatchEvent(target,event);
if(qx.core.Variant.isSet("qx.client","mshtml|webkit")){if(type=="keydown"&&event.getDefaultPrevented()){var keyCode=domEvent.keyCode;

if(!(this._isNonPrintableKeyCode(keyCode)||keyCode==8||keyCode==9)){this._fireSequenceEvent(domEvent,"keypress",keyIdentifier);
}}}if(this.__window){qx.event.Registration.fireEvent(this.__window,"useraction",qx.event.type.Data,[type]);
}},_initKeyObserver:function(){this.__onKeyUpDownWrapper=qx.lang.Function.listener(this.__onKeyUpDown,this);
this.__onKeyPressWrapper=qx.lang.Function.listener(this.__onKeyPress,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__root,"keyup",this.__onKeyUpDownWrapper);
Event.addNativeListener(this.__root,"keydown",this.__onKeyUpDownWrapper);
Event.addNativeListener(this.__root,"keypress",this.__onKeyPressWrapper);
},_stopKeyObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__root,"keyup",this.__onKeyUpDownWrapper);
Event.removeNativeListener(this.__root,"keydown",this.__onKeyUpDownWrapper);
Event.removeNativeListener(this.__root,"keypress",this.__onKeyPressWrapper);

for(var key in (this.__inputListeners||{})){var listener=this.__inputListeners[key];
Event.removeNativeListener(listener.target,"keypress",listener.callback);
}delete (this.__inputListeners);
},__onKeyUpDown:qx.core.Variant.select("qx.client",{"mshtml":function(domEvent){domEvent=window.event||domEvent;
var keyCode=domEvent.keyCode;
var charCode=0;
var type=domEvent.type;
if(!(this.__lastUpDownType[keyCode]=="keydown"&&type=="keydown")){this._idealKeyHandler(keyCode,charCode,type,domEvent);
}if(type=="keydown"){if(this._isNonPrintableKeyCode(keyCode)||keyCode==8||keyCode==9){this._idealKeyHandler(keyCode,charCode,"keypress",domEvent);
}}this.__lastUpDownType[keyCode]=type;
},"gecko":function(domEvent){var keyCode=this._keyCodeFix[domEvent.keyCode]||domEvent.keyCode;
var charCode=domEvent.charCode;
var type=domEvent.type;
if(qx.bom.client.Platform.WIN){var keyIdentifier=keyCode?this._keyCodeToIdentifier(keyCode):this._charCodeToIdentifier(charCode);

if(!(this.__lastUpDownType[keyIdentifier]=="keydown"&&type=="keydown")){this._idealKeyHandler(keyCode,charCode,type,domEvent);
}this.__lastUpDownType[keyIdentifier]=type;
}else{this._idealKeyHandler(keyCode,charCode,type,domEvent);
}this.__firefoxInputFix(domEvent.target,type,keyCode);
},"webkit":function(domEvent){var keyCode=0;
var charCode=0;
var type=domEvent.type;
if(qx.bom.client.Engine.VERSION<525.13){if(type=="keyup"||type=="keydown"){keyCode=this._charCode2KeyCode[domEvent.charCode]||domEvent.keyCode;
}else{if(this._charCode2KeyCode[domEvent.charCode]){keyCode=this._charCode2KeyCode[domEvent.charCode];
}else{charCode=domEvent.charCode;
}}this._idealKeyHandler(keyCode,charCode,type,domEvent);
}else{keyCode=domEvent.keyCode;
if(!(this.__lastUpDownType[keyCode]=="keydown"&&type=="keydown")){this._idealKeyHandler(keyCode,charCode,type,domEvent);
}if(type=="keydown"){if(this._isNonPrintableKeyCode(keyCode)||keyCode==8||keyCode==9){this._idealKeyHandler(keyCode,charCode,"keypress",domEvent);
}}this.__lastUpDownType[keyCode]=type;
}},"opera":function(domEvent){this._idealKeyHandler(domEvent.keyCode,0,domEvent.type,domEvent);
}}),__firefoxInputFix:qx.core.Variant.select("qx.client",{"gecko":function(target,type,keyCode){if(type==="keydown"&&(keyCode==33||keyCode==34||keyCode==38||keyCode==40)&&target.type=="text"&&target.tagName.toLowerCase()==="input"&&target.getAttribute("autoComplete")!=="off"){if(!this.__inputListeners){this.__inputListeners={};
}var hash=qx.core.ObjectRegistry.toHashCode(target);

if(this.__inputListeners[hash]){return;
}var self=this;
this.__inputListeners[hash]={target:target,callback:function(domEvent){qx.bom.Event.stopPropagation(domEvent);
self.__onKeyPress(domEvent);
}};
qx.bom.Event.addNativeListener(target,"keypress",this.__inputListeners[hash].callback);
}},"default":null}),__onKeyPress:qx.core.Variant.select("qx.client",{"mshtml":function(domEvent){domEvent=window.event||domEvent;

if(this._charCode2KeyCode[domEvent.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[domEvent.keyCode],0,domEvent.type,domEvent);
}else{this._idealKeyHandler(0,domEvent.keyCode,domEvent.type,domEvent);
}},"gecko":function(domEvent){var keyCode=this._keyCodeFix[domEvent.keyCode]||domEvent.keyCode;
var charCode=domEvent.charCode;
var type=domEvent.type;
this._idealKeyHandler(keyCode,charCode,type,domEvent);
},"webkit":function(domEvent){if(qx.bom.client.Engine.VERSION<525.13){var keyCode=0;
var charCode=0;
var type=domEvent.type;

if(type=="keyup"||type=="keydown"){keyCode=this._charCode2KeyCode[domEvent.charCode]||domEvent.keyCode;
}else{if(this._charCode2KeyCode[domEvent.charCode]){keyCode=this._charCode2KeyCode[domEvent.charCode];
}else{charCode=domEvent.charCode;
}}this._idealKeyHandler(keyCode,charCode,type,domEvent);
}else{if(this._charCode2KeyCode[domEvent.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[domEvent.keyCode],0,domEvent.type,domEvent);
}else{this._idealKeyHandler(0,domEvent.keyCode,domEvent.type,domEvent);
}}},"opera":function(domEvent){if(this._keyCodeToIdentifierMap[domEvent.keyCode]){this._idealKeyHandler(domEvent.keyCode,0,domEvent.type,domEvent);
}else{this._idealKeyHandler(0,domEvent.keyCode,domEvent.type,domEvent);
}}}),_idealKeyHandler:function(keyCode,charCode,eventType,domEvent){if(!keyCode&&!charCode){return;
}var keyIdentifier;
if(keyCode){keyIdentifier=this._keyCodeToIdentifier(keyCode);
this._fireSequenceEvent(domEvent,eventType,keyIdentifier);
}else{keyIdentifier=this._charCodeToIdentifier(charCode);
this._fireSequenceEvent(domEvent,"keypress",keyIdentifier);
this._fireInputEvent(domEvent,charCode);
}},_specialCharCodeMap:{8:"Backspace",9:"Tab",13:"Enter",27:"Escape",32:"Space"},_keyCodeToIdentifierMap:{16:"Shift",17:"Control",18:"Alt",20:"CapsLock",224:"Meta",37:"Left",38:"Up",39:"Right",40:"Down",33:"PageUp",34:"PageDown",35:"End",36:"Home",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",44:"PrintScreen",145:"Scroll",19:"Pause",91:"Win",93:"Apps"},_numpadToCharCode:{96:"0".charCodeAt(0),97:"1".charCodeAt(0),98:"2".charCodeAt(0),99:"3".charCodeAt(0),100:"4".charCodeAt(0),101:"5".charCodeAt(0),102:"6".charCodeAt(0),103:"7".charCodeAt(0),104:"8".charCodeAt(0),105:"9".charCodeAt(0),106:"*".charCodeAt(0),107:"+".charCodeAt(0),109:"-".charCodeAt(0),110:",".charCodeAt(0),111:"/".charCodeAt(0)},_charCodeA:"A".charCodeAt(0),_charCodeZ:"Z".charCodeAt(0),_charCode0:"0".charCodeAt(0),_charCode9:"9".charCodeAt(0),_isNonPrintableKeyCode:function(keyCode){return this._keyCodeToIdentifierMap[keyCode]?true:false;
},_isIdentifiableKeyCode:function(keyCode){if(keyCode>=this._charCodeA&&keyCode<=this._charCodeZ){return true;
}if(keyCode>=this._charCode0&&keyCode<=this._charCode9){return true;
}if(this._specialCharCodeMap[keyCode]){return true;
}if(this._numpadToCharCode[keyCode]){return true;
}if(this._isNonPrintableKeyCode(keyCode)){return true;
}return false;
},_keyCodeToIdentifier:function(keyCode){if(this._isIdentifiableKeyCode(keyCode)){var numPadKeyCode=this._numpadToCharCode[keyCode];

if(numPadKeyCode){return String.fromCharCode(numPadKeyCode);
}return (this._keyCodeToIdentifierMap[keyCode]||this._specialCharCodeMap[keyCode]||String.fromCharCode(keyCode));
}else{return "Unidentified";
}},_charCodeToIdentifier:function(charCode){return this._specialCharCodeMap[charCode]||String.fromCharCode(charCode).toUpperCase();
},_identifierToKeyCode:function(keyIdentifier){return qx.event.handler.Keyboard._identifierToKeyCodeMap[keyIdentifier]||keyIdentifier.charCodeAt(0);
}},destruct:function(){this._stopKeyObserver();
this._disposeFields("__manager","__window","__root","__lastUpDownType");
},defer:function(statics,members,properties){qx.event.Registration.addHandler(statics);
if(!statics._identifierToKeyCodeMap){statics._identifierToKeyCodeMap={};

for(var key in members._keyCodeToIdentifierMap){statics._identifierToKeyCodeMap[members._keyCodeToIdentifierMap[key]]=parseInt(key,10);
}
for(var key in members._specialCharCodeMap){statics._identifierToKeyCodeMap[members._specialCharCodeMap[key]]=parseInt(key,10);
}}
if(qx.core.Variant.isSet("qx.client","mshtml")){members._charCode2KeyCode={13:13,27:27};
}else if(qx.core.Variant.isSet("qx.client","gecko")){members._keyCodeFix={12:members._identifierToKeyCode("NumLock")};
}else if(qx.core.Variant.isSet("qx.client","webkit")){if(qx.bom.client.Engine.VERSION<525.13){members._charCode2KeyCode={63289:members._identifierToKeyCode("NumLock"),63276:members._identifierToKeyCode("PageUp"),63277:members._identifierToKeyCode("PageDown"),63275:members._identifierToKeyCode("End"),63273:members._identifierToKeyCode("Home"),63234:members._identifierToKeyCode("Left"),63232:members._identifierToKeyCode("Up"),63235:members._identifierToKeyCode("Right"),63233:members._identifierToKeyCode("Down"),63272:members._identifierToKeyCode("Delete"),63302:members._identifierToKeyCode("Insert"),63236:members._identifierToKeyCode("F1"),63237:members._identifierToKeyCode("F2"),63238:members._identifierToKeyCode("F3"),63239:members._identifierToKeyCode("F4"),63240:members._identifierToKeyCode("F5"),63241:members._identifierToKeyCode("F6"),63242:members._identifierToKeyCode("F7"),63243:members._identifierToKeyCode("F8"),63244:members._identifierToKeyCode("F9"),63245:members._identifierToKeyCode("F10"),63246:members._identifierToKeyCode("F11"),63247:members._identifierToKeyCode("F12"),63248:members._identifierToKeyCode("PrintScreen"),3:members._identifierToKeyCode("Enter"),12:members._identifierToKeyCode("NumLock"),13:members._identifierToKeyCode("Enter")};
}else{members._charCode2KeyCode={13:13,27:27};
}}}});
qx.Class.define("qx.event.handler.Mouse",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){this.base(arguments);
this.__manager=manager;
this.__window=manager.getWindow();
this.__root=this.__window.document.documentElement;
this._initButtonObserver();
this._initMoveObserver();
this._initWheelObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__onButtonEventWrapper:null,__onMoveEventWrapper:null,__onWheelEventWrapper:null,__lastEventType:null,__lastMouseDownTarget:null,__manager:null,__window:null,__root:null,canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){},__fireEvent:function(domEvent,type,target){if(!target){target=domEvent.target||domEvent.srcElement;
}if(target&&target.nodeType){qx.event.Registration.fireEvent(target,type||domEvent.type,qx.event.type.Mouse,[domEvent,target,null,true,true]);
}qx.event.Registration.fireEvent(this.__window,"useraction",qx.event.type.Data,[type||domEvent.type]);
},_initButtonObserver:function(){this.__onButtonEventWrapper=qx.lang.Function.listener(this._onButtonEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__root,"mousedown",this.__onButtonEventWrapper);
Event.addNativeListener(this.__root,"mouseup",this.__onButtonEventWrapper);
Event.addNativeListener(this.__root,"click",this.__onButtonEventWrapper);
Event.addNativeListener(this.__root,"dblclick",this.__onButtonEventWrapper);
Event.addNativeListener(this.__root,"contextmenu",this.__onButtonEventWrapper);
},_initMoveObserver:function(){this.__onMoveEventWrapper=qx.lang.Function.listener(this._onMoveEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__root,"mousemove",this.__onMoveEventWrapper);
Event.addNativeListener(this.__root,"mouseover",this.__onMoveEventWrapper);
Event.addNativeListener(this.__root,"mouseout",this.__onMoveEventWrapper);
},_initWheelObserver:function(){this.__onWheelEventWrapper=qx.lang.Function.listener(this._onWheelEvent,this);
var Event=qx.bom.Event;
var type=qx.core.Variant.isSet("qx.client","mshtml|webkit|opera")?"mousewheel":"DOMMouseScroll";
Event.addNativeListener(this.__root,type,this.__onWheelEventWrapper);
},_stopButtonObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__root,"mousedown",this.__onButtonEventWrapper);
Event.removeNativeListener(this.__root,"mouseup",this.__onButtonEventWrapper);
Event.removeNativeListener(this.__root,"click",this.__onButtonEventWrapper);
Event.removeNativeListener(this.__root,"dblclick",this.__onButtonEventWrapper);
Event.removeNativeListener(this.__root,"contextmenu",this.__onButtonEventWrapper);
},_stopMoveObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__root,"mousemove",this.__onMoveEventWrapper);
Event.removeNativeListener(this.__root,"mouseover",this.__onMoveEventWrapper);
Event.removeNativeListener(this.__root,"mouseout",this.__onMoveEventWrapper);
},_stopWheelObserver:function(){var Event=qx.bom.Event;
var type=qx.core.Variant.isSet("qx.client","mshtml|webkit|opera")?"mousewheel":"DOMMouseScroll";
Event.removeNativeListener(this.__root,type,this.__onWheelEventWrapper);
},_onMoveEvent:function(domEvent){this.__fireEvent(domEvent);
},_onButtonEvent:function(domEvent){var type=domEvent.type;
var target=domEvent.target||domEvent.srcElement;
if(qx.core.Variant.isSet("qx.client","gecko|webkit")){if(target&&target.nodeType==3){target=target.parentNode;
}}
if(this.__rightClickFixPre){this.__rightClickFixPre(domEvent,type,target);
}
if(this.__doubleClickFixPre){this.__doubleClickFixPre(domEvent,type,target);
}this.__fireEvent(domEvent,type,target);

if(this.__rightClickFixPost){this.__rightClickFixPost(domEvent,type,target);
}
if(this.__differentTargetClickFixPost){this.__differentTargetClickFixPost(domEvent,type,target);
}this.__lastEventType=type;
},_onWheelEvent:function(domEvent){this.__fireEvent(domEvent,"mousewheel");
},__rightClickFixPre:qx.core.Variant.select("qx.client",{"webkit":function(domEvent,type,target){if(type=="contextmenu"){this.__fireEvent(domEvent,"mousedown",target);
this.__fireEvent(domEvent,"mouseup",target);
}},"default":null}),__rightClickFixPost:qx.core.Variant.select("qx.client",{"opera":function(domEvent,type,target){if(type=="mouseup"&&domEvent.button==2){this.__fireEvent(domEvent,"contextmenu",target);
}},"default":null}),__doubleClickFixPre:qx.core.Variant.select("qx.client",{"mshtml":function(domEvent,type,target){if(type=="mouseup"&&this.__lastEventType=="click"){this.__fireEvent(domEvent,"mousedown",target);
}else if(type=="dblclick"){this.__fireEvent(domEvent,"click",target);
}},"default":null}),__differentTargetClickFixPost:qx.core.Variant.select("qx.client",{"mshtml":null,"default":function(domEvent,type,target){switch(type){case "mousedown":this.__lastMouseDownTarget=target;
break;
case "mouseup":if(target!==this.__lastMouseDownTarget){var commonParent=qx.dom.Hierarchy.getCommonParent(target,this.__lastMouseDownTarget);
this.__fireEvent(domEvent,"click",commonParent);
}}}})},destruct:function(){this._stopButtonObserver();
this._stopMoveObserver();
this._stopWheelObserver();
this._disposeFields("__manager","__window","__root","__lastMouseDownTarget");
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Class.define("qx.event.handler.Capture",{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){}},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Class.define("qx.event.handler.DragDrop",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){this.base(arguments);
this.__manager=manager;
this.__root=manager.getWindow().document.documentElement;
this.__manager.addListener(this.__root,"mousedown",this._onMouseDown,this);
this.__rebuildStructures();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){},addType:function(type){this.__types[type]=true;
},addAction:function(action){this.__actions[action]=true;
},supportsType:function(type){return !!this.__types[type];
},supportsAction:function(type){return !!this.__actions[type];
},getData:function(type){if(!this.__validDrop||!this.__dropTarget){throw new Error("This method must not be used outside the drop event listener!");
}
if(!this.__types[type]){throw new Error("Unsupported data type: "+type+"!");
}
if(!this.__cache[type]){this.__currentType=type;
this.__fireEvent("droprequest",this.__dragTarget,false);
}
if(!this.__cache[type]){throw new Error("Please use a dragrequest listener to the drag target to fill the manager with data!");
}return this.__cache[type]||null;
},getCurrentAction:function(){return this.__currentAction;
},addData:function(type,data){this.__cache[type]=data;
},getCurrentType:function(){return this.__currentType;
},__rebuildStructures:function(){this.__types={};
this.__actions={};
this.__keys={};
this.__cache={};
},__detectAction:function(){var actions=this.__actions;
var keys=this.__keys;
var current=null;

if(this.__validDrop){if(keys.Shift&&keys.Ctrl&&actions.alias){current="alias";
}else if(keys.Shift&&keys.Alt&&actions.copy){current="copy";
}else if(keys.Shift&&actions.move){current="move";
}else if(keys.Alt&&actions.alias){current="alias";
}else if(keys.Ctrl&&actions.copy){current="copy";
}else if(actions.move){current="move";
}else if(actions.copy){current="copy";
}else if(actions.alias){current="alias";
}}
if(current!=this.__currentAction){this.__currentAction=current;
this.__fireEvent("dragchange",this.__dragTarget,false);
}},__fireEvent:function(type,target,cancelable,original){var Registration=qx.event.Registration;
var dragEvent=Registration.createEvent(type,qx.event.type.Drag,[cancelable,original]);

if(this.__dragTarget!==this.__dropTarget){if(target==this.__dragTarget){dragEvent.setRelatedTarget(this.__dropTarget);
}else{dragEvent.setRelatedTarget(this.__dragTarget);
}}return Registration.dispatchEvent(target,dragEvent);
},__findDraggable:function(elem){while(elem&&elem.nodeType==1){if(elem.getAttribute("qxDraggable")=="on"){return elem;
}elem=elem.parentNode;
}return null;
},__findDroppable:function(elem){while(elem&&elem.nodeType==1){if(elem.getAttribute("qxDroppable")=="on"){return elem;
}elem=elem.parentNode;
}return null;
},__clearInit:function(){this.__dragTarget=null;
this.__manager.removeListener(this.__root,"mousemove",this._onMouseMove,this,true);
this.__manager.removeListener(this.__root,"mouseup",this._onMouseUp,this,true);
qx.event.Registration.removeListener(window,"blur",this._onWindowBlur,this);
this.__rebuildStructures();
},__clearSession:function(){if(this.__sessionActive){this.__manager.removeListener(this.__root,"mouseover",this._onMouseOver,this,true);
this.__manager.removeListener(this.__root,"mouseout",this._onMouseOut,this,true);
this.__manager.removeListener(this.__root,"keydown",this._onKeyDown,this,true);
this.__manager.removeListener(this.__root,"keyup",this._onKeyUp,this,true);
this.__fireEvent("dragend",this.__dragTarget,false);
this.__sessionActive=false;
}this.__validDrop=false;
this.__dropTarget=null;
this.__clearInit();
},__validDrop:false,_onWindowBlur:function(e){this.__clearSession();
},_onKeyDown:function(e){var iden=e.getKeyIdentifier();

switch(iden){case "Alt":case "Ctrl":case "Shift":if(!this.__keys[iden]){this.__keys[iden]=true;
this.__detectAction();
}}},_onKeyUp:function(e){var iden=e.getKeyIdentifier();

switch(iden){case "Alt":case "Ctrl":case "Shift":if(this.__keys[iden]){this.__keys[iden]=false;
this.__detectAction();
}}},_onMouseDown:function(e){if(this.__sessionActive){return;
}var dragable=this.__findDraggable(e.getTarget());

if(dragable){this.__startLeft=e.getDocumentLeft();
this.__startTop=e.getDocumentTop();
this.__dragTarget=dragable;
this.__manager.addListener(this.__root,"mousemove",this._onMouseMove,this,true);
this.__manager.addListener(this.__root,"mouseup",this._onMouseUp,this,true);
qx.event.Registration.addListener(window,"blur",this._onWindowBlur,this);
}},_onMouseUp:function(e){if(this.__validDrop){this.__fireEvent("drop",this.__dropTarget,false,e);
}if(this.__sessionActive){e.stopPropagation();
}this.__clearSession();
},_onMouseMove:function(e){if(this.__sessionActive){if(!this.__fireEvent("drag",this.__dragTarget,true,e)){this.__clearSession();
}}else{if(Math.abs(e.getDocumentLeft()-this.__startLeft)>3||Math.abs(e.getDocumentTop()-this.__startTop)>3){if(this.__fireEvent("dragstart",this.__dragTarget,true,e)){this.__sessionActive=true;
this.__manager.addListener(this.__root,"mouseover",this._onMouseOver,this,true);
this.__manager.addListener(this.__root,"mouseout",this._onMouseOut,this,true);
this.__manager.addListener(this.__root,"keydown",this._onKeyDown,this,true);
this.__manager.addListener(this.__root,"keyup",this._onKeyUp,this,true);
var keys=this.__keys;
keys.Ctrl=e.isCtrlPressed();
keys.Shift=e.isShiftPressed();
keys.Alt=e.isAltPressed();
this.__detectAction();
}else{this.__fireEvent("dragend",this.__dragTarget,false);
this.__clearInit();
}}}},_onMouseOver:function(e){var target=e.getTarget();
var dropable=this.__findDroppable(target);

if(dropable&&dropable!=this.__dropTarget){this.__validDrop=this.__fireEvent("dragover",dropable,true,e);
this.__dropTarget=dropable;
this.__detectAction();
}},_onMouseOut:function(e){var target=e.getTarget();
var dropable=this.__findDroppable(target);

if(dropable&&dropable==this.__dropTarget){this.__fireEvent("dragleave",this.__dropTarget,false,e);
this.__dropTarget=null;
this.__validDrop=false;
this.__detectAction();
}}},destruct:function(){this._disposeFields("__dragTarget","__dropTarget","__manager","__root","__types","__actions","__keys","__cache");
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Class.define("qx.event.handler.Element",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){this.base(arguments);
this._manager=manager;
this._registeredEvents={};
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,scroll:true,select:true,reset:true,submit:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){var elementId=qx.core.ObjectRegistry.toHashCode(target);
var eventId=elementId+"-"+type;
var listener=qx.lang.Function.listener(this._onNative,this,eventId);
qx.bom.Event.addNativeListener(target,type,listener);
this._registeredEvents[eventId]={element:target,type:type,listener:listener};
},unregisterEvent:function(target,type,capture){var events=this._registeredEvents;

if(!events){return;
}var elementId=qx.core.ObjectRegistry.toHashCode(target);
var eventId=elementId+"-"+type;
var eventData=this._registeredEvents[eventId];
qx.bom.Event.removeNativeListener(target,type,eventData.listener);
delete this._registeredEvents[eventId];
},_onNative:function(nativeEvent,eventId){var events=this._registeredEvents;

if(!events){return;
}var eventData=events[eventId];
qx.event.Registration.fireNonBubblingEvent(eventData.element,eventData.type,qx.event.type.Native,[nativeEvent]);
}},destruct:function(){var entry;
var events=this._registeredEvents;

for(var id in events){entry=events[id];
qx.bom.Event.removeNativeListener(entry.element,entry.type,entry.listener);
}this._disposeFields("_manager","_registeredEvents");
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Class.define("qx.event.handler.Appear",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){this.base(arguments);
this.__manager=manager;
this.__targets={};
qx.event.handler.Appear.__instances[this.$$hash]=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__instances:{},refresh:function(){var all=this.__instances;

for(var hash in all){all[hash].refresh();
}}},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){var hash=qx.core.ObjectRegistry.toHashCode(target);
var targets=this.__targets;

if(targets&&!targets[hash]){targets[hash]=target;
target.$$displayed=target.offsetWidth>0;
}},unregisterEvent:function(target,type,capture){var hash=qx.core.ObjectRegistry.toHashCode(target);
var targets=this.__targets;

if(!targets){return;
}
if(targets[hash]){delete targets[hash];
target.$$displayed=null;
}},refresh:function(){var targets=this.__targets;
var elem;

for(var hash in targets){elem=targets[hash];
var displayed=elem.offsetWidth>0;

if((!!elem.$$displayed)!==displayed){elem.$$displayed=displayed;
var evt=qx.event.Registration.createEvent(displayed?"appear":"disappear");
this.__manager.dispatchEvent(elem,evt);
}}}},destruct:function(){this._disposeFields("__manager","__targets");
delete qx.event.handler.Appear.__instances[this.$$hash];
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Class.define("qx.bom.Element",{statics:{__initialAttributes:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},create:function(name,attributes,win){if(!win){win=window;
}
if(!name){throw new Error("The tag name is missing!");
}var initial=this.__initialAttributes;
var attributesHtml="";

for(var key in attributes){if(initial[key]){attributesHtml+=key+"='"+attributes[key]+"' ";
}}var element;
if(attributesHtml!=""){if(qx.bom.client.Engine.MSHTML){element=win.document.createElement("<"+name+" "+attributesHtml+">");
}else{var helper=win.document.createElement("div");
helper.innerHTML="<"+name+" "+attributesHtml+"></"+name+">";
element=helper.firstChild;
}}else{if(win.document.createElementNS){element=win.document.createElementNS("http://www.w3.org/1999/xhtml",name);
}else{element=win.document.createElement(name);
}}
for(var key in attributes){if(!initial[key]){qx.bom.element.Attribute.set(element,key,attributes[key]);
}}return element;
},empty:function(element){return element.innerHTML="";
},addListener:function(element,type,listener,self,capture){return qx.event.Registration.addListener(element,type,listener,self,capture);
},removeListener:function(element,type,listener,self,capture){return qx.event.Registration.removeListener(element,type,listener,self,capture);
},removeListenerById:function(target,id){return qx.event.Registration.removeListenerById(target,id);
},hasListener:function(element,type,capture){return qx.event.Registration.hasListener(element,type,capture);
},focus:function(element){qx.event.Registration.getManager(element).getHandler(qx.event.handler.Focus).focus(element);
},blur:function(element){qx.event.Registration.getManager(element).getHandler(qx.event.handler.Focus).blur(element);
},activate:function(element){qx.event.Registration.getManager(element).getHandler(qx.event.handler.Focus).activate(element);
},deactivate:function(element){qx.event.Registration.getManager(element).getHandler(qx.event.handler.Focus).deactivate(element);
},capture:function(element){qx.event.Registration.getManager(element).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(element);
},releaseCapture:function(element){qx.event.Registration.getManager(element).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(element);
},clone:function(element,events){var clone;

if(events||(qx.core.Variant.isSet("qx.client","mshtml")&&!qx.xml.Document.isXmlDocument(element))){var mgr=qx.event.Registration.getManager(element);
var all=qx.dom.Hierarchy.getDescendants(element);
all.push(element);
}if(qx.core.Variant.isSet("qx.client","mshtml")){for(var i=0,l=all.length;i<l;i++){mgr.toggleAttachedEvents(all[i],false);
}}var clone=element.cloneNode(true);
if(qx.core.Variant.isSet("qx.client","mshtml")){for(var i=0,l=all.length;i<l;i++){mgr.toggleAttachedEvents(all[i],true);
}}if(events===true){var cloneAll=qx.dom.Hierarchy.getDescendants(clone);
cloneAll.push(clone);
var eventList,cloneElem,origElem,eventEntry;

for(var i=0,il=all.length;i<il;i++){origElem=all[i];
eventList=mgr.serializeListeners(origElem);

if(eventList.length>0){cloneElem=cloneAll[i];

for(var j=0,jl=eventList.length;j<jl;j++){eventEntry=eventList[j];
mgr.addListener(cloneElem,eventEntry.type,eventEntry.handler,eventEntry.self,eventEntry.capture);
}}}}return clone;
}}});
qx.Bootstrap.define("qx.lang.Core");
if(!Error.prototype.toString||Error.prototype.toString()=="[object Error]"){Error.prototype.toString=function(){return this.message;
};
}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(searchElement,fromIndex){if(fromIndex==null){fromIndex=0;
}else if(fromIndex<0){fromIndex=Math.max(0,this.length+fromIndex);
}
for(var i=fromIndex;i<this.length;i++){if(this[i]===searchElement){return i;
}}return -1;
};
}
if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=function(searchElement,fromIndex){if(fromIndex==null){fromIndex=this.length-1;
}else if(fromIndex<0){fromIndex=Math.max(0,this.length+fromIndex);
}
for(var i=fromIndex;i>=0;i--){if(this[i]===searchElement){return i;
}}return -1;
};
}
if(!Array.prototype.forEach){Array.prototype.forEach=function(callback,obj){var l=this.length;

for(var i=0;i<l;i++){callback.call(obj,this[i],i,this);
}};
}
if(!Array.prototype.filter){Array.prototype.filter=function(callback,obj){var l=this.length;
var res=[];

for(var i=0;i<l;i++){if(callback.call(obj,this[i],i,this)){res.push(this[i]);
}}return res;
};
}
if(!Array.prototype.map){Array.prototype.map=function(callback,obj){var l=this.length;
var res=[];

for(var i=0;i<l;i++){res.push(callback.call(obj,this[i],i,this));
}return res;
};
}
if(!Array.prototype.some){Array.prototype.some=function(callback,obj){var l=this.length;

for(var i=0;i<l;i++){if(callback.call(obj,this[i],i,this)){return true;
}}return false;
};
}
if(!Array.prototype.every){Array.prototype.every=function(callback,obj){var l=this.length;

for(var i=0;i<l;i++){if(!callback.call(obj,this[i],i,this)){return false;
}}return true;
};
}if(!String.prototype.quote){String.prototype.quote=function(){return '"'+this.replace(/\\/g,"\\\\").replace(/\"/g,"\\\"")+'"';
};
}qx.Bootstrap.define("qx.lang.Generics",{statics:{__map:{"Array":["join","reverse","sort","push","pop","shift","unshift","splice","concat","slice","indexOf","lastIndexOf","forEach","map","filter","some","every"],"String":["quote","substring","toLowerCase","toUpperCase","charAt","charCodeAt","indexOf","lastIndexOf","toLocaleLowerCase","toLocaleUpperCase","localeCompare","match","search","replace","split","substr","concat","slice"]},__wrap:function(obj,func){return function(s){return obj.prototype[func].apply(s,Array.prototype.slice.call(arguments,1));
};
},__init:function(){var map=qx.lang.Generics.__map;

for(var key in map){var obj=window[key];
var arr=map[key];

for(var i=0,l=arr.length;i<l;i++){var func=arr[i];

if(!obj[func]){obj[func]=qx.lang.Generics.__wrap(obj,func);
}}}}},defer:function(statics){statics.__init();
}});
qx.Class.define("qx.dev.StackTrace",{statics:{getStackTrace:qx.core.Variant.select("qx.client",{"gecko":function(){try{throw new Error();
}catch(ex){var errorTrace=this.getStackTraceFromError(ex);
qx.lang.Array.removeAt(errorTrace,0);
var callerTrace=this.getStackTraceFromCaller(arguments);
var trace=callerTrace.length>errorTrace.length?callerTrace:errorTrace;

for(var i=0;i<Math.min(callerTrace.length,errorTrace.length);i++){var callerCall=callerTrace[i];

if(callerCall.indexOf("anonymous")>=0){continue;
}var callerArr=callerCall.split(":");

if(callerArr.length!=2){continue;
}var callerClassName=callerArr[0];
var methodName=callerArr[1];
var errorCall=errorTrace[i];
var errorArr=errorCall.split(":");
var errorClassName=errorArr[0];
var lineNumber=errorArr[1];

if(qx.Class.getByName(errorClassName)){var className=errorClassName;
}else{className=callerClassName;
}var line=className+":";

if(methodName){line+=methodName+":";
}line+=lineNumber;
trace[i]=line;
}return trace;
}},"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},"opera":function(){var foo;

try{foo.bar();
}catch(ex){var trace=this.getStackTraceFromError(ex);
qx.lang.Array.removeAt(trace,0);
return trace;
}return [];
}}),getStackTraceFromCaller:qx.core.Variant.select("qx.client",{"opera":function(args){return [];
},"default":function(args){var trace=[];
var fcn=qx.lang.Function.getCaller(args);
var knownFunction={};

while(fcn){var fcnName=qx.lang.Function.getName(fcn);
trace.push(fcnName);

try{fcn=fcn.caller;
}catch(ex){break;
}
if(!fcn){break;
}var hash=qx.core.ObjectRegistry.toHashCode(fcn);

if(knownFunction[hash]){trace.push("...");
break;
}knownFunction[hash]=fcn;
}return trace;
}}),getStackTraceFromError:qx.core.Variant.select("qx.client",{"gecko":function(error){if(!error.stack){return [];
}var lineRe=/@(.+):(\d+)$/gm;
var hit;
var trace=[];

while((hit=lineRe.exec(error.stack))!=null){var url=hit[1];
var lineNumber=hit[2];
var className=this.__fileNameToClassName(url);
trace.push(className+":"+lineNumber);
}return trace;
},"webkit":function(error){if(error.sourceURL&&error.line){return [this.__fileNameToClassName(error.sourceURL)+":"+error.line];
}else{return [];
}},"opera":function(error){if(error.message.indexOf("Backtrace:")<0){return [];
}var trace=[];
var traceString=qx.lang.String.trim(error.message.split("Backtrace:")[1]);
var lines=traceString.split("\n");

for(var i=0;i<lines.length;i++){var reResult=lines[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(reResult&&reResult.length>=2){var lineNumber=reResult[1];
var fileName=this.__fileNameToClassName(reResult[2]);
trace.push(fileName+":"+lineNumber);
}}return trace;
},"default":function(){return [];
}}),__fileNameToClassName:function(fileName){var scriptDir="/source/class/";
var jsPos=fileName.indexOf(scriptDir);
var className=(jsPos==-1)?fileName:fileName.substring(jsPos+scriptDir.length).replace(/\//g,".").replace(/\.js$/,"");
return className;
}}});
qx.Interface.define("qx.data.IListData",{events:{"change":"qx.event.type.Data","changeLength":"qx.event.type.Event"},members:{getItem:function(index){},setItem:function(index,item){},splice:function(startIndex,amount,varargs){},contains:function(item){},getLength:function(){},toArray:function(){}}});
qx.Class.define("qx.type.BaseError",{extend:Error,construct:function(comment,failMessage){Error.call(this,failMessage);
this.__comment=comment||"";
this.__msg=failMessage||"";
},members:{__comment:null,__msg:null,getComment:function(){return this.__comment;
},message:function(){return this.__msg;
},toString:function(){return this.__comment+": "+this.__msg;
}}});
qx.Class.define("qx.core.AssertionError",{extend:qx.type.BaseError,construct:function(comment,failMessage){qx.type.BaseError.call(this,comment,failMessage);
this.__trace=qx.dev.StackTrace.getStackTrace();
},members:{__trace:null,getStackTrace:function(){return this.__trace;
}}});
qx.Class.define("qx.util.Json",{statics:{BEAUTIFYING_INDENT:"  ",BEAUTIFYING_LINE_END:"\n",__map:{"function":"__convertFunction","boolean":"__convertBoolean","number":"__convertNumber","string":"__convertString","object":"__convertObject","undefined":"__convertUndefined"},__convertFunction:function(incoming){return String(incoming);
},__convertBoolean:function(incoming){return String(incoming);
},__convertNumber:function(incoming){return isFinite(incoming)?String(incoming):"null";
},__convertString:function(incoming){var result;

if(/["\\\x00-\x1f]/.test(incoming)){result=incoming.replace(/([\x00-\x1f\\"])/g,qx.util.Json.__convertStringHelper);
}else{result=incoming;
}return '"'+result+'"';
},__convertStringEscape:{'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},__convertStringHelper:function(a,b){var result=qx.util.Json.__convertStringEscape[b];

if(result){return result;
}result=b.charCodeAt();
return '\\u00'+Math.floor(result/16).toString(16)+(result%16).toString(16);
},__convertArray:function(incoming){var stringBuilder=[],first=true,func,obj;
var beautify=qx.util.Json.__beautify;
stringBuilder.push("[");

if(beautify){qx.util.Json.__indent+=qx.util.Json.BEAUTIFYING_INDENT;
stringBuilder.push(qx.util.Json.__indent);
}
for(var i=0,l=incoming.length;i<l;i++){obj=incoming[i];
func=this.__map[typeof obj];

if(func){obj=this[func](obj);

if(typeof obj=="string"){if(!first){stringBuilder.push(",");

if(beautify){stringBuilder.push(qx.util.Json.__indent);
}}stringBuilder.push(obj);
first=false;
}}}
if(beautify){qx.util.Json.__indent=qx.util.Json.__indent.substring(0,qx.util.Json.__indent.length-qx.util.Json.BEAUTIFYING_INDENT.length);
stringBuilder.push(qx.util.Json.__indent);
}stringBuilder.push("]");
return stringBuilder.join("");
},__convertDate:function(incoming){var dateParams=incoming.getUTCFullYear()+","+incoming.getUTCMonth()+","+incoming.getUTCDate()+","+incoming.getUTCHours()+","+incoming.getUTCMinutes()+","+incoming.getUTCSeconds()+","+incoming.getUTCMilliseconds();
return "new Date(Date.UTC("+dateParams+"))";
},__convertMap:function(incoming){var stringBuilder=[],first=true,func,obj;
var beautify=qx.util.Json.__beautify;
stringBuilder.push("{");

if(beautify){qx.util.Json.__indent+=qx.util.Json.BEAUTIFYING_INDENT;
stringBuilder.push(qx.util.Json.__indent);
}
for(var key in incoming){obj=incoming[key];
func=this.__map[typeof obj];

if(func){obj=this[func](obj);

if(typeof obj=="string"){if(!first){stringBuilder.push(",");

if(beautify){stringBuilder.push(qx.util.Json.__indent);
}}stringBuilder.push(this.__convertString(key),":",obj);
first=false;
}}}
if(beautify){qx.util.Json.__indent=qx.util.Json.__indent.substring(0,qx.util.Json.__indent.length-qx.util.Json.BEAUTIFYING_INDENT.length);
stringBuilder.push(qx.util.Json.__indent);
}stringBuilder.push("}");
return stringBuilder.join("");
},__convertObject:function(incoming){if(incoming){var constructorName=incoming.constructor.name;

if(incoming instanceof Array||constructorName=="Array"){return this.__convertArray(incoming);
}else if(incoming instanceof Date||constructorName=="Date"){return this.__convertDate(incoming);
}else if(incoming instanceof Object||constructorName=="Object"){return this.__convertMap(incoming);
}return "";
}return "null";
},__convertUndefined:function(incoming){if(qx.core.Setting.get("qx.jsonEncodeUndefined")){return "null";
}},stringify:function(obj,beautify){this.__beautify=beautify;
this.__indent=this.BEAUTIFYING_LINE_END;
var result=this[this.__map[typeof obj]](obj);

if(typeof result!="string"){result=null;
}if(qx.core.Setting.get("qx.jsonDebugging")){qx.log.Logger.debug(this,"JSON request: "+result);
}return result;
},parse:function(text){if(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(text.replace(/"(\\.|[^"\\])*"/g,""))){throw new Error("Could not parse JSON string!");
}
try{return eval("("+text+")");
}catch(ex){throw new Error("Could not evaluate JSON string: "+ex.message);
}},parseQx:function(text){if(qx.core.Setting.get("qx.jsonDebugging")){qx.log.Logger.debug(this,"JSON response: "+text);
}var obj=(text&&text.length>0)?eval('('+text+')'):null;
return obj;
}},settings:{"qx.jsonEncodeUndefined":true,"qx.jsonDebugging":false}});
qx.Class.define("qx.util.ColorUtil",{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42],grey:[128,128,128]},isNamedColor:function(value){return this.NAMED[value]!==undefined;
},isSystemColor:function(value){return this.SYSTEM[value]!==undefined;
},supportsThemes:function(){return qx.Class.isDefined("qx.theme.manager.Color");
},isThemedColor:function(value){if(!this.supportsThemes()){return false;
}return qx.theme.manager.Color.getInstance().isDynamic(value);
},stringToRgb:function(str){if(this.supportsThemes()&&this.isThemedColor(str)){var str=qx.theme.manager.Color.getInstance().resolveDynamic(str);
}
if(this.isNamedColor(str)){return this.NAMED[str];
}else if(this.isSystemColor(str)){throw new Error("Could not convert system colors to RGB: "+str);
}else if(this.isRgbString(str)){return this.__rgbStringToRgb();
}else if(this.isHex3String(str)){return this.__hex3StringToRgb();
}else if(this.isHex6String(str)){return this.__hex6StringToRgb();
}throw new Error("Could not parse color: "+str);
},cssStringToRgb:function(str){if(this.isNamedColor(str)){return this.NAMED[str];
}else if(this.isSystemColor(str)){throw new Error("Could not convert system colors to RGB: "+str);
}else if(this.isRgbString(str)){return this.__rgbStringToRgb();
}else if(this.isHex3String(str)){return this.__hex3StringToRgb();
}else if(this.isHex6String(str)){return this.__hex6StringToRgb();
}throw new Error("Could not parse color: "+str);
},stringToRgbString:function(str){return this.rgbToRgbString(this.stringToRgb(str));
},rgbToRgbString:function(rgb){return "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
},rgbToHexString:function(rgb){return (qx.lang.String.pad(rgb[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(rgb[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(rgb[2].toString(16).toUpperCase(),2));
},isValidPropertyValue:function(str){return this.isThemedColor(str)||this.isNamedColor(str)||this.isHex3String(str)||this.isHex6String(str)||this.isRgbString(str);
},isCssString:function(str){return this.isSystemColor(str)||this.isNamedColor(str)||this.isHex3String(str)||this.isHex6String(str)||this.isRgbString(str);
},isHex3String:function(str){return this.REGEXP.hex3.test(str);
},isHex6String:function(str){return this.REGEXP.hex6.test(str);
},isRgbString:function(str){return this.REGEXP.rgb.test(str);
},__rgbStringToRgb:function(){var red=parseInt(RegExp.$1,10);
var green=parseInt(RegExp.$2,10);
var blue=parseInt(RegExp.$3,10);
return [red,green,blue];
},__hex3StringToRgb:function(){var red=parseInt(RegExp.$1,16)*17;
var green=parseInt(RegExp.$2,16)*17;
var blue=parseInt(RegExp.$3,16)*17;
return [red,green,blue];
},__hex6StringToRgb:function(){var red=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);
var green=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);
var blue=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);
return [red,green,blue];
},hex3StringToRgb:function(value){if(this.isHex3String(value)){return this.__hex3StringToRgb(value);
}throw new Error("Invalid hex3 value: "+value);
},hex6StringToRgb:function(value){if(this.isHex6String(value)){return this.__hex6StringToRgb(value);
}throw new Error("Invalid hex6 value: "+value);
},hexStringToRgb:function(value){if(this.isHex3String(value)){return this.__hex3StringToRgb(value);
}
if(this.isHex6String(value)){return this.__hex6StringToRgb(value);
}throw new Error("Invalid hex value: "+value);
},rgbToHsb:function(rgb){var hue,saturation,brightness;
var red=rgb[0];
var green=rgb[1];
var blue=rgb[2];
var cmax=(red>green)?red:green;

if(blue>cmax){cmax=blue;
}var cmin=(red<green)?red:green;

if(blue<cmin){cmin=blue;
}brightness=cmax/255.0;

if(cmax!=0){saturation=(cmax-cmin)/cmax;
}else{saturation=0;
}
if(saturation==0){hue=0;
}else{var redc=(cmax-red)/(cmax-cmin);
var greenc=(cmax-green)/(cmax-cmin);
var bluec=(cmax-blue)/(cmax-cmin);

if(red==cmax){hue=bluec-greenc;
}else if(green==cmax){hue=2.0+redc-bluec;
}else{hue=4.0+greenc-redc;
}hue=hue/6.0;

if(hue<0){hue=hue+1.0;
}}return [Math.round(hue*360),Math.round(saturation*100),Math.round(brightness*100)];
},hsbToRgb:function(hsb){var i,f,p,q,t;
var hue=hsb[0]/360;
var saturation=hsb[1]/100;
var brightness=hsb[2]/100;

if(hue>=1.0){hue%=1.0;
}
if(saturation>1.0){saturation=1.0;
}
if(brightness>1.0){brightness=1.0;
}var tov=Math.floor(255*brightness);
var rgb={};

if(saturation==0.0){rgb.red=rgb.green=rgb.blue=tov;
}else{hue*=6.0;
i=Math.floor(hue);
f=hue-i;
p=Math.floor(tov*(1.0-saturation));
q=Math.floor(tov*(1.0-(saturation*f)));
t=Math.floor(tov*(1.0-(saturation*(1.0-f))));

switch(i){case 0:rgb.red=tov;
rgb.green=t;
rgb.blue=p;
break;
case 1:rgb.red=q;
rgb.green=tov;
rgb.blue=p;
break;
case 2:rgb.red=p;
rgb.green=tov;
rgb.blue=t;
break;
case 3:rgb.red=p;
rgb.green=q;
rgb.blue=tov;
break;
case 4:rgb.red=t;
rgb.green=p;
rgb.blue=tov;
break;
case 5:rgb.red=tov;
rgb.green=p;
rgb.blue=q;
break;
}}return rgb;
},randomColor:function(){var r=Math.round(Math.random()*255);
var g=Math.round(Math.random()*255);
var b=Math.round(Math.random()*255);
return this.rgbToRgbString([r,g,b]);
}}});
qx.Class.define("qx.event.type.Event",{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(canBubble,cancelable){{if(canBubble!==undefined){qx.core.Assert.assertBoolean(canBubble,"Invalid argument value 'canBubble'.");
}
if(cancelable!==undefined){qx.core.Assert.assertBoolean(cancelable,"Invalid argument value 'cancelable'.");
}};
this._type=null;
this._target=null;
this._currentTarget=null;
this._relatedTarget=null;
this._originalTarget=null;
this._stopPropagation=false;
this._preventDefault=false;
this._bubbles=!!canBubble;
this._cancelable=!!cancelable;
this._timeStamp=(new Date()).getTime();
this._eventPhase=null;
return this;
},clone:function(embryo){if(embryo){var clone=embryo;
}else{var clone=qx.event.Pool.getInstance().getObject(this.constructor);
}clone._type=this._type;
clone._target=this._target;
clone._currentTarget=this._currentTarget;
clone._relatedTarget=this._relatedTarget;
clone._originalTarget=this._originalTarget;
clone._stopPropagation=this._stopPropagation;
clone._bubbles=this._bubbles;
clone._preventDefault=this._preventDefault;
clone._cancelable=this._cancelable;
return clone;
},stopPropagation:function(){{this.assertTrue(this._bubbles,"Cannot stop propagation on a non bubbling event: "+this.getType());
};
this._stopPropagation=true;
},getPropagationStopped:function(){return !!this._stopPropagation;
},preventDefault:function(){{this.assertTrue(this._cancelable,"Cannot prevent default action on a non cancelable event: "+this.getType());
};
this._preventDefault=true;
},getDefaultPrevented:function(){return !!this._preventDefault;
},getType:function(){return this._type;
},setType:function(type){this._type=type;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(eventPhase){this._eventPhase=eventPhase;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(target){this._target=target;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(currentTarget){this._currentTarget=currentTarget;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(relatedTarget){this._relatedTarget=relatedTarget;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(originalTarget){this._originalTarget=originalTarget;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(bubbles){this._bubbles=bubbles;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(cancelable){this._cancelable=cancelable;
}},destruct:function(){this._disposeFields("_target","_currentTarget","_relatedTarget","_originalTarget");
}});
qx.Class.define("qx.event.type.Data",{extend:qx.event.type.Event,members:{init:function(data,old,cancelable){this.base(arguments,false,cancelable);
this.__data=data;
this.__old=old;
return this;
},clone:function(embryo){var clone=this.base(arguments,embryo);
clone.__data=this.__data;
clone.__old=this.__old;
return clone;
},getData:function(){return this.__data;
},getOldData:function(){return this.__old;
},getValue:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Better use 'getData'");
return this.__data;
},getOldValue:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Better use 'getOldData'");
return this.__old;
}},destruct:function(){this._disposeFields("__data","__old");
}});
qx.Class.define("qx.util.ObjectPool",{extend:qx.core.Object,construct:function(size){this.base(arguments);
this.__pool={};

if(size!==undefined){this.setSize(size);
}},properties:{size:{check:"Integer",init:null,nullable:true}},members:{__pool:null,getObject:function(clazz){if(this.$$disposed){return;
}
if(!clazz){throw new Error("Class needs to be defined!");
}var obj=null;
var pool=this.__pool[clazz.classname];

if(pool){obj=pool.pop();
}
if(obj){obj.$$pooled=false;
}else{obj=new clazz;
}return obj;
},poolObject:function(obj){if(!this.__pool){return;
}var classname=obj.classname;
var pool=this.__pool[classname];

if(obj.$$pooled){throw new Error("Object is already pooled: "+obj);
}
if(!pool){this.__pool[classname]=pool=[];
}var size=this.getSize()||Infinity;

if(pool.length>size){this.warn("Cannot pool "+obj+" because the pool is already full.");
obj.dispose();
return;
}obj.$$pooled=true;
pool.push(obj);
}},destruct:function(){var pool=this.__pool;
var classname,list,i,l;

for(classname in pool){list=pool[classname];

for(i=0,l=list.length;i<l;i++){list[i].dispose();
}}delete this.__pool;
}});
qx.Class.define("qx.event.Pool",{extend:qx.util.ObjectPool,type:"singleton",construct:function(){this.base(arguments,30);
}});
qx.Class.define("qx.event.handler.Application",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){this.base(arguments);
this._window=manager.getWindow();
this.__scriptLoaded=false;
this.__domReady=false;
this.__loaded=false;
this._initObserver();
qx.event.handler.Application.$$instance=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,onScriptLoaded:function(){var inst=qx.event.handler.Application.$$instance;

if(inst){inst.__scriptLoaded=true;
inst.__fireReady();
}}},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){},__fireReady:function(){if(!this.__isReady&&this.__domReady&&this.__scriptLoaded){this.__isReady=true;
qx.event.Registration.fireEvent(this._window,"ready");
}},_initObserver:function(){if(qx.$$domReady||document.readyState=="complete"){this.__domReady=true;
this.__fireReady();
}else{this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);

if(qx.core.Variant.isSet("qx.client","gecko|opera|webkit")){qx.bom.Event.addNativeListener(this._window,"DOMContentLoaded",this._onNativeLoadWrapped);
}else if(qx.core.Variant.isSet("qx.client","mshtml")){var timer=function(){try{document.documentElement.doScroll("left");
this._onNativeLoadWrapped();
}catch(error){setTimeout(timer,100);
}};
timer();
}qx.bom.Event.addNativeListener(this._window,"load",this._onNativeLoadWrapped);
}this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);
qx.bom.Event.addNativeListener(this._window,"unload",this._onNativeUnloadWrapped);
},_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,"load",this._onNativeLoadWrapped);
}qx.bom.Event.removeNativeListener(this._window,"unload",this._onNativeUnloadWrapped);
this._onNativeLoadWrapped=null;
this._onNativeUnloadWrapped=null;
},_onNativeLoad:function(e){this.__domReady=true;
this.__fireReady();
},_onNativeUnload:function(e){if(!this.__isUnloaded){this.__isUnloaded=true;

try{qx.event.Registration.fireEvent(this._window,"shutdown");
}finally{qx.core.ObjectRegistry.shutdown();
}}}},destruct:function(){this._stopObserver();
this._disposeFields("_window");
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Class.define("qx.data.SingleValueBinding",{statics:{DEBUG_ON:false,__bindings:{},bind:function(sourceObject,sourcePropertyChain,targetObject,targetProperty,options){var propertyNames=sourcePropertyChain.split(".");
var arrayIndexValues=this.__checkForArrayInPropertyChain(propertyNames);
var sources=[];
var listeners=[];
var listenerIds=[];
var eventNames=[];
var source=sourceObject;
for(var i=0;i<propertyNames.length;i++){if(arrayIndexValues[i]!==""){eventNames.push("change");
}else{eventNames.push(this.__getEventNameForProperty(source,propertyNames[i]));
}sources[i]=source;
if(i==propertyNames.length-1){if(arrayIndexValues[i]!==""){var itemIndex=arrayIndexValues[i]==="last"?source.length-1:arrayIndexValues[i];
var currentValue=source.getItem(itemIndex);
this.__setInitialValue(currentValue,targetObject,targetProperty,options);
listenerIds[i]=this.__bindEventToProperty(source,eventNames[i],targetObject,targetProperty,options,arrayIndexValues[i]);
}else{if(propertyNames[i]!=null&&source["get"+qx.lang.String.firstUp(propertyNames[i])]!=null){var currentValue=source["get"+qx.lang.String.firstUp(propertyNames[i])]();
this.__setInitialValue(currentValue,targetObject,targetProperty,options);
}listenerIds[i]=this.__bindEventToProperty(source,eventNames[i],targetObject,targetProperty,options);
}}else{var context={index:i,propertyNames:propertyNames,sources:sources,listenerIds:listenerIds,arrayIndexValues:arrayIndexValues,targetObject:targetObject,targetProperty:targetProperty,options:options,listeners:listeners};
var listener=qx.lang.Function.bind(this.__chainListener,this,context);
listeners.push(listener);
listenerIds[i]=source.addListener(eventNames[i],listener);
}if(source["get"+qx.lang.String.firstUp(propertyNames[i])]==null){source=null;
}else if(arrayIndexValues[i]!==""){source=source["get"+qx.lang.String.firstUp(propertyNames[i])](arrayIndexValues[i]);
}else{source=source["get"+qx.lang.String.firstUp(propertyNames[i])]();
}
if(!source){break;
}}var id={type:"deepBinding",listenerIds:listenerIds,sources:sources};
this.__storeBinding(id,sourceObject,sourcePropertyChain,targetObject,targetProperty);
return id;
},__chainListener:function(context){for(var j=context.index+1;j<context.propertyNames.length;j++){var source=context.sources[j];
context.sources[j]=null;

if(!source){continue;
}source.removeListenerById(context.listenerIds[j]);
}var source=context.sources[context.index];
for(var j=context.index+1;j<context.propertyNames.length;j++){if(context.arrayIndexValues[j-1]!==""){source=source["get"+qx.lang.String.firstUp(context.propertyNames[j-1])](context.arrayIndexValues[j-1]);
}else{source=source["get"+qx.lang.String.firstUp(context.propertyNames[j-1])]();
}context.sources[j]=source;
if(!source){this.__resetTargetValue(context.targetObject,context.targetProperty);
break;
}if(j==context.propertyNames.length-1){if(qx.Class.implementsInterface(source,qx.data.IListData)){var itemIndex=context.arrayIndexValues[j]==="last"?source.length-1:context.arrayIndexValues[j];
var currentValue=source.getItem(itemIndex);
this.__setInitialValue(currentValue,context.targetObject,context.targetProperty,context.options);
context.listenerIds[j]=this.__bindEventToProperty(source,"change",context.targetObject,context.targetProperty,context.options,context.arrayIndexValues[j]);
}else{if(context.propertyNames[j]!=null&&source["get"+qx.lang.String.firstUp(context.propertyNames[j])]!=null){var currentValue=source["get"+qx.lang.String.firstUp(context.propertyNames[j])]();
this.__setInitialValue(currentValue,context.targetObject,context.targetProperty,context.options);
}var eventName=this.__getEventNameForProperty(source,context.propertyNames[j]);
context.listenerIds[j]=this.__bindEventToProperty(source,eventName,context.targetObject,context.targetProperty,context.options);
}}else{if(context.listeners[j]==null){var listener=qx.lang.Function.bind(this.__chainListener,this,context);
context.listeners.push(listener);
}if(qx.Class.implementsInterface(source,qx.data.IListData)){var eventName="change";
}else{var eventName=this.__getEventNameForProperty(source,context.propertyNames[j]);
}context.listenerIds[j]=source.addListener(eventName,context.listeners[j]);
}}},__getEventNameForProperty:function(source,propertyname){var eventName=this.__getEventForProperty(source,propertyname);
if(eventName==null){if(qx.Class.supportsEvent(source.constructor,propertyname)){eventName=propertyname;
}else if(qx.Class.supportsEvent(source.constructor,"change"+qx.lang.String.firstUp(propertyname))){eventName="change"+qx.lang.String.firstUp(propertyname);
}else{throw new qx.core.AssertionError("No event could be found for the property",propertyname);
}}return eventName;
},__resetTargetValue:function(targetObject,targetPropertyChain){var target=this.__getTargetFromChain(targetObject,targetPropertyChain);

if(target!=null){var lastProperty=targetPropertyChain.substring(targetPropertyChain.lastIndexOf(".")+1,targetPropertyChain.length);
target["reset"+qx.lang.String.firstUp(lastProperty)]();
}},__setTargetValue:function(targetObject,targetPropertyChain,value){var target=this.__getTargetFromChain(targetObject,targetPropertyChain);

if(target!=null){var lastProperty=targetPropertyChain.substring(targetPropertyChain.lastIndexOf(".")+1,targetPropertyChain.length);
target["set"+qx.lang.String.firstUp(lastProperty)](value);
}},__getTargetFromChain:function(targetObject,targetPropertyChain){var properties=targetPropertyChain.split(".");
var target=targetObject;
for(var i=0;i<properties.length-1;i++){try{var property=properties[i];
if(property.indexOf("]")==property.length-1){var index=property.substring(property.indexOf("[")+1,property.length-1);
property=property.substring(0,property.indexOf("["));
}target=target["get"+qx.lang.String.firstUp(property)]();

if(index!=null){if(index=="last"){index=target.length-1;
}target=target.getItem(index);
index=null;
}}catch(ex){return null;
}}return target;
},__setInitialValue:function(value,targetObject,targetPropertyChain,options){if(value==null){this.__resetTargetValue(targetObject,targetPropertyChain);
}value=this.__convertValue(value,targetObject,targetPropertyChain,options);
if(value!=undefined){this.__setTargetValue(targetObject,targetPropertyChain,value);
}},__checkForArrayInPropertyChain:function(propertyNames){var arrayIndexValues=[];
for(var i=0;i<propertyNames.length;i++){var name=propertyNames[i];
if(qx.lang.String.endsWith(name,"]")){var arrayIndex=name.substring(name.indexOf("[")+1,name.indexOf("]"));
if(name.indexOf("]")!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(arrayIndex!=="last"){if(arrayIndex==""||isNaN(parseInt(arrayIndex))){throw new Error("No number or 'last' value hast been given"+" in a array binding: "+name+" does not work.");
}}propertyNames[i]=name.substring(0,name.indexOf("["));
arrayIndexValues[i]="";
arrayIndexValues[i+1]=arrayIndex;
propertyNames.splice(i+1,0,"item");
i++;
}else{arrayIndexValues[i]="";
}}return arrayIndexValues;
},__bindEventToProperty:function(sourceObject,sourceEvent,targetObject,targetProperty,options,arrayIndex){{var eventType=qx.Class.getEventType(sourceObject.constructor,sourceEvent);
qx.core.Assert.assertEquals("qx.event.type.Data",eventType,sourceEvent+" is not an data (qx.event.type.Data) event on "+sourceObject+".");
};
var bindListener=function(arrayIndex,e){if(arrayIndex!==""){if(arrayIndex==="last"){arrayIndex=sourceObject.length-1;
}var data=sourceObject.getItem(arrayIndex);
if(data==undefined){qx.data.SingleValueBinding.__resetTargetValue(targetObject,targetProperty);
}var start=e.getData().start;
var end=e.getData().end;

if(arrayIndex<start||arrayIndex>end){return;
}}else{var data=e.getData();
}if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Binding executed from "+sourceObject+" by "+sourceEvent+" to "+targetObject+" ("+targetProperty+")");
qx.log.Logger.debug("Data before conversion: "+data);
}data=qx.data.SingleValueBinding.__convertValue(data,targetObject,targetProperty,options);
if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Data after conversion: "+data);
}try{if(data!=undefined){qx.data.SingleValueBinding.__setTargetValue(targetObject,targetProperty,data);
}else{qx.data.SingleValueBinding.__resetTargetValue(targetObject,targetProperty);
}if(options&&options.onSetOk){options.onSetOk(sourceObject,targetObject,data);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(options&&options.onSetFail){options.onSetFail(e);
}else{this.warn("Failed so set value "+data+" on "+targetObject+". Error message: "+e);
}}};
if(!arrayIndex){arrayIndex="";
}bindListener=qx.lang.Function.bind(bindListener,sourceObject,arrayIndex);
var id=sourceObject.addListener(sourceEvent,bindListener);
return id;
},__storeBinding:function(id,sourceObject,sourceEvent,targetObject,targetProperty){if(this.__bindings[sourceObject.toHashCode()]===undefined){this.__bindings[sourceObject.toHashCode()]=[];
}this.__bindings[sourceObject.toHashCode()].push([id,sourceObject,sourceEvent,targetObject,targetProperty]);
},__convertValue:function(value,targetObject,targetPropertyChain,options){if(options&&options.converter){return options.converter(value,targetObject.getUserData("model"));
}else{var target=this.__getTargetFromChain(targetObject,targetPropertyChain);
var lastProperty=targetPropertyChain.substring(targetPropertyChain.lastIndexOf(".")+1,targetPropertyChain.length);
if(target==null){return value;
}var propertieDefinition=qx.Class.getPropertyDefinition(target.constructor,lastProperty);
var check=propertieDefinition==null?"":propertieDefinition.check;
return this.__defaultConvertion(value,check);
}},__getEventForProperty:function(sourceObject,sourceProperty){var propertieDefinition=qx.Class.getPropertyDefinition(sourceObject.constructor,sourceProperty);

if(propertieDefinition==null){return null;
}return propertieDefinition.event;
},__defaultConvertion:function(data,targetCheck){var dataType=Object.prototype.toString.call(data).slice(8,-1);
if((dataType=="Number"||dataType=="String")&&(targetCheck=="Integer"||targetCheck=="PositiveInteger")){data=parseInt(data);
}if((dataType=="Boolean"||dataType=="Number"||dataType=="Date")&&targetCheck=="String"){data=data+"";
}if((dataType=="Number"||dataType=="String")&&(targetCheck=="Number"||targetCheck=="PositiveNumber")){data=parseFloat(data);
}return data;
},removeBindingFromObject:function(sourceObject,id){if(id.type=="deepBinding"){for(var i=0;i<id.sources.length;i++){if(id.sources[i]){id.sources[i].removeListenerById(id.listenerIds[i]);
}}}else{sourceObject.removeListenerById(id);
}var bindings=this.__bindings[sourceObject.toHashCode()];
if(bindings!=undefined){for(var i=0;i<bindings.length;i++){if(bindings[i][0]==id){qx.lang.Array.remove(bindings,bindings[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(object){{qx.core.Assert.assertNotNull(object,"Can not remove the bindings for null object!");
};
var bindings=this.__bindings[object.toHashCode()];
for(var i=bindings.length-1;i>=0;i--){this.removeBindingFromObject(object,bindings[i][0]);
}},getAllBindingsForObject:function(object){if(this.__bindings[object.toHashCode()]===undefined){this.__bindings[object.toHashCode()]=[];
}return this.__bindings[object.toHashCode()];
},removeAllBindings:function(){for(var hash in this.__bindings){var object=qx.core.ObjectRegistry.fromHashCode(hash);
if(object==null){delete this.__bindings[hash];
continue;
}this.removeAllBindingsForObject(object);
}this.__bindings={};
},getAllBindings:function(){return this.__bindings;
},showBindingInLog:function(object,id){var binding;
for(var i=0;i<this.__bindings[object.toHashCode()].length;i++){if(this.__bindings[object.toHashCode()][i][0]==id){binding=this.__bindings[object.toHashCode()][i];
break;
}}
if(binding===undefined){var message="Binding does not exist!";
}else{var message="Binding from '"+binding[1]+"' ("+binding[2]+") to the object '"+binding[3]+"' ("+binding[4]+").";
}qx.log.Logger.debug(message);
},showAllBindingsInLog:function(){for(var hash in this.__bindings){var object=qx.core.ObjectRegistry.fromHashCode(hash);

for(var i=0;i<this.__bindings[hash].length;i++){this.showBindingInLog(object,this.__bindings[hash][i][0]);
}}}}});
qx.Class.define("qx.core.ValidationError",{extend:qx.type.BaseError});
qx.Class.define("qx.event.handler.Object",{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(target,type){return qx.Class.supportsEvent(target.constructor,type);
},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){}},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Class.define("qx.util.DisposeUtil",{statics:{disposeFields:function(obj,arr){var name;

for(var i=0,l=arr.length;i<l;i++){var name=arr[i];

if(obj[name]==null||!obj.hasOwnProperty(name)){continue;
}obj[name]=null;
}},disposeObjects:function(obj,arr){var name;

for(var i=0,l=arr.length;i<l;i++){name=arr[i];

if(obj[name]==null||!obj.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(obj[name].dispose){obj[name].dispose();
}else{throw new Error("Has no disposable object under key: "+name+"!");
}}obj[name]=null;
}},disposeArray:function(obj,field){var data=obj[field];

if(!data){return;
}if(qx.core.ObjectRegistry.inShutDown){obj[field]=null;
return;
}try{var entry;

for(var i=data.length-1;i>=0;i--){entry=data[i];

if(entry){entry.dispose();
}}}catch(ex){throw new Error("The array field: "+field+" of object: "+obj+" has non disposable entries: "+ex);
}data.length=0;
obj[field]=null;
},disposeMap:function(obj,field){var data=obj[field];

if(!data){return;
}if(qx.core.ObjectRegistry.inShutDown){obj[field]=null;
return;
}try{for(var key in data){if(data.hasOwnProperty(key)){data[key].dispose();
}}}catch(ex){throw new Error("The map field: "+field+" of object: "+obj+" has non disposable entries: "+ex);
}obj[field]=null;
}}});
qx.Bootstrap.define("qx.lang.Date",{statics:{now:function(){return +new Date;
}}});
qx.Class.define("qx.event.handler.Focus",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){this.base(arguments);
this._manager=manager;
this._window=manager.getWindow();
this._document=this._window.document;
this._root=this._document.documentElement;
this._body=this._document.body;
this._initObserver();
},properties:{active:{apply:"_applyActive",nullable:true},focus:{apply:"_applyFocus",nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Variant.select("qx.client",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){},focus:function(element){try{element.focus();
}catch(ex){}this.setFocus(element);
this.setActive(element);
},activate:function(element){this.setActive(element);
},blur:function(element){try{element.blur();
}catch(ex){}
if(this.getActive()===element){this.resetActive();
}
if(this.getFocus()===element){this.resetFocus();
}},deactivate:function(element){if(this.getActive()===element){this.resetActive();
}},tryActivate:function(element){var active=this.__findActivatableElement(element);

if(active){this.setActive(active);
}},__fireEvent:function(target,related,type,bubbles){var Registration=qx.event.Registration;
var evt=Registration.createEvent(type,qx.event.type.Focus,[target,related,bubbles]);
Registration.dispatchEvent(target,evt);
},_windowFocused:true,__doWindowBlur:function(){if(this._windowFocused){this._windowFocused=false;
this.__fireEvent(this._window,null,"blur",false);
}},__doWindowFocus:function(){if(!this._windowFocused){this._windowFocused=true;
this.__fireEvent(this._window,null,"focus",false);
}},_initObserver:qx.core.Variant.select("qx.client",{"gecko":function(){this.__onNativeMouseDownWrapper=qx.lang.Function.listener(this.__onNativeMouseDown,this);
this.__onNativeMouseUpWrapper=qx.lang.Function.listener(this.__onNativeMouseUp,this);
this.__onNativeFocusWrapper=qx.lang.Function.listener(this.__onNativeFocus,this);
this.__onNativeBlurWrapper=qx.lang.Function.listener(this.__onNativeBlur,this);
this.__onNativeDragGestureWrapper=qx.lang.Function.listener(this.__onNativeDragGesture,this);
this._document.addEventListener("mousedown",this.__onNativeMouseDownWrapper,true);
this._document.addEventListener("mouseup",this.__onNativeMouseUpWrapper,true);
this._window.addEventListener("focus",this.__onNativeFocusWrapper,true);
this._window.addEventListener("blur",this.__onNativeBlurWrapper,true);
this._window.addEventListener("draggesture",this.__onNativeDragGestureWrapper,true);
},"mshtml":function(){this.__onNativeMouseDownWrapper=qx.lang.Function.listener(this.__onNativeMouseDown,this);
this.__onNativeMouseUpWrapper=qx.lang.Function.listener(this.__onNativeMouseUp,this);
this.__onNativeFocusInWrapper=qx.lang.Function.listener(this.__onNativeFocusIn,this);
this.__onNativeFocusOutWrapper=qx.lang.Function.listener(this.__onNativeFocusOut,this);
this.__onNativeSelectStartWrapper=qx.lang.Function.listener(this.__onNativeSelectStart,this);
this._document.attachEvent("onmousedown",this.__onNativeMouseDownWrapper);
this._document.attachEvent("onmouseup",this.__onNativeMouseUpWrapper);
this._document.attachEvent("onfocusin",this.__onNativeFocusInWrapper);
this._document.attachEvent("onfocusout",this.__onNativeFocusOutWrapper);
this._document.attachEvent("onselectstart",this.__onNativeSelectStartWrapper);
},"webkit":function(){this.__onNativeMouseDownWrapper=qx.lang.Function.listener(this.__onNativeMouseDown,this);
this.__onNativeMouseUpWrapper=qx.lang.Function.listener(this.__onNativeMouseUp,this);
this.__onNativeFocusOutWrapper=qx.lang.Function.listener(this.__onNativeFocusOut,this);
this.__onNativeFocusWrapper=qx.lang.Function.listener(this.__onNativeFocus,this);
this.__onNativeBlurWrapper=qx.lang.Function.listener(this.__onNativeBlur,this);
this.__onNativeSelectStartWrapper=qx.lang.Function.listener(this.__onNativeSelectStart,this);
this._document.addEventListener("mousedown",this.__onNativeMouseDownWrapper,true);
this._document.addEventListener("mouseup",this.__onNativeMouseUpWrapper,true);
this._document.addEventListener("selectstart",this.__onNativeSelectStartWrapper,false);
this._window.addEventListener("DOMFocusOut",this.__onNativeFocusOutWrapper,true);
this._window.addEventListener("focus",this.__onNativeFocusWrapper,true);
this._window.addEventListener("blur",this.__onNativeBlurWrapper,true);
},"opera":function(){this.__onNativeMouseDownWrapper=qx.lang.Function.listener(this.__onNativeMouseDown,this);
this.__onNativeMouseUpWrapper=qx.lang.Function.listener(this.__onNativeMouseUp,this);
this.__onNativeFocusInWrapper=qx.lang.Function.listener(this.__onNativeFocusIn,this);
this.__onNativeFocusOutWrapper=qx.lang.Function.listener(this.__onNativeFocusOut,this);
this._document.addEventListener("mousedown",this.__onNativeMouseDownWrapper,true);
this._document.addEventListener("mouseup",this.__onNativeMouseUpWrapper,true);
this._window.addEventListener("DOMFocusIn",this.__onNativeFocusInWrapper,true);
this._window.addEventListener("DOMFocusOut",this.__onNativeFocusOutWrapper,true);
}}),_stopObserver:qx.core.Variant.select("qx.client",{"gecko":function(){this._document.removeEventListener("mousedown",this.__onNativeMouseDownWrapper,true);
this._document.removeEventListener("mouseup",this.__onNativeMouseUpWrapper,true);
this._window.removeEventListener("focus",this.__onNativeFocusWrapper,true);
this._window.removeEventListener("blur",this.__onNativeBlurWrapper,true);
this._window.removeEventListener("draggesture",this.__onNativeDragGestureWrapper,true);
},"mshtml":function(){this._document.detachEvent("onmousedown",this.__onNativeMouseDownWrapper);
this._document.detachEvent("onmouseup",this.__onNativeMouseUpWrapper);
this._document.detachEvent("onfocusin",this.__onNativeFocusInWrapper);
this._document.detachEvent("onfocusout",this.__onNativeFocusOutWrapper);
this._document.detachEvent("onselectstart",this.__onNativeSelectStartWrapper);
},"webkit":function(){this._document.removeEventListener("mousedown",this.__onNativeMouseDownWrapper,true);
this._document.removeEventListener("selectstart",this.__onNativeSelectStartWrapper,false);
this._window.removeEventListener("DOMFocusIn",this.__onNativeFocusInWrapper,true);
this._window.removeEventListener("DOMFocusOut",this.__onNativeFocusOutWrapper,true);
this._window.removeEventListener("focus",this.__onNativeFocusWrapper,true);
this._window.removeEventListener("blur",this.__onNativeBlurWrapper,true);
},"opera":function(){this._document.removeEventListener("mousedown",this.__onNativeMouseDownWrapper,true);
this._window.removeEventListener("DOMFocusIn",this.__onNativeFocusInWrapper,true);
this._window.removeEventListener("DOMFocusOut",this.__onNativeFocusOutWrapper,true);
this._window.removeEventListener("focus",this.__onNativeFocusWrapper,true);
this._window.removeEventListener("blur",this.__onNativeBlurWrapper,true);
}}),__onNativeDragGesture:qx.core.Variant.select("qx.client",{"gecko":function(e){if(!this.__isSelectable(e.target)){qx.bom.Event.preventDefault(e);
}},"default":null}),__onNativeFocusIn:qx.core.Variant.select("qx.client",{"mshtml":function(e){this.__doWindowFocus();
var target=e.srcElement;
var focusTarget=this.__findFocusableElement(target);

if(focusTarget){this.setFocus(focusTarget);
}this.tryActivate(target);
},"opera":function(e){var target=e.target;

if(target==this._document||target==this._window){this.__doWindowFocus();

if(this.__previousFocus){this.setFocus(this.__previousFocus);
delete this.__previousFocus;
}
if(this.__previousActive){this.setActive(this.__previousActive);
delete this.__previousActive;
}}else{this.setFocus(target);
this.tryActivate(target);
if(!this.__isSelectable(target)){target.selectionStart=0;
target.selectionEnd=0;
}}},"default":null}),__onNativeFocusOut:qx.core.Variant.select("qx.client",{"mshtml":function(e){if(!e.toElement){this.__doWindowBlur();
this.resetFocus();
this.resetActive();
}},"webkit":function(e){var target=e.target;

if(target===this.getFocus()){this.resetFocus();
}
if(target===this.getActive()){this.resetActive();
}},"opera":function(e){var target=e.target;

if(target==this._document){this.__doWindowBlur();
this.__previousFocus=this.getFocus();
this.__previousActive=this.getActive();
this.resetFocus();
this.resetActive();
}else{if(target===this.getFocus()){this.resetFocus();
}
if(target===this.getActive()){this.resetActive();
}}},"default":null}),__onNativeBlur:qx.core.Variant.select("qx.client",{"gecko":function(e){if(e.target===this._window||e.target===this._document){this.__doWindowBlur();
this.resetActive();
this.resetFocus();
}},"webkit":function(e){if(e.target===this._window||e.target===this._document){this.__doWindowBlur();
this.__previousFocus=this.getFocus();
this.__previousActive=this.getActive();
this.resetActive();
this.resetFocus();
}},"default":null}),__onNativeFocus:qx.core.Variant.select("qx.client",{"gecko":function(e){var target=e.target;

if(target===this._window||target===this._document){this.__doWindowFocus();
target=this._body;
}this.setFocus(target);
this.tryActivate(target);
},"webkit":function(e){var target=e.target;

if(target===this._window||target===this._document){this.__doWindowFocus();

if(this.__previousFocus){this.setFocus(this.__previousFocus);
delete this.__previousFocus;
}
if(this.__previousActive){this.setActive(this.__previousActive);
delete this.__previousActive;
}}else{this.setFocus(target);
this.tryActivate(target);
}},"default":null}),__onNativeMouseDown:qx.core.Variant.select("qx.client",{"gecko":function(e){var target=e.target;
var focusTarget=this.__findFocusableElement(target);
var selectable=this.__isSelectable(target);

if(!selectable){qx.bom.Event.preventDefault(e);
if(focusTarget){focusTarget.focus();
}}else if(!focusTarget){qx.bom.Event.preventDefault(e);
}},"mshtml":function(e){var target=e.srcElement;
var focusTarget=this.__findFocusableElement(target);

if(focusTarget){if(!this.__isSelectable(target)){target.unselectable="on";
document.selection.empty();
focusTarget.focus();
}}else{qx.bom.Event.preventDefault(e);
if(!this.__isSelectable(target)){target.unselectable="on";
}}},"webkit":function(e){var target=e.target;
var focusTarget=this.__findFocusableElement(target);

if(focusTarget){this.setFocus(focusTarget);
}else{qx.bom.Event.preventDefault(e);
}},"opera":function(e){var target=e.target;
var focusTarget=this.__findFocusableElement(target);

if(!this.__isSelectable(target)){qx.bom.Event.preventDefault(e);
if(focusTarget){var current=this.getFocus();

if(current&&current.selectionEnd){current.selectionStart=0;
current.selectionEnd=0;
current.blur();
}if(focusTarget){this.setFocus(focusTarget);
}}}else if(focusTarget){this.setFocus(focusTarget);
}},"default":null}),__onNativeMouseUp:qx.core.Variant.select("qx.client",{"mshtml":function(e){var target=e.srcElement;

if(target.unselectable){target.unselectable="off";
}this.tryActivate(target);
},"gecko":function(e){var target=e.target;

while(target&&target.offsetWidth===undefined){target=target.parentNode;
}
if(target){this.tryActivate(target);
}},"webkit|opera":function(e){this.tryActivate(e.target);
},"default":null}),__onNativeSelectStart:qx.core.Variant.select("qx.client",{"mshtml|webkit":function(e){if(!this.__isSelectable(e.srcElement)){qx.bom.Event.preventDefault(e);
}},"default":null}),__isFocusable:function(el){var index=qx.bom.element.Attribute.get(el,"tabIndex");

if(index>=1){return true;
}var focusable=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(index>=0&&focusable[el.tagName]){return true;
}return false;
},__findFocusableElement:function(el){while(el&&el.nodeType===1){if(el.getAttribute("qxKeepFocus")=="on"){return null;
}
if(this.__isFocusable(el)){return el;
}el=el.parentNode;
}return this._body;
},__findActivatableElement:function(el){var orig=el;

while(el&&el.nodeType===1){if(el.getAttribute("qxKeepActive")=="on"){return null;
}el=el.parentNode;
}return orig;
},__isSelectable:function(node){while(node&&node.nodeType===1){var attr=node.getAttribute("qxSelectable");

if(attr!=null){return attr==="on";
}node=node.parentNode;
}return true;
},_applyActive:function(value,old){if(old){this.__fireEvent(old,value,"deactivate",true);
}
if(value){this.__fireEvent(value,old,"activate",true);
}},_applyFocus:function(value,old){if(old){this.__fireEvent(old,value,"focusout",true);
}
if(value){this.__fireEvent(value,old,"focusin",true);
}if(old){this.__fireEvent(old,value,"blur",false);
}
if(value){this.__fireEvent(value,old,"focus",false);
}}},destruct:function(){this._stopObserver();
this._disposeFields("_manager","_window","_document","_root","_body","__mouseActive");
},defer:function(statics){qx.event.Registration.addHandler(statics);
var focusable=statics.FOCUSABLE_ELEMENTS;

for(var entry in focusable){focusable[entry.toUpperCase()]=1;
}}});
qx.Class.define("qx.event.type.Focus",{extend:qx.event.type.Event,members:{init:function(target,relatedTarget,canBubble){this.base(arguments,canBubble,false);
this._target=target;
this._relatedTarget=relatedTarget;
return this;
}}});
qx.Class.define("qx.bom.element.Attribute",{statics:{__hints:{names:{"class":"className","for":"htmlFor",html:"innerHTML",text:qx.core.Variant.isSet("qx.client","mshtml")?"innerText":"textContent",colspan:"colSpan",rowspan:"rowSpan",valign:"vAlign",datetime:"dateTime",accesskey:"accessKey",tabindex:"tabIndex",maxlength:"maxLength",readonly:"readOnly",longdesc:"longDesc",cellpadding:"cellPadding",cellspacing:"cellSpacing",frameborder:"frameBorder",usemap:"useMap"},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readonly:1,multiple:1,selected:1,noresize:1,defer:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},original:{href:1,src:1,type:1}},compile:function(map){var html=[];
var runtime=this.__hints.runtime;

for(var key in map){if(!runtime[key]){html.push(key,"='",map[key],"'");
}}return html.join("");
},get:qx.core.Variant.select("qx.client",{"mshtml":function(element,name){var hints=this.__hints;
var value;
name=hints.names[name]||name;
if(hints.original[name]){value=element.getAttribute(name,2);
}else if(hints.property[name]){value=element[name];
}else{value=element.getAttribute(name);
}if(hints.bools[name]){return !!value;
}return value;
},"default":function(element,name){var hints=this.__hints;
var value;
name=hints.names[name]||name;
if(hints.property[name]){value=element[name];

if(value==null){value=element.getAttribute(name);
}}else{value=element.getAttribute(name);
}if(hints.bools[name]){return !!value;
}return value;
}}),set:function(element,name,value){var hints=this.__hints;
name=hints.names[name]||name;
if(hints.bools[name]){value=!!value;
}if(hints.property[name]){element[name]=value;
}else if(value===true){element.setAttribute(name,name);
}else if(value===false||value===null){element.removeAttribute(name);
}else if(qx.core.Variant.isSet("qx.client","mshtml")&&name=="style"){element.style.setAttribute("cssText",value);
}else{element.setAttribute(name,value);
}},reset:function(element,name){this.set(element,name,null);
}}});
qx.Class.define("qx.event.type.Native",{extend:qx.event.type.Event,members:{init:function(nativeEvent,target,relatedTarget,canBubble,cancelable){this.base(arguments,canBubble,cancelable);
this._target=target||qx.bom.Event.getTarget(nativeEvent);
this._relatedTarget=relatedTarget||qx.bom.Event.getRelatedTarget(nativeEvent);

if(nativeEvent.timeStamp){this._timeStamp=nativeEvent.timeStamp;
}this._native=nativeEvent;
return this;
},clone:function(embryo){var clone=this.base(arguments,embryo);
clone._native=this._native;
clone._returnValue=this._returnValue;
return clone;
},preventDefault:function(){this.base(arguments);
qx.bom.Event.preventDefault(this._native);
},stop:function(){this.stopPropagation();
this.preventDefault();
},getNativeEvent:function(){return this._native;
},setReturnValue:function(returnValue){this._returnValue=returnValue;
},getReturnValue:function(){return this._returnValue;
}},destruct:function(){this._disposeFields("_native","_returnValue");
}});
qx.Class.define("qx.event.type.Dom",{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{getModifiers:function(){if(!this.__modifiers){var mask=0;
var evt=this._native;

if(evt.shiftKey){mask|=qx.event.type.Dom.SHIFT_MASK;
}
if(evt.ctrlKey){mask|=qx.event.type.Dom.CTRL_MASK;
}
if(evt.altKey){mask|=qx.event.type.Dom.ALT_MASK;
}
if(evt.metaKey){mask|=qx.event.type.Dom.META_MASK;
}return mask;
}return this.__modifiers;
},isCtrlPressed:function(){return this._native.ctrlKey;
},isShiftPressed:function(){return this._native.shiftKey;
},isAltPressed:function(){return this._native.altKey;
},isMetaPressed:function(){return this._native.metaKey;
},isCtrlOrCommandPressed:function(){if(qx.bom.client.Platform.MAC){return this._native.metaKey;
}else{return this._native.ctrlKey;
}}}});
qx.Class.define("qx.event.type.KeyInput",{extend:qx.event.type.Dom,members:{init:function(domEvent,target,charCode){this.base(arguments,domEvent,target,null,true,true);
this._charCode=charCode;
return this;
},clone:function(embryo){var clone=this.base(arguments,embryo);
clone._charCode=this._charCode;
return clone;
},getCharCode:function(){return this._charCode;
},getChar:function(){return String.fromCharCode(this._charCode);
}}});
qx.Bootstrap.define("qx.bom.client.Platform",{statics:{NAME:"",WIN:false,MAC:false,UNIX:false,UNKNOWN_PLATFORM:false,__init:function(){var input=navigator.platform;
if(input==null||input===""){input=navigator.userAgent;
}
if(input.indexOf("Windows")!=-1||input.indexOf("Win32")!=-1||input.indexOf("Win64")!=-1){this.WIN=true;
this.NAME="win";
}else if(input.indexOf("Macintosh")!=-1||input.indexOf("MacPPC")!=-1||input.indexOf("MacIntel")!=-1||input.indexOf("iPod")!=-1||input.indexOf("iPhone")!=-1){this.MAC=true;
this.NAME="mac";
}else if(input.indexOf("X11")!=-1||input.indexOf("Linux")!=-1||input.indexOf("BSD")!=-1){this.UNIX=true;
this.NAME="unix";
}else{this.UNKNOWN_PLATFORM=true;
this.WIN=true;
this.NAME="win";
}}},defer:function(statics){statics.__init();
}});
qx.Class.define("qx.event.type.KeySequence",{extend:qx.event.type.Dom,members:{init:function(domEvent,target,identifier){this.base(arguments,domEvent,target,null,true,true);
this._identifier=identifier;
return this;
},clone:function(embryo){var clone=this.base(arguments,embryo);
clone._identifier=this._identifier;
return clone;
},getKeyIdentifier:function(){return this._identifier;
}}});
qx.Class.define("qx.event.type.Mouse",{extend:qx.event.type.Dom,members:{init:function(nativeEvent,target,relatedTarget,canBubble,cancelable){this.base(arguments,nativeEvent,target,relatedTarget,canBubble,cancelable);

if(!relatedTarget){this._relatedTarget=qx.bom.Event.getRelatedTarget(nativeEvent);
}return this;
},__buttons:qx.core.Variant.select("qx.client",{"mshtml":{1:"left",2:"right",4:"middle"},"default":{0:"left",2:"right",1:"middle"}}),stop:function(){this.stopPropagation();
},getButton:function(){switch(this._type){case "click":case "dblclick":return "left";
case "contextmenu":return "right";
default:return this.__buttons[this._native.button]||"none";
}},isLeftPressed:function(){return this.getButton()==="left";
},isMiddlePressed:function(){return this.getButton()==="middle";
},isRightPressed:function(){return this.getButton()==="right";
},getRelatedTarget:function(){return this._relatedTarget;
},getViewportLeft:function(){return this._native.clientX;
},getViewportTop:function(){return this._native.clientY;
},getDocumentLeft:qx.core.Variant.select("qx.client",{"mshtml":function(){var win=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(win);
},"default":function(){return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select("qx.client",{"mshtml":function(){var win=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(win);
},"default":function(){return this._native.pageY;
}}),getScreenLeft:function(){return this._native.screenX;
},getScreenTop:function(){return this._native.screenY;
},getWheelDelta:qx.core.Variant.select("qx.client",{"default":function(){return -(this._native.wheelDelta/40);
},"gecko":function(){return this._native.detail;
}})}});
qx.Class.define("qx.bom.Viewport",{statics:{getWidth:qx.core.Variant.select("qx.client",{"opera":function(win){return (win||window).document.body.clientWidth;
},"webkit":function(win){return (win||window).innerWidth;
},"default":function(win){var doc=(win||window).document;
return doc.compatMode==="CSS1Compat"?doc.documentElement.clientWidth:doc.body.clientWidth;
}}),getHeight:qx.core.Variant.select("qx.client",{"opera":function(win){return (win||window).document.body.clientHeight;
},"webkit":function(win){return (win||window).innerHeight;
},"default":function(win){var doc=(win||window).document;
return doc.compatMode==="CSS1Compat"?doc.documentElement.clientHeight:doc.body.clientHeight;
}}),getScrollLeft:qx.core.Variant.select("qx.client",{"mshtml":function(win){var doc=(win||window).document;
return doc.documentElement.scrollLeft||doc.body.scrollLeft;
},"default":function(win){return (win||window).pageXOffset;
}}),getScrollTop:qx.core.Variant.select("qx.client",{"mshtml":function(win){var doc=(win||window).document;
return doc.documentElement.scrollTop||doc.body.scrollTop;
},"default":function(win){return (win||window).pageYOffset;
}})}});
qx.Class.define("qx.dom.Hierarchy",{statics:{getNodeIndex:function(node){var index=0;

while(node&&(node=node.previousSibling)){index++;
}return index;
},getElementIndex:function(element){var index=0;
var type=qx.dom.Node.ELEMENT;

while(element&&(element=element.previousSibling)){if(element.nodeType==type){index++;
}}return index;
},getNextElementSibling:function(element){while(element&&(element=element.nextSibling)&&!qx.dom.Node.isElement(element)){continue;
}return element||null;
},getPreviousElementSibling:function(element){while(element&&(element=element.previousSibling)&&!qx.dom.Node.isElement(element)){continue;
}return element||null;
},contains:qx.core.Variant.select("qx.client",{"webkit|mshtml|opera":function(element,target){if(qx.dom.Node.isDocument(element)){var doc=qx.dom.Node.getDocument(target);
return element&&doc==element;
}else if(qx.dom.Node.isDocument(target)){return false;
}else{return element.contains(target);
}},"gecko":function(element,target){return !!(element.compareDocumentPosition(target)&16);
},"default":function(element,target){while(target){if(element==target){return true;
}target=target.parentNode;
}return false;
}}),isRendered:function(element){if(!element.offsetParent){return false;
}var doc=element.ownerDocument||element.document;
if(doc.body.contains){return doc.body.contains(element);
}if(doc.compareDocumentPosition){return !!(doc.compareDocumentPosition(element)&16);
}throw new Error("Missing support for isRendered()!");
},isDescendantOf:function(element,ancestor){return this.contains(ancestor,element);
},getCommonParent:qx.core.Variant.select("qx.client",{"mshtml|opera":function(element1,element2){if(element1===element2){return element1;
}
while(element1&&qx.dom.Node.isElement(element1)){if(element1.contains(element2)){return element1;
}element1=element1.parentNode;
}return null;
},"default":function(element1,element2){if(element1===element2){return element1;
}var known={};
var obj=qx.core.ObjectRegistry;
var h1,h2;

while(element1||element2){if(element1){h1=obj.toHashCode(element1);

if(known[h1]){return known[h1];
}known[h1]=element1;
element1=element1.parentNode;
}
if(element2){h2=obj.toHashCode(element2);

if(known[h2]){return known[h2];
}known[h2]=element2;
element2=element2.parentNode;
}}return null;
}}),getAncestors:function(element){return this._recursivelyCollect(element,"parentNode");
},getChildElements:function(element){element=element.firstChild;

if(!element){return [];
}var arr=this.getNextSiblings(element);

if(element.nodeType===1){arr.unshift(element);
}return arr;
},getDescendants:function(element){return qx.lang.Array.fromCollection(element.getElementsByTagName("*"));
},getFirstDescendant:function(element){element=element.firstChild;

while(element&&element.nodeType!=1){element=element.nextSibling;
}return element;
},getLastDescendant:function(element){element=element.lastChild;

while(element&&element.nodeType!=1){element=element.previousSibling;
}return element;
},getPreviousSiblings:function(element){return this._recursivelyCollect(element,"previousSibling");
},getNextSiblings:function(element){return this._recursivelyCollect(element,"nextSibling");
},_recursivelyCollect:function(element,property){var list=[];

while(element=element[property]){if(element.nodeType==1){list.push(element);
}}return list;
},getSiblings:function(element){return this.getPreviousSiblings(element).reverse().concat(this.getNextSiblings(element));
},isEmpty:function(element){element=element.firstChild;

while(element){if(element.nodeType===qx.dom.Node.ELEMENT||element.nodeType===qx.dom.Node.TEXT){return false;
}element=element.nextSibling;
}return true;
},cleanWhitespace:function(element){var node=element.firstChild;

while(node){var nextNode=node.nextSibling;

if(node.nodeType==3&&!/\S/.test(node.nodeValue)){element.removeChild(node);
}node=nextNode;
}}}});
qx.Class.define("qx.event.type.Drag",{extend:qx.event.type.Event,members:{init:function(cancelable,originalEvent){this.base(arguments,false,cancelable);

if(originalEvent){this._native=originalEvent.getNativeEvent()||null;
this._originalTarget=originalEvent.getTarget()||null;
}else{this._native=null;
this._originalTarget=null;
}return this;
},clone:function(embryo){var clone=this.base(arguments,embryo);
clone._native=this._native;
return clone;
},getDocumentLeft:qx.core.Variant.select("qx.client",{"mshtml":function(){if(this._native==null){return 0;
}var win=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(win);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select("qx.client",{"mshtml":function(){if(this._native==null){return 0;
}var win=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(win);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageY;
}}),getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);
},addType:function(type){this.getManager().addType(type);
},addAction:function(action){this.getManager().addAction(action);
},supportsType:function(type){return this.getManager().supportsType(type);
},supportsAction:function(action){return this.getManager().supportsAction(action);
},addData:function(type,data){this.getManager().addData(type,data);
},getData:function(type){return this.getManager().getData(type);
},getCurrentType:function(){return this.getManager().getCurrentType();
},getCurrentAction:function(){return this.getManager().getCurrentAction();
}}});
qx.Class.define("qx.event.dispatch.MouseCapture",{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(manager){this.base(arguments);
this.__manager=manager;
this.__window=manager.getWindow();
manager.addListener(this.__window,"blur",this.releaseCapture,this);
manager.addListener(this.__window,"focus",this.releaseCapture,this);
manager.addListener(this.__window,"scroll",this.releaseCapture,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__captureElement:null,__manager:null,__window:null,canDispatchEvent:function(target,event,type){return (this.__captureElement&&this.__captureEvents[type]);
},dispatchEvent:function(target,event,type){if(type=="click"){event.stopPropagation();
this.releaseCapture();
return;
}var listeners=this.__manager.getListeners(this.__captureElement,type,false);

if(listeners){event.setCurrentTarget(this.__captureElement);
event.setEventPhase(qx.event.type.Event.AT_TARGET);

for(var i=0,l=listeners.length;i<l;i++){var context=listeners[i].context||event.getCurrentTarget();
listeners[i].handler.call(context,event);
}}},__captureEvents:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(element){if(this.__captureElement===element){return;
}
if(this.__captureElement){this.releaseCapture();
}this.__captureElement=element;
qx.event.Registration.fireEvent(element,"capture",qx.event.type.Event,[true,false]);
},releaseCapture:function(){var element=this.__captureElement;

if(!element){return;
}this.__captureElement=null;
qx.event.Registration.fireEvent(element,"losecapture",qx.event.type.Event,[true,false]);
}},destruct:function(){this._disposeFields("__captureElement","__manager","__window");
},defer:function(statics){qx.event.Registration.addDispatcher(statics);
}});
qx.Class.define("qx.event.handler.Window",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){this.base(arguments);
this._manager=manager;
this._window=manager.getWindow();
this._initWindowObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){},_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);
var types=qx.event.handler.Window.SUPPORTED_TYPES;

for(var key in types){qx.bom.Event.addNativeListener(this._window,key,this._onNativeWrapper);
}},_stopWindowObserver:function(){var types=qx.event.handler.Window.SUPPORTED_TYPES;

for(var key in types){qx.bom.Event.removeNativeListener(this._window,key,this._onNativeWrapper);
}},_onNative:function(e){if(this.isDisposed()){return;
}var win=this._window;
var doc=win.document;
var html=doc.documentElement;
var target=e.target||e.srcElement;

if(target==null||target===win||target===doc||target===html){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,win]);
qx.event.Registration.dispatchEvent(win,event);
var result=event.getReturnValue();

if(result!=null){e.returnValue=result;
return result;
}}}},destruct:function(){this._stopWindowObserver();
this._disposeFields("_manager","_window");
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Bootstrap.define("qx.xml.Document",{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(elem){if(elem.nodeType===9){return elem.documentElement.nodeName!=="HTML";
}else if(elem.ownerDocument){return this.isXmlDocument(elem.ownerDocument);
}else{return false;
}},create:qx.core.Variant.select("qx.client",{"mshtml":function(namespaceUri,qualifiedName){var obj=new ActiveXObject(this.DOMDOC);
obj.setProperty("SelectionLanguage","XPath");

if(qualifiedName){var str='<\?xml version="1.0" encoding="utf-8"?>\n<';
str+=qualifiedName;

if(namespaceUri){str+=" xmlns='"+namespaceUri+"'";
}str+=" />";
obj.loadXML(str);
}return obj;
},"default":function(namespaceUri,qualifiedName){return document.implementation.createDocument(namespaceUri||"",qualifiedName||"",null);
}}),fromString:qx.core.Variant.select("qx.client",{"mshtml":function(str){var dom=qx.xml.Document.create();
dom.loadXML(str);
return dom;
},"default":function(str){var parser=new DOMParser();
return parser.parseFromString(str,"text/xml");
}})},defer:function(statics){if(qx.core.Variant.isSet("qx.client","mshtml")){var domDoc=["MSXML2.DOMDocument.6.0","MSXML2.DOMDocument.3.0"];
var httpReq=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0"];

for(var i=0,l=domDoc.length;i<l;i++){try{new ActiveXObject(domDoc[i]);
new ActiveXObject(httpReq[i]);
}catch(ex){continue;
}statics.DOMDOC=domDoc[i];
statics.XMLHTTP=httpReq[i];
break;
}}}});
qx.Class.define("qx.bom.element.Class",{statics:{add:function(element,name){if(!this.has(element,name)){element.className+=(element.className?" ":"")+name;
}return name;
},get:function(element){return element.className;
},has:function(element,name){var regexp=new RegExp("(^|\\s)"+name+"(\\s|$)");
return regexp.test(element.className);
},remove:function(element,name){var regexp=new RegExp("(^|\\s)"+name+"(\\s|$)");
element.className=element.className.replace(regexp,"$2");
return name;
},replace:function(element,oldName,newName){this.remove(element,oldName);
return this.add(element,newName);
},toggle:function(element,name,toggle){if(toggle==null){toggle=!this.has(element,name);
}toggle?this.add(element,name):this.remove(element,name);
return name;
}}});
qx.Class.define("qx.bom.element.Scroll",{statics:{intoViewX:function(element,stop,align){var parent=element.parentNode;
var doc=qx.dom.Node.getDocument(element);
var body=doc.body;
var parentLocation,parentLeft,parentRight;
var parentOuterWidth,parentClientWidth,parentScrollWidth;
var parentLeftBorder,parentRightBorder,parentScrollBarWidth;
var elementLocation,elementLeft,elementRight,elementWidth;
var leftOffset,rightOffset,scrollDiff;
var alignLeft=align==="left";
var alignRight=align==="right";
stop=stop?stop.parentNode:doc;
while(parent&&parent!=stop){if(parent.scrollWidth>parent.clientWidth&&(parent===body||qx.bom.element.Overflow.getY(parent)!="visible")){if(parent===body){parentLeft=parent.scrollLeft;
parentRight=parentLeft+qx.bom.Viewport.getWidth();
parentOuterWidth=qx.bom.Viewport.getWidth();
parentClientWidth=parent.clientWidth;
parentScrollWidth=parent.scrollWidth;
parentLeftBorder=0;
parentRightBorder=0;
parentScrollBarWidth=0;
}else{parentLocation=qx.bom.element.Location.get(parent);
parentLeft=parentLocation.left;
parentRight=parentLocation.right;
parentOuterWidth=parent.offsetWidth;
parentClientWidth=parent.clientWidth;
parentScrollWidth=parent.scrollWidth;
parentLeftBorder=parseInt(qx.bom.element.Style.get(parent,"borderLeftWidth"),10)||0;
parentRightBorder=parseInt(qx.bom.element.Style.get(parent,"borderRightWidth"),10)||0;
parentScrollBarWidth=parentOuterWidth-parentClientWidth-parentLeftBorder-parentRightBorder;
}elementLocation=qx.bom.element.Location.get(element);
elementLeft=elementLocation.left;
elementRight=elementLocation.right;
elementWidth=element.offsetWidth;
leftOffset=elementLeft-parentLeft-parentLeftBorder;
rightOffset=elementRight-parentRight+parentRightBorder;
scrollDiff=0;
if(alignLeft){scrollDiff=leftOffset;
}else if(alignRight){scrollDiff=rightOffset+parentScrollBarWidth;
}else if(leftOffset<0||elementWidth>parentClientWidth){scrollDiff=leftOffset;
}else if(rightOffset>0){scrollDiff=rightOffset+parentScrollBarWidth;
}parent.scrollLeft+=scrollDiff;
if(qx.bom.client.Engine.GECKO){qx.event.Registration.fireNonBubblingEvent(parent,"scroll");
}}
if(parent===body){break;
}parent=parent.parentNode;
}},intoViewY:function(element,stop,align){var parent=element.parentNode;
var doc=qx.dom.Node.getDocument(element);
var body=doc.body;
var parentLocation,parentTop,parentBottom;
var parentOuterHeight,parentClientHeight,parentScrollHeight;
var parentTopBorder,parentBottomBorder,parentScrollBarHeight;
var elementLocation,elementTop,elementBottom,elementHeight;
var topOffset,bottomOffset,scrollDiff;
var alignTop=align==="top";
var alignBottom=align==="bottom";
stop=stop?stop.parentNode:doc;
while(parent&&parent!=stop){if(parent.scrollHeight>parent.clientHeight&&(parent===body||qx.bom.element.Overflow.getY(parent)!="visible")){if(parent===body){parentTop=parent.scrollTop;
parentBottom=parentTop+qx.bom.Viewport.getHeight();
parentOuterHeight=qx.bom.Viewport.getHeight();
parentClientHeight=parent.clientHeight;
parentScrollHeight=parent.scrollHeight;
parentTopBorder=0;
parentBottomBorder=0;
parentScrollBarHeight=0;
}else{parentLocation=qx.bom.element.Location.get(parent);
parentTop=parentLocation.top;
parentBottom=parentLocation.bottom;
parentOuterHeight=parent.offsetHeight;
parentClientHeight=parent.clientHeight;
parentScrollHeight=parent.scrollHeight;
parentTopBorder=parseInt(qx.bom.element.Style.get(parent,"borderTopWidth"),10)||0;
parentBottomBorder=parseInt(qx.bom.element.Style.get(parent,"borderBottomWidth"),10)||0;
parentScrollBarHeight=parentOuterHeight-parentClientHeight-parentTopBorder-parentBottomBorder;
}elementLocation=qx.bom.element.Location.get(element);
elementTop=elementLocation.top;
elementBottom=elementLocation.bottom;
elementHeight=element.offsetHeight;
topOffset=elementTop-parentTop-parentTopBorder;
bottomOffset=elementBottom-parentBottom+parentBottomBorder;
scrollDiff=0;
if(alignTop){scrollDiff=topOffset;
}else if(alignBottom){scrollDiff=bottomOffset+parentScrollBarHeight;
}else if(topOffset<0||elementHeight>parentClientHeight){scrollDiff=topOffset;
}else if(bottomOffset>0){scrollDiff=bottomOffset+parentScrollBarHeight;
}parent.scrollTop+=scrollDiff;
if(qx.bom.client.Engine.GECKO){qx.event.Registration.fireNonBubblingEvent(parent,"scroll");
}}
if(parent===body){break;
}parent=parent.parentNode;
}},intoView:function(element,stop,alignX,alignY){this.intoViewX(element,stop,alignX);
this.intoViewY(element,stop,alignY);
}}});
qx.Class.define("qx.bom.element.Overflow",{statics:{__scrollbarSize:null,getScrollbarWidth:function(){if(this.__scrollbarSize!==null){return this.__scrollbarSize;
}var Style=qx.bom.element.Style;
var getStyleSize=function(el,propertyName){return parseInt(Style.get(el,propertyName))||0;
};
var getBorderRight=function(el){return (Style.get(el,"borderRightStyle")=="none"?0:getStyleSize(el,"borderRightWidth"));
};
var getBorderLeft=function(el){return (Style.get(el,"borderLeftStyle")=="none"?0:getStyleSize(el,"borderLeftWidth"));
};
var getInsetRight=qx.core.Variant.select("qx.client",{"mshtml":function(el){if(Style.get(el,"overflowY")=="hidden"||el.clientWidth==0){return getBorderRight(el);
}return Math.max(0,el.offsetWidth-el.clientLeft-el.clientWidth);
},"default":function(el){if(el.clientWidth==0){var ov=Style.get(el,"overflow");
var sbv=(ov=="scroll"||ov=="-moz-scrollbars-vertical"?16:0);
return Math.max(0,getBorderRight(el)+sbv);
}return Math.max(0,(el.offsetWidth-el.clientWidth-getBorderLeft(el)));
}});
var getScrollBarSizeRight=function(el){return getInsetRight(el)-getBorderRight(el);
};
var t=document.createElement("div");
var s=t.style;
s.height=s.width="100px";
s.overflow="scroll";
document.body.appendChild(t);
var c=getScrollBarSizeRight(t);
this.__scrollbarSize=c?c:16;
document.body.removeChild(t);
return this.__scrollbarSize;
},_compile:qx.core.Variant.select("qx.client",{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(prop,value){if(value=="hidden"){value="-moz-scrollbars-none";
}return "overflow:"+value+";";
}:
function(prop,value){return prop+":"+value+";";
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(prop,value){return "overflow:"+value+";";
}:
function(prop,value){return prop+":"+value+";";
},"default":function(prop,value){return prop+":"+value+";";
}}),compileX:function(value){return this._compile("overflow-x",value);
},compileY:function(value){return this._compile("overflow-y",value);
},getX:qx.core.Variant.select("qx.client",{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(element,mode){var overflow=qx.bom.element.Style.get(element,"overflow",mode,false);

if(overflow==="-moz-scrollbars-none"){overflow="hidden";
}return overflow;
}:
function(element,mode){return qx.bom.element.Style.get(element,"overflowX",mode,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(element,mode){return qx.bom.element.Style.get(element,"overflow",mode,false);
}:
function(element,mode){return qx.bom.element.Style.get(element,"overflowX",mode,false);
},"default":function(element,mode){return qx.bom.element.Style.get(element,"overflowX",mode,false);
}}),setX:qx.core.Variant.select("qx.client",{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(element,value){if(value=="hidden"){value="-moz-scrollbars-none";
}element.style.overflow=value;
}:
function(element,value){element.style.overflowX=value;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(element,value){element.style.overflow=value;
}:
function(element,value){element.style.overflowX=value;
},"default":function(element,value){element.style.overflowX=value;
}}),resetX:qx.core.Variant.select("qx.client",{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(element){element.style.overflow="";
}:
function(element){element.style.overflowX="";
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(element,value){element.style.overflow="";
}:
function(element,value){element.style.overflowX="";
},"default":function(element){element.style.overflowX="";
}}),getY:qx.core.Variant.select("qx.client",{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(element,mode){var overflow=qx.bom.element.Style.get(element,"overflow",mode,false);

if(overflow==="-moz-scrollbars-none"){overflow="hidden";
}return overflow;
}:
function(element,mode){return qx.bom.element.Style.get(element,"overflowY",mode,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(element,mode){return qx.bom.element.Style.get(element,"overflow",mode,false);
}:
function(element,mode){return qx.bom.element.Style.get(element,"overflowY",mode,false);
},"default":function(element,mode){return qx.bom.element.Style.get(element,"overflowY",mode,false);
}}),setY:qx.core.Variant.select("qx.client",{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(element,value){if(value==="hidden"){value="-moz-scrollbars-none";
}element.style.overflow=value;
}:
function(element,value){element.style.overflowY=value;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(element,value){element.style.overflow=value;
}:
function(element,value){element.style.overflowY=value;
},"default":function(element,value){element.style.overflowY=value;
}}),resetY:qx.core.Variant.select("qx.client",{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(element){element.style.overflow="";
}:
function(element){element.style.overflowY="";
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(element,value){element.style.overflow="";
}:
function(element,value){element.style.overflowY="";
},"default":function(element){element.style.overflowY="";
}})}});
qx.Class.define("qx.bom.element.Style",{statics:{__hints:{styleNames:{"float":qx.core.Variant.select("qx.client",{"mshtml":"styleFloat","default":"cssFloat"}),"appearance":qx.core.Variant.select("qx.client",{"gecko":"MozAppearance","webkit":"WebkitAppearance","default":"appearance"}),"userSelect":qx.core.Variant.select("qx.client",{"gecko":"MozUserSelect","webkit":"WebkitUserSelect","default":"userSelect"})},cssNames:{"appearance":qx.core.Variant.select("qx.client",{"gecko":"-moz-appearance","webkit":"-webkit-appearance","default":"appearance"}),"userSelect":qx.core.Variant.select("qx.client",{"gecko":"-moz-user-select","webkit":"-webkit-user-select","default":"user-select"}),"textOverflow":qx.core.Variant.select("qx.client",{"opera":"-o-text-overflow","default":"text-overflow"})},mshtmlPixel:{width:"pixelWidth",height:"pixelHeight",left:"pixelLeft",right:"pixelRight",top:"pixelTop",bottom:"pixelBottom"},special:{clip:1,cursor:1,opacity:1,boxSizing:1,overflowX:1,overflowY:1}},__hyphens:{},compile:function(map){var html=[];
var hints=this.__hints;
var special=hints.special;
var names=hints.cssNames;
var hyphens=this.__hyphens;
var str=qx.lang.String;
var name,prop,value;

for(name in map){value=map[name];

if(value==null){continue;
}name=names[name]||name;
if(special[name]){switch(name){case "clip":html.push(qx.bom.element.Clip.compile(value));
break;
case "cursor":html.push(qx.bom.element.Cursor.compile(value));
break;
case "opacity":html.push(qx.bom.element.Opacity.compile(value));
break;
case "boxSizing":html.push(qx.bom.element.BoxSizing.compile(value));
break;
case "overflowX":html.push(qx.bom.element.Overflow.compileX(value));
break;
case "overflowY":html.push(qx.bom.element.Overflow.compileY(value));
break;
}}else{prop=hyphens[name];

if(!prop){prop=hyphens[name]=str.hyphenate(name);
}html.push(prop,":",value,";");
}}return html.join("");
},setCss:qx.core.Variant.select("qx.client",{"mshtml":function(element,value){element.style.cssText=value;
},"default":function(element,value){element.setAttribute("style",value);
}}),getCss:qx.core.Variant.select("qx.client",{"mshtml":function(element){return element.style.cssText.toLowerCase();
},"default":function(element){return element.getAttribute("style");
}}),COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(element,name,value,smart){{qx.core.Assert.assertElement(element,"Invalid argument 'element'");
qx.core.Assert.assertString(name,"Invalid argument 'name'");

if(smart!==undefined){qx.core.Assert.assertBoolean(smart,"Invalid argument 'smart'");
}};
var hints=this.__hints;
name=hints.styleNames[name]||name;
if(smart!==false&&hints.special[name]){switch(name){case "clip":return qx.bom.element.Clip.set(element,value);
case "cursor":return qx.bom.element.Cursor.set(element,value);
case "opacity":return qx.bom.element.Opacity.set(element,value);
case "boxSizing":return qx.bom.element.BoxSizing.set(element,value);
case "overflowX":return qx.bom.element.Overflow.setX(element,value);
case "overflowY":return qx.bom.element.Overflow.setY(element,value);
}}element.style[name]=value!==null?value:"";
},setStyles:function(element,styles,smart){{qx.core.Assert.assertElement(element,"Invalid argument 'element'");
qx.core.Assert.assertMap(styles,"Invalid argument 'styles'");

if(smart!==undefined){qx.core.Assert.assertBoolean(smart,"Invalid argument 'smart'");
}};

for(var name in styles){this.set(element,name,styles[name],smart);
}},reset:function(element,name,smart){var hints=this.__hints;
name=hints.styleNames[name]||name;
if(smart!==false&&hints.special[name]){switch(name){case "clip":return qx.bom.element.Clip.reset(element);
case "cursor":return qx.bom.element.Cursor.reset(element);
case "opacity":return qx.bom.element.Opacity.reset(element);
case "boxSizing":return qx.bom.element.BoxSizing.reset(element);
case "overflowX":return qx.bom.element.Overflow.resetX(element);
case "overflowY":return qx.bom.element.Overflow.resetY(element);
}}element.style[name]="";
},get:qx.core.Variant.select("qx.client",{"mshtml":function(element,name,mode,smart){var hints=this.__hints;
name=hints.styleNames[name]||name;
if(smart!==false&&hints.special[name]){switch(name){case "clip":return qx.bom.element.Clip.get(element,mode);
case "cursor":return qx.bom.element.Cursor.get(element,mode);
case "opacity":return qx.bom.element.Opacity.get(element,mode);
case "boxSizing":return qx.bom.element.BoxSizing.get(element,mode);
case "overflowX":return qx.bom.element.Overflow.getX(element,mode);
case "overflowY":return qx.bom.element.Overflow.getY(element,mode);
}}if(!element.currentStyle){return element.style[name]||"";
}switch(mode){case this.LOCAL_MODE:return element.style[name]||"";
case this.CASCADED_MODE:return element.currentStyle[name]||"";
default:var currentStyle=element.currentStyle[name]||"";
if(/^-?[\.\d]+(px)?$/i.test(currentStyle)){return currentStyle;
}var pixel=hints.mshtmlPixel[name];

if(pixel){var localStyle=element.style[name];
element.style[name]=currentStyle||0;
var value=element.style[pixel]+"px";
element.style[name]=localStyle;
return value;
}if(/^-?[\.\d]+(em|pt|%)?$/i.test(currentStyle)){throw new Error("Untranslated computed property value: "+name+". Only pixel values work well across different clients.");
}return currentStyle;
}},"default":function(element,name,mode,smart){var hints=this.__hints;
name=hints.styleNames[name]||name;
if(smart!==false&&hints.special[name]){switch(name){case "clip":return qx.bom.element.Clip.get(element,mode);
case "cursor":return qx.bom.element.Cursor.get(element,mode);
case "opacity":return qx.bom.element.Opacity.get(element,mode);
case "boxSizing":return qx.bom.element.BoxSizing.get(element,mode);
case "overflowX":return qx.bom.element.Overflow.getX(element,mode);
case "overflowY":return qx.bom.element.Overflow.getY(element,mode);
}}switch(mode){case this.LOCAL_MODE:return element.style[name]||"";
case this.CASCADED_MODE:if(element.currentStyle){return element.currentStyle[name]||"";
}throw new Error("Cascaded styles are not supported in this browser!");
default:var doc=qx.dom.Node.getDocument(element);
var computed=doc.defaultView.getComputedStyle(element,null);
return computed?computed[name]:"";
}}})}});
qx.Class.define("qx.bom.element.Clip",{statics:{compile:function(map){if(!map){return "clip:auto;";
}var left=map.left;
var top=map.top;
var width=map.width;
var height=map.height;
var right,bottom;

if(left==null){right=(width==null?"auto":width+"px");
left="auto";
}else{right=(width==null?"auto":left+width+"px");
left=left+"px";
}
if(top==null){bottom=(height==null?"auto":height+"px");
top="auto";
}else{bottom=(height==null?"auto":top+height+"px");
top=top+"px";
}return "clip:rect("+top+","+right+","+bottom+","+left+");";
},get:function(element,mode){var clip=qx.bom.element.Style.get(element,"clip",mode,false);
var left,top,width,height;
var right,bottom;

if(typeof clip==="string"&&clip!=="auto"&&clip!==""){clip=qx.lang.String.trim(clip);
if(/\((.*)\)/.test(clip)){var split=RegExp.$1.split(",");
top=qx.lang.String.trim(split[0]);
right=qx.lang.String.trim(split[1]);
bottom=qx.lang.String.trim(split[2]);
left=qx.lang.String.trim(split[3]);
if(left==="auto"){left=null;
}
if(top==="auto"){top=null;
}
if(right==="auto"){right=null;
}
if(bottom==="auto"){bottom=null;
}if(top!=null){top=parseInt(top,10);
}
if(right!=null){right=parseInt(right,10);
}
if(bottom!=null){bottom=parseInt(bottom,10);
}
if(left!=null){left=parseInt(left,10);
}if(right!=null&&left!=null){width=right-left;
}else if(right!=null){width=right;
}
if(bottom!=null&&top!=null){height=bottom-top;
}else if(bottom!=null){height=bottom;
}}else{throw new Error("Could not parse clip string: "+clip);
}}return {left:left||null,top:top||null,width:width||null,height:height||null};
},set:function(element,map){if(!map){element.style.clip="rect(auto,auto,auto,auto)";
return;
}var left=map.left;
var top=map.top;
var width=map.width;
var height=map.height;
var right,bottom;

if(left==null){right=(width==null?"auto":width+"px");
left="auto";
}else{right=(width==null?"auto":left+width+"px");
left=left+"px";
}
if(top==null){bottom=(height==null?"auto":height+"px");
top="auto";
}else{bottom=(height==null?"auto":top+height+"px");
top=top+"px";
}element.style.clip="rect("+top+","+right+","+bottom+","+left+")";
},reset:function(element){element.style.clip=qx.bom.client.Engine.MSHTML?"rect(auto)":"auto";
}}});
qx.Class.define("qx.bom.element.Cursor",{statics:{__map:qx.core.Variant.select("qx.client",{"mshtml":{"cursor":"hand","ew-resize":"e-resize","ns-resize":"n-resize","nesw-resize":"ne-resize","nwse-resize":"nw-resize"},"opera":{"col-resize":"e-resize","row-resize":"n-resize","ew-resize":"e-resize","ns-resize":"n-resize","nesw-resize":"ne-resize","nwse-resize":"nw-resize"},"default":{}}),compile:function(cursor){return "cursor:"+(this.__map[cursor]||cursor)+";";
},get:function(element,mode){return qx.bom.element.Style.get(element,"cursor",mode,false);
},set:function(element,value){element.style.cursor=this.__map[value]||value;
},reset:function(element){element.style.cursor="";
}}});
qx.Class.define("qx.bom.element.Opacity",{statics:{compile:qx.core.Variant.select("qx.client",{"mshtml":function(opacity){if(opacity>=1){return "";
}
if(opacity<0.00001){opacity=0;
}return "zoom:1;filter:alpha(opacity="+(opacity*100)+");";
},"gecko":function(opacity){if(opacity==1){opacity=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){return "-moz-opacity:"+opacity+";";
}else{return "opacity:"+opacity+";";
}},"default":function(opacity){if(opacity==1){return "";
}return "opacity:"+opacity+";";
}}),set:qx.core.Variant.select("qx.client",{"mshtml":function(element,opacity){var filter=qx.bom.element.Style.get(element,"filter",qx.bom.element.Style.COMPUTED_MODE,false);
if(opacity>=1){element.style.filter=filter.replace(/alpha\([^\)]*\)/gi,"");
return;
}
if(opacity<0.00001){opacity=0;
}if(!element.currentStyle.hasLayout){element.style.zoom=1;
}element.style.filter=filter.replace(/alpha\([^\)]*\)/gi,"")+"alpha(opacity="+opacity*100+")";
},"gecko":function(element,opacity){if(opacity==1){opacity=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){element.style.MozOpacity=opacity;
}else{element.style.opacity=opacity;
}},"default":function(element,opacity){if(opacity==1){opacity="";
}element.style.opacity=opacity;
}}),reset:qx.core.Variant.select("qx.client",{"mshtml":function(element){var filter=qx.bom.element.Style.get(element,"filter",qx.bom.element.Style.COMPUTED_MODE,false);
element.style.filter=filter.replace(/alpha\([^\)]*\)/gi,"");
},"gecko":function(element){if(qx.bom.client.Engine.VERSION<1.7){element.style.MozOpacity="";
}else{element.style.opacity="";
}},"default":function(element){element.style.opacity="";
}}),get:qx.core.Variant.select("qx.client",{"mshtml":function(element,mode){var filter=qx.bom.element.Style.get(element,"filter",mode,false);

if(filter){var opacity=filter.match(/alpha\(opacity=(.*)\)/);

if(opacity&&opacity[1]){return parseFloat(opacity[1])/100;
}}return 1.0;
},"gecko":function(element,mode){var opacity=qx.bom.element.Style.get(element,qx.bom.client.Engine.VERSION<1.7?"MozOpacity":"opacity",mode,false);

if(opacity==0.999999){opacity=1.0;
}
if(opacity!=null){return parseFloat(opacity);
}return 1.0;
},"default":function(element,mode){var opacity=qx.bom.element.Style.get(element,"opacity",mode,false);

if(opacity!=null){return parseFloat(opacity);
}return 1.0;
}})}});
qx.Class.define("qx.bom.element.BoxSizing",{statics:{__styleProperties:qx.core.Variant.select("qx.client",{"mshtml":null,"webkit":["boxSizing","KhtmlBoxSizing","WebkitBoxSizing"],"gecko":["MozBoxSizing"],"opera":["boxSizing"]}),__cssProperties:qx.core.Variant.select("qx.client",{"mshtml":null,"webkit":["box-sizing","-khtml-box-sizing","-webkit-box-sizing"],"gecko":["-moz-box-sizing"],"opera":["box-sizing"]}),__nativeBorderBox:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__usesNativeBorderBox:function(element){var map=this.__nativeBorderBox;
return map.tags[element.tagName.toLowerCase()]||map.types[element.type];
},compile:qx.core.Variant.select("qx.client",{"mshtml":function(value){{qx.log.Logger.warn(this,"This client do not support the dynamic modification of the box-sizing property.");
qx.log.Logger.trace();
};
},"default":function(value){var props=this.__cssProperties;
var css="";

if(props){for(var i=0,l=props.length;i<l;i++){css+=props[i]+":"+value+";";
}}return css;
}}),get:qx.core.Variant.select("qx.client",{"mshtml":function(element){if(qx.bom.Document.isStandardMode(qx.dom.Node.getDocument(element))){if(!this.__usesNativeBorderBox(element)){return "content-box";
}}return "border-box";
},"default":function(element){var props=this.__styleProperties;
var value;

if(props){for(var i=0,l=props.length;i<l;i++){value=qx.bom.element.Style.get(element,props[i],null,false);

if(value!=null&&value!==""){return value;
}}}return "";
}}),set:qx.core.Variant.select("qx.client",{"mshtml":function(element,value){{qx.log.Logger.warn(this,"This client do not support the dynamic modification of the box-sizing property.");
};
},"default":function(element,value){var props=this.__styleProperties;

if(props){for(var i=0,l=props.length;i<l;i++){element.style[props[i]]=value;
}}}}),reset:function(element){this.set(element,"");
}}});
qx.Class.define("qx.bom.Document",{statics:{isQuirksMode:function(win){return (win||window).document.compatMode!=="CSS1Compat";
},isStandardMode:function(win){return (win||window).document.compatMode==="CSS1Compat";
},getWidth:function(win){var doc=(win||window).document;
var view=qx.bom.Viewport.getWidth(win);
var scroll=doc.compatMode==="CSS1Compat"?doc.documentElement.scrollWidth:doc.body.scrollWidth;
return Math.max(scroll,view);
},getHeight:function(win){var doc=(win||window).document;
var view=qx.bom.Viewport.getHeight(win);
var scroll=doc.compatMode==="CSS1Compat"?doc.documentElement.scrollHeight:doc.body.scrollHeight;
return Math.max(scroll,view);
}}});
qx.Class.define("qx.bom.element.Location",{statics:{__style:function(elem,style){return qx.bom.element.Style.get(elem,style,qx.bom.element.Style.COMPUTED_MODE,false);
},__num:function(elem,style){return parseInt(qx.bom.element.Style.get(elem,style,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;
},__computeScroll:function(elem){var left=0,top=0;
if(elem.getBoundingClientRect){var win=qx.dom.Node.getWindow(elem);
left-=qx.bom.Viewport.getScrollLeft(win);
top-=qx.bom.Viewport.getScrollTop(win);
}else{var body=qx.dom.Node.getDocument(elem).body;
elem=elem.parentNode;
while(elem&&elem!=body){left+=elem.scrollLeft;
top+=elem.scrollTop;
elem=elem.parentNode;
}}return {left:left,top:top};
},__computeBody:qx.core.Variant.select("qx.client",{"mshtml":function(elem){var doc=qx.dom.Node.getDocument(elem);
var body=doc.body;
var left=0;
var top=0;
left-=body.clientLeft+doc.documentElement.clientLeft;
top-=body.clientTop+doc.documentElement.clientTop;

if(qx.bom.client.Feature.STANDARD_MODE){left+=this.__num(body,"borderLeftWidth");
top+=this.__num(body,"borderTopWidth");
}return {left:left,top:top};
},"webkit":function(elem){var doc=qx.dom.Node.getDocument(elem);
var body=doc.body;
var left=body.offsetLeft;
var top=body.offsetTop;
left+=this.__num(body,"borderLeftWidth");
top+=this.__num(body,"borderTopWidth");
if(doc.compatMode==="CSS1Compat"){left+=this.__num(body,"marginLeft");
top+=this.__num(body,"marginTop");
}return {left:left,top:top};
},"gecko":function(elem){var body=qx.dom.Node.getDocument(elem).body;
var left=body.offsetLeft;
var top=body.offsetTop;
if(qx.bom.element.BoxSizing.get(body)!=="border-box"){left+=this.__num(body,"borderLeftWidth");
top+=this.__num(body,"borderTopWidth");
if(!elem.getBoundingClientRect){var hasAbs;

while(elem){if(this.__style(elem,"position")==="absolute"||this.__style(elem,"position")==="fixed"){hasAbs=true;
break;
}elem=elem.offsetParent;
}
if(!hasAbs){left+=this.__num(body,"borderLeftWidth");
top+=this.__num(body,"borderTopWidth");
}}}return {left:left,top:top};
},"default":function(elem){var body=qx.dom.Node.getDocument(elem).body;
var left=body.offsetLeft;
var top=body.offsetTop;
return {left:left,top:top};
}}),__computeOffset:qx.core.Variant.select("qx.client",{"mshtml|webkit":function(elem){var doc=qx.dom.Node.getDocument(elem);
if(elem.getBoundingClientRect){var rect=elem.getBoundingClientRect();
var left=rect.left;
var top=rect.top;
}else{var left=elem.offsetLeft;
var top=elem.offsetTop;
elem=elem.offsetParent;
var body=doc.body;
while(elem&&elem!=body){left+=elem.offsetLeft;
top+=elem.offsetTop;
left+=this.__num(elem,"borderLeftWidth");
top+=this.__num(elem,"borderTopWidth");
elem=elem.offsetParent;
}}return {left:left,top:top};
},"gecko":function(elem){if(elem.getBoundingClientRect){var rect=elem.getBoundingClientRect();
var left=Math.round(rect.left);
var top=Math.round(rect.top);
}else{var left=0;
var top=0;
var body=qx.dom.Node.getDocument(elem).body;
var box=qx.bom.element.BoxSizing;

if(box.get(elem)!=="border-box"){left-=this.__num(elem,"borderLeftWidth");
top-=this.__num(elem,"borderTopWidth");
}
while(elem&&elem!==body){left+=elem.offsetLeft;
top+=elem.offsetTop;
if(box.get(elem)!=="border-box"){left+=this.__num(elem,"borderLeftWidth");
top+=this.__num(elem,"borderTopWidth");
}if(elem.parentNode&&this.__style(elem.parentNode,"overflow")!="visible"){left+=this.__num(elem.parentNode,"borderLeftWidth");
top+=this.__num(elem.parentNode,"borderTopWidth");
}elem=elem.offsetParent;
}}return {left:left,top:top};
},"default":function(elem){var left=0;
var top=0;
var body=qx.dom.Node.getDocument(elem).body;
while(elem&&elem!==body){left+=elem.offsetLeft;
top+=elem.offsetTop;
elem=elem.offsetParent;
}return {left:left,top:top};
}}),get:function(elem,mode){var body=this.__computeBody(elem);

if(elem.tagName=="BODY"){var left=body.left;
var top=body.top;
}else{var offset=this.__computeOffset(elem);
var scroll=this.__computeScroll(elem);
var left=offset.left+body.left-scroll.left;
var top=offset.top+body.top-scroll.top;
}var right=left+elem.offsetWidth;
var bottom=top+elem.offsetHeight;

if(mode){if(mode=="padding"||mode=="scroll"){var overX=qx.bom.element.Overflow.getX(elem);

if(overX=="scroll"||overX=="auto"){right+=elem.scrollWidth-elem.offsetWidth+this.__num(elem,"borderLeftWidth")+this.__num(elem,"borderRightWidth");
}var overY=qx.bom.element.Overflow.getY(elem);

if(overY=="scroll"||overY=="auto"){bottom+=elem.scrollHeight-elem.offsetHeight+this.__num(elem,"borderTopWidth")+this.__num(elem,"borderBottomWidth");
}}
switch(mode){case "padding":left+=this.__num(elem,"paddingLeft");
top+=this.__num(elem,"paddingTop");
right-=this.__num(elem,"paddingRight");
bottom-=this.__num(elem,"paddingBottom");
case "scroll":left-=elem.scrollLeft;
top-=elem.scrollTop;
right-=elem.scrollLeft;
bottom-=elem.scrollTop;
case "border":left+=this.__num(elem,"borderLeftWidth");
top+=this.__num(elem,"borderTopWidth");
right-=this.__num(elem,"borderRightWidth");
bottom-=this.__num(elem,"borderBottomWidth");
break;
case "margin":left-=this.__num(elem,"marginLeft");
top-=this.__num(elem,"marginTop");
right+=this.__num(elem,"marginRight");
bottom+=this.__num(elem,"marginBottom");
break;
}}return {left:left,top:top,right:right,bottom:bottom};
},getLeft:function(elem,mode){return this.get(elem,mode).left;
},getTop:function(elem,mode){return this.get(elem,mode).top;
},getRight:function(elem,mode){return this.get(elem,mode).right;
},getBottom:function(elem,mode){return this.get(elem,mode).bottom;
},getRelative:function(elem1,elem2,mode1,mode2){var loc1=this.get(elem1,mode1);
var loc2=this.get(elem2,mode2);
return {left:loc1.left-loc2.left,top:loc1.top-loc2.top,right:loc1.right-loc2.right,bottom:loc1.bottom-loc2.bottom};
},getPosition:function(elem){return this.getRelative(elem,this.getOffsetParent(elem));
},getOffsetParent:function(element){var offsetParent=element.offsetParent||document.body;
var Style=qx.bom.element.Style;

while(offsetParent&&(!/^body|html$/i.test(offsetParent.tagName)&&Style.get(offsetParent,"position")==="static")){offsetParent=offsetParent.offsetParent;
}return offsetParent;
}}});
qx.Bootstrap.define("qx.bom.client.Feature",{statics:{STANDARD_MODE:false,QUIRKS_MODE:false,CONTENT_BOX:false,BORDER_BOX:false,SVG:false,CANVAS:false,VML:false,XPATH:false,__init:function(){this.STANDARD_MODE=document.compatMode==="CSS1Compat";
this.QUIRKS_MODE=!this.STANDARD_MODE;
this.CONTENT_BOX=!qx.bom.client.Engine.MSHTML||this.STANDARD_MODE;
this.BORDER_BOX=!this.CONTENT_BOX;
this.SVG=document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature("org.w3c.dom.svg","1.0");
this.CANVAS=!!window.CanvasRenderingContext2D;
this.VML=qx.bom.client.Engine.MSHTML;
this.AIR=navigator.userAgent.indexOf("adobeair")!==-1;
this.GEARS=!!(window.google&&window.google.gears);
this.XPATH=!!document.evaluate;
}},defer:function(statics){statics.__init();
}});
qx.Class.define("qx.bom.element.Dimension",{statics:{getWidth:qx.core.Variant.select("qx.client",{"gecko":function(element){if(element.getBoundingClientRect){var rect=element.getBoundingClientRect();
return Math.round(rect.right)-Math.round(rect.left);
}else{return element.offsetWidth;
}},"default":function(element){return element.offsetWidth;
}}),getHeight:qx.core.Variant.select("qx.client",{"gecko":function(element){if(element.getBoundingClientRect){var rect=element.getBoundingClientRect();
return Math.round(rect.bottom)-Math.round(rect.top);
}else{return element.offsetHeight;
}},"default":function(element){return element.offsetHeight;
}}),getSize:function(element){return {width:this.getWidth(element),height:this.getHeight(element)};
},__hiddenScrollbars:{visible:true,hidden:true},getContentWidth:function(element){var Style=qx.bom.element.Style;
var overflowX=qx.bom.element.Overflow.getX(element);
var paddingLeft=parseInt(Style.get(element,"paddingLeft"),10);
var paddingRight=parseInt(Style.get(element,"paddingRight"),10);

if(this.__hiddenScrollbars[overflowX]){return element.clientWidth-paddingLeft-paddingRight;
}else{if(element.clientWidth>=element.scrollWidth){return Math.max(element.clientWidth,element.scrollWidth)-paddingLeft-paddingRight;
}else{var width=element.scrollWidth-paddingLeft;
var Engine=qx.bom.client.Engine;

if(Engine.NAME==="mshtml"&&Engine.VERSION==6){width-=paddingRight;
}return width;
}}},getContentHeight:function(element){var Style=qx.bom.element.Style;
var overflowY=qx.bom.element.Overflow.getY(element);
var paddingTop=parseInt(Style.get(element,"paddingTop"),10);
var paddingBottom=parseInt(Style.get(element,"paddingBottom"),10);

if(this.__hiddenScrollbars[overflowY]){return element.clientHeight-paddingTop-paddingBottom;
}else{if(element.clientHeight>=element.scrollHeight){return Math.max(element.clientHeight,element.scrollHeight)-paddingTop-paddingBottom;
}else{var height=element.scrollHeight-paddingTop;
var Engine=qx.bom.client.Engine;

if(Engine.NAME==="mshtml"&&Engine.VERSION==6){height-=paddingBottom;
}return height;
}}},getContentSize:function(element){return {width:this.getContentWidth(element),height:this.getContentHeight(element)};
},getClientWidth:function(element){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Please use element.clientWidth directly, or see if you can benefit from qx.bom.element.Dimension.getContentWidth()");
return element.clientWidth;
},getClientHeight:function(element){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Please use element.clientHeight directly, or see if you can benefit from qx.bom.element.Dimension.getContentHeight()");
return element.clientHeight;
},getScrollWidth:function(element){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Please use element.scrollWidth directly, or see if you can benefit from qx.bom.element.Dimension.getContentWidth()");
return element.scrollWidth;
},getScrollHeight:function(element){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Please use element.scrollHeight directly, or see if you can benefit from qx.bom.element.Dimension.getContentHeight()");
return element.scrollHeight;
}}});
qx.Class.define("qx.bom.element.Background",{statics:{__tmpl:["background-image:url(",null,");","background-position:",null,";","background-repeat:",null,";"],__emptyStyles:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__computePosition:function(left,top){var Engine=qx.bom.client.Engine;

if(Engine.GECKO&&Engine.VERSION<1.9&&left==top&&typeof left=="number"){top+=0.01;
}
if(left){var leftCss=(typeof left=="number")?left+"px":left;
}else{leftCss="0";
}
if(top){var topCss=(typeof top=="number")?top+"px":top;
}else{topCss="0";
}return leftCss+" "+topCss;
},compile:function(source,repeat,left,top){var position=this.__computePosition(left,top);
var backgroundImageUrl=qx.util.ResourceManager.toUri(source);

if(qx.core.Variant.isSet("qx.client","mshtml")){backgroundImageUrl=this.__checkImageUrl(backgroundImageUrl);
}var tmpl=this.__tmpl;
tmpl[1]=backgroundImageUrl;
tmpl[4]=position;
tmpl[7]=repeat;
return tmpl.join("");
},getStyles:function(source,repeat,left,top){if(!source){return this.__emptyStyles;
}var position=this.__computePosition(left,top);
var backgroundImageUrl=qx.util.ResourceManager.toUri(source);

if(qx.core.Variant.isSet("qx.client","mshtml")){backgroundImageUrl=this.__checkImageUrl(backgroundImageUrl);
}var map={backgroundPosition:position,backgroundImage:"url("+backgroundImageUrl+")"};

if(repeat!=null){map.backgroundRepeat=repeat;
}return map;
},set:function(element,source,repeat,left,top){var styles=this.getStyles(source,repeat,left,top);

for(var prop in styles){element.style[prop]=styles[prop];
}},__checkImageUrl:qx.core.Variant.select("qx.client",{"mshtml":function(url){var urlPrefix="";
if(window.location.protocol==="https:"){if(url.match(/^\/\//)!=null){urlPrefix=window.location.protocol;
}else if(url.match(/^\.\//)!=null){url=url.substring(url.indexOf("/"));
urlPrefix=document.URL.substring(0,document.URL.lastIndexOf("/"));
}else{urlPrefix=window.location.href.substring(0,window.location.href.lastIndexOf("/")+1);
}}return urlPrefix+url;
},"default":function(){}})}});
qx.Bootstrap.define("qx.util.ResourceManager",{statics:{__registry:qx.$$resources||{},has:function(id){return !!this.__registry[id];
},getData:function(id){return this.__registry[id]||null;
},getImageWidth:function(id){var entry=this.__registry[id];
return entry?entry[0]:null;
},getImageHeight:function(id){var entry=this.__registry[id];
return entry?entry[1]:null;
},getImageFormat:function(id){var entry=this.__registry[id];
return entry?entry[2]:null;
},isClippedImage:function(id){var entry=this.__registry[id];
return entry&&entry.length>4;
},toUri:function(id){if(id==null){return id;
}var entry=this.__registry[id];

if(!entry){return id;
}
if(typeof entry==="string"){var lib=entry;
}else{var lib=entry[3];
if(!lib){return id;
}}return window.qxlibraries[lib].resourceUri+"/"+id;
}}});
qx.Class.define("qx.bom.element.Decoration",{statics:{DEBUG:false,__enableAlphaFix:qx.core.Variant.isSet("qx.client","mshtml")&&qx.bom.client.Engine.VERSION<8,__alphaFixRepeats:qx.core.Variant.select("qx.client",{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__repeatToTagname:{"scale-x":"img","scale-y":"img","scale":"img","repeat":"div","no-repeat":"div","repeat-x":"div","repeat-y":"div"},update:function(element,source,repeat,style){var tag=this.getTagName(repeat,source);

if(tag!=element.tagName.toLowerCase()){throw new Error("Image modification not possible because elements could not be replaced at runtime anymore!");
}var ret=this.getAttributes(source,repeat,style);

if(tag==="img"){element.src=ret.src;
}if(element.style.backgroundPosition!=""&&ret.style.backgroundPosition===undefined){ret.style.backgroundPosition=null;
}if(element.style.clip!=""&&ret.style.clip===undefined){ret.style.clip=null;
}var Style=qx.bom.element.Style;
Style.setStyles(element,ret.style);
},create:function(source,repeat,style){var tag=this.getTagName(repeat,source);
var ret=this.getAttributes(source,repeat,style);
var css=qx.bom.element.Style.compile(ret.style);

if(tag==="img"){return '<img src="'+ret.src+'" style="'+css+'"/>';
}else{return '<div style="'+css+'"></div>';
}},getTagName:function(repeat,source){if(qx.core.Variant.isSet("qx.client","mshtml")){if(source&&this.__enableAlphaFix&&this.__alphaFixRepeats[repeat]&&qx.lang.String.endsWith(source,".png")){return "div";
}}return this.__repeatToTagname[repeat];
},getAttributes:function(source,repeat,style){var ResourceManager=qx.util.ResourceManager;
var ImageLoader=qx.io2.ImageLoader;
var Background=qx.bom.element.Background;

if(!style){style={};
}
if(!style.position){style.position="absolute";
}
if(qx.core.Variant.isSet("qx.client","mshtml")){style.fontSize=0;
style.lineHeight=0;
}else if(qx.core.Variant.isSet("qx.client","webkit")){style.WebkitUserDrag="none";
}var width=ResourceManager.getImageWidth(source)||ImageLoader.getWidth(source);
var height=ResourceManager.getImageHeight(source)||ImageLoader.getHeight(source);
var format=ResourceManager.getImageFormat(source)||ImageLoader.getFormat(source);
{if(source!=null&&format==null){qx.log.Logger.warn("ImageLoader: Not recognized format of external image '"+source+"'!");
}};
if(this.__enableAlphaFix&&this.__alphaFixRepeats[repeat]&&format==="png"){if(style.width==null&&width!=null){style.width=width+"px";
}
if(style.height==null&&height!=null){style.height=height+"px";
}
if(repeat=="no-repeat"){style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ResourceManager.toUri(source)+"', sizingMethod='crop')";
}else{style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ResourceManager.toUri(source)+"', sizingMethod='scale')";
}style.backgroundImage=style.backgroundRepeat="";
return {style:style};
}else{if(repeat==="scale"){var uri=ResourceManager.toUri(source);

if(style.width==null&&width!=null){style.width=width+"px";
}
if(style.height==null&&height!=null){style.height=height+"px";
}return {src:uri,style:style};
}var clipped=ResourceManager.isClippedImage(source);

if(repeat==="scale-x"||repeat==="scale-y"){if(clipped){if(repeat==="scale-x"){var data=ResourceManager.getData(source);
var imageHeight=ResourceManager.getImageHeight(data[4]);
var uri=ResourceManager.toUri(data[4]);
style.clip={top:-data[6],height:height};
style.height=imageHeight+"px";
if(style.top!=null){style.top=(parseInt(style.top,10)+data[6])+"px";
}else if(style.bottom!=null){style.bottom=(parseInt(style.bottom,10)+height-imageHeight-data[6])+"px";
}return {src:uri,style:style};
}else{var data=ResourceManager.getData(source);
var imageWidth=ResourceManager.getImageWidth(data[4]);
var uri=ResourceManager.toUri(data[4]);
style.clip={left:-data[5],width:width};
style.width=imageWidth+"px";
if(style.left!=null){style.left=(parseInt(style.left,10)+data[5])+"px";
}else if(style.right!=null){style.right=(parseInt(style.right,10)+width-imageWidth-data[5])+"px";
}return {src:uri,style:style};
}}else{{if(this.DEBUG&&ResourceManager.has(source)&&source.indexOf("qx/icon")==-1){if(!this.__warnings){this.__warnings={};
}
if(!this.__warnings[source]){qx.log.Logger.debug("Potential clipped image candidate: "+source);
this.__warnings[source]=true;
}}};

if(repeat=="scale-x"){style.height=height==null?null:height+"px";
}else if(repeat=="scale-y"){style.width=width==null?null:width+"px";
}var uri=ResourceManager.toUri(source);
return {src:uri,style:style};
}}else{if(clipped&&repeat!=="repeat"){var data=ResourceManager.getData(source);
var bg=Background.getStyles(data[4],repeat,data[5],data[6]);

for(var key in bg){style[key]=bg[key];
}
if(width!=null&&style.width==null&&(repeat=="repeat-y"||repeat==="no-repeat")){style.width=width+"px";
}
if(height!=null&&style.height==null&&(repeat=="repeat-x"||repeat==="no-repeat")){style.height=height+"px";
}return {style:style};
}else{{if(this.DEBUG&&ResourceManager.has(source)&&repeat!=="repeat"&&source.indexOf("qx/icon")==-1){if(!this.__warnings){this.__warnings={};
}
if(!this.__warnings[source]){qx.log.Logger.debug("Potential clipped image candidate: "+source);
this.__warnings[source]=true;
}}};
var bg=Background.getStyles(source,repeat);

for(var key in bg){style[key]=bg[key];
}
if(width!=null&&style.width==null){style.width=width+"px";
}
if(height!=null&&style.height==null){style.height=height+"px";
}if(style.filter){style.filter="";
}return {style:style};
}}}}}});
qx.Bootstrap.define("qx.io2.ImageLoader",{statics:{__data:{},__defaultSize:{width:null,height:null},__knownImageTypesRegExp:/\.(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(source){var entry=this.__data[source];
return !!(entry&&entry.loaded);
},isFailed:function(source){var entry=this.__data[source];
return !!(entry&&entry.failed);
},isLoading:function(source){var entry=this.__data[source];
return !!(entry&&entry.loading);
},getFormat:function(source){if(source!=null&&this.__data[source]){return this.__data[source]||null;
}else{return null;
}},getSize:function(source){return this.__data[source]||this.__defaultSize;
},getWidth:function(source){var entry=this.__data[source];
return entry?entry.width:null;
},getHeight:function(source){var entry=this.__data[source];
return entry?entry.height:null;
},load:function(source,callback,context){var entry=this.__data[source];

if(!entry){entry=this.__data[source]={};
}if(callback&&!context){context=window;
}if(entry.loaded||entry.loading||entry.failed){if(callback){if(entry.loading){entry.callbacks.push(callback,context);
}else{callback.call(context,source,entry);
}}}else{entry.loading=true;
entry.callbacks=[];

if(callback){entry.callbacks.push(callback,context);
}var el=new Image();
var boundCallback=qx.lang.Function.listener(this.__onload,this,el,source);
el.onload=boundCallback;
el.onerror=boundCallback;
el.src=source;
}},__onload:function(event,element,source){var entry=this.__data[source];
if(event.type==="load"){entry.loaded=true;
entry.width=this.__getWidth(element);
entry.height=this.__getHeight(element);
var result=this.__knownImageTypesRegExp.exec(source);

if(result!=null){entry.format=result[1];
}}else{entry.failed=true;
}element.onload=element.onerror=null;
var callbacks=entry.callbacks;
delete entry.loading;
delete entry.callbacks;
for(var i=0,l=callbacks.length;i<l;i+=2){callbacks[i].call(callbacks[i+1],source,entry);
}},__getWidth:qx.core.Variant.select("qx.client",{"gecko":function(element){return element.naturalWidth;
},"default":function(element){return element.width;
}}),__getHeight:qx.core.Variant.select("qx.client",{"gecko":function(element){return element.naturalHeight;
},"default":function(element){return element.height;
}})}});
qx.Class.define("qx.type.BaseArray",{extend:Array,construct:function(length){},members:{toArray:null,valueOf:null,pop:null,push:null,reverse:null,shift:null,sort:null,splice:null,unshift:null,concat:null,join:null,slice:null,toString:null,indexOf:null,lastIndexOf:null,forEach:null,filter:null,map:null,some:null,every:null}});
(function(){function createStackConstructor(stack){if(qx.core.Variant.isSet("qx.client","mshtml")){Stack.prototype={length:0,$$isArray:true};
var args="pop.push.reverse.shift.sort.splice.unshift.join.slice".split(".");

for(var length=args.length;length;){Stack.prototype[args[--length]]=Array.prototype[args[length]];
}}var slice=Array.prototype.slice;
Stack.prototype.concat=function(){var constructor=this.slice(0);

for(var i=0,length=arguments.length;i<length;i++){var copy;

if(arguments[i] instanceof Stack){copy=slice.call(arguments[i],0);
}else if(arguments[i] instanceof Array){copy=arguments[i];
}else{copy=[arguments[i]];
}constructor.push.apply(constructor,copy);
}return constructor;
};
Stack.prototype.toString=function(){return slice.call(this,0).toString();
};
Stack.prototype.toLocaleString=function(){return slice.call(this,0).toLocaleString();
};
Stack.prototype.constructor=Stack;
var filter=Array.prototype.filter;
var map=Array.prototype.map;
if(!Array.prototype.indexOf){Stack.prototype.indexOf=function(searchElement,fromIndex){if(fromIndex==null){fromIndex=0;
}else if(fromIndex<0){fromIndex=Math.max(0,this.length+fromIndex);
}
for(var i=fromIndex;i<this.length;i++){if(this[i]===searchElement){return i;
}}return -1;
};
}
if(!Array.prototype.lastIndexOf){Stack.prototype.lastIndexOf=function(searchElement,fromIndex){if(fromIndex==null){fromIndex=this.length-1;
}else if(fromIndex<0){fromIndex=Math.max(0,this.length+fromIndex);
}
for(var i=fromIndex;i>=0;i--){if(this[i]===searchElement){return i;
}}return -1;
};
}
if(!Array.prototype.forEach){Stack.prototype.forEach=function(callback,obj){var l=this.length;

for(var i=0;i<l;i++){callback.call(obj,this[i],i,this);
}};
}
if(!filter){filter=function(callback,obj){var l=this.length;
var res=[];

for(var i=0;i<l;i++){if(callback.call(obj,this[i],i,this)){res.push(this[i]);
}}return res;
};
}
if(!map){map=function(callback,obj){var l=this.length;
var res=[];

for(var i=0;i<l;i++){res.push(callback.call(obj,this[i],i,this));
}return res;
};
}
if(!Array.prototype.some){Stack.prototype.some=function(callback,obj){var l=this.length;

for(var i=0;i<l;i++){if(callback.call(obj,this[i],i,this)){return true;
}}return false;
};
}
if(!Array.prototype.every){Stack.prototype.every=function(callback,obj){var l=this.length;

for(var i=0;i<l;i++){if(!callback.call(obj,this[i],i,this)){return false;
}}return true;
};
}Stack.prototype.filter=function(){var ret=new this.constructor;
ret.push.apply(ret,filter.apply(this,arguments));
return ret;
};
Stack.prototype.map=function(){var ret=new this.constructor;
ret.push.apply(ret,map.apply(this,arguments));
return ret;
};
Stack.prototype.slice=function(){var ret=new this.constructor;
ret.push.apply(ret,Array.prototype.slice.apply(this,arguments));
return ret;
};
Stack.prototype.splice=function(){var ret=new this.constructor;
ret.push.apply(ret,Array.prototype.splice.apply(this,arguments));
return ret;
};
Stack.prototype.toArray=function(){return Array.prototype.slice.call(this,0);
};
Stack.prototype.valueOf=function(){return this.length;
};
return Stack;
}function Stack(length){if(arguments.length===1&&typeof length==="number"){this.length=-1<length&&length===length>>.5?length:this.push(length);
}else if(arguments.length){this.push.apply(this,arguments);
}}function PseudoArray(){}PseudoArray.prototype=[];
Stack.prototype=new PseudoArray;
Stack.prototype.length=0;
qx.type.BaseArray=createStackConstructor(Stack);
})();
qx.Class.define("qx.event.handler.Input",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){this.base(arguments);
this._onChangeCheckedWrapper=qx.lang.Function.listener(this._onChangeChecked,this);
this._onChangeValueWrapper=qx.lang.Function.listener(this._onChangeValue,this);
this._onInputWrapper=qx.lang.Function.listener(this._onInput,this);
this._onPropertyWrapper=qx.lang.Function.listener(this._onProperty,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{input:1,change:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(target,type){var lower=target.tagName.toLowerCase();

if(type==="input"&&(lower==="input"||lower==="textarea")){return true;
}
if(type==="change"&&(lower==="input"||lower==="textarea"||lower==="select")){return true;
}return false;
},registerEvent:qx.core.Variant.select("qx.client",{"mshtml":function(target,type,capture){if(!target.__inputHandlerAttached){var tag=target.tagName.toLowerCase();
var elementType=target.type;

if(elementType==="text"||tag==="textarea"||elementType==="checkbox"||elementType==="radio"){qx.bom.Event.addNativeListener(target,"propertychange",this._onPropertyWrapper);
}
if(elementType!=="checkbox"&&elementType!=="radio"){qx.bom.Event.addNativeListener(target,"change",this._onChangeValueWrapper);
}this.__changeEventOnEnterFix(target,elementType);
target.__inputHandlerAttached=true;
}},"default":function(target,type,capture){if(type==="input"){qx.bom.Event.addNativeListener(target,"input",this._onInputWrapper);
}else if(type==="change"){if(target.type==="radio"||target.type==="checkbox"){qx.bom.Event.addNativeListener(target,"change",this._onChangeCheckedWrapper);
}else{qx.bom.Event.addNativeListener(target,"change",this._onChangeValueWrapper);
}this.__changeEventOnEnterFix(target,target.type);
}}}),unregisterEvent:qx.core.Variant.select("qx.client",{"mshtml":function(target,type){if(target.__inputHandlerAttached){var tag=target.tagName.toLowerCase();
var elementType=target.type;

if(elementType==="text"||tag==="textarea"||elementType==="checkbox"||elementType==="radio"){qx.bom.Event.removeNativeListener(target,"propertychange",this._onPropertyWrapper);
}
if(elementType!=="checkbox"&&elementType!=="radio"){qx.bom.Event.removeNativeListener(target,"change",this._onChangeValueWrapper);
}
try{delete target.__inputHandlerAttached;
}catch(ex){target.__inputHandlerAttached=null;
}}},"default":function(target,type){if(type==="input"){qx.bom.Event.removeNativeListener(target,"input",this._onInputWrapper);
}else if(type==="change"){if(target.type==="radio"||target.type==="checkbox"){qx.bom.Event.removeNativeListener(target,"change",this._onChangeCheckedWrapper);
}else{qx.bom.Event.removeNativeListener(target,"change",this._onChangeValueWrapper);
}}}}),__changeEventOnEnterFix:qx.core.Variant.select("qx.client",{"mshtml|opera":function(target,elementType){if(elementType==="text"){qx.event.Registration.addListener(target,"keypress",function(e){if(e.getKeyIdentifier()==="Enter"){qx.event.Registration.fireEvent(target,"change",qx.event.type.Data,[target.value]);
}});
}},"default":function(target,elementType){}}),_onInput:function(e){var target=e.target;
qx.event.Registration.fireEvent(target,"input",qx.event.type.Data,[target.value]);
},_onChangeValue:function(e){var target=e.target||e.srcElement;
var data=target.value;

if(target.type==="select-multiple"){var data=[];

for(var i=0,o=target.options,l=o.length;i<l;i++){if(o[i].selected){data.push(o[i].value);
}}}qx.event.Registration.fireEvent(target,"change",qx.event.type.Data,[data]);
},_onChangeChecked:function(e){var target=e.target;

if(target.type==="radio"){if(target.checked){qx.event.Registration.fireEvent(target,"change",qx.event.type.Data,[target.value]);
}}else{qx.event.Registration.fireEvent(target,"change",qx.event.type.Data,[target.checked]);
}},_onProperty:qx.core.Variant.select("qx.client",{"mshtml":function(e){var target=e.target||e.srcElement;
var prop=e.propertyName;

if(prop==="value"&&(target.type==="text"||target.tagName.toLowerCase()==="textarea")){if(!target.__inValueSet){qx.event.Registration.fireEvent(target,"input",qx.event.type.Data,[target.value]);
}}else if(prop==="checked"){if(target.type==="checkbox"){qx.event.Registration.fireEvent(target,"change",qx.event.type.Data,[target.checked]);
}else if(target.checked){qx.event.Registration.fireEvent(target,"change",qx.event.type.Data,[target.value]);
}}},"default":function(){}})},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Class.define("qx.bom.Input",{statics:{__types:{text:1,textarea:1,select:1,checkbox:1,radio:1,password:1,hidden:1,submit:1,image:1,file:1,search:1,reset:1,button:1},create:function(type,attributes,win){{qx.core.Assert.assertKeyInMap(type,this.__types,"Unsupported input type.");
};
var attributes=attributes?qx.lang.Object.clone(attributes):{};
var tag;

if(type==="textarea"||type==="select"){tag=type;
}else{tag="input";
attributes.type=type;
}return qx.bom.Element.create(tag,attributes,win);
},setValue:function(element,value){var tag=element.nodeName.toLowerCase();
var type=element.type;
var Array=qx.lang.Array;

if(typeof value==="number"){value+="";
}
if((type==="checkbox"||type==="radio")){if(Array.isArray(value)){element.checked=Array.contains(value,element.value);
}else{element.checked=element.value==value;
}}else if(tag==="select"){var isArray=Array.isArray(value);
var options=element.options;
var subel,subval;

for(var i=0,l=options.length;i<l;i++){subel=options[i];
subval=subel.getAttribute("value");

if(subval==null){subval=subel.text;
}subel.selected=isArray?Array.contains(value,subval):value==subval;
}
if(isArray&&value.length==0){element.selectedIndex=-1;
}}else if(type==="text"&&qx.core.Variant.isSet("qx.client","mshtml")){element.__inValueSet=true;
element.value=value;
element.__inValueSet=null;
}else{element.value=value;
}},getValue:function(element){var tag=element.nodeName.toLowerCase();

if(tag==="option"){return (element.attributes.value||{}).specified?element.value:element.text;
}
if(tag==="select"){var index=element.selectedIndex;
if(index<0){return null;
}var values=[];
var options=element.options;
var one=element.type=="select-one";
var clazz=qx.bom.Input;
var value;
for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];

if(option.selected){value=clazz.getValue(option);
if(one){return value;
}values.push(value);
}}return values;
}else{return (element.value||"").replace(/\r/g,"");
}},setWrap:qx.core.Variant.select("qx.client",{"mshtml":function(element,wrap){element.wrap=wrap?"soft":"off";
},"gecko":function(element,wrap){var wrapValue=wrap?"soft":"off";
var styleValue=wrap?"":"auto";
element.setAttribute("wrap",wrapValue);
element.style.overflow=styleValue;
},"default":function(element,wrap){element.style.whiteSpace=wrap?"normal":"nowrap";
}})}});
qx.Bootstrap.define("qx.bom.Selector",{statics:{query:null,matches:null}});
(function(){var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,done=0,toString=Object.prototype.toString;
var Sizzle=function(selector,context,results,seed){results=results||[];
context=context||document;

if(context.nodeType!==1&&context.nodeType!==9)return [];

if(!selector||typeof selector!=="string"){return results;
}var parts=[],m,set,checkSet,check,mode,extra,prune=true;
chunker.lastIndex=0;

while((m=chunker.exec(selector))!==null){parts.push(m[1]);

if(m[2]){extra=RegExp.rightContext;
break;
}}
if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context);
}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);

while(parts.length){selector=parts.shift();

if(Expr.relative[selector])selector+=parts.shift();
set=posProcess(selector,set);
}}}else{var ret=seed?
{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length===1&&context.parentNode?context.parentNode:context,isXML(context));
set=Sizzle.filter(ret.expr,ret.set);

if(parts.length>0){checkSet=makeArray(set);
}else{prune=false;
}
while(parts.length){var cur=parts.pop(),pop=cur;

if(!Expr.relative[cur]){cur="";
}else{pop=parts.pop();
}
if(pop==null){pop=context;
}Expr.relative[cur](checkSet,pop,isXML(context));
}}
if(!checkSet){checkSet=set;
}
if(!checkSet){throw "Syntax error, unrecognized expression: "+(cur||selector);
}
if(toString.call(checkSet)==="[object Array]"){if(!prune){results.push.apply(results,checkSet);
}else if(context.nodeType===1){for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&contains(context,checkSet[i]))){results.push(set[i]);
}}}else{for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i]);
}}}}else{makeArray(checkSet,results);
}
if(extra){Sizzle(extra,context,results,seed);

if(sortOrder){hasDuplicate=false;
results.sort(sortOrder);

if(hasDuplicate){for(var i=1;i<results.length;i++){if(results[i]===results[i-1]){results.splice(i--,1);
}}}}}return results;
};
Sizzle.matches=function(expr,set){return Sizzle(expr,null,null,set);
};
Sizzle.find=function(expr,context,isXML){var set,match;

if(!expr){return [];
}
for(var i=0,l=Expr.order.length;i<l;i++){var type=Expr.order[i],match;

if((match=Expr.match[type].exec(expr))){var left=RegExp.leftContext;

if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(/\\/g,"");
set=Expr.find[type](match,context,isXML);

if(set!=null){expr=expr.replace(Expr.match[type],"");
break;
}}}}
if(!set){set=context.getElementsByTagName("*");
}return {set:set,expr:expr};
};
Sizzle.filter=function(expr,set,inplace,not){var old=expr,result=[],curLoop=set,match,anyFound,isXMLFilter=set&&set[0]&&isXML(set[0]);

while(expr&&set.length){for(var type in Expr.filter){if((match=Expr.match[type].exec(expr))!=null){var filter=Expr.filter[type],found,item;
anyFound=false;

if(curLoop==result){result=[];
}
if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);

if(!match){anyFound=found=true;
}else if(match===true){continue;
}}
if(match){for(var i=0;(item=curLoop[i])!=null;i++){if(item){found=filter(item,match,i,curLoop);
var pass=not^!!found;

if(inplace&&found!=null){if(pass){anyFound=true;
}else{curLoop[i]=false;
}}else if(pass){result.push(item);
anyFound=true;
}}}}
if(found!==undefined){if(!inplace){curLoop=result;
}expr=expr.replace(Expr.match[type],"");

if(!anyFound){return [];
}break;
}}}if(expr==old){if(anyFound==null){throw "Syntax error, unrecognized expression: "+expr;
}else{break;
}}old=expr;
}return curLoop;
};
var Expr=Sizzle.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(elem){return elem.getAttribute("href");
}},relative:{"+":function(checkSet,part,isXML){var isPartStr=typeof part==="string",isTag=isPartStr&&!/\W/.test(part),isPartStrNotTag=isPartStr&&!isTag;

if(isTag&&!isXML){part=part.toUpperCase();
}
for(var i=0,l=checkSet.length,elem;i<l;i++){if((elem=checkSet[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}checkSet[i]=isPartStrNotTag||elem&&elem.nodeName===part?elem||false:elem===part;
}}
if(isPartStrNotTag){Sizzle.filter(part,checkSet,true);
}},">":function(checkSet,part,isXML){var isPartStr=typeof part==="string";

if(isPartStr&&!/\W/.test(part)){part=isXML?part:part.toUpperCase();

for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];

if(elem){var parent=elem.parentNode;
checkSet[i]=parent.nodeName===part?parent:false;
}}}else{for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];

if(elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode===part;
}}
if(isPartStr){Sizzle.filter(part,checkSet,true);
}}},"":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;

if(!part.match(/\W/)){var nodeCheck=part=isXML?part:part.toUpperCase();
checkFn=dirNodeCheck;
}checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML);
},"~":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;

if(typeof part==="string"&&!part.match(/\W/)){var nodeCheck=part=isXML?part:part.toUpperCase();
checkFn=dirNodeCheck;
}checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML);
}},find:{ID:function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);
return m?[m]:[];
}},NAME:function(match,context,isXML){if(typeof context.getElementsByName!=="undefined"){var ret=[],results=context.getElementsByName(match[1]);

for(var i=0,l=results.length;i<l;i++){if(results[i].getAttribute("name")===match[1]){ret.push(results[i]);
}}return ret.length===0?null:ret;
}},TAG:function(match,context){return context.getElementsByTagName(match[1]);
}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(/\\/g,"")+" ";

if(isXML){return match;
}
for(var i=0,elem;(elem=curLoop[i])!=null;i++){if(elem){if(not^(elem.className&&(" "+elem.className+" ").indexOf(match)>=0)){if(!inplace)result.push(elem);
}else if(inplace){curLoop[i]=false;
}}}return false;
},ID:function(match){return match[1].replace(/\\/g,"");
},TAG:function(match,curLoop){for(var i=0;curLoop[i]===false;i++){}return curLoop[i]&&isXML(curLoop[i])?match[1]:match[1].toUpperCase();
},CHILD:function(match){if(match[1]=="nth"){var test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2]=="even"&&"2n"||match[2]=="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);
match[2]=(test[1]+(test[2]||1))-0;
match[3]=test[3]-0;
}match[0]=done++;
return match;
},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1].replace(/\\/g,"");

if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name];
}
if(match[2]==="~="){match[4]=" "+match[4]+" ";
}return match;
},PSEUDO:function(match,curLoop,inplace,result,not){if(match[1]==="not"){if(match[3].match(chunker).length>1||/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop);
}else{var ret=Sizzle.filter(match[3],curLoop,inplace,true^not);

if(!inplace){result.push.apply(result,ret);
}return false;
}}else if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true;
}return match;
},POS:function(match){match.unshift(true);
return match;
}},filters:{enabled:function(elem){return elem.disabled===false&&elem.type!=="hidden";
},disabled:function(elem){return elem.disabled===true;
},checked:function(elem){return elem.checked===true;
},selected:function(elem){elem.parentNode.selectedIndex;
return elem.selected===true;
},parent:function(elem){return !!elem.firstChild;
},empty:function(elem){return !elem.firstChild;
},has:function(elem,i,match){return !!Sizzle(match[3],elem).length;
},header:function(elem){return /h\d/i.test(elem.nodeName);
},text:function(elem){return "text"===elem.type;
},radio:function(elem){return "radio"===elem.type;
},checkbox:function(elem){return "checkbox"===elem.type;
},file:function(elem){return "file"===elem.type;
},password:function(elem){return "password"===elem.type;
},submit:function(elem){return "submit"===elem.type;
},image:function(elem){return "image"===elem.type;
},reset:function(elem){return "reset"===elem.type;
},button:function(elem){return "button"===elem.type||elem.nodeName.toUpperCase()==="BUTTON";
},input:function(elem){return /input|select|textarea|button/i.test(elem.nodeName);
}},setFilters:{first:function(elem,i){return i===0;
},last:function(elem,i,match,array){return i===array.length-1;
},even:function(elem,i){return i%2===0;
},odd:function(elem,i){return i%2===1;
},lt:function(elem,i,match){return i<match[3]-0;
},gt:function(elem,i,match){return i>match[3]-0;
},nth:function(elem,i,match){return match[3]-0==i;
},eq:function(elem,i,match){return match[3]-0==i;
}},filter:{PSEUDO:function(elem,match,i,array){var name=match[1],filter=Expr.filters[name];

if(filter){return filter(elem,i,match,array);
}else if(name==="contains"){return (elem.textContent||elem.innerText||"").indexOf(match[3])>=0;
}else if(name==="not"){var not=match[3];

for(var i=0,l=not.length;i<l;i++){if(not[i]===elem){return false;
}}return true;
}},CHILD:function(elem,match){var type=match[1],node=elem;

switch(type){case 'only':case 'first':while(node=node.previousSibling){if(node.nodeType===1)return false;
}
if(type=='first')return true;
node=elem;
case 'last':while(node=node.nextSibling){if(node.nodeType===1)return false;
}return true;
case 'nth':var first=match[2],last=match[3];

if(first==1&&last==0){return true;
}var doneName=match[0],parent=elem.parentNode;

if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){var count=0;

for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count;
}}parent.sizcache=doneName;
}var diff=elem.nodeIndex-last;

if(first==0){return diff==0;
}else{return (diff%first==0&&diff/first>=0);
}}},ID:function(elem,match){return elem.nodeType===1&&elem.getAttribute("id")===match;
},TAG:function(elem,match){return (match==="*"&&elem.nodeType===1)||elem.nodeName===match;
},CLASS:function(elem,match){return (" "+(elem.className||elem.getAttribute("class"))+" ").indexOf(match)>-1;
},ATTR:function(elem,match){var name=match[1],result=Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];
return result==null?type==="!=":type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!=check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false;
},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];

if(filter){return filter(elem,i,match,array);
}}}};
var origPOS=Expr.match.POS;

for(var type in Expr.match){Expr.match[type]=RegExp(Expr.match[type].source+/(?![^\[]*\])(?![^\(]*\))/.source);
}var makeArray=function(array,results){array=Array.prototype.slice.call(array);

if(results){results.push.apply(results,array);
return results;
}return array;
};
try{Array.prototype.slice.call(document.documentElement.childNodes);
}catch(e){makeArray=function(array,results){var ret=results||[];

if(toString.call(array)==="[object Array]"){Array.prototype.push.apply(ret,array);
}else{if(typeof array.length==="number"){for(var i=0,l=array.length;i<l;i++){ret.push(array[i]);
}}else{for(var i=0;array[i];i++){ret.push(array[i]);
}}}return ret;
};
}var sortOrder;

if(document.documentElement.compareDocumentPosition){sortOrder=function(a,b){var ret=a.compareDocumentPosition(b)&4?-1:a===b?0:1;

if(ret===0){hasDuplicate=true;
}return ret;
};
}else if("sourceIndex" in document.documentElement){sortOrder=function(a,b){var ret=a.sourceIndex-b.sourceIndex;

if(ret===0){hasDuplicate=true;
}return ret;
};
}else if(document.createRange){sortOrder=function(a,b){var aRange=a.ownerDocument.createRange(),bRange=b.ownerDocument.createRange();
aRange.selectNode(a);
aRange.collapse(true);
bRange.selectNode(b);
bRange.collapse(true);
var ret=aRange.compareBoundaryPoints(Range.START_TO_END,bRange);

if(ret===0){hasDuplicate=true;
}return ret;
};
}(function(){var form=document.createElement("form"),id="script"+(new Date).getTime();
form.innerHTML="<input name='"+id+"'/>";
var root=document.documentElement;
root.insertBefore(form,root.firstChild);
if(!!document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);
return m?m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[];
}};
Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");
return elem.nodeType===1&&node&&node.nodeValue===match;
};
}root.removeChild(form);
})();
(function(){var div=document.createElement("div");
div.appendChild(document.createComment(""));
if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);
if(match[1]==="*"){var tmp=[];

for(var i=0;results[i];i++){if(results[i].nodeType===1){tmp.push(results[i]);
}}results=tmp;
}return results;
};
}div.innerHTML="<a href='#'></a>";

if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return elem.getAttribute("href",2);
};
}})();

if(document.querySelectorAll)(function(){var oldSizzle=Sizzle,div=document.createElement("div");
div.innerHTML="<p class='TEST'></p>";
if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return;
}Sizzle=function(query,context,extra,seed){context=context||document;
if(!seed&&context.nodeType===9&&!isXML(context)){try{return makeArray(context.querySelectorAll(query),extra);
}catch(e){}}return oldSizzle(query,context,extra,seed);
};
Sizzle.find=oldSizzle.find;
Sizzle.filter=oldSizzle.filter;
Sizzle.selectors=oldSizzle.selectors;
Sizzle.matches=oldSizzle.matches;
})();

if(document.getElementsByClassName&&document.documentElement.getElementsByClassName)(function(){var div=document.createElement("div");
div.innerHTML="<div class='test e'></div><div class='test'></div>";
if(div.getElementsByClassName("e").length===0)return;
div.lastChild.className="e";

if(div.getElementsByClassName("e").length===1)return;
Expr.order.splice(1,0,"CLASS");
Expr.find.CLASS=function(match,context,isXML){if(typeof context.getElementsByClassName!=="undefined"&&!isXML){return context.getElementsByClassName(match[1]);
}};
})();
function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var sibDir=dir=="previousSibling"&&!isXML;

for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];

if(elem){if(sibDir&&elem.nodeType===1){elem.sizcache=doneName;
elem.sizset=i;
}elem=elem[dir];
var match=false;

while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];
break;
}
if(elem.nodeType===1&&!isXML){elem.sizcache=doneName;
elem.sizset=i;
}
if(elem.nodeName===cur){match=elem;
break;
}elem=elem[dir];
}checkSet[i]=match;
}}}function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var sibDir=dir=="previousSibling"&&!isXML;

for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];

if(elem){if(sibDir&&elem.nodeType===1){elem.sizcache=doneName;
elem.sizset=i;
}elem=elem[dir];
var match=false;

while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];
break;
}
if(elem.nodeType===1){if(!isXML){elem.sizcache=doneName;
elem.sizset=i;
}
if(typeof cur!=="string"){if(elem===cur){match=true;
break;
}}else if(Sizzle.filter(cur,[elem]).length>0){match=elem;
break;
}}elem=elem[dir];
}checkSet[i]=match;
}}}var contains=document.compareDocumentPosition?
function(a,b){return a.compareDocumentPosition(b)&16;
}:
function(a,b){return a!==b&&(a.contains?a.contains(b):true);
};
var isXML=function(elem){return elem.nodeType===9&&elem.documentElement.nodeName!=="HTML"||!!elem.ownerDocument&&isXML(elem.ownerDocument);
};
var posProcess=function(selector,context){var tmpSet=[],later="",match,root=context.nodeType?[context]:context;
while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];
selector=selector.replace(Expr.match.PSEUDO,"");
}selector=Expr.relative[selector]?selector+"*":selector;

for(var i=0,l=root.length;i<l;i++){Sizzle(selector,root[i],tmpSet);
}return Sizzle.filter(later,tmpSet);
};
var Selector=qx.bom.Selector;
Selector.query=function(selector,context){return Sizzle(selector,context);
};
Selector.matches=function(selector,set){return Sizzle(selector,null,null,set);
};
})();
(function(){var setter=function(clazz,method){return function(arg1,arg2,arg3,arg4,arg5,arg6){var length=this.length;

if(length>0){var ptn=clazz[method];

for(var i=0;i<length;i++){if(this[i].nodeType===1){ptn.call(clazz,this[i],arg1,arg2,arg3,arg4,arg5,arg6);
}}}return this;
};
};
var getter=function(clazz,method){return function(arg1,arg2,arg3,arg4,arg5,arg6){if(this.length>0){var ret=this[0].nodeType===1?clazz[method](this[0],arg1,arg2,arg3,arg4,arg5,arg6):null;

if(ret&&ret.nodeType){return this.__pushStack([ret]);
}else{return ret;
}}return null;
};
};
qx.Class.define("qx.bom.Collection",{extend:qx.type.BaseArray,statics:{query:function(selector,context){var arr=qx.bom.Selector.query(selector,context);
return qx.lang.Array.cast(arr,qx.bom.Collection);
},id:function(id){var elem=document.getElementById(id);
if(elem&&elem.id!=id){return qx.bom.Collection.query("#"+id);
}return new qx.bom.Collection(elem);
},html:function(html,context){var arr=qx.bom.Html.clean([html],context);
return qx.lang.Array.cast(arr,qx.bom.Collection);
},__expr:/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,create:function(input,context){var Collection=qx.bom.Collection;
if(input.nodeType){return new Collection(input);
}else if(typeof input==="string"){var match=Collection.__expr.exec(input);

if(match){return match[1]?Collection.html(match[1],context):Collection.id(match[3].substring(1));
}else{return Collection.query(input,context);
}}else{return qx.lang.Array.cast(input,qx.bom.Collection);
}}},members:{setAttribute:setter(qx.bom.element.Attribute,"set"),resetAttribute:setter(qx.bom.element.Attribute,"reset"),getAttribute:getter(qx.bom.element.Attribute,"get"),focus:setter(qx.bom.Element,"focus"),addClass:setter(qx.bom.element.Class,"add"),getClass:getter(qx.bom.element.Class,"get"),hasClass:getter(qx.bom.element.Class,"has"),removeClass:setter(qx.bom.element.Class,"remove"),replaceClass:setter(qx.bom.element.Class,"replace"),toggleClass:setter(qx.bom.element.Class,"toggle"),setValue:setter(qx.bom.Input,"setValue"),getValue:getter(qx.bom.Input,"getValue"),setStyle:setter(qx.bom.element.Style,"set"),setStyles:setter(qx.bom.element.Style,"setStyles"),resetStyle:setter(qx.bom.element.Style,"reset"),getStyle:getter(qx.bom.element.Style,"get"),setCss:setter(qx.bom.element.Style,"setCss"),getCss:setter(qx.bom.element.Style,"getCss"),getOffset:getter(qx.bom.element.Location,"get"),getPosition:getter(qx.bom.element.Location,"getPosition"),getOffsetParent:getter(qx.bom.element.Location,"getOffsetParent"),setScrollLeft:function(value){var Node=qx.dom.Node;

for(var i=0,l=this.length,obj;i<l;i++){obj=this[i];

if(Node.isElement(obj)){obj.scrollLeft=value;
}else if(Node.isWindow(obj)){obj.scrollTo(value,this.getScrollTop(obj));
}else if(Node.isDocument(obj)){Node.getWindow(obj).scrollTo(value,this.getScrollTop(obj));
}}return this;
},setScrollTop:function(value){var Node=qx.dom.Node;

for(var i=0,l=this.length,obj;i<l;i++){obj=this[i];

if(Node.isElement(obj)){obj.scrollTop=value;
}else if(Node.isWindow(obj)){obj.scrollTo(this.getScrollLeft(obj),value);
}else if(Node.isDocument(obj)){Node.getWindow(obj).scrollTo(this.getScrollLeft(obj),value);
}}return this;
},getScrollLeft:function(){var obj=this[0];

if(!obj){return null;
}var Node=qx.dom.Node;

if(Node.isWindow(obj)||Node.isDocument(obj)){return qx.bom.Viewport.getScrollLeft();
}return obj.scrollLeft;
},getScrollTop:function(){var obj=this[0];

if(!obj){return null;
}var Node=qx.dom.Node;

if(Node.isWindow(obj)||Node.isDocument(obj)){return qx.bom.Viewport.getScrollTop();
}return obj.scrollTop;
},getWidth:function(){var obj=this[0];
var Node=qx.dom.Node;

if(obj){if(Node.isElement(obj)){return qx.bom.element.Dimension.getWidth(obj);
}else if(Node.isDocument(obj)){return qx.bom.Document.getWidth(Node.getWindow(obj));
}else if(Node.isWindow(obj)){return qx.bom.Viewport.getWidth(obj);
}}return null;
},getContentWidth:function(){var obj=this[0];

if(qx.dom.Node.isElement(obj)){return qx.bom.element.Dimension.getContentWidth(obj);
}return null;
},getHeight:function(){var obj=this[0];
var Node=qx.dom.Node;

if(obj){if(Node.isElement(obj)){return qx.bom.element.Dimension.getHeight(obj);
}else if(Node.isDocument(obj)){return qx.bom.Document.getHeight(Node.getWindow(obj));
}else if(Node.isWindow(obj)){return qx.bom.Viewport.getHeight(obj);
}}return null;
},getContentHeight:function(){var obj=this[0];

if(qx.dom.Node.isElement(obj)){return qx.bom.element.Dimension.getContentHeight(obj);
}return null;
},addListener:setter(qx.bom.Element,"addListener"),removeListener:setter(qx.bom.Element,"removeListener"),eq:function(index){return this.slice(index,+index+1);
},filter:function(selector,context){var res;

if(qx.lang.Function.isFunction(selector)){res=qx.type.BaseArray.prototype.filter.call(this,selector,context);
}else{res=qx.bom.Selector.matches(selector,this);
}return this.__pushStack(res);
},is:function(selector){return !!selector&&qx.bom.Selector.matches(selector,this).length>0;
},__simple:/^.[^:#\[\.,]*$/,not:function(selector){if(this.__simple.test(selector)){var res=qx.bom.Selector.matches(":not("+selector+")",this);
return this.__pushStack(res);
}var res=qx.bom.Selector.matches(selector,this);
return this.filter(function(value){return res.indexOf(value)===-1;
});
},add:function(selector,context){var res=qx.bom.Selector.query(selector,context);
var arr=qx.lang.Array.unique(this.concat(res));
return this.__pushStack(arr);
},children:function(selector){var children=[];

for(var i=0,l=this.length;i<l;i++){children.push.apply(children,qx.dom.Hierarchy.getChildElements(this[i]));
}
if(selector){children=qx.bom.Selector.matches(selector,children);
}return this.__pushStack(children);
},closest:function(selector){var arr=new qx.bom.Collection(1);
var Selector=qx.bom.Selector;
var ret=this.map(function(current){while(current&&current.ownerDocument){arr[0]=current;

if(Selector.matches(selector,arr).length>0){return current;
}current=current.parentNode;
}});
return this.__pushStack(qx.lang.Array.unique(ret));
},contents:function(){var res=[];
var lang=qx.lang.Array;

for(var i=0,l=this.length;i<l;i++){res.push.apply(res,lang.fromCollection(this[i].childNodes));
}return this.__pushStack(res);
},find:function(selector){var Selector=qx.bom.Selector;
if(this.length===1){return this.__pushStack(Selector.query(selector,this[0]));
}else{var ret=[];

for(var i=0,l=this.length;i<l;i++){ret.push.apply(ret,Selector.query(selector,this[i]));
}return this.__pushStack(qx.lang.Array.unique(ret));
}},next:function(selector){var Hierarchy=qx.dom.Hierarchy;
var ret=this.map(Hierarchy.getNextElementSibling,Hierarchy);
if(selector){ret=qx.bom.Selector.matches(selector,ret);
}return this.__pushStack(ret);
},nextAll:function(selector){return this.__hierarchyHelper("getNextSiblings",selector);
},prev:function(selector){var Hierarchy=qx.dom.Hierarchy;
var ret=this.map(Hierarchy.getPreviousElementSibling,Hierarchy);
if(selector){ret=qx.bom.Selector.matches(selector,ret);
}return this.__pushStack(ret);
},prevAll:function(selector){return this.__hierarchyHelper("getPreviousSiblings",selector);
},parent:function(selector){var Element=qx.dom.Element;
var ret=qx.lang.Array.unique(this.map(Element.getParentElement,Element));
if(selector){ret=qx.bom.Selector.matches(selector,ret);
}return this.__pushStack(ret);
},parents:function(selector){return this.__hierarchyHelper("getAncestors",selector);
},siblings:function(selector){return this.__hierarchyHelper("getSiblings",selector);
},__hierarchyHelper:function(method,selector){var all=[];
var Hierarchy=qx.dom.Hierarchy;

for(var i=0,l=this.length;i<l;i++){all.push.apply(all,Hierarchy[method](this[i]));
}var ret=qx.lang.Array.unique(all);
if(selector){ret=qx.bom.Selector.matches(selector,ret);
}return this.__pushStack(ret);
},__pushStack:function(arr){var coll=new qx.bom.Collection;
coll.__prevObject=this;
arr=Array.prototype.slice.call(arr,0);
coll.push.apply(coll,arr);
return coll;
},andSelf:function(){return this.add(this.__prevObject);
},end:function(){return this.__prevObject||new qx.bom.Collection();
},__manipulate:function(args,callback){var element=this[0];
var doc=element.ownerDocument||element;
var fragment=doc.createDocumentFragment();
var scripts=qx.bom.Html.clean(args,doc,fragment);
var first=fragment.firstChild;
if(first){var last=this.length-1;

for(var i=0,l=last;i<l;i++){callback.call(this,this[i],fragment.cloneNode(true));
}callback.call(this,this[last],fragment);
}if(scripts){var script;
var Loader=qx.io2.ScriptLoader;
var Func=qx.lang.Function;

for(var i=0,l=scripts.length;i<l;i++){script=scripts[i];
if(script.src){Loader.get().load(script.src);
}else{Func.globalEval(script.text||script.textContent||script.innerHTML||"");
}if(script.parentNode){script.parentNode.removeChild(script);
}}}return this;
},__manipulateTo:function(args,original){var Selector=qx.bom.Selector;
var Lang=qx.lang.Array;
var col=[];

for(var i=0,l=args.length;i<l;i++){{if(typeof args[i]!=="string"){throw new Error("Invalid argument for selector query: "+args[i]);
}};
col.push.apply(col,Selector.query(args[i]));
}col=Lang.cast(Lang.unique(col),qx.bom.Collection);
for(var i=0,il=this.length;i<il;i++){col[original](this[i]);
}return this;
},append:function(varargs){return this.__manipulate(arguments,this.__appendCallback);
},prepend:function(varargs){return this.__manipulate(arguments,this.__prependCallback);
},__appendCallback:function(rel,child){rel.appendChild(child);
},__prependCallback:function(rel,child){rel.insertBefore(child,rel.firstChild);
},appendTo:function(varargs){return this.__manipulateTo(arguments,"append");
},prependTo:function(varargs){return this.__manipulateTo(arguments,"prepend");
},before:function(varargs){return this.__manipulate(arguments,this.__beforeCallback);
},after:function(varargs){return this.__manipulate(arguments,this.__afterCallback);
},__beforeCallback:function(rel,child){rel.parentNode.insertBefore(child,rel);
},__afterCallback:function(rel,child){rel.parentNode.insertBefore(child,rel.nextSibling);
},insertBefore:function(varargs){return this.__manipulateTo(arguments,"before");
},insertAfter:function(varargs){return this.__manipulateTo(arguments,"after");
},wrapAll:function(content){var first=this[0];

if(first){var wrap=qx.bom.Collection.create(content,first.ownerDocument).clone();
if(first.parentNode){first.parentNode.insertBefore(wrap[0],first);
}wrap.map(this.__getInnerHelper).append(this);
}return this;
},__getInnerHelper:function(elem){while(elem.firstChild){elem=elem.firstChild;
}return elem;
},wrapInner:function(content){var helper=new qx.bom.Collection(1);

for(var i=0,l=this.length;i<l;i++){helper[0]=this[i];
helper.contents().wrapAll(content);
}return this;
},wrap:function(content){var helper=new qx.bom.Collection(1);
for(var i=0,l=this.length;i<l;i++){helper[0]=this[i];
helper.wrapAll(content);
}return this;
},replaceWith:function(content){return this.after(content).remove();
},replaceAll:function(varargs){return this.__manipulateTo(arguments,"replaceWith");
},remove:function(selector){var coll=this;

if(selector){coll=this.filter(selector);

if(coll.length==0){return this;
}}for(var i=0,il=coll.length,current;i<il;i++){current=coll[i];

if(current.parentNode){current.parentNode.removeChild(current);
}}return coll;
},destroy:function(selector){if(this.length==0){return this;
}var Selector=qx.bom.Selector;
var coll=this;

if(selector){coll=this.filter(selector);

if(coll.length==0){return this;
}}var Manager=qx.event.Registration.getManager(this[0]);

for(var i=0,l=coll.length,current,inner;i<l;i++){current=coll[i];
Manager.removeAllListeners(current);
inner=Selector.query("*",current);

for(var j=0,jl=inner.length;j<jl;j++){Manager.removeAllListeners(inner[j]);
}if(current.parentNode){current.parentNode.removeChild(current);
}}if(selector){coll.end();
qx.lang.Array.exclude(this,coll);
}else{this.length=0;
}return this;
},empty:function(){var Selector=qx.bom.Selector;

for(var i=0,l=this.length;i<l;i++){Selector.query(">*",this[i]).destroy();
while(this.firstChild){this.removeChild(this.firstChild);
}}return this;
},clone:function(events){var Element=qx.bom.Element;
return events?
this.map(function(elem){return Element.clone(elem,true);
}):this.map(Element.clone,Element);
}},defer:function(statics,members){if(window.$==null){window.$=statics.create;
}}});
})();
qx.Class.define("qx.bom.Html",{statics:{__fixNonDirectlyClosableHelper:function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">";
},__convertMap:{opt:[1,"<select multiple='multiple'>","</select>"],leg:[1,"<fieldset>","</fieldset>"],table:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],def:qx.core.Variant.select("qx.client",{"mshtml":[1,"div<div>","</div>"],"default":null})},__convertHtmlString:function(html,context){var div=context.createElement("div");
html=html.replace(/(<(\w+)[^>]*?)\/>/g,this.__fixNonDirectlyClosableHelper);
var tags=html.replace(/^\s+/,"").substring(0,5).toLowerCase();
var wrap,map=this.__convertMap;

if(!tags.indexOf("<opt")){wrap=map.opt;
}else if(!tags.indexOf("<leg")){wrap=map.leg;
}else if(tags.match(/^<(thead|tbody|tfoot|colg|cap)/)){wrap=map.table;
}else if(!tags.indexOf("<tr")){wrap=map.tr;
}else if(!tags.indexOf("<td")||!tags.indexOf("<th")){wrap=map.td;
}else if(!tags.indexOf("<col")){wrap=map.col;
}else{wrap=map.def;
}if(wrap){div.innerHTML=wrap[1]+html+wrap[2];
var depth=wrap[0];

while(depth--){div=div.lastChild;
}}else{div.innerHTML=html;
}if(qx.core.Variant.isSet("qx.client","mshtml")){var hasBody=/<tbody/i.test(html);
var tbody=!tags.indexOf("<table")&&!hasBody?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&!hasBody?div.childNodes:[];

for(var j=tbody.length-1;j>=0;--j){if(tbody[j].tagName.toLowerCase()==="tbody"&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j]);
}}if(/^\s/.test(html)){div.insertBefore(context.createTextNode(html.match(/^\s*/)[0]),div.firstChild);
}}return qx.lang.Array.fromCollection(div.childNodes);
},clean:function(objs,context,fragment){context=context||document;
if(typeof context.createElement==="undefined"){context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;
}if(!fragment&&objs.length===1&&typeof objs[0]==="string"){var match=/^<(\w+)\s*\/?>$/.exec(objs[0]);

if(match){return [context.createElement(match[1])];
}}var obj,ret=[];

for(var i=0,l=objs.length;i<l;i++){obj=objs[i];
if(typeof obj==="string"){obj=this.__convertHtmlString(obj,context);
}if(obj.nodeType){ret.push(obj);
}else if(obj instanceof qx.type.BaseArray){ret.push.apply(ret,Array.prototype.slice.call(obj,0));
}else{ret.push.apply(ret,obj);
}}if(fragment){var scripts=[],LArray=qx.lang.Array,elem,temp;

for(var i=0;ret[i];i++){elem=ret[i];

if(elem.nodeType==1&&elem.tagName.toLowerCase()==="script"&&(!elem.type||elem.type.toLowerCase()==="text/javascript")){if(elem.parentNode){elem.parentNode.removeChild(ret[i]);
}scripts.push(elem);
}else{if(elem.nodeType===1){temp=LArray.fromCollection(elem.getElementsByTagName("script"));
ret.splice.apply(ret,[i+1,0].concat(temp));
}fragment.appendChild(elem);
}}return scripts;
}return ret;
}}});
qx.Class.define("qx.dom.Element",{statics:{hasChild:function(parent,child){return child.parentNode===parent;
},hasChildren:function(element){return !!element.firstChild;
},hasChildElements:function(element){element=element.firstChild;

while(element){if(element.nodeType===1){return true;
}element=element.nextSibling;
}return false;
},getParentElement:function(element){return element.parentNode;
},isInDom:function(element,win){var domElements=win.document.getElementsByTagName(element.nodeName);

for(var i=0,l=domElements.length;i<l;i++){if(domElements[i]===element){return true;
}}return false;
},insertAt:function(node,parent,index){var ref=parent.childNodes[index];

if(ref){parent.insertBefore(node,ref);
}else{parent.appendChild(node);
}return true;
},insertBegin:function(node,parent){if(parent.firstChild){this.insertBefore(node,parent.firstChild);
}else{parent.appendChild(node);
}},insertEnd:function(node,parent){parent.appendChild(node);
},insertBefore:function(node,ref){ref.parentNode.insertBefore(node,ref);
return true;
},insertAfter:function(node,ref){var parent=ref.parentNode;

if(ref==parent.lastChild){parent.appendChild(node);
}else{return this.insertBefore(node,ref.nextSibling);
}return true;
},remove:function(node){if(!node.parentNode){return false;
}node.parentNode.removeChild(node);
return true;
},removeChild:function(node,parent){if(node.parentNode!==parent){return false;
}parent.removeChild(node);
return true;
},removeChildAt:function(index,parent){var child=parent.childNodes[index];

if(!child){return false;
}parent.removeChild(child);
return true;
},replaceChild:function(newNode,oldNode){if(!oldNode.parentNode){return false;
}oldNode.parentNode.replaceChild(newNode,oldNode);
return true;
},replaceAt:function(newNode,index,parent){var oldNode=parent.childNodes[index];

if(!oldNode){return false;
}parent.replaceChild(newNode,oldNode);
return true;
}}});
qx.Class.define("qx.io2.ScriptLoader",{extend:qx.core.Object,construct:function(){this.base(arguments);
this.__oneventWrapped=qx.lang.Function.bind(this.__onevent,this);
this.__elem=document.createElement("script");
},members:{__running:null,__callback:null,__context:null,__oneventWrapped:null,__elem:null,load:function(url,callback,context){if(this.__running){throw new Error("Another request is still running!");
}this.__running=true;
var head=document.getElementsByTagName("head")[0];
var script=this.__elem;
this.__callback=callback||null;
this.__context=context||window;
script.type="text/javascript";
script.onerror=script.onload=script.onreadystatechange=this.__oneventWrapped;
script.src=url;
head.appendChild(script);
},abort:function(){if(this.__running){this.__cleanup("abort");
}},__cleanup:function(status){var script=this.__elem;
script.onerror=script.onload=script.onreadystatechange=null;
document.getElementsByTagName("head")[0].removeChild(script);
delete this.__running;
this.__callback.call(this.__context,status);
},__onevent:qx.core.Variant.select("qx.client",{"mshtml":function(){var state=this.__elem.readyState;

if(state=="loaded"){this.__cleanup("success");
}else if(state=="complete"){this.__cleanup("success");
}else{return;
}},"default":function(e){if(typeof e==="string"||e.type==="error"){this.__cleanup("fail");
}else if(e.type==="load"){this.__cleanup("success");
}else if(e.type==="readystatechange"&&(e.target.readyState==="complete"||e.target.readyState==="loaded")){this.__cleanup("success");
}else{return;
}}})},destruct:function(){this._disposeFields("__elem","__oneventWrapped","__callback","__context");
}});
qx.Class.define("qx.event.handler.ElementResize",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){this.base(arguments);
this.__manager=manager;
this.__elements={};
this.__timer=new qx.event.Timer(200);
this.__timer.addListener("interval",this._onInterval,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{resize:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{__elements:null,__timer:null,canHandleEvent:function(target,type){return target.tagName.toLowerCase()!=="body";
},registerEvent:function(target,type,capture){var hash=qx.core.ObjectRegistry.toHashCode(target);
var elements=this.__elements;

if(!elements[hash]){elements[hash]={element:target,width:qx.bom.element.Dimension.getWidth(target),height:qx.bom.element.Dimension.getHeight(target)};
this.__timer.start();
}},unregisterEvent:function(target,type,capture){var hash=qx.core.ObjectRegistry.toHashCode(target);
var elements=this.__elements;

if(elements[hash]){delete elements[hash];

if(qx.lang.Object.isEmpty(elements)){this.__timer.stop();
}}},_onInterval:function(e){var elements=this.__elements;

for(var key in elements){var data=elements[key];
var el=data.element;
var width=qx.bom.element.Dimension.getWidth(el);
var height=qx.bom.element.Dimension.getHeight(el);

if(data.height!==height||data.width!==width){qx.event.Registration.fireNonBubblingEvent(el,"resize",qx.event.type.Data,[{width:width,oldWidth:data.width,height:height,oldHeight:data.height}]);
data.width=width;
data.height=height;
}}}},destruct:function(){this._disposeFields("__manager","__elements");
this._disposeObjects("__timer");
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Class.define("qx.event.Timer",{extend:qx.core.Object,construct:function(interval){this.base(arguments);
this.setEnabled(false);

if(interval!=null){this.setInterval(interval);
}this.__oninterval=qx.lang.Function.bind(this._oninterval,this);
},events:{"interval":"qx.event.type.Event"},statics:{once:function(func,obj,timeout){var timer=new qx.event.Timer(timeout);
timer.addListener("interval",function(e){timer.stop();
func.call(obj,e);
timer.dispose();
obj=null;
},obj);
timer.start();
return timer;
}},properties:{enabled:{init:true,check:"Boolean",apply:"_applyEnabled"},interval:{check:"Integer",init:1000,apply:"_applyInterval"}},members:{__intervalHandler:null,_applyInterval:function(value,old){if(this.getEnabled()){this.restart();
}},_applyEnabled:function(value,old){if(old){window.clearInterval(this.__intervalHandler);
this.__intervalHandler=null;
}else if(value){this.__intervalHandler=window.setInterval(this.__oninterval,this.getInterval());
}},start:function(){this.setEnabled(true);
},startWith:function(interval){this.setInterval(interval);
this.start();
},stop:function(){this.setEnabled(false);
},restart:function(){this.stop();
this.start();
},restartWith:function(interval){this.stop();
this.startWith(interval);
},_oninterval:function(){if(this.getEnabled()){this.fireEvent("interval");
}}},destruct:function(){if(this.__intervalHandler){window.clearInterval(this.__intervalHandler);
}this._disposeFields("__intervalHandler","__oninterval");
}});
qx.Class.define("qx.event.handler.Iframe",{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{load:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false,onevent:function(target){qx.event.Registration.fireEvent(target,"load");
}},members:{canHandleEvent:function(target,type){return target.tagName.toLowerCase()==="iframe";
},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){}},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Bootstrap.define("qx.log.appender.Native",{statics:{process:qx.core.Variant.select("qx.client",{"gecko":function(entry){if(window.console&&console.firebug){console[entry.level].apply(console,this.__toArguments(entry));
}},"mshtml":function(entry){if(window.console){var level=entry.level;

if(level=="debug"){level="log";
}var args=this.__toArguments(entry).join(" ");
console[level](args);
}},"webkit":function(entry){if(window.console){var level=entry.level;

if(level=="debug"){level="log";
}var args=this.__toArguments(entry).join(" ");
console[level](args);
}},"opera":function(entry){}}),__toArguments:qx.core.Variant.select("qx.client",{"gecko|webkit|mshtml":function(entry){var output=[];
output.push(entry.offset+"ms");

if(entry.object){var obj=entry.win.qx.core.ObjectRegistry.fromHashCode(entry.object);

if(obj){output.push(obj.classname+"["+obj.$$hash+"]:");
}}else if(entry.clazz){output.push(entry.clazz.classname+":");
}var items=entry.items;
var item,msg;

for(var i=0,il=items.length;i<il;i++){item=items[i];
msg=item.text;

if(msg instanceof Array){var list=[];

for(var j=0,jl=msg.length;j<jl;j++){list.push(msg[j].text);
}
if(item.type==="map"){output.push("{",list.join(", "),"}");
}else{output.push("[",list.join(", "),"]");
}}else{output.push(msg);
}}return output;
},"default":null})},defer:function(statics){qx.log.Logger.register(statics);
}});
qx.Class.define("qx.log.appender.Console",{statics:{init:function(){var style=['.qxconsole{z-index:10000;width:600px;height:300px;top:0px;right:0px;position:absolute;border-left:1px solid black;color:black;border-bottom:1px solid black;color:black;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}','.qxconsole .control{background:#cdcdcd;border-bottom:1px solid black;padding:4px 8px;}','.qxconsole .control a{text-decoration:none;color:black;}','.qxconsole .messages{background:white;height:100%;width:100%;overflow:auto;}','.qxconsole .messages div{padding:0px 4px;}','.qxconsole .messages .user-command{color:blue}','.qxconsole .messages .user-result{background:white}','.qxconsole .messages .user-error{background:#FFE2D5}','.qxconsole .messages .level-debug{background:white}','.qxconsole .messages .level-info{background:#DEEDFA}','.qxconsole .messages .level-warn{background:#FFF7D5}','.qxconsole .messages .level-error{background:#FFE2D5}','.qxconsole .messages .level-user{background:#E3EFE9}','.qxconsole .messages .type-string{color:black;font-weight:normal;}','.qxconsole .messages .type-number{color:#155791;font-weight:normal;}','.qxconsole .messages .type-boolean{color:#15BC91;font-weight:normal;}','.qxconsole .messages .type-array{color:#CC3E8A;font-weight:bold;}','.qxconsole .messages .type-map{color:#CC3E8A;font-weight:bold;}','.qxconsole .messages .type-key{color:#565656;font-style:italic}','.qxconsole .messages .type-class{color:#5F3E8A;font-weight:bold}','.qxconsole .messages .type-instance{color:#565656;font-weight:bold}','.qxconsole .messages .type-stringify{color:#565656;font-weight:bold}','.qxconsole .command{background:white;padding:2px 4px;border-top:1px solid black;}','.qxconsole .command input{width:100%;border:0 none;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}','.qxconsole .command input:focus{outline:none;}'];
qx.bom.Stylesheet.createElement(style.join(""));
var markup=['<div class="qxconsole">','<div class="control"><a href="javascript:qx.log.appender.Console.clear()">Clear</a> | <a href="javascript:qx.log.appender.Console.toggle()">Hide</a></div>','<div class="messages">','</div>','<div class="command">','<input type="text"/>','</div>','</div>'];
var wrapper=document.createElement("DIV");
wrapper.innerHTML=markup.join("");
var main=wrapper.firstChild;
document.body.appendChild(wrapper.firstChild);
this.__main=main;
this.__log=main.childNodes[1];
this.__cmd=main.childNodes[2].firstChild;
this.__onResize();
qx.log.Logger.register(this);
qx.core.ObjectRegistry.register(this);
},dispose:function(){qx.event.Registration.removeListener(document.documentElement,"keypress",this.__onKeyPress,this);
qx.log.Logger.unregister(this);
},clear:function(){this.__log.innerHTML="";
},process:function(entry){this.__log.appendChild(qx.log.appender.Util.toHtml(entry));
this.__scrollDown();
},__scrollDown:function(){this.__log.scrollTop=this.__log.scrollHeight;
},__visible:true,toggle:function(){if(!this.__main){this.init();
}else if(this.__main.style.display=="none"){this.show();
}else{this.__main.style.display="none";
}},show:function(){if(!this.__main){this.init();
}else{this.__main.style.display="block";
this.__log.scrollTop=this.__log.scrollHeight;
}},__history:[],execute:function(){var value=this.__cmd.value;

if(value==""){return;
}
if(value=="clear"){return this.clear();
}var command=document.createElement("div");
command.innerHTML=qx.log.appender.Util.escapeHTML(">>> "+value);
command.className="user-command";
this.__history.push(value);
this.__lastCommand=this.__history.length;
this.__log.appendChild(command);
this.__scrollDown();

try{var ret=window.eval(value);
}catch(ex){qx.log.Logger.error(ex);
}
if(ret!==undefined){qx.log.Logger.debug(ret);
}},__onResize:function(e){this.__log.style.height=(this.__main.clientHeight-this.__main.firstChild.offsetHeight-this.__main.lastChild.offsetHeight)+"px";
},__onKeyPress:function(e){var iden=e.getKeyIdentifier();
if((iden=="F7")||(iden=="D"&&e.isCtrlPressed())){this.toggle();
e.preventDefault();
}if(!this.__main){return;
}if(!qx.dom.Hierarchy.contains(this.__main,e.getTarget())){return;
}if(iden=="Enter"&&this.__cmd.value!=""){this.execute();
this.__cmd.value="";
}if(iden=="Up"||iden=="Down"){this.__lastCommand+=iden=="Up"?-1:1;
this.__lastCommand=Math.min(Math.max(0,this.__lastCommand),this.__history.length);
var entry=this.__history[this.__lastCommand];
this.__cmd.value=entry||"";
this.__cmd.select();
}}},defer:function(statics){qx.event.Registration.addListener(document.documentElement,"keypress",statics.__onKeyPress,statics);
}});
qx.Class.define("qx.bom.Stylesheet",{statics:{includeFile:function(href,doc){if(!doc){doc=document;
}var el=doc.createElement("link");
el.type="text/css";
el.rel="stylesheet";
el.href=qx.util.ResourceManager.toUri(href);
var head=doc.getElementsByTagName("head")[0];
head.appendChild(el);
},createElement:qx.core.Variant.select("qx.client",{"mshtml":function(text){var sheet=document.createStyleSheet();

if(text){sheet.cssText=text;
}return sheet;
},"default":function(text){var elem=document.createElement("style");
elem.type="text/css";

if(text){elem.appendChild(document.createTextNode(text));
}document.getElementsByTagName("head")[0].appendChild(elem);
return elem.sheet;
}}),addRule:qx.core.Variant.select("qx.client",{"mshtml":function(sheet,selector,entry){sheet.addRule(selector,entry);
},"default":function(sheet,selector,entry){sheet.insertRule(selector+"{"+entry+"}",sheet.cssRules.length);
}}),removeRule:qx.core.Variant.select("qx.client",{"mshtml":function(sheet,selector){var rules=sheet.rules;
var len=rules.length;

for(var i=len-1;i>=0;--i){if(rules[i].selectorText==selector){sheet.removeRule(i);
}}},"default":function(sheet,selector){var rules=sheet.cssRules;
var len=rules.length;

for(var i=len-1;i>=0;--i){if(rules[i].selectorText==selector){sheet.deleteRule(i);
}}}}),removeAllRules:qx.core.Variant.select("qx.client",{"mshtml":function(sheet){var rules=sheet.rules;
var len=rules.length;

for(var i=len-1;i>=0;i--){sheet.removeRule(i);
}},"default":function(sheet){var rules=sheet.cssRules;
var len=rules.length;

for(var i=len-1;i>=0;i--){sheet.deleteRule(i);
}}}),addImport:qx.core.Variant.select("qx.client",{"mshtml":function(sheet,url){sheet.addImport(url);
},"default":function(sheet,url){sheet.insertRule('@import "'+url+'";',sheet.cssRules.length);
}}),removeImport:qx.core.Variant.select("qx.client",{"mshtml":function(sheet,url){var imports=sheet.imports;
var len=imports.length;

for(var i=len-1;i>=0;i--){if(imports[i].href==url){sheet.removeImport(i);
}}},"default":function(sheet,url){var rules=sheet.cssRules;
var len=rules.length;

for(var i=len-1;i>=0;i--){if(rules[i].href==url){sheet.deleteRule(i);
}}}}),removeAllImports:qx.core.Variant.select("qx.client",{"mshtml":function(sheet){var imports=sheet.imports;
var len=imports.length;

for(var i=len-1;i>=0;i--){sheet.removeImport(i);
}},"default":function(sheet){var rules=sheet.cssRules;
var len=rules.length;

for(var i=len-1;i>=0;i--){if(rules[i].type==rules[i].IMPORT_RULE){sheet.deleteRule(i);
}}}})}});
qx.Class.define("qx.log.appender.Util",{statics:{toHtml:function(entry){var output=[];
var item,msg,sub,list;
output.push("<span class='offset'>",this.formatOffset(entry.offset),"</span> ");

if(entry.object){var obj=entry.win.qx.core.ObjectRegistry.fromHashCode(entry.object);

if(obj){output.push("<span class='object' title='Object instance with hash code: "+obj.$$hash+"'>",obj.classname,"[",obj.$$hash,"]</span>: ");
}}else if(entry.clazz){output.push("<span class='object'>"+entry.clazz.classname,"</span>: ");
}var items=entry.items;

for(var i=0,il=items.length;i<il;i++){item=items[i];
msg=item.text;

if(msg instanceof Array){var list=[];

for(var j=0,jl=msg.length;j<jl;j++){sub=msg[j];

if(typeof sub==="string"){list.push("<span>"+this.escapeHTML(sub)+"</span>");
}else if(sub.key){list.push("<span class='type-key'>"+sub.key+"</span>:<span class='type-"+sub.type+"'>"+this.escapeHTML(sub.text)+"</span>");
}else{list.push("<span class='type-"+sub.type+"'>"+this.escapeHTML(sub.text)+"</span>");
}}output.push("<span class='type-"+item.type+"'>");

if(item.type==="map"){output.push("{",list.join(", "),"}");
}else{output.push("[",list.join(", "),"]");
}output.push("</span>");
}else{output.push("<span class='type-"+item.type+"'>"+this.escapeHTML(msg)+"</span> ");
}}var wrapper=document.createElement("DIV");
wrapper.innerHTML=output.join("");
wrapper.className="level-"+entry.level;
return wrapper;
},formatOffset:function(offset,length){var str=offset.toString();
var diff=(length||6)-str.length;
var pad="";

for(var i=0;i<diff;i++){pad+="0";
}return pad+str;
},escapeHTML:function(value){return String(value).replace(/[<>&"']/g,this.__escapeHTMLReplace);
},__escapeHTMLReplace:function(ch){var map={"<":"&lt;",">":"&gt;","&":"&amp;","'":"&#39;",'"':"&quot;"};
return map[ch]||"?";
}}});
qx.Class.define("qx.log.appender.Element",{extend:qx.core.Object,construct:function(element){this.base(arguments);
var style=['.qxappender .level-debug{background:white}','.qxappender .level-info{background:#DEEDFA}','.qxappender .level-warn{background:#FFF7D5}','.qxappender .level-error{background:#FFE2D5}','.qxappender .level-user{background:#E3EFE9}','.qxappender .type-string{color:black;font-weight:normal;}','.qxappender .type-number{color:#155791;font-weight:normal;}','.qxappender .type-boolean{color:#15BC91;font-weight:normal;}','.qxappender .type-array{color:#CC3E8A;font-weight:bold;}','.qxappender .type-map{color:#CC3E8A;font-weight:bold;}','.qxappender .type-key{color:#565656;font-style:italic}','.qxappender .type-class{color:#5F3E8A;font-weight:bold}','.qxappender .type-instance{color:#565656;font-weight:bold}','.qxappender .type-stringify{color:#565656;font-weight:bold}'];
qx.bom.Stylesheet.createElement(style.join(""));
qx.log.Logger.register(this);
},members:{__element:null,setElement:function(element){this.clear();
if(element){qx.bom.element.Class.add(element,"qxappender");
}this.__element=element;
},clear:function(){var elem=this.__element;
if(elem){elem.innerHTML="";
}},process:function(entry){var elem=this.__element;

if(!elem){return;
}elem.appendChild(qx.log.appender.Util.toHtml(entry));
elem.scrollTop=elem.scrollHeight;
}},destruct:function(){this._disposeFields("__element");
}});


if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) qx.event.handler.Application.onScriptLoaded();

