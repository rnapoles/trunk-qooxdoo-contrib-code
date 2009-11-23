(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!window.qxsettings) qxsettings = {};
var settings = {"qx.application":"gui4.Application","qx.theme":"gui4.theme.Theme","qx.version":"1.0-beta1"};
for (var k in settings) qxsettings[k] = settings[k];

if (!window.qxvariants) qxvariants = {};
var variants = {"qx.debug":"off"};
for (var k in variants) qxvariants[k] = variants[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"gui4":{"resourceUri":"resource","sourceUri":"script","version":"trunk"},"qx":{"resourceUri":"resource","sourceUri":"script","version":"trunk"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {};
qx.$$locales = {"C":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EEEd":"d EEE","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_Hms":"H:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMMEd":"E, MMMM d","cldr_date_time_format_MMMMd":"MMMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, M/d/yyyy","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"EEE, MMM d, y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_abbreviated_fri":"Fri","cldr_day_stand-alone_abbreviated_mon":"Mon","cldr_day_stand-alone_abbreviated_sat":"Sat","cldr_day_stand-alone_abbreviated_sun":"Sun","cldr_day_stand-alone_abbreviated_thu":"Thu","cldr_day_stand-alone_abbreviated_tue":"Tue","cldr_day_stand-alone_abbreviated_wed":"Wed","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"Friday","cldr_day_stand-alone_wide_mon":"Monday","cldr_day_stand-alone_wide_sat":"Saturday","cldr_day_stand-alone_wide_sun":"Sunday","cldr_day_stand-alone_wide_thu":"Thursday","cldr_day_stand-alone_wide_tue":"Tuesday","cldr_day_stand-alone_wide_wed":"Wednesday","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"},"en":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EEEd":"d EEE","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_Hms":"H:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMMEd":"E, MMMM d","cldr_date_time_format_MMMMd":"MMMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, M/d/yyyy","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"EEE, MMM d, y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_abbreviated_fri":"Fri","cldr_day_stand-alone_abbreviated_mon":"Mon","cldr_day_stand-alone_abbreviated_sat":"Sat","cldr_day_stand-alone_abbreviated_sun":"Sun","cldr_day_stand-alone_abbreviated_thu":"Thu","cldr_day_stand-alone_abbreviated_tue":"Tue","cldr_day_stand-alone_abbreviated_wed":"Wed","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"Friday","cldr_day_stand-alone_wide_mon":"Monday","cldr_day_stand-alone_wide_sat":"Saturday","cldr_day_stand-alone_wide_sun":"Sunday","cldr_day_stand-alone_wide_thu":"Thursday","cldr_day_stand-alone_wide_tue":"Tuesday","cldr_day_stand-alone_wide_wed":"Wednesday","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"}};
qx.$$i18n    = {};
qx.$$packageData = {};

qx.$$loader = {
  parts : {"boot":[0]},
  uris : [["gui4:gui4.js"]],
  urisBefore : [],
  packageHashes : {"0":"11ad7103b450"},
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

qx.$$packageData['11ad7103b450']={"resources":{"gui4/test.png":[32,32,"png","gui4"],"qx/decoration/Modern/app-header.png":[110,20,"png","qx"],"qx/decoration/Modern/arrows-combined.png":[87,8,"png","qx"],"qx/decoration/Modern/arrows/down-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-61,0],"qx/decoration/Modern/arrows/down-small-invert.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-10,0],"qx/decoration/Modern/arrows/down-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-82,0],"qx/decoration/Modern/arrows/down.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-74,0],"qx/decoration/Modern/arrows/forward.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-43,0],"qx/decoration/Modern/arrows/left-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-30,0],"qx/decoration/Modern/arrows/left.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",0,0],"qx/decoration/Modern/arrows/rewind.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-20,0],"qx/decoration/Modern/arrows/right-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-15,0],"qx/decoration/Modern/arrows/right.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-5,0],"qx/decoration/Modern/arrows/up-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-53,0],"qx/decoration/Modern/arrows/up-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-69,0],"qx/decoration/Modern/arrows/up.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-35,0],"qx/decoration/Modern/button-lr-combined.png":[72,52,"png","qx"],"qx/decoration/Modern/button-tb-combined.png":[4,216,"png","qx"],"qx/decoration/Modern/checkradio-combined.png":[504,14,"png","qx"],"qx/decoration/Modern/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Modern/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Modern/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",0,0],"qx/decoration/Modern/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Modern/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",-35,0],"qx/decoration/Modern/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Modern/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-33,0],"qx/decoration/Modern/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-52,0],"qx/decoration/Modern/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-20,0],"qx/decoration/Modern/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Modern/cursors-combined.gif",0,0],"qx/decoration/Modern/form/button-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-60],"qx/decoration/Modern/form/button-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-140],"qx/decoration/Modern/form/button-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-20],"qx/decoration/Modern/form/button-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-checked-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-176],"qx/decoration/Modern/form/button-checked-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-76],"qx/decoration/Modern/form/button-checked-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-188],"qx/decoration/Modern/form/button-checked-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-136],"qx/decoration/Modern/form/button-checked-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-148],"qx/decoration/Modern/form/button-checked-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-4],"qx/decoration/Modern/form/button-checked-focused-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-48,0],"qx/decoration/Modern/form/button-checked-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-12,0],"qx/decoration/Modern/form/button-checked-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-184],"qx/decoration/Modern/form/button-checked-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-68],"qx/decoration/Modern/form/button-checked-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-100],"qx/decoration/Modern/form/button-checked-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-8,0],"qx/decoration/Modern/form/button-checked-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-52,0],"qx/decoration/Modern/form/button-checked-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-104],"qx/decoration/Modern/form/button-checked-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-40],"qx/decoration/Modern/form/button-checked-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-116],"qx/decoration/Modern/form/button-disabled-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-92],"qx/decoration/Modern/form/button-disabled-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-72],"qx/decoration/Modern/form/button-disabled-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-128],"qx/decoration/Modern/form/button-disabled-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-disabled-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-28,0],"qx/decoration/Modern/form/button-disabled-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-4,0],"qx/decoration/Modern/form/button-disabled-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-120],"qx/decoration/Modern/form/button-disabled-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-164],"qx/decoration/Modern/form/button-disabled-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-208],"qx/decoration/Modern/form/button-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-172],"qx/decoration/Modern/form/button-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-88],"qx/decoration/Modern/form/button-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-16],"qx/decoration/Modern/form/button-focused-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-16,0],"qx/decoration/Modern/form/button-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-44,0],"qx/decoration/Modern/form/button-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-152],"qx/decoration/Modern/form/button-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-132],"qx/decoration/Modern/form/button-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-124],"qx/decoration/Modern/form/button-hovered-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-80],"qx/decoration/Modern/form/button-hovered-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-28],"qx/decoration/Modern/form/button-hovered-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-168],"qx/decoration/Modern/form/button-hovered-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-hovered-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-60,0],"qx/decoration/Modern/form/button-hovered-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-40,0],"qx/decoration/Modern/form/button-hovered-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-36],"qx/decoration/Modern/form/button-hovered-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-24],"qx/decoration/Modern/form/button-hovered-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-32],"qx/decoration/Modern/form/button-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-56,0],"qx/decoration/Modern/form/button-preselected-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-56],"qx/decoration/Modern/form/button-preselected-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-48],"qx/decoration/Modern/form/button-preselected-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-44],"qx/decoration/Modern/form/button-preselected-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-180],"qx/decoration/Modern/form/button-preselected-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-212],"qx/decoration/Modern/form/button-preselected-focused-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-64,0],"qx/decoration/Modern/form/button-preselected-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-96],"qx/decoration/Modern/form/button-preselected-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-8],"qx/decoration/Modern/form/button-preselected-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-204],"qx/decoration/Modern/form/button-preselected-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-20,0],"qx/decoration/Modern/form/button-preselected-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-36,0],"qx/decoration/Modern/form/button-preselected-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-196],"qx/decoration/Modern/form/button-preselected-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-52],"qx/decoration/Modern/form/button-preselected-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-112],"qx/decoration/Modern/form/button-pressed-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-108],"qx/decoration/Modern/form/button-pressed-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-144],"qx/decoration/Modern/form/button-pressed-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-160],"qx/decoration/Modern/form/button-pressed-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-pressed-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-24,0],"qx/decoration/Modern/form/button-pressed-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-32,0],"qx/decoration/Modern/form/button-pressed-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-200],"qx/decoration/Modern/form/button-pressed-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-64],"qx/decoration/Modern/form/button-pressed-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-84],"qx/decoration/Modern/form/button-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-68,0],"qx/decoration/Modern/form/button-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-192],"qx/decoration/Modern/form/button-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-156],"qx/decoration/Modern/form/button-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-12],"qx/decoration/Modern/form/checkbox-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-42,0],"qx/decoration/Modern/form/checkbox-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-140,0],"qx/decoration/Modern/form/checkbox-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-196,0],"qx/decoration/Modern/form/checkbox-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-84,0],"qx/decoration/Modern/form/checkbox-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-252,0],"qx/decoration/Modern/form/checkbox-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-112,0],"qx/decoration/Modern/form/checkbox-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-406,0],"qx/decoration/Modern/form/checkbox-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-266,0],"qx/decoration/Modern/form/checkbox-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-476,0],"qx/decoration/Modern/form/checkbox-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-392,0],"qx/decoration/Modern/form/checkbox-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-294,0],"qx/decoration/Modern/form/checkbox-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-126,0],"qx/decoration/Modern/form/checkbox-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-210,0],"qx/decoration/Modern/form/checkbox-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-14,0],"qx/decoration/Modern/form/checkbox-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-168,0],"qx/decoration/Modern/form/checkbox-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-238,0],"qx/decoration/Modern/form/checkbox-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-154,0],"qx/decoration/Modern/form/checkbox.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-280,0],"qx/decoration/Modern/form/input-focused.png":[40,12,"png","qx"],"qx/decoration/Modern/form/input.png":[84,12,"png","qx"],"qx/decoration/Modern/form/radiobutton-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-420,0],"qx/decoration/Modern/form/radiobutton-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-182,0],"qx/decoration/Modern/form/radiobutton-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-336,0],"qx/decoration/Modern/form/radiobutton-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-322,0],"qx/decoration/Modern/form/radiobutton-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-462,0],"qx/decoration/Modern/form/radiobutton-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-350,0],"qx/decoration/Modern/form/radiobutton-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",0,0],"qx/decoration/Modern/form/radiobutton-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-448,0],"qx/decoration/Modern/form/radiobutton-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-434,0],"qx/decoration/Modern/form/radiobutton-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-224,0],"qx/decoration/Modern/form/radiobutton-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-56,0],"qx/decoration/Modern/form/radiobutton-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-28,0],"qx/decoration/Modern/form/radiobutton-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-378,0],"qx/decoration/Modern/form/radiobutton-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-308,0],"qx/decoration/Modern/form/radiobutton-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-70,0],"qx/decoration/Modern/form/radiobutton-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-98,0],"qx/decoration/Modern/form/radiobutton-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-364,0],"qx/decoration/Modern/form/radiobutton.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-490,0],"qx/decoration/Modern/form/tooltip-error-arrow.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-b.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-24],"qx/decoration/Modern/form/tooltip-error-bl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-br.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-30],"qx/decoration/Modern/form/tooltip-error-c.png":[20,18,"png","qx"],"qx/decoration/Modern/form/tooltip-error-l.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-r.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",-6,0],"qx/decoration/Modern/form/tooltip-error-t.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-12],"qx/decoration/Modern/form/tooltip-error-tl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-6],"qx/decoration/Modern/form/tooltip-error-tr.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-18],"qx/decoration/Modern/groupbox-lr-combined.png":[8,51,"png","qx"],"qx/decoration/Modern/groupbox-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-b.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-8],"qx/decoration/Modern/groupbox/groupbox-bl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-20],"qx/decoration/Modern/groupbox/groupbox-br.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-c.png":[20,51,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-l.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-r.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",-4,0],"qx/decoration/Modern/groupbox/groupbox-t.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-12],"qx/decoration/Modern/groupbox/groupbox-tl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-16],"qx/decoration/Modern/groupbox/groupbox-tr.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-4],"qx/decoration/Modern/menu-background-combined.png":[60,49,"png","qx"],"qx/decoration/Modern/menu-checkradio-combined.gif":[64,7,"gif","qx"],"qx/decoration/Modern/menu/background.png":[20,49,"png","qx","qx/decoration/Modern/menu-background-combined.png",0,0],"qx/decoration/Modern/menu/bar-background.png":[40,20,"png","qx","qx/decoration/Modern/menu-background-combined.png",-20,0],"qx/decoration/Modern/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-16,0],"qx/decoration/Modern/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-48,0],"qx/decoration/Modern/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-32,0],"qx/decoration/Modern/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",0,0],"qx/decoration/Modern/pane-lr-combined.png":[12,238,"png","qx"],"qx/decoration/Modern/pane-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/pane/pane-b.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-6],"qx/decoration/Modern/pane/pane-bl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,0],"qx/decoration/Modern/pane/pane-br.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-30],"qx/decoration/Modern/pane/pane-c.png":[20,238,"png","qx"],"qx/decoration/Modern/pane/pane-l.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",-6,0],"qx/decoration/Modern/pane/pane-r.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",0,0],"qx/decoration/Modern/pane/pane-t.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-24],"qx/decoration/Modern/pane/pane-tl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-18],"qx/decoration/Modern/pane/pane-tr.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-12],"qx/decoration/Modern/scrollbar-combined.png":[54,12,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-horizontal.png":[76,15,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-horizontal.png":[19,10,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-vertical.png":[10,19,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-vertical.png":[15,76,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-horizontal.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",0,0],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-vertical.png":[10,12,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-34,0],"qx/decoration/Modern/scrollbar/scrollbar-down.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-44,0],"qx/decoration/Modern/scrollbar/scrollbar-left.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-50,0],"qx/decoration/Modern/scrollbar/scrollbar-right.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-24,0],"qx/decoration/Modern/scrollbar/scrollbar-up.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-28,0],"qx/decoration/Modern/scrollbar/slider-knob-background.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-12,0],"qx/decoration/Modern/selection.png":[110,20,"png","qx"],"qx/decoration/Modern/shadow-lr-combined.png":[30,382,"png","qx"],"qx/decoration/Modern/shadow-small-lr-combined.png":[10,136,"png","qx"],"qx/decoration/Modern/shadow-small-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/shadow-tb-combined.png":[15,90,"png","qx"],"qx/decoration/Modern/shadow/shadow-b.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-75],"qx/decoration/Modern/shadow/shadow-bl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-45],"qx/decoration/Modern/shadow/shadow-br.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-c.png":[20,382,"png","qx"],"qx/decoration/Modern/shadow/shadow-l.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-r.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",-15,0],"qx/decoration/Modern/shadow/shadow-small-b.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-small-bl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-20],"qx/decoration/Modern/shadow/shadow-small-br.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-10],"qx/decoration/Modern/shadow/shadow-small-c.png":[20,136,"png","qx"],"qx/decoration/Modern/shadow/shadow-small-l.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",-5,0],"qx/decoration/Modern/shadow/shadow-small-r.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-t.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-5],"qx/decoration/Modern/shadow/shadow-small-tl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-tr.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-25],"qx/decoration/Modern/shadow/shadow-t.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-30],"qx/decoration/Modern/shadow/shadow-tl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-tr.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-60],"qx/decoration/Modern/splitpane-knobs-combined.png":[8,9,"png","qx"],"qx/decoration/Modern/splitpane/knob-horizontal.png":[1,8,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,0],"qx/decoration/Modern/splitpane/knob-vertical.png":[8,1,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,-8],"qx/decoration/Modern/table-combined.png":[74,18,"png","qx"],"qx/decoration/Modern/table/ascending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",-46,0],"qx/decoration/Modern/table/boolean-false.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-22,0],"qx/decoration/Modern/table/boolean-true.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-8,0],"qx/decoration/Modern/table/descending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",0,0],"qx/decoration/Modern/table/header-cell.png":[20,18,"png","qx","qx/decoration/Modern/table-combined.png",-54,0],"qx/decoration/Modern/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Modern/table-combined.png",-36,0],"qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png":[10,14,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-lr-combined.png":[10,12,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-pane-lr-combined.png":[60,2,"png","qx"],"qx/decoration/Modern/tabview-pane-tb-combined.png":[30,180,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-bottom-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-bottom-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-bottom-active-c.png":[20,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-l.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-r.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-bottom-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-bottom-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-c.png":[20,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-left-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-left-active-c.png":[12,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-left-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-left-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-left-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-left-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-c.png":[14,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-right-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-right-active-c.png":[12,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-right-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-right-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-right-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-right-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-c.png":[14,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-top-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-top-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-top-active-c.png":[20,12,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-l.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-top-active-r.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-top-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-top-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-c.png":[20,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tabview-pane-b.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-60],"qx/decoration/Modern/tabview/tabview-pane-bl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-br.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-120],"qx/decoration/Modern/tabview/tabview-pane-c.png":[20,2,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-l.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-r.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",-30,0],"qx/decoration/Modern/tabview/tabview-pane-t.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-150],"qx/decoration/Modern/tabview/tabview-pane-tl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-90],"qx/decoration/Modern/tabview/tabview-pane-tr.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-30],"qx/decoration/Modern/tabview/tabview-pane.png":[185,250,"png","qx"],"qx/decoration/Modern/toolbar-combined.png":[40,130,"png","qx"],"qx/decoration/Modern/toolbar/toolbar-gradient-blue.png":[20,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",0,0],"qx/decoration/Modern/toolbar/toolbar-gradient.png":[20,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",-20,0],"qx/decoration/Modern/toolbar/toolbar-handle-knob.gif":[1,8,"gif","qx"],"qx/decoration/Modern/toolbar/toolbar-part.gif":[7,1,"gif","qx"],"qx/decoration/Modern/tooltip-error-lr-combined.png":[12,18,"png","qx"],"qx/decoration/Modern/tooltip-error-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/tree-combined.png":[32,8,"png","qx"],"qx/decoration/Modern/tree/closed-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",0,0],"qx/decoration/Modern/tree/closed.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-8,0],"qx/decoration/Modern/tree/open-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-24,0],"qx/decoration/Modern/tree/open.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-16,0],"qx/decoration/Modern/window-captionbar-buttons-combined.png":[108,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-active-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-inactive-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-active-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-inactive-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-statusbar-lr-combined.png":[8,7,"png","qx"],"qx/decoration/Modern/window-statusbar-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/window/captionbar-active-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-active-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-active-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-active-c.png":[20,9,"png","qx"],"qx/decoration/Modern/window/captionbar-active-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-active-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-active-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-inactive-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-c.png":[20,9,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-inactive-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-inactive-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-inactive-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-6],"qx/decoration/Modern/window/close-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-72,0],"qx/decoration/Modern/window/close-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-54,0],"qx/decoration/Modern/window/close-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-63,0],"qx/decoration/Modern/window/maximize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-45,0],"qx/decoration/Modern/window/maximize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-81,0],"qx/decoration/Modern/window/maximize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-18,0],"qx/decoration/Modern/window/minimize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-9,0],"qx/decoration/Modern/window/minimize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-90,0],"qx/decoration/Modern/window/minimize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-36,0],"qx/decoration/Modern/window/restore-active-hovered.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-99,0],"qx/decoration/Modern/window/restore-active.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",0,0],"qx/decoration/Modern/window/restore-inactive.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-27,0],"qx/decoration/Modern/window/statusbar-b.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,0],"qx/decoration/Modern/window/statusbar-bl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-4],"qx/decoration/Modern/window/statusbar-br.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-20],"qx/decoration/Modern/window/statusbar-c.png":[20,7,"png","qx"],"qx/decoration/Modern/window/statusbar-l.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",-4,0],"qx/decoration/Modern/window/statusbar-r.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",0,0],"qx/decoration/Modern/window/statusbar-t.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-16],"qx/decoration/Modern/window/statusbar-tl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-8],"qx/decoration/Modern/window/statusbar-tr.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-12],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-color-chooser.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-document.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/22/mimetypes/office-document.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-open.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder.png":[22,22,"png","qx"],"qx/icon/Tango/32/mimetypes/office-document.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder-open.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder.png":[32,32,"png","qx"],"qx/static/blank.gif":[1,1,"gif","qx"]}};
(function(){var SSSS_0=".",SSSS_1="()",SSSS_2="[Class ",SSSS_3=".prototype",SSSS_4="toString",SSSS_5="qx.Bootstrap",SSSS_6="]",SSSS_7="Class";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return SSSS_2+this.classname+SSSS_6;
},createNamespace:function(name,object){var splits=name.split(SSSS_0);
var parent=window;
var part=splits[0];

for(var i=0,len=splits.length-1;i<len;i++,part=splits[i]){if(!parent[part]){parent=parent[part]={};
}else{parent=parent[part];
}}parent[part]=object;
return part;
},setDisplayName:function(fcn,classname,name){fcn.displayName=classname+SSSS_0+name+SSSS_1;
},setDisplayNames:function(functionMap,classname){for(var name in functionMap){var value=functionMap[name];

if(value instanceof Function){value.displayName=classname+SSSS_0+name+SSSS_1;
}}},define:function(name,config){if(!config){var config={statics:{}};
}var clazz;
var proto=null;
qx.Bootstrap.setDisplayNames(config.statics,name);

if(config.members){qx.Bootstrap.setDisplayNames(config.members,name+SSSS_3);
clazz=config.construct||new Function;
var statics=config.statics;

for(var key in statics){clazz[key]=statics[key];
}proto=clazz.prototype;
var members=config.members;

for(var key in members){proto[key]=members[key];
}}else{clazz=config.statics||{};
}var basename=this.createNamespace(name,clazz);
clazz.name=clazz.classname=name;
clazz.basename=basename;
clazz.$$type=SSSS_7;
if(!clazz.hasOwnProperty(SSSS_4)){clazz.toString=this.genericToString;
}if(config.defer){config.defer(clazz,proto);
}qx.Bootstrap.$$registry[name]=config.statics;
return clazz;
}};
qx.Bootstrap.define(SSSS_5,{statics:{LOADSTART:qx.$$start||new Date(),createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,getByName:function(name){return this.$$registry[name];
},$$registry:{}}});
})();
(function(){var SSSS_0="qx.allowUrlSettings",SSSS_1="&",SSSS_2="qx.core.Setting",SSSS_3="qx.allowUrlVariants",SSSS_4="qx.propertyDebugLevel",SSSS_5="qxsetting",SSSS_6=":",SSSS_7=".";
qx.Bootstrap.define(SSSS_2,{statics:{__a:{},define:function(key,defaultValue){if(defaultValue===undefined){throw new Error('Default value of setting "'+key+'" must be defined!');
}
if(!this.__a[key]){this.__a[key]={};
}else if(this.__a[key].defaultValue!==undefined){throw new Error('Setting "'+key+'" is already defined!');
}this.__a[key].defaultValue=defaultValue;
},get:function(key){var cache=this.__a[key];

if(cache===undefined){throw new Error('Setting "'+key+'" is not defined.');
}
if(cache.value!==undefined){return cache.value;
}return cache.defaultValue;
},set:function(key,value){if((key.split(SSSS_7)).length<2){throw new Error('Malformed settings key "'+key+'". Must be following the schema "namespace.key".');
}
if(!this.__a[key]){this.__a[key]={};
}this.__a[key].value=value;
},__b:function(){if(window.qxsettings){for(var key in window.qxsettings){this.set(key,window.qxsettings[key]);
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(ex){}this.__c();
}},__c:function(){if(this.get(SSSS_0)!=true){return;
}var urlSettings=document.location.search.slice(1).split(SSSS_1);

for(var i=0;i<urlSettings.length;i++){var setting=urlSettings[i].split(SSSS_6);

if(setting.length!=3||setting[0]!=SSSS_5){continue;
}this.set(setting[1],decodeURIComponent(setting[2]));
}}},defer:function(statics){statics.define(SSSS_0,false);
statics.define(SSSS_3,false);
statics.define(SSSS_4,0);
statics.__b();
}});
})();
(function(){var SSSS_0="gecko",SSSS_1="1.9.0.0",SSSS_2=".",SSSS_3="[object Opera]",SSSS_4="function",SSSS_5="[^\\.0-9]",SSSS_6="525.26",SSSS_7="",SSSS_8="mshtml",SSSS_9="AppleWebKit/",SSSS_10="unknown",SSSS_11="9.6.0",SSSS_12="4.0",SSSS_13="Gecko",SSSS_14="opera",SSSS_15="webkit",SSSS_16="0.0.0",SSSS_17="8.0",SSSS_18="qx.bom.client.Engine";
qx.Bootstrap.define(SSSS_18,{statics:{NAME:"",FULLVERSION:"0.0.0",VERSION:0.0,OPERA:false,WEBKIT:false,GECKO:false,MSHTML:false,UNKNOWN_ENGINE:false,UNKNOWN_VERSION:false,DOCUMENT_MODE:null,__d:function(){var engine=SSSS_10;
var version=SSSS_16;
var agent=window.navigator.userAgent;
var unknownEngine=false;
var unknownVersion=false;

if(window.opera&&Object.prototype.toString.call(window.opera)==SSSS_3){engine=SSSS_14;
this.OPERA=true;
if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(agent)){version=RegExp.$1+SSSS_2+RegExp.$2;

if(RegExp.$3!=SSSS_7){version+=SSSS_2+RegExp.$3;
}}else{unknownVersion=true;
version=SSSS_11;
}}else if(window.navigator.userAgent.indexOf(SSSS_9)!=-1){engine=SSSS_15;
this.WEBKIT=true;

if(/AppleWebKit\/([^ ]+)/.test(agent)){version=RegExp.$1;
var invalidCharacter=RegExp(SSSS_5).exec(version);

if(invalidCharacter){version=version.slice(0,invalidCharacter.index);
}}else{unknownVersion=true;
version=SSSS_6;
}}else if(window.controllers&&window.navigator.product===SSSS_13){engine=SSSS_0;
this.GECKO=true;
if(/rv\:([^\);]+)(\)|;)/.test(agent)){version=RegExp.$1;
}else{unknownVersion=true;
version=SSSS_1;
}}else if(window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(agent)){engine=SSSS_8;
version=RegExp.$1;

if(document.documentMode){this.DOCUMENT_MODE=document.documentMode;
}if(version<8&&/Trident\/([^\);]+)(\)|;)/.test(agent)){if(RegExp.$1===SSSS_12){version=SSSS_17;
}}this.MSHTML=true;
}else{var failFunction=window.qxFail;

if(failFunction&&typeof failFunction===SSSS_4){var engine=failFunction();

if(engine.NAME&&engine.FULLVERSION){engine=engine.NAME;
this[engine.toUpperCase()]=true;
version=engine.FULLVERSION;
}}else{unknownEngine=true;
unknownVersion=true;
version=SSSS_1;
engine=SSSS_0;
this.GECKO=true;
window.alert("Unsupported client: "+agent+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}this.UNKNOWN_ENGINE=unknownEngine;
this.UNKNOWN_VERSION=unknownVersion;
this.NAME=engine;
this.FULLVERSION=version;
this.VERSION=parseFloat(version);
}},defer:function(statics){statics.__d();
}});
})();
(function(){var SSSS_0="on",SSSS_1="off",SSSS_2="|",SSSS_3="default",SSSS_4="object",SSSS_5="&",SSSS_6="qx.aspects",SSSS_7="$",SSSS_8="qx.allowUrlVariants",SSSS_9="qx.debug",SSSS_10="qx.client",SSSS_11="qx.dynlocale",SSSS_12="webkit",SSSS_13="qxvariant",SSSS_14="opera",SSSS_15=":",SSSS_16="qx.core.Variant",SSSS_17="mshtml",SSSS_18="gecko";
qx.Bootstrap.define(SSSS_16,{statics:{__e:{},__f:{},compilerIsSet:function(){return true;
},define:function(key,allowedValues,defaultValue){{};

if(!this.__e[key]){this.__e[key]={};
}else{}this.__e[key].allowedValues=allowedValues;
this.__e[key].defaultValue=defaultValue;
},get:function(key){var data=this.__e[key];
{};

if(data.value!==undefined){return data.value;
}return data.defaultValue;
},__g:function(){if(window.qxvariants){for(var key in qxvariants){{};

if(!this.__e[key]){this.__e[key]={};
}this.__e[key].value=qxvariants[key];
}window.qxvariants=undefined;

try{delete window.qxvariants;
}catch(ex){}this.__h(this.__e);
}},__h:function(){if(qx.core.Setting.get(SSSS_8)!=true){return;
}var urlVariants=document.location.search.slice(1).split(SSSS_5);

for(var i=0;i<urlVariants.length;i++){var variant=urlVariants[i].split(SSSS_15);

if(variant.length!=3||variant[0]!=SSSS_13){continue;
}var key=variant[1];

if(!this.__e[key]){this.__e[key]={};
}this.__e[key].value=decodeURIComponent(variant[2]);
}},select:function(key,variantFunctionMap){{};

for(var variant in variantFunctionMap){if(this.isSet(key,variant)){return variantFunctionMap[variant];
}}
if(variantFunctionMap[SSSS_3]!==undefined){return variantFunctionMap[SSSS_3];
}{};
},isSet:function(key,variants){var access=key+SSSS_7+variants;

if(this.__f[access]!==undefined){return this.__f[access];
}var retval=false;
if(variants.indexOf(SSSS_2)<0){retval=this.get(key)===variants;
}else{var keyParts=variants.split(SSSS_2);

for(var i=0,l=keyParts.length;i<l;i++){if(this.get(key)===keyParts[i]){retval=true;
break;
}}}this.__f[access]=retval;
return retval;
},__i:function(v){return typeof v===SSSS_4&&v!==null&&v instanceof Array;
},__j:function(v){return typeof v===SSSS_4&&v!==null&&!(v instanceof Array);
},__k:function(arr,obj){for(var i=0,l=arr.length;i<l;i++){if(arr[i]==obj){return true;
}}return false;
}},defer:function(statics){statics.define(SSSS_10,[SSSS_18,SSSS_17,SSSS_14,SSSS_12],qx.bom.client.Engine.NAME);
statics.define(SSSS_9,[SSSS_0,SSSS_1],SSSS_0);
statics.define(SSSS_6,[SSSS_0,SSSS_1],SSSS_1);
statics.define(SSSS_11,[SSSS_0,SSSS_1],SSSS_0);
statics.__g();
}});
})();
(function(){var SSSS_0="qx.client",SSSS_1='"',SSSS_2="valueOf",SSSS_3="toLocaleString",SSSS_4="isPrototypeOf",SSSS_5="",SSSS_6="toString",SSSS_7="qx.lang.Object",SSSS_8='\", "',SSSS_9="hasOwnProperty";
qx.Bootstrap.define(SSSS_7,{statics:{empty:function(map){{};

for(var key in map){if(map.hasOwnProperty(key)){delete map[key];
}}},isEmpty:qx.core.Variant.select(SSSS_0,{"gecko":function(map){{};
return map.__count__===0;
},"default":function(map){{};

for(var key in map){return false;
}return true;
}}),hasMinLength:qx.core.Variant.select(SSSS_0,{"gecko":function(map,minLength){{};
return map.__count__>=minLength;
},"default":function(map,minLength){{};

if(minLength<=0){return true;
}var length=0;

for(var key in map){if((++length)>=minLength){return true;
}}return false;
}}),getLength:qx.core.Variant.select(SSSS_0,{"gecko":function(map){{};
return map.__count__;
},"default":function(map){{};
var length=0;

for(var key in map){length++;
}return length;
}}),_shadowedKeys:[SSSS_4,SSSS_9,SSSS_3,SSSS_6,SSSS_2],getKeys:qx.core.Variant.select(SSSS_0,{"mshtml":function(map){var arr=[];

for(var key in map){arr.push(key);
}var hasOwnProperty=Object.prototype.hasOwnProperty;

for(var i=0,a=this._shadowedKeys,l=a.length;i<l;i++){if(hasOwnProperty.call(map,a[i])){arr.push(a[i]);
}}return arr;
},"default":function(map){var arr=[];

for(var key in map){arr.push(key);
}return arr;
}}),getKeysAsString:function(map){{};
var keys=qx.lang.Object.getKeys(map);

if(keys.length==0){return SSSS_5;
}return SSSS_1+keys.join(SSSS_8)+SSSS_1;
},getValues:function(map){{};
var arr=[];
var keys=this.getKeys(map);

for(var i=0,l=keys.length;i<l;i++){arr.push(map[keys[i]]);
}return arr;
},mergeWith:function(target,source,overwrite){{};

if(overwrite===undefined){overwrite=true;
}
for(var key in source){if(overwrite||target[key]===undefined){target[key]=source[key];
}}return target;
},carefullyMergeWith:function(target,source){{};
return qx.lang.Object.mergeWith(target,source,false);
},merge:function(target,varargs){{};
var len=arguments.length;

for(var i=1;i<len;i++){qx.lang.Object.mergeWith(target,arguments[i]);
}return target;
},clone:function(source){{};
var clone={};

for(var key in source){clone[key]=source[key];
}return clone;
},invert:function(map){{};
var result={};

for(var key in map){result[map[key].toString()]=key;
}return result;
},getKeyFromValue:function(map,value){{};

for(var key in map){if(map.hasOwnProperty(key)&&map[key]===value){return key;
}}return null;
},contains:function(map,value){{};
return this.getKeyFromValue(map,value)!==null;
},select:function(key,map){{};
return map[key];
},fromArray:function(array){{};
var obj={};

for(var i=0,l=array.length;i<l;i++){{};
obj[array[i].toString()]=true;
}return obj;
}}});
})();
(function(){var SSSS_0="Function",SSSS_1="Boolean",SSSS_2="Error",SSSS_3="Number",SSSS_4="Array",SSSS_5="Date",SSSS_6="RegExp",SSSS_7="String",SSSS_8="Object",SSSS_9="qx.lang.Type",SSSS_10="string";
qx.Bootstrap.define(SSSS_9,{statics:{__l:{"[object String]":SSSS_7,"[object Array]":SSSS_4,"[object Object]":SSSS_8,"[object RegExp]":SSSS_6,"[object Number]":SSSS_3,"[object Boolean]":SSSS_1,"[object Date]":SSSS_5,"[object Function]":SSSS_0,"[object Error]":SSSS_2},getClass:function(value){var classString=Object.prototype.toString.call(value);
return (this.__l[classString]||classString.slice(8,-1));
},isString:function(value){return (value!==null&&(typeof value===SSSS_10||this.getClass(value)==SSSS_7||value instanceof String||(!!value&&!!value.$$isString)));
},isArray:function(value){return (value!==null&&(value instanceof Array||(value&&qx.Class.hasInterface(value.constructor,qx.data.IListData))||this.getClass(value)==SSSS_4||(!!value&&!!value.$$isArray)));
},isObject:function(value){return (value!==undefined&&value!==null&&this.getClass(value)==SSSS_8);
},isRegExp:function(value){return this.getClass(value)==SSSS_6;
},isNumber:function(value){return (value!==null&&(this.getClass(value)==SSSS_3||value instanceof Number));
},isBoolean:function(value){return (value!==null&&(this.getClass(value)==SSSS_1||value instanceof Boolean));
},isDate:function(value){return (value!==null&&(this.getClass(value)==SSSS_5||value instanceof Date));
},isError:function(value){return (value!==null&&(this.getClass(value)==SSSS_2||value instanceof Error));
},isFunction:function(value){return this.getClass(value)==SSSS_0;
}}});
})();
(function(){var SSSS_0="qx.core.Aspect",SSSS_1="before",SSSS_2="*",SSSS_3="static";
qx.Bootstrap.define(SSSS_0,{statics:{__m:[],wrap:function(fullName,fcn,type){var before=[];
var after=[];
var reg=this.__m;
var entry;

for(var i=0;i<reg.length;i++){entry=reg[i];

if((entry.type==null||type==entry.type||entry.type==SSSS_2)&&(entry.name==null||fullName.match(entry.name))){entry.pos==-1?before.push(entry.fcn):after.push(entry.fcn);
}}
if(before.length===0&&after.length===0){return fcn;
}var wrapper=function(){for(var i=0;i<before.length;i++){before[i].call(this,fullName,fcn,type,arguments);
}var ret=fcn.apply(this,arguments);

for(var i=0;i<after.length;i++){after[i].call(this,fullName,fcn,type,arguments,ret);
}return ret;
};

if(type!==SSSS_3){wrapper.self=fcn.self;
wrapper.base=fcn.base;
}fcn.wrapper=wrapper;
wrapper.original=fcn;
return wrapper;
},addAdvice:function(fcn,position,type,name){this.__m.push({fcn:fcn,pos:position===SSSS_1?-1:1,type:type,name:name});
}}});
})();
(function(){var SSSS_0="qx.aspects",SSSS_1="on",SSSS_2=".",SSSS_3="static",SSSS_4="[Class ",SSSS_5="]",SSSS_6="toString",SSSS_7="constructor",SSSS_8="member",SSSS_9="$$init_",SSSS_10=".prototype",SSSS_11="destructor",SSSS_12="extend",SSSS_13="destruct",SSSS_14="Class",SSSS_15="off",SSSS_16="qx.Class",SSSS_17="qx.event.type.Data";
qx.Bootstrap.define(SSSS_16,{statics:{define:function(name,config){if(!config){var config={};
}if(config.include&&!(config.include instanceof Array)){config.include=[config.include];
}if(config.implement&&!(config.implement instanceof Array)){config.implement=[config.implement];
}if(!config.hasOwnProperty(SSSS_12)&&!config.type){config.type=SSSS_3;
}{};
var clazz=this.__r(name,config.type,config.extend,config.statics,config.construct,config.destruct);
if(config.extend){if(config.properties){this.__t(clazz,config.properties,true);
}if(config.members){this.__v(clazz,config.members,true,true,false);
}if(config.events){this.__s(clazz,config.events,true);
}if(config.include){for(var i=0,l=config.include.length;i<l;i++){this.__y(clazz,config.include[i],false);
}}}if(config.settings){for(var key in config.settings){qx.core.Setting.define(key,config.settings[key]);
}}if(config.variants){for(var key in config.variants){qx.core.Variant.define(key,config.variants[key].allowedValues,config.variants[key].defaultValue);
}}if(config.implement){for(var i=0,l=config.implement.length;i<l;i++){this.__x(clazz,config.implement[i]);
}}{};
if(config.defer){config.defer.self=clazz;
config.defer(clazz,clazz.prototype,{add:function(name,config){var properties={};
properties[name]=config;
qx.Class.__t(clazz,properties,true);
}});
}return clazz;
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},getByName:function(name){return this.$$registry[name];
},include:function(clazz,mixin){{};
qx.Class.__y(clazz,mixin,false);
},patch:function(clazz,mixin){{};
qx.Class.__y(clazz,mixin,true);
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
},genericToString:function(){return SSSS_4+this.classname+SSSS_5;
},$$registry:qx.Bootstrap.$$registry,__n:null,__o:null,__p:function(){},__q:function(){},__r:function(name,type,extend,statics,construct,destruct){var clazz;

if(!extend&&qx.core.Variant.isSet(SSSS_0,SSSS_15)){clazz=statics||{};
qx.Bootstrap.setDisplayNames(clazz,name);
}else{clazz={};

if(extend){if(!construct){construct=this.__z();
}clazz=this.__B(construct,name,type);
qx.Bootstrap.setDisplayName(construct,name,SSSS_7);
}if(statics){qx.Bootstrap.setDisplayNames(statics,name);
var key;

for(var i=0,a=qx.lang.Object.getKeys(statics),l=a.length;i<l;i++){key=a[i];
var staticValue=statics[key];

if(qx.core.Variant.isSet(SSSS_0,SSSS_1)){if(staticValue instanceof Function){staticValue=qx.core.Aspect.wrap(name+SSSS_2+key,staticValue,SSSS_3);
}clazz[key]=staticValue;
}else{clazz[key]=staticValue;
}}}}var basename=qx.Bootstrap.createNamespace(name,clazz,false);
clazz.name=clazz.classname=name;
clazz.basename=basename;
clazz.$$type=SSSS_14;

if(type){clazz.$$classtype=type;
}if(!clazz.hasOwnProperty(SSSS_6)){clazz.toString=this.genericToString;
}
if(extend){var superproto=extend.prototype;
var helper=this.__A();
helper.prototype=superproto;
var proto=new helper;
clazz.prototype=proto;
proto.name=proto.classname=name;
proto.basename=basename;
construct.base=clazz.superclass=extend;
construct.self=clazz.constructor=proto.constructor=clazz;
if(destruct){if(qx.core.Variant.isSet(SSSS_0,SSSS_1)){destruct=qx.core.Aspect.wrap(name,destruct,SSSS_11);
}clazz.$$destructor=destruct;
qx.Bootstrap.setDisplayName(destruct,name,SSSS_13);
}}this.$$registry[name]=clazz;
return clazz;
},__s:function(clazz,events,patch){var key,key;
{};

if(clazz.$$events){for(var key in events){clazz.$$events[key]=events[key];
}}else{clazz.$$events=events;
}},__t:function(clazz,properties,patch){var config;

if(patch===undefined){patch=false;
}var attach=!!clazz.$$propertiesAttached;

for(var name in properties){config=properties[name];
{};
config.name=name;
if(!config.refine){if(clazz.$$properties===undefined){clazz.$$properties={};
}clazz.$$properties[name]=config;
}if(config.init!==undefined){clazz.prototype[SSSS_9+name]=config.init;
}if(config.event!==undefined){var event={};
event[config.event]=SSSS_17;
this.__s(clazz,event,patch);
}if(config.inheritable){qx.core.Property.$$inheritable[name]=true;
}if(attach){qx.core.Property.attachMethods(clazz,name,config);
}}},__u:null,__v:function(clazz,members,patch,base,wrap){var proto=clazz.prototype;
var key,member;
qx.Bootstrap.setDisplayNames(members,clazz.classname+SSSS_10);

for(var i=0,a=qx.lang.Object.getKeys(members),l=a.length;i<l;i++){key=a[i];
member=members[key];
{};
if(base!==false&&member instanceof Function&&member.$$type==null){if(wrap==true){member=this.__w(member,proto[key]);
}else{if(proto[key]){member.base=proto[key];
}member.self=clazz;
}
if(qx.core.Variant.isSet(SSSS_0,SSSS_1)){member=qx.core.Aspect.wrap(clazz.classname+SSSS_2+key,member,SSSS_8);
}}proto[key]=member;
}},__w:function(member,base){if(base){return function(){var oldBase=member.base;
member.base=base;
var retval=member.apply(this,arguments);
member.base=oldBase;
return retval;
};
}else{return member;
}},__x:function(clazz,iface){{};
var list=qx.Interface.flatten([iface]);

if(clazz.$$implements){clazz.$$implements.push(iface);
clazz.$$flatImplements.push.apply(clazz.$$flatImplements,list);
}else{clazz.$$implements=[iface];
clazz.$$flatImplements=list;
}},__y:function(clazz,mixin,patch){{};

if(this.hasMixin(clazz,mixin)){return;
}var list=qx.Mixin.flatten([mixin]);
var entry;

for(var i=0,l=list.length;i<l;i++){entry=list[i];
if(entry.$$events){this.__s(clazz,entry.$$events,patch);
}if(entry.$$properties){this.__t(clazz,entry.$$properties,patch);
}if(entry.$$members){this.__v(clazz,entry.$$members,patch,patch,patch);
}}if(clazz.$$includes){clazz.$$includes.push(mixin);
clazz.$$flatIncludes.push.apply(clazz.$$flatIncludes,list);
}else{clazz.$$includes=[mixin];
clazz.$$flatIncludes=list;
}},__z:function(){function defaultConstructor(){arguments.callee.base.apply(this,arguments);
}return defaultConstructor;
},__A:function(){return function(){};
},__B:function(construct,name,type){var wrapper=function(){var clazz=arguments.callee.constructor;
{};
if(!clazz.$$propertiesAttached){qx.core.Property.attach(clazz);
}var retval=clazz.$$original.apply(this,arguments);
if(clazz.$$includes){var mixins=clazz.$$flatIncludes;

for(var i=0,l=mixins.length;i<l;i++){if(mixins[i].$$constructor){mixins[i].$$constructor.apply(this,arguments);
}}}if(this.classname===name.classname){this.$$initialized=true;
}return retval;
};

if(qx.core.Variant.isSet("qx.aspects","on")){var aspectWrapper=qx.core.Aspect.wrap(name,wrapper,"constructor");
wrapper.$$original=construct;
wrapper.constructor=aspectWrapper;
wrapper=aspectWrapper;
}if(type==="singleton"){wrapper.getInstance=this.getInstance;
}wrapper.$$original=construct;
construct.wrapper=wrapper;
return wrapper;
}},defer:function(statics){if(qx.core.Variant.isSet(SSSS_0,SSSS_1)){for(var classname in qx.Bootstrap.$$registry){var statics=qx.Bootstrap.$$registry[classname];

for(var key in statics){if(statics[key] instanceof Function){statics[key]=qx.core.Aspect.wrap(classname+SSSS_2+key,statics[key],SSSS_3);
}}}}}});
})();
(function(){var SSSS_0="]",SSSS_1="Theme",SSSS_2="[Theme ",SSSS_3="qx.Theme";
qx.Class.define(SSSS_3,{statics:{define:function(name,config){if(!config){var config={};
}config.include=this.__C(config.include);
config.patch=this.__C(config.patch);
{};
var theme={$$type:SSSS_1,name:name,title:config.title,toString:this.genericToString};
if(config.extend){theme.supertheme=config.extend;
}theme.basename=qx.Bootstrap.createNamespace(name,theme);
this.__F(theme,config);
this.__D(theme,config);
this.$$registry[name]=theme;
for(var i=0,a=config.include,l=a.length;i<l;i++){this.include(theme,a[i]);
}
for(var i=0,a=config.patch,l=a.length;i<l;i++){this.patch(theme,a[i]);
}},__C:function(objectOrArray){if(!objectOrArray){return [];
}
if(qx.lang.Type.isArray(objectOrArray)){return objectOrArray;
}else{return [objectOrArray];
}},__D:function(theme,config){var aliases=config.aliases||{};

if(config.extend&&config.extend.aliases){qx.lang.Object.mergeWith(aliases,config.extend.aliases,false);
}theme.aliases=aliases;
},getAll:function(){return this.$$registry;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},genericToString:function(){return SSSS_2+this.name+SSSS_0;
},__E:function(config){for(var i=0,keys=this.__G,l=keys.length;i<l;i++){if(config[keys[i]]){return keys[i];
}}},__F:function(theme,config){var type=this.__E(config);
if(config.extend&&!type){type=config.extend.type;
}theme.type=type||"other";
if(!type){return;
}var clazz=function(){};
if(config.extend){clazz.prototype=new config.extend.$$clazz;
}var target=clazz.prototype;
var source=config[type];
for(var id in source){target[id]=source[id];
if(target[id].base){{};
target[id].base=config.extend;
}}theme.$$clazz=clazz;
theme[type]=new clazz;
},$$registry:{},__G:["colors","borders","decorations","fonts","icons","widgets","appearances","meta"],__H:null,__I:null,__J:function(){},patch:function(theme,mixinTheme){var type=this.__E(mixinTheme);

if(type!==this.__E(theme)){throw new Error("The mixins '"+theme.name+"' are not compatible '"+mixinTheme.name+"'!");
}var source=mixinTheme[type];
var target=theme.$$clazz.prototype;

for(var key in source){target[key]=source[key];
}},include:function(theme,mixinTheme){var type=mixinTheme.type;

if(type!==theme.type){throw new Error("The mixins '"+theme.name+"' are not compatible '"+mixinTheme.name+"'!");
}var source=mixinTheme[type];
var target=theme.$$clazz.prototype;

for(var key in source){if(target[key]!==undefined){continue;
}target[key]=source[key];
}}}});
})();
(function(){var SSSS_0="#CCCCCC",SSSS_1="#F3F3F3",SSSS_2="#E4E4E4",SSSS_3="#1a1a1a",SSSS_4="#084FAB",SSSS_5="gray",SSSS_6="#fffefe",SSSS_7="white",SSSS_8="#4a4a4a",SSSS_9="#EEEEEE",SSSS_10="#80B4EF",SSSS_11="#C72B2B",SSSS_12="#ffffdd",SSSS_13="#334866",SSSS_14="#00204D",SSSS_15="#666666",SSSS_16="#CBC8CD",SSSS_17="#99C3FE",SSSS_18="#808080",SSSS_19="#F4F4F4",SSSS_20="#001533",SSSS_21="#909090",SSSS_22="#FCFCFC",SSSS_23="#314a6e",SSSS_24="#B6B6B6",SSSS_25="#0880EF",SSSS_26="#4d4d4d",SSSS_27="#DFDFDF",SSSS_28="#000000",SSSS_29="#FF9999",SSSS_30="#7B7A7E",SSSS_31="#26364D",SSSS_32="#990000",SSSS_33="#AFAFAF",SSSS_34="#404955",SSSS_35="#AAAAAA",SSSS_36="qx.theme.modern.Color";
qx.Theme.define(SSSS_36,{colors:{"background-application":SSSS_27,"background-pane":SSSS_1,"background-light":SSSS_22,"background-medium":SSSS_9,"background-splitpane":SSSS_33,"background-tip":SSSS_12,"background-tip-error":SSSS_11,"background-odd":SSSS_2,"text-light":SSSS_21,"text-gray":SSSS_8,"text-label":SSSS_3,"text-title":SSSS_23,"text-input":SSSS_28,"text-hovered":SSSS_20,"text-disabled":SSSS_30,"text-selected":SSSS_6,"text-active":SSSS_31,"text-inactive":SSSS_34,"text-placeholder":SSSS_16,"border-main":SSSS_26,"border-separator":SSSS_18,"border-input":SSSS_13,"border-disabled":SSSS_24,"border-pane":SSSS_14,"border-button":SSSS_15,"border-column":SSSS_0,"border-focused":SSSS_17,"invalid":SSSS_32,"border-focused-invalid":SSSS_29,"table-pane":SSSS_1,"table-focus-indicator":SSSS_25,"table-row-background-focused-selected":SSSS_4,"table-row-background-focused":SSSS_10,"table-row-background-selected":SSSS_4,"table-row-background-even":SSSS_1,"table-row-background-odd":SSSS_2,"table-row-selected":SSSS_6,"table-row":SSSS_3,"table-row-line":SSSS_0,"table-column-line":SSSS_0,"progressive-table-header":SSSS_35,"progressive-table-row-background-even":SSSS_19,"progressive-table-row-background-odd":SSSS_2,"progressive-progressbar-background":SSSS_5,"progressive-progressbar-indicator-done":SSSS_0,"progressive-progressbar-indicator-undone":SSSS_7,"progressive-progressbar-percent-background":SSSS_5,"progressive-progressbar-percent-text":SSSS_7}});
})();
(function(){var SSSS_0="gui4.theme.Color";
qx.Theme.define(SSSS_0,{extend:qx.theme.modern.Color,colors:{}});
})();
(function(){var SSSS_0=';',SSSS_1='computed=this.',SSSS_2='=value;',SSSS_3='this.',SSSS_4='if(this.',SSSS_5='!==undefined)',SSSS_6='delete this.',SSSS_7="set",SSSS_8="setThemed",SSSS_9='}',SSSS_10="init",SSSS_11="setRuntime",SSSS_12='else if(this.',SSSS_13='return this.',SSSS_14="string",SSSS_15="boolean",SSSS_16="resetThemed",SSSS_17='!==undefined){',SSSS_18='=true;',SSSS_19="resetRuntime",SSSS_20="reset",SSSS_21="refresh",SSSS_22='old=this.',SSSS_23='else ',SSSS_24='if(old===undefined)old=this.',SSSS_25='old=computed=this.',SSSS_26=' of an instance of ',SSSS_27=";",SSSS_28='if(old===computed)return value;',SSSS_29='if(old===undefined)old=null;',SSSS_30='(value);',SSSS_31=' is not (yet) ready!");',SSSS_32='===value)return value;',SSSS_33='return init;',SSSS_34='var init=this.',SSSS_35="Error in property ",SSSS_36='var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){',SSSS_37='.validate.call(this, value);',SSSS_38='else{',SSSS_39=" in method ",SSSS_40='=computed;',SSSS_41='(backup);',SSSS_42='if(computed===inherit){',SSSS_43="inherit",SSSS_44='if(value===undefined)prop.error(this,2,"',SSSS_45='var computed, old=this.',SSSS_46='else if(computed===undefined)',SSSS_47="': ",SSSS_48=" of class ",SSSS_49='===undefined)return;',SSSS_50="')){",SSSS_51='else this.',SSSS_52='value=this.',SSSS_53='","',SSSS_54='if(init==qx.core.Property.$$inherit)init=null;',SSSS_55='var inherit=prop.$$inherit;',SSSS_56='var computed, old;',SSSS_57='computed=undefined;delete this.',SSSS_58='",value);',SSSS_59='computed=value;',SSSS_60=';}',SSSS_61='){',SSSS_62='if(computed===undefined||computed===inherit){',SSSS_63='!==inherit){',SSSS_64='(computed, old, "',SSSS_65='return value;',SSSS_66='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',SSSS_67="if(reg.hasListener(this, '",SSSS_68=')a[i].',SSSS_69='.$$properties.',SSSS_70="var reg=qx.event.Registration;",SSSS_71='return null;',SSSS_72='");',SSSS_73='var pa=this.getLayoutParent();if(pa)computed=pa.',SSSS_74='!==undefined&&',SSSS_75="', qx.event.type.Data, [computed, old]",SSSS_76='var backup=computed;',SSSS_77='}else{',SSSS_78="object",SSSS_79='if(computed===undefined)computed=null;',SSSS_80='if(a[i].',SSSS_81='throw new Error("Property ',SSSS_82=")}",SSSS_83='var prop=qx.core.Property;',SSSS_84=" with incoming value '",SSSS_85='if(computed===undefined||computed==inherit)computed=null;',SSSS_86='if((computed===undefined||computed===inherit)&&',SSSS_87="reg.fireEvent(this, '",SSSS_88="qx.core.Property";
qx.Bootstrap.define(SSSS_88,{statics:{__K:{"Boolean":'qx.core.Assert.assertBoolean(value, msg) || true',"String":'qx.core.Assert.assertString(value, msg) || true',"Number":'qx.core.Assert.assertNumber(value, msg) || true',"Integer":'qx.core.Assert.assertInteger(value, msg) || true',"PositiveNumber":'qx.core.Assert.assertPositiveNumber(value, msg) || true',"PositiveInteger":'qx.core.Assert.assertPositiveInteger(value, msg) || true',"Error":'qx.core.Assert.assertInstance(value, Error, msg) || true',"RegExp":'qx.core.Assert.assertInstance(value, RegExp, msg) || true',"Object":'qx.core.Assert.assertObject(value, msg) || true',"Array":'qx.core.Assert.assertArray(value, msg) || true',"Map":'qx.core.Assert.assertMap(value, msg) || true',"Function":'qx.core.Assert.assertFunction(value, msg) || true',"Date":'qx.core.Assert.assertInstance(value, Date, msg) || true',"Node":'value !== null && value.nodeType !== undefined',"Element":'value !== null && value.nodeType === 1 && value.attributes',"Document":'value !== null && value.nodeType === 9 && value.documentElement',"Window":'value !== null && value.document',"Event":'value !== null && value.type !== undefined',"Class":'value !== null && value.$$type === "Class"',"Mixin":'value !== null && value.$$type === "Mixin"',"Interface":'value !== null && value.$$type === "Interface"',"Theme":'value !== null && value.$$type === "Theme"',"Color":'qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',"Decorator":'value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',"Font":'value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)'},__L:{"Object":true,"Array":true,"Map":true,"Function":true,"Date":true,"Node":true,"Element":true,"Document":true,"Window":true,"Event":true,"Class":true,"Mixin":true,"Interface":true,"Theme":true,"Font":true,"Decorator":true},$$inherit:SSSS_43,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:SSSS_14,dispose:SSSS_15,inheritable:SSSS_15,nullable:SSSS_15,themeable:SSSS_15,refine:SSSS_15,init:null,apply:SSSS_14,event:SSSS_14,check:null,transform:SSSS_14,deferredInit:SSSS_15,validate:null},$$allowedGroupKeys:{name:SSSS_14,group:SSSS_78,mode:SSSS_14,themeable:SSSS_15},$$inheritable:{},refresh:function(widget){var parent=widget.getLayoutParent();

if(parent){var clazz=widget.constructor;
var inherit=this.$$store.inherit;
var init=this.$$store.init;
var refresh=this.$$method.refresh;
var properties;
var value;
{};

while(clazz){properties=clazz.$$properties;

if(properties){for(var name in this.$$inheritable){if(properties[name]&&widget[refresh[name]]){value=parent[inherit[name]];

if(value===undefined){value=parent[init[name]];
}{};
widget[refresh[name]](value);
}}}clazz=clazz.superclass;
}}},attach:function(clazz){var properties=clazz.$$properties;

if(properties){for(var name in properties){this.attachMethods(clazz,name,properties[name]);
}}clazz.$$propertiesAttached=true;
},attachMethods:function(clazz,name,config){config.group?this.__M(clazz,config,name):this.__N(clazz,config,name);
},__M:function(clazz,config,name){var upname=qx.lang.String.firstUp(name);
var members=clazz.prototype;
var themeable=config.themeable===true;
{};
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
for(var i=0,a=config.group,l=a.length;i<l;i++){{};
setter.push("this.",this.$$method.set[a[i]],"(a[",i,"]);");
resetter.push("this.",this.$$method.reset[a[i]],"();");

if(themeable){{};
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
}},__N:function(clazz,config,name){var upname=qx.lang.String.firstUp(name);
var members=clazz.prototype;
{};
if(config.dispose===undefined&&typeof config.check==="string"){config.dispose=this.__L[config.check]||qx.Class.isDefined(config.check)||qx.Interface.isDefined(config.check);
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
}},__O:{0:'Could not change or apply init value after constructing phase!',1:'Requires exactly one argument!',2:'Undefined value is not allowed!',3:'Does not allow any arguments!',4:'Null value is not allowed!',5:'Is invalid!'},error:function(obj,id,property,variant,value){var classname=obj.constructor.classname;
var msg=SSSS_35+property+SSSS_48+classname+SSSS_39+this.$$method[variant][property]+SSSS_84+value+SSSS_47;
throw new Error(msg+(this.__O[id]||"Unknown reason: "+id));
},__P:function(instance,members,name,variant,code,args){var store=this.$$method[variant][name];
{members[store]=new Function("value",code.join(""));
};
if(qx.core.Variant.isSet("qx.aspects","on")){members[store]=qx.core.Aspect.wrap(instance.classname+"."+store,members[store],"property");
}qx.Bootstrap.setDisplayName(members[store],instance.classname+".prototype",store);
if(args===undefined){return instance[store]();
}else{return instance[store](args[0]);
}},executeOptimizedGetter:function(instance,clazz,name,variant){var config=clazz.$$properties[name];
var members=clazz.prototype;
var code=[];
var store=this.$$store;
code.push(SSSS_4,store.runtime[name],SSSS_5);
code.push(SSSS_13,store.runtime[name],SSSS_0);

if(config.inheritable){code.push(SSSS_12,store.inherit[name],SSSS_5);
code.push(SSSS_13,store.inherit[name],SSSS_0);
code.push(SSSS_23);
}code.push(SSSS_4,store.user[name],SSSS_5);
code.push(SSSS_13,store.user[name],SSSS_0);

if(config.themeable){code.push(SSSS_12,store.theme[name],SSSS_5);
code.push(SSSS_13,store.theme[name],SSSS_0);
}
if(config.deferredInit&&config.init===undefined){code.push(SSSS_12,store.init[name],SSSS_5);
code.push(SSSS_13,store.init[name],SSSS_0);
}code.push(SSSS_23);

if(config.init!==undefined){if(config.inheritable){code.push(SSSS_34,store.init[name],SSSS_0);

if(config.nullable){code.push(SSSS_54);
}else if(config.init!==undefined){code.push(SSSS_13,store.init[name],SSSS_0);
}else{code.push(SSSS_66,name,SSSS_26,clazz.classname,SSSS_31);
}code.push(SSSS_33);
}else{code.push(SSSS_13,store.init[name],SSSS_0);
}}else if(config.inheritable||config.nullable){code.push(SSSS_71);
}else{code.push(SSSS_81,name,SSSS_26,clazz.classname,SSSS_31);
}return this.__P(instance,members,name,variant,code);
},executeOptimizedSetter:function(instance,clazz,name,variant,args){var config=clazz.$$properties[name];
var members=clazz.prototype;
var code=[];
var incomingValue=variant===SSSS_7||variant===SSSS_8||variant===SSSS_11||(variant===SSSS_10&&config.init===undefined);
var resetValue=variant===SSSS_20||variant===SSSS_16||variant===SSSS_19;
var hasCallback=config.apply||config.event||config.inheritable;

if(variant===SSSS_11||variant===SSSS_19){var store=this.$$store.runtime[name];
}else if(variant===SSSS_8||variant===SSSS_16){var store=this.$$store.theme[name];
}else if(variant===SSSS_10){var store=this.$$store.init[name];
}else{var store=this.$$store.user[name];
}{if(!config.nullable||config.check||config.inheritable){code.push(SSSS_83);
}if(variant===SSSS_7){code.push(SSSS_44,name,SSSS_53,variant,SSSS_58);
}};
if(incomingValue){if(config.transform){code.push(SSSS_52,config.transform,SSSS_30);
}if(config.validate){if(typeof config.validate===SSSS_14){code.push(SSSS_3,config.validate,SSSS_30);
}else if(config.validate instanceof Function){code.push(clazz.classname,SSSS_69,name);
code.push(SSSS_37);
}}}if(hasCallback){if(incomingValue){code.push(SSSS_4,store,SSSS_32);
}else if(resetValue){code.push(SSSS_4,store,SSSS_49);
}}if(config.inheritable){code.push(SSSS_55);
}{};

if(!hasCallback){if(variant===SSSS_11){code.push(SSSS_3,this.$$store.runtime[name],SSSS_2);
}else if(variant===SSSS_19){code.push(SSSS_4,this.$$store.runtime[name],SSSS_5);
code.push(SSSS_6,this.$$store.runtime[name],SSSS_0);
}else if(variant===SSSS_7){code.push(SSSS_3,this.$$store.user[name],SSSS_2);
}else if(variant===SSSS_20){code.push(SSSS_4,this.$$store.user[name],SSSS_5);
code.push(SSSS_6,this.$$store.user[name],SSSS_0);
}else if(variant===SSSS_8){code.push(SSSS_3,this.$$store.theme[name],SSSS_2);
}else if(variant===SSSS_16){code.push(SSSS_4,this.$$store.theme[name],SSSS_5);
code.push(SSSS_6,this.$$store.theme[name],SSSS_0);
}else if(variant===SSSS_10&&incomingValue){code.push(SSSS_3,this.$$store.init[name],SSSS_2);
}}else{if(config.inheritable){code.push(SSSS_45,this.$$store.inherit[name],SSSS_0);
}else{code.push(SSSS_56);
}code.push(SSSS_4,this.$$store.runtime[name],SSSS_17);

if(variant===SSSS_11){code.push(SSSS_1,this.$$store.runtime[name],SSSS_2);
}else if(variant===SSSS_19){code.push(SSSS_6,this.$$store.runtime[name],SSSS_0);
code.push(SSSS_4,this.$$store.user[name],SSSS_5);
code.push(SSSS_1,this.$$store.user[name],SSSS_0);
code.push(SSSS_12,this.$$store.theme[name],SSSS_5);
code.push(SSSS_1,this.$$store.theme[name],SSSS_0);
code.push(SSSS_12,this.$$store.init[name],SSSS_17);
code.push(SSSS_1,this.$$store.init[name],SSSS_0);
code.push(SSSS_3,this.$$store.useinit[name],SSSS_18);
code.push(SSSS_9);
}else{code.push(SSSS_25,this.$$store.runtime[name],SSSS_0);
if(variant===SSSS_7){code.push(SSSS_3,this.$$store.user[name],SSSS_2);
}else if(variant===SSSS_20){code.push(SSSS_6,this.$$store.user[name],SSSS_0);
}else if(variant===SSSS_8){code.push(SSSS_3,this.$$store.theme[name],SSSS_2);
}else if(variant===SSSS_16){code.push(SSSS_6,this.$$store.theme[name],SSSS_0);
}else if(variant===SSSS_10&&incomingValue){code.push(SSSS_3,this.$$store.init[name],SSSS_2);
}}code.push(SSSS_9);
code.push(SSSS_12,this.$$store.user[name],SSSS_17);

if(variant===SSSS_7){if(!config.inheritable){code.push(SSSS_22,this.$$store.user[name],SSSS_0);
}code.push(SSSS_1,this.$$store.user[name],SSSS_2);
}else if(variant===SSSS_20){if(!config.inheritable){code.push(SSSS_22,this.$$store.user[name],SSSS_0);
}code.push(SSSS_6,this.$$store.user[name],SSSS_0);
code.push(SSSS_4,this.$$store.runtime[name],SSSS_5);
code.push(SSSS_1,this.$$store.runtime[name],SSSS_0);
code.push(SSSS_4,this.$$store.theme[name],SSSS_5);
code.push(SSSS_1,this.$$store.theme[name],SSSS_0);
code.push(SSSS_12,this.$$store.init[name],SSSS_17);
code.push(SSSS_1,this.$$store.init[name],SSSS_0);
code.push(SSSS_3,this.$$store.useinit[name],SSSS_18);
code.push(SSSS_9);
}else{if(variant===SSSS_11){code.push(SSSS_1,this.$$store.runtime[name],SSSS_2);
}else if(config.inheritable){code.push(SSSS_1,this.$$store.user[name],SSSS_0);
}else{code.push(SSSS_25,this.$$store.user[name],SSSS_0);
}if(variant===SSSS_8){code.push(SSSS_3,this.$$store.theme[name],SSSS_2);
}else if(variant===SSSS_16){code.push(SSSS_6,this.$$store.theme[name],SSSS_0);
}else if(variant===SSSS_10&&incomingValue){code.push(SSSS_3,this.$$store.init[name],SSSS_2);
}}code.push(SSSS_9);
if(config.themeable){code.push(SSSS_12,this.$$store.theme[name],SSSS_17);

if(!config.inheritable){code.push(SSSS_22,this.$$store.theme[name],SSSS_0);
}
if(variant===SSSS_11){code.push(SSSS_1,this.$$store.runtime[name],SSSS_2);
}else if(variant===SSSS_7){code.push(SSSS_1,this.$$store.user[name],SSSS_2);
}else if(variant===SSSS_8){code.push(SSSS_1,this.$$store.theme[name],SSSS_2);
}else if(variant===SSSS_16){code.push(SSSS_6,this.$$store.theme[name],SSSS_0);
code.push(SSSS_4,this.$$store.init[name],SSSS_17);
code.push(SSSS_1,this.$$store.init[name],SSSS_0);
code.push(SSSS_3,this.$$store.useinit[name],SSSS_18);
code.push(SSSS_9);
}else if(variant===SSSS_10){if(incomingValue){code.push(SSSS_3,this.$$store.init[name],SSSS_2);
}code.push(SSSS_1,this.$$store.theme[name],SSSS_0);
}else if(variant===SSSS_21){code.push(SSSS_1,this.$$store.theme[name],SSSS_0);
}code.push(SSSS_9);
}code.push(SSSS_12,this.$$store.useinit[name],SSSS_61);

if(!config.inheritable){code.push(SSSS_22,this.$$store.init[name],SSSS_0);
}
if(variant===SSSS_10){if(incomingValue){code.push(SSSS_1,this.$$store.init[name],SSSS_2);
}else{code.push(SSSS_1,this.$$store.init[name],SSSS_0);
}}else if(variant===SSSS_7||variant===SSSS_11||variant===SSSS_8||variant===SSSS_21){code.push(SSSS_6,this.$$store.useinit[name],SSSS_0);

if(variant===SSSS_11){code.push(SSSS_1,this.$$store.runtime[name],SSSS_2);
}else if(variant===SSSS_7){code.push(SSSS_1,this.$$store.user[name],SSSS_2);
}else if(variant===SSSS_8){code.push(SSSS_1,this.$$store.theme[name],SSSS_2);
}else if(variant===SSSS_21){code.push(SSSS_1,this.$$store.init[name],SSSS_0);
}}code.push(SSSS_9);
if(variant===SSSS_7||variant===SSSS_11||variant===SSSS_8||variant===SSSS_10){code.push(SSSS_38);

if(variant===SSSS_11){code.push(SSSS_1,this.$$store.runtime[name],SSSS_2);
}else if(variant===SSSS_7){code.push(SSSS_1,this.$$store.user[name],SSSS_2);
}else if(variant===SSSS_8){code.push(SSSS_1,this.$$store.theme[name],SSSS_2);
}else if(variant===SSSS_10){if(incomingValue){code.push(SSSS_1,this.$$store.init[name],SSSS_2);
}else{code.push(SSSS_1,this.$$store.init[name],SSSS_0);
}code.push(SSSS_3,this.$$store.useinit[name],SSSS_18);
}code.push(SSSS_9);
}}
if(config.inheritable){code.push(SSSS_62);

if(variant===SSSS_21){code.push(SSSS_59);
}else{code.push(SSSS_73,this.$$store.inherit[name],SSSS_0);
}code.push(SSSS_86);
code.push(SSSS_3,this.$$store.init[name],SSSS_74);
code.push(SSSS_3,this.$$store.init[name],SSSS_63);
code.push(SSSS_1,this.$$store.init[name],SSSS_0);
code.push(SSSS_3,this.$$store.useinit[name],SSSS_18);
code.push(SSSS_77);
code.push(SSSS_6,this.$$store.useinit[name],SSSS_60);
code.push(SSSS_9);
code.push(SSSS_28);
code.push(SSSS_42);
code.push(SSSS_57,this.$$store.inherit[name],SSSS_0);
code.push(SSSS_9);
code.push(SSSS_46);
code.push(SSSS_6,this.$$store.inherit[name],SSSS_0);
code.push(SSSS_51,this.$$store.inherit[name],SSSS_40);
code.push(SSSS_76);
if(config.init!==undefined&&variant!==SSSS_10){code.push(SSSS_24,this.$$store.init[name],SSSS_27);
}else{code.push(SSSS_29);
}code.push(SSSS_85);
}else if(hasCallback){if(variant!==SSSS_7&&variant!==SSSS_11&&variant!==SSSS_8){code.push(SSSS_79);
}code.push(SSSS_28);
if(config.init!==undefined&&variant!==SSSS_10){code.push(SSSS_24,this.$$store.init[name],SSSS_27);
}else{code.push(SSSS_29);
}}if(hasCallback){if(config.apply){code.push(SSSS_3,config.apply,SSSS_64,name,SSSS_72);
}if(config.event){code.push(SSSS_70,SSSS_67,config.event,SSSS_50,SSSS_87,config.event,SSSS_75,SSSS_82);
}if(config.inheritable&&members._getChildren){code.push(SSSS_36);
code.push(SSSS_80,this.$$method.refresh[name],SSSS_68,this.$$method.refresh[name],SSSS_41);
code.push(SSSS_9);
}}if(incomingValue){code.push(SSSS_65);
}return this.__P(instance,members,name,variant,code,args);
}}});
})();
(function(){var SSSS_0="$$hash",SSSS_1="qx.core.ObjectRegistry";
qx.Bootstrap.define(SSSS_1,{statics:{inShutDown:false,__Q:{},__R:0,__S:[],register:function(obj){var registry=this.__Q;

if(!registry){return;
}var hash=obj.$$hash;

if(hash==null){var cache=this.__S;

if(cache.length>0){hash=cache.pop();
}else{hash=(this.__R++).toString(36);
}obj.$$hash=hash;
}{};
registry[hash]=obj;
},unregister:function(obj){var hash=obj.$$hash;

if(hash==null){return;
}var registry=this.__Q;

if(registry&&registry[hash]){delete registry[hash];
this.__S.push(hash);
}try{delete obj.$$hash;
}catch(ex){if(obj.removeAttribute){obj.removeAttribute(SSSS_0);
}}},toHashCode:function(obj){{};
var hash=obj.$$hash;

if(hash!=null){return hash;
}var cache=this.__S;

if(cache.length>0){hash=cache.pop();
}else{hash=(this.__R++).toString(36);
}return obj.$$hash=hash;
},clearHashCode:function(obj){{};
var hash=obj.$$hash;

if(hash!=null){this.__S.push(hash);
try{delete obj.$$hash;
}catch(ex){if(obj.removeAttribute){obj.removeAttribute(SSSS_0);
}}}},fromHashCode:function(hash){return this.__Q[hash]||null;
},shutdown:function(){this.inShutDown=true;
var registry=this.__Q;
var hashes=[];

for(var hash in registry){hashes.push(hash);
}hashes.sort(function(a,b){return parseInt(b,36)-parseInt(a,36);
});
var obj,i=0,l=hashes.length;

while(true){try{for(;i<l;i++){hash=hashes[i];
obj=registry[hash];

if(obj&&obj.dispose){obj.dispose();
}}}catch(ex){qx.log.Logger.error(this,"Could not dispose object "+obj.toString()+": "+ex);

if(i!==l){i++;
continue;
}}break;
}qx.log.Logger.debug(this,"Disposed "+l+" objects");
delete this.__Q;
},getRegistry:function(){return this.__Q;
}}});
})();
(function(){var SSSS_0="qx.Mixin",SSSS_1=".prototype",SSSS_2="constructor",SSSS_3="[Mixin ",SSSS_4="]",SSSS_5="destruct",SSSS_6="Mixin";
qx.Bootstrap.define(SSSS_0,{statics:{define:function(name,config){if(config){if(config.include&&!(config.include instanceof Array)){config.include=[config.include];
}{};
var mixin=config.statics?config.statics:{};
qx.Bootstrap.setDisplayNames(mixin,name);

for(var key in mixin){if(mixin[key] instanceof Function){mixin[key].$$mixin=mixin;
}}if(config.construct){mixin.$$constructor=config.construct;
qx.Bootstrap.setDisplayName(config.construct,name,SSSS_2);
}
if(config.include){mixin.$$includes=config.include;
}
if(config.properties){mixin.$$properties=config.properties;
}
if(config.members){mixin.$$members=config.members;
qx.Bootstrap.setDisplayNames(config.members,name+SSSS_1);
}
for(var key in mixin.$$members){if(mixin.$$members[key] instanceof Function){mixin.$$members[key].$$mixin=mixin;
}}
if(config.events){mixin.$$events=config.events;
}
if(config.destruct){mixin.$$destructor=config.destruct;
qx.Bootstrap.setDisplayName(config.destruct,name,SSSS_5);
}}else{var mixin={};
}mixin.$$type=SSSS_6;
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
},genericToString:function(){return SSSS_3+this.name+SSSS_4;
},$$registry:{},__T:null,__U:function(){}}});
})();
(function(){var SSSS_0="qx.data.MBinding";
qx.Mixin.define(SSSS_0,{members:{bind:function(sourcePropertyChain,targetObject,targetProperty,options){return qx.data.SingleValueBinding.bind(this,sourcePropertyChain,targetObject,targetProperty,options);
},removeBinding:function(id){qx.data.SingleValueBinding.removeBindingFromObject(this,id);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
})();
(function(){var SSSS_0="qx.client",SSSS_1="on",SSSS_2="mousedown",SSSS_3="qx.bom.Event",SSSS_4="mouseover",SSSS_5="HTMLEvents";
qx.Bootstrap.define(SSSS_3,{statics:{addNativeListener:qx.core.Variant.select(SSSS_0,{"mshtml":function(target,type,listener){target.attachEvent(SSSS_1+type,listener);
},"default":function(target,type,listener){target.addEventListener(type,listener,false);
}}),removeNativeListener:qx.core.Variant.select(SSSS_0,{"mshtml":function(target,type,listener){target.detachEvent(SSSS_1+type,listener);
},"default":function(target,type,listener){target.removeEventListener(type,listener,false);
}}),getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:qx.core.Variant.select(SSSS_0,{"mshtml":function(e){if(e.type===SSSS_4){return e.fromEvent;
}else{return e.toElement;
}},"gecko":function(e){try{e.relatedTarget&&e.relatedTarget.nodeType;
}catch(e){return null;
}return e.relatedTarget;
},"default":function(e){return e.relatedTarget;
}}),preventDefault:qx.core.Variant.select(SSSS_0,{"gecko":function(e){if(qx.bom.client.Engine.VERSION>=1.9&&e.type==SSSS_2&&e.button==2){return;
}e.preventDefault();
if(qx.bom.client.Engine.VERSION<1.9){try{e.keyCode=0;
}catch(ex){}}},"mshtml":function(e){try{e.keyCode=0;
}catch(ex){}e.returnValue=false;
},"default":function(e){e.preventDefault();
}}),stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}e.cancelBubble=true;
},fire:function(target,type){if(document.createEventObject){var evt=document.createEventObject();
return target.fireEvent(SSSS_1+type,evt);
}else{var evt=document.createEvent(SSSS_5);
evt.initEvent(type,true,true);
return !target.dispatchEvent(evt);
}}}});
})();
(function(){var SSSS_0="|bubble",SSSS_1="|capture",SSSS_2="|",SSSS_3="_",SSSS_4="unload",SSSS_5="UNKNOWN_",SSSS_6="DOM_",SSSS_7="__Y",SSSS_8="c",SSSS_9="__ba",SSSS_10="WIN_",SSSS_11="capture",SSSS_12="qx.event.Manager",SSSS_13="QX_";
qx.Bootstrap.define(SSSS_12,{construct:function(win,registration){this.__V=win;
this.__W=registration;
if(win.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(win,SSSS_4,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(win,SSSS_4,arguments.callee);
self.dispose();
}));
}this.__X={};
this.__Y={};
this.__ba={};
this.__bb={};
},statics:{__bc:0,getNextUniqueId:function(){return (this.__bc++).toString(36);
}},members:{__W:null,__X:null,__ba:null,__bd:null,__Y:null,__bb:null,__V:null,getWindow:function(){return this.__V;
},getHandler:function(clazz){var handler=this.__Y[clazz.classname];

if(handler){return handler;
}return this.__Y[clazz.classname]=new clazz(this);
},getDispatcher:function(clazz){var dispatcher=this.__ba[clazz.classname];

if(dispatcher){return dispatcher;
}return this.__ba[clazz.classname]=new clazz(this,this.__W);
},getListeners:function(target,type,capture){var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__X[targetKey];

if(!targetMap){return null;
}var entryKey=type+(capture?SSSS_1:SSSS_0);
var entryList=targetMap[entryKey];
return entryList?entryList.concat():null;
},serializeListeners:function(target){var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__X[targetKey];
var result=[];

if(targetMap){var indexOf,type,capture,entryList,entry;

for(var entryKey in targetMap){indexOf=entryKey.indexOf(SSSS_2);
type=entryKey.substring(0,indexOf);
capture=entryKey.charAt(indexOf+1)==SSSS_8;
entryList=targetMap[entryKey];

for(var i=0,l=entryList.length;i<l;i++){entry=entryList[i];
result.push({self:entry.context,handler:entry.handler,type:type,capture:capture});
}}}return result;
},toggleAttachedEvents:function(target,enable){var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__X[targetKey];

if(targetMap){var indexOf,type,capture,entryList;

for(var entryKey in targetMap){indexOf=entryKey.indexOf(SSSS_2);
type=entryKey.substring(0,indexOf);
capture=entryKey.charCodeAt(indexOf+1)===99;
entryList=targetMap[entryKey];

if(enable){this.__be(target,type,capture);
}else{this.__bf(target,type,capture);
}}}},hasListener:function(target,type,capture){{};
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__X[targetKey];

if(!targetMap){return false;
}var entryKey=type+(capture?SSSS_1:SSSS_0);
var entryList=targetMap[entryKey];
return entryList&&entryList.length>0;
},importListeners:function(target,list){{};
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__X[targetKey]={};
var clazz=qx.event.Manager;

for(var listKey in list){var item=list[listKey];
var entryKey=item.type+(item.capture?SSSS_1:SSSS_0);
var entryList=targetMap[entryKey];

if(!entryList){entryList=targetMap[entryKey]=[];
this.__be(target,item.type,item.capture);
}entryList.push({handler:item.listener,context:item.self,unique:item.unique||(clazz.__bc++).toString(36)});
}},addListener:function(target,type,listener,self,capture){var msg;
{};
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__X[targetKey];

if(!targetMap){targetMap=this.__X[targetKey]={};
}var entryKey=type+(capture?SSSS_1:SSSS_0);
var entryList=targetMap[entryKey];

if(!entryList){entryList=targetMap[entryKey]=[];
}if(entryList.length===0){this.__be(target,type,capture);
}var unique=(qx.event.Manager.__bc++).toString(36);
var entry={handler:listener,context:self,unique:unique};
entryList.push(entry);
return entryKey+SSSS_2+unique;
},findHandler:function(target,type){var isDomNode=false,isWindow=false,isObject=false;
var key;

if(target.nodeType===1){isDomNode=true;
key=SSSS_6+target.tagName.toLowerCase()+SSSS_3+type;
}else if(target==this.__V){isWindow=true;
key=SSSS_10+type;
}else if(target.classname){isObject=true;
key=SSSS_13+target.classname+SSSS_3+type;
}else{key=SSSS_5+target+SSSS_3+type;
}var cache=this.__bb;

if(cache[key]){return cache[key];
}var classes=this.__W.getHandlers();
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
},__be:function(target,type,capture){var handler=this.findHandler(target,type);

if(handler){handler.registerEvent(target,type,capture);
return;
}{};
},removeListener:function(target,type,listener,self,capture){var msg;
{};
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__X[targetKey];

if(!targetMap){return false;
}var entryKey=type+(capture?SSSS_1:SSSS_0);
var entryList=targetMap[entryKey];

if(!entryList){return false;
}var entry;

for(var i=0,l=entryList.length;i<l;i++){entry=entryList[i];

if(entry.handler===listener&&entry.context===self){qx.lang.Array.removeAt(entryList,i);

if(entryList.length==0){this.__bf(target,type,capture);
}return true;
}}return false;
},removeListenerById:function(target,id){var msg;
{};
var split=id.split(SSSS_2);
var type=split[0];
var capture=split[1].charCodeAt(0)==99;
var unique=split[2];
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__X[targetKey];

if(!targetMap){return false;
}var entryKey=type+(capture?SSSS_1:SSSS_0);
var entryList=targetMap[entryKey];

if(!entryList){return false;
}var entry;

for(var i=0,l=entryList.length;i<l;i++){entry=entryList[i];

if(entry.unique===unique){qx.lang.Array.removeAt(entryList,i);

if(entryList.length==0){this.__bf(target,type,capture);
}return true;
}}return false;
},removeAllListeners:function(target){var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__X[targetKey];

if(!targetMap){return false;
}var split,type,capture;

for(var entryKey in targetMap){if(targetMap[entryKey].length>0){split=entryKey.split(SSSS_2);
type=split[0];
capture=split[1]===SSSS_11;
this.__bf(target,type,capture);
}}delete this.__X[targetKey];
return true;
},__bf:function(target,type,capture){var handler=this.findHandler(target,type);

if(handler){handler.unregisterEvent(target,type,capture);
return;
}{};
},dispatchEvent:function(target,event){var msg;
{};
var type=event.getType();

if(!event.getBubbles()&&!this.hasListener(target,type)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(target);
}var classes=this.__W.getDispatchers();
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
},dispose:function(){this.__W.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,SSSS_7);
qx.util.DisposeUtil.disposeMap(this,SSSS_9);
this.__X=this.__V=this.__bd=null;
this.__W=this.__bb=null;
}}});
})();
(function(){var SSSS_0="qx.dom.Node",SSSS_1="qx.client",SSSS_2="";
qx.Bootstrap.define(SSSS_0,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(node){return node.nodeType===
this.DOCUMENT?node:
node.ownerDocument||node.document;
},getWindow:qx.core.Variant.select(SSSS_1,{"mshtml":function(node){if(node.nodeType==null){return node;
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
}return a.join(SSSS_2);
case 2:return node.nodeValue;
break;
case 3:return node.nodeValue;
break;
}return null;
}}});
})();
(function(){var SSSS_0="mshtml",SSSS_1="qx.client",SSSS_2="[object Array]",SSSS_3="qx.lang.Array",SSSS_4="qx",SSSS_5="number",SSSS_6="string";
qx.Bootstrap.define(SSSS_3,{statics:{toArray:function(object,offset){return this.cast(object,Array,offset);
},cast:function(object,constructor,offset){if(object.constructor===constructor){return object;
}
if(qx.Class.hasInterface(object,qx.data.IListData)){var object=object.toArray();
}var ret=new constructor;
if(qx.core.Variant.isSet(SSSS_1,SSSS_0)){if(object.item){for(var i=offset||0,l=object.length;i<l;i++){ret.push(object[i]);
}return ret;
}}if(Object.prototype.toString.call(object)===SSSS_2&&offset==null){ret.push.apply(ret,object);
}else{ret.push.apply(ret,Array.prototype.slice.call(object,offset||0));
}return ret;
},fromArguments:function(args,offset){return Array.prototype.slice.call(args,offset||0);
},fromCollection:function(coll){if(qx.core.Variant.isSet(SSSS_1,SSSS_0)){if(coll.item){var arr=[];

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
},clone:function(arr){return arr.concat();
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
},append:function(arr1,arr2){{};
Array.prototype.push.apply(arr1,arr2);
return arr1;
},exclude:function(arr1,arr2){{};

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
},max:function(arr){{};
var i,len=arr.length,result=arr[0];

for(i=1;i<len;i++){if(arr[i]>result){result=arr[i];
}}return result===undefined?null:result;
},min:function(arr){{};
var i,len=arr.length,result=arr[0];

for(i=1;i<len;i++){if(arr[i]<result){result=arr[i];
}}return result===undefined?null:result;
},unique:function(arr){var ret=[],doneStrings={},doneNumbers={},doneObjects={};
var value,count=0;
var key=SSSS_4+qx.lang.Date.now();
var hasNull=false,hasFalse=false,hasTrue=false;
for(var i=0,len=arr.length;i<len;i++){value=arr[i];
if(value===null){if(!hasNull){hasNull=true;
ret.push(value);
}}else if(value===undefined){}else if(value===false){if(!hasFalse){hasFalse=true;
ret.push(value);
}}else if(value===true){if(!hasTrue){hasTrue=true;
ret.push(value);
}}else if(typeof value===SSSS_6){if(!doneStrings[value]){doneStrings[value]=1;
ret.push(value);
}}else if(typeof value===SSSS_5){if(!doneNumbers[value]){doneNumbers[value]=1;
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
})();
(function(){var SSSS_0="()",SSSS_1=".",SSSS_2=".prototype.",SSSS_3='anonymous()',SSSS_4="qx.lang.Function",SSSS_5=".constructor()";
qx.Bootstrap.define(SSSS_4,{statics:{getCaller:function(args){return args.caller?args.caller.callee:args.callee.caller;
},getName:function(fcn){if(fcn.displayName){return fcn.displayName;
}
if(fcn.$$original||fcn.wrapper||fcn.classname){return fcn.classname+SSSS_5;
}
if(fcn.$$mixin){for(var key in fcn.$$mixin.$$members){if(fcn.$$mixin.$$members[key]==fcn){return fcn.$$mixin.name+SSSS_2+key+SSSS_0;
}}for(var key in fcn.$$mixin){if(fcn.$$mixin[key]==fcn){return fcn.$$mixin.name+SSSS_1+key+SSSS_0;
}}}
if(fcn.self){var clazz=fcn.self.constructor;

if(clazz){for(var key in clazz.prototype){if(clazz.prototype[key]==fcn){return clazz.classname+SSSS_2+key+SSSS_0;
}}for(var key in clazz){if(clazz[key]==fcn){return clazz.classname+SSSS_1+key+SSSS_0;
}}}}var fcnReResult=fcn.toString().match(/function\s*(\w*)\s*\(.*/);

if(fcnReResult&&fcnReResult.length>=1&&fcnReResult[1]){return fcnReResult[1]+SSSS_0;
}return SSSS_3;
},globalEval:function(data){if(window.execScript){return window.execScript(data);
}else{return eval.call(window,data);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(func,options){{};
if(!options){return func;
}if(!(options.self||options.args||options.delay!=null||options.periodical!=null||options.attempt)){return func;
}return function(event){{};
var args=qx.lang.Array.fromArguments(arguments);
if(options.args){args=options.args.concat(args);
}
if(options.delay||options.periodical){var returns=qx.event.GlobalError.observeMethod(function(){return func.apply(options.self||this,args);
});

if(options.delay){return window.setTimeout(returns,options.delay);
}
if(options.periodical){return window.setInterval(returns,options.periodical);
}}else if(options.attempt){var ret=false;

try{ret=func.apply(options.self||this,args);
}catch(ex){}return ret;
}else{return func.apply(options.self||this,args);
}};
},bind:function(func,self,varargs){return this.create(func,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(func,varargs){return this.create(func,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(func,self,varargs){if(arguments.length<3){return function(event){return func.call(self||this,event||window.event);
};
}else{var optargs=qx.lang.Array.fromArguments(arguments,2);
return function(event){var args=[event||window.event];
args.push.apply(args,optargs);
func.apply(self||this,args);
};
}},attempt:function(func,self,varargs){return this.create(func,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(func,delay,self,varargs){return this.create(func,{delay:delay,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(func,interval,self,varargs){return this.create(func,{periodical:interval,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
})();
(function(){var SSSS_0="qx.event.Registration";
qx.Bootstrap.define(SSSS_0,{statics:{__bg:{},getManager:function(target){if(target==null){{};
target=window;
}else if(target.nodeType){target=qx.dom.Node.getWindow(target);
}else if(!qx.dom.Node.isWindow(target)){target=window;
}var hash=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var manager=this.__bg[hash];

if(!manager){manager=new qx.event.Manager(target,this);
this.__bg[hash]=manager;
}return manager;
},removeManager:function(mgr){var id=qx.core.ObjectRegistry.toHashCode(mgr.getWindow());
delete this.__bg[id];
},addListener:function(target,type,listener,self,capture){return this.getManager(target).addListener(target,type,listener,self,capture);
},removeListener:function(target,type,listener,self,capture){return this.getManager(target).removeListener(target,type,listener,self,capture);
},removeListenerById:function(target,id){return this.getManager(target).removeListenerById(target,id);
},removeAllListeners:function(target){return this.getManager(target).removeAllListeners(target);
},hasListener:function(target,type,capture){return this.getManager(target).hasListener(target,type,capture);
},serializeListeners:function(target){return this.getManager(target).serializeListeners(target);
},createEvent:function(type,clazz,args){{};
if(clazz==null){clazz=qx.event.type.Event;
}var obj=qx.event.Pool.getInstance().getObject(clazz);

if(!obj){return;
}args?obj.init.apply(obj,args):obj.init();
if(type){obj.setType(type);
}return obj;
},dispatchEvent:function(target,event){return this.getManager(target).dispatchEvent(target,event);
},fireEvent:function(target,type,clazz,args){var msg;
{};
var evt=this.createEvent(type,clazz||null,args);
return this.getManager(target).dispatchEvent(target,evt);
},fireNonBubblingEvent:function(target,type,clazz,args){{};
var mgr=this.getManager(target);

if(!mgr.hasListener(target,type,false)){return true;
}var evt=this.createEvent(type,clazz||null,args);
return mgr.dispatchEvent(target,evt);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__bh:[],addHandler:function(handler){{};
this.__bh.push(handler);
this.__bh.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__bh;
},__bi:[],addDispatcher:function(dispatcher,priority){{};
this.__bi.push(dispatcher);
this.__bi.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__bi;
}}});
})();
(function(){var SSSS_0="qx.log.appender.RingBuffer";
qx.Bootstrap.define(SSSS_0,{construct:function(maxMessages){this.__bj=[];
this.setMaxMessages(maxMessages||50);
},members:{__bk:0,__bj:null,__bl:50,setMaxMessages:function(maxMessages){this.__bl=maxMessages;
this.clearHistory();
},getMaxMessages:function(){return this.__bl;
},process:function(entry){var maxMessages=this.getMaxMessages();

if(this.__bj.length<maxMessages){this.__bj.push(entry);
}else{this.__bj[this.__bk++]=entry;

if(this.__bk>=maxMessages){this.__bk=0;
}}},getAllLogEvents:function(){return this.retrieveLogEvents(this.getMaxMessages());
},retrieveLogEvents:function(count){if(count>this.__bj.length){count=this.__bj.length;
}
if(this.__bj.length==this.getMaxMessages()){var indexOfYoungestElementInHistory=this.__bk-1;
}else{indexOfYoungestElementInHistory=this.__bj.length-1;
}var startIndex=indexOfYoungestElementInHistory-count+1;

if(startIndex<0){startIndex+=this.__bj.length;
}var result;

if(startIndex<=indexOfYoungestElementInHistory){result=this.__bj.slice(startIndex,indexOfYoungestElementInHistory+1);
}else{result=this.__bj.slice(startIndex,this.__bj.length).concat(this.__bj.slice(0,indexOfYoungestElementInHistory+1));
}return result;
},clearHistory:function(){this.__bj=[];
this.__bk=0;
}}});
})();
(function(){var SSSS_0="node",SSSS_1="error",SSSS_2="...(+",SSSS_3="array",SSSS_4=")",SSSS_5="info",SSSS_6="instance",SSSS_7="string",SSSS_8="null",SSSS_9="class",SSSS_10="number",SSSS_11="stringify",SSSS_12="]",SSSS_13="unknown",SSSS_14="function",SSSS_15="boolean",SSSS_16="debug",SSSS_17="map",SSSS_18="undefined",SSSS_19="qx.log.Logger",SSSS_20=")}",SSSS_21="#",SSSS_22="warn",SSSS_23="document",SSSS_24="{...(",SSSS_25="[",SSSS_26="text[",SSSS_27="[...(",SSSS_28="\n",SSSS_29=")]",SSSS_30="object";
qx.Bootstrap.define(SSSS_19,{statics:{__bm:SSSS_16,setLevel:function(value){this.__bm=value;
},getLevel:function(){return this.__bm;
},setTreshold:function(value){this.__bp.setMaxMessages(value);
},getTreshold:function(){return this.__bp.getMaxMessages();
},__bn:{},__bo:0,register:function(appender){if(appender.$$id){return;
}var id=this.__bo++;
this.__bn[id]=appender;
appender.$$id=id;
var entries=this.__bp.getAllLogEvents();

for(var i=0,l=entries.length;i<l;i++){appender.process(entries[i]);
}},unregister:function(appender){var id=appender.$$id;

if(id==null){return;
}delete this.__bn[id];
delete appender.$$id;
},debug:function(object,message){this.__br(SSSS_16,arguments);
},info:function(object,message){this.__br(SSSS_5,arguments);
},warn:function(object,message){this.__br(SSSS_22,arguments);
},error:function(object,message){this.__br(SSSS_1,arguments);
},trace:function(object){this.__br(SSSS_5,[object,qx.dev.StackTrace.getStackTrace().join(SSSS_28)]);
},deprecatedMethodWarning:function(fcn,msg){var functionName;
{};
},deprecatedClassWarning:function(clazz,msg){var className;
{};
},deprecatedEventWarning:function(clazz,event,msg){var className;
{};
},deprecatedMixinWarning:function(clazz,msg){var mixinName;
{};
},clear:function(){this.__bp.clearHistory();
},__bp:new qx.log.appender.RingBuffer(50),__bq:{debug:0,info:1,warn:2,error:3},__br:function(level,args){var levels=this.__bq;

if(levels[level]<levels[this.__bm]){return;
}var object=args.length<2?null:args[0];
var start=object?1:0;
var items=[];

for(var i=start,l=args.length;i<l;i++){items.push(this.__bt(args[i],true));
}var time=new Date;
var entry={time:time,offset:time-qx.Bootstrap.LOADSTART,level:level,items:items,win:window};
if(object){if(object instanceof qx.core.Object){entry.object=object.$$hash;
}else if(object.$$type){entry.clazz=object;
}}this.__bp.process(entry);
var appender=this.__bn;

for(var id in appender){appender[id].process(entry);
}},__bs:function(value){if(value===undefined){return SSSS_18;
}else if(value===null){return SSSS_8;
}
if(value.$$type){return SSSS_9;
}var type=typeof value;

if(type===SSSS_14||type==SSSS_7||type===SSSS_10||type===SSSS_15){return type;
}else if(type===SSSS_30){if(value.nodeType){return SSSS_0;
}else if(value.classname){return SSSS_6;
}else if(value instanceof Array){return SSSS_3;
}else if(value instanceof Error){return SSSS_1;
}else{return SSSS_17;
}}
if(value.toString){return SSSS_11;
}return SSSS_13;
},__bt:function(value,deep){var type=this.__bs(value);
var text=SSSS_13;
var trace=[];

switch(type){case SSSS_8:case SSSS_18:text=type;
break;
case SSSS_7:case SSSS_10:case SSSS_15:text=value;
break;
case SSSS_0:if(value.nodeType===9){text=SSSS_23;
}else if(value.nodeType===3){text=SSSS_26+value.nodeValue+SSSS_12;
}else if(value.nodeType===1){text=value.nodeName.toLowerCase();

if(value.id){text+=SSSS_21+value.id;
}}else{text=SSSS_0;
}break;
case SSSS_14:text=qx.lang.Function.getName(value)||type;
break;
case SSSS_6:text=value.basename+SSSS_25+value.$$hash+SSSS_12;
break;
case SSSS_9:case SSSS_11:text=value.toString();
break;
case SSSS_1:trace=qx.dev.StackTrace.getStackTraceFromError(value);
text=value.toString();
break;
case SSSS_3:if(deep){text=[];

for(var i=0,l=value.length;i<l;i++){if(text.length>20){text.push(SSSS_2+(l-i)+SSSS_4);
break;
}text.push(this.__bt(value[i],false));
}}else{text=SSSS_27+value.length+SSSS_29;
}break;
case SSSS_17:if(deep){var temp;
var sorted=[];

for(var key in value){sorted.push(key);
}sorted.sort();
text=[];

for(var i=0,l=sorted.length;i<l;i++){if(text.length>20){text.push(SSSS_2+(l-i)+SSSS_4);
break;
}key=sorted[i];
temp=this.__bt(value[key],false);
temp.key=key;
text.push(temp);
}}else{var number=0;

for(var key in value){number++;
}text=SSSS_24+number+SSSS_20;
}break;
}return {type:type,text:text,trace:trace};
}}});
})();
(function(){var SSSS_0="set",SSSS_1="get",SSSS_2="reset",SSSS_3="qx.core.Object",SSSS_4="]",SSSS_5="[",SSSS_6="$$user_",SSSS_7="Don't use '_disposeFields' - instead assign directly to 'null'",SSSS_8="Object";
qx.Class.define(SSSS_3,{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:SSSS_8},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+SSSS_5+this.$$hash+SSSS_4;
},base:function(args,varags){{};

if(arguments.length===1){return args.callee.base.call(this);
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

if(qx.lang.Type.isString(data)){if(!this[setter[data]]){if(this[SSSS_0+qx.lang.String.firstUp(data)]!=undefined){this[SSSS_0+qx.lang.String.firstUp(data)](value);
return;
}{};
}return this[setter[data]](value);
}else{for(var prop in data){if(!this[setter[prop]]){if(this[SSSS_0+qx.lang.String.firstUp(prop)]!=undefined){this[SSSS_0+qx.lang.String.firstUp(prop)](data[prop]);
continue;
}{};
}this[setter[prop]](data[prop]);
}return this;
}},get:function(prop){var getter=qx.core.Property.$$method.get;

if(!this[getter[prop]]){if(this[SSSS_1+qx.lang.String.firstUp(prop)]!=undefined){return this[SSSS_1+qx.lang.String.firstUp(prop)]();
}{};
}return this[getter[prop]]();
},reset:function(prop){var resetter=qx.core.Property.$$method.reset;

if(!this[resetter[prop]]){if(this[SSSS_2+qx.lang.String.firstUp(prop)]!=undefined){this[SSSS_2+qx.lang.String.firstUp(prop)]();
return;
}{};
}this[resetter[prop]]();
},__bu:qx.event.Registration,addListener:function(type,listener,self,capture){if(!this.$$disposed){return this.__bu.addListener(this,type,listener,self,capture);
}return null;
},addListenerOnce:function(type,listener,self,capture){var callback=function(e){listener.call(self||this,e);
this.removeListener(type,callback,this,capture);
};
return this.addListener(type,callback,this,capture);
},removeListener:function(type,listener,self,capture){if(!this.$$disposed){return this.__bu.removeListener(this,type,listener,self,capture);
}return false;
},removeListenerById:function(id){if(!this.$$disposed){return this.__bu.removeListenerById(this,id);
}return false;
},hasListener:function(type,capture){return this.__bu.hasListener(this,type,capture);
},dispatchEvent:function(evt){if(!this.$$disposed){return this.__bu.dispatchEvent(this,evt);
}return true;
},fireEvent:function(type,clazz,args){if(!this.$$disposed){return this.__bu.fireEvent(this,type,clazz,args);
}return true;
},fireNonBubblingEvent:function(type,clazz,args){if(!this.$$disposed){return this.__bu.fireNonBubblingEvent(this,type,clazz,args);
}return true;
},fireDataEvent:function(type,data,oldData,cancelable){if(!this.$$disposed){if(oldData===undefined){oldData=null;
}return this.__bu.fireNonBubblingEvent(this,type,qx.event.type.Data,[data,oldData,!!cancelable]);
}return true;
},__bv:null,setUserData:function(key,value){if(!this.__bv){this.__bv={};
}this.__bv[key]=value;
},getUserData:function(key){if(!this.__bv){return null;
}var data=this.__bv[key];
return data===undefined?null:data;
},__bw:qx.log.Logger,debug:function(msg){this.__bw.debug(this,msg);
},info:function(msg){this.__bw.info(this,msg);
},warn:function(msg){this.__bw.warn(this,msg);
},error:function(msg){this.__bw.error(this,msg);
},trace:function(){this.__bw.trace(this);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){var key,value;
if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
{};
var clazz=this.constructor;
var mixins;

while(clazz.superclass){if(clazz.$$destructor){clazz.$$destructor.call(this);
}if(clazz.$$includes){mixins=clazz.$$flatIncludes;

for(var i=0,l=mixins.length;i<l;i++){if(mixins[i].$$destructor){mixins[i].$$destructor.call(this);
}}}clazz=clazz.superclass;
}var properties=qx.Class.getProperties(this.constructor);

for(var i=0,l=properties.length;i<l;i++){delete this[SSSS_6+properties[i]];
}{};
},_disposeFields:function(varargs){qx.log.Logger.deprecatedMethodWarning(arguments.callee,SSSS_7);
qx.util.DisposeUtil.disposeFields(this,arguments);
},_disposeObjects:function(varargs){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeArray:function(field){qx.util.DisposeUtil.disposeArray(this,field);
},_disposeMap:function(field){qx.util.DisposeUtil.disposeMap(this,field);
}},settings:{"qx.disposerDebugLevel":0},defer:function(statics){{};
},destruct:function(){qx.event.Registration.removeAllListeners(this);
qx.core.ObjectRegistry.unregister(this);
this.__bv=null;
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
})();
(function(){var SSSS_0="",SSSS_1="g",SSSS_2="0",SSSS_3='\\$1',SSSS_4="%",SSSS_5='-',SSSS_6="qx.lang.String",SSSS_7=' ',SSSS_8='\n',SSSS_9="undefined";
qx.Bootstrap.define(SSSS_6,{statics:{camelCase:function(str){return str.replace(/\-([a-z])/g,function(match,chr){return chr.toUpperCase();
});
},hyphenate:function(str){return str.replace(/[A-Z]/g,function(match){return (SSSS_5+match.charAt(0).toLowerCase());
});
},capitalize:function(str){return str.replace(/\b[a-z]/g,function(match){return match.toUpperCase();
});
},clean:function(str){return this.trim(str.replace(/\s+/g,SSSS_7));
},trimLeft:function(str){return str.replace(/^\s+/,SSSS_0);
},trimRight:function(str){return str.replace(/\s+$/,SSSS_0);
},trim:function(str){return str.replace(/^\s+|\s+$/g,SSSS_0);
},startsWith:function(fullstr,substr){return fullstr.indexOf(substr)===0;
},endsWith:function(fullstr,substr){return fullstr.substring(fullstr.length-substr.length,fullstr.length)===substr;
},pad:function(str,length,ch){if(typeof ch===SSSS_9){ch=SSSS_2;
}var temp=SSSS_0;

for(var i=str.length;i<length;i++){temp+=ch;
}return temp+str;
},firstUp:function(str){return str.charAt(0).toUpperCase()+str.substr(1);
},firstLow:function(str){return str.charAt(0).toLowerCase()+str.substr(1);
},contains:function(str,substring){return str.indexOf(substring)!=-1;
},format:function(pattern,args){var str=pattern;

for(var i=0;i<args.length;i++){str=str.replace(new RegExp(SSSS_4+(i+1),SSSS_1),args[i]);
}return str;
},escapeRegexpChars:function(str){return str.replace(/([.*+?^${}()|[\]\/\\])/g,SSSS_3);
},toArray:function(str){return str.split(/\B|\b/g);
},stripTags:function(str){return str.replace(/<\/?[^>]+>/gi,SSSS_0);
},stripScripts:function(str,exec){var scripts=SSSS_0;
var text=str.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){scripts+=arguments[1]+SSSS_8;
return SSSS_0;
});

if(exec===true){qx.lang.Function.globalEval(scripts);
}return text;
}}});
})();
(function(){var SSSS_0="function",SSSS_1="Boolean",SSSS_2="qx.Interface",SSSS_3="]",SSSS_4="toggle",SSSS_5="Interface",SSSS_6="is",SSSS_7="[Interface ";
qx.Bootstrap.define(SSSS_2,{statics:{define:function(name,config){if(config){if(config.extend&&!(config.extend instanceof Array)){config.extend=[config.extend];
}{};
var iface=config.statics?config.statics:{};
if(config.extend){iface.$$extends=config.extend;
}
if(config.properties){iface.$$properties=config.properties;
}
if(config.members){iface.$$members=config.members;
}
if(config.events){iface.$$events=config.events;
}}else{var iface={};
}iface.$$type=SSSS_5;
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
},__bx:function(object,clazz,iface,wrap){var members=iface.$$members;

if(members){for(var key in members){if(qx.lang.Type.isFunction(members[key])){var isPropertyMethod=this.__by(clazz,key);
var hasMemberFunction=isPropertyMethod||qx.lang.Type.isFunction(object[key]);

if(!hasMemberFunction){throw new Error('Implementation of method "'+key+'" is missing in class "'+clazz.classname+'" required by interface "'+iface.name+'"');
}var shouldWrapFunction=wrap===true&&!isPropertyMethod&&!qx.Class.hasInterface(clazz,iface);

if(shouldWrapFunction){object[key]=this.__bB(iface,object[key],key,members[key]);
}}else{if(typeof object[key]===undefined){if(typeof object[key]!==SSSS_0){throw new Error('Implementation of member "'+key+'" is missing in class "'+clazz.classname+'" required by interface "'+iface.name+'"');
}}}}}},__by:function(clazz,methodName){var match=methodName.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!match){return false;
}var propertyName=qx.lang.String.firstLow(match[2]);
var isPropertyMethod=qx.Class.hasProperty(clazz,propertyName);

if(!isPropertyMethod){return false;
}var isBoolean=match[0]==SSSS_6||match[0]==SSSS_4;

if(isBoolean){return qx.Class.getPropertyDefinition(clazz,propertyName).check==SSSS_1;
}return true;
},__bz:function(clazz,iface){if(iface.$$properties){for(var key in iface.$$properties){if(!qx.Class.hasProperty(clazz,key)){throw new Error('The property "'+key+'" is not supported by Class "'+clazz.classname+'"!');
}}}},__bA:function(clazz,iface){if(iface.$$events){for(var key in iface.$$events){if(!qx.Class.supportsEvent(clazz,key)){throw new Error('The event "'+key+'" is not supported by Class "'+clazz.classname+'"!');
}}}},assertObject:function(object,iface){var clazz=object.constructor;
this.__bx(object,clazz,iface,false);
this.__bz(clazz,iface);
this.__bA(clazz,iface);
var extend=iface.$$extends;

if(extend){for(var i=0,l=extend.length;i<l;i++){this.assertObject(object,extend[i]);
}}},assert:function(clazz,iface,wrap){this.__bx(clazz.prototype,clazz,iface,wrap);
this.__bz(clazz,iface);
this.__bA(clazz,iface);
var extend=iface.$$extends;

if(extend){for(var i=0,l=extend.length;i<l;i++){this.assert(clazz,extend[i],wrap);
}}},genericToString:function(){return SSSS_7+this.name+SSSS_3;
},$$registry:{},__bB:function(){},__bC:null,__bD:function(){}}});
})();
(function(){var SSSS_0="qx.ui.decoration.IDecorator";
qx.Interface.define(SSSS_0,{members:{getMarkup:function(){},resize:function(element,width,height){},tint:function(element,bgcolor){},getInsets:function(){}}});
})();
(function(){var SSSS_0="Number",SSSS_1="_applyInsets",SSSS_2="abstract",SSSS_3="insetRight",SSSS_4="insetTop",SSSS_5="insetBottom",SSSS_6="qx.ui.decoration.Abstract",SSSS_7="shorthand",SSSS_8="insetLeft";
qx.Class.define(SSSS_6,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:SSSS_2,properties:{insetLeft:{check:SSSS_0,nullable:true,apply:SSSS_1},insetRight:{check:SSSS_0,nullable:true,apply:SSSS_1},insetBottom:{check:SSSS_0,nullable:true,apply:SSSS_1},insetTop:{check:SSSS_0,nullable:true,apply:SSSS_1},insets:{group:[SSSS_4,SSSS_3,SSSS_5,SSSS_8],mode:SSSS_7}},members:{__bE:null,_getDefaultInsets:function(){throw new Error("Abstract method called.");
},_isInitialized:function(){throw new Error("Abstract method called.");
},_resetInsets:function(){this.__bE=null;
},getInsets:function(){if(this.__bE){return this.__bE;
}var defaults=this._getDefaultInsets();
return this.__bE={left:this.getInsetLeft()==null?defaults.left:this.getInsetLeft(),right:this.getInsetRight()==null?defaults.right:this.getInsetRight(),bottom:this.getInsetBottom()==null?defaults.bottom:this.getInsetBottom(),top:this.getInsetTop()==null?defaults.top:this.getInsetTop()};
},_applyInsets:function(){{};
this.__bE=null;
}},destruct:function(){this.__bE=null;
}});
})();
(function(){var SSSS_0="_applyBackground",SSSS_1="repeat",SSSS_2="mshtml",SSSS_3="backgroundPositionX",SSSS_4="",SSSS_5="backgroundPositionY",SSSS_6="no-repeat",SSSS_7="scale",SSSS_8=" ",SSSS_9="repeat-x",SSSS_10="qx.client",SSSS_11="repeat-y",SSSS_12="hidden",SSSS_13="qx.ui.decoration.MBackgroundImage",SSSS_14="String",SSSS_15='"></div>',SSSS_16='<div style="';
qx.Mixin.define(SSSS_13,{properties:{backgroundImage:{check:SSSS_14,nullable:true,apply:SSSS_0},backgroundRepeat:{check:[SSSS_1,SSSS_9,SSSS_11,SSSS_6,SSSS_7],init:SSSS_1,apply:SSSS_0},backgroundPositionX:{nullable:true,apply:SSSS_0},backgroundPositionY:{nullable:true,apply:SSSS_0},backgroundPosition:{group:[SSSS_5,SSSS_3]}},members:{_generateBackgroundMarkup:function(styles){{};
var markup=SSSS_4;
var image=this.getBackgroundImage();
var repeat=this.getBackgroundRepeat();
var top=this.getBackgroundPositionY();

if(top==null){top=0;
}var left=this.getBackgroundPositionX();

if(left==null){left=0;
}styles.backgroundPosition=left+SSSS_8+top;
if(image){var resolved=qx.util.AliasManager.getInstance().resolve(image);
markup=qx.bom.element.Decoration.create(resolved,repeat,styles);
}else{if(styles){if(qx.core.Variant.isSet(SSSS_10,SSSS_2)){if(qx.bom.client.Engine.VERSION<7||qx.bom.client.Feature.QUIRKS_MODE){styles.overflow=SSSS_12;
}}markup=SSSS_16+qx.bom.element.Style.compile(styles)+SSSS_15;
}}return markup;
},_applyBackground:function(){{};
}}});
})();
(function(){var SSSS_0="_applyStyle",SSSS_1="Color",SSSS_2="px",SSSS_3="solid",SSSS_4="dotted",SSSS_5="double",SSSS_6="dashed",SSSS_7="",SSSS_8="_applyWidth",SSSS_9="qx.ui.decoration.Uniform",SSSS_10="px ",SSSS_11=" ",SSSS_12="scale",SSSS_13="PositiveInteger",SSSS_14="absolute";
qx.Class.define(SSSS_9,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(width,style,color){arguments.callee.base.call(this);
if(width!=null){this.setWidth(width);
}
if(style!=null){this.setStyle(style);
}
if(color!=null){this.setColor(color);
}},properties:{width:{check:SSSS_13,init:0,apply:SSSS_8},style:{nullable:true,check:[SSSS_3,SSSS_4,SSSS_6,SSSS_5],init:SSSS_3,apply:SSSS_0},color:{nullable:true,check:SSSS_1,apply:SSSS_0},backgroundColor:{check:SSSS_1,nullable:true,apply:SSSS_0}},members:{__bF:null,_getDefaultInsets:function(){var width=this.getWidth();
return {top:width,right:width,bottom:width,left:width};
},_isInitialized:function(){return !!this.__bF;
},getMarkup:function(){if(this.__bF){return this.__bF;
}var styles={position:SSSS_14,top:0,left:0};
var width=this.getWidth();
{};
var Color=qx.theme.manager.Color.getInstance();
styles.border=width+SSSS_10+this.getStyle()+SSSS_11+Color.resolve(this.getColor());
var html=this._generateBackgroundMarkup(styles);
return this.__bF=html;
},resize:function(element,width,height){var scaledImage=this.getBackgroundImage()&&this.getBackgroundRepeat()==SSSS_12;

if(scaledImage||qx.bom.client.Feature.CONTENT_BOX){var inset=this.getWidth()*2;
width-=inset;
height-=inset;
if(width<0){width=0;
}
if(height<0){height=0;
}}element.style.width=width+SSSS_2;
element.style.height=height+SSSS_2;
},tint:function(element,bgcolor){var Color=qx.theme.manager.Color.getInstance();

if(bgcolor==null){bgcolor=this.getBackgroundColor();
}element.style.backgroundColor=Color.resolve(bgcolor)||SSSS_7;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this.__bF=null;
}});
})();
(function(){var SSSS_0="px",SSSS_1="qx.ui.decoration.Background",SSSS_2="",SSSS_3="_applyStyle",SSSS_4="Color",SSSS_5="absolute";
qx.Class.define(SSSS_1,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(backgroundColor){arguments.callee.base.call(this);

if(backgroundColor!=null){this.setBackgroundColor(backgroundColor);
}},properties:{backgroundColor:{check:SSSS_4,nullable:true,apply:SSSS_3}},members:{__bG:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__bG;
},getMarkup:function(){if(this.__bG){return this.__bG;
}var styles={position:SSSS_5,top:0,left:0};
var html=this._generateBackgroundMarkup(styles);
return this.__bG=html;
},resize:function(element,width,height){element.style.width=width+SSSS_0;
element.style.height=height+SSSS_0;
},tint:function(element,bgcolor){var Color=qx.theme.manager.Color.getInstance();

if(bgcolor==null){bgcolor=this.getBackgroundColor();
}element.style.backgroundColor=Color.resolve(bgcolor)||SSSS_2;
},_applyStyle:function(){{};
}},destruct:function(){this.__bG=null;
}});
})();
(function(){var SSSS_0="px",SSSS_1="0px",SSSS_2="-1px",SSSS_3="no-repeat",SSSS_4="scale-x",SSSS_5="scale-y",SSSS_6="-tr",SSSS_7="-l",SSSS_8='</div>',SSSS_9="scale",SSSS_10="qx.client",SSSS_11="-br",SSSS_12="-t",SSSS_13="-tl",SSSS_14="-r",SSSS_15='<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">',SSSS_16="_applyBaseImage",SSSS_17="-b",SSSS_18="String",SSSS_19="",SSSS_20="-bl",SSSS_21="-c",SSSS_22="mshtml",SSSS_23="qx.ui.decoration.Grid";
qx.Class.define(SSSS_23,{extend:qx.ui.decoration.Abstract,construct:function(baseImage,insets){arguments.callee.base.call(this);
if(baseImage!=null){this.setBaseImage(baseImage);
}
if(insets!=null){this.setInsets(insets);
}},properties:{baseImage:{check:SSSS_18,nullable:true,apply:SSSS_16}},members:{__bH:null,__bI:null,__bJ:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__bH;
},getMarkup:function(){if(this.__bH){return this.__bH;
}var Decoration=qx.bom.element.Decoration;
var images=this.__bI;
var edges=this.__bJ;
var html=[];
html.push(SSSS_15);
html.push(Decoration.create(images.tl,SSSS_3,{top:0,left:0}));
html.push(Decoration.create(images.t,SSSS_4,{top:0,left:edges.left+SSSS_0}));
html.push(Decoration.create(images.tr,SSSS_3,{top:0,right:0}));
html.push(Decoration.create(images.bl,SSSS_3,{bottom:0,left:0}));
html.push(Decoration.create(images.b,SSSS_4,{bottom:0,left:edges.left+SSSS_0}));
html.push(Decoration.create(images.br,SSSS_3,{bottom:0,right:0}));
html.push(Decoration.create(images.l,SSSS_5,{top:edges.top+SSSS_0,left:0}));
html.push(Decoration.create(images.c,SSSS_9,{top:edges.top+SSSS_0,left:edges.left+SSSS_0}));
html.push(Decoration.create(images.r,SSSS_5,{top:edges.top+SSSS_0,right:0}));
html.push(SSSS_8);
return this.__bH=html.join(SSSS_19);
},resize:function(element,width,height){var edges=this.__bJ;
var innerWidth=width-edges.left-edges.right;
var innerHeight=height-edges.top-edges.bottom;
if(innerWidth<0){innerWidth=0;
}
if(innerHeight<0){innerHeight=0;
}element.style.width=width+SSSS_0;
element.style.height=height+SSSS_0;
element.childNodes[1].style.width=innerWidth+SSSS_0;
element.childNodes[4].style.width=innerWidth+SSSS_0;
element.childNodes[7].style.width=innerWidth+SSSS_0;
element.childNodes[6].style.height=innerHeight+SSSS_0;
element.childNodes[7].style.height=innerHeight+SSSS_0;
element.childNodes[8].style.height=innerHeight+SSSS_0;

if(qx.core.Variant.isSet(SSSS_10,SSSS_22)){if(qx.bom.client.Engine.VERSION<7||(qx.bom.client.Feature.QUIRKS_MODE&&qx.bom.client.Engine.VERSION<8)){if(width%2==1){element.childNodes[2].style.marginRight=SSSS_2;
element.childNodes[5].style.marginRight=SSSS_2;
element.childNodes[8].style.marginRight=SSSS_2;
}else{element.childNodes[2].style.marginRight=SSSS_1;
element.childNodes[5].style.marginRight=SSSS_1;
element.childNodes[8].style.marginRight=SSSS_1;
}
if(height%2==1){element.childNodes[3].style.marginBottom=SSSS_2;
element.childNodes[4].style.marginBottom=SSSS_2;
element.childNodes[5].style.marginBottom=SSSS_2;
}else{element.childNodes[3].style.marginBottom=SSSS_1;
element.childNodes[4].style.marginBottom=SSSS_1;
element.childNodes[5].style.marginBottom=SSSS_1;
}}}},tint:function(element,bgcolor){},_applyBaseImage:function(value,old){{};

if(value){var base=this._resolveImageUrl(value);
var split=/(.*)(\.[a-z]+)$/.exec(base);
var prefix=split[1];
var ext=split[2];
var images=this.__bI={tl:prefix+SSSS_13+ext,t:prefix+SSSS_12+ext,tr:prefix+SSSS_6+ext,bl:prefix+SSSS_20+ext,b:prefix+SSSS_17+ext,br:prefix+SSSS_11+ext,l:prefix+SSSS_7+ext,c:prefix+SSSS_21+ext,r:prefix+SSSS_14+ext};
this.__bJ=this._computeEdgeSizes(images);
}},_resolveImageUrl:function(image){return qx.util.AliasManager.getInstance().resolve(image);
},_computeEdgeSizes:function(images){var ResourceManager=qx.util.ResourceManager.getInstance();
return {top:ResourceManager.getImageHeight(images.t),bottom:ResourceManager.getImageHeight(images.b),left:ResourceManager.getImageWidth(images.l),right:ResourceManager.getImageWidth(images.r)};
}},destruct:function(){this.__bH=this.__bI=this.__bJ=null;
}});
})();
(function(){var SSSS_0="_applyStyle",SSSS_1='"></div>',SSSS_2="Color",SSSS_3="1px",SSSS_4='<div style="',SSSS_5='border:',SSSS_6="1px solid ",SSSS_7="",SSSS_8=";",SSSS_9="px",SSSS_10='</div>',SSSS_11="qx.ui.decoration.Beveled",SSSS_12='<div style="position:absolute;top:1px;left:1px;',SSSS_13='border-bottom:',SSSS_14='border-right:',SSSS_15='border-left:',SSSS_16='border-top:',SSSS_17="Number",SSSS_18='<div style="position:absolute;top:1px;left:0px;',SSSS_19='position:absolute;top:0px;left:1px;',SSSS_20='<div style="overflow:hidden;font-size:0;line-height:0;">',SSSS_21="absolute";
qx.Class.define(SSSS_11,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(outerColor,innerColor,innerOpacity){arguments.callee.base.call(this);
if(outerColor!=null){this.setOuterColor(outerColor);
}
if(innerColor!=null){this.setInnerColor(innerColor);
}
if(innerOpacity!=null){this.setInnerOpacity(innerOpacity);
}},properties:{innerColor:{check:SSSS_2,nullable:true,apply:SSSS_0},innerOpacity:{check:SSSS_17,init:1,apply:SSSS_0},outerColor:{check:SSSS_2,nullable:true,apply:SSSS_0},backgroundColor:{check:SSSS_2,nullable:true,apply:SSSS_0}},members:{__bK:null,_getDefaultInsets:function(){return {top:2,right:2,bottom:2,left:2};
},_isInitialized:function(){return !!this.__bK;
},_applyStyle:function(){{};
},getMarkup:function(){if(this.__bK){return this.__bK;
}var Color=qx.theme.manager.Color.getInstance();
var html=[];
var outerStyle=SSSS_6+Color.resolve(this.getOuterColor())+SSSS_8;
var innerStyle=SSSS_6+Color.resolve(this.getInnerColor())+SSSS_8;
html.push(SSSS_20);
html.push(SSSS_4);
html.push(SSSS_5,outerStyle);
html.push(qx.bom.element.Opacity.compile(0.35));
html.push(SSSS_1);
html.push(SSSS_18);
html.push(SSSS_15,outerStyle);
html.push(SSSS_14,outerStyle);
html.push(SSSS_1);
html.push(SSSS_4);
html.push(SSSS_19);
html.push(SSSS_16,outerStyle);
html.push(SSSS_13,outerStyle);
html.push(SSSS_1);
var backgroundStyle={position:SSSS_21,top:SSSS_3,left:SSSS_3};
html.push(this._generateBackgroundMarkup(backgroundStyle));
html.push(SSSS_12);
html.push(SSSS_5,innerStyle);
html.push(qx.bom.element.Opacity.compile(this.getInnerOpacity()));
html.push(SSSS_1);
html.push(SSSS_10);
return this.__bK=html.join(SSSS_7);
},resize:function(element,width,height){if(width<4){width=4;
}
if(height<4){height=4;
}if(qx.bom.client.Feature.CONTENT_BOX){var outerWidth=width-2;
var outerHeight=height-2;
var frameWidth=outerWidth;
var frameHeight=outerHeight;
var innerWidth=width-4;
var innerHeight=height-4;
}else{var outerWidth=width;
var outerHeight=height;
var frameWidth=width-2;
var frameHeight=height-2;
var innerWidth=frameWidth;
var innerHeight=frameHeight;
}var pixel=SSSS_9;
var backgroundFrame=element.childNodes[0].style;
backgroundFrame.width=outerWidth+pixel;
backgroundFrame.height=outerHeight+pixel;
var horizontalFrame=element.childNodes[1].style;
horizontalFrame.width=outerWidth+pixel;
horizontalFrame.height=frameHeight+pixel;
var verticalFrame=element.childNodes[2].style;
verticalFrame.width=frameWidth+pixel;
verticalFrame.height=outerHeight+pixel;
var innerBackground=element.childNodes[3].style;
innerBackground.width=frameWidth+pixel;
innerBackground.height=frameHeight+pixel;
var innerOverlay=element.childNodes[4].style;
innerOverlay.width=innerWidth+pixel;
innerOverlay.height=innerHeight+pixel;
},tint:function(element,bgcolor){var Color=qx.theme.manager.Color.getInstance();

if(bgcolor==null){bgcolor=this.getBackgroundColor();
}element.childNodes[3].style.backgroundColor=Color.resolve(bgcolor)||SSSS_7;
}},destruct:function(){this.__bK=null;
}});
})();
(function(){var SSSS_0="_applyStyle",SSSS_1="solid",SSSS_2="Color",SSSS_3="double",SSSS_4="px ",SSSS_5="dotted",SSSS_6="_applyWidth",SSSS_7="dashed",SSSS_8="Number",SSSS_9=" ",SSSS_10="shorthand",SSSS_11="px",SSSS_12="widthTop",SSSS_13="styleRight",SSSS_14="styleLeft",SSSS_15="widthLeft",SSSS_16="widthBottom",SSSS_17="styleTop",SSSS_18="colorBottom",SSSS_19="styleBottom",SSSS_20="widthRight",SSSS_21="colorLeft",SSSS_22="colorRight",SSSS_23="colorTop",SSSS_24="scale",SSSS_25="border-top",SSSS_26="border-left",SSSS_27="border-right",SSSS_28="qx.ui.decoration.Single",SSSS_29="",SSSS_30="border-bottom",SSSS_31="absolute";
qx.Class.define(SSSS_28,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(width,style,color){arguments.callee.base.call(this);
if(width!=null){this.setWidth(width);
}
if(style!=null){this.setStyle(style);
}
if(color!=null){this.setColor(color);
}},properties:{widthTop:{check:SSSS_8,init:0,apply:SSSS_6},widthRight:{check:SSSS_8,init:0,apply:SSSS_6},widthBottom:{check:SSSS_8,init:0,apply:SSSS_6},widthLeft:{check:SSSS_8,init:0,apply:SSSS_6},styleTop:{nullable:true,check:[SSSS_1,SSSS_5,SSSS_7,SSSS_3],init:SSSS_1,apply:SSSS_0},styleRight:{nullable:true,check:[SSSS_1,SSSS_5,SSSS_7,SSSS_3],init:SSSS_1,apply:SSSS_0},styleBottom:{nullable:true,check:[SSSS_1,SSSS_5,SSSS_7,SSSS_3],init:SSSS_1,apply:SSSS_0},styleLeft:{nullable:true,check:[SSSS_1,SSSS_5,SSSS_7,SSSS_3],init:SSSS_1,apply:SSSS_0},colorTop:{nullable:true,check:SSSS_2,apply:SSSS_0},colorRight:{nullable:true,check:SSSS_2,apply:SSSS_0},colorBottom:{nullable:true,check:SSSS_2,apply:SSSS_0},colorLeft:{nullable:true,check:SSSS_2,apply:SSSS_0},backgroundColor:{check:SSSS_2,nullable:true,apply:SSSS_0},left:{group:[SSSS_15,SSSS_14,SSSS_21]},right:{group:[SSSS_20,SSSS_13,SSSS_22]},top:{group:[SSSS_12,SSSS_17,SSSS_23]},bottom:{group:[SSSS_16,SSSS_19,SSSS_18]},width:{group:[SSSS_12,SSSS_20,SSSS_16,SSSS_15],mode:SSSS_10},style:{group:[SSSS_17,SSSS_13,SSSS_19,SSSS_14],mode:SSSS_10},color:{group:[SSSS_23,SSSS_22,SSSS_18,SSSS_21],mode:SSSS_10}},members:{__bL:null,_getDefaultInsets:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};
},_isInitialized:function(){return !!this.__bL;
},getMarkup:function(element){if(this.__bL){return this.__bL;
}var Color=qx.theme.manager.Color.getInstance();
var styles={};
var width=this.getWidthTop();

if(width>0){styles[SSSS_25]=width+SSSS_4+this.getStyleTop()+SSSS_9+Color.resolve(this.getColorTop());
}var width=this.getWidthRight();

if(width>0){styles[SSSS_27]=width+SSSS_4+this.getStyleRight()+SSSS_9+Color.resolve(this.getColorRight());
}var width=this.getWidthBottom();

if(width>0){styles[SSSS_30]=width+SSSS_4+this.getStyleBottom()+SSSS_9+Color.resolve(this.getColorBottom());
}var width=this.getWidthLeft();

if(width>0){styles[SSSS_26]=width+SSSS_4+this.getStyleLeft()+SSSS_9+Color.resolve(this.getColorLeft());
}{};
styles.position=SSSS_31;
styles.top=0;
styles.left=0;
var html=this._generateBackgroundMarkup(styles);
return this.__bL=html;
},resize:function(element,width,height){var scaledImage=this.getBackgroundImage()&&this.getBackgroundRepeat()==SSSS_24;

if(scaledImage||qx.bom.client.Feature.CONTENT_BOX){var insets=this.getInsets();
width-=insets.left+insets.right;
height-=insets.top+insets.bottom;
if(width<0){width=0;
}
if(height<0){height=0;
}}element.style.width=width+SSSS_11;
element.style.height=height+SSSS_11;
},tint:function(element,bgcolor){var Color=qx.theme.manager.Color.getInstance();

if(bgcolor==null){bgcolor=this.getBackgroundColor();
}element.style.backgroundColor=Color.resolve(bgcolor)||SSSS_29;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this.__bL=null;
}});
})();
(function(){var SSSS_0="solid",SSSS_1="scale",SSSS_2="border-main",SSSS_3="white",SSSS_4="repeat-x",SSSS_5="border-separator",SSSS_6="background-light",SSSS_7="invalid",SSSS_8="border-focused-invalid",SSSS_9="border-disabled",SSSS_10="decoration/table/header-cell.png",SSSS_11="decoration/form/input.png",SSSS_12="#f8f8f8",SSSS_13="decoration/scrollbar/scrollbar-button-bg-horizontal.png",SSSS_14="#b6b6b6",SSSS_15="background-pane",SSSS_16="repeat-y",SSSS_17="decoration/form/input-focused.png",SSSS_18="border-input",SSSS_19="decoration/scrollbar/scrollbar-button-bg-vertical.png",SSSS_20="decoration/tabview/tab-button-top-active.png",SSSS_21="decoration/form/button-c.png",SSSS_22="decoration/scrollbar/scrollbar-bg-vertical.png",SSSS_23="decoration/form/button.png",SSSS_24="decoration/form/button-checked.png",SSSS_25="decoration/tabview/tab-button-left-inactive.png",SSSS_26="decoration/groupbox/groupbox.png",SSSS_27="#FAFAFA",SSSS_28="decoration/pane/pane.png",SSSS_29="decoration/menu/background.png",SSSS_30="decoration/toolbar/toolbar-part.gif",SSSS_31="decoration/tabview/tab-button-top-inactive.png",SSSS_32="decoration/menu/bar-background.png",SSSS_33="center",SSSS_34="decoration/tabview/tab-button-bottom-active.png",SSSS_35="decoration/form/button-hovered.png",SSSS_36="decoration/form/tooltip-error-arrow.png",SSSS_37="decoration/window/captionbar-inactive.png",SSSS_38="qx/decoration/Modern",SSSS_39="decoration/window/statusbar.png",SSSS_40="border-focused",SSSS_41="decoration/selection.png",SSSS_42="table-focus-indicator",SSSS_43="#F2F2F2",SSSS_44="decoration/form/button-checked-c.png",SSSS_45="decoration/scrollbar/scrollbar-bg-horizontal.png",SSSS_46="qx.theme.modern.Decoration",SSSS_47="#f4f4f4",SSSS_48="decoration/shadow/shadow-small.png",SSSS_49="decoration/app-header.png",SSSS_50="decoration/tabview/tabview-pane.png",SSSS_51="decoration/form/tooltip-error.png",SSSS_52="decoration/form/button-focused.png",SSSS_53="decoration/tabview/tab-button-bottom-inactive.png",SSSS_54="decoration/form/button-disabled.png",SSSS_55="decoration/tabview/tab-button-right-active.png",SSSS_56="decoration/form/button-pressed.png",SSSS_57="no-repeat",SSSS_58="decoration/window/captionbar-active.png",SSSS_59="decoration/tabview/tab-button-left-active.png",SSSS_60="background-splitpane",SSSS_61="decoration/form/button-checked-focused.png",SSSS_62="#C5C5C5",SSSS_63="decoration/toolbar/toolbar-gradient.png",SSSS_64="decoration/tabview/tab-button-right-inactive.png",SSSS_65="#b8b8b8",SSSS_66="decoration/shadow/shadow.png";
qx.Theme.define(SSSS_46,{aliases:{decoration:SSSS_38},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:SSSS_2}},"selected":{decorator:qx.ui.decoration.Background,style:{backgroundImage:SSSS_41,backgroundRepeat:SSSS_1}},"pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_28,insets:[0,2,3,0]}},"group":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_26}},"border-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:SSSS_7,innerColor:SSSS_3,innerOpacity:0.5,backgroundImage:SSSS_11,backgroundRepeat:SSSS_4,backgroundColor:SSSS_6}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:SSSS_5}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:SSSS_5}},"tooltip-error":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_51,insets:[2,5,5,2]}},"tooltip-error-arrow":{decorator:qx.ui.decoration.Background,style:{backgroundImage:SSSS_36,backgroundPositionY:SSSS_33,backgroundRepeat:SSSS_57,insets:[0,0,0,10]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_66,insets:[4,8,8,4]}},"shadow-popup":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_48,insets:[0,3,3,0]}},"scrollbar-horizontal":{decorator:qx.ui.decoration.Background,style:{backgroundImage:SSSS_45,backgroundRepeat:SSSS_4}},"scrollbar-vertical":{decorator:qx.ui.decoration.Background,style:{backgroundImage:SSSS_22,backgroundRepeat:SSSS_16}},"scrollbar-slider-horizontal":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:SSSS_13,backgroundRepeat:SSSS_1,outerColor:SSSS_2,innerColor:SSSS_3,innerOpacity:0.5}},"scrollbar-slider-horizontal-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:SSSS_13,backgroundRepeat:SSSS_1,outerColor:SSSS_9,innerColor:SSSS_3,innerOpacity:0.3}},"scrollbar-slider-vertical":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:SSSS_19,backgroundRepeat:SSSS_1,outerColor:SSSS_2,innerColor:SSSS_3,innerOpacity:0.5}},"scrollbar-slider-vertical-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:SSSS_19,backgroundRepeat:SSSS_1,outerColor:SSSS_9,innerColor:SSSS_3,innerOpacity:0.3}},"button":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_23,insets:2}},"button-disabled":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_54,insets:2}},"button-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_52,insets:2}},"button-hovered":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_35,insets:2}},"button-pressed":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_56,insets:2}},"button-checked":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_24,insets:2}},"button-checked-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_61,insets:2}},"button-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:SSSS_7,innerColor:SSSS_8,insets:[1]}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:SSSS_7,innerColor:SSSS_8,insets:[0]}},"input":{decorator:qx.ui.decoration.Beveled,style:{outerColor:SSSS_18,innerColor:SSSS_3,innerOpacity:0.5,backgroundImage:SSSS_11,backgroundRepeat:SSSS_4,backgroundColor:SSSS_6}},"input-focused":{decorator:qx.ui.decoration.Beveled,style:{outerColor:SSSS_18,innerColor:SSSS_40,backgroundImage:SSSS_17,backgroundRepeat:SSSS_4,backgroundColor:SSSS_6}},"input-focused-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:SSSS_7,innerColor:SSSS_8,backgroundImage:SSSS_17,backgroundRepeat:SSSS_4,backgroundColor:SSSS_6,insets:[2]}},"input-disabled":{decorator:qx.ui.decoration.Beveled,style:{outerColor:SSSS_9,innerColor:SSSS_3,innerOpacity:0.5,backgroundImage:SSSS_11,backgroundRepeat:SSSS_4,backgroundColor:SSSS_6}},"toolbar":{decorator:qx.ui.decoration.Background,style:{backgroundImage:SSSS_63,backgroundRepeat:SSSS_1}},"toolbar-button-hovered":{decorator:qx.ui.decoration.Beveled,style:{outerColor:SSSS_14,innerColor:SSSS_12,backgroundImage:SSSS_21,backgroundRepeat:SSSS_1}},"toolbar-button-checked":{decorator:qx.ui.decoration.Beveled,style:{outerColor:SSSS_14,innerColor:SSSS_12,backgroundImage:SSSS_44,backgroundRepeat:SSSS_1}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,widthRight:1,colorLeft:SSSS_65,colorRight:SSSS_47,styleLeft:SSSS_0,styleRight:SSSS_0}},"toolbar-part":{decorator:qx.ui.decoration.Background,style:{backgroundImage:SSSS_30,backgroundRepeat:SSSS_16}},"tabview-pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_50,insets:[4,6,7,4]}},"tabview-page-button-top-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_20}},"tabview-page-button-top-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_31}},"tabview-page-button-bottom-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_34}},"tabview-page-button-bottom-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_53}},"tabview-page-button-left-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_59}},"tabview-page-button-left-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_25}},"tabview-page-button-right-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_55}},"tabview-page-button-right-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_64}},"splitpane":{decorator:qx.ui.decoration.Uniform,style:{backgroundColor:SSSS_15,width:3,color:SSSS_60,style:SSSS_0}},"window":{decorator:qx.ui.decoration.Single,style:{backgroundColor:SSSS_15,width:1,color:SSSS_2,widthTop:0}},"window-captionbar-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_58}},"window-captionbar-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_37}},"window-statusbar":{decorator:qx.ui.decoration.Grid,style:{baseImage:SSSS_39}},"table":{decorator:qx.ui.decoration.Single,style:{width:1,color:SSSS_2,style:SSSS_0}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:SSSS_2,style:SSSS_0}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:SSSS_10,backgroundRepeat:SSSS_1,widthBottom:1,colorBottom:SSSS_2,style:SSSS_0}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:SSSS_5,styleRight:SSSS_0}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:SSSS_5,styleRight:SSSS_0,widthBottom:1,colorBottom:SSSS_3,styleBottom:SSSS_0}},"table-column-button":{decorator:qx.ui.decoration.Single,style:{backgroundImage:SSSS_10,backgroundRepeat:SSSS_1,widthBottom:1,colorBottom:SSSS_2,style:SSSS_0}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:SSSS_42,style:SSSS_0}},"progressive-table-header":{decorator:qx.ui.decoration.Single,style:{width:1,color:SSSS_2,style:SSSS_0}},"progressive-table-header-cell":{decorator:qx.ui.decoration.Single,style:{backgroundImage:SSSS_10,backgroundRepeat:SSSS_1,widthRight:1,colorRight:SSSS_43,style:SSSS_0}},"menu":{decorator:qx.ui.decoration.Single,style:{backgroundImage:SSSS_29,backgroundRepeat:SSSS_1,width:1,color:SSSS_2,style:SSSS_0}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:SSSS_62,widthBottom:1,colorBottom:SSSS_27}},"menubar":{decorator:qx.ui.decoration.Single,style:{backgroundImage:SSSS_32,backgroundRepeat:SSSS_1,width:1,color:SSSS_5,style:SSSS_0}},"app-header":{decorator:qx.ui.decoration.Background,style:{backgroundImage:SSSS_49,backgroundRepeat:SSSS_1}}}});
})();
(function(){var SSSS_0="gui4.theme.Decoration";
qx.Theme.define(SSSS_0,{extend:qx.theme.modern.Decoration,decorations:{}});
})();
(function(){var SSSS_0="iPod",SSSS_1="Win32",SSSS_2="",SSSS_3="Win64",SSSS_4="Linux",SSSS_5="BSD",SSSS_6="Macintosh",SSSS_7="iPhone",SSSS_8="Windows",SSSS_9="qx.bom.client.Platform",SSSS_10="X11",SSSS_11="MacIntel",SSSS_12="MacPPC";
qx.Bootstrap.define(SSSS_9,{statics:{NAME:"",WIN:false,MAC:false,UNIX:false,UNKNOWN_PLATFORM:false,__bM:function(){var input=navigator.platform;
if(input==null||input===SSSS_2){input=navigator.userAgent;
}
if(input.indexOf(SSSS_8)!=-1||input.indexOf(SSSS_1)!=-1||input.indexOf(SSSS_3)!=-1){this.WIN=true;
this.NAME="win";
}else if(input.indexOf(SSSS_6)!=-1||input.indexOf(SSSS_12)!=-1||input.indexOf(SSSS_11)!=-1||input.indexOf(SSSS_0)!=-1||input.indexOf(SSSS_7)!=-1){this.MAC=true;
this.NAME="mac";
}else if(input.indexOf(SSSS_10)!=-1||input.indexOf(SSSS_4)!=-1||input.indexOf(SSSS_5)!=-1){this.UNIX=true;
this.NAME="unix";
}else{this.UNKNOWN_PLATFORM=true;
this.WIN=true;
this.NAME="win";
}}},defer:function(statics){statics.__bM();
}});
})();
(function(){var SSSS_0="win98",SSSS_1="osx2",SSSS_2="osx0",SSSS_3="osx4",SSSS_4="win95",SSSS_5="win2000",SSSS_6="osx1",SSSS_7="osx5",SSSS_8="osx3",SSSS_9="Windows NT 5.01",SSSS_10=")",SSSS_11="winxp",SSSS_12="freebsd",SSSS_13="sunos",SSSS_14="SV1",SSSS_15="|",SSSS_16="nintendods",SSSS_17="winnt4",SSSS_18="wince",SSSS_19="winme",SSSS_20="os9",SSSS_21="\.",SSSS_22="osx",SSSS_23="linux",SSSS_24="netbsd",SSSS_25="winvista",SSSS_26="openbsd",SSSS_27="(",SSSS_28="win2003",SSSS_29="symbian",SSSS_30="g",SSSS_31="qx.bom.client.System",SSSS_32=" Mobile/";
qx.Bootstrap.define(SSSS_31,{statics:{NAME:"",SP1:false,SP2:false,WIN95:false,WIN98:false,WINME:false,WINNT4:false,WIN2000:false,WINXP:false,WIN2003:false,WINVISTA:false,WINCE:false,LINUX:false,SUNOS:false,FREEBSD:false,NETBSD:false,OPENBSD:false,OSX:false,OS9:false,SYMBIAN:false,NINTENDODS:false,PSP:false,IPHONE:false,UNKNOWN_SYSTEM:false,__bN:{"Windows NT 6.0":SSSS_25,"Windows NT 5.2":SSSS_28,"Windows NT 5.1":SSSS_11,"Windows NT 5.0":SSSS_5,"Windows 2000":SSSS_5,"Windows NT 4.0":SSSS_17,"Win 9x 4.90":SSSS_19,"Windows CE":SSSS_18,"Windows 98":SSSS_0,"Win98":SSSS_0,"Windows 95":SSSS_4,"Win95":SSSS_4,"Linux":SSSS_23,"FreeBSD":SSSS_12,"NetBSD":SSSS_24,"OpenBSD":SSSS_26,"SunOS":SSSS_13,"Symbian System":SSSS_29,"Nitro":SSSS_16,"PSP":"sonypsp","Mac OS X 10_5":SSSS_7,"Mac OS X 10.5":SSSS_7,"Mac OS X 10_4":SSSS_3,"Mac OS X 10.4":SSSS_3,"Mac OS X 10_3":SSSS_8,"Mac OS X 10.3":SSSS_8,"Mac OS X 10_2":SSSS_1,"Mac OS X 10.2":SSSS_1,"Mac OS X 10_1":SSSS_6,"Mac OS X 10.1":SSSS_6,"Mac OS X 10_0":SSSS_2,"Mac OS X 10.0":SSSS_2,"Mac OS X":SSSS_22,"Mac OS 9":SSSS_20},__bO:function(){var agent=navigator.userAgent;
var str=[];

for(var key in this.__bN){str.push(key);
}var reg=new RegExp(SSSS_27+str.join(SSSS_15).replace(/\./g,SSSS_21)+SSSS_10,SSSS_30);

if(!reg.test(agent)){this.UNKNOWN_SYSTEM=true;

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
if(qx.bom.client.Engine.WEBKIT&&RegExp(SSSS_32).test(navigator.userAgent)){this.IPHONE=true;
this.NAME="iphone";
}else{this.NAME=this.__bN[RegExp.$1];
this[this.NAME.toUpperCase()]=true;

if(qx.bom.client.Platform.WIN){if(agent.indexOf(SSSS_9)!==-1){this.SP1=true;
}else if(qx.bom.client.Engine.MSHTML&&agent.indexOf(SSSS_14)!==-1){this.SP2=true;
}}}}},defer:function(statics){statics.__bO();
}});
})();
(function(){var SSSS_0="Liberation Sans",SSSS_1="Arial",SSSS_2="Lucida Grande",SSSS_3="Tahoma",SSSS_4="Candara",SSSS_5="Segoe UI",SSSS_6="Consolas",SSSS_7="Courier New",SSSS_8="Monaco",SSSS_9="monospace",SSSS_10="Lucida Console",SSSS_11="qx.theme.modern.Font",SSSS_12="DejaVu Sans Mono";
qx.Theme.define(SSSS_11,{fonts:{"default":{size:qx.bom.client.System.WINVISTA?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[SSSS_2]:qx.bom.client.System.WINVISTA?[SSSS_5,SSSS_4]:[SSSS_3,SSSS_0,SSSS_1]},"bold":{size:qx.bom.client.System.WINVISTA?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[SSSS_2]:qx.bom.client.System.WINVISTA?[SSSS_5,SSSS_4]:[SSSS_3,SSSS_0,SSSS_1],bold:true},"small":{size:qx.bom.client.System.WINVISTA?11:10,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[SSSS_2]:qx.bom.client.System.WINVISTA?[SSSS_5,SSSS_4]:[SSSS_3,SSSS_0,SSSS_1]},"monospace":{size:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[SSSS_10,SSSS_8]:qx.bom.client.System.WINVISTA?[SSSS_6]:[SSSS_6,SSSS_12,SSSS_7,SSSS_9]}}});
})();
(function(){var SSSS_0="gui4.theme.Font";
qx.Theme.define(SSSS_0,{extend:qx.theme.modern.Font,fonts:{}});
})();
(function(){var SSSS_0="Tango",SSSS_1="qx/icon/Tango",SSSS_2="qx.theme.icon.Tango";
qx.Theme.define(SSSS_2,{title:SSSS_0,aliases:{"icon":SSSS_1},icons:{}});
})();
(function(){var SSSS_0="button-frame",SSSS_1="atom",SSSS_2="widget",SSSS_3="main",SSSS_4="button",SSSS_5="text-selected",SSSS_6="image",SSSS_7="bold",SSSS_8="middle",SSSS_9="background-light",SSSS_10="text-disabled",SSSS_11="groupbox",SSSS_12="decoration/arrows/down.png",SSSS_13="cell",SSSS_14="selected",SSSS_15="border-invalid",SSSS_16="input",SSSS_17="input-disabled",SSSS_18="menu-button",SSSS_19="input-focused-invalid",SSSS_20="toolbar-button",SSSS_21="spinner",SSSS_22="input-focused",SSSS_23="popup",SSSS_24="tooltip",SSSS_25="list",SSSS_26="tree-item",SSSS_27="treevirtual-contract",SSSS_28="scrollbar",SSSS_29="datechooser/nav-button",SSSS_30="text-hovered",SSSS_31="center",SSSS_32="treevirtual-expand",SSSS_33="textfield",SSSS_34="label",SSSS_35="decoration/arrows/right.png",SSSS_36="background-application",SSSS_37="radiobutton",SSSS_38="invalid",SSSS_39="combobox",SSSS_40="right-top",SSSS_41="checkbox",SSSS_42="text-title",SSSS_43="qx/static/blank.gif",SSSS_44="scrollbar/button",SSSS_45="right",SSSS_46="combobox/button",SSSS_47="icon/16/places/folder.png",SSSS_48="text-label",SSSS_49="decoration/tree/closed.png",SSSS_50="scrollbar-slider-horizontal",SSSS_51="white",SSSS_52="decoration/arrows/left.png",SSSS_53="button-focused",SSSS_54="text-light",SSSS_55="menu-slidebar-button",SSSS_56="text-input",SSSS_57="slidebar/button-forward",SSSS_58="background-splitpane",SSSS_59=".png",SSSS_60="decoration/tree/open.png",SSSS_61="default",SSSS_62="decoration/arrows/down-small.png",SSSS_63="datechooser",SSSS_64="slidebar/button-backward",SSSS_65="selectbox",SSSS_66="treevirtual-folder",SSSS_67="shadow-popup",SSSS_68="icon/16/mimetypes/office-document.png",SSSS_69="background-medium",SSSS_70="table",SSSS_71="decoration/arrows/up.png",SSSS_72="decoration/form/",SSSS_73="",SSSS_74="-invalid",SSSS_75="icon/16/places/folder-open.png",SSSS_76="button-checked",SSSS_77="decoration/window/maximize-active-hovered.png",SSSS_78="radiobutton-hovered",SSSS_79="decoration/cursors/",SSSS_80="slidebar",SSSS_81="tooltip-error-arrow",SSSS_82="table-scroller-focus-indicator",SSSS_83="move-frame",SSSS_84="nodrop",SSSS_85="decoration/table/boolean-true.png",SSSS_86="table-header-cell",SSSS_87="menu",SSSS_88="app-header",SSSS_89="row-layer",SSSS_90="text-inactive",SSSS_91="move",SSSS_92="radiobutton-checked-focused",SSSS_93="decoration/window/restore-active-hovered.png",SSSS_94="shadow-window",SSSS_95="table-column-button",SSSS_96="right.png",SSSS_97="tabview-page-button-bottom-inactive",SSSS_98="tooltip-error",SSSS_99="window-statusbar",SSSS_100="button-hovered",SSSS_101="decoration/scrollbar/scrollbar-",SSSS_102="background-tip",SSSS_103="scrollbar-slider-horizontal-disabled",SSSS_104="table-scroller-header",SSSS_105="radiobutton-disabled",SSSS_106="button-pressed",SSSS_107="table-pane",SSSS_108="decoration/window/close-active.png",SSSS_109="native",SSSS_110="checkbox-hovered",SSSS_111="button-invalid-shadow",SSSS_112="checkbox-checked",SSSS_113="decoration/window/minimize-active-hovered.png",SSSS_114="menubar",SSSS_115="icon/16/actions/dialog-cancel.png",SSSS_116="tabview-page-button-top-inactive",SSSS_117="tabview-page-button-left-inactive",SSSS_118="menu-slidebar",SSSS_119="toolbar-button-checked",SSSS_120="decoration/tree/open-selected.png",SSSS_121="radiobutton-checked",SSSS_122="decoration/window/minimize-inactive.png",SSSS_123="icon/16/apps/office-calendar.png",SSSS_124="group",SSSS_125="tabview-page-button-right-inactive",SSSS_126="decoration/window/minimize-active.png",SSSS_127="decoration/window/restore-inactive.png",SSSS_128="checkbox-checked-focused",SSSS_129="splitpane",SSSS_130="combobox/textfield",SSSS_131="button-preselected-focused",SSSS_132="decoration/window/close-active-hovered.png",SSSS_133="qx/icon/Tango/16/actions/window-close.png",SSSS_134="checkbox-pressed",SSSS_135="button-disabled",SSSS_136="tabview-page-button-left-active",SSSS_137="border-separator",SSSS_138="decoration/window/maximize-inactive.png",SSSS_139="icon/22/places/folder-open.png",SSSS_140="scrollarea",SSSS_141="scrollbar-vertical",SSSS_142="decoration/toolbar/toolbar-handle-knob.gif",SSSS_143="icon/22/mimetypes/office-document.png",SSSS_144="button-preselected",SSSS_145="button-checked-focused",SSSS_146="up.png",SSSS_147="best-fit",SSSS_148="decoration/tree/closed-selected.png",SSSS_149="qx.theme.modern.Appearance",SSSS_150="text-active",SSSS_151="checkbox-disabled",SSSS_152="toolbar-button-hovered",SSSS_153="progressive-table-header",SSSS_154="decoration/table/select-column-order.png",SSSS_155="decoration/menu/radiobutton.gif",SSSS_156="decoration/arrows/forward.png",SSSS_157="decoration/table/descending.png",SSSS_158="window-captionbar-active",SSSS_159="checkbox-checked-hovered",SSSS_160="scrollbar-slider-vertical",SSSS_161="toolbar",SSSS_162="alias",SSSS_163="decoration/window/restore-active.png",SSSS_164="decoration/table/boolean-false.png",SSSS_165="checkbox-checked-disabled",SSSS_166="icon/32/mimetypes/office-document.png",SSSS_167="radiobutton-checked-disabled",SSSS_168="tabview-pane",SSSS_169="decoration/arrows/rewind.png",SSSS_170="checkbox-focused",SSSS_171="top",SSSS_172="#EEE",SSSS_173="icon/16/actions/dialog-ok.png",SSSS_174="radiobutton-checked-hovered",SSSS_175="table-header-cell-hovered",SSSS_176="window",SSSS_177="text-gray",SSSS_178="decoration/menu/radiobutton-invert.gif",SSSS_179="text-placeholder",SSSS_180="slider",SSSS_181="keep-align",SSSS_182="down.png",SSSS_183="tabview-page-button-top-active",SSSS_184="icon/32/places/folder-open.png",SSSS_185="icon/22/places/folder.png",SSSS_186="decoration/window/maximize-active.png",SSSS_187="checkbox-checked-pressed",SSSS_188="decoration/window/close-inactive.png",SSSS_189="toolbar-part",SSSS_190="decoration/splitpane/knob-vertical.png",SSSS_191=".gif",SSSS_192="decoration/menu/checkbox-invert.gif",SSSS_193="radiobutton-checked-pressed",SSSS_194="table-statusbar",SSSS_195="radiobutton-pressed",SSSS_196="window-captionbar-inactive",SSSS_197="copy",SSSS_198="radiobutton-focused",SSSS_199="decoration/arrows/down-invert.png",SSSS_200="decoration/menu/checkbox.gif",SSSS_201="decoration/splitpane/knob-horizontal.png",SSSS_202="icon/32/places/folder.png",SSSS_203="toolbar-separator",SSSS_204="tabview-page-button-bottom-active",SSSS_205="decoration/arrows/up-small.png",SSSS_206="decoration/table/ascending.png",SSSS_207="decoration/arrows/up-invert.png",SSSS_208="small",SSSS_209="tabview-page-button-right-active",SSSS_210="-disabled",SSSS_211="scrollbar-horizontal",SSSS_212="progressive-table-header-cell",SSSS_213="menu-separator",SSSS_214="pane",SSSS_215="decoration/arrows/right-invert.png",SSSS_216="left.png",SSSS_217="icon/16/actions/view-refresh.png";
qx.Theme.define(SSSS_149,{appearances:{"widget":{},"root":{style:function(states){return {backgroundColor:SSSS_36,textColor:SSSS_48,font:SSSS_61};
}},"label":{style:function(states){return {textColor:states.disabled?SSSS_10:undefined};
}},"move-frame":{style:function(states){return {decorator:SSSS_3};
}},"resize-frame":SSSS_83,"dragdrop-cursor":{style:function(states){var icon=SSSS_84;

if(states.copy){icon=SSSS_197;
}else if(states.move){icon=SSSS_91;
}else if(states.alias){icon=SSSS_162;
}return {source:SSSS_79+icon+SSSS_191,position:SSSS_40,offset:[2,16,2,6]};
}},"image":{style:function(states){return {opacity:!states.replacement&&states.disabled?0.3:1};
}},"atom":{},"atom/label":SSSS_34,"atom/icon":SSSS_6,"popup":{style:function(states){return {decorator:SSSS_3,backgroundColor:SSSS_9,shadow:SSSS_67};
}},"button-frame":{alias:SSSS_1,style:function(states){var decorator,textColor;

if(states.checked&&states.focused&&!states.inner){decorator=SSSS_145;
textColor=undefined;
}else if(states.disabled){decorator=SSSS_135;
textColor=undefined;
}else if(states.pressed){decorator=SSSS_106;
textColor=SSSS_30;
}else if(states.checked){decorator=SSSS_76;
textColor=undefined;
}else if(states.hovered){decorator=SSSS_100;
textColor=SSSS_30;
}else if(states.preselected&&states.focused&&!states.inner){decorator=SSSS_131;
textColor=SSSS_30;
}else if(states.preselected){decorator=SSSS_144;
textColor=SSSS_30;
}else if(states.focused&&!states.inner){decorator=SSSS_53;
textColor=undefined;
}else{decorator=SSSS_4;
textColor=undefined;
}return {decorator:decorator,textColor:textColor,shadow:states.invalid&&!states.disabled?SSSS_111:undefined};
}},"button-frame/image":{style:function(states){return {opacity:!states.replacement&&states.disabled?0.5:1};
}},"button":{alias:SSSS_0,include:SSSS_0,style:function(states){return {padding:[2,8],center:true};
}},"hover-button":{alias:SSSS_1,include:SSSS_1,style:function(states){return {decorator:states.hovered?SSSS_14:undefined,textColor:states.hovered?SSSS_5:undefined};
}},"splitbutton":{},"splitbutton/button":SSSS_4,"splitbutton/arrow":{alias:SSSS_4,include:SSSS_4,style:function(states){return {icon:SSSS_12,padding:2,marginLeft:1};
}},"checkbox":{alias:SSSS_1,style:function(states){var icon;

if(states.checked&&states.focused){icon=SSSS_128;
}else if(states.checked&&states.disabled){icon=SSSS_165;
}else if(states.checked&&states.pressed){icon=SSSS_187;
}else if(states.checked&&states.hovered){icon=SSSS_159;
}else if(states.checked){icon=SSSS_112;
}else if(states.disabled){icon=SSSS_151;
}else if(states.focused){icon=SSSS_170;
}else if(states.pressed){icon=SSSS_134;
}else if(states.hovered){icon=SSSS_110;
}else{icon=SSSS_41;
}var invalid=states.invalid&&!states.disabled?SSSS_74:SSSS_73;
return {icon:SSSS_72+icon+invalid+SSSS_59,gap:6};
}},"radiobutton":{alias:SSSS_1,style:function(states){var icon;

if(states.checked&&states.focused){icon=SSSS_92;
}else if(states.checked&&states.disabled){icon=SSSS_167;
}else if(states.checked&&states.pressed){icon=SSSS_193;
}else if(states.checked&&states.hovered){icon=SSSS_174;
}else if(states.checked){icon=SSSS_121;
}else if(states.disabled){icon=SSSS_105;
}else if(states.focused){icon=SSSS_198;
}else if(states.pressed){icon=SSSS_195;
}else if(states.hovered){icon=SSSS_78;
}else{icon=SSSS_37;
}var invalid=states.invalid&&!states.disabled?SSSS_74:SSSS_73;
return {icon:SSSS_72+icon+invalid+SSSS_59,gap:6};
}},"textfield":{style:function(states){var decorator;
var focused=!!states.focused;
var invalid=!!states.invalid;
var disabled=!!states.disabled;

if(focused&&invalid&&!disabled){decorator=SSSS_19;
}else if(focused&&!invalid&&!disabled){decorator=SSSS_22;
}else if(disabled){decorator=SSSS_17;
}else if(!focused&&invalid&&!disabled){decorator=SSSS_15;
}else{decorator=SSSS_16;
}var textColor;

if(states.disabled){textColor=SSSS_10;
}else if(states.showingPlaceholder){textColor=SSSS_179;
}else{textColor=SSSS_56;
}return {decorator:decorator,padding:[2,4,1],textColor:textColor};
}},"textarea":{include:SSSS_33,style:function(states){return {padding:4};
}},"spinner":{style:function(states){var decorator;
var focused=!!states.focused;
var invalid=!!states.invalid;
var disabled=!!states.disabled;

if(focused&&invalid&&!disabled){decorator=SSSS_19;
}else if(focused&&!invalid&&!disabled){decorator=SSSS_22;
}else if(disabled){decorator=SSSS_17;
}else if(!focused&&invalid&&!disabled){decorator=SSSS_15;
}else{decorator=SSSS_16;
}return {decorator:decorator};
}},"spinner/textfield":{style:function(states){return {marginRight:2,padding:[2,4,1],textColor:states.disabled?SSSS_10:SSSS_56};
}},"spinner/upbutton":{alias:SSSS_0,include:SSSS_0,style:function(states){return {icon:SSSS_205,padding:states.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"spinner/downbutton":{alias:SSSS_0,include:SSSS_0,style:function(states){return {icon:SSSS_62,padding:states.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"datefield":SSSS_39,"datefield/button":{alias:SSSS_46,include:SSSS_46,style:function(states){return {icon:SSSS_123,padding:[0,3],decorator:undefined};
}},"datefield/textfield":SSSS_130,"datefield/list":{alias:SSSS_63,include:SSSS_63,style:function(states){return {decorator:undefined};
}},"groupbox":{style:function(states){return {legendPosition:SSSS_171};
}},"groupbox/legend":{alias:SSSS_1,style:function(states){return {padding:[1,0,1,4],textColor:states.invalid?SSSS_38:SSSS_42,font:SSSS_7};
}},"groupbox/frame":{style:function(states){return {padding:12,decorator:SSSS_124};
}},"check-groupbox":SSSS_11,"check-groupbox/legend":{alias:SSSS_41,include:SSSS_41,style:function(states){return {padding:[1,0,1,4],textColor:states.invalid?SSSS_38:SSSS_42,font:SSSS_7};
}},"radio-groupbox":SSSS_11,"radio-groupbox/legend":{alias:SSSS_37,include:SSSS_37,style:function(states){return {padding:[1,0,1,4],textColor:states.invalid?SSSS_38:SSSS_42,font:SSSS_7};
}},"scrollarea":{style:function(states){return {minWidth:50,minHeight:50};
}},"scrollarea/corner":{style:function(states){return {backgroundColor:SSSS_36};
}},"scrollarea/pane":SSSS_2,"scrollarea/scrollbar-x":SSSS_28,"scrollarea/scrollbar-y":SSSS_28,"scrollbar":{style:function(states){if(states[SSSS_109]){return {};
}return {width:states.horizontal?undefined:16,height:states.horizontal?16:undefined,decorator:states.horizontal?SSSS_211:SSSS_141,padding:1};
}},"scrollbar/slider":{alias:SSSS_180,style:function(states){return {padding:states.horizontal?[0,1,0,1]:[1,0,1,0]};
}},"scrollbar/slider/knob":{include:SSSS_0,style:function(states){var decorator=states.horizontal?SSSS_50:SSSS_160;

if(states.disabled){decorator+=SSSS_210;
}return {decorator:decorator,minHeight:states.horizontal?undefined:9,minWidth:states.horizontal?9:undefined};
}},"scrollbar/button":{alias:SSSS_0,include:SSSS_0,style:function(states){var icon=SSSS_101;

if(states.left){icon+=SSSS_216;
}else if(states.right){icon+=SSSS_96;
}else if(states.up){icon+=SSSS_146;
}else{icon+=SSSS_182;
}
if(states.left||states.right){return {padding:[0,0,0,states.left?3:4],icon:icon,width:15,height:14};
}else{return {padding:[0,0,0,2],icon:icon,width:14,height:15};
}}},"scrollbar/button-begin":SSSS_44,"scrollbar/button-end":SSSS_44,"slider":{style:function(states){var decorator;
var focused=!!states.focused;
var invalid=!!states.invalid;
var disabled=!!states.disabled;

if(focused&&invalid&&!disabled){decorator=SSSS_19;
}else if(focused&&!invalid&&!disabled){decorator=SSSS_22;
}else if(disabled){decorator=SSSS_17;
}else if(!focused&&invalid&&!disabled){decorator=SSSS_15;
}else{decorator=SSSS_16;
}return {decorator:decorator};
}},"slider/knob":{include:SSSS_0,style:function(states){return {decorator:states.disabled?SSSS_103:SSSS_50,shadow:undefined,height:14,width:14};
}},"list":{alias:SSSS_140,style:function(states){var decorator;
var focused=!!states.focused;
var invalid=!!states.invalid;
var disabled=!!states.disabled;

if(focused&&invalid&&!disabled){decorator=SSSS_19;
}else if(focused&&!invalid&&!disabled){decorator=SSSS_22;
}else if(disabled){decorator=SSSS_17;
}else if(!focused&&invalid&&!disabled){decorator=SSSS_15;
}else{decorator=SSSS_16;
}return {backgroundColor:SSSS_9,decorator:decorator};
}},"list/pane":SSSS_2,"listitem":{alias:SSSS_1,style:function(states){return {padding:4,textColor:states.selected?SSSS_5:undefined,decorator:states.selected?SSSS_14:undefined};
}},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:SSSS_0,include:SSSS_0,style:function(states){return {padding:5,center:true,icon:states.vertical?SSSS_12:SSSS_35};
}},"slidebar/button-backward":{alias:SSSS_0,include:SSSS_0,style:function(states){return {padding:5,center:true,icon:states.vertical?SSSS_71:SSSS_52};
}},"tabview":{style:function(states){return {contentPadding:16};
}},"tabview/bar":{alias:SSSS_80,style:function(states){var result={marginBottom:states.barTop?-1:0,marginTop:states.barBottom?-4:0,marginLeft:states.barRight?-3:0,marginRight:states.barLeft?-1:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};

if(states.barTop||states.barBottom){result.paddingLeft=5;
result.paddingRight=7;
}else{result.paddingTop=5;
result.paddingBottom=7;
}return result;
}},"tabview/bar/button-forward":{include:SSSS_57,alias:SSSS_57,style:function(states){if(states.barTop||states.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/button-backward":{include:SSSS_64,alias:SSSS_64,style:function(states){if(states.barTop||states.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(states){return {decorator:SSSS_168,minHeight:100,marginBottom:states.barBottom?-1:0,marginTop:states.barTop?-1:0,marginLeft:states.barLeft?-1:0,marginRight:states.barRight?-1:0};
}},"tabview-page":SSSS_2,"tabview-page/button":{alias:SSSS_1,style:function(states){var decorator,padding=0;
var marginTop=0,marginBottom=0,marginLeft=0,marginRight=0;

if(states.checked){if(states.barTop){decorator=SSSS_183;
padding=[6,14];
marginLeft=states.firstTab?0:-5;
marginRight=states.lastTab?0:-5;
}else if(states.barBottom){decorator=SSSS_204;
padding=[6,14];
marginLeft=states.firstTab?0:-5;
marginRight=states.lastTab?0:-5;
}else if(states.barRight){decorator=SSSS_209;
padding=[6,13];
marginTop=states.firstTab?0:-5;
marginBottom=states.lastTab?0:-5;
}else{decorator=SSSS_136;
padding=[6,13];
marginTop=states.firstTab?0:-5;
marginBottom=states.lastTab?0:-5;
}}else{if(states.barTop){decorator=SSSS_116;
padding=[4,10];
marginTop=4;
marginLeft=states.firstTab?5:1;
marginRight=1;
}else if(states.barBottom){decorator=SSSS_97;
padding=[4,10];
marginBottom=4;
marginLeft=states.firstTab?5:1;
marginRight=1;
}else if(states.barRight){decorator=SSSS_125;
padding=[4,10];
marginRight=5;
marginTop=states.firstTab?5:1;
marginBottom=1;
marginLeft=1;
}else{decorator=SSSS_117;
padding=[4,10];
marginLeft=5;
marginTop=states.firstTab?5:1;
marginBottom=1;
marginRight=1;
}}return {zIndex:states.checked?10:5,decorator:decorator,padding:padding,marginTop:marginTop,marginBottom:marginBottom,marginLeft:marginLeft,marginRight:marginRight,textColor:states.checked?SSSS_150:SSSS_90};
}},"tabview-page/button/close-button":{alias:SSSS_1,style:function(states){return {icon:SSSS_133};
}},"toolbar":{style:function(states){return {decorator:SSSS_161,spacing:2};
}},"toolbar/part":{style:function(states){return {decorator:SSSS_189,spacing:2};
}},"toolbar/part/container":{style:function(states){return {paddingLeft:2,paddingRight:2};
}},"toolbar/part/handle":{style:function(states){return {source:SSSS_142,marginLeft:3,marginRight:3};
}},"toolbar-button":{alias:SSSS_1,style:function(states){return {marginTop:2,marginBottom:2,padding:(states.pressed||states.checked||states.hovered)&&!states.disabled||(states.disabled&&states.checked)?3:5,decorator:states.pressed||(states.checked&&!states.hovered)||(states.checked&&states.disabled)?SSSS_119:states.hovered&&!states.disabled?SSSS_152:undefined};
}},"toolbar-menubutton":{alias:SSSS_20,include:SSSS_20,style:function(states){return {showArrow:true};
}},"toolbar-menubutton/arrow":{alias:SSSS_6,include:SSSS_6,style:function(states){return {source:SSSS_62};
}},"toolbar-splitbutton":{style:function(states){return {marginTop:2,marginBottom:2};
}},"toolbar-splitbutton/button":{alias:SSSS_20,include:SSSS_20,style:function(states){return {icon:SSSS_12,marginTop:undefined,marginBottom:undefined};
}},"toolbar-splitbutton/arrow":{alias:SSSS_20,include:SSSS_20,style:function(states){return {padding:states.pressed||states.checked?1:states.hovered?1:3,icon:SSSS_12,marginTop:undefined,marginBottom:undefined};
}},"toolbar-separator":{style:function(states){return {decorator:SSSS_203,margin:7};
}},"tree":SSSS_25,"tree-item":{style:function(states){return {padding:[2,6],textColor:states.selected?SSSS_5:undefined,decorator:states.selected?SSSS_14:undefined};
}},"tree-item/icon":{include:SSSS_6,style:function(states){return {paddingRight:5};
}},"tree-item/label":SSSS_34,"tree-item/open":{include:SSSS_6,style:function(states){var icon;

if(states.selected&&states.opened){icon=SSSS_120;
}else if(states.selected&&!states.opened){icon=SSSS_148;
}else if(states.opened){icon=SSSS_60;
}else{icon=SSSS_49;
}return {padding:[0,5,0,2],source:icon};
}},"tree-folder":{include:SSSS_26,alias:SSSS_26,style:function(states){var icon;

if(states.small){icon=states.opened?SSSS_75:SSSS_47;
}else if(states.large){icon=states.opened?SSSS_184:SSSS_202;
}else{icon=states.opened?SSSS_139:SSSS_185;
}return {icon:icon};
}},"tree-file":{include:SSSS_26,alias:SSSS_26,style:function(states){return {icon:states.small?SSSS_68:states.large?SSSS_166:SSSS_143};
}},"treevirtual":SSSS_70,"treevirtual-folder":{style:function(states){return {icon:states.opened?SSSS_75:SSSS_47};
}},"treevirtual-file":{include:SSSS_66,alias:SSSS_66,style:function(states){return {icon:SSSS_68};
}},"treevirtual-line":{style:function(states){return {icon:SSSS_43};
}},"treevirtual-contract":{style:function(states){return {icon:SSSS_60,paddingLeft:5,paddingTop:2};
}},"treevirtual-expand":{style:function(states){return {icon:SSSS_49,paddingLeft:5,paddingTop:2};
}},"treevirtual-only-contract":SSSS_27,"treevirtual-only-expand":SSSS_32,"treevirtual-start-contract":SSSS_27,"treevirtual-start-expand":SSSS_32,"treevirtual-end-contract":SSSS_27,"treevirtual-end-expand":SSSS_32,"treevirtual-cross-contract":SSSS_27,"treevirtual-cross-expand":SSSS_32,"treevirtual-end":{style:function(states){return {icon:SSSS_43};
}},"treevirtual-cross":{style:function(states){return {icon:SSSS_43};
}},"tooltip":{include:SSSS_23,style:function(states){return {backgroundColor:SSSS_102,padding:[1,3,2,3],offset:[15,5,5,5]};
}},"tooltip/atom":SSSS_1,"tooltip-error":{include:SSSS_24,style:function(states){return {textColor:SSSS_5,placeMethod:SSSS_2,offsetRight:15,position:SSSS_40,showTimeout:100,hideTimeout:10000,decorator:SSSS_98,shadow:SSSS_81,font:SSSS_7};
}},"tooltip-error/atom":SSSS_1,"window":{style:function(states){return {shadow:SSSS_94,contentPadding:[10,10,10,10]};
}},"window/pane":{style:function(states){return {decorator:SSSS_176};
}},"window/captionbar":{style:function(states){return {decorator:states.active?SSSS_158:SSSS_196,textColor:states.active?SSSS_51:SSSS_177,minHeight:26,paddingRight:2};
}},"window/icon":{style:function(states){return {margin:[5,0,3,6]};
}},"window/title":{style:function(states){return {alignY:SSSS_8,font:SSSS_7,marginLeft:6,marginRight:12};
}},"window/minimize-button":{alias:SSSS_1,style:function(states){return {icon:states.active?states.hovered?SSSS_113:SSSS_126:SSSS_122,margin:[4,8,2,0]};
}},"window/restore-button":{alias:SSSS_1,style:function(states){return {icon:states.active?states.hovered?SSSS_93:SSSS_163:SSSS_127,margin:[5,8,2,0]};
}},"window/maximize-button":{alias:SSSS_1,style:function(states){return {icon:states.active?states.hovered?SSSS_77:SSSS_186:SSSS_138,margin:[4,8,2,0]};
}},"window/close-button":{alias:SSSS_1,style:function(states){return {icon:states.active?states.hovered?SSSS_132:SSSS_108:SSSS_188,margin:[4,8,2,0]};
}},"window/statusbar":{style:function(states){return {padding:[2,6],decorator:SSSS_99,minHeight:18};
}},"window/statusbar-text":{style:function(states){return {font:SSSS_208};
}},"iframe":{style:function(states){return {decorator:SSSS_3};
}},"resizer":{style:function(states){return {decorator:SSSS_214};
}},"splitpane":{style:function(states){return {decorator:SSSS_129};
}},"splitpane/splitter":{style:function(states){return {width:states.horizontal?3:undefined,height:states.vertical?3:undefined,backgroundColor:SSSS_58};
}},"splitpane/splitter/knob":{style:function(states){return {source:states.horizontal?SSSS_201:SSSS_190};
}},"splitpane/slider":{style:function(states){return {width:states.horizontal?3:undefined,height:states.vertical?3:undefined,backgroundColor:SSSS_58};
}},"selectbox":{alias:SSSS_0,include:SSSS_0,style:function(states){return {padding:[2,8]};
}},"selectbox/atom":SSSS_1,"selectbox/popup":SSSS_23,"selectbox/list":{alias:SSSS_25},"selectbox/arrow":{include:SSSS_6,style:function(states){return {source:SSSS_12,paddingLeft:5};
}},"datechooser":{style:function(states){var decorator;
var focused=!!states.focused;
var invalid=!!states.invalid;
var disabled=!!states.disabled;

if(focused&&invalid&&!disabled){decorator=SSSS_19;
}else if(focused&&!invalid&&!disabled){decorator=SSSS_22;
}else if(disabled){decorator=SSSS_17;
}else if(!focused&&invalid&&!disabled){decorator=SSSS_15;
}else{decorator=SSSS_16;
}return {padding:2,decorator:decorator,backgroundColor:SSSS_9};
}},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:SSSS_0,alias:SSSS_0,style:function(states){var result={padding:[2,4],shadow:undefined};

if(states.lastYear){result.icon=SSSS_169;
result.marginRight=1;
}else if(states.lastMonth){result.icon=SSSS_52;
}else if(states.nextYear){result.icon=SSSS_156;
result.marginLeft=1;
}else if(states.nextMonth){result.icon=SSSS_35;
}return result;
}},"datechooser/last-year-button-tooltip":SSSS_24,"datechooser/last-month-button-tooltip":SSSS_24,"datechooser/next-year-button-tooltip":SSSS_24,"datechooser/next-month-button-tooltip":SSSS_24,"datechooser/last-year-button":SSSS_29,"datechooser/last-month-button":SSSS_29,"datechooser/next-month-button":SSSS_29,"datechooser/next-year-button":SSSS_29,"datechooser/month-year-label":{style:function(states){return {font:SSSS_7,textAlign:SSSS_31,textColor:states.disabled?SSSS_10:undefined};
}},"datechooser/date-pane":{style:function(states){return {textColor:states.disabled?SSSS_10:undefined,marginTop:2};
}},"datechooser/weekday":{style:function(states){return {textColor:states.disabled?SSSS_10:states.weekend?SSSS_54:undefined,textAlign:SSSS_31,paddingTop:2,backgroundColor:SSSS_69};
}},"datechooser/week":{style:function(states){return {textAlign:SSSS_31,padding:[2,4],backgroundColor:SSSS_69};
}},"datechooser/day":{style:function(states){return {textAlign:SSSS_31,decorator:states.disabled?undefined:states.selected?SSSS_14:undefined,textColor:states.disabled?SSSS_10:states.selected?SSSS_5:states.otherMonth?SSSS_54:undefined,font:states.today?SSSS_7:undefined,padding:[2,4]};
}},"combobox":{style:function(states){var decorator;
var focused=!!states.focused;
var invalid=!!states.invalid;
var disabled=!!states.disabled;

if(focused&&invalid&&!disabled){decorator=SSSS_19;
}else if(focused&&!invalid&&!disabled){decorator=SSSS_22;
}else if(disabled){decorator=SSSS_17;
}else if(!focused&&invalid&&!disabled){decorator=SSSS_15;
}else{decorator=SSSS_16;
}return {decorator:decorator};
}},"combobox/popup":SSSS_23,"combobox/list":{alias:SSSS_25},"combobox/button":{include:SSSS_0,alias:SSSS_0,style:function(states){var ret={icon:SSSS_12,padding:2};

if(states.selected){ret.decorator=SSSS_53;
}return ret;
}},"combobox/textfield":{include:SSSS_33,style:function(states){return {decorator:undefined};
}},"menu":{style:function(states){var result={decorator:SSSS_87,shadow:SSSS_67,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,placementModeY:states.submenu||states.contextmenu?SSSS_147:SSSS_181};

if(states.submenu){result.position=SSSS_40;
result.offset=[-2,-3];
}return result;
}},"menu/slidebar":SSSS_118,"menu-slidebar":SSSS_2,"menu-slidebar-button":{style:function(states){return {decorator:states.hovered?SSSS_14:undefined,padding:7,center:true};
}},"menu-slidebar/button-backward":{include:SSSS_55,style:function(states){return {icon:states.hovered?SSSS_207:SSSS_71};
}},"menu-slidebar/button-forward":{include:SSSS_55,style:function(states){return {icon:states.hovered?SSSS_199:SSSS_12};
}},"menu-separator":{style:function(states){return {height:0,decorator:SSSS_213,margin:[4,2]};
}},"menu-button":{alias:SSSS_1,style:function(states){return {decorator:states.selected?SSSS_14:undefined,textColor:states.selected?SSSS_5:undefined,padding:[4,6]};
}},"menu-button/icon":{include:SSSS_6,style:function(states){return {alignY:SSSS_8};
}},"menu-button/label":{include:SSSS_34,style:function(states){return {alignY:SSSS_8,padding:1};
}},"menu-button/shortcut":{include:SSSS_34,style:function(states){return {alignY:SSSS_8,marginLeft:14,padding:1};
}},"menu-button/arrow":{include:SSSS_6,style:function(states){return {source:states.selected?SSSS_215:SSSS_35,alignY:SSSS_8};
}},"menu-checkbox":{alias:SSSS_18,include:SSSS_18,style:function(states){return {icon:!states.checked?undefined:states.selected?SSSS_192:SSSS_200};
}},"menu-radiobutton":{alias:SSSS_18,include:SSSS_18,style:function(states){return {icon:!states.checked?undefined:states.selected?SSSS_178:SSSS_155};
}},"menubar":{style:function(states){return {decorator:SSSS_114};
}},"menubar-button":{alias:SSSS_1,style:function(states){return {decorator:states.pressed||states.hovered?SSSS_14:undefined,textColor:states.pressed||states.hovered?SSSS_5:undefined,padding:[3,8]};
}},"colorselector":SSSS_2,"colorselector/control-bar":SSSS_2,"colorselector/control-pane":SSSS_2,"colorselector/visual-pane":SSSS_11,"colorselector/preset-grid":SSSS_2,"colorselector/colorbucket":{style:function(states){return {decorator:SSSS_3,width:16,height:16};
}},"colorselector/preset-field-set":SSSS_11,"colorselector/input-field-set":SSSS_11,"colorselector/preview-field-set":SSSS_11,"colorselector/hex-field-composite":SSSS_2,"colorselector/hex-field":SSSS_33,"colorselector/rgb-spinner-composite":SSSS_2,"colorselector/rgb-spinner-red":SSSS_21,"colorselector/rgb-spinner-green":SSSS_21,"colorselector/rgb-spinner-blue":SSSS_21,"colorselector/hsb-spinner-composite":SSSS_2,"colorselector/hsb-spinner-hue":SSSS_21,"colorselector/hsb-spinner-saturation":SSSS_21,"colorselector/hsb-spinner-brightness":SSSS_21,"colorselector/preview-content-old":{style:function(states){return {decorator:SSSS_3,width:50,height:10};
}},"colorselector/preview-content-new":{style:function(states){return {decorator:SSSS_3,backgroundColor:SSSS_9,width:50,height:10};
}},"colorselector/hue-saturation-field":{style:function(states){return {decorator:SSSS_3,margin:5};
}},"colorselector/brightness-field":{style:function(states){return {decorator:SSSS_3,margin:[5,7]};
}},"colorselector/hue-saturation-pane":SSSS_2,"colorselector/hue-saturation-handle":SSSS_2,"colorselector/brightness-pane":SSSS_2,"colorselector/brightness-handle":SSSS_2,"colorpopup":{alias:SSSS_23,include:SSSS_23,style:function(states){return {padding:5,backgroundColor:SSSS_36};
}},"colorpopup/field":{style:function(states){return {decorator:SSSS_3,margin:2,width:14,height:14,backgroundColor:SSSS_9};
}},"colorpopup/selector-button":SSSS_4,"colorpopup/auto-button":SSSS_4,"colorpopup/preview-pane":SSSS_11,"colorpopup/current-preview":{style:function(state){return {height:20,padding:4,marginLeft:4,decorator:SSSS_3,allowGrowX:true};
}},"colorpopup/selected-preview":{style:function(state){return {height:20,padding:4,marginRight:4,decorator:SSSS_3,allowGrowX:true};
}},"colorpopup/colorselector-okbutton":{alias:SSSS_4,include:SSSS_4,style:function(states){return {icon:SSSS_173};
}},"colorpopup/colorselector-cancelbutton":{alias:SSSS_4,include:SSSS_4,style:function(states){return {icon:SSSS_115};
}},"table":{alias:SSSS_2,style:function(states){return {decorator:SSSS_70};
}},"table-header":{},"table/statusbar":{style:function(states){return {decorator:SSSS_194,padding:[0,2]};
}},"table/column-button":{alias:SSSS_0,style:function(states){return {decorator:SSSS_95,padding:3,icon:SSSS_154};
}},"table-column-reset-button":{include:SSSS_18,alias:SSSS_18,style:function(){return {icon:SSSS_217};
}},"table-scroller":SSSS_2,"table-scroller/scrollbar-x":SSSS_28,"table-scroller/scrollbar-y":SSSS_28,"table-scroller/header":{style:function(states){return {decorator:SSSS_104};
}},"table-scroller/pane":{style:function(states){return {backgroundColor:SSSS_107};
}},"table-scroller/focus-indicator":{style:function(states){return {decorator:SSSS_82};
}},"table-scroller/resize-line":{style:function(states){return {backgroundColor:SSSS_137,width:2};
}},"table-header-cell":{alias:SSSS_1,style:function(states){return {minWidth:13,minHeight:20,padding:states.hovered?[3,4,2,4]:[3,4],decorator:states.hovered?SSSS_175:SSSS_86,sortIcon:states.sorted?(states.sortedAscending?SSSS_206:SSSS_157):undefined};
}},"table-header-cell/label":{style:function(states){return {minWidth:0,alignY:SSSS_8,paddingRight:5};
}},"table-header-cell/sort-icon":{style:function(states){return {alignY:SSSS_8,alignX:SSSS_45};
}},"table-header-cell/icon":{style:function(states){return {minWidth:0,alignY:SSSS_8,paddingRight:5};
}},"table-editor-textfield":{include:SSSS_33,style:function(states){return {decorator:undefined,padding:[2,2],backgroundColor:SSSS_9};
}},"table-editor-selectbox":{include:SSSS_65,alias:SSSS_65,style:function(states){return {padding:[0,2],backgroundColor:SSSS_9};
}},"table-editor-combobox":{include:SSSS_39,alias:SSSS_39,style:function(states){return {decorator:undefined,backgroundColor:SSSS_9};
}},"progressive-table-header":{alias:SSSS_2,style:function(states){return {decorator:SSSS_153};
}},"progressive-table-header-cell":{alias:SSSS_1,style:function(states){return {minWidth:40,minHeight:25,paddingLeft:6,decorator:SSSS_212};
}},"app-header":{style:function(states){return {font:SSSS_7,textColor:SSSS_5,padding:[8,12],decorator:SSSS_88};
}},"virtual-list":SSSS_25,"virtual-list/row-layer":SSSS_89,"row-layer":{style:function(states){return {colorEven:SSSS_51,colorOdd:SSSS_172};
}},"column-layer":SSSS_2,"cell":{style:function(states){return {textColor:states.selected?SSSS_5:SSSS_48,padding:[3,6],font:SSSS_61};
}},"cell-string":SSSS_13,"cell-number":{include:SSSS_13,style:function(states){return {textAlign:SSSS_45};
}},"cell-image":SSSS_13,"cell-boolean":{include:SSSS_13,style:function(states){return {iconTrue:SSSS_85,iconFalse:SSSS_164};
}},"cell-atom":SSSS_13,"cell-date":SSSS_13,"cell-html":SSSS_13}});
})();
(function(){var SSSS_0="gui4.theme.Appearance";
qx.Theme.define(SSSS_0,{extend:qx.theme.modern.Appearance,appearances:{}});
})();
(function(){var SSSS_0="gui4.theme.Theme";
qx.Theme.define(SSSS_0,{meta:{color:gui4.theme.Color,decoration:gui4.theme.Decoration,font:gui4.theme.Font,icon:qx.theme.icon.Tango,appearance:gui4.theme.Appearance}});
})();
(function(){var SSSS_0="emulated",SSSS_1="native",SSSS_2='"',SSSS_3="qx.lang.Core",SSSS_4="\\\\",SSSS_5="\\\"",SSSS_6="[object Error]";
qx.Bootstrap.define(SSSS_3,{statics:{errorToString:qx.lang.Object.select((!Error.prototype.toString||Error.prototype.toString()==SSSS_6)?SSSS_0:SSSS_1,{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}),arrayIndexOf:qx.lang.Object.select(Array.prototype.indexOf?SSSS_1:SSSS_0,{"native":Array.prototype.indexOf,"emulated":function(searchElement,fromIndex){if(fromIndex==null){fromIndex=0;
}else if(fromIndex<0){fromIndex=Math.max(0,this.length+fromIndex);
}
for(var i=fromIndex;i<this.length;i++){if(this[i]===searchElement){return i;
}}return -1;
}}),arrayLastIndexOf:qx.lang.Object.select(Array.prototype.lastIndexOf?SSSS_1:SSSS_0,{"native":Array.prototype.lastIndexOf,"emulated":function(searchElement,fromIndex){if(fromIndex==null){fromIndex=this.length-1;
}else if(fromIndex<0){fromIndex=Math.max(0,this.length+fromIndex);
}
for(var i=fromIndex;i>=0;i--){if(this[i]===searchElement){return i;
}}return -1;
}}),arrayForEach:qx.lang.Object.select(Array.prototype.forEach?SSSS_1:SSSS_0,{"native":Array.prototype.forEach,"emulated":function(callback,obj){var l=this.length;

for(var i=0;i<l;i++){var value=this[i];

if(value!==undefined){callback.call(obj||window,value,i,this);
}}}}),arrayFilter:qx.lang.Object.select(Array.prototype.filter?SSSS_1:SSSS_0,{"native":Array.prototype.filter,"emulated":function(callback,obj){var res=[];
var l=this.length;

for(var i=0;i<l;i++){var value=this[i];

if(value!==undefined){if(callback.call(obj||window,value,i,this)){res.push(this[i]);
}}}return res;
}}),arrayMap:qx.lang.Object.select(Array.prototype.map?SSSS_1:SSSS_0,{"native":Array.prototype.map,"emulated":function(callback,obj){var res=[];
var l=this.length;

for(var i=0;i<l;i++){var value=this[i];

if(value!==undefined){res[i]=callback.call(obj||window,value,i,this);
}}return res;
}}),arraySome:qx.lang.Object.select(Array.prototype.some?SSSS_1:SSSS_0,{"native":Array.prototype.some,"emulated":function(callback,obj){var l=this.length;

for(var i=0;i<l;i++){var value=this[i];

if(value!==undefined){if(callback.call(obj||window,value,i,this)){return true;
}}}return false;
}}),arrayEvery:qx.lang.Object.select(Array.prototype.every?SSSS_1:SSSS_0,{"native":Array.prototype.every,"emulated":function(callback,obj){var l=this.length;

for(var i=0;i<l;i++){var value=this[i];

if(value!==undefined){if(!callback.call(obj||window,value,i,this)){return false;
}}}return true;
}}),stringQuote:qx.lang.Object.select(String.prototype.quote?SSSS_1:SSSS_0,{"native":String.prototype.quote,"emulated":function(){return SSSS_2+this.replace(/\\/g,SSSS_4).replace(/\"/g,SSSS_5)+SSSS_2;
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
(function(){var SSSS_0="indexOf",SSSS_1="lastIndexOf",SSSS_2="slice",SSSS_3="concat",SSSS_4="join",SSSS_5="toLocaleUpperCase",SSSS_6="shift",SSSS_7="substr",SSSS_8="filter",SSSS_9="unshift",SSSS_10="match",SSSS_11="quote",SSSS_12="qx.lang.Generics",SSSS_13="localeCompare",SSSS_14="sort",SSSS_15="some",SSSS_16="charAt",SSSS_17="split",SSSS_18="substring",SSSS_19="pop",SSSS_20="toUpperCase",SSSS_21="replace",SSSS_22="push",SSSS_23="charCodeAt",SSSS_24="every",SSSS_25="reverse",SSSS_26="search",SSSS_27="forEach",SSSS_28="map",SSSS_29="toLowerCase",SSSS_30="splice",SSSS_31="toLocaleLowerCase";
qx.Bootstrap.define(SSSS_12,{statics:{__bP:{"Array":[SSSS_4,SSSS_25,SSSS_14,SSSS_22,SSSS_19,SSSS_6,SSSS_9,SSSS_30,SSSS_3,SSSS_2,SSSS_0,SSSS_1,SSSS_27,SSSS_28,SSSS_8,SSSS_15,SSSS_24],"String":[SSSS_11,SSSS_18,SSSS_29,SSSS_20,SSSS_16,SSSS_23,SSSS_0,SSSS_1,SSSS_31,SSSS_5,SSSS_13,SSSS_10,SSSS_26,SSSS_21,SSSS_17,SSSS_7,SSSS_3,SSSS_2]},__bQ:function(obj,func){return function(s){return obj.prototype[func].apply(s,Array.prototype.slice.call(arguments,1));
};
},__bR:function(){var map=qx.lang.Generics.__bP;

for(var key in map){var obj=window[key];
var arr=map[key];

for(var i=0,l=arr.length;i<l;i++){var func=arr[i];

if(!obj[func]){obj[func]=qx.lang.Generics.__bQ(obj,func);
}}}}},defer:function(statics){statics.__bR();
}});
})();
(function(){var SSSS_0="qx.event.type.Data",SSSS_1="qx.event.type.Event",SSSS_2="qx.data.IListData";
qx.Interface.define(SSSS_2,{events:{"change":SSSS_0,"changeLength":SSSS_1},members:{getItem:function(index){},setItem:function(index,item){},splice:function(startIndex,amount,varargs){},contains:function(item){},getLength:function(){},toArray:function(){}}});
})();
(function(){var SSSS_0="qx.lang.Date";
qx.Bootstrap.define(SSSS_0,{statics:{now:function(){return +new Date;
}}});
})();
(function(){var SSSS_0="qx.globalErrorHandling",SSSS_1="on",SSSS_2="qx.event.GlobalError";
qx.Bootstrap.define(SSSS_2,{statics:{setErrorHandler:function(callback,context){this.__bS=callback||null;
this.__bT=context||window;

if(qx.core.Setting.get(SSSS_0)===SSSS_1){if(callback&&!window.onerror){window.onerror=qx.lang.Function.bind(this.__bU,this);
}
if(!callback&&window.onerror){window.onerror=null;
}}},__bU:function(msg,uri,lineNumber){if(this.__bS){this.handleError(new qx.core.WindowError(msg,uri,lineNumber));
return true;
}},observeMethod:function(method){if(qx.core.Setting.get(SSSS_0)===SSSS_1){var self=this;
return function(){if(!self.__bS){return method.apply(this,arguments);
}
try{return method.apply(this,arguments);
}catch(ex){self.handleError(ex);
}};
}else{return method;
}},handleError:function(ex){if(this.__bS){this.__bS.call(this.__bT,ex);
}}},defer:function(statics){qx.core.Setting.define(SSSS_0,SSSS_1);
statics.setErrorHandler(null,null);
}});
})();
(function(){var SSSS_0="",SSSS_1="qx.core.WindowError";
qx.Class.define(SSSS_1,{extend:Error,construct:function(failMessage,uri,lineNumber){Error.call(this,failMessage);
this.__bV=failMessage;
this.__bW=uri||SSSS_0;
this.__bX=lineNumber===undefined?-1:lineNumber;
},members:{__bV:null,__bW:null,__bX:null,toString:function(){return this.__bV;
},getUri:function(){return this.__bW;
},getLineNumber:function(){return this.__bX;
}}});
})();
(function(){var SSSS_0="qx.event.type.Event";
qx.Class.define(SSSS_0,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(canBubble,cancelable){{};
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
},stop:function(){this.stopPropagation();
this.preventDefault();
},stopPropagation:function(){{};
this._stopPropagation=true;
},getPropagationStopped:function(){return !!this._stopPropagation;
},preventDefault:function(){{};
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
}},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;
}});
})();
(function(){var SSSS_0="qx.event.type.Data";
qx.Class.define(SSSS_0,{extend:qx.event.type.Event,members:{__bY:null,__ca:null,init:function(data,old,cancelable){arguments.callee.base.call(this,false,cancelable);
this.__bY=data;
this.__ca=old;
return this;
},clone:function(embryo){var clone=arguments.callee.base.call(this,embryo);
clone.__bY=this.__bY;
clone.__ca=this.__ca;
return clone;
},getData:function(){return this.__bY;
},getOldData:function(){return this.__ca;
}},destruct:function(){this.__bY=this.__ca=null;
}});
})();
(function(){var SSSS_0="qx.event.IEventHandler";
qx.Interface.define(SSSS_0,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:3},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){}}});
})();
(function(){var SSSS_0="load",SSSS_1="unload",SSSS_2="qx.client",SSSS_3="ready",SSSS_4="mshtml",SSSS_5="qx.event.handler.Application",SSSS_6="complete",SSSS_7="gecko|opera|webkit",SSSS_8="left",SSSS_9="DOMContentLoaded",SSSS_10="shutdown";
qx.Class.define(SSSS_5,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
this._window=manager.getWindow();
this.__cb=false;
this.__cc=false;
this._initObserver();
qx.event.handler.Application.$$instance=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,__cd:false,onScriptLoaded:function(){this.__cd=true;
var inst=qx.event.handler.Application.$$instance;

if(inst){inst.__cg();
}}},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){},__ce:null,__cb:null,__cc:null,__cf:null,__cg:function(){var clazz=qx.event.handler.Application;
if(!this.__ce&&this.__cb&&clazz.__cd){this.__ce=true;
qx.event.Registration.fireEvent(this._window,SSSS_3);
}},isApplicationReady:function(){return this.__ce;
},_initObserver:function(){if(qx.$$domReady||document.readyState==SSSS_6){this.__cb=true;
this.__cg();
}else{this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);

if(qx.core.Variant.isSet(SSSS_2,SSSS_7)){qx.bom.Event.addNativeListener(this._window,SSSS_9,this._onNativeLoadWrapped);
}else if(qx.core.Variant.isSet(SSSS_2,SSSS_4)){var self=this;
var timer=function(){try{document.documentElement.doScroll(SSSS_8);

if(document.body){self._onNativeLoadWrapped();
}}catch(error){window.setTimeout(timer,100);
}};
timer();
}qx.bom.Event.addNativeListener(this._window,SSSS_0,this._onNativeLoadWrapped);
}this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);
qx.bom.Event.addNativeListener(this._window,SSSS_1,this._onNativeUnloadWrapped);
},_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,SSSS_0,this._onNativeLoadWrapped);
}qx.bom.Event.removeNativeListener(this._window,SSSS_1,this._onNativeUnloadWrapped);
this._onNativeLoadWrapped=null;
this._onNativeUnloadWrapped=null;
},_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__cb=true;
this.__cg();
}),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__cf){this.__cf=true;

try{qx.event.Registration.fireEvent(this._window,SSSS_10);
}catch(e){throw e;
}finally{qx.core.ObjectRegistry.shutdown();
}}})},destruct:function(){this._stopObserver();
this._window=null;
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
})();
(function(){var SSSS_0=":",SSSS_1="qx.client",SSSS_2="anonymous",SSSS_3="...",SSSS_4="qx.dev.StackTrace",SSSS_5="",SSSS_6="\n",SSSS_7="/source/class/",SSSS_8=".";
qx.Bootstrap.define(SSSS_4,{statics:{getStackTrace:qx.core.Variant.select(SSSS_1,{"gecko":function(){try{throw new Error();
}catch(ex){var errorTrace=this.getStackTraceFromError(ex);
qx.lang.Array.removeAt(errorTrace,0);
var callerTrace=this.getStackTraceFromCaller(arguments);
var trace=callerTrace.length>errorTrace.length?callerTrace:errorTrace;

for(var i=0;i<Math.min(callerTrace.length,errorTrace.length);i++){var callerCall=callerTrace[i];

if(callerCall.indexOf(SSSS_2)>=0){continue;
}var callerArr=callerCall.split(SSSS_0);

if(callerArr.length!=2){continue;
}var callerClassName=callerArr[0];
var methodName=callerArr[1];
var errorCall=errorTrace[i];
var errorArr=errorCall.split(SSSS_0);
var errorClassName=errorArr[0];
var lineNumber=errorArr[1];

if(qx.Class.getByName(errorClassName)){var className=errorClassName;
}else{className=callerClassName;
}var line=className+SSSS_0;

if(methodName){line+=methodName+SSSS_0;
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
}}),getStackTraceFromCaller:qx.core.Variant.select(SSSS_1,{"opera":function(args){return [];
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

if(knownFunction[hash]){trace.push(SSSS_3);
break;
}knownFunction[hash]=fcn;
}return trace;
}}),getStackTraceFromError:qx.core.Variant.select(SSSS_1,{"gecko":function(error){if(!error.stack){return [];
}var lineRe=/@(.+):(\d+)$/gm;
var hit;
var trace=[];

while((hit=lineRe.exec(error.stack))!=null){var url=hit[1];
var lineNumber=hit[2];
var className=this.__ch(url);
trace.push(className+SSSS_0+lineNumber);
}return trace;
},"webkit":function(error){if(error.sourceURL&&error.line){return [this.__ch(error.sourceURL)+SSSS_0+error.line];
}else{return [];
}},"opera":function(error){if(error.message.indexOf("Backtrace:")<0){return [];
}var trace=[];
var traceString=qx.lang.String.trim(error.message.split("Backtrace:")[1]);
var lines=traceString.split(SSSS_6);

for(var i=0;i<lines.length;i++){var reResult=lines[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(reResult&&reResult.length>=2){var lineNumber=reResult[1];
var fileName=this.__ch(reResult[2]);
trace.push(fileName+SSSS_0+lineNumber);
}}return trace;
},"default":function(){return [];
}}),__ch:function(fileName){var scriptDir=SSSS_7;
var jsPos=fileName.indexOf(scriptDir);
var className=(jsPos==-1)?fileName:fileName.substring(jsPos+scriptDir.length).replace(/\//g,SSSS_8).replace(/\.js$/,SSSS_5);
return className;
}}});
})();
(function(){var SSSS_0="qx.util.ObjectPool",SSSS_1="Integer";
qx.Class.define(SSSS_0,{extend:qx.core.Object,construct:function(size){arguments.callee.base.call(this);
this.__ci={};

if(size!=null){this.setSize(size);
}},properties:{size:{check:SSSS_1,init:Infinity}},members:{__ci:null,getObject:function(clazz){if(this.$$disposed){return;
}
if(!clazz){throw new Error("Class needs to be defined!");
}var obj=null;
var pool=this.__ci[clazz.classname];

if(pool){obj=pool.pop();
}
if(obj){obj.$$pooled=false;
}else{obj=new clazz;
}return obj;
},poolObject:function(obj){if(!this.__ci){return;
}var classname=obj.classname;
var pool=this.__ci[classname];

if(obj.$$pooled){throw new Error("Object is already pooled: "+obj);
}
if(!pool){this.__ci[classname]=pool=[];
}if(pool.length>this.getSize()){if(obj.destroy){obj.destroy();
}else{obj.dispose();
}return;
}obj.$$pooled=true;
pool.push(obj);
}},destruct:function(){var pool=this.__ci;
var classname,list,i,l;

for(classname in pool){list=pool[classname];

for(i=0,l=list.length;i<l;i++){list[i].dispose();
}}delete this.__ci;
}});
})();
(function(){var SSSS_0="singleton",SSSS_1="qx.event.Pool";
qx.Class.define(SSSS_1,{extend:qx.util.ObjectPool,type:SSSS_0,construct:function(){arguments.callee.base.call(this,30);
}});
})();
(function(){var SSSS_0="Don't use 'disposeFields' - instead assign directly to 'null'",SSSS_1="qx.util.DisposeUtil";
qx.Class.define(SSSS_1,{statics:{disposeFields:function(obj,arr){qx.log.Logger.deprecatedMethodWarning(arguments.callee,SSSS_0);
var name;

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
},disposeTriggeredBy:function(disposeMe,trigger){var triggerDispose=trigger.dispose;
trigger.dispose=function(){triggerDispose.call(trigger);
disposeMe.dispose();
};
}}});
})();
(function(){var SSSS_0="qx.event.IEventDispatcher";
qx.Interface.define(SSSS_0,{members:{canDispatchEvent:function(target,event,type){this.assertInstance(event,qx.event.type.Event);
this.assertString(type);
},dispatchEvent:function(target,event,type){this.assertInstance(event,qx.event.type.Event);
this.assertString(type);
}}});
})();
(function(){var SSSS_0="qx.event.dispatch.Direct";
qx.Class.define(SSSS_0,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(manager){this._manager=manager;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(target,event,type){return !event.getBubbles();
},dispatchEvent:function(target,event,type){event.setEventPhase(qx.event.type.Event.AT_TARGET);
var listeners=this._manager.getListeners(target,type,false);

if(listeners){for(var i=0,l=listeners.length;i<l;i++){var context=listeners[i].context||target;
listeners[i].handler.call(context,event);
}}}},defer:function(statics){qx.event.Registration.addDispatcher(statics);
}});
})();
(function(){var SSSS_0="get",SSSS_1="",SSSS_2="[",SSSS_3="]",SSSS_4="last",SSSS_5="change",SSSS_6=".",SSSS_7="Number",SSSS_8="String",SSSS_9="set",SSSS_10="deepBinding",SSSS_11="item",SSSS_12="reset",SSSS_13="' (",SSSS_14="Boolean",SSSS_15=").",SSSS_16=") to the object '",SSSS_17="Integer",SSSS_18="qx.data.SingleValueBinding",SSSS_19="No event could be found for the property",SSSS_20="PositiveNumber",SSSS_21="Binding from '",SSSS_22="PositiveInteger",SSSS_23="Binding does not exist!",SSSS_24="Date";
qx.Class.define(SSSS_18,{statics:{DEBUG_ON:false,__cj:{},bind:function(sourceObject,sourcePropertyChain,targetObject,targetProperty,options){var propertyNames=sourcePropertyChain.split(SSSS_6);
var arrayIndexValues=this.__cq(propertyNames);
var sources=[];
var listeners=[];
var listenerIds=[];
var eventNames=[];
var source=sourceObject;
for(var i=0;i<propertyNames.length;i++){if(arrayIndexValues[i]!==SSSS_1){eventNames.push(SSSS_5);
}else{eventNames.push(this.__cl(source,propertyNames[i]));
}sources[i]=source;
if(i==propertyNames.length-1){if(arrayIndexValues[i]!==SSSS_1){var itemIndex=arrayIndexValues[i]===SSSS_4?source.length-1:arrayIndexValues[i];
var currentValue=source.getItem(itemIndex);
this.__cp(currentValue,targetObject,targetProperty,options,sourceObject);
listenerIds[i]=this.__cr(source,eventNames[i],targetObject,targetProperty,options,arrayIndexValues[i]);
}else{if(propertyNames[i]!=null&&source[SSSS_0+qx.lang.String.firstUp(propertyNames[i])]!=null){var currentValue=source[SSSS_0+qx.lang.String.firstUp(propertyNames[i])]();
this.__cp(currentValue,targetObject,targetProperty,options,sourceObject);
}listenerIds[i]=this.__cr(source,eventNames[i],targetObject,targetProperty,options);
}}else{var context={index:i,propertyNames:propertyNames,sources:sources,listenerIds:listenerIds,arrayIndexValues:arrayIndexValues,targetObject:targetObject,targetProperty:targetProperty,options:options,listeners:listeners};
var listener=qx.lang.Function.bind(this.__ck,this,context);
listeners.push(listener);
listenerIds[i]=source.addListener(eventNames[i],listener);
}if(source[SSSS_0+qx.lang.String.firstUp(propertyNames[i])]==null){source=null;
}else if(arrayIndexValues[i]!==SSSS_1){source=source[SSSS_0+qx.lang.String.firstUp(propertyNames[i])](arrayIndexValues[i]);
}else{source=source[SSSS_0+qx.lang.String.firstUp(propertyNames[i])]();
}
if(!source){break;
}}var id={type:SSSS_10,listenerIds:listenerIds,sources:sources};
this.__cs(id,sourceObject,sourcePropertyChain,targetObject,targetProperty);
return id;
},__ck:function(context){if(context.options&&context.options.onUpdate){context.options.onUpdate(context.sources[context.index],context.targetObject);
}for(var j=context.index+1;j<context.propertyNames.length;j++){var source=context.sources[j];
context.sources[j]=null;

if(!source){continue;
}source.removeListenerById(context.listenerIds[j]);
}var source=context.sources[context.index];
for(var j=context.index+1;j<context.propertyNames.length;j++){if(context.arrayIndexValues[j-1]!==SSSS_1){source=source[SSSS_0+qx.lang.String.firstUp(context.propertyNames[j-1])](context.arrayIndexValues[j-1]);
}else{source=source[SSSS_0+qx.lang.String.firstUp(context.propertyNames[j-1])]();
}context.sources[j]=source;
if(!source){this.__cm(context.targetObject,context.targetProperty);
break;
}if(j==context.propertyNames.length-1){if(qx.Class.implementsInterface(source,qx.data.IListData)){var itemIndex=context.arrayIndexValues[j]===SSSS_4?source.length-1:context.arrayIndexValues[j];
var currentValue=source.getItem(itemIndex);
this.__cp(currentValue,context.targetObject,context.targetProperty,context.options,context.sources[context.index]);
context.listenerIds[j]=this.__cr(source,SSSS_5,context.targetObject,context.targetProperty,context.options,context.arrayIndexValues[j]);
}else{if(context.propertyNames[j]!=null&&source[SSSS_0+qx.lang.String.firstUp(context.propertyNames[j])]!=null){var currentValue=source[SSSS_0+qx.lang.String.firstUp(context.propertyNames[j])]();
this.__cp(currentValue,context.targetObject,context.targetProperty,context.options,context.sources[context.index]);
}var eventName=this.__cl(source,context.propertyNames[j]);
context.listenerIds[j]=this.__cr(source,eventName,context.targetObject,context.targetProperty,context.options);
}}else{if(context.listeners[j]==null){var listener=qx.lang.Function.bind(this.__ck,this,context);
context.listeners.push(listener);
}if(qx.Class.implementsInterface(source,qx.data.IListData)){var eventName=SSSS_5;
}else{var eventName=this.__cl(source,context.propertyNames[j]);
}context.listenerIds[j]=source.addListener(eventName,context.listeners[j]);
}}},__cl:function(source,propertyname){var eventName=this.__cu(source,propertyname);
if(eventName==null){if(qx.Class.supportsEvent(source.constructor,propertyname)){eventName=propertyname;
}else if(qx.Class.supportsEvent(source.constructor,SSSS_5+qx.lang.String.firstUp(propertyname))){eventName=SSSS_5+qx.lang.String.firstUp(propertyname);
}else{throw new qx.core.AssertionError(SSSS_19,propertyname);
}}return eventName;
},__cm:function(targetObject,targetPropertyChain){var target=this.__co(targetObject,targetPropertyChain);

if(target!=null){var lastProperty=targetPropertyChain.substring(targetPropertyChain.lastIndexOf(SSSS_6)+1,targetPropertyChain.length);
if(lastProperty.charAt(lastProperty.length-1)==SSSS_3){this.__cn(targetObject,targetPropertyChain,null);
return;
}if(target[SSSS_12+qx.lang.String.firstUp(lastProperty)]!=undefined){target[SSSS_12+qx.lang.String.firstUp(lastProperty)]();
}else{target[SSSS_9+qx.lang.String.firstUp(lastProperty)](null);
}}},__cn:function(targetObject,targetPropertyChain,value){var target=this.__co(targetObject,targetPropertyChain);

if(target!=null){var lastProperty=targetPropertyChain.substring(targetPropertyChain.lastIndexOf(SSSS_6)+1,targetPropertyChain.length);
if(lastProperty.charAt(lastProperty.length-1)==SSSS_3){var index=lastProperty.substring(lastProperty.lastIndexOf(SSSS_2)+1,lastProperty.length-1);
var prop=lastProperty.substring(0,lastProperty.lastIndexOf(SSSS_2));
var targetArray=target[SSSS_0+qx.lang.String.firstUp(prop)]();

if(index==SSSS_4){index=targetArray.length-1;
}
if(targetArray!=null){targetArray.setItem(index,value);
}}else{target[SSSS_9+qx.lang.String.firstUp(lastProperty)](value);
}}},__co:function(targetObject,targetPropertyChain){var properties=targetPropertyChain.split(SSSS_6);
var target=targetObject;
for(var i=0;i<properties.length-1;i++){try{var property=properties[i];
if(property.indexOf(SSSS_3)==property.length-1){var index=property.substring(property.indexOf(SSSS_2)+1,property.length-1);
property=property.substring(0,property.indexOf(SSSS_2));
}target=target[SSSS_0+qx.lang.String.firstUp(property)]();

if(index!=null){if(index==SSSS_4){index=target.length-1;
}target=target.getItem(index);
index=null;
}}catch(ex){return null;
}}return target;
},__cp:function(value,targetObject,targetPropertyChain,options,sourceObject){value=this.__ct(value,targetObject,targetPropertyChain,options);
if(value==null){this.__cm(targetObject,targetPropertyChain);
}if(value!=undefined){try{this.__cn(targetObject,targetPropertyChain,value);
if(options&&options.onUpdate){options.onUpdate(sourceObject,targetObject,value);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(options&&options.onSetFail){options.onSetFail(e);
}else{this.warn("Failed so set value "+value+" on "+targetObject+". Error message: "+e);
}}}},__cq:function(propertyNames){var arrayIndexValues=[];
for(var i=0;i<propertyNames.length;i++){var name=propertyNames[i];
if(qx.lang.String.endsWith(name,SSSS_3)){var arrayIndex=name.substring(name.indexOf(SSSS_2)+1,name.indexOf(SSSS_3));
if(name.indexOf(SSSS_3)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(arrayIndex!==SSSS_4){if(arrayIndex==SSSS_1||isNaN(parseInt(arrayIndex))){throw new Error("No number or 'last' value hast been given"+" in a array binding: "+name+" does not work.");
}}if(name.indexOf(SSSS_2)!=0){propertyNames[i]=name.substring(0,name.indexOf(SSSS_2));
arrayIndexValues[i]=SSSS_1;
arrayIndexValues[i+1]=arrayIndex;
propertyNames.splice(i+1,0,SSSS_11);
i++;
}else{arrayIndexValues[i]=arrayIndex;
propertyNames.splice(i,1,SSSS_11);
}}else{arrayIndexValues[i]=SSSS_1;
}}return arrayIndexValues;
},__cr:function(sourceObject,sourceEvent,targetObject,targetProperty,options,arrayIndex){var eventType;
{};
var bindListener=function(arrayIndex,e){if(arrayIndex!==SSSS_1){if(arrayIndex===SSSS_4){arrayIndex=sourceObject.length-1;
}var data=sourceObject.getItem(arrayIndex);
if(data==undefined){qx.data.SingleValueBinding.__cm(targetObject,targetProperty);
}var start=e.getData().start;
var end=e.getData().end;

if(arrayIndex<start||arrayIndex>end){return;
}}else{var data=e.getData();
}if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Binding executed from "+sourceObject+" by "+sourceEvent+" to "+targetObject+" ("+targetProperty+")");
qx.log.Logger.debug("Data before conversion: "+data);
}data=qx.data.SingleValueBinding.__ct(data,targetObject,targetProperty,options);
if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Data after conversion: "+data);
}try{if(data!=undefined){qx.data.SingleValueBinding.__cn(targetObject,targetProperty,data);
}else{qx.data.SingleValueBinding.__cm(targetObject,targetProperty);
}if(options&&options.onUpdate){options.onUpdate(sourceObject,targetObject,data);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(options&&options.onSetFail){options.onSetFail(e);
}else{this.warn("Failed so set value "+data+" on "+targetObject+". Error message: "+e);
}}};
if(!arrayIndex){arrayIndex=SSSS_1;
}bindListener=qx.lang.Function.bind(bindListener,sourceObject,arrayIndex);
var id=sourceObject.addListener(sourceEvent,bindListener);
return id;
},__cs:function(id,sourceObject,sourceEvent,targetObject,targetProperty){if(this.__cj[sourceObject.toHashCode()]===undefined){this.__cj[sourceObject.toHashCode()]=[];
}this.__cj[sourceObject.toHashCode()].push([id,sourceObject,sourceEvent,targetObject,targetProperty]);
},__ct:function(value,targetObject,targetPropertyChain,options){if(options&&options.converter){var model;

if(targetObject.getModel){model=targetObject.getModel();
}return options.converter(value,model);
}else{var target=this.__co(targetObject,targetPropertyChain);
var lastProperty=targetPropertyChain.substring(targetPropertyChain.lastIndexOf(SSSS_6)+1,targetPropertyChain.length);
if(target==null){return value;
}var propertieDefinition=qx.Class.getPropertyDefinition(target.constructor,lastProperty);
var check=propertieDefinition==null?SSSS_1:propertieDefinition.check;
return this.__cv(value,check);
}},__cu:function(sourceObject,sourceProperty){var propertieDefinition=qx.Class.getPropertyDefinition(sourceObject.constructor,sourceProperty);

if(propertieDefinition==null){return null;
}return propertieDefinition.event;
},__cv:function(data,targetCheck){var dataType=qx.lang.Type.getClass(data);
if((dataType==SSSS_7||dataType==SSSS_8)&&(targetCheck==SSSS_17||targetCheck==SSSS_22)){data=parseInt(data);
}if((dataType==SSSS_14||dataType==SSSS_7||dataType==SSSS_24)&&targetCheck==SSSS_8){data=data+SSSS_1;
}if((dataType==SSSS_7||dataType==SSSS_8)&&(targetCheck==SSSS_7||targetCheck==SSSS_20)){data=parseFloat(data);
}return data;
},removeBindingFromObject:function(sourceObject,id){if(id.type==SSSS_10){for(var i=0;i<id.sources.length;i++){if(id.sources[i]){id.sources[i].removeListenerById(id.listenerIds[i]);
}}}else{sourceObject.removeListenerById(id);
}var bindings=this.__cj[sourceObject.toHashCode()];
if(bindings!=undefined){for(var i=0;i<bindings.length;i++){if(bindings[i][0]==id){qx.lang.Array.remove(bindings,bindings[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(object){{};
var bindings=this.__cj[object.toHashCode()];

if(bindings!=undefined){for(var i=bindings.length-1;i>=0;i--){this.removeBindingFromObject(object,bindings[i][0]);
}}},getAllBindingsForObject:function(object){if(this.__cj[object.toHashCode()]===undefined){this.__cj[object.toHashCode()]=[];
}return this.__cj[object.toHashCode()];
},removeAllBindings:function(){for(var hash in this.__cj){var object=qx.core.ObjectRegistry.fromHashCode(hash);
if(object==null){delete this.__cj[hash];
continue;
}this.removeAllBindingsForObject(object);
}this.__cj={};
},getAllBindings:function(){return this.__cj;
},showBindingInLog:function(object,id){var binding;
for(var i=0;i<this.__cj[object.toHashCode()].length;i++){if(this.__cj[object.toHashCode()][i][0]==id){binding=this.__cj[object.toHashCode()][i];
break;
}}
if(binding===undefined){var message=SSSS_23;
}else{var message=SSSS_21+binding[1]+SSSS_13+binding[2]+SSSS_16+binding[3]+SSSS_13+binding[4]+SSSS_15;
}qx.log.Logger.debug(message);
},showAllBindingsInLog:function(){for(var hash in this.__cj){var object=qx.core.ObjectRegistry.fromHashCode(hash);

for(var i=0;i<this.__cj[hash].length;i++){this.showBindingInLog(object,this.__cj[hash][i][0]);
}}}}});
})();
(function(){var SSSS_0=": ",SSSS_1="qx.type.BaseError",SSSS_2="";
qx.Class.define(SSSS_1,{extend:Error,construct:function(comment,failMessage){Error.call(this,failMessage);
this.__cw=comment||SSSS_2;
this.message=failMessage||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__cw:null,message:null,getComment:function(){return this.__cw;
},toString:function(){return this.__cw+SSSS_0+this.message;
}}});
})();
(function(){var SSSS_0="qx.core.AssertionError";
qx.Class.define(SSSS_0,{extend:qx.type.BaseError,construct:function(comment,failMessage){qx.type.BaseError.call(this,comment,failMessage);
this.__cx=qx.dev.StackTrace.getStackTrace();
},members:{__cx:null,getStackTrace:function(){return this.__cx;
}}});
})();
(function(){var SSSS_0="qx.core.ValidationError";
qx.Class.define(SSSS_0,{extend:qx.type.BaseError});
})();
(function(){var SSSS_0="qx.event.handler.Object";
qx.Class.define(SSSS_0,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(target,type){return qx.Class.supportsEvent(target.constructor,type);
},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){}},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
})();
(function(){var SSSS_0="qx.util.ValueManager",SSSS_1="abstract";
qx.Class.define(SSSS_0,{type:SSSS_1,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this._dynamic={};
},members:{_dynamic:null,resolveDynamic:function(value){return this._dynamic[value];
},isDynamic:function(value){return !!this._dynamic[value];
},resolve:function(value){if(value&&this._dynamic[value]){return this._dynamic[value];
}return value;
},_setDynamic:function(value){this._dynamic=value;
},_getDynamic:function(){return this._dynamic;
}},destruct:function(){this._dynamic=null;
}});
})();
(function(){var SSSS_0="/",SSSS_1="0",SSSS_2="qx/static",SSSS_3="http://",SSSS_4="https://",SSSS_5="file://",SSSS_6="qx.util.AliasManager",SSSS_7="singleton",SSSS_8=".",SSSS_9="static";
qx.Class.define(SSSS_6,{type:SSSS_7,extend:qx.util.ValueManager,construct:function(){arguments.callee.base.call(this);
this.__cy={};
this.add(SSSS_9,SSSS_2);
},members:{__cy:null,_preprocess:function(value){var dynamics=this._getDynamic();

if(dynamics[value]===false){return value;
}else if(dynamics[value]===undefined){if(value.charAt(0)===SSSS_0||value.charAt(0)===SSSS_8||value.indexOf(SSSS_3)===0||value.indexOf(SSSS_4)===SSSS_1||value.indexOf(SSSS_5)===0){dynamics[value]=false;
return value;
}
if(this.__cy[value]){return this.__cy[value];
}var alias=value.substring(0,value.indexOf(SSSS_0));
var resolved=this.__cy[alias];

if(resolved!==undefined){dynamics[value]=resolved+value.substring(alias.length);
}}return value;
},add:function(alias,base){this.__cy[alias]=base;
var dynamics=this._getDynamic();
for(var path in dynamics){if(path.substring(0,path.indexOf(SSSS_0))===alias){dynamics[path]=base+path.substring(alias.length);
}}},remove:function(alias){delete this.__cy[alias];
},resolve:function(path){var dynamic=this._getDynamic();

if(path!==null){path=this._preprocess(path);
}return dynamic[path]||path;
}},destruct:function(){this.__cy=null;
}});
})();
(function(){var SSSS_0="qx.client",SSSS_1="img",SSSS_2="div",SSSS_3="mshtml",SSSS_4="",SSSS_5="px",SSSS_6='"/>',SSSS_7='" style="',SSSS_8='<div style="',SSSS_9="none",SSSS_10=".png",SSSS_11="png",SSSS_12="scale-x",SSSS_13="webkit",SSSS_14="scale-y",SSSS_15="scale",SSSS_16='<img src="',SSSS_17="qx.bom.element.Decoration",SSSS_18='"></div>',SSSS_19="absolute";
qx.Class.define(SSSS_17,{statics:{DEBUG:false,__pk:{},__cz:qx.core.Variant.isSet(SSSS_0,SSSS_3)&&qx.bom.client.Engine.VERSION<9,__cA:qx.core.Variant.select(SSSS_0,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__cB:{"scale-x":SSSS_1,"scale-y":SSSS_1,"scale":SSSS_1,"repeat":SSSS_2,"no-repeat":SSSS_2,"repeat-x":SSSS_2,"repeat-y":SSSS_2},update:function(element,source,repeat,style){var tag=this.getTagName(repeat,source);

if(tag!=element.tagName.toLowerCase()){throw new Error("Image modification not possible because elements could not be replaced at runtime anymore!");
}var ret=this.getAttributes(source,repeat,style);

if(tag===SSSS_1){element.src=ret.src;
}if(element.style.backgroundPosition!=SSSS_4&&ret.style.backgroundPosition===undefined){ret.style.backgroundPosition=null;
}if(element.style.clip!=SSSS_4&&ret.style.clip===undefined){ret.style.clip=null;
}var Style=qx.bom.element.Style;
Style.setStyles(element,ret.style);
},create:function(source,repeat,style){var tag=this.getTagName(repeat,source);
var ret=this.getAttributes(source,repeat,style);
var css=qx.bom.element.Style.compile(ret.style);

if(tag===SSSS_1){return SSSS_16+ret.src+SSSS_7+css+SSSS_6;
}else{return SSSS_8+css+SSSS_18;
}},getTagName:function(repeat,source){if(qx.core.Variant.isSet(SSSS_0,SSSS_3)){if(source&&this.__cz&&this.__cA[repeat]&&qx.lang.String.endsWith(source,SSSS_10)){return SSSS_2;
}}return this.__cB[repeat];
},getAttributes:function(source,repeat,style){if(!style){style={};
}
if(!style.position){style.position=SSSS_19;
}
if(qx.core.Variant.isSet(SSSS_0,SSSS_3)){style.fontSize=0;
style.lineHeight=0;
}else if(qx.core.Variant.isSet(SSSS_0,SSSS_13)){style.WebkitUserDrag=SSSS_9;
}var format=qx.util.ResourceManager.getInstance().getImageFormat(source)||qx.io2.ImageLoader.getFormat(source);
{};
var result;
if(this.__cz&&this.__cA[repeat]&&format===SSSS_11){result=this.__BB(style,repeat,source);
}else{if(repeat===SSSS_15){result=this.__BC(style,repeat,source);
}else if(repeat===SSSS_12||repeat===SSSS_14){result=this.__BD(style,repeat,source);
}else{result=this.__BG(style,repeat,source);
}}return result;
},__Bz:function(style,width,height){if(style.width==null&&width!=null){style.width=width+SSSS_5;
}
if(style.height==null&&height!=null){style.height=height+SSSS_5;
}return style;
},__BA:function(source){var width=qx.util.ResourceManager.getInstance().getImageWidth(source)||qx.io2.ImageLoader.getWidth(source);
var height=qx.util.ResourceManager.getInstance().getImageHeight(source)||qx.io2.ImageLoader.getHeight(source);
return {width:width,height:height};
},__BB:function(style,repeat,source){var dimension=this.__BA(source);
style=this.__Bz(style,dimension.width,dimension.height);
var sizingMethod=repeat=="no-repeat"?"crop":"scale";
var filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+qx.util.ResourceManager.getInstance().toUri(source)+"', sizingMethod='"+sizingMethod+"')";
style.filter=filter;
style.backgroundImage=style.backgroundRepeat="";
return {style:style};
},__BC:function(style,repeat,source){var uri=qx.util.ResourceManager.getInstance().toUri(source);
var dimension=this.__BA(source);
style=this.__Bz(style,dimension.width,dimension.height);
return {src:uri,style:style};
},__BD:function(style,repeat,source){var ResourceManager=qx.util.ResourceManager.getInstance();
var clipped=ResourceManager.isClippedImage(source);
var dimension=this.__BA(source);

if(clipped){var data=ResourceManager.getData(source);
var uri=ResourceManager.toUri(data[4]);

if(repeat==="scale-x"){style=this.__BE(style,data,dimension.height);
}else{style=this.__BF(style,data,dimension.width);
}return {src:uri,style:style};
}else{{};

if(repeat=="scale-x"){style.height=dimension.height==null?null:dimension.height+"px";
}else if(repeat=="scale-y"){style.width=dimension.width==null?null:dimension.width+"px";
}var uri=ResourceManager.toUri(source);
return {src:uri,style:style};
}},__BE:function(style,data,height){var imageHeight=qx.util.ResourceManager.getInstance().getImageHeight(data[4]);
style.clip={top:-data[6],height:height};
style.height=imageHeight+"px";
if(style.top!=null){style.top=(parseInt(style.top,10)+data[6])+"px";
}else if(style.bottom!=null){style.bottom=(parseInt(style.bottom,10)+height-imageHeight-data[6])+"px";
}return style;
},__BF:function(style,data,width){var imageWidth=qx.util.ResourceManager.getInstance().getImageWidth(data[4]);
style.clip={left:-data[5],width:width};
style.width=imageWidth+"px";
if(style.left!=null){style.left=(parseInt(style.left,10)+data[5])+"px";
}else if(style.right!=null){style.right=(parseInt(style.right,10)+width-imageWidth-data[5])+"px";
}return style;
},__BG:function(style,repeat,source){var clipped=qx.util.ResourceManager.getInstance().isClippedImage(source);
var dimension=this.__BA(source);
if(clipped&&repeat!=="repeat"){var data=qx.util.ResourceManager.getInstance().getData(source);
var bg=qx.bom.element.Background.getStyles(data[4],repeat,data[5],data[6]);

for(var key in bg){style[key]=bg[key];
}
if(dimension.width!=null&&style.width==null&&(repeat=="repeat-y"||repeat==="no-repeat")){style.width=dimension.width+"px";
}
if(dimension.height!=null&&style.height==null&&(repeat=="repeat-x"||repeat==="no-repeat")){style.height=dimension.height+"px";
}return {style:style};
}else{{};
style=this.__Bz(style,dimension.width,dimension.height);
style=this.__BH(style,source,repeat);
return {style:style};
}},__BH:function(style,source,repeat){var top=null;
var left=null;

if(style.backgroundPosition){var backgroundPosition=style.backgroundPosition.split(" ");
left=parseInt(backgroundPosition[0]);

if(isNaN(left)){left=backgroundPosition[0];
}top=parseInt(backgroundPosition[1]);

if(isNaN(top)){top=backgroundPosition[1];
}}var bg=qx.bom.element.Background.getStyles(source,repeat,left,top);

for(var key in bg){style[key]=bg[key];
}if(style.filter){style.filter="";
}return style;
},__BI:function(source){if(this.DEBUG&&qx.util.ResourceManager.getInstance().has(source)&&source.indexOf("qx/icon")==-1){if(!this.__pk[source]){qx.log.Logger.debug("Potential clipped image candidate: "+source);
this.__pk[source]=true;
}}},isAlphaImageLoaderEnabled:qx.core.Variant.select(SSSS_0,{"mshtml":function(){return qx.bom.element.Decoration.__cz;
},"default":function(){return false;
}})}});
})();
(function(){var SSSS_0="auto",SSSS_1="px",SSSS_2=",",SSSS_3="clip:auto;",SSSS_4="rect(",SSSS_5=");",SSSS_6="",SSSS_7=")",SSSS_8="qx.bom.element.Clip",SSSS_9="string",SSSS_10="rect(auto)",SSSS_11="clip:rect(",SSSS_12="clip",SSSS_13="rect(auto,auto,auto,auto)";
qx.Class.define(SSSS_8,{statics:{compile:function(map){if(!map){return SSSS_3;
}var left=map.left;
var top=map.top;
var width=map.width;
var height=map.height;
var right,bottom;

if(left==null){right=(width==null?SSSS_0:width+SSSS_1);
left=SSSS_0;
}else{right=(width==null?SSSS_0:left+width+SSSS_1);
left=left+SSSS_1;
}
if(top==null){bottom=(height==null?SSSS_0:height+SSSS_1);
top=SSSS_0;
}else{bottom=(height==null?SSSS_0:top+height+SSSS_1);
top=top+SSSS_1;
}return SSSS_11+top+SSSS_2+right+SSSS_2+bottom+SSSS_2+left+SSSS_5;
},get:function(element,mode){var clip=qx.bom.element.Style.get(element,SSSS_12,mode,false);
var left,top,width,height;
var right,bottom;

if(typeof clip===SSSS_9&&clip!==SSSS_0&&clip!==SSSS_6){clip=qx.lang.String.trim(clip);
if(/\((.*)\)/.test(clip)){var split=RegExp.$1.split(SSSS_2);
top=qx.lang.String.trim(split[0]);
right=qx.lang.String.trim(split[1]);
bottom=qx.lang.String.trim(split[2]);
left=qx.lang.String.trim(split[3]);
if(left===SSSS_0){left=null;
}
if(top===SSSS_0){top=null;
}
if(right===SSSS_0){right=null;
}
if(bottom===SSSS_0){bottom=null;
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
},set:function(element,map){if(!map){element.style.clip=SSSS_13;
return;
}var left=map.left;
var top=map.top;
var width=map.width;
var height=map.height;
var right,bottom;

if(left==null){right=(width==null?SSSS_0:width+SSSS_1);
left=SSSS_0;
}else{right=(width==null?SSSS_0:left+width+SSSS_1);
left=left+SSSS_1;
}
if(top==null){bottom=(height==null?SSSS_0:height+SSSS_1);
top=SSSS_0;
}else{bottom=(height==null?SSSS_0:top+height+SSSS_1);
top=top+SSSS_1;
}element.style.clip=SSSS_4+top+SSSS_2+right+SSSS_2+bottom+SSSS_2+left+SSSS_7;
},reset:function(element){element.style.clip=qx.bom.client.Engine.MSHTML?SSSS_10:SSSS_0;
}}});
})();
(function(){var SSSS_0="n-resize",SSSS_1="e-resize",SSSS_2="nw-resize",SSSS_3="ne-resize",SSSS_4="",SSSS_5="cursor:",SSSS_6="qx.client",SSSS_7=";",SSSS_8="qx.bom.element.Cursor",SSSS_9="cursor",SSSS_10="hand";
qx.Class.define(SSSS_8,{statics:{__cE:qx.core.Variant.select(SSSS_6,{"mshtml":{"cursor":SSSS_10,"ew-resize":SSSS_1,"ns-resize":SSSS_0,"nesw-resize":SSSS_3,"nwse-resize":SSSS_2},"opera":{"col-resize":SSSS_1,"row-resize":SSSS_0,"ew-resize":SSSS_1,"ns-resize":SSSS_0,"nesw-resize":SSSS_3,"nwse-resize":SSSS_2},"default":{}}),compile:function(cursor){return SSSS_5+(this.__cE[cursor]||cursor)+SSSS_7;
},get:function(element,mode){return qx.bom.element.Style.get(element,SSSS_9,mode,false);
},set:function(element,value){element.style.cursor=this.__cE[value]||value;
},reset:function(element){element.style.cursor=SSSS_4;
}}});
})();
(function(){var SSSS_0="",SSSS_1="qx.client",SSSS_2=";",SSSS_3="filter",SSSS_4="opacity:",SSSS_5="opacity",SSSS_6="MozOpacity",SSSS_7=");",SSSS_8=")",SSSS_9="zoom:1;filter:alpha(opacity=",SSSS_10="qx.bom.element.Opacity",SSSS_11="alpha(opacity=",SSSS_12="-moz-opacity:";
qx.Class.define(SSSS_10,{statics:{compile:qx.core.Variant.select(SSSS_1,{"mshtml":function(opacity){if(opacity>=1){return SSSS_0;
}
if(opacity<0.00001){opacity=0;
}return SSSS_9+(opacity*100)+SSSS_7;
},"gecko":function(opacity){if(opacity==1){opacity=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){return SSSS_12+opacity+SSSS_2;
}else{return SSSS_4+opacity+SSSS_2;
}},"default":function(opacity){if(opacity==1){return SSSS_0;
}return SSSS_4+opacity+SSSS_2;
}}),set:qx.core.Variant.select(SSSS_1,{"mshtml":function(element,opacity){var filter=qx.bom.element.Style.get(element,SSSS_3,qx.bom.element.Style.COMPUTED_MODE,false);
if(opacity>=1){element.style.filter=filter.replace(/alpha\([^\)]*\)/gi,SSSS_0);
return;
}
if(opacity<0.00001){opacity=0;
}if(!element.currentStyle||!element.currentStyle.hasLayout){element.style.zoom=1;
}element.style.filter=filter.replace(/alpha\([^\)]*\)/gi,SSSS_0)+SSSS_11+opacity*100+SSSS_8;
},"gecko":function(element,opacity){if(opacity==1){opacity=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){element.style.MozOpacity=opacity;
}else{element.style.opacity=opacity;
}},"default":function(element,opacity){if(opacity==1){opacity=SSSS_0;
}element.style.opacity=opacity;
}}),reset:qx.core.Variant.select(SSSS_1,{"mshtml":function(element){var filter=qx.bom.element.Style.get(element,SSSS_3,qx.bom.element.Style.COMPUTED_MODE,false);
element.style.filter=filter.replace(/alpha\([^\)]*\)/gi,SSSS_0);
},"gecko":function(element){if(qx.bom.client.Engine.VERSION<1.7){element.style.MozOpacity=SSSS_0;
}else{element.style.opacity=SSSS_0;
}},"default":function(element){element.style.opacity=SSSS_0;
}}),get:qx.core.Variant.select(SSSS_1,{"mshtml":function(element,mode){var filter=qx.bom.element.Style.get(element,SSSS_3,mode,false);

if(filter){var opacity=filter.match(/alpha\(opacity=(.*)\)/);

if(opacity&&opacity[1]){return parseFloat(opacity[1])/100;
}}return 1.0;
},"gecko":function(element,mode){var opacity=qx.bom.element.Style.get(element,qx.bom.client.Engine.VERSION<1.7?SSSS_6:SSSS_5,mode,false);

if(opacity==0.999999){opacity=1.0;
}
if(opacity!=null){return parseFloat(opacity);
}return 1.0;
},"default":function(element,mode){var opacity=qx.bom.element.Style.get(element,SSSS_5,mode,false);

if(opacity!=null){return parseFloat(opacity);
}return 1.0;
}})}});
})();
(function(){var SSSS_0="qx.client",SSSS_1="",SSSS_2="boxSizing",SSSS_3="box-sizing",SSSS_4=":",SSSS_5="border-box",SSSS_6="qx.bom.element.BoxSizing",SSSS_7="KhtmlBoxSizing",SSSS_8="-moz-box-sizing",SSSS_9="WebkitBoxSizing",SSSS_10=";",SSSS_11="-khtml-box-sizing",SSSS_12="content-box",SSSS_13="-webkit-box-sizing",SSSS_14="MozBoxSizing";
qx.Class.define(SSSS_6,{statics:{__cF:qx.core.Variant.select(SSSS_0,{"mshtml":null,"webkit":[SSSS_2,SSSS_7,SSSS_9],"gecko":[SSSS_14],"opera":[SSSS_2]}),__cG:qx.core.Variant.select(SSSS_0,{"mshtml":null,"webkit":[SSSS_3,SSSS_11,SSSS_13],"gecko":[SSSS_8],"opera":[SSSS_3]}),__cH:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__cI:function(element){var map=this.__cH;
return map.tags[element.tagName.toLowerCase()]||map.types[element.type];
},compile:qx.core.Variant.select(SSSS_0,{"mshtml":function(value){{};
},"default":function(value){var props=this.__cG;
var css=SSSS_1;

if(props){for(var i=0,l=props.length;i<l;i++){css+=props[i]+SSSS_4+value+SSSS_10;
}}return css;
}}),get:qx.core.Variant.select(SSSS_0,{"mshtml":function(element){if(qx.bom.Document.isStandardMode(qx.dom.Node.getDocument(element))){if(!this.__cI(element)){return SSSS_12;
}}return SSSS_5;
},"default":function(element){var props=this.__cF;
var value;

if(props){for(var i=0,l=props.length;i<l;i++){value=qx.bom.element.Style.get(element,props[i],null,false);

if(value!=null&&value!==SSSS_1){return value;
}}}return SSSS_1;
}}),set:qx.core.Variant.select(SSSS_0,{"mshtml":function(element,value){{};
},"default":function(element,value){var props=this.__cF;

if(props){for(var i=0,l=props.length;i<l;i++){element.style[props[i]]=value;
}}}}),reset:function(element){this.set(element,SSSS_1);
}}});
})();
(function(){var SSSS_0="",SSSS_1="qx.client",SSSS_2="hidden",SSSS_3="-moz-scrollbars-none",SSSS_4="overflow",SSSS_5=";",SSSS_6="overflowY",SSSS_7=":",SSSS_8="overflowX",SSSS_9="overflow:",SSSS_10="none",SSSS_11="scroll",SSSS_12="borderLeftStyle",SSSS_13="borderRightStyle",SSSS_14="div",SSSS_15="borderRightWidth",SSSS_16="overflow-y",SSSS_17="borderLeftWidth",SSSS_18="-moz-scrollbars-vertical",SSSS_19="100px",SSSS_20="qx.bom.element.Overflow",SSSS_21="overflow-x";
qx.Class.define(SSSS_20,{statics:{__cJ:null,getScrollbarWidth:function(){if(this.__cJ!==null){return this.__cJ;
}var Style=qx.bom.element.Style;
var getStyleSize=function(el,propertyName){return parseInt(Style.get(el,propertyName))||0;
};
var getBorderRight=function(el){return (Style.get(el,SSSS_13)==SSSS_10?0:getStyleSize(el,SSSS_15));
};
var getBorderLeft=function(el){return (Style.get(el,SSSS_12)==SSSS_10?0:getStyleSize(el,SSSS_17));
};
var getInsetRight=qx.core.Variant.select(SSSS_1,{"mshtml":function(el){if(Style.get(el,SSSS_6)==SSSS_2||el.clientWidth==0){return getBorderRight(el);
}return Math.max(0,el.offsetWidth-el.clientLeft-el.clientWidth);
},"default":function(el){if(el.clientWidth==0){var ov=Style.get(el,SSSS_4);
var sbv=(ov==SSSS_11||ov==SSSS_18?16:0);
return Math.max(0,getBorderRight(el)+sbv);
}return Math.max(0,(el.offsetWidth-el.clientWidth-getBorderLeft(el)));
}});
var getScrollBarSizeRight=function(el){return getInsetRight(el)-getBorderRight(el);
};
var t=document.createElement(SSSS_14);
var s=t.style;
s.height=s.width=SSSS_19;
s.overflow=SSSS_11;
document.body.appendChild(t);
var c=getScrollBarSizeRight(t);
this.__cJ=c?c:16;
document.body.removeChild(t);
return this.__cJ;
},_compile:qx.core.Variant.select(SSSS_1,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(prop,value){if(value==SSSS_2){value=SSSS_3;
}return SSSS_9+value+SSSS_5;
}:
function(prop,value){return prop+SSSS_7+value+SSSS_5;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(prop,value){return SSSS_9+value+SSSS_5;
}:
function(prop,value){return prop+SSSS_7+value+SSSS_5;
},"default":function(prop,value){return prop+SSSS_7+value+SSSS_5;
}}),compileX:function(value){return this._compile(SSSS_21,value);
},compileY:function(value){return this._compile(SSSS_16,value);
},getX:qx.core.Variant.select(SSSS_1,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(element,mode){var overflow=qx.bom.element.Style.get(element,SSSS_4,mode,false);

if(overflow===SSSS_3){overflow=SSSS_2;
}return overflow;
}:
function(element,mode){return qx.bom.element.Style.get(element,SSSS_8,mode,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(element,mode){return qx.bom.element.Style.get(element,SSSS_4,mode,false);
}:
function(element,mode){return qx.bom.element.Style.get(element,SSSS_8,mode,false);
},"default":function(element,mode){return qx.bom.element.Style.get(element,SSSS_8,mode,false);
}}),setX:qx.core.Variant.select(SSSS_1,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(element,value){if(value==SSSS_2){value=SSSS_3;
}element.style.overflow=value;
}:
function(element,value){element.style.overflowX=value;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(element,value){element.style.overflow=value;
}:
function(element,value){element.style.overflowX=value;
},"default":function(element,value){element.style.overflowX=value;
}}),resetX:qx.core.Variant.select(SSSS_1,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(element){element.style.overflow=SSSS_0;
}:
function(element){element.style.overflowX=SSSS_0;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(element,value){element.style.overflow=SSSS_0;
}:
function(element,value){element.style.overflowX=SSSS_0;
},"default":function(element){element.style.overflowX=SSSS_0;
}}),getY:qx.core.Variant.select(SSSS_1,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(element,mode){var overflow=qx.bom.element.Style.get(element,SSSS_4,mode,false);

if(overflow===SSSS_3){overflow=SSSS_2;
}return overflow;
}:
function(element,mode){return qx.bom.element.Style.get(element,SSSS_6,mode,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(element,mode){return qx.bom.element.Style.get(element,SSSS_4,mode,false);
}:
function(element,mode){return qx.bom.element.Style.get(element,SSSS_6,mode,false);
},"default":function(element,mode){return qx.bom.element.Style.get(element,SSSS_6,mode,false);
}}),setY:qx.core.Variant.select(SSSS_1,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(element,value){if(value===SSSS_2){value=SSSS_3;
}element.style.overflow=value;
}:
function(element,value){element.style.overflowY=value;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(element,value){element.style.overflow=value;
}:
function(element,value){element.style.overflowY=value;
},"default":function(element,value){element.style.overflowY=value;
}}),resetY:qx.core.Variant.select(SSSS_1,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(element){element.style.overflow=SSSS_0;
}:
function(element){element.style.overflowY=SSSS_0;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(element,value){element.style.overflow=SSSS_0;
}:
function(element,value){element.style.overflowY=SSSS_0;
},"default":function(element){element.style.overflowY=SSSS_0;
}})}});
})();
(function(){var SSSS_0="",SSSS_1="qx.client",SSSS_2="user-select",SSSS_3="userSelect",SSSS_4="appearance",SSSS_5="style",SSSS_6="MozUserModify",SSSS_7="px",SSSS_8="-webkit-appearance",SSSS_9="styleFloat",SSSS_10="-webkit-user-select",SSSS_11="-moz-appearance",SSSS_12="pixelHeight",SSSS_13="MozAppearance",SSSS_14=":",SSSS_15="pixelTop",SSSS_16="pixelLeft",SSSS_17="text-overflow",SSSS_18="-moz-user-select",SSSS_19="MozUserSelect",SSSS_20="qx.bom.element.Style",SSSS_21="-moz-user-modify",SSSS_22="-webkit-user-modify",SSSS_23="WebkitUserSelect",SSSS_24="-o-text-overflow",SSSS_25="pixelRight",SSSS_26="cssFloat",SSSS_27="pixelWidth",SSSS_28="pixelBottom",SSSS_29=";",SSSS_30="WebkitUserModify",SSSS_31="WebkitAppearance";
qx.Class.define(SSSS_20,{statics:{__cC:{styleNames:{"float":qx.core.Variant.select(SSSS_1,{"mshtml":SSSS_9,"default":SSSS_26}),"appearance":qx.core.Variant.select(SSSS_1,{"gecko":SSSS_13,"webkit":SSSS_31,"default":SSSS_4}),"userSelect":qx.core.Variant.select(SSSS_1,{"gecko":SSSS_19,"webkit":SSSS_23,"default":SSSS_3}),"userModify":qx.core.Variant.select(SSSS_1,{"gecko":SSSS_6,"webkit":SSSS_30,"default":SSSS_3})},cssNames:{"appearance":qx.core.Variant.select(SSSS_1,{"gecko":SSSS_11,"webkit":SSSS_8,"default":SSSS_4}),"userSelect":qx.core.Variant.select(SSSS_1,{"gecko":SSSS_18,"webkit":SSSS_10,"default":SSSS_2}),"userModify":qx.core.Variant.select(SSSS_1,{"gecko":SSSS_21,"webkit":SSSS_22,"default":SSSS_2}),"textOverflow":qx.core.Variant.select(SSSS_1,{"opera":SSSS_24,"default":SSSS_17})},mshtmlPixel:{width:SSSS_27,height:SSSS_12,left:SSSS_16,right:SSSS_25,top:SSSS_15,bottom:SSSS_28},special:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing,overflowX:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setX,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getX,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetX,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileX,qx.bom.element.Overflow)},overflowY:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setY,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getY,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetY,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileY,qx.bom.element.Overflow)}}},__cD:{},compile:function(map){var html=[];
var hints=this.__cC;
var special=hints.special;
var names=hints.cssNames;
var hyphens=this.__cD;
var str=qx.lang.String;
var name,prop,value;

for(name in map){value=map[name];

if(value==null){continue;
}name=names[name]||name;
if(special[name]){html.push(special[name].compile(value));
}else{prop=hyphens[name];

if(!prop){prop=hyphens[name]=str.hyphenate(name);
}html.push(prop,SSSS_14,value,SSSS_29);
}}return html.join(SSSS_0);
},setCss:qx.core.Variant.select(SSSS_1,{"mshtml":function(element,value){element.style.cssText=value;
},"default":function(element,value){element.setAttribute(SSSS_5,value);
}}),getCss:qx.core.Variant.select(SSSS_1,{"mshtml":function(element){return element.style.cssText.toLowerCase();
},"default":function(element){return element.getAttribute(SSSS_5);
}}),COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(element,name,value,smart){{};
var hints=this.__cC;
name=hints.styleNames[name]||name;
if(smart!==false&&hints.special[name]){return hints.special[name].set(element,value);
}else{element.style[name]=value!==null?value:SSSS_0;
}},setStyles:function(element,styles,smart){{};
var hints=this.__cC;
var styleNames=hints.styleNames;
var special=hints.special;
var style=element.style;

for(var key in styles){var value=styles[key];
var name=styleNames[key]||key;

if(value===undefined){if(smart!==false&&special[name]){special[name].reset(element);
}else{style[name]=SSSS_0;
}}else{if(smart!==false&&special[name]){special[name].set(element,value);
}else{style[name]=value!==null?value:SSSS_0;
}}}},reset:function(element,name,smart){var hints=this.__cC;
name=hints.styleNames[name]||name;
if(smart!==false&&hints.special[name]){return hints.special[name].reset(element);
}else{element.style[name]=SSSS_0;
}},get:qx.core.Variant.select(SSSS_1,{"mshtml":function(element,name,mode,smart){var hints=this.__cC;
name=hints.styleNames[name]||name;
if(smart!==false&&hints.special[name]){return hints.special[name].get(element,mode);
}if(!element.currentStyle){return element.style[name]||SSSS_0;
}switch(mode){case this.LOCAL_MODE:return element.style[name]||SSSS_0;
case this.CASCADED_MODE:return element.currentStyle[name]||SSSS_0;
default:var currentStyle=element.currentStyle[name]||SSSS_0;
if(/^-?[\.\d]+(px)?$/i.test(currentStyle)){return currentStyle;
}var pixel=hints.mshtmlPixel[name];

if(pixel){var localStyle=element.style[name];
element.style[name]=currentStyle||0;
var value=element.style[pixel]+SSSS_7;
element.style[name]=localStyle;
return value;
}if(/^-?[\.\d]+(em|pt|%)?$/i.test(currentStyle)){throw new Error("Untranslated computed property value: "+name+". Only pixel values work well across different clients.");
}return currentStyle;
}},"default":function(element,name,mode,smart){var hints=this.__cC;
name=hints.styleNames[name]||name;
if(smart!==false&&hints.special[name]){return hints.special[name].get(element,mode);
}switch(mode){case this.LOCAL_MODE:return element.style[name]||SSSS_0;
case this.CASCADED_MODE:if(element.currentStyle){return element.currentStyle[name]||SSSS_0;
}throw new Error("Cascaded styles are not supported in this browser!");
default:var doc=qx.dom.Node.getDocument(element);
var computed=doc.defaultView.getComputedStyle(element,null);
return computed?computed[name]:SSSS_0;
}}})}});
})();
(function(){var SSSS_0="CSS1Compat",SSSS_1="position:absolute;width:0;height:0;width:1",SSSS_2="qx.bom.Document",SSSS_3="1px",SSSS_4="qx.client",SSSS_5="div";
qx.Class.define(SSSS_2,{statics:{isQuirksMode:qx.core.Variant.select(SSSS_4,{"mshtml":function(win){if(qx.bom.client.Engine.VERSION>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return (win||window).document.compatMode!==SSSS_0;
}},"webkit":function(win){if(document.compatMode===undefined){var el=(win||window).document.createElement(SSSS_5);
el.style.cssText=SSSS_1;
return el.style.width===SSSS_3?true:false;
}else{return (win||window).document.compatMode!==SSSS_0;
}},"default":function(win){return (win||window).document.compatMode!==SSSS_0;
}}),isStandardMode:function(win){return !this.isQuirksMode(win);
},getWidth:function(win){var doc=(win||window).document;
var view=qx.bom.Viewport.getWidth(win);
var scroll=this.isStandardMode(win)?doc.documentElement.scrollWidth:doc.body.scrollWidth;
return Math.max(scroll,view);
},getHeight:function(win){var doc=(win||window).document;
var view=qx.bom.Viewport.getHeight(win);
var scroll=this.isStandardMode(win)?doc.documentElement.scrollHeight:doc.body.scrollHeight;
return Math.max(scroll,view);
}}});
})();
(function(){var SSSS_0="qx.client",SSSS_1="qx.bom.Viewport";
qx.Class.define(SSSS_1,{statics:{getWidth:qx.core.Variant.select(SSSS_0,{"opera":function(win){if(qx.bom.client.Engine.VERSION<9.5){return (win||window).document.body.clientWidth;
}else{var doc=(win||window).document;
return qx.bom.Document.isStandardMode(win)?doc.documentElement.clientWidth:doc.body.clientWidth;
}},"webkit":function(win){if(qx.bom.client.Engine.VERSION<523.15){return (win||window).innerWidth;
}else{var doc=(win||window).document;
return qx.bom.Document.isStandardMode(win)?doc.documentElement.clientWidth:doc.body.clientWidth;
}},"default":function(win){var doc=(win||window).document;
return qx.bom.Document.isStandardMode(win)?doc.documentElement.clientWidth:doc.body.clientWidth;
}}),getHeight:qx.core.Variant.select(SSSS_0,{"opera":function(win){if(qx.bom.client.Engine.VERSION<9.5){return (win||window).document.body.clientHeight;
}else{var doc=(win||window).document;
return qx.bom.Document.isStandardMode(win)?doc.documentElement.clientHeight:doc.body.clientHeight;
}},"webkit":function(win){if(qx.bom.client.Engine.VERSION<523.15){return (win||window).innerHeight;
}else{var doc=(win||window).document;
return qx.bom.Document.isStandardMode(win)?doc.documentElement.clientHeight:doc.body.clientHeight;
}},"default":function(win){var doc=(win||window).document;
return qx.bom.Document.isStandardMode(win)?doc.documentElement.clientHeight:doc.body.clientHeight;
}}),getScrollLeft:qx.core.Variant.select(SSSS_0,{"mshtml":function(win){var doc=(win||window).document;
return doc.documentElement.scrollLeft||doc.body.scrollLeft;
},"default":function(win){return (win||window).pageXOffset;
}}),getScrollTop:qx.core.Variant.select(SSSS_0,{"mshtml":function(win){var doc=(win||window).document;
return doc.documentElement.scrollTop||doc.body.scrollTop;
},"default":function(win){return (win||window).pageYOffset;
}})}});
})();
(function(){var SSSS_0="CSS1Compat",SSSS_1="qx.bom.client.Feature";
qx.Bootstrap.define(SSSS_1,{statics:{STANDARD_MODE:false,QUIRKS_MODE:false,CONTENT_BOX:false,BORDER_BOX:false,SVG:false,CANVAS:false,VML:false,XPATH:false,AIR:false,GEARS:false,SSL:false,__cK:function(){this.QUIRKS_MODE=this.__cL();
this.STANDARD_MODE=!this.QUIRKS_MODE;
this.CONTENT_BOX=!qx.bom.client.Engine.MSHTML||this.STANDARD_MODE;
this.BORDER_BOX=!this.CONTENT_BOX;
this.SVG=document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature("org.w3c.dom.svg","1.0")||document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"));
this.CANVAS=!!window.CanvasRenderingContext2D;
this.VML=qx.bom.client.Engine.MSHTML;
this.AIR=navigator.userAgent.indexOf("adobeair")!==-1;
this.GEARS=!!(window.google&&window.google.gears);
this.XPATH=!!document.evaluate;
this.SSL=window.location.protocol==="https:";
},__cL:function(){if(qx.bom.client.Engine.MSHTML&&qx.bom.client.Engine.VERSION>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return document.compatMode!==SSSS_0;
}}},defer:function(statics){statics.__cK();
}});
})();
(function(){var SSSS_0="/",SSSS_1="mshtml",SSSS_2="qx.client",SSSS_3="",SSSS_4="?",SSSS_5="string",SSSS_6="qx.util.ResourceManager",SSSS_7="singleton",SSSS_8="qx.isSource";
qx.Class.define(SSSS_6,{extend:qx.core.Object,type:SSSS_7,statics:{__cM:qx.$$resources||{},__cN:{}},members:{has:function(id){return !!arguments.callee.self.__cM[id];
},getData:function(id){return arguments.callee.self.__cM[id]||null;
},getImageWidth:function(id){var entry=arguments.callee.self.__cM[id];
return entry?entry[0]:null;
},getImageHeight:function(id){var entry=arguments.callee.self.__cM[id];
return entry?entry[1]:null;
},getImageFormat:function(id){var entry=arguments.callee.self.__cM[id];
return entry?entry[2]:null;
},isClippedImage:function(id){var entry=arguments.callee.self.__cM[id];
return entry&&entry.length>4;
},toUri:function(id){if(id==null){return id;
}var entry=arguments.callee.self.__cM[id];

if(!entry){return id;
}
if(typeof entry===SSSS_5){var lib=entry;
}else{var lib=entry[3];
if(!lib){return id;
}}var urlPrefix=SSSS_3;

if(qx.core.Variant.isSet(SSSS_2,SSSS_1)&&qx.bom.client.Feature.SSL){urlPrefix=arguments.callee.self.__cN[lib];
}return urlPrefix+qx.$$libraries[lib].resourceUri+SSSS_0+id;
}},defer:function(statics){if(qx.core.Variant.isSet(SSSS_2,SSSS_1)){if(qx.bom.client.Feature.SSL){for(var lib in qx.$$libraries){var resourceUri=qx.$$libraries[lib].resourceUri;
if(resourceUri.match(/^\/\//)!=null){statics.__cN[lib]=window.location.protocol;
}else if(resourceUri.match(/^\.\//)!=null&&qx.core.Setting.get(SSSS_8)){var url=document.URL;
statics.__cN[lib]=url.substring(0,url.lastIndexOf(SSSS_0));
}else if(resourceUri.match(/^http/)!=null){}else{var index=window.location.href.indexOf(SSSS_4);
var href;

if(index==-1){href=window.location.href;
}else{href=window.location.href.substring(0,index);
}statics.__cN[lib]=href.substring(0,href.lastIndexOf(SSSS_0)+1);
}}}}}});
})();
(function(){var SSSS_0="qx.client",SSSS_1="qx.io2.ImageLoader",SSSS_2="load";
qx.Bootstrap.define(SSSS_1,{statics:{__cO:{},__cP:{width:null,height:null},__cQ:/\.(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(source){var entry=this.__cO[source];
return !!(entry&&entry.loaded);
},isFailed:function(source){var entry=this.__cO[source];
return !!(entry&&entry.failed);
},isLoading:function(source){var entry=this.__cO[source];
return !!(entry&&entry.loading);
},getFormat:function(source){var entry=this.__cO[source];
return entry?entry.format:null;
},getSize:function(source){var entry=this.__cO[source];
return entry?
{width:entry.width,height:entry.height}:this.__cP;
},getWidth:function(source){var entry=this.__cO[source];
return entry?entry.width:null;
},getHeight:function(source){var entry=this.__cO[source];
return entry?entry.height:null;
},load:function(source,callback,context){var entry=this.__cO[source];

if(!entry){entry=this.__cO[source]={};
}if(callback&&!context){context=window;
}if(entry.loaded||entry.loading||entry.failed){if(callback){if(entry.loading){entry.callbacks.push(callback,context);
}else{callback.call(context,source,entry);
}}}else{entry.loading=true;
entry.callbacks=[];

if(callback){entry.callbacks.push(callback,context);
}var el=new Image();
var boundCallback=qx.lang.Function.listener(this.__cR,this,el,source);
el.onload=boundCallback;
el.onerror=boundCallback;
el.src=source;
}},__cR:qx.event.GlobalError.observeMethod(function(event,element,source){var entry=this.__cO[source];
if(event.type===SSSS_2){entry.loaded=true;
entry.width=this.__cS(element);
entry.height=this.__cT(element);
var result=this.__cQ.exec(source);

if(result!=null){entry.format=result[1];
}}else{entry.failed=true;
}element.onload=element.onerror=null;
var callbacks=entry.callbacks;
delete entry.loading;
delete entry.callbacks;
for(var i=0,l=callbacks.length;i<l;i+=2){callbacks[i].call(callbacks[i+1],source,entry);
}}),__cS:qx.core.Variant.select(SSSS_0,{"gecko":function(element){return element.naturalWidth;
},"default":function(element){return element.width;
}}),__cT:qx.core.Variant.select(SSSS_0,{"gecko":function(element){return element.naturalHeight;
},"default":function(element){return element.height;
}})}});
})();
(function(){var SSSS_0="number",SSSS_1="0",SSSS_2="px",SSSS_3=";",SSSS_4="background-image:url(",SSSS_5=");",SSSS_6="",SSSS_7=")",SSSS_8="background-repeat:",SSSS_9=" ",SSSS_10="qx.bom.element.Background",SSSS_11="url(",SSSS_12="background-position:";
qx.Class.define(SSSS_10,{statics:{__cU:[SSSS_4,null,SSSS_5,SSSS_12,null,SSSS_3,SSSS_8,null,SSSS_3],__cV:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__cW:function(left,top){var Engine=qx.bom.client.Engine;

if(Engine.GECKO&&Engine.VERSION<1.9&&left==top&&typeof left==SSSS_0){top+=0.01;
}
if(left){var leftCss=(typeof left==SSSS_0)?left+SSSS_2:left;
}else{leftCss=SSSS_1;
}
if(top){var topCss=(typeof top==SSSS_0)?top+SSSS_2:top;
}else{topCss=SSSS_1;
}return leftCss+SSSS_9+topCss;
},compile:function(source,repeat,left,top){var position=this.__cW(left,top);
var backgroundImageUrl=qx.util.ResourceManager.getInstance().toUri(source);
var tmpl=this.__cU;
tmpl[1]=backgroundImageUrl;
tmpl[4]=position;
tmpl[7]=repeat;
return tmpl.join(SSSS_6);
},getStyles:function(source,repeat,left,top){if(!source){return this.__cV;
}var position=this.__cW(left,top);
var backgroundImageUrl=qx.util.ResourceManager.getInstance().toUri(source);
var map={backgroundPosition:position,backgroundImage:SSSS_11+backgroundImageUrl+SSSS_7};

if(repeat!=null){map.backgroundRepeat=repeat;
}return map;
},set:function(element,source,repeat,left,top){var styles=this.getStyles(source,repeat,left,top);

for(var prop in styles){element.style[prop]=styles[prop];
}}}});
})();
(function(){var SSSS_0="_applyTheme",SSSS_1="qx.theme.manager.Color",SSSS_2="Theme",SSSS_3="changeTheme",SSSS_4="string",SSSS_5="singleton";
qx.Class.define(SSSS_1,{type:SSSS_5,extend:qx.util.ValueManager,properties:{theme:{check:SSSS_2,nullable:true,apply:SSSS_0,event:SSSS_3}},members:{_applyTheme:function(value){var dest={};

if(value){var source=value.colors;
var util=qx.util.ColorUtil;
var temp;

for(var key in source){temp=source[key];

if(typeof temp===SSSS_4){if(!util.isCssString(temp)){throw new Error("Could not parse color: "+temp);
}}else if(temp instanceof Array){temp=util.rgbToRgbString(temp);
}else{throw new Error("Could not parse color: "+temp);
}dest[key]=temp;
}}this._setDynamic(dest);
},resolve:function(value){var cache=this._dynamic;
var resolved=cache[value];

if(resolved){return resolved;
}var theme=this.getTheme();

if(theme!==null&&theme.colors[value]){return cache[value]=theme.colors[value];
}return value;
},isDynamic:function(value){var cache=this._dynamic;

if(value&&(cache[value]!==undefined)){return true;
}var theme=this.getTheme();

if(theme!==null&&value&&(theme.colors[value]!==undefined)){cache[value]=theme.colors[value];
return true;
}return false;
}}});
})();
(function(){var SSSS_0=",",SSSS_1="rgb(",SSSS_2=")",SSSS_3="qx.theme.manager.Color",SSSS_4="qx.util.ColorUtil";
qx.Class.define(SSSS_4,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(value){return this.NAMED[value]!==undefined;
},isSystemColor:function(value){return this.SYSTEM[value]!==undefined;
},supportsThemes:function(){return qx.Class.isDefined(SSSS_3);
},isThemedColor:function(value){if(!this.supportsThemes()){return false;
}return qx.theme.manager.Color.getInstance().isDynamic(value);
},stringToRgb:function(str){if(this.supportsThemes()&&this.isThemedColor(str)){var str=qx.theme.manager.Color.getInstance().resolveDynamic(str);
}
if(this.isNamedColor(str)){return this.NAMED[str];
}else if(this.isSystemColor(str)){throw new Error("Could not convert system colors to RGB: "+str);
}else if(this.isRgbString(str)){return this.__cX();
}else if(this.isHex3String(str)){return this.__da();
}else if(this.isHex6String(str)){return this.__db();
}throw new Error("Could not parse color: "+str);
},cssStringToRgb:function(str){if(this.isNamedColor(str)){return this.NAMED[str];
}else if(this.isSystemColor(str)){throw new Error("Could not convert system colors to RGB: "+str);
}else if(this.isRgbString(str)){return this.__cX();
}else if(this.isRgbaString(str)){return this.__cY();
}else if(this.isHex3String(str)){return this.__da();
}else if(this.isHex6String(str)){return this.__db();
}throw new Error("Could not parse color: "+str);
},stringToRgbString:function(str){return this.rgbToRgbString(this.stringToRgb(str));
},rgbToRgbString:function(rgb){return SSSS_1+rgb[0]+SSSS_0+rgb[1]+SSSS_0+rgb[2]+SSSS_2;
},rgbToHexString:function(rgb){return (qx.lang.String.pad(rgb[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(rgb[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(rgb[2].toString(16).toUpperCase(),2));
},isValidPropertyValue:function(str){return this.isThemedColor(str)||this.isNamedColor(str)||this.isHex3String(str)||this.isHex6String(str)||this.isRgbString(str);
},isCssString:function(str){return this.isSystemColor(str)||this.isNamedColor(str)||this.isHex3String(str)||this.isHex6String(str)||this.isRgbString(str);
},isHex3String:function(str){return this.REGEXP.hex3.test(str);
},isHex6String:function(str){return this.REGEXP.hex6.test(str);
},isRgbString:function(str){return this.REGEXP.rgb.test(str);
},isRgbaString:function(str){return this.REGEXP.rgba.test(str);
},__cX:function(){var red=parseInt(RegExp.$1,10);
var green=parseInt(RegExp.$2,10);
var blue=parseInt(RegExp.$3,10);
return [red,green,blue];
},__cY:function(){var red=parseInt(RegExp.$1,10);
var green=parseInt(RegExp.$2,10);
var blue=parseInt(RegExp.$3,10);
return [red,green,blue];
},__da:function(){var red=parseInt(RegExp.$1,16)*17;
var green=parseInt(RegExp.$2,16)*17;
var blue=parseInt(RegExp.$3,16)*17;
return [red,green,blue];
},__db:function(){var red=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);
var green=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);
var blue=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);
return [red,green,blue];
},hex3StringToRgb:function(value){if(this.isHex3String(value)){return this.__da(value);
}throw new Error("Invalid hex3 value: "+value);
},hex6StringToRgb:function(value){if(this.isHex6String(value)){return this.__db(value);
}throw new Error("Invalid hex6 value: "+value);
},hexStringToRgb:function(value){if(this.isHex3String(value)){return this.__da(value);
}
if(this.isHex6String(value)){return this.__db(value);
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
})();
(function(){var SSSS_0="qx.event.handler.Window";
qx.Class.define(SSSS_0,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
this._manager=manager;
this._window=manager.getWindow();
this._initWindowObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){},_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);
var types=qx.event.handler.Window.SUPPORTED_TYPES;

for(var key in types){qx.bom.Event.addNativeListener(this._window,key,this._onNativeWrapper);
}},_stopWindowObserver:function(){var types=qx.event.handler.Window.SUPPORTED_TYPES;

for(var key in types){qx.bom.Event.removeNativeListener(this._window,key,this._onNativeWrapper);
}},_onNative:qx.event.GlobalError.observeMethod(function(e){if(this.isDisposed()){return;
}var win=this._window;
var doc=win.document;
var html=doc.documentElement;
var target=e.target||e.srcElement;

if(target==null||target===win||target===doc||target===html){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,win]);
qx.event.Registration.dispatchEvent(win,event);
var result=event.getReturnValue();

if(result!=null){e.returnValue=result;
return result;
}}})},destruct:function(){this._stopWindowObserver();
this._manager=this._window=null;
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
})();
(function(){var SSSS_0="ready",SSSS_1="qx.application",SSSS_2="beforeunload",SSSS_3="qx.core.Init",SSSS_4="shutdown";
qx.Class.define(SSSS_3,{statics:{getApplication:function(){return this.__dd||null;
},__dc:function(){if(qx.bom.client.Engine.UNKNOWN_ENGINE){qx.log.Logger.warn("Could not detect engine!");
}
if(qx.bom.client.Engine.UNKNOWN_VERSION){qx.log.Logger.warn("Could not detect the version of the engine!");
}
if(qx.bom.client.Platform.UNKNOWN_PLATFORM){qx.log.Logger.warn("Could not detect platform!");
}
if(qx.bom.client.System.UNKNOWN_SYSTEM){qx.log.Logger.warn("Could not detect system!");
}qx.log.Logger.debug(this,"Load runtime: "+(new Date-qx.Bootstrap.LOADSTART)+"ms");
var app=qx.core.Setting.get(SSSS_1);
var clazz=qx.Class.getByName(app);

if(clazz){this.__dd=new clazz;
var start=new Date;
this.__dd.main();
qx.log.Logger.debug(this,"Main runtime: "+(new Date-start)+"ms");
var start=new Date;
this.__dd.finalize();
qx.log.Logger.debug(this,"Finalize runtime: "+(new Date-start)+"ms");
}else{qx.log.Logger.warn("Missing application class: "+app);
}},__de:function(e){var app=this.__dd;

if(app){e.setReturnValue(app.close());
}},__df:function(){var app=this.__dd;

if(app){app.terminate();
}}},defer:function(statics){qx.event.Registration.addListener(window,SSSS_0,statics.__dc,statics);
qx.event.Registration.addListener(window,SSSS_4,statics.__df,statics);
qx.event.Registration.addListener(window,SSSS_2,statics.__de,statics);
}});
})();
(function(){var SSSS_0="qx.application.IApplication";
qx.Interface.define(SSSS_0,{members:{main:function(){},finalize:function(){},close:function(){},terminate:function(){}}});
})();
(function(){var SSSS_0="qx.locale.MTranslation";
qx.Mixin.define(SSSS_0,{members:{tr:function(messageId,varargs){var nlsManager=qx.locale.Manager;

if(nlsManager){return nlsManager.tr.apply(nlsManager,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trn:function(singularMessageId,pluralMessageId,count,varargs){var nlsManager=qx.locale.Manager;

if(nlsManager){return nlsManager.trn.apply(nlsManager,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trc:function(hint,messageId,varargs){var nlsManager=qx.locale.Manager;

if(nlsManager){return nlsManager.trc.apply(nlsManager,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},marktr:function(messageId){var nlsManager=qx.locale.Manager;

if(nlsManager){return nlsManager.marktr.apply(nlsManager,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
}}});
})();
(function(){var SSSS_0="abstract",SSSS_1="qx.application.AbstractGui";
qx.Class.define(SSSS_1,{type:SSSS_0,extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,members:{__dg:null,_createRootWidget:function(){throw new Error("Abstract method call");
},getRoot:function(){return this.__dg;
},main:function(){qx.theme.manager.Meta.getInstance().initialize();
qx.ui.tooltip.Manager.getInstance();
this.__dg=this._createRootWidget();
},finalize:function(){this.render();
},render:function(){qx.ui.core.queue.Manager.flush();
},close:function(val){},terminate:function(){}},destruct:function(){this.__dg=null;
}});
})();
(function(){var SSSS_0="qx.application.Standalone";
qx.Class.define(SSSS_0,{extend:qx.application.AbstractGui,members:{_createRootWidget:function(){return new qx.ui.root.Application(document);
}}});
})();
(function(){var SSSS_0="gui4/test.png",SSSS_1="gui4.Application",SSSS_2="First Button",SSSS_3="execute";
qx.Class.define(SSSS_1,{extend:qx.application.Standalone,members:{main:function(){arguments.callee.base.call(this);
{};
var button1=new qx.ui.form.Button(SSSS_2,SSSS_0);
var doc=this.getRoot();
doc.add(button1,{left:100,top:50});
button1.addListener(SSSS_3,function(e){alert("Hello World!");
});
}}});
})();
(function(){var SSSS_0="qx.event.type.Native";
qx.Class.define(SSSS_0,{extend:qx.event.type.Event,members:{init:function(nativeEvent,target,relatedTarget,canBubble,cancelable){arguments.callee.base.call(this,canBubble,cancelable);
this._target=target||qx.bom.Event.getTarget(nativeEvent);
this._relatedTarget=relatedTarget||qx.bom.Event.getRelatedTarget(nativeEvent);

if(nativeEvent.timeStamp){this._timeStamp=nativeEvent.timeStamp;
}this._native=nativeEvent;
this._returnValue=null;
return this;
},clone:function(embryo){var clone=arguments.callee.base.call(this,embryo);
var nativeClone={};
clone._native=this._cloneNativeEvent(this._native,nativeClone);
clone._returnValue=this._returnValue;
return clone;
},_cloneNativeEvent:function(nativeEvent,clone){clone.preventDefault=qx.lang.Function.empty;
return clone;
},preventDefault:function(){arguments.callee.base.call(this);
qx.bom.Event.preventDefault(this._native);
},getNativeEvent:function(){return this._native;
},setReturnValue:function(returnValue){this._returnValue=returnValue;
},getReturnValue:function(){return this._returnValue;
}},destruct:function(){this._native=this._returnValue=null;
}});
})();
(function(){var SSSS_0="_applyTheme",SSSS_1="qx.theme",SSSS_2="qx.theme.manager.Meta",SSSS_3="qx.theme.Classic",SSSS_4="Theme",SSSS_5="singleton";
qx.Class.define(SSSS_2,{type:SSSS_5,extend:qx.core.Object,properties:{theme:{check:SSSS_4,nullable:true,apply:SSSS_0}},members:{_applyTheme:function(value,old){var color=null;
var decoration=null;
var font=null;
var icon=null;
var appearance=null;

if(value){color=value.meta.color||null;
decoration=value.meta.decoration||null;
font=value.meta.font||null;
icon=value.meta.icon||null;
appearance=value.meta.appearance||null;
}var colorMgr=qx.theme.manager.Color.getInstance();
var decorationMgr=qx.theme.manager.Decoration.getInstance();
var fontMgr=qx.theme.manager.Font.getInstance();
var iconMgr=qx.theme.manager.Icon.getInstance();
var appearanceMgr=qx.theme.manager.Appearance.getInstance();
colorMgr.setTheme(color);
decorationMgr.setTheme(decoration);
fontMgr.setTheme(font);
iconMgr.setTheme(icon);
appearanceMgr.setTheme(appearance);
},initialize:function(){var setting=qx.core.Setting;
var theme,obj;
theme=setting.get(SSSS_1);

if(theme){obj=qx.Theme.getByName(theme);

if(!obj){throw new Error("The theme to use is not available: "+theme);
}this.setTheme(obj);
}}},settings:{"qx.theme":SSSS_3}});
})();
(function(){var SSSS_0="object",SSSS_1="__dh",SSSS_2="_applyTheme",SSSS_3="qx.theme.manager.Decoration",SSSS_4="Theme",SSSS_5="string",SSSS_6="singleton";
qx.Class.define(SSSS_3,{type:SSSS_6,extend:qx.core.Object,properties:{theme:{check:SSSS_4,nullable:true,apply:SSSS_2}},members:{__dh:null,resolve:function(value){if(!value){return null;
}
if(typeof value===SSSS_0){return value;
}var theme=this.getTheme();

if(!theme){return null;
}var theme=this.getTheme();

if(!theme){return null;
}var cache=this.__dh;

if(!cache){cache=this.__dh={};
}var resolved=cache[value];

if(resolved){return resolved;
}var entry=theme.decorations[value];

if(!entry){return null;
}var clazz=entry.decorator;

if(clazz==null){throw new Error("Missing definition of which decorator to use in entry: "+value+"!");
}return cache[value]=(new clazz).set(entry.style);
},isValidPropertyValue:function(value){if(typeof value===SSSS_5){return this.isDynamic(value);
}else if(typeof value===SSSS_0){var clazz=value.constructor;
return qx.Class.hasInterface(clazz,qx.ui.decoration.IDecorator);
}return false;
},isDynamic:function(value){if(!value){return false;
}var theme=this.getTheme();

if(!theme){return false;
}return !!theme.decorations[value];
},_applyTheme:function(value,old){var aliasManager=qx.util.AliasManager.getInstance();

if(old){for(var alias in old.aliases){aliasManager.remove(alias);
}}
if(value){for(var alias in value.aliases){aliasManager.add(alias,value.aliases[alias]);
}}
if(!value){this.__dh={};
}}},destruct:function(){this._disposeMap(SSSS_1);
}});
})();
(function(){var SSSS_0="qx.theme.manager.Font",SSSS_1="Theme",SSSS_2="changeTheme",SSSS_3="_applyTheme",SSSS_4="singleton";
qx.Class.define(SSSS_0,{type:SSSS_4,extend:qx.util.ValueManager,properties:{theme:{check:SSSS_1,nullable:true,apply:SSSS_3,event:SSSS_2}},members:{resolveDynamic:function(value){var dynamic=this._dynamic;
return value instanceof qx.bom.Font?value:dynamic[value];
},resolve:function(value){var cache=this._dynamic;
var resolved=cache[value];

if(resolved){return resolved;
}var theme=this.getTheme();

if(theme!==null&&theme.fonts[value]){return cache[value]=(new qx.bom.Font).set(theme.fonts[value]);
}return value;
},isDynamic:function(value){var cache=this._dynamic;

if(value&&(value instanceof qx.bom.Font||cache[value]!==undefined)){return true;
}var theme=this.getTheme();

if(theme!==null&&value&&theme.fonts[value]){cache[value]=(new qx.bom.Font).set(theme.fonts[value]);
return true;
}return false;
},_applyTheme:function(value){var dest=this._getDynamic();

for(var key in dest){if(dest[key].themed){dest[key].dispose();
delete dest[key];
}}
if(value){var source=value.fonts;
var font=qx.bom.Font;

for(var key in source){dest[key]=(new font).set(source[key]);
dest[key].themed=true;
}}this._setDynamic(dest);
}}});
})();
(function(){var SSSS_0="",SSSS_1="underline",SSSS_2="Boolean",SSSS_3="px",SSSS_4='"',SSSS_5="italic",SSSS_6="normal",SSSS_7="bold",SSSS_8="_applyItalic",SSSS_9="_applyBold",SSSS_10="Integer",SSSS_11="_applyFamily",SSSS_12="_applyLineHeight",SSSS_13="Array",SSSS_14="overline",SSSS_15="line-through",SSSS_16="qx.bom.Font",SSSS_17="Number",SSSS_18="_applyDecoration",SSSS_19=" ",SSSS_20="_applySize",SSSS_21=",";
qx.Class.define(SSSS_16,{extend:qx.core.Object,construct:function(size,family){arguments.callee.base.call(this);

if(size!==undefined){this.setSize(size);
}
if(family!==undefined){this.setFamily(family);
}},statics:{fromString:function(str){var font=new qx.bom.Font();
var parts=str.split(/\s+/);
var name=[];
var part;

for(var i=0;i<parts.length;i++){switch(part=parts[i]){case SSSS_7:font.setBold(true);
break;
case SSSS_5:font.setItalic(true);
break;
case SSSS_1:font.setDecoration(SSSS_1);
break;
default:var temp=parseInt(part,10);

if(temp==part||qx.lang.String.contains(part,SSSS_3)){font.setSize(temp);
}else{name.push(part);
}break;
}}
if(name.length>0){font.setFamily(name);
}return font;
},fromConfig:function(config){var font=new qx.bom.Font;
font.set(config);
return font;
},__di:{fontFamily:SSSS_0,fontSize:SSSS_0,fontWeight:SSSS_0,fontStyle:SSSS_0,textDecoration:SSSS_0,lineHeight:1.2},getDefaultStyles:function(){return this.__di;
}},properties:{size:{check:SSSS_10,nullable:true,apply:SSSS_20},lineHeight:{check:SSSS_17,nullable:true,apply:SSSS_12},family:{check:SSSS_13,nullable:true,apply:SSSS_11},bold:{check:SSSS_2,nullable:true,apply:SSSS_9},italic:{check:SSSS_2,nullable:true,apply:SSSS_8},decoration:{check:[SSSS_1,SSSS_15,SSSS_14],nullable:true,apply:SSSS_18}},members:{__dj:null,__dk:null,__dl:null,__dm:null,__dn:null,__do:null,_applySize:function(value,old){this.__dj=value===null?null:value+SSSS_3;
},_applyLineHeight:function(value,old){this.__do=value===null?null:value;
},_applyFamily:function(value,old){var family=SSSS_0;

for(var i=0,l=value.length;i<l;i++){if(value[i].indexOf(SSSS_19)>0){family+=SSSS_4+value[i]+SSSS_4;
}else{family+=value[i];
}
if(i!==l-1){family+=SSSS_21;
}}this.__dk=family;
},_applyBold:function(value,old){this.__dl=value===null?null:value?SSSS_7:SSSS_6;
},_applyItalic:function(value,old){this.__dm=value===null?null:value?SSSS_5:SSSS_6;
},_applyDecoration:function(value,old){this.__dn=value===null?null:value;
},getStyles:function(){return {fontFamily:this.__dk,fontSize:this.__dj,fontWeight:this.__dl,fontStyle:this.__dm,textDecoration:this.__dn,lineHeight:this.__do};
}}});
})();
(function(){var SSSS_0="qx.theme.manager.Icon",SSSS_1="Theme",SSSS_2="_applyTheme",SSSS_3="singleton";
qx.Class.define(SSSS_0,{type:SSSS_3,extend:qx.core.Object,properties:{theme:{check:SSSS_1,nullable:true,apply:SSSS_2}},members:{_applyTheme:function(value,old){var aliasManager=qx.util.AliasManager.getInstance();

if(old){for(var alias in old.aliases){aliasManager.remove(alias);
}}
if(value){for(var alias in value.aliases){aliasManager.add(alias,value.aliases[alias]);
}}}}});
})();
(function(){var SSSS_0="string",SSSS_1="_applyTheme",SSSS_2="qx.theme.manager.Appearance",SSSS_3=":",SSSS_4="Theme",SSSS_5="changeTheme",SSSS_6="/",SSSS_7="singleton";
qx.Class.define(SSSS_2,{type:SSSS_7,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__dp={};
this.__dq={};
},properties:{theme:{check:SSSS_4,nullable:true,event:SSSS_5,apply:SSSS_1}},members:{__dr:{},__dp:null,__dq:null,_applyTheme:function(value,old){this.__dq={};
this.__dp={};
},__ds:function(id,theme,defaultId){var db=theme.appearances;
var entry=db[id];

if(!entry){var divider=SSSS_6;
var end=[];
var splitted=id.split(divider);
var alias;

while(!entry&&splitted.length>0){end.unshift(splitted.pop());
var baseid=splitted.join(divider);
entry=db[baseid];

if(entry){alias=entry.alias||entry;

if(typeof alias===SSSS_0){var mapped=alias+divider+end.join(divider);
return this.__ds(mapped,theme,defaultId);
}}}if(defaultId!=null){return this.__ds(defaultId,theme);
}return null;
}else if(typeof entry===SSSS_0){return this.__ds(entry,theme,defaultId);
}else if(entry.include&&!entry.style){return this.__ds(entry.include,theme,defaultId);
}return id;
},styleFrom:function(id,states,theme,defaultId){if(!theme){theme=this.getTheme();
}var aliasMap=this.__dq;
var resolved=aliasMap[id];

if(!resolved){resolved=aliasMap[id]=this.__ds(id,theme,defaultId);
}var entry=theme.appearances[resolved];

if(!entry){this.warn("Missing appearance: "+id);
return null;
}if(!entry.style){return null;
}var unique=resolved;

if(states){var bits=entry.$$bits;

if(!bits){bits=entry.$$bits={};
entry.$$length=0;
}var sum=0;

for(var state in states){if(!states[state]){continue;
}
if(bits[state]==null){bits[state]=1<<entry.$$length++;
}sum+=bits[state];
}if(sum>0){unique+=SSSS_3+sum;
}}var cache=this.__dp;

if(cache[unique]!==undefined){return cache[unique];
}if(!states){states=this.__dr;
}var result;
if(entry.include||entry.base){var local=entry.style(states);
var incl;

if(entry.include){incl=this.styleFrom(entry.include,states,theme,defaultId);
}result={};
if(entry.base){var base=this.styleFrom(resolved,states,entry.base,defaultId);

if(entry.include){for(var key in base){if(!incl.hasOwnProperty(key)&&!local.hasOwnProperty(key)){result[key]=base[key];
}}}else{for(var key in base){if(!local.hasOwnProperty(key)){result[key]=base[key];
}}}}if(entry.include){for(var key in incl){if(!local.hasOwnProperty(key)){result[key]=incl[key];
}}}for(var key in local){result[key]=local[key];
}}else{result=entry.style(states);
}return cache[unique]=result||null;
}},destruct:function(){this.__dp=this.__dq=null;
}});
})();
(function(){var SSSS_0="focusout",SSSS_1="interval",SSSS_2="mouseover",SSSS_3="mouseout",SSSS_4="mousemove",SSSS_5="widget",SSSS_6="qx.ui.tooltip.ToolTip",SSSS_7="Boolean",SSSS_8="__dt",SSSS_9="_applyCurrent",SSSS_10="__du",SSSS_11="qx.ui.tooltip.Manager",SSSS_12="__dw",SSSS_13="tooltip-error",SSSS_14="singleton";
qx.Class.define(SSSS_11,{type:SSSS_14,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
qx.event.Registration.addListener(document.body,SSSS_2,this.__dD,this,true);
this.__dt=new qx.event.Timer();
this.__dt.addListener(SSSS_1,this.__dA,this);
this.__du=new qx.event.Timer();
this.__du.addListener(SSSS_1,this.__dB,this);
this.__dv={left:0,top:0};
},properties:{current:{check:SSSS_6,nullable:true,apply:SSSS_9},showInvalidTooltips:{check:SSSS_7,init:true}},members:{__dv:null,__du:null,__dt:null,__dw:null,__dx:null,__dy:function(){if(!this.__dw){this.__dw=new qx.ui.tooltip.ToolTip().set({rich:true});
}return this.__dw;
},__dz:function(){if(!this.__dx){this.__dx=new qx.ui.tooltip.ToolTip().set({appearance:SSSS_13});
this.__dx.syncAppearance();
}return this.__dx;
},_applyCurrent:function(value,old){if(old&&qx.ui.core.Widget.contains(old,value)){return;
}if(old){if(!old.isDisposed()){old.exclude();
}this.__dt.stop();
this.__du.stop();
}var Registration=qx.event.Registration;
var el=document.body;
if(value){this.__dt.startWith(value.getShowTimeout());
Registration.addListener(el,SSSS_3,this.__dE,this,true);
Registration.addListener(el,SSSS_0,this.__dF,this,true);
Registration.addListener(el,SSSS_4,this.__dC,this,true);
}else{Registration.removeListener(el,SSSS_3,this.__dE,this,true);
Registration.removeListener(el,SSSS_0,this.__dF,this,true);
Registration.removeListener(el,SSSS_4,this.__dC,this,true);
}},__dA:function(e){var current=this.getCurrent();

if(current&&!current.isDisposed()){this.__du.startWith(current.getHideTimeout());

if(current.getPlaceMethod()==SSSS_5){current.placeToWidget(current.getOpener());
}else{current.placeToPoint(this.__dv);
}current.show();
}this.__dt.stop();
},__dB:function(e){var current=this.getCurrent();

if(current&&!current.isDisposed()){current.exclude();
}this.__du.stop();
this.resetCurrent();
},__dC:function(e){var pos=this.__dv;
pos.left=e.getDocumentLeft();
pos.top=e.getDocumentTop();
},__dD:function(e){var target=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!target){return;
}var tooltip;
while(target!=null){var tooltip=target.getToolTip();
var tooltipText=target.getToolTipText()||null;
var tooltipIcon=target.getToolTipIcon()||null;

if(qx.Class.hasInterface(target.constructor,qx.ui.form.IForm)&&!target.isValid()){var invalidMessage=target.getInvalidMessage();
}
if(tooltip||tooltipText||tooltipIcon||invalidMessage){break;
}target=target.getLayoutParent();
}
if(!target){return;
}
if(target.isBlockToolTip()){return;
}if(invalidMessage&&target.getEnabled()){if(!this.getShowInvalidTooltips()){return;
}var tooltip=this.__dz().set({label:invalidMessage});
}else if(!tooltip){var tooltip=this.__dy().set({label:tooltipText,icon:tooltipIcon});
}this.setCurrent(tooltip);
tooltip.setOpener(target);
},__dE:function(e){var target=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!target){return;
}var related=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());

if(!related){return;
}var tooltip=this.getCurrent();
if(tooltip&&(related==tooltip||qx.ui.core.Widget.contains(tooltip,related))){return;
}if(related&&target&&qx.ui.core.Widget.contains(target,related)){return;
}if(tooltip&&!related){this.setCurrent(null);
}else{this.resetCurrent();
}},__dF:function(e){var target=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!target){return;
}var tooltip=this.getCurrent();
if(tooltip&&tooltip==target.getToolTip()){this.setCurrent(null);
}}},destruct:function(){qx.event.Registration.removeListener(document.body,SSSS_2,this.__dD,this,true);
this._disposeObjects(SSSS_8,SSSS_10,SSSS_12);
this.__dv=null;
}});
})();
(function(){var SSSS_0="interval",SSSS_1="qx.event.Timer",SSSS_2="_applyInterval",SSSS_3="_applyEnabled",SSSS_4="Boolean",SSSS_5="qx.event.type.Event",SSSS_6="Integer";
qx.Class.define(SSSS_1,{extend:qx.core.Object,construct:function(interval){arguments.callee.base.call(this);
this.setEnabled(false);

if(interval!=null){this.setInterval(interval);
}this.__dG=qx.lang.Function.bind(this._oninterval,this);
},events:{"interval":SSSS_5},statics:{once:function(func,obj,timeout){var timer=new qx.event.Timer(timeout);
timer.addListener(SSSS_0,function(e){timer.stop();
func.call(obj,e);
timer.dispose();
obj=null;
},obj);
timer.start();
return timer;
}},properties:{enabled:{init:true,check:SSSS_4,apply:SSSS_3},interval:{check:SSSS_6,init:1000,apply:SSSS_2}},members:{__dH:null,__dG:null,_applyInterval:function(value,old){if(this.getEnabled()){this.restart();
}},_applyEnabled:function(value,old){if(old){window.clearInterval(this.__dH);
this.__dH=null;
}else if(value){this.__dH=window.setInterval(this.__dG,this.getInterval());
}},start:function(){this.setEnabled(true);
},startWith:function(interval){this.setInterval(interval);
this.start();
},stop:function(){this.setEnabled(false);
},restart:function(){this.stop();
this.start();
},restartWith:function(interval){this.stop();
this.startWith(interval);
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.getEnabled()){this.fireEvent(SSSS_0);
}})},destruct:function(){if(this.__dH){window.clearInterval(this.__dH);
}this.__dH=this.__dG=null;
}});
})();
(function(){var SSSS_0="qx.ui.core.MChildrenHandling";
qx.Mixin.define(SSSS_0,{members:{getChildren:function(){return this._getChildren();
},hasChildren:function(){return this._hasChildren();
},indexOf:function(child){return this._indexOf(child);
},add:function(child,options){this._add(child,options);
},addAt:function(child,index,options){this._addAt(child,index,options);
},addBefore:function(child,before,options){this._addBefore(child,before,options);
},addAfter:function(child,after,options){this._addAfter(child,after,options);
},remove:function(child){this._remove(child);
},removeAt:function(index){return this._removeAt(index);
},removeAll:function(){this._removeAll();
}},statics:{remap:function(members){members.getChildren=members._getChildren;
members.hasChildren=members._hasChildren;
members.indexOf=members._indexOf;
members.add=members._add;
members.addAt=members._addAt;
members.addBefore=members._addBefore;
members.addAfter=members._addAfter;
members.remove=members._remove;
members.removeAt=members._removeAt;
members.removeAll=members._removeAll;
}}});
})();
(function(){var SSSS_0="qx.ui.core.MLayoutHandling";
qx.Mixin.define(SSSS_0,{members:{setLayout:function(layout){return this._setLayout(layout);
},getLayout:function(){return this._getLayout();
}},statics:{remap:function(members){members.getLayout=members._getLayout;
members.setLayout=members._setLayout;
}}});
})();
(function(){var SSSS_0="Integer",SSSS_1="_applyDimension",SSSS_2="Boolean",SSSS_3="_applyStretching",SSSS_4="_applyMargin",SSSS_5="shorthand",SSSS_6="_applyAlign",SSSS_7="allowShrinkY",SSSS_8="bottom",SSSS_9="baseline",SSSS_10="marginBottom",SSSS_11="qx.ui.core.LayoutItem",SSSS_12="center",SSSS_13="marginTop",SSSS_14="allowGrowX",SSSS_15="middle",SSSS_16="marginLeft",SSSS_17="allowShrinkX",SSSS_18="top",SSSS_19="right",SSSS_20="marginRight",SSSS_21="abstract",SSSS_22="allowGrowY",SSSS_23="left";
qx.Class.define(SSSS_11,{type:SSSS_21,extend:qx.core.Object,properties:{minWidth:{check:SSSS_0,nullable:true,apply:SSSS_1,init:null,themeable:true},width:{check:SSSS_0,nullable:true,apply:SSSS_1,init:null,themeable:true},maxWidth:{check:SSSS_0,nullable:true,apply:SSSS_1,init:null,themeable:true},minHeight:{check:SSSS_0,nullable:true,apply:SSSS_1,init:null,themeable:true},height:{check:SSSS_0,nullable:true,apply:SSSS_1,init:null,themeable:true},maxHeight:{check:SSSS_0,nullable:true,apply:SSSS_1,init:null,themeable:true},allowGrowX:{check:SSSS_2,apply:SSSS_3,init:true,themeable:true},allowShrinkX:{check:SSSS_2,apply:SSSS_3,init:true,themeable:true},allowGrowY:{check:SSSS_2,apply:SSSS_3,init:true,themeable:true},allowShrinkY:{check:SSSS_2,apply:SSSS_3,init:true,themeable:true},allowStretchX:{group:[SSSS_14,SSSS_17],mode:SSSS_5,themeable:true},allowStretchY:{group:[SSSS_22,SSSS_7],mode:SSSS_5,themeable:true},marginTop:{check:SSSS_0,init:0,apply:SSSS_4,themeable:true},marginRight:{check:SSSS_0,init:0,apply:SSSS_4,themeable:true},marginBottom:{check:SSSS_0,init:0,apply:SSSS_4,themeable:true},marginLeft:{check:SSSS_0,init:0,apply:SSSS_4,themeable:true},margin:{group:[SSSS_13,SSSS_20,SSSS_10,SSSS_16],mode:SSSS_5,themeable:true},alignX:{check:[SSSS_23,SSSS_12,SSSS_19],nullable:true,apply:SSSS_6,themeable:true},alignY:{check:[SSSS_18,SSSS_15,SSSS_8,SSSS_9],nullable:true,apply:SSSS_6,themeable:true}},members:{__dI:null,__dJ:null,__dK:null,__dL:null,__dM:null,__dN:null,__dO:null,getBounds:function(){return this.__dN||this.__dJ||null;
},clearSeparators:function(){},renderSeparator:function(separator,bounds){},renderLayout:function(left,top,width,height){var msg;
{};
var flowHeight=null;

if(this.getHeight()==null&&this._hasHeightForWidth()){var flowHeight=this._getHeightForWidth(width);
}
if(flowHeight!=null&&flowHeight!==this.__dI){this.__dI=flowHeight;
qx.ui.core.queue.Layout.add(this);
return null;
}var computed=this.__dJ;

if(!computed){computed=this.__dJ={};
}var changes={};

if(left!==computed.left||top!==computed.top){changes.position=true;
computed.left=left;
computed.top=top;
}
if(width!==computed.width||height!==computed.height){changes.size=true;
computed.width=width;
computed.height=height;
}if(this.__dK){changes.local=true;
delete this.__dK;
}
if(this.__dM){changes.margin=true;
delete this.__dM;
}return changes;
},isExcluded:function(){return false;
},hasValidLayout:function(){return !this.__dK;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutCache:function(){this.__dK=true;
this.__dL=null;
},getSizeHint:function(compute){var hint=this.__dL;

if(hint){return hint;
}
if(compute===false){return null;
}hint=this.__dL=this._computeSizeHint();
if(this._hasHeightForWidth()&&this.__dI&&this.getHeight()==null){hint.height=this.__dI;
}if(hint.minWidth>hint.width){hint.width=hint.minWidth;
}
if(hint.maxWidth<hint.width){hint.width=hint.maxWidth;
}
if(!this.getAllowGrowX()){hint.maxWidth=hint.width;
}
if(!this.getAllowShrinkX()){hint.minWidth=hint.width;
}if(hint.minHeight>hint.height){hint.height=hint.minHeight;
}
if(hint.maxHeight<hint.height){hint.height=hint.maxHeight;
}
if(!this.getAllowGrowY()){hint.maxHeight=hint.height;
}
if(!this.getAllowShrinkY()){hint.minHeight=hint.height;
}return hint;
},_computeSizeHint:function(){var minWidth=this.getMinWidth()||0;
var minHeight=this.getMinHeight()||0;
var width=this.getWidth()||minWidth;
var height=this.getHeight()||minHeight;
var maxWidth=this.getMaxWidth()||Infinity;
var maxHeight=this.getMaxHeight()||Infinity;
return {minWidth:minWidth,width:width,maxWidth:maxWidth,minHeight:minHeight,height:height,maxHeight:maxHeight};
},_hasHeightForWidth:function(){var layout=this._getLayout();

if(layout){return layout.hasHeightForWidth();
}return false;
},_getHeightForWidth:function(width){var layout=this._getLayout();

if(layout&&layout.hasHeightForWidth()){return layout.getHeightForWidth(width);
}return null;
},_getLayout:function(){return null;
},_applyMargin:function(){this.__dM=true;
var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyAlign:function(){var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyDimension:function(){qx.ui.core.queue.Layout.add(this);
},_applyStretching:function(){qx.ui.core.queue.Layout.add(this);
},hasUserBounds:function(){return !!this.__dN;
},setUserBounds:function(left,top,width,height){this.__dN={left:left,top:top,width:width,height:height};
qx.ui.core.queue.Layout.add(this);
},resetUserBounds:function(){delete this.__dN;
qx.ui.core.queue.Layout.add(this);
},__dP:{},setLayoutProperties:function(props){if(props==null){return;
}var storage=this.__dO;

if(!storage){storage=this.__dO={};
}var parent=this.getLayoutParent();

if(parent){parent.updateLayoutProperties(props);
}for(var key in props){if(props[key]==null){delete storage[key];
}else{storage[key]=props[key];
}}},getLayoutProperties:function(){return this.__dO||this.__dP;
},clearLayoutProperties:function(){delete this.__dO;
},updateLayoutProperties:function(props){var layout=this._getLayout();

if(layout){var key;
{};
layout.invalidateChildrenCache();
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
},clone:function(){var clone=arguments.callee.base.call(this);
var props=this.__dO;

if(props){clone.__dO=qx.lang.Object.clone(props);
}return clone;
},serialize:function(){var result=arguments.callee.base.call(this);
var props=this.__dO;

if(props){result.layoutProperties=qx.lang.Object.clone(props);
}return result;
}},destruct:function(){this.$$parent=this.$$subparent=this.__dO=this.__dJ=this.__dN=this.__dL=null;
}});
})();
(function(){var SSSS_0="qx.ui.core.DecoratorFactory",SSSS_1="$$nopool$$";
qx.Class.define(SSSS_0,{extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__dQ={};
},statics:{MAX_SIZE:15,__dR:SSSS_1},members:{__dQ:null,getDecoratorElement:function(decorator){var clazz=qx.ui.core.DecoratorFactory;

if(qx.lang.Type.isString(decorator)){var id=decorator;
var decoratorInstance=qx.theme.manager.Decoration.getInstance().resolve(decorator);
}else{var id=clazz.__dR;
decoratorInstance=decorator;
}var pool=this.__dQ;

if(pool[id]&&pool[id].length>0){var element=pool[id].pop();
}else{var element=this._createDecoratorElement(decoratorInstance,id);
}element.$$pooled=false;
return element;
},poolDecorator:function(decoratorElement){if(!decoratorElement||decoratorElement.$$pooled){return;
}var clazz=qx.ui.core.DecoratorFactory;
var id=decoratorElement.getId();

if(id==clazz.__dR){decoratorElement.dispose();
return;
}var pool=this.__dQ;

if(!pool[id]){pool[id]=[];
}
if(pool[id].length>clazz.MAX_SIZE){decoratorElement.dispose();
}else{decoratorElement.$$pooled=true;
pool[id].push(decoratorElement);
}},_createDecoratorElement:function(decorator,id){var element=new qx.html.Decorator(decorator,id);
{};
return element;
},toString:function(){return arguments.callee.base.call(this);
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){var pool=this.__dQ;

for(var key in pool){qx.util.DisposeUtil.disposeArray(pool,key);
}}this.__dQ=null;
}});
})();
(function(){var SSSS_0="px",SSSS_1="Boolean",SSSS_2="qx.event.type.Mouse",SSSS_3="qx.event.type.Drag",SSSS_4="visible",SSSS_5="qx.event.type.Focus",SSSS_6="on",SSSS_7="Integer",SSSS_8="excluded",SSSS_9="qx.event.type.Data",SSSS_10="_applyPadding",SSSS_11="qx.event.type.Event",SSSS_12="hidden",SSSS_13="contextmenu",SSSS_14="String",SSSS_15="tabIndex",SSSS_16="backgroundColor",SSSS_17="focused",SSSS_18="changeVisibility",SSSS_19="mshtml",SSSS_20="hovered",SSSS_21="qx.event.type.KeySequence",SSSS_22="qx.client",SSSS_23="absolute",SSSS_24="drag",SSSS_25="div",SSSS_26="disabled",SSSS_27="move",SSSS_28="dragstart",SSSS_29="qx.dynlocale",SSSS_30="dragchange",SSSS_31="dragend",SSSS_32="resize",SSSS_33="Decorator",SSSS_34="zIndex",SSSS_35="$$widget",SSSS_36="opacity",SSSS_37="default",SSSS_38="Color",SSSS_39="changeToolTipText",SSSS_40="beforeContextmenuOpen",SSSS_41="_applyNativeContextMenu",SSSS_42="__ef",SSSS_43="_applyBackgroundColor",SSSS_44="_applyFocusable",SSSS_45="changeShadow",SSSS_46="__ec",SSSS_47="qx.event.type.KeyInput",SSSS_48="__dX",SSSS_49="createChildControl",SSSS_50="Font",SSSS_51="_applyShadow",SSSS_52="__dT",SSSS_53="_applyEnabled",SSSS_54="_applySelectable",SSSS_55="Number",SSSS_56="_applyKeepActive",SSSS_57="__dY",SSSS_58="_applyVisibility",SSSS_59="repeat",SSSS_60="qxDraggable",SSSS_61="syncAppearance",SSSS_62="paddingLeft",SSSS_63="_applyDroppable",SSSS_64="__eh",SSSS_65="#",SSSS_66="_applyCursor",SSSS_67="_applyDraggable",SSSS_68="changeTextColor",SSSS_69="changeContextMenu",SSSS_70="__dS",SSSS_71="paddingTop",SSSS_72="changeSelectable",SSSS_73="hideFocus",SSSS_74="none",SSSS_75="outline",SSSS_76="_applyAppearance",SSSS_77="_applyOpacity",SSSS_78="url(",SSSS_79=")",SSSS_80="qx.ui.core.Widget",SSSS_81="_applyFont",SSSS_82="cursor",SSSS_83="qxDroppable",SSSS_84="changeZIndex",SSSS_85="changeEnabled",SSSS_86="changeFont",SSSS_87="_applyDecorator",SSSS_88="_applyZIndex",SSSS_89="_applyTextColor",SSSS_90="qx.ui.menu.Menu",SSSS_91="_applyToolTipText",SSSS_92="true",SSSS_93="widget",SSSS_94="changeDecorator",SSSS_95="_applyTabIndex",SSSS_96="changeAppearance",SSSS_97="shorthand",SSSS_98="/",SSSS_99="",SSSS_100="_applyContextMenu",SSSS_101="paddingBottom",SSSS_102="__dW",SSSS_103="changeNativeContextMenu",SSSS_104="qx.ui.tooltip.ToolTip",SSSS_105="qxKeepActive",SSSS_106="_applyKeepFocus",SSSS_107="paddingRight",SSSS_108="changeBackgroundColor",SSSS_109="changeLocale",SSSS_110="qxKeepFocus",SSSS_111="qx/static/blank.gif";
qx.Class.define(SSSS_80,{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){arguments.callee.base.call(this);
this.__dS=this._createContainerElement();
this.__dT=this.__eg();
this.__dS.add(this.__dT);
this.initFocusable();
this.initSelectable();
this.initNativeContextMenu();
},events:{appear:SSSS_11,disappear:SSSS_11,createChildControl:SSSS_9,resize:SSSS_9,move:SSSS_9,syncAppearance:SSSS_9,mousemove:SSSS_2,mouseover:SSSS_2,mouseout:SSSS_2,mousedown:SSSS_2,mouseup:SSSS_2,click:SSSS_2,dblclick:SSSS_2,contextmenu:SSSS_2,beforeContextmenuOpen:SSSS_2,mousewheel:SSSS_2,keyup:SSSS_21,keydown:SSSS_21,keypress:SSSS_21,keyinput:SSSS_47,focus:SSSS_5,blur:SSSS_5,focusin:SSSS_5,focusout:SSSS_5,activate:SSSS_5,deactivate:SSSS_5,capture:SSSS_11,losecapture:SSSS_11,drop:SSSS_3,dragleave:SSSS_3,dragover:SSSS_3,drag:SSSS_3,dragstart:SSSS_3,dragend:SSSS_3,dragchange:SSSS_3,droprequest:SSSS_3},properties:{paddingTop:{check:SSSS_7,init:0,apply:SSSS_10,themeable:true},paddingRight:{check:SSSS_7,init:0,apply:SSSS_10,themeable:true},paddingBottom:{check:SSSS_7,init:0,apply:SSSS_10,themeable:true},paddingLeft:{check:SSSS_7,init:0,apply:SSSS_10,themeable:true},padding:{group:[SSSS_71,SSSS_107,SSSS_101,SSSS_62],mode:SSSS_97,themeable:true},zIndex:{nullable:true,init:null,apply:SSSS_88,event:SSSS_84,check:SSSS_7,themeable:true},decorator:{nullable:true,init:null,apply:SSSS_87,event:SSSS_94,check:SSSS_33,themeable:true},shadow:{nullable:true,init:null,apply:SSSS_51,event:SSSS_45,check:SSSS_33,themeable:true},backgroundColor:{nullable:true,check:SSSS_38,apply:SSSS_43,event:SSSS_108,themeable:true},textColor:{nullable:true,check:SSSS_38,apply:SSSS_89,event:SSSS_68,themeable:true,inheritable:true},font:{nullable:true,apply:SSSS_81,check:SSSS_50,event:SSSS_86,themeable:true,inheritable:true},opacity:{check:SSSS_55,apply:SSSS_77,themeable:true,nullable:true,init:null},cursor:{check:SSSS_14,apply:SSSS_66,themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:SSSS_104,nullable:true},toolTipText:{check:SSSS_14,nullable:true,event:SSSS_39,apply:SSSS_91},toolTipIcon:{check:SSSS_14,nullable:true,event:SSSS_39},blockToolTip:{check:SSSS_1,init:false},visibility:{check:[SSSS_4,SSSS_12,SSSS_8],init:SSSS_4,apply:SSSS_58,event:SSSS_18},enabled:{init:true,check:SSSS_1,inheritable:true,apply:SSSS_53,event:SSSS_85},anonymous:{init:false,check:SSSS_1},tabIndex:{check:SSSS_7,nullable:true,apply:SSSS_95},focusable:{check:SSSS_1,init:false,apply:SSSS_44},keepFocus:{check:SSSS_1,init:false,apply:SSSS_106},keepActive:{check:SSSS_1,init:false,apply:SSSS_56},draggable:{check:SSSS_1,init:false,apply:SSSS_67},droppable:{check:SSSS_1,init:false,apply:SSSS_63},selectable:{check:SSSS_1,init:false,event:SSSS_72,apply:SSSS_54},contextMenu:{check:SSSS_90,apply:SSSS_100,nullable:true,event:SSSS_69},nativeContextMenu:{check:SSSS_1,init:false,themeable:true,event:SSSS_103,apply:SSSS_41},appearance:{check:SSSS_14,init:SSSS_93,apply:SSSS_76,event:SSSS_96}},statics:{DEBUG:false,getWidgetByElement:function(element){while(element){var widgetKey=element.$$widget;
if(widgetKey!=null){return qx.core.ObjectRegistry.fromHashCode(widgetKey);
}element=element.parentNode;
}return null;
},contains:function(parent,child){while(child){if(parent==child){return true;
}child=child.getLayoutParent();
}return false;
},__dU:new qx.ui.core.DecoratorFactory(),__dV:new qx.ui.core.DecoratorFactory()},members:{__dS:null,__dT:null,__dW:null,__dX:null,__dY:null,__ea:null,__eb:null,__ec:null,_getLayout:function(){return this.__ec;
},_setLayout:function(layout){{};

if(this.__ec){this.__ec.connectToWidget(null);
}
if(layout){layout.connectToWidget(this);
}this.__ec=layout;
qx.ui.core.queue.Layout.add(this);
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}var container=this.getContainerElement();

if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(container);
}this.$$parent=parent||null;

if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(container);
}qx.core.Property.refresh(this);
qx.ui.core.queue.Visibility.add(this);
},_updateInsets:null,__ee:function(a,b){if(a==b){return false;
}
if(a==null||b==null){return true;
}var manager=qx.theme.manager.Decoration.getInstance();
var first=manager.resolve(a).getInsets();
var second=manager.resolve(b).getInsets();

if(first.top!=second.top||first.right!=second.right||first.bottom!=second.bottom||first.left!=second.left){return true;
}return false;
},renderLayout:function(left,top,width,height){var changes=arguments.callee.base.call(this,left,top,width,height);
if(!changes){return;
}var container=this.getContainerElement();
var content=this.getContentElement();
var inner=changes.size||this._updateInsets;
var pixel=SSSS_0;
var containerStyles={};
if(changes.position){containerStyles.left=left+pixel;
containerStyles.top=top+pixel;
}if(changes.size){containerStyles.width=width+pixel;
containerStyles.height=height+pixel;
}
if(changes.position||changes.size){container.setStyles(containerStyles);
}
if(inner||changes.local||changes.margin){var insets=this.getInsets();
var innerWidth=width-insets.left-insets.right;
var innerHeight=height-insets.top-insets.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}var contentStyles={};

if(this._updateInsets){contentStyles.left=insets.left+pixel;
contentStyles.top=insets.top+pixel;
}
if(inner){contentStyles.width=innerWidth+pixel;
contentStyles.height=innerHeight+pixel;
}
if(inner||this._updateInsets){content.setStyles(contentStyles);
}
if(changes.size){var protector=this.__dY;

if(protector){protector.setStyles({width:width+SSSS_0,height:height+SSSS_0});
}}
if(changes.size||this._updateInsets){if(this.__dW){this.__dW.resize(width,height);
}}
if(changes.size){if(this.__dX){var insets=this.__dX.getInsets();
var shadowWidth=width+insets.left+insets.right;
var shadowHeight=height+insets.top+insets.bottom;
this.__dX.resize(shadowWidth,shadowHeight);
}}
if(inner||changes.local||changes.margin){if(this.__ec&&this.hasLayoutChildren()){this.__ec.renderLayout(innerWidth,innerHeight);
}else if(this.hasLayoutChildren()){throw new Error("At least one child in control "+this._findTopControl()+" requires a layout, but no one was defined!");
}}if(changes.position&&this.hasListener(SSSS_27)){this.fireDataEvent(SSSS_27,this.getBounds());
}
if(changes.size&&this.hasListener(SSSS_32)){this.fireDataEvent(SSSS_32,this.getBounds());
}delete this._updateInsets;
return changes;
},__ef:null,clearSeparators:function(){var reg=this.__ef;

if(!reg){return;
}var pool=qx.ui.core.Widget.__dU;
var content=this.getContentElement();
var elem;

for(var i=0,l=reg.length;i<l;i++){elem=reg[i];
pool.poolDecorator(elem);
content.remove(elem);
}reg.length=0;
},renderSeparator:function(separator,bounds){var elem=qx.ui.core.Widget.__dU.getDecoratorElement(separator);
this.getContentElement().add(elem);
elem.resize(bounds.width,bounds.height);
var style=elem.getDomElement().style;
style.left=bounds.left+SSSS_0;
style.top=bounds.top+SSSS_0;
if(!this.__ef){this.__ef=[elem];
}else{this.__ef.push(elem);
}},_computeSizeHint:function(){var width=this.getWidth();
var minWidth=this.getMinWidth();
var maxWidth=this.getMaxWidth();
var height=this.getHeight();
var minHeight=this.getMinHeight();
var maxHeight=this.getMaxHeight();
{};
var contentHint=this._getContentHint();
var insets=this.getInsets();
var insetX=insets.left+insets.right;
var insetY=insets.top+insets.bottom;

if(width==null){width=contentHint.width+insetX;
}
if(height==null){height=contentHint.height+insetY;
}
if(minWidth==null){minWidth=insetX;

if(contentHint.minWidth!=null){minWidth+=contentHint.minWidth;
}}
if(minHeight==null){minHeight=insetY;

if(contentHint.minHeight!=null){minHeight+=contentHint.minHeight;
}}
if(maxWidth==null){if(contentHint.maxWidth==null){maxWidth=Infinity;
}else{maxWidth=contentHint.maxWidth+insetX;
}}
if(maxHeight==null){if(contentHint.maxHeight==null){maxHeight=Infinity;
}else{maxHeight=contentHint.maxHeight+insetY;
}}return {width:width,minWidth:minWidth,maxWidth:maxWidth,height:height,minHeight:minHeight,maxHeight:maxHeight};
},invalidateLayoutCache:function(){arguments.callee.base.call(this);

if(this.__ec){this.__ec.invalidateLayoutCache();
}},_getContentHint:function(){var layout=this.__ec;

if(layout){if(this.hasLayoutChildren()){var msg;
var hint=layout.getSizeHint();
{};
return hint;
}else{return {width:0,height:0};
}}else{return {width:100,height:50};
}},_getHeightForWidth:function(width){var insets=this.getInsets();
var insetX=insets.left+insets.right;
var insetY=insets.top+insets.bottom;
var contentWidth=width-insetX;
var layout=this._getLayout();

if(layout&&layout.hasHeightForWidth()){var contentHeight=layout.getHeightForWidth(width);
}else{contentHeight=this._getContentHeightForWidth(contentWidth);
}var height=contentHeight+insetY;
return height;
},_getContentHeightForWidth:function(width){throw new Error("Abstract method call: _getContentHeightForWidth()!");
},getInsets:function(){var top=this.getPaddingTop();
var right=this.getPaddingRight();
var bottom=this.getPaddingBottom();
var left=this.getPaddingLeft();

if(this.__dW){var inset=this.__dW.getInsets();
{};
top+=inset.top;
right+=inset.right;
bottom+=inset.bottom;
left+=inset.left;
}return {"top":top,"right":right,"bottom":bottom,"left":left};
},getInnerSize:function(){var computed=this.getBounds();

if(!computed){return null;
}var insets=this.getInsets();
return {width:computed.width-insets.left-insets.right,height:computed.height-insets.top-insets.bottom};
},show:function(){this.setVisibility(SSSS_4);
},hide:function(){this.setVisibility(SSSS_12);
},exclude:function(){this.setVisibility(SSSS_8);
},isVisible:function(){return this.getVisibility()===SSSS_4;
},isHidden:function(){return this.getVisibility()!==SSSS_4;
},isExcluded:function(){return this.getVisibility()===SSSS_8;
},isSeeable:function(){var element=this.getContainerElement().getDomElement();

if(element){return element.offsetWidth>0;
}var current=this;

do{if(!current.isVisible()){return false;
}
if(current.isRootWidget()){return true;
}current=current.getLayoutParent();
}while(current);
return false;
},_createContainerElement:function(){var el=new qx.html.Element(SSSS_25);
{};
el.setStyles({"position":SSSS_23,"zIndex":0});
el.setAttribute(SSSS_35,this.toHashCode());
{};
return el;
},__eg:function(){var el=this._createContentElement();
{};
el.setStyles({"position":SSSS_23,"zIndex":10});
return el;
},_createContentElement:function(){var el=new qx.html.Element(SSSS_25);
el.setStyles({"overflowX":SSSS_12,"overflowY":SSSS_12});
return el;
},getContainerElement:function(){return this.__dS;
},getContentElement:function(){return this.__dT;
},getDecoratorElement:function(){return this.__dW;
},__eh:null,getLayoutChildren:function(){var children=this.__eh;

if(!children){return this.__ei;
}var layoutChildren;

for(var i=0,l=children.length;i<l;i++){var child=children[i];

if(child.hasUserBounds()||child.isExcluded()){if(layoutChildren==null){layoutChildren=children.concat();
}qx.lang.Array.remove(layoutChildren,child);
}}return layoutChildren||children;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutChildren:function(){var layout=this.__ec;

if(layout){layout.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},hasLayoutChildren:function(){var children=this.__eh;

if(!children){return false;
}var child;

for(var i=0,l=children.length;i<l;i++){child=children[i];

if(!child.hasUserBounds()&&!child.isExcluded()){return true;
}}return false;
},getChildrenContainer:function(){return this;
},__ei:[],_getChildren:function(){return this.__eh||this.__ei;
},_indexOf:function(child){var children=this.__eh;

if(!children){return -1;
}return children.indexOf(child);
},_hasChildren:function(){var children=this.__eh;
return children!=null&&(!!children[0]);
},addChildrenToQueue:function(queue){var children=this.__eh;

if(!children){return;
}var child;

for(var i=0,l=children.length;i<l;i++){child=children[i];
queue[child.$$hash]=child;
child.addChildrenToQueue(queue);
}},_add:function(child,options){if(child.getLayoutParent()==this){qx.lang.Array.remove(this.__eh,child);
}
if(this.__eh){this.__eh.push(child);
}else{this.__eh=[child];
}this.__ej(child,options);
},_addAt:function(child,index,options){if(!this.__eh){this.__eh=[];
}if(child.getLayoutParent()==this){qx.lang.Array.remove(this.__eh,child);
}var ref=this.__eh[index];

if(ref===child){return child.setLayoutProperties(options);
}
if(ref){qx.lang.Array.insertBefore(this.__eh,child,ref);
}else{this.__eh.push(child);
}this.__ej(child,options);
},_addBefore:function(child,before,options){{};

if(child==before){return;
}
if(!this.__eh){this.__eh=[];
}if(child.getLayoutParent()==this){qx.lang.Array.remove(this.__eh,child);
}qx.lang.Array.insertBefore(this.__eh,child,before);
this.__ej(child,options);
},_addAfter:function(child,after,options){{};

if(child==after){return;
}
if(!this.__eh){this.__eh=[];
}if(child.getLayoutParent()==this){qx.lang.Array.remove(this.__eh,child);
}qx.lang.Array.insertAfter(this.__eh,child,after);
this.__ej(child,options);
},_remove:function(child){if(!this.__eh){throw new Error("This widget has no children!");
}qx.lang.Array.remove(this.__eh,child);
this.__ek(child);
},_removeAt:function(index){if(!this.__eh){throw new Error("This widget has no children!");
}var child=this.__eh[index];
qx.lang.Array.removeAt(this.__eh,index);
this.__ek(child);
return child;
},_removeAll:function(){if(!this.__eh){return;
}var children=this.__eh.concat();
this.__eh.length=0;

for(var i=children.length-1;i>=0;i--){this.__ek(children[i]);
}qx.ui.core.queue.Layout.add(this);
},_afterAddChild:null,_afterRemoveChild:null,__ej:function(child,options){{};
var parent=child.getLayoutParent();

if(parent&&parent!=this){parent._remove(child);
}child.setLayoutParent(this);
if(options){child.setLayoutProperties(options);
}else{this.updateLayoutProperties();
}if(this._afterAddChild){this._afterAddChild(child);
}},__ek:function(child){{};

if(child.getLayoutParent()!==this){throw new Error("Remove Error: "+child+" is not a child of this widget!");
}child.setLayoutParent(null);
if(this.__ec){this.__ec.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
if(this._afterRemoveChild){this._afterRemoveChild(child);
}},capture:function(containerCapture){this.getContainerElement().capture(containerCapture);
},releaseCapture:function(){this.getContainerElement().releaseCapture();
},_applyPadding:function(value,old,name){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
},_createProtectorElement:function(){if(this.__dY){return;
}var protect=this.__dY=new qx.html.Element;
{};
protect.setStyles({position:SSSS_23,top:0,left:0,zIndex:7});
var bounds=this.getBounds();

if(bounds){this.__dY.setStyles({width:bounds.width+SSSS_0,height:bounds.height+SSSS_0});
}if(qx.core.Variant.isSet(SSSS_22,SSSS_19)){protect.setStyles({backgroundImage:SSSS_78+qx.util.ResourceManager.getInstance().toUri(SSSS_111)+SSSS_79,backgroundRepeat:SSSS_59});
}this.getContainerElement().add(protect);
},_applyDecorator:function(value,old){{};
var pool=qx.ui.core.Widget.__dU;
var container=this.getContainerElement();
if(!this.__dY){this._createProtectorElement();
}if(old){container.remove(this.__dW);
pool.poolDecorator(this.__dW);
}if(value){var elem=this.__dW=pool.getDecoratorElement(value);
elem.setStyle(SSSS_34,5);
var bgcolor=this.getBackgroundColor();
elem.tint(bgcolor);
container.add(elem);
}else{delete this.__dW;
this._applyBackgroundColor(this.getBackgroundColor());
}if(value&&!old&&bgcolor){this.getContainerElement().setStyle(SSSS_16,null);
}if(this.__ee(old,value)){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
}else if(value){var bounds=this.getBounds();

if(bounds){elem.resize(bounds.width,bounds.height);
this.__dY.setStyles({width:bounds.width+SSSS_0,height:bounds.height+SSSS_0});
}}},_applyShadow:function(value,old){var pool=qx.ui.core.Widget.__dV;
var container=this.getContainerElement();
if(old){container.remove(this.__dX);
pool.poolDecorator(this.__dX);
}if(value){var elem=this.__dX=pool.getDecoratorElement(value);
container.add(elem);
var insets=elem.getInsets();
elem.setStyles({left:(-insets.left)+SSSS_0,top:(-insets.top)+SSSS_0});
var bounds=this.getBounds();

if(bounds){var shadowWidth=bounds.width+insets.left+insets.right;
var shadowHeight=bounds.height+insets.top+insets.bottom;
elem.resize(shadowWidth,shadowHeight);
}elem.tint(null);
}else{delete this.__dX;
}},_applyToolTipText:function(value,old){if(qx.core.Variant.isSet(SSSS_29,SSSS_6)){if(this.__eb){return;
}var manager=qx.locale.Manager.getInstance();
this.__eb=manager.addListener(SSSS_109,function(){if(value&&value.translate){this.setToolTipText(value.translate());
}},this);
}},_applyTextColor:function(value,old){},_applyZIndex:function(value,old){this.getContainerElement().setStyle(SSSS_34,value==null?0:value);
},_applyVisibility:function(value,old){var container=this.getContainerElement();

if(value===SSSS_4){container.show();
}else{container.hide();
}var parent=this.$$parent;

if(parent&&(old==null||value==null||old===SSSS_8||value===SSSS_8)){parent.invalidateLayoutChildren();
}qx.ui.core.queue.Visibility.add(this);
},_applyOpacity:function(value,old){this.getContainerElement().setStyle(SSSS_36,value==1?null:value);
if(qx.core.Variant.isSet(SSSS_22,SSSS_19)){if(!qx.Class.isSubClassOf(this.getContentElement().constructor,qx.html.Image)){var contentElementOpacity=(value==1||value==null)?null:0.99;
this.getContentElement().setStyle(SSSS_36,contentElementOpacity);
}}},_applyCursor:function(value,old){if(value==null&&!this.isSelectable()){value=SSSS_37;
}this.getContainerElement().setStyle(SSSS_82,value,qx.bom.client.Engine.OPERA);
},_applyBackgroundColor:function(value,old){var color=this.getBackgroundColor();
var container=this.getContainerElement();

if(this.__dW){this.__dW.tint(color);
container.setStyle(SSSS_16,null);
}else{var resolved=qx.theme.manager.Color.getInstance().resolve(color);
container.setStyle(SSSS_16,resolved);
}},_applyFont:function(value,old){},__el:null,$$stateChanges:null,_forwardStates:null,hasState:function(state){var states=this.__el;
return states&&states[state];
},addState:function(state){var states=this.__el;

if(!states){states=this.__el={};
}
if(states[state]){return;
}this.__el[state]=true;
if(state===SSSS_20){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var controls=this.__eo;

if(forward&&forward[state]&&controls){var control;

for(var id in controls){control=controls[id];

if(control instanceof qx.ui.core.Widget){controls[id].addState(state);
}}}},removeState:function(state){var states=this.__el;

if(!states||!states[state]){return;
}delete this.__el[state];
if(state===SSSS_20){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var controls=this.__eo;

if(forward&&forward[state]&&controls){for(var id in controls){var control=controls[id];

if(control instanceof qx.ui.core.Widget){control.removeState(state);
}}}},replaceState:function(old,value){var states=this.__el;

if(!states){states=this.__el={};
}
if(!states[value]){states[value]=true;
}
if(states[old]){delete states[old];
}
if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var controls=this.__eo;

if(forward&&forward[value]&&controls){for(var id in controls){var control=controls[id];

if(control instanceof qx.ui.core.Widget){control.replaceState(old,value);
}}}},__em:null,__en:null,syncAppearance:function(){var states=this.__el;
var selector=this.__em;
var manager=qx.theme.manager.Appearance.getInstance();
var styler=qx.core.Property.$$method.setThemed;
var unstyler=qx.core.Property.$$method.resetThemed;
if(this.__en){delete this.__en;
if(selector){var oldData=manager.styleFrom(selector,states,null,this.getAppearance());
if(oldData){selector=null;
}}}if(!selector){var obj=this;
var id=[];

do{id.push(obj.$$subcontrol||obj.getAppearance());
}while(obj=obj.$$subparent);
selector=this.__em=id.reverse().join(SSSS_98).replace(/#[0-9]+/g,SSSS_99);
}var newData=manager.styleFrom(selector,states,null,this.getAppearance());

if(newData){var prop;

if(oldData){for(var prop in oldData){if(newData[prop]===undefined){this[unstyler[prop]]();
}}}{};
for(var prop in newData){newData[prop]===undefined?this[unstyler[prop]]():this[styler[prop]](newData[prop]);
}}else if(oldData){for(var prop in oldData){this[unstyler[prop]]();
}}this.fireDataEvent(SSSS_61,this.__el);
},_applyAppearance:function(value,old){this.updateAppearance();
},checkAppearanceNeeds:function(){if(!this.__ea){qx.ui.core.queue.Appearance.add(this);
this.__ea=true;
}else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);
delete this.$$stateChanges;
}},updateAppearance:function(){this.__en=true;
qx.ui.core.queue.Appearance.add(this);
var controls=this.__eo;

if(controls){var obj;

for(var id in controls){obj=controls[id];

if(obj instanceof qx.ui.core.Widget){obj.updateAppearance();
}}}},syncWidget:function(){},getEventTarget:function(){var target=this;

while(target.getAnonymous()){target=target.getLayoutParent();

if(!target){return null;
}}return target;
},getFocusTarget:function(){var target=this;

if(!target.getEnabled()){return null;
}
while(target.getAnonymous()||!target.getFocusable()){target=target.getLayoutParent();

if(!target||!target.getEnabled()){return null;
}}return target;
},getFocusElement:function(){return this.getContainerElement();
},isTabable:function(){return this.getContainerElement().getDomElement()&&this.isFocusable();
},_applyFocusable:function(value,old){var target=this.getFocusElement();
if(value){var tabIndex=this.getTabIndex();

if(tabIndex==null){tabIndex=1;
}target.setAttribute(SSSS_15,tabIndex);
if(qx.core.Variant.isSet(SSSS_22,SSSS_19)){target.setAttribute(SSSS_73,SSSS_92);
}else{target.setStyle(SSSS_75,SSSS_74);
}}else{if(target.isNativelyFocusable()){target.setAttribute(SSSS_15,-1);
}else if(old){target.setAttribute(SSSS_15,null);
}}},_applyKeepFocus:function(value){var target=this.getFocusElement();
target.setAttribute(SSSS_110,value?SSSS_6:null);
},_applyKeepActive:function(value){var target=this.getContainerElement();
target.setAttribute(SSSS_105,value?SSSS_6:null);
},_applyTabIndex:function(value){if(value==null){value=1;
}else if(value<1||value>32000){throw new Error("TabIndex property must be between 1 and 32000");
}
if(this.getFocusable()&&value!=null){this.getFocusElement().setAttribute(SSSS_15,value);
}},_applySelectable:function(value){this._applyCursor(this.getCursor());
this.getContainerElement().setSelectable(value);
this.getContentElement().setSelectable(value);
},_applyEnabled:function(value,old){if(value===false){this.addState(SSSS_26);
this.removeState(SSSS_20);
if(this.isFocusable()){this.removeState(SSSS_17);
this._applyFocusable(false,true);
}if(this.isDraggable()){this._applyDraggable(false,true);
}if(this.isDroppable()){this._applyDroppable(false,true);
}}else{this.removeState(SSSS_26);
if(this.isFocusable()){this._applyFocusable(true,false);
}if(this.isDraggable()){this._applyDraggable(true,false);
}if(this.isDroppable()){this._applyDroppable(true,false);
}}},_applyNativeContextMenu:function(value,old,name){},_applyContextMenu:function(value,old){if(old){old.removeState(SSSS_13);

if(old.getOpener()==this){old.resetOpener();
}
if(!value){this.removeListener(SSSS_13,this._onContextMenuOpen);
old.removeListener(SSSS_18,this._onBeforeContextMenuOpen,this);
}}
if(value){value.setOpener(this);
value.addState(SSSS_13);

if(!old){this.addListener(SSSS_13,this._onContextMenuOpen);
value.addListener(SSSS_18,this._onBeforeContextMenuOpen,this);
}}},_onContextMenuOpen:function(e){this.getContextMenu().openAtMouse(e);
e.stop();
},_onBeforeContextMenuOpen:function(e){if(e.getData()==SSSS_4&&this.hasListener(SSSS_40)){this.fireDataEvent(SSSS_40,e);
}},_onStopEvent:function(e){e.stopPropagation();
},_applyDraggable:function(value,old){if(!this.isEnabled()&&value===true){value=false;
}qx.ui.core.DragDropCursor.getInstance();
if(value){this.addListener(SSSS_28,this._onDragStart);
this.addListener(SSSS_24,this._onDrag);
this.addListener(SSSS_31,this._onDragEnd);
this.addListener(SSSS_30,this._onDragChange);
}else{this.removeListener(SSSS_28,this._onDragStart);
this.removeListener(SSSS_24,this._onDrag);
this.removeListener(SSSS_31,this._onDragEnd);
this.removeListener(SSSS_30,this._onDragChange);
}this.getContainerElement().setAttribute(SSSS_60,value?SSSS_6:null);
},_applyDroppable:function(value,old){if(!this.isEnabled()&&value===true){value=false;
}this.getContainerElement().setAttribute(SSSS_83,value?SSSS_6:null);
},_onDragStart:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
this.getApplicationRoot().setGlobalCursor(SSSS_37);
},_onDrag:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
},_onDragEnd:function(e){qx.ui.core.DragDropCursor.getInstance().moveTo(-1000,-1000);
this.getApplicationRoot().resetGlobalCursor();
},_onDragChange:function(e){var cursor=qx.ui.core.DragDropCursor.getInstance();
var action=e.getCurrentAction();
action?cursor.setAction(action):cursor.resetAction();
},visualizeFocus:function(){this.addState(SSSS_17);
},visualizeBlur:function(){this.removeState(SSSS_17);
},scrollChildIntoView:function(child,alignX,alignY,direct){this.scrollChildIntoViewX(child,alignX,direct);
this.scrollChildIntoViewY(child,alignY,direct);
},scrollChildIntoViewX:function(child,align,direct){this.getContentElement().scrollChildIntoViewX(child.getContainerElement(),align,direct);
},scrollChildIntoViewY:function(child,align,direct){this.getContentElement().scrollChildIntoViewY(child.getContainerElement(),align,direct);
},focus:function(){if(this.isFocusable()){this.getFocusElement().focus();
}else{throw new Error("Widget is not focusable!");
}},blur:function(){if(this.isFocusable()){this.getFocusElement().blur();
}else{throw new Error("Widget is not focusable!");
}},activate:function(){this.getContainerElement().activate();
},deactivate:function(){this.getContainerElement().deactivate();
},tabFocus:function(){this.getFocusElement().focus();
},hasChildControl:function(id){if(!this.__eo){return false;
}return !!this.__eo[id];
},__eo:null,_getCreatedChildControls:function(){return this.__eo;
},getChildControl:function(id,notcreate){if(!this.__eo){if(notcreate){return null;
}this.__eo={};
}var control=this.__eo[id];

if(control){return control;
}
if(notcreate===true){return null;
}return this._createChildControl(id);
},_showChildControl:function(id){var control=this.getChildControl(id);
control.show();
return control;
},_excludeChildControl:function(id){var control=this.getChildControl(id,true);

if(control){control.exclude();
}},_isChildControlVisible:function(id){var control=this.getChildControl(id,true);

if(control){return control.isVisible();
}return false;
},_createChildControl:function(id){if(!this.__eo){this.__eo={};
}else if(this.__eo[id]){throw new Error("Child control '"+id+"' already created!");
}var pos=id.indexOf(SSSS_65);

if(pos==-1){var control=this._createChildControlImpl(id);
}else{var control=this._createChildControlImpl(id.substring(0,pos));
}
if(!control){throw new Error("Unsupported control: "+id);
}control.$$subcontrol=id;
control.$$subparent=this;
var states=this.__el;
var forward=this._forwardStates;

if(states&&forward&&control instanceof qx.ui.core.Widget){for(var state in states){if(forward[state]){control.addState(state);
}}}this.fireDataEvent(SSSS_49,control);
return this.__eo[id]=control;
},_createChildControlImpl:function(id){return null;
},_disposeChildControls:function(){var controls=this.__eo;

if(!controls){return;
}var Widget=qx.ui.core.Widget;

for(var id in controls){var control=controls[id];

if(!Widget.contains(this,control)){control.destroy();
}else{control.dispose();
}}delete this.__eo;
},_findTopControl:function(){var obj=this;

while(obj){if(!obj.$$subparent){return obj;
}obj=obj.$$subparent;
}return null;
},getContainerLocation:function(mode){var domEl=this.getContainerElement().getDomElement();
return domEl?qx.bom.element.Location.get(domEl,mode):null;
},getContentLocation:function(mode){var domEl=this.getContentElement().getDomElement();
return domEl?qx.bom.element.Location.get(domEl,mode):null;
},setDomLeft:function(value){var domEl=this.getContainerElement().getDomElement();

if(domEl){domEl.style.left=value+SSSS_0;
}else{throw new Error("DOM element is not yet created!");
}},setDomTop:function(value){var domEl=this.getContainerElement().getDomElement();

if(domEl){domEl.style.top=value+SSSS_0;
}else{throw new Error("DOM element is not yet created!");
}},setDomPosition:function(left,top){var domEl=this.getContainerElement().getDomElement();

if(domEl){domEl.style.left=left+SSSS_0;
domEl.style.top=top+SSSS_0;
}else{throw new Error("DOM element is not yet created!");
}},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
},clone:function(){var clone=arguments.callee.base.call(this);

if(this.getChildren){var children=this.getChildren();

for(var i=0,l=children.length;i<l;i++){clone.add(children[i].clone());
}}return clone;
},serialize:function(){var result=arguments.callee.base.call(this);

if(this.getChildren){var children=this.getChildren();

if(children.length>0){result.children=[];

for(var i=0,l=children.length;i<l;i++){result.children.push(children[i].serialize());
}}}
if(this.getLayout){var layout=this.getLayout();

if(layout){result.layout=layout.serialize();
}}return result;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Variant.isSet(SSSS_29,SSSS_6)){if(this.__eb){qx.locale.Manager.getInstance().removeListenerById(this.__eb);
}}this.getContainerElement().setAttribute(SSSS_35,null,true);
this._disposeChildControls();
qx.ui.core.queue.Appearance.remove(this);
qx.ui.core.queue.Layout.remove(this);
qx.ui.core.queue.Visibility.remove(this);
qx.ui.core.queue.Widget.remove(this);
}if(!qx.core.ObjectRegistry.inShutDown){var clazz=qx.ui.core.Widget;
var container=this.getContainerElement();

if(this.__dW){container.remove(this.__dW);
clazz.__dU.poolDecorator(this.__dW);
}
if(this.__dX){container.remove(this.__dX);
clazz.__dU.poolDecorator(this.__dX);
}this.clearSeparators();
this.__dW=this.__dX=this.__ef=null;
}else{this._disposeArray(SSSS_42);
this._disposeObjects(SSSS_102,SSSS_48);
}this._disposeArray(SSSS_64);
this.__el=this.__eo=null;
this._disposeObjects(SSSS_46,SSSS_70,SSSS_52,SSSS_57);
}});
})();
(function(){var SSSS_0="qx.event.type.Data",SSSS_1="qx.ui.container.Composite",SSSS_2="addChildWidget",SSSS_3="removeChildWidget";
qx.Class.define(SSSS_1,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MLayoutHandling],construct:function(layout){arguments.callee.base.call(this);

if(layout!=null){this._setLayout(layout);
}},events:{addChildWidget:SSSS_0,removeChildWidget:SSSS_0},members:{_afterAddChild:function(child){this.fireNonBubblingEvent(SSSS_2,qx.event.type.Data,[child]);
},_afterRemoveChild:function(child){this.fireNonBubblingEvent(SSSS_3,qx.event.type.Data,[child]);
}},defer:function(statics,members){qx.ui.core.MChildrenHandling.remap(members);
qx.ui.core.MLayoutHandling.remap(members);
}});
})();
(function(){var SSSS_0="interval",SSSS_1="keep-align",SSSS_2="Integer",SSSS_3="direct",SSSS_4="best-fit",SSSS_5="Boolean",SSSS_6="mouse",SSSS_7="bottom-left",SSSS_8="disappear",SSSS_9="bottom-right",SSSS_10="widget",SSSS_11="qx.ui.core.MPlacement",SSSS_12="left-top",SSSS_13="offsetRight",SSSS_14="shorthand",SSSS_15="offsetLeft",SSSS_16="top-left",SSSS_17="appear",SSSS_18="offsetBottom",SSSS_19="top-right",SSSS_20="offsetTop",SSSS_21="right-bottom",SSSS_22="right-top",SSSS_23="_applySmart",SSSS_24="left-bottom";
qx.Mixin.define(SSSS_11,{properties:{position:{check:[SSSS_16,SSSS_19,SSSS_7,SSSS_9,SSSS_12,SSSS_24,SSSS_22,SSSS_21],init:SSSS_7,themeable:true},placeMethod:{check:[SSSS_10,SSSS_6],init:SSSS_6,themeable:true},domMove:{check:SSSS_5,init:false},smart:{check:SSSS_5,init:true,themeable:true,apply:SSSS_23},placementModeX:{check:[SSSS_3,SSSS_1,SSSS_4],init:SSSS_1,themeable:true},placementModeY:{check:[SSSS_3,SSSS_1,SSSS_4],init:SSSS_1,themeable:true},offsetLeft:{check:SSSS_2,init:0,themeable:true},offsetTop:{check:SSSS_2,init:0,themeable:true},offsetRight:{check:SSSS_2,init:0,themeable:true},offsetBottom:{check:SSSS_2,init:0,themeable:true},offset:{group:[SSSS_20,SSSS_13,SSSS_18,SSSS_15],mode:SSSS_14,themeable:true}},members:{__ep:null,_applySmart:function(value,old){{};
var mode=value?SSSS_1:SSSS_3;
this.set({placementModeX:mode,placementModeY:mode});
},getLayoutLocation:function(widget){var insets,bounds,left,top;
bounds=widget.getBounds();
left=bounds.left;
top=bounds.top;
var size=bounds;
widget=widget.getLayoutParent();

while(widget&&!widget.isRootWidget()){bounds=widget.getBounds();
left+=bounds.left;
top+=bounds.top;
insets=widget.getInsets();
left+=insets.left;
top+=insets.top;
widget=widget.getLayoutParent();
}if(widget.isRootWidget()){var rootCoords=widget.getContainerLocation();

if(rootCoords){left+=rootCoords.left;
top+=rootCoords.top;
}}return {left:left,top:top,right:left+size.width,bottom:top+size.height};
},moveTo:function(left,top){if(this.getDomMove()){this.setDomPosition(left,top);
}else{this.setLayoutProperties({left:left,top:top});
}},placeToWidget:function(target,liveupdate){if(liveupdate){this.__ep=qx.lang.Function.bind(this.placeToWidget,this,target,false);
qx.event.Idle.getInstance().addListener(SSSS_0,this.__ep);
this.addListener(SSSS_8,function(){if(this.__ep){qx.event.Idle.getInstance().removeListener(SSSS_0,this.__ep);
this.__ep=null;
}},this);
}var coords=target.getContainerLocation()||this.getLayoutLocation(target);
this.__er(coords);
},placeToMouse:function(event){var left=event.getDocumentLeft();
var top=event.getDocumentTop();
var coords={left:left,top:top,right:left,bottom:top};
this.__er(coords);
},placeToElement:function(elem,liveupdate){var location=qx.bom.element.Location.get(elem);
var coords={left:location.left,top:location.top,right:location.left+elem.offsetWidth,bottom:location.top+elem.offsetHeight};
if(liveupdate){this.__ep=qx.lang.Function.bind(this.placeToElement,this,elem,false);
qx.event.Idle.getInstance().addListener(SSSS_0,this.__ep);
this.addListener(SSSS_8,function(){if(this.__ep){qx.event.Idle.getInstance().removeListener(SSSS_0,this.__ep);
this.__ep=null;
}},this);
}this.__er(coords);
},placeToPoint:function(point){var coords={left:point.left,top:point.top,right:point.left,bottom:point.top};
this.__er(coords);
},_getPlacementOffsets:function(){return {left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};
},__eq:function(callback){var size=null;

if(this._computePlacementSize){var size=this._computePlacementSize();
}else if(this.isVisible()){var size=this.getBounds();
}
if(size==null){this.addListenerOnce(SSSS_17,function(){this.__eq(callback);
},this);
}else{callback.call(this,size);
}},__er:function(coords){this.__eq(function(size){var result=qx.util.placement.Placement.compute(size,this.getLayoutParent().getBounds(),coords,this._getPlacementOffsets(),this.getPosition(),this.getPlacementModeX(),this.getPlacementModeY());
this.moveTo(result.left,result.top);
});
}},destruct:function(){if(this.__ep){qx.event.Idle.getInstance().removeListener(SSSS_0,this.__ep);
}}});
})();
(function(){var SSSS_0="qx.ui.popup.Popup",SSSS_1="visible",SSSS_2="excluded",SSSS_3="popup",SSSS_4="Boolean";
qx.Class.define(SSSS_0,{extend:qx.ui.container.Composite,include:qx.ui.core.MPlacement,construct:function(layout){arguments.callee.base.call(this,layout);
qx.core.Init.getApplication().getRoot().add(this);
this.initVisibility();
},properties:{appearance:{refine:true,init:SSSS_3},visibility:{refine:true,init:SSSS_2},autoHide:{check:SSSS_4,init:true}},members:{_applyVisibility:function(value,old){arguments.callee.base.call(this,value,old);
var mgr=qx.ui.popup.Manager.getInstance();
value===SSSS_1?mgr.add(this):mgr.remove(this);
}},destruct:function(){qx.ui.popup.Manager.getInstance().remove(this);
}});
})();
(function(){var SSSS_0="atom",SSSS_1="Integer",SSSS_2="String",SSSS_3="_applyRich",SSSS_4="qx.ui.tooltip.ToolTip",SSSS_5="_applyIcon",SSSS_6="tooltip",SSSS_7="qx.ui.core.Widget",SSSS_8="mouseover",SSSS_9="Boolean",SSSS_10="_applyLabel";
qx.Class.define(SSSS_4,{extend:qx.ui.popup.Popup,construct:function(label,icon){arguments.callee.base.call(this);
this.setLayout(new qx.ui.layout.Grow);
this._createChildControl(SSSS_0);
if(label!=null){this.setLabel(label);
}
if(icon!=null){this.setIcon(icon);
}this.addListener(SSSS_8,this._onMouseOver,this);
},properties:{appearance:{refine:true,init:SSSS_6},showTimeout:{check:SSSS_1,init:700,themeable:true},hideTimeout:{check:SSSS_1,init:4000,themeable:true},label:{check:SSSS_2,nullable:true,apply:SSSS_10},icon:{check:SSSS_2,nullable:true,apply:SSSS_5,themeable:true},rich:{check:SSSS_9,init:false,apply:SSSS_3},opener:{check:SSSS_7,nullable:true}},members:{_createChildControlImpl:function(id){var control;

switch(id){case SSSS_0:control=new qx.ui.basic.Atom;
this._add(control);
break;
}return control||arguments.callee.base.call(this,id);
},_onMouseOver:function(e){this.hide();
},_applyIcon:function(value,old){var atom=this.getChildControl(SSSS_0);
value==null?atom.resetIcon:atom.setIcon(value);
},_applyLabel:function(value,old){var atom=this.getChildControl(SSSS_0);
value==null?atom.resetLabel():atom.setLabel(value);
},_applyRich:function(value,old){var atom=this.getChildControl(SSSS_0);
atom.setRich(value);
}}});
})();
(function(){var SSSS_0="qx.ui.core.queue.Layout",SSSS_1="layout";
qx.Class.define(SSSS_0,{statics:{__es:{},remove:function(widget){delete this.__es[widget.$$hash];
},add:function(widget){this.__es[widget.$$hash]=widget;
qx.ui.core.queue.Manager.scheduleFlush(SSSS_1);
},flush:function(){var queue=this.__ev();
for(var i=queue.length-1;i>=0;i--){var widget=queue[i];
if(widget.hasValidLayout()){continue;
}if(widget.isRootWidget()&&!widget.hasUserBounds()){var hint=widget.getSizeHint();
widget.renderLayout(0,0,hint.width,hint.height);
}else{var bounds=widget.getBounds();
widget.renderLayout(bounds.left,bounds.top,bounds.width,bounds.height);
}}},getNestingLevel:function(widget){var cache=this.__eu;
var level=0;
var parent=widget;
while(true){if(cache[parent.$$hash]!=null){level+=cache[parent.$$hash];
break;
}
if(!parent.$$parent){break;
}parent=parent.$$parent;
level+=1;
}var leveldown=level;

while(widget&&widget!==parent){cache[widget.$$hash]=leveldown--;
widget=widget.$$parent;
}return level;
},__et:function(){var VisibilityQueue=qx.ui.core.queue.Visibility;
this.__eu={};
var levels=[];
var queue=this.__es;
var widget,level;

for(var hash in queue){widget=queue[hash];

if(VisibilityQueue.isVisible(widget)){level=this.getNestingLevel(widget);
if(!levels[level]){levels[level]={};
}levels[level][hash]=widget;
delete queue[hash];
}}return levels;
},__ev:function(){var sortedQueue=[];
var levels=this.__et();

for(var level=levels.length-1;level>=0;level--){if(!levels[level]){continue;
}
for(var hash in levels[level]){var widget=levels[level][hash];
if(level==0||widget.isRootWidget()||widget.hasUserBounds()){sortedQueue.push(widget);
widget.invalidateLayoutCache();
continue;
}var oldSizeHint=widget.getSizeHint(false);

if(oldSizeHint){widget.invalidateLayoutCache();
var newSizeHint=widget.getSizeHint();
var hintChanged=(!widget.getBounds()||oldSizeHint.minWidth!==newSizeHint.minWidth||oldSizeHint.width!==newSizeHint.width||oldSizeHint.maxWidth!==newSizeHint.maxWidth||oldSizeHint.minHeight!==newSizeHint.minHeight||oldSizeHint.height!==newSizeHint.height||oldSizeHint.maxHeight!==newSizeHint.maxHeight);
}else{hintChanged=true;
}
if(hintChanged){var parent=widget.getLayoutParent();

if(!levels[level-1]){levels[level-1]={};
}levels[level-1][parent.$$hash]=parent;
}else{sortedQueue.push(widget);
}}}return sortedQueue;
}}});
})();
(function(){var SSSS_0="qx.event.handler.UserAction";
qx.Class.define(SSSS_0,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
this.__ew=manager;
this.__ex=manager.getWindow();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__ew:null,__ex:null,canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){}},destruct:function(){this.__ew=this.__ex=null;
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
})();
(function(){var SSSS_0="qx.util.DeferredCallManager",SSSS_1="singleton";
qx.Class.define(SSSS_0,{extend:qx.core.Object,type:SSSS_1,construct:function(){this.__ey={};
this.__ez=qx.lang.Function.bind(this.__eD,this);
this.__eA=false;
},members:{__eB:null,__eC:null,__ey:null,__eA:null,__ez:null,schedule:function(deferredCall){if(this.__eB==null){this.__eB=window.setTimeout(this.__ez,0);
}var callKey=deferredCall.toHashCode();
if(this.__eC&&this.__eC[callKey]){return;
}this.__ey[callKey]=deferredCall;
this.__eA=true;
},cancel:function(deferredCall){var callKey=deferredCall.toHashCode();
if(this.__eC&&this.__eC[callKey]){this.__eC[callKey]=null;
return;
}delete this.__ey[callKey];
if(qx.lang.Object.isEmpty(this.__ey)&&this.__eB!=null){window.clearTimeout(this.__eB);
this.__eB=null;
}},__eD:qx.event.GlobalError.observeMethod(function(){this.__eB=null;
while(this.__eA){this.__eC=qx.lang.Object.clone(this.__ey);
this.__ey={};
this.__eA=false;

for(var key in this.__eC){var call=this.__eC[key];

if(call){this.__eC[key]=null;
call.call();
}}}this.__eC=null;
})},destruct:function(){if(this.__eB!=null){window.clearTimeout(this.__eB);
}this.__ez=this.__ey=null;
}});
})();
(function(){var SSSS_0="qx.util.DeferredCall";
qx.Class.define(SSSS_0,{extend:qx.core.Object,construct:function(callback,context){arguments.callee.base.call(this);
this.__eE=callback;
this.__eF=context||null;
this.__eG=qx.util.DeferredCallManager.getInstance();
},members:{__eE:null,__eF:null,__eG:null,cancel:function(){this.__eG.cancel(this);
},schedule:function(){this.__eG.schedule(this);
},call:function(){this.__eF?this.__eE.apply(this.__eF):this.__eE();
}},destruct:function(callback,context){this.cancel();
this.__eF=this.__eE=this.__eG=null;
}});
})();
(function(){var SSSS_0="element",SSSS_1="qx.client",SSSS_2="div",SSSS_3="",SSSS_4="mshtml",SSSS_5="none",SSSS_6="scroll",SSSS_7="qx.html.Element",SSSS_8="|capture|",SSSS_9="activate",SSSS_10="blur",SSSS_11="deactivate",SSSS_12="userSelect",SSSS_13="__fe",SSSS_14="capture",SSSS_15="releaseCapture",SSSS_16="qxSelectable",SSSS_17="tabIndex",SSSS_18="off",SSSS_19="focus",SSSS_20="normal",SSSS_21="webkit",SSSS_22="|bubble|",SSSS_23="on";
qx.Class.define(SSSS_7,{extend:qx.core.Object,construct:function(tagName){arguments.callee.base.call(this);
this.__eH=tagName||SSSS_2;
},statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__eI:{},_scheduleFlush:function(job){qx.html.Element.__fq.schedule();
},_mshtmlVisibilitySort:qx.core.Variant.select(SSSS_1,{"mshtml":function(a,b){var al=a.__eO;
var bl=b.__eO;

if(al.contains(bl)){return 1;
}
if(bl.contains(al)){return -1;
}return 0;
},"default":null}),flush:function(){var obj;
{};
var focusHandler=this.__eJ();
var focusedDomElement=focusHandler.getFocus();

if(focusedDomElement&&this.__eN(focusedDomElement)){focusHandler.blur(focusedDomElement);
}var activeDomElement=focusHandler.getActive();

if(activeDomElement&&this.__eN(activeDomElement)){qx.bom.Element.deactivate(activeDomElement);
}var captureDomElement=this.__eL();

if(captureDomElement&&this.__eN(captureDomElement)){qx.bom.Element.releaseCapture(captureDomElement);
}var later=[];
var modified=this._modified;

for(var hc in modified){obj=modified[hc];
if(obj.__fi()){if(obj.__eO&&qx.dom.Hierarchy.isRendered(obj.__eO)){later.push(obj);
}else{{};
obj.__fh();
}delete modified[hc];
}}
for(var i=0,l=later.length;i<l;i++){obj=later[i];
{};
obj.__fh();
}var visibility=this._visibility;
if(qx.core.Variant.isSet(SSSS_1,SSSS_4)){var list=[];

for(var hc in visibility){list.push(visibility[hc]);
}if(list.length>1){list.sort(this._mshtmlVisibilitySort);
visibility=this._visibility={};

for(var i=0;i<list.length;i++){obj=list[i];
visibility[obj.$$hash]=obj;
}}}
for(var hc in visibility){obj=visibility[hc];
{};
obj.__eO.style.display=obj.__eR?SSSS_3:SSSS_5;
delete visibility[hc];
}var scroll=this._scroll;

for(var hc in scroll){obj=scroll[hc];
var elem=obj.__eO;

if(elem&&elem.offsetWidth){var done=true;
if(obj.__eU!=null){obj.__eO.scrollLeft=obj.__eU;
delete obj.__eU;
}if(obj.__eV!=null){obj.__eO.scrollTop=obj.__eV;
delete obj.__eV;
}var intoViewX=obj.__eS;

if(intoViewX!=null){var child=intoViewX.element.getDomElement();

if(child&&child.offsetWidth){qx.bom.element.Scroll.intoViewX(child,elem,intoViewX.align);
delete obj.__eS;
}else{done=false;
}}var intoViewY=obj.__eT;

if(intoViewY!=null){var child=intoViewY.element.getDomElement();

if(child&&child.offsetWidth){qx.bom.element.Scroll.intoViewY(child,elem,intoViewY.align);
delete obj.__eT;
}else{done=false;
}}if(done){delete scroll[hc];
}}}var activityEndActions={"releaseCapture":1,"blur":1,"deactivate":1};
for(var i=0;i<this._actions.length;i++){var action=this._actions[i];
var element=action.element.__eO;

if(!element||!activityEndActions[action.type]&&!action.element.__fi()){continue;
}var args=action.args;
args.unshift(element);
qx.bom.Element[action.type].apply(qx.bom.Element,args);
}this._actions=[];
for(var hc in this.__eI){var selection=this.__eI[hc];
var elem=selection.element.__eO;

if(elem){qx.bom.Selection.set(elem,selection.start,selection.end);
delete this.__eI[hc];
}}qx.event.handler.Appear.refresh();
},__eJ:function(){if(!this.__eK){var eventManager=qx.event.Registration.getManager(window);
this.__eK=eventManager.getHandler(qx.event.handler.Focus);
}return this.__eK;
},__eL:function(){if(!this.__eM){var eventManager=qx.event.Registration.getManager(window);
this.__eM=eventManager.getDispatcher(qx.event.dispatch.MouseCapture);
}return this.__eM.getCaptureElement();
},__eN:function(domElement){var element=qx.core.ObjectRegistry.fromHashCode(domElement.$$element);
return element&&!element.__fi();
}},members:{__eH:null,__eO:null,__eP:false,__eQ:true,__eR:true,__eS:null,__eT:null,__eU:null,__eV:null,__eW:null,__eX:null,__eY:null,__fa:null,__fb:null,__fc:null,__fd:null,__fe:null,__ff:null,__fg:null,_scheduleChildrenUpdate:function(){if(this.__ff){return;
}this.__ff=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(SSSS_0);
},_createDomElement:function(){return qx.bom.Element.create(this.__eH);
},__fh:function(){{};
var children=this.__fe;

if(children){var length=children.length;
var child;

for(var i=0;i<length;i++){child=children[i];

if(child.__eR&&child.__eQ&&!child.__eO){child.__fh();
}}}
if(!this.__eO){this.__eO=this._createDomElement();
this.__eO.$$element=this.$$hash;
this._copyData(false);

if(children&&length>0){this._insertChildren();
}}else{this._syncData();

if(this.__ff){this._syncChildren();
}}delete this.__ff;
},_insertChildren:function(){var children=this.__fe;
var length=children.length;
var child;

if(length>2){var domElement=document.createDocumentFragment();

for(var i=0;i<length;i++){child=children[i];

if(child.__eO&&child.__eQ){domElement.appendChild(child.__eO);
}}this.__eO.appendChild(domElement);
}else{var domElement=this.__eO;

for(var i=0;i<length;i++){child=children[i];

if(child.__eO&&child.__eQ){domElement.appendChild(child.__eO);
}}}},_syncChildren:function(){var domOperations;
var ObjectRegistry=qx.core.ObjectRegistry;
var dataChildren=this.__fe;
var dataLength=dataChildren.length;
var dataChild;
var dataEl;
var domParent=this.__eO;
var domChildren=domParent.childNodes;
var domPos=0;
var domEl;
{};
for(var i=domChildren.length-1;i>=0;i--){domEl=domChildren[i];
dataEl=ObjectRegistry.fromHashCode(domEl.$$element);

if(!dataEl||!dataEl.__eQ||dataEl.__fg!==this){domParent.removeChild(domEl);
{};
}}for(var i=0;i<dataLength;i++){dataChild=dataChildren[i];
if(dataChild.__eQ){dataEl=dataChild.__eO;
domEl=domChildren[domPos];

if(!dataEl){continue;
}if(dataEl!=domEl){if(domEl){domParent.insertBefore(dataEl,domEl);
}else{domParent.appendChild(dataEl);
}{};
}domPos++;
}}{};
},_copyData:function(fromMarkup){var elem=this.__eO;
var data=this.__fb;

if(data){var Attribute=qx.bom.element.Attribute;

for(var key in data){Attribute.set(elem,key,data[key]);
}}var data=this.__fa;

if(data){var Style=qx.bom.element.Style;

if(fromMarkup){Style.setStyles(elem,data);
}else{Style.setCss(elem,Style.compile(data));
}}var data=this.__fc;

if(data){for(var key in data){this._applyProperty(key,data[key]);
}}var data=this.__fd;

if(data){qx.event.Registration.getManager(elem).importListeners(elem,data);
delete this.__fd;
}},_syncData:function(){var elem=this.__eO;
var Attribute=qx.bom.element.Attribute;
var Style=qx.bom.element.Style;
var jobs=this.__eX;

if(jobs){var data=this.__fb;

if(data){var value;

for(var key in jobs){value=data[key];

if(value!==undefined){Attribute.set(elem,key,value);
}else{Attribute.reset(elem,key);
}}}this.__eX=null;
}var jobs=this.__eW;

if(jobs){var data=this.__fa;

if(data){var styles={};

for(var key in jobs){styles[key]=data[key];
}Style.setStyles(elem,styles);
}this.__eW=null;
}var jobs=this.__eY;

if(jobs){var data=this.__fc;

if(data){var value;

for(var key in jobs){this._applyProperty(key,data[key]);
}}this.__eY=null;
}},__fi:function(){var pa=this;
while(pa){if(pa.__eP){return true;
}
if(!pa.__eQ||!pa.__eR){return false;
}pa=pa.__fg;
}return false;
},__fj:function(child){if(child.__fg===this){throw new Error("Child is already in: "+child);
}
if(child.__eP){throw new Error("Root elements could not be inserted into other ones.");
}if(child.__fg){child.__fg.remove(child);
}child.__fg=this;
if(!this.__fe){this.__fe=[];
}if(this.__eO){this._scheduleChildrenUpdate();
}},__fk:function(child){if(child.__fg!==this){throw new Error("Has no child: "+child);
}if(this.__eO){this._scheduleChildrenUpdate();
}delete child.__fg;
},__fl:function(child){if(child.__fg!==this){throw new Error("Has no child: "+child);
}if(this.__eO){this._scheduleChildrenUpdate();
}},getChildren:function(){return this.__fe||null;
},getChild:function(index){var children=this.__fe;
return children&&children[index]||null;
},hasChildren:function(){var children=this.__fe;
return children&&children[0]!==undefined;
},indexOf:function(child){var children=this.__fe;
return children?children.indexOf(child):-1;
},hasChild:function(child){var children=this.__fe;
return children&&children.indexOf(child)!==-1;
},add:function(varargs){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++){this.__fj(arguments[i]);
}this.__fe.push.apply(this.__fe,arguments);
}else{this.__fj(varargs);
this.__fe.push(varargs);
}return this;
},addAt:function(child,index){this.__fj(child);
qx.lang.Array.insertAt(this.__fe,child,index);
return this;
},remove:function(childs){var children=this.__fe;

if(!children){return;
}
if(arguments[1]){var child;

for(var i=0,l=arguments.length;i<l;i++){child=arguments[i];
this.__fk(child);
qx.lang.Array.remove(children,child);
}}else{this.__fk(childs);
qx.lang.Array.remove(children,childs);
}return this;
},removeAt:function(index){var children=this.__fe;

if(!children){throw new Error("Has no children!");
}var child=children[index];

if(!child){throw new Error("Has no child at this position!");
}this.__fk(child);
qx.lang.Array.removeAt(this.__fe,index);
return this;
},removeAll:function(){var children=this.__fe;

if(children){for(var i=0,l=children.length;i<l;i++){this.__fk(children[i]);
}children.length=0;
}return this;
},getParent:function(){return this.__fg||null;
},insertInto:function(parent,index){parent.__fj(this);

if(index==null){parent.__fe.push(this);
}else{qx.lang.Array.insertAt(this.__fe,this,index);
}return this;
},insertBefore:function(rel){var parent=rel.__fg;
parent.__fj(this);
qx.lang.Array.insertBefore(parent.__fe,this,rel);
return this;
},insertAfter:function(rel){var parent=rel.__fg;
parent.__fj(this);
qx.lang.Array.insertAfter(parent.__fe,this,rel);
return this;
},moveTo:function(index){var parent=this.__fg;
parent.__fl(this);
var oldIndex=parent.__fe.indexOf(this);

if(oldIndex===index){throw new Error("Could not move to same index!");
}else if(oldIndex<index){index--;
}qx.lang.Array.removeAt(parent.__fe,oldIndex);
qx.lang.Array.insertAt(parent.__fe,this,index);
return this;
},moveBefore:function(rel){var parent=this.__fg;
return this.moveTo(parent.__fe.indexOf(rel));
},moveAfter:function(rel){var parent=this.__fg;
return this.moveTo(parent.__fe.indexOf(rel)+1);
},free:function(){var parent=this.__fg;

if(!parent){throw new Error("Has no parent to remove from.");
}
if(!parent.__fe){return;
}parent.__fk(this);
qx.lang.Array.remove(parent.__fe,this);
return this;
},getDomElement:function(){return this.__eO||null;
},getNodeName:function(){return this.__eH;
},setNodeName:function(name){this.__eH=name;
},setRoot:function(root){this.__eP=root;
},useMarkup:function(html){if(this.__eO){throw new Error("Could not overwrite existing element!");
}if(qx.core.Variant.isSet(SSSS_1,SSSS_4)){var helper=document.createElement(SSSS_2);
}else{var helper=qx.html.Element.__fm;

if(!helper){helper=qx.html.Element.__fm=document.createElement(SSSS_2);
}}helper.innerHTML=html;
this.__eO=helper.firstChild;
this.__eO.$$element=this.$$hash;
this._copyData(true);
return this.__eO;
},useElement:function(elem){if(this.__eO){throw new Error("Could not overwrite existing element!");
}this.__eO=elem;
this.__eO.$$element=this.$$hash;
this._copyData(true);
},isFocusable:function(){var tabIndex=this.getAttribute(SSSS_17);

if(tabIndex>=1){return true;
}var focusable=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(tabIndex>=0&&focusable[this.__eH]){return true;
}return false;
},setSelectable:function(value){this.setAttribute(SSSS_16,value?SSSS_23:SSSS_18);
if(qx.core.Variant.isSet(SSSS_1,SSSS_21)){this.setStyle(SSSS_12,value?SSSS_20:SSSS_5);
}},isNativelyFocusable:function(){return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this.__eH];
},include:function(){if(this.__eQ){return;
}delete this.__eQ;

if(this.__fg){this.__fg._scheduleChildrenUpdate();
}return this;
},exclude:function(){if(!this.__eQ){return;
}this.__eQ=false;

if(this.__fg){this.__fg._scheduleChildrenUpdate();
}return this;
},isIncluded:function(){return this.__eQ===true;
},show:function(){if(this.__eR){return;
}
if(this.__eO){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(SSSS_0);
}if(this.__fg){this.__fg._scheduleChildrenUpdate();
}delete this.__eR;
},hide:function(){if(!this.__eR){return;
}
if(this.__eO){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(SSSS_0);
}this.__eR=false;
},isVisible:function(){return this.__eR===true;
},scrollChildIntoViewX:function(elem,align,direct){var thisEl=this.__eO;
var childEl=elem.getDomElement();

if(direct!==false&&thisEl&&thisEl.offsetWidth&&childEl&&childEl.offsetWidth){qx.bom.element.Scroll.intoViewX(childEl,thisEl,align);
}else{this.__eS={element:elem,align:align};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(SSSS_0);
}delete this.__eU;
},scrollChildIntoViewY:function(elem,align,direct){var thisEl=this.__eO;
var childEl=elem.getDomElement();

if(direct!==false&&thisEl&&thisEl.offsetWidth&&childEl&&childEl.offsetWidth){qx.bom.element.Scroll.intoViewY(childEl,thisEl,align);
}else{this.__eT={element:elem,align:align};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(SSSS_0);
}delete this.__eV;
},scrollToX:function(x,lazy){var thisEl=this.__eO;

if(lazy!==true&&thisEl&&thisEl.offsetWidth){thisEl.scrollLeft=x;
}else{this.__eU=x;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(SSSS_0);
}delete this.__eS;
},getScrollX:function(){var thisEl=this.__eO;

if(thisEl){return thisEl.scrollLeft;
}return this.__eU||0;
},scrollToY:function(y,lazy){var thisEl=this.__eO;

if(lazy!==true&&thisEl&&thisEl.offsetWidth){thisEl.scrollTop=y;
}else{this.__eV=y;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(SSSS_0);
}delete this.__eT;
},getScrollY:function(){var thisEl=this.__eO;

if(thisEl){return thisEl.scrollTop;
}return this.__eV||0;
},disableScrolling:function(){this.enableScrolling();
this.scrollToX(0);
this.scrollToY(0);
this.addListener(SSSS_6,this.__fo,this);
},enableScrolling:function(){this.removeListener(SSSS_6,this.__fo,this);
},__fn:null,__fo:function(e){if(!this.__fn){this.__fn=true;
this.__eO.scrollTop=0;
this.__eO.scrollLeft=0;
delete this.__fn;
}},getTextSelection:function(){var el=this.__eO;

if(el){return qx.bom.Selection.get(el);
}return null;
},getTextSelectionLength:function(){var el=this.__eO;

if(el){return qx.bom.Selection.getLength(el);
}return null;
},setTextSelection:function(start,end){var el=this.__eO;

if(el){qx.bom.Selection.set(el,start,end);
return;
}qx.html.Element.__eI[this.toHashCode()]={element:this,start:start,end:end};
qx.html.Element._scheduleFlush(SSSS_0);
},clearTextSelection:function(){var el=this.__eO;

if(el){qx.bom.Selection.clear(el);
}delete qx.html.Element.__eI[this.toHashCode()];
},__fp:function(action,args){var actions=qx.html.Element._actions;
actions.push({type:action,element:this,args:args||[]});
qx.html.Element._scheduleFlush(SSSS_0);
},focus:function(){this.__fp(SSSS_19);
},blur:function(){this.__fp(SSSS_10);
},activate:function(){this.__fp(SSSS_9);
},deactivate:function(){this.__fp(SSSS_11);
},capture:function(containerCapture){this.__fp(SSSS_14,[containerCapture!==false]);
},releaseCapture:function(){this.__fp(SSSS_15);
},setStyle:function(key,value,direct){if(!this.__fa){this.__fa={};
}
if(this.__fa[key]==value){return;
}
if(value==null){delete this.__fa[key];
}else{this.__fa[key]=value;
}if(this.__eO){if(direct){qx.bom.element.Style.set(this.__eO,key,value);
return this;
}if(!this.__eW){this.__eW={};
}this.__eW[key]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(SSSS_0);
}return this;
},setStyles:function(map,direct){var Style=qx.bom.element.Style;

if(!this.__fa){this.__fa={};
}
if(this.__eO){if(!this.__eW){this.__eW={};
}
for(var key in map){var value=map[key];

if(this.__fa[key]==value){continue;
}
if(value==null){delete this.__fa[key];
}else{this.__fa[key]=value;
}if(direct){Style.setStyle(this.__eO,key,value);
continue;
}this.__eW[key]=true;
}qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(SSSS_0);
}else{for(var key in map){var value=map[key];

if(this.__fa[key]==value){continue;
}
if(value==null){delete this.__fa[key];
}else{this.__fa[key]=value;
}}}return this;
},removeStyle:function(key,direct){this.setStyle(key,null,direct);
},getStyle:function(key){return this.__fa?this.__fa[key]:null;
},getAllStyles:function(){return this.__fa||null;
},setAttribute:function(key,value,direct){if(!this.__fb){this.__fb={};
}
if(this.__fb[key]==value){return;
}
if(value==null){delete this.__fb[key];
}else{this.__fb[key]=value;
}if(this.__eO){if(direct){qx.bom.element.Attribute.set(this.__eO,key,value);
return this;
}if(!this.__eX){this.__eX={};
}this.__eX[key]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(SSSS_0);
}return this;
},setAttributes:function(map,direct){for(var key in map){this.setAttribute(key,map[key],direct);
}return this;
},removeAttribute:function(key,direct){this.setAttribute(key,null,direct);
},getAttribute:function(key){return this.__fb?this.__fb[key]:null;
},_applyProperty:function(name,value){},_setProperty:function(key,value,direct){if(!this.__fc){this.__fc={};
}
if(this.__fc[key]==value){return;
}
if(value==null){delete this.__fc[key];
}else{this.__fc[key]=value;
}if(this.__eO){if(direct){this._applyProperty(key,value);
return this;
}if(!this.__eY){this.__eY={};
}this.__eY[key]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(SSSS_0);
}return this;
},_removeProperty:function(key,direct){this._setProperty(key,null,direct);
},_getProperty:function(key){var db=this.__fc;

if(!db){return null;
}var value=db[key];
return value==null?null:value;
},addListener:function(type,listener,self,capture){var msg;

if(this.$$disposed){return null;
}{};

if(this.__eO){return qx.event.Registration.addListener(this.__eO,type,listener,self,capture);
}
if(!this.__fd){this.__fd={};
}
if(capture==null){capture=false;
}var unique=qx.event.Manager.getNextUniqueId();
var id=type+(capture?SSSS_8:SSSS_22)+unique;
this.__fd[id]={type:type,listener:listener,self:self,capture:capture,unique:unique};
return id;
},removeListener:function(type,listener,self,capture){var msg;

if(this.$$disposed){return null;
}{};

if(this.__eO){qx.event.Registration.removeListener(this.__eO,type,listener,self,capture);
}else{var values=this.__fd;
var entry;

if(capture==null){capture=false;
}
for(var key in values){entry=values[key];
if(entry.listener===listener&&entry.self===self&&entry.capture===capture&&entry.type===type){delete values[key];
break;
}}}return this;
},removeListenerById:function(id){if(this.$$disposed){return null;
}
if(this.__eO){qx.event.Registration.removeListenerById(this.__eO,id);
}else{delete this.__fd[id];
}return this;
},hasListener:function(type,capture){if(this.$$disposed){return false;
}
if(this.__eO){return qx.event.Registration.hasListener(this.__eO,type,capture);
}var values=this.__fd;
var entry;

if(capture==null){capture=false;
}
for(var key in values){entry=values[key];
if(entry.capture===capture&&entry.type===type){return true;
}}return false;
}},defer:function(statics){statics.__fq=new qx.util.DeferredCall(statics.flush,statics);
},destruct:function(){var el=this.__eO;

if(el){qx.event.Registration.getManager(el).removeAllListeners(el);
el.$$element=SSSS_3;
}
if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__fg;

if(parent&&!parent.$$disposed){parent.remove(this);
}}this._disposeArray(SSSS_13);
this.__fb=this.__fa=this.__fd=this.__fc=this.__eX=this.__eW=this.__eY=this.__eO=this.__fg=this.__eS=this.__eT=null;
}});
})();
(function(){var SSSS_0="qx.ui.core.queue.Manager",SSSS_1="useraction";
qx.Class.define(SSSS_0,{statics:{__fr:false,__fs:{},__ft:0,MAX_RETRIES:10,scheduleFlush:function(job){var self=qx.ui.core.queue.Manager;
self.__fs[job]=true;

if(!self.__fr){self.__fw.schedule();
self.__fr=true;
}},flush:function(){var self=qx.ui.core.queue.Manager;
if(self.__fu){return;
}self.__fu=true;
self.__fw.cancel();
var jobs=self.__fs;
self.__fv(function(){while(jobs.visibility||jobs.widget||jobs.appearance||jobs.layout||jobs.element){if(jobs.widget){delete jobs.widget;
qx.ui.core.queue.Widget.flush();
}
if(jobs.visibility){delete jobs.visibility;
qx.ui.core.queue.Visibility.flush();
}
if(jobs.appearance){delete jobs.appearance;
qx.ui.core.queue.Appearance.flush();
}if(jobs.widget||jobs.visibility||jobs.appearance){continue;
}
if(jobs.layout){delete jobs.layout;
qx.ui.core.queue.Layout.flush();
}if(jobs.widget||jobs.visibility||jobs.appearance||jobs.layout){continue;
}
if(jobs.element){delete jobs.element;
qx.html.Element.flush();
}}},function(){self.__fr=false;
});
self.__fv(function(){if(jobs.dispose){delete jobs.dispose;
qx.ui.core.queue.Dispose.flush();
}},function(){self.__fu=false;
});
self.__ft=0;
},__fv:function(callback,finallyCode){var self=qx.ui.core.queue.Manager;

try{callback();
}catch(e){self.__fr=false;
self.__fu=false;
self.__ft+=1;

if(self.__ft<=self.MAX_RETRIES){self.scheduleFlush();
}else{throw new Error("Fatal Error: Flush terminated "+(self.__ft-1)+" times in a row"+" due to exceptions in user code. The application has to be reloaded!");
}throw e;
}finally{finallyCode();
}}},defer:function(statics){statics.__fw=new qx.util.DeferredCall(statics.flush);
qx.html.Element._scheduleFlush=statics.scheduleFlush;
qx.event.Registration.addListener(window,SSSS_1,statics.flush);
}});
})();
(function(){var SSSS_0="abstract",SSSS_1="qx.event.dispatch.AbstractBubbling";
qx.Class.define(SSSS_1,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:SSSS_0,construct:function(manager){this._manager=manager;
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
})();
(function(){var SSSS_0="qx.event.dispatch.DomBubbling";
qx.Class.define(SSSS_0,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(target){return target.parentNode;
},canDispatchEvent:function(target,event,type){return target.nodeType!==undefined&&event.getBubbles();
}},defer:function(statics){qx.event.Registration.addDispatcher(statics);
}});
})();
(function(){var SSSS_0="keydown",SSSS_1="keypress",SSSS_2="qx.client",SSSS_3="NumLock",SSSS_4="keyup",SSSS_5="Enter",SSSS_6="0",SSSS_7="9",SSSS_8="-",SSSS_9="PageUp",SSSS_10="+",SSSS_11="PrintScreen",SSSS_12="gecko",SSSS_13="A",SSSS_14="Z",SSSS_15="Left",SSSS_16="F5",SSSS_17="Down",SSSS_18="Up",SSSS_19="F11",SSSS_20="F6",SSSS_21="useraction",SSSS_22="F3",SSSS_23="keyinput",SSSS_24="Insert",SSSS_25="F8",SSSS_26="End",SSSS_27="/",SSSS_28="Delete",SSSS_29="*",SSSS_30="F1",SSSS_31="F4",SSSS_32="Home",SSSS_33="F2",SSSS_34="F12",SSSS_35="PageDown",SSSS_36="F7",SSSS_37="F9",SSSS_38="F10",SSSS_39="Right",SSSS_40="text",SSSS_41="Escape",SSSS_42="webkit",SSSS_43="5",SSSS_44="3",SSSS_45="Meta",SSSS_46="7",SSSS_47="CapsLock",SSSS_48="input",SSSS_49="Control",SSSS_50="Space",SSSS_51="Tab",SSSS_52="Shift",SSSS_53="Pause",SSSS_54="Unidentified",SSSS_55="qx.event.handler.Keyboard",SSSS_56="mshtml",SSSS_57="mshtml|webkit",SSSS_58="6",SSSS_59="off",SSSS_60="Apps",SSSS_61="4",SSSS_62="Alt",SSSS_63="2",SSSS_64="Scroll",SSSS_65="1",SSSS_66="8",SSSS_67="Win",SSSS_68="autoComplete",SSSS_69=",",SSSS_70="Backspace";
qx.Class.define(SSSS_55,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
this.__fx=manager;
this.__fy=manager.getWindow();
if(qx.core.Variant.isSet(SSSS_2,SSSS_12)){this.__fz=this.__fy;
}else{this.__fz=this.__fy.document.documentElement;
}this.__fA={};
this._initKeyObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(keyIdentifier){if(this._identifierToKeyCodeMap[keyIdentifier]){return true;
}
if(keyIdentifier.length!=1){return false;
}
if(keyIdentifier>=SSSS_6&&keyIdentifier<=SSSS_7){return true;
}
if(keyIdentifier>=SSSS_13&&keyIdentifier<=SSSS_14){return true;
}
switch(keyIdentifier){case SSSS_10:case SSSS_8:case SSSS_29:case SSSS_27:return true;
default:return false;
}}},members:{__fB:null,__fx:null,__fy:null,__fz:null,__fA:null,__BJ:null,__fC:null,__fD:null,canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){},_fireInputEvent:function(domEvent,charCode){var target=this.__fE();
if(target&&target.offsetWidth!=0){var event=qx.event.Registration.createEvent(SSSS_23,qx.event.type.KeyInput,[domEvent,target,charCode]);
this.__fx.dispatchEvent(target,event);
}if(this.__fy){qx.event.Registration.fireEvent(this.__fy,SSSS_21,qx.event.type.Data,[SSSS_23]);
}},_fireSequenceEvent:function(domEvent,type,keyIdentifier){var target=this.__fE();
var event=qx.event.Registration.createEvent(type,qx.event.type.KeySequence,[domEvent,target,keyIdentifier]);
this.__fx.dispatchEvent(target,event);
if(qx.core.Variant.isSet(SSSS_2,SSSS_57)){if(type==SSSS_0&&event.getDefaultPrevented()){var keyCode=domEvent.keyCode;

if(!(this._isNonPrintableKeyCode(keyCode)||keyCode==8||keyCode==9)){this._fireSequenceEvent(domEvent,SSSS_1,keyIdentifier);
}}}if(this.__fy){qx.event.Registration.fireEvent(this.__fy,SSSS_21,qx.event.type.Data,[type]);
}},__fE:function(){var focusHandler=this.__fx.getHandler(qx.event.handler.Focus);
var target=focusHandler.getActive();
if(!target||target.offsetWidth==0){target=focusHandler.getFocus();
}if(!target||target.offsetWidth==0){target=this.__fx.getWindow().document.body;
}return target;
},_initKeyObserver:function(){this.__fB=qx.lang.Function.listener(this.__fF,this);
this.__fD=qx.lang.Function.listener(this.__fH,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fz,SSSS_4,this.__fB);
Event.addNativeListener(this.__fz,SSSS_0,this.__fB);
Event.addNativeListener(this.__fz,SSSS_1,this.__fD);
},_stopKeyObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fz,SSSS_4,this.__fB);
Event.removeNativeListener(this.__fz,SSSS_0,this.__fB);
Event.removeNativeListener(this.__fz,SSSS_1,this.__fD);

for(var key in (this.__fC||{})){var listener=this.__fC[key];
Event.removeNativeListener(listener.target,SSSS_1,listener.callback);
}delete (this.__fC);
},__fF:qx.event.GlobalError.observeMethod(qx.core.Variant.select(SSSS_2,{"mshtml":function(domEvent){domEvent=window.event||domEvent;
var keyCode=domEvent.keyCode;
var charCode=0;
var type=domEvent.type;
if(!(this.__fA[keyCode]==SSSS_0&&type==SSSS_0)){this._idealKeyHandler(keyCode,charCode,type,domEvent);
}if(type==SSSS_0){if(this._isNonPrintableKeyCode(keyCode)||keyCode==8||keyCode==9){this._idealKeyHandler(keyCode,charCode,SSSS_1,domEvent);
}}this.__fA[keyCode]=type;
},"gecko":function(domEvent){var keyCode=this._keyCodeFix[domEvent.keyCode]||domEvent.keyCode;
var charCode=0;
var type=domEvent.type;
if(qx.bom.client.Platform.WIN){var keyIdentifier=keyCode?this._keyCodeToIdentifier(keyCode):this._charCodeToIdentifier(charCode);

if(!(this.__fA[keyIdentifier]==SSSS_0&&type==SSSS_0)){this._idealKeyHandler(keyCode,charCode,type,domEvent);
}this.__fA[keyIdentifier]=type;
}else{this._idealKeyHandler(keyCode,charCode,type,domEvent);
}this.__fG(domEvent.target,type,keyCode);
},"webkit":function(domEvent){var keyCode=0;
var charCode=0;
var type=domEvent.type;
if(qx.bom.client.Engine.VERSION<525.13){if(type==SSSS_4||type==SSSS_0){keyCode=this._charCode2KeyCode[domEvent.charCode]||domEvent.keyCode;
}else{if(this._charCode2KeyCode[domEvent.charCode]){keyCode=this._charCode2KeyCode[domEvent.charCode];
}else{charCode=domEvent.charCode;
}}this._idealKeyHandler(keyCode,charCode,type,domEvent);
}else{keyCode=domEvent.keyCode;
if(!(this.__fA[keyCode]==SSSS_0&&type==SSSS_0)){this._idealKeyHandler(keyCode,charCode,type,domEvent);
}if(type==SSSS_0){if(this._isNonPrintableKeyCode(keyCode)||keyCode==8||keyCode==9){this._idealKeyHandler(keyCode,charCode,SSSS_1,domEvent);
}}this.__fA[keyCode]=type;
}},"opera":function(domEvent){this.__BJ=domEvent.keyCode;
this._idealKeyHandler(domEvent.keyCode,0,domEvent.type,domEvent);
}})),__fG:qx.core.Variant.select(SSSS_2,{"gecko":function(target,type,keyCode){if(type===SSSS_0&&(keyCode==33||keyCode==34||keyCode==38||keyCode==40)&&target.type==SSSS_40&&target.tagName.toLowerCase()===SSSS_48&&target.getAttribute(SSSS_68)!==SSSS_59){if(!this.__fC){this.__fC={};
}var hash=qx.core.ObjectRegistry.toHashCode(target);

if(this.__fC[hash]){return;
}var self=this;
this.__fC[hash]={target:target,callback:function(domEvent){qx.bom.Event.stopPropagation(domEvent);
self.__fH(domEvent);
}};
var listener=qx.event.GlobalError.observeMethod(this.__fC[hash].callback);
qx.bom.Event.addNativeListener(target,SSSS_1,listener);
}},"default":null}),__fH:qx.event.GlobalError.observeMethod(qx.core.Variant.select(SSSS_2,{"mshtml":function(domEvent){domEvent=window.event||domEvent;

if(this._charCode2KeyCode[domEvent.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[domEvent.keyCode],0,domEvent.type,domEvent);
}else{this._idealKeyHandler(0,domEvent.keyCode,domEvent.type,domEvent);
}},"gecko":function(domEvent){var keyCode=this._keyCodeFix[domEvent.keyCode]||domEvent.keyCode;
var charCode=domEvent.charCode;
var type=domEvent.type;
this._idealKeyHandler(keyCode,charCode,type,domEvent);
},"webkit":function(domEvent){if(qx.bom.client.Engine.VERSION<525.13){var keyCode=0;
var charCode=0;
var type=domEvent.type;

if(type==SSSS_4||type==SSSS_0){keyCode=this._charCode2KeyCode[domEvent.charCode]||domEvent.keyCode;
}else{if(this._charCode2KeyCode[domEvent.charCode]){keyCode=this._charCode2KeyCode[domEvent.charCode];
}else{charCode=domEvent.charCode;
}}this._idealKeyHandler(keyCode,charCode,type,domEvent);
}else{if(this._charCode2KeyCode[domEvent.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[domEvent.keyCode],0,domEvent.type,domEvent);
}else{this._idealKeyHandler(0,domEvent.keyCode,domEvent.type,domEvent);
}}},"opera":function(domEvent){var keyCode=domEvent.keyCode;
var type=domEvent.type;
if(keyCode!=this.__BJ){this._idealKeyHandler(0,this.__BJ,type,domEvent);
}else{if(this._keyCodeToIdentifierMap[domEvent.keyCode]){this._idealKeyHandler(domEvent.keyCode,0,domEvent.type,domEvent);
}else{this._idealKeyHandler(0,domEvent.keyCode,domEvent.type,domEvent);
}}}})),_idealKeyHandler:function(keyCode,charCode,eventType,domEvent){var keyIdentifier;
if(keyCode||(!keyCode&&!charCode)){keyIdentifier=this._keyCodeToIdentifier(keyCode);
this._fireSequenceEvent(domEvent,eventType,keyIdentifier);
}else{keyIdentifier=this._charCodeToIdentifier(charCode);
this._fireSequenceEvent(domEvent,SSSS_1,keyIdentifier);
this._fireInputEvent(domEvent,charCode);
}},_specialCharCodeMap:{8:SSSS_70,9:SSSS_51,13:SSSS_5,27:SSSS_41,32:SSSS_50},_keyCodeToIdentifierMap:{16:SSSS_52,17:SSSS_49,18:SSSS_62,20:SSSS_47,224:SSSS_45,37:SSSS_15,38:SSSS_18,39:SSSS_39,40:SSSS_17,33:SSSS_9,34:SSSS_35,35:SSSS_26,36:SSSS_32,45:SSSS_24,46:SSSS_28,112:SSSS_30,113:SSSS_33,114:SSSS_22,115:SSSS_31,116:SSSS_16,117:SSSS_20,118:SSSS_36,119:SSSS_25,120:SSSS_37,121:SSSS_38,122:SSSS_19,123:SSSS_34,144:SSSS_3,44:SSSS_11,145:SSSS_64,19:SSSS_53,91:SSSS_67,93:SSSS_60},_numpadToCharCode:{96:SSSS_6.charCodeAt(0),97:SSSS_65.charCodeAt(0),98:SSSS_63.charCodeAt(0),99:SSSS_44.charCodeAt(0),100:SSSS_61.charCodeAt(0),101:SSSS_43.charCodeAt(0),102:SSSS_58.charCodeAt(0),103:SSSS_46.charCodeAt(0),104:SSSS_66.charCodeAt(0),105:SSSS_7.charCodeAt(0),106:SSSS_29.charCodeAt(0),107:SSSS_10.charCodeAt(0),109:SSSS_8.charCodeAt(0),110:SSSS_69.charCodeAt(0),111:SSSS_27.charCodeAt(0)},_charCodeA:SSSS_13.charCodeAt(0),_charCodeZ:SSSS_14.charCodeAt(0),_charCode0:SSSS_6.charCodeAt(0),_charCode9:SSSS_7.charCodeAt(0),_isNonPrintableKeyCode:function(keyCode){return this._keyCodeToIdentifierMap[keyCode]?true:false;
},_isIdentifiableKeyCode:function(keyCode){if(keyCode>=this._charCodeA&&keyCode<=this._charCodeZ){return true;
}if(keyCode>=this._charCode0&&keyCode<=this._charCode9){return true;
}if(this._specialCharCodeMap[keyCode]){return true;
}if(this._numpadToCharCode[keyCode]){return true;
}if(this._isNonPrintableKeyCode(keyCode)){return true;
}return false;
},_keyCodeToIdentifier:function(keyCode){if(this._isIdentifiableKeyCode(keyCode)){var numPadKeyCode=this._numpadToCharCode[keyCode];

if(numPadKeyCode){return String.fromCharCode(numPadKeyCode);
}return (this._keyCodeToIdentifierMap[keyCode]||this._specialCharCodeMap[keyCode]||String.fromCharCode(keyCode));
}else{return SSSS_54;
}},_charCodeToIdentifier:function(charCode){return this._specialCharCodeMap[charCode]||String.fromCharCode(charCode).toUpperCase();
},_identifierToKeyCode:function(keyIdentifier){return qx.event.handler.Keyboard._identifierToKeyCodeMap[keyIdentifier]||keyIdentifier.charCodeAt(0);
}},destruct:function(){this._stopKeyObserver();
this.__BJ=this.__fx=this.__fy=this.__fz=this.__fA=null;
},defer:function(statics,members,properties){qx.event.Registration.addHandler(statics);
if(!statics._identifierToKeyCodeMap){statics._identifierToKeyCodeMap={};

for(var key in members._keyCodeToIdentifierMap){statics._identifierToKeyCodeMap[members._keyCodeToIdentifierMap[key]]=parseInt(key,10);
}
for(var key in members._specialCharCodeMap){statics._identifierToKeyCodeMap[members._specialCharCodeMap[key]]=parseInt(key,10);
}}
if(qx.core.Variant.isSet(SSSS_2,SSSS_56)){members._charCode2KeyCode={13:13,27:27};
}else if(qx.core.Variant.isSet(SSSS_2,SSSS_12)){members._keyCodeFix={12:members._identifierToKeyCode(SSSS_3)};
}else if(qx.core.Variant.isSet(SSSS_2,SSSS_42)){if(qx.bom.client.Engine.VERSION<525.13){members._charCode2KeyCode={63289:members._identifierToKeyCode(SSSS_3),63276:members._identifierToKeyCode(SSSS_9),63277:members._identifierToKeyCode(SSSS_35),63275:members._identifierToKeyCode(SSSS_26),63273:members._identifierToKeyCode(SSSS_32),63234:members._identifierToKeyCode(SSSS_15),63232:members._identifierToKeyCode(SSSS_18),63235:members._identifierToKeyCode(SSSS_39),63233:members._identifierToKeyCode(SSSS_17),63272:members._identifierToKeyCode(SSSS_28),63302:members._identifierToKeyCode(SSSS_24),63236:members._identifierToKeyCode(SSSS_30),63237:members._identifierToKeyCode(SSSS_33),63238:members._identifierToKeyCode(SSSS_22),63239:members._identifierToKeyCode(SSSS_31),63240:members._identifierToKeyCode(SSSS_16),63241:members._identifierToKeyCode(SSSS_20),63242:members._identifierToKeyCode(SSSS_36),63243:members._identifierToKeyCode(SSSS_25),63244:members._identifierToKeyCode(SSSS_37),63245:members._identifierToKeyCode(SSSS_38),63246:members._identifierToKeyCode(SSSS_19),63247:members._identifierToKeyCode(SSSS_34),63248:members._identifierToKeyCode(SSSS_11),3:members._identifierToKeyCode(SSSS_5),12:members._identifierToKeyCode(SSSS_3),13:members._identifierToKeyCode(SSSS_5)};
}else{members._charCode2KeyCode={13:13,27:27};
}}}});
})();
(function(){var SSSS_0="qx.client",SSSS_1="mouseup",SSSS_2="click",SSSS_3="mousedown",SSSS_4="contextmenu",SSSS_5="dblclick",SSSS_6="mousewheel",SSSS_7="mouseover",SSSS_8="mouseout",SSSS_9="DOMMouseScroll",SSSS_10="mousemove",SSSS_11="on",SSSS_12="mshtml|webkit|opera",SSSS_13="useraction",SSSS_14="gecko|webkit",SSSS_15="qx.event.handler.Mouse";
qx.Class.define(SSSS_15,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
this.__fI=manager;
this.__fJ=manager.getWindow();
this.__fK=this.__fJ.document;
this._initButtonObserver();
this._initMoveObserver();
this._initWheelObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__fL:null,__fM:null,__fN:null,__fO:null,__fP:null,__fI:null,__fJ:null,__fK:null,canHandleEvent:function(target,type){},registerEvent:qx.bom.client.System.IPHONE?
function(target,type,capture){target[SSSS_11+type]=qx.lang.Function.returnNull;
}:qx.lang.Function.returnNull,unregisterEvent:qx.bom.client.System.IPHONE?
function(target,type,capture){target[SSSS_11+type]=undefined;
}:qx.lang.Function.returnNull,__fQ:function(domEvent,type,target){if(!target){target=domEvent.target||domEvent.srcElement;
}if(target&&target.nodeType){qx.event.Registration.fireEvent(target,type||domEvent.type,qx.event.type.Mouse,[domEvent,target,null,true,true]);
}qx.event.Registration.fireEvent(this.__fJ,SSSS_13,qx.event.type.Data,[type||domEvent.type]);
},_initButtonObserver:function(){this.__fL=qx.lang.Function.listener(this._onButtonEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fK,SSSS_3,this.__fL);
Event.addNativeListener(this.__fK,SSSS_1,this.__fL);
Event.addNativeListener(this.__fK,SSSS_2,this.__fL);
Event.addNativeListener(this.__fK,SSSS_5,this.__fL);
Event.addNativeListener(this.__fK,SSSS_4,this.__fL);
},_initMoveObserver:function(){this.__fM=qx.lang.Function.listener(this._onMoveEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fK,SSSS_10,this.__fM);
Event.addNativeListener(this.__fK,SSSS_7,this.__fM);
Event.addNativeListener(this.__fK,SSSS_8,this.__fM);
},_initWheelObserver:function(){this.__fN=qx.lang.Function.listener(this._onWheelEvent,this);
var Event=qx.bom.Event;
var type=qx.core.Variant.isSet(SSSS_0,SSSS_12)?SSSS_6:SSSS_9;
Event.addNativeListener(this.__fK,type,this.__fN);
},_stopButtonObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fK,SSSS_3,this.__fL);
Event.removeNativeListener(this.__fK,SSSS_1,this.__fL);
Event.removeNativeListener(this.__fK,SSSS_2,this.__fL);
Event.removeNativeListener(this.__fK,SSSS_5,this.__fL);
Event.removeNativeListener(this.__fK,SSSS_4,this.__fL);
},_stopMoveObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fK,SSSS_10,this.__fM);
Event.removeNativeListener(this.__fK,SSSS_7,this.__fM);
Event.removeNativeListener(this.__fK,SSSS_8,this.__fM);
},_stopWheelObserver:function(){var Event=qx.bom.Event;
var type=qx.core.Variant.isSet(SSSS_0,SSSS_12)?SSSS_6:SSSS_9;
Event.removeNativeListener(this.__fK,type,this.__fN);
},_onMoveEvent:qx.event.GlobalError.observeMethod(function(domEvent){this.__fQ(domEvent);
}),_onButtonEvent:qx.event.GlobalError.observeMethod(function(domEvent){var type=domEvent.type;
var target=domEvent.target||domEvent.srcElement;
if(qx.core.Variant.isSet(SSSS_0,SSSS_14)){if(target&&target.nodeType==3){target=target.parentNode;
}}
if(this.__fR){this.__fR(domEvent,type,target);
}
if(this.__fT){this.__fT(domEvent,type,target);
}this.__fQ(domEvent,type,target);

if(this.__fS){this.__fS(domEvent,type,target);
}
if(this.__fU){this.__fU(domEvent,type,target);
}this.__fO=type;
}),_onWheelEvent:qx.event.GlobalError.observeMethod(function(domEvent){this.__fQ(domEvent,SSSS_6);
}),__fR:qx.core.Variant.select(SSSS_0,{"webkit":function(domEvent,type,target){if(qx.bom.client.Engine.VERSION<530){if(type==SSSS_4){this.__fQ(domEvent,SSSS_1,target);
}}},"default":null}),__fS:qx.core.Variant.select(SSSS_0,{"opera":function(domEvent,type,target){if(type==SSSS_1&&domEvent.button==2){this.__fQ(domEvent,SSSS_4,target);
}},"default":null}),__fT:qx.core.Variant.select(SSSS_0,{"mshtml":function(domEvent,type,target){if(type==SSSS_1&&this.__fO==SSSS_2){this.__fQ(domEvent,SSSS_3,target);
}else if(type==SSSS_5){this.__fQ(domEvent,SSSS_2,target);
}},"default":null}),__fU:qx.core.Variant.select(SSSS_0,{"mshtml":null,"default":function(domEvent,type,target){switch(type){case SSSS_3:this.__fP=target;
break;
case SSSS_1:if(target!==this.__fP){var commonParent=qx.dom.Hierarchy.getCommonParent(target,this.__fP);
this.__fQ(domEvent,SSSS_2,commonParent);
}}}})},destruct:function(){this._stopButtonObserver();
this._stopMoveObserver();
this._stopWheelObserver();
this.__fI=this.__fJ=this.__fK=this.__fP=null;
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
})();
(function(){var SSSS_0="qx.event.handler.Capture";
qx.Class.define(SSSS_0,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){}},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
})();
(function(){var SSSS_0="alias",SSSS_1="copy",SSSS_2="blur",SSSS_3="mouseout",SSSS_4="keydown",SSSS_5="Ctrl",SSSS_6="Shift",SSSS_7="mousemove",SSSS_8="move",SSSS_9="mouseover",SSSS_10="Alt",SSSS_11="keyup",SSSS_12="mouseup",SSSS_13="dragend",SSSS_14="on",SSSS_15="mousedown",SSSS_16="qxDraggable",SSSS_17="drag",SSSS_18="drop",SSSS_19="qxDroppable",SSSS_20="qx.event.handler.DragDrop",SSSS_21="droprequest",SSSS_22="dragstart",SSSS_23="dragchange",SSSS_24="dragleave",SSSS_25="dragover";
qx.Class.define(SSSS_20,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
this.__fV=manager;
this.__fW=manager.getWindow().document.documentElement;
this.__fV.addListener(this.__fW,SSSS_15,this._onMouseDown,this);
this.__gj();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__fV:null,__fW:null,__fX:null,__fY:null,__ga:null,__gb:null,__gc:null,__gd:null,__ge:null,__gf:null,__gg:false,__gh:0,__gi:0,canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){},addType:function(type){this.__ga[type]=true;
},addAction:function(action){this.__gb[action]=true;
},supportsType:function(type){return !!this.__ga[type];
},supportsAction:function(type){return !!this.__gb[type];
},getData:function(type){if(!this.__gq||!this.__fX){throw new Error("This method must not be used outside the drop event listener!");
}
if(!this.__ga[type]){throw new Error("Unsupported data type: "+type+"!");
}
if(!this.__gd[type]){this.__ge=type;
this.__gl(SSSS_21,this.__fY,this.__fX,false);
}
if(!this.__gd[type]){throw new Error("Please use a droprequest listener to the drag source to fill the manager with data!");
}return this.__gd[type]||null;
},getCurrentAction:function(){return this.__gf;
},addData:function(type,data){this.__gd[type]=data;
},getCurrentType:function(){return this.__ge;
},__gj:function(){this.__ga={};
this.__gb={};
this.__gc={};
this.__gd={};
},__gk:function(){var actions=this.__gb;
var keys=this.__gc;
var current=null;

if(this.__gq){if(keys.Shift&&keys.Ctrl&&actions.alias){current=SSSS_0;
}else if(keys.Shift&&keys.Alt&&actions.copy){current=SSSS_1;
}else if(keys.Shift&&actions.move){current=SSSS_8;
}else if(keys.Alt&&actions.alias){current=SSSS_0;
}else if(keys.Ctrl&&actions.copy){current=SSSS_1;
}else if(actions.move){current=SSSS_8;
}else if(actions.copy){current=SSSS_1;
}else if(actions.alias){current=SSSS_0;
}}
if(current!=this.__gf){this.__gf=current;
this.__gl(SSSS_23,this.__fY,this.__fX,false);
}},__gl:function(type,target,relatedTarget,cancelable,original){var Registration=qx.event.Registration;
var dragEvent=Registration.createEvent(type,qx.event.type.Drag,[cancelable,original]);

if(target!==relatedTarget){dragEvent.setRelatedTarget(relatedTarget);
}return Registration.dispatchEvent(target,dragEvent);
},__gm:function(elem){while(elem&&elem.nodeType==1){if(elem.getAttribute(SSSS_16)==SSSS_14){return elem;
}elem=elem.parentNode;
}return null;
},__gn:function(elem){while(elem&&elem.nodeType==1){if(elem.getAttribute(SSSS_19)==SSSS_14){return elem;
}elem=elem.parentNode;
}return null;
},__go:function(){this.__fY=null;
this.__fV.removeListener(this.__fW,SSSS_7,this._onMouseMove,this,true);
this.__fV.removeListener(this.__fW,SSSS_12,this._onMouseUp,this,true);
qx.event.Registration.removeListener(window,SSSS_2,this._onWindowBlur,this);
this.__gj();
},__gp:function(){if(this.__gg){this.__fV.removeListener(this.__fW,SSSS_9,this._onMouseOver,this,true);
this.__fV.removeListener(this.__fW,SSSS_3,this._onMouseOut,this,true);
this.__fV.removeListener(this.__fW,SSSS_4,this._onKeyDown,this,true);
this.__fV.removeListener(this.__fW,SSSS_11,this._onKeyUp,this,true);
this.__gl(SSSS_13,this.__fY,this.__fX,false);
this.__gg=false;
}this.__gq=false;
this.__fX=null;
this.__go();
},__gq:false,_onWindowBlur:function(e){this.__gp();
},_onKeyDown:function(e){var iden=e.getKeyIdentifier();

switch(iden){case SSSS_10:case SSSS_5:case SSSS_6:if(!this.__gc[iden]){this.__gc[iden]=true;
this.__gk();
}}},_onKeyUp:function(e){var iden=e.getKeyIdentifier();

switch(iden){case SSSS_10:case SSSS_5:case SSSS_6:if(this.__gc[iden]){this.__gc[iden]=false;
this.__gk();
}}},_onMouseDown:function(e){if(this.__gg){return;
}var dragable=this.__gm(e.getTarget());

if(dragable){this.__gh=e.getDocumentLeft();
this.__gi=e.getDocumentTop();
this.__fY=dragable;
this.__fV.addListener(this.__fW,SSSS_7,this._onMouseMove,this,true);
this.__fV.addListener(this.__fW,SSSS_12,this._onMouseUp,this,true);
qx.event.Registration.addListener(window,SSSS_2,this._onWindowBlur,this);
}},_onMouseUp:function(e){if(this.__gq){this.__gl(SSSS_18,this.__fX,this.__fY,false,e);
}if(this.__gg){e.stopPropagation();
}this.__gp();
},_onMouseMove:function(e){if(this.__gg){if(!this.__gl(SSSS_17,this.__fY,this.__fX,true,e)){this.__gp();
}}else{if(Math.abs(e.getDocumentLeft()-this.__gh)>3||Math.abs(e.getDocumentTop()-this.__gi)>3){if(this.__gl(SSSS_22,this.__fY,this.__fX,true,e)){this.__gg=true;
this.__fV.addListener(this.__fW,SSSS_9,this._onMouseOver,this,true);
this.__fV.addListener(this.__fW,SSSS_3,this._onMouseOut,this,true);
this.__fV.addListener(this.__fW,SSSS_4,this._onKeyDown,this,true);
this.__fV.addListener(this.__fW,SSSS_11,this._onKeyUp,this,true);
var keys=this.__gc;
keys.Ctrl=e.isCtrlPressed();
keys.Shift=e.isShiftPressed();
keys.Alt=e.isAltPressed();
this.__gk();
}else{this.__gl(SSSS_13,this.__fY,this.__fX,false);
this.__go();
}}}},_onMouseOver:function(e){var target=e.getTarget();
var dropable=this.__gn(target);

if(dropable&&dropable!=this.__fX){this.__gq=this.__gl(SSSS_25,dropable,this.__fY,true,e);
this.__fX=dropable;
this.__gk();
}},_onMouseOut:function(e){var dropable=this.__gn(e.getTarget());
var newDropable=this.__gn(e.getRelatedTarget());

if(dropable&&dropable!==newDropable&&dropable==this.__fX){this.__gl(SSSS_24,this.__fX,newDropable,false,e);
this.__fX=null;
this.__gq=false;
qx.event.Timer.once(this.__gk,this,0);
}}},destruct:function(){this.__fY=this.__fX=this.__fV=this.__fW=this.__ga=this.__gb=this.__gc=this.__gd=null;
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
})();
(function(){var SSSS_0="-",SSSS_1="qx.event.handler.Element";
qx.Class.define(SSSS_1,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
this._manager=manager;
this._registeredEvents={};
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,scroll:true,select:true,reset:true,submit:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){var elementId=qx.core.ObjectRegistry.toHashCode(target);
var eventId=elementId+SSSS_0+type;
var listener=qx.lang.Function.listener(this._onNative,this,eventId);
qx.bom.Event.addNativeListener(target,type,listener);
this._registeredEvents[eventId]={element:target,type:type,listener:listener};
},unregisterEvent:function(target,type,capture){var events=this._registeredEvents;

if(!events){return;
}var elementId=qx.core.ObjectRegistry.toHashCode(target);
var eventId=elementId+SSSS_0+type;
var eventData=this._registeredEvents[eventId];
qx.bom.Event.removeNativeListener(target,type,eventData.listener);
delete this._registeredEvents[eventId];
},_onNative:qx.event.GlobalError.observeMethod(function(nativeEvent,eventId){var events=this._registeredEvents;

if(!events){return;
}var eventData=events[eventId];
qx.event.Registration.fireNonBubblingEvent(eventData.element,eventData.type,qx.event.type.Native,[nativeEvent]);
})},destruct:function(){var entry;
var events=this._registeredEvents;

for(var id in events){entry=events[id];
qx.bom.Event.removeNativeListener(entry.element,entry.type,entry.listener);
}this._manager=this._registeredEvents=null;
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
})();
(function(){var SSSS_0="qx.event.handler.Appear",SSSS_1="disappear",SSSS_2="appear";
qx.Class.define(SSSS_0,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
this.__gr=manager;
this.__gs={};
qx.event.handler.Appear.__gt[this.$$hash]=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__gt:{},refresh:function(){var all=this.__gt;

for(var hash in all){all[hash].refresh();
}}},members:{__gr:null,__gs:null,canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){var hash=qx.core.ObjectRegistry.toHashCode(target)+type;
var targets=this.__gs;

if(targets&&!targets[hash]){targets[hash]=target;
target.$$displayed=target.offsetWidth>0;
}},unregisterEvent:function(target,type,capture){var hash=qx.core.ObjectRegistry.toHashCode(target)+type;
var targets=this.__gs;

if(!targets){return;
}
if(targets[hash]){delete targets[hash];
}},refresh:function(){var targets=this.__gs;
var elem;

for(var hash in targets){elem=targets[hash];
var displayed=elem.offsetWidth>0;

if((!!elem.$$displayed)!==displayed){elem.$$displayed=displayed;
var evt=qx.event.Registration.createEvent(displayed?SSSS_2:SSSS_1);
this.__gr.dispatchEvent(elem,evt);
}}}},destruct:function(){this.__gr=this.__gs=null;
delete qx.event.handler.Appear.__gt[this.$$hash];
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
})();
(function(){var SSSS_0="mshtml",SSSS_1="",SSSS_2="qx.client",SSSS_3=">",SSSS_4="<",SSSS_5=" ",SSSS_6="='",SSSS_7="qx.bom.Element",SSSS_8="div",SSSS_9="' ",SSSS_10="></";
qx.Class.define(SSSS_7,{statics:{__gu:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},create:function(name,attributes,win){if(!win){win=window;
}
if(!name){throw new Error("The tag name is missing!");
}var initial=this.__gu;
var attributesHtml=SSSS_1;

for(var key in attributes){if(initial[key]){attributesHtml+=key+SSSS_6+attributes[key]+SSSS_9;
}}var element;
if(attributesHtml!=SSSS_1){if(qx.bom.client.Engine.MSHTML){element=win.document.createElement(SSSS_4+name+SSSS_5+attributesHtml+SSSS_3);
}else{var helper=win.document.createElement(SSSS_8);
helper.innerHTML=SSSS_4+name+SSSS_5+attributesHtml+SSSS_10+name+SSSS_3;
element=helper.firstChild;
}}else{element=win.document.createElement(name);
}
for(var key in attributes){if(!initial[key]){qx.bom.element.Attribute.set(element,key,attributes[key]);
}}return element;
},empty:function(element){return element.innerHTML=SSSS_1;
},addListener:function(element,type,listener,self,capture){return qx.event.Registration.addListener(element,type,listener,self,capture);
},removeListener:function(element,type,listener,self,capture){return qx.event.Registration.removeListener(element,type,listener,self,capture);
},removeListenerById:function(target,id){return qx.event.Registration.removeListenerById(target,id);
},hasListener:function(element,type,capture){return qx.event.Registration.hasListener(element,type,capture);
},focus:function(element){qx.event.Registration.getManager(element).getHandler(qx.event.handler.Focus).focus(element);
},blur:function(element){qx.event.Registration.getManager(element).getHandler(qx.event.handler.Focus).blur(element);
},activate:function(element){qx.event.Registration.getManager(element).getHandler(qx.event.handler.Focus).activate(element);
},deactivate:function(element){qx.event.Registration.getManager(element).getHandler(qx.event.handler.Focus).deactivate(element);
},capture:function(element,containerCapture){qx.event.Registration.getManager(element).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(element,containerCapture);
},releaseCapture:function(element){qx.event.Registration.getManager(element).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(element);
},clone:function(element,events){var clone;

if(events||(qx.core.Variant.isSet(SSSS_2,SSSS_0)&&!qx.xml.Document.isXmlDocument(element))){var mgr=qx.event.Registration.getManager(element);
var all=qx.dom.Hierarchy.getDescendants(element);
all.push(element);
}if(qx.core.Variant.isSet(SSSS_2,SSSS_0)){for(var i=0,l=all.length;i<l;i++){mgr.toggleAttachedEvents(all[i],false);
}}var clone=element.cloneNode(true);
if(qx.core.Variant.isSet(SSSS_2,SSSS_0)){for(var i=0,l=all.length;i<l;i++){mgr.toggleAttachedEvents(all[i],true);
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
})();
(function(){var SSSS_0="qx.event.type.Dom";
qx.Class.define(SSSS_0,{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{_cloneNativeEvent:function(nativeEvent,clone){var clone=arguments.callee.base.call(this,nativeEvent,clone);
clone.shiftKey=nativeEvent.shiftKey;
clone.ctrlKey=nativeEvent.ctrlKey;
clone.altKey=nativeEvent.altKey;
clone.metaKey=nativeEvent.metaKey;
return clone;
},getModifiers:function(){var mask=0;
var evt=this._native;

if(evt.shiftKey){mask|=qx.event.type.Dom.SHIFT_MASK;
}
if(evt.ctrlKey){mask|=qx.event.type.Dom.CTRL_MASK;
}
if(evt.altKey){mask|=qx.event.type.Dom.ALT_MASK;
}
if(evt.metaKey){mask|=qx.event.type.Dom.META_MASK;
}return mask;
},isCtrlPressed:function(){return this._native.ctrlKey;
},isShiftPressed:function(){return this._native.shiftKey;
},isAltPressed:function(){return this._native.altKey;
},isMetaPressed:function(){return this._native.metaKey;
},isCtrlOrCommandPressed:function(){if(qx.bom.client.Platform.MAC){return this._native.metaKey;
}else{return this._native.ctrlKey;
}}}});
})();
(function(){var SSSS_0="qx.event.type.KeyInput";
qx.Class.define(SSSS_0,{extend:qx.event.type.Dom,members:{init:function(domEvent,target,charCode){arguments.callee.base.call(this,domEvent,target,null,true,true);
this._charCode=charCode;
return this;
},clone:function(embryo){var clone=arguments.callee.base.call(this,embryo);
clone._charCode=this._charCode;
return clone;
},getCharCode:function(){return this._charCode;
},getChar:function(){return String.fromCharCode(this._charCode);
}}});
})();
(function(){var SSSS_0="qx.event.type.KeySequence";
qx.Class.define(SSSS_0,{extend:qx.event.type.Dom,members:{init:function(domEvent,target,identifier){arguments.callee.base.call(this,domEvent,target,null,true,true);
this._identifier=identifier;
return this;
},clone:function(embryo){var clone=arguments.callee.base.call(this,embryo);
clone._identifier=this._identifier;
return clone;
},getKeyIdentifier:function(){return this._identifier;
}}});
})();
(function(){var SSSS_0="qx.client",SSSS_1="blur",SSSS_2="focus",SSSS_3="mousedown",SSSS_4="on",SSSS_5="mouseup",SSSS_6="DOMFocusOut",SSSS_7="DOMFocusIn",SSSS_8="selectstart",SSSS_9="onmousedown",SSSS_10="onfocusout",SSSS_11="onfocusin",SSSS_12="onmouseup",SSSS_13="onselectstart",SSSS_14="draggesture",SSSS_15="gecko",SSSS_16="qx.event.handler.Focus",SSSS_17="_applyFocus",SSSS_18="deactivate",SSSS_19="textarea",SSSS_20="qxIsRootPage",SSSS_21="_applyActive",SSSS_22="input",SSSS_23="focusin",SSSS_24="qxSelectable",SSSS_25="tabIndex",SSSS_26="off",SSSS_27="activate",SSSS_28="1",SSSS_29="focusout",SSSS_30="qxKeepFocus",SSSS_31="qxKeepActive";
qx.Class.define(SSSS_16,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
this._manager=manager;
this._window=manager.getWindow();
this._document=this._window.document;
this._root=this._document.documentElement;
this._body=this._document.body;
this._initObserver();
},properties:{active:{apply:SSSS_21,nullable:true},focus:{apply:SSSS_17,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Variant.select("qx.client",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__gv:null,__gw:null,__gx:null,__gy:null,__gz:null,__gA:null,__gB:null,__gC:null,__gD:null,__gE:null,canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){},focus:function(element){try{element.focus();
}catch(ex){}this.setFocus(element);
this.setActive(element);
},activate:function(element){this.setActive(element);
},blur:function(element){try{element.blur();
}catch(ex){}
if(this.getActive()===element){this.resetActive();
}
if(this.getFocus()===element){this.resetFocus();
}},deactivate:function(element){if(this.getActive()===element){this.resetActive();
}},tryActivate:function(element){var active=this.__gT(element);

if(active){this.setActive(active);
}},__gF:function(target,related,type,bubbles){var Registration=qx.event.Registration;
var evt=Registration.createEvent(type,qx.event.type.Focus,[target,related,bubbles]);
Registration.dispatchEvent(target,evt);
},_windowFocused:true,__gG:function(){if(this._windowFocused){this._windowFocused=false;
this.__gF(this._window,null,SSSS_1,false);
}},__gH:function(){if(!this._windowFocused){this._windowFocused=true;
this.__gF(this._window,null,SSSS_2,false);
}},_initObserver:qx.core.Variant.select(SSSS_0,{"gecko":function(){this.__gv=qx.lang.Function.listener(this.__gN,this);
this.__gw=qx.lang.Function.listener(this.__gO,this);
this.__gx=qx.lang.Function.listener(this.__gM,this);
this.__gy=qx.lang.Function.listener(this.__gL,this);
this.__gz=qx.lang.Function.listener(this.__gI,this);
this._document.addEventListener(SSSS_3,this.__gv,true);
this._document.addEventListener(SSSS_5,this.__gw,true);
this._window.addEventListener(SSSS_2,this.__gx,true);
this._window.addEventListener(SSSS_1,this.__gy,true);
this._window.addEventListener(SSSS_14,this.__gz,true);
},"mshtml":function(){this.__gv=qx.lang.Function.listener(this.__gN,this);
this.__gw=qx.lang.Function.listener(this.__gO,this);
this.__gB=qx.lang.Function.listener(this.__gJ,this);
this.__gC=qx.lang.Function.listener(this.__gK,this);
this.__gA=qx.lang.Function.listener(this.__gQ,this);
this._document.attachEvent(SSSS_9,this.__gv);
this._document.attachEvent(SSSS_12,this.__gw);
this._document.attachEvent(SSSS_11,this.__gB);
this._document.attachEvent(SSSS_10,this.__gC);
this._document.attachEvent(SSSS_13,this.__gA);
},"webkit":function(){this.__gv=qx.lang.Function.listener(this.__gN,this);
this.__gw=qx.lang.Function.listener(this.__gO,this);
this.__gC=qx.lang.Function.listener(this.__gK,this);
this.__gx=qx.lang.Function.listener(this.__gM,this);
this.__gy=qx.lang.Function.listener(this.__gL,this);
this.__gA=qx.lang.Function.listener(this.__gQ,this);
this._document.addEventListener(SSSS_3,this.__gv,true);
this._document.addEventListener(SSSS_5,this.__gw,true);
this._document.addEventListener(SSSS_8,this.__gA,false);
this._window.addEventListener(SSSS_6,this.__gC,true);
this._window.addEventListener(SSSS_2,this.__gx,true);
this._window.addEventListener(SSSS_1,this.__gy,true);
},"opera":function(){this.__gv=qx.lang.Function.listener(this.__gN,this);
this.__gw=qx.lang.Function.listener(this.__gO,this);
this.__gB=qx.lang.Function.listener(this.__gJ,this);
this.__gC=qx.lang.Function.listener(this.__gK,this);
this._document.addEventListener(SSSS_3,this.__gv,true);
this._document.addEventListener(SSSS_5,this.__gw,true);
this._window.addEventListener(SSSS_7,this.__gB,true);
this._window.addEventListener(SSSS_6,this.__gC,true);
}}),_stopObserver:qx.core.Variant.select(SSSS_0,{"gecko":function(){this._document.removeEventListener(SSSS_3,this.__gv,true);
this._document.removeEventListener(SSSS_5,this.__gw,true);
this._window.removeEventListener(SSSS_2,this.__gx,true);
this._window.removeEventListener(SSSS_1,this.__gy,true);
this._window.removeEventListener(SSSS_14,this.__gz,true);
},"mshtml":function(){this._document.detachEvent(SSSS_9,this.__gv);
this._document.detachEvent(SSSS_12,this.__gw);
this._document.detachEvent(SSSS_11,this.__gB);
this._document.detachEvent(SSSS_10,this.__gC);
this._document.detachEvent(SSSS_13,this.__gA);
},"webkit":function(){this._document.removeEventListener(SSSS_3,this.__gv,true);
this._document.removeEventListener(SSSS_8,this.__gA,false);
this._window.removeEventListener(SSSS_7,this.__gB,true);
this._window.removeEventListener(SSSS_6,this.__gC,true);
this._window.removeEventListener(SSSS_2,this.__gx,true);
this._window.removeEventListener(SSSS_1,this.__gy,true);
},"opera":function(){this._document.removeEventListener(SSSS_3,this.__gv,true);
this._window.removeEventListener(SSSS_7,this.__gB,true);
this._window.removeEventListener(SSSS_6,this.__gC,true);
this._window.removeEventListener(SSSS_2,this.__gx,true);
this._window.removeEventListener(SSSS_1,this.__gy,true);
}}),__gI:qx.event.GlobalError.observeMethod(qx.core.Variant.select(SSSS_0,{"gecko":function(e){if(!this.__gU(e.target)){qx.bom.Event.preventDefault(e);
}},"default":null})),__gJ:qx.event.GlobalError.observeMethod(qx.core.Variant.select(SSSS_0,{"mshtml":function(e){this.__gH();
var target=e.srcElement;
var focusTarget=this.__gS(target);

if(focusTarget){this.setFocus(focusTarget);
}this.tryActivate(target);
},"opera":function(e){var target=e.target;

if(target==this._document||target==this._window){this.__gH();

if(this.__gD){this.setFocus(this.__gD);
delete this.__gD;
}
if(this.__gE){this.setActive(this.__gE);
delete this.__gE;
}}else{this.setFocus(target);
this.tryActivate(target);
if(!this.__gU(target)){target.selectionStart=0;
target.selectionEnd=0;
}}},"default":null})),__gK:qx.event.GlobalError.observeMethod(qx.core.Variant.select(SSSS_0,{"mshtml":function(e){if(!e.toElement){this.__gG();
this.resetFocus();
this.resetActive();
}},"webkit":function(e){var target=e.target;

if(target===this.getFocus()){this.resetFocus();
}
if(target===this.getActive()){this.resetActive();
}},"opera":function(e){var target=e.target;

if(target==this._document){this.__gG();
this.__gD=this.getFocus();
this.__gE=this.getActive();
this.resetFocus();
this.resetActive();
}else{if(target===this.getFocus()){this.resetFocus();
}
if(target===this.getActive()){this.resetActive();
}}},"default":null})),__gL:qx.event.GlobalError.observeMethod(qx.core.Variant.select(SSSS_0,{"gecko":function(e){if(e.target===this._window||e.target===this._document){this.__gG();
this.resetActive();
this.resetFocus();
}},"webkit":function(e){if(e.target===this._window||e.target===this._document){this.__gG();
this.__gD=this.getFocus();
this.__gE=this.getActive();
this.resetActive();
this.resetFocus();
}},"default":null})),__gM:qx.event.GlobalError.observeMethod(qx.core.Variant.select(SSSS_0,{"gecko":function(e){var target=e.target;

if(target===this._window||target===this._document){this.__gH();
target=this._body;
}this.setFocus(target);
this.tryActivate(target);
},"webkit":function(e){var target=e.target;

if(target===this._window||target===this._document){this.__gH();

if(this.__gD){this.setFocus(this.__gD);
delete this.__gD;
}
if(this.__gE){this.setActive(this.__gE);
delete this.__gE;
}}else{this.setFocus(target);
this.tryActivate(target);
}},"default":null})),__gN:qx.event.GlobalError.observeMethod(qx.core.Variant.select(SSSS_0,{"gecko":function(e){var target=e.target;
var focusTarget=this.__gS(target);
var selectable=this.__gU(target);

if(!selectable){qx.bom.Event.preventDefault(e);
if(focusTarget){if(qx.core.Variant.isSet(SSSS_0,SSSS_15)){var isElementOfRootPage=qx.bom.element.Attribute.get(focusTarget,SSSS_20)===SSSS_28;

if(!isElementOfRootPage){focusTarget.focus();
}}else{focusTarget.focus();
}}}else if(!focusTarget){qx.bom.Event.preventDefault(e);
}},"mshtml":function(e){var target=e.srcElement;
var focusTarget=this.__gS(target);

if(focusTarget){if(!this.__gU(target)){target.unselectable=SSSS_4;
document.selection.empty();
focusTarget.focus();
}}else{qx.bom.Event.preventDefault(e);
if(!this.__gU(target)){target.unselectable=SSSS_4;
}}},"webkit":function(e){var target=e.target;
var focusTarget=this.__gS(target);

if(focusTarget){this.setFocus(focusTarget);
}else{qx.bom.Event.preventDefault(e);
}},"opera":function(e){var target=e.target;
var focusTarget=this.__gS(target);

if(!this.__gU(target)){qx.bom.Event.preventDefault(e);
if(focusTarget){var current=this.getFocus();

if(current&&current.selectionEnd){current.selectionStart=0;
current.selectionEnd=0;
current.blur();
}if(focusTarget){this.setFocus(focusTarget);
}}}else if(focusTarget){this.setFocus(focusTarget);
}},"default":null})),__gO:qx.event.GlobalError.observeMethod(qx.core.Variant.select(SSSS_0,{"mshtml":function(e){var target=e.srcElement;

if(target.unselectable){target.unselectable=SSSS_26;
}this.tryActivate(this.__gP(target));
},"gecko":function(e){var target=e.target;

while(target&&target.offsetWidth===undefined){target=target.parentNode;
}
if(target){this.tryActivate(target);
}},"webkit|opera":function(e){this.tryActivate(this.__gP(e.target));
},"default":null})),__gP:qx.event.GlobalError.observeMethod(qx.core.Variant.select(SSSS_0,{"mshtml|webkit":function(target){var focusedElement=this.getFocus();

if(focusedElement&&target!=focusedElement&&(focusedElement.nodeName.toLowerCase()===SSSS_22||focusedElement.nodeName.toLowerCase()===SSSS_19)){target=focusedElement;
}return target;
},"default":function(target){return target;
}})),__gQ:qx.event.GlobalError.observeMethod(qx.core.Variant.select(SSSS_0,{"mshtml|webkit":function(e){var target=qx.bom.client.Engine.MSHTML?e.srcElement:e.target;

if(!this.__gU(target)){qx.bom.Event.preventDefault(e);
}},"default":null})),__gR:function(el){var index=qx.bom.element.Attribute.get(el,SSSS_25);

if(index>=1){return true;
}var focusable=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(index>=0&&focusable[el.tagName]){return true;
}return false;
},__gS:function(el){while(el&&el.nodeType===1){if(el.getAttribute(SSSS_30)==SSSS_4){return null;
}
if(this.__gR(el)){return el;
}el=el.parentNode;
}return this._body;
},__gT:function(el){var orig=el;

while(el&&el.nodeType===1){if(el.getAttribute(SSSS_31)==SSSS_4){return null;
}el=el.parentNode;
}return orig;
},__gU:function(node){while(node&&node.nodeType===1){var attr=node.getAttribute(SSSS_24);

if(attr!=null){return attr===SSSS_4;
}node=node.parentNode;
}return true;
},_applyActive:function(value,old){if(old){this.__gF(old,value,SSSS_18,true);
}
if(value){this.__gF(value,old,SSSS_27,true);
}},_applyFocus:function(value,old){if(old){this.__gF(old,value,SSSS_29,true);
}
if(value){this.__gF(value,old,SSSS_23,true);
}if(old){this.__gF(old,value,SSSS_1,false);
}
if(value){this.__gF(value,old,SSSS_2,false);
}}},destruct:function(){this._stopObserver();
this._manager=this._window=this._document=this._root=this._body=this.__BK=null;
},defer:function(statics){qx.event.Registration.addHandler(statics);
var focusable=statics.FOCUSABLE_ELEMENTS;

for(var entry in focusable){focusable[entry.toUpperCase()]=1;
}}});
})();
(function(){var SSSS_0="qx.event.type.Focus";
qx.Class.define(SSSS_0,{extend:qx.event.type.Event,members:{init:function(target,relatedTarget,canBubble){arguments.callee.base.call(this,canBubble,false);
this._target=target;
this._relatedTarget=relatedTarget;
return this;
}}});
})();
(function(){var SSSS_0="",SSSS_1="qx.client",SSSS_2="readOnly",SSSS_3="accessKey",SSSS_4="qx.bom.element.Attribute",SSSS_5="rowSpan",SSSS_6="vAlign",SSSS_7="className",SSSS_8="textContent",SSSS_9="'",SSSS_10="htmlFor",SSSS_11="longDesc",SSSS_12="cellSpacing",SSSS_13="frameBorder",SSSS_14="='",SSSS_15="useMap",SSSS_16="innerText",SSSS_17="innerHTML",SSSS_18="tabIndex",SSSS_19="dateTime",SSSS_20="maxLength",SSSS_21="mshtml",SSSS_22="cellPadding",SSSS_23="colSpan";
qx.Class.define(SSSS_4,{statics:{__gV:{names:{"class":SSSS_7,"for":SSSS_10,html:SSSS_17,text:qx.core.Variant.isSet(SSSS_1,SSSS_21)?SSSS_16:SSSS_8,colspan:SSSS_23,rowspan:SSSS_5,valign:SSSS_6,datetime:SSSS_19,accesskey:SSSS_3,tabindex:SSSS_18,maxlength:SSSS_20,readonly:SSSS_2,longdesc:SSSS_11,cellpadding:SSSS_22,cellspacing:SSSS_12,frameborder:SSSS_13,usemap:SSSS_15},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readonly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:SSSS_0,maxLength:10000000,className:SSSS_0,innerHTML:SSSS_0,innerText:SSSS_0,textContent:SSSS_0,htmlFor:SSSS_0,tabIndex:0},original:{href:1,src:1,type:1}},compile:function(map){var html=[];
var runtime=this.__gV.runtime;

for(var key in map){if(!runtime[key]){html.push(key,SSSS_14,map[key],SSSS_9);
}}return html.join(SSSS_0);
},get:qx.core.Variant.select(SSSS_1,{"mshtml":function(element,name){var hints=this.__gV;
var value;
name=hints.names[name]||name;
if(hints.original[name]){value=element.getAttribute(name,2);
}else if(hints.property[name]){if(hints.propertyDefault[name]&&value==hints.propertyDefault[name]){return null;
}value=element[name];
}else{value=element.getAttribute(name);
}if(hints.bools[name]){return !!value;
}return value;
},"default":function(element,name){var hints=this.__gV;
var value;
name=hints.names[name]||name;
if(hints.property[name]){if(hints.propertyDefault[name]&&value==hints.propertyDefault[name]){return null;
}value=element[name];

if(value==null){value=element.getAttribute(name);
}}else{value=element.getAttribute(name);
}if(hints.bools[name]){return !!value;
}return value;
}}),set:function(element,name,value){var hints=this.__gV;
name=hints.names[name]||name;
if(hints.bools[name]){value=!!value;
}if(hints.property[name]){if(value==null){value=hints.propertyDefault[name];

if(value===undefined){value=null;
}}element[name]=value;
}else{if(value===true){element.setAttribute(name,name);
}else if(value===false||value===null){element.removeAttribute(name);
}else{element.setAttribute(name,value);
}}},reset:function(element,name){this.set(element,name,null);
}}});
})();
(function(){var SSSS_0="qx.client",SSSS_1="left",SSSS_2="right",SSSS_3="middle",SSSS_4="dblclick",SSSS_5="click",SSSS_6="none",SSSS_7="contextmenu",SSSS_8="qx.event.type.Mouse",SSSS_9="Chrome";
qx.Class.define(SSSS_8,{extend:qx.event.type.Dom,members:{init:function(nativeEvent,target,relatedTarget,canBubble,cancelable){arguments.callee.base.call(this,nativeEvent,target,relatedTarget,canBubble,cancelable);

if(!relatedTarget){this._relatedTarget=qx.bom.Event.getRelatedTarget(nativeEvent);
}return this;
},_cloneNativeEvent:function(nativeEvent,clone){var clone=arguments.callee.base.call(this,nativeEvent,clone);
clone.button=nativeEvent.button;
clone.clientX=nativeEvent.clientX;
clone.clientY=nativeEvent.clientY;
clone.pageX=nativeEvent.pageX;
clone.pageY=nativeEvent.pageY;
clone.screenX=nativeEvent.screenX;
clone.screenY=nativeEvent.screenY;
clone.wheelDelta=nativeEvent.wheelDelta;
clone.detail=nativeEvent.detail;
clone.srcElement=nativeEvent.srcElement;
return clone;
},__gW:qx.core.Variant.select(SSSS_0,{"mshtml":{1:SSSS_1,2:SSSS_2,4:SSSS_3},"default":{0:SSSS_1,2:SSSS_2,1:SSSS_3}}),stop:function(){this.stopPropagation();
},getButton:function(){switch(this._type){case SSSS_5:case SSSS_4:return SSSS_1;
case SSSS_7:return SSSS_2;
default:return this.__gW[this._native.button]||SSSS_6;
}},isLeftPressed:function(){return this.getButton()===SSSS_1;
},isMiddlePressed:function(){return this.getButton()===SSSS_3;
},isRightPressed:function(){return this.getButton()===SSSS_2;
},getRelatedTarget:function(){return this._relatedTarget;
},getViewportLeft:function(){return this._native.clientX;
},getViewportTop:function(){return this._native.clientY;
},getDocumentLeft:qx.core.Variant.select(SSSS_0,{"mshtml":function(){var win=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(win);
},"default":function(){return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(SSSS_0,{"mshtml":function(){var win=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(win);
},"default":function(){return this._native.pageY;
}}),getScreenLeft:function(){return this._native.screenX;
},getScreenTop:function(){return this._native.screenY;
},getWheelDelta:qx.core.Variant.select(SSSS_0,{"default":function(){return -(this._native.wheelDelta/40);
},"gecko":function(){return this._native.detail;
},"webkit":function(){if(window.navigator.userAgent.indexOf(SSSS_9)!==-1){return -(this._native.wheelDelta/120);
}else{return -(this._native.wheelDelta/40);
}}})}});
})();
(function(){var SSSS_0="qx.client",SSSS_1="qx.dom.Hierarchy",SSSS_2="previousSibling",SSSS_3="*",SSSS_4="nextSibling",SSSS_5="parentNode";
qx.Class.define(SSSS_1,{statics:{getNodeIndex:function(node){var index=0;

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
},contains:qx.core.Variant.select(SSSS_0,{"webkit|mshtml|opera":function(element,target){if(qx.dom.Node.isDocument(element)){var doc=qx.dom.Node.getDocument(target);
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
},getCommonParent:qx.core.Variant.select(SSSS_0,{"mshtml|opera":function(element1,element2){if(element1===element2){return element1;
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
}}),getAncestors:function(element){return this._recursivelyCollect(element,SSSS_5);
},getChildElements:function(element){element=element.firstChild;

if(!element){return [];
}var arr=this.getNextSiblings(element);

if(element.nodeType===1){arr.unshift(element);
}return arr;
},getDescendants:function(element){return qx.lang.Array.fromCollection(element.getElementsByTagName(SSSS_3));
},getFirstDescendant:function(element){element=element.firstChild;

while(element&&element.nodeType!=1){element=element.nextSibling;
}return element;
},getLastDescendant:function(element){element=element.lastChild;

while(element&&element.nodeType!=1){element=element.previousSibling;
}return element;
},getPreviousSiblings:function(element){return this._recursivelyCollect(element,SSSS_2);
},getNextSiblings:function(element){return this._recursivelyCollect(element,SSSS_4);
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
})();
(function(){var SSSS_0="qx.client",SSSS_1="qx.event.type.Drag";
qx.Class.define(SSSS_1,{extend:qx.event.type.Event,members:{init:function(cancelable,originalEvent){arguments.callee.base.call(this,true,cancelable);

if(originalEvent){this._native=originalEvent.getNativeEvent()||null;
this._originalTarget=originalEvent.getTarget()||null;
}else{this._native=null;
this._originalTarget=null;
}return this;
},clone:function(embryo){var clone=arguments.callee.base.call(this,embryo);
clone._native=this._native;
return clone;
},getDocumentLeft:qx.core.Variant.select(SSSS_0,{"mshtml":function(){if(this._native==null){return 0;
}var win=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(win);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(SSSS_0,{"mshtml":function(){if(this._native==null){return 0;
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
})();
(function(){var SSSS_0="losecapture",SSSS_1="qx.client",SSSS_2="blur",SSSS_3="focus",SSSS_4="click",SSSS_5="qx.event.dispatch.MouseCapture",SSSS_6="capture",SSSS_7="scroll";
qx.Class.define(SSSS_5,{extend:qx.event.dispatch.AbstractBubbling,construct:function(manager,registration){arguments.callee.base.call(this,manager);
this.__gX=manager.getWindow();
this.__gY=registration;
manager.addListener(this.__gX,SSSS_2,this.releaseCapture,this);
manager.addListener(this.__gX,SSSS_3,this.releaseCapture,this);
manager.addListener(this.__gX,SSSS_7,this.releaseCapture,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__gY:null,__ha:null,__hb:true,__gX:null,_getParent:function(target){return target.parentNode;
},canDispatchEvent:function(target,event,type){return (this.__ha&&this.__hc[type]);
},dispatchEvent:function(target,event,type){if(type==SSSS_4){event.stopPropagation();
this.releaseCapture();
return;
}
if(this.__hb||!qx.dom.Hierarchy.contains(this.__ha,target)){target=this.__ha;
}arguments.callee.base.call(this,target,event,type);
},__hc:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(element,containerCapture){var containerCapture=containerCapture!==false;

if(this.__ha===element&&this.__hb==containerCapture){return;
}
if(this.__ha){this.releaseCapture();
}this.nativeSetCapture(element,containerCapture);

if(this.hasNativeCapture){var self=this;
qx.bom.Event.addNativeListener(element,SSSS_0,function(){qx.bom.Event.removeNativeListener(element,SSSS_0,arguments.callee);
self.releaseCapture();
});
}this.__hb=containerCapture;
this.__ha=element;
this.__gY.fireEvent(element,SSSS_6,qx.event.type.Event,[true,false]);
},getCaptureElement:function(){return this.__ha;
},releaseCapture:function(){var element=this.__ha;

if(!element){return;
}this.__ha=null;
this.__gY.fireEvent(element,SSSS_0,qx.event.type.Event,[true,false]);
this.nativeReleaseCapture(element);
},hasNativeCapture:qx.bom.client.Engine.MSHTML,nativeSetCapture:qx.core.Variant.select(SSSS_1,{"mshtml":function(element,containerCapture){element.setCapture(containerCapture!==false);
},"default":qx.lang.Function.empty}),nativeReleaseCapture:qx.core.Variant.select(SSSS_1,{"mshtml":function(element){element.releaseCapture();
},"default":qx.lang.Function.empty})},destruct:function(){this.__ha=this.__gX=this.__gY=null;
},defer:function(statics){qx.event.Registration.addDispatcher(statics);
}});
})();
(function(){var SSSS_0="qx.client",SSSS_1="",SSSS_2="mshtml",SSSS_3="'",SSSS_4="SelectionLanguage",SSSS_5="qx.xml.Document",SSSS_6=" />",SSSS_7="MSXML2.DOMDocument.3.0",SSSS_8='<\?xml version="1.0" encoding="utf-8"?>\n<',SSSS_9="MSXML2.XMLHTTP.3.0",SSSS_10="MSXML2.XMLHTTP.6.0",SSSS_11=" xmlns='",SSSS_12="text/xml",SSSS_13="XPath",SSSS_14="MSXML2.DOMDocument.6.0",SSSS_15="HTML";
qx.Bootstrap.define(SSSS_5,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(elem){if(elem.nodeType===9){return elem.documentElement.nodeName!==SSSS_15;
}else if(elem.ownerDocument){return this.isXmlDocument(elem.ownerDocument);
}else{return false;
}},create:qx.core.Variant.select(SSSS_0,{"mshtml":function(namespaceUri,qualifiedName){var obj=new ActiveXObject(this.DOMDOC);
obj.setProperty(SSSS_4,SSSS_13);

if(qualifiedName){var str=SSSS_8;
str+=qualifiedName;

if(namespaceUri){str+=SSSS_11+namespaceUri+SSSS_3;
}str+=SSSS_6;
obj.loadXML(str);
}return obj;
},"default":function(namespaceUri,qualifiedName){return document.implementation.createDocument(namespaceUri||SSSS_1,qualifiedName||SSSS_1,null);
}}),fromString:qx.core.Variant.select(SSSS_0,{"mshtml":function(str){var dom=qx.xml.Document.create();
dom.loadXML(str);
return dom;
},"default":function(str){var parser=new DOMParser();
return parser.parseFromString(str,SSSS_12);
}})},defer:function(statics){if(qx.core.Variant.isSet(SSSS_0,SSSS_2)){var domDoc=[SSSS_14,SSSS_7];
var httpReq=[SSSS_10,SSSS_9];

for(var i=0,l=domDoc.length;i<l;i++){try{new ActiveXObject(domDoc[i]);
new ActiveXObject(httpReq[i]);
}catch(ex){continue;
}statics.DOMDOC=domDoc[i];
statics.XMLHTTP=httpReq[i];
break;
}}}});
})();
(function(){var SSSS_0="visible",SSSS_1="scroll",SSSS_2="borderBottomWidth",SSSS_3="borderTopWidth",SSSS_4="left",SSSS_5="borderLeftWidth",SSSS_6="bottom",SSSS_7="top",SSSS_8="right",SSSS_9="qx.bom.element.Scroll",SSSS_10="borderRightWidth";
qx.Class.define(SSSS_9,{statics:{intoViewX:function(element,stop,align){var parent=element.parentNode;
var doc=qx.dom.Node.getDocument(element);
var body=doc.body;
var parentLocation,parentLeft,parentRight;
var parentOuterWidth,parentClientWidth,parentScrollWidth;
var parentLeftBorder,parentRightBorder,parentScrollBarWidth;
var elementLocation,elementLeft,elementRight,elementWidth;
var leftOffset,rightOffset,scrollDiff;
var alignLeft=align===SSSS_4;
var alignRight=align===SSSS_8;
stop=stop?stop.parentNode:doc;
while(parent&&parent!=stop){if(parent.scrollWidth>parent.clientWidth&&(parent===body||qx.bom.element.Overflow.getY(parent)!=SSSS_0)){if(parent===body){parentLeft=parent.scrollLeft;
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
parentLeftBorder=parseInt(qx.bom.element.Style.get(parent,SSSS_5),10)||0;
parentRightBorder=parseInt(qx.bom.element.Style.get(parent,SSSS_10),10)||0;
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
if(qx.bom.client.Engine.GECKO){qx.event.Registration.fireNonBubblingEvent(parent,SSSS_1);
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
var alignTop=align===SSSS_7;
var alignBottom=align===SSSS_6;
stop=stop?stop.parentNode:doc;
while(parent&&parent!=stop){if(parent.scrollHeight>parent.clientHeight&&(parent===body||qx.bom.element.Overflow.getY(parent)!=SSSS_0)){if(parent===body){parentTop=parent.scrollTop;
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
parentTopBorder=parseInt(qx.bom.element.Style.get(parent,SSSS_3),10)||0;
parentBottomBorder=parseInt(qx.bom.element.Style.get(parent,SSSS_2),10)||0;
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
if(qx.bom.client.Engine.GECKO){qx.event.Registration.fireNonBubblingEvent(parent,SSSS_1);
}}
if(parent===body){break;
}parent=parent.parentNode;
}},intoView:function(element,stop,alignX,alignY){this.intoViewX(element,stop,alignX);
this.intoViewY(element,stop,alignY);
}}});
})();
(function(){var SSSS_0="borderTopWidth",SSSS_1="borderLeftWidth",SSSS_2="marginTop",SSSS_3="marginLeft",SSSS_4="scroll",SSSS_5="qx.client",SSSS_6="border-box",SSSS_7="borderBottomWidth",SSSS_8="borderRightWidth",SSSS_9="auto",SSSS_10="padding",SSSS_11="qx.bom.element.Location",SSSS_12="paddingLeft",SSSS_13="static",SSSS_14="marginBottom",SSSS_15="visible",SSSS_16="BODY",SSSS_17="paddingBottom",SSSS_18="paddingTop",SSSS_19="marginRight",SSSS_20="position",SSSS_21="margin",SSSS_22="overflow",SSSS_23="paddingRight",SSSS_24="border";
qx.Class.define(SSSS_11,{statics:{__hd:function(elem,style){return qx.bom.element.Style.get(elem,style,qx.bom.element.Style.COMPUTED_MODE,false);
},__he:function(elem,style){return parseInt(qx.bom.element.Style.get(elem,style,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;
},__hf:function(elem){var left=0,top=0;
if(elem.getBoundingClientRect&&!qx.bom.client.Engine.OPERA){var win=qx.dom.Node.getWindow(elem);
left-=qx.bom.Viewport.getScrollLeft(win);
top-=qx.bom.Viewport.getScrollTop(win);
}else{var body=qx.dom.Node.getDocument(elem).body;
elem=elem.parentNode;
while(elem&&elem!=body){left+=elem.scrollLeft;
top+=elem.scrollTop;
elem=elem.parentNode;
}}return {left:left,top:top};
},__hg:qx.core.Variant.select(SSSS_5,{"mshtml":function(elem){var doc=qx.dom.Node.getDocument(elem);
var body=doc.body;
var left=0;
var top=0;
left-=body.clientLeft+doc.documentElement.clientLeft;
top-=body.clientTop+doc.documentElement.clientTop;

if(qx.bom.client.Feature.STANDARD_MODE){left+=this.__he(body,SSSS_1);
top+=this.__he(body,SSSS_0);
}return {left:left,top:top};
},"webkit":function(elem){var doc=qx.dom.Node.getDocument(elem);
var body=doc.body;
var left=body.offsetLeft;
var top=body.offsetTop;
if(qx.bom.client.Engine.VERSION<530.17){left+=this.__he(body,SSSS_1);
top+=this.__he(body,SSSS_0);
}return {left:left,top:top};
},"gecko":function(elem){var body=qx.dom.Node.getDocument(elem).body;
var left=body.offsetLeft;
var top=body.offsetTop;
if(qx.bom.client.Engine.VERSION<1.9){left+=this.__he(body,SSSS_3);
top+=this.__he(body,SSSS_2);
}if(qx.bom.element.BoxSizing.get(body)!==SSSS_6){left+=this.__he(body,SSSS_1);
top+=this.__he(body,SSSS_0);
}return {left:left,top:top};
},"default":function(elem){var body=qx.dom.Node.getDocument(elem).body;
var left=body.offsetLeft;
var top=body.offsetTop;
return {left:left,top:top};
}}),__hh:qx.core.Variant.select(SSSS_5,{"mshtml|webkit":function(elem){var doc=qx.dom.Node.getDocument(elem);
if(elem.getBoundingClientRect){var rect=elem.getBoundingClientRect();
var left=rect.left;
var top=rect.top;
}else{var left=elem.offsetLeft;
var top=elem.offsetTop;
elem=elem.offsetParent;
var body=doc.body;
while(elem&&elem!=body){left+=elem.offsetLeft;
top+=elem.offsetTop;
left+=this.__he(elem,SSSS_1);
top+=this.__he(elem,SSSS_0);
elem=elem.offsetParent;
}}return {left:left,top:top};
},"gecko":function(elem){if(elem.getBoundingClientRect){var rect=elem.getBoundingClientRect();
var left=Math.round(rect.left);
var top=Math.round(rect.top);
}else{var left=0;
var top=0;
var body=qx.dom.Node.getDocument(elem).body;
var box=qx.bom.element.BoxSizing;

if(box.get(elem)!==SSSS_6){left-=this.__he(elem,SSSS_1);
top-=this.__he(elem,SSSS_0);
}
while(elem&&elem!==body){left+=elem.offsetLeft;
top+=elem.offsetTop;
if(box.get(elem)!==SSSS_6){left+=this.__he(elem,SSSS_1);
top+=this.__he(elem,SSSS_0);
}if(elem.parentNode&&this.__hd(elem.parentNode,SSSS_22)!=SSSS_15){left+=this.__he(elem.parentNode,SSSS_1);
top+=this.__he(elem.parentNode,SSSS_0);
}elem=elem.offsetParent;
}}return {left:left,top:top};
},"default":function(elem){var left=0;
var top=0;
var body=qx.dom.Node.getDocument(elem).body;
while(elem&&elem!==body){left+=elem.offsetLeft;
top+=elem.offsetTop;
elem=elem.offsetParent;
}return {left:left,top:top};
}}),get:function(elem,mode){if(elem.tagName==SSSS_16){var location=this.__hi(elem);
var left=location.left;
var top=location.top;
}else{var body=this.__hg(elem);
var offset=this.__hh(elem);
var scroll=this.__hf(elem);
var left=offset.left+body.left-scroll.left;
var top=offset.top+body.top-scroll.top;
}var right=left+elem.offsetWidth;
var bottom=top+elem.offsetHeight;

if(mode){if(mode==SSSS_10||mode==SSSS_4){var overX=qx.bom.element.Overflow.getX(elem);

if(overX==SSSS_4||overX==SSSS_9){right+=elem.scrollWidth-elem.offsetWidth+this.__he(elem,SSSS_1)+this.__he(elem,SSSS_8);
}var overY=qx.bom.element.Overflow.getY(elem);

if(overY==SSSS_4||overY==SSSS_9){bottom+=elem.scrollHeight-elem.offsetHeight+this.__he(elem,SSSS_0)+this.__he(elem,SSSS_7);
}}
switch(mode){case SSSS_10:left+=this.__he(elem,SSSS_12);
top+=this.__he(elem,SSSS_18);
right-=this.__he(elem,SSSS_23);
bottom-=this.__he(elem,SSSS_17);
case SSSS_4:left-=elem.scrollLeft;
top-=elem.scrollTop;
right-=elem.scrollLeft;
bottom-=elem.scrollTop;
case SSSS_24:left+=this.__he(elem,SSSS_1);
top+=this.__he(elem,SSSS_0);
right-=this.__he(elem,SSSS_8);
bottom-=this.__he(elem,SSSS_7);
break;
case SSSS_21:left-=this.__he(elem,SSSS_3);
top-=this.__he(elem,SSSS_2);
right+=this.__he(elem,SSSS_19);
bottom+=this.__he(elem,SSSS_14);
break;
}}return {left:left,top:top,right:right,bottom:bottom};
},__hi:qx.core.Variant.select(SSSS_5,{"default":function(body){var top=body.offsetTop+this.__he(body,SSSS_2);
var left=body.offsetLeft+this.__he(body,SSSS_3);
return {left:left,top:top};
},"mshtml":function(body){var top=body.offsetTop;
var left=body.offsetLeft;

if(!((qx.bom.client.Engine.VERSION<8||qx.bom.client.Engine.DOCUMENT_MODE<8)&&!qx.bom.client.Feature.QUIRKS_MODE)){top+=this.__he(body,SSSS_2);
left+=this.__he(body,SSSS_3);
}return {left:left,top:top};
},"gecko":function(body){var top=body.offsetTop+this.__he(body,SSSS_2)+this.__he(body,SSSS_1);
var left=body.offsetLeft+this.__he(body,SSSS_3)+this.__he(body,SSSS_0);
return {left:left,top:top};
}}),getLeft:function(elem,mode){return this.get(elem,mode).left;
},getTop:function(elem,mode){return this.get(elem,mode).top;
},getRight:function(elem,mode){return this.get(elem,mode).right;
},getBottom:function(elem,mode){return this.get(elem,mode).bottom;
},getRelative:function(elem1,elem2,mode1,mode2){var loc1=this.get(elem1,mode1);
var loc2=this.get(elem2,mode2);
return {left:loc1.left-loc2.left,top:loc1.top-loc2.top,right:loc1.right-loc2.right,bottom:loc1.bottom-loc2.bottom};
},getPosition:function(elem){return this.getRelative(elem,this.getOffsetParent(elem));
},getOffsetParent:function(element){var offsetParent=element.offsetParent||document.body;
var Style=qx.bom.element.Style;

while(offsetParent&&(!/^body|html$/i.test(offsetParent.tagName)&&Style.get(offsetParent,SSSS_20)===SSSS_13)){offsetParent=offsetParent.offsetParent;
}return offsetParent;
}}});
})();
(function(){var SSSS_0="textarea",SSSS_1="input",SSSS_2="qx.client",SSSS_3="character",SSSS_4="qx.bom.Selection",SSSS_5="#text",SSSS_6="EndToEnd",SSSS_7="button",SSSS_8="body";
qx.Class.define(SSSS_4,{statics:{getSelectionObject:qx.core.Variant.select(SSSS_2,{"mshtml":function(documentNode){return documentNode.selection;
},"default":function(documentNode){return qx.dom.Node.getWindow(documentNode).getSelection();
}}),get:qx.core.Variant.select(SSSS_2,{"mshtml":function(node){var rng=qx.bom.Range.get(qx.dom.Node.getDocument(node));
return rng.text;
},"default":function(node){if(qx.dom.Node.isElement(node)&&(node.nodeName.toLowerCase()==SSSS_1||node.nodeName.toLowerCase()==SSSS_0)){return node.value.substring(node.selectionStart,node.selectionEnd);
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(node)).toString();
}return null;
}}),getLength:qx.core.Variant.select(SSSS_2,{"mshtml":function(node){var selectedValue=qx.bom.Selection.get(node);
var split=qx.util.StringSplit.split(selectedValue,/\r\n/);
return selectedValue.length-(split.length-1);
},"opera":function(node){var selectedValue,selectedLength,split;

if(qx.dom.Node.isElement(node)&&(node.nodeName.toLowerCase()==SSSS_1||node.nodeName.toLowerCase()==SSSS_0)){var start=node.selectionStart;
var end=node.selectionEnd;
selectedValue=node.value.substring(start,end);
selectedLength=end-start;
}else{selectedValue=qx.bom.Selection.get(node);
selectedLength=selectedValue.length;
}split=qx.util.StringSplit.split(selectedValue,/\r\n/);
return selectedLength-(split.length-1);
},"default":function(node){if(qx.dom.Node.isElement(node)&&(node.nodeName.toLowerCase()==SSSS_1||node.nodeName.toLowerCase()==SSSS_0)){return node.selectionEnd-node.selectionStart;
}else{return qx.bom.Selection.get(node).length;
}return null;
}}),set:qx.core.Variant.select(SSSS_2,{"mshtml":function(node,start,end){var rng;
if(qx.dom.Node.isDocument(node)){node=node.body;
}
if(qx.dom.Node.isElement(node)||qx.dom.Node.isText(node)){switch(node.nodeName.toLowerCase()){case SSSS_1:case SSSS_0:case SSSS_7:if(end===undefined){end=node.value.length;
}
if(start>=0&&start<=node.value.length&&end>=0&&end<=node.value.length){rng=qx.bom.Range.get(node);
rng.collapse(true);
rng.moveStart(SSSS_3,start);
rng.moveEnd(SSSS_3,end-start);
rng.select();
return true;
}break;
case SSSS_5:if(end===undefined){end=node.nodeValue.length;
}
if(start>=0&&start<=node.nodeValue.length&&end>=0&&end<=node.nodeValue.length){rng=qx.bom.Range.get(qx.dom.Node.getBodyElement(node));
rng.moveToElementText(node.parentNode);
rng.collapse(true);
rng.moveStart(SSSS_3,start);
rng.moveEnd(SSSS_3,end-start);
rng.select();
return true;
}break;
default:if(end===undefined){end=node.childNodes.length-1;
}if(node.childNodes[start]&&node.childNodes[end]){rng=qx.bom.Range.get(qx.dom.Node.getBodyElement(node));
rng.moveToElementText(node.childNodes[start]);
rng.collapse(true);
var newRng=qx.bom.Range.get(qx.dom.Node.getBodyElement(node));
newRng.moveToElementText(node.childNodes[end]);
rng.setEndPoint(SSSS_6,newRng);
rng.select();
return true;
}}}return false;
},"default":function(node,start,end){var nodeName=node.nodeName.toLowerCase();

if(qx.dom.Node.isElement(node)&&(nodeName==SSSS_1||nodeName==SSSS_0)){if(end===undefined){end=node.value.length;
}if(start>=0&&start<=node.value.length&&end>=0&&end<=node.value.length){node.focus();
node.select();
node.setSelectionRange(start,end);
return true;
}}else{var validBoundaries=false;
var sel=qx.dom.Node.getWindow(node).getSelection();
var rng=qx.bom.Range.get(node);
if(qx.dom.Node.isText(node)){if(end===undefined){end=node.length;
}
if(start>=0&&start<node.length&&end>=0&&end<=node.length){validBoundaries=true;
}}else if(qx.dom.Node.isElement(node)){if(end===undefined){end=node.childNodes.length-1;
}
if(start>=0&&node.childNodes[start]&&end>=0&&node.childNodes[end]){validBoundaries=true;
}}else if(qx.dom.Node.isDocument(node)){node=node.body;

if(end===undefined){end=node.childNodes.length-1;
}
if(start>=0&&node.childNodes[start]&&end>=0&&node.childNodes[end]){validBoundaries=true;
}}
if(validBoundaries){if(!sel.isCollapsed){sel.collapseToStart();
}rng.setStart(node,start);
if(qx.dom.Node.isText(node)){rng.setEnd(node,end);
}else{rng.setEndAfter(node.childNodes[end]);
}if(sel.rangeCount>0){sel.removeAllRanges();
}sel.addRange(rng);
return true;
}}return false;
}}),setAll:function(node){return qx.bom.Selection.set(node,0);
},clear:qx.core.Variant.select(SSSS_2,{"mshtml":function(node){var sel=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(node));
var rng=qx.bom.Range.get(node);
var parent=rng.parentElement();
var documentRange=qx.bom.Range.get(qx.dom.Node.getDocument(node));
if(parent==documentRange.parentElement()&&parent==node){sel.empty();
}},"default":function(node){var sel=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(node));
var nodeName=node.nodeName.toLowerCase();
if(qx.dom.Node.isElement(node)&&(nodeName==SSSS_1||nodeName==SSSS_0)){node.setSelectionRange(0,0);
qx.bom.Element.blur(node);
}else if(qx.dom.Node.isDocument(node)||nodeName==SSSS_8){sel.collapse(node.body?node.body:node,0);
}else{var rng=qx.bom.Range.get(node);

if(!rng.collapsed){var compareNode;
var commonAncestor=rng.commonAncestorContainer;
if(qx.dom.Node.isElement(node)&&qx.dom.Node.isText(commonAncestor)){compareNode=commonAncestor.parentNode;
}else{compareNode=commonAncestor;
}
if(compareNode==node){sel.collapse(node,0);
}}}}})}});
})();
(function(){var SSSS_0="button",SSSS_1="qx.bom.Range",SSSS_2="text",SSSS_3="password",SSSS_4="file",SSSS_5="submit",SSSS_6="reset",SSSS_7="textarea",SSSS_8="input",SSSS_9="hidden",SSSS_10="qx.client",SSSS_11="body";
qx.Class.define(SSSS_1,{statics:{get:qx.core.Variant.select(SSSS_10,{"mshtml":function(node){if(qx.dom.Node.isElement(node)){switch(node.nodeName.toLowerCase()){case SSSS_8:switch(node.type){case SSSS_2:case SSSS_3:case SSSS_9:case SSSS_0:case SSSS_6:case SSSS_4:case SSSS_5:return node.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(node)).createRange();
}break;
case SSSS_7:case SSSS_11:case SSSS_0:return node.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(node)).createRange();
}}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(node)).createRange();
}},"default":function(node){var doc=qx.dom.Node.getDocument(node);
var sel=qx.bom.Selection.getSelectionObject(doc);

if(sel.rangeCount>0){return sel.getRangeAt(0);
}else{return doc.createRange();
}}})}});
})();
(function(){var SSSS_0="",SSSS_1="g",SSSS_2="$",SSSS_3="qx.util.StringSplit",SSSS_4="\\$&",SSSS_5="^";
qx.Bootstrap.define(SSSS_3,{statics:{split:function(string,separator,limit){var flags=SSSS_0;
if(separator===undefined){return [string.toString()];
}else if(separator===null||separator.constructor!==RegExp){separator=new RegExp(String(separator).replace(/[.*+?^${}()|[\]\/\\]/g,SSSS_4),SSSS_1);
}else{flags=separator.toString().replace(/^[\S\s]+\//,SSSS_0);

if(!separator.global){separator=new RegExp(separator.source,SSSS_1+flags);
}}var separator2=new RegExp(SSSS_5+separator.source+SSSS_2,flags);
if(limit===undefined||+limit<0){limit=false;
}else{limit=Math.floor(+limit);

if(!limit){return [];
}}var match,output=[],lastLastIndex=0,i=0;

while((limit?i++<=limit:true)&&(match=separator.exec(string))){if((match[0].length===0)&&(separator.lastIndex>match.index)){separator.lastIndex--;
}
if(separator.lastIndex>lastLastIndex){if(match.length>1){match[0].replace(separator2,function(){for(var j=1;j<arguments.length-2;j++){if(arguments[j]===undefined){match[j]=undefined;
}}});
}output=output.concat(string.substring(lastLastIndex,match.index),(match.index===string.length?[]:match.slice(1)));
lastLastIndex=separator.lastIndex;
}
if(match[0].length===0){separator.lastIndex++;
}}return (lastLastIndex===string.length)?(separator.test(SSSS_0)?output:output.concat(SSSS_0)):(limit?output:output.concat(string.substring(lastLastIndex)));
}}});
})();
(function(){var SSSS_0="qx.ui.core.queue.Widget",SSSS_1="widget";
qx.Class.define(SSSS_0,{statics:{__hj:{},remove:function(widget){delete this.__hj[widget.$$hash];
},add:function(widget){var queue=this.__hj;

if(queue[widget.$$hash]){return;
}queue[widget.$$hash]=widget;
qx.ui.core.queue.Manager.scheduleFlush(SSSS_1);
},flush:function(){var queue=this.__hj;
var obj;

for(var hash in queue){obj=queue[hash];
delete queue[hash];
obj.syncWidget();
}for(var hash in queue){return;
}this.__hj={};
}}});
})();
(function(){var SSSS_0="qx.ui.core.queue.Visibility",SSSS_1="visibility";
qx.Class.define(SSSS_0,{statics:{__hk:{},__hl:{},remove:function(widget){var hash=widget.$$hash;
delete this.__hl[hash];
delete this.__hk[hash];
},isVisible:function(widget){return this.__hl[widget.$$hash]||false;
},__hm:function(widget){var data=this.__hl;
var hash=widget.$$hash;
var visible;
if(widget.isExcluded()){visible=false;
}else{var parent=widget.$$parent;

if(parent){visible=this.__hm(parent);
}else{visible=widget.isRootWidget();
}}return data[hash]=visible;
},add:function(widget){var queue=this.__hk;

if(queue[widget.$$hash]){return;
}queue[widget.$$hash]=widget;
qx.ui.core.queue.Manager.scheduleFlush(SSSS_1);
},flush:function(){var queue=this.__hk;
var data=this.__hl;
for(var hash in queue){if(data[hash]!=null){queue[hash].addChildrenToQueue(queue);
}}var oldData={};

for(var hash in queue){oldData[hash]=data[hash];
data[hash]=null;
}for(var hash in queue){var widget=queue[hash];
delete queue[hash];
if(data[hash]==null){this.__hm(widget);
}if(data[hash]&&data[hash]!=oldData[hash]){widget.checkAppearanceNeeds();
}}this.__hk={};
}}});
})();
(function(){var SSSS_0="appearance",SSSS_1="qx.ui.core.queue.Appearance";
qx.Class.define(SSSS_1,{statics:{__hn:{},remove:function(widget){delete this.__hn[widget.$$hash];
},add:function(widget){var queue=this.__hn;

if(queue[widget.$$hash]){return;
}queue[widget.$$hash]=widget;
qx.ui.core.queue.Manager.scheduleFlush(SSSS_0);
},has:function(widget){return !!this.__hn[widget.$$hash];
},flush:function(){var Visibility=qx.ui.core.queue.Visibility;
var queue=this.__hn;
var obj;

for(var hash in queue){obj=queue[hash];
delete queue[hash];
if(Visibility.isVisible(obj)){obj.syncAppearance();
}else{obj.$$stateChanges=true;
}}}}});
})();
(function(){var SSSS_0="dispose",SSSS_1="qx.ui.core.queue.Dispose";
qx.Class.define(SSSS_1,{statics:{__ho:{},add:function(widget){var queue=this.__ho;

if(queue[widget.$$hash]){return;
}queue[widget.$$hash]=widget;
qx.ui.core.queue.Manager.scheduleFlush(SSSS_0);
},flush:function(){var queue=this.__ho;

for(var hash in queue){var widget=queue[hash];
delete queue[hash];
widget.dispose();
}for(var hash in queue){return;
}this.__ho={};
}}});
})();
(function(){var SSSS_0="qx.html.Decorator",SSSS_1="absolute";
qx.Class.define(SSSS_0,{extend:qx.html.Element,construct:function(decorator,decoratorId){arguments.callee.base.call(this);
this.__hp=decorator;
this.__hq=decoratorId||decorator.toHashCode();
this.setStyles({position:SSSS_1,top:0,left:0});
this.useMarkup(decorator.getMarkup());
},members:{__hq:null,__hp:null,getId:function(){return this.__hq;
},getDecorator:function(){return this.__hp;
},resize:function(width,height){this.__hp.resize(this.getDomElement(),width,height);
},tint:function(color){this.__hp.tint(this.getDomElement(),color);
},getInsets:function(){return this.__hp.getInsets();
}},destruct:function(){this.__hp=null;
}});
})();
(function(){var SSSS_0="blur",SSSS_1="focus",SSSS_2="input",SSSS_3="load",SSSS_4="qx.ui.core.EventHandler",SSSS_5="activate";
qx.Class.define(SSSS_4,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){arguments.callee.base.call(this);
this.__hr=qx.event.Registration.getManager(window);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:false},members:{__hr:null,__hs:{focusin:1,focusout:1,focus:1,blur:1},__ht:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(target,type){return target instanceof qx.ui.core.Widget;
},_dispatchEvent:function(domEvent){var domTarget=domEvent.getTarget();
var widgetTarget=qx.ui.core.Widget.getWidgetByElement(domTarget);
var targetChanged=false;

while(widgetTarget&&widgetTarget.isAnonymous()){var targetChanged=true;
widgetTarget=widgetTarget.getLayoutParent();
}if(widgetTarget&&targetChanged&&domEvent.getType()==SSSS_5){widgetTarget.getContainerElement().activate();
}if(this.__hs[domEvent.getType()]){widgetTarget=widgetTarget&&widgetTarget.getFocusTarget();
if(!widgetTarget){return;
}}if(domEvent.getRelatedTarget){var domRelatedTarget=domEvent.getRelatedTarget();
var widgetRelatedTarget=qx.ui.core.Widget.getWidgetByElement(domRelatedTarget);

while(widgetRelatedTarget&&widgetRelatedTarget.isAnonymous()){widgetRelatedTarget=widgetRelatedTarget.getLayoutParent();
}
if(widgetRelatedTarget){if(this.__hs[domEvent.getType()]){widgetRelatedTarget=widgetRelatedTarget.getFocusTarget();
}if(widgetRelatedTarget===widgetTarget){return;
}}}var currentTarget=domEvent.getCurrentTarget();
var currentWidget=qx.ui.core.Widget.getWidgetByElement(currentTarget);

if(!currentWidget||currentWidget.isAnonymous()){return;
}if(this.__hs[domEvent.getType()]){currentWidget=currentWidget.getFocusTarget();
}var type=domEvent.getType();

if(!currentWidget||!(currentWidget.isEnabled()||this.__ht[type])){return;
}var capture=domEvent.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;
var listeners=this.__hr.getListeners(currentWidget,type,capture);

if(!listeners||listeners.length===0){return;
}var widgetEvent=qx.event.Pool.getInstance().getObject(domEvent.constructor);
domEvent.clone(widgetEvent);
widgetEvent.setTarget(widgetTarget);
widgetEvent.setRelatedTarget(widgetRelatedTarget||null);
widgetEvent.setCurrentTarget(currentWidget);
var orig=domEvent.getOriginalTarget();

if(orig){var widgetOriginalTarget=qx.ui.core.Widget.getWidgetByElement(orig);

while(widgetOriginalTarget&&widgetOriginalTarget.isAnonymous()){widgetOriginalTarget=widgetOriginalTarget.getLayoutParent();
}widgetEvent.setOriginalTarget(widgetOriginalTarget);
}else{widgetEvent.setOriginalTarget(domTarget);
}for(var i=0,l=listeners.length;i<l;i++){var context=listeners[i].context||currentWidget;
listeners[i].handler.call(context,widgetEvent);
}if(widgetEvent.getPropagationStopped()){domEvent.stopPropagation();
}
if(widgetEvent.getDefaultPrevented()){domEvent.preventDefault();
}qx.event.Pool.getInstance().poolObject(widgetEvent);
},registerEvent:function(target,type,capture){var elem;

if(type===SSSS_1||type===SSSS_0){elem=target.getFocusElement();
}else if(type===SSSS_3||type===SSSS_2){elem=target.getContentElement();
}else{elem=target.getContainerElement();
}
if(elem){elem.addListener(type,this._dispatchEvent,this,capture);
}},unregisterEvent:function(target,type,capture){var elem;

if(type===SSSS_1||type===SSSS_0){elem=target.getFocusElement();
}else if(type===SSSS_3||type===SSSS_2){elem=target.getContentElement();
}else{elem=target.getContainerElement();
}
if(elem){elem.removeListener(type,this._dispatchEvent,this,capture);
}}},destruct:function(){this.__hr=null;
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
})();
(function(){var SSSS_0="qx.bom.client.Locale",SSSS_1="-",SSSS_2="";
qx.Bootstrap.define(SSSS_0,{statics:{LOCALE:"",VARIANT:"",__hu:function(){var locale=(qx.bom.client.Engine.MSHTML?navigator.userLanguage:navigator.language).toLowerCase();
var variant=SSSS_2;
var index=locale.indexOf(SSSS_1);

if(index!=-1){variant=locale.substr(index+1);
locale=locale.substr(0,index);
}this.LOCALE=locale;
this.VARIANT=variant;
}},defer:function(statics){statics.__hu();
}});
})();
(function(){var SSSS_0='indexOf',SSSS_1='slice',SSSS_2='concat',SSSS_3='toLocaleLowerCase',SSSS_4="qx.type.BaseString",SSSS_5="",SSSS_6='match',SSSS_7='toLocaleUpperCase',SSSS_8='search',SSSS_9='replace',SSSS_10='toLowerCase',SSSS_11='charCodeAt',SSSS_12='split',SSSS_13='substring',SSSS_14='lastIndexOf',SSSS_15='substr',SSSS_16='toUpperCase',SSSS_17='charAt';
qx.Class.define(SSSS_4,{extend:Object,construct:function(txt){var txt=txt||SSSS_5;
this.__hv=txt;
this.length=txt.length;
},members:{$$isString:true,length:0,__hv:null,toString:function(){return this.__hv;
},charAt:null,valueOf:null,charCodeAt:null,concat:null,indexOf:null,lastIndexOf:null,match:null,replace:null,search:null,slice:null,split:null,substr:null,substring:null,toLowerCase:null,toUpperCase:null,toHashCode:function(){return qx.core.ObjectRegistry.toHashCode(this);
},toLocaleLowerCase:null,toLocaleUpperCase:null,base:function(args,varags){return qx.core.Object.prototype.base.apply(this,arguments);
}},defer:function(statics,members){{};
var mappedFunctions=[SSSS_17,SSSS_11,SSSS_2,SSSS_0,SSSS_14,SSSS_6,SSSS_9,SSSS_8,SSSS_1,SSSS_12,SSSS_15,SSSS_13,SSSS_10,SSSS_16,SSSS_3,SSSS_7];
members.valueOf=members.toString;

for(var i=0,l=mappedFunctions.length;i<l;i++){members[mappedFunctions[i]]=String.prototype[mappedFunctions[i]];
}}});
})();
(function(){var SSSS_0="qx.locale.LocalizedString";
qx.Class.define(SSSS_0,{extend:qx.type.BaseString,construct:function(translation,messageId,args){arguments.callee.base.call(this,translation);
this.__hw=messageId;
this.__hx=args;
},members:{__hw:null,__hx:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__hw,this.__hx);
}}});
})();
(function(){var SSSS_0="_",SSSS_1="",SSSS_2="qx.dynlocale",SSSS_3="on",SSSS_4="_applyLocale",SSSS_5="changeLocale",SSSS_6="C",SSSS_7="qx.locale.Manager",SSSS_8="String",SSSS_9="singleton";
qx.Class.define(SSSS_7,{type:SSSS_9,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__hy=qx.$$translations||{};
this.__hz=qx.$$locales||{};
var clazz=qx.bom.client.Locale;
var locale=clazz.LOCALE;
var variant=clazz.VARIANT;

if(variant!==SSSS_1){locale+=SSSS_0+variant;
}this.setLocale(locale||this.__hA);
},statics:{tr:function(messageId,varargs){var args=qx.lang.Array.fromArguments(arguments);
args.splice(0,1);
return qx.locale.Manager.getInstance().translate(messageId,args);
},trn:function(singularMessageId,pluralMessageId,count,varargs){var args=qx.lang.Array.fromArguments(arguments);
args.splice(0,3);
if(count!=1){return qx.locale.Manager.getInstance().translate(pluralMessageId,args);
}else{return qx.locale.Manager.getInstance().translate(singularMessageId,args);
}},trc:function(hint,messageId,varargs){var args=qx.lang.Array.fromArguments(arguments);
args.splice(0,2);
return qx.locale.Manager.getInstance().translate(messageId,args);
},marktr:function(messageId){return messageId;
}},properties:{locale:{check:SSSS_8,nullable:true,apply:SSSS_4,event:SSSS_5}},members:{__hA:SSSS_6,__hB:null,__hC:null,__hy:null,__hz:null,getLanguage:function(){return this.__hC;
},getTerritory:function(){return this.getLocale().split(SSSS_0)[1]||SSSS_1;
},getAvailableLocales:function(){var locales=[];

for(var locale in this.__hz){if(locale!=this.__hA){locales.push(locale);
}}return locales;
},__hD:function(locale){var language;
var pos=locale.indexOf(SSSS_0);

if(pos==-1){language=locale;
}else{language=locale.substring(0,pos);
}return language;
},_applyLocale:function(value,old){this.__hB=value;
this.__hC=this.__hD(value);
},addTranslation:function(languageCode,translationMap){var catalog=this.__hy;

if(catalog[languageCode]){for(var key in translationMap){catalog[languageCode][key]=translationMap[key];
}}else{catalog[languageCode]=translationMap;
}},addLocale:function(localeCode,translationMap){var catalog=this.__hz;

if(catalog[localeCode]){for(var key in translationMap){catalog[localeCode][key]=translationMap[key];
}}else{catalog[localeCode]=translationMap;
}},translate:function(messageId,args,locale){var txt;
var catalog=this.__hy;

if(!catalog){return messageId;
}
if(locale){var language=this.__hD(locale);
}else{locale=this.__hB;
language=this.__hC;
}
if(!txt&&catalog[locale]){txt=catalog[locale][messageId];
}
if(!txt&&catalog[language]){txt=catalog[language][messageId];
}
if(!txt&&catalog[this.__hA]){txt=catalog[this.__hA][messageId];
}
if(!txt){txt=messageId;
}
if(args.length>0){var translatedArgs=[];

for(var i=0;i<args.length;i++){var arg=args[i];

if(arg&&arg.translate){translatedArgs[i]=arg.translate();
}else{translatedArgs[i]=arg;
}}txt=qx.lang.String.format(txt,translatedArgs);
}
if(qx.core.Variant.isSet(SSSS_2,SSSS_3)){txt=new qx.locale.LocalizedString(txt,messageId,args);
}return txt;
},localize:function(messageId,args,locale){var txt;
var catalog=this.__hz;

if(!catalog){return messageId;
}
if(locale){var language=this.__hD(locale);
}else{locale=this.__hB;
language=this.__hC;
}
if(!txt&&catalog[locale]){txt=catalog[locale][messageId];
}
if(!txt&&catalog[language]){txt=catalog[language][messageId];
}
if(!txt&&catalog[this.__hA]){txt=catalog[this.__hA][messageId];
}
if(!txt){txt=messageId;
}
if(args.length>0){var translatedArgs=[];

for(var i=0;i<args.length;i++){var arg=args[i];

if(arg.translate){translatedArgs[i]=arg.translate();
}else{translatedArgs[i]=arg;
}}txt=qx.lang.String.format(txt,translatedArgs);
}
if(qx.core.Variant.isSet(SSSS_2,SSSS_3)){txt=new qx.locale.LocalizedString(txt,messageId,args);
}return txt;
}},destruct:function(){this.__hy=this.__hz=null;
}});
})();
(function(){var SSSS_0="source",SSSS_1="scale",SSSS_2="no-repeat",SSSS_3="mshtml",SSSS_4="qx.client",SSSS_5="qx.html.Image";
qx.Class.define(SSSS_5,{extend:qx.html.Element,members:{_applyProperty:function(name,value){arguments.callee.base.call(this,name,value);

if(name===SSSS_0){var elem=this.getDomElement();
var styles=this.getAllStyles();
var source=this._getProperty(SSSS_0);
var scale=this._getProperty(SSSS_1);
var repeat=scale?SSSS_1:SSSS_2;
qx.bom.element.Decoration.update(elem,source,repeat,styles);
}},_createDomElement:function(){var scale=this._getProperty(SSSS_1);
var repeat=scale?SSSS_1:SSSS_2;

if(qx.core.Variant.isSet(SSSS_4,SSSS_3)){var source=this._getProperty(SSSS_0);
this.setNodeName(qx.bom.element.Decoration.getTagName(repeat,source));
}else{this.setNodeName(qx.bom.element.Decoration.getTagName(repeat));
}return arguments.callee.base.call(this);
},_copyData:function(fromMarkup){return arguments.callee.base.call(this,true);
},setSource:function(value){this._setProperty(SSSS_0,value);
return this;
},getSource:function(){return this._getProperty(SSSS_0);
},resetSource:function(){this._removeProperty(SSSS_0);
return this;
},setScale:function(value){this._setProperty(SSSS_1,value);
return this;
},getScale:function(){return this._getProperty(SSSS_1);
}}});
})();
(function(){var SSSS_0="nonScaled",SSSS_1="scaled",SSSS_2="alphaScaled",SSSS_3=".png",SSSS_4="replacement",SSSS_5="hidden",SSSS_6="div",SSSS_7="Boolean",SSSS_8="_applyScale",SSSS_9="px",SSSS_10="_applySource",SSSS_11="-disabled.$1",SSSS_12="img",SSSS_13="changeSource",SSSS_14="qx.client",SSSS_15="__hE",SSSS_16="String",SSSS_17="image",SSSS_18="qx.ui.basic.Image";
qx.Class.define(SSSS_18,{extend:qx.ui.core.Widget,construct:function(source){this.__hE={};
arguments.callee.base.call(this);

if(source){this.setSource(source);
}},properties:{source:{check:SSSS_16,init:null,nullable:true,event:SSSS_13,apply:SSSS_10,themeable:true},scale:{check:SSSS_7,init:false,themeable:true,apply:SSSS_8},appearance:{refine:true,init:SSSS_17},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},members:{__hF:null,__hG:null,__hH:null,__hE:null,getContentElement:function(){return this.__hL();
},_createContentElement:function(){return this.__hL();
},_getContentHint:function(){return {width:this.__hF||0,height:this.__hG||0};
},_applyEnabled:function(value,old){arguments.callee.base.call(this,value,old);

if(this.getSource()){this._styleSource();
}},_applySource:function(value){this._styleSource();
},_applyScale:function(value){this._styleSource();
},__hI:function(mode){this.__hH=mode;
},__hJ:function(){if(this.__hH==null){var source=this.getSource();
var isPng=false;

if(source!=null){isPng=qx.lang.String.endsWith(source,SSSS_3);
}
if(this.getScale()&&isPng&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){this.__hH=SSSS_2;
}else if(this.getScale()){this.__hH=SSSS_1;
}else{this.__hH=SSSS_0;
}}return this.__hH;
},__hK:function(mode){var scale;
var tagName;

if(mode==SSSS_2){scale=true;
tagName=SSSS_6;
}else if(mode==SSSS_0){scale=false;
tagName=SSSS_6;
}else{scale=true;
tagName=SSSS_12;
}var element=new qx.html.Image(tagName);
element.setScale(scale);
element.setStyles({"overflowX":SSSS_5,"overflowY":SSSS_5});
return element;
},__hL:function(){var mode=this.__hJ();

if(this.__hE[mode]==null){this.__hE[mode]=this.__hK(mode);
}return this.__hE[mode];
},_styleSource:function(){var source=qx.util.AliasManager.getInstance().resolve(this.getSource());

if(!source){this.getContentElement().resetSource();
return;
}this.__hM(source);
if(qx.util.ResourceManager.getInstance().has(source)){this.__hO(this.getContentElement(),source);
}else if(qx.io2.ImageLoader.isLoaded(source)){this.__hP(this.getContentElement(),source);
}else{this.__hQ(this.getContentElement(),source);
}},__hM:qx.core.Variant.select(SSSS_14,{"mshtml":function(source){var alphaImageLoader=qx.bom.element.Decoration.isAlphaImageLoaderEnabled();
var isPng=qx.lang.String.endsWith(source,SSSS_3);

if(alphaImageLoader&&isPng){if(this.getScale()&&this.__hJ()!=SSSS_2){this.__hI(SSSS_2);
}else if(!this.getScale()&&this.__hJ()!=SSSS_0){this.__hI(SSSS_0);
}}else{if(this.getScale()&&this.__hJ()!=SSSS_1){this.__hI(SSSS_1);
}else if(!this.getScale()&&this.__hJ()!=SSSS_0){this.__hI(SSSS_0);
}}this.__hN(this.__hL());
},"default":function(source){if(this.getScale()&&this.__hJ()!=SSSS_1){this.__hI(SSSS_1);
}else if(!this.getScale()&&this.__hJ(SSSS_0)){this.__hI(SSSS_0);
}this.__hN(this.__hL());
}}),__hN:function(elementToAdd){var container=this.getContainerElement();
var currentContentElement=container.getChild(0);

if(currentContentElement!=elementToAdd){if(currentContentElement!=null){var pixel=SSSS_9;
var styles={};
var innerSize=this.getInnerSize();

if(innerSize!=null){styles.width=innerSize.width+pixel;
styles.height=innerSize.height+pixel;
}var insets=this.getInsets();
styles.left=insets.left+pixel;
styles.top=insets.top+pixel;
elementToAdd.setStyles(styles,true);
elementToAdd.setSelectable(this.getSelectable());
}container.removeAt(0);
container.addAt(elementToAdd,0);
}},__hO:function(el,source){var ResourceManager=qx.util.ResourceManager.getInstance();
if(!this.getEnabled()){var disabled=source.replace(/\.([a-z]+)$/,SSSS_11);

if(ResourceManager.has(disabled)){source=disabled;
this.addState(SSSS_4);
}else{this.removeState(SSSS_4);
}}if(el.getSource()===source){return;
}el.setSource(source);
this.__hS(ResourceManager.getImageWidth(source),ResourceManager.getImageHeight(source));
},__hP:function(el,source){var ImageLoader=qx.io2.ImageLoader;
el.setSource(source);
var width=ImageLoader.getWidth(source);
var height=ImageLoader.getHeight(source);
this.__hS(width,height);
},__hQ:function(el,source){var self;
var ImageLoader=qx.io2.ImageLoader;
{};
if(!ImageLoader.isFailed(source)){ImageLoader.load(source,this.__hR,this);
}else{if(el!=null){el.resetSource();
}}},__hR:function(source,imageInfo){if(source!==qx.util.AliasManager.getInstance().resolve(this.getSource())){return;
}if(imageInfo.failed){this.warn("Image could not be loaded: "+source);
}this._styleSource();
},__hS:function(width,height){if(width!==this.__hF||height!==this.__hG){this.__hF=width;
this.__hG=height;
qx.ui.core.queue.Layout.add(this);
}}},destruct:function(){this._disposeMap(SSSS_15);
}});
})();
(function(){var SSSS_0="dragdrop-cursor",SSSS_1="_applyAction",SSSS_2="alias",SSSS_3="qx.ui.core.DragDropCursor",SSSS_4="move",SSSS_5="singleton",SSSS_6="copy";
qx.Class.define(SSSS_3,{extend:qx.ui.basic.Image,include:qx.ui.core.MPlacement,type:SSSS_5,construct:function(){arguments.callee.base.call(this);
this.setZIndex(1e8);
this.setDomMove(true);
var root=this.getApplicationRoot();
root.add(this,{left:-1000,top:-1000});
},properties:{appearance:{refine:true,init:SSSS_0},action:{check:[SSSS_2,SSSS_6,SSSS_4],apply:SSSS_1,nullable:true}},members:{_applyAction:function(value,old){if(old){this.removeState(old);
}
if(value){this.addState(value);
}}}});
})();
(function(){var SSSS_0="interval",SSSS_1="Number",SSSS_2="_applyTimeoutInterval",SSSS_3="qx.event.type.Event",SSSS_4="qx.event.Idle",SSSS_5="singleton";
qx.Class.define(SSSS_4,{extend:qx.core.Object,type:SSSS_5,construct:function(){arguments.callee.base.call(this);
var timer=new qx.event.Timer(this.getTimeoutInterval());
timer.addListener(SSSS_0,this._onInterval,this);
timer.start();
this.__hT=timer;
},events:{"interval":SSSS_3},properties:{timeoutInterval:{check:SSSS_1,init:100,apply:SSSS_2}},members:{__hT:null,_applyTimeoutInterval:function(value){this.__hT.setInterval(value);
},_onInterval:function(){this.fireEvent(SSSS_0);
}},destruct:function(){if(this.__hT){this.__hT.stop();
}this.__hT=null;
}});
})();
(function(){var SSSS_0="top",SSSS_1="right",SSSS_2="bottom",SSSS_3="left",SSSS_4="align-start",SSSS_5="qx.util.placement.AbstractAxis",SSSS_6="edge-start",SSSS_7="align-end",SSSS_8="edge-end",SSSS_9="-",SSSS_10="best-fit",SSSS_11="qx.util.placement.Placement",SSSS_12="keep-align",SSSS_13="direct",SSSS_14='__hU';
qx.Class.define(SSSS_11,{extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__hU=new qx.util.placement.DirectAxis();
},properties:{axisX:{check:SSSS_5},axisY:{check:SSSS_5},edge:{check:[SSSS_0,SSSS_1,SSSS_2,SSSS_3],init:SSSS_0},align:{check:[SSSS_0,SSSS_1,SSSS_2,SSSS_3],init:SSSS_1}},statics:{__hV:null,compute:function(size,area,target,offsets,position,modeX,modeY){this.__hV=this.__hV||new qx.util.placement.Placement();
var splitted=position.split(SSSS_9);
var edge=splitted[0];
var align=splitted[1];
this.__hV.set({axisX:this.__ia(modeX),axisY:this.__ia(modeY),edge:edge,align:align});
return this.__hV.compute(size,area,target,offsets);
},__hW:null,__hX:null,__hY:null,__ia:function(mode){switch(mode){case SSSS_13:this.__hW=this.__hW||new qx.util.placement.DirectAxis();
return this.__hW;
case SSSS_12:this.__hX=this.__hX||new qx.util.placement.KeepAlignAxis();
return this.__hX;
case SSSS_10:this.__hY=this.__hY||new qx.util.placement.BestFitAxis();
return this.__hY;
default:throw new Error("Invalid 'mode' argument!'");
}}},members:{__hU:null,compute:function(size,area,target,offsets){{};
var axisX=this.getAxisX()||this.__hU;
var left=axisX.computeStart(size.width,{start:target.left,end:target.right},{start:offsets.left,end:offsets.right},area.width,this.__ib());
var axisY=this.getAxisY()||this.__hU;
var top=axisY.computeStart(size.height,{start:target.top,end:target.bottom},{start:offsets.top,end:offsets.bottom},area.height,this.__ic());
return {left:left,top:top};
},__ib:function(){var edge=this.getEdge();
var align=this.getAlign();

if(edge==SSSS_3){return SSSS_6;
}else if(edge==SSSS_1){return SSSS_8;
}else if(align==SSSS_3){return SSSS_4;
}else if(align==SSSS_1){return SSSS_7;
}},__ic:function(){var edge=this.getEdge();
var align=this.getAlign();

if(edge==SSSS_0){return SSSS_6;
}else if(edge==SSSS_2){return SSSS_8;
}else if(align==SSSS_0){return SSSS_4;
}else if(align==SSSS_2){return SSSS_7;
}}},destruct:function(){this._disposeObjects(SSSS_14);
}});
})();
(function(){var SSSS_0="edge-start",SSSS_1="align-start",SSSS_2="align-end",SSSS_3="edge-end",SSSS_4="qx.util.placement.AbstractAxis";
qx.Class.define(SSSS_4,{extend:qx.core.Object,members:{computeStart:function(size,target,offsets,areaSize,position){throw new Error("abstract method call!");
},_moveToEdgeAndAlign:function(size,target,offsets,position){switch(position){case SSSS_0:return target.start-offsets.end-size;
case SSSS_3:return target.end+offsets.start;
case SSSS_1:return target.start+offsets.start;
case SSSS_2:return target.end-offsets.end-size;
}},_isInRange:function(start,size,areaSize){return start>=0&&start+size<=areaSize;
}}});
})();
(function(){var SSSS_0="qx.util.placement.DirectAxis";
qx.Class.define(SSSS_0,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(size,target,offsets,areaSize,position){return this._moveToEdgeAndAlign(size,target,offsets,position);
}}});
})();
(function(){var SSSS_0="qx.util.placement.KeepAlignAxis",SSSS_1="edge-start",SSSS_2="edge-end";
qx.Class.define(SSSS_0,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(size,target,offsets,areaSize,position){var start=this._moveToEdgeAndAlign(size,target,offsets,position);
var range1End,range2Start;

if(this._isInRange(start,size,areaSize)){return start;
}
if(position==SSSS_1||position==SSSS_2){range1End=target.start-offsets.end;
range2Start=target.end+offsets.start;
}else{range1End=target.end-offsets.end;
range2Start=target.start+offsets.start;
}
if(range1End>areaSize-range2Start){start=range1End-size;
}else{start=range2Start;
}return start;
}}});
})();
(function(){var SSSS_0="qx.util.placement.BestFitAxis";
qx.Class.define(SSSS_0,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(size,target,offsets,areaSize,position){var start=this._moveToEdgeAndAlign(size,target,offsets,position);

if(this._isInRange(start,size,areaSize)){return start;
}
if(start<0){start=Math.min(0,areaSize-size);
}
if(start+size>areaSize){start=Math.max(0,areaSize-size);
}return start;
}}});
})();
(function(){var SSSS_0="mousedown",SSSS_1="blur",SSSS_2="__id",SSSS_3="singleton",SSSS_4="qx.ui.popup.Manager";
qx.Class.define(SSSS_4,{type:SSSS_3,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__id={};
qx.event.Registration.addListener(document.documentElement,SSSS_0,this.__if,this,true);
qx.bom.Element.addListener(window,SSSS_1,this.hideAll,this);
},members:{__id:null,add:function(obj){{};
this.__id[obj.$$hash]=obj;
this.__ie();
},remove:function(obj){{};
var reg=this.__id;

if(reg){delete reg[obj.$$hash];
this.__ie();
}},hideAll:function(){var reg=this.__id;

if(reg){for(var hash in reg){reg[hash].exclude();
}}},__ie:function(){var min=1e7;
var reg=this.__id;

for(var hash in reg){reg[hash].setZIndex(min++);
}},__if:function(e){var target=qx.ui.core.Widget.getWidgetByElement(e.getTarget());
var reg=this.__id;

for(var hash in reg){var obj=reg[hash];

if(!obj.getAutoHide()||target==obj||qx.ui.core.Widget.contains(obj,target)){continue;
}obj.exclude();
}}},destruct:function(){qx.event.Registration.removeListener(document.documentElement,SSSS_0,this.__if,this,true);
this._disposeMap(SSSS_2);
}});
})();
(function(){var SSSS_0="abstract",SSSS_1="qx.ui.layout.Abstract";
qx.Class.define(SSSS_1,{type:SSSS_0,extend:qx.core.Object,members:{__ig:null,_invalidChildrenCache:null,__ih:null,invalidateLayoutCache:function(){this.__ig=null;
},renderLayout:function(availWidth,availHeight){this.warn("Missing renderLayout() implementation!");
},getSizeHint:function(){if(this.__ig){return this.__ig;
}return this.__ig=this._computeSizeHint();
},hasHeightForWidth:function(){return false;
},getHeightForWidth:function(width){this.warn("Missing getHeightForWidth() implementation!");
return null;
},_computeSizeHint:function(){return null;
},invalidateChildrenCache:function(){this._invalidChildrenCache=true;
},verifyLayoutProperty:null,_clearSeparators:function(){var widget=this.__ih;

if(widget instanceof qx.ui.core.LayoutItem){widget.clearSeparators();
}},_renderSeparator:function(separator,bounds){this.__ih.renderSeparator(separator,bounds);
},connectToWidget:function(widget){if(widget&&this.__ih){throw new Error("It is not possible to manually set the connected widget.");
}this.__ih=widget;
this.invalidateChildrenCache();
},_getWidget:function(){return this.__ih;
},_applyLayoutChange:function(){if(this.__ih){this.__ih.scheduleLayoutUpdate();
}},_getLayoutChildren:function(){return this.__ih.getLayoutChildren();
}},destruct:function(){this.__ih=this.__ig=null;
}});
})();
(function(){var SSSS_0="qx.ui.layout.Grow";
qx.Class.define(SSSS_0,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(availWidth,availHeight){var children=this._getLayoutChildren();
var child,size,width,height;
for(var i=0,l=children.length;i<l;i++){child=children[i];
size=child.getSizeHint();
width=availWidth;

if(width<size.minWidth){width=size.minWidth;
}else if(width>size.maxWidth){width=size.maxWidth;
}height=availHeight;

if(height<size.minHeight){height=size.minHeight;
}else if(height>size.maxHeight){height=size.maxHeight;
}child.renderLayout(0,0,width,height);
}},_computeSizeHint:function(){var children=this._getLayoutChildren();
var child,size;
var neededWidth=0,neededHeight=0;
var minWidth=0,minHeight=0;
var maxWidth=Infinity,maxHeight=Infinity;
for(var i=0,l=children.length;i<l;i++){child=children[i];
size=child.getSizeHint();
neededWidth=Math.max(neededWidth,size.width);
neededHeight=Math.max(neededHeight,size.height);
minWidth=Math.max(minWidth,size.minWidth);
minHeight=Math.max(minHeight,size.minHeight);
maxWidth=Math.min(maxWidth,size.maxWidth);
maxHeight=Math.min(maxHeight,size.maxHeight);
}return {width:neededWidth,height:neededHeight,minWidth:minWidth,minHeight:minHeight,maxWidth:maxWidth,maxHeight:maxHeight};
}}});
})();
(function(){var SSSS_0="label",SSSS_1="icon",SSSS_2="Boolean",SSSS_3="left",SSSS_4="both",SSSS_5="String",SSSS_6="_applyRich",SSSS_7="_applyIcon",SSSS_8="changeGap",SSSS_9="_applyShow",SSSS_10="right",SSSS_11="_applyCenter",SSSS_12="_applyIconPosition",SSSS_13="qx.ui.basic.Atom",SSSS_14="top",SSSS_15="changeShow",SSSS_16="bottom",SSSS_17="_applyLabel",SSSS_18="Integer",SSSS_19="_applyGap",SSSS_20="atom";
qx.Class.define(SSSS_13,{extend:qx.ui.core.Widget,construct:function(label,icon){{};
arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.Atom());

if(label!=null){this.setLabel(label);
}
if(icon!=null){this.setIcon(icon);
}},properties:{appearance:{refine:true,init:SSSS_20},label:{apply:SSSS_17,nullable:true,dispose:true,check:SSSS_5},rich:{check:SSSS_2,init:false,apply:SSSS_6},icon:{check:SSSS_5,apply:SSSS_7,nullable:true,themeable:true},gap:{check:SSSS_18,nullable:false,event:SSSS_8,apply:SSSS_19,themeable:true,init:4},show:{init:SSSS_4,check:[SSSS_4,SSSS_0,SSSS_1],themeable:true,inheritable:true,apply:SSSS_9,event:SSSS_15},iconPosition:{init:SSSS_3,check:[SSSS_14,SSSS_10,SSSS_16,SSSS_3],themeable:true,apply:SSSS_12},center:{init:false,check:SSSS_2,themeable:true,apply:SSSS_11}},members:{_createChildControlImpl:function(id){var control;

switch(id){case SSSS_0:control=new qx.ui.basic.Label(this.getLabel());
control.setAnonymous(true);
control.setRich(this.getRich());
this._add(control);

if(this.getLabel()==null||this.getShow()===SSSS_1){control.exclude();
}break;
case SSSS_1:control=new qx.ui.basic.Image(this.getIcon());
control.setAnonymous(true);
this._addAt(control,0);

if(this.getIcon()==null||this.getShow()===SSSS_0){control.exclude();
}break;
}return control||arguments.callee.base.call(this,id);
},_forwardStates:{focused:true,hovered:true},_handleLabel:function(){if(this.getLabel()==null||this.getShow()===SSSS_1){this._excludeChildControl(SSSS_0);
}else{this._showChildControl(SSSS_0);
}},_handleIcon:function(){if(this.getIcon()==null||this.getShow()===SSSS_0){this._excludeChildControl(SSSS_1);
}else{this._showChildControl(SSSS_1);
}},_applyLabel:function(value,old){var label=this.getChildControl(SSSS_0,true);

if(label){label.setValue(value);
}this._handleLabel();
},_applyRich:function(value,old){var label=this.getChildControl(SSSS_0,true);

if(label){label.setRich(value);
}},_applyIcon:function(value,old){var icon=this.getChildControl(SSSS_1,true);

if(icon){icon.setSource(value);
}this._handleIcon();
},_applyGap:function(value,old){this._getLayout().setGap(value);
},_applyShow:function(value,old){this._handleLabel();
this._handleIcon();
},_applyIconPosition:function(value,old){this._getLayout().setIconPosition(value);
},_applyCenter:function(value,old){this._getLayout().setCenter(value);
}}});
})();
(function(){var SSSS_0="bottom",SSSS_1="_applyLayoutChange",SSSS_2="top",SSSS_3="left",SSSS_4="right",SSSS_5="middle",SSSS_6="center",SSSS_7="qx.ui.layout.Atom",SSSS_8="Integer",SSSS_9="Boolean";
qx.Class.define(SSSS_7,{extend:qx.ui.layout.Abstract,properties:{gap:{check:SSSS_8,init:4,apply:SSSS_1},iconPosition:{check:[SSSS_3,SSSS_2,SSSS_4,SSSS_0],init:SSSS_3,apply:SSSS_1},center:{check:SSSS_9,init:false,apply:SSSS_1}},members:{verifyLayoutProperty:null,renderLayout:function(availWidth,availHeight){var Util=qx.ui.layout.Util;
var iconPosition=this.getIconPosition();
var children=this._getLayoutChildren();
var length=children.length;
var left,top,width,height;
var child,hint;
var gap=this.getGap();
var center=this.getCenter();
if(iconPosition===SSSS_0||iconPosition===SSSS_4){var start=length-1;
var end=-1;
var increment=-1;
}else{var start=0;
var end=length;
var increment=1;
}if(iconPosition==SSSS_2||iconPosition==SSSS_0){if(center){var allocatedHeight=0;

for(var i=start;i!=end;i+=increment){height=children[i].getSizeHint().height;

if(height>0){allocatedHeight+=height;

if(i!=start){allocatedHeight+=gap;
}}}top=Math.round((availHeight-allocatedHeight)/2);
}else{top=0;
}
for(var i=start;i!=end;i+=increment){child=children[i];
hint=child.getSizeHint();
width=Math.min(hint.maxWidth,Math.max(availWidth,hint.minWidth));
height=hint.height;
left=Util.computeHorizontalAlignOffset(SSSS_6,width,availWidth);
child.renderLayout(left,top,width,height);
if(height>0){top+=height+gap;
}}}else{var remainingWidth=availWidth;
var shrinkTarget=null;
var count=0;

for(var i=start;i!=end;i+=increment){child=children[i];
width=child.getSizeHint().width;

if(width>0){if(!shrinkTarget&&child instanceof qx.ui.basic.Label){shrinkTarget=child;
}else{remainingWidth-=width;
}count++;
}}
if(count>1){var gapSum=(count-1)*gap;
remainingWidth-=gapSum;
}
if(shrinkTarget){var hint=shrinkTarget.getSizeHint();
var shrinkTargetWidth=Math.max(hint.minWidth,Math.min(remainingWidth,hint.maxWidth));
remainingWidth-=shrinkTargetWidth;
}
if(center&&remainingWidth>0){left=Math.round(remainingWidth/2);
}else{left=0;
}
for(var i=start;i!=end;i+=increment){child=children[i];
hint=child.getSizeHint();
height=Math.min(hint.maxHeight,Math.max(availHeight,hint.minHeight));

if(child===shrinkTarget){width=shrinkTargetWidth;
}else{width=hint.width;
}top=Util.computeVerticalAlignOffset(SSSS_5,hint.height,availHeight);
child.renderLayout(left,top,width,height);
if(width>0){left+=width+gap;
}}}},_computeSizeHint:function(){var children=this._getLayoutChildren();
var length=children.length;
var hint,result;
if(length===1){var hint=children[0].getSizeHint();
result={width:hint.width,height:hint.height,minWidth:hint.minWidth,minHeight:hint.minHeight};
}else{var minWidth=0,width=0;
var minHeight=0,height=0;
var iconPosition=this.getIconPosition();
var gap=this.getGap();

if(iconPosition===SSSS_2||iconPosition===SSSS_0){var count=0;

for(var i=0;i<length;i++){hint=children[i].getSizeHint();
width=Math.max(width,hint.width);
minWidth=Math.max(minWidth,hint.minWidth);
if(hint.height>0){height+=hint.height;
minHeight+=hint.minHeight;
count++;
}}
if(count>1){var gapSum=(count-1)*gap;
height+=gapSum;
minHeight+=gapSum;
}}else{var count=0;

for(var i=0;i<length;i++){hint=children[i].getSizeHint();
height=Math.max(height,hint.height);
minHeight=Math.max(minHeight,hint.minHeight);
if(hint.width>0){width+=hint.width;
minWidth+=hint.minWidth;
count++;
}}
if(count>1){var gapSum=(count-1)*gap;
width+=gapSum;
minWidth+=gapSum;
}}result={minWidth:minWidth,width:width,minHeight:minHeight,height:height};
}return result;
}}});
})();
(function(){var SSSS_0="middle",SSSS_1="qx.ui.layout.Util",SSSS_2="left",SSSS_3="center",SSSS_4="top",SSSS_5="bottom",SSSS_6="right";
qx.Class.define(SSSS_1,{statics:{PERCENT_VALUE:/[0-9]+(?:\.[0-9]+)?%/,computeFlexOffsets:function(flexibles,avail,used){var child,key,flexSum,flexStep;
var grow=avail>used;
var remaining=Math.abs(avail-used);
var roundingOffset,currentOffset;
var result={};

for(key in flexibles){child=flexibles[key];
result[key]={potential:grow?child.max-child.value:child.value-child.min,flex:grow?child.flex:1/child.flex,offset:0};
}while(remaining!=0){flexStep=Infinity;
flexSum=0;

for(key in result){child=result[key];

if(child.potential>0){flexSum+=child.flex;
flexStep=Math.min(flexStep,child.potential/child.flex);
}}if(flexSum==0){break;
}flexStep=Math.min(remaining,flexStep*flexSum)/flexSum;
roundingOffset=0;

for(key in result){child=result[key];

if(child.potential>0){currentOffset=Math.min(remaining,child.potential,Math.ceil(flexStep*child.flex));
roundingOffset+=currentOffset-flexStep*child.flex;

if(roundingOffset>=1){roundingOffset-=1;
currentOffset-=1;
}child.potential-=currentOffset;

if(grow){child.offset+=currentOffset;
}else{child.offset-=currentOffset;
}remaining-=currentOffset;
}}}return result;
},computeHorizontalAlignOffset:function(align,width,availWidth,marginLeft,marginRight){if(marginLeft==null){marginLeft=0;
}
if(marginRight==null){marginRight=0;
}var value=0;

switch(align){case SSSS_2:value=marginLeft;
break;
case SSSS_6:value=availWidth-width-marginRight;
break;
case SSSS_3:value=Math.round((availWidth-width)/2);
if(value<marginLeft){value=marginLeft;
}else if(value<marginRight){value=Math.max(marginLeft,availWidth-width-marginRight);
}break;
}return value;
},computeVerticalAlignOffset:function(align,height,availHeight,marginTop,marginBottom){if(marginTop==null){marginTop=0;
}
if(marginBottom==null){marginBottom=0;
}var value=0;

switch(align){case SSSS_4:value=marginTop;
break;
case SSSS_5:value=availHeight-height-marginBottom;
break;
case SSSS_0:value=Math.round((availHeight-height)/2);
if(value<marginTop){value=marginTop;
}else if(value<marginBottom){value=Math.max(marginTop,availHeight-height-marginBottom);
}break;
}return value;
},collapseMargins:function(varargs){var max=0,min=0;

for(var i=0,l=arguments.length;i<l;i++){var value=arguments[i];

if(value<0){min=Math.min(min,value);
}else if(value>0){max=Math.max(max,value);
}}return max+min;
},computeHorizontalGaps:function(children,spacing,collapse){if(spacing==null){spacing=0;
}var gaps=0;

if(collapse){gaps+=children[0].getMarginLeft();

for(var i=1,l=children.length;i<l;i+=1){gaps+=this.collapseMargins(spacing,children[i-1].getMarginRight(),children[i].getMarginLeft());
}gaps+=children[l-1].getMarginRight();
}else{for(var i=1,l=children.length;i<l;i+=1){gaps+=children[i].getMarginLeft()+children[i].getMarginRight();
}gaps+=(spacing*(l-1));
}return gaps;
},computeVerticalGaps:function(children,spacing,collapse){if(spacing==null){spacing=0;
}var gaps=0;

if(collapse){gaps+=children[0].getMarginTop();

for(var i=1,l=children.length;i<l;i+=1){gaps+=this.collapseMargins(spacing,children[i-1].getMarginBottom(),children[i].getMarginTop());
}gaps+=children[l-1].getMarginBottom();
}else{for(var i=1,l=children.length;i<l;i+=1){gaps+=children[i].getMarginTop()+children[i].getMarginBottom();
}gaps+=(spacing*(l-1));
}return gaps;
},computeHorizontalSeparatorGaps:function(children,spacing,separator){var instance=qx.theme.manager.Decoration.getInstance().resolve(separator);
var insets=instance.getInsets();
var width=insets.left+insets.right;
var gaps=0;

for(var i=0,l=children.length;i<l;i++){var child=children[i];
gaps+=child.getMarginLeft()+child.getMarginRight();
}gaps+=(spacing+width+spacing)*(l-1);
return gaps;
},computeVerticalSeparatorGaps:function(children,spacing,separator){var instance=qx.theme.manager.Decoration.getInstance().resolve(separator);
var insets=instance.getInsets();
var height=insets.top+insets.bottom;
var gaps=0;

for(var i=0,l=children.length;i<l;i++){var child=children[i];
gaps+=child.getMarginTop()+child.getMarginBottom();
}gaps+=(spacing+height+spacing)*(l-1);
return gaps;
},arrangeIdeals:function(beginMin,beginIdeal,beginMax,endMin,endIdeal,endMax){if(beginIdeal<beginMin||endIdeal<endMin){if(beginIdeal<beginMin&&endIdeal<endMin){beginIdeal=beginMin;
endIdeal=endMin;
}else if(beginIdeal<beginMin){endIdeal-=(beginMin-beginIdeal);
beginIdeal=beginMin;
if(endIdeal<endMin){endIdeal=endMin;
}}else if(endIdeal<endMin){beginIdeal-=(endMin-endIdeal);
endIdeal=endMin;
if(beginIdeal<beginMin){beginIdeal=beginMin;
}}}
if(beginIdeal>beginMax||endIdeal>endMax){if(beginIdeal>beginMax&&endIdeal>endMax){beginIdeal=beginMax;
endIdeal=endMax;
}else if(beginIdeal>beginMax){endIdeal+=(beginIdeal-beginMax);
beginIdeal=beginMax;
if(endIdeal>endMax){endIdeal=endMax;
}}else if(endIdeal>endMax){beginIdeal+=(endIdeal-endMax);
endIdeal=endMax;
if(beginIdeal>beginMax){beginIdeal=beginMax;
}}}return {begin:beginIdeal,end:endIdeal};
}}});
})();
(function(){var SSSS_0="qx.event.type.Data",SSSS_1="qx.ui.form.IStringForm";
qx.Interface.define(SSSS_1,{events:{"changeValue":SSSS_0},members:{setValue:function(value){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var SSSS_0="qx.dynlocale",SSSS_1="text",SSSS_2="Boolean",SSSS_3="qx.client",SSSS_4="color",SSSS_5="userSelect",SSSS_6="changeLocale",SSSS_7="enabled",SSSS_8="none",SSSS_9="on",SSSS_10="_applyTextAlign",SSSS_11="qx.ui.core.Widget",SSSS_12="gecko",SSSS_13="changeTextAlign",SSSS_14="_applyWrap",SSSS_15="changeValue",SSSS_16="changeContent",SSSS_17="qx.ui.basic.Label",SSSS_18="A",SSSS_19="_applyValue",SSSS_20="center",SSSS_21="_applyBuddy",SSSS_22="String",SSSS_23="textAlign",SSSS_24="right",SSSS_25="changeRich",SSSS_26="_applyRich",SSSS_27="click",SSSS_28="label",SSSS_29="webkit",SSSS_30="left";
qx.Class.define(SSSS_17,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(value){arguments.callee.base.call(this);

if(value!=null){this.setValue(value);
}
if(qx.core.Variant.isSet(SSSS_0,SSSS_9)){qx.locale.Manager.getInstance().addListener(SSSS_6,this._onChangeLocale,this);
}},properties:{rich:{check:SSSS_2,init:false,event:SSSS_25,apply:SSSS_26},wrap:{check:SSSS_2,init:true,apply:SSSS_14},value:{check:SSSS_22,apply:SSSS_19,event:SSSS_15,nullable:true},buddy:{check:SSSS_11,apply:SSSS_21,nullable:true,init:null},textAlign:{check:[SSSS_30,SSSS_20,SSSS_24],nullable:true,themeable:true,apply:SSSS_10,event:SSSS_13},appearance:{refine:true,init:SSSS_28},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__ii:null,__ij:null,__ik:null,__il:null,_getContentHint:function(){if(this.__ij){this.__im=this.__in();
delete this.__ij;
}return {width:this.__im.width,height:this.__im.height};
},_hasHeightForWidth:function(){return this.getRich()&&this.getWrap();
},_applySelectable:function(value){if(qx.core.Variant.isSet(SSSS_3,SSSS_12)){if(value&&!this.isRich()){{};
return;
}}arguments.callee.base.call(this,value);
if(qx.core.Variant.isSet(SSSS_3,SSSS_29)){this.getContainerElement().setStyle(SSSS_5,value?SSSS_1:SSSS_8);
this.getContentElement().setStyle(SSSS_5,value?SSSS_1:SSSS_8);
}},_getContentHeightForWidth:function(width){if(!this.getRich()&&!this.getWrap()){return null;
}return this.__in(width).height;
},_createContentElement:function(){return new qx.html.Label;
},_applyTextAlign:function(value,old){this.getContentElement().setStyle(SSSS_23,value);
},_applyTextColor:function(value,old){if(value){this.getContentElement().setStyle(SSSS_4,qx.theme.manager.Color.getInstance().resolve(value));
}else{this.getContentElement().removeStyle(SSSS_4);
}},__im:{width:0,height:0},_applyFont:function(value,old){var styles;

if(value){this.__ii=qx.theme.manager.Font.getInstance().resolve(value);
styles=this.__ii.getStyles();
}else{this.__ii=null;
styles=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(styles);
this.__ij=true;
qx.ui.core.queue.Layout.add(this);
},__in:function(width){var Label=qx.bom.Label;
var font=this.getFont();
var styles=font?this.__ii.getStyles():qx.bom.Font.getDefaultStyles();
var content=this.getValue()||SSSS_18;
var rich=this.getRich();
return rich?Label.getHtmlSize(content,styles,width):Label.getTextSize(content,styles);
},_applyBuddy:function(value,old){if(old!=null){old.removeBinding(this.__ik);
this.__ik=null;
this.removeListenerById(this.__il);
this.__il=null;
}
if(value!=null){this.__ik=value.bind(SSSS_7,this,SSSS_7);
this.__il=this.addListener(SSSS_27,value.focus,value);
}},_applyRich:function(value){this.getContentElement().setRich(value);
this.__ij=true;
qx.ui.core.queue.Layout.add(this);
},_applyWrap:function(value,old){if(value&&!this.isRich()){{};
}},_onChangeLocale:qx.core.Variant.select(SSSS_0,{"on":function(e){var content=this.getValue();

if(content&&content.translate){this.setValue(content.translate());
}},"off":null}),_applyValue:function(value,old){this.getContentElement().setValue(value);
this.__ij=true;
qx.ui.core.queue.Layout.add(this);
this.fireDataEvent(SSSS_16,value,old);
}},destruct:function(){if(qx.core.Variant.isSet(SSSS_0,SSSS_9)){qx.locale.Manager.getInstance().removeListener(SSSS_6,this._onChangeLocale,this);
}if(this.__ik!=null){var buddy=this.getBuddy();

if(buddy!=null&&!buddy.isDisposed()){buddy.removeBinding(this.__ik);
}}this.__ii=this.__ik=null;
}});
})();
(function(){var SSSS_0="value",SSSS_1="Please use the getValue() method instead.",SSSS_2="qx.html.Label",SSSS_3="Please use the setValue() method instead.";
qx.Class.define(SSSS_2,{extend:qx.html.Element,members:{__io:null,_applyProperty:function(name,value){arguments.callee.base.call(this,name,value);

if(name==SSSS_0){var element=this.getDomElement();
qx.bom.Label.setValue(element,value);
}},_createDomElement:function(){var rich=this.__io;
var el=qx.bom.Label.create(this._content,rich);
return el;
},_copyData:function(fromMarkup){return arguments.callee.base.call(this,true);
},setRich:function(value){var element=this.getDomElement();

if(element){throw new Error("The label mode cannot be modified after initial creation");
}value=!!value;

if(this.__io==value){return;
}this.__io=value;
return this;
},setValue:function(value){this._setProperty(SSSS_0,value);
return this;
},getValue:function(){return this._getProperty(SSSS_0);
},setContent:function(value){qx.log.Logger.deprecatedMethodWarning(arguments.callee,SSSS_3);
return this.setValue(value);
},getContent:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,SSSS_1);
return this.getValue();
}}});
})();
(function(){var SSSS_0="qx.client",SSSS_1="gecko",SSSS_2="div",SSSS_3="inherit",SSSS_4="text",SSSS_5="value",SSSS_6="",SSSS_7="hidden",SSSS_8="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",SSSS_9="nowrap",SSSS_10="auto",SSSS_11="ellipsis",SSSS_12="normal",SSSS_13="label",SSSS_14="px",SSSS_15="crop",SSSS_16="end",SSSS_17="100%",SSSS_18="visible",SSSS_19="qx.bom.Label",SSSS_20="Please use the setValue() method instead.",SSSS_21="opera",SSSS_22="Please use the getValue() method instead.",SSSS_23="block",SSSS_24="none",SSSS_25="-1000px",SSSS_26="absolute";
qx.Class.define(SSSS_19,{statics:{__ip:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__iq:function(){var el=this.__is(false);
document.body.insertBefore(el,document.body.firstChild);
return this._textElement=el;
},__ir:function(){var el=this.__is(true);
document.body.insertBefore(el,document.body.firstChild);
return this._htmlElement=el;
},__is:function(html){var el=qx.bom.Element.create(SSSS_2);
var style=el.style;
style.width=style.height=SSSS_10;
style.left=style.top=SSSS_25;
style.visibility=SSSS_7;
style.position=SSSS_26;
style.overflow=SSSS_18;

if(html){style.whiteSpace=SSSS_12;
}else{style.whiteSpace=SSSS_9;

if(qx.core.Variant.isSet(SSSS_0,SSSS_1)){var inner=document.createElementNS(SSSS_8,SSSS_13);
for(var key in this.__ip){inner.style[key]=SSSS_3;
}el.appendChild(inner);
}}return el;
},__it:function(html){var styles={};

if(html){styles.whiteSpace=SSSS_12;
}else if(qx.core.Variant.isSet(SSSS_0,SSSS_1)){styles.display=SSSS_23;
}else{styles.overflow=SSSS_7;
styles.whiteSpace=SSSS_9;
styles.textOverflow=SSSS_11;
styles.userSelect=SSSS_24;
if(qx.core.Variant.isSet(SSSS_0,SSSS_21)){styles.OTextOverflow=SSSS_11;
}}return styles;
},create:function(content,html,win){if(!win){win=window;
}
if(html){var el=win.document.createElement(SSSS_2);
el.useHtml=true;
}else if(qx.core.Variant.isSet(SSSS_0,SSSS_1)){var el=win.document.createElement(SSSS_2);
var xulel=win.document.createElementNS(SSSS_8,SSSS_13);
xulel.style.cursor=SSSS_3;
xulel.style.color=SSSS_3;
xulel.style.overflow=SSSS_7;
xulel.style.maxWidth=SSSS_17;
for(var key in this.__ip){xulel.style[key]=SSSS_3;
}xulel.setAttribute(SSSS_15,SSSS_16);
el.appendChild(xulel);
}else{var el=win.document.createElement(SSSS_2);
qx.bom.element.Style.setStyles(el,this.__it(html));
}
if(content){this.setValue(el,content);
}return el;
},setValue:function(element,value){value=value||SSSS_6;

if(element.useHtml){element.innerHTML=value;
}else if(qx.core.Variant.isSet(SSSS_0,SSSS_1)){element.firstChild.setAttribute(SSSS_5,value);
}else{qx.bom.element.Attribute.set(element,SSSS_4,value);
}},getValue:function(element){if(element.useHtml){return element.innerHTML;
}else if(qx.core.Variant.isSet(SSSS_0,SSSS_1)){return element.firstChild.getAttribute(SSSS_5)||SSSS_6;
}else{return qx.bom.element.Attribute.get(element,SSSS_4);
}},getHtmlSize:function(content,styles,width){var element=this._htmlElement||this.__ir();
element.style.width=width!==undefined?width+SSSS_14:SSSS_10;
element.innerHTML=content;
return this.__iu(element,styles);
},getTextSize:function(text,styles){var element=this._textElement||this.__iq();

if(qx.core.Variant.isSet(SSSS_0,SSSS_1)){element.firstChild.setAttribute(SSSS_5,text);
}else{qx.bom.element.Attribute.set(element,SSSS_4,text);
}return this.__iu(element,styles);
},__iu:function(element,styles){var keys=this.__ip;

if(!styles){styles={};
}
for(var key in keys){element.style[key]=styles[key]||SSSS_6;
}var size=qx.bom.element.Dimension.getSize(element);

if(qx.core.Variant.isSet(SSSS_0,SSSS_1)){if(!qx.bom.client.Platform.WIN){size.width++;
}}return size;
},setContent:function(element,value){qx.log.Logger.deprecatedMethodWarning(arguments.callee,SSSS_20);
this.setValue(element,value);
},getContent:function(element){qx.log.Logger.deprecatedMethodWarning(arguments.callee,SSSS_22);
return this.getValue(element);
}}});
})();
(function(){var SSSS_0="mshtml",SSSS_1="qx.client",SSSS_2="qx.bom.element.Dimension",SSSS_3="paddingRight",SSSS_4="paddingLeft",SSSS_5="paddingTop",SSSS_6="paddingBottom";
qx.Class.define(SSSS_2,{statics:{getWidth:qx.core.Variant.select(SSSS_1,{"gecko":function(element){if(element.getBoundingClientRect){var rect=element.getBoundingClientRect();
return Math.round(rect.right)-Math.round(rect.left);
}else{return element.offsetWidth;
}},"default":function(element){return element.offsetWidth;
}}),getHeight:qx.core.Variant.select(SSSS_1,{"gecko":function(element){if(element.getBoundingClientRect){var rect=element.getBoundingClientRect();
return Math.round(rect.bottom)-Math.round(rect.top);
}else{return element.offsetHeight;
}},"default":function(element){return element.offsetHeight;
}}),getSize:function(element){return {width:this.getWidth(element),height:this.getHeight(element)};
},__iv:{visible:true,hidden:true},getContentWidth:function(element){var Style=qx.bom.element.Style;
var overflowX=qx.bom.element.Overflow.getX(element);
var paddingLeft=parseInt(Style.get(element,SSSS_4),10);
var paddingRight=parseInt(Style.get(element,SSSS_3),10);

if(this.__iv[overflowX]){return element.clientWidth-paddingLeft-paddingRight;
}else{if(element.clientWidth>=element.scrollWidth){return Math.max(element.clientWidth,element.scrollWidth)-paddingLeft-paddingRight;
}else{var width=element.scrollWidth-paddingLeft;
var Engine=qx.bom.client.Engine;

if(Engine.NAME===SSSS_0&&Engine.VERSION==6){width-=paddingRight;
}return width;
}}},getContentHeight:function(element){var Style=qx.bom.element.Style;
var overflowY=qx.bom.element.Overflow.getY(element);
var paddingTop=parseInt(Style.get(element,SSSS_5),10);
var paddingBottom=parseInt(Style.get(element,SSSS_6),10);

if(this.__iv[overflowY]){return element.clientHeight-paddingTop-paddingBottom;
}else{if(element.clientHeight>=element.scrollHeight){return Math.max(element.clientHeight,element.scrollHeight)-paddingTop-paddingBottom;
}else{var height=element.scrollHeight-paddingTop;
var Engine=qx.bom.client.Engine;

if(Engine.NAME===SSSS_0&&Engine.VERSION==6){height-=paddingBottom;
}return height;
}}},getContentSize:function(element){return {width:this.getContentWidth(element),height:this.getContentHeight(element)};
}}});
})();
(function(){var SSSS_0="qx.event.type.Data",SSSS_1="qx.ui.form.IForm";
qx.Interface.define(SSSS_1,{events:{"changeEnabled":SSSS_0,"changeValid":SSSS_0,"changeInvalidMessage":SSSS_0,"changeRequired":SSSS_0},members:{setEnabled:function(enabled){return arguments.length==1;
},getEnabled:function(){},setRequired:function(required){return arguments.length==1;
},getRequired:function(){},setValid:function(valid){return arguments.length==1;
},getValid:function(){},setInvalidMessage:function(message){return arguments.length==1;
},getInvalidMessage:function(){}}});
})();
(function(){var SSSS_0="Use 'getBlocker().getContentBlockerElement()' instead.",SSSS_1="Use 'getBlocker().getBlockerElement()' instead.",SSSS_2="_applyBlockerColor",SSSS_3="Number",SSSS_4="__iw",SSSS_5="qx.ui.core.MBlocker",SSSS_6="_applyBlockerOpacity",SSSS_7="Color";
qx.Mixin.define(SSSS_5,{construct:function(){this.__iw=new qx.ui.core.Blocker(this);
},properties:{blockerColor:{check:SSSS_7,init:null,nullable:true,apply:SSSS_2,themeable:true},blockerOpacity:{check:SSSS_3,init:1,apply:SSSS_6,themeable:true}},members:{__iw:null,_applyBlockerColor:function(value,old){this.__iw.setColor(value);
},_applyBlockerOpacity:function(value,old){this.__iw.setOpacity(value);
},block:function(){this.__iw.block();
},isBlocked:function(){return this.__iw.isBlocked();
},unblock:function(){this.__iw.unblock();
},forceUnblock:function(){this.__iw.forceUnblock();
},blockContent:function(zIndex){this.__iw.blockContent(zIndex);
},isContentBlocked:function(){return this.__iw.isContentBlocked();
},unblockContent:function(){this.__iw.unblockContent();
},forceUnblockContent:function(){this.__iw.forceUnblockContent();
},_getContentBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,SSSS_0);
return this.__iw.getContentBlockerElement();
},_getBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,SSSS_1);
return this.__iw.getBlockerElement();
},getBlocker:function(){return this.__iw;
}},destruct:function(){this._disposeObjects(SSSS_4);
}});
})();
(function(){var SSSS_0="qx.ui.window.Window",SSSS_1="changeModal",SSSS_2="changeVisibility",SSSS_3="changeActive",SSSS_4="_applyActiveWindow",SSSS_5="__ix",SSSS_6="__iy",SSSS_7="qx.ui.window.MDesktop";
qx.Mixin.define(SSSS_7,{properties:{activeWindow:{check:SSSS_0,apply:SSSS_4,init:null,nullable:true}},members:{__ix:null,__iy:null,getWindowManager:function(){if(!this.__iy){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());
}return this.__iy;
},supportsMaximize:function(){return true;
},setWindowManager:function(manager){if(this.__iy){this.__iy.setDesktop(null);
}manager.setDesktop(this);
this.__iy=manager;
},_onChangeActive:function(e){if(e.getData()){this.setActiveWindow(e.getTarget());
}else if(this.getActiveWindow()==e.getTarget()){this.setActiveWindow(null);
}},_applyActiveWindow:function(value,old){this.getWindowManager().changeActiveWindow(value,old);

if(value){value.setActive(true);
}
if(old){old.resetActive();
}},_onChangeModal:function(e){this.getWindowManager().updateStack();
},_onChangeVisibility:function(){this.getWindowManager().updateStack();
},_afterAddChild:function(win){if(qx.Class.isDefined(SSSS_0)&&win instanceof qx.ui.window.Window){this._addWindow(win);
}},_addWindow:function(win){if(!qx.lang.Array.contains(this.getWindows(),win)){this.getWindows().push(win);
win.addListener(SSSS_3,this._onChangeActive,this);
win.addListener(SSSS_1,this._onChangeModal,this);
win.addListener(SSSS_2,this._onChangeVisibility,this);
}
if(win.getActive()){this.setActiveWindow(win);
}this.getWindowManager().updateStack();
},_afterRemoveChild:function(win){if(qx.Class.isDefined(SSSS_0)&&win instanceof qx.ui.window.Window){this._removeWindow(win);
}},_removeWindow:function(win){qx.lang.Array.remove(this.getWindows(),win);
win.removeListener(SSSS_3,this._onChangeActive,this);
win.removeListener(SSSS_1,this._onChangeModal,this);
win.removeListener(SSSS_2,this._onChangeVisibility,this);
this.getWindowManager().updateStack();
},getWindows:function(){if(!this.__ix){this.__ix=[];
}return this.__ix;
}},destruct:function(){this._disposeArray(SSSS_5);
this._disposeObjects(SSSS_6);
}});
})();
(function(){var SSSS_0="contextmenu",SSSS_1="help",SSSS_2="qx.client",SSSS_3="changeGlobalCursor",SSSS_4="abstract",SSSS_5="Boolean",SSSS_6="root",SSSS_7="",SSSS_8=" !important",SSSS_9="_applyGlobalCursor",SSSS_10="_applyNativeHelp",SSSS_11=";",SSSS_12="qx.ui.root.Abstract",SSSS_13="String",SSSS_14="*";
qx.Class.define(SSSS_12,{type:SSSS_4,extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){arguments.callee.base.call(this);
qx.ui.core.FocusHandler.getInstance().addRoot(this);
qx.ui.core.queue.Visibility.add(this);
this.initNativeHelp();
},properties:{appearance:{refine:true,init:SSSS_6},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:SSSS_13,nullable:true,themeable:true,apply:SSSS_9,event:SSSS_3},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:SSSS_5,init:false,apply:SSSS_10}},members:{__iz:null,isRootWidget:function(){return true;
},getLayout:function(){return this._getLayout();
},_applyGlobalCursor:qx.core.Variant.select(SSSS_2,{"mshtml":function(value,old){},"default":function(value,old){var Stylesheet=qx.bom.Stylesheet;
var sheet=this.__iz;

if(!sheet){this.__iz=sheet=Stylesheet.createElement();
}Stylesheet.removeAllRules(sheet);

if(value){Stylesheet.addRule(sheet,SSSS_14,qx.bom.element.Cursor.compile(value).replace(SSSS_11,SSSS_7)+SSSS_8);
}}}),_applyNativeContextMenu:function(value,old){if(value){this.removeListener(SSSS_0,this._onNativeContextMenu,this,true);
}else{this.addListener(SSSS_0,this._onNativeContextMenu,this,true);
}},_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;
}e.preventDefault();
},_applyNativeHelp:qx.core.Variant.select(SSSS_2,{"mshtml":function(value,old){if(old===false){qx.bom.Event.removeNativeListener(document,SSSS_1,qx.lang.Function.returnFalse);
}
if(value===false){qx.bom.Event.addNativeListener(document,SSSS_1,qx.lang.Function.returnFalse);
}},"default":function(){}})},destruct:function(){this.__iz=null;
},defer:function(statics,members){qx.ui.core.MChildrenHandling.remap(members);
}});
})();
(function(){var SSSS_0="resize",SSSS_1="position",SSSS_2="0px",SSSS_3="webkit",SSSS_4="$$widget",SSSS_5="qx.ui.root.Application",SSSS_6="hidden",SSSS_7="qx.client",SSSS_8="div",SSSS_9="100%",SSSS_10="absolute";
qx.Class.define(SSSS_5,{extend:qx.ui.root.Abstract,construct:function(doc){this.__iA=qx.dom.Node.getWindow(doc);
this.__iB=doc;
arguments.callee.base.call(this);
qx.event.Registration.addListener(this.__iA,SSSS_0,this._onResize,this);
this._setLayout(new qx.ui.layout.Canvas());
qx.ui.core.queue.Layout.add(this);
qx.ui.core.FocusHandler.getInstance().connectTo(this);
this.getContentElement().disableScrolling();
},members:{__iA:null,__iB:null,_createContainerElement:function(){var doc=this.__iB;

if(qx.core.Variant.isSet(SSSS_7,SSSS_3)){if(!doc.body){alert("The application could not be started due to a missing body tag in the HTML file!");
}}var hstyle=doc.documentElement.style;
var bstyle=doc.body.style;
hstyle.overflow=bstyle.overflow=SSSS_6;
hstyle.padding=hstyle.margin=bstyle.padding=bstyle.margin=SSSS_2;
hstyle.width=hstyle.height=bstyle.width=bstyle.height=SSSS_9;
var elem=doc.createElement(SSSS_8);
doc.body.appendChild(elem);
var root=new qx.html.Root(elem);
root.setStyle(SSSS_1,SSSS_10);
root.setAttribute(SSSS_4,this.toHashCode());
return root;
},_onResize:function(e){qx.ui.core.queue.Layout.add(this);
},_computeSizeHint:function(){var width=qx.bom.Viewport.getWidth(this.__iA);
var height=qx.bom.Viewport.getHeight(this.__iA);
return {minWidth:width,width:width,maxWidth:width,minHeight:height,height:height,maxHeight:height};
}},destruct:function(){this.__iA=this.__iB=null;
}});
})();
(function(){var SSSS_0="zIndex",SSSS_1="px",SSSS_2="keydown",SSSS_3="deactivate",SSSS_4="This method is not needed anymore.",SSSS_5="resize",SSSS_6="keyup",SSSS_7="keypress",SSSS_8="backgroundColor",SSSS_9="_applyOpacity",SSSS_10="Use 'getBlockerElement' instead.",SSSS_11="opacity",SSSS_12="interval",SSSS_13="Tab",SSSS_14="Color",SSSS_15="qx.ui.root.Page",SSSS_16="__iK",SSSS_17="Use 'getContentBlockerElement' instead.",SSSS_18="__iH",SSSS_19="Number",SSSS_20="qx.ui.core.Blocker",SSSS_21="__iF",SSSS_22="_applyColor";
qx.Class.define(SSSS_20,{extend:qx.core.Object,construct:function(widget){arguments.callee.base.call(this);
this._widget=widget;
this._isPageRoot=(qx.Class.isDefined(SSSS_15)&&widget instanceof qx.ui.root.Page);

if(this._isPageRoot){widget.addListener(SSSS_5,this.__iL,this);
}this.__iC=[];
this.__iD=[];
this.__iE=[];
},properties:{color:{check:SSSS_14,init:null,nullable:true,apply:SSSS_22,themeable:true},opacity:{check:SSSS_19,init:1,apply:SSSS_9,themeable:true}},members:{__iF:null,__iG:0,__iH:null,__iE:null,__iC:null,__iD:null,__iI:null,__iJ:0,__iK:null,_isPageRoot:false,_widget:null,__iL:function(e){var data=e.getData();

if(this.isContentBlocked()){this.getContentBlockerElement().setStyles({width:data.width,height:data.height});
}
if(this.isBlocked()){this.getBlockerElement().setStyles({width:data.width,height:data.height});
}},_applyColor:function(value,old){var color=qx.theme.manager.Color.getInstance().resolve(value);
this.__iM(SSSS_8,color);
},_applyOpacity:function(value,old){this.__iM(SSSS_11,value);
},__iM:function(key,value){var blockers=[];
this.__iF&&blockers.push(this.__iF);
this.__iH&&blockers.push(this.__iH);

for(var i=0;i<blockers.length;i++){blockers[i].setStyle(key,value);
}},_saveAndSetAnonymousState:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,SSSS_4);
this.__iJ+=1;

if(this.__iJ==1){this.__iI=this._widget.getAnonymous();
this._widget.setAnonymous(true);
}},_restoreAnonymousState:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,SSSS_4);
this.__iJ-=1;

if(this.__iJ==0){this._widget.setAnonymous(this.__iI);
}},_backupActiveWidget:function(){var focusHandler=qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);
this.__iC.push(focusHandler.getActive());
this.__iD.push(focusHandler.getFocus());

if(this._widget.isFocusable()){this._widget.focus();
}},_restoreActiveWidget:function(){var activeElementsLength=this.__iC.length;

if(activeElementsLength>0){var widget=this.__iC[activeElementsLength-1];

if(widget){qx.bom.Element.activate(widget);
}this.__iC.pop();
}var focusElementsLength=this.__iD.length;

if(focusElementsLength>0){var widget=this.__iD[focusElementsLength-1];

if(widget){qx.bom.Element.focus(this.__iD[focusElementsLength-1]);
}this.__iD.pop();
}},__iN:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());
},_getBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,SSSS_10);
return this.getBlockerElement();
},getBlockerElement:function(){if(!this.__iF){this.__iF=this.__iN();
this.__iF.setStyle(SSSS_0,15);
this._widget.getContainerElement().add(this.__iF);
this.__iF.exclude();
}return this.__iF;
},block:function(){this.__iG++;

if(this.__iG<2){this._backupActiveWidget();
var blocker=this.getBlockerElement();
blocker.include();
blocker.activate();
blocker.addListener(SSSS_3,this.__iS,this);
blocker.addListener(SSSS_7,this.__iR,this);
blocker.addListener(SSSS_2,this.__iR,this);
blocker.addListener(SSSS_6,this.__iR,this);
}},isBlocked:function(){return this.__iG>0;
},unblock:function(){if(!this.isBlocked()){return;
}this.__iG--;

if(this.__iG<1){this.__iO();
}},forceUnblock:function(){if(!this.isBlocked()){return;
}this.__iG=0;
this.__iO();
},__iO:function(){this._restoreActiveWidget();
var blocker=this.getBlockerElement();
blocker.removeListener(SSSS_3,this.__iS,this);
blocker.removeListener(SSSS_7,this.__iR,this);
blocker.removeListener(SSSS_2,this.__iR,this);
blocker.removeListener(SSSS_6,this.__iR,this);
blocker.exclude();
},_getContentBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,SSSS_17);
return this.getContentBlockerElement();
},getContentBlockerElement:function(){if(!this.__iH){this.__iH=this.__iN();
this._widget.getContentElement().add(this.__iH);
this.__iH.exclude();
}return this.__iH;
},blockContent:function(zIndex){var blocker=this.getContentBlockerElement();
blocker.setStyle(SSSS_0,zIndex);
this.__iE.push(zIndex);

if(this.__iE.length<2){blocker.include();

if(this._isPageRoot){if(!this.__iK){this.__iK=new qx.event.Timer(300);
this.__iK.addListener(SSSS_12,this.__iQ,this);
}this.__iK.start();
this.__iQ();
}}},isContentBlocked:function(){return this.__iE.length>0;
},unblockContent:function(){if(!this.isContentBlocked()){return;
}this.__iE.pop();
var zIndex=this.__iE[this.__iE.length-1];
var contentBlocker=this.getContentBlockerElement();
contentBlocker.setStyle(SSSS_0,zIndex);

if(this.__iE.length<1){this.__iP();
}},forceUnblockContent:function(){if(!this.isContentBlocked()){return;
}this.__iE=[];
var contentBlocker=this.getContentBlockerElement();
contentBlocker.setStyle(SSSS_0,null);
this.__iP();
},__iP:function(){this.getContentBlockerElement().exclude();

if(this._isPageRoot){this.__iK.stop();
}},__iQ:function(){var containerEl=this._widget.getContainerElement().getDomElement();
var doc=qx.dom.Node.getDocument(containerEl);
this.getContentBlockerElement().setStyles({height:doc.documentElement.scrollHeight+SSSS_1,width:doc.documentElement.scrollWidth+SSSS_1});
},__iR:function(e){if(e.getKeyIdentifier()==SSSS_13){e.stop();
}},__iS:function(){this.getBlockerElement().activate();
}},destruct:function(){if(this._isPageRoot){this._widget.removeListener(SSSS_5,this.__iL,this);
}this._disposeObjects(SSSS_18,SSSS_21,SSSS_16);
this.__iI=this.__iC=this.__iD=this._widget=this.__iE=null;
}});
})();
(function(){var SSSS_0="cursor",SSSS_1="100%",SSSS_2="dblclick",SSSS_3="mshtml",SSSS_4="mouseup",SSSS_5="mousedown",SSSS_6="disappear",SSSS_7="appear",SSSS_8="contextmenu",SSSS_9="mousewheel",SSSS_10=")",SSSS_11="mouseover",SSSS_12="mouseout",SSSS_13="qx.html.Blocker",SSSS_14="click",SSSS_15="repeat",SSSS_16="mousemove",SSSS_17="url(",SSSS_18="qx.client",SSSS_19="qx/static/blank.gif",SSSS_20="absolute";
qx.Class.define(SSSS_13,{extend:qx.html.Element,construct:function(backgroundColor,opacity){arguments.callee.base.call(this);
var backgroundColor=backgroundColor?qx.theme.manager.Color.getInstance().resolve(backgroundColor):null;
this.setStyles({position:SSSS_20,width:SSSS_1,height:SSSS_1,opacity:opacity||0,backgroundColor:backgroundColor});
this.addListener(SSSS_5,this._stopPropagation,this);
this.addListener(SSSS_4,this._stopPropagation,this);
this.addListener(SSSS_14,this._stopPropagation,this);
this.addListener(SSSS_2,this._stopPropagation,this);
this.addListener(SSSS_16,this._stopPropagation,this);
this.addListener(SSSS_11,this._stopPropagation,this);
this.addListener(SSSS_12,this._stopPropagation,this);
this.addListener(SSSS_9,this._stopPropagation,this);
this.addListener(SSSS_8,this._stopPropagation,this);
if(qx.core.Variant.isSet(SSSS_18,SSSS_3)){this.setStyles({backgroundImage:SSSS_17+qx.util.ResourceManager.getInstance().toUri(SSSS_19)+SSSS_10,backgroundRepeat:SSSS_15});
}this.addListener(SSSS_7,this.__iT,this);
this.addListener(SSSS_6,this.__iT,this);
},members:{_stopPropagation:function(e){e.stopPropagation();
},__iT:function(){var currentCursor=this.getStyle(SSSS_0);
this.setStyle(SSSS_0,null,true);
this.setStyle(SSSS_0,currentCursor,true);
}}});
})();
(function(){var SSSS_0="keypress",SSSS_1="focusout",SSSS_2="activate",SSSS_3="Tab",SSSS_4="singleton",SSSS_5="deactivate",SSSS_6="__iU",SSSS_7="focusin",SSSS_8="qx.ui.core.FocusHandler";
qx.Class.define(SSSS_8,{extend:qx.core.Object,type:SSSS_4,construct:function(){arguments.callee.base.call(this);
this.__iU={};
},members:{__iU:null,__iV:null,__iW:null,__iX:null,connectTo:function(root){root.addListener(SSSS_0,this.__iY,this);
root.addListener(SSSS_7,this._onFocusIn,this,true);
root.addListener(SSSS_1,this._onFocusOut,this,true);
root.addListener(SSSS_2,this._onActivate,this,true);
root.addListener(SSSS_5,this._onDeactivate,this,true);
},addRoot:function(widget){this.__iU[widget.$$hash]=widget;
},removeRoot:function(widget){delete this.__iU[widget.$$hash];
},getActiveWidget:function(){return this.__iV;
},isActive:function(widget){return this.__iV==widget;
},getFocusedWidget:function(){return this.__iW;
},isFocused:function(widget){return this.__iW==widget;
},isFocusRoot:function(widget){return !!this.__iU[widget.$$hash];
},_onActivate:function(e){var target=e.getTarget();
this.__iV=target;
var root=this.__ja(target);

if(root!=this.__iX){this.__iX=root;
}},_onDeactivate:function(e){var target=e.getTarget();

if(this.__iV==target){this.__iV=null;
}},_onFocusIn:function(e){var target=e.getTarget();

if(target!=this.__iW){this.__iW=target;
target.visualizeFocus();
}},_onFocusOut:function(e){var target=e.getTarget();

if(target==this.__iW){this.__iW=null;
target.visualizeBlur();
}},__iY:function(e){if(e.getKeyIdentifier()!=SSSS_3){return;
}
if(!this.__iX){return;
}e.stopPropagation();
e.preventDefault();
var current=this.__iW;

if(!e.isShiftPressed()){var next=current?this.__je(current):this.__jc();
}else{var next=current?this.__jf(current):this.__jd();
}if(next){next.tabFocus();
}},__ja:function(widget){var roots=this.__iU;

while(widget){if(roots[widget.$$hash]){return widget;
}widget=widget.getLayoutParent();
}return null;
},__jb:function(widget1,widget2){if(widget1===widget2){return 0;
}var tab1=widget1.getTabIndex()||0;
var tab2=widget2.getTabIndex()||0;

if(tab1!=tab2){return tab1-tab2;
}var el1=widget1.getContainerElement().getDomElement();
var el2=widget2.getContainerElement().getDomElement();
var Location=qx.bom.element.Location;
var loc1=Location.get(el1);
var loc2=Location.get(el2);
if(loc1.top!=loc2.top){return loc1.top-loc2.top;
}if(loc1.left!=loc2.left){return loc1.left-loc2.left;
}var z1=widget1.getZIndex();
var z2=widget2.getZIndex();

if(z1!=z2){return z1-z2;
}return 0;
},__jc:function(){return this.__ji(this.__iX,null);
},__jd:function(){return this.__jj(this.__iX,null);
},__je:function(widget){var root=this.__iX;

if(root==widget){return this.__jc();
}
while(widget&&widget.getAnonymous()){widget=widget.getLayoutParent();
}
if(widget==null){return [];
}var result=[];
this.__jg(root,widget,result);
result.sort(this.__jb);
var len=result.length;
return len>0?result[0]:this.__jc();
},__jf:function(widget){var root=this.__iX;

if(root==widget){return this.__jd();
}
while(widget&&widget.getAnonymous()){widget=widget.getLayoutParent();
}
if(widget==null){return [];
}var result=[];
this.__jh(root,widget,result);
result.sort(this.__jb);
var len=result.length;
return len>0?result[len-1]:this.__jd();
},__jg:function(parent,widget,result){var children=parent.getLayoutChildren();
var child;

for(var i=0,l=children.length;i<l;i++){child=children[i];
if(!(child instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(child)&&child.isEnabled()&&child.isVisible()){if(child.isTabable()&&this.__jb(widget,child)<0){result.push(child);
}this.__jg(child,widget,result);
}}},__jh:function(parent,widget,result){var children=parent.getLayoutChildren();
var child;

for(var i=0,l=children.length;i<l;i++){child=children[i];
if(!(child instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(child)&&child.isEnabled()&&child.isVisible()){if(child.isTabable()&&this.__jb(widget,child)>0){result.push(child);
}this.__jh(child,widget,result);
}}},__ji:function(parent,firstWidget){var children=parent.getLayoutChildren();
var child;

for(var i=0,l=children.length;i<l;i++){child=children[i];
if(!(child instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(child)&&child.isEnabled()&&child.isVisible()){if(child.isTabable()){if(firstWidget==null||this.__jb(child,firstWidget)<0){firstWidget=child;
}}firstWidget=this.__ji(child,firstWidget);
}}return firstWidget;
},__jj:function(parent,lastWidget){var children=parent.getLayoutChildren();
var child;

for(var i=0,l=children.length;i<l;i++){child=children[i];
if(!(child instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(child)&&child.isEnabled()&&child.isVisible()){if(child.isTabable()){if(lastWidget==null||this.__jb(child,lastWidget)>0){lastWidget=child;
}}lastWidget=this.__jj(child,lastWidget);
}}return lastWidget;
}},destruct:function(){this._disposeMap(SSSS_6);
this.__iW=this.__iV=this.__iX=null;
}});
})();
(function(){var SSSS_0="qx.client",SSSS_1="head",SSSS_2="text/css",SSSS_3="stylesheet",SSSS_4="}",SSSS_5='@import "',SSSS_6="{",SSSS_7='";',SSSS_8="qx.bom.Stylesheet",SSSS_9="link",SSSS_10="style";
qx.Class.define(SSSS_8,{statics:{includeFile:function(href,doc){if(!doc){doc=document;
}var el=doc.createElement(SSSS_9);
el.type=SSSS_2;
el.rel=SSSS_3;
el.href=qx.util.ResourceManager.getInstance().toUri(href);
var head=doc.getElementsByTagName(SSSS_1)[0];
head.appendChild(el);
},createElement:qx.core.Variant.select(SSSS_0,{"mshtml":function(text){var sheet=document.createStyleSheet();

if(text){sheet.cssText=text;
}return sheet;
},"default":function(text){var elem=document.createElement(SSSS_10);
elem.type=SSSS_2;

if(text){elem.appendChild(document.createTextNode(text));
}document.getElementsByTagName(SSSS_1)[0].appendChild(elem);
return elem.sheet;
}}),addRule:qx.core.Variant.select(SSSS_0,{"mshtml":function(sheet,selector,entry){sheet.addRule(selector,entry);
},"default":function(sheet,selector,entry){sheet.insertRule(selector+SSSS_6+entry+SSSS_4,sheet.cssRules.length);
}}),removeRule:qx.core.Variant.select(SSSS_0,{"mshtml":function(sheet,selector){var rules=sheet.rules;
var len=rules.length;

for(var i=len-1;i>=0;--i){if(rules[i].selectorText==selector){sheet.removeRule(i);
}}},"default":function(sheet,selector){var rules=sheet.cssRules;
var len=rules.length;

for(var i=len-1;i>=0;--i){if(rules[i].selectorText==selector){sheet.deleteRule(i);
}}}}),removeAllRules:qx.core.Variant.select(SSSS_0,{"mshtml":function(sheet){var rules=sheet.rules;
var len=rules.length;

for(var i=len-1;i>=0;i--){sheet.removeRule(i);
}},"default":function(sheet){var rules=sheet.cssRules;
var len=rules.length;

for(var i=len-1;i>=0;i--){sheet.deleteRule(i);
}}}),addImport:qx.core.Variant.select(SSSS_0,{"mshtml":function(sheet,url){sheet.addImport(url);
},"default":function(sheet,url){sheet.insertRule(SSSS_5+url+SSSS_7,sheet.cssRules.length);
}}),removeImport:qx.core.Variant.select(SSSS_0,{"mshtml":function(sheet,url){var imports=sheet.imports;
var len=imports.length;

for(var i=len-1;i>=0;i--){if(imports[i].href==url){sheet.removeImport(i);
}}},"default":function(sheet,url){var rules=sheet.cssRules;
var len=rules.length;

for(var i=len-1;i>=0;i--){if(rules[i].href==url){sheet.deleteRule(i);
}}}}),removeAllImports:qx.core.Variant.select(SSSS_0,{"mshtml":function(sheet){var imports=sheet.imports;
var len=imports.length;

for(var i=len-1;i>=0;i--){sheet.removeImport(i);
}},"default":function(sheet){var rules=sheet.cssRules;
var len=rules.length;

for(var i=len-1;i>=0;i--){if(rules[i].type==rules[i].IMPORT_RULE){sheet.deleteRule(i);
}}}})}});
})();
(function(){var SSSS_0="number",SSSS_1="qx.ui.layout.Canvas";
qx.Class.define(SSSS_1,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(availWidth,availHeight){var children=this._getLayoutChildren();
var child,size,props;
var left,top,right,bottom,width,height;
var marginTop,marginRight,marginBottom,marginLeft;

for(var i=0,l=children.length;i<l;i++){child=children[i];
size=child.getSizeHint();
props=child.getLayoutProperties();
marginTop=child.getMarginTop();
marginRight=child.getMarginRight();
marginBottom=child.getMarginBottom();
marginLeft=child.getMarginLeft();
left=props.left!=null?props.left:props.edge;

if(qx.lang.Type.isString(left)){left=Math.round(parseFloat(left)*availWidth/100);
}right=props.right!=null?props.right:props.edge;

if(qx.lang.Type.isString(right)){right=Math.round(parseFloat(right)*availWidth/100);
}top=props.top!=null?props.top:props.edge;

if(qx.lang.Type.isString(top)){top=Math.round(parseFloat(top)*availHeight/100);
}bottom=props.bottom!=null?props.bottom:props.edge;

if(qx.lang.Type.isString(bottom)){bottom=Math.round(parseFloat(bottom)*availHeight/100);
}if(left!=null&&right!=null){width=availWidth-left-right-marginLeft-marginRight;
if(width<size.minWidth){width=size.minWidth;
}else if(width>size.maxWidth){width=size.maxWidth;
}left+=marginLeft;
}else{width=props.width;

if(width==null){width=size.width;
}else{width=Math.round(parseFloat(width)*availWidth/100);
if(width<size.minWidth){width=size.minWidth;
}else if(width>size.maxWidth){width=size.maxWidth;
}}
if(right!=null){left=availWidth-width-right-marginRight-marginLeft;
}else if(left==null){left=marginLeft;
}else{left+=marginLeft;
}}if(top!=null&&bottom!=null){height=availHeight-top-bottom-marginTop-marginBottom;
if(height<size.minHeight){height=size.minHeight;
}else if(height>size.maxHeight){height=size.maxHeight;
}top+=marginTop;
}else{height=props.height;

if(height==null){height=size.height;
}else{height=Math.round(parseFloat(height)*availHeight/100);
if(height<size.minHeight){height=size.minHeight;
}else if(height>size.maxHeight){height=size.maxHeight;
}}
if(bottom!=null){top=availHeight-height-bottom-marginBottom-marginTop;
}else if(top==null){top=marginTop;
}else{top+=marginTop;
}}child.renderLayout(left,top,width,height);
}},_computeSizeHint:function(){var neededWidth=0,neededMinWidth=0;
var neededHeight=0,neededMinHeight=0;
var width,minWidth;
var height,minHeight;
var children=this._getLayoutChildren();
var child,props,hint;
var left,top,right,bottom;

for(var i=0,l=children.length;i<l;i++){child=children[i];
props=child.getLayoutProperties();
hint=child.getSizeHint();
var marginX=child.getMarginLeft()+child.getMarginRight();
var marginY=child.getMarginTop()+child.getMarginBottom();
width=hint.width+marginX;
minWidth=hint.minWidth+marginX;
left=props.left!=null?props.left:props.edge;

if(left&&typeof left===SSSS_0){width+=left;
minWidth+=left;
}right=props.right!=null?props.right:props.edge;

if(right&&typeof right===SSSS_0){width+=right;
minWidth+=right;
}neededWidth=Math.max(neededWidth,width);
neededMinWidth=Math.max(neededMinWidth,minWidth);
height=hint.height+marginY;
minHeight=hint.minHeight+marginY;
top=props.top!=null?props.top:props.edge;

if(top&&typeof top===SSSS_0){height+=top;
minHeight+=top;
}bottom=props.bottom!=null?props.bottom:props.edge;

if(bottom&&typeof bottom===SSSS_0){height+=bottom;
minHeight+=bottom;
}neededHeight=Math.max(neededHeight,height);
neededMinHeight=Math.max(neededMinHeight,minHeight);
}return {width:neededWidth,minWidth:neededMinWidth,height:neededHeight,minHeight:neededMinHeight};
}}});
})();
(function(){var SSSS_0="qx.html.Root";
qx.Class.define(SSSS_0,{extend:qx.html.Element,construct:function(elem){arguments.callee.base.call(this);

if(elem!=null){this.useElement(elem);
}},members:{useElement:function(elem){arguments.callee.base.call(this,elem);
this.setRoot(true);
qx.html.Element._modified[this.$$hash]=this;
}}});
})();
(function(){var SSSS_0="toolTipText",SSSS_1="icon",SSSS_2="label",SSSS_3="qx.ui.core.MExecutable",SSSS_4="value",SSSS_5="qx.event.type.Event",SSSS_6="execute",SSSS_7="_applyCommand",SSSS_8="enabled",SSSS_9="menu",SSSS_10="changeCommand",SSSS_11="qx.ui.core.Command";
qx.Mixin.define(SSSS_3,{events:{"execute":SSSS_5},properties:{command:{check:SSSS_11,apply:SSSS_7,event:SSSS_10,nullable:true}},members:{__jk:null,_bindableProperties:[SSSS_8,SSSS_2,SSSS_1,SSSS_0,SSSS_4,SSSS_9],execute:function(){var cmd=this.getCommand();

if(cmd){cmd.execute(this);
}this.fireEvent(SSSS_6);
},_applyCommand:function(value,old){var ids=this.__jk;

if(ids==null){this.__jk=ids={};
}
for(var i=0;i<this._bindableProperties.length;i++){var property=this._bindableProperties[i];
if(old!=null&&ids[property]!=null){old.removeBinding(ids[property]);
ids[property]=null;
}if(value!=null&&qx.Class.hasProperty(this.constructor,property)){var cmdPropertyValue=value.get(property);

if(cmdPropertyValue==null){var selfPropertyValue=this.get(property);
}ids[property]=value.bind(property,this,property);
if(selfPropertyValue){this.set(property,selfPropertyValue);
}}}}},destruct:function(){this.__jk=null;
}});
})();
(function(){var SSSS_0="qx.ui.form.IExecutable",SSSS_1="qx.event.type.Data";
qx.Interface.define(SSSS_0,{events:{"execute":SSSS_1},members:{setCommand:function(command){return arguments.length==1;
},getCommand:function(){},execute:function(){}}});
})();
(function(){var SSSS_0="pressed",SSSS_1="abandoned",SSSS_2="hovered",SSSS_3="Enter",SSSS_4="Space",SSSS_5="dblclick",SSSS_6="qx.ui.form.Button",SSSS_7="mouseup",SSSS_8="mousedown",SSSS_9="mouseover",SSSS_10="mouseout",SSSS_11="keydown",SSSS_12="button",SSSS_13="keyup";
qx.Class.define(SSSS_6,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],construct:function(label,icon,command){arguments.callee.base.call(this,label,icon);

if(command!=null){this.setCommand(command);
}this.addListener(SSSS_9,this._onMouseOver);
this.addListener(SSSS_10,this._onMouseOut);
this.addListener(SSSS_8,this._onMouseDown);
this.addListener(SSSS_7,this._onMouseUp);
this.addListener(SSSS_11,this._onKeyDown);
this.addListener(SSSS_13,this._onKeyUp);
this.addListener(SSSS_5,this._onStopEvent);
},properties:{appearance:{refine:true,init:SSSS_12},focusable:{refine:true,init:true}},members:{_forwardStates:{focused:true,hovered:true,pressed:true,disabled:true},press:function(){if(this.hasState(SSSS_1)){return;
}this.addState(SSSS_0);
},release:function(){if(this.hasState(SSSS_0)){this.removeState(SSSS_0);
}},reset:function(){this.removeState(SSSS_0);
this.removeState(SSSS_1);
this.removeState(SSSS_2);
},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(SSSS_1)){this.removeState(SSSS_1);
this.addState(SSSS_0);
}this.addState(SSSS_2);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(SSSS_2);

if(this.hasState(SSSS_0)){this.removeState(SSSS_0);
this.addState(SSSS_1);
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}e.stopPropagation();
this.capture();
this.removeState(SSSS_1);
this.addState(SSSS_0);
},_onMouseUp:function(e){this.releaseCapture();
var hasPressed=this.hasState(SSSS_0);
var hasAbandoned=this.hasState(SSSS_1);

if(hasPressed){this.removeState(SSSS_0);
}
if(hasAbandoned){this.removeState(SSSS_1);
}else{this.addState(SSSS_2);

if(hasPressed){this.execute();
}}e.stopPropagation();
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case SSSS_3:case SSSS_4:this.removeState(SSSS_1);
this.addState(SSSS_0);
e.stopPropagation();
}},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case SSSS_3:case SSSS_4:if(this.hasState(SSSS_0)){this.removeState(SSSS_1);
this.removeState(SSSS_0);
this.execute();
e.stopPropagation();
}}}}});
})();


qx.$$loader.init();

