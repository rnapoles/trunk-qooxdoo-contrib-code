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
  packageHashes : {"0":"42d212621a38"},
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

qx.$$packageData['42d212621a38']={"resources":{"gui4/test.png":[32,32,"png","gui4"],"qx/decoration/Modern/app-header.png":[110,20,"png","qx"],"qx/decoration/Modern/arrows-combined.png":[87,8,"png","qx"],"qx/decoration/Modern/arrows/down-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-61,0],"qx/decoration/Modern/arrows/down-small-invert.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-10,0],"qx/decoration/Modern/arrows/down-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-82,0],"qx/decoration/Modern/arrows/down.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-74,0],"qx/decoration/Modern/arrows/forward.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-43,0],"qx/decoration/Modern/arrows/left-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-30,0],"qx/decoration/Modern/arrows/left.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",0,0],"qx/decoration/Modern/arrows/rewind.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-20,0],"qx/decoration/Modern/arrows/right-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-15,0],"qx/decoration/Modern/arrows/right.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-5,0],"qx/decoration/Modern/arrows/up-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-53,0],"qx/decoration/Modern/arrows/up-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-69,0],"qx/decoration/Modern/arrows/up.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-35,0],"qx/decoration/Modern/button-lr-combined.png":[72,52,"png","qx"],"qx/decoration/Modern/button-tb-combined.png":[4,216,"png","qx"],"qx/decoration/Modern/checkradio-combined.png":[504,14,"png","qx"],"qx/decoration/Modern/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Modern/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Modern/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",0,0],"qx/decoration/Modern/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Modern/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",-35,0],"qx/decoration/Modern/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Modern/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-33,0],"qx/decoration/Modern/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-52,0],"qx/decoration/Modern/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-20,0],"qx/decoration/Modern/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Modern/cursors-combined.gif",0,0],"qx/decoration/Modern/form/button-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-60],"qx/decoration/Modern/form/button-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-140],"qx/decoration/Modern/form/button-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-20],"qx/decoration/Modern/form/button-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-checked-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-176],"qx/decoration/Modern/form/button-checked-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-76],"qx/decoration/Modern/form/button-checked-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-188],"qx/decoration/Modern/form/button-checked-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-136],"qx/decoration/Modern/form/button-checked-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-148],"qx/decoration/Modern/form/button-checked-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-4],"qx/decoration/Modern/form/button-checked-focused-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-48,0],"qx/decoration/Modern/form/button-checked-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-12,0],"qx/decoration/Modern/form/button-checked-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-184],"qx/decoration/Modern/form/button-checked-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-68],"qx/decoration/Modern/form/button-checked-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-100],"qx/decoration/Modern/form/button-checked-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-8,0],"qx/decoration/Modern/form/button-checked-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-52,0],"qx/decoration/Modern/form/button-checked-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-104],"qx/decoration/Modern/form/button-checked-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-40],"qx/decoration/Modern/form/button-checked-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-116],"qx/decoration/Modern/form/button-disabled-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-92],"qx/decoration/Modern/form/button-disabled-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-72],"qx/decoration/Modern/form/button-disabled-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-128],"qx/decoration/Modern/form/button-disabled-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-disabled-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-28,0],"qx/decoration/Modern/form/button-disabled-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-4,0],"qx/decoration/Modern/form/button-disabled-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-120],"qx/decoration/Modern/form/button-disabled-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-164],"qx/decoration/Modern/form/button-disabled-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-208],"qx/decoration/Modern/form/button-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-172],"qx/decoration/Modern/form/button-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-88],"qx/decoration/Modern/form/button-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-16],"qx/decoration/Modern/form/button-focused-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-16,0],"qx/decoration/Modern/form/button-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-44,0],"qx/decoration/Modern/form/button-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-152],"qx/decoration/Modern/form/button-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-132],"qx/decoration/Modern/form/button-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-124],"qx/decoration/Modern/form/button-hovered-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-80],"qx/decoration/Modern/form/button-hovered-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-28],"qx/decoration/Modern/form/button-hovered-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-168],"qx/decoration/Modern/form/button-hovered-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-hovered-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-60,0],"qx/decoration/Modern/form/button-hovered-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-40,0],"qx/decoration/Modern/form/button-hovered-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-36],"qx/decoration/Modern/form/button-hovered-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-24],"qx/decoration/Modern/form/button-hovered-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-32],"qx/decoration/Modern/form/button-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-56,0],"qx/decoration/Modern/form/button-preselected-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-56],"qx/decoration/Modern/form/button-preselected-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-48],"qx/decoration/Modern/form/button-preselected-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-44],"qx/decoration/Modern/form/button-preselected-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-180],"qx/decoration/Modern/form/button-preselected-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-212],"qx/decoration/Modern/form/button-preselected-focused-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-64,0],"qx/decoration/Modern/form/button-preselected-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-96],"qx/decoration/Modern/form/button-preselected-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-8],"qx/decoration/Modern/form/button-preselected-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-204],"qx/decoration/Modern/form/button-preselected-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-20,0],"qx/decoration/Modern/form/button-preselected-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-36,0],"qx/decoration/Modern/form/button-preselected-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-196],"qx/decoration/Modern/form/button-preselected-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-52],"qx/decoration/Modern/form/button-preselected-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-112],"qx/decoration/Modern/form/button-pressed-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-108],"qx/decoration/Modern/form/button-pressed-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-144],"qx/decoration/Modern/form/button-pressed-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-160],"qx/decoration/Modern/form/button-pressed-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-pressed-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-24,0],"qx/decoration/Modern/form/button-pressed-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-32,0],"qx/decoration/Modern/form/button-pressed-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-200],"qx/decoration/Modern/form/button-pressed-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-64],"qx/decoration/Modern/form/button-pressed-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-84],"qx/decoration/Modern/form/button-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-68,0],"qx/decoration/Modern/form/button-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-192],"qx/decoration/Modern/form/button-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-156],"qx/decoration/Modern/form/button-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-12],"qx/decoration/Modern/form/checkbox-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-42,0],"qx/decoration/Modern/form/checkbox-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-140,0],"qx/decoration/Modern/form/checkbox-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-196,0],"qx/decoration/Modern/form/checkbox-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-84,0],"qx/decoration/Modern/form/checkbox-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-252,0],"qx/decoration/Modern/form/checkbox-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-112,0],"qx/decoration/Modern/form/checkbox-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-406,0],"qx/decoration/Modern/form/checkbox-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-266,0],"qx/decoration/Modern/form/checkbox-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-476,0],"qx/decoration/Modern/form/checkbox-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-392,0],"qx/decoration/Modern/form/checkbox-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-294,0],"qx/decoration/Modern/form/checkbox-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-126,0],"qx/decoration/Modern/form/checkbox-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-210,0],"qx/decoration/Modern/form/checkbox-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-14,0],"qx/decoration/Modern/form/checkbox-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-168,0],"qx/decoration/Modern/form/checkbox-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-238,0],"qx/decoration/Modern/form/checkbox-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-154,0],"qx/decoration/Modern/form/checkbox.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-280,0],"qx/decoration/Modern/form/input-focused.png":[40,12,"png","qx"],"qx/decoration/Modern/form/input.png":[84,12,"png","qx"],"qx/decoration/Modern/form/radiobutton-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-420,0],"qx/decoration/Modern/form/radiobutton-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-182,0],"qx/decoration/Modern/form/radiobutton-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-336,0],"qx/decoration/Modern/form/radiobutton-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-322,0],"qx/decoration/Modern/form/radiobutton-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-462,0],"qx/decoration/Modern/form/radiobutton-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-350,0],"qx/decoration/Modern/form/radiobutton-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",0,0],"qx/decoration/Modern/form/radiobutton-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-448,0],"qx/decoration/Modern/form/radiobutton-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-434,0],"qx/decoration/Modern/form/radiobutton-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-224,0],"qx/decoration/Modern/form/radiobutton-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-56,0],"qx/decoration/Modern/form/radiobutton-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-28,0],"qx/decoration/Modern/form/radiobutton-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-378,0],"qx/decoration/Modern/form/radiobutton-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-308,0],"qx/decoration/Modern/form/radiobutton-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-70,0],"qx/decoration/Modern/form/radiobutton-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-98,0],"qx/decoration/Modern/form/radiobutton-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-364,0],"qx/decoration/Modern/form/radiobutton.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-490,0],"qx/decoration/Modern/form/tooltip-error-arrow.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-b.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-24],"qx/decoration/Modern/form/tooltip-error-bl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-br.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-30],"qx/decoration/Modern/form/tooltip-error-c.png":[20,18,"png","qx"],"qx/decoration/Modern/form/tooltip-error-l.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-r.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",-6,0],"qx/decoration/Modern/form/tooltip-error-t.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-12],"qx/decoration/Modern/form/tooltip-error-tl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-6],"qx/decoration/Modern/form/tooltip-error-tr.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-18],"qx/decoration/Modern/groupbox-lr-combined.png":[8,51,"png","qx"],"qx/decoration/Modern/groupbox-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-b.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-8],"qx/decoration/Modern/groupbox/groupbox-bl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-20],"qx/decoration/Modern/groupbox/groupbox-br.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-c.png":[20,51,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-l.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-r.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",-4,0],"qx/decoration/Modern/groupbox/groupbox-t.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-12],"qx/decoration/Modern/groupbox/groupbox-tl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-16],"qx/decoration/Modern/groupbox/groupbox-tr.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-4],"qx/decoration/Modern/menu-background-combined.png":[60,49,"png","qx"],"qx/decoration/Modern/menu-checkradio-combined.gif":[64,7,"gif","qx"],"qx/decoration/Modern/menu/background.png":[20,49,"png","qx","qx/decoration/Modern/menu-background-combined.png",0,0],"qx/decoration/Modern/menu/bar-background.png":[40,20,"png","qx","qx/decoration/Modern/menu-background-combined.png",-20,0],"qx/decoration/Modern/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-16,0],"qx/decoration/Modern/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-48,0],"qx/decoration/Modern/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-32,0],"qx/decoration/Modern/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",0,0],"qx/decoration/Modern/pane-lr-combined.png":[12,238,"png","qx"],"qx/decoration/Modern/pane-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/pane/pane-b.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-6],"qx/decoration/Modern/pane/pane-bl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,0],"qx/decoration/Modern/pane/pane-br.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-30],"qx/decoration/Modern/pane/pane-c.png":[20,238,"png","qx"],"qx/decoration/Modern/pane/pane-l.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",-6,0],"qx/decoration/Modern/pane/pane-r.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",0,0],"qx/decoration/Modern/pane/pane-t.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-24],"qx/decoration/Modern/pane/pane-tl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-18],"qx/decoration/Modern/pane/pane-tr.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-12],"qx/decoration/Modern/scrollbar-combined.png":[54,12,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-horizontal.png":[76,15,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-horizontal.png":[19,10,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-vertical.png":[10,19,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-vertical.png":[15,76,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-horizontal.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",0,0],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-vertical.png":[10,12,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-34,0],"qx/decoration/Modern/scrollbar/scrollbar-down.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-44,0],"qx/decoration/Modern/scrollbar/scrollbar-left.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-50,0],"qx/decoration/Modern/scrollbar/scrollbar-right.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-24,0],"qx/decoration/Modern/scrollbar/scrollbar-up.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-28,0],"qx/decoration/Modern/scrollbar/slider-knob-background.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-12,0],"qx/decoration/Modern/selection.png":[110,20,"png","qx"],"qx/decoration/Modern/shadow-lr-combined.png":[30,382,"png","qx"],"qx/decoration/Modern/shadow-small-lr-combined.png":[10,136,"png","qx"],"qx/decoration/Modern/shadow-small-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/shadow-tb-combined.png":[15,90,"png","qx"],"qx/decoration/Modern/shadow/shadow-b.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-75],"qx/decoration/Modern/shadow/shadow-bl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-45],"qx/decoration/Modern/shadow/shadow-br.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-c.png":[20,382,"png","qx"],"qx/decoration/Modern/shadow/shadow-l.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-r.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",-15,0],"qx/decoration/Modern/shadow/shadow-small-b.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-small-bl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-20],"qx/decoration/Modern/shadow/shadow-small-br.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-10],"qx/decoration/Modern/shadow/shadow-small-c.png":[20,136,"png","qx"],"qx/decoration/Modern/shadow/shadow-small-l.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",-5,0],"qx/decoration/Modern/shadow/shadow-small-r.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-t.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-5],"qx/decoration/Modern/shadow/shadow-small-tl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-tr.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-25],"qx/decoration/Modern/shadow/shadow-t.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-30],"qx/decoration/Modern/shadow/shadow-tl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-tr.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-60],"qx/decoration/Modern/splitpane-knobs-combined.png":[8,9,"png","qx"],"qx/decoration/Modern/splitpane/knob-horizontal.png":[1,8,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,0],"qx/decoration/Modern/splitpane/knob-vertical.png":[8,1,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,-8],"qx/decoration/Modern/table-combined.png":[74,18,"png","qx"],"qx/decoration/Modern/table/ascending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",-46,0],"qx/decoration/Modern/table/boolean-false.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-22,0],"qx/decoration/Modern/table/boolean-true.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-8,0],"qx/decoration/Modern/table/descending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",0,0],"qx/decoration/Modern/table/header-cell.png":[20,18,"png","qx","qx/decoration/Modern/table-combined.png",-54,0],"qx/decoration/Modern/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Modern/table-combined.png",-36,0],"qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png":[10,14,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-lr-combined.png":[10,12,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-pane-lr-combined.png":[60,2,"png","qx"],"qx/decoration/Modern/tabview-pane-tb-combined.png":[30,180,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-bottom-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-bottom-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-bottom-active-c.png":[20,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-l.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-r.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-bottom-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-bottom-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-c.png":[20,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-left-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-left-active-c.png":[12,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-left-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-left-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-left-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-left-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-c.png":[14,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-right-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-right-active-c.png":[12,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-right-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-right-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-right-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-right-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-c.png":[14,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-top-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-top-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-top-active-c.png":[20,12,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-l.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-top-active-r.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-top-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-top-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-c.png":[20,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tabview-pane-b.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-60],"qx/decoration/Modern/tabview/tabview-pane-bl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-br.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-120],"qx/decoration/Modern/tabview/tabview-pane-c.png":[20,2,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-l.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-r.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",-30,0],"qx/decoration/Modern/tabview/tabview-pane-t.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-150],"qx/decoration/Modern/tabview/tabview-pane-tl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-90],"qx/decoration/Modern/tabview/tabview-pane-tr.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-30],"qx/decoration/Modern/tabview/tabview-pane.png":[185,250,"png","qx"],"qx/decoration/Modern/toolbar-combined.png":[40,130,"png","qx"],"qx/decoration/Modern/toolbar/toolbar-gradient-blue.png":[20,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",0,0],"qx/decoration/Modern/toolbar/toolbar-gradient.png":[20,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",-20,0],"qx/decoration/Modern/toolbar/toolbar-handle-knob.gif":[1,8,"gif","qx"],"qx/decoration/Modern/toolbar/toolbar-part.gif":[7,1,"gif","qx"],"qx/decoration/Modern/tooltip-error-lr-combined.png":[12,18,"png","qx"],"qx/decoration/Modern/tooltip-error-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/tree-combined.png":[32,8,"png","qx"],"qx/decoration/Modern/tree/closed-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",0,0],"qx/decoration/Modern/tree/closed.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-8,0],"qx/decoration/Modern/tree/open-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-24,0],"qx/decoration/Modern/tree/open.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-16,0],"qx/decoration/Modern/window-captionbar-buttons-combined.png":[108,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-active-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-inactive-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-active-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-inactive-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-statusbar-lr-combined.png":[8,7,"png","qx"],"qx/decoration/Modern/window-statusbar-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/window/captionbar-active-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-active-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-active-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-active-c.png":[20,9,"png","qx"],"qx/decoration/Modern/window/captionbar-active-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-active-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-active-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-inactive-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-c.png":[20,9,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-inactive-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-inactive-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-inactive-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-6],"qx/decoration/Modern/window/close-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-72,0],"qx/decoration/Modern/window/close-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-54,0],"qx/decoration/Modern/window/close-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-63,0],"qx/decoration/Modern/window/maximize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-45,0],"qx/decoration/Modern/window/maximize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-81,0],"qx/decoration/Modern/window/maximize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-18,0],"qx/decoration/Modern/window/minimize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-9,0],"qx/decoration/Modern/window/minimize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-90,0],"qx/decoration/Modern/window/minimize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-36,0],"qx/decoration/Modern/window/restore-active-hovered.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-99,0],"qx/decoration/Modern/window/restore-active.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",0,0],"qx/decoration/Modern/window/restore-inactive.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-27,0],"qx/decoration/Modern/window/statusbar-b.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,0],"qx/decoration/Modern/window/statusbar-bl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-4],"qx/decoration/Modern/window/statusbar-br.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-20],"qx/decoration/Modern/window/statusbar-c.png":[20,7,"png","qx"],"qx/decoration/Modern/window/statusbar-l.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",-4,0],"qx/decoration/Modern/window/statusbar-r.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",0,0],"qx/decoration/Modern/window/statusbar-t.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-16],"qx/decoration/Modern/window/statusbar-tl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-8],"qx/decoration/Modern/window/statusbar-tr.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-12],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-color-chooser.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-document.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/22/mimetypes/office-document.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-open.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder.png":[22,22,"png","qx"],"qx/icon/Tango/32/mimetypes/office-document.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder-open.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder.png":[32,32,"png","qx"],"qx/static/blank.gif":[1,1,"gif","qx"]}};
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return "[Class "+this.classname+"]";
},createNamespace:function(name,object){var splits=name.split(".");
var parent=window;
var part=splits[0];

for(var i=0,len=splits.length-1;i<len;i++,part=splits[i]){if(!parent[part]){parent=parent[part]={};
}else{parent=parent[part];
}}parent[part]=object;
return part;
},setDisplayName:function(fcn,classname,name){fcn.displayName=classname+"."+name+"()";
},setDisplayNames:function(functionMap,classname){for(var name in functionMap){var value=functionMap[name];

if(value instanceof Function){value.displayName=classname+"."+name+"()";
}}},define:function(name,config){if(!config){var config={statics:{}};
}var clazz;
var proto=null;
qx.Bootstrap.setDisplayNames(config.statics,name);

if(config.members){qx.Bootstrap.setDisplayNames(config.members,name+".prototype");
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
clazz.$$type="Class";
if(!clazz.hasOwnProperty("toString")){clazz.toString=this.genericToString;
}if(config.defer){config.defer(clazz,proto);
}qx.Bootstrap.$$registry[name]=config.statics;
return clazz;
}};
qx.Bootstrap.define("qx.Bootstrap",{statics:{LOADSTART:qx.$$start||new Date(),createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,getByName:function(name){return this.$$registry[name];
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
},set:function(key,value){if((key.split(".")).length<2){throw new Error('Malformed settings key "'+key+'". Must be following the schema "namespace.key".');
}
if(!this.__settings[key]){this.__settings[key]={};
}this.__settings[key].value=value;
},__init:function(){if(window.qxsettings){for(var key in window.qxsettings){this.set(key,window.qxsettings[key]);
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(ex){}this.__loadUrlSettings();
}},__loadUrlSettings:function(){if(this.get("qx.allowUrlSettings")!=true){return;
}var urlSettings=document.location.search.slice(1).split("&");

for(var i=0;i<urlSettings.length;i++){var setting=urlSettings[i].split(":");

if(setting.length!=3||setting[0]!="qxsetting"){continue;
}this.set(setting[1],decodeURIComponent(setting[2]));
}}},defer:function(statics){statics.define("qx.allowUrlSettings",false);
statics.define("qx.allowUrlVariants",false);
statics.define("qx.propertyDebugLevel",0);
statics.__init();
}});
qx.Bootstrap.define("qx.bom.client.Engine",{statics:{NAME:"",FULLVERSION:"0.0.0",VERSION:0.0,OPERA:false,WEBKIT:false,GECKO:false,MSHTML:false,UNKNOWN_ENGINE:false,UNKNOWN_VERSION:false,DOCUMENT_MODE:null,__init:function(){var engine="unknown";
var version="0.0.0";
var agent=window.navigator.userAgent;
var unknownEngine=false;
var unknownVersion=false;

if(window.opera&&Object.prototype.toString.call(window.opera)=="[object Opera]"){engine="opera";
this.OPERA=true;
if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(agent)){version=RegExp.$1+"."+RegExp.$2;

if(RegExp.$3!=""){version+="."+RegExp.$3;
}}else{unknownVersion=true;
version="9.6.0";
}}else if(window.navigator.userAgent.indexOf("AppleWebKit/")!=-1){engine="webkit";
this.WEBKIT=true;

if(/AppleWebKit\/([^ ]+)/.test(agent)){version=RegExp.$1;
var invalidCharacter=RegExp("[^\\.0-9]").exec(version);

if(invalidCharacter){version=version.slice(0,invalidCharacter.index);
}}else{unknownVersion=true;
version="525.26";
}}else if(window.controllers&&window.navigator.product==="Gecko"){engine="gecko";
this.GECKO=true;
if(/rv\:([^\);]+)(\)|;)/.test(agent)){version=RegExp.$1;
}else{unknownVersion=true;
version="1.9.0.0";
}}else if(window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(agent)){engine="mshtml";
version=RegExp.$1;

if(document.documentMode){this.DOCUMENT_MODE=document.documentMode;
}if(version<8&&/Trident\/([^\);]+)(\)|;)/.test(agent)){if(RegExp.$1==="4.0"){version="8.0";
}}this.MSHTML=true;
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
window.alert("Unsupported client: "+agent+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}this.UNKNOWN_ENGINE=unknownEngine;
this.UNKNOWN_VERSION=unknownVersion;
this.NAME=engine;
this.FULLVERSION=version;
this.VERSION=parseFloat(version);
}},defer:function(statics){statics.__init();
}});
qx.Bootstrap.define("qx.core.Variant",{statics:{__variants:{},__cache:{},compilerIsSet:function(){return true;
},define:function(key,allowedValues,defaultValue){{};

if(!this.__variants[key]){this.__variants[key]={};
}else{}this.__variants[key].allowedValues=allowedValues;
this.__variants[key].defaultValue=defaultValue;
},get:function(key){var data=this.__variants[key];
{};

if(data.value!==undefined){return data.value;
}return data.defaultValue;
},__init:function(){if(window.qxvariants){for(var key in qxvariants){{};

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
}},select:function(key,variantFunctionMap){{};

for(var variant in variantFunctionMap){if(this.isSet(key,variant)){return variantFunctionMap[variant];
}}
if(variantFunctionMap["default"]!==undefined){return variantFunctionMap["default"];
}{};
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
qx.Bootstrap.define("qx.lang.Object",{statics:{empty:function(map){{};

for(var key in map){if(map.hasOwnProperty(key)){delete map[key];
}}},isEmpty:qx.core.Variant.select("qx.client",{"gecko":function(map){{};
return map.__count__===0;
},"default":function(map){{};

for(var key in map){return false;
}return true;
}}),hasMinLength:qx.core.Variant.select("qx.client",{"gecko":function(map,minLength){{};
return map.__count__>=minLength;
},"default":function(map,minLength){{};

if(minLength<=0){return true;
}var length=0;

for(var key in map){if((++length)>=minLength){return true;
}}return false;
}}),getLength:qx.core.Variant.select("qx.client",{"gecko":function(map){{};
return map.__count__;
},"default":function(map){{};
var length=0;

for(var key in map){length++;
}return length;
}}),_shadowedKeys:["isPrototypeOf","hasOwnProperty","toLocaleString","toString","valueOf"],getKeys:qx.core.Variant.select("qx.client",{"mshtml":function(map){var arr=[];

for(var key in map){arr.push(key);
}var hasOwnProperty=Object.prototype.hasOwnProperty;

for(var i=0,a=this._shadowedKeys,l=a.length;i<l;i++){if(hasOwnProperty.call(map,a[i])){arr.push(a[i]);
}}return arr;
},"default":function(map){var arr=[];

for(var key in map){arr.push(key);
}return arr;
}}),getKeysAsString:function(map){{};
var keys=qx.lang.Object.getKeys(map);

if(keys.length==0){return "";
}return '"'+keys.join('\", "')+'"';
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
qx.Bootstrap.define("qx.lang.Type",{statics:{__classToTypeMap:{"[object String]":"String","[object Array]":"Array","[object Object]":"Object","[object RegExp]":"RegExp","[object Number]":"Number","[object Boolean]":"Boolean","[object Date]":"Date","[object Function]":"Function","[object Error]":"Error"},getClass:function(value){var classString=Object.prototype.toString.call(value);
return (this.__classToTypeMap[classString]||classString.slice(8,-1));
},isString:function(value){return (value!==null&&(typeof value==="string"||this.getClass(value)=="String"||value instanceof String||(!!value&&!!value.$$isString)));
},isArray:function(value){return (value!==null&&(value instanceof Array||(value&&qx.Class.hasInterface(value.constructor,qx.data.IListData))||this.getClass(value)=="Array"||(!!value&&!!value.$$isArray)));
},isObject:function(value){return (value!==undefined&&value!==null&&this.getClass(value)=="Object");
},isRegExp:function(value){return this.getClass(value)=="RegExp";
},isNumber:function(value){return (value!==null&&(this.getClass(value)=="Number"||value instanceof Number));
},isBoolean:function(value){return (value!==null&&(this.getClass(value)=="Boolean"||value instanceof Boolean));
},isDate:function(value){return (value!==null&&(this.getClass(value)=="Date"||value instanceof Date));
},isError:function(value){return (value!==null&&(this.getClass(value)=="Error"||value instanceof Error));
},isFunction:function(value){return this.getClass(value)=="Function";
}}});
qx.Bootstrap.define("qx.core.Aspect",{statics:{__registry:[],wrap:function(fullName,fcn,type){var before=[];
var after=[];
var reg=this.__registry;
var entry;

for(var i=0;i<reg.length;i++){entry=reg[i];

if((entry.type==null||type==entry.type||entry.type=="*")&&(entry.name==null||fullName.match(entry.name))){entry.pos==-1?before.push(entry.fcn):after.push(entry.fcn);
}}
if(before.length===0&&after.length===0){return fcn;
}var wrapper=function(){for(var i=0;i<before.length;i++){before[i].call(this,fullName,fcn,type,arguments);
}var ret=fcn.apply(this,arguments);

for(var i=0;i<after.length;i++){after[i].call(this,fullName,fcn,type,arguments,ret);
}return ret;
};

if(type!=="static"){wrapper.self=fcn.self;
wrapper.base=fcn.base;
}fcn.wrapper=wrapper;
wrapper.original=fcn;
return wrapper;
},addAdvice:function(fcn,position,type,name){this.__registry.push({fcn:fcn,pos:position==="before"?-1:1,type:type,name:name});
}}});
qx.Bootstrap.define("qx.Class",{statics:{define:function(name,config){if(!config){var config={};
}if(config.include&&!(config.include instanceof Array)){config.include=[config.include];
}if(config.implement&&!(config.implement instanceof Array)){config.implement=[config.implement];
}if(!config.hasOwnProperty("extend")&&!config.type){config.type="static";
}{};
var clazz=this.__createClass(name,config.type,config.extend,config.statics,config.construct,config.destruct);
if(config.extend){if(config.properties){this.__addProperties(clazz,config.properties,true);
}if(config.members){this.__addMembers(clazz,config.members,true,true,false);
}if(config.events){this.__addEvents(clazz,config.events,true);
}if(config.include){for(var i=0,l=config.include.length;i<l;i++){this.__addMixin(clazz,config.include[i],false);
}}}if(config.settings){for(var key in config.settings){qx.core.Setting.define(key,config.settings[key]);
}}if(config.variants){for(var key in config.variants){qx.core.Variant.define(key,config.variants[key].allowedValues,config.variants[key].defaultValue);
}}if(config.implement){for(var i=0,l=config.implement.length;i<l;i++){this.__addInterface(clazz,config.implement[i]);
}}{};
if(config.defer){config.defer.self=clazz;
config.defer(clazz,clazz.prototype,{add:function(name,config){var properties={};
properties[name]=config;
qx.Class.__addProperties(clazz,properties,true);
}});
}return clazz;
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},getByName:function(name){return this.$$registry[name];
},include:function(clazz,mixin){{};
qx.Class.__addMixin(clazz,mixin,false);
},patch:function(clazz,mixin){{};
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
},$$registry:qx.Bootstrap.$$registry,__allowedKeys:null,__staticAllowedKeys:null,__validateConfig:function(){},__validateAbstractInterfaces:function(){},__createClass:function(name,type,extend,statics,construct,destruct){var clazz;

if(!extend&&qx.core.Variant.isSet("qx.aspects","off")){clazz=statics||{};
qx.Bootstrap.setDisplayNames(clazz,name);
}else{clazz={};

if(extend){if(!construct){construct=this.__createDefaultConstructor();
}clazz=this.__wrapConstructor(construct,name,type);
qx.Bootstrap.setDisplayName(construct,name,"constructor");
}if(statics){qx.Bootstrap.setDisplayNames(statics,name);
var key;

for(var i=0,a=qx.lang.Object.getKeys(statics),l=a.length;i<l;i++){key=a[i];
var staticValue=statics[key];

if(qx.core.Variant.isSet("qx.aspects","on")){if(staticValue instanceof Function){staticValue=qx.core.Aspect.wrap(name+"."+key,staticValue,"static");
}clazz[key]=staticValue;
}else{clazz[key]=staticValue;
}}}}var basename=qx.Bootstrap.createNamespace(name,clazz,false);
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
if(destruct){if(qx.core.Variant.isSet("qx.aspects","on")){destruct=qx.core.Aspect.wrap(name,destruct,"destructor");
}clazz.$$destructor=destruct;
qx.Bootstrap.setDisplayName(destruct,name,"destruct");
}}this.$$registry[name]=clazz;
return clazz;
},__addEvents:function(clazz,events,patch){var key,key;
{};

if(clazz.$$events){for(var key in events){clazz.$$events[key]=events[key];
}}else{clazz.$$events=events;
}},__addProperties:function(clazz,properties,patch){var config;

if(patch===undefined){patch=false;
}var attach=!!clazz.$$propertiesAttached;

for(var name in properties){config=properties[name];
{};
config.name=name;
if(!config.refine){if(clazz.$$properties===undefined){clazz.$$properties={};
}clazz.$$properties[name]=config;
}if(config.init!==undefined){clazz.prototype["$$init_"+name]=config.init;
}if(config.event!==undefined){var event={};
event[config.event]="qx.event.type.Data";
this.__addEvents(clazz,event,patch);
}if(config.inheritable){qx.core.Property.$$inheritable[name]=true;
}if(attach){qx.core.Property.attachMethods(clazz,name,config);
}}},__validateProperty:null,__addMembers:function(clazz,members,patch,base,wrap){var proto=clazz.prototype;
var key,member;
qx.Bootstrap.setDisplayNames(members,clazz.classname+".prototype");

for(var i=0,a=qx.lang.Object.getKeys(members),l=a.length;i<l;i++){key=a[i];
member=members[key];
{};
if(base!==false&&member instanceof Function&&member.$$type==null){if(wrap==true){member=this.__mixinMemberWrapper(member,proto[key]);
}else{if(proto[key]){member.base=proto[key];
}member.self=clazz;
}
if(qx.core.Variant.isSet("qx.aspects","on")){member=qx.core.Aspect.wrap(clazz.classname+"."+key,member,"member");
}}proto[key]=member;
}},__mixinMemberWrapper:function(member,base){if(base){return function(){var oldBase=member.base;
member.base=base;
var retval=member.apply(this,arguments);
member.base=oldBase;
return retval;
};
}else{return member;
}},__addInterface:function(clazz,iface){{};
var list=qx.Interface.flatten([iface]);

if(clazz.$$implements){clazz.$$implements.push(iface);
clazz.$$flatImplements.push.apply(clazz.$$flatImplements,list);
}else{clazz.$$implements=[iface];
clazz.$$flatImplements=list;
}},__addMixin:function(clazz,mixin,patch){{};

if(this.hasMixin(clazz,mixin)){return;
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
}},defer:function(statics){if(qx.core.Variant.isSet("qx.aspects","on")){for(var classname in qx.Bootstrap.$$registry){var statics=qx.Bootstrap.$$registry[classname];

for(var key in statics){if(statics[key] instanceof Function){statics[key]=qx.core.Aspect.wrap(classname+"."+key,statics[key],"static");
}}}}}});
qx.Class.define("qx.Theme",{statics:{define:function(name,config){if(!config){var config={};
}config.include=this.__normalizeArray(config.include);
config.patch=this.__normalizeArray(config.patch);
{};
var theme={$$type:"Theme",name:name,title:config.title,toString:this.genericToString};
if(config.extend){theme.supertheme=config.extend;
}theme.basename=qx.Bootstrap.createNamespace(name,theme);
this.__convert(theme,config);
this.__initializeAliases(theme,config);
this.$$registry[name]=theme;
for(var i=0,a=config.include,l=a.length;i<l;i++){this.include(theme,a[i]);
}
for(var i=0,a=config.patch,l=a.length;i<l;i++){this.patch(theme,a[i]);
}},__normalizeArray:function(objectOrArray){if(!objectOrArray){return [];
}
if(qx.lang.Type.isArray(objectOrArray)){return objectOrArray;
}else{return [objectOrArray];
}},__initializeAliases:function(theme,config){var aliases=config.aliases||{};

if(config.extend&&config.extend.aliases){qx.lang.Object.mergeWith(aliases,config.extend.aliases,false);
}theme.aliases=aliases;
},getAll:function(){return this.$$registry;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},genericToString:function(){return "[Theme "+this.name+"]";
},__extractType:function(config){for(var i=0,keys=this.__inheritableKeys,l=keys.length;i<l;i++){if(config[keys[i]]){return keys[i];
}}},__convert:function(theme,config){var type=this.__extractType(config);
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
},$$registry:{},__inheritableKeys:["colors","borders","decorations","fonts","icons","widgets","appearances","meta"],__allowedKeys:null,__metaKeys:null,__validateConfig:function(){},patch:function(theme,mixinTheme){var type=this.__extractType(mixinTheme);

if(type!==this.__extractType(theme)){throw new Error("The mixins '"+theme.name+"' are not compatible '"+mixinTheme.name+"'!");
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
qx.Theme.define("qx.theme.modern.Color",{colors:{"background-application":"#DFDFDF","background-pane":"#F3F3F3","background-light":"#FCFCFC","background-medium":"#EEEEEE","background-splitpane":"#AFAFAF","background-tip":"#ffffdd","background-tip-error":"#C72B2B","background-odd":"#E4E4E4","text-light":"#909090","text-gray":"#4a4a4a","text-label":"#1a1a1a","text-title":"#314a6e","text-input":"#000000","text-hovered":"#001533","text-disabled":"#7B7A7E","text-selected":"#fffefe","text-active":"#26364D","text-inactive":"#404955","text-placeholder":"#CBC8CD","border-main":"#4d4d4d","border-separator":"#808080","border-input":"#334866","border-disabled":"#B6B6B6","border-pane":"#00204D","border-button":"#666666","border-column":"#CCCCCC","border-focused":"#99C3FE","invalid":"#990000","border-focused-invalid":"#FF9999","table-pane":"#F3F3F3","table-focus-indicator":"#0880EF","table-row-background-focused-selected":"#084FAB","table-row-background-focused":"#80B4EF","table-row-background-selected":"#084FAB","table-row-background-even":"#F3F3F3","table-row-background-odd":"#E4E4E4","table-row-selected":"#fffefe","table-row":"#1a1a1a","table-row-line":"#CCCCCC","table-column-line":"#CCCCCC","progressive-table-header":"#AAAAAA","progressive-table-row-background-even":"#F4F4F4","progressive-table-row-background-odd":"#E4E4E4","progressive-progressbar-background":"gray","progressive-progressbar-indicator-done":"#CCCCCC","progressive-progressbar-indicator-undone":"white","progressive-progressbar-percent-background":"gray","progressive-progressbar-percent-text":"white"}});
qx.Theme.define("gui4.theme.Color",{extend:qx.theme.modern.Color,colors:{}});
qx.Bootstrap.define("qx.core.Property",{statics:{__checks:{"Boolean":'qx.core.Assert.assertBoolean(value, msg) || true',"String":'qx.core.Assert.assertString(value, msg) || true',"Number":'qx.core.Assert.assertNumber(value, msg) || true',"Integer":'qx.core.Assert.assertInteger(value, msg) || true',"PositiveNumber":'qx.core.Assert.assertPositiveNumber(value, msg) || true',"PositiveInteger":'qx.core.Assert.assertPositiveInteger(value, msg) || true',"Error":'qx.core.Assert.assertInstance(value, Error, msg) || true',"RegExp":'qx.core.Assert.assertInstance(value, RegExp, msg) || true',"Object":'qx.core.Assert.assertObject(value, msg) || true',"Array":'qx.core.Assert.assertArray(value, msg) || true',"Map":'qx.core.Assert.assertMap(value, msg) || true',"Function":'qx.core.Assert.assertFunction(value, msg) || true',"Date":'qx.core.Assert.assertInstance(value, Date, msg) || true',"Node":'value !== null && value.nodeType !== undefined',"Element":'value !== null && value.nodeType === 1 && value.attributes',"Document":'value !== null && value.nodeType === 9 && value.documentElement',"Window":'value !== null && value.document',"Event":'value !== null && value.type !== undefined',"Class":'value !== null && value.$$type === "Class"',"Mixin":'value !== null && value.$$type === "Mixin"',"Interface":'value !== null && value.$$type === "Interface"',"Theme":'value !== null && value.$$type === "Theme"',"Color":'qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',"Decorator":'value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',"Font":'value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)'},__dispose:{"Object":true,"Array":true,"Map":true,"Function":true,"Date":true,"Node":true,"Element":true,"Document":true,"Window":true,"Event":true,"Class":true,"Mixin":true,"Interface":true,"Theme":true,"Font":true,"Decorator":true},$$inherit:"inherit",$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:"string",dispose:"boolean",inheritable:"boolean",nullable:"boolean",themeable:"boolean",refine:"boolean",init:null,apply:"string",event:"string",check:null,transform:"string",deferredInit:"boolean",validate:null},$$allowedGroupKeys:{name:"string",group:"object",mode:"string",themeable:"boolean"},$$inheritable:{},refresh:function(widget){var parent=widget.getLayoutParent();

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
},attachMethods:function(clazz,name,config){config.group?this.__attachGroupMethods(clazz,config,name):this.__attachPropertyMethods(clazz,config,name);
},__attachGroupMethods:function(clazz,config,name){var upname=qx.lang.String.firstUp(name);
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
}},__attachPropertyMethods:function(clazz,config,name){var upname=qx.lang.String.firstUp(name);
var members=clazz.prototype;
{};
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
}{if(!config.nullable||config.check||config.inheritable){code.push('var prop=qx.core.Property;');
}if(variant==="set"){code.push('if(value===undefined)prop.error(this,2,"',name,'","',variant,'",value);');
}};
if(incomingValue){if(config.transform){code.push('value=this.',config.transform,'(value);');
}if(config.validate){if(typeof config.validate==="string"){code.push('this.',config.validate,'(value);');
}else if(config.validate instanceof Function){code.push(clazz.classname,'.$$properties.',name);
code.push('.validate.call(this, value);');
}}}if(hasCallback){if(incomingValue){code.push('if(this.',store,'===value)return value;');
}else if(resetValue){code.push('if(this.',store,'===undefined)return;');
}}if(config.inheritable){code.push('var inherit=prop.$$inherit;');
}{};

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
if(config.init!==undefined&&variant!=="init"){code.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{code.push('if(old===undefined)old=null;');
}code.push('if(computed===undefined||computed==inherit)computed=null;');
}else if(hasCallback){if(variant!=="set"&&variant!=="setRuntime"&&variant!=="setThemed"){code.push('if(computed===undefined)computed=null;');
}code.push('if(old===computed)return value;');
if(config.init!==undefined&&variant!=="init"){code.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{code.push('if(old===undefined)old=null;');
}}if(hasCallback){if(config.apply){code.push('this.',config.apply,'(computed, old, "',name,'");');
}if(config.event){code.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",config.event,"')){","reg.fireEvent(this, '",config.event,"', qx.event.type.Data, [computed, old]",")}");
}if(config.inheritable&&members._getChildren){code.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');
code.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');
code.push('}');
}}if(incomingValue){code.push('return value;');
}return this.__unwrapFunctionFromCode(instance,members,name,variant,code,args);
}}});
qx.Bootstrap.define("qx.core.ObjectRegistry",{statics:{inShutDown:false,__registry:{},__nextHash:0,__freeHashes:[],register:function(obj){var registry=this.__registry;

if(!registry){return;
}var hash=obj.$$hash;

if(hash==null){var cache=this.__freeHashes;

if(cache.length>0){hash=cache.pop();
}else{hash=(this.__nextHash++).toString(36);
}obj.$$hash=hash;
}{};
registry[hash]=obj;
},unregister:function(obj){var hash=obj.$$hash;

if(hash==null){return;
}var registry=this.__registry;

if(registry&&registry[hash]){delete registry[hash];
this.__freeHashes.push(hash);
}try{delete obj.$$hash;
}catch(ex){if(obj.removeAttribute){obj.removeAttribute("$$hash");
}}},toHashCode:function(obj){{};
var hash=obj.$$hash;

if(hash!=null){return hash;
}var cache=this.__freeHashes;

if(cache.length>0){hash=cache.pop();
}else{hash=(this.__nextHash++).toString(36);
}return obj.$$hash=hash;
},clearHashCode:function(obj){{};
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

if(i!==l){i++;
continue;
}}break;
}qx.log.Logger.debug(this,"Disposed "+l+" objects");
delete this.__registry;
},getRegistry:function(){return this.__registry;
}}});
qx.Bootstrap.define("qx.Mixin",{statics:{define:function(name,config){if(config){if(config.include&&!(config.include instanceof Array)){config.include=[config.include];
}{};
var mixin=config.statics?config.statics:{};
qx.Bootstrap.setDisplayNames(mixin,name);

for(var key in mixin){if(mixin[key] instanceof Function){mixin[key].$$mixin=mixin;
}}if(config.construct){mixin.$$constructor=config.construct;
qx.Bootstrap.setDisplayName(config.construct,name,"constructor");
}
if(config.include){mixin.$$includes=config.include;
}
if(config.properties){mixin.$$properties=config.properties;
}
if(config.members){mixin.$$members=config.members;
qx.Bootstrap.setDisplayNames(config.members,name+".prototype");
}
for(var key in mixin.$$members){if(mixin.$$members[key] instanceof Function){mixin.$$members[key].$$mixin=mixin;
}}
if(config.events){mixin.$$events=config.events;
}
if(config.destruct){mixin.$$destructor=config.destruct;
qx.Bootstrap.setDisplayName(config.destruct,name,"destruct");
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
},$$registry:{},__allowedKeys:null,__validateConfig:function(){}}});
qx.Mixin.define("qx.data.MBinding",{members:{bind:function(sourcePropertyChain,targetObject,targetProperty,options){return qx.data.SingleValueBinding.bind(this,sourcePropertyChain,targetObject,targetProperty,options);
},removeBinding:function(id){qx.data.SingleValueBinding.removeBindingFromObject(this,id);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
qx.Bootstrap.define("qx.bom.Event",{statics:{addNativeListener:qx.core.Variant.select("qx.client",{"mshtml":function(target,type,listener){target.attachEvent("on"+type,listener);
},"default":function(target,type,listener){target.addEventListener(type,listener,false);
}}),removeNativeListener:qx.core.Variant.select("qx.client",{"mshtml":function(target,type,listener){target.detachEvent("on"+type,listener);
},"default":function(target,type,listener){target.removeEventListener(type,listener,false);
}}),getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:qx.core.Variant.select("qx.client",{"mshtml":function(e){if(e.type==="mouseover"){return e.fromEvent;
}else{return e.toElement;
}},"gecko":function(e){try{e.relatedTarget&&e.relatedTarget.nodeType;
}catch(e){return null;
}return e.relatedTarget;
},"default":function(e){return e.relatedTarget;
}}),preventDefault:qx.core.Variant.select("qx.client",{"gecko":function(e){if(qx.bom.client.Engine.VERSION>=1.9&&e.type=="mousedown"&&e.button==2){return;
}e.preventDefault();
if(qx.bom.client.Engine.VERSION<1.9){try{e.keyCode=0;
}catch(ex){}}},"mshtml":function(e){try{e.keyCode=0;
}catch(ex){}e.returnValue=false;
},"default":function(e){e.preventDefault();
}}),stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}e.cancelBubble=true;
},fire:function(target,type){if(document.createEventObject){var evt=document.createEventObject();
return target.fireEvent("on"+type,evt);
}else{var evt=document.createEvent("HTMLEvents");
evt.initEvent(type,true,true);
return !target.dispatchEvent(evt);
}}}});
qx.Bootstrap.define("qx.event.Manager",{construct:function(win,registration){this.__window=win;
this.__registration=registration;
if(win.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(win,"unload",qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(win,"unload",arguments.callee);
self.dispose();
}));
}this.__listeners={};
this.__handlers={};
this.__dispatchers={};
this.__handlerCache={};
},statics:{__lastUnique:0,getNextUniqueId:function(){return (this.__lastUnique++).toString(36);
}},members:{__registration:null,__listeners:null,__dispatchers:null,__disposeWrapper:null,__handlers:null,__handlerCache:null,__window:null,getWindow:function(){return this.__window;
},getHandler:function(clazz){var handler=this.__handlers[clazz.classname];

if(handler){return handler;
}return this.__handlers[clazz.classname]=new clazz(this);
},getDispatcher:function(clazz){var dispatcher=this.__dispatchers[clazz.classname];

if(dispatcher){return dispatcher;
}return this.__dispatchers[clazz.classname]=new clazz(this,this.__registration);
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
}}}},hasListener:function(target,type,capture){{};
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey];

if(!targetMap){return false;
}var entryKey=type+(capture?"|capture":"|bubble");
var entryList=targetMap[entryKey];
return entryList&&entryList.length>0;
},importListeners:function(target,list){{};
var targetKey=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var targetMap=this.__listeners[targetKey]={};
var clazz=qx.event.Manager;

for(var listKey in list){var item=list[listKey];
var entryKey=item.type+(item.capture?"|capture":"|bubble");
var entryList=targetMap[entryKey];

if(!entryList){entryList=targetMap[entryKey]=[];
this.__registerAtHandler(target,item.type,item.capture);
}entryList.push({handler:item.listener,context:item.self,unique:item.unique||(clazz.__lastUnique++).toString(36)});
}},addListener:function(target,type,listener,self,capture){var msg;
{};
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
}var classes=this.__registration.getHandlers();
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
}{};
},removeListener:function(target,type,listener,self,capture){var msg;
{};
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
},removeListenerById:function(target,id){var msg;
{};
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
}{};
},dispatchEvent:function(target,event){var msg;
{};
var type=event.getType();

if(!event.getBubbles()&&!this.hasListener(target,type)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(target);
}var classes=this.__registration.getDispatchers();
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
},dispose:function(){this.__registration.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,"__handlers");
qx.util.DisposeUtil.disposeMap(this,"__dispatchers");
this.__listeners=this.__window=this.__disposeWrapper=null;
this.__registration=this.__handlerCache=null;
}}});
qx.Bootstrap.define("qx.dom.Node",{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(node){return node.nodeType===
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
qx.Bootstrap.define("qx.lang.Array",{statics:{toArray:function(object,offset){return this.cast(object,Array,offset);
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
var key="qx"+qx.lang.Date.now();
var hasNull=false,hasFalse=false,hasTrue=false;
for(var i=0,len=arr.length;i<len;i++){value=arr[i];
if(value===null){if(!hasNull){hasNull=true;
ret.push(value);
}}else if(value===undefined){}else if(value===false){if(!hasFalse){hasFalse=true;
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
qx.Bootstrap.define("qx.lang.Function",{statics:{getCaller:function(args){return args.caller?args.caller.callee:args.callee.caller;
},getName:function(fcn){if(fcn.displayName){return fcn.displayName;
}
if(fcn.$$original||fcn.wrapper||fcn.classname){return fcn.classname+".constructor()";
}
if(fcn.$$mixin){for(var key in fcn.$$mixin.$$members){if(fcn.$$mixin.$$members[key]==fcn){return fcn.$$mixin.name+".prototype."+key+"()";
}}for(var key in fcn.$$mixin){if(fcn.$$mixin[key]==fcn){return fcn.$$mixin.name+"."+key+"()";
}}}
if(fcn.self){var clazz=fcn.self.constructor;

if(clazz){for(var key in clazz.prototype){if(clazz.prototype[key]==fcn){return clazz.classname+".prototype."+key+"()";
}}for(var key in clazz){if(clazz[key]==fcn){return clazz.classname+"."+key+"()";
}}}}var fcnReResult=fcn.toString().match(/function\s*(\w*)\s*\(.*/);

if(fcnReResult&&fcnReResult.length>=1&&fcnReResult[1]){return fcnReResult[1]+"()";
}return 'anonymous()';
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
qx.Bootstrap.define("qx.event.Registration",{statics:{__managers:{},getManager:function(target){if(target==null){{};
target=window;
}else if(target.nodeType){target=qx.dom.Node.getWindow(target);
}else if(!qx.dom.Node.isWindow(target)){target=window;
}var hash=target.$$hash||qx.core.ObjectRegistry.toHashCode(target);
var manager=this.__managers[hash];

if(!manager){manager=new qx.event.Manager(target,this);
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
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__handlers:[],addHandler:function(handler){{};
this.__handlers.push(handler);
this.__handlers.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__handlers;
},__dispatchers:[],addDispatcher:function(dispatcher,priority){{};
this.__dispatchers.push(dispatcher);
this.__dispatchers.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__dispatchers;
}}});
qx.Bootstrap.define("qx.log.appender.RingBuffer",{construct:function(maxMessages){this.__history=[];
this.setMaxMessages(maxMessages||50);
},members:{__nextIndexToStoreTo:0,__history:null,__maxMessages:50,setMaxMessages:function(maxMessages){this.__maxMessages=maxMessages;
this.clearHistory();
},getMaxMessages:function(){return this.__maxMessages;
},process:function(entry){var maxMessages=this.getMaxMessages();

if(this.__history.length<maxMessages){this.__history.push(entry);
}else{this.__history[this.__nextIndexToStoreTo++]=entry;

if(this.__nextIndexToStoreTo>=maxMessages){this.__nextIndexToStoreTo=0;
}}},getAllLogEvents:function(){return this.retrieveLogEvents(this.getMaxMessages());
},retrieveLogEvents:function(count){if(count>this.__history.length){count=this.__history.length;
}
if(this.__history.length==this.getMaxMessages()){var indexOfYoungestElementInHistory=this.__nextIndexToStoreTo-1;
}else{indexOfYoungestElementInHistory=this.__history.length-1;
}var startIndex=indexOfYoungestElementInHistory-count+1;

if(startIndex<0){startIndex+=this.__history.length;
}var result;

if(startIndex<=indexOfYoungestElementInHistory){result=this.__history.slice(startIndex,indexOfYoungestElementInHistory+1);
}else{result=this.__history.slice(startIndex,this.__history.length).concat(this.__history.slice(0,indexOfYoungestElementInHistory+1));
}return result;
},clearHistory:function(){this.__history=[];
this.__nextIndexToStoreTo=0;
}}});
qx.Bootstrap.define("qx.log.Logger",{statics:{__level:"debug",setLevel:function(value){this.__level=value;
},getLevel:function(){return this.__level;
},setTreshold:function(value){this.__buffer.setMaxMessages(value);
},getTreshold:function(){return this.__buffer.getMaxMessages();
},__appender:{},__id:0,register:function(appender){if(appender.$$id){return;
}var id=this.__id++;
this.__appender[id]=appender;
appender.$$id=id;
var entries=this.__buffer.getAllLogEvents();

for(var i=0,l=entries.length;i<l;i++){appender.process(entries[i]);
}},unregister:function(appender){var id=appender.$$id;

if(id==null){return;
}delete this.__appender[id];
delete appender.$$id;
},debug:function(object,message){this.__log("debug",arguments);
},info:function(object,message){this.__log("info",arguments);
},warn:function(object,message){this.__log("warn",arguments);
},error:function(object,message){this.__log("error",arguments);
},trace:function(object){this.__log("info",[object,qx.dev.StackTrace.getStackTrace().join("\n")]);
},deprecatedMethodWarning:function(fcn,msg){var functionName;
{};
},deprecatedClassWarning:function(clazz,msg){var className;
{};
},deprecatedEventWarning:function(clazz,event,msg){var className;
{};
},deprecatedMixinWarning:function(clazz,msg){var mixinName;
{};
},clear:function(){this.__buffer.clearHistory();
},__buffer:new qx.log.appender.RingBuffer(50),__levels:{debug:0,info:1,warn:2,error:3},__log:function(level,args){var levels=this.__levels;

if(levels[level]<levels[this.__level]){return;
}var object=args.length<2?null:args[0];
var start=object?1:0;
var items=[];

for(var i=start,l=args.length;i<l;i++){items.push(this.__serialize(args[i],true));
}var time=new Date;
var entry={time:time,offset:time-qx.Bootstrap.LOADSTART,level:level,items:items,win:window};
if(object){if(object instanceof qx.core.Object){entry.object=object.$$hash;
}else if(object.$$type){entry.clazz=object;
}}this.__buffer.process(entry);
var appender=this.__appender;

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
var trace=[];

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
case "class":case "stringify":text=value.toString();
break;
case "error":trace=qx.dev.StackTrace.getStackTraceFromError(value);
text=value.toString();
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
}return {type:type,text:text,trace:trace};
}}});
qx.Class.define("qx.core.Object",{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:"Object"},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+"["+this.$$hash+"]";
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

if(qx.lang.Type.isString(data)){if(!this[setter[data]]){if(this["set"+qx.lang.String.firstUp(data)]!=undefined){this["set"+qx.lang.String.firstUp(data)](value);
return;
}{};
}return this[setter[data]](value);
}else{for(var prop in data){if(!this[setter[prop]]){if(this["set"+qx.lang.String.firstUp(prop)]!=undefined){this["set"+qx.lang.String.firstUp(prop)](data[prop]);
continue;
}{};
}this[setter[prop]](data[prop]);
}return this;
}},get:function(prop){var getter=qx.core.Property.$$method.get;

if(!this[getter[prop]]){if(this["get"+qx.lang.String.firstUp(prop)]!=undefined){return this["get"+qx.lang.String.firstUp(prop)]();
}{};
}return this[getter[prop]]();
},reset:function(prop){var resetter=qx.core.Property.$$method.reset;

if(!this[resetter[prop]]){if(this["reset"+qx.lang.String.firstUp(prop)]!=undefined){this["reset"+qx.lang.String.firstUp(prop)]();
return;
}{};
}this[resetter[prop]]();
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
},fireDataEvent:function(type,data,oldData,cancelable){if(!this.$$disposed){if(oldData===undefined){oldData=null;
}return this.__Registration.fireNonBubblingEvent(this,type,qx.event.type.Data,[data,oldData,!!cancelable]);
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

for(var i=0,l=properties.length;i<l;i++){delete this["$$user_"+properties[i]];
}{};
},_disposeFields:function(varargs){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Don't use '_disposeFields' - instead assign directly to 'null'");
qx.util.DisposeUtil.disposeFields(this,arguments);
},_disposeObjects:function(varargs){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeArray:function(field){qx.util.DisposeUtil.disposeArray(this,field);
},_disposeMap:function(field){qx.util.DisposeUtil.disposeMap(this,field);
}},settings:{"qx.disposerDebugLevel":0},defer:function(statics){{};
},destruct:function(){qx.event.Registration.removeAllListeners(this);
qx.core.ObjectRegistry.unregister(this);
this.__userData=null;
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
},clean:function(str){return this.trim(str.replace(/\s+/g,' '));
},trimLeft:function(str){return str.replace(/^\s+/,"");
},trimRight:function(str){return str.replace(/\s+$/,"");
},trim:function(str){return str.replace(/^\s+|\s+$/g,"");
},startsWith:function(fullstr,substr){return fullstr.indexOf(substr)===0;
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
qx.Bootstrap.define("qx.Interface",{statics:{define:function(name,config){if(config){if(config.extend&&!(config.extend instanceof Array)){config.extend=[config.extend];
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

if(members){for(var key in members){if(qx.lang.Type.isFunction(members[key])){var isPropertyMethod=this.__isPropertyMethod(clazz,key);
var hasMemberFunction=isPropertyMethod||qx.lang.Type.isFunction(object[key]);

if(!hasMemberFunction){throw new Error('Implementation of method "'+key+'" is missing in class "'+clazz.classname+'" required by interface "'+iface.name+'"');
}var shouldWrapFunction=wrap===true&&!isPropertyMethod&&!qx.Class.hasInterface(clazz,iface);

if(shouldWrapFunction){object[key]=this.__wrapInterfaceMember(iface,object[key],key,members[key]);
}}else{if(typeof object[key]===undefined){if(typeof object[key]!=="function"){throw new Error('Implementation of member "'+key+'" is missing in class "'+clazz.classname+'" required by interface "'+iface.name+'"');
}}}}}},__isPropertyMethod:function(clazz,methodName){var match=methodName.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!match){return false;
}var propertyName=qx.lang.String.firstLow(match[2]);
var isPropertyMethod=qx.Class.hasProperty(clazz,propertyName);

if(!isPropertyMethod){return false;
}var isBoolean=match[0]=="is"||match[0]=="toggle";

if(isBoolean){return qx.Class.getPropertyDefinition(clazz,propertyName).check=="Boolean";
}return true;
},__assertProperties:function(clazz,iface){if(iface.$$properties){for(var key in iface.$$properties){if(!qx.Class.hasProperty(clazz,key)){throw new Error('The property "'+key+'" is not supported by Class "'+clazz.classname+'"!');
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
},$$registry:{},__wrapInterfaceMember:function(){},__allowedKeys:null,__validateConfig:function(){}}});
qx.Interface.define("qx.ui.decoration.IDecorator",{members:{getMarkup:function(){},resize:function(element,width,height){},tint:function(element,bgcolor){},getInsets:function(){}}});
qx.Class.define("qx.ui.decoration.Abstract",{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:"abstract",properties:{insetLeft:{check:"Number",nullable:true,apply:"_applyInsets"},insetRight:{check:"Number",nullable:true,apply:"_applyInsets"},insetBottom:{check:"Number",nullable:true,apply:"_applyInsets"},insetTop:{check:"Number",nullable:true,apply:"_applyInsets"},insets:{group:["insetTop","insetRight","insetBottom","insetLeft"],mode:"shorthand"}},members:{__insets:null,_getDefaultInsets:function(){throw new Error("Abstract method called.");
},_isInitialized:function(){throw new Error("Abstract method called.");
},_resetInsets:function(){this.__insets=null;
},getInsets:function(){if(this.__insets){return this.__insets;
}var defaults=this._getDefaultInsets();
return this.__insets={left:this.getInsetLeft()==null?defaults.left:this.getInsetLeft(),right:this.getInsetRight()==null?defaults.right:this.getInsetRight(),bottom:this.getInsetBottom()==null?defaults.bottom:this.getInsetBottom(),top:this.getInsetTop()==null?defaults.top:this.getInsetTop()};
},_applyInsets:function(){{};
this.__insets=null;
}},destruct:function(){this.__insets=null;
}});
qx.Mixin.define("qx.ui.decoration.MBackgroundImage",{properties:{backgroundImage:{check:"String",nullable:true,apply:"_applyBackground"},backgroundRepeat:{check:["repeat","repeat-x","repeat-y","no-repeat","scale"],init:"repeat",apply:"_applyBackground"},backgroundPositionX:{nullable:true,apply:"_applyBackground"},backgroundPositionY:{nullable:true,apply:"_applyBackground"},backgroundPosition:{group:["backgroundPositionY","backgroundPositionX"]}},members:{_generateBackgroundMarkup:function(styles){{};
var markup="";
var image=this.getBackgroundImage();
var repeat=this.getBackgroundRepeat();
var top=this.getBackgroundPositionY();

if(top==null){top=0;
}var left=this.getBackgroundPositionX();

if(left==null){left=0;
}styles.backgroundPosition=left+" "+top;
if(image){var resolved=qx.util.AliasManager.getInstance().resolve(image);
markup=qx.bom.element.Decoration.create(resolved,repeat,styles);
}else{if(styles){if(qx.core.Variant.isSet("qx.client","mshtml")){if(qx.bom.client.Engine.VERSION<7||qx.bom.client.Feature.QUIRKS_MODE){styles.overflow="hidden";
}}markup='<div style="'+qx.bom.element.Style.compile(styles)+'"></div>';
}}return markup;
},_applyBackground:function(){{};
}}});
qx.Class.define("qx.ui.decoration.Uniform",{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(width,style,color){arguments.callee.base.call(this);
if(width!=null){this.setWidth(width);
}
if(style!=null){this.setStyle(style);
}
if(color!=null){this.setColor(color);
}},properties:{width:{check:"PositiveInteger",init:0,apply:"_applyWidth"},style:{nullable:true,check:["solid","dotted","dashed","double"],init:"solid",apply:"_applyStyle"},color:{nullable:true,check:"Color",apply:"_applyStyle"},backgroundColor:{check:"Color",nullable:true,apply:"_applyStyle"}},members:{__markup:null,_getDefaultInsets:function(){var width=this.getWidth();
return {top:width,right:width,bottom:width,left:width};
},_isInitialized:function(){return !!this.__markup;
},getMarkup:function(){if(this.__markup){return this.__markup;
}var styles={position:"absolute",top:0,left:0};
var width=this.getWidth();
{};
var Color=qx.theme.manager.Color.getInstance();
styles.border=width+"px "+this.getStyle()+" "+Color.resolve(this.getColor());
var html=this._generateBackgroundMarkup(styles);
return this.__markup=html;
},resize:function(element,width,height){var scaledImage=this.getBackgroundImage()&&this.getBackgroundRepeat()=="scale";

if(scaledImage||qx.bom.client.Feature.CONTENT_BOX){var inset=this.getWidth()*2;
width-=inset;
height-=inset;
if(width<0){width=0;
}
if(height<0){height=0;
}}element.style.width=width+"px";
element.style.height=height+"px";
},tint:function(element,bgcolor){var Color=qx.theme.manager.Color.getInstance();

if(bgcolor==null){bgcolor=this.getBackgroundColor();
}element.style.backgroundColor=Color.resolve(bgcolor)||"";
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this.__markup=null;
}});
qx.Class.define("qx.ui.decoration.Background",{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(backgroundColor){arguments.callee.base.call(this);

if(backgroundColor!=null){this.setBackgroundColor(backgroundColor);
}},properties:{backgroundColor:{check:"Color",nullable:true,apply:"_applyStyle"}},members:{__markup:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__markup;
},getMarkup:function(){if(this.__markup){return this.__markup;
}var styles={position:"absolute",top:0,left:0};
var html=this._generateBackgroundMarkup(styles);
return this.__markup=html;
},resize:function(element,width,height){element.style.width=width+"px";
element.style.height=height+"px";
},tint:function(element,bgcolor){var Color=qx.theme.manager.Color.getInstance();

if(bgcolor==null){bgcolor=this.getBackgroundColor();
}element.style.backgroundColor=Color.resolve(bgcolor)||"";
},_applyStyle:function(){{};
}},destruct:function(){this.__markup=null;
}});
qx.Class.define("qx.ui.decoration.Grid",{extend:qx.ui.decoration.Abstract,construct:function(baseImage,insets){arguments.callee.base.call(this);
if(baseImage!=null){this.setBaseImage(baseImage);
}
if(insets!=null){this.setInsets(insets);
}},properties:{baseImage:{check:"String",nullable:true,apply:"_applyBaseImage"}},members:{__markup:null,__images:null,__edges:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__markup;
},getMarkup:function(){if(this.__markup){return this.__markup;
}var Decoration=qx.bom.element.Decoration;
var images=this.__images;
var edges=this.__edges;
var html=[];
html.push('<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">');
html.push(Decoration.create(images.tl,"no-repeat",{top:0,left:0}));
html.push(Decoration.create(images.t,"scale-x",{top:0,left:edges.left+"px"}));
html.push(Decoration.create(images.tr,"no-repeat",{top:0,right:0}));
html.push(Decoration.create(images.bl,"no-repeat",{bottom:0,left:0}));
html.push(Decoration.create(images.b,"scale-x",{bottom:0,left:edges.left+"px"}));
html.push(Decoration.create(images.br,"no-repeat",{bottom:0,right:0}));
html.push(Decoration.create(images.l,"scale-y",{top:edges.top+"px",left:0}));
html.push(Decoration.create(images.c,"scale",{top:edges.top+"px",left:edges.left+"px"}));
html.push(Decoration.create(images.r,"scale-y",{top:edges.top+"px",right:0}));
html.push('</div>');
return this.__markup=html.join("");
},resize:function(element,width,height){var edges=this.__edges;
var innerWidth=width-edges.left-edges.right;
var innerHeight=height-edges.top-edges.bottom;
if(innerWidth<0){innerWidth=0;
}
if(innerHeight<0){innerHeight=0;
}element.style.width=width+"px";
element.style.height=height+"px";
element.childNodes[1].style.width=innerWidth+"px";
element.childNodes[4].style.width=innerWidth+"px";
element.childNodes[7].style.width=innerWidth+"px";
element.childNodes[6].style.height=innerHeight+"px";
element.childNodes[7].style.height=innerHeight+"px";
element.childNodes[8].style.height=innerHeight+"px";

if(qx.core.Variant.isSet("qx.client","mshtml")){if(qx.bom.client.Engine.VERSION<7||(qx.bom.client.Feature.QUIRKS_MODE&&qx.bom.client.Engine.VERSION<8)){if(width%2==1){element.childNodes[2].style.marginRight="-1px";
element.childNodes[5].style.marginRight="-1px";
element.childNodes[8].style.marginRight="-1px";
}else{element.childNodes[2].style.marginRight="0px";
element.childNodes[5].style.marginRight="0px";
element.childNodes[8].style.marginRight="0px";
}
if(height%2==1){element.childNodes[3].style.marginBottom="-1px";
element.childNodes[4].style.marginBottom="-1px";
element.childNodes[5].style.marginBottom="-1px";
}else{element.childNodes[3].style.marginBottom="0px";
element.childNodes[4].style.marginBottom="0px";
element.childNodes[5].style.marginBottom="0px";
}}}},tint:function(element,bgcolor){},_applyBaseImage:function(value,old){{};

if(value){var base=this._resolveImageUrl(value);
var split=/(.*)(\.[a-z]+)$/.exec(base);
var prefix=split[1];
var ext=split[2];
var images=this.__images={tl:prefix+"-tl"+ext,t:prefix+"-t"+ext,tr:prefix+"-tr"+ext,bl:prefix+"-bl"+ext,b:prefix+"-b"+ext,br:prefix+"-br"+ext,l:prefix+"-l"+ext,c:prefix+"-c"+ext,r:prefix+"-r"+ext};
this.__edges=this._computeEdgeSizes(images);
}},_resolveImageUrl:function(image){return qx.util.AliasManager.getInstance().resolve(image);
},_computeEdgeSizes:function(images){var ResourceManager=qx.util.ResourceManager.getInstance();
return {top:ResourceManager.getImageHeight(images.t),bottom:ResourceManager.getImageHeight(images.b),left:ResourceManager.getImageWidth(images.l),right:ResourceManager.getImageWidth(images.r)};
}},destruct:function(){this.__markup=this.__images=this.__edges=null;
}});
qx.Class.define("qx.ui.decoration.Beveled",{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(outerColor,innerColor,innerOpacity){arguments.callee.base.call(this);
if(outerColor!=null){this.setOuterColor(outerColor);
}
if(innerColor!=null){this.setInnerColor(innerColor);
}
if(innerOpacity!=null){this.setInnerOpacity(innerOpacity);
}},properties:{innerColor:{check:"Color",nullable:true,apply:"_applyStyle"},innerOpacity:{check:"Number",init:1,apply:"_applyStyle"},outerColor:{check:"Color",nullable:true,apply:"_applyStyle"},backgroundColor:{check:"Color",nullable:true,apply:"_applyStyle"}},members:{__markup:null,_getDefaultInsets:function(){return {top:2,right:2,bottom:2,left:2};
},_isInitialized:function(){return !!this.__markup;
},_applyStyle:function(){{};
},getMarkup:function(){if(this.__markup){return this.__markup;
}var Color=qx.theme.manager.Color.getInstance();
var html=[];
var outerStyle="1px solid "+Color.resolve(this.getOuterColor())+";";
var innerStyle="1px solid "+Color.resolve(this.getInnerColor())+";";
html.push('<div style="overflow:hidden;font-size:0;line-height:0;">');
html.push('<div style="');
html.push('border:',outerStyle);
html.push(qx.bom.element.Opacity.compile(0.35));
html.push('"></div>');
html.push('<div style="position:absolute;top:1px;left:0px;');
html.push('border-left:',outerStyle);
html.push('border-right:',outerStyle);
html.push('"></div>');
html.push('<div style="');
html.push('position:absolute;top:0px;left:1px;');
html.push('border-top:',outerStyle);
html.push('border-bottom:',outerStyle);
html.push('"></div>');
var backgroundStyle={position:"absolute",top:"1px",left:"1px"};
html.push(this._generateBackgroundMarkup(backgroundStyle));
html.push('<div style="position:absolute;top:1px;left:1px;');
html.push('border:',innerStyle);
html.push(qx.bom.element.Opacity.compile(this.getInnerOpacity()));
html.push('"></div>');
html.push('</div>');
return this.__markup=html.join("");
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
}var pixel="px";
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
}element.childNodes[3].style.backgroundColor=Color.resolve(bgcolor)||"";
}},destruct:function(){this.__markup=null;
}});
qx.Class.define("qx.ui.decoration.Single",{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(width,style,color){arguments.callee.base.call(this);
if(width!=null){this.setWidth(width);
}
if(style!=null){this.setStyle(style);
}
if(color!=null){this.setColor(color);
}},properties:{widthTop:{check:"Number",init:0,apply:"_applyWidth"},widthRight:{check:"Number",init:0,apply:"_applyWidth"},widthBottom:{check:"Number",init:0,apply:"_applyWidth"},widthLeft:{check:"Number",init:0,apply:"_applyWidth"},styleTop:{nullable:true,check:["solid","dotted","dashed","double"],init:"solid",apply:"_applyStyle"},styleRight:{nullable:true,check:["solid","dotted","dashed","double"],init:"solid",apply:"_applyStyle"},styleBottom:{nullable:true,check:["solid","dotted","dashed","double"],init:"solid",apply:"_applyStyle"},styleLeft:{nullable:true,check:["solid","dotted","dashed","double"],init:"solid",apply:"_applyStyle"},colorTop:{nullable:true,check:"Color",apply:"_applyStyle"},colorRight:{nullable:true,check:"Color",apply:"_applyStyle"},colorBottom:{nullable:true,check:"Color",apply:"_applyStyle"},colorLeft:{nullable:true,check:"Color",apply:"_applyStyle"},backgroundColor:{check:"Color",nullable:true,apply:"_applyStyle"},left:{group:["widthLeft","styleLeft","colorLeft"]},right:{group:["widthRight","styleRight","colorRight"]},top:{group:["widthTop","styleTop","colorTop"]},bottom:{group:["widthBottom","styleBottom","colorBottom"]},width:{group:["widthTop","widthRight","widthBottom","widthLeft"],mode:"shorthand"},style:{group:["styleTop","styleRight","styleBottom","styleLeft"],mode:"shorthand"},color:{group:["colorTop","colorRight","colorBottom","colorLeft"],mode:"shorthand"}},members:{__markup:null,_getDefaultInsets:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};
},_isInitialized:function(){return !!this.__markup;
},getMarkup:function(element){if(this.__markup){return this.__markup;
}var Color=qx.theme.manager.Color.getInstance();
var styles={};
var width=this.getWidthTop();

if(width>0){styles["border-top"]=width+"px "+this.getStyleTop()+" "+Color.resolve(this.getColorTop());
}var width=this.getWidthRight();

if(width>0){styles["border-right"]=width+"px "+this.getStyleRight()+" "+Color.resolve(this.getColorRight());
}var width=this.getWidthBottom();

if(width>0){styles["border-bottom"]=width+"px "+this.getStyleBottom()+" "+Color.resolve(this.getColorBottom());
}var width=this.getWidthLeft();

if(width>0){styles["border-left"]=width+"px "+this.getStyleLeft()+" "+Color.resolve(this.getColorLeft());
}{};
styles.position="absolute";
styles.top=0;
styles.left=0;
var html=this._generateBackgroundMarkup(styles);
return this.__markup=html;
},resize:function(element,width,height){var scaledImage=this.getBackgroundImage()&&this.getBackgroundRepeat()=="scale";

if(scaledImage||qx.bom.client.Feature.CONTENT_BOX){var insets=this.getInsets();
width-=insets.left+insets.right;
height-=insets.top+insets.bottom;
if(width<0){width=0;
}
if(height<0){height=0;
}}element.style.width=width+"px";
element.style.height=height+"px";
},tint:function(element,bgcolor){var Color=qx.theme.manager.Color.getInstance();

if(bgcolor==null){bgcolor=this.getBackgroundColor();
}element.style.backgroundColor=Color.resolve(bgcolor)||"";
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this.__markup=null;
}});
qx.Theme.define("qx.theme.modern.Decoration",{aliases:{decoration:"qx/decoration/Modern"},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:"border-main"}},"selected":{decorator:qx.ui.decoration.Background,style:{backgroundImage:"decoration/selection.png",backgroundRepeat:"scale"}},"pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/pane/pane.png",insets:[0,2,3,0]}},"group":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/groupbox/groupbox.png"}},"border-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:"invalid",innerColor:"white",innerOpacity:0.5,backgroundImage:"decoration/form/input.png",backgroundRepeat:"repeat-x",backgroundColor:"background-light"}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:"border-separator"}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:"border-separator"}},"tooltip-error":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/form/tooltip-error.png",insets:[2,5,5,2]}},"tooltip-error-arrow":{decorator:qx.ui.decoration.Background,style:{backgroundImage:"decoration/form/tooltip-error-arrow.png",backgroundPositionY:"center",backgroundRepeat:"no-repeat",insets:[0,0,0,10]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/shadow/shadow.png",insets:[4,8,8,4]}},"shadow-popup":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/shadow/shadow-small.png",insets:[0,3,3,0]}},"scrollbar-horizontal":{decorator:qx.ui.decoration.Background,style:{backgroundImage:"decoration/scrollbar/scrollbar-bg-horizontal.png",backgroundRepeat:"repeat-x"}},"scrollbar-vertical":{decorator:qx.ui.decoration.Background,style:{backgroundImage:"decoration/scrollbar/scrollbar-bg-vertical.png",backgroundRepeat:"repeat-y"}},"scrollbar-slider-horizontal":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:"decoration/scrollbar/scrollbar-button-bg-horizontal.png",backgroundRepeat:"scale",outerColor:"border-main",innerColor:"white",innerOpacity:0.5}},"scrollbar-slider-horizontal-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:"decoration/scrollbar/scrollbar-button-bg-horizontal.png",backgroundRepeat:"scale",outerColor:"border-disabled",innerColor:"white",innerOpacity:0.3}},"scrollbar-slider-vertical":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:"decoration/scrollbar/scrollbar-button-bg-vertical.png",backgroundRepeat:"scale",outerColor:"border-main",innerColor:"white",innerOpacity:0.5}},"scrollbar-slider-vertical-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:"decoration/scrollbar/scrollbar-button-bg-vertical.png",backgroundRepeat:"scale",outerColor:"border-disabled",innerColor:"white",innerOpacity:0.3}},"button":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/form/button.png",insets:2}},"button-disabled":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/form/button-disabled.png",insets:2}},"button-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/form/button-focused.png",insets:2}},"button-hovered":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/form/button-hovered.png",insets:2}},"button-pressed":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/form/button-pressed.png",insets:2}},"button-checked":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/form/button-checked.png",insets:2}},"button-checked-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/form/button-checked-focused.png",insets:2}},"button-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:"invalid",innerColor:"border-focused-invalid",insets:[1]}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:"invalid",innerColor:"border-focused-invalid",insets:[0]}},"input":{decorator:qx.ui.decoration.Beveled,style:{outerColor:"border-input",innerColor:"white",innerOpacity:0.5,backgroundImage:"decoration/form/input.png",backgroundRepeat:"repeat-x",backgroundColor:"background-light"}},"input-focused":{decorator:qx.ui.decoration.Beveled,style:{outerColor:"border-input",innerColor:"border-focused",backgroundImage:"decoration/form/input-focused.png",backgroundRepeat:"repeat-x",backgroundColor:"background-light"}},"input-focused-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:"invalid",innerColor:"border-focused-invalid",backgroundImage:"decoration/form/input-focused.png",backgroundRepeat:"repeat-x",backgroundColor:"background-light",insets:[2]}},"input-disabled":{decorator:qx.ui.decoration.Beveled,style:{outerColor:"border-disabled",innerColor:"white",innerOpacity:0.5,backgroundImage:"decoration/form/input.png",backgroundRepeat:"repeat-x",backgroundColor:"background-light"}},"toolbar":{decorator:qx.ui.decoration.Background,style:{backgroundImage:"decoration/toolbar/toolbar-gradient.png",backgroundRepeat:"scale"}},"toolbar-button-hovered":{decorator:qx.ui.decoration.Beveled,style:{outerColor:"#b6b6b6",innerColor:"#f8f8f8",backgroundImage:"decoration/form/button-c.png",backgroundRepeat:"scale"}},"toolbar-button-checked":{decorator:qx.ui.decoration.Beveled,style:{outerColor:"#b6b6b6",innerColor:"#f8f8f8",backgroundImage:"decoration/form/button-checked-c.png",backgroundRepeat:"scale"}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,widthRight:1,colorLeft:"#b8b8b8",colorRight:"#f4f4f4",styleLeft:"solid",styleRight:"solid"}},"toolbar-part":{decorator:qx.ui.decoration.Background,style:{backgroundImage:"decoration/toolbar/toolbar-part.gif",backgroundRepeat:"repeat-y"}},"tabview-pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/tabview/tabview-pane.png",insets:[4,6,7,4]}},"tabview-page-button-top-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/tabview/tab-button-top-active.png"}},"tabview-page-button-top-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/tabview/tab-button-top-inactive.png"}},"tabview-page-button-bottom-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/tabview/tab-button-bottom-active.png"}},"tabview-page-button-bottom-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/tabview/tab-button-bottom-inactive.png"}},"tabview-page-button-left-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/tabview/tab-button-left-active.png"}},"tabview-page-button-left-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/tabview/tab-button-left-inactive.png"}},"tabview-page-button-right-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/tabview/tab-button-right-active.png"}},"tabview-page-button-right-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/tabview/tab-button-right-inactive.png"}},"splitpane":{decorator:qx.ui.decoration.Uniform,style:{backgroundColor:"background-pane",width:3,color:"background-splitpane",style:"solid"}},"window":{decorator:qx.ui.decoration.Single,style:{backgroundColor:"background-pane",width:1,color:"border-main",widthTop:0}},"window-captionbar-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/window/captionbar-active.png"}},"window-captionbar-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/window/captionbar-inactive.png"}},"window-statusbar":{decorator:qx.ui.decoration.Grid,style:{baseImage:"decoration/window/statusbar.png"}},"table":{decorator:qx.ui.decoration.Single,style:{width:1,color:"border-main",style:"solid"}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:"border-main",style:"solid"}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:"decoration/table/header-cell.png",backgroundRepeat:"scale",widthBottom:1,colorBottom:"border-main",style:"solid"}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:"border-separator",styleRight:"solid"}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:"border-separator",styleRight:"solid",widthBottom:1,colorBottom:"white",styleBottom:"solid"}},"table-column-button":{decorator:qx.ui.decoration.Single,style:{backgroundImage:"decoration/table/header-cell.png",backgroundRepeat:"scale",widthBottom:1,colorBottom:"border-main",style:"solid"}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:"table-focus-indicator",style:"solid"}},"progressive-table-header":{decorator:qx.ui.decoration.Single,style:{width:1,color:"border-main",style:"solid"}},"progressive-table-header-cell":{decorator:qx.ui.decoration.Single,style:{backgroundImage:"decoration/table/header-cell.png",backgroundRepeat:"scale",widthRight:1,colorRight:"#F2F2F2",style:"solid"}},"menu":{decorator:qx.ui.decoration.Single,style:{backgroundImage:"decoration/menu/background.png",backgroundRepeat:"scale",width:1,color:"border-main",style:"solid"}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:"#C5C5C5",widthBottom:1,colorBottom:"#FAFAFA"}},"menubar":{decorator:qx.ui.decoration.Single,style:{backgroundImage:"decoration/menu/bar-background.png",backgroundRepeat:"scale",width:1,color:"border-separator",style:"solid"}},"app-header":{decorator:qx.ui.decoration.Background,style:{backgroundImage:"decoration/app-header.png",backgroundRepeat:"scale"}}}});
qx.Theme.define("gui4.theme.Decoration",{extend:qx.theme.modern.Decoration,decorations:{}});
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
qx.Bootstrap.define("qx.bom.client.System",{statics:{NAME:"",SP1:false,SP2:false,WIN95:false,WIN98:false,WINME:false,WINNT4:false,WIN2000:false,WINXP:false,WIN2003:false,WINVISTA:false,WINCE:false,LINUX:false,SUNOS:false,FREEBSD:false,NETBSD:false,OPENBSD:false,OSX:false,OS9:false,SYMBIAN:false,NINTENDODS:false,PSP:false,IPHONE:false,UNKNOWN_SYSTEM:false,__ids:{"Windows NT 6.0":"winvista","Windows NT 5.2":"win2003","Windows NT 5.1":"winxp","Windows NT 5.0":"win2000","Windows 2000":"win2000","Windows NT 4.0":"winnt4","Win 9x 4.90":"winme","Windows CE":"wince","Windows 98":"win98","Win98":"win98","Windows 95":"win95","Win95":"win95","Linux":"linux","FreeBSD":"freebsd","NetBSD":"netbsd","OpenBSD":"openbsd","SunOS":"sunos","Symbian System":"symbian","Nitro":"nintendods","PSP":"sonypsp","Mac OS X 10_5":"osx5","Mac OS X 10.5":"osx5","Mac OS X 10_4":"osx4","Mac OS X 10.4":"osx4","Mac OS X 10_3":"osx3","Mac OS X 10.3":"osx3","Mac OS X 10_2":"osx2","Mac OS X 10.2":"osx2","Mac OS X 10_1":"osx1","Mac OS X 10.1":"osx1","Mac OS X 10_0":"osx0","Mac OS X 10.0":"osx0","Mac OS X":"osx","Mac OS 9":"os9"},__init:function(){var agent=navigator.userAgent;
var str=[];

for(var key in this.__ids){str.push(key);
}var reg=new RegExp("("+str.join("|").replace(/\./g,"\.")+")","g");

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
if(qx.bom.client.Engine.WEBKIT&&RegExp(" Mobile/").test(navigator.userAgent)){this.IPHONE=true;
this.NAME="iphone";
}else{this.NAME=this.__ids[RegExp.$1];
this[this.NAME.toUpperCase()]=true;

if(qx.bom.client.Platform.WIN){if(agent.indexOf("Windows NT 5.01")!==-1){this.SP1=true;
}else if(qx.bom.client.Engine.MSHTML&&agent.indexOf("SV1")!==-1){this.SP2=true;
}}}}},defer:function(statics){statics.__init();
}});
qx.Theme.define("qx.theme.modern.Font",{fonts:{"default":{size:qx.bom.client.System.WINVISTA?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?["Lucida Grande"]:qx.bom.client.System.WINVISTA?["Segoe UI","Candara"]:["Tahoma","Liberation Sans","Arial"]},"bold":{size:qx.bom.client.System.WINVISTA?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?["Lucida Grande"]:qx.bom.client.System.WINVISTA?["Segoe UI","Candara"]:["Tahoma","Liberation Sans","Arial"],bold:true},"small":{size:qx.bom.client.System.WINVISTA?11:10,lineHeight:1.4,family:qx.bom.client.Platform.MAC?["Lucida Grande"]:qx.bom.client.System.WINVISTA?["Segoe UI","Candara"]:["Tahoma","Liberation Sans","Arial"]},"monospace":{size:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?["Lucida Console","Monaco"]:qx.bom.client.System.WINVISTA?["Consolas"]:["Consolas","DejaVu Sans Mono","Courier New","monospace"]}}});
qx.Theme.define("gui4.theme.Font",{extend:qx.theme.modern.Font,fonts:{}});
qx.Theme.define("qx.theme.icon.Tango",{title:"Tango",aliases:{"icon":"qx/icon/Tango"},icons:{}});
qx.Theme.define("qx.theme.modern.Appearance",{appearances:{"widget":{},"root":{style:function(states){return {backgroundColor:"background-application",textColor:"text-label",font:"default"};
}},"label":{style:function(states){return {textColor:states.disabled?"text-disabled":undefined};
}},"move-frame":{style:function(states){return {decorator:"main"};
}},"resize-frame":"move-frame","dragdrop-cursor":{style:function(states){var icon="nodrop";

if(states.copy){icon="copy";
}else if(states.move){icon="move";
}else if(states.alias){icon="alias";
}return {source:"decoration/cursors/"+icon+".gif",position:"right-top",offset:[2,16,2,6]};
}},"image":{style:function(states){return {opacity:!states.replacement&&states.disabled?0.3:1};
}},"atom":{},"atom/label":"label","atom/icon":"image","popup":{style:function(states){return {decorator:"main",backgroundColor:"background-light",shadow:"shadow-popup"};
}},"button-frame":{alias:"atom",style:function(states){var decorator,textColor;

if(states.checked&&states.focused&&!states.inner){decorator="button-checked-focused";
textColor=undefined;
}else if(states.disabled){decorator="button-disabled";
textColor=undefined;
}else if(states.pressed){decorator="button-pressed";
textColor="text-hovered";
}else if(states.checked){decorator="button-checked";
textColor=undefined;
}else if(states.hovered){decorator="button-hovered";
textColor="text-hovered";
}else if(states.preselected&&states.focused&&!states.inner){decorator="button-preselected-focused";
textColor="text-hovered";
}else if(states.preselected){decorator="button-preselected";
textColor="text-hovered";
}else if(states.focused&&!states.inner){decorator="button-focused";
textColor=undefined;
}else{decorator="button";
textColor=undefined;
}return {decorator:decorator,textColor:textColor,shadow:states.invalid&&!states.disabled?"button-invalid-shadow":undefined};
}},"button-frame/image":{style:function(states){return {opacity:!states.replacement&&states.disabled?0.5:1};
}},"button":{alias:"button-frame",include:"button-frame",style:function(states){return {padding:[2,8],center:true};
}},"hover-button":{alias:"atom",include:"atom",style:function(states){return {decorator:states.hovered?"selected":undefined,textColor:states.hovered?"text-selected":undefined};
}},"splitbutton":{},"splitbutton/button":"button","splitbutton/arrow":{alias:"button",include:"button",style:function(states){return {icon:"decoration/arrows/down.png",padding:2,marginLeft:1};
}},"checkbox":{alias:"atom",style:function(states){var icon;

if(states.checked&&states.focused){icon="checkbox-checked-focused";
}else if(states.checked&&states.disabled){icon="checkbox-checked-disabled";
}else if(states.checked&&states.pressed){icon="checkbox-checked-pressed";
}else if(states.checked&&states.hovered){icon="checkbox-checked-hovered";
}else if(states.checked){icon="checkbox-checked";
}else if(states.disabled){icon="checkbox-disabled";
}else if(states.focused){icon="checkbox-focused";
}else if(states.pressed){icon="checkbox-pressed";
}else if(states.hovered){icon="checkbox-hovered";
}else{icon="checkbox";
}var invalid=states.invalid&&!states.disabled?"-invalid":"";
return {icon:"decoration/form/"+icon+invalid+".png",gap:6};
}},"radiobutton":{alias:"atom",style:function(states){var icon;

if(states.checked&&states.focused){icon="radiobutton-checked-focused";
}else if(states.checked&&states.disabled){icon="radiobutton-checked-disabled";
}else if(states.checked&&states.pressed){icon="radiobutton-checked-pressed";
}else if(states.checked&&states.hovered){icon="radiobutton-checked-hovered";
}else if(states.checked){icon="radiobutton-checked";
}else if(states.disabled){icon="radiobutton-disabled";
}else if(states.focused){icon="radiobutton-focused";
}else if(states.pressed){icon="radiobutton-pressed";
}else if(states.hovered){icon="radiobutton-hovered";
}else{icon="radiobutton";
}var invalid=states.invalid&&!states.disabled?"-invalid":"";
return {icon:"decoration/form/"+icon+invalid+".png",gap:6};
}},"textfield":{style:function(states){var decorator;
var focused=!!states.focused;
var invalid=!!states.invalid;
var disabled=!!states.disabled;

if(focused&&invalid&&!disabled){decorator="input-focused-invalid";
}else if(focused&&!invalid&&!disabled){decorator="input-focused";
}else if(disabled){decorator="input-disabled";
}else if(!focused&&invalid&&!disabled){decorator="border-invalid";
}else{decorator="input";
}var textColor;

if(states.disabled){textColor="text-disabled";
}else if(states.showingPlaceholder){textColor="text-placeholder";
}else{textColor="text-input";
}return {decorator:decorator,padding:[2,4,1],textColor:textColor};
}},"textarea":{include:"textfield",style:function(states){return {padding:4};
}},"spinner":{style:function(states){var decorator;
var focused=!!states.focused;
var invalid=!!states.invalid;
var disabled=!!states.disabled;

if(focused&&invalid&&!disabled){decorator="input-focused-invalid";
}else if(focused&&!invalid&&!disabled){decorator="input-focused";
}else if(disabled){decorator="input-disabled";
}else if(!focused&&invalid&&!disabled){decorator="border-invalid";
}else{decorator="input";
}return {decorator:decorator};
}},"spinner/textfield":{style:function(states){return {marginRight:2,padding:[2,4,1],textColor:states.disabled?"text-disabled":"text-input"};
}},"spinner/upbutton":{alias:"button-frame",include:"button-frame",style:function(states){return {icon:"decoration/arrows/up-small.png",padding:states.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"spinner/downbutton":{alias:"button-frame",include:"button-frame",style:function(states){return {icon:"decoration/arrows/down-small.png",padding:states.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"datefield":"combobox","datefield/button":{alias:"combobox/button",include:"combobox/button",style:function(states){return {icon:"icon/16/apps/office-calendar.png",padding:[0,3],decorator:undefined};
}},"datefield/textfield":"combobox/textfield","datefield/list":{alias:"datechooser",include:"datechooser",style:function(states){return {decorator:undefined};
}},"groupbox":{style:function(states){return {legendPosition:"top"};
}},"groupbox/legend":{alias:"atom",style:function(states){return {padding:[1,0,1,4],textColor:states.invalid?"invalid":"text-title",font:"bold"};
}},"groupbox/frame":{style:function(states){return {padding:12,decorator:"group"};
}},"check-groupbox":"groupbox","check-groupbox/legend":{alias:"checkbox",include:"checkbox",style:function(states){return {padding:[1,0,1,4],textColor:states.invalid?"invalid":"text-title",font:"bold"};
}},"radio-groupbox":"groupbox","radio-groupbox/legend":{alias:"radiobutton",include:"radiobutton",style:function(states){return {padding:[1,0,1,4],textColor:states.invalid?"invalid":"text-title",font:"bold"};
}},"scrollarea":{style:function(states){return {minWidth:50,minHeight:50};
}},"scrollarea/corner":{style:function(states){return {backgroundColor:"background-application"};
}},"scrollarea/pane":"widget","scrollarea/scrollbar-x":"scrollbar","scrollarea/scrollbar-y":"scrollbar","scrollbar":{style:function(states){if(states["native"]){return {};
}return {width:states.horizontal?undefined:16,height:states.horizontal?16:undefined,decorator:states.horizontal?"scrollbar-horizontal":"scrollbar-vertical",padding:1};
}},"scrollbar/slider":{alias:"slider",style:function(states){return {padding:states.horizontal?[0,1,0,1]:[1,0,1,0]};
}},"scrollbar/slider/knob":{include:"button-frame",style:function(states){var decorator=states.horizontal?"scrollbar-slider-horizontal":"scrollbar-slider-vertical";

if(states.disabled){decorator+="-disabled";
}return {decorator:decorator,minHeight:states.horizontal?undefined:9,minWidth:states.horizontal?9:undefined};
}},"scrollbar/button":{alias:"button-frame",include:"button-frame",style:function(states){var icon="decoration/scrollbar/scrollbar-";

if(states.left){icon+="left.png";
}else if(states.right){icon+="right.png";
}else if(states.up){icon+="up.png";
}else{icon+="down.png";
}
if(states.left||states.right){return {padding:[0,0,0,states.left?3:4],icon:icon,width:15,height:14};
}else{return {padding:[0,0,0,2],icon:icon,width:14,height:15};
}}},"scrollbar/button-begin":"scrollbar/button","scrollbar/button-end":"scrollbar/button","slider":{style:function(states){var decorator;
var focused=!!states.focused;
var invalid=!!states.invalid;
var disabled=!!states.disabled;

if(focused&&invalid&&!disabled){decorator="input-focused-invalid";
}else if(focused&&!invalid&&!disabled){decorator="input-focused";
}else if(disabled){decorator="input-disabled";
}else if(!focused&&invalid&&!disabled){decorator="border-invalid";
}else{decorator="input";
}return {decorator:decorator};
}},"slider/knob":{include:"button-frame",style:function(states){return {decorator:states.disabled?"scrollbar-slider-horizontal-disabled":"scrollbar-slider-horizontal",shadow:undefined,height:14,width:14};
}},"list":{alias:"scrollarea",style:function(states){var decorator;
var focused=!!states.focused;
var invalid=!!states.invalid;
var disabled=!!states.disabled;

if(focused&&invalid&&!disabled){decorator="input-focused-invalid";
}else if(focused&&!invalid&&!disabled){decorator="input-focused";
}else if(disabled){decorator="input-disabled";
}else if(!focused&&invalid&&!disabled){decorator="border-invalid";
}else{decorator="input";
}return {backgroundColor:"background-light",decorator:decorator};
}},"list/pane":"widget","listitem":{alias:"atom",style:function(states){return {padding:4,textColor:states.selected?"text-selected":undefined,decorator:states.selected?"selected":undefined};
}},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:"button-frame",include:"button-frame",style:function(states){return {padding:5,center:true,icon:states.vertical?"decoration/arrows/down.png":"decoration/arrows/right.png"};
}},"slidebar/button-backward":{alias:"button-frame",include:"button-frame",style:function(states){return {padding:5,center:true,icon:states.vertical?"decoration/arrows/up.png":"decoration/arrows/left.png"};
}},"tabview":{style:function(states){return {contentPadding:16};
}},"tabview/bar":{alias:"slidebar",style:function(states){var result={marginBottom:states.barTop?-1:0,marginTop:states.barBottom?-4:0,marginLeft:states.barRight?-3:0,marginRight:states.barLeft?-1:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};

if(states.barTop||states.barBottom){result.paddingLeft=5;
result.paddingRight=7;
}else{result.paddingTop=5;
result.paddingBottom=7;
}return result;
}},"tabview/bar/button-forward":{include:"slidebar/button-forward",alias:"slidebar/button-forward",style:function(states){if(states.barTop||states.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/button-backward":{include:"slidebar/button-backward",alias:"slidebar/button-backward",style:function(states){if(states.barTop||states.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(states){return {decorator:"tabview-pane",minHeight:100,marginBottom:states.barBottom?-1:0,marginTop:states.barTop?-1:0,marginLeft:states.barLeft?-1:0,marginRight:states.barRight?-1:0};
}},"tabview-page":"widget","tabview-page/button":{alias:"atom",style:function(states){var decorator,padding=0;
var marginTop=0,marginBottom=0,marginLeft=0,marginRight=0;

if(states.checked){if(states.barTop){decorator="tabview-page-button-top-active";
padding=[6,14];
marginLeft=states.firstTab?0:-5;
marginRight=states.lastTab?0:-5;
}else if(states.barBottom){decorator="tabview-page-button-bottom-active";
padding=[6,14];
marginLeft=states.firstTab?0:-5;
marginRight=states.lastTab?0:-5;
}else if(states.barRight){decorator="tabview-page-button-right-active";
padding=[6,13];
marginTop=states.firstTab?0:-5;
marginBottom=states.lastTab?0:-5;
}else{decorator="tabview-page-button-left-active";
padding=[6,13];
marginTop=states.firstTab?0:-5;
marginBottom=states.lastTab?0:-5;
}}else{if(states.barTop){decorator="tabview-page-button-top-inactive";
padding=[4,10];
marginTop=4;
marginLeft=states.firstTab?5:1;
marginRight=1;
}else if(states.barBottom){decorator="tabview-page-button-bottom-inactive";
padding=[4,10];
marginBottom=4;
marginLeft=states.firstTab?5:1;
marginRight=1;
}else if(states.barRight){decorator="tabview-page-button-right-inactive";
padding=[4,10];
marginRight=5;
marginTop=states.firstTab?5:1;
marginBottom=1;
marginLeft=1;
}else{decorator="tabview-page-button-left-inactive";
padding=[4,10];
marginLeft=5;
marginTop=states.firstTab?5:1;
marginBottom=1;
marginRight=1;
}}return {zIndex:states.checked?10:5,decorator:decorator,padding:padding,marginTop:marginTop,marginBottom:marginBottom,marginLeft:marginLeft,marginRight:marginRight,textColor:states.checked?"text-active":"text-inactive"};
}},"tabview-page/button/close-button":{alias:"atom",style:function(states){return {icon:"qx/icon/Tango/16/actions/window-close.png"};
}},"toolbar":{style:function(states){return {decorator:"toolbar",spacing:2};
}},"toolbar/part":{style:function(states){return {decorator:"toolbar-part",spacing:2};
}},"toolbar/part/container":{style:function(states){return {paddingLeft:2,paddingRight:2};
}},"toolbar/part/handle":{style:function(states){return {source:"decoration/toolbar/toolbar-handle-knob.gif",marginLeft:3,marginRight:3};
}},"toolbar-button":{alias:"atom",style:function(states){return {marginTop:2,marginBottom:2,padding:(states.pressed||states.checked||states.hovered)&&!states.disabled||(states.disabled&&states.checked)?3:5,decorator:states.pressed||(states.checked&&!states.hovered)||(states.checked&&states.disabled)?"toolbar-button-checked":states.hovered&&!states.disabled?"toolbar-button-hovered":undefined};
}},"toolbar-menubutton":{alias:"toolbar-button",include:"toolbar-button",style:function(states){return {showArrow:true};
}},"toolbar-menubutton/arrow":{alias:"image",include:"image",style:function(states){return {source:"decoration/arrows/down-small.png"};
}},"toolbar-splitbutton":{style:function(states){return {marginTop:2,marginBottom:2};
}},"toolbar-splitbutton/button":{alias:"toolbar-button",include:"toolbar-button",style:function(states){return {icon:"decoration/arrows/down.png",marginTop:undefined,marginBottom:undefined};
}},"toolbar-splitbutton/arrow":{alias:"toolbar-button",include:"toolbar-button",style:function(states){return {padding:states.pressed||states.checked?1:states.hovered?1:3,icon:"decoration/arrows/down.png",marginTop:undefined,marginBottom:undefined};
}},"toolbar-separator":{style:function(states){return {decorator:"toolbar-separator",margin:7};
}},"tree":"list","tree-item":{style:function(states){return {padding:[2,6],textColor:states.selected?"text-selected":undefined,decorator:states.selected?"selected":undefined};
}},"tree-item/icon":{include:"image",style:function(states){return {paddingRight:5};
}},"tree-item/label":"label","tree-item/open":{include:"image",style:function(states){var icon;

if(states.selected&&states.opened){icon="decoration/tree/open-selected.png";
}else if(states.selected&&!states.opened){icon="decoration/tree/closed-selected.png";
}else if(states.opened){icon="decoration/tree/open.png";
}else{icon="decoration/tree/closed.png";
}return {padding:[0,5,0,2],source:icon};
}},"tree-folder":{include:"tree-item",alias:"tree-item",style:function(states){var icon;

if(states.small){icon=states.opened?"icon/16/places/folder-open.png":"icon/16/places/folder.png";
}else if(states.large){icon=states.opened?"icon/32/places/folder-open.png":"icon/32/places/folder.png";
}else{icon=states.opened?"icon/22/places/folder-open.png":"icon/22/places/folder.png";
}return {icon:icon};
}},"tree-file":{include:"tree-item",alias:"tree-item",style:function(states){return {icon:states.small?"icon/16/mimetypes/office-document.png":states.large?"icon/32/mimetypes/office-document.png":"icon/22/mimetypes/office-document.png"};
}},"treevirtual":"table","treevirtual-folder":{style:function(states){return {icon:states.opened?"icon/16/places/folder-open.png":"icon/16/places/folder.png"};
}},"treevirtual-file":{include:"treevirtual-folder",alias:"treevirtual-folder",style:function(states){return {icon:"icon/16/mimetypes/office-document.png"};
}},"treevirtual-line":{style:function(states){return {icon:"qx/static/blank.gif"};
}},"treevirtual-contract":{style:function(states){return {icon:"decoration/tree/open.png",paddingLeft:5,paddingTop:2};
}},"treevirtual-expand":{style:function(states){return {icon:"decoration/tree/closed.png",paddingLeft:5,paddingTop:2};
}},"treevirtual-only-contract":"treevirtual-contract","treevirtual-only-expand":"treevirtual-expand","treevirtual-start-contract":"treevirtual-contract","treevirtual-start-expand":"treevirtual-expand","treevirtual-end-contract":"treevirtual-contract","treevirtual-end-expand":"treevirtual-expand","treevirtual-cross-contract":"treevirtual-contract","treevirtual-cross-expand":"treevirtual-expand","treevirtual-end":{style:function(states){return {icon:"qx/static/blank.gif"};
}},"treevirtual-cross":{style:function(states){return {icon:"qx/static/blank.gif"};
}},"tooltip":{include:"popup",style:function(states){return {backgroundColor:"background-tip",padding:[1,3,2,3],offset:[15,5,5,5]};
}},"tooltip/atom":"atom","tooltip-error":{include:"tooltip",style:function(states){return {textColor:"text-selected",placeMethod:"widget",offsetRight:15,position:"right-top",showTimeout:100,hideTimeout:10000,decorator:"tooltip-error",shadow:"tooltip-error-arrow",font:"bold"};
}},"tooltip-error/atom":"atom","window":{style:function(states){return {shadow:"shadow-window",contentPadding:[10,10,10,10]};
}},"window/pane":{style:function(states){return {decorator:"window"};
}},"window/captionbar":{style:function(states){return {decorator:states.active?"window-captionbar-active":"window-captionbar-inactive",textColor:states.active?"white":"text-gray",minHeight:26,paddingRight:2};
}},"window/icon":{style:function(states){return {margin:[5,0,3,6]};
}},"window/title":{style:function(states){return {alignY:"middle",font:"bold",marginLeft:6,marginRight:12};
}},"window/minimize-button":{alias:"atom",style:function(states){return {icon:states.active?states.hovered?"decoration/window/minimize-active-hovered.png":"decoration/window/minimize-active.png":"decoration/window/minimize-inactive.png",margin:[4,8,2,0]};
}},"window/restore-button":{alias:"atom",style:function(states){return {icon:states.active?states.hovered?"decoration/window/restore-active-hovered.png":"decoration/window/restore-active.png":"decoration/window/restore-inactive.png",margin:[5,8,2,0]};
}},"window/maximize-button":{alias:"atom",style:function(states){return {icon:states.active?states.hovered?"decoration/window/maximize-active-hovered.png":"decoration/window/maximize-active.png":"decoration/window/maximize-inactive.png",margin:[4,8,2,0]};
}},"window/close-button":{alias:"atom",style:function(states){return {icon:states.active?states.hovered?"decoration/window/close-active-hovered.png":"decoration/window/close-active.png":"decoration/window/close-inactive.png",margin:[4,8,2,0]};
}},"window/statusbar":{style:function(states){return {padding:[2,6],decorator:"window-statusbar",minHeight:18};
}},"window/statusbar-text":{style:function(states){return {font:"small"};
}},"iframe":{style:function(states){return {decorator:"main"};
}},"resizer":{style:function(states){return {decorator:"pane"};
}},"splitpane":{style:function(states){return {decorator:"splitpane"};
}},"splitpane/splitter":{style:function(states){return {width:states.horizontal?3:undefined,height:states.vertical?3:undefined,backgroundColor:"background-splitpane"};
}},"splitpane/splitter/knob":{style:function(states){return {source:states.horizontal?"decoration/splitpane/knob-horizontal.png":"decoration/splitpane/knob-vertical.png"};
}},"splitpane/slider":{style:function(states){return {width:states.horizontal?3:undefined,height:states.vertical?3:undefined,backgroundColor:"background-splitpane"};
}},"selectbox":{alias:"button-frame",include:"button-frame",style:function(states){return {padding:[2,8]};
}},"selectbox/atom":"atom","selectbox/popup":"popup","selectbox/list":{alias:"list"},"selectbox/arrow":{include:"image",style:function(states){return {source:"decoration/arrows/down.png",paddingLeft:5};
}},"datechooser":{style:function(states){var decorator;
var focused=!!states.focused;
var invalid=!!states.invalid;
var disabled=!!states.disabled;

if(focused&&invalid&&!disabled){decorator="input-focused-invalid";
}else if(focused&&!invalid&&!disabled){decorator="input-focused";
}else if(disabled){decorator="input-disabled";
}else if(!focused&&invalid&&!disabled){decorator="border-invalid";
}else{decorator="input";
}return {padding:2,decorator:decorator,backgroundColor:"background-light"};
}},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:"button-frame",alias:"button-frame",style:function(states){var result={padding:[2,4],shadow:undefined};

if(states.lastYear){result.icon="decoration/arrows/rewind.png";
result.marginRight=1;
}else if(states.lastMonth){result.icon="decoration/arrows/left.png";
}else if(states.nextYear){result.icon="decoration/arrows/forward.png";
result.marginLeft=1;
}else if(states.nextMonth){result.icon="decoration/arrows/right.png";
}return result;
}},"datechooser/last-year-button-tooltip":"tooltip","datechooser/last-month-button-tooltip":"tooltip","datechooser/next-year-button-tooltip":"tooltip","datechooser/next-month-button-tooltip":"tooltip","datechooser/last-year-button":"datechooser/nav-button","datechooser/last-month-button":"datechooser/nav-button","datechooser/next-month-button":"datechooser/nav-button","datechooser/next-year-button":"datechooser/nav-button","datechooser/month-year-label":{style:function(states){return {font:"bold",textAlign:"center",textColor:states.disabled?"text-disabled":undefined};
}},"datechooser/date-pane":{style:function(states){return {textColor:states.disabled?"text-disabled":undefined,marginTop:2};
}},"datechooser/weekday":{style:function(states){return {textColor:states.disabled?"text-disabled":states.weekend?"text-light":undefined,textAlign:"center",paddingTop:2,backgroundColor:"background-medium"};
}},"datechooser/week":{style:function(states){return {textAlign:"center",padding:[2,4],backgroundColor:"background-medium"};
}},"datechooser/day":{style:function(states){return {textAlign:"center",decorator:states.disabled?undefined:states.selected?"selected":undefined,textColor:states.disabled?"text-disabled":states.selected?"text-selected":states.otherMonth?"text-light":undefined,font:states.today?"bold":undefined,padding:[2,4]};
}},"combobox":{style:function(states){var decorator;
var focused=!!states.focused;
var invalid=!!states.invalid;
var disabled=!!states.disabled;

if(focused&&invalid&&!disabled){decorator="input-focused-invalid";
}else if(focused&&!invalid&&!disabled){decorator="input-focused";
}else if(disabled){decorator="input-disabled";
}else if(!focused&&invalid&&!disabled){decorator="border-invalid";
}else{decorator="input";
}return {decorator:decorator};
}},"combobox/popup":"popup","combobox/list":{alias:"list"},"combobox/button":{include:"button-frame",alias:"button-frame",style:function(states){var ret={icon:"decoration/arrows/down.png",padding:2};

if(states.selected){ret.decorator="button-focused";
}return ret;
}},"combobox/textfield":{include:"textfield",style:function(states){return {decorator:undefined};
}},"menu":{style:function(states){var result={decorator:"menu",shadow:"shadow-popup",spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,placementModeY:states.submenu||states.contextmenu?"best-fit":"keep-align"};

if(states.submenu){result.position="right-top";
result.offset=[-2,-3];
}return result;
}},"menu/slidebar":"menu-slidebar","menu-slidebar":"widget","menu-slidebar-button":{style:function(states){return {decorator:states.hovered?"selected":undefined,padding:7,center:true};
}},"menu-slidebar/button-backward":{include:"menu-slidebar-button",style:function(states){return {icon:states.hovered?"decoration/arrows/up-invert.png":"decoration/arrows/up.png"};
}},"menu-slidebar/button-forward":{include:"menu-slidebar-button",style:function(states){return {icon:states.hovered?"decoration/arrows/down-invert.png":"decoration/arrows/down.png"};
}},"menu-separator":{style:function(states){return {height:0,decorator:"menu-separator",margin:[4,2]};
}},"menu-button":{alias:"atom",style:function(states){return {decorator:states.selected?"selected":undefined,textColor:states.selected?"text-selected":undefined,padding:[4,6]};
}},"menu-button/icon":{include:"image",style:function(states){return {alignY:"middle"};
}},"menu-button/label":{include:"label",style:function(states){return {alignY:"middle",padding:1};
}},"menu-button/shortcut":{include:"label",style:function(states){return {alignY:"middle",marginLeft:14,padding:1};
}},"menu-button/arrow":{include:"image",style:function(states){return {source:states.selected?"decoration/arrows/right-invert.png":"decoration/arrows/right.png",alignY:"middle"};
}},"menu-checkbox":{alias:"menu-button",include:"menu-button",style:function(states){return {icon:!states.checked?undefined:states.selected?"decoration/menu/checkbox-invert.gif":"decoration/menu/checkbox.gif"};
}},"menu-radiobutton":{alias:"menu-button",include:"menu-button",style:function(states){return {icon:!states.checked?undefined:states.selected?"decoration/menu/radiobutton-invert.gif":"decoration/menu/radiobutton.gif"};
}},"menubar":{style:function(states){return {decorator:"menubar"};
}},"menubar-button":{alias:"atom",style:function(states){return {decorator:states.pressed||states.hovered?"selected":undefined,textColor:states.pressed||states.hovered?"text-selected":undefined,padding:[3,8]};
}},"colorselector":"widget","colorselector/control-bar":"widget","colorselector/control-pane":"widget","colorselector/visual-pane":"groupbox","colorselector/preset-grid":"widget","colorselector/colorbucket":{style:function(states){return {decorator:"main",width:16,height:16};
}},"colorselector/preset-field-set":"groupbox","colorselector/input-field-set":"groupbox","colorselector/preview-field-set":"groupbox","colorselector/hex-field-composite":"widget","colorselector/hex-field":"textfield","colorselector/rgb-spinner-composite":"widget","colorselector/rgb-spinner-red":"spinner","colorselector/rgb-spinner-green":"spinner","colorselector/rgb-spinner-blue":"spinner","colorselector/hsb-spinner-composite":"widget","colorselector/hsb-spinner-hue":"spinner","colorselector/hsb-spinner-saturation":"spinner","colorselector/hsb-spinner-brightness":"spinner","colorselector/preview-content-old":{style:function(states){return {decorator:"main",width:50,height:10};
}},"colorselector/preview-content-new":{style:function(states){return {decorator:"main",backgroundColor:"background-light",width:50,height:10};
}},"colorselector/hue-saturation-field":{style:function(states){return {decorator:"main",margin:5};
}},"colorselector/brightness-field":{style:function(states){return {decorator:"main",margin:[5,7]};
}},"colorselector/hue-saturation-pane":"widget","colorselector/hue-saturation-handle":"widget","colorselector/brightness-pane":"widget","colorselector/brightness-handle":"widget","colorpopup":{alias:"popup",include:"popup",style:function(states){return {padding:5,backgroundColor:"background-application"};
}},"colorpopup/field":{style:function(states){return {decorator:"main",margin:2,width:14,height:14,backgroundColor:"background-light"};
}},"colorpopup/selector-button":"button","colorpopup/auto-button":"button","colorpopup/preview-pane":"groupbox","colorpopup/current-preview":{style:function(state){return {height:20,padding:4,marginLeft:4,decorator:"main",allowGrowX:true};
}},"colorpopup/selected-preview":{style:function(state){return {height:20,padding:4,marginRight:4,decorator:"main",allowGrowX:true};
}},"colorpopup/colorselector-okbutton":{alias:"button",include:"button",style:function(states){return {icon:"icon/16/actions/dialog-ok.png"};
}},"colorpopup/colorselector-cancelbutton":{alias:"button",include:"button",style:function(states){return {icon:"icon/16/actions/dialog-cancel.png"};
}},"table":{alias:"widget",style:function(states){return {decorator:"table"};
}},"table-header":{},"table/statusbar":{style:function(states){return {decorator:"table-statusbar",padding:[0,2]};
}},"table/column-button":{alias:"button-frame",style:function(states){return {decorator:"table-column-button",padding:3,icon:"decoration/table/select-column-order.png"};
}},"table-column-reset-button":{include:"menu-button",alias:"menu-button",style:function(){return {icon:"icon/16/actions/view-refresh.png"};
}},"table-scroller":"widget","table-scroller/scrollbar-x":"scrollbar","table-scroller/scrollbar-y":"scrollbar","table-scroller/header":{style:function(states){return {decorator:"table-scroller-header"};
}},"table-scroller/pane":{style:function(states){return {backgroundColor:"table-pane"};
}},"table-scroller/focus-indicator":{style:function(states){return {decorator:"table-scroller-focus-indicator"};
}},"table-scroller/resize-line":{style:function(states){return {backgroundColor:"border-separator",width:2};
}},"table-header-cell":{alias:"atom",style:function(states){return {minWidth:13,minHeight:20,padding:states.hovered?[3,4,2,4]:[3,4],decorator:states.hovered?"table-header-cell-hovered":"table-header-cell",sortIcon:states.sorted?(states.sortedAscending?"decoration/table/ascending.png":"decoration/table/descending.png"):undefined};
}},"table-header-cell/label":{style:function(states){return {minWidth:0,alignY:"middle",paddingRight:5};
}},"table-header-cell/sort-icon":{style:function(states){return {alignY:"middle",alignX:"right"};
}},"table-header-cell/icon":{style:function(states){return {minWidth:0,alignY:"middle",paddingRight:5};
}},"table-editor-textfield":{include:"textfield",style:function(states){return {decorator:undefined,padding:[2,2],backgroundColor:"background-light"};
}},"table-editor-selectbox":{include:"selectbox",alias:"selectbox",style:function(states){return {padding:[0,2],backgroundColor:"background-light"};
}},"table-editor-combobox":{include:"combobox",alias:"combobox",style:function(states){return {decorator:undefined,backgroundColor:"background-light"};
}},"progressive-table-header":{alias:"widget",style:function(states){return {decorator:"progressive-table-header"};
}},"progressive-table-header-cell":{alias:"atom",style:function(states){return {minWidth:40,minHeight:25,paddingLeft:6,decorator:"progressive-table-header-cell"};
}},"app-header":{style:function(states){return {font:"bold",textColor:"text-selected",padding:[8,12],decorator:"app-header"};
}},"virtual-list":"list","virtual-list/row-layer":"row-layer","row-layer":{style:function(states){return {colorEven:"white",colorOdd:"#EEE"};
}},"column-layer":"widget","cell":{style:function(states){return {textColor:states.selected?"text-selected":"text-label",padding:[3,6],font:"default"};
}},"cell-string":"cell","cell-number":{include:"cell",style:function(states){return {textAlign:"right"};
}},"cell-image":"cell","cell-boolean":{include:"cell",style:function(states){return {iconTrue:"decoration/table/boolean-true.png",iconFalse:"decoration/table/boolean-false.png"};
}},"cell-atom":"cell","cell-date":"cell","cell-html":"cell"}});
qx.Theme.define("gui4.theme.Appearance",{extend:qx.theme.modern.Appearance,appearances:{}});
qx.Theme.define("gui4.theme.Theme",{meta:{color:gui4.theme.Color,decoration:gui4.theme.Decoration,font:gui4.theme.Font,icon:qx.theme.icon.Tango,appearance:gui4.theme.Appearance}});
qx.Bootstrap.define("qx.lang.Core",{statics:{errorToString:qx.lang.Object.select((!Error.prototype.toString||Error.prototype.toString()=="[object Error]")?"emulated":"native",{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}),arrayIndexOf:qx.lang.Object.select(Array.prototype.indexOf?"native":"emulated",{"native":Array.prototype.indexOf,"emulated":function(searchElement,fromIndex){if(fromIndex==null){fromIndex=0;
}else if(fromIndex<0){fromIndex=Math.max(0,this.length+fromIndex);
}
for(var i=fromIndex;i<this.length;i++){if(this[i]===searchElement){return i;
}}return -1;
}}),arrayLastIndexOf:qx.lang.Object.select(Array.prototype.lastIndexOf?"native":"emulated",{"native":Array.prototype.lastIndexOf,"emulated":function(searchElement,fromIndex){if(fromIndex==null){fromIndex=this.length-1;
}else if(fromIndex<0){fromIndex=Math.max(0,this.length+fromIndex);
}
for(var i=fromIndex;i>=0;i--){if(this[i]===searchElement){return i;
}}return -1;
}}),arrayForEach:qx.lang.Object.select(Array.prototype.forEach?"native":"emulated",{"native":Array.prototype.forEach,"emulated":function(callback,obj){var l=this.length;

for(var i=0;i<l;i++){var value=this[i];

if(value!==undefined){callback.call(obj||window,value,i,this);
}}}}),arrayFilter:qx.lang.Object.select(Array.prototype.filter?"native":"emulated",{"native":Array.prototype.filter,"emulated":function(callback,obj){var res=[];
var l=this.length;

for(var i=0;i<l;i++){var value=this[i];

if(value!==undefined){if(callback.call(obj||window,value,i,this)){res.push(this[i]);
}}}return res;
}}),arrayMap:qx.lang.Object.select(Array.prototype.map?"native":"emulated",{"native":Array.prototype.map,"emulated":function(callback,obj){var res=[];
var l=this.length;

for(var i=0;i<l;i++){var value=this[i];

if(value!==undefined){res[i]=callback.call(obj||window,value,i,this);
}}return res;
}}),arraySome:qx.lang.Object.select(Array.prototype.some?"native":"emulated",{"native":Array.prototype.some,"emulated":function(callback,obj){var l=this.length;

for(var i=0;i<l;i++){var value=this[i];

if(value!==undefined){if(callback.call(obj||window,value,i,this)){return true;
}}}return false;
}}),arrayEvery:qx.lang.Object.select(Array.prototype.every?"native":"emulated",{"native":Array.prototype.every,"emulated":function(callback,obj){var l=this.length;

for(var i=0;i<l;i++){var value=this[i];

if(value!==undefined){if(!callback.call(obj||window,value,i,this)){return false;
}}}return true;
}}),stringQuote:qx.lang.Object.select(String.prototype.quote?"native":"emulated",{"native":String.prototype.quote,"emulated":function(){return '"'+this.replace(/\\/g,"\\\\").replace(/\"/g,"\\\"")+'"';
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
qx.Bootstrap.define("qx.lang.Generics",{statics:{__map:{"Array":["join","reverse","sort","push","pop","shift","unshift","splice","concat","slice","indexOf","lastIndexOf","forEach","map","filter","some","every"],"String":["quote","substring","toLowerCase","toUpperCase","charAt","charCodeAt","indexOf","lastIndexOf","toLocaleLowerCase","toLocaleUpperCase","localeCompare","match","search","replace","split","substr","concat","slice"]},__wrap:function(obj,func){return function(s){return obj.prototype[func].apply(s,Array.prototype.slice.call(arguments,1));
};
},__init:function(){var map=qx.lang.Generics.__map;

for(var key in map){var obj=window[key];
var arr=map[key];

for(var i=0,l=arr.length;i<l;i++){var func=arr[i];

if(!obj[func]){obj[func]=qx.lang.Generics.__wrap(obj,func);
}}}}},defer:function(statics){statics.__init();
}});
qx.Interface.define("qx.data.IListData",{events:{"change":"qx.event.type.Data","changeLength":"qx.event.type.Event"},members:{getItem:function(index){},setItem:function(index,item){},splice:function(startIndex,amount,varargs){},contains:function(item){},getLength:function(){},toArray:function(){}}});
qx.Bootstrap.define("qx.lang.Date",{statics:{now:function(){return +new Date;
}}});
qx.Bootstrap.define("qx.event.GlobalError",{statics:{setErrorHandler:function(callback,context){this.__callback=callback||null;
this.__context=context||window;

if(qx.core.Setting.get("qx.globalErrorHandling")==="on"){if(callback&&!window.onerror){window.onerror=qx.lang.Function.bind(this.__onErrorWindow,this);
}
if(!callback&&window.onerror){window.onerror=null;
}}},__onErrorWindow:function(msg,uri,lineNumber){if(this.__callback){this.handleError(new qx.core.WindowError(msg,uri,lineNumber));
return true;
}},observeMethod:function(method){if(qx.core.Setting.get("qx.globalErrorHandling")==="on"){var self=this;
return function(){if(!self.__callback){return method.apply(this,arguments);
}
try{return method.apply(this,arguments);
}catch(ex){self.handleError(ex);
}};
}else{return method;
}},handleError:function(ex){if(this.__callback){this.__callback.call(this.__context,ex);
}}},defer:function(statics){qx.core.Setting.define("qx.globalErrorHandling","on");
statics.setErrorHandler(null,null);
}});
qx.Class.define("qx.core.WindowError",{extend:Error,construct:function(failMessage,uri,lineNumber){Error.call(this,failMessage);
this.__failMessage=failMessage;
this.__uri=uri||"";
this.__lineNumber=lineNumber===undefined?-1:lineNumber;
},members:{__failMessage:null,__uri:null,__lineNumber:null,toString:function(){return this.__failMessage;
},getUri:function(){return this.__uri;
},getLineNumber:function(){return this.__lineNumber;
}}});
qx.Class.define("qx.event.type.Event",{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(canBubble,cancelable){{};
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
qx.Class.define("qx.event.type.Data",{extend:qx.event.type.Event,members:{__data:null,__old:null,init:function(data,old,cancelable){arguments.callee.base.call(this,false,cancelable);
this.__data=data;
this.__old=old;
return this;
},clone:function(embryo){var clone=arguments.callee.base.call(this,embryo);
clone.__data=this.__data;
clone.__old=this.__old;
return clone;
},getData:function(){return this.__data;
},getOldData:function(){return this.__old;
}},destruct:function(){this.__data=this.__old=null;
}});
qx.Interface.define("qx.event.IEventHandler",{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:3},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){}}});
qx.Class.define("qx.event.handler.Application",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
this._window=manager.getWindow();
this.__domReady=false;
this.__loaded=false;
this._initObserver();
qx.event.handler.Application.$$instance=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,__scriptLoaded:false,onScriptLoaded:function(){this.__scriptLoaded=true;
var inst=qx.event.handler.Application.$$instance;

if(inst){inst.__fireReady();
}}},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){},__isReady:null,__domReady:null,__loaded:null,__isUnloaded:null,__fireReady:function(){var clazz=qx.event.handler.Application;
if(!this.__isReady&&this.__domReady&&clazz.__scriptLoaded){this.__isReady=true;
qx.event.Registration.fireEvent(this._window,"ready");
}},isApplicationReady:function(){return this.__isReady;
},_initObserver:function(){if(qx.$$domReady||document.readyState=="complete"){this.__domReady=true;
this.__fireReady();
}else{this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);

if(qx.core.Variant.isSet("qx.client","gecko|opera|webkit")){qx.bom.Event.addNativeListener(this._window,"DOMContentLoaded",this._onNativeLoadWrapped);
}else if(qx.core.Variant.isSet("qx.client","mshtml")){var self=this;
var timer=function(){try{document.documentElement.doScroll("left");

if(document.body){self._onNativeLoadWrapped();
}}catch(error){window.setTimeout(timer,100);
}};
timer();
}qx.bom.Event.addNativeListener(this._window,"load",this._onNativeLoadWrapped);
}this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);
qx.bom.Event.addNativeListener(this._window,"unload",this._onNativeUnloadWrapped);
},_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,"load",this._onNativeLoadWrapped);
}qx.bom.Event.removeNativeListener(this._window,"unload",this._onNativeUnloadWrapped);
this._onNativeLoadWrapped=null;
this._onNativeUnloadWrapped=null;
},_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__domReady=true;
this.__fireReady();
}),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__isUnloaded){this.__isUnloaded=true;

try{qx.event.Registration.fireEvent(this._window,"shutdown");
}catch(e){throw e;
}finally{qx.core.ObjectRegistry.shutdown();
}}})},destruct:function(){this._stopObserver();
this._window=null;
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Bootstrap.define("qx.dev.StackTrace",{statics:{getStackTrace:qx.core.Variant.select("qx.client",{"gecko":function(){try{throw new Error();
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
qx.Class.define("qx.util.ObjectPool",{extend:qx.core.Object,construct:function(size){arguments.callee.base.call(this);
this.__pool={};

if(size!=null){this.setSize(size);
}},properties:{size:{check:"Integer",init:Infinity}},members:{__pool:null,getObject:function(clazz){if(this.$$disposed){return;
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
}if(pool.length>this.getSize()){if(obj.destroy){obj.destroy();
}else{obj.dispose();
}return;
}obj.$$pooled=true;
pool.push(obj);
}},destruct:function(){var pool=this.__pool;
var classname,list,i,l;

for(classname in pool){list=pool[classname];

for(i=0,l=list.length;i<l;i++){list[i].dispose();
}}delete this.__pool;
}});
qx.Class.define("qx.event.Pool",{extend:qx.util.ObjectPool,type:"singleton",construct:function(){arguments.callee.base.call(this,30);
}});
qx.Class.define("qx.util.DisposeUtil",{statics:{disposeFields:function(obj,arr){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Don't use 'disposeFields' - instead assign directly to 'null'");
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
this.__setInitialValue(currentValue,targetObject,targetProperty,options,sourceObject);
listenerIds[i]=this.__bindEventToProperty(source,eventNames[i],targetObject,targetProperty,options,arrayIndexValues[i]);
}else{if(propertyNames[i]!=null&&source["get"+qx.lang.String.firstUp(propertyNames[i])]!=null){var currentValue=source["get"+qx.lang.String.firstUp(propertyNames[i])]();
this.__setInitialValue(currentValue,targetObject,targetProperty,options,sourceObject);
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
},__chainListener:function(context){if(context.options&&context.options.onUpdate){context.options.onUpdate(context.sources[context.index],context.targetObject);
}for(var j=context.index+1;j<context.propertyNames.length;j++){var source=context.sources[j];
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
this.__setInitialValue(currentValue,context.targetObject,context.targetProperty,context.options,context.sources[context.index]);
context.listenerIds[j]=this.__bindEventToProperty(source,"change",context.targetObject,context.targetProperty,context.options,context.arrayIndexValues[j]);
}else{if(context.propertyNames[j]!=null&&source["get"+qx.lang.String.firstUp(context.propertyNames[j])]!=null){var currentValue=source["get"+qx.lang.String.firstUp(context.propertyNames[j])]();
this.__setInitialValue(currentValue,context.targetObject,context.targetProperty,context.options,context.sources[context.index]);
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
if(lastProperty.charAt(lastProperty.length-1)=="]"){this.__setTargetValue(targetObject,targetPropertyChain,null);
return;
}if(target["reset"+qx.lang.String.firstUp(lastProperty)]!=undefined){target["reset"+qx.lang.String.firstUp(lastProperty)]();
}else{target["set"+qx.lang.String.firstUp(lastProperty)](null);
}}},__setTargetValue:function(targetObject,targetPropertyChain,value){var target=this.__getTargetFromChain(targetObject,targetPropertyChain);

if(target!=null){var lastProperty=targetPropertyChain.substring(targetPropertyChain.lastIndexOf(".")+1,targetPropertyChain.length);
if(lastProperty.charAt(lastProperty.length-1)=="]"){var index=lastProperty.substring(lastProperty.lastIndexOf("[")+1,lastProperty.length-1);
var prop=lastProperty.substring(0,lastProperty.lastIndexOf("["));
var targetArray=target["get"+qx.lang.String.firstUp(prop)]();

if(index=="last"){index=targetArray.length-1;
}
if(targetArray!=null){targetArray.setItem(index,value);
}}else{target["set"+qx.lang.String.firstUp(lastProperty)](value);
}}},__getTargetFromChain:function(targetObject,targetPropertyChain){var properties=targetPropertyChain.split(".");
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
},__setInitialValue:function(value,targetObject,targetPropertyChain,options,sourceObject){value=this.__convertValue(value,targetObject,targetPropertyChain,options);
if(value==null){this.__resetTargetValue(targetObject,targetPropertyChain);
}if(value!=undefined){try{this.__setTargetValue(targetObject,targetPropertyChain,value);
if(options&&options.onUpdate){options.onUpdate(sourceObject,targetObject,value);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(options&&options.onSetFail){options.onSetFail(e);
}else{this.warn("Failed so set value "+value+" on "+targetObject+". Error message: "+e);
}}}},__checkForArrayInPropertyChain:function(propertyNames){var arrayIndexValues=[];
for(var i=0;i<propertyNames.length;i++){var name=propertyNames[i];
if(qx.lang.String.endsWith(name,"]")){var arrayIndex=name.substring(name.indexOf("[")+1,name.indexOf("]"));
if(name.indexOf("]")!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(arrayIndex!=="last"){if(arrayIndex==""||isNaN(parseInt(arrayIndex))){throw new Error("No number or 'last' value hast been given"+" in a array binding: "+name+" does not work.");
}}if(name.indexOf("[")!=0){propertyNames[i]=name.substring(0,name.indexOf("["));
arrayIndexValues[i]="";
arrayIndexValues[i+1]=arrayIndex;
propertyNames.splice(i+1,0,"item");
i++;
}else{arrayIndexValues[i]=arrayIndex;
propertyNames.splice(i,1,"item");
}}else{arrayIndexValues[i]="";
}}return arrayIndexValues;
},__bindEventToProperty:function(sourceObject,sourceEvent,targetObject,targetProperty,options,arrayIndex){var eventType;
{};
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
}if(options&&options.onUpdate){options.onUpdate(sourceObject,targetObject,data);
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
},__convertValue:function(value,targetObject,targetPropertyChain,options){if(options&&options.converter){var model;

if(targetObject.getModel){model=targetObject.getModel();
}return options.converter(value,model);
}else{var target=this.__getTargetFromChain(targetObject,targetPropertyChain);
var lastProperty=targetPropertyChain.substring(targetPropertyChain.lastIndexOf(".")+1,targetPropertyChain.length);
if(target==null){return value;
}var propertieDefinition=qx.Class.getPropertyDefinition(target.constructor,lastProperty);
var check=propertieDefinition==null?"":propertieDefinition.check;
return this.__defaultConvertion(value,check);
}},__getEventForProperty:function(sourceObject,sourceProperty){var propertieDefinition=qx.Class.getPropertyDefinition(sourceObject.constructor,sourceProperty);

if(propertieDefinition==null){return null;
}return propertieDefinition.event;
},__defaultConvertion:function(data,targetCheck){var dataType=qx.lang.Type.getClass(data);
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
},removeAllBindingsForObject:function(object){{};
var bindings=this.__bindings[object.toHashCode()];

if(bindings!=undefined){for(var i=bindings.length-1;i>=0;i--){this.removeBindingFromObject(object,bindings[i][0]);
}}},getAllBindingsForObject:function(object){if(this.__bindings[object.toHashCode()]===undefined){this.__bindings[object.toHashCode()]=[];
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
qx.Class.define("qx.type.BaseError",{extend:Error,construct:function(comment,failMessage){Error.call(this,failMessage);
this.__comment=comment||"";
this.message=failMessage||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__comment:null,message:null,getComment:function(){return this.__comment;
},toString:function(){return this.__comment+": "+this.message;
}}});
qx.Class.define("qx.core.AssertionError",{extend:qx.type.BaseError,construct:function(comment,failMessage){qx.type.BaseError.call(this,comment,failMessage);
this.__trace=qx.dev.StackTrace.getStackTrace();
},members:{__trace:null,getStackTrace:function(){return this.__trace;
}}});
qx.Class.define("qx.core.ValidationError",{extend:qx.type.BaseError});
qx.Class.define("qx.event.handler.Object",{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(target,type){return qx.Class.supportsEvent(target.constructor,type);
},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){}},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Class.define("qx.util.ValueManager",{type:"abstract",extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this._dynamic={};
},members:{_dynamic:null,resolveDynamic:function(value){return this._dynamic[value];
},isDynamic:function(value){return !!this._dynamic[value];
},resolve:function(value){if(value&&this._dynamic[value]){return this._dynamic[value];
}return value;
},_setDynamic:function(value){this._dynamic=value;
},_getDynamic:function(){return this._dynamic;
}},destruct:function(){this._dynamic=null;
}});
qx.Class.define("qx.util.AliasManager",{type:"singleton",extend:qx.util.ValueManager,construct:function(){arguments.callee.base.call(this);
this.__aliases={};
this.add("static","qx/static");
},members:{__aliases:null,_preprocess:function(value){var dynamics=this._getDynamic();

if(dynamics[value]===false){return value;
}else if(dynamics[value]===undefined){if(value.charAt(0)==="/"||value.charAt(0)==="."||value.indexOf("http://")===0||value.indexOf("https://")==="0"||value.indexOf("file://")===0){dynamics[value]=false;
return value;
}
if(this.__aliases[value]){return this.__aliases[value];
}var alias=value.substring(0,value.indexOf("/"));
var resolved=this.__aliases[alias];

if(resolved!==undefined){dynamics[value]=resolved+value.substring(alias.length);
}}return value;
},add:function(alias,base){this.__aliases[alias]=base;
var dynamics=this._getDynamic();
for(var path in dynamics){if(path.substring(0,path.indexOf("/"))===alias){dynamics[path]=base+path.substring(alias.length);
}}},remove:function(alias){delete this.__aliases[alias];
},resolve:function(path){var dynamic=this._getDynamic();

if(path!==null){path=this._preprocess(path);
}return dynamic[path]||path;
}},destruct:function(){this.__aliases=null;
}});
qx.Class.define("qx.bom.element.Decoration",{statics:{DEBUG:false,__warnings:{},__enableAlphaFix:qx.core.Variant.isSet("qx.client","mshtml")&&qx.bom.client.Engine.VERSION<9,__alphaFixRepeats:qx.core.Variant.select("qx.client",{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__repeatToTagname:{"scale-x":"img","scale-y":"img","scale":"img","repeat":"div","no-repeat":"div","repeat-x":"div","repeat-y":"div"},update:function(element,source,repeat,style){var tag=this.getTagName(repeat,source);

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
},getAttributes:function(source,repeat,style){if(!style){style={};
}
if(!style.position){style.position="absolute";
}
if(qx.core.Variant.isSet("qx.client","mshtml")){style.fontSize=0;
style.lineHeight=0;
}else if(qx.core.Variant.isSet("qx.client","webkit")){style.WebkitUserDrag="none";
}var format=qx.util.ResourceManager.getInstance().getImageFormat(source)||qx.io2.ImageLoader.getFormat(source);
{};
var result;
if(this.__enableAlphaFix&&this.__alphaFixRepeats[repeat]&&format==="png"){result=this.__processAlphaFix(style,repeat,source);
}else{if(repeat==="scale"){result=this.__processScale(style,repeat,source);
}else if(repeat==="scale-x"||repeat==="scale-y"){result=this.__processScaleXScaleY(style,repeat,source);
}else{result=this.__processRepeats(style,repeat,source);
}}return result;
},__normalizeWidthHeight:function(style,width,height){if(style.width==null&&width!=null){style.width=width+"px";
}
if(style.height==null&&height!=null){style.height=height+"px";
}return style;
},__getDimension:function(source){var width=qx.util.ResourceManager.getInstance().getImageWidth(source)||qx.io2.ImageLoader.getWidth(source);
var height=qx.util.ResourceManager.getInstance().getImageHeight(source)||qx.io2.ImageLoader.getHeight(source);
return {width:width,height:height};
},__processAlphaFix:function(style,repeat,source){var dimension=this.__getDimension(source);
style=this.__normalizeWidthHeight(style,dimension.width,dimension.height);
var sizingMethod=repeat=="no-repeat"?"crop":"scale";
var filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+qx.util.ResourceManager.getInstance().toUri(source)+"', sizingMethod='"+sizingMethod+"')";
style.filter=filter;
style.backgroundImage=style.backgroundRepeat="";
return {style:style};
},__processScale:function(style,repeat,source){var uri=qx.util.ResourceManager.getInstance().toUri(source);
var dimension=this.__getDimension(source);
style=this.__normalizeWidthHeight(style,dimension.width,dimension.height);
return {src:uri,style:style};
},__processScaleXScaleY:function(style,repeat,source){var ResourceManager=qx.util.ResourceManager.getInstance();
var clipped=ResourceManager.isClippedImage(source);
var dimension=this.__getDimension(source);

if(clipped){var data=ResourceManager.getData(source);
var uri=ResourceManager.toUri(data[4]);

if(repeat==="scale-x"){style=this.__getStylesForClippedScaleX(style,data,dimension.height);
}else{style=this.__getStylesForClippedScaleY(style,data,dimension.width);
}return {src:uri,style:style};
}else{{};

if(repeat=="scale-x"){style.height=dimension.height==null?null:dimension.height+"px";
}else if(repeat=="scale-y"){style.width=dimension.width==null?null:dimension.width+"px";
}var uri=ResourceManager.toUri(source);
return {src:uri,style:style};
}},__getStylesForClippedScaleX:function(style,data,height){var imageHeight=qx.util.ResourceManager.getInstance().getImageHeight(data[4]);
style.clip={top:-data[6],height:height};
style.height=imageHeight+"px";
if(style.top!=null){style.top=(parseInt(style.top,10)+data[6])+"px";
}else if(style.bottom!=null){style.bottom=(parseInt(style.bottom,10)+height-imageHeight-data[6])+"px";
}return style;
},__getStylesForClippedScaleY:function(style,data,width){var imageWidth=qx.util.ResourceManager.getInstance().getImageWidth(data[4]);
style.clip={left:-data[5],width:width};
style.width=imageWidth+"px";
if(style.left!=null){style.left=(parseInt(style.left,10)+data[5])+"px";
}else if(style.right!=null){style.right=(parseInt(style.right,10)+width-imageWidth-data[5])+"px";
}return style;
},__processRepeats:function(style,repeat,source){var clipped=qx.util.ResourceManager.getInstance().isClippedImage(source);
var dimension=this.__getDimension(source);
if(clipped&&repeat!=="repeat"){var data=qx.util.ResourceManager.getInstance().getData(source);
var bg=qx.bom.element.Background.getStyles(data[4],repeat,data[5],data[6]);

for(var key in bg){style[key]=bg[key];
}
if(dimension.width!=null&&style.width==null&&(repeat=="repeat-y"||repeat==="no-repeat")){style.width=dimension.width+"px";
}
if(dimension.height!=null&&style.height==null&&(repeat=="repeat-x"||repeat==="no-repeat")){style.height=dimension.height+"px";
}return {style:style};
}else{{};
style=this.__normalizeWidthHeight(style,dimension.width,dimension.height);
style=this.__getStylesForSingleRepeat(style,source,repeat);
return {style:style};
}},__getStylesForSingleRepeat:function(style,source,repeat){var top=null;
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
},__checkForPotentialClippedImage:function(source){if(this.DEBUG&&qx.util.ResourceManager.getInstance().has(source)&&source.indexOf("qx/icon")==-1){if(!this.__warnings[source]){qx.log.Logger.debug("Potential clipped image candidate: "+source);
this.__warnings[source]=true;
}}},isAlphaImageLoaderEnabled:qx.core.Variant.select("qx.client",{"mshtml":function(){return qx.bom.element.Decoration.__enableAlphaFix;
},"default":function(){return false;
}})}});
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
}if(!element.currentStyle||!element.currentStyle.hasLayout){element.style.zoom=1;
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
},compile:qx.core.Variant.select("qx.client",{"mshtml":function(value){{};
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
}}),set:qx.core.Variant.select("qx.client",{"mshtml":function(element,value){{};
},"default":function(element,value){var props=this.__styleProperties;

if(props){for(var i=0,l=props.length;i<l;i++){element.style[props[i]]=value;
}}}}),reset:function(element){this.set(element,"");
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
qx.Class.define("qx.bom.element.Style",{statics:{__hints:{styleNames:{"float":qx.core.Variant.select("qx.client",{"mshtml":"styleFloat","default":"cssFloat"}),"appearance":qx.core.Variant.select("qx.client",{"gecko":"MozAppearance","webkit":"WebkitAppearance","default":"appearance"}),"userSelect":qx.core.Variant.select("qx.client",{"gecko":"MozUserSelect","webkit":"WebkitUserSelect","default":"userSelect"}),"userModify":qx.core.Variant.select("qx.client",{"gecko":"MozUserModify","webkit":"WebkitUserModify","default":"userSelect"})},cssNames:{"appearance":qx.core.Variant.select("qx.client",{"gecko":"-moz-appearance","webkit":"-webkit-appearance","default":"appearance"}),"userSelect":qx.core.Variant.select("qx.client",{"gecko":"-moz-user-select","webkit":"-webkit-user-select","default":"user-select"}),"userModify":qx.core.Variant.select("qx.client",{"gecko":"-moz-user-modify","webkit":"-webkit-user-modify","default":"user-select"}),"textOverflow":qx.core.Variant.select("qx.client",{"opera":"-o-text-overflow","default":"text-overflow"})},mshtmlPixel:{width:"pixelWidth",height:"pixelHeight",left:"pixelLeft",right:"pixelRight",top:"pixelTop",bottom:"pixelBottom"},special:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing,overflowX:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setX,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getX,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetX,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileX,qx.bom.element.Overflow)},overflowY:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setY,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getY,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetY,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileY,qx.bom.element.Overflow)}}},__hyphens:{},compile:function(map){var html=[];
var hints=this.__hints;
var special=hints.special;
var names=hints.cssNames;
var hyphens=this.__hyphens;
var str=qx.lang.String;
var name,prop,value;

for(name in map){value=map[name];

if(value==null){continue;
}name=names[name]||name;
if(special[name]){html.push(special[name].compile(value));
}else{prop=hyphens[name];

if(!prop){prop=hyphens[name]=str.hyphenate(name);
}html.push(prop,":",value,";");
}}return html.join("");
},setCss:qx.core.Variant.select("qx.client",{"mshtml":function(element,value){element.style.cssText=value;
},"default":function(element,value){element.setAttribute("style",value);
}}),getCss:qx.core.Variant.select("qx.client",{"mshtml":function(element){return element.style.cssText.toLowerCase();
},"default":function(element){return element.getAttribute("style");
}}),COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(element,name,value,smart){{};
var hints=this.__hints;
name=hints.styleNames[name]||name;
if(smart!==false&&hints.special[name]){return hints.special[name].set(element,value);
}else{element.style[name]=value!==null?value:"";
}},setStyles:function(element,styles,smart){{};
var hints=this.__hints;
var styleNames=hints.styleNames;
var special=hints.special;
var style=element.style;

for(var key in styles){var value=styles[key];
var name=styleNames[key]||key;

if(value===undefined){if(smart!==false&&special[name]){special[name].reset(element);
}else{style[name]="";
}}else{if(smart!==false&&special[name]){special[name].set(element,value);
}else{style[name]=value!==null?value:"";
}}}},reset:function(element,name,smart){var hints=this.__hints;
name=hints.styleNames[name]||name;
if(smart!==false&&hints.special[name]){return hints.special[name].reset(element);
}else{element.style[name]="";
}},get:qx.core.Variant.select("qx.client",{"mshtml":function(element,name,mode,smart){var hints=this.__hints;
name=hints.styleNames[name]||name;
if(smart!==false&&hints.special[name]){return hints.special[name].get(element,mode);
}if(!element.currentStyle){return element.style[name]||"";
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
if(smart!==false&&hints.special[name]){return hints.special[name].get(element,mode);
}switch(mode){case this.LOCAL_MODE:return element.style[name]||"";
case this.CASCADED_MODE:if(element.currentStyle){return element.currentStyle[name]||"";
}throw new Error("Cascaded styles are not supported in this browser!");
default:var doc=qx.dom.Node.getDocument(element);
var computed=doc.defaultView.getComputedStyle(element,null);
return computed?computed[name]:"";
}}})}});
qx.Class.define("qx.bom.Document",{statics:{isQuirksMode:qx.core.Variant.select("qx.client",{"mshtml":function(win){if(qx.bom.client.Engine.VERSION>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return (win||window).document.compatMode!=="CSS1Compat";
}},"webkit":function(win){if(document.compatMode===undefined){var el=(win||window).document.createElement("div");
el.style.cssText="position:absolute;width:0;height:0;width:1";
return el.style.width==="1px"?true:false;
}else{return (win||window).document.compatMode!=="CSS1Compat";
}},"default":function(win){return (win||window).document.compatMode!=="CSS1Compat";
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
qx.Class.define("qx.bom.Viewport",{statics:{getWidth:qx.core.Variant.select("qx.client",{"opera":function(win){if(qx.bom.client.Engine.VERSION<9.5){return (win||window).document.body.clientWidth;
}else{var doc=(win||window).document;
return qx.bom.Document.isStandardMode(win)?doc.documentElement.clientWidth:doc.body.clientWidth;
}},"webkit":function(win){if(qx.bom.client.Engine.VERSION<523.15){return (win||window).innerWidth;
}else{var doc=(win||window).document;
return qx.bom.Document.isStandardMode(win)?doc.documentElement.clientWidth:doc.body.clientWidth;
}},"default":function(win){var doc=(win||window).document;
return qx.bom.Document.isStandardMode(win)?doc.documentElement.clientWidth:doc.body.clientWidth;
}}),getHeight:qx.core.Variant.select("qx.client",{"opera":function(win){if(qx.bom.client.Engine.VERSION<9.5){return (win||window).document.body.clientHeight;
}else{var doc=(win||window).document;
return qx.bom.Document.isStandardMode(win)?doc.documentElement.clientHeight:doc.body.clientHeight;
}},"webkit":function(win){if(qx.bom.client.Engine.VERSION<523.15){return (win||window).innerHeight;
}else{var doc=(win||window).document;
return qx.bom.Document.isStandardMode(win)?doc.documentElement.clientHeight:doc.body.clientHeight;
}},"default":function(win){var doc=(win||window).document;
return qx.bom.Document.isStandardMode(win)?doc.documentElement.clientHeight:doc.body.clientHeight;
}}),getScrollLeft:qx.core.Variant.select("qx.client",{"mshtml":function(win){var doc=(win||window).document;
return doc.documentElement.scrollLeft||doc.body.scrollLeft;
},"default":function(win){return (win||window).pageXOffset;
}}),getScrollTop:qx.core.Variant.select("qx.client",{"mshtml":function(win){var doc=(win||window).document;
return doc.documentElement.scrollTop||doc.body.scrollTop;
},"default":function(win){return (win||window).pageYOffset;
}})}});
qx.Bootstrap.define("qx.bom.client.Feature",{statics:{STANDARD_MODE:false,QUIRKS_MODE:false,CONTENT_BOX:false,BORDER_BOX:false,SVG:false,CANVAS:false,VML:false,XPATH:false,AIR:false,GEARS:false,SSL:false,__init:function(){this.QUIRKS_MODE=this.__isQuirksMode();
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
},__isQuirksMode:function(){if(qx.bom.client.Engine.MSHTML&&qx.bom.client.Engine.VERSION>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return document.compatMode!=="CSS1Compat";
}}},defer:function(statics){statics.__init();
}});
qx.Class.define("qx.util.ResourceManager",{extend:qx.core.Object,type:"singleton",statics:{__registry:qx.$$resources||{},__urlPrefix:{}},members:{has:function(id){return !!arguments.callee.self.__registry[id];
},getData:function(id){return arguments.callee.self.__registry[id]||null;
},getImageWidth:function(id){var entry=arguments.callee.self.__registry[id];
return entry?entry[0]:null;
},getImageHeight:function(id){var entry=arguments.callee.self.__registry[id];
return entry?entry[1]:null;
},getImageFormat:function(id){var entry=arguments.callee.self.__registry[id];
return entry?entry[2]:null;
},isClippedImage:function(id){var entry=arguments.callee.self.__registry[id];
return entry&&entry.length>4;
},toUri:function(id){if(id==null){return id;
}var entry=arguments.callee.self.__registry[id];

if(!entry){return id;
}
if(typeof entry==="string"){var lib=entry;
}else{var lib=entry[3];
if(!lib){return id;
}}var urlPrefix="";

if(qx.core.Variant.isSet("qx.client","mshtml")&&qx.bom.client.Feature.SSL){urlPrefix=arguments.callee.self.__urlPrefix[lib];
}return urlPrefix+qx.$$libraries[lib].resourceUri+"/"+id;
}},defer:function(statics){if(qx.core.Variant.isSet("qx.client","mshtml")){if(qx.bom.client.Feature.SSL){for(var lib in qx.$$libraries){var resourceUri=qx.$$libraries[lib].resourceUri;
if(resourceUri.match(/^\/\//)!=null){statics.__urlPrefix[lib]=window.location.protocol;
}else if(resourceUri.match(/^\.\//)!=null&&qx.core.Setting.get("qx.isSource")){var url=document.URL;
statics.__urlPrefix[lib]=url.substring(0,url.lastIndexOf("/"));
}else if(resourceUri.match(/^http/)!=null){}else{var index=window.location.href.indexOf("?");
var href;

if(index==-1){href=window.location.href;
}else{href=window.location.href.substring(0,index);
}statics.__urlPrefix[lib]=href.substring(0,href.lastIndexOf("/")+1);
}}}}}});
qx.Bootstrap.define("qx.io2.ImageLoader",{statics:{__data:{},__defaultSize:{width:null,height:null},__knownImageTypesRegExp:/\.(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(source){var entry=this.__data[source];
return !!(entry&&entry.loaded);
},isFailed:function(source){var entry=this.__data[source];
return !!(entry&&entry.failed);
},isLoading:function(source){var entry=this.__data[source];
return !!(entry&&entry.loading);
},getFormat:function(source){var entry=this.__data[source];
return entry?entry.format:null;
},getSize:function(source){var entry=this.__data[source];
return entry?
{width:entry.width,height:entry.height}:this.__defaultSize;
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
}},__onload:qx.event.GlobalError.observeMethod(function(event,element,source){var entry=this.__data[source];
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
}}),__getWidth:qx.core.Variant.select("qx.client",{"gecko":function(element){return element.naturalWidth;
},"default":function(element){return element.width;
}}),__getHeight:qx.core.Variant.select("qx.client",{"gecko":function(element){return element.naturalHeight;
},"default":function(element){return element.height;
}})}});
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
var backgroundImageUrl=qx.util.ResourceManager.getInstance().toUri(source);
var tmpl=this.__tmpl;
tmpl[1]=backgroundImageUrl;
tmpl[4]=position;
tmpl[7]=repeat;
return tmpl.join("");
},getStyles:function(source,repeat,left,top){if(!source){return this.__emptyStyles;
}var position=this.__computePosition(left,top);
var backgroundImageUrl=qx.util.ResourceManager.getInstance().toUri(source);
var map={backgroundPosition:position,backgroundImage:"url("+backgroundImageUrl+")"};

if(repeat!=null){map.backgroundRepeat=repeat;
}return map;
},set:function(element,source,repeat,left,top){var styles=this.getStyles(source,repeat,left,top);

for(var prop in styles){element.style[prop]=styles[prop];
}}}});
qx.Class.define("qx.theme.manager.Color",{type:"singleton",extend:qx.util.ValueManager,properties:{theme:{check:"Theme",nullable:true,apply:"_applyTheme",event:"changeTheme"}},members:{_applyTheme:function(value){var dest={};

if(value){var source=value.colors;
var util=qx.util.ColorUtil;
var temp;

for(var key in source){temp=source[key];

if(typeof temp==="string"){if(!util.isCssString(temp)){throw new Error("Could not parse color: "+temp);
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
qx.Class.define("qx.util.ColorUtil",{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(value){return this.NAMED[value]!==undefined;
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
}else if(this.isRgbaString(str)){return this.__rgbaStringToRgb();
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
},isRgbaString:function(str){return this.REGEXP.rgba.test(str);
},__rgbStringToRgb:function(){var red=parseInt(RegExp.$1,10);
var green=parseInt(RegExp.$2,10);
var blue=parseInt(RegExp.$3,10);
return [red,green,blue];
},__rgbaStringToRgb:function(){var red=parseInt(RegExp.$1,10);
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
qx.Class.define("qx.event.handler.Window",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
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
qx.Class.define("qx.core.Init",{statics:{getApplication:function(){return this.__application||null;
},__ready:function(){if(qx.bom.client.Engine.UNKNOWN_ENGINE){qx.log.Logger.warn("Could not detect engine!");
}
if(qx.bom.client.Engine.UNKNOWN_VERSION){qx.log.Logger.warn("Could not detect the version of the engine!");
}
if(qx.bom.client.Platform.UNKNOWN_PLATFORM){qx.log.Logger.warn("Could not detect platform!");
}
if(qx.bom.client.System.UNKNOWN_SYSTEM){qx.log.Logger.warn("Could not detect system!");
}qx.log.Logger.debug(this,"Load runtime: "+(new Date-qx.Bootstrap.LOADSTART)+"ms");
var app=qx.core.Setting.get("qx.application");
var clazz=qx.Class.getByName(app);

if(clazz){this.__application=new clazz;
var start=new Date;
this.__application.main();
qx.log.Logger.debug(this,"Main runtime: "+(new Date-start)+"ms");
var start=new Date;
this.__application.finalize();
qx.log.Logger.debug(this,"Finalize runtime: "+(new Date-start)+"ms");
}else{qx.log.Logger.warn("Missing application class: "+app);
}},__close:function(e){var app=this.__application;

if(app){e.setReturnValue(app.close());
}},__shutdown:function(){var app=this.__application;

if(app){app.terminate();
}}},defer:function(statics){qx.event.Registration.addListener(window,"ready",statics.__ready,statics);
qx.event.Registration.addListener(window,"shutdown",statics.__shutdown,statics);
qx.event.Registration.addListener(window,"beforeunload",statics.__close,statics);
}});
qx.Interface.define("qx.application.IApplication",{members:{main:function(){},finalize:function(){},close:function(){},terminate:function(){}}});
qx.Mixin.define("qx.locale.MTranslation",{members:{tr:function(messageId,varargs){var nlsManager=qx.locale.Manager;

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
qx.Class.define("qx.application.AbstractGui",{type:"abstract",extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,members:{__root:null,_createRootWidget:function(){throw new Error("Abstract method call");
},getRoot:function(){return this.__root;
},main:function(){qx.theme.manager.Meta.getInstance().initialize();
qx.ui.tooltip.Manager.getInstance();
this.__root=this._createRootWidget();
},finalize:function(){this.render();
},render:function(){qx.ui.core.queue.Manager.flush();
},close:function(val){},terminate:function(){}},destruct:function(){this.__root=null;
}});
qx.Class.define("qx.application.Standalone",{extend:qx.application.AbstractGui,members:{_createRootWidget:function(){return new qx.ui.root.Application(document);
}}});
qx.Class.define("gui4.Application",{extend:qx.application.Standalone,members:{main:function(){arguments.callee.base.call(this);
{};
var button1=new qx.ui.form.Button("First Button","gui4/test.png");
var doc=this.getRoot();
doc.add(button1,{left:100,top:50});
button1.addListener("execute",function(e){alert("Hello World!");
});
}}});
qx.Class.define("qx.event.type.Native",{extend:qx.event.type.Event,members:{init:function(nativeEvent,target,relatedTarget,canBubble,cancelable){arguments.callee.base.call(this,canBubble,cancelable);
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
qx.Class.define("qx.theme.manager.Meta",{type:"singleton",extend:qx.core.Object,properties:{theme:{check:"Theme",nullable:true,apply:"_applyTheme"}},members:{_applyTheme:function(value,old){var color=null;
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
theme=setting.get("qx.theme");

if(theme){obj=qx.Theme.getByName(theme);

if(!obj){throw new Error("The theme to use is not available: "+theme);
}this.setTheme(obj);
}}},settings:{"qx.theme":"qx.theme.Classic"}});
qx.Class.define("qx.theme.manager.Decoration",{type:"singleton",extend:qx.core.Object,properties:{theme:{check:"Theme",nullable:true,apply:"_applyTheme"}},members:{__dynamic:null,resolve:function(value){if(!value){return null;
}
if(typeof value==="object"){return value;
}var theme=this.getTheme();

if(!theme){return null;
}var theme=this.getTheme();

if(!theme){return null;
}var cache=this.__dynamic;

if(!cache){cache=this.__dynamic={};
}var resolved=cache[value];

if(resolved){return resolved;
}var entry=theme.decorations[value];

if(!entry){return null;
}var clazz=entry.decorator;

if(clazz==null){throw new Error("Missing definition of which decorator to use in entry: "+value+"!");
}return cache[value]=(new clazz).set(entry.style);
},isValidPropertyValue:function(value){if(typeof value==="string"){return this.isDynamic(value);
}else if(typeof value==="object"){var clazz=value.constructor;
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
if(!value){this.__dynamic={};
}}},destruct:function(){this._disposeMap("__dynamic");
}});
qx.Class.define("qx.theme.manager.Font",{type:"singleton",extend:qx.util.ValueManager,properties:{theme:{check:"Theme",nullable:true,apply:"_applyTheme",event:"changeTheme"}},members:{resolveDynamic:function(value){var dynamic=this._dynamic;
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
qx.Class.define("qx.bom.Font",{extend:qx.core.Object,construct:function(size,family){arguments.callee.base.call(this);

if(size!==undefined){this.setSize(size);
}
if(family!==undefined){this.setFamily(family);
}},statics:{fromString:function(str){var font=new qx.bom.Font();
var parts=str.split(/\s+/);
var name=[];
var part;

for(var i=0;i<parts.length;i++){switch(part=parts[i]){case "bold":font.setBold(true);
break;
case "italic":font.setItalic(true);
break;
case "underline":font.setDecoration("underline");
break;
default:var temp=parseInt(part,10);

if(temp==part||qx.lang.String.contains(part,"px")){font.setSize(temp);
}else{name.push(part);
}break;
}}
if(name.length>0){font.setFamily(name);
}return font;
},fromConfig:function(config){var font=new qx.bom.Font;
font.set(config);
return font;
},__defaultStyles:{fontFamily:"",fontSize:"",fontWeight:"",fontStyle:"",textDecoration:"",lineHeight:1.2},getDefaultStyles:function(){return this.__defaultStyles;
}},properties:{size:{check:"Integer",nullable:true,apply:"_applySize"},lineHeight:{check:"Number",nullable:true,apply:"_applyLineHeight"},family:{check:"Array",nullable:true,apply:"_applyFamily"},bold:{check:"Boolean",nullable:true,apply:"_applyBold"},italic:{check:"Boolean",nullable:true,apply:"_applyItalic"},decoration:{check:["underline","line-through","overline"],nullable:true,apply:"_applyDecoration"}},members:{__size:null,__family:null,__bold:null,__italic:null,__decoration:null,__lineHeight:null,_applySize:function(value,old){this.__size=value===null?null:value+"px";
},_applyLineHeight:function(value,old){this.__lineHeight=value===null?null:value;
},_applyFamily:function(value,old){var family="";

for(var i=0,l=value.length;i<l;i++){if(value[i].indexOf(" ")>0){family+='"'+value[i]+'"';
}else{family+=value[i];
}
if(i!==l-1){family+=",";
}}this.__family=family;
},_applyBold:function(value,old){this.__bold=value===null?null:value?"bold":"normal";
},_applyItalic:function(value,old){this.__italic=value===null?null:value?"italic":"normal";
},_applyDecoration:function(value,old){this.__decoration=value===null?null:value;
},getStyles:function(){return {fontFamily:this.__family,fontSize:this.__size,fontWeight:this.__bold,fontStyle:this.__italic,textDecoration:this.__decoration,lineHeight:this.__lineHeight};
}}});
qx.Class.define("qx.theme.manager.Icon",{type:"singleton",extend:qx.core.Object,properties:{theme:{check:"Theme",nullable:true,apply:"_applyTheme"}},members:{_applyTheme:function(value,old){var aliasManager=qx.util.AliasManager.getInstance();

if(old){for(var alias in old.aliases){aliasManager.remove(alias);
}}
if(value){for(var alias in value.aliases){aliasManager.add(alias,value.aliases[alias]);
}}}}});
qx.Class.define("qx.theme.manager.Appearance",{type:"singleton",extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__styleCache={};
this.__aliasMap={};
},properties:{theme:{check:"Theme",nullable:true,event:"changeTheme",apply:"_applyTheme"}},members:{__defaultStates:{},__styleCache:null,__aliasMap:null,_applyTheme:function(value,old){this.__aliasMap={};
this.__styleCache={};
},__resolveId:function(id,theme,defaultId){var db=theme.appearances;
var entry=db[id];

if(!entry){var divider="/";
var end=[];
var splitted=id.split(divider);
var alias;

while(!entry&&splitted.length>0){end.unshift(splitted.pop());
var baseid=splitted.join(divider);
entry=db[baseid];

if(entry){alias=entry.alias||entry;

if(typeof alias==="string"){var mapped=alias+divider+end.join(divider);
return this.__resolveId(mapped,theme,defaultId);
}}}if(defaultId!=null){return this.__resolveId(defaultId,theme);
}return null;
}else if(typeof entry==="string"){return this.__resolveId(entry,theme,defaultId);
}else if(entry.include&&!entry.style){return this.__resolveId(entry.include,theme,defaultId);
}return id;
},styleFrom:function(id,states,theme,defaultId){if(!theme){theme=this.getTheme();
}var aliasMap=this.__aliasMap;
var resolved=aliasMap[id];

if(!resolved){resolved=aliasMap[id]=this.__resolveId(id,theme,defaultId);
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
}if(sum>0){unique+=":"+sum;
}}var cache=this.__styleCache;

if(cache[unique]!==undefined){return cache[unique];
}if(!states){states=this.__defaultStates;
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
}},destruct:function(){this.__styleCache=this.__aliasMap=null;
}});
qx.Class.define("qx.ui.tooltip.Manager",{type:"singleton",extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
qx.event.Registration.addListener(document.body,"mouseover",this.__onMouseOverRoot,this,true);
this.__showTimer=new qx.event.Timer();
this.__showTimer.addListener("interval",this.__onShowInterval,this);
this.__hideTimer=new qx.event.Timer();
this.__hideTimer.addListener("interval",this.__onHideInterval,this);
this.__mousePosition={left:0,top:0};
},properties:{current:{check:"qx.ui.tooltip.ToolTip",nullable:true,apply:"_applyCurrent"},showInvalidTooltips:{check:"Boolean",init:true}},members:{__mousePosition:null,__hideTimer:null,__showTimer:null,__sharedToolTip:null,__sharedErrorToolTip:null,__getSharedTooltip:function(){if(!this.__sharedToolTip){this.__sharedToolTip=new qx.ui.tooltip.ToolTip().set({rich:true});
}return this.__sharedToolTip;
},__getSharedErrorTooltip:function(){if(!this.__sharedErrorToolTip){this.__sharedErrorToolTip=new qx.ui.tooltip.ToolTip().set({appearance:"tooltip-error"});
this.__sharedErrorToolTip.syncAppearance();
}return this.__sharedErrorToolTip;
},_applyCurrent:function(value,old){if(old&&qx.ui.core.Widget.contains(old,value)){return;
}if(old){if(!old.isDisposed()){old.exclude();
}this.__showTimer.stop();
this.__hideTimer.stop();
}var Registration=qx.event.Registration;
var el=document.body;
if(value){this.__showTimer.startWith(value.getShowTimeout());
Registration.addListener(el,"mouseout",this.__onMouseOutRoot,this,true);
Registration.addListener(el,"focusout",this.__onFocusOutRoot,this,true);
Registration.addListener(el,"mousemove",this.__onMouseMoveRoot,this,true);
}else{Registration.removeListener(el,"mouseout",this.__onMouseOutRoot,this,true);
Registration.removeListener(el,"focusout",this.__onFocusOutRoot,this,true);
Registration.removeListener(el,"mousemove",this.__onMouseMoveRoot,this,true);
}},__onShowInterval:function(e){var current=this.getCurrent();

if(current&&!current.isDisposed()){this.__hideTimer.startWith(current.getHideTimeout());

if(current.getPlaceMethod()=="widget"){current.placeToWidget(current.getOpener());
}else{current.placeToPoint(this.__mousePosition);
}current.show();
}this.__showTimer.stop();
},__onHideInterval:function(e){var current=this.getCurrent();

if(current&&!current.isDisposed()){current.exclude();
}this.__hideTimer.stop();
this.resetCurrent();
},__onMouseMoveRoot:function(e){var pos=this.__mousePosition;
pos.left=e.getDocumentLeft();
pos.top=e.getDocumentTop();
},__onMouseOverRoot:function(e){var target=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

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
}var tooltip=this.__getSharedErrorTooltip().set({label:invalidMessage});
}else if(!tooltip){var tooltip=this.__getSharedTooltip().set({label:tooltipText,icon:tooltipIcon});
}this.setCurrent(tooltip);
tooltip.setOpener(target);
},__onMouseOutRoot:function(e){var target=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!target){return;
}var related=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());

if(!related){return;
}var tooltip=this.getCurrent();
if(tooltip&&(related==tooltip||qx.ui.core.Widget.contains(tooltip,related))){return;
}if(related&&target&&qx.ui.core.Widget.contains(target,related)){return;
}if(tooltip&&!related){this.setCurrent(null);
}else{this.resetCurrent();
}},__onFocusOutRoot:function(e){var target=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!target){return;
}var tooltip=this.getCurrent();
if(tooltip&&tooltip==target.getToolTip()){this.setCurrent(null);
}}},destruct:function(){qx.event.Registration.removeListener(document.body,"mouseover",this.__onMouseOverRoot,this,true);
this._disposeObjects("__showTimer","__hideTimer","__sharedToolTip");
this.__mousePosition=null;
}});
qx.Class.define("qx.event.Timer",{extend:qx.core.Object,construct:function(interval){arguments.callee.base.call(this);
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
}},properties:{enabled:{init:true,check:"Boolean",apply:"_applyEnabled"},interval:{check:"Integer",init:1000,apply:"_applyInterval"}},members:{__intervalHandler:null,__oninterval:null,_applyInterval:function(value,old){if(this.getEnabled()){this.restart();
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
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.getEnabled()){this.fireEvent("interval");
}})},destruct:function(){if(this.__intervalHandler){window.clearInterval(this.__intervalHandler);
}this.__intervalHandler=this.__oninterval=null;
}});
qx.Mixin.define("qx.ui.core.MChildrenHandling",{members:{getChildren:function(){return this._getChildren();
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
qx.Mixin.define("qx.ui.core.MLayoutHandling",{members:{setLayout:function(layout){return this._setLayout(layout);
},getLayout:function(){return this._getLayout();
}},statics:{remap:function(members){members.getLayout=members._getLayout;
members.setLayout=members._setLayout;
}}});
qx.Class.define("qx.ui.core.LayoutItem",{type:"abstract",extend:qx.core.Object,properties:{minWidth:{check:"Integer",nullable:true,apply:"_applyDimension",init:null,themeable:true},width:{check:"Integer",nullable:true,apply:"_applyDimension",init:null,themeable:true},maxWidth:{check:"Integer",nullable:true,apply:"_applyDimension",init:null,themeable:true},minHeight:{check:"Integer",nullable:true,apply:"_applyDimension",init:null,themeable:true},height:{check:"Integer",nullable:true,apply:"_applyDimension",init:null,themeable:true},maxHeight:{check:"Integer",nullable:true,apply:"_applyDimension",init:null,themeable:true},allowGrowX:{check:"Boolean",apply:"_applyStretching",init:true,themeable:true},allowShrinkX:{check:"Boolean",apply:"_applyStretching",init:true,themeable:true},allowGrowY:{check:"Boolean",apply:"_applyStretching",init:true,themeable:true},allowShrinkY:{check:"Boolean",apply:"_applyStretching",init:true,themeable:true},allowStretchX:{group:["allowGrowX","allowShrinkX"],mode:"shorthand",themeable:true},allowStretchY:{group:["allowGrowY","allowShrinkY"],mode:"shorthand",themeable:true},marginTop:{check:"Integer",init:0,apply:"_applyMargin",themeable:true},marginRight:{check:"Integer",init:0,apply:"_applyMargin",themeable:true},marginBottom:{check:"Integer",init:0,apply:"_applyMargin",themeable:true},marginLeft:{check:"Integer",init:0,apply:"_applyMargin",themeable:true},margin:{group:["marginTop","marginRight","marginBottom","marginLeft"],mode:"shorthand",themeable:true},alignX:{check:["left","center","right"],nullable:true,apply:"_applyAlign",themeable:true},alignY:{check:["top","middle","bottom","baseline"],nullable:true,apply:"_applyAlign",themeable:true}},members:{__computedHeightForWidth:null,__computedLayout:null,__hasInvalidLayout:null,__sizeHint:null,__updateMargin:null,__userBounds:null,__layoutProperties:null,getBounds:function(){return this.__userBounds||this.__computedLayout||null;
},clearSeparators:function(){},renderSeparator:function(separator,bounds){},renderLayout:function(left,top,width,height){var msg;
{};
var flowHeight=null;

if(this.getHeight()==null&&this._hasHeightForWidth()){var flowHeight=this._getHeightForWidth(width);
}
if(flowHeight!=null&&flowHeight!==this.__computedHeightForWidth){this.__computedHeightForWidth=flowHeight;
qx.ui.core.queue.Layout.add(this);
return null;
}var computed=this.__computedLayout;

if(!computed){computed=this.__computedLayout={};
}var changes={};

if(left!==computed.left||top!==computed.top){changes.position=true;
computed.left=left;
computed.top=top;
}
if(width!==computed.width||height!==computed.height){changes.size=true;
computed.width=width;
computed.height=height;
}if(this.__hasInvalidLayout){changes.local=true;
delete this.__hasInvalidLayout;
}
if(this.__updateMargin){changes.margin=true;
delete this.__updateMargin;
}return changes;
},isExcluded:function(){return false;
},hasValidLayout:function(){return !this.__hasInvalidLayout;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutCache:function(){this.__hasInvalidLayout=true;
this.__sizeHint=null;
},getSizeHint:function(compute){var hint=this.__sizeHint;

if(hint){return hint;
}
if(compute===false){return null;
}hint=this.__sizeHint=this._computeSizeHint();
if(this._hasHeightForWidth()&&this.__computedHeightForWidth&&this.getHeight()==null){hint.height=this.__computedHeightForWidth;
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
},_applyMargin:function(){this.__updateMargin=true;
var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyAlign:function(){var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyDimension:function(){qx.ui.core.queue.Layout.add(this);
},_applyStretching:function(){qx.ui.core.queue.Layout.add(this);
},hasUserBounds:function(){return !!this.__userBounds;
},setUserBounds:function(left,top,width,height){this.__userBounds={left:left,top:top,width:width,height:height};
qx.ui.core.queue.Layout.add(this);
},resetUserBounds:function(){delete this.__userBounds;
qx.ui.core.queue.Layout.add(this);
},__emptyProperties:{},setLayoutProperties:function(props){if(props==null){return;
}var storage=this.__layoutProperties;

if(!storage){storage=this.__layoutProperties={};
}var parent=this.getLayoutParent();

if(parent){parent.updateLayoutProperties(props);
}for(var key in props){if(props[key]==null){delete storage[key];
}else{storage[key]=props[key];
}}},getLayoutProperties:function(){return this.__layoutProperties||this.__emptyProperties;
},clearLayoutProperties:function(){delete this.__layoutProperties;
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
var props=this.__layoutProperties;

if(props){clone.__layoutProperties=qx.lang.Object.clone(props);
}return clone;
},serialize:function(){var result=arguments.callee.base.call(this);
var props=this.__layoutProperties;

if(props){result.layoutProperties=qx.lang.Object.clone(props);
}return result;
}},destruct:function(){this.$$parent=this.$$subparent=this.__layoutProperties=this.__computedLayout=this.__userBounds=this.__sizeHint=null;
}});
qx.Class.define("qx.ui.core.DecoratorFactory",{extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__pool={};
},statics:{MAX_SIZE:15,__NO_POOL_ID:"$$nopool$$"},members:{__pool:null,getDecoratorElement:function(decorator){var clazz=qx.ui.core.DecoratorFactory;

if(qx.lang.Type.isString(decorator)){var id=decorator;
var decoratorInstance=qx.theme.manager.Decoration.getInstance().resolve(decorator);
}else{var id=clazz.__NO_POOL_ID;
decoratorInstance=decorator;
}var pool=this.__pool;

if(pool[id]&&pool[id].length>0){var element=pool[id].pop();
}else{var element=this._createDecoratorElement(decoratorInstance,id);
}element.$$pooled=false;
return element;
},poolDecorator:function(decoratorElement){if(!decoratorElement||decoratorElement.$$pooled){return;
}var clazz=qx.ui.core.DecoratorFactory;
var id=decoratorElement.getId();

if(id==clazz.__NO_POOL_ID){decoratorElement.dispose();
return;
}var pool=this.__pool;

if(!pool[id]){pool[id]=[];
}
if(pool[id].length>clazz.MAX_SIZE){decoratorElement.dispose();
}else{decoratorElement.$$pooled=true;
pool[id].push(decoratorElement);
}},_createDecoratorElement:function(decorator,id){var element=new qx.html.Decorator(decorator,id);
{};
return element;
},toString:function(){return arguments.callee.base.call(this);
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){var pool=this.__pool;

for(var key in pool){qx.util.DisposeUtil.disposeArray(pool,key);
}}this.__pool=null;
}});
qx.Class.define("qx.ui.core.Widget",{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){arguments.callee.base.call(this);
this.__containerElement=this._createContainerElement();
this.__contentElement=this.__createContentElement();
this.__containerElement.add(this.__contentElement);
this.initFocusable();
this.initSelectable();
this.initNativeContextMenu();
},events:{appear:"qx.event.type.Event",disappear:"qx.event.type.Event",createChildControl:"qx.event.type.Data",resize:"qx.event.type.Data",move:"qx.event.type.Data",syncAppearance:"qx.event.type.Data",mousemove:"qx.event.type.Mouse",mouseover:"qx.event.type.Mouse",mouseout:"qx.event.type.Mouse",mousedown:"qx.event.type.Mouse",mouseup:"qx.event.type.Mouse",click:"qx.event.type.Mouse",dblclick:"qx.event.type.Mouse",contextmenu:"qx.event.type.Mouse",beforeContextmenuOpen:"qx.event.type.Mouse",mousewheel:"qx.event.type.Mouse",keyup:"qx.event.type.KeySequence",keydown:"qx.event.type.KeySequence",keypress:"qx.event.type.KeySequence",keyinput:"qx.event.type.KeyInput",focus:"qx.event.type.Focus",blur:"qx.event.type.Focus",focusin:"qx.event.type.Focus",focusout:"qx.event.type.Focus",activate:"qx.event.type.Focus",deactivate:"qx.event.type.Focus",capture:"qx.event.type.Event",losecapture:"qx.event.type.Event",drop:"qx.event.type.Drag",dragleave:"qx.event.type.Drag",dragover:"qx.event.type.Drag",drag:"qx.event.type.Drag",dragstart:"qx.event.type.Drag",dragend:"qx.event.type.Drag",dragchange:"qx.event.type.Drag",droprequest:"qx.event.type.Drag"},properties:{paddingTop:{check:"Integer",init:0,apply:"_applyPadding",themeable:true},paddingRight:{check:"Integer",init:0,apply:"_applyPadding",themeable:true},paddingBottom:{check:"Integer",init:0,apply:"_applyPadding",themeable:true},paddingLeft:{check:"Integer",init:0,apply:"_applyPadding",themeable:true},padding:{group:["paddingTop","paddingRight","paddingBottom","paddingLeft"],mode:"shorthand",themeable:true},zIndex:{nullable:true,init:null,apply:"_applyZIndex",event:"changeZIndex",check:"Integer",themeable:true},decorator:{nullable:true,init:null,apply:"_applyDecorator",event:"changeDecorator",check:"Decorator",themeable:true},shadow:{nullable:true,init:null,apply:"_applyShadow",event:"changeShadow",check:"Decorator",themeable:true},backgroundColor:{nullable:true,check:"Color",apply:"_applyBackgroundColor",event:"changeBackgroundColor",themeable:true},textColor:{nullable:true,check:"Color",apply:"_applyTextColor",event:"changeTextColor",themeable:true,inheritable:true},font:{nullable:true,apply:"_applyFont",check:"Font",event:"changeFont",themeable:true,inheritable:true},opacity:{check:"Number",apply:"_applyOpacity",themeable:true,nullable:true,init:null},cursor:{check:"String",apply:"_applyCursor",themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:"qx.ui.tooltip.ToolTip",nullable:true},toolTipText:{check:"String",nullable:true,event:"changeToolTipText",apply:"_applyToolTipText"},toolTipIcon:{check:"String",nullable:true,event:"changeToolTipText"},blockToolTip:{check:"Boolean",init:false},visibility:{check:["visible","hidden","excluded"],init:"visible",apply:"_applyVisibility",event:"changeVisibility"},enabled:{init:true,check:"Boolean",inheritable:true,apply:"_applyEnabled",event:"changeEnabled"},anonymous:{init:false,check:"Boolean"},tabIndex:{check:"Integer",nullable:true,apply:"_applyTabIndex"},focusable:{check:"Boolean",init:false,apply:"_applyFocusable"},keepFocus:{check:"Boolean",init:false,apply:"_applyKeepFocus"},keepActive:{check:"Boolean",init:false,apply:"_applyKeepActive"},draggable:{check:"Boolean",init:false,apply:"_applyDraggable"},droppable:{check:"Boolean",init:false,apply:"_applyDroppable"},selectable:{check:"Boolean",init:false,event:"changeSelectable",apply:"_applySelectable"},contextMenu:{check:"qx.ui.menu.Menu",apply:"_applyContextMenu",nullable:true,event:"changeContextMenu"},nativeContextMenu:{check:"Boolean",init:false,themeable:true,event:"changeNativeContextMenu",apply:"_applyNativeContextMenu"},appearance:{check:"String",init:"widget",apply:"_applyAppearance",event:"changeAppearance"}},statics:{DEBUG:false,getWidgetByElement:function(element){while(element){var widgetKey=element.$$widget;
if(widgetKey!=null){return qx.core.ObjectRegistry.fromHashCode(widgetKey);
}element=element.parentNode;
}return null;
},contains:function(parent,child){while(child){if(parent==child){return true;
}child=child.getLayoutParent();
}return false;
},__decoratorPool:new qx.ui.core.DecoratorFactory(),__shadowPool:new qx.ui.core.DecoratorFactory()},members:{__containerElement:null,__contentElement:null,__decoratorElement:null,__shadowElement:null,__protectorElement:null,__initialAppearanceApplied:null,__toolTipTextListenerId:null,__layoutManager:null,_getLayout:function(){return this.__layoutManager;
},_setLayout:function(layout){{};

if(this.__layoutManager){this.__layoutManager.connectToWidget(null);
}
if(layout){layout.connectToWidget(this);
}this.__layoutManager=layout;
qx.ui.core.queue.Layout.add(this);
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}var container=this.getContainerElement();

if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(container);
}this.$$parent=parent||null;

if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(container);
}qx.core.Property.refresh(this);
qx.ui.core.queue.Visibility.add(this);
},_updateInsets:null,__checkInsetsModified:function(a,b){if(a==b){return false;
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
var pixel="px";
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
if(changes.size){var protector=this.__protectorElement;

if(protector){protector.setStyles({width:width+"px",height:height+"px"});
}}
if(changes.size||this._updateInsets){if(this.__decoratorElement){this.__decoratorElement.resize(width,height);
}}
if(changes.size){if(this.__shadowElement){var insets=this.__shadowElement.getInsets();
var shadowWidth=width+insets.left+insets.right;
var shadowHeight=height+insets.top+insets.bottom;
this.__shadowElement.resize(shadowWidth,shadowHeight);
}}
if(inner||changes.local||changes.margin){if(this.__layoutManager&&this.hasLayoutChildren()){this.__layoutManager.renderLayout(innerWidth,innerHeight);
}else if(this.hasLayoutChildren()){throw new Error("At least one child in control "+this._findTopControl()+" requires a layout, but no one was defined!");
}}if(changes.position&&this.hasListener("move")){this.fireDataEvent("move",this.getBounds());
}
if(changes.size&&this.hasListener("resize")){this.fireDataEvent("resize",this.getBounds());
}delete this._updateInsets;
return changes;
},__separators:null,clearSeparators:function(){var reg=this.__separators;

if(!reg){return;
}var pool=qx.ui.core.Widget.__decoratorPool;
var content=this.getContentElement();
var elem;

for(var i=0,l=reg.length;i<l;i++){elem=reg[i];
pool.poolDecorator(elem);
content.remove(elem);
}reg.length=0;
},renderSeparator:function(separator,bounds){var elem=qx.ui.core.Widget.__decoratorPool.getDecoratorElement(separator);
this.getContentElement().add(elem);
elem.resize(bounds.width,bounds.height);
var style=elem.getDomElement().style;
style.left=bounds.left+"px";
style.top=bounds.top+"px";
if(!this.__separators){this.__separators=[elem];
}else{this.__separators.push(elem);
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

if(this.__layoutManager){this.__layoutManager.invalidateLayoutCache();
}},_getContentHint:function(){var layout=this.__layoutManager;

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

if(this.__decoratorElement){var inset=this.__decoratorElement.getInsets();
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
},show:function(){this.setVisibility("visible");
},hide:function(){this.setVisibility("hidden");
},exclude:function(){this.setVisibility("excluded");
},isVisible:function(){return this.getVisibility()==="visible";
},isHidden:function(){return this.getVisibility()!=="visible";
},isExcluded:function(){return this.getVisibility()==="excluded";
},isSeeable:function(){var element=this.getContainerElement().getDomElement();

if(element){return element.offsetWidth>0;
}var current=this;

do{if(!current.isVisible()){return false;
}
if(current.isRootWidget()){return true;
}current=current.getLayoutParent();
}while(current);
return false;
},_createContainerElement:function(){var el=new qx.html.Element("div");
{};
el.setStyles({"position":"absolute","zIndex":0});
el.setAttribute("$$widget",this.toHashCode());
{};
return el;
},__createContentElement:function(){var el=this._createContentElement();
{};
el.setStyles({"position":"absolute","zIndex":10});
return el;
},_createContentElement:function(){var el=new qx.html.Element("div");
el.setStyles({"overflowX":"hidden","overflowY":"hidden"});
return el;
},getContainerElement:function(){return this.__containerElement;
},getContentElement:function(){return this.__contentElement;
},getDecoratorElement:function(){return this.__decoratorElement;
},__widgetChildren:null,getLayoutChildren:function(){var children=this.__widgetChildren;

if(!children){return this.__emptyChildren;
}var layoutChildren;

for(var i=0,l=children.length;i<l;i++){var child=children[i];

if(child.hasUserBounds()||child.isExcluded()){if(layoutChildren==null){layoutChildren=children.concat();
}qx.lang.Array.remove(layoutChildren,child);
}}return layoutChildren||children;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutChildren:function(){var layout=this.__layoutManager;

if(layout){layout.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},hasLayoutChildren:function(){var children=this.__widgetChildren;

if(!children){return false;
}var child;

for(var i=0,l=children.length;i<l;i++){child=children[i];

if(!child.hasUserBounds()&&!child.isExcluded()){return true;
}}return false;
},getChildrenContainer:function(){return this;
},__emptyChildren:[],_getChildren:function(){return this.__widgetChildren||this.__emptyChildren;
},_indexOf:function(child){var children=this.__widgetChildren;

if(!children){return -1;
}return children.indexOf(child);
},_hasChildren:function(){var children=this.__widgetChildren;
return children!=null&&(!!children[0]);
},addChildrenToQueue:function(queue){var children=this.__widgetChildren;

if(!children){return;
}var child;

for(var i=0,l=children.length;i<l;i++){child=children[i];
queue[child.$$hash]=child;
child.addChildrenToQueue(queue);
}},_add:function(child,options){if(child.getLayoutParent()==this){qx.lang.Array.remove(this.__widgetChildren,child);
}
if(this.__widgetChildren){this.__widgetChildren.push(child);
}else{this.__widgetChildren=[child];
}this.__addHelper(child,options);
},_addAt:function(child,index,options){if(!this.__widgetChildren){this.__widgetChildren=[];
}if(child.getLayoutParent()==this){qx.lang.Array.remove(this.__widgetChildren,child);
}var ref=this.__widgetChildren[index];

if(ref===child){return child.setLayoutProperties(options);
}
if(ref){qx.lang.Array.insertBefore(this.__widgetChildren,child,ref);
}else{this.__widgetChildren.push(child);
}this.__addHelper(child,options);
},_addBefore:function(child,before,options){{};

if(child==before){return;
}
if(!this.__widgetChildren){this.__widgetChildren=[];
}if(child.getLayoutParent()==this){qx.lang.Array.remove(this.__widgetChildren,child);
}qx.lang.Array.insertBefore(this.__widgetChildren,child,before);
this.__addHelper(child,options);
},_addAfter:function(child,after,options){{};

if(child==after){return;
}
if(!this.__widgetChildren){this.__widgetChildren=[];
}if(child.getLayoutParent()==this){qx.lang.Array.remove(this.__widgetChildren,child);
}qx.lang.Array.insertAfter(this.__widgetChildren,child,after);
this.__addHelper(child,options);
},_remove:function(child){if(!this.__widgetChildren){throw new Error("This widget has no children!");
}qx.lang.Array.remove(this.__widgetChildren,child);
this.__removeHelper(child);
},_removeAt:function(index){if(!this.__widgetChildren){throw new Error("This widget has no children!");
}var child=this.__widgetChildren[index];
qx.lang.Array.removeAt(this.__widgetChildren,index);
this.__removeHelper(child);
return child;
},_removeAll:function(){if(!this.__widgetChildren){return;
}var children=this.__widgetChildren.concat();
this.__widgetChildren.length=0;

for(var i=children.length-1;i>=0;i--){this.__removeHelper(children[i]);
}qx.ui.core.queue.Layout.add(this);
},_afterAddChild:null,_afterRemoveChild:null,__addHelper:function(child,options){{};
var parent=child.getLayoutParent();

if(parent&&parent!=this){parent._remove(child);
}child.setLayoutParent(this);
if(options){child.setLayoutProperties(options);
}else{this.updateLayoutProperties();
}if(this._afterAddChild){this._afterAddChild(child);
}},__removeHelper:function(child){{};

if(child.getLayoutParent()!==this){throw new Error("Remove Error: "+child+" is not a child of this widget!");
}child.setLayoutParent(null);
if(this.__layoutManager){this.__layoutManager.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
if(this._afterRemoveChild){this._afterRemoveChild(child);
}},capture:function(containerCapture){this.getContainerElement().capture(containerCapture);
},releaseCapture:function(){this.getContainerElement().releaseCapture();
},_applyPadding:function(value,old,name){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
},_createProtectorElement:function(){if(this.__protectorElement){return;
}var protect=this.__protectorElement=new qx.html.Element;
{};
protect.setStyles({position:"absolute",top:0,left:0,zIndex:7});
var bounds=this.getBounds();

if(bounds){this.__protectorElement.setStyles({width:bounds.width+"px",height:bounds.height+"px"});
}if(qx.core.Variant.isSet("qx.client","mshtml")){protect.setStyles({backgroundImage:"url("+qx.util.ResourceManager.getInstance().toUri("qx/static/blank.gif")+")",backgroundRepeat:"repeat"});
}this.getContainerElement().add(protect);
},_applyDecorator:function(value,old){{};
var pool=qx.ui.core.Widget.__decoratorPool;
var container=this.getContainerElement();
if(!this.__protectorElement){this._createProtectorElement();
}if(old){container.remove(this.__decoratorElement);
pool.poolDecorator(this.__decoratorElement);
}if(value){var elem=this.__decoratorElement=pool.getDecoratorElement(value);
elem.setStyle("zIndex",5);
var bgcolor=this.getBackgroundColor();
elem.tint(bgcolor);
container.add(elem);
}else{delete this.__decoratorElement;
this._applyBackgroundColor(this.getBackgroundColor());
}if(value&&!old&&bgcolor){this.getContainerElement().setStyle("backgroundColor",null);
}if(this.__checkInsetsModified(old,value)){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
}else if(value){var bounds=this.getBounds();

if(bounds){elem.resize(bounds.width,bounds.height);
this.__protectorElement.setStyles({width:bounds.width+"px",height:bounds.height+"px"});
}}},_applyShadow:function(value,old){var pool=qx.ui.core.Widget.__shadowPool;
var container=this.getContainerElement();
if(old){container.remove(this.__shadowElement);
pool.poolDecorator(this.__shadowElement);
}if(value){var elem=this.__shadowElement=pool.getDecoratorElement(value);
container.add(elem);
var insets=elem.getInsets();
elem.setStyles({left:(-insets.left)+"px",top:(-insets.top)+"px"});
var bounds=this.getBounds();

if(bounds){var shadowWidth=bounds.width+insets.left+insets.right;
var shadowHeight=bounds.height+insets.top+insets.bottom;
elem.resize(shadowWidth,shadowHeight);
}elem.tint(null);
}else{delete this.__shadowElement;
}},_applyToolTipText:function(value,old){if(qx.core.Variant.isSet("qx.dynlocale","on")){if(this.__toolTipTextListenerId){return;
}var manager=qx.locale.Manager.getInstance();
this.__toolTipTextListenerId=manager.addListener("changeLocale",function(){if(value&&value.translate){this.setToolTipText(value.translate());
}},this);
}},_applyTextColor:function(value,old){},_applyZIndex:function(value,old){this.getContainerElement().setStyle("zIndex",value==null?0:value);
},_applyVisibility:function(value,old){var container=this.getContainerElement();

if(value==="visible"){container.show();
}else{container.hide();
}var parent=this.$$parent;

if(parent&&(old==null||value==null||old==="excluded"||value==="excluded")){parent.invalidateLayoutChildren();
}qx.ui.core.queue.Visibility.add(this);
},_applyOpacity:function(value,old){this.getContainerElement().setStyle("opacity",value==1?null:value);
if(qx.core.Variant.isSet("qx.client","mshtml")){if(!qx.Class.isSubClassOf(this.getContentElement().constructor,qx.html.Image)){var contentElementOpacity=(value==1||value==null)?null:0.99;
this.getContentElement().setStyle("opacity",contentElementOpacity);
}}},_applyCursor:function(value,old){if(value==null&&!this.isSelectable()){value="default";
}this.getContainerElement().setStyle("cursor",value,qx.bom.client.Engine.OPERA);
},_applyBackgroundColor:function(value,old){var color=this.getBackgroundColor();
var container=this.getContainerElement();

if(this.__decoratorElement){this.__decoratorElement.tint(color);
container.setStyle("backgroundColor",null);
}else{var resolved=qx.theme.manager.Color.getInstance().resolve(color);
container.setStyle("backgroundColor",resolved);
}},_applyFont:function(value,old){},__states:null,$$stateChanges:null,_forwardStates:null,hasState:function(state){var states=this.__states;
return states&&states[state];
},addState:function(state){var states=this.__states;

if(!states){states=this.__states={};
}
if(states[state]){return;
}this.__states[state]=true;
if(state==="hovered"){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var controls=this.__childControls;

if(forward&&forward[state]&&controls){var control;

for(var id in controls){control=controls[id];

if(control instanceof qx.ui.core.Widget){controls[id].addState(state);
}}}},removeState:function(state){var states=this.__states;

if(!states||!states[state]){return;
}delete this.__states[state];
if(state==="hovered"){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var controls=this.__childControls;

if(forward&&forward[state]&&controls){for(var id in controls){var control=controls[id];

if(control instanceof qx.ui.core.Widget){control.removeState(state);
}}}},replaceState:function(old,value){var states=this.__states;

if(!states){states=this.__states={};
}
if(!states[value]){states[value]=true;
}
if(states[old]){delete states[old];
}
if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var controls=this.__childControls;

if(forward&&forward[value]&&controls){for(var id in controls){var control=controls[id];

if(control instanceof qx.ui.core.Widget){control.replaceState(old,value);
}}}},__appearanceSelector:null,__updateSelector:null,syncAppearance:function(){var states=this.__states;
var selector=this.__appearanceSelector;
var manager=qx.theme.manager.Appearance.getInstance();
var styler=qx.core.Property.$$method.setThemed;
var unstyler=qx.core.Property.$$method.resetThemed;
if(this.__updateSelector){delete this.__updateSelector;
if(selector){var oldData=manager.styleFrom(selector,states,null,this.getAppearance());
if(oldData){selector=null;
}}}if(!selector){var obj=this;
var id=[];

do{id.push(obj.$$subcontrol||obj.getAppearance());
}while(obj=obj.$$subparent);
selector=this.__appearanceSelector=id.reverse().join("/").replace(/#[0-9]+/g,"");
}var newData=manager.styleFrom(selector,states,null,this.getAppearance());

if(newData){var prop;

if(oldData){for(var prop in oldData){if(newData[prop]===undefined){this[unstyler[prop]]();
}}}{};
for(var prop in newData){newData[prop]===undefined?this[unstyler[prop]]():this[styler[prop]](newData[prop]);
}}else if(oldData){for(var prop in oldData){this[unstyler[prop]]();
}}this.fireDataEvent("syncAppearance",this.__states);
},_applyAppearance:function(value,old){this.updateAppearance();
},checkAppearanceNeeds:function(){if(!this.__initialAppearanceApplied){qx.ui.core.queue.Appearance.add(this);
this.__initialAppearanceApplied=true;
}else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);
delete this.$$stateChanges;
}},updateAppearance:function(){this.__updateSelector=true;
qx.ui.core.queue.Appearance.add(this);
var controls=this.__childControls;

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
}target.setAttribute("tabIndex",tabIndex);
if(qx.core.Variant.isSet("qx.client","mshtml")){target.setAttribute("hideFocus","true");
}else{target.setStyle("outline","none");
}}else{if(target.isNativelyFocusable()){target.setAttribute("tabIndex",-1);
}else if(old){target.setAttribute("tabIndex",null);
}}},_applyKeepFocus:function(value){var target=this.getFocusElement();
target.setAttribute("qxKeepFocus",value?"on":null);
},_applyKeepActive:function(value){var target=this.getContainerElement();
target.setAttribute("qxKeepActive",value?"on":null);
},_applyTabIndex:function(value){if(value==null){value=1;
}else if(value<1||value>32000){throw new Error("TabIndex property must be between 1 and 32000");
}
if(this.getFocusable()&&value!=null){this.getFocusElement().setAttribute("tabIndex",value);
}},_applySelectable:function(value){this._applyCursor(this.getCursor());
this.getContainerElement().setSelectable(value);
this.getContentElement().setSelectable(value);
},_applyEnabled:function(value,old){if(value===false){this.addState("disabled");
this.removeState("hovered");
if(this.isFocusable()){this.removeState("focused");
this._applyFocusable(false,true);
}if(this.isDraggable()){this._applyDraggable(false,true);
}if(this.isDroppable()){this._applyDroppable(false,true);
}}else{this.removeState("disabled");
if(this.isFocusable()){this._applyFocusable(true,false);
}if(this.isDraggable()){this._applyDraggable(true,false);
}if(this.isDroppable()){this._applyDroppable(true,false);
}}},_applyNativeContextMenu:function(value,old,name){},_applyContextMenu:function(value,old){if(old){old.removeState("contextmenu");

if(old.getOpener()==this){old.resetOpener();
}
if(!value){this.removeListener("contextmenu",this._onContextMenuOpen);
old.removeListener("changeVisibility",this._onBeforeContextMenuOpen,this);
}}
if(value){value.setOpener(this);
value.addState("contextmenu");

if(!old){this.addListener("contextmenu",this._onContextMenuOpen);
value.addListener("changeVisibility",this._onBeforeContextMenuOpen,this);
}}},_onContextMenuOpen:function(e){this.getContextMenu().openAtMouse(e);
e.stop();
},_onBeforeContextMenuOpen:function(e){if(e.getData()=="visible"&&this.hasListener("beforeContextmenuOpen")){this.fireDataEvent("beforeContextmenuOpen",e);
}},_onStopEvent:function(e){e.stopPropagation();
},_applyDraggable:function(value,old){if(!this.isEnabled()&&value===true){value=false;
}qx.ui.core.DragDropCursor.getInstance();
if(value){this.addListener("dragstart",this._onDragStart);
this.addListener("drag",this._onDrag);
this.addListener("dragend",this._onDragEnd);
this.addListener("dragchange",this._onDragChange);
}else{this.removeListener("dragstart",this._onDragStart);
this.removeListener("drag",this._onDrag);
this.removeListener("dragend",this._onDragEnd);
this.removeListener("dragchange",this._onDragChange);
}this.getContainerElement().setAttribute("qxDraggable",value?"on":null);
},_applyDroppable:function(value,old){if(!this.isEnabled()&&value===true){value=false;
}this.getContainerElement().setAttribute("qxDroppable",value?"on":null);
},_onDragStart:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
this.getApplicationRoot().setGlobalCursor("default");
},_onDrag:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
},_onDragEnd:function(e){qx.ui.core.DragDropCursor.getInstance().moveTo(-1000,-1000);
this.getApplicationRoot().resetGlobalCursor();
},_onDragChange:function(e){var cursor=qx.ui.core.DragDropCursor.getInstance();
var action=e.getCurrentAction();
action?cursor.setAction(action):cursor.resetAction();
},visualizeFocus:function(){this.addState("focused");
},visualizeBlur:function(){this.removeState("focused");
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
},hasChildControl:function(id){if(!this.__childControls){return false;
}return !!this.__childControls[id];
},__childControls:null,_getCreatedChildControls:function(){return this.__childControls;
},getChildControl:function(id,notcreate){if(!this.__childControls){if(notcreate){return null;
}this.__childControls={};
}var control=this.__childControls[id];

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
},_createChildControl:function(id){if(!this.__childControls){this.__childControls={};
}else if(this.__childControls[id]){throw new Error("Child control '"+id+"' already created!");
}var pos=id.indexOf("#");

if(pos==-1){var control=this._createChildControlImpl(id);
}else{var control=this._createChildControlImpl(id.substring(0,pos));
}
if(!control){throw new Error("Unsupported control: "+id);
}control.$$subcontrol=id;
control.$$subparent=this;
var states=this.__states;
var forward=this._forwardStates;

if(states&&forward&&control instanceof qx.ui.core.Widget){for(var state in states){if(forward[state]){control.addState(state);
}}}this.fireDataEvent("createChildControl",control);
return this.__childControls[id]=control;
},_createChildControlImpl:function(id){return null;
},_disposeChildControls:function(){var controls=this.__childControls;

if(!controls){return;
}var Widget=qx.ui.core.Widget;

for(var id in controls){var control=controls[id];

if(!Widget.contains(this,control)){control.destroy();
}else{control.dispose();
}}delete this.__childControls;
},_findTopControl:function(){var obj=this;

while(obj){if(!obj.$$subparent){return obj;
}obj=obj.$$subparent;
}return null;
},getContainerLocation:function(mode){var domEl=this.getContainerElement().getDomElement();
return domEl?qx.bom.element.Location.get(domEl,mode):null;
},getContentLocation:function(mode){var domEl=this.getContentElement().getDomElement();
return domEl?qx.bom.element.Location.get(domEl,mode):null;
},setDomLeft:function(value){var domEl=this.getContainerElement().getDomElement();

if(domEl){domEl.style.left=value+"px";
}else{throw new Error("DOM element is not yet created!");
}},setDomTop:function(value){var domEl=this.getContainerElement().getDomElement();

if(domEl){domEl.style.top=value+"px";
}else{throw new Error("DOM element is not yet created!");
}},setDomPosition:function(left,top){var domEl=this.getContainerElement().getDomElement();

if(domEl){domEl.style.left=left+"px";
domEl.style.top=top+"px";
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
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Variant.isSet("qx.dynlocale","on")){if(this.__toolTipTextListenerId){qx.locale.Manager.getInstance().removeListenerById(this.__toolTipTextListenerId);
}}this.getContainerElement().setAttribute("$$widget",null,true);
this._disposeChildControls();
qx.ui.core.queue.Appearance.remove(this);
qx.ui.core.queue.Layout.remove(this);
qx.ui.core.queue.Visibility.remove(this);
qx.ui.core.queue.Widget.remove(this);
}if(!qx.core.ObjectRegistry.inShutDown){var clazz=qx.ui.core.Widget;
var container=this.getContainerElement();

if(this.__decoratorElement){container.remove(this.__decoratorElement);
clazz.__decoratorPool.poolDecorator(this.__decoratorElement);
}
if(this.__shadowElement){container.remove(this.__shadowElement);
clazz.__decoratorPool.poolDecorator(this.__shadowElement);
}this.clearSeparators();
this.__decoratorElement=this.__shadowElement=this.__separators=null;
}else{this._disposeArray("__separators");
this._disposeObjects("__decoratorElement","__shadowElement");
}this._disposeArray("__widgetChildren");
this.__states=this.__childControls=null;
this._disposeObjects("__layoutManager","__containerElement","__contentElement","__protectorElement");
}});
qx.Class.define("qx.ui.container.Composite",{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MLayoutHandling],construct:function(layout){arguments.callee.base.call(this);

if(layout!=null){this._setLayout(layout);
}},events:{addChildWidget:"qx.event.type.Data",removeChildWidget:"qx.event.type.Data"},members:{_afterAddChild:function(child){this.fireNonBubblingEvent("addChildWidget",qx.event.type.Data,[child]);
},_afterRemoveChild:function(child){this.fireNonBubblingEvent("removeChildWidget",qx.event.type.Data,[child]);
}},defer:function(statics,members){qx.ui.core.MChildrenHandling.remap(members);
qx.ui.core.MLayoutHandling.remap(members);
}});
qx.Mixin.define("qx.ui.core.MPlacement",{properties:{position:{check:["top-left","top-right","bottom-left","bottom-right","left-top","left-bottom","right-top","right-bottom"],init:"bottom-left",themeable:true},placeMethod:{check:["widget","mouse"],init:"mouse",themeable:true},domMove:{check:"Boolean",init:false},smart:{check:"Boolean",init:true,themeable:true,apply:"_applySmart"},placementModeX:{check:["direct","keep-align","best-fit"],init:"keep-align",themeable:true},placementModeY:{check:["direct","keep-align","best-fit"],init:"keep-align",themeable:true},offsetLeft:{check:"Integer",init:0,themeable:true},offsetTop:{check:"Integer",init:0,themeable:true},offsetRight:{check:"Integer",init:0,themeable:true},offsetBottom:{check:"Integer",init:0,themeable:true},offset:{group:["offsetTop","offsetRight","offsetBottom","offsetLeft"],mode:"shorthand",themeable:true}},members:{__updater:null,_applySmart:function(value,old){{};
var mode=value?"keep-align":"direct";
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
}},placeToWidget:function(target,liveupdate){if(liveupdate){this.__updater=qx.lang.Function.bind(this.placeToWidget,this,target,false);
qx.event.Idle.getInstance().addListener("interval",this.__updater);
this.addListener("disappear",function(){if(this.__updater){qx.event.Idle.getInstance().removeListener("interval",this.__updater);
this.__updater=null;
}},this);
}var coords=target.getContainerLocation()||this.getLayoutLocation(target);
this.__place(coords);
},placeToMouse:function(event){var left=event.getDocumentLeft();
var top=event.getDocumentTop();
var coords={left:left,top:top,right:left,bottom:top};
this.__place(coords);
},placeToElement:function(elem,liveupdate){var location=qx.bom.element.Location.get(elem);
var coords={left:location.left,top:location.top,right:location.left+elem.offsetWidth,bottom:location.top+elem.offsetHeight};
if(liveupdate){this.__updater=qx.lang.Function.bind(this.placeToElement,this,elem,false);
qx.event.Idle.getInstance().addListener("interval",this.__updater);
this.addListener("disappear",function(){if(this.__updater){qx.event.Idle.getInstance().removeListener("interval",this.__updater);
this.__updater=null;
}},this);
}this.__place(coords);
},placeToPoint:function(point){var coords={left:point.left,top:point.top,right:point.left,bottom:point.top};
this.__place(coords);
},_getPlacementOffsets:function(){return {left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};
},__getPlacementSize:function(callback){var size=null;

if(this._computePlacementSize){var size=this._computePlacementSize();
}else if(this.isVisible()){var size=this.getBounds();
}
if(size==null){this.addListenerOnce("appear",function(){this.__getPlacementSize(callback);
},this);
}else{callback.call(this,size);
}},__place:function(coords){this.__getPlacementSize(function(size){var result=qx.util.placement.Placement.compute(size,this.getLayoutParent().getBounds(),coords,this._getPlacementOffsets(),this.getPosition(),this.getPlacementModeX(),this.getPlacementModeY());
this.moveTo(result.left,result.top);
});
}},destruct:function(){if(this.__updater){qx.event.Idle.getInstance().removeListener("interval",this.__updater);
}}});
qx.Class.define("qx.ui.popup.Popup",{extend:qx.ui.container.Composite,include:qx.ui.core.MPlacement,construct:function(layout){arguments.callee.base.call(this,layout);
qx.core.Init.getApplication().getRoot().add(this);
this.initVisibility();
},properties:{appearance:{refine:true,init:"popup"},visibility:{refine:true,init:"excluded"},autoHide:{check:"Boolean",init:true}},members:{_applyVisibility:function(value,old){arguments.callee.base.call(this,value,old);
var mgr=qx.ui.popup.Manager.getInstance();
value==="visible"?mgr.add(this):mgr.remove(this);
}},destruct:function(){qx.ui.popup.Manager.getInstance().remove(this);
}});
qx.Class.define("qx.ui.tooltip.ToolTip",{extend:qx.ui.popup.Popup,construct:function(label,icon){arguments.callee.base.call(this);
this.setLayout(new qx.ui.layout.Grow);
this._createChildControl("atom");
if(label!=null){this.setLabel(label);
}
if(icon!=null){this.setIcon(icon);
}this.addListener("mouseover",this._onMouseOver,this);
},properties:{appearance:{refine:true,init:"tooltip"},showTimeout:{check:"Integer",init:700,themeable:true},hideTimeout:{check:"Integer",init:4000,themeable:true},label:{check:"String",nullable:true,apply:"_applyLabel"},icon:{check:"String",nullable:true,apply:"_applyIcon",themeable:true},rich:{check:"Boolean",init:false,apply:"_applyRich"},opener:{check:"qx.ui.core.Widget",nullable:true}},members:{_createChildControlImpl:function(id){var control;

switch(id){case "atom":control=new qx.ui.basic.Atom;
this._add(control);
break;
}return control||arguments.callee.base.call(this,id);
},_onMouseOver:function(e){this.hide();
},_applyIcon:function(value,old){var atom=this.getChildControl("atom");
value==null?atom.resetIcon:atom.setIcon(value);
},_applyLabel:function(value,old){var atom=this.getChildControl("atom");
value==null?atom.resetLabel():atom.setLabel(value);
},_applyRich:function(value,old){var atom=this.getChildControl("atom");
atom.setRich(value);
}}});
qx.Class.define("qx.ui.core.queue.Layout",{statics:{__queue:{},remove:function(widget){delete this.__queue[widget.$$hash];
},add:function(widget){this.__queue[widget.$$hash]=widget;
qx.ui.core.queue.Manager.scheduleFlush("layout");
},flush:function(){var queue=this.__getSortedQueue();
for(var i=queue.length-1;i>=0;i--){var widget=queue[i];
if(widget.hasValidLayout()){continue;
}if(widget.isRootWidget()&&!widget.hasUserBounds()){var hint=widget.getSizeHint();
widget.renderLayout(0,0,hint.width,hint.height);
}else{var bounds=widget.getBounds();
widget.renderLayout(bounds.left,bounds.top,bounds.width,bounds.height);
}}},getNestingLevel:function(widget){var cache=this.__nesting;
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
},__getLevelGroupedWidgets:function(){var VisibilityQueue=qx.ui.core.queue.Visibility;
this.__nesting={};
var levels=[];
var queue=this.__queue;
var widget,level;

for(var hash in queue){widget=queue[hash];

if(VisibilityQueue.isVisible(widget)){level=this.getNestingLevel(widget);
if(!levels[level]){levels[level]={};
}levels[level][hash]=widget;
delete queue[hash];
}}return levels;
},__getSortedQueue:function(){var sortedQueue=[];
var levels=this.__getLevelGroupedWidgets();

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
qx.Class.define("qx.event.handler.UserAction",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
this.__manager=manager;
this.__window=manager.getWindow();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__manager:null,__window:null,canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){}},destruct:function(){this.__manager=this.__window=null;
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Class.define("qx.util.DeferredCallManager",{extend:qx.core.Object,type:"singleton",construct:function(){this.__calls={};
this.__timeoutWrapper=qx.lang.Function.bind(this.__timeout,this);
this.__hasCalls=false;
},members:{__timeoutId:null,__currentQueue:null,__calls:null,__hasCalls:null,__timeoutWrapper:null,schedule:function(deferredCall){if(this.__timeoutId==null){this.__timeoutId=window.setTimeout(this.__timeoutWrapper,0);
}var callKey=deferredCall.toHashCode();
if(this.__currentQueue&&this.__currentQueue[callKey]){return;
}this.__calls[callKey]=deferredCall;
this.__hasCalls=true;
},cancel:function(deferredCall){var callKey=deferredCall.toHashCode();
if(this.__currentQueue&&this.__currentQueue[callKey]){this.__currentQueue[callKey]=null;
return;
}delete this.__calls[callKey];
if(qx.lang.Object.isEmpty(this.__calls)&&this.__timeoutId!=null){window.clearTimeout(this.__timeoutId);
this.__timeoutId=null;
}},__timeout:qx.event.GlobalError.observeMethod(function(){this.__timeoutId=null;
while(this.__hasCalls){this.__currentQueue=qx.lang.Object.clone(this.__calls);
this.__calls={};
this.__hasCalls=false;

for(var key in this.__currentQueue){var call=this.__currentQueue[key];

if(call){this.__currentQueue[key]=null;
call.call();
}}}this.__currentQueue=null;
})},destruct:function(){if(this.__timeoutId!=null){window.clearTimeout(this.__timeoutId);
}this.__timeoutWrapper=this.__calls=null;
}});
qx.Class.define("qx.util.DeferredCall",{extend:qx.core.Object,construct:function(callback,context){arguments.callee.base.call(this);
this.__callback=callback;
this.__context=context||null;
this.__manager=qx.util.DeferredCallManager.getInstance();
},members:{__callback:null,__context:null,__manager:null,cancel:function(){this.__manager.cancel(this);
},schedule:function(){this.__manager.schedule(this);
},call:function(){this.__context?this.__callback.apply(this.__context):this.__callback();
}},destruct:function(callback,context){this.cancel();
this.__context=this.__callback=this.__manager=null;
}});
qx.Class.define("qx.html.Element",{extend:qx.core.Object,construct:function(tagName){arguments.callee.base.call(this);
this.__nodeName=tagName||"div";
},statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__selection:{},_scheduleFlush:function(job){qx.html.Element.__deferredCall.schedule();
},_mshtmlVisibilitySort:qx.core.Variant.select("qx.client",{"mshtml":function(a,b){var al=a.__element;
var bl=b.__element;

if(al.contains(bl)){return 1;
}
if(bl.contains(al)){return -1;
}return 0;
},"default":null}),flush:function(){var obj;
{};
var focusHandler=this.__getFocusHandler();
var focusedDomElement=focusHandler.getFocus();

if(focusedDomElement&&this.__willBecomeInvisible(focusedDomElement)){focusHandler.blur(focusedDomElement);
}var activeDomElement=focusHandler.getActive();

if(activeDomElement&&this.__willBecomeInvisible(activeDomElement)){qx.bom.Element.deactivate(activeDomElement);
}var captureDomElement=this.__getCaptureElement();

if(captureDomElement&&this.__willBecomeInvisible(captureDomElement)){qx.bom.Element.releaseCapture(captureDomElement);
}var later=[];
var modified=this._modified;

for(var hc in modified){obj=modified[hc];
if(obj.__willBeSeeable()){if(obj.__element&&qx.dom.Hierarchy.isRendered(obj.__element)){later.push(obj);
}else{{};
obj.__flush();
}delete modified[hc];
}}
for(var i=0,l=later.length;i<l;i++){obj=later[i];
{};
obj.__flush();
}var visibility=this._visibility;
if(qx.core.Variant.isSet("qx.client","mshtml")){var list=[];

for(var hc in visibility){list.push(visibility[hc]);
}if(list.length>1){list.sort(this._mshtmlVisibilitySort);
visibility=this._visibility={};

for(var i=0;i<list.length;i++){obj=list[i];
visibility[obj.$$hash]=obj;
}}}
for(var hc in visibility){obj=visibility[hc];
{};
obj.__element.style.display=obj.__visible?"":"none";
delete visibility[hc];
}var scroll=this._scroll;

for(var hc in scroll){obj=scroll[hc];
var elem=obj.__element;

if(elem&&elem.offsetWidth){var done=true;
if(obj.__lazyScrollX!=null){obj.__element.scrollLeft=obj.__lazyScrollX;
delete obj.__lazyScrollX;
}if(obj.__lazyScrollY!=null){obj.__element.scrollTop=obj.__lazyScrollY;
delete obj.__lazyScrollY;
}var intoViewX=obj.__lazyScrollIntoViewX;

if(intoViewX!=null){var child=intoViewX.element.getDomElement();

if(child&&child.offsetWidth){qx.bom.element.Scroll.intoViewX(child,elem,intoViewX.align);
delete obj.__lazyScrollIntoViewX;
}else{done=false;
}}var intoViewY=obj.__lazyScrollIntoViewY;

if(intoViewY!=null){var child=intoViewY.element.getDomElement();

if(child&&child.offsetWidth){qx.bom.element.Scroll.intoViewY(child,elem,intoViewY.align);
delete obj.__lazyScrollIntoViewY;
}else{done=false;
}}if(done){delete scroll[hc];
}}}var activityEndActions={"releaseCapture":1,"blur":1,"deactivate":1};
for(var i=0;i<this._actions.length;i++){var action=this._actions[i];
var element=action.element.__element;

if(!element||!activityEndActions[action.type]&&!action.element.__willBeSeeable()){continue;
}var args=action.args;
args.unshift(element);
qx.bom.Element[action.type].apply(qx.bom.Element,args);
}this._actions=[];
for(var hc in this.__selection){var selection=this.__selection[hc];
var elem=selection.element.__element;

if(elem){qx.bom.Selection.set(elem,selection.start,selection.end);
delete this.__selection[hc];
}}qx.event.handler.Appear.refresh();
},__getFocusHandler:function(){if(!this.__focusHandler){var eventManager=qx.event.Registration.getManager(window);
this.__focusHandler=eventManager.getHandler(qx.event.handler.Focus);
}return this.__focusHandler;
},__getCaptureElement:function(){if(!this.__mouseCapture){var eventManager=qx.event.Registration.getManager(window);
this.__mouseCapture=eventManager.getDispatcher(qx.event.dispatch.MouseCapture);
}return this.__mouseCapture.getCaptureElement();
},__willBecomeInvisible:function(domElement){var element=qx.core.ObjectRegistry.fromHashCode(domElement.$$element);
return element&&!element.__willBeSeeable();
}},members:{__nodeName:null,__element:null,__root:false,__included:true,__visible:true,__lazyScrollIntoViewX:null,__lazyScrollIntoViewY:null,__lazyScrollX:null,__lazyScrollY:null,__styleJobs:null,__attribJobs:null,__propertyJobs:null,__styleValues:null,__attribValues:null,__propertyValues:null,__eventValues:null,__children:null,__modifiedChildren:null,__parent:null,_scheduleChildrenUpdate:function(){if(this.__modifiedChildren){return;
}this.__modifiedChildren=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush("element");
},_createDomElement:function(){return qx.bom.Element.create(this.__nodeName);
},__flush:function(){{};
var children=this.__children;

if(children){var length=children.length;
var child;

for(var i=0;i<length;i++){child=children[i];

if(child.__visible&&child.__included&&!child.__element){child.__flush();
}}}
if(!this.__element){this.__element=this._createDomElement();
this.__element.$$element=this.$$hash;
this._copyData(false);

if(children&&length>0){this._insertChildren();
}}else{this._syncData();

if(this.__modifiedChildren){this._syncChildren();
}}delete this.__modifiedChildren;
},_insertChildren:function(){var children=this.__children;
var length=children.length;
var child;

if(length>2){var domElement=document.createDocumentFragment();

for(var i=0;i<length;i++){child=children[i];

if(child.__element&&child.__included){domElement.appendChild(child.__element);
}}this.__element.appendChild(domElement);
}else{var domElement=this.__element;

for(var i=0;i<length;i++){child=children[i];

if(child.__element&&child.__included){domElement.appendChild(child.__element);
}}}},_syncChildren:function(){var domOperations;
var ObjectRegistry=qx.core.ObjectRegistry;
var dataChildren=this.__children;
var dataLength=dataChildren.length;
var dataChild;
var dataEl;
var domParent=this.__element;
var domChildren=domParent.childNodes;
var domPos=0;
var domEl;
{};
for(var i=domChildren.length-1;i>=0;i--){domEl=domChildren[i];
dataEl=ObjectRegistry.fromHashCode(domEl.$$element);

if(!dataEl||!dataEl.__included||dataEl.__parent!==this){domParent.removeChild(domEl);
{};
}}for(var i=0;i<dataLength;i++){dataChild=dataChildren[i];
if(dataChild.__included){dataEl=dataChild.__element;
domEl=domChildren[domPos];

if(!dataEl){continue;
}if(dataEl!=domEl){if(domEl){domParent.insertBefore(dataEl,domEl);
}else{domParent.appendChild(dataEl);
}{};
}domPos++;
}}{};
},_copyData:function(fromMarkup){var elem=this.__element;
var data=this.__attribValues;

if(data){var Attribute=qx.bom.element.Attribute;

for(var key in data){Attribute.set(elem,key,data[key]);
}}var data=this.__styleValues;

if(data){var Style=qx.bom.element.Style;

if(fromMarkup){Style.setStyles(elem,data);
}else{Style.setCss(elem,Style.compile(data));
}}var data=this.__propertyValues;

if(data){for(var key in data){this._applyProperty(key,data[key]);
}}var data=this.__eventValues;

if(data){qx.event.Registration.getManager(elem).importListeners(elem,data);
delete this.__eventValues;
}},_syncData:function(){var elem=this.__element;
var Attribute=qx.bom.element.Attribute;
var Style=qx.bom.element.Style;
var jobs=this.__attribJobs;

if(jobs){var data=this.__attribValues;

if(data){var value;

for(var key in jobs){value=data[key];

if(value!==undefined){Attribute.set(elem,key,value);
}else{Attribute.reset(elem,key);
}}}this.__attribJobs=null;
}var jobs=this.__styleJobs;

if(jobs){var data=this.__styleValues;

if(data){var styles={};

for(var key in jobs){styles[key]=data[key];
}Style.setStyles(elem,styles);
}this.__styleJobs=null;
}var jobs=this.__propertyJobs;

if(jobs){var data=this.__propertyValues;

if(data){var value;

for(var key in jobs){this._applyProperty(key,data[key]);
}}this.__propertyJobs=null;
}},__willBeSeeable:function(){var pa=this;
while(pa){if(pa.__root){return true;
}
if(!pa.__included||!pa.__visible){return false;
}pa=pa.__parent;
}return false;
},__addChildHelper:function(child){if(child.__parent===this){throw new Error("Child is already in: "+child);
}
if(child.__root){throw new Error("Root elements could not be inserted into other ones.");
}if(child.__parent){child.__parent.remove(child);
}child.__parent=this;
if(!this.__children){this.__children=[];
}if(this.__element){this._scheduleChildrenUpdate();
}},__removeChildHelper:function(child){if(child.__parent!==this){throw new Error("Has no child: "+child);
}if(this.__element){this._scheduleChildrenUpdate();
}delete child.__parent;
},__moveChildHelper:function(child){if(child.__parent!==this){throw new Error("Has no child: "+child);
}if(this.__element){this._scheduleChildrenUpdate();
}},getChildren:function(){return this.__children||null;
},getChild:function(index){var children=this.__children;
return children&&children[index]||null;
},hasChildren:function(){var children=this.__children;
return children&&children[0]!==undefined;
},indexOf:function(child){var children=this.__children;
return children?children.indexOf(child):-1;
},hasChild:function(child){var children=this.__children;
return children&&children.indexOf(child)!==-1;
},add:function(varargs){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++){this.__addChildHelper(arguments[i]);
}this.__children.push.apply(this.__children,arguments);
}else{this.__addChildHelper(varargs);
this.__children.push(varargs);
}return this;
},addAt:function(child,index){this.__addChildHelper(child);
qx.lang.Array.insertAt(this.__children,child,index);
return this;
},remove:function(childs){var children=this.__children;

if(!children){return;
}
if(arguments[1]){var child;

for(var i=0,l=arguments.length;i<l;i++){child=arguments[i];
this.__removeChildHelper(child);
qx.lang.Array.remove(children,child);
}}else{this.__removeChildHelper(childs);
qx.lang.Array.remove(children,childs);
}return this;
},removeAt:function(index){var children=this.__children;

if(!children){throw new Error("Has no children!");
}var child=children[index];

if(!child){throw new Error("Has no child at this position!");
}this.__removeChildHelper(child);
qx.lang.Array.removeAt(this.__children,index);
return this;
},removeAll:function(){var children=this.__children;

if(children){for(var i=0,l=children.length;i<l;i++){this.__removeChildHelper(children[i]);
}children.length=0;
}return this;
},getParent:function(){return this.__parent||null;
},insertInto:function(parent,index){parent.__addChildHelper(this);

if(index==null){parent.__children.push(this);
}else{qx.lang.Array.insertAt(this.__children,this,index);
}return this;
},insertBefore:function(rel){var parent=rel.__parent;
parent.__addChildHelper(this);
qx.lang.Array.insertBefore(parent.__children,this,rel);
return this;
},insertAfter:function(rel){var parent=rel.__parent;
parent.__addChildHelper(this);
qx.lang.Array.insertAfter(parent.__children,this,rel);
return this;
},moveTo:function(index){var parent=this.__parent;
parent.__moveChildHelper(this);
var oldIndex=parent.__children.indexOf(this);

if(oldIndex===index){throw new Error("Could not move to same index!");
}else if(oldIndex<index){index--;
}qx.lang.Array.removeAt(parent.__children,oldIndex);
qx.lang.Array.insertAt(parent.__children,this,index);
return this;
},moveBefore:function(rel){var parent=this.__parent;
return this.moveTo(parent.__children.indexOf(rel));
},moveAfter:function(rel){var parent=this.__parent;
return this.moveTo(parent.__children.indexOf(rel)+1);
},free:function(){var parent=this.__parent;

if(!parent){throw new Error("Has no parent to remove from.");
}
if(!parent.__children){return;
}parent.__removeChildHelper(this);
qx.lang.Array.remove(parent.__children,this);
return this;
},getDomElement:function(){return this.__element||null;
},getNodeName:function(){return this.__nodeName;
},setNodeName:function(name){this.__nodeName=name;
},setRoot:function(root){this.__root=root;
},useMarkup:function(html){if(this.__element){throw new Error("Could not overwrite existing element!");
}if(qx.core.Variant.isSet("qx.client","mshtml")){var helper=document.createElement("div");
}else{var helper=qx.html.Element.__markupHelper;

if(!helper){helper=qx.html.Element.__markupHelper=document.createElement("div");
}}helper.innerHTML=html;
this.__element=helper.firstChild;
this.__element.$$element=this.$$hash;
this._copyData(true);
return this.__element;
},useElement:function(elem){if(this.__element){throw new Error("Could not overwrite existing element!");
}this.__element=elem;
this.__element.$$element=this.$$hash;
this._copyData(true);
},isFocusable:function(){var tabIndex=this.getAttribute("tabIndex");

if(tabIndex>=1){return true;
}var focusable=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(tabIndex>=0&&focusable[this.__nodeName]){return true;
}return false;
},setSelectable:function(value){this.setAttribute("qxSelectable",value?"on":"off");
if(qx.core.Variant.isSet("qx.client","webkit")){this.setStyle("userSelect",value?"normal":"none");
}},isNativelyFocusable:function(){return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this.__nodeName];
},include:function(){if(this.__included){return;
}delete this.__included;

if(this.__parent){this.__parent._scheduleChildrenUpdate();
}return this;
},exclude:function(){if(!this.__included){return;
}this.__included=false;

if(this.__parent){this.__parent._scheduleChildrenUpdate();
}return this;
},isIncluded:function(){return this.__included===true;
},show:function(){if(this.__visible){return;
}
if(this.__element){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush("element");
}if(this.__parent){this.__parent._scheduleChildrenUpdate();
}delete this.__visible;
},hide:function(){if(!this.__visible){return;
}
if(this.__element){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush("element");
}this.__visible=false;
},isVisible:function(){return this.__visible===true;
},scrollChildIntoViewX:function(elem,align,direct){var thisEl=this.__element;
var childEl=elem.getDomElement();

if(direct!==false&&thisEl&&thisEl.offsetWidth&&childEl&&childEl.offsetWidth){qx.bom.element.Scroll.intoViewX(childEl,thisEl,align);
}else{this.__lazyScrollIntoViewX={element:elem,align:align};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush("element");
}delete this.__lazyScrollX;
},scrollChildIntoViewY:function(elem,align,direct){var thisEl=this.__element;
var childEl=elem.getDomElement();

if(direct!==false&&thisEl&&thisEl.offsetWidth&&childEl&&childEl.offsetWidth){qx.bom.element.Scroll.intoViewY(childEl,thisEl,align);
}else{this.__lazyScrollIntoViewY={element:elem,align:align};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush("element");
}delete this.__lazyScrollY;
},scrollToX:function(x,lazy){var thisEl=this.__element;

if(lazy!==true&&thisEl&&thisEl.offsetWidth){thisEl.scrollLeft=x;
}else{this.__lazyScrollX=x;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush("element");
}delete this.__lazyScrollIntoViewX;
},getScrollX:function(){var thisEl=this.__element;

if(thisEl){return thisEl.scrollLeft;
}return this.__lazyScrollX||0;
},scrollToY:function(y,lazy){var thisEl=this.__element;

if(lazy!==true&&thisEl&&thisEl.offsetWidth){thisEl.scrollTop=y;
}else{this.__lazyScrollY=y;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush("element");
}delete this.__lazyScrollIntoViewY;
},getScrollY:function(){var thisEl=this.__element;

if(thisEl){return thisEl.scrollTop;
}return this.__lazyScrollY||0;
},disableScrolling:function(){this.enableScrolling();
this.scrollToX(0);
this.scrollToY(0);
this.addListener("scroll",this.__onScroll,this);
},enableScrolling:function(){this.removeListener("scroll",this.__onScroll,this);
},__inScroll:null,__onScroll:function(e){if(!this.__inScroll){this.__inScroll=true;
this.__element.scrollTop=0;
this.__element.scrollLeft=0;
delete this.__inScroll;
}},getTextSelection:function(){var el=this.__element;

if(el){return qx.bom.Selection.get(el);
}return null;
},getTextSelectionLength:function(){var el=this.__element;

if(el){return qx.bom.Selection.getLength(el);
}return null;
},setTextSelection:function(start,end){var el=this.__element;

if(el){qx.bom.Selection.set(el,start,end);
return;
}qx.html.Element.__selection[this.toHashCode()]={element:this,start:start,end:end};
qx.html.Element._scheduleFlush("element");
},clearTextSelection:function(){var el=this.__element;

if(el){qx.bom.Selection.clear(el);
}delete qx.html.Element.__selection[this.toHashCode()];
},__performAction:function(action,args){var actions=qx.html.Element._actions;
actions.push({type:action,element:this,args:args||[]});
qx.html.Element._scheduleFlush("element");
},focus:function(){this.__performAction("focus");
},blur:function(){this.__performAction("blur");
},activate:function(){this.__performAction("activate");
},deactivate:function(){this.__performAction("deactivate");
},capture:function(containerCapture){this.__performAction("capture",[containerCapture!==false]);
},releaseCapture:function(){this.__performAction("releaseCapture");
},setStyle:function(key,value,direct){if(!this.__styleValues){this.__styleValues={};
}
if(this.__styleValues[key]==value){return;
}
if(value==null){delete this.__styleValues[key];
}else{this.__styleValues[key]=value;
}if(this.__element){if(direct){qx.bom.element.Style.set(this.__element,key,value);
return this;
}if(!this.__styleJobs){this.__styleJobs={};
}this.__styleJobs[key]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush("element");
}return this;
},setStyles:function(map,direct){var Style=qx.bom.element.Style;

if(!this.__styleValues){this.__styleValues={};
}
if(this.__element){if(!this.__styleJobs){this.__styleJobs={};
}
for(var key in map){var value=map[key];

if(this.__styleValues[key]==value){continue;
}
if(value==null){delete this.__styleValues[key];
}else{this.__styleValues[key]=value;
}if(direct){Style.setStyle(this.__element,key,value);
continue;
}this.__styleJobs[key]=true;
}qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush("element");
}else{for(var key in map){var value=map[key];

if(this.__styleValues[key]==value){continue;
}
if(value==null){delete this.__styleValues[key];
}else{this.__styleValues[key]=value;
}}}return this;
},removeStyle:function(key,direct){this.setStyle(key,null,direct);
},getStyle:function(key){return this.__styleValues?this.__styleValues[key]:null;
},getAllStyles:function(){return this.__styleValues||null;
},setAttribute:function(key,value,direct){if(!this.__attribValues){this.__attribValues={};
}
if(this.__attribValues[key]==value){return;
}
if(value==null){delete this.__attribValues[key];
}else{this.__attribValues[key]=value;
}if(this.__element){if(direct){qx.bom.element.Attribute.set(this.__element,key,value);
return this;
}if(!this.__attribJobs){this.__attribJobs={};
}this.__attribJobs[key]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush("element");
}return this;
},setAttributes:function(map,direct){for(var key in map){this.setAttribute(key,map[key],direct);
}return this;
},removeAttribute:function(key,direct){this.setAttribute(key,null,direct);
},getAttribute:function(key){return this.__attribValues?this.__attribValues[key]:null;
},_applyProperty:function(name,value){},_setProperty:function(key,value,direct){if(!this.__propertyValues){this.__propertyValues={};
}
if(this.__propertyValues[key]==value){return;
}
if(value==null){delete this.__propertyValues[key];
}else{this.__propertyValues[key]=value;
}if(this.__element){if(direct){this._applyProperty(key,value);
return this;
}if(!this.__propertyJobs){this.__propertyJobs={};
}this.__propertyJobs[key]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush("element");
}return this;
},_removeProperty:function(key,direct){this._setProperty(key,null,direct);
},_getProperty:function(key){var db=this.__propertyValues;

if(!db){return null;
}var value=db[key];
return value==null?null:value;
},addListener:function(type,listener,self,capture){var msg;

if(this.$$disposed){return null;
}{};

if(this.__element){return qx.event.Registration.addListener(this.__element,type,listener,self,capture);
}
if(!this.__eventValues){this.__eventValues={};
}
if(capture==null){capture=false;
}var unique=qx.event.Manager.getNextUniqueId();
var id=type+(capture?"|capture|":"|bubble|")+unique;
this.__eventValues[id]={type:type,listener:listener,self:self,capture:capture,unique:unique};
return id;
},removeListener:function(type,listener,self,capture){var msg;

if(this.$$disposed){return null;
}{};

if(this.__element){qx.event.Registration.removeListener(this.__element,type,listener,self,capture);
}else{var values=this.__eventValues;
var entry;

if(capture==null){capture=false;
}
for(var key in values){entry=values[key];
if(entry.listener===listener&&entry.self===self&&entry.capture===capture&&entry.type===type){delete values[key];
break;
}}}return this;
},removeListenerById:function(id){if(this.$$disposed){return null;
}
if(this.__element){qx.event.Registration.removeListenerById(this.__element,id);
}else{delete this.__eventValues[id];
}return this;
},hasListener:function(type,capture){if(this.$$disposed){return false;
}
if(this.__element){return qx.event.Registration.hasListener(this.__element,type,capture);
}var values=this.__eventValues;
var entry;

if(capture==null){capture=false;
}
for(var key in values){entry=values[key];
if(entry.capture===capture&&entry.type===type){return true;
}}return false;
}},defer:function(statics){statics.__deferredCall=new qx.util.DeferredCall(statics.flush,statics);
},destruct:function(){var el=this.__element;

if(el){qx.event.Registration.getManager(el).removeAllListeners(el);
el.$$element="";
}
if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__parent;

if(parent&&!parent.$$disposed){parent.remove(this);
}}this._disposeArray("__children");
this.__attribValues=this.__styleValues=this.__eventValues=this.__propertyValues=this.__attribJobs=this.__styleJobs=this.__propertyJobs=this.__element=this.__parent=this.__lazyScrollIntoViewX=this.__lazyScrollIntoViewY=null;
}});
qx.Class.define("qx.ui.core.queue.Manager",{statics:{__scheduled:false,__jobs:{},__retries:0,MAX_RETRIES:10,scheduleFlush:function(job){var self=qx.ui.core.queue.Manager;
self.__jobs[job]=true;

if(!self.__scheduled){self.__deferredCall.schedule();
self.__scheduled=true;
}},flush:function(){var self=qx.ui.core.queue.Manager;
if(self.__inFlush){return;
}self.__inFlush=true;
self.__deferredCall.cancel();
var jobs=self.__jobs;
self.__executeAndRescheduleOnError(function(){while(jobs.visibility||jobs.widget||jobs.appearance||jobs.layout||jobs.element){if(jobs.widget){delete jobs.widget;
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
}}},function(){self.__scheduled=false;
});
self.__executeAndRescheduleOnError(function(){if(jobs.dispose){delete jobs.dispose;
qx.ui.core.queue.Dispose.flush();
}},function(){self.__inFlush=false;
});
self.__retries=0;
},__executeAndRescheduleOnError:function(callback,finallyCode){var self=qx.ui.core.queue.Manager;

try{callback();
}catch(e){self.__scheduled=false;
self.__inFlush=false;
self.__retries+=1;

if(self.__retries<=self.MAX_RETRIES){self.scheduleFlush();
}else{throw new Error("Fatal Error: Flush terminated "+(self.__retries-1)+" times in a row"+" due to exceptions in user code. The application has to be reloaded!");
}throw e;
}finally{finallyCode();
}}},defer:function(statics){statics.__deferredCall=new qx.util.DeferredCall(statics.flush);
qx.html.Element._scheduleFlush=statics.scheduleFlush;
qx.event.Registration.addListener(window,"useraction",statics.flush);
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
qx.Class.define("qx.event.handler.Keyboard",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
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
}}},members:{__onKeyUpDownWrapper:null,__manager:null,__window:null,__root:null,__lastUpDownType:null,__lastKeyCode:null,__inputListeners:null,__onKeyPressWrapper:null,canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){},_fireInputEvent:function(domEvent,charCode){var target=this.__getEventTarget();
if(target&&target.offsetWidth!=0){var event=qx.event.Registration.createEvent("keyinput",qx.event.type.KeyInput,[domEvent,target,charCode]);
this.__manager.dispatchEvent(target,event);
}if(this.__window){qx.event.Registration.fireEvent(this.__window,"useraction",qx.event.type.Data,["keyinput"]);
}},_fireSequenceEvent:function(domEvent,type,keyIdentifier){var target=this.__getEventTarget();
var event=qx.event.Registration.createEvent(type,qx.event.type.KeySequence,[domEvent,target,keyIdentifier]);
this.__manager.dispatchEvent(target,event);
if(qx.core.Variant.isSet("qx.client","mshtml|webkit")){if(type=="keydown"&&event.getDefaultPrevented()){var keyCode=domEvent.keyCode;

if(!(this._isNonPrintableKeyCode(keyCode)||keyCode==8||keyCode==9)){this._fireSequenceEvent(domEvent,"keypress",keyIdentifier);
}}}if(this.__window){qx.event.Registration.fireEvent(this.__window,"useraction",qx.event.type.Data,[type]);
}},__getEventTarget:function(){var focusHandler=this.__manager.getHandler(qx.event.handler.Focus);
var target=focusHandler.getActive();
if(!target||target.offsetWidth==0){target=focusHandler.getFocus();
}if(!target||target.offsetWidth==0){target=this.__manager.getWindow().document.body;
}return target;
},_initKeyObserver:function(){this.__onKeyUpDownWrapper=qx.lang.Function.listener(this.__onKeyUpDown,this);
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
},__onKeyUpDown:qx.event.GlobalError.observeMethod(qx.core.Variant.select("qx.client",{"mshtml":function(domEvent){domEvent=window.event||domEvent;
var keyCode=domEvent.keyCode;
var charCode=0;
var type=domEvent.type;
if(!(this.__lastUpDownType[keyCode]=="keydown"&&type=="keydown")){this._idealKeyHandler(keyCode,charCode,type,domEvent);
}if(type=="keydown"){if(this._isNonPrintableKeyCode(keyCode)||keyCode==8||keyCode==9){this._idealKeyHandler(keyCode,charCode,"keypress",domEvent);
}}this.__lastUpDownType[keyCode]=type;
},"gecko":function(domEvent){var keyCode=this._keyCodeFix[domEvent.keyCode]||domEvent.keyCode;
var charCode=0;
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
}},"opera":function(domEvent){this.__lastKeyCode=domEvent.keyCode;
this._idealKeyHandler(domEvent.keyCode,0,domEvent.type,domEvent);
}})),__firefoxInputFix:qx.core.Variant.select("qx.client",{"gecko":function(target,type,keyCode){if(type==="keydown"&&(keyCode==33||keyCode==34||keyCode==38||keyCode==40)&&target.type=="text"&&target.tagName.toLowerCase()==="input"&&target.getAttribute("autoComplete")!=="off"){if(!this.__inputListeners){this.__inputListeners={};
}var hash=qx.core.ObjectRegistry.toHashCode(target);

if(this.__inputListeners[hash]){return;
}var self=this;
this.__inputListeners[hash]={target:target,callback:function(domEvent){qx.bom.Event.stopPropagation(domEvent);
self.__onKeyPress(domEvent);
}};
var listener=qx.event.GlobalError.observeMethod(this.__inputListeners[hash].callback);
qx.bom.Event.addNativeListener(target,"keypress",listener);
}},"default":null}),__onKeyPress:qx.event.GlobalError.observeMethod(qx.core.Variant.select("qx.client",{"mshtml":function(domEvent){domEvent=window.event||domEvent;

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
}}},"opera":function(domEvent){var keyCode=domEvent.keyCode;
var type=domEvent.type;
if(keyCode!=this.__lastKeyCode){this._idealKeyHandler(0,this.__lastKeyCode,type,domEvent);
}else{if(this._keyCodeToIdentifierMap[domEvent.keyCode]){this._idealKeyHandler(domEvent.keyCode,0,domEvent.type,domEvent);
}else{this._idealKeyHandler(0,domEvent.keyCode,domEvent.type,domEvent);
}}}})),_idealKeyHandler:function(keyCode,charCode,eventType,domEvent){var keyIdentifier;
if(keyCode||(!keyCode&&!charCode)){keyIdentifier=this._keyCodeToIdentifier(keyCode);
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
this.__lastKeyCode=this.__manager=this.__window=this.__root=this.__lastUpDownType=null;
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
qx.Class.define("qx.event.handler.Mouse",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
this.__manager=manager;
this.__window=manager.getWindow();
this.__root=this.__window.document;
this._initButtonObserver();
this._initMoveObserver();
this._initWheelObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__onButtonEventWrapper:null,__onMoveEventWrapper:null,__onWheelEventWrapper:null,__lastEventType:null,__lastMouseDownTarget:null,__manager:null,__window:null,__root:null,canHandleEvent:function(target,type){},registerEvent:qx.bom.client.System.IPHONE?
function(target,type,capture){target["on"+type]=qx.lang.Function.returnNull;
}:qx.lang.Function.returnNull,unregisterEvent:qx.bom.client.System.IPHONE?
function(target,type,capture){target["on"+type]=undefined;
}:qx.lang.Function.returnNull,__fireEvent:function(domEvent,type,target){if(!target){target=domEvent.target||domEvent.srcElement;
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
},_onMoveEvent:qx.event.GlobalError.observeMethod(function(domEvent){this.__fireEvent(domEvent);
}),_onButtonEvent:qx.event.GlobalError.observeMethod(function(domEvent){var type=domEvent.type;
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
}),_onWheelEvent:qx.event.GlobalError.observeMethod(function(domEvent){this.__fireEvent(domEvent,"mousewheel");
}),__rightClickFixPre:qx.core.Variant.select("qx.client",{"webkit":function(domEvent,type,target){if(qx.bom.client.Engine.VERSION<530){if(type=="contextmenu"){this.__fireEvent(domEvent,"mouseup",target);
}}},"default":null}),__rightClickFixPost:qx.core.Variant.select("qx.client",{"opera":function(domEvent,type,target){if(type=="mouseup"&&domEvent.button==2){this.__fireEvent(domEvent,"contextmenu",target);
}},"default":null}),__doubleClickFixPre:qx.core.Variant.select("qx.client",{"mshtml":function(domEvent,type,target){if(type=="mouseup"&&this.__lastEventType=="click"){this.__fireEvent(domEvent,"mousedown",target);
}else if(type=="dblclick"){this.__fireEvent(domEvent,"click",target);
}},"default":null}),__differentTargetClickFixPost:qx.core.Variant.select("qx.client",{"mshtml":null,"default":function(domEvent,type,target){switch(type){case "mousedown":this.__lastMouseDownTarget=target;
break;
case "mouseup":if(target!==this.__lastMouseDownTarget){var commonParent=qx.dom.Hierarchy.getCommonParent(target,this.__lastMouseDownTarget);
this.__fireEvent(domEvent,"click",commonParent);
}}}})},destruct:function(){this._stopButtonObserver();
this._stopMoveObserver();
this._stopWheelObserver();
this.__manager=this.__window=this.__root=this.__lastMouseDownTarget=null;
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Class.define("qx.event.handler.Capture",{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){}},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Class.define("qx.event.handler.DragDrop",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
this.__manager=manager;
this.__root=manager.getWindow().document.documentElement;
this.__manager.addListener(this.__root,"mousedown",this._onMouseDown,this);
this.__rebuildStructures();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__manager:null,__root:null,__dropTarget:null,__dragTarget:null,__types:null,__actions:null,__keys:null,__cache:null,__currentType:null,__currentAction:null,__sessionActive:false,__startLeft:0,__startTop:0,canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){},addType:function(type){this.__types[type]=true;
},addAction:function(action){this.__actions[action]=true;
},supportsType:function(type){return !!this.__types[type];
},supportsAction:function(type){return !!this.__actions[type];
},getData:function(type){if(!this.__validDrop||!this.__dropTarget){throw new Error("This method must not be used outside the drop event listener!");
}
if(!this.__types[type]){throw new Error("Unsupported data type: "+type+"!");
}
if(!this.__cache[type]){this.__currentType=type;
this.__fireEvent("droprequest",this.__dragTarget,this.__dropTarget,false);
}
if(!this.__cache[type]){throw new Error("Please use a droprequest listener to the drag source to fill the manager with data!");
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
this.__fireEvent("dragchange",this.__dragTarget,this.__dropTarget,false);
}},__fireEvent:function(type,target,relatedTarget,cancelable,original){var Registration=qx.event.Registration;
var dragEvent=Registration.createEvent(type,qx.event.type.Drag,[cancelable,original]);

if(target!==relatedTarget){dragEvent.setRelatedTarget(relatedTarget);
}return Registration.dispatchEvent(target,dragEvent);
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
this.__fireEvent("dragend",this.__dragTarget,this.__dropTarget,false);
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
}},_onMouseUp:function(e){if(this.__validDrop){this.__fireEvent("drop",this.__dropTarget,this.__dragTarget,false,e);
}if(this.__sessionActive){e.stopPropagation();
}this.__clearSession();
},_onMouseMove:function(e){if(this.__sessionActive){if(!this.__fireEvent("drag",this.__dragTarget,this.__dropTarget,true,e)){this.__clearSession();
}}else{if(Math.abs(e.getDocumentLeft()-this.__startLeft)>3||Math.abs(e.getDocumentTop()-this.__startTop)>3){if(this.__fireEvent("dragstart",this.__dragTarget,this.__dropTarget,true,e)){this.__sessionActive=true;
this.__manager.addListener(this.__root,"mouseover",this._onMouseOver,this,true);
this.__manager.addListener(this.__root,"mouseout",this._onMouseOut,this,true);
this.__manager.addListener(this.__root,"keydown",this._onKeyDown,this,true);
this.__manager.addListener(this.__root,"keyup",this._onKeyUp,this,true);
var keys=this.__keys;
keys.Ctrl=e.isCtrlPressed();
keys.Shift=e.isShiftPressed();
keys.Alt=e.isAltPressed();
this.__detectAction();
}else{this.__fireEvent("dragend",this.__dragTarget,this.__dropTarget,false);
this.__clearInit();
}}}},_onMouseOver:function(e){var target=e.getTarget();
var dropable=this.__findDroppable(target);

if(dropable&&dropable!=this.__dropTarget){this.__validDrop=this.__fireEvent("dragover",dropable,this.__dragTarget,true,e);
this.__dropTarget=dropable;
this.__detectAction();
}},_onMouseOut:function(e){var dropable=this.__findDroppable(e.getTarget());
var newDropable=this.__findDroppable(e.getRelatedTarget());

if(dropable&&dropable!==newDropable&&dropable==this.__dropTarget){this.__fireEvent("dragleave",this.__dropTarget,newDropable,false,e);
this.__dropTarget=null;
this.__validDrop=false;
qx.event.Timer.once(this.__detectAction,this,0);
}}},destruct:function(){this.__dragTarget=this.__dropTarget=this.__manager=this.__root=this.__types=this.__actions=this.__keys=this.__cache=null;
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Class.define("qx.event.handler.Element",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
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
qx.Class.define("qx.event.handler.Appear",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
this.__manager=manager;
this.__targets={};
qx.event.handler.Appear.__instances[this.$$hash]=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__instances:{},refresh:function(){var all=this.__instances;

for(var hash in all){all[hash].refresh();
}}},members:{__manager:null,__targets:null,canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){var hash=qx.core.ObjectRegistry.toHashCode(target)+type;
var targets=this.__targets;

if(targets&&!targets[hash]){targets[hash]=target;
target.$$displayed=target.offsetWidth>0;
}},unregisterEvent:function(target,type,capture){var hash=qx.core.ObjectRegistry.toHashCode(target)+type;
var targets=this.__targets;

if(!targets){return;
}
if(targets[hash]){delete targets[hash];
}},refresh:function(){var targets=this.__targets;
var elem;

for(var hash in targets){elem=targets[hash];
var displayed=elem.offsetWidth>0;

if((!!elem.$$displayed)!==displayed){elem.$$displayed=displayed;
var evt=qx.event.Registration.createEvent(displayed?"appear":"disappear");
this.__manager.dispatchEvent(elem,evt);
}}}},destruct:function(){this.__manager=this.__targets=null;
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
}}else{element=win.document.createElement(name);
}
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
},capture:function(element,containerCapture){qx.event.Registration.getManager(element).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(element,containerCapture);
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
qx.Class.define("qx.event.type.Dom",{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{_cloneNativeEvent:function(nativeEvent,clone){var clone=arguments.callee.base.call(this,nativeEvent,clone);
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
qx.Class.define("qx.event.type.KeyInput",{extend:qx.event.type.Dom,members:{init:function(domEvent,target,charCode){arguments.callee.base.call(this,domEvent,target,null,true,true);
this._charCode=charCode;
return this;
},clone:function(embryo){var clone=arguments.callee.base.call(this,embryo);
clone._charCode=this._charCode;
return clone;
},getCharCode:function(){return this._charCode;
},getChar:function(){return String.fromCharCode(this._charCode);
}}});
qx.Class.define("qx.event.type.KeySequence",{extend:qx.event.type.Dom,members:{init:function(domEvent,target,identifier){arguments.callee.base.call(this,domEvent,target,null,true,true);
this._identifier=identifier;
return this;
},clone:function(embryo){var clone=arguments.callee.base.call(this,embryo);
clone._identifier=this._identifier;
return clone;
},getKeyIdentifier:function(){return this._identifier;
}}});
qx.Class.define("qx.event.handler.Focus",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(manager){arguments.callee.base.call(this);
this._manager=manager;
this._window=manager.getWindow();
this._document=this._window.document;
this._root=this._document.documentElement;
this._body=this._document.body;
this._initObserver();
},properties:{active:{apply:"_applyActive",nullable:true},focus:{apply:"_applyFocus",nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Variant.select("qx.client",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__onNativeMouseDownWrapper:null,__onNativeMouseUpWrapper:null,__onNativeFocusWrapper:null,__onNativeBlurWrapper:null,__onNativeDragGestureWrapper:null,__onNativeSelectStartWrapper:null,__onNativeFocusInWrapper:null,__onNativeFocusOutWrapper:null,__previousFocus:null,__previousActive:null,canHandleEvent:function(target,type){},registerEvent:function(target,type,capture){},unregisterEvent:function(target,type,capture){},focus:function(element){try{element.focus();
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
}}),__onNativeDragGesture:qx.event.GlobalError.observeMethod(qx.core.Variant.select("qx.client",{"gecko":function(e){if(!this.__isSelectable(e.target)){qx.bom.Event.preventDefault(e);
}},"default":null})),__onNativeFocusIn:qx.event.GlobalError.observeMethod(qx.core.Variant.select("qx.client",{"mshtml":function(e){this.__doWindowFocus();
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
}}},"default":null})),__onNativeFocusOut:qx.event.GlobalError.observeMethod(qx.core.Variant.select("qx.client",{"mshtml":function(e){if(!e.toElement){this.__doWindowBlur();
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
}}},"default":null})),__onNativeBlur:qx.event.GlobalError.observeMethod(qx.core.Variant.select("qx.client",{"gecko":function(e){if(e.target===this._window||e.target===this._document){this.__doWindowBlur();
this.resetActive();
this.resetFocus();
}},"webkit":function(e){if(e.target===this._window||e.target===this._document){this.__doWindowBlur();
this.__previousFocus=this.getFocus();
this.__previousActive=this.getActive();
this.resetActive();
this.resetFocus();
}},"default":null})),__onNativeFocus:qx.event.GlobalError.observeMethod(qx.core.Variant.select("qx.client",{"gecko":function(e){var target=e.target;

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
}},"default":null})),__onNativeMouseDown:qx.event.GlobalError.observeMethod(qx.core.Variant.select("qx.client",{"gecko":function(e){var target=e.target;
var focusTarget=this.__findFocusableElement(target);
var selectable=this.__isSelectable(target);

if(!selectable){qx.bom.Event.preventDefault(e);
if(focusTarget){if(qx.core.Variant.isSet("qx.client","gecko")){var isElementOfRootPage=qx.bom.element.Attribute.get(focusTarget,"qxIsRootPage")==="1";

if(!isElementOfRootPage){focusTarget.focus();
}}else{focusTarget.focus();
}}}else if(!focusTarget){qx.bom.Event.preventDefault(e);
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
}},"default":null})),__onNativeMouseUp:qx.event.GlobalError.observeMethod(qx.core.Variant.select("qx.client",{"mshtml":function(e){var target=e.srcElement;

if(target.unselectable){target.unselectable="off";
}this.tryActivate(this.__fixFocus(target));
},"gecko":function(e){var target=e.target;

while(target&&target.offsetWidth===undefined){target=target.parentNode;
}
if(target){this.tryActivate(target);
}},"webkit|opera":function(e){this.tryActivate(this.__fixFocus(e.target));
},"default":null})),__fixFocus:qx.event.GlobalError.observeMethod(qx.core.Variant.select("qx.client",{"mshtml|webkit":function(target){var focusedElement=this.getFocus();

if(focusedElement&&target!=focusedElement&&(focusedElement.nodeName.toLowerCase()==="input"||focusedElement.nodeName.toLowerCase()==="textarea")){target=focusedElement;
}return target;
},"default":function(target){return target;
}})),__onNativeSelectStart:qx.event.GlobalError.observeMethod(qx.core.Variant.select("qx.client",{"mshtml|webkit":function(e){var target=qx.bom.client.Engine.MSHTML?e.srcElement:e.target;

if(!this.__isSelectable(target)){qx.bom.Event.preventDefault(e);
}},"default":null})),__isFocusable:function(el){var index=qx.bom.element.Attribute.get(el,"tabIndex");

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
this._manager=this._window=this._document=this._root=this._body=this.__mouseActive=null;
},defer:function(statics){qx.event.Registration.addHandler(statics);
var focusable=statics.FOCUSABLE_ELEMENTS;

for(var entry in focusable){focusable[entry.toUpperCase()]=1;
}}});
qx.Class.define("qx.event.type.Focus",{extend:qx.event.type.Event,members:{init:function(target,relatedTarget,canBubble){arguments.callee.base.call(this,canBubble,false);
this._target=target;
this._relatedTarget=relatedTarget;
return this;
}}});
qx.Class.define("qx.bom.element.Attribute",{statics:{__hints:{names:{"class":"className","for":"htmlFor",html:"innerHTML",text:qx.core.Variant.isSet("qx.client","mshtml")?"innerText":"textContent",colspan:"colSpan",rowspan:"rowSpan",valign:"vAlign",datetime:"dateTime",accesskey:"accessKey",tabindex:"tabIndex",maxlength:"maxLength",readonly:"readOnly",longdesc:"longDesc",cellpadding:"cellPadding",cellspacing:"cellSpacing",frameborder:"frameBorder",usemap:"useMap"},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readonly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:"",maxLength:10000000,className:"",innerHTML:"",innerText:"",textContent:"",htmlFor:"",tabIndex:0},original:{href:1,src:1,type:1}},compile:function(map){var html=[];
var runtime=this.__hints.runtime;

for(var key in map){if(!runtime[key]){html.push(key,"='",map[key],"'");
}}return html.join("");
},get:qx.core.Variant.select("qx.client",{"mshtml":function(element,name){var hints=this.__hints;
var value;
name=hints.names[name]||name;
if(hints.original[name]){value=element.getAttribute(name,2);
}else if(hints.property[name]){if(hints.propertyDefault[name]&&value==hints.propertyDefault[name]){return null;
}value=element[name];
}else{value=element.getAttribute(name);
}if(hints.bools[name]){return !!value;
}return value;
},"default":function(element,name){var hints=this.__hints;
var value;
name=hints.names[name]||name;
if(hints.property[name]){if(hints.propertyDefault[name]&&value==hints.propertyDefault[name]){return null;
}value=element[name];

if(value==null){value=element.getAttribute(name);
}}else{value=element.getAttribute(name);
}if(hints.bools[name]){return !!value;
}return value;
}}),set:function(element,name,value){var hints=this.__hints;
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
qx.Class.define("qx.event.type.Mouse",{extend:qx.event.type.Dom,members:{init:function(nativeEvent,target,relatedTarget,canBubble,cancelable){arguments.callee.base.call(this,nativeEvent,target,relatedTarget,canBubble,cancelable);

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
},"webkit":function(){if(window.navigator.userAgent.indexOf("Chrome")!==-1){return -(this._native.wheelDelta/120);
}else{return -(this._native.wheelDelta/40);
}}})}});
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
qx.Class.define("qx.event.type.Drag",{extend:qx.event.type.Event,members:{init:function(cancelable,originalEvent){arguments.callee.base.call(this,true,cancelable);

if(originalEvent){this._native=originalEvent.getNativeEvent()||null;
this._originalTarget=originalEvent.getTarget()||null;
}else{this._native=null;
this._originalTarget=null;
}return this;
},clone:function(embryo){var clone=arguments.callee.base.call(this,embryo);
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
qx.Class.define("qx.event.dispatch.MouseCapture",{extend:qx.event.dispatch.AbstractBubbling,construct:function(manager,registration){arguments.callee.base.call(this,manager);
this.__window=manager.getWindow();
this.__registration=registration;
manager.addListener(this.__window,"blur",this.releaseCapture,this);
manager.addListener(this.__window,"focus",this.releaseCapture,this);
manager.addListener(this.__window,"scroll",this.releaseCapture,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__registration:null,__captureElement:null,__containerCapture:true,__window:null,_getParent:function(target){return target.parentNode;
},canDispatchEvent:function(target,event,type){return (this.__captureElement&&this.__captureEvents[type]);
},dispatchEvent:function(target,event,type){if(type=="click"){event.stopPropagation();
this.releaseCapture();
return;
}
if(this.__containerCapture||!qx.dom.Hierarchy.contains(this.__captureElement,target)){target=this.__captureElement;
}arguments.callee.base.call(this,target,event,type);
},__captureEvents:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(element,containerCapture){var containerCapture=containerCapture!==false;

if(this.__captureElement===element&&this.__containerCapture==containerCapture){return;
}
if(this.__captureElement){this.releaseCapture();
}this.nativeSetCapture(element,containerCapture);

if(this.hasNativeCapture){var self=this;
qx.bom.Event.addNativeListener(element,"losecapture",function(){qx.bom.Event.removeNativeListener(element,"losecapture",arguments.callee);
self.releaseCapture();
});
}this.__containerCapture=containerCapture;
this.__captureElement=element;
this.__registration.fireEvent(element,"capture",qx.event.type.Event,[true,false]);
},getCaptureElement:function(){return this.__captureElement;
},releaseCapture:function(){var element=this.__captureElement;

if(!element){return;
}this.__captureElement=null;
this.__registration.fireEvent(element,"losecapture",qx.event.type.Event,[true,false]);
this.nativeReleaseCapture(element);
},hasNativeCapture:qx.bom.client.Engine.MSHTML,nativeSetCapture:qx.core.Variant.select("qx.client",{"mshtml":function(element,containerCapture){element.setCapture(containerCapture!==false);
},"default":qx.lang.Function.empty}),nativeReleaseCapture:qx.core.Variant.select("qx.client",{"mshtml":function(element){element.releaseCapture();
},"default":qx.lang.Function.empty})},destruct:function(){this.__captureElement=this.__window=this.__registration=null;
},defer:function(statics){qx.event.Registration.addDispatcher(statics);
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
qx.Class.define("qx.bom.element.Location",{statics:{__style:function(elem,style){return qx.bom.element.Style.get(elem,style,qx.bom.element.Style.COMPUTED_MODE,false);
},__num:function(elem,style){return parseInt(qx.bom.element.Style.get(elem,style,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;
},__computeScroll:function(elem){var left=0,top=0;
if(elem.getBoundingClientRect&&!qx.bom.client.Engine.OPERA){var win=qx.dom.Node.getWindow(elem);
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
if(qx.bom.client.Engine.VERSION<530.17){left+=this.__num(body,"borderLeftWidth");
top+=this.__num(body,"borderTopWidth");
}return {left:left,top:top};
},"gecko":function(elem){var body=qx.dom.Node.getDocument(elem).body;
var left=body.offsetLeft;
var top=body.offsetTop;
if(qx.bom.client.Engine.VERSION<1.9){left+=this.__num(body,"marginLeft");
top+=this.__num(body,"marginTop");
}if(qx.bom.element.BoxSizing.get(body)!=="border-box"){left+=this.__num(body,"borderLeftWidth");
top+=this.__num(body,"borderTopWidth");
}return {left:left,top:top};
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
}}),get:function(elem,mode){if(elem.tagName=="BODY"){var location=this.__getBodyLocation(elem);
var left=location.left;
var top=location.top;
}else{var body=this.__computeBody(elem);
var offset=this.__computeOffset(elem);
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
},__getBodyLocation:qx.core.Variant.select("qx.client",{"default":function(body){var top=body.offsetTop+this.__num(body,"marginTop");
var left=body.offsetLeft+this.__num(body,"marginLeft");
return {left:left,top:top};
},"mshtml":function(body){var top=body.offsetTop;
var left=body.offsetLeft;

if(!((qx.bom.client.Engine.VERSION<8||qx.bom.client.Engine.DOCUMENT_MODE<8)&&!qx.bom.client.Feature.QUIRKS_MODE)){top+=this.__num(body,"marginTop");
left+=this.__num(body,"marginLeft");
}return {left:left,top:top};
},"gecko":function(body){var top=body.offsetTop+this.__num(body,"marginTop")+this.__num(body,"borderLeftWidth");
var left=body.offsetLeft+this.__num(body,"marginLeft")+this.__num(body,"borderTopWidth");
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

while(offsetParent&&(!/^body|html$/i.test(offsetParent.tagName)&&Style.get(offsetParent,"position")==="static")){offsetParent=offsetParent.offsetParent;
}return offsetParent;
}}});
qx.Class.define("qx.bom.Selection",{statics:{getSelectionObject:qx.core.Variant.select("qx.client",{"mshtml":function(documentNode){return documentNode.selection;
},"default":function(documentNode){return qx.dom.Node.getWindow(documentNode).getSelection();
}}),get:qx.core.Variant.select("qx.client",{"mshtml":function(node){var rng=qx.bom.Range.get(qx.dom.Node.getDocument(node));
return rng.text;
},"default":function(node){if(qx.dom.Node.isElement(node)&&(node.nodeName.toLowerCase()=="input"||node.nodeName.toLowerCase()=="textarea")){return node.value.substring(node.selectionStart,node.selectionEnd);
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(node)).toString();
}return null;
}}),getLength:qx.core.Variant.select("qx.client",{"mshtml":function(node){var selectedValue=qx.bom.Selection.get(node);
var split=qx.util.StringSplit.split(selectedValue,/\r\n/);
return selectedValue.length-(split.length-1);
},"opera":function(node){var selectedValue,selectedLength,split;

if(qx.dom.Node.isElement(node)&&(node.nodeName.toLowerCase()=="input"||node.nodeName.toLowerCase()=="textarea")){var start=node.selectionStart;
var end=node.selectionEnd;
selectedValue=node.value.substring(start,end);
selectedLength=end-start;
}else{selectedValue=qx.bom.Selection.get(node);
selectedLength=selectedValue.length;
}split=qx.util.StringSplit.split(selectedValue,/\r\n/);
return selectedLength-(split.length-1);
},"default":function(node){if(qx.dom.Node.isElement(node)&&(node.nodeName.toLowerCase()=="input"||node.nodeName.toLowerCase()=="textarea")){return node.selectionEnd-node.selectionStart;
}else{return qx.bom.Selection.get(node).length;
}return null;
}}),set:qx.core.Variant.select("qx.client",{"mshtml":function(node,start,end){var rng;
if(qx.dom.Node.isDocument(node)){node=node.body;
}
if(qx.dom.Node.isElement(node)||qx.dom.Node.isText(node)){switch(node.nodeName.toLowerCase()){case "input":case "textarea":case "button":if(end===undefined){end=node.value.length;
}
if(start>=0&&start<=node.value.length&&end>=0&&end<=node.value.length){rng=qx.bom.Range.get(node);
rng.collapse(true);
rng.moveStart("character",start);
rng.moveEnd("character",end-start);
rng.select();
return true;
}break;
case "#text":if(end===undefined){end=node.nodeValue.length;
}
if(start>=0&&start<=node.nodeValue.length&&end>=0&&end<=node.nodeValue.length){rng=qx.bom.Range.get(qx.dom.Node.getBodyElement(node));
rng.moveToElementText(node.parentNode);
rng.collapse(true);
rng.moveStart("character",start);
rng.moveEnd("character",end-start);
rng.select();
return true;
}break;
default:if(end===undefined){end=node.childNodes.length-1;
}if(node.childNodes[start]&&node.childNodes[end]){rng=qx.bom.Range.get(qx.dom.Node.getBodyElement(node));
rng.moveToElementText(node.childNodes[start]);
rng.collapse(true);
var newRng=qx.bom.Range.get(qx.dom.Node.getBodyElement(node));
newRng.moveToElementText(node.childNodes[end]);
rng.setEndPoint("EndToEnd",newRng);
rng.select();
return true;
}}}return false;
},"default":function(node,start,end){var nodeName=node.nodeName.toLowerCase();

if(qx.dom.Node.isElement(node)&&(nodeName=="input"||nodeName=="textarea")){if(end===undefined){end=node.value.length;
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
},clear:qx.core.Variant.select("qx.client",{"mshtml":function(node){var sel=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(node));
var rng=qx.bom.Range.get(node);
var parent=rng.parentElement();
var documentRange=qx.bom.Range.get(qx.dom.Node.getDocument(node));
if(parent==documentRange.parentElement()&&parent==node){sel.empty();
}},"default":function(node){var sel=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(node));
var nodeName=node.nodeName.toLowerCase();
if(qx.dom.Node.isElement(node)&&(nodeName=="input"||nodeName=="textarea")){node.setSelectionRange(0,0);
qx.bom.Element.blur(node);
}else if(qx.dom.Node.isDocument(node)||nodeName=="body"){sel.collapse(node.body?node.body:node,0);
}else{var rng=qx.bom.Range.get(node);

if(!rng.collapsed){var compareNode;
var commonAncestor=rng.commonAncestorContainer;
if(qx.dom.Node.isElement(node)&&qx.dom.Node.isText(commonAncestor)){compareNode=commonAncestor.parentNode;
}else{compareNode=commonAncestor;
}
if(compareNode==node){sel.collapse(node,0);
}}}}})}});
qx.Class.define("qx.bom.Range",{statics:{get:qx.core.Variant.select("qx.client",{"mshtml":function(node){if(qx.dom.Node.isElement(node)){switch(node.nodeName.toLowerCase()){case "input":switch(node.type){case "text":case "password":case "hidden":case "button":case "reset":case "file":case "submit":return node.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(node)).createRange();
}break;
case "textarea":case "body":case "button":return node.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(node)).createRange();
}}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(node)).createRange();
}},"default":function(node){var doc=qx.dom.Node.getDocument(node);
var sel=qx.bom.Selection.getSelectionObject(doc);

if(sel.rangeCount>0){return sel.getRangeAt(0);
}else{return doc.createRange();
}}})}});
qx.Bootstrap.define("qx.util.StringSplit",{statics:{split:function(string,separator,limit){var flags="";
if(separator===undefined){return [string.toString()];
}else if(separator===null||separator.constructor!==RegExp){separator=new RegExp(String(separator).replace(/[.*+?^${}()|[\]\/\\]/g,"\\$&"),"g");
}else{flags=separator.toString().replace(/^[\S\s]+\//,"");

if(!separator.global){separator=new RegExp(separator.source,"g"+flags);
}}var separator2=new RegExp("^"+separator.source+"$",flags);
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
}}return (lastLastIndex===string.length)?(separator.test("")?output:output.concat("")):(limit?output:output.concat(string.substring(lastLastIndex)));
}}});
qx.Class.define("qx.ui.core.queue.Widget",{statics:{__queue:{},remove:function(widget){delete this.__queue[widget.$$hash];
},add:function(widget){var queue=this.__queue;

if(queue[widget.$$hash]){return;
}queue[widget.$$hash]=widget;
qx.ui.core.queue.Manager.scheduleFlush("widget");
},flush:function(){var queue=this.__queue;
var obj;

for(var hash in queue){obj=queue[hash];
delete queue[hash];
obj.syncWidget();
}for(var hash in queue){return;
}this.__queue={};
}}});
qx.Class.define("qx.ui.core.queue.Visibility",{statics:{__queue:{},__data:{},remove:function(widget){var hash=widget.$$hash;
delete this.__data[hash];
delete this.__queue[hash];
},isVisible:function(widget){return this.__data[widget.$$hash]||false;
},__computeVisible:function(widget){var data=this.__data;
var hash=widget.$$hash;
var visible;
if(widget.isExcluded()){visible=false;
}else{var parent=widget.$$parent;

if(parent){visible=this.__computeVisible(parent);
}else{visible=widget.isRootWidget();
}}return data[hash]=visible;
},add:function(widget){var queue=this.__queue;

if(queue[widget.$$hash]){return;
}queue[widget.$$hash]=widget;
qx.ui.core.queue.Manager.scheduleFlush("visibility");
},flush:function(){var queue=this.__queue;
var data=this.__data;
for(var hash in queue){if(data[hash]!=null){queue[hash].addChildrenToQueue(queue);
}}var oldData={};

for(var hash in queue){oldData[hash]=data[hash];
data[hash]=null;
}for(var hash in queue){var widget=queue[hash];
delete queue[hash];
if(data[hash]==null){this.__computeVisible(widget);
}if(data[hash]&&data[hash]!=oldData[hash]){widget.checkAppearanceNeeds();
}}this.__queue={};
}}});
qx.Class.define("qx.ui.core.queue.Appearance",{statics:{__queue:{},remove:function(widget){delete this.__queue[widget.$$hash];
},add:function(widget){var queue=this.__queue;

if(queue[widget.$$hash]){return;
}queue[widget.$$hash]=widget;
qx.ui.core.queue.Manager.scheduleFlush("appearance");
},has:function(widget){return !!this.__queue[widget.$$hash];
},flush:function(){var Visibility=qx.ui.core.queue.Visibility;
var queue=this.__queue;
var obj;

for(var hash in queue){obj=queue[hash];
delete queue[hash];
if(Visibility.isVisible(obj)){obj.syncAppearance();
}else{obj.$$stateChanges=true;
}}}}});
qx.Class.define("qx.ui.core.queue.Dispose",{statics:{__queue:{},add:function(widget){var queue=this.__queue;

if(queue[widget.$$hash]){return;
}queue[widget.$$hash]=widget;
qx.ui.core.queue.Manager.scheduleFlush("dispose");
},flush:function(){var queue=this.__queue;

for(var hash in queue){var widget=queue[hash];
delete queue[hash];
widget.dispose();
}for(var hash in queue){return;
}this.__queue={};
}}});
qx.Class.define("qx.html.Decorator",{extend:qx.html.Element,construct:function(decorator,decoratorId){arguments.callee.base.call(this);
this.__decorator=decorator;
this.__id=decoratorId||decorator.toHashCode();
this.setStyles({position:"absolute",top:0,left:0});
this.useMarkup(decorator.getMarkup());
},members:{__id:null,__decorator:null,getId:function(){return this.__id;
},getDecorator:function(){return this.__decorator;
},resize:function(width,height){this.__decorator.resize(this.getDomElement(),width,height);
},tint:function(color){this.__decorator.tint(this.getDomElement(),color);
},getInsets:function(){return this.__decorator.getInsets();
}},destruct:function(){this.__decorator=null;
}});
qx.Class.define("qx.ui.core.EventHandler",{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){arguments.callee.base.call(this);
this.__manager=qx.event.Registration.getManager(window);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:false},members:{__manager:null,__focusEvents:{focusin:1,focusout:1,focus:1,blur:1},__ignoreDisabled:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(target,type){return target instanceof qx.ui.core.Widget;
},_dispatchEvent:function(domEvent){var domTarget=domEvent.getTarget();
var widgetTarget=qx.ui.core.Widget.getWidgetByElement(domTarget);
var targetChanged=false;

while(widgetTarget&&widgetTarget.isAnonymous()){var targetChanged=true;
widgetTarget=widgetTarget.getLayoutParent();
}if(widgetTarget&&targetChanged&&domEvent.getType()=="activate"){widgetTarget.getContainerElement().activate();
}if(this.__focusEvents[domEvent.getType()]){widgetTarget=widgetTarget&&widgetTarget.getFocusTarget();
if(!widgetTarget){return;
}}if(domEvent.getRelatedTarget){var domRelatedTarget=domEvent.getRelatedTarget();
var widgetRelatedTarget=qx.ui.core.Widget.getWidgetByElement(domRelatedTarget);

while(widgetRelatedTarget&&widgetRelatedTarget.isAnonymous()){widgetRelatedTarget=widgetRelatedTarget.getLayoutParent();
}
if(widgetRelatedTarget){if(this.__focusEvents[domEvent.getType()]){widgetRelatedTarget=widgetRelatedTarget.getFocusTarget();
}if(widgetRelatedTarget===widgetTarget){return;
}}}var currentTarget=domEvent.getCurrentTarget();
var currentWidget=qx.ui.core.Widget.getWidgetByElement(currentTarget);

if(!currentWidget||currentWidget.isAnonymous()){return;
}if(this.__focusEvents[domEvent.getType()]){currentWidget=currentWidget.getFocusTarget();
}var type=domEvent.getType();

if(!currentWidget||!(currentWidget.isEnabled()||this.__ignoreDisabled[type])){return;
}var capture=domEvent.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;
var listeners=this.__manager.getListeners(currentWidget,type,capture);

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

if(type==="focus"||type==="blur"){elem=target.getFocusElement();
}else if(type==="load"||type==="input"){elem=target.getContentElement();
}else{elem=target.getContainerElement();
}
if(elem){elem.addListener(type,this._dispatchEvent,this,capture);
}},unregisterEvent:function(target,type,capture){var elem;

if(type==="focus"||type==="blur"){elem=target.getFocusElement();
}else if(type==="load"||type==="input"){elem=target.getContentElement();
}else{elem=target.getContainerElement();
}
if(elem){elem.removeListener(type,this._dispatchEvent,this,capture);
}}},destruct:function(){this.__manager=null;
},defer:function(statics){qx.event.Registration.addHandler(statics);
}});
qx.Bootstrap.define("qx.bom.client.Locale",{statics:{LOCALE:"",VARIANT:"",__init:function(){var locale=(qx.bom.client.Engine.MSHTML?navigator.userLanguage:navigator.language).toLowerCase();
var variant="";
var index=locale.indexOf("-");

if(index!=-1){variant=locale.substr(index+1);
locale=locale.substr(0,index);
}this.LOCALE=locale;
this.VARIANT=variant;
}},defer:function(statics){statics.__init();
}});
qx.Class.define("qx.type.BaseString",{extend:Object,construct:function(txt){var txt=txt||"";
this.__txt=txt;
this.length=txt.length;
},members:{$$isString:true,length:0,__txt:null,toString:function(){return this.__txt;
},charAt:null,valueOf:null,charCodeAt:null,concat:null,indexOf:null,lastIndexOf:null,match:null,replace:null,search:null,slice:null,split:null,substr:null,substring:null,toLowerCase:null,toUpperCase:null,toHashCode:function(){return qx.core.ObjectRegistry.toHashCode(this);
},toLocaleLowerCase:null,toLocaleUpperCase:null,base:function(args,varags){return qx.core.Object.prototype.base.apply(this,arguments);
}},defer:function(statics,members){{};
var mappedFunctions=['charAt','charCodeAt','concat','indexOf','lastIndexOf','match','replace','search','slice','split','substr','substring','toLowerCase','toUpperCase','toLocaleLowerCase','toLocaleUpperCase'];
members.valueOf=members.toString;

for(var i=0,l=mappedFunctions.length;i<l;i++){members[mappedFunctions[i]]=String.prototype[mappedFunctions[i]];
}}});
qx.Class.define("qx.locale.LocalizedString",{extend:qx.type.BaseString,construct:function(translation,messageId,args){arguments.callee.base.call(this,translation);
this.__messageId=messageId;
this.__args=args;
},members:{__messageId:null,__args:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__messageId,this.__args);
}}});
qx.Class.define("qx.locale.Manager",{type:"singleton",extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__translations=qx.$$translations||{};
this.__locales=qx.$$locales||{};
var clazz=qx.bom.client.Locale;
var locale=clazz.LOCALE;
var variant=clazz.VARIANT;

if(variant!==""){locale+="_"+variant;
}this.setLocale(locale||this.__defaultLocale);
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
}},properties:{locale:{check:"String",nullable:true,apply:"_applyLocale",event:"changeLocale"}},members:{__defaultLocale:"C",__locale:null,__language:null,__translations:null,__locales:null,getLanguage:function(){return this.__language;
},getTerritory:function(){return this.getLocale().split("_")[1]||"";
},getAvailableLocales:function(){var locales=[];

for(var locale in this.__locales){if(locale!=this.__defaultLocale){locales.push(locale);
}}return locales;
},__extractLanguage:function(locale){var language;
var pos=locale.indexOf("_");

if(pos==-1){language=locale;
}else{language=locale.substring(0,pos);
}return language;
},_applyLocale:function(value,old){this.__locale=value;
this.__language=this.__extractLanguage(value);
},addTranslation:function(languageCode,translationMap){var catalog=this.__translations;

if(catalog[languageCode]){for(var key in translationMap){catalog[languageCode][key]=translationMap[key];
}}else{catalog[languageCode]=translationMap;
}},addLocale:function(localeCode,translationMap){var catalog=this.__locales;

if(catalog[localeCode]){for(var key in translationMap){catalog[localeCode][key]=translationMap[key];
}}else{catalog[localeCode]=translationMap;
}},translate:function(messageId,args,locale){var txt;
var catalog=this.__translations;

if(!catalog){return messageId;
}
if(locale){var language=this.__extractLanguage(locale);
}else{locale=this.__locale;
language=this.__language;
}
if(!txt&&catalog[locale]){txt=catalog[locale][messageId];
}
if(!txt&&catalog[language]){txt=catalog[language][messageId];
}
if(!txt&&catalog[this.__defaultLocale]){txt=catalog[this.__defaultLocale][messageId];
}
if(!txt){txt=messageId;
}
if(args.length>0){var translatedArgs=[];

for(var i=0;i<args.length;i++){var arg=args[i];

if(arg&&arg.translate){translatedArgs[i]=arg.translate();
}else{translatedArgs[i]=arg;
}}txt=qx.lang.String.format(txt,translatedArgs);
}
if(qx.core.Variant.isSet("qx.dynlocale","on")){txt=new qx.locale.LocalizedString(txt,messageId,args);
}return txt;
},localize:function(messageId,args,locale){var txt;
var catalog=this.__locales;

if(!catalog){return messageId;
}
if(locale){var language=this.__extractLanguage(locale);
}else{locale=this.__locale;
language=this.__language;
}
if(!txt&&catalog[locale]){txt=catalog[locale][messageId];
}
if(!txt&&catalog[language]){txt=catalog[language][messageId];
}
if(!txt&&catalog[this.__defaultLocale]){txt=catalog[this.__defaultLocale][messageId];
}
if(!txt){txt=messageId;
}
if(args.length>0){var translatedArgs=[];

for(var i=0;i<args.length;i++){var arg=args[i];

if(arg.translate){translatedArgs[i]=arg.translate();
}else{translatedArgs[i]=arg;
}}txt=qx.lang.String.format(txt,translatedArgs);
}
if(qx.core.Variant.isSet("qx.dynlocale","on")){txt=new qx.locale.LocalizedString(txt,messageId,args);
}return txt;
}},destruct:function(){this.__translations=this.__locales=null;
}});
qx.Class.define("qx.html.Image",{extend:qx.html.Element,members:{_applyProperty:function(name,value){arguments.callee.base.call(this,name,value);

if(name==="source"){var elem=this.getDomElement();
var styles=this.getAllStyles();
var source=this._getProperty("source");
var scale=this._getProperty("scale");
var repeat=scale?"scale":"no-repeat";
qx.bom.element.Decoration.update(elem,source,repeat,styles);
}},_createDomElement:function(){var scale=this._getProperty("scale");
var repeat=scale?"scale":"no-repeat";

if(qx.core.Variant.isSet("qx.client","mshtml")){var source=this._getProperty("source");
this.setNodeName(qx.bom.element.Decoration.getTagName(repeat,source));
}else{this.setNodeName(qx.bom.element.Decoration.getTagName(repeat));
}return arguments.callee.base.call(this);
},_copyData:function(fromMarkup){return arguments.callee.base.call(this,true);
},setSource:function(value){this._setProperty("source",value);
return this;
},getSource:function(){return this._getProperty("source");
},resetSource:function(){this._removeProperty("source");
return this;
},setScale:function(value){this._setProperty("scale",value);
return this;
},getScale:function(){return this._getProperty("scale");
}}});
qx.Class.define("qx.ui.basic.Image",{extend:qx.ui.core.Widget,construct:function(source){this.__contentElements={};
arguments.callee.base.call(this);

if(source){this.setSource(source);
}},properties:{source:{check:"String",init:null,nullable:true,event:"changeSource",apply:"_applySource",themeable:true},scale:{check:"Boolean",init:false,themeable:true,apply:"_applyScale"},appearance:{refine:true,init:"image"},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},members:{__width:null,__height:null,__mode:null,__contentElements:null,getContentElement:function(){return this.__getSuitableContentElement();
},_createContentElement:function(){return this.__getSuitableContentElement();
},_getContentHint:function(){return {width:this.__width||0,height:this.__height||0};
},_applyEnabled:function(value,old){arguments.callee.base.call(this,value,old);

if(this.getSource()){this._styleSource();
}},_applySource:function(value){this._styleSource();
},_applyScale:function(value){this._styleSource();
},__setMode:function(mode){this.__mode=mode;
},__getMode:function(){if(this.__mode==null){var source=this.getSource();
var isPng=false;

if(source!=null){isPng=qx.lang.String.endsWith(source,".png");
}
if(this.getScale()&&isPng&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){this.__mode="alphaScaled";
}else if(this.getScale()){this.__mode="scaled";
}else{this.__mode="nonScaled";
}}return this.__mode;
},__createSuitableContentElement:function(mode){var scale;
var tagName;

if(mode=="alphaScaled"){scale=true;
tagName="div";
}else if(mode=="nonScaled"){scale=false;
tagName="div";
}else{scale=true;
tagName="img";
}var element=new qx.html.Image(tagName);
element.setScale(scale);
element.setStyles({"overflowX":"hidden","overflowY":"hidden"});
return element;
},__getSuitableContentElement:function(){var mode=this.__getMode();

if(this.__contentElements[mode]==null){this.__contentElements[mode]=this.__createSuitableContentElement(mode);
}return this.__contentElements[mode];
},_styleSource:function(){var source=qx.util.AliasManager.getInstance().resolve(this.getSource());

if(!source){this.getContentElement().resetSource();
return;
}this.__checkForContentElementSwitch(source);
if(qx.util.ResourceManager.getInstance().has(source)){this.__setManagedImage(this.getContentElement(),source);
}else if(qx.io2.ImageLoader.isLoaded(source)){this.__setUnmanagedImage(this.getContentElement(),source);
}else{this.__loadUnmanagedImage(this.getContentElement(),source);
}},__checkForContentElementSwitch:qx.core.Variant.select("qx.client",{"mshtml":function(source){var alphaImageLoader=qx.bom.element.Decoration.isAlphaImageLoaderEnabled();
var isPng=qx.lang.String.endsWith(source,".png");

if(alphaImageLoader&&isPng){if(this.getScale()&&this.__getMode()!="alphaScaled"){this.__setMode("alphaScaled");
}else if(!this.getScale()&&this.__getMode()!="nonScaled"){this.__setMode("nonScaled");
}}else{if(this.getScale()&&this.__getMode()!="scaled"){this.__setMode("scaled");
}else if(!this.getScale()&&this.__getMode()!="nonScaled"){this.__setMode("nonScaled");
}}this.__checkForContentElementReplacement(this.__getSuitableContentElement());
},"default":function(source){if(this.getScale()&&this.__getMode()!="scaled"){this.__setMode("scaled");
}else if(!this.getScale()&&this.__getMode("nonScaled")){this.__setMode("nonScaled");
}this.__checkForContentElementReplacement(this.__getSuitableContentElement());
}}),__checkForContentElementReplacement:function(elementToAdd){var container=this.getContainerElement();
var currentContentElement=container.getChild(0);

if(currentContentElement!=elementToAdd){if(currentContentElement!=null){var pixel="px";
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
}},__setManagedImage:function(el,source){var ResourceManager=qx.util.ResourceManager.getInstance();
if(!this.getEnabled()){var disabled=source.replace(/\.([a-z]+)$/,"-disabled.$1");

if(ResourceManager.has(disabled)){source=disabled;
this.addState("replacement");
}else{this.removeState("replacement");
}}if(el.getSource()===source){return;
}el.setSource(source);
this.__updateContentHint(ResourceManager.getImageWidth(source),ResourceManager.getImageHeight(source));
},__setUnmanagedImage:function(el,source){var ImageLoader=qx.io2.ImageLoader;
el.setSource(source);
var width=ImageLoader.getWidth(source);
var height=ImageLoader.getHeight(source);
this.__updateContentHint(width,height);
},__loadUnmanagedImage:function(el,source){var self;
var ImageLoader=qx.io2.ImageLoader;
{};
if(!ImageLoader.isFailed(source)){ImageLoader.load(source,this.__loaderCallback,this);
}else{if(el!=null){el.resetSource();
}}},__loaderCallback:function(source,imageInfo){if(source!==qx.util.AliasManager.getInstance().resolve(this.getSource())){return;
}if(imageInfo.failed){this.warn("Image could not be loaded: "+source);
}this._styleSource();
},__updateContentHint:function(width,height){if(width!==this.__width||height!==this.__height){this.__width=width;
this.__height=height;
qx.ui.core.queue.Layout.add(this);
}}},destruct:function(){this._disposeMap("__contentElements");
}});
qx.Class.define("qx.ui.core.DragDropCursor",{extend:qx.ui.basic.Image,include:qx.ui.core.MPlacement,type:"singleton",construct:function(){arguments.callee.base.call(this);
this.setZIndex(1e8);
this.setDomMove(true);
var root=this.getApplicationRoot();
root.add(this,{left:-1000,top:-1000});
},properties:{appearance:{refine:true,init:"dragdrop-cursor"},action:{check:["alias","copy","move"],apply:"_applyAction",nullable:true}},members:{_applyAction:function(value,old){if(old){this.removeState(old);
}
if(value){this.addState(value);
}}}});
qx.Class.define("qx.event.Idle",{extend:qx.core.Object,type:"singleton",construct:function(){arguments.callee.base.call(this);
var timer=new qx.event.Timer(this.getTimeoutInterval());
timer.addListener("interval",this._onInterval,this);
timer.start();
this.__timer=timer;
},events:{"interval":"qx.event.type.Event"},properties:{timeoutInterval:{check:"Number",init:100,apply:"_applyTimeoutInterval"}},members:{__timer:null,_applyTimeoutInterval:function(value){this.__timer.setInterval(value);
},_onInterval:function(){this.fireEvent("interval");
}},destruct:function(){if(this.__timer){this.__timer.stop();
}this.__timer=null;
}});
qx.Class.define("qx.util.placement.Placement",{extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__defaultAxis=new qx.util.placement.DirectAxis();
},properties:{axisX:{check:"qx.util.placement.AbstractAxis"},axisY:{check:"qx.util.placement.AbstractAxis"},edge:{check:["top","right","bottom","left"],init:"top"},align:{check:["top","right","bottom","left"],init:"right"}},statics:{__instance:null,compute:function(size,area,target,offsets,position,modeX,modeY){this.__instance=this.__instance||new qx.util.placement.Placement();
var splitted=position.split("-");
var edge=splitted[0];
var align=splitted[1];
this.__instance.set({axisX:this.__getAxis(modeX),axisY:this.__getAxis(modeY),edge:edge,align:align});
return this.__instance.compute(size,area,target,offsets);
},__direct:null,__keepAlign:null,__bestFit:null,__getAxis:function(mode){switch(mode){case "direct":this.__direct=this.__direct||new qx.util.placement.DirectAxis();
return this.__direct;
case "keep-align":this.__keepAlign=this.__keepAlign||new qx.util.placement.KeepAlignAxis();
return this.__keepAlign;
case "best-fit":this.__bestFit=this.__bestFit||new qx.util.placement.BestFitAxis();
return this.__bestFit;
default:throw new Error("Invalid 'mode' argument!'");
}}},members:{__defaultAxis:null,compute:function(size,area,target,offsets){{};
var axisX=this.getAxisX()||this.__defaultAxis;
var left=axisX.computeStart(size.width,{start:target.left,end:target.right},{start:offsets.left,end:offsets.right},area.width,this.__getPositionX());
var axisY=this.getAxisY()||this.__defaultAxis;
var top=axisY.computeStart(size.height,{start:target.top,end:target.bottom},{start:offsets.top,end:offsets.bottom},area.height,this.__getPositionY());
return {left:left,top:top};
},__getPositionX:function(){var edge=this.getEdge();
var align=this.getAlign();

if(edge=="left"){return "edge-start";
}else if(edge=="right"){return "edge-end";
}else if(align=="left"){return "align-start";
}else if(align=="right"){return "align-end";
}},__getPositionY:function(){var edge=this.getEdge();
var align=this.getAlign();

if(edge=="top"){return "edge-start";
}else if(edge=="bottom"){return "edge-end";
}else if(align=="top"){return "align-start";
}else if(align=="bottom"){return "align-end";
}}},destruct:function(){this._disposeObjects('__defaultAxis');
}});
qx.Class.define("qx.util.placement.AbstractAxis",{extend:qx.core.Object,members:{computeStart:function(size,target,offsets,areaSize,position){throw new Error("abstract method call!");
},_moveToEdgeAndAlign:function(size,target,offsets,position){switch(position){case "edge-start":return target.start-offsets.end-size;
case "edge-end":return target.end+offsets.start;
case "align-start":return target.start+offsets.start;
case "align-end":return target.end-offsets.end-size;
}},_isInRange:function(start,size,areaSize){return start>=0&&start+size<=areaSize;
}}});
qx.Class.define("qx.util.placement.DirectAxis",{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(size,target,offsets,areaSize,position){return this._moveToEdgeAndAlign(size,target,offsets,position);
}}});
qx.Class.define("qx.util.placement.KeepAlignAxis",{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(size,target,offsets,areaSize,position){var start=this._moveToEdgeAndAlign(size,target,offsets,position);
var range1End,range2Start;

if(this._isInRange(start,size,areaSize)){return start;
}
if(position=="edge-start"||position=="edge-end"){range1End=target.start-offsets.end;
range2Start=target.end+offsets.start;
}else{range1End=target.end-offsets.end;
range2Start=target.start+offsets.start;
}
if(range1End>areaSize-range2Start){start=range1End-size;
}else{start=range2Start;
}return start;
}}});
qx.Class.define("qx.util.placement.BestFitAxis",{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(size,target,offsets,areaSize,position){var start=this._moveToEdgeAndAlign(size,target,offsets,position);

if(this._isInRange(start,size,areaSize)){return start;
}
if(start<0){start=Math.min(0,areaSize-size);
}
if(start+size>areaSize){start=Math.max(0,areaSize-size);
}return start;
}}});
qx.Class.define("qx.ui.popup.Manager",{type:"singleton",extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__objects={};
qx.event.Registration.addListener(document.documentElement,"mousedown",this.__onMouseDown,this,true);
qx.bom.Element.addListener(window,"blur",this.hideAll,this);
},members:{__objects:null,add:function(obj){{};
this.__objects[obj.$$hash]=obj;
this.__updateIndexes();
},remove:function(obj){{};
var reg=this.__objects;

if(reg){delete reg[obj.$$hash];
this.__updateIndexes();
}},hideAll:function(){var reg=this.__objects;

if(reg){for(var hash in reg){reg[hash].exclude();
}}},__updateIndexes:function(){var min=1e7;
var reg=this.__objects;

for(var hash in reg){reg[hash].setZIndex(min++);
}},__onMouseDown:function(e){var target=qx.ui.core.Widget.getWidgetByElement(e.getTarget());
var reg=this.__objects;

for(var hash in reg){var obj=reg[hash];

if(!obj.getAutoHide()||target==obj||qx.ui.core.Widget.contains(obj,target)){continue;
}obj.exclude();
}}},destruct:function(){qx.event.Registration.removeListener(document.documentElement,"mousedown",this.__onMouseDown,this,true);
this._disposeMap("__objects");
}});
qx.Class.define("qx.ui.layout.Abstract",{type:"abstract",extend:qx.core.Object,members:{__sizeHint:null,_invalidChildrenCache:null,__widget:null,invalidateLayoutCache:function(){this.__sizeHint=null;
},renderLayout:function(availWidth,availHeight){this.warn("Missing renderLayout() implementation!");
},getSizeHint:function(){if(this.__sizeHint){return this.__sizeHint;
}return this.__sizeHint=this._computeSizeHint();
},hasHeightForWidth:function(){return false;
},getHeightForWidth:function(width){this.warn("Missing getHeightForWidth() implementation!");
return null;
},_computeSizeHint:function(){return null;
},invalidateChildrenCache:function(){this._invalidChildrenCache=true;
},verifyLayoutProperty:null,_clearSeparators:function(){var widget=this.__widget;

if(widget instanceof qx.ui.core.LayoutItem){widget.clearSeparators();
}},_renderSeparator:function(separator,bounds){this.__widget.renderSeparator(separator,bounds);
},connectToWidget:function(widget){if(widget&&this.__widget){throw new Error("It is not possible to manually set the connected widget.");
}this.__widget=widget;
this.invalidateChildrenCache();
},_getWidget:function(){return this.__widget;
},_applyLayoutChange:function(){if(this.__widget){this.__widget.scheduleLayoutUpdate();
}},_getLayoutChildren:function(){return this.__widget.getLayoutChildren();
}},destruct:function(){this.__widget=this.__sizeHint=null;
}});
qx.Class.define("qx.ui.layout.Grow",{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(availWidth,availHeight){var children=this._getLayoutChildren();
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
qx.Class.define("qx.ui.basic.Atom",{extend:qx.ui.core.Widget,construct:function(label,icon){{};
arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.Atom());

if(label!=null){this.setLabel(label);
}
if(icon!=null){this.setIcon(icon);
}},properties:{appearance:{refine:true,init:"atom"},label:{apply:"_applyLabel",nullable:true,dispose:true,check:"String"},rich:{check:"Boolean",init:false,apply:"_applyRich"},icon:{check:"String",apply:"_applyIcon",nullable:true,themeable:true},gap:{check:"Integer",nullable:false,event:"changeGap",apply:"_applyGap",themeable:true,init:4},show:{init:"both",check:["both","label","icon"],themeable:true,inheritable:true,apply:"_applyShow",event:"changeShow"},iconPosition:{init:"left",check:["top","right","bottom","left"],themeable:true,apply:"_applyIconPosition"},center:{init:false,check:"Boolean",themeable:true,apply:"_applyCenter"}},members:{_createChildControlImpl:function(id){var control;

switch(id){case "label":control=new qx.ui.basic.Label(this.getLabel());
control.setAnonymous(true);
control.setRich(this.getRich());
this._add(control);

if(this.getLabel()==null||this.getShow()==="icon"){control.exclude();
}break;
case "icon":control=new qx.ui.basic.Image(this.getIcon());
control.setAnonymous(true);
this._addAt(control,0);

if(this.getIcon()==null||this.getShow()==="label"){control.exclude();
}break;
}return control||arguments.callee.base.call(this,id);
},_forwardStates:{focused:true,hovered:true},_handleLabel:function(){if(this.getLabel()==null||this.getShow()==="icon"){this._excludeChildControl("label");
}else{this._showChildControl("label");
}},_handleIcon:function(){if(this.getIcon()==null||this.getShow()==="label"){this._excludeChildControl("icon");
}else{this._showChildControl("icon");
}},_applyLabel:function(value,old){var label=this.getChildControl("label",true);

if(label){label.setValue(value);
}this._handleLabel();
},_applyRich:function(value,old){var label=this.getChildControl("label",true);

if(label){label.setRich(value);
}},_applyIcon:function(value,old){var icon=this.getChildControl("icon",true);

if(icon){icon.setSource(value);
}this._handleIcon();
},_applyGap:function(value,old){this._getLayout().setGap(value);
},_applyShow:function(value,old){this._handleLabel();
this._handleIcon();
},_applyIconPosition:function(value,old){this._getLayout().setIconPosition(value);
},_applyCenter:function(value,old){this._getLayout().setCenter(value);
}}});
qx.Class.define("qx.ui.layout.Atom",{extend:qx.ui.layout.Abstract,properties:{gap:{check:"Integer",init:4,apply:"_applyLayoutChange"},iconPosition:{check:["left","top","right","bottom"],init:"left",apply:"_applyLayoutChange"},center:{check:"Boolean",init:false,apply:"_applyLayoutChange"}},members:{verifyLayoutProperty:null,renderLayout:function(availWidth,availHeight){var Util=qx.ui.layout.Util;
var iconPosition=this.getIconPosition();
var children=this._getLayoutChildren();
var length=children.length;
var left,top,width,height;
var child,hint;
var gap=this.getGap();
var center=this.getCenter();
if(iconPosition==="bottom"||iconPosition==="right"){var start=length-1;
var end=-1;
var increment=-1;
}else{var start=0;
var end=length;
var increment=1;
}if(iconPosition=="top"||iconPosition=="bottom"){if(center){var allocatedHeight=0;

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
left=Util.computeHorizontalAlignOffset("center",width,availWidth);
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
}top=Util.computeVerticalAlignOffset("middle",hint.height,availHeight);
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

if(iconPosition==="top"||iconPosition==="bottom"){var count=0;

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
qx.Class.define("qx.ui.layout.Util",{statics:{PERCENT_VALUE:/[0-9]+(?:\.[0-9]+)?%/,computeFlexOffsets:function(flexibles,avail,used){var child,key,flexSum,flexStep;
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

switch(align){case "left":value=marginLeft;
break;
case "right":value=availWidth-width-marginRight;
break;
case "center":value=Math.round((availWidth-width)/2);
if(value<marginLeft){value=marginLeft;
}else if(value<marginRight){value=Math.max(marginLeft,availWidth-width-marginRight);
}break;
}return value;
},computeVerticalAlignOffset:function(align,height,availHeight,marginTop,marginBottom){if(marginTop==null){marginTop=0;
}
if(marginBottom==null){marginBottom=0;
}var value=0;

switch(align){case "top":value=marginTop;
break;
case "bottom":value=availHeight-height-marginBottom;
break;
case "middle":value=Math.round((availHeight-height)/2);
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
qx.Interface.define("qx.ui.form.IStringForm",{events:{"changeValue":"qx.event.type.Data"},members:{setValue:function(value){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
qx.Class.define("qx.ui.basic.Label",{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(value){arguments.callee.base.call(this);

if(value!=null){this.setValue(value);
}
if(qx.core.Variant.isSet("qx.dynlocale","on")){qx.locale.Manager.getInstance().addListener("changeLocale",this._onChangeLocale,this);
}},properties:{rich:{check:"Boolean",init:false,event:"changeRich",apply:"_applyRich"},wrap:{check:"Boolean",init:true,apply:"_applyWrap"},value:{check:"String",apply:"_applyValue",event:"changeValue",nullable:true},buddy:{check:"qx.ui.core.Widget",apply:"_applyBuddy",nullable:true,init:null},textAlign:{check:["left","center","right"],nullable:true,themeable:true,apply:"_applyTextAlign",event:"changeTextAlign"},appearance:{refine:true,init:"label"},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__font:null,__invalidContentSize:null,__buddyEnabledBinding:null,__clickListenerId:null,_getContentHint:function(){if(this.__invalidContentSize){this.__contentSize=this.__computeContentSize();
delete this.__invalidContentSize;
}return {width:this.__contentSize.width,height:this.__contentSize.height};
},_hasHeightForWidth:function(){return this.getRich()&&this.getWrap();
},_applySelectable:function(value){if(qx.core.Variant.isSet("qx.client","gecko")){if(value&&!this.isRich()){{};
return;
}}arguments.callee.base.call(this,value);
if(qx.core.Variant.isSet("qx.client","webkit")){this.getContainerElement().setStyle("userSelect",value?"text":"none");
this.getContentElement().setStyle("userSelect",value?"text":"none");
}},_getContentHeightForWidth:function(width){if(!this.getRich()&&!this.getWrap()){return null;
}return this.__computeContentSize(width).height;
},_createContentElement:function(){return new qx.html.Label;
},_applyTextAlign:function(value,old){this.getContentElement().setStyle("textAlign",value);
},_applyTextColor:function(value,old){if(value){this.getContentElement().setStyle("color",qx.theme.manager.Color.getInstance().resolve(value));
}else{this.getContentElement().removeStyle("color");
}},__contentSize:{width:0,height:0},_applyFont:function(value,old){var styles;

if(value){this.__font=qx.theme.manager.Font.getInstance().resolve(value);
styles=this.__font.getStyles();
}else{this.__font=null;
styles=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(styles);
this.__invalidContentSize=true;
qx.ui.core.queue.Layout.add(this);
},__computeContentSize:function(width){var Label=qx.bom.Label;
var font=this.getFont();
var styles=font?this.__font.getStyles():qx.bom.Font.getDefaultStyles();
var content=this.getValue()||"A";
var rich=this.getRich();
return rich?Label.getHtmlSize(content,styles,width):Label.getTextSize(content,styles);
},_applyBuddy:function(value,old){if(old!=null){old.removeBinding(this.__buddyEnabledBinding);
this.__buddyEnabledBinding=null;
this.removeListenerById(this.__clickListenerId);
this.__clickListenerId=null;
}
if(value!=null){this.__buddyEnabledBinding=value.bind("enabled",this,"enabled");
this.__clickListenerId=this.addListener("click",value.focus,value);
}},_applyRich:function(value){this.getContentElement().setRich(value);
this.__invalidContentSize=true;
qx.ui.core.queue.Layout.add(this);
},_applyWrap:function(value,old){if(value&&!this.isRich()){{};
}},_onChangeLocale:qx.core.Variant.select("qx.dynlocale",{"on":function(e){var content=this.getValue();

if(content&&content.translate){this.setValue(content.translate());
}},"off":null}),_applyValue:function(value,old){this.getContentElement().setValue(value);
this.__invalidContentSize=true;
qx.ui.core.queue.Layout.add(this);
this.fireDataEvent("changeContent",value,old);
}},destruct:function(){if(qx.core.Variant.isSet("qx.dynlocale","on")){qx.locale.Manager.getInstance().removeListener("changeLocale",this._onChangeLocale,this);
}if(this.__buddyEnabledBinding!=null){var buddy=this.getBuddy();

if(buddy!=null&&!buddy.isDisposed()){buddy.removeBinding(this.__buddyEnabledBinding);
}}this.__font=this.__buddyEnabledBinding=null;
}});
qx.Class.define("qx.html.Label",{extend:qx.html.Element,members:{__rich:null,_applyProperty:function(name,value){arguments.callee.base.call(this,name,value);

if(name=="value"){var element=this.getDomElement();
qx.bom.Label.setValue(element,value);
}},_createDomElement:function(){var rich=this.__rich;
var el=qx.bom.Label.create(this._content,rich);
return el;
},_copyData:function(fromMarkup){return arguments.callee.base.call(this,true);
},setRich:function(value){var element=this.getDomElement();

if(element){throw new Error("The label mode cannot be modified after initial creation");
}value=!!value;

if(this.__rich==value){return;
}this.__rich=value;
return this;
},setValue:function(value){this._setProperty("value",value);
return this;
},getValue:function(){return this._getProperty("value");
},setContent:function(value){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Please use the setValue() method instead.");
return this.setValue(value);
},getContent:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Please use the getValue() method instead.");
return this.getValue();
}}});
qx.Class.define("qx.bom.Label",{statics:{__styles:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__prepareText:function(){var el=this.__createMeasureElement(false);
document.body.insertBefore(el,document.body.firstChild);
return this._textElement=el;
},__prepareHtml:function(){var el=this.__createMeasureElement(true);
document.body.insertBefore(el,document.body.firstChild);
return this._htmlElement=el;
},__createMeasureElement:function(html){var el=qx.bom.Element.create("div");
var style=el.style;
style.width=style.height="auto";
style.left=style.top="-1000px";
style.visibility="hidden";
style.position="absolute";
style.overflow="visible";

if(html){style.whiteSpace="normal";
}else{style.whiteSpace="nowrap";

if(qx.core.Variant.isSet("qx.client","gecko")){var inner=document.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul","label");
for(var key in this.__styles){inner.style[key]="inherit";
}el.appendChild(inner);
}}return el;
},__getStyles:function(html){var styles={};

if(html){styles.whiteSpace="normal";
}else if(qx.core.Variant.isSet("qx.client","gecko")){styles.display="block";
}else{styles.overflow="hidden";
styles.whiteSpace="nowrap";
styles.textOverflow="ellipsis";
styles.userSelect="none";
if(qx.core.Variant.isSet("qx.client","opera")){styles.OTextOverflow="ellipsis";
}}return styles;
},create:function(content,html,win){if(!win){win=window;
}
if(html){var el=win.document.createElement("div");
el.useHtml=true;
}else if(qx.core.Variant.isSet("qx.client","gecko")){var el=win.document.createElement("div");
var xulel=win.document.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul","label");
xulel.style.cursor="inherit";
xulel.style.color="inherit";
xulel.style.overflow="hidden";
xulel.style.maxWidth="100%";
for(var key in this.__styles){xulel.style[key]="inherit";
}xulel.setAttribute("crop","end");
el.appendChild(xulel);
}else{var el=win.document.createElement("div");
qx.bom.element.Style.setStyles(el,this.__getStyles(html));
}
if(content){this.setValue(el,content);
}return el;
},setValue:function(element,value){value=value||"";

if(element.useHtml){element.innerHTML=value;
}else if(qx.core.Variant.isSet("qx.client","gecko")){element.firstChild.setAttribute("value",value);
}else{qx.bom.element.Attribute.set(element,"text",value);
}},getValue:function(element){if(element.useHtml){return element.innerHTML;
}else if(qx.core.Variant.isSet("qx.client","gecko")){return element.firstChild.getAttribute("value")||"";
}else{return qx.bom.element.Attribute.get(element,"text");
}},getHtmlSize:function(content,styles,width){var element=this._htmlElement||this.__prepareHtml();
element.style.width=width!==undefined?width+"px":"auto";
element.innerHTML=content;
return this.__measureSize(element,styles);
},getTextSize:function(text,styles){var element=this._textElement||this.__prepareText();

if(qx.core.Variant.isSet("qx.client","gecko")){element.firstChild.setAttribute("value",text);
}else{qx.bom.element.Attribute.set(element,"text",text);
}return this.__measureSize(element,styles);
},__measureSize:function(element,styles){var keys=this.__styles;

if(!styles){styles={};
}
for(var key in keys){element.style[key]=styles[key]||"";
}var size=qx.bom.element.Dimension.getSize(element);

if(qx.core.Variant.isSet("qx.client","gecko")){if(!qx.bom.client.Platform.WIN){size.width++;
}}return size;
},setContent:function(element,value){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Please use the setValue() method instead.");
this.setValue(element,value);
},getContent:function(element){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Please use the getValue() method instead.");
return this.getValue(element);
}}});
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
}}});
qx.Interface.define("qx.ui.form.IForm",{events:{"changeEnabled":"qx.event.type.Data","changeValid":"qx.event.type.Data","changeInvalidMessage":"qx.event.type.Data","changeRequired":"qx.event.type.Data"},members:{setEnabled:function(enabled){return arguments.length==1;
},getEnabled:function(){},setRequired:function(required){return arguments.length==1;
},getRequired:function(){},setValid:function(valid){return arguments.length==1;
},getValid:function(){},setInvalidMessage:function(message){return arguments.length==1;
},getInvalidMessage:function(){}}});
qx.Mixin.define("qx.ui.core.MBlocker",{construct:function(){this.__blocker=new qx.ui.core.Blocker(this);
},properties:{blockerColor:{check:"Color",init:null,nullable:true,apply:"_applyBlockerColor",themeable:true},blockerOpacity:{check:"Number",init:1,apply:"_applyBlockerOpacity",themeable:true}},members:{__blocker:null,_applyBlockerColor:function(value,old){this.__blocker.setColor(value);
},_applyBlockerOpacity:function(value,old){this.__blocker.setOpacity(value);
},block:function(){this.__blocker.block();
},isBlocked:function(){return this.__blocker.isBlocked();
},unblock:function(){this.__blocker.unblock();
},forceUnblock:function(){this.__blocker.forceUnblock();
},blockContent:function(zIndex){this.__blocker.blockContent(zIndex);
},isContentBlocked:function(){return this.__blocker.isContentBlocked();
},unblockContent:function(){this.__blocker.unblockContent();
},forceUnblockContent:function(){this.__blocker.forceUnblockContent();
},_getContentBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Use 'getBlocker().getContentBlockerElement()' instead.");
return this.__blocker.getContentBlockerElement();
},_getBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Use 'getBlocker().getBlockerElement()' instead.");
return this.__blocker.getBlockerElement();
},getBlocker:function(){return this.__blocker;
}},destruct:function(){this._disposeObjects("__blocker");
}});
qx.Mixin.define("qx.ui.window.MDesktop",{properties:{activeWindow:{check:"qx.ui.window.Window",apply:"_applyActiveWindow",init:null,nullable:true}},members:{__windows:null,__manager:null,getWindowManager:function(){if(!this.__manager){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());
}return this.__manager;
},supportsMaximize:function(){return true;
},setWindowManager:function(manager){if(this.__manager){this.__manager.setDesktop(null);
}manager.setDesktop(this);
this.__manager=manager;
},_onChangeActive:function(e){if(e.getData()){this.setActiveWindow(e.getTarget());
}else if(this.getActiveWindow()==e.getTarget()){this.setActiveWindow(null);
}},_applyActiveWindow:function(value,old){this.getWindowManager().changeActiveWindow(value,old);

if(value){value.setActive(true);
}
if(old){old.resetActive();
}},_onChangeModal:function(e){this.getWindowManager().updateStack();
},_onChangeVisibility:function(){this.getWindowManager().updateStack();
},_afterAddChild:function(win){if(qx.Class.isDefined("qx.ui.window.Window")&&win instanceof qx.ui.window.Window){this._addWindow(win);
}},_addWindow:function(win){if(!qx.lang.Array.contains(this.getWindows(),win)){this.getWindows().push(win);
win.addListener("changeActive",this._onChangeActive,this);
win.addListener("changeModal",this._onChangeModal,this);
win.addListener("changeVisibility",this._onChangeVisibility,this);
}
if(win.getActive()){this.setActiveWindow(win);
}this.getWindowManager().updateStack();
},_afterRemoveChild:function(win){if(qx.Class.isDefined("qx.ui.window.Window")&&win instanceof qx.ui.window.Window){this._removeWindow(win);
}},_removeWindow:function(win){qx.lang.Array.remove(this.getWindows(),win);
win.removeListener("changeActive",this._onChangeActive,this);
win.removeListener("changeModal",this._onChangeModal,this);
win.removeListener("changeVisibility",this._onChangeVisibility,this);
this.getWindowManager().updateStack();
},getWindows:function(){if(!this.__windows){this.__windows=[];
}return this.__windows;
}},destruct:function(){this._disposeArray("__windows");
this._disposeObjects("__manager");
}});
qx.Class.define("qx.ui.root.Abstract",{type:"abstract",extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){arguments.callee.base.call(this);
qx.ui.core.FocusHandler.getInstance().addRoot(this);
qx.ui.core.queue.Visibility.add(this);
this.initNativeHelp();
},properties:{appearance:{refine:true,init:"root"},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:"String",nullable:true,themeable:true,apply:"_applyGlobalCursor",event:"changeGlobalCursor"},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:"Boolean",init:false,apply:"_applyNativeHelp"}},members:{__globalCursorStyleSheet:null,isRootWidget:function(){return true;
},getLayout:function(){return this._getLayout();
},_applyGlobalCursor:qx.core.Variant.select("qx.client",{"mshtml":function(value,old){},"default":function(value,old){var Stylesheet=qx.bom.Stylesheet;
var sheet=this.__globalCursorStyleSheet;

if(!sheet){this.__globalCursorStyleSheet=sheet=Stylesheet.createElement();
}Stylesheet.removeAllRules(sheet);

if(value){Stylesheet.addRule(sheet,"*",qx.bom.element.Cursor.compile(value).replace(";","")+" !important");
}}}),_applyNativeContextMenu:function(value,old){if(value){this.removeListener("contextmenu",this._onNativeContextMenu,this,true);
}else{this.addListener("contextmenu",this._onNativeContextMenu,this,true);
}},_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;
}e.preventDefault();
},_applyNativeHelp:qx.core.Variant.select("qx.client",{"mshtml":function(value,old){if(old===false){qx.bom.Event.removeNativeListener(document,"help",qx.lang.Function.returnFalse);
}
if(value===false){qx.bom.Event.addNativeListener(document,"help",qx.lang.Function.returnFalse);
}},"default":function(){}})},destruct:function(){this.__globalCursorStyleSheet=null;
},defer:function(statics,members){qx.ui.core.MChildrenHandling.remap(members);
}});
qx.Class.define("qx.ui.root.Application",{extend:qx.ui.root.Abstract,construct:function(doc){this.__window=qx.dom.Node.getWindow(doc);
this.__doc=doc;
arguments.callee.base.call(this);
qx.event.Registration.addListener(this.__window,"resize",this._onResize,this);
this._setLayout(new qx.ui.layout.Canvas());
qx.ui.core.queue.Layout.add(this);
qx.ui.core.FocusHandler.getInstance().connectTo(this);
this.getContentElement().disableScrolling();
},members:{__window:null,__doc:null,_createContainerElement:function(){var doc=this.__doc;

if(qx.core.Variant.isSet("qx.client","webkit")){if(!doc.body){alert("The application could not be started due to a missing body tag in the HTML file!");
}}var hstyle=doc.documentElement.style;
var bstyle=doc.body.style;
hstyle.overflow=bstyle.overflow="hidden";
hstyle.padding=hstyle.margin=bstyle.padding=bstyle.margin="0px";
hstyle.width=hstyle.height=bstyle.width=bstyle.height="100%";
var elem=doc.createElement("div");
doc.body.appendChild(elem);
var root=new qx.html.Root(elem);
root.setStyle("position","absolute");
root.setAttribute("$$widget",this.toHashCode());
return root;
},_onResize:function(e){qx.ui.core.queue.Layout.add(this);
},_computeSizeHint:function(){var width=qx.bom.Viewport.getWidth(this.__window);
var height=qx.bom.Viewport.getHeight(this.__window);
return {minWidth:width,width:width,maxWidth:width,minHeight:height,height:height,maxHeight:height};
}},destruct:function(){this.__window=this.__doc=null;
}});
qx.Class.define("qx.ui.core.Blocker",{extend:qx.core.Object,construct:function(widget){arguments.callee.base.call(this);
this._widget=widget;
this._isPageRoot=(qx.Class.isDefined("qx.ui.root.Page")&&widget instanceof qx.ui.root.Page);

if(this._isPageRoot){widget.addListener("resize",this.__onResize,this);
}this.__activeElements=[];
this.__focusElements=[];
this.__contentBlockerCount=[];
},properties:{color:{check:"Color",init:null,nullable:true,apply:"_applyColor",themeable:true},opacity:{check:"Number",init:1,apply:"_applyOpacity",themeable:true}},members:{__blocker:null,__blockerCount:0,__contentBlocker:null,__contentBlockerCount:null,__activeElements:null,__focusElements:null,__oldAnonymous:null,__anonymousCounter:0,__timer:null,_isPageRoot:false,_widget:null,__onResize:function(e){var data=e.getData();

if(this.isContentBlocked()){this.getContentBlockerElement().setStyles({width:data.width,height:data.height});
}
if(this.isBlocked()){this.getBlockerElement().setStyles({width:data.width,height:data.height});
}},_applyColor:function(value,old){var color=qx.theme.manager.Color.getInstance().resolve(value);
this.__setBlockersStyle("backgroundColor",color);
},_applyOpacity:function(value,old){this.__setBlockersStyle("opacity",value);
},__setBlockersStyle:function(key,value){var blockers=[];
this.__blocker&&blockers.push(this.__blocker);
this.__contentBlocker&&blockers.push(this.__contentBlocker);

for(var i=0;i<blockers.length;i++){blockers[i].setStyle(key,value);
}},_saveAndSetAnonymousState:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"This method is not needed anymore.");
this.__anonymousCounter+=1;

if(this.__anonymousCounter==1){this.__oldAnonymous=this._widget.getAnonymous();
this._widget.setAnonymous(true);
}},_restoreAnonymousState:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"This method is not needed anymore.");
this.__anonymousCounter-=1;

if(this.__anonymousCounter==0){this._widget.setAnonymous(this.__oldAnonymous);
}},_backupActiveWidget:function(){var focusHandler=qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);
this.__activeElements.push(focusHandler.getActive());
this.__focusElements.push(focusHandler.getFocus());

if(this._widget.isFocusable()){this._widget.focus();
}},_restoreActiveWidget:function(){var activeElementsLength=this.__activeElements.length;

if(activeElementsLength>0){var widget=this.__activeElements[activeElementsLength-1];

if(widget){qx.bom.Element.activate(widget);
}this.__activeElements.pop();
}var focusElementsLength=this.__focusElements.length;

if(focusElementsLength>0){var widget=this.__focusElements[focusElementsLength-1];

if(widget){qx.bom.Element.focus(this.__focusElements[focusElementsLength-1]);
}this.__focusElements.pop();
}},__createBlockerElement:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());
},_getBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Use 'getBlockerElement' instead.");
return this.getBlockerElement();
},getBlockerElement:function(){if(!this.__blocker){this.__blocker=this.__createBlockerElement();
this.__blocker.setStyle("zIndex",15);
this._widget.getContainerElement().add(this.__blocker);
this.__blocker.exclude();
}return this.__blocker;
},block:function(){this.__blockerCount++;

if(this.__blockerCount<2){this._backupActiveWidget();
var blocker=this.getBlockerElement();
blocker.include();
blocker.activate();
blocker.addListener("deactivate",this.__activateBlockerElement,this);
blocker.addListener("keypress",this.__stopTabEvent,this);
blocker.addListener("keydown",this.__stopTabEvent,this);
blocker.addListener("keyup",this.__stopTabEvent,this);
}},isBlocked:function(){return this.__blockerCount>0;
},unblock:function(){if(!this.isBlocked()){return;
}this.__blockerCount--;

if(this.__blockerCount<1){this.__unblock();
}},forceUnblock:function(){if(!this.isBlocked()){return;
}this.__blockerCount=0;
this.__unblock();
},__unblock:function(){this._restoreActiveWidget();
var blocker=this.getBlockerElement();
blocker.removeListener("deactivate",this.__activateBlockerElement,this);
blocker.removeListener("keypress",this.__stopTabEvent,this);
blocker.removeListener("keydown",this.__stopTabEvent,this);
blocker.removeListener("keyup",this.__stopTabEvent,this);
blocker.exclude();
},_getContentBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,"Use 'getContentBlockerElement' instead.");
return this.getContentBlockerElement();
},getContentBlockerElement:function(){if(!this.__contentBlocker){this.__contentBlocker=this.__createBlockerElement();
this._widget.getContentElement().add(this.__contentBlocker);
this.__contentBlocker.exclude();
}return this.__contentBlocker;
},blockContent:function(zIndex){var blocker=this.getContentBlockerElement();
blocker.setStyle("zIndex",zIndex);
this.__contentBlockerCount.push(zIndex);

if(this.__contentBlockerCount.length<2){blocker.include();

if(this._isPageRoot){if(!this.__timer){this.__timer=new qx.event.Timer(300);
this.__timer.addListener("interval",this.__syncBlocker,this);
}this.__timer.start();
this.__syncBlocker();
}}},isContentBlocked:function(){return this.__contentBlockerCount.length>0;
},unblockContent:function(){if(!this.isContentBlocked()){return;
}this.__contentBlockerCount.pop();
var zIndex=this.__contentBlockerCount[this.__contentBlockerCount.length-1];
var contentBlocker=this.getContentBlockerElement();
contentBlocker.setStyle("zIndex",zIndex);

if(this.__contentBlockerCount.length<1){this.__unblockContent();
}},forceUnblockContent:function(){if(!this.isContentBlocked()){return;
}this.__contentBlockerCount=[];
var contentBlocker=this.getContentBlockerElement();
contentBlocker.setStyle("zIndex",null);
this.__unblockContent();
},__unblockContent:function(){this.getContentBlockerElement().exclude();

if(this._isPageRoot){this.__timer.stop();
}},__syncBlocker:function(){var containerEl=this._widget.getContainerElement().getDomElement();
var doc=qx.dom.Node.getDocument(containerEl);
this.getContentBlockerElement().setStyles({height:doc.documentElement.scrollHeight+"px",width:doc.documentElement.scrollWidth+"px"});
},__stopTabEvent:function(e){if(e.getKeyIdentifier()=="Tab"){e.stop();
}},__activateBlockerElement:function(){this.getBlockerElement().activate();
}},destruct:function(){if(this._isPageRoot){this._widget.removeListener("resize",this.__onResize,this);
}this._disposeObjects("__contentBlocker","__blocker","__timer");
this.__oldAnonymous=this.__activeElements=this.__focusElements=this._widget=this.__contentBlockerCount=null;
}});
qx.Class.define("qx.html.Blocker",{extend:qx.html.Element,construct:function(backgroundColor,opacity){arguments.callee.base.call(this);
var backgroundColor=backgroundColor?qx.theme.manager.Color.getInstance().resolve(backgroundColor):null;
this.setStyles({position:"absolute",width:"100%",height:"100%",opacity:opacity||0,backgroundColor:backgroundColor});
this.addListener("mousedown",this._stopPropagation,this);
this.addListener("mouseup",this._stopPropagation,this);
this.addListener("click",this._stopPropagation,this);
this.addListener("dblclick",this._stopPropagation,this);
this.addListener("mousemove",this._stopPropagation,this);
this.addListener("mouseover",this._stopPropagation,this);
this.addListener("mouseout",this._stopPropagation,this);
this.addListener("mousewheel",this._stopPropagation,this);
this.addListener("contextmenu",this._stopPropagation,this);
if(qx.core.Variant.isSet("qx.client","mshtml")){this.setStyles({backgroundImage:"url("+qx.util.ResourceManager.getInstance().toUri("qx/static/blank.gif")+")",backgroundRepeat:"repeat"});
}this.addListener("appear",this.__refreshCursor,this);
this.addListener("disappear",this.__refreshCursor,this);
},members:{_stopPropagation:function(e){e.stopPropagation();
},__refreshCursor:function(){var currentCursor=this.getStyle("cursor");
this.setStyle("cursor",null,true);
this.setStyle("cursor",currentCursor,true);
}}});
qx.Class.define("qx.ui.core.FocusHandler",{extend:qx.core.Object,type:"singleton",construct:function(){arguments.callee.base.call(this);
this.__roots={};
},members:{__roots:null,__activeChild:null,__focusedChild:null,__currentRoot:null,connectTo:function(root){root.addListener("keypress",this.__onKeyPress,this);
root.addListener("focusin",this._onFocusIn,this,true);
root.addListener("focusout",this._onFocusOut,this,true);
root.addListener("activate",this._onActivate,this,true);
root.addListener("deactivate",this._onDeactivate,this,true);
},addRoot:function(widget){this.__roots[widget.$$hash]=widget;
},removeRoot:function(widget){delete this.__roots[widget.$$hash];
},getActiveWidget:function(){return this.__activeChild;
},isActive:function(widget){return this.__activeChild==widget;
},getFocusedWidget:function(){return this.__focusedChild;
},isFocused:function(widget){return this.__focusedChild==widget;
},isFocusRoot:function(widget){return !!this.__roots[widget.$$hash];
},_onActivate:function(e){var target=e.getTarget();
this.__activeChild=target;
var root=this.__findFocusRoot(target);

if(root!=this.__currentRoot){this.__currentRoot=root;
}},_onDeactivate:function(e){var target=e.getTarget();

if(this.__activeChild==target){this.__activeChild=null;
}},_onFocusIn:function(e){var target=e.getTarget();

if(target!=this.__focusedChild){this.__focusedChild=target;
target.visualizeFocus();
}},_onFocusOut:function(e){var target=e.getTarget();

if(target==this.__focusedChild){this.__focusedChild=null;
target.visualizeBlur();
}},__onKeyPress:function(e){if(e.getKeyIdentifier()!="Tab"){return;
}
if(!this.__currentRoot){return;
}e.stopPropagation();
e.preventDefault();
var current=this.__focusedChild;

if(!e.isShiftPressed()){var next=current?this.__getWidgetAfter(current):this.__getFirstWidget();
}else{var next=current?this.__getWidgetBefore(current):this.__getLastWidget();
}if(next){next.tabFocus();
}},__findFocusRoot:function(widget){var roots=this.__roots;

while(widget){if(roots[widget.$$hash]){return widget;
}widget=widget.getLayoutParent();
}return null;
},__compareTabOrder:function(widget1,widget2){if(widget1===widget2){return 0;
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
},__getFirstWidget:function(){return this.__getFirst(this.__currentRoot,null);
},__getLastWidget:function(){return this.__getLast(this.__currentRoot,null);
},__getWidgetAfter:function(widget){var root=this.__currentRoot;

if(root==widget){return this.__getFirstWidget();
}
while(widget&&widget.getAnonymous()){widget=widget.getLayoutParent();
}
if(widget==null){return [];
}var result=[];
this.__collectAllAfter(root,widget,result);
result.sort(this.__compareTabOrder);
var len=result.length;
return len>0?result[0]:this.__getFirstWidget();
},__getWidgetBefore:function(widget){var root=this.__currentRoot;

if(root==widget){return this.__getLastWidget();
}
while(widget&&widget.getAnonymous()){widget=widget.getLayoutParent();
}
if(widget==null){return [];
}var result=[];
this.__collectAllBefore(root,widget,result);
result.sort(this.__compareTabOrder);
var len=result.length;
return len>0?result[len-1]:this.__getLastWidget();
},__collectAllAfter:function(parent,widget,result){var children=parent.getLayoutChildren();
var child;

for(var i=0,l=children.length;i<l;i++){child=children[i];
if(!(child instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(child)&&child.isEnabled()&&child.isVisible()){if(child.isTabable()&&this.__compareTabOrder(widget,child)<0){result.push(child);
}this.__collectAllAfter(child,widget,result);
}}},__collectAllBefore:function(parent,widget,result){var children=parent.getLayoutChildren();
var child;

for(var i=0,l=children.length;i<l;i++){child=children[i];
if(!(child instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(child)&&child.isEnabled()&&child.isVisible()){if(child.isTabable()&&this.__compareTabOrder(widget,child)>0){result.push(child);
}this.__collectAllBefore(child,widget,result);
}}},__getFirst:function(parent,firstWidget){var children=parent.getLayoutChildren();
var child;

for(var i=0,l=children.length;i<l;i++){child=children[i];
if(!(child instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(child)&&child.isEnabled()&&child.isVisible()){if(child.isTabable()){if(firstWidget==null||this.__compareTabOrder(child,firstWidget)<0){firstWidget=child;
}}firstWidget=this.__getFirst(child,firstWidget);
}}return firstWidget;
},__getLast:function(parent,lastWidget){var children=parent.getLayoutChildren();
var child;

for(var i=0,l=children.length;i<l;i++){child=children[i];
if(!(child instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(child)&&child.isEnabled()&&child.isVisible()){if(child.isTabable()){if(lastWidget==null||this.__compareTabOrder(child,lastWidget)>0){lastWidget=child;
}}lastWidget=this.__getLast(child,lastWidget);
}}return lastWidget;
}},destruct:function(){this._disposeMap("__roots");
this.__focusedChild=this.__activeChild=this.__currentRoot=null;
}});
qx.Class.define("qx.bom.Stylesheet",{statics:{includeFile:function(href,doc){if(!doc){doc=document;
}var el=doc.createElement("link");
el.type="text/css";
el.rel="stylesheet";
el.href=qx.util.ResourceManager.getInstance().toUri(href);
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
qx.Class.define("qx.ui.layout.Canvas",{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(availWidth,availHeight){var children=this._getLayoutChildren();
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

if(left&&typeof left==="number"){width+=left;
minWidth+=left;
}right=props.right!=null?props.right:props.edge;

if(right&&typeof right==="number"){width+=right;
minWidth+=right;
}neededWidth=Math.max(neededWidth,width);
neededMinWidth=Math.max(neededMinWidth,minWidth);
height=hint.height+marginY;
minHeight=hint.minHeight+marginY;
top=props.top!=null?props.top:props.edge;

if(top&&typeof top==="number"){height+=top;
minHeight+=top;
}bottom=props.bottom!=null?props.bottom:props.edge;

if(bottom&&typeof bottom==="number"){height+=bottom;
minHeight+=bottom;
}neededHeight=Math.max(neededHeight,height);
neededMinHeight=Math.max(neededMinHeight,minHeight);
}return {width:neededWidth,minWidth:neededMinWidth,height:neededHeight,minHeight:neededMinHeight};
}}});
qx.Class.define("qx.html.Root",{extend:qx.html.Element,construct:function(elem){arguments.callee.base.call(this);

if(elem!=null){this.useElement(elem);
}},members:{useElement:function(elem){arguments.callee.base.call(this,elem);
this.setRoot(true);
qx.html.Element._modified[this.$$hash]=this;
}}});
qx.Mixin.define("qx.ui.core.MExecutable",{events:{"execute":"qx.event.type.Event"},properties:{command:{check:"qx.ui.core.Command",apply:"_applyCommand",event:"changeCommand",nullable:true}},members:{__executableBindingIds:null,_bindableProperties:["enabled","label","icon","toolTipText","value","menu"],execute:function(){var cmd=this.getCommand();

if(cmd){cmd.execute(this);
}this.fireEvent("execute");
},_applyCommand:function(value,old){var ids=this.__executableBindingIds;

if(ids==null){this.__executableBindingIds=ids={};
}
for(var i=0;i<this._bindableProperties.length;i++){var property=this._bindableProperties[i];
if(old!=null&&ids[property]!=null){old.removeBinding(ids[property]);
ids[property]=null;
}if(value!=null&&qx.Class.hasProperty(this.constructor,property)){var cmdPropertyValue=value.get(property);

if(cmdPropertyValue==null){var selfPropertyValue=this.get(property);
}ids[property]=value.bind(property,this,property);
if(selfPropertyValue){this.set(property,selfPropertyValue);
}}}}},destruct:function(){this.__executableBindingIds=null;
}});
qx.Interface.define("qx.ui.form.IExecutable",{events:{"execute":"qx.event.type.Data"},members:{setCommand:function(command){return arguments.length==1;
},getCommand:function(){},execute:function(){}}});
qx.Class.define("qx.ui.form.Button",{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],construct:function(label,icon,command){arguments.callee.base.call(this,label,icon);

if(command!=null){this.setCommand(command);
}this.addListener("mouseover",this._onMouseOver);
this.addListener("mouseout",this._onMouseOut);
this.addListener("mousedown",this._onMouseDown);
this.addListener("mouseup",this._onMouseUp);
this.addListener("keydown",this._onKeyDown);
this.addListener("keyup",this._onKeyUp);
this.addListener("dblclick",this._onStopEvent);
},properties:{appearance:{refine:true,init:"button"},focusable:{refine:true,init:true}},members:{_forwardStates:{focused:true,hovered:true,pressed:true,disabled:true},press:function(){if(this.hasState("abandoned")){return;
}this.addState("pressed");
},release:function(){if(this.hasState("pressed")){this.removeState("pressed");
}},reset:function(){this.removeState("pressed");
this.removeState("abandoned");
this.removeState("hovered");
},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState("abandoned")){this.removeState("abandoned");
this.addState("pressed");
}this.addState("hovered");
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState("hovered");

if(this.hasState("pressed")){this.removeState("pressed");
this.addState("abandoned");
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}e.stopPropagation();
this.capture();
this.removeState("abandoned");
this.addState("pressed");
},_onMouseUp:function(e){this.releaseCapture();
var hasPressed=this.hasState("pressed");
var hasAbandoned=this.hasState("abandoned");

if(hasPressed){this.removeState("pressed");
}
if(hasAbandoned){this.removeState("abandoned");
}else{this.addState("hovered");

if(hasPressed){this.execute();
}}e.stopPropagation();
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case "Enter":case "Space":this.removeState("abandoned");
this.addState("pressed");
e.stopPropagation();
}},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case "Enter":case "Space":if(this.hasState("pressed")){this.removeState("abandoned");
this.removeState("pressed");
this.execute();
e.stopPropagation();
}}}}});


qx.$$loader.init();

