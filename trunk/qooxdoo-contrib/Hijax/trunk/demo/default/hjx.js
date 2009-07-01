if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!window.qxsettings) qxsettings = {};
var settings = {"qx.application": "hjx.demo.Application", "qx.theme": "qx.theme.Modern", "qx.version": "0.8.3-pre"};
for (var k in settings) qxsettings[k] = settings[k];

if (!window.qxvariants) qxvariants = {};
var variants = {};
for (var k in variants) qxvariants[k] = variants[k];

if (!window.qxlibraries) qxlibraries = {};
var libinfo = {"qx": {"resourceUri": ".", "version": "trunk", "sourceUri": "."}, "hjx": {"resourceUri": ".", "version": "trunk", "sourceUri": "."}, "hjx.demo": {"resourceUri": ".", "version": "trunk", "sourceUri": "."}};
for (var k in libinfo) qxlibraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {};
qx.$$locales = {"C": {"cldr_date_format_long": "MMMM d, yyyy", "cldr_month_format_wide_11": "November", "cldr_month_format_wide_12": "December", "cldr_month_format_wide_10": "October", "cldr_time_format_long": "h:mm:ss a z", "cldr_day_format_abbreviated_sat": "Sat", "cldr_month_format_abbreviated_8": "Aug", "cldr_month_format_wide_7": "July", "cldr_day_stand-alone_abbreviated_tue": "Tue", "cldr_day_format_wide_sun": "Sunday", "cldr_day_format_wide_wed": "Wednesday", "cldr_day_format_narrow_thu": "T", "cldr_day_format_narrow_fri": "F", "cldr_month_format_wide_5": "May", "cldr_day_stand-alone_wide_sat": "Saturday", "cldr_month_stand-alone_narrow_3": "M", "cldr_month_stand-alone_narrow_1": "J", "cldr_day_format_narrow_sun": "S", "cldr_date_time_format_MEd": "E, M/d", "cldr_date_time_format_MMM": "LLL", "cldr_month_stand-alone_narrow_5": "M", "cldr_day_format_abbreviated_thu": "Thu", "cldr_month_stand-alone_narrow_7": "J", "cldr_month_stand-alone_narrow_6": "J", "cldr_month_stand-alone_narrow_9": "S", "cldr_day_stand-alone_wide_sun": "Sunday", "cldr_date_time_format_Md": "M/d", "cldr_month_stand-alone_narrow_4": "A", "cldr_day_stand-alone_wide_fri": "Friday", "cldr_month_stand-alone_narrow_2": "F", "cldr_day_format_abbreviated_fri": "Fri", "cldr_day_stand-alone_abbreviated_fri": "Fri", "cldr_pm": "PM", "cldr_day_format_narrow_tue": "T", "alternateQuotationEnd": "’", "cldr_date_time_format_M": "L", "cldr_month_stand-alone_narrow_8": "A", "quotationEnd": "”", "cldr_day_stand-alone_abbreviated_thu": "Thu", "cldr_month_stand-alone_narrow_11": "N", "cldr_month_stand-alone_narrow_10": "O", "cldr_month_stand-alone_narrow_12": "D", "cldr_day_format_wide_thu": "Thursday", "cldr_day_stand-alone_narrow_sat": "S", "cldr_day_format_wide_tue": "Tuesday", "cldr_day_format_wide_fri": "Friday", "cldr_date_format_medium": "MMM d, yyyy", "cldr_day_format_narrow_sat": "S", "cldr_date_format_full": "EEEE, MMMM d, yyyy", "cldr_day_stand-alone_wide_thu": "Thursday", "quotationStart": "“", "cldr_date_time_format_MMMd": "MMM d", "cldr_day_format_abbreviated_tue": "Tue", "cldr_day_format_abbreviated_mon": "Mon", "cldr_date_time_format_yM": "M/yyyy", "cldr_day_stand-alone_wide_mon": "Monday", "cldr_date_time_format_MMMEd": "E, MMM d", "cldr_date_time_format_yQ": "Q yyyy", "cldr_date_time_format_hm": "h:mm a", "cldr_day_stand-alone_narrow_sun": "S", "cldr_day_stand-alone_abbreviated_sat": "Sat", "cldr_month_format_wide_1": "January", "cldr_month_format_wide_3": "March", "cldr_month_format_wide_2": "February", "cldr_day_stand-alone_abbreviated_sun": "Sun", "cldr_month_format_wide_4": "April", "cldr_date_time_format_MMMMd": "MMMM d", "cldr_month_format_wide_6": "June", "cldr_month_format_wide_9": "September", "cldr_month_format_wide_8": "August", "cldr_day_stand-alone_narrow_tue": "T", "cldr_date_time_format_MMMMEd": "E, MMMM d", "cldr_day_stand-alone_narrow_wed": "W", "cldr_time_format_full": "h:mm:ss a v", "cldr_am": "AM", "cldr_number_decimal_separator": ".", "cldr_number_percent_format": "#,##0%", "cldr_day_stand-alone_wide_wed": "Wednesday", "cldr_number_group_separator": ",", "alternateQuotationStart": "‘", "cldr_day_format_abbreviated_sun": "Sun", "cldr_time_format_short": "h:mm a", "cldr_date_time_format_Hms": "HH:mm:ss", "cldr_time_format_medium": "h:mm:ss a", "cldr_date_time_format_ms": "mm:ss", "cldr_day_stand-alone_narrow_thu": "T", "cldr_month_format_abbreviated_1": "Jan", "cldr_month_format_abbreviated_2": "Feb", "cldr_month_format_abbreviated_3": "Mar", "cldr_month_format_abbreviated_4": "Apr", "cldr_month_format_abbreviated_5": "May", "cldr_month_format_abbreviated_6": "Jun", "cldr_month_format_abbreviated_7": "Jul", "cldr_date_time_format_yMMMEd": "EEE, MMM d, yyyy", "cldr_month_format_abbreviated_9": "Sep", "cldr_day_format_wide_mon": "Monday", "cldr_date_time_format_yMEd": "EEE, M/d/yyyy", "cldr_month_format_abbreviated_10": "Oct", "cldr_date_time_format_y": "yyyy", "cldr_day_stand-alone_wide_tue": "Tuesday", "cldr_day_format_narrow_wed": "W", "cldr_day_format_abbreviated_wed": "Wed", "cldr_date_time_format_yQQQ": "QQQ yyyy", "cldr_day_stand-alone_narrow_fri": "F", "cldr_date_time_format_yMMM": "MMM yyyy", "cldr_day_stand-alone_narrow_mon": "M", "cldr_day_stand-alone_abbreviated_mon": "Mon", "cldr_day_format_narrow_mon": "M", "cldr_day_stand-alone_abbreviated_wed": "Wed", "cldr_date_time_format_yMMMM": "MMMM yyyy", "cldr_month_format_abbreviated_12": "Dec", "cldr_date_time_format_Hm": "HH:mm", "cldr_month_format_abbreviated_11": "Nov", "cldr_day_format_wide_sat": "Saturday", "cldr_date_time_format_d": "d", "cldr_date_format_short": "M/d/yy"}, "en": {"cldr_date_format_long": "MMMM d, yyyy", "cldr_month_format_wide_11": "November", "cldr_month_format_wide_12": "December", "cldr_month_format_wide_10": "October", "cldr_time_format_long": "h:mm:ss a z", "cldr_day_format_abbreviated_sat": "Sat", "cldr_month_format_abbreviated_8": "Aug", "cldr_month_format_wide_7": "July", "cldr_day_stand-alone_abbreviated_tue": "Tue", "cldr_day_format_wide_sun": "Sunday", "cldr_day_format_wide_wed": "Wednesday", "cldr_day_format_narrow_thu": "T", "cldr_day_format_narrow_fri": "F", "cldr_month_format_wide_5": "May", "cldr_day_stand-alone_wide_sat": "Saturday", "cldr_month_stand-alone_narrow_3": "M", "cldr_month_stand-alone_narrow_1": "J", "cldr_day_format_narrow_sun": "S", "cldr_date_time_format_MEd": "E, M/d", "cldr_date_time_format_MMM": "LLL", "cldr_month_stand-alone_narrow_5": "M", "cldr_day_format_abbreviated_thu": "Thu", "cldr_month_stand-alone_narrow_7": "J", "cldr_month_stand-alone_narrow_6": "J", "cldr_month_stand-alone_narrow_9": "S", "cldr_day_stand-alone_wide_sun": "Sunday", "cldr_date_time_format_Md": "M/d", "cldr_month_stand-alone_narrow_4": "A", "cldr_day_stand-alone_wide_fri": "Friday", "cldr_month_stand-alone_narrow_2": "F", "cldr_day_format_abbreviated_fri": "Fri", "cldr_day_stand-alone_abbreviated_fri": "Fri", "cldr_pm": "PM", "cldr_day_format_narrow_tue": "T", "alternateQuotationEnd": "’", "cldr_date_time_format_M": "L", "cldr_month_stand-alone_narrow_8": "A", "quotationEnd": "”", "cldr_day_stand-alone_abbreviated_thu": "Thu", "cldr_month_stand-alone_narrow_11": "N", "cldr_month_stand-alone_narrow_10": "O", "cldr_month_stand-alone_narrow_12": "D", "cldr_day_format_wide_thu": "Thursday", "cldr_day_stand-alone_narrow_sat": "S", "cldr_day_format_wide_tue": "Tuesday", "cldr_day_format_wide_fri": "Friday", "cldr_date_format_medium": "MMM d, yyyy", "cldr_day_format_narrow_sat": "S", "cldr_date_format_full": "EEEE, MMMM d, yyyy", "cldr_day_stand-alone_wide_thu": "Thursday", "quotationStart": "“", "cldr_date_time_format_MMMd": "MMM d", "cldr_day_format_abbreviated_tue": "Tue", "cldr_day_format_abbreviated_mon": "Mon", "cldr_date_time_format_yM": "M/yyyy", "cldr_day_stand-alone_wide_mon": "Monday", "cldr_date_time_format_MMMEd": "E, MMM d", "cldr_date_time_format_yQ": "Q yyyy", "cldr_date_time_format_hm": "h:mm a", "cldr_day_stand-alone_narrow_sun": "S", "cldr_day_stand-alone_abbreviated_sat": "Sat", "cldr_month_format_wide_1": "January", "cldr_month_format_wide_3": "March", "cldr_month_format_wide_2": "February", "cldr_day_stand-alone_abbreviated_sun": "Sun", "cldr_month_format_wide_4": "April", "cldr_date_time_format_MMMMd": "MMMM d", "cldr_month_format_wide_6": "June", "cldr_month_format_wide_9": "September", "cldr_month_format_wide_8": "August", "cldr_day_stand-alone_narrow_tue": "T", "cldr_date_time_format_MMMMEd": "E, MMMM d", "cldr_day_stand-alone_narrow_wed": "W", "cldr_time_format_full": "h:mm:ss a v", "cldr_am": "AM", "cldr_number_decimal_separator": ".", "cldr_number_percent_format": "#,##0%", "cldr_day_stand-alone_wide_wed": "Wednesday", "cldr_number_group_separator": ",", "alternateQuotationStart": "‘", "cldr_day_format_abbreviated_sun": "Sun", "cldr_time_format_short": "h:mm a", "cldr_date_time_format_Hms": "HH:mm:ss", "cldr_time_format_medium": "h:mm:ss a", "cldr_date_time_format_ms": "mm:ss", "cldr_day_stand-alone_narrow_thu": "T", "cldr_month_format_abbreviated_1": "Jan", "cldr_month_format_abbreviated_2": "Feb", "cldr_month_format_abbreviated_3": "Mar", "cldr_month_format_abbreviated_4": "Apr", "cldr_month_format_abbreviated_5": "May", "cldr_month_format_abbreviated_6": "Jun", "cldr_month_format_abbreviated_7": "Jul", "cldr_date_time_format_yMMMEd": "EEE, MMM d, yyyy", "cldr_month_format_abbreviated_9": "Sep", "cldr_day_format_wide_mon": "Monday", "cldr_date_time_format_yMEd": "EEE, M/d/yyyy", "cldr_month_format_abbreviated_10": "Oct", "cldr_date_time_format_y": "yyyy", "cldr_day_stand-alone_wide_tue": "Tuesday", "cldr_day_format_narrow_wed": "W", "cldr_day_format_abbreviated_wed": "Wed", "cldr_date_time_format_yQQQ": "QQQ yyyy", "cldr_day_stand-alone_narrow_fri": "F", "cldr_date_time_format_yMMM": "MMM yyyy", "cldr_day_stand-alone_narrow_mon": "M", "cldr_day_stand-alone_abbreviated_mon": "Mon", "cldr_day_format_narrow_mon": "M", "cldr_day_stand-alone_abbreviated_wed": "Wed", "cldr_date_time_format_yMMMM": "MMMM yyyy", "cldr_month_format_abbreviated_12": "Dec", "cldr_date_time_format_Hm": "HH:mm", "cldr_month_format_abbreviated_11": "Nov", "cldr_day_format_wide_sat": "Saturday", "cldr_date_time_format_d": "d", "cldr_date_format_short": "M/d/yy"}}

