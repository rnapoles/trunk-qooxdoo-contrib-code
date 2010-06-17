(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!window.qxsettings) qxsettings = {};
var settings = {"qx.application":"accordion.demo.Application","qx.theme":"accordion.demo.theme.Theme","qx.version":"1.0.1"};
for (var k in settings) qxsettings[k] = settings[k];

if (!window.qxvariants) qxvariants = {};
var variants = {"qx.debug":"off"};
for (var k in variants) qxvariants[k] = variants[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"script"},"accordion":{"resourceUri":"resource","sourceUri":"script","version":"trunk"},"accordion.demo":{"resourceUri":"resource","sourceUri":"script","version":"trunk"},"qx":{"resourceUri":"resource","sourceUri":"script","version":"1.1"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {"C":{},"en":{}};
qx.$$locales = {"C":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EEEd":"d EEE","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_Hms":"H:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMMEd":"E, MMMM d","cldr_date_time_format_MMMMd":"MMMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, M/d/yyyy","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"EEE, MMM d, y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_abbreviated_fri":"Fri","cldr_day_stand-alone_abbreviated_mon":"Mon","cldr_day_stand-alone_abbreviated_sat":"Sat","cldr_day_stand-alone_abbreviated_sun":"Sun","cldr_day_stand-alone_abbreviated_thu":"Thu","cldr_day_stand-alone_abbreviated_tue":"Tue","cldr_day_stand-alone_abbreviated_wed":"Wed","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"Friday","cldr_day_stand-alone_wide_mon":"Monday","cldr_day_stand-alone_wide_sat":"Saturday","cldr_day_stand-alone_wide_sun":"Sunday","cldr_day_stand-alone_wide_thu":"Thursday","cldr_day_stand-alone_wide_tue":"Tuesday","cldr_day_stand-alone_wide_wed":"Wednesday","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"},"en":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EEEd":"d EEE","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_Hms":"H:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMMEd":"E, MMMM d","cldr_date_time_format_MMMMd":"MMMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, M/d/yyyy","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"EEE, MMM d, y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_abbreviated_fri":"Fri","cldr_day_stand-alone_abbreviated_mon":"Mon","cldr_day_stand-alone_abbreviated_sat":"Sat","cldr_day_stand-alone_abbreviated_sun":"Sun","cldr_day_stand-alone_abbreviated_thu":"Thu","cldr_day_stand-alone_abbreviated_tue":"Tue","cldr_day_stand-alone_abbreviated_wed":"Wed","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"Friday","cldr_day_stand-alone_wide_mon":"Monday","cldr_day_stand-alone_wide_sat":"Saturday","cldr_day_stand-alone_wide_sun":"Sunday","cldr_day_stand-alone_wide_thu":"Thursday","cldr_day_stand-alone_wide_tue":"Tuesday","cldr_day_stand-alone_wide_wed":"Wednesday","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"}};
qx.$$i18n    = {};
qx.$$packageData = {};

qx.$$loader = {
  parts : {"boot":[0]},
  uris : [["accordion.demo:accordion.demo.js"]],
  urisBefore : [],
  packageHashes : {"0":"a87d2a705e15"},
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

qx.$$packageData['a87d2a705e15']={"resources":{"accordion/test.png":[32,32,"png","accordion.demo"],"qx/decoration/Modern/app-header.png":[110,20,"png","qx"],"qx/decoration/Modern/arrows-combined.png":[87,8,"png","qx"],"qx/decoration/Modern/arrows/down-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-74,0],"qx/decoration/Modern/arrows/down-small-invert.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-69,0],"qx/decoration/Modern/arrows/down-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-49,0],"qx/decoration/Modern/arrows/down.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-20,0],"qx/decoration/Modern/arrows/forward.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-59,0],"qx/decoration/Modern/arrows/left-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",0,0],"qx/decoration/Modern/arrows/left.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-44,0],"qx/decoration/Modern/arrows/rewind.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-10,0],"qx/decoration/Modern/arrows/right-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-5,0],"qx/decoration/Modern/arrows/right.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-54,0],"qx/decoration/Modern/arrows/up-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-28,0],"qx/decoration/Modern/arrows/up-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-82,0],"qx/decoration/Modern/arrows/up.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-36,0],"qx/decoration/Modern/button-lr-combined.png":[72,52,"png","qx"],"qx/decoration/Modern/button-tb-combined.png":[4,216,"png","qx"],"qx/decoration/Modern/checkradio-combined.png":[504,14,"png","qx"],"qx/decoration/Modern/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Modern/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Modern/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",0,0],"qx/decoration/Modern/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Modern/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",-35,0],"qx/decoration/Modern/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Modern/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-52,0],"qx/decoration/Modern/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-33,0],"qx/decoration/Modern/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-20,0],"qx/decoration/Modern/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Modern/cursors-combined.gif",0,0],"qx/decoration/Modern/form/button-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-72],"qx/decoration/Modern/form/button-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-204],"qx/decoration/Modern/form/button-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-188],"qx/decoration/Modern/form/button-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-36],"qx/decoration/Modern/form/button-checked-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-84],"qx/decoration/Modern/form/button-checked-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-184],"qx/decoration/Modern/form/button-checked-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-156],"qx/decoration/Modern/form/button-checked-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-208],"qx/decoration/Modern/form/button-checked-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-160],"qx/decoration/Modern/form/button-checked-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-40,0],"qx/decoration/Modern/form/button-checked-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-32,0],"qx/decoration/Modern/form/button-checked-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-28],"qx/decoration/Modern/form/button-checked-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-24],"qx/decoration/Modern/form/button-checked-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-48],"qx/decoration/Modern/form/button-checked-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-16,0],"qx/decoration/Modern/form/button-checked-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-60,0],"qx/decoration/Modern/form/button-checked-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-140],"qx/decoration/Modern/form/button-checked-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-56],"qx/decoration/Modern/form/button-checked-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-112],"qx/decoration/Modern/form/button-disabled-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-40],"qx/decoration/Modern/form/button-disabled-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-136],"qx/decoration/Modern/form/button-disabled-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-16],"qx/decoration/Modern/form/button-disabled-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-disabled-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-68,0],"qx/decoration/Modern/form/button-disabled-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-4,0],"qx/decoration/Modern/form/button-disabled-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-116],"qx/decoration/Modern/form/button-disabled-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-168],"qx/decoration/Modern/form/button-disabled-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-60],"qx/decoration/Modern/form/button-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-68],"qx/decoration/Modern/form/button-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-144],"qx/decoration/Modern/form/button-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-8],"qx/decoration/Modern/form/button-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-24,0],"qx/decoration/Modern/form/button-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-44,0],"qx/decoration/Modern/form/button-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-192],"qx/decoration/Modern/form/button-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-148],"qx/decoration/Modern/form/button-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-104],"qx/decoration/Modern/form/button-hovered-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-108],"qx/decoration/Modern/form/button-hovered-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-32],"qx/decoration/Modern/form/button-hovered-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-128],"qx/decoration/Modern/form/button-hovered-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-hovered-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-20,0],"qx/decoration/Modern/form/button-hovered-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-48,0],"qx/decoration/Modern/form/button-hovered-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-44],"qx/decoration/Modern/form/button-hovered-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-76],"qx/decoration/Modern/form/button-hovered-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-88],"qx/decoration/Modern/form/button-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-56,0],"qx/decoration/Modern/form/button-preselected-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-124],"qx/decoration/Modern/form/button-preselected-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-176],"qx/decoration/Modern/form/button-preselected-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-200],"qx/decoration/Modern/form/button-preselected-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-4],"qx/decoration/Modern/form/button-preselected-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-152],"qx/decoration/Modern/form/button-preselected-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-28,0],"qx/decoration/Modern/form/button-preselected-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-36,0],"qx/decoration/Modern/form/button-preselected-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-196],"qx/decoration/Modern/form/button-preselected-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-164],"qx/decoration/Modern/form/button-preselected-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-212],"qx/decoration/Modern/form/button-preselected-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-8,0],"qx/decoration/Modern/form/button-preselected-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-64,0],"qx/decoration/Modern/form/button-preselected-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-96],"qx/decoration/Modern/form/button-preselected-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-80],"qx/decoration/Modern/form/button-preselected-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-132],"qx/decoration/Modern/form/button-pressed-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-12],"qx/decoration/Modern/form/button-pressed-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-52],"qx/decoration/Modern/form/button-pressed-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-20],"qx/decoration/Modern/form/button-pressed-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-pressed-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-52,0],"qx/decoration/Modern/form/button-pressed-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-12,0],"qx/decoration/Modern/form/button-pressed-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-100],"qx/decoration/Modern/form/button-pressed-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-172],"qx/decoration/Modern/form/button-pressed-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-64],"qx/decoration/Modern/form/button-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",0,0],"qx/decoration/Modern/form/button-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-92],"qx/decoration/Modern/form/button-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-120],"qx/decoration/Modern/form/button-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-180],"qx/decoration/Modern/form/checkbox-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-126,0],"qx/decoration/Modern/form/checkbox-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-322,0],"qx/decoration/Modern/form/checkbox-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-294,0],"qx/decoration/Modern/form/checkbox-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-364,0],"qx/decoration/Modern/form/checkbox-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-490,0],"qx/decoration/Modern/form/checkbox-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-224,0],"qx/decoration/Modern/form/checkbox-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-378,0],"qx/decoration/Modern/form/checkbox-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-84,0],"qx/decoration/Modern/form/checkbox-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-182,0],"qx/decoration/Modern/form/checkbox-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-42,0],"qx/decoration/Modern/form/checkbox-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-392,0],"qx/decoration/Modern/form/checkbox-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-210,0],"qx/decoration/Modern/form/checkbox-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-14,0],"qx/decoration/Modern/form/checkbox-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-238,0],"qx/decoration/Modern/form/checkbox-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-462,0],"qx/decoration/Modern/form/checkbox-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-112,0],"qx/decoration/Modern/form/checkbox-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-448,0],"qx/decoration/Modern/form/checkbox.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-140,0],"qx/decoration/Modern/form/input-focused.png":[40,12,"png","qx"],"qx/decoration/Modern/form/input.png":[84,12,"png","qx"],"qx/decoration/Modern/form/radiobutton-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-196,0],"qx/decoration/Modern/form/radiobutton-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-168,0],"qx/decoration/Modern/form/radiobutton-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-98,0],"qx/decoration/Modern/form/radiobutton-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-308,0],"qx/decoration/Modern/form/radiobutton-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-406,0],"qx/decoration/Modern/form/radiobutton-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-28,0],"qx/decoration/Modern/form/radiobutton-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-350,0],"qx/decoration/Modern/form/radiobutton-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-266,0],"qx/decoration/Modern/form/radiobutton-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-252,0],"qx/decoration/Modern/form/radiobutton-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-336,0],"qx/decoration/Modern/form/radiobutton-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-476,0],"qx/decoration/Modern/form/radiobutton-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-420,0],"qx/decoration/Modern/form/radiobutton-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-56,0],"qx/decoration/Modern/form/radiobutton-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",0,0],"qx/decoration/Modern/form/radiobutton-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-154,0],"qx/decoration/Modern/form/radiobutton-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-434,0],"qx/decoration/Modern/form/radiobutton-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-280,0],"qx/decoration/Modern/form/radiobutton.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-70,0],"qx/decoration/Modern/form/tooltip-error-arrow.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-b.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-30],"qx/decoration/Modern/form/tooltip-error-bl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-24],"qx/decoration/Modern/form/tooltip-error-br.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-c.png":[40,18,"png","qx"],"qx/decoration/Modern/form/tooltip-error-l.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",-6,0],"qx/decoration/Modern/form/tooltip-error-r.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-t.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-6],"qx/decoration/Modern/form/tooltip-error-tl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-18],"qx/decoration/Modern/form/tooltip-error-tr.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-12],"qx/decoration/Modern/groupbox-lr-combined.png":[8,51,"png","qx"],"qx/decoration/Modern/groupbox-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-b.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-12],"qx/decoration/Modern/groupbox/groupbox-bl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-16],"qx/decoration/Modern/groupbox/groupbox-br.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-8],"qx/decoration/Modern/groupbox/groupbox-c.png":[40,51,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-l.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",-4,0],"qx/decoration/Modern/groupbox/groupbox-r.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-t.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-4],"qx/decoration/Modern/groupbox/groupbox-tl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-tr.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-20],"qx/decoration/Modern/menu-background-combined.png":[80,49,"png","qx"],"qx/decoration/Modern/menu-checkradio-combined.gif":[64,7,"gif","qx"],"qx/decoration/Modern/menu/background.png":[40,49,"png","qx","qx/decoration/Modern/menu-background-combined.png",-40,0],"qx/decoration/Modern/menu/bar-background.png":[40,20,"png","qx","qx/decoration/Modern/menu-background-combined.png",0,0],"qx/decoration/Modern/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-16,0],"qx/decoration/Modern/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-48,0],"qx/decoration/Modern/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-32,0],"qx/decoration/Modern/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",0,0],"qx/decoration/Modern/pane-lr-combined.png":[12,238,"png","qx"],"qx/decoration/Modern/pane-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/pane/pane-b.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-30],"qx/decoration/Modern/pane/pane-bl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-18],"qx/decoration/Modern/pane/pane-br.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-12],"qx/decoration/Modern/pane/pane-c.png":[40,238,"png","qx"],"qx/decoration/Modern/pane/pane-l.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",0,0],"qx/decoration/Modern/pane/pane-r.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",-6,0],"qx/decoration/Modern/pane/pane-t.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,0],"qx/decoration/Modern/pane/pane-tl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-24],"qx/decoration/Modern/pane/pane-tr.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-6],"qx/decoration/Modern/scrollbar-combined.png":[54,12,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-horizontal.png":[76,15,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-horizontal.png":[19,10,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-vertical.png":[10,19,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-vertical.png":[15,76,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-horizontal.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-34,0],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-vertical.png":[10,12,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-6,0],"qx/decoration/Modern/scrollbar/scrollbar-down.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-28,0],"qx/decoration/Modern/scrollbar/scrollbar-left.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-50,0],"qx/decoration/Modern/scrollbar/scrollbar-right.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-46,0],"qx/decoration/Modern/scrollbar/scrollbar-up.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",0,0],"qx/decoration/Modern/scrollbar/slider-knob-background.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-16,0],"qx/decoration/Modern/selection.png":[110,20,"png","qx"],"qx/decoration/Modern/shadow-lr-combined.png":[30,382,"png","qx"],"qx/decoration/Modern/shadow-small-lr-combined.png":[10,136,"png","qx"],"qx/decoration/Modern/shadow-small-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/shadow-tb-combined.png":[15,90,"png","qx"],"qx/decoration/Modern/shadow/shadow-b.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-30],"qx/decoration/Modern/shadow/shadow-bl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-br.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-45],"qx/decoration/Modern/shadow/shadow-c.png":[40,382,"png","qx"],"qx/decoration/Modern/shadow/shadow-l.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-r.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",-15,0],"qx/decoration/Modern/shadow/shadow-small-b.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-20],"qx/decoration/Modern/shadow/shadow-small-bl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-small-br.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-10],"qx/decoration/Modern/shadow/shadow-small-c.png":[40,136,"png","qx"],"qx/decoration/Modern/shadow/shadow-small-l.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-r.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",-5,0],"qx/decoration/Modern/shadow/shadow-small-t.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-5],"qx/decoration/Modern/shadow/shadow-small-tl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-tr.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-25],"qx/decoration/Modern/shadow/shadow-t.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-60],"qx/decoration/Modern/shadow/shadow-tl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-75],"qx/decoration/Modern/shadow/shadow-tr.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,0],"qx/decoration/Modern/splitpane-knobs-combined.png":[8,9,"png","qx"],"qx/decoration/Modern/splitpane/knob-horizontal.png":[1,8,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,-1],"qx/decoration/Modern/splitpane/knob-vertical.png":[8,1,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,0],"qx/decoration/Modern/table-combined.png":[94,18,"png","qx"],"qx/decoration/Modern/table/ascending.gif":[7,4,"gif","qx"],"qx/decoration/Modern/table/ascending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",0,0],"qx/decoration/Modern/table/boolean-false.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-80,0],"qx/decoration/Modern/table/boolean-true.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-26,0],"qx/decoration/Modern/table/descending.gif":[7,4,"gif","qx"],"qx/decoration/Modern/table/descending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",-18,0],"qx/decoration/Modern/table/header-cell.png":[40,18,"png","qx","qx/decoration/Modern/table-combined.png",-40,0],"qx/decoration/Modern/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Modern/table-combined.png",-8,0],"qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png":[10,14,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-lr-combined.png":[10,12,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-pane-lr-combined.png":[60,2,"png","qx"],"qx/decoration/Modern/tabview-pane-tb-combined.png":[30,180,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-bottom-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-bottom-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-bottom-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-l.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-r.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-bottom-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-bottom-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-left-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-left-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-left-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-left-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-left-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-left-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-right-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-right-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-right-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-right-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-right-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-right-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-top-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-top-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-top-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-l.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-r.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-top-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-top-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-top-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tabview-pane-b.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-60],"qx/decoration/Modern/tabview/tabview-pane-bl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-br.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-120],"qx/decoration/Modern/tabview/tabview-pane-c.png":[40,120,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-l.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-r.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",-30,0],"qx/decoration/Modern/tabview/tabview-pane-t.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-150],"qx/decoration/Modern/tabview/tabview-pane-tl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-30],"qx/decoration/Modern/tabview/tabview-pane-tr.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-90],"qx/decoration/Modern/tabview/tabview-pane.png":[185,250,"png","qx"],"qx/decoration/Modern/toolbar-combined.png":[80,130,"png","qx"],"qx/decoration/Modern/toolbar/toolbar-gradient-blue.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",-40,0],"qx/decoration/Modern/toolbar/toolbar-gradient.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",0,0],"qx/decoration/Modern/toolbar/toolbar-handle-knob.gif":[1,8,"gif","qx"],"qx/decoration/Modern/toolbar/toolbar-part.gif":[7,1,"gif","qx"],"qx/decoration/Modern/tooltip-error-lr-combined.png":[12,18,"png","qx"],"qx/decoration/Modern/tooltip-error-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/tree-combined.png":[32,8,"png","qx"],"qx/decoration/Modern/tree/closed-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-24,0],"qx/decoration/Modern/tree/closed.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-16,0],"qx/decoration/Modern/tree/open-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-8,0],"qx/decoration/Modern/tree/open.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",0,0],"qx/decoration/Modern/window-captionbar-buttons-combined.png":[108,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-active-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-inactive-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-active-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-inactive-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-statusbar-lr-combined.png":[8,7,"png","qx"],"qx/decoration/Modern/window-statusbar-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/window/captionbar-active-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-active-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-active-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-active-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-active-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-active-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-active-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-inactive-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-inactive-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-inactive-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-inactive-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-18],"qx/decoration/Modern/window/close-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-27,0],"qx/decoration/Modern/window/close-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-9,0],"qx/decoration/Modern/window/close-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-90,0],"qx/decoration/Modern/window/maximize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-18,0],"qx/decoration/Modern/window/maximize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-81,0],"qx/decoration/Modern/window/maximize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-54,0],"qx/decoration/Modern/window/minimize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-63,0],"qx/decoration/Modern/window/minimize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-72,0],"qx/decoration/Modern/window/minimize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-36,0],"qx/decoration/Modern/window/restore-active-hovered.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",0,0],"qx/decoration/Modern/window/restore-active.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-99,0],"qx/decoration/Modern/window/restore-inactive.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-45,0],"qx/decoration/Modern/window/statusbar-b.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-16],"qx/decoration/Modern/window/statusbar-bl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-20],"qx/decoration/Modern/window/statusbar-br.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-4],"qx/decoration/Modern/window/statusbar-c.png":[40,7,"png","qx"],"qx/decoration/Modern/window/statusbar-l.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",-4,0],"qx/decoration/Modern/window/statusbar-r.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",0,0],"qx/decoration/Modern/window/statusbar-t.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,0],"qx/decoration/Modern/window/statusbar-tl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-8],"qx/decoration/Modern/window/statusbar-tr.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-12],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-color-chooser.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-document.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/22/mimetypes/office-document.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-open.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder.png":[22,22,"png","qx"],"qx/icon/Tango/32/mimetypes/office-document.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder-open.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder.png":[32,32,"png","qx"],"qx/static/blank.gif":[1,1,"gif","qx"]}};
(function(){var bp="toString",bo=".",bn="default",bm="Object",bl='"',bk="Array",bj="()",bi="String",bh="Function",bg=".prototype",bN="function",bM="Boolean",bL="Error",bK="RegExp",bJ="warn",bI="hasOwnProperty",bH="string",bG="toLocaleString",bF='\", "',bE="info",bw="BROKEN_IE",bx="isPrototypeOf",bu="Date",bv="",bs="qx.Bootstrap",bt="]",bq="Class",br="error",by="[Class ",bz="valueOf",bB="Number",bA="count",bD="debug",bC="ES5";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return by+this.classname+bt;
},createNamespace:function(name,M){var O=name.split(bo);
var parent=window;
var N=O[0];

for(var i=0,P=O.length-1;i<P;i++,N=O[i]){if(!parent[N]){parent=parent[N]={};
}else{parent=parent[N];
}}parent[N]=M;
return N;
},setDisplayName:function(K,L,name){K.displayName=L+bo+name+bj;
},setDisplayNames:function(T,U){for(var name in T){var V=T[name];

if(V instanceof Function){V.displayName=U+bo+name+bj;
}}},define:function(name,o){if(!o){var o={statics:{}};
}var t;
var r=null;
qx.Bootstrap.setDisplayNames(o.statics,name);

if(o.members){qx.Bootstrap.setDisplayNames(o.members,name+bg);
t=o.construct||new Function;
var p=o.statics;

for(var q in p){t[q]=p[q];
}r=t.prototype;
var u=o.members;

for(var q in u){r[q]=u[q];
}}else{t=o.statics||{};
}var s=this.createNamespace(name,t);
t.name=t.classname=name;
t.basename=s;
t.$$type=bq;
if(!t.hasOwnProperty(bp)){t.toString=this.genericToString;
}if(o.defer){o.defer(t,r);
}qx.Bootstrap.$$registry[name]=o.statics;
return t;
}};
qx.Bootstrap.define(bs,{statics:{LOADSTART:qx.$$start||new Date(),createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,getByName:function(name){return qx.Bootstrap.$$registry[name];
},$$registry:{},objectGetLength:({"count":function(x){return x.__count__;
},"default":function(bb){var length=0;

for(var bc in bb){length++;
}return length;
}})[(({}).__count__==0)?bA:bn],objectMergeWith:function(C,D,E){if(E===undefined){E=true;
}
for(var F in D){if(E||C[F]===undefined){C[F]=D[F];
}}return C;
},__a:[bx,bI,bG,bp,bz],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(g){var h=[];

for(var m in g){h.push(m);
}var j=qx.Bootstrap.__a;
var k=Object.prototype.hasOwnProperty;

for(var i=0,a=j,l=a.length;i<l;i++){if(k.call(g,a[i])){h.push(a[i]);
}}return h;
},"default":function(bO){var bP=[];

for(var bQ in bO){bP.push(bQ);
}return bP;
}})[typeof (Object.keys)==
bN?bC:
(function(){for(var X in {toString:1}){return X;
}})()!==bp?bw:bn],getKeysAsString:function(bd){var be=qx.Bootstrap.getKeys(bd);

if(be.length==0){return bv;
}return bl+be.join(bF)+bl;
},__b:{"[object String]":bi,"[object Array]":bk,"[object Object]":bm,"[object RegExp]":bK,"[object Number]":bB,"[object Boolean]":bM,"[object Date]":bu,"[object Function]":bh,"[object Error]":bL},firstUp:function(W){return W.charAt(0).toUpperCase()+W.substr(1);
},firstLow:function(n){return n.charAt(0).toLowerCase()+n.substr(1);
},getClass:function(bU){var bV=Object.prototype.toString.call(bU);
return (qx.Bootstrap.__b[bV]||bV.slice(8,-1));
},isString:function(S){return (S!==null&&(typeof S===bH||qx.Bootstrap.getClass(S)==bi||S instanceof String||(!!S&&!!S.$$isString)));
},isArray:function(G){return (G!==null&&(G instanceof Array||(G&&qx.data&&qx.data.IListData&&qx.Bootstrap.hasInterface(G.constructor,qx.data.IListData))||qx.Bootstrap.getClass(G)==bk||(!!G&&!!G.$$isArray)));
},isObject:function(bR){return (bR!==undefined&&bR!==null&&qx.Bootstrap.getClass(bR)==bm);
},isFunction:function(v){return qx.Bootstrap.getClass(v)==bh;
},classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;
},getPropertyDefinition:function(A,name){while(A){if(A.$$properties&&A.$$properties[name]){return A.$$properties[name];
}A=A.superclass;
}return null;
},hasProperty:function(bf,name){return !!qx.Bootstrap.getPropertyDefinition(bf,name);
},getEventType:function(d,name){var d=d.constructor;

while(d.superclass){if(d.$$events&&d.$$events[name]!==undefined){return d.$$events[name];
}d=d.superclass;
}return null;
},supportsEvent:function(w,name){return !!qx.Bootstrap.getEventType(w,name);
},getByInterface:function(H,I){var J,i,l;

while(H){if(H.$$implements){J=H.$$flatImplements;

for(i=0,l=J.length;i<l;i++){if(J[i]===I){return H;
}}}H=H.superclass;
}return null;
},hasInterface:function(Y,ba){return !!qx.Bootstrap.getByInterface(Y,ba);
},getMixins:function(b){var c=[];

while(b){if(b.$$includes){c.push.apply(c,b.$$flatIncludes);
}b=b.superclass;
}return c;
},$$logs:[],debug:function(y,z){qx.Bootstrap.$$logs.push([bD,arguments]);
},info:function(Q,R){qx.Bootstrap.$$logs.push([bE,arguments]);
},warn:function(bS,bT){qx.Bootstrap.$$logs.push([bJ,arguments]);
},error:function(e,f){qx.Bootstrap.$$logs.push([br,arguments]);
},trace:function(B){}}});
})();
(function(){var k="qx.allowUrlSettings",j="&",h="qx.core.Setting",g="qx.allowUrlVariants",f="qx.propertyDebugLevel",e="qxsetting",d=":",c=".";
qx.Bootstrap.define(h,{statics:{__c:{},define:function(p,q){if(q===undefined){throw new Error('Default value of setting "'+p+'" must be defined!');
}
if(!this.__c[p]){this.__c[p]={};
}else if(this.__c[p].defaultValue!==undefined){throw new Error('Setting "'+p+'" is already defined!');
}this.__c[p].defaultValue=q;
},get:function(a){var b=this.__c[a];

if(b===undefined){throw new Error('Setting "'+a+'" is not defined.');
}
if(b.value!==undefined){return b.value;
}return b.defaultValue;
},set:function(n,o){if((n.split(c)).length<2){throw new Error('Malformed settings key "'+n+'". Must be following the schema "namespace.key".');
}
if(!this.__c[n]){this.__c[n]={};
}this.__c[n].value=o;
},__d:function(){if(window.qxsettings){for(var m in window.qxsettings){this.set(m,window.qxsettings[m]);
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(l){}this.__e();
}},__e:function(){if(this.get(k)!=true){return;
}var s=document.location.search.slice(1).split(j);

for(var i=0;i<s.length;i++){var r=s[i].split(d);

if(r.length!=3||r[0]!=e){continue;
}this.set(r[1],decodeURIComponent(r[2]));
}}},defer:function(t){t.define(k,false);
t.define(g,false);
t.define(f,0);
t.__d();
}});
})();
(function(){var s="gecko",r="1.9.0.0",q=".",p="[object Opera]",o="function",n="[^\\.0-9]",m="525.26",l="",k="mshtml",j="AppleWebKit/",d="unknown",i="9.6.0",g="4.0",c="Gecko",b="opera",f="webkit",e="0.0.0",h="8.0",a="qx.bom.client.Engine";
qx.Bootstrap.define(a,{statics:{NAME:"",FULLVERSION:"0.0.0",VERSION:0.0,OPERA:false,WEBKIT:false,GECKO:false,MSHTML:false,UNKNOWN_ENGINE:false,UNKNOWN_VERSION:false,DOCUMENT_MODE:null,__f:function(){var u=d;
var y=e;
var x=window.navigator.userAgent;
var A=false;
var w=false;

if(window.opera&&Object.prototype.toString.call(window.opera)==p){u=b;
this.OPERA=true;
if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(x)){y=RegExp.$1+q+RegExp.$2;

if(RegExp.$3!=l){y+=q+RegExp.$3;
}}else{w=true;
y=i;
}}else if(window.navigator.userAgent.indexOf(j)!=-1){u=f;
this.WEBKIT=true;

if(/AppleWebKit\/([^ ]+)/.test(x)){y=RegExp.$1;
var z=RegExp(n).exec(y);

if(z){y=y.slice(0,z.index);
}}else{w=true;
y=m;
}}else if(window.controllers&&window.navigator.product===c){u=s;
this.GECKO=true;
if(/rv\:([^\);]+)(\)|;)/.test(x)){y=RegExp.$1;
}else{w=true;
y=r;
}}else if(window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(x)){u=k;
y=RegExp.$1;

if(document.documentMode){this.DOCUMENT_MODE=document.documentMode;
}if(y<8&&/Trident\/([^\);]+)(\)|;)/.test(x)){if(RegExp.$1===g){y=h;
}}this.MSHTML=true;
}else{var v=window.qxFail;

if(v&&typeof v===o){var u=v();

if(u.NAME&&u.FULLVERSION){u=u.NAME;
this[u.toUpperCase()]=true;
y=u.FULLVERSION;
}}else{A=true;
w=true;
y=r;
u=s;
this.GECKO=true;
window.alert("Unsupported client: "+x+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}this.UNKNOWN_ENGINE=A;
this.UNKNOWN_VERSION=w;
this.NAME=u;
this.FULLVERSION=y;
this.VERSION=parseFloat(y);
}},defer:function(t){t.__f();
}});
})();
(function(){var u="on",t="off",s="|",r="default",q="object",p="&",o="qx.aspects",n="$",m="qx.allowUrlVariants",k="qx.debug",d="qx.client",j="qx.dynlocale",g="webkit",c="qxvariant",b="opera",f=":",e="qx.core.Variant",h="mshtml",a="gecko";
qx.Bootstrap.define(e,{statics:{__g:{},__h:{},compilerIsSet:function(){return true;
},define:function(E,F,G){{};

if(!this.__g[E]){this.__g[E]={};
}else{}this.__g[E].allowedValues=F;
this.__g[E].defaultValue=G;
},get:function(B){var C=this.__g[B];
{};

if(C.value!==undefined){return C.value;
}return C.defaultValue;
},__i:function(){if(window.qxvariants){for(var H in qxvariants){{};

if(!this.__g[H]){this.__g[H]={};
}this.__g[H].value=qxvariants[H];
}window.qxvariants=undefined;

try{delete window.qxvariants;
}catch(D){}this.__j(this.__g);
}},__j:function(){if(qx.core.Setting.get(m)!=true){return;
}var O=document.location.search.slice(1).split(p);

for(var i=0;i<O.length;i++){var P=O[i].split(f);

if(P.length!=3||P[0]!=c){continue;
}var Q=P[1];

if(!this.__g[Q]){this.__g[Q]={};
}this.__g[Q].value=decodeURIComponent(P[2]);
}},select:function(L,M){{};

for(var N in M){if(this.isSet(L,N)){return M[N];
}}
if(M[r]!==undefined){return M[r];
}{};
},isSet:function(w,x){var y=w+n+x;

if(this.__h[y]!==undefined){return this.__h[y];
}var A=false;
if(x.indexOf(s)<0){A=this.get(w)===x;
}else{var z=x.split(s);

for(var i=0,l=z.length;i<l;i++){if(this.get(w)===z[i]){A=true;
break;
}}}this.__h[y]=A;
return A;
},__k:function(v){return typeof v===q&&v!==null&&v instanceof Array;
},__l:function(v){return typeof v===q&&v!==null&&!(v instanceof Array);
},__m:function(J,K){for(var i=0,l=J.length;i<l;i++){if(J[i]==K){return true;
}}return false;
}},defer:function(I){I.define(d,[a,h,b,g],qx.bom.client.Engine.NAME);
I.define(k,[u,t],u);
I.define(o,[u,t],t);
I.define(j,[u,t],u);
I.__i();
}});
})();
(function(){var r="other",q="widgets",p="fonts",o="appearances",n="qx.Theme",m="]",k="[Theme ",j="colors",h="decorations",g="Theme",d="meta",f="borders",e="icons";
qx.Bootstrap.define(n,{statics:{define:function(name,y){if(!y){var y={};
}y.include=this.__n(y.include);
y.patch=this.__n(y.patch);
{};
var z={$$type:g,name:name,title:y.title,toString:this.genericToString};
if(y.extend){z.supertheme=y.extend;
}z.basename=qx.Bootstrap.createNamespace(name,z);
this.__q(z,y);
this.__o(z,y);
this.$$registry[name]=z;
for(var i=0,a=y.include,l=a.length;i<l;i++){this.include(z,a[i]);
}
for(var i=0,a=y.patch,l=a.length;i<l;i++){this.patch(z,a[i]);
}},__n:function(D){if(!D){return [];
}
if(qx.Bootstrap.isArray(D)){return D;
}else{return [D];
}},__o:function(A,B){var C=B.aliases||{};

if(B.extend&&B.extend.aliases){qx.Bootstrap.objectMergeWith(C,B.extend.aliases,false);
}A.aliases=C;
},getAll:function(){return this.$$registry;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},genericToString:function(){return k+this.name+m;
},__p:function(b){for(var i=0,c=this.__r,l=c.length;i<l;i++){if(b[c[i]]){return c[i];
}}},__q:function(K,L){var O=this.__p(L);
if(L.extend&&!O){O=L.extend.type;
}K.type=O||r;
if(!O){return;
}var Q=function(){};
if(L.extend){Q.prototype=new L.extend.$$clazz;
}var P=Q.prototype;
var N=L[O];
for(var M in N){P[M]=N[M];
if(P[M].base){{};
P[M].base=L.extend;
}}K.$$clazz=Q;
K[O]=new Q;
},$$registry:{},__r:[j,f,h,p,e,q,o,d],__s:null,__t:null,__u:function(){},patch:function(s,t){var v=this.__p(t);

if(v!==this.__p(s)){throw new Error("The mixins '"+s.name+"' are not compatible '"+t.name+"'!");
}var u=t[v];
var w=s.$$clazz.prototype;

for(var x in u){w[x]=u[x];
}},include:function(E,F){var H=F.type;

if(H!==E.type){throw new Error("The mixins '"+E.name+"' are not compatible '"+F.name+"'!");
}var G=F[H];
var I=E.$$clazz.prototype;

for(var J in G){if(I[J]!==undefined){continue;
}I[J]=G[J];
}}}});
})();
(function(){var j="#CCCCCC",i="#F3F3F3",h="#E4E4E4",g="#1a1a1a",f="#084FAB",e="gray",d="#fffefe",c="white",b="#4a4a4a",a="#EEEEEE",K="#80B4EF",J="#C72B2B",I="#ffffdd",H="#334866",G="#00204D",F="#666666",E="#CBC8CD",D="#99C3FE",C="#808080",B="#F4F4F4",q="#001533",r="#909090",o="#FCFCFC",p="#314a6e",m="#B6B6B6",n="#0880EF",k="#4d4d4d",l="#DFDFDF",s="#000000",t="#FF9999",w="#7B7A7E",v="#26364D",y="#990000",x="#AFAFAF",A="#404955",z="#AAAAAA",u="qx.theme.modern.Color";
qx.Theme.define(u,{colors:{"background-application":l,"background-pane":i,"background-light":o,"background-medium":a,"background-splitpane":x,"background-tip":I,"background-tip-error":J,"background-odd":h,"text-light":r,"text-gray":b,"text-label":g,"text-title":p,"text-input":s,"text-hovered":q,"text-disabled":w,"text-selected":d,"text-active":v,"text-inactive":A,"text-placeholder":E,"border-main":k,"border-separator":C,"border-input":H,"border-disabled":m,"border-pane":G,"border-button":F,"border-column":j,"border-focused":D,"invalid":y,"border-focused-invalid":t,"table-pane":i,"table-focus-indicator":n,"table-row-background-focused-selected":f,"table-row-background-focused":K,"table-row-background-selected":f,"table-row-background-even":i,"table-row-background-odd":h,"table-row-selected":d,"table-row":g,"table-row-line":j,"table-column-line":j,"progressive-table-header":z,"progressive-table-row-background-even":B,"progressive-table-row-background-odd":h,"progressive-progressbar-background":e,"progressive-progressbar-indicator-done":j,"progressive-progressbar-indicator-undone":c,"progressive-progressbar-percent-background":e,"progressive-progressbar-percent-text":c}});
})();
(function(){var a="accordion.demo.theme.Color";
qx.Theme.define(a,{extend:qx.theme.modern.Color,colors:{}});
})();
(function(){var h="function",g="Boolean",f="qx.Interface",e="]",d="toggle",c="Interface",b="is",a="[Interface ";
qx.Bootstrap.define(f,{statics:{define:function(name,K){if(K){if(K.extend&&!(K.extend instanceof Array)){K.extend=[K.extend];
}{};
var L=K.statics?K.statics:{};
if(K.extend){L.$$extends=K.extend;
}
if(K.properties){L.$$properties=K.properties;
}
if(K.members){L.$$members=K.members;
}
if(K.events){L.$$events=K.events;
}}else{var L={};
}L.$$type=c;
L.name=name;
L.toString=this.genericToString;
L.basename=qx.Bootstrap.createNamespace(name,L);
qx.Interface.$$registry[name]=L;
return L;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(M){if(!M){return [];
}var N=M.concat();

for(var i=0,l=M.length;i<l;i++){if(M[i].$$extends){N.push.apply(N,this.flatten(M[i].$$extends));
}}return N;
},__v:function(o,p,q,r){var v=q.$$members;

if(v){for(var u in v){if(qx.Bootstrap.isFunction(v[u])){var t=this.__w(p,u);
var s=t||qx.Bootstrap.isFunction(o[u]);

if(!s){throw new Error('Implementation of method "'+u+'" is missing in class "'+p.classname+'" required by interface "'+q.name+'"');
}var w=r===true&&!t&&!qx.Bootstrap.hasInterface(p,q);

if(w){o[u]=this.__z(q,o[u],u,v[u]);
}}else{if(typeof o[u]===undefined){if(typeof o[u]!==h){throw new Error('Implementation of member "'+u+'" is missing in class "'+p.classname+'" required by interface "'+q.name+'"');
}}}}}},__w:function(E,F){var J=F.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!J){return false;
}var G=qx.Bootstrap.firstLow(J[2]);
var H=qx.Bootstrap.getPropertyDefinition(E,G);

if(!H){return false;
}var I=J[0]==b||J[0]==d;

if(I){return qx.Bootstrap.getPropertyDefinition(E,G).check==g;
}return true;
},__x:function(x,y){if(y.$$properties){for(var z in y.$$properties){if(!qx.Bootstrap.getPropertyDefinition(x,z)){throw new Error('The property "'+z+'" is not supported by Class "'+x.classname+'"!');
}}}},__y:function(O,P){if(P.$$events){for(var Q in P.$$events){if(!qx.Bootstrap.supportsEvent(O,Q)){throw new Error('The event "'+Q+'" is not supported by Class "'+O.classname+'"!');
}}}},assertObject:function(j,k){var n=j.constructor;
this.__v(j,n,k,false);
this.__x(n,k);
this.__y(n,k);
var m=k.$$extends;

if(m){for(var i=0,l=m.length;i<l;i++){this.assertObject(j,m[i]);
}}},assert:function(A,B,C){this.__v(A.prototype,A,B,C);
this.__x(A,B);
this.__y(A,B);
var D=B.$$extends;

if(D){for(var i=0,l=D.length;i<l;i++){this.assert(A,D[i],C);
}}},genericToString:function(){return a+this.name+e;
},$$registry:{},__z:function(){},__A:null,__B:function(){}}});
})();
(function(){var g="qx.Mixin",f=".prototype",e="constructor",d="[Mixin ",c="]",b="destruct",a="Mixin";
qx.Bootstrap.define(g,{statics:{define:function(name,k){if(k){if(k.include&&!(k.include instanceof Array)){k.include=[k.include];
}{};
var n=k.statics?k.statics:{};
qx.Bootstrap.setDisplayNames(n,name);

for(var m in n){if(n[m] instanceof Function){n[m].$$mixin=n;
}}if(k.construct){n.$$constructor=k.construct;
qx.Bootstrap.setDisplayName(k.construct,name,e);
}
if(k.include){n.$$includes=k.include;
}
if(k.properties){n.$$properties=k.properties;
}
if(k.members){n.$$members=k.members;
qx.Bootstrap.setDisplayNames(k.members,name+f);
}
for(var m in n.$$members){if(n.$$members[m] instanceof Function){n.$$members[m].$$mixin=n;
}}
if(k.events){n.$$events=k.events;
}
if(k.destruct){n.$$destructor=k.destruct;
qx.Bootstrap.setDisplayName(k.destruct,name,b);
}}else{var n={};
}n.$$type=a;
n.name=name;
n.toString=this.genericToString;
n.basename=qx.Bootstrap.createNamespace(name,n);
this.$$registry[name]=n;
return n;
},checkCompatibility:function(o){var r=this.flatten(o);
var s=r.length;

if(s<2){return true;
}var v={};
var u={};
var t={};
var q;

for(var i=0;i<s;i++){q=r[i];

for(var p in q.events){if(t[p]){throw new Error('Conflict between mixin "'+q.name+'" and "'+t[p]+'" in member "'+p+'"!');
}t[p]=q.name;
}
for(var p in q.properties){if(v[p]){throw new Error('Conflict between mixin "'+q.name+'" and "'+v[p]+'" in property "'+p+'"!');
}v[p]=q.name;
}
for(var p in q.members){if(u[p]){throw new Error('Conflict between mixin "'+q.name+'" and "'+u[p]+'" in member "'+p+'"!');
}u[p]=q.name;
}}return true;
},isCompatible:function(w,x){var y=qx.Bootstrap.getMixins(x);
y.push(w);
return qx.Mixin.checkCompatibility(y);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(h){if(!h){return [];
}var j=h.concat();

for(var i=0,l=h.length;i<l;i++){if(h[i].$$includes){j.push.apply(j,this.flatten(h[i].$$includes));
}}return j;
},genericToString:function(){return d+this.name+c;
},$$registry:{},__C:null,__D:function(){}}});
})();
(function(){var cc=';',cb='return this.',ca="boolean",bY="string",bX='!==undefined)',bW='else if(this.',bV='if(this.',bU='else ',bT=' of an instance of ',bS=' is not (yet) ready!");',cw="init",cv="': ",cu=" of class ",ct='return value;',cs='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',cr='return init;',cq='var init=this.',cp="Error in property ",co='if(init==qx.core.Property.$$inherit)init=null;',cn="set",cj=" in method ",ck='throw new Error("Property ',ch='var inherit=prop.$$inherit;',ci='return null;',cf="setRuntime",cg="setThemed",cd="inherit",ce=" with incoming value '",cl="object",cm="qx.core.Property";
qx.Bootstrap.define(cm,{statics:{__E:{"Boolean":'qx.core.Assert.assertBoolean(value, msg) || true',"String":'qx.core.Assert.assertString(value, msg) || true',"Number":'qx.core.Assert.assertNumber(value, msg) || true',"Integer":'qx.core.Assert.assertInteger(value, msg) || true',"PositiveNumber":'qx.core.Assert.assertPositiveNumber(value, msg) || true',"PositiveInteger":'qx.core.Assert.assertPositiveInteger(value, msg) || true',"Error":'qx.core.Assert.assertInstance(value, Error, msg) || true',"RegExp":'qx.core.Assert.assertInstance(value, RegExp, msg) || true',"Object":'qx.core.Assert.assertObject(value, msg) || true',"Array":'qx.core.Assert.assertArray(value, msg) || true',"Map":'qx.core.Assert.assertMap(value, msg) || true',"Function":'qx.core.Assert.assertFunction(value, msg) || true',"Date":'qx.core.Assert.assertInstance(value, Date, msg) || true',"Node":'value !== null && value.nodeType !== undefined',"Element":'value !== null && value.nodeType === 1 && value.attributes',"Document":'value !== null && value.nodeType === 9 && value.documentElement',"Window":'value !== null && value.document',"Event":'value !== null && value.type !== undefined',"Class":'value !== null && value.$$type === "Class"',"Mixin":'value !== null && value.$$type === "Mixin"',"Interface":'value !== null && value.$$type === "Interface"',"Theme":'value !== null && value.$$type === "Theme"',"Color":'qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',"Decorator":'value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',"Font":'value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)'},__F:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:cd,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:bY,dispose:ca,inheritable:ca,nullable:ca,themeable:ca,refine:ca,init:null,apply:bY,event:bY,check:null,transform:bY,deferredInit:ca,validate:null},$$allowedGroupKeys:{name:bY,group:cl,mode:bY,themeable:ca},$$inheritable:{},refresh:function(A){var parent=A.getLayoutParent();

if(parent){var D=A.constructor;
var F=this.$$store.inherit;
var E=this.$$store.init;
var C=this.$$method.refresh;
var G;
var B;
{};

while(D){G=D.$$properties;

if(G){for(var name in this.$$inheritable){if(G[name]&&A[C[name]]){B=parent[F[name]];

if(B===undefined){B=parent[E[name]];
}{};
A[C[name]](B);
}}}D=D.superclass;
}}},attach:function(bG){var bH=bG.$$properties;

if(bH){for(var name in bH){this.attachMethods(bG,name,bH[name]);
}}bG.$$propertiesAttached=true;
},attachMethods:function(b,name,c){c.group?this.__G(b,c,name):this.__H(b,c,name);
},__G:function(I,J,name){var Q=qx.Bootstrap.firstUp(name);
var P=I.prototype;
var R=J.themeable===true;
{};
var S=[];
var M=[];

if(R){var K=[];
var O=[];
}var N="var a=arguments[0] instanceof Array?arguments[0]:arguments;";
S.push(N);

if(R){K.push(N);
}
if(J.mode=="shorthand"){var L="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));";
S.push(L);

if(R){K.push(L);
}}
for(var i=0,a=J.group,l=a.length;i<l;i++){{};
S.push("this.",this.$$method.set[a[i]],"(a[",i,"]);");
M.push("this.",this.$$method.reset[a[i]],"();");

if(R){{};
K.push("this.",this.$$method.setThemed[a[i]],"(a[",i,"]);");
O.push("this.",this.$$method.resetThemed[a[i]],"();");
}}this.$$method.set[name]="set"+Q;
P[this.$$method.set[name]]=new Function(S.join(""));
this.$$method.reset[name]="reset"+Q;
P[this.$$method.reset[name]]=new Function(M.join(""));

if(R){this.$$method.setThemed[name]="setThemed"+Q;
P[this.$$method.setThemed[name]]=new Function(K.join(""));
this.$$method.resetThemed[name]="resetThemed"+Q;
P[this.$$method.resetThemed[name]]=new Function(O.join(""));
}},__H:function(U,V,name){var X=qx.Bootstrap.firstUp(name);
var ba=U.prototype;
{};
if(V.dispose===undefined&&typeof V.check==="string"){V.dispose=this.__F[V.check]||qx.Bootstrap.classIsDefined(V.check)||(qx.Interface&&qx.Interface.isDefined(V.check));
}var Y=this.$$method;
var W=this.$$store;
W.runtime[name]="$$runtime_"+name;
W.user[name]="$$user_"+name;
W.theme[name]="$$theme_"+name;
W.init[name]="$$init_"+name;
W.inherit[name]="$$inherit_"+name;
W.useinit[name]="$$useinit_"+name;
Y.get[name]="get"+X;
ba[Y.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,U,name,"get");
};
Y.set[name]="set"+X;
ba[Y.set[name]]=function(T){return qx.core.Property.executeOptimizedSetter(this,U,name,"set",arguments);
};
Y.reset[name]="reset"+X;
ba[Y.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,U,name,"reset");
};

if(V.inheritable||V.apply||V.event||V.deferredInit){Y.init[name]="init"+X;
ba[Y.init[name]]=function(bF){return qx.core.Property.executeOptimizedSetter(this,U,name,"init",arguments);
};
}
if(V.inheritable){Y.refresh[name]="refresh"+X;
ba[Y.refresh[name]]=function(H){return qx.core.Property.executeOptimizedSetter(this,U,name,"refresh",arguments);
};
}Y.setRuntime[name]="setRuntime"+X;
ba[Y.setRuntime[name]]=function(d){return qx.core.Property.executeOptimizedSetter(this,U,name,"setRuntime",arguments);
};
Y.resetRuntime[name]="resetRuntime"+X;
ba[Y.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,U,name,"resetRuntime");
};

if(V.themeable){Y.setThemed[name]="setThemed"+X;
ba[Y.setThemed[name]]=function(n){return qx.core.Property.executeOptimizedSetter(this,U,name,"setThemed",arguments);
};
Y.resetThemed[name]="resetThemed"+X;
ba[Y.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,U,name,"resetThemed");
};
}
if(V.check==="Boolean"){ba["toggle"+X]=new Function("return this."+Y.set[name]+"(!this."+Y.get[name]+"())");
ba["is"+X]=new Function("return this."+Y.get[name]+"()");
}},__I:{0:'Could not change or apply init value after constructing phase!',1:'Requires exactly one argument!',2:'Undefined value is not allowed!',3:'Does not allow any arguments!',4:'Null value is not allowed!',5:'Is invalid!'},error:function(o,p,q,r,s){var t=o.constructor.classname;
var u=cp+q+cu+t+cj+this.$$method[r][q]+ce+s+cv;
throw new Error(u+(this.__I[p]||"Unknown reason: "+p));
},__J:function(bp,bq,name,br,bs,bt){var bu=this.$$method[br][name];
{bq[bu]=new Function("value",bs.join(""));
};
if(qx.core.Variant.isSet("qx.aspects","on")){bq[bu]=qx.core.Aspect.wrap(bp.classname+"."+bu,bq[bu],"property");
}qx.Bootstrap.setDisplayName(bq[bu],bp.classname+".prototype",bu);
if(bt===undefined){return bp[bu]();
}else{return bp[bu](bt[0]);
}},executeOptimizedGetter:function(bb,bc,name,bd){var bf=bc.$$properties[name];
var bh=bc.prototype;
var be=[];
var bg=this.$$store;
be.push(bV,bg.runtime[name],bX);
be.push(cb,bg.runtime[name],cc);

if(bf.inheritable){be.push(bW,bg.inherit[name],bX);
be.push(cb,bg.inherit[name],cc);
be.push(bU);
}be.push(bV,bg.user[name],bX);
be.push(cb,bg.user[name],cc);

if(bf.themeable){be.push(bW,bg.theme[name],bX);
be.push(cb,bg.theme[name],cc);
}
if(bf.deferredInit&&bf.init===undefined){be.push(bW,bg.init[name],bX);
be.push(cb,bg.init[name],cc);
}be.push(bU);

if(bf.init!==undefined){if(bf.inheritable){be.push(cq,bg.init[name],cc);

if(bf.nullable){be.push(co);
}else if(bf.init!==undefined){be.push(cb,bg.init[name],cc);
}else{be.push(cs,name,bT,bc.classname,bS);
}be.push(cr);
}else{be.push(cb,bg.init[name],cc);
}}else if(bf.inheritable||bf.nullable){be.push(ci);
}else{be.push(ck,name,bT,bc.classname,bS);
}return this.__J(bb,bh,name,bd,be);
},executeOptimizedSetter:function(bv,bw,name,bx,by){var bD=bw.$$properties[name];
var bC=bw.prototype;
var bA=[];
var bz=bx===cn||bx===cg||bx===cf||(bx===cw&&bD.init===undefined);
var bB=bD.apply||bD.event||bD.inheritable;
var bE=this.__K(bx,name);
this.__L(bA,bD,name,bx,bz);

if(bz){this.__M(bA,bw,bD,name);
}
if(bB){this.__N(bA,bz,bE,bx);
}
if(bD.inheritable){bA.push(ch);
}{};

if(!bB){this.__P(bA,name,bx,bz);
}else{this.__Q(bA,bD,name,bx,bz);
}
if(bD.inheritable){this.__R(bA,bD,name,bx);
}else if(bB){this.__S(bA,bD,name,bx);
}
if(bB){this.__T(bA,bD,name);
if(bD.inheritable&&bC._getChildren){this.__U(bA,name);
}}if(bz){bA.push(ct);
}return this.__J(bv,bC,name,bx,bA,by);
},__K:function(v,name){if(v==="setRuntime"||v==="resetRuntime"){var w=this.$$store.runtime[name];
}else if(v==="setThemed"||v==="resetThemed"){w=this.$$store.theme[name];
}else if(v==="init"){w=this.$$store.init[name];
}else{w=this.$$store.user[name];
}return w;
},__L:function(e,f,name,g,h){{if(!f.nullable||f.check||f.inheritable){e.push('var prop=qx.core.Property;');
}if(g==="set"){e.push('if(value===undefined)prop.error(this,2,"',name,'","',g,'",value);');
}};
},__M:function(x,y,z,name){if(z.transform){x.push('value=this.',z.transform,'(value);');
}if(z.validate){if(typeof z.validate==="string"){x.push('this.',z.validate,'(value);');
}else if(z.validate instanceof Function){x.push(y.classname,'.$$properties.',name);
x.push('.validate.call(this, value);');
}}},__N:function(bk,bl,bm,bn){var bo=(bn==="reset"||bn==="resetThemed"||bn==="resetRuntime");

if(bl){bk.push('if(this.',bm,'===value)return value;');
}else if(bo){bk.push('if(this.',bm,'===undefined)return;');
}},__O:undefined,__P:function(bI,name,bJ,bK){if(bJ==="setRuntime"){bI.push('this.',this.$$store.runtime[name],'=value;');
}else if(bJ==="resetRuntime"){bI.push('if(this.',this.$$store.runtime[name],'!==undefined)');
bI.push('delete this.',this.$$store.runtime[name],';');
}else if(bJ==="set"){bI.push('this.',this.$$store.user[name],'=value;');
}else if(bJ==="reset"){bI.push('if(this.',this.$$store.user[name],'!==undefined)');
bI.push('delete this.',this.$$store.user[name],';');
}else if(bJ==="setThemed"){bI.push('this.',this.$$store.theme[name],'=value;');
}else if(bJ==="resetThemed"){bI.push('if(this.',this.$$store.theme[name],'!==undefined)');
bI.push('delete this.',this.$$store.theme[name],';');
}else if(bJ==="init"&&bK){bI.push('this.',this.$$store.init[name],'=value;');
}},__Q:function(bO,bP,name,bQ,bR){if(bP.inheritable){bO.push('var computed, old=this.',this.$$store.inherit[name],';');
}else{bO.push('var computed, old;');
}bO.push('if(this.',this.$$store.runtime[name],'!==undefined){');

if(bQ==="setRuntime"){bO.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(bQ==="resetRuntime"){bO.push('delete this.',this.$$store.runtime[name],';');
bO.push('if(this.',this.$$store.user[name],'!==undefined)');
bO.push('computed=this.',this.$$store.user[name],';');
bO.push('else if(this.',this.$$store.theme[name],'!==undefined)');
bO.push('computed=this.',this.$$store.theme[name],';');
bO.push('else if(this.',this.$$store.init[name],'!==undefined){');
bO.push('computed=this.',this.$$store.init[name],';');
bO.push('this.',this.$$store.useinit[name],'=true;');
bO.push('}');
}else{bO.push('old=computed=this.',this.$$store.runtime[name],';');
if(bQ==="set"){bO.push('this.',this.$$store.user[name],'=value;');
}else if(bQ==="reset"){bO.push('delete this.',this.$$store.user[name],';');
}else if(bQ==="setThemed"){bO.push('this.',this.$$store.theme[name],'=value;');
}else if(bQ==="resetThemed"){bO.push('delete this.',this.$$store.theme[name],';');
}else if(bQ==="init"&&bR){bO.push('this.',this.$$store.init[name],'=value;');
}}bO.push('}');
bO.push('else if(this.',this.$$store.user[name],'!==undefined){');

if(bQ==="set"){if(!bP.inheritable){bO.push('old=this.',this.$$store.user[name],';');
}bO.push('computed=this.',this.$$store.user[name],'=value;');
}else if(bQ==="reset"){if(!bP.inheritable){bO.push('old=this.',this.$$store.user[name],';');
}bO.push('delete this.',this.$$store.user[name],';');
bO.push('if(this.',this.$$store.runtime[name],'!==undefined)');
bO.push('computed=this.',this.$$store.runtime[name],';');
bO.push('if(this.',this.$$store.theme[name],'!==undefined)');
bO.push('computed=this.',this.$$store.theme[name],';');
bO.push('else if(this.',this.$$store.init[name],'!==undefined){');
bO.push('computed=this.',this.$$store.init[name],';');
bO.push('this.',this.$$store.useinit[name],'=true;');
bO.push('}');
}else{if(bQ==="setRuntime"){bO.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(bP.inheritable){bO.push('computed=this.',this.$$store.user[name],';');
}else{bO.push('old=computed=this.',this.$$store.user[name],';');
}if(bQ==="setThemed"){bO.push('this.',this.$$store.theme[name],'=value;');
}else if(bQ==="resetThemed"){bO.push('delete this.',this.$$store.theme[name],';');
}else if(bQ==="init"&&bR){bO.push('this.',this.$$store.init[name],'=value;');
}}bO.push('}');
if(bP.themeable){bO.push('else if(this.',this.$$store.theme[name],'!==undefined){');

if(!bP.inheritable){bO.push('old=this.',this.$$store.theme[name],';');
}
if(bQ==="setRuntime"){bO.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(bQ==="set"){bO.push('computed=this.',this.$$store.user[name],'=value;');
}else if(bQ==="setThemed"){bO.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(bQ==="resetThemed"){bO.push('delete this.',this.$$store.theme[name],';');
bO.push('if(this.',this.$$store.init[name],'!==undefined){');
bO.push('computed=this.',this.$$store.init[name],';');
bO.push('this.',this.$$store.useinit[name],'=true;');
bO.push('}');
}else if(bQ==="init"){if(bR){bO.push('this.',this.$$store.init[name],'=value;');
}bO.push('computed=this.',this.$$store.theme[name],';');
}else if(bQ==="refresh"){bO.push('computed=this.',this.$$store.theme[name],';');
}bO.push('}');
}bO.push('else if(this.',this.$$store.useinit[name],'){');

if(!bP.inheritable){bO.push('old=this.',this.$$store.init[name],';');
}
if(bQ==="init"){if(bR){bO.push('computed=this.',this.$$store.init[name],'=value;');
}else{bO.push('computed=this.',this.$$store.init[name],';');
}}else if(bQ==="set"||bQ==="setRuntime"||bQ==="setThemed"||bQ==="refresh"){bO.push('delete this.',this.$$store.useinit[name],';');

if(bQ==="setRuntime"){bO.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(bQ==="set"){bO.push('computed=this.',this.$$store.user[name],'=value;');
}else if(bQ==="setThemed"){bO.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(bQ==="refresh"){bO.push('computed=this.',this.$$store.init[name],';');
}}bO.push('}');
if(bQ==="set"||bQ==="setRuntime"||bQ==="setThemed"||bQ==="init"){bO.push('else{');

if(bQ==="setRuntime"){bO.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(bQ==="set"){bO.push('computed=this.',this.$$store.user[name],'=value;');
}else if(bQ==="setThemed"){bO.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(bQ==="init"){if(bR){bO.push('computed=this.',this.$$store.init[name],'=value;');
}else{bO.push('computed=this.',this.$$store.init[name],';');
}bO.push('this.',this.$$store.useinit[name],'=true;');
}bO.push('}');
}},__R:function(j,k,name,m){j.push('if(computed===undefined||computed===inherit){');

if(m==="refresh"){j.push('computed=value;');
}else{j.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');
}j.push('if((computed===undefined||computed===inherit)&&');
j.push('this.',this.$$store.init[name],'!==undefined&&');
j.push('this.',this.$$store.init[name],'!==inherit){');
j.push('computed=this.',this.$$store.init[name],';');
j.push('this.',this.$$store.useinit[name],'=true;');
j.push('}else{');
j.push('delete this.',this.$$store.useinit[name],';}');
j.push('}');
j.push('if(old===computed)return value;');
j.push('if(computed===inherit){');
j.push('computed=undefined;delete this.',this.$$store.inherit[name],';');
j.push('}');
j.push('else if(computed===undefined)');
j.push('delete this.',this.$$store.inherit[name],';');
j.push('else this.',this.$$store.inherit[name],'=computed;');
j.push('var backup=computed;');
if(k.init!==undefined&&m!=="init"){j.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{j.push('if(old===undefined)old=null;');
}j.push('if(computed===undefined||computed==inherit)computed=null;');
},__S:function(bL,bM,name,bN){if(bN!=="set"&&bN!=="setRuntime"&&bN!=="setThemed"){bL.push('if(computed===undefined)computed=null;');
}bL.push('if(old===computed)return value;');
if(bM.init!==undefined&&bN!=="init"){bL.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{bL.push('if(old===undefined)old=null;');
}},__T:function(bi,bj,name){if(bj.apply){bi.push('this.',bj.apply,'(computed, old, "',name,'");');
}if(bj.event){bi.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",bj.event,"')){","reg.fireEvent(this, '",bj.event,"', qx.event.type.Data, [computed, old]",")}");
}},__U:function(cx,name){cx.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');
cx.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');
cx.push('}');
}}});
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
(function(){var C="qx.aspects",B="on",A=".",z="static",y="constructor",x="[Class ",w="]",v="toString",u="member",t="$$init_",n=".prototype",s="destructor",q="extend",m="destruct",k="Class",p="off",o="qx.Class",r="singleton",j="qx.event.type.Data";
qx.Bootstrap.define(o,{statics:{define:function(name,bI){if(!bI){var bI={};
}if(bI.include&&!(bI.include instanceof Array)){bI.include=[bI.include];
}if(bI.implement&&!(bI.implement instanceof Array)){bI.implement=[bI.implement];
}if(!bI.hasOwnProperty(q)&&!bI.type){bI.type=z;
}{};
var bK=this.__bb(name,bI.type,bI.extend,bI.statics,bI.construct,bI.destruct);
if(bI.extend){if(bI.properties){this.__bd(bK,bI.properties,true);
}if(bI.members){this.__bf(bK,bI.members,true,true,false);
}if(bI.events){this.__bc(bK,bI.events,true);
}if(bI.include){for(var i=0,l=bI.include.length;i<l;i++){this.__bi(bK,bI.include[i],false);
}}}if(bI.settings){for(var bJ in bI.settings){qx.core.Setting.define(bJ,bI.settings[bJ]);
}}if(bI.variants){for(var bJ in bI.variants){qx.core.Variant.define(bJ,bI.variants[bJ].allowedValues,bI.variants[bJ].defaultValue);
}}if(bI.implement){for(var i=0,l=bI.implement.length;i<l;i++){this.__bh(bK,bI.implement[i]);
}}{};
if(bI.defer){bI.defer.self=bK;
bI.defer(bK,bK.prototype,{add:function(name,b){var c={};
c[name]=b;
qx.Class.__bd(bK,c,true);
}});
}return bK;
},isDefined:qx.Bootstrap.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},getByName:qx.Bootstrap.getByName,include:function(g,h){{};
qx.Class.__bi(g,h,false);
},patch:function(by,bz){{};
qx.Class.__bi(by,bz,true);
},isSubClassOf:function(ca,cb){if(!ca){return false;
}
if(ca==cb){return true;
}
if(ca.prototype instanceof cb){return true;
}return false;
},getPropertyDefinition:qx.Bootstrap.getPropertyDefinition,getProperties:function(P){var Q=[];

while(P){if(P.$$properties){Q.push.apply(Q,qx.Bootstrap.getKeys(P.$$properties));
}P=P.superclass;
}return Q;
},getByProperty:function(bQ,name){while(bQ){if(bQ.$$properties&&bQ.$$properties[name]){return bQ;
}bQ=bQ.superclass;
}return null;
},hasProperty:qx.Bootstrap.hasProperty,getEventType:qx.Bootstrap.getEventType,supportsEvent:qx.Bootstrap.supportsEvent,hasOwnMixin:function(X,Y){return X.$$includes&&X.$$includes.indexOf(Y)!==-1;
},getByMixin:function(bg,bh){var bi,i,l;

while(bg){if(bg.$$includes){bi=bg.$$flatIncludes;

for(i=0,l=bi.length;i<l;i++){if(bi[i]===bh){return bg;
}}}bg=bg.superclass;
}return null;
},getMixins:qx.Bootstrap.getMixins,hasMixin:function(R,S){return !!this.getByMixin(R,S);
},hasOwnInterface:function(bT,bU){return bT.$$implements&&bT.$$implements.indexOf(bU)!==-1;
},getByInterface:qx.Bootstrap.getByInterface,getInterfaces:function(bw){var bx=[];

while(bw){if(bw.$$implements){bx.push.apply(bx,bw.$$flatImplements);
}bw=bw.superclass;
}return bx;
},hasInterface:qx.Bootstrap.hasInterface,implementsInterface:function(br,bs){var bt=br.constructor;

if(this.hasInterface(bt,bs)){return true;
}
try{qx.Interface.assertObject(br,bs);
return true;
}catch(bf){}
try{qx.Interface.assert(bt,bs,false);
return true;
}catch(bA){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return x+this.classname+w;
},$$registry:qx.Bootstrap.$$registry,__W:null,__X:null,__Y:function(){},__ba:function(){},__bb:function(name,D,E,F,G,H){var M;

if(!E&&qx.core.Variant.isSet(C,p)){M=F||{};
qx.Bootstrap.setDisplayNames(M,name);
}else{M={};

if(E){if(!G){G=this.__bj();
}M=this.__bl(G,name,D);
qx.Bootstrap.setDisplayName(G,name,y);
}if(F){qx.Bootstrap.setDisplayNames(F,name);
var N;

for(var i=0,a=qx.Bootstrap.getKeys(F),l=a.length;i<l;i++){N=a[i];
var J=F[N];

if(qx.core.Variant.isSet(C,B)){if(J instanceof Function){J=qx.core.Aspect.wrap(name+A+N,J,z);
}M[N]=J;
}else{M[N]=J;
}}}}var L=qx.Bootstrap.createNamespace(name,M,false);
M.name=M.classname=name;
M.basename=L;
M.$$type=k;

if(D){M.$$classtype=D;
}if(!M.hasOwnProperty(v)){M.toString=this.genericToString;
}
if(E){var O=E.prototype;
var I=this.__bk();
I.prototype=O;
var K=new I;
M.prototype=K;
K.name=K.classname=name;
K.basename=L;
G.base=M.superclass=E;
G.self=M.constructor=K.constructor=M;
if(H){if(qx.core.Variant.isSet(C,B)){H=qx.core.Aspect.wrap(name,H,s);
}M.$$destructor=H;
qx.Bootstrap.setDisplayName(H,name,m);
}}this.$$registry[name]=M;
return M;
},__bc:function(bB,bC,bD){var bE,bE;
{};

if(bB.$$events){for(var bE in bC){bB.$$events[bE]=bC[bE];
}}else{bB.$$events=bC;
}},__bd:function(bL,bM,bN){var bP;

if(bN===undefined){bN=false;
}var bO=!!bL.$$propertiesAttached;

for(var name in bM){bP=bM[name];
{};
bP.name=name;
if(!bP.refine){if(bL.$$properties===undefined){bL.$$properties={};
}bL.$$properties[name]=bP;
}if(bP.init!==undefined){bL.prototype[t+name]=bP.init;
}if(bP.event!==undefined){var event={};
event[bP.event]=j;
this.__bc(bL,event,bN);
}if(bP.inheritable){qx.core.Property.$$inheritable[name]=true;
}if(bO){qx.core.Property.attachMethods(bL,name,bP);
}}},__be:null,__bf:function(bj,bk,bl,bm,bn){var bo=bj.prototype;
var bq,bp;
qx.Bootstrap.setDisplayNames(bk,bj.classname+n);

for(var i=0,a=qx.Bootstrap.getKeys(bk),l=a.length;i<l;i++){bq=a[i];
bp=bk[bq];
{};
if(bm!==false&&bp instanceof Function&&bp.$$type==null){if(bn==true){bp=this.__bg(bp,bo[bq]);
}else{if(bo[bq]){bp.base=bo[bq];
}bp.self=bj;
}
if(qx.core.Variant.isSet(C,B)){bp=qx.core.Aspect.wrap(bj.classname+A+bq,bp,u);
}}bo[bq]=bp;
}},__bg:function(bu,bv){if(bv){return function(){var bS=bu.base;
bu.base=bv;
var bR=bu.apply(this,arguments);
bu.base=bS;
return bR;
};
}else{return bu;
}},__bh:function(bF,bG){{};
var bH=qx.Interface.flatten([bG]);

if(bF.$$implements){bF.$$implements.push(bG);
bF.$$flatImplements.push.apply(bF.$$flatImplements,bH);
}else{bF.$$implements=[bG];
bF.$$flatImplements=bH;
}},__bi:function(ba,bb,bc){{};

if(this.hasMixin(ba,bb)){return;
}var be=qx.Mixin.flatten([bb]);
var bd;

for(var i=0,l=be.length;i<l;i++){bd=be[i];
if(bd.$$events){this.__bc(ba,bd.$$events,bc);
}if(bd.$$properties){this.__bd(ba,bd.$$properties,bc);
}if(bd.$$members){this.__bf(ba,bd.$$members,bc,bc,bc);
}}if(ba.$$includes){ba.$$includes.push(bb);
ba.$$flatIncludes.push.apply(ba.$$flatIncludes,be);
}else{ba.$$includes=[bb];
ba.$$flatIncludes=be;
}},__bj:function(){function T(){arguments.callee.base.apply(this,arguments);
}return T;
},__bk:function(){return function(){};
},__bl:function(bV,name,bW){var bY=function(){var f=arguments.callee.constructor;
{};
if(!f.$$propertiesAttached){qx.core.Property.attach(f);
}var e=f.$$original.apply(this,arguments);
if(f.$$includes){var d=f.$$flatIncludes;

for(var i=0,l=d.length;i<l;i++){if(d[i].$$constructor){d[i].$$constructor.apply(this,arguments);
}}}if(this.classname===name.classname){this.$$initialized=true;
}return e;
};

if(qx.core.Variant.isSet(C,B)){var bX=qx.core.Aspect.wrap(name,bY,y);
bY.$$original=bV;
bY.constructor=bX;
bY=bX;
}if(bW===r){bY.getInstance=this.getInstance;
}bY.$$original=bV;
bV.wrapper=bY;
return bY;
}},defer:function(){if(qx.core.Variant.isSet(C,B)){for(var U in qx.Bootstrap.$$registry){var V=qx.Bootstrap.$$registry[U];

for(var W in V){if(V[W] instanceof Function){V[W]=qx.core.Aspect.wrap(U+A+W,V[W],z);
}}}}}});
})();
(function(){var d="$$hash",c="qx.core.ObjectRegistry";
qx.Class.define(c,{statics:{inShutDown:false,__bm:{},__bn:0,__bo:[],register:function(j){var n=this.__bm;

if(!n){return;
}var m=j.$$hash;

if(m==null){var k=this.__bo;

if(k.length>0){m=k.pop();
}else{m=(this.__bn++).toString(36);
}j.$$hash=m;
}{};
n[m]=j;
},unregister:function(s){var t=s.$$hash;

if(t==null){return;
}var u=this.__bm;

if(u&&u[t]){delete u[t];
this.__bo.push(t);
}try{delete s.$$hash;
}catch(e){if(s.removeAttribute){s.removeAttribute(d);
}}},toHashCode:function(f){{};
var h=f.$$hash;

if(h!=null){return h;
}var g=this.__bo;

if(g.length>0){h=g.pop();
}else{h=(this.__bn++).toString(36);
}return f.$$hash=h;
},clearHashCode:function(p){{};
var q=p.$$hash;

if(q!=null){this.__bo.push(q);
try{delete p.$$hash;
}catch(o){if(p.removeAttribute){p.removeAttribute(d);
}}}},fromHashCode:function(z){return this.__bm[z]||null;
},shutdown:function(){this.inShutDown=true;
var w=this.__bm;
var y=[];

for(var x in w){y.push(x);
}y.sort(function(a,b){return parseInt(b,36)-parseInt(a,36);
});
var v,i=0,l=y.length;

while(true){try{for(;i<l;i++){x=y[i];
v=w[x];

if(v&&v.dispose){v.dispose();
}}}catch(r){qx.Bootstrap.error(this,"Could not dispose object "+v.toString()+": "+r);

if(i!==l){i++;
continue;
}}break;
}qx.Bootstrap.debug(this,"Disposed "+l+" objects");
delete this.__bm;
},getRegistry:function(){return this.__bm;
}}});
})();
(function(){var e="qx.data.MBinding";
qx.Mixin.define(e,{members:{bind:function(a,b,c,d){return qx.data.SingleValueBinding.bind(this,a,b,c,d);
},removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
})();
(function(){var i="qx.client",h="on",g="function",f="mousedown",d="qx.bom.Event",c="return;",b="mouseover",a="HTMLEvents";
qx.Class.define(d,{statics:{addNativeListener:qx.core.Variant.select(i,{"mshtml":function(A,B,C){A.attachEvent(h+B,C);
},"default":function(D,E,F){D.addEventListener(E,F,false);
}}),removeNativeListener:qx.core.Variant.select(i,{"mshtml":function(u,v,w){try{u.detachEvent(h+v,w);
}catch(e){if(e.number!==-2146828218){throw e;
}}},"default":function(x,y,z){x.removeEventListener(y,z,false);
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
}catch(q){}}},"mshtml":function(e){try{e.keyCode=0;
}catch(p){}e.returnValue=false;
},"default":function(e){e.preventDefault();
}}),stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}e.cancelBubble=true;
},fire:function(r,s){if(document.createEventObject){var t=document.createEventObject();
return r.fireEvent(h+s,t);
}else{var t=document.createEvent(a);
t.initEvent(s,true,true);
return !r.dispatchEvent(t);
}},supportsEvent:qx.core.Variant.select(i,{"webkit":function(n,o){return n.hasOwnProperty(h+o);
},"default":function(j,k){var l=h+k;
var m=(l in j);

if(!m){m=typeof j[l]==g;

if(!m&&j.setAttribute){j.setAttribute(l,c);
m=typeof j[l]==g;
j.removeAttribute(l);
}}return m;
}})}});
})();
(function(){var bk="|bubble",bj="|capture",bi="|",bh="_",bg="unload",bf="UNKNOWN_",be="DOM_",bd="__bu",bc="c",bb="__bt",X="WIN_",ba="capture",Y="qx.event.Manager",W="QX_";
qx.Class.define(Y,{extend:Object,construct:function(ct,cu){this.__bp=ct;
this.__bq=qx.core.ObjectRegistry.toHashCode(ct);
this.__br=cu;
if(ct.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(ct,bg,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(ct,bg,arguments.callee);
self.dispose();
}));
}this.__bs={};
this.__bt={};
this.__bu={};
this.__bv={};
},statics:{__bw:0,getNextUniqueId:function(){return (this.__bw++).toString(36);
}},members:{__br:null,__bs:null,__bu:null,__bx:null,__bt:null,__bv:null,__bp:null,__bq:null,getWindow:function(){return this.__bp;
},getWindowId:function(){return this.__bq;
},getHandler:function(J){var K=this.__bt[J.classname];

if(K){return K;
}return this.__bt[J.classname]=new J(this);
},getDispatcher:function(A){var B=this.__bu[A.classname];

if(B){return B;
}return this.__bu[A.classname]=new A(this,this.__br);
},getListeners:function(C,D,E){var F=C.$$hash||qx.core.ObjectRegistry.toHashCode(C);
var H=this.__bs[F];

if(!H){return null;
}var I=D+(E?bj:bk);
var G=H[I];
return G?G.concat():null;
},serializeListeners:function(bR){var bY=bR.$$hash||qx.core.ObjectRegistry.toHashCode(bR);
var cb=this.__bs[bY];
var bW=[];

if(cb){var bU,ca,bS,bV,bX;

for(var bT in cb){bU=bT.indexOf(bi);
ca=bT.substring(0,bU);
bS=bT.charAt(bU+1)==bc;
bV=cb[bT];

for(var i=0,l=bV.length;i<l;i++){bX=bV[i];
bW.push({self:bX.context,handler:bX.handler,type:ca,capture:bS});
}}}return bW;
},toggleAttachedEvents:function(cv,cw){var cB=cv.$$hash||qx.core.ObjectRegistry.toHashCode(cv);
var cD=this.__bs[cB];

if(cD){var cy,cC,cx,cz;

for(var cA in cD){cy=cA.indexOf(bi);
cC=cA.substring(0,cy);
cx=cA.charCodeAt(cy+1)===99;
cz=cD[cA];

if(cw){this.__by(cv,cC,cx);
}else{this.__bz(cv,cC,cx);
}}}},hasListener:function(cc,cd,ce){{};
var cf=cc.$$hash||qx.core.ObjectRegistry.toHashCode(cc);
var ch=this.__bs[cf];

if(!ch){return false;
}var ci=cd+(ce?bj:bk);
var cg=ch[ci];
return cg&&cg.length>0;
},importListeners:function(bI,bJ){{};
var bP=bI.$$hash||qx.core.ObjectRegistry.toHashCode(bI);
var bQ=this.__bs[bP]={};
var bM=qx.event.Manager;

for(var bK in bJ){var bN=bJ[bK];
var bO=bN.type+(bN.capture?bj:bk);
var bL=bQ[bO];

if(!bL){bL=bQ[bO]=[];
this.__by(bI,bN.type,bN.capture);
}bL.push({handler:bN.listener,context:bN.self,unique:bN.unique||(bM.__bw++).toString(36)});
}},addListener:function(p,q,r,self,s){var w;
{};
var x=p.$$hash||qx.core.ObjectRegistry.toHashCode(p);
var z=this.__bs[x];

if(!z){z=this.__bs[x]={};
}var v=q+(s?bj:bk);
var u=z[v];

if(!u){u=z[v]=[];
}if(u.length===0){this.__by(p,q,s);
}var y=(qx.event.Manager.__bw++).toString(36);
var t={handler:r,context:self,unique:y};
u.push(t);
return v+bi+y;
},findHandler:function(a,b){var n=false,e=false,o=false;
var m;

if(a.nodeType===1){n=true;
m=be+a.tagName.toLowerCase()+bh+b;
}else if(a==this.__bp){e=true;
m=X+b;
}else if(a.classname){o=true;
m=W+a.classname+bh+b;
}else{m=bf+a+bh+b;
}var g=this.__bv;

if(g[m]){return g[m];
}var k=this.__br.getHandlers();
var f=qx.event.IEventHandler;
var h,j,d,c;

for(var i=0,l=k.length;i<l;i++){h=k[i];
d=h.SUPPORTED_TYPES;

if(d&&!d[b]){continue;
}c=h.TARGET_CHECK;

if(c){if(!n&&c===f.TARGET_DOMNODE){continue;
}else if(!e&&c===f.TARGET_WINDOW){continue;
}else if(!o&&c===f.TARGET_OBJECT){continue;
}}j=this.getHandler(k[i]);

if(h.IGNORE_CAN_HANDLE||j.canHandleEvent(a,b)){g[m]=j;
return j;
}}return null;
},__by:function(bE,bF,bG){var bH=this.findHandler(bE,bF);

if(bH){bH.registerEvent(bE,bF,bG);
return;
}{};
},removeListener:function(cj,ck,cl,self,cm){var cq;
{};
var cr=cj.$$hash||qx.core.ObjectRegistry.toHashCode(cj);
var cs=this.__bs[cr];

if(!cs){return false;
}var cn=ck+(cm?bj:bk);
var co=cs[cn];

if(!co){return false;
}var cp;

for(var i=0,l=co.length;i<l;i++){cp=co[i];

if(cp.handler===cl&&cp.context===self){qx.lang.Array.removeAt(co,i);

if(co.length==0){this.__bz(cj,ck,cm);
}return true;
}}return false;
},removeListenerById:function(bs,bt){var bz;
{};
var bx=bt.split(bi);
var bC=bx[0];
var bu=bx[1].charCodeAt(0)==99;
var bB=bx[2];
var bA=bs.$$hash||qx.core.ObjectRegistry.toHashCode(bs);
var bD=this.__bs[bA];

if(!bD){return false;
}var by=bC+(bu?bj:bk);
var bw=bD[by];

if(!bw){return false;
}var bv;

for(var i=0,l=bw.length;i<l;i++){bv=bw[i];

if(bv.unique===bB){qx.lang.Array.removeAt(bw,i);

if(bw.length==0){this.__bz(bs,bC,bu);
}return true;
}}return false;
},removeAllListeners:function(P){var T=P.$$hash||qx.core.ObjectRegistry.toHashCode(P);
var V=this.__bs[T];

if(!V){return false;
}var R,U,Q;

for(var S in V){if(V[S].length>0){R=S.split(bi);
U=R[0];
Q=R[1]===ba;
this.__bz(P,U,Q);
}}delete this.__bs[T];
return true;
},__bz:function(L,M,N){var O=this.findHandler(L,M);

if(O){O.unregisterEvent(L,M,N);
return;
}{};
},dispatchEvent:function(bl,event){var bq;
{};
var br=event.getType();

if(!event.getBubbles()&&!this.hasListener(bl,br)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(bl);
}var bp=this.__br.getDispatchers();
var bo;
var bn=false;

for(var i=0,l=bp.length;i<l;i++){bo=this.getDispatcher(bp[i]);
if(bo.canDispatchEvent(bl,event,br)){bo.dispatchEvent(bl,event,br);
bn=true;
break;
}}
if(!bn){qx.log.Logger.error(this,"No dispatcher can handle event of type "+br+" on "+bl);
return true;
}var bm=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !bm;
},dispose:function(){this.__br.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,bb);
qx.util.DisposeUtil.disposeMap(this,bd);
this.__bs=this.__bp=this.__bx=null;
this.__br=this.__bv=null;
}}});
})();
(function(){var d="qx.dom.Node",c="qx.client",b="";
qx.Class.define(d,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(o){return o.nodeType===
this.DOCUMENT?o:
o.ownerDocument||o.document;
},getWindow:qx.core.Variant.select(c,{"mshtml":function(r){if(r.nodeType==null){return r;
}if(r.nodeType!==this.DOCUMENT){r=r.ownerDocument;
}return r.parentWindow;
},"default":function(t){if(t.nodeType==null){return t;
}if(t.nodeType!==this.DOCUMENT){t=t.ownerDocument;
}return t.defaultView;
}}),getDocumentElement:function(q){return this.getDocument(q).documentElement;
},getBodyElement:function(n){return this.getDocument(n).body;
},isNode:function(g){return !!(g&&g.nodeType!=null);
},isElement:function(k){return !!(k&&k.nodeType===this.ELEMENT);
},isDocument:function(h){return !!(h&&h.nodeType===this.DOCUMENT);
},isText:function(j){return !!(j&&j.nodeType===this.TEXT);
},isWindow:function(p){return !!(p&&p.history&&p.location&&p.document);
},isNodeName:function(l,m){if(!m||!l||!l.nodeName){return false;
}return m.toLowerCase()==qx.dom.Node.getName(l);
},getName:function(s){if(!s||!s.nodeName){return null;
}return s.nodeName.toLowerCase();
},getText:function(e){if(!e||!e.nodeType){return null;
}
switch(e.nodeType){case 1:var i,a=[],f=e.childNodes,length=f.length;

for(i=0;i<length;i++){a[i]=this.getText(f[i]);
}return a.join(b);
case 2:return e.nodeValue;
break;
case 3:return e.nodeValue;
break;
}return null;
}}});
})();
(function(){var bg="mshtml",bf="qx.client",be="[object Array]",bd="qx.lang.Array",bc="qx",bb="number",ba="string";
qx.Class.define(bd,{statics:{toArray:function(Q,R){return this.cast(Q,Array,R);
},cast:function(V,W,X){if(V.constructor===W){return V;
}
if(qx.Class.hasInterface(V,qx.data.IListData)){var V=V.toArray();
}var Y=new W;
if(qx.core.Variant.isSet(bf,bg)){if(V.item){for(var i=X||0,l=V.length;i<l;i++){Y.push(V[i]);
}return Y;
}}if(Object.prototype.toString.call(V)===be&&X==null){Y.push.apply(Y,V);
}else{Y.push.apply(Y,Array.prototype.slice.call(V,X||0));
}return Y;
},fromArguments:function(d,e){return Array.prototype.slice.call(d,e||0);
},fromCollection:function(K){if(qx.core.Variant.isSet(bf,bg)){if(K.item){var L=[];

for(var i=0,l=K.length;i<l;i++){L[i]=K[i];
}return L;
}}return Array.prototype.slice.call(K,0);
},fromShortHand:function(S){var U=S.length;
var T=qx.lang.Array.clone(S);
switch(U){case 1:T[1]=T[2]=T[3]=T[0];
break;
case 2:T[2]=T[0];
case 3:T[3]=T[1];
}return T;
},clone:function(a){return a.concat();
},insertAt:function(f,g,i){f.splice(i,0,g);
return f;
},insertBefore:function(bo,bp,bq){var i=bo.indexOf(bq);

if(i==-1){bo.push(bp);
}else{bo.splice(i,0,bp);
}return bo;
},insertAfter:function(bl,bm,bn){var i=bl.indexOf(bn);

if(i==-1||i==(bl.length-1)){bl.push(bm);
}else{bl.splice(i+1,0,bm);
}return bl;
},removeAt:function(b,i){return b.splice(i,1)[0];
},removeAll:function(c){c.length=0;
return this;
},append:function(t,u){{};
Array.prototype.push.apply(t,u);
return t;
},exclude:function(h,j){{};

for(var i=0,m=j.length,k;i<m;i++){k=h.indexOf(j[i]);

if(k!=-1){h.splice(k,1);
}}return h;
},remove:function(r,s){var i=r.indexOf(s);

if(i!=-1){r.splice(i,1);
return s;
}},contains:function(n,o){return n.indexOf(o)!==-1;
},equals:function(I,J){var length=I.length;

if(length!==J.length){return false;
}
for(var i=0;i<length;i++){if(I[i]!==J[i]){return false;
}}return true;
},sum:function(p){var q=0;

for(var i=0,l=p.length;i<l;i++){q+=p[i];
}return q;
},max:function(M){{};
var i,O=M.length,N=M[0];

for(i=1;i<O;i++){if(M[i]>N){N=M[i];
}}return N===undefined?null:N;
},min:function(bi){{};
var i,bk=bi.length,bj=bi[0];

for(i=1;i<bk;i++){if(bi[i]<bj){bj=bi[i];
}}return bj===undefined?null:bj;
},unique:function(v){var F=[],x={},A={},C={};
var B,w=0;
var G=bc+qx.lang.Date.now();
var y=false,E=false,H=false;
for(var i=0,D=v.length;i<D;i++){B=v[i];
if(B===null){if(!y){y=true;
F.push(B);
}}else if(B===undefined){}else if(B===false){if(!E){E=true;
F.push(B);
}}else if(B===true){if(!H){H=true;
F.push(B);
}}else if(typeof B===ba){if(!x[B]){x[B]=1;
F.push(B);
}}else if(typeof B===bb){if(!A[B]){A[B]=1;
F.push(B);
}}else{z=B[G];

if(z==null){z=B[G]=w++;
}
if(!C[z]){C[z]=B;
F.push(B);
}}}for(var z in C){try{delete C[z][G];
}catch(P){try{C[z][G]=null;
}catch(bh){throw new Error("Cannot clean-up map entry doneObjects["+z+"]["+G+"]");
}}}return F;
}}});
})();
(function(){var E="()",D=".",C=".prototype.",B='anonymous()',A="qx.lang.Function",z=".constructor()";
qx.Class.define(A,{statics:{getCaller:function(a){return a.caller?a.caller.callee:a.callee.caller;
},getName:function(v){if(v.displayName){return v.displayName;
}
if(v.$$original||v.wrapper||v.classname){return v.classname+z;
}
if(v.$$mixin){for(var x in v.$$mixin.$$members){if(v.$$mixin.$$members[x]==v){return v.$$mixin.name+C+x+E;
}}for(var x in v.$$mixin){if(v.$$mixin[x]==v){return v.$$mixin.name+D+x+E;
}}}
if(v.self){var y=v.self.constructor;

if(y){for(var x in y.prototype){if(y.prototype[x]==v){return y.classname+C+x+E;
}}for(var x in y){if(y[x]==v){return y.classname+D+x+E;
}}}}var w=v.toString().match(/function\s*(\w*)\s*\(.*/);

if(w&&w.length>=1&&w[1]){return w[1]+E;
}return B;
},globalEval:function(b){if(window.execScript){return window.execScript(b);
}else{return eval.call(window,b);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(g,h){{};
if(!h){return g;
}if(!(h.self||h.args||h.delay!=null||h.periodical!=null||h.attempt)){return g;
}return function(event){{};
var e=qx.lang.Array.fromArguments(arguments);
if(h.args){e=h.args.concat(e);
}
if(h.delay||h.periodical){var d=qx.event.GlobalError.observeMethod(function(){return g.apply(h.self||this,e);
});

if(h.delay){return window.setTimeout(d,h.delay);
}
if(h.periodical){return window.setInterval(d,h.periodical);
}}else if(h.attempt){var f=false;

try{f=g.apply(h.self||this,e);
}catch(o){}return f;
}else{return g.apply(h.self||this,e);
}};
},bind:function(t,self,u){return this.create(t,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(p,q){return this.create(p,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(l,self,m){if(arguments.length<3){return function(event){return l.call(self||this,event||window.event);
};
}else{var n=qx.lang.Array.fromArguments(arguments,2);
return function(event){var c=[event||window.event];
c.push.apply(c,n);
l.apply(self||this,c);
};
}},attempt:function(r,self,s){return this.create(r,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(F,G,self,H){return this.create(F,{delay:G,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(i,j,self,k){return this.create(i,{periodical:j,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
})();
(function(){var e="qx.event.Registration";
qx.Class.define(e,{statics:{__bA:{},getManager:function(s){if(s==null){{};
s=window;
}else if(s.nodeType){s=qx.dom.Node.getWindow(s);
}else if(!qx.dom.Node.isWindow(s)){s=window;
}var u=s.$$hash||qx.core.ObjectRegistry.toHashCode(s);
var t=this.__bA[u];

if(!t){t=new qx.event.Manager(s,this);
this.__bA[u]=t;
}return t;
},removeManager:function(A){var B=A.getWindowId();
delete this.__bA[B];
},addListener:function(N,O,P,self,Q){return this.getManager(N).addListener(N,O,P,self,Q);
},removeListener:function(D,E,F,self,G){return this.getManager(D).removeListener(D,E,F,self,G);
},removeListenerById:function(f,g){return this.getManager(f).removeListenerById(f,g);
},removeAllListeners:function(r){return this.getManager(r).removeAllListeners(r);
},hasListener:function(o,p,q){return this.getManager(o).hasListener(o,p,q);
},serializeListeners:function(z){return this.getManager(z).serializeListeners(z);
},createEvent:function(v,w,x){{};
if(w==null){w=qx.event.type.Event;
}var y=qx.event.Pool.getInstance().getObject(w);

if(!y){return;
}x?y.init.apply(y,x):y.init();
if(v){y.setType(v);
}return y;
},dispatchEvent:function(h,event){return this.getManager(h).dispatchEvent(h,event);
},fireEvent:function(H,I,J,K){var L;
{};
var M=this.createEvent(I,J||null,K);
return this.getManager(H).dispatchEvent(H,M);
},fireNonBubblingEvent:function(i,j,k,l){{};
var m=this.getManager(i);

if(!m.hasListener(i,j,false)){return true;
}var n=this.createEvent(j,k||null,l);
return m.dispatchEvent(i,n);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__bB:[],addHandler:function(C){{};
this.__bB.push(C);
this.__bB.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__bB;
},__bC:[],addDispatcher:function(c,d){{};
this.__bC.push(c);
this.__bC.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__bC;
}}});
})();
(function(){var a="qx.log.appender.RingBuffer";
qx.Class.define(a,{extend:Object,construct:function(b){this.__bD=[];
this.setMaxMessages(b||50);
},members:{__bE:0,__bD:null,__bF:50,setMaxMessages:function(c){this.__bF=c;
this.clearHistory();
},getMaxMessages:function(){return this.__bF;
},process:function(h){var i=this.getMaxMessages();

if(this.__bD.length<i){this.__bD.push(h);
}else{this.__bD[this.__bE++]=h;

if(this.__bE>=i){this.__bE=0;
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
(function(){var o="node",n="error",m="...(+",k="array",j=")",h="info",g="instance",f="string",e="null",d="class",J="number",I="stringify",H="]",G="unknown",F="function",E="boolean",D="debug",C="map",B="undefined",A="qx.log.Logger",v=")}",w="#",t="warn",u="document",r="{...(",s="[",p="text[",q="[...(",x="\n",y=")]",z="object";
qx.Class.define(A,{statics:{__bG:D,setLevel:function(bi){this.__bG=bi;
},getLevel:function(){return this.__bG;
},setTreshold:function(bK){this.__bJ.setMaxMessages(bK);
},getTreshold:function(){return this.__bJ.getMaxMessages();
},__bH:{},__bI:0,register:function(K){if(K.$$id){return;
}var L=this.__bI++;
this.__bH[L]=K;
K.$$id=L;
var M=this.__bJ.getAllLogEvents();

for(var i=0,l=M.length;i<l;i++){K.process(M[i]);
}},unregister:function(bE){var bF=bE.$$id;

if(bF==null){return;
}delete this.__bH[bF];
delete bE.$$id;
},debug:function(bn,bo){qx.log.Logger.__bL(D,arguments);
},info:function(bI,bJ){qx.log.Logger.__bL(h,arguments);
},warn:function(bl,bm){qx.log.Logger.__bL(t,arguments);
},error:function(T,U){qx.log.Logger.__bL(n,arguments);
},trace:function(bt){qx.log.Logger.__bL(h,[bt,qx.dev.StackTrace.getStackTrace().join(x)]);
},deprecatedMethodWarning:function(bf,bg){var bh;
{};
},deprecatedClassWarning:function(a,b){var c;
{};
},deprecatedEventWarning:function(Q,event,R){var S;
{};
},deprecatedMixinWarning:function(N,O){var P;
{};
},deprecatedConstantWarning:function(bp,bq,br){var self,bs;
{};
},clear:function(){this.__bJ.clearHistory();
},__bJ:new qx.log.appender.RingBuffer(50),__bK:{debug:0,info:1,warn:2,error:3},__bL:function(bu,bv){var bA=this.__bK;

if(bA[bu]<bA[this.__bG]){return;
}var bx=bv.length<2?null:bv[0];
var bz=bx?1:0;
var bw=[];

for(var i=bz,l=bv.length;i<l;i++){bw.push(this.__bN(bv[i],true));
}var bB=new Date;
var bC={time:bB,offset:bB-qx.Bootstrap.LOADSTART,level:bu,items:bw,win:window};
if(bx){if(bx instanceof qx.core.Object){bC.object=bx.$$hash;
}else if(bx.$$type){bC.clazz=bx;
}}this.__bJ.process(bC);
var bD=this.__bH;

for(var by in bD){bD[by].process(bC);
}},__bM:function(bG){if(bG===undefined){return B;
}else if(bG===null){return e;
}
if(bG.$$type){return d;
}var bH=typeof bG;

if(bH===F||bH==f||bH===J||bH===E){return bH;
}else if(bH===z){if(bG.nodeType){return o;
}else if(bG.classname){return g;
}else if(bG instanceof Array){return k;
}else if(bG instanceof Error){return n;
}else{return C;
}}
if(bG.toString){return I;
}return G;
},__bN:function(V,W){var be=this.__bM(V);
var ba=G;
var Y=[];

switch(be){case e:case B:ba=be;
break;
case f:case J:case E:ba=V;
break;
case o:if(V.nodeType===9){ba=u;
}else if(V.nodeType===3){ba=p+V.nodeValue+H;
}else if(V.nodeType===1){ba=V.nodeName.toLowerCase();

if(V.id){ba+=w+V.id;
}}else{ba=o;
}break;
case F:ba=qx.lang.Function.getName(V)||be;
break;
case g:ba=V.basename+s+V.$$hash+H;
break;
case d:case I:ba=V.toString();
break;
case n:Y=qx.dev.StackTrace.getStackTraceFromError(V);
ba=V.toString();
break;
case k:if(W){ba=[];

for(var i=0,l=V.length;i<l;i++){if(ba.length>20){ba.push(m+(l-i)+j);
break;
}ba.push(this.__bN(V[i],false));
}}else{ba=q+V.length+y;
}break;
case C:if(W){var X;
var bd=[];

for(var bc in V){bd.push(bc);
}bd.sort();
ba=[];

for(var i=0,l=bd.length;i<l;i++){if(ba.length>20){ba.push(m+(l-i)+j);
break;
}bc=bd[i];
X=this.__bN(V[bc],false);
X.key=bc;
ba.push(X);
}}else{var bb=0;

for(var bc in V){bb++;
}ba=r+bb+v;
}break;
}return {type:be,text:ba,trace:Y};
}},defer:function(bj){var bk=qx.Bootstrap.$$logs;

for(var i=0;i<bk.length;i++){this.__bL(bk[i][0],bk[i][1]);
}qx.Bootstrap.debug=bj.debug;
qx.Bootstrap.info=bj.info;
qx.Bootstrap.warn=bj.warn;
qx.Bootstrap.error=bj.error;
qx.Bootstrap.trace=bj.trace;
}});
})();
(function(){var q="set",p="get",o="reset",n="qx.core.Object",m="]",k="[",j="$$user_",h="Object";
qx.Class.define(n,{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:h},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+k+this.$$hash+m;
},base:function(N,O){{};

if(arguments.length===1){return N.callee.base.call(this);
}else{return N.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(bq){return bq.callee.self;
},clone:function(){var F=this.constructor;
var E=new F;
var H=qx.Class.getProperties(F);
var G=qx.core.Property.$$store.user;
var I=qx.core.Property.$$method.set;
var name;
for(var i=0,l=H.length;i<l;i++){name=H[i];

if(this.hasOwnProperty(G[name])){E[I[name]](this[G[name]]);
}}return E;
},set:function(be,bf){var bh=qx.core.Property.$$method.set;

if(qx.Bootstrap.isString(be)){if(!this[bh[be]]){if(this[q+qx.Bootstrap.firstUp(be)]!=undefined){this[q+qx.Bootstrap.firstUp(be)](bf);
return;
}{};
}return this[bh[be]](bf);
}else{for(var bg in be){if(!this[bh[bg]]){if(this[q+qx.Bootstrap.firstUp(bg)]!=undefined){this[q+qx.Bootstrap.firstUp(bg)](be[bg]);
continue;
}{};
}this[bh[bg]](be[bg]);
}return this;
}},get:function(U){var V=qx.core.Property.$$method.get;

if(!this[V[U]]){if(this[p+qx.Bootstrap.firstUp(U)]!=undefined){return this[p+qx.Bootstrap.firstUp(U)]();
}{};
}return this[V[U]]();
},reset:function(K){var L=qx.core.Property.$$method.reset;

if(!this[L[K]]){if(this[o+qx.Bootstrap.firstUp(K)]!=undefined){this[o+qx.Bootstrap.firstUp(K)]();
return;
}{};
}this[L[K]]();
},__bO:qx.event.Registration,addListener:function(d,f,self,g){if(!this.$$disposed){return this.__bO.addListener(this,d,f,self,g);
}return null;
},addListenerOnce:function(W,X,self,Y){var ba=function(e){X.call(self||this,e);
this.removeListener(W,ba,this,Y);
};
return this.addListener(W,ba,this,Y);
},removeListener:function(a,b,self,c){if(!this.$$disposed){return this.__bO.removeListener(this,a,b,self,c);
}return false;
},removeListenerById:function(by){if(!this.$$disposed){return this.__bO.removeListenerById(this,by);
}return false;
},hasListener:function(bj,bk){return this.__bO.hasListener(this,bj,bk);
},dispatchEvent:function(bx){if(!this.$$disposed){return this.__bO.dispatchEvent(this,bx);
}return true;
},fireEvent:function(bl,bm,bn){if(!this.$$disposed){return this.__bO.fireEvent(this,bl,bm,bn);
}return true;
},fireNonBubblingEvent:function(r,s,t){if(!this.$$disposed){return this.__bO.fireNonBubblingEvent(this,r,s,t);
}return true;
},fireDataEvent:function(bs,bt,bu,bv){if(!this.$$disposed){if(bu===undefined){bu=null;
}return this.__bO.fireNonBubblingEvent(this,bs,qx.event.type.Data,[bt,bu,!!bv]);
}return true;
},__bP:null,setUserData:function(bo,bp){if(!this.__bP){this.__bP={};
}this.__bP[bo]=bp;
},getUserData:function(u){if(!this.__bP){return null;
}var v=this.__bP[u];
return v===undefined?null:v;
},__bQ:qx.log.Logger,debug:function(bi){this.__bQ.debug(this,bi);
},info:function(bb){this.__bQ.info(this,bb);
},warn:function(bw){this.__bQ.warn(this,bw);
},error:function(bc){this.__bQ.error(this,bc);
},trace:function(){this.__bQ.trace(this);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){var S,Q;
if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
{};
var R=this.constructor;
var P;

while(R.superclass){if(R.$$destructor){R.$$destructor.call(this);
}if(R.$$includes){P=R.$$flatIncludes;

for(var i=0,l=P.length;i<l;i++){if(P[i].$$destructor){P[i].$$destructor.call(this);
}}}R=R.superclass;
}var T=qx.Class.getProperties(this.constructor);

for(var i=0,l=T.length;i<l;i++){delete this[j+T[i]];
}{};
},_disposeFields:function(J){qx.Bootstrap.warn("Don't use '_disposeFields' - instead assign directly to 'null'");
qx.util.DisposeUtil.disposeFields(this,arguments);
},_disposeObjects:function(bz){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeArray:function(M){qx.util.DisposeUtil.disposeArray(this,M);
},_disposeMap:function(br){qx.util.DisposeUtil.disposeMap(this,br);
}},settings:{"qx.disposerDebugLevel":0},defer:function(bd){{};
},destruct:function(){qx.event.Registration.removeAllListeners(this);
qx.core.ObjectRegistry.unregister(this);
this.__bP=null;
var y=this.constructor;
var C;
var D=qx.core.Property.$$store;
var A=D.user;
var B=D.theme;
var w=D.inherit;
var z=D.useinit;
var x=D.init;

while(y){C=y.$$properties;

if(C){for(var name in C){if(C[name].dispose){this[A[name]]=this[B[name]]=this[w[name]]=this[z[name]]=this[x[name]]=undefined;
}}}y=y.superclass;
}}});
})();
(function(){var a="qx.ui.decoration.IDecorator";
qx.Interface.define(a,{members:{getMarkup:function(){},resize:function(d,e,f){},tint:function(b,c){},getInsets:function(){}}});
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
qx.Class.define(f,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(y,z,A){arguments.callee.base.call(this);
if(y!=null){this.setWidth(y);
}
if(z!=null){this.setStyle(z);
}
if(A!=null){this.setColor(A);
}},properties:{width:{check:b,init:0,apply:g},style:{nullable:true,check:[l,k,i,j],init:l,apply:o},color:{nullable:true,check:n,apply:o},backgroundColor:{check:n,nullable:true,apply:o}},members:{__bS:null,_getDefaultInsets:function(){var E=this.getWidth();
return {top:E,right:E,bottom:E,left:E};
},_isInitialized:function(){return !!this.__bS;
},getMarkup:function(){if(this.__bS){return this.__bS;
}var u={position:a,top:0,left:0};
var v=this.getWidth();
{};
var x=qx.theme.manager.Color.getInstance();
u.border=v+c+this.getStyle()+e+x.resolve(this.getColor());
var w=this._generateBackgroundMarkup(u);
return this.__bS=w;
},resize:function(p,q,r){var t=this.getBackgroundImage()&&this.getBackgroundRepeat()==d;

if(t||qx.bom.client.Feature.CONTENT_BOX){var s=this.getWidth()*2;
q-=s;
r-=s;
if(q<0){q=0;
}
if(r<0){r=0;
}}p.style.width=q+m;
p.style.height=r+m;
},tint:function(B,C){var D=qx.theme.manager.Color.getInstance();

if(C==null){C=this.getBackgroundColor();
}B.style.backgroundColor=D.resolve(C)||h;
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
},resize:function(h,i,j){h.style.width=i+f;
h.style.height=j+f;
},tint:function(k,l){var m=qx.theme.manager.Color.getInstance();

if(l==null){l=this.getBackgroundColor();
}k.style.backgroundColor=m.resolve(l)||d;
},_applyStyle:function(){{};
}},destruct:function(){this.__bT=null;
}});
})();
(function(){var j="_applyStyle",i="solid",h="Color",g="double",f="px ",e="dotted",d="_applyWidth",c="dashed",b="Number",a=" ",F="shorthand",E="px",D="widthTop",C="styleRight",B="styleLeft",A="widthLeft",z="widthBottom",y="styleTop",x="colorBottom",w="styleBottom",q="widthRight",r="colorLeft",o="colorRight",p="colorTop",m="scale",n="border-top",k="border-left",l="border-right",s="qx.ui.decoration.Single",t="",v="border-bottom",u="absolute";
qx.Class.define(s,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(O,P,Q){arguments.callee.base.call(this);
if(O!=null){this.setWidth(O);
}
if(P!=null){this.setStyle(P);
}
if(Q!=null){this.setColor(Q);
}},properties:{widthTop:{check:b,init:0,apply:d},widthRight:{check:b,init:0,apply:d},widthBottom:{check:b,init:0,apply:d},widthLeft:{check:b,init:0,apply:d},styleTop:{nullable:true,check:[i,e,c,g],init:i,apply:j},styleRight:{nullable:true,check:[i,e,c,g],init:i,apply:j},styleBottom:{nullable:true,check:[i,e,c,g],init:i,apply:j},styleLeft:{nullable:true,check:[i,e,c,g],init:i,apply:j},colorTop:{nullable:true,check:h,apply:j},colorRight:{nullable:true,check:h,apply:j},colorBottom:{nullable:true,check:h,apply:j},colorLeft:{nullable:true,check:h,apply:j},backgroundColor:{check:h,nullable:true,apply:j},left:{group:[A,B,r]},right:{group:[q,C,o]},top:{group:[D,y,p]},bottom:{group:[z,w,x]},width:{group:[D,q,z,A],mode:F},style:{group:[y,C,w,B],mode:F},color:{group:[p,o,x,r],mode:F}},members:{__bU:null,_getDefaultInsets:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};
},_isInitialized:function(){return !!this.__bU;
},getMarkup:function(R){if(this.__bU){return this.__bU;
}var S=qx.theme.manager.Color.getInstance();
var T={};
var V=this.getWidthTop();

if(V>0){T[n]=V+f+this.getStyleTop()+a+S.resolve(this.getColorTop());
}var V=this.getWidthRight();

if(V>0){T[l]=V+f+this.getStyleRight()+a+S.resolve(this.getColorRight());
}var V=this.getWidthBottom();

if(V>0){T[v]=V+f+this.getStyleBottom()+a+S.resolve(this.getColorBottom());
}var V=this.getWidthLeft();

if(V>0){T[k]=V+f+this.getStyleLeft()+a+S.resolve(this.getColorLeft());
}{};
T.position=u;
T.top=0;
T.left=0;
var U=this._generateBackgroundMarkup(T);
return this.__bU=U;
},resize:function(J,K,L){var N=this.getBackgroundImage()&&this.getBackgroundRepeat()==m;

if(N||qx.bom.client.Feature.CONTENT_BOX){var M=this.getInsets();
K-=M.left+M.right;
L-=M.top+M.bottom;
if(K<0){K=0;
}
if(L<0){L=0;
}}J.style.width=K+E;
J.style.height=L+E;
},tint:function(G,H){var I=qx.theme.manager.Color.getInstance();

if(H==null){H=this.getBackgroundColor();
}G.style.backgroundColor=I.resolve(H)||t;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this.__bU=null;
}});
})();
(function(){var k="px",j="0px",i="-1px",h="no-repeat",g="scale-x",f="scale-y",e="-tr",d="-l",c='</div>',b="scale",y="qx.client",x="-br",w="-t",v="-tl",u="-r",t='<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">',s="_applyBaseImage",r="-b",q="String",p="",n="-bl",o="-c",l="mshtml",m="qx.ui.decoration.Grid";
qx.Class.define(m,{extend:qx.ui.decoration.Abstract,construct:function(S,T){arguments.callee.base.call(this);
if(S!=null){this.setBaseImage(S);
}
if(T!=null){this.setInsets(T);
}},properties:{baseImage:{check:q,nullable:true,apply:s}},members:{__bV:null,__bW:null,__bX:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__bV;
},getMarkup:function(){if(this.__bV){return this.__bV;
}var z=qx.bom.element.Decoration;
var A=this.__bW;
var B=this.__bX;
var C=[];
C.push(t);
C.push(z.create(A.tl,h,{top:0,left:0}));
C.push(z.create(A.t,g,{top:0,left:B.left+k}));
C.push(z.create(A.tr,h,{top:0,right:0}));
C.push(z.create(A.bl,h,{bottom:0,left:0}));
C.push(z.create(A.b,g,{bottom:0,left:B.left+k}));
C.push(z.create(A.br,h,{bottom:0,right:0}));
C.push(z.create(A.l,f,{top:B.top+k,left:0}));
C.push(z.create(A.c,b,{top:B.top+k,left:B.left+k}));
C.push(z.create(A.r,f,{top:B.top+k,right:0}));
C.push(c);
return this.__bV=C.join(p);
},resize:function(M,N,O){var P=this.__bX;
var innerWidth=N-P.left-P.right;
var innerHeight=O-P.top-P.bottom;
if(innerWidth<0){innerWidth=0;
}
if(innerHeight<0){innerHeight=0;
}M.style.width=N+k;
M.style.height=O+k;
M.childNodes[1].style.width=innerWidth+k;
M.childNodes[4].style.width=innerWidth+k;
M.childNodes[7].style.width=innerWidth+k;
M.childNodes[6].style.height=innerHeight+k;
M.childNodes[7].style.height=innerHeight+k;
M.childNodes[8].style.height=innerHeight+k;

if(qx.core.Variant.isSet(y,l)){if(qx.bom.client.Engine.VERSION<7||(qx.bom.client.Feature.QUIRKS_MODE&&qx.bom.client.Engine.VERSION<8)){if(N%2==1){M.childNodes[2].style.marginRight=i;
M.childNodes[5].style.marginRight=i;
M.childNodes[8].style.marginRight=i;
}else{M.childNodes[2].style.marginRight=j;
M.childNodes[5].style.marginRight=j;
M.childNodes[8].style.marginRight=j;
}
if(O%2==1){M.childNodes[3].style.marginBottom=i;
M.childNodes[4].style.marginBottom=i;
M.childNodes[5].style.marginBottom=i;
}else{M.childNodes[3].style.marginBottom=j;
M.childNodes[4].style.marginBottom=j;
M.childNodes[5].style.marginBottom=j;
}}}},tint:function(K,L){},_applyBaseImage:function(D,E){{};

if(D){var I=this._resolveImageUrl(D);
var J=/(.*)(\.[a-z]+)$/.exec(I);
var H=J[1];
var G=J[2];
var F=this.__bW={tl:H+v+G,t:H+w+G,tr:H+e+G,bl:H+n+G,b:H+r+G,br:H+x+G,l:H+d+G,c:H+o+G,r:H+u+G};
this.__bX=this._computeEdgeSizes(F);
}},_resolveImageUrl:function(a){return qx.util.AliasManager.getInstance().resolve(a);
},_computeEdgeSizes:function(Q){var R=qx.util.ResourceManager.getInstance();
return {top:R.getImageHeight(Q.t),bottom:R.getImageHeight(Q.b),left:R.getImageWidth(Q.l),right:R.getImageWidth(Q.r)};
}},destruct:function(){this.__bV=this.__bW=this.__bX=null;
}});
})();
(function(){var j="_applyStyle",i='"></div>',h="Color",g="1px",f='<div style="',e='border:',d="1px solid ",c="",b=";",a="px",v='</div>',u="qx.ui.decoration.Beveled",t='<div style="position:absolute;top:1px;left:1px;',s='border-bottom:',r='border-right:',q='border-left:',p='border-top:',o="Number",n='<div style="position:absolute;top:1px;left:0px;',m='position:absolute;top:0px;left:1px;',k='<div style="overflow:hidden;font-size:0;line-height:0;">',l="absolute";
qx.Class.define(u,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(w,x,y){arguments.callee.base.call(this);
if(w!=null){this.setOuterColor(w);
}
if(x!=null){this.setInnerColor(x);
}
if(y!=null){this.setInnerOpacity(y);
}},properties:{innerColor:{check:h,nullable:true,apply:j},innerOpacity:{check:o,init:1,apply:j},outerColor:{check:h,nullable:true,apply:j},backgroundColor:{check:h,nullable:true,apply:j}},members:{__bY:null,_getDefaultInsets:function(){return {top:2,right:2,bottom:2,left:2};
},_isInitialized:function(){return !!this.__bY;
},_applyStyle:function(){{};
},getMarkup:function(){if(this.__bY){return this.__bY;
}var N=qx.theme.manager.Color.getInstance();
var O=[];
var R=d+N.resolve(this.getOuterColor())+b;
var Q=d+N.resolve(this.getInnerColor())+b;
O.push(k);
O.push(f);
O.push(e,R);
O.push(qx.bom.element.Opacity.compile(0.35));
O.push(i);
O.push(n);
O.push(q,R);
O.push(r,R);
O.push(i);
O.push(f);
O.push(m);
O.push(p,R);
O.push(s,R);
O.push(i);
var P={position:l,top:g,left:g};
O.push(this._generateBackgroundMarkup(P));
O.push(t);
O.push(e,Q);
O.push(qx.bom.element.Opacity.compile(this.getInnerOpacity()));
O.push(i);
O.push(v);
return this.__bY=O.join(c);
},resize:function(z,A,B){if(A<4){A=4;
}
if(B<4){B=4;
}if(qx.bom.client.Feature.CONTENT_BOX){var outerWidth=A-2;
var outerHeight=B-2;
var H=outerWidth;
var G=outerHeight;
var innerWidth=A-4;
var innerHeight=B-4;
}else{var outerWidth=A;
var outerHeight=B;
var H=A-2;
var G=B-2;
var innerWidth=H;
var innerHeight=G;
}var J=a;
var F=z.childNodes[0].style;
F.width=outerWidth+J;
F.height=outerHeight+J;
var E=z.childNodes[1].style;
E.width=outerWidth+J;
E.height=G+J;
var D=z.childNodes[2].style;
D.width=H+J;
D.height=outerHeight+J;
var C=z.childNodes[3].style;
C.width=H+J;
C.height=G+J;
var I=z.childNodes[4].style;
I.width=innerWidth+J;
I.height=innerHeight+J;
},tint:function(K,L){var M=qx.theme.manager.Color.getInstance();

if(L==null){L=this.getBackgroundColor();
}K.childNodes[3].style.backgroundColor=M.resolve(L)||c;
}},destruct:function(){this.__bY=null;
}});
})();
(function(){var m="solid",l="scale",k="border-main",j="white",i="repeat-x",h="border-separator",g="background-light",f="invalid",e="border-focused-invalid",d="border-disabled",bq="decoration/table/header-cell.png",bp="decoration/form/input.png",bo="#f8f8f8",bn="decoration/scrollbar/scrollbar-button-bg-horizontal.png",bm="#b6b6b6",bl="background-pane",bk="repeat-y",bj="decoration/form/input-focused.png",bi="#33508D",bh="decoration/selection.png",t="border-input",u="decoration/scrollbar/scrollbar-button-bg-vertical.png",r="decoration/tabview/tab-button-top-active.png",s="decoration/form/button-c.png",p="decoration/scrollbar/scrollbar-bg-vertical.png",q="decoration/form/button.png",n="decoration/form/button-checked.png",o="decoration/tabview/tab-button-left-inactive.png",B="decoration/groupbox/groupbox.png",C="#FAFAFA",M="decoration/pane/pane.png",J="decoration/menu/background.png",U="decoration/toolbar/toolbar-part.gif",P="decoration/tabview/tab-button-top-inactive.png",bd="decoration/menu/bar-background.png",ba="center",F="decoration/tabview/tab-button-bottom-active.png",bg="decoration/form/button-hovered.png",bf="decoration/form/tooltip-error-arrow.png",be="decoration/window/captionbar-inactive.png",E="qx/decoration/Modern",H="decoration/window/statusbar.png",I="border-focused",L="table-focus-indicator",N="#F2F2F2",Q="decoration/form/button-checked-c.png",W="decoration/scrollbar/scrollbar-bg-horizontal.png",bc="qx.theme.modern.Decoration",v="#f4f4f4",w="decoration/shadow/shadow-small.png",G="decoration/app-header.png",T="decoration/tabview/tabview-pane.png",S="decoration/form/tooltip-error.png",R="decoration/form/button-focused.png",Y="decoration/tabview/tab-button-bottom-inactive.png",X="decoration/form/button-disabled.png",O="decoration/tabview/tab-button-right-active.png",V="decoration/form/button-pressed.png",a="no-repeat",bb="decoration/window/captionbar-active.png",x="decoration/tabview/tab-button-left-active.png",y="background-splitpane",K="decoration/form/button-checked-focused.png",b="#C5C5C5",c="decoration/toolbar/toolbar-gradient.png",D="decoration/tabview/tab-button-right-inactive.png",z="#b8b8b8",A="decoration/shadow/shadow.png";
qx.Theme.define(bc,{aliases:{decoration:E},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:k}},"selected":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bh,backgroundRepeat:l}},"selected-dragover":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bh,backgroundRepeat:l,bottom:[2,m,bi]}},"dragover":{decorator:qx.ui.decoration.Single,style:{bottom:[2,m,bi]}},"pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:M,insets:[0,2,3,0]}},"group":{decorator:qx.ui.decoration.Grid,style:{baseImage:B}},"border-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:j,innerOpacity:0.5,backgroundImage:bp,backgroundRepeat:i,backgroundColor:g}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:h}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:h}},"tooltip-error":{decorator:qx.ui.decoration.Grid,style:{baseImage:S,insets:[2,5,5,2]}},"tooltip-error-arrow":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bf,backgroundPositionY:ba,backgroundRepeat:a,insets:[0,0,0,10]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:A,insets:[4,8,8,4]}},"shadow-popup":{decorator:qx.ui.decoration.Grid,style:{baseImage:w,insets:[0,3,3,0]}},"scrollbar-horizontal":{decorator:qx.ui.decoration.Background,style:{backgroundImage:W,backgroundRepeat:i}},"scrollbar-vertical":{decorator:qx.ui.decoration.Background,style:{backgroundImage:p,backgroundRepeat:bk}},"scrollbar-slider-horizontal":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bn,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-horizontal-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bn,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"scrollbar-slider-vertical":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:u,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-vertical-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:u,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"button":{decorator:qx.ui.decoration.Grid,style:{baseImage:q,insets:2}},"button-disabled":{decorator:qx.ui.decoration.Grid,style:{baseImage:X,insets:2}},"button-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:R,insets:2}},"button-hovered":{decorator:qx.ui.decoration.Grid,style:{baseImage:bg,insets:2}},"button-pressed":{decorator:qx.ui.decoration.Grid,style:{baseImage:V,insets:2}},"button-checked":{decorator:qx.ui.decoration.Grid,style:{baseImage:n,insets:2}},"button-checked-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:K,insets:2}},"button-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[1]}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[0]}},"input":{decorator:qx.ui.decoration.Beveled,style:{outerColor:t,innerColor:j,innerOpacity:0.5,backgroundImage:bp,backgroundRepeat:i,backgroundColor:g}},"input-focused":{decorator:qx.ui.decoration.Beveled,style:{outerColor:t,innerColor:I,backgroundImage:bj,backgroundRepeat:i,backgroundColor:g}},"input-focused-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,backgroundImage:bj,backgroundRepeat:i,backgroundColor:g,insets:[2]}},"input-disabled":{decorator:qx.ui.decoration.Beveled,style:{outerColor:d,innerColor:j,innerOpacity:0.5,backgroundImage:bp,backgroundRepeat:i,backgroundColor:g}},"toolbar":{decorator:qx.ui.decoration.Background,style:{backgroundImage:c,backgroundRepeat:l}},"toolbar-button-hovered":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bm,innerColor:bo,backgroundImage:s,backgroundRepeat:l}},"toolbar-button-checked":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bm,innerColor:bo,backgroundImage:Q,backgroundRepeat:l}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,widthRight:1,colorLeft:z,colorRight:v,styleLeft:m,styleRight:m}},"toolbar-part":{decorator:qx.ui.decoration.Background,style:{backgroundImage:U,backgroundRepeat:bk}},"tabview-pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:T,insets:[4,6,7,4]}},"tabview-page-button-top-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:r}},"tabview-page-button-top-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:P}},"tabview-page-button-bottom-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:F}},"tabview-page-button-bottom-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:Y}},"tabview-page-button-left-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:x}},"tabview-page-button-left-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:o}},"tabview-page-button-right-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:O}},"tabview-page-button-right-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:D}},"splitpane":{decorator:qx.ui.decoration.Uniform,style:{backgroundColor:bl,width:3,color:y,style:m}},"window":{decorator:qx.ui.decoration.Single,style:{backgroundColor:bl,width:1,color:k,widthTop:0}},"window-captionbar-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:bb}},"window-captionbar-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:be}},"window-statusbar":{decorator:qx.ui.decoration.Grid,style:{baseImage:H}},"table":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:k,style:m}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bq,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m,widthBottom:1,colorBottom:j,styleBottom:m}},"table-column-button":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bq,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:L,style:m}},"progressive-table-header":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"progressive-table-header-cell":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bq,backgroundRepeat:l,widthRight:1,colorRight:N,style:m}},"menu":{decorator:qx.ui.decoration.Single,style:{backgroundImage:J,backgroundRepeat:l,width:1,color:k,style:m}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:b,widthBottom:1,colorBottom:C}},"menubar":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bd,backgroundRepeat:l,width:1,color:h,style:m}},"app-header":{decorator:qx.ui.decoration.Background,style:{backgroundImage:G,backgroundRepeat:l}}}});
})();
(function(){var a="accordion.demo.theme.Decoration";
qx.Theme.define(a,{extend:qx.theme.modern.Decoration,decorations:{}});
})();
(function(){var m="iPod",l="Win32",k="",j="Win64",i="Linux",h="BSD",g="Macintosh",f="iPhone",e="Windows",d="qx.bom.client.Platform",a="X11",c="MacIntel",b="MacPPC";
qx.Class.define(d,{statics:{NAME:"",WIN:false,MAC:false,UNIX:false,UNKNOWN_PLATFORM:false,__ca:function(){var o=navigator.platform;
if(o==null||o===k){o=navigator.userAgent;
}
if(o.indexOf(e)!=-1||o.indexOf(l)!=-1||o.indexOf(j)!=-1){this.WIN=true;
this.NAME="win";
}else if(o.indexOf(g)!=-1||o.indexOf(b)!=-1||o.indexOf(c)!=-1||o.indexOf(m)!=-1||o.indexOf(f)!=-1){this.MAC=true;
this.NAME="mac";
}else if(o.indexOf(a)!=-1||o.indexOf(i)!=-1||o.indexOf(h)!=-1){this.UNIX=true;
this.NAME="unix";
}else{this.UNKNOWN_PLATFORM=true;
this.WIN=true;
this.NAME="win";
}}},defer:function(n){n.__ca();
}});
})();
(function(){var j="win98",i="osx2",h="osx0",g="osx4",f="win95",e="win2000",d="osx1",c="osx5",b="osx3",a="Windows NT 5.01",H=")",G="winxp",F="freebsd",E="sunos",D="SV1",C="|",B="nintendods",A="winnt4",z="wince",y="winme",q="os9",r="\.",o="osx",p="linux",m="netbsd",n="winvista",k="openbsd",l="(",s="win2003",t="symbian",v="win7",u="g",x="qx.bom.client.System",w=" Mobile/";
qx.Class.define(x,{statics:{NAME:"",SP1:false,SP2:false,WIN95:false,WIN98:false,WINME:false,WINNT4:false,WIN2000:false,WINXP:false,WIN2003:false,WINVISTA:false,WIN7:false,WINCE:false,LINUX:false,SUNOS:false,FREEBSD:false,NETBSD:false,OPENBSD:false,OSX:false,OS9:false,SYMBIAN:false,NINTENDODS:false,PSP:false,IPHONE:false,UNKNOWN_SYSTEM:false,__cb:{"Windows NT 6.1":v,"Windows NT 6.0":n,"Windows NT 5.2":s,"Windows NT 5.1":G,"Windows NT 5.0":e,"Windows 2000":e,"Windows NT 4.0":A,"Win 9x 4.90":y,"Windows CE":z,"Windows 98":j,"Win98":j,"Windows 95":f,"Win95":f,"Linux":p,"FreeBSD":F,"NetBSD":m,"OpenBSD":k,"SunOS":E,"Symbian System":t,"Nitro":B,"PSP":"sonypsp","Mac OS X 10_5":c,"Mac OS X 10.5":c,"Mac OS X 10_4":g,"Mac OS X 10.4":g,"Mac OS X 10_3":b,"Mac OS X 10.3":b,"Mac OS X 10_2":i,"Mac OS X 10.2":i,"Mac OS X 10_1":d,"Mac OS X 10.1":d,"Mac OS X 10_0":h,"Mac OS X 10.0":h,"Mac OS X":o,"Mac OS 9":q},__cc:function(){var L=navigator.userAgent;
var K=[];

for(var J in this.__cb){K.push(J);
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
}else{this.NAME=this.__cb[RegExp.$1];
this[this.NAME.toUpperCase()]=true;

if(qx.bom.client.Platform.WIN){if(L.indexOf(a)!==-1){this.SP1=true;
}else if(qx.bom.client.Engine.MSHTML&&L.indexOf(D)!==-1){this.SP2=true;
}}}}},defer:function(I){I.__cc();
}});
})();
(function(){var n="Liberation Sans",m="Arial",l="Lucida Grande",k="sans-serif",j="Tahoma",i="Candara",h="Segoe UI",g="Consolas",f="Courier New",e="Monaco",b="monospace",d="Lucida Console",c="qx.theme.modern.Font",a="DejaVu Sans Mono";
qx.Theme.define(c,{fonts:{"default":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k]},"bold":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k],bold:true},"small":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?11:10,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k]},"monospace":{size:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[d,e]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[g]:[g,a,f,b]}}});
})();
(function(){var a="accordion.demo.theme.Font";
qx.Theme.define(a,{extend:qx.theme.modern.Font,fonts:{}});
})();
(function(){var c="Tango",b="qx/icon/Tango",a="qx.theme.icon.Tango";
qx.Theme.define(a,{title:c,aliases:{"icon":b},icons:{}});
})();
(function(){var eB="button-frame",eA="atom",ez="widget",ey="main",ex="button",ew="text-selected",ev="image",eu="bold",et="middle",es="background-light",de="text-disabled",dd="groupbox",dc="decoration/arrows/down.png",db="cell",da="selected",cY="border-invalid",cX="input",cW="input-disabled",cV="menu-button",cU="input-focused-invalid",eI="toolbar-button",eJ="spinner",eG="input-focused",eH="popup",eE="tooltip",eF="list",eC="tree-item",eD="treevirtual-contract",eK="scrollbar",eL="datechooser/nav-button",eb="text-hovered",ea="center",ed="treevirtual-expand",ec="textfield",ef="label",ee="decoration/arrows/right.png",eh="background-application",eg="radiobutton",dY="white",dX="invalid",ba="combobox",bb="right-top",bc="checkbox",bd="text-title",be="qx/static/blank.gif",bf="scrollbar/button",bg="right",bh="combobox/button",bi="icon/16/places/folder.png",bj="text-label",fa="decoration/tree/closed.png",eY="scrollbar-slider-horizontal",eX="decoration/arrows/left.png",eW="button-focused",fe="text-light",fd="menu-slidebar-button",fc="text-input",fb="slidebar/button-forward",fg="background-splitpane",ff=".png",cc="decoration/tree/open.png",cd="default",ca="decoration/arrows/down-small.png",cb="datechooser",cg="slidebar/button-backward",ch="selectbox",ce="treevirtual-folder",cf="shadow-popup",bX="icon/16/mimetypes/office-document.png",bY="background-medium",bD="table",bC="decoration/arrows/up.png",bF="decoration/form/",bE="",bz="-invalid",by="icon/16/places/folder-open.png",bB="button-checked",bA="decoration/window/maximize-active-hovered.png",bx="radiobutton-hovered",bw="decoration/cursors/",cn="slidebar",co="tooltip-error-arrow",cp="table-scroller-focus-indicator",cq="move-frame",cj="nodrop",ck="decoration/table/boolean-true.png",cl="table-header-cell",cm="menu",cr="app-header",cs="row-layer",bQ="text-inactive",bP="move",bO="radiobutton-checked-focused",bN="decoration/window/restore-active-hovered.png",bM="shadow-window",bL="table-column-button",bK="right.png",bJ="tabview-page-button-bottom-inactive",bU="tooltip-error",bT="window-statusbar",ct="button-hovered",cu="decoration/scrollbar/scrollbar-",cv="background-tip",cw="scrollbar-slider-horizontal-disabled",cx="table-scroller-header",cy="radiobutton-disabled",cz="button-pressed",cA="table-pane",cB="decoration/window/close-active.png",cC="native",dm="checkbox-hovered",dl="button-invalid-shadow",dk="checkbox-checked",dj="decoration/window/minimize-active-hovered.png",dr="menubar",dq="icon/16/actions/dialog-cancel.png",dp="tabview-page-button-top-inactive",dn="tabview-page-button-left-inactive",dv="menu-slidebar",du="toolbar-button-checked",dS="decoration/tree/open-selected.png",dT="radiobutton-checked",dQ="decoration/window/minimize-inactive.png",dR="icon/16/apps/office-calendar.png",dO="group",dP="tabview-page-button-right-inactive",dM="decoration/window/minimize-active.png",dN="decoration/window/restore-inactive.png",dU="checkbox-checked-focused",dV="splitpane",el="combobox/textfield",ek="button-preselected-focused",en="decoration/window/close-active-hovered.png",em="qx/icon/Tango/16/actions/window-close.png",ep="checkbox-pressed",eo="button-disabled",er="selected-dragover",eq="border-separator",ej="decoration/window/maximize-inactive.png",ei="dragover",eS="scrollarea",eT="scrollbar-vertical",eU="decoration/menu/checkbox-invert.gif",eV="decoration/toolbar/toolbar-handle-knob.gif",eO="icon/22/mimetypes/office-document.png",eP="button-preselected",eQ="button-checked-focused",eR="up.png",eM="best-fit",eN="decoration/tree/closed-selected.png",Y="qx.theme.modern.Appearance",X="text-active",W="checkbox-disabled",V="toolbar-button-hovered",U="progressive-table-header",T="decoration/table/select-column-order.png",S="decoration/menu/radiobutton.gif",R="decoration/arrows/forward.png",Q="decoration/table/descending.png",P="window-captionbar-active",bm="checkbox-checked-hovered",bn="scrollbar-slider-vertical",bk="toolbar",bl="alias",bq="decoration/window/restore-active.png",br="decoration/table/boolean-false.png",bo="checkbox-checked-disabled",bp="icon/32/mimetypes/office-document.png",bt="radiobutton-checked-disabled",bu="tabview-pane",dz="decoration/arrows/rewind.png",dt="checkbox-focused",dG="top",dC="#EEE",dh="icon/16/actions/dialog-ok.png",df="radiobutton-checked-hovered",bH="table-header-cell-hovered",di="window",bS="text-gray",bR="decoration/menu/radiobutton-invert.gif",cM="text-placeholder",cN="slider",cO="keep-align",cP="down.png",cQ="tabview-page-button-top-active",cR="icon/32/places/folder-open.png",cS="icon/22/places/folder.png",cT="decoration/window/maximize-active.png",cJ="checkbox-checked-pressed",cK="decoration/window/close-inactive.png",dg="tabview-page-button-left-active",dF="toolbar-part",dE="decoration/splitpane/knob-vertical.png",dD=".gif",dK="icon/22/places/folder-open.png",dJ="radiobutton-checked-pressed",dI="table-statusbar",dH="radiobutton-pressed",dB="window-captionbar-inactive",dA="copy",bs="radiobutton-focused",bW="decoration/arrows/down-invert.png",bV="decoration/menu/checkbox.gif",ds="decoration/splitpane/knob-horizontal.png",ci="icon/32/places/folder.png",dy="toolbar-separator",dx="tabview-page-button-bottom-active",dw="decoration/arrows/up-small.png",bG="decoration/table/ascending.png",dL="decoration/arrows/up-invert.png",bv="small",bI="tabview-page-button-right-active",cD="-disabled",cE="scrollbar-horizontal",cF="progressive-table-header-cell",cG="menu-separator",cH="pane",cI="decoration/arrows/right-invert.png",dW="left.png",cL="icon/16/actions/view-refresh.png";
qx.Theme.define(Y,{appearances:{"widget":{},"root":{style:function(hE){return {backgroundColor:eh,textColor:bj,font:cd};
}},"label":{style:function(gb){return {textColor:gb.disabled?de:undefined};
}},"move-frame":{style:function(fk){return {decorator:ey};
}},"resize-frame":cq,"dragdrop-cursor":{style:function(gH){var gI=cj;

if(gH.copy){gI=dA;
}else if(gH.move){gI=bP;
}else if(gH.alias){gI=bl;
}return {source:bw+gI+dD,position:bb,offset:[2,16,2,6]};
}},"image":{style:function(hv){return {opacity:!hv.replacement&&hv.disabled?0.3:1};
}},"atom":{},"atom/label":ef,"atom/icon":ev,"popup":{style:function(fw){return {decorator:ey,backgroundColor:es,shadow:cf};
}},"button-frame":{alias:eA,style:function(fO){var fQ,fP;

if(fO.checked&&fO.focused&&!fO.inner){fQ=eQ;
fP=undefined;
}else if(fO.disabled){fQ=eo;
fP=undefined;
}else if(fO.pressed){fQ=cz;
fP=eb;
}else if(fO.checked){fQ=bB;
fP=undefined;
}else if(fO.hovered){fQ=ct;
fP=eb;
}else if(fO.preselected&&fO.focused&&!fO.inner){fQ=ek;
fP=eb;
}else if(fO.preselected){fQ=eP;
fP=eb;
}else if(fO.focused&&!fO.inner){fQ=eW;
fP=undefined;
}else{fQ=ex;
fP=undefined;
}return {decorator:fQ,textColor:fP,shadow:fO.invalid&&!fO.disabled?dl:undefined};
}},"button-frame/image":{style:function(fH){return {opacity:!fH.replacement&&fH.disabled?0.5:1};
}},"button":{alias:eB,include:eB,style:function(hw){return {padding:[2,8],center:true};
}},"hover-button":{alias:eA,include:eA,style:function(fB){return {decorator:fB.hovered?da:undefined,textColor:fB.hovered?ew:undefined};
}},"splitbutton":{},"splitbutton/button":ex,"splitbutton/arrow":{alias:ex,include:ex,style:function(gT){return {icon:dc,padding:2,marginLeft:1};
}},"checkbox":{alias:eA,style:function(hG){var hI;

if(hG.checked&&hG.focused){hI=dU;
}else if(hG.checked&&hG.disabled){hI=bo;
}else if(hG.checked&&hG.pressed){hI=cJ;
}else if(hG.checked&&hG.hovered){hI=bm;
}else if(hG.checked){hI=dk;
}else if(hG.disabled){hI=W;
}else if(hG.focused){hI=dt;
}else if(hG.pressed){hI=ep;
}else if(hG.hovered){hI=dm;
}else{hI=bc;
}var hH=hG.invalid&&!hG.disabled?bz:bE;
return {icon:bF+hI+hH+ff,gap:6};
}},"radiobutton":{alias:eA,style:function(b){var d;

if(b.checked&&b.focused){d=bO;
}else if(b.checked&&b.disabled){d=bt;
}else if(b.checked&&b.pressed){d=dJ;
}else if(b.checked&&b.hovered){d=df;
}else if(b.checked){d=dT;
}else if(b.disabled){d=cy;
}else if(b.focused){d=bs;
}else if(b.pressed){d=dH;
}else if(b.hovered){d=bx;
}else{d=eg;
}var c=b.invalid&&!b.disabled?bz:bE;
return {icon:bF+d+c+ff,gap:6};
}},"textfield":{style:function(e){var j;
var h=!!e.focused;
var i=!!e.invalid;
var f=!!e.disabled;

if(h&&i&&!f){j=cU;
}else if(h&&!i&&!f){j=eG;
}else if(f){j=cW;
}else if(!h&&i&&!f){j=cY;
}else{j=cX;
}var g;

if(e.disabled){g=de;
}else if(e.showingPlaceholder){g=cM;
}else{g=fc;
}return {decorator:j,padding:[2,4,1],textColor:g};
}},"textarea":{include:ec,style:function(fU){return {padding:4};
}},"spinner":{style:function(hQ){var hU;
var hS=!!hQ.focused;
var hT=!!hQ.invalid;
var hR=!!hQ.disabled;

if(hS&&hT&&!hR){hU=cU;
}else if(hS&&!hT&&!hR){hU=eG;
}else if(hR){hU=cW;
}else if(!hS&&hT&&!hR){hU=cY;
}else{hU=cX;
}return {decorator:hU};
}},"spinner/textfield":{style:function(v){return {marginRight:2,padding:[2,4,1],textColor:v.disabled?de:fc};
}},"spinner/upbutton":{alias:eB,include:eB,style:function(fm){return {icon:dw,padding:fm.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"spinner/downbutton":{alias:eB,include:eB,style:function(gw){return {icon:ca,padding:gw.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"datefield":ba,"datefield/button":{alias:bh,include:bh,style:function(fN){return {icon:dR,padding:[0,3],decorator:undefined};
}},"datefield/textfield":el,"datefield/list":{alias:cb,include:cb,style:function(gr){return {decorator:undefined};
}},"groupbox":{style:function(gW){return {legendPosition:dG};
}},"groupbox/legend":{alias:eA,style:function(gP){return {padding:[1,0,1,4],textColor:gP.invalid?dX:bd,font:eu};
}},"groupbox/frame":{style:function(gj){return {padding:12,decorator:dO};
}},"check-groupbox":dd,"check-groupbox/legend":{alias:bc,include:bc,style:function(A){return {padding:[1,0,1,4],textColor:A.invalid?dX:bd,font:eu};
}},"radio-groupbox":dd,"radio-groupbox/legend":{alias:eg,include:eg,style:function(fF){return {padding:[1,0,1,4],textColor:fF.invalid?dX:bd,font:eu};
}},"scrollarea":{style:function(ia){return {minWidth:50,minHeight:50};
}},"scrollarea/corner":{style:function(fl){return {backgroundColor:eh};
}},"scrollarea/pane":ez,"scrollarea/scrollbar-x":eK,"scrollarea/scrollbar-y":eK,"scrollbar":{style:function(ha){if(ha[cC]){return {};
}return {width:ha.horizontal?undefined:16,height:ha.horizontal?16:undefined,decorator:ha.horizontal?cE:eT,padding:1};
}},"scrollbar/slider":{alias:cN,style:function(fE){return {padding:fE.horizontal?[0,1,0,1]:[1,0,1,0]};
}},"scrollbar/slider/knob":{include:eB,style:function(fu){var fv=fu.horizontal?eY:bn;

if(fu.disabled){fv+=cD;
}return {decorator:fv,minHeight:fu.horizontal?undefined:9,minWidth:fu.horizontal?9:undefined};
}},"scrollbar/button":{alias:eB,include:eB,style:function(fs){var ft=cu;

if(fs.left){ft+=dW;
}else if(fs.right){ft+=bK;
}else if(fs.up){ft+=eR;
}else{ft+=cP;
}
if(fs.left||fs.right){return {padding:[0,0,0,fs.left?3:4],icon:ft,width:15,height:14};
}else{return {padding:[0,0,0,2],icon:ft,width:14,height:15};
}}},"scrollbar/button-begin":bf,"scrollbar/button-end":bf,"slider":{style:function(gc){var gg;
var ge=!!gc.focused;
var gf=!!gc.invalid;
var gd=!!gc.disabled;

if(ge&&gf&&!gd){gg=cU;
}else if(ge&&!gf&&!gd){gg=eG;
}else if(gd){gg=cW;
}else if(!ge&&gf&&!gd){gg=cY;
}else{gg=cX;
}return {decorator:gg};
}},"slider/knob":{include:eB,style:function(hO){return {decorator:hO.disabled?cw:eY,shadow:undefined,height:14,width:14};
}},"list":{alias:eS,style:function(hJ){var hN;
var hL=!!hJ.focused;
var hM=!!hJ.invalid;
var hK=!!hJ.disabled;

if(hL&&hM&&!hK){hN=cU;
}else if(hL&&!hM&&!hK){hN=eG;
}else if(hK){hN=cW;
}else if(!hL&&hM&&!hK){hN=cY;
}else{hN=cX;
}return {backgroundColor:es,decorator:hN};
}},"list/pane":ez,"listitem":{alias:eA,style:function(o){var p;

if(o.dragover){p=o.selected?er:ei;
}else{p=o.selected?da:undefined;
}return {padding:o.dragover?[4,4,2,4]:4,textColor:o.selected?ew:undefined,decorator:p};
}},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:eB,include:eB,style:function(hP){return {padding:5,center:true,icon:hP.vertical?dc:ee};
}},"slidebar/button-backward":{alias:eB,include:eB,style:function(fW){return {padding:5,center:true,icon:fW.vertical?bC:eX};
}},"tabview":{style:function(gh){return {contentPadding:16};
}},"tabview/bar":{alias:cn,style:function(gm){var gn={marginBottom:gm.barTop?-1:0,marginTop:gm.barBottom?-4:0,marginLeft:gm.barRight?-3:0,marginRight:gm.barLeft?-1:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};

if(gm.barTop||gm.barBottom){gn.paddingLeft=5;
gn.paddingRight=7;
}else{gn.paddingTop=5;
gn.paddingBottom=7;
}return gn;
}},"tabview/bar/button-forward":{include:fb,alias:fb,style:function(fX){if(fX.barTop||fX.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/button-backward":{include:cg,alias:cg,style:function(fj){if(fj.barTop||fj.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(F){return {decorator:bu,minHeight:100,marginBottom:F.barBottom?-1:0,marginTop:F.barTop?-1:0,marginLeft:F.barLeft?-1:0,marginRight:F.barRight?-1:0};
}},"tabview-page":ez,"tabview-page/button":{alias:eA,style:function(hm){var hs,ho=0;
var hr=0,hn=0,hp=0,hq=0;

if(hm.checked){if(hm.barTop){hs=cQ;
ho=[6,14];
hp=hm.firstTab?0:-5;
hq=hm.lastTab?0:-5;
}else if(hm.barBottom){hs=dx;
ho=[6,14];
hp=hm.firstTab?0:-5;
hq=hm.lastTab?0:-5;
}else if(hm.barRight){hs=bI;
ho=[6,13];
hr=hm.firstTab?0:-5;
hn=hm.lastTab?0:-5;
}else{hs=dg;
ho=[6,13];
hr=hm.firstTab?0:-5;
hn=hm.lastTab?0:-5;
}}else{if(hm.barTop){hs=dp;
ho=[4,10];
hr=4;
hp=hm.firstTab?5:1;
hq=1;
}else if(hm.barBottom){hs=bJ;
ho=[4,10];
hn=4;
hp=hm.firstTab?5:1;
hq=1;
}else if(hm.barRight){hs=dP;
ho=[4,10];
hq=5;
hr=hm.firstTab?5:1;
hn=1;
hp=1;
}else{hs=dn;
ho=[4,10];
hp=5;
hr=hm.firstTab?5:1;
hn=1;
hq=1;
}}return {zIndex:hm.checked?10:5,decorator:hs,padding:ho,marginTop:hr,marginBottom:hn,marginLeft:hp,marginRight:hq,textColor:hm.checked?X:bQ};
}},"tabview-page/button/close-button":{alias:eA,style:function(fq){return {icon:em};
}},"toolbar":{style:function(fY){return {decorator:bk,spacing:2};
}},"toolbar/part":{style:function(hb){return {decorator:dF,spacing:2};
}},"toolbar/part/container":{style:function(N){return {paddingLeft:2,paddingRight:2};
}},"toolbar/part/handle":{style:function(hx){return {source:eV,marginLeft:3,marginRight:3};
}},"toolbar-button":{alias:eA,style:function(gV){return {marginTop:2,marginBottom:2,padding:(gV.pressed||gV.checked||gV.hovered)&&!gV.disabled||(gV.disabled&&gV.checked)?3:5,decorator:gV.pressed||(gV.checked&&!gV.hovered)||(gV.checked&&gV.disabled)?du:gV.hovered&&!gV.disabled?V:undefined};
}},"toolbar-menubutton":{alias:eI,include:eI,style:function(gS){return {showArrow:true};
}},"toolbar-menubutton/arrow":{alias:ev,include:ev,style:function(gX){return {source:ca};
}},"toolbar-splitbutton":{style:function(fz){return {marginTop:2,marginBottom:2};
}},"toolbar-splitbutton/button":{alias:eI,include:eI,style:function(hC){return {icon:dc,marginTop:undefined,marginBottom:undefined};
}},"toolbar-splitbutton/arrow":{alias:eI,include:eI,style:function(hV){return {padding:hV.pressed||hV.checked?1:hV.hovered?1:3,icon:dc,marginTop:undefined,marginBottom:undefined};
}},"toolbar-separator":{style:function(fM){return {decorator:dy,margin:7};
}},"tree":eF,"tree-item":{style:function(gs){return {padding:[2,6],textColor:gs.selected?ew:undefined,decorator:gs.selected?da:undefined};
}},"tree-item/icon":{include:ev,style:function(gF){return {paddingRight:5};
}},"tree-item/label":ef,"tree-item/open":{include:ev,style:function(K){var L;

if(K.selected&&K.opened){L=dS;
}else if(K.selected&&!K.opened){L=eN;
}else if(K.opened){L=cc;
}else{L=fa;
}return {padding:[0,5,0,2],source:L};
}},"tree-folder":{include:eC,alias:eC,style:function(y){var z;

if(y.small){z=y.opened?by:bi;
}else if(y.large){z=y.opened?cR:ci;
}else{z=y.opened?dK:cS;
}return {icon:z};
}},"tree-file":{include:eC,alias:eC,style:function(gN){return {icon:gN.small?bX:gN.large?bp:eO};
}},"treevirtual":bD,"treevirtual-folder":{style:function(t){return {icon:t.opened?by:bi};
}},"treevirtual-file":{include:ce,alias:ce,style:function(w){return {icon:bX};
}},"treevirtual-line":{style:function(G){return {icon:be};
}},"treevirtual-contract":{style:function(ht){return {icon:cc,paddingLeft:5,paddingTop:2};
}},"treevirtual-expand":{style:function(J){return {icon:fa,paddingLeft:5,paddingTop:2};
}},"treevirtual-only-contract":eD,"treevirtual-only-expand":ed,"treevirtual-start-contract":eD,"treevirtual-start-expand":ed,"treevirtual-end-contract":eD,"treevirtual-end-expand":ed,"treevirtual-cross-contract":eD,"treevirtual-cross-expand":ed,"treevirtual-end":{style:function(gK){return {icon:be};
}},"treevirtual-cross":{style:function(fD){return {icon:be};
}},"tooltip":{include:eH,style:function(hA){return {backgroundColor:cv,padding:[1,3,2,3],offset:[15,5,5,5]};
}},"tooltip/atom":eA,"tooltip-error":{include:eE,style:function(fC){return {textColor:ew,placeMethod:ez,offset:[0,0,0,14],marginTop:-2,position:bb,showTimeout:100,hideTimeout:10000,decorator:bU,shadow:co,font:eu};
}},"tooltip-error/atom":eA,"window":{style:function(I){return {shadow:bM,contentPadding:[10,10,10,10]};
}},"window/pane":{style:function(gL){return {decorator:di};
}},"window/captionbar":{style:function(s){return {decorator:s.active?P:dB,textColor:s.active?dY:bS,minHeight:26,paddingRight:2};
}},"window/icon":{style:function(fp){return {margin:[5,0,3,6]};
}},"window/title":{style:function(hy){return {alignY:et,font:eu,marginLeft:6,marginRight:12};
}},"window/minimize-button":{alias:eA,style:function(fI){return {icon:fI.active?fI.hovered?dj:dM:dQ,margin:[4,8,2,0]};
}},"window/restore-button":{alias:eA,style:function(gM){return {icon:gM.active?gM.hovered?bN:bq:dN,margin:[5,8,2,0]};
}},"window/maximize-button":{alias:eA,style:function(u){return {icon:u.active?u.hovered?bA:cT:ej,margin:[4,8,2,0]};
}},"window/close-button":{alias:eA,style:function(gu){return {icon:gu.active?gu.hovered?en:cB:cK,margin:[4,8,2,0]};
}},"window/statusbar":{style:function(hi){return {padding:[2,6],decorator:bT,minHeight:18};
}},"window/statusbar-text":{style:function(gt){return {font:bv};
}},"iframe":{style:function(go){return {decorator:ey};
}},"resizer":{style:function(O){return {decorator:cH};
}},"splitpane":{style:function(hu){return {decorator:dV};
}},"splitpane/splitter":{style:function(he){return {width:he.horizontal?3:undefined,height:he.vertical?3:undefined,backgroundColor:fg};
}},"splitpane/splitter/knob":{style:function(gY){return {source:gY.horizontal?ds:dE};
}},"splitpane/slider":{style:function(gG){return {width:gG.horizontal?3:undefined,height:gG.vertical?3:undefined,backgroundColor:fg};
}},"selectbox":{alias:eB,include:eB,style:function(fr){return {padding:[2,8]};
}},"selectbox/atom":eA,"selectbox/popup":eH,"selectbox/list":{alias:eF},"selectbox/arrow":{include:ev,style:function(gR){return {source:dc,paddingLeft:5};
}},"datechooser":{style:function(ib){var ig;
var id=!!ib.focused;
var ie=!!ib.invalid;
var ic=!!ib.disabled;

if(id&&ie&&!ic){ig=cU;
}else if(id&&!ie&&!ic){ig=eG;
}else if(ic){ig=cW;
}else if(!id&&ie&&!ic){ig=cY;
}else{ig=cX;
}return {padding:2,decorator:ig,backgroundColor:es};
}},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:eB,alias:eB,style:function(gx){var gy={padding:[2,4],shadow:undefined};

if(gx.lastYear){gy.icon=dz;
gy.marginRight=1;
}else if(gx.lastMonth){gy.icon=eX;
}else if(gx.nextYear){gy.icon=R;
gy.marginLeft=1;
}else if(gx.nextMonth){gy.icon=ee;
}return gy;
}},"datechooser/last-year-button-tooltip":eE,"datechooser/last-month-button-tooltip":eE,"datechooser/next-year-button-tooltip":eE,"datechooser/next-month-button-tooltip":eE,"datechooser/last-year-button":eL,"datechooser/last-month-button":eL,"datechooser/next-month-button":eL,"datechooser/next-year-button":eL,"datechooser/month-year-label":{style:function(fV){return {font:eu,textAlign:ea,textColor:fV.disabled?de:undefined};
}},"datechooser/date-pane":{style:function(fL){return {textColor:fL.disabled?de:undefined,marginTop:2};
}},"datechooser/weekday":{style:function(fS){return {textColor:fS.disabled?de:fS.weekend?fe:undefined,textAlign:ea,paddingTop:2,backgroundColor:bY};
}},"datechooser/week":{style:function(hk){return {textAlign:ea,padding:[2,4],backgroundColor:bY};
}},"datechooser/day":{style:function(gl){return {textAlign:ea,decorator:gl.disabled?undefined:gl.selected?da:undefined,textColor:gl.disabled?de:gl.selected?ew:gl.otherMonth?fe:undefined,font:gl.today?eu:undefined,padding:[2,4]};
}},"combobox":{style:function(gA){var gE;
var gC=!!gA.focused;
var gD=!!gA.invalid;
var gB=!!gA.disabled;

if(gC&&gD&&!gB){gE=cU;
}else if(gC&&!gD&&!gB){gE=eG;
}else if(gB){gE=cW;
}else if(!gC&&gD&&!gB){gE=cY;
}else{gE=cX;
}return {decorator:gE};
}},"combobox/popup":eH,"combobox/list":{alias:eF},"combobox/button":{include:eB,alias:eB,style:function(D){var E={icon:dc,padding:2};

if(D.selected){E.decorator=eW;
}return E;
}},"combobox/textfield":{include:ec,style:function(n){return {decorator:undefined};
}},"menu":{style:function(fn){var fo={decorator:cm,shadow:cf,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,placementModeY:fn.submenu||fn.contextmenu?eM:cO};

if(fn.submenu){fo.position=bb;
fo.offset=[-2,-3];
}return fo;
}},"menu/slidebar":dv,"menu-slidebar":ez,"menu-slidebar-button":{style:function(hf){return {decorator:hf.hovered?da:undefined,padding:7,center:true};
}},"menu-slidebar/button-backward":{include:fd,style:function(fG){return {icon:fG.hovered?dL:bC};
}},"menu-slidebar/button-forward":{include:fd,style:function(k){return {icon:k.hovered?bW:dc};
}},"menu-separator":{style:function(fh){return {height:0,decorator:cG,margin:[4,2]};
}},"menu-button":{alias:eA,style:function(gJ){return {decorator:gJ.selected?da:undefined,textColor:gJ.selected?ew:undefined,padding:[4,6]};
}},"menu-button/icon":{include:ev,style:function(hY){return {alignY:et};
}},"menu-button/label":{include:ef,style:function(gk){return {alignY:et,padding:1};
}},"menu-button/shortcut":{include:ef,style:function(gQ){return {alignY:et,marginLeft:14,padding:1};
}},"menu-button/arrow":{include:ev,style:function(gi){return {source:gi.selected?cI:ee,alignY:et};
}},"menu-checkbox":{alias:cV,include:cV,style:function(M){return {icon:!M.checked?undefined:M.selected?eU:bV};
}},"menu-radiobutton":{alias:cV,include:cV,style:function(hB){return {icon:!hB.checked?undefined:hB.selected?bR:S};
}},"menubar":{style:function(a){return {decorator:dr};
}},"menubar-button":{alias:eA,style:function(gz){return {decorator:gz.pressed||gz.hovered?da:undefined,textColor:gz.pressed||gz.hovered?ew:undefined,padding:[3,8]};
}},"colorselector":ez,"colorselector/control-bar":ez,"colorselector/control-pane":ez,"colorselector/visual-pane":dd,"colorselector/preset-grid":ez,"colorselector/colorbucket":{style:function(gp){return {decorator:ey,width:16,height:16};
}},"colorselector/preset-field-set":dd,"colorselector/input-field-set":dd,"colorselector/preview-field-set":dd,"colorselector/hex-field-composite":ez,"colorselector/hex-field":ec,"colorselector/rgb-spinner-composite":ez,"colorselector/rgb-spinner-red":eJ,"colorselector/rgb-spinner-green":eJ,"colorselector/rgb-spinner-blue":eJ,"colorselector/hsb-spinner-composite":ez,"colorselector/hsb-spinner-hue":eJ,"colorselector/hsb-spinner-saturation":eJ,"colorselector/hsb-spinner-brightness":eJ,"colorselector/preview-content-old":{style:function(fy){return {decorator:ey,width:50,height:10};
}},"colorselector/preview-content-new":{style:function(r){return {decorator:ey,backgroundColor:es,width:50,height:10};
}},"colorselector/hue-saturation-field":{style:function(hd){return {decorator:ey,margin:5};
}},"colorselector/brightness-field":{style:function(fx){return {decorator:ey,margin:[5,7]};
}},"colorselector/hue-saturation-pane":ez,"colorselector/hue-saturation-handle":ez,"colorselector/brightness-pane":ez,"colorselector/brightness-handle":ez,"colorpopup":{alias:eH,include:eH,style:function(hg){return {padding:5,backgroundColor:eh};
}},"colorpopup/field":{style:function(gq){return {decorator:ey,margin:2,width:14,height:14,backgroundColor:es};
}},"colorpopup/selector-button":ex,"colorpopup/auto-button":ex,"colorpopup/preview-pane":dd,"colorpopup/current-preview":{style:function(gv){return {height:20,padding:4,marginLeft:4,decorator:ey,allowGrowX:true};
}},"colorpopup/selected-preview":{style:function(l){return {height:20,padding:4,marginRight:4,decorator:ey,allowGrowX:true};
}},"colorpopup/colorselector-okbutton":{alias:ex,include:ex,style:function(hc){return {icon:dh};
}},"colorpopup/colorselector-cancelbutton":{alias:ex,include:ex,style:function(hD){return {icon:dq};
}},"table":{alias:ez,style:function(hl){return {decorator:bD};
}},"table-header":{},"table/statusbar":{style:function(B){return {decorator:dI,padding:[0,2]};
}},"table/column-button":{alias:eB,style:function(hh){return {decorator:bL,padding:3,icon:T};
}},"table-column-reset-button":{include:cV,alias:cV,style:function(){return {icon:cL};
}},"table-scroller":ez,"table-scroller/scrollbar-x":eK,"table-scroller/scrollbar-y":eK,"table-scroller/header":{style:function(H){return {decorator:cx};
}},"table-scroller/pane":{style:function(q){return {backgroundColor:cA};
}},"table-scroller/focus-indicator":{style:function(C){return {decorator:cp};
}},"table-scroller/resize-line":{style:function(fK){return {backgroundColor:eq,width:2};
}},"table-header-cell":{alias:eA,style:function(fT){return {minWidth:13,minHeight:20,padding:fT.hovered?[3,4,2,4]:[3,4],decorator:fT.hovered?bH:cl,sortIcon:fT.sorted?(fT.sortedAscending?bG:Q):undefined};
}},"table-header-cell/label":{style:function(hj){return {minWidth:0,alignY:et,paddingRight:5};
}},"table-header-cell/sort-icon":{style:function(gO){return {alignY:et,alignX:bg};
}},"table-header-cell/icon":{style:function(fJ){return {minWidth:0,alignY:et,paddingRight:5};
}},"table-editor-textfield":{include:ec,style:function(gU){return {decorator:undefined,padding:[2,2],backgroundColor:es};
}},"table-editor-selectbox":{include:ch,alias:ch,style:function(ga){return {padding:[0,2],backgroundColor:es};
}},"table-editor-combobox":{include:ba,alias:ba,style:function(fi){return {decorator:undefined,backgroundColor:es};
}},"progressive-table-header":{alias:ez,style:function(hz){return {decorator:U};
}},"progressive-table-header-cell":{alias:eA,style:function(fR){return {minWidth:40,minHeight:25,paddingLeft:6,decorator:cF};
}},"app-header":{style:function(hX){return {font:eu,textColor:ew,padding:[8,12],decorator:cr};
}},"virtual-list":eF,"virtual-list/row-layer":cs,"row-layer":{style:function(fA){return {colorEven:dY,colorOdd:dC};
}},"column-layer":ez,"cell":{style:function(hW){return {textColor:hW.selected?ew:bj,padding:[3,6],font:cd};
}},"cell-string":db,"cell-number":{include:db,style:function(m){return {textAlign:bg};
}},"cell-image":db,"cell-boolean":{include:db,style:function(x){return {iconTrue:ck,iconFalse:br};
}},"cell-atom":db,"cell-date":db,"cell-html":db,"htmlarea":{"include":ez,style:function(hF){return {backgroundColor:dY};
}}}});
})();
(function(){var a="accordion.demo.theme.Appearance";
qx.Theme.define(a,{extend:qx.theme.modern.Appearance,appearances:{}});
})();
(function(){var a="accordion.demo.theme.Theme";
qx.Theme.define(a,{meta:{color:accordion.demo.theme.Color,decoration:accordion.demo.theme.Decoration,font:accordion.demo.theme.Font,icon:qx.theme.icon.Tango,appearance:accordion.demo.theme.Appearance}});
})();
(function(){var b="CSS1Compat",a="qx.bom.client.Feature";
qx.Class.define(a,{statics:{STANDARD_MODE:false,QUIRKS_MODE:false,CONTENT_BOX:false,BORDER_BOX:false,SVG:false,CANVAS:!!window.CanvasRenderingContext2D,VML:false,XPATH:!!document.evaluate,AIR:navigator.userAgent.indexOf("adobeair")!==-1,GEARS:!!(window.google&&window.google.gears),SSL:window.location.protocol==="https:",ECMA_OBJECT_COUNT:(({}).__count__==0),CSS_POINTER_EVENTS:"pointerEvents" in document.documentElement.style,__cd:function(){this.QUIRKS_MODE=this.__ce();
this.STANDARD_MODE=!this.QUIRKS_MODE;
this.CONTENT_BOX=!qx.bom.client.Engine.MSHTML||this.STANDARD_MODE;
this.BORDER_BOX=!this.CONTENT_BOX;
this.SVG=document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature("org.w3c.dom.svg","1.0")||document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"));
this.VML=qx.bom.client.Engine.MSHTML;
},__ce:function(){if(qx.bom.client.Engine.MSHTML&&qx.bom.client.Engine.VERSION>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return document.compatMode!==b;
}}},defer:function(c){c.__cd();
}});
})();
(function(){var a="qx.lang.Object";
qx.Class.define(a,{statics:{empty:function(z){{};

for(var A in z){if(z.hasOwnProperty(A)){delete z[A];
}}},isEmpty:(qx.bom.client.Feature.ECMA_OBJECT_COUNT)?
function(E){{};
return E.__count__===0;
}:
function(s){{};

for(var t in s){return false;
}return true;
},hasMinLength:(qx.bom.client.Feature.ECMA_OBJECT_COUNT)?
function(g,h){{};
return g.__count__>=h;
}:
function(b,c){{};

if(c<=0){return true;
}var length=0;

for(var d in b){if((++length)>=c){return true;
}}return false;
},getLength:qx.Bootstrap.objectGetLength,getKeys:qx.Bootstrap.getKeys,getKeysAsString:qx.Bootstrap.getKeysAsString,getValues:function(H){{};
var J=[];
var I=this.getKeys(H);

for(var i=0,l=I.length;i<l;i++){J.push(H[I[i]]);
}return J;
},mergeWith:qx.Bootstrap.objectMergeWith,carefullyMergeWith:function(x,y){{};
return qx.lang.Object.mergeWith(x,y,false);
},merge:function(u,v){{};
var w=arguments.length;

for(var i=1;i<w;i++){qx.lang.Object.mergeWith(u,arguments[i]);
}return u;
},clone:function(m){{};
var n={};

for(var o in m){n[o]=m[o];
}return n;
},invert:function(B){{};
var C={};

for(var D in B){C[B[D].toString()]=D;
}return C;
},getKeyFromValue:function(p,q){{};

for(var r in p){if(p.hasOwnProperty(r)&&p[r]===q){return r;
}}return null;
},contains:function(j,k){{};
return this.getKeyFromValue(j,k)!==null;
},select:function(e,f){{};
return f[e];
},fromArray:function(F){{};
var G={};

for(var i=0,l=F.length;i<l;i++){{};
G[F[i].toString()]=true;
}return G;
}}});
})();
(function(){var g="emulated",f="native",e='"',d="qx.lang.Core",c="\\\\",b="\\\"",a="[object Error]";
qx.Class.define(d,{statics:{errorToString:qx.lang.Object.select((!Error.prototype.toString||Error.prototype.toString()==a)?g:f,{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}),arrayIndexOf:qx.lang.Object.select(Array.prototype.indexOf?f:g,{"native":Array.prototype.indexOf,"emulated":function(h,j){if(j==null){j=0;
}else if(j<0){j=Math.max(0,this.length+j);
}
for(var i=j;i<this.length;i++){if(this[i]===h){return i;
}}return -1;
}}),arrayLastIndexOf:qx.lang.Object.select(Array.prototype.lastIndexOf?f:g,{"native":Array.prototype.lastIndexOf,"emulated":function(C,D){if(D==null){D=this.length-1;
}else if(D<0){D=Math.max(0,this.length+D);
}
for(var i=D;i>=0;i--){if(this[i]===C){return i;
}}return -1;
}}),arrayForEach:qx.lang.Object.select(Array.prototype.forEach?f:g,{"native":Array.prototype.forEach,"emulated":function(k,m){var l=this.length;

for(var i=0;i<l;i++){var n=this[i];

if(n!==undefined){k.call(m||window,n,i,this);
}}}}),arrayFilter:qx.lang.Object.select(Array.prototype.filter?f:g,{"native":Array.prototype.filter,"emulated":function(u,v){var w=[];
var l=this.length;

for(var i=0;i<l;i++){var x=this[i];

if(x!==undefined){if(u.call(v||window,x,i,this)){w.push(this[i]);
}}}return w;
}}),arrayMap:qx.lang.Object.select(Array.prototype.map?f:g,{"native":Array.prototype.map,"emulated":function(y,z){var A=[];
var l=this.length;

for(var i=0;i<l;i++){var B=this[i];

if(B!==undefined){A[i]=y.call(z||window,B,i,this);
}}return A;
}}),arraySome:qx.lang.Object.select(Array.prototype.some?f:g,{"native":Array.prototype.some,"emulated":function(o,p){var l=this.length;

for(var i=0;i<l;i++){var q=this[i];

if(q!==undefined){if(o.call(p||window,q,i,this)){return true;
}}}return false;
}}),arrayEvery:qx.lang.Object.select(Array.prototype.every?f:g,{"native":Array.prototype.every,"emulated":function(r,s){var l=this.length;

for(var i=0;i<l;i++){var t=this[i];

if(t!==undefined){if(!r.call(s||window,t,i,this)){return false;
}}}return true;
}}),stringQuote:qx.lang.Object.select(String.prototype.quote?f:g,{"native":String.prototype.quote,"emulated":function(){return e+this.replace(/\\/g,c).replace(/\"/g,b)+e;
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
(function(){var g="qx.event.type.Event";
qx.Class.define(g,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(e,f){{};
this._type=null;
this._target=null;
this._currentTarget=null;
this._relatedTarget=null;
this._originalTarget=null;
this._stopPropagation=false;
this._preventDefault=false;
this._bubbles=!!e;
this._cancelable=!!f;
this._timeStamp=(new Date()).getTime();
this._eventPhase=null;
return this;
},clone:function(a){if(a){var b=a;
}else{var b=qx.event.Pool.getInstance().getObject(this.constructor);
}b._type=this._type;
b._target=this._target;
b._currentTarget=this._currentTarget;
b._relatedTarget=this._relatedTarget;
b._originalTarget=this._originalTarget;
b._stopPropagation=this._stopPropagation;
b._bubbles=this._bubbles;
b._preventDefault=this._preventDefault;
b._cancelable=this._cancelable;
return b;
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
},setType:function(k){this._type=k;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(i){this._eventPhase=i;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(l){this._target=l;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(c){this._currentTarget=c;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(m){this._relatedTarget=m;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(j){this._originalTarget=j;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(h){this._bubbles=h;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(d){this._cancelable=d;
}},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;
}});
})();
(function(){var a="qx.event.type.Data";
qx.Class.define(a,{extend:qx.event.type.Event,members:{__cf:null,__cg:null,init:function(d,e,f){arguments.callee.base.call(this,false,f);
this.__cf=d;
this.__cg=e;
return this;
},clone:function(b){var c=arguments.callee.base.call(this,b);
c.__cf=this.__cf;
c.__cg=this.__cg;
return c;
},getData:function(){return this.__cf;
},getOldData:function(){return this.__cg;
}},destruct:function(){this.__cf=this.__cg=null;
}});
})();
(function(){var bJ="get",bI="",bH="[",bG="last",bF="change",bE="]",bD=".",bC="Number",bB="String",bA="set",bY="deepBinding",bX="item",bW="reset",bV="' (",bU="Boolean",bT=").",bS=") to the object '",bR="Integer",bQ="qx.data.SingleValueBinding",bP="No event could be found for the property",bN="PositiveNumber",bO="Binding from '",bL="PositiveInteger",bM="Binding does not exist!",bK="Date";
qx.Class.define(bQ,{statics:{DEBUG_ON:false,__ch:{},bind:function(B,C,D,E,F){var P=this.__cj(B,C,D,E,F);
var K=C.split(bD);
var H=this.__cq(K);
var O=[];
var L=[];
var M=[];
var I=[];
var J=B;
for(var i=0;i<K.length;i++){if(H[i]!==bI){I.push(bF);
}else{I.push(this.__cl(J,K[i]));
}O[i]=J;
if(i==K.length-1){if(H[i]!==bI){var S=H[i]===bG?J.length-1:H[i];
var G=J.getItem(S);
this.__cp(G,D,E,F,B);
M[i]=this.__cr(J,I[i],D,E,F,H[i]);
}else{if(K[i]!=null&&J[bJ+qx.lang.String.firstUp(K[i])]!=null){var G=J[bJ+qx.lang.String.firstUp(K[i])]();
this.__cp(G,D,E,F,B);
}M[i]=this.__cr(J,I[i],D,E,F);
}}else{var Q={index:i,propertyNames:K,sources:O,listenerIds:M,arrayIndexValues:H,targetObject:D,targetPropertyChain:E,options:F,listeners:L};
var N=qx.lang.Function.bind(this.__ci,this,Q);
L.push(N);
M[i]=J.addListener(I[i],N);
}if(J[bJ+qx.lang.String.firstUp(K[i])]==null){J=null;
}else if(H[i]!==bI){J=J[bJ+qx.lang.String.firstUp(K[i])](H[i]);
}else{J=J[bJ+qx.lang.String.firstUp(K[i])]();
}
if(!J){break;
}}var R={type:bY,listenerIds:M,sources:O,targetListenerIds:P.listenerIds,targets:P.targets};
this.__cs(R,B,C,D,E);
return R;
},__ci:function(cc){if(cc.options&&cc.options.onUpdate){cc.options.onUpdate(cc.sources[cc.index],cc.targetObject);
}for(var j=cc.index+1;j<cc.propertyNames.length;j++){var cg=cc.sources[j];
cc.sources[j]=null;

if(!cg){continue;
}cg.removeListenerById(cc.listenerIds[j]);
}var cg=cc.sources[cc.index];
for(var j=cc.index+1;j<cc.propertyNames.length;j++){if(cc.arrayIndexValues[j-1]!==bI){cg=cg[bJ+qx.lang.String.firstUp(cc.propertyNames[j-1])](cc.arrayIndexValues[j-1]);
}else{cg=cg[bJ+qx.lang.String.firstUp(cc.propertyNames[j-1])]();
}cc.sources[j]=cg;
if(!cg){this.__cm(cc.targetObject,cc.targetPropertyChain);
break;
}if(j==cc.propertyNames.length-1){if(qx.Class.implementsInterface(cg,qx.data.IListData)){var ch=cc.arrayIndexValues[j]===bG?cg.length-1:cc.arrayIndexValues[j];
var ce=cg.getItem(ch);
this.__cp(ce,cc.targetObject,cc.targetPropertyChain,cc.options,cc.sources[cc.index]);
cc.listenerIds[j]=this.__cr(cg,bF,cc.targetObject,cc.targetPropertyChain,cc.options,cc.arrayIndexValues[j]);
}else{if(cc.propertyNames[j]!=null&&cg[bJ+qx.lang.String.firstUp(cc.propertyNames[j])]!=null){var ce=cg[bJ+qx.lang.String.firstUp(cc.propertyNames[j])]();
this.__cp(ce,cc.targetObject,cc.targetPropertyChain,cc.options,cc.sources[cc.index]);
}var cf=this.__cl(cg,cc.propertyNames[j]);
cc.listenerIds[j]=this.__cr(cg,cf,cc.targetObject,cc.targetPropertyChain,cc.options);
}}else{if(cc.listeners[j]==null){var cd=qx.lang.Function.bind(this.__ci,this,cc);
cc.listeners.push(cd);
}if(qx.Class.implementsInterface(cg,qx.data.IListData)){var cf=bF;
}else{var cf=this.__cl(cg,cc.propertyNames[j]);
}cc.listenerIds[j]=cg.addListener(cf,cc.listeners[j]);
}}},__cj:function(cj,ck,cl,cm,cn){var cr=cm.split(bD);
var cp=this.__cq(cr);
var cw=[];
var cv=[];
var ct=[];
var cs=[];
var cq=cl;
for(var i=0;i<cr.length-1;i++){if(cp[i]!==bI){cs.push(bF);
}else{try{cs.push(this.__cl(cq,cr[i]));
}catch(e){break;
}}cw[i]=cq;
var cu=function(){for(var j=i+1;j<cr.length-1;j++){var bo=cw[j];
cw[j]=null;

if(!bo){continue;
}bo.removeListenerById(ct[j]);
}var bo=cw[i];
for(var j=i+1;j<cr.length-1;j++){var bm=qx.lang.String.firstUp(cr[j-1]);
if(cp[j-1]!==bI){var bp=cp[j-1]===bG?bo.getLength()-1:cp[j-1];
bo=bo[bJ+bm](bp);
}else{bo=bo[bJ+bm]();
}cw[j]=bo;
if(cv[j]==null){cv.push(cu);
}if(qx.Class.implementsInterface(bo,qx.data.IListData)){var bn=bF;
}else{try{var bn=qx.data.SingleValueBinding.__cl(bo,cr[j]);
}catch(e){break;
}}ct[j]=bo.addListener(bn,cv[j]);
}qx.data.SingleValueBinding.__ck(cj,ck,cl,cm);
};
cv.push(cu);
ct[i]=cq.addListener(cs[i],cu);
var co=qx.lang.String.firstUp(cr[i]);
if(cq[bJ+co]==null){cq=null;
}else if(cp[i]!==bI){cq=cq[bJ+co](cp[i]);
}else{cq=cq[bJ+co]();
}
if(!cq){break;
}}return {listenerIds:ct,targets:cw};
},__ck:function(bq,br,bs,bt){var bx=this.__co(bq,br);

if(bx!=null){var bz=br.substring(br.lastIndexOf(bD)+1,br.length);
if(bz.charAt(bz.length-1)==bE){var bu=bz.substring(bz.lastIndexOf(bH)+1,bz.length-1);
var bw=bz.substring(0,bz.lastIndexOf(bH));
var by=bx[bJ+qx.lang.String.firstUp(bw)]();

if(bu==bG){bu=by.length-1;
}
if(by!=null){var bv=by.getItem(bu);
}}else{var bv=bx[bJ+qx.lang.String.firstUp(bz)]();
}}this.__cn(bs,bt,bv);
},__cl:function(bf,bg){var bh=this.__cu(bf,bg);
if(bh==null){if(qx.Class.supportsEvent(bf.constructor,bg)){bh=bg;
}else if(qx.Class.supportsEvent(bf.constructor,bF+qx.lang.String.firstUp(bg))){bh=bF+qx.lang.String.firstUp(bg);
}else{throw new qx.core.AssertionError(bP,bg);
}}return bh;
},__cm:function(V,W){var X=this.__co(V,W);

if(X!=null){var Y=W.substring(W.lastIndexOf(bD)+1,W.length);
if(Y.charAt(Y.length-1)==bE){this.__cn(V,W,null);
return;
}if(X[bW+qx.lang.String.firstUp(Y)]!=undefined){X[bW+qx.lang.String.firstUp(Y)]();
}else{X[bA+qx.lang.String.firstUp(Y)](null);
}}},__cn:function(cA,cB,cC){var cG=this.__co(cA,cB);

if(cG!=null){var cH=cB.substring(cB.lastIndexOf(bD)+1,cB.length);
if(cH.charAt(cH.length-1)==bE){var cD=cH.substring(cH.lastIndexOf(bH)+1,cH.length-1);
var cF=cH.substring(0,cH.lastIndexOf(bH));
var cE=cG[bJ+qx.lang.String.firstUp(cF)]();

if(cD==bG){cD=cE.length-1;
}
if(cE!=null){cE.setItem(cD,cC);
}}else{cG[bA+qx.lang.String.firstUp(cH)](cC);
}}},__co:function(cR,cS){var cV=cS.split(bD);
var cW=cR;
for(var i=0;i<cV.length-1;i++){try{var cU=cV[i];
if(cU.indexOf(bE)==cU.length-1){var cT=cU.substring(cU.indexOf(bH)+1,cU.length-1);
cU=cU.substring(0,cU.indexOf(bH));
}cW=cW[bJ+qx.lang.String.firstUp(cU)]();

if(cT!=null){if(cT==bG){cT=cW.length-1;
}cW=cW.getItem(cT);
cT=null;
}}catch(ci){return null;
}}return cW;
},__cp:function(a,b,c,d,f){a=this.__ct(a,b,c,d);
if(a==null){this.__cm(b,c);
}if(a!=undefined){try{this.__cn(b,c,a);
if(d&&d.onUpdate){d.onUpdate(f,b,a);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(d&&d.onSetFail){d.onSetFail(e);
}else{this.warn("Failed so set value "+a+" on "+b+". Error message: "+e);
}}}},__cq:function(l){var m=[];
for(var i=0;i<l.length;i++){var name=l[i];
if(qx.lang.String.endsWith(name,bE)){var n=name.substring(name.indexOf(bH)+1,name.indexOf(bE));
if(name.indexOf(bE)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(n!==bG){if(n==bI||isNaN(parseInt(n))){throw new Error("No number or 'last' value hast been given"+" in a array binding: "+name+" does not work.");
}}if(name.indexOf(bH)!=0){l[i]=name.substring(0,name.indexOf(bH));
m[i]=bI;
m[i+1]=n;
l.splice(i+1,0,bX);
i++;
}else{m[i]=n;
l.splice(i,1,bX);
}}else{m[i]=bI;
}}return m;
},__cr:function(cI,cJ,cK,cL,cM,cN){var cO;
{};
var cQ=function(da,e){if(da!==bI){if(da===bG){da=cI.length-1;
}var dd=cI.getItem(da);
if(dd==undefined){qx.data.SingleValueBinding.__cm(cK,cL);
}var db=e.getData().start;
var dc=e.getData().end;

if(da<db||da>dc){return;
}}else{var dd=e.getData();
}if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Binding executed from "+cI+" by "+cJ+" to "+cK+" ("+cL+")");
qx.log.Logger.debug("Data before conversion: "+dd);
}dd=qx.data.SingleValueBinding.__ct(dd,cK,cL,cM);
if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Data after conversion: "+dd);
}try{if(dd!=undefined){qx.data.SingleValueBinding.__cn(cK,cL,dd);
}else{qx.data.SingleValueBinding.__cm(cK,cL);
}if(cM&&cM.onUpdate){cM.onUpdate(cI,cK,dd);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(cM&&cM.onSetFail){cM.onSetFail(e);
}else{this.warn("Failed so set value "+dd+" on "+cK+". Error message: "+e);
}}};
if(!cN){cN=bI;
}cQ=qx.lang.Function.bind(cQ,cI,cN);
var cP=cI.addListener(cJ,cQ);
return cP;
},__cs:function(ba,bb,bc,bd,be){if(this.__ch[bb.toHashCode()]===undefined){this.__ch[bb.toHashCode()]=[];
}this.__ch[bb.toHashCode()].push([ba,bb,bc,bd,be]);
},__ct:function(p,q,r,s){if(s&&s.converter){var u;

if(q.getModel){u=q.getModel();
}return s.converter(p,u);
}else{var w=this.__co(q,r);
var x=r.substring(r.lastIndexOf(bD)+1,r.length);
if(w==null){return p;
}var v=qx.Class.getPropertyDefinition(w.constructor,x);
var t=v==null?bI:v.check;
return this.__cv(p,t);
}},__cu:function(cx,cy){var cz=qx.Class.getPropertyDefinition(cx.constructor,cy);

if(cz==null){return null;
}return cz.event;
},__cv:function(y,z){var A=qx.lang.Type.getClass(y);
if((A==bC||A==bB)&&(z==bR||z==bL)){y=parseInt(y);
}if((A==bU||A==bC||A==bK)&&z==bB){y=y+bI;
}if((A==bC||A==bB)&&(z==bC||z==bN)){y=parseFloat(y);
}return y;
},removeBindingFromObject:function(g,h){if(h.type==bY){for(var i=0;i<h.sources.length;i++){if(h.sources[i]){h.sources[i].removeListenerById(h.listenerIds[i]);
}}for(var i=0;i<h.targets.length;i++){if(h.targets[i]){h.targets[i].removeListenerById(h.targetListenerIds[i]);
}}}else{g.removeListenerById(h);
}var k=this.__ch[g.toHashCode()];
if(k!=undefined){for(var i=0;i<k.length;i++){if(k[i][0]==h){qx.lang.Array.remove(k,k[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(cX){{};
var cY=this.__ch[cX.toHashCode()];

if(cY!=undefined){for(var i=cY.length-1;i>=0;i--){this.removeBindingFromObject(cX,cY[i][0]);
}}},getAllBindingsForObject:function(o){if(this.__ch[o.toHashCode()]===undefined){this.__ch[o.toHashCode()]=[];
}return this.__ch[o.toHashCode()];
},removeAllBindings:function(){for(var U in this.__ch){var T=qx.core.ObjectRegistry.fromHashCode(U);
if(T==null){delete this.__ch[U];
continue;
}this.removeAllBindingsForObject(T);
}this.__ch={};
},getAllBindings:function(){return this.__ch;
},showBindingInLog:function(bi,bj){var bl;
for(var i=0;i<this.__ch[bi.toHashCode()].length;i++){if(this.__ch[bi.toHashCode()][i][0]==bj){bl=this.__ch[bi.toHashCode()][i];
break;
}}
if(bl===undefined){var bk=bM;
}else{var bk=bO+bl[1]+bV+bl[2]+bS+bl[3]+bV+bl[4]+bT;
}qx.log.Logger.debug(bk);
},showAllBindingsInLog:function(){for(var cb in this.__ch){var ca=qx.core.ObjectRegistry.fromHashCode(cb);

for(var i=0;i<this.__ch[cb].length;i++){this.showBindingInLog(ca,this.__ch[cb][i][0]);
}}}}});
})();
(function(){var L="",K="g",J="0",I='\\$1',H="%",G='-',F="qx.lang.String",E=' ',D='\n',C="undefined";
qx.Class.define(F,{statics:{camelCase:function(c){return c.replace(/\-([a-z])/g,function(d,e){return e.toUpperCase();
});
},hyphenate:function(r){return r.replace(/[A-Z]/g,function(Q){return (G+Q.charAt(0).toLowerCase());
});
},capitalize:function(f){return f.replace(/\b[a-z]/g,function(O){return O.toUpperCase();
});
},clean:function(P){return this.trim(P.replace(/\s+/g,E));
},trimLeft:function(b){return b.replace(/^\s+/,L);
},trimRight:function(t){return t.replace(/\s+$/,L);
},trim:function(s){return s.replace(/^\s+|\s+$/g,L);
},startsWith:function(z,A){return z.indexOf(A)===0;
},endsWith:function(M,N){return M.substring(M.length-N.length,M.length)===N;
},repeat:function(u,v){return u.length>=0?new Array(v+1).join(u):L;
},pad:function(n,length,o){var p=length-n.length;

if(p>0){if(typeof o===C){o=J;
}return this.repeat(o,p)+n;
}else{return n;
}},firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(l,m){return l.indexOf(m)!=-1;
},format:function(w,x){var y=w;

for(var i=0;i<x.length;i++){y=y.replace(new RegExp(H+(i+1),K),x[i]);
}return y;
},escapeRegexpChars:function(q){return q.replace(/([.*+?^${}()|[\]\/\\])/g,I);
},toArray:function(a){return a.split(/\B|\b/g);
},stripTags:function(B){return B.replace(/<\/?[^>]+>/gi,L);
},stripScripts:function(g,h){var k=L;
var j=g.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){k+=arguments[1]+D;
return L;
});

if(h===true){qx.lang.Function.globalEval(k);
}return j;
}}});
})();
(function(){var d="qx.event.type.Data",c="qx.event.type.Event",b="qx.data.IListData";
qx.Interface.define(b,{events:{"change":d,"changeLength":c},members:{getItem:function(g){},setItem:function(e,f){},splice:function(h,i,j){},contains:function(a){},getLength:function(){},toArray:function(){}}});
})();
(function(){var a="qx.lang.Date";
qx.Class.define(a,{statics:{now:function(){return +new Date;
}}});
})();
(function(){var c="qx.globalErrorHandling",b="on",a="qx.event.GlobalError";
qx.Class.define(a,{statics:{setErrorHandler:function(k,l){this.__cw=k||null;
this.__cx=l||window;

if(qx.core.Setting.get(c)===b){if(k&&!window.onerror){window.onerror=qx.lang.Function.bind(this.__cy,this);
}
if(!k&&window.onerror){window.onerror=null;
}}},__cy:function(h,i,j){if(this.__cw){this.handleError(new qx.core.WindowError(h,i,j));
return true;
}},observeMethod:function(g){if(qx.core.Setting.get(c)===b){var self=this;
return function(){if(!self.__cw){return g.apply(this,arguments);
}
try{return g.apply(this,arguments);
}catch(e){self.handleError(new qx.core.GlobalError(e,arguments));
}};
}else{return g;
}},handleError:function(f){if(this.__cw){this.__cw.call(this.__cx,f);
}}},defer:function(d){qx.core.Setting.define(c,b);
d.setErrorHandler(null,null);
}});
})();
(function(){var b="",a="qx.core.WindowError";
qx.Class.define(a,{extend:Error,construct:function(c,d,e){Error.call(this,c);
this.__cz=c;
this.__cA=d||b;
this.__cB=e===undefined?-1:e;
},members:{__cz:null,__cA:null,__cB:null,toString:function(){return this.__cz;
},getUri:function(){return this.__cA;
},getLineNumber:function(){return this.__cB;
}}});
})();
(function(){var b="GlobalError: ",a="qx.core.GlobalError";
qx.Class.define(a,{extend:Error,construct:function(c,d){{};
this.__cC=b+(c&&c.message?c.message:c);
Error.call(this,this.__cC);
this.__cD=d;
this.__cE=c;
},members:{__cE:null,__cD:null,__cC:null,toString:function(){return this.__cC;
},getArguments:function(){return this.__cD;
},getSourceException:function(){return this.__cE;
}},destruct:function(){this.__cE=null;
this.__cD=null;
this.__cC=null;
}});
})();
(function(){var c=": ",b="qx.type.BaseError",a="";
qx.Class.define(b,{extend:Error,construct:function(d,e){Error.call(this,e);
this.__cF=d||a;
this.message=e||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__cF:null,message:null,getComment:function(){return this.__cF;
},toString:function(){return this.__cF+c+this.message;
}}});
})();
(function(){var a="qx.core.AssertionError";
qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);
this.__cG=qx.dev.StackTrace.getStackTrace();
},members:{__cG:null,getStackTrace:function(){return this.__cG;
}}});
})();
(function(){var k=":",j="qx.client",h="anonymous",g="...",f="qx.dev.StackTrace",e="",d="\n",c="/source/class/",b=".";
qx.Class.define(f,{statics:{getStackTrace:qx.core.Variant.select(j,{"gecko":function(){try{throw new Error();
}catch(E){var M=this.getStackTraceFromError(E);
qx.lang.Array.removeAt(M,0);
var K=this.getStackTraceFromCaller(arguments);
var I=K.length>M.length?K:M;

for(var i=0;i<Math.min(K.length,M.length);i++){var J=K[i];

if(J.indexOf(h)>=0){continue;
}var Q=J.split(k);

if(Q.length!=2){continue;
}var O=Q[0];
var H=Q[1];
var G=M[i];
var R=G.split(k);
var N=R[0];
var F=R[1];

if(qx.Class.getByName(N)){var L=N;
}else{L=O;
}var P=L+k;

if(H){P+=H+k;
}P+=F;
I[i]=P;
}return I;
}},"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},"opera":function(){var ba;

try{ba.bar();
}catch(a){var bb=this.getStackTraceFromError(a);
qx.lang.Array.removeAt(bb,0);
return bb;
}return [];
}}),getStackTraceFromCaller:qx.core.Variant.select(j,{"opera":function(bc){return [];
},"default":function(S){var X=[];
var W=qx.lang.Function.getCaller(S);
var T={};

while(W){var U=qx.lang.Function.getName(W);
X.push(U);

try{W=W.caller;
}catch(Y){break;
}
if(!W){break;
}var V=qx.core.ObjectRegistry.toHashCode(W);

if(T[V]){X.push(g);
break;
}T[V]=W;
}return X;
}}),getStackTraceFromError:qx.core.Variant.select(j,{"gecko":function(l){if(!l.stack){return [];
}var r=/@(.+):(\d+)$/gm;
var m;
var n=[];

while((m=r.exec(l.stack))!=null){var o=m[1];
var q=m[2];
var p=this.__cH(o);
n.push(p+k+q);
}return n;
},"webkit":function(D){if(D.sourceURL&&D.line){return [this.__cH(D.sourceURL)+k+D.line];
}else{return [];
}},"opera":function(w){if(w.message.indexOf("Backtrace:")<0){return [];
}var y=[];
var z=qx.lang.String.trim(w.message.split("Backtrace:")[1]);
var A=z.split(d);

for(var i=0;i<A.length;i++){var x=A[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(x&&x.length>=2){var C=x[1];
var B=this.__cH(x[2]);
y.push(B+k+C);
}}return y;
},"default":function(){return [];
}}),__cH:function(s){var v=c;
var t=s.indexOf(v);
var u=(t==-1)?s:s.substring(t+v.length).replace(/\//g,b).replace(/\.js$/,e);
return u;
}}});
})();
(function(){var a="qx.core.ValidationError";
qx.Class.define(a,{extend:qx.type.BaseError});
})();
(function(){var f="qx.lang.Type",e="Error",d="RegExp",c="Date",b="Number",a="Boolean";
qx.Class.define(f,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(i){return this.getClass(i)==d;
},isNumber:function(g){return (g!==null&&(this.getClass(g)==b||g instanceof Number));
},isBoolean:function(h){return (h!==null&&(this.getClass(h)==a||h instanceof Boolean));
},isDate:function(k){return (k!==null&&(this.getClass(k)==c||k instanceof Date));
},isError:function(j){return (j!==null&&(this.getClass(j)==e||j instanceof Error));
}}});
})();
(function(){var a="qx.event.IEventHandler";
qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:3},members:{canHandleEvent:function(e,f){},registerEvent:function(g,h,i){},unregisterEvent:function(b,c,d){}}});
})();
(function(){var b="qx.util.ObjectPool",a="Integer";
qx.Class.define(b,{extend:qx.core.Object,construct:function(n){arguments.callee.base.call(this);
this.__cI={};

if(n!=null){this.setSize(n);
}},properties:{size:{check:a,init:Infinity}},members:{__cI:null,getObject:function(f){if(this.$$disposed){return;
}
if(!f){throw new Error("Class needs to be defined!");
}var g=null;
var h=this.__cI[f.classname];

if(h){g=h.pop();
}
if(g){g.$$pooled=false;
}else{g=new f;
}return g;
},poolObject:function(c){if(!this.__cI){return;
}var d=c.classname;
var e=this.__cI[d];

if(c.$$pooled){throw new Error("Object is already pooled: "+c);
}
if(!e){this.__cI[d]=e=[];
}if(e.length>this.getSize()){if(c.destroy){c.destroy();
}else{c.dispose();
}return;
}c.$$pooled=true;
e.push(c);
}},destruct:function(){var m=this.__cI;
var j,k,i,l;

for(j in m){k=m[j];

for(i=0,l=k.length;i<l;i++){k[i].dispose();
}}delete this.__cI;
}});
})();
(function(){var b="singleton",a="qx.event.Pool";
qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){arguments.callee.base.call(this,30);
}});
})();
(function(){var a="qx.util.DisposeUtil";
qx.Class.define(a,{statics:{disposeFields:function(k,m){qx.Bootstrap.warn("Don't use 'disposeFields' - instead assign directly to 'null'");

for(var i=0,l=m.length;i<l;i++){var name=m[i];

if(k[name]==null||!k.hasOwnProperty(name)){continue;
}k[name]=null;
}},disposeObjects:function(n,o){var name;

for(var i=0,l=o.length;i<l;i++){name=o[i];

if(n[name]==null||!n.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(n[name].dispose){n[name].dispose();
}else{throw new Error("Has no disposable object under key: "+name+"!");
}}n[name]=null;
}},disposeArray:function(p,q){var s=p[q];

if(!s){return;
}if(qx.core.ObjectRegistry.inShutDown){p[q]=null;
return;
}try{var r;

for(var i=s.length-1;i>=0;i--){r=s[i];

if(r){r.dispose();
}}}catch(t){throw new Error("The array field: "+q+" of object: "+p+" has non disposable entries: "+t);
}s.length=0;
p[q]=null;
},disposeMap:function(e,f){var g=e[f];

if(!g){return;
}if(qx.core.ObjectRegistry.inShutDown){e[f]=null;
return;
}try{for(var h in g){if(g.hasOwnProperty(h)){g[h].dispose();
}}}catch(j){throw new Error("The map field: "+f+" of object: "+e+" has non disposable entries: "+j);
}e[f]=null;
},disposeTriggeredBy:function(b,c){var d=c.dispose;
c.dispose=function(){d.call(c);
b.dispose();
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
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(m){this._manager=m;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(b,event,c){return !event.getBubbles();
},dispatchEvent:function(d,event,e){var h,f;
{};
event.setEventPhase(qx.event.type.Event.AT_TARGET);
var j=this._manager.getListeners(d,e,false);

if(j){for(var i=0,l=j.length;i<l;i++){var g=j[i].context||d;
j[i].handler.call(g,event);
}}}},defer:function(k){qx.event.Registration.addDispatcher(k);
}});
})();
(function(){var a="qx.event.handler.Object";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(e,f){return qx.Class.supportsEvent(e.constructor,f);
},registerEvent:function(b,c,d){},unregisterEvent:function(h,i,j){}},defer:function(g){qx.event.Registration.addHandler(g);
}});
})();
(function(){var k="indexOf",j="lastIndexOf",h="slice",g="concat",f="join",e="toLocaleUpperCase",d="shift",c="substr",b="filter",a="unshift",I="match",H="quote",G="qx.lang.Generics",F="localeCompare",E="sort",D="some",C="charAt",B="split",A="substring",z="pop",t="toUpperCase",u="replace",q="push",r="charCodeAt",o="every",p="reverse",m="search",n="forEach",v="map",w="toLowerCase",y="splice",x="toLocaleLowerCase";
qx.Class.define(G,{statics:{__cJ:{"Array":[f,p,E,q,z,d,a,y,g,h,k,j,n,v,b,D,o],"String":[H,A,w,t,C,r,k,j,x,e,F,I,m,u,B,c,g,h]},__cK:function(O,P){return function(s){return O.prototype[P].apply(s,Array.prototype.slice.call(arguments,1));
};
},__cL:function(){var J=qx.lang.Generics.__cJ;

for(var N in J){var L=window[N];
var K=J[N];

for(var i=0,l=K.length;i<l;i++){var M=K[i];

if(!L[M]){L[M]=qx.lang.Generics.__cK(L,M);
}}}}},defer:function(Q){Q.__cL();
}});
})();
(function(){var c="qx.util.ValueManager",b="abstract";
qx.Class.define(c,{type:b,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this._dynamic={};
},members:{_dynamic:null,resolveDynamic:function(d){return this._dynamic[d];
},isDynamic:function(e){return !!this._dynamic[e];
},resolve:function(f){if(f&&this._dynamic[f]){return this._dynamic[f];
}return f;
},_setDynamic:function(a){this._dynamic=a;
},_getDynamic:function(){return this._dynamic;
}},destruct:function(){this._dynamic=null;
}});
})();
(function(){var j="/",i="0",h="qx/static",g="http://",f="https://",e="file://",d="qx.util.AliasManager",c="singleton",b=".",a="static";
qx.Class.define(d,{type:c,extend:qx.util.ValueManager,construct:function(){arguments.callee.base.call(this);
this.__cM={};
this.add(a,h);
},members:{__cM:null,_preprocess:function(l){var o=this._getDynamic();

if(o[l]===false){return l;
}else if(o[l]===undefined){if(l.charAt(0)===j||l.charAt(0)===b||l.indexOf(g)===0||l.indexOf(f)===i||l.indexOf(e)===0){o[l]=false;
return l;
}
if(this.__cM[l]){return this.__cM[l];
}var n=l.substring(0,l.indexOf(j));
var m=this.__cM[n];

if(m!==undefined){o[l]=m+l.substring(n.length);
}}return l;
},add:function(p,q){this.__cM[p]=q;
var s=this._getDynamic();
for(var r in s){if(r.substring(0,r.indexOf(j))===p){s[r]=q+r.substring(p.length);
}}},remove:function(k){delete this.__cM[k];
},resolve:function(t){var u=this._getDynamic();

if(t!==null){t=this._preprocess(t);
}return u[t]||t;
}},destruct:function(){this.__cM=null;
}});
})();
(function(){var n="px",m="qx.client",l="div",k="img",j="",i="no-repeat",h="scale-x",g="mshtml",f="scale",d="scale-y",I="qx/icon",H="repeat",G=".png",F="crop",E="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",D='<div style="',C="repeat-y",B='<img src="',A="qx.bom.element.Decoration",z="', sizingMethod='",u="png",v="')",s='"></div>',t='"/>',q='" style="',r="none",o="webkit",p=" ",w="repeat-x",x="DXImageTransform.Microsoft.AlphaImageLoader",y="absolute";
qx.Class.define(A,{statics:{DEBUG:false,__cN:{},__cO:qx.core.Variant.isSet(m,g),__cP:qx.core.Variant.select(m,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__cQ:{"scale-x":k,"scale-y":k,"scale":k,"repeat":l,"no-repeat":l,"repeat-x":l,"repeat-y":l},update:function(bM,bN,bO,bP){var bR=this.getTagName(bO,bN);

if(bR!=bM.tagName.toLowerCase()){throw new Error("Image modification not possible because elements could not be replaced at runtime anymore!");
}var bS=this.getAttributes(bN,bO,bP);

if(bR===k){bM.src=bS.src;
}if(bM.style.backgroundPosition!=j&&bS.style.backgroundPosition===undefined){bS.style.backgroundPosition=null;
}if(bM.style.clip!=j&&bS.style.clip===undefined){bS.style.clip=null;
}var bQ=qx.bom.element.Style;
bQ.setStyles(bM,bS.style);
if(this.__cO){try{bM.filters[x].apply();
}catch(e){}}},create:function(S,T,U){var V=this.getTagName(T,S);
var X=this.getAttributes(S,T,U);
var W=qx.bom.element.Style.compile(X.style);

if(V===k){return B+X.src+q+W+t;
}else{return D+W+s;
}},getTagName:function(bK,bL){if(qx.core.Variant.isSet(m,g)){if(bL&&this.__cO&&this.__cP[bK]&&qx.lang.String.endsWith(bL,G)){return l;
}}return this.__cQ[bK];
},getAttributes:function(J,K,L){if(!L){L={};
}
if(!L.position){L.position=y;
}
if(qx.core.Variant.isSet(m,g)){L.fontSize=0;
L.lineHeight=0;
}else if(qx.core.Variant.isSet(m,o)){L.WebkitUserDrag=r;
}var N=qx.util.ResourceManager.getInstance().getImageFormat(J)||qx.io.ImageLoader.getFormat(J);
{};
var M;
if(this.__cO&&this.__cP[K]&&N===u){M=this.__cT(L,K,J);
}else{if(K===f){M=this.__cU(L,K,J);
}else if(K===h||K===d){M=this.__cV(L,K,J);
}else{M=this.__cY(L,K,J);
}}return M;
},__cR:function(ba,bb,bc){if(ba.width==null&&bb!=null){ba.width=bb+n;
}
if(ba.height==null&&bc!=null){ba.height=bc+n;
}return ba;
},__cS:function(a){var b=qx.util.ResourceManager.getInstance().getImageWidth(a)||qx.io.ImageLoader.getWidth(a);
var c=qx.util.ResourceManager.getInstance().getImageHeight(a)||qx.io.ImageLoader.getHeight(a);
return {width:b,height:c};
},__cT:function(bT,bU,bV){var bY=this.__cS(bV);
bT=this.__cR(bT,bY.width,bY.height);
var bX=bU==i?F:f;
var bW=E+qx.util.ResourceManager.getInstance().toUri(bV)+z+bX+v;
bT.filter=bW;
bT.backgroundImage=bT.backgroundRepeat=j;
return {style:bT};
},__cU:function(bq,br,bs){var bt=qx.util.ResourceManager.getInstance().toUri(bs);
var bu=this.__cS(bs);
bq=this.__cR(bq,bu.width,bu.height);
return {src:bt,style:bq};
},__cV:function(bi,bj,bk){var bo=qx.util.ResourceManager.getInstance();
var bn=bo.isClippedImage(bk);
var bp=this.__cS(bk);

if(bn){var bm=bo.getData(bk);
var bl=bo.toUri(bm[4]);

if(bj===h){bi=this.__cW(bi,bm,bp.height);
}else{bi=this.__cX(bi,bm,bp.width);
}return {src:bl,style:bi};
}else{{};

if(bj==h){bi.height=bp.height==null?null:bp.height+n;
}else if(bj==d){bi.width=bp.width==null?null:bp.width+n;
}var bl=bo.toUri(bk);
return {src:bl,style:bi};
}},__cW:function(bd,be,bf){var bh=qx.util.ResourceManager.getInstance().getImageHeight(be[4]);
bd.clip={top:-be[6],height:bf};
bd.height=bh+n;
if(bd.top!=null){bd.top=(parseInt(bd.top,10)+be[6])+n;
}else if(bd.bottom!=null){bd.bottom=(parseInt(bd.bottom,10)+bf-bh-be[6])+n;
}return bd;
},__cX:function(O,P,Q){var R=qx.util.ResourceManager.getInstance().getImageWidth(P[4]);
O.clip={left:-P[5],width:Q};
O.width=R+n;
if(O.left!=null){O.left=(parseInt(O.left,10)+P[5])+n;
}else if(O.right!=null){O.right=(parseInt(O.right,10)+Q-R-P[5])+n;
}return O;
},__cY:function(bC,bD,bE){var bJ=qx.util.ResourceManager.getInstance().isClippedImage(bE);
var bI=this.__cS(bE);
if(bJ&&bD!==H){var bH=qx.util.ResourceManager.getInstance().getData(bE);
var bG=qx.bom.element.Background.getStyles(bH[4],bD,bH[5],bH[6]);

for(var bF in bG){bC[bF]=bG[bF];
}
if(bI.width!=null&&bC.width==null&&(bD==C||bD===i)){bC.width=bI.width+n;
}
if(bI.height!=null&&bC.height==null&&(bD==w||bD===i)){bC.height=bI.height+n;
}return {style:bC};
}else{{};
bC=this.__cR(bC,bI.width,bI.height);
bC=this.__da(bC,bE,bD);
return {style:bC};
}},__da:function(bv,bw,bx){var top=null;
var bB=null;

if(bv.backgroundPosition){var by=bv.backgroundPosition.split(p);
bB=parseInt(by[0]);

if(isNaN(bB)){bB=by[0];
}top=parseInt(by[1]);

if(isNaN(top)){top=by[1];
}}var bA=qx.bom.element.Background.getStyles(bw,bx,bB,top);

for(var bz in bA){bv[bz]=bA[bz];
}if(bv.filter){bv.filter=j;
}return bv;
},__db:function(Y){if(this.DEBUG&&qx.util.ResourceManager.getInstance().has(Y)&&Y.indexOf(I)==-1){if(!this.__cN[Y]){qx.log.Logger.debug("Potential clipped image candidate: "+Y);
this.__cN[Y]=true;
}}},isAlphaImageLoaderEnabled:qx.core.Variant.select(m,{"mshtml":function(){return qx.bom.element.Decoration.__cO;
},"default":function(){return false;
}})}});
})();
(function(){var t="auto",s="px",r=",",q="clip:auto;",p="rect(",o=");",n="",m=")",l="qx.bom.element.Clip",k="string",h="rect(auto)",j="clip:rect(",i="clip",g="rect(auto,auto,auto,auto)";
qx.Class.define(l,{statics:{compile:function(a){if(!a){return q;
}var f=a.left;
var top=a.top;
var e=a.width;
var d=a.height;
var b,c;

if(f==null){b=(e==null?t:e+s);
f=t;
}else{b=(e==null?t:f+e+s);
f=f+s;
}
if(top==null){c=(d==null?t:d+s);
top=t;
}else{c=(d==null?t:top+d+s);
top=top+s;
}return j+top+r+b+r+c+r+f+o;
},get:function(B,C){var E=qx.bom.element.Style.get(B,i,C,false);
var J,top,H,G;
var D,F;

if(typeof E===k&&E!==t&&E!==n){E=qx.lang.String.trim(E);
if(/\((.*)\)/.test(E)){var I=RegExp.$1.split(r);
top=qx.lang.String.trim(I[0]);
D=qx.lang.String.trim(I[1]);
F=qx.lang.String.trim(I[2]);
J=qx.lang.String.trim(I[3]);
if(J===t){J=null;
}
if(top===t){top=null;
}
if(D===t){D=null;
}
if(F===t){F=null;
}if(top!=null){top=parseInt(top,10);
}
if(D!=null){D=parseInt(D,10);
}
if(F!=null){F=parseInt(F,10);
}
if(J!=null){J=parseInt(J,10);
}if(D!=null&&J!=null){H=D-J;
}else if(D!=null){H=D;
}
if(F!=null&&top!=null){G=F-top;
}else if(F!=null){G=F;
}}else{throw new Error("Could not parse clip string: "+E);
}}return {left:J||null,top:top||null,width:H||null,height:G||null};
},set:function(u,v){if(!v){u.style.clip=g;
return;
}var A=v.left;
var top=v.top;
var z=v.width;
var y=v.height;
var w,x;

if(A==null){w=(z==null?t:z+s);
A=t;
}else{w=(z==null?t:A+z+s);
A=A+s;
}
if(top==null){x=(y==null?t:y+s);
top=t;
}else{x=(y==null?t:top+y+s);
top=top+s;
}u.style.clip=p+top+r+w+r+x+r+A+m;
},reset:function(K){K.style.clip=qx.bom.client.Engine.MSHTML?h:t;
}}});
})();
(function(){var k="n-resize",j="e-resize",i="nw-resize",h="ne-resize",g="",f="cursor:",e="qx.client",d=";",c="qx.bom.element.Cursor",b="cursor",a="hand";
qx.Class.define(c,{statics:{__dc:qx.core.Variant.select(e,{"mshtml":{"cursor":a,"ew-resize":j,"ns-resize":k,"nesw-resize":h,"nwse-resize":i},"opera":{"col-resize":j,"row-resize":k,"ew-resize":j,"ns-resize":k,"nesw-resize":h,"nwse-resize":i},"default":{}}),compile:function(p){return f+(this.__dc[p]||p)+d;
},get:function(l,m){return qx.bom.element.Style.get(l,b,m,false);
},set:function(n,o){n.style.cursor=this.__dc[o]||o;
},reset:function(q){q.style.cursor=g;
}}});
})();
(function(){var p="",o="qx.client",n=";",m="filter",l="opacity:",k="opacity",j="MozOpacity",i=");",h=")",g="zoom:1;filter:alpha(opacity=",d="qx.bom.element.Opacity",f="alpha(opacity=",e="-moz-opacity:";
qx.Class.define(d,{statics:{compile:qx.core.Variant.select(o,{"mshtml":function(I){if(I>=1){return p;
}
if(I<0.00001){I=0;
}return g+(I*100)+i;
},"gecko":function(w){if(w==1){w=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){return e+w+n;
}else{return l+w+n;
}},"default":function(K){if(K==1){return p;
}return l+K+n;
}}),set:qx.core.Variant.select(o,{"mshtml":function(F,G){var H=qx.bom.element.Style.get(F,m,qx.bom.element.Style.COMPUTED_MODE,false);
if(G>=1){F.style.filter=H.replace(/alpha\([^\)]*\)/gi,p);
return;
}
if(G<0.00001){G=0;
}if(!F.currentStyle||!F.currentStyle.hasLayout){F.style.zoom=1;
}F.style.filter=H.replace(/alpha\([^\)]*\)/gi,p)+f+G*100+h;
},"gecko":function(B,C){if(C==1){C=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){B.style.MozOpacity=C;
}else{B.style.opacity=C;
}},"default":function(D,E){if(E==1){E=p;
}D.style.opacity=E;
}}),reset:qx.core.Variant.select(o,{"mshtml":function(t){var u=qx.bom.element.Style.get(t,m,qx.bom.element.Style.COMPUTED_MODE,false);
t.style.filter=u.replace(/alpha\([^\)]*\)/gi,p);
},"gecko":function(J){if(qx.bom.client.Engine.VERSION<1.7){J.style.MozOpacity=p;
}else{J.style.opacity=p;
}},"default":function(v){v.style.opacity=p;
}}),get:qx.core.Variant.select(o,{"mshtml":function(x,y){var z=qx.bom.element.Style.get(x,m,y,false);

if(z){var A=z.match(/alpha\(opacity=(.*)\)/);

if(A&&A[1]){return parseFloat(A[1])/100;
}}return 1.0;
},"gecko":function(a,b){var c=qx.bom.element.Style.get(a,qx.bom.client.Engine.VERSION<1.7?j:k,b,false);

if(c==0.999999){c=1.0;
}
if(c!=null){return parseFloat(c);
}return 1.0;
},"default":function(q,r){var s=qx.bom.element.Style.get(q,k,r,false);

if(s!=null){return parseFloat(s);
}return 1.0;
}})}});
})();
(function(){var q="qx.client",p="",o="boxSizing",n="box-sizing",m=":",k="border-box",j="qx.bom.element.BoxSizing",h="KhtmlBoxSizing",g="-moz-box-sizing",f="WebkitBoxSizing",c=";",e="-khtml-box-sizing",d="content-box",b="-webkit-box-sizing",a="MozBoxSizing";
qx.Class.define(j,{statics:{__dd:qx.core.Variant.select(q,{"mshtml":null,"webkit":[o,h,f],"gecko":[a],"opera":[o]}),__de:qx.core.Variant.select(q,{"mshtml":null,"webkit":[n,e,b],"gecko":[g],"opera":[n]}),__df:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__dg:function(D){var E=this.__df;
return E.tags[D.tagName.toLowerCase()]||E.types[D.type];
},compile:qx.core.Variant.select(q,{"mshtml":function(C){{};
},"default":function(u){var w=this.__de;
var v=p;

if(w){for(var i=0,l=w.length;i<l;i++){v+=w[i]+m+u+c;
}}return v;
}}),get:qx.core.Variant.select(q,{"mshtml":function(y){if(qx.bom.Document.isStandardMode(qx.dom.Node.getDocument(y))){if(!this.__dg(y)){return d;
}}return k;
},"default":function(r){var t=this.__dd;
var s;

if(t){for(var i=0,l=t.length;i<l;i++){s=qx.bom.element.Style.get(r,t[i],null,false);

if(s!=null&&s!==p){return s;
}}}return p;
}}),set:qx.core.Variant.select(q,{"mshtml":function(F,G){{};
},"default":function(z,A){var B=this.__dd;

if(B){for(var i=0,l=B.length;i<l;i++){z.style[B[i]]=A;
}}}}),reset:function(x){this.set(x,p);
}}});
})();
(function(){var r="",q="qx.client",p="hidden",o="-moz-scrollbars-none",n="overflow",m=";",l="overflowY",k=":",j="overflowX",i="overflow:",F="none",E="scroll",D="borderLeftStyle",C="borderRightStyle",B="div",A="borderRightWidth",z="overflow-y",y="borderLeftWidth",x="-moz-scrollbars-vertical",w="100px",u="qx.bom.element.Overflow",v="overflow-x";
qx.Class.define(u,{statics:{__dh:null,getScrollbarWidth:function(){if(this.__dh!==null){return this.__dh;
}var bL=qx.bom.element.Style;
var bN=function(Q,R){return parseInt(bL.get(Q,R))||0;
};
var bO=function(bI){return (bL.get(bI,C)==F?0:bN(bI,A));
};
var bM=function(bi){return (bL.get(bi,D)==F?0:bN(bi,y));
};
var bQ=qx.core.Variant.select(q,{"mshtml":function(bJ){if(bL.get(bJ,l)==p||bJ.clientWidth==0){return bO(bJ);
}return Math.max(0,bJ.offsetWidth-bJ.clientLeft-bJ.clientWidth);
},"default":function(bd){if(bd.clientWidth==0){var be=bL.get(bd,n);
var bf=(be==E||be==x?16:0);
return Math.max(0,bO(bd)+bf);
}return Math.max(0,(bd.offsetWidth-bd.clientWidth-bM(bd)));
}});
var bP=function(bs){return bQ(bs)-bO(bs);
};
var t=document.createElement(B);
var s=t.style;
s.height=s.width=w;
s.overflow=E;
document.body.appendChild(t);
var c=bP(t);
this.__dh=c?c:16;
document.body.removeChild(t);
return this.__dh;
},_compile:qx.core.Variant.select(q,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bR,bS){if(bS==p){bS=o;
}return i+bS+m;
}:
function(ce,cf){return ce+k+cf+m;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bX,bY){return i+bY+m;
}:
function(cc,cd){return cc+k+cd+m;
},"default":function(N,O){return N+k+O+m;
}}),compileX:function(P){return this._compile(v,P);
},compileY:function(ca){return this._compile(z,ca);
},getX:qx.core.Variant.select(q,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(S,T){var U=qx.bom.element.Style.get(S,n,T,false);

if(U===o){U=p;
}return U;
}:
function(bg,bh){return qx.bom.element.Style.get(bg,j,bh,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(I,J){return qx.bom.element.Style.get(I,n,J,false);
}:
function(Y,ba){return qx.bom.element.Style.get(Y,j,ba,false);
},"default":function(bw,bx){return qx.bom.element.Style.get(bw,j,bx,false);
}}),setX:qx.core.Variant.select(q,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bE,bF){if(bF==p){bF=o;
}bE.style.overflow=bF;
}:
function(bG,bH){bG.style.overflowX=bH;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(g,h){g.style.overflow=h;
}:
function(bl,bm){bl.style.overflowX=bm;
},"default":function(by,bz){by.style.overflowX=bz;
}}),resetX:qx.core.Variant.select(q,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(cb){cb.style.overflow=r;
}:
function(bK){bK.style.overflowX=r;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bb,bc){bb.style.overflow=r;
}:
function(bo,bp){bo.style.overflowX=r;
},"default":function(bt){bt.style.overflowX=r;
}}),getY:qx.core.Variant.select(q,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(V,W){var X=qx.bom.element.Style.get(V,n,W,false);

if(X===o){X=p;
}return X;
}:
function(G,H){return qx.bom.element.Style.get(G,l,H,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bq,br){return qx.bom.element.Style.get(bq,n,br,false);
}:
function(b,d){return qx.bom.element.Style.get(b,l,d,false);
},"default":function(e,f){return qx.bom.element.Style.get(e,l,f,false);
}}),setY:qx.core.Variant.select(q,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bV,bW){if(bW===p){bW=o;
}bV.style.overflow=bW;
}:
function(L,M){L.style.overflowY=M;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bu,bv){bu.style.overflow=bv;
}:
function(bj,bk){bj.style.overflowY=bk;
},"default":function(bC,bD){bC.style.overflowY=bD;
}}),resetY:qx.core.Variant.select(q,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(K){K.style.overflow=r;
}:
function(a){a.style.overflowY=r;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bT,bU){bT.style.overflow=r;
}:
function(bA,bB){bA.style.overflowY=r;
},"default":function(bn){bn.style.overflowY=r;
}})}});
})();
(function(){var j="",i="qx.client",h="user-select",g="userSelect",f="appearance",e="style",d="MozUserModify",c="px",b="-webkit-appearance",a="styleFloat",F="-webkit-user-select",E="-moz-appearance",D="pixelHeight",C="MozAppearance",B=":",A="pixelTop",z="pixelLeft",y="text-overflow",x="-moz-user-select",w="MozUserSelect",q="qx.bom.element.Style",r="-moz-user-modify",o="-webkit-user-modify",p="WebkitUserSelect",m="-o-text-overflow",n="pixelRight",k="cssFloat",l="pixelWidth",s="pixelBottom",t=";",v="WebkitUserModify",u="WebkitAppearance";
qx.Class.define(q,{statics:{__di:{styleNames:{"float":qx.core.Variant.select(i,{"mshtml":a,"default":k}),"appearance":qx.core.Variant.select(i,{"gecko":C,"webkit":u,"default":f}),"userSelect":qx.core.Variant.select(i,{"gecko":w,"webkit":p,"default":g}),"userModify":qx.core.Variant.select(i,{"gecko":d,"webkit":v,"default":g})},cssNames:{"appearance":qx.core.Variant.select(i,{"gecko":E,"webkit":b,"default":f}),"userSelect":qx.core.Variant.select(i,{"gecko":x,"webkit":F,"default":h}),"userModify":qx.core.Variant.select(i,{"gecko":r,"webkit":o,"default":h}),"textOverflow":qx.core.Variant.select(i,{"opera":m,"default":y})},mshtmlPixel:{width:l,height:D,left:z,right:n,top:A,bottom:s},special:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing,overflowX:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setX,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getX,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetX,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileX,qx.bom.element.Overflow)},overflowY:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setY,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getY,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetY,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileY,qx.bom.element.Overflow)}}},__dj:{},compile:function(bc){var bg=[];
var bk=this.__di;
var bj=bk.special;
var bh=bk.cssNames;
var bf=this.__dj;
var bi=qx.lang.String;
var name,be,bd;

for(name in bc){bd=bc[name];

if(bd==null){continue;
}name=bh[name]||name;
if(bj[name]){bg.push(bj[name].compile(bd));
}else{be=bf[name];

if(!be){be=bf[name]=bi.hyphenate(name);
}bg.push(be,B,bd,t);
}}return bg.join(j);
},setCss:qx.core.Variant.select(i,{"mshtml":function(by,bz){by.style.cssText=bz;
},"default":function(bl,bm){bl.setAttribute(e,bm);
}}),getCss:qx.core.Variant.select(i,{"mshtml":function(bn){return bn.style.cssText.toLowerCase();
},"default":function(S){return S.getAttribute(e);
}}),COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(bo,name,bp,bq){{};
var br=this.__di;
name=br.styleNames[name]||name;
if(bq!==false&&br.special[name]){return br.special[name].set(bo,bp);
}else{bo.style[name]=bp!==null?bp:j;
}},setStyles:function(J,K,L){{};
var R=this.__di;
var O=R.styleNames;
var Q=R.special;
var M=J.style;

for(var P in K){var N=K[P];
var name=O[P]||P;

if(N===undefined){if(L!==false&&Q[name]){Q[name].reset(J);
}else{M[name]=j;
}}else{if(L!==false&&Q[name]){Q[name].set(J,N);
}else{M[name]=N!==null?N:j;
}}}},reset:function(G,name,H){var I=this.__di;
name=I.styleNames[name]||name;
if(H!==false&&I.special[name]){return I.special[name].reset(G);
}else{G.style[name]=j;
}},get:qx.core.Variant.select(i,{"mshtml":function(T,name,U,V){var bb=this.__di;
name=bb.styleNames[name]||name;
if(V!==false&&bb.special[name]){return bb.special[name].get(T,U);
}if(!T.currentStyle){return T.style[name]||j;
}switch(U){case this.LOCAL_MODE:return T.style[name]||j;
case this.CASCADED_MODE:return T.currentStyle[name]||j;
default:var ba=T.currentStyle[name]||j;
if(/^-?[\.\d]+(px)?$/i.test(ba)){return ba;
}var Y=bb.mshtmlPixel[name];

if(Y){var W=T.style[name];
T.style[name]=ba||0;
var X=T.style[Y]+c;
T.style[name]=W;
return X;
}if(/^-?[\.\d]+(em|pt|%)?$/i.test(ba)){throw new Error("Untranslated computed property value: "+name+". Only pixel values work well across different clients.");
}return ba;
}},"default":function(bs,name,bt,bu){var bx=this.__di;
name=bx.styleNames[name]||name;
if(bu!==false&&bx.special[name]){return bx.special[name].get(bs,bt);
}switch(bt){case this.LOCAL_MODE:return bs.style[name]||j;
case this.CASCADED_MODE:if(bs.currentStyle){return bs.currentStyle[name]||j;
}throw new Error("Cascaded styles are not supported in this browser!");
default:var bv=qx.dom.Node.getDocument(bs);
var bw=bv.defaultView.getComputedStyle(bs,null);
return bw?bw[name]:j;
}}})}});
})();
(function(){var f="CSS1Compat",e="position:absolute;width:0;height:0;width:1",d="qx.bom.Document",c="1px",b="qx.client",a="div";
qx.Class.define(d,{statics:{isQuirksMode:qx.core.Variant.select(b,{"mshtml":function(k){if(qx.bom.client.Engine.VERSION>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return (k||window).document.compatMode!==f;
}},"webkit":function(p){if(document.compatMode===undefined){var q=(p||window).document.createElement(a);
q.style.cssText=e;
return q.style.width===c?true:false;
}else{return (p||window).document.compatMode!==f;
}},"default":function(g){return (g||window).document.compatMode!==f;
}}),isStandardMode:function(o){return !this.isQuirksMode(o);
},getWidth:function(l){var m=(l||window).document;
var n=qx.bom.Viewport.getWidth(l);
var scroll=this.isStandardMode(l)?m.documentElement.scrollWidth:m.body.scrollWidth;
return Math.max(scroll,n);
},getHeight:function(h){var i=(h||window).document;
var j=qx.bom.Viewport.getHeight(h);
var scroll=this.isStandardMode(h)?i.documentElement.scrollHeight:i.body.scrollHeight;
return Math.max(scroll,j);
}}});
})();
(function(){var b="qx.client",a="qx.bom.Viewport";
qx.Class.define(a,{statics:{getWidth:qx.core.Variant.select(b,{"opera":function(q){if(qx.bom.client.Engine.VERSION<9.5){return (q||window).document.body.clientWidth;
}else{var r=(q||window).document;
return qx.bom.Document.isStandardMode(q)?r.documentElement.clientWidth:r.body.clientWidth;
}},"webkit":function(s){if(qx.bom.client.Engine.VERSION<523.15){return (s||window).innerWidth;
}else{var t=(s||window).document;
return qx.bom.Document.isStandardMode(s)?t.documentElement.clientWidth:t.body.clientWidth;
}},"default":function(o){var p=(o||window).document;
return qx.bom.Document.isStandardMode(o)?p.documentElement.clientWidth:p.body.clientWidth;
}}),getHeight:qx.core.Variant.select(b,{"opera":function(e){if(qx.bom.client.Engine.VERSION<9.5){return (e||window).document.body.clientHeight;
}else{var f=(e||window).document;
return qx.bom.Document.isStandardMode(e)?f.documentElement.clientHeight:f.body.clientHeight;
}},"webkit":function(i){if(qx.bom.client.Engine.VERSION<523.15){return (i||window).innerHeight;
}else{var j=(i||window).document;
return qx.bom.Document.isStandardMode(i)?j.documentElement.clientHeight:j.body.clientHeight;
}},"default":function(m){var n=(m||window).document;
return qx.bom.Document.isStandardMode(m)?n.documentElement.clientHeight:n.body.clientHeight;
}}),getScrollLeft:qx.core.Variant.select(b,{"mshtml":function(c){var d=(c||window).document;
return d.documentElement.scrollLeft||d.body.scrollLeft;
},"default":function(g){return (g||window).pageXOffset;
}}),getScrollTop:qx.core.Variant.select(b,{"mshtml":function(k){var l=(k||window).document;
return l.documentElement.scrollTop||l.body.scrollTop;
},"default":function(h){return (h||window).pageYOffset;
}})}});
})();
(function(){var h="/",g="mshtml",f="",e="qx.client",d="?",c="string",b="qx.util.ResourceManager",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,statics:{__dk:qx.$$resources||{},__dl:{}},members:{has:function(n){return !!arguments.callee.self.__dk[n];
},getData:function(m){return arguments.callee.self.__dk[m]||null;
},getImageWidth:function(y){var z=arguments.callee.self.__dk[y];
return z?z[0]:null;
},getImageHeight:function(q){var r=arguments.callee.self.__dk[q];
return r?r[1]:null;
},getImageFormat:function(A){var B=arguments.callee.self.__dk[A];
return B?B[2]:null;
},isClippedImage:function(o){var p=arguments.callee.self.__dk[o];
return p&&p.length>4;
},toUri:function(i){if(i==null){return i;
}var j=arguments.callee.self.__dk[i];

if(!j){return i;
}
if(typeof j===c){var l=j;
}else{var l=j[3];
if(!l){return i;
}}var k=f;

if(qx.core.Variant.isSet(e,g)&&qx.bom.client.Feature.SSL){k=arguments.callee.self.__dl[l];
}return k+qx.$$libraries[l].resourceUri+h+i;
}},defer:function(s){if(qx.core.Variant.isSet(e,g)){if(qx.bom.client.Feature.SSL){for(var w in qx.$$libraries){var u;

if(qx.$$libraries[w].resourceUri){u=qx.$$libraries[w].resourceUri;
}else{s.__dl[w]=f;
continue;
}if(u.match(/^\/\//)!=null){s.__dl[w]=window.location.protocol;
}else if(u.match(/^\.\//)!=null){var t=document.URL;
s.__dl[w]=t.substring(0,t.lastIndexOf(h)+1);
}else if(u.match(/^http/)!=null){}else{var x=window.location.href.indexOf(d);
var v;

if(x==-1){v=window.location.href;
}else{v=window.location.href.substring(0,x);
}s.__dl[w]=v.substring(0,v.lastIndexOf(h)+1);
}}}}}});
})();
(function(){var e="qx.client",d="load",c="qx.io.ImageLoader";
qx.Bootstrap.define(c,{statics:{__dm:{},__dn:{width:null,height:null},__do:/\.(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(E){var F=this.__dm[E];
return !!(F&&F.loaded);
},isFailed:function(q){var r=this.__dm[q];
return !!(r&&r.failed);
},isLoading:function(y){var z=this.__dm[y];
return !!(z&&z.loading);
},getFormat:function(o){var p=this.__dm[o];
return p?p.format:null;
},getSize:function(f){var g=this.__dm[f];
return g?
{width:g.width,height:g.height}:this.__dn;
},getWidth:function(C){var D=this.__dm[C];
return D?D.width:null;
},getHeight:function(a){var b=this.__dm[a];
return b?b.height:null;
},load:function(s,t,u){var v=this.__dm[s];

if(!v){v=this.__dm[s]={};
}if(t&&!u){u=window;
}if(v.loaded||v.loading||v.failed){if(t){if(v.loading){v.callbacks.push(t,u);
}else{t.call(u,s,v);
}}}else{v.loading=true;
v.callbacks=[];

if(t){v.callbacks.push(t,u);
}var x=new Image();
var w=qx.lang.Function.listener(this.__dp,this,x,s);
x.onload=w;
x.onerror=w;
x.src=s;
}},__dp:qx.event.GlobalError.observeMethod(function(event,h,j){var k=this.__dm[j];
if(event.type===d){k.loaded=true;
k.width=this.__dq(h);
k.height=this.__dr(h);
var m=this.__do.exec(j);

if(m!=null){k.format=m[1];
}}else{k.failed=true;
}h.onload=h.onerror=null;
var n=k.callbacks;
delete k.loading;
delete k.callbacks;
for(var i=0,l=n.length;i<l;i+=2){n[i].call(n[i+1],j,k);
}}),__dq:qx.core.Variant.select(e,{"gecko":function(G){return G.naturalWidth;
},"default":function(B){return B.width;
}}),__dr:qx.core.Variant.select(e,{"gecko":function(H){return H.naturalHeight;
},"default":function(A){return A.height;
}})}});
})();
(function(){var m="number",l="0",k="px",j=";",i="background-image:url(",h=");",g="",f=")",e="background-repeat:",d=" ",a="qx.bom.element.Background",c="url(",b="background-position:";
qx.Class.define(a,{statics:{__ds:[i,null,h,b,null,j,e,null,j],__dt:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__du:function(n,top){var o=qx.bom.client.Engine;

if(o.GECKO&&o.VERSION<1.9&&n==top&&typeof n==m){top+=0.01;
}
if(n){var p=(typeof n==m)?n+k:n;
}else{p=l;
}
if(top){var q=(typeof top==m)?top+k:top;
}else{q=l;
}return p+d+q;
},compile:function(D,E,F,top){var G=this.__du(F,top);
var H=qx.util.ResourceManager.getInstance().toUri(D);
var I=this.__ds;
I[1]=H;
I[4]=G;
I[7]=E;
return I.join(g);
},getStyles:function(x,y,z,top){if(!x){return this.__dt;
}var A=this.__du(z,top);
var B=qx.util.ResourceManager.getInstance().toUri(x);
var C={backgroundPosition:A,backgroundImage:c+B+f};

if(y!=null){C.backgroundRepeat=y;
}return C;
},set:function(r,s,t,u,top){var v=this.getStyles(s,t,u,top);

for(var w in v){r.style[w]=v[w];
}}}});
})();
(function(){var f="_applyTheme",e="qx.theme.manager.Color",d="Theme",c="changeTheme",b="string",a="singleton";
qx.Class.define(e,{type:a,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:f,event:c}},members:{_applyTheme:function(k){var l={};

if(k){var m=k.colors;
var n=qx.util.ColorUtil;
var o;

for(var p in m){o=m[p];

if(typeof o===b){if(!n.isCssString(o)){throw new Error("Could not parse color: "+o);
}}else if(o instanceof Array){o=n.rgbToRgbString(o);
}else{throw new Error("Could not parse color: "+o);
}l[p]=o;
}}this._setDynamic(l);
},resolve:function(g){var j=this._dynamic;
var h=j[g];

if(h){return h;
}var i=this.getTheme();

if(i!==null&&i.colors[g]){return j[g]=i.colors[g];
}return g;
},isDynamic:function(q){var s=this._dynamic;

if(q&&(s[q]!==undefined)){return true;
}var r=this.getTheme();

if(r!==null&&q&&(r.colors[q]!==undefined)){s[q]=r.colors[q];
return true;
}return false;
}}});
})();
(function(){var be=",",bd="rgb(",bc=")",bb="qx.theme.manager.Color",ba="qx.util.ColorUtil";
qx.Class.define(ba,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(G){return this.NAMED[G]!==undefined;
},isSystemColor:function(w){return this.SYSTEM[w]!==undefined;
},supportsThemes:function(){return qx.Class.isDefined(bb);
},isThemedColor:function(Y){if(!this.supportsThemes()){return false;
}return qx.theme.manager.Color.getInstance().isDynamic(Y);
},stringToRgb:function(T){if(this.supportsThemes()&&this.isThemedColor(T)){var T=qx.theme.manager.Color.getInstance().resolveDynamic(T);
}
if(this.isNamedColor(T)){return this.NAMED[T];
}else if(this.isSystemColor(T)){throw new Error("Could not convert system colors to RGB: "+T);
}else if(this.isRgbString(T)){return this.__dv();
}else if(this.isHex3String(T)){return this.__dx();
}else if(this.isHex6String(T)){return this.__dy();
}throw new Error("Could not parse color: "+T);
},cssStringToRgb:function(I){if(this.isNamedColor(I)){return this.NAMED[I];
}else if(this.isSystemColor(I)){throw new Error("Could not convert system colors to RGB: "+I);
}else if(this.isRgbString(I)){return this.__dv();
}else if(this.isRgbaString(I)){return this.__dw();
}else if(this.isHex3String(I)){return this.__dx();
}else if(this.isHex6String(I)){return this.__dy();
}throw new Error("Could not parse color: "+I);
},stringToRgbString:function(z){return this.rgbToRgbString(this.stringToRgb(z));
},rgbToRgbString:function(x){return bd+x[0]+be+x[1]+be+x[2]+bc;
},rgbToHexString:function(H){return (qx.lang.String.pad(H[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(H[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(H[2].toString(16).toUpperCase(),2));
},isValidPropertyValue:function(W){return this.isThemedColor(W)||this.isNamedColor(W)||this.isHex3String(W)||this.isHex6String(W)||this.isRgbString(W);
},isCssString:function(P){return this.isSystemColor(P)||this.isNamedColor(P)||this.isHex3String(P)||this.isHex6String(P)||this.isRgbString(P);
},isHex3String:function(y){return this.REGEXP.hex3.test(y);
},isHex6String:function(U){return this.REGEXP.hex6.test(U);
},isRgbString:function(V){return this.REGEXP.rgb.test(V);
},isRgbaString:function(u){return this.REGEXP.rgba.test(u);
},__dv:function(){var bh=parseInt(RegExp.$1,10);
var bg=parseInt(RegExp.$2,10);
var bf=parseInt(RegExp.$3,10);
return [bh,bg,bf];
},__dw:function(){var F=parseInt(RegExp.$1,10);
var E=parseInt(RegExp.$2,10);
var D=parseInt(RegExp.$3,10);
return [F,E,D];
},__dx:function(){var S=parseInt(RegExp.$1,16)*17;
var R=parseInt(RegExp.$2,16)*17;
var Q=parseInt(RegExp.$3,16)*17;
return [S,R,Q];
},__dy:function(){var C=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);
var B=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);
var A=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);
return [C,B,A];
},hex3StringToRgb:function(X){if(this.isHex3String(X)){return this.__dx(X);
}throw new Error("Invalid hex3 value: "+X);
},hex6StringToRgb:function(v){if(this.isHex6String(v)){return this.__dy(v);
}throw new Error("Invalid hex6 value: "+v);
},hexStringToRgb:function(bi){if(this.isHex3String(bi)){return this.__dx(bi);
}
if(this.isHex6String(bi)){return this.__dy(bi);
}throw new Error("Invalid hex value: "+bi);
},rgbToHsb:function(a){var d,e,j;
var s=a[0];
var m=a[1];
var c=a[2];
var o=(s>m)?s:m;

if(c>o){o=c;
}var h=(s<m)?s:m;

if(c<h){h=c;
}j=o/255.0;

if(o!=0){e=(o-h)/o;
}else{e=0;
}
if(e==0){d=0;
}else{var l=(o-s)/(o-h);
var n=(o-m)/(o-h);
var k=(o-c)/(o-h);

if(s==o){d=k-n;
}else if(m==o){d=2.0+l-k;
}else{d=4.0+n-l;
}d=d/6.0;

if(d<0){d=d+1.0;
}}return [Math.round(d*360),Math.round(e*100),Math.round(j*100)];
},hsbToRgb:function(J){var i,f,p,q,t;
var K=J[0]/360;
var L=J[1]/100;
var M=J[2]/100;

if(K>=1.0){K%=1.0;
}
if(L>1.0){L=1.0;
}
if(M>1.0){M=1.0;
}var N=Math.floor(255*M);
var O={};

if(L==0.0){O.red=O.green=O.blue=N;
}else{K*=6.0;
i=Math.floor(K);
f=K-i;
p=Math.floor(N*(1.0-L));
q=Math.floor(N*(1.0-(L*f)));
t=Math.floor(N*(1.0-(L*(1.0-f))));

switch(i){case 0:O.red=N;
O.green=t;
O.blue=p;
break;
case 1:O.red=q;
O.green=N;
O.blue=p;
break;
case 2:O.red=p;
O.green=N;
O.blue=t;
break;
case 3:O.red=p;
O.green=q;
O.blue=N;
break;
case 4:O.red=t;
O.green=p;
O.blue=N;
break;
case 5:O.red=N;
O.green=p;
O.blue=q;
break;
}}return [O.red,O.green,O.blue];
},randomColor:function(){var r=Math.round(Math.random()*255);
var g=Math.round(Math.random()*255);
var b=Math.round(Math.random()*255);
return this.rgbToRgbString([r,g,b]);
}}});
})();
(function(){var m="ready",l="qx.client",k="mshtml",j="load",i="unload",h="qx.event.handler.Application",g="complete",f="gecko|opera|webkit",d="left",c="DOMContentLoaded",b="shutdown";
qx.Class.define(h,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(y){arguments.callee.base.call(this);
this._window=y.getWindow();
this.__dz=false;
this.__dA=false;
this._initObserver();
qx.event.handler.Application.$$instance=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,__dB:false,onScriptLoaded:function(){this.__dB=true;
var z=qx.event.handler.Application.$$instance;

if(z){z.__dE();
}}},members:{canHandleEvent:function(u,v){},registerEvent:function(o,p,q){},unregisterEvent:function(r,s,t){},__dC:null,__dz:null,__dA:null,__dD:null,__dE:function(){var x=qx.event.handler.Application;
if(!this.__dC&&this.__dz&&x.__dB){if(qx.core.Variant.isSet(l,k)){if(qx.event.Registration.hasListener(this._window,m)){this.__dC=true;
qx.event.Registration.fireEvent(this._window,m);
}}else{this.__dC=true;
qx.event.Registration.fireEvent(this._window,m);
}}},isApplicationReady:function(){return this.__dC;
},_initObserver:function(){if(qx.$$domReady||document.readyState==g){this.__dz=true;
this.__dE();
}else{this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);

if(qx.core.Variant.isSet(l,f)){qx.bom.Event.addNativeListener(this._window,c,this._onNativeLoadWrapped);
}else if(qx.core.Variant.isSet(l,k)){var self=this;
var a=function(){try{document.documentElement.doScroll(d);

if(document.body){self._onNativeLoadWrapped();
}}catch(n){window.setTimeout(a,100);
}};
a();
}qx.bom.Event.addNativeListener(this._window,j,this._onNativeLoadWrapped);
}this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);
qx.bom.Event.addNativeListener(this._window,i,this._onNativeUnloadWrapped);
},_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,j,this._onNativeLoadWrapped);
}qx.bom.Event.removeNativeListener(this._window,i,this._onNativeUnloadWrapped);
this._onNativeLoadWrapped=null;
this._onNativeUnloadWrapped=null;
},_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__dz=true;
this.__dE();
}),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__dD){this.__dD=true;

try{qx.event.Registration.fireEvent(this._window,b);
}catch(e){throw e;
}finally{qx.core.ObjectRegistry.shutdown();
}}})},destruct:function(){this._stopObserver();
this._window=null;
},defer:function(w){qx.event.Registration.addHandler(w);
}});
})();
(function(){var a="qx.event.handler.Window";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){arguments.callee.base.call(this);
this._manager=d;
this._window=d.getWindow();
this._initWindowObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(q,r){},registerEvent:function(f,g,h){},unregisterEvent:function(s,t,u){},_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);
var o=qx.event.handler.Window.SUPPORTED_TYPES;

for(var n in o){qx.bom.Event.addNativeListener(this._window,n,this._onNativeWrapper);
}},_stopWindowObserver:function(){var c=qx.event.handler.Window.SUPPORTED_TYPES;

for(var b in c){qx.bom.Event.removeNativeListener(this._window,b,this._onNativeWrapper);
}},_onNative:qx.event.GlobalError.observeMethod(function(e){if(this.isDisposed()){return;
}var j=this._window;

try{var m=j.document;
}catch(e){return ;
}var k=m.documentElement;
var i=e.target||e.srcElement;

if(i==null||i===j||i===m||i===k){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,j]);
qx.event.Registration.dispatchEvent(j,event);
var l=event.getReturnValue();

if(l!=null){e.returnValue=l;
return l;
}}})},destruct:function(){this._stopWindowObserver();
this._manager=this._window=null;
},defer:function(p){qx.event.Registration.addHandler(p);
}});
})();
(function(){var f="ready",d="qx.application",c="beforeunload",b="qx.core.Init",a="shutdown";
qx.Class.define(b,{statics:{getApplication:function(){return this.__dG||null;
},__dF:function(){if(qx.bom.client.Engine.UNKNOWN_ENGINE){qx.log.Logger.warn("Could not detect engine!");
}
if(qx.bom.client.Engine.UNKNOWN_VERSION){qx.log.Logger.warn("Could not detect the version of the engine!");
}
if(qx.bom.client.Platform.UNKNOWN_PLATFORM){qx.log.Logger.warn("Could not detect platform!");
}
if(qx.bom.client.System.UNKNOWN_SYSTEM){qx.log.Logger.warn("Could not detect system!");
}qx.log.Logger.debug(this,"Load runtime: "+(new Date-qx.Bootstrap.LOADSTART)+"ms");
var j=qx.core.Setting.get(d);
var k=qx.Class.getByName(j);

if(k){this.__dG=new k;
var i=new Date;
this.__dG.main();
qx.log.Logger.debug(this,"Main runtime: "+(new Date-i)+"ms");
var i=new Date;
this.__dG.finalize();
qx.log.Logger.debug(this,"Finalize runtime: "+(new Date-i)+"ms");
}else{qx.log.Logger.warn("Missing application class: "+j);
}},__dH:function(e){var g=this.__dG;

if(g){e.setReturnValue(g.close());
}},__dI:function(){var l=this.__dG;

if(l){l.terminate();
}}},defer:function(h){qx.event.Registration.addListener(window,f,h.__dF,h);
qx.event.Registration.addListener(window,a,h.__dI,h);
qx.event.Registration.addListener(window,c,h.__dH,h);
}});
})();
(function(){var a="qx.application.IApplication";
qx.Interface.define(a,{members:{main:function(){},finalize:function(){},close:function(){},terminate:function(){}}});
})();
(function(){var f="qx.locale.MTranslation";
qx.Mixin.define(f,{members:{tr:function(k,l){var m=qx.locale.Manager;

if(m){return m.tr.apply(m,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trn:function(a,b,c,d){var e=qx.locale.Manager;

if(e){return e.trn.apply(e,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trc:function(g,h,i){var j=qx.locale.Manager;

if(j){return j.trc.apply(j,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},marktr:function(n){var o=qx.locale.Manager;

if(o){return o.marktr.apply(o,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
}}});
})();
(function(){var b="abstract",a="qx.application.AbstractGui";
qx.Class.define(a,{type:b,extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,members:{__dJ:null,_createRootWidget:function(){throw new Error("Abstract method call");
},getRoot:function(){return this.__dJ;
},main:function(){qx.theme.manager.Meta.getInstance().initialize();
qx.ui.tooltip.Manager.getInstance();
this.__dJ=this._createRootWidget();
},finalize:function(){this.render();
},render:function(){qx.ui.core.queue.Manager.flush();
},close:function(c){},terminate:function(){}},destruct:function(){this.__dJ=null;
}});
})();
(function(){var a="qx.application.Standalone";
qx.Class.define(a,{extend:qx.application.AbstractGui,members:{_createRootWidget:function(){return new qx.ui.root.Application(document);
}}});
})();
(function(){var u="95%",t="",s="main",r="left",q="execute",p="Just a label widget",o="resize",n="I forgot my password",m="horizontal",l="keypress",d="accordion.demo.Application",k="more complex sample",h="appear",c="<b>Password</b>",b="Login",g="just a label",f="Accordion Demo",i="I am empty",a='Enter',j="<b>User</b>";
qx.Class.define(d,{extend:qx.application.Standalone,members:{main:function(){arguments.callee.base.call(this);
{};
var H=new qx.ui.layout.VBox();
var F=new qx.ui.window.Window(f).set({layout:H,showStatusbar:true,allowClose:false,allowMinimize:false,allowShrinkY:true,contentPadding:0});
var G=new qx.ui.splitpane.Pane(m);
G.setDecorator(s);
F.add(G);
var I=new qx.ui.container.Composite(new qx.ui.layout.Grow()).set({decorator:s,allowShrinkY:true});
G.add(I,1);
var L=new qx.ui.container.Composite(new qx.ui.layout.Grow()).set({decorator:s});
G.add(L,2);
this._navi=new accordion.Accordion(F);
this._navi.clearArray();
this._navi.addBtn(1,g);
var M=new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({decorator:s,allowShrinkY:true});
var J=new qx.ui.basic.Label(p);
M.add(J);
this._navi.addObject(1,M,1);
this._navi.addBtn(2,k);
var K=this.__dK(t,t);
this._navi.addObject(2,K,1);
this._navi.addBtn(3,i,1);
I.add(this._navi);
this._navi.updateAccordion();
this.getRoot().add(F);
F.moveTo(30,10);
F.setMinHeight(200);
F.setMinWidth(400);
F.open();
F.addListener(o,function(e){this._navi.updateAccordion();
},this);
},__dK:function(v,w){var x=new qx.ui.layout.Canvas();
var A=new qx.ui.groupbox.GroupBox(t);
A.setLayout(x);
var E=new qx.ui.basic.Label();
E.set({value:this.tr(j),tabIndex:1,rich:true,textAlign:r});
A.add(E,{left:3,top:0,width:u});
var y=new qx.ui.form.TextField(t);
y.set({tabIndex:101});
y.addListener(h,function(e){this.selectAllText();
},y);
A.add(y,{left:3,top:16,width:u});
var B=new qx.ui.basic.Label();
B.set({value:this.tr(c),tabIndex:1,rich:true,textAlign:r});
A.add(B,{left:3,top:40,width:u});
var z=new qx.ui.form.PasswordField(t);
z.set({tabIndex:101});
A.add(z,{left:3,top:56,width:u});
var D=new qx.ui.form.Button(this.tr(b));
D.set({tabIndex:103});
D.addListener(q,function(e){alert("Logging in...");
},this);
A.add(D,{left:3,top:85,width:u});
var C=new qx.ui.form.Button(this.tr(n));
C.set({tabIndex:104});
C.addListener(q,function(e){alert("forgot password");
},this);
A.add(C,{left:3,top:115,width:u});
A.addListener(l,function(e){if(e.getKeyIdentifier()==a){alert("enter pressed");
}},this);
return A;
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
},clone:function(j){var k=arguments.callee.base.call(this,j);
var l={};
k._native=this._cloneNativeEvent(this._native,l);
k._returnValue=this._returnValue;
return k;
},_cloneNativeEvent:function(h,i){i.preventDefault=qx.lang.Function.empty;
return i;
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
(function(){var g="object",f="_applyTheme",e="__dL",d="qx.theme.manager.Decoration",c="Theme",b="string",a="singleton";
qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:c,nullable:true,apply:f}},members:{__dL:null,resolve:function(p){if(!p){return null;
}
if(typeof p===g){return p;
}var s=this.getTheme();

if(!s){return null;
}var s=this.getTheme();

if(!s){return null;
}var t=this.__dL;

if(!t){t=this.__dL={};
}var q=t[p];

if(q){return q;
}var r=s.decorations[p];

if(!r){return null;
}var u=r.decorator;

if(u==null){throw new Error("Missing definition of which decorator to use in entry: "+p+"!");
}return t[p]=(new u).set(r.style);
},isValidPropertyValue:function(h){if(typeof h===b){return this.isDynamic(h);
}else if(typeof h===g){var i=h.constructor;
return qx.Class.hasInterface(i,qx.ui.decoration.IDecorator);
}return false;
},isDynamic:function(j){if(!j){return false;
}var k=this.getTheme();

if(!k){return false;
}return !!k.decorations[j];
},_applyTheme:function(l,m){var o=qx.util.AliasManager.getInstance();

if(m){for(var n in m.aliases){o.remove(n);
}}
if(l){for(var n in l.aliases){o.add(n,l.aliases[n]);
}}
if(!l){this.__dL={};
}}},destruct:function(){this._disposeMap(e);
}});
})();
(function(){var e="qx.theme.manager.Font",d="Theme",c="changeTheme",b="_applyTheme",a="singleton";
qx.Class.define(e,{type:a,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:b,event:c}},members:{resolveDynamic:function(r){var s=this._dynamic;
return r instanceof qx.bom.Font?r:s[r];
},resolve:function(f){var i=this._dynamic;
var g=i[f];

if(g){return g;
}var h=this.getTheme();

if(h!==null&&h.fonts[f]){return i[f]=(new qx.bom.Font).set(h.fonts[f]);
}return f;
},isDynamic:function(j){var l=this._dynamic;

if(j&&(j instanceof qx.bom.Font||l[j]!==undefined)){return true;
}var k=this.getTheme();

if(k!==null&&j&&k.fonts[j]){l[j]=(new qx.bom.Font).set(k.fonts[j]);
return true;
}return false;
},_applyTheme:function(m){var n=this._getDynamic();

for(var q in n){if(n[q].themed){n[q].dispose();
delete n[q];
}}
if(m){var o=m.fonts;
var p=qx.bom.Font;

for(var q in o){n[q]=(new p).set(o[q]);
n[q].themed=true;
}}this._setDynamic(n);
}}});
})();
(function(){var k="",j="underline",h="Boolean",g="px",f='"',e="italic",d="normal",c="bold",b="_applyItalic",a="_applyBold",x="Integer",w="_applyFamily",v="_applyLineHeight",u="Array",t="overline",s="line-through",r="qx.bom.Font",q="Number",p="_applyDecoration",o=" ",m="_applySize",n=",";
qx.Class.define(r,{extend:qx.core.Object,construct:function(I,J){arguments.callee.base.call(this);

if(I!==undefined){this.setSize(I);
}
if(J!==undefined){this.setFamily(J);
}},statics:{fromString:function(D){var H=new qx.bom.Font();
var F=D.split(/\s+/);
var name=[];
var G;

for(var i=0;i<F.length;i++){switch(G=F[i]){case c:H.setBold(true);
break;
case e:H.setItalic(true);
break;
case j:H.setDecoration(j);
break;
default:var E=parseInt(G,10);

if(E==G||qx.lang.String.contains(G,g)){H.setSize(E);
}else{name.push(G);
}break;
}}
if(name.length>0){H.setFamily(name);
}return H;
},fromConfig:function(M){var N=new qx.bom.Font;
N.set(M);
return N;
},__dM:{fontFamily:k,fontSize:k,fontWeight:k,fontStyle:k,textDecoration:k,lineHeight:1.2},getDefaultStyles:function(){return this.__dM;
}},properties:{size:{check:x,nullable:true,apply:m},lineHeight:{check:q,nullable:true,apply:v},family:{check:u,nullable:true,apply:w},bold:{check:h,nullable:true,apply:a},italic:{check:h,nullable:true,apply:b},decoration:{check:[j,s,t],nullable:true,apply:p}},members:{__dN:null,__dO:null,__dP:null,__dQ:null,__dR:null,__dS:null,_applySize:function(Q,R){this.__dN=Q===null?null:Q+g;
},_applyLineHeight:function(S,T){this.__dS=S===null?null:S;
},_applyFamily:function(y,z){var A=k;

for(var i=0,l=y.length;i<l;i++){if(y[i].indexOf(o)>0){A+=f+y[i]+f;
}else{A+=y[i];
}
if(i!==l-1){A+=n;
}}this.__dO=A;
},_applyBold:function(O,P){this.__dP=O===null?null:O?c:d;
},_applyItalic:function(K,L){this.__dQ=K===null?null:K?e:d;
},_applyDecoration:function(B,C){this.__dR=B===null?null:B;
},getStyles:function(){return {fontFamily:this.__dO,fontSize:this.__dN,fontWeight:this.__dP,fontStyle:this.__dQ,textDecoration:this.__dR,lineHeight:this.__dS};
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
this.__dT={};
this.__dU={};
},properties:{theme:{check:d,nullable:true,event:c,apply:g}},members:{__dV:{},__dT:null,__dU:null,_applyTheme:function(i,j){this.__dU={};
this.__dT={};
},__dW:function(k,l,m){var q=l.appearances;
var t=q[k];

if(!t){var u=b;
var n=[];
var s=k.split(u);
var r;

while(!t&&s.length>0){n.unshift(s.pop());
var o=s.join(u);
t=q[o];

if(t){r=t.alias||t;

if(typeof r===h){var p=r+u+n.join(u);
return this.__dW(p,l,m);
}}}if(m!=null){return this.__dW(m,l);
}return null;
}else if(typeof t===h){return this.__dW(t,l,m);
}else if(t.include&&!t.style){return this.__dW(t.include,l,m);
}return k;
},styleFrom:function(v,w,x,y){if(!x){x=this.getTheme();
}var E=this.__dU;
var z=E[v];

if(!z){z=E[v]=this.__dW(v,x,y);
}var J=x.appearances[z];

if(!J){this.warn("Missing appearance: "+v);
return null;
}if(!J.style){return null;
}var K=z;

if(w){var L=J.$$bits;

if(!L){L=J.$$bits={};
J.$$length=0;
}var C=0;

for(var F in w){if(!w[F]){continue;
}
if(L[F]==null){L[F]=1<<J.$$length++;
}C+=L[F];
}if(C>0){K+=e+C;
}}var D=this.__dT;

if(D[K]!==undefined){return D[K];
}if(!w){w=this.__dV;
}var H;
if(J.include||J.base){var B=J.style(w);
var A;

if(J.include){A=this.styleFrom(J.include,w,x,y);
}H={};
if(J.base){var G=this.styleFrom(z,w,J.base,y);

if(J.include){for(var I in G){if(!A.hasOwnProperty(I)&&!B.hasOwnProperty(I)){H[I]=G[I];
}}}else{for(var I in G){if(!B.hasOwnProperty(I)){H[I]=G[I];
}}}}if(J.include){for(var I in A){if(!B.hasOwnProperty(I)){H[I]=A[I];
}}}for(var I in B){H[I]=B[I];
}}else{H=J.style(w);
}return D[K]=H||null;
}},destruct:function(){this.__dT=this.__dU=null;
}});
})();
(function(){var p="focusout",o="interval",n="mouseover",m="mouseout",l="mousemove",k="widget",j="qx.ui.tooltip.ToolTip",i="Boolean",h="_applyCurrent",g="qx.ui.tooltip.Manager",c="__dY",f="__dX",d="tooltip-error",b="singleton",a="__eb";
qx.Class.define(g,{type:b,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
qx.event.Registration.addListener(document.body,n,this.__ei,this,true);
this.__dX=new qx.event.Timer();
this.__dX.addListener(o,this.__ef,this);
this.__dY=new qx.event.Timer();
this.__dY.addListener(o,this.__eg,this);
this.__ea={left:0,top:0};
},properties:{current:{check:j,nullable:true,apply:h},showInvalidTooltips:{check:i,init:true}},members:{__ea:null,__dY:null,__dX:null,__eb:null,__ec:null,__ed:function(){if(!this.__eb){this.__eb=new qx.ui.tooltip.ToolTip().set({rich:true});
}return this.__eb;
},__ee:function(){if(!this.__ec){this.__ec=new qx.ui.tooltip.ToolTip().set({appearance:d});
this.__ec.syncAppearance();
}return this.__ec;
},_applyCurrent:function(C,D){if(D&&qx.ui.core.Widget.contains(D,C)){return;
}if(D){if(!D.isDisposed()){D.exclude();
}this.__dX.stop();
this.__dY.stop();
}var F=qx.event.Registration;
var E=document.body;
if(C){this.__dX.startWith(C.getShowTimeout());
F.addListener(E,m,this.__ej,this,true);
F.addListener(E,p,this.__ek,this,true);
F.addListener(E,l,this.__eh,this,true);
}else{F.removeListener(E,m,this.__ej,this,true);
F.removeListener(E,p,this.__ek,this,true);
F.removeListener(E,l,this.__eh,this,true);
}},__ef:function(e){var y=this.getCurrent();

if(y&&!y.isDisposed()){this.__dY.startWith(y.getHideTimeout());

if(y.getPlaceMethod()==k){y.placeToWidget(y.getOpener());
}else{y.placeToPoint(this.__ea);
}y.show();
}this.__dX.stop();
},__eg:function(e){var z=this.getCurrent();

if(z&&!z.isDisposed()){z.exclude();
}this.__dY.stop();
this.resetCurrent();
},__eh:function(e){var G=this.__ea;
G.left=e.getDocumentLeft();
G.top=e.getDocumentTop();
},__ei:function(e){var v=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!v){return;
}var w;
while(v!=null){var w=v.getToolTip();
var x=v.getToolTipText()||null;
var u=v.getToolTipIcon()||null;

if(qx.Class.hasInterface(v.constructor,qx.ui.form.IForm)&&!v.isValid()){var t=v.getInvalidMessage();
}
if(w||x||u||t){break;
}v=v.getLayoutParent();
}
if(!v){return;
}
if(v.isBlockToolTip()){return;
}if(t&&v.getEnabled()){if(!this.getShowInvalidTooltips()){return;
}var w=this.__ee().set({label:t});
}else if(!w){var w=this.__ed().set({label:x,icon:u});
}this.setCurrent(w);
w.setOpener(v);
},__ej:function(e){var q=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!q){return;
}var r=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());

if(!r){return;
}var s=this.getCurrent();
if(s&&(r==s||qx.ui.core.Widget.contains(s,r))){return;
}if(r&&q&&qx.ui.core.Widget.contains(q,r)){return;
}if(s&&!r){this.setCurrent(null);
}else{this.resetCurrent();
}},__ek:function(e){var A=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!A){return;
}var B=this.getCurrent();
if(B&&B==A.getToolTip()){this.setCurrent(null);
}}},destruct:function(){qx.event.Registration.removeListener(document.body,n,this.__ei,this,true);
this._disposeObjects(f,c,a);
this.__ea=null;
}});
})();
(function(){var h="interval",g="qx.event.Timer",f="_applyInterval",d="_applyEnabled",c="Boolean",b="qx.event.type.Event",a="Integer";
qx.Class.define(g,{extend:qx.core.Object,construct:function(r){arguments.callee.base.call(this);
this.setEnabled(false);

if(r!=null){this.setInterval(r);
}var self=this;
this.__el=function(){self._oninterval.call(self);
};
},events:{"interval":b},statics:{once:function(i,j,k){var l=new qx.event.Timer(k);
l.addListener(h,function(e){l.stop();
i.call(j,e);
l.dispose();
j=null;
},j);
l.start();
return l;
}},properties:{enabled:{init:true,check:c,apply:d},interval:{check:a,init:1000,apply:f}},members:{__em:null,__el:null,_applyInterval:function(o,p){if(this.getEnabled()){this.restart();
}},_applyEnabled:function(m,n){if(n){window.clearInterval(this.__em);
this.__em=null;
}else if(m){this.__em=window.setInterval(this.__el,this.getInterval());
}},start:function(){this.setEnabled(true);
},startWith:function(s){this.setInterval(s);
this.start();
},stop:function(){this.setEnabled(false);
},restart:function(){this.stop();
this.start();
},restartWith:function(q){this.stop();
this.startWith(q);
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.$$disposed){return;
}
if(this.getEnabled()){this.fireEvent(h);
}})},destruct:function(){if(this.__em){window.clearInterval(this.__em);
}this.__em=this.__el=null;
}});
})();
(function(){var b="qx.ui.core.MChildrenHandling";
qx.Mixin.define(b,{members:{getChildren:function(){return this._getChildren();
},hasChildren:function(){return this._hasChildren();
},indexOf:function(p){return this._indexOf(p);
},add:function(n,o){this._add(n,o);
},addAt:function(d,e,f){this._addAt(d,e,f);
},addBefore:function(g,h,i){this._addBefore(g,h,i);
},addAfter:function(j,k,l){this._addAfter(j,k,l);
},remove:function(m){this._remove(m);
},removeAt:function(c){return this._removeAt(c);
},removeAll:function(){this._removeAll();
}},statics:{remap:function(a){a.getChildren=a._getChildren;
a.hasChildren=a._hasChildren;
a.indexOf=a._indexOf;
a.add=a._add;
a.addAt=a._addAt;
a.addBefore=a._addBefore;
a.addAfter=a._addAfter;
a.remove=a._remove;
a.removeAt=a._removeAt;
a.removeAll=a._removeAll;
}}});
})();
(function(){var a="qx.ui.core.MLayoutHandling";
qx.Mixin.define(a,{members:{setLayout:function(c){return this._setLayout(c);
},getLayout:function(){return this._getLayout();
}},statics:{remap:function(b){b.getLayout=b._getLayout;
b.setLayout=b._setLayout;
}}});
})();
(function(){var m="Integer",l="_applyDimension",k="Boolean",j="_applyStretching",i="_applyMargin",h="shorthand",g="_applyAlign",f="allowShrinkY",e="bottom",d="baseline",A="marginBottom",z="qx.ui.core.LayoutItem",y="center",x="marginTop",w="allowGrowX",v="middle",u="marginLeft",t="allowShrinkX",s="top",r="right",p="marginRight",q="abstract",n="allowGrowY",o="left";
qx.Class.define(z,{type:q,extend:qx.core.Object,properties:{minWidth:{check:m,nullable:true,apply:l,init:null,themeable:true},width:{check:m,nullable:true,apply:l,init:null,themeable:true},maxWidth:{check:m,nullable:true,apply:l,init:null,themeable:true},minHeight:{check:m,nullable:true,apply:l,init:null,themeable:true},height:{check:m,nullable:true,apply:l,init:null,themeable:true},maxHeight:{check:m,nullable:true,apply:l,init:null,themeable:true},allowGrowX:{check:k,apply:j,init:true,themeable:true},allowShrinkX:{check:k,apply:j,init:true,themeable:true},allowGrowY:{check:k,apply:j,init:true,themeable:true},allowShrinkY:{check:k,apply:j,init:true,themeable:true},allowStretchX:{group:[w,t],mode:h,themeable:true},allowStretchY:{group:[n,f],mode:h,themeable:true},marginTop:{check:m,init:0,apply:i,themeable:true},marginRight:{check:m,init:0,apply:i,themeable:true},marginBottom:{check:m,init:0,apply:i,themeable:true},marginLeft:{check:m,init:0,apply:i,themeable:true},margin:{group:[x,p,A,u],mode:h,themeable:true},alignX:{check:[o,y,r],nullable:true,apply:g,themeable:true},alignY:{check:[s,v,e,d],nullable:true,apply:g,themeable:true}},members:{__en:null,__eo:null,__ep:null,__eq:null,__er:null,__es:null,__et:null,getBounds:function(){return this.__es||this.__eo||null;
},clearSeparators:function(){},renderSeparator:function(L,M){},renderLayout:function(Q,top,R,S){var T;
{};
var U=null;

if(this.getHeight()==null&&this._hasHeightForWidth()){var U=this._getHeightForWidth(R);
}
if(U!=null&&U!==this.__en){this.__en=U;
qx.ui.core.queue.Layout.add(this);
return null;
}var W=this.__eo;

if(!W){W=this.__eo={};
}var V={};

if(Q!==W.left||top!==W.top){V.position=true;
W.left=Q;
W.top=top;
}
if(R!==W.width||S!==W.height){V.size=true;
W.width=R;
W.height=S;
}if(this.__ep){V.local=true;
delete this.__ep;
}
if(this.__er){V.margin=true;
delete this.__er;
}return V;
},isExcluded:function(){return false;
},hasValidLayout:function(){return !this.__ep;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutCache:function(){this.__ep=true;
this.__eq=null;
},getSizeHint:function(X){var Y=this.__eq;

if(Y){return Y;
}
if(X===false){return null;
}Y=this.__eq=this._computeSizeHint();
if(this._hasHeightForWidth()&&this.__en&&this.getHeight()==null){Y.height=this.__en;
}if(Y.minWidth>Y.width){Y.width=Y.minWidth;
}
if(Y.maxWidth<Y.width){Y.width=Y.maxWidth;
}
if(!this.getAllowGrowX()){Y.maxWidth=Y.width;
}
if(!this.getAllowShrinkX()){Y.minWidth=Y.width;
}if(Y.minHeight>Y.height){Y.height=Y.minHeight;
}
if(Y.maxHeight<Y.height){Y.height=Y.maxHeight;
}
if(!this.getAllowGrowY()){Y.maxHeight=Y.height;
}
if(!this.getAllowShrinkY()){Y.minHeight=Y.height;
}return Y;
},_computeSizeHint:function(){var F=this.getMinWidth()||0;
var C=this.getMinHeight()||0;
var G=this.getWidth()||F;
var E=this.getHeight()||C;
var B=this.getMaxWidth()||Infinity;
var D=this.getMaxHeight()||Infinity;
return {minWidth:F,width:G,maxWidth:B,minHeight:C,height:E,maxHeight:D};
},_hasHeightForWidth:function(){var ba=this._getLayout();

if(ba){return ba.hasHeightForWidth();
}return false;
},_getHeightForWidth:function(J){var K=this._getLayout();

if(K&&K.hasHeightForWidth()){return K.getHeightForWidth(J);
}return null;
},_getLayout:function(){return null;
},_applyMargin:function(){this.__er=true;
var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyAlign:function(){var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyDimension:function(){qx.ui.core.queue.Layout.add(this);
},_applyStretching:function(){qx.ui.core.queue.Layout.add(this);
},hasUserBounds:function(){return !!this.__es;
},setUserBounds:function(bb,top,bc,bd){this.__es={left:bb,top:top,width:bc,height:bd};
qx.ui.core.queue.Layout.add(this);
},resetUserBounds:function(){delete this.__es;
qx.ui.core.queue.Layout.add(this);
},__eu:{},setLayoutProperties:function(N){if(N==null){return;
}var O=this.__et;

if(!O){O=this.__et={};
}var parent=this.getLayoutParent();

if(parent){parent.updateLayoutProperties(N);
}for(var P in N){if(N[P]==null){delete O[P];
}else{O[P]=N[P];
}}},getLayoutProperties:function(){return this.__et||this.__eu;
},clearLayoutProperties:function(){delete this.__et;
},updateLayoutProperties:function(a){var b=this._getLayout();

if(b){var c;
{};
b.invalidateChildrenCache();
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
},clone:function(){var H=arguments.callee.base.call(this);
var I=this.__et;

if(I){H.__et=qx.lang.Object.clone(I);
}return H;
}},destruct:function(){this.$$parent=this.$$subparent=this.__et=this.__eo=this.__es=this.__eq=null;
}});
})();
(function(){var b="qx.ui.core.DecoratorFactory",a="$$nopool$$";
qx.Class.define(b,{extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__ev={};
},statics:{MAX_SIZE:15,__ew:a},members:{__ev:null,getDecoratorElement:function(l){var q=qx.ui.core.DecoratorFactory;

if(qx.lang.Type.isString(l)){var o=l;
var n=qx.theme.manager.Decoration.getInstance().resolve(l);
}else{var o=q.__ew;
n=l;
}var p=this.__ev;

if(p[o]&&p[o].length>0){var m=p[o].pop();
}else{var m=this._createDecoratorElement(n,o);
}m.$$pooled=false;
return m;
},poolDecorator:function(f){if(!f||f.$$pooled){return;
}var i=qx.ui.core.DecoratorFactory;
var g=f.getId();

if(g==i.__ew){f.dispose();
return;
}var h=this.__ev;

if(!h[g]){h[g]=[];
}
if(h[g].length>i.MAX_SIZE){f.dispose();
}else{f.$$pooled=true;
h[g].push(f);
}},_createDecoratorElement:function(c,d){var e=new qx.html.Decorator(c,d);
{};
return e;
},toString:function(){return arguments.callee.base.call(this);
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){var k=this.__ev;

for(var j in k){qx.util.DisposeUtil.disposeArray(k,j);
}}this.__ev=null;
}});
})();
(function(){var dI="px",dH="Boolean",dG="qx.event.type.Mouse",dF="qx.event.type.Drag",dE="visible",dD="qx.event.type.Focus",dC="on",dB="Integer",dA="excluded",dz="qx.event.type.Data",dk="_applyPadding",dj="qx.event.type.Event",di="hidden",dh="contextmenu",dg="String",df="tabIndex",de="backgroundColor",dd="focused",dc="changeVisibility",db="mshtml",dP="hovered",dQ="qx.event.type.KeySequence",dN="qx.client",dO="absolute",dL="drag",dM="div",dJ="disabled",dK="move",dR="dragstart",dS="qx.dynlocale",ds="dragchange",dr="dragend",du="resize",dt="Decorator",dw="zIndex",dv="$$widget",dy="opacity",dx="default",dq="Color",dp="changeToolTipText",bR="beforeContextmenuOpen",bS="__eK",bT="_applyNativeContextMenu",bU="__eC",bV="_applyBackgroundColor",bW="_applyFocusable",bX="changeShadow",bY="__eD",ca="qx.event.type.KeyInput",cb="createChildControl",dW="__eG",dV="__ey",dU="Font",dT="_applyShadow",eb="_applyEnabled",ea="_applySelectable",dY="Number",dX="_applyKeepActive",ed="_applyVisibility",ec="__eI",cA="repeat",cB="qxDraggable",cy="syncAppearance",cz="paddingLeft",cE="_applyDroppable",cF="__eB",cC="__ex",cD="#",cw="qx.event.type.MouseWheel",cx="_applyCursor",cj="_applyDraggable",ci="changeTextColor",cl="changeContextMenu",ck="paddingTop",cf="changeSelectable",ce="hideFocus",ch="none",cg="outline",cd="_applyAppearance",cc="_applyOpacity",cK="url(",cL=")",cM="qx.ui.core.Widget",cN="_applyFont",cG="cursor",cH="qxDroppable",cI="changeZIndex",cJ="changeEnabled",cO="changeFont",cP="_applyDecorator",ct="_applyZIndex",cs="_applyTextColor",cr="qx.ui.menu.Menu",cq="_applyToolTipText",cp="true",co="widget",cn="changeDecorator",cm="_applyTabIndex",cv="changeAppearance",cu="shorthand",cQ="/",cR="",cS="_applyContextMenu",cT="paddingBottom",cU="changeNativeContextMenu",cV="qx.ui.tooltip.ToolTip",cW="qxKeepActive",cX="_applyKeepFocus",cY="paddingRight",da="changeBackgroundColor",dn="changeLocale",dm="qxKeepFocus",dl="qx/static/blank.gif";
qx.Class.define(cM,{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){arguments.callee.base.call(this);
this.__ex=this._createContainerElement();
this.__ey=this.__eJ();
this.__ex.add(this.__ey);
this.initFocusable();
this.initSelectable();
this.initNativeContextMenu();
},events:{appear:dj,disappear:dj,createChildControl:dz,resize:dz,move:dz,syncAppearance:dz,mousemove:dG,mouseover:dG,mouseout:dG,mousedown:dG,mouseup:dG,click:dG,dblclick:dG,contextmenu:dG,beforeContextmenuOpen:dG,mousewheel:cw,keyup:dQ,keydown:dQ,keypress:dQ,keyinput:ca,focus:dD,blur:dD,focusin:dD,focusout:dD,activate:dD,deactivate:dD,capture:dj,losecapture:dj,drop:dF,dragleave:dF,dragover:dF,drag:dF,dragstart:dF,dragend:dF,dragchange:dF,droprequest:dF},properties:{paddingTop:{check:dB,init:0,apply:dk,themeable:true},paddingRight:{check:dB,init:0,apply:dk,themeable:true},paddingBottom:{check:dB,init:0,apply:dk,themeable:true},paddingLeft:{check:dB,init:0,apply:dk,themeable:true},padding:{group:[ck,cY,cT,cz],mode:cu,themeable:true},zIndex:{nullable:true,init:null,apply:ct,event:cI,check:dB,themeable:true},decorator:{nullable:true,init:null,apply:cP,event:cn,check:dt,themeable:true},shadow:{nullable:true,init:null,apply:dT,event:bX,check:dt,themeable:true},backgroundColor:{nullable:true,check:dq,apply:bV,event:da,themeable:true},textColor:{nullable:true,check:dq,apply:cs,event:ci,themeable:true,inheritable:true},font:{nullable:true,apply:cN,check:dU,event:cO,themeable:true,inheritable:true,dispose:true},opacity:{check:dY,apply:cc,themeable:true,nullable:true,init:null},cursor:{check:dg,apply:cx,themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:cV,nullable:true},toolTipText:{check:dg,nullable:true,event:dp,apply:cq},toolTipIcon:{check:dg,nullable:true,event:dp},blockToolTip:{check:dH,init:false},visibility:{check:[dE,di,dA],init:dE,apply:ed,event:dc},enabled:{init:true,check:dH,inheritable:true,apply:eb,event:cJ},anonymous:{init:false,check:dH},tabIndex:{check:dB,nullable:true,apply:cm},focusable:{check:dH,init:false,apply:bW},keepFocus:{check:dH,init:false,apply:cX},keepActive:{check:dH,init:false,apply:dX},draggable:{check:dH,init:false,apply:cj},droppable:{check:dH,init:false,apply:cE},selectable:{check:dH,init:false,event:cf,apply:ea},contextMenu:{check:cr,apply:cS,nullable:true,event:cl},nativeContextMenu:{check:dH,init:false,themeable:true,event:cU,apply:bT},appearance:{check:dg,init:co,apply:cd,event:cv}},statics:{DEBUG:false,getWidgetByElement:function(eD){while(eD){var eE=eD.$$widget;
if(eE!=null){return qx.core.ObjectRegistry.fromHashCode(eE);
}eD=eD.parentNode;
}return null;
},contains:function(parent,bN){while(bN){if(parent==bN){return true;
}bN=bN.getLayoutParent();
}return false;
},__ez:new qx.ui.core.DecoratorFactory(),__eA:new qx.ui.core.DecoratorFactory()},members:{__ex:null,__ey:null,__eB:null,__eC:null,__eD:null,__eE:null,__eF:null,__eG:null,_getLayout:function(){return this.__eG;
},_setLayout:function(fe){{};

if(this.__eG){this.__eG.connectToWidget(null);
}
if(fe){fe.connectToWidget(this);
}this.__eG=fe;
qx.ui.core.queue.Layout.add(this);
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}var fJ=this.getContainerElement();

if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(fJ);
}this.$$parent=parent||null;

if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(fJ);
}qx.core.Property.refresh(this);
qx.ui.core.queue.Visibility.add(this);
},_updateInsets:null,__eH:function(a,b){if(a==b){return false;
}
if(a==null||b==null){return true;
}var fl=qx.theme.manager.Decoration.getInstance();
var fn=fl.resolve(a).getInsets();
var fm=fl.resolve(b).getInsets();

if(fn.top!=fm.top||fn.right!=fm.right||fn.bottom!=fm.bottom||fn.left!=fm.left){return true;
}return false;
},renderLayout:function(gH,top,gI,gJ){var gS=arguments.callee.base.call(this,gH,top,gI,gJ);
if(!gS){return;
}var gL=this.getContainerElement();
var content=this.getContentElement();
var gP=gS.size||this._updateInsets;
var gT=dI;
var gQ={};
if(gS.position){gQ.left=gH+gT;
gQ.top=top+gT;
}if(gS.size){gQ.width=gI+gT;
gQ.height=gJ+gT;
}
if(gS.position||gS.size){gL.setStyles(gQ);
}
if(gP||gS.local||gS.margin){var gK=this.getInsets();
var innerWidth=gI-gK.left-gK.right;
var innerHeight=gJ-gK.top-gK.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}var gN={};

if(this._updateInsets){gN.left=gK.left+gT;
gN.top=gK.top+gT;
}
if(gP){gN.width=innerWidth+gT;
gN.height=innerHeight+gT;
}
if(gP||this._updateInsets){content.setStyles(gN);
}
if(gS.size){var gR=this.__eD;

if(gR){gR.setStyles({width:gI+dI,height:gJ+dI});
}}
if(gS.size||this._updateInsets){if(this.__eB){this.__eB.resize(gI,gJ);
}}
if(gS.size){if(this.__eC){var gK=this.__eC.getInsets();
var gO=gI+gK.left+gK.right;
var gM=gJ+gK.top+gK.bottom;
this.__eC.resize(gO,gM);
}}
if(gP||gS.local||gS.margin){if(this.__eG&&this.hasLayoutChildren()){this.__eG.renderLayout(innerWidth,innerHeight);
}else if(this.hasLayoutChildren()){throw new Error("At least one child in control "+this._findTopControl()+" requires a layout, but no one was defined!");
}}if(gS.position&&this.hasListener(dK)){this.fireDataEvent(dK,this.getBounds());
}
if(gS.size&&this.hasListener(du)){this.fireDataEvent(du,this.getBounds());
}delete this._updateInsets;
return gS;
},__eI:null,clearSeparators:function(){var bF=this.__eI;

if(!bF){return;
}var bG=qx.ui.core.Widget.__ez;
var content=this.getContentElement();
var bE;

for(var i=0,l=bF.length;i<l;i++){bE=bF[i];
bG.poolDecorator(bE);
content.remove(bE);
}bF.length=0;
},renderSeparator:function(fb,fc){var fd=qx.ui.core.Widget.__ez.getDecoratorElement(fb);
this.getContentElement().add(fd);
fd.resize(fc.width,fc.height);
fd.setStyles({left:fc.left+dI,top:fc.top+dI});
if(!this.__eI){this.__eI=[fd];
}else{this.__eI.push(fd);
}},_computeSizeHint:function(){var eO=this.getWidth();
var eN=this.getMinWidth();
var eJ=this.getMaxWidth();
var eM=this.getHeight();
var eK=this.getMinHeight();
var eL=this.getMaxHeight();
{};
var eP=this._getContentHint();
var eI=this.getInsets();
var eR=eI.left+eI.right;
var eQ=eI.top+eI.bottom;

if(eO==null){eO=eP.width+eR;
}
if(eM==null){eM=eP.height+eQ;
}
if(eN==null){eN=eR;

if(eP.minWidth!=null){eN+=eP.minWidth;
}}
if(eK==null){eK=eQ;

if(eP.minHeight!=null){eK+=eP.minHeight;
}}
if(eJ==null){if(eP.maxWidth==null){eJ=Infinity;
}else{eJ=eP.maxWidth+eR;
}}
if(eL==null){if(eP.maxHeight==null){eL=Infinity;
}else{eL=eP.maxHeight+eQ;
}}return {width:eO,minWidth:eN,maxWidth:eJ,height:eM,minHeight:eK,maxHeight:eL};
},invalidateLayoutCache:function(){arguments.callee.base.call(this);

if(this.__eG){this.__eG.invalidateLayoutCache();
}},_getContentHint:function(){var bh=this.__eG;

if(bh){if(this.hasLayoutChildren()){var bg;
var bi=bh.getSizeHint();
{};
return bi;
}else{return {width:0,height:0};
}}else{return {width:100,height:50};
}},_getHeightForWidth:function(bl){var bp=this.getInsets();
var bs=bp.left+bp.right;
var br=bp.top+bp.bottom;
var bq=bl-bs;
var bn=this._getLayout();

if(bn&&bn.hasHeightForWidth()){var bm=bn.getHeightForWidth(bl);
}else{bm=this._getContentHeightForWidth(bq);
}var bo=bm+br;
return bo;
},_getContentHeightForWidth:function(ew){throw new Error("Abstract method call: _getContentHeightForWidth()!");
},getInsets:function(){var top=this.getPaddingTop();
var n=this.getPaddingRight();
var p=this.getPaddingBottom();
var o=this.getPaddingLeft();

if(this.__eB){var m=this.__eB.getInsets();
{};
top+=m.top;
n+=m.right;
p+=m.bottom;
o+=m.left;
}return {"top":top,"right":n,"bottom":p,"left":o};
},getInnerSize:function(){var em=this.getBounds();

if(!em){return null;
}var ek=this.getInsets();
return {width:em.width-ek.left-ek.right,height:em.height-ek.top-ek.bottom};
},show:function(){this.setVisibility(dE);
},hide:function(){this.setVisibility(di);
},exclude:function(){this.setVisibility(dA);
},isVisible:function(){return this.getVisibility()===dE;
},isHidden:function(){return this.getVisibility()!==dE;
},isExcluded:function(){return this.getVisibility()===dA;
},isSeeable:function(){var fr=this.getContainerElement().getDomElement();

if(fr){return fr.offsetWidth>0;
}var fq=this;

do{if(!fq.isVisible()){return false;
}
if(fq.isRootWidget()){return true;
}fq=fq.getLayoutParent();
}while(fq);
return false;
},_createContainerElement:function(){var gi=new qx.html.Element(dM);
{};
gi.setStyles({"position":dO,"zIndex":0});
gi.setAttribute(dv,this.toHashCode());
{};
return gi;
},__eJ:function(){var gw=this._createContentElement();
{};
gw.setStyles({"position":dO,"zIndex":10});
return gw;
},_createContentElement:function(){var fz=new qx.html.Element(dM);
fz.setStyles({"overflowX":di,"overflowY":di});
return fz;
},getContainerElement:function(){return this.__ex;
},getContentElement:function(){return this.__ey;
},getDecoratorElement:function(){return this.__eB||null;
},getShadowElement:function(){return this.__eC||null;
},__eK:null,getLayoutChildren:function(){var fD=this.__eK;

if(!fD){return this.__eL;
}var fE;

for(var i=0,l=fD.length;i<l;i++){var fC=fD[i];

if(fC.hasUserBounds()||fC.isExcluded()){if(fE==null){fE=fD.concat();
}qx.lang.Array.remove(fE,fC);
}}return fE||fD;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutChildren:function(){var eC=this.__eG;

if(eC){eC.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},hasLayoutChildren:function(){var ei=this.__eK;

if(!ei){return false;
}var ej;

for(var i=0,l=ei.length;i<l;i++){ej=ei[i];

if(!ej.hasUserBounds()&&!ej.isExcluded()){return true;
}}return false;
},getChildrenContainer:function(){return this;
},__eL:[],_getChildren:function(){return this.__eK||this.__eL;
},_indexOf:function(gu){var gv=this.__eK;

if(!gv){return -1;
}return gv.indexOf(gu);
},_hasChildren:function(){var fo=this.__eK;
return fo!=null&&(!!fo[0]);
},addChildrenToQueue:function(N){var O=this.__eK;

if(!O){return;
}var P;

for(var i=0,l=O.length;i<l;i++){P=O[i];
N[P.$$hash]=P;
P.addChildrenToQueue(N);
}},_add:function(en,eo){if(en.getLayoutParent()==this){qx.lang.Array.remove(this.__eK,en);
}
if(this.__eK){this.__eK.push(en);
}else{this.__eK=[en];
}this.__eM(en,eo);
},_addAt:function(ee,ef,eg){if(!this.__eK){this.__eK=[];
}if(ee.getLayoutParent()==this){qx.lang.Array.remove(this.__eK,ee);
}var eh=this.__eK[ef];

if(eh===ee){return ee.setLayoutProperties(eg);
}
if(eh){qx.lang.Array.insertBefore(this.__eK,ee,eh);
}else{this.__eK.push(ee);
}this.__eM(ee,eg);
},_addBefore:function(go,gp,gq){{};

if(go==gp){return;
}
if(!this.__eK){this.__eK=[];
}if(go.getLayoutParent()==this){qx.lang.Array.remove(this.__eK,go);
}qx.lang.Array.insertBefore(this.__eK,go,gp);
this.__eM(go,gq);
},_addAfter:function(bd,be,bf){{};

if(bd==be){return;
}
if(!this.__eK){this.__eK=[];
}if(bd.getLayoutParent()==this){qx.lang.Array.remove(this.__eK,bd);
}qx.lang.Array.insertAfter(this.__eK,bd,be);
this.__eM(bd,bf);
},_remove:function(bt){if(!this.__eK){throw new Error("This widget has no children!");
}qx.lang.Array.remove(this.__eK,bt);
this.__eN(bt);
},_removeAt:function(bz){if(!this.__eK){throw new Error("This widget has no children!");
}var bA=this.__eK[bz];
qx.lang.Array.removeAt(this.__eK,bz);
this.__eN(bA);
return bA;
},_removeAll:function(){if(!this.__eK){return;
}var fp=this.__eK.concat();
this.__eK.length=0;

for(var i=fp.length-1;i>=0;i--){this.__eN(fp[i]);
}qx.ui.core.queue.Layout.add(this);
},_afterAddChild:null,_afterRemoveChild:null,__eM:function(eV,eW){{};
var parent=eV.getLayoutParent();

if(parent&&parent!=this){parent._remove(eV);
}eV.setLayoutParent(this);
if(eW){eV.setLayoutProperties(eW);
}else{this.updateLayoutProperties();
}if(this._afterAddChild){this._afterAddChild(eV);
}},__eN:function(gh){{};

if(gh.getLayoutParent()!==this){throw new Error("Remove Error: "+gh+" is not a child of this widget!");
}gh.setLayoutParent(null);
if(this.__eG){this.__eG.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
if(this._afterRemoveChild){this._afterRemoveChild(gh);
}},capture:function(ez){this.getContainerElement().capture(ez);
},releaseCapture:function(){this.getContainerElement().releaseCapture();
},_applyPadding:function(gU,gV,name){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
},_createProtectorElement:function(){if(this.__eD){return;
}var C=this.__eD=new qx.html.Element;
{};
C.setStyles({position:dO,top:0,left:0,zIndex:7});
var D=this.getBounds();

if(D){this.__eD.setStyles({width:D.width+dI,height:D.height+dI});
}if(qx.core.Variant.isSet(dN,db)){C.setStyles({backgroundImage:cK+qx.util.ResourceManager.getInstance().toUri(dl)+cL,backgroundRepeat:cA});
}this.getContainerElement().add(C);
},_applyDecorator:function(ep,eq){{};
var eu=qx.ui.core.Widget.__ez;
var es=this.getContainerElement();
if(!this.__eD&&!qx.bom.client.Feature.CSS_POINTER_EVENTS){this._createProtectorElement();
}if(eq){es.remove(this.__eB);
eu.poolDecorator(this.__eB);
}if(ep){var et=this.__eB=eu.getDecoratorElement(ep);
et.setStyle(dw,5);
var er=this.getBackgroundColor();
et.tint(er);
es.add(et);
}else{delete this.__eB;
this._applyBackgroundColor(this.getBackgroundColor());
}if(ep&&!eq&&er){this.getContainerElement().setStyle(de,null);
}if(this.__eH(eq,ep)){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
}else if(ep){var ev=this.getBounds();

if(ev){et.resize(ev.width,ev.height);
this.__eD&&
this.__eD.setStyles({width:ev.width+dI,height:ev.height+dI});
}}},_applyShadow:function(t,u){var B=qx.ui.core.Widget.__eA;
var w=this.getContainerElement();
if(u){w.remove(this.__eC);
B.poolDecorator(this.__eC);
}if(t){var y=this.__eC=B.getDecoratorElement(t);
w.add(y);
var A=y.getInsets();
y.setStyles({left:(-A.left)+dI,top:(-A.top)+dI});
var z=this.getBounds();

if(z){var x=z.width+A.left+A.right;
var v=z.height+A.top+A.bottom;
y.resize(x,v);
}y.tint(null);
}else{delete this.__eC;
}},_applyToolTipText:function(bB,bC){if(qx.core.Variant.isSet(dS,dC)){if(this.__eF){return;
}var bD=qx.locale.Manager.getInstance();
this.__eF=bD.addListener(dn,function(){if(bB&&bB.translate){this.setToolTipText(bB.translate());
}},this);
}},_applyTextColor:function(Q,R){},_applyZIndex:function(eS,eT){this.getContainerElement().setStyle(dw,eS==null?0:eS);
},_applyVisibility:function(eF,eG){var eH=this.getContainerElement();

if(eF===dE){eH.show();
}else{eH.hide();
}var parent=this.$$parent;

if(parent&&(eG==null||eF==null||eG===dA||eF===dA)){parent.invalidateLayoutChildren();
}qx.ui.core.queue.Visibility.add(this);
},_applyOpacity:function(fw,fx){this.getContainerElement().setStyle(dy,fw==1?null:fw);
if(qx.core.Variant.isSet(dN,db)){if(!qx.Class.isSubClassOf(this.getContentElement().constructor,qx.html.Image)){var fy=(fw==1||fw==null)?null:0.99;
this.getContentElement().setStyle(dy,fy);
}}},_applyCursor:function(fj,fk){if(fj==null&&!this.isSelectable()){fj=dx;
}this.getContainerElement().setStyle(cG,fj,qx.bom.client.Engine.OPERA);
},_applyBackgroundColor:function(G,H){var I=this.getBackgroundColor();
var K=this.getContainerElement();

if(this.__eB){this.__eB.tint(I);
K.setStyle(de,null);
}else{var J=qx.theme.manager.Color.getInstance().resolve(I);
K.setStyle(de,J);
}},_applyFont:function(fH,fI){},__eO:null,$$stateChanges:null,_forwardStates:null,hasState:function(V){var W=this.__eO;
return W&&W[V];
},addState:function(bu){var bv=this.__eO;

if(!bv){bv=this.__eO={};
}
if(bv[bu]){return;
}this.__eO[bu]=true;
if(bu===dP){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var by=this.__eR;

if(forward&&forward[bu]&&by){var bw;

for(var bx in by){bw=by[bx];

if(bw instanceof qx.ui.core.Widget){by[bx].addState(bu);
}}}},removeState:function(c){var d=this.__eO;

if(!d||!d[c]){return;
}delete this.__eO[c];
if(c===dP){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var h=this.__eR;

if(forward&&forward[c]&&h){for(var g in h){var f=h[g];

if(f instanceof qx.ui.core.Widget){f.removeState(c);
}}}},replaceState:function(bH,bI){var bJ=this.__eO;

if(!bJ){bJ=this.__eO={};
}
if(!bJ[bI]){bJ[bI]=true;
}
if(bJ[bH]){delete bJ[bH];
}
if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var bM=this.__eR;

if(forward&&forward[bI]&&bM){for(var bL in bM){var bK=bM[bL];

if(bK instanceof qx.ui.core.Widget){bK.replaceState(bH,bI);
}}}},__eP:null,__eQ:null,syncAppearance:function(){var fV=this.__eO;
var fU=this.__eP;
var fW=qx.theme.manager.Appearance.getInstance();
var fS=qx.core.Property.$$method.setThemed;
var gb=qx.core.Property.$$method.resetThemed;
if(this.__eQ){delete this.__eQ;
if(fU){var fR=fW.styleFrom(fU,fV,null,this.getAppearance());
if(fR){fU=null;
}}}if(!fU){var fT=this;
var ga=[];

do{ga.push(fT.$$subcontrol||fT.getAppearance());
}while(fT=fT.$$subparent);
fU=this.__eP=ga.reverse().join(cQ).replace(/#[0-9]+/g,cR);
}var fX=fW.styleFrom(fU,fV,null,this.getAppearance());

if(fX){var fY;

if(fR){for(var fY in fR){if(fX[fY]===undefined){this[gb[fY]]();
}}}{};
for(var fY in fX){fX[fY]===undefined?this[gb[fY]]():this[fS[fY]](fX[fY]);
}}else if(fR){for(var fY in fR){this[gb[fY]]();
}}this.fireDataEvent(cy,this.__eO);
},_applyAppearance:function(S,T){this.updateAppearance();
},checkAppearanceNeeds:function(){if(!this.__eE){qx.ui.core.queue.Appearance.add(this);
this.__eE=true;
}else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);
delete this.$$stateChanges;
}},updateAppearance:function(){this.__eQ=true;
qx.ui.core.queue.Appearance.add(this);
var bQ=this.__eR;

if(bQ){var bO;

for(var bP in bQ){bO=bQ[bP];

if(bO instanceof qx.ui.core.Widget){bO.updateAppearance();
}}}},syncWidget:function(){},getEventTarget:function(){var gg=this;

while(gg.getAnonymous()){gg=gg.getLayoutParent();

if(!gg){return null;
}}return gg;
},getFocusTarget:function(){var U=this;

if(!U.getEnabled()){return null;
}
while(U.getAnonymous()||!U.getFocusable()){U=U.getLayoutParent();

if(!U||!U.getEnabled()){return null;
}}return U;
},getFocusElement:function(){return this.getContainerElement();
},isTabable:function(){return (!!this.getContainerElement().getDomElement())&&this.isFocusable();
},_applyFocusable:function(gc,gd){var ge=this.getFocusElement();
if(gc){var gf=this.getTabIndex();

if(gf==null){gf=1;
}ge.setAttribute(df,gf);
if(qx.core.Variant.isSet(dN,db)){ge.setAttribute(ce,cp);
}else{ge.setStyle(cg,ch);
}}else{if(ge.isNativelyFocusable()){ge.setAttribute(df,-1);
}else if(gd){ge.setAttribute(df,null);
}}},_applyKeepFocus:function(fh){var fi=this.getFocusElement();
fi.setAttribute(dm,fh?dC:null);
},_applyKeepActive:function(j){var k=this.getContainerElement();
k.setAttribute(cW,j?dC:null);
},_applyTabIndex:function(gt){if(gt==null){gt=1;
}else if(gt<1||gt>32000){throw new Error("TabIndex property must be between 1 and 32000");
}
if(this.getFocusable()&&gt!=null){this.getFocusElement().setAttribute(df,gt);
}},_applySelectable:function(X){this._applyCursor(this.getCursor());
this.getContainerElement().setSelectable(X);
this.getContentElement().setSelectable(X);
},_applyEnabled:function(fF,fG){if(fF===false){this.addState(dJ);
this.removeState(dP);
if(this.isFocusable()){this.removeState(dd);
this._applyFocusable(false,true);
}if(this.isDraggable()){this._applyDraggable(false,true);
}if(this.isDroppable()){this._applyDroppable(false,true);
}}else{this.removeState(dJ);
if(this.isFocusable()){this._applyFocusable(true,false);
}if(this.isDraggable()){this._applyDraggable(true,false);
}if(this.isDroppable()){this._applyDroppable(true,false);
}}},_applyNativeContextMenu:function(gl,gm,name){},_applyContextMenu:function(ex,ey){if(ey){ey.removeState(dh);

if(ey.getOpener()==this){ey.resetOpener();
}
if(!ex){this.removeListener(dh,this._onContextMenuOpen);
ey.removeListener(dc,this._onBeforeContextMenuOpen,this);
}}
if(ex){ex.setOpener(this);
ex.addState(dh);

if(!ey){this.addListener(dh,this._onContextMenuOpen);
ex.addListener(dc,this._onBeforeContextMenuOpen,this);
}}},_onContextMenuOpen:function(e){this.getContextMenu().openAtMouse(e);
e.stop();
},_onBeforeContextMenuOpen:function(e){if(e.getData()==dE&&this.hasListener(bR)){this.fireDataEvent(bR,e);
}},_onStopEvent:function(e){e.stopPropagation();
},_applyDraggable:function(eY,fa){if(!this.isEnabled()&&eY===true){eY=false;
}qx.ui.core.DragDropCursor.getInstance();
if(eY){this.addListener(dR,this._onDragStart);
this.addListener(dL,this._onDrag);
this.addListener(dr,this._onDragEnd);
this.addListener(ds,this._onDragChange);
}else{this.removeListener(dR,this._onDragStart);
this.removeListener(dL,this._onDrag);
this.removeListener(dr,this._onDragEnd);
this.removeListener(ds,this._onDragChange);
}this.getContainerElement().setAttribute(cB,eY?dC:null);
},_applyDroppable:function(bj,bk){if(!this.isEnabled()&&bj===true){bj=false;
}this.getContainerElement().setAttribute(cH,bj?dC:null);
},_onDragStart:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
this.getApplicationRoot().setGlobalCursor(dx);
},_onDrag:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
},_onDragEnd:function(e){qx.ui.core.DragDropCursor.getInstance().moveTo(-1000,-1000);
this.getApplicationRoot().resetGlobalCursor();
},_onDragChange:function(e){var L=qx.ui.core.DragDropCursor.getInstance();
var M=e.getCurrentAction();
M?L.setAction(M):L.resetAction();
},visualizeFocus:function(){this.addState(dd);
},visualizeBlur:function(){this.removeState(dd);
},scrollChildIntoView:function(fs,ft,fu,fv){this.scrollChildIntoViewX(fs,ft,fv);
this.scrollChildIntoViewY(fs,fu,fv);
},scrollChildIntoViewX:function(fK,fL,fM){this.getContentElement().scrollChildIntoViewX(fK.getContainerElement(),fL,fM);
},scrollChildIntoViewY:function(q,r,s){this.getContentElement().scrollChildIntoViewY(q.getContainerElement(),r,s);
},focus:function(){if(this.isFocusable()){this.getFocusElement().focus();
}else{throw new Error("Widget is not focusable!");
}},blur:function(){if(this.isFocusable()){this.getFocusElement().blur();
}else{throw new Error("Widget is not focusable!");
}},activate:function(){this.getContainerElement().activate();
},deactivate:function(){this.getContainerElement().deactivate();
},tabFocus:function(){this.getFocusElement().focus();
},hasChildControl:function(eX){if(!this.__eR){return false;
}return !!this.__eR[eX];
},__eR:null,_getCreatedChildControls:function(){return this.__eR;
},getChildControl:function(gx,gy){if(!this.__eR){if(gy){return null;
}this.__eR={};
}var gz=this.__eR[gx];

if(gz){return gz;
}
if(gy===true){return null;
}return this._createChildControl(gx);
},_showChildControl:function(gW){var gX=this.getChildControl(gW);
gX.show();
return gX;
},_excludeChildControl:function(bb){var bc=this.getChildControl(bb,true);

if(bc){bc.exclude();
}},_isChildControlVisible:function(Y){var ba=this.getChildControl(Y,true);

if(ba){return ba.isVisible();
}return false;
},_createChildControl:function(gC){if(!this.__eR){this.__eR={};
}else if(this.__eR[gC]){throw new Error("Child control '"+gC+"' already created!");
}var gG=gC.indexOf(cD);

if(gG==-1){var gD=this._createChildControlImpl(gC);
}else{var gD=this._createChildControlImpl(gC.substring(0,gG));
}
if(!gD){throw new Error("Unsupported control: "+gC);
}gD.$$subcontrol=gC;
gD.$$subparent=this;
var gE=this.__eO;
var forward=this._forwardStates;

if(gE&&forward&&gD instanceof qx.ui.core.Widget){for(var gF in gE){if(forward[gF]){gD.addState(gF);
}}}this.fireDataEvent(cb,gD);
return this.__eR[gC]=gD;
},_createChildControlImpl:function(eU){return null;
},_disposeChildControls:function(){var fQ=this.__eR;

if(!fQ){return;
}var fO=qx.ui.core.Widget;

for(var fP in fQ){var fN=fQ[fP];

if(!fO.contains(this,fN)){fN.destroy();
}else{fN.dispose();
}}delete this.__eR;
},_findTopControl:function(){var gn=this;

while(gn){if(!gn.$$subparent){return gn;
}gn=gn.$$subparent;
}return null;
},getContainerLocation:function(fA){var fB=this.getContainerElement().getDomElement();
return fB?qx.bom.element.Location.get(fB,fA):null;
},getContentLocation:function(gA){var gB=this.getContentElement().getDomElement();
return gB?qx.bom.element.Location.get(gB,gA):null;
},setDomLeft:function(gj){var gk=this.getContainerElement().getDomElement();

if(gk){gk.style.left=gj+dI;
}else{throw new Error("DOM element is not yet created!");
}},setDomTop:function(eA){var eB=this.getContainerElement().getDomElement();

if(eB){eB.style.top=eA+dI;
}else{throw new Error("DOM element is not yet created!");
}},setDomPosition:function(gr,top){var gs=this.getContainerElement().getDomElement();

if(gs){gs.style.left=gr+dI;
gs.style.top=top+dI;
}else{throw new Error("DOM element is not yet created!");
}},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
},clone:function(){var ff=arguments.callee.base.call(this);

if(this.getChildren){var fg=this.getChildren();

for(var i=0,l=fg.length;i<l;i++){ff.add(fg[i].clone());
}}return ff;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Variant.isSet(dS,dC)){if(this.__eF){qx.locale.Manager.getInstance().removeListenerById(this.__eF);
}}this.getContainerElement().setAttribute(dv,null,true);
this._disposeChildControls();
qx.ui.core.queue.Appearance.remove(this);
qx.ui.core.queue.Layout.remove(this);
qx.ui.core.queue.Visibility.remove(this);
qx.ui.core.queue.Widget.remove(this);
}if(!qx.core.ObjectRegistry.inShutDown){var F=qx.ui.core.Widget;
var E=this.getContainerElement();

if(this.__eB){E.remove(this.__eB);
F.__ez.poolDecorator(this.__eB);
}
if(this.__eC){E.remove(this.__eC);
F.__eA.poolDecorator(this.__eC);
}this.clearSeparators();
this.__eB=this.__eC=this.__eI=null;
}else{this._disposeArray(ec);
this._disposeObjects(cF,bU);
}this._disposeArray(bS);
this.__eO=this.__eR=null;
this._disposeObjects(dW,cC,dV,bY);
}});
})();
(function(){var d="qx.event.type.Data",c="qx.ui.container.Composite",b="addChildWidget",a="removeChildWidget";
qx.Class.define(c,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MLayoutHandling],construct:function(g){arguments.callee.base.call(this);

if(g!=null){this._setLayout(g);
}},events:{addChildWidget:d,removeChildWidget:d},members:{_afterAddChild:function(h){this.fireNonBubblingEvent(b,qx.event.type.Data,[h]);
},_afterRemoveChild:function(i){this.fireNonBubblingEvent(a,qx.event.type.Data,[i]);
}},defer:function(e,f){qx.ui.core.MChildrenHandling.remap(f);
qx.ui.core.MLayoutHandling.remap(f);
}});
})();
(function(){var k="keep-align",j="interval",i="Integer",h="direct",g="best-fit",f="mouse",e="bottom-left",d="disappear",c="Boolean",b="bottom-right",y="widget",x="qx.ui.core.MPlacement",w="left-top",v="offsetRight",u="shorthand",t="offsetLeft",s="top-left",r="appear",q="offsetBottom",p="top-right",n="offsetTop",o="right-bottom",l="right-top",m="left-bottom";
qx.Mixin.define(x,{properties:{position:{check:[s,p,e,b,w,m,l,o],init:e,themeable:true},placeMethod:{check:[y,f],init:f,themeable:true},domMove:{check:c,init:false},placementModeX:{check:[h,k,g],init:k,themeable:true},placementModeY:{check:[h,k,g],init:k,themeable:true},offsetLeft:{check:i,init:0,themeable:true},offsetTop:{check:i,init:0,themeable:true},offsetRight:{check:i,init:0,themeable:true},offsetBottom:{check:i,init:0,themeable:true},offset:{group:[n,v,q,t],mode:u,themeable:true}},members:{__eS:null,getLayoutLocation:function(C){var F,E,G,top;
E=C.getBounds();
G=E.left;
top=E.top;
var H=E;
C=C.getLayoutParent();

while(C&&!C.isRootWidget()){E=C.getBounds();
G+=E.left;
top+=E.top;
F=C.getInsets();
G+=F.left;
top+=F.top;
C=C.getLayoutParent();
}if(C.isRootWidget()){var D=C.getContainerLocation();

if(D){G+=D.left;
top+=D.top;
}}return {left:G,top:top,right:G+H.width,bottom:top+H.height};
},moveTo:function(a,top){if(this.getDomMove()){this.setDomPosition(a,top);
}else{this.setLayoutProperties({left:a,top:top});
}},placeToWidget:function(O,P){if(P){this.__eS=qx.lang.Function.bind(this.placeToWidget,this,O,false);
qx.event.Idle.getInstance().addListener(j,this.__eS);
this.addListener(d,function(){if(this.__eS){qx.event.Idle.getInstance().removeListener(j,this.__eS);
this.__eS=null;
}},this);
}var Q=O.getContainerLocation()||this.getLayoutLocation(O);
this.__eU(Q);
},placeToMouse:function(event){var J=event.getDocumentLeft();
var top=event.getDocumentTop();
var I={left:J,top:top,right:J,bottom:top};
this.__eU(I);
},placeToElement:function(z,A){var location=qx.bom.element.Location.get(z);
var B={left:location.left,top:location.top,right:location.left+z.offsetWidth,bottom:location.top+z.offsetHeight};
if(A){this.__eS=qx.lang.Function.bind(this.placeToElement,this,z,false);
qx.event.Idle.getInstance().addListener(j,this.__eS);
this.addListener(d,function(){if(this.__eS){qx.event.Idle.getInstance().removeListener(j,this.__eS);
this.__eS=null;
}},this);
}this.__eU(B);
},placeToPoint:function(R){var S={left:R.left,top:R.top,right:R.left,bottom:R.top};
this.__eU(S);
},_getPlacementOffsets:function(){return {left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};
},__eT:function(T){var U=null;

if(this._computePlacementSize){var U=this._computePlacementSize();
}else if(this.isVisible()){var U=this.getBounds();
}
if(U==null){this.addListenerOnce(r,function(){this.__eT(T);
},this);
}else{T.call(this,U);
}},__eU:function(V){this.__eT(function(K){var L=qx.util.placement.Placement.compute(K,this.getLayoutParent().getBounds(),V,this._getPlacementOffsets(),this.getPosition(),this.getPlacementModeX(),this.getPlacementModeY());
this.moveTo(L.left,L.top);
});
},setSmart:function(W){{};
var X=W?k:h;
this.set({placementModeX:X,placementModeY:X});
},getSmart:function(){{};
var M=this.getPlacementModeX()==k?true:false;
var N=this.getPlacementModeY()==k?true:false;
return M&&N;
},resetSmart:function(){{};
this.resetPlacementModeX();
this.resetPlacementModeY();
},isSmart:function(){{};
return this.getSmart();
},toggleSmart:function(){{};
this.setSmart(!this.getSmart());
}},destruct:function(){if(this.__eS){qx.event.Idle.getInstance().removeListener(j,this.__eS);
}}});
})();
(function(){var e="qx.ui.popup.Popup",d="visible",c="excluded",b="popup",a="Boolean";
qx.Class.define(e,{extend:qx.ui.container.Composite,include:qx.ui.core.MPlacement,construct:function(f){arguments.callee.base.call(this,f);
qx.core.Init.getApplication().getRoot().add(this);
this.initVisibility();
},properties:{appearance:{refine:true,init:b},visibility:{refine:true,init:c},autoHide:{check:a,init:true}},members:{_applyVisibility:function(g,h){arguments.callee.base.call(this,g,h);
var i=qx.ui.popup.Manager.getInstance();
g===d?i.add(this):i.remove(this);
}},destruct:function(){qx.ui.popup.Manager.getInstance().remove(this);
}});
})();
(function(){var l="atom",k="Integer",j="String",i="_applyRich",h="qx.ui.tooltip.ToolTip",g="_applyIcon",f="tooltip",d="qx.ui.core.Widget",c="mouseover",b="Boolean",a="_applyLabel";
qx.Class.define(h,{extend:qx.ui.popup.Popup,construct:function(m,n){arguments.callee.base.call(this);
this.setLayout(new qx.ui.layout.Grow);
this._createChildControl(l);
if(m!=null){this.setLabel(m);
}
if(n!=null){this.setIcon(n);
}this.addListener(c,this._onMouseOver,this);
},properties:{appearance:{refine:true,init:f},showTimeout:{check:k,init:700,themeable:true},hideTimeout:{check:k,init:4000,themeable:true},label:{check:j,nullable:true,apply:a},icon:{check:j,nullable:true,apply:g,themeable:true},rich:{check:b,init:false,apply:i},opener:{check:d,nullable:true}},members:{_createChildControlImpl:function(r){var s;

switch(r){case l:s=new qx.ui.basic.Atom;
this._add(s);
break;
}return s||arguments.callee.base.call(this,r);
},_onMouseOver:function(e){this.hide();
},_applyIcon:function(w,x){var y=this.getChildControl(l);
w==null?y.resetIcon:y.setIcon(w);
},_applyLabel:function(o,p){var q=this.getChildControl(l);
o==null?q.resetLabel():q.setLabel(o);
},_applyRich:function(t,u){var v=this.getChildControl(l);
v.setRich(t);
}}});
})();
(function(){var b="qx.ui.core.queue.Layout",a="layout";
qx.Class.define(b,{statics:{__eV:{},remove:function(j){delete this.__eV[j.$$hash];
},add:function(A){this.__eV[A.$$hash]=A;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var k=this.__eY();
for(var i=k.length-1;i>=0;i--){var l=k[i];
if(l.hasValidLayout()){continue;
}if(l.isRootWidget()&&!l.hasUserBounds()){var n=l.getSizeHint();
l.renderLayout(0,0,n.width,n.height);
}else{var m=l.getBounds();
l.renderLayout(m.left,m.top,m.width,m.height);
}}},getNestingLevel:function(o){var p=this.__eX;
var r=0;
var parent=o;
while(true){if(p[parent.$$hash]!=null){r+=p[parent.$$hash];
break;
}
if(!parent.$$parent){break;
}parent=parent.$$parent;
r+=1;
}var q=r;

while(o&&o!==parent){p[o.$$hash]=q--;
o=o.$$parent;
}return r;
},__eW:function(){var h=qx.ui.core.queue.Visibility;
this.__eX={};
var g=[];
var f=this.__eV;
var c,e;

for(var d in f){c=f[d];

if(h.isVisible(c)){e=this.getNestingLevel(c);
if(!g[e]){g[e]={};
}g[e][d]=c;
delete f[d];
}}return g;
},__eY:function(){var v=[];
var x=this.__eW();

for(var u=x.length-1;u>=0;u--){if(!x[u]){continue;
}
for(var t in x[u]){var s=x[u][t];
if(u==0||s.isRootWidget()||s.hasUserBounds()){v.push(s);
s.invalidateLayoutCache();
continue;
}var z=s.getSizeHint(false);

if(z){s.invalidateLayoutCache();
var w=s.getSizeHint();
var y=(!s.getBounds()||z.minWidth!==w.minWidth||z.width!==w.width||z.maxWidth!==w.maxWidth||z.minHeight!==w.minHeight||z.height!==w.height||z.maxHeight!==w.maxHeight);
}else{y=true;
}
if(y){var parent=s.getLayoutParent();

if(!x[u-1]){x[u-1]={};
}x[u-1][parent.$$hash]=parent;
}else{v.push(s);
}}}return v;
}}});
})();
(function(){var a="qx.event.handler.UserAction";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){arguments.callee.base.call(this);
this.__fa=b;
this.__fb=b.getWindow();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__fa:null,__fb:null,canHandleEvent:function(j,k){},registerEvent:function(c,d,e){},unregisterEvent:function(f,g,h){}},destruct:function(){this.__fa=this.__fb=null;
},defer:function(i){qx.event.Registration.addHandler(i);
}});
})();
(function(){var b="qx.util.DeferredCallManager",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,construct:function(){this.__fc={};
this.__fd=qx.lang.Function.bind(this.__fh,this);
this.__fe=false;
},members:{__ff:null,__fg:null,__fc:null,__fe:null,__fd:null,schedule:function(e){if(this.__ff==null){this.__ff=window.setTimeout(this.__fd,0);
}var f=e.toHashCode();
if(this.__fg&&this.__fg[f]){return;
}this.__fc[f]=e;
this.__fe=true;
},cancel:function(c){var d=c.toHashCode();
if(this.__fg&&this.__fg[d]){this.__fg[d]=null;
return;
}delete this.__fc[d];
if(qx.lang.Object.isEmpty(this.__fc)&&this.__ff!=null){window.clearTimeout(this.__ff);
this.__ff=null;
}},__fh:qx.event.GlobalError.observeMethod(function(){this.__ff=null;
while(this.__fe){this.__fg=qx.lang.Object.clone(this.__fc);
this.__fc={};
this.__fe=false;

for(var h in this.__fg){var g=this.__fg[h];

if(g){this.__fg[h]=null;
g.call();
}}}this.__fg=null;
})},destruct:function(){if(this.__ff!=null){window.clearTimeout(this.__ff);
}this.__fd=this.__fc=null;
}});
})();
(function(){var c="qx.util.DeferredCall";
qx.Class.define(c,{extend:qx.core.Object,construct:function(d,e){arguments.callee.base.call(this);
this.__fi=d;
this.__fj=e||null;
this.__fk=qx.util.DeferredCallManager.getInstance();
},members:{__fi:null,__fj:null,__fk:null,cancel:function(){this.__fk.cancel(this);
},schedule:function(){this.__fk.schedule(this);
},call:function(){this.__fj?this.__fi.apply(this.__fj):this.__fi();
}},destruct:function(a,b){this.cancel();
this.__fj=this.__fi=this.__fk=null;
}});
})();
(function(){var cS="element",cR="qx.client",cQ="div",cP="",cO="mshtml",cN="none",cM="scroll",cL="text",cK="qx.html.Element",cJ="|capture|",dp="focus",dn="gecko",dm="blur",dl="deactivate",dk="capture",dj="userSelect",di="-moz-none",dh="visible",dg="releaseCapture",df="|bubble|",da="qxSelectable",dc="tabIndex",cX="off",cY="__fH",cV="activate",cW="MozUserSelect",cT="normal",cU="webkit",dd="hidden",de="on";
qx.Class.define(cK,{extend:qx.core.Object,construct:function(cm){arguments.callee.base.call(this);
this.__fl=cm||cQ;
},statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__fm:{},_scheduleFlush:function(dC){qx.html.Element.__fT.schedule();
},flush:function(){var bD;
{};
var bv=this.__fn();
var bu=bv.getFocus();

if(bu&&this.__fr(bu)){bv.blur(bu);
}var bK=bv.getActive();

if(bK&&this.__fr(bK)){qx.bom.Element.deactivate(bK);
}var by=this.__fp();

if(by&&this.__fr(by)){qx.bom.Element.releaseCapture(by);
}var bE=[];
var bF=this._modified;

for(var bC in bF){bD=bF[bC];
if(bD.__fL()){if(bD.__fs&&qx.dom.Hierarchy.isRendered(bD.__fs)){bE.push(bD);
}else{{};
bD.__fK();
}delete bF[bC];
}}
for(var i=0,l=bE.length;i<l;i++){bD=bE[i];
{};
bD.__fK();
}var bA=this._visibility;

for(var bC in bA){bD=bA[bC];
{};
bD.__fs.style.display=bD.__fv?cP:cN;
if(qx.core.Variant.isSet(cR,cO)){if(!(document.documentMode>=8)){bD.__fs.style.visibility=bD.__fv?dh:dd;
}}delete bA[bC];
}var scroll=this._scroll;

for(var bC in scroll){bD=scroll[bC];
var bL=bD.__fs;

if(bL&&bL.offsetWidth){var bx=true;
if(bD.__fy!=null){bD.__fs.scrollLeft=bD.__fy;
delete bD.__fy;
}if(bD.__fz!=null){bD.__fs.scrollTop=bD.__fz;
delete bD.__fz;
}var bH=bD.__fw;

if(bH!=null){var bB=bH.element.getDomElement();

if(bB&&bB.offsetWidth){qx.bom.element.Scroll.intoViewX(bB,bL,bH.align);
delete bD.__fw;
}else{bx=false;
}}var bI=bD.__fx;

if(bI!=null){var bB=bI.element.getDomElement();

if(bB&&bB.offsetWidth){qx.bom.element.Scroll.intoViewY(bB,bL,bI.align);
delete bD.__fx;
}else{bx=false;
}}if(bx){delete scroll[bC];
}}}var bw={"releaseCapture":1,"blur":1,"deactivate":1};
for(var i=0;i<this._actions.length;i++){var bJ=this._actions[i];
var bG=bJ.element.__fs;

if(!bG||!bw[bJ.type]&&!bJ.element.__fL()){continue;
}var bz=bJ.args;
bz.unshift(bG);
qx.bom.Element[bJ.type].apply(qx.bom.Element,bz);
}this._actions=[];
for(var bC in this.__fm){var bt=this.__fm[bC];
var bL=bt.element.__fs;

if(bL){qx.bom.Selection.set(bL,bt.start,bt.end);
delete this.__fm[bC];
}}qx.event.handler.Appear.refresh();
},__fn:function(){if(!this.__fo){var bb=qx.event.Registration.getManager(window);
this.__fo=bb.getHandler(qx.event.handler.Focus);
}return this.__fo;
},__fp:function(){if(!this.__fq){var dw=qx.event.Registration.getManager(window);
this.__fq=dw.getDispatcher(qx.event.dispatch.MouseCapture);
}return this.__fq.getCaptureElement();
},__fr:function(be){var bf=qx.core.ObjectRegistry.fromHashCode(be.$$element);
return bf&&!bf.__fL();
}},members:{__fl:null,__fs:null,__ft:false,__fu:true,__fv:true,__fw:null,__fx:null,__fy:null,__fz:null,__fA:null,__fB:null,__fC:null,__fD:null,__fE:null,__fF:null,__fG:null,__fH:null,__fI:null,__fJ:null,_scheduleChildrenUpdate:function(){if(this.__fI){return;
}this.__fI=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cS);
},_createDomElement:function(){return qx.bom.Element.create(this.__fl);
},__fK:function(){{};
var Y=this.__fH;

if(Y){var length=Y.length;
var ba;

for(var i=0;i<length;i++){ba=Y[i];

if(ba.__fv&&ba.__fu&&!ba.__fs){ba.__fK();
}}}
if(!this.__fs){this.__fs=this._createDomElement();
this.__fs.$$element=this.$$hash;
this._copyData(false);

if(Y&&length>0){this._insertChildren();
}}else{this._syncData();

if(this.__fI){this._syncChildren();
}}delete this.__fI;
},_insertChildren:function(){var cy=this.__fH;
var length=cy.length;
var cA;

if(length>2){var cz=document.createDocumentFragment();

for(var i=0;i<length;i++){cA=cy[i];

if(cA.__fs&&cA.__fu){cz.appendChild(cA.__fs);
}}this.__fs.appendChild(cz);
}else{var cz=this.__fs;

for(var i=0;i<length;i++){cA=cy[i];

if(cA.__fs&&cA.__fu){cz.appendChild(cA.__fs);
}}}},_syncChildren:function(){var cr;
var cw=qx.core.ObjectRegistry;
var cn=this.__fH;
var cu=cn.length;
var co;
var cs;
var cq=this.__fs;
var ct=cq.childNodes;
var cp=0;
var cv;
{};
for(var i=ct.length-1;i>=0;i--){cv=ct[i];
cs=cw.fromHashCode(cv.$$element);

if(!cs||!cs.__fu||cs.__fJ!==this){cq.removeChild(cv);
{};
}}for(var i=0;i<cu;i++){co=cn[i];
if(co.__fu){cs=co.__fs;
cv=ct[cp];

if(!cs){continue;
}if(cs!=cv){if(cv){cq.insertBefore(cs,cv);
}else{cq.appendChild(cs);
}{};
}cp++;
}}{};
},_copyData:function(dI){var dM=this.__fs;
var dL=this.__fE;

if(dL){var dJ=qx.bom.element.Attribute;

for(var dN in dL){dJ.set(dM,dN,dL[dN]);
}}var dL=this.__fD;

if(dL){var dK=qx.bom.element.Style;

if(dI){dK.setStyles(dM,dL);
}else{dK.setCss(dM,dK.compile(dL));
}}var dL=this.__fF;

if(dL){for(var dN in dL){this._applyProperty(dN,dL[dN]);
}}var dL=this.__fG;

if(dL){qx.event.Registration.getManager(dM).importListeners(dM,dL);
delete this.__fG;
}},_syncData:function(){var cc=this.__fs;
var cb=qx.bom.element.Attribute;
var bY=qx.bom.element.Style;
var ca=this.__fB;

if(ca){var cf=this.__fE;

if(cf){var cd;

for(var ce in ca){cd=cf[ce];

if(cd!==undefined){cb.set(cc,ce,cd);
}else{cb.reset(cc,ce);
}}}this.__fB=null;
}var ca=this.__fA;

if(ca){var cf=this.__fD;

if(cf){var bX={};

for(var ce in ca){bX[ce]=cf[ce];
}bY.setStyles(cc,bX);
}this.__fA=null;
}var ca=this.__fC;

if(ca){var cf=this.__fF;

if(cf){var cd;

for(var ce in ca){this._applyProperty(ce,cf[ce]);
}}this.__fC=null;
}},__fL:function(){var bc=this;
while(bc){if(bc.__ft){return true;
}
if(!bc.__fu||!bc.__fv){return false;
}bc=bc.__fJ;
}return false;
},__fM:function(cx){if(cx.__fJ===this){throw new Error("Child is already in: "+cx);
}
if(cx.__ft){throw new Error("Root elements could not be inserted into other ones.");
}if(cx.__fJ){cx.__fJ.remove(cx);
}cx.__fJ=this;
if(!this.__fH){this.__fH=[];
}if(this.__fs){this._scheduleChildrenUpdate();
}},__fN:function(cg){if(cg.__fJ!==this){throw new Error("Has no child: "+cg);
}if(this.__fs){this._scheduleChildrenUpdate();
}delete cg.__fJ;
},__fO:function(M){if(M.__fJ!==this){throw new Error("Has no child: "+M);
}if(this.__fs){this._scheduleChildrenUpdate();
}},getChildren:function(){return this.__fH||null;
},getChild:function(t){var u=this.__fH;
return u&&u[t]||null;
},hasChildren:function(){var j=this.__fH;
return j&&j[0]!==undefined;
},indexOf:function(V){var W=this.__fH;
return W?W.indexOf(V):-1;
},hasChild:function(dO){var dP=this.__fH;
return dP&&dP.indexOf(dO)!==-1;
},add:function(bd){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++){this.__fM(arguments[i]);
}this.__fH.push.apply(this.__fH,arguments);
}else{this.__fM(bd);
this.__fH.push(bd);
}return this;
},addAt:function(T,U){this.__fM(T);
qx.lang.Array.insertAt(this.__fH,T,U);
return this;
},remove:function(a){var b=this.__fH;

if(!b){return;
}
if(arguments[1]){var c;

for(var i=0,l=arguments.length;i<l;i++){c=arguments[i];
this.__fN(c);
qx.lang.Array.remove(b,c);
}}else{this.__fN(a);
qx.lang.Array.remove(b,a);
}return this;
},removeAt:function(dT){var dU=this.__fH;

if(!dU){throw new Error("Has no children!");
}var dV=dU[dT];

if(!dV){throw new Error("Has no child at this position!");
}this.__fN(dV);
qx.lang.Array.removeAt(this.__fH,dT);
return this;
},removeAll:function(){var dt=this.__fH;

if(dt){for(var i=0,l=dt.length;i<l;i++){this.__fN(dt[i]);
}dt.length=0;
}return this;
},getParent:function(){return this.__fJ||null;
},insertInto:function(parent,dz){parent.__fM(this);

if(dz==null){parent.__fH.push(this);
}else{qx.lang.Array.insertAt(this.__fH,this,dz);
}return this;
},insertBefore:function(C){var parent=C.__fJ;
parent.__fM(this);
qx.lang.Array.insertBefore(parent.__fH,this,C);
return this;
},insertAfter:function(dv){var parent=dv.__fJ;
parent.__fM(this);
qx.lang.Array.insertAfter(parent.__fH,this,dv);
return this;
},moveTo:function(r){var parent=this.__fJ;
parent.__fO(this);
var s=parent.__fH.indexOf(this);

if(s===r){throw new Error("Could not move to same index!");
}else if(s<r){r--;
}qx.lang.Array.removeAt(parent.__fH,s);
qx.lang.Array.insertAt(parent.__fH,this,r);
return this;
},moveBefore:function(k){var parent=this.__fJ;
return this.moveTo(parent.__fH.indexOf(k));
},moveAfter:function(bN){var parent=this.__fJ;
return this.moveTo(parent.__fH.indexOf(bN)+1);
},free:function(){var parent=this.__fJ;

if(!parent){throw new Error("Has no parent to remove from.");
}
if(!parent.__fH){return;
}parent.__fN(this);
qx.lang.Array.remove(parent.__fH,this);
return this;
},getDomElement:function(){return this.__fs||null;
},getNodeName:function(){return this.__fl;
},setNodeName:function(name){this.__fl=name;
},setRoot:function(ch){this.__ft=ch;
},useMarkup:function(A){if(this.__fs){throw new Error("Could not overwrite existing element!");
}if(qx.core.Variant.isSet(cR,cO)){var B=document.createElement(cQ);
}else{var B=qx.html.Element.__fP;

if(!B){B=qx.html.Element.__fP=document.createElement(cQ);
}}B.innerHTML=A;
this.__fs=B.firstChild;
this.__fs.$$element=this.$$hash;
this._copyData(true);
return this.__fs;
},useElement:function(dq){if(this.__fs){throw new Error("Could not overwrite existing element!");
}this.__fs=dq;
this.__fs.$$element=this.$$hash;
this._copyData(true);
},isFocusable:function(){var cF=this.getAttribute(dc);

if(cF>=1){return true;
}var cE=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(cF>=0&&cE[this.__fl]){return true;
}return false;
},setSelectable:function(S){this.setAttribute(da,S?de:cX);
if(qx.core.Variant.isSet(cR,cU)){this.setStyle(dj,S?cT:cN);
}else if(qx.core.Variant.isSet(cR,dn)){this.setStyle(cW,S?cL:di);
}},isNativelyFocusable:function(){return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this.__fl];
},include:function(){if(this.__fu){return;
}delete this.__fu;

if(this.__fJ){this.__fJ._scheduleChildrenUpdate();
}return this;
},exclude:function(){if(!this.__fu){return;
}this.__fu=false;

if(this.__fJ){this.__fJ._scheduleChildrenUpdate();
}return this;
},isIncluded:function(){return this.__fu===true;
},show:function(){if(this.__fv){return;
}
if(this.__fs){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(cS);
}if(this.__fJ){this.__fJ._scheduleChildrenUpdate();
}delete this.__fv;
},hide:function(){if(!this.__fv){return;
}
if(this.__fs){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(cS);
}this.__fv=false;
},isVisible:function(){return this.__fv===true;
},scrollChildIntoViewX:function(dD,dE,dF){var dG=this.__fs;
var dH=dD.getDomElement();

if(dF!==false&&dG&&dG.offsetWidth&&dH&&dH.offsetWidth){qx.bom.element.Scroll.intoViewX(dH,dG,dE);
}else{this.__fw={element:dD,align:dE};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(cS);
}delete this.__fy;
},scrollChildIntoViewY:function(bO,bP,bQ){var bR=this.__fs;
var bS=bO.getDomElement();

if(bQ!==false&&bR&&bR.offsetWidth&&bS&&bS.offsetWidth){qx.bom.element.Scroll.intoViewY(bS,bR,bP);
}else{this.__fx={element:bO,align:bP};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(cS);
}delete this.__fz;
},scrollToX:function(x,dA){var dB=this.__fs;

if(dA!==true&&dB&&dB.offsetWidth){dB.scrollLeft=x;
}else{this.__fy=x;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(cS);
}delete this.__fw;
},getScrollX:function(){var bM=this.__fs;

if(bM){return bM.scrollLeft;
}return this.__fy||0;
},scrollToY:function(y,m){var n=this.__fs;

if(m!==true&&n&&n.offsetWidth){n.scrollTop=y;
}else{this.__fz=y;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(cS);
}delete this.__fx;
},getScrollY:function(){var du=this.__fs;

if(du){return du.scrollTop;
}return this.__fz||0;
},disableScrolling:function(){this.enableScrolling();
this.scrollToX(0);
this.scrollToY(0);
this.addListener(cM,this.__fR,this);
},enableScrolling:function(){this.removeListener(cM,this.__fR,this);
},__fQ:null,__fR:function(e){if(!this.__fQ){this.__fQ=true;
this.__fs.scrollTop=0;
this.__fs.scrollLeft=0;
delete this.__fQ;
}},getTextSelection:function(){var dS=this.__fs;

if(dS){return qx.bom.Selection.get(dS);
}return null;
},getTextSelectionLength:function(){var cB=this.__fs;

if(cB){return qx.bom.Selection.getLength(cB);
}return null;
},getTextSelectionStart:function(){var bT=this.__fs;

if(bT){return qx.bom.Selection.getStart(bT);
}return null;
},getTextSelectionEnd:function(){var dR=this.__fs;

if(dR){return qx.bom.Selection.getEnd(dR);
}return null;
},setTextSelection:function(ci,cj){var ck=this.__fs;

if(ck){qx.bom.Selection.set(ck,ci,cj);
return;
}qx.html.Element.__fm[this.toHashCode()]={element:this,start:ci,end:cj};
qx.html.Element._scheduleFlush(cS);
},clearTextSelection:function(){var bg=this.__fs;

if(bg){qx.bom.Selection.clear(bg);
}delete qx.html.Element.__fm[this.toHashCode()];
},__fS:function(v,w){var z=qx.html.Element._actions;
z.push({type:v,element:this,args:w||[]});
qx.html.Element._scheduleFlush(cS);
},focus:function(){this.__fS(dp);
},blur:function(){this.__fS(dm);
},activate:function(){this.__fS(cV);
},deactivate:function(){this.__fS(dl);
},capture:function(g){this.__fS(dk,[g!==false]);
},releaseCapture:function(){this.__fS(dg);
},setStyle:function(cG,cH,cI){if(!this.__fD){this.__fD={};
}
if(this.__fD[cG]==cH){return;
}
if(cH==null){delete this.__fD[cG];
}else{this.__fD[cG]=cH;
}if(this.__fs){if(cI){qx.bom.element.Style.set(this.__fs,cG,cH);
return this;
}if(!this.__fA){this.__fA={};
}this.__fA[cG]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cS);
}return this;
},setStyles:function(bh,bi){var bj=qx.bom.element.Style;

if(!this.__fD){this.__fD={};
}
if(this.__fs){if(!this.__fA){this.__fA={};
}
for(var bl in bh){var bk=bh[bl];

if(this.__fD[bl]==bk){continue;
}
if(bk==null){delete this.__fD[bl];
}else{this.__fD[bl]=bk;
}if(bi){bj.set(this.__fs,bl,bk);
continue;
}this.__fA[bl]=true;
}qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cS);
}else{for(var bl in bh){var bk=bh[bl];

if(this.__fD[bl]==bk){continue;
}
if(bk==null){delete this.__fD[bl];
}else{this.__fD[bl]=bk;
}}}return this;
},removeStyle:function(cC,cD){this.setStyle(cC,null,cD);
},getStyle:function(h){return this.__fD?this.__fD[h]:null;
},getAllStyles:function(){return this.__fD||null;
},setAttribute:function(D,E,F){if(!this.__fE){this.__fE={};
}
if(this.__fE[D]==E){return;
}
if(E==null){delete this.__fE[D];
}else{this.__fE[D]=E;
}if(this.__fs){if(F){qx.bom.element.Attribute.set(this.__fs,D,E);
return this;
}if(!this.__fB){this.__fB={};
}this.__fB[D]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cS);
}return this;
},setAttributes:function(o,p){for(var q in o){this.setAttribute(q,o[q],p);
}return this;
},removeAttribute:function(dx,dy){this.setAttribute(dx,null,dy);
},getAttribute:function(ds){return this.__fE?this.__fE[ds]:null;
},_applyProperty:function(name,dQ){},_setProperty:function(bU,bV,bW){if(!this.__fF){this.__fF={};
}
if(this.__fF[bU]==bV){return;
}
if(bV==null){delete this.__fF[bU];
}else{this.__fF[bU]=bV;
}if(this.__fs){if(bW){this._applyProperty(bU,bV);
return this;
}if(!this.__fC){this.__fC={};
}this.__fC[bU]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cS);
}return this;
},_removeProperty:function(d,f){this._setProperty(d,null,f);
},_getProperty:function(dW){var dX=this.__fF;

if(!dX){return null;
}var dY=dX[dW];
return dY==null?null:dY;
},addListener:function(G,H,self,I){var J;

if(this.$$disposed){return null;
}{};

if(this.__fs){return qx.event.Registration.addListener(this.__fs,G,H,self,I);
}
if(!this.__fG){this.__fG={};
}
if(I==null){I=false;
}var K=qx.event.Manager.getNextUniqueId();
var L=G+(I?cJ:df)+K;
this.__fG[L]={type:G,listener:H,self:self,capture:I,unique:K};
return L;
},removeListener:function(bm,bn,self,bo){var bp;

if(this.$$disposed){return null;
}{};

if(this.__fs){qx.event.Registration.removeListener(this.__fs,bm,bn,self,bo);
}else{var br=this.__fG;
var bq;

if(bo==null){bo=false;
}
for(var bs in br){bq=br[bs];
if(bq.listener===bn&&bq.self===self&&bq.capture===bo&&bq.type===bm){delete br[bs];
break;
}}}return this;
},removeListenerById:function(cl){if(this.$$disposed){return null;
}
if(this.__fs){qx.event.Registration.removeListenerById(this.__fs,cl);
}else{delete this.__fG[cl];
}return this;
},hasListener:function(N,O){if(this.$$disposed){return false;
}
if(this.__fs){return qx.event.Registration.hasListener(this.__fs,N,O);
}var Q=this.__fG;
var P;

if(O==null){O=false;
}
for(var R in Q){P=Q[R];
if(P.capture===O&&P.type===N){return true;
}}return false;
}},defer:function(X){X.__fT=new qx.util.DeferredCall(X.flush,X);
},destruct:function(){var dr=this.__fs;

if(dr){qx.event.Registration.getManager(dr).removeAllListeners(dr);
dr.$$element=cP;
}
if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__fJ;

if(parent&&!parent.$$disposed){parent.remove(this);
}}this._disposeArray(cY);
this.__fE=this.__fD=this.__fG=this.__fF=this.__fB=this.__fA=this.__fC=this.__fs=this.__fJ=this.__fw=this.__fx=null;
}});
})();
(function(){var b="qx.ui.core.queue.Manager",a="useraction";
qx.Class.define(b,{statics:{__fU:false,__fV:{},__fW:0,MAX_RETRIES:10,scheduleFlush:function(c){var self=qx.ui.core.queue.Manager;
self.__fV[c]=true;

if(!self.__fU){self.__ga.schedule();
self.__fU=true;
}},flush:function(){var self=qx.ui.core.queue.Manager;
if(self.__fX){return;
}self.__fX=true;
self.__ga.cancel();
var d=self.__fV;
self.__fY(function(){while(d.visibility||d.widget||d.appearance||d.layout||d.element){if(d.widget){delete d.widget;
qx.ui.core.queue.Widget.flush();
}
if(d.visibility){delete d.visibility;
qx.ui.core.queue.Visibility.flush();
}
if(d.appearance){delete d.appearance;
qx.ui.core.queue.Appearance.flush();
}if(d.widget||d.visibility||d.appearance){continue;
}
if(d.layout){delete d.layout;
qx.ui.core.queue.Layout.flush();
}if(d.widget||d.visibility||d.appearance||d.layout){continue;
}
if(d.element){delete d.element;
qx.html.Element.flush();
}}},function(){self.__fU=false;
});
self.__fY(function(){if(d.dispose){delete d.dispose;
qx.ui.core.queue.Dispose.flush();
}},function(){self.__fX=false;
});
self.__fW=0;
},__fY:function(g,h){var self=qx.ui.core.queue.Manager;

try{g();
}catch(e){{};
self.__fU=false;
self.__fX=false;
self.__fW+=1;

if(self.__fW<=self.MAX_RETRIES){self.scheduleFlush();
}else{throw new Error("Fatal Error: Flush terminated "+(self.__fW-1)+" times in a row"+" due to exceptions in user code. The application has to be reloaded!");
}throw e;
}finally{h();
}}},defer:function(f){f.__ga=new qx.util.DeferredCall(f.flush);
qx.html.Element._scheduleFlush=f.scheduleFlush;
qx.event.Registration.addListener(window,a,f.flush);
}});
})();
(function(){var b="abstract",a="qx.event.dispatch.AbstractBubbling";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:b,construct:function(x){this._manager=x;
},members:{_getParent:function(w){throw new Error("Missing implementation");
},canDispatchEvent:function(u,event,v){return event.getBubbles();
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
qx.Class.define(a,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(b){return b.parentNode;
},canDispatchEvent:function(d,event,e){return d.nodeType!==undefined&&event.getBubbles();
}},defer:function(c){qx.event.Registration.addDispatcher(c);
}});
})();
(function(){var bf="keydown",be="qx.client",bd="keypress",bc="NumLock",bb="keyup",ba="Enter",Y="0",X="9",W="-",V="PageUp",cm="+",cl="PrintScreen",ck="gecko",cj="A",ci="Z",ch="Left",cg="F5",cf="Down",ce="Up",cd="F11",bm="F6",bn="useraction",bk="F3",bl="keyinput",bi="Insert",bj="F8",bg="End",bh="/",bu="Delete",bv="*",bH="F1",bD="F4",bP="Home",bK="F2",bY="F12",bU="PageDown",bz="F7",cc="F9",cb="F10",ca="Right",by="text",bB="Escape",bC="webkit",bF="5",bI="3",bL="Meta",bR="7",bW="CapsLock",bo="input",bp="Control",bA="Space",bO="Tab",bN="Shift",bM="Pause",bT="Unidentified",bS="qx.event.handler.Keyboard",bJ="mshtml",bQ="mshtml|webkit",S="6",bV="off",bq="Apps",br="4",bE="Alt",T="2",U="Scroll",bx="1",bs="8",bt="Win",bw="autoComplete",bG=",",bX="Backspace";
qx.Class.define(bS,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(cL){arguments.callee.base.call(this);
this.__gb=cL;
this.__gc=cL.getWindow();
if(qx.core.Variant.isSet(be,ck)){this.__gd=this.__gc;
}else{this.__gd=this.__gc.document.documentElement;
}this.__ge={};
this._initKeyObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(G){if(this._identifierToKeyCodeMap[G]){return true;
}
if(G.length!=1){return false;
}
if(G>=Y&&G<=X){return true;
}
if(G>=cj&&G<=ci){return true;
}
switch(G){case cm:case W:case bv:case bh:return true;
default:return false;
}}},members:{__gf:null,__gb:null,__gc:null,__gd:null,__ge:null,__gg:null,__gh:null,__gi:null,canHandleEvent:function(e,f){},registerEvent:function(q,r,s){},unregisterEvent:function(A,B,C){},_fireInputEvent:function(cs,ct){var cu=this.__gj();
if(cu&&cu.offsetWidth!=0){var event=qx.event.Registration.createEvent(bl,qx.event.type.KeyInput,[cs,cu,ct]);
this.__gb.dispatchEvent(cu,event);
}if(this.__gc){qx.event.Registration.fireEvent(this.__gc,bn,qx.event.type.Data,[bl]);
}},_fireSequenceEvent:function(cn,co,cp){var cq=this.__gj();
var cr=cn.keyCode;
var event=qx.event.Registration.createEvent(co,qx.event.type.KeySequence,[cn,cq,cp]);
this.__gb.dispatchEvent(cq,event);
if(qx.core.Variant.isSet(be,bQ)){if(co==bf&&event.getDefaultPrevented()){if(!this._isNonPrintableKeyCode(cr)&&!this._emulateKeyPress[cr]){this._fireSequenceEvent(cn,bd,cp);
}}}if(this.__gc){qx.event.Registration.fireEvent(this.__gc,bn,qx.event.type.Data,[co]);
}},__gj:function(){var cJ=this.__gb.getHandler(qx.event.handler.Focus);
var cK=cJ.getActive();
if(!cK||cK.offsetWidth==0){cK=cJ.getFocus();
}if(!cK||cK.offsetWidth==0){cK=this.__gb.getWindow().document.body;
}return cK;
},_initKeyObserver:function(){this.__gf=qx.lang.Function.listener(this.__gk,this);
this.__gi=qx.lang.Function.listener(this.__gm,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__gd,bb,this.__gf);
Event.addNativeListener(this.__gd,bf,this.__gf);
Event.addNativeListener(this.__gd,bd,this.__gi);
},_stopKeyObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__gd,bb,this.__gf);
Event.removeNativeListener(this.__gd,bf,this.__gf);
Event.removeNativeListener(this.__gd,bd,this.__gi);

for(var p in (this.__gh||{})){var o=this.__gh[p];
Event.removeNativeListener(o.target,bd,o.callback);
}delete (this.__gh);
},__gk:qx.event.GlobalError.observeMethod(qx.core.Variant.select(be,{"mshtml":function(cw){cw=window.event||cw;
var cz=cw.keyCode;
var cx=0;
var cy=cw.type;
if(!(this.__ge[cz]==bf&&cy==bf)){this._idealKeyHandler(cz,cx,cy,cw);
}if(cy==bf){if(this._isNonPrintableKeyCode(cz)||this._emulateKeyPress[cz]){this._idealKeyHandler(cz,cx,bd,cw);
}}this.__ge[cz]=cy;
},"gecko":function(M){var Q=this._keyCodeFix[M.keyCode]||M.keyCode;
var O=0;
var P=M.type;
if(qx.bom.client.Platform.WIN){var N=Q?this._keyCodeToIdentifier(Q):this._charCodeToIdentifier(O);

if(!(this.__ge[N]==bf&&P==bf)){this._idealKeyHandler(Q,O,P,M);
}this.__ge[N]=P;
}else{this._idealKeyHandler(Q,O,P,M);
}this.__gl(M.target,P,Q);
},"webkit":function(w){var z=0;
var x=0;
var y=w.type;
if(qx.bom.client.Engine.VERSION<525.13){if(y==bb||y==bf){z=this._charCode2KeyCode[w.charCode]||w.keyCode;
}else{if(this._charCode2KeyCode[w.charCode]){z=this._charCode2KeyCode[w.charCode];
}else{x=w.charCode;
}}this._idealKeyHandler(z,x,y,w);
}else{z=w.keyCode;
if(!(this.__ge[z]==bf&&y==bf)){this._idealKeyHandler(z,x,y,w);
}if(y==bf){if(this._isNonPrintableKeyCode(z)||this._emulateKeyPress[z]){this._idealKeyHandler(z,x,bd,w);
}}this.__ge[z]=y;
}},"opera":function(u){this.__gg=u.keyCode;
this._idealKeyHandler(u.keyCode,0,u.type,u);
}})),__gl:qx.core.Variant.select(be,{"gecko":function(g,h,i){if(h===bf&&(i==33||i==34||i==38||i==40)&&g.type==by&&g.tagName.toLowerCase()===bo&&g.getAttribute(bw)!==bV){if(!this.__gh){this.__gh={};
}var k=qx.core.ObjectRegistry.toHashCode(g);

if(this.__gh[k]){return;
}var self=this;
this.__gh[k]={target:g,callback:function(cI){qx.bom.Event.stopPropagation(cI);
self.__gm(cI);
}};
var j=qx.event.GlobalError.observeMethod(this.__gh[k].callback);
qx.bom.Event.addNativeListener(g,bd,j);
}},"default":null}),__gm:qx.event.GlobalError.observeMethod(qx.core.Variant.select(be,{"mshtml":function(l){l=window.event||l;

if(this._charCode2KeyCode[l.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[l.keyCode],0,l.type,l);
}else{this._idealKeyHandler(0,l.keyCode,l.type,l);
}},"gecko":function(a){var d=this._keyCodeFix[a.keyCode]||a.keyCode;
var b=a.charCode;
var c=a.type;
this._idealKeyHandler(d,b,c,a);
},"webkit":function(cA){if(qx.bom.client.Engine.VERSION<525.13){var cD=0;
var cB=0;
var cC=cA.type;

if(cC==bb||cC==bf){cD=this._charCode2KeyCode[cA.charCode]||cA.keyCode;
}else{if(this._charCode2KeyCode[cA.charCode]){cD=this._charCode2KeyCode[cA.charCode];
}else{cB=cA.charCode;
}}this._idealKeyHandler(cD,cB,cC,cA);
}else{if(this._charCode2KeyCode[cA.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[cA.keyCode],0,cA.type,cA);
}else{this._idealKeyHandler(0,cA.keyCode,cA.type,cA);
}}},"opera":function(D){var F=D.keyCode;
var E=D.type;
if(F!=this.__gg){this._idealKeyHandler(0,this.__gg,E,D);
}else{if(this._keyCodeToIdentifierMap[D.keyCode]){this._idealKeyHandler(D.keyCode,0,D.type,D);
}else{this._idealKeyHandler(0,D.keyCode,D.type,D);
}}}})),_idealKeyHandler:function(H,I,J,K){var L;
if(H||(!H&&!I)){L=this._keyCodeToIdentifier(H);
this._fireSequenceEvent(K,J,L);
}else{L=this._charCodeToIdentifier(I);
this._fireSequenceEvent(K,bd,L);
this._fireInputEvent(K,I);
}},_specialCharCodeMap:{8:bX,9:bO,13:ba,27:bB,32:bA},_emulateKeyPress:qx.core.Variant.select(be,{"mshtml":{8:true,9:true},"webkit":{8:true,9:true,27:true},"default":{}}),_keyCodeToIdentifierMap:{16:bN,17:bp,18:bE,20:bW,224:bL,37:ch,38:ce,39:ca,40:cf,33:V,34:bU,35:bg,36:bP,45:bi,46:bu,112:bH,113:bK,114:bk,115:bD,116:cg,117:bm,118:bz,119:bj,120:cc,121:cb,122:cd,123:bY,144:bc,44:cl,145:U,19:bM,91:bt,93:bq},_numpadToCharCode:{96:Y.charCodeAt(0),97:bx.charCodeAt(0),98:T.charCodeAt(0),99:bI.charCodeAt(0),100:br.charCodeAt(0),101:bF.charCodeAt(0),102:S.charCodeAt(0),103:bR.charCodeAt(0),104:bs.charCodeAt(0),105:X.charCodeAt(0),106:bv.charCodeAt(0),107:cm.charCodeAt(0),109:W.charCodeAt(0),110:bG.charCodeAt(0),111:bh.charCodeAt(0)},_charCodeA:cj.charCodeAt(0),_charCodeZ:ci.charCodeAt(0),_charCode0:Y.charCodeAt(0),_charCode9:X.charCodeAt(0),_isNonPrintableKeyCode:function(t){return this._keyCodeToIdentifierMap[t]?true:false;
},_isIdentifiableKeyCode:function(v){if(v>=this._charCodeA&&v<=this._charCodeZ){return true;
}if(v>=this._charCode0&&v<=this._charCode9){return true;
}if(this._specialCharCodeMap[v]){return true;
}if(this._numpadToCharCode[v]){return true;
}if(this._isNonPrintableKeyCode(v)){return true;
}return false;
},_keyCodeToIdentifier:function(m){if(this._isIdentifiableKeyCode(m)){var n=this._numpadToCharCode[m];

if(n){return String.fromCharCode(n);
}return (this._keyCodeToIdentifierMap[m]||this._specialCharCodeMap[m]||String.fromCharCode(m));
}else{return bT;
}},_charCodeToIdentifier:function(cv){return this._specialCharCodeMap[cv]||String.fromCharCode(cv).toUpperCase();
},_identifierToKeyCode:function(R){return qx.event.handler.Keyboard._identifierToKeyCodeMap[R]||R.charCodeAt(0);
}},destruct:function(){this._stopKeyObserver();
this.__gg=this.__gb=this.__gc=this.__gd=this.__ge=null;
},defer:function(cE,cF,cG){qx.event.Registration.addHandler(cE);
if(!cE._identifierToKeyCodeMap){cE._identifierToKeyCodeMap={};

for(var cH in cF._keyCodeToIdentifierMap){cE._identifierToKeyCodeMap[cF._keyCodeToIdentifierMap[cH]]=parseInt(cH,10);
}
for(var cH in cF._specialCharCodeMap){cE._identifierToKeyCodeMap[cF._specialCharCodeMap[cH]]=parseInt(cH,10);
}}
if(qx.core.Variant.isSet(be,bJ)){cF._charCode2KeyCode={13:13,27:27};
}else if(qx.core.Variant.isSet(be,ck)){cF._keyCodeFix={12:cF._identifierToKeyCode(bc)};
}else if(qx.core.Variant.isSet(be,bC)){if(qx.bom.client.Engine.VERSION<525.13){cF._charCode2KeyCode={63289:cF._identifierToKeyCode(bc),63276:cF._identifierToKeyCode(V),63277:cF._identifierToKeyCode(bU),63275:cF._identifierToKeyCode(bg),63273:cF._identifierToKeyCode(bP),63234:cF._identifierToKeyCode(ch),63232:cF._identifierToKeyCode(ce),63235:cF._identifierToKeyCode(ca),63233:cF._identifierToKeyCode(cf),63272:cF._identifierToKeyCode(bu),63302:cF._identifierToKeyCode(bi),63236:cF._identifierToKeyCode(bH),63237:cF._identifierToKeyCode(bK),63238:cF._identifierToKeyCode(bk),63239:cF._identifierToKeyCode(bD),63240:cF._identifierToKeyCode(cg),63241:cF._identifierToKeyCode(bm),63242:cF._identifierToKeyCode(bz),63243:cF._identifierToKeyCode(bj),63244:cF._identifierToKeyCode(cc),63245:cF._identifierToKeyCode(cb),63246:cF._identifierToKeyCode(cd),63247:cF._identifierToKeyCode(bY),63248:cF._identifierToKeyCode(cl),3:cF._identifierToKeyCode(ba),12:cF._identifierToKeyCode(bc),13:cF._identifierToKeyCode(ba)};
}else{cF._charCode2KeyCode={13:13,27:27};
}}}});
})();
(function(){var ba="qx.client",Y="mouseup",X="click",W="mousedown",V="contextmenu",U="mousewheel",T="dblclick",S="mshtml",R="mouseover",Q="mouseout",L="DOMMouseScroll",P="mousemove",O="on",K="mshtml|webkit|opera",J="useraction",N="gecko|webkit",M="qx.event.handler.Mouse";
qx.Class.define(M,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(F){arguments.callee.base.call(this);
this.__gn=F;
this.__go=F.getWindow();
this.__gp=this.__go.document;
this._initButtonObserver();
this._initMoveObserver();
this._initWheelObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__gq:null,__gr:null,__gs:null,__gt:null,__gu:null,__gn:null,__go:null,__gp:null,canHandleEvent:function(h,i){},registerEvent:qx.bom.client.System.IPHONE?
function(b,c,d){b[O+c]=qx.lang.Function.returnNull;
}:qx.lang.Function.returnNull,unregisterEvent:qx.bom.client.System.IPHONE?
function(C,D,E){C[O+D]=undefined;
}:qx.lang.Function.returnNull,__gv:function(v,w,x){if(!x){x=v.target||v.srcElement;
}if(x&&x.nodeType){qx.event.Registration.fireEvent(x,w||v.type,w==U?qx.event.type.MouseWheel:qx.event.type.Mouse,[v,x,null,true,true]);
}qx.event.Registration.fireEvent(this.__go,J,qx.event.type.Data,[w||v.type]);
},_initButtonObserver:function(){this.__gq=qx.lang.Function.listener(this._onButtonEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__gp,W,this.__gq);
Event.addNativeListener(this.__gp,Y,this.__gq);
Event.addNativeListener(this.__gp,X,this.__gq);
Event.addNativeListener(this.__gp,T,this.__gq);
Event.addNativeListener(this.__gp,V,this.__gq);
},_initMoveObserver:function(){this.__gr=qx.lang.Function.listener(this._onMoveEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__gp,P,this.__gr);
Event.addNativeListener(this.__gp,R,this.__gr);
Event.addNativeListener(this.__gp,Q,this.__gr);
},_initWheelObserver:function(){this.__gs=qx.lang.Function.listener(this._onWheelEvent,this);
var Event=qx.bom.Event;
var j=qx.core.Variant.isSet(ba,K)?U:L;
var k=qx.core.Variant.isSet(ba,S)?this.__gp:this.__go;
Event.addNativeListener(k,j,this.__gs);
},_stopButtonObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__gp,W,this.__gq);
Event.removeNativeListener(this.__gp,Y,this.__gq);
Event.removeNativeListener(this.__gp,X,this.__gq);
Event.removeNativeListener(this.__gp,T,this.__gq);
Event.removeNativeListener(this.__gp,V,this.__gq);
},_stopMoveObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__gp,P,this.__gr);
Event.removeNativeListener(this.__gp,R,this.__gr);
Event.removeNativeListener(this.__gp,Q,this.__gr);
},_stopWheelObserver:function(){var Event=qx.bom.Event;
var l=qx.core.Variant.isSet(ba,K)?U:L;
var m=qx.core.Variant.isSet(ba,S)?this.__gp:this.__go;
Event.removeNativeListener(m,l,this.__gs);
},_onMoveEvent:qx.event.GlobalError.observeMethod(function(r){this.__gv(r);
}),_onButtonEvent:qx.event.GlobalError.observeMethod(function(s){var t=s.type;
var u=s.target||s.srcElement;
if(qx.core.Variant.isSet(ba,N)){if(u&&u.nodeType==3){u=u.parentNode;
}}
if(this.__gw){this.__gw(s,t,u);
}
if(this.__gy){this.__gy(s,t,u);
}this.__gv(s,t,u);

if(this.__gx){this.__gx(s,t,u);
}
if(this.__gz){this.__gz(s,t,u);
}this.__gt=t;
}),_onWheelEvent:qx.event.GlobalError.observeMethod(function(y){this.__gv(y,U);
}),__gw:qx.core.Variant.select(ba,{"webkit":function(e,f,g){if(qx.bom.client.Engine.VERSION<530){if(f==V){this.__gv(e,Y,g);
}}},"default":null}),__gx:qx.core.Variant.select(ba,{"opera":function(G,H,I){if(H==Y&&G.button==2){this.__gv(G,V,I);
}},"default":null}),__gy:qx.core.Variant.select(ba,{"mshtml":function(z,A,B){if(A==Y&&this.__gt==X){this.__gv(z,W,B);
}else if(A==T){this.__gv(z,X,B);
}},"default":null}),__gz:qx.core.Variant.select(ba,{"mshtml":null,"default":function(n,o,p){switch(o){case W:this.__gu=p;
break;
case Y:if(p!==this.__gu){var q=qx.dom.Hierarchy.getCommonParent(p,this.__gu);
this.__gv(n,X,q);
}}}})},destruct:function(){this._stopButtonObserver();
this._stopMoveObserver();
this._stopWheelObserver();
this.__gn=this.__go=this.__gp=this.__gu=null;
},defer:function(a){qx.event.Registration.addHandler(a);
}});
})();
(function(){var a="qx.event.handler.Capture";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(b,c){},registerEvent:function(g,h,i){},unregisterEvent:function(d,e,f){}},defer:function(j){qx.event.Registration.addHandler(j);
}});
})();
(function(){var l="alias",k="copy",j="blur",i="mouseout",h="keydown",g="Ctrl",f="Shift",d="mousemove",c="move",b="mouseover",B="Alt",A="keyup",z="mouseup",y="dragend",x="on",w="mousedown",v="qxDraggable",u="drag",t="drop",s="qxDroppable",q="qx.event.handler.DragDrop",r="droprequest",o="dragstart",p="dragchange",m="dragleave",n="dragover";
qx.Class.define(q,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(bh){arguments.callee.base.call(this);
this.__gA=bh;
this.__gB=bh.getWindow().document.documentElement;
this.__gA.addListener(this.__gB,w,this._onMouseDown,this);
this.__gN();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__gA:null,__gB:null,__gC:null,__gD:null,__gE:null,__gF:null,__gG:null,__gH:null,__gI:null,__gJ:null,__gK:false,__gL:0,__gM:0,canHandleEvent:function(V,W){},registerEvent:function(bj,bk,bl){},unregisterEvent:function(be,bf,bg){},addType:function(C){this.__gE[C]=true;
},addAction:function(T){this.__gF[T]=true;
},supportsType:function(E){return !!this.__gE[E];
},supportsAction:function(bm){return !!this.__gF[bm];
},getData:function(a){if(!this.__gU||!this.__gC){throw new Error("This method must not be used outside the drop event listener!");
}
if(!this.__gE[a]){throw new Error("Unsupported data type: "+a+"!");
}
if(!this.__gH[a]){this.__gI=a;
this.__gP(r,this.__gD,this.__gC,false);
}
if(!this.__gH[a]){throw new Error("Please use a droprequest listener to the drag source to fill the manager with data!");
}return this.__gH[a]||null;
},getCurrentAction:function(){return this.__gJ;
},addData:function(bb,bc){this.__gH[bb]=bc;
},getCurrentType:function(){return this.__gI;
},__gN:function(){this.__gE={};
this.__gF={};
this.__gG={};
this.__gH={};
},__gO:function(){var Q=this.__gF;
var O=this.__gG;
var P=null;

if(this.__gU){if(O.Shift&&O.Ctrl&&Q.alias){P=l;
}else if(O.Shift&&O.Alt&&Q.copy){P=k;
}else if(O.Shift&&Q.move){P=c;
}else if(O.Alt&&Q.alias){P=l;
}else if(O.Ctrl&&Q.copy){P=k;
}else if(Q.move){P=c;
}else if(Q.copy){P=k;
}else if(Q.alias){P=l;
}}
if(P!=this.__gJ){this.__gJ=P;
this.__gP(p,this.__gD,this.__gC,false);
}},__gP:function(F,G,H,I,J){var L=qx.event.Registration;
var K=L.createEvent(F,qx.event.type.Drag,[I,J]);

if(G!==H){K.setRelatedTarget(H);
}return L.dispatchEvent(G,K);
},__gQ:function(R){while(R&&R.nodeType==1){if(R.getAttribute(v)==x){return R;
}R=R.parentNode;
}return null;
},__gR:function(bd){while(bd&&bd.nodeType==1){if(bd.getAttribute(s)==x){return bd;
}bd=bd.parentNode;
}return null;
},__gS:function(){this.__gD=null;
this.__gA.removeListener(this.__gB,d,this._onMouseMove,this,true);
this.__gA.removeListener(this.__gB,z,this._onMouseUp,this,true);
qx.event.Registration.removeListener(window,j,this._onWindowBlur,this);
this.__gN();
},__gT:function(){if(this.__gK){this.__gA.removeListener(this.__gB,b,this._onMouseOver,this,true);
this.__gA.removeListener(this.__gB,i,this._onMouseOut,this,true);
this.__gA.removeListener(this.__gB,h,this._onKeyDown,this,true);
this.__gA.removeListener(this.__gB,A,this._onKeyUp,this,true);
this.__gP(y,this.__gD,this.__gC,false);
this.__gK=false;
}this.__gU=false;
this.__gC=null;
this.__gS();
},__gU:false,_onWindowBlur:function(e){this.__gT();
},_onKeyDown:function(e){var bi=e.getKeyIdentifier();

switch(bi){case B:case g:case f:if(!this.__gG[bi]){this.__gG[bi]=true;
this.__gO();
}}},_onKeyUp:function(e){var X=e.getKeyIdentifier();

switch(X){case B:case g:case f:if(this.__gG[X]){this.__gG[X]=false;
this.__gO();
}}},_onMouseDown:function(e){if(this.__gK){return;
}var S=this.__gQ(e.getTarget());

if(S){this.__gL=e.getDocumentLeft();
this.__gM=e.getDocumentTop();
this.__gD=S;
this.__gA.addListener(this.__gB,d,this._onMouseMove,this,true);
this.__gA.addListener(this.__gB,z,this._onMouseUp,this,true);
qx.event.Registration.addListener(window,j,this._onWindowBlur,this);
}},_onMouseUp:function(e){if(this.__gU){this.__gP(t,this.__gC,this.__gD,false,e);
}if(this.__gK){e.stopPropagation();
}this.__gT();
},_onMouseMove:function(e){if(this.__gK){if(!this.__gP(u,this.__gD,this.__gC,true,e)){this.__gT();
}}else{if(Math.abs(e.getDocumentLeft()-this.__gL)>3||Math.abs(e.getDocumentTop()-this.__gM)>3){if(this.__gP(o,this.__gD,this.__gC,true,e)){this.__gK=true;
this.__gA.addListener(this.__gB,b,this._onMouseOver,this,true);
this.__gA.addListener(this.__gB,i,this._onMouseOut,this,true);
this.__gA.addListener(this.__gB,h,this._onKeyDown,this,true);
this.__gA.addListener(this.__gB,A,this._onKeyUp,this,true);
var D=this.__gG;
D.Ctrl=e.isCtrlPressed();
D.Shift=e.isShiftPressed();
D.Alt=e.isAltPressed();
this.__gO();
}else{this.__gP(y,this.__gD,this.__gC,false);
this.__gS();
}}}},_onMouseOver:function(e){var M=e.getTarget();
var N=this.__gR(M);

if(N&&N!=this.__gC){this.__gU=this.__gP(n,N,this.__gD,true,e);
this.__gC=N;
this.__gO();
}},_onMouseOut:function(e){var ba=this.__gR(e.getTarget());
var Y=this.__gR(e.getRelatedTarget());

if(ba&&ba!==Y&&ba==this.__gC){this.__gP(m,this.__gC,Y,false,e);
this.__gC=null;
this.__gU=false;
qx.event.Timer.once(this.__gO,this,0);
}}},destruct:function(){this.__gD=this.__gC=this.__gA=this.__gB=this.__gE=this.__gF=this.__gG=this.__gH=null;
},defer:function(U){qx.event.Registration.addHandler(U);
}});
})();
(function(){var e="-",d="qx.event.handler.Element";
qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(h){arguments.callee.base.call(this);
this._manager=h;
this._registeredEvents={};
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,scroll:true,select:true,reset:true,submit:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(f,g){},registerEvent:function(u,v,w){var z=qx.core.ObjectRegistry.toHashCode(u);
var x=z+e+v;
var y=qx.lang.Function.listener(this._onNative,this,x);
qx.bom.Event.addNativeListener(u,v,y);
this._registeredEvents[x]={element:u,type:v,listener:y};
},unregisterEvent:function(j,k,l){var o=this._registeredEvents;

if(!o){return;
}var p=qx.core.ObjectRegistry.toHashCode(j);
var m=p+e+k;
var n=this._registeredEvents[m];
qx.bom.Event.removeNativeListener(j,k,n.listener);
delete this._registeredEvents[m];
},_onNative:qx.event.GlobalError.observeMethod(function(q,r){var t=this._registeredEvents;

if(!t){return;
}var s=t[r];
qx.event.Registration.fireNonBubblingEvent(s.element,s.type,qx.event.type.Native,[q]);
})},destruct:function(){var a;
var b=this._registeredEvents;

for(var c in b){a=b[c];
qx.bom.Event.removeNativeListener(a.element,a.type,a.listener);
}this._manager=this._registeredEvents=null;
},defer:function(i){qx.event.Registration.addHandler(i);
}});
})();
(function(){var d="qx.event.handler.Appear",c="disappear",b="appear";
qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(a){arguments.callee.base.call(this);
this.__gV=a;
this.__gW={};
qx.event.handler.Appear.__gX[this.$$hash]=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__gX:{},refresh:function(){var q=this.__gX;

for(var r in q){q[r].refresh();
}}},members:{__gV:null,__gW:null,canHandleEvent:function(o,p){},registerEvent:function(j,k,l){var m=qx.core.ObjectRegistry.toHashCode(j)+k;
var n=this.__gW;

if(n&&!n[m]){n[m]=j;
j.$$displayed=j.offsetWidth>0;
}},unregisterEvent:function(e,f,g){var h=qx.core.ObjectRegistry.toHashCode(e)+f;
var i=this.__gW;

if(!i){return;
}
if(i[h]){delete i[h];
}},refresh:function(){var w=this.__gW;
var x;

for(var v in w){x=w[v];
var t=x.offsetWidth>0;

if((!!x.$$displayed)!==t){x.$$displayed=t;
var u=qx.event.Registration.createEvent(t?b:c);
this.__gV.dispatchEvent(x,u);
}}}},destruct:function(){this.__gV=this.__gW=null;
delete qx.event.handler.Appear.__gX[this.$$hash];
},defer:function(s){qx.event.Registration.addHandler(s);
}});
})();
(function(){var n="mshtml",m="",k="qx.client",h=">",g="<",f=" ",e="='",d="qx.bom.Element",c="div",b="' ",a="></";
qx.Class.define(d,{statics:{__gY:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},create:function(name,V,W){if(!W){W=window;
}
if(!name){throw new Error("The tag name is missing!");
}var Y=this.__gY;
var X=m;

for(var bb in V){if(Y[bb]){X+=bb+e+V[bb]+b;
}}var bc;
if(X!=m){if(qx.bom.client.Engine.MSHTML){bc=W.document.createElement(g+name+f+X+h);
}else{var ba=W.document.createElement(c);
ba.innerHTML=g+name+f+X+a+name+h;
bc=ba.firstChild;
}}else{bc=W.document.createElement(name);
}
for(var bb in V){if(!Y[bb]){qx.bom.element.Attribute.set(bc,bb,V[bb]);
}}return bc;
},empty:function(B){return B.innerHTML=m;
},addListener:function(M,N,O,self,P){return qx.event.Registration.addListener(M,N,O,self,P);
},removeListener:function(C,D,E,self,F){return qx.event.Registration.removeListener(C,D,E,self,F);
},removeListenerById:function(J,K){return qx.event.Registration.removeListenerById(J,K);
},hasListener:function(R,S,T){return qx.event.Registration.hasListener(R,S,T);
},focus:function(U){qx.event.Registration.getManager(U).getHandler(qx.event.handler.Focus).focus(U);
},blur:function(G){qx.event.Registration.getManager(G).getHandler(qx.event.handler.Focus).blur(G);
},activate:function(Q){qx.event.Registration.getManager(Q).getHandler(qx.event.handler.Focus).activate(Q);
},deactivate:function(L){qx.event.Registration.getManager(L).getHandler(qx.event.handler.Focus).deactivate(L);
},capture:function(H,I){qx.event.Registration.getManager(H).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(H,I);
},releaseCapture:function(o){qx.event.Registration.getManager(o).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(o);
},clone:function(p,q){var t;

if(q||(qx.core.Variant.isSet(k,n)&&!qx.xml.Document.isXmlDocument(p))){var x=qx.event.Registration.getManager(p);
var r=qx.dom.Hierarchy.getDescendants(p);
r.push(p);
}if(qx.core.Variant.isSet(k,n)){for(var i=0,l=r.length;i<l;i++){x.toggleAttachedEvents(r[i],false);
}}var t=p.cloneNode(true);
if(qx.core.Variant.isSet(k,n)){for(var i=0,l=r.length;i<l;i++){x.toggleAttachedEvents(r[i],true);
}}if(q===true){var A=qx.dom.Hierarchy.getDescendants(t);
A.push(t);
var s,v,z,u;

for(var i=0,y=r.length;i<y;i++){z=r[i];
s=x.serializeListeners(z);

if(s.length>0){v=A[i];

for(var j=0,w=s.length;j<w;j++){u=s[j];
x.addListener(v,u.type,u.handler,u.self,u.capture);
}}}}return t;
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
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(d,e,f){arguments.callee.base.call(this,d,e,null,true,true);
this._charCode=f;
return this;
},clone:function(b){var c=arguments.callee.base.call(this,b);
c._charCode=this._charCode;
return c;
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
(function(){var L="qx.client",K="blur",J="focus",I="mousedown",H="on",G="mouseup",F="DOMFocusOut",E="DOMFocusIn",D="selectstart",C="onmousedown",bf="onfocusout",be="onfocusin",bd="onmouseup",bc="onselectstart",bb="draggesture",ba="qx.event.handler.Focus",Y="_applyFocus",X="deactivate",W="textarea",V="_applyActive",S="input",T="focusin",Q="qxSelectable",R="tabIndex",O="off",P="activate",M="focusout",N="qxKeepFocus",U="qxKeepActive";
qx.Class.define(ba,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(bm){arguments.callee.base.call(this);
this._manager=bm;
this._window=bm.getWindow();
this._document=this._window.document;
this._root=this._document.documentElement;
this._body=this._document.body;
this._initObserver();
},properties:{active:{apply:V,nullable:true},focus:{apply:Y,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Variant.select("qx.client",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__ha:null,__hb:null,__hc:null,__hd:null,__he:null,__hf:null,__hg:null,__hh:null,__hi:null,__hj:null,canHandleEvent:function(bk,bl){},registerEvent:function(bH,bI,bJ){},unregisterEvent:function(bz,bA,bB){},focus:function(bg){try{bg.focus();
}catch(bG){}this.setFocus(bg);
this.setActive(bg);
},activate:function(bL){this.setActive(bL);
},blur:function(f){try{f.blur();
}catch(br){}
if(this.getActive()===f){this.resetActive();
}
if(this.getFocus()===f){this.resetFocus();
}},deactivate:function(m){if(this.getActive()===m){this.resetActive();
}},tryActivate:function(bD){var bE=this.__hy(bD);

if(bE){this.setActive(bE);
}},__hk:function(g,h,i,j){var l=qx.event.Registration;
var k=l.createEvent(i,qx.event.type.Focus,[g,h,j]);
l.dispatchEvent(g,k);
},_windowFocused:true,__hl:function(){if(this._windowFocused){this._windowFocused=false;
this.__hk(this._window,null,K,false);
}},__hm:function(){if(!this._windowFocused){this._windowFocused=true;
this.__hk(this._window,null,J,false);
}},_initObserver:qx.core.Variant.select(L,{"gecko":function(){this.__ha=qx.lang.Function.listener(this.__hs,this);
this.__hb=qx.lang.Function.listener(this.__ht,this);
this.__hc=qx.lang.Function.listener(this.__hr,this);
this.__hd=qx.lang.Function.listener(this.__hq,this);
this.__he=qx.lang.Function.listener(this.__hn,this);
this._document.addEventListener(I,this.__ha,true);
this._document.addEventListener(G,this.__hb,true);
this._window.addEventListener(J,this.__hc,true);
this._window.addEventListener(K,this.__hd,true);
this._window.addEventListener(bb,this.__he,true);
},"mshtml":function(){this.__ha=qx.lang.Function.listener(this.__hs,this);
this.__hb=qx.lang.Function.listener(this.__ht,this);
this.__hg=qx.lang.Function.listener(this.__ho,this);
this.__hh=qx.lang.Function.listener(this.__hp,this);
this.__hf=qx.lang.Function.listener(this.__hv,this);
this._document.attachEvent(C,this.__ha);
this._document.attachEvent(bd,this.__hb);
this._document.attachEvent(be,this.__hg);
this._document.attachEvent(bf,this.__hh);
this._document.attachEvent(bc,this.__hf);
},"webkit":function(){this.__ha=qx.lang.Function.listener(this.__hs,this);
this.__hb=qx.lang.Function.listener(this.__ht,this);
this.__hh=qx.lang.Function.listener(this.__hp,this);
this.__hc=qx.lang.Function.listener(this.__hr,this);
this.__hd=qx.lang.Function.listener(this.__hq,this);
this.__hf=qx.lang.Function.listener(this.__hv,this);
this._document.addEventListener(I,this.__ha,true);
this._document.addEventListener(G,this.__hb,true);
this._document.addEventListener(D,this.__hf,false);
this._window.addEventListener(F,this.__hh,true);
this._window.addEventListener(J,this.__hc,true);
this._window.addEventListener(K,this.__hd,true);
},"opera":function(){this.__ha=qx.lang.Function.listener(this.__hs,this);
this.__hb=qx.lang.Function.listener(this.__ht,this);
this.__hg=qx.lang.Function.listener(this.__ho,this);
this.__hh=qx.lang.Function.listener(this.__hp,this);
this._document.addEventListener(I,this.__ha,true);
this._document.addEventListener(G,this.__hb,true);
this._window.addEventListener(E,this.__hg,true);
this._window.addEventListener(F,this.__hh,true);
}}),_stopObserver:qx.core.Variant.select(L,{"gecko":function(){this._document.removeEventListener(I,this.__ha,true);
this._document.removeEventListener(G,this.__hb,true);
this._window.removeEventListener(J,this.__hc,true);
this._window.removeEventListener(K,this.__hd,true);
this._window.removeEventListener(bb,this.__he,true);
},"mshtml":function(){qx.bom.Event.removeNativeListener(this._document,C,this.__ha);
qx.bom.Event.removeNativeListener(this._document,bd,this.__hb);
qx.bom.Event.removeNativeListener(this._document,be,this.__hg);
qx.bom.Event.removeNativeListener(this._document,bf,this.__hh);
qx.bom.Event.removeNativeListener(this._document,bc,this.__hf);
},"webkit":function(){this._document.removeEventListener(I,this.__ha,true);
this._document.removeEventListener(D,this.__hf,false);
this._window.removeEventListener(E,this.__hg,true);
this._window.removeEventListener(F,this.__hh,true);
this._window.removeEventListener(J,this.__hc,true);
this._window.removeEventListener(K,this.__hd,true);
},"opera":function(){this._document.removeEventListener(I,this.__ha,true);
this._window.removeEventListener(E,this.__hg,true);
this._window.removeEventListener(F,this.__hh,true);
this._window.removeEventListener(J,this.__hc,true);
this._window.removeEventListener(K,this.__hd,true);
}}),__hn:qx.event.GlobalError.observeMethod(qx.core.Variant.select(L,{"gecko":function(e){if(!this.__hz(e.target)){qx.bom.Event.preventDefault(e);
}},"default":null})),__ho:qx.event.GlobalError.observeMethod(qx.core.Variant.select(L,{"mshtml":function(e){this.__hm();
var bp=e.srcElement;
var bo=this.__hx(bp);

if(bo){this.setFocus(bo);
}this.tryActivate(bp);
},"opera":function(e){var bj=e.target;

if(bj==this._document||bj==this._window){this.__hm();

if(this.__hi){this.setFocus(this.__hi);
delete this.__hi;
}
if(this.__hj){this.setActive(this.__hj);
delete this.__hj;
}}else{this.setFocus(bj);
this.tryActivate(bj);
if(!this.__hz(bj)){bj.selectionStart=0;
bj.selectionEnd=0;
}}},"default":null})),__hp:qx.event.GlobalError.observeMethod(qx.core.Variant.select(L,{"mshtml":function(e){if(!e.toElement){this.__hl();
this.resetFocus();
this.resetActive();
}},"webkit":function(e){var bK=e.target;

if(bK===this.getFocus()){this.resetFocus();
}
if(bK===this.getActive()){this.resetActive();
}},"opera":function(e){var bs=e.target;

if(bs==this._document){this.__hl();
this.__hi=this.getFocus();
this.__hj=this.getActive();
this.resetFocus();
this.resetActive();
}else{if(bs===this.getFocus()){this.resetFocus();
}
if(bs===this.getActive()){this.resetActive();
}}},"default":null})),__hq:qx.event.GlobalError.observeMethod(qx.core.Variant.select(L,{"gecko":function(e){if(e.target===this._window||e.target===this._document){this.__hl();
this.resetActive();
this.resetFocus();
}},"webkit":function(e){if(e.target===this._window||e.target===this._document){this.__hl();
this.__hi=this.getFocus();
this.__hj=this.getActive();
this.resetActive();
this.resetFocus();
}},"default":null})),__hr:qx.event.GlobalError.observeMethod(qx.core.Variant.select(L,{"gecko":function(e){var bt=e.target;

if(bt===this._window||bt===this._document){this.__hm();
bt=this._body;
}this.setFocus(bt);
this.tryActivate(bt);
},"webkit":function(e){var bq=e.target;

if(bq===this._window||bq===this._document){this.__hm();

if(this.__hi){this.setFocus(this.__hi);
delete this.__hi;
}
if(this.__hj){this.setActive(this.__hj);
delete this.__hj;
}}else{this.setFocus(bq);
this.tryActivate(bq);
}},"default":null})),__hs:qx.event.GlobalError.observeMethod(qx.core.Variant.select(L,{"gecko":function(e){var bF=this.__hx(e.target);

if(!bF){qx.bom.Event.preventDefault(e);
}},"mshtml":function(e){var o=e.srcElement;
var n=this.__hx(o);

if(n){if(!this.__hz(o)){o.unselectable=H;
try{document.selection.empty();
}catch(e){}try{n.focus();
}catch(e){}}}else{qx.bom.Event.preventDefault(e);
if(!this.__hz(o)){o.unselectable=H;
}}},"webkit":function(e){var by=e.target;
var bx=this.__hx(by);

if(bx){this.setFocus(bx);
}else{qx.bom.Event.preventDefault(e);
}},"opera":function(e){var t=e.target;
var r=this.__hx(t);

if(!this.__hz(t)){qx.bom.Event.preventDefault(e);
if(r){var s=this.getFocus();

if(s&&s.selectionEnd){s.selectionStart=0;
s.selectionEnd=0;
s.blur();
}if(r){this.setFocus(r);
}}}else if(r){this.setFocus(r);
}},"default":null})),__ht:qx.event.GlobalError.observeMethod(qx.core.Variant.select(L,{"mshtml":function(e){var u=e.srcElement;

if(u.unselectable){u.unselectable=O;
}this.tryActivate(this.__hu(u));
},"gecko":function(e){var bC=e.target;

while(bC&&bC.offsetWidth===undefined){bC=bC.parentNode;
}
if(bC){this.tryActivate(bC);
}},"webkit|opera":function(e){this.tryActivate(this.__hu(e.target));
},"default":null})),__hu:qx.event.GlobalError.observeMethod(qx.core.Variant.select(L,{"mshtml|webkit":function(p){var q=this.getFocus();

if(q&&p!=q&&(q.nodeName.toLowerCase()===S||q.nodeName.toLowerCase()===W)){p=q;
}return p;
},"default":function(d){return d;
}})),__hv:qx.event.GlobalError.observeMethod(qx.core.Variant.select(L,{"mshtml|webkit":function(e){var bn=qx.bom.client.Engine.MSHTML?e.srcElement:e.target;

if(!this.__hz(bn)){qx.bom.Event.preventDefault(e);
}},"default":null})),__hw:function(bu){var bv=qx.bom.element.Attribute.get(bu,R);

if(bv>=1){return true;
}var bw=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(bv>=0&&bw[bu.tagName]){return true;
}return false;
},__hx:function(v){while(v&&v.nodeType===1){if(v.getAttribute(N)==H){return null;
}
if(this.__hw(v)){return v;
}v=v.parentNode;
}return this._body;
},__hy:function(y){var z=y;

while(y&&y.nodeType===1){if(y.getAttribute(U)==H){return null;
}y=y.parentNode;
}return z;
},__hz:function(A){while(A&&A.nodeType===1){var B=A.getAttribute(Q);

if(B!=null){return B===H;
}A=A.parentNode;
}return true;
},_applyActive:function(bh,bi){if(bi){this.__hk(bi,bh,X,true);
}
if(bh){this.__hk(bh,bi,P,true);
}},_applyFocus:function(w,x){if(x){this.__hk(x,w,M,true);
}
if(w){this.__hk(w,x,T,true);
}if(x){this.__hk(x,w,K,false);
}
if(w){this.__hk(w,x,J,false);
}}},destruct:function(){this._stopObserver();
this._manager=this._window=this._document=this._root=this._body=this.__hA=null;
},defer:function(a){qx.event.Registration.addHandler(a);
var b=a.FOCUSABLE_ELEMENTS;

for(var c in b){b[c.toUpperCase()]=1;
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
qx.Class.define(f,{statics:{__hB:{names:{"class":c,"for":x,html:q,text:qx.core.Variant.isSet(i,n)?r:b,colspan:l,rowspan:e,valign:d,datetime:o,accesskey:g,tabindex:p,maxlength:m,readonly:h,longdesc:w,cellpadding:k,cellspacing:v,frameborder:u,usemap:s},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readonly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:j,maxLength:10000000,className:j,innerHTML:j,innerText:j,textContent:j,htmlFor:j,tabIndex:0},original:{href:1,src:1,type:1}},compile:function(y){var z=[];
var B=this.__hB.runtime;

for(var A in y){if(!B[A]){z.push(A,t,y[A],a);
}}return z.join(j);
},get:qx.core.Variant.select(i,{"mshtml":function(I,name){var K=this.__hB;
var J;
name=K.names[name]||name;
if(K.original[name]){J=I.getAttribute(name,2);
}else if(K.property[name]){if(K.propertyDefault[name]&&J==K.propertyDefault[name]){return null;
}J=I[name];
}else{J=I.getAttribute(name);
}if(K.bools[name]){return !!J;
}return J;
},"default":function(F,name){var H=this.__hB;
var G;
name=H.names[name]||name;
if(H.property[name]){if(H.propertyDefault[name]&&G==H.propertyDefault[name]){return null;
}G=F[name];

if(G==null){G=F.getAttribute(name);
}}else{G=F.getAttribute(name);
}if(H.bools[name]){return !!G;
}return G;
}}),set:function(C,name,D){var E=this.__hB;
name=E.names[name]||name;
if(E.bools[name]){D=!!D;
}if(E.property[name]){if(D==null){D=E.propertyDefault[name];

if(D===undefined){D=null;
}}C[name]=D;
}else{if(D===true){C.setAttribute(name,name);
}else if(D===false||D===null){C.removeAttribute(name);
}else{C.setAttribute(name,D);
}}},reset:function(L,name){this.set(L,name,null);
}}});
})();
(function(){var i="left",h="right",g="middle",f="qx.client",e="dblclick",d="click",c="none",b="contextmenu",a="qx.event.type.Mouse";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(l,m,n,o,p){arguments.callee.base.call(this,l,m,n,o,p);

if(!n){this._relatedTarget=qx.bom.Event.getRelatedTarget(l);
}return this;
},_cloneNativeEvent:function(q,r){var r=arguments.callee.base.call(this,q,r);
r.button=q.button;
r.clientX=q.clientX;
r.clientY=q.clientY;
r.pageX=q.pageX;
r.pageY=q.pageY;
r.screenX=q.screenX;
r.screenY=q.screenY;
r.wheelDelta=q.wheelDelta;
r.detail=q.detail;
r.srcElement=q.srcElement;
return r;
},__hC:qx.core.Variant.select(f,{"mshtml":{1:i,2:h,4:g},"default":{0:i,2:h,1:g}}),stop:function(){this.stopPropagation();
},getButton:function(){switch(this._type){case d:case e:return i;
case b:return h;
default:return this.__hC[this._native.button]||c;
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
qx.Bootstrap.define(u,{statics:{UNKNOWN:true,NAME:"unknown",TITLE:"unknown 0.0",VERSION:0.0,FULLVERSION:"0.0.0",__hD:function(B){var C=navigator.userAgent;
var E=new RegExp(s+B+d);
var F=C.match(E);

if(!F){return;
}var name=F[1].toLowerCase();
var D=F[3];
if(C.match(/Version(\/| )([0-9]+\.[0-9])/)){D=RegExp.$2;
}
if(qx.core.Variant.isSet(j,m)){if(name===g){name=e;
}else if(C.indexOf(a)!==-1||C.indexOf(l)!==-1){name=w;
}}else if(qx.core.Variant.isSet(j,q)){if(name===h){name=i;
if(qx.bom.client.System.WINCE&&name===i){name=c;
D=n;
}}}else if(qx.core.Variant.isSet(j,r)){if(name===b){name=x;
}else if(name===t){name=f;
}}this.NAME=name;
this.FULLVERSION=D;
this.VERSION=parseFloat(D,10);
this.TITLE=name+" "+this.VERSION;
this.UNKNOWN=false;
}},defer:qx.core.Variant.select(j,{"webkit":function(A){A.__hD(o);
},"gecko":function(y){y.__hD(k);
},"mshtml":function(G){G.__hD(v);
},"opera":function(z){z.__hD(p);
}})});
})();
(function(){var u="qx.client",t="qx.dom.Hierarchy",s="previousSibling",r="*",q="nextSibling",p="parentNode";
qx.Class.define(t,{statics:{getNodeIndex:function(S){var T=0;

while(S&&(S=S.previousSibling)){T++;
}return T;
},getElementIndex:function(m){var n=0;
var o=qx.dom.Node.ELEMENT;

while(m&&(m=m.previousSibling)){if(m.nodeType==o){n++;
}}return n;
},getNextElementSibling:function(R){while(R&&(R=R.nextSibling)&&!qx.dom.Node.isElement(R)){continue;
}return R||null;
},getPreviousElementSibling:function(H){while(H&&(H=H.previousSibling)&&!qx.dom.Node.isElement(H)){continue;
}return H||null;
},contains:qx.core.Variant.select(u,{"webkit|mshtml|opera":function(x,y){if(qx.dom.Node.isDocument(x)){var z=qx.dom.Node.getDocument(y);
return x&&z==x;
}else if(qx.dom.Node.isDocument(y)){return false;
}else{return x.contains(y);
}},"gecko":function(A,B){return !!(A.compareDocumentPosition(B)&16);
},"default":function(i,j){while(j){if(i==j){return true;
}j=j.parentNode;
}return false;
}}),isRendered:function(g){if(!g.offsetParent){return false;
}var h=g.ownerDocument||g.document;
if(h.body.contains){return h.body.contains(g);
}if(h.compareDocumentPosition){return !!(h.compareDocumentPosition(g)&16);
}throw new Error("Missing support for isRendered()!");
},isDescendantOf:function(I,J){return this.contains(J,I);
},getCommonParent:qx.core.Variant.select(u,{"mshtml|opera":function(k,l){if(k===l){return k;
}
while(k&&qx.dom.Node.isElement(k)){if(k.contains(l)){return k;
}k=k.parentNode;
}return null;
},"default":function(K,L){if(K===L){return K;
}var M={};
var P=qx.core.ObjectRegistry;
var O,N;

while(K||L){if(K){O=P.toHashCode(K);

if(M[O]){return M[O];
}M[O]=K;
K=K.parentNode;
}
if(L){N=P.toHashCode(L);

if(M[N]){return M[N];
}M[N]=L;
L=L.parentNode;
}}return null;
}}),getAncestors:function(w){return this._recursivelyCollect(w,p);
},getChildElements:function(U){U=U.firstChild;

if(!U){return [];
}var V=this.getNextSiblings(U);

if(U.nodeType===1){V.unshift(U);
}return V;
},getDescendants:function(v){return qx.lang.Array.fromCollection(v.getElementsByTagName(r));
},getFirstDescendant:function(b){b=b.firstChild;

while(b&&b.nodeType!=1){b=b.nextSibling;
}return b;
},getLastDescendant:function(C){C=C.lastChild;

while(C&&C.nodeType!=1){C=C.previousSibling;
}return C;
},getPreviousSiblings:function(a){return this._recursivelyCollect(a,s);
},getNextSiblings:function(G){return this._recursivelyCollect(G,q);
},_recursivelyCollect:function(c,d){var e=[];

while(c=c[d]){if(c.nodeType==1){e.push(c);
}}return e;
},getSiblings:function(Q){return this.getPreviousSiblings(Q).reverse().concat(this.getNextSiblings(Q));
},isEmpty:function(f){f=f.firstChild;

while(f){if(f.nodeType===qx.dom.Node.ELEMENT||f.nodeType===qx.dom.Node.TEXT){return false;
}f=f.nextSibling;
}return true;
},cleanWhitespace:function(D){var E=D.firstChild;

while(E){var F=E.nextSibling;

if(E.nodeType==3&&!/\S/.test(E.nodeValue)){D.removeChild(E);
}E=F;
}}}});
})();
(function(){var b="qx.client",a="qx.event.type.Drag";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(h,i){arguments.callee.base.call(this,true,h);

if(i){this._native=i.getNativeEvent()||null;
this._originalTarget=i.getTarget()||null;
}else{this._native=null;
this._originalTarget=null;
}return this;
},clone:function(n){var o=arguments.callee.base.call(this,n);
o._native=this._native;
return o;
},getDocumentLeft:qx.core.Variant.select(b,{"mshtml":function(){if(this._native==null){return 0;
}var c=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(c);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(b,{"mshtml":function(){if(this._native==null){return 0;
}var l=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(l);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageY;
}}),getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);
},addType:function(j){this.getManager().addType(j);
},addAction:function(g){this.getManager().addAction(g);
},supportsType:function(d){return this.getManager().supportsType(d);
},supportsAction:function(k){return this.getManager().supportsAction(k);
},addData:function(e,f){this.getManager().addData(e,f);
},getData:function(m){return this.getManager().getData(m);
},getCurrentType:function(){return this.getManager().getCurrentType();
},getCurrentAction:function(){return this.getManager().getCurrentAction();
}}});
})();
(function(){var h="losecapture",g="qx.client",f="blur",e="focus",d="click",c="qx.event.dispatch.MouseCapture",b="capture",a="scroll";
qx.Class.define(c,{extend:qx.event.dispatch.AbstractBubbling,construct:function(l,m){arguments.callee.base.call(this,l);
this.__hE=l.getWindow();
this.__hF=m;
l.addListener(this.__hE,f,this.releaseCapture,this);
l.addListener(this.__hE,e,this.releaseCapture,this);
l.addListener(this.__hE,a,this.releaseCapture,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__hF:null,__hG:null,__hH:true,__hE:null,_getParent:function(i){return i.parentNode;
},canDispatchEvent:function(p,event,q){return (this.__hG&&this.__hI[q]);
},dispatchEvent:function(s,event,t){if(t==d){event.stopPropagation();
this.releaseCapture();
return;
}
if(this.__hH||!qx.dom.Hierarchy.contains(this.__hG,s)){s=this.__hG;
}arguments.callee.base.call(this,s,event,t);
},__hI:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(u,v){var v=v!==false;

if(this.__hG===u&&this.__hH==v){return;
}
if(this.__hG){this.releaseCapture();
}this.nativeSetCapture(u,v);

if(this.hasNativeCapture){var self=this;
qx.bom.Event.addNativeListener(u,h,function(){qx.bom.Event.removeNativeListener(u,h,arguments.callee);
self.releaseCapture();
});
}this.__hH=v;
this.__hG=u;
this.__hF.fireEvent(u,b,qx.event.type.Event,[true,false]);
},getCaptureElement:function(){return this.__hG;
},releaseCapture:function(){var r=this.__hG;

if(!r){return;
}this.__hG=null;
this.__hF.fireEvent(r,h,qx.event.type.Event,[true,false]);
this.nativeReleaseCapture(r);
},hasNativeCapture:qx.bom.client.Engine.MSHTML,nativeSetCapture:qx.core.Variant.select(g,{"mshtml":function(j,k){j.setCapture(k!==false);
},"default":qx.lang.Function.empty}),nativeReleaseCapture:qx.core.Variant.select(g,{"mshtml":function(n){n.releaseCapture();
},"default":qx.lang.Function.empty})},destruct:function(){this.__hG=this.__hE=this.__hF=null;
},defer:function(o){qx.event.Registration.addDispatcher(o);
}});
})();
(function(){var t="qx.client",s="",r="mshtml",q="'",p="SelectionLanguage",o="qx.xml.Document",n=" />",m="MSXML2.DOMDocument.3.0",k='<\?xml version="1.0" encoding="utf-8"?>\n<',j="MSXML2.XMLHTTP.3.0",e="MSXML2.XMLHTTP.6.0",h=" xmlns='",g="text/xml",d="XPath",c="MSXML2.DOMDocument.6.0",f="HTML";
qx.Class.define(o,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(A){if(A.nodeType===9){return A.documentElement.nodeName!==f;
}else if(A.ownerDocument){return this.isXmlDocument(A.ownerDocument);
}else{return false;
}},create:qx.core.Variant.select(t,{"mshtml":function(u,v){var w=new ActiveXObject(this.DOMDOC);
w.setProperty(p,d);

if(v){var x=k;
x+=v;

if(u){x+=h+u+q;
}x+=n;
w.loadXML(x);
}return w;
},"default":function(F,G){return document.implementation.createDocument(F||s,G||s,null);
}}),fromString:qx.core.Variant.select(t,{"mshtml":function(y){var z=qx.xml.Document.create();
z.loadXML(y);
return z;
},"default":function(a){var b=new DOMParser();
return b.parseFromString(a,g);
}})},defer:function(C){if(qx.core.Variant.isSet(t,r)){var D=[c,m];
var E=[e,j];

for(var i=0,l=D.length;i<l;i++){try{new ActiveXObject(D[i]);
new ActiveXObject(E[i]);
}catch(B){continue;
}C.DOMDOC=D[i];
C.XMLHTTP=E[i];
break;
}}}});
})();
(function(){var k="visible",j="scroll",i="borderBottomWidth",h="borderTopWidth",g="left",f="borderLeftWidth",e="bottom",d="top",c="right",b="qx.bom.element.Scroll",a="borderRightWidth";
qx.Class.define(b,{statics:{intoViewX:function(K,stop,L){var parent=K.parentNode;
var Q=qx.dom.Node.getDocument(K);
var M=Q.body;
var Y,W,T;
var bb,R,bc;
var U,bd,bg;
var be,O,X,N;
var S,bf,V;
var P=L===g;
var ba=L===c;
stop=stop?stop.parentNode:Q;
while(parent&&parent!=stop){if(parent.scrollWidth>parent.clientWidth&&(parent===M||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===M){W=parent.scrollLeft;
T=W+qx.bom.Viewport.getWidth();
bb=qx.bom.Viewport.getWidth();
R=parent.clientWidth;
bc=parent.scrollWidth;
U=0;
bd=0;
bg=0;
}else{Y=qx.bom.element.Location.get(parent);
W=Y.left;
T=Y.right;
bb=parent.offsetWidth;
R=parent.clientWidth;
bc=parent.scrollWidth;
U=parseInt(qx.bom.element.Style.get(parent,f),10)||0;
bd=parseInt(qx.bom.element.Style.get(parent,a),10)||0;
bg=bb-R-U-bd;
}be=qx.bom.element.Location.get(K);
O=be.left;
X=be.right;
N=K.offsetWidth;
S=O-W-U;
bf=X-T+bd;
V=0;
if(P){V=S;
}else if(ba){V=bf+bg;
}else if(S<0||N>R){V=S;
}else if(bf>0){V=bf+bg;
}parent.scrollLeft+=V;
if(qx.bom.client.Engine.GECKO){qx.event.Registration.fireNonBubblingEvent(parent,j);
}}
if(parent===M){break;
}parent=parent.parentNode;
}},intoViewY:function(l,stop,m){var parent=l.parentNode;
var s=qx.dom.Node.getDocument(l);
var n=s.body;
var A,o,w;
var C,z,u;
var q,r,p;
var E,F,B,v;
var y,t,G;
var D=m===d;
var x=m===e;
stop=stop?stop.parentNode:s;
while(parent&&parent!=stop){if(parent.scrollHeight>parent.clientHeight&&(parent===n||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===n){o=parent.scrollTop;
w=o+qx.bom.Viewport.getHeight();
C=qx.bom.Viewport.getHeight();
z=parent.clientHeight;
u=parent.scrollHeight;
q=0;
r=0;
p=0;
}else{A=qx.bom.element.Location.get(parent);
o=A.top;
w=A.bottom;
C=parent.offsetHeight;
z=parent.clientHeight;
u=parent.scrollHeight;
q=parseInt(qx.bom.element.Style.get(parent,h),10)||0;
r=parseInt(qx.bom.element.Style.get(parent,i),10)||0;
p=C-z-q-r;
}E=qx.bom.element.Location.get(l);
F=E.top;
B=E.bottom;
v=l.offsetHeight;
y=F-o-q;
t=B-w+r;
G=0;
if(D){G=y;
}else if(x){G=t+p;
}else if(y<0||v>z){G=y;
}else if(t>0){G=t+p;
}parent.scrollTop+=G;
if(qx.bom.client.Engine.GECKO){qx.event.Registration.fireNonBubblingEvent(parent,j);
}}
if(parent===n){break;
}parent=parent.parentNode;
}},intoView:function(H,stop,I,J){this.intoViewX(H,stop,I);
this.intoViewY(H,stop,J);
}}});
})();
(function(){var m="borderTopWidth",l="borderLeftWidth",k="marginTop",j="marginLeft",i="scroll",h="qx.client",g="border-box",f="borderBottomWidth",e="borderRightWidth",d="auto",B="padding",A="qx.bom.element.Location",z="paddingLeft",y="static",x="marginBottom",w="visible",v="BODY",u="paddingBottom",t="paddingTop",s="marginRight",q="position",r="margin",o="overflow",p="paddingRight",n="border";
qx.Class.define(A,{statics:{__hJ:function(bO,bP){return qx.bom.element.Style.get(bO,bP,qx.bom.element.Style.COMPUTED_MODE,false);
},__hK:function(bM,bN){return parseInt(qx.bom.element.Style.get(bM,bN,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;
},__hL:function(bj){var bm=0,top=0;
if(bj.getBoundingClientRect&&!qx.bom.client.Engine.OPERA){var bl=qx.dom.Node.getWindow(bj);
bm-=qx.bom.Viewport.getScrollLeft(bl);
top-=qx.bom.Viewport.getScrollTop(bl);
}else{var bk=qx.dom.Node.getDocument(bj).body;
bj=bj.parentNode;
while(bj&&bj!=bk){bm+=bj.scrollLeft;
top+=bj.scrollTop;
bj=bj.parentNode;
}}return {left:bm,top:top};
},__hM:qx.core.Variant.select(h,{"mshtml":function(bd){var bf=qx.dom.Node.getDocument(bd);
var be=bf.body;
var bg=0;
var top=0;
bg-=be.clientLeft+bf.documentElement.clientLeft;
top-=be.clientTop+bf.documentElement.clientTop;

if(qx.bom.client.Feature.STANDARD_MODE){bg+=this.__hK(be,l);
top+=this.__hK(be,m);
}return {left:bg,top:top};
},"webkit":function(by){var bA=qx.dom.Node.getDocument(by);
var bz=bA.body;
var bB=bz.offsetLeft;
var top=bz.offsetTop;
if(qx.bom.client.Engine.VERSION<530.17){bB+=this.__hK(bz,l);
top+=this.__hK(bz,m);
}return {left:bB,top:top};
},"gecko":function(bF){var bG=qx.dom.Node.getDocument(bF).body;
var bH=bG.offsetLeft;
var top=bG.offsetTop;
if(qx.bom.client.Engine.VERSION<1.9){bH+=this.__hK(bG,j);
top+=this.__hK(bG,k);
}if(qx.bom.element.BoxSizing.get(bG)!==g){bH+=this.__hK(bG,l);
top+=this.__hK(bG,m);
}return {left:bH,top:top};
},"default":function(a){var b=qx.dom.Node.getDocument(a).body;
var c=b.offsetLeft;
var top=b.offsetTop;
return {left:c,top:top};
}}),__hN:qx.core.Variant.select(h,{"mshtml|webkit":function(bn){var bp=qx.dom.Node.getDocument(bn);
if(bn.getBoundingClientRect){var bq=bn.getBoundingClientRect();
var br=bq.left;
var top=bq.top;
}else{var br=bn.offsetLeft;
var top=bn.offsetTop;
bn=bn.offsetParent;
var bo=bp.body;
while(bn&&bn!=bo){br+=bn.offsetLeft;
top+=bn.offsetTop;
br+=this.__hK(bn,l);
top+=this.__hK(bn,m);
bn=bn.offsetParent;
}}return {left:br,top:top};
},"gecko":function(T){if(T.getBoundingClientRect){var W=T.getBoundingClientRect();
var X=Math.round(W.left);
var top=Math.round(W.top);
}else{var X=0;
var top=0;
var U=qx.dom.Node.getDocument(T).body;
var V=qx.bom.element.BoxSizing;

if(V.get(T)!==g){X-=this.__hK(T,l);
top-=this.__hK(T,m);
}
while(T&&T!==U){X+=T.offsetLeft;
top+=T.offsetTop;
if(V.get(T)!==g){X+=this.__hK(T,l);
top+=this.__hK(T,m);
}if(T.parentNode&&this.__hJ(T.parentNode,o)!=w){X+=this.__hK(T.parentNode,l);
top+=this.__hK(T.parentNode,m);
}T=T.offsetParent;
}}return {left:X,top:top};
},"default":function(bC){var bE=0;
var top=0;
var bD=qx.dom.Node.getDocument(bC).body;
while(bC&&bC!==bD){bE+=bC.offsetLeft;
top+=bC.offsetTop;
bC=bC.offsetParent;
}return {left:bE,top:top};
}}),get:function(E,F){if(E.tagName==v){var location=this.__hO(E);
var M=location.left;
var top=location.top;
}else{var G=this.__hM(E);
var L=this.__hN(E);
var scroll=this.__hL(E);
var M=L.left+G.left-scroll.left;
var top=L.top+G.top-scroll.top;
}var H=M+E.offsetWidth;
var I=top+E.offsetHeight;

if(F){if(F==B||F==i){var J=qx.bom.element.Overflow.getX(E);

if(J==i||J==d){H+=E.scrollWidth-E.offsetWidth+this.__hK(E,l)+this.__hK(E,e);
}var K=qx.bom.element.Overflow.getY(E);

if(K==i||K==d){I+=E.scrollHeight-E.offsetHeight+this.__hK(E,m)+this.__hK(E,f);
}}
switch(F){case B:M+=this.__hK(E,z);
top+=this.__hK(E,t);
H-=this.__hK(E,p);
I-=this.__hK(E,u);
case i:M-=E.scrollLeft;
top-=E.scrollTop;
H-=E.scrollLeft;
I-=E.scrollTop;
case n:M+=this.__hK(E,l);
top+=this.__hK(E,m);
H-=this.__hK(E,e);
I-=this.__hK(E,f);
break;
case r:M-=this.__hK(E,j);
top-=this.__hK(E,k);
H+=this.__hK(E,s);
I+=this.__hK(E,x);
break;
}}return {left:M,top:top,right:H,bottom:I};
},__hO:qx.core.Variant.select(h,{"default":function(Y){var top=Y.offsetTop+this.__hK(Y,k);
var ba=Y.offsetLeft+this.__hK(Y,j);
return {left:ba,top:top};
},"mshtml":function(R){var top=R.offsetTop;
var S=R.offsetLeft;

if(!((qx.bom.client.Engine.VERSION<8||qx.bom.client.Engine.DOCUMENT_MODE<8)&&!qx.bom.client.Feature.QUIRKS_MODE)){top+=this.__hK(R,k);
S+=this.__hK(R,j);
}return {left:S,top:top};
},"gecko":function(bI){var top=bI.offsetTop+this.__hK(bI,k)+this.__hK(bI,l);
var bJ=bI.offsetLeft+this.__hK(bI,j)+this.__hK(bI,m);
return {left:bJ,top:top};
}}),getLeft:function(bh,bi){return this.get(bh,bi).left;
},getTop:function(bb,bc){return this.get(bb,bc).top;
},getRight:function(bK,bL){return this.get(bK,bL).right;
},getBottom:function(C,D){return this.get(C,D).bottom;
},getRelative:function(bs,bt,bu,bv){var bx=this.get(bs,bu);
var bw=this.get(bt,bv);
return {left:bx.left-bw.left,top:bx.top-bw.top,right:bx.right-bw.right,bottom:bx.bottom-bw.bottom};
},getPosition:function(N){return this.getRelative(N,this.getOffsetParent(N));
},getOffsetParent:function(O){var Q=O.offsetParent||document.body;
var P=qx.bom.element.Style;

while(Q&&(!/^body|html$/i.test(Q.tagName)&&P.get(Q,q)===y)){Q=Q.offsetParent;
}return Q;
}}});
})();
(function(){var k="qx.client",j="character",i="EndToEnd",h="input",g="textarea",f="StartToStart",e='character',d="qx.bom.Selection",c="button",b="#text",a="body";
qx.Class.define(d,{statics:{getSelectionObject:qx.core.Variant.select(k,{"mshtml":function(S){return S.selection;
},"default":function(T){return qx.dom.Node.getWindow(T).getSelection();
}}),get:qx.core.Variant.select(k,{"mshtml":function(ba){var bb=qx.bom.Range.get(qx.dom.Node.getDocument(ba));
return bb.text;
},"default":function(bd){if(this.__hP(bd)){return bd.value.substring(bd.selectionStart,bd.selectionEnd);
}else{return this.getSelectionObject(qx.dom.Node.getDocument(bd)).toString();
}}}),getLength:qx.core.Variant.select(k,{"mshtml":function(A){var C=this.get(A);
var B=qx.util.StringSplit.split(C,/\r\n/);
return C.length-(B.length-1);
},"opera":function(bf){var bk,bi,bg;

if(this.__hP(bf)){var bj=bf.selectionStart;
var bh=bf.selectionEnd;
bk=bf.value.substring(bj,bh);
bi=bh-bj;
}else{bk=qx.bom.Selection.get(bf);
bi=bk.length;
}bg=qx.util.StringSplit.split(bk,/\r\n/);
return bi-(bg.length-1);
},"default":function(bc){if(this.__hP(bc)){return bc.selectionEnd-bc.selectionStart;
}else{return this.get(bc).length;
}}}),getStart:qx.core.Variant.select(k,{"mshtml":function(bl){if(this.__hP(bl)){var bq=qx.bom.Range.get();
if(!bl.contains(bq.parentElement())){return -1;
}var br=qx.bom.Range.get(bl);
var bp=bl.value.length;
br.moveToBookmark(bq.getBookmark());
br.moveEnd(e,bp);
return bp-br.text.length;
}else{var br=qx.bom.Range.get(bl);
var bn=br.parentElement();
var bs=qx.bom.Range.get();
bs.moveToElementText(bn);
var bm=qx.bom.Range.get(qx.dom.Node.getBodyElement(bl));
bm.setEndPoint(f,br);
bm.setEndPoint(i,bs);
if(bs.compareEndPoints(f,bm)==0){return 0;
}var bo;
var bt=0;

while(true){bo=bm.moveStart(j,-1);
if(bs.compareEndPoints(f,bm)==0){break;
}if(bo==0){break;
}else{bt++;
}}return ++bt;
}},"gecko|webkit":function(D){if(this.__hP(D)){return D.selectionStart;
}else{var F=qx.dom.Node.getDocument(D);
var E=this.getSelectionObject(F);
if(E.anchorOffset<E.focusOffset){return E.anchorOffset;
}else{return E.focusOffset;
}}},"default":function(G){if(this.__hP(G)){return G.selectionStart;
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(G)).anchorOffset;
}}}),getEnd:qx.core.Variant.select(k,{"mshtml":function(l){if(this.__hP(l)){var q=qx.bom.Range.get();
if(!l.contains(q.parentElement())){return -1;
}var r=qx.bom.Range.get(l);
var p=l.value.length;
r.moveToBookmark(q.getBookmark());
r.moveStart(e,-p);
return r.text.length;
}else{var r=qx.bom.Range.get(l);
var n=r.parentElement();
var s=qx.bom.Range.get();
s.moveToElementText(n);
var p=s.text.length;
var m=qx.bom.Range.get(qx.dom.Node.getBodyElement(l));
m.setEndPoint(i,r);
m.setEndPoint(f,s);
if(s.compareEndPoints(i,m)==0){return p-1;
}var o;
var t=0;

while(true){o=m.moveEnd(j,1);
if(s.compareEndPoints(i,m)==0){break;
}if(o==0){break;
}else{t++;
}}return p-(++t);
}},"gecko|webkit":function(H){if(this.__hP(H)){return H.selectionEnd;
}else{var J=qx.dom.Node.getDocument(H);
var I=this.getSelectionObject(J);
if(I.focusOffset>I.anchorOffset){return I.focusOffset;
}else{return I.anchorOffset;
}}},"default":function(bu){if(this.__hP(bu)){return bu.selectionEnd;
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bu)).focusOffset;
}}}),__hP:function(K){return qx.dom.Node.isElement(K)&&(K.nodeName.toLowerCase()==h||K.nodeName.toLowerCase()==g);
},set:qx.core.Variant.select(k,{"mshtml":function(U,V,W){var X;
if(qx.dom.Node.isDocument(U)){U=U.body;
}
if(qx.dom.Node.isElement(U)||qx.dom.Node.isText(U)){switch(U.nodeName.toLowerCase()){case h:case g:case c:if(W===undefined){W=U.value.length;
}
if(V>=0&&V<=U.value.length&&W>=0&&W<=U.value.length){X=qx.bom.Range.get(U);
X.collapse(true);
X.moveStart(j,V);
X.moveEnd(j,W-V);
X.select();
return true;
}break;
case b:if(W===undefined){W=U.nodeValue.length;
}
if(V>=0&&V<=U.nodeValue.length&&W>=0&&W<=U.nodeValue.length){X=qx.bom.Range.get(qx.dom.Node.getBodyElement(U));
X.moveToElementText(U.parentNode);
X.collapse(true);
X.moveStart(j,V);
X.moveEnd(j,W-V);
X.select();
return true;
}break;
default:if(W===undefined){W=U.childNodes.length-1;
}if(U.childNodes[V]&&U.childNodes[W]){X=qx.bom.Range.get(qx.dom.Node.getBodyElement(U));
X.moveToElementText(U.childNodes[V]);
X.collapse(true);
var Y=qx.bom.Range.get(qx.dom.Node.getBodyElement(U));
Y.moveToElementText(U.childNodes[W]);
X.setEndPoint(i,Y);
X.select();
return true;
}}}return false;
},"default":function(L,M,N){var R=L.nodeName.toLowerCase();

if(qx.dom.Node.isElement(L)&&(R==h||R==g)){if(N===undefined){N=L.value.length;
}if(M>=0&&M<=L.value.length&&N>=0&&N<=L.value.length){L.focus();
L.select();
L.setSelectionRange(M,N);
return true;
}}else{var P=false;
var Q=qx.dom.Node.getWindow(L).getSelection();
var O=qx.bom.Range.get(L);
if(qx.dom.Node.isText(L)){if(N===undefined){N=L.length;
}
if(M>=0&&M<L.length&&N>=0&&N<=L.length){P=true;
}}else if(qx.dom.Node.isElement(L)){if(N===undefined){N=L.childNodes.length-1;
}
if(M>=0&&L.childNodes[M]&&N>=0&&L.childNodes[N]){P=true;
}}else if(qx.dom.Node.isDocument(L)){L=L.body;

if(N===undefined){N=L.childNodes.length-1;
}
if(M>=0&&L.childNodes[M]&&N>=0&&L.childNodes[N]){P=true;
}}
if(P){if(!Q.isCollapsed){Q.collapseToStart();
}O.setStart(L,M);
if(qx.dom.Node.isText(L)){O.setEnd(L,N);
}else{O.setEndAfter(L.childNodes[N]);
}if(Q.rangeCount>0){Q.removeAllRanges();
}Q.addRange(O);
return true;
}}return false;
}}),setAll:function(be){return qx.bom.Selection.set(be,0);
},clear:qx.core.Variant.select(k,{"mshtml":function(bv){var bw=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bv));
var bx=qx.bom.Range.get(bv);
var parent=bx.parentElement();
var by=qx.bom.Range.get(qx.dom.Node.getDocument(bv));
if(parent==by.parentElement()&&parent==bv){bw.empty();
}},"default":function(u){var w=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(u));
var y=u.nodeName.toLowerCase();
if(qx.dom.Node.isElement(u)&&(y==h||y==g)){u.setSelectionRange(0,0);
qx.bom.Element.blur(u);
}else if(qx.dom.Node.isDocument(u)||y==a){w.collapse(u.body?u.body:u,0);
}else{var x=qx.bom.Range.get(u);

if(!x.collapsed){var z;
var v=x.commonAncestorContainer;
if(qx.dom.Node.isElement(u)&&qx.dom.Node.isText(v)){z=v.parentNode;
}else{z=v;
}
if(z==u){w.collapse(u,0);
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
qx.Class.define(b,{statics:{__hQ:{},remove:function(f){delete this.__hQ[f.$$hash];
},add:function(g){var h=this.__hQ;

if(h[g.$$hash]){return;
}h[g.$$hash]=g;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var c=this.__hQ;
var e;

for(var d in c){e=c[d];
delete c[d];
e.syncWidget();
}for(var d in c){return;
}this.__hQ={};
}}});
})();
(function(){var b="qx.ui.core.queue.Visibility",a="visibility";
qx.Class.define(b,{statics:{__hR:{},__hS:{},remove:function(n){var o=n.$$hash;
delete this.__hS[o];
delete this.__hR[o];
},isVisible:function(p){return this.__hS[p.$$hash]||false;
},__hT:function(e){var g=this.__hS;
var f=e.$$hash;
var h;
if(e.isExcluded()){h=false;
}else{var parent=e.$$parent;

if(parent){h=this.__hT(parent);
}else{h=e.isRootWidget();
}}return g[f]=h;
},add:function(c){var d=this.__hR;

if(d[c.$$hash]){return;
}d[c.$$hash]=c;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var i=this.__hR;
var m=this.__hS;
for(var j in i){if(m[j]!=null){i[j].addChildrenToQueue(i);
}}var l={};

for(var j in i){l[j]=m[j];
m[j]=null;
}for(var j in i){var k=i[j];
delete i[j];
if(m[j]==null){this.__hT(k);
}if(m[j]&&m[j]!=l[j]){k.checkAppearanceNeeds();
}}this.__hR={};
}}});
})();
(function(){var b="appearance",a="qx.ui.core.queue.Appearance";
qx.Class.define(a,{statics:{__hU:{},remove:function(c){delete this.__hU[c.$$hash];
},add:function(e){var f=this.__hU;

if(f[e.$$hash]){return;
}f[e.$$hash]=e;
qx.ui.core.queue.Manager.scheduleFlush(b);
},has:function(d){return !!this.__hU[d.$$hash];
},flush:function(){var j=qx.ui.core.queue.Visibility;
var g=this.__hU;
var i;

for(var h in g){i=g[h];
delete g[h];
if(j.isVisible(i)){i.syncAppearance();
}else{i.$$stateChanges=true;
}}}}});
})();
(function(){var b="dispose",a="qx.ui.core.queue.Dispose";
qx.Class.define(a,{statics:{__hV:{},add:function(c){var d=this.__hV;

if(d[c.$$hash]){return;
}d[c.$$hash]=c;
qx.ui.core.queue.Manager.scheduleFlush(b);
},flush:function(){var e=this.__hV;

for(var g in e){var f=e[g];
delete e[g];
f.dispose();
}for(var g in e){return;
}this.__hV={};
}}});
})();
(function(){var c="none",b="qx.html.Decorator",a="absolute";
qx.Class.define(b,{extend:qx.html.Element,construct:function(f,g){arguments.callee.base.call(this);
this.__hW=f;
this.__hX=g||f.toHashCode();
this.useMarkup(f.getMarkup());
var h={position:a,top:0,left:0};

if(qx.bom.client.Feature.CSS_POINTER_EVENTS){h.pointerEvents=c;
}this.setStyles(h);
},members:{__hX:null,__hW:null,getId:function(){return this.__hX;
},getDecorator:function(){return this.__hW;
},resize:function(d,e){this.__hW.resize(this.getDomElement(),d,e);
},tint:function(i){this.__hW.tint(this.getDomElement(),i);
},getInsets:function(){return this.__hW.getInsets();
}},destruct:function(){this.__hW=null;
}});
})();
(function(){var f="blur",e="focus",d="input",c="load",b="qx.ui.core.EventHandler",a="activate";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){arguments.callee.base.call(this);
this.__hY=qx.event.Registration.getManager(window);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:false},members:{__hY:null,__ia:{focusin:1,focusout:1,focus:1,blur:1},__ib:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(n,o){return n instanceof qx.ui.core.Widget;
},_dispatchEvent:function(t){var y=t.getTarget();
var x=qx.ui.core.Widget.getWidgetByElement(y);
var z=false;

while(x&&x.isAnonymous()){var z=true;
x=x.getLayoutParent();
}if(x&&z&&t.getType()==a){x.getContainerElement().activate();
}if(this.__ia[t.getType()]){x=x&&x.getFocusTarget();
if(!x){return;
}}if(t.getRelatedTarget){var G=t.getRelatedTarget();
var F=qx.ui.core.Widget.getWidgetByElement(G);

while(F&&F.isAnonymous()){F=F.getLayoutParent();
}
if(F){if(this.__ia[t.getType()]){F=F.getFocusTarget();
}if(F===x){return;
}}}var B=t.getCurrentTarget();
var D=qx.ui.core.Widget.getWidgetByElement(B);

if(!D||D.isAnonymous()){return;
}if(this.__ia[t.getType()]){D=D.getFocusTarget();
}var E=t.getType();

if(!D||!(D.isEnabled()||this.__ib[E])){return;
}var u=t.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;
var A=this.__hY.getListeners(D,E,u);

if(!A||A.length===0){return;
}var v=qx.event.Pool.getInstance().getObject(t.constructor);
t.clone(v);
v.setTarget(x);
v.setRelatedTarget(F||null);
v.setCurrentTarget(D);
var H=t.getOriginalTarget();

if(H){var w=qx.ui.core.Widget.getWidgetByElement(H);

while(w&&w.isAnonymous()){w=w.getLayoutParent();
}v.setOriginalTarget(w);
}else{v.setOriginalTarget(y);
}for(var i=0,l=A.length;i<l;i++){var C=A[i].context||D;
A[i].handler.call(C,v);
}if(v.getPropagationStopped()){t.stopPropagation();
}
if(v.getDefaultPrevented()){t.preventDefault();
}qx.event.Pool.getInstance().poolObject(v);
},registerEvent:function(p,q,r){var s;

if(q===e||q===f){s=p.getFocusElement();
}else if(q===c||q===d){s=p.getContentElement();
}else{s=p.getContainerElement();
}
if(s){s.addListener(q,this._dispatchEvent,this,r);
}},unregisterEvent:function(g,h,j){var k;

if(h===e||h===f){k=g.getFocusElement();
}else if(h===c||h===d){k=g.getContentElement();
}else{k=g.getContainerElement();
}
if(k){k.removeListener(h,this._dispatchEvent,this,j);
}}},destruct:function(){this.__hY=null;
},defer:function(m){qx.event.Registration.addHandler(m);
}});
})();
(function(){var c="qx.bom.client.Locale",b="-",a="";
qx.Class.define(c,{statics:{LOCALE:"",VARIANT:"",__ic:function(){var d=(qx.bom.client.Engine.MSHTML?navigator.userLanguage:navigator.language).toLowerCase();
var f=a;
var e=d.indexOf(b);

if(e!=-1){f=d.substr(e+1);
d=d.substr(0,e);
}this.LOCALE=d;
this.VARIANT=f;
}},defer:function(g){g.__ic();
}});
})();
(function(){var t="",s='indexOf',r='slice',q='concat',p='toLocaleLowerCase',o="qx.type.BaseString",n='match',m='toLocaleUpperCase',k='search',j='replace',c='toLowerCase',h='charCodeAt',f='split',b='substring',a='lastIndexOf',e='substr',d='toUpperCase',g='charAt';
qx.Class.define(o,{extend:Object,construct:function(u){var u=u||t;
this.__id=u;
this.length=u.length;
},members:{$$isString:true,length:0,__id:null,toString:function(){return this.__id;
},charAt:null,valueOf:null,charCodeAt:null,concat:null,indexOf:null,lastIndexOf:null,match:null,replace:null,search:null,slice:null,split:null,substr:null,substring:null,toLowerCase:null,toUpperCase:null,toHashCode:function(){return qx.core.ObjectRegistry.toHashCode(this);
},toLocaleLowerCase:null,toLocaleUpperCase:null,base:function(y,z){return qx.core.Object.prototype.base.apply(this,arguments);
}},defer:function(v,w){{};
var x=[g,h,q,s,a,n,j,k,r,f,e,b,c,d,p,m];
w.valueOf=w.toString;

if(new v(t).valueOf()==null){delete w.valueOf;
}
for(var i=0,l=x.length;i<l;i++){w[x[i]]=String.prototype[x[i]];
}}});
})();
(function(){var a="qx.locale.LocalizedString";
qx.Class.define(a,{extend:qx.type.BaseString,construct:function(b,c,d){arguments.callee.base.call(this,b);
this.__ie=c;
this.__if=d;
},members:{__ie:null,__if:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__ie,this.__if);
}}});
})();
(function(){var m="_",l="",k="qx.dynlocale",j="on",h="_applyLocale",g="changeLocale",f="C",e="qx.locale.Manager",d="String",c="singleton";
qx.Class.define(e,{type:c,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__ig=qx.$$translations||{};
this.__ih=qx.$$locales||{};
var v=qx.bom.client.Locale;
var t=v.LOCALE;
var u=v.VARIANT;

if(u!==l){t+=m+u;
}this.setLocale(t||this.__ii);
},statics:{tr:function(E,F){var G=qx.lang.Array.fromArguments(arguments);
G.splice(0,1);
return qx.locale.Manager.getInstance().translate(E,G);
},trn:function(X,Y,ba,bb){var bc=qx.lang.Array.fromArguments(arguments);
bc.splice(0,3);
if(ba!=1){return qx.locale.Manager.getInstance().translate(Y,bc);
}else{return qx.locale.Manager.getInstance().translate(X,bc);
}},trc:function(L,M,N){var O=qx.lang.Array.fromArguments(arguments);
O.splice(0,2);
return qx.locale.Manager.getInstance().translate(M,O);
},marktr:function(bd){return bd;
}},properties:{locale:{check:d,nullable:true,apply:h,event:g}},members:{__ii:f,__ij:null,__ik:null,__ig:null,__ih:null,getLanguage:function(){return this.__ik;
},getTerritory:function(){return this.getLocale().split(m)[1]||l;
},getAvailableLocales:function(){var b=[];

for(var a in this.__ih){if(a!=this.__ii){b.push(a);
}}return b;
},__il:function(be){var bg;
var bf=be.indexOf(m);

if(bf==-1){bg=be;
}else{bg=be.substring(0,bf);
}return bg;
},_applyLocale:function(r,s){this.__ij=r;
this.__ik=this.__il(r);
},addTranslation:function(n,o){var p=this.__ig;

if(p[n]){for(var q in o){p[n][q]=o[q];
}}else{p[n]=o;
}},addLocale:function(H,I){var J=this.__ih;

if(J[H]){for(var K in I){J[H][K]=I[K];
}}else{J[H]=I;
}},translate:function(P,Q,R){var W;
var U=this.__ig;

if(!U){return P;
}
if(R){var T=this.__il(R);
}else{R=this.__ij;
T=this.__ik;
}
if(!W&&U[R]){W=U[R][P];
}
if(!W&&U[T]){W=U[T][P];
}
if(!W&&U[this.__ii]){W=U[this.__ii][P];
}
if(!W){W=P;
}
if(Q.length>0){var S=[];

for(var i=0;i<Q.length;i++){var V=Q[i];

if(V&&V.translate){S[i]=V.translate();
}else{S[i]=V;
}}W=qx.lang.String.format(W,S);
}
if(qx.core.Variant.isSet(k,j)){W=new qx.locale.LocalizedString(W,P,Q);
}return W;
},localize:function(w,x,y){var D;
var B=this.__ih;

if(!B){return w;
}
if(y){var A=this.__il(y);
}else{y=this.__ij;
A=this.__ik;
}
if(!D&&B[y]){D=B[y][w];
}
if(!D&&B[A]){D=B[A][w];
}
if(!D&&B[this.__ii]){D=B[this.__ii][w];
}
if(!D){D=w;
}
if(x.length>0){var z=[];

for(var i=0;i<x.length;i++){var C=x[i];

if(C.translate){z[i]=C.translate();
}else{z[i]=C;
}}D=qx.lang.String.format(D,z);
}
if(qx.core.Variant.isSet(k,j)){D=new qx.locale.LocalizedString(D,w,x);
}return D;
}},destruct:function(){this.__ig=this.__ih=null;
}});
})();
(function(){var h="source",g="scale",f="no-repeat",e="mshtml",d="backgroundImage",c="qx.client",b="div",a="qx.html.Image";
qx.Class.define(a,{extend:qx.html.Element,members:{_applyProperty:function(name,o){arguments.callee.base.call(this,name,o);

if(name===h){var s=this.getDomElement();
var p=this.getAllStyles();

if(this.getNodeName()==b&&this.getStyle(d)){p.backgroundPosition=null;
p.backgroundRepeat=null;
}var q=this._getProperty(h);
var r=this._getProperty(g);
var t=r?g:f;
qx.bom.element.Decoration.update(s,q,t,p);
}},_createDomElement:function(){var m=this._getProperty(g);
var n=m?g:f;

if(qx.core.Variant.isSet(c,e)){var l=this._getProperty(h);
this.setNodeName(qx.bom.element.Decoration.getTagName(n,l));
}else{this.setNodeName(qx.bom.element.Decoration.getTagName(n));
}return arguments.callee.base.call(this);
},_copyData:function(j){return arguments.callee.base.call(this,true);
},setSource:function(i){this._setProperty(h,i);
return this;
},getSource:function(){return this._getProperty(h);
},resetSource:function(){this._removeProperty(h);
return this;
},setScale:function(k){this._setProperty(g,k);
return this;
},getScale:function(){return this._getProperty(g);
}}});
})();
(function(){var H="nonScaled",G="scaled",F="alphaScaled",E=".png",D="replacement",C="hidden",B="div",A="__im",z="Boolean",y="_applyScale",s="px",x="_applySource",v="-disabled.$1",r="img",q="changeSource",u="qx.client",t="String",w="image",p="qx.ui.basic.Image";
qx.Class.define(p,{extend:qx.ui.core.Widget,construct:function(I){this.__im={};
arguments.callee.base.call(this);

if(I){this.setSource(I);
}},properties:{source:{check:t,init:null,nullable:true,event:q,apply:x,themeable:true},scale:{check:z,init:false,themeable:true,apply:y},appearance:{refine:true,init:w},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},members:{__in:null,__io:null,__ip:null,__im:null,getContentElement:function(){return this.__it();
},_createContentElement:function(){return this.__it();
},_getContentHint:function(){return {width:this.__in||0,height:this.__io||0};
},_applyEnabled:function(bf,bg){arguments.callee.base.call(this,bf,bg);

if(this.getSource()){this._styleSource();
}},_applySource:function(e){this._styleSource();
},_applyScale:function(i){this._styleSource();
},__iq:function(W){this.__ip=W;
},__ir:function(){if(this.__ip==null){var o=this.getSource();
var n=false;

if(o!=null){n=qx.lang.String.endsWith(o,E);
}
if(this.getScale()&&n&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){this.__ip=F;
}else if(this.getScale()){this.__ip=G;
}else{this.__ip=H;
}}return this.__ip;
},__is:function(R){var S;
var T;

if(R==F){S=true;
T=B;
}else if(R==H){S=false;
T=B;
}else{S=true;
T=r;
}var U=new qx.html.Image(T);
U.setScale(S);
U.setStyles({"overflowX":C,"overflowY":C});
return U;
},__it:function(){var L=this.__ir();

if(this.__im[L]==null){this.__im[L]=this.__is(L);
}return this.__im[L];
},_styleSource:function(){var j=qx.util.AliasManager.getInstance().resolve(this.getSource());

if(!j){this.getContentElement().resetSource();
return;
}this.__iu(j);
if(qx.util.ResourceManager.getInstance().has(j)){this.__iw(this.getContentElement(),j);
}else if(qx.io.ImageLoader.isLoaded(j)){this.__ix(this.getContentElement(),j);
}else{this.__iy(this.getContentElement(),j);
}},__iu:qx.core.Variant.select(u,{"mshtml":function(k){var m=qx.bom.element.Decoration.isAlphaImageLoaderEnabled();
var l=qx.lang.String.endsWith(k,E);

if(m&&l){if(this.getScale()&&this.__ir()!=F){this.__iq(F);
}else if(!this.getScale()&&this.__ir()!=H){this.__iq(H);
}}else{if(this.getScale()&&this.__ir()!=G){this.__iq(G);
}else if(!this.getScale()&&this.__ir()!=H){this.__iq(H);
}}this.__iv(this.__it());
},"default":function(V){if(this.getScale()&&this.__ir()!=G){this.__iq(G);
}else if(!this.getScale()&&this.__ir(H)){this.__iq(H);
}this.__iv(this.__it());
}}),__iv:function(X){var bb=this.getContainerElement();
var bc=bb.getChild(0);

if(bc!=X){if(bc!=null){var be=s;
var Y={};
var ba=this.getInnerSize();

if(ba!=null){Y.width=ba.width+be;
Y.height=ba.height+be;
}var bd=this.getInsets();
Y.left=bd.left+be;
Y.top=bd.top+be;
Y.zIndex=10;
X.setStyles(Y,true);
X.setSelectable(this.getSelectable());
}bb.removeAt(0);
bb.addAt(X,0);
}},__iw:function(a,b){var d=qx.util.ResourceManager.getInstance();
if(!this.getEnabled()){var c=b.replace(/\.([a-z]+)$/,v);

if(d.has(c)){b=c;
this.addState(D);
}else{this.removeState(D);
}}if(a.getSource()===b){return;
}a.setSource(b);
this.__iA(d.getImageWidth(b),d.getImageHeight(b));
},__ix:function(M,N){var P=qx.io.ImageLoader;
M.setSource(N);
var O=P.getWidth(N);
var Q=P.getHeight(N);
this.__iA(O,Q);
},__iy:function(f,g){var self;
var h=qx.io.ImageLoader;
{};
if(!h.isFailed(g)){h.load(g,this.__iz,this);
}else{if(f!=null){f.resetSource();
}}},__iz:function(bh,bi){if(bh!==qx.util.AliasManager.getInstance().resolve(this.getSource())){return;
}if(bi.failed){this.warn("Image could not be loaded: "+bh);
}this._styleSource();
},__iA:function(J,K){if(J!==this.__in||K!==this.__io){this.__in=J;
this.__io=K;
qx.ui.core.queue.Layout.add(this);
}}},destruct:function(){this._disposeMap(A);
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
var g=new qx.event.Timer(this.getTimeoutInterval());
g.addListener(f,this._onInterval,this);
g.start();
this.__iB=g;
},events:{"interval":c},properties:{timeoutInterval:{check:e,init:100,apply:d}},members:{__iB:null,_applyTimeoutInterval:function(h){this.__iB.setInterval(h);
},_onInterval:function(){this.fireEvent(f);
}},destruct:function(){if(this.__iB){this.__iB.stop();
}this.__iB=null;
}});
})();
(function(){var o="top",n="right",m="bottom",l="left",k="align-start",j="qx.util.placement.AbstractAxis",i="edge-start",h="align-end",g="edge-end",f="-",c="best-fit",e="qx.util.placement.Placement",d="keep-align",b='__iC',a="direct";
qx.Class.define(e,{extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__iC=new qx.util.placement.DirectAxis();
},properties:{axisX:{check:j},axisY:{check:j},edge:{check:[o,n,m,l],init:o},align:{check:[o,n,m,l],init:n}},statics:{__iD:null,compute:function(B,C,D,E,F,G,H){this.__iD=this.__iD||new qx.util.placement.Placement();
var K=F.split(f);
var J=K[0];
var I=K[1];
this.__iD.set({axisX:this.__iH(G),axisY:this.__iH(H),edge:J,align:I});
return this.__iD.compute(B,C,D,E);
},__iE:null,__iF:null,__iG:null,__iH:function(t){switch(t){case a:this.__iE=this.__iE||new qx.util.placement.DirectAxis();
return this.__iE;
case d:this.__iF=this.__iF||new qx.util.placement.KeepAlignAxis();
return this.__iF;
case c:this.__iG=this.__iG||new qx.util.placement.BestFitAxis();
return this.__iG;
default:throw new Error("Invalid 'mode' argument!'");
}}},members:{__iC:null,compute:function(u,v,w,x){{};
var y=this.getAxisX()||this.__iC;
var A=y.computeStart(u.width,{start:w.left,end:w.right},{start:x.left,end:x.right},v.width,this.__iI());
var z=this.getAxisY()||this.__iC;
var top=z.computeStart(u.height,{start:w.top,end:w.bottom},{start:x.top,end:x.bottom},v.height,this.__iJ());
return {left:A,top:top};
},__iI:function(){var s=this.getEdge();
var r=this.getAlign();

if(s==l){return i;
}else if(s==n){return g;
}else if(r==l){return k;
}else if(r==n){return h;
}},__iJ:function(){var q=this.getEdge();
var p=this.getAlign();

if(q==o){return i;
}else if(q==m){return g;
}else if(p==o){return k;
}else if(p==m){return h;
}}},destruct:function(){this._disposeObjects(b);
}});
})();
(function(){var e="edge-start",d="align-start",c="align-end",b="edge-end",a="qx.util.placement.AbstractAxis";
qx.Class.define(a,{extend:qx.core.Object,members:{computeStart:function(f,g,h,i,j){throw new Error("abstract method call!");
},_moveToEdgeAndAlign:function(k,l,m,n){switch(n){case e:return l.start-m.end-k;
case b:return l.end+m.start;
case d:return l.start+m.start;
case c:return l.end-m.end-k;
}},_isInRange:function(o,p,q){return o>=0&&o+p<=q;
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
(function(){var j="mousedown",i="__iK",h="blur",g="singleton",f="qx.ui.popup.Manager";
qx.Class.define(f,{type:g,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__iK={};
qx.event.Registration.addListener(document.documentElement,j,this.__iM,this,true);
qx.bom.Element.addListener(window,h,this.hideAll,this);
},members:{__iK:null,add:function(o){{};
this.__iK[o.$$hash]=o;
this.__iL();
},remove:function(m){{};
var n=this.__iK;

if(n){delete n[m.$$hash];
this.__iL();
}},hideAll:function(){var l=this.__iK;

if(l){for(var k in l){l[k].exclude();
}}},__iL:function(){var r=1e7;
var q=this.__iK;

for(var p in q){q[p].setZIndex(r++);
}},__iM:function(e){var c=qx.ui.core.Widget.getWidgetByElement(e.getTarget());
var d=this.__iK;

for(var b in d){var a=d[b];

if(!a.getAutoHide()||c==a||qx.ui.core.Widget.contains(a,c)){continue;
}a.exclude();
}}},destruct:function(){qx.event.Registration.removeListener(document.documentElement,j,this.__iM,this,true);
this._disposeMap(i);
}});
})();
(function(){var b="abstract",a="qx.ui.layout.Abstract";
qx.Class.define(a,{type:b,extend:qx.core.Object,members:{__iN:null,_invalidChildrenCache:null,__iO:null,invalidateLayoutCache:function(){this.__iN=null;
},renderLayout:function(f,g){this.warn("Missing renderLayout() implementation!");
},getSizeHint:function(){if(this.__iN){return this.__iN;
}return this.__iN=this._computeSizeHint();
},hasHeightForWidth:function(){return false;
},getHeightForWidth:function(c){this.warn("Missing getHeightForWidth() implementation!");
return null;
},_computeSizeHint:function(){return null;
},invalidateChildrenCache:function(){this._invalidChildrenCache=true;
},verifyLayoutProperty:null,_clearSeparators:function(){var h=this.__iO;

if(h instanceof qx.ui.core.LayoutItem){h.clearSeparators();
}},_renderSeparator:function(d,e){this.__iO.renderSeparator(d,e);
},connectToWidget:function(i){if(i&&this.__iO){throw new Error("It is not possible to manually set the connected widget.");
}this.__iO=i;
this.invalidateChildrenCache();
},_getWidget:function(){return this.__iO;
},_applyLayoutChange:function(){if(this.__iO){this.__iO.scheduleLayoutUpdate();
}},_getLayoutChildren:function(){return this.__iO.getLayoutChildren();
}},destruct:function(){this.__iO=this.__iN=null;
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
qx.Class.define(v,{extend:qx.ui.core.Widget,construct:function(F,G){{};
arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.Atom());

if(F!=null){this.setLabel(F);
}
if(G!=null){this.setIcon(G);
}},properties:{appearance:{refine:true,init:k},label:{apply:l,nullable:true,check:f,event:u},rich:{check:h,init:false,apply:p},icon:{check:f,apply:o,nullable:true,themeable:true,event:w},gap:{check:t,nullable:false,event:d,apply:m,themeable:true,init:4},show:{init:g,check:[g,j,i],themeable:true,inheritable:true,apply:n,event:c},iconPosition:{init:e,check:[r,q,b,e],themeable:true,apply:s},center:{init:false,check:h,themeable:true,apply:a}},members:{_createChildControlImpl:function(H){var I;

switch(H){case j:I=new qx.ui.basic.Label(this.getLabel());
I.setAnonymous(true);
I.setRich(this.getRich());
this._add(I);

if(this.getLabel()==null||this.getShow()===i){I.exclude();
}break;
case i:I=new qx.ui.basic.Image(this.getIcon());
I.setAnonymous(true);
this._addAt(I,0);

if(this.getIcon()==null||this.getShow()===j){I.exclude();
}break;
}return I||arguments.callee.base.call(this,H);
},_forwardStates:{focused:true,hovered:true},_handleLabel:function(){if(this.getLabel()==null||this.getShow()===i){this._excludeChildControl(j);
}else{this._showChildControl(j);
}},_handleIcon:function(){if(this.getIcon()==null||this.getShow()===j){this._excludeChildControl(i);
}else{this._showChildControl(i);
}},_applyLabel:function(P,Q){var R=this.getChildControl(j,true);

if(R){R.setValue(P);
}this._handleLabel();
},_applyRich:function(M,N){var O=this.getChildControl(j,true);

if(O){O.setRich(M);
}},_applyIcon:function(J,K){var L=this.getChildControl(i,true);

if(L){L.setSource(J);
}this._handleIcon();
},_applyGap:function(x,y){this._getLayout().setGap(x);
},_applyShow:function(B,C){this._handleLabel();
this._handleIcon();
},_applyIconPosition:function(z,A){this._getLayout().setIconPosition(z);
},_applyCenter:function(D,E){this._getLayout().setCenter(D);
}}});
})();
(function(){var k="bottom",j="_applyLayoutChange",h="top",g="left",f="right",e="middle",d="center",c="qx.ui.layout.Atom",b="Integer",a="Boolean";
qx.Class.define(c,{extend:qx.ui.layout.Abstract,properties:{gap:{check:b,init:4,apply:j},iconPosition:{check:[g,h,f,k],init:g,apply:j},center:{check:a,init:false,apply:j}},members:{verifyLayoutProperty:null,renderLayout:function(w,x){var G=qx.ui.layout.Util;
var z=this.getIconPosition();
var C=this._getLayoutChildren();
var length=C.length;
var Q,top,P,A;
var L,F;
var J=this.getGap();
var O=this.getCenter();
if(z===k||z===f){var H=length-1;
var D=-1;
var B=-1;
}else{var H=0;
var D=length;
var B=1;
}if(z==h||z==k){if(O){var K=0;

for(var i=H;i!=D;i+=B){A=C[i].getSizeHint().height;

if(A>0){K+=A;

if(i!=H){K+=J;
}}}top=Math.round((x-K)/2);
}else{top=0;
}
for(var i=H;i!=D;i+=B){L=C[i];
F=L.getSizeHint();
P=Math.min(F.maxWidth,Math.max(w,F.minWidth));
A=F.height;
Q=G.computeHorizontalAlignOffset(d,P,w);
L.renderLayout(Q,top,P,A);
if(A>0){top+=A+J;
}}}else{var E=w;
var y=null;
var N=0;

for(var i=H;i!=D;i+=B){L=C[i];
P=L.getSizeHint().width;

if(P>0){if(!y&&L instanceof qx.ui.basic.Label){y=L;
}else{E-=P;
}N++;
}}
if(N>1){var M=(N-1)*J;
E-=M;
}
if(y){var F=y.getSizeHint();
var I=Math.max(F.minWidth,Math.min(E,F.maxWidth));
E-=I;
}
if(O&&E>0){Q=Math.round(E/2);
}else{Q=0;
}
for(var i=H;i!=D;i+=B){L=C[i];
F=L.getSizeHint();
A=Math.min(F.maxHeight,Math.max(x,F.minHeight));

if(L===y){P=I;
}else{P=F.width;
}top=G.computeVerticalAlignOffset(e,F.height,x);
L.renderLayout(Q,top,P,A);
if(P>0){Q+=P+J;
}}}},_computeSizeHint:function(){var v=this._getLayoutChildren();
var length=v.length;
var n,t;
if(length===1){var n=v[0].getSizeHint();
t={width:n.width,height:n.height,minWidth:n.minWidth,minHeight:n.minHeight};
}else{var r=0,s=0;
var o=0,q=0;
var p=this.getIconPosition();
var u=this.getGap();

if(p===h||p===k){var l=0;

for(var i=0;i<length;i++){n=v[i].getSizeHint();
s=Math.max(s,n.width);
r=Math.max(r,n.minWidth);
if(n.height>0){q+=n.height;
o+=n.minHeight;
l++;
}}
if(l>1){var m=(l-1)*u;
q+=m;
o+=m;
}}else{var l=0;

for(var i=0;i<length;i++){n=v[i].getSizeHint();
q=Math.max(q,n.height);
o=Math.max(o,n.minHeight);
if(n.width>0){s+=n.width;
r+=n.minWidth;
l++;
}}
if(l>1){var m=(l-1)*u;
s+=m;
r+=m;
}}t={minWidth:r,width:s,minHeight:o,height:q};
}return t;
}}});
})();
(function(){var g="middle",f="qx.ui.layout.Util",e="left",d="center",c="top",b="bottom",a="right";
qx.Class.define(f,{statics:{PERCENT_VALUE:/[0-9]+(?:\.[0-9]+)?%/,computeFlexOffsets:function(J,K,L){var N,R,M,S;
var O=K>L;
var T=Math.abs(K-L);
var U,P;
var Q={};

for(R in J){N=J[R];
Q[R]={potential:O?N.max-N.value:N.value-N.min,flex:O?N.flex:1/N.flex,offset:0};
}while(T!=0){S=Infinity;
M=0;

for(R in Q){N=Q[R];

if(N.potential>0){M+=N.flex;
S=Math.min(S,N.potential/N.flex);
}}if(M==0){break;
}S=Math.min(T,S*M)/M;
U=0;

for(R in Q){N=Q[R];

if(N.potential>0){P=Math.min(T,N.potential,Math.ceil(S*N.flex));
U+=P-S*N.flex;

if(U>=1){U-=1;
P-=1;
}N.potential-=P;

if(O){N.offset+=P;
}else{N.offset-=P;
}T-=P;
}}}return Q;
},computeHorizontalAlignOffset:function(bk,bl,bm,bn,bo){if(bn==null){bn=0;
}
if(bo==null){bo=0;
}var bp=0;

switch(bk){case e:bp=bn;
break;
case a:bp=bm-bl-bo;
break;
case d:bp=Math.round((bm-bl)/2);
if(bp<bn){bp=bn;
}else if(bp<bo){bp=Math.max(bn,bm-bl-bo);
}break;
}return bp;
},computeVerticalAlignOffset:function(be,bf,bg,bh,bi){if(bh==null){bh=0;
}
if(bi==null){bi=0;
}var bj=0;

switch(be){case c:bj=bh;
break;
case b:bj=bg-bf-bi;
break;
case g:bj=Math.round((bg-bf)/2);
if(bj<bh){bj=bh;
}else if(bj<bi){bj=Math.max(bh,bg-bf-bi);
}break;
}return bj;
},collapseMargins:function(x){var y=0,A=0;

for(var i=0,l=arguments.length;i<l;i++){var z=arguments[i];

if(z<0){A=Math.min(A,z);
}else if(z>0){y=Math.max(y,z);
}}return y+A;
},computeHorizontalGaps:function(B,C,D){if(C==null){C=0;
}var E=0;

if(D){E+=B[0].getMarginLeft();

for(var i=1,l=B.length;i<l;i+=1){E+=this.collapseMargins(C,B[i-1].getMarginRight(),B[i].getMarginLeft());
}E+=B[l-1].getMarginRight();
}else{for(var i=1,l=B.length;i<l;i+=1){E+=B[i].getMarginLeft()+B[i].getMarginRight();
}E+=(C*(l-1));
}return E;
},computeVerticalGaps:function(F,G,H){if(G==null){G=0;
}var I=0;

if(H){I+=F[0].getMarginTop();

for(var i=1,l=F.length;i<l;i+=1){I+=this.collapseMargins(G,F[i-1].getMarginBottom(),F[i].getMarginTop());
}I+=F[l-1].getMarginBottom();
}else{for(var i=1,l=F.length;i<l;i+=1){I+=F[i].getMarginTop()+F[i].getMarginBottom();
}I+=(G*(l-1));
}return I;
},computeHorizontalSeparatorGaps:function(V,W,X){var bb=qx.theme.manager.Decoration.getInstance().resolve(X);
var ba=bb.getInsets();
var Y=ba.left+ba.right;
var bc=0;

for(var i=0,l=V.length;i<l;i++){var bd=V[i];
bc+=bd.getMarginLeft()+bd.getMarginRight();
}bc+=(W+Y+W)*(l-1);
return bc;
},computeVerticalSeparatorGaps:function(h,j,k){var o=qx.theme.manager.Decoration.getInstance().resolve(k);
var n=o.getInsets();
var m=n.top+n.bottom;
var p=0;

for(var i=0,l=h.length;i<l;i++){var q=h[i];
p+=q.getMarginTop()+q.getMarginBottom();
}p+=(j+m+j)*(l-1);
return p;
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
(function(){var k="qx.dynlocale",j="text",i="Boolean",h="qx.client",g="color",f="userSelect",d="changeLocale",c="enabled",b="none",a="on",F="_applyTextAlign",E="qx.ui.core.Widget",D="gecko",C="changeTextAlign",B="_applyWrap",A="changeValue",z="changeContent",y="qx.ui.basic.Label",x="A",w="_applyValue",r="center",s="_applyBuddy",p="String",q="textAlign",n="right",o="changeRich",l="_applyRich",m="click",t="label",u="webkit",v="left";
qx.Class.define(y,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(K){arguments.callee.base.call(this);

if(K!=null){this.setValue(K);
}
if(qx.core.Variant.isSet(k,a)){qx.locale.Manager.getInstance().addListener(d,this._onChangeLocale,this);
}},properties:{rich:{check:i,init:false,event:o,apply:l},wrap:{check:i,init:true,apply:B},value:{check:p,apply:w,event:A,nullable:true},buddy:{check:E,apply:s,nullable:true,init:null},textAlign:{check:[v,r,n],nullable:true,themeable:true,apply:F,event:C},appearance:{refine:true,init:t},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__iP:null,__iQ:null,__iR:null,__iS:null,_getContentHint:function(){if(this.__iQ){this.__iT=this.__iU();
delete this.__iQ;
}return {width:this.__iT.width,height:this.__iT.height};
},_hasHeightForWidth:function(){return this.getRich()&&this.getWrap();
},_applySelectable:function(J){if(qx.core.Variant.isSet(h,D)){if(J&&!this.isRich()){{};
return;
}}arguments.callee.base.call(this,J);
if(qx.core.Variant.isSet(h,u)){this.getContainerElement().setStyle(f,J?j:b);
this.getContentElement().setStyle(f,J?j:b);
}},_getContentHeightForWidth:function(I){if(!this.getRich()&&!this.getWrap()){return null;
}return this.__iU(I).height;
},_createContentElement:function(){return new qx.html.Label;
},_applyTextAlign:function(S,T){this.getContentElement().setStyle(q,S);
},_applyTextColor:function(G,H){if(G){this.getContentElement().setStyle(g,qx.theme.manager.Color.getInstance().resolve(G));
}else{this.getContentElement().removeStyle(g);
}},__iT:{width:0,height:0},_applyFont:function(U,V){var W;

if(U){this.__iP=qx.theme.manager.Font.getInstance().resolve(U);
W=this.__iP.getStyles();
}else{this.__iP=null;
W=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(W);
this.__iQ=true;
qx.ui.core.queue.Layout.add(this);
},__iU:function(N){var R=qx.bom.Label;
var P=this.getFont();
var O=P?this.__iP.getStyles():qx.bom.Font.getDefaultStyles();
var content=this.getValue()||x;
var Q=this.getRich();
return Q?R.getHtmlSize(content,O,N):R.getTextSize(content,O);
},_applyBuddy:function(ba,bb){if(bb!=null){bb.removeBinding(this.__iR);
this.__iR=null;
this.removeListenerById(this.__iS);
this.__iS=null;
}
if(ba!=null){this.__iR=ba.bind(c,this,c);
this.__iS=this.addListener(m,ba.focus,ba);
}},_applyRich:function(L){this.getContentElement().setRich(L);
this.__iQ=true;
qx.ui.core.queue.Layout.add(this);
},_applyWrap:function(bc,bd){if(bc&&!this.isRich()){{};
}},_onChangeLocale:qx.core.Variant.select(k,{"on":function(e){var content=this.getValue();

if(content&&content.translate){this.setValue(content.translate());
}},"off":null}),_applyValue:function(X,Y){this.getContentElement().setValue(X);
this.__iQ=true;
qx.ui.core.queue.Layout.add(this);
this.fireDataEvent(z,X,Y);
}},destruct:function(){if(qx.core.Variant.isSet(k,a)){qx.locale.Manager.getInstance().removeListener(d,this._onChangeLocale,this);
}if(this.__iR!=null){var M=this.getBuddy();

if(M!=null&&!M.isDisposed()){M.removeBinding(this.__iR);
}}this.__iP=this.__iR=null;
}});
})();
(function(){var d="value",c="Please use the getValue() method instead.",b="qx.html.Label",a="Please use the setValue() method instead.";
qx.Class.define(b,{extend:qx.html.Element,members:{__iV:null,_applyProperty:function(name,k){arguments.callee.base.call(this,name,k);

if(name==d){var l=this.getDomElement();
qx.bom.Label.setValue(l,k);
}},_createDomElement:function(){var f=this.__iV;
var e=qx.bom.Label.create(this._content,f);
return e;
},_copyData:function(m){return arguments.callee.base.call(this,true);
},setRich:function(g){var h=this.getDomElement();

if(h){throw new Error("The label mode cannot be modified after initial creation");
}g=!!g;

if(this.__iV==g){return;
}this.__iV=g;
return this;
},setValue:function(j){this._setProperty(d,j);
return this;
},getValue:function(){return this._getProperty(d);
},setContent:function(i){qx.log.Logger.deprecatedMethodWarning(arguments.callee,a);
return this.setValue(i);
},getContent:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,c);
return this.getValue();
}}});
})();
(function(){var j="qx.client",i="gecko",h="div",g="inherit",f="text",e="value",d="",c="hidden",b="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",a="nowrap",A="auto",z="ellipsis",y="normal",x="label",w="px",v="crop",u="end",t="100%",s="visible",r="qx.bom.Label",p="Please use the setValue() method instead.",q="opera",n="Please use the getValue() method instead.",o="block",l="none",m="-1000px",k="absolute";
qx.Class.define(r,{statics:{__iW:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__iX:function(){var Q=this.__ja(false);
document.body.insertBefore(Q,document.body.firstChild);
return this._textElement=Q;
},__iY:function(){var X=this.__ja(true);
document.body.insertBefore(X,document.body.firstChild);
return this._htmlElement=X;
},__ja:function(G){var H=qx.bom.Element.create(h);
var I=H.style;
I.width=I.height=A;
I.left=I.top=m;
I.visibility=c;
I.position=k;
I.overflow=s;

if(G){I.whiteSpace=y;
}else{I.whiteSpace=a;

if(qx.core.Variant.isSet(j,i)){var J=document.createElementNS(b,x);
for(var K in this.__iW){J.style[K]=g;
}H.appendChild(J);
}}return H;
},__jb:function(R){var S={};

if(R){S.whiteSpace=y;
}else if(qx.core.Variant.isSet(j,i)){S.display=o;
}else{S.overflow=c;
S.whiteSpace=a;
S.textOverflow=z;
S.userSelect=l;
if(qx.core.Variant.isSet(j,q)){S.OTextOverflow=z;
}}return S;
},create:function(content,B,C){if(!C){C=window;
}
if(B){var D=C.document.createElement(h);
D.useHtml=true;
}else if(qx.core.Variant.isSet(j,i)){var D=C.document.createElement(h);
var E=C.document.createElementNS(b,x);
E.style.cursor=g;
E.style.color=g;
E.style.overflow=c;
E.style.maxWidth=t;
for(var F in this.__iW){E.style[F]=g;
}E.setAttribute(v,u);
D.appendChild(E);
}else{var D=C.document.createElement(h);
qx.bom.element.Style.setStyles(D,this.__jb(B));
}
if(content){this.setValue(D,content);
}return D;
},setValue:function(L,M){M=M||d;

if(L.useHtml){L.innerHTML=M;
}else if(qx.core.Variant.isSet(j,i)){L.firstChild.setAttribute(e,M);
}else{qx.bom.element.Attribute.set(L,f,M);
}},getValue:function(bb){if(bb.useHtml){return bb.innerHTML;
}else if(qx.core.Variant.isSet(j,i)){return bb.firstChild.getAttribute(e)||d;
}else{return qx.bom.element.Attribute.get(bb,f);
}},getHtmlSize:function(content,N,O){var P=this._htmlElement||this.__iY();
P.style.width=O!==undefined?O+w:A;
P.innerHTML=content;
return this.__jc(P,N);
},getTextSize:function(U,V){var W=this._textElement||this.__iX();

if(qx.core.Variant.isSet(j,i)){W.firstChild.setAttribute(e,U);
}else{qx.bom.element.Attribute.set(W,f,U);
}return this.__jc(W,V);
},__jc:function(bc,bd){var be=this.__iW;

if(!bd){bd={};
}
for(var bf in be){bc.style[bf]=bd[bf]||d;
}var bg=qx.bom.element.Dimension.getSize(bc);

if(qx.core.Variant.isSet(j,i)){if(!qx.bom.client.Platform.WIN){bg.width++;
}}return bg;
},setContent:function(Y,ba){qx.log.Logger.deprecatedMethodWarning(arguments.callee,p);
this.setValue(Y,ba);
},getContent:function(T){qx.log.Logger.deprecatedMethodWarning(arguments.callee,n);
return this.getValue(T);
}}});
})();
(function(){var g="mshtml",f="qx.client",e="qx.bom.element.Dimension",d="paddingRight",c="paddingLeft",b="paddingTop",a="paddingBottom";
qx.Class.define(e,{statics:{getWidth:qx.core.Variant.select(f,{"gecko":function(B){if(B.getBoundingClientRect){var C=B.getBoundingClientRect();
return Math.round(C.right)-Math.round(C.left);
}else{return B.offsetWidth;
}},"default":function(x){return x.offsetWidth;
}}),getHeight:qx.core.Variant.select(f,{"gecko":function(y){if(y.getBoundingClientRect){var z=y.getBoundingClientRect();
return Math.round(z.bottom)-Math.round(z.top);
}else{return y.offsetHeight;
}},"default":function(A){return A.offsetHeight;
}}),getSize:function(o){return {width:this.getWidth(o),height:this.getHeight(o)};
},__jd:{visible:true,hidden:true},getContentWidth:function(q){var s=qx.bom.element.Style;
var t=qx.bom.element.Overflow.getX(q);
var u=parseInt(s.get(q,c),10);
var w=parseInt(s.get(q,d),10);

if(this.__jd[t]){return q.clientWidth-u-w;
}else{if(q.clientWidth>=q.scrollWidth){return Math.max(q.clientWidth,q.scrollWidth)-u-w;
}else{var v=q.scrollWidth-u;
var r=qx.bom.client.Engine;

if(r.NAME===g&&r.VERSION==6){v-=w;
}return v;
}}},getContentHeight:function(h){var j=qx.bom.element.Style;
var l=qx.bom.element.Overflow.getY(h);
var m=parseInt(j.get(h,b),10);
var k=parseInt(j.get(h,a),10);

if(this.__jd[l]){return h.clientHeight-m-k;
}else{if(h.clientHeight>=h.scrollHeight){return Math.max(h.clientHeight,h.scrollHeight)-m-k;
}else{var n=h.scrollHeight-m;
var i=qx.bom.client.Engine;

if(i.NAME===g&&i.VERSION==6){n-=k;
}return n;
}}},getContentSize:function(p){return {width:this.getContentWidth(p),height:this.getContentHeight(p)};
}}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IForm";
qx.Interface.define(a,{events:{"changeEnabled":b,"changeValid":b,"changeInvalidMessage":b,"changeRequired":b},members:{setEnabled:function(c){return arguments.length==1;
},getEnabled:function(){},setRequired:function(e){return arguments.length==1;
},getRequired:function(){},setValid:function(f){return arguments.length==1;
},getValid:function(){},setInvalidMessage:function(d){return arguments.length==1;
},getInvalidMessage:function(){}}});
})();
(function(){var h="Use 'getBlocker().getContentBlockerElement()' instead.",g="Use 'getBlocker().getBlockerElement()' instead.",f="_applyBlockerColor",e="Number",d="__je",c="qx.ui.core.MBlocker",b="_applyBlockerOpacity",a="Color";
qx.Mixin.define(c,{construct:function(){this.__je=new qx.ui.core.Blocker(this);
},properties:{blockerColor:{check:a,init:null,nullable:true,apply:f,themeable:true},blockerOpacity:{check:e,init:1,apply:b,themeable:true}},members:{__je:null,_applyBlockerColor:function(k,l){this.__je.setColor(k);
},_applyBlockerOpacity:function(i,j){this.__je.setOpacity(i);
},block:function(){this.__je.block();
},isBlocked:function(){return this.__je.isBlocked();
},unblock:function(){this.__je.unblock();
},forceUnblock:function(){this.__je.forceUnblock();
},blockContent:function(m){this.__je.blockContent(m);
},isContentBlocked:function(){return this.__je.isContentBlocked();
},unblockContent:function(){this.__je.unblockContent();
},forceUnblockContent:function(){this.__je.forceUnblockContent();
},_getContentBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,h);
return this.__je.getContentBlockerElement();
},_getBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,g);
return this.__je.getBlockerElement();
},getBlocker:function(){return this.__je;
}},destruct:function(){this._disposeObjects(d);
}});
})();
(function(){var i="qx.ui.window.Window",h="changeModal",g="changeVisibility",f="changeActive",d="_applyActiveWindow",c="__jf",b="__jg",a="qx.ui.window.MDesktop";
qx.Mixin.define(a,{properties:{activeWindow:{check:i,apply:d,init:null,nullable:true}},members:{__jf:null,__jg:null,getWindowManager:function(){if(!this.__jg){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());
}return this.__jg;
},supportsMaximize:function(){return true;
},setWindowManager:function(o){if(this.__jg){this.__jg.setDesktop(null);
}o.setDesktop(this);
this.__jg=o;
},_onChangeActive:function(e){if(e.getData()){this.setActiveWindow(e.getTarget());
}else if(this.getActiveWindow()==e.getTarget()){this.setActiveWindow(null);
}},_applyActiveWindow:function(k,l){this.getWindowManager().changeActiveWindow(k,l);

if(k){k.setActive(true);
}
if(l){l.resetActive();
}},_onChangeModal:function(e){this.getWindowManager().updateStack();
},_onChangeVisibility:function(){this.getWindowManager().updateStack();
},_afterAddChild:function(j){if(qx.Class.isDefined(i)&&j instanceof qx.ui.window.Window){this._addWindow(j);
}},_addWindow:function(m){if(!qx.lang.Array.contains(this.getWindows(),m)){this.getWindows().push(m);
m.addListener(f,this._onChangeActive,this);
m.addListener(h,this._onChangeModal,this);
m.addListener(g,this._onChangeVisibility,this);
}
if(m.getActive()){this.setActiveWindow(m);
}this.getWindowManager().updateStack();
},_afterRemoveChild:function(p){if(qx.Class.isDefined(i)&&p instanceof qx.ui.window.Window){this._removeWindow(p);
}},_removeWindow:function(n){qx.lang.Array.remove(this.getWindows(),n);
n.removeListener(f,this._onChangeActive,this);
n.removeListener(h,this._onChangeModal,this);
n.removeListener(g,this._onChangeVisibility,this);
this.getWindowManager().updateStack();
},getWindows:function(){if(!this.__jf){this.__jf=[];
}return this.__jf;
}},destruct:function(){this._disposeArray(c);
this._disposeObjects(b);
}});
})();
(function(){var r="contextmenu",q="help",p="qx.client",o="changeGlobalCursor",n="abstract",m="Boolean",l="root",k="",j=" !important",i="_applyGlobalCursor",f="_applyNativeHelp",h=";",g="qx.ui.root.Abstract",d="String",c="*";
qx.Class.define(g,{type:n,extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){arguments.callee.base.call(this);
qx.ui.core.FocusHandler.getInstance().addRoot(this);
qx.ui.core.queue.Visibility.add(this);
this.initNativeHelp();
},properties:{appearance:{refine:true,init:l},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:d,nullable:true,themeable:true,apply:i,event:o},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:m,init:false,apply:f}},members:{__jh:null,isRootWidget:function(){return true;
},getLayout:function(){return this._getLayout();
},_applyGlobalCursor:qx.core.Variant.select(p,{"mshtml":function(s,t){},"default":function(w,x){var y=qx.bom.Stylesheet;
var z=this.__jh;

if(!z){this.__jh=z=y.createElement();
}y.removeAllRules(z);

if(w){y.addRule(z,c,qx.bom.element.Cursor.compile(w).replace(h,k)+j);
}}}),_applyNativeContextMenu:function(u,v){if(u){this.removeListener(r,this._onNativeContextMenu,this,true);
}else{this.addListener(r,this._onNativeContextMenu,this,true);
}},_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;
}e.preventDefault();
},_applyNativeHelp:qx.core.Variant.select(p,{"mshtml":function(A,B){if(B===false){qx.bom.Event.removeNativeListener(document,q,qx.lang.Function.returnFalse);
}
if(A===false){qx.bom.Event.addNativeListener(document,q,qx.lang.Function.returnFalse);
}},"default":function(){}})},destruct:function(){this.__jh=null;
},defer:function(a,b){qx.ui.core.MChildrenHandling.remap(b);
}});
})();
(function(){var n="resize",m="position",l="0px",k="webkit",j="paddingLeft",i="$$widget",h="qx.ui.root.Application",g="hidden",f="qx.client",d="div",a="paddingTop",c="100%",b="absolute";
qx.Class.define(h,{extend:qx.ui.root.Abstract,construct:function(x){this.__ji=qx.dom.Node.getWindow(x);
this.__jj=x;
arguments.callee.base.call(this);
qx.event.Registration.addListener(this.__ji,n,this._onResize,this);
this._setLayout(new qx.ui.layout.Canvas());
qx.ui.core.queue.Layout.add(this);
qx.ui.core.FocusHandler.getInstance().connectTo(this);
this.getContentElement().disableScrolling();
},members:{__ji:null,__jj:null,_createContainerElement:function(){var o=this.__jj;

if(qx.core.Variant.isSet(f,k)){if(!o.body){alert("The application could not be started due to a missing body tag in the HTML file!");
}}var s=o.documentElement.style;
var p=o.body.style;
s.overflow=p.overflow=g;
s.padding=s.margin=p.padding=p.margin=l;
s.width=s.height=p.width=p.height=c;
var r=o.createElement(d);
o.body.appendChild(r);
var q=new qx.html.Root(r);
q.setStyle(m,b);
q.setAttribute(i,this.toHashCode());
return q;
},_onResize:function(e){qx.ui.core.queue.Layout.add(this);
},_computeSizeHint:function(){var t=qx.bom.Viewport.getWidth(this.__ji);
var u=qx.bom.Viewport.getHeight(this.__ji);
return {minWidth:t,width:t,maxWidth:t,minHeight:u,height:u,maxHeight:u};
},_applyPadding:function(v,w,name){if(v&&(name==a||name==j)){throw new Error("The root widget does not support 'left', or 'top' paddings!");
}arguments.callee.base.call(this,v,w,name);
},_applyDecorator:function(y,z){arguments.callee.base.call(this,y,z);

if(!y){return;
}var A=this.getDecoratorElement().getInsets();

if(A.left||A.top){throw new Error("The root widget does not support decorators with 'left', or 'top' insets!");
}}},destruct:function(){this.__ji=this.__jj=null;
}});
})();
(function(){var z="zIndex",y="px",x="keydown",w="deactivate",v="This method is not needed anymore.",u="resize",t="keyup",s="keypress",r="__jn",q="backgroundColor",M="_applyOpacity",L="Use 'getBlockerElement' instead.",K="__jp",J="opacity",I="interval",H="Tab",G="Color",F="qx.ui.root.Page",E="__js",D="Use 'getContentBlockerElement' instead.",B="Number",C="qx.ui.core.Blocker",A="_applyColor";
qx.Class.define(C,{extend:qx.core.Object,construct:function(g){arguments.callee.base.call(this);
this._widget=g;
this._isPageRoot=(qx.Class.isDefined(F)&&g instanceof qx.ui.root.Page);

if(this._isPageRoot){g.addListener(u,this.__jt,this);
}this.__jk=[];
this.__jl=[];
this.__jm=[];
},properties:{color:{check:G,init:null,nullable:true,apply:A,themeable:true},opacity:{check:B,init:1,apply:M,themeable:true}},members:{__jn:null,__jo:0,__jp:null,__jm:null,__jk:null,__jl:null,__jq:null,__jr:0,__js:null,_isPageRoot:false,_widget:null,__jt:function(e){var O=e.getData();

if(this.isContentBlocked()){this.getContentBlockerElement().setStyles({width:O.width,height:O.height});
}
if(this.isBlocked()){this.getBlockerElement().setStyles({width:O.width,height:O.height});
}},_applyColor:function(n,o){var p=qx.theme.manager.Color.getInstance().resolve(n);
this.__ju(q,p);
},_applyOpacity:function(T,U){this.__ju(J,T);
},__ju:function(b,c){var d=[];
this.__jn&&d.push(this.__jn);
this.__jp&&d.push(this.__jp);

for(var i=0;i<d.length;i++){d[i].setStyle(b,c);
}},_saveAndSetAnonymousState:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,v);
this.__jr+=1;

if(this.__jr==1){this.__jq=this._widget.getAnonymous();
this._widget.setAnonymous(true);
}},_restoreAnonymousState:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,v);
this.__jr-=1;

if(this.__jr==0){this._widget.setAnonymous(this.__jq);
}},_backupActiveWidget:function(){var V=qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);
this.__jk.push(V.getActive());
this.__jl.push(V.getFocus());

if(this._widget.isFocusable()){this._widget.focus();
}},_restoreActiveWidget:function(){var m=this.__jk.length;

if(m>0){var l=this.__jk[m-1];

if(l){qx.bom.Element.activate(l);
}this.__jk.pop();
}var k=this.__jl.length;

if(k>0){var l=this.__jl[k-1];

if(l){qx.bom.Element.focus(this.__jl[k-1]);
}this.__jl.pop();
}},__jv:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());
},_getBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,L);
return this.getBlockerElement();
},getBlockerElement:function(){if(!this.__jn){this.__jn=this.__jv();
this.__jn.setStyle(z,15);
this._widget.getContainerElement().add(this.__jn);
this.__jn.exclude();
}return this.__jn;
},block:function(){this.__jo++;

if(this.__jo<2){this._backupActiveWidget();
var a=this.getBlockerElement();
a.include();
a.activate();
a.addListener(w,this.__jA,this);
a.addListener(s,this.__jz,this);
a.addListener(x,this.__jz,this);
a.addListener(t,this.__jz,this);
}},isBlocked:function(){return this.__jo>0;
},unblock:function(){if(!this.isBlocked()){return;
}this.__jo--;

if(this.__jo<1){this.__jw();
}},forceUnblock:function(){if(!this.isBlocked()){return;
}this.__jo=0;
this.__jw();
},__jw:function(){this._restoreActiveWidget();
var N=this.getBlockerElement();
N.removeListener(w,this.__jA,this);
N.removeListener(s,this.__jz,this);
N.removeListener(x,this.__jz,this);
N.removeListener(t,this.__jz,this);
N.exclude();
},_getContentBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,D);
return this.getContentBlockerElement();
},getContentBlockerElement:function(){if(!this.__jp){this.__jp=this.__jv();
this._widget.getContentElement().add(this.__jp);
this.__jp.exclude();
}return this.__jp;
},blockContent:function(R){var S=this.getContentBlockerElement();
S.setStyle(z,R);
this.__jm.push(R);

if(this.__jm.length<2){S.include();

if(this._isPageRoot){if(!this.__js){this.__js=new qx.event.Timer(300);
this.__js.addListener(I,this.__jy,this);
}this.__js.start();
this.__jy();
}}},isContentBlocked:function(){return this.__jm.length>0;
},unblockContent:function(){if(!this.isContentBlocked()){return;
}this.__jm.pop();
var h=this.__jm[this.__jm.length-1];
var j=this.getContentBlockerElement();
j.setStyle(z,h);

if(this.__jm.length<1){this.__jx();
}},forceUnblockContent:function(){if(!this.isContentBlocked()){return;
}this.__jm=[];
var f=this.getContentBlockerElement();
f.setStyle(z,null);
this.__jx();
},__jx:function(){this.getContentBlockerElement().exclude();

if(this._isPageRoot){this.__js.stop();
}},__jy:function(){var P=this._widget.getContainerElement().getDomElement();
var Q=qx.dom.Node.getDocument(P);
this.getContentBlockerElement().setStyles({height:Q.documentElement.scrollHeight+y,width:Q.documentElement.scrollWidth+y});
},__jz:function(e){if(e.getKeyIdentifier()==H){e.stop();
}},__jA:function(){this.getBlockerElement().activate();
}},destruct:function(){if(this._isPageRoot){this._widget.removeListener(u,this.__jt,this);
}this._disposeObjects(K,r,E);
this.__jq=this.__jk=this.__jl=this._widget=this.__jm=null;
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
}this.addListener(o,this.__jB,this);
this.addListener(p,this.__jB,this);
},members:{_stopPropagation:function(e){e.stopPropagation();
},__jB:function(){var w=this.getStyle(v);
this.setStyle(v,null,true);
this.setStyle(v,w,true);
}}});
})();
(function(){var S="keypress",R="focusout",Q="__jC",P="activate",O="Tab",N="singleton",M="deactivate",L="focusin",K="qx.ui.core.FocusHandler";
qx.Class.define(K,{extend:qx.core.Object,type:N,construct:function(){arguments.callee.base.call(this);
this.__jC={};
},members:{__jC:null,__jD:null,__jE:null,__jF:null,connectTo:function(D){D.addListener(S,this.__jG,this);
D.addListener(L,this._onFocusIn,this,true);
D.addListener(R,this._onFocusOut,this,true);
D.addListener(P,this._onActivate,this,true);
D.addListener(M,this._onDeactivate,this,true);
},addRoot:function(B){this.__jC[B.$$hash]=B;
},removeRoot:function(t){delete this.__jC[t.$$hash];
},getActiveWidget:function(){return this.__jD;
},isActive:function(C){return this.__jD==C;
},getFocusedWidget:function(){return this.__jE;
},isFocused:function(A){return this.__jE==A;
},isFocusRoot:function(T){return !!this.__jC[T.$$hash];
},_onActivate:function(e){var ba=e.getTarget();
this.__jD=ba;
var Y=this.__jH(ba);

if(Y!=this.__jF){this.__jF=Y;
}},_onDeactivate:function(e){var E=e.getTarget();

if(this.__jD==E){this.__jD=null;
}},_onFocusIn:function(e){var a=e.getTarget();

if(a!=this.__jE){this.__jE=a;
a.visualizeFocus();
}},_onFocusOut:function(e){var X=e.getTarget();

if(X==this.__jE){this.__jE=null;
X.visualizeBlur();
}},__jG:function(e){if(e.getKeyIdentifier()!=O){return;
}
if(!this.__jF){return;
}e.stopPropagation();
e.preventDefault();
var I=this.__jE;

if(!e.isShiftPressed()){var J=I?this.__jL(I):this.__jJ();
}else{var J=I?this.__jM(I):this.__jK();
}if(J){J.tabFocus();
}},__jH:function(u){var v=this.__jC;

while(u){if(v[u.$$hash]){return u;
}u=u.getLayoutParent();
}return null;
},__jI:function(g,h){if(g===h){return 0;
}var k=g.getTabIndex()||0;
var j=h.getTabIndex()||0;

if(k!=j){return k-j;
}var q=g.getContainerElement().getDomElement();
var p=h.getContainerElement().getDomElement();
var o=qx.bom.element.Location;
var n=o.get(q);
var m=o.get(p);
if(n.top!=m.top){return n.top-m.top;
}if(n.left!=m.left){return n.left-m.left;
}var r=g.getZIndex();
var s=h.getZIndex();

if(r!=s){return r-s;
}return 0;
},__jJ:function(){return this.__jP(this.__jF,null);
},__jK:function(){return this.__jQ(this.__jF,null);
},__jL:function(bb){var bc=this.__jF;

if(bc==bb){return this.__jJ();
}
while(bb&&bb.getAnonymous()){bb=bb.getLayoutParent();
}
if(bb==null){return [];
}var bd=[];
this.__jN(bc,bb,bd);
bd.sort(this.__jI);
var be=bd.length;
return be>0?bd[0]:this.__jJ();
},__jM:function(b){var c=this.__jF;

if(c==b){return this.__jK();
}
while(b&&b.getAnonymous()){b=b.getLayoutParent();
}
if(b==null){return [];
}var d=[];
this.__jO(c,b,d);
d.sort(this.__jI);
var f=d.length;
return f>0?d[f-1]:this.__jK();
},__jN:function(parent,bf,bg){var bh=parent.getLayoutChildren();
var bi;

for(var i=0,l=bh.length;i<l;i++){bi=bh[i];
if(!(bi instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(bi)&&bi.isEnabled()&&bi.isVisible()){if(bi.isTabable()&&this.__jI(bf,bi)<0){bg.push(bi);
}this.__jN(bi,bf,bg);
}}},__jO:function(parent,w,x){var y=parent.getLayoutChildren();
var z;

for(var i=0,l=y.length;i<l;i++){z=y[i];
if(!(z instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(z)&&z.isEnabled()&&z.isVisible()){if(z.isTabable()&&this.__jI(w,z)>0){x.push(z);
}this.__jO(z,w,x);
}}},__jP:function(parent,U){var V=parent.getLayoutChildren();
var W;

for(var i=0,l=V.length;i<l;i++){W=V[i];
if(!(W instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(W)&&W.isEnabled()&&W.isVisible()){if(W.isTabable()){if(U==null||this.__jI(W,U)<0){U=W;
}}U=this.__jP(W,U);
}}return U;
},__jQ:function(parent,F){var G=parent.getLayoutChildren();
var H;

for(var i=0,l=G.length;i<l;i++){H=G[i];
if(!(H instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(H)&&H.isEnabled()&&H.isVisible()){if(H.isTabable()){if(F==null||this.__jI(H,F)>0){F=H;
}}F=this.__jQ(H,F);
}}return F;
}},destruct:function(){this._disposeMap(Q);
this.__jE=this.__jD=this.__jF=null;
}});
})();
(function(){var l="qx.client",k="head",j="text/css",h="stylesheet",g="}",f='@import "',e="{",d='";',c="qx.bom.Stylesheet",b="link",a="style";
qx.Class.define(c,{statics:{includeFile:function(m,n){if(!n){n=document;
}var o=n.createElement(b);
o.type=j;
o.rel=h;
o.href=qx.util.ResourceManager.getInstance().toUri(m);
var p=n.getElementsByTagName(k)[0];
p.appendChild(o);
},createElement:qx.core.Variant.select(l,{"mshtml":function(q){var r=document.createStyleSheet();

if(q){r.cssText=q;
}return r;
},"default":function(s){var t=document.createElement(a);
t.type=j;

if(s){t.appendChild(document.createTextNode(s));
}document.getElementsByTagName(k)[0].appendChild(t);
return t.sheet;
}}),addRule:qx.core.Variant.select(l,{"mshtml":function(A,B,C){A.addRule(B,C);
},"default":function(D,E,F){D.insertRule(E+e+F+g,D.cssRules.length);
}}),removeRule:qx.core.Variant.select(l,{"mshtml":function(ba,bb){var bc=ba.rules;
var bd=bc.length;

for(var i=bd-1;i>=0;--i){if(bc[i].selectorText==bb){ba.removeRule(i);
}}},"default":function(w,x){var y=w.cssRules;
var z=y.length;

for(var i=z-1;i>=0;--i){if(y[i].selectorText==x){w.deleteRule(i);
}}}}),removeAllRules:qx.core.Variant.select(l,{"mshtml":function(W){var X=W.rules;
var Y=X.length;

for(var i=Y-1;i>=0;i--){W.removeRule(i);
}},"default":function(Q){var R=Q.cssRules;
var S=R.length;

for(var i=S-1;i>=0;i--){Q.deleteRule(i);
}}}),addImport:qx.core.Variant.select(l,{"mshtml":function(u,v){u.addImport(v);
},"default":function(K,L){K.insertRule(f+L+d,K.cssRules.length);
}}),removeImport:qx.core.Variant.select(l,{"mshtml":function(G,H){var I=G.imports;
var J=I.length;

for(var i=J-1;i>=0;i--){if(I[i].href==H){G.removeImport(i);
}}},"default":function(M,N){var O=M.cssRules;
var P=O.length;

for(var i=P-1;i>=0;i--){if(O[i].href==N){M.deleteRule(i);
}}}}),removeAllImports:qx.core.Variant.select(l,{"mshtml":function(be){var bf=be.imports;
var bg=bf.length;

for(var i=bg-1;i>=0;i--){be.removeImport(i);
}},"default":function(T){var U=T.cssRules;
var V=U.length;

for(var i=V-1;i>=0;i--){if(U[i].type==U[i].IMPORT_RULE){T.deleteRule(i);
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
qx.Class.define(a,{extend:qx.html.Element,construct:function(b){arguments.callee.base.call(this);

if(b!=null){this.useElement(b);
}},members:{useElement:function(c){arguments.callee.base.call(this,c);
this.setRoot(true);
qx.html.Element._modified[this.$$hash]=this;
}}});
})();
(function(){var n="_applyLayoutChange",m="top",k="left",j="middle",h="Decorator",g="center",f="_applyReversed",e="bottom",d="qx.ui.layout.VBox",c="Integer",a="right",b="Boolean";
qx.Class.define(d,{extend:qx.ui.layout.Abstract,construct:function(bi,bj,bk){arguments.callee.base.call(this);

if(bi){this.setSpacing(bi);
}
if(bj){this.setAlignY(bj);
}
if(bk){this.setSeparator(bk);
}},properties:{alignY:{check:[m,j,e],init:m,apply:n},alignX:{check:[k,g,a],init:k,apply:n},spacing:{check:c,init:0,apply:n},separator:{check:h,nullable:true,apply:n},reversed:{check:b,init:false,apply:f}},members:{__jR:null,__jS:null,__jT:null,__jU:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__jV:function(){var bh=this._getLayoutChildren();
var length=bh.length;
var bd=false;
var bc=this.__jR&&this.__jR.length!=length&&this.__jS&&this.__jR;
var bf;
var be=bc?this.__jR:new Array(length);
var bg=bc?this.__jS:new Array(length);
if(this.getReversed()){bh=bh.concat().reverse();
}for(var i=0;i<length;i++){bf=bh[i].getLayoutProperties();

if(bf.height!=null){be[i]=parseFloat(bf.height)/100;
}
if(bf.flex!=null){bg[i]=bf.flex;
bd=true;
}else{bg[i]=0;
}}if(!bc){this.__jR=be;
this.__jS=bg;
}this.__jT=bd;
this.__jU=bh;
delete this._invalidChildrenCache;
},verifyLayoutProperty:null,renderLayout:function(o,p){if(this._invalidChildrenCache){this.__jV();
}var w=this.__jU;
var length=w.length;
var G=qx.ui.layout.Util;
var F=this.getSpacing();
var J=this.getSeparator();

if(J){var t=G.computeVerticalSeparatorGaps(w,F,J);
}else{var t=G.computeVerticalGaps(w,F,true);
}var i,r,s,A;
var B=[];
var H=t;

for(i=0;i<length;i+=1){A=this.__jR[i];
s=A!=null?Math.floor((p-t)*A):w[i].getSizeHint().height;
B.push(s);
H+=s;
}if(this.__jT&&H!=p){var y={};
var E,I;

for(i=0;i<length;i+=1){E=this.__jS[i];

if(E>0){x=w[i].getSizeHint();
y[i]={min:x.minHeight,value:B[i],max:x.maxHeight,flex:E};
}}var u=G.computeFlexOffsets(y,p,H);

for(i in u){I=u[i].offset;
B[i]+=I;
H+=I;
}}var top=w[0].getMarginTop();
if(H<p&&this.getAlignY()!=m){top=p-H;

if(this.getAlignY()===j){top=Math.round(top/2);
}}var x,L,C,s,z,D,v;
this._clearSeparators();
if(J){var K=qx.theme.manager.Decoration.getInstance().resolve(J).getInsets();
var q=K.top+K.bottom;
}for(i=0;i<length;i+=1){r=w[i];
s=B[i];
x=r.getSizeHint();
D=r.getMarginLeft();
v=r.getMarginRight();
C=Math.max(x.minWidth,Math.min(o-D-v,x.maxWidth));
L=G.computeHorizontalAlignOffset(r.getAlignX()||this.getAlignX(),C,o,D,v);
if(i>0){if(J){top+=z+F;
this._renderSeparator(J,{top:top,left:0,height:q,width:o});
top+=q+F+r.getMarginTop();
}else{top+=G.collapseMargins(F,z,r.getMarginTop());
}}r.renderLayout(L,top,C,s);
top+=s;
z=r.getMarginBottom();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__jV();
}var S=qx.ui.layout.Util;
var bb=this.__jU;
var O=0,R=0,Q=0;
var M=0,T=0;
var X,N,ba;
for(var i=0,l=bb.length;i<l;i+=1){X=bb[i];
N=X.getSizeHint();
R+=N.height;
var W=this.__jS[i];
var P=this.__jR[i];

if(W){O+=N.minHeight;
}else if(P){Q=Math.max(Q,Math.round(N.minHeight/P));
}else{O+=N.height;
}ba=X.getMarginLeft()+X.getMarginRight();
if((N.width+ba)>T){T=N.width+ba;
}if((N.minWidth+ba)>M){M=N.minWidth+ba;
}}O+=Q;
var V=this.getSpacing();
var Y=this.getSeparator();

if(Y){var U=S.computeVerticalSeparatorGaps(bb,V,Y);
}else{var U=S.computeVerticalGaps(bb,V,true);
}return {minHeight:O+U,height:R+U,minWidth:M,width:T};
}},destruct:function(){this.__jR=this.__jS=this.__jU=null;
}});
})();
(function(){var l="indexOf",k="addAfter",j="add",i="addBefore",h="_",g="addAt",f="hasChildren",e="removeAt",d="removeAll",c="getChildren",a="remove",b="qx.ui.core.MRemoteChildrenHandling";
qx.Mixin.define(b,{members:{__jW:function(A,B,C,D){var E=this.getChildrenContainer();

if(E===this){A=h+A;
}return (E[A])(B,C,D);
},getChildren:function(){return this.__jW(c);
},hasChildren:function(){return this.__jW(f);
},add:function(s,t){return this.__jW(j,s,t);
},remove:function(m){return this.__jW(a,m);
},removeAll:function(){return this.__jW(d);
},indexOf:function(q){return this.__jW(l,q);
},addAt:function(u,v,w){this.__jW(g,u,v,w);
},addBefore:function(n,o,p){this.__jW(i,n,o,p);
},addAfter:function(x,y,z){this.__jW(k,x,y,z);
},removeAt:function(r){this.__jW(e,r);
}}});
})();
(function(){var a="qx.ui.core.MRemoteLayoutHandling";
qx.Mixin.define(a,{members:{setLayout:function(b){return this.getChildrenContainer().setLayout(b);
},getLayout:function(){return this.getChildrenContainer().getLayout();
}}});
})();
(function(){var k="Boolean",j="resize",i="mousedown",h="w-resize",g="sw-resize",f="n-resize",d="resizableRight",c="ne-resize",b="se-resize",a="Integer",z="e-resize",y="resizableLeft",x="mousemove",w="move",v="shorthand",u="maximized",t="nw-resize",s="mouseout",r="qx.ui.core.MResizable",q="mouseup",o="losecapture",p="resize-frame",m="resizableBottom",n="s-resize",l="resizableTop";
qx.Mixin.define(r,{construct:function(){this.addListener(i,this.__ki,this,true);
this.addListener(q,this.__kj,this);
this.addListener(x,this.__kl,this);
this.addListener(s,this.__km,this);
this.addListener(o,this.__kk,this);
},properties:{resizableTop:{check:k,init:true},resizableRight:{check:k,init:true},resizableBottom:{check:k,init:true},resizableLeft:{check:k,init:true},resizable:{group:[l,d,m,y],mode:v},resizeSensitivity:{check:a,init:5},useResizeFrame:{check:k,init:true}},members:{__jX:null,__jY:null,__ka:null,__kb:null,__kc:null,RESIZE_TOP:1,RESIZE_BOTTOM:2,RESIZE_LEFT:4,RESIZE_RIGHT:8,__kd:function(){var V=this.__jX;

if(!V){V=this.__jX=new qx.ui.core.Widget();
V.setAppearance(p);
V.exclude();
qx.core.Init.getApplication().getRoot().add(V);
}return V;
},__ke:function(){var S=this.__kc;
var R=this.__kd();
R.setUserBounds(S.left,S.top,S.width,S.height);
R.show();
R.setZIndex(this.getZIndex()+1);
},__kf:function(e){var B=this.__jY;
var C=this.getSizeHint();
var E=this.__kc;
var A=E.width;
var D=E.height;
var G=E.left;
var top=E.top;
var F;

if((B&this.RESIZE_TOP)||(B&this.RESIZE_BOTTOM)){F=e.getDocumentTop()-this.__kb;

if(B&this.RESIZE_TOP){D-=F;
}else{D+=F;
}
if(D<C.minHeight){D=C.minHeight;
}else if(D>C.maxHeight){D=C.maxHeight;
}
if(B&this.RESIZE_TOP){top+=E.height-D;
}}
if((B&this.RESIZE_LEFT)||(B&this.RESIZE_RIGHT)){F=e.getDocumentLeft()-this.__ka;

if(B&this.RESIZE_LEFT){A-=F;
}else{A+=F;
}
if(A<C.minWidth){A=C.minWidth;
}else if(A>C.maxWidth){A=C.maxWidth;
}
if(B&this.RESIZE_LEFT){G+=E.width-A;
}}return {viewportLeft:G,viewportTop:top,parentLeft:E.bounds.left+G-E.left,parentTop:E.bounds.top+top-E.top,width:A,height:D};
},__kg:{1:f,2:n,4:h,8:z,5:t,6:g,9:c,10:b},__kh:function(e){var J=this.getContentLocation();
var H=this.getResizeSensitivity();
var L=e.getDocumentLeft();
var K=e.getDocumentTop();
var I=0;

if(this.getResizableTop()&&Math.abs(J.top-K)<H){I+=this.RESIZE_TOP;
}else if(this.getResizableBottom()&&Math.abs(J.bottom-K)<H){I+=this.RESIZE_BOTTOM;
}
if(this.getResizableLeft()&&Math.abs(J.left-L)<H){I+=this.RESIZE_LEFT;
}else if(this.getResizableRight()&&Math.abs(J.right-L)<H){I+=this.RESIZE_RIGHT;
}this.__jY=I;
},__ki:function(e){if(!this.__jY){return;
}this.addState(j);
this.__ka=e.getDocumentLeft();
this.__kb=e.getDocumentTop();
var location=this.getContainerLocation();
var U=this.getBounds();
this.__kc={top:location.top,left:location.left,width:U.width,height:U.height,bounds:qx.lang.Object.clone(U)};
if(this.getUseResizeFrame()){this.__ke();
}this.capture();
e.stop();
},__kj:function(e){if(!this.hasState(j)){return;
}if(this.getUseResizeFrame()){this.__kd().exclude();
}var T=this.__kf(e);
this.setWidth(T.width);
this.setHeight(T.height);
if(this.getResizableLeft()||this.getResizableTop()){this.setLayoutProperties({left:T.parentLeft,top:T.parentTop});
}this.__jY=0;
this.removeState(j);
this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
this.releaseCapture();
e.stopPropagation();
},__kk:function(e){if(!this.__jY){return;
}this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
this.removeState(w);
if(this.getUseResizeFrame()){this.__kd().exclude();
}},__kl:function(e){if(this.hasState(j)){var P=this.__kf(e);
if(this.getUseResizeFrame()){var N=this.__kd();
N.setUserBounds(P.viewportLeft,P.viewportTop,P.width,P.height);
}else{this.setWidth(P.width);
this.setHeight(P.height);
if(this.getResizableLeft()||this.getResizableTop()){this.setLayoutProperties({left:P.parentLeft,top:P.parentTop});
}}e.stopPropagation();
}else if(!this.hasState(u)){this.__kh(e);
var Q=this.__jY;
var O=this.getApplicationRoot();

if(Q){var M=this.__kg[Q];
this.setCursor(M);
O.setGlobalCursor(M);
}else if(this.getCursor()){this.resetCursor();
O.resetGlobalCursor();
}}},__km:function(e){if(this.getCursor()&&!this.hasState(j)){this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
}}},destruct:function(){if(this.__jX!=null&&!qx.core.ObjectRegistry.inShutDown){this.__jX.destroy();
this.__jX=null;
}}});
})();
(function(){var q="move",p="Boolean",o="mouseup",n="mousedown",m="losecapture",l="__kn",k="qx.ui.core.MMovable",j="mousemove",i="maximized",h="__ko",g="move-frame";
qx.Mixin.define(k,{properties:{movable:{check:p,init:true},useMoveFrame:{check:p,init:false}},members:{__kn:null,__ko:null,__kp:null,__kq:null,__kr:null,__ks:null,__kt:null,__ku:false,__kv:null,__kw:0,_activateMoveHandle:function(w){if(this.__kn){throw new Error("The move handle could not be redefined!");
}this.__kn=w;
w.addListener(n,this._onMoveMouseDown,this);
w.addListener(o,this._onMoveMouseUp,this);
w.addListener(j,this._onMoveMouseMove,this);
w.addListener(m,this.__kA,this);
},__kx:function(){var x=this.__ko;

if(!x){x=this.__ko=new qx.ui.core.Widget();
x.setAppearance(g);
x.exclude();
qx.core.Init.getApplication().getRoot().add(x);
}return x;
},__ky:function(){var location=this.getContainerLocation();
var v=this.getBounds();
var u=this.__kx();
u.setUserBounds(location.left,location.top,v.width,v.height);
u.show();
u.setZIndex(this.getZIndex()+1);
},__kz:function(e){var b=this.__kp;
var f=Math.max(b.left,Math.min(b.right,e.getDocumentLeft()));
var d=Math.max(b.top,Math.min(b.bottom,e.getDocumentTop()));
var a=this.__kq+f;
var c=this.__kr+d;
return {viewportLeft:a,viewportTop:c,parentLeft:a-this.__ks,parentTop:c-this.__kt};
},_onMoveMouseDown:function(e){if(!this.getMovable()||this.hasState(i)){return;
}var parent=this.getLayoutParent();
var s=parent.getContentLocation();
var t=parent.getBounds();
if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(!parent.isContentBlocked()){this.__ku=true;
this.__kv=parent.getBlockerColor();
this.__kw=parent.getBlockerOpacity();
parent.setBlockerColor(null);
parent.setBlockerOpacity(1);
parent.blockContent(this.getZIndex()-1);
}}this.__kp={left:s.left,top:s.top,right:s.left+t.width,bottom:s.top+t.height};
var r=this.getContainerLocation();
this.__ks=s.left;
this.__kt=s.top;
this.__kq=r.left-e.getDocumentLeft();
this.__kr=r.top-e.getDocumentTop();
this.addState(q);
this.__kn.capture();
if(this.getUseMoveFrame()){this.__ky();
}e.stop();
},_onMoveMouseMove:function(e){if(!this.hasState(q)){return;
}var y=this.__kz(e);

if(this.getUseMoveFrame()){this.__kx().setDomPosition(y.viewportLeft,y.viewportTop);
}else{this.setDomPosition(y.parentLeft,y.parentTop);
}e.stopPropagation();
},_onMoveMouseUp:function(e){if(!this.hasState(q)){return;
}this.removeState(q);
var parent=this.getLayoutParent();

if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(this.__ku){parent.unblockContent();
parent.setBlockerColor(this.__kv);
parent.setBlockerOpacity(this.__kw);
this.__kv=null;
this.__kw=0;
}}this.__kn.releaseCapture();
var z=this.__kz(e);
this.setLayoutProperties({left:z.parentLeft,top:z.parentTop});
if(this.getUseMoveFrame()){this.__kx().exclude();
}e.stopPropagation();
},__kA:function(e){if(!this.hasState(q)){return;
}this.removeState(q);
if(this.getUseMoveFrame()){this.__kx().exclude();
}}},destruct:function(){this._disposeObjects(h,l);
this.__kp=null;
}});
})();
(function(){var p="Integer",o="_applyContentPadding",n="resetPaddingRight",m="setPaddingBottom",l="resetPaddingTop",k="qx.ui.core.MContentPadding",j="resetPaddingLeft",i="setPaddingTop",h="setPaddingRight",g="resetPaddingBottom",c="contentPaddingLeft",f="setPaddingLeft",e="contentPaddingTop",b="shorthand",a="contentPaddingRight",d="contentPaddingBottom";
qx.Mixin.define(k,{properties:{contentPaddingTop:{check:p,init:0,apply:o,themeable:true},contentPaddingRight:{check:p,init:0,apply:o,themeable:true},contentPaddingBottom:{check:p,init:0,apply:o,themeable:true},contentPaddingLeft:{check:p,init:0,apply:o,themeable:true},contentPadding:{group:[e,a,d,c],mode:b,themeable:true}},members:{__kB:{contentPaddingTop:i,contentPaddingRight:h,contentPaddingBottom:m,contentPaddingLeft:f},__kC:{contentPaddingTop:l,contentPaddingRight:n,contentPaddingBottom:g,contentPaddingLeft:j},_applyContentPadding:function(q,r,name){var s=this._getContentPaddingTarget();

if(q==null){var t=this.__kC[name];
s[t]();
}else{var u=this.__kB[name];
s[u](q);
}}}});
})();
(function(){var a="qx.ui.window.IWindowManager";
qx.Interface.define(a,{members:{setDesktop:function(f){this.assertInterface(f,qx.ui.window.IDesktop);
},changeActiveWindow:function(d,e){},updateStack:function(){},bringToFront:function(c){this.assertInstance(c,qx.ui.window.Window);
},sendToBack:function(b){this.assertInstance(b,qx.ui.window.Window);
}}});
})();
(function(){var b="qx.ui.window.Manager",a="__kD";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.ui.window.IWindowManager,members:{__kD:null,setDesktop:function(j){this.__kD=j;
this.updateStack();
},getDesktop:function(){return this.__kD;
},changeActiveWindow:function(q,r){if(q){this.bringToFront(q);
}},_minZIndex:1e5,updateStack:function(){qx.ui.core.queue.Widget.add(this);
},syncWidget:function(){this.__kD.forceUnblockContent();
var m=this.__kD.getWindows();
var p=this._minZIndex-1;
var o=false;
var n,k=null;

for(var i=0,l=m.length;i<l;i++){n=m[i];

if(!n.isVisible()){continue;
}p+=2;
n.setZIndex(p);
if(n.getModal()){this.__kD.blockContent(p-1);
}o=o||n.isActive();
k=n;
}
if(!o){this.__kD.setActiveWindow(k);
}},bringToFront:function(c){var d=this.__kD.getWindows();
var e=qx.lang.Array.remove(d,c);

if(e){d.push(c);
this.updateStack();
}},sendToBack:function(f){var g=this.__kD.getWindows();
var h=qx.lang.Array.remove(g,f);

if(h){g.unshift(f);
this.updateStack();
}}},destruct:function(){this._disposeObjects(a);
}});
})();
(function(){var m="Boolean",l="qx.event.type.Event",k="captionbar",j="maximize-button",i="_applyCaptionBarChange",h="restore-button",g="minimize-button",f="close-button",d="maximized",c="execute",T="pane",S="title",R="icon",Q="statusbar-text",P="statusbar",O="normal",N="String",M="active",L="beforeClose",K="beforeMinimize",t="mousedown",u="changeStatus",r="changeIcon",s="excluded",p="_applyCaption",q="_applyActive",n="beforeRestore",o="minimize",v="dblclick",w="changeModal",C="_applyShowStatusbar",B="_applyStatus",E="qx.ui.window.Window",D="changeCaption",G="_applyIcon",F="focusout",y="beforeMaximize",J="maximize",I="restore",H="window",x="close",z="changeActive",A="minimized";
qx.Class.define(E,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling,qx.ui.core.MResizable,qx.ui.core.MMovable,qx.ui.core.MContentPadding],construct:function(bc,bd){arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.VBox());
this._createChildControl(k);
this._createChildControl(T);
if(bd!=null){this.setIcon(bd);
}
if(bc!=null){this.setCaption(bc);
}this._updateCaptionBar();
this.addListener(t,this._onWindowMouseDown,this,true);
this.addListener(F,this._onWindowFocusOut,this);
qx.core.Init.getApplication().getRoot().add(this);
this.initVisibility();
qx.ui.core.FocusHandler.getInstance().addRoot(this);
},statics:{DEFAULT_MANAGER_CLASS:qx.ui.window.Manager},events:{"beforeClose":l,"close":l,"beforeMinimize":l,"minimize":l,"beforeMaximize":l,"maximize":l,"beforeRestore":l,"restore":l},properties:{appearance:{refine:true,init:H},visibility:{refine:true,init:s},focusable:{refine:true,init:true},active:{check:m,init:false,apply:q,event:z},modal:{check:m,init:false,event:w},caption:{apply:p,event:D,nullable:true},icon:{check:N,nullable:true,apply:G,event:r,themeable:true},status:{check:N,nullable:true,apply:B,event:u},showClose:{check:m,init:true,apply:i,themeable:true},showMaximize:{check:m,init:true,apply:i,themeable:true},showMinimize:{check:m,init:true,apply:i,themeable:true},allowClose:{check:m,init:true,apply:i},allowMaximize:{check:m,init:true,apply:i},allowMinimize:{check:m,init:true,apply:i},showStatusbar:{check:m,init:false,apply:C}},members:{__kE:null,__kF:null,getChildrenContainer:function(){return this.getChildControl(T);
},_forwardStates:{active:true,maximized:true},setLayoutParent:function(parent){{};
arguments.callee.base.call(this,parent);
},_createChildControlImpl:function(bp){var bq;

switch(bp){case P:bq=new qx.ui.container.Composite(new qx.ui.layout.HBox());
this._add(bq);
bq.add(this.getChildControl(Q));
break;
case Q:bq=new qx.ui.basic.Label();
bq.setValue(this.getStatus());
break;
case T:bq=new qx.ui.container.Composite();
this._add(bq,{flex:1});
break;
case k:var bs=new qx.ui.layout.Grid();
bs.setRowFlex(0,1);
bs.setColumnFlex(1,1);
bq=new qx.ui.container.Composite(bs);
this._add(bq);
bq.addListener(v,this._onCaptionMouseDblClick,this);
this._activateMoveHandle(bq);
break;
case R:bq=new qx.ui.basic.Image(this.getIcon());
this.getChildControl(k).add(bq,{row:0,column:0});
break;
case S:bq=new qx.ui.basic.Label(this.getCaption());
bq.setWidth(0);
bq.setAllowGrowX(true);
var br=this.getChildControl(k);
br.add(bq,{row:0,column:1});
break;
case g:bq=new qx.ui.form.Button();
bq.setFocusable(false);
bq.addListener(c,this._onMinimizeButtonClick,this);
this.getChildControl(k).add(bq,{row:0,column:2});
break;
case h:bq=new qx.ui.form.Button();
bq.setFocusable(false);
bq.addListener(c,this._onRestoreButtonClick,this);
this.getChildControl(k).add(bq,{row:0,column:3});
break;
case j:bq=new qx.ui.form.Button();
bq.setFocusable(false);
bq.addListener(c,this._onMaximizeButtonClick,this);
this.getChildControl(k).add(bq,{row:0,column:4});
break;
case f:bq=new qx.ui.form.Button();
bq.setFocusable(false);
bq.addListener(c,this._onCloseButtonClick,this);
this.getChildControl(k).add(bq,{row:0,column:6});
break;
}return bq||arguments.callee.base.call(this,bp);
},_updateCaptionBar:function(){var bf;

if(this.getIcon()){this._showChildControl(R);
}else{this._excludeChildControl(R);
}
if(this.getCaption()){this._showChildControl(S);
}else{this._excludeChildControl(S);
}
if(this.getShowMinimize()){this._showChildControl(g);
bf=this.getChildControl(g);
this.getAllowMinimize()?bf.resetEnabled():bf.setEnabled(false);
}else{this._excludeChildControl(g);
}
if(this.getShowMaximize()){if(this.isMaximized()){this._showChildControl(h);
this._excludeChildControl(j);
}else{this._showChildControl(j);
this._excludeChildControl(h);
}bf=this.getChildControl(j);
this.getAllowMaximize()?bf.resetEnabled():bf.setEnabled(false);
}else{this._excludeChildControl(j);
this._excludeChildControl(h);
}
if(this.getShowClose()){this._showChildControl(f);
bf=this.getChildControl(f);
this.getAllowClose()?bf.resetEnabled():bf.setEnabled(false);
}else{this._excludeChildControl(f);
}},close:function(){if(!this.isVisible()){return;
}
if(this.fireNonBubblingEvent(L,qx.event.type.Event,[false,true])){this.hide();
this.fireEvent(x);
}},open:function(){this.show();
this.setActive(true);
this.focus();
},center:function(){var parent=this.getLayoutParent();

if(parent){var bi=parent.getBounds();

if(bi){var bj=this.getSizeHint();
var bh=Math.round((bi.width-bj.width)/2);
var top=Math.round((bi.height-bj.height)/2);

if(top<0){top=0;
}this.moveTo(bh,top);
return;
}}{};
},maximize:function(){if(this.isMaximized()){return;
}var parent=this.getLayoutParent();

if(parent!=null&&parent.supportsMaximize()){if(this.fireNonBubblingEvent(y,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();
}var bl=this.getLayoutProperties();
this.__kF=bl.left===undefined?0:bl.left;
this.__kE=bl.top===undefined?0:bl.top;
this.setLayoutProperties({left:null,top:null,edge:0});
this.addState(d);
this._updateCaptionBar();
this.fireEvent(J);
}}},minimize:function(){if(!this.isVisible()){return;
}
if(this.fireNonBubblingEvent(K,qx.event.type.Event,[false,true])){var W=this.getLayoutProperties();
this.__kF=W.left===undefined?0:W.left;
this.__kE=W.top===undefined?0:W.top;
this.removeState(d);
this.hide();
this.fireEvent(o);
}},restore:function(){if(this.getMode()===O){return;
}
if(this.fireNonBubblingEvent(n,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();
}var bg=this.__kF;
var top=this.__kE;
this.setLayoutProperties({edge:null,left:bg,top:top});
this.removeState(d);
this._updateCaptionBar();
this.fireEvent(I);
}},moveTo:function(be,top){if(this.isMaximized()){return;
}this.setLayoutProperties({left:be,top:top});
},isMaximized:function(){return this.hasState(d);
},getMode:function(){if(!this.isVisible()){return A;
}else{if(this.isMaximized()){return d;
}else{return O;
}}},_applyActive:function(X,Y){if(Y){this.removeState(M);
}else{this.addState(M);
}},_getContentPaddingTarget:function(){return this.getChildControl(T);
},_applyShowStatusbar:function(ba,bb){if(ba){this._showChildControl(P);
}else{this._excludeChildControl(P);
}},_applyCaptionBarChange:function(U,V){this._updateCaptionBar();
},_applyStatus:function(bm,bn){var bo=this.getChildControl(Q,true);

if(bo){bo.setValue(bm);
}},_applyCaption:function(bt,bu){this.getChildControl(S).setValue(bt);
},_applyIcon:function(a,b){this.getChildControl(R).setSource(a);
},_onWindowEventStop:function(e){e.stopPropagation();
},_onWindowMouseDown:function(e){this.setActive(true);
},_onWindowFocusOut:function(e){if(this.getModal()){return;
}var bk=e.getRelatedTarget();

if(bk!=null&&!qx.ui.core.Widget.contains(this,bk)){this.setActive(false);
}},_onCaptionMouseDblClick:function(e){if(this.getAllowMaximize()){this.isMaximized()?this.restore():this.maximize();
}},_onMinimizeButtonClick:function(e){this.minimize();
this.getChildControl(g).reset();
},_onRestoreButtonClick:function(e){this.restore();
this.getChildControl(h).reset();
},_onMaximizeButtonClick:function(e){this.maximize();
this.getChildControl(j).reset();
},_onCloseButtonClick:function(e){this.close();
this.getChildControl(f).reset();
}}});
})();
(function(){var a="qx.ui.window.IDesktop";
qx.Interface.define(a,{members:{setWindowManager:function(b){this.assertInterface(b,qx.ui.window.IWindowManager);
},getWindows:function(){},supportsMaximize:function(){},blockContent:function(c){this.assertInteger(c);
},unblockContent:function(){},isContentBlocked:function(){}}});
})();
(function(){var C="_applyLayoutChange",B="left",A="center",z="top",y="Decorator",x="middle",w="_applyReversed",v="bottom",u="Boolean",t="right",r="Integer",s="qx.ui.layout.HBox";
qx.Class.define(s,{extend:qx.ui.layout.Abstract,construct:function(bi,bj,bk){arguments.callee.base.call(this);

if(bi){this.setSpacing(bi);
}
if(bj){this.setAlignX(bj);
}
if(bk){this.setSeparator(bk);
}},properties:{alignX:{check:[B,A,t],init:B,apply:C},alignY:{check:[z,x,v],init:z,apply:C},spacing:{check:r,init:0,apply:C},separator:{check:y,nullable:true,apply:C},reversed:{check:u,init:false,apply:w}},members:{__kG:null,__kH:null,__kI:null,__kJ:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__kK:function(){var bh=this._getLayoutChildren();
var length=bh.length;
var be=false;
var bc=this.__kG&&this.__kG.length!=length&&this.__kH&&this.__kG;
var bf;
var bd=bc?this.__kG:new Array(length);
var bg=bc?this.__kH:new Array(length);
if(this.getReversed()){bh=bh.concat().reverse();
}for(var i=0;i<length;i++){bf=bh[i].getLayoutProperties();

if(bf.width!=null){bd[i]=parseFloat(bf.width)/100;
}
if(bf.flex!=null){bg[i]=bf.flex;
be=true;
}else{bg[i]=0;
}}if(!bc){this.__kG=bd;
this.__kH=bg;
}this.__kI=be;
this.__kJ=bh;
delete this._invalidChildrenCache;
},verifyLayoutProperty:null,renderLayout:function(D,E){if(this._invalidChildrenCache){this.__kK();
}var K=this.__kJ;
var length=K.length;
var T=qx.ui.layout.Util;
var S=this.getSpacing();
var W=this.getSeparator();

if(W){var H=T.computeHorizontalSeparatorGaps(K,S,W);
}else{var H=T.computeHorizontalGaps(K,S,true);
}var i,F,Q,P;
var V=[];
var L=H;

for(i=0;i<length;i+=1){P=this.__kG[i];
Q=P!=null?Math.floor((D-H)*P):K[i].getSizeHint().width;
V.push(Q);
L+=Q;
}if(this.__kI&&L!=D){var N={};
var R,U;

for(i=0;i<length;i+=1){R=this.__kH[i];

if(R>0){M=K[i].getSizeHint();
N[i]={min:M.minWidth,value:V[i],max:M.maxWidth,flex:R};
}}var I=T.computeFlexOffsets(N,D,L);

for(i in I){U=I[i].offset;
V[i]+=U;
L+=U;
}}var bb=K[0].getMarginLeft();
if(L<D&&this.getAlignX()!=B){bb=D-L;

if(this.getAlignX()===A){bb=Math.round(bb/2);
}}var M,top,G,Q,J,Y,O;
var S=this.getSpacing();
this._clearSeparators();
if(W){var X=qx.theme.manager.Decoration.getInstance().resolve(W).getInsets();
var ba=X.left+X.right;
}for(i=0;i<length;i+=1){F=K[i];
Q=V[i];
M=F.getSizeHint();
Y=F.getMarginTop();
O=F.getMarginBottom();
G=Math.max(M.minHeight,Math.min(E-Y-O,M.maxHeight));
top=T.computeVerticalAlignOffset(F.getAlignY()||this.getAlignY(),G,E,Y,O);
if(i>0){if(W){bb+=J+S;
this._renderSeparator(W,{left:bb,top:0,width:ba,height:E});
bb+=ba+S+F.getMarginLeft();
}else{bb+=T.collapseMargins(S,J,F.getMarginLeft());
}}F.renderLayout(bb,top,Q,G);
bb+=Q;
J=F.getMarginRight();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__kK();
}var g=qx.ui.layout.Util;
var q=this.__kJ;
var a=0,h=0,e=0;
var d=0,f=0;
var n,b,p;
for(var i=0,l=q.length;i<l;i+=1){n=q[i];
b=n.getSizeHint();
h+=b.width;
var m=this.__kH[i];
var c=this.__kG[i];

if(m){a+=b.minWidth;
}else if(c){e=Math.max(e,Math.round(b.minWidth/c));
}else{a+=b.width;
}p=n.getMarginTop()+n.getMarginBottom();
if((b.height+p)>f){f=b.height+p;
}if((b.minHeight+p)>d){d=b.minHeight+p;
}}a+=e;
var k=this.getSpacing();
var o=this.getSeparator();

if(o){var j=g.computeHorizontalSeparatorGaps(q,k,o);
}else{var j=g.computeHorizontalGaps(q,k,true);
}return {minWidth:a+j,width:h+j,minHeight:d,height:f};
}},destruct:function(){this.__kG=this.__kH=this.__kJ=null;
}});
})();
(function(){var cf="left",ce="top",cd="_applyLayoutChange",cc="hAlign",cb="flex",ca="vAlign",bY="Integer",bX="minWidth",bW="width",bV="minHeight",bS="qx.ui.layout.Grid",bU="height",bT="maxHeight",bR="maxWidth";
qx.Class.define(bS,{extend:qx.ui.layout.Abstract,construct:function(dk,dl){arguments.callee.base.call(this);
this.__kL=[];
this.__kM=[];

if(dk){this.setSpacingX(dk);
}
if(dl){this.setSpacingY(dl);
}},properties:{spacingX:{check:bY,init:0,apply:cd},spacingY:{check:bY,init:0,apply:cd}},members:{__kN:null,__kL:null,__kM:null,__kO:null,__kP:null,__kQ:null,__kR:null,__kS:null,__kT:null,verifyLayoutProperty:null,__kU:function(){var u=[];
var t=[];
var v=[];
var r=-1;
var q=-1;
var z=this._getLayoutChildren();

for(var i=0,l=z.length;i<l;i++){var s=z[i];
var w=s.getLayoutProperties();
var A=w.row;
var p=w.column;
w.colSpan=w.colSpan||1;
w.rowSpan=w.rowSpan||1;
if(A==null||p==null){throw new Error("The layout properties 'row' and 'column' of the child widget '"+s+"' must be defined!");
}
if(u[A]&&u[A][p]){throw new Error("Cannot add widget '"+s+"'!. "+"There is already a widget '"+u[A][p]+"' in this cell ("+A+", "+p+")");
}
for(var x=p;x<p+w.colSpan;x++){for(var y=A;y<A+w.rowSpan;y++){if(u[y]==undefined){u[y]=[];
}u[y][x]=s;
q=Math.max(q,x);
r=Math.max(r,y);
}}
if(w.rowSpan>1){v.push(s);
}
if(w.colSpan>1){t.push(s);
}}for(var y=0;y<=r;y++){if(u[y]==undefined){u[y]=[];
}}this.__kN=u;
this.__kO=t;
this.__kP=v;
this.__kQ=r;
this.__kR=q;
this.__kS=null;
this.__kT=null;
delete this._invalidChildrenCache;
},_setRowData:function(dm,dn,dp){var dq=this.__kL[dm];

if(!dq){this.__kL[dm]={};
this.__kL[dm][dn]=dp;
}else{dq[dn]=dp;
}},_setColumnData:function(c,d,e){var f=this.__kM[c];

if(!f){this.__kM[c]={};
this.__kM[c][d]=e;
}else{f[d]=e;
}},setSpacing:function(dE){this.setSpacingY(dE);
this.setSpacingX(dE);
return this;
},setColumnAlign:function(dB,dC,dD){{};
this._setColumnData(dB,cc,dC);
this._setColumnData(dB,ca,dD);
this._applyLayoutChange();
return this;
},getColumnAlign:function(di){var dj=this.__kM[di]||{};
return {vAlign:dj.vAlign||ce,hAlign:dj.hAlign||cf};
},setRowAlign:function(bJ,bK,bL){{};
this._setRowData(bJ,cc,bK);
this._setRowData(bJ,ca,bL);
this._applyLayoutChange();
return this;
},getRowAlign:function(dF){var dG=this.__kL[dF]||{};
return {vAlign:dG.vAlign||ce,hAlign:dG.hAlign||cf};
},getCellWidget:function(a,b){if(this._invalidChildrenCache){this.__kU();
}var a=this.__kN[a]||{};
return a[b]||null;
},getRowCount:function(){if(this._invalidChildrenCache){this.__kU();
}return this.__kQ+1;
},getColumnCount:function(){if(this._invalidChildrenCache){this.__kU();
}return this.__kR+1;
},getCellAlign:function(dr,ds){var dy=ce;
var dw=cf;
var dx=this.__kL[dr];
var du=this.__kM[ds];
var dt=this.__kN[dr][ds];

if(dt){var dv={vAlign:dt.getAlignY(),hAlign:dt.getAlignX()};
}else{dv={};
}if(dv.vAlign){dy=dv.vAlign;
}else if(dx&&dx.vAlign){dy=dx.vAlign;
}else if(du&&du.vAlign){dy=du.vAlign;
}if(dv.hAlign){dw=dv.hAlign;
}else if(du&&du.hAlign){dw=du.hAlign;
}else if(dx&&dx.hAlign){dw=dx.hAlign;
}return {vAlign:dy,hAlign:dw};
},setColumnFlex:function(bk,bl){this._setColumnData(bk,cb,bl);
this._applyLayoutChange();
return this;
},getColumnFlex:function(k){var m=this.__kM[k]||{};
return m.flex!==undefined?m.flex:0;
},setRowFlex:function(dW,dX){this._setRowData(dW,cb,dX);
this._applyLayoutChange();
return this;
},getRowFlex:function(bh){var bi=this.__kL[bh]||{};
var bj=bi.flex!==undefined?bi.flex:0;
return bj;
},setColumnMaxWidth:function(F,G){this._setColumnData(F,bR,G);
this._applyLayoutChange();
return this;
},getColumnMaxWidth:function(B){var C=this.__kM[B]||{};
return C.maxWidth!==undefined?C.maxWidth:Infinity;
},setColumnWidth:function(dH,dI){this._setColumnData(dH,bW,dI);
this._applyLayoutChange();
return this;
},getColumnWidth:function(bf){var bg=this.__kM[bf]||{};
return bg.width!==undefined?bg.width:null;
},setColumnMinWidth:function(n,o){this._setColumnData(n,bX,o);
this._applyLayoutChange();
return this;
},getColumnMinWidth:function(bH){var bI=this.__kM[bH]||{};
return bI.minWidth||0;
},setRowMaxHeight:function(dU,dV){this._setRowData(dU,bT,dV);
this._applyLayoutChange();
return this;
},getRowMaxHeight:function(D){var E=this.__kL[D]||{};
return E.maxHeight||Infinity;
},setRowHeight:function(g,h){this._setRowData(g,bU,h);
this._applyLayoutChange();
return this;
},getRowHeight:function(dz){var dA=this.__kL[dz]||{};
return dA.height!==undefined?dA.height:null;
},setRowMinHeight:function(bd,be){this._setRowData(bd,bV,be);
this._applyLayoutChange();
return this;
},getRowMinHeight:function(dY){var ea=this.__kL[dY]||{};
return ea.minHeight||0;
},__kV:function(bM){var bQ=bM.getSizeHint();
var bP=bM.getMarginLeft()+bM.getMarginRight();
var bO=bM.getMarginTop()+bM.getMarginBottom();
var bN={height:bQ.height+bO,width:bQ.width+bP,minHeight:bQ.minHeight+bO,minWidth:bQ.minWidth+bP,maxHeight:bQ.maxHeight+bO,maxWidth:bQ.maxWidth+bP};
return bN;
},_fixHeightsRowSpan:function(bm){var bx=this.getSpacingY();

for(var i=0,l=this.__kP.length;i<l;i++){var bp=this.__kP[i];
var br=this.__kV(bp);
var bs=bp.getLayoutProperties();
var bo=bs.row;
var bv=bx*(bs.rowSpan-1);
var bn=bv;
var bu={};

for(var j=0;j<bs.rowSpan;j++){var bz=bs.row+j;
var bq=bm[bz];
var by=this.getRowFlex(bz);

if(by>0){bu[bz]={min:bq.minHeight,value:bq.height,max:bq.maxHeight,flex:by};
}bv+=bq.height;
bn+=bq.minHeight;
}if(bv<br.height){var bw=qx.ui.layout.Util.computeFlexOffsets(bu,br.height,bv);

for(var j=0;j<bs.rowSpan;j++){var bt=bw[bo+j]?bw[bo+j].offset:0;
bm[bo+j].height+=bt;
}}if(bn<br.minHeight){var bw=qx.ui.layout.Util.computeFlexOffsets(bu,br.minHeight,bn);

for(var j=0;j<bs.rowSpan;j++){var bt=bw[bo+j]?bw[bo+j].offset:0;
bm[bo+j].minHeight+=bt;
}}}},_fixWidthsColSpan:function(O){var S=this.getSpacingX();

for(var i=0,l=this.__kO.length;i<l;i++){var P=this.__kO[i];
var R=this.__kV(P);
var U=P.getLayoutProperties();
var Q=U.column;
var bb=S*(U.colSpan-1);
var T=bb;
var V={};
var X;

for(var j=0;j<U.colSpan;j++){var bc=U.column+j;
var ba=O[bc];
var Y=this.getColumnFlex(bc);
if(Y>0){V[bc]={min:ba.minWidth,value:ba.width,max:ba.maxWidth,flex:Y};
}bb+=ba.width;
T+=ba.minWidth;
}if(bb<R.width){var W=qx.ui.layout.Util.computeFlexOffsets(V,R.width,bb);

for(var j=0;j<U.colSpan;j++){X=W[Q+j]?W[Q+j].offset:0;
O[Q+j].width+=X;
}}if(T<R.minWidth){var W=qx.ui.layout.Util.computeFlexOffsets(V,R.minWidth,T);

for(var j=0;j<U.colSpan;j++){X=W[Q+j]?W[Q+j].offset:0;
O[Q+j].minWidth+=X;
}}}},_getRowHeights:function(){if(this.__kS!=null){return this.__kS;
}var dS=[];
var dL=this.__kQ;
var dK=this.__kR;

for(var dT=0;dT<=dL;dT++){var dM=0;
var dO=0;
var dN=0;

for(var dR=0;dR<=dK;dR++){var dJ=this.__kN[dT][dR];

if(!dJ){continue;
}var dP=dJ.getLayoutProperties().rowSpan||0;

if(dP>1){continue;
}var dQ=this.__kV(dJ);

if(this.getRowFlex(dT)>0){dM=Math.max(dM,dQ.minHeight);
}else{dM=Math.max(dM,dQ.height);
}dO=Math.max(dO,dQ.height);
}var dM=Math.max(dM,this.getRowMinHeight(dT));
var dN=this.getRowMaxHeight(dT);

if(this.getRowHeight(dT)!==null){var dO=this.getRowHeight(dT);
}else{var dO=Math.max(dM,Math.min(dO,dN));
}dS[dT]={minHeight:dM,height:dO,maxHeight:dN};
}
if(this.__kP.length>0){this._fixHeightsRowSpan(dS);
}this.__kS=dS;
return dS;
},_getColWidths:function(){if(this.__kT!=null){return this.__kT;
}var ck=[];
var ch=this.__kR;
var cj=this.__kQ;

for(var cp=0;cp<=ch;cp++){var cn=0;
var cm=0;
var ci=Infinity;

for(var cq=0;cq<=cj;cq++){var cg=this.__kN[cq][cp];

if(!cg){continue;
}var cl=cg.getLayoutProperties().colSpan||0;

if(cl>1){continue;
}var co=this.__kV(cg);

if(this.getColumnFlex(cp)>0){cm=Math.max(cm,co.minWidth);
}else{cm=Math.max(cm,co.width);
}cn=Math.max(cn,co.width);
}var cm=Math.max(cm,this.getColumnMinWidth(cp));
var ci=this.getColumnMaxWidth(cp);

if(this.getColumnWidth(cp)!==null){var cn=this.getColumnWidth(cp);
}else{var cn=Math.max(cm,Math.min(cn,ci));
}ck[cp]={minWidth:cm,width:cn,maxWidth:ci};
}
if(this.__kO.length>0){this._fixWidthsColSpan(ck);
}this.__kT=ck;
return ck;
},_getColumnFlexOffsets:function(H){var I=this.getSizeHint();
var M=H-I.width;

if(M==0){return {};
}var K=this._getColWidths();
var J={};

for(var i=0,l=K.length;i<l;i++){var N=K[i];
var L=this.getColumnFlex(i);

if((L<=0)||(N.width==N.maxWidth&&M>0)||(N.width==N.minWidth&&M<0)){continue;
}J[i]={min:N.minWidth,value:N.width,max:N.maxWidth,flex:L};
}return qx.ui.layout.Util.computeFlexOffsets(J,H,I.width);
},_getRowFlexOffsets:function(bA){var bB=this.getSizeHint();
var bE=bA-bB.height;

if(bE==0){return {};
}var bF=this._getRowHeights();
var bC={};

for(var i=0,l=bF.length;i<l;i++){var bG=bF[i];
var bD=this.getRowFlex(i);

if((bD<=0)||(bG.height==bG.maxHeight&&bE>0)||(bG.height==bG.minHeight&&bE<0)){continue;
}bC[i]={min:bG.minHeight,value:bG.height,max:bG.maxHeight,flex:bD};
}return qx.ui.layout.Util.computeFlexOffsets(bC,bA,bB.height);
},renderLayout:function(cr,cs){if(this._invalidChildrenCache){this.__kU();
}var cG=qx.ui.layout.Util;
var cu=this.getSpacingX();
var cA=this.getSpacingY();
var cL=this._getColWidths();
var cK=this._getColumnFlexOffsets(cr);
var cv=[];
var cN=this.__kR;
var ct=this.__kQ;
var cM;

for(var cO=0;cO<=cN;cO++){cM=cK[cO]?cK[cO].offset:0;
cv[cO]=cL[cO].width+cM;
}var cD=this._getRowHeights();
var cF=this._getRowFlexOffsets(cs);
var cU=[];

for(var cB=0;cB<=ct;cB++){cM=cF[cB]?cF[cB].offset:0;
cU[cB]=cD[cB].height+cM;
}var cV=0;

for(var cO=0;cO<=cN;cO++){var top=0;

for(var cB=0;cB<=ct;cB++){var cI=this.__kN[cB][cO];
if(!cI){top+=cU[cB]+cA;
continue;
}var cw=cI.getLayoutProperties();
if(cw.row!==cB||cw.column!==cO){top+=cU[cB]+cA;
continue;
}var cT=cu*(cw.colSpan-1);

for(var i=0;i<cw.colSpan;i++){cT+=cv[cO+i];
}var cJ=cA*(cw.rowSpan-1);

for(var i=0;i<cw.rowSpan;i++){cJ+=cU[cB+i];
}var cx=cI.getSizeHint();
var cR=cI.getMarginTop();
var cH=cI.getMarginLeft();
var cE=cI.getMarginBottom();
var cz=cI.getMarginRight();
var cC=Math.max(cx.minWidth,Math.min(cT-cH-cz,cx.maxWidth));
var cS=Math.max(cx.minHeight,Math.min(cJ-cR-cE,cx.maxHeight));
var cP=this.getCellAlign(cB,cO);
var cQ=cV+cG.computeHorizontalAlignOffset(cP.hAlign,cC,cT,cH,cz);
var cy=top+cG.computeVerticalAlignOffset(cP.vAlign,cS,cJ,cR,cE);
cI.renderLayout(cQ,cy,cC,cS);
top+=cU[cB]+cA;
}cV+=cv[cO]+cu;
}},invalidateLayoutCache:function(){arguments.callee.base.call(this);
this.__kT=null;
this.__kS=null;
},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__kU();
}var db=this._getColWidths();
var dd=0,de=0;

for(var i=0,l=db.length;i<l;i++){var df=db[i];

if(this.getColumnFlex(i)>0){dd+=df.minWidth;
}else{dd+=df.width;
}de+=df.width;
}var dg=this._getRowHeights();
var cY=0,dc=0;

for(var i=0,l=dg.length;i<l;i++){var dh=dg[i];

if(this.getRowFlex(i)>0){cY+=dh.minHeight;
}else{cY+=dh.height;
}dc+=dh.height;
}var cX=this.getSpacingX()*(db.length-1);
var cW=this.getSpacingY()*(dg.length-1);
var da={minWidth:dd+cX,width:de+cX,minHeight:cY+cW,height:dc+cW};
return da;
}},destruct:function(){this.__kN=this.__kL=this.__kM=this.__kO=this.__kP=this.__kT=this.__kS=null;
}});
})();
(function(){var n="execute",m="toolTipText",l="icon",k="label",j="qx.ui.core.MExecutable",h="value",g="qx.event.type.Event",f="_applyCommand",d="enabled",c="menu",a="changeCommand",b="qx.ui.core.Command";
qx.Mixin.define(j,{events:{"execute":g},properties:{command:{check:b,apply:f,event:a,nullable:true}},members:{__kW:null,__kX:false,__kY:null,_bindableProperties:[d,k,l,m,h,c],execute:function(){var o=this.getCommand();

if(o){if(this.__kX){this.__kX=false;
}else{this.__kX=true;
o.execute(this);
}}this.fireEvent(n);
},__la:function(e){if(this.__kX){this.__kX=false;
return;
}this.__kX=true;
this.execute();
},_applyCommand:function(p,q){if(q!=null){q.removeListenerById(this.__kY);
}
if(p!=null){this.__kY=p.addListener(n,this.__la,this);
}var t=this.__kW;

if(t==null){this.__kW=t={};
}
for(var i=0;i<this._bindableProperties.length;i++){var s=this._bindableProperties[i];
if(q!=null&&t[s]!=null){q.removeBinding(t[s]);
t[s]=null;
}if(p!=null&&qx.Class.hasProperty(this.constructor,s)){var r=p.get(s);

if(r==null){var u=this.get(s);
}t[s]=p.bind(s,this,s);
if(u){this.set(s,u);
}}}}},destruct:function(){this.__kW=null;
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
(function(){var T="splitter",S="slider",R="mousedown",Q="mouseout",P="mousemove",O="mouseup",N="losecapture",M="active",L="horizontal",K="vertical",bk="knob",bj="Integer",bi="height",bh="row-resize",bg="move",bf="maxHeight",be="width",bd="_applyOrientation",bc="mouseover",bb="splitpane",Y="qx.ui.splitpane.Pane",ba="_applyOffset",W="minHeight",X="minWidth",U="col-resize",V="maxWidth";
qx.Class.define(Y,{extend:qx.ui.core.Widget,construct:function(i){arguments.callee.base.call(this);
this.__lb=[];
if(i){this.setOrientation(i);
}else{this.initOrientation();
}this.addListener(R,this._onMouseDown);
this.addListener(O,this._onMouseUp);
this.addListener(P,this._onMouseMove);
this.addListener(Q,this._onMouseOut);
this.addListener(N,this._onMouseUp);
},properties:{appearance:{refine:true,init:bb},offset:{check:bj,init:6,apply:ba},orientation:{init:L,check:[L,K],apply:bd}},members:{__lc:null,__ld:false,__le:null,__lf:null,__lg:null,__lh:null,__li:null,__lb:null,_createChildControlImpl:function(g){var h;

switch(g){case S:h=new qx.ui.splitpane.Slider(this);
h.exclude();
this._add(h,{type:g});
break;
case T:h=new qx.ui.splitpane.Splitter(this);
this._add(h,{type:g});
h.addListener(bg,this._onSplitterMove,this);
if(qx.bom.client.Engine.OPERA){h.addListener(bc,this._onSplitterMouseOver,h);
}break;
}return h||arguments.callee.base.call(this,g);
},_applyOrientation:function(bw,bx){var by=this.getChildControl(S);
var bB=this.getChildControl(T);
this.__lg=bw===L;
var bA=this._getLayout();

if(bA){bA.dispose();
}var bz=bw===K?new qx.ui.splitpane.VLayout:new qx.ui.splitpane.HLayout;
this._setLayout(bz);
bB.removeState(bx);
bB.addState(bw);
bB.getChildControl(bk).removeState(bx);
bB.getChildControl(bk).addState(bw);
by.removeState(bx);
by.addState(bw);
},_applyOffset:function(bt,bu){var bv=this.getChildControl(T);

if(bu===0){bv.removeListener(R,this._onMouseDown,this);
bv.removeListener(P,this._onMouseMove,this);
bv.removeListener(Q,this._onMouseOut,this);
bv.removeListener(O,this._onMouseUp,this);
bv.removeListener(N,this._onMouseUp,this);
this.addListener(R,this._onMouseDown);
this.addListener(O,this._onMouseUp);
this.addListener(P,this._onMouseMove);
this.addListener(Q,this._onMouseOut);
this.addListener(N,this._onMouseUp);
}
if(bt===0){this.removeListener(R,this._onMouseDown);
this.removeListener(O,this._onMouseUp);
this.removeListener(P,this._onMouseMove);
this.removeListener(Q,this._onMouseOut);
this.removeListener(N,this._onMouseUp);
bv.addListener(R,this._onMouseDown,this);
bv.addListener(P,this._onMouseMove,this);
bv.addListener(Q,this._onMouseOut,this);
bv.addListener(O,this._onMouseUp,this);
bv.addListener(N,this._onMouseUp,this);
}},add:function(a,b){if(b==null){this._add(a);
}else{this._add(a,{flex:b});
}this.__lb.push(a);
},remove:function(J){this._remove(J);
qx.lang.Array.remove(this.__lb,J);
},getChildren:function(){return this.__lb;
},_onMouseDown:function(e){if(!e.isLeftPressed()||!this._isNear()){return;
}var C=this.getChildControl(T);
var E=C.getContainerLocation();
var D=this.getContentLocation();
this.__lc=this.__lg?e.getDocumentLeft()-E.left+D.left:e.getDocumentTop()-E.top+D.top;
var G=this.getChildControl(S);
var F=C.getBounds();
G.setUserBounds(F.left,F.top,F.width,F.height);
G.setZIndex(C.getZIndex()+1);
G.show();
this.__ld=true;
e.getCurrentTarget().capture();
e.stop();
},_onMouseMove:function(e){this._setLastMousePosition(e.getDocumentLeft(),e.getDocumentTop());
if(this.__ld){this.__lk();
var H=this.getChildControl(S);
var I=this.__lh;

if(this.__lg){H.setDomLeft(I);
}else{H.setDomTop(I);
}e.stop();
}else{this.__lj();
}},_onMouseOut:function(e){this._setLastMousePosition(-1,-1);
this.__lj();
},_onMouseUp:function(e){if(!this.__ld){return;
}this._finalizeSizes();
var bl=this.getChildControl(S);
bl.exclude();
this.__ld=false;
this.releaseCapture();
this.__lj();
e.stop();
},_onSplitterMove:function(){this.__lj();
},_onSplitterMouseOver:function(){this.addState(M);
},_finalizeSizes:function(){var bp=this.__lh;
var bm=this.__li;

if(bp==null){return;
}var br=this._getChildren();
var bq=br[2];
var bn=br[3];
var bo=bq.getLayoutProperties().flex;
var bs=bn.getLayoutProperties().flex;
if((bo!=0)&&(bs!=0)){bq.setLayoutProperties({flex:bp});
bn.setLayoutProperties({flex:bm});
}else{if(this.__lg){bq.setWidth(bp);
bn.setWidth(bm);
}else{bq.setHeight(bp);
bn.setHeight(bm);
}}},_isNear:function(){var j=this.getChildControl(T);
var l=j.getBounds();
var n=j.getContainerLocation();
var k=this.getOffset();
if(!n){return;
}var o=this.__le;
var p=l.width;
var m=n.left;

if(p<k){m-=Math.floor((k-p)/2);
p=k;
}
if(o<m||o>(m+p)){return false;
}var o=this.__lf;
var p=l.height;
var m=n.top;

if(p<k){m-=Math.floor((k-p)/2);
p=k;
}
if(o<m||o>(m+p)){return false;
}return true;
},__lj:function(){var d=this.getChildControl(T);
var f=this.getApplicationRoot();
if(this.__ld||this._isNear()){var c=this.__lg?U:bh;
this.setCursor(c);
f.setGlobalCursor(c);
d.addState(M);
}else if(d.hasState(M)){this.resetCursor();
f.resetGlobalCursor();
d.removeState(M);
}},__lk:function(){if(this.__lg){var s=X,B=be,t=V,z=this.__le;
}else{var s=W,B=bi,t=bf,z=this.__lf;
}var A=this._getChildren();
var q=A[2].getSizeHint();
var v=A[3].getSizeHint();
var w=A[2].getBounds()[B]+A[3].getBounds()[B];
var u=z-this.__lc;
var r=w-u;
if(u<q[s]){r-=q[s]-u;
u=q[s];
}else if(r<v[s]){u-=v[s]-r;
r=v[s];
}if(u>q[t]){r+=u-q[t];
u=q[t];
}else if(r>v[t]){u+=r-v[t];
r=v[t];
}this.__lh=u;
this.__li=r;
},_isActiveDragSession:function(){return this.__ld;
},_setLastMousePosition:function(x,y){this.__le=x;
this.__lf=y;
}},destruct:function(){this.__lb=null;
}});
})();
(function(){var a="qx.ui.splitpane.Slider";
qx.Class.define(a,{extend:qx.ui.core.Widget,properties:{allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false}}});
})();
(function(){var e="center",d="knob",c="middle",b="qx.ui.splitpane.Splitter",a="vertical";
qx.Class.define(b,{extend:qx.ui.core.Widget,construct:function(f){arguments.callee.base.call(this);
if(f.getOrientation()==a){this._setLayout(new qx.ui.layout.HBox(0,e));
this._getLayout().setAlignY(c);
}else{this._setLayout(new qx.ui.layout.VBox(0,c));
this._getLayout().setAlignX(e);
}this._createChildControl(d);
},properties:{allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{_createChildControlImpl:function(g){var h;

switch(g){case d:h=new qx.ui.basic.Image;
this._add(h);
break;
}return h||arguments.callee.base.call(this,g);
}}});
})();
(function(){var c="slider",b="splitter",a="qx.ui.splitpane.VLayout";
qx.Class.define(a,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(d,e){var v=this._getLayoutChildren();
var length=v.length;
var r,u;
var g,f,p,h;

for(var i=0;i<length;i++){r=v[i];
u=r.getLayoutProperties().type;

if(u===b){f=r;
}else if(u===c){p=r;
}else if(!g){g=r;
}else{h=r;
}}
if(g&&h){var x=g.getLayoutProperties().flex;
var k=h.getLayoutProperties().flex;

if(x==null){x=1;
}
if(k==null){k=1;
}var w=g.getSizeHint();
var n=f.getSizeHint();
var o=h.getSizeHint();
var j=w.height;
var s=n.height;
var t=o.height;

if(x>0&&k>0){var l=x+k;
var m=e-s;
var j=Math.round((m/l)*x);
var t=m-j;
var q=qx.ui.layout.Util.arrangeIdeals(w.minHeight,j,w.maxHeight,o.minHeight,t,o.maxHeight);
j=q.begin;
t=q.end;
}else if(x>0){j=e-s-t;

if(j<w.minHeight){j=w.minHeight;
}
if(j>w.maxHeight){j=w.maxHeight;
}}else if(k>0){t=e-j-s;

if(t<o.minHeight){t=o.minHeight;
}
if(t>o.maxHeight){t=o.maxHeight;
}}g.renderLayout(0,0,d,j);
f.renderLayout(0,j,d,s);
h.renderLayout(0,j+s,d,t);
}else{f.renderLayout(0,0,0,0);
if(g){g.renderLayout(0,0,d,e);
}else if(h){h.renderLayout(0,0,d,e);
}}},_computeSizeHint:function(){var H=this._getLayoutChildren();
var length=H.length;
var A,z,G;
var B=0,D=0,C=0;
var E=0,F=0,y=0;

for(var i=0;i<length;i++){A=H[i];
G=A.getLayoutProperties();
if(G.type===c){continue;
}z=A.getSizeHint();
B+=z.minHeight;
D+=z.height;
C+=z.maxHeight;

if(z.minWidth>E){E=z.minWidth;
}
if(z.width>F){F=z.width;
}
if(z.maxWidth>y){y=z.maxWidth;
}}return {minHeight:B,height:D,maxHeight:C,minWidth:E,width:F,maxWidth:y};
}}});
})();
(function(){var c="slider",b="splitter",a="qx.ui.splitpane.HLayout";
qx.Class.define(a,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(o,p){var F=this._getLayoutChildren();
var length=F.length;
var C,E;
var r,q,z,s;

for(var i=0;i<length;i++){C=F[i];
E=C.getLayoutProperties().type;

if(E===b){q=C;
}else if(E===c){z=C;
}else if(!r){r=C;
}else{s=C;
}}
if(r&&s){var H=r.getLayoutProperties().flex;
var t=s.getLayoutProperties().flex;

if(H==null){H=1;
}
if(t==null){t=1;
}var G=r.getSizeHint();
var w=q.getSizeHint();
var y=s.getSizeHint();
var D=G.width;
var B=w.width;
var A=y.width;

if(H>0&&t>0){var u=H+t;
var v=o-B;
var D=Math.round((v/u)*H);
var A=v-D;
var x=qx.ui.layout.Util.arrangeIdeals(G.minWidth,D,G.maxWidth,y.minWidth,A,y.maxWidth);
D=x.begin;
A=x.end;
}else if(H>0){D=o-B-A;

if(D<G.minWidth){D=G.minWidth;
}
if(D>G.maxWidth){D=G.maxWidth;
}}else if(t>0){A=o-D-B;

if(A<y.minWidth){A=y.minWidth;
}
if(A>y.maxWidth){A=y.maxWidth;
}}r.renderLayout(0,0,D,p);
q.renderLayout(D,0,B,p);
s.renderLayout(D+B,0,A,p);
}else{q.renderLayout(0,0,0,0);
if(r){r.renderLayout(0,0,o,p);
}else if(s){s.renderLayout(0,0,o,p);
}}},_computeSizeHint:function(){var n=this._getLayoutChildren();
var length=n.length;
var f,e,m;
var k=0,l=0,d=0;
var g=0,j=0,h=0;

for(var i=0;i<length;i++){f=n[i];
m=f.getLayoutProperties();
if(m.type===c){continue;
}e=f.getSizeHint();
k+=e.minWidth;
l+=e.width;
d+=e.maxWidth;

if(e.minHeight>g){g=e.minHeight;
}
if(e.height>j){j=e.height;
}
if(e.maxHeight>h){h=e.maxHeight;
}}return {minWidth:k,width:l,maxWidth:d,minHeight:g,height:j,maxHeight:h};
}}});
})();
(function(){var k="id",j="Number",h="execute",g="adjust",f="accordion.Accordion";
qx.Class.define(f,{extend:qx.ui.container.Composite,construct:function(l){arguments.callee.base.call(this);
this._win=l;
this.setLayout(new qx.ui.layout.VBox());
this.BtnArray=new Array();
this.ObjArray=new Array();
this.FuncArray=new Array();
},properties:{btnCount:{check:j,init:0},btnSelected:{check:j,init:0},btnHeight:{check:j,init:24},offsetHeight:{check:j,init:78}},members:{__ll:function(i){this.setBtnSelected(this.BtnArray[i][k]);
this.updateAccordion();
},clearArray:function(){this.BtnArray.splice(1,this.BtnArray.length);
this.ObjArray.splice(1,this.ObjArray.length);
this.FuncArray.splice(1,this.FuncArray.length);
this.setBtnCount(0);
this.setBtnSelected(0);
},addBtn:function(n,o){var p=this.getBtnCount();

if(p==0){if(this.getBtnSelected()==0){this.setBtnSelected(1);
}}this.setBtnCount(p+1);
p=this.getBtnCount();

if(n>p){n=p;
}
if(n==p){}if(n<p){var i=p;

do{this.BtnArray[i-1].removeListener(h,function(e){},this);
this.BtnArray[i]=this.BtnArray[i-1];
this.BtnArray[i][k]=i;
this.BtnArray[i].addListener(h,function(e){this.__ll(i);
},this);
i--;
}while(i>n);
}this.BtnArray[n]=new qx.ui.form.Button(o);
this.BtnArray[n][k]=n;
this.add(this.BtnArray[n]);
this.BtnArray[n].addListener(h,function(e){this.__ll(n);
},this);
},addObject:function(a,b,c){var d=this.getBtnCount();

if(a>d){a=d;
}
if(a==d){}if(a<d){var i=d;

do{this.ObjArray[i]=this.ObjArray[i-1];
this.ObjArray[i][k]=i;
i--;
}while(i>a);
}this.ObjArray[a]=b;
this.ObjArray[a][k]=a;
this.ObjArray[a][g]=c;
this.add(this.ObjArray[a]);
},updateAccordion:function(){var t=this.getBtnCount();
var x=this.getBtnSelected();
var y=50;
if(this._win.getShowStatusbar()){var r=20;
}else{var r=0;
}var s=0;
var u=this._win.getHeight();

if(u==null){u=this._win.getMinHeight();
}u=u-r;
var w=this.getBtnHeight();
var q=u-(y+(w*(t-1)));
var v=u-(s+(w*(t-1)));
this.removeAll();
var i=1;

while(i<=x){this.add(this.BtnArray[i]);

if(i==x){try{this.add(this.ObjArray[i]);

if(this.ObjArray[i][g]==1){this.ObjArray[i].setHeight(q);
}v=v-this.ObjArray[i].getHeight();
}catch(m){}}i++;
}while(i<=t){this.add(this.BtnArray[i]);
i++;
}}},destruct:function(){}});
})();
(function(){var i="Boolean",h="invalid",g="qx.ui.form.MForm",f="_applyValid",e="",d="changeRequired",c="changeValid",b="changeInvalidMessage",a="String";
qx.Mixin.define(g,{properties:{valid:{check:i,init:true,apply:f,event:c},required:{check:i,init:false,event:d},invalidMessage:{check:a,init:e,event:b}},members:{_applyValid:function(j,k){j?this.removeState(h):this.addState(h);
}}});
})();
(function(){var i="legend",h="frame",g="middle",f="top",d="resize",c="qx.ui.groupbox.GroupBox",b="groupbox",a="_applyLegendPosition";
qx.Class.define(c,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling,qx.ui.core.MContentPadding,qx.ui.form.MForm],implement:[qx.ui.form.IForm],construct:function(p,q){arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.Canvas);
this._createChildControl(h);
this._createChildControl(i);
if(p!=null){this.setLegend(p);
}
if(q!=null){this.setIcon(q);
}},properties:{appearance:{refine:true,init:b},legendPosition:{check:[f,g],init:g,apply:a,themeable:true}},members:{_forwardStates:{invalid:true},_createChildControlImpl:function(r){var s;

switch(r){case h:s=new qx.ui.container.Composite();
this._add(s,{left:0,top:6,right:0,bottom:0});
break;
case i:s=new qx.ui.basic.Atom();
s.addListener(d,this._repositionFrame,this);
this._add(s);
break;
}return s||arguments.callee.base.call(this,r);
},_getContentPaddingTarget:function(){return this.getChildControl(h);
},_applyLegendPosition:function(e){if(this.getChildControl(i).getBounds()){this._repositionFrame();
}},_repositionFrame:function(){var l=this.getChildControl(i);
var k=this.getChildControl(h);
var m=l.getBounds().height;
if(this.getLegendPosition()==g){k.setLayoutProperties({"top":Math.round(m/2)});
}else if(this.getLegendPosition()==f){k.setLayoutProperties({"top":m});
}},getChildrenContainer:function(){return this.getChildControl(h);
},setLegend:function(n){var o=this.getChildControl(i);

if(n!==null){o.setLabel(n);
o.show();
}else{o.exclude();
}},getLegend:function(){return this.getChildControl(i).getLabel();
},setIcon:function(j){this.getChildControl(i).setIcon(j);
},getIcon:function(){this.getChildControl(i).getIcon();
}}});
})();
(function(){var l="showingPlaceholder",k="color",j="",i="none",h="qx.client",g="Boolean",f="qx.event.type.Data",d="readonly",c="input",b="focusin",X="visibility",W="focusout",V="hidden",U="absolute",T="readOnly",S="text",R="_applyTextAlign",Q="px",P="RegExp",O=")",s="syncAppearance",t="gecko",q="A",r="change",o="textAlign",p="focused",m="center",n="visible",u="disabled",v="url(",C="String",A="resize",G="qx.ui.form.AbstractField",E="transparent",K="off",I="spellcheck",x="false",N="right",M="PositiveInteger",L="mshtml",w="abstract",y="block",z="webkit",B="_applyReadOnly",D="_applyPlaceholder",F="left",H="changeValue",J="qx/static/blank.gif";
qx.Class.define(G,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm,qx.ui.form.IForm],include:[qx.ui.form.MForm],type:w,construct:function(bn){arguments.callee.base.call(this);

if(bn!=null){this.setValue(bn);
}this.getContentElement().addListener(r,this._onChangeContent,this);
this.addListener(s,this._syncPlaceholder,this);
},events:{"input":f,"changeValue":f},properties:{textAlign:{check:[F,m,N],nullable:true,themeable:true,apply:R},readOnly:{check:g,apply:B,init:false},selectable:{refine:true,init:true},focusable:{refine:true,init:true},maxLength:{check:M,init:Infinity},liveUpdate:{check:g,init:false},placeholder:{check:C,nullable:true,apply:D},filter:{check:P,nullable:true,init:null}},members:{__lm:true,__ln:null,__lo:null,__lp:null,getFocusElement:function(){var bD=this.getContentElement();

if(bD){return bD;
}},_createInputElement:function(){return new qx.html.Input(S);
},renderLayout:function(Y,top,ba,bb){var bc=this._updateInsets;
var bg=arguments.callee.base.call(this,Y,top,ba,bb);
if(!bg){return;
}var be=bg.size||bc;
var bh=Q;

if(be||bg.local||bg.margin){var bd=this.getInsets();
var innerWidth=ba-bd.left-bd.right;
var innerHeight=bb-bd.top-bd.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}var bf=this.getContentElement();

if(bc){this.__ls().setStyles({"left":bd.left+bh,"top":bd.top+bh});
}
if(be){this.__ls().setStyles({"width":innerWidth+bh,"height":innerHeight+bh});
bf.setStyles({"width":innerWidth+bh,"height":innerHeight+bh});
}},_createContentElement:function(){var bN=this._createInputElement();
bN.setStyles({"border":i,"padding":0,"margin":0,"display":y,"background":E,"outline":i,"appearance":i,"position":U,"autoComplete":K});
bN.setSelectable(this.getSelectable());
bN.setEnabled(this.getEnabled());
bN.addListener(c,this._onHtmlInput,this);
if(qx.core.Variant.isSet(h,t)){bN.setAttribute(I,x);
}if(qx.core.Variant.isSet(h,z)){bN.setStyle(A,i);
}if(qx.core.Variant.isSet(h,L)){bN.setStyles({backgroundImage:v+qx.util.ResourceManager.getInstance().toUri(J)+O});
}return bN;
},_applyEnabled:function(bx,by){arguments.callee.base.call(this,bx,by);
this.getContentElement().setEnabled(bx);

if(bx){this._showPlaceholder();
}else{this._removePlaceholder();
}},__lq:{width:16,height:16},_getContentHint:function(){return {width:this.__lq.width*10,height:this.__lq.height||16};
},_applyFont:function(br,bs){var bt;

if(br){var bu=qx.theme.manager.Font.getInstance().resolve(br);
bt=bu.getStyles();
}else{bt=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(bt);
this.__ls().setStyles(bt);
if(br){this.__lq=qx.bom.Label.getTextSize(q,bt);
}else{delete this.__lq;
}qx.ui.core.queue.Layout.add(this);
},_applyTextColor:function(bE,bF){if(bE){this.getContentElement().setStyle(k,qx.theme.manager.Color.getInstance().resolve(bE));
this.__ls().setStyle(k,qx.theme.manager.Color.getInstance().resolve(bE));
}else{this.getContentElement().removeStyle(k);
this.__ls().removeStyle(k);
}},tabFocus:function(){arguments.callee.base.call(this);
this.selectAllText();
},_getTextSize:function(){return this.__lq;
},_onHtmlInput:function(e){var bJ=e.getData();
var bI=true;
this.__lm=false;
if(this.getFilter()!=null){var bK=j;
var bG=bJ.search(this.getFilter());
var bH=bJ;

while(bG>=0){bK=bK+(bH.charAt(bG));
bH=bH.substring(bG+1,bH.length);
bG=bH.search(this.getFilter());
}
if(bK!=bJ){bI=false;
bJ=bK;
this.getContentElement().setValue(bJ);
}}if(bJ.length>this.getMaxLength()){var bI=false;
this.getContentElement().setValue(bJ.substr(0,this.getMaxLength()));
}if(bI){this.fireDataEvent(c,bJ,this.__lp);
this.__lp=bJ;
if(this.getLiveUpdate()){this.__lr(bJ);
}}},__lr:function(a){this.fireNonBubblingEvent(H,qx.event.type.Data,[a,this.__lo]);
this.__lo=a;
},setValue:function(bj){if(bj===null){if(this.__lm){return bj;
}bj=j;
this.__lm=true;
}else{this.__lm=false;
this._removePlaceholder();
}
if(qx.lang.Type.isString(bj)){var bl=this.getContentElement();

if(bj.length>this.getMaxLength()){bj=bj.substr(0,this.getMaxLength());
}
if(bl.getValue()!=bj){var bm=bl.getValue();
bl.setValue(bj);
var bk=this.__lm?null:bj;
this.__lo=bm;
this.__lr(bk);
}this._showPlaceholder();
return bj;
}throw new Error("Invalid value type: "+bj);
},getValue:function(){var bi=this.getContentElement().getValue();
return this.__lm?null:bi;
},resetValue:function(){this.setValue(null);
},_onChangeContent:function(e){this.__lm=e.getData()===null;
this.__lr(e.getData());
},getTextSelection:function(){return this.getContentElement().getTextSelection();
},getTextSelectionLength:function(){return this.getContentElement().getTextSelectionLength();
},getTextSelectionStart:function(){return this.getContentElement().getTextSelectionStart();
},getTextSelectionEnd:function(){return this.getContentElement().getTextSelectionEnd();
},setTextSelection:function(bL,bM){this.getContentElement().setTextSelection(bL,bM);
},clearTextSelection:function(){this.getContentElement().clearTextSelection();
},selectAllText:function(){this.setTextSelection(0);
},_showPlaceholder:function(){var bw=this.getValue()||j;
var bv=this.getPlaceholder();

if(bv!=null&&bw==j&&!this.hasState(p)&&!this.hasState(u)){if(this.hasState(l)){this._syncPlaceholder();
}else{this.addState(l);
}}},_removePlaceholder:function(){if(this.hasState(l)){this.__ls().setStyle(X,V);
this.removeState(l);
}},_syncPlaceholder:function(){if(this.hasState(l)){this.__ls().setStyle(X,n);
}},__ls:function(){if(this.__ln==null){this.__ln=new qx.html.Label();
this.__ln.setStyles({"visibility":V,"zIndex":6,"position":U});
this.getContainerElement().add(this.__ln);
}return this.__ln;
},_applyPlaceholder:function(bz,bA){this.__ls().setValue(bz);

if(bz!=null){this.addListener(b,this._removePlaceholder,this);
this.addListener(W,this._showPlaceholder,this);
this._showPlaceholder();
}else{this.removeListener(b,this._removePlaceholder,this);
this.removeListener(W,this._showPlaceholder,this);
this._removePlaceholder();
}},_applyTextAlign:function(bB,bC){this.getContentElement().setStyle(o,bB);
},_applyReadOnly:function(bo,bp){var bq=this.getContentElement();
bq.setAttribute(T,bo);

if(bo){this.addState(d);
this.setFocusable(false);
}else{this.removeState(d);
this.setFocusable(true);
}}},destruct:function(){this.__ln=null;
}});
})();
(function(){var b="qx.ui.form.TextField",a="textfield";
qx.Class.define(b,{extend:qx.ui.form.AbstractField,properties:{appearance:{refine:true,init:a},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}}});
})();
(function(){var r="none",q="wrap",p="value",o="qx.client",n="textarea",m="off",l="on",k="qxSelectable",j="",i="webkit",e="input",h="qx.html.Input",g="select",d="disabled",c="read-only",f="userSelect";
qx.Class.define(h,{extend:qx.html.Element,construct:function(t){arguments.callee.base.call(this);
this.__lt=t;
if(t===g||t===n){this.setNodeName(t);
}else{this.setNodeName(e);
}},members:{__lt:null,__lu:null,__lv:null,_createDomElement:function(){return qx.bom.Input.create(this.__lt);
},_applyProperty:function(name,a){arguments.callee.base.call(this,name,a);
var b=this.getDomElement();

if(name===p){qx.bom.Input.setValue(b,a);
}else if(name===q){qx.bom.Input.setWrap(b,a);
}},setEnabled:qx.core.Variant.select(o,{"webkit":function(A){this.__lv=A;

if(!A){this.setStyles({"userModify":c,"userSelect":r});
}else{this.setStyles({"userModify":null,"userSelect":this.__lu?null:r});
}},"default":function(u){this.setAttribute(d,u===false);
}}),setSelectable:qx.core.Variant.select(o,{"webkit":function(y){this.__lu=y;
this.setAttribute(k,y?l:m);
if(qx.core.Variant.isSet(o,i)){var z=this.__lv?y?null:r:r;
this.setStyle(f,z);
}},"default":function(v){this.setAttribute(k,v?l:m);
}}),setValue:function(w){var x=this.getDomElement();

if(x){if(x.value!=w){qx.bom.Input.setValue(x,w);
}}else{this._setProperty(p,w);
}return this;
},getValue:function(){var B=this.getDomElement();

if(B){return qx.bom.Input.getValue(B);
}return this._getProperty(p)||j;
},setWrap:function(s){if(this.__lt===n){this._setProperty(q,s);
}else{throw new Error("Text wrapping is only support by textareas!");
}return this;
},getWrap:function(){if(this.__lt===n){return this._getProperty(q);
}else{throw new Error("Text wrapping is only support by textareas!");
}}}});
})();
(function(){var K="change",J="input",I="qx.client",H="text",G="password",F="checkbox",E="radio",D="textarea",C="keypress",B="opera",v="propertychange",A="blur",y="keydown",u="keyup",t="select-multiple",x="checked",w="value",z="select",s="qx.event.handler.Input";
qx.Class.define(s,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){arguments.callee.base.call(this);
this._onChangeCheckedWrapper=qx.lang.Function.listener(this._onChangeChecked,this);
this._onChangeValueWrapper=qx.lang.Function.listener(this._onChangeValue,this);
this._onInputWrapper=qx.lang.Function.listener(this._onInput,this);
this._onPropertyWrapper=qx.lang.Function.listener(this._onProperty,this);
if(qx.core.Variant.isSet(I,B)){this._onKeyDownWrapper=qx.lang.Function.listener(this._onKeyDown,this);
this._onKeyUpWrapper=qx.lang.Function.listener(this._onKeyUp,this);
this._onBlurWrapper=qx.lang.Function.listener(this._onBlur,this);
}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{input:1,change:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{__lw:false,__lx:null,__ly:null,canHandleEvent:function(j,k){var m=j.tagName.toLowerCase();

if(k===J&&(m===J||m===D)){return true;
}
if(k===K&&(m===J||m===D||m===z)){return true;
}return false;
},registerEvent:qx.core.Variant.select(I,{"mshtml":function(L,M,N){if(!L.__lz){var O=L.tagName.toLowerCase();
var P=L.type;

if(P===H||P===G||O===D||P===F||P===E){qx.bom.Event.addNativeListener(L,v,this._onPropertyWrapper);
}
if(P!==F&&P!==E){qx.bom.Event.addNativeListener(L,K,this._onChangeValueWrapper);
}
if(P===H||P===G){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,L);
qx.bom.Event.addNativeListener(L,C,this._onKeyPressWrapped);
}L.__lz=true;
}},"default":function(f,g,h){if(g===J){this.__lA(f);
}else if(g===K){if(f.type===E||f.type===F){qx.bom.Event.addNativeListener(f,K,this._onChangeCheckedWrapper);
}else{qx.bom.Event.addNativeListener(f,K,this._onChangeValueWrapper);
}if(qx.core.Variant.isSet(I,B)){if(f.type===H||f.type===G){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,f);
qx.bom.Event.addNativeListener(f,C,this._onKeyPressWrapped);
}}}}}),__lA:qx.core.Variant.select(I,{"mshtml":null,"webkit":function(W){var X=W.tagName.toLowerCase();
if(qx.bom.client.Engine.VERSION<532&&X==D){qx.bom.Event.addNativeListener(W,C,this._onInputWrapper);
}qx.bom.Event.addNativeListener(W,J,this._onInputWrapper);
},"opera":function(r){qx.bom.Event.addNativeListener(r,u,this._onKeyUpWrapper);
qx.bom.Event.addNativeListener(r,y,this._onKeyDownWrapper);
qx.bom.Event.addNativeListener(r,A,this._onBlurWrapper);
qx.bom.Event.addNativeListener(r,J,this._onInputWrapper);
},"default":function(S){qx.bom.Event.addNativeListener(S,J,this._onInputWrapper);
}}),unregisterEvent:qx.core.Variant.select(I,{"mshtml":function(bc,bd){if(bc.__lz){var be=bc.tagName.toLowerCase();
var bf=bc.type;

if(bf===H||bf===G||be===D||bf===F||bf===E){qx.bom.Event.removeNativeListener(bc,v,this._onPropertyWrapper);
}
if(bf!==F&&bf!==E){qx.bom.Event.removeNativeListener(bc,K,this._onChangeValueWrapper);
}
if(bf===H||bf===G){qx.bom.Event.removeNativeListener(bc,C,this._onKeyPressWrapped);
}
try{delete bc.__lz;
}catch(c){bc.__lz=null;
}}},"default":function(U,V){if(V===J){this.__lA(U);
}else if(V===K){if(U.type===E||U.type===F){qx.bom.Event.removeNativeListener(U,K,this._onChangeCheckedWrapper);
}else{qx.bom.Event.removeNativeListener(U,K,this._onChangeValueWrapper);
}}
if(qx.core.Variant.isSet(I,B)){if(U.type===H||U.type===G){qx.bom.Event.removeNativeListener(U,C,this._onKeyPressWrapped);
}}}}),__lB:qx.core.Variant.select(I,{"mshtml":null,"webkit":function(Q){var R=Q.tagName.toLowerCase();
if(qx.bom.client.Engine.VERSION<532&&R==D){qx.bom.Event.removeNativeListener(Q,C,this._onInputWrapper);
}qx.bom.Event.removeNativeListener(Q,J,this._onInputWrapper);
},"opera":function(n){qx.bom.Event.removeNativeListener(n,u,this._onKeyUpWrapper);
qx.bom.Event.removeNativeListener(n,y,this._onKeyDownWrapper);
qx.bom.Event.removeNativeListener(n,A,this._onBlurWrapper);
qx.bom.Event.removeNativeListener(n,J,this._onInputWrapper);
},"default":function(d){qx.bom.Event.removeNativeListener(d,J,this._onInputWrapper);
}}),_onKeyPress:qx.core.Variant.select(I,{"mshtml|opera":function(e,ba){if(e.keyCode===13){if(ba.value!==this.__ly){this.__ly=ba.value;
qx.event.Registration.fireEvent(ba,K,qx.event.type.Data,[ba.value]);
}}},"default":null}),_onKeyDown:qx.core.Variant.select(I,{"opera":function(e){if(e.keyCode===13){this.__lw=true;
}},"default":null}),_onKeyUp:qx.core.Variant.select(I,{"opera":function(e){if(e.keyCode===13){this.__lw=false;
}},"default":null}),_onBlur:qx.core.Variant.select(I,{"opera":function(e){if(this.__lx){window.clearTimeout(this.__lx);
}},"default":null}),_onInput:qx.event.GlobalError.observeMethod(function(e){var T=e.target;
if(!this.__lw){if(qx.core.Variant.isSet(I,B)){this.__lx=window.setTimeout(function(){qx.event.Registration.fireEvent(T,J,qx.event.type.Data,[T.value]);
},0);
}else{qx.event.Registration.fireEvent(T,J,qx.event.type.Data,[T.value]);
}}}),_onChangeValue:qx.event.GlobalError.observeMethod(function(e){var b=e.target||e.srcElement;
var a=b.value;

if(b.type===t){var a=[];

for(var i=0,o=b.options,l=o.length;i<l;i++){if(o[i].selected){a.push(o[i].value);
}}}qx.event.Registration.fireEvent(b,K,qx.event.type.Data,[a]);
}),_onChangeChecked:qx.event.GlobalError.observeMethod(function(e){var bb=e.target;

if(bb.type===E){if(bb.checked){qx.event.Registration.fireEvent(bb,K,qx.event.type.Data,[bb.value]);
}}else{qx.event.Registration.fireEvent(bb,K,qx.event.type.Data,[bb.checked]);
}}),_onProperty:qx.core.Variant.select(I,{"mshtml":qx.event.GlobalError.observeMethod(function(e){var p=e.target||e.srcElement;
var q=e.propertyName;

if(q===w&&(p.type===H||p.type===G||p.tagName.toLowerCase()===D)){if(!p.__inValueSet){qx.event.Registration.fireEvent(p,J,qx.event.type.Data,[p.value]);
}}else if(q===x){if(p.type===F){qx.event.Registration.fireEvent(p,K,qx.event.type.Data,[p.checked]);
}else if(p.checked){qx.event.Registration.fireEvent(p,K,qx.event.type.Data,[p.value]);
}}}),"default":function(){}})},defer:function(Y){qx.event.Registration.addHandler(Y);
}});
})();
(function(){var v="",u="select",t="soft",s="off",r="qx.client",q="wrap",p="text",o="mshtml",n="number",m="checkbox",d="select-one",k="input",g="option",c="value",b="radio",f="qx.bom.Input",e="nowrap",h="textarea",a="auto",j="normal";
qx.Class.define(f,{statics:{__lC:{text:1,textarea:1,select:1,checkbox:1,radio:1,password:1,hidden:1,submit:1,image:1,file:1,search:1,reset:1,button:1},create:function(F,G,H){{};
var G=G?qx.lang.Object.clone(G):{};
var I;

if(F===h||F===u){I=F;
}else{I=k;
G.type=F;
}return qx.bom.Element.create(I,G,H);
},setValue:function(w,x){var C=w.nodeName.toLowerCase();
var z=w.type;
var Array=qx.lang.Array;
var D=qx.lang.Type;

if(typeof x===n){x+=v;
}
if((z===m||z===b)){if(D.isArray(x)){w.checked=Array.contains(x,w.value);
}else{w.checked=w.value==x;
}}else if(C===u){var y=D.isArray(x);
var E=w.options;
var A,B;

for(var i=0,l=E.length;i<l;i++){A=E[i];
B=A.getAttribute(c);

if(B==null){B=A.text;
}A.selected=y?Array.contains(x,B):x==B;
}
if(y&&x.length==0){w.selectedIndex=-1;
}}else if(z===p&&qx.core.Variant.isSet(r,o)){w.__lD=true;
w.value=x;
w.__lD=null;
}else{w.value=x;
}},getValue:function(J){var P=J.nodeName.toLowerCase();

if(P===g){return (J.attributes.value||{}).specified?J.value:J.text;
}
if(P===u){var K=J.selectedIndex;
if(K<0){return null;
}var Q=[];
var S=J.options;
var R=J.type==d;
var O=qx.bom.Input;
var N;
for(var i=R?K:0,M=R?K+1:S.length;i<M;i++){var L=S[i];

if(L.selected){N=O.getValue(L);
if(R){return N;
}Q.push(N);
}}return Q;
}else{return (J.value||v).replace(/\r/g,v);
}},setWrap:qx.core.Variant.select(r,{"mshtml":function(T,U){T.wrap=U?t:s;
},"gecko|webkit":function(V,W){var Y=W?t:s;
var X=W?v:a;
V.setAttribute(q,Y);
V.style.overflow=X;
},"default":function(ba,bb){ba.style.whiteSpace=bb?j:e;
}})}});
})();
(function(){var c="password",b="qx.ui.form.PasswordField",a="input";
qx.Class.define(b,{extend:qx.ui.form.TextField,members:{_createInputElement:function(){var d=new qx.html.Input(c);
d.addListener(a,this._onHtmlInput,this);
return d;
}}});
})();


qx.$$loader.init();

