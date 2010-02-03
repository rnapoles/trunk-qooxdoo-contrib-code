(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!window.qxsettings) qxsettings = {};
var settings = {"qx.application":"testie.Application","qx.theme":"testie.theme.Theme","qx.version":"1.1-pre"};
for (var k in settings) qxsettings[k] = settings[k];

if (!window.qxvariants) qxvariants = {};
var variants = {"qx.debug":"off"};
for (var k in variants) qxvariants[k] = variants[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"script"},"qx":{"resourceUri":"resource","sourceUri":"script","version":"1.1-pre"},"testie":{"resourceUri":"resource","sourceUri":"script","version":"trunk"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {};
qx.$$locales = {"C":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EEEd":"d EEE","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_Hms":"H:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMMEd":"E, MMMM d","cldr_date_time_format_MMMMd":"MMMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, M/d/yyyy","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"EEE, MMM d, y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_abbreviated_fri":"Fri","cldr_day_stand-alone_abbreviated_mon":"Mon","cldr_day_stand-alone_abbreviated_sat":"Sat","cldr_day_stand-alone_abbreviated_sun":"Sun","cldr_day_stand-alone_abbreviated_thu":"Thu","cldr_day_stand-alone_abbreviated_tue":"Tue","cldr_day_stand-alone_abbreviated_wed":"Wed","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"Friday","cldr_day_stand-alone_wide_mon":"Monday","cldr_day_stand-alone_wide_sat":"Saturday","cldr_day_stand-alone_wide_sun":"Sunday","cldr_day_stand-alone_wide_thu":"Thursday","cldr_day_stand-alone_wide_tue":"Tuesday","cldr_day_stand-alone_wide_wed":"Wednesday","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"},"en":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EEEd":"d EEE","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_Hms":"H:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMMEd":"E, MMMM d","cldr_date_time_format_MMMMd":"MMMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, M/d/yyyy","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"EEE, MMM d, y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_abbreviated_fri":"Fri","cldr_day_stand-alone_abbreviated_mon":"Mon","cldr_day_stand-alone_abbreviated_sat":"Sat","cldr_day_stand-alone_abbreviated_sun":"Sun","cldr_day_stand-alone_abbreviated_thu":"Thu","cldr_day_stand-alone_abbreviated_tue":"Tue","cldr_day_stand-alone_abbreviated_wed":"Wed","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"Friday","cldr_day_stand-alone_wide_mon":"Monday","cldr_day_stand-alone_wide_sat":"Saturday","cldr_day_stand-alone_wide_sun":"Sunday","cldr_day_stand-alone_wide_thu":"Thursday","cldr_day_stand-alone_wide_tue":"Tuesday","cldr_day_stand-alone_wide_wed":"Wednesday","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"}};
qx.$$i18n    = {};
qx.$$packageData = {};

qx.$$loader = {
  parts : {"boot":[0]},
  uris : [["testie:testie.js"]],
  urisBefore : [],
  packageHashes : {"0":"ae25de56fffa"},
  boot : "boot",
  bootIsInline : true,
  
  decodeUris : function(compressedUris)
  {
    var libs = qx.$$libraries;
    var uris = [];
    for (var i=0; i<compressedUris.length; i++)
    {
      var uri = compressedUris[i].split(":");
      var euri;
      if (uri.length==2 && uri[0] in libs) {
        var prefix = libs[uri[0]].sourceUri;
        euri = prefix + "/" + uri[1];
      } else {
        euri = compressedUris[i];
      }
      
      uris.push(euri);
    }
    return uris;      
  }
};  

function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function()
  {
    if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")
    {
      elem.onreadystatechange = elem.onload = null;
      callback();
    }
  };
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

var isWebkit = /AppleWebKit\/([^ ]+)/.test(navigator.userAgent);

function loadScriptList(list, callback) {
  if (list.length == 0) {
    callback();
    return;
  }
  loadScript(list.shift(), function() {
    if (isWebkit) {
      // force asynchronous load
      // Safari fails with an "maximum recursion depth exceeded" error if it is
      // called sync.      
      window.setTimeout(function() {
        loadScriptList(list, callback);
      }, 0);
    } else {
      loadScriptList(list, callback);
    }
  });
}

var fireContentLoadedEvent = function() {
  qx.$$domReady = true;
  document.removeEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
};
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
}

qx.$$loader.importPackageData = function (dataMap) {
  if (dataMap["resources"]){
    var resMap = dataMap["resources"];
    for (var k in resMap) qx.$$resources[k] = resMap[k];
  }
}

qx.$$loader.signalStartup = function () {
  if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) qx.event.handler.Application.onScriptLoaded();
}

qx.$$loader.init = function(){
  var l=qx.$$loader;
  if (l.urisBefore.length>0){
    loadScriptList(l.urisBefore, function(){return;});
  }
  var bootPackageHash=l.packageHashes[l.parts[l.boot][0]];
  if (l.bootIsInline){
    l.importPackageData(qx.$$packageData[bootPackageHash]);
    l.signalStartup();
  } else {
    loadScriptList(l.decodeUris(l.uris[l.parts[l.boot]]), function(){
      // Opera needs this extra time to parse the scripts
      window.setTimeout(function(){
        l.importPackageData(qx.$$packageData[bootPackageHash]);
        l.signalStartup();
      }, 0);
    });
  }
}
})();

qx.$$packageData['ae25de56fffa']={"resources":{"qx/decoration/Modern/app-header.png":[110,20,"png","qx"],"qx/decoration/Modern/arrows-combined.png":[87,8,"png","qx"],"qx/decoration/Modern/arrows/down-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-74,0],"qx/decoration/Modern/arrows/down-small-invert.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-69,0],"qx/decoration/Modern/arrows/down-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-49,0],"qx/decoration/Modern/arrows/down.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-20,0],"qx/decoration/Modern/arrows/forward.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-59,0],"qx/decoration/Modern/arrows/left-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",0,0],"qx/decoration/Modern/arrows/left.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-44,0],"qx/decoration/Modern/arrows/rewind.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-10,0],"qx/decoration/Modern/arrows/right-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-5,0],"qx/decoration/Modern/arrows/right.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-54,0],"qx/decoration/Modern/arrows/up-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-28,0],"qx/decoration/Modern/arrows/up-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-82,0],"qx/decoration/Modern/arrows/up.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-36,0],"qx/decoration/Modern/button-lr-combined.png":[72,52,"png","qx"],"qx/decoration/Modern/button-tb-combined.png":[4,216,"png","qx"],"qx/decoration/Modern/checkradio-combined.png":[504,14,"png","qx"],"qx/decoration/Modern/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Modern/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Modern/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",0,0],"qx/decoration/Modern/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Modern/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",-35,0],"qx/decoration/Modern/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Modern/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-52,0],"qx/decoration/Modern/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-33,0],"qx/decoration/Modern/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-20,0],"qx/decoration/Modern/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Modern/cursors-combined.gif",0,0],"qx/decoration/Modern/form/button-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-72],"qx/decoration/Modern/form/button-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-204],"qx/decoration/Modern/form/button-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-188],"qx/decoration/Modern/form/button-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-36],"qx/decoration/Modern/form/button-checked-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-84],"qx/decoration/Modern/form/button-checked-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-184],"qx/decoration/Modern/form/button-checked-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-156],"qx/decoration/Modern/form/button-checked-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-208],"qx/decoration/Modern/form/button-checked-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-160],"qx/decoration/Modern/form/button-checked-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-40,0],"qx/decoration/Modern/form/button-checked-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-32,0],"qx/decoration/Modern/form/button-checked-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-28],"qx/decoration/Modern/form/button-checked-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-24],"qx/decoration/Modern/form/button-checked-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-48],"qx/decoration/Modern/form/button-checked-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-checked-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-16,0],"qx/decoration/Modern/form/button-checked-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-60,0],"qx/decoration/Modern/form/button-checked-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-140],"qx/decoration/Modern/form/button-checked-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-56],"qx/decoration/Modern/form/button-checked-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-112],"qx/decoration/Modern/form/button-checked.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-disabled-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-40],"qx/decoration/Modern/form/button-disabled-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-136],"qx/decoration/Modern/form/button-disabled-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-16],"qx/decoration/Modern/form/button-disabled-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-disabled-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-68,0],"qx/decoration/Modern/form/button-disabled-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-4,0],"qx/decoration/Modern/form/button-disabled-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-116],"qx/decoration/Modern/form/button-disabled-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-168],"qx/decoration/Modern/form/button-disabled-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-60],"qx/decoration/Modern/form/button-disabled.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-68],"qx/decoration/Modern/form/button-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-144],"qx/decoration/Modern/form/button-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-8],"qx/decoration/Modern/form/button-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-24,0],"qx/decoration/Modern/form/button-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-44,0],"qx/decoration/Modern/form/button-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-192],"qx/decoration/Modern/form/button-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-148],"qx/decoration/Modern/form/button-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-104],"qx/decoration/Modern/form/button-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-hovered-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-108],"qx/decoration/Modern/form/button-hovered-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-32],"qx/decoration/Modern/form/button-hovered-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-128],"qx/decoration/Modern/form/button-hovered-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-hovered-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-20,0],"qx/decoration/Modern/form/button-hovered-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-48,0],"qx/decoration/Modern/form/button-hovered-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-44],"qx/decoration/Modern/form/button-hovered-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-76],"qx/decoration/Modern/form/button-hovered-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-88],"qx/decoration/Modern/form/button-hovered.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-56,0],"qx/decoration/Modern/form/button-preselected-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-124],"qx/decoration/Modern/form/button-preselected-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-176],"qx/decoration/Modern/form/button-preselected-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-200],"qx/decoration/Modern/form/button-preselected-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-4],"qx/decoration/Modern/form/button-preselected-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-152],"qx/decoration/Modern/form/button-preselected-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-28,0],"qx/decoration/Modern/form/button-preselected-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-36,0],"qx/decoration/Modern/form/button-preselected-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-196],"qx/decoration/Modern/form/button-preselected-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-164],"qx/decoration/Modern/form/button-preselected-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-212],"qx/decoration/Modern/form/button-preselected-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-preselected-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-8,0],"qx/decoration/Modern/form/button-preselected-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-64,0],"qx/decoration/Modern/form/button-preselected-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-96],"qx/decoration/Modern/form/button-preselected-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-80],"qx/decoration/Modern/form/button-preselected-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-132],"qx/decoration/Modern/form/button-preselected.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-pressed-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-12],"qx/decoration/Modern/form/button-pressed-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-52],"qx/decoration/Modern/form/button-pressed-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-20],"qx/decoration/Modern/form/button-pressed-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-pressed-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-52,0],"qx/decoration/Modern/form/button-pressed-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-12,0],"qx/decoration/Modern/form/button-pressed-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-100],"qx/decoration/Modern/form/button-pressed-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-172],"qx/decoration/Modern/form/button-pressed-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-64],"qx/decoration/Modern/form/button-pressed.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",0,0],"qx/decoration/Modern/form/button-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-92],"qx/decoration/Modern/form/button-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-120],"qx/decoration/Modern/form/button-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-180],"qx/decoration/Modern/form/button.png":[80,60,"png","qx"],"qx/decoration/Modern/form/checkbox-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-126,0],"qx/decoration/Modern/form/checkbox-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-322,0],"qx/decoration/Modern/form/checkbox-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-294,0],"qx/decoration/Modern/form/checkbox-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-364,0],"qx/decoration/Modern/form/checkbox-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-490,0],"qx/decoration/Modern/form/checkbox-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-224,0],"qx/decoration/Modern/form/checkbox-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-378,0],"qx/decoration/Modern/form/checkbox-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-84,0],"qx/decoration/Modern/form/checkbox-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-182,0],"qx/decoration/Modern/form/checkbox-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-42,0],"qx/decoration/Modern/form/checkbox-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-392,0],"qx/decoration/Modern/form/checkbox-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-210,0],"qx/decoration/Modern/form/checkbox-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-14,0],"qx/decoration/Modern/form/checkbox-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-238,0],"qx/decoration/Modern/form/checkbox-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-462,0],"qx/decoration/Modern/form/checkbox-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-112,0],"qx/decoration/Modern/form/checkbox-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-448,0],"qx/decoration/Modern/form/checkbox.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-140,0],"qx/decoration/Modern/form/input-focused.png":[40,12,"png","qx"],"qx/decoration/Modern/form/input.png":[84,12,"png","qx"],"qx/decoration/Modern/form/radiobutton-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-196,0],"qx/decoration/Modern/form/radiobutton-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-168,0],"qx/decoration/Modern/form/radiobutton-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-98,0],"qx/decoration/Modern/form/radiobutton-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-308,0],"qx/decoration/Modern/form/radiobutton-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-406,0],"qx/decoration/Modern/form/radiobutton-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-28,0],"qx/decoration/Modern/form/radiobutton-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-350,0],"qx/decoration/Modern/form/radiobutton-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-266,0],"qx/decoration/Modern/form/radiobutton-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-252,0],"qx/decoration/Modern/form/radiobutton-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-336,0],"qx/decoration/Modern/form/radiobutton-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-476,0],"qx/decoration/Modern/form/radiobutton-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-420,0],"qx/decoration/Modern/form/radiobutton-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-56,0],"qx/decoration/Modern/form/radiobutton-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",0,0],"qx/decoration/Modern/form/radiobutton-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-154,0],"qx/decoration/Modern/form/radiobutton-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-434,0],"qx/decoration/Modern/form/radiobutton-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-280,0],"qx/decoration/Modern/form/radiobutton.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-70,0],"qx/decoration/Modern/form/tooltip-error-arrow.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-b.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-30],"qx/decoration/Modern/form/tooltip-error-bl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-24],"qx/decoration/Modern/form/tooltip-error-br.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-c.png":[40,18,"png","qx"],"qx/decoration/Modern/form/tooltip-error-l.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",-6,0],"qx/decoration/Modern/form/tooltip-error-r.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-t.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-6],"qx/decoration/Modern/form/tooltip-error-tl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-18],"qx/decoration/Modern/form/tooltip-error-tr.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-12],"qx/decoration/Modern/form/tooltip-error.png":[127,30,"png","qx"],"qx/decoration/Modern/groupbox-lr-combined.png":[8,51,"png","qx"],"qx/decoration/Modern/groupbox-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-b.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-12],"qx/decoration/Modern/groupbox/groupbox-bl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-16],"qx/decoration/Modern/groupbox/groupbox-br.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-8],"qx/decoration/Modern/groupbox/groupbox-c.png":[40,51,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-l.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",-4,0],"qx/decoration/Modern/groupbox/groupbox-r.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-t.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-4],"qx/decoration/Modern/groupbox/groupbox-tl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-tr.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-20],"qx/decoration/Modern/groupbox/groupbox.png":[255,59,"png","qx"],"qx/decoration/Modern/menu-background-combined.png":[80,49,"png","qx"],"qx/decoration/Modern/menu-checkradio-combined.gif":[64,7,"gif","qx"],"qx/decoration/Modern/menu/background.png":[40,49,"png","qx","qx/decoration/Modern/menu-background-combined.png",-40,0],"qx/decoration/Modern/menu/bar-background.png":[40,20,"png","qx","qx/decoration/Modern/menu-background-combined.png",0,0],"qx/decoration/Modern/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-16,0],"qx/decoration/Modern/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-48,0],"qx/decoration/Modern/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-32,0],"qx/decoration/Modern/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",0,0],"qx/decoration/Modern/pane-lr-combined.png":[12,238,"png","qx"],"qx/decoration/Modern/pane-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/pane/pane-b.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-30],"qx/decoration/Modern/pane/pane-bl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-18],"qx/decoration/Modern/pane/pane-br.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-12],"qx/decoration/Modern/pane/pane-c.png":[40,238,"png","qx"],"qx/decoration/Modern/pane/pane-l.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",0,0],"qx/decoration/Modern/pane/pane-r.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",-6,0],"qx/decoration/Modern/pane/pane-t.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,0],"qx/decoration/Modern/pane/pane-tl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-24],"qx/decoration/Modern/pane/pane-tr.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-6],"qx/decoration/Modern/pane/pane.png":[185,250,"png","qx"],"qx/decoration/Modern/scrollbar-combined.png":[54,12,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-horizontal.png":[76,15,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-horizontal.png":[19,10,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-vertical.png":[10,19,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-vertical.png":[15,76,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-horizontal.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-34,0],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-vertical.png":[10,12,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-6,0],"qx/decoration/Modern/scrollbar/scrollbar-down.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-28,0],"qx/decoration/Modern/scrollbar/scrollbar-left.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-50,0],"qx/decoration/Modern/scrollbar/scrollbar-right.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-46,0],"qx/decoration/Modern/scrollbar/scrollbar-up.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",0,0],"qx/decoration/Modern/scrollbar/slider-knob-background.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-16,0],"qx/decoration/Modern/selection.png":[110,20,"png","qx"],"qx/decoration/Modern/shadow-lr-combined.png":[30,382,"png","qx"],"qx/decoration/Modern/shadow-small-lr-combined.png":[10,136,"png","qx"],"qx/decoration/Modern/shadow-small-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/shadow-tb-combined.png":[15,90,"png","qx"],"qx/decoration/Modern/shadow/shadow-b.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-30],"qx/decoration/Modern/shadow/shadow-bl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-br.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-45],"qx/decoration/Modern/shadow/shadow-c.png":[40,382,"png","qx"],"qx/decoration/Modern/shadow/shadow-l.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-r.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",-15,0],"qx/decoration/Modern/shadow/shadow-small-b.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-20],"qx/decoration/Modern/shadow/shadow-small-bl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-small-br.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-10],"qx/decoration/Modern/shadow/shadow-small-c.png":[40,136,"png","qx"],"qx/decoration/Modern/shadow/shadow-small-l.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-r.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",-5,0],"qx/decoration/Modern/shadow/shadow-small-t.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-5],"qx/decoration/Modern/shadow/shadow-small-tl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-tr.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-25],"qx/decoration/Modern/shadow/shadow-small.png":[114,146,"png","qx"],"qx/decoration/Modern/shadow/shadow-t.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-60],"qx/decoration/Modern/shadow/shadow-tl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-75],"qx/decoration/Modern/shadow/shadow-tr.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow.png":[381,412,"png","qx"],"qx/decoration/Modern/splitpane-knobs-combined.png":[8,9,"png","qx"],"qx/decoration/Modern/splitpane/knob-horizontal.png":[1,8,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,-1],"qx/decoration/Modern/splitpane/knob-vertical.png":[8,1,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,0],"qx/decoration/Modern/table-combined.png":[94,18,"png","qx"],"qx/decoration/Modern/table/ascending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",0,0],"qx/decoration/Modern/table/boolean-false.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-80,0],"qx/decoration/Modern/table/boolean-true.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-26,0],"qx/decoration/Modern/table/descending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",-18,0],"qx/decoration/Modern/table/header-cell.png":[40,18,"png","qx","qx/decoration/Modern/table-combined.png",-40,0],"qx/decoration/Modern/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Modern/table-combined.png",-8,0],"qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png":[10,14,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-lr-combined.png":[10,12,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-pane-lr-combined.png":[60,2,"png","qx"],"qx/decoration/Modern/tabview-pane-tb-combined.png":[30,180,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-bottom-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-bottom-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-bottom-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-l.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-r.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-bottom-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-bottom-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active.png":[49,24,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-left-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-left-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-left-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-left-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-left-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-left-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-right-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-right-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-right-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-right-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-right-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-right-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-top-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-top-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-top-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-l.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-r.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-top-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-top-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-top-active.png":[48,22,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-b.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-60],"qx/decoration/Modern/tabview/tabview-pane-bl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-br.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-120],"qx/decoration/Modern/tabview/tabview-pane-c.png":[40,120,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-l.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-r.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",-30,0],"qx/decoration/Modern/tabview/tabview-pane-t.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-150],"qx/decoration/Modern/tabview/tabview-pane-tl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-30],"qx/decoration/Modern/tabview/tabview-pane-tr.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-90],"qx/decoration/Modern/tabview/tabview-pane.png":[185,250,"png","qx"],"qx/decoration/Modern/toolbar-combined.png":[80,130,"png","qx"],"qx/decoration/Modern/toolbar/toolbar-gradient-blue.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",-40,0],"qx/decoration/Modern/toolbar/toolbar-gradient.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",0,0],"qx/decoration/Modern/toolbar/toolbar-handle-knob.gif":[1,8,"gif","qx"],"qx/decoration/Modern/toolbar/toolbar-part.gif":[7,1,"gif","qx"],"qx/decoration/Modern/tooltip-error-lr-combined.png":[12,18,"png","qx"],"qx/decoration/Modern/tooltip-error-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/tree-combined.png":[32,8,"png","qx"],"qx/decoration/Modern/tree/closed-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-24,0],"qx/decoration/Modern/tree/closed.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-16,0],"qx/decoration/Modern/tree/open-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-8,0],"qx/decoration/Modern/tree/open.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",0,0],"qx/decoration/Modern/window-captionbar-buttons-combined.png":[108,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-active-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-inactive-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-active-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-inactive-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-statusbar-lr-combined.png":[8,7,"png","qx"],"qx/decoration/Modern/window-statusbar-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/window/captionbar-active-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-active-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-active-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-active-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-active-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-active-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-active-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-active.png":[69,21,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-inactive-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-inactive-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-inactive-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-inactive-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-inactive.png":[69,21,"png","qx"],"qx/decoration/Modern/window/close-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-27,0],"qx/decoration/Modern/window/close-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-9,0],"qx/decoration/Modern/window/close-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-90,0],"qx/decoration/Modern/window/maximize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-18,0],"qx/decoration/Modern/window/maximize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-81,0],"qx/decoration/Modern/window/maximize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-54,0],"qx/decoration/Modern/window/minimize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-63,0],"qx/decoration/Modern/window/minimize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-72,0],"qx/decoration/Modern/window/minimize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-36,0],"qx/decoration/Modern/window/restore-active-hovered.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",0,0],"qx/decoration/Modern/window/restore-active.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-99,0],"qx/decoration/Modern/window/restore-inactive.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-45,0],"qx/decoration/Modern/window/statusbar-b.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-16],"qx/decoration/Modern/window/statusbar-bl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-20],"qx/decoration/Modern/window/statusbar-br.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-4],"qx/decoration/Modern/window/statusbar-c.png":[40,7,"png","qx"],"qx/decoration/Modern/window/statusbar-l.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",-4,0],"qx/decoration/Modern/window/statusbar-r.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",0,0],"qx/decoration/Modern/window/statusbar-t.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,0],"qx/decoration/Modern/window/statusbar-tl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-8],"qx/decoration/Modern/window/statusbar-tr.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-12],"qx/decoration/Modern/window/statusbar.png":[369,15,"png","qx"],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/internet-feed-reader.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/internet-telephony.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-color-chooser.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-document.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/22/apps/preferences-wallpaper.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-calculator.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/office-document.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-open.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder.png":[22,22,"png","qx"],"qx/icon/Tango/32/apps/office-address-book.png":[32,32,"png","qx"],"qx/icon/Tango/32/mimetypes/office-document.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder-open.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder.png":[32,32,"png","qx"],"qx/icon/Tango/32/status/dialog-error.png":[32,32,"png","qx"],"qx/static/blank.gif":[1,1,"gif","qx"]}};
(function(){var be="toString",bd=".",bc="default",bb="Object",ba='"',Y="Array",X="()",W="String",V="Function",U=".prototype",bC="function",bB="Boolean",bA="Error",bz="RegExp",by="warn",bx="hasOwnProperty",bw="string",bv="toLocaleString",bu='\", "',bt="info",bl="BROKEN_IE",bm="isPrototypeOf",bj="Date",bk="",bh="qx.Bootstrap",bi="]",bf="Class",bg="error",bn="[Class ",bo="valueOf",bq="Number",bp="count",bs="debug",br="ES5";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return bn+this.classname+bi;
},createNamespace:function(name,h){var k=name.split(bd);
var parent=window;
var j=k[0];

for(var i=0,m=k.length-1;i<m;i++,j=k[i]){if(!parent[j]){parent=parent[j]={};
}else{parent=parent[j];
}}parent[j]=h;
return j;
},setDisplayName:function(r,s,name){r.displayName=s+bd+name+X;
},setDisplayNames:function(bO,bP){for(var name in bO){var bQ=bO[name];

if(bQ instanceof Function){bQ.displayName=bP+bd+name+X;
}}},define:function(name,K){if(!K){var K={statics:{}};
}var P;
var N=null;
qx.Bootstrap.setDisplayNames(K.statics,name);

if(K.members){qx.Bootstrap.setDisplayNames(K.members,name+U);
P=K.construct||new Function;
var L=K.statics;

for(var M in L){P[M]=L[M];
}N=P.prototype;
var Q=K.members;

for(var M in Q){N[M]=Q[M];
}}else{P=K.statics||{};
}var O=this.createNamespace(name,P);
P.name=P.classname=name;
P.basename=O;
P.$$type=bf;
if(!P.hasOwnProperty(be)){P.toString=this.genericToString;
}if(K.defer){K.defer(P,N);
}qx.Bootstrap.$$registry[name]=K.statics;
return P;
}};
qx.Bootstrap.define(bh,{statics:{LOADSTART:qx.$$start||new Date(),createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,getByName:function(name){return qx.Bootstrap.$$registry[name];
},$$registry:{},objectGetLength:({"count":function(F){return F.__count__;
},"default":function(bG){var length=0;

for(var bH in bG){length++;
}return length;
}})[(({}).__count__==0)?bp:bc],objectMergeWith:function(G,H,I){if(I===undefined){I=true;
}
for(var J in H){if(I||G[J]===undefined){G[J]=H[J];
}}return G;
},__a:[bm,bx,bv,be,bo],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(A){var B=[];

for(var E in A){B.push(E);
}var C=qx.Bootstrap.__a;
var D=Object.prototype.hasOwnProperty;

for(var i=0,a=C,l=a.length;i<l;i++){if(D.call(A,a[i])){B.push(a[i]);
}}return B;
},"default":function(x){var y=[];

for(var z in x){y.push(z);
}return y;
}})[typeof (Object.keys)==
bC?br:
(function(){for(var bF in {toString:1}){return bF;
}})()!==be?bl:bc],getKeysAsString:function(n){var o=qx.Bootstrap.getKeys(n);

if(o.length==0){return bk;
}return ba+o.join(bu)+ba;
},__b:{"[object String]":W,"[object Array]":Y,"[object Object]":bb,"[object RegExp]":bz,"[object Number]":bq,"[object Boolean]":bB,"[object Date]":bj,"[object Function]":V,"[object Error]":bA},firstUp:function(w){return w.charAt(0).toUpperCase()+w.substr(1);
},firstLow:function(f){return f.charAt(0).toLowerCase()+f.substr(1);
},getClass:function(bI){var bJ=Object.prototype.toString.call(bI);
return (qx.Bootstrap.__b[bJ]||bJ.slice(8,-1));
},isString:function(bD){return (bD!==null&&(typeof bD===bw||qx.Bootstrap.getClass(bD)==W||bD instanceof String||(!!bD&&!!bD.$$isString)));
},isArray:function(bK){return (bK!==null&&(bK instanceof Array||(bK&&qx.data&&qx.data.IListData&&qx.Bootstrap.hasInterface(bK.constructor,qx.data.IListData))||qx.Bootstrap.getClass(bK)==Y||(!!bK&&!!bK.$$isArray)));
},isObject:function(v){return (v!==undefined&&v!==null&&qx.Bootstrap.getClass(v)==bb);
},isFunction:function(bL){return qx.Bootstrap.getClass(bL)==V;
},classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;
},getPropertyDefinition:function(R,name){while(R){if(R.$$properties&&R.$$properties[name]){return R.$$properties[name];
}R=R.superclass;
}return null;
},hasProperty:function(g,name){return !!qx.Bootstrap.getPropertyDefinition(g,name);
},getEventType:function(t,name){var t=t.constructor;

while(t.superclass){if(t.$$events&&t.$$events[name]!==undefined){return t.$$events[name];
}t=t.superclass;
}return null;
},supportsEvent:function(bE,name){return !!qx.Bootstrap.getEventType(bE,name);
},getByInterface:function(bT,bU){var bV,i,l;

while(bT){if(bT.$$implements){bV=bT.$$flatImplements;

for(i=0,l=bV.length;i<l;i++){if(bV[i]===bU){return bT;
}}}bT=bT.superclass;
}return null;
},hasInterface:function(S,T){return !!qx.Bootstrap.getByInterface(S,T);
},getMixins:function(b){var c=[];

while(b){if(b.$$includes){c.push.apply(c,b.$$flatIncludes);
}b=b.superclass;
}return c;
},$$logs:[],debug:function(bM,bN){qx.Bootstrap.$$logs.push([bs,arguments]);
},info:function(p,q){qx.Bootstrap.$$logs.push([bt,arguments]);
},warn:function(bR,bS){qx.Bootstrap.$$logs.push([by,arguments]);
},error:function(d,e){qx.Bootstrap.$$logs.push([bg,arguments]);
},trace:function(u){}}});
})();
(function(){var p="other",o="widgets",n="fonts",m="appearances",k="qx.Theme",j="]",h="[Theme ",g="colors",f="decorations",e="Theme",b="meta",d="borders",c="icons";
qx.Bootstrap.define(k,{statics:{define:function(name,A){if(!A){var A={};
}A.include=this.__c(A.include);
A.patch=this.__c(A.patch);
{};
var B={$$type:e,name:name,title:A.title,toString:this.genericToString};
if(A.extend){B.supertheme=A.extend;
}B.basename=qx.Bootstrap.createNamespace(name,B);
this.__f(B,A);
this.__d(B,A);
this.$$registry[name]=B;
for(var i=0,a=A.include,l=a.length;i<l;i++){this.include(B,a[i]);
}
for(var i=0,a=A.patch,l=a.length;i<l;i++){this.patch(B,a[i]);
}},__c:function(q){if(!q){return [];
}
if(qx.Bootstrap.isArray(q)){return q;
}else{return [q];
}},__d:function(r,s){var t=s.aliases||{};

if(s.extend&&s.extend.aliases){qx.Bootstrap.objectMergeWith(t,s.extend.aliases,false);
}r.aliases=t;
},getAll:function(){return this.$$registry;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},genericToString:function(){return h+this.name+j;
},__e:function(P){for(var i=0,Q=this.__g,l=Q.length;i<l;i++){if(P[Q[i]]){return Q[i];
}}},__f:function(C,D){var G=this.__e(D);
if(D.extend&&!G){G=D.extend.type;
}C.type=G||p;
if(!G){return;
}var I=function(){};
if(D.extend){I.prototype=new D.extend.$$clazz;
}var H=I.prototype;
var F=D[G];
for(var E in F){H[E]=F[E];
if(H[E].base){{};
H[E].base=D.extend;
}}C.$$clazz=I;
C[G]=new I;
},$$registry:{},__g:[g,d,f,n,c,o,m,b],__h:null,__i:null,__j:function(){},patch:function(u,v){var x=this.__e(v);

if(x!==this.__e(u)){throw new Error("The mixins '"+u.name+"' are not compatible '"+v.name+"'!");
}var w=v[x];
var y=u.$$clazz.prototype;

for(var z in w){y[z]=w[z];
}},include:function(J,K){var M=K.type;

if(M!==J.type){throw new Error("The mixins '"+J.name+"' are not compatible '"+K.name+"'!");
}var L=K[M];
var N=J.$$clazz.prototype;

for(var O in L){if(N[O]!==undefined){continue;
}N[O]=L[O];
}}}});
})();
(function(){var j="#CCCCCC",i="#F3F3F3",h="#E4E4E4",g="#1a1a1a",f="#084FAB",e="gray",d="#fffefe",c="white",b="#4a4a4a",a="#EEEEEE",K="#80B4EF",J="#C72B2B",I="#ffffdd",H="#334866",G="#00204D",F="#666666",E="#CBC8CD",D="#99C3FE",C="#808080",B="#F4F4F4",q="#001533",r="#909090",o="#FCFCFC",p="#314a6e",m="#B6B6B6",n="#0880EF",k="#4d4d4d",l="#DFDFDF",s="#000000",t="#FF9999",w="#7B7A7E",v="#26364D",y="#990000",x="#AFAFAF",A="#404955",z="#AAAAAA",u="qx.theme.modern.Color";
qx.Theme.define(u,{colors:{"background-application":l,"background-pane":i,"background-light":o,"background-medium":a,"background-splitpane":x,"background-tip":I,"background-tip-error":J,"background-odd":h,"text-light":r,"text-gray":b,"text-label":g,"text-title":p,"text-input":s,"text-hovered":q,"text-disabled":w,"text-selected":d,"text-active":v,"text-inactive":A,"text-placeholder":E,"border-main":k,"border-separator":C,"border-input":H,"border-disabled":m,"border-pane":G,"border-button":F,"border-column":j,"border-focused":D,"invalid":y,"border-focused-invalid":t,"table-pane":i,"table-focus-indicator":n,"table-row-background-focused-selected":f,"table-row-background-focused":K,"table-row-background-selected":f,"table-row-background-even":i,"table-row-background-odd":h,"table-row-selected":d,"table-row":g,"table-row-line":j,"table-column-line":j,"progressive-table-header":z,"progressive-table-row-background-even":B,"progressive-table-row-background-odd":h,"progressive-progressbar-background":e,"progressive-progressbar-indicator-done":j,"progressive-progressbar-indicator-undone":c,"progressive-progressbar-percent-background":e,"progressive-progressbar-percent-text":c}});
})();
(function(){var a="testie.theme.Color";
qx.Theme.define(a,{extend:qx.theme.modern.Color,colors:{}});
})();
(function(){var h="qx.allowUrlSettings",g="&",f="qx.core.Setting",e="qx.allowUrlVariants",d="qx.propertyDebugLevel",c="qxsetting",b=":",a=".";
qx.Bootstrap.define(f,{statics:{__k:{},define:function(m,n){if(n===undefined){throw new Error('Default value of setting "'+m+'" must be defined!');
}
if(!this.__k[m]){this.__k[m]={};
}else if(this.__k[m].defaultValue!==undefined){throw new Error('Setting "'+m+'" is already defined!');
}this.__k[m].defaultValue=n;
},get:function(k){var l=this.__k[k];

if(l===undefined){throw new Error('Setting "'+k+'" is not defined.');
}
if(l.value!==undefined){return l.value;
}return l.defaultValue;
},set:function(p,q){if((p.split(a)).length<2){throw new Error('Malformed settings key "'+p+'". Must be following the schema "namespace.key".');
}
if(!this.__k[p]){this.__k[p]={};
}this.__k[p].value=q;
},__l:function(){if(window.qxsettings){for(var o in window.qxsettings){this.set(o,window.qxsettings[o]);
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(j){}this.__m();
}},__m:function(){if(this.get(h)!=true){return;
}var t=document.location.search.slice(1).split(g);

for(var i=0;i<t.length;i++){var s=t[i].split(b);

if(s.length!=3||s[0]!=c){continue;
}this.set(s[1],decodeURIComponent(s[2]));
}}},defer:function(r){r.define(h,false);
r.define(e,false);
r.define(d,0);
r.__l();
}});
})();
(function(){var k="function",j="Boolean",h="qx.Interface",g="]",f="toggle",e="Interface",d="is",c="[Interface ";
qx.Bootstrap.define(h,{statics:{define:function(name,a){if(a){if(a.extend&&!(a.extend instanceof Array)){a.extend=[a.extend];
}{};
var b=a.statics?a.statics:{};
if(a.extend){b.$$extends=a.extend;
}
if(a.properties){b.$$properties=a.properties;
}
if(a.members){b.$$members=a.members;
}
if(a.events){b.$$events=a.events;
}}else{var b={};
}b.$$type=e;
b.name=name;
b.toString=this.genericToString;
b.basename=qx.Bootstrap.createNamespace(name,b);
qx.Interface.$$registry[name]=b;
return b;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(q){if(!q){return [];
}var r=q.concat();

for(var i=0,l=q.length;i<l;i++){if(q[i].$$extends){r.push.apply(r,this.flatten(q[i].$$extends));
}}return r;
},__n:function(s,t,u,v){var z=u.$$members;

if(z){for(var y in z){if(qx.Bootstrap.isFunction(z[y])){var x=this.__o(t,y);
var w=x||qx.Bootstrap.isFunction(s[y]);

if(!w){throw new Error('Implementation of method "'+y+'" is missing in class "'+t.classname+'" required by interface "'+u.name+'"');
}var A=v===true&&!x&&!qx.Bootstrap.hasInterface(t,u);

if(A){s[y]=this.__r(u,s[y],y,z[y]);
}}else{if(typeof s[y]===undefined){if(typeof s[y]!==k){throw new Error('Implementation of member "'+y+'" is missing in class "'+t.classname+'" required by interface "'+u.name+'"');
}}}}}},__o:function(L,M){var Q=M.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!Q){return false;
}var N=qx.Bootstrap.firstLow(Q[2]);
var O=qx.Bootstrap.getPropertyDefinition(L,N);

if(!O){return false;
}var P=Q[0]==d||Q[0]==f;

if(P){return qx.Bootstrap.getPropertyDefinition(L,N).check==j;
}return true;
},__p:function(I,J){if(J.$$properties){for(var K in J.$$properties){if(!qx.Bootstrap.getPropertyDefinition(I,K)){throw new Error('The property "'+K+'" is not supported by Class "'+I.classname+'"!');
}}}},__q:function(F,G){if(G.$$events){for(var H in G.$$events){if(!qx.Bootstrap.supportsEvent(F,H)){throw new Error('The event "'+H+'" is not supported by Class "'+F.classname+'"!');
}}}},assertObject:function(B,C){var E=B.constructor;
this.__n(B,E,C,false);
this.__p(E,C);
this.__q(E,C);
var D=C.$$extends;

if(D){for(var i=0,l=D.length;i<l;i++){this.assertObject(B,D[i]);
}}},assert:function(m,n,o){this.__n(m.prototype,m,n,o);
this.__p(m,n);
this.__q(m,n);
var p=n.$$extends;

if(p){for(var i=0,l=p.length;i<l;i++){this.assert(m,p[i],o);
}}},genericToString:function(){return c+this.name+g;
},$$registry:{},__r:function(){},__s:null,__t:function(){}}});
})();
(function(){var q="qx.Mixin",p=".prototype",o="constructor",n="[Mixin ",m="]",k="destruct",j="Mixin";
qx.Bootstrap.define(q,{statics:{define:function(name,r){if(r){if(r.include&&!(r.include instanceof Array)){r.include=[r.include];
}{};
var t=r.statics?r.statics:{};
qx.Bootstrap.setDisplayNames(t,name);

for(var s in t){if(t[s] instanceof Function){t[s].$$mixin=t;
}}if(r.construct){t.$$constructor=r.construct;
qx.Bootstrap.setDisplayName(r.construct,name,o);
}
if(r.include){t.$$includes=r.include;
}
if(r.properties){t.$$properties=r.properties;
}
if(r.members){t.$$members=r.members;
qx.Bootstrap.setDisplayNames(r.members,name+p);
}
for(var s in t.$$members){if(t.$$members[s] instanceof Function){t.$$members[s].$$mixin=t;
}}
if(r.events){t.$$events=r.events;
}
if(r.destruct){t.$$destructor=r.destruct;
qx.Bootstrap.setDisplayName(r.destruct,name,k);
}}else{var t={};
}t.$$type=j;
t.name=name;
t.toString=this.genericToString;
t.basename=qx.Bootstrap.createNamespace(name,t);
this.$$registry[name]=t;
return t;
},checkCompatibility:function(a){var d=this.flatten(a);
var e=d.length;

if(e<2){return true;
}var h={};
var g={};
var f={};
var c;

for(var i=0;i<e;i++){c=d[i];

for(var b in c.events){if(f[b]){throw new Error('Conflict between mixin "'+c.name+'" and "'+f[b]+'" in member "'+b+'"!');
}f[b]=c.name;
}
for(var b in c.properties){if(h[b]){throw new Error('Conflict between mixin "'+c.name+'" and "'+h[b]+'" in property "'+b+'"!');
}h[b]=c.name;
}
for(var b in c.members){if(g[b]){throw new Error('Conflict between mixin "'+c.name+'" and "'+g[b]+'" in member "'+b+'"!');
}g[b]=c.name;
}}return true;
},isCompatible:function(w,x){var y=qx.Bootstrap.getMixins(x);
y.push(w);
return qx.Mixin.checkCompatibility(y);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(u){if(!u){return [];
}var v=u.concat();

for(var i=0,l=u.length;i<l;i++){if(u[i].$$includes){v.push.apply(v,this.flatten(u[i].$$includes));
}}return v;
},genericToString:function(){return n+this.name+m;
},$$registry:{},__u:null,__v:function(){}}});
})();
(function(){var cc=';',cb="string",ca='return this.',bY="boolean",bX='!==undefined)',bW="set",bV="",bU="this.",bT="setThemed",bS='else if(this.',du="resetThemed",dt="reset",ds="setRuntime",dr="init",dq="resetRuntime",dp="(a[",dn="return this.",dm="();",dl="get",dk="refresh",cj='else ',ck='if(this.',ch=' of an instance of ',ci=' is not (yet) ready!");',cf="]);",cg='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',cd="$$init_",ce='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',cr='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',cs=" of class ",cL="$$theme_",cH='qx.core.Assert.assertInstance(value, Date, msg) || true',cT='value !== null && value.nodeType !== undefined',cO="is",dg="': ",da='var inherit=prop.$$inherit;',cA='value !== null && value.nodeType === 9 && value.documentElement',dj="shorthand",di='return init;',dh='value !== null && value.$$type === "Mixin"',cy='qx.core.Assert.assertMap(value, msg) || true',cD="Boolean",cF='return value;',cJ='qx.core.Assert.assertNumber(value, msg) || true',cM='qx.core.Assert.assertPositiveInteger(value, msg) || true',cP="Error in property ",cV='if(init==qx.core.Property.$$inherit)init=null;',dc="$$inherit_",cl="()",cm='qx.core.Assert.assertInteger(value, msg) || true',cC='value !== null && value.$$type === "Interface"',cS="var a=arguments[0] instanceof Array?arguments[0]:arguments;",cR='value !== null && value.$$type === "Theme"',cQ='qx.core.Assert.assertInstance(value, RegExp, msg) || true',cX='value !== null && value.type !== undefined',cW='value !== null && value.document',cN=" in method ",cU='qx.core.Assert.assertInstance(value, Error, msg) || true',bP="())",db="(!this.",cn='qx.core.Assert.assertBoolean(value, msg) || true',co='return null;',cI='var init=this.',bQ=" with incoming value '",bR='qx.core.Assert.assertObject(value, msg) || true',cx='value !== null && value.nodeType === 1 && value.attributes',cp='throw new Error("Property ',cq="$$runtime_",cw="$$useinit_",cK='qx.core.Assert.assertString(value, msg) || true',de="inherit",dd="$$user_",cE='value !== null && value.$$type === "Class"',df='qx.core.Assert.assertFunction(value, msg) || true',cz='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',cY='qx.core.Assert.assertArray(value, msg) || true',ct="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));",cv='qx.core.Assert.assertPositiveNumber(value, msg) || true',cB="toggle",cG="object",cu="qx.core.Property";
qx.Bootstrap.define(cu,{statics:{__w:{"Boolean":cn,"String":cK,"Number":cJ,"Integer":cm,"PositiveNumber":cv,"PositiveInteger":cM,"Error":cU,"RegExp":cQ,"Object":bR,"Array":cY,"Map":cy,"Function":df,"Date":cH,"Node":cT,"Element":cx,"Document":cA,"Window":cW,"Event":cX,"Class":cE,"Mixin":dh,"Interface":cC,"Theme":cR,"Color":ce,"Decorator":cz,"Font":cr},__x:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:de,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:cb,dispose:bY,inheritable:bY,nullable:bY,themeable:bY,refine:bY,init:null,apply:cb,event:cb,check:null,transform:cb,deferredInit:bY,validate:null},$$allowedGroupKeys:{name:cb,group:cG,mode:cb,themeable:bY},$$inheritable:{},refresh:function(u){var parent=u.getLayoutParent();

if(parent){var x=u.constructor;
var z=this.$$store.inherit;
var y=this.$$store.init;
var w=this.$$method.refresh;
var A;
var v;
{};

while(x){A=x.$$properties;

if(A){for(var name in this.$$inheritable){if(A[name]&&u[w[name]]){v=parent[z[name]];

if(v===undefined){v=parent[y[name]];
}{};
u[w[name]](v);
}}}x=x.superclass;
}}},attach:function(bN){var bO=bN.$$properties;

if(bO){for(var name in bO){this.attachMethods(bN,name,bO[name]);
}}bN.$$propertiesAttached=true;
},attachMethods:function(P,name,Q){Q.group?this.__y(P,Q,name):this.__z(P,Q,name);
},__y:function(D,E,name){var L=qx.Bootstrap.firstUp(name);
var K=D.prototype;
var M=E.themeable===true;
{};
var N=[];
var H=[];

if(M){var F=[];
var J=[];
}var I=cS;
N.push(I);

if(M){F.push(I);
}
if(E.mode==dj){var G=ct;
N.push(G);

if(M){F.push(G);
}}
for(var i=0,a=E.group,l=a.length;i<l;i++){{};
N.push(bU,this.$$method.set[a[i]],dp,i,cf);
H.push(bU,this.$$method.reset[a[i]],dm);

if(M){{};
F.push(bU,this.$$method.setThemed[a[i]],dp,i,cf);
J.push(bU,this.$$method.resetThemed[a[i]],dm);
}}this.$$method.set[name]=bW+L;
K[this.$$method.set[name]]=new Function(N.join(bV));
this.$$method.reset[name]=dt+L;
K[this.$$method.reset[name]]=new Function(H.join(bV));

if(M){this.$$method.setThemed[name]=bT+L;
K[this.$$method.setThemed[name]]=new Function(F.join(bV));
this.$$method.resetThemed[name]=du+L;
K[this.$$method.resetThemed[name]]=new Function(J.join(bV));
}},__z:function(bc,bd,name){var bf=qx.Bootstrap.firstUp(name);
var bh=bc.prototype;
{};
if(bd.dispose===undefined&&typeof bd.check===cb){bd.dispose=this.__x[bd.check]||qx.Bootstrap.classIsDefined(bd.check)||(qx.Interface&&qx.Interface.isDefined(bd.check));
}var bg=this.$$method;
var be=this.$$store;
be.runtime[name]=cq+name;
be.user[name]=dd+name;
be.theme[name]=cL+name;
be.init[name]=cd+name;
be.inherit[name]=dc+name;
be.useinit[name]=cw+name;
bg.get[name]=dl+bf;
bh[bg.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,bc,name,dl);
};
bg.set[name]=bW+bf;
bh[bg.set[name]]=function(bp){return qx.core.Property.executeOptimizedSetter(this,bc,name,bW,arguments);
};
bg.reset[name]=dt+bf;
bh[bg.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,bc,name,dt);
};

if(bd.inheritable||bd.apply||bd.event||bd.deferredInit){bg.init[name]=dr+bf;
bh[bg.init[name]]=function(bb){return qx.core.Property.executeOptimizedSetter(this,bc,name,dr,arguments);
};
}
if(bd.inheritable){bg.refresh[name]=dk+bf;
bh[bg.refresh[name]]=function(t){return qx.core.Property.executeOptimizedSetter(this,bc,name,dk,arguments);
};
}bg.setRuntime[name]=ds+bf;
bh[bg.setRuntime[name]]=function(O){return qx.core.Property.executeOptimizedSetter(this,bc,name,ds,arguments);
};
bg.resetRuntime[name]=dq+bf;
bh[bg.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,bc,name,dq);
};

if(bd.themeable){bg.setThemed[name]=bT+bf;
bh[bg.setThemed[name]]=function(s){return qx.core.Property.executeOptimizedSetter(this,bc,name,bT,arguments);
};
bg.resetThemed[name]=du+bf;
bh[bg.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,bc,name,du);
};
}
if(bd.check===cD){bh[cB+bf]=new Function(dn+bg.set[name]+db+bg.get[name]+bP);
bh[cO+bf]=new Function(dn+bg.get[name]+cl);
}},__A:{0:'Could not change or apply init value after constructing phase!',1:'Requires exactly one argument!',2:'Undefined value is not allowed!',3:'Does not allow any arguments!',4:'Null value is not allowed!',5:'Is invalid!'},error:function(bw,bx,by,bz,bA){var bB=bw.constructor.classname;
var bC=cP+by+cs+bB+cN+this.$$method[bz][by]+bQ+bA+dg;
throw new Error(bC+(this.__A[bx]||"Unknown reason: "+bx));
},__B:function(g,h,name,j,k,m){var n=this.$$method[j][name];
{h[n]=new Function("value",k.join(""));
};
if(qx.core.Variant.isSet("qx.aspects","on")){h[n]=qx.core.Aspect.wrap(g.classname+"."+n,h[n],"property");
}qx.Bootstrap.setDisplayName(h[n],g.classname+".prototype",n);
if(m===undefined){return g[n]();
}else{return g[n](m[0]);
}},executeOptimizedGetter:function(bi,bj,name,bk){var bm=bj.$$properties[name];
var bo=bj.prototype;
var bl=[];
var bn=this.$$store;
bl.push(ck,bn.runtime[name],bX);
bl.push(ca,bn.runtime[name],cc);

if(bm.inheritable){bl.push(bS,bn.inherit[name],bX);
bl.push(ca,bn.inherit[name],cc);
bl.push(cj);
}bl.push(ck,bn.user[name],bX);
bl.push(ca,bn.user[name],cc);

if(bm.themeable){bl.push(bS,bn.theme[name],bX);
bl.push(ca,bn.theme[name],cc);
}
if(bm.deferredInit&&bm.init===undefined){bl.push(bS,bn.init[name],bX);
bl.push(ca,bn.init[name],cc);
}bl.push(cj);

if(bm.init!==undefined){if(bm.inheritable){bl.push(cI,bn.init[name],cc);

if(bm.nullable){bl.push(cV);
}else if(bm.init!==undefined){bl.push(ca,bn.init[name],cc);
}else{bl.push(cg,name,ch,bj.classname,ci);
}bl.push(di);
}else{bl.push(ca,bn.init[name],cc);
}}else if(bm.inheritable||bm.nullable){bl.push(co);
}else{bl.push(cp,name,ch,bj.classname,ci);
}return this.__B(bi,bo,name,bk,bl);
},executeOptimizedSetter:function(bD,bE,name,bF,bG){var bL=bE.$$properties[name];
var bK=bE.prototype;
var bI=[];
var bH=bF===bW||bF===bT||bF===ds||(bF===dr&&bL.init===undefined);
var bJ=bL.apply||bL.event||bL.inheritable;
var bM=this.__C(bF,name);
this.__D(bI,bL,name,bF,bH);

if(bH){this.__E(bI,bE,bL,name);
}
if(bJ){this.__F(bI,bH,bM,bF);
}
if(bL.inheritable){bI.push(da);
}{};

if(!bJ){this.__H(bI,name,bF,bH);
}else{this.__I(bI,bL,name,bF,bH);
}
if(bL.inheritable){this.__J(bI,bL,name,bF);
}else if(bJ){this.__K(bI,bL,name,bF);
}
if(bJ){this.__L(bI,bL,name);
if(bL.inheritable&&bK._getChildren){this.__M(bI,name);
}}if(bH){bI.push(cF);
}return this.__B(bD,bK,name,bF,bI,bG);
},__C:function(B,name){if(B==="setRuntime"||B==="resetRuntime"){var C=this.$$store.runtime[name];
}else if(B==="setThemed"||B==="resetThemed"){C=this.$$store.theme[name];
}else if(B==="init"){C=this.$$store.init[name];
}else{C=this.$$store.user[name];
}return C;
},__D:function(o,p,name,q,r){{if(!p.nullable||p.check||p.inheritable){o.push('var prop=qx.core.Property;');
}if(q==="set"){o.push('if(value===undefined)prop.error(this,2,"',name,'","',q,'",value);');
}};
},__E:function(bq,br,bs,name){if(bs.transform){bq.push('value=this.',bs.transform,'(value);');
}if(bs.validate){if(typeof bs.validate==="string"){bq.push('this.',bs.validate,'(value);');
}else if(bs.validate instanceof Function){bq.push(br.classname,'.$$properties.',name);
bq.push('.validate.call(this, value);');
}}},__F:function(b,c,d,e){var f=(e==="reset"||e==="resetThemed"||e==="resetRuntime");

if(c){b.push('if(this.',d,'===value)return value;');
}else if(f){b.push('if(this.',d,'===undefined)return;');
}},__G:undefined,__H:function(bt,name,bu,bv){if(bu==="setRuntime"){bt.push('this.',this.$$store.runtime[name],'=value;');
}else if(bu==="resetRuntime"){bt.push('if(this.',this.$$store.runtime[name],'!==undefined)');
bt.push('delete this.',this.$$store.runtime[name],';');
}else if(bu==="set"){bt.push('this.',this.$$store.user[name],'=value;');
}else if(bu==="reset"){bt.push('if(this.',this.$$store.user[name],'!==undefined)');
bt.push('delete this.',this.$$store.user[name],';');
}else if(bu==="setThemed"){bt.push('this.',this.$$store.theme[name],'=value;');
}else if(bu==="resetThemed"){bt.push('if(this.',this.$$store.theme[name],'!==undefined)');
bt.push('delete this.',this.$$store.theme[name],';');
}else if(bu==="init"&&bv){bt.push('this.',this.$$store.init[name],'=value;');
}},__I:function(R,S,name,T,U){if(S.inheritable){R.push('var computed, old=this.',this.$$store.inherit[name],';');
}else{R.push('var computed, old;');
}R.push('if(this.',this.$$store.runtime[name],'!==undefined){');

if(T==="setRuntime"){R.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(T==="resetRuntime"){R.push('delete this.',this.$$store.runtime[name],';');
R.push('if(this.',this.$$store.user[name],'!==undefined)');
R.push('computed=this.',this.$$store.user[name],';');
R.push('else if(this.',this.$$store.theme[name],'!==undefined)');
R.push('computed=this.',this.$$store.theme[name],';');
R.push('else if(this.',this.$$store.init[name],'!==undefined){');
R.push('computed=this.',this.$$store.init[name],';');
R.push('this.',this.$$store.useinit[name],'=true;');
R.push('}');
}else{R.push('old=computed=this.',this.$$store.runtime[name],';');
if(T==="set"){R.push('this.',this.$$store.user[name],'=value;');
}else if(T==="reset"){R.push('delete this.',this.$$store.user[name],';');
}else if(T==="setThemed"){R.push('this.',this.$$store.theme[name],'=value;');
}else if(T==="resetThemed"){R.push('delete this.',this.$$store.theme[name],';');
}else if(T==="init"&&U){R.push('this.',this.$$store.init[name],'=value;');
}}R.push('}');
R.push('else if(this.',this.$$store.user[name],'!==undefined){');

if(T==="set"){if(!S.inheritable){R.push('old=this.',this.$$store.user[name],';');
}R.push('computed=this.',this.$$store.user[name],'=value;');
}else if(T==="reset"){if(!S.inheritable){R.push('old=this.',this.$$store.user[name],';');
}R.push('delete this.',this.$$store.user[name],';');
R.push('if(this.',this.$$store.runtime[name],'!==undefined)');
R.push('computed=this.',this.$$store.runtime[name],';');
R.push('if(this.',this.$$store.theme[name],'!==undefined)');
R.push('computed=this.',this.$$store.theme[name],';');
R.push('else if(this.',this.$$store.init[name],'!==undefined){');
R.push('computed=this.',this.$$store.init[name],';');
R.push('this.',this.$$store.useinit[name],'=true;');
R.push('}');
}else{if(T==="setRuntime"){R.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(S.inheritable){R.push('computed=this.',this.$$store.user[name],';');
}else{R.push('old=computed=this.',this.$$store.user[name],';');
}if(T==="setThemed"){R.push('this.',this.$$store.theme[name],'=value;');
}else if(T==="resetThemed"){R.push('delete this.',this.$$store.theme[name],';');
}else if(T==="init"&&U){R.push('this.',this.$$store.init[name],'=value;');
}}R.push('}');
if(S.themeable){R.push('else if(this.',this.$$store.theme[name],'!==undefined){');

if(!S.inheritable){R.push('old=this.',this.$$store.theme[name],';');
}
if(T==="setRuntime"){R.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(T==="set"){R.push('computed=this.',this.$$store.user[name],'=value;');
}else if(T==="setThemed"){R.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(T==="resetThemed"){R.push('delete this.',this.$$store.theme[name],';');
R.push('if(this.',this.$$store.init[name],'!==undefined){');
R.push('computed=this.',this.$$store.init[name],';');
R.push('this.',this.$$store.useinit[name],'=true;');
R.push('}');
}else if(T==="init"){if(U){R.push('this.',this.$$store.init[name],'=value;');
}R.push('computed=this.',this.$$store.theme[name],';');
}else if(T==="refresh"){R.push('computed=this.',this.$$store.theme[name],';');
}R.push('}');
}R.push('else if(this.',this.$$store.useinit[name],'){');

if(!S.inheritable){R.push('old=this.',this.$$store.init[name],';');
}
if(T==="init"){if(U){R.push('computed=this.',this.$$store.init[name],'=value;');
}else{R.push('computed=this.',this.$$store.init[name],';');
}}else if(T==="set"||T==="setRuntime"||T==="setThemed"||T==="refresh"){R.push('delete this.',this.$$store.useinit[name],';');

if(T==="setRuntime"){R.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(T==="set"){R.push('computed=this.',this.$$store.user[name],'=value;');
}else if(T==="setThemed"){R.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(T==="refresh"){R.push('computed=this.',this.$$store.init[name],';');
}}R.push('}');
if(T==="set"||T==="setRuntime"||T==="setThemed"||T==="init"){R.push('else{');

if(T==="setRuntime"){R.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(T==="set"){R.push('computed=this.',this.$$store.user[name],'=value;');
}else if(T==="setThemed"){R.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(T==="init"){if(U){R.push('computed=this.',this.$$store.init[name],'=value;');
}else{R.push('computed=this.',this.$$store.init[name],';');
}R.push('this.',this.$$store.useinit[name],'=true;');
}R.push('}');
}},__J:function(V,W,name,X){V.push('if(computed===undefined||computed===inherit){');

if(X==="refresh"){V.push('computed=value;');
}else{V.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');
}V.push('if((computed===undefined||computed===inherit)&&');
V.push('this.',this.$$store.init[name],'!==undefined&&');
V.push('this.',this.$$store.init[name],'!==inherit){');
V.push('computed=this.',this.$$store.init[name],';');
V.push('this.',this.$$store.useinit[name],'=true;');
V.push('}else{');
V.push('delete this.',this.$$store.useinit[name],';}');
V.push('}');
V.push('if(old===computed)return value;');
V.push('if(computed===inherit){');
V.push('computed=undefined;delete this.',this.$$store.inherit[name],';');
V.push('}');
V.push('else if(computed===undefined)');
V.push('delete this.',this.$$store.inherit[name],';');
V.push('else this.',this.$$store.inherit[name],'=computed;');
V.push('var backup=computed;');
if(W.init!==undefined&&X!=="init"){V.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{V.push('if(old===undefined)old=null;');
}V.push('if(computed===undefined||computed==inherit)computed=null;');
},__K:function(dw,dx,name,dy){if(dy!=="set"&&dy!=="setRuntime"&&dy!=="setThemed"){dw.push('if(computed===undefined)computed=null;');
}dw.push('if(old===computed)return value;');
if(dx.init!==undefined&&dy!=="init"){dw.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{dw.push('if(old===undefined)old=null;');
}},__L:function(Y,ba,name){if(ba.apply){Y.push('this.',ba.apply,'(computed, old, "',name,'");');
}if(ba.event){Y.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",ba.event,"')){","reg.fireEvent(this, '",ba.event,"', qx.event.type.Data, [computed, old]",")}");
}},__M:function(dv,name){dv.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');
dv.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');
dv.push('}');
}}});
})();
(function(){var a="qx.bom.client.Engine";
qx.Bootstrap.define(a,{statics:{NAME:"",FULLVERSION:"0.0.0",VERSION:0.0,OPERA:false,WEBKIT:false,GECKO:false,MSHTML:false,UNKNOWN_ENGINE:false,UNKNOWN_VERSION:false,DOCUMENT_MODE:null,__N:function(){var c="unknown";
var g="0.0.0";
var f=window.navigator.userAgent;
var i=false;
var e=false;

if(window.opera&&Object.prototype.toString.call(window.opera)=="[object Opera]"){c="opera";
this.OPERA=true;
if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(f)){g=RegExp.$1+"."+RegExp.$2;

if(RegExp.$3!=""){g+="."+RegExp.$3;
}}else{e=true;
g="9.6.0";
}}else if(window.navigator.userAgent.indexOf("AppleWebKit/")!=-1){c="webkit";
this.WEBKIT=true;

if(/AppleWebKit\/([^ ]+)/.test(f)){g=RegExp.$1;
var h=RegExp("[^\\.0-9]").exec(g);

if(h){g=g.slice(0,h.index);
}}else{e=true;
g="525.26";
}}else if(window.controllers&&window.navigator.product==="Gecko"){c="gecko";
this.GECKO=true;
if(/rv\:([^\);]+)(\)|;)/.test(f)){g=RegExp.$1;
}else{e=true;
g="1.9.0.0";
}}else if(window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(f)){c="mshtml";
g=RegExp.$1;

if(document.documentMode){this.DOCUMENT_MODE=document.documentMode;
}if(g<8&&/Trident\/([^\);]+)(\)|;)/.test(f)){if(RegExp.$1==="4.0"){g="8.0";
}}this.MSHTML=true;
}else{var d=window.qxFail;

if(d&&typeof d==="function"){var c=d();

if(c.NAME&&c.FULLVERSION){c=c.NAME;
this[c.toUpperCase()]=true;
g=c.FULLVERSION;
}}else{i=true;
e=true;
g="1.9.0.0";
c="gecko";
this.GECKO=true;
window.alert("Unsupported client: "+f+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}this.UNKNOWN_ENGINE=i;
this.UNKNOWN_VERSION=e;
this.NAME=c;
this.FULLVERSION=g;
this.VERSION=parseFloat(g);
}},defer:function(b){b.__N();
}});
})();
(function(){var q="on",p="off",o="|",n="default",m="gecko",k="qx.aspects",j="$",h="qx.debug",g="qx.dynlocale",f="webkit",c="opera",e="qx.client",d="qx.core.Variant",b="mshtml";
qx.Bootstrap.define(d,{statics:{__O:{},__P:{},compilerIsSet:function(){return true;
},define:function(J,K,L){{};

if(!this.__O[J]){this.__O[J]={};
}else{}this.__O[J].allowedValues=K;
this.__O[J].defaultValue=L;
},get:function(C){var D=this.__O[C];
{};

if(D.value!==undefined){return D.value;
}return D.defaultValue;
},__Q:function(){if(window.qxvariants){for(var a in qxvariants){{};

if(!this.__O[a]){this.__O[a]={};
}this.__O[a].value=qxvariants[a];
}window.qxvariants=undefined;

try{delete window.qxvariants;
}catch(z){}this.__R(this.__O);
}},__R:function(){if(qx.core.Setting.get("qx.allowUrlVariants")!=true){return;
}var r=document.location.search.slice(1).split("&");

for(var i=0;i<r.length;i++){var s=r[i].split(":");

if(s.length!=3||s[0]!="qxvariant"){continue;
}var t=s[1];

if(!this.__O[t]){this.__O[t]={};
}this.__O[t].value=decodeURIComponent(s[2]);
}},select:function(w,x){{};

for(var y in x){if(this.isSet(w,y)){return x[y];
}}
if(x[n]!==undefined){return x[n];
}{};
},isSet:function(E,F){var G=E+j+F;

if(this.__P[G]!==undefined){return this.__P[G];
}var I=false;
if(F.indexOf(o)<0){I=this.get(E)===F;
}else{var H=F.split(o);

for(var i=0,l=H.length;i<l;i++){if(this.get(E)===H[i]){I=true;
break;
}}}this.__P[G]=I;
return I;
},__S:function(v){return typeof v==="object"&&v!==null&&v instanceof Array;
},__T:function(v){return typeof v==="object"&&v!==null&&!(v instanceof Array);
},__U:function(A,B){for(var i=0,l=A.length;i<l;i++){if(A[i]==B){return true;
}}return false;
}},defer:function(u){u.define(e,[m,b,c,f],qx.bom.client.Engine.NAME);
u.define(h,[q,p],q);
u.define(k,[q,p],p);
u.define(g,[q,p],q);
u.__Q();
}});
})();
(function(){var d="qx.core.Aspect",c="before",b="*",a="static";
qx.Bootstrap.define(d,{statics:{__V:[],wrap:function(e,f,g){var m=[];
var h=[];
var l=this.__V;
var k;

for(var i=0;i<l.length;i++){k=l[i];

if((k.type==null||g==k.type||k.type==b)&&(k.name==null||e.match(k.name))){k.pos==-1?m.push(k.fcn):h.push(k.fcn);
}}
if(m.length===0&&h.length===0){return f;
}var j=function(){for(var i=0;i<m.length;i++){m[i].call(this,e,f,g,arguments);
}var q=f.apply(this,arguments);

for(var i=0;i<h.length;i++){h[i].call(this,e,f,g,arguments,q);
}return q;
};

if(g!==a){j.self=f.self;
j.base=f.base;
}f.wrapper=j;
j.original=f;
return j;
},addAdvice:function(n,o,p,name){this.__V.push({fcn:n,pos:o===c?-1:1,type:p,name:name});
}}});
})();
(function(){var T="qx.aspects",S="on",R=".",Q="static",P="constructor",O="[Class ",N="]",M="toString",L="member",K="$$init_",E=".prototype",J="destructor",H="extend",D="destruct",C="Class",G="off",F="qx.Class",I="singleton",B="qx.event.type.Data";
qx.Bootstrap.define(F,{statics:{define:function(name,bS){if(!bS){var bS={};
}if(bS.include&&!(bS.include instanceof Array)){bS.include=[bS.include];
}if(bS.implement&&!(bS.implement instanceof Array)){bS.implement=[bS.implement];
}if(!bS.hasOwnProperty(H)&&!bS.type){bS.type=Q;
}{};
var bU=this.__bb(name,bS.type,bS.extend,bS.statics,bS.construct,bS.destruct);
if(bS.extend){if(bS.properties){this.__bd(bU,bS.properties,true);
}if(bS.members){this.__bf(bU,bS.members,true,true,false);
}if(bS.events){this.__bc(bU,bS.events,true);
}if(bS.include){for(var i=0,l=bS.include.length;i<l;i++){this.__bi(bU,bS.include[i],false);
}}}if(bS.settings){for(var bT in bS.settings){qx.core.Setting.define(bT,bS.settings[bT]);
}}if(bS.variants){for(var bT in bS.variants){qx.core.Variant.define(bT,bS.variants[bT].allowedValues,bS.variants[bT].defaultValue);
}}if(bS.implement){for(var i=0,l=bS.implement.length;i<l;i++){this.__bh(bU,bS.implement[i]);
}}{};
if(bS.defer){bS.defer.self=bU;
bS.defer(bU,bU.prototype,{add:function(name,U){var V={};
V[name]=U;
qx.Class.__bd(bU,V,true);
}});
}return bU;
},isDefined:qx.Bootstrap.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},getByName:qx.Bootstrap.getByName,include:function(br,bs){{};
qx.Class.__bi(br,bs,false);
},patch:function(bB,bC){{};
qx.Class.__bi(bB,bC,true);
},isSubClassOf:function(ca,cb){if(!ca){return false;
}
if(ca==cb){return true;
}
if(ca.prototype instanceof cb){return true;
}return false;
},getPropertyDefinition:qx.Bootstrap.getPropertyDefinition,getProperties:function(bz){var bA=[];

while(bz){if(bz.$$properties){bA.push.apply(bA,qx.Bootstrap.getKeys(bz.$$properties));
}bz=bz.superclass;
}return bA;
},getByProperty:function(bv,name){while(bv){if(bv.$$properties&&bv.$$properties[name]){return bv;
}bv=bv.superclass;
}return null;
},hasProperty:qx.Bootstrap.hasProperty,getEventType:qx.Bootstrap.getEventType,supportsEvent:qx.Bootstrap.supportsEvent,hasOwnMixin:function(ba,bb){return ba.$$includes&&ba.$$includes.indexOf(bb)!==-1;
},getByMixin:function(bN,bO){var bP,i,l;

while(bN){if(bN.$$includes){bP=bN.$$flatIncludes;

for(i=0,l=bP.length;i<l;i++){if(bP[i]===bO){return bN;
}}}bN=bN.superclass;
}return null;
},getMixins:qx.Bootstrap.getMixins,hasMixin:function(bQ,bR){return !!this.getByMixin(bQ,bR);
},hasOwnInterface:function(bp,bq){return bp.$$implements&&bp.$$implements.indexOf(bq)!==-1;
},getByInterface:qx.Bootstrap.getByInterface,getInterfaces:function(bt){var bu=[];

while(bt){if(bt.$$implements){bu.push.apply(bu,bt.$$flatImplements);
}bt=bt.superclass;
}return bu;
},hasInterface:qx.Bootstrap.hasInterface,implementsInterface:function(bw,bx){var by=bw.constructor;

if(this.hasInterface(by,bx)){return true;
}
try{qx.Interface.assertObject(bw,bx);
return true;
}catch(bY){}
try{qx.Interface.assert(by,bx,false);
return true;
}catch(bk){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return O+this.classname+N;
},$$registry:qx.Bootstrap.$$registry,__W:null,__X:null,__Y:function(){},__ba:function(){},__bb:function(name,f,g,h,j,k){var q;

if(!g&&qx.core.Variant.isSet(T,G)){q=h||{};
qx.Bootstrap.setDisplayNames(q,name);
}else{q={};

if(g){if(!j){j=this.__bj();
}q=this.__bl(j,name,f);
qx.Bootstrap.setDisplayName(j,name,P);
}if(h){qx.Bootstrap.setDisplayNames(h,name);
var r;

for(var i=0,a=qx.Bootstrap.getKeys(h),l=a.length;i<l;i++){r=a[i];
var n=h[r];

if(qx.core.Variant.isSet(T,S)){if(n instanceof Function){n=qx.core.Aspect.wrap(name+R+r,n,Q);
}q[r]=n;
}else{q[r]=n;
}}}}var p=qx.Bootstrap.createNamespace(name,q,false);
q.name=q.classname=name;
q.basename=p;
q.$$type=C;

if(f){q.$$classtype=f;
}if(!q.hasOwnProperty(M)){q.toString=this.genericToString;
}
if(g){var s=g.prototype;
var m=this.__bk();
m.prototype=s;
var o=new m;
q.prototype=o;
o.name=o.classname=name;
o.basename=p;
j.base=q.superclass=g;
j.self=q.constructor=o.constructor=q;
if(k){if(qx.core.Variant.isSet(T,S)){k=qx.core.Aspect.wrap(name,k,J);
}q.$$destructor=k;
qx.Bootstrap.setDisplayName(k,name,D);
}}this.$$registry[name]=q;
return q;
},__bc:function(b,c,d){var e,e;
{};

if(b.$$events){for(var e in c){b.$$events[e]=c[e];
}}else{b.$$events=c;
}},__bd:function(bf,bg,bh){var bj;

if(bh===undefined){bh=false;
}var bi=!!bf.$$propertiesAttached;

for(var name in bg){bj=bg[name];
{};
bj.name=name;
if(!bj.refine){if(bf.$$properties===undefined){bf.$$properties={};
}bf.$$properties[name]=bj;
}if(bj.init!==undefined){bf.prototype[K+name]=bj.init;
}if(bj.event!==undefined){var event={};
event[bj.event]=B;
this.__bc(bf,event,bh);
}if(bj.inheritable){qx.core.Property.$$inheritable[name]=true;
}if(bi){qx.core.Property.attachMethods(bf,name,bj);
}}},__be:null,__bf:function(bD,bE,bF,bG,bH){var bI=bD.prototype;
var bK,bJ;
qx.Bootstrap.setDisplayNames(bE,bD.classname+E);

for(var i=0,a=qx.Bootstrap.getKeys(bE),l=a.length;i<l;i++){bK=a[i];
bJ=bE[bK];
{};
if(bG!==false&&bJ instanceof Function&&bJ.$$type==null){if(bH==true){bJ=this.__bg(bJ,bI[bK]);
}else{if(bI[bK]){bJ.base=bI[bK];
}bJ.self=bD;
}
if(qx.core.Variant.isSet(T,S)){bJ=qx.core.Aspect.wrap(bD.classname+R+bK,bJ,L);
}}bI[bK]=bJ;
}},__bg:function(bL,bM){if(bM){return function(){var be=bL.base;
bL.base=bM;
var bd=bL.apply(this,arguments);
bL.base=be;
return bd;
};
}else{return bL;
}},__bh:function(W,X){{};
var Y=qx.Interface.flatten([X]);

if(W.$$implements){W.$$implements.push(X);
W.$$flatImplements.push.apply(W.$$flatImplements,Y);
}else{W.$$implements=[X];
W.$$flatImplements=Y;
}},__bi:function(w,x,y){{};

if(this.hasMixin(w,x)){return;
}var A=qx.Mixin.flatten([x]);
var z;

for(var i=0,l=A.length;i<l;i++){z=A[i];
if(z.$$events){this.__bc(w,z.$$events,y);
}if(z.$$properties){this.__bd(w,z.$$properties,y);
}if(z.$$members){this.__bf(w,z.$$members,y,y,y);
}}if(w.$$includes){w.$$includes.push(x);
w.$$flatIncludes.push.apply(w.$$flatIncludes,A);
}else{w.$$includes=[x];
w.$$flatIncludes=A;
}},__bj:function(){function bc(){arguments.callee.base.apply(this,arguments);
}return bc;
},__bk:function(){return function(){};
},__bl:function(bl,name,bm){var bo=function(){var bX=arguments.callee.constructor;
{};
if(!bX.$$propertiesAttached){qx.core.Property.attach(bX);
}var bW=bX.$$original.apply(this,arguments);
if(bX.$$includes){var bV=bX.$$flatIncludes;

for(var i=0,l=bV.length;i<l;i++){if(bV[i].$$constructor){bV[i].$$constructor.apply(this,arguments);
}}}if(this.classname===name.classname){this.$$initialized=true;
}return bW;
};

if(qx.core.Variant.isSet(T,S)){var bn=qx.core.Aspect.wrap(name,bo,P);
bo.$$original=bl;
bo.constructor=bn;
bo=bn;
}if(bm===I){bo.getInstance=this.getInstance;
}bo.$$original=bl;
bl.wrapper=bo;
return bo;
}},defer:function(){if(qx.core.Variant.isSet(T,S)){for(var t in qx.Bootstrap.$$registry){var u=qx.Bootstrap.$$registry[t];

for(var v in u){if(u[v] instanceof Function){u[v]=qx.core.Aspect.wrap(t+R+v,u[v],Q);
}}}}}});
})();
(function(){var d="$$hash",c="qx.core.ObjectRegistry";
qx.Class.define(c,{statics:{inShutDown:false,__bm:{},__bn:0,__bo:[],register:function(e){var h=this.__bm;

if(!h){return;
}var g=e.$$hash;

if(g==null){var f=this.__bo;

if(f.length>0){g=f.pop();
}else{g=(this.__bn++).toString(36);
}e.$$hash=g;
}{};
h[g]=e;
},unregister:function(v){var w=v.$$hash;

if(w==null){return;
}var x=this.__bm;

if(x&&x[w]){delete x[w];
this.__bo.push(w);
}try{delete v.$$hash;
}catch(y){if(v.removeAttribute){v.removeAttribute(d);
}}},toHashCode:function(r){{};
var t=r.$$hash;

if(t!=null){return t;
}var s=this.__bo;

if(s.length>0){t=s.pop();
}else{t=(this.__bn++).toString(36);
}return r.$$hash=t;
},clearHashCode:function(o){{};
var p=o.$$hash;

if(p!=null){this.__bo.push(p);
try{delete o.$$hash;
}catch(u){if(o.removeAttribute){o.removeAttribute(d);
}}}},fromHashCode:function(q){return this.__bm[q]||null;
},shutdown:function(){this.inShutDown=true;
var k=this.__bm;
var n=[];

for(var m in k){n.push(m);
}n.sort(function(a,b){return parseInt(b,36)-parseInt(a,36);
});
var j,i=0,l=n.length;

while(true){try{for(;i<l;i++){m=n[i];
j=k[m];

if(j&&j.dispose){j.dispose();
}}}catch(z){qx.Bootstrap.error(this,"Could not dispose object "+j.toString()+": "+z);

if(i!==l){i++;
continue;
}}break;
}qx.Bootstrap.debug(this,"Disposed "+l+" objects");
delete this.__bm;
},getRegistry:function(){return this.__bm;
}}});
})();
(function(){var a="qx.data.MBinding";
qx.Mixin.define(a,{members:{bind:function(c,d,e,f){return qx.data.SingleValueBinding.bind(this,c,d,e,f);
},removeBinding:function(b){qx.data.SingleValueBinding.removeBindingFromObject(this,b);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
})();
(function(){var i="qx.client",h="on",g="function",f="mousedown",d="qx.bom.Event",c="return;",b="mouseover",a="HTMLEvents";
qx.Class.define(d,{statics:{addNativeListener:qx.core.Variant.select(i,{"mshtml":function(w,x,y){w.attachEvent(h+x,y);
},"default":function(D,E,F){D.addEventListener(E,F,false);
}}),removeNativeListener:qx.core.Variant.select(i,{"mshtml":function(z,A,B){try{z.detachEvent(h+A,B);
}catch(e){if(e.number!==-2146828218){throw e;
}}},"default":function(t,u,v){t.removeEventListener(u,v,false);
}}),getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:qx.core.Variant.select(i,{"mshtml":function(e){if(e.type===b){return e.fromEvent;
}else{return e.toElement;
}},"gecko":function(e){try{e.relatedTarget&&e.relatedTarget.nodeType;
}catch(e){return null;
}return e.relatedTarget;
},"default":function(e){return e.relatedTarget;
}}),preventDefault:qx.core.Variant.select(i,{"gecko":function(e){if(qx.bom.client.Engine.VERSION>=1.9&&e.type==f&&e.button==2){return;
}e.preventDefault();
if(qx.bom.client.Engine.VERSION<1.9){try{e.keyCode=0;
}catch(s){}}},"mshtml":function(e){try{e.keyCode=0;
}catch(C){}e.returnValue=false;
},"default":function(e){e.preventDefault();
}}),stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}e.cancelBubble=true;
},fire:function(n,o){if(document.createEventObject){var p=document.createEventObject();
return n.fireEvent(h+o,p);
}else{var p=document.createEvent(a);
p.initEvent(o,true,true);
return !n.dispatchEvent(p);
}},supportsEvent:qx.core.Variant.select(i,{"webkit":function(q,r){return q.hasOwnProperty(h+r);
},"default":function(j,k){var l=h+k;
var m=(l in j);

if(!m){m=typeof j[l]==g;

if(!m&&j.setAttribute){j.setAttribute(l,c);
m=typeof j[l]==g;
j.removeAttribute(l);
}}return m;
}})}});
})();
(function(){var bf="|bubble",be="|capture",bd="|",bc="_",bb="unload",ba="UNKNOWN_",Y="DOM_",X="__bu",W="c",V="__bt",S="WIN_",U="capture",T="qx.event.Manager",R="QX_";
qx.Class.define(T,{extend:Object,construct:function(bw,bx){this.__bp=bw;
this.__bq=qx.core.ObjectRegistry.toHashCode(bw);
this.__br=bx;
if(bw.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(bw,bb,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(bw,bb,arguments.callee);
self.dispose();
}));
}this.__bs={};
this.__bt={};
this.__bu={};
this.__bv={};
},statics:{__bw:0,getNextUniqueId:function(){return (this.__bw++).toString(36);
}},members:{__br:null,__bs:null,__bu:null,__bx:null,__bt:null,__bv:null,__bp:null,__bq:null,getWindow:function(){return this.__bp;
},getWindowId:function(){return this.__bq;
},getHandler:function(k){var m=this.__bt[k.classname];

if(m){return m;
}return this.__bt[k.classname]=new k(this);
},getDispatcher:function(bu){var bv=this.__bu[bu.classname];

if(bv){return bv;
}return this.__bu[bu.classname]=new bu(this,this.__br);
},getListeners:function(by,bz,bA){var bB=by.$$hash||qx.core.ObjectRegistry.toHashCode(by);
var bD=this.__bs[bB];

if(!bD){return null;
}var bE=bz+(bA?be:bf);
var bC=bD[bE];
return bC?bC.concat():null;
},serializeListeners:function(cq){var cx=cq.$$hash||qx.core.ObjectRegistry.toHashCode(cq);
var cz=this.__bs[cx];
var cv=[];

if(cz){var ct,cy,cr,cu,cw;

for(var cs in cz){ct=cs.indexOf(bd);
cy=cs.substring(0,ct);
cr=cs.charAt(ct+1)==W;
cu=cz[cs];

for(var i=0,l=cu.length;i<l;i++){cw=cu[i];
cv.push({self:cw.context,handler:cw.handler,type:cy,capture:cr});
}}}return cv;
},toggleAttachedEvents:function(ch,ci){var cn=ch.$$hash||qx.core.ObjectRegistry.toHashCode(ch);
var cp=this.__bs[cn];

if(cp){var ck,co,cj,cl;

for(var cm in cp){ck=cm.indexOf(bd);
co=cm.substring(0,ck);
cj=cm.charCodeAt(ck+1)===99;
cl=cp[cm];

if(ci){this.__by(ch,co,cj);
}else{this.__bz(ch,co,cj);
}}}},hasListener:function(bS,bT,bU){{};
var bV=bS.$$hash||qx.core.ObjectRegistry.toHashCode(bS);
var bX=this.__bs[bV];

if(!bX){return false;
}var bY=bT+(bU?be:bf);
var bW=bX[bY];
return bW&&bW.length>0;
},importListeners:function(a,b){{};
var h=a.$$hash||qx.core.ObjectRegistry.toHashCode(a);
var j=this.__bs[h]={};
var e=qx.event.Manager;

for(var c in b){var f=b[c];
var g=f.type+(f.capture?be:bf);
var d=j[g];

if(!d){d=j[g]=[];
this.__by(a,f.type,f.capture);
}d.push({handler:f.listener,context:f.self,unique:f.unique||(e.__bw++).toString(36)});
}},addListener:function(n,o,p,self,q){var u;
{};
var v=n.$$hash||qx.core.ObjectRegistry.toHashCode(n);
var x=this.__bs[v];

if(!x){x=this.__bs[v]={};
}var t=o+(q?be:bf);
var s=x[t];

if(!s){s=x[t]=[];
}if(s.length===0){this.__by(n,o,q);
}var w=(qx.event.Manager.__bw++).toString(36);
var r={handler:p,context:self,unique:w};
s.push(r);
return t+bd+w;
},findHandler:function(bF,bG){var bQ=false,bJ=false,bR=false;
var bP;

if(bF.nodeType===1){bQ=true;
bP=Y+bF.tagName.toLowerCase()+bc+bG;
}else if(bF==this.__bp){bJ=true;
bP=S+bG;
}else if(bF.classname){bR=true;
bP=R+bF.classname+bc+bG;
}else{bP=ba+bF+bc+bG;
}var bL=this.__bv;

if(bL[bP]){return bL[bP];
}var bO=this.__br.getHandlers();
var bK=qx.event.IEventHandler;
var bM,bN,bI,bH;

for(var i=0,l=bO.length;i<l;i++){bM=bO[i];
bI=bM.SUPPORTED_TYPES;

if(bI&&!bI[bG]){continue;
}bH=bM.TARGET_CHECK;

if(bH){if(!bQ&&bH===bK.TARGET_DOMNODE){continue;
}else if(!bJ&&bH===bK.TARGET_WINDOW){continue;
}else if(!bR&&bH===bK.TARGET_OBJECT){continue;
}}bN=this.getHandler(bO[i]);

if(bM.IGNORE_CAN_HANDLE||bN.canHandleEvent(bF,bG)){bL[bP]=bN;
return bN;
}}return null;
},__by:function(bq,br,bs){var bt=this.findHandler(bq,br);

if(bt){bt.registerEvent(bq,br,bs);
return;
}{};
},removeListener:function(bg,bh,bi,self,bj){var bn;
{};
var bo=bg.$$hash||qx.core.ObjectRegistry.toHashCode(bg);
var bp=this.__bs[bo];

if(!bp){return false;
}var bk=bh+(bj?be:bf);
var bl=bp[bk];

if(!bl){return false;
}var bm;

for(var i=0,l=bl.length;i<l;i++){bm=bl[i];

if(bm.handler===bi&&bm.context===self){qx.lang.Array.removeAt(bl,i);

if(bl.length==0){this.__bz(bg,bh,bj);
}return true;
}}return false;
},removeListenerById:function(y,z){var F;
{};
var D=z.split(bd);
var I=D[0];
var A=D[1].charCodeAt(0)==99;
var H=D[2];
var G=y.$$hash||qx.core.ObjectRegistry.toHashCode(y);
var J=this.__bs[G];

if(!J){return false;
}var E=I+(A?be:bf);
var C=J[E];

if(!C){return false;
}var B;

for(var i=0,l=C.length;i<l;i++){B=C[i];

if(B.unique===H){qx.lang.Array.removeAt(C,i);

if(C.length==0){this.__bz(y,I,A);
}return true;
}}return false;
},removeAllListeners:function(K){var O=K.$$hash||qx.core.ObjectRegistry.toHashCode(K);
var Q=this.__bs[O];

if(!Q){return false;
}var M,P,L;

for(var N in Q){if(Q[N].length>0){M=N.split(bd);
P=M[0];
L=M[1]===U;
this.__bz(K,P,L);
}}delete this.__bs[O];
return true;
},__bz:function(cA,cB,cC){var cD=this.findHandler(cA,cB);

if(cD){cD.unregisterEvent(cA,cB,cC);
return;
}{};
},dispatchEvent:function(ca,event){var cf;
{};
var cg=event.getType();

if(!event.getBubbles()&&!this.hasListener(ca,cg)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(ca);
}var ce=this.__br.getDispatchers();
var cd;
var cc=false;

for(var i=0,l=ce.length;i<l;i++){cd=this.getDispatcher(ce[i]);
if(cd.canDispatchEvent(ca,event,cg)){cd.dispatchEvent(ca,event,cg);
cc=true;
break;
}}
if(!cc){qx.log.Logger.error(this,"No dispatcher can handle event of type "+cg+" on "+ca);
return true;
}var cb=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !cb;
},dispose:function(){this.__br.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,V);
qx.util.DisposeUtil.disposeMap(this,X);
this.__bs=this.__bp=this.__bx=null;
this.__br=this.__bv=null;
}}});
})();
(function(){var e="qx.dom.Node",d="qx.client",c="";
qx.Class.define(e,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(s){return s.nodeType===
this.DOCUMENT?s:
s.ownerDocument||s.document;
},getWindow:qx.core.Variant.select(d,{"mshtml":function(g){if(g.nodeType==null){return g;
}if(g.nodeType!==this.DOCUMENT){g=g.ownerDocument;
}return g.parentWindow;
},"default":function(j){if(j.nodeType==null){return j;
}if(j.nodeType!==this.DOCUMENT){j=j.ownerDocument;
}return j.defaultView;
}}),getDocumentElement:function(f){return this.getDocument(f).documentElement;
},getBodyElement:function(n){return this.getDocument(n).body;
},isNode:function(r){return !!(r&&r.nodeType!=null);
},isElement:function(t){return !!(t&&t.nodeType===this.ELEMENT);
},isDocument:function(h){return !!(h&&h.nodeType===this.DOCUMENT);
},isText:function(q){return !!(q&&q.nodeType===this.TEXT);
},isWindow:function(k){return !!(k&&k.history&&k.location&&k.document);
},isNodeName:function(o,p){if(!p||!o||!o.nodeName){return false;
}return p.toLowerCase()==qx.dom.Node.getName(o);
},getName:function(b){if(!b||!b.nodeName){return null;
}return b.nodeName.toLowerCase();
},getText:function(l){if(!l||!l.nodeType){return null;
}
switch(l.nodeType){case 1:var i,a=[],m=l.childNodes,length=m.length;

for(i=0;i<length;i++){a[i]=this.getText(m[i]);
}return a.join(c);
case 2:return l.nodeValue;
break;
case 3:return l.nodeValue;
break;
}return null;
}}});
})();
(function(){var y="mshtml",x="qx.client",w="[object Array]",v="qx.lang.Array",u="qx",t="number",s="string";
qx.Class.define(v,{statics:{toArray:function(bo,bp){return this.cast(bo,Array,bp);
},cast:function(e,f,g){if(e.constructor===f){return e;
}
if(qx.Class.hasInterface(e,qx.data.IListData)){var e=e.toArray();
}var h=new f;
if(qx.core.Variant.isSet(x,y)){if(e.item){for(var i=g||0,l=e.length;i<l;i++){h.push(e[i]);
}return h;
}}if(Object.prototype.toString.call(e)===w&&g==null){h.push.apply(h,e);
}else{h.push.apply(h,Array.prototype.slice.call(e,g||0));
}return h;
},fromArguments:function(c,d){return Array.prototype.slice.call(c,d||0);
},fromCollection:function(A){if(qx.core.Variant.isSet(x,y)){if(A.item){var B=[];

for(var i=0,l=A.length;i<l;i++){B[i]=A[i];
}return B;
}}return Array.prototype.slice.call(A,0);
},fromShortHand:function(J){var L=J.length;
var K=qx.lang.Array.clone(J);
switch(L){case 1:K[1]=K[2]=K[3]=K[0];
break;
case 2:K[2]=K[0];
case 3:K[3]=K[1];
}return K;
},clone:function(bq){return bq.concat();
},insertAt:function(ba,bb,i){ba.splice(i,0,bb);
return ba;
},insertBefore:function(bl,bm,bn){var i=bl.indexOf(bn);

if(i==-1){bl.push(bm);
}else{bl.splice(i,0,bm);
}return bl;
},insertAfter:function(bi,bj,bk){var i=bi.indexOf(bk);

if(i==-1||i==(bi.length-1)){bi.push(bj);
}else{bi.splice(i+1,0,bj);
}return bi;
},removeAt:function(j,i){return j.splice(i,1)[0];
},removeAll:function(bc){bc.length=0;
return this;
},append:function(C,D){{};
Array.prototype.push.apply(C,D);
return C;
},exclude:function(k,m){{};

for(var i=0,o=m.length,n;i<o;i++){n=k.indexOf(m[i]);

if(n!=-1){k.splice(n,1);
}}return k;
},remove:function(bg,bh){var i=bg.indexOf(bh);

if(i!=-1){bg.splice(i,1);
return bh;
}},contains:function(p,q){return p.indexOf(q)!==-1;
},equals:function(E,F){var length=E.length;

if(length!==F.length){return false;
}
for(var i=0;i<length;i++){if(E[i]!==F[i]){return false;
}}return true;
},sum:function(a){var b=0;

for(var i=0,l=a.length;i<l;i++){b+=a[i];
}return b;
},max:function(bd){{};
var i,bf=bd.length,be=bd[0];

for(i=1;i<bf;i++){if(bd[i]>be){be=bd[i];
}}return be===undefined?null:be;
},min:function(G){{};
var i,I=G.length,H=G[0];

for(i=1;i<I;i++){if(G[i]<H){H=G[i];
}}return H===undefined?null:H;
},unique:function(M){var W=[],O={},R={},T={};
var S,N=0;
var X=u+qx.lang.Date.now();
var P=false,V=false,Y=false;
for(var i=0,U=M.length;i<U;i++){S=M[i];
if(S===null){if(!P){P=true;
W.push(S);
}}else if(S===undefined){}else if(S===false){if(!V){V=true;
W.push(S);
}}else if(S===true){if(!Y){Y=true;
W.push(S);
}}else if(typeof S===s){if(!O[S]){O[S]=1;
W.push(S);
}}else if(typeof S===t){if(!R[S]){R[S]=1;
W.push(S);
}}else{Q=S[X];

if(Q==null){Q=S[X]=N++;
}
if(!T[Q]){T[Q]=S;
W.push(S);
}}}for(var Q in T){try{delete T[Q][X];
}catch(z){try{T[Q][X]=null;
}catch(r){throw new Error("Cannot clean-up map entry doneObjects["+Q+"]["+X+"]");
}}}return W;
}}});
})();
(function(){var o="()",n=".",m=".prototype.",l='anonymous()',k="qx.lang.Function",j=".constructor()";
qx.Class.define(k,{statics:{getCaller:function(g){return g.caller?g.caller.callee:g.callee.caller;
},getName:function(B){if(B.displayName){return B.displayName;
}
if(B.$$original||B.wrapper||B.classname){return B.classname+j;
}
if(B.$$mixin){for(var D in B.$$mixin.$$members){if(B.$$mixin.$$members[D]==B){return B.$$mixin.name+m+D+o;
}}for(var D in B.$$mixin){if(B.$$mixin[D]==B){return B.$$mixin.name+n+D+o;
}}}
if(B.self){var E=B.self.constructor;

if(E){for(var D in E.prototype){if(E.prototype[D]==B){return E.classname+m+D+o;
}}for(var D in E){if(E[D]==B){return E.classname+n+D+o;
}}}}var C=B.toString().match(/function\s*(\w*)\s*\(.*/);

if(C&&C.length>=1&&C[1]){return C[1]+o;
}return l;
},globalEval:function(a){if(window.execScript){return window.execScript(a);
}else{return eval.call(window,a);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(w,x){{};
if(!x){return w;
}if(!(x.self||x.args||x.delay!=null||x.periodical!=null||x.attempt)){return w;
}return function(event){{};
var G=qx.lang.Array.fromArguments(arguments);
if(x.args){G=x.args.concat(G);
}
if(x.delay||x.periodical){var F=qx.event.GlobalError.observeMethod(function(){return w.apply(x.self||this,G);
});

if(x.delay){return window.setTimeout(F,x.delay);
}
if(x.periodical){return window.setInterval(F,x.periodical);
}}else if(x.attempt){var H=false;

try{H=w.apply(x.self||this,G);
}catch(v){}return H;
}else{return w.apply(x.self||this,G);
}};
},bind:function(e,self,f){return this.create(e,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(c,d){return this.create(c,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(s,self,t){if(arguments.length<3){return function(event){return s.call(self||this,event||window.event);
};
}else{var u=qx.lang.Array.fromArguments(arguments,2);
return function(event){var b=[event||window.event];
b.push.apply(b,u);
s.apply(self||this,b);
};
}},attempt:function(h,self,i){return this.create(h,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(p,q,self,r){return this.create(p,{delay:q,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(y,z,self,A){return this.create(y,{periodical:z,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
})();
(function(){var c="qx.event.Registration";
qx.Class.define(c,{statics:{__bA:{},getManager:function(L){if(L==null){{};
L=window;
}else if(L.nodeType){L=qx.dom.Node.getWindow(L);
}else if(!qx.dom.Node.isWindow(L)){L=window;
}var N=L.$$hash||qx.core.ObjectRegistry.toHashCode(L);
var M=this.__bA[N];

if(!M){M=new qx.event.Manager(L,this);
this.__bA[N]=M;
}return M;
},removeManager:function(F){var G=F.getWindowId();
delete this.__bA[G];
},addListener:function(A,B,C,self,D){return this.getManager(A).addListener(A,B,C,self,D);
},removeListener:function(e,f,g,self,h){return this.getManager(e).removeListener(e,f,g,self,h);
},removeListenerById:function(y,z){return this.getManager(y).removeListenerById(y,z);
},removeAllListeners:function(E){return this.getManager(E).removeAllListeners(E);
},hasListener:function(O,P,Q){return this.getManager(O).hasListener(O,P,Q);
},serializeListeners:function(i){return this.getManager(i).serializeListeners(i);
},createEvent:function(H,I,J){{};
if(I==null){I=qx.event.type.Event;
}var K=qx.event.Pool.getInstance().getObject(I);

if(!K){return;
}J?K.init.apply(K,J):K.init();
if(H){K.setType(H);
}return K;
},dispatchEvent:function(l,event){return this.getManager(l).dispatchEvent(l,event);
},fireEvent:function(s,t,u,v){var w;
{};
var x=this.createEvent(t,u||null,v);
return this.getManager(s).dispatchEvent(s,x);
},fireNonBubblingEvent:function(m,n,o,p){{};
var q=this.getManager(m);

if(!q.hasListener(m,n,false)){return true;
}var r=this.createEvent(n,o||null,p);
return q.dispatchEvent(m,r);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__bB:[],addHandler:function(d){{};
this.__bB.push(d);
this.__bB.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__bB;
},__bC:[],addDispatcher:function(j,k){{};
this.__bC.push(j);
this.__bC.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__bC;
}}});
})();
(function(){var a="qx.log.appender.RingBuffer";
qx.Class.define(a,{extend:Object,construct:function(h){this.__bD=[];
this.setMaxMessages(h||50);
},members:{__bE:0,__bD:null,__bF:50,setMaxMessages:function(i){this.__bF=i;
this.clearHistory();
},getMaxMessages:function(){return this.__bF;
},process:function(b){var c=this.getMaxMessages();

if(this.__bD.length<c){this.__bD.push(b);
}else{this.__bD[this.__bE++]=b;

if(this.__bE>=c){this.__bE=0;
}}},getAllLogEvents:function(){return this.retrieveLogEvents(this.getMaxMessages());
},retrieveLogEvents:function(d){if(d>this.__bD.length){d=this.__bD.length;
}
if(this.__bD.length==this.getMaxMessages()){var f=this.__bE-1;
}else{f=this.__bD.length-1;
}var e=f-d+1;

if(e<0){e+=this.__bD.length;
}var g;

if(e<=f){g=this.__bD.slice(e,f+1);
}else{g=this.__bD.slice(e,this.__bD.length).concat(this.__bD.slice(0,f+1));
}return g;
},clearHistory:function(){this.__bD=[];
this.__bE=0;
}}});
})();
(function(){var B="node",A="error",z="...(+",y="array",x=")",w="info",v="instance",u="string",t="null",s="class",W="number",V="stringify",U="]",T="unknown",S="function",R="boolean",Q="debug",P="map",O="undefined",N="qx.log.Logger",I=")}",J="#",G="warn",H="document",E="{...(",F="[",C="text[",D="[...(",K="\n",L=")]",M="object";
qx.Class.define(N,{statics:{__bG:Q,setLevel:function(bK){this.__bG=bK;
},getLevel:function(){return this.__bG;
},setTreshold:function(bF){this.__bJ.setMaxMessages(bF);
},getTreshold:function(){return this.__bJ.getMaxMessages();
},__bH:{},__bI:0,register:function(by){if(by.$$id){return;
}var bz=this.__bI++;
this.__bH[bz]=by;
by.$$id=bz;
var bA=this.__bJ.getAllLogEvents();

for(var i=0,l=bA.length;i<l;i++){by.process(bA[i]);
}},unregister:function(X){var Y=X.$$id;

if(Y==null){return;
}delete this.__bH[Y];
delete X.$$id;
},debug:function(q,r){qx.log.Logger.__bL(Q,arguments);
},info:function(bd,be){qx.log.Logger.__bL(w,arguments);
},warn:function(o,p){qx.log.Logger.__bL(G,arguments);
},error:function(bG,bH){qx.log.Logger.__bL(A,arguments);
},trace:function(n){qx.log.Logger.__bL(w,[n,qx.dev.StackTrace.getStackTrace().join(K)]);
},deprecatedMethodWarning:function(bv,bw){var bx;
{};
},deprecatedClassWarning:function(bs,bt){var bu;
{};
},deprecatedEventWarning:function(bf,event,bg){var bh;
{};
},deprecatedMixinWarning:function(ba,bb){var bc;
{};
},deprecatedConstantWarning:function(bB,bC,bD){var self,bE;
{};
},clear:function(){this.__bJ.clearHistory();
},__bJ:new qx.log.appender.RingBuffer(50),__bK:{debug:0,info:1,warn:2,error:3},__bL:function(bi,bj){var bo=this.__bK;

if(bo[bi]<bo[this.__bG]){return;
}var bl=bj.length<2?null:bj[0];
var bn=bl?1:0;
var bk=[];

for(var i=bn,l=bj.length;i<l;i++){bk.push(this.__bN(bj[i],true));
}var bp=new Date;
var bq={time:bp,offset:bp-qx.Bootstrap.LOADSTART,level:bi,items:bk,win:window};
if(bl){if(bl instanceof qx.core.Object){bq.object=bl.$$hash;
}else if(bl.$$type){bq.clazz=bl;
}}this.__bJ.process(bq);
var br=this.__bH;

for(var bm in br){br[bm].process(bq);
}},__bM:function(a){if(a===undefined){return O;
}else if(a===null){return t;
}
if(a.$$type){return s;
}var b=typeof a;

if(b===S||b==u||b===W||b===R){return b;
}else if(b===M){if(a.nodeType){return B;
}else if(a.classname){return v;
}else if(a instanceof Array){return y;
}else if(a instanceof Error){return A;
}else{return P;
}}
if(a.toString){return V;
}return T;
},__bN:function(c,d){var m=this.__bM(c);
var g=T;
var f=[];

switch(m){case t:case O:g=m;
break;
case u:case W:case R:g=c;
break;
case B:if(c.nodeType===9){g=H;
}else if(c.nodeType===3){g=C+c.nodeValue+U;
}else if(c.nodeType===1){g=c.nodeName.toLowerCase();

if(c.id){g+=J+c.id;
}}else{g=B;
}break;
case S:g=qx.lang.Function.getName(c)||m;
break;
case v:g=c.basename+F+c.$$hash+U;
break;
case s:case V:g=c.toString();
break;
case A:f=qx.dev.StackTrace.getStackTraceFromError(c);
g=c.toString();
break;
case y:if(d){g=[];

for(var i=0,l=c.length;i<l;i++){if(g.length>20){g.push(z+(l-i)+x);
break;
}g.push(this.__bN(c[i],false));
}}else{g=D+c.length+L;
}break;
case P:if(d){var e;
var k=[];

for(var j in c){k.push(j);
}k.sort();
g=[];

for(var i=0,l=k.length;i<l;i++){if(g.length>20){g.push(z+(l-i)+x);
break;
}j=k[i];
e=this.__bN(c[j],false);
e.key=j;
g.push(e);
}}else{var h=0;

for(var j in c){h++;
}g=E+h+I;
}break;
}return {type:m,text:g,trace:f};
}},defer:function(bI){var bJ=qx.Bootstrap.$$logs;

for(var i=0;i<bJ.length;i++){this.__bL(bJ[i][0],bJ[i][1]);
}qx.Bootstrap.debug=bI.debug;
qx.Bootstrap.info=bI.info;
qx.Bootstrap.warn=bI.warn;
qx.Bootstrap.error=bI.error;
qx.Bootstrap.trace=bI.trace;
}});
})();
(function(){var s="set",r="get",q="reset",p="qx.core.Object",o="]",n="[",m="$$user_",k="Object";
qx.Class.define(p,{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:k},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+n+this.$$hash+o;
},base:function(C,D){{};

if(arguments.length===1){return C.callee.base.call(this);
}else{return C.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(c){return c.callee.self;
},clone:function(){var W=this.constructor;
var V=new W;
var Y=qx.Class.getProperties(W);
var X=qx.core.Property.$$store.user;
var ba=qx.core.Property.$$method.set;
var name;
for(var i=0,l=Y.length;i<l;i++){name=Y[i];

if(this.hasOwnProperty(X[name])){V[ba[name]](this[X[name]]);
}}return V;
},set:function(bi,bj){var bl=qx.core.Property.$$method.set;

if(qx.Bootstrap.isString(bi)){if(!this[bl[bi]]){if(this[s+qx.Bootstrap.firstUp(bi)]!=undefined){this[s+qx.Bootstrap.firstUp(bi)](bj);
return;
}{};
}return this[bl[bi]](bj);
}else{for(var bk in bi){if(!this[bl[bk]]){if(this[s+qx.Bootstrap.firstUp(bk)]!=undefined){this[s+qx.Bootstrap.firstUp(bk)](bi[bk]);
continue;
}{};
}this[bl[bk]](bi[bk]);
}return this;
}},get:function(bs){var bt=qx.core.Property.$$method.get;

if(!this[bt[bs]]){if(this[r+qx.Bootstrap.firstUp(bs)]!=undefined){return this[r+qx.Bootstrap.firstUp(bs)]();
}{};
}return this[bt[bs]]();
},reset:function(E){var F=qx.core.Property.$$method.reset;

if(!this[F[E]]){if(this[q+qx.Bootstrap.firstUp(E)]!=undefined){this[q+qx.Bootstrap.firstUp(E)]();
return;
}{};
}this[F[E]]();
},__bO:qx.event.Registration,addListener:function(t,u,self,v){if(!this.$$disposed){return this.__bO.addListener(this,t,u,self,v);
}return null;
},addListenerOnce:function(bu,bv,self,bw){var bx=function(e){bv.call(self||this,e);
this.removeListener(bu,bx,this,bw);
};
return this.addListener(bu,bx,this,bw);
},removeListener:function(bf,bg,self,bh){if(!this.$$disposed){return this.__bO.removeListener(this,bf,bg,self,bh);
}return false;
},removeListenerById:function(a){if(!this.$$disposed){return this.__bO.removeListenerById(this,a);
}return false;
},hasListener:function(by,bz){return this.__bO.hasListener(this,by,bz);
},dispatchEvent:function(g){if(!this.$$disposed){return this.__bO.dispatchEvent(this,g);
}return true;
},fireEvent:function(bb,bc,bd){if(!this.$$disposed){return this.__bO.fireEvent(this,bb,bc,bd);
}return true;
},fireNonBubblingEvent:function(bp,bq,br){if(!this.$$disposed){return this.__bO.fireNonBubblingEvent(this,bp,bq,br);
}return true;
},fireDataEvent:function(J,K,L,M){if(!this.$$disposed){if(L===undefined){L=null;
}return this.__bO.fireNonBubblingEvent(this,J,qx.event.type.Data,[K,L,!!M]);
}return true;
},__bP:null,setUserData:function(h,j){if(!this.__bP){this.__bP={};
}this.__bP[h]=j;
},getUserData:function(bm){if(!this.__bP){return null;
}var bn=this.__bP[bm];
return bn===undefined?null:bn;
},__bQ:qx.log.Logger,debug:function(w){this.__bQ.debug(this,w);
},info:function(f){this.__bQ.info(this,f);
},warn:function(b){this.__bQ.warn(this,b);
},error:function(be){this.__bQ.error(this,be);
},trace:function(){this.__bQ.trace(this);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){var A,y;
if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
{};
var z=this.constructor;
var x;

while(z.superclass){if(z.$$destructor){z.$$destructor.call(this);
}if(z.$$includes){x=z.$$flatIncludes;

for(var i=0,l=x.length;i<l;i++){if(x[i].$$destructor){x[i].$$destructor.call(this);
}}}z=z.superclass;
}var B=qx.Class.getProperties(this.constructor);

for(var i=0,l=B.length;i<l;i++){delete this[m+B[i]];
}{};
},_disposeFields:function(d){qx.Bootstrap.warn("Don't use '_disposeFields' - instead assign directly to 'null'");
qx.util.DisposeUtil.disposeFields(this,arguments);
},_disposeObjects:function(G){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeArray:function(H){qx.util.DisposeUtil.disposeArray(this,H);
},_disposeMap:function(bo){qx.util.DisposeUtil.disposeMap(this,bo);
}},settings:{"qx.disposerDebugLevel":0},defer:function(I){{};
},destruct:function(){qx.event.Registration.removeAllListeners(this);
qx.core.ObjectRegistry.unregister(this);
this.__bP=null;
var P=this.constructor;
var T;
var U=qx.core.Property.$$store;
var R=U.user;
var S=U.theme;
var N=U.inherit;
var Q=U.useinit;
var O=U.init;

while(P){T=P.$$properties;

if(T){for(var name in T){if(T[name].dispose){this[R[name]]=this[S[name]]=this[N[name]]=this[Q[name]]=this[O[name]]=undefined;
}}}P=P.superclass;
}}});
})();
(function(){var a="qx.ui.decoration.IDecorator";
qx.Interface.define(a,{members:{getMarkup:function(){},resize:function(b,c,d){},tint:function(e,f){},getInsets:function(){}}});
})();
(function(){var i="Number",h="_applyInsets",g="abstract",f="insetRight",e="insetTop",d="insetBottom",c="qx.ui.decoration.Abstract",b="shorthand",a="insetLeft";
qx.Class.define(c,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:g,properties:{insetLeft:{check:i,nullable:true,apply:h},insetRight:{check:i,nullable:true,apply:h},insetBottom:{check:i,nullable:true,apply:h},insetTop:{check:i,nullable:true,apply:h},insets:{group:[e,f,d,a],mode:b}},members:{__bR:null,_getDefaultInsets:function(){throw new Error("Abstract method called.");
},_isInitialized:function(){throw new Error("Abstract method called.");
},_resetInsets:function(){this.__bR=null;
},getInsets:function(){if(this.__bR){return this.__bR;
}var j=this._getDefaultInsets();
return this.__bR={left:this.getInsetLeft()==null?j.left:this.getInsetLeft(),right:this.getInsetRight()==null?j.right:this.getInsetRight(),bottom:this.getInsetBottom()==null?j.bottom:this.getInsetBottom(),top:this.getInsetTop()==null?j.top:this.getInsetTop()};
},_applyInsets:function(){{};
this.__bR=null;
}},destruct:function(){this.__bR=null;
}});
})();
(function(){var q="_applyBackground",p="repeat",o="mshtml",n="backgroundPositionX",m="",l="backgroundPositionY",k="no-repeat",j="scale",i=" ",h="repeat-x",c="qx.client",g="repeat-y",f="hidden",b="qx.ui.decoration.MBackgroundImage",a="String",e='"></div>',d='<div style="';
qx.Mixin.define(b,{properties:{backgroundImage:{check:a,nullable:true,apply:q},backgroundRepeat:{check:[p,h,g,k,j],init:p,apply:q},backgroundPositionX:{nullable:true,apply:q},backgroundPositionY:{nullable:true,apply:q},backgroundPosition:{group:[l,n]}},members:{_generateBackgroundMarkup:function(r){{};
var v=m;
var u=this.getBackgroundImage();
var t=this.getBackgroundRepeat();
var top=this.getBackgroundPositionY();

if(top==null){top=0;
}var w=this.getBackgroundPositionX();

if(w==null){w=0;
}r.backgroundPosition=w+i+top;
if(u){var s=qx.util.AliasManager.getInstance().resolve(u);
v=qx.bom.element.Decoration.create(s,t,r);
}else{if(r){if(qx.core.Variant.isSet(c,o)){if(qx.bom.client.Engine.VERSION<7||qx.bom.client.Feature.QUIRKS_MODE){r.overflow=f;
}}v=d+qx.bom.element.Style.compile(r)+e;
}}return v;
},_applyBackground:function(){{};
}}});
})();
(function(){var o="_applyStyle",n="Color",m="px",l="solid",k="dotted",j="double",i="dashed",h="",g="_applyWidth",f="qx.ui.decoration.Uniform",c="px ",e=" ",d="scale",b="PositiveInteger",a="absolute";
qx.Class.define(f,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(s,t,u){arguments.callee.base.call(this);
if(s!=null){this.setWidth(s);
}
if(t!=null){this.setStyle(t);
}
if(u!=null){this.setColor(u);
}},properties:{width:{check:b,init:0,apply:g},style:{nullable:true,check:[l,k,i,j],init:l,apply:o},color:{nullable:true,check:n,apply:o},backgroundColor:{check:n,nullable:true,apply:o}},members:{__bS:null,_getDefaultInsets:function(){var v=this.getWidth();
return {top:v,right:v,bottom:v,left:v};
},_isInitialized:function(){return !!this.__bS;
},getMarkup:function(){if(this.__bS){return this.__bS;
}var B={position:a,top:0,left:0};
var C=this.getWidth();
{};
var E=qx.theme.manager.Color.getInstance();
B.border=C+c+this.getStyle()+e+E.resolve(this.getColor());
var D=this._generateBackgroundMarkup(B);
return this.__bS=D;
},resize:function(w,x,y){var A=this.getBackgroundImage()&&this.getBackgroundRepeat()==d;

if(A||qx.bom.client.Feature.CONTENT_BOX){var z=this.getWidth()*2;
x-=z;
y-=z;
if(x<0){x=0;
}
if(y<0){y=0;
}}w.style.width=x+m;
w.style.height=y+m;
},tint:function(p,q){var r=qx.theme.manager.Color.getInstance();

if(q==null){q=this.getBackgroundColor();
}p.style.backgroundColor=r.resolve(q)||h;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this.__bS=null;
}});
})();
(function(){var f="px",e="qx.ui.decoration.Background",d="",c="_applyStyle",b="Color",a="absolute";
qx.Class.define(e,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(g){arguments.callee.base.call(this);

if(g!=null){this.setBackgroundColor(g);
}},properties:{backgroundColor:{check:b,nullable:true,apply:c}},members:{__bT:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__bT;
},getMarkup:function(){if(this.__bT){return this.__bT;
}var n={position:a,top:0,left:0};
var o=this._generateBackgroundMarkup(n);
return this.__bT=o;
},resize:function(k,l,m){k.style.width=l+f;
k.style.height=m+f;
},tint:function(h,i){var j=qx.theme.manager.Color.getInstance();

if(i==null){i=this.getBackgroundColor();
}h.style.backgroundColor=j.resolve(i)||d;
},_applyStyle:function(){{};
}},destruct:function(){this.__bT=null;
}});
})();
(function(){var j="_applyStyle",i="solid",h="Color",g="double",f="px ",e="dotted",d="_applyWidth",c="dashed",b="Number",a=" ",F="shorthand",E="px",D="widthTop",C="styleRight",B="styleLeft",A="widthLeft",z="widthBottom",y="styleTop",x="colorBottom",w="styleBottom",q="widthRight",r="colorLeft",o="colorRight",p="colorTop",m="scale",n="border-top",k="border-left",l="border-right",s="qx.ui.decoration.Single",t="",v="border-bottom",u="absolute";
qx.Class.define(s,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(T,U,V){arguments.callee.base.call(this);
if(T!=null){this.setWidth(T);
}
if(U!=null){this.setStyle(U);
}
if(V!=null){this.setColor(V);
}},properties:{widthTop:{check:b,init:0,apply:d},widthRight:{check:b,init:0,apply:d},widthBottom:{check:b,init:0,apply:d},widthLeft:{check:b,init:0,apply:d},styleTop:{nullable:true,check:[i,e,c,g],init:i,apply:j},styleRight:{nullable:true,check:[i,e,c,g],init:i,apply:j},styleBottom:{nullable:true,check:[i,e,c,g],init:i,apply:j},styleLeft:{nullable:true,check:[i,e,c,g],init:i,apply:j},colorTop:{nullable:true,check:h,apply:j},colorRight:{nullable:true,check:h,apply:j},colorBottom:{nullable:true,check:h,apply:j},colorLeft:{nullable:true,check:h,apply:j},backgroundColor:{check:h,nullable:true,apply:j},left:{group:[A,B,r]},right:{group:[q,C,o]},top:{group:[D,y,p]},bottom:{group:[z,w,x]},width:{group:[D,q,z,A],mode:F},style:{group:[y,C,w,B],mode:F},color:{group:[p,o,x,r],mode:F}},members:{__bU:null,_getDefaultInsets:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};
},_isInitialized:function(){return !!this.__bU;
},getMarkup:function(J){if(this.__bU){return this.__bU;
}var K=qx.theme.manager.Color.getInstance();
var L={};
var N=this.getWidthTop();

if(N>0){L[n]=N+f+this.getStyleTop()+a+K.resolve(this.getColorTop());
}var N=this.getWidthRight();

if(N>0){L[l]=N+f+this.getStyleRight()+a+K.resolve(this.getColorRight());
}var N=this.getWidthBottom();

if(N>0){L[v]=N+f+this.getStyleBottom()+a+K.resolve(this.getColorBottom());
}var N=this.getWidthLeft();

if(N>0){L[k]=N+f+this.getStyleLeft()+a+K.resolve(this.getColorLeft());
}{};
L.position=u;
L.top=0;
L.left=0;
var M=this._generateBackgroundMarkup(L);
return this.__bU=M;
},resize:function(O,P,Q){var S=this.getBackgroundImage()&&this.getBackgroundRepeat()==m;

if(S||qx.bom.client.Feature.CONTENT_BOX){var R=this.getInsets();
P-=R.left+R.right;
Q-=R.top+R.bottom;
if(P<0){P=0;
}
if(Q<0){Q=0;
}}O.style.width=P+E;
O.style.height=Q+E;
},tint:function(G,H){var I=qx.theme.manager.Color.getInstance();

if(H==null){H=this.getBackgroundColor();
}G.style.backgroundColor=I.resolve(H)||t;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this.__bU=null;
}});
})();
(function(){var m="Number",l="_applyInsets",k="-l",j="insetRight",i="insetTop",h="_applyBaseImage",g="insetBottom",f="set",e="shorthand",d="-t",a="insetLeft",c="String",b="qx.ui.decoration.Grid";
qx.Class.define(b,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],construct:function(s,t){arguments.callee.base.call(this);

if(qx.ui.decoration.css3.BorderImage.IS_SUPPORTED){this.__bV=new qx.ui.decoration.css3.BorderImage();

if(s){this.__bW(s);
}}else{this.__bV=new qx.ui.decoration.GridDiv(s);
}
if(t!=null){this.__bV.setInsets(t);
}},properties:{baseImage:{check:c,nullable:true,apply:h},insetLeft:{check:m,nullable:true,apply:l},insetRight:{check:m,nullable:true,apply:l},insetBottom:{check:m,nullable:true,apply:l},insetTop:{check:m,nullable:true,apply:l},insets:{group:[i,j,g,a],mode:e}},members:{__bV:null,getMarkup:function(){return this.__bV.getMarkup();
},resize:function(n,o,p){this.__bV.resize(n,o,p);
},tint:function(F,G){},getInsets:function(){return this.__bV.getInsets();
},_applyInsets:function(C,D,name){var E=f+qx.lang.String.firstUp(name);
this.__bV[E](C);
},_applyBaseImage:function(q,r){if(this.__bV instanceof qx.ui.decoration.GridDiv){this.__bV.setBaseImage(q);
}else{this.__bW(q);
}},__bW:function(u){this.__bV.setBorderImage(u);
var y=qx.util.AliasManager.getInstance().resolve(u);
var z=/(.*)(\.[a-z]+)$/.exec(y);
var w=z[1];
var x=z[2];
var v=qx.util.ResourceManager.getInstance();
var A=v.getImageHeight(w+d+x);
var B=v.getImageWidth(w+k+x);
this.__bV.setSlice([A,B]);
}}});
})();
(function(){var j="_applyStyle",i='"></div>',h="Color",g="1px",f='<div style="',e='border:',d="1px solid ",c="",b=";",a="px",v='</div>',u="qx.ui.decoration.Beveled",t='<div style="position:absolute;top:1px;left:1px;',s='border-bottom:',r='border-right:',q='border-left:',p='border-top:',o="Number",n='<div style="position:absolute;top:1px;left:0px;',m='position:absolute;top:0px;left:1px;',k='<div style="overflow:hidden;font-size:0;line-height:0;">',l="absolute";
qx.Class.define(u,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(H,I,J){arguments.callee.base.call(this);
if(H!=null){this.setOuterColor(H);
}
if(I!=null){this.setInnerColor(I);
}
if(J!=null){this.setInnerOpacity(J);
}},properties:{innerColor:{check:h,nullable:true,apply:j},innerOpacity:{check:o,init:1,apply:j},outerColor:{check:h,nullable:true,apply:j},backgroundColor:{check:h,nullable:true,apply:j}},members:{__bX:null,_getDefaultInsets:function(){return {top:2,right:2,bottom:2,left:2};
},_isInitialized:function(){return !!this.__bX;
},_applyStyle:function(){{};
},getMarkup:function(){if(this.__bX){return this.__bX;
}var K=qx.theme.manager.Color.getInstance();
var L=[];
var O=d+K.resolve(this.getOuterColor())+b;
var N=d+K.resolve(this.getInnerColor())+b;
L.push(k);
L.push(f);
L.push(e,O);
L.push(qx.bom.element.Opacity.compile(0.35));
L.push(i);
L.push(n);
L.push(q,O);
L.push(r,O);
L.push(i);
L.push(f);
L.push(m);
L.push(p,O);
L.push(s,O);
L.push(i);
var M={position:l,top:g,left:g};
L.push(this._generateBackgroundMarkup(M));
L.push(t);
L.push(e,N);
L.push(qx.bom.element.Opacity.compile(this.getInnerOpacity()));
L.push(i);
L.push(v);
return this.__bX=L.join(c);
},resize:function(w,x,y){if(x<4){x=4;
}
if(y<4){y=4;
}if(qx.bom.client.Feature.CONTENT_BOX){var outerWidth=x-2;
var outerHeight=y-2;
var E=outerWidth;
var D=outerHeight;
var innerWidth=x-4;
var innerHeight=y-4;
}else{var outerWidth=x;
var outerHeight=y;
var E=x-2;
var D=y-2;
var innerWidth=E;
var innerHeight=D;
}var G=a;
var C=w.childNodes[0].style;
C.width=outerWidth+G;
C.height=outerHeight+G;
var B=w.childNodes[1].style;
B.width=outerWidth+G;
B.height=D+G;
var A=w.childNodes[2].style;
A.width=E+G;
A.height=outerHeight+G;
var z=w.childNodes[3].style;
z.width=E+G;
z.height=D+G;
var F=w.childNodes[4].style;
F.width=innerWidth+G;
F.height=innerHeight+G;
},tint:function(P,Q){var R=qx.theme.manager.Color.getInstance();

if(Q==null){Q=this.getBackgroundColor();
}P.childNodes[3].style.backgroundColor=R.resolve(Q)||c;
}},destruct:function(){this.__bX=null;
}});
})();
(function(){var m="solid",l="scale",k="border-main",j="white",i="repeat-x",h="border-separator",g="background-light",f="invalid",e="border-focused-invalid",d="border-disabled",bs="decoration/table/header-cell.png",br="decoration/form/input.png",bq="#f8f8f8",bp="decoration/scrollbar/scrollbar-button-bg-horizontal.png",bo="#b6b6b6",bn="background-pane",bm="repeat-y",bl="decoration/form/input-focused.png",bk="#33508D",bj="decoration/selection.png",t="border-input",u="decoration/scrollbar/scrollbar-button-bg-vertical.png",r="decoration/tabview/tab-button-top-active.png",s="black",p="decoration/form/button-c.png",q="decoration/scrollbar/scrollbar-bg-vertical.png",n="decoration/form/button.png",o="decoration/form/button-checked.png",B="decoration/tabview/tab-button-left-inactive.png",C="decoration/groupbox/groupbox.png",O="#FAFAFA",K="decoration/pane/pane.png",W="dotted",R="decoration/toolbar/toolbar-part.gif",bf="decoration/tabview/tab-button-top-inactive.png",bc="decoration/menu/bar-background.png",G="center",bi="decoration/tabview/tab-button-bottom-active.png",bh="decoration/form/button-hovered.png",bg="decoration/form/tooltip-error-arrow.png",F="decoration/window/captionbar-inactive.png",I="qx/decoration/Modern",J="decoration/menu/background.png",M="decoration/window/statusbar.png",P="border-focused",S="table-focus-indicator",Y="#F2F2F2",be="decoration/form/button-checked-c.png",v="decoration/scrollbar/scrollbar-bg-horizontal.png",w="qx.theme.modern.Decoration",H="#f4f4f4",V="decoration/shadow/shadow-small.png",U="decoration/app-header.png",T="decoration/tabview/tabview-pane.png",bb="decoration/form/tooltip-error.png",ba="decoration/form/button-focused.png",Q="decoration/tabview/tab-button-bottom-inactive.png",X="decoration/form/button-disabled.png",a="decoration/tabview/tab-button-right-active.png",bd="decoration/form/button-pressed.png",x="no-repeat",y="decoration/window/captionbar-active.png",L="decoration/tabview/tab-button-left-active.png",b="background-splitpane",c="decoration/form/button-checked-focused.png",E="#C5C5C5",z="decoration/toolbar/toolbar-gradient.png",A="decoration/tabview/tab-button-right-inactive.png",D="#b8b8b8",N="decoration/shadow/shadow.png";
qx.Theme.define(w,{aliases:{decoration:I},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:k}},"selected":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bj,backgroundRepeat:l}},"selected-dragover":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bj,backgroundRepeat:l,bottom:[2,m,bk]}},"dragover":{decorator:qx.ui.decoration.Single,style:{bottom:[2,m,bk]}},"pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:K,insets:[0,2,3,0]}},"group":{decorator:qx.ui.decoration.Grid,style:{baseImage:C}},"border-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"keyboard-focus":{decorator:qx.ui.decoration.Single,style:{width:1,color:s,style:W}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:h}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:h}},"tooltip-error":{decorator:qx.ui.decoration.Grid,style:{baseImage:bb,insets:[2,5,5,2]}},"tooltip-error-arrow":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bg,backgroundPositionY:G,backgroundRepeat:x,insets:[0,0,0,10]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:N,insets:[4,8,8,4]}},"shadow-popup":{decorator:qx.ui.decoration.Grid,style:{baseImage:V,insets:[0,3,3,0]}},"scrollbar-horizontal":{decorator:qx.ui.decoration.Background,style:{backgroundImage:v,backgroundRepeat:i}},"scrollbar-vertical":{decorator:qx.ui.decoration.Background,style:{backgroundImage:q,backgroundRepeat:bm}},"scrollbar-slider-horizontal":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bp,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-horizontal-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bp,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"scrollbar-slider-vertical":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:u,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-vertical-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:u,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"button":{decorator:qx.ui.decoration.Grid,style:{baseImage:n,insets:2}},"button-disabled":{decorator:qx.ui.decoration.Grid,style:{baseImage:X,insets:2}},"button-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:ba,insets:2}},"button-hovered":{decorator:qx.ui.decoration.Grid,style:{baseImage:bh,insets:2}},"button-pressed":{decorator:qx.ui.decoration.Grid,style:{baseImage:bd,insets:2}},"button-checked":{decorator:qx.ui.decoration.Grid,style:{baseImage:o,insets:2}},"button-checked-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:c,insets:2}},"button-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[1]}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[0]}},"input":{decorator:qx.ui.decoration.Beveled,style:{outerColor:t,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"input-focused":{decorator:qx.ui.decoration.Beveled,style:{outerColor:t,innerColor:P,backgroundImage:bl,backgroundRepeat:i,backgroundColor:g}},"input-focused-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,backgroundImage:bl,backgroundRepeat:i,backgroundColor:g,insets:[2]}},"input-disabled":{decorator:qx.ui.decoration.Beveled,style:{outerColor:d,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"toolbar":{decorator:qx.ui.decoration.Background,style:{backgroundImage:z,backgroundRepeat:l}},"toolbar-button-hovered":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bo,innerColor:bq,backgroundImage:p,backgroundRepeat:l}},"toolbar-button-checked":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bo,innerColor:bq,backgroundImage:be,backgroundRepeat:l}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,widthRight:1,colorLeft:D,colorRight:H,styleLeft:m,styleRight:m}},"toolbar-part":{decorator:qx.ui.decoration.Background,style:{backgroundImage:R,backgroundRepeat:bm}},"tabview-pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:T,insets:[4,6,7,4]}},"tabview-page-button-top-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:r}},"tabview-page-button-top-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:bf}},"tabview-page-button-bottom-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:bi}},"tabview-page-button-bottom-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:Q}},"tabview-page-button-left-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:L}},"tabview-page-button-left-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:B}},"tabview-page-button-right-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:a}},"tabview-page-button-right-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:A}},"splitpane":{decorator:qx.ui.decoration.Uniform,style:{backgroundColor:bn,width:3,color:b,style:m}},"window":{decorator:qx.ui.decoration.Single,style:{backgroundColor:bn,width:1,color:k,widthTop:0}},"window-captionbar-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:y}},"window-captionbar-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:F}},"window-statusbar":{decorator:qx.ui.decoration.Grid,style:{baseImage:M}},"table":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:k,style:m}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m,widthBottom:1,colorBottom:j,styleBottom:m}},"table-column-button":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:S,style:m}},"progressive-table-header":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"progressive-table-header-cell":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthRight:1,colorRight:Y,style:m}},"menu":{decorator:qx.ui.decoration.Single,style:{backgroundImage:J,backgroundRepeat:l,width:1,color:k,style:m}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:E,widthBottom:1,colorBottom:O}},"menubar":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bc,backgroundRepeat:l,width:1,color:h,style:m}},"app-header":{decorator:qx.ui.decoration.Background,style:{backgroundImage:U,backgroundRepeat:l}}}});
})();
(function(){var a="testie.theme.Decoration";
qx.Theme.define(a,{extend:qx.theme.modern.Decoration,decorations:{}});
})();
(function(){var m="iPod",l="Win32",k="",j="Win64",i="Linux",h="BSD",g="Macintosh",f="iPhone",e="Windows",d="qx.bom.client.Platform",a="X11",c="MacIntel",b="MacPPC";
qx.Class.define(d,{statics:{NAME:"",WIN:false,MAC:false,UNIX:false,UNKNOWN_PLATFORM:false,__bY:function(){var n=navigator.platform;
if(n==null||n===k){n=navigator.userAgent;
}
if(n.indexOf(e)!=-1||n.indexOf(l)!=-1||n.indexOf(j)!=-1){this.WIN=true;
this.NAME="win";
}else if(n.indexOf(g)!=-1||n.indexOf(b)!=-1||n.indexOf(c)!=-1||n.indexOf(m)!=-1||n.indexOf(f)!=-1){this.MAC=true;
this.NAME="mac";
}else if(n.indexOf(a)!=-1||n.indexOf(i)!=-1||n.indexOf(h)!=-1){this.UNIX=true;
this.NAME="unix";
}else{this.UNKNOWN_PLATFORM=true;
this.WIN=true;
this.NAME="win";
}}},defer:function(o){o.__bY();
}});
})();
(function(){var j="win98",i="osx2",h="osx0",g="osx4",f="win95",e="win2000",d="osx1",c="osx5",b="osx3",a="Windows NT 5.01",H=")",G="winxp",F="freebsd",E="sunos",D="SV1",C="|",B="nintendods",A="winnt4",z="wince",y="winme",q="os9",r="\.",o="osx",p="linux",m="netbsd",n="winvista",k="openbsd",l="(",s="win2003",t="symbian",v="win7",u="g",x="qx.bom.client.System",w=" Mobile/";
qx.Class.define(x,{statics:{NAME:"",SP1:false,SP2:false,WIN95:false,WIN98:false,WINME:false,WINNT4:false,WIN2000:false,WINXP:false,WIN2003:false,WINVISTA:false,WIN7:false,WINCE:false,LINUX:false,SUNOS:false,FREEBSD:false,NETBSD:false,OPENBSD:false,OSX:false,OS9:false,SYMBIAN:false,NINTENDODS:false,PSP:false,IPHONE:false,UNKNOWN_SYSTEM:false,__ca:{"Windows NT 6.1":v,"Windows NT 6.0":n,"Windows NT 5.2":s,"Windows NT 5.1":G,"Windows NT 5.0":e,"Windows 2000":e,"Windows NT 4.0":A,"Win 9x 4.90":y,"Windows CE":z,"Windows 98":j,"Win98":j,"Windows 95":f,"Win95":f,"Linux":p,"FreeBSD":F,"NetBSD":m,"OpenBSD":k,"SunOS":E,"Symbian System":t,"Nitro":B,"PSP":"sonypsp","Mac OS X 10_5":c,"Mac OS X 10.5":c,"Mac OS X 10_4":g,"Mac OS X 10.4":g,"Mac OS X 10_3":b,"Mac OS X 10.3":b,"Mac OS X 10_2":i,"Mac OS X 10.2":i,"Mac OS X 10_1":d,"Mac OS X 10.1":d,"Mac OS X 10_0":h,"Mac OS X 10.0":h,"Mac OS X":o,"Mac OS 9":q},__cb:function(){var L=navigator.userAgent;
var K=[];

for(var J in this.__ca){K.push(J);
}var M=new RegExp(l+K.join(C).replace(/\./g,r)+H,u);

if(!M.test(L)){this.UNKNOWN_SYSTEM=true;

if(!qx.bom.client.Platform.UNKNOWN_PLATFORM){if(qx.bom.client.Platform.UNIX){this.NAME="linux";
this.LINUX=true;
}else if(qx.bom.client.Platform.MAC){this.NAME="osx5";
this.OSX=true;
}else{this.NAME="winxp";
this.WINXP=true;
}}else{this.NAME="winxp";
this.WINXP=true;
}return;
}
if(qx.bom.client.Engine.WEBKIT&&RegExp(w).test(navigator.userAgent)){this.IPHONE=true;
this.NAME="iphone";
}else{this.NAME=this.__ca[RegExp.$1];
this[this.NAME.toUpperCase()]=true;

if(qx.bom.client.Platform.WIN){if(L.indexOf(a)!==-1){this.SP1=true;
}else if(qx.bom.client.Engine.MSHTML&&L.indexOf(D)!==-1){this.SP2=true;
}}}}},defer:function(I){I.__cb();
}});
})();
(function(){var n="Liberation Sans",m="Arial",l="Lucida Grande",k="sans-serif",j="Tahoma",i="Candara",h="Segoe UI",g="Consolas",f="Courier New",e="Monaco",b="monospace",d="Lucida Console",c="qx.theme.modern.Font",a="DejaVu Sans Mono";
qx.Theme.define(c,{fonts:{"default":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k]},"bold":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k],bold:true},"small":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?11:10,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k]},"monospace":{size:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[d,e]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[g]:[g,a,f,b]}}});
})();
(function(){var a="testie.theme.Font";
qx.Theme.define(a,{extend:qx.theme.modern.Font,fonts:{}});
})();
(function(){var c="Tango",b="qx/icon/Tango",a="qx.theme.icon.Tango";
qx.Theme.define(a,{title:c,aliases:{"icon":b},icons:{}});
})();
(function(){var eN="button-frame",eM="atom",eL="widget",eK="main",eJ="button",eI="text-selected",eH="image",eG="bold",eF="middle",eE="background-light",dq="text-disabled",dp="groupbox",dn="decoration/arrows/down.png",dm="cell",dl="selected",dk="border-invalid",dj="input",di="input-disabled",dh="menu-button",dg="input-focused-invalid",eU="toolbar-button",eV="spinner",eS="input-focused",eT="popup",eQ="tooltip",eR="label",eO="list",eP="tree-item",eW="treevirtual-contract",eX="scrollbar",em="datechooser/nav-button",el="text-hovered",eo="center",en="treevirtual-expand",eq="textfield",ep="decoration/arrows/right.png",es="background-application",er="radiobutton",ek="white",ej="invalid",bl="combobox",bm="right-top",bn="checkbox",bo="text-title",bp="qx/static/blank.gif",bq="scrollbar/button",br="right",bs="combobox/button",bt="icon/16/places/folder.png",bu="text-label",fm="decoration/tree/closed.png",fl="scrollbar-slider-horizontal",fk="decoration/arrows/left.png",fj="button-focused",fq="text-light",fp="menu-slidebar-button",fo="text-input",fn="slidebar/button-forward",fs="background-splitpane",fr=".png",cn="decoration/tree/open.png",co="default",cl="decoration/arrows/down-small.png",cm="datechooser",cr="slidebar/button-backward",cs="selectbox",cp="treevirtual-folder",cq="shadow-popup",cj="icon/16/mimetypes/office-document.png",ck="background-medium",bO="table",bN="decoration/arrows/up.png",bQ="decoration/form/",bP="",bK="-invalid",bJ="icon/16/places/folder-open.png",bM="button-checked",bL="decoration/window/maximize-active-hovered.png",bI="radiobutton-hovered",bH="keyboard-focus",cy="decoration/cursors/",cz="slidebar",cA="tooltip-error-arrow",cB="table-scroller-focus-indicator",cu="move-frame",cv="nodrop",cw="decoration/table/boolean-true.png",cx="table-header-cell",cC="menu",cD="app-header",cc="row-layer",cb="text-inactive",ca="move",bY="radiobutton-checked-focused",bX="decoration/window/restore-active-hovered.png",bW="shadow-window",bV="table-column-button",bU="right.png",cg="tabview-page-button-bottom-inactive",cf="tooltip-error",cE="window-statusbar",cF="button-hovered",cG="decoration/scrollbar/scrollbar-",cH="background-tip",cI="scrollbar-slider-horizontal-disabled",cJ="table-scroller-header",cK="radiobutton-disabled",cL="button-pressed",cM="table-pane",cN="decoration/window/close-active.png",dy="native",dx="checkbox-hovered",dw="button-invalid-shadow",dv="checkbox-checked",dC="decoration/window/minimize-active-hovered.png",dB="menubar",dA="icon/16/actions/dialog-cancel.png",dz="tabview-page-button-top-inactive",dG="tabview-page-button-left-inactive",dF="menu-slidebar",ee="toolbar-button-checked",ef="decoration/tree/open-selected.png",ec="radiobutton-checked",ed="decoration/window/minimize-inactive.png",ea="icon/16/apps/office-calendar.png",eb="group",dX="tabview-page-button-right-inactive",dY="decoration/window/minimize-active.png",eg="decoration/window/restore-inactive.png",eh="checkbox-checked-focused",ew="splitpane",ev="combobox/textfield",ey="button-preselected-focused",ex="decoration/window/close-active-hovered.png",eA="qx/icon/Tango/16/actions/window-close.png",ez="checkbox-pressed",eC="button-disabled",eB="selected-dragover",eu="border-separator",et="decoration/window/maximize-inactive.png",ff="dragover",fg="scrollarea",fh="scrollbar-vertical",fi="decoration/menu/checkbox-invert.gif",fb="decoration/toolbar/toolbar-handle-knob.gif",fc="icon/22/mimetypes/office-document.png",fd="button-preselected",fe="button-checked-focused",eY="up.png",fa="best-fit",bk="decoration/tree/closed-selected.png",bj="qx.theme.modern.Appearance",bi="text-active",bh="checkbox-disabled",bg="toolbar-button-hovered",bf="progressive-table-header",be="decoration/table/select-column-order.png",bd="decoration/menu/radiobutton.gif",bc="decoration/arrows/forward.png",bb="decoration/table/descending.png",bx="window-captionbar-active",by="checkbox-checked-hovered",bv="scrollbar-slider-vertical",bw="toolbar",bB="alias",bC="decoration/window/restore-active.png",bz="decoration/table/boolean-false.png",bA="checkbox-checked-disabled",bE="icon/32/mimetypes/office-document.png",bF="radiobutton-checked-disabled",dK="tabview-pane",dE="decoration/arrows/rewind.png",dR="checkbox-focused",dN="top",dt="#EEE",dr="icon/16/actions/dialog-ok.png",bS="radiobutton-checked-hovered",du="table-header-cell-hovered",ce="window",cd="text-gray",cX="decoration/menu/radiobutton-invert.gif",cY="text-placeholder",da="slider",db="keep-align",dc="down.png",dd="tabview-page-button-top-active",de="icon/32/places/folder-open.png",df="icon/22/places/folder.png",cU="decoration/window/maximize-active.png",cV="checkbox-checked-pressed",ds="decoration/window/close-inactive.png",dQ="tabview-page-button-left-active",dP="toolbar-part",dO="decoration/splitpane/knob-vertical.png",dV=".gif",dU="icon/22/places/folder-open.png",dT="radiobutton-checked-pressed",dS="table-statusbar",dM="radiobutton-pressed",dL="window-captionbar-inactive",bD="copy",ci="radiobutton-focused",ch="decoration/arrows/down-invert.png",dD="decoration/menu/checkbox.gif",ct="decoration/splitpane/knob-horizontal.png",dJ="icon/32/places/folder.png",dI="toolbar-separator",dH="tabview-page-button-bottom-active",bR="decoration/arrows/up-small.png",dW="decoration/table/ascending.png",bG="decoration/arrows/up-invert.png",bT="small",cO="tabview-page-button-right-active",cP="-disabled",cQ="scrollbar-horizontal",cR="progressive-table-header-cell",cS="menu-separator",cT="pane",ei="decoration/arrows/right-invert.png",cW="left.png",eD="icon/16/actions/view-refresh.png";
qx.Theme.define(bj,{appearances:{"widget":{},"root":{style:function(gm){return {backgroundColor:es,textColor:bu,font:co};
}},"label":{style:function(gu){return {textColor:gu.disabled?dq:undefined};
}},"move-frame":{style:function(hC){return {decorator:eK};
}},"resize-frame":cu,"dragdrop-cursor":{style:function(ft){var fu=cv;

if(ft.copy){fu=bD;
}else if(ft.move){fu=ca;
}else if(ft.alias){fu=bB;
}return {source:cy+fu+dV,position:bm,offset:[2,16,2,6]};
}},"image":{style:function(gf){return {opacity:!gf.replacement&&gf.disabled?0.3:1};
}},"atom":{},"atom/label":eR,"atom/icon":eH,"popup":{style:function(hp){return {decorator:eK,backgroundColor:eE,shadow:cq};
}},"button-frame":{alias:eM,style:function(ic){var ie,id;

if(ic.checked&&ic.focused&&!ic.inner){ie=fe;
id=undefined;
}else if(ic.disabled){ie=eC;
id=undefined;
}else if(ic.pressed){ie=cL;
id=el;
}else if(ic.checked){ie=bM;
id=undefined;
}else if(ic.hovered){ie=cF;
id=el;
}else if(ic.preselected&&ic.focused&&!ic.inner){ie=ey;
id=el;
}else if(ic.preselected){ie=fd;
id=el;
}else if(ic.focused&&!ic.inner){ie=fj;
id=undefined;
}else{ie=eJ;
id=undefined;
}return {decorator:ie,textColor:id,shadow:ic.invalid&&!ic.disabled?dw:undefined};
}},"button-frame/image":{style:function(gs){return {opacity:!gs.replacement&&gs.disabled?0.5:1};
}},"button":{alias:eN,include:eN,style:function(gH){return {padding:[2,8],center:true};
}},"hover-button":{alias:eM,include:eM,style:function(n){return {decorator:n.hovered?dl:undefined,textColor:n.hovered?eI:undefined};
}},"splitbutton":{},"splitbutton/button":eJ,"splitbutton/arrow":{alias:eJ,include:eJ,style:function(gn){return {icon:dn,padding:2,marginLeft:1};
}},"checkbox":{alias:eM,style:function(hh){var hj;

if(hh.checked&&hh.focused){hj=eh;
}else if(hh.checked&&hh.disabled){hj=bA;
}else if(hh.checked&&hh.pressed){hj=cV;
}else if(hh.checked&&hh.hovered){hj=by;
}else if(hh.checked){hj=dv;
}else if(hh.disabled){hj=bh;
}else if(hh.focused){hj=dR;
}else if(hh.pressed){hj=ez;
}else if(hh.hovered){hj=dx;
}else{hj=bn;
}var hi=hh.invalid&&!hh.disabled?bK:bP;
return {icon:bQ+hj+hi+fr,gap:6};
}},"radiobutton":{alias:eM,style:function(hl){var hn;

if(hl.checked&&hl.focused){hn=bY;
}else if(hl.checked&&hl.disabled){hn=bF;
}else if(hl.checked&&hl.pressed){hn=dT;
}else if(hl.checked&&hl.hovered){hn=bS;
}else if(hl.checked){hn=ec;
}else if(hl.disabled){hn=cK;
}else if(hl.focused){hn=ci;
}else if(hl.pressed){hn=dM;
}else if(hl.hovered){hn=bI;
}else{hn=er;
}var hm=hl.invalid&&!hl.disabled?bK:bP;
return {icon:bQ+hn+hm+fr,gap:6};
}},"textfield":{style:function(gV){var hb;
var gY=!!gV.focused;
var ha=!!gV.invalid;
var gW=!!gV.disabled;

if(gY&&ha&&!gW){hb=dg;
}else if(gY&&!ha&&!gW){hb=eS;
}else if(gW){hb=di;
}else if(!gY&&ha&&!gW){hb=dk;
}else{hb=dj;
}var gX;

if(gV.disabled){gX=dq;
}else if(gV.showingPlaceholder){gX=cY;
}else{gX=fo;
}return {decorator:hb,padding:[2,4,1],textColor:gX};
}},"textarea":{include:eq,style:function(go){return {padding:4};
}},"spinner":{style:function(f){var j;
var h=!!f.focused;
var i=!!f.invalid;
var g=!!f.disabled;

if(h&&i&&!g){j=dg;
}else if(h&&!i&&!g){j=eS;
}else if(g){j=di;
}else if(!h&&i&&!g){j=dk;
}else{j=dj;
}return {decorator:j};
}},"spinner/textfield":{style:function(v){return {marginRight:2,padding:[2,4,1],textColor:v.disabled?dq:fo};
}},"spinner/upbutton":{alias:eN,include:eN,style:function(fy){return {icon:bR,padding:fy.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"spinner/downbutton":{alias:eN,include:eN,style:function(hR){return {icon:cl,padding:hR.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"datefield":bl,"datefield/button":{alias:bs,include:bs,style:function(M){return {icon:ea,padding:[0,3],decorator:undefined};
}},"datefield/textfield":ev,"datefield/list":{alias:cm,include:cm,style:function(gx){return {decorator:undefined};
}},"groupbox":{style:function(hO){return {legendPosition:dN};
}},"groupbox/legend":{alias:eM,style:function(fR){return {padding:[1,0,1,4],textColor:fR.invalid?ej:bo,font:eG};
}},"groupbox/frame":{style:function(fw){return {padding:12,decorator:eb};
}},"check-groupbox":dp,"check-groupbox/legend":{alias:bn,include:bn,style:function(hQ){return {padding:[1,0,1,4],textColor:hQ.invalid?ej:bo,font:eG};
}},"radio-groupbox":dp,"radio-groupbox/legend":{alias:er,include:er,style:function(fG){return {padding:[1,0,1,4],textColor:fG.invalid?ej:bo,font:eG};
}},"scrollarea":{style:function(fD){return {minWidth:50,minHeight:50};
}},"scrollarea/corner":{style:function(t){return {backgroundColor:es};
}},"scrollarea/pane":eL,"scrollarea/scrollbar-x":eX,"scrollarea/scrollbar-y":eX,"scrollbar":{style:function(ge){if(ge[dy]){return {};
}return {width:ge.horizontal?undefined:16,height:ge.horizontal?16:undefined,decorator:ge.horizontal?cQ:fh,padding:1};
}},"scrollbar/slider":{alias:da,style:function(gy){return {padding:gy.horizontal?[0,1,0,1]:[1,0,1,0]};
}},"scrollbar/slider/knob":{include:eN,style:function(P){var Q=P.horizontal?fl:bv;

if(P.disabled){Q+=cP;
}return {decorator:Q,minHeight:P.horizontal?undefined:9,minWidth:P.horizontal?9:undefined};
}},"scrollbar/button":{alias:eN,include:eN,style:function(G){var H=cG;

if(G.left){H+=cW;
}else if(G.right){H+=bU;
}else if(G.up){H+=eY;
}else{H+=dc;
}
if(G.left||G.right){return {padding:[0,0,0,G.left?3:4],icon:H,width:15,height:14};
}else{return {padding:[0,0,0,2],icon:H,width:14,height:15};
}}},"scrollbar/button-begin":bq,"scrollbar/button-end":bq,"slider":{style:function(fM){var fQ;
var fO=!!fM.focused;
var fP=!!fM.invalid;
var fN=!!fM.disabled;

if(fO&&fP&&!fN){fQ=dg;
}else if(fO&&!fP&&!fN){fQ=eS;
}else if(fN){fQ=di;
}else if(!fO&&fP&&!fN){fQ=dk;
}else{fQ=dj;
}return {decorator:fQ};
}},"slider/knob":{include:eN,style:function(ih){return {decorator:ih.disabled?cI:fl,shadow:undefined,height:14,width:14};
}},"list":{alias:fg,style:function(gL){var gP;
var gN=!!gL.focused;
var gO=!!gL.invalid;
var gM=!!gL.disabled;

if(gN&&gO&&!gM){gP=dg;
}else if(gN&&!gO&&!gM){gP=eS;
}else if(gM){gP=di;
}else if(!gN&&gO&&!gM){gP=dk;
}else{gP=dj;
}return {backgroundColor:eE,decorator:gP};
}},"list/pane":eL,"listitem":{alias:eM,style:function(hD){var hE;

if(hD.dragover){hE=hD.selected?eB:ff;
}else{hE=hD.selected?dl:undefined;
}return {padding:hD.dragover?[4,4,2,4]:4,textColor:hD.selected?eI:undefined,decorator:hE};
}},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:eN,include:eN,style:function(X){return {padding:5,center:true,icon:X.vertical?dn:ep};
}},"slidebar/button-backward":{alias:eN,include:eN,style:function(R){return {padding:5,center:true,icon:R.vertical?bN:fk};
}},"tabview":{style:function(hu){return {contentPadding:16};
}},"tabview/bar":{alias:cz,style:function(fB){var fC={marginBottom:fB.barTop?-1:0,marginTop:fB.barBottom?-4:0,marginLeft:fB.barRight?-3:0,marginRight:fB.barLeft?-1:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};

if(fB.barTop||fB.barBottom){fC.paddingLeft=5;
fC.paddingRight=7;
}else{fC.paddingTop=5;
fC.paddingBottom=7;
}return fC;
}},"tabview/bar/button-forward":{include:fn,alias:fn,style:function(gI){if(gI.barTop||gI.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/button-backward":{include:cr,alias:cr,style:function(hY){if(hY.barTop||hY.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(fJ){return {decorator:dK,minHeight:100,marginBottom:fJ.barBottom?-1:0,marginTop:fJ.barTop?-1:0,marginLeft:fJ.barLeft?-1:0,marginRight:fJ.barRight?-1:0};
}},"tabview-page":eL,"tabview-page/button":{alias:eM,style:function(w){var C,y=0;
var B=0,x=0,z=0,A=0;

if(w.checked){if(w.barTop){C=dd;
y=[6,14];
z=w.firstTab?0:-5;
A=w.lastTab?0:-5;
}else if(w.barBottom){C=dH;
y=[6,14];
z=w.firstTab?0:-5;
A=w.lastTab?0:-5;
}else if(w.barRight){C=cO;
y=[6,13];
B=w.firstTab?0:-5;
x=w.lastTab?0:-5;
}else{C=dQ;
y=[6,13];
B=w.firstTab?0:-5;
x=w.lastTab?0:-5;
}}else{if(w.barTop){C=dz;
y=[4,10];
B=4;
z=w.firstTab?5:1;
A=1;
}else if(w.barBottom){C=cg;
y=[4,10];
x=4;
z=w.firstTab?5:1;
A=1;
}else if(w.barRight){C=dX;
y=[4,10];
A=5;
B=w.firstTab?5:1;
x=1;
z=1;
}else{C=dG;
y=[4,10];
z=5;
B=w.firstTab?5:1;
x=1;
A=1;
}}return {zIndex:w.checked?10:5,decorator:C,padding:y,marginTop:B,marginBottom:x,marginLeft:z,marginRight:A,textColor:w.checked?bi:cb};
}},"tabview-page/button/label":{alias:eR,style:function(hk){return {padding:[0,1,0,1],margin:hk.focused?0:1,decorator:hk.focused?bH:undefined};
}},"tabview-page/button/close-button":{alias:eM,style:function(gl){return {icon:eA};
}},"toolbar":{style:function(gk){return {decorator:bw,spacing:2};
}},"toolbar/part":{style:function(hW){return {decorator:dP,spacing:2};
}},"toolbar/part/container":{style:function(J){return {paddingLeft:2,paddingRight:2};
}},"toolbar/part/handle":{style:function(S){return {source:fb,marginLeft:3,marginRight:3};
}},"toolbar-button":{alias:eM,style:function(W){return {marginTop:2,marginBottom:2,padding:(W.pressed||W.checked||W.hovered)&&!W.disabled||(W.disabled&&W.checked)?3:5,decorator:W.pressed||(W.checked&&!W.hovered)||(W.checked&&W.disabled)?ee:W.hovered&&!W.disabled?bg:undefined};
}},"toolbar-menubutton":{alias:eU,include:eU,style:function(ba){return {showArrow:true};
}},"toolbar-menubutton/arrow":{alias:eH,include:eH,style:function(s){return {source:cl};
}},"toolbar-splitbutton":{style:function(fL){return {marginTop:2,marginBottom:2};
}},"toolbar-splitbutton/button":{alias:eU,include:eU,style:function(F){return {icon:dn,marginTop:undefined,marginBottom:undefined};
}},"toolbar-splitbutton/arrow":{alias:eU,include:eU,style:function(gj){return {padding:gj.pressed||gj.checked?1:gj.hovered?1:3,icon:dn,marginTop:undefined,marginBottom:undefined};
}},"toolbar-separator":{style:function(fz){return {decorator:dI,margin:7};
}},"tree":eO,"tree-item":{style:function(hf){return {padding:[2,6],textColor:hf.selected?eI:undefined,decorator:hf.selected?dl:undefined};
}},"tree-item/icon":{include:eH,style:function(gD){return {paddingRight:5};
}},"tree-item/label":eR,"tree-item/open":{include:eH,style:function(fH){var fI;

if(fH.selected&&fH.opened){fI=ef;
}else if(fH.selected&&!fH.opened){fI=bk;
}else if(fH.opened){fI=cn;
}else{fI=fm;
}return {padding:[0,5,0,2],source:fI};
}},"tree-folder":{include:eP,alias:eP,style:function(hM){var hN;

if(hM.small){hN=hM.opened?bJ:bt;
}else if(hM.large){hN=hM.opened?de:dJ;
}else{hN=hM.opened?dU:df;
}return {icon:hN};
}},"tree-file":{include:eP,alias:eP,style:function(fv){return {icon:fv.small?cj:fv.large?bE:fc};
}},"treevirtual":bO,"treevirtual-folder":{style:function(u){return {icon:u.opened?bJ:bt};
}},"treevirtual-file":{include:cp,alias:cp,style:function(gR){return {icon:cj};
}},"treevirtual-line":{style:function(q){return {icon:bp};
}},"treevirtual-contract":{style:function(hF){return {icon:cn,paddingLeft:5,paddingTop:2};
}},"treevirtual-expand":{style:function(hw){return {icon:fm,paddingLeft:5,paddingTop:2};
}},"treevirtual-only-contract":eW,"treevirtual-only-expand":en,"treevirtual-start-contract":eW,"treevirtual-start-expand":en,"treevirtual-end-contract":eW,"treevirtual-end-expand":en,"treevirtual-cross-contract":eW,"treevirtual-cross-expand":en,"treevirtual-end":{style:function(l){return {icon:bp};
}},"treevirtual-cross":{style:function(K){return {icon:bp};
}},"tooltip":{include:eT,style:function(hS){return {backgroundColor:cH,padding:[1,3,2,3],offset:[15,5,5,5]};
}},"tooltip/atom":eM,"tooltip-error":{include:eQ,style:function(gQ){return {textColor:eI,placeMethod:eL,offset:[0,0,0,14],marginTop:-2,position:bm,showTimeout:100,hideTimeout:10000,decorator:cf,shadow:cA,font:eG};
}},"tooltip-error/atom":eM,"window":{style:function(gz){return {shadow:bW,contentPadding:[10,10,10,10]};
}},"window/pane":{style:function(fX){return {decorator:ce};
}},"window/captionbar":{style:function(hA){return {decorator:hA.active?bx:dL,textColor:hA.active?ek:cd,minHeight:26,paddingRight:2};
}},"window/icon":{style:function(V){return {margin:[5,0,3,6]};
}},"window/title":{style:function(gK){return {alignY:eF,font:eG,marginLeft:6,marginRight:12};
}},"window/minimize-button":{alias:eM,style:function(gB){return {icon:gB.active?gB.hovered?dC:dY:ed,margin:[4,8,2,0]};
}},"window/restore-button":{alias:eM,style:function(gA){return {icon:gA.active?gA.hovered?bX:bC:eg,margin:[5,8,2,0]};
}},"window/maximize-button":{alias:eM,style:function(hx){return {icon:hx.active?hx.hovered?bL:cU:et,margin:[4,8,2,0]};
}},"window/close-button":{alias:eM,style:function(gh){return {icon:gh.active?gh.hovered?ex:cN:ds,margin:[4,8,2,0]};
}},"window/statusbar":{style:function(o){return {padding:[2,6],decorator:cE,minHeight:18};
}},"window/statusbar-text":{style:function(hP){return {font:bT};
}},"iframe":{style:function(hV){return {decorator:eK};
}},"resizer":{style:function(hK){return {decorator:cT};
}},"splitpane":{style:function(b){return {decorator:ew};
}},"splitpane/splitter":{style:function(ig){return {width:ig.horizontal?3:undefined,height:ig.vertical?3:undefined,backgroundColor:fs};
}},"splitpane/splitter/knob":{style:function(hX){return {source:hX.horizontal?ct:dO};
}},"splitpane/slider":{style:function(gq){return {width:gq.horizontal?3:undefined,height:gq.vertical?3:undefined,backgroundColor:fs};
}},"selectbox":{alias:eN,include:eN,style:function(hU){return {padding:[2,8]};
}},"selectbox/atom":eM,"selectbox/popup":eT,"selectbox/list":{alias:eO},"selectbox/arrow":{include:eH,style:function(E){return {source:dn,paddingLeft:5};
}},"datechooser":{style:function(fY){var gd;
var gb=!!fY.focused;
var gc=!!fY.invalid;
var ga=!!fY.disabled;

if(gb&&gc&&!ga){gd=dg;
}else if(gb&&!gc&&!ga){gd=eS;
}else if(ga){gd=di;
}else if(!gb&&gc&&!ga){gd=dk;
}else{gd=dj;
}return {padding:2,decorator:gd,backgroundColor:eE};
}},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:eN,alias:eN,style:function(hd){var he={padding:[2,4],shadow:undefined};

if(hd.lastYear){he.icon=dE;
he.marginRight=1;
}else if(hd.lastMonth){he.icon=fk;
}else if(hd.nextYear){he.icon=bc;
he.marginLeft=1;
}else if(hd.nextMonth){he.icon=ep;
}return he;
}},"datechooser/last-year-button-tooltip":eQ,"datechooser/last-month-button-tooltip":eQ,"datechooser/next-year-button-tooltip":eQ,"datechooser/next-month-button-tooltip":eQ,"datechooser/last-year-button":em,"datechooser/last-month-button":em,"datechooser/next-month-button":em,"datechooser/next-year-button":em,"datechooser/month-year-label":{style:function(gF){return {font:eG,textAlign:eo,textColor:gF.disabled?dq:undefined};
}},"datechooser/date-pane":{style:function(gw){return {textColor:gw.disabled?dq:undefined,marginTop:2};
}},"datechooser/weekday":{style:function(Y){return {textColor:Y.disabled?dq:Y.weekend?fq:undefined,textAlign:eo,paddingTop:2,backgroundColor:ck};
}},"datechooser/week":{style:function(gp){return {textAlign:eo,padding:[2,4],backgroundColor:ck};
}},"datechooser/day":{style:function(k){return {textAlign:eo,decorator:k.disabled?undefined:k.selected?dl:undefined,textColor:k.disabled?dq:k.selected?eI:k.otherMonth?fq:undefined,font:k.today?eG:undefined,padding:[2,4]};
}},"combobox":{style:function(fS){var fW;
var fU=!!fS.focused;
var fV=!!fS.invalid;
var fT=!!fS.disabled;

if(fU&&fV&&!fT){fW=dg;
}else if(fU&&!fV&&!fT){fW=eS;
}else if(fT){fW=di;
}else if(!fU&&fV&&!fT){fW=dk;
}else{fW=dj;
}return {decorator:fW};
}},"combobox/popup":eT,"combobox/list":{alias:eO},"combobox/button":{include:eN,alias:eN,style:function(hH){var hI={icon:dn,padding:2};

if(hH.selected){hI.decorator=fj;
}return hI;
}},"combobox/textfield":{include:eq,style:function(D){return {decorator:undefined};
}},"menu":{style:function(hr){var hs={decorator:cC,shadow:cq,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,placementModeY:hr.submenu||hr.contextmenu?fa:db};

if(hr.submenu){hs.position=bm;
hs.offset=[-2,-3];
}return hs;
}},"menu/slidebar":dF,"menu-slidebar":eL,"menu-slidebar-button":{style:function(gE){return {decorator:gE.hovered?dl:undefined,padding:7,center:true};
}},"menu-slidebar/button-backward":{include:fp,style:function(hG){return {icon:hG.hovered?bG:bN};
}},"menu-slidebar/button-forward":{include:fp,style:function(gS){return {icon:gS.hovered?ch:dn};
}},"menu-separator":{style:function(gT){return {height:0,decorator:cS,margin:[4,2]};
}},"menu-button":{alias:eM,style:function(ib){return {decorator:ib.selected?dl:undefined,textColor:ib.selected?eI:undefined,padding:[4,6]};
}},"menu-button/icon":{include:eH,style:function(L){return {alignY:eF};
}},"menu-button/label":{include:eR,style:function(fA){return {alignY:eF,padding:1};
}},"menu-button/shortcut":{include:eR,style:function(gg){return {alignY:eF,marginLeft:14,padding:1};
}},"menu-button/arrow":{include:eH,style:function(hz){return {source:hz.selected?ei:ep,alignY:eF};
}},"menu-checkbox":{alias:dh,include:dh,style:function(gt){return {icon:!gt.checked?undefined:gt.selected?fi:dD};
}},"menu-radiobutton":{alias:dh,include:dh,style:function(fE){return {icon:!fE.checked?undefined:fE.selected?cX:bd};
}},"menubar":{style:function(hc){return {decorator:dB};
}},"menubar-button":{alias:eM,style:function(ia){return {decorator:ia.pressed||ia.hovered?dl:undefined,textColor:ia.pressed||ia.hovered?eI:undefined,padding:[3,8]};
}},"colorselector":eL,"colorselector/control-bar":eL,"colorselector/control-pane":eL,"colorselector/visual-pane":dp,"colorselector/preset-grid":eL,"colorselector/colorbucket":{style:function(c){return {decorator:eK,width:16,height:16};
}},"colorselector/preset-field-set":dp,"colorselector/input-field-set":dp,"colorselector/preview-field-set":dp,"colorselector/hex-field-composite":eL,"colorselector/hex-field":eq,"colorselector/rgb-spinner-composite":eL,"colorselector/rgb-spinner-red":eV,"colorselector/rgb-spinner-green":eV,"colorselector/rgb-spinner-blue":eV,"colorselector/hsb-spinner-composite":eL,"colorselector/hsb-spinner-hue":eV,"colorselector/hsb-spinner-saturation":eV,"colorselector/hsb-spinner-brightness":eV,"colorselector/preview-content-old":{style:function(fF){return {decorator:eK,width:50,height:10};
}},"colorselector/preview-content-new":{style:function(gv){return {decorator:eK,backgroundColor:eE,width:50,height:10};
}},"colorselector/hue-saturation-field":{style:function(O){return {decorator:eK,margin:5};
}},"colorselector/brightness-field":{style:function(hq){return {decorator:eK,margin:[5,7]};
}},"colorselector/hue-saturation-pane":eL,"colorselector/hue-saturation-handle":eL,"colorselector/brightness-pane":eL,"colorselector/brightness-handle":eL,"colorpopup":{alias:eT,include:eT,style:function(N){return {padding:5,backgroundColor:es};
}},"colorpopup/field":{style:function(gG){return {decorator:eK,margin:2,width:14,height:14,backgroundColor:eE};
}},"colorpopup/selector-button":eJ,"colorpopup/auto-button":eJ,"colorpopup/preview-pane":dp,"colorpopup/current-preview":{style:function(hy){return {height:20,padding:4,marginLeft:4,decorator:eK,allowGrowX:true};
}},"colorpopup/selected-preview":{style:function(U){return {height:20,padding:4,marginRight:4,decorator:eK,allowGrowX:true};
}},"colorpopup/colorselector-okbutton":{alias:eJ,include:eJ,style:function(fx){return {icon:dr};
}},"colorpopup/colorselector-cancelbutton":{alias:eJ,include:eJ,style:function(gr){return {icon:dA};
}},"table":{alias:eL,style:function(hv){return {decorator:bO};
}},"table-header":{},"table/statusbar":{style:function(p){return {decorator:dS,padding:[0,2]};
}},"table/column-button":{alias:eN,style:function(ht){return {decorator:bV,padding:3,icon:be};
}},"table-column-reset-button":{include:dh,alias:dh,style:function(){return {icon:eD};
}},"table-scroller":eL,"table-scroller/scrollbar-x":eX,"table-scroller/scrollbar-y":eX,"table-scroller/header":{style:function(a){return {decorator:cJ};
}},"table-scroller/pane":{style:function(hL){return {backgroundColor:cM};
}},"table-scroller/focus-indicator":{style:function(hg){return {decorator:cB};
}},"table-scroller/resize-line":{style:function(gC){return {backgroundColor:eu,width:2};
}},"table-header-cell":{alias:eM,style:function(gJ){return {minWidth:13,minHeight:20,padding:gJ.hovered?[3,4,2,4]:[3,4],decorator:gJ.hovered?du:cx,sortIcon:gJ.sorted?(gJ.sortedAscending?dW:bb):undefined};
}},"table-header-cell/label":{style:function(r){return {minWidth:0,alignY:eF,paddingRight:5};
}},"table-header-cell/sort-icon":{style:function(gi){return {alignY:eF,alignX:br};
}},"table-header-cell/icon":{style:function(ii){return {minWidth:0,alignY:eF,paddingRight:5};
}},"table-editor-textfield":{include:eq,style:function(gU){return {decorator:undefined,padding:[2,2],backgroundColor:eE};
}},"table-editor-selectbox":{include:cs,alias:cs,style:function(ho){return {padding:[0,2],backgroundColor:eE};
}},"table-editor-combobox":{include:bl,alias:bl,style:function(I){return {decorator:undefined,backgroundColor:eE};
}},"progressive-table-header":{alias:eL,style:function(hB){return {decorator:bf};
}},"progressive-table-header-cell":{alias:eM,style:function(fK){return {minWidth:40,minHeight:25,paddingLeft:6,decorator:cR};
}},"app-header":{style:function(hT){return {font:eG,textColor:eI,padding:[8,12],decorator:cD};
}},"virtual-list":eO,"virtual-list/row-layer":cc,"row-layer":{style:function(hJ){return {colorEven:ek,colorOdd:dt};
}},"column-layer":eL,"cell":{style:function(d){return {textColor:d.selected?eI:bu,padding:[3,6],font:co};
}},"cell-string":dm,"cell-number":{include:dm,style:function(e){return {textAlign:br};
}},"cell-image":dm,"cell-boolean":{include:dm,style:function(m){return {iconTrue:cw,iconFalse:bz};
}},"cell-atom":dm,"cell-date":dm,"cell-html":dm,"htmlarea":{"include":eL,style:function(T){return {backgroundColor:ek};
}}}});
})();
(function(){var a="testie.theme.Appearance";
qx.Theme.define(a,{extend:qx.theme.modern.Appearance,appearances:{}});
})();
(function(){var a="testie.theme.Theme";
qx.Theme.define(a,{meta:{color:testie.theme.Color,decoration:testie.theme.Decoration,font:testie.theme.Font,icon:qx.theme.icon.Tango,appearance:testie.theme.Appearance}});
})();
(function(){var b="CSS1Compat",a="qx.bom.client.Feature";
qx.Class.define(a,{statics:{STANDARD_MODE:false,QUIRKS_MODE:false,CONTENT_BOX:false,BORDER_BOX:false,SVG:false,CANVAS:!!window.CanvasRenderingContext2D,VML:false,XPATH:!!document.evaluate,AIR:navigator.userAgent.indexOf("adobeair")!==-1,GEARS:!!(window.google&&window.google.gears),SSL:window.location.protocol==="https:",ECMA_OBJECT_COUNT:(({}).__count__==0),CSS_POINTER_EVENTS:"pointerEvents" in document.documentElement.style,__cc:function(){this.QUIRKS_MODE=this.__cd();
this.STANDARD_MODE=!this.QUIRKS_MODE;
this.CONTENT_BOX=!qx.bom.client.Engine.MSHTML||this.STANDARD_MODE;
this.BORDER_BOX=!this.CONTENT_BOX;
this.SVG=document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature("org.w3c.dom.svg","1.0")||document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"));
this.VML=qx.bom.client.Engine.MSHTML;
},__cd:function(){if(qx.bom.client.Engine.MSHTML&&qx.bom.client.Engine.VERSION>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return document.compatMode!==b;
}}},defer:function(c){c.__cc();
}});
})();
(function(){var a="qx.lang.Object";
qx.Class.define(a,{statics:{empty:function(d){{};

for(var e in d){if(d.hasOwnProperty(e)){delete d[e];
}}},isEmpty:(qx.bom.client.Feature.ECMA_OBJECT_COUNT)?
function(D){{};
return D.__count__===0;
}:
function(B){{};

for(var C in B){return false;
}return true;
},hasMinLength:(qx.bom.client.Feature.ECMA_OBJECT_COUNT)?
function(q,r){{};
return q.__count__>=r;
}:
function(w,x){{};

if(x<=0){return true;
}var length=0;

for(var y in w){if((++length)>=x){return true;
}}return false;
},getLength:qx.Bootstrap.objectGetLength,getKeys:qx.Bootstrap.getKeys,getKeysAsString:qx.Bootstrap.getKeysAsString,getValues:function(H){{};
var J=[];
var I=this.getKeys(H);

for(var i=0,l=I.length;i<l;i++){J.push(H[I[i]]);
}return J;
},mergeWith:qx.Bootstrap.objectMergeWith,carefullyMergeWith:function(u,v){{};
return qx.lang.Object.mergeWith(u,v,false);
},merge:function(n,o){{};
var p=arguments.length;

for(var i=1;i<p;i++){qx.lang.Object.mergeWith(n,arguments[i]);
}return n;
},clone:function(f){{};
var g={};

for(var h in f){g[h]=f[h];
}return g;
},invert:function(E){{};
var F={};

for(var G in E){F[E[G].toString()]=G;
}return F;
},getKeyFromValue:function(j,k){{};

for(var m in j){if(j.hasOwnProperty(m)&&j[m]===k){return m;
}}return null;
},contains:function(z,A){{};
return this.getKeyFromValue(z,A)!==null;
},select:function(b,c){{};
return c[b];
},fromArray:function(s){{};
var t={};

for(var i=0,l=s.length;i<l;i++){{};
t[s[i].toString()]=true;
}return t;
}}});
})();
(function(){var j="emulated",h="native",g='"',f="qx.lang.Core",e="\\\\",d="\\\"",c="[object Error]";
qx.Class.define(f,{statics:{errorToString:qx.lang.Object.select((!Error.prototype.toString||Error.prototype.toString()==c)?j:h,{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}),arrayIndexOf:qx.lang.Object.select(Array.prototype.indexOf?h:j,{"native":Array.prototype.indexOf,"emulated":function(a,b){if(b==null){b=0;
}else if(b<0){b=Math.max(0,this.length+b);
}
for(var i=b;i<this.length;i++){if(this[i]===a){return i;
}}return -1;
}}),arrayLastIndexOf:qx.lang.Object.select(Array.prototype.lastIndexOf?h:j,{"native":Array.prototype.lastIndexOf,"emulated":function(t,u){if(u==null){u=this.length-1;
}else if(u<0){u=Math.max(0,this.length+u);
}
for(var i=u;i>=0;i--){if(this[i]===t){return i;
}}return -1;
}}),arrayForEach:qx.lang.Object.select(Array.prototype.forEach?h:j,{"native":Array.prototype.forEach,"emulated":function(B,C){var l=this.length;

for(var i=0;i<l;i++){var D=this[i];

if(D!==undefined){B.call(C||window,D,i,this);
}}}}),arrayFilter:qx.lang.Object.select(Array.prototype.filter?h:j,{"native":Array.prototype.filter,"emulated":function(k,m){var n=[];
var l=this.length;

for(var i=0;i<l;i++){var o=this[i];

if(o!==undefined){if(k.call(m||window,o,i,this)){n.push(this[i]);
}}}return n;
}}),arrayMap:qx.lang.Object.select(Array.prototype.map?h:j,{"native":Array.prototype.map,"emulated":function(p,q){var r=[];
var l=this.length;

for(var i=0;i<l;i++){var s=this[i];

if(s!==undefined){r[i]=p.call(q||window,s,i,this);
}}return r;
}}),arraySome:qx.lang.Object.select(Array.prototype.some?h:j,{"native":Array.prototype.some,"emulated":function(v,w){var l=this.length;

for(var i=0;i<l;i++){var x=this[i];

if(x!==undefined){if(v.call(w||window,x,i,this)){return true;
}}}return false;
}}),arrayEvery:qx.lang.Object.select(Array.prototype.every?h:j,{"native":Array.prototype.every,"emulated":function(y,z){var l=this.length;

for(var i=0;i<l;i++){var A=this[i];

if(A!==undefined){if(!y.call(z||window,A,i,this)){return false;
}}}return true;
}}),stringQuote:qx.lang.Object.select(String.prototype.quote?h:j,{"native":String.prototype.quote,"emulated":function(){return g+this.replace(/\\/g,e).replace(/\"/g,d)+g;
}})}});
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
(function(){var k="qx.event.type.Event";
qx.Class.define(k,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(d,e){{};
this._type=null;
this._target=null;
this._currentTarget=null;
this._relatedTarget=null;
this._originalTarget=null;
this._stopPropagation=false;
this._preventDefault=false;
this._bubbles=!!d;
this._cancelable=!!e;
this._timeStamp=(new Date()).getTime();
this._eventPhase=null;
return this;
},clone:function(b){if(b){var c=b;
}else{var c=qx.event.Pool.getInstance().getObject(this.constructor);
}c._type=this._type;
c._target=this._target;
c._currentTarget=this._currentTarget;
c._relatedTarget=this._relatedTarget;
c._originalTarget=this._originalTarget;
c._stopPropagation=this._stopPropagation;
c._bubbles=this._bubbles;
c._preventDefault=this._preventDefault;
c._cancelable=this._cancelable;
return c;
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
},setType:function(i){this._type=i;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(l){this._eventPhase=l;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(m){this._target=m;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(h){this._currentTarget=h;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(j){this._relatedTarget=j;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(f){this._originalTarget=f;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(a){this._bubbles=a;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(g){this._cancelable=g;
}},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;
}});
})();
(function(){var a="qx.event.type.Data";
qx.Class.define(a,{extend:qx.event.type.Event,members:{__ce:null,__cf:null,init:function(b,c,d){arguments.callee.base.call(this,false,d);
this.__ce=b;
this.__cf=c;
return this;
},clone:function(e){var f=arguments.callee.base.call(this,e);
f.__ce=this.__ce;
f.__cf=this.__cf;
return f;
},getData:function(){return this.__ce;
},getOldData:function(){return this.__cf;
}},destruct:function(){this.__ce=this.__cf=null;
}});
})();
(function(){var ch="get",cg="",cf="[",ce="last",cd="change",cc="]",cb=".",ca="Number",bY="String",bX="set",cw="deepBinding",cv="item",cu="reset",ct="' (",cs="Boolean",cr=").",cq=") to the object '",cp="Integer",co="qx.data.SingleValueBinding",cn="No event could be found for the property",cl="PositiveNumber",cm="Binding from '",cj="PositiveInteger",ck="Binding does not exist!",ci="Date";
qx.Class.define(co,{statics:{DEBUG_ON:false,__cg:{},bind:function(bA,bB,bC,bD,bE){var bO=this.__ci(bA,bB,bC,bD,bE);
var bJ=bB.split(cb);
var bG=this.__cp(bJ);
var bN=[];
var bK=[];
var bL=[];
var bH=[];
var bI=bA;
for(var i=0;i<bJ.length;i++){if(bG[i]!==cg){bH.push(cd);
}else{bH.push(this.__ck(bI,bJ[i]));
}bN[i]=bI;
if(i==bJ.length-1){if(bG[i]!==cg){var bR=bG[i]===ce?bI.length-1:bG[i];
var bF=bI.getItem(bR);
this.__co(bF,bC,bD,bE,bA);
bL[i]=this.__cq(bI,bH[i],bC,bD,bE,bG[i]);
}else{if(bJ[i]!=null&&bI[ch+qx.lang.String.firstUp(bJ[i])]!=null){var bF=bI[ch+qx.lang.String.firstUp(bJ[i])]();
this.__co(bF,bC,bD,bE,bA);
}bL[i]=this.__cq(bI,bH[i],bC,bD,bE);
}}else{var bP={index:i,propertyNames:bJ,sources:bN,listenerIds:bL,arrayIndexValues:bG,targetObject:bC,targetPropertyChain:bD,options:bE,listeners:bK};
var bM=qx.lang.Function.bind(this.__ch,this,bP);
bK.push(bM);
bL[i]=bI.addListener(bH[i],bM);
}if(bI[ch+qx.lang.String.firstUp(bJ[i])]==null){bI=null;
}else if(bG[i]!==cg){bI=bI[ch+qx.lang.String.firstUp(bJ[i])](bG[i]);
}else{bI=bI[ch+qx.lang.String.firstUp(bJ[i])]();
}
if(!bI){break;
}}var bQ={type:cw,listenerIds:bL,sources:bN,targetListenerIds:bO.listenerIds,targets:bO.targets};
this.__cr(bQ,bA,bB,bC,bD);
return bQ;
},__ch:function(J){if(J.options&&J.options.onUpdate){J.options.onUpdate(J.sources[J.index],J.targetObject);
}for(var j=J.index+1;j<J.propertyNames.length;j++){var N=J.sources[j];
J.sources[j]=null;

if(!N){continue;
}N.removeListenerById(J.listenerIds[j]);
}var N=J.sources[J.index];
for(var j=J.index+1;j<J.propertyNames.length;j++){if(J.arrayIndexValues[j-1]!==cg){N=N[ch+qx.lang.String.firstUp(J.propertyNames[j-1])](J.arrayIndexValues[j-1]);
}else{N=N[ch+qx.lang.String.firstUp(J.propertyNames[j-1])]();
}J.sources[j]=N;
if(!N){this.__cl(J.targetObject,J.targetPropertyChain);
break;
}if(j==J.propertyNames.length-1){if(qx.Class.implementsInterface(N,qx.data.IListData)){var O=J.arrayIndexValues[j]===ce?N.length-1:J.arrayIndexValues[j];
var L=N.getItem(O);
this.__co(L,J.targetObject,J.targetPropertyChain,J.options,J.sources[J.index]);
J.listenerIds[j]=this.__cq(N,cd,J.targetObject,J.targetPropertyChain,J.options,J.arrayIndexValues[j]);
}else{if(J.propertyNames[j]!=null&&N[ch+qx.lang.String.firstUp(J.propertyNames[j])]!=null){var L=N[ch+qx.lang.String.firstUp(J.propertyNames[j])]();
this.__co(L,J.targetObject,J.targetPropertyChain,J.options,J.sources[J.index]);
}var M=this.__ck(N,J.propertyNames[j]);
J.listenerIds[j]=this.__cq(N,M,J.targetObject,J.targetPropertyChain,J.options);
}}else{if(J.listeners[j]==null){var K=qx.lang.Function.bind(this.__ch,this,J);
J.listeners.push(K);
}if(qx.Class.implementsInterface(N,qx.data.IListData)){var M=cd;
}else{var M=this.__ck(N,J.propertyNames[j]);
}J.listenerIds[j]=N.addListener(M,J.listeners[j]);
}}},__ci:function(cM,cN,cO,cP,cQ){var cU=cP.split(cb);
var cS=this.__cp(cU);
var da=[];
var cY=[];
var cW=[];
var cV=[];
var cT=cO;
for(var i=0;i<cU.length-1;i++){if(cS[i]!==cg){cV.push(cd);
}else{try{cV.push(this.__ck(cT,cU[i]));
}catch(e){break;
}}da[i]=cT;
var cX=function(){for(var j=i+1;j<cU.length-1;j++){var F=da[j];
da[j]=null;

if(!F){continue;
}F.removeListenerById(cW[j]);
}var F=da[i];
for(var j=i+1;j<cU.length-1;j++){var D=qx.lang.String.firstUp(cU[j-1]);
if(cS[j-1]!==cg){var G=cS[j-1]===ce?F.getLength()-1:cS[j-1];
F=F[ch+D](G);
}else{F=F[ch+D]();
}da[j]=F;
if(cY[j]==null){cY.push(cX);
}if(qx.Class.implementsInterface(F,qx.data.IListData)){var E=cd;
}else{try{var E=qx.data.SingleValueBinding.__ck(F,cU[j]);
}catch(e){break;
}}cW[j]=F.addListener(E,cY[j]);
}qx.data.SingleValueBinding.__cj(cM,cN,cO,cP);
};
cY.push(cX);
cW[i]=cT.addListener(cV[i],cX);
var cR=qx.lang.String.firstUp(cU[i]);
if(cT[ch+cR]==null){cT=null;
}else if(cS[i]!==cg){cT=cT[ch+cR](cS[i]);
}else{cT=cT[ch+cR]();
}
if(!cT){break;
}}return {listenerIds:cW,targets:da};
},__cj:function(bd,be,bf,bg){var bk=this.__cn(bd,be);

if(bk!=null){var bm=be.substring(be.lastIndexOf(cb)+1,be.length);
if(bm.charAt(bm.length-1)==cc){var bh=bm.substring(bm.lastIndexOf(cf)+1,bm.length-1);
var bj=bm.substring(0,bm.lastIndexOf(cf));
var bl=bk[ch+qx.lang.String.firstUp(bj)]();

if(bh==ce){bh=bl.length-1;
}
if(bl!=null){var bi=bl.getItem(bh);
}}else{var bi=bk[ch+qx.lang.String.firstUp(bm)]();
}}this.__cm(bf,bg,bi);
},__ck:function(cx,cy){var cz=this.__ct(cx,cy);
if(cz==null){if(qx.Class.supportsEvent(cx.constructor,cy)){cz=cy;
}else if(qx.Class.supportsEvent(cx.constructor,cd+qx.lang.String.firstUp(cy))){cz=cd+qx.lang.String.firstUp(cy);
}else{throw new qx.core.AssertionError(cn,cy);
}}return cz;
},__cl:function(bw,bx){var by=this.__cn(bw,bx);

if(by!=null){var bz=bx.substring(bx.lastIndexOf(cb)+1,bx.length);
if(bz.charAt(bz.length-1)==cc){this.__cm(bw,bx,null);
return;
}if(by[cu+qx.lang.String.firstUp(bz)]!=undefined){by[cu+qx.lang.String.firstUp(bz)]();
}else{by[bX+qx.lang.String.firstUp(bz)](null);
}}},__cm:function(f,g,h){var n=this.__cn(f,g);

if(n!=null){var o=g.substring(g.lastIndexOf(cb)+1,g.length);
if(o.charAt(o.length-1)==cc){var k=o.substring(o.lastIndexOf(cf)+1,o.length-1);
var m=o.substring(0,o.lastIndexOf(cf));
var l=n[ch+qx.lang.String.firstUp(m)]();

if(k==ce){k=l.length-1;
}
if(l!=null){l.setItem(k,h);
}}else{n[bX+qx.lang.String.firstUp(o)](h);
}}},__cn:function(bn,bo){var br=bo.split(cb);
var bs=bn;
for(var i=0;i<br.length-1;i++){try{var bq=br[i];
if(bq.indexOf(cc)==bq.length-1){var bp=bq.substring(bq.indexOf(cf)+1,bq.length-1);
bq=bq.substring(0,bq.indexOf(cf));
}bs=bs[ch+qx.lang.String.firstUp(bq)]();

if(bp!=null){if(bp==ce){bp=bs.length-1;
}bs=bs.getItem(bp);
bp=null;
}}catch(C){return null;
}}return bs;
},__co:function(bS,bT,bU,bV,bW){bS=this.__cs(bS,bT,bU,bV);
if(bS==null){this.__cl(bT,bU);
}if(bS!=undefined){try{this.__cm(bT,bU,bS);
if(bV&&bV.onUpdate){bV.onUpdate(bW,bT,bS);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(bV&&bV.onSetFail){bV.onSetFail(e);
}else{this.warn("Failed so set value "+bS+" on "+bT+". Error message: "+e);
}}}},__cp:function(cJ){var cK=[];
for(var i=0;i<cJ.length;i++){var name=cJ[i];
if(qx.lang.String.endsWith(name,cc)){var cL=name.substring(name.indexOf(cf)+1,name.indexOf(cc));
if(name.indexOf(cc)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(cL!==ce){if(cL==cg||isNaN(parseInt(cL))){throw new Error("No number or 'last' value hast been given"+" in a array binding: "+name+" does not work.");
}}if(name.indexOf(cf)!=0){cJ[i]=name.substring(0,name.indexOf(cf));
cK[i]=cg;
cK[i+1]=cL;
cJ.splice(i+1,0,cv);
i++;
}else{cK[i]=cL;
cJ.splice(i,1,cv);
}}else{cK[i]=cg;
}}return cK;
},__cq:function(cA,cB,cC,cD,cE,cF){var cG;
{};
var cI=function(p,e){if(p!==cg){if(p===ce){p=cA.length-1;
}var s=cA.getItem(p);
if(s==undefined){qx.data.SingleValueBinding.__cl(cC,cD);
}var q=e.getData().start;
var r=e.getData().end;

if(p<q||p>r){return;
}}else{var s=e.getData();
}if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Binding executed from "+cA+" by "+cB+" to "+cC+" ("+cD+")");
qx.log.Logger.debug("Data before conversion: "+s);
}s=qx.data.SingleValueBinding.__cs(s,cC,cD,cE);
if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Data after conversion: "+s);
}try{if(s!=undefined){qx.data.SingleValueBinding.__cm(cC,cD,s);
}else{qx.data.SingleValueBinding.__cl(cC,cD);
}if(cE&&cE.onUpdate){cE.onUpdate(cA,cC,s);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(cE&&cE.onSetFail){cE.onSetFail(e);
}else{this.warn("Failed so set value "+s+" on "+cC+". Error message: "+e);
}}};
if(!cF){cF=cg;
}cI=qx.lang.Function.bind(cI,cA,cF);
var cH=cA.addListener(cB,cI);
return cH;
},__cr:function(P,Q,R,S,T){if(this.__cg[Q.toHashCode()]===undefined){this.__cg[Q.toHashCode()]=[];
}this.__cg[Q.toHashCode()].push([P,Q,R,S,T]);
},__cs:function(t,u,v,w){if(w&&w.converter){var y;

if(u.getModel){y=u.getModel();
}return w.converter(t,y);
}else{var A=this.__cn(u,v);
var B=v.substring(v.lastIndexOf(cb)+1,v.length);
if(A==null){return t;
}var z=qx.Class.getPropertyDefinition(A.constructor,B);
var x=z==null?cg:z.check;
return this.__cu(t,x);
}},__ct:function(bt,bu){var bv=qx.Class.getPropertyDefinition(bt.constructor,bu);

if(bv==null){return null;
}return bv.event;
},__cu:function(X,Y){var ba=qx.lang.Type.getClass(X);
if((ba==ca||ba==bY)&&(Y==cp||Y==cj)){X=parseInt(X);
}if((ba==cs||ba==ca||ba==ci)&&Y==bY){X=X+cg;
}if((ba==ca||ba==bY)&&(Y==ca||Y==cl)){X=parseFloat(X);
}return X;
},removeBindingFromObject:function(U,V){if(V.type==cw){for(var i=0;i<V.sources.length;i++){if(V.sources[i]){V.sources[i].removeListenerById(V.listenerIds[i]);
}}for(var i=0;i<V.targets.length;i++){if(V.targets[i]){V.targets[i].removeListenerById(V.targetListenerIds[i]);
}}}else{U.removeListenerById(V);
}var W=this.__cg[U.toHashCode()];
if(W!=undefined){for(var i=0;i<W.length;i++){if(W[i][0]==V){qx.lang.Array.remove(W,W[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(H){{};
var I=this.__cg[H.toHashCode()];

if(I!=undefined){for(var i=I.length-1;i>=0;i--){this.removeBindingFromObject(H,I[i][0]);
}}},getAllBindingsForObject:function(db){if(this.__cg[db.toHashCode()]===undefined){this.__cg[db.toHashCode()]=[];
}return this.__cg[db.toHashCode()];
},removeAllBindings:function(){for(var dd in this.__cg){var dc=qx.core.ObjectRegistry.fromHashCode(dd);
if(dc==null){delete this.__cg[dd];
continue;
}this.removeAllBindingsForObject(dc);
}this.__cg={};
},getAllBindings:function(){return this.__cg;
},showBindingInLog:function(a,b){var d;
for(var i=0;i<this.__cg[a.toHashCode()].length;i++){if(this.__cg[a.toHashCode()][i][0]==b){d=this.__cg[a.toHashCode()][i];
break;
}}
if(d===undefined){var c=ck;
}else{var c=cm+d[1]+ct+d[2]+cq+d[3]+ct+d[4]+cr;
}qx.log.Logger.debug(c);
},showAllBindingsInLog:function(){for(var bc in this.__cg){var bb=qx.core.ObjectRegistry.fromHashCode(bc);

for(var i=0;i<this.__cg[bc].length;i++){this.showBindingInLog(bb,this.__cg[bc][i][0]);
}}}}});
})();
(function(){var r="",q="g",p="0",o='\\$1',n="%",m='-',l="qx.lang.String",k=' ',j='\n',h="undefined";
qx.Class.define(l,{statics:{camelCase:function(a){return a.replace(/\-([a-z])/g,function(f,g){return g.toUpperCase();
});
},hyphenate:function(e){return e.replace(/[A-Z]/g,function(s){return (m+s.charAt(0).toLowerCase());
});
},capitalize:function(L){return L.replace(/\b[a-z]/g,function(G){return G.toUpperCase();
});
},clean:function(P){return this.trim(P.replace(/\s+/g,k));
},trimLeft:function(H){return H.replace(/^\s+/,r);
},trimRight:function(t){return t.replace(/\s+$/,r);
},trim:function(M){return M.replace(/^\s+|\s+$/g,r);
},startsWith:function(v,w){return v.indexOf(w)===0;
},endsWith:function(E,F){return E.substring(E.length-F.length,E.length)===F;
},repeat:function(N,O){return N.length>=0?new Array(O+1).join(N):r;
},pad:function(I,length,J){var K=length-I.length;

if(K>0){if(typeof J===h){J=p;
}return this.repeat(J,K)+I;
}else{return I;
}},firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(B,C){return B.indexOf(C)!=-1;
},format:function(b,c){var d=b;

for(var i=0;i<c.length;i++){d=d.replace(new RegExp(n+(i+1),q),c[i]);
}return d;
},escapeRegexpChars:function(D){return D.replace(/([.*+?^${}()|[\]\/\\])/g,o);
},toArray:function(u){return u.split(/\B|\b/g);
},stripTags:function(Q){return Q.replace(/<\/?[^>]+>/gi,r);
},stripScripts:function(x,y){var A=r;
var z=x.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){A+=arguments[1]+j;
return r;
});

if(y===true){qx.lang.Function.globalEval(A);
}return z;
}}});
})();
(function(){var c="qx.event.type.Data",b="qx.event.type.Event",a="qx.data.IListData";
qx.Interface.define(a,{events:{"change":c,"changeLength":b},members:{getItem:function(j){},setItem:function(d,e){},splice:function(f,g,h){},contains:function(i){},getLength:function(){},toArray:function(){}}});
})();
(function(){var a="qx.lang.Date";
qx.Class.define(a,{statics:{now:function(){return +new Date;
}}});
})();
(function(){var c="qx.globalErrorHandling",b="on",a="qx.event.GlobalError";
qx.Class.define(a,{statics:{setErrorHandler:function(e,f){this.__cv=e||null;
this.__cw=f||window;

if(qx.core.Setting.get(c)===b){if(e&&!window.onerror){window.onerror=qx.lang.Function.bind(this.__cx,this);
}
if(!e&&window.onerror){window.onerror=null;
}}},__cx:function(j,k,l){if(this.__cv){this.handleError(new qx.core.WindowError(j,k,l));
return true;
}},observeMethod:function(g){if(qx.core.Setting.get(c)===b){var self=this;
return function(){if(!self.__cv){return g.apply(this,arguments);
}
try{return g.apply(this,arguments);
}catch(i){self.handleError(new qx.core.GlobalError(i,arguments));
}};
}else{return g;
}},handleError:function(h){if(this.__cv){this.__cv.call(this.__cw,h);
}}},defer:function(d){qx.core.Setting.define(c,b);
d.setErrorHandler(null,null);
}});
})();
(function(){var e="",d="qx.core.WindowError";
qx.Class.define(d,{extend:Error,construct:function(a,b,c){Error.call(this,a);
this.__cy=a;
this.__cz=b||e;
this.__cA=c===undefined?-1:c;
},members:{__cy:null,__cz:null,__cA:null,toString:function(){return this.__cy;
},getUri:function(){return this.__cz;
},getLineNumber:function(){return this.__cA;
}}});
})();
(function(){var b="GlobalError: ",a="qx.core.GlobalError";
qx.Class.define(a,{extend:Error,construct:function(c,d){{};
this.__cB=b+(c&&c.message?c.message:c);
Error.call(this,this.__cB);
this.__cC=d;
this.__cD=c;
},members:{__cD:null,__cC:null,__cB:null,toString:function(){return this.__cB;
},getArguments:function(){return this.__cC;
},getSourceException:function(){return this.__cD;
}},destruct:function(){this.__cD=null;
this.__cC=null;
this.__cB=null;
}});
})();
(function(){var c=": ",b="qx.type.BaseError",a="";
qx.Class.define(b,{extend:Error,construct:function(d,e){Error.call(this,e);
this.__cE=d||a;
this.message=e||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__cE:null,message:null,getComment:function(){return this.__cE;
},toString:function(){return this.__cE+c+this.message;
}}});
})();
(function(){var a="qx.core.AssertionError";
qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);
this.__cF=qx.dev.StackTrace.getStackTrace();
},members:{__cF:null,getStackTrace:function(){return this.__cF;
}}});
})();
(function(){var q=":",p="qx.client",o="anonymous",n="...",m="qx.dev.StackTrace",l="",k="\n",j="/source/class/",h=".";
qx.Class.define(m,{statics:{getStackTrace:qx.core.Variant.select(p,{"gecko":function(){try{throw new Error();
}catch(bc){var z=this.getStackTraceFromError(bc);
qx.lang.Array.removeAt(z,0);
var x=this.getStackTraceFromCaller(arguments);
var v=x.length>z.length?x:z;

for(var i=0;i<Math.min(x.length,z.length);i++){var w=x[i];

if(w.indexOf(o)>=0){continue;
}var D=w.split(q);

if(D.length!=2){continue;
}var B=D[0];
var u=D[1];
var t=z[i];
var E=t.split(q);
var A=E[0];
var s=E[1];

if(qx.Class.getByName(A)){var y=A;
}else{y=B;
}var C=y+q;

if(u){C+=u+q;
}C+=s;
v[i]=C;
}return v;
}},"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},"opera":function(){var ba;

try{ba.bar();
}catch(U){var bb=this.getStackTraceFromError(U);
qx.lang.Array.removeAt(bb,0);
return bb;
}return [];
}}),getStackTraceFromCaller:qx.core.Variant.select(p,{"opera":function(r){return [];
},"default":function(M){var R=[];
var Q=qx.lang.Function.getCaller(M);
var N={};

while(Q){var O=qx.lang.Function.getName(Q);
R.push(O);

try{Q=Q.caller;
}catch(S){break;
}
if(!Q){break;
}var P=qx.core.ObjectRegistry.toHashCode(Q);

if(N[P]){R.push(n);
break;
}N[P]=Q;
}return R;
}}),getStackTraceFromError:qx.core.Variant.select(p,{"gecko":function(a){if(!a.stack){return [];
}var g=/@(.+):(\d+)$/gm;
var b;
var c=[];

while((b=g.exec(a.stack))!=null){var d=b[1];
var f=b[2];
var e=this.__cG(d);
c.push(e+q+f);
}return c;
},"webkit":function(T){if(T.sourceURL&&T.line){return [this.__cG(T.sourceURL)+q+T.line];
}else{return [];
}},"opera":function(F){if(F.message.indexOf("Backtrace:")<0){return [];
}var H=[];
var I=qx.lang.String.trim(F.message.split("Backtrace:")[1]);
var J=I.split(k);

for(var i=0;i<J.length;i++){var G=J[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(G&&G.length>=2){var L=G[1];
var K=this.__cG(G[2]);
H.push(K+q+L);
}}return H;
},"default":function(){return [];
}}),__cG:function(V){var Y=j;
var W=V.indexOf(Y);
var X=(W==-1)?V:V.substring(W+Y.length).replace(/\//g,h).replace(/\.js$/,l);
return X;
}}});
})();
(function(){var a="qx.core.ValidationError";
qx.Class.define(a,{extend:qx.type.BaseError});
})();
(function(){var f="qx.lang.Type",e="Error",d="RegExp",c="Date",b="Number",a="Boolean";
qx.Class.define(f,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(i){return this.getClass(i)==d;
},isNumber:function(h){return (h!==null&&(this.getClass(h)==b||h instanceof Number));
},isBoolean:function(j){return (j!==null&&(this.getClass(j)==a||j instanceof Boolean));
},isDate:function(k){return (k!==null&&(this.getClass(k)==c||k instanceof Date));
},isError:function(g){return (g!==null&&(this.getClass(g)==e||g instanceof Error));
}}});
})();
(function(){var a="qx.event.IEventHandler";
qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:3},members:{canHandleEvent:function(e,f){},registerEvent:function(g,h,i){},unregisterEvent:function(b,c,d){}}});
})();
(function(){var b="qx.util.ObjectPool",a="Integer";
qx.Class.define(b,{extend:qx.core.Object,construct:function(j){arguments.callee.base.call(this);
this.__cH={};

if(j!=null){this.setSize(j);
}},properties:{size:{check:a,init:Infinity}},members:{__cH:null,getObject:function(c){if(this.$$disposed){return;
}
if(!c){throw new Error("Class needs to be defined!");
}var d=null;
var e=this.__cH[c.classname];

if(e){d=e.pop();
}
if(d){d.$$pooled=false;
}else{d=new c;
}return d;
},poolObject:function(k){if(!this.__cH){return;
}var m=k.classname;
var n=this.__cH[m];

if(k.$$pooled){throw new Error("Object is already pooled: "+k);
}
if(!n){this.__cH[m]=n=[];
}if(n.length>this.getSize()){if(k.destroy){k.destroy();
}else{k.dispose();
}return;
}k.$$pooled=true;
n.push(k);
}},destruct:function(){var h=this.__cH;
var f,g,i,l;

for(f in h){g=h[f];

for(i=0,l=g.length;i<l;i++){g[i].dispose();
}}delete this.__cH;
}});
})();
(function(){var b="singleton",a="qx.event.Pool";
qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){arguments.callee.base.call(this,30);
}});
})();
(function(){var d="qx.util.DisposeUtil";
qx.Class.define(d,{statics:{disposeFields:function(f,g){qx.Bootstrap.warn("Don't use 'disposeFields' - instead assign directly to 'null'");

for(var i=0,l=g.length;i<l;i++){var name=g[i];

if(f[name]==null||!f.hasOwnProperty(name)){continue;
}f[name]=null;
}},disposeObjects:function(o,p){var name;

for(var i=0,l=p.length;i<l;i++){name=p[i];

if(o[name]==null||!o.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(o[name].dispose){o[name].dispose();
}else{throw new Error("Has no disposable object under key: "+name+"!");
}}o[name]=null;
}},disposeArray:function(q,r){var t=q[r];

if(!t){return;
}if(qx.core.ObjectRegistry.inShutDown){q[r]=null;
return;
}try{var s;

for(var i=t.length-1;i>=0;i--){s=t[i];

if(s){s.dispose();
}}}catch(n){throw new Error("The array field: "+r+" of object: "+q+" has non disposable entries: "+n);
}t.length=0;
q[r]=null;
},disposeMap:function(h,j){var k=h[j];

if(!k){return;
}if(qx.core.ObjectRegistry.inShutDown){h[j]=null;
return;
}try{for(var m in k){if(k.hasOwnProperty(m)){k[m].dispose();
}}}catch(e){throw new Error("The map field: "+j+" of object: "+h+" has non disposable entries: "+e);
}h[j]=null;
},disposeTriggeredBy:function(a,b){var c=b.dispose;
b.dispose=function(){c.call(b);
a.dispose();
};
}}});
})();
(function(){var a="qx.event.IEventDispatcher";
qx.Interface.define(a,{members:{canDispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);
this.assertString(e);
},dispatchEvent:function(b,event,c){this.assertInstance(event,qx.event.type.Event);
this.assertString(c);
}}});
})();
(function(){var a="qx.event.dispatch.Direct";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(m){this._manager=m;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(b,event,c){return !event.getBubbles();
},dispatchEvent:function(e,event,f){var j,g;
{};
event.setEventPhase(qx.event.type.Event.AT_TARGET);
var k=this._manager.getListeners(e,f,false);

if(k){for(var i=0,l=k.length;i<l;i++){var h=k[i].context||e;
k[i].handler.call(h,event);
}}}},defer:function(d){qx.event.Registration.addDispatcher(d);
}});
})();
(function(){var a="qx.event.handler.Object";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(e,f){return qx.Class.supportsEvent(e.constructor,f);
},registerEvent:function(g,h,i){},unregisterEvent:function(b,c,d){}},defer:function(j){qx.event.Registration.addHandler(j);
}});
})();
(function(){var k="indexOf",j="lastIndexOf",h="slice",g="concat",f="join",e="toLocaleUpperCase",d="shift",c="substr",b="filter",a="unshift",I="match",H="quote",G="qx.lang.Generics",F="localeCompare",E="sort",D="some",C="charAt",B="split",A="substring",z="pop",t="toUpperCase",u="replace",q="push",r="charCodeAt",o="every",p="reverse",m="search",n="forEach",v="map",w="toLowerCase",y="splice",x="toLocaleLowerCase";
qx.Class.define(G,{statics:{__cI:{"Array":[f,p,E,q,z,d,a,y,g,h,k,j,n,v,b,D,o],"String":[H,A,w,t,C,r,k,j,x,e,F,I,m,u,B,c,g,h]},__cJ:function(J,K){return function(s){return J.prototype[K].apply(s,Array.prototype.slice.call(arguments,1));
};
},__cK:function(){var M=qx.lang.Generics.__cI;

for(var Q in M){var O=window[Q];
var N=M[Q];

for(var i=0,l=N.length;i<l;i++){var P=N[i];

if(!O[P]){O[P]=qx.lang.Generics.__cJ(O,P);
}}}}},defer:function(L){L.__cK();
}});
})();
(function(){var b="qx.util.ValueManager",a="abstract";
qx.Class.define(b,{type:a,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this._dynamic={};
},members:{_dynamic:null,resolveDynamic:function(c){return this._dynamic[c];
},isDynamic:function(d){return !!this._dynamic[d];
},resolve:function(e){if(e&&this._dynamic[e]){return this._dynamic[e];
}return e;
},_setDynamic:function(f){this._dynamic=f;
},_getDynamic:function(){return this._dynamic;
}},destruct:function(){this._dynamic=null;
}});
})();
(function(){var j="/",i="0",h="qx/static",g="http://",f="https://",e="file://",d="qx.util.AliasManager",c="singleton",b=".",a="static";
qx.Class.define(d,{type:c,extend:qx.util.ValueManager,construct:function(){arguments.callee.base.call(this);
this.__cL={};
this.add(a,h);
},members:{__cL:null,_preprocess:function(n){var q=this._getDynamic();

if(q[n]===false){return n;
}else if(q[n]===undefined){if(n.charAt(0)===j||n.charAt(0)===b||n.indexOf(g)===0||n.indexOf(f)===i||n.indexOf(e)===0){q[n]=false;
return n;
}
if(this.__cL[n]){return this.__cL[n];
}var p=n.substring(0,n.indexOf(j));
var o=this.__cL[p];

if(o!==undefined){q[n]=o+n.substring(p.length);
}}return n;
},add:function(r,s){this.__cL[r]=s;
var u=this._getDynamic();
for(var t in u){if(t.substring(0,t.indexOf(j))===r){u[t]=s+t.substring(r.length);
}}},remove:function(m){delete this.__cL[m];
},resolve:function(k){var l=this._getDynamic();

if(k!==null){k=this._preprocess(k);
}return l[k]||k;
}},destruct:function(){this.__cL=null;
}});
})();
(function(){var k="px",j="qx.client",i="div",h="img",g="",f="no-repeat",d="scale-x",c="mshtml",b="scale",a="scale-y",F="qx/icon",E="repeat",D=".png",C="crop",B="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",A='<div style="',z="repeat-y",y='<img src="',x="qx.bom.element.Decoration",w="', sizingMethod='",r="png",s="')",p='"></div>',q='"/>',n='" style="',o="none",l="webkit",m=" ",t="repeat-x",u="DXImageTransform.Microsoft.AlphaImageLoader",v="absolute";
qx.Class.define(x,{statics:{DEBUG:false,__cM:{},__cN:qx.core.Variant.isSet(j,c)&&qx.bom.client.Engine.VERSION<7,__cO:qx.core.Variant.select(j,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__cP:{"scale-x":h,"scale-y":h,"scale":h,"repeat":i,"no-repeat":i,"repeat-x":i,"repeat-y":i},update:function(bb,bc,bd,be){var bh=this.getTagName(bd,bc);

if(bh!=bb.tagName.toLowerCase()){throw new Error("Image modification not possible because elements could not be replaced at runtime anymore!");
}var bi=this.getAttributes(bc,bd,be);

if(bh===h){bb.src=bi.src;
}if(bb.style.backgroundPosition!=g&&bi.style.backgroundPosition===undefined){bi.style.backgroundPosition=null;
}if(bb.style.clip!=g&&bi.style.clip===undefined){bi.style.clip=null;
}var bf=qx.bom.element.Style;
bf.setStyles(bb,bi.style);
if(this.__cN){try{bb.filters[u].apply();
}catch(e){}}},create:function(bH,bI,bJ){var bK=this.getTagName(bI,bH);
var bM=this.getAttributes(bH,bI,bJ);
var bL=qx.bom.element.Style.compile(bM.style);

if(bK===h){return y+bM.src+n+bL+q;
}else{return A+bL+p;
}},getTagName:function(R,S){if(qx.core.Variant.isSet(j,c)){if(S&&this.__cN&&this.__cO[R]&&qx.lang.String.endsWith(S,D)){return i;
}}return this.__cP[R];
},getAttributes:function(bw,bx,by){if(!by){by={};
}
if(!by.position){by.position=v;
}
if(qx.core.Variant.isSet(j,c)){by.fontSize=0;
by.lineHeight=0;
}else if(qx.core.Variant.isSet(j,l)){by.WebkitUserDrag=o;
}var bA=qx.util.ResourceManager.getInstance().getImageFormat(bw)||qx.io.ImageLoader.getFormat(bw);
{};
var bz;
if(this.__cN&&this.__cO[bx]&&bA===r){bz=this.__cS(by,bx,bw);
}else{if(bx===b){bz=this.__cT(by,bx,bw);
}else if(bx===d||bx===a){bz=this.__cU(by,bx,bw);
}else{bz=this.__cX(by,bx,bw);
}}return bz;
},__cQ:function(bW,bX,bY){if(bW.width==null&&bX!=null){bW.width=bX+k;
}
if(bW.height==null&&bY!=null){bW.height=bY+k;
}return bW;
},__cR:function(O){var P=qx.util.ResourceManager.getInstance().getImageWidth(O)||qx.io.ImageLoader.getWidth(O);
var Q=qx.util.ResourceManager.getInstance().getImageHeight(O)||qx.io.ImageLoader.getHeight(O);
return {width:P,height:Q};
},__cS:function(bB,bC,bD){var bG=this.__cR(bD);
bB=this.__cQ(bB,bG.width,bG.height);
var bF=bC==f?C:b;
var bE=B+qx.util.ResourceManager.getInstance().toUri(bD)+w+bF+s;
bB.filter=bE;
bB.backgroundImage=bB.backgroundRepeat=g;
return {style:bB};
},__cT:function(bN,bO,bP){var bQ=qx.util.ResourceManager.getInstance().toUri(bP);
var bR=this.__cR(bP);
bN=this.__cQ(bN,bR.width,bR.height);
return {src:bQ,style:bN};
},__cU:function(G,H,I){var M=qx.util.ResourceManager.getInstance();
var L=M.isClippedImage(I);
var N=this.__cR(I);

if(L){var K=M.getData(I);
var J=M.toUri(K[4]);

if(H===d){G=this.__cV(G,K,N.height);
}else{G=this.__cW(G,K,N.width);
}return {src:J,style:G};
}else{{};

if(H==d){G.height=N.height==null?null:N.height+k;
}else if(H==a){G.width=N.width==null?null:N.width+k;
}var J=M.toUri(I);
return {src:J,style:G};
}},__cV:function(bS,bT,bU){var bV=qx.util.ResourceManager.getInstance().getImageHeight(bT[4]);
bS.clip={top:-bT[6],height:bU};
bS.height=bV+k;
if(bS.top!=null){bS.top=(parseInt(bS.top,10)+bT[6])+k;
}else if(bS.bottom!=null){bS.bottom=(parseInt(bS.bottom,10)+bU-bV-bT[6])+k;
}return bS;
},__cW:function(bs,bt,bu){var bv=qx.util.ResourceManager.getInstance().getImageWidth(bt[4]);
bs.clip={left:-bt[5],width:bu};
bs.width=bv+k;
if(bs.left!=null){bs.left=(parseInt(bs.left,10)+bt[5])+k;
}else if(bs.right!=null){bs.right=(parseInt(bs.right,10)+bu-bv-bt[5])+k;
}return bs;
},__cX:function(bk,bl,bm){var br=qx.util.ResourceManager.getInstance().isClippedImage(bm);
var bq=this.__cR(bm);
if(br&&bl!==E){var bp=qx.util.ResourceManager.getInstance().getData(bm);
var bo=qx.bom.element.Background.getStyles(bp[4],bl,bp[5],bp[6]);

for(var bn in bo){bk[bn]=bo[bn];
}
if(bq.width!=null&&bk.width==null&&(bl==z||bl===f)){bk.width=bq.width+k;
}
if(bq.height!=null&&bk.height==null&&(bl==t||bl===f)){bk.height=bq.height+k;
}return {style:bk};
}else{{};
bk=this.__cQ(bk,bq.width,bq.height);
bk=this.__cY(bk,bm,bl);
return {style:bk};
}},__cY:function(T,U,V){var top=null;
var ba=null;

if(T.backgroundPosition){var W=T.backgroundPosition.split(m);
ba=parseInt(W[0]);

if(isNaN(ba)){ba=W[0];
}top=parseInt(W[1]);

if(isNaN(top)){top=W[1];
}}var Y=qx.bom.element.Background.getStyles(U,V,ba,top);

for(var X in Y){T[X]=Y[X];
}if(T.filter){T.filter=g;
}return T;
},__da:function(bj){if(this.DEBUG&&qx.util.ResourceManager.getInstance().has(bj)&&bj.indexOf(F)==-1){if(!this.__cM[bj]){qx.log.Logger.debug("Potential clipped image candidate: "+bj);
this.__cM[bj]=true;
}}},isAlphaImageLoaderEnabled:qx.core.Variant.select(j,{"mshtml":function(){return qx.bom.element.Decoration.__cN;
},"default":function(){return false;
}})}});
})();
(function(){var n="auto",m="px",l=",",k="clip:auto;",j="rect(",i=");",h="",g=")",f="qx.bom.element.Clip",e="string",b="rect(auto)",d="clip:rect(",c="clip",a="rect(auto,auto,auto,auto)";
qx.Class.define(f,{statics:{compile:function(F){if(!F){return k;
}var K=F.left;
var top=F.top;
var J=F.width;
var I=F.height;
var G,H;

if(K==null){G=(J==null?n:J+m);
K=n;
}else{G=(J==null?n:K+J+m);
K=K+m;
}
if(top==null){H=(I==null?n:I+m);
top=n;
}else{H=(I==null?n:top+I+m);
top=top+m;
}return d+top+l+G+l+H+l+K+i;
},get:function(o,p){var r=qx.bom.element.Style.get(o,c,p,false);
var w,top,u,t;
var q,s;

if(typeof r===e&&r!==n&&r!==h){r=qx.lang.String.trim(r);
if(/\((.*)\)/.test(r)){var v=RegExp.$1.split(l);
top=qx.lang.String.trim(v[0]);
q=qx.lang.String.trim(v[1]);
s=qx.lang.String.trim(v[2]);
w=qx.lang.String.trim(v[3]);
if(w===n){w=null;
}
if(top===n){top=null;
}
if(q===n){q=null;
}
if(s===n){s=null;
}if(top!=null){top=parseInt(top,10);
}
if(q!=null){q=parseInt(q,10);
}
if(s!=null){s=parseInt(s,10);
}
if(w!=null){w=parseInt(w,10);
}if(q!=null&&w!=null){u=q-w;
}else if(q!=null){u=q;
}
if(s!=null&&top!=null){t=s-top;
}else if(s!=null){t=s;
}}else{throw new Error("Could not parse clip string: "+r);
}}return {left:w||null,top:top||null,width:u||null,height:t||null};
},set:function(x,y){if(!y){x.style.clip=a;
return;
}var D=y.left;
var top=y.top;
var C=y.width;
var B=y.height;
var z,A;

if(D==null){z=(C==null?n:C+m);
D=n;
}else{z=(C==null?n:D+C+m);
D=D+m;
}
if(top==null){A=(B==null?n:B+m);
top=n;
}else{A=(B==null?n:top+B+m);
top=top+m;
}x.style.clip=j+top+l+z+l+A+l+D+g;
},reset:function(E){E.style.clip=qx.bom.client.Engine.MSHTML?b:n;
}}});
})();
(function(){var k="n-resize",j="e-resize",i="nw-resize",h="ne-resize",g="",f="cursor:",e="qx.client",d=";",c="qx.bom.element.Cursor",b="cursor",a="hand";
qx.Class.define(c,{statics:{__db:qx.core.Variant.select(e,{"mshtml":{"cursor":a,"ew-resize":j,"ns-resize":k,"nesw-resize":h,"nwse-resize":i},"opera":{"col-resize":j,"row-resize":k,"ew-resize":j,"ns-resize":k,"nesw-resize":h,"nwse-resize":i},"default":{}}),compile:function(p){return f+(this.__db[p]||p)+d;
},get:function(n,o){return qx.bom.element.Style.get(n,b,o,false);
},set:function(l,m){l.style.cursor=this.__db[m]||m;
},reset:function(q){q.style.cursor=g;
}}});
})();
(function(){var o="",n="qx.client",m=";",l="filter",k="opacity:",j="opacity",i="MozOpacity",h=");",g=")",f="zoom:1;filter:alpha(opacity=",c="qx.bom.element.Opacity",e="alpha(opacity=",d="-moz-opacity:";
qx.Class.define(c,{statics:{compile:qx.core.Variant.select(n,{"mshtml":function(K){if(K>=1){return o;
}
if(K<0.00001){K=0;
}return f+(K*100)+h;
},"gecko":function(z){if(z==1){z=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){return d+z+m;
}else{return k+z+m;
}},"default":function(s){if(s==1){return o;
}return k+s+m;
}}),set:qx.core.Variant.select(n,{"mshtml":function(F,G){var H=qx.bom.element.Style.get(F,l,qx.bom.element.Style.COMPUTED_MODE,false);
if(G>=1){F.style.filter=H.replace(/alpha\([^\)]*\)/gi,o);
return;
}
if(G<0.00001){G=0;
}if(!F.currentStyle||!F.currentStyle.hasLayout){F.style.zoom=1;
}F.style.filter=H.replace(/alpha\([^\)]*\)/gi,o)+e+G*100+g;
},"gecko":function(u,v){if(v==1){v=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){u.style.MozOpacity=v;
}else{u.style.opacity=v;
}},"default":function(a,b){if(b==1){b=o;
}a.style.opacity=b;
}}),reset:qx.core.Variant.select(n,{"mshtml":function(I){var J=qx.bom.element.Style.get(I,l,qx.bom.element.Style.COMPUTED_MODE,false);
I.style.filter=J.replace(/alpha\([^\)]*\)/gi,o);
},"gecko":function(t){if(qx.bom.client.Engine.VERSION<1.7){t.style.MozOpacity=o;
}else{t.style.opacity=o;
}},"default":function(A){A.style.opacity=o;
}}),get:qx.core.Variant.select(n,{"mshtml":function(B,C){var D=qx.bom.element.Style.get(B,l,C,false);

if(D){var E=D.match(/alpha\(opacity=(.*)\)/);

if(E&&E[1]){return parseFloat(E[1])/100;
}}return 1.0;
},"gecko":function(w,x){var y=qx.bom.element.Style.get(w,qx.bom.client.Engine.VERSION<1.7?i:j,x,false);

if(y==0.999999){y=1.0;
}
if(y!=null){return parseFloat(y);
}return 1.0;
},"default":function(p,q){var r=qx.bom.element.Style.get(p,j,q,false);

if(r!=null){return parseFloat(r);
}return 1.0;
}})}});
})();
(function(){var r="qx.client",q="",p="boxSizing",o="box-sizing",n=":",m="border-box",k="qx.bom.element.BoxSizing",j="KhtmlBoxSizing",h="-moz-box-sizing",g="WebkitBoxSizing",d=";",f="-khtml-box-sizing",e="content-box",c="-webkit-box-sizing",b="MozBoxSizing";
qx.Class.define(k,{statics:{__dc:qx.core.Variant.select(r,{"mshtml":null,"webkit":[p,j,g],"gecko":[b],"opera":[p]}),__dd:qx.core.Variant.select(r,{"mshtml":null,"webkit":[o,f,c],"gecko":[h],"opera":[o]}),__de:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__df:function(v){var w=this.__de;
return w.tags[v.tagName.toLowerCase()]||w.types[v.type];
},compile:qx.core.Variant.select(r,{"mshtml":function(s){{};
},"default":function(A){var C=this.__dd;
var B=q;

if(C){for(var i=0,l=C.length;i<l;i++){B+=C[i]+n+A+d;
}}return B;
}}),get:qx.core.Variant.select(r,{"mshtml":function(a){if(qx.bom.Document.isStandardMode(qx.dom.Node.getDocument(a))){if(!this.__df(a)){return e;
}}return m;
},"default":function(x){var z=this.__dc;
var y;

if(z){for(var i=0,l=z.length;i<l;i++){y=qx.bom.element.Style.get(x,z[i],null,false);

if(y!=null&&y!==q){return y;
}}}return q;
}}),set:qx.core.Variant.select(r,{"mshtml":function(t,u){{};
},"default":function(E,F){var G=this.__dc;

if(G){for(var i=0,l=G.length;i<l;i++){E.style[G[i]]=F;
}}}}),reset:function(D){this.set(D,q);
}}});
})();
(function(){var M="",L="qx.client",K="hidden",J="-moz-scrollbars-none",I="overflow",H=";",G="overflowY",F=":",E="overflowX",D="overflow:",Y="none",X="scroll",W="borderLeftStyle",V="borderRightStyle",U="div",T="borderRightWidth",S="overflow-y",R="borderLeftWidth",Q="-moz-scrollbars-vertical",P="100px",N="qx.bom.element.Overflow",O="overflow-x";
qx.Class.define(N,{statics:{__dg:null,getScrollbarWidth:function(){if(this.__dg!==null){return this.__dg;
}var bc=qx.bom.element.Style;
var be=function(bj,bk){return parseInt(bc.get(bj,bk))||0;
};
var bf=function(m){return (bc.get(m,V)==Y?0:be(m,T));
};
var bd=function(g){return (bc.get(g,W)==Y?0:be(g,R));
};
var bh=qx.core.Variant.select(L,{"mshtml":function(p){if(bc.get(p,G)==K||p.clientWidth==0){return bf(p);
}return Math.max(0,p.offsetWidth-p.clientLeft-p.clientWidth);
},"default":function(bl){if(bl.clientWidth==0){var bm=bc.get(bl,I);
var bn=(bm==X||bm==Q?16:0);
return Math.max(0,bf(bl)+bn);
}return Math.max(0,(bl.offsetWidth-bl.clientWidth-bd(bl)));
}});
var bg=function(by){return bh(by)-bf(by);
};
var t=document.createElement(U);
var s=t.style;
s.height=s.width=P;
s.overflow=X;
document.body.appendChild(t);
var c=bg(t);
this.__dg=c?c:16;
document.body.removeChild(t);
return this.__dg;
},_compile:qx.core.Variant.select(L,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(cc,cd){if(cd==K){cd=J;
}return D+cd+H;
}:
function(bG,bH){return bG+F+bH+H;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bE,bF){return D+bF+H;
}:
function(q,r){return q+F+r+H;
},"default":function(n,o){return n+F+o+H;
}}),compileX:function(bx){return this._compile(O,bx);
},compileY:function(j){return this._compile(S,j);
},getX:qx.core.Variant.select(L,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bY,ca){var cb=qx.bom.element.Style.get(bY,I,ca,false);

if(cb===J){cb=K;
}return cb;
}:
function(bO,bP){return qx.bom.element.Style.get(bO,E,bP,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bq,br){return qx.bom.element.Style.get(bq,I,br,false);
}:
function(k,l){return qx.bom.element.Style.get(k,E,l,false);
},"default":function(bU,bV){return qx.bom.element.Style.get(bU,E,bV,false);
}}),setX:qx.core.Variant.select(L,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(ce,cf){if(cf==K){cf=J;
}ce.style.overflow=cf;
}:
function(bK,bL){bK.style.overflowX=bL;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(h,i){h.style.overflow=i;
}:
function(B,C){B.style.overflowX=C;
},"default":function(bo,bp){bo.style.overflowX=bp;
}}),resetX:qx.core.Variant.select(L,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(ba){ba.style.overflow=M;
}:
function(bb){bb.style.overflowX=M;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(w,x){w.style.overflow=M;
}:
function(bt,bu){bt.style.overflowX=M;
},"default":function(bi){bi.style.overflowX=M;
}}),getY:qx.core.Variant.select(L,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(d,e){var f=qx.bom.element.Style.get(d,I,e,false);

if(f===J){f=K;
}return f;
}:
function(a,b){return qx.bom.element.Style.get(a,G,b,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bI,bJ){return qx.bom.element.Style.get(bI,I,bJ,false);
}:
function(u,v){return qx.bom.element.Style.get(u,G,v,false);
},"default":function(bB,bC){return qx.bom.element.Style.get(bB,G,bC,false);
}}),setY:qx.core.Variant.select(L,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bS,bT){if(bT===K){bT=J;
}bS.style.overflow=bT;
}:
function(bM,bN){bM.style.overflowY=bN;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bW,bX){bW.style.overflow=bX;
}:
function(z,A){z.style.overflowY=A;
},"default":function(bQ,bR){bQ.style.overflowY=bR;
}}),resetY:qx.core.Variant.select(L,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(y){y.style.overflow=M;
}:
function(bs){bs.style.overflowY=M;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bv,bw){bv.style.overflow=M;
}:
function(bz,bA){bz.style.overflowY=M;
},"default":function(bD){bD.style.overflowY=M;
}})}});
})();
(function(){var m="",k="qx.client",h="userSelect",g="style",f="MozUserModify",e="px",d="float",c="borderImage",b="styleFloat",a="appearance",F="pixelHeight",E='Ms',D=":",C="cssFloat",B="pixelTop",A="pixelLeft",z='O',y="qx.bom.element.Style",x='Khtml',w='string',t="pixelRight",u='Moz',r="pixelWidth",s="pixelBottom",p=";",q="textOverflow",n="userModify",o='Webkit',v="WebkitUserModify";
qx.Class.define(y,{statics:{__dh:function(){var W=[a,h,q,c];
var bb={};
var X=document.documentElement.style;
var bc=[u,o,x,z,E];

for(var i=0,l=W.length;i<l;i++){var bd=W[i];
var Y=bd;

if(X[bd]){bb[Y]=bd;
continue;
}bd=qx.lang.String.firstUp(bd);

for(var j=0,be=bc.length;j<be;j++){var ba=bc[j]+bd;

if(typeof X[ba]==w){bb[Y]=ba;
break;
}}}this.__di=bb;
this.__di[n]=qx.core.Variant.select(k,{"gecko":f,"webkit":v,"default":h});
this.__dj={};

for(var Y in bb){this.__dj[Y]=this.__dn(bb[Y]);
}this.__di[d]=qx.core.Variant.select(k,{"mshtml":b,"default":C});
},__dk:{width:r,height:F,left:A,right:t,top:B,bottom:s},__dl:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing,overflowX:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setX,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getX,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetX,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileX,qx.bom.element.Overflow)},overflowY:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setY,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getY,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetY,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileY,qx.bom.element.Overflow)}},compile:function(G){var J=[];
var L=this.__dl;
var K=this.__dj;
var name,I,H;

for(name in G){H=G[name];

if(H==null){continue;
}name=K[name]||name;
if(L[name]){J.push(L[name].compile(H));
}else{J.push(this.__dn(name),D,H,p);
}}return J.join(m);
},__dm:{},__dn:function(T){var U=this.__dm;
var V=U[T];

if(!V){V=U[T]=qx.lang.String.hyphenate(T);
}return V;
},setCss:qx.core.Variant.select(k,{"mshtml":function(bv,bw){bv.style.cssText=bw;
},"default":function(bt,bu){bt.setAttribute(g,bu);
}}),getCss:qx.core.Variant.select(k,{"mshtml":function(P){return P.style.cssText.toLowerCase();
},"default":function(Q){return Q.getAttribute(g);
}}),isPropertySupported:function(R){return (this.__dl[R]||this.__di[R]||R in document.documentElement.style);
},COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(M,name,N,O){{};
name=this.__di[name]||name;
if(O!==false&&this.__dl[name]){return this.__dl[name].set(M,N);
}else{M.style[name]=N!==null?N:m;
}},setStyles:function(bx,by,bz){{};
var bC=this.__di;
var bE=this.__dl;
var bA=bx.style;

for(var bD in by){var bB=by[bD];
var name=bC[bD]||bD;

if(bB===undefined){if(bz!==false&&bE[name]){bE[name].reset(bx);
}else{bA[name]=m;
}}else{if(bz!==false&&bE[name]){bE[name].set(bx,bB);
}else{bA[name]=bB!==null?bB:m;
}}}},reset:function(bm,name,bn){name=this.__di[name]||name;
if(bn!==false&&this.__dl[name]){return this.__dl[name].reset(bm);
}else{bm.style[name]=m;
}},get:qx.core.Variant.select(k,{"mshtml":function(bf,name,bg,bh){name=this.__di[name]||name;
if(bh!==false&&this.__dl[name]){return this.__dl[name].get(bf,bg);
}if(!bf.currentStyle){return bf.style[name]||m;
}switch(bg){case this.LOCAL_MODE:return bf.style[name]||m;
case this.CASCADED_MODE:return bf.currentStyle[name]||m;
default:var bl=bf.currentStyle[name]||m;
if(/^-?[\.\d]+(px)?$/i.test(bl)){return bl;
}var bk=this.__dk[name];

if(bk){var bi=bf.style[name];
bf.style[name]=bl||0;
var bj=bf.style[bk]+e;
bf.style[name]=bi;
return bj;
}if(/^-?[\.\d]+(em|pt|%)?$/i.test(bl)){throw new Error("Untranslated computed property value: "+name+". Only pixel values work well across different clients.");
}return bl;
}},"default":function(bo,name,bp,bq){name=this.__di[name]||name;
if(bq!==false&&this.__dl[name]){return this.__dl[name].get(bo,bp);
}switch(bp){case this.LOCAL_MODE:return bo.style[name]||m;
case this.CASCADED_MODE:if(bo.currentStyle){return bo.currentStyle[name]||m;
}throw new Error("Cascaded styles are not supported in this browser!");
default:var br=qx.dom.Node.getDocument(bo);
var bs=br.defaultView.getComputedStyle(bo,null);
return bs?bs[name]:m;
}}})},defer:function(S){S.__dh();
}});
})();
(function(){var f="CSS1Compat",e="position:absolute;width:0;height:0;width:1",d="qx.bom.Document",c="1px",b="qx.client",a="div";
qx.Class.define(d,{statics:{isQuirksMode:qx.core.Variant.select(b,{"mshtml":function(n){if(qx.bom.client.Engine.VERSION>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return (n||window).document.compatMode!==f;
}},"webkit":function(i){if(document.compatMode===undefined){var j=(i||window).document.createElement(a);
j.style.cssText=e;
return j.style.width===c?true:false;
}else{return (i||window).document.compatMode!==f;
}},"default":function(h){return (h||window).document.compatMode!==f;
}}),isStandardMode:function(g){return !this.isQuirksMode(g);
},getWidth:function(k){var l=(k||window).document;
var m=qx.bom.Viewport.getWidth(k);
var scroll=this.isStandardMode(k)?l.documentElement.scrollWidth:l.body.scrollWidth;
return Math.max(scroll,m);
},getHeight:function(o){var p=(o||window).document;
var q=qx.bom.Viewport.getHeight(o);
var scroll=this.isStandardMode(o)?p.documentElement.scrollHeight:p.body.scrollHeight;
return Math.max(scroll,q);
}}});
})();
(function(){var b="qx.client",a="qx.bom.Viewport";
qx.Class.define(a,{statics:{getWidth:qx.core.Variant.select(b,{"opera":function(o){if(qx.bom.client.Engine.VERSION<9.5){return (o||window).document.body.clientWidth;
}else{var p=(o||window).document;
return qx.bom.Document.isStandardMode(o)?p.documentElement.clientWidth:p.body.clientWidth;
}},"webkit":function(s){if(qx.bom.client.Engine.VERSION<523.15){return (s||window).innerWidth;
}else{var t=(s||window).document;
return qx.bom.Document.isStandardMode(s)?t.documentElement.clientWidth:t.body.clientWidth;
}},"default":function(c){var d=(c||window).document;
return qx.bom.Document.isStandardMode(c)?d.documentElement.clientWidth:d.body.clientWidth;
}}),getHeight:qx.core.Variant.select(b,{"opera":function(q){if(qx.bom.client.Engine.VERSION<9.5){return (q||window).document.body.clientHeight;
}else{var r=(q||window).document;
return qx.bom.Document.isStandardMode(q)?r.documentElement.clientHeight:r.body.clientHeight;
}},"webkit":function(e){if(qx.bom.client.Engine.VERSION<523.15){return (e||window).innerHeight;
}else{var f=(e||window).document;
return qx.bom.Document.isStandardMode(e)?f.documentElement.clientHeight:f.body.clientHeight;
}},"default":function(j){var k=(j||window).document;
return qx.bom.Document.isStandardMode(j)?k.documentElement.clientHeight:k.body.clientHeight;
}}),getScrollLeft:qx.core.Variant.select(b,{"mshtml":function(m){var n=(m||window).document;
return n.documentElement.scrollLeft||n.body.scrollLeft;
},"default":function(l){return (l||window).pageXOffset;
}}),getScrollTop:qx.core.Variant.select(b,{"mshtml":function(g){var h=(g||window).document;
return h.documentElement.scrollTop||h.body.scrollTop;
},"default":function(i){return (i||window).pageYOffset;
}})}});
})();
(function(){var h="/",g="mshtml",f="",e="qx.client",d="?",c="string",b="qx.util.ResourceManager",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,statics:{__do:qx.$$resources||{},__dp:{}},members:{has:function(i){return !!arguments.callee.self.__do[i];
},getData:function(j){return arguments.callee.self.__do[j]||null;
},getImageWidth:function(q){var r=arguments.callee.self.__do[q];
return r?r[0]:null;
},getImageHeight:function(k){var l=arguments.callee.self.__do[k];
return l?l[1]:null;
},getImageFormat:function(m){var n=arguments.callee.self.__do[m];
return n?n[2]:null;
},isClippedImage:function(o){var p=arguments.callee.self.__do[o];
return p&&p.length>4;
},toUri:function(s){if(s==null){return s;
}var t=arguments.callee.self.__do[s];

if(!t){return s;
}
if(typeof t===c){var v=t;
}else{var v=t[3];
if(!v){return s;
}}var u=f;

if(qx.core.Variant.isSet(e,g)&&qx.bom.client.Feature.SSL){u=arguments.callee.self.__dp[v];
}return u+qx.$$libraries[v].resourceUri+h+s;
}},defer:function(w){if(qx.core.Variant.isSet(e,g)){if(qx.bom.client.Feature.SSL){for(var A in qx.$$libraries){var y;

if(qx.$$libraries[A].resourceUri){y=qx.$$libraries[A].resourceUri;
}else{w.__dp[A]=f;
continue;
}if(y.match(/^\/\//)!=null){w.__dp[A]=window.location.protocol;
}else if(y.match(/^\.\//)!=null){var x=document.URL;
w.__dp[A]=x.substring(0,x.lastIndexOf(h)+1);
}else if(y.match(/^http/)!=null){}else{var B=window.location.href.indexOf(d);
var z;

if(B==-1){z=window.location.href;
}else{z=window.location.href.substring(0,B);
}w.__dp[A]=z.substring(0,z.lastIndexOf(h)+1);
}}}}}});
})();
(function(){var e="qx.client",d="load",c="qx.io.ImageLoader";
qx.Bootstrap.define(c,{statics:{__dq:{},__dr:{width:null,height:null},__ds:/\.(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(G){var H=this.__dq[G];
return !!(H&&H.loaded);
},isFailed:function(m){var n=this.__dq[m];
return !!(n&&n.failed);
},isLoading:function(a){var b=this.__dq[a];
return !!(b&&b.loading);
},getFormat:function(D){var E=this.__dq[D];
return E?E.format:null;
},getSize:function(o){var p=this.__dq[o];
return p?
{width:p.width,height:p.height}:this.__dr;
},getWidth:function(j){var k=this.__dq[j];
return k?k.width:null;
},getHeight:function(g){var h=this.__dq[g];
return h?h.height:null;
},load:function(w,x,y){var z=this.__dq[w];

if(!z){z=this.__dq[w]={};
}if(x&&!y){y=window;
}if(z.loaded||z.loading||z.failed){if(x){if(z.loading){z.callbacks.push(x,y);
}else{x.call(y,w,z);
}}}else{z.loading=true;
z.callbacks=[];

if(x){z.callbacks.push(x,y);
}var B=new Image();
var A=qx.lang.Function.listener(this.__dt,this,B,w);
B.onload=A;
B.onerror=A;
B.src=w;
}},__dt:qx.event.GlobalError.observeMethod(function(event,r,s){var t=this.__dq[s];
if(event.type===d){t.loaded=true;
t.width=this.__du(r);
t.height=this.__dv(r);
var u=this.__ds.exec(s);

if(u!=null){t.format=u[1];
}}else{t.failed=true;
}r.onload=r.onerror=null;
var v=t.callbacks;
delete t.loading;
delete t.callbacks;
for(var i=0,l=v.length;i<l;i+=2){v[i].call(v[i+1],s,t);
}}),__du:qx.core.Variant.select(e,{"gecko":function(C){return C.naturalWidth;
},"default":function(q){return q.width;
}}),__dv:qx.core.Variant.select(e,{"gecko":function(F){return F.naturalHeight;
},"default":function(f){return f.height;
}})}});
})();
(function(){var m="number",l="0",k="px",j=";",i="background-image:url(",h=");",g="",f=")",e="background-repeat:",d=" ",a="qx.bom.element.Background",c="url(",b="background-position:";
qx.Class.define(a,{statics:{__dw:[i,null,h,b,null,j,e,null,j],__dx:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__dy:function(F,top){var G=qx.bom.client.Engine;

if(G.GECKO&&G.VERSION<1.9&&F==top&&typeof F==m){top+=0.01;
}
if(F){var H=(typeof F==m)?F+k:F;
}else{H=l;
}
if(top){var I=(typeof top==m)?top+k:top;
}else{I=l;
}return H+d+I;
},compile:function(n,o,p,top){var q=this.__dy(p,top);
var r=qx.util.ResourceManager.getInstance().toUri(n);
var s=this.__dw;
s[1]=r;
s[4]=q;
s[7]=o;
return s.join(g);
},getStyles:function(z,A,B,top){if(!z){return this.__dx;
}var C=this.__dy(B,top);
var D=qx.util.ResourceManager.getInstance().toUri(z);
var E={backgroundPosition:C,backgroundImage:c+D+f};

if(A!=null){E.backgroundRepeat=A;
}return E;
},set:function(t,u,v,w,top){var x=this.getStyles(u,v,w,top);

for(var y in x){t.style[y]=x[y];
}}}});
})();
(function(){var f="_applyTheme",e="qx.theme.manager.Color",d="Theme",c="changeTheme",b="string",a="singleton";
qx.Class.define(e,{type:a,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:f,event:c}},members:{_applyTheme:function(n){var o={};

if(n){var p=n.colors;
var q=qx.util.ColorUtil;
var r;

for(var s in p){r=p[s];

if(typeof r===b){if(!q.isCssString(r)){throw new Error("Could not parse color: "+r);
}}else if(r instanceof Array){r=q.rgbToRgbString(r);
}else{throw new Error("Could not parse color: "+r);
}o[s]=r;
}}this._setDynamic(o);
},resolve:function(j){var m=this._dynamic;
var k=m[j];

if(k){return k;
}var l=this.getTheme();

if(l!==null&&l.colors[j]){return m[j]=l.colors[j];
}return j;
},isDynamic:function(g){var i=this._dynamic;

if(g&&(i[g]!==undefined)){return true;
}var h=this.getTheme();

if(h!==null&&g&&(h.colors[g]!==undefined)){i[g]=h.colors[g];
return true;
}return false;
}}});
})();
(function(){var F=",",E="rgb(",D=")",C="qx.theme.manager.Color",B="qx.util.ColorUtil";
qx.Class.define(B,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(w){return this.NAMED[w]!==undefined;
},isSystemColor:function(e){return this.SYSTEM[e]!==undefined;
},supportsThemes:function(){return qx.Class.isDefined(C);
},isThemedColor:function(s){if(!this.supportsThemes()){return false;
}return qx.theme.manager.Color.getInstance().isDynamic(s);
},stringToRgb:function(k){if(this.supportsThemes()&&this.isThemedColor(k)){var k=qx.theme.manager.Color.getInstance().resolveDynamic(k);
}
if(this.isNamedColor(k)){return this.NAMED[k];
}else if(this.isSystemColor(k)){throw new Error("Could not convert system colors to RGB: "+k);
}else if(this.isRgbString(k)){return this.__dz();
}else if(this.isHex3String(k)){return this.__dB();
}else if(this.isHex6String(k)){return this.__dC();
}throw new Error("Could not parse color: "+k);
},cssStringToRgb:function(j){if(this.isNamedColor(j)){return this.NAMED[j];
}else if(this.isSystemColor(j)){throw new Error("Could not convert system colors to RGB: "+j);
}else if(this.isRgbString(j)){return this.__dz();
}else if(this.isRgbaString(j)){return this.__dA();
}else if(this.isHex3String(j)){return this.__dB();
}else if(this.isHex6String(j)){return this.__dC();
}throw new Error("Could not parse color: "+j);
},stringToRgbString:function(v){return this.rgbToRgbString(this.stringToRgb(v));
},rgbToRgbString:function(d){return E+d[0]+F+d[1]+F+d[2]+D;
},rgbToHexString:function(bi){return (qx.lang.String.pad(bi[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(bi[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(bi[2].toString(16).toUpperCase(),2));
},isValidPropertyValue:function(h){return this.isThemedColor(h)||this.isNamedColor(h)||this.isHex3String(h)||this.isHex6String(h)||this.isRgbString(h);
},isCssString:function(n){return this.isSystemColor(n)||this.isNamedColor(n)||this.isHex3String(n)||this.isHex6String(n)||this.isRgbString(n);
},isHex3String:function(x){return this.REGEXP.hex3.test(x);
},isHex6String:function(u){return this.REGEXP.hex6.test(u);
},isRgbString:function(o){return this.REGEXP.rgb.test(o);
},isRgbaString:function(m){return this.REGEXP.rgba.test(m);
},__dz:function(){var U=parseInt(RegExp.$1,10);
var T=parseInt(RegExp.$2,10);
var S=parseInt(RegExp.$3,10);
return [U,T,S];
},__dA:function(){var bb=parseInt(RegExp.$1,10);
var ba=parseInt(RegExp.$2,10);
var Y=parseInt(RegExp.$3,10);
return [bb,ba,Y];
},__dB:function(){var X=parseInt(RegExp.$1,16)*17;
var W=parseInt(RegExp.$2,16)*17;
var V=parseInt(RegExp.$3,16)*17;
return [X,W,V];
},__dC:function(){var A=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);
var z=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);
var y=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);
return [A,z,y];
},hex3StringToRgb:function(a){if(this.isHex3String(a)){return this.__dB(a);
}throw new Error("Invalid hex3 value: "+a);
},hex6StringToRgb:function(c){if(this.isHex6String(c)){return this.__dC(c);
}throw new Error("Invalid hex6 value: "+c);
},hexStringToRgb:function(l){if(this.isHex3String(l)){return this.__dB(l);
}
if(this.isHex6String(l)){return this.__dC(l);
}throw new Error("Invalid hex value: "+l);
},rgbToHsb:function(G){var I,J,L;
var R=G[0];
var O=G[1];
var H=G[2];
var Q=(R>O)?R:O;

if(H>Q){Q=H;
}var K=(R<O)?R:O;

if(H<K){K=H;
}L=Q/255.0;

if(Q!=0){J=(Q-K)/Q;
}else{J=0;
}
if(J==0){I=0;
}else{var N=(Q-R)/(Q-K);
var P=(Q-O)/(Q-K);
var M=(Q-H)/(Q-K);

if(R==Q){I=M-P;
}else if(O==Q){I=2.0+N-M;
}else{I=4.0+P-N;
}I=I/6.0;

if(I<0){I=I+1.0;
}}return [Math.round(I*360),Math.round(J*100),Math.round(L*100)];
},hsbToRgb:function(bc){var i,f,p,q,t;
var bd=bc[0]/360;
var be=bc[1]/100;
var bf=bc[2]/100;

if(bd>=1.0){bd%=1.0;
}
if(be>1.0){be=1.0;
}
if(bf>1.0){bf=1.0;
}var bg=Math.floor(255*bf);
var bh={};

if(be==0.0){bh.red=bh.green=bh.blue=bg;
}else{bd*=6.0;
i=Math.floor(bd);
f=bd-i;
p=Math.floor(bg*(1.0-be));
q=Math.floor(bg*(1.0-(be*f)));
t=Math.floor(bg*(1.0-(be*(1.0-f))));

switch(i){case 0:bh.red=bg;
bh.green=t;
bh.blue=p;
break;
case 1:bh.red=q;
bh.green=bg;
bh.blue=p;
break;
case 2:bh.red=p;
bh.green=bg;
bh.blue=t;
break;
case 3:bh.red=p;
bh.green=q;
bh.blue=bg;
break;
case 4:bh.red=t;
bh.green=p;
bh.blue=bg;
break;
case 5:bh.red=bg;
bh.green=p;
bh.blue=q;
break;
}}return [bh.red,bh.green,bh.blue];
},randomColor:function(){var r=Math.round(Math.random()*255);
var g=Math.round(Math.random()*255);
var b=Math.round(Math.random()*255);
return this.rgbToRgbString([r,g,b]);
}}});
})();
(function(){var j="_applyStyle",i="stretch",h="Integer",g="px",f="repeat",e="round",d="shorthand",c=" ",b="px ",a="sliceBottom",z=";'></div>",y="<div style='",x="sliceLeft",w="sliceRight",v=" stretch stretch",u="repeatX",t="String",s="qx.ui.decoration.css3.BorderImage",r="border-box",q="",o='") ',p="sliceTop",m='url("',n="hidden",k="repeatY",l="absolute";
qx.Class.define(s,{extend:qx.ui.decoration.Abstract,construct:function(G,H){arguments.callee.base.call(this);
if(G!=null){this.setBorderImage(G);
}
if(H!=null){this.setSlice(H);
}},statics:{IS_SUPPORTED:qx.bom.element.Style.isPropertySupported("borderImage")},properties:{borderImage:{check:t,nullable:true,apply:j},sliceTop:{check:h,init:0,apply:j},sliceRight:{check:h,init:0,apply:j},sliceBottom:{check:h,init:0,apply:j},sliceLeft:{check:h,init:0,apply:j},slice:{group:[p,w,a,x],mode:d},repeatX:{check:[i,f,e],init:i,apply:j},repeatY:{check:[i,f,e],init:i,apply:j},repeat:{group:[u,k],mode:d}},members:{__dD:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__dD;
},getMarkup:function(){if(this.__dD){return this.__dD;
}var A=this._resolveImageUrl(this.getBorderImage());
var B=[this.getSliceTop(),this.getSliceRight(),this.getSliceBottom(),this.getSliceLeft()];
var C=[this.getRepeatX(),this.getRepeatY()].join(c);
this.__dD=[y,qx.bom.element.Style.compile({"borderImage":m+A+o+B.join(c)+v,position:l,lineHeight:0,fontSize:0,overflow:n,boxSizing:r,borderWidth:B.join(b)+g}),z].join(q);
return this.__dD;
},resize:function(D,E,F){D.style.width=E+g;
D.style.height=F+g;
},tint:function(J,K){},_applyStyle:function(){{};
},_resolveImageUrl:function(I){return qx.util.ResourceManager.getInstance().toUri(qx.util.AliasManager.getInstance().resolve(I));
}},destruct:function(){this.__dD=null;
}});
})();
(function(){var j="px",i="0px",h="-1px",g="no-repeat",f="scale-x",e="scale-y",d="-tr",c="-l",b='</div>',a="scale",x="qx.client",w="-br",v="-t",u="-tl",t="-r",s='<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">',r="_applyBaseImage",q="-b",p="String",o="",m="-bl",n="qx.ui.decoration.GridDiv",k="-c",l="mshtml";
qx.Class.define(n,{extend:qx.ui.decoration.Abstract,construct:function(K,L){arguments.callee.base.call(this);
if(K!=null){this.setBaseImage(K);
}
if(L!=null){this.setInsets(L);
}},properties:{baseImage:{check:p,nullable:true,apply:r}},members:{__dE:null,__dF:null,__dG:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__dE;
},getMarkup:function(){if(this.__dE){return this.__dE;
}var G=qx.bom.element.Decoration;
var H=this.__dF;
var I=this.__dG;
var J=[];
J.push(s);
J.push(G.create(H.tl,g,{top:0,left:0}));
J.push(G.create(H.t,f,{top:0,left:I.left+j}));
J.push(G.create(H.tr,g,{top:0,right:0}));
J.push(G.create(H.bl,g,{bottom:0,left:0}));
J.push(G.create(H.b,f,{bottom:0,left:I.left+j}));
J.push(G.create(H.br,g,{bottom:0,right:0}));
J.push(G.create(H.l,e,{top:I.top+j,left:0}));
J.push(G.create(H.c,a,{top:I.top+j,left:I.left+j}));
J.push(G.create(H.r,e,{top:I.top+j,right:0}));
J.push(b);
return this.__dE=J.join(o);
},resize:function(O,P,Q){var R=this.__dG;
var innerWidth=P-R.left-R.right;
var innerHeight=Q-R.top-R.bottom;
if(innerWidth<0){innerWidth=0;
}
if(innerHeight<0){innerHeight=0;
}O.style.width=P+j;
O.style.height=Q+j;
O.childNodes[1].style.width=innerWidth+j;
O.childNodes[4].style.width=innerWidth+j;
O.childNodes[7].style.width=innerWidth+j;
O.childNodes[6].style.height=innerHeight+j;
O.childNodes[7].style.height=innerHeight+j;
O.childNodes[8].style.height=innerHeight+j;

if(qx.core.Variant.isSet(x,l)){if(qx.bom.client.Engine.VERSION<7||(qx.bom.client.Feature.QUIRKS_MODE&&qx.bom.client.Engine.VERSION<8)){if(P%2==1){O.childNodes[2].style.marginRight=h;
O.childNodes[5].style.marginRight=h;
O.childNodes[8].style.marginRight=h;
}else{O.childNodes[2].style.marginRight=i;
O.childNodes[5].style.marginRight=i;
O.childNodes[8].style.marginRight=i;
}
if(Q%2==1){O.childNodes[3].style.marginBottom=h;
O.childNodes[4].style.marginBottom=h;
O.childNodes[5].style.marginBottom=h;
}else{O.childNodes[3].style.marginBottom=i;
O.childNodes[4].style.marginBottom=i;
O.childNodes[5].style.marginBottom=i;
}}}},tint:function(S,T){},_applyBaseImage:function(y,z){{};

if(y){var D=this._resolveImageUrl(y);
var E=/(.*)(\.[a-z]+)$/.exec(D);
var C=E[1];
var B=E[2];
var A=this.__dF={tl:C+u+B,t:C+v+B,tr:C+d+B,bl:C+m+B,b:C+q+B,br:C+w+B,l:C+c+B,c:C+k+B,r:C+t+B};
this.__dG=this._computeEdgeSizes(A);
}},_resolveImageUrl:function(F){return qx.util.AliasManager.getInstance().resolve(F);
},_computeEdgeSizes:function(M){var N=qx.util.ResourceManager.getInstance();
return {top:N.getImageHeight(M.t),bottom:N.getImageHeight(M.b),left:N.getImageWidth(M.l),right:N.getImageWidth(M.r)};
}},destruct:function(){this.__dE=this.__dF=this.__dG=null;
}});
})();
(function(){var l="ready",k="qx.client",j="mshtml",i="load",h="unload",g="qx.event.handler.Application",f="complete",d="gecko|opera|webkit",c="left",b="DOMContentLoaded",a="shutdown";
qx.Class.define(g,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(n){arguments.callee.base.call(this);
this._window=n.getWindow();
this.__dH=false;
this.__dI=false;
this._initObserver();
qx.event.handler.Application.$$instance=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,__dJ:false,onScriptLoaded:function(){this.__dJ=true;
var m=qx.event.handler.Application.$$instance;

if(m){m.__dM();
}}},members:{canHandleEvent:function(x,y){},registerEvent:function(u,v,w){},unregisterEvent:function(r,s,t){},__dK:null,__dH:null,__dI:null,__dL:null,__dM:function(){var p=qx.event.handler.Application;
if(!this.__dK&&this.__dH&&p.__dJ){if(qx.core.Variant.isSet(k,j)){if(qx.event.Registration.hasListener(this._window,l)){this.__dK=true;
qx.event.Registration.fireEvent(this._window,l);
}}else{this.__dK=true;
qx.event.Registration.fireEvent(this._window,l);
}}},isApplicationReady:function(){return this.__dK;
},_initObserver:function(){if(qx.$$domReady||document.readyState==f){this.__dH=true;
this.__dM();
}else{this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);

if(qx.core.Variant.isSet(k,d)){qx.bom.Event.addNativeListener(this._window,b,this._onNativeLoadWrapped);
}else if(qx.core.Variant.isSet(k,j)){var self=this;
var z=function(){try{document.documentElement.doScroll(c);

if(document.body){self._onNativeLoadWrapped();
}}catch(o){window.setTimeout(z,100);
}};
z();
}qx.bom.Event.addNativeListener(this._window,i,this._onNativeLoadWrapped);
}this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);
qx.bom.Event.addNativeListener(this._window,h,this._onNativeUnloadWrapped);
},_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,i,this._onNativeLoadWrapped);
}qx.bom.Event.removeNativeListener(this._window,h,this._onNativeUnloadWrapped);
this._onNativeLoadWrapped=null;
this._onNativeUnloadWrapped=null;
},_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__dH=true;
this.__dM();
}),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__dL){this.__dL=true;

try{qx.event.Registration.fireEvent(this._window,a);
}catch(e){throw e;
}finally{qx.core.ObjectRegistry.shutdown();
}}})},destruct:function(){this._stopObserver();
this._window=null;
},defer:function(q){qx.event.Registration.addHandler(q);
}});
})();
(function(){var a="qx.event.handler.Window";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(s){arguments.callee.base.call(this);
this._manager=s;
this._window=s.getWindow();
this._initWindowObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(q,r){},registerEvent:function(i,j,k){},unregisterEvent:function(b,c,d){},_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);
var u=qx.event.handler.Window.SUPPORTED_TYPES;

for(var t in u){qx.bom.Event.addNativeListener(this._window,t,this._onNativeWrapper);
}},_stopWindowObserver:function(){var g=qx.event.handler.Window.SUPPORTED_TYPES;

for(var f in g){qx.bom.Event.removeNativeListener(this._window,f,this._onNativeWrapper);
}},_onNative:qx.event.GlobalError.observeMethod(function(e){if(this.isDisposed()){return;
}var m=this._window;

try{var p=m.document;
}catch(e){return ;
}var n=p.documentElement;
var l=e.target||e.srcElement;

if(l==null||l===m||l===p||l===n){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,m]);
qx.event.Registration.dispatchEvent(m,event);
var o=event.getReturnValue();

if(o!=null){e.returnValue=o;
return o;
}}})},destruct:function(){this._stopWindowObserver();
this._manager=this._window=null;
},defer:function(h){qx.event.Registration.addHandler(h);
}});
})();
(function(){var f="ready",d="qx.application",c="beforeunload",b="qx.core.Init",a="shutdown";
qx.Class.define(b,{statics:{getApplication:function(){return this.__dO||null;
},__dN:function(){if(qx.bom.client.Engine.UNKNOWN_ENGINE){qx.log.Logger.warn("Could not detect engine!");
}
if(qx.bom.client.Engine.UNKNOWN_VERSION){qx.log.Logger.warn("Could not detect the version of the engine!");
}
if(qx.bom.client.Platform.UNKNOWN_PLATFORM){qx.log.Logger.warn("Could not detect platform!");
}
if(qx.bom.client.System.UNKNOWN_SYSTEM){qx.log.Logger.warn("Could not detect system!");
}qx.log.Logger.debug(this,"Load runtime: "+(new Date-qx.Bootstrap.LOADSTART)+"ms");
var i=qx.core.Setting.get(d);
var j=qx.Class.getByName(i);

if(j){this.__dO=new j;
var h=new Date;
this.__dO.main();
qx.log.Logger.debug(this,"Main runtime: "+(new Date-h)+"ms");
var h=new Date;
this.__dO.finalize();
qx.log.Logger.debug(this,"Finalize runtime: "+(new Date-h)+"ms");
}else{qx.log.Logger.warn("Missing application class: "+i);
}},__dP:function(e){var l=this.__dO;

if(l){e.setReturnValue(l.close());
}},__dQ:function(){var g=this.__dO;

if(g){g.terminate();
}}},defer:function(k){qx.event.Registration.addListener(window,f,k.__dN,k);
qx.event.Registration.addListener(window,a,k.__dQ,k);
qx.event.Registration.addListener(window,c,k.__dP,k);
}});
})();
(function(){var a="qx.application.IApplication";
qx.Interface.define(a,{members:{main:function(){},finalize:function(){},close:function(){},terminate:function(){}}});
})();
(function(){var a="qx.locale.MTranslation";
qx.Mixin.define(a,{members:{tr:function(f,g){var h=qx.locale.Manager;

if(h){return h.tr.apply(h,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trn:function(i,j,k,l){var m=qx.locale.Manager;

if(m){return m.trn.apply(m,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trc:function(b,c,d){var e=qx.locale.Manager;

if(e){return e.trc.apply(e,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},marktr:function(n){var o=qx.locale.Manager;

if(o){return o.marktr.apply(o,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
}}});
})();
(function(){var b="abstract",a="qx.application.AbstractGui";
qx.Class.define(a,{type:b,extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,members:{__dR:null,_createRootWidget:function(){throw new Error("Abstract method call");
},getRoot:function(){return this.__dR;
},main:function(){qx.theme.manager.Meta.getInstance().initialize();
qx.ui.tooltip.Manager.getInstance();
this.__dR=this._createRootWidget();
},finalize:function(){this.render();
},render:function(){qx.ui.core.queue.Manager.flush();
},close:function(c){},terminate:function(){}},destruct:function(){this.__dR=null;
}});
})();
(function(){var a="qx.application.Standalone";
qx.Class.define(a,{extend:qx.application.AbstractGui,members:{_createRootWidget:function(){return new qx.ui.root.Application(document);
}}});
})();
(function(){var s="changeValue",r="execute",q="icon/16/apps/office-calendar.png",p="right",o="Yes",n="Second Window",m="Page 1",l="bottom",k="Use move frame",j="Show Statusbar",bi="icon/16/actions/dialog-cancel.png",bh="icon/32/status/dialog-error.png",bg="Show Close",bf="resizable",be="icon/32/apps/office-address-book.png",bd="Third Window",bc="icon/22/apps/utilities-calculator.png",bb="Show Maximize",ba="Allow Close",Y="Use resize frame",z="No",A="testie.Application",x="Allow Maximize",y="value",v="The second window",w="Page 3",t="move",u="Resizable ",D="First Window",E="resize",M="Moveable",K="Demo loaded",Q="Allow Minimize",O="Resizable",U="Open Modal Dialog 2",S="Open Modal Dialog 1",G="First Modal Dialog",X="top",W="Movable",V="Welcome to your first own Window.<br/>Have fun!",F="Basics",I="Modal",J="Do you want to fly to Berlin?",L="Show Minimize",N="Application is ready",P="icon/16/apps/internet-feed-reader.png",R="Second Modal Dialog",T="icon/16/actions/dialog-ok.png",B="Page 2",C="left",H="icon/16/apps/internet-telephony.png";
qx.Class.define(A,{extend:qx.application.Standalone,members:{main:function(){arguments.callee.base.call(this);
{};
this.createWindow1();
this.createWindow2();
this.createWindow3();
},createWindow1:function(){var bl=new qx.ui.window.Window(D,q);
bl.setLayout(new qx.ui.layout.VBox(10));
bl.setShowStatusbar(true);
bl.setStatus(K);
bl.open();
this.getRoot().add(bl,{left:20,top:20});
bl.addListener(t,function(e){this.debug("Moved to: "+e.getData().left+"x"+e.getData().top);
},this);
bl.addListener(E,function(e){this.debug("Resized to: "+e.getData().width+"x"+e.getData().height);
},this);
var bk=new qx.ui.basic.Atom(V,be);
bk.setRich(true);
bl.add(bk);
var bj=new qx.ui.tabview.TabView;
bl.add(bj,{flex:1});
var bo=new qx.ui.tabview.Page(m);
bj.add(bo);
var bm=new qx.ui.tabview.Page(B);
bj.add(bm);
var bn=new qx.ui.tabview.Page(w);
bj.add(bn);
},createWindow2:function(){var bv=new qx.ui.window.Window(n,P);
bv.setLayout(new qx.ui.layout.VBox(10));
bv.setStatus(N);
bv.open();
this.getRoot().add(bv,{left:350,top:120});
var bF=new qx.ui.basic.Atom(v,bc);
bv.add(bF);
var bp=new qx.ui.container.Composite;
bp.setLayout(new qx.ui.layout.HBox(10));
bv.add(bp,{flex:1});
var by=new qx.ui.groupbox.GroupBox(F);
by.setLayout(new qx.ui.layout.VBox(4));
bp.add(by,{flex:1});
var bs=new qx.ui.form.CheckBox(bg);
bs.setValue(true);
bs.addListener(s,function(e){bv.setShowClose(e.getData());
});
by.add(bs);
var bE=new qx.ui.form.CheckBox(bb);
bE.setValue(true);
bE.addListener(s,function(e){bv.setShowMaximize(e.getData());
});
by.add(bE);
var bx=new qx.ui.form.CheckBox(L);
bx.setValue(true);
bx.addListener(s,function(e){bv.setShowMinimize(e.getData());
});
by.add(bx);
var bA=new qx.ui.form.CheckBox(ba);
bA.setValue(true);
bA.addListener(s,function(e){bv.setAllowClose(e.getData());
});
by.add(bA);
var bG=new qx.ui.form.CheckBox(x);
bG.setValue(true);
bG.addListener(s,function(e){bv.setAllowMaximize(e.getData());
});
by.add(bG);
var bu=new qx.ui.form.CheckBox(Q);
bu.setValue(true);
bu.addListener(s,function(e){bv.setAllowMinimize(e.getData());
});
by.add(bu);
var bq=new qx.ui.form.CheckBox(j);
bq.setValue(false);
bq.addListener(s,function(e){bv.setShowStatusbar(e.getData());
});
by.add(bq);
var bH=new qx.ui.groupbox.GroupBox(O);
bH.setLayout(new qx.ui.layout.VBox(4));
bp.add(bH,{flex:1});
var bC=new qx.ui.form.CheckBox(Y);
bC.setValue(true);
bC.addListener(s,function(e){bv.setUseResizeFrame(e.getData());
});
bH.add(bC);
var bD=[X,p,l,C];

for(var i=0;i<bD.length;i++){var bB=bD[i];
var bt=new qx.ui.form.CheckBox(u+bB).set({value:true});
bt.bind(y,bv,bf+qx.lang.String.firstUp(bB));
bH.add(bt);
}var br=new qx.ui.groupbox.GroupBox(M);
br.setLayout(new qx.ui.layout.VBox(4));
bp.add(br,{flex:1});
var bz=new qx.ui.form.CheckBox(W);
bz.setValue(true);
bz.addListener(s,function(e){bv.setMovable(e.getData());
});
br.add(bz);
var bw=new qx.ui.form.CheckBox(k);
bw.addListener(s,function(e){bv.setUseMoveFrame(e.getData());
});
br.add(bw);
},createWindow3:function(){var f=new qx.ui.window.Window(bd,H);
f.setLayout(new qx.ui.layout.VBox);
f.setMaxWidth(450);
f.setMaxHeight(400);
f.setAllowMaximize(false);
f.open();
this.getRoot().add(f,{left:100,top:250});
var g=this.getModalWindow1();
var h=new qx.ui.form.Button(S,q);
h.addListener(r,g.open,g);
f.add(h);
},getModalWindow1:function(){var b=new qx.ui.window.Window(G);
b.setLayout(new qx.ui.layout.VBox(10));
b.setModal(true);
b.moveTo(150,150);
this.getRoot().add(b);
var a=this.getModalWindow2();
var d=new qx.ui.form.Button(U,q);
d.addListener(r,a.open,a);
b.add(d);
var c=new qx.ui.form.CheckBox(I);
c.setValue(true);
b.add(c);
c.addListener(s,function(e){b.setModal(e.getData());
});
return b;
},getModalWindow2:function(){var bJ=new qx.ui.window.Window(R);
bJ.setLayout(new qx.ui.layout.VBox(10));
bJ.setModal(true);
bJ.setShowClose(false);
bJ.moveTo(300,300);
this.getRoot().add(bJ);
var bI=new qx.ui.basic.Atom(J,bh);
bJ.add(bI);
var bL=new qx.ui.container.Composite;
bL.setLayout(new qx.ui.layout.HBox(10,p));
bJ.add(bL);
var bM=new qx.ui.form.Button(o,T);
bM.addListener(r,function(e){bJ.close();
});
bL.add(bM);
var bK=new qx.ui.form.Button(z,bi);
bK.addListener(r,function(e){alert("Sorry, please click 'Yes'!");
});
bL.add(bK);
return bJ;
}}});
})();
(function(){var a="qx.event.type.Native";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(c,d,e,f,g){arguments.callee.base.call(this,f,g);
this._target=d||qx.bom.Event.getTarget(c);
this._relatedTarget=e||qx.bom.Event.getRelatedTarget(c);

if(c.timeStamp){this._timeStamp=c.timeStamp;
}this._native=c;
this._returnValue=null;
return this;
},clone:function(h){var i=arguments.callee.base.call(this,h);
var j={};
i._native=this._cloneNativeEvent(this._native,j);
i._returnValue=this._returnValue;
return i;
},_cloneNativeEvent:function(k,l){l.preventDefault=qx.lang.Function.empty;
return l;
},preventDefault:function(){arguments.callee.base.call(this);
qx.bom.Event.preventDefault(this._native);
},getNativeEvent:function(){return this._native;
},setReturnValue:function(b){this._returnValue=b;
},getReturnValue:function(){return this._returnValue;
}},destruct:function(){this._native=this._returnValue=null;
}});
})();
(function(){var f="_applyTheme",e="qx.theme",d="qx.theme.manager.Meta",c="qx.theme.Modern",b="Theme",a="singleton";
qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:b,nullable:true,apply:f}},members:{_applyTheme:function(j,k){var n=null;
var q=null;
var t=null;
var u=null;
var p=null;

if(j){n=j.meta.color||null;
q=j.meta.decoration||null;
t=j.meta.font||null;
u=j.meta.icon||null;
p=j.meta.appearance||null;
}var r=qx.theme.manager.Color.getInstance();
var s=qx.theme.manager.Decoration.getInstance();
var l=qx.theme.manager.Font.getInstance();
var o=qx.theme.manager.Icon.getInstance();
var m=qx.theme.manager.Appearance.getInstance();
r.setTheme(n);
s.setTheme(q);
l.setTheme(t);
o.setTheme(u);
m.setTheme(p);
},initialize:function(){var h=qx.core.Setting;
var g,i;
g=h.get(e);

if(g){i=qx.Theme.getByName(g);

if(!i){throw new Error("The theme to use is not available: "+g);
}this.setTheme(i);
}}},settings:{"qx.theme":c}});
})();
(function(){var g="object",f="_applyTheme",e="__dS",d="qx.theme.manager.Decoration",c="Theme",b="string",a="singleton";
qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:c,nullable:true,apply:f}},members:{__dS:null,resolve:function(j){if(!j){return null;
}
if(typeof j===g){return j;
}var m=this.getTheme();

if(!m){return null;
}var m=this.getTheme();

if(!m){return null;
}var n=this.__dS;

if(!n){n=this.__dS={};
}var k=n[j];

if(k){return k;
}var l=m.decorations[j];

if(!l){return null;
}var o=l.decorator;

if(o==null){throw new Error("Missing definition of which decorator to use in entry: "+j+"!");
}return n[j]=(new o).set(l.style);
},isValidPropertyValue:function(t){if(typeof t===b){return this.isDynamic(t);
}else if(typeof t===g){var u=t.constructor;
return qx.Class.hasInterface(u,qx.ui.decoration.IDecorator);
}return false;
},isDynamic:function(h){if(!h){return false;
}var i=this.getTheme();

if(!i){return false;
}return !!i.decorations[h];
},_applyTheme:function(p,q){var s=qx.util.AliasManager.getInstance();

if(q){for(var r in q.aliases){s.remove(r);
}}
if(p){for(var r in p.aliases){s.add(r,p.aliases[r]);
}}
if(!p){this.__dS={};
}}},destruct:function(){this._disposeMap(e);
}});
})();
(function(){var e="qx.theme.manager.Font",d="Theme",c="changeTheme",b="_applyTheme",a="singleton";
qx.Class.define(e,{type:a,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:b,event:c}},members:{resolveDynamic:function(f){var g=this._dynamic;
return f instanceof qx.bom.Font?f:g[f];
},resolve:function(m){var p=this._dynamic;
var n=p[m];

if(n){return n;
}var o=this.getTheme();

if(o!==null&&o.fonts[m]){return p[m]=(new qx.bom.Font).set(o.fonts[m]);
}return m;
},isDynamic:function(q){var s=this._dynamic;

if(q&&(q instanceof qx.bom.Font||s[q]!==undefined)){return true;
}var r=this.getTheme();

if(r!==null&&q&&r.fonts[q]){s[q]=(new qx.bom.Font).set(r.fonts[q]);
return true;
}return false;
},_applyTheme:function(h){var i=this._getDynamic();

for(var l in i){if(i[l].themed){i[l].dispose();
delete i[l];
}}
if(h){var j=h.fonts;
var k=qx.bom.Font;

for(var l in j){i[l]=(new k).set(j[l]);
i[l].themed=true;
}}this._setDynamic(i);
}}});
})();
(function(){var k="",j="underline",h="Boolean",g="px",f='"',e="italic",d="normal",c="bold",b="_applyItalic",a="_applyBold",x="Integer",w="_applyFamily",v="_applyLineHeight",u="Array",t="overline",s="line-through",r="qx.bom.Font",q="Number",p="_applyDecoration",o=" ",m="_applySize",n=",";
qx.Class.define(r,{extend:qx.core.Object,construct:function(y,z){arguments.callee.base.call(this);

if(y!==undefined){this.setSize(y);
}
if(z!==undefined){this.setFamily(z);
}},statics:{fromString:function(G){var K=new qx.bom.Font();
var I=G.split(/\s+/);
var name=[];
var J;

for(var i=0;i<I.length;i++){switch(J=I[i]){case c:K.setBold(true);
break;
case e:K.setItalic(true);
break;
case j:K.setDecoration(j);
break;
default:var H=parseInt(J,10);

if(H==J||qx.lang.String.contains(J,g)){K.setSize(H);
}else{name.push(J);
}break;
}}
if(name.length>0){K.setFamily(name);
}return K;
},fromConfig:function(C){var D=new qx.bom.Font;
D.set(C);
return D;
},__dT:{fontFamily:k,fontSize:k,fontWeight:k,fontStyle:k,textDecoration:k,lineHeight:1.2},getDefaultStyles:function(){return this.__dT;
}},properties:{size:{check:x,nullable:true,apply:m},lineHeight:{check:q,nullable:true,apply:v},family:{check:u,nullable:true,apply:w},bold:{check:h,nullable:true,apply:a},italic:{check:h,nullable:true,apply:b},decoration:{check:[j,s,t],nullable:true,apply:p}},members:{__dU:null,__dV:null,__dW:null,__dX:null,__dY:null,__ea:null,_applySize:function(A,B){this.__dU=A===null?null:A+g;
},_applyLineHeight:function(E,F){this.__ea=E===null?null:E;
},_applyFamily:function(P,Q){var R=k;

for(var i=0,l=P.length;i<l;i++){if(P[i].indexOf(o)>0){R+=f+P[i]+f;
}else{R+=P[i];
}
if(i!==l-1){R+=n;
}}this.__dV=R;
},_applyBold:function(L,M){this.__dW=L===null?null:L?c:d;
},_applyItalic:function(N,O){this.__dX=N===null?null:N?e:d;
},_applyDecoration:function(S,T){this.__dY=S===null?null:S;
},getStyles:function(){return {fontFamily:this.__dV,fontSize:this.__dU,fontWeight:this.__dW,fontStyle:this.__dX,textDecoration:this.__dY,lineHeight:this.__ea};
}}});
})();
(function(){var d="qx.theme.manager.Icon",c="Theme",b="_applyTheme",a="singleton";
qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:c,nullable:true,apply:b}},members:{_applyTheme:function(e,f){var h=qx.util.AliasManager.getInstance();

if(f){for(var g in f.aliases){h.remove(g);
}}
if(e){for(var g in e.aliases){h.add(g,e.aliases[g]);
}}}}});
})();
(function(){var h="string",g="_applyTheme",f="qx.theme.manager.Appearance",e=":",d="Theme",c="changeTheme",b="/",a="singleton";
qx.Class.define(f,{type:a,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__eb={};
this.__ec={};
},properties:{theme:{check:d,nullable:true,event:c,apply:g}},members:{__ed:{},__eb:null,__ec:null,_applyTheme:function(i,j){this.__ec={};
this.__eb={};
},__ee:function(B,C,D){var H=C.appearances;
var K=H[B];

if(!K){var L=b;
var E=[];
var J=B.split(L);
var I;

while(!K&&J.length>0){E.unshift(J.pop());
var F=J.join(L);
K=H[F];

if(K){I=K.alias||K;

if(typeof I===h){var G=I+L+E.join(L);
return this.__ee(G,C,D);
}}}if(D!=null){return this.__ee(D,C);
}return null;
}else if(typeof K===h){return this.__ee(K,C,D);
}else if(K.include&&!K.style){return this.__ee(K.include,C,D);
}return B;
},styleFrom:function(k,l,m,n){if(!m){m=this.getTheme();
}var t=this.__ec;
var o=t[k];

if(!o){o=t[k]=this.__ee(k,m,n);
}var y=m.appearances[o];

if(!y){this.warn("Missing appearance: "+k);
return null;
}if(!y.style){return null;
}var z=o;

if(l){var A=y.$$bits;

if(!A){A=y.$$bits={};
y.$$length=0;
}var r=0;

for(var u in l){if(!l[u]){continue;
}
if(A[u]==null){A[u]=1<<y.$$length++;
}r+=A[u];
}if(r>0){z+=e+r;
}}var s=this.__eb;

if(s[z]!==undefined){return s[z];
}if(!l){l=this.__ed;
}var w;
if(y.include||y.base){var q=y.style(l);
var p;

if(y.include){p=this.styleFrom(y.include,l,m,n);
}w={};
if(y.base){var v=this.styleFrom(o,l,y.base,n);

if(y.include){for(var x in v){if(!p.hasOwnProperty(x)&&!q.hasOwnProperty(x)){w[x]=v[x];
}}}else{for(var x in v){if(!q.hasOwnProperty(x)){w[x]=v[x];
}}}}if(y.include){for(var x in p){if(!q.hasOwnProperty(x)){w[x]=p[x];
}}}for(var x in q){w[x]=q[x];
}}else{w=y.style(l);
}return s[z]=w||null;
}},destruct:function(){this.__eb=this.__ec=null;
}});
})();
(function(){var p="focusout",o="interval",n="mouseover",m="mouseout",l="mousemove",k="__eg",j="widget",i="__ei",h="__ef",g="qx.ui.tooltip.ToolTip",c="Boolean",f="_applyCurrent",d="qx.ui.tooltip.Manager",b="tooltip-error",a="singleton";
qx.Class.define(d,{type:a,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
qx.event.Registration.addListener(document.body,n,this.__ep,this,true);
this.__ef=new qx.event.Timer();
this.__ef.addListener(o,this.__em,this);
this.__eg=new qx.event.Timer();
this.__eg.addListener(o,this.__en,this);
this.__eh={left:0,top:0};
},properties:{current:{check:g,nullable:true,apply:f},showInvalidTooltips:{check:c,init:true}},members:{__eh:null,__eg:null,__ef:null,__ei:null,__ej:null,__ek:function(){if(!this.__ei){this.__ei=new qx.ui.tooltip.ToolTip().set({rich:true});
}return this.__ei;
},__el:function(){if(!this.__ej){this.__ej=new qx.ui.tooltip.ToolTip().set({appearance:b});
this.__ej.syncAppearance();
}return this.__ej;
},_applyCurrent:function(x,y){if(y&&qx.ui.core.Widget.contains(y,x)){return;
}if(y){if(!y.isDisposed()){y.exclude();
}this.__ef.stop();
this.__eg.stop();
}var A=qx.event.Registration;
var z=document.body;
if(x){this.__ef.startWith(x.getShowTimeout());
A.addListener(z,m,this.__eq,this,true);
A.addListener(z,p,this.__er,this,true);
A.addListener(z,l,this.__eo,this,true);
}else{A.removeListener(z,m,this.__eq,this,true);
A.removeListener(z,p,this.__er,this,true);
A.removeListener(z,l,this.__eo,this,true);
}},__em:function(e){var B=this.getCurrent();

if(B&&!B.isDisposed()){this.__eg.startWith(B.getHideTimeout());

if(B.getPlaceMethod()==j){B.placeToWidget(B.getOpener());
}else{B.placeToPoint(this.__eh);
}B.show();
}this.__ef.stop();
},__en:function(e){var C=this.getCurrent();

if(C&&!C.isDisposed()){C.exclude();
}this.__eg.stop();
this.resetCurrent();
},__eo:function(e){var D=this.__eh;
D.left=e.getDocumentLeft();
D.top=e.getDocumentTop();
},__ep:function(e){var s=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!s){return;
}var t;
while(s!=null){var t=s.getToolTip();
var u=s.getToolTipText()||null;
var r=s.getToolTipIcon()||null;

if(qx.Class.hasInterface(s.constructor,qx.ui.form.IForm)&&!s.isValid()){var q=s.getInvalidMessage();
}
if(t||u||r||q){break;
}s=s.getLayoutParent();
}
if(!s){return;
}
if(s.isBlockToolTip()){return;
}if(q&&s.getEnabled()){if(!this.getShowInvalidTooltips()){return;
}var t=this.__el().set({label:q});
}else if(!t){var t=this.__ek().set({label:u,icon:r});
}this.setCurrent(t);
t.setOpener(s);
},__eq:function(e){var E=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!E){return;
}var F=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());

if(!F){return;
}var G=this.getCurrent();
if(G&&(F==G||qx.ui.core.Widget.contains(G,F))){return;
}if(F&&E&&qx.ui.core.Widget.contains(E,F)){return;
}if(G&&!F){this.setCurrent(null);
}else{this.resetCurrent();
}},__er:function(e){var v=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!v){return;
}var w=this.getCurrent();
if(w&&w==v.getToolTip()){this.setCurrent(null);
}}},destruct:function(){qx.event.Registration.removeListener(document.body,n,this.__ep,this,true);
this._disposeObjects(h,k,i);
this.__eh=null;
}});
})();
(function(){var h="interval",g="qx.event.Timer",f="_applyInterval",d="_applyEnabled",c="Boolean",b="qx.event.type.Event",a="Integer";
qx.Class.define(g,{extend:qx.core.Object,construct:function(q){arguments.callee.base.call(this);
this.setEnabled(false);

if(q!=null){this.setInterval(q);
}var self=this;
this.__es=function(){self._oninterval.call(self);
};
},events:{"interval":b},statics:{once:function(i,j,k){var l=new qx.event.Timer(k);
l.addListener(h,function(e){l.stop();
i.call(j,e);
l.dispose();
j=null;
},j);
l.start();
return l;
}},properties:{enabled:{init:true,check:c,apply:d},interval:{check:a,init:1000,apply:f}},members:{__et:null,__es:null,_applyInterval:function(o,p){if(this.getEnabled()){this.restart();
}},_applyEnabled:function(m,n){if(n){window.clearInterval(this.__et);
this.__et=null;
}else if(m){this.__et=window.setInterval(this.__es,this.getInterval());
}},start:function(){this.setEnabled(true);
},startWith:function(s){this.setInterval(s);
this.start();
},stop:function(){this.setEnabled(false);
},restart:function(){this.stop();
this.start();
},restartWith:function(r){this.stop();
this.startWith(r);
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.$$disposed){return;
}
if(this.getEnabled()){this.fireEvent(h);
}})},destruct:function(){if(this.__et){window.clearInterval(this.__et);
}this.__et=this.__es=null;
}});
})();
(function(){var a="qx.ui.core.MChildrenHandling";
qx.Mixin.define(a,{members:{getChildren:function(){return this._getChildren();
},hasChildren:function(){return this._hasChildren();
},indexOf:function(j){return this._indexOf(j);
},add:function(b,c){this._add(b,c);
},addAt:function(n,o,p){this._addAt(n,o,p);
},addBefore:function(g,h,i){this._addBefore(g,h,i);
},addAfter:function(d,e,f){this._addAfter(d,e,f);
},remove:function(m){this._remove(m);
},removeAt:function(l){return this._removeAt(l);
},removeAll:function(){this._removeAll();
}},statics:{remap:function(k){k.getChildren=k._getChildren;
k.hasChildren=k._hasChildren;
k.indexOf=k._indexOf;
k.add=k._add;
k.addAt=k._addAt;
k.addBefore=k._addBefore;
k.addAfter=k._addAfter;
k.remove=k._remove;
k.removeAt=k._removeAt;
k.removeAll=k._removeAll;
}}});
})();
(function(){var a="qx.ui.core.MLayoutHandling";
qx.Mixin.define(a,{members:{setLayout:function(b){return this._setLayout(b);
},getLayout:function(){return this._getLayout();
}},statics:{remap:function(c){c.getLayout=c._getLayout;
c.setLayout=c._setLayout;
}}});
})();
(function(){var K="Integer",J="_applyDimension",I="Boolean",H="_applyStretching",G="_applyMargin",F="shorthand",E="_applyAlign",D="allowShrinkY",C="bottom",B="baseline",Y="marginBottom",X="qx.ui.core.LayoutItem",W="center",V="marginTop",U="allowGrowX",T="middle",S="marginLeft",R="allowShrinkX",Q="top",P="right",N="marginRight",O="abstract",L="allowGrowY",M="left";
qx.Class.define(X,{type:O,extend:qx.core.Object,properties:{minWidth:{check:K,nullable:true,apply:J,init:null,themeable:true},width:{check:K,nullable:true,apply:J,init:null,themeable:true},maxWidth:{check:K,nullable:true,apply:J,init:null,themeable:true},minHeight:{check:K,nullable:true,apply:J,init:null,themeable:true},height:{check:K,nullable:true,apply:J,init:null,themeable:true},maxHeight:{check:K,nullable:true,apply:J,init:null,themeable:true},allowGrowX:{check:I,apply:H,init:true,themeable:true},allowShrinkX:{check:I,apply:H,init:true,themeable:true},allowGrowY:{check:I,apply:H,init:true,themeable:true},allowShrinkY:{check:I,apply:H,init:true,themeable:true},allowStretchX:{group:[U,R],mode:F,themeable:true},allowStretchY:{group:[L,D],mode:F,themeable:true},marginTop:{check:K,init:0,apply:G,themeable:true},marginRight:{check:K,init:0,apply:G,themeable:true},marginBottom:{check:K,init:0,apply:G,themeable:true},marginLeft:{check:K,init:0,apply:G,themeable:true},margin:{group:[V,N,Y,S],mode:F,themeable:true},alignX:{check:[M,W,P],nullable:true,apply:E,themeable:true},alignY:{check:[Q,T,C,B],nullable:true,apply:E,themeable:true}},members:{__eu:null,__ev:null,__ew:null,__ex:null,__ey:null,__ez:null,__eA:null,getBounds:function(){return this.__ez||this.__ev||null;
},clearSeparators:function(){},renderSeparator:function(bc,bd){},renderLayout:function(i,top,j,k){var l;
{};
var m=null;

if(this.getHeight()==null&&this._hasHeightForWidth()){var m=this._getHeightForWidth(j);
}
if(m!=null&&m!==this.__eu){this.__eu=m;
qx.ui.core.queue.Layout.add(this);
return null;
}var o=this.__ev;

if(!o){o=this.__ev={};
}var n={};

if(i!==o.left||top!==o.top){n.position=true;
o.left=i;
o.top=top;
}
if(j!==o.width||k!==o.height){n.size=true;
o.width=j;
o.height=k;
}if(this.__ew){n.local=true;
delete this.__ew;
}
if(this.__ey){n.margin=true;
delete this.__ey;
}return n;
},isExcluded:function(){return false;
},hasValidLayout:function(){return !this.__ew;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutCache:function(){this.__ew=true;
this.__ex=null;
},getSizeHint:function(ba){var bb=this.__ex;

if(bb){return bb;
}
if(ba===false){return null;
}bb=this.__ex=this._computeSizeHint();
if(this._hasHeightForWidth()&&this.__eu&&this.getHeight()==null){bb.height=this.__eu;
}if(bb.minWidth>bb.width){bb.width=bb.minWidth;
}
if(bb.maxWidth<bb.width){bb.width=bb.maxWidth;
}
if(!this.getAllowGrowX()){bb.maxWidth=bb.width;
}
if(!this.getAllowShrinkX()){bb.minWidth=bb.width;
}if(bb.minHeight>bb.height){bb.height=bb.minHeight;
}
if(bb.maxHeight<bb.height){bb.height=bb.maxHeight;
}
if(!this.getAllowGrowY()){bb.maxHeight=bb.height;
}
if(!this.getAllowShrinkY()){bb.minHeight=bb.height;
}return bb;
},_computeSizeHint:function(){var e=this.getMinWidth()||0;
var b=this.getMinHeight()||0;
var f=this.getWidth()||e;
var d=this.getHeight()||b;
var a=this.getMaxWidth()||Infinity;
var c=this.getMaxHeight()||Infinity;
return {minWidth:e,width:f,maxWidth:a,minHeight:b,height:d,maxHeight:c};
},_hasHeightForWidth:function(){var p=this._getLayout();

if(p){return p.hasHeightForWidth();
}return false;
},_getHeightForWidth:function(t){var u=this._getLayout();

if(u&&u.hasHeightForWidth()){return u.getHeightForWidth(t);
}return null;
},_getLayout:function(){return null;
},_applyMargin:function(){this.__ey=true;
var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyAlign:function(){var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyDimension:function(){qx.ui.core.queue.Layout.add(this);
},_applyStretching:function(){qx.ui.core.queue.Layout.add(this);
},hasUserBounds:function(){return !!this.__ez;
},setUserBounds:function(v,top,w,x){this.__ez={left:v,top:top,width:w,height:x};
qx.ui.core.queue.Layout.add(this);
},resetUserBounds:function(){delete this.__ez;
qx.ui.core.queue.Layout.add(this);
},__eB:{},setLayoutProperties:function(y){if(y==null){return;
}var z=this.__eA;

if(!z){z=this.__eA={};
}var parent=this.getLayoutParent();

if(parent){parent.updateLayoutProperties(y);
}for(var A in y){if(y[A]==null){delete z[A];
}else{z[A]=y[A];
}}},getLayoutProperties:function(){return this.__eA||this.__eB;
},clearLayoutProperties:function(){delete this.__eA;
},updateLayoutProperties:function(q){var r=this._getLayout();

if(r){var s;
{};
r.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},getApplicationRoot:function(){return qx.core.Init.getApplication().getRoot();
},getLayoutParent:function(){return this.$$parent||null;
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}this.$$parent=parent||null;
qx.ui.core.queue.Visibility.add(this);
},isRootWidget:function(){return false;
},_getRoot:function(){var parent=this;

while(parent){if(parent.isRootWidget()){return parent;
}parent=parent.$$parent;
}return null;
},clone:function(){var g=arguments.callee.base.call(this);
var h=this.__eA;

if(h){g.__eA=qx.lang.Object.clone(h);
}return g;
}},destruct:function(){this.$$parent=this.$$subparent=this.__eA=this.__ev=this.__ez=this.__ex=null;
}});
})();
(function(){var b="qx.ui.core.DecoratorFactory",a="$$nopool$$";
qx.Class.define(b,{extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__eC={};
},statics:{MAX_SIZE:15,__eD:a},members:{__eC:null,getDecoratorElement:function(c){var h=qx.ui.core.DecoratorFactory;

if(qx.lang.Type.isString(c)){var f=c;
var e=qx.theme.manager.Decoration.getInstance().resolve(c);
}else{var f=h.__eD;
e=c;
}var g=this.__eC;

if(g[f]&&g[f].length>0){var d=g[f].pop();
}else{var d=this._createDecoratorElement(e,f);
}d.$$pooled=false;
return d;
},poolDecorator:function(k){if(!k||k.$$pooled){return;
}var n=qx.ui.core.DecoratorFactory;
var l=k.getId();

if(l==n.__eD){k.dispose();
return;
}var m=this.__eC;

if(!m[l]){m[l]=[];
}
if(m[l].length>n.MAX_SIZE){k.dispose();
}else{k.$$pooled=true;
m[l].push(k);
}},_createDecoratorElement:function(o,p){var q=new qx.html.Decorator(o,p);
{};
return q;
},toString:function(){return arguments.callee.base.call(this);
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){var j=this.__eC;

for(var i in j){qx.util.DisposeUtil.disposeArray(j,i);
}}this.__eC=null;
}});
})();
(function(){var eu="px",et="Boolean",es="qx.event.type.Mouse",er="qx.event.type.Drag",eq="visible",ep="qx.event.type.Focus",eo="on",en="Integer",em="excluded",ek="qx.event.type.Data",dV="_applyPadding",dU="qx.event.type.Event",dT="hidden",dS="contextmenu",dR="String",dQ="tabIndex",dP="backgroundColor",dO="focused",dN="changeVisibility",dM="mshtml",eB="hovered",eC="qx.event.type.KeySequence",ez="qx.client",eA="absolute",ex="drag",ey="div",ev="disabled",ew="move",eD="dragstart",eE="qx.dynlocale",ed="dragchange",ec="dragend",ef="resize",ee="Decorator",eh="zIndex",eg="$$widget",ej="opacity",ei="default",eb="Color",ea="changeToolTipText",cC="beforeContextmenuOpen",cD="__eK",cE="_applyNativeContextMenu",cF="_applyBackgroundColor",cG="_applyFocusable",cH="changeShadow",cI="qx.event.type.KeyInput",cJ="createChildControl",cK="__eJ",cL="Font",eI="_applyShadow",eH="_applyEnabled",eG="_applySelectable",eF="Number",eM="_applyKeepActive",eL="_applyVisibility",eK="__eI",eJ="repeat",eO="qxDraggable",eN="syncAppearance",dl="__eR",dm="paddingLeft",dj="_applyDroppable",dk="#",dq="qx.event.type.MouseWheel",dr="_applyCursor",dn="_applyDraggable",dp="changeTextColor",dh="changeContextMenu",di="paddingTop",cT="changeSelectable",cS="hideFocus",cV="none",cU="outline",cP="_applyAppearance",cO="_applyOpacity",cR="url(",cQ=")",cN="qx.ui.core.Widget",cM="__eP",dw="_applyFont",dx="cursor",dy="qxDroppable",dz="changeZIndex",ds="changeEnabled",dt="__eN",du="changeFont",dv="_applyDecorator",dA="_applyZIndex",dB="_applyTextColor",de="qx.ui.menu.Menu",dd="_applyToolTipText",dc="true",db="widget",da="changeDecorator",cY="_applyTabIndex",cX="__eF",cW="changeAppearance",dg="shorthand",df="/",dC="",dD="_applyContextMenu",dE="paddingBottom",dF="changeNativeContextMenu",dG="qx.ui.tooltip.ToolTip",dH="qxKeepActive",dI="_applyKeepFocus",dJ="__eE",dK="paddingRight",dL="changeBackgroundColor",dY="changeLocale",dX="qxKeepFocus",dW="qx/static/blank.gif";
qx.Class.define(cN,{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){arguments.callee.base.call(this);
this.__eE=this._createContainerElement();
this.__eF=this.__eQ();
this.__eE.add(this.__eF);
this.initFocusable();
this.initSelectable();
this.initNativeContextMenu();
},events:{appear:dU,disappear:dU,createChildControl:ek,resize:ek,move:ek,syncAppearance:ek,mousemove:es,mouseover:es,mouseout:es,mousedown:es,mouseup:es,click:es,dblclick:es,contextmenu:es,beforeContextmenuOpen:es,mousewheel:dq,keyup:eC,keydown:eC,keypress:eC,keyinput:cI,focus:ep,blur:ep,focusin:ep,focusout:ep,activate:ep,deactivate:ep,capture:dU,losecapture:dU,drop:er,dragleave:er,dragover:er,drag:er,dragstart:er,dragend:er,dragchange:er,droprequest:er},properties:{paddingTop:{check:en,init:0,apply:dV,themeable:true},paddingRight:{check:en,init:0,apply:dV,themeable:true},paddingBottom:{check:en,init:0,apply:dV,themeable:true},paddingLeft:{check:en,init:0,apply:dV,themeable:true},padding:{group:[di,dK,dE,dm],mode:dg,themeable:true},zIndex:{nullable:true,init:null,apply:dA,event:dz,check:en,themeable:true},decorator:{nullable:true,init:null,apply:dv,event:da,check:ee,themeable:true},shadow:{nullable:true,init:null,apply:eI,event:cH,check:ee,themeable:true},backgroundColor:{nullable:true,check:eb,apply:cF,event:dL,themeable:true},textColor:{nullable:true,check:eb,apply:dB,event:dp,themeable:true,inheritable:true},font:{nullable:true,apply:dw,check:cL,event:du,themeable:true,inheritable:true,dispose:true},opacity:{check:eF,apply:cO,themeable:true,nullable:true,init:null},cursor:{check:dR,apply:dr,themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:dG,nullable:true},toolTipText:{check:dR,nullable:true,event:ea,apply:dd},toolTipIcon:{check:dR,nullable:true,event:ea},blockToolTip:{check:et,init:false},visibility:{check:[eq,dT,em],init:eq,apply:eL,event:dN},enabled:{init:true,check:et,inheritable:true,apply:eH,event:ds},anonymous:{init:false,check:et},tabIndex:{check:en,nullable:true,apply:cY},focusable:{check:et,init:false,apply:cG},keepFocus:{check:et,init:false,apply:dI},keepActive:{check:et,init:false,apply:eM},draggable:{check:et,init:false,apply:dn},droppable:{check:et,init:false,apply:dj},selectable:{check:et,init:false,event:cT,apply:eG},contextMenu:{check:de,apply:dD,nullable:true,event:dh},nativeContextMenu:{check:et,init:false,themeable:true,event:dF,apply:cE},appearance:{check:dR,init:db,apply:cP,event:cW}},statics:{DEBUG:false,getWidgetByElement:function(bn){while(bn){var bo=bn.$$widget;
if(bo!=null){return qx.core.ObjectRegistry.fromHashCode(bo);
}bn=bn.parentNode;
}return null;
},contains:function(parent,bT){while(bT){if(parent==bT){return true;
}bT=bT.getLayoutParent();
}return false;
},__eG:new qx.ui.core.DecoratorFactory(),__eH:new qx.ui.core.DecoratorFactory()},members:{__eE:null,__eF:null,__eI:null,__eJ:null,__eK:null,__eL:null,__eM:null,__eN:null,_getLayout:function(){return this.__eN;
},_setLayout:function(fX){{};

if(this.__eN){this.__eN.connectToWidget(null);
}
if(fX){fX.connectToWidget(this);
}this.__eN=fX;
qx.ui.core.queue.Layout.add(this);
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}var fH=this.getContainerElement();

if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(fH);
}this.$$parent=parent||null;

if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(fH);
}qx.core.Property.refresh(this);
qx.ui.core.queue.Visibility.add(this);
},_updateInsets:null,__eO:function(a,b){if(a==b){return false;
}
if(a==null||b==null){return true;
}var gC=qx.theme.manager.Decoration.getInstance();
var gE=gC.resolve(a).getInsets();
var gD=gC.resolve(b).getInsets();

if(gE.top!=gD.top||gE.right!=gD.right||gE.bottom!=gD.bottom||gE.left!=gD.left){return true;
}return false;
},renderLayout:function(fj,top,fk,fl){var fu=arguments.callee.base.call(this,fj,top,fk,fl);
if(!fu){return;
}var fn=this.getContainerElement();
var content=this.getContentElement();
var fr=fu.size||this._updateInsets;
var fv=eu;
var fs={};
if(fu.position){fs.left=fj+fv;
fs.top=top+fv;
}if(fu.size){fs.width=fk+fv;
fs.height=fl+fv;
}
if(fu.position||fu.size){fn.setStyles(fs);
}
if(fr||fu.local||fu.margin){var fm=this.getInsets();
var innerWidth=fk-fm.left-fm.right;
var innerHeight=fl-fm.top-fm.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}var fp={};

if(this._updateInsets){fp.left=fm.left+fv;
fp.top=fm.top+fv;
}
if(fr){fp.width=innerWidth+fv;
fp.height=innerHeight+fv;
}
if(fr||this._updateInsets){content.setStyles(fp);
}
if(fu.size){var ft=this.__eK;

if(ft){ft.setStyles({width:fk+eu,height:fl+eu});
}}
if(fu.size||this._updateInsets){if(this.__eI){this.__eI.resize(fk,fl);
}}
if(fu.size){if(this.__eJ){var fm=this.__eJ.getInsets();
var fq=fk+fm.left+fm.right;
var fo=fl+fm.top+fm.bottom;
this.__eJ.resize(fq,fo);
}}
if(fr||fu.local||fu.margin){if(this.__eN&&this.hasLayoutChildren()){this.__eN.renderLayout(innerWidth,innerHeight);
}else if(this.hasLayoutChildren()){throw new Error("At least one child in control "+this._findTopControl()+" requires a layout, but no one was defined!");
}}if(fu.position&&this.hasListener(ew)){this.fireDataEvent(ew,this.getBounds());
}
if(fu.size&&this.hasListener(ef)){this.fireDataEvent(ef,this.getBounds());
}delete this._updateInsets;
return fu;
},__eP:null,clearSeparators:function(){var fa=this.__eP;

if(!fa){return;
}var fb=qx.ui.core.Widget.__eG;
var content=this.getContentElement();
var eY;

for(var i=0,l=fa.length;i<l;i++){eY=fa[i];
fb.poolDecorator(eY);
content.remove(eY);
}fa.length=0;
},renderSeparator:function(fI,fJ){var fK=qx.ui.core.Widget.__eG.getDecoratorElement(fI);
this.getContentElement().add(fK);
fK.resize(fJ.width,fJ.height);
fK.setStyles({left:fJ.left+eu,top:fJ.top+eu});
if(!this.__eP){this.__eP=[fK];
}else{this.__eP.push(fK);
}},_computeSizeHint:function(){var W=this.getWidth();
var V=this.getMinWidth();
var R=this.getMaxWidth();
var U=this.getHeight();
var S=this.getMinHeight();
var T=this.getMaxHeight();
{};
var X=this._getContentHint();
var Q=this.getInsets();
var ba=Q.left+Q.right;
var Y=Q.top+Q.bottom;

if(W==null){W=X.width+ba;
}
if(U==null){U=X.height+Y;
}
if(V==null){V=ba;

if(X.minWidth!=null){V+=X.minWidth;
}}
if(S==null){S=Y;

if(X.minHeight!=null){S+=X.minHeight;
}}
if(R==null){if(X.maxWidth==null){R=Infinity;
}else{R=X.maxWidth+ba;
}}
if(T==null){if(X.maxHeight==null){T=Infinity;
}else{T=X.maxHeight+Y;
}}return {width:W,minWidth:V,maxWidth:R,height:U,minHeight:S,maxHeight:T};
},invalidateLayoutCache:function(){arguments.callee.base.call(this);

if(this.__eN){this.__eN.invalidateLayoutCache();
}},_getContentHint:function(){var D=this.__eN;

if(D){if(this.hasLayoutChildren()){var C;
var E=D.getSizeHint();
{};
return E;
}else{return {width:0,height:0};
}}else{return {width:100,height:50};
}},_getHeightForWidth:function(gd){var gh=this.getInsets();
var gk=gh.left+gh.right;
var gj=gh.top+gh.bottom;
var gi=gd-gk;
var gf=this._getLayout();

if(gf&&gf.hasHeightForWidth()){var ge=gf.getHeightForWidth(gd);
}else{ge=this._getContentHeightForWidth(gi);
}var gg=ge+gj;
return gg;
},_getContentHeightForWidth:function(gl){throw new Error("Abstract method call: _getContentHeightForWidth()!");
},getInsets:function(){var top=this.getPaddingTop();
var co=this.getPaddingRight();
var cq=this.getPaddingBottom();
var cp=this.getPaddingLeft();

if(this.__eI){var cn=this.__eI.getInsets();
{};
top+=cn.top;
co+=cn.right;
cq+=cn.bottom;
cp+=cn.left;
}return {"top":top,"right":co,"bottom":cq,"left":cp};
},getInnerSize:function(){var bN=this.getBounds();

if(!bN){return null;
}var bM=this.getInsets();
return {width:bN.width-bM.left-bM.right,height:bN.height-bM.top-bM.bottom};
},show:function(){this.setVisibility(eq);
},hide:function(){this.setVisibility(dT);
},exclude:function(){this.setVisibility(em);
},isVisible:function(){return this.getVisibility()===eq;
},isHidden:function(){return this.getVisibility()!==eq;
},isExcluded:function(){return this.getVisibility()===em;
},isSeeable:function(){var fM=this.getContainerElement().getDomElement();

if(fM){return fM.offsetWidth>0;
}var fL=this;

do{if(!fL.isVisible()){return false;
}
if(fL.isRootWidget()){return true;
}fL=fL.getLayoutParent();
}while(fL);
return false;
},_createContainerElement:function(){var bD=new qx.html.Element(ey);
{};
bD.setStyles({"position":eA,"zIndex":0});
bD.setAttribute(eg,this.toHashCode());
{};
return bD;
},__eQ:function(){var y=this._createContentElement();
{};
y.setStyles({"position":eA,"zIndex":10});
return y;
},_createContentElement:function(){var A=new qx.html.Element(ey);
A.setStyles({"overflowX":dT,"overflowY":dT});
return A;
},getContainerElement:function(){return this.__eE;
},getContentElement:function(){return this.__eF;
},getDecoratorElement:function(){return this.__eI||null;
},getShadowElement:function(){return this.__eJ||null;
},__eR:null,getLayoutChildren:function(){var fF=this.__eR;

if(!fF){return this.__eS;
}var fG;

for(var i=0,l=fF.length;i<l;i++){var fE=fF[i];

if(fE.hasUserBounds()||fE.isExcluded()){if(fG==null){fG=fF.concat();
}qx.lang.Array.remove(fG,fE);
}}return fG||fF;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutChildren:function(){var B=this.__eN;

if(B){B.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},hasLayoutChildren:function(){var bY=this.__eR;

if(!bY){return false;
}var ca;

for(var i=0,l=bY.length;i<l;i++){ca=bY[i];

if(!ca.hasUserBounds()&&!ca.isExcluded()){return true;
}}return false;
},getChildrenContainer:function(){return this;
},__eS:[],_getChildren:function(){return this.__eR||this.__eS;
},_indexOf:function(bB){var bC=this.__eR;

if(!bC){return -1;
}return bC.indexOf(bB);
},_hasChildren:function(){var gp=this.__eR;
return gp!=null&&(!!gp[0]);
},addChildrenToQueue:function(bx){var by=this.__eR;

if(!by){return;
}var bz;

for(var i=0,l=by.length;i<l;i++){bz=by[i];
bx[bz.$$hash]=bz;
bz.addChildrenToQueue(bx);
}},_add:function(gW,gX){if(gW.getLayoutParent()==this){qx.lang.Array.remove(this.__eR,gW);
}
if(this.__eR){this.__eR.push(gW);
}else{this.__eR=[gW];
}this.__eT(gW,gX);
},_addAt:function(F,G,H){if(!this.__eR){this.__eR=[];
}if(F.getLayoutParent()==this){qx.lang.Array.remove(this.__eR,F);
}var I=this.__eR[G];

if(I===F){return F.setLayoutProperties(H);
}
if(I){qx.lang.Array.insertBefore(this.__eR,F,I);
}else{this.__eR.push(F);
}this.__eT(F,H);
},_addBefore:function(cg,ch,ci){{};

if(cg==ch){return;
}
if(!this.__eR){this.__eR=[];
}if(cg.getLayoutParent()==this){qx.lang.Array.remove(this.__eR,cg);
}qx.lang.Array.insertBefore(this.__eR,cg,ch);
this.__eT(cg,ci);
},_addAfter:function(k,m,n){{};

if(k==m){return;
}
if(!this.__eR){this.__eR=[];
}if(k.getLayoutParent()==this){qx.lang.Array.remove(this.__eR,k);
}qx.lang.Array.insertAfter(this.__eR,k,m);
this.__eT(k,n);
},_remove:function(eT){if(!this.__eR){throw new Error("This widget has no children!");
}qx.lang.Array.remove(this.__eR,eT);
this.__eU(eT);
},_removeAt:function(gR){if(!this.__eR){throw new Error("This widget has no children!");
}var gS=this.__eR[gR];
qx.lang.Array.removeAt(this.__eR,gR);
this.__eU(gS);
return gS;
},_removeAll:function(){if(!this.__eR){return;
}var bb=this.__eR.concat();
this.__eR.length=0;

for(var i=bb.length-1;i>=0;i--){this.__eU(bb[i]);
}qx.ui.core.queue.Layout.add(this);
},_afterAddChild:null,_afterRemoveChild:null,__eT:function(bp,bq){{};
var parent=bp.getLayoutParent();

if(parent&&parent!=this){parent._remove(bp);
}bp.setLayoutParent(this);
if(bq){bp.setLayoutProperties(bq);
}else{this.updateLayoutProperties();
}if(this._afterAddChild){this._afterAddChild(bp);
}},__eU:function(fP){{};

if(fP.getLayoutParent()!==this){throw new Error("Remove Error: "+fP+" is not a child of this widget!");
}fP.setLayoutParent(null);
if(this.__eN){this.__eN.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
if(this._afterRemoveChild){this._afterRemoveChild(fP);
}},capture:function(br){this.getContainerElement().capture(br);
},releaseCapture:function(){this.getContainerElement().releaseCapture();
},_applyPadding:function(bO,bP,name){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
},_createProtectorElement:function(){if(this.__eK){return;
}var eR=this.__eK=new qx.html.Element;
{};
eR.setStyles({position:eA,top:0,left:0,zIndex:7});
var eS=this.getBounds();

if(eS){this.__eK.setStyles({width:eS.width+eu,height:eS.height+eu});
}if(qx.core.Variant.isSet(ez,dM)){eR.setStyles({backgroundImage:cR+qx.util.ResourceManager.getInstance().toUri(dW)+cQ,backgroundRepeat:eJ});
}this.getContainerElement().add(eR);
},_applyDecorator:function(bc,bd){{};
var bh=qx.ui.core.Widget.__eG;
var bf=this.getContainerElement();
if(!this.__eK&&!qx.bom.client.Feature.CSS_POINTER_EVENTS){this._createProtectorElement();
}if(bd){bf.remove(this.__eI);
bh.poolDecorator(this.__eI);
}if(bc){var bg=this.__eI=bh.getDecoratorElement(bc);
bg.setStyle(eh,5);
var be=this.getBackgroundColor();
bg.tint(be);
bf.add(bg);
}else{delete this.__eI;
this._applyBackgroundColor(this.getBackgroundColor());
}if(bc&&!bd&&be){this.getContainerElement().setStyle(dP,null);
}if(this.__eO(bd,bc)){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
}else if(bc){var bi=this.getBounds();

if(bi){bg.resize(bi.width,bi.height);
this.__eK&&
this.__eK.setStyles({width:bi.width+eu,height:bi.height+eu});
}}},_applyShadow:function(gt,gu){var gB=qx.ui.core.Widget.__eH;
var gw=this.getContainerElement();
if(gu){gw.remove(this.__eJ);
gB.poolDecorator(this.__eJ);
}if(gt){var gy=this.__eJ=gB.getDecoratorElement(gt);
gw.add(gy);
var gA=gy.getInsets();
gy.setStyles({left:(-gA.left)+eu,top:(-gA.top)+eu});
var gz=this.getBounds();

if(gz){var gx=gz.width+gA.left+gA.right;
var gv=gz.height+gA.top+gA.bottom;
gy.resize(gx,gv);
}gy.tint(null);
}else{delete this.__eJ;
}},_applyToolTipText:function(gm,gn){if(qx.core.Variant.isSet(eE,eo)){if(this.__eM){return;
}var go=qx.locale.Manager.getInstance();
this.__eM=go.addListener(dY,function(){if(gm&&gm.translate){this.setToolTipText(gm.translate());
}},this);
}},_applyTextColor:function(fC,fD){},_applyZIndex:function(fQ,fR){this.getContainerElement().setStyle(eh,fQ==null?0:fQ);
},_applyVisibility:function(gq,gr){var gs=this.getContainerElement();

if(gq===eq){gs.show();
}else{gs.hide();
}var parent=this.$$parent;

if(parent&&(gr==null||gq==null||gr===em||gq===em)){parent.invalidateLayoutChildren();
}qx.ui.core.queue.Visibility.add(this);
},_applyOpacity:function(bE,bF){this.getContainerElement().setStyle(ej,bE==1?null:bE);
if(qx.core.Variant.isSet(ez,dM)){if(!qx.Class.isSubClassOf(this.getContentElement().constructor,qx.html.Image)){var bG=(bE==1||bE==null)?null:0.99;
this.getContentElement().setStyle(ej,bG);
}}},_applyCursor:function(eU,eV){if(eU==null&&!this.isSelectable()){eU=ei;
}this.getContainerElement().setStyle(dx,eU,qx.bom.client.Engine.OPERA);
},_applyBackgroundColor:function(fe,ff){var fg=this.getBackgroundColor();
var fi=this.getContainerElement();

if(this.__eI){this.__eI.tint(fg);
fi.setStyle(dP,null);
}else{var fh=qx.theme.manager.Color.getInstance().resolve(fg);
fi.setStyle(dP,fh);
}},_applyFont:function(fY,ga){},__eV:null,$$stateChanges:null,_forwardStates:null,hasState:function(bl){var bm=this.__eV;
return bm&&bm[bl];
},addState:function(cv){var cw=this.__eV;

if(!cw){cw=this.__eV={};
}
if(cw[cv]){return;
}this.__eV[cv]=true;
if(cv===eB){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var cz=this.__eY;

if(forward&&forward[cv]&&cz){var cx;

for(var cy in cz){cx=cz[cy];

if(cx instanceof qx.ui.core.Widget){cz[cy].addState(cv);
}}}},removeState:function(t){var u=this.__eV;

if(!u||!u[t]){return;
}delete this.__eV[t];
if(t===eB){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var x=this.__eY;

if(forward&&forward[t]&&x){for(var w in x){var v=x[w];

if(v instanceof qx.ui.core.Widget){v.removeState(t);
}}}},replaceState:function(c,d){var f=this.__eV;

if(!f){f=this.__eV={};
}
if(!f[d]){f[d]=true;
}
if(f[c]){delete f[c];
}
if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var j=this.__eY;

if(forward&&forward[d]&&j){for(var h in j){var g=j[h];

if(g instanceof qx.ui.core.Widget){g.replaceState(c,d);
}}}},__eW:null,__eX:null,syncAppearance:function(){var gJ=this.__eV;
var gI=this.__eW;
var gK=qx.theme.manager.Appearance.getInstance();
var gG=qx.core.Property.$$method.setThemed;
var gO=qx.core.Property.$$method.resetThemed;
if(this.__eX){delete this.__eX;
if(gI){var gF=gK.styleFrom(gI,gJ,null,this.getAppearance());
if(gF){gI=null;
}}}if(!gI){var gH=this;
var gN=[];

do{gN.push(gH.$$subcontrol||gH.getAppearance());
}while(gH=gH.$$subparent);
gI=this.__eW=gN.reverse().join(df).replace(/#[0-9]+/g,dC);
}var gL=gK.styleFrom(gI,gJ,null,this.getAppearance());

if(gL){var gM;

if(gF){for(var gM in gF){if(gL[gM]===undefined){this[gO[gM]]();
}}}{};
for(var gM in gL){gL[gM]===undefined?this[gO[gM]]():this[gG[gM]](gL[gM]);
}}else if(gF){for(var gM in gF){this[gO[gM]]();
}}this.fireDataEvent(eN,this.__eV);
},_applyAppearance:function(fN,fO){this.updateAppearance();
},checkAppearanceNeeds:function(){if(!this.__eL){qx.ui.core.queue.Appearance.add(this);
this.__eL=true;
}else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);
delete this.$$stateChanges;
}},updateAppearance:function(){this.__eX=true;
qx.ui.core.queue.Appearance.add(this);
var bJ=this.__eY;

if(bJ){var bH;

for(var bI in bJ){bH=bJ[bI];

if(bH instanceof qx.ui.core.Widget){bH.updateAppearance();
}}}},syncWidget:function(){},getEventTarget:function(){var fS=this;

while(fS.getAnonymous()){fS=fS.getLayoutParent();

if(!fS){return null;
}}return fS;
},getFocusTarget:function(){var fc=this;

if(!fc.getEnabled()){return null;
}
while(fc.getAnonymous()||!fc.getFocusable()){fc=fc.getLayoutParent();

if(!fc||!fc.getEnabled()){return null;
}}return fc;
},getFocusElement:function(){return this.getContainerElement();
},isTabable:function(){return (!!this.getContainerElement().getDomElement())&&this.isFocusable();
},_applyFocusable:function(fT,fU){var fV=this.getFocusElement();
if(fT){var fW=this.getTabIndex();

if(fW==null){fW=1;
}fV.setAttribute(dQ,fW);
if(qx.core.Variant.isSet(ez,dM)){fV.setAttribute(cS,dc);
}else{fV.setStyle(cU,cV);
}}else{if(fV.isNativelyFocusable()){fV.setAttribute(dQ,-1);
}else if(fU){fV.setAttribute(dQ,null);
}}},_applyKeepFocus:function(gb){var gc=this.getFocusElement();
gc.setAttribute(dX,gb?eo:null);
},_applyKeepActive:function(fw){var fx=this.getContainerElement();
fx.setAttribute(dH,fw?eo:null);
},_applyTabIndex:function(fd){if(fd==null){fd=1;
}else if(fd<1||fd>32000){throw new Error("TabIndex property must be between 1 and 32000");
}
if(this.getFocusable()&&fd!=null){this.getFocusElement().setAttribute(dQ,fd);
}},_applySelectable:function(gV){this._applyCursor(this.getCursor());
this.getContainerElement().setSelectable(gV);
this.getContentElement().setSelectable(gV);
},_applyEnabled:function(o,p){if(o===false){this.addState(ev);
this.removeState(eB);
if(this.isFocusable()){this.removeState(dO);
this._applyFocusable(false,true);
}if(this.isDraggable()){this._applyDraggable(false,true);
}if(this.isDroppable()){this._applyDroppable(false,true);
}}else{this.removeState(ev);
if(this.isFocusable()){this._applyFocusable(true,false);
}if(this.isDraggable()){this._applyDraggable(true,false);
}if(this.isDroppable()){this._applyDroppable(true,false);
}}},_applyNativeContextMenu:function(bU,bV,name){},_applyContextMenu:function(eW,eX){if(eX){eX.removeState(dS);

if(eX.getOpener()==this){eX.resetOpener();
}
if(!eW){this.removeListener(dS,this._onContextMenuOpen);
eX.removeListener(dN,this._onBeforeContextMenuOpen,this);
}}
if(eW){eW.setOpener(this);
eW.addState(dS);

if(!eX){this.addListener(dS,this._onContextMenuOpen);
eW.addListener(dN,this._onBeforeContextMenuOpen,this);
}}},_onContextMenuOpen:function(e){this.getContextMenu().openAtMouse(e);
e.stop();
},_onBeforeContextMenuOpen:function(e){if(e.getData()==eq&&this.hasListener(cC)){this.fireDataEvent(cC,e);
}},_onStopEvent:function(e){e.stopPropagation();
},_applyDraggable:function(cA,cB){if(!this.isEnabled()&&cA===true){cA=false;
}qx.ui.core.DragDropCursor.getInstance();
if(cA){this.addListener(eD,this._onDragStart);
this.addListener(ex,this._onDrag);
this.addListener(ec,this._onDragEnd);
this.addListener(ed,this._onDragChange);
}else{this.removeListener(eD,this._onDragStart);
this.removeListener(ex,this._onDrag);
this.removeListener(ec,this._onDragEnd);
this.removeListener(ed,this._onDragChange);
}this.getContainerElement().setAttribute(eO,cA?eo:null);
},_applyDroppable:function(gT,gU){if(!this.isEnabled()&&gT===true){gT=false;
}this.getContainerElement().setAttribute(dy,gT?eo:null);
},_onDragStart:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
this.getApplicationRoot().setGlobalCursor(ei);
},_onDrag:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
},_onDragEnd:function(e){qx.ui.core.DragDropCursor.getInstance().moveTo(-1000,-1000);
this.getApplicationRoot().resetGlobalCursor();
},_onDragChange:function(e){var fy=qx.ui.core.DragDropCursor.getInstance();
var fz=e.getCurrentAction();
fz?fy.setAction(fz):fy.resetAction();
},visualizeFocus:function(){this.addState(dO);
},visualizeBlur:function(){this.removeState(dO);
},scrollChildIntoView:function(cj,ck,cl,cm){this.scrollChildIntoViewX(cj,ck,cm);
this.scrollChildIntoViewY(cj,cl,cm);
},scrollChildIntoViewX:function(q,r,s){this.getContentElement().scrollChildIntoViewX(q.getContainerElement(),r,s);
},scrollChildIntoViewY:function(cb,cc,cd){this.getContentElement().scrollChildIntoViewY(cb.getContainerElement(),cc,cd);
},focus:function(){if(this.isFocusable()){this.getFocusElement().focus();
}else{throw new Error("Widget is not focusable!");
}},blur:function(){if(this.isFocusable()){this.getFocusElement().blur();
}else{throw new Error("Widget is not focusable!");
}},activate:function(){this.getContainerElement().activate();
},deactivate:function(){this.getContainerElement().deactivate();
},tabFocus:function(){this.getFocusElement().focus();
},hasChildControl:function(bQ){if(!this.__eY){return false;
}return !!this.__eY[bQ];
},__eY:null,_getCreatedChildControls:function(){return this.__eY;
},getChildControl:function(J,K){if(!this.__eY){if(K){return null;
}this.__eY={};
}var L=this.__eY[J];

if(L){return L;
}
if(K===true){return null;
}return this._createChildControl(J);
},_showChildControl:function(bW){var bX=this.getChildControl(bW);
bX.show();
return bX;
},_excludeChildControl:function(bR){var bS=this.getChildControl(bR,true);

if(bS){bS.exclude();
}},_isChildControlVisible:function(bK){var bL=this.getChildControl(bK,true);

if(bL){return bL.isVisible();
}return false;
},_createChildControl:function(bs){if(!this.__eY){this.__eY={};
}else if(this.__eY[bs]){throw new Error("Child control '"+bs+"' already created!");
}var bw=bs.indexOf(dk);

if(bw==-1){var bt=this._createChildControlImpl(bs);
}else{var bt=this._createChildControlImpl(bs.substring(0,bw));
}
if(!bt){throw new Error("Unsupported control: "+bs);
}bt.$$subcontrol=bs;
bt.$$subparent=this;
var bu=this.__eV;
var forward=this._forwardStates;

if(bu&&forward&&bt instanceof qx.ui.core.Widget){for(var bv in bu){if(forward[bv]){bt.addState(bv);
}}}this.fireDataEvent(cJ,bt);
return this.__eY[bs]=bt;
},_createChildControlImpl:function(bA){return null;
},_disposeChildControls:function(){var P=this.__eY;

if(!P){return;
}var N=qx.ui.core.Widget;

for(var O in P){var M=P[O];

if(!N.contains(this,M)){M.destroy();
}else{M.dispose();
}}delete this.__eY;
},_findTopControl:function(){var z=this;

while(z){if(!z.$$subparent){return z;
}z=z.$$subparent;
}return null;
},getContainerLocation:function(bj){var bk=this.getContainerElement().getDomElement();
return bk?qx.bom.element.Location.get(bk,bj):null;
},getContentLocation:function(ct){var cu=this.getContentElement().getDomElement();
return cu?qx.bom.element.Location.get(cu,ct):null;
},setDomLeft:function(ce){var cf=this.getContainerElement().getDomElement();

if(cf){cf.style.left=ce+eu;
}else{throw new Error("DOM element is not yet created!");
}},setDomTop:function(fA){var fB=this.getContainerElement().getDomElement();

if(fB){fB.style.top=fA+eu;
}else{throw new Error("DOM element is not yet created!");
}},setDomPosition:function(cr,top){var cs=this.getContainerElement().getDomElement();

if(cs){cs.style.left=cr+eu;
cs.style.top=top+eu;
}else{throw new Error("DOM element is not yet created!");
}},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
},clone:function(){var gP=arguments.callee.base.call(this);

if(this.getChildren){var gQ=this.getChildren();

for(var i=0,l=gQ.length;i<l;i++){gP.add(gQ[i].clone());
}}return gP;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Variant.isSet(eE,eo)){if(this.__eM){qx.locale.Manager.getInstance().removeListenerById(this.__eM);
}}this.getContainerElement().setAttribute(eg,null,true);
this._disposeChildControls();
qx.ui.core.queue.Appearance.remove(this);
qx.ui.core.queue.Layout.remove(this);
qx.ui.core.queue.Visibility.remove(this);
qx.ui.core.queue.Widget.remove(this);
}if(!qx.core.ObjectRegistry.inShutDown){var eQ=qx.ui.core.Widget;
var eP=this.getContainerElement();

if(this.__eI){eP.remove(this.__eI);
eQ.__eG.poolDecorator(this.__eI);
}
if(this.__eJ){eP.remove(this.__eJ);
eQ.__eH.poolDecorator(this.__eJ);
}this.clearSeparators();
this.__eI=this.__eJ=this.__eP=null;
}else{this._disposeArray(cM);
this._disposeObjects(eK,cK);
}this._disposeArray(dl);
this.__eV=this.__eY=null;
this._disposeObjects(dt,dJ,cX,cD);
}});
})();
(function(){var d="qx.event.type.Data",c="qx.ui.container.Composite",b="addChildWidget",a="removeChildWidget";
qx.Class.define(c,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MLayoutHandling],construct:function(i){arguments.callee.base.call(this);

if(i!=null){this._setLayout(i);
}},events:{addChildWidget:d,removeChildWidget:d},members:{_afterAddChild:function(e){this.fireNonBubblingEvent(b,qx.event.type.Data,[e]);
},_afterRemoveChild:function(h){this.fireNonBubblingEvent(a,qx.event.type.Data,[h]);
}},defer:function(f,g){qx.ui.core.MChildrenHandling.remap(g);
qx.ui.core.MLayoutHandling.remap(g);
}});
})();
(function(){var j="keep-align",i="interval",h="Integer",g="direct",f="best-fit",e="mouse",d="bottom-left",c="disappear",b="Boolean",a="bottom-right",x="widget",w="qx.ui.core.MPlacement",v="left-top",u="offsetRight",t="shorthand",s="offsetLeft",r="top-left",q="appear",p="offsetBottom",o="top-right",m="offsetTop",n="right-bottom",k="right-top",l="left-bottom";
qx.Mixin.define(w,{properties:{position:{check:[r,o,d,a,v,l,k,n],init:d,themeable:true},placeMethod:{check:[x,e],init:e,themeable:true},domMove:{check:b,init:false},placementModeX:{check:[g,j,f],init:j,themeable:true},placementModeY:{check:[g,j,f],init:j,themeable:true},offsetLeft:{check:h,init:0,themeable:true},offsetTop:{check:h,init:0,themeable:true},offsetRight:{check:h,init:0,themeable:true},offsetBottom:{check:h,init:0,themeable:true},offset:{group:[m,u,p,s],mode:t,themeable:true}},members:{__fa:null,getLayoutLocation:function(M){var P,O,Q,top;
O=M.getBounds();
Q=O.left;
top=O.top;
var R=O;
M=M.getLayoutParent();

while(M&&!M.isRootWidget()){O=M.getBounds();
Q+=O.left;
top+=O.top;
P=M.getInsets();
Q+=P.left;
top+=P.top;
M=M.getLayoutParent();
}if(M.isRootWidget()){var N=M.getContainerLocation();

if(N){Q+=N.left;
top+=N.top;
}}return {left:Q,top:top,right:Q+R.width,bottom:top+R.height};
},moveTo:function(S,top){if(this.getDomMove()){this.setDomPosition(S,top);
}else{this.setLayoutProperties({left:S,top:top});
}},placeToWidget:function(D,E){if(E){this.__fa=qx.lang.Function.bind(this.placeToWidget,this,D,false);
qx.event.Idle.getInstance().addListener(i,this.__fa);
this.addListener(c,function(){if(this.__fa){qx.event.Idle.getInstance().removeListener(i,this.__fa);
this.__fa=null;
}},this);
}var F=D.getContainerLocation()||this.getLayoutLocation(D);
this.__fc(F);
},placeToMouse:function(event){var z=event.getDocumentLeft();
var top=event.getDocumentTop();
var y={left:z,top:top,right:z,bottom:top};
this.__fc(y);
},placeToElement:function(V,W){var location=qx.bom.element.Location.get(V);
var X={left:location.left,top:location.top,right:location.left+V.offsetWidth,bottom:location.top+V.offsetHeight};
if(W){this.__fa=qx.lang.Function.bind(this.placeToElement,this,V,false);
qx.event.Idle.getInstance().addListener(i,this.__fa);
this.addListener(c,function(){if(this.__fa){qx.event.Idle.getInstance().removeListener(i,this.__fa);
this.__fa=null;
}},this);
}this.__fc(X);
},placeToPoint:function(G){var H={left:G.left,top:G.top,right:G.left,bottom:G.top};
this.__fc(H);
},_getPlacementOffsets:function(){return {left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};
},__fb:function(T){var U=null;

if(this._computePlacementSize){var U=this._computePlacementSize();
}else if(this.isVisible()){var U=this.getBounds();
}
if(U==null){this.addListenerOnce(q,function(){this.__fb(T);
},this);
}else{T.call(this,U);
}},__fc:function(C){this.__fb(function(K){var L=qx.util.placement.Placement.compute(K,this.getLayoutParent().getBounds(),C,this._getPlacementOffsets(),this.getPosition(),this.getPlacementModeX(),this.getPlacementModeY());
this.moveTo(L.left,L.top);
});
},setSmart:function(A){{};
var B=A?j:g;
this.set({placementModeX:B,placementModeY:B});
},getSmart:function(){{};
var I=this.getPlacementModeX()==j?true:false;
var J=this.getPlacementModeY()==j?true:false;
return I&&J;
},resetSmart:function(){{};
this.resetPlacementModeX();
this.resetPlacementModeY();
},isSmart:function(){{};
return this.getSmart();
},toggleSmart:function(){{};
this.setSmart(!this.getSmart());
}},destruct:function(){if(this.__fa){qx.event.Idle.getInstance().removeListener(i,this.__fa);
}}});
})();
(function(){var e="qx.ui.popup.Popup",d="visible",c="excluded",b="popup",a="Boolean";
qx.Class.define(e,{extend:qx.ui.container.Composite,include:qx.ui.core.MPlacement,construct:function(i){arguments.callee.base.call(this,i);
qx.core.Init.getApplication().getRoot().add(this);
this.initVisibility();
},properties:{appearance:{refine:true,init:b},visibility:{refine:true,init:c},autoHide:{check:a,init:true}},members:{_applyVisibility:function(f,g){arguments.callee.base.call(this,f,g);
var h=qx.ui.popup.Manager.getInstance();
f===d?h.add(this):h.remove(this);
}},destruct:function(){qx.ui.popup.Manager.getInstance().remove(this);
}});
})();
(function(){var n="atom",m="Integer",l="String",k="_applyRich",j="qx.ui.tooltip.ToolTip",i="_applyIcon",h="tooltip",g="qx.ui.core.Widget",f="mouseover",d="Boolean",c="_applyLabel";
qx.Class.define(j,{extend:qx.ui.popup.Popup,construct:function(a,b){arguments.callee.base.call(this);
this.setLayout(new qx.ui.layout.Grow);
this._createChildControl(n);
if(a!=null){this.setLabel(a);
}
if(b!=null){this.setIcon(b);
}this.addListener(f,this._onMouseOver,this);
},properties:{appearance:{refine:true,init:h},showTimeout:{check:m,init:700,themeable:true},hideTimeout:{check:m,init:4000,themeable:true},label:{check:l,nullable:true,apply:c},icon:{check:l,nullable:true,apply:i,themeable:true},rich:{check:d,init:false,apply:k},opener:{check:g,nullable:true}},members:{_createChildControlImpl:function(o){var p;

switch(o){case n:p=new qx.ui.basic.Atom;
this._add(p);
break;
}return p||arguments.callee.base.call(this,o);
},_onMouseOver:function(e){this.hide();
},_applyIcon:function(w,x){var y=this.getChildControl(n);
w==null?y.resetIcon:y.setIcon(w);
},_applyLabel:function(q,r){var s=this.getChildControl(n);
q==null?s.resetLabel():s.setLabel(q);
},_applyRich:function(t,u){var v=this.getChildControl(n);
v.setRich(t);
}}});
})();
(function(){var c="qx.ui.core.queue.Layout",b="layout";
qx.Class.define(c,{statics:{__fd:{},remove:function(a){delete this.__fd[a.$$hash];
},add:function(u){this.__fd[u.$$hash]=u;
qx.ui.core.queue.Manager.scheduleFlush(b);
},flush:function(){var q=this.__fg();
for(var i=q.length-1;i>=0;i--){var r=q[i];
if(r.hasValidLayout()){continue;
}if(r.isRootWidget()&&!r.hasUserBounds()){var t=r.getSizeHint();
r.renderLayout(0,0,t.width,t.height);
}else{var s=r.getBounds();
r.renderLayout(s.left,s.top,s.width,s.height);
}}},getNestingLevel:function(d){var e=this.__ff;
var g=0;
var parent=d;
while(true){if(e[parent.$$hash]!=null){g+=e[parent.$$hash];
break;
}
if(!parent.$$parent){break;
}parent=parent.$$parent;
g+=1;
}var f=g;

while(d&&d!==parent){e[d.$$hash]=f--;
d=d.$$parent;
}return g;
},__fe:function(){var A=qx.ui.core.queue.Visibility;
this.__ff={};
var z=[];
var y=this.__fd;
var v,x;

for(var w in y){v=y[w];

if(A.isVisible(v)){x=this.getNestingLevel(v);
if(!z[x]){z[x]={};
}z[x][w]=v;
delete y[w];
}}return z;
},__fg:function(){var l=[];
var n=this.__fe();

for(var k=n.length-1;k>=0;k--){if(!n[k]){continue;
}
for(var j in n[k]){var h=n[k][j];
if(k==0||h.isRootWidget()||h.hasUserBounds()){l.push(h);
h.invalidateLayoutCache();
continue;
}var p=h.getSizeHint(false);

if(p){h.invalidateLayoutCache();
var m=h.getSizeHint();
var o=(!h.getBounds()||p.minWidth!==m.minWidth||p.width!==m.width||p.maxWidth!==m.maxWidth||p.minHeight!==m.minHeight||p.height!==m.height||p.maxHeight!==m.maxHeight);
}else{o=true;
}
if(o){var parent=h.getLayoutParent();

if(!n[k-1]){n[k-1]={};
}n[k-1][parent.$$hash]=parent;
}else{l.push(h);
}}}return l;
}}});
})();
(function(){var a="qx.event.handler.UserAction";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(e){arguments.callee.base.call(this);
this.__fh=e;
this.__fi=e.getWindow();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__fh:null,__fi:null,canHandleEvent:function(i,j){},registerEvent:function(f,g,h){},unregisterEvent:function(b,c,d){}},destruct:function(){this.__fh=this.__fi=null;
},defer:function(k){qx.event.Registration.addHandler(k);
}});
})();
(function(){var b="qx.util.DeferredCallManager",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,construct:function(){this.__fj={};
this.__fk=qx.lang.Function.bind(this.__fo,this);
this.__fl=false;
},members:{__fm:null,__fn:null,__fj:null,__fl:null,__fk:null,schedule:function(c){if(this.__fm==null){this.__fm=window.setTimeout(this.__fk,0);
}var d=c.toHashCode();
if(this.__fn&&this.__fn[d]){return;
}this.__fj[d]=c;
this.__fl=true;
},cancel:function(g){var h=g.toHashCode();
if(this.__fn&&this.__fn[h]){this.__fn[h]=null;
return;
}delete this.__fj[h];
if(qx.lang.Object.isEmpty(this.__fj)&&this.__fm!=null){window.clearTimeout(this.__fm);
this.__fm=null;
}},__fo:qx.event.GlobalError.observeMethod(function(){this.__fm=null;
while(this.__fl){this.__fn=qx.lang.Object.clone(this.__fj);
this.__fj={};
this.__fl=false;

for(var f in this.__fn){var e=this.__fn[f];

if(e){this.__fn[f]=null;
e.call();
}}}this.__fn=null;
})},destruct:function(){if(this.__fm!=null){window.clearTimeout(this.__fm);
}this.__fk=this.__fj=null;
}});
})();
(function(){var a="qx.util.DeferredCall";
qx.Class.define(a,{extend:qx.core.Object,construct:function(d,e){arguments.callee.base.call(this);
this.__fp=d;
this.__fq=e||null;
this.__fr=qx.util.DeferredCallManager.getInstance();
},members:{__fp:null,__fq:null,__fr:null,cancel:function(){this.__fr.cancel(this);
},schedule:function(){this.__fr.schedule(this);
},call:function(){this.__fq?this.__fp.apply(this.__fq):this.__fp();
}},destruct:function(b,c){this.cancel();
this.__fq=this.__fp=this.__fr=null;
}});
})();
(function(){var cp="element",co="qx.client",cn="div",cm="",cl="mshtml",ck="none",cj="scroll",ci="text",ch="qx.html.Element",cg="__fO",cJ="|capture|",cI="focus",cH="gecko",cG="blur",cF="deactivate",cE="capture",cD="userSelect",cC="-moz-none",cB="visible",cA="releaseCapture",cw="|bubble|",cx="qxSelectable",cu="tabIndex",cv="off",cs="activate",ct="MozUserSelect",cq="normal",cr="webkit",cy="hidden",cz="on";
qx.Class.define(ch,{extend:qx.core.Object,construct:function(bT){arguments.callee.base.call(this);
this.__fs=bT||cn;
},statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__ft:{},_scheduleFlush:function(dq){qx.html.Element.__gb.schedule();
},flush:function(){var bu;
{};
var bm=this.__fu();
var bl=bm.getFocus();

if(bl&&this.__fy(bl)){bm.blur(bl);
}var bB=bm.getActive();

if(bB&&this.__fy(bB)){qx.bom.Element.deactivate(bB);
}var bp=this.__fw();

if(bp&&this.__fy(bp)){qx.bom.Element.releaseCapture(bp);
}var bv=[];
var bw=this._modified;

for(var bt in bw){bu=bw[bt];
if(bu.__fS()){if(bu.__fz&&qx.dom.Hierarchy.isRendered(bu.__fz)){bv.push(bu);
}else{{};
bu.__fR();
}delete bw[bt];
}}
for(var i=0,l=bv.length;i<l;i++){bu=bv[i];
{};
bu.__fR();
}var br=this._visibility;

for(var bt in br){bu=br[bt];
{};
bu.__fz.style.display=bu.__fC?cm:ck;
if(qx.core.Variant.isSet(co,cl)){if(!(document.documentMode>=8)){bu.__fz.style.visibility=bu.__fC?cB:cy;
}}delete br[bt];
}var scroll=this._scroll;

for(var bt in scroll){bu=scroll[bt];
var bC=bu.__fz;

if(bC&&bC.offsetWidth){var bo=true;
if(bu.__fF!=null){bu.__fz.scrollLeft=bu.__fF;
delete bu.__fF;
}if(bu.__fG!=null){bu.__fz.scrollTop=bu.__fG;
delete bu.__fG;
}var by=bu.__fD;

if(by!=null){var bs=by.element.getDomElement();

if(bs&&bs.offsetWidth){qx.bom.element.Scroll.intoViewX(bs,bC,by.align);
delete bu.__fD;
}else{bo=false;
}}var bz=bu.__fE;

if(bz!=null){var bs=bz.element.getDomElement();

if(bs&&bs.offsetWidth){qx.bom.element.Scroll.intoViewY(bs,bC,bz.align);
delete bu.__fE;
}else{bo=false;
}}if(bo){delete scroll[bt];
}}}var bn={"releaseCapture":1,"blur":1,"deactivate":1};
for(var i=0;i<this._actions.length;i++){var bA=this._actions[i];
var bx=bA.element.__fz;

if(!bx||!bn[bA.type]&&!bA.element.__fS()){continue;
}var bq=bA.args;
bq.unshift(bx);
qx.bom.Element[bA.type].apply(qx.bom.Element,bq);
}this._actions=[];
for(var bt in this.__ft){var bk=this.__ft[bt];
var bC=bk.element.__fz;

if(bC){qx.bom.Selection.set(bC,bk.start,bk.end);
delete this.__ft[bt];
}}qx.event.handler.Appear.refresh();
},__fu:function(){if(!this.__fv){var cX=qx.event.Registration.getManager(window);
this.__fv=cX.getHandler(qx.event.handler.Focus);
}return this.__fv;
},__fw:function(){if(!this.__fx){var cY=qx.event.Registration.getManager(window);
this.__fx=cY.getDispatcher(qx.event.dispatch.MouseCapture);
}return this.__fx.getCaptureElement();
},__fy:function(dA){var dB=qx.core.ObjectRegistry.fromHashCode(dA.$$element);
return dB&&!dB.__fS();
}},members:{__fs:null,__fz:null,__fA:false,__fB:true,__fC:true,__fD:null,__fE:null,__fF:null,__fG:null,__fH:null,__fI:null,__fJ:null,__fK:null,__fL:null,__fM:null,__fN:null,__fO:null,__fP:null,__fQ:null,_scheduleChildrenUpdate:function(){if(this.__fP){return;
}this.__fP=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cp);
},_createDomElement:function(){return qx.bom.Element.create(this.__fs);
},__fR:function(){{};
var cc=this.__fO;

if(cc){var length=cc.length;
var cd;

for(var i=0;i<length;i++){cd=cc[i];

if(cd.__fC&&cd.__fB&&!cd.__fz){cd.__fR();
}}}
if(!this.__fz){this.__fz=this._createDomElement();
this.__fz.$$element=this.$$hash;
this._copyData(false);

if(cc&&length>0){this._insertChildren();
}}else{this._syncData();

if(this.__fP){this._syncChildren();
}}delete this.__fP;
},_insertChildren:function(){var bh=this.__fO;
var length=bh.length;
var bj;

if(length>2){var bi=document.createDocumentFragment();

for(var i=0;i<length;i++){bj=bh[i];

if(bj.__fz&&bj.__fB){bi.appendChild(bj.__fz);
}}this.__fz.appendChild(bi);
}else{var bi=this.__fz;

for(var i=0;i<length;i++){bj=bh[i];

if(bj.__fz&&bj.__fB){bi.appendChild(bj.__fz);
}}}},_syncChildren:function(){var D;
var I=qx.core.ObjectRegistry;
var z=this.__fO;
var G=z.length;
var A;
var E;
var C=this.__fz;
var F=C.childNodes;
var B=0;
var H;
{};
for(var i=F.length-1;i>=0;i--){H=F[i];
E=I.fromHashCode(H.$$element);

if(!E||!E.__fB||E.__fQ!==this){C.removeChild(H);
{};
}}for(var i=0;i<G;i++){A=z[i];
if(A.__fB){E=A.__fz;
H=F[B];

if(!E){continue;
}if(E!=H){if(H){C.insertBefore(E,H);
}else{C.appendChild(E);
}{};
}B++;
}}{};
},_copyData:function(dg){var dk=this.__fz;
var dj=this.__fL;

if(dj){var dh=qx.bom.element.Attribute;

for(var dl in dj){dh.set(dk,dl,dj[dl]);
}}var dj=this.__fK;

if(dj){var di=qx.bom.element.Style;

if(dg){di.setStyles(dk,dj);
}else{di.setCss(dk,di.compile(dj));
}}var dj=this.__fM;

if(dj){for(var dl in dj){this._applyProperty(dl,dj[dl]);
}}var dj=this.__fN;

if(dj){qx.event.Registration.getManager(dk).importListeners(dk,dj);
delete this.__fN;
}},_syncData:function(){var cO=this.__fz;
var cN=qx.bom.element.Attribute;
var cL=qx.bom.element.Style;
var cM=this.__fI;

if(cM){var cR=this.__fL;

if(cR){var cP;

for(var cQ in cM){cP=cR[cQ];

if(cP!==undefined){cN.set(cO,cQ,cP);
}else{cN.reset(cO,cQ);
}}}this.__fI=null;
}var cM=this.__fH;

if(cM){var cR=this.__fK;

if(cR){var cK={};

for(var cQ in cM){cK[cQ]=cR[cQ];
}cL.setStyles(cO,cK);
}this.__fH=null;
}var cM=this.__fJ;

if(cM){var cR=this.__fM;

if(cR){var cP;

for(var cQ in cM){this._applyProperty(cQ,cR[cQ]);
}}this.__fJ=null;
}},__fS:function(){var da=this;
while(da){if(da.__fA){return true;
}
if(!da.__fB||!da.__fC){return false;
}da=da.__fQ;
}return false;
},__fT:function(bW){if(bW.__fQ===this){throw new Error("Child is already in: "+bW);
}
if(bW.__fA){throw new Error("Root elements could not be inserted into other ones.");
}if(bW.__fQ){bW.__fQ.remove(bW);
}bW.__fQ=this;
if(!this.__fO){this.__fO=[];
}if(this.__fz){this._scheduleChildrenUpdate();
}},__fU:function(dK){if(dK.__fQ!==this){throw new Error("Has no child: "+dK);
}if(this.__fz){this._scheduleChildrenUpdate();
}delete dK.__fQ;
},__fV:function(bI){if(bI.__fQ!==this){throw new Error("Has no child: "+bI);
}if(this.__fz){this._scheduleChildrenUpdate();
}},getChildren:function(){return this.__fO||null;
},getChild:function(cV){var cW=this.__fO;
return cW&&cW[cV]||null;
},hasChildren:function(){var bU=this.__fO;
return bU&&bU[0]!==undefined;
},indexOf:function(dT){var dU=this.__fO;
return dU?dU.indexOf(dT):-1;
},hasChild:function(q){var r=this.__fO;
return r&&r.indexOf(q)!==-1;
},add:function(dy){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++){this.__fT(arguments[i]);
}this.__fO.push.apply(this.__fO,arguments);
}else{this.__fT(dy);
this.__fO.push(dy);
}return this;
},addAt:function(dn,dp){this.__fT(dn);
qx.lang.Array.insertAt(this.__fO,dn,dp);
return this;
},remove:function(bX){var bY=this.__fO;

if(!bY){return;
}
if(arguments[1]){var ca;

for(var i=0,l=arguments.length;i<l;i++){ca=arguments[i];
this.__fU(ca);
qx.lang.Array.remove(bY,ca);
}}else{this.__fU(bX);
qx.lang.Array.remove(bY,bX);
}return this;
},removeAt:function(dc){var dd=this.__fO;

if(!dd){throw new Error("Has no children!");
}var de=dd[dc];

if(!de){throw new Error("Has no child at this position!");
}this.__fU(de);
qx.lang.Array.removeAt(this.__fO,dc);
return this;
},removeAll:function(){var cb=this.__fO;

if(cb){for(var i=0,l=cb.length;i<l;i++){this.__fU(cb[i]);
}cb.length=0;
}return this;
},getParent:function(){return this.__fQ||null;
},insertInto:function(parent,dz){parent.__fT(this);

if(dz==null){parent.__fO.push(this);
}else{qx.lang.Array.insertAt(this.__fO,this,dz);
}return this;
},insertBefore:function(df){var parent=df.__fQ;
parent.__fT(this);
qx.lang.Array.insertBefore(parent.__fO,this,df);
return this;
},insertAfter:function(dm){var parent=dm.__fQ;
parent.__fT(this);
qx.lang.Array.insertAfter(parent.__fO,this,dm);
return this;
},moveTo:function(dI){var parent=this.__fQ;
parent.__fV(this);
var dJ=parent.__fO.indexOf(this);

if(dJ===dI){throw new Error("Could not move to same index!");
}else if(dJ<dI){dI--;
}qx.lang.Array.removeAt(parent.__fO,dJ);
qx.lang.Array.insertAt(parent.__fO,this,dI);
return this;
},moveBefore:function(o){var parent=this.__fQ;
return this.moveTo(parent.__fO.indexOf(o));
},moveAfter:function(P){var parent=this.__fQ;
return this.moveTo(parent.__fO.indexOf(P)+1);
},free:function(){var parent=this.__fQ;

if(!parent){throw new Error("Has no parent to remove from.");
}
if(!parent.__fO){return;
}parent.__fU(this);
qx.lang.Array.remove(parent.__fO,this);
return this;
},getDomElement:function(){return this.__fz||null;
},getNodeName:function(){return this.__fs;
},setNodeName:function(name){this.__fs=name;
},setRoot:function(bg){this.__fA=bg;
},useMarkup:function(ce){if(this.__fz){throw new Error("Could not overwrite existing element!");
}if(qx.core.Variant.isSet(co,cl)){var cf=document.createElement(cn);
}else{var cf=qx.html.Element.__fW;

if(!cf){cf=qx.html.Element.__fW=document.createElement(cn);
}}cf.innerHTML=ce;
this.__fz=cf.firstChild;
this.__fz.$$element=this.$$hash;
this._copyData(true);
return this.__fz;
},useElement:function(bJ){if(this.__fz){throw new Error("Could not overwrite existing element!");
}this.__fz=bJ;
this.__fz.$$element=this.$$hash;
this._copyData(true);
},isFocusable:function(){var K=this.getAttribute(cu);

if(K>=1){return true;
}var J=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(K>=0&&J[this.__fs]){return true;
}return false;
},setSelectable:function(bR){this.setAttribute(cx,bR?cz:cv);
if(qx.core.Variant.isSet(co,cr)){this.setStyle(cD,bR?cq:ck);
}else if(qx.core.Variant.isSet(co,cH)){this.setStyle(ct,bR?ci:cC);
}},isNativelyFocusable:function(){return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this.__fs];
},include:function(){if(this.__fB){return;
}delete this.__fB;

if(this.__fQ){this.__fQ._scheduleChildrenUpdate();
}return this;
},exclude:function(){if(!this.__fB){return;
}this.__fB=false;

if(this.__fQ){this.__fQ._scheduleChildrenUpdate();
}return this;
},isIncluded:function(){return this.__fB===true;
},show:function(){if(this.__fC){return;
}
if(this.__fz){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(cp);
}if(this.__fQ){this.__fQ._scheduleChildrenUpdate();
}delete this.__fC;
},hide:function(){if(!this.__fC){return;
}
if(this.__fz){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(cp);
}this.__fC=false;
},isVisible:function(){return this.__fC===true;
},scrollChildIntoViewX:function(s,t,u){var v=this.__fz;
var w=s.getDomElement();

if(u!==false&&v&&v.offsetWidth&&w&&w.offsetWidth){qx.bom.element.Scroll.intoViewX(w,v,t);
}else{this.__fD={element:s,align:t};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(cp);
}delete this.__fF;
},scrollChildIntoViewY:function(bb,bc,bd){var be=this.__fz;
var bf=bb.getDomElement();

if(bd!==false&&be&&be.offsetWidth&&bf&&bf.offsetWidth){qx.bom.element.Scroll.intoViewY(bf,be,bc);
}else{this.__fE={element:bb,align:bc};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(cp);
}delete this.__fG;
},scrollToX:function(x,dX){var dY=this.__fz;

if(dX!==true&&dY&&dY.offsetWidth){dY.scrollLeft=x;
}else{this.__fF=x;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(cp);
}delete this.__fD;
},getScrollX:function(){var W=this.__fz;

if(W){return W.scrollLeft;
}return this.__fF||0;
},scrollToY:function(y,dV){var dW=this.__fz;

if(dV!==true&&dW&&dW.offsetWidth){dW.scrollTop=y;
}else{this.__fG=y;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(cp);
}delete this.__fE;
},getScrollY:function(){var a=this.__fz;

if(a){return a.scrollTop;
}return this.__fG||0;
},disableScrolling:function(){this.enableScrolling();
this.scrollToX(0);
this.scrollToY(0);
this.addListener(cj,this.__fY,this);
},enableScrolling:function(){this.removeListener(cj,this.__fY,this);
},__fX:null,__fY:function(e){if(!this.__fX){this.__fX=true;
this.__fz.scrollTop=0;
this.__fz.scrollLeft=0;
delete this.__fX;
}},getTextSelection:function(){var j=this.__fz;

if(j){return qx.bom.Selection.get(j);
}return null;
},getTextSelectionLength:function(){var bQ=this.__fz;

if(bQ){return qx.bom.Selection.getLength(bQ);
}return null;
},getTextSelectionStart:function(){var dN=this.__fz;

if(dN){return qx.bom.Selection.getStart(dN);
}return null;
},getTextSelectionEnd:function(){var L=this.__fz;

if(L){return qx.bom.Selection.getEnd(L);
}return null;
},setTextSelection:function(dC,dD){var dE=this.__fz;

if(dE){qx.bom.Selection.set(dE,dC,dD);
return;
}qx.html.Element.__ft[this.toHashCode()]={element:this,start:dC,end:dD};
qx.html.Element._scheduleFlush(cp);
},clearTextSelection:function(){var g=this.__fz;

if(g){qx.bom.Selection.clear(g);
}delete qx.html.Element.__ft[this.toHashCode()];
},__ga:function(k,m){var n=qx.html.Element._actions;
n.push({type:k,element:this,args:m||[]});
qx.html.Element._scheduleFlush(cp);
},focus:function(){this.__ga(cI);
},blur:function(){this.__ga(cG);
},activate:function(){this.__ga(cs);
},deactivate:function(){this.__ga(cF);
},capture:function(S){this.__ga(cE,[S!==false]);
},releaseCapture:function(){this.__ga(cA);
},setStyle:function(cS,cT,cU){if(!this.__fK){this.__fK={};
}
if(this.__fK[cS]==cT){return;
}
if(cT==null){delete this.__fK[cS];
}else{this.__fK[cS]=cT;
}if(this.__fz){if(cU){qx.bom.element.Style.set(this.__fz,cS,cT);
return this;
}if(!this.__fH){this.__fH={};
}this.__fH[cS]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cp);
}return this;
},setStyles:function(dO,dP){var dQ=qx.bom.element.Style;

if(!this.__fK){this.__fK={};
}
if(this.__fz){if(!this.__fH){this.__fH={};
}
for(var dS in dO){var dR=dO[dS];

if(this.__fK[dS]==dR){continue;
}
if(dR==null){delete this.__fK[dS];
}else{this.__fK[dS]=dR;
}if(dP){dQ.set(this.__fz,dS,dR);
continue;
}this.__fH[dS]=true;
}qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cp);
}else{for(var dS in dO){var dR=dO[dS];

if(this.__fK[dS]==dR){continue;
}
if(dR==null){delete this.__fK[dS];
}else{this.__fK[dS]=dR;
}}}return this;
},removeStyle:function(dF,dG){this.setStyle(dF,null,dG);
},getStyle:function(bS){return this.__fK?this.__fK[bS]:null;
},getAllStyles:function(){return this.__fK||null;
},setAttribute:function(T,U,V){if(!this.__fL){this.__fL={};
}
if(this.__fL[T]==U){return;
}
if(U==null){delete this.__fL[T];
}else{this.__fL[T]=U;
}if(this.__fz){if(V){qx.bom.element.Attribute.set(this.__fz,T,U);
return this;
}if(!this.__fI){this.__fI={};
}this.__fI[T]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cp);
}return this;
},setAttributes:function(X,Y){for(var ba in X){this.setAttribute(ba,X[ba],Y);
}return this;
},removeAttribute:function(Q,R){this.setAttribute(Q,null,R);
},getAttribute:function(bV){return this.__fL?this.__fL[bV]:null;
},_applyProperty:function(name,p){},_setProperty:function(M,N,O){if(!this.__fM){this.__fM={};
}
if(this.__fM[M]==N){return;
}
if(N==null){delete this.__fM[M];
}else{this.__fM[M]=N;
}if(this.__fz){if(O){this._applyProperty(M,N);
return this;
}if(!this.__fJ){this.__fJ={};
}this.__fJ[M]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cp);
}return this;
},_removeProperty:function(dL,dM){this._setProperty(dL,null,dM);
},_getProperty:function(c){var d=this.__fM;

if(!d){return null;
}var f=d[c];
return f==null?null:f;
},addListener:function(bK,bL,self,bM){var bN;

if(this.$$disposed){return null;
}{};

if(this.__fz){return qx.event.Registration.addListener(this.__fz,bK,bL,self,bM);
}
if(!this.__fN){this.__fN={};
}
if(bM==null){bM=false;
}var bO=qx.event.Manager.getNextUniqueId();
var bP=bK+(bM?cJ:cw)+bO;
this.__fN[bP]={type:bK,listener:bL,self:self,capture:bM,unique:bO};
return bP;
},removeListener:function(dr,ds,self,dt){var du;

if(this.$$disposed){return null;
}{};

if(this.__fz){qx.event.Registration.removeListener(this.__fz,dr,ds,self,dt);
}else{var dw=this.__fN;
var dv;

if(dt==null){dt=false;
}
for(var dx in dw){dv=dw[dx];
if(dv.listener===ds&&dv.self===self&&dv.capture===dt&&dv.type===dr){delete dw[dx];
break;
}}}return this;
},removeListenerById:function(h){if(this.$$disposed){return null;
}
if(this.__fz){qx.event.Registration.removeListenerById(this.__fz,h);
}else{delete this.__fN[h];
}return this;
},hasListener:function(bD,bE){if(this.$$disposed){return false;
}
if(this.__fz){return qx.event.Registration.hasListener(this.__fz,bD,bE);
}var bG=this.__fN;
var bF;

if(bE==null){bE=false;
}
for(var bH in bG){bF=bG[bH];
if(bF.capture===bE&&bF.type===bD){return true;
}}return false;
}},defer:function(dH){dH.__gb=new qx.util.DeferredCall(dH.flush,dH);
},destruct:function(){var b=this.__fz;

if(b){qx.event.Registration.getManager(b).removeAllListeners(b);
b.$$element=cm;
}
if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__fQ;

if(parent&&!parent.$$disposed){parent.remove(this);
}}this._disposeArray(cg);
this.__fL=this.__fK=this.__fN=this.__fM=this.__fI=this.__fH=this.__fJ=this.__fz=this.__fQ=this.__fD=this.__fE=null;
}});
})();
(function(){var b="qx.ui.core.queue.Manager",a="useraction";
qx.Class.define(b,{statics:{__gc:false,__gd:{},__ge:0,MAX_RETRIES:10,scheduleFlush:function(g){var self=qx.ui.core.queue.Manager;
self.__gd[g]=true;

if(!self.__gc){self.__gh.schedule();
self.__gc=true;
}},flush:function(){var self=qx.ui.core.queue.Manager;
if(self.__gf){return;
}self.__gf=true;
self.__gh.cancel();
var f=self.__gd;
self.__gg(function(){while(f.visibility||f.widget||f.appearance||f.layout||f.element){if(f.widget){delete f.widget;
qx.ui.core.queue.Widget.flush();
}
if(f.visibility){delete f.visibility;
qx.ui.core.queue.Visibility.flush();
}
if(f.appearance){delete f.appearance;
qx.ui.core.queue.Appearance.flush();
}if(f.widget||f.visibility||f.appearance){continue;
}
if(f.layout){delete f.layout;
qx.ui.core.queue.Layout.flush();
}if(f.widget||f.visibility||f.appearance||f.layout){continue;
}
if(f.element){delete f.element;
qx.html.Element.flush();
}}},function(){self.__gc=false;
});
self.__gg(function(){if(f.dispose){delete f.dispose;
qx.ui.core.queue.Dispose.flush();
}},function(){self.__gf=false;
});
self.__ge=0;
},__gg:function(c,d){var self=qx.ui.core.queue.Manager;

try{c();
}catch(e){{};
self.__gc=false;
self.__gf=false;
self.__ge+=1;

if(self.__ge<=self.MAX_RETRIES){self.scheduleFlush();
}else{throw new Error("Fatal Error: Flush terminated "+(self.__ge-1)+" times in a row"+" due to exceptions in user code. The application has to be reloaded!");
}throw e;
}finally{d();
}}},defer:function(h){h.__gh=new qx.util.DeferredCall(h.flush);
qx.html.Element._scheduleFlush=h.scheduleFlush;
qx.event.Registration.addListener(window,a,h.flush);
}});
})();
(function(){var b="abstract",a="qx.event.dispatch.AbstractBubbling";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:b,construct:function(x){this._manager=x;
},members:{_getParent:function(u){throw new Error("Missing implementation");
},canDispatchEvent:function(v,event,w){return event.getBubbles();
},dispatchEvent:function(c,event,d){var parent=c;
var o=this._manager;
var l,s;
var h;
var n,q;
var p;
var r=[];
l=o.getListeners(c,d,true);
s=o.getListeners(c,d,false);

if(l){r.push(l);
}
if(s){r.push(s);
}var parent=this._getParent(c);
var f=[];
var e=[];
var g=[];
var m=[];
while(parent!=null){l=o.getListeners(parent,d,true);

if(l){g.push(l);
m.push(parent);
}s=o.getListeners(parent,d,false);

if(s){f.push(s);
e.push(parent);
}parent=this._getParent(parent);
}event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);

for(var i=g.length-1;i>=0;i--){p=m[i];
event.setCurrentTarget(p);
h=g[i];

for(var j=0,k=h.length;j<k;j++){n=h[j];
q=n.context||p;
n.handler.call(q,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.AT_TARGET);
event.setCurrentTarget(c);

for(var i=0,t=r.length;i<t;i++){h=r[i];

for(var j=0,k=h.length;j<k;j++){n=h[j];
q=n.context||c;
n.handler.call(q,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);

for(var i=0,t=f.length;i<t;i++){p=e[i];
event.setCurrentTarget(p);
h=f[i];

for(var j=0,k=h.length;j<k;j++){n=h[j];
q=n.context||p;
n.handler.call(q,event);
}
if(event.getPropagationStopped()){return;
}}}}});
})();
(function(){var a="qx.event.dispatch.DomBubbling";
qx.Class.define(a,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(c){return c.parentNode;
},canDispatchEvent:function(d,event,e){return d.nodeType!==undefined&&event.getBubbles();
}},defer:function(b){qx.event.Registration.addDispatcher(b);
}});
})();
(function(){var D="keydown",C="qx.client",B="keypress",A="NumLock",z="keyup",y="Enter",x="0",w="9",v="-",u="PageUp",bK="+",bJ="PrintScreen",bI="gecko",bH="A",bG="Z",bF="Left",bE="F5",bD="Down",bC="Up",bB="F11",K="F6",L="useraction",I="F3",J="keyinput",G="Insert",H="F8",E="End",F="/",S="Delete",T="*",bg="F1",bc="F4",bo="Home",bj="F2",bx="F12",bt="PageDown",X="F7",bA="F9",bz="F10",by="Right",W="text",ba="Escape",bb="webkit",be="5",bh="3",bk="Meta",bq="7",bv="CapsLock",M="input",N="Control",Y="Space",bn="Tab",bm="Shift",bl="Pause",bs="Unidentified",br="qx.event.handler.Keyboard",bi="mshtml",bp="mshtml|webkit",r="6",bu="off",O="Apps",P="4",bd="Alt",s="2",t="Scroll",V="1",Q="8",R="Win",U="autoComplete",bf=",",bw="Backspace";
qx.Class.define(br,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(bR){arguments.callee.base.call(this);
this.__gi=bR;
this.__gj=bR.getWindow();
if(qx.core.Variant.isSet(C,bI)){this.__gk=this.__gj;
}else{this.__gk=this.__gj.document.documentElement;
}this.__gl={};
this._initKeyObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(q){if(this._identifierToKeyCodeMap[q]){return true;
}
if(q.length!=1){return false;
}
if(q>=x&&q<=w){return true;
}
if(q>=bH&&q<=bG){return true;
}
switch(q){case bK:case v:case T:case F:return true;
default:return false;
}}},members:{__gm:null,__gi:null,__gj:null,__gk:null,__gl:null,__gn:null,__go:null,__gp:null,canHandleEvent:function(bL,bM){},registerEvent:function(bN,bO,bP){},unregisterEvent:function(bT,bU,bV){},_fireInputEvent:function(cf,cg){var ch=this.__gq();
if(ch&&ch.offsetWidth!=0){var event=qx.event.Registration.createEvent(J,qx.event.type.KeyInput,[cf,ch,cg]);
this.__gi.dispatchEvent(ch,event);
}if(this.__gj){qx.event.Registration.fireEvent(this.__gj,L,qx.event.type.Data,[J]);
}},_fireSequenceEvent:function(h,i,j){var k=this.__gq();
var l=h.keyCode;
var event=qx.event.Registration.createEvent(i,qx.event.type.KeySequence,[h,k,j]);
this.__gi.dispatchEvent(k,event);
if(qx.core.Variant.isSet(C,bp)){if(i==D&&event.getDefaultPrevented()){if(!this._isNonPrintableKeyCode(l)&&!this._emulateKeyPress[l]){this._fireSequenceEvent(h,B,j);
}}}if(this.__gj){qx.event.Registration.fireEvent(this.__gj,L,qx.event.type.Data,[i]);
}},__gq:function(){var n=this.__gi.getHandler(qx.event.handler.Focus);
var o=n.getActive();
if(!o||o.offsetWidth==0){o=n.getFocus();
}if(!o||o.offsetWidth==0){o=this.__gi.getWindow().document.body;
}return o;
},_initKeyObserver:function(){this.__gm=qx.lang.Function.listener(this.__gr,this);
this.__gp=qx.lang.Function.listener(this.__gt,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__gk,z,this.__gm);
Event.addNativeListener(this.__gk,D,this.__gm);
Event.addNativeListener(this.__gk,B,this.__gp);
},_stopKeyObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__gk,z,this.__gm);
Event.removeNativeListener(this.__gk,D,this.__gm);
Event.removeNativeListener(this.__gk,B,this.__gp);

for(var cG in (this.__go||{})){var cF=this.__go[cG];
Event.removeNativeListener(cF.target,B,cF.callback);
}delete (this.__go);
},__gr:qx.event.GlobalError.observeMethod(qx.core.Variant.select(C,{"mshtml":function(cB){cB=window.event||cB;
var cE=cB.keyCode;
var cC=0;
var cD=cB.type;
if(!(this.__gl[cE]==D&&cD==D)){this._idealKeyHandler(cE,cC,cD,cB);
}if(cD==D){if(this._isNonPrintableKeyCode(cE)||this._emulateKeyPress[cE]){this._idealKeyHandler(cE,cC,B,cB);
}}this.__gl[cE]=cD;
},"gecko":function(c){var g=this._keyCodeFix[c.keyCode]||c.keyCode;
var e=0;
var f=c.type;
if(qx.bom.client.Platform.WIN){var d=g?this._keyCodeToIdentifier(g):this._charCodeToIdentifier(e);

if(!(this.__gl[d]==D&&f==D)){this._idealKeyHandler(g,e,f,c);
}this.__gl[d]=f;
}else{this._idealKeyHandler(g,e,f,c);
}this.__gs(c.target,f,g);
},"webkit":function(bW){var ca=0;
var bX=0;
var bY=bW.type;
if(qx.bom.client.Engine.VERSION<525.13){if(bY==z||bY==D){ca=this._charCode2KeyCode[bW.charCode]||bW.keyCode;
}else{if(this._charCode2KeyCode[bW.charCode]){ca=this._charCode2KeyCode[bW.charCode];
}else{bX=bW.charCode;
}}this._idealKeyHandler(ca,bX,bY,bW);
}else{ca=bW.keyCode;
if(!(this.__gl[ca]==D&&bY==D)){this._idealKeyHandler(ca,bX,bY,bW);
}if(bY==D){if(this._isNonPrintableKeyCode(ca)||this._emulateKeyPress[ca]){this._idealKeyHandler(ca,bX,B,bW);
}}this.__gl[ca]=bY;
}},"opera":function(cs){this.__gn=cs.keyCode;
this._idealKeyHandler(cs.keyCode,0,cs.type,cs);
}})),__gs:qx.core.Variant.select(C,{"gecko":function(ct,cu,cv){if(cu===D&&(cv==33||cv==34||cv==38||cv==40)&&ct.type==W&&ct.tagName.toLowerCase()===M&&ct.getAttribute(U)!==bu){if(!this.__go){this.__go={};
}var cx=qx.core.ObjectRegistry.toHashCode(ct);

if(this.__go[cx]){return;
}var self=this;
this.__go[cx]={target:ct,callback:function(cm){qx.bom.Event.stopPropagation(cm);
self.__gt(cm);
}};
var cw=qx.event.GlobalError.observeMethod(this.__go[cx].callback);
qx.bom.Event.addNativeListener(ct,B,cw);
}},"default":null}),__gt:qx.event.GlobalError.observeMethod(qx.core.Variant.select(C,{"mshtml":function(bQ){bQ=window.event||bQ;

if(this._charCode2KeyCode[bQ.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[bQ.keyCode],0,bQ.type,bQ);
}else{this._idealKeyHandler(0,bQ.keyCode,bQ.type,bQ);
}},"gecko":function(cb){var ce=this._keyCodeFix[cb.keyCode]||cb.keyCode;
var cc=cb.charCode;
var cd=cb.type;
this._idealKeyHandler(ce,cc,cd,cb);
},"webkit":function(cI){if(qx.bom.client.Engine.VERSION<525.13){var cL=0;
var cJ=0;
var cK=cI.type;

if(cK==z||cK==D){cL=this._charCode2KeyCode[cI.charCode]||cI.keyCode;
}else{if(this._charCode2KeyCode[cI.charCode]){cL=this._charCode2KeyCode[cI.charCode];
}else{cJ=cI.charCode;
}}this._idealKeyHandler(cL,cJ,cK,cI);
}else{if(this._charCode2KeyCode[cI.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[cI.keyCode],0,cI.type,cI);
}else{this._idealKeyHandler(0,cI.keyCode,cI.type,cI);
}}},"opera":function(cy){var cA=cy.keyCode;
var cz=cy.type;
if(cA!=this.__gn){this._idealKeyHandler(0,this.__gn,cz,cy);
}else{if(this._keyCodeToIdentifierMap[cy.keyCode]){this._idealKeyHandler(cy.keyCode,0,cy.type,cy);
}else{this._idealKeyHandler(0,cy.keyCode,cy.type,cy);
}}}})),_idealKeyHandler:function(cn,co,cp,cq){var cr;
if(cn||(!cn&&!co)){cr=this._keyCodeToIdentifier(cn);
this._fireSequenceEvent(cq,cp,cr);
}else{cr=this._charCodeToIdentifier(co);
this._fireSequenceEvent(cq,B,cr);
this._fireInputEvent(cq,co);
}},_specialCharCodeMap:{8:bw,9:bn,13:y,27:ba,32:Y},_emulateKeyPress:qx.core.Variant.select(C,{"mshtml":{8:true,9:true},"webkit":{8:true,9:true,27:true},"default":{}}),_keyCodeToIdentifierMap:{16:bm,17:N,18:bd,20:bv,224:bk,37:bF,38:bC,39:by,40:bD,33:u,34:bt,35:E,36:bo,45:G,46:S,112:bg,113:bj,114:I,115:bc,116:bE,117:K,118:X,119:H,120:bA,121:bz,122:bB,123:bx,144:A,44:bJ,145:t,19:bl,91:R,93:O},_numpadToCharCode:{96:x.charCodeAt(0),97:V.charCodeAt(0),98:s.charCodeAt(0),99:bh.charCodeAt(0),100:P.charCodeAt(0),101:be.charCodeAt(0),102:r.charCodeAt(0),103:bq.charCodeAt(0),104:Q.charCodeAt(0),105:w.charCodeAt(0),106:T.charCodeAt(0),107:bK.charCodeAt(0),109:v.charCodeAt(0),110:bf.charCodeAt(0),111:F.charCodeAt(0)},_charCodeA:bH.charCodeAt(0),_charCodeZ:bG.charCodeAt(0),_charCode0:x.charCodeAt(0),_charCode9:w.charCodeAt(0),_isNonPrintableKeyCode:function(cH){return this._keyCodeToIdentifierMap[cH]?true:false;
},_isIdentifiableKeyCode:function(p){if(p>=this._charCodeA&&p<=this._charCodeZ){return true;
}if(p>=this._charCode0&&p<=this._charCode9){return true;
}if(this._specialCharCodeMap[p]){return true;
}if(this._numpadToCharCode[p]){return true;
}if(this._isNonPrintableKeyCode(p)){return true;
}return false;
},_keyCodeToIdentifier:function(a){if(this._isIdentifiableKeyCode(a)){var b=this._numpadToCharCode[a];

if(b){return String.fromCharCode(b);
}return (this._keyCodeToIdentifierMap[a]||this._specialCharCodeMap[a]||String.fromCharCode(a));
}else{return bs;
}},_charCodeToIdentifier:function(m){return this._specialCharCodeMap[m]||String.fromCharCode(m).toUpperCase();
},_identifierToKeyCode:function(bS){return qx.event.handler.Keyboard._identifierToKeyCodeMap[bS]||bS.charCodeAt(0);
}},destruct:function(){this._stopKeyObserver();
this.__gn=this.__gi=this.__gj=this.__gk=this.__gl=null;
},defer:function(ci,cj,ck){qx.event.Registration.addHandler(ci);
if(!ci._identifierToKeyCodeMap){ci._identifierToKeyCodeMap={};

for(var cl in cj._keyCodeToIdentifierMap){ci._identifierToKeyCodeMap[cj._keyCodeToIdentifierMap[cl]]=parseInt(cl,10);
}
for(var cl in cj._specialCharCodeMap){ci._identifierToKeyCodeMap[cj._specialCharCodeMap[cl]]=parseInt(cl,10);
}}
if(qx.core.Variant.isSet(C,bi)){cj._charCode2KeyCode={13:13,27:27};
}else if(qx.core.Variant.isSet(C,bI)){cj._keyCodeFix={12:cj._identifierToKeyCode(A)};
}else if(qx.core.Variant.isSet(C,bb)){if(qx.bom.client.Engine.VERSION<525.13){cj._charCode2KeyCode={63289:cj._identifierToKeyCode(A),63276:cj._identifierToKeyCode(u),63277:cj._identifierToKeyCode(bt),63275:cj._identifierToKeyCode(E),63273:cj._identifierToKeyCode(bo),63234:cj._identifierToKeyCode(bF),63232:cj._identifierToKeyCode(bC),63235:cj._identifierToKeyCode(by),63233:cj._identifierToKeyCode(bD),63272:cj._identifierToKeyCode(S),63302:cj._identifierToKeyCode(G),63236:cj._identifierToKeyCode(bg),63237:cj._identifierToKeyCode(bj),63238:cj._identifierToKeyCode(I),63239:cj._identifierToKeyCode(bc),63240:cj._identifierToKeyCode(bE),63241:cj._identifierToKeyCode(K),63242:cj._identifierToKeyCode(X),63243:cj._identifierToKeyCode(H),63244:cj._identifierToKeyCode(bA),63245:cj._identifierToKeyCode(bz),63246:cj._identifierToKeyCode(bB),63247:cj._identifierToKeyCode(bx),63248:cj._identifierToKeyCode(bJ),3:cj._identifierToKeyCode(y),12:cj._identifierToKeyCode(A),13:cj._identifierToKeyCode(y)};
}else{cj._charCode2KeyCode={13:13,27:27};
}}}});
})();
(function(){var S="qx.client",R="mouseup",Q="click",P="mousedown",O="contextmenu",N="mousewheel",M="dblclick",L="mshtml",K="mouseover",J="mouseout",E="DOMMouseScroll",I="mousemove",H="on",D="mshtml|webkit|opera",C="useraction",G="gecko|webkit",F="qx.event.handler.Mouse";
qx.Class.define(F,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(x){arguments.callee.base.call(this);
this.__gu=x;
this.__gv=x.getWindow();
this.__gw=this.__gv.document;
this._initButtonObserver();
this._initMoveObserver();
this._initWheelObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__gx:null,__gy:null,__gz:null,__gA:null,__gB:null,__gu:null,__gv:null,__gw:null,canHandleEvent:function(s,t){},registerEvent:qx.bom.client.System.IPHONE?
function(T,U,V){T[H+U]=qx.lang.Function.returnNull;
}:qx.lang.Function.returnNull,unregisterEvent:qx.bom.client.System.IPHONE?
function(y,z,A){y[H+z]=undefined;
}:qx.lang.Function.returnNull,__gC:function(d,e,f){if(!f){f=d.target||d.srcElement;
}if(f&&f.nodeType){qx.event.Registration.fireEvent(f,e||d.type,e==N?qx.event.type.MouseWheel:qx.event.type.Mouse,[d,f,null,true,true]);
}qx.event.Registration.fireEvent(this.__gv,C,qx.event.type.Data,[e||d.type]);
},_initButtonObserver:function(){this.__gx=qx.lang.Function.listener(this._onButtonEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__gw,P,this.__gx);
Event.addNativeListener(this.__gw,R,this.__gx);
Event.addNativeListener(this.__gw,Q,this.__gx);
Event.addNativeListener(this.__gw,M,this.__gx);
Event.addNativeListener(this.__gw,O,this.__gx);
},_initMoveObserver:function(){this.__gy=qx.lang.Function.listener(this._onMoveEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__gw,I,this.__gy);
Event.addNativeListener(this.__gw,K,this.__gy);
Event.addNativeListener(this.__gw,J,this.__gy);
},_initWheelObserver:function(){this.__gz=qx.lang.Function.listener(this._onWheelEvent,this);
var Event=qx.bom.Event;
var p=qx.core.Variant.isSet(S,D)?N:E;
var q=qx.core.Variant.isSet(S,L)?this.__gw:this.__gv;
Event.addNativeListener(q,p,this.__gz);
},_stopButtonObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__gw,P,this.__gx);
Event.removeNativeListener(this.__gw,R,this.__gx);
Event.removeNativeListener(this.__gw,Q,this.__gx);
Event.removeNativeListener(this.__gw,M,this.__gx);
Event.removeNativeListener(this.__gw,O,this.__gx);
},_stopMoveObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__gw,I,this.__gy);
Event.removeNativeListener(this.__gw,K,this.__gy);
Event.removeNativeListener(this.__gw,J,this.__gy);
},_stopWheelObserver:function(){var Event=qx.bom.Event;
var n=qx.core.Variant.isSet(S,D)?N:E;
var o=qx.core.Variant.isSet(S,L)?this.__gw:this.__gv;
Event.removeNativeListener(o,n,this.__gz);
},_onMoveEvent:qx.event.GlobalError.observeMethod(function(B){this.__gC(B);
}),_onButtonEvent:qx.event.GlobalError.observeMethod(function(g){var h=g.type;
var i=g.target||g.srcElement;
if(qx.core.Variant.isSet(S,G)){if(i&&i.nodeType==3){i=i.parentNode;
}}
if(this.__gD){this.__gD(g,h,i);
}
if(this.__gF){this.__gF(g,h,i);
}this.__gC(g,h,i);

if(this.__gE){this.__gE(g,h,i);
}
if(this.__gG){this.__gG(g,h,i);
}this.__gA=h;
}),_onWheelEvent:qx.event.GlobalError.observeMethod(function(r){this.__gC(r,N);
}),__gD:qx.core.Variant.select(S,{"webkit":function(a,b,c){if(qx.bom.client.Engine.VERSION<530){if(b==O){this.__gC(a,R,c);
}}},"default":null}),__gE:qx.core.Variant.select(S,{"opera":function(X,Y,ba){if(Y==R&&X.button==2){this.__gC(X,O,ba);
}},"default":null}),__gF:qx.core.Variant.select(S,{"mshtml":function(u,v,w){if(v==R&&this.__gA==Q){this.__gC(u,P,w);
}else if(v==M){this.__gC(u,Q,w);
}},"default":null}),__gG:qx.core.Variant.select(S,{"mshtml":null,"default":function(j,k,l){switch(k){case P:this.__gB=l;
break;
case R:if(l!==this.__gB){var m=qx.dom.Hierarchy.getCommonParent(l,this.__gB);
this.__gC(j,Q,m);
}}}})},destruct:function(){this._stopButtonObserver();
this._stopMoveObserver();
this._stopWheelObserver();
this.__gu=this.__gv=this.__gw=this.__gB=null;
},defer:function(W){qx.event.Registration.addHandler(W);
}});
})();
(function(){var a="qx.event.handler.Capture";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(b,c){},registerEvent:function(d,e,f){},unregisterEvent:function(h,i,j){}},defer:function(g){qx.event.Registration.addHandler(g);
}});
})();
(function(){var q="alias",p="copy",o="blur",n="mouseout",m="keydown",l="Ctrl",k="Shift",j="mousemove",i="move",h="mouseover",G="Alt",F="keyup",E="mouseup",D="dragend",C="on",B="mousedown",A="qxDraggable",z="drag",y="drop",x="qxDroppable",v="qx.event.handler.DragDrop",w="droprequest",t="dragstart",u="dragchange",r="dragleave",s="dragover";
qx.Class.define(v,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(Q){arguments.callee.base.call(this);
this.__gH=Q;
this.__gI=Q.getWindow().document.documentElement;
this.__gH.addListener(this.__gI,B,this._onMouseDown,this);
this.__gU();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__gH:null,__gI:null,__gJ:null,__gK:null,__gL:null,__gM:null,__gN:null,__gO:null,__gP:null,__gQ:null,__gR:false,__gS:0,__gT:0,canHandleEvent:function(U,V){},registerEvent:function(J,K,L){},unregisterEvent:function(bj,bk,bl){},addType:function(ba){this.__gL[ba]=true;
},addAction:function(I){this.__gM[I]=true;
},supportsType:function(M){return !!this.__gL[M];
},supportsAction:function(bm){return !!this.__gM[bm];
},getData:function(W){if(!this.__hc||!this.__gJ){throw new Error("This method must not be used outside the drop event listener!");
}
if(!this.__gL[W]){throw new Error("Unsupported data type: "+W+"!");
}
if(!this.__gO[W]){this.__gP=W;
this.__gW(w,this.__gK,this.__gJ,false);
}
if(!this.__gO[W]){throw new Error("Please use a droprequest listener to the drag source to fill the manager with data!");
}return this.__gO[W]||null;
},getCurrentAction:function(){return this.__gQ;
},addData:function(c,d){this.__gO[c]=d;
},getCurrentType:function(){return this.__gP;
},__gU:function(){this.__gL={};
this.__gM={};
this.__gN={};
this.__gO={};
},__gV:function(){var P=this.__gM;
var N=this.__gN;
var O=null;

if(this.__hc){if(N.Shift&&N.Ctrl&&P.alias){O=q;
}else if(N.Shift&&N.Alt&&P.copy){O=p;
}else if(N.Shift&&P.move){O=i;
}else if(N.Alt&&P.alias){O=q;
}else if(N.Ctrl&&P.copy){O=p;
}else if(P.move){O=i;
}else if(P.copy){O=p;
}else if(P.alias){O=q;
}}
if(O!=this.__gQ){this.__gQ=O;
this.__gW(u,this.__gK,this.__gJ,false);
}},__gW:function(bc,bd,be,bf,bg){var bi=qx.event.Registration;
var bh=bi.createEvent(bc,qx.event.type.Drag,[bf,bg]);

if(bd!==be){bh.setRelatedTarget(be);
}return bi.dispatchEvent(bd,bh);
},__gX:function(X){while(X&&X.nodeType==1){if(X.getAttribute(A)==C){return X;
}X=X.parentNode;
}return null;
},__gY:function(T){while(T&&T.nodeType==1){if(T.getAttribute(x)==C){return T;
}T=T.parentNode;
}return null;
},__ha:function(){this.__gK=null;
this.__gH.removeListener(this.__gI,j,this._onMouseMove,this,true);
this.__gH.removeListener(this.__gI,E,this._onMouseUp,this,true);
qx.event.Registration.removeListener(window,o,this._onWindowBlur,this);
this.__gU();
},__hb:function(){if(this.__gR){this.__gH.removeListener(this.__gI,h,this._onMouseOver,this,true);
this.__gH.removeListener(this.__gI,n,this._onMouseOut,this,true);
this.__gH.removeListener(this.__gI,m,this._onKeyDown,this,true);
this.__gH.removeListener(this.__gI,F,this._onKeyUp,this,true);
this.__gW(D,this.__gK,this.__gJ,false);
this.__gR=false;
}this.__hc=false;
this.__gJ=null;
this.__ha();
},__hc:false,_onWindowBlur:function(e){this.__hb();
},_onKeyDown:function(e){var Y=e.getKeyIdentifier();

switch(Y){case G:case l:case k:if(!this.__gN[Y]){this.__gN[Y]=true;
this.__gV();
}}},_onKeyUp:function(e){var R=e.getKeyIdentifier();

switch(R){case G:case l:case k:if(this.__gN[R]){this.__gN[R]=false;
this.__gV();
}}},_onMouseDown:function(e){if(this.__gR){return;
}var S=this.__gX(e.getTarget());

if(S){this.__gS=e.getDocumentLeft();
this.__gT=e.getDocumentTop();
this.__gK=S;
this.__gH.addListener(this.__gI,j,this._onMouseMove,this,true);
this.__gH.addListener(this.__gI,E,this._onMouseUp,this,true);
qx.event.Registration.addListener(window,o,this._onWindowBlur,this);
}},_onMouseUp:function(e){if(this.__hc){this.__gW(y,this.__gJ,this.__gK,false,e);
}if(this.__gR){e.stopPropagation();
}this.__hb();
},_onMouseMove:function(e){if(this.__gR){if(!this.__gW(z,this.__gK,this.__gJ,true,e)){this.__hb();
}}else{if(Math.abs(e.getDocumentLeft()-this.__gS)>3||Math.abs(e.getDocumentTop()-this.__gT)>3){if(this.__gW(t,this.__gK,this.__gJ,true,e)){this.__gR=true;
this.__gH.addListener(this.__gI,h,this._onMouseOver,this,true);
this.__gH.addListener(this.__gI,n,this._onMouseOut,this,true);
this.__gH.addListener(this.__gI,m,this._onKeyDown,this,true);
this.__gH.addListener(this.__gI,F,this._onKeyUp,this,true);
var H=this.__gN;
H.Ctrl=e.isCtrlPressed();
H.Shift=e.isShiftPressed();
H.Alt=e.isAltPressed();
this.__gV();
}else{this.__gW(D,this.__gK,this.__gJ,false);
this.__ha();
}}}},_onMouseOver:function(e){var a=e.getTarget();
var b=this.__gY(a);

if(b&&b!=this.__gJ){this.__hc=this.__gW(s,b,this.__gK,true,e);
this.__gJ=b;
this.__gV();
}},_onMouseOut:function(e){var g=this.__gY(e.getTarget());
var f=this.__gY(e.getRelatedTarget());

if(g&&g!==f&&g==this.__gJ){this.__gW(r,this.__gJ,f,false,e);
this.__gJ=null;
this.__hc=false;
qx.event.Timer.once(this.__gV,this,0);
}}},destruct:function(){this.__gK=this.__gJ=this.__gH=this.__gI=this.__gL=this.__gM=this.__gN=this.__gO=null;
},defer:function(bb){qx.event.Registration.addHandler(bb);
}});
})();
(function(){var c="-",b="qx.event.handler.Element";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(l){arguments.callee.base.call(this);
this._manager=l;
this._registeredEvents={};
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,scroll:true,select:true,reset:true,submit:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(j,k){},registerEvent:function(d,e,f){var i=qx.core.ObjectRegistry.toHashCode(d);
var g=i+c+e;
var h=qx.lang.Function.listener(this._onNative,this,g);
qx.bom.Event.addNativeListener(d,e,h);
this._registeredEvents[g]={element:d,type:e,listener:h};
},unregisterEvent:function(t,u,v){var y=this._registeredEvents;

if(!y){return;
}var z=qx.core.ObjectRegistry.toHashCode(t);
var w=z+c+u;
var x=this._registeredEvents[w];
qx.bom.Event.removeNativeListener(t,u,x.listener);
delete this._registeredEvents[w];
},_onNative:qx.event.GlobalError.observeMethod(function(p,q){var s=this._registeredEvents;

if(!s){return;
}var r=s[q];
qx.event.Registration.fireNonBubblingEvent(r.element,r.type,qx.event.type.Native,[p]);
})},destruct:function(){var m;
var n=this._registeredEvents;

for(var o in n){m=n[o];
qx.bom.Event.removeNativeListener(m.element,m.type,m.listener);
}this._manager=this._registeredEvents=null;
},defer:function(a){qx.event.Registration.addHandler(a);
}});
})();
(function(){var c="qx.event.handler.Appear",b="disappear",a="appear";
qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(i){arguments.callee.base.call(this);
this.__hd=i;
this.__he={};
qx.event.handler.Appear.__hf[this.$$hash]=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__hf:{},refresh:function(){var w=this.__hf;

for(var x in w){w[x].refresh();
}}},members:{__hd:null,__he:null,canHandleEvent:function(u,v){},registerEvent:function(p,q,r){var s=qx.core.ObjectRegistry.toHashCode(p)+q;
var t=this.__he;

if(t&&!t[s]){t[s]=p;
p.$$displayed=p.offsetWidth>0;
}},unregisterEvent:function(d,e,f){var g=qx.core.ObjectRegistry.toHashCode(d)+e;
var h=this.__he;

if(!h){return;
}
if(h[g]){delete h[g];
}},refresh:function(){var m=this.__he;
var n;

for(var l in m){n=m[l];
var j=n.offsetWidth>0;

if((!!n.$$displayed)!==j){n.$$displayed=j;
var k=qx.event.Registration.createEvent(j?a:b);
this.__hd.dispatchEvent(n,k);
}}}},destruct:function(){this.__hd=this.__he=null;
delete qx.event.handler.Appear.__hf[this.$$hash];
},defer:function(o){qx.event.Registration.addHandler(o);
}});
})();
(function(){var n="mshtml",m="",k="qx.client",h=">",g="<",f=" ",e="='",d="qx.bom.Element",c="div",b="' ",a="></";
qx.Class.define(d,{statics:{__hg:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},create:function(name,R,S){if(!S){S=window;
}
if(!name){throw new Error("The tag name is missing!");
}var U=this.__hg;
var T=m;

for(var W in R){if(U[W]){T+=W+e+R[W]+b;
}}var X;
if(T!=m){if(qx.bom.client.Engine.MSHTML){X=S.document.createElement(g+name+f+T+h);
}else{var V=S.document.createElement(c);
V.innerHTML=g+name+f+T+a+name+h;
X=V.firstChild;
}}else{X=S.document.createElement(name);
}
for(var W in R){if(!U[W]){qx.bom.element.Attribute.set(X,W,R[W]);
}}return X;
},empty:function(M){return M.innerHTML=m;
},addListener:function(Y,ba,bb,self,bc){return qx.event.Registration.addListener(Y,ba,bb,self,bc);
},removeListener:function(v,w,x,self,y){return qx.event.Registration.removeListener(v,w,x,self,y);
},removeListenerById:function(o,p){return qx.event.Registration.removeListenerById(o,p);
},hasListener:function(s,t,u){return qx.event.Registration.hasListener(s,t,u);
},focus:function(N){qx.event.Registration.getManager(N).getHandler(qx.event.handler.Focus).focus(N);
},blur:function(O){qx.event.Registration.getManager(O).getHandler(qx.event.handler.Focus).blur(O);
},activate:function(r){qx.event.Registration.getManager(r).getHandler(qx.event.handler.Focus).activate(r);
},deactivate:function(z){qx.event.Registration.getManager(z).getHandler(qx.event.handler.Focus).deactivate(z);
},capture:function(P,Q){qx.event.Registration.getManager(P).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(P,Q);
},releaseCapture:function(q){qx.event.Registration.getManager(q).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(q);
},clone:function(A,B){var E;

if(B||(qx.core.Variant.isSet(k,n)&&!qx.xml.Document.isXmlDocument(A))){var I=qx.event.Registration.getManager(A);
var C=qx.dom.Hierarchy.getDescendants(A);
C.push(A);
}if(qx.core.Variant.isSet(k,n)){for(var i=0,l=C.length;i<l;i++){I.toggleAttachedEvents(C[i],false);
}}var E=A.cloneNode(true);
if(qx.core.Variant.isSet(k,n)){for(var i=0,l=C.length;i<l;i++){I.toggleAttachedEvents(C[i],true);
}}if(B===true){var L=qx.dom.Hierarchy.getDescendants(E);
L.push(E);
var D,G,K,F;

for(var i=0,J=C.length;i<J;i++){K=C[i];
D=I.serializeListeners(K);

if(D.length>0){G=L[i];

for(var j=0,H=D.length;j<H;j++){F=D[j];
I.addListener(G,F.type,F.handler,F.self,F.capture);
}}}}return E;
}}});
})();
(function(){var a="qx.event.type.Dom";
qx.Class.define(a,{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{_cloneNativeEvent:function(b,c){var c=arguments.callee.base.call(this,b,c);
c.shiftKey=b.shiftKey;
c.ctrlKey=b.ctrlKey;
c.altKey=b.altKey;
c.metaKey=b.metaKey;
return c;
},getModifiers:function(){var e=0;
var d=this._native;

if(d.shiftKey){e|=qx.event.type.Dom.SHIFT_MASK;
}
if(d.ctrlKey){e|=qx.event.type.Dom.CTRL_MASK;
}
if(d.altKey){e|=qx.event.type.Dom.ALT_MASK;
}
if(d.metaKey){e|=qx.event.type.Dom.META_MASK;
}return e;
},isCtrlPressed:function(){return this._native.ctrlKey;
},isShiftPressed:function(){return this._native.shiftKey;
},isAltPressed:function(){return this._native.altKey;
},isMetaPressed:function(){return this._native.metaKey;
},isCtrlOrCommandPressed:function(){if(qx.bom.client.Platform.MAC){return this._native.metaKey;
}else{return this._native.ctrlKey;
}}}});
})();
(function(){var a="qx.event.type.KeyInput";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(b,c,d){arguments.callee.base.call(this,b,c,null,true,true);
this._charCode=d;
return this;
},clone:function(e){var f=arguments.callee.base.call(this,e);
f._charCode=this._charCode;
return f;
},getCharCode:function(){return this._charCode;
},getChar:function(){return String.fromCharCode(this._charCode);
}}});
})();
(function(){var a="qx.event.type.KeySequence";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(b,c,d){arguments.callee.base.call(this,b,c,null,true,true);
this._identifier=d;
return this;
},clone:function(e){var f=arguments.callee.base.call(this,e);
f._identifier=this._identifier;
return f;
},getKeyIdentifier:function(){return this._identifier;
}}});
})();
(function(){var bn="qx.client",bm="blur",bl="focus",bk="mousedown",bj="on",bi="mouseup",bh="DOMFocusOut",bg="DOMFocusIn",bf="selectstart",be="onmousedown",bG="onfocusout",bF="onfocusin",bE="onmouseup",bD="onselectstart",bC="draggesture",bB="qx.event.handler.Focus",bA="_applyFocus",bz="deactivate",by="textarea",bx="_applyActive",bu="input",bv="focusin",bs="qxSelectable",bt="tabIndex",bq="off",br="activate",bo="focusout",bp="qxKeepFocus",bw="qxKeepActive";
qx.Class.define(bB,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(bH){arguments.callee.base.call(this);
this._manager=bH;
this._window=bH.getWindow();
this._document=this._window.document;
this._root=this._document.documentElement;
this._body=this._document.body;
this._initObserver();
},properties:{active:{apply:bx,nullable:true},focus:{apply:bA,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Variant.select("qx.client",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__hh:null,__hi:null,__hj:null,__hk:null,__hl:null,__hm:null,__hn:null,__ho:null,__hp:null,__hq:null,canHandleEvent:function(Y,ba){},registerEvent:function(v,w,x){},unregisterEvent:function(C,D,E){},focus:function(n){try{n.focus();
}catch(r){}this.setFocus(n);
this.setActive(n);
},activate:function(z){this.setActive(z);
},blur:function(b){try{b.blur();
}catch(y){}
if(this.getActive()===b){this.resetActive();
}
if(this.getFocus()===b){this.resetFocus();
}},deactivate:function(F){if(this.getActive()===F){this.resetActive();
}},tryActivate:function(bI){var bJ=this.__hF(bI);

if(bJ){this.setActive(bJ);
}},__hr:function(N,O,P,Q){var S=qx.event.Registration;
var R=S.createEvent(P,qx.event.type.Focus,[N,O,Q]);
S.dispatchEvent(N,R);
},_windowFocused:true,__hs:function(){if(this._windowFocused){this._windowFocused=false;
this.__hr(this._window,null,bm,false);
}},__ht:function(){if(!this._windowFocused){this._windowFocused=true;
this.__hr(this._window,null,bl,false);
}},_initObserver:qx.core.Variant.select(bn,{"gecko":function(){this.__hh=qx.lang.Function.listener(this.__hz,this);
this.__hi=qx.lang.Function.listener(this.__hA,this);
this.__hj=qx.lang.Function.listener(this.__hy,this);
this.__hk=qx.lang.Function.listener(this.__hx,this);
this.__hl=qx.lang.Function.listener(this.__hu,this);
this._document.addEventListener(bk,this.__hh,true);
this._document.addEventListener(bi,this.__hi,true);
this._window.addEventListener(bl,this.__hj,true);
this._window.addEventListener(bm,this.__hk,true);
this._window.addEventListener(bC,this.__hl,true);
},"mshtml":function(){this.__hh=qx.lang.Function.listener(this.__hz,this);
this.__hi=qx.lang.Function.listener(this.__hA,this);
this.__hn=qx.lang.Function.listener(this.__hv,this);
this.__ho=qx.lang.Function.listener(this.__hw,this);
this.__hm=qx.lang.Function.listener(this.__hC,this);
this._document.attachEvent(be,this.__hh);
this._document.attachEvent(bE,this.__hi);
this._document.attachEvent(bF,this.__hn);
this._document.attachEvent(bG,this.__ho);
this._document.attachEvent(bD,this.__hm);
},"webkit":function(){this.__hh=qx.lang.Function.listener(this.__hz,this);
this.__hi=qx.lang.Function.listener(this.__hA,this);
this.__ho=qx.lang.Function.listener(this.__hw,this);
this.__hj=qx.lang.Function.listener(this.__hy,this);
this.__hk=qx.lang.Function.listener(this.__hx,this);
this.__hm=qx.lang.Function.listener(this.__hC,this);
this._document.addEventListener(bk,this.__hh,true);
this._document.addEventListener(bi,this.__hi,true);
this._document.addEventListener(bf,this.__hm,false);
this._window.addEventListener(bh,this.__ho,true);
this._window.addEventListener(bl,this.__hj,true);
this._window.addEventListener(bm,this.__hk,true);
},"opera":function(){this.__hh=qx.lang.Function.listener(this.__hz,this);
this.__hi=qx.lang.Function.listener(this.__hA,this);
this.__hn=qx.lang.Function.listener(this.__hv,this);
this.__ho=qx.lang.Function.listener(this.__hw,this);
this._document.addEventListener(bk,this.__hh,true);
this._document.addEventListener(bi,this.__hi,true);
this._window.addEventListener(bg,this.__hn,true);
this._window.addEventListener(bh,this.__ho,true);
}}),_stopObserver:qx.core.Variant.select(bn,{"gecko":function(){this._document.removeEventListener(bk,this.__hh,true);
this._document.removeEventListener(bi,this.__hi,true);
this._window.removeEventListener(bl,this.__hj,true);
this._window.removeEventListener(bm,this.__hk,true);
this._window.removeEventListener(bC,this.__hl,true);
},"mshtml":function(){qx.bom.Event.removeNativeListener(this._document,be,this.__hh);
qx.bom.Event.removeNativeListener(this._document,bE,this.__hi);
qx.bom.Event.removeNativeListener(this._document,bF,this.__hn);
qx.bom.Event.removeNativeListener(this._document,bG,this.__ho);
qx.bom.Event.removeNativeListener(this._document,bD,this.__hm);
},"webkit":function(){this._document.removeEventListener(bk,this.__hh,true);
this._document.removeEventListener(bf,this.__hm,false);
this._window.removeEventListener(bg,this.__hn,true);
this._window.removeEventListener(bh,this.__ho,true);
this._window.removeEventListener(bl,this.__hj,true);
this._window.removeEventListener(bm,this.__hk,true);
},"opera":function(){this._document.removeEventListener(bk,this.__hh,true);
this._window.removeEventListener(bg,this.__hn,true);
this._window.removeEventListener(bh,this.__ho,true);
this._window.removeEventListener(bl,this.__hj,true);
this._window.removeEventListener(bm,this.__hk,true);
}}),__hu:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bn,{"gecko":function(e){if(!this.__hG(e.target)){qx.bom.Event.preventDefault(e);
}},"default":null})),__hv:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bn,{"mshtml":function(e){this.__ht();
var X=e.srcElement;
var W=this.__hE(X);

if(W){this.setFocus(W);
}this.tryActivate(X);
},"opera":function(e){var t=e.target;

if(t==this._document||t==this._window){this.__ht();

if(this.__hp){this.setFocus(this.__hp);
delete this.__hp;
}
if(this.__hq){this.setActive(this.__hq);
delete this.__hq;
}}else{this.setFocus(t);
this.tryActivate(t);
if(!this.__hG(t)){t.selectionStart=0;
t.selectionEnd=0;
}}},"default":null})),__hw:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bn,{"mshtml":function(e){if(!e.toElement){this.__hs();
this.resetFocus();
this.resetActive();
}},"webkit":function(e){var u=e.target;

if(u===this.getFocus()){this.resetFocus();
}
if(u===this.getActive()){this.resetActive();
}},"opera":function(e){var s=e.target;

if(s==this._document){this.__hs();
this.__hp=this.getFocus();
this.__hq=this.getActive();
this.resetFocus();
this.resetActive();
}else{if(s===this.getFocus()){this.resetFocus();
}
if(s===this.getActive()){this.resetActive();
}}},"default":null})),__hx:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bn,{"gecko":function(e){if(e.target===this._window||e.target===this._document){this.__hs();
this.resetActive();
this.resetFocus();
}},"webkit":function(e){if(e.target===this._window||e.target===this._document){this.__hs();
this.__hp=this.getFocus();
this.__hq=this.getActive();
this.resetActive();
this.resetFocus();
}},"default":null})),__hy:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bn,{"gecko":function(e){var o=e.target;

if(o===this._window||o===this._document){this.__ht();
o=this._body;
}this.setFocus(o);
this.tryActivate(o);
},"webkit":function(e){var p=e.target;

if(p===this._window||p===this._document){this.__ht();

if(this.__hp){this.setFocus(this.__hp);
delete this.__hp;
}
if(this.__hq){this.setActive(this.__hq);
delete this.__hq;
}}else{this.setFocus(p);
this.tryActivate(p);
}},"default":null})),__hz:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bn,{"gecko":function(e){var T=this.__hE(e.target);

if(!T){qx.bom.Event.preventDefault(e);
}},"mshtml":function(e){var K=e.srcElement;
var J=this.__hE(K);

if(J){if(!this.__hG(K)){K.unselectable=bj;
try{document.selection.empty();
}catch(e){}try{J.focus();
}catch(e){}}}else{qx.bom.Event.preventDefault(e);
if(!this.__hG(K)){K.unselectable=bj;
}}},"webkit":function(e){var V=e.target;
var U=this.__hE(V);

if(U){this.setFocus(U);
}else{qx.bom.Event.preventDefault(e);
}},"opera":function(e){var i=e.target;
var g=this.__hE(i);

if(!this.__hG(i)){qx.bom.Event.preventDefault(e);
if(g){var h=this.getFocus();

if(h&&h.selectionEnd){h.selectionStart=0;
h.selectionEnd=0;
h.blur();
}if(g){this.setFocus(g);
}}}else if(g){this.setFocus(g);
}},"default":null})),__hA:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bn,{"mshtml":function(e){var a=e.srcElement;

if(a.unselectable){a.unselectable=bq;
}this.tryActivate(this.__hB(a));
},"gecko":function(e){var bd=e.target;

while(bd&&bd.offsetWidth===undefined){bd=bd.parentNode;
}
if(bd){this.tryActivate(bd);
}},"webkit|opera":function(e){this.tryActivate(this.__hB(e.target));
},"default":null})),__hB:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bn,{"mshtml|webkit":function(L){var M=this.getFocus();

if(M&&L!=M&&(M.nodeName.toLowerCase()===bu||M.nodeName.toLowerCase()===by)){L=M;
}return L;
},"default":function(q){return q;
}})),__hC:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bn,{"mshtml|webkit":function(e){var f=qx.bom.client.Engine.MSHTML?e.srcElement:e.target;

if(!this.__hG(f)){qx.bom.Event.preventDefault(e);
}},"default":null})),__hD:function(G){var H=qx.bom.element.Attribute.get(G,bt);

if(H>=1){return true;
}var I=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(H>=0&&I[G.tagName]){return true;
}return false;
},__hE:function(j){while(j&&j.nodeType===1){if(j.getAttribute(bp)==bj){return null;
}
if(this.__hD(j)){return j;
}j=j.parentNode;
}return this._body;
},__hF:function(bb){var bc=bb;

while(bb&&bb.nodeType===1){if(bb.getAttribute(bw)==bj){return null;
}bb=bb.parentNode;
}return bc;
},__hG:function(A){while(A&&A.nodeType===1){var B=A.getAttribute(bs);

if(B!=null){return B===bj;
}A=A.parentNode;
}return true;
},_applyActive:function(bK,bL){if(bL){this.__hr(bL,bK,bz,true);
}
if(bK){this.__hr(bK,bL,br,true);
}},_applyFocus:function(c,d){if(d){this.__hr(d,c,bo,true);
}
if(c){this.__hr(c,d,bv,true);
}if(d){this.__hr(d,c,bm,false);
}
if(c){this.__hr(c,d,bl,false);
}}},destruct:function(){this._stopObserver();
this._manager=this._window=this._document=this._root=this._body=this.__hH=null;
},defer:function(k){qx.event.Registration.addHandler(k);
var l=k.FOCUSABLE_ELEMENTS;

for(var m in l){l[m.toUpperCase()]=1;
}}});
})();
(function(){var a="qx.event.type.Focus";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d){arguments.callee.base.call(this,d,false);
this._target=b;
this._relatedTarget=c;
return this;
}}});
})();
(function(){var j="",i="qx.client",h="readOnly",g="accessKey",f="qx.bom.element.Attribute",e="rowSpan",d="vAlign",c="className",b="textContent",a="'",x="htmlFor",w="longDesc",v="cellSpacing",u="frameBorder",t="='",s="useMap",r="innerText",q="innerHTML",p="tabIndex",o="dateTime",m="maxLength",n="mshtml",k="cellPadding",l="colSpan";
qx.Class.define(f,{statics:{__hI:{names:{"class":c,"for":x,html:q,text:qx.core.Variant.isSet(i,n)?r:b,colspan:l,rowspan:e,valign:d,datetime:o,accesskey:g,tabindex:p,maxlength:m,readonly:h,longdesc:w,cellpadding:k,cellspacing:v,frameborder:u,usemap:s},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readonly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:j,maxLength:10000000,className:j,innerHTML:j,innerText:j,textContent:j,htmlFor:j,tabIndex:0},original:{href:1,src:1,type:1}},compile:function(y){var z=[];
var B=this.__hI.runtime;

for(var A in y){if(!B[A]){z.push(A,t,y[A],a);
}}return z.join(j);
},get:qx.core.Variant.select(i,{"mshtml":function(C,name){var E=this.__hI;
var D;
name=E.names[name]||name;
if(E.original[name]){D=C.getAttribute(name,2);
}else if(E.property[name]){if(E.propertyDefault[name]&&D==E.propertyDefault[name]){return null;
}D=C[name];
}else{D=C.getAttribute(name);
}if(E.bools[name]){return !!D;
}return D;
},"default":function(I,name){var K=this.__hI;
var J;
name=K.names[name]||name;
if(K.property[name]){if(K.propertyDefault[name]&&J==K.propertyDefault[name]){return null;
}J=I[name];

if(J==null){J=I.getAttribute(name);
}}else{J=I.getAttribute(name);
}if(K.bools[name]){return !!J;
}return J;
}}),set:function(F,name,G){var H=this.__hI;
name=H.names[name]||name;
if(H.bools[name]){G=!!G;
}if(H.property[name]){if(G==null){G=H.propertyDefault[name];

if(G===undefined){G=null;
}}F[name]=G;
}else{if(G===true){F.setAttribute(name,name);
}else if(G===false||G===null){F.removeAttribute(name);
}else{F.setAttribute(name,G);
}}},reset:function(L,name){this.set(L,name,null);
}}});
})();
(function(){var i="left",h="right",g="middle",f="qx.client",e="dblclick",d="click",c="none",b="contextmenu",a="qx.event.type.Mouse";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(n,o,p,q,r){arguments.callee.base.call(this,n,o,p,q,r);

if(!p){this._relatedTarget=qx.bom.Event.getRelatedTarget(n);
}return this;
},_cloneNativeEvent:function(l,m){var m=arguments.callee.base.call(this,l,m);
m.button=l.button;
m.clientX=l.clientX;
m.clientY=l.clientY;
m.pageX=l.pageX;
m.pageY=l.pageY;
m.screenX=l.screenX;
m.screenY=l.screenY;
m.wheelDelta=l.wheelDelta;
m.detail=l.detail;
m.srcElement=l.srcElement;
return m;
},__hJ:qx.core.Variant.select(f,{"mshtml":{1:i,2:h,4:g},"default":{0:i,2:h,1:g}}),stop:function(){this.stopPropagation();
},getButton:function(){switch(this._type){case d:case e:return i;
case b:return h;
default:return this.__hJ[this._native.button]||c;
}},isLeftPressed:function(){return this.getButton()===i;
},isMiddlePressed:function(){return this.getButton()===g;
},isRightPressed:function(){return this.getButton()===h;
},getRelatedTarget:function(){return this._relatedTarget;
},getViewportLeft:function(){return this._native.clientX;
},getViewportTop:function(){return this._native.clientY;
},getDocumentLeft:qx.core.Variant.select(f,{"mshtml":function(){var j=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(j);
},"default":function(){return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(f,{"mshtml":function(){var k=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(k);
},"default":function(){return this._native.pageY;
}}),getScreenLeft:function(){return this._native.screenX;
},getScreenTop:function(){return this._native.screenY;
}}});
})();
(function(){var c="qx.client",b="chrome",a="qx.event.type.MouseWheel";
qx.Class.define(a,{extend:qx.event.type.Mouse,members:{stop:function(){this.stopPropagation();
this.preventDefault();
},getWheelDelta:qx.core.Variant.select(c,{"default":function(){return -(this._native.wheelDelta/40);
},"gecko":function(){return this._native.detail;
},"webkit":function(){if(qx.bom.client.Browser.NAME==b){return -(this._native.wheelDelta/120);
}else{return -(this._native.wheelDelta/40);
}}})}});
})();
(function(){var j="qx.client",i="ie",h="msie",g="android",f="operamini",e="mobile chrome",d=")(/| )([0-9]+\.[0-9])",c="iemobile",b="opera mobi",a="Mobile Safari",x="operamobile",w="mobile safari",v="IEMobile|Maxthon|MSIE",u="qx.bom.client.Browser",t="opera mini",s="(",r="opera",q="mshtml",p="Opera Mini|Opera Mobi|Opera",o="AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|OmniWeb|Maxthon|Pre|Mobile Safari|Safari",m="webkit",n="5.0",k="prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Firefox",l="Mobile/";
qx.Bootstrap.define(u,{statics:{UNKNOWN:true,NAME:"unknown",TITLE:"unknown 0.0",VERSION:0.0,FULLVERSION:"0.0.0",__hK:function(y){var z=navigator.userAgent;
var B=new RegExp(s+y+d);
var C=z.match(B);

if(!C){return;
}var name=C[1].toLowerCase();
var A=C[3];
if(z.match(/Version(\/| )([0-9]+\.[0-9])/)){A=RegExp.$2;
}
if(qx.core.Variant.isSet(j,m)){if(name===g){name=e;
}else if(z.indexOf(a)!==-1||z.indexOf(l)!==-1){name=w;
}}else if(qx.core.Variant.isSet(j,q)){if(name===h){name=i;
if(qx.bom.client.System.WINCE&&name===i){name=c;
A=n;
}}}else if(qx.core.Variant.isSet(j,r)){if(name===b){name=x;
}else if(name===t){name=f;
}}this.NAME=name;
this.FULLVERSION=A;
this.VERSION=parseFloat(A,10);
this.TITLE=name+" "+this.VERSION;
this.UNKNOWN=false;
}},defer:qx.core.Variant.select(j,{"webkit":function(E){E.__hK(o);
},"gecko":function(D){D.__hK(k);
},"mshtml":function(F){F.__hK(v);
},"opera":function(G){G.__hK(p);
}})});
})();
(function(){var Q="qx.client",P="qx.dom.Hierarchy",O="previousSibling",N="*",M="nextSibling",L="parentNode";
qx.Class.define(P,{statics:{getNodeIndex:function(p){var q=0;

while(p&&(p=p.previousSibling)){q++;
}return q;
},getElementIndex:function(I){var J=0;
var K=qx.dom.Node.ELEMENT;

while(I&&(I=I.previousSibling)){if(I.nodeType==K){J++;
}}return J;
},getNextElementSibling:function(G){while(G&&(G=G.nextSibling)&&!qx.dom.Node.isElement(G)){continue;
}return G||null;
},getPreviousElementSibling:function(a){while(a&&(a=a.previousSibling)&&!qx.dom.Node.isElement(a)){continue;
}return a||null;
},contains:qx.core.Variant.select(Q,{"webkit|mshtml|opera":function(h,i){if(qx.dom.Node.isDocument(h)){var j=qx.dom.Node.getDocument(i);
return h&&j==h;
}else if(qx.dom.Node.isDocument(i)){return false;
}else{return h.contains(i);
}},"gecko":function(k,l){return !!(k.compareDocumentPosition(l)&16);
},"default":function(A,B){while(B){if(A==B){return true;
}B=B.parentNode;
}return false;
}}),isRendered:function(c){if(!c.offsetParent){return false;
}var d=c.ownerDocument||c.document;
if(d.body.contains){return d.body.contains(c);
}if(d.compareDocumentPosition){return !!(d.compareDocumentPosition(c)&16);
}throw new Error("Missing support for isRendered()!");
},isDescendantOf:function(R,S){return this.contains(S,R);
},getCommonParent:qx.core.Variant.select(Q,{"mshtml|opera":function(r,s){if(r===s){return r;
}
while(r&&qx.dom.Node.isElement(r)){if(r.contains(s)){return r;
}r=r.parentNode;
}return null;
},"default":function(u,v){if(u===v){return u;
}var w={};
var z=qx.core.ObjectRegistry;
var y,x;

while(u||v){if(u){y=z.toHashCode(u);

if(w[y]){return w[y];
}w[y]=u;
u=u.parentNode;
}
if(v){x=z.toHashCode(v);

if(w[x]){return w[x];
}w[x]=v;
v=v.parentNode;
}}return null;
}}),getAncestors:function(T){return this._recursivelyCollect(T,L);
},getChildElements:function(f){f=f.firstChild;

if(!f){return [];
}var g=this.getNextSiblings(f);

if(f.nodeType===1){g.unshift(f);
}return g;
},getDescendants:function(V){return qx.lang.Array.fromCollection(V.getElementsByTagName(N));
},getFirstDescendant:function(t){t=t.firstChild;

while(t&&t.nodeType!=1){t=t.nextSibling;
}return t;
},getLastDescendant:function(H){H=H.lastChild;

while(H&&H.nodeType!=1){H=H.previousSibling;
}return H;
},getPreviousSiblings:function(C){return this._recursivelyCollect(C,O);
},getNextSiblings:function(e){return this._recursivelyCollect(e,M);
},_recursivelyCollect:function(D,E){var F=[];

while(D=D[E]){if(D.nodeType==1){F.push(D);
}}return F;
},getSiblings:function(b){return this.getPreviousSiblings(b).reverse().concat(this.getNextSiblings(b));
},isEmpty:function(U){U=U.firstChild;

while(U){if(U.nodeType===qx.dom.Node.ELEMENT||U.nodeType===qx.dom.Node.TEXT){return false;
}U=U.nextSibling;
}return true;
},cleanWhitespace:function(m){var n=m.firstChild;

while(n){var o=n.nextSibling;

if(n.nodeType==3&&!/\S/.test(n.nodeValue)){m.removeChild(n);
}n=o;
}}}});
})();
(function(){var b="qx.client",a="qx.event.type.Drag";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(k,l){arguments.callee.base.call(this,true,k);

if(l){this._native=l.getNativeEvent()||null;
this._originalTarget=l.getTarget()||null;
}else{this._native=null;
this._originalTarget=null;
}return this;
},clone:function(m){var n=arguments.callee.base.call(this,m);
n._native=this._native;
return n;
},getDocumentLeft:qx.core.Variant.select(b,{"mshtml":function(){if(this._native==null){return 0;
}var d=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(d);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(b,{"mshtml":function(){if(this._native==null){return 0;
}var i=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(i);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageY;
}}),getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);
},addType:function(j){this.getManager().addType(j);
},addAction:function(g){this.getManager().addAction(g);
},supportsType:function(c){return this.getManager().supportsType(c);
},supportsAction:function(h){return this.getManager().supportsAction(h);
},addData:function(e,f){this.getManager().addData(e,f);
},getData:function(o){return this.getManager().getData(o);
},getCurrentType:function(){return this.getManager().getCurrentType();
},getCurrentAction:function(){return this.getManager().getCurrentAction();
}}});
})();
(function(){var h="losecapture",g="qx.client",f="blur",e="focus",d="click",c="qx.event.dispatch.MouseCapture",b="capture",a="scroll";
qx.Class.define(c,{extend:qx.event.dispatch.AbstractBubbling,construct:function(p,q){arguments.callee.base.call(this,p);
this.__hL=p.getWindow();
this.__hM=q;
p.addListener(this.__hL,f,this.releaseCapture,this);
p.addListener(this.__hL,e,this.releaseCapture,this);
p.addListener(this.__hL,a,this.releaseCapture,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__hM:null,__hN:null,__hO:true,__hL:null,_getParent:function(m){return m.parentNode;
},canDispatchEvent:function(r,event,s){return (this.__hN&&this.__hP[s]);
},dispatchEvent:function(n,event,o){if(o==d){event.stopPropagation();
this.releaseCapture();
return;
}
if(this.__hO||!qx.dom.Hierarchy.contains(this.__hN,n)){n=this.__hN;
}arguments.callee.base.call(this,n,event,o);
},__hP:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(t,u){var u=u!==false;

if(this.__hN===t&&this.__hO==u){return;
}
if(this.__hN){this.releaseCapture();
}this.nativeSetCapture(t,u);

if(this.hasNativeCapture){var self=this;
qx.bom.Event.addNativeListener(t,h,function(){qx.bom.Event.removeNativeListener(t,h,arguments.callee);
self.releaseCapture();
});
}this.__hO=u;
this.__hN=t;
this.__hM.fireEvent(t,b,qx.event.type.Event,[true,false]);
},getCaptureElement:function(){return this.__hN;
},releaseCapture:function(){var v=this.__hN;

if(!v){return;
}this.__hN=null;
this.__hM.fireEvent(v,h,qx.event.type.Event,[true,false]);
this.nativeReleaseCapture(v);
},hasNativeCapture:qx.bom.client.Engine.MSHTML,nativeSetCapture:qx.core.Variant.select(g,{"mshtml":function(k,l){k.setCapture(l!==false);
},"default":qx.lang.Function.empty}),nativeReleaseCapture:qx.core.Variant.select(g,{"mshtml":function(j){j.releaseCapture();
},"default":qx.lang.Function.empty})},destruct:function(){this.__hN=this.__hL=this.__hM=null;
},defer:function(i){qx.event.Registration.addDispatcher(i);
}});
})();
(function(){var r="qx.client",q="",p="mshtml",o="'",n="SelectionLanguage",m="qx.xml.Document",k=" />",j="MSXML2.DOMDocument.3.0",h='<\?xml version="1.0" encoding="utf-8"?>\n<',g="MSXML2.XMLHTTP.3.0",c="MSXML2.XMLHTTP.6.0",f=" xmlns='",e="text/xml",b="XPath",a="MSXML2.DOMDocument.6.0",d="HTML";
qx.Class.define(m,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(G){if(G.nodeType===9){return G.documentElement.nodeName!==d;
}else if(G.ownerDocument){return this.isXmlDocument(G.ownerDocument);
}else{return false;
}},create:qx.core.Variant.select(r,{"mshtml":function(w,x){var y=new ActiveXObject(this.DOMDOC);
y.setProperty(n,b);

if(x){var z=h;
z+=x;

if(w){z+=f+w+o;
}z+=k;
y.loadXML(z);
}return y;
},"default":function(C,D){return document.implementation.createDocument(C||q,D||q,null);
}}),fromString:qx.core.Variant.select(r,{"mshtml":function(E){var F=qx.xml.Document.create();
F.loadXML(E);
return F;
},"default":function(A){var B=new DOMParser();
return B.parseFromString(A,e);
}})},defer:function(s){if(qx.core.Variant.isSet(r,p)){var t=[a,j];
var u=[c,g];

for(var i=0,l=t.length;i<l;i++){try{new ActiveXObject(t[i]);
new ActiveXObject(u[i]);
}catch(v){continue;
}s.DOMDOC=t[i];
s.XMLHTTP=u[i];
break;
}}}});
})();
(function(){var k="visible",j="scroll",i="borderBottomWidth",h="borderTopWidth",g="left",f="borderLeftWidth",e="bottom",d="top",c="right",b="qx.bom.element.Scroll",a="borderRightWidth";
qx.Class.define(b,{statics:{intoViewX:function(l,stop,m){var parent=l.parentNode;
var r=qx.dom.Node.getDocument(l);
var n=r.body;
var z,x,u;
var B,s,C;
var v,D,G;
var E,p,y,o;
var t,F,w;
var q=m===g;
var A=m===c;
stop=stop?stop.parentNode:r;
while(parent&&parent!=stop){if(parent.scrollWidth>parent.clientWidth&&(parent===n||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===n){x=parent.scrollLeft;
u=x+qx.bom.Viewport.getWidth();
B=qx.bom.Viewport.getWidth();
s=parent.clientWidth;
C=parent.scrollWidth;
v=0;
D=0;
G=0;
}else{z=qx.bom.element.Location.get(parent);
x=z.left;
u=z.right;
B=parent.offsetWidth;
s=parent.clientWidth;
C=parent.scrollWidth;
v=parseInt(qx.bom.element.Style.get(parent,f),10)||0;
D=parseInt(qx.bom.element.Style.get(parent,a),10)||0;
G=B-s-v-D;
}E=qx.bom.element.Location.get(l);
p=E.left;
y=E.right;
o=l.offsetWidth;
t=p-x-v;
F=y-u+D;
w=0;
if(q){w=t;
}else if(A){w=F+G;
}else if(t<0||o>s){w=t;
}else if(F>0){w=F+G;
}parent.scrollLeft+=w;
if(qx.bom.client.Engine.GECKO){qx.event.Registration.fireNonBubblingEvent(parent,j);
}}
if(parent===n){break;
}parent=parent.parentNode;
}},intoViewY:function(H,stop,I){var parent=H.parentNode;
var O=qx.dom.Node.getDocument(H);
var J=O.body;
var W,K,S;
var Y,V,Q;
var M,N,L;
var bb,bc,X,R;
var U,P,bd;
var ba=I===d;
var T=I===e;
stop=stop?stop.parentNode:O;
while(parent&&parent!=stop){if(parent.scrollHeight>parent.clientHeight&&(parent===J||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===J){K=parent.scrollTop;
S=K+qx.bom.Viewport.getHeight();
Y=qx.bom.Viewport.getHeight();
V=parent.clientHeight;
Q=parent.scrollHeight;
M=0;
N=0;
L=0;
}else{W=qx.bom.element.Location.get(parent);
K=W.top;
S=W.bottom;
Y=parent.offsetHeight;
V=parent.clientHeight;
Q=parent.scrollHeight;
M=parseInt(qx.bom.element.Style.get(parent,h),10)||0;
N=parseInt(qx.bom.element.Style.get(parent,i),10)||0;
L=Y-V-M-N;
}bb=qx.bom.element.Location.get(H);
bc=bb.top;
X=bb.bottom;
R=H.offsetHeight;
U=bc-K-M;
P=X-S+N;
bd=0;
if(ba){bd=U;
}else if(T){bd=P+L;
}else if(U<0||R>V){bd=U;
}else if(P>0){bd=P+L;
}parent.scrollTop+=bd;
if(qx.bom.client.Engine.GECKO){qx.event.Registration.fireNonBubblingEvent(parent,j);
}}
if(parent===J){break;
}parent=parent.parentNode;
}},intoView:function(be,stop,bf,bg){this.intoViewX(be,stop,bf);
this.intoViewY(be,stop,bg);
}}});
})();
(function(){var j="borderTopWidth",i="borderLeftWidth",h="marginTop",g="marginLeft",f="scroll",e="qx.client",d="border-box",c="borderBottomWidth",b="borderRightWidth",a="auto",y="padding",x="qx.bom.element.Location",w="paddingLeft",v="static",u="marginBottom",t="visible",s="BODY",r="paddingBottom",q="paddingTop",p="marginRight",n="position",o="margin",l="overflow",m="paddingRight",k="border";
qx.Class.define(x,{statics:{__hQ:function(J,K){return qx.bom.element.Style.get(J,K,qx.bom.element.Style.COMPUTED_MODE,false);
},__hR:function(bO,bP){return parseInt(qx.bom.element.Style.get(bO,bP,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;
},__hS:function(bl){var bo=0,top=0;
if(bl.getBoundingClientRect&&!qx.bom.client.Engine.OPERA){var bn=qx.dom.Node.getWindow(bl);
bo-=qx.bom.Viewport.getScrollLeft(bn);
top-=qx.bom.Viewport.getScrollTop(bn);
}else{var bm=qx.dom.Node.getDocument(bl).body;
bl=bl.parentNode;
while(bl&&bl!=bm){bo+=bl.scrollLeft;
top+=bl.scrollTop;
bl=bl.parentNode;
}}return {left:bo,top:top};
},__hT:qx.core.Variant.select(e,{"mshtml":function(be){var bg=qx.dom.Node.getDocument(be);
var bf=bg.body;
var bh=0;
var top=0;
bh-=bf.clientLeft+bg.documentElement.clientLeft;
top-=bf.clientTop+bg.documentElement.clientTop;

if(qx.bom.client.Feature.STANDARD_MODE){bh+=this.__hR(bf,i);
top+=this.__hR(bf,j);
}return {left:bh,top:top};
},"webkit":function(ba){var bc=qx.dom.Node.getDocument(ba);
var bb=bc.body;
var bd=bb.offsetLeft;
var top=bb.offsetTop;
if(qx.bom.client.Engine.VERSION<530.17){bd+=this.__hR(bb,i);
top+=this.__hR(bb,j);
}return {left:bd,top:top};
},"gecko":function(bH){var bI=qx.dom.Node.getDocument(bH).body;
var bJ=bI.offsetLeft;
var top=bI.offsetTop;
if(qx.bom.client.Engine.VERSION<1.9){bJ+=this.__hR(bI,g);
top+=this.__hR(bI,h);
}if(qx.bom.element.BoxSizing.get(bI)!==d){bJ+=this.__hR(bI,i);
top+=this.__hR(bI,j);
}return {left:bJ,top:top};
},"default":function(W){var X=qx.dom.Node.getDocument(W).body;
var Y=X.offsetLeft;
var top=X.offsetTop;
return {left:Y,top:top};
}}),__hU:qx.core.Variant.select(e,{"mshtml|webkit":function(bt){var bv=qx.dom.Node.getDocument(bt);
if(bt.getBoundingClientRect){var bw=bt.getBoundingClientRect();
var bx=bw.left;
var top=bw.top;
}else{var bx=bt.offsetLeft;
var top=bt.offsetTop;
bt=bt.offsetParent;
var bu=bv.body;
while(bt&&bt!=bu){bx+=bt.offsetLeft;
top+=bt.offsetTop;
bx+=this.__hR(bt,i);
top+=this.__hR(bt,j);
bt=bt.offsetParent;
}}return {left:bx,top:top};
},"gecko":function(z){if(z.getBoundingClientRect){var C=z.getBoundingClientRect();
var D=Math.round(C.left);
var top=Math.round(C.top);
}else{var D=0;
var top=0;
var A=qx.dom.Node.getDocument(z).body;
var B=qx.bom.element.BoxSizing;

if(B.get(z)!==d){D-=this.__hR(z,i);
top-=this.__hR(z,j);
}
while(z&&z!==A){D+=z.offsetLeft;
top+=z.offsetTop;
if(B.get(z)!==d){D+=this.__hR(z,i);
top+=this.__hR(z,j);
}if(z.parentNode&&this.__hQ(z.parentNode,l)!=t){D+=this.__hR(z.parentNode,i);
top+=this.__hR(z.parentNode,j);
}z=z.offsetParent;
}}return {left:D,top:top};
},"default":function(bi){var bk=0;
var top=0;
var bj=qx.dom.Node.getDocument(bi).body;
while(bi&&bi!==bj){bk+=bi.offsetLeft;
top+=bi.offsetTop;
bi=bi.offsetParent;
}return {left:bk,top:top};
}}),get:function(by,bz){if(by.tagName==s){var location=this.__hV(by);
var bG=location.left;
var top=location.top;
}else{var bA=this.__hT(by);
var bF=this.__hU(by);
var scroll=this.__hS(by);
var bG=bF.left+bA.left-scroll.left;
var top=bF.top+bA.top-scroll.top;
}var bB=bG+by.offsetWidth;
var bC=top+by.offsetHeight;

if(bz){if(bz==y||bz==f){var bD=qx.bom.element.Overflow.getX(by);

if(bD==f||bD==a){bB+=by.scrollWidth-by.offsetWidth+this.__hR(by,i)+this.__hR(by,b);
}var bE=qx.bom.element.Overflow.getY(by);

if(bE==f||bE==a){bC+=by.scrollHeight-by.offsetHeight+this.__hR(by,j)+this.__hR(by,c);
}}
switch(bz){case y:bG+=this.__hR(by,w);
top+=this.__hR(by,q);
bB-=this.__hR(by,m);
bC-=this.__hR(by,r);
case f:bG-=by.scrollLeft;
top-=by.scrollTop;
bB-=by.scrollLeft;
bC-=by.scrollTop;
case k:bG+=this.__hR(by,i);
top+=this.__hR(by,j);
bB-=this.__hR(by,b);
bC-=this.__hR(by,c);
break;
case o:bG-=this.__hR(by,g);
top-=this.__hR(by,h);
bB+=this.__hR(by,p);
bC+=this.__hR(by,u);
break;
}}return {left:bG,top:top,right:bB,bottom:bC};
},__hV:qx.core.Variant.select(e,{"default":function(bp){var top=bp.offsetTop+this.__hR(bp,h);
var bq=bp.offsetLeft+this.__hR(bp,g);
return {left:bq,top:top};
},"mshtml":function(E){var top=E.offsetTop;
var F=E.offsetLeft;

if(!((qx.bom.client.Engine.VERSION<8||qx.bom.client.Engine.DOCUMENT_MODE<8)&&!qx.bom.client.Feature.QUIRKS_MODE)){top+=this.__hR(E,h);
F+=this.__hR(E,g);
}return {left:F,top:top};
},"gecko":function(U){var top=U.offsetTop+this.__hR(U,h)+this.__hR(U,i);
var V=U.offsetLeft+this.__hR(U,g)+this.__hR(U,j);
return {left:V,top:top};
}}),getLeft:function(br,bs){return this.get(br,bs).left;
},getTop:function(bK,bL){return this.get(bK,bL).top;
},getRight:function(bM,bN){return this.get(bM,bN).right;
},getBottom:function(M,N){return this.get(M,N).bottom;
},getRelative:function(O,P,Q,R){var T=this.get(O,Q);
var S=this.get(P,R);
return {left:T.left-S.left,top:T.top-S.top,right:T.right-S.right,bottom:T.bottom-S.bottom};
},getPosition:function(L){return this.getRelative(L,this.getOffsetParent(L));
},getOffsetParent:function(G){var I=G.offsetParent||document.body;
var H=qx.bom.element.Style;

while(I&&(!/^body|html$/i.test(I.tagName)&&H.get(I,n)===v)){I=I.offsetParent;
}return I;
}}});
})();
(function(){var k="qx.client",j="character",i="EndToEnd",h="input",g="textarea",f="StartToStart",e='character',d="qx.bom.Selection",c="button",b="#text",a="body";
qx.Class.define(d,{statics:{getSelectionObject:qx.core.Variant.select(k,{"mshtml":function(C){return C.selection;
},"default":function(bb){return qx.dom.Node.getWindow(bb).getSelection();
}}),get:qx.core.Variant.select(k,{"mshtml":function(bd){var be=qx.bom.Range.get(qx.dom.Node.getDocument(bd));
return be.text;
},"default":function(u){if(this.__hW(u)){return u.value.substring(u.selectionStart,u.selectionEnd);
}else{return this.getSelectionObject(qx.dom.Node.getDocument(u)).toString();
}}}),getLength:qx.core.Variant.select(k,{"mshtml":function(bp){var br=this.get(bp);
var bq=qx.util.StringSplit.split(br,/\r\n/);
return br.length-(bq.length-1);
},"opera":function(J){var O,M,K;

if(this.__hW(J)){var N=J.selectionStart;
var L=J.selectionEnd;
O=J.value.substring(N,L);
M=L-N;
}else{O=qx.bom.Selection.get(J);
M=O.length;
}K=qx.util.StringSplit.split(O,/\r\n/);
return M-(K.length-1);
},"default":function(bc){if(this.__hW(bc)){return bc.selectionEnd-bc.selectionStart;
}else{return this.get(bc).length;
}}}),getStart:qx.core.Variant.select(k,{"mshtml":function(l){if(this.__hW(l)){var q=qx.bom.Range.get();
if(!l.contains(q.parentElement())){return -1;
}var r=qx.bom.Range.get(l);
var p=l.value.length;
r.moveToBookmark(q.getBookmark());
r.moveEnd(e,p);
return p-r.text.length;
}else{var r=qx.bom.Range.get(l);
var n=r.parentElement();
var s=qx.bom.Range.get();
s.moveToElementText(n);
var m=qx.bom.Range.get(qx.dom.Node.getBodyElement(l));
m.setEndPoint(f,r);
m.setEndPoint(i,s);
if(s.compareEndPoints(f,m)==0){return 0;
}var o;
var t=0;

while(true){o=m.moveStart(j,-1);
if(s.compareEndPoints(f,m)==0){break;
}if(o==0){break;
}else{t++;
}}return ++t;
}},"gecko|webkit":function(S){if(this.__hW(S)){return S.selectionStart;
}else{var U=qx.dom.Node.getDocument(S);
var T=this.getSelectionObject(U);
if(T.anchorOffset<T.focusOffset){return T.anchorOffset;
}else{return T.focusOffset;
}}},"default":function(bt){if(this.__hW(bt)){return bt.selectionStart;
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bt)).anchorOffset;
}}}),getEnd:qx.core.Variant.select(k,{"mshtml":function(bg){if(this.__hW(bg)){var bl=qx.bom.Range.get();
if(!bg.contains(bl.parentElement())){return -1;
}var bm=qx.bom.Range.get(bg);
var bk=bg.value.length;
bm.moveToBookmark(bl.getBookmark());
bm.moveStart(e,-bk);
return bm.text.length;
}else{var bm=qx.bom.Range.get(bg);
var bi=bm.parentElement();
var bn=qx.bom.Range.get();
bn.moveToElementText(bi);
var bk=bn.text.length;
var bh=qx.bom.Range.get(qx.dom.Node.getBodyElement(bg));
bh.setEndPoint(i,bm);
bh.setEndPoint(f,bn);
if(bn.compareEndPoints(i,bh)==0){return bk-1;
}var bj;
var bo=0;

while(true){bj=bh.moveEnd(j,1);
if(bn.compareEndPoints(i,bh)==0){break;
}if(bj==0){break;
}else{bo++;
}}return bk-(++bo);
}},"gecko|webkit":function(P){if(this.__hW(P)){return P.selectionEnd;
}else{var R=qx.dom.Node.getDocument(P);
var Q=this.getSelectionObject(R);
if(Q.focusOffset>Q.anchorOffset){return Q.focusOffset;
}else{return Q.anchorOffset;
}}},"default":function(ba){if(this.__hW(ba)){return ba.selectionEnd;
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(ba)).focusOffset;
}}}),__hW:function(bs){return qx.dom.Node.isElement(bs)&&(bs.nodeName.toLowerCase()==h||bs.nodeName.toLowerCase()==g);
},set:qx.core.Variant.select(k,{"mshtml":function(bu,bv,bw){var bx;
if(qx.dom.Node.isDocument(bu)){bu=bu.body;
}
if(qx.dom.Node.isElement(bu)||qx.dom.Node.isText(bu)){switch(bu.nodeName.toLowerCase()){case h:case g:case c:if(bw===undefined){bw=bu.value.length;
}
if(bv>=0&&bv<=bu.value.length&&bw>=0&&bw<=bu.value.length){bx=qx.bom.Range.get(bu);
bx.collapse(true);
bx.moveStart(j,bv);
bx.moveEnd(j,bw-bv);
bx.select();
return true;
}break;
case b:if(bw===undefined){bw=bu.nodeValue.length;
}
if(bv>=0&&bv<=bu.nodeValue.length&&bw>=0&&bw<=bu.nodeValue.length){bx=qx.bom.Range.get(qx.dom.Node.getBodyElement(bu));
bx.moveToElementText(bu.parentNode);
bx.collapse(true);
bx.moveStart(j,bv);
bx.moveEnd(j,bw-bv);
bx.select();
return true;
}break;
default:if(bw===undefined){bw=bu.childNodes.length-1;
}if(bu.childNodes[bv]&&bu.childNodes[bw]){bx=qx.bom.Range.get(qx.dom.Node.getBodyElement(bu));
bx.moveToElementText(bu.childNodes[bv]);
bx.collapse(true);
var by=qx.bom.Range.get(qx.dom.Node.getBodyElement(bu));
by.moveToElementText(bu.childNodes[bw]);
bx.setEndPoint(i,by);
bx.select();
return true;
}}}return false;
},"default":function(v,w,x){var B=v.nodeName.toLowerCase();

if(qx.dom.Node.isElement(v)&&(B==h||B==g)){if(x===undefined){x=v.value.length;
}if(w>=0&&w<=v.value.length&&x>=0&&x<=v.value.length){v.focus();
v.select();
v.setSelectionRange(w,x);
return true;
}}else{var z=false;
var A=qx.dom.Node.getWindow(v).getSelection();
var y=qx.bom.Range.get(v);
if(qx.dom.Node.isText(v)){if(x===undefined){x=v.length;
}
if(w>=0&&w<v.length&&x>=0&&x<=v.length){z=true;
}}else if(qx.dom.Node.isElement(v)){if(x===undefined){x=v.childNodes.length-1;
}
if(w>=0&&v.childNodes[w]&&x>=0&&v.childNodes[x]){z=true;
}}else if(qx.dom.Node.isDocument(v)){v=v.body;

if(x===undefined){x=v.childNodes.length-1;
}
if(w>=0&&v.childNodes[w]&&x>=0&&v.childNodes[x]){z=true;
}}
if(z){if(!A.isCollapsed){A.collapseToStart();
}y.setStart(v,w);
if(qx.dom.Node.isText(v)){y.setEnd(v,x);
}else{y.setEndAfter(v.childNodes[x]);
}if(A.rangeCount>0){A.removeAllRanges();
}A.addRange(y);
return true;
}}return false;
}}),setAll:function(bf){return qx.bom.Selection.set(bf,0);
},clear:qx.core.Variant.select(k,{"mshtml":function(V){var W=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(V));
var X=qx.bom.Range.get(V);
var parent=X.parentElement();
var Y=qx.bom.Range.get(qx.dom.Node.getDocument(V));
if(parent==Y.parentElement()&&parent==V){W.empty();
}},"default":function(D){var F=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(D));
var H=D.nodeName.toLowerCase();
if(qx.dom.Node.isElement(D)&&(H==h||H==g)){D.setSelectionRange(0,0);
qx.bom.Element.blur(D);
}else if(qx.dom.Node.isDocument(D)||H==a){F.collapse(D.body?D.body:D,0);
}else{var G=qx.bom.Range.get(D);

if(!G.collapsed){var I;
var E=G.commonAncestorContainer;
if(qx.dom.Node.isElement(D)&&qx.dom.Node.isText(E)){I=E.parentNode;
}else{I=E;
}
if(I==D){F.collapse(D,0);
}}}}})}});
})();
(function(){var l="button",k="qx.bom.Range",j="text",i="password",h="file",g="submit",f="reset",e="textarea",d="input",c="hidden",a="qx.client",b="body";
qx.Class.define(k,{statics:{get:qx.core.Variant.select(a,{"mshtml":function(m){if(qx.dom.Node.isElement(m)){switch(m.nodeName.toLowerCase()){case d:switch(m.type){case j:case i:case c:case l:case f:case h:case g:return m.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();
}break;
case e:case b:case l:return m.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();
}}else{if(m==null){m=window;
}return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();
}},"default":function(n){var o=qx.dom.Node.getDocument(n);
var p=qx.bom.Selection.getSelectionObject(o);

if(p.rangeCount>0){return p.getRangeAt(0);
}else{return o.createRange();
}}})}});
})();
(function(){var f="",e="g",d="$",c="qx.util.StringSplit",b="\\$&",a="^";
qx.Class.define(c,{statics:{split:function(g,h,k){var n=f;
if(h===undefined){return [g.toString()];
}else if(h===null||h.constructor!==RegExp){h=new RegExp(String(h).replace(/[.*+?^${}()|[\]\/\\]/g,b),e);
}else{n=h.toString().replace(/^[\S\s]+\//,f);

if(!h.global){h=new RegExp(h.source,e+n);
}}var m=new RegExp(a+h.source+d,n);
if(k===undefined||+k<0){k=false;
}else{k=Math.floor(+k);

if(!k){return [];
}}var p,o=[],l=0,i=0;

while((k?i++<=k:true)&&(p=h.exec(g))){if((p[0].length===0)&&(h.lastIndex>p.index)){h.lastIndex--;
}
if(h.lastIndex>l){if(p.length>1){p[0].replace(m,function(){for(var j=1;j<arguments.length-2;j++){if(arguments[j]===undefined){p[j]=undefined;
}}});
}o=o.concat(g.substring(l,p.index),(p.index===g.length?[]:p.slice(1)));
l=h.lastIndex;
}
if(p[0].length===0){h.lastIndex++;
}}return (l===g.length)?(h.test(f)?o:o.concat(f)):(k?o:o.concat(g.substring(l)));
}}});
})();
(function(){var b="qx.ui.core.queue.Widget",a="widget";
qx.Class.define(b,{statics:{__hX:{},remove:function(h){delete this.__hX[h.$$hash];
},add:function(c){var d=this.__hX;

if(d[c.$$hash]){return;
}d[c.$$hash]=c;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var e=this.__hX;
var g;

for(var f in e){g=e[f];
delete e[f];
g.syncWidget();
}for(var f in e){return;
}this.__hX={};
}}});
})();
(function(){var b="qx.ui.core.queue.Visibility",a="visibility";
qx.Class.define(b,{statics:{__hY:{},__ia:{},remove:function(j){var k=j.$$hash;
delete this.__ia[k];
delete this.__hY[k];
},isVisible:function(l){return this.__ia[l.$$hash]||false;
},__ib:function(m){var o=this.__ia;
var n=m.$$hash;
var p;
if(m.isExcluded()){p=false;
}else{var parent=m.$$parent;

if(parent){p=this.__ib(parent);
}else{p=m.isRootWidget();
}}return o[n]=p;
},add:function(h){var i=this.__hY;

if(i[h.$$hash]){return;
}i[h.$$hash]=h;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var c=this.__hY;
var g=this.__ia;
for(var d in c){if(g[d]!=null){c[d].addChildrenToQueue(c);
}}var f={};

for(var d in c){f[d]=g[d];
g[d]=null;
}for(var d in c){var e=c[d];
delete c[d];
if(g[d]==null){this.__ib(e);
}if(g[d]&&g[d]!=f[d]){e.checkAppearanceNeeds();
}}this.__hY={};
}}});
})();
(function(){var b="appearance",a="qx.ui.core.queue.Appearance";
qx.Class.define(a,{statics:{__ic:{},remove:function(d){delete this.__ic[d.$$hash];
},add:function(e){var f=this.__ic;

if(f[e.$$hash]){return;
}f[e.$$hash]=e;
qx.ui.core.queue.Manager.scheduleFlush(b);
},has:function(c){return !!this.__ic[c.$$hash];
},flush:function(){var j=qx.ui.core.queue.Visibility;
var g=this.__ic;
var i;

for(var h in g){i=g[h];
delete g[h];
if(j.isVisible(i)){i.syncAppearance();
}else{i.$$stateChanges=true;
}}}}});
})();
(function(){var b="dispose",a="qx.ui.core.queue.Dispose";
qx.Class.define(a,{statics:{__id:{},add:function(c){var d=this.__id;

if(d[c.$$hash]){return;
}d[c.$$hash]=c;
qx.ui.core.queue.Manager.scheduleFlush(b);
},flush:function(){var e=this.__id;

for(var g in e){var f=e[g];
delete e[g];
f.dispose();
}for(var g in e){return;
}this.__id={};
}}});
})();
(function(){var c="none",b="qx.html.Decorator",a="absolute";
qx.Class.define(b,{extend:qx.html.Element,construct:function(g,h){arguments.callee.base.call(this);
this.__ie=g;
this.__if=h||g.toHashCode();
this.useMarkup(g.getMarkup());
var i={position:a,top:0,left:0};

if(qx.bom.client.Feature.CSS_POINTER_EVENTS){i.pointerEvents=c;
}this.setStyles(i);
},members:{__if:null,__ie:null,getId:function(){return this.__if;
},getDecorator:function(){return this.__ie;
},resize:function(e,f){this.__ie.resize(this.getDomElement(),e,f);
},tint:function(d){this.__ie.tint(this.getDomElement(),d);
},getInsets:function(){return this.__ie.getInsets();
}},destruct:function(){this.__ie=null;
}});
})();
(function(){var f="blur",e="focus",d="input",c="load",b="qx.ui.core.EventHandler",a="activate";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){arguments.callee.base.call(this);
this.__ig=qx.event.Registration.getManager(window);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:false},members:{__ig:null,__ih:{focusin:1,focusout:1,focus:1,blur:1},__ii:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(g,h){return g instanceof qx.ui.core.Widget;
},_dispatchEvent:function(p){var u=p.getTarget();
var t=qx.ui.core.Widget.getWidgetByElement(u);
var v=false;

while(t&&t.isAnonymous()){var v=true;
t=t.getLayoutParent();
}if(t&&v&&p.getType()==a){t.getContainerElement().activate();
}if(this.__ih[p.getType()]){t=t&&t.getFocusTarget();
if(!t){return;
}}if(p.getRelatedTarget){var C=p.getRelatedTarget();
var B=qx.ui.core.Widget.getWidgetByElement(C);

while(B&&B.isAnonymous()){B=B.getLayoutParent();
}
if(B){if(this.__ih[p.getType()]){B=B.getFocusTarget();
}if(B===t){return;
}}}var x=p.getCurrentTarget();
var z=qx.ui.core.Widget.getWidgetByElement(x);

if(!z||z.isAnonymous()){return;
}if(this.__ih[p.getType()]){z=z.getFocusTarget();
}var A=p.getType();

if(!z||!(z.isEnabled()||this.__ii[A])){return;
}var q=p.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;
var w=this.__ig.getListeners(z,A,q);

if(!w||w.length===0){return;
}var r=qx.event.Pool.getInstance().getObject(p.constructor);
p.clone(r);
r.setTarget(t);
r.setRelatedTarget(B||null);
r.setCurrentTarget(z);
var D=p.getOriginalTarget();

if(D){var s=qx.ui.core.Widget.getWidgetByElement(D);

while(s&&s.isAnonymous()){s=s.getLayoutParent();
}r.setOriginalTarget(s);
}else{r.setOriginalTarget(u);
}for(var i=0,l=w.length;i<l;i++){var y=w[i].context||z;
w[i].handler.call(y,r);
}if(r.getPropagationStopped()){p.stopPropagation();
}
if(r.getDefaultPrevented()){p.preventDefault();
}qx.event.Pool.getInstance().poolObject(r);
},registerEvent:function(E,F,G){var H;

if(F===e||F===f){H=E.getFocusElement();
}else if(F===c||F===d){H=E.getContentElement();
}else{H=E.getContainerElement();
}
if(H){H.addListener(F,this._dispatchEvent,this,G);
}},unregisterEvent:function(j,k,m){var n;

if(k===e||k===f){n=j.getFocusElement();
}else if(k===c||k===d){n=j.getContentElement();
}else{n=j.getContainerElement();
}
if(n){n.removeListener(k,this._dispatchEvent,this,m);
}}},destruct:function(){this.__ig=null;
},defer:function(o){qx.event.Registration.addHandler(o);
}});
})();
(function(){var c="qx.bom.client.Locale",b="-",a="";
qx.Class.define(c,{statics:{LOCALE:"",VARIANT:"",__ij:function(){var e=(qx.bom.client.Engine.MSHTML?navigator.userLanguage:navigator.language).toLowerCase();
var g=a;
var f=e.indexOf(b);

if(f!=-1){g=e.substr(f+1);
e=e.substr(0,f);
}this.LOCALE=e;
this.VARIANT=g;
}},defer:function(d){d.__ij();
}});
})();
(function(){var t="",s='indexOf',r='slice',q='concat',p='toLocaleLowerCase',o="qx.type.BaseString",n='match',m='toLocaleUpperCase',k='search',j='replace',c='toLowerCase',h='charCodeAt',f='split',b='substring',a='lastIndexOf',e='substr',d='toUpperCase',g='charAt';
qx.Class.define(o,{extend:Object,construct:function(z){var z=z||t;
this.__ik=z;
this.length=z.length;
},members:{$$isString:true,length:0,__ik:null,toString:function(){return this.__ik;
},charAt:null,valueOf:null,charCodeAt:null,concat:null,indexOf:null,lastIndexOf:null,match:null,replace:null,search:null,slice:null,split:null,substr:null,substring:null,toLowerCase:null,toUpperCase:null,toHashCode:function(){return qx.core.ObjectRegistry.toHashCode(this);
},toLocaleLowerCase:null,toLocaleUpperCase:null,base:function(u,v){return qx.core.Object.prototype.base.apply(this,arguments);
}},defer:function(w,x){{};
var y=[g,h,q,s,a,n,j,k,r,f,e,b,c,d,p,m];
x.valueOf=x.toString;

if(new w(t).valueOf()==null){delete x.valueOf;
}
for(var i=0,l=y.length;i<l;i++){x[y[i]]=String.prototype[y[i]];
}}});
})();
(function(){var a="qx.locale.LocalizedString";
qx.Class.define(a,{extend:qx.type.BaseString,construct:function(b,c,d){arguments.callee.base.call(this,b);
this.__il=c;
this.__im=d;
},members:{__il:null,__im:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__il,this.__im);
}}});
})();
(function(){var n="_",m="",l="qx.dynlocale",k="on",j="_applyLocale",h="changeLocale",g="C",f="qx.locale.Manager",e="String",d="singleton";
qx.Class.define(f,{type:d,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__in=qx.$$translations||{};
this.__io=qx.$$locales||{};
var u=qx.bom.client.Locale;
var s=u.LOCALE;
var t=u.VARIANT;

if(t!==m){s+=n+t;
}this.setLocale(s||this.__ip);
},statics:{tr:function(v,w){var x=qx.lang.Array.fromArguments(arguments);
x.splice(0,1);
return qx.locale.Manager.getInstance().translate(v,x);
},trn:function(y,z,A,B){var C=qx.lang.Array.fromArguments(arguments);
C.splice(0,3);
if(A!=1){return qx.locale.Manager.getInstance().translate(z,C);
}else{return qx.locale.Manager.getInstance().translate(y,C);
}},trc:function(o,p,q){var r=qx.lang.Array.fromArguments(arguments);
r.splice(0,2);
return qx.locale.Manager.getInstance().translate(p,r);
},marktr:function(bg){return bg;
}},properties:{locale:{check:e,nullable:true,apply:j,event:h}},members:{__ip:g,__iq:null,__ir:null,__in:null,__io:null,getLanguage:function(){return this.__ir;
},getTerritory:function(){return this.getLocale().split(n)[1]||m;
},getAvailableLocales:function(){var Q=[];

for(var P in this.__io){if(P!=this.__ip){Q.push(P);
}}return Q;
},__is:function(a){var c;
var b=a.indexOf(n);

if(b==-1){c=a;
}else{c=a.substring(0,b);
}return c;
},_applyLocale:function(be,bf){this.__iq=be;
this.__ir=this.__is(be);
},addTranslation:function(D,E){var F=this.__in;

if(F[D]){for(var G in E){F[D][G]=E[G];
}}else{F[D]=E;
}},addLocale:function(R,S){var T=this.__io;

if(T[R]){for(var U in S){T[R][U]=S[U];
}}else{T[R]=S;
}},translate:function(H,I,J){var O;
var M=this.__in;

if(!M){return H;
}
if(J){var L=this.__is(J);
}else{J=this.__iq;
L=this.__ir;
}
if(!O&&M[J]){O=M[J][H];
}
if(!O&&M[L]){O=M[L][H];
}
if(!O&&M[this.__ip]){O=M[this.__ip][H];
}
if(!O){O=H;
}
if(I.length>0){var K=[];

for(var i=0;i<I.length;i++){var N=I[i];

if(N&&N.translate){K[i]=N.translate();
}else{K[i]=N;
}}O=qx.lang.String.format(O,K);
}
if(qx.core.Variant.isSet(l,k)){O=new qx.locale.LocalizedString(O,H,I);
}return O;
},localize:function(V,W,X){var bd;
var bb=this.__io;

if(!bb){return V;
}
if(X){var ba=this.__is(X);
}else{X=this.__iq;
ba=this.__ir;
}
if(!bd&&bb[X]){bd=bb[X][V];
}
if(!bd&&bb[ba]){bd=bb[ba][V];
}
if(!bd&&bb[this.__ip]){bd=bb[this.__ip][V];
}
if(!bd){bd=V;
}
if(W.length>0){var Y=[];

for(var i=0;i<W.length;i++){var bc=W[i];

if(bc.translate){Y[i]=bc.translate();
}else{Y[i]=bc;
}}bd=qx.lang.String.format(bd,Y);
}
if(qx.core.Variant.isSet(l,k)){bd=new qx.locale.LocalizedString(bd,V,W);
}return bd;
}},destruct:function(){this.__in=this.__io=null;
}});
})();
(function(){var h="source",g="scale",f="no-repeat",e="mshtml",d="backgroundImage",c="qx.client",b="div",a="qx.html.Image";
qx.Class.define(a,{extend:qx.html.Element,members:{_applyProperty:function(name,n){arguments.callee.base.call(this,name,n);

if(name===h){var r=this.getDomElement();
var o=this.getAllStyles();

if(this.getNodeName()==b&&this.getStyle(d)){o.backgroundPosition=null;
o.backgroundRepeat=null;
}var p=this._getProperty(h);
var q=this._getProperty(g);
var s=q?g:f;
qx.bom.element.Decoration.update(r,p,s,o);
}},_createDomElement:function(){var l=this._getProperty(g);
var m=l?g:f;

if(qx.core.Variant.isSet(c,e)){var k=this._getProperty(h);
this.setNodeName(qx.bom.element.Decoration.getTagName(m,k));
}else{this.setNodeName(qx.bom.element.Decoration.getTagName(m));
}return arguments.callee.base.call(this);
},_copyData:function(j){return arguments.callee.base.call(this,true);
},setSource:function(i){this._setProperty(h,i);
return this;
},getSource:function(){return this._getProperty(h);
},resetSource:function(){this._removeProperty(h);
return this;
},setScale:function(t){this._setProperty(g,t);
return this;
},getScale:function(){return this._getProperty(g);
}}});
})();
(function(){var K="nonScaled",J="scaled",I="alphaScaled",H=".png",G="replacement",F="hidden",E="div",D="__it",C="Boolean",B="_applyScale",v="px",A="_applySource",y="-disabled.$1",u="img",t="changeSource",x="qx.client",w="String",z="image",s="qx.ui.basic.Image";
qx.Class.define(s,{extend:qx.ui.core.Widget,construct:function(bh){this.__it={};
arguments.callee.base.call(this);

if(bh){this.setSource(bh);
}},properties:{source:{check:w,init:null,nullable:true,event:t,apply:A,themeable:true},scale:{check:C,init:false,themeable:true,apply:B},appearance:{refine:true,init:z},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},members:{__iu:null,__iv:null,__iw:null,__it:null,getContentElement:function(){return this.__iA();
},_createContentElement:function(){return this.__iA();
},_getContentHint:function(){return {width:this.__iu||0,height:this.__iv||0};
},_applyEnabled:function(be,bf){arguments.callee.base.call(this,be,bf);

if(this.getSource()){this._styleSource();
}},_applySource:function(bi){this._styleSource();
},_applyScale:function(bg){this._styleSource();
},__ix:function(a){this.__iw=a;
},__iy:function(){if(this.__iw==null){var g=this.getSource();
var f=false;

if(g!=null){f=qx.lang.String.endsWith(g,H);
}
if(this.getScale()&&f&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){this.__iw=I;
}else if(this.getScale()){this.__iw=J;
}else{this.__iw=K;
}}return this.__iw;
},__iz:function(o){var p;
var q;

if(o==I){p=true;
q=E;
}else if(o==K){p=false;
q=E;
}else{p=true;
q=u;
}var r=new qx.html.Image(q);
r.setScale(p);
r.setStyles({"overflowX":F,"overflowY":F});
return r;
},__iA:function(){var W=this.__iy();

if(this.__it[W]==null){this.__it[W]=this.__iz(W);
}return this.__it[W];
},_styleSource:function(){var b=qx.util.AliasManager.getInstance().resolve(this.getSource());

if(!b){this.getContentElement().resetSource();
return;
}this.__iB(b);
if(qx.util.ResourceManager.getInstance().has(b)){this.__iD(this.getContentElement(),b);
}else if(qx.io.ImageLoader.isLoaded(b)){this.__iE(this.getContentElement(),b);
}else{this.__iF(this.getContentElement(),b);
}},__iB:qx.core.Variant.select(x,{"mshtml":function(c){var e=qx.bom.element.Decoration.isAlphaImageLoaderEnabled();
var d=qx.lang.String.endsWith(c,H);

if(e&&d){if(this.getScale()&&this.__iy()!=I){this.__ix(I);
}else if(!this.getScale()&&this.__iy()!=K){this.__ix(K);
}}else{if(this.getScale()&&this.__iy()!=J){this.__ix(J);
}else if(!this.getScale()&&this.__iy()!=K){this.__ix(K);
}}this.__iC(this.__iA());
},"default":function(L){if(this.getScale()&&this.__iy()!=J){this.__ix(J);
}else if(!this.getScale()&&this.__iy(K)){this.__ix(K);
}this.__iC(this.__iA());
}}),__iC:function(P){var S=this.getContainerElement();
var T=S.getChild(0);

if(T!=P){if(T!=null){var V=v;
var Q={};
var R=this.getInnerSize();

if(R!=null){Q.width=R.width+V;
Q.height=R.height+V;
}var U=this.getInsets();
Q.left=U.left+V;
Q.top=U.top+V;
Q.zIndex=10;
P.setStyles(Q,true);
P.setSelectable(this.getSelectable());
}S.removeAt(0);
S.addAt(P,0);
}},__iD:function(ba,bb){var bd=qx.util.ResourceManager.getInstance();
if(!this.getEnabled()){var bc=bb.replace(/\.([a-z]+)$/,y);

if(bd.has(bc)){bb=bc;
this.addState(G);
}else{this.removeState(G);
}}if(ba.getSource()===bb){return;
}ba.setSource(bb);
this.__iH(bd.getImageWidth(bb),bd.getImageHeight(bb));
},__iE:function(h,i){var k=qx.io.ImageLoader;
h.setSource(i);
var j=k.getWidth(i);
var l=k.getHeight(i);
this.__iH(j,l);
},__iF:function(M,N){var self;
var O=qx.io.ImageLoader;
{};
if(!O.isFailed(N)){O.load(N,this.__iG,this);
}else{if(M!=null){M.resetSource();
}}},__iG:function(X,Y){if(X!==qx.util.AliasManager.getInstance().resolve(this.getSource())){return;
}if(Y.failed){this.warn("Image could not be loaded: "+X);
}this._styleSource();
},__iH:function(m,n){if(m!==this.__iu||n!==this.__iv){this.__iu=m;
this.__iv=n;
qx.ui.core.queue.Layout.add(this);
}}},destruct:function(){this._disposeMap(D);
}});
})();
(function(){var g="dragdrop-cursor",f="_applyAction",e="alias",d="qx.ui.core.DragDropCursor",c="move",b="singleton",a="copy";
qx.Class.define(d,{extend:qx.ui.basic.Image,include:qx.ui.core.MPlacement,type:b,construct:function(){arguments.callee.base.call(this);
this.setZIndex(1e8);
this.setDomMove(true);
var j=this.getApplicationRoot();
j.add(this,{left:-1000,top:-1000});
},properties:{appearance:{refine:true,init:g},action:{check:[e,a,c],apply:f,nullable:true}},members:{_applyAction:function(h,i){if(i){this.removeState(i);
}
if(h){this.addState(h);
}}}});
})();
(function(){var f="interval",e="Number",d="_applyTimeoutInterval",c="qx.event.type.Event",b="qx.event.Idle",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,construct:function(){arguments.callee.base.call(this);
var h=new qx.event.Timer(this.getTimeoutInterval());
h.addListener(f,this._onInterval,this);
h.start();
this.__iI=h;
},events:{"interval":c},properties:{timeoutInterval:{check:e,init:100,apply:d}},members:{__iI:null,_applyTimeoutInterval:function(g){this.__iI.setInterval(g);
},_onInterval:function(){this.fireEvent(f);
}},destruct:function(){if(this.__iI){this.__iI.stop();
}this.__iI=null;
}});
})();
(function(){var o="top",n="right",m="bottom",l="left",k="align-start",j="qx.util.placement.AbstractAxis",i="edge-start",h="align-end",g="edge-end",f="-",c="best-fit",e="qx.util.placement.Placement",d="keep-align",b="direct",a='__iJ';
qx.Class.define(e,{extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__iJ=new qx.util.placement.DirectAxis();
},properties:{axisX:{check:j},axisY:{check:j},edge:{check:[o,n,m,l],init:o},align:{check:[o,n,m,l],init:n}},statics:{__iK:null,compute:function(r,s,t,u,v,w,x){this.__iK=this.__iK||new qx.util.placement.Placement();
var A=v.split(f);
var z=A[0];
var y=A[1];
this.__iK.set({axisX:this.__iO(w),axisY:this.__iO(x),edge:z,align:y});
return this.__iK.compute(r,s,t,u);
},__iL:null,__iM:null,__iN:null,__iO:function(K){switch(K){case b:this.__iL=this.__iL||new qx.util.placement.DirectAxis();
return this.__iL;
case d:this.__iM=this.__iM||new qx.util.placement.KeepAlignAxis();
return this.__iM;
case c:this.__iN=this.__iN||new qx.util.placement.BestFitAxis();
return this.__iN;
default:throw new Error("Invalid 'mode' argument!'");
}}},members:{__iJ:null,compute:function(D,E,F,G){{};
var H=this.getAxisX()||this.__iJ;
var J=H.computeStart(D.width,{start:F.left,end:F.right},{start:G.left,end:G.right},E.width,this.__iP());
var I=this.getAxisY()||this.__iJ;
var top=I.computeStart(D.height,{start:F.top,end:F.bottom},{start:G.top,end:G.bottom},E.height,this.__iQ());
return {left:J,top:top};
},__iP:function(){var q=this.getEdge();
var p=this.getAlign();

if(q==l){return i;
}else if(q==n){return g;
}else if(p==l){return k;
}else if(p==n){return h;
}},__iQ:function(){var C=this.getEdge();
var B=this.getAlign();

if(C==o){return i;
}else if(C==m){return g;
}else if(B==o){return k;
}else if(B==m){return h;
}}},destruct:function(){this._disposeObjects(a);
}});
})();
(function(){var e="edge-start",d="align-start",c="align-end",b="edge-end",a="qx.util.placement.AbstractAxis";
qx.Class.define(a,{extend:qx.core.Object,members:{computeStart:function(f,g,h,i,j){throw new Error("abstract method call!");
},_moveToEdgeAndAlign:function(n,o,p,q){switch(q){case e:return o.start-p.end-n;
case b:return o.end+p.start;
case d:return o.start+p.start;
case c:return o.end-p.end-n;
}},_isInRange:function(k,l,m){return k>=0&&k+l<=m;
}}});
})();
(function(){var a="qx.util.placement.DirectAxis";
qx.Class.define(a,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(b,c,d,e,f){return this._moveToEdgeAndAlign(b,c,d,f);
}}});
})();
(function(){var c="qx.util.placement.KeepAlignAxis",b="edge-start",a="edge-end";
qx.Class.define(c,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(d,e,f,g,h){var i=this._moveToEdgeAndAlign(d,e,f,h);
var j,k;

if(this._isInRange(i,d,g)){return i;
}
if(h==b||h==a){j=e.start-f.end;
k=e.end+f.start;
}else{j=e.end-f.end;
k=e.start+f.start;
}
if(j>g-k){i=j-d;
}else{i=k;
}return i;
}}});
})();
(function(){var a="qx.util.placement.BestFitAxis";
qx.Class.define(a,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(b,c,d,e,f){var g=this._moveToEdgeAndAlign(b,c,d,f);

if(this._isInRange(g,b,e)){return g;
}
if(g<0){g=Math.min(0,e-b);
}
if(g+b>e){g=Math.max(0,e-b);
}return g;
}}});
})();
(function(){var h="mousedown",g="__iR",f="blur",d="singleton",c="qx.ui.popup.Manager";
qx.Class.define(c,{type:d,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__iR={};
qx.event.Registration.addListener(document.documentElement,h,this.__iT,this,true);
qx.bom.Element.addListener(window,f,this.hideAll,this);
},members:{__iR:null,add:function(m){{};
this.__iR[m.$$hash]=m;
this.__iS();
},remove:function(a){{};
var b=this.__iR;

if(b){delete b[a.$$hash];
this.__iS();
}},hideAll:function(){var o=this.__iR;

if(o){for(var n in o){o[n].exclude();
}}},__iS:function(){var r=1e7;
var q=this.__iR;

for(var p in q){q[p].setZIndex(r++);
}},__iT:function(e){var k=qx.ui.core.Widget.getWidgetByElement(e.getTarget());
var l=this.__iR;

for(var j in l){var i=l[j];

if(!i.getAutoHide()||k==i||qx.ui.core.Widget.contains(i,k)){continue;
}i.exclude();
}}},destruct:function(){qx.event.Registration.removeListener(document.documentElement,h,this.__iT,this,true);
this._disposeMap(g);
}});
})();
(function(){var b="abstract",a="qx.ui.layout.Abstract";
qx.Class.define(a,{type:b,extend:qx.core.Object,members:{__iU:null,_invalidChildrenCache:null,__iV:null,invalidateLayoutCache:function(){this.__iU=null;
},renderLayout:function(d,e){this.warn("Missing renderLayout() implementation!");
},getSizeHint:function(){if(this.__iU){return this.__iU;
}return this.__iU=this._computeSizeHint();
},hasHeightForWidth:function(){return false;
},getHeightForWidth:function(f){this.warn("Missing getHeightForWidth() implementation!");
return null;
},_computeSizeHint:function(){return null;
},invalidateChildrenCache:function(){this._invalidChildrenCache=true;
},verifyLayoutProperty:null,_clearSeparators:function(){var i=this.__iV;

if(i instanceof qx.ui.core.LayoutItem){i.clearSeparators();
}},_renderSeparator:function(g,h){this.__iV.renderSeparator(g,h);
},connectToWidget:function(c){if(c&&this.__iV){throw new Error("It is not possible to manually set the connected widget.");
}this.__iV=c;
this.invalidateChildrenCache();
},_getWidget:function(){return this.__iV;
},_applyLayoutChange:function(){if(this.__iV){this.__iV.scheduleLayoutUpdate();
}},_getLayoutChildren:function(){return this.__iV.getLayoutChildren();
}},destruct:function(){this.__iV=this.__iU=null;
}});
})();
(function(){var a="qx.ui.layout.Grow";
qx.Class.define(a,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(b,c){var g=this._getLayoutChildren();
var f,h,e,d;
for(var i=0,l=g.length;i<l;i++){f=g[i];
h=f.getSizeHint();
e=b;

if(e<h.minWidth){e=h.minWidth;
}else if(e>h.maxWidth){e=h.maxWidth;
}d=c;

if(d<h.minHeight){d=h.minHeight;
}else if(d>h.maxHeight){d=h.maxHeight;
}f.renderLayout(0,0,e,d);
}},_computeSizeHint:function(){var q=this._getLayoutChildren();
var o,s;
var r=0,p=0;
var n=0,k=0;
var j=Infinity,m=Infinity;
for(var i=0,l=q.length;i<l;i++){o=q[i];
s=o.getSizeHint();
r=Math.max(r,s.width);
p=Math.max(p,s.height);
n=Math.max(n,s.minWidth);
k=Math.max(k,s.minHeight);
j=Math.min(j,s.maxWidth);
m=Math.min(m,s.maxHeight);
}return {width:r,height:p,minWidth:n,minHeight:k,maxWidth:j,maxHeight:m};
}}});
})();
(function(){var j="label",i="icon",h="Boolean",g="both",f="String",e="left",d="changeGap",c="changeShow",b="bottom",a="_applyCenter",w="changeIcon",v="qx.ui.basic.Atom",u="changeLabel",t="Integer",s="_applyIconPosition",r="top",q="right",p="_applyRich",o="_applyIcon",n="_applyShow",l="_applyLabel",m="_applyGap",k="atom";
qx.Class.define(v,{extend:qx.ui.core.Widget,construct:function(x,y){{};
arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.Atom());

if(x!=null){this.setLabel(x);
}
if(y!=null){this.setIcon(y);
}},properties:{appearance:{refine:true,init:k},label:{apply:l,nullable:true,check:f,event:u},rich:{check:h,init:false,apply:p},icon:{check:f,apply:o,nullable:true,themeable:true,event:w},gap:{check:t,nullable:false,event:d,apply:m,themeable:true,init:4},show:{init:g,check:[g,j,i],themeable:true,inheritable:true,apply:n,event:c},iconPosition:{init:e,check:[r,q,b,e],themeable:true,apply:s},center:{init:false,check:h,themeable:true,apply:a}},members:{_createChildControlImpl:function(M){var N;

switch(M){case j:N=new qx.ui.basic.Label(this.getLabel());
N.setAnonymous(true);
N.setRich(this.getRich());
this._add(N);

if(this.getLabel()==null||this.getShow()===i){N.exclude();
}break;
case i:N=new qx.ui.basic.Image(this.getIcon());
N.setAnonymous(true);
this._addAt(N,0);

if(this.getIcon()==null||this.getShow()===j){N.exclude();
}break;
}return N||arguments.callee.base.call(this,M);
},_forwardStates:{focused:true,hovered:true},_handleLabel:function(){if(this.getLabel()==null||this.getShow()===i){this._excludeChildControl(j);
}else{this._showChildControl(j);
}},_handleIcon:function(){if(this.getIcon()==null||this.getShow()===j){this._excludeChildControl(i);
}else{this._showChildControl(i);
}},_applyLabel:function(G,H){var I=this.getChildControl(j,true);

if(I){I.setValue(G);
}this._handleLabel();
},_applyRich:function(z,A){var B=this.getChildControl(j,true);

if(B){B.setRich(z);
}},_applyIcon:function(J,K){var L=this.getChildControl(i,true);

if(L){L.setSource(J);
}this._handleIcon();
},_applyGap:function(C,D){this._getLayout().setGap(C);
},_applyShow:function(Q,R){this._handleLabel();
this._handleIcon();
},_applyIconPosition:function(E,F){this._getLayout().setIconPosition(E);
},_applyCenter:function(O,P){this._getLayout().setCenter(O);
}}});
})();
(function(){var k="bottom",j="_applyLayoutChange",h="top",g="left",f="right",e="middle",d="center",c="qx.ui.layout.Atom",b="Integer",a="Boolean";
qx.Class.define(c,{extend:qx.ui.layout.Abstract,properties:{gap:{check:b,init:4,apply:j},iconPosition:{check:[g,h,f,k],init:g,apply:j},center:{check:a,init:false,apply:j}},members:{verifyLayoutProperty:null,renderLayout:function(l,m){var v=qx.ui.layout.Util;
var o=this.getIconPosition();
var r=this._getLayoutChildren();
var length=r.length;
var F,top,E,p;
var A,u;
var y=this.getGap();
var D=this.getCenter();
if(o===k||o===f){var w=length-1;
var s=-1;
var q=-1;
}else{var w=0;
var s=length;
var q=1;
}if(o==h||o==k){if(D){var z=0;

for(var i=w;i!=s;i+=q){p=r[i].getSizeHint().height;

if(p>0){z+=p;

if(i!=w){z+=y;
}}}top=Math.round((m-z)/2);
}else{top=0;
}
for(var i=w;i!=s;i+=q){A=r[i];
u=A.getSizeHint();
E=Math.min(u.maxWidth,Math.max(l,u.minWidth));
p=u.height;
F=v.computeHorizontalAlignOffset(d,E,l);
A.renderLayout(F,top,E,p);
if(p>0){top+=p+y;
}}}else{var t=l;
var n=null;
var C=0;

for(var i=w;i!=s;i+=q){A=r[i];
E=A.getSizeHint().width;

if(E>0){if(!n&&A instanceof qx.ui.basic.Label){n=A;
}else{t-=E;
}C++;
}}
if(C>1){var B=(C-1)*y;
t-=B;
}
if(n){var u=n.getSizeHint();
var x=Math.max(u.minWidth,Math.min(t,u.maxWidth));
t-=x;
}
if(D&&t>0){F=Math.round(t/2);
}else{F=0;
}
for(var i=w;i!=s;i+=q){A=r[i];
u=A.getSizeHint();
p=Math.min(u.maxHeight,Math.max(m,u.minHeight));

if(A===n){E=x;
}else{E=u.width;
}top=v.computeVerticalAlignOffset(e,u.height,m);
A.renderLayout(F,top,E,p);
if(E>0){F+=E+y;
}}}},_computeSizeHint:function(){var Q=this._getLayoutChildren();
var length=Q.length;
var I,O;
if(length===1){var I=Q[0].getSizeHint();
O={width:I.width,height:I.height,minWidth:I.minWidth,minHeight:I.minHeight};
}else{var M=0,N=0;
var J=0,L=0;
var K=this.getIconPosition();
var P=this.getGap();

if(K===h||K===k){var G=0;

for(var i=0;i<length;i++){I=Q[i].getSizeHint();
N=Math.max(N,I.width);
M=Math.max(M,I.minWidth);
if(I.height>0){L+=I.height;
J+=I.minHeight;
G++;
}}
if(G>1){var H=(G-1)*P;
L+=H;
J+=H;
}}else{var G=0;

for(var i=0;i<length;i++){I=Q[i].getSizeHint();
L=Math.max(L,I.height);
J=Math.max(J,I.minHeight);
if(I.width>0){N+=I.width;
M+=I.minWidth;
G++;
}}
if(G>1){var H=(G-1)*P;
N+=H;
M+=H;
}}O={minWidth:M,width:N,minHeight:J,height:L};
}return O;
}}});
})();
(function(){var q="middle",p="qx.ui.layout.Util",o="left",n="center",m="top",k="bottom",j="right";
qx.Class.define(p,{statics:{PERCENT_VALUE:/[0-9]+(?:\.[0-9]+)?%/,computeFlexOffsets:function(T,U,V){var X,bc,W,bd;
var Y=U>V;
var be=Math.abs(U-V);
var bf,ba;
var bb={};

for(bc in T){X=T[bc];
bb[bc]={potential:Y?X.max-X.value:X.value-X.min,flex:Y?X.flex:1/X.flex,offset:0};
}while(be!=0){bd=Infinity;
W=0;

for(bc in bb){X=bb[bc];

if(X.potential>0){W+=X.flex;
bd=Math.min(bd,X.potential/X.flex);
}}if(W==0){break;
}bd=Math.min(be,bd*W)/W;
bf=0;

for(bc in bb){X=bb[bc];

if(X.potential>0){ba=Math.min(be,X.potential,Math.ceil(bd*X.flex));
bf+=ba-bd*X.flex;

if(bf>=1){bf-=1;
ba-=1;
}X.potential-=ba;

if(Y){X.offset+=ba;
}else{X.offset-=ba;
}be-=ba;
}}}return bb;
},computeHorizontalAlignOffset:function(bg,bh,bi,bj,bk){if(bj==null){bj=0;
}
if(bk==null){bk=0;
}var bl=0;

switch(bg){case o:bl=bj;
break;
case j:bl=bi-bh-bk;
break;
case n:bl=Math.round((bi-bh)/2);
if(bl<bj){bl=bj;
}else if(bl<bk){bl=Math.max(bj,bi-bh-bk);
}break;
}return bl;
},computeVerticalAlignOffset:function(F,G,H,I,J){if(I==null){I=0;
}
if(J==null){J=0;
}var K=0;

switch(F){case m:K=I;
break;
case k:K=H-G-J;
break;
case q:K=Math.round((H-G)/2);
if(K<I){K=I;
}else if(K<J){K=Math.max(I,H-G-J);
}break;
}return K;
},collapseMargins:function(x){var y=0,A=0;

for(var i=0,l=arguments.length;i<l;i++){var z=arguments[i];

if(z<0){A=Math.min(A,z);
}else if(z>0){y=Math.max(y,z);
}}return y+A;
},computeHorizontalGaps:function(bm,bn,bo){if(bn==null){bn=0;
}var bp=0;

if(bo){bp+=bm[0].getMarginLeft();

for(var i=1,l=bm.length;i<l;i+=1){bp+=this.collapseMargins(bn,bm[i-1].getMarginRight(),bm[i].getMarginLeft());
}bp+=bm[l-1].getMarginRight();
}else{for(var i=1,l=bm.length;i<l;i+=1){bp+=bm[i].getMarginLeft()+bm[i].getMarginRight();
}bp+=(bn*(l-1));
}return bp;
},computeVerticalGaps:function(B,C,D){if(C==null){C=0;
}var E=0;

if(D){E+=B[0].getMarginTop();

for(var i=1,l=B.length;i<l;i+=1){E+=this.collapseMargins(C,B[i-1].getMarginBottom(),B[i].getMarginTop());
}E+=B[l-1].getMarginBottom();
}else{for(var i=1,l=B.length;i<l;i+=1){E+=B[i].getMarginTop()+B[i].getMarginBottom();
}E+=(C*(l-1));
}return E;
},computeHorizontalSeparatorGaps:function(a,b,c){var f=qx.theme.manager.Decoration.getInstance().resolve(c);
var e=f.getInsets();
var d=e.left+e.right;
var g=0;

for(var i=0,l=a.length;i<l;i++){var h=a[i];
g+=h.getMarginLeft()+h.getMarginRight();
}g+=(b+d+b)*(l-1);
return g;
},computeVerticalSeparatorGaps:function(L,M,N){var Q=qx.theme.manager.Decoration.getInstance().resolve(N);
var P=Q.getInsets();
var O=P.top+P.bottom;
var R=0;

for(var i=0,l=L.length;i<l;i++){var S=L[i];
R+=S.getMarginTop()+S.getMarginBottom();
}R+=(M+O+M)*(l-1);
return R;
},arrangeIdeals:function(r,s,t,u,v,w){if(s<r||v<u){if(s<r&&v<u){s=r;
v=u;
}else if(s<r){v-=(r-s);
s=r;
if(v<u){v=u;
}}else if(v<u){s-=(u-v);
v=u;
if(s<r){s=r;
}}}
if(s>t||v>w){if(s>t&&v>w){s=t;
v=w;
}else if(s>t){v+=(s-t);
s=t;
if(v>w){v=w;
}}else if(v>w){s+=(v-w);
v=w;
if(s>t){s=t;
}}}return {begin:s,end:v};
}}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IStringForm";
qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var m="qx.dynlocale",l="text",k="Boolean",j="qx.client",i="color",h="userSelect",g="changeLocale",f="enabled",d="none",c="on",H="_applyTextAlign",G="qx.ui.core.Widget",F="gecko",E="changeTextAlign",D="_applyWrap",C="changeValue",B="changeContent",A="qx.ui.basic.Label",z="A",y="_applyValue",t="center",u="_applyBuddy",r="String",s="textAlign",p="right",q="changeRich",n="_applyRich",o="click",v="label",w="webkit",x="left";
qx.Class.define(A,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(V){arguments.callee.base.call(this);

if(V!=null){this.setValue(V);
}
if(qx.core.Variant.isSet(m,c)){qx.locale.Manager.getInstance().addListener(g,this._onChangeLocale,this);
}},properties:{rich:{check:k,init:false,event:q,apply:n},wrap:{check:k,init:true,apply:D},value:{check:r,apply:y,event:C,nullable:true},buddy:{check:G,apply:u,nullable:true,init:null},textAlign:{check:[x,t,p],nullable:true,themeable:true,apply:H,event:E},appearance:{refine:true,init:v},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__iW:null,__iX:null,__iY:null,__ja:null,_getContentHint:function(){if(this.__iX){this.__jb=this.__jc();
delete this.__iX;
}return {width:this.__jb.width,height:this.__jb.height};
},_hasHeightForWidth:function(){return this.getRich()&&this.getWrap();
},_applySelectable:function(W){if(qx.core.Variant.isSet(j,F)){if(W&&!this.isRich()){{};
return;
}}arguments.callee.base.call(this,W);
if(qx.core.Variant.isSet(j,w)){this.getContainerElement().setStyle(h,W?l:d);
this.getContentElement().setStyle(h,W?l:d);
}},_getContentHeightForWidth:function(bb){if(!this.getRich()&&!this.getWrap()){return null;
}return this.__jc(bb).height;
},_createContentElement:function(){return new qx.html.Label;
},_applyTextAlign:function(N,O){this.getContentElement().setStyle(s,N);
},_applyTextColor:function(Q,R){if(Q){this.getContentElement().setStyle(i,qx.theme.manager.Color.getInstance().resolve(Q));
}else{this.getContentElement().removeStyle(i);
}},__jb:{width:0,height:0},_applyFont:function(X,Y){var ba;

if(X){this.__iW=qx.theme.manager.Font.getInstance().resolve(X);
ba=this.__iW.getStyles();
}else{this.__iW=null;
ba=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(ba);
this.__iX=true;
qx.ui.core.queue.Layout.add(this);
},__jc:function(I){var M=qx.bom.Label;
var K=this.getFont();
var J=K?this.__iW.getStyles():qx.bom.Font.getDefaultStyles();
var content=this.getValue()||z;
var L=this.getRich();
return L?M.getHtmlSize(content,J,I):M.getTextSize(content,J);
},_applyBuddy:function(a,b){if(b!=null){b.removeBinding(this.__iY);
this.__iY=null;
this.removeListenerById(this.__ja);
this.__ja=null;
}
if(a!=null){this.__iY=a.bind(f,this,f);
this.__ja=this.addListener(o,a.focus,a);
}},_applyRich:function(S){this.getContentElement().setRich(S);
this.__iX=true;
qx.ui.core.queue.Layout.add(this);
},_applyWrap:function(T,U){if(T&&!this.isRich()){{};
}},_onChangeLocale:qx.core.Variant.select(m,{"on":function(e){var content=this.getValue();

if(content&&content.translate){this.setValue(content.translate());
}},"off":null}),_applyValue:function(bc,bd){this.getContentElement().setValue(bc);
this.__iX=true;
qx.ui.core.queue.Layout.add(this);
this.fireDataEvent(B,bc,bd);
}},destruct:function(){if(qx.core.Variant.isSet(m,c)){qx.locale.Manager.getInstance().removeListener(g,this._onChangeLocale,this);
}if(this.__iY!=null){var P=this.getBuddy();

if(P!=null&&!P.isDisposed()){P.removeBinding(this.__iY);
}}this.__iW=this.__iY=null;
}});
})();
(function(){var d="value",c="Please use the getValue() method instead.",b="qx.html.Label",a="Please use the setValue() method instead.";
qx.Class.define(b,{extend:qx.html.Element,members:{__jd:null,_applyProperty:function(name,l){arguments.callee.base.call(this,name,l);

if(name==d){var m=this.getDomElement();
qx.bom.Label.setValue(m,l);
}},_createDomElement:function(){var g=this.__jd;
var f=qx.bom.Label.create(this._content,g);
return f;
},_copyData:function(e){return arguments.callee.base.call(this,true);
},setRich:function(h){var i=this.getDomElement();

if(i){throw new Error("The label mode cannot be modified after initial creation");
}h=!!h;

if(this.__jd==h){return;
}this.__jd=h;
return this;
},setValue:function(j){this._setProperty(d,j);
return this;
},getValue:function(){return this._getProperty(d);
},setContent:function(k){qx.log.Logger.deprecatedMethodWarning(arguments.callee,a);
return this.setValue(k);
},getContent:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,c);
return this.getValue();
}}});
})();
(function(){var j="qx.client",i="gecko",h="div",g="inherit",f="text",e="value",d="",c="hidden",b="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",a="nowrap",A="auto",z="ellipsis",y="normal",x="label",w="px",v="crop",u="end",t="100%",s="visible",r="qx.bom.Label",p="Please use the setValue() method instead.",q="opera",n="Please use the getValue() method instead.",o="block",l="none",m="-1000px",k="absolute";
qx.Class.define(r,{statics:{__je:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__jf:function(){var B=this.__jh(false);
document.body.insertBefore(B,document.body.firstChild);
return this._textElement=B;
},__jg:function(){var U=this.__jh(true);
document.body.insertBefore(U,document.body.firstChild);
return this._htmlElement=U;
},__jh:function(bc){var bd=qx.bom.Element.create(h);
var be=bd.style;
be.width=be.height=A;
be.left=be.top=m;
be.visibility=c;
be.position=k;
be.overflow=s;

if(bc){be.whiteSpace=y;
}else{be.whiteSpace=a;

if(qx.core.Variant.isSet(j,i)){var bf=document.createElementNS(b,x);
for(var bg in this.__je){bf.style[bg]=g;
}bd.appendChild(bf);
}}return bd;
},__ji:function(P){var Q={};

if(P){Q.whiteSpace=y;
}else if(qx.core.Variant.isSet(j,i)){Q.display=o;
}else{Q.overflow=c;
Q.whiteSpace=a;
Q.textOverflow=z;
Q.userSelect=l;
if(qx.core.Variant.isSet(j,q)){Q.OTextOverflow=z;
}}return Q;
},create:function(content,W,X){if(!X){X=window;
}
if(W){var Y=X.document.createElement(h);
Y.useHtml=true;
}else if(qx.core.Variant.isSet(j,i)){var Y=X.document.createElement(h);
var ba=X.document.createElementNS(b,x);
ba.style.cursor=g;
ba.style.color=g;
ba.style.overflow=c;
ba.style.maxWidth=t;
for(var bb in this.__je){ba.style[bb]=g;
}ba.setAttribute(v,u);
Y.appendChild(ba);
}else{var Y=X.document.createElement(h);
qx.bom.element.Style.setStyles(Y,this.__ji(W));
}
if(content){this.setValue(Y,content);
}return Y;
},setValue:function(H,I){I=I||d;

if(H.useHtml){H.innerHTML=I;
}else if(qx.core.Variant.isSet(j,i)){H.firstChild.setAttribute(e,I);
}else{qx.bom.element.Attribute.set(H,f,I);
}},getValue:function(V){if(V.useHtml){return V.innerHTML;
}else if(qx.core.Variant.isSet(j,i)){return V.firstChild.getAttribute(e)||d;
}else{return qx.bom.element.Attribute.get(V,f);
}},getHtmlSize:function(content,C,D){var E=this._htmlElement||this.__jg();
E.style.width=D!==undefined?D+w:A;
E.innerHTML=content;
return this.__jj(E,C);
},getTextSize:function(R,S){var T=this._textElement||this.__jf();

if(qx.core.Variant.isSet(j,i)){T.firstChild.setAttribute(e,R);
}else{qx.bom.element.Attribute.set(T,f,R);
}return this.__jj(T,S);
},__jj:function(K,L){var M=this.__je;

if(!L){L={};
}
for(var N in M){K.style[N]=L[N]||d;
}var O=qx.bom.element.Dimension.getSize(K);

if(qx.core.Variant.isSet(j,i)){if(!qx.bom.client.Platform.WIN){O.width++;
}}return O;
},setContent:function(F,G){qx.log.Logger.deprecatedMethodWarning(arguments.callee,p);
this.setValue(F,G);
},getContent:function(J){qx.log.Logger.deprecatedMethodWarning(arguments.callee,n);
return this.getValue(J);
}}});
})();
(function(){var h="mshtml",g="qx.client",f="qx.bom.element.Dimension",e="paddingRight",d="paddingLeft",c="paddingTop",b="paddingBottom";
qx.Class.define(f,{statics:{getWidth:qx.core.Variant.select(g,{"gecko":function(y){if(y.getBoundingClientRect){var z=y.getBoundingClientRect();
return Math.round(z.right)-Math.round(z.left);
}else{return y.offsetWidth;
}},"default":function(j){return j.offsetWidth;
}}),getHeight:qx.core.Variant.select(g,{"gecko":function(B){if(B.getBoundingClientRect){var C=B.getBoundingClientRect();
return Math.round(C.bottom)-Math.round(C.top);
}else{return B.offsetHeight;
}},"default":function(A){return A.offsetHeight;
}}),getSize:function(i){return {width:this.getWidth(i),height:this.getHeight(i)};
},__jk:{visible:true,hidden:true},getContentWidth:function(k){var m=qx.bom.element.Style;
var n=qx.bom.element.Overflow.getX(k);
var o=parseInt(m.get(k,d),10);
var q=parseInt(m.get(k,e),10);

if(this.__jk[n]){return k.clientWidth-o-q;
}else{if(k.clientWidth>=k.scrollWidth){return Math.max(k.clientWidth,k.scrollWidth)-o-q;
}else{var p=k.scrollWidth-o;
var l=qx.bom.client.Engine;

if(l.NAME===h&&l.VERSION==6){p-=q;
}return p;
}}},getContentHeight:function(r){var t=qx.bom.element.Style;
var v=qx.bom.element.Overflow.getY(r);
var w=parseInt(t.get(r,c),10);
var u=parseInt(t.get(r,b),10);

if(this.__jk[v]){return r.clientHeight-w-u;
}else{if(r.clientHeight>=r.scrollHeight){return Math.max(r.clientHeight,r.scrollHeight)-w-u;
}else{var x=r.scrollHeight-w;
var s=qx.bom.client.Engine;

if(s.NAME===h&&s.VERSION==6){x-=u;
}return x;
}}},getContentSize:function(a){return {width:this.getContentWidth(a),height:this.getContentHeight(a)};
}}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IForm";
qx.Interface.define(a,{events:{"changeEnabled":b,"changeValid":b,"changeInvalidMessage":b,"changeRequired":b},members:{setEnabled:function(e){return arguments.length==1;
},getEnabled:function(){},setRequired:function(c){return arguments.length==1;
},getRequired:function(){},setValid:function(f){return arguments.length==1;
},getValid:function(){},setInvalidMessage:function(d){return arguments.length==1;
},getInvalidMessage:function(){}}});
})();
(function(){var h="Use 'getBlocker().getContentBlockerElement()' instead.",g="Use 'getBlocker().getBlockerElement()' instead.",f="_applyBlockerColor",e="Number",d="__jl",c="qx.ui.core.MBlocker",b="_applyBlockerOpacity",a="Color";
qx.Mixin.define(c,{construct:function(){this.__jl=new qx.ui.core.Blocker(this);
},properties:{blockerColor:{check:a,init:null,nullable:true,apply:f,themeable:true},blockerOpacity:{check:e,init:1,apply:b,themeable:true}},members:{__jl:null,_applyBlockerColor:function(j,k){this.__jl.setColor(j);
},_applyBlockerOpacity:function(l,m){this.__jl.setOpacity(l);
},block:function(){this.__jl.block();
},isBlocked:function(){return this.__jl.isBlocked();
},unblock:function(){this.__jl.unblock();
},forceUnblock:function(){this.__jl.forceUnblock();
},blockContent:function(i){this.__jl.blockContent(i);
},isContentBlocked:function(){return this.__jl.isContentBlocked();
},unblockContent:function(){this.__jl.unblockContent();
},forceUnblockContent:function(){this.__jl.forceUnblockContent();
},_getContentBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,h);
return this.__jl.getContentBlockerElement();
},_getBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,g);
return this.__jl.getBlockerElement();
},getBlocker:function(){return this.__jl;
}},destruct:function(){this._disposeObjects(d);
}});
})();
(function(){var i="qx.ui.window.Window",h="changeModal",g="changeVisibility",f="changeActive",d="__jn",c="_applyActiveWindow",b="__jm",a="qx.ui.window.MDesktop";
qx.Mixin.define(a,{properties:{activeWindow:{check:i,apply:c,init:null,nullable:true}},members:{__jm:null,__jn:null,getWindowManager:function(){if(!this.__jn){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());
}return this.__jn;
},supportsMaximize:function(){return true;
},setWindowManager:function(n){if(this.__jn){this.__jn.setDesktop(null);
}n.setDesktop(this);
this.__jn=n;
},_onChangeActive:function(e){if(e.getData()){this.setActiveWindow(e.getTarget());
}else if(this.getActiveWindow()==e.getTarget()){this.setActiveWindow(null);
}},_applyActiveWindow:function(j,k){this.getWindowManager().changeActiveWindow(j,k);

if(j){j.setActive(true);
}
if(k){k.resetActive();
}},_onChangeModal:function(e){this.getWindowManager().updateStack();
},_onChangeVisibility:function(){this.getWindowManager().updateStack();
},_afterAddChild:function(l){if(qx.Class.isDefined(i)&&l instanceof qx.ui.window.Window){this._addWindow(l);
}},_addWindow:function(p){if(!qx.lang.Array.contains(this.getWindows(),p)){this.getWindows().push(p);
p.addListener(f,this._onChangeActive,this);
p.addListener(h,this._onChangeModal,this);
p.addListener(g,this._onChangeVisibility,this);
}
if(p.getActive()){this.setActiveWindow(p);
}this.getWindowManager().updateStack();
},_afterRemoveChild:function(m){if(qx.Class.isDefined(i)&&m instanceof qx.ui.window.Window){this._removeWindow(m);
}},_removeWindow:function(o){qx.lang.Array.remove(this.getWindows(),o);
o.removeListener(f,this._onChangeActive,this);
o.removeListener(h,this._onChangeModal,this);
o.removeListener(g,this._onChangeVisibility,this);
this.getWindowManager().updateStack();
},getWindows:function(){if(!this.__jm){this.__jm=[];
}return this.__jm;
}},destruct:function(){this._disposeArray(b);
this._disposeObjects(d);
}});
})();
(function(){var p="contextmenu",o="help",n="qx.client",m="changeGlobalCursor",l="abstract",k="Boolean",j="root",i="",h=" !important",g="_applyGlobalCursor",c="_applyNativeHelp",f=";",d="qx.ui.root.Abstract",b="String",a="*";
qx.Class.define(d,{type:l,extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){arguments.callee.base.call(this);
qx.ui.core.FocusHandler.getInstance().addRoot(this);
qx.ui.core.queue.Visibility.add(this);
this.initNativeHelp();
},properties:{appearance:{refine:true,init:j},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:b,nullable:true,themeable:true,apply:g,event:m},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:k,init:false,apply:c}},members:{__jo:null,isRootWidget:function(){return true;
},getLayout:function(){return this._getLayout();
},_applyGlobalCursor:qx.core.Variant.select(n,{"mshtml":function(u,v){},"default":function(q,r){var s=qx.bom.Stylesheet;
var t=this.__jo;

if(!t){this.__jo=t=s.createElement();
}s.removeAllRules(t);

if(q){s.addRule(t,a,qx.bom.element.Cursor.compile(q).replace(f,i)+h);
}}}),_applyNativeContextMenu:function(y,z){if(y){this.removeListener(p,this._onNativeContextMenu,this,true);
}else{this.addListener(p,this._onNativeContextMenu,this,true);
}},_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;
}e.preventDefault();
},_applyNativeHelp:qx.core.Variant.select(n,{"mshtml":function(w,x){if(x===false){qx.bom.Event.removeNativeListener(document,o,qx.lang.Function.returnFalse);
}
if(w===false){qx.bom.Event.addNativeListener(document,o,qx.lang.Function.returnFalse);
}},"default":function(){}})},destruct:function(){this.__jo=null;
},defer:function(A,B){qx.ui.core.MChildrenHandling.remap(B);
}});
})();
(function(){var n="resize",m="position",l="0px",k="webkit",j="paddingLeft",i="$$widget",h="qx.ui.root.Application",g="hidden",f="qx.client",d="div",a="paddingTop",c="100%",b="absolute";
qx.Class.define(h,{extend:qx.ui.root.Abstract,construct:function(s){this.__jp=qx.dom.Node.getWindow(s);
this.__jq=s;
arguments.callee.base.call(this);
qx.event.Registration.addListener(this.__jp,n,this._onResize,this);
this._setLayout(new qx.ui.layout.Canvas());
qx.ui.core.queue.Layout.add(this);
qx.ui.core.FocusHandler.getInstance().connectTo(this);
this.getContentElement().disableScrolling();
},members:{__jp:null,__jq:null,_createContainerElement:function(){var w=this.__jq;

if(qx.core.Variant.isSet(f,k)){if(!w.body){alert("The application could not be started due to a missing body tag in the HTML file!");
}}var A=w.documentElement.style;
var x=w.body.style;
A.overflow=x.overflow=g;
A.padding=A.margin=x.padding=x.margin=l;
A.width=A.height=x.width=x.height=c;
var z=w.createElement(d);
w.body.appendChild(z);
var y=new qx.html.Root(z);
y.setStyle(m,b);
y.setAttribute(i,this.toHashCode());
return y;
},_onResize:function(e){qx.ui.core.queue.Layout.add(this);
},_computeSizeHint:function(){var o=qx.bom.Viewport.getWidth(this.__jp);
var p=qx.bom.Viewport.getHeight(this.__jp);
return {minWidth:o,width:o,maxWidth:o,minHeight:p,height:p,maxHeight:p};
},_applyPadding:function(q,r,name){if(q&&(name==a||name==j)){throw new Error("The root widget does not support 'left', or 'top' paddings!");
}arguments.callee.base.call(this,q,r,name);
},_applyDecorator:function(t,u){arguments.callee.base.call(this,t,u);

if(!t){return;
}var v=this.getDecoratorElement().getInsets();

if(v.left||v.top){throw new Error("The root widget does not support decorators with 'left', or 'top' insets!");
}}},destruct:function(){this.__jp=this.__jq=null;
}});
})();
(function(){var y="zIndex",x="px",w="keydown",v="deactivate",u="This method is not needed anymore.",t="resize",s="keyup",r="keypress",q="backgroundColor",p="_applyOpacity",L="__jz",K="Use 'getBlockerElement' instead.",J="__ju",I="opacity",H="interval",G="Tab",F="Color",E="qx.ui.root.Page",D="__jw",C="Use 'getContentBlockerElement' instead.",A="Number",B="qx.ui.core.Blocker",z="_applyColor";
qx.Class.define(B,{extend:qx.core.Object,construct:function(Q){arguments.callee.base.call(this);
this._widget=Q;
this._isPageRoot=(qx.Class.isDefined(E)&&Q instanceof qx.ui.root.Page);

if(this._isPageRoot){Q.addListener(t,this.__jA,this);
}this.__jr=[];
this.__js=[];
this.__jt=[];
},properties:{color:{check:F,init:null,nullable:true,apply:z,themeable:true},opacity:{check:A,init:1,apply:p,themeable:true}},members:{__ju:null,__jv:0,__jw:null,__jt:null,__jr:null,__js:null,__jx:null,__jy:0,__jz:null,_isPageRoot:false,_widget:null,__jA:function(e){var V=e.getData();

if(this.isContentBlocked()){this.getContentBlockerElement().setStyles({width:V.width,height:V.height});
}
if(this.isBlocked()){this.getBlockerElement().setStyles({width:V.width,height:V.height});
}},_applyColor:function(m,n){var o=qx.theme.manager.Color.getInstance().resolve(m);
this.__jB(q,o);
},_applyOpacity:function(S,T){this.__jB(I,S);
},__jB:function(a,b){var c=[];
this.__ju&&c.push(this.__ju);
this.__jw&&c.push(this.__jw);

for(var i=0;i<c.length;i++){c[i].setStyle(a,b);
}},_saveAndSetAnonymousState:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,u);
this.__jy+=1;

if(this.__jy==1){this.__jx=this._widget.getAnonymous();
this._widget.setAnonymous(true);
}},_restoreAnonymousState:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,u);
this.__jy-=1;

if(this.__jy==0){this._widget.setAnonymous(this.__jx);
}},_backupActiveWidget:function(){var N=qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);
this.__jr.push(N.getActive());
this.__js.push(N.getFocus());

if(this._widget.isFocusable()){this._widget.focus();
}},_restoreActiveWidget:function(){var g=this.__jr.length;

if(g>0){var f=this.__jr[g-1];

if(f){qx.bom.Element.activate(f);
}this.__jr.pop();
}var d=this.__js.length;

if(d>0){var f=this.__js[d-1];

if(f){qx.bom.Element.focus(this.__js[d-1]);
}this.__js.pop();
}},__jC:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());
},_getBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,K);
return this.getBlockerElement();
},getBlockerElement:function(){if(!this.__ju){this.__ju=this.__jC();
this.__ju.setStyle(y,15);
this._widget.getContainerElement().add(this.__ju);
this.__ju.exclude();
}return this.__ju;
},block:function(){this.__jv++;

if(this.__jv<2){this._backupActiveWidget();
var R=this.getBlockerElement();
R.include();
R.activate();
R.addListener(v,this.__jH,this);
R.addListener(r,this.__jG,this);
R.addListener(w,this.__jG,this);
R.addListener(s,this.__jG,this);
}},isBlocked:function(){return this.__jv>0;
},unblock:function(){if(!this.isBlocked()){return;
}this.__jv--;

if(this.__jv<1){this.__jD();
}},forceUnblock:function(){if(!this.isBlocked()){return;
}this.__jv=0;
this.__jD();
},__jD:function(){this._restoreActiveWidget();
var M=this.getBlockerElement();
M.removeListener(v,this.__jH,this);
M.removeListener(r,this.__jG,this);
M.removeListener(w,this.__jG,this);
M.removeListener(s,this.__jG,this);
M.exclude();
},_getContentBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,C);
return this.getContentBlockerElement();
},getContentBlockerElement:function(){if(!this.__jw){this.__jw=this.__jC();
this._widget.getContentElement().add(this.__jw);
this.__jw.exclude();
}return this.__jw;
},blockContent:function(k){var l=this.getContentBlockerElement();
l.setStyle(y,k);
this.__jt.push(k);

if(this.__jt.length<2){l.include();

if(this._isPageRoot){if(!this.__jz){this.__jz=new qx.event.Timer(300);
this.__jz.addListener(H,this.__jF,this);
}this.__jz.start();
this.__jF();
}}},isContentBlocked:function(){return this.__jt.length>0;
},unblockContent:function(){if(!this.isContentBlocked()){return;
}this.__jt.pop();
var O=this.__jt[this.__jt.length-1];
var P=this.getContentBlockerElement();
P.setStyle(y,O);

if(this.__jt.length<1){this.__jE();
}},forceUnblockContent:function(){if(!this.isContentBlocked()){return;
}this.__jt=[];
var U=this.getContentBlockerElement();
U.setStyle(y,null);
this.__jE();
},__jE:function(){this.getContentBlockerElement().exclude();

if(this._isPageRoot){this.__jz.stop();
}},__jF:function(){var h=this._widget.getContainerElement().getDomElement();
var j=qx.dom.Node.getDocument(h);
this.getContentBlockerElement().setStyles({height:j.documentElement.scrollHeight+x,width:j.documentElement.scrollWidth+x});
},__jG:function(e){if(e.getKeyIdentifier()==G){e.stop();
}},__jH:function(){this.getBlockerElement().activate();
}},destruct:function(){if(this._isPageRoot){this._widget.removeListener(t,this.__jA,this);
}this._disposeObjects(D,J,L);
this.__jx=this.__jr=this.__js=this._widget=this.__jt=null;
}});
})();
(function(){var v="cursor",u="100%",t="dblclick",s="mshtml",r="mouseup",q="mousedown",p="disappear",o="appear",n="contextmenu",m="mousewheel",f=")",l="mouseover",i="mouseout",c="qx.html.Blocker",b="click",h="repeat",g="mousemove",j="url(",a="qx.client",k="qx/static/blank.gif",d="absolute";
qx.Class.define(c,{extend:qx.html.Element,construct:function(x,y){arguments.callee.base.call(this);
var x=x?qx.theme.manager.Color.getInstance().resolve(x):null;
this.setStyles({position:d,width:u,height:u,opacity:y||0,backgroundColor:x});
this.addListener(q,this._stopPropagation,this);
this.addListener(r,this._stopPropagation,this);
this.addListener(b,this._stopPropagation,this);
this.addListener(t,this._stopPropagation,this);
this.addListener(g,this._stopPropagation,this);
this.addListener(l,this._stopPropagation,this);
this.addListener(i,this._stopPropagation,this);
this.addListener(m,this._stopPropagation,this);
this.addListener(n,this._stopPropagation,this);
if(qx.core.Variant.isSet(a,s)){this.setStyles({backgroundImage:j+qx.util.ResourceManager.getInstance().toUri(k)+f,backgroundRepeat:h});
}this.addListener(o,this.__jI,this);
this.addListener(p,this.__jI,this);
},members:{_stopPropagation:function(e){e.stopPropagation();
},__jI:function(){var w=this.getStyle(v);
this.setStyle(v,null,true);
this.setStyle(v,w,true);
}}});
})();
(function(){var M="keypress",L="focusout",K="activate",J="Tab",I="singleton",H="deactivate",G="__jJ",F="focusin",E="qx.ui.core.FocusHandler";
qx.Class.define(E,{extend:qx.core.Object,type:I,construct:function(){arguments.callee.base.call(this);
this.__jJ={};
},members:{__jJ:null,__jK:null,__jL:null,__jM:null,connectTo:function(u){u.addListener(M,this.__jN,this);
u.addListener(F,this._onFocusIn,this,true);
u.addListener(L,this._onFocusOut,this,true);
u.addListener(K,this._onActivate,this,true);
u.addListener(H,this._onDeactivate,this,true);
},addRoot:function(bi){this.__jJ[bi.$$hash]=bi;
},removeRoot:function(bh){delete this.__jJ[bh.$$hash];
},getActiveWidget:function(){return this.__jK;
},isActive:function(N){return this.__jK==N;
},getFocusedWidget:function(){return this.__jL;
},isFocused:function(q){return this.__jL==q;
},isFocusRoot:function(P){return !!this.__jJ[P.$$hash];
},_onActivate:function(e){var p=e.getTarget();
this.__jK=p;
var o=this.__jO(p);

if(o!=this.__jM){this.__jM=o;
}},_onDeactivate:function(e){var v=e.getTarget();

if(this.__jK==v){this.__jK=null;
}},_onFocusIn:function(e){var O=e.getTarget();

if(O!=this.__jL){this.__jL=O;
O.visualizeFocus();
}},_onFocusOut:function(e){var n=e.getTarget();

if(n==this.__jL){this.__jL=null;
n.visualizeBlur();
}},__jN:function(e){if(e.getKeyIdentifier()!=J){return;
}
if(!this.__jM){return;
}e.stopPropagation();
e.preventDefault();
var a=this.__jL;

if(!e.isShiftPressed()){var b=a?this.__jS(a):this.__jQ();
}else{var b=a?this.__jT(a):this.__jR();
}if(b){b.tabFocus();
}},__jO:function(Q){var R=this.__jJ;

while(Q){if(R[Q.$$hash]){return Q;
}Q=Q.getLayoutParent();
}return null;
},__jP:function(S,T){if(S===T){return 0;
}var V=S.getTabIndex()||0;
var U=T.getTabIndex()||0;

if(V!=U){return V-U;
}var bb=S.getContainerElement().getDomElement();
var ba=T.getContainerElement().getDomElement();
var Y=qx.bom.element.Location;
var X=Y.get(bb);
var W=Y.get(ba);
if(X.top!=W.top){return X.top-W.top;
}if(X.left!=W.left){return X.left-W.left;
}var bc=S.getZIndex();
var bd=T.getZIndex();

if(bc!=bd){return bc-bd;
}return 0;
},__jQ:function(){return this.__jW(this.__jM,null);
},__jR:function(){return this.__jX(this.__jM,null);
},__jS:function(w){var x=this.__jM;

if(x==w){return this.__jQ();
}
while(w&&w.getAnonymous()){w=w.getLayoutParent();
}
if(w==null){return [];
}var y=[];
this.__jU(x,w,y);
y.sort(this.__jP);
var z=y.length;
return z>0?y[0]:this.__jQ();
},__jT:function(c){var d=this.__jM;

if(d==c){return this.__jR();
}
while(c&&c.getAnonymous()){c=c.getLayoutParent();
}
if(c==null){return [];
}var f=[];
this.__jV(d,c,f);
f.sort(this.__jP);
var g=f.length;
return g>0?f[g-1]:this.__jR();
},__jU:function(parent,h,j){var k=parent.getLayoutChildren();
var m;

for(var i=0,l=k.length;i<l;i++){m=k[i];
if(!(m instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(m)&&m.isEnabled()&&m.isVisible()){if(m.isTabable()&&this.__jP(h,m)<0){j.push(m);
}this.__jU(m,h,j);
}}},__jV:function(parent,A,B){var C=parent.getLayoutChildren();
var D;

for(var i=0,l=C.length;i<l;i++){D=C[i];
if(!(D instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(D)&&D.isEnabled()&&D.isVisible()){if(D.isTabable()&&this.__jP(A,D)>0){B.push(D);
}this.__jV(D,A,B);
}}},__jW:function(parent,r){var s=parent.getLayoutChildren();
var t;

for(var i=0,l=s.length;i<l;i++){t=s[i];
if(!(t instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(t)&&t.isEnabled()&&t.isVisible()){if(t.isTabable()){if(r==null||this.__jP(t,r)<0){r=t;
}}r=this.__jW(t,r);
}}return r;
},__jX:function(parent,be){var bf=parent.getLayoutChildren();
var bg;

for(var i=0,l=bf.length;i<l;i++){bg=bf[i];
if(!(bg instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(bg)&&bg.isEnabled()&&bg.isVisible()){if(bg.isTabable()){if(be==null||this.__jP(bg,be)>0){be=bg;
}}be=this.__jX(bg,be);
}}return be;
}},destruct:function(){this._disposeMap(G);
this.__jL=this.__jK=this.__jM=null;
}});
})();
(function(){var n="qx.client",m="head",l="text/css",k="stylesheet",j="}",h='@import "',g="{",f='";',e="qx.bom.Stylesheet",d="link",c="style";
qx.Class.define(e,{statics:{includeFile:function(T,U){if(!U){U=document;
}var V=U.createElement(d);
V.type=l;
V.rel=k;
V.href=qx.util.ResourceManager.getInstance().toUri(T);
var W=U.getElementsByTagName(m)[0];
W.appendChild(V);
},createElement:qx.core.Variant.select(n,{"mshtml":function(K){var L=document.createStyleSheet();

if(K){L.cssText=K;
}return L;
},"default":function(I){var J=document.createElement(c);
J.type=l;

if(I){J.appendChild(document.createTextNode(I));
}document.getElementsByTagName(m)[0].appendChild(J);
return J.sheet;
}}),addRule:qx.core.Variant.select(n,{"mshtml":function(M,N,O){M.addRule(N,O);
},"default":function(s,t,u){s.insertRule(t+g+u+j,s.cssRules.length);
}}),removeRule:qx.core.Variant.select(n,{"mshtml":function(o,p){var q=o.rules;
var r=q.length;

for(var i=r-1;i>=0;--i){if(q[i].selectorText==p){o.removeRule(i);
}}},"default":function(x,y){var z=x.cssRules;
var A=z.length;

for(var i=A-1;i>=0;--i){if(z[i].selectorText==y){x.deleteRule(i);
}}}}),removeAllRules:qx.core.Variant.select(n,{"mshtml":function(F){var G=F.rules;
var H=G.length;

for(var i=H-1;i>=0;i--){F.removeRule(i);
}},"default":function(be){var bf=be.cssRules;
var bg=bf.length;

for(var i=bg-1;i>=0;i--){be.deleteRule(i);
}}}),addImport:qx.core.Variant.select(n,{"mshtml":function(v,w){v.addImport(w);
},"default":function(a,b){a.insertRule(h+b+f,a.cssRules.length);
}}),removeImport:qx.core.Variant.select(n,{"mshtml":function(B,C){var D=B.imports;
var E=D.length;

for(var i=E-1;i>=0;i--){if(D[i].href==C){B.removeImport(i);
}}},"default":function(P,Q){var R=P.cssRules;
var S=R.length;

for(var i=S-1;i>=0;i--){if(R[i].href==Q){P.deleteRule(i);
}}}}),removeAllImports:qx.core.Variant.select(n,{"mshtml":function(X){var Y=X.imports;
var ba=Y.length;

for(var i=ba-1;i>=0;i--){X.removeImport(i);
}},"default":function(bb){var bc=bb.cssRules;
var bd=bc.length;

for(var i=bd-1;i>=0;i--){if(bc[i].type==bc[i].IMPORT_RULE){bb.deleteRule(i);
}}}})}});
})();
(function(){var b="number",a="qx.ui.layout.Canvas";
qx.Class.define(a,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(c,d){var q=this._getLayoutChildren();
var g,p,n;
var s,top,e,f,j,h;
var o,m,r,k;

for(var i=0,l=q.length;i<l;i++){g=q[i];
p=g.getSizeHint();
n=g.getLayoutProperties();
o=g.getMarginTop();
m=g.getMarginRight();
r=g.getMarginBottom();
k=g.getMarginLeft();
s=n.left!=null?n.left:n.edge;

if(qx.lang.Type.isString(s)){s=Math.round(parseFloat(s)*c/100);
}e=n.right!=null?n.right:n.edge;

if(qx.lang.Type.isString(e)){e=Math.round(parseFloat(e)*c/100);
}top=n.top!=null?n.top:n.edge;

if(qx.lang.Type.isString(top)){top=Math.round(parseFloat(top)*d/100);
}f=n.bottom!=null?n.bottom:n.edge;

if(qx.lang.Type.isString(f)){f=Math.round(parseFloat(f)*d/100);
}if(s!=null&&e!=null){j=c-s-e-k-m;
if(j<p.minWidth){j=p.minWidth;
}else if(j>p.maxWidth){j=p.maxWidth;
}s+=k;
}else{j=n.width;

if(j==null){j=p.width;
}else{j=Math.round(parseFloat(j)*c/100);
if(j<p.minWidth){j=p.minWidth;
}else if(j>p.maxWidth){j=p.maxWidth;
}}
if(e!=null){s=c-j-e-m-k;
}else if(s==null){s=k;
}else{s+=k;
}}if(top!=null&&f!=null){h=d-top-f-o-r;
if(h<p.minHeight){h=p.minHeight;
}else if(h>p.maxHeight){h=p.maxHeight;
}top+=o;
}else{h=n.height;

if(h==null){h=p.height;
}else{h=Math.round(parseFloat(h)*d/100);
if(h<p.minHeight){h=p.minHeight;
}else if(h>p.maxHeight){h=p.maxHeight;
}}
if(f!=null){top=d-h-f-r-o;
}else if(top==null){top=o;
}else{top+=o;
}}g.renderLayout(s,top,j,h);
}},_computeSizeHint:function(){var I=0,H=0;
var F=0,D=0;
var B,A;
var z,x;
var t=this._getLayoutChildren();
var w,G,v;
var J,top,u,y;

for(var i=0,l=t.length;i<l;i++){w=t[i];
G=w.getLayoutProperties();
v=w.getSizeHint();
var E=w.getMarginLeft()+w.getMarginRight();
var C=w.getMarginTop()+w.getMarginBottom();
B=v.width+E;
A=v.minWidth+E;
J=G.left!=null?G.left:G.edge;

if(J&&typeof J===b){B+=J;
A+=J;
}u=G.right!=null?G.right:G.edge;

if(u&&typeof u===b){B+=u;
A+=u;
}I=Math.max(I,B);
H=Math.max(H,A);
z=v.height+C;
x=v.minHeight+C;
top=G.top!=null?G.top:G.edge;

if(top&&typeof top===b){z+=top;
x+=top;
}y=G.bottom!=null?G.bottom:G.edge;

if(y&&typeof y===b){z+=y;
x+=y;
}F=Math.max(F,z);
D=Math.max(D,x);
}return {width:I,minWidth:H,height:F,minHeight:D};
}}});
})();
(function(){var a="qx.html.Root";
qx.Class.define(a,{extend:qx.html.Element,construct:function(c){arguments.callee.base.call(this);

if(c!=null){this.useElement(c);
}},members:{useElement:function(b){arguments.callee.base.call(this,b);
this.setRoot(true);
qx.html.Element._modified[this.$$hash]=this;
}}});
})();
(function(){var m="indexOf",l="addAfter",k="add",j="addBefore",i="_",h="addAt",g="hasChildren",f="removeAt",e="removeAll",d="getChildren",b="remove",c="qx.ui.core.MRemoteChildrenHandling";
qx.Mixin.define(c,{members:{__jY:function(x,y,z,A){var B=this.getChildrenContainer();

if(B===this){x=i+x;
}return (B[x])(y,z,A);
},getChildren:function(){return this.__jY(d);
},hasChildren:function(){return this.__jY(g);
},add:function(n,o){return this.__jY(k,n,o);
},remove:function(a){return this.__jY(b,a);
},removeAll:function(){return this.__jY(e);
},indexOf:function(w){return this.__jY(m,w);
},addAt:function(C,D,E){this.__jY(h,C,D,E);
},addBefore:function(p,q,r){this.__jY(j,p,q,r);
},addAfter:function(t,u,v){this.__jY(l,t,u,v);
},removeAt:function(s){this.__jY(f,s);
}}});
})();
(function(){var a="qx.ui.core.MRemoteLayoutHandling";
qx.Mixin.define(a,{members:{setLayout:function(b){return this.getChildrenContainer().setLayout(b);
},getLayout:function(){return this.getChildrenContainer().getLayout();
}}});
})();
(function(){var k="Boolean",j="resize",i="mousedown",h="w-resize",g="sw-resize",f="n-resize",d="resizableRight",c="ne-resize",b="se-resize",a="Integer",z="e-resize",y="resizableLeft",x="mousemove",w="move",v="shorthand",u="maximized",t="nw-resize",s="mouseout",r="qx.ui.core.MResizable",q="mouseup",o="losecapture",p="resize-frame",m="resizableBottom",n="s-resize",l="resizableTop";
qx.Mixin.define(r,{construct:function(){this.addListener(i,this.__kk,this,true);
this.addListener(q,this.__kl,this);
this.addListener(x,this.__kn,this);
this.addListener(s,this.__ko,this);
this.addListener(o,this.__km,this);
},properties:{resizableTop:{check:k,init:true},resizableRight:{check:k,init:true},resizableBottom:{check:k,init:true},resizableLeft:{check:k,init:true},resizable:{group:[l,d,m,y],mode:v},resizeSensitivity:{check:a,init:5},useResizeFrame:{check:k,init:true}},members:{__ka:null,__kb:null,__kc:null,__kd:null,__ke:null,RESIZE_TOP:1,RESIZE_BOTTOM:2,RESIZE_LEFT:4,RESIZE_RIGHT:8,__kf:function(){var Q=this.__ka;

if(!Q){Q=this.__ka=new qx.ui.core.Widget();
Q.setAppearance(p);
Q.exclude();
qx.core.Init.getApplication().getRoot().add(Q);
}return Q;
},__kg:function(){var O=this.__ke;
var N=this.__kf();
N.setUserBounds(O.left,O.top,O.width,O.height);
N.show();
N.setZIndex(this.getZIndex()+1);
},__kh:function(e){var G=this.__kb;
var H=this.getSizeHint();
var J=this.__ke;
var F=J.width;
var I=J.height;
var L=J.left;
var top=J.top;
var K;

if((G&this.RESIZE_TOP)||(G&this.RESIZE_BOTTOM)){K=e.getDocumentTop()-this.__kd;

if(G&this.RESIZE_TOP){I-=K;
}else{I+=K;
}
if(I<H.minHeight){I=H.minHeight;
}else if(I>H.maxHeight){I=H.maxHeight;
}
if(G&this.RESIZE_TOP){top+=J.height-I;
}}
if((G&this.RESIZE_LEFT)||(G&this.RESIZE_RIGHT)){K=e.getDocumentLeft()-this.__kc;

if(G&this.RESIZE_LEFT){F-=K;
}else{F+=K;
}
if(F<H.minWidth){F=H.minWidth;
}else if(F>H.maxWidth){F=H.maxWidth;
}
if(G&this.RESIZE_LEFT){L+=J.width-F;
}}return {viewportLeft:L,viewportTop:top,parentLeft:J.bounds.left+L-J.left,parentTop:J.bounds.top+top-J.top,width:F,height:I};
},__ki:{1:f,2:n,4:h,8:z,5:t,6:g,9:c,10:b},__kj:function(e){var T=this.getContentLocation();
var R=this.getResizeSensitivity();
var V=e.getDocumentLeft();
var U=e.getDocumentTop();
var S=0;

if(this.getResizableTop()&&Math.abs(T.top-U)<R){S+=this.RESIZE_TOP;
}else if(this.getResizableBottom()&&Math.abs(T.bottom-U)<R){S+=this.RESIZE_BOTTOM;
}
if(this.getResizableLeft()&&Math.abs(T.left-V)<R){S+=this.RESIZE_LEFT;
}else if(this.getResizableRight()&&Math.abs(T.right-V)<R){S+=this.RESIZE_RIGHT;
}this.__kb=S;
},__kk:function(e){if(!this.__kb){return;
}this.addState(j);
this.__kc=e.getDocumentLeft();
this.__kd=e.getDocumentTop();
var location=this.getContainerLocation();
var M=this.getBounds();
this.__ke={top:location.top,left:location.left,width:M.width,height:M.height,bounds:qx.lang.Object.clone(M)};
if(this.getUseResizeFrame()){this.__kg();
}this.capture();
e.stop();
},__kl:function(e){if(!this.hasState(j)){return;
}if(this.getUseResizeFrame()){this.__kf().exclude();
}var P=this.__kh(e);
this.setWidth(P.width);
this.setHeight(P.height);
if(this.getResizableLeft()||this.getResizableTop()){this.setLayoutProperties({left:P.parentLeft,top:P.parentTop});
}this.__kb=0;
this.removeState(j);
this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
this.releaseCapture();
e.stopPropagation();
},__km:function(e){if(!this.__kb){return;
}this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
this.removeState(w);
if(this.getUseResizeFrame()){this.__kf().exclude();
}},__kn:function(e){if(this.hasState(j)){var D=this.__kh(e);
if(this.getUseResizeFrame()){var B=this.__kf();
B.setUserBounds(D.viewportLeft,D.viewportTop,D.width,D.height);
}else{this.setWidth(D.width);
this.setHeight(D.height);
if(this.getResizableLeft()||this.getResizableTop()){this.setLayoutProperties({left:D.parentLeft,top:D.parentTop});
}}e.stopPropagation();
}else if(!this.hasState(u)){this.__kj(e);
var E=this.__kb;
var C=this.getApplicationRoot();

if(E){var A=this.__ki[E];
this.setCursor(A);
C.setGlobalCursor(A);
}else if(this.getCursor()){this.resetCursor();
C.resetGlobalCursor();
}}},__ko:function(e){if(this.getCursor()&&!this.hasState(j)){this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
}}},destruct:function(){if(this.__ka!=null&&!qx.core.ObjectRegistry.inShutDown){this.__ka.destroy();
this.__ka=null;
}}});
})();
(function(){var o="move",n="Boolean",m="mouseup",l="mousedown",k="losecapture",j="qx.ui.core.MMovable",i="mousemove",h="__kq",g="maximized",f="__kp",d="move-frame";
qx.Mixin.define(j,{properties:{movable:{check:n,init:true},useMoveFrame:{check:n,init:false}},members:{__kp:null,__kq:null,__kr:null,__ks:null,__kt:null,__ku:null,__kv:null,__kw:false,__kx:null,__ky:0,_activateMoveHandle:function(p){if(this.__kp){throw new Error("The move handle could not be redefined!");
}this.__kp=p;
p.addListener(l,this._onMoveMouseDown,this);
p.addListener(m,this._onMoveMouseUp,this);
p.addListener(i,this._onMoveMouseMove,this);
p.addListener(k,this.__kC,this);
},__kz:function(){var z=this.__kq;

if(!z){z=this.__kq=new qx.ui.core.Widget();
z.setAppearance(d);
z.exclude();
qx.core.Init.getApplication().getRoot().add(z);
}return z;
},__kA:function(){var location=this.getContainerLocation();
var r=this.getBounds();
var q=this.__kz();
q.setUserBounds(location.left,location.top,r.width,r.height);
q.show();
q.setZIndex(this.getZIndex()+1);
},__kB:function(e){var t=this.__kr;
var w=Math.max(t.left,Math.min(t.right,e.getDocumentLeft()));
var v=Math.max(t.top,Math.min(t.bottom,e.getDocumentTop()));
var s=this.__ks+w;
var u=this.__kt+v;
return {viewportLeft:s,viewportTop:u,parentLeft:s-this.__ku,parentTop:u-this.__kv};
},_onMoveMouseDown:function(e){if(!this.getMovable()||this.hasState(g)){return;
}var parent=this.getLayoutParent();
var b=parent.getContentLocation();
var c=parent.getBounds();
if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(!parent.isContentBlocked()){this.__kw=true;
this.__kx=parent.getBlockerColor();
this.__ky=parent.getBlockerOpacity();
parent.setBlockerColor(null);
parent.setBlockerOpacity(1);
parent.blockContent(this.getZIndex()-1);
}}this.__kr={left:b.left,top:b.top,right:b.left+c.width,bottom:b.top+c.height};
var a=this.getContainerLocation();
this.__ku=b.left;
this.__kv=b.top;
this.__ks=a.left-e.getDocumentLeft();
this.__kt=a.top-e.getDocumentTop();
this.addState(o);
this.__kp.capture();
if(this.getUseMoveFrame()){this.__kA();
}e.stop();
},_onMoveMouseMove:function(e){if(!this.hasState(o)){return;
}var x=this.__kB(e);

if(this.getUseMoveFrame()){this.__kz().setDomPosition(x.viewportLeft,x.viewportTop);
}else{this.setDomPosition(x.parentLeft,x.parentTop);
}e.stopPropagation();
},_onMoveMouseUp:function(e){if(!this.hasState(o)){return;
}this.removeState(o);
var parent=this.getLayoutParent();

if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(this.__kw){parent.unblockContent();
parent.setBlockerColor(this.__kx);
parent.setBlockerOpacity(this.__ky);
this.__kx=null;
this.__ky=0;
}}this.__kp.releaseCapture();
var y=this.__kB(e);
this.setLayoutProperties({left:y.parentLeft,top:y.parentTop});
if(this.getUseMoveFrame()){this.__kz().exclude();
}e.stopPropagation();
},__kC:function(e){if(!this.hasState(o)){return;
}this.removeState(o);
if(this.getUseMoveFrame()){this.__kz().exclude();
}}},destruct:function(){this._disposeObjects(h,f);
this.__kr=null;
}});
})();
(function(){var p="Integer",o="_applyContentPadding",n="resetPaddingRight",m="setPaddingBottom",l="resetPaddingTop",k="qx.ui.core.MContentPadding",j="resetPaddingLeft",i="setPaddingTop",h="setPaddingRight",g="resetPaddingBottom",c="contentPaddingLeft",f="setPaddingLeft",e="contentPaddingTop",b="shorthand",a="contentPaddingRight",d="contentPaddingBottom";
qx.Mixin.define(k,{properties:{contentPaddingTop:{check:p,init:0,apply:o,themeable:true},contentPaddingRight:{check:p,init:0,apply:o,themeable:true},contentPaddingBottom:{check:p,init:0,apply:o,themeable:true},contentPaddingLeft:{check:p,init:0,apply:o,themeable:true},contentPadding:{group:[e,a,d,c],mode:b,themeable:true}},members:{__kD:{contentPaddingTop:i,contentPaddingRight:h,contentPaddingBottom:m,contentPaddingLeft:f},__kE:{contentPaddingTop:l,contentPaddingRight:n,contentPaddingBottom:g,contentPaddingLeft:j},_applyContentPadding:function(q,r,name){var s=this._getContentPaddingTarget();

if(q==null){var t=this.__kE[name];
s[t]();
}else{var u=this.__kD[name];
s[u](q);
}}}});
})();
(function(){var a="qx.ui.window.IWindowManager";
qx.Interface.define(a,{members:{setDesktop:function(c){this.assertInterface(c,qx.ui.window.IDesktop);
},changeActiveWindow:function(d,e){},updateStack:function(){},bringToFront:function(f){this.assertInstance(f,qx.ui.window.Window);
},sendToBack:function(b){this.assertInstance(b,qx.ui.window.Window);
}}});
})();
(function(){var b="qx.ui.window.Manager",a="__kF";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.ui.window.IWindowManager,members:{__kF:null,setDesktop:function(h){this.__kF=h;
this.updateStack();
},getDesktop:function(){return this.__kF;
},changeActiveWindow:function(j,k){if(j){this.bringToFront(j);
}},_minZIndex:1e5,updateStack:function(){qx.ui.core.queue.Widget.add(this);
},syncWidget:function(){this.__kF.forceUnblockContent();
var d=this.__kF.getWindows();
var g=this._minZIndex-1;
var f=false;
var e,c=null;

for(var i=0,l=d.length;i<l;i++){e=d[i];

if(!e.isVisible()){continue;
}g+=2;
e.setZIndex(g);
if(e.getModal()){this.__kF.blockContent(g-1);
}f=f||e.isActive();
c=e;
}
if(!f){this.__kF.setActiveWindow(c);
}},bringToFront:function(m){var n=this.__kF.getWindows();
var o=qx.lang.Array.remove(n,m);

if(o){n.push(m);
this.updateStack();
}},sendToBack:function(p){var q=this.__kF.getWindows();
var r=qx.lang.Array.remove(q,p);

if(r){q.unshift(p);
this.updateStack();
}}},destruct:function(){this._disposeObjects(a);
}});
})();
(function(){var I="Boolean",H="qx.event.type.Event",G="captionbar",F="maximize-button",E="_applyCaptionBarChange",D="restore-button",C="minimize-button",B="close-button",A="maximized",z="execute",bq="pane",bp="title",bo="icon",bn="statusbar-text",bm="statusbar",bl="normal",bk="String",bj="active",bi="beforeClose",bh="beforeMinimize",P="mousedown",Q="changeStatus",N="changeIcon",O="excluded",L="_applyCaption",M="_applyActive",J="beforeRestore",K="minimize",R="dblclick",S="changeModal",Y="_applyShowStatusbar",X="_applyStatus",bb="qx.ui.window.Window",ba="changeCaption",bd="_applyIcon",bc="focusout",U="beforeMaximize",bg="maximize",bf="restore",be="window",T="close",V="changeActive",W="minimized";
qx.Class.define(bb,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling,qx.ui.core.MResizable,qx.ui.core.MMovable,qx.ui.core.MContentPadding],construct:function(g,h){arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.VBox());
this._createChildControl(G);
this._createChildControl(bq);
if(h!=null){this.setIcon(h);
}
if(g!=null){this.setCaption(g);
}this._updateCaptionBar();
this.addListener(P,this._onWindowMouseDown,this,true);
this.addListener(bc,this._onWindowFocusOut,this);
qx.core.Init.getApplication().getRoot().add(this);
this.initVisibility();
qx.ui.core.FocusHandler.getInstance().addRoot(this);
},statics:{DEFAULT_MANAGER_CLASS:qx.ui.window.Manager},events:{"beforeClose":H,"close":H,"beforeMinimize":H,"minimize":H,"beforeMaximize":H,"maximize":H,"beforeRestore":H,"restore":H},properties:{appearance:{refine:true,init:be},visibility:{refine:true,init:O},focusable:{refine:true,init:true},active:{check:I,init:false,apply:M,event:V},modal:{check:I,init:false,event:S},caption:{apply:L,event:ba,nullable:true},icon:{check:bk,nullable:true,apply:bd,event:N,themeable:true},status:{check:bk,nullable:true,apply:X,event:Q},showClose:{check:I,init:true,apply:E,themeable:true},showMaximize:{check:I,init:true,apply:E,themeable:true},showMinimize:{check:I,init:true,apply:E,themeable:true},allowClose:{check:I,init:true,apply:E},allowMaximize:{check:I,init:true,apply:E},allowMinimize:{check:I,init:true,apply:E},showStatusbar:{check:I,init:false,apply:Y}},members:{__kG:null,__kH:null,getChildrenContainer:function(){return this.getChildControl(bq);
},_forwardStates:{active:true,maximized:true},setLayoutParent:function(parent){{};
arguments.callee.base.call(this,parent);
},_createChildControlImpl:function(i){var j;

switch(i){case bm:j=new qx.ui.container.Composite(new qx.ui.layout.HBox());
this._add(j);
j.add(this.getChildControl(bn));
break;
case bn:j=new qx.ui.basic.Label();
j.setValue(this.getStatus());
break;
case bq:j=new qx.ui.container.Composite();
this._add(j,{flex:1});
break;
case G:var l=new qx.ui.layout.Grid();
l.setRowFlex(0,1);
l.setColumnFlex(1,1);
j=new qx.ui.container.Composite(l);
this._add(j);
j.addListener(R,this._onCaptionMouseDblClick,this);
this._activateMoveHandle(j);
break;
case bo:j=new qx.ui.basic.Image(this.getIcon());
this.getChildControl(G).add(j,{row:0,column:0});
break;
case bp:j=new qx.ui.basic.Label(this.getCaption());
j.setWidth(0);
j.setAllowGrowX(true);
var k=this.getChildControl(G);
k.add(j,{row:0,column:1});
break;
case C:j=new qx.ui.form.Button();
j.setFocusable(false);
j.addListener(z,this._onMinimizeButtonClick,this);
this.getChildControl(G).add(j,{row:0,column:2});
break;
case D:j=new qx.ui.form.Button();
j.setFocusable(false);
j.addListener(z,this._onRestoreButtonClick,this);
this.getChildControl(G).add(j,{row:0,column:3});
break;
case F:j=new qx.ui.form.Button();
j.setFocusable(false);
j.addListener(z,this._onMaximizeButtonClick,this);
this.getChildControl(G).add(j,{row:0,column:4});
break;
case B:j=new qx.ui.form.Button();
j.setFocusable(false);
j.addListener(z,this._onCloseButtonClick,this);
this.getChildControl(G).add(j,{row:0,column:6});
break;
}return j||arguments.callee.base.call(this,i);
},_updateCaptionBar:function(){var y;

if(this.getIcon()){this._showChildControl(bo);
}else{this._excludeChildControl(bo);
}
if(this.getCaption()){this._showChildControl(bp);
}else{this._excludeChildControl(bp);
}
if(this.getShowMinimize()){this._showChildControl(C);
y=this.getChildControl(C);
this.getAllowMinimize()?y.resetEnabled():y.setEnabled(false);
}else{this._excludeChildControl(C);
}
if(this.getShowMaximize()){if(this.isMaximized()){this._showChildControl(D);
this._excludeChildControl(F);
}else{this._showChildControl(F);
this._excludeChildControl(D);
}y=this.getChildControl(F);
this.getAllowMaximize()?y.resetEnabled():y.setEnabled(false);
}else{this._excludeChildControl(F);
this._excludeChildControl(D);
}
if(this.getShowClose()){this._showChildControl(B);
y=this.getChildControl(B);
this.getAllowClose()?y.resetEnabled():y.setEnabled(false);
}else{this._excludeChildControl(B);
}},close:function(){if(!this.isVisible()){return;
}
if(this.fireNonBubblingEvent(bi,qx.event.type.Event,[false,true])){this.hide();
this.fireEvent(T);
}},open:function(){this.show();
this.setActive(true);
this.focus();
},center:function(){var parent=this.getLayoutParent();

if(parent){var bt=parent.getBounds();

if(bt){var bu=this.getSizeHint();
var bs=Math.round((bt.width-bu.width)/2);
var top=Math.round((bt.height-bu.height)/2);

if(top<0){top=0;
}this.moveTo(bs,top);
return;
}}{};
},maximize:function(){if(this.isMaximized()){return;
}var parent=this.getLayoutParent();

if(parent!=null&&parent.supportsMaximize()){if(this.fireNonBubblingEvent(U,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();
}var br=this.getLayoutProperties();
this.__kH=br.left===undefined?0:br.left;
this.__kG=br.top===undefined?0:br.top;
this.setLayoutProperties({left:null,top:null,edge:0});
this.addState(A);
this._updateCaptionBar();
this.fireEvent(bg);
}}},minimize:function(){if(!this.isVisible()){return;
}
if(this.fireNonBubblingEvent(bh,qx.event.type.Event,[false,true])){var u=this.getLayoutProperties();
this.__kH=u.left===undefined?0:u.left;
this.__kG=u.top===undefined?0:u.top;
this.removeState(A);
this.hide();
this.fireEvent(K);
}},restore:function(){if(this.getMode()===bl){return;
}
if(this.fireNonBubblingEvent(J,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();
}var m=this.__kH;
var top=this.__kG;
this.setLayoutProperties({edge:null,left:m,top:top});
this.removeState(A);
this._updateCaptionBar();
this.fireEvent(bf);
}},moveTo:function(a,top){if(this.isMaximized()){return;
}this.setLayoutProperties({left:a,top:top});
},isMaximized:function(){return this.hasState(A);
},getMode:function(){if(!this.isVisible()){return W;
}else{if(this.isMaximized()){return A;
}else{return bl;
}}},_applyActive:function(n,o){if(o){this.removeState(bj);
}else{this.addState(bj);
}},_getContentPaddingTarget:function(){return this.getChildControl(bq);
},_applyShowStatusbar:function(s,t){if(s){this._showChildControl(bm);
}else{this._excludeChildControl(bm);
}},_applyCaptionBarChange:function(b,c){this._updateCaptionBar();
},_applyStatus:function(p,q){var r=this.getChildControl(bn,true);

if(r){r.setValue(p);
}},_applyCaption:function(d,f){this.getChildControl(bp).setValue(d);
},_applyIcon:function(v,w){this.getChildControl(bo).setSource(v);
},_onWindowEventStop:function(e){e.stopPropagation();
},_onWindowMouseDown:function(e){this.setActive(true);
},_onWindowFocusOut:function(e){if(this.getModal()){return;
}var x=e.getRelatedTarget();

if(x!=null&&!qx.ui.core.Widget.contains(this,x)){this.setActive(false);
}},_onCaptionMouseDblClick:function(e){if(this.getAllowMaximize()){this.isMaximized()?this.restore():this.maximize();
}},_onMinimizeButtonClick:function(e){this.minimize();
this.getChildControl(C).reset();
},_onRestoreButtonClick:function(e){this.restore();
this.getChildControl(D).reset();
},_onMaximizeButtonClick:function(e){this.maximize();
this.getChildControl(F).reset();
},_onCloseButtonClick:function(e){this.close();
this.getChildControl(B).reset();
}}});
})();
(function(){var a="qx.ui.window.IDesktop";
qx.Interface.define(a,{members:{setWindowManager:function(c){this.assertInterface(c,qx.ui.window.IWindowManager);
},getWindows:function(){},supportsMaximize:function(){},blockContent:function(b){this.assertInteger(b);
},unblockContent:function(){},isContentBlocked:function(){}}});
})();
(function(){var n="_applyLayoutChange",m="top",k="left",j="middle",h="Decorator",g="center",f="_applyReversed",e="bottom",d="qx.ui.layout.VBox",c="Integer",a="right",b="Boolean";
qx.Class.define(d,{extend:qx.ui.layout.Abstract,construct:function(bi,bj,bk){arguments.callee.base.call(this);

if(bi){this.setSpacing(bi);
}
if(bj){this.setAlignY(bj);
}
if(bk){this.setSeparator(bk);
}},properties:{alignY:{check:[m,j,e],init:m,apply:n},alignX:{check:[k,g,a],init:k,apply:n},spacing:{check:c,init:0,apply:n},separator:{check:h,nullable:true,apply:n},reversed:{check:b,init:false,apply:f}},members:{__kI:null,__kJ:null,__kK:null,__kL:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__kM:function(){var bh=this._getLayoutChildren();
var length=bh.length;
var bd=false;
var bc=this.__kI&&this.__kI.length!=length&&this.__kJ&&this.__kI;
var bf;
var be=bc?this.__kI:new Array(length);
var bg=bc?this.__kJ:new Array(length);
if(this.getReversed()){bh=bh.concat().reverse();
}for(var i=0;i<length;i++){bf=bh[i].getLayoutProperties();

if(bf.height!=null){be[i]=parseFloat(bf.height)/100;
}
if(bf.flex!=null){bg[i]=bf.flex;
bd=true;
}else{bg[i]=0;
}}if(!bc){this.__kI=be;
this.__kJ=bg;
}this.__kK=bd;
this.__kL=bh;
delete this._invalidChildrenCache;
},verifyLayoutProperty:null,renderLayout:function(D,E){if(this._invalidChildrenCache){this.__kM();
}var L=this.__kL;
var length=L.length;
var V=qx.ui.layout.Util;
var U=this.getSpacing();
var Y=this.getSeparator();

if(Y){var I=V.computeVerticalSeparatorGaps(L,U,Y);
}else{var I=V.computeVerticalGaps(L,U,true);
}var i,G,H,P;
var Q=[];
var W=I;

for(i=0;i<length;i+=1){P=this.__kI[i];
H=P!=null?Math.floor((E-I)*P):L[i].getSizeHint().height;
Q.push(H);
W+=H;
}if(this.__kK&&W!=E){var N={};
var T,X;

for(i=0;i<length;i+=1){T=this.__kJ[i];

if(T>0){M=L[i].getSizeHint();
N[i]={min:M.minHeight,value:Q[i],max:M.maxHeight,flex:T};
}}var J=V.computeFlexOffsets(N,E,W);

for(i in J){X=J[i].offset;
Q[i]+=X;
W+=X;
}}var top=L[0].getMarginTop();
if(W<E&&this.getAlignY()!=m){top=E-W;

if(this.getAlignY()===j){top=Math.round(top/2);
}}var M,bb,R,H,O,S,K;
this._clearSeparators();
if(Y){var ba=qx.theme.manager.Decoration.getInstance().resolve(Y).getInsets();
var F=ba.top+ba.bottom;
}for(i=0;i<length;i+=1){G=L[i];
H=Q[i];
M=G.getSizeHint();
S=G.getMarginLeft();
K=G.getMarginRight();
R=Math.max(M.minWidth,Math.min(D-S-K,M.maxWidth));
bb=V.computeHorizontalAlignOffset(G.getAlignX()||this.getAlignX(),R,D,S,K);
if(i>0){if(Y){top+=O+U;
this._renderSeparator(Y,{top:top,left:0,height:F,width:D});
top+=F+U+G.getMarginTop();
}else{top+=V.collapseMargins(U,O,G.getMarginTop());
}}G.renderLayout(bb,top,R,H);
top+=H;
O=G.getMarginBottom();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__kM();
}var u=qx.ui.layout.Util;
var C=this.__kL;
var q=0,t=0,s=0;
var o=0,v=0;
var z,p,B;
for(var i=0,l=C.length;i<l;i+=1){z=C[i];
p=z.getSizeHint();
t+=p.height;
var y=this.__kJ[i];
var r=this.__kI[i];

if(y){q+=p.minHeight;
}else if(r){s=Math.max(s,Math.round(p.minHeight/r));
}else{q+=p.height;
}B=z.getMarginLeft()+z.getMarginRight();
if((p.width+B)>v){v=p.width+B;
}if((p.minWidth+B)>o){o=p.minWidth+B;
}}q+=s;
var x=this.getSpacing();
var A=this.getSeparator();

if(A){var w=u.computeVerticalSeparatorGaps(C,x,A);
}else{var w=u.computeVerticalGaps(C,x,true);
}return {minHeight:q+w,height:t+w,minWidth:o,width:v};
}},destruct:function(){this.__kI=this.__kJ=this.__kL=null;
}});
})();
(function(){var n="_applyLayoutChange",m="left",k="center",j="top",h="Decorator",g="middle",f="_applyReversed",e="bottom",d="Boolean",c="right",a="Integer",b="qx.ui.layout.HBox";
qx.Class.define(b,{extend:qx.ui.layout.Abstract,construct:function(D,E,F){arguments.callee.base.call(this);

if(D){this.setSpacing(D);
}
if(E){this.setAlignX(E);
}
if(F){this.setSeparator(F);
}},properties:{alignX:{check:[m,k,c],init:m,apply:n},alignY:{check:[j,g,e],init:j,apply:n},spacing:{check:a,init:0,apply:n},separator:{check:h,nullable:true,apply:n},reversed:{check:d,init:false,apply:f}},members:{__kN:null,__kO:null,__kP:null,__kQ:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__kR:function(){var L=this._getLayoutChildren();
var length=L.length;
var I=false;
var G=this.__kN&&this.__kN.length!=length&&this.__kO&&this.__kN;
var J;
var H=G?this.__kN:new Array(length);
var K=G?this.__kO:new Array(length);
if(this.getReversed()){L=L.concat().reverse();
}for(var i=0;i<length;i++){J=L[i].getLayoutProperties();

if(J.width!=null){H[i]=parseFloat(J.width)/100;
}
if(J.flex!=null){K[i]=J.flex;
I=true;
}else{K[i]=0;
}}if(!G){this.__kN=H;
this.__kO=K;
}this.__kP=I;
this.__kQ=L;
delete this._invalidChildrenCache;
},verifyLayoutProperty:null,renderLayout:function(M,N){if(this._invalidChildrenCache){this.__kR();
}var T=this.__kQ;
var length=T.length;
var bd=qx.ui.layout.Util;
var bc=this.getSpacing();
var bg=this.getSeparator();

if(bg){var Q=bd.computeHorizontalSeparatorGaps(T,bc,bg);
}else{var Q=bd.computeHorizontalGaps(T,bc,true);
}var i,O,ba,Y;
var bf=[];
var U=Q;

for(i=0;i<length;i+=1){Y=this.__kN[i];
ba=Y!=null?Math.floor((M-Q)*Y):T[i].getSizeHint().width;
bf.push(ba);
U+=ba;
}if(this.__kP&&U!=M){var W={};
var bb,be;

for(i=0;i<length;i+=1){bb=this.__kO[i];

if(bb>0){V=T[i].getSizeHint();
W[i]={min:V.minWidth,value:bf[i],max:V.maxWidth,flex:bb};
}}var R=bd.computeFlexOffsets(W,M,U);

for(i in R){be=R[i].offset;
bf[i]+=be;
U+=be;
}}var bk=T[0].getMarginLeft();
if(U<M&&this.getAlignX()!=m){bk=M-U;

if(this.getAlignX()===k){bk=Math.round(bk/2);
}}var V,top,P,ba,S,bi,X;
var bc=this.getSpacing();
this._clearSeparators();
if(bg){var bh=qx.theme.manager.Decoration.getInstance().resolve(bg).getInsets();
var bj=bh.left+bh.right;
}for(i=0;i<length;i+=1){O=T[i];
ba=bf[i];
V=O.getSizeHint();
bi=O.getMarginTop();
X=O.getMarginBottom();
P=Math.max(V.minHeight,Math.min(N-bi-X,V.maxHeight));
top=bd.computeVerticalAlignOffset(O.getAlignY()||this.getAlignY(),P,N,bi,X);
if(i>0){if(bg){bk+=S+bc;
this._renderSeparator(bg,{left:bk,top:0,width:bj,height:N});
bk+=bj+bc+O.getMarginLeft();
}else{bk+=bd.collapseMargins(bc,S,O.getMarginLeft());
}}O.renderLayout(bk,top,ba,P);
bk+=ba;
S=O.getMarginRight();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__kR();
}var u=qx.ui.layout.Util;
var C=this.__kQ;
var o=0,v=0,s=0;
var r=0,t=0;
var z,p,B;
for(var i=0,l=C.length;i<l;i+=1){z=C[i];
p=z.getSizeHint();
v+=p.width;
var y=this.__kO[i];
var q=this.__kN[i];

if(y){o+=p.minWidth;
}else if(q){s=Math.max(s,Math.round(p.minWidth/q));
}else{o+=p.width;
}B=z.getMarginTop()+z.getMarginBottom();
if((p.height+B)>t){t=p.height+B;
}if((p.minHeight+B)>r){r=p.minHeight+B;
}}o+=s;
var x=this.getSpacing();
var A=this.getSeparator();

if(A){var w=u.computeHorizontalSeparatorGaps(C,x,A);
}else{var w=u.computeHorizontalGaps(C,x,true);
}return {minWidth:o+w,width:v+w,minHeight:r,height:t};
}},destruct:function(){this.__kN=this.__kO=this.__kQ=null;
}});
})();
(function(){var dv="left",du="top",dt="_applyLayoutChange",ds="hAlign",dr="flex",dq="vAlign",dp="Integer",dn="minWidth",dm="width",dl="minHeight",di="qx.ui.layout.Grid",dk="height",dj="maxHeight",dh="maxWidth";
qx.Class.define(di,{extend:qx.ui.layout.Abstract,construct:function(df,dg){arguments.callee.base.call(this);
this.__kS=[];
this.__kT=[];

if(df){this.setSpacingX(df);
}
if(dg){this.setSpacingY(dg);
}},properties:{spacingX:{check:dp,init:0,apply:dt},spacingY:{check:dp,init:0,apply:dt}},members:{__kU:null,__kS:null,__kT:null,__kV:null,__kW:null,__kX:null,__kY:null,__la:null,__lb:null,verifyLayoutProperty:null,__lc:function(){var bY=[];
var bX=[];
var ca=[];
var bV=-1;
var bU=-1;
var cc=this._getLayoutChildren();

for(var i=0,l=cc.length;i<l;i++){var bW=cc[i];
var cb=bW.getLayoutProperties();
var cd=cb.row;
var bT=cb.column;
cb.colSpan=cb.colSpan||1;
cb.rowSpan=cb.rowSpan||1;
if(cd==null||bT==null){throw new Error("The layout properties 'row' and 'column' of the child widget '"+bW+"' must be defined!");
}
if(bY[cd]&&bY[cd][bT]){throw new Error("Cannot add widget '"+bW+"'!. "+"There is already a widget '"+bY[cd][bT]+"' in this cell ("+cd+", "+bT+")");
}
for(var x=bT;x<bT+cb.colSpan;x++){for(var y=cd;y<cd+cb.rowSpan;y++){if(bY[y]==undefined){bY[y]=[];
}bY[y][x]=bW;
bU=Math.max(bU,x);
bV=Math.max(bV,y);
}}
if(cb.rowSpan>1){ca.push(bW);
}
if(cb.colSpan>1){bX.push(bW);
}}for(var y=0;y<=bV;y++){if(bY[y]==undefined){bY[y]=[];
}}this.__kU=bY;
this.__kV=bX;
this.__kW=ca;
this.__kX=bV;
this.__kY=bU;
this.__la=null;
this.__lb=null;
delete this._invalidChildrenCache;
},_setRowData:function(ba,bb,bc){var bd=this.__kS[ba];

if(!bd){this.__kS[ba]={};
this.__kS[ba][bb]=bc;
}else{bd[bb]=bc;
}},_setColumnData:function(D,E,F){var G=this.__kT[D];

if(!G){this.__kT[D]={};
this.__kT[D][E]=F;
}else{G[E]=F;
}},setSpacing:function(K){this.setSpacingY(K);
this.setSpacingX(K);
return this;
},setColumnAlign:function(dA,dB,dC){{};
this._setColumnData(dA,ds,dB);
this._setColumnData(dA,dq,dC);
this._applyLayoutChange();
return this;
},getColumnAlign:function(cg){var ch=this.__kT[cg]||{};
return {vAlign:ch.vAlign||du,hAlign:ch.hAlign||dv};
},setRowAlign:function(cV,cW,cX){{};
this._setRowData(cV,ds,cW);
this._setRowData(cV,dq,cX);
this._applyLayoutChange();
return this;
},getRowAlign:function(dW){var dX=this.__kS[dW]||{};
return {vAlign:dX.vAlign||du,hAlign:dX.hAlign||dv};
},getCellWidget:function(dd,de){if(this._invalidChildrenCache){this.__lc();
}var dd=this.__kU[dd]||{};
return dd[de]||null;
},getRowCount:function(){if(this._invalidChildrenCache){this.__lc();
}return this.__kX+1;
},getColumnCount:function(){if(this._invalidChildrenCache){this.__lc();
}return this.__kY+1;
},getCellAlign:function(cE,cF){var cL=du;
var cJ=dv;
var cK=this.__kS[cE];
var cH=this.__kT[cF];
var cG=this.__kU[cE][cF];

if(cG){var cI={vAlign:cG.getAlignY(),hAlign:cG.getAlignX()};
}else{cI={};
}if(cI.vAlign){cL=cI.vAlign;
}else if(cK&&cK.vAlign){cL=cK.vAlign;
}else if(cH&&cH.vAlign){cL=cH.vAlign;
}if(cI.hAlign){cJ=cI.hAlign;
}else if(cH&&cH.hAlign){cJ=cH.hAlign;
}else if(cK&&cK.hAlign){cJ=cK.hAlign;
}return {vAlign:cL,hAlign:cJ};
},setColumnFlex:function(dY,ea){this._setColumnData(dY,dr,ea);
this._applyLayoutChange();
return this;
},getColumnFlex:function(cM){var cN=this.__kT[cM]||{};
return cN.flex!==undefined?cN.flex:0;
},setRowFlex:function(bR,bS){this._setRowData(bR,dr,bS);
this._applyLayoutChange();
return this;
},getRowFlex:function(H){var I=this.__kS[H]||{};
var J=I.flex!==undefined?I.flex:0;
return J;
},setColumnMaxWidth:function(dy,dz){this._setColumnData(dy,dh,dz);
this._applyLayoutChange();
return this;
},getColumnMaxWidth:function(ck){var cl=this.__kT[ck]||{};
return cl.maxWidth!==undefined?cl.maxWidth:Infinity;
},setColumnWidth:function(bg,bh){this._setColumnData(bg,dm,bh);
this._applyLayoutChange();
return this;
},getColumnWidth:function(db){var dc=this.__kT[db]||{};
return dc.width!==undefined?dc.width:null;
},setColumnMinWidth:function(cY,da){this._setColumnData(cY,dn,da);
this._applyLayoutChange();
return this;
},getColumnMinWidth:function(ce){var cf=this.__kT[ce]||{};
return cf.minWidth||0;
},setRowMaxHeight:function(bk,bl){this._setRowData(bk,dj,bl);
this._applyLayoutChange();
return this;
},getRowMaxHeight:function(B){var C=this.__kS[B]||{};
return C.maxHeight||Infinity;
},setRowHeight:function(ci,cj){this._setRowData(ci,dk,cj);
this._applyLayoutChange();
return this;
},getRowHeight:function(bi){var bj=this.__kS[bi]||{};
return bj.height!==undefined?bj.height:null;
},setRowMinHeight:function(be,bf){this._setRowData(be,dl,bf);
this._applyLayoutChange();
return this;
},getRowMinHeight:function(dw){var dx=this.__kS[dw]||{};
return dx.minHeight||0;
},__ld:function(dR){var dV=dR.getSizeHint();
var dU=dR.getMarginLeft()+dR.getMarginRight();
var dT=dR.getMarginTop()+dR.getMarginBottom();
var dS={height:dV.height+dT,width:dV.width+dU,minHeight:dV.minHeight+dT,minWidth:dV.minWidth+dU,maxHeight:dV.maxHeight+dT,maxWidth:dV.maxWidth+dU};
return dS;
},_fixHeightsRowSpan:function(L){var W=this.getSpacingY();

for(var i=0,l=this.__kW.length;i<l;i++){var O=this.__kW[i];
var Q=this.__ld(O);
var R=O.getLayoutProperties();
var N=R.row;
var U=W*(R.rowSpan-1);
var M=U;
var T={};

for(var j=0;j<R.rowSpan;j++){var Y=R.row+j;
var P=L[Y];
var X=this.getRowFlex(Y);

if(X>0){T[Y]={min:P.minHeight,value:P.height,max:P.maxHeight,flex:X};
}U+=P.height;
M+=P.minHeight;
}if(U<Q.height){var V=qx.ui.layout.Util.computeFlexOffsets(T,Q.height,U);

for(var j=0;j<R.rowSpan;j++){var S=V[N+j]?V[N+j].offset:0;
L[N+j].height+=S;
}}if(M<Q.minHeight){var V=qx.ui.layout.Util.computeFlexOffsets(T,Q.minHeight,M);

for(var j=0;j<R.rowSpan;j++){var S=V[N+j]?V[N+j].offset:0;
L[N+j].minHeight+=S;
}}}},_fixWidthsColSpan:function(dD){var dH=this.getSpacingX();

for(var i=0,l=this.__kV.length;i<l;i++){var dE=this.__kV[i];
var dG=this.__ld(dE);
var dJ=dE.getLayoutProperties();
var dF=dJ.column;
var dP=dH*(dJ.colSpan-1);
var dI=dP;
var dK={};
var dM;

for(var j=0;j<dJ.colSpan;j++){var dQ=dJ.column+j;
var dO=dD[dQ];
var dN=this.getColumnFlex(dQ);
if(dN>0){dK[dQ]={min:dO.minWidth,value:dO.width,max:dO.maxWidth,flex:dN};
}dP+=dO.width;
dI+=dO.minWidth;
}if(dP<dG.width){var dL=qx.ui.layout.Util.computeFlexOffsets(dK,dG.width,dP);

for(var j=0;j<dJ.colSpan;j++){dM=dL[dF+j]?dL[dF+j].offset:0;
dD[dF+j].width+=dM;
}}if(dI<dG.minWidth){var dL=qx.ui.layout.Util.computeFlexOffsets(dK,dG.minWidth,dI);

for(var j=0;j<dJ.colSpan;j++){dM=dL[dF+j]?dL[dF+j].offset:0;
dD[dF+j].minWidth+=dM;
}}}},_getRowHeights:function(){if(this.__la!=null){return this.__la;
}var z=[];
var q=this.__kX;
var p=this.__kY;

for(var A=0;A<=q;A++){var r=0;
var t=0;
var s=0;

for(var w=0;w<=p;w++){var o=this.__kU[A][w];

if(!o){continue;
}var u=o.getLayoutProperties().rowSpan||0;

if(u>1){continue;
}var v=this.__ld(o);

if(this.getRowFlex(A)>0){r=Math.max(r,v.minHeight);
}else{r=Math.max(r,v.height);
}t=Math.max(t,v.height);
}var r=Math.max(r,this.getRowMinHeight(A));
var s=this.getRowMaxHeight(A);

if(this.getRowHeight(A)!==null){var t=this.getRowHeight(A);
}else{var t=Math.max(r,Math.min(t,s));
}z[A]={minHeight:r,height:t,maxHeight:s};
}
if(this.__kW.length>0){this._fixHeightsRowSpan(z);
}this.__la=z;
return z;
},_getColWidths:function(){if(this.__lb!=null){return this.__lb;
}var e=[];
var b=this.__kY;
var d=this.__kX;

for(var m=0;m<=b;m++){var h=0;
var g=0;
var c=Infinity;

for(var n=0;n<=d;n++){var a=this.__kU[n][m];

if(!a){continue;
}var f=a.getLayoutProperties().colSpan||0;

if(f>1){continue;
}var k=this.__ld(a);

if(this.getColumnFlex(m)>0){g=Math.max(g,k.minWidth);
}else{g=Math.max(g,k.width);
}h=Math.max(h,k.width);
}var g=Math.max(g,this.getColumnMinWidth(m));
var c=this.getColumnMaxWidth(m);

if(this.getColumnWidth(m)!==null){var h=this.getColumnWidth(m);
}else{var h=Math.max(g,Math.min(h,c));
}e[m]={minWidth:g,width:h,maxWidth:c};
}
if(this.__kV.length>0){this._fixWidthsColSpan(e);
}this.__lb=e;
return e;
},_getColumnFlexOffsets:function(cO){var cP=this.getSizeHint();
var cT=cO-cP.width;

if(cT==0){return {};
}var cR=this._getColWidths();
var cQ={};

for(var i=0,l=cR.length;i<l;i++){var cU=cR[i];
var cS=this.getColumnFlex(i);

if((cS<=0)||(cU.width==cU.maxWidth&&cT>0)||(cU.width==cU.minWidth&&cT<0)){continue;
}cQ[i]={min:cU.minWidth,value:cU.width,max:cU.maxWidth,flex:cS};
}return qx.ui.layout.Util.computeFlexOffsets(cQ,cO,cP.width);
},_getRowFlexOffsets:function(cx){var cy=this.getSizeHint();
var cB=cx-cy.height;

if(cB==0){return {};
}var cC=this._getRowHeights();
var cz={};

for(var i=0,l=cC.length;i<l;i++){var cD=cC[i];
var cA=this.getRowFlex(i);

if((cA<=0)||(cD.height==cD.maxHeight&&cB>0)||(cD.height==cD.minHeight&&cB<0)){continue;
}cz[i]={min:cD.minHeight,value:cD.height,max:cD.maxHeight,flex:cA};
}return qx.ui.layout.Util.computeFlexOffsets(cz,cx,cy.height);
},renderLayout:function(bm,bn){if(this._invalidChildrenCache){this.__lc();
}var bB=qx.ui.layout.Util;
var bp=this.getSpacingX();
var bv=this.getSpacingY();
var bG=this._getColWidths();
var bF=this._getColumnFlexOffsets(bm);
var bq=[];
var bI=this.__kY;
var bo=this.__kX;
var bH;

for(var bJ=0;bJ<=bI;bJ++){bH=bF[bJ]?bF[bJ].offset:0;
bq[bJ]=bG[bJ].width+bH;
}var by=this._getRowHeights();
var bA=this._getRowFlexOffsets(bn);
var bP=[];

for(var bw=0;bw<=bo;bw++){bH=bA[bw]?bA[bw].offset:0;
bP[bw]=by[bw].height+bH;
}var bQ=0;

for(var bJ=0;bJ<=bI;bJ++){var top=0;

for(var bw=0;bw<=bo;bw++){var bD=this.__kU[bw][bJ];
if(!bD){top+=bP[bw]+bv;
continue;
}var br=bD.getLayoutProperties();
if(br.row!==bw||br.column!==bJ){top+=bP[bw]+bv;
continue;
}var bO=bp*(br.colSpan-1);

for(var i=0;i<br.colSpan;i++){bO+=bq[bJ+i];
}var bE=bv*(br.rowSpan-1);

for(var i=0;i<br.rowSpan;i++){bE+=bP[bw+i];
}var bs=bD.getSizeHint();
var bM=bD.getMarginTop();
var bC=bD.getMarginLeft();
var bz=bD.getMarginBottom();
var bu=bD.getMarginRight();
var bx=Math.max(bs.minWidth,Math.min(bO-bC-bu,bs.maxWidth));
var bN=Math.max(bs.minHeight,Math.min(bE-bM-bz,bs.maxHeight));
var bK=this.getCellAlign(bw,bJ);
var bL=bQ+bB.computeHorizontalAlignOffset(bK.hAlign,bx,bO,bC,bu);
var bt=top+bB.computeVerticalAlignOffset(bK.vAlign,bN,bE,bM,bz);
bD.renderLayout(bL,bt,bx,bN);
top+=bP[bw]+bv;
}bQ+=bq[bJ]+bp;
}},invalidateLayoutCache:function(){arguments.callee.base.call(this);
this.__lb=null;
this.__la=null;
},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__lc();
}var cq=this._getColWidths();
var cs=0,ct=0;

for(var i=0,l=cq.length;i<l;i++){var cu=cq[i];

if(this.getColumnFlex(i)>0){cs+=cu.minWidth;
}else{cs+=cu.width;
}ct+=cu.width;
}var cv=this._getRowHeights();
var co=0,cr=0;

for(var i=0,l=cv.length;i<l;i++){var cw=cv[i];

if(this.getRowFlex(i)>0){co+=cw.minHeight;
}else{co+=cw.height;
}cr+=cw.height;
}var cn=this.getSpacingX()*(cq.length-1);
var cm=this.getSpacingY()*(cv.length-1);
var cp={minWidth:cs+cn,width:ct+cn,minHeight:co+cm,height:cr+cm};
return cp;
}},destruct:function(){this.__kU=this.__kS=this.__kT=this.__kV=this.__kW=this.__lb=this.__la=null;
}});
})();
(function(){var n="execute",m="toolTipText",l="icon",k="label",j="qx.ui.core.MExecutable",h="value",g="qx.event.type.Event",f="_applyCommand",d="enabled",c="menu",a="changeCommand",b="qx.ui.core.Command";
qx.Mixin.define(j,{events:{"execute":g},properties:{command:{check:b,apply:f,event:a,nullable:true}},members:{__le:null,__lf:false,__lg:null,_bindableProperties:[d,k,l,m,h,c],execute:function(){var u=this.getCommand();

if(u){if(this.__lf){this.__lf=false;
}else{this.__lf=true;
u.execute(this);
}}this.fireEvent(n);
},__lh:function(e){if(this.__lf){this.__lf=false;
return;
}this.__lf=true;
this.execute();
},_applyCommand:function(o,p){if(p!=null){p.removeListenerById(this.__lg);
}
if(o!=null){this.__lg=o.addListener(n,this.__lh,this);
}var s=this.__le;

if(s==null){this.__le=s={};
}
for(var i=0;i<this._bindableProperties.length;i++){var r=this._bindableProperties[i];
if(p!=null&&s[r]!=null){p.removeBinding(s[r]);
s[r]=null;
}if(o!=null&&qx.Class.hasProperty(this.constructor,r)){var q=o.get(r);

if(q==null){var t=this.get(r);
}s[r]=o.bind(r,this,r);
if(t){this.set(r,t);
}}}}},destruct:function(){this.__le=null;
}});
})();
(function(){var b="qx.ui.form.IExecutable",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"execute":a},members:{setCommand:function(c){return arguments.length==1;
},getCommand:function(){},execute:function(){}}});
})();
(function(){var o="pressed",n="abandoned",m="hovered",l="Enter",k="Space",j="dblclick",i="qx.ui.form.Button",h="mouseup",g="mousedown",f="mouseover",b="mouseout",d="keydown",c="button",a="keyup";
qx.Class.define(i,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],construct:function(p,q,r){arguments.callee.base.call(this,p,q);

if(r!=null){this.setCommand(r);
}this.addListener(f,this._onMouseOver);
this.addListener(b,this._onMouseOut);
this.addListener(g,this._onMouseDown);
this.addListener(h,this._onMouseUp);
this.addListener(d,this._onKeyDown);
this.addListener(a,this._onKeyUp);
this.addListener(j,this._onStopEvent);
},properties:{appearance:{refine:true,init:c},focusable:{refine:true,init:true}},members:{_forwardStates:{focused:true,hovered:true,pressed:true,disabled:true},press:function(){if(this.hasState(n)){return;
}this.addState(o);
},release:function(){if(this.hasState(o)){this.removeState(o);
}},reset:function(){this.removeState(o);
this.removeState(n);
this.removeState(m);
},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(n)){this.removeState(n);
this.addState(o);
}this.addState(m);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(m);

if(this.hasState(o)){this.removeState(o);
this.addState(n);
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}e.stopPropagation();
this.capture();
this.removeState(n);
this.addState(o);
},_onMouseUp:function(e){this.releaseCapture();
var s=this.hasState(o);
var t=this.hasState(n);

if(s){this.removeState(o);
}
if(t){this.removeState(n);
}else{this.addState(m);

if(s){this.execute();
}}e.stopPropagation();
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case l:case k:this.removeState(n);
this.addState(o);
e.stopPropagation();
}},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case l:case k:if(this.hasState(o)){this.removeState(n);
this.removeState(o);
this.execute();
e.stopPropagation();
}}}}});
})();
(function(){var b="qx.ui.core.ISingleSelection",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeSelection":a},members:{getSelection:function(){return true;
},setSelection:function(c){return arguments.length==1;
},resetSelection:function(){return true;
},isSelected:function(d){return arguments.length==1;
},isSelectionEmpty:function(){return true;
},getSelectables:function(){return true;
}}});
})();
(function(){var o="pane",n="lastTab",m="bar",k="page",j="firstTab",h="right",g="bottom",f="button",d="changeSelection",c="close",C="top",B="left",A="__lj",z="qx.event.type.Data",y="barRight",x="beforeChangeSelection",w="tabview",v="vertical",u="_applyBarPosition",t="barLeft",r="horizontal",s="qx.ui.tabview.TabView",p="barTop",q="barBottom";
qx.Class.define(s,{extend:qx.ui.core.Widget,implement:qx.ui.core.ISingleSelection,include:[qx.ui.core.MContentPadding],construct:function(bg){arguments.callee.base.call(this);
this.__li={top:p,right:y,bottom:q,left:t};
this._createChildControl(m);
this._createChildControl(o);
var bh=this.__lj=new qx.ui.form.RadioGroup;
bh.setWrap(false);
bh.addListener(d,this._onChangeSelection,this);
if(bg!=null){this.setBarPosition(bg);
}else{this.initBarPosition();
}},events:{"changeSelection":z},properties:{appearance:{refine:true,init:w},barPosition:{check:[B,h,C,g],init:C,apply:u}},members:{__lj:null,_createChildControlImpl:function(bk){var bl;

switch(bk){case m:bl=new qx.ui.container.SlideBar();
bl.setZIndex(10);
this._add(bl);
break;
case o:bl=new qx.ui.container.Stack;
bl.setZIndex(5);
this._add(bl,{flex:1});
break;
}return bl||arguments.callee.base.call(this,bk);
},_getContentPaddingTarget:function(){return this.getChildControl(o);
},add:function(F){{};
var G=F.getButton();
var H=this.getChildControl(m);
var J=this.getChildControl(o);
F.exclude();
H.add(G);
J.add(F);
this.__lj.add(G);
F.addState(this.__li[this.getBarPosition()]);
F.addState(n);
var I=this.getChildren();

if(I[0]==F){F.addState(j);
}else{I[I.length-2].removeState(n);
}F.addListener(c,this._onPageClose,this);
},remove:function(K){var P=this.getChildControl(o);
var N=this.getChildControl(m);
var M=K.getButton();
var O=P.getChildren();
if(this.getSelection()[0]==K){var L=O.indexOf(K);

if(L==0){if(O[1]){this.setSelection([O[1]]);
}else{this.resetSelection();
}}else{this.setSelection([O[L-1]]);
}}N.remove(M);
P.remove(K);
this.__lj.remove(M);
K.removeState(this.__li[this.getBarPosition()]);
if(K.hasState(j)){K.removeState(j);

if(O[0]){O[0].addState(j);
}}
if(K.hasState(n)){K.removeState(n);

if(O.length>0){O[O.length-1].addState(n);
}}K.removeListener(c,this._onPageClose,this);
},getChildren:function(){return this.getChildControl(o).getChildren();
},indexOf:function(bo){return this.getChildControl(o).indexOf(bo);
},__li:null,_applyBarPosition:function(Q,R){var S=this.getChildControl(m);
var X=Q==B||Q==h;
var V=Q==h||Q==g;
var W=X?qx.ui.layout.HBox:qx.ui.layout.VBox;
var ba=this._getLayout();

if(ba&&ba instanceof W){}else{this._setLayout(ba=new W);
}ba.setReversed(V);
S.setOrientation(X?v:r);
var Y=this.getChildren();
if(R){var T=this.__li[R];
S.removeState(T);
for(var i=0,l=Y.length;i<l;i++){Y[i].removeState(T);
}}
if(Q){var U=this.__li[Q];
S.addState(U);
for(var i=0,l=Y.length;i<l;i++){Y[i].addState(U);
}}},getSelection:function(){var a=this.__lj.getSelection();
var b=[];

for(var i=0;i<a.length;i++){b.push(a[i].getUserData(k));
}return b;
},setSelection:function(bi){var bj=[];

for(var i=0;i<bi.length;i++){bj.push(bi[i].getChildControl(f));
}this.__lj.setSelection(bj);
},resetSelection:function(){this.__lj.resetSelection();
},isSelected:function(bm){var bn=bm.getChildControl(f);
return this.__lj.isSelected(bn);
},isSelectionEmpty:function(){return this.__lj.isSelectionEmpty();
},getSelectables:function(){var D=this.__lj.getSelectables();
var E=[];

for(var i=0;i<D.length;i++){E.push(D[i].getUserData(k));
}return E;
},_onChangeSelection:function(e){var bf=this.getChildControl(o);
var bc=e.getData()[0];

if(bc){bf.setSelection([bc.getUserData(k)]);
bc.focus();
this.scrollChildIntoView(bc,null,null,false);
}else{bf.resetSelection();
}var be=bf.getSelection();
var bd=e.getOldData();
this.fireDataEvent(d,be,bd);
},_onBeforeChangeSelection:function(e){if(!this.fireNonBubblingEvent(x,qx.event.type.Event,[false,true])){e.preventDefault();
}},_onRadioChangeSelection:function(e){var bb=e.getData()[0];

if(bb){this.setSelection([bb.getUserData(k)]);
}else{this.resetSelection();
}},_onPageClose:function(e){this.remove(e.getTarget());
}},destruct:function(){this._disposeObjects(A);
this.__li=null;
}});
})();
(function(){var a="qx.ui.form.IModelSelection";
qx.Interface.define(a,{members:{setModelSelection:function(b){},getModelSelection:function(){}}});
})();
(function(){var f="qx.ui.core.MSingleSelectionHandling",d="changeSelection",c="changeSelected",b="__lk",a="qx.event.type.Data";
qx.Mixin.define(f,{events:{"changeSelection":a},members:{__lk:null,getSelection:function(){var l=this.__ll().getSelected();

if(l){return [l];
}else{return [];
}},setSelection:function(j){if(!this.getEnabled()){this.warn("Setting the selection on disabled '"+this.classname+"' is deprecated: "+("The current behavior will change from doing nothing to selectiong the given items."));
this.trace();
}
switch(j.length){case 0:this.resetSelection();
break;
case 1:this.__ll().setSelected(j[0]);
break;
default:throw new Error("Could only select one item, but the selection "+" array contains "+j.length+" items!");
}},resetSelection:function(){if(!this.getEnabled()){this.warn("Resetting the selection on disabled '"+this.classname+"' is deprecated: "+("The current behavior will change from doing nothing to reset the selection."));
this.trace();
}this.__ll().resetSelected();
},isSelected:function(m){return this.__ll().isSelected(m);
},isSelectionEmpty:function(){return this.__ll().isSelectionEmpty();
},getSelectables:function(){return this.__ll().getSelectables();
},_onChangeSelected:function(e){var i=e.getData();
var h=e.getOldData();
i==null?i=[]:i=[i];
h==null?h=[]:h=[h];
this.fireDataEvent(d,i,h);
},__ll:function(){if(this.__lk==null){var k=this;
this.__lk=new qx.ui.core.SingleSelectionManager({getItems:function(){return k._getItems();
},isItemSelectable:function(g){if(k._isItemSelectable){return k._isItemSelectable(g);
}else{return g.isEnabled()&&g.isVisible();
}}});
this.__lk.addListener(c,this._onChangeSelected,this);
}this.__lk.setAllowEmptySelection(this._isAllowEmptySelection());
return this.__lk;
}},destruct:function(){this._disposeObjects(b);
}});
})();
(function(){var n="change",m="__lm",l="qx.event.type.Data",k="qx.ui.form.MModelSelection",h="changeSelection";
qx.Mixin.define(k,{construct:function(){this.__lm=new qx.data.Array();
this.__lm.addListener(n,this.__lp,this);
this.addListener(h,this.__lo,this);
},events:{changeModelSelection:l},members:{__lm:null,__ln:false,__lo:function(){if(this.__ln){return;
}var q=this.getSelection();
var o=[];

for(var i=0;i<q.length;i++){var r=q[i];
var p=r.getModel?r.getModel():null;

if(p!==null){o.push(p);
}}this.setModelSelection(o);
},__lp:function(){this.__ln=true;
var b=this.getSelectables();
var d=[];
var c=this.__lm.toArray();

for(var i=0;i<c.length;i++){var f=c[i];

for(var j=0;j<b.length;j++){var g=b[j];
var a=g.getModel?g.getModel():null;

if(f===a){d.push(g);
break;
}}}this.setSelection(d);
this.__ln=false;
var e=this.getSelection();

if(!qx.lang.Array.equals(e,d)){this.__lo();
}},getModelSelection:function(){return this.__lm;
},setModelSelection:function(s){if(!s){this.__lm.removeAll();
return;
}{};
s.unshift(this.__lm.getLength());
s.unshift(0);
var t=this.__lm.splice.apply(this.__lm,s);
t.dispose();
}},destruct:function(){this._disposeObjects(m);
}});
})();
(function(){var t="Boolean",s="changeValue",r="_applyAllowEmptySelection",q="_applyInvalidMessage",p="qx.ui.form.RadioGroup",o="_applyValid",n="__lq",m="",k="changeRequired",j="changeValid",f="changeEnabled",h="changeInvalidMessage",g="changeSelection",d="_applyEnabled",c="String";
qx.Class.define(p,{extend:qx.core.Object,implement:[qx.ui.core.ISingleSelection,qx.ui.form.IForm,qx.ui.form.IModelSelection],include:[qx.ui.core.MSingleSelectionHandling,qx.ui.form.MModelSelection],construct:function(C){arguments.callee.base.call(this);
this.__lq=[];
this.addListener(g,this.__lr,this);

if(C!=null){this.add.apply(this,arguments);
}},properties:{enabled:{check:t,apply:d,event:f,init:true},wrap:{check:t,init:true},allowEmptySelection:{check:t,init:false,apply:r},valid:{check:t,init:true,apply:o,event:j},required:{check:t,init:false,event:k},invalidMessage:{check:c,init:m,event:h,apply:q}},members:{__lq:null,getItems:function(){return this.__lq;
},add:function(L){var M=this.__lq;
var N;

for(var i=0,l=arguments.length;i<l;i++){N=arguments[i];

if(qx.lang.Array.contains(M,N)){continue;
}N.addListener(s,this._onItemChangeChecked,this);
M.push(N);
N.setGroup(this);
if(N.getValue()){this.setSelection([N]);
}}if(!this.isAllowEmptySelection()&&M.length>0&&!this.getSelection()[0]){this.setSelection([M[0]]);
}},remove:function(O){var P=this.__lq;

if(qx.lang.Array.contains(P,O)){qx.lang.Array.remove(P,O);
if(O.getGroup()===this){O.resetGroup();
}O.removeListener(s,this._onItemChangeChecked,this);
if(O.getValue()){this.resetSelection();
}}},getChildren:function(){return this.__lq;
},_onItemChangeChecked:function(e){var F=e.getTarget();

if(F.getValue()){this.setSelection([F]);
}else if(this.getSelection()[0]==F){this.resetSelection();
}},_applyInvalidMessage:function(A,B){for(var i=0;i<this.__lq.length;i++){this.__lq[i].setInvalidMessage(A);
}},_applyValid:function(a,b){for(var i=0;i<this.__lq.length;i++){this.__lq[i].setValid(a);
}},_applyEnabled:function(x,y){var z=this.__lq;

if(x==null){for(var i=0,l=z.length;i<l;i++){z[i].resetEnabled();
}}else{for(var i=0,l=z.length;i<l;i++){z[i].setEnabled(x);
}}},_applyAllowEmptySelection:function(J,K){if(!J&&this.isSelectionEmpty()){this.resetSelection();
}},selectNext:function(){var u=this.getSelection()[0];
var w=this.__lq;
var v=w.indexOf(u);

if(v==-1){return;
}var i=0;
var length=w.length;
if(this.getWrap()){v=(v+1)%length;
}else{v=Math.min(v+1,length-1);
}
while(i<length&&!w[v].getEnabled()){v=(v+1)%length;
i++;
}this.setSelection([w[v]]);
},selectPrevious:function(){var G=this.getSelection()[0];
var I=this.__lq;
var H=I.indexOf(G);

if(H==-1){return;
}var i=0;
var length=I.length;
if(this.getWrap()){H=(H-1+length)%length;
}else{H=Math.max(H-1,0);
}
while(i<length&&!I[H].getEnabled()){H=(H-1+length)%length;
i++;
}this.setSelection([I[H]]);
},_getItems:function(){return this.getItems();
},_isAllowEmptySelection:function(){return this.isAllowEmptySelection();
},__lr:function(e){var E=e.getData()[0];
var D=e.getOldData()[0];

if(D){D.setValue(false);
}
if(E){E.setValue(true);
}}},destruct:function(){this._disposeArray(n);
}});
})();
(function(){var j="Boolean",h="qx.ui.core.SingleSelectionManager",g="__lu",f="__ls",e="__lt",d="changeSelected",c="qx.event.type.Data";
qx.Class.define(h,{extend:qx.core.Object,construct:function(u){arguments.callee.base.call(this);
{};
this.__ls=u;
},events:{"changeSelected":c},properties:{allowEmptySelection:{check:j,init:true,apply:g}},members:{__lt:null,__ls:null,getSelected:function(){return this.__lt;
},setSelected:function(t){if(!this.__lw(t)){throw new Error("Could not select "+t+", because it is not a child element!");
}this.__lv(t);
},resetSelected:function(){this.__lv(null);
},isSelected:function(o){if(!this.__lw(o)){throw new Error("Could not check if "+o+" is selected,"+" because it is not a child element!");
}return this.__lt===o;
},isSelectionEmpty:function(){return this.__lt==null;
},getSelectables:function(){var k=this.__ls.getItems();
var l=[];

for(var i=0;i<k.length;i++){if(this.__ls.isItemSelectable(k[i])){l.push(k[i]);
}}return l;
},__lu:function(a,b){if(!a){this.__lv(this.__lt);
}},__lv:function(p){var s=this.__lt;
var r=p;

if(r!=null&&s===r){return;
}
if(!this.isAllowEmptySelection()&&r==null){var q=this.getSelectables()[0];

if(q){r=q;
}}this.__lt=r;
this.fireDataEvent(d,r,s);
},__lw:function(m){var n=this.__ls.getItems();

for(var i=0;i<n.length;i++){if(n[i]===m){return true;
}}return false;
}},destruct:function(){if(this.__ls.toHashCode){this._disposeObjects(f);
}else{this.__ls=null;
}this._disposeObjects(e);
}});
})();
(function(){var h="[",g="]",f=".",d="idBubble",c="changeBubble",b="qx.data.marshal.MEventBubbling",a="qx.event.type.Data";
qx.Mixin.define(b,{events:{"changeBubble":a},members:{_applyEventPropagation:function(i,j,name){this.fireDataEvent(c,{value:i,name:name,old:j});
this._registerEventChaining(i,j,name);
},_registerEventChaining:function(s,t,name){if((s instanceof qx.core.Object)&&qx.Class.hasMixin(s.constructor,qx.data.marshal.MEventBubbling)){var u=qx.lang.Function.bind(this.__lx,this,name);
var v=s.addListener(c,u,this);
s.setUserData(d,v);
}if(t!=null&&t.getUserData&&t.getUserData(d)!=null){t.removeListenerById(t.getUserData(d));
}},__lx:function(name,e){var r=e.getData();
var n=r.value;
var l=r.old;
if(qx.Class.hasInterface(e.getTarget().constructor,qx.data.IListData)){if(r.name.indexOf){var q=r.name.indexOf(f)!=-1?r.name.indexOf(f):r.name.length;
var o=r.name.indexOf(h)!=-1?r.name.indexOf(h):r.name.length;

if(q<o){var k=r.name.substring(0,q);
var p=r.name.substring(q+1,r.name.length);

if(p[0]!=h){p=f+p;
}var m=name+h+k+g+p;
}else if(o<q){var k=r.name.substring(0,o);
var p=r.name.substring(o,r.name.length);
var m=name+h+k+g+p;
}else{var m=name+h+r.name+g;
}}else{var m=name+h+r.name+g;
}}else{var m=name+f+r.name;
}this.fireDataEvent(c,{value:n,name:m,old:l});
}}});
})();
(function(){var bd="change",bc="add",bb="remove",ba="order",Y="",X="qx.data.Array",W="?",V="changeBubble",U="qx.event.type.Event",T="number",R="changeLength",S="qx.event.type.Data";
qx.Class.define(X,{extend:qx.core.Object,include:qx.data.marshal.MEventBubbling,implement:[qx.data.IListData],construct:function(s){arguments.callee.base.call(this);
if(s==undefined){this.__ly=[];
}else if(arguments.length>1){this.__ly=[];

for(var i=0;i<arguments.length;i++){this.__ly.push(arguments[i]);
}}else if(typeof s==T){this.__ly=new Array(s);
}else if(s instanceof Array){this.__ly=qx.lang.Array.clone(s);
}else{this.__ly=[];
throw new Error("Type of the parameter not supported!");
}for(var i=0;i<this.__ly.length;i++){this._applyEventPropagation(this.__ly[i],null,i);
}this.__lz();
},events:{"change":S,"changeLength":U},members:{__ly:null,concat:function(P){if(P){var Q=this.__ly.concat(P);
}else{var Q=this.__ly.concat();
}return new qx.data.Array(Q);
},join:function(bh){return this.__ly.join(bh);
},pop:function(){var B=this.__ly.pop();
this.__lz();
this._applyEventPropagation(null,B,this.length-1);
this.fireDataEvent(bd,{start:this.length-1,end:this.length-1,type:bb,items:[B]},null);
return B;
},push:function(bf){for(var i=0;i<arguments.length;i++){this.__ly.push(arguments[i]);
this.__lz();
this._applyEventPropagation(arguments[i],null,this.length-1);
this.fireDataEvent(bd,{start:this.length-1,end:this.length-1,type:bc,items:[arguments[i]]},null);
}return this.length;
},reverse:function(){this.__ly.reverse();
this.fireDataEvent(bd,{start:0,end:this.length-1,type:ba,items:null},null);
},shift:function(){var L=this.__ly.shift();
this.__lz();
this._applyEventPropagation(null,L);
this.fireDataEvent(bd,{start:0,end:this.length-1,type:bb,items:[L]},null);
return L;
},slice:function(j,k){return new qx.data.Array(this.__ly.slice(j,k));
},splice:function(C,D,E){var K=this.__ly.length;
var H=this.__ly.splice.apply(this.__ly,arguments);
if(this.__ly.length!=K){this.__lz();
}var I=D>0;
var F=arguments.length>2;
var G=null;

if(I||F){if(this.__ly.length>K){var J=bc;
}else if(this.__ly.length<K){var J=bb;
G=H;
}else{var J=ba;
}this.fireDataEvent(bd,{start:C,end:this.length-1,type:J,items:G},null);
}for(var i=2;i<arguments.length;i++){this._registerEventChaining(arguments[i],null,C+i);
}this.fireDataEvent(V,{value:this,name:W,old:H});
for(var i=0;i<H.length;i++){this._applyEventPropagation(null,H[i],i);
}return (new qx.data.Array(H));
},sort:function(n){this.__ly.sort.apply(this.__ly,arguments);
this.fireDataEvent(bd,{start:0,end:this.length-1,type:ba,items:null},null);
},unshift:function(be){for(var i=arguments.length-1;i>=0;i--){this.__ly.unshift(arguments[i]);
this.__lz();
this._applyEventPropagation(arguments[i],null,0);
this.fireDataEvent(bd,{start:0,end:this.length-1,type:bc,items:[arguments[i]]},null);
}return this.length;
},toArray:function(){return this.__ly;
},getItem:function(O){return this.__ly[O];
},setItem:function(p,q){var r=this.__ly[p];
this.__ly[p]=q;
this._applyEventPropagation(q,r,p);
if(this.length!=this.__ly.length){this.__lz();
}this.fireDataEvent(bd,{start:p,end:p,type:bc,items:[q]},null);
},getLength:function(){return this.length;
},indexOf:function(x){return this.__ly.indexOf(x);
},toString:function(){if(this.__ly!=null){return this.__ly.toString();
}return Y;
},contains:function(d){return this.__ly.indexOf(d)!==-1;
},copy:function(){return this.concat();
},insertAt:function(M,N){this.splice(M,0,N);
},insertBefore:function(f,g){var h=this.indexOf(f);

if(h==-1){this.push(g);
}else{this.splice(h,0,g);
}},insertAfter:function(y,z){var A=this.indexOf(y);

if(A==-1||A==(this.length-1)){this.push(z);
}else{this.splice(A+1,0,z);
}},removeAt:function(o){return this.splice(o,1)[0];
},removeAll:function(){for(var i=0;i<this.__ly.length;i++){this._applyEventPropagation(null,this.__ly[i],i);
}var b=this.getLength();
var a=this.__ly.concat();
this.__ly.length=0;
this.__lz();
this.fireDataEvent(bd,{start:0,end:b-1,type:bb,items:a},null);
},append:function(e){{};
for(var i=0;i<e.length;i++){this._applyEventPropagation(e[i],null,this.__ly.length+i);
}Array.prototype.push.apply(this.__ly,e);
this.__lz();
},remove:function(t){var u=this.indexOf(t);

if(u!=-1){this.splice(u,1);
return t;
}},equals:function(c){if(this.length!==c.length){return false;
}
for(var i=0;i<this.length;i++){if(this.getItem(i)!==c.getItem(i)){return false;
}}return true;
},sum:function(){var bg=0;

for(var i=0;i<this.length;i++){bg+=this.getItem(i);
}return bg;
},max:function(){var l=this.getItem(0);

for(var i=1;i<this.length;i++){if(this.getItem(i)>l){l=this.getItem(i);
}}return l===undefined?null:l;
},min:function(){var m=this.getItem(0);

for(var i=1;i<this.length;i++){if(this.getItem(i)<m){m=this.getItem(i);
}}return m===undefined?null:m;
},forEach:function(v,w){for(var i=0;i<this.__ly.length;i++){v.call(w,this.__ly[i]);
}},__lz:function(){this.length=this.__ly.length;
this.fireEvent(R,qx.event.type.Event);
}},destruct:function(){this.__ly=null;
}});
})();
(function(){var q="horizontal",p="scrollpane",o="vertical",n="button-backward",m="button-forward",l="content",k="execute",j="qx.ui.container.SlideBar",i="scrollY",h="removeChildWidget",c="scrollX",g="_applyOrientation",f="mousewheel",b="Integer",a="slidebar",d="update";
qx.Class.define(j,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling],construct:function(I){arguments.callee.base.call(this);
var J=this.getChildControl(p);
this._add(J,{flex:1});

if(I!=null){this.setOrientation(I);
}else{this.initOrientation();
}this.addListener(f,this._onMouseWheel,this);
},properties:{appearance:{refine:true,init:a},orientation:{check:[q,o],init:q,apply:g},scrollStep:{check:b,init:15,themeable:true}},members:{getChildrenContainer:function(){return this.getChildControl(l);
},_createChildControlImpl:function(A){var B;

switch(A){case m:B=new qx.ui.form.RepeatButton;
B.addListener(k,this._onExecuteForward,this);
B.setFocusable(false);
this._addAt(B,2);
break;
case n:B=new qx.ui.form.RepeatButton;
B.addListener(k,this._onExecuteBackward,this);
B.setFocusable(false);
this._addAt(B,0);
break;
case l:B=new qx.ui.container.Composite();
if(qx.bom.client.Engine.GECKO){B.addListener(h,this._onRemoveChild,this);
}this.getChildControl(p).add(B);
break;
case p:B=new qx.ui.core.scroll.ScrollPane();
B.addListener(d,this._onResize,this);
B.addListener(c,this._onScroll,this);
B.addListener(i,this._onScroll,this);
break;
}return B||arguments.callee.base.call(this,A);
},_forwardStates:{barLeft:true,barTop:true,barRight:true,barBottom:true},scrollBy:function(t){var u=this.getChildControl(p);

if(this.getOrientation()===q){u.scrollByX(t);
}else{u.scrollByY(t);
}},scrollTo:function(r){var s=this.getChildControl(p);

if(this.getOrientation()===q){s.scrollToX(r);
}else{s.scrollToY(r);
}},_applyOrientation:function(v,w){var z=[this.getLayout(),this._getLayout()];
var y=this.getChildControl(m);
var x=this.getChildControl(n);
if(w==o){y.removeState(o);
x.removeState(o);
y.addState(q);
x.addState(q);
}else if(w==q){y.removeState(q);
x.removeState(q);
y.addState(o);
x.addState(o);
}
if(v==q){this._setLayout(new qx.ui.layout.HBox());
this.setLayout(new qx.ui.layout.HBox());
}else{this._setLayout(new qx.ui.layout.VBox());
this.setLayout(new qx.ui.layout.VBox());
}
if(z[0]){z[0].dispose();
}
if(z[1]){z[1].dispose();
}},_onMouseWheel:function(e){this.scrollBy(e.getWheelDelta()*this.getScrollStep());
e.stop();
},_onScroll:function(){this._updateArrowsEnabled();
},_onResize:function(e){var content=this.getChildControl(p).getChildren()[0];

if(!content){return;
}var F=this.getInnerSize();
var H=content.getBounds();
var G=(this.getOrientation()===q)?H.width>F.width:H.height>F.height;

if(G){this._showArrows();
this._updateArrowsEnabled();
}else{this._hideArrows();
}},_onExecuteBackward:function(){this.scrollBy(-this.getScrollStep());
},_onExecuteForward:function(){this.scrollBy(this.getScrollStep());
},_onRemoveChild:function(){qx.event.Timer.once(function(){this.scrollBy(this.getChildControl(p).getScrollX());
},this,50);
},_updateArrowsEnabled:function(){var D=this.getChildControl(p);

if(this.getOrientation()===q){var C=D.getScrollX();
var E=D.getScrollMaxX();
}else{var C=D.getScrollY();
var E=D.getScrollMaxY();
}this.getChildControl(n).setEnabled(C>0);
this.getChildControl(m).setEnabled(C<E);
},_showArrows:function(){this._showChildControl(m);
this._showChildControl(n);
},_hideArrows:function(){this._excludeChildControl(m);
this._excludeChildControl(n);
this.scrollTo(0);
}}});
})();
(function(){var n="pressed",m="abandoned",l="Integer",k="hovered",j="qx.event.type.Event",i="Enter",h="Space",g="press",f="qx.ui.form.RepeatButton",d="release",a="__lA",c="interval",b="execute";
qx.Class.define(f,{extend:qx.ui.form.Button,construct:function(o,p){arguments.callee.base.call(this,o,p);
this.__lA=new qx.event.AcceleratingTimer();
this.__lA.addListener(c,this._onInterval,this);
},events:{"execute":j,"press":j,"release":j},properties:{interval:{check:l,init:100},firstInterval:{check:l,init:500},minTimer:{check:l,init:20},timerDecrease:{check:l,init:2}},members:{__lB:null,__lA:null,press:function(){if(this.isEnabled()){if(!this.hasState(n)){this.__lC();
}this.removeState(m);
this.addState(n);
}},release:function(q){if(!this.isEnabled()){return;
}if(this.hasState(n)){if(!this.__lB){this.execute();
}}this.removeState(n);
this.removeState(m);
this.__lD();
},_applyEnabled:function(r,s){arguments.callee.base.call(this,r,s);

if(!r){this.removeState(n);
this.removeState(m);
this.__lD();
}},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(m)){this.removeState(m);
this.addState(n);
this.__lA.start();
}this.addState(k);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(k);

if(this.hasState(n)){this.removeState(n);
this.addState(m);
this.__lA.stop();
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}this.capture();
this.__lC();
e.stopPropagation();
},_onMouseUp:function(e){this.releaseCapture();

if(!this.hasState(m)){this.addState(k);

if(this.hasState(n)&&!this.__lB){this.execute();
}}this.__lD();
e.stopPropagation();
},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case i:case h:if(this.hasState(n)){if(!this.__lB){this.execute();
}this.removeState(n);
this.removeState(m);
e.stopPropagation();
this.__lD();
}}},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case i:case h:this.removeState(m);
this.addState(n);
e.stopPropagation();
this.__lC();
}},_onInterval:function(e){this.__lB=true;
this.fireEvent(b);
},__lC:function(){this.fireEvent(g);
this.__lB=false;
this.__lA.set({interval:this.getInterval(),firstInterval:this.getFirstInterval(),minimum:this.getMinTimer(),decrease:this.getTimerDecrease()}).start();
this.removeState(m);
this.addState(n);
},__lD:function(){this.fireEvent(d);
this.__lA.stop();
this.removeState(m);
this.removeState(n);
}},destruct:function(){this._disposeObjects(a);
}});
})();
(function(){var e="Integer",d="interval",c="qx.event.type.Event",b="__lE",a="qx.event.AcceleratingTimer";
qx.Class.define(a,{extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__lE=new qx.event.Timer(this.getInterval());
this.__lE.addListener(d,this._onInterval,this);
},events:{"interval":c},properties:{interval:{check:e,init:100},firstInterval:{check:e,init:500},minimum:{check:e,init:20},decrease:{check:e,init:2}},members:{__lE:null,__lF:null,start:function(){this.__lE.setInterval(this.getFirstInterval());
this.__lE.start();
},stop:function(){this.__lE.stop();
this.__lF=null;
},_onInterval:function(){this.__lE.stop();

if(this.__lF==null){this.__lF=this.getInterval();
}this.__lF=Math.max(this.getMinimum(),this.__lF-this.getDecrease());
this.__lE.setInterval(this.__lF);
this.__lE.start();
this.fireEvent(d);
}},destruct:function(){this._disposeObjects(b);
}});
})();
(function(){var G="resize",F="scrollY",E="update",D="scrollX",C="_applyScrollX",B="_applyScrollY",A="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxX()",z="appear",w="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxY()",v="qx.event.type.Event",t="qx.ui.core.scroll.ScrollPane",u="scroll";
qx.Class.define(t,{extend:qx.ui.core.Widget,construct:function(){arguments.callee.base.call(this);
this.set({minWidth:0,minHeight:0});
this._setLayout(new qx.ui.layout.Grow());
this.addListener(G,this._onUpdate);
var i=this.getContentElement();
i.addListener(u,this._onScroll,this);
i.addListener(z,this._onAppear,this);
},events:{update:v},properties:{scrollX:{check:A,apply:C,event:D,init:0},scrollY:{check:w,apply:B,event:F,init:0}},members:{add:function(r){var s=this._getChildren()[0];

if(s){this._remove(s);
s.removeListener(G,this._onUpdate,this);
}
if(r){this._add(r);
r.addListener(G,this._onUpdate,this);
}},remove:function(M){if(M){this._remove(M);
M.removeListener(G,this._onUpdate,this);
}},getChildren:function(){return this._getChildren();
},_onUpdate:function(e){this.fireEvent(E);
},_onScroll:function(e){var q=this.getContentElement();
this.setScrollX(q.getScrollX());
this.setScrollY(q.getScrollY());
},_onAppear:function(e){var g=this.getContentElement();
var c=this.getScrollX();
var d=g.getScrollX();

if(c!=d){g.scrollToX(c);
}var h=this.getScrollY();
var f=g.getScrollY();

if(h!=f){g.scrollToY(h);
}},getItemTop:function(N){var top=0;

do{top+=N.getBounds().top;
N=N.getLayoutParent();
}while(N&&N!==this);
return top;
},getItemBottom:function(J){return this.getItemTop(J)+J.getBounds().height;
},getItemLeft:function(a){var b=0;
var parent;

do{b+=a.getBounds().left;
parent=a.getLayoutParent();

if(parent){b+=parent.getInsets().left;
}a=parent;
}while(a&&a!==this);
return b;
},getItemRight:function(n){return this.getItemLeft(n)+n.getBounds().width;
},getScrollSize:function(){return this.getChildren()[0].getBounds();
},getScrollMaxX:function(){var k=this.getInnerSize();
var j=this.getScrollSize();

if(k&&j){return Math.max(0,j.width-k.width);
}return 0;
},getScrollMaxY:function(){var I=this.getInnerSize();
var H=this.getScrollSize();

if(I&&H){return Math.max(0,H.height-I.height);
}return 0;
},scrollToX:function(l){var m=this.getScrollMaxX();

if(l<0){l=0;
}else if(l>m){l=m;
}this.setScrollX(l);
},scrollToY:function(o){var p=this.getScrollMaxY();

if(o<0){o=0;
}else if(o>p){o=p;
}this.setScrollY(o);
},scrollByX:function(x){this.scrollToX(this.getScrollX()+x);
},scrollByY:function(y){this.scrollToY(this.getScrollY()+y);
},_applyScrollX:function(K){this.getContentElement().scrollToX(K);
},_applyScrollY:function(L){this.getContentElement().scrollToY(L);
}}});
})();
(function(){var d="_applyDynamic",c="changeSelection",b="Boolean",a="qx.ui.container.Stack";
qx.Class.define(a,{extend:qx.ui.core.Widget,implement:qx.ui.core.ISingleSelection,include:qx.ui.core.MSingleSelectionHandling,construct:function(){arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.Grow);
this.addListener(c,this.__lG,this);
},properties:{dynamic:{check:b,init:false,apply:d}},members:{_applyDynamic:function(x){var z=this._getChildren();
var y=this.getSelection()[0];
var A;

for(var i=0,l=z.length;i<l;i++){A=z[i];

if(A!=y){if(x){z[i].exclude();
}else{z[i].hide();
}}}},_getItems:function(){return this.getChildren();
},_isAllowEmptySelection:function(){return true;
},_isItemSelectable:function(w){return w.isEnabled();
},__lG:function(e){var h=e.getOldData()[0];
var j=e.getData()[0];

if(h){if(this.isDynamic()){h.exclude();
}else{h.hide();
}}
if(j){j.show();
}},add:function(q){this._add(q);
var r=this.getSelection()[0];

if(!r){this.setSelection([q]);
}else if(r!==q){if(this.isDynamic()){q.exclude();
}else{q.hide();
}}},remove:function(f){this._remove(f);

if(this.getSelection()[0]===f){var g=this._getChildren()[0];

if(g){this.setSelection([g]);
}else{this.resetSelection();
}}},indexOf:function(k){return this._indexOf(k);
},getChildren:function(){return this._getChildren();
},previous:function(){var u=this.getSelection()[0];
var s=this._indexOf(u)-1;
var v=this._getChildren();

if(s<0){s=v.length-1;
}var t=v[s];
this.setSelection([t]);
},next:function(){var n=this.getSelection()[0];
var m=this._indexOf(n)+1;
var o=this._getChildren();
var p=o[m]||o[0];
this.setSelection([p]);
}}});
})();
(function(){var n="button",m="",l="close",k="String",j="_applyIcon",i="page",h="qx.event.type.Event",g="_applyShowCloseButton",f="tabview-page",e="qx.ui.tabview.Page",c="_applyLabel",d="Boolean";
qx.Class.define(e,{extend:qx.ui.container.Composite,construct:function(a,b){arguments.callee.base.call(this);
this._createChildControl(n);
if(a!=null){this.setLabel(a);
}
if(b!=null){this.setIcon(b);
}},events:{"close":h},properties:{appearance:{refine:true,init:f},label:{check:k,init:m,apply:c},icon:{check:k,init:m,apply:j},showCloseButton:{check:d,init:false,apply:g}},members:{_forwardStates:{barTop:1,barRight:1,barBottom:1,barLeft:1,firstTab:1,lastTab:1},_applyIcon:function(o,p){this.getChildControl(n).setIcon(o);
},_applyLabel:function(s,t){this.getChildControl(n).setLabel(s);
},_applyEnabled:function(w,x){arguments.callee.base.call(this,w,x);
var y=this.getChildControl(n);
w==null?y.resetEnabled():y.setEnabled(w);
},_createChildControlImpl:function(q){var r;

switch(q){case n:r=new qx.ui.tabview.TabButton;
r.setAllowGrowX(true);
r.setAllowGrowY(true);
r.setUserData(i,this);
r.addListener(l,this._onButtonClose,this);
break;
}return r||arguments.callee.base.call(this,q);
},_applyShowCloseButton:function(u,v){this.getChildControl(n).setShowCloseButton(u);
},_onButtonClose:function(){this.fireEvent(l);
},getButton:function(){return this.getChildControl(n);
}}});
})();
(function(){var i="Boolean",h="invalid",g="qx.ui.form.MForm",f="_applyValid",e="",d="changeRequired",c="changeValid",b="changeInvalidMessage",a="String";
qx.Mixin.define(g,{properties:{valid:{check:i,init:true,apply:f,event:c},required:{check:i,init:false,event:d},invalidMessage:{check:a,init:e,event:b}},members:{_applyValid:function(j,k){j?this.removeState(h):this.addState(h);
}}});
})();
(function(){var b="changeModel",a="qx.ui.form.MModelProperty";
qx.Mixin.define(a,{properties:{model:{nullable:true,event:b}}});
})();
(function(){var b="qx.ui.form.IRadioItem",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(d){},getValue:function(){},setGroup:function(c){this.assertInstance(c,qx.ui.form.RadioGroup);
},getGroup:function(){}}});
})();
(function(){var b="qx.ui.form.IBooleanForm",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var b="qx.ui.form.IModel",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeModel":a},members:{setModel:function(c){},getModel:function(){},resetModel:function(){}}});
})();
(function(){var o="checked",n="keypress",m="Boolean",l="Right",k="_applyValue",j="changeValue",i="qx.ui.form.RadioButton",h="radiobutton",g="Left",f="qx.ui.form.RadioGroup",b="Down",d="_applyGroup",c="Up",a="execute";
qx.Class.define(i,{extend:qx.ui.form.Button,include:[qx.ui.form.MForm,qx.ui.form.MModelProperty],implement:[qx.ui.form.IRadioItem,qx.ui.form.IForm,qx.ui.form.IBooleanForm,qx.ui.form.IModel],construct:function(t){{};
arguments.callee.base.call(this,t);
this.addListener(a,this._onExecute);
this.addListener(n,this._onKeyPress);
},properties:{group:{check:f,nullable:true,apply:d},value:{check:m,nullable:true,event:j,apply:k,init:false},appearance:{refine:true,init:h},allowGrowX:{refine:true,init:false}},members:{_applyValue:function(r,s){r?this.addState(o):this.removeState(o);

if(r&&this.getFocusable()){this.focus();
}},_applyGroup:function(p,q){if(q){q.remove(this);
}
if(p){p.add(this);
}},_onExecute:function(e){this.setValue(true);
},_onKeyPress:function(e){var u=this.getGroup();

if(!u){return;
}
switch(e.getKeyIdentifier()){case g:case c:u.selectPrevious();
break;
case l:case b:u.selectNext();
break;
}}}});
})();
(function(){var o="close-button",n="middle",m="left",l="icon",k="label",j="right",i="click",h="Boolean",g="bottom",f="qx.ui.tabview.TabButton",c="center",e="_applyShowCloseButton",d="top",b="close",a="qx.event.type.Data";
qx.Class.define(f,{extend:qx.ui.form.RadioButton,implement:qx.ui.form.IRadioItem,construct:function(){arguments.callee.base.call(this);
var x=new qx.ui.layout.Grid(2,0);
x.setRowAlign(0,m,n);
x.setColumnAlign(0,j,n);
this._getLayout().dispose();
this._setLayout(x);
this.initShowCloseButton();
},events:{"close":a},properties:{showCloseButton:{check:h,init:false,apply:e}},members:{_forwardStates:{focused:true,hovered:true,checked:true},_applyIconPosition:function(p,q){var r={icon:this.getChildControl(l),label:this.getChildControl(k),closeButton:this.getShowCloseButton()?this.getChildControl(o):null};
for(var s in r){if(r[s]){this._remove(r[s]);
}}
switch(p){case d:this._add(r.label,{row:3,column:2});
this._add(r.icon,{row:1,column:2});

if(r.closeButton){this._add(r.closeButton,{row:0,column:4});
}break;
case g:this._add(r.label,{row:1,column:2});
this._add(r.icon,{row:3,column:2});

if(r.closeButton){this._add(r.closeButton,{row:0,column:4});
}break;
case m:this._add(r.label,{row:0,column:2});
this._add(r.icon,{row:0,column:0});

if(r.closeButton){this._add(r.closeButton,{row:0,column:4});
}break;
case j:this._add(r.label,{row:0,column:0});
this._add(r.icon,{row:0,column:2});

if(r.closeButton){this._add(r.closeButton,{row:0,column:4});
}break;
}},_createChildControlImpl:function(v){var w;

switch(v){case k:var w=new qx.ui.basic.Label(this.getLabel());
w.setAnonymous(true);
this._add(w,{row:0,column:2});
this._getLayout().setColumnFlex(2,1);
break;
case l:w=new qx.ui.basic.Image(this.getIcon());
w.setAnonymous(true);
this._add(w,{row:0,column:0});
break;
case o:w=new qx.ui.form.Button();
w.addListener(i,this._onCloseButtonClick,this);
this._add(w,{row:0,column:4});

if(!this.getShowCloseButton()){w.exclude();
}break;
}return w||arguments.callee.base.call(this,v);
},_onCloseButtonClick:function(){this.fireDataEvent(b,this);
},_applyShowCloseButton:function(t,u){if(t){this._showChildControl(o);
}else{this._excludeChildControl(o);
}},_applyCenter:function(y){var z=this._getLayout();

if(y){z.setColumnAlign(2,c,n);
}else{z.setColumnAlign(2,m,n);
}}}});
})();
(function(){var i="legend",h="frame",g="middle",f="top",d="resize",c="qx.ui.groupbox.GroupBox",b="groupbox",a="_applyLegendPosition";
qx.Class.define(c,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling,qx.ui.core.MContentPadding,qx.ui.form.MForm],implement:[qx.ui.form.IForm],construct:function(n,o){arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.Canvas);
this._createChildControl(h);
this._createChildControl(i);
if(n!=null){this.setLegend(n);
}
if(o!=null){this.setIcon(o);
}},properties:{appearance:{refine:true,init:b},legendPosition:{check:[f,g],init:g,apply:a,themeable:true}},members:{_forwardStates:{invalid:true},_createChildControlImpl:function(l){var m;

switch(l){case h:m=new qx.ui.container.Composite();
this._add(m,{left:0,top:6,right:0,bottom:0});
break;
case i:m=new qx.ui.basic.Atom();
m.addListener(d,this._repositionFrame,this);
this._add(m);
break;
}return m||arguments.callee.base.call(this,l);
},_getContentPaddingTarget:function(){return this.getChildControl(h);
},_applyLegendPosition:function(e){if(this.getChildControl(i).getBounds()){this._repositionFrame();
}},_repositionFrame:function(){var r=this.getChildControl(i);
var q=this.getChildControl(h);
var s=r.getBounds().height;
if(this.getLegendPosition()==g){q.setLayoutProperties({"top":Math.round(s/2)});
}else if(this.getLegendPosition()==f){q.setLayoutProperties({"top":s});
}},getChildrenContainer:function(){return this.getChildControl(h);
},setLegend:function(j){var k=this.getChildControl(i);

if(j!==null){k.setLabel(j);
k.show();
}else{k.exclude();
}},getLegend:function(){return this.getChildControl(i).getLabel();
},setIcon:function(p){this.getChildControl(i).setIcon(p);
},getIcon:function(){this.getChildControl(i).getIcon();
}}});
})();
(function(){var s="pressed",r="abandoned",q="hovered",p="checked",o="Space",n="Enter",m="mouseup",l="mousedown",k="Boolean",j="_applyValue",c="mouseover",i="mouseout",g="qx.ui.form.ToggleButton",b="keydown",a="changeValue",f="button",d="keyup",h="execute";
qx.Class.define(g,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IBooleanForm,qx.ui.form.IExecutable],construct:function(v,w){arguments.callee.base.call(this,v,w);
this.addListener(c,this._onMouseOver);
this.addListener(i,this._onMouseOut);
this.addListener(l,this._onMouseDown);
this.addListener(m,this._onMouseUp);
this.addListener(b,this._onKeyDown);
this.addListener(d,this._onKeyUp);
this.addListener(h,this._onExecute,this);
},properties:{appearance:{refine:true,init:f},focusable:{refine:true,init:true},value:{check:k,nullable:true,event:a,apply:j,init:false}},members:{_applyValue:function(t,u){t?this.addState(p):this.removeState(p);
},_onExecute:function(e){this.toggleValue();
},_onMouseOver:function(e){if(e.getTarget()!==this){return;
}this.addState(q);

if(this.hasState(r)){this.removeState(r);
this.addState(s);
}},_onMouseOut:function(e){if(e.getTarget()!==this){return;
}this.removeState(q);

if(this.hasState(s)){if(!this.getValue()){this.removeState(s);
}this.addState(r);
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}this.capture();
this.removeState(r);
this.addState(s);
e.stopPropagation();
},_onMouseUp:function(e){this.releaseCapture();

if(this.hasState(r)){this.removeState(r);
}else if(this.hasState(s)){this.execute();
}this.removeState(s);
e.stopPropagation();
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case n:case o:this.removeState(r);
this.addState(s);
e.stopPropagation();
}},_onKeyUp:function(e){if(!this.hasState(s)){return;
}
switch(e.getKeyIdentifier()){case n:case o:this.removeState(r);
this.execute();
this.removeState(s);
e.stopPropagation();
}}}});
})();
(function(){var b="checkbox",a="qx.ui.form.CheckBox";
qx.Class.define(a,{extend:qx.ui.form.ToggleButton,include:[qx.ui.form.MForm,qx.ui.form.MModelProperty],implement:[qx.ui.form.IForm,qx.ui.form.IModel],construct:function(c){{};
arguments.callee.base.call(this,c);
this.setValue(false);
},properties:{appearance:{refine:true,init:b},allowGrowX:{refine:true,init:false}}});
})();


qx.$$loader.init();