qx.$$loader = {
  parts : {"boot":[0]},
  uris : [["./hjx-0.js"]],
  boot : "boot"
};  

(function(){var K="",J="#111",I="#ff7f12",H="&",G="text",F="selected",E="radio",D="select-multiple",C="#97d733",B="textarea",bl="checkbox",bk="=",bj="hidden",bi="file",bh="hjx.Form",bg="application/x-www-form-urlencoded",bf="true",be="button",bd="static",bc="password",R='POST',S="reset",P="progress",Q="The page you try to reload contains POST data which is expired in the cache. If you resend the data, every action which submitted the form will be executed again. To send the data once more click OK, otherwise click Cancel.",N='div',O="de",L="completed",M="fieldset",T="submit",U="failed",W="image",V="select-one",Y="Content-Type",X="Die Seite, die Sie versuchen zu laden, wurde aus POST-Daten erstellt, die im Cache abgelaufen sind. Wenn Sie die Daten nochmals senden, wird jede Aktion, die das Formular ausgef�hrt hat (wie eine Suche oder ein Online-Einkauf), noch einmal durchgef�hrt. Um die Daten nochmals zu senden, klicken Sie OK. Andernfalls klicken Sie auf Abbrechen.",bb="parentDocument",ba="checked";
qx.Class.define(bh,{type:bd,statics:{__a:{},__b:null,ignoreInputTypes:[bi,T,W,S,be],ignoreElementTypes:[M],checkElementTypes:[E,bl],multiSelectType:D,POSTretry:function(bx){switch(bx){case O:return X;
break;
default:return Q;
}},__c:{'int':/^[\d]+$/,'float':/^[\d\.]+$/,'string':/^[\w\W\s]+$/,'boolean':/(0|false)|(1|true)/,'email':/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,'date':/^[\d\.]+$/},validateForm:function(bK){var bN=hjx.Settings.__settings._forms[bK];
var bO=document.getElementById(bK);
var bM=hjx.Form.getFields(bO);
var bL=true;

for(var i=0,l=bM.length;i<l;i++){try{var bP=this.validateField(bM[i],bN[bM[i].name].type,bN[bM[i].name].required);
bL=bL===true?bP:bL;
}catch(e){}}return bL;
},validateField:function(x,y,z){switch(x.type.toLowerCase()){case G:case B:case bj:case bc:if(this.__c[y].test(x.value)){if(z===true){x.style.color=J;
x.style.backgroundColor=C;
}return true;
}else{if(z===true){x.style.color=J;
x.style.backgroundColor=I;
return false;
}else if(x.value==K){return true;
}else{x.style.color=J;
x.style.backgroundColor=I;
return false;
}}break;
}},validateFieldServerSide:function(by,bz){if(by.value!=K){var bB=hjx.Form.encodeField(by);
var bA=new qx.io.remote.Request(bz,R);
bA.setRequestHeader(Y,bg);
bA.setData(bB);
this.__d(by);
bA.addListener(L,function(r){var s=r.getContent();
var t=r.getStatusCode();

if(t>=200&&t<300){if(s==bf){by.style.color=J;
by.style.backgroundColor=C;
}else{by.style.color=J;
by.style.backgroundColor=I;
}this.__e(by);
}},this);
bA.addListener(U,function(bI){var bJ=bI.getStatusCode().toString();
hjx.Hijax._httpError(bJ,bz);
this.__e(by);
},this);
bA.send();
}},__d:function(v){var w=document.createElement(N);
w.className=P;
v.parentNode.insertBefore(w,v.nextSibling);
},__e:function(A){A.parentNode.removeChild(A.nextSibling);
},serializeForm:function(br){var bt=br.id;
var bw={};
bw[bt]={};
bw[bt][bb]=hjx.Form.getParentDocument();
var bs=hjx.Form.getFields(br);
var bu=[];
for(var i=0,l=bs.length;i<l;i++){if(bs[i].multiple){var bv=[];

for(var j=0;j<bs[i].options.length;j++){if(bs[i].options[j].selected){bv.push(bs[i].options[j].value);
}}}bw[bt][bs[i].name]=bv||bs[i].value;
bv=false;
bu.push(hjx.Form.encodeField(bs[i]));
}this.setFormCollection(bt,bw[bt]);
return bu.join(H);
},deserializeForm:function(a){var m=this.getFormCollection(a);

for(var h in m){var d=document.getElementsByName(h);

for(var i=0,l=d.length;i<l;i++){var k=d[i];

if(k){switch(k.type.toLowerCase()){case G:case B:case bj:k.value=m[h];
break;
case bl:case E:k.value==m[h]?k.checked=ba:false;
break;
case V:var b=k.options;

for(var f=0,c=b.length;f<c;f++){if(b[f].value==m[h]){b[f].selected=F;
}}break;
case D:var b=k.options;

for(var f=0,c=b.length;f<c;f++){for(var n=0,g=m[h].length;n<g;n++){if(b[f].value==m[h][n]){b[f].selected=F;
}}}break;
}}}}},getFormCollection:function(bm){return this.__a[bm];
},setFormCollection:function(bC,bD){this.__a[bC]=bD;
},setParentDocument:function(u){this.__b=u;
},getParentDocument:function(){return this.__b;
},inputFilter:function(o){if(o.disabled){return false;
}var p=(o.tagName||K).toLowerCase();

if(qx.lang.Array.contains(hjx.Form.ignoreElementTypes,p)){return false;
}var q=o.type.toLowerCase();

if(qx.lang.Array.contains(hjx.Form.ignoreInputTypes,q)){return false;
}
if(!o.checked&&qx.lang.Array.contains(hjx.Form.checkElementTypes,q)){return false;
}return true;
},encodeField:function(bn){var bp=bn.name||K;
var bo=(bn.type||K).toLowerCase();

if(bo===hjx.Form.multiSelectType){var bq=[];

for(var i=0;i<bn.options.length;i++){if(bn.options[i].selected){bq.push(bp+bk+bn.options[i].value);
}}return bq.join(H);
}else{return bp+bk+bn.value;
}},getFields:function(bE){return Array.filter(bE.elements,hjx.Form.inputFilter);
},encodeForm:function(bF){var bG=hjx.Form.getFields(bF);
var bH=[];

for(var i=0,l=bG.length;i<l;i++){bH.push(hjx.Form.encodeField(bG[i]));
}return bH.join(H);
}}});
})();
(function(){var O='*',N='#',M='undefined',L="submit",K="text/html",J="",I='i',H='onsubmit',G='body',F="*",bH='onclick',bG="form",bF='IEHistory',bE='id',bD="400",bC="blur",bB='~',bA="hjx.Hijax",bz="default",by="505",V='',W="GET",T="501",U="403",R="reset",S="string",P="static",Q="500",ba='request',bb="504",bj="404",bh="progress",bq=" ",bl="503",bu="$1#$2",bs='div',bd="401",bx="application/x-www-form-urlencoded",bw="completed",bv='form',bc="\/*.*",bf="failed",bg="[\w\:\/\/]*",bi="$1~$2",bk="click",bm="405",br='blur',bt="Accept-charset",X="Content-Type",Y="502",be='submit',bp="object",bo="ISO-8859-1",bn='click';
qx.Class.define(bA,{type:P,statics:{domain:document.domain,url:/(\w+:\/\/[\w\W.]+\/)(\S*)/.exec(location.href)[1],defaultElement:null,defaultRegExp:/[\w\W\s]*<body[^>]*>([\w\W\s]*)<\/body>[\w\W\s]*/im,hijaxHistory:null,historyReqMeth:[],__f:hjx.Settings.getSettings(),__g:null,__h:false,__i:null,__j:false,__k:null,__l:null,main:function(){this.__i=document.body;
this.setDefaultElement(this.__f._pages[O].DOMElem);
this.__m();
this.hijaxHistory=qx.bom.History.getInstance();
this.hijaxHistory.addListener(ba,function(x){this.__w(this.historyReqMeth[x.getData()]);
this.__o(this.__s(x.getData()));
},this);
var ci=this.hijaxHistory.getState();

if(ci){this.__h=true;
this.__o(this.__s(ci));
}},setDefaultElement:function(cj){switch(typeof cj){case bp:this.defaultElement=cj;
break;
case S:try{this.defaultElement=document.getElementById(cj)||document[cj];
}catch(e){alert("None existing DOM element: "+cj);
}break;
default:this.defaultElement=document.body;
}},__m:function(){var bW=document.links;

for(var i=0,l=bW.length;i<l;i++){if(bW[i].getAttribute(bH)){bW[i].setAttribute(bH,function(){});
}var ca=bW[i].href.indexOf(N);

if(ca!=-1){var cc=bW[i].href.substring(this.url.length);

if(cc.indexOf(N)==0){var bT=location.href;
var bY=bT.indexOf(bB);

if(bY!=-1){bT=bT.substring(0,bY);
}bW[i].href=unescape(bT.replace(/#/,V))+cc;
}}this.bindEvent(bW[i],bn,this.__n);
}var cb=document.forms;

for(var i=0,l=cb.length;i<l;i++){if(cb[i].getAttribute(H)){cb[i].setAttribute(H,function(){});
}if(!cb[i].getAttribute(bE)){cb[i].setAttribute(bE,bv+i);
}var bX=this.__f._forms[cb[i].id];

if(bX&&bX.validate_onblur===true){var bU=hjx.Form.getFields(cb[i]);

for(var j=0,bV=bU.length;j<bV;j++){try{if(bX[bU[j].name].required===true){this.bindEvent(bU[j],br,this.__n);
}}catch(e){console.log(e);
}}}if(this.__j===false){if(hjx.Form.getFormCollection(cb[i].id)&&this.hijaxHistory.getState()==hjx.Form.getFormCollection(cb[i].id).parentDocument){hjx.Form.deserializeForm(cb[i].id);
}}else{if(hjx.Form.getFormCollection(cb[i].id)&&this.hijaxHistory.getState()==hjx.Form.getFormCollection(cb[i].id).parentDocument){hjx.Form.setFormCollection(cb[i].id,null);
}}this.bindEvent(cb[i],be,this.__n);
qx.event.Registration.addListener(cb[i],R,function(){});
}this.__j=false;
},__n:function(event){var cr=hjx.Hijax;
event.preventDefault();
event.stopPropagation();
var cq=event.getTarget()||event.srcElement;
cr.__w(event.getType?event.getType():event.type);
cr.__j=true;

switch(cr.__x()){case bk:while(cq!=null&&typeof cq.href==M){cq=cq.parentNode;
}var cA=cq.href;
if(new RegExp(cr.getSOPDomainRegExp(),I).test(cA)){var cy=cA.substring(cr.url.length);
cr.__g=cr.__s(cr.hijaxHistory.getState());
var cw=cy.indexOf(N);

if(cy==cr.__g&&cw!=-1){cr.__o(cy);
return;
}cr.__t(cy,cr.__x());
cr.hijaxHistory.addToHistory(cr.__r(cy));
}else{window.open(cA);
}break;
case L:while(cq!=null&&cq.nodeName.toLowerCase()!=bG){cq=cq.parentNode;
}cr.__l={domElem:cq,meth:cq.method,id:cq.id,action:cq.action};
var cu=hjx.Form.validateForm(cr.__l.id);

if(cu===false){return;
}if(new RegExp(cr.getSOPDomainRegExp(),I).test(cr.__l.action)||!(/\w+\:\/\//.test(cr.__l.action))){hjx.Form.setParentDocument(cr.hijaxHistory.getState());
var cx=cr.__l.action.indexOf(cr.url);

if(cx==-1){var cy=cr.__l.action;
}else{var cy=cr.__l.action.substring(cr.url.length);
}cr.__t(cr.__r(cy),cr.__x());

if(cy==cr.__g){cr.__o(cy);
}else{cr.hijaxHistory.addToHistory(cr.__r(cy));
}}break;
case bC:var cv=cq;

while(cq!=null&&cq.nodeName.toLowerCase()!=bG){cq=cq.parentNode;
}var ct={domElem:cq,meth:cq.method,id:cq.id,action:cq.action};
var cs=cr.__f._forms[ct.id];

try{var cz=hjx.Form.validateField(cv,cs[cv.name].type,cs[cv.name].required);

if(cz===true&&cs[cv.name].prompt!==false){hjx.Form.validateFieldServerSide(cv,cs[cv.name].prompt.url);
}}catch(e){console.log(e);
}break;
}},__o:function(bJ){var bL=bJ;
var bR=bJ;
var bS=null;
var bM=bJ.indexOf(N);

if(bM!=-1){bR=bJ.substring(0,bM);
bS=bJ.substring(bM+1);
this.__i=document.getElementById(bS)||document.getElementsByName(bS)[0]||document.body;
}var bP=this.__g||J;
var bN=bP.indexOf(N);

if(bN!=-1){bP=this.__g.substring(0,bN);
}
if(bP==bR&&this.__x()!=L){this.__i.scrollIntoView(true);
this.__i=document.body;
return;
}this.__g=bJ;
bL=this.url+bR;
switch(this.__x()){case L:if(this.__j===false){if(!confirm(hjx.Form.POSTretry(qx.core.Client.getLocale()))){return;
}var bO=hjx.Form.encodeForm(this.__l.domElem);
}else{var bO=hjx.Form.serializeForm(this.__l.domElem);
}var bK=new qx.io.remote.Request(bL,this.__l.meth.toUpperCase(),K);
bK.setRequestHeader(X,bx);
bK.setData(bO);
break;
default:var bK=new qx.io.remote.Request(bL,W,K);
}bK.setRequestHeader(bt,bo);
this.__u(bh);
if(document.getElementById(bF)){var bQ=document.getElementById(bF);
}bK.addListener(bw,function(g){var v=g.getContent();
var w=g.getStatusCode();

if(w>=200&&w<300){if(typeof this.__f._pages[bR]!=M&&this.__x()==this.__f._pages[bR].event){var m=document.getElementById(this.__f._pages[bR].DOMElem)||document[this.__f._pages[bR].DOMElem];
}else{var m=document.getElementById(this.__f._pages[O].DOMElem)||document[this.__f._pages[O].DOMElem];
}for(var k in this.__f._navi){if(k==F){for(var i=0,l=this.__f._navi[k].selector.length;i<l;i++){var q=this.__f._navi[k].selector[i];
var s=qx.bom.Selector.query(q);
var t=this.__f._navi[k].active[0];

for(var j=0,h=s.length;j<h;j++){if(s[j].href==bL){s[j].className=s[j].className+bq+t;
}else if(s[j].className.indexOf(t)>=0){var r=s[j].className.substr(0,s[j].className.indexOf(t));
var n=s[j].className.substr(s[j].className.indexOf(t)+t.length);
s[j].className=r+n;
}}}}}var p=this.__q(v);
document.title=p.title;
var o=p.body;
o.__p=function(ce){if(ce==J){return;
}var cf=this.getElementsByTagName(O);

for(var i=0,l=cf.length;i<l;i++){if(cf[i].id==ce){return cf[i];
}}};

if(typeof this.__f._pages[bR]!=M&&this.__x()==this.__f._pages[bR].event){o=o.__p(this.__f._pages[bR].DOMElem)||o;
var m=document.getElementById(this.__f._pages[bR].DOMElem)||document[this.__f._pages[bR].DOMElem];
m.innerHTML=o.innerHTML;
}else{o=o.__p(this.__f._pages[O].DOMElem)||o;
var m=document.getElementById(this.__f._pages[O].DOMElem)||document[this.__f._pages[O].DOMElem];
m.innerHTML=o.innerHTML;
}this.__i=document.getElementById(bS)||document.getElementsByName(bS)[0]||document.body;
this.__i.scrollIntoView(true);
if(bQ){document.body.appendChild(bQ);
}this.__m();
for(var u in this.__f._scripts){if(u==F||u==bR){for(var i=0,l=this.__f._scripts[u].length;i<l;i++){eval(this.__f._scripts[u][i]);
}}}this.__v();
}},this);
bK.addListener(bf,function(a){var b=a.getStatusCode().toString();
this._httpError(b,bL);
this.__v();
},this);
bK.send();
},__q:function(y){var A=/<title>([\w\W\s]*)<\/title>/i;
var B=y.match(A)||document.title;
var E=/<body[\w\W\s]*<\/body>/i;
var C=y.match(E);
var z=document.createDocumentFragment();
var D=document.createElement(bs);
D.innerHTML=C;
z.appendChild(D);
return {title:B[1],body:z.firstChild};
},__r:function(bI){return bI.replace(/(.*)#(.*)/g,bi);
},__s:function(cd){return cd.replace(/(.*)~(.*)/g,bu);
},__t:function(cg,ch){this.historyReqMeth[cg]=ch;
},__u:function(ck){document.getElementsByTagName(G)[0].style.cursor=ck;
},__v:function(){document.getElementsByTagName(G)[0].style.cursor=bz;
},__w:function(cp){this.__k=cp;
},__x:function(){return this.__k;
},__y:function(){this.__k=null;
},getSOPDomainRegExp:function(){var cm=qx.lang.String.escapeRegexpChars(this.domain);
var cl=bg+cm+bc;
return cl;
},_httpError:function(cn,co){switch(cn){case bD:alert("Error 400: Bad Request!");
break;
case bd:alert("Error 401: Unauthorized!");
break;
case U:alert("Error 403: Forbidden!");
break;
case bj:alert("Error 404: Page "+co+" Not Found!");
break;
case bm:alert("Error 405: Method Not Allowed!");
break;
case Q:case T:case Y:case bl:case bb:case by:alert("Error "+cn+": Internal Server Error!");
break;
}},bindEvent:function(c,d,f){qx.event.Registration.addListener(c,d,f);
}}});
})();
(function(){var g="This should never fail!",f="A rose by any other name is still a rose",e="Can false be true?!",d="hjx.test.DemoTest",c="You must be kidding, 3 can never be outside [1,10]!";
qx.Class.define(d,{extend:qx.dev.unit.TestCase,members:{testSimple:function(){this.assertEquals(4,3+1,g);
this.assertFalse(false,e);
},testAdvanced:function(){var a=3;
var b=a;
this.assertIdentical(a,b,f);
this.assertInRange(3,1,10,c);
}}});
})();


if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) qx.event.handler.Application.onScriptLoaded();

