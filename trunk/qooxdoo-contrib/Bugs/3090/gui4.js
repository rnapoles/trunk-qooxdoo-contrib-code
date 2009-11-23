(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!window.qxsettings) qxsettings = {};
var settings = {"qx.application":"gui4.Application","qx.theme":"gui4.theme.Theme","qx.version":"0.9-pre"};
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
  packageHashes : {"0":"4fd118453ee8"},
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

qx.$$packageData['4fd118453ee8']={"resources":{"gui4/test.png":[32,32,"png","gui4"],"qx/decoration/Modern/app-header.png":[110,20,"png","qx"],"qx/decoration/Modern/arrows-combined.png":[87,8,"png","qx"],"qx/decoration/Modern/arrows/down-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-61,0],"qx/decoration/Modern/arrows/down-small-invert.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-10,0],"qx/decoration/Modern/arrows/down-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-82,0],"qx/decoration/Modern/arrows/down.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-74,0],"qx/decoration/Modern/arrows/forward.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-43,0],"qx/decoration/Modern/arrows/left-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-30,0],"qx/decoration/Modern/arrows/left.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",0,0],"qx/decoration/Modern/arrows/rewind.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-20,0],"qx/decoration/Modern/arrows/right-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-15,0],"qx/decoration/Modern/arrows/right.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-5,0],"qx/decoration/Modern/arrows/up-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-53,0],"qx/decoration/Modern/arrows/up-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-69,0],"qx/decoration/Modern/arrows/up.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-35,0],"qx/decoration/Modern/button-lr-combined.png":[72,52,"png","qx"],"qx/decoration/Modern/button-tb-combined.png":[4,216,"png","qx"],"qx/decoration/Modern/checkradio-combined.png":[504,14,"png","qx"],"qx/decoration/Modern/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Modern/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Modern/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",0,0],"qx/decoration/Modern/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Modern/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",-35,0],"qx/decoration/Modern/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Modern/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-33,0],"qx/decoration/Modern/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-52,0],"qx/decoration/Modern/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-20,0],"qx/decoration/Modern/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Modern/cursors-combined.gif",0,0],"qx/decoration/Modern/form/button-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-60],"qx/decoration/Modern/form/button-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-140],"qx/decoration/Modern/form/button-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-20],"qx/decoration/Modern/form/button-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-checked-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-176],"qx/decoration/Modern/form/button-checked-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-76],"qx/decoration/Modern/form/button-checked-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-188],"qx/decoration/Modern/form/button-checked-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-136],"qx/decoration/Modern/form/button-checked-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-148],"qx/decoration/Modern/form/button-checked-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-4],"qx/decoration/Modern/form/button-checked-focused-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-48,0],"qx/decoration/Modern/form/button-checked-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-12,0],"qx/decoration/Modern/form/button-checked-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-184],"qx/decoration/Modern/form/button-checked-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-68],"qx/decoration/Modern/form/button-checked-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-100],"qx/decoration/Modern/form/button-checked-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-8,0],"qx/decoration/Modern/form/button-checked-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-52,0],"qx/decoration/Modern/form/button-checked-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-104],"qx/decoration/Modern/form/button-checked-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-40],"qx/decoration/Modern/form/button-checked-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-116],"qx/decoration/Modern/form/button-disabled-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-92],"qx/decoration/Modern/form/button-disabled-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-72],"qx/decoration/Modern/form/button-disabled-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-128],"qx/decoration/Modern/form/button-disabled-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-disabled-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-28,0],"qx/decoration/Modern/form/button-disabled-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-4,0],"qx/decoration/Modern/form/button-disabled-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-120],"qx/decoration/Modern/form/button-disabled-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-164],"qx/decoration/Modern/form/button-disabled-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-208],"qx/decoration/Modern/form/button-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-172],"qx/decoration/Modern/form/button-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-88],"qx/decoration/Modern/form/button-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-16],"qx/decoration/Modern/form/button-focused-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-16,0],"qx/decoration/Modern/form/button-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-44,0],"qx/decoration/Modern/form/button-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-152],"qx/decoration/Modern/form/button-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-132],"qx/decoration/Modern/form/button-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-124],"qx/decoration/Modern/form/button-hovered-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-80],"qx/decoration/Modern/form/button-hovered-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-28],"qx/decoration/Modern/form/button-hovered-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-168],"qx/decoration/Modern/form/button-hovered-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-hovered-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-60,0],"qx/decoration/Modern/form/button-hovered-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-40,0],"qx/decoration/Modern/form/button-hovered-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-36],"qx/decoration/Modern/form/button-hovered-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-24],"qx/decoration/Modern/form/button-hovered-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-32],"qx/decoration/Modern/form/button-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-56,0],"qx/decoration/Modern/form/button-preselected-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-56],"qx/decoration/Modern/form/button-preselected-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-48],"qx/decoration/Modern/form/button-preselected-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-44],"qx/decoration/Modern/form/button-preselected-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-180],"qx/decoration/Modern/form/button-preselected-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-212],"qx/decoration/Modern/form/button-preselected-focused-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-64,0],"qx/decoration/Modern/form/button-preselected-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-96],"qx/decoration/Modern/form/button-preselected-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-8],"qx/decoration/Modern/form/button-preselected-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-204],"qx/decoration/Modern/form/button-preselected-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-20,0],"qx/decoration/Modern/form/button-preselected-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-36,0],"qx/decoration/Modern/form/button-preselected-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-196],"qx/decoration/Modern/form/button-preselected-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-52],"qx/decoration/Modern/form/button-preselected-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-112],"qx/decoration/Modern/form/button-pressed-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-108],"qx/decoration/Modern/form/button-pressed-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-144],"qx/decoration/Modern/form/button-pressed-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-160],"qx/decoration/Modern/form/button-pressed-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-pressed-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-24,0],"qx/decoration/Modern/form/button-pressed-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-32,0],"qx/decoration/Modern/form/button-pressed-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-200],"qx/decoration/Modern/form/button-pressed-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-64],"qx/decoration/Modern/form/button-pressed-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-84],"qx/decoration/Modern/form/button-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-68,0],"qx/decoration/Modern/form/button-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-192],"qx/decoration/Modern/form/button-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-156],"qx/decoration/Modern/form/button-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-12],"qx/decoration/Modern/form/checkbox-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-42,0],"qx/decoration/Modern/form/checkbox-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-140,0],"qx/decoration/Modern/form/checkbox-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-196,0],"qx/decoration/Modern/form/checkbox-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-84,0],"qx/decoration/Modern/form/checkbox-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-252,0],"qx/decoration/Modern/form/checkbox-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-112,0],"qx/decoration/Modern/form/checkbox-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-406,0],"qx/decoration/Modern/form/checkbox-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-266,0],"qx/decoration/Modern/form/checkbox-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-476,0],"qx/decoration/Modern/form/checkbox-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-392,0],"qx/decoration/Modern/form/checkbox-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-294,0],"qx/decoration/Modern/form/checkbox-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-126,0],"qx/decoration/Modern/form/checkbox-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-210,0],"qx/decoration/Modern/form/checkbox-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-14,0],"qx/decoration/Modern/form/checkbox-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-168,0],"qx/decoration/Modern/form/checkbox-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-238,0],"qx/decoration/Modern/form/checkbox-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-154,0],"qx/decoration/Modern/form/checkbox.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-280,0],"qx/decoration/Modern/form/input-focused.png":[40,12,"png","qx"],"qx/decoration/Modern/form/input.png":[84,12,"png","qx"],"qx/decoration/Modern/form/radiobutton-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-420,0],"qx/decoration/Modern/form/radiobutton-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-182,0],"qx/decoration/Modern/form/radiobutton-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-336,0],"qx/decoration/Modern/form/radiobutton-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-322,0],"qx/decoration/Modern/form/radiobutton-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-462,0],"qx/decoration/Modern/form/radiobutton-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-350,0],"qx/decoration/Modern/form/radiobutton-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",0,0],"qx/decoration/Modern/form/radiobutton-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-448,0],"qx/decoration/Modern/form/radiobutton-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-434,0],"qx/decoration/Modern/form/radiobutton-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-224,0],"qx/decoration/Modern/form/radiobutton-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-56,0],"qx/decoration/Modern/form/radiobutton-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-28,0],"qx/decoration/Modern/form/radiobutton-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-378,0],"qx/decoration/Modern/form/radiobutton-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-308,0],"qx/decoration/Modern/form/radiobutton-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-70,0],"qx/decoration/Modern/form/radiobutton-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-98,0],"qx/decoration/Modern/form/radiobutton-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-364,0],"qx/decoration/Modern/form/radiobutton.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-490,0],"qx/decoration/Modern/form/tooltip-error-arrow.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-b.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-24],"qx/decoration/Modern/form/tooltip-error-bl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-br.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-30],"qx/decoration/Modern/form/tooltip-error-c.png":[20,18,"png","qx"],"qx/decoration/Modern/form/tooltip-error-l.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-r.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",-6,0],"qx/decoration/Modern/form/tooltip-error-t.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-12],"qx/decoration/Modern/form/tooltip-error-tl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-6],"qx/decoration/Modern/form/tooltip-error-tr.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-18],"qx/decoration/Modern/groupbox-lr-combined.png":[8,51,"png","qx"],"qx/decoration/Modern/groupbox-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-b.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-8],"qx/decoration/Modern/groupbox/groupbox-bl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-20],"qx/decoration/Modern/groupbox/groupbox-br.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-c.png":[20,51,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-l.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-r.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",-4,0],"qx/decoration/Modern/groupbox/groupbox-t.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-12],"qx/decoration/Modern/groupbox/groupbox-tl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-16],"qx/decoration/Modern/groupbox/groupbox-tr.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-4],"qx/decoration/Modern/menu-background-combined.png":[60,49,"png","qx"],"qx/decoration/Modern/menu-checkradio-combined.gif":[64,7,"gif","qx"],"qx/decoration/Modern/menu/background.png":[20,49,"png","qx","qx/decoration/Modern/menu-background-combined.png",0,0],"qx/decoration/Modern/menu/bar-background.png":[40,20,"png","qx","qx/decoration/Modern/menu-background-combined.png",-20,0],"qx/decoration/Modern/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-16,0],"qx/decoration/Modern/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-48,0],"qx/decoration/Modern/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-32,0],"qx/decoration/Modern/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",0,0],"qx/decoration/Modern/pane-lr-combined.png":[12,238,"png","qx"],"qx/decoration/Modern/pane-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/pane/pane-b.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-6],"qx/decoration/Modern/pane/pane-bl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,0],"qx/decoration/Modern/pane/pane-br.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-30],"qx/decoration/Modern/pane/pane-c.png":[20,238,"png","qx"],"qx/decoration/Modern/pane/pane-l.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",-6,0],"qx/decoration/Modern/pane/pane-r.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",0,0],"qx/decoration/Modern/pane/pane-t.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-24],"qx/decoration/Modern/pane/pane-tl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-18],"qx/decoration/Modern/pane/pane-tr.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-12],"qx/decoration/Modern/scrollbar-combined.png":[54,12,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-horizontal.png":[76,15,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-horizontal.png":[19,10,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-vertical.png":[10,19,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-vertical.png":[15,76,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-horizontal.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",0,0],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-vertical.png":[10,12,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-34,0],"qx/decoration/Modern/scrollbar/scrollbar-down.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-44,0],"qx/decoration/Modern/scrollbar/scrollbar-left.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-50,0],"qx/decoration/Modern/scrollbar/scrollbar-right.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-24,0],"qx/decoration/Modern/scrollbar/scrollbar-up.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-28,0],"qx/decoration/Modern/scrollbar/slider-knob-background.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-12,0],"qx/decoration/Modern/selection.png":[110,20,"png","qx"],"qx/decoration/Modern/shadow-lr-combined.png":[30,382,"png","qx"],"qx/decoration/Modern/shadow-small-lr-combined.png":[10,136,"png","qx"],"qx/decoration/Modern/shadow-small-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/shadow-tb-combined.png":[15,90,"png","qx"],"qx/decoration/Modern/shadow/shadow-b.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-75],"qx/decoration/Modern/shadow/shadow-bl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-45],"qx/decoration/Modern/shadow/shadow-br.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-c.png":[20,382,"png","qx"],"qx/decoration/Modern/shadow/shadow-l.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-r.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",-15,0],"qx/decoration/Modern/shadow/shadow-small-b.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-small-bl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-20],"qx/decoration/Modern/shadow/shadow-small-br.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-10],"qx/decoration/Modern/shadow/shadow-small-c.png":[20,136,"png","qx"],"qx/decoration/Modern/shadow/shadow-small-l.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",-5,0],"qx/decoration/Modern/shadow/shadow-small-r.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-t.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-5],"qx/decoration/Modern/shadow/shadow-small-tl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-tr.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-25],"qx/decoration/Modern/shadow/shadow-t.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-30],"qx/decoration/Modern/shadow/shadow-tl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-tr.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-60],"qx/decoration/Modern/splitpane-knobs-combined.png":[8,9,"png","qx"],"qx/decoration/Modern/splitpane/knob-horizontal.png":[1,8,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,0],"qx/decoration/Modern/splitpane/knob-vertical.png":[8,1,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,-8],"qx/decoration/Modern/table-combined.png":[74,18,"png","qx"],"qx/decoration/Modern/table/ascending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",-46,0],"qx/decoration/Modern/table/boolean-false.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-22,0],"qx/decoration/Modern/table/boolean-true.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-8,0],"qx/decoration/Modern/table/descending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",0,0],"qx/decoration/Modern/table/header-cell.png":[20,18,"png","qx","qx/decoration/Modern/table-combined.png",-54,0],"qx/decoration/Modern/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Modern/table-combined.png",-36,0],"qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png":[10,14,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-lr-combined.png":[10,12,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-pane-lr-combined.png":[60,2,"png","qx"],"qx/decoration/Modern/tabview-pane-tb-combined.png":[30,180,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-bottom-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-bottom-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-bottom-active-c.png":[20,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-l.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-r.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-bottom-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-bottom-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-c.png":[20,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-left-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-left-active-c.png":[12,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-left-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-left-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-left-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-left-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-c.png":[14,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-right-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-right-active-c.png":[12,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-right-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-right-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-right-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-right-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-c.png":[14,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-top-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-top-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-top-active-c.png":[20,12,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-l.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-top-active-r.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-top-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-top-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-c.png":[20,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tabview-pane-b.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-60],"qx/decoration/Modern/tabview/tabview-pane-bl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-br.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-120],"qx/decoration/Modern/tabview/tabview-pane-c.png":[20,2,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-l.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-r.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",-30,0],"qx/decoration/Modern/tabview/tabview-pane-t.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-150],"qx/decoration/Modern/tabview/tabview-pane-tl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-90],"qx/decoration/Modern/tabview/tabview-pane-tr.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-30],"qx/decoration/Modern/tabview/tabview-pane.png":[185,250,"png","qx"],"qx/decoration/Modern/toolbar-combined.png":[40,130,"png","qx"],"qx/decoration/Modern/toolbar/toolbar-gradient-blue.png":[20,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",0,0],"qx/decoration/Modern/toolbar/toolbar-gradient.png":[20,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",-20,0],"qx/decoration/Modern/toolbar/toolbar-handle-knob.gif":[1,8,"gif","qx"],"qx/decoration/Modern/toolbar/toolbar-part.gif":[7,1,"gif","qx"],"qx/decoration/Modern/tooltip-error-lr-combined.png":[12,18,"png","qx"],"qx/decoration/Modern/tooltip-error-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/tree-combined.png":[32,8,"png","qx"],"qx/decoration/Modern/tree/closed-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",0,0],"qx/decoration/Modern/tree/closed.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-8,0],"qx/decoration/Modern/tree/open-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-24,0],"qx/decoration/Modern/tree/open.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-16,0],"qx/decoration/Modern/window-captionbar-buttons-combined.png":[108,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-active-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-inactive-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-active-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-inactive-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-statusbar-lr-combined.png":[8,7,"png","qx"],"qx/decoration/Modern/window-statusbar-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/window/captionbar-active-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-active-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-active-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-active-c.png":[20,9,"png","qx"],"qx/decoration/Modern/window/captionbar-active-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-active-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-active-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-inactive-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-c.png":[20,9,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-inactive-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-inactive-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-inactive-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-6],"qx/decoration/Modern/window/close-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-72,0],"qx/decoration/Modern/window/close-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-54,0],"qx/decoration/Modern/window/close-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-63,0],"qx/decoration/Modern/window/maximize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-45,0],"qx/decoration/Modern/window/maximize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-81,0],"qx/decoration/Modern/window/maximize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-18,0],"qx/decoration/Modern/window/minimize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-9,0],"qx/decoration/Modern/window/minimize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-90,0],"qx/decoration/Modern/window/minimize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-36,0],"qx/decoration/Modern/window/restore-active-hovered.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-99,0],"qx/decoration/Modern/window/restore-active.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",0,0],"qx/decoration/Modern/window/restore-inactive.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-27,0],"qx/decoration/Modern/window/statusbar-b.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,0],"qx/decoration/Modern/window/statusbar-bl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-4],"qx/decoration/Modern/window/statusbar-br.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-20],"qx/decoration/Modern/window/statusbar-c.png":[20,7,"png","qx"],"qx/decoration/Modern/window/statusbar-l.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",-4,0],"qx/decoration/Modern/window/statusbar-r.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",0,0],"qx/decoration/Modern/window/statusbar-t.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-16],"qx/decoration/Modern/window/statusbar-tl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-8],"qx/decoration/Modern/window/statusbar-tr.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-12],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-color-chooser.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-document.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/22/mimetypes/office-document.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-open.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder.png":[22,22,"png","qx"],"qx/icon/Tango/32/mimetypes/office-document.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder-open.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder.png":[32,32,"png","qx"],"qx/static/blank.gif":[1,1,"gif","qx"]}};
(function(){var p=".",o="()",n="[Class ",m=".prototype",l="toString",k="qx.Bootstrap",j="]",h="Class";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return n+this.classname+j;
},createNamespace:function(name,d){var f=name.split(p);
var parent=window;
var e=f[0];

for(var i=0,g=f.length-1;i<g;i++,e=f[i]){if(!parent[e]){parent=parent[e]={};
}else{parent=parent[e];
}}parent[e]=d;
return e;
},setDisplayName:function(x,y,name){x.displayName=y+p+name+o;
},setDisplayNames:function(a,b){for(var name in a){var c=a[name];

if(c instanceof Function){c.displayName=b+p+name+o;
}}},define:function(name,q){if(!q){var q={statics:{}};
}var v;
var t=null;
qx.Bootstrap.setDisplayNames(q.statics,name);

if(q.members){qx.Bootstrap.setDisplayNames(q.members,name+m);
v=q.construct||new Function;
var r=q.statics;

for(var s in r){v[s]=r[s];
}t=v.prototype;
var w=q.members;

for(var s in w){t[s]=w[s];
}}else{v=q.statics||{};
}var u=this.createNamespace(name,v);
v.name=v.classname=name;
v.basename=u;
v.$$type=h;
if(!v.hasOwnProperty(l)){v.toString=this.genericToString;
}if(q.defer){q.defer(v,t);
}qx.Bootstrap.$$registry[name]=q.statics;
return v;
}};
qx.Bootstrap.define(k,{statics:{LOADSTART:qx.$$start||new Date(),createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,getByName:function(name){return this.$$registry[name];
},$$registry:{}}});
})();
(function(){var m="qx.allowUrlSettings",l="&",k="qx.core.Setting",j="qx.allowUrlVariants",h="qx.propertyDebugLevel",g="qxsetting",f=":",e=".";
qx.Bootstrap.define(k,{statics:{__a:{},define:function(b,c){if(c===undefined){throw new Error('Default value of setting "'+b+'" must be defined!');
}
if(!this.__a[b]){this.__a[b]={};
}else if(this.__a[b].defaultValue!==undefined){throw new Error('Setting "'+b+'" is already defined!');
}this.__a[b].defaultValue=c;
},get:function(p){var q=this.__a[p];

if(q===undefined){throw new Error('Setting "'+p+'" is not defined.');
}
if(q.value!==undefined){return q.value;
}return q.defaultValue;
},set:function(n,o){if((n.split(e)).length<2){throw new Error('Malformed settings key "'+n+'". Must be following the schema "namespace.key".');
}
if(!this.__a[n]){this.__a[n]={};
}this.__a[n].value=o;
},__b:function(){if(window.qxsettings){for(var d in window.qxsettings){this.set(d,window.qxsettings[d]);
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(a){}this.__c();
}},__c:function(){if(this.get(m)!=true){return;
}var t=document.location.search.slice(1).split(l);

for(var i=0;i<t.length;i++){var s=t[i].split(f);

if(s.length!=3||s[0]!=g){continue;
}this.set(s[1],decodeURIComponent(s[2]));
}}},defer:function(r){r.define(m,false);
r.define(j,false);
r.define(h,0);
r.__b();
}});
})();
(function(){var s="gecko",r="1.9.0.0",q=".",p="[object Opera]",o="function",n="[^\\.0-9]",m="525.26",l="",k="mshtml",j="AppleWebKit/",d="unknown",i="9.6.0",g="4.0",c="Gecko",b="opera",f="webkit",e="0.0.0",h="8.0",a="qx.bom.client.Engine";
qx.Bootstrap.define(a,{statics:{NAME:"",FULLVERSION:"0.0.0",VERSION:0.0,OPERA:false,WEBKIT:false,GECKO:false,MSHTML:false,UNKNOWN_ENGINE:false,UNKNOWN_VERSION:false,DOCUMENT_MODE:null,__d:function(){var u=d;
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
}},defer:function(t){t.__d();
}});
})();
(function(){var E="on",D="off",C="|",B="default",A="object",z="&",y="qx.aspects",x="$",w="qx.allowUrlVariants",u="qx.debug",o="qx.client",t="qx.dynlocale",r="webkit",n="qxvariant",m="opera",q=":",p="qx.core.Variant",s="mshtml",k="gecko";
qx.Bootstrap.define(p,{statics:{__e:{},__f:{},compilerIsSet:function(){return true;
},define:function(F,G,H){{};

if(!this.__e[F]){this.__e[F]={};
}else{}this.__e[F].allowedValues=G;
this.__e[F].defaultValue=H;
},get:function(O){var P=this.__e[O];
{};

if(P.value!==undefined){return P.value;
}return P.defaultValue;
},__g:function(){if(window.qxvariants){for(var Q in qxvariants){{};

if(!this.__e[Q]){this.__e[Q]={};
}this.__e[Q].value=qxvariants[Q];
}window.qxvariants=undefined;

try{delete window.qxvariants;
}catch(K){}this.__h(this.__e);
}},__h:function(){if(qx.core.Setting.get(w)!=true){return;
}var L=document.location.search.slice(1).split(z);

for(var i=0;i<L.length;i++){var M=L[i].split(q);

if(M.length!=3||M[0]!=n){continue;
}var N=M[1];

if(!this.__e[N]){this.__e[N]={};
}this.__e[N].value=decodeURIComponent(M[2]);
}},select:function(g,h){{};

for(var j in h){if(this.isSet(g,j)){return h[j];
}}
if(h[B]!==undefined){return h[B];
}{};
},isSet:function(a,b){var c=a+x+b;

if(this.__f[c]!==undefined){return this.__f[c];
}var e=false;
if(b.indexOf(C)<0){e=this.get(a)===b;
}else{var d=b.split(C);

for(var i=0,l=d.length;i<l;i++){if(this.get(a)===d[i]){e=true;
break;
}}}this.__f[c]=e;
return e;
},__i:function(v){return typeof v===A&&v!==null&&v instanceof Array;
},__j:function(v){return typeof v===A&&v!==null&&!(v instanceof Array);
},__k:function(I,J){for(var i=0,l=I.length;i<l;i++){if(I[i]==J){return true;
}}return false;
}},defer:function(f){f.define(o,[k,s,m,r],qx.bom.client.Engine.NAME);
f.define(u,[E,D],E);
f.define(y,[E,D],D);
f.define(t,[E,D],E);
f.__g();
}});
})();
(function(){var J="qx.client",I='"',H="valueOf",G="toLocaleString",F="isPrototypeOf",E="",D="toString",C="qx.lang.Object",B='\", "',A="hasOwnProperty";
qx.Bootstrap.define(C,{statics:{empty:function(W){{};

for(var X in W){if(W.hasOwnProperty(X)){delete W[X];
}}},isEmpty:qx.core.Variant.select(J,{"gecko":function(s){{};
return s.__count__===0;
},"default":function(Y){{};

for(var ba in Y){return false;
}return true;
}}),hasMinLength:qx.core.Variant.select(J,{"gecko":function(P,Q){{};
return P.__count__>=Q;
},"default":function(M,N){{};

if(N<=0){return true;
}var length=0;

for(var O in M){if((++length)>=N){return true;
}}return false;
}}),getLength:qx.core.Variant.select(J,{"gecko":function(r){{};
return r.__count__;
},"default":function(R){{};
var length=0;

for(var S in R){length++;
}return length;
}}),_shadowedKeys:[F,A,G,D,H],getKeys:qx.core.Variant.select(J,{"mshtml":function(w){var x=[];

for(var z in w){x.push(z);
}var y=Object.prototype.hasOwnProperty;

for(var i=0,a=this._shadowedKeys,l=a.length;i<l;i++){if(y.call(w,a[i])){x.push(a[i]);
}}return x;
},"default":function(bd){var be=[];

for(var bf in bd){be.push(bf);
}return be;
}}),getKeysAsString:function(e){{};
var f=qx.lang.Object.getKeys(e);

if(f.length==0){return E;
}return I+f.join(B)+I;
},getValues:function(b){{};
var d=[];
var c=this.getKeys(b);

for(var i=0,l=c.length;i<l;i++){d.push(b[c[i]]);
}return d;
},mergeWith:function(j,k,m){{};

if(m===undefined){m=true;
}
for(var n in k){if(m||j[n]===undefined){j[n]=k[n];
}}return j;
},carefullyMergeWith:function(K,L){{};
return qx.lang.Object.mergeWith(K,L,false);
},merge:function(T,U){{};
var V=arguments.length;

for(var i=1;i<V;i++){qx.lang.Object.mergeWith(T,arguments[i]);
}return T;
},clone:function(bg){{};
var bh={};

for(var bi in bg){bh[bi]=bg[bi];
}return bh;
},invert:function(o){{};
var p={};

for(var q in o){p[o[q].toString()]=q;
}return p;
},getKeyFromValue:function(t,u){{};

for(var v in t){if(t.hasOwnProperty(v)&&t[v]===u){return v;
}}return null;
},contains:function(bb,bc){{};
return this.getKeyFromValue(bb,bc)!==null;
},select:function(g,h){{};
return h[g];
},fromArray:function(bj){{};
var bk={};

for(var i=0,l=bj.length;i<l;i++){{};
bk[bj[i].toString()]=true;
}return bk;
}}});
})();
(function(){var p="Function",o="Boolean",n="Error",m="Number",l="Array",k="Date",j="RegExp",i="String",h="Object",g="qx.lang.Type",f="string";
qx.Bootstrap.define(g,{statics:{__l:{"[object String]":i,"[object Array]":l,"[object Object]":h,"[object RegExp]":j,"[object Number]":m,"[object Boolean]":o,"[object Date]":k,"[object Function]":p,"[object Error]":n},getClass:function(s){var t=Object.prototype.toString.call(s);
return (this.__l[t]||t.slice(8,-1));
},isString:function(d){return (d!==null&&(typeof d===f||this.getClass(d)==i||d instanceof String||(!!d&&!!d.$$isString)));
},isArray:function(r){return (r!==null&&(r instanceof Array||(r&&qx.Class.hasInterface(r.constructor,qx.data.IListData))||this.getClass(r)==l||(!!r&&!!r.$$isArray)));
},isObject:function(q){return (q!==undefined&&q!==null&&this.getClass(q)==h);
},isRegExp:function(a){return this.getClass(a)==j;
},isNumber:function(c){return (c!==null&&(this.getClass(c)==m||c instanceof Number));
},isBoolean:function(b){return (b!==null&&(this.getClass(b)==o||b instanceof Boolean));
},isDate:function(v){return (v!==null&&(this.getClass(v)==k||v instanceof Date));
},isError:function(e){return (e!==null&&(this.getClass(e)==n||e instanceof Error));
},isFunction:function(u){return this.getClass(u)==p;
}}});
})();
(function(){var d="qx.core.Aspect",c="before",b="*",a="static";
qx.Bootstrap.define(d,{statics:{__m:[],wrap:function(j,k,l){var q=[];
var m=[];
var p=this.__m;
var o;

for(var i=0;i<p.length;i++){o=p[i];

if((o.type==null||l==o.type||o.type==b)&&(o.name==null||j.match(o.name))){o.pos==-1?q.push(o.fcn):m.push(o.fcn);
}}
if(q.length===0&&m.length===0){return k;
}var n=function(){for(var i=0;i<q.length;i++){q[i].call(this,j,k,l,arguments);
}var h=k.apply(this,arguments);

for(var i=0;i<m.length;i++){m[i].call(this,j,k,l,arguments,h);
}return h;
};

if(l!==a){n.self=k.self;
n.base=k.base;
}k.wrapper=n;
n.original=k;
return n;
},addAdvice:function(e,f,g,name){this.__m.push({fcn:e,pos:f===c?-1:1,type:g,name:name});
}}});
})();
(function(){var bT="qx.aspects",bS="on",bR=".",bQ="static",bP="[Class ",bO="]",bN="toString",bM="constructor",bL="member",bK="$$init_",bE=".prototype",bJ="destructor",bH="extend",bD="destruct",bC="Class",bG="off",bF="qx.Class",bI="qx.event.type.Data";
qx.Bootstrap.define(bF,{statics:{define:function(name,b){if(!b){var b={};
}if(b.include&&!(b.include instanceof Array)){b.include=[b.include];
}if(b.implement&&!(b.implement instanceof Array)){b.implement=[b.implement];
}if(!b.hasOwnProperty(bH)&&!b.type){b.type=bQ;
}{};
var d=this.__r(name,b.type,b.extend,b.statics,b.construct,b.destruct);
if(b.extend){if(b.properties){this.__t(d,b.properties,true);
}if(b.members){this.__v(d,b.members,true,true,false);
}if(b.events){this.__s(d,b.events,true);
}if(b.include){for(var i=0,l=b.include.length;i<l;i++){this.__y(d,b.include[i],false);
}}}if(b.settings){for(var c in b.settings){qx.core.Setting.define(c,b.settings[c]);
}}if(b.variants){for(var c in b.variants){qx.core.Variant.define(c,b.variants[c].allowedValues,b.variants[c].defaultValue);
}}if(b.implement){for(var i=0,l=b.implement.length;i<l;i++){this.__x(d,b.implement[i]);
}}{};
if(b.defer){b.defer.self=d;
b.defer(d,d.prototype,{add:function(name,g){var h={};
h[name]=g;
qx.Class.__t(d,h,true);
}});
}return d;
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},getByName:function(name){return this.$$registry[name];
},include:function(L,M){{};
qx.Class.__y(L,M,false);
},patch:function(D,E){{};
qx.Class.__y(D,E,true);
},isSubClassOf:function(e,f){if(!e){return false;
}
if(e==f){return true;
}
if(e.prototype instanceof f){return true;
}return false;
},getPropertyDefinition:function(by,name){while(by){if(by.$$properties&&by.$$properties[name]){return by.$$properties[name];
}by=by.superclass;
}return null;
},getProperties:function(B){var C=[];

while(B){if(B.$$properties){C.push.apply(C,qx.lang.Object.getKeys(B.$$properties));
}B=B.superclass;
}return C;
},getByProperty:function(j,name){while(j){if(j.$$properties&&j.$$properties[name]){return j;
}j=j.superclass;
}return null;
},hasProperty:function(F,name){return !!this.getPropertyDefinition(F,name);
},getEventType:function(v,name){var v=v.constructor;

while(v.superclass){if(v.$$events&&v.$$events[name]!==undefined){return v.$$events[name];
}v=v.superclass;
}return null;
},supportsEvent:function(s,name){return !!this.getEventType(s,name);
},hasOwnMixin:function(bj,bk){return bj.$$includes&&bj.$$includes.indexOf(bk)!==-1;
},getByMixin:function(bp,bq){var br,i,l;

while(bp){if(bp.$$includes){br=bp.$$flatIncludes;

for(i=0,l=br.length;i<l;i++){if(br[i]===bq){return bp;
}}}bp=bp.superclass;
}return null;
},getMixins:function(be){var bf=[];

while(be){if(be.$$includes){bf.push.apply(bf,be.$$flatIncludes);
}be=be.superclass;
}return bf;
},hasMixin:function(bz,bA){return !!this.getByMixin(bz,bA);
},hasOwnInterface:function(P,Q){return P.$$implements&&P.$$implements.indexOf(Q)!==-1;
},getByInterface:function(w,x){var y,i,l;

while(w){if(w.$$implements){y=w.$$flatImplements;

for(i=0,l=y.length;i<l;i++){if(y[i]===x){return w;
}}}w=w.superclass;
}return null;
},getInterfaces:function(t){var u=[];

while(t){if(t.$$implements){u.push.apply(u,t.$$flatImplements);
}t=t.superclass;
}return u;
},hasInterface:function(bY,ca){return !!this.getByInterface(bY,ca);
},implementsInterface:function(cj,ck){var cl=cj.constructor;

if(this.hasInterface(cl,ck)){return true;
}
try{qx.Interface.assertObject(cj,ck);
return true;
}catch(bB){}
try{qx.Interface.assert(cl,ck,false);
return true;
}catch(bx){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return bP+this.classname+bO;
},$$registry:qx.Bootstrap.$$registry,__n:null,__o:null,__p:function(){},__q:function(){},__r:function(name,R,S,T,U,V){var bb;

if(!S&&qx.core.Variant.isSet(bT,bG)){bb=T||{};
qx.Bootstrap.setDisplayNames(bb,name);
}else{bb={};

if(S){if(!U){U=this.__z();
}bb=this.__B(U,name,R);
qx.Bootstrap.setDisplayName(U,name,bM);
}if(T){qx.Bootstrap.setDisplayNames(T,name);
var bc;

for(var i=0,a=qx.lang.Object.getKeys(T),l=a.length;i<l;i++){bc=a[i];
var X=T[bc];

if(qx.core.Variant.isSet(bT,bS)){if(X instanceof Function){X=qx.core.Aspect.wrap(name+bR+bc,X,bQ);
}bb[bc]=X;
}else{bb[bc]=X;
}}}}var ba=qx.Bootstrap.createNamespace(name,bb,false);
bb.name=bb.classname=name;
bb.basename=ba;
bb.$$type=bC;

if(R){bb.$$classtype=R;
}if(!bb.hasOwnProperty(bN)){bb.toString=this.genericToString;
}
if(S){var bd=S.prototype;
var W=this.__A();
W.prototype=bd;
var Y=new W;
bb.prototype=Y;
Y.name=Y.classname=name;
Y.basename=ba;
U.base=bb.superclass=S;
U.self=bb.constructor=Y.constructor=bb;
if(V){if(qx.core.Variant.isSet(bT,bS)){V=qx.core.Aspect.wrap(name,V,bJ);
}bb.$$destructor=V;
qx.Bootstrap.setDisplayName(V,name,bD);
}}this.$$registry[name]=bb;
return bb;
},__s:function(o,p,q){var r,r;
{};

if(o.$$events){for(var r in p){o.$$events[r]=p[r];
}}else{o.$$events=p;
}},__t:function(G,H,I){var K;

if(I===undefined){I=false;
}var J=!!G.$$propertiesAttached;

for(var name in H){K=H[name];
{};
K.name=name;
if(!K.refine){if(G.$$properties===undefined){G.$$properties={};
}G.$$properties[name]=K;
}if(K.init!==undefined){G.prototype[bK+name]=K.init;
}if(K.event!==undefined){var event={};
event[K.event]=bI;
this.__s(G,event,I);
}if(K.inheritable){qx.core.Property.$$inheritable[name]=true;
}if(J){qx.core.Property.attachMethods(G,name,K);
}}},__u:null,__v:function(cb,cc,cd,ce,cf){var cg=cb.prototype;
var ci,ch;
qx.Bootstrap.setDisplayNames(cc,cb.classname+bE);

for(var i=0,a=qx.lang.Object.getKeys(cc),l=a.length;i<l;i++){ci=a[i];
ch=cc[ci];
{};
if(ce!==false&&ch instanceof Function&&ch.$$type==null){if(cf==true){ch=this.__w(ch,cg[ci]);
}else{if(cg[ci]){ch.base=cg[ci];
}ch.self=cb;
}
if(qx.core.Variant.isSet(bT,bS)){ch=qx.core.Aspect.wrap(cb.classname+bR+ci,ch,bL);
}}cg[ci]=ch;
}},__w:function(N,O){if(O){return function(){var A=N.base;
N.base=O;
var z=N.apply(this,arguments);
N.base=A;
return z;
};
}else{return N;
}},__x:function(bg,bh){{};
var bi=qx.Interface.flatten([bh]);

if(bg.$$implements){bg.$$implements.push(bh);
bg.$$flatImplements.push.apply(bg.$$flatImplements,bi);
}else{bg.$$implements=[bh];
bg.$$flatImplements=bi;
}},__y:function(bs,bt,bu){{};

if(this.hasMixin(bs,bt)){return;
}var bw=qx.Mixin.flatten([bt]);
var bv;

for(var i=0,l=bw.length;i<l;i++){bv=bw[i];
if(bv.$$events){this.__s(bs,bv.$$events,bu);
}if(bv.$$properties){this.__t(bs,bv.$$properties,bu);
}if(bv.$$members){this.__v(bs,bv.$$members,bu,bu,bu);
}}if(bs.$$includes){bs.$$includes.push(bt);
bs.$$flatIncludes.push.apply(bs.$$flatIncludes,bw);
}else{bs.$$includes=[bt];
bs.$$flatIncludes=bw;
}},__z:function(){function bX(){arguments.callee.base.apply(this,arguments);
}return bX;
},__A:function(){return function(){};
},__B:function(bl,name,bm){var bo=function(){var n=arguments.callee.constructor;
{};
if(!n.$$propertiesAttached){qx.core.Property.attach(n);
}var m=n.$$original.apply(this,arguments);
if(n.$$includes){var k=n.$$flatIncludes;

for(var i=0,l=k.length;i<l;i++){if(k[i].$$constructor){k[i].$$constructor.apply(this,arguments);
}}}if(this.classname===name.classname){this.$$initialized=true;
}return m;
};

if(qx.core.Variant.isSet("qx.aspects","on")){var bn=qx.core.Aspect.wrap(name,bo,"constructor");
bo.$$original=bl;
bo.constructor=bn;
bo=bn;
}if(bm==="singleton"){bo.getInstance=this.getInstance;
}bo.$$original=bl;
bl.wrapper=bo;
return bo;
}},defer:function(bU){if(qx.core.Variant.isSet(bT,bS)){for(var bV in qx.Bootstrap.$$registry){var bU=qx.Bootstrap.$$registry[bV];

for(var bW in bU){if(bU[bW] instanceof Function){bU[bW]=qx.core.Aspect.wrap(bV+bR+bW,bU[bW],bQ);
}}}}}});
})();
(function(){var h="]",g="Theme",f="[Theme ",e="qx.Theme";
qx.Class.define(e,{statics:{define:function(name,b){if(!b){var b={};
}b.include=this.__C(b.include);
b.patch=this.__C(b.patch);
{};
var c={$$type:g,name:name,title:b.title,toString:this.genericToString};
if(b.extend){c.supertheme=b.extend;
}c.basename=qx.Bootstrap.createNamespace(name,c);
this.__F(c,b);
this.__D(c,b);
this.$$registry[name]=c;
for(var i=0,a=b.include,l=a.length;i<l;i++){this.include(c,a[i]);
}
for(var i=0,a=b.patch,l=a.length;i<l;i++){this.patch(c,a[i]);
}},__C:function(d){if(!d){return [];
}
if(qx.lang.Type.isArray(d)){return d;
}else{return [d];
}},__D:function(r,s){var t=s.aliases||{};

if(s.extend&&s.extend.aliases){qx.lang.Object.mergeWith(t,s.extend.aliases,false);
}r.aliases=t;
},getAll:function(){return this.$$registry;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},genericToString:function(){return f+this.name+h;
},__E:function(G){for(var i=0,H=this.__G,l=H.length;i<l;i++){if(G[H[i]]){return H[i];
}}},__F:function(j,k){var o=this.__E(k);
if(k.extend&&!o){o=k.extend.type;
}j.type=o||"other";
if(!o){return;
}var q=function(){};
if(k.extend){q.prototype=new k.extend.$$clazz;
}var p=q.prototype;
var n=k[o];
for(var m in n){p[m]=n[m];
if(p[m].base){{};
p[m].base=k.extend;
}}j.$$clazz=q;
j[o]=new q;
},$$registry:{},__G:["colors","borders","decorations","fonts","icons","widgets","appearances","meta"],__H:null,__I:null,__J:function(){},patch:function(A,B){var D=this.__E(B);

if(D!==this.__E(A)){throw new Error("The mixins '"+A.name+"' are not compatible '"+B.name+"'!");
}var C=B[D];
var E=A.$$clazz.prototype;

for(var F in C){E[F]=C[F];
}},include:function(u,v){var x=v.type;

if(x!==u.type){throw new Error("The mixins '"+u.name+"' are not compatible '"+v.name+"'!");
}var w=v[x];
var y=u.$$clazz.prototype;

for(var z in w){if(y[z]!==undefined){continue;
}y[z]=w[z];
}}}});
})();
(function(){var j="#CCCCCC",i="#F3F3F3",h="#E4E4E4",g="#1a1a1a",f="#084FAB",e="gray",d="#fffefe",c="white",b="#4a4a4a",a="#EEEEEE",K="#80B4EF",J="#C72B2B",I="#ffffdd",H="#334866",G="#00204D",F="#666666",E="#CBC8CD",D="#99C3FE",C="#808080",B="#F4F4F4",q="#001533",r="#909090",o="#FCFCFC",p="#314a6e",m="#B6B6B6",n="#0880EF",k="#4d4d4d",l="#DFDFDF",s="#000000",t="#FF9999",w="#7B7A7E",v="#26364D",y="#990000",x="#AFAFAF",A="#404955",z="#AAAAAA",u="qx.theme.modern.Color";
qx.Theme.define(u,{colors:{"background-application":l,"background-pane":i,"background-light":o,"background-medium":a,"background-splitpane":x,"background-tip":I,"background-tip-error":J,"background-odd":h,"text-light":r,"text-gray":b,"text-label":g,"text-title":p,"text-input":s,"text-hovered":q,"text-disabled":w,"text-selected":d,"text-active":v,"text-inactive":A,"text-placeholder":E,"border-main":k,"border-separator":C,"border-input":H,"border-disabled":m,"border-pane":G,"border-button":F,"border-column":j,"border-focused":D,"invalid":y,"border-focused-invalid":t,"table-pane":i,"table-focus-indicator":n,"table-row-background-focused-selected":f,"table-row-background-focused":K,"table-row-background-selected":f,"table-row-background-even":i,"table-row-background-odd":h,"table-row-selected":d,"table-row":g,"table-row-line":j,"table-column-line":j,"progressive-table-header":z,"progressive-table-row-background-even":B,"progressive-table-row-background-odd":h,"progressive-progressbar-background":e,"progressive-progressbar-indicator-done":j,"progressive-progressbar-indicator-undone":c,"progressive-progressbar-percent-background":e,"progressive-progressbar-percent-text":c}});
})();
(function(){var a="gui4.theme.Color";
qx.Theme.define(a,{extend:qx.theme.modern.Color,colors:{}});
})();
(function(){var ca=';',bY='computed=this.',bX='=value;',bW='this.',bV='if(this.',bU='!==undefined)',bT='delete this.',bS="set",bR="setThemed",bQ='}',bF="init",bE="setRuntime",bD='else if(this.',bC='return this.',bB="string",bA="boolean",bz="resetThemed",by='!==undefined){',bx='=true;',bw="resetRuntime",ch="reset",ci="refresh",cf='old=this.',cg='else ',cd='if(old===undefined)old=this.',ce='old=computed=this.',cb=' of an instance of ',cc=";",cj='if(old===computed)return value;',ck='if(old===undefined)old=null;',bJ='(value);',bI=' is not (yet) ready!");',bL='===value)return value;',bK='return init;',bN='var init=this.',bM="Error in property ",bP='var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){',bO='.validate.call(this, value);',bH='else{',bG=" in method ",I='=computed;',J='(backup);',K='if(computed===inherit){',L="inherit",M='if(value===undefined)prop.error(this,2,"',N='var computed, old=this.',O='else if(computed===undefined)',P="': ",Q=" of class ",R='===undefined)return;',co="')){",cn='else this.',cm='value=this.',cl='","',cs='if(init==qx.core.Property.$$inherit)init=null;',cr='var inherit=prop.$$inherit;',cq='var computed, old;',cp='computed=undefined;delete this.',cu='",value);',ct='computed=value;',bh=';}',bi='){',bf='if(computed===undefined||computed===inherit){',bg='!==inherit){',bl='(computed, old, "',bm='return value;',bj='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',bk="if(reg.hasListener(this, '",bd=')a[i].',be='.$$properties.',ba="var reg=qx.event.Registration;",Y='return null;',bc='");',bb='var pa=this.getLayoutParent();if(pa)computed=pa.',V='!==undefined&&',U="', qx.event.type.Data, [computed, old]",X='var backup=computed;',W='}else{',T="object",S='if(computed===undefined)computed=null;',br='if(a[i].',bs='throw new Error("Property ',bt=")}",bu='var prop=qx.core.Property;',bn=" with incoming value '",bo='if(computed===undefined||computed==inherit)computed=null;',bp='if((computed===undefined||computed===inherit)&&',bq="reg.fireEvent(this, '",bv="qx.core.Property";
qx.Bootstrap.define(bv,{statics:{__K:{"Boolean":'qx.core.Assert.assertBoolean(value, msg) || true',"String":'qx.core.Assert.assertString(value, msg) || true',"Number":'qx.core.Assert.assertNumber(value, msg) || true',"Integer":'qx.core.Assert.assertInteger(value, msg) || true',"PositiveNumber":'qx.core.Assert.assertPositiveNumber(value, msg) || true',"PositiveInteger":'qx.core.Assert.assertPositiveInteger(value, msg) || true',"Error":'qx.core.Assert.assertInstance(value, Error, msg) || true',"RegExp":'qx.core.Assert.assertInstance(value, RegExp, msg) || true',"Object":'qx.core.Assert.assertObject(value, msg) || true',"Array":'qx.core.Assert.assertArray(value, msg) || true',"Map":'qx.core.Assert.assertMap(value, msg) || true',"Function":'qx.core.Assert.assertFunction(value, msg) || true',"Date":'qx.core.Assert.assertInstance(value, Date, msg) || true',"Node":'value !== null && value.nodeType !== undefined',"Element":'value !== null && value.nodeType === 1 && value.attributes',"Document":'value !== null && value.nodeType === 9 && value.documentElement',"Window":'value !== null && value.document',"Event":'value !== null && value.type !== undefined',"Class":'value !== null && value.$$type === "Class"',"Mixin":'value !== null && value.$$type === "Mixin"',"Interface":'value !== null && value.$$type === "Interface"',"Theme":'value !== null && value.$$type === "Theme"',"Color":'qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',"Decorator":'value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',"Font":'value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)'},__L:{"Object":true,"Array":true,"Map":true,"Function":true,"Date":true,"Node":true,"Element":true,"Document":true,"Window":true,"Event":true,"Class":true,"Mixin":true,"Interface":true,"Theme":true,"Font":true,"Decorator":true},$$inherit:L,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:bB,dispose:bA,inheritable:bA,nullable:bA,themeable:bA,refine:bA,init:null,apply:bB,event:bB,check:null,transform:bB,deferredInit:bA,validate:null},$$allowedGroupKeys:{name:bB,group:T,mode:bB,themeable:bA},$$inheritable:{},refresh:function(cv){var parent=cv.getLayoutParent();

if(parent){var cy=cv.constructor;
var cA=this.$$store.inherit;
var cz=this.$$store.init;
var cx=this.$$method.refresh;
var cB;
var cw;
{};

while(cy){cB=cy.$$properties;

if(cB){for(var name in this.$$inheritable){if(cB[name]&&cv[cx[name]]){cw=parent[cA[name]];

if(cw===undefined){cw=parent[cz[name]];
}{};
cv[cx[name]](cw);
}}}cy=cy.superclass;
}}},attach:function(da){var db=da.$$properties;

if(db){for(var name in db){this.attachMethods(da,name,db[name]);
}}da.$$propertiesAttached=true;
},attachMethods:function(cP,name,cQ){cQ.group?this.__M(cP,cQ,name):this.__N(cP,cQ,name);
},__M:function(b,c,name){var k=qx.lang.String.firstUp(name);
var j=b.prototype;
var m=c.themeable===true;
{};
var n=[];
var f=[];

if(m){var d=[];
var h=[];
}var g="var a=arguments[0] instanceof Array?arguments[0]:arguments;";
n.push(g);

if(m){d.push(g);
}
if(c.mode=="shorthand"){var e="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));";
n.push(e);

if(m){d.push(e);
}}
for(var i=0,a=c.group,l=a.length;i<l;i++){{};
n.push("this.",this.$$method.set[a[i]],"(a[",i,"]);");
f.push("this.",this.$$method.reset[a[i]],"();");

if(m){{};
d.push("this.",this.$$method.setThemed[a[i]],"(a[",i,"]);");
h.push("this.",this.$$method.resetThemed[a[i]],"();");
}}this.$$method.set[name]="set"+k;
j[this.$$method.set[name]]=new Function(n.join(""));
this.$$method.reset[name]="reset"+k;
j[this.$$method.reset[name]]=new Function(f.join(""));

if(m){this.$$method.setThemed[name]="setThemed"+k;
j[this.$$method.setThemed[name]]=new Function(d.join(""));
this.$$method.resetThemed[name]="resetThemed"+k;
j[this.$$method.resetThemed[name]]=new Function(h.join(""));
}},__N:function(cS,cT,name){var cV=qx.lang.String.firstUp(name);
var cX=cS.prototype;
{};
if(cT.dispose===undefined&&typeof cT.check==="string"){cT.dispose=this.__L[cT.check]||qx.Class.isDefined(cT.check)||qx.Interface.isDefined(cT.check);
}var cW=this.$$method;
var cU=this.$$store;
cU.runtime[name]="$$runtime_"+name;
cU.user[name]="$$user_"+name;
cU.theme[name]="$$theme_"+name;
cU.init[name]="$$init_"+name;
cU.inherit[name]="$$inherit_"+name;
cU.useinit[name]="$$useinit_"+name;
cW.get[name]="get"+cV;
cX[cW.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,cS,name,"get");
};
cW.set[name]="set"+cV;
cX[cW.set[name]]=function(cC){return qx.core.Property.executeOptimizedSetter(this,cS,name,"set",arguments);
};
cW.reset[name]="reset"+cV;
cX[cW.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cS,name,"reset");
};

if(cT.inheritable||cT.apply||cT.event||cT.deferredInit){cW.init[name]="init"+cV;
cX[cW.init[name]]=function(dc){return qx.core.Property.executeOptimizedSetter(this,cS,name,"init",arguments);
};
}
if(cT.inheritable){cW.refresh[name]="refresh"+cV;
cX[cW.refresh[name]]=function(cO){return qx.core.Property.executeOptimizedSetter(this,cS,name,"refresh",arguments);
};
}cW.setRuntime[name]="setRuntime"+cV;
cX[cW.setRuntime[name]]=function(cR){return qx.core.Property.executeOptimizedSetter(this,cS,name,"setRuntime",arguments);
};
cW.resetRuntime[name]="resetRuntime"+cV;
cX[cW.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cS,name,"resetRuntime");
};

if(cT.themeable){cW.setThemed[name]="setThemed"+cV;
cX[cW.setThemed[name]]=function(cY){return qx.core.Property.executeOptimizedSetter(this,cS,name,"setThemed",arguments);
};
cW.resetThemed[name]="resetThemed"+cV;
cX[cW.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cS,name,"resetThemed");
};
}
if(cT.check==="Boolean"){cX["toggle"+cV]=new Function("return this."+cW.set[name]+"(!this."+cW.get[name]+"())");
cX["is"+cV]=new Function("return this."+cW.get[name]+"()");
}},__O:{0:'Could not change or apply init value after constructing phase!',1:'Requires exactly one argument!',2:'Undefined value is not allowed!',3:'Does not allow any arguments!',4:'Null value is not allowed!',5:'Is invalid!'},error:function(v,w,x,y,z){var A=v.constructor.classname;
var B=bM+x+Q+A+bG+this.$$method[y][x]+bn+z+P;
throw new Error(B+(this.__O[w]||"Unknown reason: "+w));
},__P:function(C,D,name,E,F,G){var H=this.$$method[E][name];
{D[H]=new Function("value",F.join(""));
};
if(qx.core.Variant.isSet("qx.aspects","on")){D[H]=qx.core.Aspect.wrap(C.classname+"."+H,D[H],"property");
}qx.Bootstrap.setDisplayName(D[H],C.classname+".prototype",H);
if(G===undefined){return C[H]();
}else{return C[H](G[0]);
}},executeOptimizedGetter:function(o,p,name,q){var s=p.$$properties[name];
var u=p.prototype;
var r=[];
var t=this.$$store;
r.push(bV,t.runtime[name],bU);
r.push(bC,t.runtime[name],ca);

if(s.inheritable){r.push(bD,t.inherit[name],bU);
r.push(bC,t.inherit[name],ca);
r.push(cg);
}r.push(bV,t.user[name],bU);
r.push(bC,t.user[name],ca);

if(s.themeable){r.push(bD,t.theme[name],bU);
r.push(bC,t.theme[name],ca);
}
if(s.deferredInit&&s.init===undefined){r.push(bD,t.init[name],bU);
r.push(bC,t.init[name],ca);
}r.push(cg);

if(s.init!==undefined){if(s.inheritable){r.push(bN,t.init[name],ca);

if(s.nullable){r.push(cs);
}else if(s.init!==undefined){r.push(bC,t.init[name],ca);
}else{r.push(bj,name,cb,p.classname,bI);
}r.push(bK);
}else{r.push(bC,t.init[name],ca);
}}else if(s.inheritable||s.nullable){r.push(Y);
}else{r.push(bs,name,cb,p.classname,bI);
}return this.__P(o,u,name,q,r);
},executeOptimizedSetter:function(cD,cE,name,cF,cG){var cM=cE.$$properties[name];
var cL=cE.prototype;
var cI=[];
var cH=cF===bS||cF===bR||cF===bE||(cF===bF&&cM.init===undefined);
var cJ=cF===ch||cF===bz||cF===bw;
var cK=cM.apply||cM.event||cM.inheritable;

if(cF===bE||cF===bw){var cN=this.$$store.runtime[name];
}else if(cF===bR||cF===bz){var cN=this.$$store.theme[name];
}else if(cF===bF){var cN=this.$$store.init[name];
}else{var cN=this.$$store.user[name];
}{if(!cM.nullable||cM.check||cM.inheritable){cI.push(bu);
}if(cF===bS){cI.push(M,name,cl,cF,cu);
}};
if(cH){if(cM.transform){cI.push(cm,cM.transform,bJ);
}if(cM.validate){if(typeof cM.validate===bB){cI.push(bW,cM.validate,bJ);
}else if(cM.validate instanceof Function){cI.push(cE.classname,be,name);
cI.push(bO);
}}}if(cK){if(cH){cI.push(bV,cN,bL);
}else if(cJ){cI.push(bV,cN,R);
}}if(cM.inheritable){cI.push(cr);
}{};

if(!cK){if(cF===bE){cI.push(bW,this.$$store.runtime[name],bX);
}else if(cF===bw){cI.push(bV,this.$$store.runtime[name],bU);
cI.push(bT,this.$$store.runtime[name],ca);
}else if(cF===bS){cI.push(bW,this.$$store.user[name],bX);
}else if(cF===ch){cI.push(bV,this.$$store.user[name],bU);
cI.push(bT,this.$$store.user[name],ca);
}else if(cF===bR){cI.push(bW,this.$$store.theme[name],bX);
}else if(cF===bz){cI.push(bV,this.$$store.theme[name],bU);
cI.push(bT,this.$$store.theme[name],ca);
}else if(cF===bF&&cH){cI.push(bW,this.$$store.init[name],bX);
}}else{if(cM.inheritable){cI.push(N,this.$$store.inherit[name],ca);
}else{cI.push(cq);
}cI.push(bV,this.$$store.runtime[name],by);

if(cF===bE){cI.push(bY,this.$$store.runtime[name],bX);
}else if(cF===bw){cI.push(bT,this.$$store.runtime[name],ca);
cI.push(bV,this.$$store.user[name],bU);
cI.push(bY,this.$$store.user[name],ca);
cI.push(bD,this.$$store.theme[name],bU);
cI.push(bY,this.$$store.theme[name],ca);
cI.push(bD,this.$$store.init[name],by);
cI.push(bY,this.$$store.init[name],ca);
cI.push(bW,this.$$store.useinit[name],bx);
cI.push(bQ);
}else{cI.push(ce,this.$$store.runtime[name],ca);
if(cF===bS){cI.push(bW,this.$$store.user[name],bX);
}else if(cF===ch){cI.push(bT,this.$$store.user[name],ca);
}else if(cF===bR){cI.push(bW,this.$$store.theme[name],bX);
}else if(cF===bz){cI.push(bT,this.$$store.theme[name],ca);
}else if(cF===bF&&cH){cI.push(bW,this.$$store.init[name],bX);
}}cI.push(bQ);
cI.push(bD,this.$$store.user[name],by);

if(cF===bS){if(!cM.inheritable){cI.push(cf,this.$$store.user[name],ca);
}cI.push(bY,this.$$store.user[name],bX);
}else if(cF===ch){if(!cM.inheritable){cI.push(cf,this.$$store.user[name],ca);
}cI.push(bT,this.$$store.user[name],ca);
cI.push(bV,this.$$store.runtime[name],bU);
cI.push(bY,this.$$store.runtime[name],ca);
cI.push(bV,this.$$store.theme[name],bU);
cI.push(bY,this.$$store.theme[name],ca);
cI.push(bD,this.$$store.init[name],by);
cI.push(bY,this.$$store.init[name],ca);
cI.push(bW,this.$$store.useinit[name],bx);
cI.push(bQ);
}else{if(cF===bE){cI.push(bY,this.$$store.runtime[name],bX);
}else if(cM.inheritable){cI.push(bY,this.$$store.user[name],ca);
}else{cI.push(ce,this.$$store.user[name],ca);
}if(cF===bR){cI.push(bW,this.$$store.theme[name],bX);
}else if(cF===bz){cI.push(bT,this.$$store.theme[name],ca);
}else if(cF===bF&&cH){cI.push(bW,this.$$store.init[name],bX);
}}cI.push(bQ);
if(cM.themeable){cI.push(bD,this.$$store.theme[name],by);

if(!cM.inheritable){cI.push(cf,this.$$store.theme[name],ca);
}
if(cF===bE){cI.push(bY,this.$$store.runtime[name],bX);
}else if(cF===bS){cI.push(bY,this.$$store.user[name],bX);
}else if(cF===bR){cI.push(bY,this.$$store.theme[name],bX);
}else if(cF===bz){cI.push(bT,this.$$store.theme[name],ca);
cI.push(bV,this.$$store.init[name],by);
cI.push(bY,this.$$store.init[name],ca);
cI.push(bW,this.$$store.useinit[name],bx);
cI.push(bQ);
}else if(cF===bF){if(cH){cI.push(bW,this.$$store.init[name],bX);
}cI.push(bY,this.$$store.theme[name],ca);
}else if(cF===ci){cI.push(bY,this.$$store.theme[name],ca);
}cI.push(bQ);
}cI.push(bD,this.$$store.useinit[name],bi);

if(!cM.inheritable){cI.push(cf,this.$$store.init[name],ca);
}
if(cF===bF){if(cH){cI.push(bY,this.$$store.init[name],bX);
}else{cI.push(bY,this.$$store.init[name],ca);
}}else if(cF===bS||cF===bE||cF===bR||cF===ci){cI.push(bT,this.$$store.useinit[name],ca);

if(cF===bE){cI.push(bY,this.$$store.runtime[name],bX);
}else if(cF===bS){cI.push(bY,this.$$store.user[name],bX);
}else if(cF===bR){cI.push(bY,this.$$store.theme[name],bX);
}else if(cF===ci){cI.push(bY,this.$$store.init[name],ca);
}}cI.push(bQ);
if(cF===bS||cF===bE||cF===bR||cF===bF){cI.push(bH);

if(cF===bE){cI.push(bY,this.$$store.runtime[name],bX);
}else if(cF===bS){cI.push(bY,this.$$store.user[name],bX);
}else if(cF===bR){cI.push(bY,this.$$store.theme[name],bX);
}else if(cF===bF){if(cH){cI.push(bY,this.$$store.init[name],bX);
}else{cI.push(bY,this.$$store.init[name],ca);
}cI.push(bW,this.$$store.useinit[name],bx);
}cI.push(bQ);
}}
if(cM.inheritable){cI.push(bf);

if(cF===ci){cI.push(ct);
}else{cI.push(bb,this.$$store.inherit[name],ca);
}cI.push(bp);
cI.push(bW,this.$$store.init[name],V);
cI.push(bW,this.$$store.init[name],bg);
cI.push(bY,this.$$store.init[name],ca);
cI.push(bW,this.$$store.useinit[name],bx);
cI.push(W);
cI.push(bT,this.$$store.useinit[name],bh);
cI.push(bQ);
cI.push(cj);
cI.push(K);
cI.push(cp,this.$$store.inherit[name],ca);
cI.push(bQ);
cI.push(O);
cI.push(bT,this.$$store.inherit[name],ca);
cI.push(cn,this.$$store.inherit[name],I);
cI.push(X);
if(cM.init!==undefined&&cF!==bF){cI.push(cd,this.$$store.init[name],cc);
}else{cI.push(ck);
}cI.push(bo);
}else if(cK){if(cF!==bS&&cF!==bE&&cF!==bR){cI.push(S);
}cI.push(cj);
if(cM.init!==undefined&&cF!==bF){cI.push(cd,this.$$store.init[name],cc);
}else{cI.push(ck);
}}if(cK){if(cM.apply){cI.push(bW,cM.apply,bl,name,bc);
}if(cM.event){cI.push(ba,bk,cM.event,co,bq,cM.event,U,bt);
}if(cM.inheritable&&cL._getChildren){cI.push(bP);
cI.push(br,this.$$method.refresh[name],bd,this.$$method.refresh[name],J);
cI.push(bQ);
}}if(cH){cI.push(bm);
}return this.__P(cD,cL,name,cF,cI,cG);
}}});
})();
(function(){var q="$$hash",p="qx.core.ObjectRegistry";
qx.Bootstrap.define(p,{statics:{inShutDown:false,__Q:{},__R:0,__S:[],register:function(g){var k=this.__Q;

if(!k){return;
}var j=g.$$hash;

if(j==null){var h=this.__S;

if(h.length>0){j=h.pop();
}else{j=(this.__R++).toString(36);
}g.$$hash=j;
}{};
k[j]=g;
},unregister:function(w){var x=w.$$hash;

if(x==null){return;
}var y=this.__Q;

if(y&&y[x]){delete y[x];
this.__S.push(x);
}try{delete w.$$hash;
}catch(v){if(w.removeAttribute){w.removeAttribute(q);
}}},toHashCode:function(m){{};
var o=m.$$hash;

if(o!=null){return o;
}var n=this.__S;

if(n.length>0){o=n.pop();
}else{o=(this.__R++).toString(36);
}return m.$$hash=o;
},clearHashCode:function(t){{};
var u=t.$$hash;

if(u!=null){this.__S.push(u);
try{delete t.$$hash;
}catch(r){if(t.removeAttribute){t.removeAttribute(q);
}}}},fromHashCode:function(z){return this.__Q[z]||null;
},shutdown:function(){this.inShutDown=true;
var d=this.__Q;
var f=[];

for(var e in d){f.push(e);
}f.sort(function(a,b){return parseInt(b,36)-parseInt(a,36);
});
var c,i=0,l=f.length;

while(true){try{for(;i<l;i++){e=f[i];
c=d[e];

if(c&&c.dispose){c.dispose();
}}}catch(s){qx.log.Logger.error(this,"Could not dispose object "+c.toString()+": "+s);

if(i!==l){i++;
continue;
}}break;
}qx.log.Logger.debug(this,"Disposed "+l+" objects");
delete this.__Q;
},getRegistry:function(){return this.__Q;
}}});
})();
(function(){var g="qx.Mixin",f=".prototype",e="constructor",d="[Mixin ",c="]",b="destruct",a="Mixin";
qx.Bootstrap.define(g,{statics:{define:function(name,m){if(m){if(m.include&&!(m.include instanceof Array)){m.include=[m.include];
}{};
var o=m.statics?m.statics:{};
qx.Bootstrap.setDisplayNames(o,name);

for(var n in o){if(o[n] instanceof Function){o[n].$$mixin=o;
}}if(m.construct){o.$$constructor=m.construct;
qx.Bootstrap.setDisplayName(m.construct,name,e);
}
if(m.include){o.$$includes=m.include;
}
if(m.properties){o.$$properties=m.properties;
}
if(m.members){o.$$members=m.members;
qx.Bootstrap.setDisplayNames(m.members,name+f);
}
for(var n in o.$$members){if(o.$$members[n] instanceof Function){o.$$members[n].$$mixin=o;
}}
if(m.events){o.$$events=m.events;
}
if(m.destruct){o.$$destructor=m.destruct;
qx.Bootstrap.setDisplayName(m.destruct,name,b);
}}else{var o={};
}o.$$type=a;
o.name=name;
o.toString=this.genericToString;
o.basename=qx.Bootstrap.createNamespace(name,o);
this.$$registry[name]=o;
return o;
},checkCompatibility:function(p){var s=this.flatten(p);
var t=s.length;

if(t<2){return true;
}var w={};
var v={};
var u={};
var r;

for(var i=0;i<t;i++){r=s[i];

for(var q in r.events){if(u[q]){throw new Error('Conflict between mixin "'+r.name+'" and "'+u[q]+'" in member "'+q+'"!');
}u[q]=r.name;
}
for(var q in r.properties){if(w[q]){throw new Error('Conflict between mixin "'+r.name+'" and "'+w[q]+'" in property "'+q+'"!');
}w[q]=r.name;
}
for(var q in r.members){if(v[q]){throw new Error('Conflict between mixin "'+r.name+'" and "'+v[q]+'" in member "'+q+'"!');
}v[q]=r.name;
}}return true;
},isCompatible:function(h,j){var k=qx.Class.getMixins(j);
k.push(h);
return qx.Mixin.checkCompatibility(k);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},flatten:function(x){if(!x){return [];
}var y=x.concat();

for(var i=0,l=x.length;i<l;i++){if(x[i].$$includes){y.push.apply(y,this.flatten(x[i].$$includes));
}}return y;
},genericToString:function(){return d+this.name+c;
},$$registry:{},__T:null,__U:function(){}}});
})();
(function(){var a="qx.data.MBinding";
qx.Mixin.define(a,{members:{bind:function(b,c,d,e){return qx.data.SingleValueBinding.bind(this,b,c,d,e);
},removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
})();
(function(){var q="qx.client",p="on",o="mousedown",n="qx.bom.Event",m="mouseover",l="HTMLEvents";
qx.Bootstrap.define(n,{statics:{addNativeListener:qx.core.Variant.select(q,{"mshtml":function(s,t,u){s.attachEvent(p+t,u);
},"default":function(d,f,g){d.addEventListener(f,g,false);
}}),removeNativeListener:qx.core.Variant.select(q,{"mshtml":function(h,i,j){h.detachEvent(p+i,j);
},"default":function(a,b,c){a.removeEventListener(b,c,false);
}}),getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:qx.core.Variant.select(q,{"mshtml":function(e){if(e.type===m){return e.fromEvent;
}else{return e.toElement;
}},"gecko":function(e){try{e.relatedTarget&&e.relatedTarget.nodeType;
}catch(e){return null;
}return e.relatedTarget;
},"default":function(e){return e.relatedTarget;
}}),preventDefault:qx.core.Variant.select(q,{"gecko":function(e){if(qx.bom.client.Engine.VERSION>=1.9&&e.type==o&&e.button==2){return;
}e.preventDefault();
if(qx.bom.client.Engine.VERSION<1.9){try{e.keyCode=0;
}catch(k){}}},"mshtml":function(e){try{e.keyCode=0;
}catch(r){}e.returnValue=false;
},"default":function(e){e.preventDefault();
}}),stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}e.cancelBubble=true;
},fire:function(v,w){if(document.createEventObject){var x=document.createEventObject();
return v.fireEvent(p+w,x);
}else{var x=document.createEvent(l);
x.initEvent(w,true,true);
return !v.dispatchEvent(x);
}}}});
})();
(function(){var cD="|bubble",cC="|capture",cB="|",cA="_",cz="unload",cy="UNKNOWN_",cx="DOM_",cw="__Y",cv="c",cu="__ba",cr="WIN_",ct="capture",cs="qx.event.Manager",cq="QX_";
qx.Bootstrap.define(cs,{construct:function(cm,cn){this.__V=cm;
this.__W=cn;
if(cm.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(cm,cz,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(cm,cz,arguments.callee);
self.dispose();
}));
}this.__X={};
this.__Y={};
this.__ba={};
this.__bb={};
},statics:{__bc:0,getNextUniqueId:function(){return (this.__bc++).toString(36);
}},members:{__W:null,__X:null,__ba:null,__bd:null,__Y:null,__bb:null,__V:null,getWindow:function(){return this.__V;
},getHandler:function(e){var f=this.__Y[e.classname];

if(f){return f;
}return this.__Y[e.classname]=new e(this);
},getDispatcher:function(co){var cp=this.__ba[co.classname];

if(cp){return cp;
}return this.__ba[co.classname]=new co(this,this.__W);
},getListeners:function(r,s,t){var u=r.$$hash||qx.core.ObjectRegistry.toHashCode(r);
var w=this.__X[u];

if(!w){return null;
}var x=s+(t?cC:cD);
var v=w[x];
return v?v.concat():null;
},serializeListeners:function(bg){var bn=bg.$$hash||qx.core.ObjectRegistry.toHashCode(bg);
var bp=this.__X[bn];
var bl=[];

if(bp){var bj,bo,bh,bk,bm;

for(var bi in bp){bj=bi.indexOf(cB);
bo=bi.substring(0,bj);
bh=bi.charAt(bj+1)==cv;
bk=bp[bi];

for(var i=0,l=bk.length;i<l;i++){bm=bk[i];
bl.push({self:bm.context,handler:bm.handler,type:bo,capture:bh});
}}}return bl;
},toggleAttachedEvents:function(bq,br){var bw=bq.$$hash||qx.core.ObjectRegistry.toHashCode(bq);
var by=this.__X[bw];

if(by){var bt,bx,bs,bu;

for(var bv in by){bt=bv.indexOf(cB);
bx=bv.substring(0,bt);
bs=bv.charCodeAt(bt+1)===99;
bu=by[bv];

if(br){this.__be(bq,bx,bs);
}else{this.__bf(bq,bx,bs);
}}}},hasListener:function(cf,cg,ch){{};
var ci=cf.$$hash||qx.core.ObjectRegistry.toHashCode(cf);
var ck=this.__X[ci];

if(!ck){return false;
}var cl=cg+(ch?cC:cD);
var cj=ck[cl];
return cj&&cj.length>0;
},importListeners:function(g,h){{};
var p=g.$$hash||qx.core.ObjectRegistry.toHashCode(g);
var q=this.__X[p]={};
var m=qx.event.Manager;

for(var j in h){var n=h[j];
var o=n.type+(n.capture?cC:cD);
var k=q[o];

if(!k){k=q[o]=[];
this.__be(g,n.type,n.capture);
}k.push({handler:n.listener,context:n.self,unique:n.unique||(m.__bc++).toString(36)});
}},addListener:function(I,J,K,self,L){var P;
{};
var Q=I.$$hash||qx.core.ObjectRegistry.toHashCode(I);
var S=this.__X[Q];

if(!S){S=this.__X[Q]={};
}var O=J+(L?cC:cD);
var N=S[O];

if(!N){N=S[O]=[];
}if(N.length===0){this.__be(I,J,L);
}var R=(qx.event.Manager.__bc++).toString(36);
var M={handler:K,context:self,unique:R};
N.push(M);
return O+cB+R;
},findHandler:function(bR,bS){var cd=false,bV=false,ce=false;
var cc;

if(bR.nodeType===1){cd=true;
cc=cx+bR.tagName.toLowerCase()+cA+bS;
}else if(bR==this.__V){bV=true;
cc=cr+bS;
}else if(bR.classname){ce=true;
cc=cq+bR.classname+cA+bS;
}else{cc=cy+bR+cA+bS;
}var bX=this.__bb;

if(bX[cc]){return bX[cc];
}var cb=this.__W.getHandlers();
var bW=qx.event.IEventHandler;
var bY,ca,bU,bT;

for(var i=0,l=cb.length;i<l;i++){bY=cb[i];
bU=bY.SUPPORTED_TYPES;

if(bU&&!bU[bS]){continue;
}bT=bY.TARGET_CHECK;

if(bT){if(!cd&&bT===bW.TARGET_DOMNODE){continue;
}else if(!bV&&bT===bW.TARGET_WINDOW){continue;
}else if(!ce&&bT===bW.TARGET_OBJECT){continue;
}}ca=this.getHandler(cb[i]);

if(bY.IGNORE_CAN_HANDLE||ca.canHandleEvent(bR,bS)){bX[cc]=ca;
return ca;
}}return null;
},__be:function(a,b,c){var d=this.findHandler(a,b);

if(d){d.registerEvent(a,b,c);
return;
}{};
},removeListener:function(y,z,A,self,B){var F;
{};
var G=y.$$hash||qx.core.ObjectRegistry.toHashCode(y);
var H=this.__X[G];

if(!H){return false;
}var C=z+(B?cC:cD);
var D=H[C];

if(!D){return false;
}var E;

for(var i=0,l=D.length;i<l;i++){E=D[i];

if(E.handler===A&&E.context===self){qx.lang.Array.removeAt(D,i);

if(D.length==0){this.__bf(y,z,B);
}return true;
}}return false;
},removeListenerById:function(T,U){var bb;
{};
var Y=U.split(cB);
var be=Y[0];
var V=Y[1].charCodeAt(0)==99;
var bd=Y[2];
var bc=T.$$hash||qx.core.ObjectRegistry.toHashCode(T);
var bf=this.__X[bc];

if(!bf){return false;
}var ba=be+(V?cC:cD);
var X=bf[ba];

if(!X){return false;
}var W;

for(var i=0,l=X.length;i<l;i++){W=X[i];

if(W.unique===bd){qx.lang.Array.removeAt(X,i);

if(X.length==0){this.__bf(T,be,V);
}return true;
}}return false;
},removeAllListeners:function(bz){var bD=bz.$$hash||qx.core.ObjectRegistry.toHashCode(bz);
var bF=this.__X[bD];

if(!bF){return false;
}var bB,bE,bA;

for(var bC in bF){if(bF[bC].length>0){bB=bC.split(cB);
bE=bB[0];
bA=bB[1]===ct;
this.__bf(bz,bE,bA);
}}delete this.__X[bD];
return true;
},__bf:function(bG,bH,bI){var bJ=this.findHandler(bG,bH);

if(bJ){bJ.unregisterEvent(bG,bH,bI);
return;
}{};
},dispatchEvent:function(bK,event){var bP;
{};
var bQ=event.getType();

if(!event.getBubbles()&&!this.hasListener(bK,bQ)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(bK);
}var bO=this.__W.getDispatchers();
var bN;
var bM=false;

for(var i=0,l=bO.length;i<l;i++){bN=this.getDispatcher(bO[i]);
if(bN.canDispatchEvent(bK,event,bQ)){bN.dispatchEvent(bK,event,bQ);
bM=true;
break;
}}
if(!bM){qx.log.Logger.error(this,"No dispatcher can handle event of type "+bQ+" on "+bK);
return true;
}var bL=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !bL;
},dispose:function(){this.__W.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,cw);
qx.util.DisposeUtil.disposeMap(this,cu);
this.__X=this.__V=this.__bd=null;
this.__W=this.__bb=null;
}}});
})();
(function(){var f="qx.dom.Node",e="qx.client",d="";
qx.Bootstrap.define(f,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(c){return c.nodeType===
this.DOCUMENT?c:
c.ownerDocument||c.document;
},getWindow:qx.core.Variant.select(e,{"mshtml":function(g){if(g.nodeType==null){return g;
}if(g.nodeType!==this.DOCUMENT){g=g.ownerDocument;
}return g.parentWindow;
},"default":function(j){if(j.nodeType==null){return j;
}if(j.nodeType!==this.DOCUMENT){j=j.ownerDocument;
}return j.defaultView;
}}),getDocumentElement:function(k){return this.getDocument(k).documentElement;
},getBodyElement:function(o){return this.getDocument(o).body;
},isNode:function(h){return !!(h&&h.nodeType!=null);
},isElement:function(b){return !!(b&&b.nodeType===this.ELEMENT);
},isDocument:function(n){return !!(n&&n.nodeType===this.DOCUMENT);
},isText:function(l){return !!(l&&l.nodeType===this.TEXT);
},isWindow:function(m){return !!(m&&m.history&&m.location&&m.document);
},getText:function(p){if(!p||!p.nodeType){return null;
}
switch(p.nodeType){case 1:var i,a=[],q=p.childNodes,length=q.length;

for(i=0;i<length;i++){a[i]=this.getText(q[i]);
}return a.join(d);
case 2:return p.nodeValue;
break;
case 3:return p.nodeValue;
break;
}return null;
}}});
})();
(function(){var r="mshtml",q="qx.client",p="[object Array]",o="qx.lang.Array",n="qx",m="number",k="string";
qx.Bootstrap.define(o,{statics:{toArray:function(y,z){return this.cast(y,Array,z);
},cast:function(J,K,L){if(J.constructor===K){return J;
}
if(qx.Class.hasInterface(J,qx.data.IListData)){var J=J.toArray();
}var M=new K;
if(qx.core.Variant.isSet(q,r)){if(J.item){for(var i=L||0,l=J.length;i<l;i++){M.push(J[i]);
}return M;
}}if(Object.prototype.toString.call(J)===p&&L==null){M.push.apply(M,J);
}else{M.push.apply(M,Array.prototype.slice.call(J,L||0));
}return M;
},fromArguments:function(bo,bp){return Array.prototype.slice.call(bo,bp||0);
},fromCollection:function(E){if(qx.core.Variant.isSet(q,r)){if(E.item){var F=[];

for(var i=0,l=E.length;i<l;i++){F[i]=E[i];
}return F;
}}return Array.prototype.slice.call(E,0);
},fromShortHand:function(G){var I=G.length;
var H=qx.lang.Array.clone(G);
switch(I){case 1:H[1]=H[2]=H[3]=H[0];
break;
case 2:H[2]=H[0];
case 3:H[3]=H[1];
}return H;
},clone:function(a){return a.concat();
},insertAt:function(A,B,i){A.splice(i,0,B);
return A;
},insertBefore:function(N,O,P){var i=N.indexOf(P);

if(i==-1){N.push(O);
}else{N.splice(i,0,O);
}return N;
},insertAfter:function(d,e,f){var i=d.indexOf(f);

if(i==-1||i==(d.length-1)){d.push(e);
}else{d.splice(i+1,0,e);
}return d;
},removeAt:function(bn,i){return bn.splice(i,1)[0];
},removeAll:function(g){g.length=0;
return this;
},append:function(bh,bi){{};
Array.prototype.push.apply(bh,bi);
return bh;
},exclude:function(bj,bk){{};

for(var i=0,bm=bk.length,bl;i<bm;i++){bl=bj.indexOf(bk[i]);

if(bl!=-1){bj.splice(bl,1);
}}return bj;
},remove:function(Q,R){var i=Q.indexOf(R);

if(i!=-1){Q.splice(i,1);
return R;
}},contains:function(C,D){return C.indexOf(D)!==-1;
},equals:function(h,j){var length=h.length;

if(length!==j.length){return false;
}
for(var i=0;i<length;i++){if(h[i]!==j[i]){return false;
}}return true;
},sum:function(b){var c=0;

for(var i=0,l=b.length;i<l;i++){c+=b[i];
}return c;
},max:function(v){{};
var i,x=v.length,w=v[0];

for(i=1;i<x;i++){if(v[i]>w){w=v[i];
}}return w===undefined?null:w;
},min:function(s){{};
var i,u=s.length,t=s[0];

for(i=1;i<u;i++){if(s[i]<t){t=s[i];
}}return t===undefined?null:t;
},unique:function(T){var be=[],V={},Y={},bb={};
var ba,U=0;
var bf=n+qx.lang.Date.now();
var W=false,bd=false,bg=false;
for(var i=0,bc=T.length;i<bc;i++){ba=T[i];
if(ba===null){if(!W){W=true;
be.push(ba);
}}else if(ba===undefined){}else if(ba===false){if(!bd){bd=true;
be.push(ba);
}}else if(ba===true){if(!bg){bg=true;
be.push(ba);
}}else if(typeof ba===k){if(!V[ba]){V[ba]=1;
be.push(ba);
}}else if(typeof ba===m){if(!Y[ba]){Y[ba]=1;
be.push(ba);
}}else{X=ba[bf];

if(X==null){X=ba[bf]=U++;
}
if(!bb[X]){bb[X]=ba;
be.push(ba);
}}}for(var X in bb){try{delete bb[X][bf];
}catch(S){try{bb[X][bf]=null;
}catch(bq){throw new Error("Cannot clean-up map entry doneObjects["+X+"]["+bf+"]");
}}}return be;
}}});
})();
(function(){var f="()",e=".",d=".prototype.",c='anonymous()',b="qx.lang.Function",a=".constructor()";
qx.Bootstrap.define(b,{statics:{getCaller:function(r){return r.caller?r.caller.callee:r.callee.caller;
},getName:function(s){if(s.displayName){return s.displayName;
}
if(s.$$original||s.wrapper||s.classname){return s.classname+a;
}
if(s.$$mixin){for(var u in s.$$mixin.$$members){if(s.$$mixin.$$members[u]==s){return s.$$mixin.name+d+u+f;
}}for(var u in s.$$mixin){if(s.$$mixin[u]==s){return s.$$mixin.name+e+u+f;
}}}
if(s.self){var v=s.self.constructor;

if(v){for(var u in v.prototype){if(v.prototype[u]==s){return v.classname+d+u+f;
}}for(var u in v){if(v[u]==s){return v.classname+e+u+f;
}}}}var t=s.toString().match(/function\s*(\w*)\s*\(.*/);

if(t&&t.length>=1&&t[1]){return t[1]+f;
}return c;
},globalEval:function(z){if(window.execScript){return window.execScript(z);
}else{return eval.call(window,z);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(p,q){{};
if(!q){return p;
}if(!(q.self||q.args||q.delay!=null||q.periodical!=null||q.attempt)){return p;
}return function(event){{};
var m=qx.lang.Array.fromArguments(arguments);
if(q.args){m=q.args.concat(m);
}
if(q.delay||q.periodical){var l=qx.event.GlobalError.observeMethod(function(){return p.apply(q.self||this,m);
});

if(q.delay){return window.setTimeout(l,q.delay);
}
if(q.periodical){return window.setInterval(l,q.periodical);
}}else if(q.attempt){var n=false;

try{n=p.apply(q.self||this,m);
}catch(o){}return n;
}else{return p.apply(q.self||this,m);
}};
},bind:function(A,self,B){return this.create(A,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(j,k){return this.create(j,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(C,self,D){if(arguments.length<3){return function(event){return C.call(self||this,event||window.event);
};
}else{var E=qx.lang.Array.fromArguments(arguments,2);
return function(event){var F=[event||window.event];
F.push.apply(F,E);
C.apply(self||this,F);
};
}},attempt:function(G,self,H){return this.create(G,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(g,h,self,i){return this.create(g,{delay:h,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(w,x,self,y){return this.create(w,{periodical:x,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
})();
(function(){var v="qx.event.Registration";
qx.Bootstrap.define(v,{statics:{__bg:{},getManager:function(m){if(m==null){{};
m=window;
}else if(m.nodeType){m=qx.dom.Node.getWindow(m);
}else if(!qx.dom.Node.isWindow(m)){m=window;
}var o=m.$$hash||qx.core.ObjectRegistry.toHashCode(m);
var n=this.__bg[o];

if(!n){n=new qx.event.Manager(m,this);
this.__bg[o]=n;
}return n;
},removeManager:function(q){var r=qx.core.ObjectRegistry.toHashCode(q.getWindow());
delete this.__bg[r];
},addListener:function(J,K,L,self,M){return this.getManager(J).addListener(J,K,L,self,M);
},removeListener:function(N,O,P,self,Q){return this.getManager(N).removeListener(N,O,P,self,Q);
},removeListenerById:function(c,d){return this.getManager(c).removeListenerById(c,d);
},removeAllListeners:function(I){return this.getManager(I).removeAllListeners(I);
},hasListener:function(s,t,u){return this.getManager(s).hasListener(s,t,u);
},serializeListeners:function(H){return this.getManager(H).serializeListeners(H);
},createEvent:function(x,y,z){{};
if(y==null){y=qx.event.type.Event;
}var A=qx.event.Pool.getInstance().getObject(y);

if(!A){return;
}z?A.init.apply(A,z):A.init();
if(x){A.setType(x);
}return A;
},dispatchEvent:function(w,event){return this.getManager(w).dispatchEvent(w,event);
},fireEvent:function(B,C,D,E){var F;
{};
var G=this.createEvent(C,D||null,E);
return this.getManager(B).dispatchEvent(B,G);
},fireNonBubblingEvent:function(g,h,i,j){{};
var k=this.getManager(g);

if(!k.hasListener(g,h,false)){return true;
}var l=this.createEvent(h,i||null,j);
return k.dispatchEvent(g,l);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__bh:[],addHandler:function(p){{};
this.__bh.push(p);
this.__bh.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__bh;
},__bi:[],addDispatcher:function(e,f){{};
this.__bi.push(e);
this.__bi.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__bi;
}}});
})();
(function(){var f="qx.log.appender.RingBuffer";
qx.Bootstrap.define(f,{construct:function(g){this.__bj=[];
this.setMaxMessages(g||50);
},members:{__bk:0,__bj:null,__bl:50,setMaxMessages:function(e){this.__bl=e;
this.clearHistory();
},getMaxMessages:function(){return this.__bl;
},process:function(h){var i=this.getMaxMessages();

if(this.__bj.length<i){this.__bj.push(h);
}else{this.__bj[this.__bk++]=h;

if(this.__bk>=i){this.__bk=0;
}}},getAllLogEvents:function(){return this.retrieveLogEvents(this.getMaxMessages());
},retrieveLogEvents:function(a){if(a>this.__bj.length){a=this.__bj.length;
}
if(this.__bj.length==this.getMaxMessages()){var c=this.__bk-1;
}else{c=this.__bj.length-1;
}var b=c-a+1;

if(b<0){b+=this.__bj.length;
}var d;

if(b<=c){d=this.__bj.slice(b,c+1);
}else{d=this.__bj.slice(b,this.__bj.length).concat(this.__bj.slice(0,c+1));
}return d;
},clearHistory:function(){this.__bj=[];
this.__bk=0;
}}});
})();
(function(){var E="node",D="error",C="...(+",B="array",A=")",z="info",y="instance",x="string",w="null",v="class",ba="number",Y="stringify",X="]",W="unknown",V="function",U="boolean",T="debug",S="map",R="undefined",Q="qx.log.Logger",L=")}",M="#",J="warn",K="document",H="{...(",I="[",F="text[",G="[...(",N="\n",O=")]",P="object";
qx.Bootstrap.define(Q,{statics:{__bm:T,setLevel:function(bk){this.__bm=bk;
},getLevel:function(){return this.__bm;
},setTreshold:function(u){this.__bp.setMaxMessages(u);
},getTreshold:function(){return this.__bp.getMaxMessages();
},__bn:{},__bo:0,register:function(bC){if(bC.$$id){return;
}var bD=this.__bo++;
this.__bn[bD]=bC;
bC.$$id=bD;
var bE=this.__bp.getAllLogEvents();

for(var i=0,l=bE.length;i<l;i++){bC.process(bE[i]);
}},unregister:function(bA){var bB=bA.$$id;

if(bB==null){return;
}delete this.__bn[bB];
delete bA.$$id;
},debug:function(bu,bv){this.__br(T,arguments);
},info:function(bw,bx){this.__br(z,arguments);
},warn:function(by,bz){this.__br(J,arguments);
},error:function(bl,bm){this.__br(D,arguments);
},trace:function(bq){this.__br(z,[bq,qx.dev.StackTrace.getStackTrace().join(N)]);
},deprecatedMethodWarning:function(br,bs){var bt;
{};
},deprecatedClassWarning:function(a,b){var c;
{};
},deprecatedEventWarning:function(d,event,e){var f;
{};
},deprecatedMixinWarning:function(bn,bo){var bp;
{};
},clear:function(){this.__bp.clearHistory();
},__bp:new qx.log.appender.RingBuffer(50),__bq:{debug:0,info:1,warn:2,error:3},__br:function(g,h){var o=this.__bq;

if(o[g]<o[this.__bm]){return;
}var k=h.length<2?null:h[0];
var n=k?1:0;
var j=[];

for(var i=n,l=h.length;i<l;i++){j.push(this.__bt(h[i],true));
}var p=new Date;
var q={time:p,offset:p-qx.Bootstrap.LOADSTART,level:g,items:j,win:window};
if(k){if(k instanceof qx.core.Object){q.object=k.$$hash;
}else if(k.$$type){q.clazz=k;
}}this.__bp.process(q);
var r=this.__bn;

for(var m in r){r[m].process(q);
}},__bs:function(s){if(s===undefined){return R;
}else if(s===null){return w;
}
if(s.$$type){return v;
}var t=typeof s;

if(t===V||t==x||t===ba||t===U){return t;
}else if(t===P){if(s.nodeType){return E;
}else if(s.classname){return y;
}else if(s instanceof Array){return B;
}else if(s instanceof Error){return D;
}else{return S;
}}
if(s.toString){return Y;
}return W;
},__bt:function(bb,bc){var bj=this.__bs(bb);
var bf=W;
var be=[];

switch(bj){case w:case R:bf=bj;
break;
case x:case ba:case U:bf=bb;
break;
case E:if(bb.nodeType===9){bf=K;
}else if(bb.nodeType===3){bf=F+bb.nodeValue+X;
}else if(bb.nodeType===1){bf=bb.nodeName.toLowerCase();

if(bb.id){bf+=M+bb.id;
}}else{bf=E;
}break;
case V:bf=qx.lang.Function.getName(bb)||bj;
break;
case y:bf=bb.basename+I+bb.$$hash+X;
break;
case v:case Y:bf=bb.toString();
break;
case D:be=qx.dev.StackTrace.getStackTraceFromError(bb);
bf=bb.toString();
break;
case B:if(bc){bf=[];

for(var i=0,l=bb.length;i<l;i++){if(bf.length>20){bf.push(C+(l-i)+A);
break;
}bf.push(this.__bt(bb[i],false));
}}else{bf=G+bb.length+O;
}break;
case S:if(bc){var bd;
var bi=[];

for(var bh in bb){bi.push(bh);
}bi.sort();
bf=[];

for(var i=0,l=bi.length;i<l;i++){if(bf.length>20){bf.push(C+(l-i)+A);
break;
}bh=bi[i];
bd=this.__bt(bb[bh],false);
bd.key=bh;
bf.push(bd);
}}else{var bg=0;

for(var bh in bb){bg++;
}bf=H+bg+L;
}break;
}return {type:bj,text:bf,trace:be};
}}});
})();
(function(){var H="set",G="get",F="reset",E="qx.core.Object",D="]",C="[",B="$$user_",A="Don't use '_disposeFields' - instead assign directly to 'null'",z="Object";
qx.Class.define(E,{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:z},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+C+this.$$hash+D;
},base:function(bu,bv){{};

if(arguments.length===1){return bu.callee.base.call(this);
}else{return bu.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(bx){return bx.callee.self;
},clone:function(){var bq=this.constructor;
var bp=new bq;
var bs=qx.Class.getProperties(bq);
var br=qx.core.Property.$$store.user;
var bt=qx.core.Property.$$method.set;
var name;
for(var i=0,l=bs.length;i<l;i++){name=bs[i];

if(this.hasOwnProperty(br[name])){bp[bt[name]](this[br[name]]);
}}return bp;
},serialize:function(){var q=this.constructor;
var s=qx.Class.getProperties(q);
var t=qx.core.Property.$$store.user;
var name,p;
var r={classname:q.classname,properties:{}};
for(var i=0,l=s.length;i<l;i++){name=s[i];

if(this.hasOwnProperty(t[name])){p=this[t[name]];

if(p instanceof qx.core.Object){r.properties[name]={$$hash:p.$$hash};
}else{r.properties[name]=p;
}}}return r;
},set:function(bd,be){var bg=qx.core.Property.$$method.set;

if(qx.lang.Type.isString(bd)){if(!this[bg[bd]]){if(this[H+qx.lang.String.firstUp(bd)]!=undefined){this[H+qx.lang.String.firstUp(bd)](be);
return;
}{};
}return this[bg[bd]](be);
}else{for(var bf in bd){if(!this[bg[bf]]){if(this[H+qx.lang.String.firstUp(bf)]!=undefined){this[H+qx.lang.String.firstUp(bf)](bd[bf]);
continue;
}{};
}this[bg[bf]](bd[bf]);
}return this;
}},get:function(x){var y=qx.core.Property.$$method.get;

if(!this[y[x]]){if(this[G+qx.lang.String.firstUp(x)]!=undefined){return this[G+qx.lang.String.firstUp(x)]();
}{};
}return this[y[x]]();
},reset:function(J){var K=qx.core.Property.$$method.reset;

if(!this[K[J]]){if(this[F+qx.lang.String.firstUp(J)]!=undefined){this[F+qx.lang.String.firstUp(J)]();
return;
}{};
}this[K[J]]();
},__bu:qx.event.Registration,addListener:function(g,h,self,j){if(!this.$$disposed){return this.__bu.addListener(this,g,h,self,j);
}return null;
},addListenerOnce:function(k,m,self,n){var o=function(e){m.call(self||this,e);
this.removeListener(k,o,this,n);
};
return this.addListener(k,o,this,n);
},removeListener:function(u,v,self,w){if(!this.$$disposed){return this.__bu.removeListener(this,u,v,self,w);
}return false;
},removeListenerById:function(I){if(!this.$$disposed){return this.__bu.removeListenerById(this,I);
}return false;
},hasListener:function(V,W){return this.__bu.hasListener(this,V,W);
},dispatchEvent:function(bw){if(!this.$$disposed){return this.__bu.dispatchEvent(this,bw);
}return true;
},fireEvent:function(a,b,c){if(!this.$$disposed){return this.__bu.fireEvent(this,a,b,c);
}return true;
},fireNonBubblingEvent:function(bD,bE,bF){if(!this.$$disposed){return this.__bu.fireNonBubblingEvent(this,bD,bE,bF);
}return true;
},fireDataEvent:function(bl,bm,bn,bo){if(!this.$$disposed){if(bn===undefined){bn=null;
}return this.__bu.fireNonBubblingEvent(this,bl,qx.event.type.Data,[bm,bn,!!bo]);
}return true;
},__bv:null,setUserData:function(d,f){if(!this.__bv){this.__bv={};
}this.__bv[d]=f;
},getUserData:function(ba){if(!this.__bv){return null;
}var bb=this.__bv[ba];
return bb===undefined?null:bb;
},__bw:qx.log.Logger,debug:function(bk){this.__bw.debug(this,bk);
},info:function(bc){this.__bw.info(this,bc);
},warn:function(Y){this.__bw.warn(this,Y);
},error:function(bj){this.__bw.error(this,bj);
},trace:function(){this.__bw.trace(this);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){var bB,bz;
if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
{};
var bA=this.constructor;
var by;

while(bA.superclass){if(bA.$$destructor){bA.$$destructor.call(this);
}if(bA.$$includes){by=bA.$$flatIncludes;

for(var i=0,l=by.length;i<l;i++){if(by[i].$$destructor){by[i].$$destructor.call(this);
}}}bA=bA.superclass;
}var bC=qx.Class.getProperties(this.constructor);

for(var i=0,l=bC.length;i<l;i++){delete this[B+bC[i]];
}{};
},_disposeFields:function(M){qx.log.Logger.deprecatedMethodWarning(arguments.callee,A);
qx.util.DisposeUtil.disposeFields(this,arguments);
},_disposeObjects:function(L){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeArray:function(bh){qx.util.DisposeUtil.disposeArray(this,bh);
},_disposeMap:function(bi){qx.util.DisposeUtil.disposeMap(this,bi);
}},settings:{"qx.disposerDebugLevel":0},defer:function(X){{};
},destruct:function(){qx.event.Registration.removeAllListeners(this);
qx.core.ObjectRegistry.unregister(this);
this.__bv=null;
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
(function(){var k="",j="g",h="0",g='\\$1',f="%",e='-',d="qx.lang.String",c=' ',b='\n',a="undefined";
qx.Bootstrap.define(d,{statics:{camelCase:function(M){return M.replace(/\-([a-z])/g,function(N,O){return O.toUpperCase();
});
},hyphenate:function(P){return P.replace(/[A-Z]/g,function(Q){return (e+Q.charAt(0).toLowerCase());
});
},capitalize:function(u){return u.replace(/\b[a-z]/g,function(p){return p.toUpperCase();
});
},clean:function(x){return this.trim(x.replace(/\s+/g,c));
},trimLeft:function(q){return q.replace(/^\s+/,k);
},trimRight:function(L){return L.replace(/\s+$/,k);
},trim:function(o){return o.replace(/^\s+|\s+$/g,k);
},startsWith:function(s,t){return s.indexOf(t)===0;
},endsWith:function(E,F){return E.substring(E.length-F.length,E.length)===F;
},pad:function(B,length,C){if(typeof C===a){C=h;
}var D=k;

for(var i=B.length;i<length;i++){D+=C;
}return D+B;
},firstUp:function(r){return r.charAt(0).toUpperCase()+r.substr(1);
},firstLow:function(m){return m.charAt(0).toLowerCase()+m.substr(1);
},contains:function(v,w){return v.indexOf(w)!=-1;
},format:function(y,z){var A=y;

for(var i=0;i<z.length;i++){A=A.replace(new RegExp(f+(i+1),j),z[i]);
}return A;
},escapeRegexpChars:function(K){return K.replace(/([.*+?^${}()|[\]\/\\])/g,g);
},toArray:function(n){return n.split(/\B|\b/g);
},stripTags:function(l){return l.replace(/<\/?[^>]+>/gi,k);
},stripScripts:function(G,H){var J=k;
var I=G.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){J+=arguments[1]+b;
return k;
});

if(H===true){qx.lang.Function.globalEval(J);
}return I;
}}});
})();
(function(){var n="function",m="Boolean",k="qx.Interface",j="]",h="toggle",g="Interface",f="is",e="[Interface ";
qx.Bootstrap.define(k,{statics:{define:function(name,a){if(a){if(a.extend&&!(a.extend instanceof Array)){a.extend=[a.extend];
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
}b.$$type=g;
b.name=name;
b.toString=this.genericToString;
b.basename=qx.Bootstrap.createNamespace(name,b);
qx.Interface.$$registry[name]=b;
return b;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},flatten:function(c){if(!c){return [];
}var d=c.concat();

for(var i=0,l=c.length;i<l;i++){if(c[i].$$extends){d.push.apply(d,this.flatten(c[i].$$extends));
}}return d;
},__bx:function(o,p,q,r){var v=q.$$members;

if(v){for(var u in v){if(qx.lang.Type.isFunction(v[u])){var t=this.__by(p,u);
var s=t||qx.lang.Type.isFunction(o[u]);

if(!s){throw new Error('Implementation of method "'+u+'" is missing in class "'+p.classname+'" required by interface "'+q.name+'"');
}var w=r===true&&!t&&!qx.Class.hasInterface(p,q);

if(w){o[u]=this.__bB(q,o[u],u,v[u]);
}}else{if(typeof o[u]===undefined){if(typeof o[u]!==n){throw new Error('Implementation of member "'+u+'" is missing in class "'+p.classname+'" required by interface "'+q.name+'"');
}}}}}},__by:function(A,B){var F=B.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!F){return false;
}var C=qx.lang.String.firstLow(F[2]);
var D=qx.Class.hasProperty(A,C);

if(!D){return false;
}var E=F[0]==f||F[0]==h;

if(E){return qx.Class.getPropertyDefinition(A,C).check==m;
}return true;
},__bz:function(x,y){if(y.$$properties){for(var z in y.$$properties){if(!qx.Class.hasProperty(x,z)){throw new Error('The property "'+z+'" is not supported by Class "'+x.classname+'"!');
}}}},__bA:function(K,L){if(L.$$events){for(var M in L.$$events){if(!qx.Class.supportsEvent(K,M)){throw new Error('The event "'+M+'" is not supported by Class "'+K.classname+'"!');
}}}},assertObject:function(G,H){var J=G.constructor;
this.__bx(G,J,H,false);
this.__bz(J,H);
this.__bA(J,H);
var I=H.$$extends;

if(I){for(var i=0,l=I.length;i<l;i++){this.assertObject(G,I[i]);
}}},assert:function(N,O,P){this.__bx(N.prototype,N,O,P);
this.__bz(N,O);
this.__bA(N,O);
var Q=O.$$extends;

if(Q){for(var i=0,l=Q.length;i<l;i++){this.assert(N,Q[i],P);
}}},genericToString:function(){return e+this.name+j;
},$$registry:{},__bB:function(){},__bC:null,__bD:function(){}}});
})();
(function(){var c="qx.ui.decoration.IDecorator";
qx.Interface.define(c,{members:{getMarkup:function(){},resize:function(d,e,f){},tint:function(a,b){},getInsets:function(){}}});
})();
(function(){var i="Number",h="_applyInsets",g="abstract",f="insetRight",e="insetTop",d="insetBottom",c="qx.ui.decoration.Abstract",b="shorthand",a="insetLeft";
qx.Class.define(c,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:g,properties:{insetLeft:{check:i,nullable:true,apply:h},insetRight:{check:i,nullable:true,apply:h},insetBottom:{check:i,nullable:true,apply:h},insetTop:{check:i,nullable:true,apply:h},insets:{group:[e,f,d,a],mode:b}},members:{__bE:null,_getDefaultInsets:function(){throw new Error("Abstract method called.");
},_isInitialized:function(){throw new Error("Abstract method called.");
},_resetInsets:function(){this.__bE=null;
},getInsets:function(){if(this.__bE){return this.__bE;
}var j=this._getDefaultInsets();
return this.__bE={left:this.getInsetLeft()==null?j.left:this.getInsetLeft(),right:this.getInsetRight()==null?j.right:this.getInsetRight(),bottom:this.getInsetBottom()==null?j.bottom:this.getInsetBottom(),top:this.getInsetTop()==null?j.top:this.getInsetTop()};
},_applyInsets:function(){{};
this.__bE=null;
}},destruct:function(){this.__bE=null;
}});
})();
(function(){var w="_applyBackground",v="repeat",u="mshtml",t="backgroundPositionX",s="",r="backgroundPositionY",q="no-repeat",p="scale",o=" ",n="repeat-x",i="qx.client",m="repeat-y",l="hidden",h="qx.ui.decoration.MBackgroundImage",g="String",k='"></div>',j='<div style="';
qx.Mixin.define(h,{properties:{backgroundImage:{check:g,nullable:true,apply:w},backgroundRepeat:{check:[v,n,m,q,p],init:v,apply:w},backgroundPositionX:{nullable:true,apply:w},backgroundPositionY:{nullable:true,apply:w},backgroundPosition:{group:[r,t]}},members:{_generateBackgroundMarkup:function(a){{};
var e=s;
var d=this.getBackgroundImage();
var c=this.getBackgroundRepeat();
var top=this.getBackgroundPositionY();

if(top==null){top=0;
}var f=this.getBackgroundPositionX();

if(f==null){f=0;
}a.backgroundPosition=f+o+top;
if(d){var b=qx.util.AliasManager.getInstance().resolve(d);
e=qx.bom.element.Decoration.create(b,c,a);
}else{if(a){if(qx.core.Variant.isSet(i,u)){if(qx.bom.client.Engine.VERSION<7||qx.bom.client.Feature.QUIRKS_MODE){a.overflow=l;
}}e=j+qx.bom.element.Style.compile(a)+k;
}}return e;
},_applyBackground:function(){{};
}}});
})();
(function(){var r="_applyStyle",q="Color",p="px",o="solid",n="dotted",m="double",l="dashed",k="",j="_applyWidth",i="qx.ui.decoration.Uniform",f="px ",h=" ",g="scale",e="PositiveInteger",d="absolute";
qx.Class.define(i,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(t,u,v){arguments.callee.base.call(this);
if(t!=null){this.setWidth(t);
}
if(u!=null){this.setStyle(u);
}
if(v!=null){this.setColor(v);
}},properties:{width:{check:e,init:0,apply:j},style:{nullable:true,check:[o,n,l,m],init:o,apply:r},color:{nullable:true,check:q,apply:r},backgroundColor:{check:q,nullable:true,apply:r}},members:{__bF:null,_getDefaultInsets:function(){var s=this.getWidth();
return {top:s,right:s,bottom:s,left:s};
},_isInitialized:function(){return !!this.__bF;
},getMarkup:function(){if(this.__bF){return this.__bF;
}var B={position:d,top:0,left:0};
var C=this.getWidth();
{};
var E=qx.theme.manager.Color.getInstance();
B.border=C+f+this.getStyle()+h+E.resolve(this.getColor());
var D=this._generateBackgroundMarkup(B);
return this.__bF=D;
},resize:function(w,x,y){var A=this.getBackgroundImage()&&this.getBackgroundRepeat()==g;

if(A||qx.bom.client.Feature.CONTENT_BOX){var z=this.getWidth()*2;
x-=z;
y-=z;
if(x<0){x=0;
}
if(y<0){y=0;
}}w.style.width=x+p;
w.style.height=y+p;
},tint:function(a,b){var c=qx.theme.manager.Color.getInstance();

if(b==null){b=this.getBackgroundColor();
}a.style.backgroundColor=c.resolve(b)||k;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this.__bF=null;
}});
})();
(function(){var f="px",e="qx.ui.decoration.Background",d="",c="_applyStyle",b="Color",a="absolute";
qx.Class.define(e,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(g){arguments.callee.base.call(this);

if(g!=null){this.setBackgroundColor(g);
}},properties:{backgroundColor:{check:b,nullable:true,apply:c}},members:{__bG:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__bG;
},getMarkup:function(){if(this.__bG){return this.__bG;
}var h={position:a,top:0,left:0};
var i=this._generateBackgroundMarkup(h);
return this.__bG=i;
},resize:function(j,k,l){j.style.width=k+f;
j.style.height=l+f;
},tint:function(m,n){var o=qx.theme.manager.Color.getInstance();

if(n==null){n=this.getBackgroundColor();
}m.style.backgroundColor=o.resolve(n)||d;
},_applyStyle:function(){{};
}},destruct:function(){this.__bG=null;
}});
})();
(function(){var u="px",t="0px",s="-1px",r="no-repeat",q="scale-x",p="scale-y",o="-tr",n="-l",m='</div>',l="scale",I="qx.client",H="-br",G="-t",F="-tl",E="-r",D='<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">',C="_applyBaseImage",B="-b",A="String",z="",x="-bl",y="-c",v="mshtml",w="qx.ui.decoration.Grid";
qx.Class.define(w,{extend:qx.ui.decoration.Abstract,construct:function(a,b){arguments.callee.base.call(this);
if(a!=null){this.setBaseImage(a);
}
if(b!=null){this.setInsets(b);
}},properties:{baseImage:{check:A,nullable:true,apply:C}},members:{__bH:null,__bI:null,__bJ:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__bH;
},getMarkup:function(){if(this.__bH){return this.__bH;
}var h=qx.bom.element.Decoration;
var i=this.__bI;
var j=this.__bJ;
var k=[];
k.push(D);
k.push(h.create(i.tl,r,{top:0,left:0}));
k.push(h.create(i.t,q,{top:0,left:j.left+u}));
k.push(h.create(i.tr,r,{top:0,right:0}));
k.push(h.create(i.bl,r,{bottom:0,left:0}));
k.push(h.create(i.b,q,{bottom:0,left:j.left+u}));
k.push(h.create(i.br,r,{bottom:0,right:0}));
k.push(h.create(i.l,p,{top:j.top+u,left:0}));
k.push(h.create(i.c,l,{top:j.top+u,left:j.left+u}));
k.push(h.create(i.r,p,{top:j.top+u,right:0}));
k.push(m);
return this.__bH=k.join(z);
},resize:function(d,e,f){var g=this.__bJ;
var innerWidth=e-g.left-g.right;
var innerHeight=f-g.top-g.bottom;
if(innerWidth<0){innerWidth=0;
}
if(innerHeight<0){innerHeight=0;
}d.style.width=e+u;
d.style.height=f+u;
d.childNodes[1].style.width=innerWidth+u;
d.childNodes[4].style.width=innerWidth+u;
d.childNodes[7].style.width=innerWidth+u;
d.childNodes[6].style.height=innerHeight+u;
d.childNodes[7].style.height=innerHeight+u;
d.childNodes[8].style.height=innerHeight+u;

if(qx.core.Variant.isSet(I,v)){if(qx.bom.client.Engine.VERSION<7||(qx.bom.client.Feature.QUIRKS_MODE&&qx.bom.client.Engine.VERSION<8)){if(e%2==1){d.childNodes[2].style.marginRight=s;
d.childNodes[5].style.marginRight=s;
d.childNodes[8].style.marginRight=s;
}else{d.childNodes[2].style.marginRight=t;
d.childNodes[5].style.marginRight=t;
d.childNodes[8].style.marginRight=t;
}
if(f%2==1){d.childNodes[3].style.marginBottom=s;
d.childNodes[4].style.marginBottom=s;
d.childNodes[5].style.marginBottom=s;
}else{d.childNodes[3].style.marginBottom=t;
d.childNodes[4].style.marginBottom=t;
d.childNodes[5].style.marginBottom=t;
}}}},tint:function(Q,R){},_applyBaseImage:function(J,K){{};

if(J){var O=this._resolveImageUrl(J);
var P=/(.*)(\.[a-z]+)$/.exec(O);
var N=P[1];
var M=P[2];
var L=this.__bI={tl:N+F+M,t:N+G+M,tr:N+o+M,bl:N+x+M,b:N+B+M,br:N+H+M,l:N+n+M,c:N+y+M,r:N+E+M};
this.__bJ=this._computeEdgeSizes(L);
}},_resolveImageUrl:function(c){return qx.util.AliasManager.getInstance().resolve(c);
},_computeEdgeSizes:function(S){var T=qx.util.ResourceManager.getInstance();
return {top:T.getImageHeight(S.t),bottom:T.getImageHeight(S.b),left:T.getImageWidth(S.l),right:T.getImageWidth(S.r)};
}},destruct:function(){this.__bH=this.__bI=this.__bJ=null;
}});
})();
(function(){var m="_applyStyle",l='"></div>',k="Color",j="1px",i='<div style="',h='border:',g="1px solid ",f="",e=";",d="px",y='</div>',x="qx.ui.decoration.Beveled",w='<div style="position:absolute;top:1px;left:1px;',v='border-bottom:',u='border-right:',t='border-left:',s='border-top:',r="Number",q='<div style="position:absolute;top:1px;left:0px;',p='position:absolute;top:0px;left:1px;',n='<div style="overflow:hidden;font-size:0;line-height:0;">',o="absolute";
qx.Class.define(x,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(z,A,B){arguments.callee.base.call(this);
if(z!=null){this.setOuterColor(z);
}
if(A!=null){this.setInnerColor(A);
}
if(B!=null){this.setInnerOpacity(B);
}},properties:{innerColor:{check:k,nullable:true,apply:m},innerOpacity:{check:r,init:1,apply:m},outerColor:{check:k,nullable:true,apply:m},backgroundColor:{check:k,nullable:true,apply:m}},members:{__bK:null,_getDefaultInsets:function(){return {top:2,right:2,bottom:2,left:2};
},_isInitialized:function(){return !!this.__bK;
},_applyStyle:function(){{};
},getMarkup:function(){if(this.__bK){return this.__bK;
}var N=qx.theme.manager.Color.getInstance();
var O=[];
var R=g+N.resolve(this.getOuterColor())+e;
var Q=g+N.resolve(this.getInnerColor())+e;
O.push(n);
O.push(i);
O.push(h,R);
O.push(qx.bom.element.Opacity.compile(0.35));
O.push(l);
O.push(q);
O.push(t,R);
O.push(u,R);
O.push(l);
O.push(i);
O.push(p);
O.push(s,R);
O.push(v,R);
O.push(l);
var P={position:o,top:j,left:j};
O.push(this._generateBackgroundMarkup(P));
O.push(w);
O.push(h,Q);
O.push(qx.bom.element.Opacity.compile(this.getInnerOpacity()));
O.push(l);
O.push(y);
return this.__bK=O.join(f);
},resize:function(C,D,E){if(D<4){D=4;
}
if(E<4){E=4;
}if(qx.bom.client.Feature.CONTENT_BOX){var outerWidth=D-2;
var outerHeight=E-2;
var K=outerWidth;
var J=outerHeight;
var innerWidth=D-4;
var innerHeight=E-4;
}else{var outerWidth=D;
var outerHeight=E;
var K=D-2;
var J=E-2;
var innerWidth=K;
var innerHeight=J;
}var M=d;
var I=C.childNodes[0].style;
I.width=outerWidth+M;
I.height=outerHeight+M;
var H=C.childNodes[1].style;
H.width=outerWidth+M;
H.height=J+M;
var G=C.childNodes[2].style;
G.width=K+M;
G.height=outerHeight+M;
var F=C.childNodes[3].style;
F.width=K+M;
F.height=J+M;
var L=C.childNodes[4].style;
L.width=innerWidth+M;
L.height=innerHeight+M;
},tint:function(a,b){var c=qx.theme.manager.Color.getInstance();

if(b==null){b=this.getBackgroundColor();
}a.childNodes[3].style.backgroundColor=c.resolve(b)||f;
}},destruct:function(){this.__bK=null;
}});
})();
(function(){var w="_applyStyle",v="solid",u="Color",t="double",s="px ",r="dotted",q="_applyWidth",p="dashed",o="Number",n=" ",S="shorthand",R="px",Q="widthTop",P="styleRight",O="styleLeft",N="widthLeft",M="widthBottom",L="styleTop",K="colorBottom",J="styleBottom",D="widthRight",E="colorLeft",B="colorRight",C="colorTop",z="scale",A="border-top",x="border-left",y="border-right",F="qx.ui.decoration.Single",G="",I="border-bottom",H="absolute";
qx.Class.define(F,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(T,U,V){arguments.callee.base.call(this);
if(T!=null){this.setWidth(T);
}
if(U!=null){this.setStyle(U);
}
if(V!=null){this.setColor(V);
}},properties:{widthTop:{check:o,init:0,apply:q},widthRight:{check:o,init:0,apply:q},widthBottom:{check:o,init:0,apply:q},widthLeft:{check:o,init:0,apply:q},styleTop:{nullable:true,check:[v,r,p,t],init:v,apply:w},styleRight:{nullable:true,check:[v,r,p,t],init:v,apply:w},styleBottom:{nullable:true,check:[v,r,p,t],init:v,apply:w},styleLeft:{nullable:true,check:[v,r,p,t],init:v,apply:w},colorTop:{nullable:true,check:u,apply:w},colorRight:{nullable:true,check:u,apply:w},colorBottom:{nullable:true,check:u,apply:w},colorLeft:{nullable:true,check:u,apply:w},backgroundColor:{check:u,nullable:true,apply:w},left:{group:[N,O,E]},right:{group:[D,P,B]},top:{group:[Q,L,C]},bottom:{group:[M,J,K]},width:{group:[Q,D,M,N],mode:S},style:{group:[L,P,J,O],mode:S},color:{group:[C,B,K,E],mode:S}},members:{__bL:null,_getDefaultInsets:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};
},_isInitialized:function(){return !!this.__bL;
},getMarkup:function(i){if(this.__bL){return this.__bL;
}var j=qx.theme.manager.Color.getInstance();
var k={};
var m=this.getWidthTop();

if(m>0){k[A]=m+s+this.getStyleTop()+n+j.resolve(this.getColorTop());
}var m=this.getWidthRight();

if(m>0){k[y]=m+s+this.getStyleRight()+n+j.resolve(this.getColorRight());
}var m=this.getWidthBottom();

if(m>0){k[I]=m+s+this.getStyleBottom()+n+j.resolve(this.getColorBottom());
}var m=this.getWidthLeft();

if(m>0){k[x]=m+s+this.getStyleLeft()+n+j.resolve(this.getColorLeft());
}{};
k.position=H;
k.top=0;
k.left=0;
var l=this._generateBackgroundMarkup(k);
return this.__bL=l;
},resize:function(d,e,f){var h=this.getBackgroundImage()&&this.getBackgroundRepeat()==z;

if(h||qx.bom.client.Feature.CONTENT_BOX){var g=this.getInsets();
e-=g.left+g.right;
f-=g.top+g.bottom;
if(e<0){e=0;
}
if(f<0){f=0;
}}d.style.width=e+R;
d.style.height=f+R;
},tint:function(a,b){var c=qx.theme.manager.Color.getInstance();

if(b==null){b=this.getBackgroundColor();
}a.style.backgroundColor=c.resolve(b)||G;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this.__bL=null;
}});
})();
(function(){var m="solid",l="scale",k="border-main",j="white",i="repeat-x",h="border-separator",g="background-light",f="invalid",e="border-focused-invalid",d="border-disabled",bp="decoration/table/header-cell.png",bo="decoration/form/input.png",bn="#f8f8f8",bm="decoration/scrollbar/scrollbar-button-bg-horizontal.png",bl="#b6b6b6",bk="background-pane",bj="repeat-y",bi="decoration/form/input-focused.png",bh="border-input",bg="decoration/scrollbar/scrollbar-button-bg-vertical.png",t="decoration/tabview/tab-button-top-active.png",u="decoration/form/button-c.png",r="decoration/scrollbar/scrollbar-bg-vertical.png",s="decoration/form/button.png",p="decoration/form/button-checked.png",q="decoration/tabview/tab-button-left-inactive.png",n="decoration/groupbox/groupbox.png",o="#FAFAFA",A="decoration/pane/pane.png",B="decoration/menu/background.png",L="decoration/toolbar/toolbar-part.gif",I="decoration/tabview/tab-button-top-inactive.png",T="decoration/menu/bar-background.png",O="center",bc="decoration/tabview/tab-button-bottom-active.png",Y="decoration/form/button-hovered.png",E="decoration/form/tooltip-error-arrow.png",bf="decoration/window/captionbar-inactive.png",be="qx/decoration/Modern",bd="decoration/window/statusbar.png",D="border-focused",G="decoration/selection.png",H="table-focus-indicator",K="#F2F2F2",M="decoration/form/button-checked-c.png",P="decoration/scrollbar/scrollbar-bg-horizontal.png",V="qx.theme.modern.Decoration",bb="#f4f4f4",v="decoration/shadow/shadow-small.png",w="decoration/app-header.png",F="decoration/tabview/tabview-pane.png",S="decoration/form/tooltip-error.png",R="decoration/form/button-focused.png",Q="decoration/tabview/tab-button-bottom-inactive.png",X="decoration/form/button-disabled.png",W="decoration/tabview/tab-button-right-active.png",N="decoration/form/button-pressed.png",U="no-repeat",a="decoration/window/captionbar-active.png",ba="decoration/tabview/tab-button-left-active.png",x="background-splitpane",y="decoration/form/button-checked-focused.png",J="#C5C5C5",b="decoration/toolbar/toolbar-gradient.png",c="decoration/tabview/tab-button-right-inactive.png",C="#b8b8b8",z="decoration/shadow/shadow.png";
qx.Theme.define(V,{aliases:{decoration:be},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:k}},"selected":{decorator:qx.ui.decoration.Background,style:{backgroundImage:G,backgroundRepeat:l}},"pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:A,insets:[0,2,3,0]}},"group":{decorator:qx.ui.decoration.Grid,style:{baseImage:n}},"border-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:j,innerOpacity:0.5,backgroundImage:bo,backgroundRepeat:i,backgroundColor:g}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:h}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:h}},"tooltip-error":{decorator:qx.ui.decoration.Grid,style:{baseImage:S,insets:[2,5,5,2]}},"tooltip-error-arrow":{decorator:qx.ui.decoration.Background,style:{backgroundImage:E,backgroundPositionY:O,backgroundRepeat:U,insets:[0,0,0,10]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:z,insets:[4,8,8,4]}},"shadow-popup":{decorator:qx.ui.decoration.Grid,style:{baseImage:v,insets:[0,3,3,0]}},"scrollbar-horizontal":{decorator:qx.ui.decoration.Background,style:{backgroundImage:P,backgroundRepeat:i}},"scrollbar-vertical":{decorator:qx.ui.decoration.Background,style:{backgroundImage:r,backgroundRepeat:bj}},"scrollbar-slider-horizontal":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bm,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-horizontal-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bm,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"scrollbar-slider-vertical":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bg,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-vertical-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bg,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"button":{decorator:qx.ui.decoration.Grid,style:{baseImage:s,insets:2}},"button-disabled":{decorator:qx.ui.decoration.Grid,style:{baseImage:X,insets:2}},"button-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:R,insets:2}},"button-hovered":{decorator:qx.ui.decoration.Grid,style:{baseImage:Y,insets:2}},"button-pressed":{decorator:qx.ui.decoration.Grid,style:{baseImage:N,insets:2}},"button-checked":{decorator:qx.ui.decoration.Grid,style:{baseImage:p,insets:2}},"button-checked-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:y,insets:2}},"button-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[1]}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[0]}},"input":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bh,innerColor:j,innerOpacity:0.5,backgroundImage:bo,backgroundRepeat:i,backgroundColor:g}},"input-focused":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bh,innerColor:D,backgroundImage:bi,backgroundRepeat:i,backgroundColor:g}},"input-focused-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,backgroundImage:bi,backgroundRepeat:i,backgroundColor:g,insets:[2]}},"input-disabled":{decorator:qx.ui.decoration.Beveled,style:{outerColor:d,innerColor:j,innerOpacity:0.5,backgroundImage:bo,backgroundRepeat:i,backgroundColor:g}},"toolbar":{decorator:qx.ui.decoration.Background,style:{backgroundImage:b,backgroundRepeat:l}},"toolbar-button-hovered":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bl,innerColor:bn,backgroundImage:u,backgroundRepeat:l}},"toolbar-button-checked":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bl,innerColor:bn,backgroundImage:M,backgroundRepeat:l}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,widthRight:1,colorLeft:C,colorRight:bb,styleLeft:m,styleRight:m}},"toolbar-part":{decorator:qx.ui.decoration.Background,style:{backgroundImage:L,backgroundRepeat:bj}},"tabview-pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:F,insets:[4,6,7,4]}},"tabview-page-button-top-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:t}},"tabview-page-button-top-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:I}},"tabview-page-button-bottom-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:bc}},"tabview-page-button-bottom-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:Q}},"tabview-page-button-left-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:ba}},"tabview-page-button-left-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:q}},"tabview-page-button-right-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:W}},"tabview-page-button-right-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:c}},"splitpane":{decorator:qx.ui.decoration.Uniform,style:{backgroundColor:bk,width:3,color:x,style:m}},"window":{decorator:qx.ui.decoration.Single,style:{backgroundColor:bk,width:1,color:k,widthTop:0}},"window-captionbar-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:a}},"window-captionbar-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:bf}},"window-statusbar":{decorator:qx.ui.decoration.Grid,style:{baseImage:bd}},"table":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:k,style:m}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bp,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m,widthBottom:1,colorBottom:j,styleBottom:m}},"table-column-button":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bp,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:H,style:m}},"progressive-table-header":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"progressive-table-header-cell":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bp,backgroundRepeat:l,widthRight:1,colorRight:K,style:m}},"menu":{decorator:qx.ui.decoration.Single,style:{backgroundImage:B,backgroundRepeat:l,width:1,color:k,style:m}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:J,widthBottom:1,colorBottom:o}},"menubar":{decorator:qx.ui.decoration.Single,style:{backgroundImage:T,backgroundRepeat:l,width:1,color:h,style:m}},"app-header":{decorator:qx.ui.decoration.Background,style:{backgroundImage:w,backgroundRepeat:l}}}});
})();
(function(){var a="gui4.theme.Decoration";
qx.Theme.define(a,{extend:qx.theme.modern.Decoration,decorations:{}});
})();
(function(){var n="iPod",m="Win32",l="",k="Win64",j="Linux",i="BSD",h="Macintosh",g="iPhone",f="Windows",e="qx.bom.client.Platform",b="X11",d="MacIntel",c="MacPPC";
qx.Bootstrap.define(e,{statics:{NAME:"",WIN:false,MAC:false,UNIX:false,UNKNOWN_PLATFORM:false,__bM:function(){var o=navigator.platform;
if(o==null||o===l){o=navigator.userAgent;
}
if(o.indexOf(f)!=-1||o.indexOf(m)!=-1||o.indexOf(k)!=-1){this.WIN=true;
this.NAME="win";
}else if(o.indexOf(h)!=-1||o.indexOf(c)!=-1||o.indexOf(d)!=-1||o.indexOf(n)!=-1||o.indexOf(g)!=-1){this.MAC=true;
this.NAME="mac";
}else if(o.indexOf(b)!=-1||o.indexOf(j)!=-1||o.indexOf(i)!=-1){this.UNIX=true;
this.NAME="unix";
}else{this.UNKNOWN_PLATFORM=true;
this.WIN=true;
this.NAME="win";
}}},defer:function(a){a.__bM();
}});
})();
(function(){var j="win98",i="osx2",h="osx0",g="osx4",f="win95",e="win2000",d="osx1",c="osx5",b="osx3",a="Windows NT 5.01",G=")",F="winxp",E="freebsd",D="sunos",C="SV1",B="|",A="nintendods",z="winnt4",y="wince",x="winme",q="os9",r="\.",o="osx",p="linux",m="netbsd",n="winvista",k="openbsd",l="(",s="win2003",t="symbian",v="g",u="qx.bom.client.System",w=" Mobile/";
qx.Bootstrap.define(u,{statics:{NAME:"",SP1:false,SP2:false,WIN95:false,WIN98:false,WINME:false,WINNT4:false,WIN2000:false,WINXP:false,WIN2003:false,WINVISTA:false,WINCE:false,LINUX:false,SUNOS:false,FREEBSD:false,NETBSD:false,OPENBSD:false,OSX:false,OS9:false,SYMBIAN:false,NINTENDODS:false,PSP:false,IPHONE:false,UNKNOWN_SYSTEM:false,__bN:{"Windows NT 6.0":n,"Windows NT 5.2":s,"Windows NT 5.1":F,"Windows NT 5.0":e,"Windows 2000":e,"Windows NT 4.0":z,"Win 9x 4.90":x,"Windows CE":y,"Windows 98":j,"Win98":j,"Windows 95":f,"Win95":f,"Linux":p,"FreeBSD":E,"NetBSD":m,"OpenBSD":k,"SunOS":D,"Symbian System":t,"Nitro":A,"PSP":"sonypsp","Mac OS X 10_5":c,"Mac OS X 10.5":c,"Mac OS X 10_4":g,"Mac OS X 10.4":g,"Mac OS X 10_3":b,"Mac OS X 10.3":b,"Mac OS X 10_2":i,"Mac OS X 10.2":i,"Mac OS X 10_1":d,"Mac OS X 10.1":d,"Mac OS X 10_0":h,"Mac OS X 10.0":h,"Mac OS X":o,"Mac OS 9":q},__bO:function(){var K=navigator.userAgent;
var J=[];

for(var I in this.__bN){J.push(I);
}var L=new RegExp(l+J.join(B).replace(/\./g,r)+G,v);

if(!L.test(K)){this.UNKNOWN_SYSTEM=true;

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
}else{this.NAME=this.__bN[RegExp.$1];
this[this.NAME.toUpperCase()]=true;

if(qx.bom.client.Platform.WIN){if(K.indexOf(a)!==-1){this.SP1=true;
}else if(qx.bom.client.Engine.MSHTML&&K.indexOf(C)!==-1){this.SP2=true;
}}}}},defer:function(H){H.__bO();
}});
})();
(function(){var m="Liberation Sans",l="Arial",k="Lucida Grande",j="Tahoma",i="Candara",h="Segoe UI",g="Consolas",f="Courier New",e="Monaco",d="monospace",a="Lucida Console",c="qx.theme.modern.Font",b="DejaVu Sans Mono";
qx.Theme.define(c,{fonts:{"default":{size:qx.bom.client.System.WINVISTA?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[k]:qx.bom.client.System.WINVISTA?[h,i]:[j,m,l]},"bold":{size:qx.bom.client.System.WINVISTA?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[k]:qx.bom.client.System.WINVISTA?[h,i]:[j,m,l],bold:true},"small":{size:qx.bom.client.System.WINVISTA?11:10,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[k]:qx.bom.client.System.WINVISTA?[h,i]:[j,m,l]},"monospace":{size:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[a,e]:qx.bom.client.System.WINVISTA?[g]:[g,b,f,d]}}});
})();
(function(){var a="gui4.theme.Font";
qx.Theme.define(a,{extend:qx.theme.modern.Font,fonts:{}});
})();
(function(){var c="Tango",b="qx/icon/Tango",a="qx.theme.icon.Tango";
qx.Theme.define(a,{title:c,aliases:{"icon":b},icons:{}});
})();
(function(){var eW="button-frame",eV="atom",eU="widget",eT="main",eS="button",eR="text-selected",eQ="image",eP="bold",eO="middle",eN="background-light",dB="text-disabled",dA="groupbox",dz="decoration/arrows/down.png",dy="cell",dx="selected",dw="border-invalid",dv="input",du="input-disabled",dt="menu-button",ds="input-focused-invalid",fe="toolbar-button",ff="spinner",fc="input-focused",fd="popup",fa="tooltip",fb="list",eX="tree-item",eY="treevirtual-contract",fg="scrollbar",fh="datechooser/nav-button",ew="text-hovered",ev="center",ey="treevirtual-expand",ex="textfield",eA="label",ez="decoration/arrows/right.png",eC="background-application",eB="radiobutton",eu="invalid",et="combobox",bx="right-top",by="checkbox",bz="text-title",bA="qx/static/blank.gif",bB="scrollbar/button",bC="right",bD="combobox/button",bE="icon/16/places/folder.png",bF="text-label",bG="decoration/tree/closed.png",fv="scrollbar-slider-horizontal",fu="white",ft="decoration/arrows/left.png",fs="button-focused",fz="text-light",fy="menu-slidebar-button",fx="text-input",fw="slidebar/button-forward",fB="background-splitpane",fA=".png",cz="decoration/tree/open.png",cA="default",cx="decoration/arrows/down-small.png",cy="datechooser",cD="slidebar/button-backward",cE="selectbox",cB="treevirtual-folder",cC="shadow-popup",cv="icon/16/mimetypes/office-document.png",cw="background-medium",cb="table",ca="decoration/arrows/up.png",cd="decoration/form/",cc="",bW="-invalid",bV="icon/16/places/folder-open.png",bY="button-checked",bX="decoration/window/maximize-active-hovered.png",bU="radiobutton-hovered",bT="decoration/cursors/",cK="slidebar",cL="tooltip-error-arrow",cM="table-scroller-focus-indicator",cN="move-frame",cG="nodrop",cH="decoration/table/boolean-true.png",cI="table-header-cell",cJ="menu",cO="app-header",cP="row-layer",co="text-inactive",cn="move",cm="radiobutton-checked-focused",cl="decoration/window/restore-active-hovered.png",ck="shadow-window",cj="table-column-button",ci="right.png",ch="tabview-page-button-bottom-inactive",cs="tooltip-error",cr="window-statusbar",cQ="button-hovered",cR="decoration/scrollbar/scrollbar-",cS="background-tip",cT="scrollbar-slider-horizontal-disabled",cU="table-scroller-header",cV="radiobutton-disabled",cW="button-pressed",cX="table-pane",cY="decoration/window/close-active.png",da="native",dJ="checkbox-hovered",dI="button-invalid-shadow",dH="checkbox-checked",dG="decoration/window/minimize-active-hovered.png",dN="menubar",dM="icon/16/actions/dialog-cancel.png",dL="tabview-page-button-top-inactive",dK="tabview-page-button-left-inactive",dR="menu-slidebar",dQ="toolbar-button-checked",ep="decoration/tree/open-selected.png",eq="radiobutton-checked",en="decoration/window/minimize-inactive.png",eo="icon/16/apps/office-calendar.png",el="group",em="tabview-page-button-right-inactive",ej="decoration/window/minimize-active.png",ek="decoration/window/restore-inactive.png",er="checkbox-checked-focused",es="splitpane",eG="combobox/textfield",eF="button-preselected-focused",eI="decoration/window/close-active-hovered.png",eH="qx/icon/Tango/16/actions/window-close.png",eK="checkbox-pressed",eJ="button-disabled",eM="tabview-page-button-left-active",eL="border-separator",eE="decoration/window/maximize-inactive.png",eD="icon/22/places/folder-open.png",fo="scrollarea",fp="scrollbar-vertical",fq="decoration/toolbar/toolbar-handle-knob.gif",fr="icon/22/mimetypes/office-document.png",fk="button-preselected",fl="button-checked-focused",fm="up.png",fn="best-fit",fi="decoration/tree/closed-selected.png",fj="qx.theme.modern.Appearance",bw="text-active",bv="checkbox-disabled",bu="toolbar-button-hovered",bt="progressive-table-header",bs="decoration/table/select-column-order.png",br="decoration/menu/radiobutton.gif",bq="decoration/arrows/forward.png",bp="decoration/table/descending.png",bo="window-captionbar-active",bn="checkbox-checked-hovered",bJ="scrollbar-slider-vertical",bK="toolbar",bH="alias",bI="decoration/window/restore-active.png",bN="decoration/table/boolean-false.png",bO="checkbox-checked-disabled",bL="icon/32/mimetypes/office-document.png",bM="radiobutton-checked-disabled",bQ="tabview-pane",bR="decoration/arrows/rewind.png",dV="checkbox-focused",dP="top",ed="#EEE",dY="icon/16/actions/dialog-ok.png",dE="radiobutton-checked-hovered",dC="table-header-cell-hovered",cf="window",dF="text-gray",cq="decoration/menu/radiobutton-invert.gif",cp="text-placeholder",dj="slider",dk="keep-align",dl="down.png",dm="tabview-page-button-top-active",dn="icon/32/places/folder-open.png",dp="icon/22/places/folder.png",dq="decoration/window/maximize-active.png",dr="checkbox-checked-pressed",dh="decoration/window/close-inactive.png",di="toolbar-part",dD="decoration/splitpane/knob-vertical.png",ec=".gif",eb="decoration/menu/checkbox-invert.gif",ea="radiobutton-checked-pressed",eh="table-statusbar",eg="radiobutton-pressed",ef="window-captionbar-inactive",ee="copy",dX="radiobutton-focused",dW="decoration/arrows/down-invert.png",bP="decoration/menu/checkbox.gif",cu="decoration/splitpane/knob-horizontal.png",ct="icon/32/places/folder.png",dO="toolbar-separator",cF="tabview-page-button-bottom-active",dU="decoration/arrows/up-small.png",dT="decoration/table/ascending.png",dS="decoration/arrows/up-invert.png",ce="small",ei="tabview-page-button-right-active",bS="-disabled",cg="scrollbar-horizontal",db="progressive-table-header-cell",dc="menu-separator",dd="pane",de="decoration/arrows/right-invert.png",df="left.png",dg="icon/16/actions/view-refresh.png";
qx.Theme.define(fj,{appearances:{"widget":{},"root":{style:function(bc){return {backgroundColor:eC,textColor:bF,font:cA};
}},"label":{style:function(hf){return {textColor:hf.disabled?dB:undefined};
}},"move-frame":{style:function(gY){return {decorator:eT};
}},"resize-frame":cN,"dragdrop-cursor":{style:function(gg){var gh=cG;

if(gg.copy){gh=ee;
}else if(gg.move){gh=cn;
}else if(gg.alias){gh=bH;
}return {source:bT+gh+ec,position:bx,offset:[2,16,2,6]};
}},"image":{style:function(k){return {opacity:!k.replacement&&k.disabled?0.3:1};
}},"atom":{},"atom/label":eA,"atom/icon":eQ,"popup":{style:function(hw){return {decorator:eT,backgroundColor:eN,shadow:cC};
}},"button-frame":{alias:eV,style:function(hn){var hp,ho;

if(hn.checked&&hn.focused&&!hn.inner){hp=fl;
ho=undefined;
}else if(hn.disabled){hp=eJ;
ho=undefined;
}else if(hn.pressed){hp=cW;
ho=ew;
}else if(hn.checked){hp=bY;
ho=undefined;
}else if(hn.hovered){hp=cQ;
ho=ew;
}else if(hn.preselected&&hn.focused&&!hn.inner){hp=eF;
ho=ew;
}else if(hn.preselected){hp=fk;
ho=ew;
}else if(hn.focused&&!hn.inner){hp=fs;
ho=undefined;
}else{hp=eS;
ho=undefined;
}return {decorator:hp,textColor:ho,shadow:hn.invalid&&!hn.disabled?dI:undefined};
}},"button-frame/image":{style:function(Y){return {opacity:!Y.replacement&&Y.disabled?0.5:1};
}},"button":{alias:eW,include:eW,style:function(O){return {padding:[2,8],center:true};
}},"hover-button":{alias:eV,include:eV,style:function(hY){return {decorator:hY.hovered?dx:undefined,textColor:hY.hovered?eR:undefined};
}},"splitbutton":{},"splitbutton/button":eS,"splitbutton/arrow":{alias:eS,include:eS,style:function(s){return {icon:dz,padding:2,marginLeft:1};
}},"checkbox":{alias:eV,style:function(a){var c;

if(a.checked&&a.focused){c=er;
}else if(a.checked&&a.disabled){c=bO;
}else if(a.checked&&a.pressed){c=dr;
}else if(a.checked&&a.hovered){c=bn;
}else if(a.checked){c=dH;
}else if(a.disabled){c=bv;
}else if(a.focused){c=dV;
}else if(a.pressed){c=eK;
}else if(a.hovered){c=dJ;
}else{c=by;
}var b=a.invalid&&!a.disabled?bW:cc;
return {icon:cd+c+b+fA,gap:6};
}},"radiobutton":{alias:eV,style:function(fT){var fV;

if(fT.checked&&fT.focused){fV=cm;
}else if(fT.checked&&fT.disabled){fV=bM;
}else if(fT.checked&&fT.pressed){fV=ea;
}else if(fT.checked&&fT.hovered){fV=dE;
}else if(fT.checked){fV=eq;
}else if(fT.disabled){fV=cV;
}else if(fT.focused){fV=dX;
}else if(fT.pressed){fV=eg;
}else if(fT.hovered){fV=bU;
}else{fV=eB;
}var fU=fT.invalid&&!fT.disabled?bW:cc;
return {icon:cd+fV+fU+fA,gap:6};
}},"textfield":{style:function(e){var j;
var h=!!e.focused;
var i=!!e.invalid;
var f=!!e.disabled;

if(h&&i&&!f){j=ds;
}else if(h&&!i&&!f){j=fc;
}else if(f){j=du;
}else if(!h&&i&&!f){j=dw;
}else{j=dv;
}var g;

if(e.disabled){g=dB;
}else if(e.showingPlaceholder){g=cp;
}else{g=fx;
}return {decorator:j,padding:[2,4,1],textColor:g};
}},"textarea":{include:ex,style:function(K){return {padding:4};
}},"spinner":{style:function(B){var F;
var D=!!B.focused;
var E=!!B.invalid;
var C=!!B.disabled;

if(D&&E&&!C){F=ds;
}else if(D&&!E&&!C){F=fc;
}else if(C){F=du;
}else if(!D&&E&&!C){F=dw;
}else{F=dv;
}return {decorator:F};
}},"spinner/textfield":{style:function(m){return {marginRight:2,padding:[2,4,1],textColor:m.disabled?dB:fx};
}},"spinner/upbutton":{alias:eW,include:eW,style:function(hP){return {icon:dU,padding:hP.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"spinner/downbutton":{alias:eW,include:eW,style:function(gv){return {icon:cx,padding:gv.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"datefield":et,"datefield/button":{alias:bD,include:bD,style:function(z){return {icon:eo,padding:[0,3],decorator:undefined};
}},"datefield/textfield":eG,"datefield/list":{alias:cy,include:cy,style:function(gr){return {decorator:undefined};
}},"groupbox":{style:function(bi){return {legendPosition:dP};
}},"groupbox/legend":{alias:eV,style:function(gI){return {padding:[1,0,1,4],textColor:gI.invalid?eu:bz,font:eP};
}},"groupbox/frame":{style:function(hR){return {padding:12,decorator:el};
}},"check-groupbox":dA,"check-groupbox/legend":{alias:by,include:by,style:function(hb){return {padding:[1,0,1,4],textColor:hb.invalid?eu:bz,font:eP};
}},"radio-groupbox":dA,"radio-groupbox/legend":{alias:eB,include:eB,style:function(bd){return {padding:[1,0,1,4],textColor:bd.invalid?eu:bz,font:eP};
}},"scrollarea":{style:function(fW){return {minWidth:50,minHeight:50};
}},"scrollarea/corner":{style:function(fC){return {backgroundColor:eC};
}},"scrollarea/pane":eU,"scrollarea/scrollbar-x":fg,"scrollarea/scrollbar-y":fg,"scrollbar":{style:function(L){if(L[da]){return {};
}return {width:L.horizontal?undefined:16,height:L.horizontal?16:undefined,decorator:L.horizontal?cg:fp,padding:1};
}},"scrollbar/slider":{alias:dj,style:function(N){return {padding:N.horizontal?[0,1,0,1]:[1,0,1,0]};
}},"scrollbar/slider/knob":{include:eW,style:function(hU){var hV=hU.horizontal?fv:bJ;

if(hU.disabled){hV+=bS;
}return {decorator:hV,minHeight:hU.horizontal?undefined:9,minWidth:hU.horizontal?9:undefined};
}},"scrollbar/button":{alias:eW,include:eW,style:function(gm){var gn=cR;

if(gm.left){gn+=df;
}else if(gm.right){gn+=ci;
}else if(gm.up){gn+=fm;
}else{gn+=dl;
}
if(gm.left||gm.right){return {padding:[0,0,0,gm.left?3:4],icon:gn,width:15,height:14};
}else{return {padding:[0,0,0,2],icon:gn,width:14,height:15};
}}},"scrollbar/button-begin":bB,"scrollbar/button-end":bB,"slider":{style:function(hC){var hG;
var hE=!!hC.focused;
var hF=!!hC.invalid;
var hD=!!hC.disabled;

if(hE&&hF&&!hD){hG=ds;
}else if(hE&&!hF&&!hD){hG=fc;
}else if(hD){hG=du;
}else if(!hE&&hF&&!hD){hG=dw;
}else{hG=dv;
}return {decorator:hG};
}},"slider/knob":{include:eW,style:function(hj){return {decorator:hj.disabled?cT:fv,shadow:undefined,height:14,width:14};
}},"list":{alias:fo,style:function(hH){var hL;
var hJ=!!hH.focused;
var hK=!!hH.invalid;
var hI=!!hH.disabled;

if(hJ&&hK&&!hI){hL=ds;
}else if(hJ&&!hK&&!hI){hL=fc;
}else if(hI){hL=du;
}else if(!hJ&&hK&&!hI){hL=dw;
}else{hL=dv;
}return {backgroundColor:eN,decorator:hL};
}},"list/pane":eU,"listitem":{alias:eV,style:function(fY){return {padding:4,textColor:fY.selected?eR:undefined,decorator:fY.selected?dx:undefined};
}},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:eW,include:eW,style:function(fM){return {padding:5,center:true,icon:fM.vertical?dz:ez};
}},"slidebar/button-backward":{alias:eW,include:eW,style:function(T){return {padding:5,center:true,icon:T.vertical?ca:ft};
}},"tabview":{style:function(U){return {contentPadding:16};
}},"tabview/bar":{alias:cK,style:function(fR){var fS={marginBottom:fR.barTop?-1:0,marginTop:fR.barBottom?-4:0,marginLeft:fR.barRight?-3:0,marginRight:fR.barLeft?-1:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};

if(fR.barTop||fR.barBottom){fS.paddingLeft=5;
fS.paddingRight=7;
}else{fS.paddingTop=5;
fS.paddingBottom=7;
}return fS;
}},"tabview/bar/button-forward":{include:fw,alias:fw,style:function(fO){if(fO.barTop||fO.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/button-backward":{include:cD,alias:cD,style:function(hg){if(hg.barTop||hg.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(fK){return {decorator:bQ,minHeight:100,marginBottom:fK.barBottom?-1:0,marginTop:fK.barTop?-1:0,marginLeft:fK.barLeft?-1:0,marginRight:fK.barRight?-1:0};
}},"tabview-page":eU,"tabview-page/button":{alias:eV,style:function(gB){var gH,gD=0;
var gG=0,gC=0,gE=0,gF=0;

if(gB.checked){if(gB.barTop){gH=dm;
gD=[6,14];
gE=gB.firstTab?0:-5;
gF=gB.lastTab?0:-5;
}else if(gB.barBottom){gH=cF;
gD=[6,14];
gE=gB.firstTab?0:-5;
gF=gB.lastTab?0:-5;
}else if(gB.barRight){gH=ei;
gD=[6,13];
gG=gB.firstTab?0:-5;
gC=gB.lastTab?0:-5;
}else{gH=eM;
gD=[6,13];
gG=gB.firstTab?0:-5;
gC=gB.lastTab?0:-5;
}}else{if(gB.barTop){gH=dL;
gD=[4,10];
gG=4;
gE=gB.firstTab?5:1;
gF=1;
}else if(gB.barBottom){gH=ch;
gD=[4,10];
gC=4;
gE=gB.firstTab?5:1;
gF=1;
}else if(gB.barRight){gH=em;
gD=[4,10];
gF=5;
gG=gB.firstTab?5:1;
gC=1;
gE=1;
}else{gH=dK;
gD=[4,10];
gE=5;
gG=gB.firstTab?5:1;
gC=1;
gF=1;
}}return {zIndex:gB.checked?10:5,decorator:gH,padding:gD,marginTop:gG,marginBottom:gC,marginLeft:gE,marginRight:gF,textColor:gB.checked?bw:co};
}},"tabview-page/button/close-button":{alias:eV,style:function(fE){return {icon:eH};
}},"toolbar":{style:function(M){return {decorator:bK,spacing:2};
}},"toolbar/part":{style:function(gS){return {decorator:di,spacing:2};
}},"toolbar/part/container":{style:function(hx){return {paddingLeft:2,paddingRight:2};
}},"toolbar/part/handle":{style:function(fP){return {source:fq,marginLeft:3,marginRight:3};
}},"toolbar-button":{alias:eV,style:function(v){return {marginTop:2,marginBottom:2,padding:(v.pressed||v.checked||v.hovered)&&!v.disabled||(v.disabled&&v.checked)?3:5,decorator:v.pressed||(v.checked&&!v.hovered)||(v.checked&&v.disabled)?dQ:v.hovered&&!v.disabled?bu:undefined};
}},"toolbar-menubutton":{alias:fe,include:fe,style:function(be){return {showArrow:true};
}},"toolbar-menubutton/arrow":{alias:eQ,include:eQ,style:function(bh){return {source:cx};
}},"toolbar-splitbutton":{style:function(hc){return {marginTop:2,marginBottom:2};
}},"toolbar-splitbutton/button":{alias:fe,include:fe,style:function(hk){return {icon:dz,marginTop:undefined,marginBottom:undefined};
}},"toolbar-splitbutton/arrow":{alias:fe,include:fe,style:function(fI){return {padding:fI.pressed||fI.checked?1:fI.hovered?1:3,icon:dz,marginTop:undefined,marginBottom:undefined};
}},"toolbar-separator":{style:function(hl){return {decorator:dO,margin:7};
}},"tree":fb,"tree-item":{style:function(gy){return {padding:[2,6],textColor:gy.selected?eR:undefined,decorator:gy.selected?dx:undefined};
}},"tree-item/icon":{include:eQ,style:function(gT){return {paddingRight:5};
}},"tree-item/label":eA,"tree-item/open":{include:eQ,style:function(ht){var hu;

if(ht.selected&&ht.opened){hu=ep;
}else if(ht.selected&&!ht.opened){hu=fi;
}else if(ht.opened){hu=cz;
}else{hu=bG;
}return {padding:[0,5,0,2],source:hu};
}},"tree-folder":{include:eX,alias:eX,style:function(gU){var gV;

if(gU.small){gV=gU.opened?bV:bE;
}else if(gU.large){gV=gU.opened?dn:ct;
}else{gV=gU.opened?eD:dp;
}return {icon:gV};
}},"tree-file":{include:eX,alias:eX,style:function(hs){return {icon:hs.small?cv:hs.large?bL:fr};
}},"treevirtual":cb,"treevirtual-folder":{style:function(gs){return {icon:gs.opened?bV:bE};
}},"treevirtual-file":{include:cB,alias:cB,style:function(y){return {icon:cv};
}},"treevirtual-line":{style:function(gw){return {icon:bA};
}},"treevirtual-contract":{style:function(gR){return {icon:cz,paddingLeft:5,paddingTop:2};
}},"treevirtual-expand":{style:function(hO){return {icon:bG,paddingLeft:5,paddingTop:2};
}},"treevirtual-only-contract":eY,"treevirtual-only-expand":ey,"treevirtual-start-contract":eY,"treevirtual-start-expand":ey,"treevirtual-end-contract":eY,"treevirtual-end-expand":ey,"treevirtual-cross-contract":eY,"treevirtual-cross-expand":ey,"treevirtual-end":{style:function(R){return {icon:bA};
}},"treevirtual-cross":{style:function(hm){return {icon:bA};
}},"tooltip":{include:fd,style:function(gP){return {backgroundColor:cS,padding:[1,3,2,3],offset:[15,5,5,5]};
}},"tooltip/atom":eV,"tooltip-error":{include:fa,style:function(gt){return {textColor:eR,placeMethod:eU,offsetRight:15,position:bx,showTimeout:100,hideTimeout:10000,decorator:cs,shadow:cL,font:eP};
}},"tooltip-error/atom":eV,"window":{style:function(t){return {shadow:ck,contentPadding:[10,10,10,10]};
}},"window/pane":{style:function(d){return {decorator:cf};
}},"window/captionbar":{style:function(I){return {decorator:I.active?bo:ef,textColor:I.active?fu:dF,minHeight:26,paddingRight:2};
}},"window/icon":{style:function(fQ){return {margin:[5,0,3,6]};
}},"window/title":{style:function(gf){return {alignY:eO,font:eP,marginLeft:6,marginRight:12};
}},"window/minimize-button":{alias:eV,style:function(hX){return {icon:hX.active?hX.hovered?dG:ej:en,margin:[4,8,2,0]};
}},"window/restore-button":{alias:eV,style:function(hi){return {icon:hi.active?hi.hovered?cl:bI:ek,margin:[5,8,2,0]};
}},"window/maximize-button":{alias:eV,style:function(gi){return {icon:gi.active?gi.hovered?bX:dq:eE,margin:[4,8,2,0]};
}},"window/close-button":{alias:eV,style:function(r){return {icon:r.active?r.hovered?eI:cY:dh,margin:[4,8,2,0]};
}},"window/statusbar":{style:function(gl){return {padding:[2,6],decorator:cr,minHeight:18};
}},"window/statusbar-text":{style:function(hB){return {font:ce};
}},"iframe":{style:function(o){return {decorator:eT};
}},"resizer":{style:function(n){return {decorator:dd};
}},"splitpane":{style:function(hM){return {decorator:es};
}},"splitpane/splitter":{style:function(gk){return {width:gk.horizontal?3:undefined,height:gk.vertical?3:undefined,backgroundColor:fB};
}},"splitpane/splitter/knob":{style:function(S){return {source:S.horizontal?cu:dD};
}},"splitpane/slider":{style:function(gz){return {width:gz.horizontal?3:undefined,height:gz.vertical?3:undefined,backgroundColor:fB};
}},"selectbox":{alias:eW,include:eW,style:function(gq){return {padding:[2,8]};
}},"selectbox/atom":eV,"selectbox/popup":fd,"selectbox/list":{alias:fb},"selectbox/arrow":{include:eQ,style:function(gW){return {source:dz,paddingLeft:5};
}},"datechooser":{style:function(gJ){var gN;
var gL=!!gJ.focused;
var gM=!!gJ.invalid;
var gK=!!gJ.disabled;

if(gL&&gM&&!gK){gN=ds;
}else if(gL&&!gM&&!gK){gN=fc;
}else if(gK){gN=du;
}else if(!gL&&gM&&!gK){gN=dw;
}else{gN=dv;
}return {padding:2,decorator:gN,backgroundColor:eN};
}},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:eW,alias:eW,style:function(hS){var hT={padding:[2,4],shadow:undefined};

if(hS.lastYear){hT.icon=bR;
hT.marginRight=1;
}else if(hS.lastMonth){hT.icon=ft;
}else if(hS.nextYear){hT.icon=bq;
hT.marginLeft=1;
}else if(hS.nextMonth){hT.icon=ez;
}return hT;
}},"datechooser/last-year-button-tooltip":fa,"datechooser/last-month-button-tooltip":fa,"datechooser/next-year-button-tooltip":fa,"datechooser/next-month-button-tooltip":fa,"datechooser/last-year-button":fh,"datechooser/last-month-button":fh,"datechooser/next-month-button":fh,"datechooser/next-year-button":fh,"datechooser/month-year-label":{style:function(u){return {font:eP,textAlign:ev,textColor:u.disabled?dB:undefined};
}},"datechooser/date-pane":{style:function(bg){return {textColor:bg.disabled?dB:undefined,marginTop:2};
}},"datechooser/weekday":{style:function(X){return {textColor:X.disabled?dB:X.weekend?fz:undefined,textAlign:ev,paddingTop:2,backgroundColor:cw};
}},"datechooser/week":{style:function(hA){return {textAlign:ev,padding:[2,4],backgroundColor:cw};
}},"datechooser/day":{style:function(hQ){return {textAlign:ev,decorator:hQ.disabled?undefined:hQ.selected?dx:undefined,textColor:hQ.disabled?dB:hQ.selected?eR:hQ.otherMonth?fz:undefined,font:hQ.today?eP:undefined,padding:[2,4]};
}},"combobox":{style:function(ga){var ge;
var gc=!!ga.focused;
var gd=!!ga.invalid;
var gb=!!ga.disabled;

if(gc&&gd&&!gb){ge=ds;
}else if(gc&&!gd&&!gb){ge=fc;
}else if(gb){ge=du;
}else if(!gc&&gd&&!gb){ge=dw;
}else{ge=dv;
}return {decorator:ge};
}},"combobox/popup":fd,"combobox/list":{alias:fb},"combobox/button":{include:eW,alias:eW,style:function(hd){var he={icon:dz,padding:2};

if(hd.selected){he.decorator=fs;
}return he;
}},"combobox/textfield":{include:ex,style:function(fX){return {decorator:undefined};
}},"menu":{style:function(p){var q={decorator:cJ,shadow:cC,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,placementModeY:p.submenu||p.contextmenu?fn:dk};

if(p.submenu){q.position=bx;
q.offset=[-2,-3];
}return q;
}},"menu/slidebar":dR,"menu-slidebar":eU,"menu-slidebar-button":{style:function(J){return {decorator:J.hovered?dx:undefined,padding:7,center:true};
}},"menu-slidebar/button-backward":{include:fy,style:function(gp){return {icon:gp.hovered?dS:ca};
}},"menu-slidebar/button-forward":{include:fy,style:function(bk){return {icon:bk.hovered?dW:dz};
}},"menu-separator":{style:function(bl){return {height:0,decorator:dc,margin:[4,2]};
}},"menu-button":{alias:eV,style:function(l){return {decorator:l.selected?dx:undefined,textColor:l.selected?eR:undefined,padding:[4,6]};
}},"menu-button/icon":{include:eQ,style:function(V){return {alignY:eO};
}},"menu-button/label":{include:eA,style:function(gO){return {alignY:eO,padding:1};
}},"menu-button/shortcut":{include:eA,style:function(gu){return {alignY:eO,marginLeft:14,padding:1};
}},"menu-button/arrow":{include:eQ,style:function(w){return {source:w.selected?de:ez,alignY:eO};
}},"menu-checkbox":{alias:dt,include:dt,style:function(ia){return {icon:!ia.checked?undefined:ia.selected?eb:bP};
}},"menu-radiobutton":{alias:dt,include:dt,style:function(fJ){return {icon:!fJ.checked?undefined:fJ.selected?cq:br};
}},"menubar":{style:function(hq){return {decorator:dN};
}},"menubar-button":{alias:eV,style:function(hh){return {decorator:hh.pressed||hh.hovered?dx:undefined,textColor:hh.pressed||hh.hovered?eR:undefined,padding:[3,8]};
}},"colorselector":eU,"colorselector/control-bar":eU,"colorselector/control-pane":eU,"colorselector/visual-pane":dA,"colorselector/preset-grid":eU,"colorselector/colorbucket":{style:function(fG){return {decorator:eT,width:16,height:16};
}},"colorselector/preset-field-set":dA,"colorselector/input-field-set":dA,"colorselector/preview-field-set":dA,"colorselector/hex-field-composite":eU,"colorselector/hex-field":ex,"colorselector/rgb-spinner-composite":eU,"colorselector/rgb-spinner-red":ff,"colorselector/rgb-spinner-green":ff,"colorselector/rgb-spinner-blue":ff,"colorselector/hsb-spinner-composite":eU,"colorselector/hsb-spinner-hue":ff,"colorselector/hsb-spinner-saturation":ff,"colorselector/hsb-spinner-brightness":ff,"colorselector/preview-content-old":{style:function(W){return {decorator:eT,width:50,height:10};
}},"colorselector/preview-content-new":{style:function(ib){return {decorator:eT,backgroundColor:eN,width:50,height:10};
}},"colorselector/hue-saturation-field":{style:function(bb){return {decorator:eT,margin:5};
}},"colorselector/brightness-field":{style:function(hz){return {decorator:eT,margin:[5,7]};
}},"colorselector/hue-saturation-pane":eU,"colorselector/hue-saturation-handle":eU,"colorselector/brightness-pane":eU,"colorselector/brightness-handle":eU,"colorpopup":{alias:fd,include:fd,style:function(hy){return {padding:5,backgroundColor:eC};
}},"colorpopup/field":{style:function(fL){return {decorator:eT,margin:2,width:14,height:14,backgroundColor:eN};
}},"colorpopup/selector-button":eS,"colorpopup/auto-button":eS,"colorpopup/preview-pane":dA,"colorpopup/current-preview":{style:function(gX){return {height:20,padding:4,marginLeft:4,decorator:eT,allowGrowX:true};
}},"colorpopup/selected-preview":{style:function(Q){return {height:20,padding:4,marginRight:4,decorator:eT,allowGrowX:true};
}},"colorpopup/colorselector-okbutton":{alias:eS,include:eS,style:function(fN){return {icon:dY};
}},"colorpopup/colorselector-cancelbutton":{alias:eS,include:eS,style:function(x){return {icon:dM};
}},"table":{alias:eU,style:function(ba){return {decorator:cb};
}},"table-header":{},"table/statusbar":{style:function(fH){return {decorator:eh,padding:[0,2]};
}},"table/column-button":{alias:eW,style:function(fD){return {decorator:cj,padding:3,icon:bs};
}},"table-column-reset-button":{include:dt,alias:dt,style:function(){return {icon:dg};
}},"table-scroller":eU,"table-scroller/scrollbar-x":fg,"table-scroller/scrollbar-y":fg,"table-scroller/header":{style:function(go){return {decorator:cU};
}},"table-scroller/pane":{style:function(bf){return {backgroundColor:cX};
}},"table-scroller/focus-indicator":{style:function(fF){return {decorator:cM};
}},"table-scroller/resize-line":{style:function(bj){return {backgroundColor:eL,width:2};
}},"table-header-cell":{alias:eV,style:function(G){return {minWidth:13,minHeight:20,padding:G.hovered?[3,4,2,4]:[3,4],decorator:G.hovered?dC:cI,sortIcon:G.sorted?(G.sortedAscending?dT:bp):undefined};
}},"table-header-cell/label":{style:function(gA){return {minWidth:0,alignY:eO,paddingRight:5};
}},"table-header-cell/sort-icon":{style:function(gj){return {alignY:eO,alignX:bC};
}},"table-header-cell/icon":{style:function(gx){return {minWidth:0,alignY:eO,paddingRight:5};
}},"table-editor-textfield":{include:ex,style:function(hN){return {decorator:undefined,padding:[2,2],backgroundColor:eN};
}},"table-editor-selectbox":{include:cE,alias:cE,style:function(hr){return {padding:[0,2],backgroundColor:eN};
}},"table-editor-combobox":{include:et,alias:et,style:function(H){return {decorator:undefined,backgroundColor:eN};
}},"progressive-table-header":{alias:eU,style:function(hv){return {decorator:bt};
}},"progressive-table-header-cell":{alias:eV,style:function(ha){return {minWidth:40,minHeight:25,paddingLeft:6,decorator:db};
}},"app-header":{style:function(hW){return {font:eP,textColor:eR,padding:[8,12],decorator:cO};
}},"virtual-list":fb,"virtual-list/row-layer":cP,"row-layer":{style:function(A){return {colorEven:fu,colorOdd:ed};
}},"column-layer":eU,"cell":{style:function(P){return {textColor:P.selected?eR:bF,padding:[3,6],font:cA};
}},"cell-string":dy,"cell-number":{include:dy,style:function(bm){return {textAlign:bC};
}},"cell-image":dy,"cell-boolean":{include:dy,style:function(gQ){return {iconTrue:cH,iconFalse:bN};
}},"cell-atom":dy,"cell-date":dy,"cell-html":dy}});
})();
(function(){var a="gui4.theme.Appearance";
qx.Theme.define(a,{extend:qx.theme.modern.Appearance,appearances:{}});
})();
(function(){var a="gui4.theme.Theme";
qx.Theme.define(a,{meta:{color:gui4.theme.Color,decoration:gui4.theme.Decoration,font:gui4.theme.Font,icon:qx.theme.icon.Tango,appearance:gui4.theme.Appearance}});
})();
(function(){var k="emulated",j="native",h='"',g="qx.lang.Core",f="\\\\",e="\\\"",d="[object Error]";
qx.Bootstrap.define(g,{statics:{errorToString:qx.lang.Object.select((!Error.prototype.toString||Error.prototype.toString()==d)?k:j,{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}),arrayIndexOf:qx.lang.Object.select(Array.prototype.indexOf?j:k,{"native":Array.prototype.indexOf,"emulated":function(C,D){if(D==null){D=0;
}else if(D<0){D=Math.max(0,this.length+D);
}
for(var i=D;i<this.length;i++){if(this[i]===C){return i;
}}return -1;
}}),arrayLastIndexOf:qx.lang.Object.select(Array.prototype.lastIndexOf?j:k,{"native":Array.prototype.lastIndexOf,"emulated":function(q,r){if(r==null){r=this.length-1;
}else if(r<0){r=Math.max(0,this.length+r);
}
for(var i=r;i>=0;i--){if(this[i]===q){return i;
}}return -1;
}}),arrayForEach:qx.lang.Object.select(Array.prototype.forEach?j:k,{"native":Array.prototype.forEach,"emulated":function(z,A){var l=this.length;

for(var i=0;i<l;i++){var B=this[i];

if(B!==undefined){z.call(A||window,B,i,this);
}}}}),arrayFilter:qx.lang.Object.select(Array.prototype.filter?j:k,{"native":Array.prototype.filter,"emulated":function(m,n){var o=[];
var l=this.length;

for(var i=0;i<l;i++){var p=this[i];

if(p!==undefined){if(m.call(n||window,p,i,this)){o.push(this[i]);
}}}return o;
}}),arrayMap:qx.lang.Object.select(Array.prototype.map?j:k,{"native":Array.prototype.map,"emulated":function(v,w){var x=[];
var l=this.length;

for(var i=0;i<l;i++){var y=this[i];

if(y!==undefined){x[i]=v.call(w||window,y,i,this);
}}return x;
}}),arraySome:qx.lang.Object.select(Array.prototype.some?j:k,{"native":Array.prototype.some,"emulated":function(s,t){var l=this.length;

for(var i=0;i<l;i++){var u=this[i];

if(u!==undefined){if(s.call(t||window,u,i,this)){return true;
}}}return false;
}}),arrayEvery:qx.lang.Object.select(Array.prototype.every?j:k,{"native":Array.prototype.every,"emulated":function(a,b){var l=this.length;

for(var i=0;i<l;i++){var c=this[i];

if(c!==undefined){if(!a.call(b||window,c,i,this)){return false;
}}}return true;
}}),stringQuote:qx.lang.Object.select(String.prototype.quote?j:k,{"native":String.prototype.quote,"emulated":function(){return h+this.replace(/\\/g,f).replace(/\"/g,e)+h;
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
(function(){var k="indexOf",j="lastIndexOf",h="slice",g="concat",f="join",e="toLocaleUpperCase",d="shift",c="substr",b="filter",a="unshift",I="match",H="quote",G="qx.lang.Generics",F="localeCompare",E="sort",D="some",C="charAt",B="split",A="substring",z="pop",t="toUpperCase",u="replace",q="push",r="charCodeAt",o="every",p="reverse",m="search",n="forEach",v="map",w="toLowerCase",y="splice",x="toLocaleLowerCase";
qx.Bootstrap.define(G,{statics:{__bP:{"Array":[f,p,E,q,z,d,a,y,g,h,k,j,n,v,b,D,o],"String":[H,A,w,t,C,r,k,j,x,e,F,I,m,u,B,c,g,h]},__bQ:function(O,P){return function(s){return O.prototype[P].apply(s,Array.prototype.slice.call(arguments,1));
};
},__bR:function(){var J=qx.lang.Generics.__bP;

for(var N in J){var L=window[N];
var K=J[N];

for(var i=0,l=K.length;i<l;i++){var M=K[i];

if(!L[M]){L[M]=qx.lang.Generics.__bQ(L,M);
}}}}},defer:function(Q){Q.__bR();
}});
})();
(function(){var h="qx.event.type.Data",g="qx.event.type.Event",f="qx.data.IListData";
qx.Interface.define(f,{events:{"change":h,"changeLength":g},members:{getItem:function(j){},setItem:function(d,e){},splice:function(a,b,c){},contains:function(i){},getLength:function(){},toArray:function(){}}});
})();
(function(){var a="qx.lang.Date";
qx.Bootstrap.define(a,{statics:{now:function(){return +new Date;
}}});
})();
(function(){var g="qx.globalErrorHandling",f="on",e="qx.event.GlobalError";
qx.Bootstrap.define(e,{statics:{setErrorHandler:function(h,i){this.__bS=h||null;
this.__bT=i||window;

if(qx.core.Setting.get(g)===f){if(h&&!window.onerror){window.onerror=qx.lang.Function.bind(this.__bU,this);
}
if(!h&&window.onerror){window.onerror=null;
}}},__bU:function(a,b,c){if(this.__bS){this.handleError(new qx.core.WindowError(a,b,c));
return true;
}},observeMethod:function(l){if(qx.core.Setting.get(g)===f){var self=this;
return function(){if(!self.__bS){return l.apply(this,arguments);
}
try{return l.apply(this,arguments);
}catch(d){self.handleError(d);
}};
}else{return l;
}},handleError:function(k){if(this.__bS){this.__bS.call(this.__bT,k);
}}},defer:function(j){qx.core.Setting.define(g,f);
j.setErrorHandler(null,null);
}});
})();
(function(){var b="",a="qx.core.WindowError";
qx.Class.define(a,{extend:Error,construct:function(c,d,e){Error.call(this,c);
this.__bV=c;
this.__bW=d||b;
this.__bX=e===undefined?-1:e;
},members:{__bV:null,__bW:null,__bX:null,toString:function(){return this.__bV;
},getUri:function(){return this.__bW;
},getLineNumber:function(){return this.__bX;
}}});
})();
(function(){var d="qx.event.type.Event";
qx.Class.define(d,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(h,i){{};
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
},clone:function(l){if(l){var m=l;
}else{var m=qx.event.Pool.getInstance().getObject(this.constructor);
}m._type=this._type;
m._target=this._target;
m._currentTarget=this._currentTarget;
m._relatedTarget=this._relatedTarget;
m._originalTarget=this._originalTarget;
m._stopPropagation=this._stopPropagation;
m._bubbles=this._bubbles;
m._preventDefault=this._preventDefault;
m._cancelable=this._cancelable;
return m;
},stop:function(){this.stopPropagation();
this.preventDefault();
},stopPropagation:function(){{};
this._stopPropagation=true;
},getPropagationStopped:function(){return !!this._stopPropagation;
},preventDefault:function(){{};
this._preventDefault=true;
},getDefaultPrevented:function(){return !!this._preventDefault;
},getType:function(){return this._type;
},setType:function(b){this._type=b;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(a){this._eventPhase=a;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(f){this._target=f;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(g){this._currentTarget=g;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(k){this._relatedTarget=k;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(e){this._originalTarget=e;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(j){this._bubbles=j;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(c){this._cancelable=c;
}},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;
}});
})();
(function(){var a="qx.event.type.Data";
qx.Class.define(a,{extend:qx.event.type.Event,members:{__bY:null,__ca:null,init:function(d,e,f){arguments.callee.base.call(this,false,f);
this.__bY=d;
this.__ca=e;
return this;
},clone:function(b){var c=arguments.callee.base.call(this,b);
c.__bY=this.__bY;
c.__ca=this.__ca;
return c;
},getData:function(){return this.__bY;
},getOldData:function(){return this.__ca;
}},destruct:function(){this.__bY=this.__ca=null;
}});
})();
(function(){var a="qx.event.IEventHandler";
qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:3},members:{canHandleEvent:function(e,f){},registerEvent:function(b,c,d){},unregisterEvent:function(g,h,i){}}});
})();
(function(){var s="load",r="unload",q="qx.client",p="ready",o="mshtml",n="qx.event.handler.Application",m="complete",l="gecko|opera|webkit",k="left",j="DOMContentLoaded",i="shutdown";
qx.Class.define(n,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(y){arguments.callee.base.call(this);
this._window=y.getWindow();
this.__cb=false;
this.__cc=false;
this._initObserver();
qx.event.handler.Application.$$instance=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,__cd:false,onScriptLoaded:function(){this.__cd=true;
var z=qx.event.handler.Application.$$instance;

if(z){z.__cg();
}}},members:{canHandleEvent:function(g,h){},registerEvent:function(u,v,w){},unregisterEvent:function(a,b,c){},__ce:null,__cb:null,__cc:null,__cf:null,__cg:function(){var f=qx.event.handler.Application;
if(!this.__ce&&this.__cb&&f.__cd){this.__ce=true;
qx.event.Registration.fireEvent(this._window,p);
}},isApplicationReady:function(){return this.__ce;
},_initObserver:function(){if(qx.$$domReady||document.readyState==m){this.__cb=true;
this.__cg();
}else{this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);

if(qx.core.Variant.isSet(q,l)){qx.bom.Event.addNativeListener(this._window,j,this._onNativeLoadWrapped);
}else if(qx.core.Variant.isSet(q,o)){var self=this;
var x=function(){try{document.documentElement.doScroll(k);

if(document.body){self._onNativeLoadWrapped();
}}catch(t){window.setTimeout(x,100);
}};
x();
}qx.bom.Event.addNativeListener(this._window,s,this._onNativeLoadWrapped);
}this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);
qx.bom.Event.addNativeListener(this._window,r,this._onNativeUnloadWrapped);
},_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,s,this._onNativeLoadWrapped);
}qx.bom.Event.removeNativeListener(this._window,r,this._onNativeUnloadWrapped);
this._onNativeLoadWrapped=null;
this._onNativeUnloadWrapped=null;
},_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__cb=true;
this.__cg();
}),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__cf){this.__cf=true;

try{qx.event.Registration.fireEvent(this._window,i);
}catch(e){throw e;
}finally{qx.core.ObjectRegistry.shutdown();
}}})},destruct:function(){this._stopObserver();
this._window=null;
},defer:function(d){qx.event.Registration.addHandler(d);
}});
})();
(function(){var z=":",y="qx.client",x="anonymous",w="...",v="qx.dev.StackTrace",u="",t="\n",s="/source/class/",r=".";
qx.Bootstrap.define(v,{statics:{getStackTrace:qx.core.Variant.select(y,{"gecko":function(){try{throw new Error();
}catch(h){var U=this.getStackTraceFromError(h);
qx.lang.Array.removeAt(U,0);
var S=this.getStackTraceFromCaller(arguments);
var Q=S.length>U.length?S:U;

for(var i=0;i<Math.min(S.length,U.length);i++){var R=S[i];

if(R.indexOf(x)>=0){continue;
}var Y=R.split(z);

if(Y.length!=2){continue;
}var W=Y[0];
var P=Y[1];
var O=U[i];
var ba=O.split(z);
var V=ba[0];
var N=ba[1];

if(qx.Class.getByName(V)){var T=V;
}else{T=W;
}var X=T+z;

if(P){X+=P+z;
}X+=N;
Q[i]=X;
}return Q;
}},"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},"opera":function(){var j;

try{j.bar();
}catch(M){var k=this.getStackTraceFromError(M);
qx.lang.Array.removeAt(k,0);
return k;
}return [];
}}),getStackTraceFromCaller:qx.core.Variant.select(y,{"opera":function(bb){return [];
},"default":function(l){var q=[];
var p=qx.lang.Function.getCaller(l);
var m={};

while(p){var n=qx.lang.Function.getName(p);
q.push(n);

try{p=p.caller;
}catch(E){break;
}
if(!p){break;
}var o=qx.core.ObjectRegistry.toHashCode(p);

if(m[o]){q.push(w);
break;
}m[o]=p;
}return q;
}}),getStackTraceFromError:qx.core.Variant.select(y,{"gecko":function(F){if(!F.stack){return [];
}var L=/@(.+):(\d+)$/gm;
var G;
var H=[];

while((G=L.exec(F.stack))!=null){var I=G[1];
var K=G[2];
var J=this.__ch(I);
H.push(J+z+K);
}return H;
},"webkit":function(bc){if(bc.sourceURL&&bc.line){return [this.__ch(bc.sourceURL)+z+bc.line];
}else{return [];
}},"opera":function(a){if(a.message.indexOf("Backtrace:")<0){return [];
}var c=[];
var d=qx.lang.String.trim(a.message.split("Backtrace:")[1]);
var e=d.split(t);

for(var i=0;i<e.length;i++){var b=e[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(b&&b.length>=2){var g=b[1];
var f=this.__ch(b[2]);
c.push(f+z+g);
}}return c;
},"default":function(){return [];
}}),__ch:function(A){var D=s;
var B=A.indexOf(D);
var C=(B==-1)?A:A.substring(B+D.length).replace(/\//g,r).replace(/\.js$/,u);
return C;
}}});
})();
(function(){var b="qx.util.ObjectPool",a="Integer";
qx.Class.define(b,{extend:qx.core.Object,construct:function(c){arguments.callee.base.call(this);
this.__ci={};

if(c!=null){this.setSize(c);
}},properties:{size:{check:a,init:Infinity}},members:{__ci:null,getObject:function(k){if(this.$$disposed){return;
}
if(!k){throw new Error("Class needs to be defined!");
}var m=null;
var n=this.__ci[k.classname];

if(n){m=n.pop();
}
if(m){m.$$pooled=false;
}else{m=new k;
}return m;
},poolObject:function(g){if(!this.__ci){return;
}var h=g.classname;
var j=this.__ci[h];

if(g.$$pooled){throw new Error("Object is already pooled: "+g);
}
if(!j){this.__ci[h]=j=[];
}if(j.length>this.getSize()){if(g.destroy){g.destroy();
}else{g.dispose();
}return;
}g.$$pooled=true;
j.push(g);
}},destruct:function(){var f=this.__ci;
var d,e,i,l;

for(d in f){e=f[d];

for(i=0,l=e.length;i<l;i++){e[i].dispose();
}}delete this.__ci;
}});
})();
(function(){var b="singleton",a="qx.event.Pool";
qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){arguments.callee.base.call(this,30);
}});
})();
(function(){var b="Don't use 'disposeFields' - instead assign directly to 'null'",a="qx.util.DisposeUtil";
qx.Class.define(a,{statics:{disposeFields:function(c,d){qx.log.Logger.deprecatedMethodWarning(arguments.callee,b);
var name;

for(var i=0,l=d.length;i<l;i++){var name=d[i];

if(c[name]==null||!c.hasOwnProperty(name)){continue;
}c[name]=null;
}},disposeObjects:function(s,t){var name;

for(var i=0,l=t.length;i<l;i++){name=t[i];

if(s[name]==null||!s.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(s[name].dispose){s[name].dispose();
}else{throw new Error("Has no disposable object under key: "+name+"!");
}}s[name]=null;
}},disposeArray:function(f,g){var j=f[g];

if(!j){return;
}if(qx.core.ObjectRegistry.inShutDown){f[g]=null;
return;
}try{var h;

for(var i=j.length-1;i>=0;i--){h=j[i];

if(h){h.dispose();
}}}catch(e){throw new Error("The array field: "+g+" of object: "+f+" has non disposable entries: "+e);
}j.length=0;
f[g]=null;
},disposeMap:function(k,m){var n=k[m];

if(!n){return;
}if(qx.core.ObjectRegistry.inShutDown){k[m]=null;
return;
}try{for(var o in n){if(n.hasOwnProperty(o)){n[o].dispose();
}}}catch(u){throw new Error("The map field: "+m+" of object: "+k+" has non disposable entries: "+u);
}k[m]=null;
},disposeTriggeredBy:function(p,q){var r=q.dispose;
q.dispose=function(){r.call(q);
p.dispose();
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
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(j){this._manager=j;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(g,event,h){return !event.getBubbles();
},dispatchEvent:function(c,event,d){event.setEventPhase(qx.event.type.Event.AT_TARGET);
var e=this._manager.getListeners(c,d,false);

if(e){for(var i=0,l=e.length;i<l;i++){var f=e[i].context||c;
e[i].handler.call(f,event);
}}}},defer:function(b){qx.event.Registration.addDispatcher(b);
}});
})();
(function(){var M="get",L="",K="[",J="]",I="last",H="change",G=".",F="Number",E="String",D="set",bc="deepBinding",bb="item",ba="reset",Y="' (",X="Boolean",W=").",V=") to the object '",U="Integer",T="qx.data.SingleValueBinding",S="No event could be found for the property",Q="PositiveNumber",R="Binding from '",O="PositiveInteger",P="Binding does not exist!",N="Date";
qx.Class.define(T,{statics:{DEBUG_ON:false,__cj:{},bind:function(ci,cj,ck,cl,cm){var cr=cj.split(G);
var co=this.__cq(cr);
var cu=[];
var cv=[];
var cs=[];
var cp=[];
var cq=ci;
for(var i=0;i<cr.length;i++){if(co[i]!==L){cp.push(H);
}else{cp.push(this.__cl(cq,cr[i]));
}cu[i]=cq;
if(i==cr.length-1){if(co[i]!==L){var cy=co[i]===I?cq.length-1:co[i];
var cn=cq.getItem(cy);
this.__cp(cn,ck,cl,cm,ci);
cs[i]=this.__cr(cq,cp[i],ck,cl,cm,co[i]);
}else{if(cr[i]!=null&&cq[M+qx.lang.String.firstUp(cr[i])]!=null){var cn=cq[M+qx.lang.String.firstUp(cr[i])]();
this.__cp(cn,ck,cl,cm,ci);
}cs[i]=this.__cr(cq,cp[i],ck,cl,cm);
}}else{var cw={index:i,propertyNames:cr,sources:cu,listenerIds:cs,arrayIndexValues:co,targetObject:ck,targetProperty:cl,options:cm,listeners:cv};
var ct=qx.lang.Function.bind(this.__ck,this,cw);
cv.push(ct);
cs[i]=cq.addListener(cp[i],ct);
}if(cq[M+qx.lang.String.firstUp(cr[i])]==null){cq=null;
}else if(co[i]!==L){cq=cq[M+qx.lang.String.firstUp(cr[i])](co[i]);
}else{cq=cq[M+qx.lang.String.firstUp(cr[i])]();
}
if(!cq){break;
}}var cx={type:bc,listenerIds:cs,sources:cu};
this.__cs(cx,ci,cj,ck,cl);
return cx;
},__ck:function(n){if(n.options&&n.options.onUpdate){n.options.onUpdate(n.sources[n.index],n.targetObject);
}for(var j=n.index+1;j<n.propertyNames.length;j++){var r=n.sources[j];
n.sources[j]=null;

if(!r){continue;
}r.removeListenerById(n.listenerIds[j]);
}var r=n.sources[n.index];
for(var j=n.index+1;j<n.propertyNames.length;j++){if(n.arrayIndexValues[j-1]!==L){r=r[M+qx.lang.String.firstUp(n.propertyNames[j-1])](n.arrayIndexValues[j-1]);
}else{r=r[M+qx.lang.String.firstUp(n.propertyNames[j-1])]();
}n.sources[j]=r;
if(!r){this.__cm(n.targetObject,n.targetProperty);
break;
}if(j==n.propertyNames.length-1){if(qx.Class.implementsInterface(r,qx.data.IListData)){var s=n.arrayIndexValues[j]===I?r.length-1:n.arrayIndexValues[j];
var p=r.getItem(s);
this.__cp(p,n.targetObject,n.targetProperty,n.options,n.sources[n.index]);
n.listenerIds[j]=this.__cr(r,H,n.targetObject,n.targetProperty,n.options,n.arrayIndexValues[j]);
}else{if(n.propertyNames[j]!=null&&r[M+qx.lang.String.firstUp(n.propertyNames[j])]!=null){var p=r[M+qx.lang.String.firstUp(n.propertyNames[j])]();
this.__cp(p,n.targetObject,n.targetProperty,n.options,n.sources[n.index]);
}var q=this.__cl(r,n.propertyNames[j]);
n.listenerIds[j]=this.__cr(r,q,n.targetObject,n.targetProperty,n.options);
}}else{if(n.listeners[j]==null){var o=qx.lang.Function.bind(this.__ck,this,n);
n.listeners.push(o);
}if(qx.Class.implementsInterface(r,qx.data.IListData)){var q=H;
}else{var q=this.__cl(r,n.propertyNames[j]);
}n.listenerIds[j]=r.addListener(q,n.listeners[j]);
}}},__cl:function(bE,bF){var bG=this.__cu(bE,bF);
if(bG==null){if(qx.Class.supportsEvent(bE.constructor,bF)){bG=bF;
}else if(qx.Class.supportsEvent(bE.constructor,H+qx.lang.String.firstUp(bF))){bG=H+qx.lang.String.firstUp(bF);
}else{throw new qx.core.AssertionError(S,bF);
}}return bG;
},__cm:function(t,u){var v=this.__co(t,u);

if(v!=null){var w=u.substring(u.lastIndexOf(G)+1,u.length);
if(w.charAt(w.length-1)==J){this.__cn(t,u,null);
return;
}if(v[ba+qx.lang.String.firstUp(w)]!=undefined){v[ba+qx.lang.String.firstUp(w)]();
}else{v[D+qx.lang.String.firstUp(w)](null);
}}},__cn:function(bw,bx,by){var bC=this.__co(bw,bx);

if(bC!=null){var bD=bx.substring(bx.lastIndexOf(G)+1,bx.length);
if(bD.charAt(bD.length-1)==J){var bz=bD.substring(bD.lastIndexOf(K)+1,bD.length-1);
var bB=bD.substring(0,bD.lastIndexOf(K));
var bA=bC[M+qx.lang.String.firstUp(bB)]();

if(bz==I){bz=bA.length-1;
}
if(bA!=null){bA.setItem(bz,by);
}}else{bC[D+qx.lang.String.firstUp(bD)](by);
}}},__co:function(bK,bL){var bO=bL.split(G);
var bP=bK;
for(var i=0;i<bO.length-1;i++){try{var bN=bO[i];
if(bN.indexOf(J)==bN.length-1){var bM=bN.substring(bN.indexOf(K)+1,bN.length-1);
bN=bN.substring(0,bN.indexOf(K));
}bP=bP[M+qx.lang.String.firstUp(bN)]();

if(bM!=null){if(bM==I){bM=bP.length-1;
}bP=bP.getItem(bM);
bM=null;
}}catch(cd){return null;
}}return bP;
},__cp:function(g,h,k,l,m){g=this.__ct(g,h,k,l);
if(g==null){this.__cm(h,k);
}if(g!=undefined){try{this.__cn(h,k,g);
if(l&&l.onUpdate){l.onUpdate(m,h,g);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(l&&l.onSetFail){l.onSetFail(e);
}else{this.warn("Failed so set value "+g+" on "+h+". Error message: "+e);
}}}},__cq:function(ca){var cb=[];
for(var i=0;i<ca.length;i++){var name=ca[i];
if(qx.lang.String.endsWith(name,J)){var cc=name.substring(name.indexOf(K)+1,name.indexOf(J));
if(name.indexOf(J)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(cc!==I){if(cc==L||isNaN(parseInt(cc))){throw new Error("No number or 'last' value hast been given"+" in a array binding: "+name+" does not work.");
}}if(name.indexOf(K)!=0){ca[i]=name.substring(0,name.indexOf(K));
cb[i]=L;
cb[i+1]=cc;
ca.splice(i+1,0,bb);
i++;
}else{cb[i]=cc;
ca.splice(i,1,bb);
}}else{cb[i]=L;
}}return cb;
},__cr:function(bQ,bR,bS,bT,bU,bV){var bW;
{};
var bY=function(z,e){if(z!==L){if(z===I){z=bQ.length-1;
}var C=bQ.getItem(z);
if(C==undefined){qx.data.SingleValueBinding.__cm(bS,bT);
}var A=e.getData().start;
var B=e.getData().end;

if(z<A||z>B){return;
}}else{var C=e.getData();
}if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Binding executed from "+bQ+" by "+bR+" to "+bS+" ("+bT+")");
qx.log.Logger.debug("Data before conversion: "+C);
}C=qx.data.SingleValueBinding.__ct(C,bS,bT,bU);
if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Data after conversion: "+C);
}try{if(C!=undefined){qx.data.SingleValueBinding.__cn(bS,bT,C);
}else{qx.data.SingleValueBinding.__cm(bS,bT);
}if(bU&&bU.onUpdate){bU.onUpdate(bQ,bS,C);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(bU&&bU.onSetFail){bU.onSetFail(e);
}else{this.warn("Failed so set value "+C+" on "+bS+". Error message: "+e);
}}};
if(!bV){bV=L;
}bY=qx.lang.Function.bind(bY,bQ,bV);
var bX=bQ.addListener(bR,bY);
return bX;
},__cs:function(br,bs,bt,bu,bv){if(this.__cj[bs.toHashCode()]===undefined){this.__cj[bs.toHashCode()]=[];
}this.__cj[bs.toHashCode()].push([br,bs,bt,bu,bv]);
},__ct:function(bd,be,bf,bg){if(bg&&bg.converter){var bi;

if(be.getModel){bi=be.getModel();
}return bg.converter(bd,bi);
}else{var bk=this.__co(be,bf);
var bl=bf.substring(bf.lastIndexOf(G)+1,bf.length);
if(bk==null){return bd;
}var bj=qx.Class.getPropertyDefinition(bk.constructor,bl);
var bh=bj==null?L:bj.check;
return this.__cv(bd,bh);
}},__cu:function(c,d){var f=qx.Class.getPropertyDefinition(c.constructor,d);

if(f==null){return null;
}return f.event;
},__cv:function(bm,bn){var bo=qx.lang.Type.getClass(bm);
if((bo==F||bo==E)&&(bn==U||bn==O)){bm=parseInt(bm);
}if((bo==X||bo==F||bo==N)&&bn==E){bm=bm+L;
}if((bo==F||bo==E)&&(bn==F||bn==Q)){bm=parseFloat(bm);
}return bm;
},removeBindingFromObject:function(bH,bI){if(bI.type==bc){for(var i=0;i<bI.sources.length;i++){if(bI.sources[i]){bI.sources[i].removeListenerById(bI.listenerIds[i]);
}}}else{bH.removeListenerById(bI);
}var bJ=this.__cj[bH.toHashCode()];
if(bJ!=undefined){for(var i=0;i<bJ.length;i++){if(bJ[i][0]==bI){qx.lang.Array.remove(bJ,bJ[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(x){{};
var y=this.__cj[x.toHashCode()];

if(y!=undefined){for(var i=y.length-1;i>=0;i--){this.removeBindingFromObject(x,y[i][0]);
}}},getAllBindingsForObject:function(cz){if(this.__cj[cz.toHashCode()]===undefined){this.__cj[cz.toHashCode()]=[];
}return this.__cj[cz.toHashCode()];
},removeAllBindings:function(){for(var b in this.__cj){var a=qx.core.ObjectRegistry.fromHashCode(b);
if(a==null){delete this.__cj[b];
continue;
}this.removeAllBindingsForObject(a);
}this.__cj={};
},getAllBindings:function(){return this.__cj;
},showBindingInLog:function(ce,cf){var ch;
for(var i=0;i<this.__cj[ce.toHashCode()].length;i++){if(this.__cj[ce.toHashCode()][i][0]==cf){ch=this.__cj[ce.toHashCode()][i];
break;
}}
if(ch===undefined){var cg=P;
}else{var cg=R+ch[1]+Y+ch[2]+V+ch[3]+Y+ch[4]+W;
}qx.log.Logger.debug(cg);
},showAllBindingsInLog:function(){for(var bq in this.__cj){var bp=qx.core.ObjectRegistry.fromHashCode(bq);

for(var i=0;i<this.__cj[bq].length;i++){this.showBindingInLog(bp,this.__cj[bq][i][0]);
}}}}});
})();
(function(){var c=": ",b="qx.type.BaseError",a="";
qx.Class.define(b,{extend:Error,construct:function(d,e){Error.call(this,e);
this.__cw=d||a;
this.message=e||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__cw:null,message:null,getComment:function(){return this.__cw;
},toString:function(){return this.__cw+c+this.message;
}}});
})();
(function(){var a="qx.core.AssertionError";
qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);
this.__cx=qx.dev.StackTrace.getStackTrace();
},members:{__cx:null,getStackTrace:function(){return this.__cx;
}}});
})();
(function(){var a="qx.core.ValidationError";
qx.Class.define(a,{extend:qx.type.BaseError});
})();
(function(){var e="qx.event.handler.Object";
qx.Class.define(e,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(f,g){return qx.Class.supportsEvent(f.constructor,g);
},registerEvent:function(a,b,c){},unregisterEvent:function(h,i,j){}},defer:function(d){qx.event.Registration.addHandler(d);
}});
})();
(function(){var c="qx.util.ValueManager",b="abstract";
qx.Class.define(c,{type:b,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this._dynamic={};
},members:{_dynamic:null,resolveDynamic:function(d){return this._dynamic[d];
},isDynamic:function(e){return !!this._dynamic[e];
},resolve:function(a){if(a&&this._dynamic[a]){return this._dynamic[a];
}return a;
},_setDynamic:function(f){this._dynamic=f;
},_getDynamic:function(){return this._dynamic;
}},destruct:function(){this._dynamic=null;
}});
})();
(function(){var m="/",l="0",k="qx/static",j="http://",i="https://",h="file://",g="qx.util.AliasManager",f="singleton",e=".",d="static";
qx.Class.define(g,{type:f,extend:qx.util.ValueManager,construct:function(){arguments.callee.base.call(this);
this.__cy={};
this.add(d,k);
},members:{__cy:null,_preprocess:function(r){var u=this._getDynamic();

if(u[r]===false){return r;
}else if(u[r]===undefined){if(r.charAt(0)===m||r.charAt(0)===e||r.indexOf(j)===0||r.indexOf(i)===l||r.indexOf(h)===0){u[r]=false;
return r;
}
if(this.__cy[r]){return this.__cy[r];
}var t=r.substring(0,r.indexOf(m));
var s=this.__cy[t];

if(s!==undefined){u[r]=s+r.substring(t.length);
}}return r;
},add:function(n,o){this.__cy[n]=o;
var q=this._getDynamic();
for(var p in q){if(p.substring(0,p.indexOf(m))===n){q[p]=o+p.substring(n.length);
}}},remove:function(a){delete this.__cy[a];
},resolve:function(b){var c=this._getDynamic();

if(b!==null){b=this._preprocess(b);
}return c[b]||b;
}},destruct:function(){this.__cy=null;
}});
})();
(function(){var G="qx.client",F="img",E="div",D="mshtml",C="",B="px",A='"/>',z='" style="',y='<div style="',x="none",q=".png",w="png",t="scale-x",p="webkit",o="scale-y",s="scale",r='<img src="',u="qx.bom.element.Decoration",n='"></div>',v="absolute";
qx.Class.define(u,{statics:{DEBUG:false,__pk:{},__cz:qx.core.Variant.isSet(G,D)&&qx.bom.client.Engine.VERSION<9,__cA:qx.core.Variant.select(G,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__cB:{"scale-x":F,"scale-y":F,"scale":F,"repeat":E,"no-repeat":E,"repeat-x":E,"repeat-y":E},update:function(bG,bH,bI,bJ){var bL=this.getTagName(bI,bH);

if(bL!=bG.tagName.toLowerCase()){throw new Error("Image modification not possible because elements could not be replaced at runtime anymore!");
}var bM=this.getAttributes(bH,bI,bJ);

if(bL===F){bG.src=bM.src;
}if(bG.style.backgroundPosition!=C&&bM.style.backgroundPosition===undefined){bM.style.backgroundPosition=null;
}if(bG.style.clip!=C&&bM.style.clip===undefined){bM.style.clip=null;
}var bK=qx.bom.element.Style;
bK.setStyles(bG,bM.style);
},create:function(P,Q,R){var S=this.getTagName(Q,P);
var U=this.getAttributes(P,Q,R);
var T=qx.bom.element.Style.compile(U.style);

if(S===F){return r+U.src+z+T+A;
}else{return y+T+n;
}},getTagName:function(bE,bF){if(qx.core.Variant.isSet(G,D)){if(bF&&this.__cz&&this.__cA[bE]&&qx.lang.String.endsWith(bF,q)){return E;
}}return this.__cB[bE];
},getAttributes:function(i,j,k){if(!k){k={};
}
if(!k.position){k.position=v;
}
if(qx.core.Variant.isSet(G,D)){k.fontSize=0;
k.lineHeight=0;
}else if(qx.core.Variant.isSet(G,p)){k.WebkitUserDrag=x;
}var m=qx.util.ResourceManager.getInstance().getImageFormat(i)||qx.io2.ImageLoader.getFormat(i);
{};
var l;
if(this.__cz&&this.__cA[j]&&m===w){l=this.__BB(k,j,i);
}else{if(j===s){l=this.__BC(k,j,i);
}else if(j===t||j===o){l=this.__BD(k,j,i);
}else{l=this.__BG(k,j,i);
}}return l;
},__Bz:function(a,b,c){if(a.width==null&&b!=null){a.width=b+B;
}
if(a.height==null&&c!=null){a.height=c+B;
}return a;
},__BA:function(bd){var be=qx.util.ResourceManager.getInstance().getImageWidth(bd)||qx.io2.ImageLoader.getWidth(bd);
var bf=qx.util.ResourceManager.getInstance().getImageHeight(bd)||qx.io2.ImageLoader.getHeight(bd);
return {width:be,height:bf};
},__BB:function(bm,bn,bo){var br=this.__BA(bo);
bm=this.__Bz(bm,br.width,br.height);
var bq=bn=="no-repeat"?"crop":"scale";
var bp="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+qx.util.ResourceManager.getInstance().toUri(bo)+"', sizingMethod='"+bq+"')";
bm.filter=bp;
bm.backgroundImage=bm.backgroundRepeat="";
return {style:bm};
},__BC:function(bh,bi,bj){var bk=qx.util.ResourceManager.getInstance().toUri(bj);
var bl=this.__BA(bj);
bh=this.__Bz(bh,bl.width,bl.height);
return {src:bk,style:bh};
},__BD:function(H,I,J){var N=qx.util.ResourceManager.getInstance();
var M=N.isClippedImage(J);
var O=this.__BA(J);

if(M){var L=N.getData(J);
var K=N.toUri(L[4]);

if(I==="scale-x"){H=this.__BE(H,L,O.height);
}else{H=this.__BF(H,L,O.width);
}return {src:K,style:H};
}else{{};

if(I=="scale-x"){H.height=O.height==null?null:O.height+"px";
}else if(I=="scale-y"){H.width=O.width==null?null:O.width+"px";
}var K=N.toUri(J);
return {src:K,style:H};
}},__BE:function(d,e,f){var g=qx.util.ResourceManager.getInstance().getImageHeight(e[4]);
d.clip={top:-e[6],height:f};
d.height=g+"px";
if(d.top!=null){d.top=(parseInt(d.top,10)+e[6])+"px";
}else if(d.bottom!=null){d.bottom=(parseInt(d.bottom,10)+f-g-e[6])+"px";
}return d;
},__BF:function(bs,bt,bu){var bv=qx.util.ResourceManager.getInstance().getImageWidth(bt[4]);
bs.clip={left:-bt[5],width:bu};
bs.width=bv+"px";
if(bs.left!=null){bs.left=(parseInt(bs.left,10)+bt[5])+"px";
}else if(bs.right!=null){bs.right=(parseInt(bs.right,10)+bu-bv-bt[5])+"px";
}return bs;
},__BG:function(bw,bx,by){var bD=qx.util.ResourceManager.getInstance().isClippedImage(by);
var bC=this.__BA(by);
if(bD&&bx!=="repeat"){var bB=qx.util.ResourceManager.getInstance().getData(by);
var bA=qx.bom.element.Background.getStyles(bB[4],bx,bB[5],bB[6]);

for(var bz in bA){bw[bz]=bA[bz];
}
if(bC.width!=null&&bw.width==null&&(bx=="repeat-y"||bx==="no-repeat")){bw.width=bC.width+"px";
}
if(bC.height!=null&&bw.height==null&&(bx=="repeat-x"||bx==="no-repeat")){bw.height=bC.height+"px";
}return {style:bw};
}else{{};
bw=this.__Bz(bw,bC.width,bC.height);
bw=this.__BH(bw,by,bx);
return {style:bw};
}},__BH:function(V,W,X){var top=null;
var bc=null;

if(V.backgroundPosition){var Y=V.backgroundPosition.split(" ");
bc=parseInt(Y[0]);

if(isNaN(bc)){bc=Y[0];
}top=parseInt(Y[1]);

if(isNaN(top)){top=Y[1];
}}var bb=qx.bom.element.Background.getStyles(W,X,bc,top);

for(var ba in bb){V[ba]=bb[ba];
}if(V.filter){V.filter="";
}return V;
},__BI:function(h){if(this.DEBUG&&qx.util.ResourceManager.getInstance().has(h)&&h.indexOf("qx/icon")==-1){if(!this.__pk[h]){qx.log.Logger.debug("Potential clipped image candidate: "+h);
this.__pk[h]=true;
}}},isAlphaImageLoaderEnabled:qx.core.Variant.select(G,{"mshtml":function(){return qx.bom.element.Decoration.__cz;
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
},get:function(C,D){var F=qx.bom.element.Style.get(C,i,D,false);
var K,top,I,H;
var E,G;

if(typeof F===k&&F!==t&&F!==n){F=qx.lang.String.trim(F);
if(/\((.*)\)/.test(F)){var J=RegExp.$1.split(r);
top=qx.lang.String.trim(J[0]);
E=qx.lang.String.trim(J[1]);
G=qx.lang.String.trim(J[2]);
K=qx.lang.String.trim(J[3]);
if(K===t){K=null;
}
if(top===t){top=null;
}
if(E===t){E=null;
}
if(G===t){G=null;
}if(top!=null){top=parseInt(top,10);
}
if(E!=null){E=parseInt(E,10);
}
if(G!=null){G=parseInt(G,10);
}
if(K!=null){K=parseInt(K,10);
}if(E!=null&&K!=null){I=E-K;
}else if(E!=null){I=E;
}
if(G!=null&&top!=null){H=G-top;
}else if(G!=null){H=G;
}}else{throw new Error("Could not parse clip string: "+F);
}}return {left:K||null,top:top||null,width:I||null,height:H||null};
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
},reset:function(B){B.style.clip=qx.bom.client.Engine.MSHTML?h:t;
}}});
})();
(function(){var n="n-resize",m="e-resize",l="nw-resize",k="ne-resize",j="",i="cursor:",h="qx.client",g=";",f="qx.bom.element.Cursor",e="cursor",d="hand";
qx.Class.define(f,{statics:{__cE:qx.core.Variant.select(h,{"mshtml":{"cursor":d,"ew-resize":m,"ns-resize":n,"nesw-resize":k,"nwse-resize":l},"opera":{"col-resize":m,"row-resize":n,"ew-resize":m,"ns-resize":n,"nesw-resize":k,"nwse-resize":l},"default":{}}),compile:function(q){return i+(this.__cE[q]||q)+g;
},get:function(a,b){return qx.bom.element.Style.get(a,e,b,false);
},set:function(o,p){o.style.cursor=this.__cE[p]||p;
},reset:function(c){c.style.cursor=j;
}}});
})();
(function(){var w="",v="qx.client",u=";",t="filter",s="opacity:",r="opacity",q="MozOpacity",p=");",o=")",n="zoom:1;filter:alpha(opacity=",k="qx.bom.element.Opacity",m="alpha(opacity=",l="-moz-opacity:";
qx.Class.define(k,{statics:{compile:qx.core.Variant.select(v,{"mshtml":function(j){if(j>=1){return w;
}
if(j<0.00001){j=0;
}return n+(j*100)+p;
},"gecko":function(K){if(K==1){K=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){return l+K+u;
}else{return s+K+u;
}},"default":function(I){if(I==1){return w;
}return s+I+u;
}}),set:qx.core.Variant.select(v,{"mshtml":function(F,G){var H=qx.bom.element.Style.get(F,t,qx.bom.element.Style.COMPUTED_MODE,false);
if(G>=1){F.style.filter=H.replace(/alpha\([^\)]*\)/gi,w);
return;
}
if(G<0.00001){G=0;
}if(!F.currentStyle||!F.currentStyle.hasLayout){F.style.zoom=1;
}F.style.filter=H.replace(/alpha\([^\)]*\)/gi,w)+m+G*100+o;
},"gecko":function(D,E){if(E==1){E=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){D.style.MozOpacity=E;
}else{D.style.opacity=E;
}},"default":function(B,C){if(C==1){C=w;
}B.style.opacity=C;
}}),reset:qx.core.Variant.select(v,{"mshtml":function(e){var f=qx.bom.element.Style.get(e,t,qx.bom.element.Style.COMPUTED_MODE,false);
e.style.filter=f.replace(/alpha\([^\)]*\)/gi,w);
},"gecko":function(d){if(qx.bom.client.Engine.VERSION<1.7){d.style.MozOpacity=w;
}else{d.style.opacity=w;
}},"default":function(J){J.style.opacity=w;
}}),get:qx.core.Variant.select(v,{"mshtml":function(x,y){var z=qx.bom.element.Style.get(x,t,y,false);

if(z){var A=z.match(/alpha\(opacity=(.*)\)/);

if(A&&A[1]){return parseFloat(A[1])/100;
}}return 1.0;
},"gecko":function(g,h){var i=qx.bom.element.Style.get(g,qx.bom.client.Engine.VERSION<1.7?q:r,h,false);

if(i==0.999999){i=1.0;
}
if(i!=null){return parseFloat(i);
}return 1.0;
},"default":function(a,b){var c=qx.bom.element.Style.get(a,r,b,false);

if(c!=null){return parseFloat(c);
}return 1.0;
}})}});
})();
(function(){var y="qx.client",x="",w="boxSizing",v="box-sizing",u=":",t="border-box",s="qx.bom.element.BoxSizing",r="KhtmlBoxSizing",q="-moz-box-sizing",p="WebkitBoxSizing",m=";",o="-khtml-box-sizing",n="content-box",k="-webkit-box-sizing",j="MozBoxSizing";
qx.Class.define(s,{statics:{__cF:qx.core.Variant.select(y,{"mshtml":null,"webkit":[w,r,p],"gecko":[j],"opera":[w]}),__cG:qx.core.Variant.select(y,{"mshtml":null,"webkit":[v,o,k],"gecko":[q],"opera":[v]}),__cH:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__cI:function(d){var e=this.__cH;
return e.tags[d.tagName.toLowerCase()]||e.types[d.type];
},compile:qx.core.Variant.select(y,{"mshtml":function(D){{};
},"default":function(f){var h=this.__cG;
var g=x;

if(h){for(var i=0,l=h.length;i<l;i++){g+=h[i]+u+f+m;
}}return g;
}}),get:qx.core.Variant.select(y,{"mshtml":function(a){if(qx.bom.Document.isStandardMode(qx.dom.Node.getDocument(a))){if(!this.__cI(a)){return n;
}}return t;
},"default":function(z){var B=this.__cF;
var A;

if(B){for(var i=0,l=B.length;i<l;i++){A=qx.bom.element.Style.get(z,B[i],null,false);

if(A!=null&&A!==x){return A;
}}}return x;
}}),set:qx.core.Variant.select(y,{"mshtml":function(b,c){{};
},"default":function(E,F){var G=this.__cF;

if(G){for(var i=0,l=G.length;i<l;i++){E.style[G[i]]=F;
}}}}),reset:function(C){this.set(C,x);
}}});
})();
(function(){var u="",r="qx.client",q="hidden",p="-moz-scrollbars-none",o="overflow",n=";",m="overflowY",l=":",k="overflowX",j="overflow:",G="none",F="scroll",E="borderLeftStyle",D="borderRightStyle",C="div",B="borderRightWidth",A="overflow-y",z="borderLeftWidth",y="-moz-scrollbars-vertical",x="100px",v="qx.bom.element.Overflow",w="overflow-x";
qx.Class.define(v,{statics:{__cJ:null,getScrollbarWidth:function(){if(this.__cJ!==null){return this.__cJ;
}var bJ=qx.bom.element.Style;
var bL=function(cb,cc){return parseInt(bJ.get(cb,cc))||0;
};
var bM=function(bl){return (bJ.get(bl,D)==G?0:bL(bl,B));
};
var bK=function(bf){return (bJ.get(bf,E)==G?0:bL(bf,z));
};
var bO=qx.core.Variant.select(r,{"mshtml":function(ca){if(bJ.get(ca,m)==q||ca.clientWidth==0){return bM(ca);
}return Math.max(0,ca.offsetWidth-ca.clientLeft-ca.clientWidth);
},"default":function(R){if(R.clientWidth==0){var S=bJ.get(R,o);
var T=(S==F||S==y?16:0);
return Math.max(0,bM(R)+T);
}return Math.max(0,(R.offsetWidth-R.clientWidth-bK(R)));
}});
var bN=function(bE){return bO(bE)-bM(bE);
};
var t=document.createElement(C);
var s=t.style;
s.height=s.width=x;
s.overflow=F;
document.body.appendChild(t);
var c=bN(t);
this.__cJ=c?c:16;
document.body.removeChild(t);
return this.__cJ;
},_compile:qx.core.Variant.select(r,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bj,bk){if(bk==q){bk=p;
}return j+bk+n;
}:
function(f,g){return f+l+g+n;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(H,I){return j+I+n;
}:
function(d,e){return d+l+e+n;
},"default":function(bm,bn){return bm+l+bn+n;
}}),compileX:function(bP){return this._compile(w,bP);
},compileY:function(bb){return this._compile(A,bb);
},getX:qx.core.Variant.select(r,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bx,by){var bz=qx.bom.element.Style.get(bx,o,by,false);

if(bz===p){bz=q;
}return bz;
}:
function(bW,bX){return qx.bom.element.Style.get(bW,k,bX,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bS,bT){return qx.bom.element.Style.get(bS,o,bT,false);
}:
function(a,b){return qx.bom.element.Style.get(a,k,b,false);
},"default":function(bA,bB){return qx.bom.element.Style.get(bA,k,bB,false);
}}),setX:qx.core.Variant.select(r,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(cd,ce){if(ce==q){ce=p;
}cd.style.overflow=ce;
}:
function(V,W){V.style.overflowX=W;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(Y,ba){Y.style.overflow=ba;
}:
function(L,M){L.style.overflowX=M;
},"default":function(br,bs){br.style.overflowX=bs;
}}),resetX:qx.core.Variant.select(r,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(cf){cf.style.overflow=u;
}:
function(bq){bq.style.overflowX=u;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bU,bV){bU.style.overflow=u;
}:
function(P,Q){P.style.overflowX=u;
},"default":function(U){U.style.overflowX=u;
}}),getY:qx.core.Variant.select(r,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bg,bh){var bi=qx.bom.element.Style.get(bg,o,bh,false);

if(bi===p){bi=q;
}return bi;
}:
function(h,i){return qx.bom.element.Style.get(h,m,i,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(J,K){return qx.bom.element.Style.get(J,o,K,false);
}:
function(bQ,bR){return qx.bom.element.Style.get(bQ,m,bR,false);
},"default":function(bt,bu){return qx.bom.element.Style.get(bt,m,bu,false);
}}),setY:qx.core.Variant.select(r,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bF,bG){if(bG===q){bG=p;
}bF.style.overflow=bG;
}:
function(bH,bI){bH.style.overflowY=bI;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bC,bD){bC.style.overflow=bD;
}:
function(bo,bp){bo.style.overflowY=bp;
},"default":function(N,O){N.style.overflowY=O;
}}),resetY:qx.core.Variant.select(r,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(X){X.style.overflow=u;
}:
function(bY){bY.style.overflowY=u;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bv,bw){bv.style.overflow=u;
}:
function(bd,be){bd.style.overflowY=u;
},"default":function(bc){bc.style.overflowY=u;
}})}});
})();
(function(){var N="",M="qx.client",L="user-select",K="userSelect",J="appearance",I="style",H="MozUserModify",G="px",F="-webkit-appearance",E="styleFloat",bk="-webkit-user-select",bj="-moz-appearance",bi="pixelHeight",bh="MozAppearance",bg=":",bf="pixelTop",be="pixelLeft",bd="text-overflow",bc="-moz-user-select",bb="MozUserSelect",U="qx.bom.element.Style",V="-moz-user-modify",S="-webkit-user-modify",T="WebkitUserSelect",Q="-o-text-overflow",R="pixelRight",O="cssFloat",P="pixelWidth",W="pixelBottom",X=";",ba="WebkitUserModify",Y="WebkitAppearance";
qx.Class.define(U,{statics:{__cC:{styleNames:{"float":qx.core.Variant.select(M,{"mshtml":E,"default":O}),"appearance":qx.core.Variant.select(M,{"gecko":bh,"webkit":Y,"default":J}),"userSelect":qx.core.Variant.select(M,{"gecko":bb,"webkit":T,"default":K}),"userModify":qx.core.Variant.select(M,{"gecko":H,"webkit":ba,"default":K})},cssNames:{"appearance":qx.core.Variant.select(M,{"gecko":bj,"webkit":F,"default":J}),"userSelect":qx.core.Variant.select(M,{"gecko":bc,"webkit":bk,"default":L}),"userModify":qx.core.Variant.select(M,{"gecko":V,"webkit":S,"default":L}),"textOverflow":qx.core.Variant.select(M,{"opera":Q,"default":bd})},mshtmlPixel:{width:P,height:bi,left:be,right:R,top:bf,bottom:W},special:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing,overflowX:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setX,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getX,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetX,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileX,qx.bom.element.Overflow)},overflowY:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setY,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getY,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetY,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileY,qx.bom.element.Overflow)}}},__cD:{},compile:function(b){var f=[];
var j=this.__cC;
var i=j.special;
var g=j.cssNames;
var e=this.__cD;
var h=qx.lang.String;
var name,d,c;

for(name in b){c=b[name];

if(c==null){continue;
}name=g[name]||name;
if(i[name]){f.push(i[name].compile(c));
}else{d=e[name];

if(!d){d=e[name]=h.hyphenate(name);
}f.push(d,bg,c,X);
}}return f.join(N);
},setCss:qx.core.Variant.select(M,{"mshtml":function(bm,bn){bm.style.cssText=bn;
},"default":function(s,t){s.setAttribute(I,t);
}}),getCss:qx.core.Variant.select(M,{"mshtml":function(bl){return bl.style.cssText.toLowerCase();
},"default":function(a){return a.getAttribute(I);
}}),COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(u,name,v,w){{};
var x=this.__cC;
name=x.styleNames[name]||name;
if(w!==false&&x.special[name]){return x.special[name].set(u,v);
}else{u.style[name]=v!==null?v:N;
}},setStyles:function(br,bs,bt){{};
var bz=this.__cC;
var bw=bz.styleNames;
var by=bz.special;
var bu=br.style;

for(var bx in bs){var bv=bs[bx];
var name=bw[bx]||bx;

if(bv===undefined){if(bt!==false&&by[name]){by[name].reset(br);
}else{bu[name]=N;
}}else{if(bt!==false&&by[name]){by[name].set(br,bv);
}else{bu[name]=bv!==null?bv:N;
}}}},reset:function(bo,name,bp){var bq=this.__cC;
name=bq.styleNames[name]||name;
if(bp!==false&&bq.special[name]){return bq.special[name].reset(bo);
}else{bo.style[name]=N;
}},get:qx.core.Variant.select(M,{"mshtml":function(k,name,l,m){var r=this.__cC;
name=r.styleNames[name]||name;
if(m!==false&&r.special[name]){return r.special[name].get(k,l);
}if(!k.currentStyle){return k.style[name]||N;
}switch(l){case this.LOCAL_MODE:return k.style[name]||N;
case this.CASCADED_MODE:return k.currentStyle[name]||N;
default:var q=k.currentStyle[name]||N;
if(/^-?[\.\d]+(px)?$/i.test(q)){return q;
}var p=r.mshtmlPixel[name];

if(p){var n=k.style[name];
k.style[name]=q||0;
var o=k.style[p]+G;
k.style[name]=n;
return o;
}if(/^-?[\.\d]+(em|pt|%)?$/i.test(q)){throw new Error("Untranslated computed property value: "+name+". Only pixel values work well across different clients.");
}return q;
}},"default":function(y,name,z,A){var D=this.__cC;
name=D.styleNames[name]||name;
if(A!==false&&D.special[name]){return D.special[name].get(y,z);
}switch(z){case this.LOCAL_MODE:return y.style[name]||N;
case this.CASCADED_MODE:if(y.currentStyle){return y.currentStyle[name]||N;
}throw new Error("Cascaded styles are not supported in this browser!");
default:var B=qx.dom.Node.getDocument(y);
var C=B.defaultView.getComputedStyle(y,null);
return C?C[name]:N;
}}})}});
})();
(function(){var m="CSS1Compat",l="position:absolute;width:0;height:0;width:1",k="qx.bom.Document",j="1px",i="qx.client",h="div";
qx.Class.define(k,{statics:{isQuirksMode:qx.core.Variant.select(i,{"mshtml":function(o){if(qx.bom.client.Engine.VERSION>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return (o||window).document.compatMode!==m;
}},"webkit":function(p){if(document.compatMode===undefined){var q=(p||window).document.createElement(h);
q.style.cssText=l;
return q.style.width===j?true:false;
}else{return (p||window).document.compatMode!==m;
}},"default":function(n){return (n||window).document.compatMode!==m;
}}),isStandardMode:function(a){return !this.isQuirksMode(a);
},getWidth:function(e){var f=(e||window).document;
var g=qx.bom.Viewport.getWidth(e);
var scroll=this.isStandardMode(e)?f.documentElement.scrollWidth:f.body.scrollWidth;
return Math.max(scroll,g);
},getHeight:function(b){var c=(b||window).document;
var d=qx.bom.Viewport.getHeight(b);
var scroll=this.isStandardMode(b)?c.documentElement.scrollHeight:c.body.scrollHeight;
return Math.max(scroll,d);
}}});
})();
(function(){var i="qx.client",h="qx.bom.Viewport";
qx.Class.define(h,{statics:{getWidth:qx.core.Variant.select(i,{"opera":function(j){if(qx.bom.client.Engine.VERSION<9.5){return (j||window).document.body.clientWidth;
}else{var k=(j||window).document;
return qx.bom.Document.isStandardMode(j)?k.documentElement.clientWidth:k.body.clientWidth;
}},"webkit":function(l){if(qx.bom.client.Engine.VERSION<523.15){return (l||window).innerWidth;
}else{var m=(l||window).document;
return qx.bom.Document.isStandardMode(l)?m.documentElement.clientWidth:m.body.clientWidth;
}},"default":function(a){var b=(a||window).document;
return qx.bom.Document.isStandardMode(a)?b.documentElement.clientWidth:b.body.clientWidth;
}}),getHeight:qx.core.Variant.select(i,{"opera":function(d){if(qx.bom.client.Engine.VERSION<9.5){return (d||window).document.body.clientHeight;
}else{var e=(d||window).document;
return qx.bom.Document.isStandardMode(d)?e.documentElement.clientHeight:e.body.clientHeight;
}},"webkit":function(p){if(qx.bom.client.Engine.VERSION<523.15){return (p||window).innerHeight;
}else{var q=(p||window).document;
return qx.bom.Document.isStandardMode(p)?q.documentElement.clientHeight:q.body.clientHeight;
}},"default":function(f){var g=(f||window).document;
return qx.bom.Document.isStandardMode(f)?g.documentElement.clientHeight:g.body.clientHeight;
}}),getScrollLeft:qx.core.Variant.select(i,{"mshtml":function(n){var o=(n||window).document;
return o.documentElement.scrollLeft||o.body.scrollLeft;
},"default":function(r){return (r||window).pageXOffset;
}}),getScrollTop:qx.core.Variant.select(i,{"mshtml":function(s){var t=(s||window).document;
return t.documentElement.scrollTop||t.body.scrollTop;
},"default":function(c){return (c||window).pageYOffset;
}})}});
})();
(function(){var b="CSS1Compat",a="qx.bom.client.Feature";
qx.Bootstrap.define(a,{statics:{STANDARD_MODE:false,QUIRKS_MODE:false,CONTENT_BOX:false,BORDER_BOX:false,SVG:false,CANVAS:false,VML:false,XPATH:false,AIR:false,GEARS:false,SSL:false,__cK:function(){this.QUIRKS_MODE=this.__cL();
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
}else{return document.compatMode!==b;
}}},defer:function(c){c.__cK();
}});
})();
(function(){var q="/",p="mshtml",o="qx.client",n="",m="?",l="string",k="qx.util.ResourceManager",j="singleton",i="qx.isSource";
qx.Class.define(k,{extend:qx.core.Object,type:j,statics:{__cM:qx.$$resources||{},__cN:{}},members:{has:function(s){return !!arguments.callee.self.__cM[s];
},getData:function(r){return arguments.callee.self.__cM[r]||null;
},getImageWidth:function(t){var u=arguments.callee.self.__cM[t];
return u?u[0]:null;
},getImageHeight:function(z){var A=arguments.callee.self.__cM[z];
return A?A[1]:null;
},getImageFormat:function(B){var C=arguments.callee.self.__cM[B];
return C?C[2]:null;
},isClippedImage:function(a){var b=arguments.callee.self.__cM[a];
return b&&b.length>4;
},toUri:function(v){if(v==null){return v;
}var w=arguments.callee.self.__cM[v];

if(!w){return v;
}
if(typeof w===l){var y=w;
}else{var y=w[3];
if(!y){return v;
}}var x=n;

if(qx.core.Variant.isSet(o,p)&&qx.bom.client.Feature.SSL){x=arguments.callee.self.__cN[y];
}return x+qx.$$libraries[y].resourceUri+q+v;
}},defer:function(c){if(qx.core.Variant.isSet(o,p)){if(qx.bom.client.Feature.SSL){for(var g in qx.$$libraries){var e=qx.$$libraries[g].resourceUri;
if(e.match(/^\/\//)!=null){c.__cN[g]=window.location.protocol;
}else if(e.match(/^\.\//)!=null&&qx.core.Setting.get(i)){var d=document.URL;
c.__cN[g]=d.substring(0,d.lastIndexOf(q));
}else if(e.match(/^http/)!=null){}else{var h=window.location.href.indexOf(m);
var f;

if(h==-1){f=window.location.href;
}else{f=window.location.href.substring(0,h);
}c.__cN[g]=f.substring(0,f.lastIndexOf(q)+1);
}}}}}});
})();
(function(){var o="qx.client",n="qx.io2.ImageLoader",m="load";
qx.Bootstrap.define(n,{statics:{__cO:{},__cP:{width:null,height:null},__cQ:/\.(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(q){var r=this.__cO[q];
return !!(r&&r.loaded);
},isFailed:function(t){var u=this.__cO[t];
return !!(u&&u.failed);
},isLoading:function(f){var g=this.__cO[f];
return !!(g&&g.loading);
},getFormat:function(h){var j=this.__cO[h];
return j?j.format:null;
},getSize:function(D){var E=this.__cO[D];
return E?
{width:E.width,height:E.height}:this.__cP;
},getWidth:function(v){var w=this.__cO[v];
return w?w.width:null;
},getHeight:function(F){var G=this.__cO[F];
return G?G.height:null;
},load:function(x,y,z){var A=this.__cO[x];

if(!A){A=this.__cO[x]={};
}if(y&&!z){z=window;
}if(A.loaded||A.loading||A.failed){if(y){if(A.loading){A.callbacks.push(y,z);
}else{y.call(z,x,A);
}}}else{A.loading=true;
A.callbacks=[];

if(y){A.callbacks.push(y,z);
}var C=new Image();
var B=qx.lang.Function.listener(this.__cR,this,C,x);
C.onload=B;
C.onerror=B;
C.src=x;
}},__cR:qx.event.GlobalError.observeMethod(function(event,a,b){var c=this.__cO[b];
if(event.type===m){c.loaded=true;
c.width=this.__cS(a);
c.height=this.__cT(a);
var d=this.__cQ.exec(b);

if(d!=null){c.format=d[1];
}}else{c.failed=true;
}a.onload=a.onerror=null;
var e=c.callbacks;
delete c.loading;
delete c.callbacks;
for(var i=0,l=e.length;i<l;i+=2){e[i].call(e[i+1],b,c);
}}),__cS:qx.core.Variant.select(o,{"gecko":function(p){return p.naturalWidth;
},"default":function(H){return H.width;
}}),__cT:qx.core.Variant.select(o,{"gecko":function(k){return k.naturalHeight;
},"default":function(s){return s.height;
}})}});
})();
(function(){var m="number",l="0",k="px",j=";",i="background-image:url(",h=");",g="",f=")",e="background-repeat:",d=" ",a="qx.bom.element.Background",c="url(",b="background-position:";
qx.Class.define(a,{statics:{__cU:[i,null,h,b,null,j,e,null,j],__cV:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__cW:function(t,top){var u=qx.bom.client.Engine;

if(u.GECKO&&u.VERSION<1.9&&t==top&&typeof t==m){top+=0.01;
}
if(t){var v=(typeof t==m)?t+k:t;
}else{v=l;
}
if(top){var w=(typeof top==m)?top+k:top;
}else{w=l;
}return v+d+w;
},compile:function(D,E,F,top){var G=this.__cW(F,top);
var H=qx.util.ResourceManager.getInstance().toUri(D);
var I=this.__cU;
I[1]=H;
I[4]=G;
I[7]=E;
return I.join(g);
},getStyles:function(n,o,p,top){if(!n){return this.__cV;
}var q=this.__cW(p,top);
var r=qx.util.ResourceManager.getInstance().toUri(n);
var s={backgroundPosition:q,backgroundImage:c+r+f};

if(o!=null){s.backgroundRepeat=o;
}return s;
},set:function(x,y,z,A,top){var B=this.getStyles(y,z,A,top);

for(var C in B){x.style[C]=B[C];
}}}});
})();
(function(){var l="_applyTheme",k="qx.theme.manager.Color",j="Theme",i="changeTheme",h="string",g="singleton";
qx.Class.define(k,{type:g,extend:qx.util.ValueManager,properties:{theme:{check:j,nullable:true,apply:l,event:i}},members:{_applyTheme:function(a){var b={};

if(a){var c=a.colors;
var d=qx.util.ColorUtil;
var e;

for(var f in c){e=c[f];

if(typeof e===h){if(!d.isCssString(e)){throw new Error("Could not parse color: "+e);
}}else if(e instanceof Array){e=d.rgbToRgbString(e);
}else{throw new Error("Could not parse color: "+e);
}b[f]=e;
}}this._setDynamic(b);
},resolve:function(m){var p=this._dynamic;
var n=p[m];

if(n){return n;
}var o=this.getTheme();

if(o!==null&&o.colors[m]){return p[m]=o.colors[m];
}return m;
},isDynamic:function(q){var s=this._dynamic;

if(q&&(s[q]!==undefined)){return true;
}var r=this.getTheme();

if(r!==null&&q&&(r.colors[q]!==undefined)){s[q]=r.colors[q];
return true;
}return false;
}}});
})();
(function(){var T=",",S="rgb(",R=")",Q="qx.theme.manager.Color",P="qx.util.ColorUtil";
qx.Class.define(P,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(u){return this.NAMED[u]!==undefined;
},isSystemColor:function(B){return this.SYSTEM[B]!==undefined;
},supportsThemes:function(){return qx.Class.isDefined(Q);
},isThemedColor:function(C){if(!this.supportsThemes()){return false;
}return qx.theme.manager.Color.getInstance().isDynamic(C);
},stringToRgb:function(y){if(this.supportsThemes()&&this.isThemedColor(y)){var y=qx.theme.manager.Color.getInstance().resolveDynamic(y);
}
if(this.isNamedColor(y)){return this.NAMED[y];
}else if(this.isSystemColor(y)){throw new Error("Could not convert system colors to RGB: "+y);
}else if(this.isRgbString(y)){return this.__cX();
}else if(this.isHex3String(y)){return this.__da();
}else if(this.isHex6String(y)){return this.__db();
}throw new Error("Could not parse color: "+y);
},cssStringToRgb:function(D){if(this.isNamedColor(D)){return this.NAMED[D];
}else if(this.isSystemColor(D)){throw new Error("Could not convert system colors to RGB: "+D);
}else if(this.isRgbString(D)){return this.__cX();
}else if(this.isRgbaString(D)){return this.__cY();
}else if(this.isHex3String(D)){return this.__da();
}else if(this.isHex6String(D)){return this.__db();
}throw new Error("Could not parse color: "+D);
},stringToRgbString:function(X){return this.rgbToRgbString(this.stringToRgb(X));
},rgbToRgbString:function(A){return S+A[0]+T+A[1]+T+A[2]+R;
},rgbToHexString:function(z){return (qx.lang.String.pad(z[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(z[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(z[2].toString(16).toUpperCase(),2));
},isValidPropertyValue:function(bi){return this.isThemedColor(bi)||this.isNamedColor(bi)||this.isHex3String(bi)||this.isHex6String(bi)||this.isRgbString(bi);
},isCssString:function(bh){return this.isSystemColor(bh)||this.isNamedColor(bh)||this.isHex3String(bh)||this.isHex6String(bh)||this.isRgbString(bh);
},isHex3String:function(M){return this.REGEXP.hex3.test(M);
},isHex6String:function(N){return this.REGEXP.hex6.test(N);
},isRgbString:function(Y){return this.REGEXP.rgb.test(Y);
},isRgbaString:function(F){return this.REGEXP.rgba.test(F);
},__cX:function(){var bg=parseInt(RegExp.$1,10);
var bf=parseInt(RegExp.$2,10);
var be=parseInt(RegExp.$3,10);
return [bg,bf,be];
},__cY:function(){var W=parseInt(RegExp.$1,10);
var V=parseInt(RegExp.$2,10);
var U=parseInt(RegExp.$3,10);
return [W,V,U];
},__da:function(){var x=parseInt(RegExp.$1,16)*17;
var w=parseInt(RegExp.$2,16)*17;
var v=parseInt(RegExp.$3,16)*17;
return [x,w,v];
},__db:function(){var bc=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);
var bb=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);
var ba=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);
return [bc,bb,ba];
},hex3StringToRgb:function(O){if(this.isHex3String(O)){return this.__da(O);
}throw new Error("Invalid hex3 value: "+O);
},hex6StringToRgb:function(E){if(this.isHex6String(E)){return this.__db(E);
}throw new Error("Invalid hex6 value: "+E);
},hexStringToRgb:function(bd){if(this.isHex3String(bd)){return this.__da(bd);
}
if(this.isHex6String(bd)){return this.__db(bd);
}throw new Error("Invalid hex value: "+bd);
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
},hsbToRgb:function(G){var i,f,p,q,t;
var H=G[0]/360;
var I=G[1]/100;
var J=G[2]/100;

if(H>=1.0){H%=1.0;
}
if(I>1.0){I=1.0;
}
if(J>1.0){J=1.0;
}var K=Math.floor(255*J);
var L={};

if(I==0.0){L.red=L.green=L.blue=K;
}else{H*=6.0;
i=Math.floor(H);
f=H-i;
p=Math.floor(K*(1.0-I));
q=Math.floor(K*(1.0-(I*f)));
t=Math.floor(K*(1.0-(I*(1.0-f))));

switch(i){case 0:L.red=K;
L.green=t;
L.blue=p;
break;
case 1:L.red=q;
L.green=K;
L.blue=p;
break;
case 2:L.red=p;
L.green=K;
L.blue=t;
break;
case 3:L.red=p;
L.green=q;
L.blue=K;
break;
case 4:L.red=t;
L.green=p;
L.blue=K;
break;
case 5:L.red=K;
L.green=p;
L.blue=q;
break;
}}return L;
},randomColor:function(){var r=Math.round(Math.random()*255);
var g=Math.round(Math.random()*255);
var b=Math.round(Math.random()*255);
return this.rgbToRgbString([r,g,b]);
}}});
})();
(function(){var k="qx.event.handler.Window";
qx.Class.define(k,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(j){arguments.callee.base.call(this);
this._manager=j;
this._window=j.getWindow();
this._initWindowObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(o,p){},registerEvent:function(s,t,u){},unregisterEvent:function(l,m,n){},_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);
var r=qx.event.handler.Window.SUPPORTED_TYPES;

for(var q in r){qx.bom.Event.addNativeListener(this._window,q,this._onNativeWrapper);
}},_stopWindowObserver:function(){var c=qx.event.handler.Window.SUPPORTED_TYPES;

for(var b in c){qx.bom.Event.removeNativeListener(this._window,b,this._onNativeWrapper);
}},_onNative:qx.event.GlobalError.observeMethod(function(e){if(this.isDisposed()){return;
}var f=this._window;
var i=f.document;
var g=i.documentElement;
var d=e.target||e.srcElement;

if(d==null||d===f||d===i||d===g){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,f]);
qx.event.Registration.dispatchEvent(f,event);
var h=event.getReturnValue();

if(h!=null){e.returnValue=h;
return h;
}}})},destruct:function(){this._stopWindowObserver();
this._manager=this._window=null;
},defer:function(a){qx.event.Registration.addHandler(a);
}});
})();
(function(){var k="ready",j="qx.application",i="beforeunload",h="qx.core.Init",g="shutdown";
qx.Class.define(h,{statics:{getApplication:function(){return this.__dd||null;
},__dc:function(){if(qx.bom.client.Engine.UNKNOWN_ENGINE){qx.log.Logger.warn("Could not detect engine!");
}
if(qx.bom.client.Engine.UNKNOWN_VERSION){qx.log.Logger.warn("Could not detect the version of the engine!");
}
if(qx.bom.client.Platform.UNKNOWN_PLATFORM){qx.log.Logger.warn("Could not detect platform!");
}
if(qx.bom.client.System.UNKNOWN_SYSTEM){qx.log.Logger.warn("Could not detect system!");
}qx.log.Logger.debug(this,"Load runtime: "+(new Date-qx.Bootstrap.LOADSTART)+"ms");
var c=qx.core.Setting.get(j);
var d=qx.Class.getByName(c);

if(d){this.__dd=new d;
var b=new Date;
this.__dd.main();
qx.log.Logger.debug(this,"Main runtime: "+(new Date-b)+"ms");
var b=new Date;
this.__dd.finalize();
qx.log.Logger.debug(this,"Finalize runtime: "+(new Date-b)+"ms");
}else{qx.log.Logger.warn("Missing application class: "+c);
}},__de:function(e){var l=this.__dd;

if(l){e.setReturnValue(l.close());
}},__df:function(){var f=this.__dd;

if(f){f.terminate();
}}},defer:function(a){qx.event.Registration.addListener(window,k,a.__dc,a);
qx.event.Registration.addListener(window,g,a.__df,a);
qx.event.Registration.addListener(window,i,a.__de,a);
}});
})();
(function(){var a="qx.application.IApplication";
qx.Interface.define(a,{members:{main:function(){},finalize:function(){},close:function(){},terminate:function(){}}});
})();
(function(){var h="qx.locale.MTranslation";
qx.Mixin.define(h,{members:{tr:function(a,b){var c=qx.locale.Manager;

if(c){return c.tr.apply(c,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trn:function(i,j,k,l){var m=qx.locale.Manager;

if(m){return m.trn.apply(m,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trc:function(d,e,f){var g=qx.locale.Manager;

if(g){return g.trc.apply(g,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},marktr:function(n){var o=qx.locale.Manager;

if(o){return o.marktr.apply(o,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
}}});
})();
(function(){var b="abstract",a="qx.application.AbstractGui";
qx.Class.define(a,{type:b,extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,members:{__dg:null,_createRootWidget:function(){throw new Error("Abstract method call");
},getRoot:function(){return this.__dg;
},main:function(){qx.theme.manager.Meta.getInstance().initialize();
qx.ui.tooltip.Manager.getInstance();
this.__dg=this._createRootWidget();
},finalize:function(){this.render();
},render:function(){qx.ui.core.queue.Manager.flush();
},close:function(c){},terminate:function(){}},destruct:function(){this.__dg=null;
}});
})();
(function(){var a="qx.application.Standalone";
qx.Class.define(a,{extend:qx.application.AbstractGui,members:{_createRootWidget:function(){return new qx.ui.root.Application(document);
}}});
})();
(function(){var d="gui4/test.png",c="gui4.Application",b="First Button",a="execute";
qx.Class.define(c,{extend:qx.application.Standalone,members:{main:function(){arguments.callee.base.call(this);
{};
var g=new qx.ui.form.Button(b,d);
var f=this.getRoot();
f.add(g,{left:100,top:50});
g.addListener(a,function(e){alert("Hello World!");
});
}}});
})();
(function(){var g="qx.event.type.Native";
qx.Class.define(g,{extend:qx.event.type.Event,members:{init:function(h,i,j,k,l){arguments.callee.base.call(this,k,l);
this._target=i||qx.bom.Event.getTarget(h);
this._relatedTarget=j||qx.bom.Event.getRelatedTarget(h);

if(h.timeStamp){this._timeStamp=h.timeStamp;
}this._native=h;
this._returnValue=null;
return this;
},clone:function(d){var e=arguments.callee.base.call(this,d);
var f={};
e._native=this._cloneNativeEvent(this._native,f);
e._returnValue=this._returnValue;
return e;
},_cloneNativeEvent:function(a,b){b.preventDefault=qx.lang.Function.empty;
return b;
},preventDefault:function(){arguments.callee.base.call(this);
qx.bom.Event.preventDefault(this._native);
},getNativeEvent:function(){return this._native;
},setReturnValue:function(c){this._returnValue=c;
},getReturnValue:function(){return this._returnValue;
}},destruct:function(){this._native=this._returnValue=null;
}});
})();
(function(){var i="_applyTheme",h="qx.theme",g="qx.theme.manager.Meta",f="qx.theme.Classic",e="Theme",d="singleton";
qx.Class.define(g,{type:d,extend:qx.core.Object,properties:{theme:{check:e,nullable:true,apply:i}},members:{_applyTheme:function(j,k){var n=null;
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
},initialize:function(){var b=qx.core.Setting;
var a,c;
a=b.get(h);

if(a){c=qx.Theme.getByName(a);

if(!c){throw new Error("The theme to use is not available: "+a);
}this.setTheme(c);
}}},settings:{"qx.theme":f}});
})();
(function(){var m="object",l="__dh",k="_applyTheme",j="qx.theme.manager.Decoration",i="Theme",h="string",g="singleton";
qx.Class.define(j,{type:g,extend:qx.core.Object,properties:{theme:{check:i,nullable:true,apply:k}},members:{__dh:null,resolve:function(p){if(!p){return null;
}
if(typeof p===m){return p;
}var s=this.getTheme();

if(!s){return null;
}var s=this.getTheme();

if(!s){return null;
}var t=this.__dh;

if(!t){t=this.__dh={};
}var q=t[p];

if(q){return q;
}var r=s.decorations[p];

if(!r){return null;
}var u=r.decorator;

if(u==null){throw new Error("Missing definition of which decorator to use in entry: "+p+"!");
}return t[p]=(new u).set(r.style);
},isValidPropertyValue:function(a){if(typeof a===h){return this.isDynamic(a);
}else if(typeof a===m){var b=a.constructor;
return qx.Class.hasInterface(b,qx.ui.decoration.IDecorator);
}return false;
},isDynamic:function(n){if(!n){return false;
}var o=this.getTheme();

if(!o){return false;
}return !!o.decorations[n];
},_applyTheme:function(c,d){var f=qx.util.AliasManager.getInstance();

if(d){for(var e in d.aliases){f.remove(e);
}}
if(c){for(var e in c.aliases){f.add(e,c.aliases[e]);
}}
if(!c){this.__dh={};
}}},destruct:function(){this._disposeMap(l);
}});
})();
(function(){var j="qx.theme.manager.Font",i="Theme",h="changeTheme",g="_applyTheme",f="singleton";
qx.Class.define(j,{type:f,extend:qx.util.ValueManager,properties:{theme:{check:i,nullable:true,apply:g,event:h}},members:{resolveDynamic:function(d){var e=this._dynamic;
return d instanceof qx.bom.Font?d:e[d];
},resolve:function(k){var n=this._dynamic;
var l=n[k];

if(l){return l;
}var m=this.getTheme();

if(m!==null&&m.fonts[k]){return n[k]=(new qx.bom.Font).set(m.fonts[k]);
}return k;
},isDynamic:function(a){var c=this._dynamic;

if(a&&(a instanceof qx.bom.Font||c[a]!==undefined)){return true;
}var b=this.getTheme();

if(b!==null&&a&&b.fonts[a]){c[a]=(new qx.bom.Font).set(b.fonts[a]);
return true;
}return false;
},_applyTheme:function(o){var p=this._getDynamic();

for(var s in p){if(p[s].themed){p[s].dispose();
delete p[s];
}}
if(o){var q=o.fonts;
var r=qx.bom.Font;

for(var s in q){p[s]=(new r).set(q[s]);
p[s].themed=true;
}}this._setDynamic(p);
}}});
})();
(function(){var n="",m="underline",k="Boolean",j="px",h='"',g="italic",f="normal",e="bold",d="_applyItalic",c="_applyBold",z="Integer",y="_applyFamily",x="_applyLineHeight",w="Array",v="overline",u="line-through",t="qx.bom.Font",s="Number",r="_applyDecoration",q=" ",o="_applySize",p=",";
qx.Class.define(t,{extend:qx.core.Object,construct:function(A,B){arguments.callee.base.call(this);

if(A!==undefined){this.setSize(A);
}
if(B!==undefined){this.setFamily(B);
}},statics:{fromString:function(L){var P=new qx.bom.Font();
var N=L.split(/\s+/);
var name=[];
var O;

for(var i=0;i<N.length;i++){switch(O=N[i]){case e:P.setBold(true);
break;
case g:P.setItalic(true);
break;
case m:P.setDecoration(m);
break;
default:var M=parseInt(O,10);

if(M==O||qx.lang.String.contains(O,j)){P.setSize(M);
}else{name.push(O);
}break;
}}
if(name.length>0){P.setFamily(name);
}return P;
},fromConfig:function(a){var b=new qx.bom.Font;
b.set(a);
return b;
},__di:{fontFamily:n,fontSize:n,fontWeight:n,fontStyle:n,textDecoration:n,lineHeight:1.2},getDefaultStyles:function(){return this.__di;
}},properties:{size:{check:z,nullable:true,apply:o},lineHeight:{check:s,nullable:true,apply:x},family:{check:w,nullable:true,apply:y},bold:{check:k,nullable:true,apply:c},italic:{check:k,nullable:true,apply:d},decoration:{check:[m,u,v],nullable:true,apply:r}},members:{__dj:null,__dk:null,__dl:null,__dm:null,__dn:null,__do:null,_applySize:function(E,F){this.__dj=E===null?null:E+j;
},_applyLineHeight:function(S,T){this.__do=S===null?null:S;
},_applyFamily:function(G,H){var I=n;

for(var i=0,l=G.length;i<l;i++){if(G[i].indexOf(q)>0){I+=h+G[i]+h;
}else{I+=G[i];
}
if(i!==l-1){I+=p;
}}this.__dk=I;
},_applyBold:function(Q,R){this.__dl=Q===null?null:Q?e:f;
},_applyItalic:function(J,K){this.__dm=J===null?null:J?g:f;
},_applyDecoration:function(C,D){this.__dn=C===null?null:C;
},getStyles:function(){return {fontFamily:this.__dk,fontSize:this.__dj,fontWeight:this.__dl,fontStyle:this.__dm,textDecoration:this.__dn,lineHeight:this.__do};
}}});
})();
(function(){var d="qx.theme.manager.Icon",c="Theme",b="_applyTheme",a="singleton";
qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:c,nullable:true,apply:b}},members:{_applyTheme:function(e,f){var h=qx.util.AliasManager.getInstance();

if(f){for(var g in f.aliases){h.remove(g);
}}
if(e){for(var g in e.aliases){h.add(g,e.aliases[g]);
}}}}});
})();
(function(){var L="string",K="_applyTheme",J="qx.theme.manager.Appearance",I=":",H="Theme",G="changeTheme",F="/",E="singleton";
qx.Class.define(J,{type:E,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__dp={};
this.__dq={};
},properties:{theme:{check:H,nullable:true,event:G,apply:K}},members:{__dr:{},__dp:null,__dq:null,_applyTheme:function(l,m){this.__dq={};
this.__dp={};
},__ds:function(a,b,c){var g=b.appearances;
var j=g[a];

if(!j){var k=F;
var d=[];
var i=a.split(k);
var h;

while(!j&&i.length>0){d.unshift(i.pop());
var e=i.join(k);
j=g[e];

if(j){h=j.alias||j;

if(typeof h===L){var f=h+k+d.join(k);
return this.__ds(f,b,c);
}}}if(c!=null){return this.__ds(c,b);
}return null;
}else if(typeof j===L){return this.__ds(j,b,c);
}else if(j.include&&!j.style){return this.__ds(j.include,b,c);
}return a;
},styleFrom:function(n,o,p,q){if(!p){p=this.getTheme();
}var w=this.__dq;
var r=w[n];

if(!r){r=w[n]=this.__ds(n,p,q);
}var B=p.appearances[r];

if(!B){this.warn("Missing appearance: "+n);
return null;
}if(!B.style){return null;
}var C=r;

if(o){var D=B.$$bits;

if(!D){D=B.$$bits={};
B.$$length=0;
}var u=0;

for(var x in o){if(!o[x]){continue;
}
if(D[x]==null){D[x]=1<<B.$$length++;
}u+=D[x];
}if(u>0){C+=I+u;
}}var v=this.__dp;

if(v[C]!==undefined){return v[C];
}if(!o){o=this.__dr;
}var z;
if(B.include||B.base){var t=B.style(o);
var s;

if(B.include){s=this.styleFrom(B.include,o,p,q);
}z={};
if(B.base){var y=this.styleFrom(r,o,B.base,q);

if(B.include){for(var A in y){if(!s.hasOwnProperty(A)&&!t.hasOwnProperty(A)){z[A]=y[A];
}}}else{for(var A in y){if(!t.hasOwnProperty(A)){z[A]=y[A];
}}}}if(B.include){for(var A in s){if(!t.hasOwnProperty(A)){z[A]=s[A];
}}}for(var A in t){z[A]=t[A];
}}else{z=B.style(o);
}return v[C]=z||null;
}},destruct:function(){this.__dp=this.__dq=null;
}});
})();
(function(){var p="focusout",o="interval",n="mouseover",m="mouseout",l="mousemove",k="widget",j="qx.ui.tooltip.ToolTip",i="Boolean",h="__dt",g="_applyCurrent",c="__du",f="qx.ui.tooltip.Manager",d="__dw",b="tooltip-error",a="singleton";
qx.Class.define(f,{type:a,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
qx.event.Registration.addListener(document.body,n,this.__dD,this,true);
this.__dt=new qx.event.Timer();
this.__dt.addListener(o,this.__dA,this);
this.__du=new qx.event.Timer();
this.__du.addListener(o,this.__dB,this);
this.__dv={left:0,top:0};
},properties:{current:{check:j,nullable:true,apply:g},showInvalidTooltips:{check:i,init:true}},members:{__dv:null,__du:null,__dt:null,__dw:null,__dx:null,__dy:function(){if(!this.__dw){this.__dw=new qx.ui.tooltip.ToolTip().set({rich:true});
}return this.__dw;
},__dz:function(){if(!this.__dx){this.__dx=new qx.ui.tooltip.ToolTip().set({appearance:b});
this.__dx.syncAppearance();
}return this.__dx;
},_applyCurrent:function(B,C){if(C&&qx.ui.core.Widget.contains(C,B)){return;
}if(C){if(!C.isDisposed()){C.exclude();
}this.__dt.stop();
this.__du.stop();
}var E=qx.event.Registration;
var D=document.body;
if(B){this.__dt.startWith(B.getShowTimeout());
E.addListener(D,m,this.__dE,this,true);
E.addListener(D,p,this.__dF,this,true);
E.addListener(D,l,this.__dC,this,true);
}else{E.removeListener(D,m,this.__dE,this,true);
E.removeListener(D,p,this.__dF,this,true);
E.removeListener(D,l,this.__dC,this,true);
}},__dA:function(e){var G=this.getCurrent();

if(G&&!G.isDisposed()){this.__du.startWith(G.getHideTimeout());

if(G.getPlaceMethod()==k){G.placeToWidget(G.getOpener());
}else{G.placeToPoint(this.__dv);
}G.show();
}this.__dt.stop();
},__dB:function(e){var F=this.getCurrent();

if(F&&!F.isDisposed()){F.exclude();
}this.__du.stop();
this.resetCurrent();
},__dC:function(e){var A=this.__dv;
A.left=e.getDocumentLeft();
A.top=e.getDocumentTop();
},__dD:function(e){var v=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

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
}var w=this.__dz().set({label:t});
}else if(!w){var w=this.__dy().set({label:x,icon:u});
}this.setCurrent(w);
w.setOpener(v);
},__dE:function(e){var q=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!q){return;
}var r=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());

if(!r){return;
}var s=this.getCurrent();
if(s&&(r==s||qx.ui.core.Widget.contains(s,r))){return;
}if(r&&q&&qx.ui.core.Widget.contains(q,r)){return;
}if(s&&!r){this.setCurrent(null);
}else{this.resetCurrent();
}},__dF:function(e){var y=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!y){return;
}var z=this.getCurrent();
if(z&&z==y.getToolTip()){this.setCurrent(null);
}}},destruct:function(){qx.event.Registration.removeListener(document.body,n,this.__dD,this,true);
this._disposeObjects(h,c,d);
this.__dv=null;
}});
})();
(function(){var l="interval",k="qx.event.Timer",j="_applyInterval",i="_applyEnabled",h="Boolean",g="qx.event.type.Event",f="Integer";
qx.Class.define(k,{extend:qx.core.Object,construct:function(p){arguments.callee.base.call(this);
this.setEnabled(false);

if(p!=null){this.setInterval(p);
}this.__dG=qx.lang.Function.bind(this._oninterval,this);
},events:{"interval":g},statics:{once:function(a,b,c){var d=new qx.event.Timer(c);
d.addListener(l,function(e){d.stop();
a.call(b,e);
d.dispose();
b=null;
},b);
d.start();
return d;
}},properties:{enabled:{init:true,check:h,apply:i},interval:{check:f,init:1000,apply:j}},members:{__dH:null,__dG:null,_applyInterval:function(n,o){if(this.getEnabled()){this.restart();
}},_applyEnabled:function(r,s){if(s){window.clearInterval(this.__dH);
this.__dH=null;
}else if(r){this.__dH=window.setInterval(this.__dG,this.getInterval());
}},start:function(){this.setEnabled(true);
},startWith:function(m){this.setInterval(m);
this.start();
},stop:function(){this.setEnabled(false);
},restart:function(){this.stop();
this.start();
},restartWith:function(q){this.stop();
this.startWith(q);
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.getEnabled()){this.fireEvent(l);
}})},destruct:function(){if(this.__dH){window.clearInterval(this.__dH);
}this.__dH=this.__dG=null;
}});
})();
(function(){var f="qx.ui.core.MChildrenHandling";
qx.Mixin.define(f,{members:{getChildren:function(){return this._getChildren();
},hasChildren:function(){return this._hasChildren();
},indexOf:function(p){return this._indexOf(p);
},add:function(d,e){this._add(d,e);
},addAt:function(a,b,c){this._addAt(a,b,c);
},addBefore:function(l,m,n){this._addBefore(l,m,n);
},addAfter:function(h,i,j){this._addAfter(h,i,j);
},remove:function(g){this._remove(g);
},removeAt:function(o){return this._removeAt(o);
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
qx.Mixin.define(a,{members:{setLayout:function(c){return this._setLayout(c);
},getLayout:function(){return this._getLayout();
}},statics:{remap:function(b){b.getLayout=b._getLayout;
b.setLayout=b._setLayout;
}}});
})();
(function(){var w="Integer",v="_applyDimension",u="Boolean",t="_applyStretching",s="_applyMargin",r="shorthand",q="_applyAlign",p="allowShrinkY",o="bottom",n="baseline",K="marginBottom",J="qx.ui.core.LayoutItem",I="center",H="marginTop",G="allowGrowX",F="middle",E="marginLeft",D="allowShrinkX",C="top",B="right",z="marginRight",A="abstract",x="allowGrowY",y="left";
qx.Class.define(J,{type:A,extend:qx.core.Object,properties:{minWidth:{check:w,nullable:true,apply:v,init:null,themeable:true},width:{check:w,nullable:true,apply:v,init:null,themeable:true},maxWidth:{check:w,nullable:true,apply:v,init:null,themeable:true},minHeight:{check:w,nullable:true,apply:v,init:null,themeable:true},height:{check:w,nullable:true,apply:v,init:null,themeable:true},maxHeight:{check:w,nullable:true,apply:v,init:null,themeable:true},allowGrowX:{check:u,apply:t,init:true,themeable:true},allowShrinkX:{check:u,apply:t,init:true,themeable:true},allowGrowY:{check:u,apply:t,init:true,themeable:true},allowShrinkY:{check:u,apply:t,init:true,themeable:true},allowStretchX:{group:[G,D],mode:r,themeable:true},allowStretchY:{group:[x,p],mode:r,themeable:true},marginTop:{check:w,init:0,apply:s,themeable:true},marginRight:{check:w,init:0,apply:s,themeable:true},marginBottom:{check:w,init:0,apply:s,themeable:true},marginLeft:{check:w,init:0,apply:s,themeable:true},margin:{group:[H,z,K,E],mode:r,themeable:true},alignX:{check:[y,I,B],nullable:true,apply:q,themeable:true},alignY:{check:[C,F,o,n],nullable:true,apply:q,themeable:true}},members:{__dI:null,__dJ:null,__dK:null,__dL:null,__dM:null,__dN:null,__dO:null,getBounds:function(){return this.__dN||this.__dJ||null;
},clearSeparators:function(){},renderSeparator:function(N,O){},renderLayout:function(R,top,S,T){var U;
{};
var V=null;

if(this.getHeight()==null&&this._hasHeightForWidth()){var V=this._getHeightForWidth(S);
}
if(V!=null&&V!==this.__dI){this.__dI=V;
qx.ui.core.queue.Layout.add(this);
return null;
}var X=this.__dJ;

if(!X){X=this.__dJ={};
}var W={};

if(R!==X.left||top!==X.top){W.position=true;
X.left=R;
X.top=top;
}
if(S!==X.width||T!==X.height){W.size=true;
X.width=S;
X.height=T;
}if(this.__dK){W.local=true;
delete this.__dK;
}
if(this.__dM){W.margin=true;
delete this.__dM;
}return W;
},isExcluded:function(){return false;
},hasValidLayout:function(){return !this.__dK;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutCache:function(){this.__dK=true;
this.__dL=null;
},getSizeHint:function(Y){var ba=this.__dL;

if(ba){return ba;
}
if(Y===false){return null;
}ba=this.__dL=this._computeSizeHint();
if(this._hasHeightForWidth()&&this.__dI&&this.getHeight()==null){ba.height=this.__dI;
}if(!this.getAllowShrinkX()){ba.minWidth=Math.max(ba.minWidth,ba.width);
}else if(ba.minWidth>ba.width&&this.getAllowGrowX()){ba.width=ba.minWidth;
}
if(!this.getAllowShrinkY()){ba.minHeight=Math.max(ba.minHeight,ba.height);
}
if(ba.minHeight>ba.height&&this.getAllowGrowY()){ba.height=ba.minHeight;
}if(!this.getAllowGrowX()){ba.maxWidth=Math.min(ba.maxWidth,ba.width);
}
if(ba.width>ba.maxWidth){ba.width=ba.maxWidth;
}
if(!this.getAllowGrowY()){ba.maxHeight=Math.min(ba.maxHeight,ba.height);
}
if(ba.height>ba.maxHeight){ba.height=ba.maxHeight;
}{};
return ba;
},_computeSizeHint:function(){var f=this.getMinWidth()||0;
var c=this.getMinHeight()||0;
var g=this.getWidth()||f;
var e=this.getHeight()||c;
var b=this.getMaxWidth()||Infinity;
var d=this.getMaxHeight()||Infinity;
return {minWidth:f,width:g,maxWidth:b,minHeight:c,height:e,maxHeight:d};
},_hasHeightForWidth:function(){var a=this._getLayout();

if(a){return a.hasHeightForWidth();
}return false;
},_getHeightForWidth:function(be){var bf=this._getLayout();

if(bf&&bf.hasHeightForWidth()){return bf.getHeightForWidth(be);
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
},setUserBounds:function(bb,top,bc,bd){this.__dN={left:bb,top:top,width:bc,height:bd};
qx.ui.core.queue.Layout.add(this);
},resetUserBounds:function(){delete this.__dN;
qx.ui.core.queue.Layout.add(this);
},__dP:{},setLayoutProperties:function(h){if(h==null){return;
}var i=this.__dO;

if(!i){i=this.__dO={};
}var parent=this.getLayoutParent();

if(parent){parent.updateLayoutProperties(h);
}for(var j in h){if(h[j]==null){delete i[j];
}else{i[j]=h[j];
}}},getLayoutProperties:function(){return this.__dO||this.__dP;
},clearLayoutProperties:function(){delete this.__dO;
},updateLayoutProperties:function(k){var l=this._getLayout();

if(l){var m;
{};
l.invalidateChildrenCache();
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
},clone:function(){var L=arguments.callee.base.call(this);
var M=this.__dO;

if(M){L.__dO=qx.lang.Object.clone(M);
}return L;
},serialize:function(){var P=arguments.callee.base.call(this);
var Q=this.__dO;

if(Q){P.layoutProperties=qx.lang.Object.clone(Q);
}return P;
}},destruct:function(){this.$$parent=this.$$subparent=this.__dO=this.__dJ=this.__dN=this.__dL=null;
}});
})();
(function(){var b="qx.ui.core.DecoratorFactory",a="$$nopool$$";
qx.Class.define(b,{extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__dQ={};
},statics:{MAX_SIZE:15,__dR:a},members:{__dQ:null,getDecoratorElement:function(c){var h=qx.ui.core.DecoratorFactory;

if(qx.lang.Type.isString(c)){var f=c;
var e=qx.theme.manager.Decoration.getInstance().resolve(c);
}else{var f=h.__dR;
e=c;
}var g=this.__dQ;

if(g[f]&&g[f].length>0){var d=g[f].pop();
}else{var d=this._createDecoratorElement(e,f);
}d.$$pooled=false;
return d;
},poolDecorator:function(n){if(!n||n.$$pooled){return;
}var q=qx.ui.core.DecoratorFactory;
var o=n.getId();

if(o==q.__dR){n.dispose();
return;
}var p=this.__dQ;

if(!p[o]){p[o]=[];
}
if(p[o].length>q.MAX_SIZE){n.dispose();
}else{n.$$pooled=true;
p[o].push(n);
}},_createDecoratorElement:function(k,l){var m=new qx.html.Decorator(k,l);
{};
return m;
},toString:function(){return arguments.callee.base.call(this);
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){var j=this.__dQ;

for(var i in j){qx.util.DisposeUtil.disposeArray(j,i);
}}this.__dQ=null;
}});
})();
(function(){var db="px",da="Boolean",cY="qx.event.type.Mouse",cX="qx.event.type.Drag",cW="visible",cV="qx.event.type.Focus",cU="on",cT="Integer",cS="excluded",cR="qx.event.type.Data",cE="_applyPadding",cD="qx.event.type.Event",cC="hidden",cB="contextmenu",cA="String",cz="tabIndex",cy="backgroundColor",cx="focused",cw="changeVisibility",cv="mshtml",di="hovered",dj="qx.event.type.KeySequence",dg="qx.client",dh="absolute",de="drag",df="div",dc="disabled",dd="move",dk="dragstart",dl="qx.dynlocale",cK="dragchange",cJ="dragend",cM="resize",cL="Decorator",cO="zIndex",cN="$$widget",cQ="opacity",cP="default",cI="Color",cH="changeToolTipText",bm="beforeContextmenuOpen",bn="_applyNativeContextMenu",bo="__ef",bp="_applyBackgroundColor",bq="_applyFocusable",br="changeShadow",bs="__ec",bt="qx.event.type.KeyInput",bu="__dX",bv="createChildControl",dq="Font",dp="_applyShadow",dn="__dT",dm="_applyEnabled",du="_applySelectable",dt="Number",ds="_applyKeepActive",dr="__dY",dw="_applyVisibility",dv="repeat",bU="qxDraggable",bV="syncAppearance",bS="paddingLeft",bT="_applyDroppable",bY="__eh",ca="#",bW="_applyCursor",bX="_applyDraggable",bQ="changeTextColor",bR="changeContextMenu",bD="__dS",bC="paddingTop",bF="changeSelectable",bE="hideFocus",bz="none",by="outline",bB="_applyAppearance",bA="_applyOpacity",bx="url(",bw=")",cf="qx.ui.core.Widget",cg="_applyFont",ch="cursor",ci="qxDroppable",cb="changeZIndex",cc="changeEnabled",cd="changeFont",ce="_applyDecorator",cj="_applyZIndex",ck="_applyTextColor",bN="qx.ui.menu.Menu",bM="_applyToolTipText",bL="true",bK="widget",bJ="changeDecorator",bI="_applyTabIndex",bH="changeAppearance",bG="shorthand",bP="/",bO="",cl="_applyContextMenu",cm="paddingBottom",cn="__dW",co="changeNativeContextMenu",cp="qx.ui.tooltip.ToolTip",cq="qxKeepActive",cr="_applyKeepFocus",cs="paddingRight",ct="changeBackgroundColor",cu="changeLocale",cG="qxKeepFocus",cF="qx/static/blank.gif";
qx.Class.define(cf,{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){arguments.callee.base.call(this);
this.__dS=this._createContainerElement();
this.__dT=this.__eg();
this.__dS.add(this.__dT);
this.initFocusable();
this.initSelectable();
this.initNativeContextMenu();
},events:{appear:cD,disappear:cD,createChildControl:cR,resize:cR,move:cR,syncAppearance:cR,mousemove:cY,mouseover:cY,mouseout:cY,mousedown:cY,mouseup:cY,click:cY,dblclick:cY,contextmenu:cY,beforeContextmenuOpen:cY,mousewheel:cY,keyup:dj,keydown:dj,keypress:dj,keyinput:bt,focus:cV,blur:cV,focusin:cV,focusout:cV,activate:cV,deactivate:cV,capture:cD,losecapture:cD,drop:cX,dragleave:cX,dragover:cX,drag:cX,dragstart:cX,dragend:cX,dragchange:cX,droprequest:cX},properties:{paddingTop:{check:cT,init:0,apply:cE,themeable:true},paddingRight:{check:cT,init:0,apply:cE,themeable:true},paddingBottom:{check:cT,init:0,apply:cE,themeable:true},paddingLeft:{check:cT,init:0,apply:cE,themeable:true},padding:{group:[bC,cs,cm,bS],mode:bG,themeable:true},zIndex:{nullable:true,init:null,apply:cj,event:cb,check:cT,themeable:true},decorator:{nullable:true,init:null,apply:ce,event:bJ,check:cL,themeable:true},shadow:{nullable:true,init:null,apply:dp,event:br,check:cL,themeable:true},backgroundColor:{nullable:true,check:cI,apply:bp,event:ct,themeable:true},textColor:{nullable:true,check:cI,apply:ck,event:bQ,themeable:true,inheritable:true},font:{nullable:true,apply:cg,check:dq,event:cd,themeable:true,inheritable:true},opacity:{check:dt,apply:bA,themeable:true,nullable:true,init:null},cursor:{check:cA,apply:bW,themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:cp,nullable:true},toolTipText:{check:cA,nullable:true,event:cH,apply:bM},toolTipIcon:{check:cA,nullable:true,event:cH},blockToolTip:{check:da,init:false},visibility:{check:[cW,cC,cS],init:cW,apply:dw,event:cw},enabled:{init:true,check:da,inheritable:true,apply:dm,event:cc},anonymous:{init:false,check:da},tabIndex:{check:cT,nullable:true,apply:bI},focusable:{check:da,init:false,apply:bq},keepFocus:{check:da,init:false,apply:cr},keepActive:{check:da,init:false,apply:ds},draggable:{check:da,init:false,apply:bX},droppable:{check:da,init:false,apply:bT},selectable:{check:da,init:false,event:bF,apply:du},contextMenu:{check:bN,apply:cl,nullable:true,event:bR},nativeContextMenu:{check:da,init:false,themeable:true,event:co,apply:bn},appearance:{check:cA,init:bK,apply:bB,event:bH}},statics:{DEBUG:false,getWidgetByElement:function(R){while(R){var S=R.$$widget;
if(S!=null){return qx.core.ObjectRegistry.fromHashCode(S);
}R=R.parentNode;
}return null;
},contains:function(parent,fX){while(fX){if(parent==fX){return true;
}fX=fX.getLayoutParent();
}return false;
},__dU:new qx.ui.core.DecoratorFactory(),__dV:new qx.ui.core.DecoratorFactory()},members:{__dS:null,__dT:null,__dW:null,__dX:null,__dY:null,__ea:null,__eb:null,__ec:null,_getLayout:function(){return this.__ec;
},_setLayout:function(E){{};

if(this.__ec){this.__ec.connectToWidget(null);
}
if(E){E.connectToWidget(this);
}this.__ec=E;
qx.ui.core.queue.Layout.add(this);
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}var ff=this.getContainerElement();

if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(ff);
}this.$$parent=parent||null;

if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(ff);
}qx.core.Property.refresh(this);
qx.ui.core.queue.Visibility.add(this);
},_updateInsets:null,__ee:function(a,b){if(a==b){return false;
}
if(a==null||b==null){return true;
}var F=qx.theme.manager.Decoration.getInstance();
var H=F.resolve(a).getInsets();
var G=F.resolve(b).getInsets();

if(H.top!=G.top||H.right!=G.right||H.bottom!=G.bottom||H.left!=G.left){return true;
}return false;
},renderLayout:function(eL,top,eM,eN){var eW=arguments.callee.base.call(this,eL,top,eM,eN);
if(!eW){return;
}var eP=this.getContainerElement();
var content=this.getContentElement();
var eT=eW.size||this._updateInsets;
var eX=db;
var eU={};
if(eW.position){eU.left=eL+eX;
eU.top=top+eX;
}if(eW.size){eU.width=eM+eX;
eU.height=eN+eX;
}
if(eW.position||eW.size){eP.setStyles(eU);
}
if(eT||eW.local||eW.margin){var eO=this.getInsets();
var innerWidth=eM-eO.left-eO.right;
var innerHeight=eN-eO.top-eO.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}var eR={};

if(this._updateInsets){eR.left=eO.left+eX;
eR.top=eO.top+eX;
}
if(eT){eR.width=innerWidth+eX;
eR.height=innerHeight+eX;
}
if(eT||this._updateInsets){content.setStyles(eR);
}
if(eW.size){var eV=this.__dY;

if(eV){eV.setStyles({width:eM+db,height:eN+db});
}}
if(eW.size||this._updateInsets){if(this.__dW){this.__dW.resize(eM,eN);
}}
if(eW.size){if(this.__dX){var eO=this.__dX.getInsets();
var eS=eM+eO.left+eO.right;
var eQ=eN+eO.top+eO.bottom;
this.__dX.resize(eS,eQ);
}}
if(eT||eW.local||eW.margin){if(this.__ec&&this.hasLayoutChildren()){this.__ec.renderLayout(innerWidth,innerHeight);
}else if(this.hasLayoutChildren()){throw new Error("At least one child in control "+this._findTopControl()+" requires a layout, but no one was defined!");
}}if(eW.position&&this.hasListener(dd)){this.fireDataEvent(dd,this.getBounds());
}
if(eW.size&&this.hasListener(cM)){this.fireDataEvent(cM,this.getBounds());
}delete this._updateInsets;
return eW;
},__ef:null,clearSeparators:function(){var be=this.__ef;

if(!be){return;
}var bf=qx.ui.core.Widget.__dU;
var content=this.getContentElement();
var bd;

for(var i=0,l=be.length;i<l;i++){bd=be[i];
bf.poolDecorator(bd);
content.remove(bd);
}be.length=0;
},renderSeparator:function(h,j){var m=qx.ui.core.Widget.__dU.getDecoratorElement(h);
this.getContentElement().add(m);
m.resize(j.width,j.height);
var k=m.getDomElement().style;
k.left=j.left+db;
k.top=j.top+db;
if(!this.__ef){this.__ef=[m];
}else{this.__ef.push(m);
}},_computeSizeHint:function(){var eG=this.getWidth();
var eF=this.getMinWidth();
var eB=this.getMaxWidth();
var eE=this.getHeight();
var eC=this.getMinHeight();
var eD=this.getMaxHeight();
var eH=this._getContentHint();
var eA=this.getInsets();
var eJ=eA.left+eA.right;
var eI=eA.top+eA.bottom;

if(eG==null){eG=eH.width+eJ;
}
if(eE==null){eE=eH.height+eI;
}
if(eF==null){eF=eJ;

if(eH.minWidth!=null){eF+=eH.minWidth;
}}
if(eC==null){eC=eI;

if(eH.minHeight!=null){eC+=eH.minHeight;
}}
if(eB==null){if(eH.maxWidth==null){eB=Infinity;
}else{eB=eH.maxWidth+eJ;
}}
if(eD==null){if(eH.maxHeight==null){eD=Infinity;
}else{eD=eH.maxHeight+eI;
}}return {width:eG,minWidth:eF,maxWidth:eB,height:eE,minHeight:eC,maxHeight:eD};
},invalidateLayoutCache:function(){arguments.callee.base.call(this);

if(this.__ec){this.__ec.invalidateLayoutCache();
}},_getContentHint:function(){var C=this.__ec;

if(C){if(this.hasLayoutChildren()){var B;
var D=C.getSizeHint();
{};
return D;
}else{return {width:0,height:0};
}}else{return {width:100,height:50};
}},_getHeightForWidth:function(gw){var gA=this.getInsets();
var gD=gA.left+gA.right;
var gC=gA.top+gA.bottom;
var gB=gw-gD;
var gy=this._getLayout();

if(gy&&gy.hasHeightForWidth()){var gx=gy.getHeightForWidth(gw);
}else{gx=this._getContentHeightForWidth(gB);
}var gz=gx+gC;
return gz;
},_getContentHeightForWidth:function(N){throw new Error("Abstract method call: _getContentHeightForWidth()!");
},getInsets:function(){var top=this.getPaddingTop();
var gF=this.getPaddingRight();
var gH=this.getPaddingBottom();
var gG=this.getPaddingLeft();

if(this.__dW){var gE=this.__dW.getInsets();
{};
top+=gE.top;
gF+=gE.right;
gH+=gE.bottom;
gG+=gE.left;
}return {"top":top,"right":gF,"bottom":gH,"left":gG};
},getInnerSize:function(){var M=this.getBounds();

if(!M){return null;
}var L=this.getInsets();
return {width:M.width-L.left-L.right,height:M.height-L.top-L.bottom};
},show:function(){this.setVisibility(cW);
},hide:function(){this.setVisibility(cC);
},exclude:function(){this.setVisibility(cS);
},isVisible:function(){return this.getVisibility()===cW;
},isHidden:function(){return this.getVisibility()!==cW;
},isExcluded:function(){return this.getVisibility()===cS;
},isSeeable:function(){var bj=this.getContainerElement().getDomElement();

if(bj){return bj.offsetWidth>0;
}var bi=this;

do{if(!bi.isVisible()){return false;
}
if(bi.isRootWidget()){return true;
}bi=bi.getLayoutParent();
}while(bi);
return false;
},_createContainerElement:function(){var fS=new qx.html.Element(df);
{};
fS.setStyles({"position":dh,"zIndex":0});
fS.setAttribute(cN,this.toHashCode());
{};
return fS;
},__eg:function(){var gK=this._createContentElement();
{};
gK.setStyles({"position":dh,"zIndex":10});
return gK;
},_createContentElement:function(){var f=new qx.html.Element(df);
f.setStyles({"overflowX":cC,"overflowY":cC});
return f;
},getContainerElement:function(){return this.__dS;
},getContentElement:function(){return this.__dT;
},getDecoratorElement:function(){return this.__dW;
},__eh:null,getLayoutChildren:function(){var u=this.__eh;

if(!u){return this.__ei;
}var v;

for(var i=0,l=u.length;i<l;i++){var t=u[i];

if(t.hasUserBounds()||t.isExcluded()){if(v==null){v=u.concat();
}qx.lang.Array.remove(v,t);
}}return v||u;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutChildren:function(){var fG=this.__ec;

if(fG){fG.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},hasLayoutChildren:function(){var fL=this.__eh;

if(!fL){return false;
}var fM;

for(var i=0,l=fL.length;i<l;i++){fM=fL[i];

if(!fM.hasUserBounds()&&!fM.isExcluded()){return true;
}}return false;
},getChildrenContainer:function(){return this;
},__ei:[],_getChildren:function(){return this.__eh||this.__ei;
},_indexOf:function(fu){var fv=this.__eh;

if(!fv){return -1;
}return fv.indexOf(fu);
},_hasChildren:function(){var dM=this.__eh;
return dM!=null&&(!!dM[0]);
},addChildrenToQueue:function(ba){var bb=this.__eh;

if(!bb){return;
}var bc;

for(var i=0,l=bb.length;i<l;i++){bc=bb[i];
ba[bc.$$hash]=bc;
bc.addChildrenToQueue(ba);
}},_add:function(fn,fo){if(fn.getLayoutParent()==this){qx.lang.Array.remove(this.__eh,fn);
}
if(this.__eh){this.__eh.push(fn);
}else{this.__eh=[fn];
}this.__ej(fn,fo);
},_addAt:function(en,eo,ep){if(!this.__eh){this.__eh=[];
}if(en.getLayoutParent()==this){qx.lang.Array.remove(this.__eh,en);
}var eq=this.__eh[eo];

if(eq===en){return en.setLayoutProperties(ep);
}
if(eq){qx.lang.Array.insertBefore(this.__eh,en,eq);
}else{this.__eh.push(en);
}this.__ej(en,ep);
},_addBefore:function(fH,fI,fJ){{};

if(fH==fI){return;
}
if(!this.__eh){this.__eh=[];
}if(fH.getLayoutParent()==this){qx.lang.Array.remove(this.__eh,fH);
}qx.lang.Array.insertBefore(this.__eh,fH,fI);
this.__ej(fH,fJ);
},_addAfter:function(fN,fO,fP){{};

if(fN==fO){return;
}
if(!this.__eh){this.__eh=[];
}if(fN.getLayoutParent()==this){qx.lang.Array.remove(this.__eh,fN);
}qx.lang.Array.insertAfter(this.__eh,fN,fO);
this.__ej(fN,fP);
},_remove:function(fK){if(!this.__eh){throw new Error("This widget has no children!");
}qx.lang.Array.remove(this.__eh,fK);
this.__ek(fK);
},_removeAt:function(bk){if(!this.__eh){throw new Error("This widget has no children!");
}var bl=this.__eh[bk];
qx.lang.Array.removeAt(this.__eh,bk);
this.__ek(bl);
return bl;
},_removeAll:function(){if(!this.__eh){return;
}var K=this.__eh.concat();
this.__eh.length=0;

for(var i=K.length-1;i>=0;i--){this.__ek(K[i]);
}qx.ui.core.queue.Layout.add(this);
},_afterAddChild:null,_afterRemoveChild:null,__ej:function(dX,dY){{};
var parent=dX.getLayoutParent();

if(parent&&parent!=this){parent._remove(dX);
}dX.setLayoutParent(this);
if(dY){dX.setLayoutProperties(dY);
}else{this.updateLayoutProperties();
}if(this._afterAddChild){this._afterAddChild(dX);
}},__ek:function(g){{};

if(g.getLayoutParent()!==this){throw new Error("Remove Error: "+g+" is not a child of this widget!");
}g.setLayoutParent(null);
if(this.__ec){this.__ec.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
if(this._afterRemoveChild){this._afterRemoveChild(g);
}},capture:function(O){this.getContainerElement().capture(O);
},releaseCapture:function(){this.getContainerElement().releaseCapture();
},_applyPadding:function(dN,dO,name){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
},_createProtectorElement:function(){if(this.__dY){return;
}var gL=this.__dY=new qx.html.Element;
{};
gL.setStyles({position:dh,top:0,left:0,zIndex:7});
var gM=this.getBounds();

if(gM){this.__dY.setStyles({width:gM.width+db,height:gM.height+db});
}if(qx.core.Variant.isSet(dg,cv)){gL.setStyles({backgroundImage:bx+qx.util.ResourceManager.getInstance().toUri(cF)+bw,backgroundRepeat:dv});
}this.getContainerElement().add(gL);
},_applyDecorator:function(fY,ga){{};
var ge=qx.ui.core.Widget.__dU;
var gc=this.getContainerElement();
if(!this.__dY){this._createProtectorElement();
}if(ga){gc.remove(this.__dW);
ge.poolDecorator(this.__dW);
}if(fY){var gd=this.__dW=ge.getDecoratorElement(fY);
gd.setStyle(cO,5);
var gb=this.getBackgroundColor();
gd.tint(gb);
gc.add(gd);
}else{delete this.__dW;
this._applyBackgroundColor(this.getBackgroundColor());
}if(fY&&!ga&&gb){this.getContainerElement().setStyle(cy,null);
}if(this.__ee(ga,fY)){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
}else if(fY){var gf=this.getBounds();

if(gf){gd.resize(gf.width,gf.height);
this.__dY.setStyles({width:gf.width+db,height:gf.height+db});
}}},_applyShadow:function(gP,gQ){var gX=qx.ui.core.Widget.__dV;
var gS=this.getContainerElement();
if(gQ){gS.remove(this.__dX);
gX.poolDecorator(this.__dX);
}if(gP){var gU=this.__dX=gX.getDecoratorElement(gP);
gS.add(gU);
var gW=gU.getInsets();
gU.setStyles({left:(-gW.left)+db,top:(-gW.top)+db});
var gV=this.getBounds();

if(gV){var gT=gV.width+gW.left+gW.right;
var gR=gV.height+gW.top+gW.bottom;
gU.resize(gT,gR);
}gU.tint(null);
}else{delete this.__dX;
}},_applyToolTipText:function(q,r){if(qx.core.Variant.isSet(dl,cU)){if(this.__eb){return;
}var s=qx.locale.Manager.getInstance();
this.__eb=s.addListener(cu,function(){if(q&&q.translate){this.setToolTipText(q.translate());
}},this);
}},_applyTextColor:function(c,d){},_applyZIndex:function(gg,gh){this.getContainerElement().setStyle(cO,gg==null?0:gg);
},_applyVisibility:function(n,o){var p=this.getContainerElement();

if(n===cW){p.show();
}else{p.hide();
}var parent=this.$$parent;

if(parent&&(o==null||n==null||o===cS||n===cS)){parent.invalidateLayoutChildren();
}qx.ui.core.queue.Visibility.add(this);
},_applyOpacity:function(dP,dQ){this.getContainerElement().setStyle(cQ,dP==1?null:dP);
if(qx.core.Variant.isSet(dg,cv)){if(!qx.Class.isSubClassOf(this.getContentElement().constructor,qx.html.Image)){var dR=(dP==1||dP==null)?null:0.99;
this.getContentElement().setStyle(cQ,dR);
}}},_applyCursor:function(ek,em){if(ek==null&&!this.isSelectable()){ek=cP;
}this.getContainerElement().setStyle(ch,ek,qx.bom.client.Engine.OPERA);
},_applyBackgroundColor:function(dC,dD){var dE=this.getBackgroundColor();
var dG=this.getContainerElement();

if(this.__dW){this.__dW.tint(dE);
dG.setStyle(cy,null);
}else{var dF=qx.theme.manager.Color.getInstance().resolve(dE);
dG.setStyle(cy,dF);
}},_applyFont:function(gu,gv){},__el:null,$$stateChanges:null,_forwardStates:null,hasState:function(gi){var gj=this.__el;
return gj&&gj[gi];
},addState:function(fi){var fj=this.__el;

if(!fj){fj=this.__el={};
}
if(fj[fi]){return;
}this.__el[fi]=true;
if(fi===di){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var fm=this.__eo;

if(forward&&forward[fi]&&fm){var fk;

for(var fl in fm){fk=fm[fl];

if(fk instanceof qx.ui.core.Widget){fm[fl].addState(fi);
}}}},removeState:function(er){var es=this.__el;

if(!es||!es[er]){return;
}delete this.__el[er];
if(er===di){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var ev=this.__eo;

if(forward&&forward[er]&&ev){for(var eu in ev){var et=ev[eu];

if(et instanceof qx.ui.core.Widget){et.removeState(er);
}}}},replaceState:function(gm,gn){var go=this.__el;

if(!go){go=this.__el={};
}
if(!go[gn]){go[gn]=true;
}
if(go[gm]){delete go[gm];
}
if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var gr=this.__eo;

if(forward&&forward[gn]&&gr){for(var gq in gr){var gp=gr[gq];

if(gp instanceof qx.ui.core.Widget){gp.replaceState(gm,gn);
}}}},__em:null,__en:null,syncAppearance:function(){var ee=this.__el;
var ed=this.__em;
var ef=qx.theme.manager.Appearance.getInstance();
var eb=qx.core.Property.$$method.setThemed;
var ej=qx.core.Property.$$method.resetThemed;
if(this.__en){delete this.__en;
if(ed){var ea=ef.styleFrom(ed,ee,null,this.getAppearance());
if(ea){ed=null;
}}}if(!ed){var ec=this;
var ei=[];

do{ei.push(ec.$$subcontrol||ec.getAppearance());
}while(ec=ec.$$subparent);
ed=this.__em=ei.reverse().join(bP).replace(/#[0-9]+/g,bO);
}var eg=ef.styleFrom(ed,ee,null,this.getAppearance());

if(eg){var eh;

if(ea){for(var eh in ea){if(eg[eh]===undefined){this[ej[eh]]();
}}}{};
for(var eh in eg){eg[eh]===undefined?this[ej[eh]]():this[eb[eh]](eg[eh]);
}}else if(ea){for(var eh in ea){this[ej[eh]]();
}}this.fireDataEvent(bV,this.__el);
},_applyAppearance:function(gs,gt){this.updateAppearance();
},checkAppearanceNeeds:function(){if(!this.__ea){qx.ui.core.queue.Appearance.add(this);
this.__ea=true;
}else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);
delete this.$$stateChanges;
}},updateAppearance:function(){this.__en=true;
qx.ui.core.queue.Appearance.add(this);
var hb=this.__eo;

if(hb){var gY;

for(var ha in hb){gY=hb[ha];

if(gY instanceof qx.ui.core.Widget){gY.updateAppearance();
}}}},syncWidget:function(){},getEventTarget:function(){var eK=this;

while(eK.getAnonymous()){eK=eK.getLayoutParent();

if(!eK){return null;
}}return eK;
},getFocusTarget:function(){var eY=this;

if(!eY.getEnabled()){return null;
}
while(eY.getAnonymous()||!eY.getFocusable()){eY=eY.getLayoutParent();

if(!eY||!eY.getEnabled()){return null;
}}return eY;
},getFocusElement:function(){return this.getContainerElement();
},isTabable:function(){return this.getContainerElement().getDomElement()&&this.isFocusable();
},_applyFocusable:function(fy,fz){var fA=this.getFocusElement();
if(fy){var fB=this.getTabIndex();

if(fB==null){fB=1;
}fA.setAttribute(cz,fB);
if(qx.core.Variant.isSet(dg,cv)){fA.setAttribute(bE,bL);
}else{fA.setStyle(by,bz);
}}else{if(fA.isNativelyFocusable()){fA.setAttribute(cz,-1);
}else if(fz){fA.setAttribute(cz,null);
}}},_applyKeepFocus:function(dV){var dW=this.getFocusElement();
dW.setAttribute(cG,dV?cU:null);
},_applyKeepActive:function(gN){var gO=this.getContainerElement();
gO.setAttribute(cq,gN?cU:null);
},_applyTabIndex:function(ft){if(ft==null){ft=1;
}else if(ft<1||ft>32000){throw new Error("TabIndex property must be between 1 and 32000");
}
if(this.getFocusable()&&ft!=null){this.getFocusElement().setAttribute(cz,ft);
}},_applySelectable:function(bh){this._applyCursor(this.getCursor());
this.getContainerElement().setSelectable(bh);
this.getContentElement().setSelectable(bh);
},_applyEnabled:function(fC,fD){if(fC===false){this.addState(dc);
this.removeState(di);
if(this.isFocusable()){this.removeState(cx);
this._applyFocusable(false,true);
}if(this.isDraggable()){this._applyDraggable(false,true);
}if(this.isDroppable()){this._applyDroppable(false,true);
}}else{this.removeState(dc);
if(this.isFocusable()){this._applyFocusable(true,false);
}if(this.isDraggable()){this._applyDraggable(true,false);
}if(this.isDroppable()){this._applyDroppable(true,false);
}}},_applyNativeContextMenu:function(P,Q,name){},_applyContextMenu:function(gI,gJ){if(gJ){gJ.removeState(cB);

if(gJ.getOpener()==this){gJ.resetOpener();
}
if(!gI){this.removeListener(cB,this._onContextMenuOpen);
gJ.removeListener(cw,this._onBeforeContextMenuOpen,this);
}}
if(gI){gI.setOpener(this);
gI.addState(cB);

if(!gJ){this.addListener(cB,this._onContextMenuOpen);
gI.addListener(cw,this._onBeforeContextMenuOpen,this);
}}},_onContextMenuOpen:function(e){this.getContextMenu().openAtMouse(e);
e.stop();
},_onBeforeContextMenuOpen:function(e){if(e.getData()==cW&&this.hasListener(bm)){this.fireDataEvent(bm,e);
}},_onStopEvent:function(e){e.stopPropagation();
},_applyDraggable:function(I,J){if(!this.isEnabled()&&I===true){I=false;
}qx.ui.core.DragDropCursor.getInstance();
if(I){this.addListener(dk,this._onDragStart);
this.addListener(de,this._onDrag);
this.addListener(cJ,this._onDragEnd);
this.addListener(cK,this._onDragChange);
}else{this.removeListener(dk,this._onDragStart);
this.removeListener(de,this._onDrag);
this.removeListener(cJ,this._onDragEnd);
this.removeListener(cK,this._onDragChange);
}this.getContainerElement().setAttribute(bU,I?cU:null);
},_applyDroppable:function(z,A){if(!this.isEnabled()&&z===true){z=false;
}this.getContainerElement().setAttribute(ci,z?cU:null);
},_onDragStart:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
this.getApplicationRoot().setGlobalCursor(cP);
},_onDrag:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
},_onDragEnd:function(e){qx.ui.core.DragDropCursor.getInstance().moveTo(-1000,-1000);
this.getApplicationRoot().resetGlobalCursor();
},_onDragChange:function(e){var fE=qx.ui.core.DragDropCursor.getInstance();
var fF=e.getCurrentAction();
fF?fE.setAction(fF):fE.resetAction();
},visualizeFocus:function(){this.addState(cx);
},visualizeBlur:function(){this.removeState(cx);
},scrollChildIntoView:function(T,U,V,W){this.scrollChildIntoViewX(T,U,W);
this.scrollChildIntoViewY(T,V,W);
},scrollChildIntoViewX:function(fa,fb,fc){this.getContentElement().scrollChildIntoViewX(fa.getContainerElement(),fb,fc);
},scrollChildIntoViewY:function(w,x,y){this.getContentElement().scrollChildIntoViewY(w.getContainerElement(),x,y);
},focus:function(){if(this.isFocusable()){this.getFocusElement().focus();
}else{throw new Error("Widget is not focusable!");
}},blur:function(){if(this.isFocusable()){this.getFocusElement().blur();
}else{throw new Error("Widget is not focusable!");
}},activate:function(){this.getContainerElement().activate();
},deactivate:function(){this.getContainerElement().deactivate();
},tabFocus:function(){this.getFocusElement().focus();
},hasChildControl:function(X){if(!this.__eo){return false;
}return !!this.__eo[X];
},__eo:null,_getCreatedChildControls:function(){return this.__eo;
},getChildControl:function(dS,dT){if(!this.__eo){if(dT){return null;
}this.__eo={};
}var dU=this.__eo[dS];

if(dU){return dU;
}
if(dT===true){return null;
}return this._createChildControl(dS);
},_showChildControl:function(fp){var fq=this.getChildControl(fp);
fq.show();
return fq;
},_excludeChildControl:function(fg){var fh=this.getChildControl(fg,true);

if(fh){fh.exclude();
}},_isChildControlVisible:function(fV){var fW=this.getChildControl(fV,true);

if(fW){return fW.isVisible();
}return false;
},_createChildControl:function(dH){if(!this.__eo){this.__eo={};
}else if(this.__eo[dH]){throw new Error("Child control '"+dH+"' already created!");
}var dL=dH.indexOf(ca);

if(dL==-1){var dI=this._createChildControlImpl(dH);
}else{var dI=this._createChildControlImpl(dH.substring(0,dL));
}
if(!dI){throw new Error("Unsupported control: "+dH);
}dI.$$subcontrol=dH;
dI.$$subparent=this;
var dJ=this.__el;
var forward=this._forwardStates;

if(dJ&&forward&&dI instanceof qx.ui.core.Widget){for(var dK in dJ){if(forward[dK]){dI.addState(dK);
}}}this.fireDataEvent(bv,dI);
return this.__eo[dH]=dI;
},_createChildControlImpl:function(Y){return null;
},_disposeChildControls:function(){var ez=this.__eo;

if(!ez){return;
}var ex=qx.ui.core.Widget;

for(var ey in ez){var ew=ez[ey];

if(!ex.contains(this,ew)){ew.destroy();
}else{ew.dispose();
}}delete this.__eo;
},_findTopControl:function(){var bg=this;

while(bg){if(!bg.$$subparent){return bg;
}bg=bg.$$subparent;
}return null;
},getContainerLocation:function(fd){var fe=this.getContainerElement().getDomElement();
return fe?qx.bom.element.Location.get(fe,fd):null;
},getContentLocation:function(dx){var dy=this.getContentElement().getDomElement();
return dy?qx.bom.element.Location.get(dy,dx):null;
},setDomLeft:function(fr){var fs=this.getContainerElement().getDomElement();

if(fs){fs.style.left=fr+db;
}else{throw new Error("DOM element is not yet created!");
}},setDomTop:function(fT){var fU=this.getContainerElement().getDomElement();

if(fU){fU.style.top=fT+db;
}else{throw new Error("DOM element is not yet created!");
}},setDomPosition:function(fw,top){var fx=this.getContainerElement().getDomElement();

if(fx){fx.style.left=fw+db;
fx.style.top=top+db;
}else{throw new Error("DOM element is not yet created!");
}},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
},clone:function(){var gk=arguments.callee.base.call(this);

if(this.getChildren){var gl=this.getChildren();

for(var i=0,l=gl.length;i<l;i++){gk.add(gl[i].clone());
}}return gk;
},serialize:function(){var dA=arguments.callee.base.call(this);

if(this.getChildren){var dB=this.getChildren();

if(dB.length>0){dA.children=[];

for(var i=0,l=dB.length;i<l;i++){dA.children.push(dB[i].serialize());
}}}
if(this.getLayout){var dz=this.getLayout();

if(dz){dA.layout=dz.serialize();
}}return dA;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Variant.isSet(dl,cU)){if(this.__eb){qx.locale.Manager.getInstance().removeListenerById(this.__eb);
}}this.getContainerElement().setAttribute(cN,null,true);
this._disposeChildControls();
qx.ui.core.queue.Appearance.remove(this);
qx.ui.core.queue.Layout.remove(this);
qx.ui.core.queue.Visibility.remove(this);
qx.ui.core.queue.Widget.remove(this);
}if(!qx.core.ObjectRegistry.inShutDown){var fR=qx.ui.core.Widget;
var fQ=this.getContainerElement();

if(this.__dW){fQ.remove(this.__dW);
fR.__dU.poolDecorator(this.__dW);
}
if(this.__dX){fQ.remove(this.__dX);
fR.__dU.poolDecorator(this.__dX);
}this.clearSeparators();
this.__dW=this.__dX=this.__ef=null;
}else{this._disposeArray(bo);
this._disposeObjects(cn,bu);
}this._disposeArray(bY);
this.__el=this.__eo=null;
this._disposeObjects(bs,bD,dn,dr);
}});
})();
(function(){var d="qx.event.type.Data",c="qx.ui.container.Composite",b="addChildWidget",a="removeChildWidget";
qx.Class.define(c,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MLayoutHandling],construct:function(g){arguments.callee.base.call(this);

if(g!=null){this._setLayout(g);
}},events:{addChildWidget:d,removeChildWidget:d},members:{_afterAddChild:function(f){this.fireNonBubblingEvent(b,qx.event.type.Data,[f]);
},_afterRemoveChild:function(e){this.fireNonBubblingEvent(a,qx.event.type.Data,[e]);
}},defer:function(h,i){qx.ui.core.MChildrenHandling.remap(i);
qx.ui.core.MLayoutHandling.remap(i);
}});
})();
(function(){var s="interval",r="keep-align",q="Integer",p="direct",o="best-fit",n="Boolean",m="mouse",l="bottom-left",k="disappear",j="bottom-right",H="widget",G="qx.ui.core.MPlacement",F="left-top",E="offsetRight",D="shorthand",C="offsetLeft",B="top-left",A="appear",z="offsetBottom",y="top-right",w="offsetTop",x="right-bottom",u="right-top",v="_applySmart",t="left-bottom";
qx.Mixin.define(G,{properties:{position:{check:[B,y,l,j,F,t,u,x],init:l,themeable:true},placeMethod:{check:[H,m],init:m,themeable:true},domMove:{check:n,init:false},smart:{check:n,init:true,themeable:true,apply:v},placementModeX:{check:[p,r,o],init:r,themeable:true},placementModeY:{check:[p,r,o],init:r,themeable:true},offsetLeft:{check:q,init:0,themeable:true},offsetTop:{check:q,init:0,themeable:true},offsetRight:{check:q,init:0,themeable:true},offsetBottom:{check:q,init:0,themeable:true},offset:{group:[w,E,z,C],mode:D,themeable:true}},members:{__ep:null,_applySmart:function(I,J){{};
var K=I?r:p;
this.set({placementModeX:K,placementModeY:K});
},getLayoutLocation:function(c){var f,e,g,top;
e=c.getBounds();
g=e.left;
top=e.top;
var h=e;
c=c.getLayoutParent();

while(c&&!c.isRootWidget()){e=c.getBounds();
g+=e.left;
top+=e.top;
f=c.getInsets();
g+=f.left;
top+=f.top;
c=c.getLayoutParent();
}if(c.isRootWidget()){var d=c.getContainerLocation();

if(d){g+=d.left;
top+=d.top;
}}return {left:g,top:top,right:g+h.width,bottom:top+h.height};
},moveTo:function(i,top){if(this.getDomMove()){this.setDomPosition(i,top);
}else{this.setLayoutProperties({left:i,top:top});
}},placeToWidget:function(S,T){if(T){this.__ep=qx.lang.Function.bind(this.placeToWidget,this,S,false);
qx.event.Idle.getInstance().addListener(s,this.__ep);
this.addListener(k,function(){if(this.__ep){qx.event.Idle.getInstance().removeListener(s,this.__ep);
this.__ep=null;
}},this);
}var U=S.getContainerLocation()||this.getLayoutLocation(S);
this.__er(U);
},placeToMouse:function(event){var R=event.getDocumentLeft();
var top=event.getDocumentTop();
var Q={left:R,top:top,right:R,bottom:top};
this.__er(Q);
},placeToElement:function(N,O){var location=qx.bom.element.Location.get(N);
var P={left:location.left,top:location.top,right:location.left+N.offsetWidth,bottom:location.top+N.offsetHeight};
if(O){this.__ep=qx.lang.Function.bind(this.placeToElement,this,N,false);
qx.event.Idle.getInstance().addListener(s,this.__ep);
this.addListener(k,function(){if(this.__ep){qx.event.Idle.getInstance().removeListener(s,this.__ep);
this.__ep=null;
}},this);
}this.__er(P);
},placeToPoint:function(a){var b={left:a.left,top:a.top,right:a.left,bottom:a.top};
this.__er(b);
},_getPlacementOffsets:function(){return {left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};
},__eq:function(V){var W=null;

if(this._computePlacementSize){var W=this._computePlacementSize();
}else if(this.isVisible()){var W=this.getBounds();
}
if(W==null){this.addListenerOnce(A,function(){this.__eq(V);
},this);
}else{V.call(this,W);
}},__er:function(X){this.__eq(function(L){var M=qx.util.placement.Placement.compute(L,this.getLayoutParent().getBounds(),X,this._getPlacementOffsets(),this.getPosition(),this.getPlacementModeX(),this.getPlacementModeY());
this.moveTo(M.left,M.top);
});
}},destruct:function(){if(this.__ep){qx.event.Idle.getInstance().removeListener(s,this.__ep);
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
(function(){var t="atom",s="Integer",r="String",q="_applyRich",p="qx.ui.tooltip.ToolTip",o="_applyIcon",n="tooltip",m="qx.ui.core.Widget",l="mouseover",k="Boolean",j="_applyLabel";
qx.Class.define(p,{extend:qx.ui.popup.Popup,construct:function(d,f){arguments.callee.base.call(this);
this.setLayout(new qx.ui.layout.Grow);
this._createChildControl(t);
if(d!=null){this.setLabel(d);
}
if(f!=null){this.setIcon(f);
}this.addListener(l,this._onMouseOver,this);
},properties:{appearance:{refine:true,init:n},showTimeout:{check:s,init:700,themeable:true},hideTimeout:{check:s,init:4000,themeable:true},label:{check:r,nullable:true,apply:j},icon:{check:r,nullable:true,apply:o,themeable:true},rich:{check:k,init:false,apply:q},opener:{check:m,nullable:true}},members:{_createChildControlImpl:function(u){var v;

switch(u){case t:v=new qx.ui.basic.Atom;
this._add(v);
break;
}return v||arguments.callee.base.call(this,u);
},_onMouseOver:function(e){this.hide();
},_applyIcon:function(a,b){var c=this.getChildControl(t);
a==null?c.resetIcon:c.setIcon(a);
},_applyLabel:function(w,x){var y=this.getChildControl(t);
w==null?y.resetLabel():y.setLabel(w);
},_applyRich:function(g,h){var i=this.getChildControl(t);
i.setRich(g);
}}});
})();
(function(){var q="qx.ui.core.queue.Layout",p="layout";
qx.Class.define(q,{statics:{__es:{},remove:function(o){delete this.__es[o.$$hash];
},add:function(j){this.__es[j.$$hash]=j;
qx.ui.core.queue.Manager.scheduleFlush(p);
},flush:function(){var k=this.__ev();
for(var i=k.length-1;i>=0;i--){var l=k[i];
if(l.hasValidLayout()){continue;
}if(l.isRootWidget()&&!l.hasUserBounds()){var n=l.getSizeHint();
l.renderLayout(0,0,n.width,n.height);
}else{var m=l.getBounds();
l.renderLayout(m.left,m.top,m.width,m.height);
}}},getNestingLevel:function(r){var s=this.__eu;
var u=0;
var parent=r;
while(true){if(s[parent.$$hash]!=null){u+=s[parent.$$hash];
break;
}
if(!parent.$$parent){break;
}parent=parent.$$parent;
u+=1;
}var t=u;

while(r&&r!==parent){s[r.$$hash]=t--;
r=r.$$parent;
}return u;
},__et:function(){var A=qx.ui.core.queue.Visibility;
this.__eu={};
var z=[];
var y=this.__es;
var v,x;

for(var w in y){v=y[w];

if(A.isVisible(v)){x=this.getNestingLevel(v);
if(!z[x]){z[x]={};
}z[x][w]=v;
delete y[w];
}}return z;
},__ev:function(){var d=[];
var f=this.__et();

for(var c=f.length-1;c>=0;c--){if(!f[c]){continue;
}
for(var b in f[c]){var a=f[c][b];
if(c==0||a.isRootWidget()||a.hasUserBounds()){d.push(a);
a.invalidateLayoutCache();
continue;
}var h=a.getSizeHint(false);

if(h){a.invalidateLayoutCache();
var e=a.getSizeHint();
var g=(!a.getBounds()||h.minWidth!==e.minWidth||h.width!==e.width||h.maxWidth!==e.maxWidth||h.minHeight!==e.minHeight||h.height!==e.height||h.maxHeight!==e.maxHeight);
}else{g=true;
}
if(g){var parent=a.getLayoutParent();

if(!f[c-1]){f[c-1]={};
}f[c-1][parent.$$hash]=parent;
}else{d.push(a);
}}}return d;
}}});
})();
(function(){var d="qx.event.handler.UserAction";
qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(i){arguments.callee.base.call(this);
this.__ew=i;
this.__ex=i.getWindow();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__ew:null,__ex:null,canHandleEvent:function(j,k){},registerEvent:function(a,b,c){},unregisterEvent:function(e,f,g){}},destruct:function(){this.__ew=this.__ex=null;
},defer:function(h){qx.event.Registration.addHandler(h);
}});
})();
(function(){var d="qx.util.DeferredCallManager",c="singleton";
qx.Class.define(d,{extend:qx.core.Object,type:c,construct:function(){this.__ey={};
this.__ez=qx.lang.Function.bind(this.__eD,this);
this.__eA=false;
},members:{__eB:null,__eC:null,__ey:null,__eA:null,__ez:null,schedule:function(e){if(this.__eB==null){this.__eB=window.setTimeout(this.__ez,0);
}var f=e.toHashCode();
if(this.__eC&&this.__eC[f]){return;
}this.__ey[f]=e;
this.__eA=true;
},cancel:function(g){var h=g.toHashCode();
if(this.__eC&&this.__eC[h]){this.__eC[h]=null;
return;
}delete this.__ey[h];
if(qx.lang.Object.isEmpty(this.__ey)&&this.__eB!=null){window.clearTimeout(this.__eB);
this.__eB=null;
}},__eD:qx.event.GlobalError.observeMethod(function(){this.__eB=null;
while(this.__eA){this.__eC=qx.lang.Object.clone(this.__ey);
this.__ey={};
this.__eA=false;

for(var b in this.__eC){var a=this.__eC[b];

if(a){this.__eC[b]=null;
a.call();
}}}this.__eC=null;
})},destruct:function(){if(this.__eB!=null){window.clearTimeout(this.__eB);
}this.__ez=this.__ey=null;
}});
})();
(function(){var a="qx.util.DeferredCall";
qx.Class.define(a,{extend:qx.core.Object,construct:function(b,c){arguments.callee.base.call(this);
this.__eE=b;
this.__eF=c||null;
this.__eG=qx.util.DeferredCallManager.getInstance();
},members:{__eE:null,__eF:null,__eG:null,cancel:function(){this.__eG.cancel(this);
},schedule:function(){this.__eG.schedule(this);
},call:function(){this.__eF?this.__eE.apply(this.__eF):this.__eE();
}},destruct:function(d,e){this.cancel();
this.__eF=this.__eE=this.__eG=null;
}});
})();
(function(){var dx="element",dw="qx.client",dv="div",du="",dt="mshtml",ds="none",dr="scroll",dq="qx.html.Element",dp="|capture|",dn="activate",dL="blur",dK="deactivate",dJ="userSelect",dI="__fe",dH="capture",dG="releaseCapture",dF="qxSelectable",dE="tabIndex",dD="off",dC="focus",dA="normal",dB="webkit",dy="|bubble|",dz="on";
qx.Class.define(dq,{extend:qx.core.Object,construct:function(I){arguments.callee.base.call(this);
this.__eH=I||dv;
},statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__eI:{},_scheduleFlush:function(da){qx.html.Element.__fq.schedule();
},_mshtmlVisibilitySort:qx.core.Variant.select(dw,{"mshtml":function(a,b){var dd=a.__eO;
var dc=b.__eO;

if(dd.contains(dc)){return 1;
}
if(dc.contains(dd)){return -1;
}return 0;
},"default":null}),flush:function(){var u;
{};
var m=this.__eJ();
var k=m.getFocus();

if(k&&this.__eN(k)){m.blur(k);
}var E=m.getActive();

if(E&&this.__eN(E)){qx.bom.Element.deactivate(E);
}var C=this.__eL();

if(C&&this.__eN(C)){qx.bom.Element.releaseCapture(C);
}var v=[];
var z=this._modified;

for(var t in z){u=z[t];
if(u.__fi()){if(u.__eO&&qx.dom.Hierarchy.isRendered(u.__eO)){v.push(u);
}else{{};
u.__fh();
}delete z[t];
}}
for(var i=0,l=v.length;i<l;i++){u=v[i];
{};
u.__fh();
}var r=this._visibility;
if(qx.core.Variant.isSet(dw,dt)){var w=[];

for(var t in r){w.push(r[t]);
}if(w.length>1){w.sort(this._mshtmlVisibilitySort);
r=this._visibility={};

for(var i=0;i<w.length;i++){u=w[i];
r[u.$$hash]=u;
}}}
for(var t in r){u=r[t];
{};
u.__eO.style.display=u.__eR?du:ds;
delete r[t];
}var scroll=this._scroll;

for(var t in scroll){u=scroll[t];
var F=u.__eO;

if(F&&F.offsetWidth){var o=true;
if(u.__eU!=null){u.__eO.scrollLeft=u.__eU;
delete u.__eU;
}if(u.__eV!=null){u.__eO.scrollTop=u.__eV;
delete u.__eV;
}var B=u.__eS;

if(B!=null){var s=B.element.getDomElement();

if(s&&s.offsetWidth){qx.bom.element.Scroll.intoViewX(s,F,B.align);
delete u.__eS;
}else{o=false;
}}var p=u.__eT;

if(p!=null){var s=p.element.getDomElement();

if(s&&s.offsetWidth){qx.bom.element.Scroll.intoViewY(s,F,p.align);
delete u.__eT;
}else{o=false;
}}if(o){delete scroll[t];
}}}var n={"releaseCapture":1,"blur":1,"deactivate":1};
for(var i=0;i<this._actions.length;i++){var D=this._actions[i];
var A=D.element.__eO;

if(!A||!n[D.type]&&!D.element.__fi()){continue;
}var q=D.args;
q.unshift(A);
qx.bom.Element[D.type].apply(qx.bom.Element,q);
}this._actions=[];
for(var t in this.__eI){var j=this.__eI[t];
var F=j.element.__eO;

if(F){qx.bom.Selection.set(F,j.start,j.end);
delete this.__eI[t];
}}qx.event.handler.Appear.refresh();
},__eJ:function(){if(!this.__eK){var dS=qx.event.Registration.getManager(window);
this.__eK=dS.getHandler(qx.event.handler.Focus);
}return this.__eK;
},__eL:function(){if(!this.__eM){var di=qx.event.Registration.getManager(window);
this.__eM=di.getDispatcher(qx.event.dispatch.MouseCapture);
}return this.__eM.getCaptureElement();
},__eN:function(X){var Y=qx.core.ObjectRegistry.fromHashCode(X.$$element);
return Y&&!Y.__fi();
}},members:{__eH:null,__eO:null,__eP:false,__eQ:true,__eR:true,__eS:null,__eT:null,__eU:null,__eV:null,__eW:null,__eX:null,__eY:null,__fa:null,__fb:null,__fc:null,__fd:null,__fe:null,__ff:null,__fg:null,_scheduleChildrenUpdate:function(){if(this.__ff){return;
}this.__ff=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(dx);
},_createDomElement:function(){return qx.bom.Element.create(this.__eH);
},__fh:function(){{};
var cS=this.__fe;

if(cS){var length=cS.length;
var cT;

for(var i=0;i<length;i++){cT=cS[i];

if(cT.__eR&&cT.__eQ&&!cT.__eO){cT.__fh();
}}}
if(!this.__eO){this.__eO=this._createDomElement();
this.__eO.$$element=this.$$hash;
this._copyData(false);

if(cS&&length>0){this._insertChildren();
}}else{this._syncData();

if(this.__ff){this._syncChildren();
}}delete this.__ff;
},_insertChildren:function(){var cw=this.__fe;
var length=cw.length;
var cy;

if(length>2){var cx=document.createDocumentFragment();

for(var i=0;i<length;i++){cy=cw[i];

if(cy.__eO&&cy.__eQ){cx.appendChild(cy.__eO);
}}this.__eO.appendChild(cx);
}else{var cx=this.__eO;

for(var i=0;i<length;i++){cy=cw[i];

if(cy.__eO&&cy.__eQ){cx.appendChild(cy.__eO);
}}}},_syncChildren:function(){var bR;
var bW=qx.core.ObjectRegistry;
var bN=this.__fe;
var bU=bN.length;
var bO;
var bS;
var bQ=this.__eO;
var bT=bQ.childNodes;
var bP=0;
var bV;
{};
for(var i=bT.length-1;i>=0;i--){bV=bT[i];
bS=bW.fromHashCode(bV.$$element);

if(!bS||!bS.__eQ||bS.__fg!==this){bQ.removeChild(bV);
{};
}}for(var i=0;i<bU;i++){bO=bN[i];
if(bO.__eQ){bS=bO.__eO;
bV=bT[bP];

if(!bS){continue;
}if(bS!=bV){if(bV){bQ.insertBefore(bS,bV);
}else{bQ.appendChild(bS);
}{};
}bP++;
}}{};
},_copyData:function(dM){var dQ=this.__eO;
var dP=this.__fb;

if(dP){var dN=qx.bom.element.Attribute;

for(var dR in dP){dN.set(dQ,dR,dP[dR]);
}}var dP=this.__fa;

if(dP){var dO=qx.bom.element.Style;

if(dM){dO.setStyles(dQ,dP);
}else{dO.setCss(dQ,dO.compile(dP));
}}var dP=this.__fc;

if(dP){for(var dR in dP){this._applyProperty(dR,dP[dR]);
}}var dP=this.__fd;

if(dP){qx.event.Registration.getManager(dQ).importListeners(dQ,dP);
delete this.__fd;
}},_syncData:function(){var cK=this.__eO;
var cJ=qx.bom.element.Attribute;
var cH=qx.bom.element.Style;
var cI=this.__eX;

if(cI){var cN=this.__fb;

if(cN){var cL;

for(var cM in cI){cL=cN[cM];

if(cL!==undefined){cJ.set(cK,cM,cL);
}else{cJ.reset(cK,cM);
}}}this.__eX=null;
}var cI=this.__eW;

if(cI){var cN=this.__fa;

if(cN){var cG={};

for(var cM in cI){cG[cM]=cN[cM];
}cH.setStyles(cK,cG);
}this.__eW=null;
}var cI=this.__eY;

if(cI){var cN=this.__fc;

if(cN){var cL;

for(var cM in cI){this._applyProperty(cM,cN[cM]);
}}this.__eY=null;
}},__fi:function(){var bi=this;
while(bi){if(bi.__eP){return true;
}
if(!bi.__eQ||!bi.__eR){return false;
}bi=bi.__fg;
}return false;
},__fj:function(g){if(g.__fg===this){throw new Error("Child is already in: "+g);
}
if(g.__eP){throw new Error("Root elements could not be inserted into other ones.");
}if(g.__fg){g.__fg.remove(g);
}g.__fg=this;
if(!this.__fe){this.__fe=[];
}if(this.__eO){this._scheduleChildrenUpdate();
}},__fk:function(cY){if(cY.__fg!==this){throw new Error("Has no child: "+cY);
}if(this.__eO){this._scheduleChildrenUpdate();
}delete cY.__fg;
},__fl:function(f){if(f.__fg!==this){throw new Error("Has no child: "+f);
}if(this.__eO){this._scheduleChildrenUpdate();
}},getChildren:function(){return this.__fe||null;
},getChild:function(bw){var bx=this.__fe;
return bx&&bx[bw]||null;
},hasChildren:function(){var dh=this.__fe;
return dh&&dh[0]!==undefined;
},indexOf:function(bj){var bk=this.__fe;
return bk?bk.indexOf(bj):-1;
},hasChild:function(de){var df=this.__fe;
return df&&df.indexOf(de)!==-1;
},add:function(dg){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++){this.__fj(arguments[i]);
}this.__fe.push.apply(this.__fe,arguments);
}else{this.__fj(dg);
this.__fe.push(dg);
}return this;
},addAt:function(bF,bG){this.__fj(bF);
qx.lang.Array.insertAt(this.__fe,bF,bG);
return this;
},remove:function(cU){var cV=this.__fe;

if(!cV){return;
}
if(arguments[1]){var cW;

for(var i=0,l=arguments.length;i<l;i++){cW=arguments[i];
this.__fk(cW);
qx.lang.Array.remove(cV,cW);
}}else{this.__fk(cU);
qx.lang.Array.remove(cV,cU);
}return this;
},removeAt:function(bX){var bY=this.__fe;

if(!bY){throw new Error("Has no children!");
}var ca=bY[bX];

if(!ca){throw new Error("Has no child at this position!");
}this.__fk(ca);
qx.lang.Array.removeAt(this.__fe,bX);
return this;
},removeAll:function(){var H=this.__fe;

if(H){for(var i=0,l=H.length;i<l;i++){this.__fk(H[i]);
}H.length=0;
}return this;
},getParent:function(){return this.__fg||null;
},insertInto:function(parent,ck){parent.__fj(this);

if(ck==null){parent.__fe.push(this);
}else{qx.lang.Array.insertAt(this.__fe,this,ck);
}return this;
},insertBefore:function(S){var parent=S.__fg;
parent.__fj(this);
qx.lang.Array.insertBefore(parent.__fe,this,S);
return this;
},insertAfter:function(cg){var parent=cg.__fg;
parent.__fj(this);
qx.lang.Array.insertAfter(parent.__fe,this,cg);
return this;
},moveTo:function(bA){var parent=this.__fg;
parent.__fl(this);
var bB=parent.__fe.indexOf(this);

if(bB===bA){throw new Error("Could not move to same index!");
}else if(bB<bA){bA--;
}qx.lang.Array.removeAt(parent.__fe,bB);
qx.lang.Array.insertAt(parent.__fe,this,bA);
return this;
},moveBefore:function(cX){var parent=this.__fg;
return this.moveTo(parent.__fe.indexOf(cX));
},moveAfter:function(cb){var parent=this.__fg;
return this.moveTo(parent.__fe.indexOf(cb)+1);
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
},setRoot:function(by){this.__eP=by;
},useMarkup:function(bD){if(this.__eO){throw new Error("Could not overwrite existing element!");
}if(qx.core.Variant.isSet(dw,dt)){var bE=document.createElement(dv);
}else{var bE=qx.html.Element.__fm;

if(!bE){bE=qx.html.Element.__fm=document.createElement(dv);
}}bE.innerHTML=bD;
this.__eO=bE.firstChild;
this.__eO.$$element=this.$$hash;
this._copyData(true);
return this.__eO;
},useElement:function(dj){if(this.__eO){throw new Error("Could not overwrite existing element!");
}this.__eO=dj;
this.__eO.$$element=this.$$hash;
this._copyData(true);
},isFocusable:function(){var cP=this.getAttribute(dE);

if(cP>=1){return true;
}var cO=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(cP>=0&&cO[this.__eH]){return true;
}return false;
},setSelectable:function(T){this.setAttribute(dF,T?dz:dD);
if(qx.core.Variant.isSet(dw,dB)){this.setStyle(dJ,T?dA:ds);
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
qx.html.Element._scheduleFlush(dx);
}if(this.__fg){this.__fg._scheduleChildrenUpdate();
}delete this.__eR;
},hide:function(){if(!this.__eR){return;
}
if(this.__eO){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(dx);
}this.__eR=false;
},isVisible:function(){return this.__eR===true;
},scrollChildIntoViewX:function(cl,cm,cn){var co=this.__eO;
var cp=cl.getDomElement();

if(cn!==false&&co&&co.offsetWidth&&cp&&cp.offsetWidth){qx.bom.element.Scroll.intoViewX(cp,co,cm);
}else{this.__eS={element:cl,align:cm};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(dx);
}delete this.__eU;
},scrollChildIntoViewY:function(bH,bI,bJ){var bK=this.__eO;
var bL=bH.getDomElement();

if(bJ!==false&&bK&&bK.offsetWidth&&bL&&bL.offsetWidth){qx.bom.element.Scroll.intoViewY(bL,bK,bI);
}else{this.__eT={element:bH,align:bI};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(dx);
}delete this.__eV;
},scrollToX:function(x,cQ){var cR=this.__eO;

if(cQ!==true&&cR&&cR.offsetWidth){cR.scrollLeft=x;
}else{this.__eU=x;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(dx);
}delete this.__eS;
},getScrollX:function(){var cv=this.__eO;

if(cv){return cv.scrollLeft;
}return this.__eU||0;
},scrollToY:function(y,c){var d=this.__eO;

if(c!==true&&d&&d.offsetWidth){d.scrollTop=y;
}else{this.__eV=y;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(dx);
}delete this.__eT;
},getScrollY:function(){var bC=this.__eO;

if(bC){return bC.scrollTop;
}return this.__eV||0;
},disableScrolling:function(){this.enableScrolling();
this.scrollToX(0);
this.scrollToY(0);
this.addListener(dr,this.__fo,this);
},enableScrolling:function(){this.removeListener(dr,this.__fo,this);
},__fn:null,__fo:function(e){if(!this.__fn){this.__fn=true;
this.__eO.scrollTop=0;
this.__eO.scrollLeft=0;
delete this.__fn;
}},getTextSelection:function(){var P=this.__eO;

if(P){return qx.bom.Selection.get(P);
}return null;
},getTextSelectionLength:function(){var bM=this.__eO;

if(bM){return qx.bom.Selection.getLength(bM);
}return null;
},setTextSelection:function(bm,bn){var bo=this.__eO;

if(bo){qx.bom.Selection.set(bo,bm,bn);
return;
}qx.html.Element.__eI[this.toHashCode()]={element:this,start:bm,end:bn};
qx.html.Element._scheduleFlush(dx);
},clearTextSelection:function(){var cc=this.__eO;

if(cc){qx.bom.Selection.clear(cc);
}delete qx.html.Element.__eI[this.toHashCode()];
},__fp:function(cd,ce){var cf=qx.html.Element._actions;
cf.push({type:cd,element:this,args:ce||[]});
qx.html.Element._scheduleFlush(dx);
},focus:function(){this.__fp(dC);
},blur:function(){this.__fp(dL);
},activate:function(){this.__fp(dn);
},deactivate:function(){this.__fp(dK);
},capture:function(bv){this.__fp(dH,[bv!==false]);
},releaseCapture:function(){this.__fp(dG);
},setStyle:function(bp,bq,br){if(!this.__fa){this.__fa={};
}
if(this.__fa[bp]==bq){return;
}
if(bq==null){delete this.__fa[bp];
}else{this.__fa[bp]=bq;
}if(this.__eO){if(br){qx.bom.element.Style.set(this.__eO,bp,bq);
return this;
}if(!this.__eW){this.__eW={};
}this.__eW[bp]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(dx);
}return this;
},setStyles:function(ba,bb){var bc=qx.bom.element.Style;

if(!this.__fa){this.__fa={};
}
if(this.__eO){if(!this.__eW){this.__eW={};
}
for(var be in ba){var bd=ba[be];

if(this.__fa[be]==bd){continue;
}
if(bd==null){delete this.__fa[be];
}else{this.__fa[be]=bd;
}if(bb){bc.setStyle(this.__eO,be,bd);
continue;
}this.__eW[be]=true;
}qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(dx);
}else{for(var be in ba){var bd=ba[be];

if(this.__fa[be]==bd){continue;
}
if(bd==null){delete this.__fa[be];
}else{this.__fa[be]=bd;
}}}return this;
},removeStyle:function(dV,dW){this.setStyle(dV,null,dW);
},getStyle:function(bs){return this.__fa?this.__fa[bs]:null;
},getAllStyles:function(){return this.__fa||null;
},setAttribute:function(dk,dl,dm){if(!this.__fb){this.__fb={};
}
if(this.__fb[dk]==dl){return;
}
if(dl==null){delete this.__fb[dk];
}else{this.__fb[dk]=dl;
}if(this.__eO){if(dm){qx.bom.element.Attribute.set(this.__eO,dk,dl);
return this;
}if(!this.__eX){this.__eX={};
}this.__eX[dk]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(dx);
}return this;
},setAttributes:function(U,V){for(var W in U){this.setAttribute(W,U[W],V);
}return this;
},removeAttribute:function(dT,dU){this.setAttribute(dT,null,dU);
},getAttribute:function(bz){return this.__fb?this.__fb[bz]:null;
},_applyProperty:function(name,bt){},_setProperty:function(ch,ci,cj){if(!this.__fc){this.__fc={};
}
if(this.__fc[ch]==ci){return;
}
if(ci==null){delete this.__fc[ch];
}else{this.__fc[ch]=ci;
}if(this.__eO){if(cj){this._applyProperty(ch,ci);
return this;
}if(!this.__eY){this.__eY={};
}this.__eY[ch]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(dx);
}return this;
},_removeProperty:function(Q,R){this._setProperty(Q,null,R);
},_getProperty:function(bf){var bg=this.__fc;

if(!bg){return null;
}var bh=bg[bf];
return bh==null?null:bh;
},addListener:function(J,K,self,L){var M;

if(this.$$disposed){return null;
}{};

if(this.__eO){return qx.event.Registration.addListener(this.__eO,J,K,self,L);
}
if(!this.__fd){this.__fd={};
}
if(L==null){L=false;
}var N=qx.event.Manager.getNextUniqueId();
var O=J+(L?dp:dy)+N;
this.__fd[O]={type:J,listener:K,self:self,capture:L,unique:N};
return O;
},removeListener:function(cz,cA,self,cB){var cC;

if(this.$$disposed){return null;
}{};

if(this.__eO){qx.event.Registration.removeListener(this.__eO,cz,cA,self,cB);
}else{var cE=this.__fd;
var cD;

if(cB==null){cB=false;
}
for(var cF in cE){cD=cE[cF];
if(cD.listener===cA&&cD.self===self&&cD.capture===cB&&cD.type===cz){delete cE[cF];
break;
}}}return this;
},removeListenerById:function(h){if(this.$$disposed){return null;
}
if(this.__eO){qx.event.Registration.removeListenerById(this.__eO,h);
}else{delete this.__fd[h];
}return this;
},hasListener:function(cq,cr){if(this.$$disposed){return false;
}
if(this.__eO){return qx.event.Registration.hasListener(this.__eO,cq,cr);
}var ct=this.__fd;
var cs;

if(cr==null){cr=false;
}
for(var cu in ct){cs=ct[cu];
if(cs.capture===cr&&cs.type===cq){return true;
}}return false;
}},defer:function(G){G.__fq=new qx.util.DeferredCall(G.flush,G);
},destruct:function(){var bu=this.__eO;

if(bu){qx.event.Registration.getManager(bu).removeAllListeners(bu);
bu.$$element=du;
}
if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__fg;

if(parent&&!parent.$$disposed){parent.remove(this);
}}this._disposeArray(dI);
this.__fb=this.__fa=this.__fd=this.__fc=this.__eX=this.__eW=this.__eY=this.__eO=this.__fg=this.__eS=this.__eT=null;
}});
})();
(function(){var b="qx.ui.core.queue.Manager",a="useraction";
qx.Class.define(b,{statics:{__fr:false,__fs:{},__ft:0,MAX_RETRIES:10,scheduleFlush:function(c){var self=qx.ui.core.queue.Manager;
self.__fs[c]=true;

if(!self.__fr){self.__fw.schedule();
self.__fr=true;
}},flush:function(){var self=qx.ui.core.queue.Manager;
if(self.__fu){return;
}self.__fu=true;
self.__fw.cancel();
var d=self.__fs;
self.__fv(function(){while(d.visibility||d.widget||d.appearance||d.layout||d.element){if(d.widget){delete d.widget;
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
}}},function(){self.__fr=false;
});
self.__fv(function(){if(d.dispose){delete d.dispose;
qx.ui.core.queue.Dispose.flush();
}},function(){self.__fu=false;
});
self.__ft=0;
},__fv:function(g,h){var self=qx.ui.core.queue.Manager;

try{g();
}catch(e){self.__fr=false;
self.__fu=false;
self.__ft+=1;

if(self.__ft<=self.MAX_RETRIES){self.scheduleFlush();
}else{throw new Error("Fatal Error: Flush terminated "+(self.__ft-1)+" times in a row"+" due to exceptions in user code. The application has to be reloaded!");
}throw e;
}finally{h();
}}},defer:function(f){f.__fw=new qx.util.DeferredCall(f.flush);
qx.html.Element._scheduleFlush=f.scheduleFlush;
qx.event.Registration.addListener(window,a,f.flush);
}});
})();
(function(){var c="abstract",b="qx.event.dispatch.AbstractBubbling";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:c,construct:function(x){this._manager=x;
},members:{_getParent:function(a){throw new Error("Missing implementation");
},canDispatchEvent:function(d,event,e){return event.getBubbles();
},dispatchEvent:function(f,event,g){var parent=f;
var r=this._manager;
var o,v;
var m;
var q,t;
var s;
var u=[];
o=r.getListeners(f,g,true);
v=r.getListeners(f,g,false);

if(o){u.push(o);
}
if(v){u.push(v);
}var parent=this._getParent(f);
var k=[];
var h=[];
var l=[];
var p=[];
while(parent!=null){o=r.getListeners(parent,g,true);

if(o){l.push(o);
p.push(parent);
}v=r.getListeners(parent,g,false);

if(v){k.push(v);
h.push(parent);
}parent=this._getParent(parent);
}event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);

for(var i=l.length-1;i>=0;i--){s=p[i];
event.setCurrentTarget(s);
m=l[i];

for(var j=0,n=m.length;j<n;j++){q=m[j];
t=q.context||s;
q.handler.call(t,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.AT_TARGET);
event.setCurrentTarget(f);

for(var i=0,w=u.length;i<w;i++){m=u[i];

for(var j=0,n=m.length;j<n;j++){q=m[j];
t=q.context||f;
q.handler.call(t,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);

for(var i=0,w=k.length;i<w;i++){s=h[i];
event.setCurrentTarget(s);
m=k[i];

for(var j=0,n=m.length;j<n;j++){q=m[j];
t=q.context||s;
q.handler.call(t,event);
}
if(event.getPropagationStopped()){return;
}}}}});
})();
(function(){var a="qx.event.dispatch.DomBubbling";
qx.Class.define(a,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(d){return d.parentNode;
},canDispatchEvent:function(b,event,c){return b.nodeType!==undefined&&event.getBubbles();
}},defer:function(e){qx.event.Registration.addDispatcher(e);
}});
})();
(function(){var o="keydown",n="keypress",m="qx.client",l="NumLock",k="keyup",j="Enter",i="0",h="9",g="-",f="PageUp",bv="+",bu="PrintScreen",bt="gecko",bs="A",br="Z",bq="Left",bp="F5",bo="Down",bn="Up",bm="F11",v="F6",w="useraction",t="F3",u="keyinput",r="Insert",s="F8",p="End",q="/",D="Delete",E="*",Q="F1",M="F4",Y="Home",T="F2",bi="F12",be="PageDown",I="F7",bl="F9",bk="F10",bj="Right",H="text",K="Escape",L="webkit",O="5",R="3",U="Meta",bb="7",bg="CapsLock",x="input",y="Control",J="Space",X="Tab",W="Shift",V="Pause",bd="Unidentified",bc="qx.event.handler.Keyboard",S="mshtml",ba="mshtml|webkit",c="6",bf="off",z="Apps",A="4",N="Alt",d="2",e="Scroll",G="1",B="8",C="Win",F="autoComplete",P=",",bh="Backspace";
qx.Class.define(bc,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(bT){arguments.callee.base.call(this);
this.__fx=bT;
this.__fy=bT.getWindow();
if(qx.core.Variant.isSet(m,bt)){this.__fz=this.__fy;
}else{this.__fz=this.__fy.document.documentElement;
}this.__fA={};
this._initKeyObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(cm){if(this._identifierToKeyCodeMap[cm]){return true;
}
if(cm.length!=1){return false;
}
if(cm>=i&&cm<=h){return true;
}
if(cm>=bs&&cm<=br){return true;
}
switch(cm){case bv:case g:case E:case q:return true;
default:return false;
}}},members:{__fB:null,__fx:null,__fy:null,__fz:null,__fA:null,__BJ:null,__fC:null,__fD:null,canHandleEvent:function(bx,by){},registerEvent:function(bP,bQ,bR){},unregisterEvent:function(bX,bY,ca){},_fireInputEvent:function(bE,bF){var bG=this.__fE();
if(bG&&bG.offsetWidth!=0){var event=qx.event.Registration.createEvent(u,qx.event.type.KeyInput,[bE,bG,bF]);
this.__fx.dispatchEvent(bG,event);
}if(this.__fy){qx.event.Registration.fireEvent(this.__fy,w,qx.event.type.Data,[u]);
}},_fireSequenceEvent:function(cC,cD,cE){var cG=this.__fE();
var event=qx.event.Registration.createEvent(cD,qx.event.type.KeySequence,[cC,cG,cE]);
this.__fx.dispatchEvent(cG,event);
if(qx.core.Variant.isSet(m,ba)){if(cD==o&&event.getDefaultPrevented()){var cF=cC.keyCode;

if(!(this._isNonPrintableKeyCode(cF)||cF==8||cF==9)){this._fireSequenceEvent(cC,n,cE);
}}}if(this.__fy){qx.event.Registration.fireEvent(this.__fy,w,qx.event.type.Data,[cD]);
}},__fE:function(){var a=this.__fx.getHandler(qx.event.handler.Focus);
var b=a.getActive();
if(!b||b.offsetWidth==0){b=a.getFocus();
}if(!b||b.offsetWidth==0){b=this.__fx.getWindow().document.body;
}return b;
},_initKeyObserver:function(){this.__fB=qx.lang.Function.listener(this.__fF,this);
this.__fD=qx.lang.Function.listener(this.__fH,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fz,k,this.__fB);
Event.addNativeListener(this.__fz,o,this.__fB);
Event.addNativeListener(this.__fz,n,this.__fD);
},_stopKeyObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fz,k,this.__fB);
Event.removeNativeListener(this.__fz,o,this.__fB);
Event.removeNativeListener(this.__fz,n,this.__fD);

for(var bW in (this.__fC||{})){var bV=this.__fC[bW];
Event.removeNativeListener(bV.target,n,bV.callback);
}delete (this.__fC);
},__fF:qx.event.GlobalError.observeMethod(qx.core.Variant.select(m,{"mshtml":function(cs){cs=window.event||cs;
var cv=cs.keyCode;
var ct=0;
var cu=cs.type;
if(!(this.__fA[cv]==o&&cu==o)){this._idealKeyHandler(cv,ct,cu,cs);
}if(cu==o){if(this._isNonPrintableKeyCode(cv)||cv==8||cv==9){this._idealKeyHandler(cv,ct,n,cs);
}}this.__fA[cv]=cu;
},"gecko":function(ch){var cl=this._keyCodeFix[ch.keyCode]||ch.keyCode;
var cj=0;
var ck=ch.type;
if(qx.bom.client.Platform.WIN){var ci=cl?this._keyCodeToIdentifier(cl):this._charCodeToIdentifier(cj);

if(!(this.__fA[ci]==o&&ck==o)){this._idealKeyHandler(cl,cj,ck,ch);
}this.__fA[ci]=ck;
}else{this._idealKeyHandler(cl,cj,ck,ch);
}this.__fG(ch.target,ck,cl);
},"webkit":function(co){var cr=0;
var cp=0;
var cq=co.type;
if(qx.bom.client.Engine.VERSION<525.13){if(cq==k||cq==o){cr=this._charCode2KeyCode[co.charCode]||co.keyCode;
}else{if(this._charCode2KeyCode[co.charCode]){cr=this._charCode2KeyCode[co.charCode];
}else{cp=co.charCode;
}}this._idealKeyHandler(cr,cp,cq,co);
}else{cr=co.keyCode;
if(!(this.__fA[cr]==o&&cq==o)){this._idealKeyHandler(cr,cp,cq,co);
}if(cq==o){if(this._isNonPrintableKeyCode(cr)||cr==8||cr==9){this._idealKeyHandler(cr,cp,n,co);
}}this.__fA[cr]=cq;
}},"opera":function(cw){this.__BJ=cw.keyCode;
this._idealKeyHandler(cw.keyCode,0,cw.type,cw);
}})),__fG:qx.core.Variant.select(m,{"gecko":function(bz,bA,bB){if(bA===o&&(bB==33||bB==34||bB==38||bB==40)&&bz.type==H&&bz.tagName.toLowerCase()===x&&bz.getAttribute(F)!==bf){if(!this.__fC){this.__fC={};
}var bD=qx.core.ObjectRegistry.toHashCode(bz);

if(this.__fC[bD]){return;
}var self=this;
this.__fC[bD]={target:bz,callback:function(bS){qx.bom.Event.stopPropagation(bS);
self.__fH(bS);
}};
var bC=qx.event.GlobalError.observeMethod(this.__fC[bD].callback);
qx.bom.Event.addNativeListener(bz,n,bC);
}},"default":null}),__fH:qx.event.GlobalError.observeMethod(qx.core.Variant.select(m,{"mshtml":function(bU){bU=window.event||bU;

if(this._charCode2KeyCode[bU.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[bU.keyCode],0,bU.type,bU);
}else{this._idealKeyHandler(0,bU.keyCode,bU.type,bU);
}},"gecko":function(bL){var bO=this._keyCodeFix[bL.keyCode]||bL.keyCode;
var bM=bL.charCode;
var bN=bL.type;
this._idealKeyHandler(bO,bM,bN,bL);
},"webkit":function(cx){if(qx.bom.client.Engine.VERSION<525.13){var cA=0;
var cy=0;
var cz=cx.type;

if(cz==k||cz==o){cA=this._charCode2KeyCode[cx.charCode]||cx.keyCode;
}else{if(this._charCode2KeyCode[cx.charCode]){cA=this._charCode2KeyCode[cx.charCode];
}else{cy=cx.charCode;
}}this._idealKeyHandler(cA,cy,cz,cx);
}else{if(this._charCode2KeyCode[cx.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[cx.keyCode],0,cx.type,cx);
}else{this._idealKeyHandler(0,cx.keyCode,cx.type,cx);
}}},"opera":function(bI){var bK=bI.keyCode;
var bJ=bI.type;
if(bK!=this.__BJ){this._idealKeyHandler(0,this.__BJ,bJ,bI);
}else{if(this._keyCodeToIdentifierMap[bI.keyCode]){this._idealKeyHandler(bI.keyCode,0,bI.type,bI);
}else{this._idealKeyHandler(0,bI.keyCode,bI.type,bI);
}}}})),_idealKeyHandler:function(cH,cI,cJ,cK){var cL;
if(cH||(!cH&&!cI)){cL=this._keyCodeToIdentifier(cH);
this._fireSequenceEvent(cK,cJ,cL);
}else{cL=this._charCodeToIdentifier(cI);
this._fireSequenceEvent(cK,n,cL);
this._fireInputEvent(cK,cI);
}},_specialCharCodeMap:{8:bh,9:X,13:j,27:K,32:J},_keyCodeToIdentifierMap:{16:W,17:y,18:N,20:bg,224:U,37:bq,38:bn,39:bj,40:bo,33:f,34:be,35:p,36:Y,45:r,46:D,112:Q,113:T,114:t,115:M,116:bp,117:v,118:I,119:s,120:bl,121:bk,122:bm,123:bi,144:l,44:bu,145:e,19:V,91:C,93:z},_numpadToCharCode:{96:i.charCodeAt(0),97:G.charCodeAt(0),98:d.charCodeAt(0),99:R.charCodeAt(0),100:A.charCodeAt(0),101:O.charCodeAt(0),102:c.charCodeAt(0),103:bb.charCodeAt(0),104:B.charCodeAt(0),105:h.charCodeAt(0),106:E.charCodeAt(0),107:bv.charCodeAt(0),109:g.charCodeAt(0),110:P.charCodeAt(0),111:q.charCodeAt(0)},_charCodeA:bs.charCodeAt(0),_charCodeZ:br.charCodeAt(0),_charCode0:i.charCodeAt(0),_charCode9:h.charCodeAt(0),_isNonPrintableKeyCode:function(bw){return this._keyCodeToIdentifierMap[bw]?true:false;
},_isIdentifiableKeyCode:function(cB){if(cB>=this._charCodeA&&cB<=this._charCodeZ){return true;
}if(cB>=this._charCode0&&cB<=this._charCode9){return true;
}if(this._specialCharCodeMap[cB]){return true;
}if(this._numpadToCharCode[cB]){return true;
}if(this._isNonPrintableKeyCode(cB)){return true;
}return false;
},_keyCodeToIdentifier:function(cf){if(this._isIdentifiableKeyCode(cf)){var cg=this._numpadToCharCode[cf];

if(cg){return String.fromCharCode(cg);
}return (this._keyCodeToIdentifierMap[cf]||this._specialCharCodeMap[cf]||String.fromCharCode(cf));
}else{return bd;
}},_charCodeToIdentifier:function(bH){return this._specialCharCodeMap[bH]||String.fromCharCode(bH).toUpperCase();
},_identifierToKeyCode:function(cn){return qx.event.handler.Keyboard._identifierToKeyCodeMap[cn]||cn.charCodeAt(0);
}},destruct:function(){this._stopKeyObserver();
this.__BJ=this.__fx=this.__fy=this.__fz=this.__fA=null;
},defer:function(cb,cc,cd){qx.event.Registration.addHandler(cb);
if(!cb._identifierToKeyCodeMap){cb._identifierToKeyCodeMap={};

for(var ce in cc._keyCodeToIdentifierMap){cb._identifierToKeyCodeMap[cc._keyCodeToIdentifierMap[ce]]=parseInt(ce,10);
}
for(var ce in cc._specialCharCodeMap){cb._identifierToKeyCodeMap[cc._specialCharCodeMap[ce]]=parseInt(ce,10);
}}
if(qx.core.Variant.isSet(m,S)){cc._charCode2KeyCode={13:13,27:27};
}else if(qx.core.Variant.isSet(m,bt)){cc._keyCodeFix={12:cc._identifierToKeyCode(l)};
}else if(qx.core.Variant.isSet(m,L)){if(qx.bom.client.Engine.VERSION<525.13){cc._charCode2KeyCode={63289:cc._identifierToKeyCode(l),63276:cc._identifierToKeyCode(f),63277:cc._identifierToKeyCode(be),63275:cc._identifierToKeyCode(p),63273:cc._identifierToKeyCode(Y),63234:cc._identifierToKeyCode(bq),63232:cc._identifierToKeyCode(bn),63235:cc._identifierToKeyCode(bj),63233:cc._identifierToKeyCode(bo),63272:cc._identifierToKeyCode(D),63302:cc._identifierToKeyCode(r),63236:cc._identifierToKeyCode(Q),63237:cc._identifierToKeyCode(T),63238:cc._identifierToKeyCode(t),63239:cc._identifierToKeyCode(M),63240:cc._identifierToKeyCode(bp),63241:cc._identifierToKeyCode(v),63242:cc._identifierToKeyCode(I),63243:cc._identifierToKeyCode(s),63244:cc._identifierToKeyCode(bl),63245:cc._identifierToKeyCode(bk),63246:cc._identifierToKeyCode(bm),63247:cc._identifierToKeyCode(bi),63248:cc._identifierToKeyCode(bu),3:cc._identifierToKeyCode(j),12:cc._identifierToKeyCode(l),13:cc._identifierToKeyCode(j)};
}else{cc._charCode2KeyCode={13:13,27:27};
}}}});
})();
(function(){var u="qx.client",t="mouseup",s="click",r="mousedown",q="contextmenu",p="dblclick",o="mousewheel",n="mouseover",m="mouseout",l="DOMMouseScroll",h="mousemove",k="on",j="mshtml|webkit|opera",g="useraction",f="gecko|webkit",i="qx.event.handler.Mouse";
qx.Class.define(i,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(D){arguments.callee.base.call(this);
this.__fI=D;
this.__fJ=D.getWindow();
this.__fK=this.__fJ.document;
this._initButtonObserver();
this._initMoveObserver();
this._initWheelObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__fL:null,__fM:null,__fN:null,__fO:null,__fP:null,__fI:null,__fJ:null,__fK:null,canHandleEvent:function(Q,R){},registerEvent:qx.bom.client.System.IPHONE?
function(A,B,C){A[k+B]=qx.lang.Function.returnNull;
}:qx.lang.Function.returnNull,unregisterEvent:qx.bom.client.System.IPHONE?
function(c,d,e){c[k+d]=undefined;
}:qx.lang.Function.returnNull,__fQ:function(T,U,V){if(!V){V=T.target||T.srcElement;
}if(V&&V.nodeType){qx.event.Registration.fireEvent(V,U||T.type,qx.event.type.Mouse,[T,V,null,true,true]);
}qx.event.Registration.fireEvent(this.__fJ,g,qx.event.type.Data,[U||T.type]);
},_initButtonObserver:function(){this.__fL=qx.lang.Function.listener(this._onButtonEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fK,r,this.__fL);
Event.addNativeListener(this.__fK,t,this.__fL);
Event.addNativeListener(this.__fK,s,this.__fL);
Event.addNativeListener(this.__fK,p,this.__fL);
Event.addNativeListener(this.__fK,q,this.__fL);
},_initMoveObserver:function(){this.__fM=qx.lang.Function.listener(this._onMoveEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fK,h,this.__fM);
Event.addNativeListener(this.__fK,n,this.__fM);
Event.addNativeListener(this.__fK,m,this.__fM);
},_initWheelObserver:function(){this.__fN=qx.lang.Function.listener(this._onWheelEvent,this);
var Event=qx.bom.Event;
var a=qx.core.Variant.isSet(u,j)?o:l;
Event.addNativeListener(this.__fK,a,this.__fN);
},_stopButtonObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fK,r,this.__fL);
Event.removeNativeListener(this.__fK,t,this.__fL);
Event.removeNativeListener(this.__fK,s,this.__fL);
Event.removeNativeListener(this.__fK,p,this.__fL);
Event.removeNativeListener(this.__fK,q,this.__fL);
},_stopMoveObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fK,h,this.__fM);
Event.removeNativeListener(this.__fK,n,this.__fM);
Event.removeNativeListener(this.__fK,m,this.__fM);
},_stopWheelObserver:function(){var Event=qx.bom.Event;
var S=qx.core.Variant.isSet(u,j)?o:l;
Event.removeNativeListener(this.__fK,S,this.__fN);
},_onMoveEvent:qx.event.GlobalError.observeMethod(function(W){this.__fQ(W);
}),_onButtonEvent:qx.event.GlobalError.observeMethod(function(K){var L=K.type;
var M=K.target||K.srcElement;
if(qx.core.Variant.isSet(u,f)){if(M&&M.nodeType==3){M=M.parentNode;
}}
if(this.__fR){this.__fR(K,L,M);
}
if(this.__fT){this.__fT(K,L,M);
}this.__fQ(K,L,M);

if(this.__fS){this.__fS(K,L,M);
}
if(this.__fU){this.__fU(K,L,M);
}this.__fO=L;
}),_onWheelEvent:qx.event.GlobalError.observeMethod(function(b){this.__fQ(b,o);
}),__fR:qx.core.Variant.select(u,{"webkit":function(E,F,G){if(qx.bom.client.Engine.VERSION<530){if(F==q){this.__fQ(E,t,G);
}}},"default":null}),__fS:qx.core.Variant.select(u,{"opera":function(N,O,P){if(O==t&&N.button==2){this.__fQ(N,q,P);
}},"default":null}),__fT:qx.core.Variant.select(u,{"mshtml":function(H,I,J){if(I==t&&this.__fO==s){this.__fQ(H,r,J);
}else if(I==p){this.__fQ(H,s,J);
}},"default":null}),__fU:qx.core.Variant.select(u,{"mshtml":null,"default":function(w,x,y){switch(x){case r:this.__fP=y;
break;
case t:if(y!==this.__fP){var z=qx.dom.Hierarchy.getCommonParent(y,this.__fP);
this.__fQ(w,s,z);
}}}})},destruct:function(){this._stopButtonObserver();
this._stopMoveObserver();
this._stopWheelObserver();
this.__fI=this.__fJ=this.__fK=this.__fP=null;
},defer:function(v){qx.event.Registration.addHandler(v);
}});
})();
(function(){var a="qx.event.handler.Capture";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(i,j){},registerEvent:function(c,d,e){},unregisterEvent:function(f,g,h){}},defer:function(b){qx.event.Registration.addHandler(b);
}});
})();
(function(){var V="alias",U="copy",T="blur",S="mouseout",R="keydown",Q="Ctrl",P="Shift",O="mousemove",N="move",M="mouseover",bm="Alt",bl="keyup",bk="mouseup",bj="dragend",bi="on",bh="mousedown",bg="qxDraggable",bf="drag",be="drop",bd="qxDroppable",bb="qx.event.handler.DragDrop",bc="droprequest",Y="dragstart",ba="dragchange",W="dragleave",X="dragover";
qx.Class.define(bb,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(I){arguments.callee.base.call(this);
this.__fV=I;
this.__fW=I.getWindow().document.documentElement;
this.__fV.addListener(this.__fW,bh,this._onMouseDown,this);
this.__gj();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__fV:null,__fW:null,__fX:null,__fY:null,__ga:null,__gb:null,__gc:null,__gd:null,__ge:null,__gf:null,__gg:false,__gh:0,__gi:0,canHandleEvent:function(f,g){},registerEvent:function(a,b,c){},unregisterEvent:function(h,i,j){},addType:function(z){this.__ga[z]=true;
},addAction:function(d){this.__gb[d]=true;
},supportsType:function(x){return !!this.__ga[x];
},supportsAction:function(L){return !!this.__gb[L];
},getData:function(k){if(!this.__gq||!this.__fX){throw new Error("This method must not be used outside the drop event listener!");
}
if(!this.__ga[k]){throw new Error("Unsupported data type: "+k+"!");
}
if(!this.__gd[k]){this.__ge=k;
this.__gl(bc,this.__fY,this.__fX,false);
}
if(!this.__gd[k]){throw new Error("Please use a droprequest listener to the drag source to fill the manager with data!");
}return this.__gd[k]||null;
},getCurrentAction:function(){return this.__gf;
},addData:function(C,D){this.__gd[C]=D;
},getCurrentType:function(){return this.__ge;
},__gj:function(){this.__ga={};
this.__gb={};
this.__gc={};
this.__gd={};
},__gk:function(){var o=this.__gb;
var m=this.__gc;
var n=null;

if(this.__gq){if(m.Shift&&m.Ctrl&&o.alias){n=V;
}else if(m.Shift&&m.Alt&&o.copy){n=U;
}else if(m.Shift&&o.move){n=N;
}else if(m.Alt&&o.alias){n=V;
}else if(m.Ctrl&&o.copy){n=U;
}else if(o.move){n=N;
}else if(o.copy){n=U;
}else if(o.alias){n=V;
}}
if(n!=this.__gf){this.__gf=n;
this.__gl(ba,this.__fY,this.__fX,false);
}},__gl:function(p,q,r,s,t){var v=qx.event.Registration;
var u=v.createEvent(p,qx.event.type.Drag,[s,t]);

if(q!==r){u.setRelatedTarget(r);
}return v.dispatchEvent(q,u);
},__gm:function(l){while(l&&l.nodeType==1){if(l.getAttribute(bg)==bi){return l;
}l=l.parentNode;
}return null;
},__gn:function(B){while(B&&B.nodeType==1){if(B.getAttribute(bd)==bi){return B;
}B=B.parentNode;
}return null;
},__go:function(){this.__fY=null;
this.__fV.removeListener(this.__fW,O,this._onMouseMove,this,true);
this.__fV.removeListener(this.__fW,bk,this._onMouseUp,this,true);
qx.event.Registration.removeListener(window,T,this._onWindowBlur,this);
this.__gj();
},__gp:function(){if(this.__gg){this.__fV.removeListener(this.__fW,M,this._onMouseOver,this,true);
this.__fV.removeListener(this.__fW,S,this._onMouseOut,this,true);
this.__fV.removeListener(this.__fW,R,this._onKeyDown,this,true);
this.__fV.removeListener(this.__fW,bl,this._onKeyUp,this,true);
this.__gl(bj,this.__fY,this.__fX,false);
this.__gg=false;
}this.__gq=false;
this.__fX=null;
this.__go();
},__gq:false,_onWindowBlur:function(e){this.__gp();
},_onKeyDown:function(e){var y=e.getKeyIdentifier();

switch(y){case bm:case Q:case P:if(!this.__gc[y]){this.__gc[y]=true;
this.__gk();
}}},_onKeyUp:function(e){var A=e.getKeyIdentifier();

switch(A){case bm:case Q:case P:if(this.__gc[A]){this.__gc[A]=false;
this.__gk();
}}},_onMouseDown:function(e){if(this.__gg){return;
}var G=this.__gm(e.getTarget());

if(G){this.__gh=e.getDocumentLeft();
this.__gi=e.getDocumentTop();
this.__fY=G;
this.__fV.addListener(this.__fW,O,this._onMouseMove,this,true);
this.__fV.addListener(this.__fW,bk,this._onMouseUp,this,true);
qx.event.Registration.addListener(window,T,this._onWindowBlur,this);
}},_onMouseUp:function(e){if(this.__gq){this.__gl(be,this.__fX,this.__fY,false,e);
}if(this.__gg){e.stopPropagation();
}this.__gp();
},_onMouseMove:function(e){if(this.__gg){if(!this.__gl(bf,this.__fY,this.__fX,true,e)){this.__gp();
}}else{if(Math.abs(e.getDocumentLeft()-this.__gh)>3||Math.abs(e.getDocumentTop()-this.__gi)>3){if(this.__gl(Y,this.__fY,this.__fX,true,e)){this.__gg=true;
this.__fV.addListener(this.__fW,M,this._onMouseOver,this,true);
this.__fV.addListener(this.__fW,S,this._onMouseOut,this,true);
this.__fV.addListener(this.__fW,R,this._onKeyDown,this,true);
this.__fV.addListener(this.__fW,bl,this._onKeyUp,this,true);
var H=this.__gc;
H.Ctrl=e.isCtrlPressed();
H.Shift=e.isShiftPressed();
H.Alt=e.isAltPressed();
this.__gk();
}else{this.__gl(bj,this.__fY,this.__fX,false);
this.__go();
}}}},_onMouseOver:function(e){var E=e.getTarget();
var F=this.__gn(E);

if(F&&F!=this.__fX){this.__gq=this.__gl(X,F,this.__fY,true,e);
this.__fX=F;
this.__gk();
}},_onMouseOut:function(e){var K=this.__gn(e.getTarget());
var J=this.__gn(e.getRelatedTarget());

if(K&&K!==J&&K==this.__fX){this.__gl(W,this.__fX,J,false,e);
this.__fX=null;
this.__gq=false;
qx.event.Timer.once(this.__gk,this,0);
}}},destruct:function(){this.__fY=this.__fX=this.__fV=this.__fW=this.__ga=this.__gb=this.__gc=this.__gd=null;
},defer:function(w){qx.event.Registration.addHandler(w);
}});
})();
(function(){var e="-",d="qx.event.handler.Element";
qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(z){arguments.callee.base.call(this);
this._manager=z;
this._registeredEvents={};
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,scroll:true,select:true,reset:true,submit:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(b,c){},registerEvent:function(p,q,r){var u=qx.core.ObjectRegistry.toHashCode(p);
var s=u+e+q;
var t=qx.lang.Function.listener(this._onNative,this,s);
qx.bom.Event.addNativeListener(p,q,t);
this._registeredEvents[s]={element:p,type:q,listener:t};
},unregisterEvent:function(f,g,h){var k=this._registeredEvents;

if(!k){return;
}var l=qx.core.ObjectRegistry.toHashCode(f);
var i=l+e+g;
var j=this._registeredEvents[i];
qx.bom.Event.removeNativeListener(f,g,j.listener);
delete this._registeredEvents[i];
},_onNative:qx.event.GlobalError.observeMethod(function(v,w){var y=this._registeredEvents;

if(!y){return;
}var x=y[w];
qx.event.Registration.fireNonBubblingEvent(x.element,x.type,qx.event.type.Native,[v]);
})},destruct:function(){var m;
var n=this._registeredEvents;

for(var o in n){m=n[o];
qx.bom.Event.removeNativeListener(m.element,m.type,m.listener);
}this._manager=this._registeredEvents=null;
},defer:function(a){qx.event.Registration.addHandler(a);
}});
})();
(function(){var h="qx.event.handler.Appear",g="disappear",f="appear";
qx.Class.define(h,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(i){arguments.callee.base.call(this);
this.__gr=i;
this.__gs={};
qx.event.handler.Appear.__gt[this.$$hash]=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__gt:{},refresh:function(){var d=this.__gt;

for(var e in d){d[e].refresh();
}}},members:{__gr:null,__gs:null,canHandleEvent:function(b,c){},registerEvent:function(t,u,v){var w=qx.core.ObjectRegistry.toHashCode(t)+u;
var x=this.__gs;

if(x&&!x[w]){x[w]=t;
t.$$displayed=t.offsetWidth>0;
}},unregisterEvent:function(o,p,q){var r=qx.core.ObjectRegistry.toHashCode(o)+p;
var s=this.__gs;

if(!s){return;
}
if(s[r]){delete s[r];
}},refresh:function(){var m=this.__gs;
var n;

for(var l in m){n=m[l];
var j=n.offsetWidth>0;

if((!!n.$$displayed)!==j){n.$$displayed=j;
var k=qx.event.Registration.createEvent(j?f:g);
this.__gr.dispatchEvent(n,k);
}}}},destruct:function(){this.__gr=this.__gs=null;
delete qx.event.handler.Appear.__gt[this.$$hash];
},defer:function(a){qx.event.Registration.addHandler(a);
}});
})();
(function(){var L="mshtml",K="",J="qx.client",I=">",H="<",G=" ",F="='",E="qx.bom.Element",D="div",C="' ",B="></";
qx.Class.define(E,{statics:{__gu:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},create:function(name,P,Q){if(!Q){Q=window;
}
if(!name){throw new Error("The tag name is missing!");
}var S=this.__gu;
var R=K;

for(var U in P){if(S[U]){R+=U+F+P[U]+C;
}}var V;
if(R!=K){if(qx.bom.client.Engine.MSHTML){V=Q.document.createElement(H+name+G+R+I);
}else{var T=Q.document.createElement(D);
T.innerHTML=H+name+G+R+B+name+I;
V=T.firstChild;
}}else{V=Q.document.createElement(name);
}
for(var U in P){if(!S[U]){qx.bom.element.Attribute.set(V,U,P[U]);
}}return V;
},empty:function(X){return X.innerHTML=K;
},addListener:function(b,c,d,self,e){return qx.event.Registration.addListener(b,c,d,self,e);
},removeListener:function(k,m,n,self,o){return qx.event.Registration.removeListener(k,m,n,self,o);
},removeListenerById:function(M,N){return qx.event.Registration.removeListenerById(M,N);
},hasListener:function(f,g,h){return qx.event.Registration.hasListener(f,g,h);
},focus:function(W){qx.event.Registration.getManager(W).getHandler(qx.event.handler.Focus).focus(W);
},blur:function(O){qx.event.Registration.getManager(O).getHandler(qx.event.handler.Focus).blur(O);
},activate:function(bc){qx.event.Registration.getManager(bc).getHandler(qx.event.handler.Focus).activate(bc);
},deactivate:function(a){qx.event.Registration.getManager(a).getHandler(qx.event.handler.Focus).deactivate(a);
},capture:function(ba,bb){qx.event.Registration.getManager(ba).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(ba,bb);
},releaseCapture:function(Y){qx.event.Registration.getManager(Y).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(Y);
},clone:function(p,q){var t;

if(q||(qx.core.Variant.isSet(J,L)&&!qx.xml.Document.isXmlDocument(p))){var x=qx.event.Registration.getManager(p);
var r=qx.dom.Hierarchy.getDescendants(p);
r.push(p);
}if(qx.core.Variant.isSet(J,L)){for(var i=0,l=r.length;i<l;i++){x.toggleAttachedEvents(r[i],false);
}}var t=p.cloneNode(true);
if(qx.core.Variant.isSet(J,L)){for(var i=0,l=r.length;i<l;i++){x.toggleAttachedEvents(r[i],true);
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
qx.Class.define(a,{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{_cloneNativeEvent:function(d,e){var e=arguments.callee.base.call(this,d,e);
e.shiftKey=d.shiftKey;
e.ctrlKey=d.ctrlKey;
e.altKey=d.altKey;
e.metaKey=d.metaKey;
return e;
},getModifiers:function(){var c=0;
var b=this._native;

if(b.shiftKey){c|=qx.event.type.Dom.SHIFT_MASK;
}
if(b.ctrlKey){c|=qx.event.type.Dom.CTRL_MASK;
}
if(b.altKey){c|=qx.event.type.Dom.ALT_MASK;
}
if(b.metaKey){c|=qx.event.type.Dom.META_MASK;
}return c;
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
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(d,e,f){arguments.callee.base.call(this,d,e,null,true,true);
this._identifier=f;
return this;
},clone:function(b){var c=arguments.callee.base.call(this,b);
c._identifier=this._identifier;
return c;
},getKeyIdentifier:function(){return this._identifier;
}}});
})();
(function(){var U="qx.client",T="blur",S="focus",R="mousedown",Q="on",P="mouseup",O="DOMFocusOut",N="DOMFocusIn",M="selectstart",L="onmousedown",br="onfocusout",bq="onfocusin",bp="onmouseup",bo="onselectstart",bn="draggesture",bm="gecko",bl="qx.event.handler.Focus",bk="_applyFocus",bj="deactivate",bi="textarea",bc="qxIsRootPage",bd="_applyActive",ba="input",bb="focusin",X="qxSelectable",Y="tabIndex",V="off",W="activate",be="1",bf="focusout",bh="qxKeepFocus",bg="qxKeepActive";
qx.Class.define(bl,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(bG){arguments.callee.base.call(this);
this._manager=bG;
this._window=bG.getWindow();
this._document=this._window.document;
this._root=this._document.documentElement;
this._body=this._document.body;
this._initObserver();
},properties:{active:{apply:bd,nullable:true},focus:{apply:bk,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Variant.select("qx.client",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__gv:null,__gw:null,__gx:null,__gy:null,__gz:null,__gA:null,__gB:null,__gC:null,__gD:null,__gE:null,canHandleEvent:function(c,d){},registerEvent:function(F,G,H){},unregisterEvent:function(q,r,s){},focus:function(a){try{a.focus();
}catch(t){}this.setFocus(a);
this.setActive(a);
},activate:function(w){this.setActive(w);
},blur:function(bs){try{bs.blur();
}catch(bP){}
if(this.getActive()===bs){this.resetActive();
}
if(this.getFocus()===bs){this.resetFocus();
}},deactivate:function(b){if(this.getActive()===b){this.resetActive();
}},tryActivate:function(h){var i=this.__gT(h);

if(i){this.setActive(i);
}},__gF:function(z,A,B,C){var E=qx.event.Registration;
var D=E.createEvent(B,qx.event.type.Focus,[z,A,C]);
E.dispatchEvent(z,D);
},_windowFocused:true,__gG:function(){if(this._windowFocused){this._windowFocused=false;
this.__gF(this._window,null,T,false);
}},__gH:function(){if(!this._windowFocused){this._windowFocused=true;
this.__gF(this._window,null,S,false);
}},_initObserver:qx.core.Variant.select(U,{"gecko":function(){this.__gv=qx.lang.Function.listener(this.__gN,this);
this.__gw=qx.lang.Function.listener(this.__gO,this);
this.__gx=qx.lang.Function.listener(this.__gM,this);
this.__gy=qx.lang.Function.listener(this.__gL,this);
this.__gz=qx.lang.Function.listener(this.__gI,this);
this._document.addEventListener(R,this.__gv,true);
this._document.addEventListener(P,this.__gw,true);
this._window.addEventListener(S,this.__gx,true);
this._window.addEventListener(T,this.__gy,true);
this._window.addEventListener(bn,this.__gz,true);
},"mshtml":function(){this.__gv=qx.lang.Function.listener(this.__gN,this);
this.__gw=qx.lang.Function.listener(this.__gO,this);
this.__gB=qx.lang.Function.listener(this.__gJ,this);
this.__gC=qx.lang.Function.listener(this.__gK,this);
this.__gA=qx.lang.Function.listener(this.__gQ,this);
this._document.attachEvent(L,this.__gv);
this._document.attachEvent(bp,this.__gw);
this._document.attachEvent(bq,this.__gB);
this._document.attachEvent(br,this.__gC);
this._document.attachEvent(bo,this.__gA);
},"webkit":function(){this.__gv=qx.lang.Function.listener(this.__gN,this);
this.__gw=qx.lang.Function.listener(this.__gO,this);
this.__gC=qx.lang.Function.listener(this.__gK,this);
this.__gx=qx.lang.Function.listener(this.__gM,this);
this.__gy=qx.lang.Function.listener(this.__gL,this);
this.__gA=qx.lang.Function.listener(this.__gQ,this);
this._document.addEventListener(R,this.__gv,true);
this._document.addEventListener(P,this.__gw,true);
this._document.addEventListener(M,this.__gA,false);
this._window.addEventListener(O,this.__gC,true);
this._window.addEventListener(S,this.__gx,true);
this._window.addEventListener(T,this.__gy,true);
},"opera":function(){this.__gv=qx.lang.Function.listener(this.__gN,this);
this.__gw=qx.lang.Function.listener(this.__gO,this);
this.__gB=qx.lang.Function.listener(this.__gJ,this);
this.__gC=qx.lang.Function.listener(this.__gK,this);
this._document.addEventListener(R,this.__gv,true);
this._document.addEventListener(P,this.__gw,true);
this._window.addEventListener(N,this.__gB,true);
this._window.addEventListener(O,this.__gC,true);
}}),_stopObserver:qx.core.Variant.select(U,{"gecko":function(){this._document.removeEventListener(R,this.__gv,true);
this._document.removeEventListener(P,this.__gw,true);
this._window.removeEventListener(S,this.__gx,true);
this._window.removeEventListener(T,this.__gy,true);
this._window.removeEventListener(bn,this.__gz,true);
},"mshtml":function(){this._document.detachEvent(L,this.__gv);
this._document.detachEvent(bp,this.__gw);
this._document.detachEvent(bq,this.__gB);
this._document.detachEvent(br,this.__gC);
this._document.detachEvent(bo,this.__gA);
},"webkit":function(){this._document.removeEventListener(R,this.__gv,true);
this._document.removeEventListener(M,this.__gA,false);
this._window.removeEventListener(N,this.__gB,true);
this._window.removeEventListener(O,this.__gC,true);
this._window.removeEventListener(S,this.__gx,true);
this._window.removeEventListener(T,this.__gy,true);
},"opera":function(){this._document.removeEventListener(R,this.__gv,true);
this._window.removeEventListener(N,this.__gB,true);
this._window.removeEventListener(O,this.__gC,true);
this._window.removeEventListener(S,this.__gx,true);
this._window.removeEventListener(T,this.__gy,true);
}}),__gI:qx.event.GlobalError.observeMethod(qx.core.Variant.select(U,{"gecko":function(e){if(!this.__gU(e.target)){qx.bom.Event.preventDefault(e);
}},"default":null})),__gJ:qx.event.GlobalError.observeMethod(qx.core.Variant.select(U,{"mshtml":function(e){this.__gH();
var bA=e.srcElement;
var bz=this.__gS(bA);

if(bz){this.setFocus(bz);
}this.tryActivate(bA);
},"opera":function(e){var bC=e.target;

if(bC==this._document||bC==this._window){this.__gH();

if(this.__gD){this.setFocus(this.__gD);
delete this.__gD;
}
if(this.__gE){this.setActive(this.__gE);
delete this.__gE;
}}else{this.setFocus(bC);
this.tryActivate(bC);
if(!this.__gU(bC)){bC.selectionStart=0;
bC.selectionEnd=0;
}}},"default":null})),__gK:qx.event.GlobalError.observeMethod(qx.core.Variant.select(U,{"mshtml":function(e){if(!e.toElement){this.__gG();
this.resetFocus();
this.resetActive();
}},"webkit":function(e){var n=e.target;

if(n===this.getFocus()){this.resetFocus();
}
if(n===this.getActive()){this.resetActive();
}},"opera":function(e){var l=e.target;

if(l==this._document){this.__gG();
this.__gD=this.getFocus();
this.__gE=this.getActive();
this.resetFocus();
this.resetActive();
}else{if(l===this.getFocus()){this.resetFocus();
}
if(l===this.getActive()){this.resetActive();
}}},"default":null})),__gL:qx.event.GlobalError.observeMethod(qx.core.Variant.select(U,{"gecko":function(e){if(e.target===this._window||e.target===this._document){this.__gG();
this.resetActive();
this.resetFocus();
}},"webkit":function(e){if(e.target===this._window||e.target===this._document){this.__gG();
this.__gD=this.getFocus();
this.__gE=this.getActive();
this.resetActive();
this.resetFocus();
}},"default":null})),__gM:qx.event.GlobalError.observeMethod(qx.core.Variant.select(U,{"gecko":function(e){var o=e.target;

if(o===this._window||o===this._document){this.__gH();
o=this._body;
}this.setFocus(o);
this.tryActivate(o);
},"webkit":function(e){var by=e.target;

if(by===this._window||by===this._document){this.__gH();

if(this.__gD){this.setFocus(this.__gD);
delete this.__gD;
}
if(this.__gE){this.setActive(this.__gE);
delete this.__gE;
}}else{this.setFocus(by);
this.tryActivate(by);
}},"default":null})),__gN:qx.event.GlobalError.observeMethod(qx.core.Variant.select(U,{"gecko":function(e){var bK=e.target;
var bI=this.__gS(bK);
var bJ=this.__gU(bK);

if(!bJ){qx.bom.Event.preventDefault(e);
if(bI){if(qx.core.Variant.isSet(U,bm)){var bL=qx.bom.element.Attribute.get(bI,bc)===be;

if(!bL){bI.focus();
}}else{bI.focus();
}}}else if(!bI){qx.bom.Event.preventDefault(e);
}},"mshtml":function(e){var k=e.srcElement;
var j=this.__gS(k);

if(j){if(!this.__gU(k)){k.unselectable=Q;
document.selection.empty();
j.focus();
}}else{qx.bom.Event.preventDefault(e);
if(!this.__gU(k)){k.unselectable=Q;
}}},"webkit":function(e){var bO=e.target;
var bN=this.__gS(bO);

if(bN){this.setFocus(bN);
}else{qx.bom.Event.preventDefault(e);
}},"opera":function(e){var K=e.target;
var I=this.__gS(K);

if(!this.__gU(K)){qx.bom.Event.preventDefault(e);
if(I){var J=this.getFocus();

if(J&&J.selectionEnd){J.selectionStart=0;
J.selectionEnd=0;
J.blur();
}if(I){this.setFocus(I);
}}}else if(I){this.setFocus(I);
}},"default":null})),__gO:qx.event.GlobalError.observeMethod(qx.core.Variant.select(U,{"mshtml":function(e){var bB=e.srcElement;

if(bB.unselectable){bB.unselectable=V;
}this.tryActivate(this.__gP(bB));
},"gecko":function(e){var bH=e.target;

while(bH&&bH.offsetWidth===undefined){bH=bH.parentNode;
}
if(bH){this.tryActivate(bH);
}},"webkit|opera":function(e){this.tryActivate(this.__gP(e.target));
},"default":null})),__gP:qx.event.GlobalError.observeMethod(qx.core.Variant.select(U,{"mshtml|webkit":function(bQ){var bR=this.getFocus();

if(bR&&bQ!=bR&&(bR.nodeName.toLowerCase()===ba||bR.nodeName.toLowerCase()===bi)){bQ=bR;
}return bQ;
},"default":function(p){return p;
}})),__gQ:qx.event.GlobalError.observeMethod(qx.core.Variant.select(U,{"mshtml|webkit":function(e){var bM=qx.bom.client.Engine.MSHTML?e.srcElement:e.target;

if(!this.__gU(bM)){qx.bom.Event.preventDefault(e);
}},"default":null})),__gR:function(bD){var bE=qx.bom.element.Attribute.get(bD,Y);

if(bE>=1){return true;
}var bF=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(bE>=0&&bF[bD.tagName]){return true;
}return false;
},__gS:function(m){while(m&&m.nodeType===1){if(m.getAttribute(bh)==Q){return null;
}
if(this.__gR(m)){return m;
}m=m.parentNode;
}return this._body;
},__gT:function(f){var g=f;

while(f&&f.nodeType===1){if(f.getAttribute(bg)==Q){return null;
}f=f.parentNode;
}return g;
},__gU:function(u){while(u&&u.nodeType===1){var v=u.getAttribute(X);

if(v!=null){return v===Q;
}u=u.parentNode;
}return true;
},_applyActive:function(bw,bx){if(bx){this.__gF(bx,bw,bj,true);
}
if(bw){this.__gF(bw,bx,W,true);
}},_applyFocus:function(x,y){if(y){this.__gF(y,x,bf,true);
}
if(x){this.__gF(x,y,bb,true);
}if(y){this.__gF(y,x,T,false);
}
if(x){this.__gF(x,y,S,false);
}}},destruct:function(){this._stopObserver();
this._manager=this._window=this._document=this._root=this._body=this.__BK=null;
},defer:function(bt){qx.event.Registration.addHandler(bt);
var bu=bt.FOCUSABLE_ELEMENTS;

for(var bv in bu){bu[bv.toUpperCase()]=1;
}}});
})();
(function(){var a="qx.event.type.Focus";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d){arguments.callee.base.call(this,d,false);
this._target=b;
this._relatedTarget=c;
return this;
}}});
})();
(function(){var r="",q="qx.client",p="readOnly",o="accessKey",n="qx.bom.element.Attribute",m="rowSpan",l="vAlign",k="className",j="textContent",i="'",F="htmlFor",E="longDesc",D="cellSpacing",C="frameBorder",B="='",A="useMap",z="innerText",y="innerHTML",x="tabIndex",w="dateTime",u="maxLength",v="mshtml",s="cellPadding",t="colSpan";
qx.Class.define(n,{statics:{__gV:{names:{"class":k,"for":F,html:y,text:qx.core.Variant.isSet(q,v)?z:j,colspan:t,rowspan:m,valign:l,datetime:w,accesskey:o,tabindex:x,maxlength:u,readonly:p,longdesc:E,cellpadding:s,cellspacing:D,frameborder:C,usemap:A},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readonly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:r,maxLength:10000000,className:r,innerHTML:r,innerText:r,textContent:r,htmlFor:r,tabIndex:0},original:{href:1,src:1,type:1}},compile:function(e){var f=[];
var h=this.__gV.runtime;

for(var g in e){if(!h[g]){f.push(g,B,e[g],i);
}}return f.join(r);
},get:qx.core.Variant.select(q,{"mshtml":function(b,name){var d=this.__gV;
var c;
name=d.names[name]||name;
if(d.original[name]){c=b.getAttribute(name,2);
}else if(d.property[name]){if(d.propertyDefault[name]&&c==d.propertyDefault[name]){return null;
}c=b[name];
}else{c=b.getAttribute(name);
}if(d.bools[name]){return !!c;
}return c;
},"default":function(G,name){var I=this.__gV;
var H;
name=I.names[name]||name;
if(I.property[name]){if(I.propertyDefault[name]&&H==I.propertyDefault[name]){return null;
}H=G[name];

if(H==null){H=G.getAttribute(name);
}}else{H=G.getAttribute(name);
}if(I.bools[name]){return !!H;
}return H;
}}),set:function(J,name,K){var L=this.__gV;
name=L.names[name]||name;
if(L.bools[name]){K=!!K;
}if(L.property[name]){if(K==null){K=L.propertyDefault[name];

if(K===undefined){K=null;
}}J[name]=K;
}else{if(K===true){J.setAttribute(name,name);
}else if(K===false||K===null){J.removeAttribute(name);
}else{J.setAttribute(name,K);
}}},reset:function(a,name){this.set(a,name,null);
}}});
})();
(function(){var k="qx.client",j="left",i="right",h="middle",g="dblclick",f="click",e="none",d="contextmenu",c="qx.event.type.Mouse",b="Chrome";
qx.Class.define(c,{extend:qx.event.type.Dom,members:{init:function(m,n,o,p,q){arguments.callee.base.call(this,m,n,o,p,q);

if(!o){this._relatedTarget=qx.bom.Event.getRelatedTarget(m);
}return this;
},_cloneNativeEvent:function(r,s){var s=arguments.callee.base.call(this,r,s);
s.button=r.button;
s.clientX=r.clientX;
s.clientY=r.clientY;
s.pageX=r.pageX;
s.pageY=r.pageY;
s.screenX=r.screenX;
s.screenY=r.screenY;
s.wheelDelta=r.wheelDelta;
s.detail=r.detail;
s.srcElement=r.srcElement;
return s;
},__gW:qx.core.Variant.select(k,{"mshtml":{1:j,2:i,4:h},"default":{0:j,2:i,1:h}}),stop:function(){this.stopPropagation();
},getButton:function(){switch(this._type){case f:case g:return j;
case d:return i;
default:return this.__gW[this._native.button]||e;
}},isLeftPressed:function(){return this.getButton()===j;
},isMiddlePressed:function(){return this.getButton()===h;
},isRightPressed:function(){return this.getButton()===i;
},getRelatedTarget:function(){return this._relatedTarget;
},getViewportLeft:function(){return this._native.clientX;
},getViewportTop:function(){return this._native.clientY;
},getDocumentLeft:qx.core.Variant.select(k,{"mshtml":function(){var a=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(a);
},"default":function(){return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(k,{"mshtml":function(){var l=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(l);
},"default":function(){return this._native.pageY;
}}),getScreenLeft:function(){return this._native.screenX;
},getScreenTop:function(){return this._native.screenY;
},getWheelDelta:qx.core.Variant.select(k,{"default":function(){return -(this._native.wheelDelta/40);
},"gecko":function(){return this._native.detail;
},"webkit":function(){if(window.navigator.userAgent.indexOf(b)!==-1){return -(this._native.wheelDelta/120);
}else{return -(this._native.wheelDelta/40);
}}})}});
})();
(function(){var t="qx.client",s="qx.dom.Hierarchy",r="previousSibling",q="*",p="nextSibling",o="parentNode";
qx.Class.define(s,{statics:{getNodeIndex:function(E){var F=0;

while(E&&(E=E.previousSibling)){F++;
}return F;
},getElementIndex:function(b){var c=0;
var d=qx.dom.Node.ELEMENT;

while(b&&(b=b.previousSibling)){if(b.nodeType==d){c++;
}}return c;
},getNextElementSibling:function(n){while(n&&(n=n.nextSibling)&&!qx.dom.Node.isElement(n)){continue;
}return n||null;
},getPreviousElementSibling:function(L){while(L&&(L=L.previousSibling)&&!qx.dom.Node.isElement(L)){continue;
}return L||null;
},contains:qx.core.Variant.select(t,{"webkit|mshtml|opera":function(N,O){if(qx.dom.Node.isDocument(N)){var P=qx.dom.Node.getDocument(O);
return N&&P==N;
}else if(qx.dom.Node.isDocument(O)){return false;
}else{return N.contains(O);
}},"gecko":function(C,D){return !!(C.compareDocumentPosition(D)&16);
},"default":function(u,v){while(v){if(u==v){return true;
}v=v.parentNode;
}return false;
}}),isRendered:function(i){if(!i.offsetParent){return false;
}var j=i.ownerDocument||i.document;
if(j.body.contains){return j.body.contains(i);
}if(j.compareDocumentPosition){return !!(j.compareDocumentPosition(i)&16);
}throw new Error("Missing support for isRendered()!");
},isDescendantOf:function(w,x){return this.contains(x,w);
},getCommonParent:qx.core.Variant.select(t,{"mshtml|opera":function(G,H){if(G===H){return G;
}
while(G&&qx.dom.Node.isElement(G)){if(G.contains(H)){return G;
}G=G.parentNode;
}return null;
},"default":function(Q,R){if(Q===R){return Q;
}var S={};
var V=qx.core.ObjectRegistry;
var U,T;

while(Q||R){if(Q){U=V.toHashCode(Q);

if(S[U]){return S[U];
}S[U]=Q;
Q=Q.parentNode;
}
if(R){T=V.toHashCode(R);

if(S[T]){return S[T];
}S[T]=R;
R=R.parentNode;
}}return null;
}}),getAncestors:function(a){return this._recursivelyCollect(a,o);
},getChildElements:function(e){e=e.firstChild;

if(!e){return [];
}var f=this.getNextSiblings(e);

if(e.nodeType===1){f.unshift(e);
}return f;
},getDescendants:function(h){return qx.lang.Array.fromCollection(h.getElementsByTagName(q));
},getFirstDescendant:function(I){I=I.firstChild;

while(I&&I.nodeType!=1){I=I.nextSibling;
}return I;
},getLastDescendant:function(K){K=K.lastChild;

while(K&&K.nodeType!=1){K=K.previousSibling;
}return K;
},getPreviousSiblings:function(g){return this._recursivelyCollect(g,r);
},getNextSiblings:function(J){return this._recursivelyCollect(J,p);
},_recursivelyCollect:function(z,A){var B=[];

while(z=z[A]){if(z.nodeType==1){B.push(z);
}}return B;
},getSiblings:function(y){return this.getPreviousSiblings(y).reverse().concat(this.getNextSiblings(y));
},isEmpty:function(M){M=M.firstChild;

while(M){if(M.nodeType===qx.dom.Node.ELEMENT||M.nodeType===qx.dom.Node.TEXT){return false;
}M=M.nextSibling;
}return true;
},cleanWhitespace:function(k){var l=k.firstChild;

while(l){var m=l.nextSibling;

if(l.nodeType==3&&!/\S/.test(l.nodeValue)){k.removeChild(l);
}l=m;
}}}});
})();
(function(){var f="qx.client",e="qx.event.type.Drag";
qx.Class.define(e,{extend:qx.event.type.Event,members:{init:function(m,n){arguments.callee.base.call(this,true,m);

if(n){this._native=n.getNativeEvent()||null;
this._originalTarget=n.getTarget()||null;
}else{this._native=null;
this._originalTarget=null;
}return this;
},clone:function(b){var c=arguments.callee.base.call(this,b);
c._native=this._native;
return c;
},getDocumentLeft:qx.core.Variant.select(f,{"mshtml":function(){if(this._native==null){return 0;
}var d=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(d);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(f,{"mshtml":function(){if(this._native==null){return 0;
}var j=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(j);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageY;
}}),getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);
},addType:function(i){this.getManager().addType(i);
},addAction:function(l){this.getManager().addAction(l);
},supportsType:function(o){return this.getManager().supportsType(o);
},supportsAction:function(k){return this.getManager().supportsAction(k);
},addData:function(g,h){this.getManager().addData(g,h);
},getData:function(a){return this.getManager().getData(a);
},getCurrentType:function(){return this.getManager().getCurrentType();
},getCurrentAction:function(){return this.getManager().getCurrentAction();
}}});
})();
(function(){var l="losecapture",k="qx.client",j="blur",i="focus",h="click",g="qx.event.dispatch.MouseCapture",f="capture",e="scroll";
qx.Class.define(g,{extend:qx.event.dispatch.AbstractBubbling,construct:function(a,b){arguments.callee.base.call(this,a);
this.__gX=a.getWindow();
this.__gY=b;
a.addListener(this.__gX,j,this.releaseCapture,this);
a.addListener(this.__gX,i,this.releaseCapture,this);
a.addListener(this.__gX,e,this.releaseCapture,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__gY:null,__ha:null,__hb:true,__gX:null,_getParent:function(r){return r.parentNode;
},canDispatchEvent:function(p,event,q){return (this.__ha&&this.__hc[q]);
},dispatchEvent:function(n,event,o){if(o==h){event.stopPropagation();
this.releaseCapture();
return;
}
if(this.__hb||!qx.dom.Hierarchy.contains(this.__ha,n)){n=this.__ha;
}arguments.callee.base.call(this,n,event,o);
},__hc:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(c,d){var d=d!==false;

if(this.__ha===c&&this.__hb==d){return;
}
if(this.__ha){this.releaseCapture();
}this.nativeSetCapture(c,d);

if(this.hasNativeCapture){var self=this;
qx.bom.Event.addNativeListener(c,l,function(){qx.bom.Event.removeNativeListener(c,l,arguments.callee);
self.releaseCapture();
});
}this.__hb=d;
this.__ha=c;
this.__gY.fireEvent(c,f,qx.event.type.Event,[true,false]);
},getCaptureElement:function(){return this.__ha;
},releaseCapture:function(){var v=this.__ha;

if(!v){return;
}this.__ha=null;
this.__gY.fireEvent(v,l,qx.event.type.Event,[true,false]);
this.nativeReleaseCapture(v);
},hasNativeCapture:qx.bom.client.Engine.MSHTML,nativeSetCapture:qx.core.Variant.select(k,{"mshtml":function(s,t){s.setCapture(t!==false);
},"default":qx.lang.Function.empty}),nativeReleaseCapture:qx.core.Variant.select(k,{"mshtml":function(m){m.releaseCapture();
},"default":qx.lang.Function.empty})},destruct:function(){this.__ha=this.__gX=this.__gY=null;
},defer:function(u){qx.event.Registration.addDispatcher(u);
}});
})();
(function(){var w="qx.client",v="",u="mshtml",t="'",s="SelectionLanguage",r="qx.xml.Document",q=" />",p="MSXML2.DOMDocument.3.0",o='<\?xml version="1.0" encoding="utf-8"?>\n<',n="MSXML2.XMLHTTP.3.0",h="MSXML2.XMLHTTP.6.0",m=" xmlns='",k="text/xml",g="XPath",f="MSXML2.DOMDocument.6.0",j="HTML";
qx.Bootstrap.define(r,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(e){if(e.nodeType===9){return e.documentElement.nodeName!==j;
}else if(e.ownerDocument){return this.isXmlDocument(e.ownerDocument);
}else{return false;
}},create:qx.core.Variant.select(w,{"mshtml":function(A,B){var C=new ActiveXObject(this.DOMDOC);
C.setProperty(s,g);

if(B){var D=o;
D+=B;

if(A){D+=m+A+t;
}D+=q;
C.loadXML(D);
}return C;
},"default":function(c,d){return document.implementation.createDocument(c||v,d||v,null);
}}),fromString:qx.core.Variant.select(w,{"mshtml":function(a){var b=qx.xml.Document.create();
b.loadXML(a);
return b;
},"default":function(F){var G=new DOMParser();
return G.parseFromString(F,k);
}})},defer:function(x){if(qx.core.Variant.isSet(w,u)){var y=[f,p];
var z=[h,n];

for(var i=0,l=y.length;i<l;i++){try{new ActiveXObject(y[i]);
new ActiveXObject(z[i]);
}catch(E){continue;
}x.DOMDOC=y[i];
x.XMLHTTP=z[i];
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
}},intoViewY:function(o,stop,p){var parent=o.parentNode;
var v=qx.dom.Node.getDocument(o);
var q=v.body;
var D,r,z;
var F,C,x;
var t,u,s;
var H,I,E,y;
var B,w,J;
var G=p===d;
var A=p===e;
stop=stop?stop.parentNode:v;
while(parent&&parent!=stop){if(parent.scrollHeight>parent.clientHeight&&(parent===q||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===q){r=parent.scrollTop;
z=r+qx.bom.Viewport.getHeight();
F=qx.bom.Viewport.getHeight();
C=parent.clientHeight;
x=parent.scrollHeight;
t=0;
u=0;
s=0;
}else{D=qx.bom.element.Location.get(parent);
r=D.top;
z=D.bottom;
F=parent.offsetHeight;
C=parent.clientHeight;
x=parent.scrollHeight;
t=parseInt(qx.bom.element.Style.get(parent,h),10)||0;
u=parseInt(qx.bom.element.Style.get(parent,i),10)||0;
s=F-C-t-u;
}H=qx.bom.element.Location.get(o);
I=H.top;
E=H.bottom;
y=o.offsetHeight;
B=I-r-t;
w=E-z+u;
J=0;
if(G){J=B;
}else if(A){J=w+s;
}else if(B<0||y>C){J=B;
}else if(w>0){J=w+s;
}parent.scrollTop+=J;
if(qx.bom.client.Engine.GECKO){qx.event.Registration.fireNonBubblingEvent(parent,j);
}}
if(parent===q){break;
}parent=parent.parentNode;
}},intoView:function(l,stop,m,n){this.intoViewX(l,stop,m);
this.intoViewY(l,stop,n);
}}});
})();
(function(){var bj="borderTopWidth",bi="borderLeftWidth",bh="marginTop",bg="marginLeft",bf="scroll",be="qx.client",bd="border-box",bc="borderBottomWidth",bb="borderRightWidth",ba="auto",by="padding",bx="qx.bom.element.Location",bw="paddingLeft",bv="static",bu="marginBottom",bt="visible",bs="BODY",br="paddingBottom",bq="paddingTop",bp="marginRight",bn="position",bo="margin",bl="overflow",bm="paddingRight",bk="border";
qx.Class.define(bx,{statics:{__hd:function(bB,bC){return qx.bom.element.Style.get(bB,bC,qx.bom.element.Style.COMPUTED_MODE,false);
},__he:function(H,I){return parseInt(qx.bom.element.Style.get(H,I,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;
},__hf:function(N){var Q=0,top=0;
if(N.getBoundingClientRect&&!qx.bom.client.Engine.OPERA){var P=qx.dom.Node.getWindow(N);
Q-=qx.bom.Viewport.getScrollLeft(P);
top-=qx.bom.Viewport.getScrollTop(P);
}else{var O=qx.dom.Node.getDocument(N).body;
N=N.parentNode;
while(N&&N!=O){Q+=N.scrollLeft;
top+=N.scrollTop;
N=N.parentNode;
}}return {left:Q,top:top};
},__hg:qx.core.Variant.select(be,{"mshtml":function(J){var L=qx.dom.Node.getDocument(J);
var K=L.body;
var M=0;
var top=0;
M-=K.clientLeft+L.documentElement.clientLeft;
top-=K.clientTop+L.documentElement.clientTop;

if(qx.bom.client.Feature.STANDARD_MODE){M+=this.__he(K,bi);
top+=this.__he(K,bj);
}return {left:M,top:top};
},"webkit":function(bG){var bI=qx.dom.Node.getDocument(bG);
var bH=bI.body;
var bJ=bH.offsetLeft;
var top=bH.offsetTop;
if(qx.bom.client.Engine.VERSION<530.17){bJ+=this.__he(bH,bi);
top+=this.__he(bH,bj);
}return {left:bJ,top:top};
},"gecko":function(W){var X=qx.dom.Node.getDocument(W).body;
var Y=X.offsetLeft;
var top=X.offsetTop;
if(qx.bom.client.Engine.VERSION<1.9){Y+=this.__he(X,bg);
top+=this.__he(X,bh);
}if(qx.bom.element.BoxSizing.get(X)!==bd){Y+=this.__he(X,bi);
top+=this.__he(X,bj);
}return {left:Y,top:top};
},"default":function(E){var F=qx.dom.Node.getDocument(E).body;
var G=F.offsetLeft;
var top=F.offsetTop;
return {left:G,top:top};
}}),__hh:qx.core.Variant.select(be,{"mshtml|webkit":function(q){var s=qx.dom.Node.getDocument(q);
if(q.getBoundingClientRect){var t=q.getBoundingClientRect();
var u=t.left;
var top=t.top;
}else{var u=q.offsetLeft;
var top=q.offsetTop;
q=q.offsetParent;
var r=s.body;
while(q&&q!=r){u+=q.offsetLeft;
top+=q.offsetTop;
u+=this.__he(q,bi);
top+=this.__he(q,bj);
q=q.offsetParent;
}}return {left:u,top:top};
},"gecko":function(a){if(a.getBoundingClientRect){var d=a.getBoundingClientRect();
var e=Math.round(d.left);
var top=Math.round(d.top);
}else{var e=0;
var top=0;
var b=qx.dom.Node.getDocument(a).body;
var c=qx.bom.element.BoxSizing;

if(c.get(a)!==bd){e-=this.__he(a,bi);
top-=this.__he(a,bj);
}
while(a&&a!==b){e+=a.offsetLeft;
top+=a.offsetTop;
if(c.get(a)!==bd){e+=this.__he(a,bi);
top+=this.__he(a,bj);
}if(a.parentNode&&this.__hd(a.parentNode,bl)!=bt){e+=this.__he(a.parentNode,bi);
top+=this.__he(a.parentNode,bj);
}a=a.offsetParent;
}}return {left:e,top:top};
},"default":function(n){var p=0;
var top=0;
var o=qx.dom.Node.getDocument(n).body;
while(n&&n!==o){p+=n.offsetLeft;
top+=n.offsetTop;
n=n.offsetParent;
}return {left:p,top:top};
}}),get:function(v,w){if(v.tagName==bs){var location=this.__hi(v);
var D=location.left;
var top=location.top;
}else{var x=this.__hg(v);
var C=this.__hh(v);
var scroll=this.__hf(v);
var D=C.left+x.left-scroll.left;
var top=C.top+x.top-scroll.top;
}var y=D+v.offsetWidth;
var z=top+v.offsetHeight;

if(w){if(w==by||w==bf){var A=qx.bom.element.Overflow.getX(v);

if(A==bf||A==ba){y+=v.scrollWidth-v.offsetWidth+this.__he(v,bi)+this.__he(v,bb);
}var B=qx.bom.element.Overflow.getY(v);

if(B==bf||B==ba){z+=v.scrollHeight-v.offsetHeight+this.__he(v,bj)+this.__he(v,bc);
}}
switch(w){case by:D+=this.__he(v,bw);
top+=this.__he(v,bq);
y-=this.__he(v,bm);
z-=this.__he(v,br);
case bf:D-=v.scrollLeft;
top-=v.scrollTop;
y-=v.scrollLeft;
z-=v.scrollTop;
case bk:D+=this.__he(v,bi);
top+=this.__he(v,bj);
y-=this.__he(v,bb);
z-=this.__he(v,bc);
break;
case bo:D-=this.__he(v,bg);
top-=this.__he(v,bh);
y+=this.__he(v,bp);
z+=this.__he(v,bu);
break;
}}return {left:D,top:top,right:y,bottom:z};
},__hi:qx.core.Variant.select(be,{"default":function(T){var top=T.offsetTop+this.__he(T,bh);
var U=T.offsetLeft+this.__he(T,bg);
return {left:U,top:top};
},"mshtml":function(l){var top=l.offsetTop;
var m=l.offsetLeft;

if(!((qx.bom.client.Engine.VERSION<8||qx.bom.client.Engine.DOCUMENT_MODE<8)&&!qx.bom.client.Feature.QUIRKS_MODE)){top+=this.__he(l,bh);
m+=this.__he(l,bg);
}return {left:m,top:top};
},"gecko":function(f){var top=f.offsetTop+this.__he(f,bh)+this.__he(f,bi);
var g=f.offsetLeft+this.__he(f,bg)+this.__he(f,bj);
return {left:g,top:top};
}}),getLeft:function(h,i){return this.get(h,i).left;
},getTop:function(bz,bA){return this.get(bz,bA).top;
},getRight:function(j,k){return this.get(j,k).right;
},getBottom:function(R,S){return this.get(R,S).bottom;
},getRelative:function(bK,bL,bM,bN){var bP=this.get(bK,bM);
var bO=this.get(bL,bN);
return {left:bP.left-bO.left,top:bP.top-bO.top,right:bP.right-bO.right,bottom:bP.bottom-bO.bottom};
},getPosition:function(V){return this.getRelative(V,this.getOffsetParent(V));
},getOffsetParent:function(bD){var bF=bD.offsetParent||document.body;
var bE=qx.bom.element.Style;

while(bF&&(!/^body|html$/i.test(bF.tagName)&&bE.get(bF,bn)===bv)){bF=bF.offsetParent;
}return bF;
}}});
})();
(function(){var s="textarea",r="input",q="qx.client",p="character",o="qx.bom.Selection",n="#text",m="EndToEnd",l="button",k="body";
qx.Class.define(o,{statics:{getSelectionObject:qx.core.Variant.select(q,{"mshtml":function(T){return T.selection;
},"default":function(U){return qx.dom.Node.getWindow(U).getSelection();
}}),get:qx.core.Variant.select(q,{"mshtml":function(i){var j=qx.bom.Range.get(qx.dom.Node.getDocument(i));
return j.text;
},"default":function(h){if(qx.dom.Node.isElement(h)&&(h.nodeName.toLowerCase()==r||h.nodeName.toLowerCase()==s)){return h.value.substring(h.selectionStart,h.selectionEnd);
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(h)).toString();
}return null;
}}),getLength:qx.core.Variant.select(q,{"mshtml":function(Q){var S=qx.bom.Selection.get(Q);
var R=qx.util.StringSplit.split(S,/\r\n/);
return S.length-(R.length-1);
},"opera":function(a){var f,d,b;

if(qx.dom.Node.isElement(a)&&(a.nodeName.toLowerCase()==r||a.nodeName.toLowerCase()==s)){var e=a.selectionStart;
var c=a.selectionEnd;
f=a.value.substring(e,c);
d=c-e;
}else{f=qx.bom.Selection.get(a);
d=f.length;
}b=qx.util.StringSplit.split(f,/\r\n/);
return d-(b.length-1);
},"default":function(g){if(qx.dom.Node.isElement(g)&&(g.nodeName.toLowerCase()==r||g.nodeName.toLowerCase()==s)){return g.selectionEnd-g.selectionStart;
}else{return qx.bom.Selection.get(g).length;
}return null;
}}),set:qx.core.Variant.select(q,{"mshtml":function(E,F,G){var H;
if(qx.dom.Node.isDocument(E)){E=E.body;
}
if(qx.dom.Node.isElement(E)||qx.dom.Node.isText(E)){switch(E.nodeName.toLowerCase()){case r:case s:case l:if(G===undefined){G=E.value.length;
}
if(F>=0&&F<=E.value.length&&G>=0&&G<=E.value.length){H=qx.bom.Range.get(E);
H.collapse(true);
H.moveStart(p,F);
H.moveEnd(p,G-F);
H.select();
return true;
}break;
case n:if(G===undefined){G=E.nodeValue.length;
}
if(F>=0&&F<=E.nodeValue.length&&G>=0&&G<=E.nodeValue.length){H=qx.bom.Range.get(qx.dom.Node.getBodyElement(E));
H.moveToElementText(E.parentNode);
H.collapse(true);
H.moveStart(p,F);
H.moveEnd(p,G-F);
H.select();
return true;
}break;
default:if(G===undefined){G=E.childNodes.length-1;
}if(E.childNodes[F]&&E.childNodes[G]){H=qx.bom.Range.get(qx.dom.Node.getBodyElement(E));
H.moveToElementText(E.childNodes[F]);
H.collapse(true);
var I=qx.bom.Range.get(qx.dom.Node.getBodyElement(E));
I.moveToElementText(E.childNodes[G]);
H.setEndPoint(m,I);
H.select();
return true;
}}}return false;
},"default":function(J,K,L){var P=J.nodeName.toLowerCase();

if(qx.dom.Node.isElement(J)&&(P==r||P==s)){if(L===undefined){L=J.value.length;
}if(K>=0&&K<=J.value.length&&L>=0&&L<=J.value.length){J.focus();
J.select();
J.setSelectionRange(K,L);
return true;
}}else{var N=false;
var O=qx.dom.Node.getWindow(J).getSelection();
var M=qx.bom.Range.get(J);
if(qx.dom.Node.isText(J)){if(L===undefined){L=J.length;
}
if(K>=0&&K<J.length&&L>=0&&L<=J.length){N=true;
}}else if(qx.dom.Node.isElement(J)){if(L===undefined){L=J.childNodes.length-1;
}
if(K>=0&&J.childNodes[K]&&L>=0&&J.childNodes[L]){N=true;
}}else if(qx.dom.Node.isDocument(J)){J=J.body;

if(L===undefined){L=J.childNodes.length-1;
}
if(K>=0&&J.childNodes[K]&&L>=0&&J.childNodes[L]){N=true;
}}
if(N){if(!O.isCollapsed){O.collapseToStart();
}M.setStart(J,K);
if(qx.dom.Node.isText(J)){M.setEnd(J,L);
}else{M.setEndAfter(J.childNodes[L]);
}if(O.rangeCount>0){O.removeAllRanges();
}O.addRange(M);
return true;
}}return false;
}}),setAll:function(D){return qx.bom.Selection.set(D,0);
},clear:qx.core.Variant.select(q,{"mshtml":function(z){var A=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(z));
var B=qx.bom.Range.get(z);
var parent=B.parentElement();
var C=qx.bom.Range.get(qx.dom.Node.getDocument(z));
if(parent==C.parentElement()&&parent==z){A.empty();
}},"default":function(t){var v=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(t));
var x=t.nodeName.toLowerCase();
if(qx.dom.Node.isElement(t)&&(x==r||x==s)){t.setSelectionRange(0,0);
qx.bom.Element.blur(t);
}else if(qx.dom.Node.isDocument(t)||x==k){v.collapse(t.body?t.body:t,0);
}else{var w=qx.bom.Range.get(t);

if(!w.collapsed){var y;
var u=w.commonAncestorContainer;
if(qx.dom.Node.isElement(t)&&qx.dom.Node.isText(u)){y=u.parentNode;
}else{y=u;
}
if(y==t){v.collapse(t,0);
}}}}})}});
})();
(function(){var l="button",k="qx.bom.Range",j="text",i="password",h="file",g="submit",f="reset",e="textarea",d="input",c="hidden",a="qx.client",b="body";
qx.Class.define(k,{statics:{get:qx.core.Variant.select(a,{"mshtml":function(p){if(qx.dom.Node.isElement(p)){switch(p.nodeName.toLowerCase()){case d:switch(p.type){case j:case i:case c:case l:case f:case h:case g:return p.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(p)).createRange();
}break;
case e:case b:case l:return p.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(p)).createRange();
}}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(p)).createRange();
}},"default":function(m){var n=qx.dom.Node.getDocument(m);
var o=qx.bom.Selection.getSelectionObject(n);

if(o.rangeCount>0){return o.getRangeAt(0);
}else{return n.createRange();
}}})}});
})();
(function(){var f="",e="g",d="$",c="qx.util.StringSplit",b="\\$&",a="^";
qx.Bootstrap.define(c,{statics:{split:function(g,h,k){var n=f;
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
qx.Class.define(b,{statics:{__hj:{},remove:function(f){delete this.__hj[f.$$hash];
},add:function(g){var h=this.__hj;

if(h[g.$$hash]){return;
}h[g.$$hash]=g;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var c=this.__hj;
var e;

for(var d in c){e=c[d];
delete c[d];
e.syncWidget();
}for(var d in c){return;
}this.__hj={};
}}});
})();
(function(){var d="qx.ui.core.queue.Visibility",c="visibility";
qx.Class.define(d,{statics:{__hk:{},__hl:{},remove:function(o){var p=o.$$hash;
delete this.__hl[p];
delete this.__hk[p];
},isVisible:function(i){return this.__hl[i.$$hash]||false;
},__hm:function(e){var g=this.__hl;
var f=e.$$hash;
var h;
if(e.isExcluded()){h=false;
}else{var parent=e.$$parent;

if(parent){h=this.__hm(parent);
}else{h=e.isRootWidget();
}}return g[f]=h;
},add:function(a){var b=this.__hk;

if(b[a.$$hash]){return;
}b[a.$$hash]=a;
qx.ui.core.queue.Manager.scheduleFlush(c);
},flush:function(){var j=this.__hk;
var n=this.__hl;
for(var k in j){if(n[k]!=null){j[k].addChildrenToQueue(j);
}}var m={};

for(var k in j){m[k]=n[k];
n[k]=null;
}for(var k in j){var l=j[k];
delete j[k];
if(n[k]==null){this.__hm(l);
}if(n[k]&&n[k]!=m[k]){l.checkAppearanceNeeds();
}}this.__hk={};
}}});
})();
(function(){var g="appearance",f="qx.ui.core.queue.Appearance";
qx.Class.define(f,{statics:{__hn:{},remove:function(j){delete this.__hn[j.$$hash];
},add:function(h){var i=this.__hn;

if(i[h.$$hash]){return;
}i[h.$$hash]=h;
qx.ui.core.queue.Manager.scheduleFlush(g);
},has:function(e){return !!this.__hn[e.$$hash];
},flush:function(){var d=qx.ui.core.queue.Visibility;
var a=this.__hn;
var c;

for(var b in a){c=a[b];
delete a[b];
if(d.isVisible(c)){c.syncAppearance();
}else{c.$$stateChanges=true;
}}}}});
})();
(function(){var b="dispose",a="qx.ui.core.queue.Dispose";
qx.Class.define(a,{statics:{__ho:{},add:function(c){var d=this.__ho;

if(d[c.$$hash]){return;
}d[c.$$hash]=c;
qx.ui.core.queue.Manager.scheduleFlush(b);
},flush:function(){var e=this.__ho;

for(var g in e){var f=e[g];
delete e[g];
f.dispose();
}for(var g in e){return;
}this.__ho={};
}}});
})();
(function(){var b="qx.html.Decorator",a="absolute";
qx.Class.define(b,{extend:qx.html.Element,construct:function(e,f){arguments.callee.base.call(this);
this.__hp=e;
this.__hq=f||e.toHashCode();
this.setStyles({position:a,top:0,left:0});
this.useMarkup(e.getMarkup());
},members:{__hq:null,__hp:null,getId:function(){return this.__hq;
},getDecorator:function(){return this.__hp;
},resize:function(c,d){this.__hp.resize(this.getDomElement(),c,d);
},tint:function(g){this.__hp.tint(this.getDomElement(),g);
},getInsets:function(){return this.__hp.getInsets();
}},destruct:function(){this.__hp=null;
}});
})();
(function(){var k="blur",j="focus",h="input",g="load",f="qx.ui.core.EventHandler",e="activate";
qx.Class.define(f,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){arguments.callee.base.call(this);
this.__hr=qx.event.Registration.getManager(window);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:false},members:{__hr:null,__hs:{focusin:1,focusout:1,focus:1,blur:1},__ht:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(m,n){return m instanceof qx.ui.core.Widget;
},_dispatchEvent:function(t){var y=t.getTarget();
var x=qx.ui.core.Widget.getWidgetByElement(y);
var z=false;

while(x&&x.isAnonymous()){var z=true;
x=x.getLayoutParent();
}if(x&&z&&t.getType()==e){x.getContainerElement().activate();
}if(this.__hs[t.getType()]){x=x&&x.getFocusTarget();
if(!x){return;
}}if(t.getRelatedTarget){var G=t.getRelatedTarget();
var F=qx.ui.core.Widget.getWidgetByElement(G);

while(F&&F.isAnonymous()){F=F.getLayoutParent();
}
if(F){if(this.__hs[t.getType()]){F=F.getFocusTarget();
}if(F===x){return;
}}}var B=t.getCurrentTarget();
var D=qx.ui.core.Widget.getWidgetByElement(B);

if(!D||D.isAnonymous()){return;
}if(this.__hs[t.getType()]){D=D.getFocusTarget();
}var E=t.getType();

if(!D||!(D.isEnabled()||this.__ht[E])){return;
}var u=t.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;
var A=this.__hr.getListeners(D,E,u);

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

if(q===j||q===k){s=p.getFocusElement();
}else if(q===g||q===h){s=p.getContentElement();
}else{s=p.getContainerElement();
}
if(s){s.addListener(q,this._dispatchEvent,this,r);
}},unregisterEvent:function(a,b,c){var d;

if(b===j||b===k){d=a.getFocusElement();
}else if(b===g||b===h){d=a.getContentElement();
}else{d=a.getContainerElement();
}
if(d){d.removeListener(b,this._dispatchEvent,this,c);
}}},destruct:function(){this.__hr=null;
},defer:function(o){qx.event.Registration.addHandler(o);
}});
})();
(function(){var c="qx.bom.client.Locale",b="-",a="";
qx.Bootstrap.define(c,{statics:{LOCALE:"",VARIANT:"",__hu:function(){var d=(qx.bom.client.Engine.MSHTML?navigator.userLanguage:navigator.language).toLowerCase();
var f=a;
var e=d.indexOf(b);

if(e!=-1){f=d.substr(e+1);
d=d.substr(0,e);
}this.LOCALE=d;
this.VARIANT=f;
}},defer:function(g){g.__hu();
}});
})();
(function(){var t='indexOf',s='slice',r='concat',q='toLocaleLowerCase',p="qx.type.BaseString",o="",n='match',m='toLocaleUpperCase',k='search',j='replace',c='toLowerCase',h='charCodeAt',f='split',b='substring',a='lastIndexOf',e='substr',d='toUpperCase',g='charAt';
qx.Class.define(p,{extend:Object,construct:function(u){var u=u||o;
this.__hv=u;
this.length=u.length;
},members:{$$isString:true,length:0,__hv:null,toString:function(){return this.__hv;
},charAt:null,valueOf:null,charCodeAt:null,concat:null,indexOf:null,lastIndexOf:null,match:null,replace:null,search:null,slice:null,split:null,substr:null,substring:null,toLowerCase:null,toUpperCase:null,toHashCode:function(){return qx.core.ObjectRegistry.toHashCode(this);
},toLocaleLowerCase:null,toLocaleUpperCase:null,base:function(v,w){return qx.core.Object.prototype.base.apply(this,arguments);
}},defer:function(x,y){{};
var z=[g,h,r,t,a,n,j,k,s,f,e,b,c,d,q,m];
y.valueOf=y.toString;

for(var i=0,l=z.length;i<l;i++){y[z[i]]=String.prototype[z[i]];
}}});
})();
(function(){var a="qx.locale.LocalizedString";
qx.Class.define(a,{extend:qx.type.BaseString,construct:function(b,c,d){arguments.callee.base.call(this,b);
this.__hw=c;
this.__hx=d;
},members:{__hw:null,__hx:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__hw,this.__hx);
}}});
})();
(function(){var E="_",D="",C="qx.dynlocale",B="on",A="_applyLocale",z="changeLocale",y="C",x="qx.locale.Manager",w="String",v="singleton";
qx.Class.define(x,{type:v,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__hy=qx.$$translations||{};
this.__hz=qx.$$locales||{};
var p=qx.bom.client.Locale;
var n=p.LOCALE;
var o=p.VARIANT;

if(o!==D){n+=E+o;
}this.setLocale(n||this.__hA);
},statics:{tr:function(F,G){var H=qx.lang.Array.fromArguments(arguments);
H.splice(0,1);
return qx.locale.Manager.getInstance().translate(F,H);
},trn:function(bc,bd,be,bf){var bg=qx.lang.Array.fromArguments(arguments);
bg.splice(0,3);
if(be!=1){return qx.locale.Manager.getInstance().translate(bd,bg);
}else{return qx.locale.Manager.getInstance().translate(bc,bg);
}},trc:function(r,s,t){var u=qx.lang.Array.fromArguments(arguments);
u.splice(0,2);
return qx.locale.Manager.getInstance().translate(s,u);
},marktr:function(q){return q;
}},properties:{locale:{check:w,nullable:true,apply:A,event:z}},members:{__hA:y,__hB:null,__hC:null,__hy:null,__hz:null,getLanguage:function(){return this.__hC;
},getTerritory:function(){return this.getLocale().split(E)[1]||D;
},getAvailableLocales:function(){var J=[];

for(var I in this.__hz){if(I!=this.__hA){J.push(I);
}}return J;
},__hD:function(Y){var bb;
var ba=Y.indexOf(E);

if(ba==-1){bb=Y;
}else{bb=Y.substring(0,ba);
}return bb;
},_applyLocale:function(S,T){this.__hB=S;
this.__hC=this.__hD(S);
},addTranslation:function(U,V){var W=this.__hy;

if(W[U]){for(var X in V){W[U][X]=V[X];
}}else{W[U]=V;
}},addLocale:function(j,k){var l=this.__hz;

if(l[j]){for(var m in k){l[j][m]=k[m];
}}else{l[j]=k;
}},translate:function(a,b,c){var h;
var f=this.__hy;

if(!f){return a;
}
if(c){var e=this.__hD(c);
}else{c=this.__hB;
e=this.__hC;
}
if(!h&&f[c]){h=f[c][a];
}
if(!h&&f[e]){h=f[e][a];
}
if(!h&&f[this.__hA]){h=f[this.__hA][a];
}
if(!h){h=a;
}
if(b.length>0){var d=[];

for(var i=0;i<b.length;i++){var g=b[i];

if(g&&g.translate){d[i]=g.translate();
}else{d[i]=g;
}}h=qx.lang.String.format(h,d);
}
if(qx.core.Variant.isSet(C,B)){h=new qx.locale.LocalizedString(h,a,b);
}return h;
},localize:function(K,L,M){var R;
var P=this.__hz;

if(!P){return K;
}
if(M){var O=this.__hD(M);
}else{M=this.__hB;
O=this.__hC;
}
if(!R&&P[M]){R=P[M][K];
}
if(!R&&P[O]){R=P[O][K];
}
if(!R&&P[this.__hA]){R=P[this.__hA][K];
}
if(!R){R=K;
}
if(L.length>0){var N=[];

for(var i=0;i<L.length;i++){var Q=L[i];

if(Q.translate){N[i]=Q.translate();
}else{N[i]=Q;
}}R=qx.lang.String.format(R,N);
}
if(qx.core.Variant.isSet(C,B)){R=new qx.locale.LocalizedString(R,K,L);
}return R;
}},destruct:function(){this.__hy=this.__hz=null;
}});
})();
(function(){var k="source",j="scale",i="no-repeat",h="mshtml",g="qx.client",f="qx.html.Image";
qx.Class.define(f,{extend:qx.html.Element,members:{_applyProperty:function(name,l){arguments.callee.base.call(this,name,l);

if(name===k){var p=this.getDomElement();
var m=this.getAllStyles();
var n=this._getProperty(k);
var o=this._getProperty(j);
var q=o?j:i;
qx.bom.element.Decoration.update(p,n,q,m);
}},_createDomElement:function(){var d=this._getProperty(j);
var e=d?j:i;

if(qx.core.Variant.isSet(g,h)){var c=this._getProperty(k);
this.setNodeName(qx.bom.element.Decoration.getTagName(e,c));
}else{this.setNodeName(qx.bom.element.Decoration.getTagName(e));
}return arguments.callee.base.call(this);
},_copyData:function(b){return arguments.callee.base.call(this,true);
},setSource:function(a){this._setProperty(k,a);
return this;
},getSource:function(){return this._getProperty(k);
},resetSource:function(){this._removeProperty(k);
return this;
},setScale:function(r){this._setProperty(j,r);
return this;
},getScale:function(){return this._getProperty(j);
}}});
})();
(function(){var bf="nonScaled",be="scaled",bd="alphaScaled",bc=".png",bb="replacement",ba="hidden",Y="div",X="Boolean",W="_applyScale",V="px",P="_applySource",U="-disabled.$1",S="img",O="changeSource",N="qx.client",R="__hE",Q="String",T="image",M="qx.ui.basic.Image";
qx.Class.define(M,{extend:qx.ui.core.Widget,construct:function(h){this.__hE={};
arguments.callee.base.call(this);

if(h){this.setSource(h);
}},properties:{source:{check:Q,init:null,nullable:true,event:O,apply:P,themeable:true},scale:{check:X,init:false,themeable:true,apply:W},appearance:{refine:true,init:T},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},members:{__hF:null,__hG:null,__hH:null,__hE:null,getContentElement:function(){return this.__hL();
},_createContentElement:function(){return this.__hL();
},_getContentHint:function(){return {width:this.__hF||0,height:this.__hG||0};
},_applyEnabled:function(H,I){arguments.callee.base.call(this,H,I);

if(this.getSource()){this._styleSource();
}},_applySource:function(bg){this._styleSource();
},_applyScale:function(bh){this._styleSource();
},__hI:function(J){this.__hH=J;
},__hJ:function(){if(this.__hH==null){var g=this.getSource();
var f=false;

if(g!=null){f=qx.lang.String.endsWith(g,bc);
}
if(this.getScale()&&f&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){this.__hH=bd;
}else if(this.getScale()){this.__hH=be;
}else{this.__hH=bf;
}}return this.__hH;
},__hK:function(m){var n;
var o;

if(m==bd){n=true;
o=Y;
}else if(m==bf){n=false;
o=Y;
}else{n=true;
o=S;
}var p=new qx.html.Image(o);
p.setScale(n);
p.setStyles({"overflowX":ba,"overflowY":ba});
return p;
},__hL:function(){var q=this.__hJ();

if(this.__hE[q]==null){this.__hE[q]=this.__hK(q);
}return this.__hE[q];
},_styleSource:function(){var l=qx.util.AliasManager.getInstance().resolve(this.getSource());

if(!l){this.getContentElement().resetSource();
return;
}this.__hM(l);
if(qx.util.ResourceManager.getInstance().has(l)){this.__hO(this.getContentElement(),l);
}else if(qx.io2.ImageLoader.isLoaded(l)){this.__hP(this.getContentElement(),l);
}else{this.__hQ(this.getContentElement(),l);
}},__hM:qx.core.Variant.select(N,{"mshtml":function(i){var k=qx.bom.element.Decoration.isAlphaImageLoaderEnabled();
var j=qx.lang.String.endsWith(i,bc);

if(k&&j){if(this.getScale()&&this.__hJ()!=bd){this.__hI(bd);
}else if(!this.getScale()&&this.__hJ()!=bf){this.__hI(bf);
}}else{if(this.getScale()&&this.__hJ()!=be){this.__hI(be);
}else if(!this.getScale()&&this.__hJ()!=bf){this.__hI(bf);
}}this.__hN(this.__hL());
},"default":function(bi){if(this.getScale()&&this.__hJ()!=be){this.__hI(be);
}else if(!this.getScale()&&this.__hJ(bf)){this.__hI(bf);
}this.__hN(this.__hL());
}}),__hN:function(r){var u=this.getContainerElement();
var v=u.getChild(0);

if(v!=r){if(v!=null){var x=V;
var s={};
var t=this.getInnerSize();

if(t!=null){s.width=t.width+x;
s.height=t.height+x;
}var w=this.getInsets();
s.left=w.left+x;
s.top=w.top+x;
r.setStyles(s,true);
r.setSelectable(this.getSelectable());
}u.removeAt(0);
u.addAt(r,0);
}},__hO:function(y,z){var B=qx.util.ResourceManager.getInstance();
if(!this.getEnabled()){var A=z.replace(/\.([a-z]+)$/,U);

if(B.has(A)){z=A;
this.addState(bb);
}else{this.removeState(bb);
}}if(y.getSource()===z){return;
}y.setSource(z);
this.__hS(B.getImageWidth(z),B.getImageHeight(z));
},__hP:function(a,b){var d=qx.io2.ImageLoader;
a.setSource(b);
var c=d.getWidth(b);
var e=d.getHeight(b);
this.__hS(c,e);
},__hQ:function(C,D){var self;
var E=qx.io2.ImageLoader;
{};
if(!E.isFailed(D)){E.load(D,this.__hR,this);
}else{if(C!=null){C.resetSource();
}}},__hR:function(F,G){if(F!==qx.util.AliasManager.getInstance().resolve(this.getSource())){return;
}if(G.failed){this.warn("Image could not be loaded: "+F);
}this._styleSource();
},__hS:function(K,L){if(K!==this.__hF||L!==this.__hG){this.__hF=K;
this.__hG=L;
qx.ui.core.queue.Layout.add(this);
}}},destruct:function(){this._disposeMap(R);
}});
})();
(function(){var h="dragdrop-cursor",g="_applyAction",f="alias",e="qx.ui.core.DragDropCursor",d="move",c="singleton",b="copy";
qx.Class.define(e,{extend:qx.ui.basic.Image,include:qx.ui.core.MPlacement,type:c,construct:function(){arguments.callee.base.call(this);
this.setZIndex(1e8);
this.setDomMove(true);
var a=this.getApplicationRoot();
a.add(this,{left:-1000,top:-1000});
},properties:{appearance:{refine:true,init:h},action:{check:[f,b,d],apply:g,nullable:true}},members:{_applyAction:function(i,j){if(j){this.removeState(j);
}
if(i){this.addState(i);
}}}});
})();
(function(){var f="interval",e="Number",d="_applyTimeoutInterval",c="qx.event.type.Event",b="qx.event.Idle",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,construct:function(){arguments.callee.base.call(this);
var g=new qx.event.Timer(this.getTimeoutInterval());
g.addListener(f,this._onInterval,this);
g.start();
this.__hT=g;
},events:{"interval":c},properties:{timeoutInterval:{check:e,init:100,apply:d}},members:{__hT:null,_applyTimeoutInterval:function(h){this.__hT.setInterval(h);
},_onInterval:function(){this.fireEvent(f);
}},destruct:function(){if(this.__hT){this.__hT.stop();
}this.__hT=null;
}});
})();
(function(){var H="top",G="right",F="bottom",E="left",D="align-start",C="qx.util.placement.AbstractAxis",B="edge-start",A="align-end",z="edge-end",y="-",v="best-fit",x="qx.util.placement.Placement",w="keep-align",u="direct",t='__hU';
qx.Class.define(x,{extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__hU=new qx.util.placement.DirectAxis();
},properties:{axisX:{check:C},axisY:{check:C},edge:{check:[H,G,F,E],init:H},align:{check:[H,G,F,E],init:G}},statics:{__hV:null,compute:function(c,d,e,f,g,h,i){this.__hV=this.__hV||new qx.util.placement.Placement();
var l=g.split(y);
var k=l[0];
var j=l[1];
this.__hV.set({axisX:this.__ia(h),axisY:this.__ia(i),edge:k,align:j});
return this.__hV.compute(c,d,e,f);
},__hW:null,__hX:null,__hY:null,__ia:function(K){switch(K){case u:this.__hW=this.__hW||new qx.util.placement.DirectAxis();
return this.__hW;
case w:this.__hX=this.__hX||new qx.util.placement.KeepAlignAxis();
return this.__hX;
case v:this.__hY=this.__hY||new qx.util.placement.BestFitAxis();
return this.__hY;
default:throw new Error("Invalid 'mode' argument!'");
}}},members:{__hU:null,compute:function(m,n,o,p){{};
var q=this.getAxisX()||this.__hU;
var s=q.computeStart(m.width,{start:o.left,end:o.right},{start:p.left,end:p.right},n.width,this.__ib());
var r=this.getAxisY()||this.__hU;
var top=r.computeStart(m.height,{start:o.top,end:o.bottom},{start:p.top,end:p.bottom},n.height,this.__ic());
return {left:s,top:top};
},__ib:function(){var J=this.getEdge();
var I=this.getAlign();

if(J==E){return B;
}else if(J==G){return z;
}else if(I==E){return D;
}else if(I==G){return A;
}},__ic:function(){var b=this.getEdge();
var a=this.getAlign();

if(b==H){return B;
}else if(b==F){return z;
}else if(a==H){return D;
}else if(a==F){return A;
}}},destruct:function(){this._disposeObjects(t);
}});
})();
(function(){var h="edge-start",g="align-start",f="align-end",e="edge-end",d="qx.util.placement.AbstractAxis";
qx.Class.define(d,{extend:qx.core.Object,members:{computeStart:function(i,j,k,l,m){throw new Error("abstract method call!");
},_moveToEdgeAndAlign:function(n,o,p,q){switch(q){case h:return o.start-p.end-n;
case e:return o.end+p.start;
case g:return o.start+p.start;
case f:return o.end-p.end-n;
}},_isInRange:function(a,b,c){return a>=0&&a+b<=c;
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
(function(){var h="mousedown",g="blur",f="__id",d="singleton",c="qx.ui.popup.Manager";
qx.Class.define(c,{type:d,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__id={};
qx.event.Registration.addListener(document.documentElement,h,this.__if,this,true);
qx.bom.Element.addListener(window,g,this.hideAll,this);
},members:{__id:null,add:function(l){{};
this.__id[l.$$hash]=l;
this.__ie();
},remove:function(a){{};
var b=this.__id;

if(b){delete b[a.$$hash];
this.__ie();
}},hideAll:function(){var n=this.__id;

if(n){for(var m in n){n[m].exclude();
}}},__ie:function(){var k=1e7;
var j=this.__id;

for(var i in j){j[i].setZIndex(k++);
}},__if:function(e){var q=qx.ui.core.Widget.getWidgetByElement(e.getTarget());
var r=this.__id;

for(var p in r){var o=r[p];

if(!o.getAutoHide()||q==o||qx.ui.core.Widget.contains(o,q)){continue;
}o.exclude();
}}},destruct:function(){qx.event.Registration.removeListener(document.documentElement,h,this.__if,this,true);
this._disposeMap(f);
}});
})();
(function(){var b="abstract",a="qx.ui.layout.Abstract";
qx.Class.define(a,{type:b,extend:qx.core.Object,members:{__ig:null,_invalidChildrenCache:null,__ih:null,invalidateLayoutCache:function(){this.__ig=null;
},renderLayout:function(c,d){this.warn("Missing renderLayout() implementation!");
},getSizeHint:function(){if(this.__ig){return this.__ig;
}return this.__ig=this._computeSizeHint();
},hasHeightForWidth:function(){return false;
},getHeightForWidth:function(i){this.warn("Missing getHeightForWidth() implementation!");
return null;
},_computeSizeHint:function(){return null;
},invalidateChildrenCache:function(){this._invalidChildrenCache=true;
},verifyLayoutProperty:null,_clearSeparators:function(){var e=this.__ih;

if(e instanceof qx.ui.core.LayoutItem){e.clearSeparators();
}},_renderSeparator:function(g,h){this.__ih.renderSeparator(g,h);
},connectToWidget:function(f){if(f&&this.__ih){throw new Error("It is not possible to manually set the connected widget.");
}this.__ih=f;
this.invalidateChildrenCache();
},_getWidget:function(){return this.__ih;
},_applyLayoutChange:function(){if(this.__ih){this.__ih.scheduleLayoutUpdate();
}},_getLayoutChildren:function(){return this.__ih.getLayoutChildren();
}},destruct:function(){this.__ih=this.__ig=null;
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
(function(){var w="label",v="icon",u="Boolean",t="left",s="both",r="String",q="_applyRich",p="_applyIcon",o="changeGap",n="_applyShow",g="right",m="_applyCenter",j="_applyIconPosition",e="qx.ui.basic.Atom",d="top",i="changeShow",h="bottom",k="_applyLabel",c="Integer",l="_applyGap",f="atom";
qx.Class.define(e,{extend:qx.ui.core.Widget,construct:function(a,b){{};
arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.Atom());

if(a!=null){this.setLabel(a);
}
if(b!=null){this.setIcon(b);
}},properties:{appearance:{refine:true,init:f},label:{apply:k,nullable:true,dispose:true,check:r},rich:{check:u,init:false,apply:q},icon:{check:r,apply:p,nullable:true,themeable:true},gap:{check:c,nullable:false,event:o,apply:l,themeable:true,init:4},show:{init:s,check:[s,w,v],themeable:true,inheritable:true,apply:n,event:i},iconPosition:{init:t,check:[d,g,h,t],themeable:true,apply:j},center:{init:false,check:u,themeable:true,apply:m}},members:{_createChildControlImpl:function(O){var P;

switch(O){case w:P=new qx.ui.basic.Label(this.getLabel());
P.setAnonymous(true);
P.setRich(this.getRich());
this._add(P);

if(this.getLabel()==null||this.getShow()===v){P.exclude();
}break;
case v:P=new qx.ui.basic.Image(this.getIcon());
P.setAnonymous(true);
this._addAt(P,0);

if(this.getIcon()==null||this.getShow()===w){P.exclude();
}break;
}return P||arguments.callee.base.call(this,O);
},_forwardStates:{focused:true,hovered:true},_handleLabel:function(){if(this.getLabel()==null||this.getShow()===v){this._excludeChildControl(w);
}else{this._showChildControl(w);
}},_handleIcon:function(){if(this.getIcon()==null||this.getShow()===w){this._excludeChildControl(v);
}else{this._showChildControl(v);
}},_applyLabel:function(G,H){var I=this.getChildControl(w,true);

if(I){I.setValue(G);
}this._handleLabel();
},_applyRich:function(J,K){var L=this.getChildControl(w,true);

if(L){L.setRich(J);
}},_applyIcon:function(D,E){var F=this.getChildControl(v,true);

if(F){F.setSource(D);
}this._handleIcon();
},_applyGap:function(B,C){this._getLayout().setGap(B);
},_applyShow:function(x,y){this._handleLabel();
this._handleIcon();
},_applyIconPosition:function(M,N){this._getLayout().setIconPosition(M);
},_applyCenter:function(z,A){this._getLayout().setCenter(z);
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
(function(){var A="middle",z="qx.ui.layout.Util",y="left",x="center",w="top",v="bottom",u="right";
qx.Class.define(z,{statics:{PERCENT_VALUE:/[0-9]+(?:\.[0-9]+)?%/,computeFlexOffsets:function(g,h,j){var m,q,k,r;
var n=h>j;
var s=Math.abs(h-j);
var t,o;
var p={};

for(q in g){m=g[q];
p[q]={potential:n?m.max-m.value:m.value-m.min,flex:n?m.flex:1/m.flex,offset:0};
}while(s!=0){r=Infinity;
k=0;

for(q in p){m=p[q];

if(m.potential>0){k+=m.flex;
r=Math.min(r,m.potential/m.flex);
}}if(k==0){break;
}r=Math.min(s,r*k)/k;
t=0;

for(q in p){m=p[q];

if(m.potential>0){o=Math.min(s,m.potential,Math.ceil(r*m.flex));
t+=o-r*m.flex;

if(t>=1){t-=1;
o-=1;
}m.potential-=o;

if(n){m.offset+=o;
}else{m.offset-=o;
}s-=o;
}}}return p;
},computeHorizontalAlignOffset:function(J,K,L,M,N){if(M==null){M=0;
}
if(N==null){N=0;
}var O=0;

switch(J){case y:O=M;
break;
case u:O=L-K-N;
break;
case x:O=Math.round((L-K)/2);
if(O<M){O=M;
}else if(O<N){O=Math.max(M,L-K-N);
}break;
}return O;
},computeVerticalAlignOffset:function(bg,bh,bi,bj,bk){if(bj==null){bj=0;
}
if(bk==null){bk=0;
}var bl=0;

switch(bg){case w:bl=bj;
break;
case v:bl=bi-bh-bk;
break;
case A:bl=Math.round((bi-bh)/2);
if(bl<bj){bl=bj;
}else if(bl<bk){bl=Math.max(bj,bi-bh-bk);
}break;
}return bl;
},collapseMargins:function(B){var C=0,E=0;

for(var i=0,l=arguments.length;i<l;i++){var D=arguments[i];

if(D<0){E=Math.min(E,D);
}else if(D>0){C=Math.max(C,D);
}}return C+E;
},computeHorizontalGaps:function(bm,bn,bo){if(bn==null){bn=0;
}var bp=0;

if(bo){bp+=bm[0].getMarginLeft();

for(var i=1,l=bm.length;i<l;i+=1){bp+=this.collapseMargins(bn,bm[i-1].getMarginRight(),bm[i].getMarginLeft());
}bp+=bm[l-1].getMarginRight();
}else{for(var i=1,l=bm.length;i<l;i+=1){bp+=bm[i].getMarginLeft()+bm[i].getMarginRight();
}bp+=(bn*(l-1));
}return bp;
},computeVerticalGaps:function(F,G,H){if(G==null){G=0;
}var I=0;

if(H){I+=F[0].getMarginTop();

for(var i=1,l=F.length;i<l;i+=1){I+=this.collapseMargins(G,F[i-1].getMarginBottom(),F[i].getMarginTop());
}I+=F[l-1].getMarginBottom();
}else{for(var i=1,l=F.length;i<l;i+=1){I+=F[i].getMarginTop()+F[i].getMarginBottom();
}I+=(G*(l-1));
}return I;
},computeHorizontalSeparatorGaps:function(X,Y,ba){var bd=qx.theme.manager.Decoration.getInstance().resolve(ba);
var bc=bd.getInsets();
var bb=bc.left+bc.right;
var be=0;

for(var i=0,l=X.length;i<l;i++){var bf=X[i];
be+=bf.getMarginLeft()+bf.getMarginRight();
}be+=(Y+bb+Y)*(l-1);
return be;
},computeVerticalSeparatorGaps:function(P,Q,R){var U=qx.theme.manager.Decoration.getInstance().resolve(R);
var T=U.getInsets();
var S=T.top+T.bottom;
var V=0;

for(var i=0,l=P.length;i<l;i++){var W=P[i];
V+=W.getMarginTop()+W.getMarginBottom();
}V+=(Q+S+Q)*(l-1);
return V;
},arrangeIdeals:function(a,b,c,d,e,f){if(b<a||e<d){if(b<a&&e<d){b=a;
e=d;
}else if(b<a){e-=(a-b);
b=a;
if(e<d){e=d;
}}else if(e<d){b-=(d-e);
e=d;
if(b<a){b=a;
}}}
if(b>c||e>f){if(b>c&&e>f){b=c;
e=f;
}else if(b>c){e+=(b-c);
b=c;
if(e>f){e=f;
}}else if(e>f){b+=(e-f);
e=f;
if(b>c){b=c;
}}}return {begin:b,end:e};
}}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IStringForm";
qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var m="qx.dynlocale",l="text",k="qx.client",j="color",i="userSelect",h="changeLocale",g="enabled",f="none",d="on",c="_applyTextAlign",G="Boolean",F="qx.ui.core.Widget",E="gecko",D="changeTextAlign",C="changeValue",B="changeContent",A="qx.ui.basic.Label",z="A",y="_applyValue",x="center",t="_applyBuddy",u="String",r="textAlign",s="right",p="changeRich",q="_applyRich",n="click",o="label",v="webkit",w="left";
qx.Class.define(A,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(ba){arguments.callee.base.call(this);

if(ba!=null){this.setValue(ba);
}
if(qx.core.Variant.isSet(m,d)){qx.locale.Manager.getInstance().addListener(h,this._onChangeLocale,this);
}},properties:{rich:{check:G,init:false,event:p,apply:q},value:{check:u,apply:y,event:C,nullable:true},buddy:{check:F,apply:t,nullable:true,init:null},textAlign:{check:[w,x,s],nullable:true,themeable:true,apply:c,event:D},appearance:{refine:true,init:o},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__ii:null,__ij:null,__ik:null,__il:null,_getContentHint:function(){if(this.__ij){this.__im=this.__in();
delete this.__ij;
}return {width:this.__im.width,height:this.__im.height};
},_hasHeightForWidth:function(){return this.getRich();
},_applySelectable:function(I){if(qx.core.Variant.isSet(k,E)){if(I&&!this.isRich()){{};
return;
}}arguments.callee.base.call(this,I);
if(qx.core.Variant.isSet(k,v)){this.getContainerElement().setStyle(i,I?l:f);
this.getContentElement().setStyle(i,I?l:f);
}},_getContentHeightForWidth:function(O){if(!this.getRich()){return null;
}return this.__in(O).height;
},_createContentElement:function(){return new qx.html.Label;
},_applyTextAlign:function(a,b){this.getContentElement().setStyle(r,a);
},_applyTextColor:function(V,W){if(V){this.getContentElement().setStyle(j,qx.theme.manager.Color.getInstance().resolve(V));
}else{this.getContentElement().removeStyle(j);
}},__im:{width:0,height:0},_applyFont:function(P,Q){var R;

if(P){this.__ii=qx.theme.manager.Font.getInstance().resolve(P);
R=this.__ii.getStyles();
}else{this.__ii=null;
R=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(R);
this.__ij=true;
qx.ui.core.queue.Layout.add(this);
},__in:function(J){var N=qx.bom.Label;
var L=this.getFont();
var K=L?this.__ii.getStyles():qx.bom.Font.getDefaultStyles();
var content=this.getValue()||z;
var M=this.getRich();
return M?N.getHtmlSize(content,K,J):N.getTextSize(content,K);
},_applyBuddy:function(X,Y){if(Y!=null){Y.removeBinding(this.__ik);
this.__ik=null;
this.removeListenerById(this.__il);
this.__il=null;
}
if(X!=null){this.__ik=X.bind(g,this,g);
this.__il=this.addListener(n,X.focus,X);
}},_applyRich:function(H){this.getContentElement().setRich(H);
this.__ij=true;
qx.ui.core.queue.Layout.add(this);
},_onChangeLocale:qx.core.Variant.select(m,{"on":function(e){var content=this.getValue();

if(content&&content.translate){this.setValue(content.translate());
}},"off":null}),_applyValue:function(T,U){this.getContentElement().setValue(T);
this.__ij=true;
qx.ui.core.queue.Layout.add(this);
this.fireDataEvent(B,T,U);
}},destruct:function(){if(qx.core.Variant.isSet(m,d)){qx.locale.Manager.getInstance().removeListener(h,this._onChangeLocale,this);
}if(this.__ik!=null){var S=this.getBuddy();

if(S!=null&&!S.isDisposed()){S.removeBinding(this.__ik);
}}this.__ii=this.__ik=null;
}});
})();
(function(){var e="value",d="Please use the getValue() method instead.",c="qx.html.Label",b="Please use the setValue() method instead.";
qx.Class.define(c,{extend:qx.html.Element,members:{__io:null,_applyProperty:function(name,i){arguments.callee.base.call(this,name,i);

if(name==e){var j=this.getDomElement();
qx.bom.Label.setValue(j,i);
}},_createDomElement:function(){var g=this.__io;
var f=qx.bom.Label.create(this._content,g);
return f;
},_copyData:function(h){return arguments.callee.base.call(this,true);
},setRich:function(l){var m=this.getDomElement();

if(m){throw new Error("The label mode cannot be modified after initial creation");
}l=!!l;

if(this.__io==l){return;
}this.__io=l;
return this;
},setValue:function(k){this._setProperty(e,k);
return this;
},getValue:function(){return this._getProperty(e);
},setContent:function(a){qx.log.Logger.deprecatedMethodWarning(arguments.callee,b);
return this.setValue(a);
},getContent:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,d);
return this.getValue();
}}});
})();
(function(){var q="qx.client",p="gecko",o="div",n="inherit",m="text",l="value",k="",j="hidden",i="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",h="nowrap",H="auto",G="ellipsis",F="normal",E="label",D="px",C="crop",B="end",A="100%",z="visible",y="qx.bom.Label",w="Please use the setValue() method instead.",x="opera",u="Please use the getValue() method instead.",v="block",s="none",t="-1000px",r="absolute";
qx.Class.define(y,{statics:{__ip:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__iq:function(){var I=this.__is(false);
document.body.insertBefore(I,document.body.firstChild);
return this._textElement=I;
},__ir:function(){var J=this.__is(true);
document.body.insertBefore(J,document.body.firstChild);
return this._htmlElement=J;
},__is:function(K){var L=qx.bom.Element.create(o);
var M=L.style;
M.width=M.height=H;
M.left=M.top=t;
M.visibility=j;
M.position=r;
M.overflow=z;

if(K){M.whiteSpace=F;
}else{M.whiteSpace=h;

if(qx.core.Variant.isSet(q,p)){var N=document.createElementNS(i,E);
for(var O in this.__ip){N.style[O]=n;
}L.appendChild(N);
}}return L;
},__it:function(U){var V={};

if(U){V.whiteSpace=F;
}else if(qx.core.Variant.isSet(q,p)){V.display=v;
}else{V.overflow=j;
V.whiteSpace=h;
V.textOverflow=G;
V.userSelect=s;
if(qx.core.Variant.isSet(q,x)){V.OTextOverflow=G;
}}return V;
},create:function(content,W,X){if(!X){X=window;
}
if(W){var Y=X.document.createElement(o);
Y.useHtml=true;
}else if(qx.core.Variant.isSet(q,p)){var Y=X.document.createElement(o);
var ba=X.document.createElementNS(i,E);
ba.style.cursor=n;
ba.style.color=n;
ba.style.overflow=j;
ba.style.maxWidth=A;
for(var bb in this.__ip){ba.style[bb]=n;
}ba.setAttribute(C,B);
Y.appendChild(ba);
}else{var Y=X.document.createElement(o);
qx.bom.element.Style.setStyles(Y,this.__it(W));
}
if(content){this.setValue(Y,content);
}return Y;
},setValue:function(P,Q){Q=Q||k;

if(P.useHtml){P.innerHTML=Q;
}else if(qx.core.Variant.isSet(q,p)){P.firstChild.setAttribute(l,Q);
}else{qx.bom.element.Attribute.set(P,m,Q);
}},getValue:function(a){if(a.useHtml){return a.innerHTML;
}else if(qx.core.Variant.isSet(q,p)){return a.firstChild.getAttribute(l)||k;
}else{return qx.bom.element.Attribute.get(a,m);
}},getHtmlSize:function(content,be,bf){var bg=this._htmlElement||this.__ir();
bg.style.width=bf!==undefined?bf+D:H;
bg.innerHTML=content;
return this.__iu(bg,be);
},getTextSize:function(R,S){var T=this._textElement||this.__iq();

if(qx.core.Variant.isSet(q,p)){T.firstChild.setAttribute(l,R);
}else{qx.bom.element.Attribute.set(T,m,R);
}return this.__iu(T,S);
},__iu:function(c,d){var e=this.__ip;

if(!d){d={};
}
for(var f in e){c.style[f]=d[f]||k;
}var g=qx.bom.element.Dimension.getSize(c);

if(qx.core.Variant.isSet(q,p)){if(!qx.bom.client.Platform.WIN){g.width++;
}}return g;
},setContent:function(bc,bd){qx.log.Logger.deprecatedMethodWarning(arguments.callee,w);
this.setValue(bc,bd);
},getContent:function(b){qx.log.Logger.deprecatedMethodWarning(arguments.callee,u);
return this.getValue(b);
}}});
})();
(function(){var r="mshtml",q="qx.client",p="qx.bom.element.Dimension",o="paddingRight",n="paddingLeft",m="paddingTop",l="paddingBottom";
qx.Class.define(p,{statics:{getWidth:qx.core.Variant.select(q,{"gecko":function(i){if(i.getBoundingClientRect){var j=i.getBoundingClientRect();
return Math.round(j.right)-Math.round(j.left);
}else{return i.offsetWidth;
}},"default":function(C){return C.offsetWidth;
}}),getHeight:qx.core.Variant.select(q,{"gecko":function(A){if(A.getBoundingClientRect){var B=A.getBoundingClientRect();
return Math.round(B.bottom)-Math.round(B.top);
}else{return A.offsetHeight;
}},"default":function(a){return a.offsetHeight;
}}),getSize:function(k){return {width:this.getWidth(k),height:this.getHeight(k)};
},__iv:{visible:true,hidden:true},getContentWidth:function(t){var v=qx.bom.element.Style;
var w=qx.bom.element.Overflow.getX(t);
var x=parseInt(v.get(t,n),10);
var z=parseInt(v.get(t,o),10);

if(this.__iv[w]){return t.clientWidth-x-z;
}else{if(t.clientWidth>=t.scrollWidth){return Math.max(t.clientWidth,t.scrollWidth)-x-z;
}else{var y=t.scrollWidth-x;
var u=qx.bom.client.Engine;

if(u.NAME===r&&u.VERSION==6){y-=z;
}return y;
}}},getContentHeight:function(b){var d=qx.bom.element.Style;
var f=qx.bom.element.Overflow.getY(b);
var g=parseInt(d.get(b,m),10);
var e=parseInt(d.get(b,l),10);

if(this.__iv[f]){return b.clientHeight-g-e;
}else{if(b.clientHeight>=b.scrollHeight){return Math.max(b.clientHeight,b.scrollHeight)-g-e;
}else{var h=b.scrollHeight-g;
var c=qx.bom.client.Engine;

if(c.NAME===r&&c.VERSION==6){h-=e;
}return h;
}}},getContentSize:function(s){return {width:this.getContentWidth(s),height:this.getContentHeight(s)};
}}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IForm";
qx.Interface.define(a,{events:{"changeEnabled":b,"changeValid":b,"changeInvalidMessage":b,"changeRequired":b},members:{setEnabled:function(c){return arguments.length==1;
},getEnabled:function(){},setRequired:function(f){return arguments.length==1;
},getRequired:function(){},setValid:function(d){return arguments.length==1;
},getValid:function(){},setInvalidMessage:function(e){return arguments.length==1;
},getInvalidMessage:function(){}}});
})();
(function(){var j="Use 'getBlocker().getContentBlockerElement()' instead.",i="Use 'getBlocker().getBlockerElement()' instead.",h="_applyBlockerColor",g="Number",f="__iw",e="qx.ui.core.MBlocker",d="_applyBlockerOpacity",c="Color";
qx.Mixin.define(e,{construct:function(){this.__iw=new qx.ui.core.Blocker(this);
},properties:{blockerColor:{check:c,init:null,nullable:true,apply:h,themeable:true},blockerOpacity:{check:g,init:1,apply:d,themeable:true}},members:{__iw:null,_applyBlockerColor:function(k,l){this.__iw.setColor(k);
},_applyBlockerOpacity:function(a,b){this.__iw.setOpacity(a);
},block:function(){this.__iw.block();
},isBlocked:function(){return this.__iw.isBlocked();
},unblock:function(){this.__iw.unblock();
},forceUnblock:function(){this.__iw.forceUnblock();
},blockContent:function(m){this.__iw.blockContent(m);
},isContentBlocked:function(){return this.__iw.isContentBlocked();
},unblockContent:function(){this.__iw.unblockContent();
},forceUnblockContent:function(){this.__iw.forceUnblockContent();
},_getContentBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,j);
return this.__iw.getContentBlockerElement();
},_getBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,i);
return this.__iw.getBlockerElement();
},getBlocker:function(){return this.__iw;
}},destruct:function(){this._disposeObjects(f);
}});
})();
(function(){var k="qx.ui.window.Window",j="changeModal",i="changeVisibility",h="changeActive",g="_applyActiveWindow",f="__ix",d="__iy",c="qx.ui.window.MDesktop";
qx.Mixin.define(c,{properties:{activeWindow:{check:k,apply:g,init:null,nullable:true}},members:{__ix:null,__iy:null,getWindowManager:function(){if(!this.__iy){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());
}return this.__iy;
},supportsMaximize:function(){return true;
},setWindowManager:function(a){if(this.__iy){this.__iy.setDesktop(null);
}a.setDesktop(this);
this.__iy=a;
},_onChangeActive:function(e){if(e.getData()){this.setActiveWindow(e.getTarget());
}else if(this.getActiveWindow()==e.getTarget()){this.setActiveWindow(null);
}},_applyActiveWindow:function(m,n){this.getWindowManager().changeActiveWindow(m,n);

if(m){m.setActive(true);
}
if(n){n.resetActive();
}},_onChangeModal:function(e){this.getWindowManager().updateStack();
},_onChangeVisibility:function(){this.getWindowManager().updateStack();
},_afterAddChild:function(b){if(qx.Class.isDefined(k)&&b instanceof qx.ui.window.Window){this._addWindow(b);
}},_addWindow:function(o){if(!qx.lang.Array.contains(this.getWindows(),o)){this.getWindows().push(o);
o.addListener(h,this._onChangeActive,this);
o.addListener(j,this._onChangeModal,this);
o.addListener(i,this._onChangeVisibility,this);
}
if(o.getActive()){this.setActiveWindow(o);
}this.getWindowManager().updateStack();
},_afterRemoveChild:function(p){if(qx.Class.isDefined(k)&&p instanceof qx.ui.window.Window){this._removeWindow(p);
}},_removeWindow:function(l){qx.lang.Array.remove(this.getWindows(),l);
l.removeListener(h,this._onChangeActive,this);
l.removeListener(j,this._onChangeModal,this);
l.removeListener(i,this._onChangeVisibility,this);
this.getWindowManager().updateStack();
},getWindows:function(){if(!this.__ix){this.__ix=[];
}return this.__ix;
}},destruct:function(){this._disposeArray(f);
this._disposeObjects(d);
}});
})();
(function(){var r="contextmenu",q="help",p="qx.client",o="changeGlobalCursor",n="abstract",m="Boolean",l="root",k="",j=" !important",i="_applyGlobalCursor",f="_applyNativeHelp",h=";",g="qx.ui.root.Abstract",d="String",c="*";
qx.Class.define(g,{type:n,extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){arguments.callee.base.call(this);
qx.ui.core.FocusHandler.getInstance().addRoot(this);
qx.ui.core.queue.Visibility.add(this);
this.initNativeHelp();
},properties:{appearance:{refine:true,init:l},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:d,nullable:true,themeable:true,apply:i,event:o},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:m,init:false,apply:f}},members:{__iz:null,isRootWidget:function(){return true;
},getLayout:function(){return this._getLayout();
},_applyGlobalCursor:qx.core.Variant.select(p,{"mshtml":function(s,t){},"default":function(u,v){var w=qx.bom.Stylesheet;
var x=this.__iz;

if(!x){this.__iz=x=w.createElement();
}w.removeAllRules(x);

if(u){w.addRule(x,c,qx.bom.element.Cursor.compile(u).replace(h,k)+j);
}}}),_applyNativeContextMenu:function(y,z){if(y){this.removeListener(r,this._onNativeContextMenu,this,true);
}else{this.addListener(r,this._onNativeContextMenu,this,true);
}},_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;
}e.preventDefault();
},_applyNativeHelp:qx.core.Variant.select(p,{"mshtml":function(A,B){if(B===false){qx.bom.Event.removeNativeListener(document,q,qx.lang.Function.returnFalse);
}
if(A===false){qx.bom.Event.addNativeListener(document,q,qx.lang.Function.returnFalse);
}},"default":function(){}})},destruct:function(){this.__iz=null;
},defer:function(a,b){qx.ui.core.MChildrenHandling.remap(b);
}});
})();
(function(){var n="resize",m="position",l="0px",k="webkit",j="$$widget",i="qx.ui.root.Application",h="hidden",g="qx.client",f="div",d="100%",c="absolute";
qx.Class.define(i,{extend:qx.ui.root.Abstract,construct:function(o){this.__iA=qx.dom.Node.getWindow(o);
this.__iB=o;
arguments.callee.base.call(this);
qx.event.Registration.addListener(this.__iA,n,this._onResize,this);
this._setLayout(new qx.ui.layout.Canvas());
qx.ui.core.queue.Layout.add(this);
qx.ui.core.FocusHandler.getInstance().connectTo(this);
this.getContentElement().disableScrolling();
},members:{__iA:null,__iB:null,_createContainerElement:function(){var p=this.__iB;

if(qx.core.Variant.isSet(g,k)){if(!p.body){alert("The application could not be started due to a missing body tag in the HTML file!");
}}var t=p.documentElement.style;
var q=p.body.style;
t.overflow=q.overflow=h;
t.padding=t.margin=q.padding=q.margin=l;
t.width=t.height=q.width=q.height=d;
var s=p.createElement(f);
p.body.appendChild(s);
var r=new qx.html.Root(s);
r.setStyle(m,c);
r.setAttribute(j,this.toHashCode());
return r;
},_onResize:function(e){qx.ui.core.queue.Layout.add(this);
},_computeSizeHint:function(){var a=qx.bom.Viewport.getWidth(this.__iA);
var b=qx.bom.Viewport.getHeight(this.__iA);
return {minWidth:a,width:a,maxWidth:a,minHeight:b,height:b,maxHeight:b};
}},destruct:function(){this.__iA=this.__iB=null;
}});
})();
(function(){var x="zIndex",w="px",v="keydown",u="deactivate",t="This method is not needed anymore.",s="resize",r="keyup",q="keypress",p="backgroundColor",o="_applyOpacity",K="Use 'getBlockerElement' instead.",J="opacity",I="interval",H="Tab",G="Color",F="qx.ui.root.Page",E="__iK",D="Use 'getContentBlockerElement' instead.",C="__iH",B="Number",z="qx.ui.core.Blocker",A="__iF",y="_applyColor";
qx.Class.define(z,{extend:qx.core.Object,construct:function(k){arguments.callee.base.call(this);
this._widget=k;
this._isPageRoot=(qx.Class.isDefined(F)&&k instanceof qx.ui.root.Page);

if(this._isPageRoot){k.addListener(s,this.__iL,this);
}this.__iC=[];
this.__iD=[];
this.__iE=[];
},properties:{color:{check:G,init:null,nullable:true,apply:y,themeable:true},opacity:{check:B,init:1,apply:o,themeable:true}},members:{__iF:null,__iG:0,__iH:null,__iE:null,__iC:null,__iD:null,__iI:null,__iJ:0,__iK:null,_isPageRoot:false,_widget:null,__iL:function(e){var M=e.getData();

if(this.isContentBlocked()){this.getContentBlockerElement().setStyles({width:M.width,height:M.height});
}
if(this.isBlocked()){this.getBlockerElement().setStyles({width:M.width,height:M.height});
}},_applyColor:function(g,h){var j=qx.theme.manager.Color.getInstance().resolve(g);
this.__iM(p,j);
},_applyOpacity:function(d,f){this.__iM(J,d);
},__iM:function(T,U){var V=[];
this.__iF&&V.push(this.__iF);
this.__iH&&V.push(this.__iH);

for(var i=0;i<V.length;i++){V[i].setStyle(T,U);
}},_saveAndSetAnonymousState:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,t);
this.__iJ+=1;

if(this.__iJ==1){this.__iI=this._widget.getAnonymous();
this._widget.setAnonymous(true);
}},_restoreAnonymousState:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,t);
this.__iJ-=1;

if(this.__iJ==0){this._widget.setAnonymous(this.__iI);
}},_backupActiveWidget:function(){var a=qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);
this.__iC.push(a.getActive());
this.__iD.push(a.getFocus());

if(this._widget.isFocusable()){this._widget.focus();
}},_restoreActiveWidget:function(){var Q=this.__iC.length;

if(Q>0){var P=this.__iC[Q-1];

if(P){qx.bom.Element.activate(P);
}this.__iC.pop();
}var O=this.__iD.length;

if(O>0){var P=this.__iD[O-1];

if(P){qx.bom.Element.focus(this.__iD[O-1]);
}this.__iD.pop();
}},__iN:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());
},_getBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,K);
return this.getBlockerElement();
},getBlockerElement:function(){if(!this.__iF){this.__iF=this.__iN();
this.__iF.setStyle(x,15);
this._widget.getContainerElement().add(this.__iF);
this.__iF.exclude();
}return this.__iF;
},block:function(){this.__iG++;

if(this.__iG<2){this._backupActiveWidget();
var L=this.getBlockerElement();
L.include();
L.activate();
L.addListener(u,this.__iS,this);
L.addListener(q,this.__iR,this);
L.addListener(v,this.__iR,this);
L.addListener(r,this.__iR,this);
}},isBlocked:function(){return this.__iG>0;
},unblock:function(){if(!this.isBlocked()){return;
}this.__iG--;

if(this.__iG<1){this.__iO();
}},forceUnblock:function(){if(!this.isBlocked()){return;
}this.__iG=0;
this.__iO();
},__iO:function(){this._restoreActiveWidget();
var n=this.getBlockerElement();
n.removeListener(u,this.__iS,this);
n.removeListener(q,this.__iR,this);
n.removeListener(v,this.__iR,this);
n.removeListener(r,this.__iR,this);
n.exclude();
},_getContentBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,D);
return this.getContentBlockerElement();
},getContentBlockerElement:function(){if(!this.__iH){this.__iH=this.__iN();
this._widget.getContentElement().add(this.__iH);
this.__iH.exclude();
}return this.__iH;
},blockContent:function(l){var m=this.getContentBlockerElement();
m.setStyle(x,l);
this.__iE.push(l);

if(this.__iE.length<2){m.include();

if(this._isPageRoot){if(!this.__iK){this.__iK=new qx.event.Timer(300);
this.__iK.addListener(I,this.__iQ,this);
}this.__iK.start();
this.__iQ();
}}},isContentBlocked:function(){return this.__iE.length>0;
},unblockContent:function(){if(!this.isContentBlocked()){return;
}this.__iE.pop();
var b=this.__iE[this.__iE.length-1];
var c=this.getContentBlockerElement();
c.setStyle(x,b);

if(this.__iE.length<1){this.__iP();
}},forceUnblockContent:function(){if(!this.isContentBlocked()){return;
}this.__iE=[];
var N=this.getContentBlockerElement();
N.setStyle(x,null);
this.__iP();
},__iP:function(){this.getContentBlockerElement().exclude();

if(this._isPageRoot){this.__iK.stop();
}},__iQ:function(){var R=this._widget.getContainerElement().getDomElement();
var S=qx.dom.Node.getDocument(R);
this.getContentBlockerElement().setStyles({height:S.documentElement.scrollHeight+w,width:S.documentElement.scrollWidth+w});
},__iR:function(e){if(e.getKeyIdentifier()==H){e.stop();
}},__iS:function(){this.getBlockerElement().activate();
}},destruct:function(){if(this._isPageRoot){this._widget.removeListener(s,this.__iL,this);
}this._disposeObjects(C,A,E);
this.__iI=this.__iC=this.__iD=this._widget=this.__iE=null;
}});
})();
(function(){var w="cursor",v="100%",u="dblclick",t="mshtml",s="mouseup",r="mousedown",q="disappear",p="appear",o="contextmenu",n="mousewheel",g=")",m="mouseover",j="mouseout",d="qx.html.Blocker",c="click",i="repeat",h="mousemove",k="url(",b="qx.client",l="qx/static/blank.gif",f="absolute";
qx.Class.define(d,{extend:qx.html.Element,construct:function(x,y){arguments.callee.base.call(this);
var x=x?qx.theme.manager.Color.getInstance().resolve(x):null;
this.setStyles({position:f,width:v,height:v,opacity:y||0,backgroundColor:x});
this.addListener(r,this._stopPropagation,this);
this.addListener(s,this._stopPropagation,this);
this.addListener(c,this._stopPropagation,this);
this.addListener(u,this._stopPropagation,this);
this.addListener(h,this._stopPropagation,this);
this.addListener(m,this._stopPropagation,this);
this.addListener(j,this._stopPropagation,this);
this.addListener(n,this._stopPropagation,this);
this.addListener(o,this._stopPropagation,this);
if(qx.core.Variant.isSet(b,t)){this.setStyles({backgroundImage:k+qx.util.ResourceManager.getInstance().toUri(l)+g,backgroundRepeat:i});
}this.addListener(p,this.__iT,this);
this.addListener(q,this.__iT,this);
},members:{_stopPropagation:function(e){e.stopPropagation();
},__iT:function(){var a=this.getStyle(w);
this.setStyle(w,null,true);
this.setStyle(w,a,true);
}}});
})();
(function(){var V="keypress",U="focusout",T="activate",S="Tab",R="singleton",Q="deactivate",P="__iU",O="focusin",N="qx.ui.core.FocusHandler";
qx.Class.define(N,{extend:qx.core.Object,type:R,construct:function(){arguments.callee.base.call(this);
this.__iU={};
},members:{__iU:null,__iV:null,__iW:null,__iX:null,connectTo:function(p){p.addListener(V,this.__iY,this);
p.addListener(O,this._onFocusIn,this,true);
p.addListener(U,this._onFocusOut,this,true);
p.addListener(T,this._onActivate,this,true);
p.addListener(Q,this._onDeactivate,this,true);
},addRoot:function(a){this.__iU[a.$$hash]=a;
},removeRoot:function(z){delete this.__iU[z.$$hash];
},getActiveWidget:function(){return this.__iV;
},isActive:function(L){return this.__iV==L;
},getFocusedWidget:function(){return this.__iW;
},isFocused:function(u){return this.__iW==u;
},isFocusRoot:function(ba){return !!this.__iU[ba.$$hash];
},_onActivate:function(e){var bi=e.getTarget();
this.__iV=bi;
var bh=this.__ja(bi);

if(bh!=this.__iX){this.__iX=bh;
}},_onDeactivate:function(e){var bg=e.getTarget();

if(this.__iV==bg){this.__iV=null;
}},_onFocusIn:function(e){var Y=e.getTarget();

if(Y!=this.__iW){this.__iW=Y;
Y.visualizeFocus();
}},_onFocusOut:function(e){var M=e.getTarget();

if(M==this.__iW){this.__iW=null;
M.visualizeBlur();
}},__iY:function(e){if(e.getKeyIdentifier()!=S){return;
}
if(!this.__iX){return;
}e.stopPropagation();
e.preventDefault();
var W=this.__iW;

if(!e.isShiftPressed()){var X=W?this.__je(W):this.__jc();
}else{var X=W?this.__jf(W):this.__jd();
}if(X){X.tabFocus();
}},__ja:function(be){var bf=this.__iU;

while(be){if(bf[be.$$hash]){return be;
}be=be.getLayoutParent();
}return null;
},__jb:function(b,c){if(b===c){return 0;
}var f=b.getTabIndex()||0;
var d=c.getTabIndex()||0;

if(f!=d){return f-d;
}var m=b.getContainerElement().getDomElement();
var k=c.getContainerElement().getDomElement();
var j=qx.bom.element.Location;
var h=j.get(m);
var g=j.get(k);
if(h.top!=g.top){return h.top-g.top;
}if(h.left!=g.left){return h.left-g.left;
}var n=b.getZIndex();
var o=c.getZIndex();

if(n!=o){return n-o;
}return 0;
},__jc:function(){return this.__ji(this.__iX,null);
},__jd:function(){return this.__jj(this.__iX,null);
},__je:function(E){var F=this.__iX;

if(F==E){return this.__jc();
}
while(E&&E.getAnonymous()){E=E.getLayoutParent();
}
if(E==null){return [];
}var G=[];
this.__jg(F,E,G);
G.sort(this.__jb);
var H=G.length;
return H>0?G[0]:this.__jc();
},__jf:function(A){var B=this.__iX;

if(B==A){return this.__jd();
}
while(A&&A.getAnonymous()){A=A.getLayoutParent();
}
if(A==null){return [];
}var C=[];
this.__jh(B,A,C);
C.sort(this.__jb);
var D=C.length;
return D>0?C[D-1]:this.__jd();
},__jg:function(parent,v,w){var x=parent.getLayoutChildren();
var y;

for(var i=0,l=x.length;i<l;i++){y=x[i];
if(!(y instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(y)&&y.isEnabled()&&y.isVisible()){if(y.isTabable()&&this.__jb(v,y)<0){w.push(y);
}this.__jg(y,v,w);
}}},__jh:function(parent,q,r){var s=parent.getLayoutChildren();
var t;

for(var i=0,l=s.length;i<l;i++){t=s[i];
if(!(t instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(t)&&t.isEnabled()&&t.isVisible()){if(t.isTabable()&&this.__jb(q,t)>0){r.push(t);
}this.__jh(t,q,r);
}}},__ji:function(parent,bb){var bc=parent.getLayoutChildren();
var bd;

for(var i=0,l=bc.length;i<l;i++){bd=bc[i];
if(!(bd instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(bd)&&bd.isEnabled()&&bd.isVisible()){if(bd.isTabable()){if(bb==null||this.__jb(bd,bb)<0){bb=bd;
}}bb=this.__ji(bd,bb);
}}return bb;
},__jj:function(parent,I){var J=parent.getLayoutChildren();
var K;

for(var i=0,l=J.length;i<l;i++){K=J[i];
if(!(K instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(K)&&K.isEnabled()&&K.isVisible()){if(K.isTabable()){if(I==null||this.__jb(K,I)>0){I=K;
}}I=this.__jj(K,I);
}}return I;
}},destruct:function(){this._disposeMap(P);
this.__iW=this.__iV=this.__iX=null;
}});
})();
(function(){var v="qx.client",u="head",t="text/css",s="stylesheet",r="}",q='@import "',p="{",o='";',n="qx.bom.Stylesheet",m="link",l="style";
qx.Class.define(n,{statics:{includeFile:function(V,W){if(!W){W=document;
}var X=W.createElement(m);
X.type=t;
X.rel=s;
X.href=qx.util.ResourceManager.getInstance().toUri(V);
var Y=W.getElementsByTagName(u)[0];
Y.appendChild(X);
},createElement:qx.core.Variant.select(v,{"mshtml":function(D){var E=document.createStyleSheet();

if(D){E.cssText=D;
}return E;
},"default":function(w){var x=document.createElement(l);
x.type=t;

if(w){x.appendChild(document.createTextNode(w));
}document.getElementsByTagName(u)[0].appendChild(x);
return x.sheet;
}}),addRule:qx.core.Variant.select(v,{"mshtml":function(be,bf,bg){be.addRule(bf,bg);
},"default":function(A,B,C){A.insertRule(B+p+C+r,A.cssRules.length);
}}),removeRule:qx.core.Variant.select(v,{"mshtml":function(ba,bb){var bc=ba.rules;
var bd=bc.length;

for(var i=bd-1;i>=0;--i){if(bc[i].selectorText==bb){ba.removeRule(i);
}}},"default":function(O,P){var Q=O.cssRules;
var R=Q.length;

for(var i=R-1;i>=0;--i){if(Q[i].selectorText==P){O.deleteRule(i);
}}}}),removeAllRules:qx.core.Variant.select(v,{"mshtml":function(e){var f=e.rules;
var g=f.length;

for(var i=g-1;i>=0;i--){e.removeRule(i);
}},"default":function(F){var G=F.cssRules;
var H=G.length;

for(var i=H-1;i>=0;i--){F.deleteRule(i);
}}}),addImport:qx.core.Variant.select(v,{"mshtml":function(I,J){I.addImport(J);
},"default":function(y,z){y.insertRule(q+z+o,y.cssRules.length);
}}),removeImport:qx.core.Variant.select(v,{"mshtml":function(a,b){var c=a.imports;
var d=c.length;

for(var i=d-1;i>=0;i--){if(c[i].href==b){a.removeImport(i);
}}},"default":function(K,L){var M=K.cssRules;
var N=M.length;

for(var i=N-1;i>=0;i--){if(M[i].href==L){K.deleteRule(i);
}}}}),removeAllImports:qx.core.Variant.select(v,{"mshtml":function(h){var j=h.imports;
var k=j.length;

for(var i=k-1;i>=0;i--){h.removeImport(i);
}},"default":function(S){var T=S.cssRules;
var U=T.length;

for(var i=U-1;i>=0;i--){if(T[i].type==T[i].IMPORT_RULE){S.deleteRule(i);
}}}})}});
})();
(function(){var u="number",t="qx.ui.layout.Canvas";
qx.Class.define(t,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(v,w){var H=this._getLayoutChildren();
var z,G,E;
var J,top,x,y,B,A;
var F,D,I,C;

for(var i=0,l=H.length;i<l;i++){z=H[i];
G=z.getSizeHint();
E=z.getLayoutProperties();
F=z.getMarginTop();
D=z.getMarginRight();
I=z.getMarginBottom();
C=z.getMarginLeft();
J=E.left!=null?E.left:E.edge;

if(qx.lang.Type.isString(J)){J=Math.round(parseFloat(J)*v/100);
}x=E.right!=null?E.right:E.edge;

if(qx.lang.Type.isString(x)){x=Math.round(parseFloat(x)*v/100);
}top=E.top!=null?E.top:E.edge;

if(qx.lang.Type.isString(top)){top=Math.round(parseFloat(top)*w/100);
}y=E.bottom!=null?E.bottom:E.edge;

if(qx.lang.Type.isString(y)){y=Math.round(parseFloat(y)*w/100);
}if(J!=null&&x!=null){B=v-J-x-C-D;
if(B<G.minWidth){B=G.minWidth;
}else if(B>G.maxWidth){B=G.maxWidth;
}J+=C;
}else{B=E.width;

if(B==null){B=G.width;
}else{B=Math.round(parseFloat(B)*v/100);
if(B<G.minWidth){B=G.minWidth;
}else if(B>G.maxWidth){B=G.maxWidth;
}}
if(x!=null){J=v-B-x-D-C;
}else if(J==null){J=C;
}else{J+=C;
}}if(top!=null&&y!=null){A=w-top-y-F-I;
if(A<G.minHeight){A=G.minHeight;
}else if(A>G.maxHeight){A=G.maxHeight;
}top+=F;
}else{A=E.height;

if(A==null){A=G.height;
}else{A=Math.round(parseFloat(A)*w/100);
if(A<G.minHeight){A=G.minHeight;
}else if(A>G.maxHeight){A=G.maxHeight;
}}
if(y!=null){top=w-A-y-I-F;
}else if(top==null){top=F;
}else{top+=F;
}}z.renderLayout(J,top,B,A);
}},_computeSizeHint:function(){var r=0,q=0;
var o=0,m=0;
var j,h;
var g,e;
var a=this._getLayoutChildren();
var d,p,c;
var s,top,b,f;

for(var i=0,l=a.length;i<l;i++){d=a[i];
p=d.getLayoutProperties();
c=d.getSizeHint();
var n=d.getMarginLeft()+d.getMarginRight();
var k=d.getMarginTop()+d.getMarginBottom();
j=c.width+n;
h=c.minWidth+n;
s=p.left!=null?p.left:p.edge;

if(s&&typeof s===u){j+=s;
h+=s;
}b=p.right!=null?p.right:p.edge;

if(b&&typeof b===u){j+=b;
h+=b;
}r=Math.max(r,j);
q=Math.max(q,h);
g=c.height+k;
e=c.minHeight+k;
top=p.top!=null?p.top:p.edge;

if(top&&typeof top===u){g+=top;
e+=top;
}f=p.bottom!=null?p.bottom:p.edge;

if(f&&typeof f===u){g+=f;
e+=f;
}o=Math.max(o,g);
m=Math.max(m,e);
}return {width:r,minWidth:q,height:o,minHeight:m};
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
(function(){var s="toolTipText",r="icon",q="label",p="qx.ui.core.MExecutable",o="value",n="qx.event.type.Event",m="execute",l="_applyCommand",k="enabled",j="menu",g="changeCommand",h="qx.ui.core.Command";
qx.Mixin.define(p,{events:{"execute":n},properties:{command:{check:h,apply:l,event:g,nullable:true}},members:{__jk:null,_bindableProperties:[k,q,r,s,o,j],execute:function(){var t=this.getCommand();

if(t){t.execute(this);
}this.fireEvent(m);
},_applyCommand:function(a,b){var e=this.__jk;

if(e==null){this.__jk=e={};
}
for(var i=0;i<this._bindableProperties.length;i++){var d=this._bindableProperties[i];
if(b!=null&&e[d]!=null){b.removeBinding(e[d]);
e[d]=null;
}if(a!=null&&qx.Class.hasProperty(this.constructor,d)){var c=a.get(d);

if(c==null){var f=this.get(d);
}e[d]=a.bind(d,this,d);
if(f){this.set(d,f);
}}}}},destruct:function(){this.__jk=null;
}});
})();
(function(){var b="qx.ui.form.IExecutable",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"execute":a},members:{setCommand:function(c){return arguments.length==1;
},getCommand:function(){},execute:function(){}}});
})();
(function(){var r="pressed",q="abandoned",p="hovered",o="Enter",n="Space",m="dblclick",l="qx.ui.form.Button",k="mouseup",j="mousedown",i="mouseover",f="mouseout",h="keydown",g="button",d="keyup";
qx.Class.define(l,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],construct:function(a,b,c){arguments.callee.base.call(this,a,b);

if(c!=null){this.setCommand(c);
}this.addListener(i,this._onMouseOver);
this.addListener(f,this._onMouseOut);
this.addListener(j,this._onMouseDown);
this.addListener(k,this._onMouseUp);
this.addListener(h,this._onKeyDown);
this.addListener(d,this._onKeyUp);
this.addListener(m,this._onStopEvent);
},properties:{appearance:{refine:true,init:g},focusable:{refine:true,init:true}},members:{_forwardStates:{focused:true,hovered:true,pressed:true,disabled:true},press:function(){if(this.hasState(q)){return;
}this.addState(r);
},release:function(){if(this.hasState(r)){this.removeState(r);
}},reset:function(){this.removeState(r);
this.removeState(q);
this.removeState(p);
},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(q)){this.removeState(q);
this.addState(r);
}this.addState(p);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(p);

if(this.hasState(r)){this.removeState(r);
this.addState(q);
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}e.stopPropagation();
this.capture();
this.removeState(q);
this.addState(r);
},_onMouseUp:function(e){this.releaseCapture();
var s=this.hasState(r);
var t=this.hasState(q);

if(s){this.removeState(r);
}
if(t){this.removeState(q);
}else{this.addState(p);

if(s){this.execute();
}}e.stopPropagation();
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case o:case n:this.removeState(q);
this.addState(r);
e.stopPropagation();
}},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case o:case n:if(this.hasState(r)){this.removeState(q);
this.removeState(r);
this.execute();
e.stopPropagation();
}}}}});
})();


qx.$$loader.init();

